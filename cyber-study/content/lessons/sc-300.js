/* Lessons for Microsoft Certified: Identity and Access Administrator Associate (SC-300 (skills outline of April 27, 2026)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("sc-300", [
 {
  "t": "Tenant setup: custom domain names and DNS verification, company branding, tenant properties and user settings",
  "hook": "It is your first week as the identity administrator at Larkspur Outdoor Gear, and the company has just bought a brand-new Microsoft Entra tenant. The CEO wants everyone signing in as name@larkspurgear.com by Monday, not with the long onmicrosoft.com name the tenant came with. Marketing has already emailed you a logo and asks why the sign-in page looks generic. Then Priya from finance mentions that a summer intern registered an app in the directory yesterday, just to see what would happen. Nobody has touched the tenant settings yet, and everything is still at its defaults. Which switches do you flip first, and how do you prove to Microsoft that larkspurgear.com really belongs to you?",
  "simple": "A tenant is your organization's private space in Microsoft's cloud, where all your user accounts live. When you get one, it comes with a free address that ends in onmicrosoft.com, a bit like a temporary mailbox number. Most companies want people to sign in with their own web address instead, such as larkspurgear.com. To use it, you must prove you own it. Microsoft gives you a short code, and you paste that code into the settings for your website address at the company that sells you the name. Only the real owner could do that, so Microsoft trusts it. After that, you can dress up the sign-in page with your logo, record basic facts about your organization, and decide what regular employees are allowed to do, such as whether they can create apps or groups on their own.",
  "body": [
   "A Microsoft Entra tenant is the dedicated instance of Microsoft Entra ID (the cloud identity service formerly called Azure Active Directory) that holds your organization's users, groups, devices and applications. Think of it as the directory that every Microsoft cloud service in your organization trusts. Every tenant starts with an initial domain ending in onmicrosoft.com, for example larkspurgear.onmicrosoft.com. That domain is permanent: you can't delete it, and it stays useful as a fallback sign-in name for emergency access accounts, because it keeps working even if something goes wrong with your custom domain or its DNS. Most organizations then add a custom domain such as contoso.com so people sign in with a familiar user principal name (UPN) like ana@contoso.com.",
   "Adding a custom domain is a two-step process, and the reason for the second step is proof of ownership. First you add the name in the Microsoft Entra admin center under Domain names. Entra then shows the domain as Unverified and gives you a verification value that looks like MS=ms12345678. You publish that value as a TXT record, or alternatively an MX record, at your public Domain Name System (DNS) host, which is usually the registrar or DNS provider where you manage the domain. When you select Verify, Entra looks up the record in public DNS. Only someone who controls the domain's DNS could have created it, so a successful lookup proves ownership. Note that a CNAME record is not one of the verification options, which is a common distractor.",
   "A few practical rules surround verification. DNS changes can take time to propagate, so a failed first attempt usually just means waiting and trying again rather than starting over. A domain can be verified in only one tenant at a time, so if a previous project or a trial tenant already claimed it, you must remove it there first. Once a domain is verified, you can make it the primary domain, which becomes the default suffix offered when you create new users; this does not rename existing users. To remove a custom domain later you must first move or delete every user, group and application that still references it in a name, email address or URI, and the portal will tell you which objects are blocking the deletion.",
   "Company branding customizes the sign-in experience your users see. You can set a background image, a banner logo, a square logo, a background color, sign-in page text, and links for self-service password reset, a privacy statement or terms of use. You configure a default sign-in experience first and can then add language-specific versions for users whose browser requests another language, so a French-speaking user sees French text while everyone else sees the default. Branding appears after the user types a username in your domain, which is also a quiet anti-phishing signal: users learn what the real page looks like, and a look-alike page without your branding should feel wrong. Branding requires a paid license tier, not the free edition.",
   "Tenant properties hold organization-level details, and you find them on the Overview and Properties pages. They include the tenant name, the tenant ID (a globally unique identifier, or GUID, that apps, scripts and federation settings use to identify the directory), the country or region chosen at creation, the technical contact, and the global privacy contact and privacy statement URL that guest users see when they accept an invitation. The country or region cannot be changed later, because it determines where the tenant's data is located. If a scenario says the region was chosen incorrectly, the realistic answer is a new tenant, not a settings change.",
   "User settings are tenant-wide switches that shape what ordinary members may do. In the admin center you'll find options such as Users can register applications, Restrict access to Microsoft Entra admin center (which stops non-administrators from browsing the directory in the portal), and whether users may connect their work account with LinkedIn. Group settings control whether users can create security groups or Microsoft 365 groups, and a directory setting controls whether users can read other users' profiles. None of these replace proper role assignments; they simply define the baseline for people who hold no admin role at all.",
   "Tightening these defaults is a quick least-privilege win in a new tenant, because the out-of-the-box settings favor collaboration over control. For example, letting any user register applications means anyone can create an app identity with its own credentials, which an attacker who compromises one account could also do. Turning that switch off and granting the Application Developer role only to those who need it narrows that risk. Similarly, restricting portal access does not block Microsoft Graph or PowerShell, so treat it as a convenience barrier rather than a security boundary.",
   "Taken together, tenant setup is a short checklist: add and verify the custom domain with a TXT or MX record, set it as primary, apply company branding, confirm tenant properties such as the technical and privacy contacts, and review user settings. Exam questions in this area usually test a single detail, so watch for words like permanent, cannot be changed, and still in use."
  ],
  "analogy": "Verifying a domain is like a bank confirming you own a house before it will put your name on the mailbox. The bank hands you a unique slip of paper and asks you to tape it to the front door; when its inspector sees the slip, only the person with keys to the house could have put it there. The analogy stops at timing: DNS records can take a while to become visible everywhere, so a failed check often just means the inspector came too early.",
  "terms": [
   [
    "Initial domain",
    "The permanent tenantname.onmicrosoft.com domain created with every tenant; it cannot be removed."
   ],
   [
    "Domain verification",
    "Proving you own a custom domain by publishing a TXT or MX record with an Entra-supplied value in public DNS."
   ],
   [
    "Primary domain",
    "The verified domain used as the default UPN suffix when you create new users."
   ],
   [
    "Tenant ID",
    "The GUID that uniquely identifies a Microsoft Entra tenant, used by apps, scripts and federation settings."
   ],
   [
    "Company branding",
    "Customization of the sign-in page with your logos, background, colors and text, with optional per-language versions."
   ],
   [
    "User settings",
    "Tenant-wide switches such as whether users can register applications or browse the admin center."
   ]
  ],
  "example": "Fabrikam buys fabrikam.com and wants staff to sign in as name@fabrikam.com. The admin adds the domain in Entra, copies the MS=ms value into a TXT record at the registrar, waits for DNS to update, selects Verify and sets it as primary. She then uploads the corporate logo and background as company branding and turns off the user setting that lets members register applications.",
  "mistakes": [
   [
    "Using a CNAME record to verify the custom domain.",
    "Entra verification uses a TXT record (most common) or an MX record carrying the MS=ms value. A CNAME is not an option."
   ],
   [
    "Thinking the onmicrosoft.com domain can be deleted once a custom domain is primary.",
    "The initial domain is permanent. Making another domain primary only changes the default suffix for new users."
   ],
   [
    "Believing the tenant's country or region can be edited in Properties.",
    "It is fixed at creation because it determines data location. Fixing a wrong choice means creating a new tenant."
   ],
   [
    "Assuming setting a new primary domain renames existing users.",
    "Primary only sets the default suffix for new users. Existing UPNs must be changed separately."
   ]
  ],
  "tryit": [
   [
    "Juniper Health added juniperhealth.org to its tenant, published the verification TXT record ten minutes ago and selected Verify, but the portal says the record could not be found. A colleague suggests deleting the domain and adding it again with an MX record instead. The DNS host's console shows the TXT record with the correct MS=ms value. What should you do?",
    "Wait and select Verify again later. The record is correct, so the most likely cause is DNS propagation delay. Deleting and re-adding the domain, or switching to MX, would not speed anything up."
   ],
   [
    "You are asked to remove an old domain, oldbrand.com, from the tenant, but the delete fails. A report shows 14 users still have UPNs ending in oldbrand.com and one app registration uses it in a redirect URI. What do you do before trying again?",
    "Rename the 14 users to another verified domain and update or remove the app's URI so nothing references oldbrand.com. A domain can be deleted only when no users, groups or apps still use it."
   ]
  ],
  "tip": "Remember that verification uses a TXT (or MX) record, not a CNAME, and that the onmicrosoft.com domain can never be deleted. If a question asks why a domain can't be removed, look for users, groups or apps still using it.",
  "check": [
   [
    "What DNS record types can you use to verify a custom domain in Microsoft Entra ID?",
    "A TXT record (most common) or an MX record containing the MS=ms verification value that Entra gives you."
   ],
   [
    "Why might an administrator be unable to delete a custom domain from the tenant?",
    "Objects such as users, groups or applications still reference the domain in their names or URIs; they must be renamed or removed first."
   ],
   [
    "Which tenant property is fixed at creation and cannot be changed?",
    "The country or region, which also determines where the tenant's data is located."
   ],
   [
    "A domain shows as verified in another tenant. Can you verify it in yours at the same time?",
    "No. A domain can be verified in only one tenant at a time; remove it from the other tenant first."
   ]
  ]
 },
 {
  "t": "Microsoft Entra built-in roles, custom roles and least-privilege role assignment",
  "hook": "At Cedar Valley Schools, the service desk lead, Marcus, sends you a polite message: his three technicians keep waiting on you to reset forgotten passwords, so could you just make them Global Administrators. It would certainly be faster. But you also remember the audit last spring, when the reviewer counted eleven Global Administrators and wrote a finding in red ink. Somewhere between doing nothing and handing out the keys to everything there is a right answer. Which role lets the technicians reset student and staff passwords, without letting them touch the principal's admin account or the tenant's security settings, and how do you keep even that role from being always on?",
  "simple": "In Microsoft's cloud directory, a role is a bundle of permissions with a name, such as Helpdesk Administrator. Instead of giving people every permission one at a time, you give them a role that matches their job. Some roles are tiny, like being allowed to reset ordinary passwords; one role, Global Administrator, can do nearly everything. The safest habit is called least privilege: give each person the smallest role that does the job, only over the people or apps they actually look after, and only for as long as they need it. It is like a hotel giving the cleaning staff a key card that opens guest rooms on their own floor during their shift, instead of a master key to the whole building that never expires.",
  "body": [
   "Microsoft Entra roles control who can manage the directory itself: users, groups, applications, authentication settings and similar identity objects. They are separate from Azure role-based access control (RBAC) roles such as Owner, Contributor or Reader, which control Azure resources like virtual machines, storage accounts and subscriptions. A Global Administrator does not automatically manage Azure resources, and a subscription Owner cannot reset a user's password because of that role. Mixing up the two systems is a classic exam trap, so keep one question in mind for every scenario: is the admin managing identity objects, or Azure resources?",
   "Microsoft provides many built-in Entra roles, each a fixed set of permissions you cannot edit. Global Administrator can do almost everything and should be rare; Microsoft recommends fewer than five in a tenant, plus separate emergency access accounts. Privileged Role Administrator manages role assignments and Privileged Identity Management (PIM), so it is effectively a path to every other role and deserves the same care. User Administrator creates and manages users and groups and can reset passwords for many, but not all, users. Helpdesk Administrator resets passwords for non-administrators and a few limited roles, and Password Administrator is an even narrower option focused on password resets.",
   "Authentication roles are a frequent comparison. Authentication Administrator can view and manage authentication methods, such as phone numbers and requiring a user to re-register multifactor authentication (MFA), for non-administrators. Privileged Authentication Administrator can do the same for any user, including Global Administrators. That difference matters because changing an admin's MFA phone number is a classic account-takeover move, so it is reserved for the more trusted role.",
   "Several other built-in roles appear in scenarios. Security Administrator manages security features and reads security reports. Conditional Access Administrator manages Conditional Access policies. Groups Administrator manages groups and group settings, and License Administrator manages license assignments. Application Administrator manages app registrations, enterprise apps and application proxy, while Cloud Application Administrator does the same but without application proxy rights. Global Reader can see almost everything a Global Administrator can see but cannot change anything, which makes it a good fit for auditors and for admins who mostly need to look before they act.",
   "Custom roles let you build a role from individual permissions when no built-in role fits. In the admin center you choose Roles and administrators, then New custom role, give it a name, and pick permissions such as microsoft.directory/applications/credentials/update. The set of permissions available for custom roles is narrower than the built-in catalog and is focused largely on application registrations and enterprise applications, with more areas added over time. Custom roles require a Microsoft Entra ID P1 license. You define the role once and then assign it, as many times as needed, at a scope.",
   "Every role assignment has three parts: the principal, the role definition, and the scope. The principal is who receives the role, which can be a user, a service principal or a role-assignable group. The role definition is the set of permissions, built-in or custom. The scope is where the permissions apply: the whole tenant, an administrative unit (a container that groups a subset of users, groups or devices), or a single resource such as one app registration. Assigning the Application Administrator role for just one app means the person can manage that app and nothing else, which is far safer than assigning it tenant-wide.",
   "Least privilege means giving each person the smallest role, at the narrowest scope, for the shortest time that lets them do the job. In practice that means four habits. Pick the most specific built-in role rather than defaulting to Global Administrator. Scope roles to administrative units or single resources when possible. Use Privileged Identity Management so assignments are eligible, requiring activation with justification and MFA, rather than permanently active. And review assignments regularly with access reviews, removing roles people no longer use.",
   "You can assign roles to groups, which simplifies management, but only if the group was created as role-assignable. That is controlled by the isAssignableToRole property, which must be set to true when the group is created and cannot be changed later, so you cannot convert an existing security group. Only Global Administrators and Privileged Role Administrators, plus the group's owners, can manage membership of role-assignable groups. This prevents a lower-level admin, such as a Groups Administrator, from adding themselves to a group that holds a powerful role and escalating their privileges that way.",
   "When you read a least-privilege question, work through it in order: identify the task, remove Global Administrator and Privileged Role Administrator as options unless the task truly requires them, then choose the narrowest role whose permissions still cover the task, and finally ask whether a smaller scope or an eligible assignment would make it safer still."
  ],
  "analogy": "Entra roles work like the key system in an apartment building. A role is a type of key (mailroom key, maintenance key, master key), the scope is which doors that key fits (one floor, one apartment, the whole building), and PIM is a key you sign out at the front desk for a shift rather than carry home. The analogy breaks for Azure RBAC: that is a completely separate building with its own keys, and the master key here does not open it.",
  "mnemonic": "Three parts of every role assignment: Who, What, Where. Who is the principal (user, service principal or role-assignable group), What is the role definition, and Where is the scope (tenant, administrative unit or single resource).",
  "terms": [
   [
    "Role definition",
    "A collection of permissions, either built-in or custom, that can be assigned to a principal."
   ],
   [
    "Role scope",
    "The boundary where a role applies: the tenant, an administrative unit, or a single resource."
   ],
   [
    "Role-assignable group",
    "A group created with isAssignableToRole set to true so it can receive Entra role assignments; the setting is fixed at creation."
   ],
   [
    "Global Reader",
    "A built-in read-only role that can view most settings and data without making changes."
   ],
   [
    "Least privilege",
    "Granting only the permissions, scope and duration a person needs to perform a task."
   ],
   [
    "Privileged Authentication Administrator",
    "A role that can manage authentication methods for any user, including Global Administrators."
   ]
  ],
  "example": "A service desk team needs to reset forgotten passwords for regular staff. Instead of making them User Administrators, the identity admin assigns them the Helpdesk Administrator role through an eligible PIM assignment, so they can reset non-admin passwords after activating the role but cannot create users or reset a Global Administrator's password.",
  "mistakes": [
   [
    "Choosing Global Administrator because it definitely has the permission.",
    "Least-privilege questions want the narrowest role that still covers the task. Global Administrator is almost never the right answer."
   ],
   [
    "Thinking an Azure subscription Owner can manage Entra users.",
    "Azure RBAC and Entra roles are separate systems. Owner controls Azure resources; managing users needs an Entra role such as User Administrator."
   ],
   [
    "Picking Authentication Administrator to reset an admin's MFA method.",
    "Authentication Administrator covers only non-admins. Managing methods for administrators requires Privileged Authentication Administrator."
   ],
   [
    "Converting an existing security group to role-assignable.",
    "isAssignableToRole is set only at creation. Create a new role-assignable group instead."
   ]
  ],
  "tryit": [
   [
    "Willow Creek Insurance wants a contractor to rotate client secrets and update settings on one app registration, the claims portal, and nothing else. The contractor should not be able to see or change any other app. A teammate proposes making the contractor an Application Administrator. What do you recommend?",
    "Assign Application Administrator (or a custom role with only the needed application permissions) scoped to that single app registration, not tenant-wide. The scope limits the contractor to the claims portal app, which satisfies least privilege; making the assignment eligible through PIM narrows it further."
   ],
   [
    "An external auditor needs to review Conditional Access policies, role assignments and authentication method settings for two weeks but must not change anything. Which role and assignment style fit best?",
    "Global Reader, ideally as a time-bound assignment that ends after two weeks. It gives broad read access without any write permissions."
   ]
  ],
  "tip": "When a question asks for the least-privileged role, eliminate Global Administrator first, then choose the most narrowly focused role that still covers the task. Watch the difference between Authentication Administrator and Privileged Authentication Administrator: only the privileged one can manage methods for administrators.",
  "check": [
   [
    "What is the difference between Microsoft Entra roles and Azure RBAC roles?",
    "Entra roles manage directory objects such as users, groups and apps; Azure RBAC roles manage Azure resources such as subscriptions, resource groups and VMs."
   ],
   [
    "Can you convert an existing security group into a role-assignable group?",
    "No. The isAssignableToRole property must be set when the group is created and cannot be changed afterward."
   ],
   [
    "Which role should you assign to someone who only needs to reset passwords for non-administrative users?",
    "Helpdesk Administrator (Password Administrator is an even narrower option), not User Administrator or Global Administrator."
   ],
   [
    "What license do custom Entra roles require?",
    "Microsoft Entra ID P1 (or a plan that includes it)."
   ]
  ]
 },
 {
  "t": "Administrative units, including restricted management administrative units, to scope admin roles",
  "hook": "Northgate University has twelve faculties, and each one has its own small IT team. This morning the School of Medicine's technician, Lena, reset a password for a student in the Law faculty because the ticket landed in her queue, and the Law faculty's IT lead is furious. Later the same day, the security office asks you a harder question: the university president's account and the group that controls the research grant system should be untouchable by ordinary help-desk staff, even ones with tenant-wide roles. You can't build twelve tenants, and you can't just trust everyone to be careful. How do you draw boundaries inside one directory, and how do you put a few accounts behind a stronger fence?",
  "simple": "Normally, if you give someone an admin job in Microsoft's cloud directory, that job covers everyone in the organization. An administrative unit is a way to draw a box around some of the people, groups or devices and say: this admin only works on what is in this box. A campus help-desk worker can reset passwords for students in their own school, but not in other schools. A restricted management administrative unit is a stronger box. Even the organization-wide admins can't change what is inside it unless they have been given a job specifically for that box. It is like a school where teachers can enter any classroom, except the principal's office, which opens only with its own special key.",
  "body": [
   "An administrative unit (AU) is a container in Microsoft Entra ID that holds users, groups or devices so you can delegate administration of just those objects. Without AUs, most role assignments are tenant-wide: a Helpdesk Administrator can reset passwords for every non-admin in the directory. Think of a university where each faculty has its own IT staff who should reset passwords for their own students but not for the rest of the campus. You put the faculty's users in an AU, then assign the IT staff a role scoped to that AU. Their power now stops at the edge of the container.",
   "Administrative units are flat; they are not a hierarchy like on-premises Active Directory organizational units (OUs), and nothing inherits from a parent AU. An object can belong to more than one AU, so a user could sit in both a Paris AU and a Finance AU and be managed by both teams. Membership can be assigned manually, or for users or devices it can be set by a dynamic membership rule, such as all users whose department is Engineering or whose country is France. A single AU's dynamic rule targets either users or devices, not both, and dynamic membership updates in the background as attributes change.",
   "Groups in an AU behave in a way that catches many people out. Adding a group to an AU lets the scoped admin manage the group object itself, such as its name, description and membership, but it does not make the group's members part of the AU. If you want the admin to reset those users' passwords, the users themselves must be added too, either directly or through a dynamic rule. Exam questions often describe an admin who can see a group but cannot reset its members' passwords; this is the reason.",
   "Only some roles make sense at AU scope. Roles you can scope to an AU include User Administrator, Helpdesk Administrator, Password Administrator, Authentication Administrator, Groups Administrator, License Administrator and a few others that manage individual users, groups or devices. Roles that manage tenant-wide settings, such as Conditional Access Administrator or Security Administrator, cannot be scoped to an AU, because their settings do not belong to any particular user. You make an AU-scoped assignment from the AU itself: open the administrative unit, choose Roles and administrators, select the role and add the people. The administrators who receive AU-scoped roles need Microsoft Entra ID P1 licenses; the members of the AU need only the free tier.",
   "Restricted management administrative units add protection for sensitive objects. In a normal AU, tenant-level admins can still manage everything inside it; the AU only adds a scoped admin, it does not remove anyone else's reach. In a restricted management AU, objects can be modified only by administrators whose role is assigned at the scope of that specific AU. Even a tenant-wide User Administrator or Global Administrator cannot change a protected user's properties, reset their password or change a protected group's membership through that tenant-scoped role. The protection applies to users, security groups and devices placed in the AU.",
   "It is important to understand the limit of that protection. A Global Administrator or Privileged Role Administrator can still assign themselves, or someone else, a role scoped to the restricted management AU and then make changes, and that assignment is recorded in the audit log. So restricted management AUs are a guard against accidents and routine admin reach, not an absolute wall against your most powerful administrators. The restricted setting is chosen when the AU is created and cannot be switched on or off afterward, so plan it before you build the container.",
   "Typical uses for restricted management AUs include protecting executives' accounts, security groups that gate access to sensitive resources such as a payroll app or a research data store, and privileged service accounts that should not be modified by a busy help desk. In the admin center you'll see a Restricted management administrative unit toggle when you create the AU, and on the protected object's overview page a note that it is a member of a restricted management AU, so admins who are blocked understand why. Sign-in, audit and role assignment activity still appears in the normal logs, so auditing and investigation are unaffected.",
   "When choosing between the two in a scenario, read the requirement closely. If the goal is to let a regional or departmental team manage only its own people, a normal AU with a scoped role is enough. If the goal is to stop tenant-wide administrators from changing certain objects by default, you need a restricted management AU, created that way from the start."
  ],
  "analogy": "A normal administrative unit is like giving a floor manager a key that opens only their floor of an office building, while building security still holds a master key that opens every floor. A restricted management AU is a vault room on one floor whose lock ignores the master key; only keys cut for that room work. The analogy stops at the building owner: a Global Administrator can still have a vault key cut for themselves, and that action is logged.",
  "terms": [
   [
    "Administrative unit",
    "A container of users, groups or devices used to scope Entra role assignments to a subset of the directory."
   ],
   [
    "Restricted management AU",
    "An administrative unit whose objects can be changed only by admins with roles scoped to that AU, not by tenant-scoped admins."
   ],
   [
    "AU-scoped role assignment",
    "A role assignment whose scope is an administrative unit, limiting the admin's power to objects in that AU."
   ],
   [
    "Dynamic AU membership",
    "An administrative unit whose user or device members are added and removed automatically by an attribute-based rule."
   ],
   [
    "Flat structure",
    "AUs do not nest or inherit from each other, and an object can belong to several AUs."
   ]
  ],
  "example": "A multinational wants the Paris help desk to reset passwords only for French staff. The admin creates an administrative unit with a dynamic rule on country equals France and assigns the Paris team Helpdesk Administrator scoped to it. Separately, the CEO and CFO are placed in a restricted management AU managed by two senior identity admins, so the general help desk can never change them.",
  "mistakes": [
   [
    "Adding a group to an AU so the scoped admin can reset its members' passwords.",
    "Adding a group brings only the group object into scope. The member users must be added to the AU themselves."
   ],
   [
    "Expecting a normal AU to keep tenant-wide admins out.",
    "A normal AU only adds a scoped admin. Blocking tenant-scoped admins requires a restricted management AU."
   ],
   [
    "Turning on restricted management for an existing AU.",
    "The restricted setting is chosen at creation. Create a new restricted management AU and move the objects into it."
   ],
   [
    "Licensing every member of the AU with P1.",
    "Only the administrators assigned AU-scoped roles need Entra ID P1; members can be on the free tier."
   ]
  ],
  "tryit": [
   [
    "Bayview Hospital places its chief medical officer and the group that controls access to patient records in a new administrative unit. A week later, a tenant-wide User Administrator successfully changes the CMO's job title by mistake. The security team is surprised, because they thought the AU protected her. What went wrong, and how do you fix it?",
    "The AU was created as a normal administrative unit, which does not stop tenant-scoped admins. Create a restricted management AU, move the CMO and the group into it, and assign a small set of trusted admins roles scoped to that AU. The setting cannot be added to the existing AU."
   ],
   [
    "A regional manager wants her Denver help desk to reset passwords for Denver employees only. Employees' city attribute is already accurate. What do you build?",
    "A normal administrative unit with a dynamic user rule on city equals Denver, and a Helpdesk Administrator (or Password Administrator) assignment scoped to that AU. The Denver technicians need Entra ID P1 licenses."
   ]
  ],
  "tip": "If a scenario says even Global Administrators should not be able to modify certain users by default, the answer is a restricted management administrative unit. If it only says to limit what a regional team can manage, a normal AU with a scoped role is enough.",
  "check": [
   [
    "If you add a group to an administrative unit, can the AU-scoped Helpdesk Administrator reset passwords for the group's members?",
    "No. Adding a group brings only the group object into scope; the users must be added to the AU themselves."
   ],
   [
    "What does a restricted management administrative unit change compared with a normal AU?",
    "Tenant-scoped administrators can no longer modify its objects; only admins with roles scoped to that AU can."
   ],
   [
    "Who needs a Microsoft Entra ID P1 license when using administrative units?",
    "The administrators who are assigned roles scoped to the AU; members of the AU do not."
   ],
   [
    "Can a single dynamic AU rule include both users and devices?",
    "No. A dynamic AU rule targets either users or devices."
   ]
  ]
 },
 {
  "t": "Users and groups: security vs Microsoft 365 groups, assigned vs dynamic membership rules, bulk operations",
  "hook": "Monday at Silverline Logistics brings 60 new warehouse hires, a reorganization that moves the whole Sales team under a new department name, and a ticket from Omar in finance saying he still can't open the budgeting app three weeks after his transfer. Your predecessor managed all of this by hand, adding people one at a time to groups with names like Finance-App-Access-OLD2. The help desk spends half its week on access requests that should never have been tickets. You have one afternoon to fix the system, not just the tickets. Which kind of group, with which kind of membership, would make Omar's access appear by itself, and how do you create 60 accounts without typing 60 forms?",
  "simple": "A user is an account for a person. A group is a named list of users, and sometimes devices, so you can give access to everyone on the list at once instead of one by one. There are two kinds of groups. Security groups are for giving access to things like apps and files. Microsoft 365 groups are for teamwork: each one comes with a shared email inbox, calendar and file space. You can fill a group by hand, or you can write a rule, such as everyone whose department is Finance, and the group keeps itself up to date. It is like a school club list that adds every student who signs up for chess automatically, instead of a teacher rewriting it each week. For lots of accounts at once, you fill in a spreadsheet and upload it.",
  "body": [
   "Users in Microsoft Entra ID come in two main kinds, and knowing which kind you are dealing with tells you where to make changes. Cloud-only users are created directly in Entra, and you can edit them in the admin center. Synchronized users come from on-premises Active Directory, which remains their source of authority, so most of their attributes must be changed on-premises and then synchronized. Each user also has a userType of Member or Guest, which affects default directory permissions. Deleted users go to a soft-deleted state for 30 days, during which you can restore them from Deleted users with their group memberships and licenses intact; after that they are permanently removed.",
   "Groups simplify access: you assign permissions, licenses or apps once to a group instead of to hundreds of people. There are two group types. Security groups control access to resources and can contain users, devices, service principals and other groups (nesting). Microsoft 365 groups are collaboration groups: each comes with a shared mailbox, calendar, SharePoint site and optionally a Microsoft Teams team, and they contain only users, both members and guests, never devices or nested groups. That collaboration focus also explains two lifecycle differences. Deleted Microsoft 365 groups can be restored for 30 days, while deleted security groups cannot be restored. The group expiration policy, which asks owners to renew groups periodically, applies to Microsoft 365 groups.",
   "Membership can be assigned or dynamic. With assigned membership, owners or administrators add and remove members manually, which is simple but drifts as people change jobs. With dynamic membership, a rule adds and removes members automatically based on attributes. Dynamic user groups use rules on user attributes such as department, jobTitle or country; dynamic device groups use device attributes such as deviceOSType. A single rule cannot mix user and device properties. Microsoft 365 groups can be dynamic only for users, because they cannot contain devices. Dynamic membership requires a Microsoft Entra ID P1 license, and changes are processed in the background, so a new member may take some time to appear. A rule looks like this:",
   "```\n(user.department -eq \"Sales\") -and (user.country -eq \"Canada\")\n```",
   "Rules use a small expression language. Common operators include -eq (equals), -ne (not equals), -startsWith, -contains, -match (regular expression) and -in (matches any value in a list), joined with -and, -or and -not. The rule builder in the portal covers simple cases with drop-down lists, and the text box accepts advanced rules like the one above. Before saving, use Validate Rules to test the rule against specific users and see whether each would be included, which catches typos such as a department spelled differently in HR data. A special rule syntax can also build a group from the direct reports of a given manager, which is handy for team-based access.",
   "Dynamic groups change how you troubleshoot. You cannot manually add members to a dynamic group, and the Add members button is unavailable. If someone is missing, look at the attribute the rule evaluates: if Omar's department still says Sales in his user profile, the Finance rule will never include him. The fix is to correct the source attribute, which for a synchronized user means changing it in on-premises Active Directory, or to change the rule itself. You can also check the group's dynamic membership processing status on its overview page if many members seem stuck.",
   "Bulk operations handle many objects at once from the admin center. You download a comma-separated values (CSV) template, fill it in and upload it to bulk create users, bulk invite guests, bulk delete users, bulk restore deleted users, bulk add or remove group members, or download a list of users or groups. The template's header rows define required columns, such as display name, user principal name and initial password for new users. Results appear under Bulk operation results, with a per-row status so you can see exactly which lines failed and why, fix them and resubmit only those rows.",
   "For larger or repeatable jobs, scripting is the usual alternative. Microsoft Graph PowerShell cmdlets such as New-MgUser to create users and New-MgGroupMember to add members can read the same CSV data and run on a schedule or as part of an onboarding process. On the exam, the portal bulk operations and Graph PowerShell are both valid; pick bulk operations when the scenario stresses a one-time task in the portal, and scripting when it stresses automation or repetition.",
   "To pull it together, decide in this order: what the group is for (access means security group, collaboration means Microsoft 365 group), what it must contain (devices or nested groups rule out Microsoft 365 groups), and how membership should change (attributes that are reliably maintained point to dynamic membership with Entra ID P1)."
  ],
  "analogy": "A dynamic group is like a smart playlist in a music app that automatically includes every song tagged jazz. You never drag songs in by hand; if a song is missing, you fix its tag, not the playlist. An assigned group is a regular playlist you curate yourself. The analogy stops on timing: a music app updates instantly, while Entra evaluates dynamic rules in the background, so new members can take a while to appear.",
  "terms": [
   [
    "Security group",
    "A group used to grant access to resources; can contain users, devices, service principals and nested groups."
   ],
   [
    "Microsoft 365 group",
    "A collaboration group that provisions a shared mailbox, calendar, SharePoint site and optional Team; contains users only."
   ],
   [
    "Dynamic membership rule",
    "An attribute-based expression that automatically adds and removes group members; requires Entra ID P1."
   ],
   [
    "Assigned membership",
    "Group membership managed manually by owners or administrators."
   ],
   [
    "Soft delete",
    "The 30-day window during which deleted users and Microsoft 365 groups can be restored."
   ],
   [
    "Bulk operation",
    "A portal job that creates, invites, deletes, restores or changes membership for many objects from a CSV file."
   ]
  ],
  "example": "HR sets the department attribute for every employee. The identity team creates a dynamic security group with the rule user.department -eq \"Finance\" and assigns the finance app and a license to it. When a new analyst's department is set to Finance, they gain access automatically, and when they move to Marketing, access is removed without a ticket.",
  "mistakes": [
   [
    "Creating a Microsoft 365 group to hold devices for policy targeting.",
    "Microsoft 365 groups contain only users. Devices require a security group, usually with dynamic device membership."
   ],
   [
    "Adding a missing person to a dynamic group by hand.",
    "Dynamic groups do not accept manual members. Fix the attribute the rule checks, or change the rule."
   ],
   [
    "Writing one dynamic rule that combines user.department and device.deviceOSType.",
    "A rule targets either users or devices, never both. Create two groups if you need both."
   ],
   [
    "Assuming a deleted security group can be restored like a deleted user.",
    "Only users and Microsoft 365 groups have the 30-day restore window. A deleted security group is gone and must be recreated."
   ]
  ],
  "tryit": [
   [
    "Aster Pharmacy needs a group that automatically includes every iOS and Android phone so it can target a mobile management policy. A junior admin starts creating a Microsoft 365 group named All-Mobile with a dynamic rule. What should you tell them?",
    "Stop and create a security group with dynamic device membership instead, using a rule on deviceOSType. Microsoft 365 groups can contain only users, so they cannot hold devices or use device rules."
   ],
   [
    "After a reorganization, 40 people moved into the Marketing department in HR data, but only 25 have appeared in the dynamic Marketing group two hours later. Validate Rules shows the other 15 would match. What is the most likely explanation and next step?",
    "Dynamic membership is processed in the background, so the remaining members are probably still being evaluated. Check the group's processing status and wait; there is no manual add option, and the rule is already correct."
   ]
  ],
  "tip": "Exam questions love the limits: Microsoft 365 groups can't contain devices or nested groups, dynamic groups can't take manual members, one rule can't mix user and device attributes, and only Microsoft 365 groups (not security groups) can be restored after deletion.",
  "check": [
   [
    "You need a group that automatically contains all Windows devices. Which group type and membership type do you choose?",
    "A security group with dynamic device membership; Microsoft 365 groups cannot contain devices."
   ],
   [
    "A user is missing from a dynamic group. Can you add them manually?",
    "No. You must correct the attribute the rule evaluates, or change the rule."
   ],
   [
    "Which license is needed for dynamic group membership?",
    "Microsoft Entra ID P1 (or a plan that includes it) for the users covered by dynamic groups."
   ],
   [
    "How long can a deleted user be restored, and what comes back with them?",
    "For 30 days, with their group memberships and licenses."
   ]
  ]
 },
 {
  "t": "Licenses: direct vs group-based licensing and resolving license assignment errors",
  "hook": "It is the first day after Ironwood Engineering absorbed a smaller rival, and 40 new sales staff can't open Outlook. Their accounts exist, they are in the right dynamic group, and the group has the sales license bundle assigned. Yet the group's license page shows a red warning icon next to a long list of names. Meanwhile, Dana, who left Sales for the warehouse two months ago, somehow still has the expensive sales license, and procurement is asking why the seat count never adds up. Two problems, one root: license assignment. Where do you look to find out why a license refuses to stick, and why another refuses to leave?",
  "simple": "Many Microsoft cloud services only work for a person who has a license, a bit like a seat ticket for each employee. You can hand a license to one person at a time, which is called direct licensing. Or you can hand it to a group, and everyone in the group gets one automatically, which is called group-based licensing. When someone leaves the group, their license goes back on the shelf. Sometimes a license fails to assign: maybe you ran out of seats, maybe the person already has a clashing license, or maybe nobody recorded which country they work in. The portal tells you the reason, you fix it, and then you press a button to try again. It is like a gym that gives a pass to everyone on the company list, but only once it knows which branch each person uses.",
  "body": [
   "Many Microsoft cloud services, such as Microsoft 365, Exchange Online and Microsoft Entra ID P1 or P2, require each user to have a license. A license, often called a product or a stock keeping unit (SKU), contains several service plans, and each service plan represents one service, such as Exchange Online, SharePoint or Teams. When you assign a license you can turn individual service plans on or off, which is how you give someone Microsoft 365 apps without, say, a particular add-on service. Before any license can be assigned, the user must have a usage location set, because some services are not available in every country and Microsoft must know which rules apply.",
   "Direct licensing means assigning a license to an individual user, either in the admin center under the user's Licenses page or with PowerShell. It works, and it is sometimes the right tool for a one-off exception, but it does not scale and it drifts. People change jobs, and nobody remembers to remove licenses they no longer need, so seats stay consumed by people who are not using them. Over time the tenant collects licenses that nobody can explain.",
   "Group-based licensing assigns licenses to a group, and every member inherits the license while members who leave the group lose it. You configure it from the group's Licenses page, choosing the products and any service plans to disable for that group. Combined with dynamic groups, licensing becomes automatic: a rule like department equals Sales assigns the sales license set as soon as HR updates the attribute, and removes it when the attribute changes again. Group-based licensing requires Microsoft Entra ID P1 or a plan that includes it, such as Microsoft 365 E3, and it works with security groups and Microsoft 365 groups, including synchronized groups from on-premises.",
   "A user can hold the same product through more than one path. The user's Licenses page shows each assignment and whether it is Direct or Inherited, naming the group it comes from. Removing one path does not remove the other, which explains the Dana mystery: if she was removed from the Sales group but also had a direct assignment from years ago, she keeps the license. The same behavior gives you a safe migration path from direct to group-based licensing: add the group assignment, confirm members show the inherited license with no errors, and only then remove the direct assignments.",
   "License assignment errors are where exam questions focus, so learn where to look and what each error means. The group's Licenses page shows a count of users in an error state, and selecting it lists them; the user's Licenses page shows the reason. Not enough licenses means the tenant has run out of purchased seats for that product. Conflicting service plans means the user already has another license with a service plan that can't coexist with one in the new license, for example two different editions of the same service. Other products depend on this license appears when you try to remove or disable a service plan that another assigned plan requires.",
   "Two more errors round out the list. Usage location isn't allowed means a service isn't offered in the user's country, or no usage location is set at all; for group-based licensing, Entra can use the tenant's location as a fallback, but explicit usage location on each user is the reliable fix. Duplicate proxy addresses appears when an email address the license would provision conflicts with another object in Exchange Online, which happens when an old mailbox or contact still holds that address.",
   "To fix an error, address the cause first, then retry. You might buy more seats, remove a conflicting direct license, disable one of the conflicting service plans in the group's assignment, set the user's usage location, or remove the duplicate address from the other object. Then select Reprocess on the group or the user so Entra tries the assignment again. Group-based licensing processes changes in the background, especially for large groups, so allow some time before assuming a fix failed. If you want to know who assigned or removed a license and when, the audit log records license changes, which helps answer questions from procurement or auditors.",
   "A good mental routine for licensing questions is: check usage location for brand-new users, check seat counts for many failures at once, check for duplicate direct and inherited assignments when a license won't go away, and remember Reprocess as the step after any fix."
  ],
  "analogy": "Group-based licensing is like a company parking garage that issues a badge to everyone on a department's roster: join the department and the badge appears, leave and it is collected. A direct license is a badge someone handed you personally, and leaving the department does not take that one back. The analogy fits errors too: if the garage is full (not enough licenses), or you already hold a badge for a conflicting garage, the new badge can't be issued until that is sorted.",
  "terms": [
   [
    "Service plan",
    "An individual service inside a license product that can be enabled or disabled per assignment."
   ],
   [
    "Usage location",
    "The user's country or region; required before a license can be assigned."
   ],
   [
    "Group-based licensing",
    "Assigning licenses to a group so members inherit them automatically; requires Entra ID P1."
   ],
   [
    "Inherited license",
    "A license a user holds because of group membership rather than direct assignment."
   ],
   [
    "Reprocess",
    "An action that retries license assignment for a group or user after you fix the cause of an error."
   ],
   [
    "Conflicting service plans",
    "An error when a user already holds a service plan that cannot coexist with one in the new license."
   ]
  ],
  "example": "After a merger, 40 new sales staff join a dynamic Sales group but show a license error. The admin finds the reason is not enough licenses, buys 40 more seats and selects Reprocess on the group. Two users still fail with conflicting service plans because they have an older direct license, so the admin removes the direct assignments and reprocesses again.",
  "mistakes": [
   [
    "Thinking removing a user from a licensing group always removes the license.",
    "If the same product is also assigned directly, the direct assignment remains. Check the user's Licenses page for Direct versus Inherited."
   ],
   [
    "Expecting the assignment to retry by itself after buying seats.",
    "Select Reprocess on the group or user so Entra tries again after the fix."
   ],
   [
    "Blaming seat counts when a single brand-new user can't get any license.",
    "The usual cause is a missing usage location, which is required before any license assignment."
   ],
   [
    "Assuming group-based licensing is included with the free tier.",
    "Group-based licensing requires Microsoft Entra ID P1 or a plan that includes it."
   ]
  ],
  "tryit": [
   [
    "At Maple Ridge Clinic, a group assignment of an enterprise Microsoft 365 license fails for 6 of 200 members with conflicting service plans. All 6 still have an older, lower edition license assigned directly from a pilot last year. The clinic wants everyone on the enterprise license through the group. What do you do?",
    "Remove the direct lower edition licenses from the 6 users (or disable the conflicting service plan if a mix is required), then select Reprocess on the group. The conflict comes from the old direct assignment, not from the group."
   ],
   [
    "A new contractor's account was created this morning, but assigning any license fails immediately, even though the tenant has plenty of unused seats. What is the first property you check?",
    "The usage location. A license cannot be assigned until the user's country or region is set."
   ]
  ],
  "tip": "If a question says licenses won't assign to a brand-new user, check usage location first. If it says a user kept a license after leaving a group, look for a direct assignment that still exists alongside the inherited one.",
  "check": [
   [
    "What must be set on a user before any license can be assigned?",
    "The usage location (country or region)."
   ],
   [
    "A user was removed from a licensing group but still has the license. What is the most likely reason?",
    "The same license is also assigned directly to the user, and removing the group path does not remove the direct one."
   ],
   [
    "After buying more seats to fix a not enough licenses error, what do you do so the group assignment succeeds?",
    "Select Reprocess on the group (or user) so Entra retries the assignment."
   ],
   [
    "What license is required to use group-based licensing?",
    "Microsoft Entra ID P1 or a plan that includes it."
   ]
  ]
 },
 {
  "t": "Devices: Microsoft Entra registered, Microsoft Entra joined and Microsoft Entra hybrid joined; device settings",
  "hook": "The security lead at Brightwater Credit Union, Tomas, wants a new rule live by the end of the month: no one opens the loan system unless they are on a company device. That sounds simple until you count what is actually out there. Branch tellers use desktops that have been joined to the on-premises domain for ten years and still depend on Group Policy. The new remote underwriters received laptops straight from the vendor, never touching the office network. And half the managers read email on their own phones. All three groups need to sign in, but only some of those devices belong to the credit union. How does the directory tell these devices apart, and which settings decide who may add a device at all?",
  "simple": "Microsoft's cloud directory can keep a record for each computer or phone, not just each person. That lets the organization make rules like only allow company laptops. There are three ways a device can be connected. Registered is for personal devices: you keep using your own phone, but you add your work account to it. Joined is for company Windows computers that sign in straight to the cloud with your work account, with no office server involved. Hybrid joined is for company Windows computers that still belong to the older office network and are also known to the cloud. It is like a gym: a guest pass for visitors, a full membership for staff, and staff who also keep an old membership card from the branch down the road.",
  "body": [
   "Microsoft Entra ID keeps a device identity for computers and phones so that policies such as Conditional Access can check the device, not just the user. A stolen password used from an unknown laptop looks very different from the same password used on a managed corporate machine, and device identity is what lets Entra tell them apart. There are three ways a device can relate to Entra, and the exam expects you to pick the right one for a scenario based on who owns the device and whether on-premises Active Directory is involved.",
   "Microsoft Entra registered devices are typically personal devices, the bring-your-own-device (BYOD) case. The user signs in to the device with a personal or local account and adds a work account, for example by signing in to the Company Portal app, an Office app, or through Windows settings under Access work or school. Windows, macOS, iOS and Android can all be registered. The organization gets a device object it can use for Conditional Access and, if the user also enrolls the device, Microsoft Intune management, but the user still owns the device and still signs in to it with their own account.",
   "Microsoft Entra joined devices are organization-owned Windows devices joined directly to Entra ID with no requirement for on-premises Active Directory. Users sign in to Windows with their Entra work account and get single sign-on (SSO) to cloud apps through a primary refresh token (PRT), a long-lived token the device obtains at sign-in. They can still reach on-premises resources such as file shares if the device has line of sight to a domain controller. This is the target state for cloud-first organizations and is commonly deployed with Windows Autopilot, which lets a new laptop ship straight to the employee and join the tenant during first setup.",
   "Microsoft Entra hybrid joined devices are joined to on-premises Active Directory and also registered in Entra ID. This suits organizations that still rely on Group Policy, on-premises imaging or applications that expect a domain-joined computer. Setup is done in Microsoft Entra Connect, which configures a service connection point (SCP), an object in Active Directory that tells domain-joined computers which tenant to register with. The computer objects must be in the synchronization scope. Windows then registers automatically, typically when a user signs in, and the device appears in Entra with a join type of Microsoft Entra hybrid joined.",
   "Device settings control who can add devices and what happens when they do. You find them in the admin center under Devices, then Device settings. Users may join devices to Microsoft Entra can be set to all, selected users or groups, or none. Users may register their devices controls registration. Maximum number of devices per user limits how many devices one person can join or register, which helps stop clutter and abuse. Additional local administrators on Microsoft Entra joined devices lets you name accounts that become local administrators, and a related option controls whether the user who joins a device becomes a local administrator on it.",
   "Several more settings appear on the same page. Require multifactor authentication (MFA) to register or join devices exists, but Microsoft recommends leaving it off and instead creating a Conditional Access policy that targets the Register or join devices user action, because Conditional Access can combine MFA with other conditions and exclusions. Enable Microsoft Entra Local Administrator Password Solution (LAPS) lets Windows LAPS rotate each device's local administrator password and back it up to Entra, so there is no shared local password across the fleet. Another setting controls whether users can recover the BitLocker keys for their own devices through self-service.",
   "Conditional Access can then require a device to be marked compliant by Intune, or to be Microsoft Entra hybrid joined, or either. These are different promises. Compliant means the device meets management rules you defined in Intune, such as disk encryption, a minimum operating system version and no jailbreak. Hybrid joined only proves the device is part of your on-premises domain and registered in Entra; it says nothing about whether it is patched or encrypted. Registered personal devices are usually allowed browser access or app protection policies rather than full access.",
   "Picking the right identity type follows a short decision path. If the device is personal, it is registered. If it is company-owned Windows and you are cloud-first, it is joined. If it is company-owned Windows and must stay in on-premises Active Directory, it is hybrid joined, configured through Entra Connect. Then choose device settings that keep joining and registering limited and protected with Conditional Access."
  ],
  "analogy": "Think of a company building. A registered device is a visitor badge clipped to your own coat: the building knows you are inside, but the coat is still yours. A joined device is a company uniform issued and owned by the employer. A hybrid joined device is a uniform from the old headquarters that the new building also recognizes. The analogy stops at trust: wearing a uniform (hybrid joined) does not prove it is clean and pressed, which is what compliance checks.",
  "terms": [
   [
    "Microsoft Entra registered",
    "A personal device with a work account added; used for BYOD scenarios on Windows, macOS, iOS and Android."
   ],
   [
    "Microsoft Entra joined",
    "An organization-owned Windows device joined directly to Entra ID, where users sign in with work accounts."
   ],
   [
    "Microsoft Entra hybrid joined",
    "A device joined to on-premises AD and also registered in Entra ID, configured through Entra Connect."
   ],
   [
    "Service connection point (SCP)",
    "An AD object that tells domain-joined computers which Entra tenant to register with for hybrid join."
   ],
   [
    "Windows LAPS with Entra",
    "A feature that rotates each device's local administrator password and backs it up to Entra ID."
   ],
   [
    "Primary refresh token (PRT)",
    "A token issued to joined and hybrid joined Windows devices that provides single sign-on to cloud apps."
   ]
  ],
  "example": "A company with a large on-premises AD and heavy Group Policy use wants Conditional Access to require corporate devices. The admin enables hybrid join in Microsoft Entra Connect and then creates a policy requiring a hybrid joined or compliant device. Contractors using personal laptops register them instead and are allowed only browser access.",
  "mistakes": [
   [
    "Choosing Microsoft Entra joined for employees' personal phones.",
    "Personal devices are Microsoft Entra registered. Join is for organization-owned Windows devices."
   ],
   [
    "Turning on Require MFA to register or join devices as the recommended control.",
    "Microsoft recommends leaving it off and using a Conditional Access policy on the Register or join devices user action."
   ],
   [
    "Treating hybrid joined as proof that a device is secure.",
    "Hybrid joined proves domain membership only. Compliance, from Intune, checks settings such as encryption and OS version."
   ],
   [
    "Configuring hybrid join in the Entra admin center device settings.",
    "Hybrid join is configured in Microsoft Entra Connect, which sets up the SCP; computers must be in sync scope."
   ]
  ],
  "tryit": [
   [
    "Copperfield Law has 300 Windows desktops joined to its on-premises domain, managed by Group Policy that it cannot retire this year. It wants Conditional Access to recognize these desktops as corporate devices. A colleague suggests re-imaging them all as Microsoft Entra joined. What do you recommend instead?",
    "Configure Microsoft Entra hybrid join in Microsoft Entra Connect so the SCP is created, make sure the computer objects are in sync scope, and let the desktops register automatically. They keep their domain membership and Group Policy while Conditional Access can require a hybrid joined device."
   ],
   [
    "Your tenant lets all users join devices, and an audit finds one employee joined 14 personal machines. Which two device settings would you change?",
    "Limit Users may join devices to Microsoft Entra to selected users or a group, and lower the Maximum number of devices per user. Adding a Conditional Access policy for the Register or join devices action adds MFA protection."
   ]
  ],
  "tip": "Personal device equals registered; company device with cloud only equals joined; company device still in on-premises AD equals hybrid joined. For requiring MFA when joining devices, the recommended answer is a Conditional Access policy on the Register or join devices user action.",
  "check": [
   [
    "Which device identity type fits employee-owned phones that access corporate email?",
    "Microsoft Entra registered."
   ],
   [
    "Where do you configure Microsoft Entra hybrid join for domain-joined computers?",
    "In Microsoft Entra Connect, which configures the service connection point; the computers must be in sync scope."
   ],
   [
    "Why is Require multifactor authentication to register or join devices usually left off?",
    "Microsoft recommends using a Conditional Access policy targeting the Register or join devices user action instead, which is more flexible."
   ],
   [
    "What does Windows LAPS with Entra provide?",
    "A unique, rotating local administrator password for each device, backed up to Entra ID."
   ]
  ]
 },
 {
  "t": "External identities: B2B collaboration, guest invitations and redemption, external collaboration settings",
  "hook": "Riverbend Architecture has just signed a three-month contract with an outside lighting design studio, and the project lead, Hana, wants the studio's six designers in the shared project site by tomorrow. Her first idea is to create six new accounts with passwords and email them out. Then you notice something else in the directory: 214 guest accounts, some invited by interns, a few from a competitor's domain, and one guest who apparently can browse the entire staff list. Nobody decided any of this on purpose; it is all default settings. How do you bring partners in without handing out passwords, and who should be allowed to open that door in the first place?",
  "simple": "Sometimes people from other companies need to work with you, such as a contractor or a partner team. Instead of creating a new account and password for each of them, Microsoft lets you invite them as guests. They sign in with the account they already have at their own company, or with a one-time code sent to their email, and your directory keeps a small guest record for them so you can give them access. Accepting the invitation is called redemption. You also decide the house rules: who in your company may send invitations, how much of your directory guests can see, and which outside companies are allowed or blocked. It is like a building where visitors show their own ID at reception and get a visitor badge, instead of being issued a permanent staff card.",
  "body": [
   "Microsoft Entra External ID for business-to-business (B2B) collaboration lets people from partner organizations use your apps and data with their own credentials. Instead of creating and managing a password for a contractor, you invite them; they authenticate with their home identity, and your tenant gets a user object that represents them. By default this object has userType Guest, which gives it more limited directory permissions than a member. This model is safer than shared or locally created accounts because the partner's organization keeps managing the person's password and disables their account when they leave, which immediately stops sign-ins to your tenant too.",
   "An invitation can come from several places. Admins can invite from the admin center (New user, then Invite external user), use bulk invite with a comma-separated values (CSV) file, or call Microsoft Graph or PowerShell. Invitations also happen indirectly when someone shares a Microsoft Teams team, a file or a SharePoint site with an outside address, if settings allow it. The invited user gets an email with a redemption link, or you can send them a direct link to an app or to your tenant's My Apps portal instead.",
   "Redemption is the moment the guest accepts. They sign in with their identity, review and consent to your privacy terms, and the guest object is linked to their identity. Until then the guest's acceptance status shows Pending acceptance in the user's properties. A guest who has redeemed can be given access through the same tools as anyone else: group membership, app assignment, or an access package. If a guest's email address changes or they move to a new home identity, you can reset redemption status, which lets them redeem again while keeping their object ID, group memberships and app assignments.",
   "How the guest authenticates depends on who they are, and Entra works through the options in order. If they have a Microsoft Entra account in their own organization, they use it. Otherwise they can use a personal Microsoft account, Google federation if you have configured it, or a Security Assertion Markup Language (SAML) or WS-Federation identity provider you set up for their domain. If none of those apply, email one-time passcode (OTP) sends a code to their email address each time they sign in. Self-service sign-up user flows can additionally offer identity providers such as Facebook. Whatever the method, your tenant can still apply its own Conditional Access to guests, such as requiring multifactor authentication (MFA), and cross-tenant access settings decide whether you trust MFA performed in their home tenant.",
   "External collaboration settings, under External Identities, control the rules of engagement. Guest user access restrictions set how much of the directory guests can see, with three levels: guests have the same access as members (most inclusive); guests have limited access to properties and memberships of directory objects, which is the default; and guest access is restricted to properties and memberships of their own directory objects, the most restrictive level, where guests see essentially only their own profile.",
   "Guest invite settings decide who can invite, with four levels. Anyone in the organization can invite guest users, including guests and non-admins, is the most inclusive. Member users and users assigned to specific admin roles can invite, including guests with member permissions, is next. Only users assigned to specific admin roles can invite guest users is tighter; this is where the Guest Inviter role becomes useful, because it lets you grant invitation rights to a few people without a broader admin role. Finally, no one in the organization can invite guest users, including admins, is the most restrictive.",
   "The same settings page holds a few more controls. You can enable guest self-service sign-up through user flows, so external users can sign up for specific apps without an invitation. You can allow external users to remove themselves from your organization. Collaboration restrictions let you either allow invitations to any domain, deny invitations to specific domains with a deny list, or allow invitations only to specific domains with an allow list. You can use one list or the other, not both at once, and the restrictions apply to new invitations, not to guests who already exist.",
   "Guest accounts should be governed like any other access, because guests accumulate quietly. Use access reviews to have owners or the guests themselves confirm that access is still needed, entitlement management to give time-limited access packages that expire on their own, and the sign-in logs to spot guests who have not signed in for months. When a partner effectively works as part of your team, you can change the external user's userType to Member so they get member-level directory permissions while still signing in with their home identity."
  ],
  "analogy": "B2B collaboration is like a conference center that lets visitors in with their own government ID rather than issuing them a new passport. Reception (your tenant) records a visitor badge (the guest object) linked to that ID. External collaboration settings are the front-desk rules: who may sign visitors in, which rooms visitors may look into, and which companies are on the welcome or banned list. Where it breaks: if the visitor's home country revokes their ID, your badge stops working too, which is a benefit, not a flaw.",
  "terms": [
   [
    "B2B collaboration",
    "Inviting external users to use your resources with their own identities, represented as user objects in your tenant."
   ],
   [
    "Redemption",
    "The step where an invited external user accepts the invitation and links their home identity to the guest object."
   ],
   [
    "Email one-time passcode",
    "A sign-in method for guests without a supported identity provider, where a code is emailed at each sign-in."
   ],
   [
    "Guest Inviter",
    "A built-in role allowing a user to invite external users when invitations are restricted to admins."
   ],
   [
    "Collaboration restrictions",
    "An allow list or deny list of domains that controls where invitations can be sent."
   ],
   [
    "Reset redemption status",
    "Letting a guest redeem again with a new email or identity while keeping their object ID and access."
   ]
  ],
  "example": "A design agency needs access to a Contoso SharePoint site for a three-month project. Contoso's admin invites the agency's staff by bulk CSV; they redeem with their own Entra accounts, and a Conditional Access policy requires MFA for guests. Contoso adds the agency's domain to the allow list so staff cannot invite people from other companies.",
  "mistakes": [
   [
    "Creating local accounts with passwords for partner staff.",
    "B2B invitations let partners use their own identities, so their organization manages passwords and offboarding."
   ],
   [
    "Deleting and re-inviting a guest whose email address changed.",
    "Reset redemption status instead; it keeps the object ID, group memberships and app assignments."
   ],
   [
    "Using both an allow list and a deny list at the same time.",
    "Collaboration restrictions use one or the other. Choose deny for blocking a few domains, allow for permitting only a few."
   ],
   [
    "Picking same access as members for guests who should see only their own profile.",
    "The most restrictive guest access level limits guests to their own directory objects; the default is limited access."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Foods currently lets anyone, including guests, send invitations, and a recent review found guests inviting other guests. Management wants only the partner management team, who hold no admin roles, to invite outsiders. Which settings do you change?",
    "Set guest invite settings to Only users assigned to specific admin roles can invite guest users, then assign the partner management team the Guest Inviter role. That limits invitations without giving them broader admin rights."
   ],
   [
    "A guest invited two weeks ago says she never got access, and her account shows Pending acceptance. She has no Entra or Microsoft account. What is happening and how will she sign in?",
    "She has not redeemed the invitation yet. When she follows the redemption link, Entra will use email one-time passcode (unless Google or another identity provider is configured for her domain), sending a code to her email."
   ]
  ],
  "tip": "Know the four guest invite settings and the three guest access restriction levels. If a scenario wants guests to see only their own profile, pick the most restrictive guest access setting; if it wants only certain domains invited, use collaboration restrictions.",
  "check": [
   [
    "What sign-in option does a guest use when their domain has no Entra tenant or other configured identity provider?",
    "Email one-time passcode, or a personal Microsoft account if they have one."
   ],
   [
    "How can you stop users from inviting guests from a competitor's domain?",
    "Add the competitor's domain to the deny list in the collaboration restrictions of the external collaboration settings (or use an allow list of approved domains)."
   ],
   [
    "What does the acceptance status Pending on a guest account mean?",
    "The invitation has been sent but the user has not yet redeemed it."
   ],
   [
    "What is the default guest user access level?",
    "Limited access to properties and memberships of directory objects."
   ]
  ]
 },
 {
  "t": "Cross-tenant access settings (inbound/outbound, trust settings), B2B direct connect and cross-tenant synchronization",
  "hook": "Halcyon Group owns two companies, Halcyon Freight and Halcyon Marine, each with its own Microsoft Entra tenant. Every week, someone from Freight emails you asking to be invited into a Marine Teams channel, and every time they get there they are told to set up multifactor authentication all over again, even though they already did it at home. Meanwhile, a long-time partner, Orchard Systems, wants its engineers in a shared Teams channel with your developers, but your security lead, Ines, refuses to create more guest accounts nobody will ever clean up. You suspect the answer is not another invitation. Which settings let two tenants trust each other, share a channel without guests, or keep users in sync automatically?",
  "simple": "When two organizations both use Microsoft's cloud directory, they can set rules about each other. Inbound rules decide which of their people can come into your space; outbound rules decide which of your people can go into theirs. Trust settings let you accept the other side's security checks, such as their sign-in codes, so their people don't have to repeat them. B2B direct connect lets people from both sides work in a shared Teams channel without creating a guest account at all, but both companies must switch it on. Cross-tenant synchronization is for sister companies under one owner: it copies people from one directory into the other automatically. It is like two neighboring schools agreeing which students may visit, whether to honor each other's hall passes, and whether to share a club room.",
  "body": [
   "External collaboration settings decide who can invite whom. Cross-tenant access settings go deeper for collaboration with other Microsoft Entra tenants: they control which users and apps can cross the boundary, in which direction, and whether you trust security claims from the other tenant. You manage them in the admin center under External Identities, then Cross-tenant access settings. There are default settings, which apply to every external Entra tenant you have not configured specifically, and organizational settings, which override the defaults for specific tenants you add by domain name or tenant ID. A common pattern is restrictive defaults with more generous organizational settings for trusted partners.",
   "Settings have two directions, and it helps to picture them as two doors. Inbound access controls external users coming into your tenant to use your resources. Outbound access controls your users going out to access other organizations' resources. For each direction, and separately for B2B collaboration and B2B direct connect, you can allow or block all users, or specific users and groups, and all applications or specific applications. Both sides must allow a connection for it to work: your outbound setting and their inbound setting. If a user can't reach a partner's app, check both tenants, because either side can be the one blocking.",
   "Inbound trust settings decide whether your Conditional Access accepts claims from the guest's home tenant. You can trust multifactor authentication (MFA) performed there, trust devices marked compliant there, and trust Microsoft Entra hybrid joined devices there. Without trust, a guest facing a device compliance requirement would have no way to satisfy it, because your Microsoft Intune doesn't manage their laptop, and an MFA requirement would force them to register MFA again in your tenant. Trusting the partner's claims removes that friction while still enforcing your policy, because the partner's controls are doing the work you require.",
   "Trust settings also include automatic redemption. Normally a B2B user sees a consent prompt the first time they access a resource tenant. With automatic redemption, that prompt is suppressed for users from the configured tenant. It must be enabled on both sides: outbound in the user's home tenant and inbound in the resource tenant. This is typical between tenants of the same parent organization and is usually paired with cross-tenant synchronization.",
   "B2B direct connect is a different collaboration model: no guest object is created in your tenant. The external user stays entirely in their home tenant and gets access to specific shared resources, today mainly Microsoft Teams shared channels. Because there is no object for you to govern in your own directory, B2B direct connect is off by default and requires mutual configuration: both organizations must enable it inbound and outbound for each other, usually as organizational settings for that specific partner. Your Conditional Access policies still apply, and trust settings matter here too, because the external user has no way to register MFA in your tenant. Reports and audit logs in both tenants show the activity.",
   "Cross-tenant synchronization automates B2B collaboration between tenants you control, such as subsidiaries of one company or tenants left separate after a merger. It is configured in the source tenant as a provisioning job, much like provisioning to a software-as-a-service app. The job creates, updates and deletes B2B user objects in the target tenant, by default with userType Member so they get member-level permissions and appear as colleagues rather than guests. When a user leaves or falls out of scope in the source tenant, the job removes or disables them in the target, which closes the offboarding gap.",
   "Two configurations make synchronization work. The target tenant must allow users sync into this tenant in its inbound cross-tenant access settings for the source tenant, and usually enables automatic redemption so synchronized users never see a consent prompt. The source tenant configures the provisioning job, enables automatic redemption outbound, and defines scope using users and groups assigned to the configuration plus attribute-based scoping filters, just like app provisioning. Provisioning logs show each create, update and delete, and provision on demand lets you test a single user. Synchronization is one-way; if both tenants need each other's users, create a second configuration in the other direction.",
   "To choose among these tools, match the need to the feature. Guests asked to repeat MFA or blocked by device compliance point to inbound trust settings. Teams shared channels without guest accounts point to B2B direct connect, enabled by both tenants. Automatically maintained users across tenants of one organization point to cross-tenant synchronization, configured in the source with inbound sync allowed in the target."
  ],
  "analogy": "Picture two neighboring office buildings. Inbound and outbound settings are the doors on each side, and a visit only works if your exit door and their entry door are both unlocked. Trust settings mean their security desk accepts your building's badge check instead of searching you again. B2B direct connect is a shared conference room on the bridge between buildings: nobody gets a badge in the other building. Cross-tenant sync is the HR office automatically issuing badges for staff of a sister company. Where it breaks: synchronization only flows one way unless you configure both.",
  "terms": [
   [
    "Inbound access",
    "Cross-tenant settings controlling which external users and apps can reach your tenant's resources."
   ],
   [
    "Outbound access",
    "Cross-tenant settings controlling which of your users can access other tenants' resources."
   ],
   [
    "Inbound trust settings",
    "Options to accept MFA, compliant device and hybrid joined device claims from a partner's home tenant."
   ],
   [
    "B2B direct connect",
    "Mutual trust that lets external users access resources such as Teams shared channels without a guest object in your tenant."
   ],
   [
    "Cross-tenant synchronization",
    "A provisioning job from a source tenant that creates and maintains B2B users in a target tenant."
   ],
   [
    "Automatic redemption",
    "A trust setting, enabled on both sides, that suppresses the consent prompt for users from a configured tenant."
   ]
  ],
  "example": "Contoso requires MFA and a compliant device for all users, including guests. A partner, Fabrikam, already enforces both. Contoso adds Fabrikam as an organizational setting, trusts Fabrikam's MFA and compliant devices, and enables B2B direct connect so both companies can share Teams channels. Fabrikam configures the matching outbound and inbound settings on its side.",
  "mistakes": [
   [
    "Configuring cross-tenant synchronization in the target tenant.",
    "The provisioning job is configured in the source tenant; the target only allows inbound user sync for that source."
   ],
   [
    "Enabling B2B direct connect on only your side.",
    "It is off by default and must be enabled inbound and outbound by both organizations."
   ],
   [
    "Fixing repeated MFA prompts for partner users by excluding guests from MFA.",
    "Trust the partner's MFA in inbound trust settings so your policy is satisfied without weakening it."
   ],
   [
    "Expecting cross-tenant synchronization to flow both ways automatically.",
    "It is one-way. A second configuration in the opposite direction is needed for two-way sync."
   ]
  ],
  "tryit": [
   [
    "Alder Health's tenant has a Conditional Access policy requiring a compliant device for all users. Staff from Alder's long-time partner, Birchwood Labs, are now blocked on every sign-in, even though Birchwood manages all its laptops with Intune and marks them compliant. What change fixes this without weakening the policy?",
    "Add Birchwood Labs as an organizational setting in cross-tenant access settings and, under inbound trust settings, trust compliant devices (and MFA if required) from Birchwood's tenant. Alder's policy then accepts Birchwood's compliance claims."
   ],
   [
    "A parent company wants every employee of its subsidiary to appear automatically as a member, not a guest, in the parent tenant, with no consent prompts, and removed when they leave. What do you configure, and where?",
    "Cross-tenant synchronization configured in the subsidiary (source) tenant, with automatic redemption enabled outbound there. In the parent (target) tenant, allow users sync into this tenant and enable automatic redemption inbound for the subsidiary."
   ]
  ],
  "tip": "If guests are being prompted to register MFA in your tenant even though they already did MFA at home, the fix is inbound trust settings. If the scenario mentions Teams shared channels without guest accounts, the answer is B2B direct connect, which both tenants must enable.",
  "check": [
   [
    "Where is cross-tenant synchronization configured, and what must the other tenant allow?",
    "It is configured in the source tenant; the target tenant must allow users sync into this tenant in its inbound cross-tenant access settings for the source."
   ],
   [
    "Which setting stops guests from a trusted partner from being blocked by your policy requiring compliant devices?",
    "Inbound trust settings for that organization, trusting compliant devices from the partner's tenant."
   ],
   [
    "Does B2B direct connect create a guest user object in the resource tenant?",
    "No. Users remain in their home tenant, which is why both organizations must explicitly enable it."
   ],
   [
    "A user can't reach a partner's app even though the partner allows inbound access. What else should you check?",
    "Your own outbound access settings, because both your outbound and their inbound must allow the connection."
   ]
  ]
 },
 {
  "t": "Hybrid identity: Microsoft Entra Connect Sync vs Microsoft Entra Cloud Sync, filtering and sync scheduling",
  "hook": "Granite Peak Manufacturing has run a single on-premises Active Directory for fifteen years, synchronized to the cloud by one aging server in a closet. This quarter it bought Tidewater Plastics, whose own Active Directory forest sits on a separate network with no VPN between the two companies, and nobody wants to build one. The CIO, Rosa, wants Tidewater's people signing in to Microsoft 365 next week. At the same time, a technician changed a user's department an hour ago and asks why the cloud still shows the old value. You have two sync tools to choose from and one scheduler to understand. Which tool fits the disconnected forest, and how do you push a change now instead of waiting?",
  "simple": "Many companies keep their user accounts in an older system in their own building, called Active Directory. To use Microsoft's cloud with the same accounts, a tool copies those accounts up to the cloud directory, and keeps copying changes. Microsoft offers two such tools. Connect Sync is the older, full-featured one: a program installed on a server in your building that does all the work there. Cloud Sync is the newer, lighter one: you install a small helper program, and the main work and settings live in the cloud. You also choose which accounts to copy, so test accounts don't end up in the cloud. It is like a mail service: one option is a full sorting office you run yourself, the other is a small drop box that the post office empties for you.",
  "body": [
   "Most organizations still have on-premises Active Directory Domain Services (AD DS). Hybrid identity means the same people exist in both places with one set of credentials, so a user who signs in to a domain computer in the morning can open Microsoft 365 with the same username and password. Synchronization makes this possible by copying users, groups and optionally devices from AD DS to Microsoft Entra ID, and then keeping them up to date. Because AD DS remains the source of authority for synchronized objects, changes are made on-premises and flow to the cloud. Microsoft offers two tools for this, and the exam asks which to choose.",
   "Microsoft Entra Connect Sync is the traditional sync engine. You install it on a domain-joined Windows Server, where it runs a full synchronization engine with a SQL database, using SQL Server Express by default for smaller deployments. Only one server actively exports to a tenant at a time. A second server can run in staging mode, importing and synchronizing but not exporting, ready for failover or for safely testing configuration changes before you switch it to active. This active and standby pattern is how you get resilience with Connect Sync.",
   "Connect Sync supports the widest set of features. It synchronizes device objects needed for Microsoft Entra hybrid join, supports group writeback, device writeback and Exchange hybrid writeback, and sets up pass-through authentication and federation with Active Directory Federation Services (AD FS). It also offers highly customizable synchronization rules through the Synchronization Rules Editor, so you can transform attributes or filter objects in detailed ways. That flexibility is why large or complex single-forest environments often stay on Connect Sync.",
   "Microsoft Entra Cloud Sync moves the engine into the cloud. You install only a lightweight provisioning agent on one or more domain-joined servers, and the configuration lives in the Entra admin center rather than on the server. Multiple agents give high availability without a staging server, because any healthy agent can do the work. Cloud Sync handles multiple disconnected forests well, which helps after mergers, since each forest just needs agents that can reach the cloud, not each other. It does not cover every Connect Sync feature; for example it doesn't synchronize device objects for hybrid join and doesn't support pass-through authentication, so check the requirements before choosing it.",
   "Microsoft positions Cloud Sync as the future direction for synchronization, and the two tools can run in the same tenant for different sets of objects. A common design is Connect Sync for the main forest, where hybrid join and writeback are needed, and Cloud Sync for an acquired forest that only needs users and groups. The important rule is that the same object should be synchronized by only one tool, so scoping must not overlap.",
   "Filtering decides which objects synchronize, and careful filtering keeps service accounts, test users and stale objects out of the cloud. With Connect Sync you can filter by domain, by organizational unit (OU), by attribute through custom sync rules, and by group membership, although group-based filtering is intended for pilots only and is not recommended for production. Cloud Sync scopes by OU or by security group. Removing objects from scope deletes them in Entra, so Connect Sync has an accidental deletes threshold, 500 objects by default, that stops an export which would delete too many at once and waits for an administrator to confirm.",
   "Connect Sync runs a delta sync cycle every 30 minutes by default. A delta cycle processes only changes since the last run, which is fast. You can check the scheduler, confirm it is enabled and see the next run time, and force a run in PowerShell on the Connect Sync server:",
   "```powershell\nGet-ADSyncScheduler\nStart-ADSyncSyncCycle -PolicyType Delta\nStart-ADSyncSyncCycle -PolicyType Initial   # full sync after rule or filter changes\n```",
   "Use a delta cycle to push a recent change, such as the technician's department update, without waiting for the next scheduled run. Use an initial cycle, a full synchronization, after changing filtering or sync rules, because objects that were not changed still need to be re-evaluated against the new configuration. Cloud Sync runs on its own frequent schedule and offers provision on demand to test or immediately push a single user. Password hash synchronization runs on its own shorter cycle, separate from object sync, so password changes usually reach the cloud faster than attribute changes."
  ],
  "analogy": "Connect Sync is like running your own full print shop in the office: powerful, endlessly configurable, but you maintain the presses and keep a spare shop on standby. Cloud Sync is like dropping files into a small kiosk that sends them to a cloud print service; you can add more kiosks for resilience and place them in buildings that are not connected to each other. The analogy breaks on features: the cloud service still cannot do a few specialty jobs, such as device sync for hybrid join.",
  "terms": [
   [
    "Microsoft Entra Connect Sync",
    "An on-premises sync engine on Windows Server with a SQL database, supporting the broadest hybrid feature set."
   ],
   [
    "Microsoft Entra Cloud Sync",
    "A cloud-managed sync service that uses lightweight provisioning agents; configured in the Entra admin center."
   ],
   [
    "Staging mode",
    "A Connect Sync server that imports and syncs but does not export, used for failover and testing."
   ],
   [
    "Delta sync",
    "A sync cycle that processes only changes since the last run."
   ],
   [
    "Accidental deletes threshold",
    "A Connect Sync safeguard that blocks exports deleting more than a set number of objects."
   ],
   [
    "Provision on demand",
    "A Cloud Sync option to synchronize or test a single user immediately."
   ]
  ],
  "example": "Contoso acquires Litware, whose AD forest has no network connectivity to Contoso's. Contoso keeps Connect Sync for its own forest, which uses hybrid join and group writeback, and installs two Cloud Sync provisioning agents in Litware's forest. Litware users appear in the same tenant within minutes, with no VPN between the forests.",
  "mistakes": [
   [
    "Choosing Cloud Sync when the scenario needs device sync for hybrid join.",
    "Cloud Sync doesn't synchronize device objects for hybrid join; Connect Sync does."
   ],
   [
    "Running two active Connect Sync servers for high availability.",
    "Only one server exports. The second must be in staging mode and switched to active for failover."
   ],
   [
    "Running a delta cycle after changing OU filtering.",
    "Filter and rule changes need an initial (full) cycle so every object is re-evaluated."
   ],
   [
    "Using group-based filtering for the production rollout in Connect Sync.",
    "Group-based filtering is intended for pilots. Use domain, OU or attribute filtering in production."
   ]
  ],
  "tryit": [
   [
    "Saltmarsh Retail just acquired a chain whose AD forest is on a completely separate network. The acquired company needs only users and groups in the tenant, and leadership wants high availability without managing another full sync server. Saltmarsh's own forest already uses Connect Sync with hybrid join. What do you deploy for the acquired forest?",
    "Microsoft Entra Cloud Sync with two or more provisioning agents in the acquired forest, scoped so it doesn't overlap the Connect Sync scope. Cloud Sync suits disconnected forests and gets high availability from multiple agents, while Connect Sync stays in place for the main forest's hybrid join."
   ],
   [
    "An admin moved three OUs out of the Connect Sync filter, and the next export would delete about 900 users. The export has stopped. Why, and what should happen next?",
    "The accidental deletes threshold (500 by default) blocked the export. Confirm whether the deletions were intended; if they were not, fix the filter and run a full sync; if they were, an admin can allow the export to proceed."
   ]
  ],
  "tip": "Disconnected forests or a need for a lightweight, highly available agent point to Cloud Sync. Device sync for hybrid join, pass-through authentication, or complex custom sync rules point to Connect Sync. Remember Start-ADSyncSyncCycle -PolicyType Delta to force a sync.",
  "check": [
   [
    "What is the default Microsoft Entra Connect Sync scheduler interval?",
    "30 minutes for a delta synchronization cycle."
   ],
   [
    "How do you provide failover for Connect Sync, and how does Cloud Sync differ?",
    "Connect Sync uses a second server in staging mode that you switch to active; Cloud Sync simply installs multiple provisioning agents for high availability."
   ],
   [
    "Which sync cycle should you run after changing OU filtering?",
    "An initial (full) cycle, Start-ADSyncSyncCycle -PolicyType Initial."
   ],
   [
    "What does the accidental deletes threshold protect against?",
    "An export that would delete more than a set number of objects (500 by default) in Entra ID at once."
   ]
  ]
 },
 {
  "t": "Sign-in methods for hybrid users: password hash sync, pass-through authentication, federation, Seamless SSO, staged rollout",
  "hook": "At 6:40 on a Monday morning, the phones at Lakeshore Mutual start ringing: nobody can sign in to Microsoft 365. The cause turns out to be a single expired certificate on the federation servers in the data center, the ones only one retired engineer really understood. By 9 a.m. it is fixed, but the chief operating officer, Gloria, wants to know why one box in a basement can lock 3,000 people out of email, and whether there is a simpler way. She also wants to keep the rule that a disabled account stops working the instant HR disables it. Where should passwords be checked when hybrid users sign in to the cloud, and how do you change methods without another bad Monday?",
  "simple": "When your user accounts come from an office directory but people sign in to cloud apps, someone has to check the password. There are three choices. Password hash sync sends a scrambled, one-way version of the password to the cloud, so the cloud can check it by itself. Pass-through authentication keeps passwords at the office: small helper programs check each sign-in against the office directory in real time. Federation sends people to a separate sign-in server you run, which vouches for them. Seamless single sign-on lets office computers sign people in without typing a password. Staged rollout lets you try a new method with a small group first. It is like choosing whether the cloud keeps a fingerprint scan on file, phones the office to check each ID, or trusts a separate security desk.",
  "body": [
   "Once users are synchronized, you must decide where their passwords are checked when they sign in to cloud services. This choice affects resilience, security features and how much infrastructure you run. There are three authentication methods: password hash synchronization, pass-through authentication and federation. Password hash synchronization and pass-through authentication are called cloud authentication because Microsoft Entra ID handles the sign-in; federation hands it to another system. Choosing between them is a favorite exam topic.",
   "Password hash synchronization (PHS) copies a hash of the on-premises password hash to Microsoft Entra ID, never the password itself. Before it leaves the network, the on-premises hash is re-hashed with a salt and many iterations of a key derivation function, so the value stored in the cloud cannot be used to sign in to on-premises AD. Microsoft Entra ID then authenticates users directly in the cloud. PHS is the simplest option and has no on-premises dependency at sign-in time, so an outage in your data center does not stop cloud sign-ins. It also enables leaked credential detection in Microsoft Entra ID Protection, because Microsoft can compare hashes against credentials found in breach data. Password changes sync within minutes, and many organizations enable PHS even when using another method, as a backup.",
   "Pass-through authentication (PTA) validates passwords against on-premises AD in real time. Lightweight agents installed on domain-joined servers make outbound connections to Entra, so no inbound firewall ports are needed. When a user signs in, Entra places the encrypted password on a queue, an agent picks it up, checks it against a domain controller, and returns the result. No password hash is stored in the cloud, and on-premises account policies such as logon hours, disabled accounts, locked accounts and expired passwords apply immediately. The trade-off is availability: if no agent can reach Entra and a domain controller, users can't sign in, so install at least three agents for resilience.",
   "Federation hands authentication to a separate identity provider, typically Active Directory Federation Services (AD FS). The domain in Entra is set as federated, and users are redirected to the federation server, which authenticates them and issues a token that Entra trusts. Federation supports requirements the cloud methods can't, such as some on-premises smart card scenarios or third-party multifactor authentication (MFA) servers that must sit in the sign-in path. But it brings the most infrastructure: federation servers, Web Application Proxy servers, certificates to renew, and load balancers. Microsoft recommends moving from federation to cloud authentication when possible.",
   "Seamless single sign-on (Seamless SSO) improves the experience for cloud authentication, and it works with PHS or PTA, not with federation. When a user on a domain-joined device inside the corporate network opens a cloud app, the browser obtains a Kerberos ticket for a computer account named AZUREADSSOACC that Microsoft Entra Connect creates in AD, and Entra signs the user in without a password prompt. The Kerberos decryption key for this account is sensitive, so it should be rolled over periodically. Microsoft Entra joined and hybrid joined Windows devices use their primary refresh token (PRT) for SSO instead, so Seamless SSO mainly helps older or domain-only devices.",
   "Staged rollout lets you move from federation to cloud authentication gradually rather than in one risky step. You turn on PHS or PTA for selected security groups, and only those users authenticate in the cloud, while the domain stays federated for everyone else. You can also enable Seamless SSO for the same groups. Nested and dynamic groups aren't supported for staged rollout, so use directly assigned security groups. You watch the pilot users' sign-ins in the sign-in logs, expand the groups, and when the pilot succeeds you convert the domain from federated to managed and decommission the federation servers.",
   "Choosing a method comes down to a few questions. Do you want the least infrastructure, cloud resilience and leaked credential detection? Choose PHS. Must on-premises policies like logon hours apply at sign-in, with no hashes in the cloud? Choose PTA, with several agents and possibly PHS as a backup. Is there a requirement the cloud cannot meet, such as a third-party MFA server in the sign-in path? Federation may still be needed. Then add Seamless SSO for cloud authentication and use staged rollout to migrate safely."
  ],
  "analogy": "Imagine a stadium checking tickets. Password hash sync is like the gate keeping a fingerprint of each valid ticket, so it can check fans even if the box office is closed. Pass-through authentication is the gate radioing the box office for every ticket: always current, but useless if the radio dies. Federation sends fans to a separate security tent that stamps their hand. Where it breaks: the fingerprint cannot be turned back into a real ticket, which is why storing it is considered safe.",
  "terms": [
   [
    "Password hash synchronization",
    "Syncing a salted, re-hashed version of the on-premises password hash so Entra ID can authenticate users in the cloud."
   ],
   [
    "Pass-through authentication",
    "Cloud sign-in where on-premises agents validate passwords against AD DS in real time."
   ],
   [
    "Federation",
    "Delegating authentication to a separate identity provider such as AD FS that issues tokens Entra trusts."
   ],
   [
    "Seamless SSO",
    "Kerberos-based silent sign-in for domain-joined devices on the corporate network, used with PHS or PTA."
   ],
   [
    "Staged rollout",
    "Moving selected groups from federated to cloud authentication before converting the whole domain."
   ],
   [
    "AZUREADSSOACC",
    "The computer account in AD that Seamless SSO uses to issue Kerberos tickets for Entra sign-in."
   ]
  ],
  "example": "A bank runs AD FS but its federation servers are costly to maintain. The team enables password hash sync for everyone as a backup, uses staged rollout to move a pilot group of 200 users to PHS with Seamless SSO, watches the sign-in logs for a month, and then converts the domain to managed and retires AD FS.",
  "mistakes": [
   [
    "Pairing Seamless SSO with AD FS federation.",
    "Seamless SSO works only with cloud authentication, PHS or PTA. Federated users get SSO from the federation service."
   ],
   [
    "Thinking PHS sends the actual password to the cloud.",
    "PHS sends a salted, re-hashed version of the password hash; the password itself never leaves the network."
   ],
   [
    "Installing a single PTA agent.",
    "If that agent is unavailable, users cannot sign in. Install at least three agents, and consider PHS as a backup."
   ],
   [
    "Using a dynamic group for the staged rollout pilot.",
    "Staged rollout doesn't support dynamic or nested groups. Use directly assigned security groups."
   ]
  ],
  "tryit": [
   [
    "Osprey Credit Union syncs users from AD and wants cloud sign-in, but its auditors require that an account disabled on-premises stop working in the cloud immediately and that no password hashes be stored outside the data center. It does not want to run federation servers. Which method fits?",
    "Pass-through authentication with at least three agents. PTA checks every sign-in against AD in real time, so disabled accounts and logon hours apply immediately, and no hashes are stored in the cloud. PHS would conflict with the no-hashes requirement, and federation adds the infrastructure they want to avoid."
   ],
   [
    "A hospital runs AD FS and wants to move 5,000 users to PHS but is nervous about a single cutover. What approach reduces risk?",
    "Enable PHS for everyone, then use staged rollout with directly assigned pilot groups to move some users to cloud authentication while the domain stays federated. Expand the groups, monitor sign-in logs, and convert the domain to managed when ready."
   ]
  ],
  "tip": "If the scenario needs on-premises policies like logon hours enforced at sign-in without storing hashes in the cloud, choose PTA. If it wants the least infrastructure or leaked credential detection, choose PHS. Seamless SSO never pairs with federation.",
  "check": [
   [
    "Which hybrid sign-in method enables leaked credential detection in ID Protection?",
    "Password hash synchronization, because Entra ID has the hashes to compare against leaked credentials."
   ],
   [
    "What happens to pass-through authentication sign-ins if all on-premises agents are offline?",
    "Users can't sign in with PTA, which is why you install multiple agents (and may enable PHS as a backup)."
   ],
   [
    "What is the purpose of staged rollout?",
    "To test cloud authentication (PHS or PTA) with selected groups while the domain remains federated, before converting fully."
   ],
   [
    "Which computer account does Seamless SSO create in Active Directory?",
    "AZUREADSSOACC."
   ]
  ]
 },
 {
  "t": "Monitoring sync health with Microsoft Entra Connect Health and troubleshooting sync errors",
  "hook": "On Thursday afternoon at Foxglove Insurance, a new claims adjuster named Andre has been waiting two days for his Microsoft 365 mailbox. His account exists in on-premises Active Directory, HR swears everything was entered correctly, and the help desk has already restarted his laptop twice. Nobody noticed that synchronization had been quietly failing for him since Tuesday, because nobody was watching. When you finally open the monitoring blade, there it is: a red alert and an error that says duplicate attribute. Somewhere in the directory, another object already claims Andre's email address. Where do you find out which object, and where do you fix it so the fix survives the next sync?",
  "simple": "Copying accounts from an office directory to the cloud happens automatically in the background, so when it breaks, nobody notices unless something is watching. Microsoft Entra Connect Health is that watcher: small helper programs on your servers report problems, and it can email you when something goes wrong. A common problem is a clash, where two accounts claim the same unique value, like the same email address, and the cloud refuses to accept the second one. Another is bad data, like a character that isn't allowed in a username. The rule for fixing these is simple: fix the data where it comes from, usually the office directory, then let the copy run again. It is like a school roster where two students are given the same locker number: you fix the master list, not the sticker on the locker.",
  "body": [
   "Synchronization runs quietly in the background, so you need monitoring to know when it breaks. Microsoft Entra Connect Health provides that monitoring for hybrid identity infrastructure. It works through agents on your on-premises servers: the sync agent is installed automatically with Microsoft Entra Connect Sync, and separate agents can be installed to monitor Active Directory Federation Services (AD FS) servers and Active Directory Domain Services (AD DS) domain controllers. The agents send health data to the cloud, where you view it in the Entra admin center. Connect Health requires Microsoft Entra ID P1 licensing.",
   "In the Connect Health blade you see the health of each monitored server, active alerts, the time of the last successful sync, and performance data. Typical alerts include the sync service is not running, an export to Microsoft Entra ID failed, or password hash synchronization has stopped. You can configure email notifications so the right admins learn about alerts even when they aren't looking at the portal, which is what would have caught Andre's problem on Tuesday. For AD FS, Connect Health also reports failed sign-ins and risky IP addresses with repeated bad password attempts; for AD DS, it reports replication and domain controller health.",
   "The Synchronization errors report lists objects that failed to export and why. Duplicate attribute errors occur when two objects have the same UserPrincipalName or proxyAddresses value, which Entra blocks because these must be unique across the tenant. Data mismatch errors occur when a soft match finds an existing cloud object that can't be matched. Data validation failures happen when a value breaks a rule, for example invalid characters in a UPN. Large attribute errors appear when a value such as userCertificate or thumbnailPhoto exceeds the allowed size. Federated domain change errors appear when a UPN suffix change moves a user between federated domains. Each entry shows the conflicting objects so you can fix the source data.",
   "Many sync errors come from matching, so it is worth understanding how an on-premises object finds its cloud partner. When a synced object first reaches Entra, Entra tries to match it with an existing cloud object. A hard match uses the sourceAnchor, which Entra stores as immutableId and which is based on ms-DS-ConsistencyGuid by default in modern deployments. A soft match falls back to the primary Simple Mail Transfer Protocol (SMTP) address or the UPN. Soft matching is how you attach an on-premises account to a cloud-only user created earlier, for example during a migration. For security, soft matching to cloud accounts that hold administrator roles is blocked, and Microsoft recommends also blocking hard-match takeover of cloud objects, so an attacker who controls on-premises AD cannot quietly take over a cloud admin account.",
   "On the Connect Sync server itself, several tools help you dig deeper. The Synchronization Service Manager shows each run profile, such as delta import, delta synchronization and export, with its status and any object-level errors on the connectors, so you can see whether a problem happens on the AD side or the Entra side. The Microsoft Entra Connect wizard offers a troubleshooting task that checks object synchronization and password hash synchronization for a specific user and explains why an object is not syncing, such as being out of filtering scope.",
   "PowerShell rounds out the toolkit. Get-ADSyncScheduler confirms the scheduler is enabled, shows the next run time, and reveals whether the server is in staging mode or a maintenance state. Start-ADSyncSyncCycle reruns synchronization after a fix, usually with -PolicyType Delta. If synchronization has simply stopped with no errors, these checks often reveal the real cause: a disabled scheduler or a server that was left in staging mode, which imports and synchronizes but never exports. Before a first sync, or before onboarding a new domain, the IdFix tool scans AD for duplicates, invalid characters and formatting problems so you can clean the data in advance.",
   "Troubleshooting follows a repeatable pattern. Read the error and note its category. Identify the conflicting objects shown in the report. Fix the data in the source of authority, which for synchronized objects is usually on-premises AD. Then run a delta sync and confirm the error clears on the next export. Avoid editing synced attributes in the cloud, because the next sync will overwrite them or fail, and the change leaves no trace in AD for the next admin to understand.",
   "Applied to Andre's case, the report shows his proxyAddresses value is already held by a contact object left over from a previous employee. You remove the address from the old object in AD, run Start-ADSyncSyncCycle -PolicyType Delta, and his account exports on the next run. Then you set up email notifications in Connect Health so the next failure is noticed in hours rather than days."
  ],
  "analogy": "Think of sync as a nightly shipment from a warehouse (on-premises AD) to a store (Entra ID). Connect Health is the shipping tracker that texts you when a truck doesn't arrive. A duplicate attribute error is the store refusing a box because a box with the same barcode is already on the shelf. Relabeling the box at the store is pointless, since tomorrow's shipment brings the old label again; you fix the label at the warehouse. Where it breaks: some errors, like oversized attributes, are about the box itself, not its label.",
  "mnemonic": "Fix a sync error with R-I-F-S: Read the error, Identify the conflicting objects, Fix the data at the source of authority, Sync again with a delta cycle.",
  "terms": [
   [
    "Microsoft Entra Connect Health",
    "A monitoring service with on-premises agents that reports health, alerts and sync errors for Connect Sync, AD FS and AD DS."
   ],
   [
    "Duplicate attribute error",
    "A sync error when two objects share a value such as UPN or proxyAddresses that must be unique."
   ],
   [
    "Hard match",
    "Matching an on-premises object to a cloud object by sourceAnchor (immutableId)."
   ],
   [
    "Soft match",
    "Matching an on-premises object to an existing cloud object by primary SMTP address or UPN."
   ],
   [
    "IdFix",
    "A tool that scans on-premises AD for data problems such as duplicates and invalid characters before synchronization."
   ],
   [
    "Synchronization Service Manager",
    "The Connect Sync console showing run profiles, connector status and object-level errors."
   ]
  ],
  "example": "Connect Health emails an alert that two objects failed to export. The report shows a duplicate proxyAddresses value: a departed employee's disabled account still holds the same email alias as a new hire. The admin removes the alias from the old account in AD, runs Start-ADSyncSyncCycle -PolicyType Delta, and the error clears on the next export.",
  "mistakes": [
   [
    "Fixing a synced user's attribute directly in the Entra admin center.",
    "Synced attributes are owned by on-premises AD. Fix them there and run a delta sync, or the next sync overwrites or fails."
   ],
   [
    "Assuming a sync that stopped with no errors means the service is broken.",
    "Check Get-ADSyncScheduler: the scheduler may be disabled or the server may be in staging mode, which never exports."
   ],
   [
    "Expecting soft match to link an on-premises account to a cloud Global Administrator.",
    "Soft matching to cloud accounts with admin roles is blocked for security."
   ],
   [
    "Thinking Connect Health is free with every tenant.",
    "Connect Health requires Microsoft Entra ID P1 licensing."
   ]
  ],
  "tryit": [
   [
    "At Sparrow Logistics, no changes have reached Entra ID for three days, yet the Synchronization errors report is empty and the server shows no failures in Synchronization Service Manager. Last week an engineer rebuilt the sync server from a backup. What do you check first, and why?",
    "Run Get-ADSyncScheduler to see whether the scheduler is enabled and whether the server is in staging mode. A rebuilt server is often left in staging mode, which imports and synchronizes but never exports, so nothing reaches the cloud and no export errors appear."
   ],
   [
    "During a migration, an admin created cloud-only accounts for 50 users. Now the same users exist in AD and are coming into sync scope. How will Entra link them, and what exception should the admin expect?",
    "Entra will soft match each on-premises account to the cloud account by primary SMTP address or UPN. Any cloud account that holds an administrator role will not soft match, because that is blocked for security, and needs a different approach."
   ]
  ],
  "tip": "Fix sync errors at the source of authority, not in the cloud. For a duplicate attribute error, find the other object holding the value; for a stopped sync with no errors, check whether the scheduler is disabled or the server is in staging mode.",
  "check": [
   [
    "Which license does Microsoft Entra Connect Health require?",
    "Microsoft Entra ID P1 (or a plan that includes it)."
   ],
   [
    "A new synced user fails with a duplicate attribute error on UserPrincipalName. What do you do?",
    "Find the other object already using that UPN, change or remove the value in the source (usually on-premises AD), then run a delta sync."
   ],
   [
    "What is the difference between a hard match and a soft match?",
    "A hard match uses the sourceAnchor/immutableId; a soft match uses the primary SMTP address or UPN to link to an existing cloud object."
   ],
   [
    "Which tool should you run before a first sync to find duplicates and invalid characters in AD?",
    "IdFix."
   ]
  ]
 },
 {
  "t": "Authentication methods policy: Microsoft Authenticator, passkeys (FIDO2), Windows Hello for Business, certificate-based authentication, Temporary Access Pass, SMS/voice",
  "hook": "It is 7:50 a.m. at Bayview Regional Hospital and Daniel, a new night-shift nurse, is standing at the help desk with a badge, a laptop and no way to sign in. He has no phone app registered, no security key, and the hospital has promised its auditors that clinicians will move to passwordless sign-in this year. Meanwhile Rosa in the security office is reviewing last week's alerts: two staff members approved MFA prompts they never started, and one executive lost her phone number to a SIM swap. Every one of these problems traces back to a single page in Microsoft Entra ID. Which methods should be switched on, for whom, and how does Daniel get started without ever being handed a password?",
  "simple": "When you sign in, you prove who you are. A password is one way, but there are better ways: a phone app that asks you to approve a sign-in, a small security key you plug in or tap, your face or fingerprint on a work laptop, or a smart card. The Authentication methods policy is the master list where an administrator decides which of these ways people in the company are allowed to use. Some methods are much harder to trick than others. A text message code can be stolen if someone takes over your phone number, but a security key only works on the real website. Think of it like a building that accepts keycards, fingerprints and a guest pass at the front desk, and the manager decides which ones the doors will accept.",
  "body": [
   "The Authentication methods policy is the single control panel for how users prove their identity in Microsoft Entra ID. It decides which methods users may register and use for sign-in, for multifactor authentication (MFA), and for self-service password reset (SSPR). Older tenants configured these choices in two separate legacy places, the legacy MFA service settings and the SSPR policy, and Microsoft has been migrating every tenant to the unified policy. For the exam, assume new configuration belongs in the Authentication methods policy. You find it in the Microsoft Entra admin center under Protection, Authentication methods, Policies. For each method you set it to enabled or disabled, target it to all users or selected groups, exclude groups, and configure method-specific settings on a Configure tab.",
   "Microsoft Authenticator is the method most users meet first, so its settings matter. Push notifications now use number matching: the sign-in screen shows a two-digit number and the user must type it into the app. This defeats MFA fatigue, sometimes called prompt bombing, where an attacker who already has a password triggers prompt after prompt hoping the user taps Approve just to make them stop. Additional context can show the requesting application name and the geographic location of the sign-in, so a user in Ohio who sees a request from another continent knows to deny it. Authenticator also supports passwordless phone sign-in and can hold device-bound passkeys, which moves it up the strength ladder when used that way.",
   "Passkeys based on Fast Identity Online 2 (FIDO2) standards are the core of phishing resistance. A passkey is a key pair: the private key stays on a security key, phone or computer and never leaves it, and the public key is registered with Entra. During sign-in the authenticator signs a challenge only for the genuine sign-in domain, so a look-alike phishing site simply receives nothing it can use. In the passkey (FIDO2) settings you can allow or block self-service setup, enforce attestation so only genuine, verified hardware registers, and restrict which models are allowed by their Authenticator Attestation GUID (AAGUID), the identifier each authenticator model reports. A hospital that issues one approved brand of key would list that model's AAGUID and block everything else.",
   "Windows Hello for Business is the phishing-resistant method built into Windows. It creates a key pair bound to the device, protected by the Trusted Platform Module (TPM) chip, and the user unlocks it with a PIN or biometric gesture such as a face or fingerprint. The PIN is not a password sent over the network; it only unlocks the key stored on that one device, which is why a stolen PIN is useless without the laptop. Because it is tied to the device, it is a strong fit for staff with assigned Windows machines.",
   "Certificate-based authentication (CBA) lets users sign in with an X.509 certificate, typically on a smart card or stored on a device. You upload the root and intermediate certificate authorities (CAs) that issued those certificates to Entra, along with revocation list locations. Two kinds of rules shape the behavior. Username binding decides which certificate field, such as the Principal Name or Subject Key Identifier, maps to which user attribute, such as userPrincipalName. Authentication binding rules decide whether a given certificate, for example one issued by a specific CA or carrying a specific policy object identifier, counts as single-factor or multifactor. Organizations that once ran federation servers only to support smart cards can sign in to Entra directly with CBA instead.",
   "Temporary Access Pass (TAP) solves the bootstrap problem. It is a time-limited passcode an administrator or help desk issues to a user, configured as one-time use or usable multiple times within its lifetime. A new hire who has no methods, or an employee who lost the only phone they had registered, signs in with the TAP and immediately registers a passkey, Windows Hello for Business or Authenticator, without ever knowing a password. The policy sets the minimum, maximum and default lifetime and whether passes are one-time by default. Because a TAP satisfies strong authentication requirements, issuing one is a sensitive action that should be limited to trusted roles and logged.",
   "SMS and voice calls remain available but sit at the bottom of the ladder. They can be intercepted, redirected by a subscriber identity module (SIM) swap, or socially engineered out of a user. Keep them only for people with no smartphone or as a temporary fallback, scoped to a specific group, and plan a path off them. Other methods include software and hardware Open Authentication (OATH) tokens that generate time-based codes, and email one-time passcode (OTP). Email OTP is used by members for SSPR and by guests to sign in, not as an MFA method for members.",
   "The organizing principle is a strength ladder. Phishing-resistant methods, meaning passkeys (FIDO2), Windows Hello for Business and certificate-based authentication, sit at the top. Authenticator push with number matching and OATH codes are in the middle. SMS and voice are at the bottom. Enabling a method in the policy only makes it available; to require a particular rung for a specific app or role, you use Conditional Access authentication strengths, covered in a later lesson. On the exam, read each scenario for the clue words: phishing-resistant, no methods yet, specific key models, or users without smartphones, and map each one to the right method and setting."
  ],
  "analogy": "Think of the Authentication methods policy as the list of accepted ID at an airport security checkpoint. A passport (passkey or Windows Hello) is hard to forge and checked against the real issuer. A driver's license (Authenticator push) is good for most purposes. A photocopy (SMS code) can be faked or borrowed. A Temporary Access Pass is the gate agent's temporary boarding letter that gets you through once so you can collect a real passport. The analogy stops at enforcement: the list only says what is accepted; Conditional Access decides which flights demand a passport.",
  "mnemonic": "Strength ladder, top to bottom: Phishing-resistant, Push, Phone. Passkeys, Windows Hello for Business and CBA first; Authenticator push or OATH codes next; SMS and voice phone methods last.",
  "terms": [
   [
    "Authentication methods policy",
    "The unified Entra policy that enables and targets methods for sign-in, MFA and SSPR."
   ],
   [
    "Number matching",
    "An Authenticator push feature requiring the user to enter a number shown on the sign-in screen, blocking MFA fatigue approvals."
   ],
   [
    "Passkey (FIDO2)",
    "A phishing-resistant credential using a device-held private key bound to the sign-in domain."
   ],
   [
    "AAGUID",
    "Authenticator Attestation GUID, an identifier for an authenticator model used to allow or block specific passkey hardware."
   ],
   [
    "Windows Hello for Business",
    "A phishing-resistant Windows credential whose key is bound to the device TPM and unlocked by a PIN or biometric."
   ],
   [
    "Temporary Access Pass",
    "A time-limited passcode issued by an admin for onboarding or recovery, used to register stronger methods."
   ],
   [
    "Certificate-based authentication",
    "Signing in to Entra ID with an X.509 certificate validated against uploaded certificate authorities."
   ]
  ],
  "example": "A new nurse starts on Monday with no phone registered. The help desk issues a one-time Temporary Access Pass valid for a few hours. She signs in with it, registers a FIDO2 security key and Microsoft Authenticator, and from then on signs in passwordlessly. SMS is enabled only for a small group of staff with no smartphones, and the passkey settings enforce attestation with the AAGUID of the hospital's approved key model.",
  "mistakes": [
   [
    "Authenticator push with number matching is phishing-resistant.",
    "Number matching stops MFA fatigue, but a user can still approve a sign-in started on a convincing phishing site. Phishing-resistant means passkeys (FIDO2), Windows Hello for Business and certificate-based authentication."
   ],
   [
    "To onboard a passwordless user, give them a temporary password and have them register methods.",
    "The intended answer is Temporary Access Pass, which lets the user register strong methods without ever knowing a password."
   ],
   [
    "Email OTP is a good MFA method for employees.",
    "Email one-time passcode is used for SSPR by members and for guest sign-in, not as a member MFA method."
   ],
   [
    "Enabling a method in the Authentication methods policy forces users to use it for a given app.",
    "The policy only makes methods available to targeted users. Requiring a specific strength for an app is done with Conditional Access authentication strengths."
   ]
  ],
  "tryit": [
   [
    "Lakeshore Logistics issues one approved brand of FIDO2 security key to its warehouse supervisors. Some supervisors have registered cheap keys bought online, and the security team wants only the approved model to work. Passkeys are already enabled for the supervisors group. What do you change?",
    "In the passkey (FIDO2) settings of the Authentication methods policy, enforce attestation and enable key restrictions, allowing only the approved model's AAGUID. Unapproved models can no longer register, and you can ask users with existing unapproved keys to re-register."
   ],
   [
    "A finance analyst lost her phone, which held her only registered method, while on vacation. She returns today and needs to sign in and set up Authenticator on her new phone. What should the help desk issue?",
    "A one-time Temporary Access Pass with a short lifetime, after verifying her identity. She signs in with it and registers Authenticator or a passkey, and the pass then expires."
   ]
  ],
  "tip": "Phishing-resistant means passkeys/FIDO2, Windows Hello for Business and certificate-based authentication, not Authenticator push or SMS. When a user has no methods and must set up passwordless sign-in, the answer is Temporary Access Pass. Specific key models means attestation plus AAGUID restrictions.",
  "check": [
   [
    "Which Authenticator feature defends against MFA fatigue (prompt bombing)?",
    "Number matching, which requires the user to type the number displayed on the sign-in screen."
   ],
   [
    "How can you allow only specific FIDO2 security key models?",
    "Enforce attestation and restrict keys by AAGUID in the passkey (FIDO2) settings of the Authentication methods policy."
   ],
   [
    "What is Temporary Access Pass designed for?",
    "Letting a user without registered methods (new or recovering) sign in for a limited time to register strong or passwordless methods."
   ],
   [
    "In CBA, what do authentication binding rules control?",
    "Whether a certificate, based on its issuer or policy object identifier, counts as single-factor or multifactor authentication."
   ]
  ]
 },
 {
  "t": "Registration campaigns, combined security info registration and system-preferred MFA",
  "hook": "Monday morning at Pinecrest Insurance, and Leo, the identity administrator, has a slide due for the leadership meeting at ten. The question on it is simple: how many of our 4,000 employees are still using text messages for MFA? The answer, from the User registration details report, is uncomfortable. More than half. Worse, last month an attacker phished one agent's password and, before anyone noticed, registered his own phone as her MFA method. Leadership wants users on Microsoft Authenticator, no more rogue registrations, and no flood of help desk tickets. Leo cannot email 2,000 people and hope. What built-in Entra features can move users to stronger methods, keep attackers out of the registration page, and make sure the strong method is actually the one used?",
  "simple": "Strong sign-in methods only help if people actually set them up and use them. This lesson covers three helpers. First, one single page where people add all their sign-in methods, instead of two separate pages. Second, a polite reminder that pops up when someone signs in with a weak method, like a text message, asking them to install the phone app instead. They can say not now a few times, but eventually they need to do it. Third, when someone has several methods set up, the system automatically asks for the safest one first, instead of whichever one the person picked years ago. It is like a gym that has one sign-up desk, keeps reminding you to upgrade from a paper pass to a key fob, and then scans your fob first whenever you have one.",
  "body": [
   "Strong authentication only protects people who have registered strong methods. Microsoft Entra ID provides three features that work together as a lifecycle: combined security info registration gives users one place to register, registration campaigns nudge them toward a stronger method, and system-preferred MFA makes sure the strongest registered method is the one Entra asks for. Knowing which feature solves which problem is the main exam skill here, because scenario questions often describe the symptom, such as users stuck on SMS or an attacker registering a phone, and expect you to name the feature that fixes it.",
   "Combined security info registration gives users a single experience for registering methods used by both multifactor authentication (MFA) and self-service password reset (SSPR). Before it existed, users registered a phone for MFA in one place and answered SSPR questions in another, which confused them and doubled help desk calls. Now users go to the My Security Info page in their account portal, where they can add, change, or delete methods and set a default, or they are interrupted during sign-in when policy requires registration. Combined registration is the standard experience in all tenants, so you don't need to turn it on.",
   "The registration process itself is a target. An attacker who steals or guesses a password, and finds an account that has never registered MFA, could register their own phone and lock the real user out of the second factor. To prevent this, create a Conditional Access (CA) policy that targets the user action Register security information. Typical designs allow registration only from a trusted named location such as the office network, only from a compliant or hybrid joined device, or require MFA, which a brand-new user can satisfy with a Temporary Access Pass (TAP). Remember to exclude emergency access accounts and to account for guests, who usually can't satisfy device conditions.",
   "A registration campaign, often called the nudge, prompts users who already perform MFA with a weaker method, such as SMS or voice, to set up Microsoft Authenticator during sign-in. You configure it in the Authentication methods area under Registration campaign. Turn it on, choose included and excluded users or groups, and set how many days a user may snooze the prompt. Users can skip it a limited number of times before the snooze option disappears and they must register. The campaign only targets users who are enabled for the target method in the Authentication methods policy and who haven't registered it yet, so users who have already moved see nothing, and users not allowed to use Authenticator are never nagged into something they cannot complete.",
   "System-preferred MFA changes which method Entra prompts for. Previously, the method a user picked as their default, often SMS from years earlier, was used first even if they had since registered a passkey or Authenticator. With system-preferred MFA, Entra asks for the most secure method the user has registered and that policy allows, and the user can still choose Sign in another way to pick a different method. The ranking puts methods such as passkeys (FIDO2) and certificate-based authentication near the top, Authenticator notifications ahead of one-time codes from OATH tokens, and SMS and voice near the bottom. System-preferred MFA is Microsoft managed and enabled by default; admins can exclude a group temporarily while troubleshooting.",
   "Seen together, the three features close the loop. A new user arrives with a TAP, registers on My Security Info under the protection of the Register security information policy, gets nudged to Authenticator if they registered only SMS, and from then on is prompted for their strongest method automatically. Each feature alone leaves a gap: registration without protection invites attackers, a nudge without system-preferred MFA leaves the old SMS default in place, and system-preferred MFA cannot help users who never registered anything stronger.",
   "Measuring progress is part of the job. The Authentication methods activity report shows registration and usage trends by method, and the User registration details report lists each user with flags such as MFA capable, passwordless capable and SSPR registered, plus the methods they have and their default. Leaders want a number, and these reports provide it. Once most users have strong methods registered, pair the lifecycle with Conditional Access authentication strengths so that strong methods become required, not merely preferred, for sensitive apps and admin roles."
  ],
  "analogy": "Picture a library card upgrade. Combined registration is the single front desk where you sign up for everything. The registration campaign is the librarian who, each time you check out with your old paper card, says you really should get the new chip card, and after a few reminders stops accepting excuses. System-preferred MFA is the scanner that always reads the chip if you have one, even if you hand over the paper card first. The analogy stops at protection: a real library rarely checks where you sign up from, but Entra can require a trusted location or device to register.",
  "terms": [
   [
    "Combined security info registration",
    "One registration experience for MFA and SSPR methods, reached from the My Security Info page."
   ],
   [
    "Registration campaign",
    "A sign-in prompt (nudge) that asks users on weaker methods to register Microsoft Authenticator or another targeted method."
   ],
   [
    "Snooze",
    "The number of days a user may postpone a registration campaign prompt, allowed only a limited number of times."
   ],
   [
    "System-preferred MFA",
    "Entra behavior that prompts for the strongest registered method rather than the user's chosen default."
   ],
   [
    "Register security information user action",
    "A Conditional Access target used to control when and where users can register authentication methods."
   ],
   [
    "User registration details report",
    "A report showing each user's registered methods and whether they are MFA capable, passwordless capable and SSPR registered."
   ]
  ],
  "example": "Reports show 60 percent of staff still use SMS for MFA. The admin starts a registration campaign for all users, allowing a few days of snooze, and adds a Conditional Access policy that permits security info registration only from the office network or with a Temporary Access Pass. Three months later the User registration details report shows most users have Authenticator, and system-preferred MFA prompts them with it automatically.",
  "mistakes": [
   [
    "System-preferred MFA will get users to register Authenticator.",
    "System-preferred MFA only chooses among methods a user has already registered. Getting users to register a new method is the job of the registration campaign."
   ],
   [
    "Requiring MFA for all cloud apps protects the registration page too.",
    "Use a Conditional Access policy that targets the Register security information user action to control where and how users register methods."
   ],
   [
    "The registration campaign prompts every user in scope at every sign-in.",
    "It targets only users enabled for the target method who haven't registered it yet, and it offers a limited number of snoozes before registration becomes required."
   ],
   [
    "Users must register separately for SSPR and MFA.",
    "Combined security info registration is the standard experience; users register once on My Security Info for both."
   ]
  ],
  "tryit": [
   [
    "At Pinecrest Insurance, an attacker phished an agent's password and registered his own phone as her MFA method from overseas. The company has Microsoft Entra ID P1 and a known office IP range. New hires receive a Temporary Access Pass on day one. How do you stop this from happening again without blocking new hires?",
    "Create a Conditional Access policy targeting the Register security information user action that blocks registration unless the user is in the trusted office named location, or alternatively requires MFA so new hires can satisfy it with their Temporary Access Pass. Exclude break-glass accounts and test in report-only mode first."
   ],
   [
    "A user has registered SMS, Authenticator push and a FIDO2 passkey, and long ago set SMS as her default. She complains that Entra keeps asking for her security key. Is something misconfigured?",
    "No. System-preferred MFA prompts for the strongest registered method the policy allows, which is the passkey. She can still choose another method from the sign-in screen, and admins should leave system-preferred MFA on."
   ]
  ],
  "tip": "The nudge moves users to Authenticator; system-preferred MFA makes Entra ask for the strongest method already registered. To stop attackers registering methods with a stolen password, use a Conditional Access policy on the Register security information user action.",
  "check": [
   [
    "Which feature prompts users who use SMS to set up Microsoft Authenticator at sign-in?",
    "A registration campaign (nudge) configured in the Authentication methods area."
   ],
   [
    "A user has registered both SMS and a passkey, and SMS is their default. What does system-preferred MFA ask for?",
    "The passkey, because it is the most secure registered method the policy allows."
   ],
   [
    "How can you restrict where users are allowed to register MFA methods?",
    "Create a Conditional Access policy targeting the Register security information user action, for example requiring a trusted location or compliant device."
   ],
   [
    "Which report shows whether each user is MFA capable and passwordless capable?",
    "The User registration details report in the Authentication methods area."
   ]
  ]
 },
 {
  "t": "Self-service password reset (SSPR): methods, registration, and password writeback for hybrid users",
  "hook": "It is 11:15 p.m. at Cedar Valley Credit Union and Amara, a loan officer, is in a hotel room two time zones away with a forgotten password and a presentation at 8 a.m. The help desk closed hours ago. She finds the Forgot my password link, proves who she is with her phone, and sets a new password. Relief, until she tries to unlock her domain-joined laptop and the new password is rejected. Her cloud apps accept it, but Windows does not. The next morning the help desk ticket queue has six more like hers. Somewhere between Microsoft Entra ID and the on-premises Active Directory, a password is getting lost. Where is it going, and which setting brings it home?",
  "simple": "Everyone forgets a password sometimes. Self-service password reset lets you fix it yourself, any time, instead of waiting for the help desk. You prove it is really you, for example by approving a prompt on your phone or entering a code sent to you, and then you choose a new password. Many companies keep their main list of passwords on their own servers in the office, not just in the cloud. If you reset your password in the cloud, the office servers must be told about the change, or your laptop will still expect the old one. Sending the new password back to the office servers is called writeback. It is like changing your address with the post office online, and making sure your bank also gets the update.",
  "body": [
   "Self-service password reset (SSPR) lets users reset a forgotten password or unlock their account without calling the help desk. It cuts support costs and gets users working again at any hour, but anything that can change a password is also an attack path, so every setting deserves thought. On the exam, expect questions about enablement scope, methods, administrator rules, registration and, above all, password writeback for hybrid users.",
   "You enable SSPR in the Microsoft Entra admin center under Protection, Password reset, Properties, with one of three scopes: None, Selected or All. Selected applies to one group, which makes it ideal for a pilot. Under Authentication methods you choose the number of methods required to reset, one or two, and which methods are allowed: mobile app notification, mobile app code, email, mobile phone (SMS or voice call), office phone and security questions. Security questions are the weakest choice, because answers are often guessable or discoverable on social media, and they can't be used by administrators. Modern tenants also manage available methods through the unified Authentication methods policy, which is where Microsoft is consolidating method settings.",
   "Administrators follow a separate, stricter policy that you can't weaken. Microsoft always applies a two-method policy to accounts holding administrator roles, and those accounts can't use security questions. The admin policy is enforced regardless of what you choose for regular users, so even if SSPR is set to None for users, administrators can still reset their own passwords using strong methods. This is a common exam trap: changing user SSPR settings does not change admin SSPR behavior.",
   "Registration settings decide whether users must register when they next sign in and how often, in days, they are asked to reconfirm their information. Setting the reconfirmation period to zero means users are never asked again. With combined security info registration, users register SSPR and multifactor authentication (MFA) methods in one place, so a user who registered Authenticator for MFA can typically use it for SSPR too. Notification settings can alert users when their own password is reset, which helps them spot a reset they didn't make, and alert all admins when another admin resets their password. You can also customize the help desk link or email shown on the reset page for users who get stuck.",
   "Password writeback is the key hybrid setting. For users synchronized from on-premises Active Directory (AD), the source of authority for the password is AD, not the cloud. A reset or change made in Entra must therefore be written back to AD, or the user ends up with two different passwords: the new one in the cloud and the old one on-premises. Writeback is supported by Microsoft Entra Connect Sync and by Microsoft Entra Cloud Sync, and it requires Microsoft Entra ID P1 or higher.",
   "Setting writeback up has three parts. First, the AD connector account used by the sync tool needs permission on the user objects in scope to reset password and change password, and to write the lockoutTime and pwdLastSet attributes. Second, writeback must be enabled in the sync tool itself, for example on the Optional features page of the Entra Connect wizard or in the Cloud Sync configuration. Third, you turn it on in the Entra admin center under Password reset, On-premises integration, where you can also allow users to unlock accounts without resetting their password. Missing any one of these three is the most common cause of failures.",
   "Writeback travels over the outbound connection the sync service already uses, so you don't need to open any inbound firewall ports. It also honors on-premises password policy in real time: if the new password fails AD's complexity, minimum age or history rules, the user sees an error immediately on the reset page rather than a silent failure later. This matters for the user experience and for troubleshooting, because a policy rejection and a broken writeback look different to the user.",
   "When users report that cloud resets work but their Windows sign-in still wants the old password, work through a short checklist. Confirm writeback is enabled in both the sync tool and the portal, confirm the connector account permissions, confirm the user is actually in sync scope, and check the SSPR audit logs and the sync server's event logs for errors. A domain-joined laptop that is off the corporate network also needs line of sight to a domain controller, often over a virtual private network (VPN), before it can accept the new password at the lock screen."
  ],
  "analogy": "Think of a family with a shared paper calendar on the fridge (on-premises AD) and a calendar app on everyone's phone (Entra ID). The fridge is the official record. If you change a dentist appointment in the app but nobody updates the fridge, the family shows up at the wrong time. Password writeback is the rule that every change made in the app is immediately copied onto the fridge. The analogy stops in one place: writeback also checks the fridge's rules first, and refuses a change that breaks them.",
  "terms": [
   [
    "SSPR",
    "Self-service password reset, letting users reset passwords or unlock accounts using registered methods."
   ],
   [
    "Password writeback",
    "Writing passwords changed or reset in Entra ID back to on-premises AD for synchronized users."
   ],
   [
    "Number of methods required",
    "The SSPR setting (one or two) that controls how many verification methods a user must pass to reset."
   ],
   [
    "Admin SSPR policy",
    "The fixed, stronger policy for administrator roles that requires two methods and disallows security questions."
   ],
   [
    "Source of authority",
    "The directory where an object's attributes are mastered; for synced users this is on-premises AD."
   ],
   [
    "Reconfirmation period",
    "The number of days before users are asked to confirm their registered SSPR information again."
   ]
  ],
  "example": "A synced user forgets her password while traveling. She uses SSPR, passes an Authenticator notification and a phone code, and sets a new password. Because writeback is enabled in Entra Connect and in the Password reset settings, and the connector account has the right permissions, the new password is written to AD immediately, so she can unlock her domain-joined laptop over VPN with it.",
  "mistakes": [
   [
    "Setting SSPR to None stops administrators from resetting their own passwords.",
    "Admin roles always get Microsoft's two-method SSPR policy regardless of the user setting, so admins can still self-reset."
   ],
   [
    "Password writeback requires opening inbound ports from the internet to the sync server.",
    "Writeback uses the sync tool's existing outbound connection; no inbound firewall ports are needed."
   ],
   [
    "Password hash synchronization alone makes cloud resets apply on-premises.",
    "Hash sync copies password hashes from AD to the cloud only. Cloud-to-AD changes need password writeback, which requires P1."
   ],
   [
    "Selected scope lets you pick several groups for SSPR.",
    "Selected applies SSPR to a single group; add the people you need to that one group, or choose All for broader coverage."
   ]
  ],
  "tryit": [
   [
    "Cedar Valley Credit Union has synced users and Microsoft Entra ID P1. Writeback is enabled on the Password reset, On-premises integration page, but resets still don't reach AD. The sync server event log shows access denied errors when writing passwords. What do you check?",
    "The permissions of the AD connector account used by Entra Connect. It needs reset password and change password rights plus write access to lockoutTime and pwdLastSet on the user objects in scope. Also confirm writeback is enabled in the Entra Connect optional features, not only in the portal."
   ],
   [
    "The CIO wants to pilot SSPR with the IT department first and require two methods. IT staff include several Global Administrators. Which settings do you choose, and does anything special apply to the admins?",
    "Set the scope to Selected and choose the IT group, with the number of methods required set to two. The admins are governed by Microsoft's fixed admin policy anyway: two methods and no security questions, whatever the user settings are."
   ]
  ],
  "tip": "If synced users can reset in the cloud but their on-premises password doesn't change, the answer is password writeback (P1, enabled in the sync tool and in the portal, with connector permissions). Remember admins always get the two-method policy and can't use security questions.",
  "check": [
   [
    "What are the three SSPR enablement scopes?",
    "None, Selected (a single group) and All."
   ],
   [
    "Which license is required for SSPR with on-premises password writeback?",
    "Microsoft Entra ID P1 or higher."
   ],
   [
    "Can administrators use security questions for SSPR?",
    "No. Admin roles always use a stronger two-method policy that excludes security questions."
   ],
   [
    "What happens if a new password meets Entra rules but fails the on-premises AD password policy during writeback?",
    "The reset is rejected and the user sees an error immediately, because writeback enforces the on-premises policy in real time."
   ]
  ]
 },
 {
  "t": "Microsoft Entra Password Protection: global and custom banned password lists, smart lockout, on-premises DC agent and proxy",
  "hook": "The penetration test report for Riverside Manufacturing lands on your desk on a Thursday afternoon. Page three is the one that stings: the testers tried one password, Riverside2026, against every account in the directory, and it worked for eleven people. Then they tried the name of the local baseball team followed by a symbol. Seven more. Nobody was locked out, because the testers only tried each password once per account. Meanwhile, the help desk says a handful of employees are locked out of Active Directory every morning by a script somewhere on the internet hammering their accounts. You have Microsoft Entra ID P1 and a dozen domain controllers. How do you stop people from choosing these passwords, in the cloud and on-premises, without locking out the real users?",
  "simple": "Attackers often guess passwords instead of stealing them. They try popular ones, like the company name plus the year, on many accounts at once. Password Protection stops people from picking those easy guesses in the first place. Microsoft keeps a secret list of the worst passwords it sees attackers use, and you can add your own words, like your company or town name. A second feature, smart lockout, slows down someone who keeps guessing wrong, while trying not to lock out the real person. You can also install small helpers on your office servers so the same rules apply there. It is like a hardware store that refuses to cut a key that opens most locks on the street, and a door that ignores a stranger rattling the handle but still opens for you.",
  "body": [
   "Many identity breaches begin with password spraying. Instead of trying thousands of passwords against one account, which triggers lockout, an attacker tries a few very common passwords, such as a season plus a year or the company name with a number, against thousands of accounts. Microsoft Entra Password Protection makes those guessable passwords impossible to set, and smart lockout slows down guessing at sign-in time without locking out legitimate users. Together they attack the problem from both ends: weak passwords never get created, and guessing gets expensive.",
   "The global banned password list is maintained by Microsoft based on telemetry from real attacks across its services. It applies automatically to all cloud users, no configuration is needed, it updates without admin action, and you can neither see nor edit its contents. The custom banned password list is yours. You add terms specific to your organization, such as your company name, product names, local sports teams, your city or internal project names, and Entra blocks passwords built on them. The custom list holds up to 1,000 base terms, is configured in the Microsoft Entra admin center under Protection, Authentication methods, Password protection, and requires Microsoft Entra ID P1. You don't need to add variations like capitalized forms or numbers appended, because the evaluation engine handles those.",
   "Evaluation is smarter than a simple lookup, which is why short lists are effective. First the password is normalized: it is lowercased and common character substitutions are reversed, so 0 becomes o, 1 becomes l, $ becomes s and @ becomes a. Then the engine looks for banned terms, including fuzzy matches within one edit distance, so Contozo still matches Contoso. Finally a scoring rule decides the outcome. Each banned term found counts as one point, each remaining character counts as one point, and the password must score at least five points. If Contoso is on your custom list, Contoso1# scores one point for the term plus two points for the 1 and the #, three in total, and is rejected. A long passphrase that happens to contain one banned word still collects enough points from its other characters to pass.",
   "Smart lockout protects accounts during sign-in. After a set number of failed attempts, the lockout threshold, the account is locked for a lockout duration, and the duration grows with repeated lockouts. Smart lockout is smarter than classic lockout in two ways. It separates familiar locations from unfamiliar ones, so an attacker signing in from an unknown network is locked out while the genuine user from their usual location can still sign in. It also tracks the last few bad password hashes, so the same wrong password entered repeatedly, such as from an old phone with a stale password, doesn't keep counting against the threshold. Smart lockout is always on; customizing the threshold and duration requires P1.",
   "Hybrid environments need lockout values that cooperate. If users authenticate through pass-through authentication or federation to on-premises Active Directory (AD), failed cloud sign-ins can also count against AD lockout. Set the Entra lockout threshold lower than the AD account lockout threshold, and the Entra lockout duration longer than the AD lockout duration. Then cloud smart lockout stops the attacker before enough failures reach AD to lock the account on-premises, where a lockout would also stop the user from signing in to their workstation.",
   "Extending the banned list to on-premises AD takes two components. The Password Protection domain controller (DC) agent is installed on every domain controller. It includes a password filter dynamic-link library (DLL) that checks each password change or reset against the policy at the moment it happens. The Password Protection proxy service runs on one or more domain-joined member servers with outbound internet access, and it forwards policy downloads from Entra to the DC agents. The DC agents never need internet access themselves. Downloaded policy is stored in the system volume (SYSVOL) share and replicates to all domain controllers through normal AD replication, so a DC still enforces the last known policy if the proxy is unavailable. Install at least two proxies for availability.",
   "Rollout should be gradual. Password Protection for AD starts in Audit mode, which logs passwords that would have been rejected in the DC agent's event log without blocking anything. Review those events for a week or two to understand the impact, communicate with users, and then switch to Enforced mode so AD rejects banned passwords at change time. The on-premises feature requires P1 licensing for the users whose passwords are checked.",
   "One limitation is easy to forget and frequently tested. Password Protection acts only when a password is set or changed. Existing weak passwords remain valid until the user next changes them, so pairing deployment with a forced password change for high-risk accounts, or simply letting normal expiration cycles run, determines how quickly protection actually reaches everyone."
  ],
  "analogy": "Imagine a locksmith who refuses to cut keys from a list of patterns burglars know by heart, plus any pattern based on the building's name that the landlord adds. That is the global and custom banned lists. Smart lockout is a doorman who stops letting a stranger try keys after several wrong ones, but still waves in a tenant he recognizes. The DC agent is that locksmith's rulebook copied into every branch shop, and the proxy is the courier who brings new pages from headquarters. The analogy stops at existing keys: the locksmith cannot recall keys already cut, just as Password Protection doesn't touch existing passwords.",
  "terms": [
   [
    "Password spraying",
    "An attack trying a few common passwords against many accounts to avoid per-account lockout."
   ],
   [
    "Global banned password list",
    "A Microsoft-maintained, non-editable list of weak passwords applied to all Entra users."
   ],
   [
    "Custom banned password list",
    "An admin-defined list of up to 1,000 organization-specific terms that Entra blocks in passwords; requires P1."
   ],
   [
    "Smart lockout",
    "Entra sign-in protection that locks out attackers after failed attempts while distinguishing familiar and unfamiliar locations."
   ],
   [
    "DC agent",
    "The Password Protection component installed on every domain controller to enforce the banned list on-premises."
   ],
   [
    "Proxy service",
    "The Password Protection component on a member server that relays policy between Entra ID and the DC agents."
   ],
   [
    "Audit mode",
    "An on-premises Password Protection mode that logs would-be rejections without blocking passwords."
   ]
  ],
  "example": "Northwind's red team finds many staff using Northwind plus the year. The admin adds Northwind, product names and the city to the custom banned list, installs the proxy on two member servers and DC agents on all domain controllers in Audit mode, reviews a week of event logs, and then switches to Enforced so AD rejects those passwords too. She also lowers the Entra lockout threshold below AD's and lengthens the Entra lockout duration beyond AD's.",
  "mistakes": [
   [
    "You can add your company name to the global banned password list.",
    "The global list is Microsoft managed and invisible. Organization-specific terms go on the custom banned password list, which requires P1."
   ],
   [
    "The proxy service must be installed on every domain controller.",
    "The DC agent goes on every domain controller. The proxy goes on member servers with outbound internet access, and DC agents need no internet."
   ],
   [
    "Set the Entra lockout threshold higher than AD's so users are not locked out in the cloud.",
    "It is the reverse: Entra's threshold should be lower and its duration longer than AD's, so cloud lockout stops attacks before AD locks the account."
   ],
   [
    "Turning on Password Protection immediately fixes all weak passwords in the directory.",
    "It evaluates only new or changed passwords; existing weak passwords stay until the next change."
   ]
  ],
  "tryit": [
   [
    "Riverside Manufacturing wants its banned password rules to apply when users change passwords with Ctrl+Alt+Delete on domain-joined PCs. Its domain controllers are in a locked-down network segment with no internet access, but two member servers can reach the internet. Where does each component go?",
    "Install the Password Protection DC agent on every domain controller and the proxy service on the two internet-connected member servers. The DC agents get policy through the proxies and replicate it via SYSVOL, so they never need internet access. Start in Audit mode."
   ],
   [
    "Riverside's custom banned list contains riverside. A user tries to set the password Riverside2# and it is rejected. A colleague sets Riverside lantern quietly marches north and it is accepted. Explain why.",
    "Riverside2# normalizes to riverside plus two remaining characters, scoring three points, below the five required. The passphrase contains riverside (one point) but many other characters that each add a point, so it easily exceeds five."
   ]
  ],
  "tip": "DC agents go on every domain controller and need no internet; the proxy goes on member servers with outbound internet access. For hybrid lockout, keep Entra's threshold below AD's and its duration above AD's. The custom list holds up to 1,000 terms and needs P1.",
  "check": [
   [
    "Can you add terms to the global banned password list?",
    "No. The global list is managed by Microsoft; you add your own terms to the custom banned password list."
   ],
   [
    "Which component of on-premises Password Protection must be installed on every domain controller?",
    "The Password Protection DC agent; the proxy service goes on member servers."
   ],
   [
    "Why should the on-premises AD lockout threshold be higher than the Entra smart lockout threshold?",
    "So cloud smart lockout stops password guessing before attackers can lock accounts in on-premises AD."
   ],
   [
    "What does Audit mode do for on-premises Password Protection?",
    "It logs passwords that would have been rejected in the DC agent event log without blocking them, so you can assess impact before enforcing."
   ]
  ]
 },
 {
  "t": "Security defaults vs Conditional Access, and emergency access (break-glass) accounts",
  "hook": "Friday, 5:40 p.m., at Maplewood School District. Jordan, the only identity administrator, has just turned on a new Conditional Access policy requiring compliant devices for everyone. Five minutes later the phones start. Teachers cannot sign in. Neither can the principal. Neither can Jordan, whose admin laptop was never enrolled in device management. Every Global Administrator in the tenant is now on the wrong side of the policy, and the weekend is starting. Somewhere in a locked safe in the district office is an envelope that might save the day, if anyone set it up properly. How did the district get here, what should it have used instead of guessing, and what belongs in that envelope?",
  "simple": "Every company needs basic sign-in protection, like asking for a second check, such as a phone prompt, besides the password. Microsoft offers two ways to set this up. Security defaults is a simple on switch with sensible rules that cannot be changed, and it is free. Conditional Access is a set of custom rules, like require a phone check only when someone is outside the office, but it needs a paid license. You use one or the other, not both. Because custom rules can accidentally lock everyone out, you also keep at least two special emergency accounts, stored safely and used only when something goes wrong. It is like keeping a spare house key in a lockbox in case you ever lock yourself out.",
  "body": [
   "Every tenant needs a baseline of identity protection, and Microsoft Entra ID offers two ways to provide it: security defaults and Conditional Access. They are mutually exclusive, so the exam often asks you to pick between them based on licensing and requirements. Alongside that choice sits a safety net that every tenant should have whichever option it uses: emergency access accounts.",
   "Security defaults are a free, one-switch set of protections that Microsoft enables for new tenants. They require all users to register for multifactor authentication (MFA), with a grace period after which registration is enforced. They require administrators to perform MFA every time they sign in, and prompt regular users for MFA when Microsoft judges it necessary, such as from a new device or app. They block legacy authentication protocols, the older protocols that can't perform MFA, and protect privileged activities such as access to the Azure portal and other management tools. Security defaults steer users to register Microsoft Authenticator as their MFA method. You turn them on or off in the Microsoft Entra admin center under the tenant Properties page, Manage security defaults. There is nothing else to tune: no exclusions, no named locations, no per-app rules.",
   "Conditional Access (CA) is the configurable alternative and requires Microsoft Entra ID P1. A CA policy is an if-then statement: if this user signs in to this app from this kind of device or location with this level of risk, then require MFA, require a compliant device, require an authentication strength, or block. Unlike security defaults, CA can exclude emergency accounts or a service account, apply different rules to different apps, and use signals such as device compliance, named locations and, with P2, sign-in and user risk.",
   "You can't run both at once. To create and enable Conditional Access policies you must first disable security defaults, and the moment you do, the tenant loses those protections. Replace them immediately with equivalent policies: require MFA for administrators, require MFA for all users, block legacy authentication and require MFA for Azure management. Microsoft provides policy templates for these common baselines. A safer order is to build the replacement policies in report-only mode, review the results, then disable security defaults and switch the policies on in the same change window. The rule of thumb for the exam: small organizations without P1 use security defaults; organizations with P1 use Conditional Access.",
   "Emergency access accounts, often called break-glass accounts, prevent you from locking yourself out of the tenant. Lockouts happen in predictable ways: a misconfigured CA policy like the one in the hook, a federation service outage that stops all federated sign-ins, an MFA service disruption, or the departure of the only admin. Microsoft recommends at least two emergency accounts, and their properties are a frequent exam topic.",
   "Each emergency account should be cloud-only and use the tenant's onmicrosoft.com domain, so it does not depend on on-premises Active Directory (AD), synchronization or federation, any of which might be the thing that failed. It should be permanently assigned the Global Administrator role rather than eligible through Privileged Identity Management (PIM), because PIM activation could itself be blocked during an outage. It should not be tied to any individual person, so it survives staff turnover. And it should be protected with strong, phishing-resistant authentication, such as a FIDO2 passkey or certificate, with the credentials stored securely, for example in separate safes. Because Azure and Microsoft admin portals now require MFA, a password-only break-glass account is no longer adequate.",
   "Policy design must account for these accounts. Exclude at least one emergency account from Conditional Access policies that could block access, or design policies so the account can still satisfy them with its dedicated method, for example a phishing-resistant authentication strength it has registered. Many organizations put both accounts in a dedicated exclusion group and review that group's membership regularly so no ordinary user slips in.",
   "Finally, monitor and test. Every sign-in by an emergency account should be treated as an event. Send sign-in logs to a Log Analytics workspace with diagnostic settings and create an alert rule that fires whenever either account signs in, notifying the security team immediately. Test the accounts on a schedule, such as every few months, and after significant changes to Conditional Access or authentication methods, so you know they work before you need them. An untested break-glass account is only a hope."
  ],
  "analogy": "Security defaults are like a rental apartment's standard lock: it comes installed, works well and costs nothing extra, but you can't rekey it or add rules. Conditional Access is hiring a locksmith to install a smart lock with schedules and guest codes, which needs a paid plan, and you remove the old lock first. Break-glass accounts are the spare key in a lockbox outside, kept for the day the smart lock's batteries die. The analogy stops at monitoring: a real lockbox rarely reports when it opens, but break-glass sign-ins should always trigger an alert.",
  "mnemonic": "Break-glass accounts are COGS: Cloud-only on onmicrosoft.com, Out of CA policies (excluded or able to satisfy them), Global Administrator permanently assigned, Strong phishing-resistant authentication, with every sign-in alerted.",
  "terms": [
   [
    "Security defaults",
    "Free, preconfigured identity protections that enforce MFA registration, admin MFA and legacy auth blocking with no customization."
   ],
   [
    "Conditional Access",
    "A P1 policy engine that grants or blocks access based on signals such as user, app, device, location and risk."
   ],
   [
    "Emergency access account",
    "A cloud-only, highly privileged break-glass account used only when normal admin access is lost."
   ],
   [
    "Legacy authentication",
    "Older protocols such as basic authentication for POP, IMAP and SMTP that can't perform MFA."
   ],
   [
    "Policy templates",
    "Microsoft-provided Conditional Access starting points for common baselines such as requiring MFA for admins."
   ]
  ],
  "example": "A school district buys P1 and wants to exempt a kiosk app from MFA. The admin creates two break-glass accounts with FIDO2 keys kept in separate safes, excludes them from all CA policies, deploys CA policies for MFA and legacy auth blocking in report-only mode, disables security defaults, and turns the CA policies on. An alert rule emails the security team whenever either break-glass account signs in.",
  "mistakes": [
   [
    "You can keep security defaults on and add a few Conditional Access policies for special cases.",
    "They are mutually exclusive. You must disable security defaults to use Conditional Access, and then replace their protections with CA policies."
   ],
   [
    "Emergency accounts should be synced from on-premises AD so they are managed like other admins.",
    "They should be cloud-only on the onmicrosoft.com domain so an AD, sync or federation failure can't take them down."
   ],
   [
    "Make break-glass accounts eligible for Global Administrator through PIM to reduce standing access.",
    "Microsoft recommends permanent Global Administrator assignment for emergency accounts, because activation could be unavailable in exactly the situations they exist for."
   ],
   [
    "A long random password is enough for a break-glass account.",
    "Admin portals now require MFA, so emergency accounts need a strong, ideally phishing-resistant method such as a FIDO2 passkey, stored securely."
   ]
  ],
  "tryit": [
   [
    "Harborview Dental has 25 staff, no Microsoft Entra ID P1 licenses and no full-time IT. The owner wants MFA for everyone and legacy protocols blocked, with no ongoing tuning. What do you recommend?",
    "Security defaults. They are free, require MFA registration, require MFA for admins, block legacy authentication and need no configuration. Conditional Access would require P1 licenses and more management than this office needs."
   ],
   [
    "A company has two break-glass accounts excluded from every CA policy. An audit asks how the company would know if an attacker used one. What should be in place?",
    "Sign-in logs sent to Log Analytics with an alert rule that fires on any sign-in by either account, plus regular tests and review of the exclusion group's membership."
   ]
  ],
  "tip": "Security defaults and Conditional Access are mutually exclusive; if a question needs exclusions, locations or per-app rules, the answer is Conditional Access with P1. Break-glass accounts are cloud-only, onmicrosoft.com, permanent Global Administrator, phishing-resistant, excluded from lockout-risk policies and monitored with alerts.",
  "check": [
   [
    "What must you do before creating Conditional Access policies in a tenant using security defaults?",
    "Disable security defaults, then replace their protections with equivalent CA policies."
   ],
   [
    "Why should emergency access accounts use the onmicrosoft.com domain?",
    "So they are cloud-only and don't depend on on-premises AD, synchronization or a federation service that might be unavailable."
   ],
   [
    "How should you know when an emergency access account is used?",
    "Send sign-in logs to Log Analytics (or another monitoring tool) and alert on any sign-in by those accounts."
   ],
   [
    "Which license do you need to replace security defaults with Conditional Access?",
    "Microsoft Entra ID P1 or higher."
   ]
  ]
 },
 {
  "t": "Conditional Access: assignments, conditions (locations, device platforms, client apps, filters for devices, risk), grant and session controls",
  "hook": "The CISO of Sterling Freight hands you a sticky note during the Tuesday stand-up. It reads: block old mail protocols, MFA for everyone outside the office, admins only from their secure workstations, and nobody downloads customer files to a personal laptop. That is four requirements, and you have one tool to meet them all: Conditional Access. You open the New policy page and stare at the blades: Users, Target resources, Network, Conditions, Grant, Session. Each one has a dozen options, and you know that two policies can apply to the same sign-in at once. Which boxes answer which line of the sticky note, and what happens when policies disagree?",
  "simple": "Conditional Access is a set of if-then rules that decide what happens when someone signs in. The if part says who is signing in, to which app, and under what conditions, such as from which country, on what kind of device, or how suspicious the sign-in looks. The then part says what to do: let them in, let them in only after an extra check like a phone prompt, let them in only from a company-managed device, or block them. Some rules also shape what happens after sign-in, like allowing viewing but not downloading. Every rule that matches is applied, and if any rule says block, the answer is block. It is like a club where the bouncer checks a list of rules and one firm no is enough.",
  "body": [
   "A Conditional Access (CA) policy in Microsoft Entra ID is an if-then statement evaluated at sign-in, after the first authentication factor has been completed. The if part contains assignments and conditions; the then part contains access controls. Two evaluation rules underpin every exam question on this topic. First, every policy that applies to a sign-in is enforced, and there is no priority order between policies; the requirements of all matching policies are combined. Second, if any applicable policy blocks, access is blocked, whatever the other policies say.",
   "Assignments define who and what the policy covers. Under Users you can include all users, selected users and groups, directory roles such as Global Administrator, or guest and external user types, and you can exclude any of these. Workload identities, meaning service principals, can also be targeted, which requires a separate workload identities license. Always exclude your emergency access accounts. Target resources can be cloud apps (all resources, or selected apps such as Office 365 or the Windows Azure Service Management API that covers Azure management tools), user actions (Register security information, and Register or join devices), or an authentication context, which is a tag an app can request when a user attempts a sensitive operation, such as opening a highly confidential SharePoint site.",
   "Conditions narrow when a policy applies, and each has its own exam angle. User risk and sign-in risk use risk levels from Microsoft Entra ID Protection, which requires Microsoft Entra ID P2. Device platforms include Android, iOS, Windows, macOS and Linux; the platform is detected from what the client reports, so it is not a strong security boundary on its own. Locations, now labeled Network in the portal, use named locations such as trusted Internet Protocol (IP) address ranges or lists of countries, and you can include or exclude any location, all trusted locations or specific named locations.",
   "Client apps separate browser traffic, mobile apps and desktop clients that use modern authentication, Exchange ActiveSync clients, and other clients. The last two are legacy authentication, which can't perform multifactor authentication (MFA), so blocking Exchange ActiveSync and other clients is the standard way to shut down protocols such as basic authentication for Post Office Protocol (POP) and Internet Message Access Protocol (IMAP). Filter for devices uses rule syntax on device attributes, such as device.trustType, device.isCompliant or extensionAttribute1 through 15, to include or exclude specific devices. A rule such as `device.extensionAttribute1 -eq \"PAW\"` can scope an admin policy to privileged access workstations (PAWs). Authentication flows let you target device code flow and authentication transfer, two flows often abused in phishing.",
   "Grant controls decide the outcome. Block access stops the sign-in outright. Grant access can require one or more of: multifactor authentication, an authentication strength, a device marked as compliant (managed by Microsoft Intune or a supported partner), a Microsoft Entra hybrid joined device, an app protection policy on mobile, a password change (used with user risk), and terms of use. When several are selected you choose Require all the selected controls, which means every box must be satisfied, or Require one of the selected controls, which means any one is enough. A policy requiring MFA or compliant device with Require one lets a managed laptop through without a prompt, while an unmanaged phone gets an MFA prompt.",
   "Session controls shape what happens after access is granted. Use app enforced restrictions passes device state to SharePoint Online and Exchange Online so they can offer limited, browser-only access from unmanaged devices, for example view but not download. Use Conditional Access App Control routes the session through Microsoft Defender for Cloud Apps as a reverse proxy, enabling real-time monitoring and controls such as blocking downloads of sensitive files. Sign-in frequency sets how often users must reauthenticate, and persistent browser session decides whether the browser stays signed in after it closes. Further options customize continuous access evaluation, disable resilience defaults and require token protection for sign-in sessions.",
   "Putting the sticky note from the hook together shows how these parts combine. Block legacy authentication with a policy for all users, client apps Exchange ActiveSync and other clients, grant Block. Require MFA off-site with a policy for all users and all resources, network include any location and exclude all trusted locations, grant Require MFA. Restrict admins with a policy for admin roles that excludes devices matching the PAW filter and blocks everything else. Prevent downloads on personal laptops with app enforced restrictions or App Control for SharePoint. Each policy excludes the break-glass accounts.",
   "Every policy has a state of On, Off or Report-only. Build and test new policies in report-only, review the results in the sign-in logs and the insights workbook, and only then switch them on. Because policies combine and block wins, a single overly broad policy can lock out an entire organization, which is why exclusions and testing are part of the design, not an afterthought."
  ],
  "analogy": "Think of Conditional Access as airport security with several checkpoints that all apply to you at once. One checkpoint asks for your boarding pass, another scans your bag, another checks your passport if you're flying internationally. You must pass every checkpoint that applies to your trip, in any order, and if any one officer says you can't fly, you don't fly. Session controls are the rules on board, like no electronics during takeoff. The analogy stops at ordering: airports have a physical sequence, but CA has no policy order at all; all matching policies are simply combined.",
  "mnemonic": "Read a policy as Who, What, When, Then: Who is users and workload identities, What is target resources, When is conditions, and Then is grant and session controls.",
  "terms": [
   [
    "Assignments",
    "The users, workload identities and target resources that a Conditional Access policy applies to."
   ],
   [
    "Conditions",
    "Additional signals such as risk, device platform, network location, client app and device filters that narrow a policy."
   ],
   [
    "Grant controls",
    "The access decision: block, or grant while requiring MFA, compliant device, authentication strength and similar."
   ],
   [
    "Session controls",
    "Controls applied after access is granted, such as sign-in frequency, app enforced restrictions and App Control."
   ],
   [
    "Filter for devices",
    "A rule on device attributes that includes or excludes specific devices from a policy."
   ],
   [
    "Authentication context",
    "A tag apps can request for sensitive actions so a CA policy can demand stronger controls for them."
   ]
  ],
  "example": "Contoso wants to block legacy authentication, require MFA for all users off the corporate network, and allow only browser access to SharePoint from unmanaged devices. It creates three policies: block for other clients and Exchange ActiveSync, require MFA excluding the trusted named location, and app enforced restrictions for SharePoint. All exclude the break-glass accounts and are tested in report-only before being turned on.",
  "mistakes": [
   [
    "Policies are processed in order, and the first matching policy wins.",
    "There is no order. All applicable policies are enforced together, and any block overrides grants."
   ],
   [
    "Use the device platform condition to make sure only corporate Windows laptops get access.",
    "Device platform comes from what the client reports and is not a security boundary. Use require compliant device, hybrid joined device or a filter for devices."
   ],
   [
    "Require one of the selected controls and Require all mean the same thing when only MFA and compliant device are chosen.",
    "Require one lets users satisfy either control; Require all demands both. The choice changes who gets prompted and who gets blocked."
   ],
   [
    "Blocking legacy authentication uses the Network condition.",
    "Legacy authentication is targeted with the Client apps condition, selecting Exchange ActiveSync clients and other clients, with grant Block."
   ]
  ],
  "tryit": [
   [
    "Sterling Freight requires that administrators sign in only from privileged access workstations. Those devices have extensionAttribute1 set to PAW. Admins currently sign in from many laptops. How would you design the policy?",
    "Create a policy that targets the admin directory roles and all resources, uses a filter for devices to exclude devices where extensionAttribute1 equals PAW, and grants Block. Admins on any other device are blocked; exclude the break-glass accounts and test in report-only first."
   ],
   [
    "One policy requires MFA for all users. A second policy, targeting the sales group, requires a compliant device. A salesperson signs in from a compliant laptop without having done MFA. What happens?",
    "Both policies apply, so their controls combine. She must satisfy MFA and have a compliant device; the compliant laptop alone is not enough."
   ]
  ],
  "tip": "All applicable policies are combined, and block always wins. Device platform is a convenience condition, not a security boundary; use compliant device or filters for devices for real device control. Require one versus require all changes the meaning of multiple grant controls.",
  "check": [
   [
    "Two policies apply to a sign-in: one requires MFA, the other blocks access. What happens?",
    "Access is blocked, because all applicable policies are enforced and a block overrides grants."
   ],
   [
    "Which condition would you use to block legacy authentication protocols?",
    "Client apps, selecting Exchange ActiveSync clients and other clients, with a block grant control."
   ],
   [
    "How can you apply a policy only to privileged access workstations?",
    "Use a filter for devices condition on a device attribute that identifies those workstations."
   ],
   [
    "Which session control lets SharePoint offer browser-only, no-download access from unmanaged devices?",
    "Use app enforced restrictions."
   ]
  ]
 },
 {
  "t": "Named locations, authentication strengths, sign-in frequency, persistent browser session and token protection",
  "hook": "At Granite Peak Capital, the quarterly security review turns up three uncomfortable findings. Sign-ins to the trading platform are arriving from a country where the firm has no staff. A contractor admitted she stays signed in to the finance portal on a shared airport kiosk for days at a time. And the incident response team just finished cleaning up after an adversary-in-the-middle phishing kit that captured an analyst's session cookie and replayed it from another continent, even though he had completed MFA. The firm already requires MFA everywhere. So why did these still happen, and which finer-grained Conditional Access settings close each gap?",
  "simple": "Basic sign-in rules say require a phone check. This lesson is about making those rules more precise. First, you can name places, like our office network or countries we work in, and treat them differently. Second, not all checks are equal: a text message is weaker than a security key, so you can demand a specific kind of check for important apps. Third, you decide how often people must sign in again, and whether the browser remembers them after it is closed. Last, token protection ties a sign-in to the one device that earned it, so a thief who copies it cannot reuse it on another computer. It is like a concert wristband that only works on the wrist it was put on.",
  "body": [
   "These settings are the building blocks that make Conditional Access (CA) policies precise rather than blunt. Each one answers a specific question: where is the user, how strongly did they prove who they are, how often must they prove it again, does the browser remember them, and can a stolen session be replayed somewhere else? On the exam, scenarios usually describe one of these questions in business language and expect you to pick the right building block.",
   "Named locations define networks, and there are two kinds. An IP ranges location lists public Internet Protocol (IP) ranges, IPv4 or IPv6, in Classless Inter-Domain Routing (CIDR) notation, such as 203.0.113.0/24 for an office's egress addresses. An IP ranges location can be marked as trusted, which lowers risk calculations in Microsoft Entra ID Protection and lets you exclude all trusted locations from an MFA policy. A countries or regions location groups countries; Entra determines the country from the client's IP address, or optionally from Global Positioning System (GPS) coordinates reported by Microsoft Authenticator, which helps when users connect through virtual private networks (VPNs) that hide their real country. You can also include unknown countries or regions to cover addresses that can't be mapped. In a policy, locations appear under the Network condition. Blocking sign-ins from countries where you don't operate is a common, simple use.",
   "Authentication strengths replace the blunt Require multifactor authentication control with a precise list of allowed method combinations. Three are built in. Multifactor authentication strength accepts any MFA combination, including password plus SMS. Passwordless MFA strength accepts methods that don't need a password, such as passkeys, Windows Hello for Business and Authenticator phone sign-in. Phishing-resistant MFA strength allows only passkeys (FIDO2), Windows Hello for Business and certificate-based multifactor authentication. You can create custom strengths, for example allowing only specific FIDO2 key models by their Authenticator Attestation GUID (AAGUID). Apply a strength with the Require authentication strength grant control, such as phishing-resistant MFA for all directory roles. Strengths can apply to external users too, subject to whether your cross-tenant access settings trust MFA from their home tenant.",
   "Sign-in frequency sets how long a user can go before reauthenticating. You choose a number of hours or days, or Every time. Every time forces fresh authentication at each evaluation and is used for sensitive moments, such as remediating a risky sign-in, registering security information or activating a role in Privileged Identity Management (PIM). By default Entra uses a long rolling window and silently refreshes tokens while the session stays healthy, so users rarely see prompts. Sign-in frequency exists to tighten that behavior where the risk justifies the extra prompts, such as unmanaged devices or highly privileged roles.",
   "Persistent browser session controls whether the browser keeps the user signed in after it is closed and reopened. The options are Always persistent and Never persistent. Never persistent suits shared or unmanaged devices, such as the airport kiosk in the hook, because closing the browser ends the session. This control has a quirk the exam likes: it only works when the policy targets all cloud apps, so you can't apply it to one app alone.",
   "Token protection is a session control that binds sign-in session tokens to the device they were issued to. It relies on the device's primary refresh token (PRT), the device-bound credential a registered or joined device holds, so a token copied off one device can't be replayed from another. This targets token theft: adversary-in-the-middle phishing kits that relay a real sign-in, including MFA, and capture the resulting session, and malware that steals browser cookies. Neither attack is stopped by MFA alone, because the attacker steals what MFA produced. Support is limited to specific platforms and client applications, currently mainly desktop apps on Windows for services such as Exchange Online and SharePoint Online, so test it in report-only mode and scope it carefully to supported apps and devices.",
   "Combining these controls is how real designs come together. For Granite Peak, a policy blocks sign-ins from a countries location listing places with no staff. Another requires phishing-resistant MFA strength for traders and administrators, which would have made the phishing kit's relay fail because passkeys only answer the genuine domain. A third targets unmanaged devices with sign-in frequency of a few hours and Never persistent browser sessions. A pilot policy enables token protection for Exchange Online and SharePoint Online on Windows devices in report-only first. Each policy excludes the break-glass accounts."
  ],
  "analogy": "Think of a hotel. Named locations are the floors: guests on the conference floor get waved through, while the rooftop is closed entirely. Authentication strength is the type of ID the front desk accepts for the penthouse: a passport only, not a library card. Sign-in frequency is how often your key card expires and must be re-coded. Persistent browser session is whether the card still works after you check out. Token protection is a key card that only opens doors when you, not a copy of the card, are standing there. The analogy stops at location trust: an IP address can be shared or spoofed by a proxy far more easily than a hotel floor.",
  "terms": [
   [
    "Named location",
    "An administrator-defined IP range or set of countries used in Conditional Access network conditions."
   ],
   [
    "Trusted location",
    "A named IP location marked as trusted, which can be excluded from policies and lowers risk evaluation."
   ],
   [
    "Authentication strength",
    "A Conditional Access control that specifies which authentication method combinations satisfy a policy."
   ],
   [
    "Sign-in frequency",
    "A session control setting how long before users must reauthenticate, or requiring it every time."
   ],
   [
    "Persistent browser session",
    "A session control that keeps or ends a browser session after it closes; it requires targeting all cloud apps."
   ],
   [
    "Token protection",
    "A session control that binds tokens to the issuing device to prevent replay of stolen tokens."
   ]
  ],
  "example": "A finance firm requires phishing-resistant MFA strength for all admin roles, sets sign-in frequency to four hours and never persistent browser sessions for users on unmanaged devices, blocks sign-ins from a countries location containing places it doesn't operate, and pilots token protection for Exchange Online on Windows devices in report-only mode.",
  "mistakes": [
   [
    "Authenticator push with number matching satisfies phishing-resistant MFA strength.",
    "Phishing-resistant MFA strength allows only passkeys (FIDO2), Windows Hello for Business and certificate-based multifactor authentication."
   ],
   [
    "You can apply persistent browser session to just the finance app.",
    "Persistent browser session only works when the policy targets all cloud apps."
   ],
   [
    "Countries locations can only use IP address geolocation.",
    "Entra can also use GPS coordinates reported by Microsoft Authenticator to determine the country, which is optional."
   ],
   [
    "Requiring MFA everywhere stops session cookie theft.",
    "Adversary-in-the-middle kits and cookie-stealing malware steal the session after MFA. Token protection and phishing-resistant methods address that risk."
   ]
  ],
  "tryit": [
   [
    "Granite Peak's board members use personal tablets and occasionally hotel business-center computers. The CISO wants their sessions to end when they close the browser, and wants them to sign in again at least every few hours. Which controls do you configure, and is there any scoping constraint?",
    "Use the session controls Persistent browser session set to Never persistent and Sign-in frequency set to a few hours. Persistent browser session requires the policy to target all cloud apps, so scope the policy to the board group and all cloud apps, perhaps limited with a device filter or condition for unmanaged devices."
   ],
   [
    "Administrators currently satisfy a Require MFA policy with SMS. The security team wants admins protected against phishing sites that relay sign-ins. What do you change?",
    "Replace Require MFA with Require authentication strength set to Phishing-resistant MFA for the admin roles, after making sure admins have registered passkeys, Windows Hello for Business or CBA. SMS and Authenticator push will no longer satisfy the policy."
   ]
  ],
  "tip": "Phishing-resistant strength means passkeys, Windows Hello for Business and CBA; Authenticator push does not qualify. Persistent browser session only works when the policy targets all cloud apps. Token protection binds tokens to the device to stop replay.",
  "check": [
   [
    "Which built-in authentication strength would you require for administrators to resist phishing?",
    "Phishing-resistant MFA strength."
   ],
   [
    "How does Entra determine a user's country for a countries or regions named location?",
    "From the IP address, or optionally from GPS coordinates reported by the Microsoft Authenticator app."
   ],
   [
    "What attack does token protection defend against?",
    "Token theft and replay, where a session token stolen from one device is used from another device."
   ],
   [
    "When would you set sign-in frequency to Every time?",
    "For sensitive actions such as risky sign-in remediation or PIM role activation, where fresh authentication is needed each time."
   ]
  ]
 },
 {
  "t": "Testing policies with report-only mode and the What If tool; troubleshooting with sign-in logs",
  "hook": "It is 8:05 a.m. at Silverline Travel and the help desk queue has a new ticket from Marisol, a sales manager on a client visit in Brazil: the CRM says access denied, and she has a pitch at nine. Across the room, your teammate wants to switch on a new policy that requires compliant devices for the whole finance department today, and asks whether you are sure it won't lock anyone out. Two problems, one past and one future. For Marisol, you need to know exactly which policy stopped her and why. For the finance rollout, you need to know what will happen before anyone feels it. Which tool answers which question, and where in the portal do you look?",
  "simple": "Rules for signing in can go wrong. A rule might block the wrong people, or someone might be blocked and nobody knows why. Microsoft gives you three tools. Report-only mode lets a new rule watch real sign-ins and write down what it would have done, without actually doing it, like a practice run. The What If tool lets you ask a pretend question: if this person signed in from this place on this device, which rules would apply? The sign-in logs are the diary of every real sign-in, showing who signed in, from where, and which rules allowed or blocked them. It is like a referee who first watches a game without blowing the whistle, studies the rulebook for tricky cases, and keeps a record of every call made.",
  "body": [
   "A badly scoped Conditional Access (CA) policy can lock out an entire organization, including its administrators, in seconds. Microsoft Entra ID gives you three tools to prevent that and to diagnose problems afterward: report-only mode for observing a policy's effect on real sign-ins, the What If tool for simulating a sign-in on demand, and the sign-in logs for investigating what actually happened. Knowing which tool fits which question is the core exam skill.",
   "Report-only mode is a policy state alongside On and Off. A report-only policy is evaluated at every real sign-in and its result is logged, but nothing is enforced; users never see a prompt or a block because of it. In each sign-in log entry, the Report-only tab lists results such as Report-only: Success, meaning the user would have satisfied the controls; Report-only: Failure, meaning the user would have been blocked or could not satisfy a control; Report-only: User action required, meaning the user would have been prompted, for example for multifactor authentication (MFA); and Report-only: Not applied, meaning the conditions didn't match. One caution from the documentation: on some platforms, report-only policies that require a compliant device can still trigger a device certificate prompt, so read those notes before relying on report-only for every user.",
   "To see report-only results at scale, send sign-in logs to a Log Analytics workspace using diagnostic settings, then open the Conditional Access insights and reporting workbook. It summarizes how many users and sign-ins each policy would affect and lets you filter by user, app and result. Let a new policy run in report-only long enough to cover normal work patterns, such as a full week including weekends, month-end processing and travel, then switch it on. If the workbook shows many unexpected failures, adjust the policy and observe again before enforcing.",
   "The What If tool answers a hypothetical question: if this user signed in to this resource under these conditions, which policies would apply? You find it on the Conditional Access Policies page. You supply a user or workload identity, a cloud app, user action or authentication context, and optional conditions such as Internet Protocol (IP) address, country, device platform, client app, device state, and sign-in or user risk level. The result has two lists. Policies that will apply show their grant and session controls. Policies that will not apply show the reason, such as user excluded, application not included, or location condition not satisfied. What If is ideal for checking exclusions, such as confirming a break-glass account is excluded from every blocking policy, and for testing a fix before asking a user to try again.",
   "The two testing tools complement each other. Report-only shows what real traffic would have experienced over time, including combinations you never thought to test. What If gives an instant answer for one specific scenario, including one that has never happened yet, such as a new contractor or a trip to a country no one has visited. Neither one enforces anything, and What If evaluates only the inputs you provide.",
   "Sign-in logs record what actually happened. Each entry shows the user, application, time, IP address, location, client app, device details such as compliance and join type, authentication details listing which methods were used and whether MFA was satisfied by a claim in the token, and the overall Conditional Access result of Success, Failure or Not applied. The Conditional Access tab lists every policy with its individual result and which controls were or were not satisfied. Error codes explain failures: 53003 means access was blocked by Conditional Access, and 50126 means an invalid username or password. The Troubleshooting and support section shows the correlation ID and request ID, which Microsoft support asks for when you open a case.",
   "A practical troubleshooting sequence follows naturally. Find the failed sign-in by filtering on the user, app and time. Read the status and error code. Open the Conditional Access tab to see which policy failed and which control was not satisfied. Compare the device details and location with what the policy expects, for example compliant device showing false, or a country outside the allowed list. Then run What If with the same inputs to confirm your fix before the user retries. Remember where to look: interactive and non-interactive user sign-ins appear on separate tabs, and service principal and managed identity sign-ins have their own tabs as well, so an app failing in the background will not appear among interactive sign-ins."
  ],
  "analogy": "Think of a new traffic light at a busy intersection. Report-only is installing the camera first and recording how many drivers would have run the red light, without issuing tickets. What If is a planner asking, at her desk, what would happen to a delivery truck turning left at 5 p.m. The sign-in logs are the traffic camera footage after an actual accident. The analogy stops at completeness: the What If planner sees only the scenario she imagines, while report-only catches every real car, including ones nobody predicted.",
  "terms": [
   [
    "Report-only mode",
    "A Conditional Access policy state that evaluates and logs results without enforcing them."
   ],
   [
    "What If tool",
    "A Conditional Access tool that simulates a sign-in to show which policies would apply and why."
   ],
   [
    "Sign-in log",
    "A record of each authentication with user, app, device, location, methods and Conditional Access results."
   ],
   [
    "Error 53003",
    "The sign-in error code indicating access was blocked by Conditional Access."
   ],
   [
    "Correlation ID",
    "An identifier linking the events of one sign-in request, used for troubleshooting and support cases."
   ],
   [
    "Conditional Access insights and reporting workbook",
    "A Log Analytics workbook summarizing the impact of policies, including report-only results, across users and apps."
   ]
  ],
  "example": "A salesperson in Brazil can't open the CRM. The admin filters sign-in logs by the user, sees error 53003, and the Conditional Access tab shows the policy blocking unapproved countries failed. What If with the user's IP address confirms it. Because the trip is approved, the admin adds the user to a temporary exclusion group and What If now shows the policy as not applied.",
  "mistakes": [
   [
    "What If shows what happened during a user's last sign-in.",
    "What If simulates a hypothetical sign-in from the inputs you supply. To see what actually happened, open the sign-in logs."
   ],
   [
    "Report-only policies are only evaluated when you run a test.",
    "Report-only policies are evaluated on every real sign-in and logged continuously, without enforcement."
   ],
   [
    "A background app failing to authenticate will appear on the interactive sign-ins tab.",
    "Non-interactive, service principal and managed identity sign-ins appear on separate tabs of the sign-in logs."
   ],
   [
    "Error 50126 means Conditional Access blocked the user.",
    "50126 indicates an invalid username or password. Conditional Access blocks show error 53003."
   ]
  ],
  "tryit": [
   [
    "Silverline Travel plans to require compliant devices for the finance department. The finance team includes some staff who use personal laptops at home, and month-end close is in two weeks. How should you roll out the policy?",
    "Create the policy in report-only mode and let it run through at least one full work cycle, ideally including month-end. Review the Conditional Access insights workbook and the Report-only tabs for Failure results, enroll or exempt affected devices, then switch the policy on."
   ],
   [
    "A new break-glass account was created yesterday, and you need to prove to an auditor today that no CA policy will block it. What do you do?",
    "Run the What If tool for the break-glass account against all cloud apps with typical conditions, and confirm that no blocking policy appears under policies that will apply, with exclusions shown as the reason."
   ]
  ],
  "tip": "Report-only shows what real sign-ins would have done; What If simulates a sign-in that hasn't happened yet; sign-in logs show what did happen. Error 53003 means a CA block. Report-only policies that require a compliant device can still cause a device check prompt on some platforms.",
  "check": [
   [
    "What is the difference between report-only mode and the What If tool?",
    "Report-only evaluates real sign-ins over time without enforcing; What If simulates a single hypothetical sign-in on demand."
   ],
   [
    "Where in a sign-in log entry do you see which Conditional Access policy blocked the user?",
    "In the Conditional Access tab of the sign-in details, which lists each policy and whether it succeeded, failed or wasn't applied."
   ],
   [
    "How can you verify that emergency access accounts are excluded from all policies?",
    "Run the What If tool for each emergency account against all cloud apps and confirm no blocking policy applies."
   ],
   [
    "What does the result Report-only: User action required mean?",
    "The user would have been prompted to do something, such as complete MFA, if the policy were on."
   ]
  ]
 },
 {
  "t": "Microsoft Entra ID Protection: user risk vs sign-in risk, risk detections, remediation and risk-based Conditional Access",
  "hook": "At 2:14 a.m. the on-call phone buzzes for Theo at Northgate Health Partners. Microsoft Entra ID Protection has flagged a sign-in for Priya in billing: an anonymous IP address, a browser she has never used, and a location thousands of miles from where she signed in two hours earlier. Ten minutes later a second alert arrives for a different user, Marcus: his credentials have turned up in a leaked data set. Theo has two very different signals in front of him, one about a single suspicious sign-in and one about an account that may already be in an attacker's hands. Should both get the same response? Should he wake people up, block them, or let the system ask them to prove themselves?",
  "simple": "Microsoft watches billions of sign-ins and learns what looks normal and what looks suspicious. ID Protection uses that knowledge to give a risk score. There are two kinds. Sign-in risk asks whether this one sign-in looks like it came from someone else, for example from a strange location. User risk asks whether the whole account has probably been taken over, for example because the password showed up on a list of stolen passwords. You can set rules so a risky sign-in has to pass an extra phone check, and a risky account has to change its password. It is like a bank that calls you about one odd card purchase, but sends you a new card if your card number appears on a stolen list.",
  "body": [
   "Microsoft Entra ID Protection uses Microsoft's threat intelligence and machine learning to detect identity-based attacks, calculate risk, and trigger automatic responses. It sees signals from across Microsoft's services, which is why it can recognize a malicious Internet Protocol (IP) address or a password spray campaign that a single organization would miss. Full functionality, including risk-based Conditional Access (CA) and the detailed reports, requires Microsoft Entra ID P2.",
   "There are two kinds of risk, and telling them apart is the most important exam skill on this topic. Sign-in risk is the probability that a particular authentication request wasn't made by the account owner. User risk is the probability that the identity itself is compromised, accumulated from risk detections over time. A single sign-in from an anonymous IP address, such as a Tor exit node, raises sign-in risk for that sign-in. Leaked credentials found by Microsoft in a breach dump raise user risk for the account, regardless of any particular sign-in. Both are rated low, medium or high, and a series of risky sign-ins can also contribute to user risk.",
   "Risk detections feed these scores. Sign-in risk detections include anonymous IP address, atypical travel (two sign-ins from places too far apart for the time between them), unfamiliar sign-in properties, malicious IP address, password spray, suspicious browser, anomalous token and token issuer anomaly. User risk detections include leaked credentials, Microsoft Entra threat intelligence and anomalous user activity. Leaked credentials detection for hybrid users depends on password hash synchronization, because Microsoft needs the hash to compare against leaked data. Some detections are real time, calculated during the sign-in so policy can act immediately, while others are offline, calculated afterward, so their risk affects the next sign-in.",
   "The reports are where investigation happens. Risky users lists accounts with current user risk and their history. Risky sign-ins lists individual sign-ins with their risk level and detections. Risk detections lists every detection with its type and timing. Risky workload identities covers service principals separately, because applications can be compromised too, for example through leaked client secrets. In each report you can select an item and take action directly.",
   "Licensing shapes what you can see and do, and exam questions often hinge on it. Tenants without P2 still benefit from some detections and can see limited risk information in the reports, but they cannot use user risk or sign-in risk as conditions in Conditional Access, and the reports show less detail. When a scenario asks for automatic responses to risk, such as requiring MFA for a medium-risk sign-in or a password change for a high-risk user, the licensing answer is Microsoft Entra ID P2 for the users covered by those policies.",
   "Remediation clears risk, and the right remediation depends on the risk type. Users can self-remediate. Sign-in risk is remediated by successfully completing multifactor authentication (MFA), which proves the sign-in was really theirs. User risk is remediated by a secure password change, which itself requires MFA first, because a compromised password must be replaced. For passwordless users, who have no password to change, Microsoft's newer Require risk remediation grant control applies the appropriate action automatically. Admins can remediate manually: reset the password, confirm user compromised (which sets user risk to high and feeds the detection model), confirm sign-in safe, dismiss user risk, or block the user. Self-remediation only works if users are registered for MFA beforehand, which is why ID Protection includes an MFA registration policy.",
   "Microsoft recommends configuring risk responses as Conditional Access policies rather than the older standalone ID Protection user risk and sign-in risk policies, which are being retired. A typical pair looks like this. Policy one: all users, all resources, user risk High, grant access requiring password change (with MFA), session sign-in frequency Every time. Policy two: all users, all resources, sign-in risk Medium and High, grant access requiring MFA, session sign-in frequency Every time. Exclude break-glass accounts and start in report-only. Choosing Block instead of allowing self-remediation is stricter, but every blocked user becomes a help desk ticket, so most organizations block only where self-remediation isn't possible.",
   "Tuning reduces noise over time. Marking office networks as trusted named locations lowers false positives for sign-ins from those networks. Admin feedback, such as confirm safe or confirm compromised, improves the models. For deeper investigation, export risk data with diagnostic settings to Log Analytics or to a security information and event management (SIEM) system such as Microsoft Sentinel, and correlate it with other security events."
  ],
  "analogy": "Think of a credit card company. A single odd purchase, like a large charge in another country, is sign-in risk: the company texts you to confirm it was you, and if you confirm, the charge goes through. Your card number appearing on a list sold by criminals is user risk: confirming one purchase doesn't help, so the company issues a new card. That is why sign-in risk pairs with MFA and user risk pairs with a password change. The analogy stops at learning: ID Protection also improves from admin feedback across the whole service.",
  "terms": [
   [
    "Sign-in risk",
    "The probability that a specific authentication request was not performed by the legitimate user."
   ],
   [
    "User risk",
    "The probability that an identity is compromised, based on accumulated detections such as leaked credentials."
   ],
   [
    "Risk detection",
    "A signal of suspicious activity, such as atypical travel or leaked credentials, that contributes to risk levels."
   ],
   [
    "Self-remediation",
    "Users clearing their own risk by completing MFA (sign-in risk) or a secure password change (user risk)."
   ],
   [
    "Confirm user compromised",
    "An admin action that sets user risk to high and trains the detection model."
   ],
   [
    "Atypical travel",
    "A sign-in risk detection for sign-ins from distant locations within a time too short for real travel."
   ]
  ],
  "example": "Leaked credentials for a marketing user appear in a breach dump, and ID Protection raises her user risk to high. At her next sign-in the Conditional Access user risk policy requires MFA and a secure password change. She completes both, her risk is remediated automatically, and the security team reviews the Risky users report without opening a ticket.",
  "mistakes": [
   [
    "Leaked credentials raise sign-in risk, so MFA fixes them.",
    "Leaked credentials raise user risk. MFA alone doesn't fix a known-compromised password; the remediation is a secure password change."
   ],
   [
    "Leaked credentials detection works for synced users with any sign-in method.",
    "For hybrid users it requires password hash synchronization so Microsoft has the hash to compare."
   ],
   [
    "Configure new risk responses in the standalone ID Protection risk policies.",
    "Microsoft recommends risk-based Conditional Access policies; the legacy standalone risk policies are being retired."
   ],
   [
    "Enable risk policies first, then ask users to register for MFA.",
    "Users must be registered for MFA before risk policies are enforced, or they can't self-remediate and will be blocked."
   ]
  ],
  "tryit": [
   [
    "Northgate Health Partners has P2 licenses. The CISO wants risky sign-ins challenged automatically and compromised accounts forced to change passwords, without flooding the help desk. About 15 percent of users haven't registered MFA yet. What do you do, in what order?",
    "First enable the ID Protection MFA registration policy or a registration campaign so everyone registers. Then create two CA policies in report-only: sign-in risk Medium and High requiring MFA, and user risk High requiring password change, both with sign-in frequency Every time and break-glass exclusions. Review results, then turn them on."
   ],
   [
    "An analyst reviews a risky sign-in for a user who was traveling and confirms it was legitimate. What action should she take, and why does it matter?",
    "Select Confirm sign-in safe. It clears that sign-in's risk and feeds back to the detection model, reducing similar false positives."
   ]
  ],
  "tip": "Sign-in risk pairs with require MFA; user risk pairs with require password change. Leaked credential detection for synced users needs password hash sync. ID Protection risk-based policies need P2, and users must be registered for MFA first.",
  "check": [
   [
    "Which risk type does leaked credentials affect, and how does a user remediate it?",
    "User risk; the user remediates it with a secure password change after MFA."
   ],
   [
    "What control should a sign-in risk policy require so users can self-remediate?",
    "Multifactor authentication (typically with sign-in frequency set to every time)."
   ],
   [
    "Why must users be registered for MFA before risk policies are enabled?",
    "Self-remediation requires MFA; unregistered users can't complete it and would be blocked."
   ],
   [
    "What does Confirm user compromised do?",
    "It sets the user's risk to high and provides feedback that improves the detection model."
   ]
  ]
 },
 {
  "t": "Continuous access evaluation (CAE) and session revocation",
  "hook": "At 3:02 p.m. on a Wednesday, HR at Ironwood Engineering calls you: a project manager has just been let go, and he left the meeting angry, laptop still in hand. Outlook on that laptop is open and syncing. You disable his account in Microsoft Entra ID, but a colleague asks the obvious question: doesn't his laptop already have a token that is good for a while? If tokens simply run until they expire, he could still be reading mail, downloading files from SharePoint and posting in Teams long after you clicked Disable. How quickly does disabling an account actually take effect, and what else should you click right now?",
  "simple": "When you sign in to an app, you get a digital pass called a token, which works for a while so you don't have to sign in every minute. The problem is that if someone should lose access right now, an old-style pass keeps working until it runs out. Continuous access evaluation fixes this for supported apps like Outlook and Teams. When something important happens, like the account being disabled or the password changed, the sign-in system tells those apps right away, and they stop accepting the old pass. Revoking sessions is the button an admin presses to make that happen on purpose. It is like a hotel that can deactivate your key card the moment you check out, instead of waiting until it expires at noon.",
  "body": [
   "To understand continuous access evaluation (CAE), start with how tokens normally work. When a user signs in, Microsoft Entra ID issues an Open Authorization (OAuth) access token to the client app, and the app presents it to a resource such as Exchange Online. Traditional access tokens are valid until they expire, typically about an hour. If you disable the user, reset their password, or they move to a disallowed network, an app that already holds a token keeps getting access until that token runs out. That window is exactly where an attacker with a stolen token, or an angry former employee, can operate.",
   "CAE closes the window by turning token validation into a conversation between Entra ID and CAE-capable resource providers, which include Exchange Online, SharePoint Online, Teams and Microsoft Graph. Entra tells the resource when a critical event happens, and the resource can also evaluate certain policies itself. The critical events are: the user account is deleted or disabled; the password is changed or reset; multifactor authentication (MFA) is enabled for the user; an administrator explicitly revokes all refresh tokens for the user; and Microsoft Entra ID Protection detects high user risk. These five appear often on the exam, so learn them as a list.",
   "When a CAE-capable resource learns of a critical event, it rejects the current access token on the next request and sends the client a claims challenge. A claims challenge is a response that tells the client its token is no longer accepted and that it must return to Entra ID for a new one. At that point, current policy applies: a disabled account gets no token at all, and a user whose password was reset must sign in with the new password. For this to work smoothly, the client app must be CAE-aware, meaning it understands claims challenges; current versions of Microsoft 365 apps such as Outlook and Teams are.",
   "CAE also enforces Conditional Access network location policy at the resource. If a session's Internet Protocol (IP) address changes to one that your location-based policy doesn't allow, a CAE-capable service can reject the token immediately rather than waiting for expiry. Strict location enforcement, a CAE customization, makes the resource check that the IP address it observes matches an allowed location. That is useful for organizations that rely heavily on location policy, but it can break sign-ins behind proxies or split-tunnel virtual private networks (VPNs), where Entra and the resource see different IP addresses for the same user. Test it in report-only mode first.",
   "It helps to picture what users and logs show when CAE acts. In a well-behaved client the user usually notices nothing more than a brief sign-in prompt, or, for a disabled account, a message that access is denied. In the sign-in logs, sign-ins that produced CAE-capable tokens are marked accordingly, which lets you confirm during an investigation whether a given app session would have reacted to revocation in minutes or only at token expiry.",
   "Because services can now revoke access on demand, CAE-aware clients receive long-lived access tokens, up to 28 hours, instead of short-lived ones. This sounds backward at first, but it improves resilience: during an Entra outage, users keep working with tokens they already hold. Security improves at the same time, since revocation is driven by events rather than by waiting for expiry. CAE is on by default for supported apps. In a Conditional Access session control called Customize continuous access evaluation, you can adjust it, for example disabling it temporarily for troubleshooting or turning on strict enforcement.",
   "Session revocation is the admin action that triggers one of those critical events on purpose. In the Microsoft Entra admin center, open the user and select Revoke sessions, or run the Microsoft Graph PowerShell command:",
   "```powershell\nRevoke-MgUserSignInSession -UserId ana@contoso.com\n```",
   "This invalidates the user's refresh tokens and session cookies, so no new access tokens can be obtained. CAE-capable apps react within minutes. Apps that don't support CAE keep their existing access token until it expires and then fail to renew, so their window is the remaining token lifetime. In an incident, combine steps rather than relying on one: disable the account, reset the password, revoke sessions, review and remove registered authentication methods and devices the attacker may have added, and check the sign-in logs for any activity after revocation. For a compromised account that will be restored, revoking sessions and resetting the password before re-enabling it ensures any stolen tokens are useless."
  ],
  "analogy": "Think of a concert where wristbands are good for the whole day. In the old model, security staff only check that a wristband exists, so a stolen or revoked wristband works until midnight. CAE is like the venue radioing every door the moment a wristband is canceled, so the next time that wristband approaches any door, it is turned away and its wearer is sent back to the box office. The analogy stops at venue coverage: only CAE-capable doors get the radio call; other doors honor the wristband until it expires.",
  "terms": [
   [
    "Continuous access evaluation",
    "A mechanism letting services revoke access in near real time when critical events or policy changes occur."
   ],
   [
    "Critical event",
    "A change such as account disablement, password reset or token revocation that CAE-capable services act on."
   ],
   [
    "Claims challenge",
    "A response telling the client its token is no longer accepted and it must reauthenticate to Entra ID."
   ],
   [
    "Strict location enforcement",
    "A CAE setting that makes resources enforce location policy against the IP address they observe."
   ],
   [
    "Revoke sessions",
    "An admin action that invalidates a user's refresh tokens and session cookies."
   ],
   [
    "CAE-aware client",
    "An application that understands claims challenges and can receive long-lived tokens."
   ]
  ],
  "example": "An employee is terminated at 3 p.m. HR disables the account and the admin selects Revoke sessions. His laptop's Outlook, which held a valid access token, receives a claims challenge from Exchange Online within minutes and can't get a new token, so mail stops syncing well before the old token would have expired.",
  "mistakes": [
   [
    "Disabling an account immediately stops every app the user has open.",
    "Only CAE-capable resources react within minutes. Apps that don't support CAE keep working until their current access token expires."
   ],
   [
    "Long-lived 28-hour tokens make CAE less secure.",
    "CAE-capable resources can revoke tokens on critical events, so long lifetimes improve resilience without weakening security."
   ],
   [
    "A user changing location is one of the five critical events.",
    "Location changes are handled through CAE's evaluation of Conditional Access location policy, not as one of the listed critical events, which are disable or delete, password change or reset, MFA enabled, token revocation and high user risk."
   ],
   [
    "Turn on strict location enforcement everywhere for maximum security.",
    "Strict enforcement can block legitimate users behind proxies or split-tunnel VPNs where Entra and the resource see different IP addresses. Test before enforcing."
   ]
  ],
  "tryit": [
   [
    "Ironwood Engineering suspects an attacker has a valid session for a finance user. The user still needs her account, and she uses Outlook, Teams and a third-party expense app that doesn't support CAE. What do you do, and what residual risk remains?",
    "Reset her password, revoke her sessions, and review her registered methods and devices. Outlook and Teams, as CAE-capable clients, receive claims challenges within minutes. The third-party app may keep its current access token until it expires, so that is the remaining window to watch in the logs."
   ],
   [
    "After enabling strict location enforcement, users connecting through the company's split-tunnel VPN are being denied access to SharePoint. Why, and what is a reasonable fix?",
    "With split tunneling, Entra may see one IP address while SharePoint sees another, so strict enforcement rejects the token. Add all egress IP ranges to the trusted named location, or disable strict enforcement for those users while you fix the network design."
   ]
  ],
  "tip": "Know the list of critical events and that CAE-capable clients get tokens lasting up to 28 hours. Apps that don't support CAE still honor revocation only when their current access token expires. Revoke sessions in the portal equals Revoke-MgUserSignInSession in Graph PowerShell.",
  "check": [
   [
    "Name three critical events that CAE services react to.",
    "Any three of: user deleted or disabled, password changed or reset, MFA enabled for the user, admin revoked refresh tokens, high user risk detected."
   ],
   [
    "Why do CAE-capable clients receive longer-lived access tokens?",
    "Because the resource can revoke them immediately on critical events, long lifetimes improve resilience without weakening security."
   ],
   [
    "What does Revoke-MgUserSignInSession do?",
    "It invalidates the user's refresh tokens and session cookies, forcing reauthentication."
   ],
   [
    "What is a claims challenge?",
    "A resource's response telling the client that its token is no longer accepted and that it must get a new token from Entra ID, where current policy applies."
   ]
  ]
 },
 {
  "t": "Global Secure Access: Microsoft Entra Internet Access and Private Access, traffic forwarding profiles",
  "hook": "Aurora Textiles has 900 employees, three factories and one aging VPN appliance that everyone hates. Every morning the help desk at the Ohio plant fields the same calls: the VPN is slow, it disconnects during video meetings, and once someone is connected they can reach every server on the network, including the old ERP database nobody has patched in years. Last month a contractor uploaded design files to a personal Microsoft 365 tenant from a company laptop, and nothing stopped him. The CIO wants to retire the VPN, give people access only to the apps they need, and control where corporate data can go online. Can identity, rather than network location, become the gatekeeper for all of this traffic?",
  "simple": "Many companies use a VPN, a kind of private tunnel that connects your laptop to the office network so you can reach work files from home. The trouble is that once you are in the tunnel, you can often reach far too much. Global Secure Access is Microsoft's newer approach. Your device sends its traffic to Microsoft's worldwide network, which checks who you are and what you are allowed to use before letting each connection through. One part protects internet browsing and blocks risky sites. The other part lets you reach specific internal company apps without a full VPN. It is like replacing one master key for the whole building with a smart badge that opens only the rooms you need.",
  "body": [
   "Global Secure Access is Microsoft's security service edge (SSE) solution, part of the Microsoft Entra family. An SSE delivers network security from the cloud instead of from boxes in your data center. Rather than backhauling user traffic through a corporate virtual private network (VPN) and on-premises firewalls, Global Secure Access sends it to Microsoft's globally distributed network, where identity-aware policies are applied close to the user. It brings the Zero Trust principle of verifying every request explicitly to network access, using the same identities and Conditional Access (CA) policies you already manage in Entra.",
   "Global Secure Access has two main services, and telling them apart is a core exam skill. Microsoft Entra Internet Access secures access to the public internet, software as a service (SaaS) apps and Microsoft 365. Microsoft Entra Private Access secures access to your private applications, whether on-premises or in another cloud. A simple way to remember the split: Internet Access faces outward, Private Access faces inward.",
   "Microsoft Entra Internet Access includes a secure web gateway with web content filtering, which lets you allow or block destinations by web category, such as gambling or malware, or by fully qualified domain name (FQDN). It also provides universal tenant restrictions, which stop users on corporate devices from signing in to other organizations' Microsoft Entra tenants, a guard against data exfiltration like the contractor uploading files to a personal tenant in the hook. Compliant network checks let Conditional Access require that a sign-in come through Global Secure Access, which helps protect against token replay from outside your network. Source IP restoration passes the user's original public Internet Protocol (IP) address to Entra ID, so named locations, risk detections and sign-in logs keep working even though traffic now arrives through Microsoft's edge.",
   "Microsoft Entra Private Access replaces traditional VPN access to private applications. It uses private network connectors, the same lightweight, outbound-only connectors used by Microsoft Entra application proxy, installed on servers near the apps. Because the connectors make only outbound connections, no inbound firewall ports need to be opened to the internet. Private Access works with Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) traffic, not just web apps, so file shares, Remote Desktop Protocol (RDP) and Secure Shell (SSH) sessions all qualify.",
   "Private Access offers two ways to define what users can reach. Quick Access provides broad access to defined IP ranges or FQDNs and ports in a single application, which is the fastest way to replace a VPN wholesale. Per-app access defines individual enterprise applications for specific destinations and ports, so each one can have its own user and group assignment and its own Conditional Access policy. For example, you might require phishing-resistant MFA for an SSH jump host while allowing the intranet with standard MFA. A common rollout starts with Quick Access to retire the VPN quickly, then carves out sensitive apps into per-app access over time.",
   "Traffic forwarding profiles decide which traffic the service captures. There are three. The Microsoft traffic profile covers Microsoft 365 services such as Exchange Online and SharePoint Online. The Private Access profile covers your private apps. The Internet Access profile covers general internet traffic. Each profile is enabled separately, and you assign users and groups to it, so you can start with only Microsoft traffic for a pilot group and expand later.",
   "Traffic reaches the service in two ways. The Global Secure Access client is installed on Windows, macOS, iOS and Android devices and tunnels the traffic selected by the enabled profiles. Remote networks connect whole branch offices, where the branch's customer premises equipment (CPE), such as a router or firewall, builds Internet Protocol Security (IPsec) tunnels to Microsoft's edge, so devices without the client are still covered for supported traffic.",
   "Licensing and management round out the picture. Global Secure Access is licensed separately, as Microsoft Entra Internet Access and Microsoft Entra Private Access, or together in the Microsoft Entra Suite, on top of a Microsoft Entra ID P1 base. In the Microsoft Entra admin center it has its own section with Connect, Applications, Secure and Monitor pages. Traffic logs and the dashboard show which traffic flowed, which users and devices sent it, and which policies acted on it, which is where you start when a user says an app is unreachable."
  ],
  "analogy": "Picture an office building. A traditional VPN is a master key to the front door: once inside, you can wander every floor. Private Access is a smart badge checked at each room, opening only the rooms you are assigned, with extra checks for the server room. Internet Access is a mailroom that inspects outgoing and incoming packages, refusing deliveries from known bad senders and stopping staff from mailing company files to their personal address. The analogy stops at location: Global Secure Access works wherever the user is, not only inside the building.",
  "mnemonic": "The three forwarding profiles: MPI, Microsoft traffic, Private Access, Internet Access.",
  "terms": [
   [
    "Security service edge (SSE)",
    "Cloud-delivered network security that applies identity-aware policy to user traffic."
   ],
   [
    "Microsoft Entra Internet Access",
    "The Global Secure Access service securing internet, SaaS and Microsoft 365 traffic with filtering and tenant restrictions."
   ],
   [
    "Microsoft Entra Private Access",
    "The Global Secure Access service providing Zero Trust access to private apps without a traditional VPN."
   ],
   [
    "Traffic forwarding profile",
    "A setting (Microsoft, Private Access or Internet Access) that determines which traffic is acquired and tunneled."
   ],
   [
    "Universal tenant restrictions",
    "A control that prevents users from accessing unapproved external tenants using corporate devices."
   ],
   [
    "Private network connector",
    "A lightweight, outbound-only agent installed near private apps that brokers Private Access traffic."
   ],
   [
    "Quick Access",
    "A Private Access configuration giving broad access to defined IP ranges or FQDNs, often used to replace a VPN quickly."
   ]
  ],
  "example": "A manufacturer wants to retire its VPN. It installs private network connectors in the data center, publishes the ERP system and an SSH server as per-app Private Access apps with their own Conditional Access rules, deploys the Global Secure Access client to laptops, and enables the Microsoft traffic profile with universal tenant restrictions so staff can't upload data to personal tenants.",
  "mistakes": [
   [
    "Internet Access is the component that replaces the VPN for on-premises apps.",
    "Private Access, using private network connectors, replaces VPN access to private apps. Internet Access secures internet, SaaS and Microsoft 365 traffic."
   ],
   [
    "Private Access only works for web applications.",
    "Private Access supports TCP and UDP traffic, including file shares, RDP and SSH."
   ],
   [
    "Quick Access is the best way to apply a different Conditional Access policy to each app.",
    "Quick Access is broad. Per-app access creates separate enterprise apps so each can have its own assignments and CA policy."
   ],
   [
    "Private network connectors need inbound firewall ports opened from the internet.",
    "Connectors make outbound-only connections, so no inbound ports are required."
   ]
  ],
  "tryit": [
   [
    "Aurora Textiles wants to retire its VPN within a month, but security also wants stronger controls on the SSH server that manages factory equipment. Users need a file server, an intranet site and the SSH server. How would you configure Private Access?",
    "Install private network connectors near the apps, configure Quick Access for the general file server and intranet ranges to replace the VPN fast, and create a per-app access application for the SSH server with its own user assignment and a CA policy requiring phishing-resistant MFA. Enable the Private Access forwarding profile and deploy the client."
   ],
   [
    "After enabling the Microsoft traffic profile, the security team notices Conditional Access named location policies are behaving as if every user is in the same place. What feature should be checked?",
    "Source IP restoration, which passes each user's original public IP address to Entra ID so named locations and risk detections keep working through Microsoft's edge."
   ]
  ],
  "tip": "Private Access equals VPN replacement for private apps using connectors; Internet Access equals web filtering and tenant restrictions for internet and Microsoft 365. Quick Access is broad; per-app access is granular and supports app-specific Conditional Access. The three profiles are Microsoft, Private Access and Internet Access.",
  "check": [
   [
    "Which Global Secure Access component would replace a VPN for on-premises file servers?",
    "Microsoft Entra Private Access, using private network connectors."
   ],
   [
    "What are the three traffic forwarding profiles?",
    "Microsoft traffic, Private Access and Internet Access."
   ],
   [
    "Why is source IP restoration useful?",
    "It passes the user's original public IP to Entra so Conditional Access named locations and risk detections still work."
   ],
   [
    "What are the two ways traffic can be acquired by Global Secure Access?",
    "The Global Secure Access client on devices, and remote networks that connect branch equipment over IPsec tunnels."
   ]
  ]
 },
 {
  "t": "Managed identities: system-assigned vs user-assigned, and assigning them Azure RBAC roles",
  "hook": "It is Monday morning at Harbor Credit Union, and Priya, the identity administrator, is reading a ticket from the security team. During a code review they found a storage account key pasted into the configuration file of the loan-processing web app. The key has been there for two years, it has never been rotated, and three former contractors had access to the repository. The developers say the app has to read documents from storage somehow, and they want to know what the alternative is. Priya also knows a dozen virtual machines in the batch cluster use the same key. Can she remove every stored secret without breaking the apps, and should each resource get its own identity or share one?",
  "simple": "Apps running in Azure often need to open other Azure services, like a storage account or a vault of secrets. The old way was to paste a password into the app's settings, which can leak. A managed identity gives the Azure resource its own login that Azure looks after, including the password, which nobody ever sees. There are two kinds. A system-assigned identity is built into one resource and disappears when that resource is deleted, like a name badge printed for one employee. A user-assigned identity is created on its own and can be handed to many resources, like a shared team badge kept at the front desk. Either way, the badge opens nothing until you give it permission, which you do with Azure role assignments.",
  "body": [
   "Applications running in Azure constantly need to call other services: reading secrets from Azure Key Vault, pulling files from a storage account, or writing to a database. The traditional approach was to store a password, connection string or access key in code or configuration. That approach has two problems. Secrets leak, through source control, build logs and screenshots, and secrets must be rotated, which people forget. Managed identities solve both problems by giving an Azure resource its own identity in Microsoft Entra ID. Azure creates the credentials behind that identity, stores them, and rotates them automatically. Your code never sees a secret, so there is nothing to leak.",
   "The first type is the system-assigned managed identity. You enable it directly on one resource, such as a virtual machine (VM), an App Service app or an Azure Function, usually by flipping Status to On under the resource's Identity blade. It shares that resource's lifecycle. When the resource is deleted, the identity is deleted with it, and any role assignments that pointed to it are left behind as orphaned entries that show the identity as not found. Each system-assigned identity belongs to exactly one resource and cannot be shared. That one-to-one relationship makes it simple and tidy when a single resource needs its own access and you want cleanup to happen automatically.",
   "The second type is the user-assigned managed identity. It is a standalone Azure resource that you create first, in a resource group like any other resource, and then attach to one or more Azure resources. Its lifecycle is independent, so deleting a VM does not delete the identity. Choose it when several resources need exactly the same permissions, such as a fleet of VMs in a scale set, or when you want to create and authorize the identity before the compute resource exists, which is common in infrastructure-as-code deployments. A single resource can have one system-assigned identity and several user-assigned identities at the same time, and the code chooses which one to use by its client ID.",
   "It helps to know what a managed identity really is. Behind the scenes it is a special kind of service principal in Entra ID. You can find it in the Entra admin center under Enterprise applications by changing the Application type filter to Managed Identities. You will see its object (principal) ID and its application (client) ID, but no Certificates and secrets page, because you never manage its credentials. Managed identities are available only to Azure resources and Azure Arc-enabled servers. A workload running in another cloud or in a third-party pipeline cannot use one directly; that is where workload identity federation or an app registration comes in.",
   "A new managed identity has no permissions at all. Enabling it only creates the identity; you must still grant access. For Azure resources you use Azure role-based access control (RBAC). Assign a role such as Storage Blob Data Reader or Key Vault Secrets User to the identity at the narrowest suitable scope: a single resource, a resource group or a subscription. Scope matters, because a role granted at subscription level applies to every matching resource underneath it. In the portal, open the target resource, select Access control (IAM, identity and access management), choose Add role assignment, pick the role, and select Managed identity as the member type before picking the identity. With the Azure command-line interface (CLI) the same assignment looks like this:",
   "```bash\naz role assignment create \\\n  --assignee <principal-id-of-identity> \\\n  --role \"Storage Blob Data Reader\" \\\n  --scope /subscriptions/<sub-id>/resourceGroups/rg-app/providers/Microsoft.Storage/storageAccounts/stapp01\n```",
   "Notice the difference between management-plane and data-plane roles in that example. A role such as Contributor lets the identity manage the storage account itself, but reading blob contents requires a data-plane role such as Storage Blob Data Reader. Exam questions often hinge on picking the data role rather than a broad management role, and on choosing the resource scope rather than the subscription.",
   "Inside the resource, code requests a token from a local identity endpoint that only the resource can reach, usually through an software development kit (SDK) class such as DefaultAzureCredential, and then presents that token to the target service. No password is ever typed or stored. Two built-in roles control who can work with user-assigned identities: Managed Identity Contributor lets an administrator create, update and delete them, while Managed Identity Operator lets someone attach an existing user-assigned identity to a resource. Managed identities can also be granted Microsoft Graph application permissions, for example to read directory data, but that assignment is done with PowerShell or the Graph application programming interface (API), not through the portal's API permissions page, because a managed identity has no app registration to edit.",
   "Put together, the decision is straightforward. If one resource needs its own access and the identity should vanish with it, enable a system-assigned identity. If many resources share permissions, or the identity must exist before or after the resource, create a user-assigned identity. In both cases grant least-privileged Azure RBAC roles at the smallest scope, and remove the old secrets once the identity works."
  ],
  "analogy": "A system-assigned managed identity is like a hotel key card printed for one guest's stay: it works only for that guest and is voided automatically at checkout. A user-assigned identity is like a staff key card kept by the housekeeping manager, handed to whichever cleaners are on shift, and still valid after any one cleaner leaves. In both cases, the card opens only the doors the front desk programmed it for. The analogy stops at the card itself: with a managed identity, nobody ever holds or copies the underlying secret.",
  "terms": [
   [
    "Managed identity",
    "An automatically managed Microsoft Entra identity for an Azure resource, with no credentials for you to store or rotate."
   ],
   [
    "System-assigned managed identity",
    "An identity enabled on one resource, tied to its lifecycle and deleted with it."
   ],
   [
    "User-assigned managed identity",
    "A standalone identity resource that can be attached to multiple Azure resources and has its own lifecycle."
   ],
   [
    "Azure RBAC role assignment",
    "Granting a role to a principal at a scope such as a resource, resource group or subscription."
   ],
   [
    "DefaultAzureCredential",
    "An Azure SDK credential class that automatically uses a managed identity when the code runs in Azure."
   ],
   [
    "Managed Identity Operator",
    "A built-in role that allows assigning existing user-assigned identities to resources."
   ],
   [
    "Managed Identity Contributor",
    "A built-in role that allows creating, updating and deleting user-assigned identities."
   ]
  ],
  "example": "Twenty VMs in a scale set process files from one storage account. Instead of enabling twenty system-assigned identities and twenty role assignments, the admin creates one user-assigned managed identity, grants it Storage Blob Data Reader on that storage account only, and attaches it to the scale set. New instances inherit access automatically.",
  "mistakes": [
   [
    "Enabling a managed identity automatically gives the resource access to the services it needs.",
    "A new managed identity has no permissions. You must assign Azure RBAC roles (or Graph application permissions) before it can access anything."
   ],
   [
    "Use system-assigned identities for a scale set or many VMs that share access.",
    "System-assigned identities are one per resource and cannot be shared. A user-assigned identity attached to all the resources means one identity and one role assignment."
   ],
   [
    "Grant the identity Contributor on the subscription so it can read blobs.",
    "Contributor is a management-plane role at a broad scope. Reading blob data needs a data-plane role such as Storage Blob Data Reader, scoped to the storage account."
   ],
   [
    "Managed identities can be used by workloads running anywhere, such as an on-premises build server or another cloud.",
    "Managed identities are available only to Azure resources and Azure Arc-enabled servers. Outside workloads use workload identity federation or app registration credentials."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union is building an Azure Function that will read one Key Vault's secrets. The function is short-lived: the team plans to delete it when a migration project ends in six months, and they want no leftover identities. Which managed identity type should Priya enable, and what permission should she grant?",
    "A system-assigned managed identity, because it serves one resource and is deleted automatically with the function. She should assign the Key Vault Secrets User role scoped to that single key vault, not to the resource group or subscription."
   ],
   [
    "The infrastructure team wants to grant storage access in a template before the VMs are deployed, and the VMs are rebuilt every month. What should they use?",
    "A user-assigned managed identity. It can be created and given its role assignment before any VM exists, and it survives each rebuild, so the role assignment does not need to be recreated."
   ]
  ],
  "tip": "Shared identity across many resources or a lifecycle independent of the resource means user-assigned; a single resource whose identity should disappear with it means system-assigned. Permissions come from Azure RBAC at the smallest scope.",
  "check": [
   [
    "What happens to a system-assigned managed identity when its VM is deleted?",
    "It is deleted automatically along with the VM."
   ],
   [
    "Which managed identity type should you use for many VMs that need identical access?",
    "A user-assigned managed identity attached to all of them."
   ],
   [
    "How do you let a managed identity read blobs in one storage account?",
    "Assign it an Azure RBAC role such as Storage Blob Data Reader scoped to that storage account."
   ],
   [
    "Which role does an administrator need to attach an existing user-assigned identity to a VM?",
    "Managed Identity Operator; Managed Identity Contributor is for creating and managing the identities themselves."
   ]
  ]
 },
 {
  "t": "Service principals and app registrations: application objects, client secrets vs certificates vs federated credentials",
  "hook": "At 2:15 a.m. Marcus, on call for Cedar Ridge Logistics, gets paged: the nightly deployment from the source-control pipeline has started failing with an authentication error. He opens the Microsoft Entra admin center and finds the deployment app twice, once under App registrations and once under Enterprise applications, with different object IDs. The client secret the pipeline uses expired an hour ago. His first instinct is to generate a new secret valid for as long as the portal allows and paste it into the pipeline settings. A colleague's message the next morning asks a harder question: why does the pipeline need a stored secret at all, and which of those two objects should Marcus have changed?",
  "simple": "When a company registers an app with Microsoft Entra ID, two records appear. The first is the master description of the app, kept in the company that built it, like a product's design blueprint. The second is a local copy in each company that uses the app, like a product installed in each customer's office, and that local copy is what receives permissions. For an app to sign in by itself, with no person present, it needs a credential. A client secret is like a password: easy, but easy to leak. A certificate is like a signed letter that proves who you are without handing over your key. A federated credential means the app trusts another system's badge, so no password is stored anywhere.",
  "body": [
   "When a developer registers an app in Microsoft Entra ID, two related objects appear, and SC-300 expects you to tell them apart. The first is the application object, the global definition of the app. It lives only in the app's home tenant, the tenant where it was registered, and it describes the app: its display name, its application (client) ID, its redirect URIs (uniform resource identifiers), the API (application programming interface) permissions it requests, the app roles it exposes, and its credentials. You manage application objects under App registrations in the admin center.",
   "The second is the service principal, the local representation of the app in a specific tenant. The service principal is what actually receives things: consented permissions, Azure role-based access control (RBAC) role assignments, user and group assignments, and Conditional Access targeting. You manage service principals under Enterprise applications. A single-tenant app has one application object and one service principal, both in its home tenant. A multitenant app has one application object in its home tenant and a service principal in every tenant that has consented to it. A useful way to remember it: the application object is a class or template, and each service principal is an instance created from it.",
   "There are also other kinds of service principals. A managed identity is represented by a service principal of type managed identity, with no application object you can edit. Legacy service principals exist for apps created before app registrations, and some Microsoft first-party apps appear as service principals whose application objects live in Microsoft's own tenant. For the exam, the app registration and enterprise application pair is the one tested most often.",
   "To authenticate as itself, for example in a daemon or background service that uses the OAuth 2.0 client credentials flow, an app needs a credential. There are three kinds, and they differ sharply in risk. A client secret is a generated string that works like a password. It is easy to use, but it is also easy to leak through source code, configuration files or logs, and it expires. When you create one in the portal you pick a duration, with options reaching up to about two years, and the value is shown only once, right after creation.",
   "A certificate credential is stronger. You upload only the public key to the app registration, under Certificates and secrets, while the private key stays with the app, ideally in a protected store such as Azure Key Vault. When the app signs in, it proves possession of the private key by signing a short assertion. Nothing reusable crosses the network, so an attacker who captures traffic or reads a log gains nothing they can replay. That is why Microsoft recommends certificates over client secrets for production apps.",
   "Federated identity credentials go further and remove stored credentials entirely. This approach, called workload identity federation, configures the app registration, or a user-assigned managed identity, to trust tokens issued by an external identity provider. Each federated credential is defined by three values: the issuer (who issues the token), the subject (which workload, such as a specific repository and branch or a specific Kubernetes service account) and the audience. A source-control workflow, a Kubernetes service account or a workload in another cloud presents its own short-lived token from its provider and exchanges it for a Microsoft Entra access token. There is no secret to rotate, store or steal, and the trust is scoped to exactly the workload you named.",
   "Good credential hygiene follows naturally from these differences. Prefer managed identities for workloads running in Azure. Use federated credentials for workloads outside Azure that support them. Use certificates next, and use client secrets only when nothing else works, with short lifetimes. Assign owners to every app registration so someone is responsible for renewals, and monitor credentials that are about to expire before they break production at night. Remember that changing credentials happens on the application object, under App registrations, while permissions and assignments live on the service principal.",
   "One more control is worth knowing. App instance property lock, configured on the app registration, prevents sensitive properties of a multitenant app's service principals in other tenants, such as credentials, from being modified. Without it, an attacker who gains admin rights in one customer tenant could add their own credential to your app's service principal there and sign in as it. Locking those properties keeps credentials under the control of the home tenant."
  ],
  "analogy": "Think of a franchise restaurant. The application object is the franchise's master recipe book, kept at headquarters. Each service principal is a local restaurant built from it, with its own staff permissions and health inspections. For credentials, a client secret is a door code anyone who overhears it can use, a certificate is a personal key that proves you hold it without ever being handed over, and a federated credential is headquarters agreeing to honor a trusted partner's employee badge. The analogy breaks slightly because one tenant can host both the recipe book and a restaurant.",
  "mnemonic": "Credential preference, best to last: My First Car Stalled. Managed identity, Federated credential, Certificate, Secret.",
  "terms": [
   [
    "Application object",
    "The global definition of an app in its home tenant, managed under App registrations."
   ],
   [
    "Service principal",
    "The local instance of an app in a tenant, which receives permissions and assignments; managed under Enterprise applications."
   ],
   [
    "Home tenant",
    "The tenant where an app was registered and where its application object lives."
   ],
   [
    "Client secret",
    "A password-like string used by an app to authenticate; simple but prone to leaks and expiry."
   ],
   [
    "Certificate credential",
    "A public key registered on the app whose private key signs authentication assertions; preferred over secrets."
   ],
   [
    "Federated identity credential",
    "A trust with an external identity provider, defined by issuer, subject and audience, that lets a workload exchange its token for an Entra token without secrets."
   ],
   [
    "App instance property lock",
    "A setting that stops sensitive properties, such as credentials, from being changed on a multitenant app's service principals in other tenants."
   ]
  ],
  "example": "A team deploys to Azure from GitHub Actions using a client secret stored in repository settings. After a secret leaks in a build log, the admin replaces it with a federated identity credential that trusts GitHub's issuer for the main branch of that repository only, deletes the secret, and the pipeline keeps working with no stored credential.",
  "mistakes": [
   [
    "Permissions and Conditional Access are configured on the app registration.",
    "They apply to the service principal, managed under Enterprise applications. The app registration holds the definition, requested permissions and credentials."
   ],
   [
    "A multitenant app used by many customers has an application object in each customer tenant.",
    "There is one application object, in the home tenant only. Each consenting tenant gets its own service principal."
   ],
   [
    "Client secrets and certificates are equally secure because both expire.",
    "A secret is a shared value sent to authenticate and can be replayed if leaked. A certificate's private key never leaves the app; it only signs an assertion."
   ],
   [
    "Federated credentials require storing the external provider's secret in Entra ID.",
    "No secret is stored. Entra trusts tokens matching a configured issuer, subject and audience, and exchanges them for its own access token."
   ]
  ],
  "tryit": [
   [
    "Cedar Ridge Logistics runs a Kubernetes cluster in another cloud that must write to an Azure storage account. Security policy forbids long-lived secrets in the cluster. The team asks Marcus whether to create a client secret with a short expiry or use something else. What should he recommend?",
    "A federated identity credential on an app registration or user-assigned managed identity, trusting the cluster's issuer and the specific Kubernetes service account as the subject. The workload exchanges its own token for an Entra token, so there is no secret at all, which a short-lived secret would not achieve."
   ]
  ],
  "tip": "App registrations show application objects; Enterprise applications show service principals. For pipelines in GitHub or Kubernetes with no secrets allowed, choose federated credentials. Between secrets and certificates, certificates are the more secure choice.",
  "check": [
   [
    "A multitenant app is used by five customer tenants. How many application objects and service principals exist?",
    "One application object in the home tenant and a service principal in each tenant where it is used (six if the home tenant also has one)."
   ],
   [
    "Which credential type needs no stored secret for a GitHub Actions workflow?",
    "A federated identity credential (workload identity federation)."
   ],
   [
    "Why are certificates preferred over client secrets?",
    "The private key never leaves the app and isn't transmitted; the app signs an assertion, so there is no reusable shared secret to leak."
   ],
   [
    "Under which admin center page do you add a new certificate credential to an app?",
    "Under App registrations, on the app's Certificates and secrets page, because credentials belong to the application object."
   ]
  ]
 },
 {
  "t": "API permissions: delegated vs application permissions, user consent settings, admin consent and the admin consent workflow",
  "hook": "A help-desk ticket lands in your queue at Bluewater Medical Group: Dr. Lena Ortiz tried a new calendar-scheduling app and got a screen saying she needs admin approval, and she is annoyed. In the same hour, the security team forwards an alert about a different user who happily clicked Accept on an app called Document Viewer Pro that asked to read his mail and keep access to it. One user is blocked when she should perhaps be allowed, and another was allowed when he should have been blocked. Both stories come down to consent: who is allowed to approve what an app can do. How should you set it up so neither ticket happens again?",
  "simple": "When you install an app on your phone, it asks things like may I read your contacts. Apps that connect to a company's Microsoft account work the same way, and saying yes is called consent. Some apps act on your behalf while you are signed in, so they can only reach what you can reach. Other apps run by themselves with nobody signed in, and those can often reach everyone's data, so only an administrator may approve them. The company decides how much ordinary users may approve on their own. If a user is not allowed, a request process lets them ask an administrator, who reviews the app and approves or blocks it. This stops people from being tricked into giving a bad app access.",
  "body": [
   "Apps that call application programming interfaces (APIs) such as Microsoft Graph need permissions, and Microsoft Entra ID grants those permissions through consent. Understanding the two permission types, and who is allowed to consent to each, is one of the most heavily tested parts of SC-300. It is also a real security issue. In an illicit consent grant attack, an attacker publishes a convincing app and tricks users into consenting to it, which hands the attacker ongoing access to their data without ever stealing a password.",
   "The first type is the delegated permission. Delegated permissions are used when an app acts on behalf of a signed-in user. The app can do only what both the permission allows and the user is allowed to do; the effective access is the overlap of the two. If an app has the delegated Files.Read.All permission and Ana signs in, it can read only files Ana herself can read, not every file in the tenant. Delegated permissions are also called scopes, and they appear in access tokens in the scp claim.",
   "The second type is the application permission, sometimes called an app role or an app-only permission. Application permissions are used when an app runs without a signed-in user, such as a background service or a nightly sync job using the client credentials flow. The app acts as itself, with the full reach of the permission across the whole tenant. User.Read.All as an application permission means reading every user in the directory. Because of that reach, application permissions always require admin consent, and users can never consent to them. They appear in access tokens in the roles claim.",
   "Delegated permissions vary in impact. Some are low impact, such as User.Read, which lets an app sign the user in and read their own profile, and users may be allowed to consent to these for themselves. Others are marked as requiring admin consent because of how far they reach, such as reading every user's full profile. An administrator with an appropriate role can grant tenant-wide admin consent. Cloud Application Administrator and Application Administrator can grant consent for most permissions, while granting application permissions to Microsoft Graph requires Privileged Role Administrator. Consent is granted from the app registration's API permissions page with the Grant admin consent for the tenant button, or from the enterprise application's Permissions page. Tenant-wide consent means individual users will not be prompted.",
   "User consent settings decide what ordinary users can approve on their own. You find them under Enterprise applications, then Consent and permissions. There are three main choices. Do not allow user consent means every app needs an administrator. Allow user consent for apps from verified publishers, for selected permissions, is the balance Microsoft recommends: users can consent only to permissions you have classified as low impact, and only for apps whose publisher has been verified with Microsoft. The third choice allows users to consent to all apps for any permission that does not require admin consent, which is the riskiest option and the one that makes illicit consent grants easiest. Group owner consent settings are separate and control whether group owners can consent to apps that access their group's data.",
   "Locking down consent creates a new problem: users get stuck. The admin consent workflow gives them a safe way forward. When you enable it in the same Consent and permissions area, a user who reaches an app that needs admin approval sees a screen that lets them submit a request with a justification instead of a dead end. Designated reviewers, which can be users, groups or roles, receive an email notification and review pending requests on the Admin consent requests page. There they can approve, deny or block the app, where block also prevents future requests. Requests expire after a configurable number of days, and a reviewer still needs an admin role that can actually grant the requested permissions; being named as a reviewer alone is not enough.",
   "When something goes wrong, you investigate the consent trail. Each enterprise application's Permissions page shows admin-consented and user-consented permissions separately, including which users granted them. The audit log records Consent to application events, with the user, the app and the permissions involved, and you can send these logs to a workspace for alerting. Removing a suspicious app's service principal, or revoking its permissions and the user's sessions, stops further access. Microsoft Defender for Cloud Apps app governance adds behavioral monitoring of consented apps.",
   "For exam questions, read carefully for the presence of a signed-in user. No user means application permissions and admin consent. A user present means delegated permissions, limited by that user's own rights. And when users are blocked and need a way to ask, the answer is the admin consent workflow, not loosening user consent to allow all apps."
  ],
  "analogy": "Delegated permission is like giving a personal assistant your office key card: they can enter only the rooms you can enter, and only while acting for you. Application permission is like issuing the cleaning company a master key that opens every office at night with nobody present, which is why only building management, the admin, may approve it. The admin consent workflow is the front-desk request form for a key you cannot issue yourself. The analogy stops working in one place: a consented app keeps its access until it is revoked, not just for one visit.",
  "terms": [
   [
    "Delegated permission",
    "A permission used by an app acting on behalf of a signed-in user, limited by that user's own access; appears in the scp claim."
   ],
   [
    "Application permission",
    "An app-only permission used without a signed-in user; always requires admin consent and appears in the roles claim."
   ],
   [
    "Admin consent",
    "Tenant-wide approval by an authorized admin that grants an app its requested permissions for all users."
   ],
   [
    "User consent settings",
    "Tenant settings deciding which apps and permissions users can approve for themselves."
   ],
   [
    "Admin consent workflow",
    "A process letting users request admin approval for apps they can't consent to, reviewed by designated reviewers."
   ],
   [
    "Verified publisher",
    "An app publisher whose identity has been verified with Microsoft, a condition in the recommended consent setting."
   ],
   [
    "Illicit consent grant",
    "An attack that tricks users into granting permissions to a malicious app, giving it access to their data."
   ]
  ],
  "example": "Contoso sets user consent to allow only verified publishers and low-impact permissions, and enables the admin consent workflow with the security team as reviewers. When a user tries a new scheduling app that wants to read all calendars, she submits a request; the reviewer checks the publisher and permissions, then grants admin consent for the tenant.",
  "mistakes": [
   [
    "A user can consent to an application permission if it seems harmless.",
    "Application permissions always require admin consent. Users can consent only to delegated permissions that do not require admin consent, and only if user consent settings allow it."
   ],
   [
    "An app with a delegated permission such as Files.Read.All can read every file in the tenant.",
    "Delegated access is limited to what the signed-in user can access. The app gets the overlap of the permission and the user's rights."
   ],
   [
    "To stop users being blocked by consent prompts, allow users to consent to all apps.",
    "That is the riskiest setting. The right answer is the admin consent workflow, which lets users request approval while keeping control with reviewers."
   ],
   [
    "Being a designated reviewer in the admin consent workflow is enough to grant consent.",
    "Reviewers also need an admin role able to grant the requested permissions; otherwise they can only deny or block."
   ]
  ],
  "tryit": [
   [
    "Bluewater Medical Group currently lets users consent to any app for any permission not needing admin consent. After the Document Viewer Pro incident, the CISO wants users to keep using low-risk, reputable apps without opening tickets, while anything broader goes through security. Which settings do you change?",
    "Set user consent to allow apps from verified publishers for selected permissions, classify only low-impact permissions such as User.Read as allowed, and enable the admin consent workflow with the security team as reviewers. Then review the existing app's Permissions page and audit log, and remove or revoke it."
   ],
   [
    "A nightly payroll export service needs to read all users' profiles with no one signed in. Which permission type does it need and who can grant it?",
    "The application permission User.Read.All, which requires admin consent. Because it is a Microsoft Graph application permission, a Privileged Role Administrator, or a Global Administrator, must grant it."
   ]
  ],
  "tip": "No signed-in user means application permissions and admin consent. If users are blocked from consenting and need a way to ask, the answer is the admin consent workflow, not changing user consent to allow all apps.",
  "check": [
   [
    "An app with the delegated Mail.Read permission is used by Ben. Whose mail can it read?",
    "Only Ben's mail (and any mailbox Ben himself has access to), because delegated access is limited by the signed-in user's permissions."
   ],
   [
    "Which consent is required for application permissions?",
    "Admin consent; users can never consent to application permissions."
   ],
   [
    "Which user consent setting does Microsoft recommend?",
    "Allow user consent for apps from verified publishers, for selected (low-impact) permissions."
   ]
  ]
 },
 {
  "t": "App roles, the roles claim, and 'Assignment required' on enterprise applications",
  "hook": "Jonah, the identity administrator at Northfield Community College, gets an uncomfortable email from internal audit. A student worker, hired only to scan paper forms, signed in to the new grade-approval web app last week and could see the approval queue. Nobody assigned him to the app. The developers insist the app checks roles before letting anyone approve, and that is true: he could not approve anything. But the auditor's question is simple. Why could someone with no business reason sign in to that app at all, and how do you prove that only faculty can approve grades? Jonah opens the enterprise application and starts looking at two settings he has never touched.",
  "simple": "Many apps need to know what kind of user you are: a reader, an editor or an approver. Instead of the app keeping its own list, the developer can create named roles, like Approver, in Microsoft Entra ID, and an administrator puts people or groups into those roles. When someone signs in, their sign-in pass includes a list of their roles, and the app reads it to decide what they may do. Separately, a switch called Assignment required decides whether anyone in the company can sign in at all, or only people who were added to the app. Think of a concert: the ticket check at the gate decides who gets in, and the wristband color decides who can go backstage.",
  "body": [
   "Many applications need their own authorization rules, such as telling readers apart from approvers in an expense app. Developers could build a separate user database for this, but then they must keep it in sync with HR changes and secure it themselves. A better approach is to define app roles in Microsoft Entra ID and let administrators assign users and groups to them. The app then reads the user's roles from the token Entra issues and makes its decisions from there. This keeps authorization data in the directory, where it can be governed and audited.",
   "App roles are defined on the app registration, which is the application object. You add them on the App roles page or in the manifest's appRoles collection. Each role has a display name, a value, a description and allowed member types. The value is the exact string that appears in tokens, such as Expense.Approver, so developers code against it. Allowed member types can be Users/Groups, Applications, or both. Roles whose allowed member type is Applications become application permissions that other apps can request on their application programming interface (API) permissions page. Those require admin consent, and this is exactly how a custom API exposes app-only permissions to daemon clients.",
   "Assignments happen in a different place: on the enterprise application, which is the service principal, under Users and groups. You select Add user/group, choose a user or group, and pick one of the app's roles. When the user signs in, Entra adds a roles claim to the ID token or access token, containing the values of every role they are assigned, either directly or through a group they belong to. The app checks this claim, for example allowing the approve action only when the roles claim contains Expense.Approver. If an app defines no roles, users assigned to it receive the built-in Default Access role, which does not appear as a meaningful value in the roles claim.",
   "Two licensing and group rules are worth memorizing. Assigning groups, rather than individual users, to enterprise applications and app roles requires Microsoft Entra ID P1 or higher. And nested group membership is not honored for app role assignment. If the Approvers group is assigned the role and the Deans group is a member of Approvers, the members of Deans do not get the role; only direct members of the assigned group do. Exam questions like to hide this detail in a scenario where one person mysteriously lacks access.",
   "The roles claim is different from the groups claim. The groups claim lists the object IDs of groups the user belongs to, which are opaque identifiers that differ between tenants. For users in many groups, the token hits an overage limit, and instead of a full list the app receives a pointer telling it to query Microsoft Graph, which adds code and permissions. App roles, by contrast, are short, app-specific names that are meaningful to the developer and portable across tenants, so a multitenant app can rely on the same role values everywhere. Microsoft generally recommends app roles for application authorization for these reasons.",
   "Assignment required is a property on the enterprise application's Properties page, stored as appRoleAssignmentRequired. When it is set to No, which is the default for many apps, any user in the tenant can sign in and receive a token, although they will not have any app roles. That is how the student worker in the opening story got in. When it is set to Yes, only users and groups assigned to the app, and client apps granted its app roles, can get a token. Everyone else is blocked at sign-in with an error stating that the user is not assigned to a role for the application, which you will also see in the sign-in logs. Turning it on is a simple and powerful way to restrict who can use an app.",
   "A related property is easy to confuse. Visible to users controls whether the app's tile appears in the My Apps portal. Setting it to No hides the tile but does not block access, and setting it to Yes shows the tile without granting anything. It is a convenience setting, not a security control.",
   "For exam scenarios, think in layers. Assignment required, together with user and group assignments, controls who can sign in at all. App roles control what users can do inside the app once they are in. Conditional Access controls how they must sign in, such as requiring multifactor authentication or a compliant device. A good answer to an access question usually names the right layer."
  ],
  "analogy": "Picture a music festival. Assignment required is the ticket check at the gate: with it off, anyone from town can wander in; with it on, only people on the guest list enter. App roles are the colored wristbands handed out at the gate, and the staff inside check the wristband color before letting someone backstage. Visible to users is just whether the festival appears on the town's events poster. Where the analogy weakens: a wristband given to a group does not pass down to a subgroup, because nested groups do not inherit app roles.",
  "mnemonic": "Three layers, gate to stage: Who, What, How. Who signs in is Assignment required, What they can do is app roles, How they sign in is Conditional Access.",
  "terms": [
   [
    "App role",
    "A named role defined on an app registration that can be assigned to users, groups or applications."
   ],
   [
    "Roles claim",
    "A token claim listing the app role values assigned to the signed-in user or calling app."
   ],
   [
    "Groups claim",
    "A token claim listing the object IDs of the user's groups, subject to an overage limit."
   ],
   [
    "Assignment required",
    "An enterprise app property that, when Yes, allows only assigned users, groups and apps to get tokens."
   ],
   [
    "Allowed member types",
    "The app role setting deciding whether a role can be assigned to users and groups, applications, or both."
   ],
   [
    "Visible to users",
    "An enterprise app property controlling whether the app appears in My Apps, without affecting access."
   ]
  ],
  "example": "An internal expense app defines two app roles, Expense.Submitter and Expense.Approver. The admin sets Assignment required to Yes, assigns the All Employees group to Submitter and the Finance Managers group to Approver. A contractor not in either group gets an error at sign-in, and a manager's token carries both role values.",
  "mistakes": [
   [
    "Setting Visible to users to No blocks unassigned users from the app.",
    "It only hides the tile in My Apps. To block unassigned users, set Assignment required to Yes and assign the allowed users and groups."
   ],
   [
    "App roles are assigned on the app registration's App roles page.",
    "Roles are defined on the app registration but assigned on the enterprise application under Users and groups."
   ],
   [
    "Members of a group nested inside an assigned group receive the app role.",
    "Nested membership is not honored for app role assignment. Only direct members of the assigned group get the role."
   ],
   [
    "The groups claim is the recommended way to authorize users inside an app.",
    "Group object IDs are tenant-specific and can hit the overage limit. Microsoft generally recommends app roles, which are meaningful and portable."
   ]
  ],
  "tryit": [
   [
    "At Northfield Community College, the grade-approval app defines Grade.Viewer and Grade.Approver roles. Assignment required is No. Faculty must approve, department staff must view, and nobody else should sign in. The Faculty group contains a nested group called Adjunct Faculty. What should Jonah configure?",
    "Set Assignment required to Yes, assign Department Staff to Grade.Viewer and Faculty to Grade.Approver. Because nested groups are not honored, he must also assign Adjunct Faculty directly to Grade.Approver, or adjuncts will be blocked at sign-in."
   ]
  ],
  "tip": "If a question says any user can sign in to an app but only certain users should, the answer is Assignment required set to Yes plus user or group assignments. Remember nested groups don't receive app role assignments.",
  "check": [
   [
    "What happens when Assignment required is No and an unassigned user signs in?",
    "The user can sign in and receives a token, just without any app roles."
   ],
   [
    "Where are app roles defined, and where are users assigned to them?",
    "Defined on the app registration (application object); assigned on the enterprise application (service principal) under Users and groups."
   ],
   [
    "A user is in a group that is nested inside a group assigned to an app role. Does the user get the role?",
    "No. App role assignment through groups applies only to direct members of the assigned group."
   ],
   [
    "Does setting Visible to users to No prevent sign-in?",
    "No. It only hides the app tile in My Apps; Assignment required controls access."
   ]
  ]
 },
 {
  "t": "Enterprise application single sign-on: SAML (Identifier, Reply URL, signing certificate) and OpenID Connect",
  "hook": "It is 8:05 a.m. at Pinecrest Insurance, and the new benefits portal launched five minutes ago. Sofia, the identity engineer, watches her inbox fill. Users click the portal tile in My Apps, see a Microsoft sign-in page, enter their credentials, and then land on an error page that says the reply URL in the request does not match the reply URLs configured for the application. The vendor swears their side is fine. Sofia has the enterprise application's SAML-based Sign-on page open, with its Identifier, Reply URL and a signing certificate that is due to expire next spring. Which field is wrong, and how will she avoid another outage when that certificate rolls over?",
  "simple": "Single sign-on means you sign in once with your work account and then open many apps without typing more passwords. To make that work, Microsoft Entra ID and the app need to trust each other. With an older method called SAML, Entra writes a signed note that says this is Sofia, and sends it to a specific address at the app. The app must recognize its own name in the setup, the note must go to the correct address, and the app checks the signature using a certificate, which is like a wax seal it knows. With a newer method called OpenID Connect, Entra gives the app a small digital ID card that says who the user is. Most errors come from a wrong name, a wrong address or an expired seal.",
  "body": [
   "Single sign-on (SSO) lets users sign in once with their Microsoft Entra account and reach many applications without separate passwords. It improves security, because users have fewer passwords to reuse, and it gives administrators one place to apply Conditional Access and to see sign-in logs. For software as a service (SaaS) apps, you typically add the app from the Microsoft Entra application gallery, which creates an enterprise application with templates for the vendor's settings, and then configure SSO on its Single sign-on page. The two main federated protocols are Security Assertion Markup Language (SAML) 2.0 and OpenID Connect (OIDC). Two other options exist: password-based SSO, where Entra securely stores credentials and replays them into the app's sign-in form, and linked SSO, which simply adds a tile in My Apps that points to an app using another identity provider.",
   "In SAML, Microsoft Entra ID plays the identity provider (IdP), which authenticates the user, and the app plays the service provider (SP), which trusts the IdP's statement. The SAML-based Sign-on page is divided into numbered sections that you will meet in labs. Basic SAML Configuration holds the Identifier, also called the Entity ID, which is a unique name for the SP that must exactly match what the app expects. It also holds the Reply URL, also called the Assertion Consumer Service (ACS) URL, which is the app endpoint where Entra posts the SAML response after authenticating the user. Optional fields include the Sign on URL, used when the user starts at the app (SP-initiated sign-in), the Relay State, which tells the app where to send the user afterward, and the Logout URL.",
   "The Attributes and Claims section defines what goes into the SAML assertion. The NameID, the unique user identifier the app uses to match its own account, defaults to user.userprincipalname. You can change its source or format, for example to email address, if the app expects that. You can add claims such as email, given name or department, and you can apply transformations, such as extracting part of a value or joining two attributes. Group claims can be added too, but large groups lists can overflow, so filtering them is common.",
   "The SAML Signing Certificate section holds the certificate Entra uses to sign the assertion, so the app can verify it came from your tenant and was not altered. You download the certificate, as Base64 or raw, or the Federation Metadata XML (Extensible Markup Language) file that bundles it with the endpoints, and upload it to the app's admin settings along with the Login URL and Microsoft Entra Identifier from the Set up section. Signing certificates expire, typically after about three years for gallery apps, so set notification email addresses to receive warnings before expiry. To renew without an outage, create the new certificate in Entra, give it to the app first, and only then make it active. Activating first breaks sign-in until the vendor catches up.",
   "Most SAML sign-in errors after setup come from a short list of causes. A mismatched Reply URL produces an error that the reply address does not match. A mismatched Identifier produces an error that the app with that identifier was not found in the directory, or the app rejects the audience. A wrong NameID format or value means the app cannot find the user's account. An expired or mismatched certificate makes the app reject the signature. The Test single sign-on button on the configuration page, together with the My Apps Secure Sign-in Extension, can capture the SAML request and decode the error into a suggested fix.",
   "OpenID Connect is the modern alternative. It is built on OAuth 2.0 and uses JSON Web Tokens (JWTs). The app redirects the user to Entra and requests an ID token, which tells the app who the user is, and often an access token as well, which lets the app call APIs such as Microsoft Graph. Configuration lives mostly on the app registration rather than in SAML fields: redirect URIs, the application (client) ID, credentials if the app is a confidential client, and token configuration for optional claims. Gallery OIDC apps are usually added by signing in to the vendor's site and consenting, not by filling in fields. OIDC is the default for new development, especially mobile and single-page apps, while SAML remains common for established enterprise SaaS.",
   "Whichever protocol you use, the enterprise application is still the control point. It decides who can use the app through Assignment required and user or group assignment, whether it appears in My Apps, whether automatic provisioning creates accounts, and which Conditional Access policies apply. The sign-in logs record each SSO attempt with the application name and any error code, so you can filter by app when troubleshooting."
  ],
  "analogy": "A SAML sign-in is like a notary sending a sealed letter of introduction. The Identifier is the recipient's exact name on the envelope, the Reply URL is the mailing address, and the signing certificate is the notary's wax seal that the recipient has on file. A wrong name or address means the letter is refused or lost, and a new seal must be shown to the recipient before the notary starts using it. OIDC is closer to handing someone a laminated ID card directly, though both still depend on trust set up in advance.",
  "terms": [
   [
    "Identifier (Entity ID)",
    "The unique name of a SAML service provider that must match between Entra and the app."
   ],
   [
    "Reply URL (ACS URL)",
    "The app endpoint where Entra ID posts the SAML response after sign-in."
   ],
   [
    "Sign on URL",
    "The app address used to start SP-initiated sign-in."
   ],
   [
    "SAML signing certificate",
    "The certificate Entra uses to sign SAML assertions, which the app uses to verify them."
   ],
   [
    "NameID",
    "The SAML claim that uniquely identifies the user to the app, by default the user principal name."
   ],
   [
    "OpenID Connect",
    "An identity protocol on top of OAuth 2.0 that issues ID tokens in JWT format to identify users."
   ],
   [
    "ID token",
    "The OIDC token that tells an app who the signed-in user is."
   ]
  ],
  "example": "Contoso adds a gallery HR app with SAML. The admin enters the vendor's Entity ID and Reply URL, keeps UPN as the NameID, downloads the Base64 certificate and gives it with the Login URL to the vendor's settings page. Three years later an expiry notification arrives; she creates a new certificate, uploads it to the vendor, activates it, and nobody notices the change.",
  "mistakes": [
   [
    "When renewing a SAML signing certificate, make the new certificate active in Entra first, then send it to the vendor.",
    "That breaks sign-in until the app trusts the new certificate. Create it, give it to the app first, then make it active."
   ],
   [
    "The Reply URL is the address where users start sign-in.",
    "That is the Sign on URL. The Reply URL (ACS URL) is where Entra posts the SAML response."
   ],
   [
    "OIDC apps are configured by filling in the Identifier and Reply URL in Basic SAML Configuration.",
    "OIDC uses the app registration's redirect URIs, client ID and token configuration; SAML fields do not apply."
   ],
   [
    "An access token tells an app who the user is.",
    "The ID token identifies the user to the app. The access token is for calling APIs."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Insurance's benefits portal returns an error that the reply address in the request does not match the configured reply URLs. The vendor's documentation lists an ACS endpoint ending in a path that differs from the one Sofia typed. What should she change, and how can she confirm the fix?",
    "Correct the Reply URL (ACS URL) in Basic SAML Configuration to match the vendor's ACS endpoint exactly, then use Test single sign-on and check the sign-in logs for the app to confirm a successful sign-in."
   ],
   [
    "A user signs in successfully to Entra, but the SaaS app says no matching account was found. Sign-in logs show success. Which setting is most likely wrong?",
    "The NameID (or its format). Entra is sending an identifier, such as the UPN, that does not match how the app stores user accounts, such as by email address."
   ]
  ],
  "tip": "A SAML error saying the reply address doesn't match points to the Reply URL; an app not recognizing the issuer or audience points to the Identifier. Rotate signing certificates by adding the new one to the app before making it active in Entra.",
  "check": [
   [
    "What is the Reply URL in SAML configuration?",
    "The Assertion Consumer Service URL at the app where Entra ID sends the signed SAML response."
   ],
   [
    "Which SAML field must be unique and identify the application to Entra?",
    "The Identifier (Entity ID)."
   ],
   [
    "Which token tells an OIDC app who the user is?",
    "The ID token, a JSON Web Token issued by Entra ID."
   ],
   [
    "What is the correct order for rolling over a SAML signing certificate?",
    "Create the new certificate in Entra, upload it to the app, then make it active in Entra."
   ]
  ]
 },
 {
  "t": "Automatic user provisioning to SaaS apps with SCIM, scoping filters and provisioning logs",
  "hook": "An external auditor at Granite Valley Bank asks Elena, the identity lead, a pointed question: how many people who left the bank in the last year still have active accounts in the customer relationship management (CRM) app? Single sign-on is configured, so former staff cannot sign in through Microsoft Entra ID, but the auditor exported the CRM's own user list and found 47 names that match people in the HR termination report. Some of those accounts still own customer records and API tokens. Help-desk staff create CRM accounts by hand from tickets, and nobody deletes them. Elena knows the CRM supports a provisioning standard. Can she make account creation and removal follow Entra automatically, and how will she prove it worked?",
  "simple": "Signing in with your work account only works if the app already has an account with your name on it. Many companies create those app accounts by hand, and when people leave, the accounts are forgotten. Automatic provisioning fixes this. Microsoft Entra ID talks to the app using a shared language called SCIM and creates, updates or turns off accounts based on who has been given the app. Think of a building where the front desk automatically prints a badge for every new hire on the guest list and voids it the day they leave. You can also add filters, such as only full-time employees, and a log shows every badge created, changed or voided, with reasons for any failure.",
  "body": [
   "Single sign-on lets users sign in to a software as a service (SaaS) app, but many apps also need an account to exist inside the app first, with the right name, email and role. Creating and deleting those accounts by hand is slow, error-prone and leaves orphaned accounts when people change jobs or leave. Automatic user provisioning in Microsoft Entra ID creates, updates and disables or deletes accounts in the app based on who is assigned to it, and it is a key part of identity lifecycle management: joiner, mover and leaver changes in the directory flow to the app without a ticket.",
   "Most apps use SCIM, the System for Cross-domain Identity Management, an open standard that defines Representational State Transfer (REST) endpoints and a schema for users and groups. To configure it, open the enterprise application's Provisioning page and set Provisioning Mode to Automatic. Under Admin Credentials, enter the Tenant URL, which is the app's SCIM endpoint, and a Secret Token, or complete an OAuth authorization connection, as supplied by the app vendor. Test Connection confirms that Entra can reach the endpoint and authenticate. Gallery apps come with preconfigured connectors and default mappings, while custom apps can use the generic SCIM connector if the app implements the standard correctly.",
   "Attribute mappings define which Entra attributes flow to which app attributes. A typical gallery default maps userPrincipalName to userName, mail to emails, and the accountEnabled state to active. You can map directly, use a constant value, or use an expression such as a Switch function that converts department codes into the values the app expects. One mapping is marked as the matching attribute, with a matching precedence, which decides how Entra finds an account that already exists in the app. Getting this right matters: it prevents duplicates on the first run and links existing manually created accounts to the right Entra users.",
   "Scope controls who is provisioned. On the Settings section of the Provisioning page, Sync only assigned users and groups, the recommended default, provisions only users assigned to the enterprise application directly or through group membership. Sync all users and groups provisions everyone in the tenant, which is rarely what you want. Scoping filters narrow the population further with attribute rules, such as department EQUALS Sales or employeeType EQUALS Employee. The logic is worth memorizing: within one scoping filter group, all clauses must be true, so they are combined with AND; when you add multiple scoping filter groups, a user who matches any one group is in scope, so groups are combined with OR.",
   "When you turn provisioning on, the service runs an initial cycle that evaluates every user in scope and can take a while for large tenants. After that, incremental cycles process only changes and run roughly every 40 minutes. When a user is unassigned, falls out of a scoping filter, or is disabled or deleted in Entra, the provisioning service disables or deletes the account in the app according to the operations the app supports and the target object actions you allow. Provision on demand lets you push a single user immediately, outside the normal cycle, and see the result of each step: importing the user, determining scope, matching, and the action taken. It is the fastest way to test a mapping change.",
   "Provisioning logs, available under Monitoring on the Provisioning page and in the Entra admin center's monitoring section, record every action the service attempts: create, update, disable, delete, or skip. Each entry has a status of success, failure or skipped, and a reason. Typical failure reasons include a missing required attribute, such as an empty email address, a duplicate account in the app that matching could not resolve, or the app rejecting a value. Skipped entries often mean the user was out of scope, which is useful when someone asks why they did not get an account.",
   "If failures pile up, for example because the vendor rotated the secret token, the job can enter quarantine. A quarantined job runs less often, gradually backing off, until the issue is fixed. The Provisioning page shows the quarantine state and reason, and after correcting credentials or data you can restart the job. Set a notification email under Settings so someone hears about failures before an auditor does. Changes to the provisioning configuration itself are recorded in the audit logs, separately from the provisioning logs."
  ],
  "analogy": "Automatic provisioning works like a building's badge office linked to the HR roster. When someone is added to the roster for a floor, a badge is printed with the right name and access, and when they leave or transfer, the badge is voided at the next sync. Scoping filters are the badge office's rules, like print badges only for full-time staff in Sales. The analogy stops in one place: the badge office here runs on a schedule of roughly every 40 minutes, not instantly, unless you use provision on demand.",
  "terms": [
   [
    "SCIM",
    "System for Cross-domain Identity Management, a standard REST protocol for provisioning users and groups."
   ],
   [
    "Tenant URL and Secret Token",
    "The SCIM endpoint and authentication token entered as Admin Credentials for a provisioning connection."
   ],
   [
    "Attribute mapping",
    "The rule that maps an Entra attribute, constant or expression to a target app attribute."
   ],
   [
    "Matching attribute",
    "The mapped attribute used to find an existing account in the app and avoid duplicates."
   ],
   [
    "Scoping filter",
    "Attribute-based clauses that limit which assigned users or groups are provisioned."
   ],
   [
    "Provision on demand",
    "Provisioning a single user immediately to test and troubleshoot configuration."
   ],
   [
    "Quarantine",
    "A provisioning job state entered after repeated failures, where it runs less often until fixed."
   ]
  ],
  "example": "A company assigns its Sales group to a CRM enterprise app and turns on SCIM provisioning with a scoping filter for employeeType EQUALS Employee, so contractors in Sales aren't provisioned. When a salesperson leaves and is disabled in Entra, the next incremental cycle disables her CRM account, and the provisioning log shows the update succeeded.",
  "mistakes": [
   [
    "Clauses within a single scoping filter group are combined with OR.",
    "Clauses in one group are ANDed; all must be true. Separate scoping filter groups are ORed."
   ],
   [
    "Configuring SAML single sign-on also creates accounts in the app.",
    "SSO only handles sign-in. Account creation, updates and removal require provisioning, usually through SCIM."
   ],
   [
    "To test a mapping change you must wait for the next incremental cycle.",
    "Provision on demand pushes a single user immediately and shows each step's result."
   ],
   [
    "Sync all users and groups is the recommended scope setting.",
    "Sync only assigned users and groups is the recommended default; it limits provisioning to users assigned to the app."
   ]
  ],
  "tryit": [
   [
    "Granite Valley Bank wants SCIM provisioning to the CRM for the Sales and Customer Service groups, but only for full-time employees, not contractors, who have employeeType Contractor. Both groups are assigned to the app with Sync only assigned users and groups. How should Elena build the scoping filter?",
    "Create one scoping filter group with the clause employeeType EQUALS Employee (or NOT EQUALS Contractor). Assignment already limits it to the two groups, and a single clause in one group applies to all assigned users. Adding a second group would OR it and could widen scope."
   ],
   [
    "A new hire in Sales has no CRM account two hours after being added to the assigned group. What should Elena do first?",
    "Run provision on demand for that user and read the step results, then check the provisioning log entry for the reason, such as out of scope, a missing required attribute or a matching conflict."
   ]
  ],
  "tip": "Assignment and scope decide who is provisioned; scoping filter clauses in one group are ANDed and groups are ORed. If a single user isn't appearing in the app, use provision on demand and then read the provisioning log entry for the reason.",
  "check": [
   [
    "What two values do you normally enter as Admin Credentials for a SCIM app?",
    "The app's Tenant URL (SCIM endpoint) and a Secret Token (or an OAuth connection)."
   ],
   [
    "How are clauses within a single scoping filter group evaluated?",
    "With AND: all clauses must be true for the user to be in scope."
   ],
   [
    "What happens in the app when a provisioned user is unassigned from the enterprise application?",
    "The provisioning service disables (or deletes, depending on the app) the user's account in the app."
   ],
   [
    "What happens to a provisioning job after repeated failures, such as an expired secret token?",
    "It can enter quarantine and run less often until the problem is fixed and the job is restarted."
   ]
  ]
 },
 {
  "t": "Microsoft Entra application proxy and private network connectors for on-premises web apps",
  "hook": "At Lakeshore Regional Hospital, the night charge nurse calls the help desk at 11:30 p.m.: she is home with a sick child and needs to check tomorrow's staffing schedule, but the scheduling site only works inside the hospital network. The virtual private network (VPN) client on her personal laptop is broken again. The next morning Daniel, the identity administrator, is in a meeting where the network team refuses to open an inbound firewall port for a decades-old Windows-authenticated web app, and the security team insists any remote access must require multifactor authentication. Daniel has heard that Microsoft Entra ID can publish internal web apps without a VPN or inbound ports. How does traffic get in if nothing is listening from the outside?",
  "simple": "Many companies still run websites on their own servers, reachable only inside the office. Application proxy lets people use those sites from home without a VPN. A small program called a connector runs on a server inside the company network and calls out to Microsoft's cloud, keeping that line open. When a user at home opens the site's public address, Microsoft first checks who they are, including extra checks like a phone prompt, and then passes the request down the line the connector already opened. Nothing outside can call into the office directly. It is like a staff member inside a building who keeps a phone line open to a reception desk and relays only approved visitors' requests.",
  "body": [
   "Many organizations still run web apps on-premises: an intranet, an expense system, a SharePoint Server farm, or a clinical scheduling site. Remote users need them, and the traditional answers, a virtual private network (VPN) or a web server exposed in a perimeter network (DMZ), bring complexity and risk. Microsoft Entra application proxy publishes these apps to remote users without a VPN and without opening inbound firewall ports. Users sign in with Microsoft Entra ID, so Conditional Access, multifactor authentication (MFA) and sign-in logs apply to legacy apps just as they do to cloud apps.",
   "Application proxy has two parts. The first is a cloud service in Entra ID that receives user requests at the app's external URL. The second is one or more private network connectors, lightweight agents installed on Windows servers inside your network. Connectors make only outbound HTTPS (encrypted HTTP) connections, on port 443, to the cloud service and keep them open. When a user browses to the external URL, the cloud service authenticates the user, then passes the request down an existing outbound connection to a connector, which forwards it to the app's internal URL and returns the response the same way. Because nothing from the internet ever initiates a connection into your network, no inbound ports or DMZ are needed.",
   "Private network connectors are shared with Microsoft Entra Private Access, part of Microsoft's Security Service Edge offering, so the same connector infrastructure supports both application proxy and Private Access. Install at least two connectors for each connector group, for high availability and load balancing, and place them close to the apps they serve to reduce latency. Connector groups let you assign specific apps to specific connectors, for example one group per data center, or a dedicated group for an isolated network segment that only those servers can reach. Connectors update automatically, and their status, active or inactive, appears in the admin center under the private network connectors page.",
   "To publish an app, go to Enterprise applications, choose New application, and add an on-premises application. Several settings matter. The Internal URL is the address the connector uses to reach the app inside your network. The External URL is what users browse to, either an address in the msappproxy.net domain or your own custom domain, which requires uploading a certificate for that domain. Pre-authentication has two choices. Microsoft Entra ID, the recommended choice, authenticates users before any traffic reaches your network, which is what enables Conditional Access and MFA. Passthrough sends unauthenticated traffic straight to the app, which then must handle sign-in itself. Finally, you choose the connector group. URL translation options rewrite internal links in headers or in the application body when internal and external URLs differ, so users are not sent to addresses that only work inside.",
   "Single sign-on (SSO) to the back-end app can use several methods, chosen on the enterprise app's Single sign-on page. Integrated Windows Authentication (IWA) uses Kerberos constrained delegation (KCD). In Active Directory, the connector server's computer account is allowed to delegate to the app's service principal name (SPN), so the connector can obtain a Kerberos ticket on the user's behalf and present it to the app. Users signed in to Entra therefore reach a Windows-authenticated app with no second prompt. Header-based SSO passes identity in HTTP headers for apps that expect them. SAML SSO works for on-premises apps that accept SAML, and password-based SSO is also available. Users reach published apps through the My Apps portal or by going straight to the external URL.",
   "Application proxy requires Microsoft Entra ID P1 or P2 licensing. Common troubleshooting points fall into three groups. Connectivity problems happen when connectors cannot reach the cloud service because an outbound proxy or firewall blocks them, which shows as inactive connectors. Publishing problems include a missing or wrong internal URL, or a custom domain without a valid certificate. SSO problems usually come from KCD misconfiguration, such as a missing SPN, delegation not configured on the connector's computer account, or a mismatch between the SPN configured in Entra and the one registered in Active Directory.",
   "For the exam, keep three facts sharp: connectors need only outbound access on 443, Microsoft Entra ID pre-authentication is the choice whenever Conditional Access or MFA must protect the app, and IWA single sign-on means Kerberos constrained delegation."
  ],
  "analogy": "Think of a secure building with no public entrance. A staff member inside, the connector, phones the reception desk across the street and keeps the line open. Visitors go to reception, show ID and pass any extra checks, which is pre-authentication, and reception relays their request down the open line. The staff member fetches the answer and relays it back. Nobody outside can ever ring the building directly. The analogy stretches on SSO: with KCD, the staff member also signs in to the internal system on the visitor's behalf.",
  "terms": [
   [
    "Application proxy",
    "An Entra service that publishes on-premises web apps to remote users with Entra authentication and no inbound ports."
   ],
   [
    "Private network connector",
    "A lightweight Windows agent with outbound-only connections that relays traffic for application proxy and Private Access."
   ],
   [
    "Connector group",
    "A set of connectors assigned to specific published apps, used for location and availability."
   ],
   [
    "Internal URL and External URL",
    "The address the connector uses inside the network, and the address users browse to from outside."
   ],
   [
    "Pre-authentication",
    "Requiring Microsoft Entra ID sign-in before traffic reaches the internal app; the alternative is Passthrough."
   ],
   [
    "Kerberos constrained delegation",
    "Allowing the connector to request Kerberos tickets on behalf of users for Integrated Windows Authentication SSO."
   ]
  ],
  "example": "A hospital's on-premises scheduling site uses Windows authentication. The admin installs two private network connectors, publishes the site with Microsoft Entra ID pre-authentication and a custom external URL, configures KCD for the site's SPN, and applies a Conditional Access policy requiring MFA. Nurses at home open it from My Apps with no VPN and no password prompt from the app.",
  "mistakes": [
   [
    "Publishing an app with application proxy requires opening inbound port 443 to the connector.",
    "Connectors make outbound-only connections. No inbound ports are needed."
   ],
   [
    "Passthrough pre-authentication still lets you enforce Conditional Access and MFA.",
    "With Passthrough, Entra does not authenticate the user first, so Conditional Access cannot apply. Use Microsoft Entra ID pre-authentication."
   ],
   [
    "One connector is enough for production.",
    "Install at least two connectors per connector group so apps stay available if one fails."
   ],
   [
    "Header-based SSO is how you provide SSO to apps using Integrated Windows Authentication.",
    "IWA apps use Kerberos constrained delegation from the connector's computer account to the app's SPN."
   ]
  ],
  "tryit": [
   [
    "Lakeshore Regional Hospital wants to publish its Windows-authenticated scheduling site so nurses can reach it from home with MFA and no second password prompt. Network policy forbids inbound ports. What publishing choices should Daniel make?",
    "Install at least two private network connectors near the app, publish it as an on-premises application with Microsoft Entra ID pre-authentication, configure Integrated Windows Authentication SSO using Kerberos constrained delegation to the site's SPN, and assign a Conditional Access policy requiring MFA."
   ],
   [
    "After publishing, the connectors show as inactive in the admin center and users get an error. What is the most likely cause?",
    "The connectors cannot reach the cloud service outbound, often because an outbound proxy or firewall blocks their HTTPS traffic. Check outbound access on port 443 from the connector servers."
   ]
  ],
  "tip": "Connectors need only outbound 443, never inbound ports. For Integrated Windows Authentication SSO the answer is Kerberos constrained delegation. Choose Microsoft Entra ID pre-authentication whenever Conditional Access or MFA must protect the app.",
  "check": [
   [
    "Which firewall change is needed to publish an app with application proxy?",
    "None inbound; connectors only need outbound HTTPS access to the Microsoft cloud service."
   ],
   [
    "How does application proxy provide SSO to an app that uses Integrated Windows Authentication?",
    "Through Kerberos constrained delegation from the connector's computer account to the app's SPN."
   ],
   [
    "Why deploy at least two connectors in a connector group?",
    "For high availability and load balancing; if one connector fails, the other continues serving the apps."
   ],
   [
    "Which pre-authentication option is required for Conditional Access to protect a published app?",
    "Microsoft Entra ID pre-authentication."
   ]
  ]
 },
 {
  "t": "Microsoft Defender for Cloud Apps: cloud discovery, app governance and Conditional Access app control session policies",
  "hook": "On a Thursday afternoon, Amara, the identity and security lead at Silverline Architects, gets three questions from the managing partner in one email. Which file-sharing sites are our staff actually using, because a client found our drawings on a service nobody approved? Why does an app called Quick PDF Merge have permission to read everyone's mail? And can contractors working from their own laptops open project documents in the browser without being able to download them? Amara already has Conditional Access, but it can only allow or block a sign-in, not watch what happens afterward. Is there one tool that can answer all three questions, and how does it plug into Microsoft Entra ID?",
  "simple": "Microsoft Defender for Cloud Apps watches how people use cloud services. It does three main jobs for this exam. First, it finds out which cloud apps people use, including ones IT never approved, by reading network logs, and rates how risky each app is. Second, it keeps an eye on apps that people have given permission to read company data, and flags ones that ask for too much or act strangely. Third, it can sit in the middle of a browser session, like a security guard walking alongside a visitor, so a user on a personal laptop can view a document but not download it. Conditional Access decides who gets in; Defender for Cloud Apps can control what they do once inside.",
  "body": [
   "Microsoft Defender for Cloud Apps is Microsoft's cloud access security broker (CASB). A CASB sits between users and cloud services to provide visibility and control: which apps people use, what data they move, and what connected apps are allowed to do. Defender for Cloud Apps has many features, but SC-300 focuses on three capabilities that connect directly to identity: cloud discovery, app governance and Conditional Access app control. Each answers a different question, and exam scenarios often test whether you can match the question to the right capability.",
   "Cloud discovery answers the question of which cloud apps are in use. It finds shadow IT, meaning cloud apps people use without approval from the IT (information technology) department. Discovery works by analyzing traffic logs, and there are three ways to feed it. You can upload firewall or proxy logs manually to create a snapshot report, useful for a one-time assessment. You can deploy a log collector that forwards logs continuously for ongoing reports. Or you can integrate with Microsoft Defender for Endpoint, so managed Windows devices report the cloud apps they reach directly, even off the corporate network. The cloud discovery dashboard then shows discovered apps, users, IP (Internet Protocol) addresses and data volumes uploaded and downloaded.",
   "Each discovered app is matched against the cloud app catalog, which covers a very large number of apps and gives each a risk score based on dozens of factors grouped into areas such as general information, security, compliance and legal. For example, the catalog considers whether an app supports MFA (multifactor authentication), holds security certifications, encrypts data at rest and has a clear data retention policy. You then tag apps as sanctioned, approved for use, or unsanctioned. With the Defender for Endpoint integration, marking an app unsanctioned can block it on managed devices automatically, which turns discovery into enforcement.",
   "App governance answers the question of what connected apps are doing. It focuses on OAuth apps that are integrated with Microsoft 365 through Microsoft Entra ID consent. App governance inventories these apps and shows their permissions, publisher, publisher verification status, data access and usage over time. It flags apps that are overprivileged, unused, from unverified publishers, or behaving anomalously, such as an app that suddenly downloads large volumes of mail or files. Policies can raise alerts or automatically disable apps that match risky conditions. This complements Entra's own consent settings: Entra decides whether consent can be given in the first place, and app governance watches what consented apps actually do afterward.",
   "Conditional Access app control answers the question of what users can do during a session. It extends Entra Conditional Access beyond the sign-in decision. In a Conditional Access policy, under Session, you select Use Conditional Access App Control. This routes the user's browser session through Defender for Cloud Apps acting as a reverse proxy; you may notice the app's address in the browser gets an extra suffix. You then build the detailed rules in Defender for Cloud Apps. Access policies decide in real time whether to allow or block access to the app, for example blocking native desktop clients or access from risky locations. Session policies control activity during the session: monitor all activities, block downloads, protect downloads by applying a sensitivity label or encryption, block uploads of malware or sensitive files, or block specific activities such as copy and paste or printing.",
   "A common design brings these pieces together. One Conditional Access policy grants full access to users on managed, compliant devices. A second policy targets users on unmanaged devices and routes them to app control, where a session policy lets them view documents in the browser but blocks downloads, or protects downloads with a label. This keeps contractors and personal devices productive without letting sensitive files leave.",
   "Two constraints are important. Session control works for apps that use SAML or OpenID Connect with Microsoft Entra ID, including many gallery apps, Microsoft 365 apps and custom apps you onboard. And it requires browser-based access, because the reverse proxy cannot intercept native desktop or mobile clients; that is why designs often block native clients for unmanaged devices with an access policy. All monitored activity appears in the Defender for Cloud Apps activity log, where investigators can filter by user, app, device and action.",
   "On the exam, map the wording. Finding unapproved apps is cloud discovery. Policing risky OAuth apps is app governance. Blocking or controlling downloads in real time for some users is a session policy in Conditional Access app control, switched on by the Use Conditional Access App Control session control."
  ],
  "analogy": "Think of a museum. Cloud discovery is reviewing the visitor logs to learn which side entrances people have been sneaking through. App governance is auditing the contractors who were given keys, checking whether a cleaner's key opens the vault. Conditional Access app control is a guard who walks alongside certain visitors, letting them look at the paintings but not photograph them. The analogy has a limit: the escort only works for visitors who come through the main door, the browser, not those using a service tunnel, the native apps.",
  "terms": [
   [
    "CASB",
    "Cloud access security broker, a service providing visibility and control over cloud app use."
   ],
   [
    "Cloud discovery",
    "Analysis of traffic logs or endpoint signals to identify cloud apps in use and their risk."
   ],
   [
    "Cloud app catalog",
    "Defender for Cloud Apps' database of cloud apps with risk scores based on many factors."
   ],
   [
    "Sanctioned app",
    "A cloud app approved for use; unsanctioned apps can be flagged or blocked."
   ],
   [
    "App governance",
    "Defender for Cloud Apps capability that monitors and controls OAuth apps' permissions and behavior."
   ],
   [
    "Conditional Access app control",
    "A reverse proxy capability, enabled from a Conditional Access session control, that applies access and session policies in real time."
   ],
   [
    "Session policy",
    "A Conditional Access app control policy that monitors or restricts actions such as downloads during a session."
   ]
  ],
  "example": "Contoso uploads firewall logs and discovers 300 cloud storage apps in use. It sanctions two, marks the rest unsanctioned so Defender for Endpoint blocks them, and creates a Conditional Access policy that routes sessions from unmanaged devices to app control, where a session policy blocks downloads of files labelled Confidential from SharePoint.",
  "mistakes": [
   [
    "A Conditional Access grant control can block downloads for unmanaged devices.",
    "Grant controls decide whether sign-in succeeds. Blocking downloads mid-session needs the Use Conditional Access App Control session control plus a session policy."
   ],
   [
    "Conditional Access app control works for any client, including desktop and mobile apps.",
    "It requires browser-based sessions through the reverse proxy. Native clients cannot be proxied, so designs often block them with an access policy."
   ],
   [
    "App governance and cloud discovery do the same thing.",
    "Cloud discovery finds apps from traffic logs (shadow IT). App governance monitors OAuth apps connected through Entra consent and their data access."
   ],
   [
    "Marking an app unsanctioned blocks it everywhere automatically.",
    "Blocking on devices comes from integrations such as Defender for Endpoint on managed devices; the tag alone is a classification."
   ]
  ],
  "tryit": [
   [
    "Silverline Architects lets contractors use personal laptops to open project files in SharePoint Online. The partner wants them to view drawings in the browser but never download files labeled Confidential, while employees on compliant devices keep full access. How should Amara configure this?",
    "Create a Conditional Access policy for contractors on unmanaged (non-compliant) devices with the session control Use Conditional Access App Control, then in Defender for Cloud Apps create a session policy that blocks or protects downloads of Confidential files. A separate policy, or no app control, keeps full access for compliant devices. She may also block native clients for the contractors with an access policy."
   ],
   [
    "The partner wants a list of cloud storage services staff use, including from laptops outside the office. Which feed is best?",
    "Cloud discovery with Microsoft Defender for Endpoint integration, because managed devices report usage directly even off the corporate network, unlike firewall logs."
   ]
  ],
  "tip": "Blocking downloads from unmanaged devices in real time is a session policy in Conditional Access app control, enabled by the Use Conditional Access App Control session control. Finding unapproved apps is cloud discovery; policing risky OAuth apps is app governance.",
  "check": [
   [
    "Which Conditional Access session control sends a session through Defender for Cloud Apps?",
    "Use Conditional Access App Control."
   ],
   [
    "What are three ways to feed cloud discovery?",
    "Manual log upload (snapshot reports), an automatic log collector, and Microsoft Defender for Endpoint integration."
   ],
   [
    "Which Defender for Cloud Apps capability flags an overprivileged OAuth app that suddenly reads large volumes of mail?",
    "App governance."
   ]
  ]
 },
 {
  "t": "Monitoring and securing workload identities: Workload ID Premium, risky workload identities, Conditional Access for workload identities",
  "hook": "Saturday, 3:10 a.m. Kofi, on call for Meridian Freight, is woken by an alert: the service principal for the invoice-export app has just signed in from an IP address in a country where Meridian has no offices, and it is reading mailbox data. The app normally signs in only from two build agents in the company's own data center. A developer admits that, months ago, a client secret for that app was committed to a public code repository during a demo and quickly deleted. The app has no MFA, no user to call, and nobody watches its sign-ins. Kofi can disable it tonight, but what controls would have stopped a stolen secret from working at all?",
  "simple": "Not every sign-in is a person. Apps and automated services also sign in to Microsoft Entra ID, using their own identities, called workload identities. They often have strong permissions and cannot answer a phone prompt, so if someone steals an app's password, they can quietly use it. Microsoft offers an extra license, Workload ID Premium, that adds protections: rules that block an app's sign-in unless it comes from known places, and risk detection that flags signs of theft, such as the app's password showing up in public code. Even without the license, logs show every app sign-in and every change to an app's credentials. It is like a company car: you track where it goes and who added a new key.",
  "body": [
   "Workload identities are the identities software uses to authenticate: service principals for applications and managed identities for Azure resources. They often hold powerful permissions, such as reading all mail or managing subscriptions. They cannot perform multifactor authentication (MFA), they have no human to notice odd prompts, and their activity rarely gets the attention that user sign-ins do. That combination makes them attractive targets. An attacker who finds a client secret in a code repository can sign in as the app from anywhere and use its permissions quietly, often for months.",
   "Microsoft Entra Workload ID Premium is a separate license that adds security features specifically for workload identities. It includes Conditional Access for workload identities, ID Protection for workload identities, which surfaces risky workload identities, access reviews for service principals assigned to privileged directory roles, and app health recommendations. Basic capabilities do not need it: you can create app registrations, service principals and managed identities, and configure workload identity federation, with the free features of Microsoft Entra ID. When an exam scenario asks for any of the premium protections above, the expected answer includes the Workload ID Premium license.",
   "Conditional Access for workload identities lets you target service principals in a policy's assignments instead of users. In the policy, under Users or workload identities, you select workload identities and choose specific service principals. There are important limits. It applies only to single-tenant service principals registered in your tenant. It does not apply to managed identities, and it does not apply to third-party multitenant apps whose application object lives in another tenant. Because workloads cannot satisfy MFA or device compliance, the supported grant control is block. You can block access when a sign-in comes from outside a named location, such as the IP ranges of your build agents, or when the service principal risk level is medium or high. A policy that blocks the deployment app unless it signs in from the pipeline's IP ranges makes a stolen secret close to useless from anywhere else.",
   "Risky workload identities, part of ID Protection, detects signs that a service principal has been compromised. Detections include leaked credentials, where Microsoft finds the app's valid secret in public code repositories; suspicious sign-ins with unusual properties or patterns; admin confirmed service principal compromised; malicious application and suspicious application, often linked to apps disabled for terms-of-service violations; and anomalous service principal activity, such as unusual changes to credentials or directory settings. The Risky workload identities report shows each identity's risk level, risk state and detections. Administrators can confirm compromise, which raises risk to high and can trigger risk-based Conditional Access, dismiss risk after investigation, or open the related sign-in and audit logs.",
   "Remediation for a compromised workload identity follows a predictable pattern. Remove or rotate all credentials on the application object, including secrets, certificates and federated credentials an attacker may have added. Disable the service principal if the business can tolerate it while you investigate. Review the app's permissions and role assignments and what it accessed using the sign-in logs, audit logs and the logs of the resources it touched, such as mailbox audit records. Then restore access with stronger credentials and, where licensed, a location-based Conditional Access policy.",
   "Monitoring without premium features still matters a great deal. In the Entra sign-in logs, service principal sign-ins and managed identity sign-ins have their own tabs, separate from interactive and non-interactive user sign-ins. They show which app signed in, the resource it accessed, the IP (Internet Protocol) address, and the credential used, identified by key ID. Audit logs record events such as credentials added to an application or service principal, new owners added, and permission or role grants. These are classic attacker persistence techniques. Send the logs to a Log Analytics workspace, or to Microsoft Sentinel, and alert on events such as a new credential added to a highly privileged app or a service principal signing in from an unexpected IP range.",
   "Good hygiene reduces the need for detection. Prefer managed identities for workloads in Azure and federated credentials for workloads outside Azure, so there is no secret to leak. Give each workload least-privileged permissions and narrow role scopes. Assign owners for every app so someone responds to alerts and expiry notices, and remove apps and credentials that are no longer used."
  ],
  "analogy": "Workload identities are like company delivery vans that drive themselves. They carry valuable cargo, nobody inside can show a driver's license at a checkpoint, and if someone copies the ignition key, the van drives off without complaint. Conditional Access for workload identities is a geofence that stops the van outside approved depots. Risky workload identity detection is the alarm when a copy of the key turns up for sale. The analogy weakens for managed identities: those vans have no copyable key at all, and the geofence cannot be applied to them.",
  "terms": [
   [
    "Workload identity",
    "An identity used by software, such as a service principal or managed identity."
   ],
   [
    "Workload ID Premium",
    "A license adding Conditional Access, risk detection, access reviews and recommendations for workload identities."
   ],
   [
    "Conditional Access for workload identities",
    "Policies targeting single-tenant service principals that block access by location or service principal risk."
   ],
   [
    "Risky workload identity",
    "A service principal flagged by ID Protection with detections such as leaked credentials or anomalous activity."
   ],
   [
    "Leaked credentials detection",
    "A risk detection raised when a service principal's valid credential is found in a public code repository."
   ],
   [
    "Service principal sign-in log",
    "The sign-in log tab that records authentication by apps using their own credentials."
   ]
  ],
  "example": "A deployment app authenticates with a certificate from build agents in two known IP ranges. With Workload ID Premium, the admin creates a named location for those ranges and a Conditional Access policy that blocks the service principal from any other location. When a secret for another app shows up in a public repository, ID Protection flags it as a leaked credential and the team rotates it the same day.",
  "mistakes": [
   [
    "Conditional Access for workload identities can protect managed identities.",
    "It applies only to single-tenant service principals. Managed identities and third-party multitenant apps cannot be targeted."
   ],
   [
    "You can require MFA for a service principal in Conditional Access.",
    "Workloads cannot satisfy MFA. The supported control is block, based on conditions such as location or service principal risk."
   ],
   [
    "Creating managed identities or configuring workload identity federation needs Workload ID Premium.",
    "Those are basic capabilities. Premium adds Conditional Access, risky workload identities, access reviews for privileged service principals and recommendations."
   ],
   [
    "Service principal sign-ins appear with user sign-ins, so they are hard to find.",
    "They have their own tabs in the sign-in logs: service principal sign-ins and managed identity sign-ins."
   ]
  ],
  "tryit": [
   [
    "Meridian Freight's invoice-export app is a single-tenant app that authenticates only from two build agents with fixed public IP ranges. The company has Workload ID Premium. Kofi wants a stolen secret to be useless anywhere else, and he wants an automatic response if Microsoft finds the secret leaked. What should he configure?",
    "Create a named location for the build agents' IP ranges, then a Conditional Access policy targeting the app's service principal that blocks all locations except that named location. Add a second policy, or condition, that blocks the service principal when its risk is medium or high, so a leaked credentials detection blocks it. Then rotate the leaked secret, ideally replacing it with a certificate or federated credential."
   ]
  ],
  "tip": "Conditional Access for workload identities supports only single-tenant service principals, not managed identities, and its grant control is block (by location or risk). Anything beyond basic workload identity features points to the Workload ID Premium license.",
  "check": [
   [
    "Can you apply Conditional Access policies to managed identities?",
    "No. Conditional Access for workload identities applies to single-tenant service principals, not managed identities."
   ],
   [
    "What controls can a Conditional Access policy for workload identities apply?",
    "Block access, based on conditions such as location or service principal risk; workloads can't satisfy MFA."
   ],
   [
    "Which license is needed for risky workload identity detections and Conditional Access for workload identities?",
    "Microsoft Entra Workload ID Premium."
   ],
   [
    "Where in the sign-in logs do you find authentication by an app using its own credential?",
    "On the service principal sign-ins tab (managed identities have their own tab)."
   ]
  ]
 },
 {
  "t": "Reviewing and removing unused or over-permissioned applications and expiring credentials",
  "hook": "It is the last week of the quarter at Oakmont Public Library System, and Hannah, the only identity administrator, has blocked off an afternoon for something she has been avoiding: the app list. Enterprise applications shows 212 entries. She recognizes perhaps 60. One, named Test-Sync-Old, holds the application permission to read and write every mailbox and has a client secret that never expires. Its owner left two years ago. Another, the payroll integration, has a certificate expiring in nine days, and nobody has been told. Hannah's manager asks for a plan by Friday. How does she find what is unused and overpowered, and how does she remove things without breaking payroll on the first of the month?",
  "simple": "Over the years a company collects connected apps, like old keys on a key ring. Some are no longer used, some open far more doors than they need, and some have passwords that will soon expire or never do. Each forgotten app is a possible way in for an attacker. Cleaning up means three things: find apps nobody uses, find apps with too much access, and track app passwords and certificates before they expire. When removing an app, first switch it off and wait to see if anyone complains, then delete it. Microsoft Entra ID keeps a deleted app registration for 30 days, so a mistake can be undone. It is like putting an old key in a drawer before throwing it away.",
  "body": [
   "Over time a tenant collects applications: pilot projects that ended, apps whose owners left, integrations granted broad permissions years ago, and test apps nobody remembers. Each one is a potential door into your data. An unused app with a valid secret and the Mail.ReadWrite application permission is exactly what an attacker hopes to find, because its sign-ins draw no attention and its permissions span the tenant. Regular application hygiene is therefore part of the identity administrator's job, not a one-time cleanup.",
   "Start by finding what is not used. The sign-in logs show service principal and user sign-ins per application, so you can filter by app and see the last activity. The Usage and insights reports in the Entra admin center summarize sign-in activity per app. Microsoft Entra recommendations, a tenant-specific list of improvement actions, include items such as removing unused applications, removing unused credentials from applications, and renewing expiring service principal credentials. Each recommendation lists the impacted resources and the steps to fix them, and you can mark items as completed or postponed. Microsoft Defender for Cloud Apps app governance adds a view of OAuth apps' actual data access over time and flags apps that are unused or overprivileged.",
   "Next, find what has too much access. Open each enterprise application's Permissions page to see admin-consented and user-consented permissions. Look closely at application permissions with tenant-wide reach, such as Directory.ReadWrite.All, Mail.ReadWrite or Files.ReadWrite.All, and compare them with what the app really needs, ideally by asking the owner and checking its documentation. Also check which apps hold Microsoft Entra directory roles, or Azure role-based access control (RBAC) roles at broad scopes such as Owner on a subscription. Where the app supports it, replace broad permissions with narrower ones. For example, the Sites.Selected permission lets an app reach only specific SharePoint sites that an administrator grants, instead of every site in the tenant.",
   "Credentials need their own attention. Client secrets and certificates expire, and when they do, integrations fail, usually at an inconvenient time. Administrators under pressure then tend to create long-lived secrets as a quick fix, which creates the next risk. Track expiry in several ways: review the Certificates and secrets page on app registrations, use the recommendation for renewing expiring credentials, or query Microsoft Graph for each application's passwordCredentials and keyCredentials and their endDateTime values, filtering for dates in the next 30 or 60 days. Assign owners to every app so someone receives notifications and handles renewal. Where available, use application management policies to restrict the lifetime of new secrets, or to block new password credentials entirely and push teams toward certificates and federated credentials.",
   "Removing apps safely is a sequence, not a single click. Before touching anything, try to confirm the app's purpose: check the Owners page on the app registration and enterprise application, look at the app's description and notes, search the audit log for who created it and who granted its consent, and ask the business unit that appears most often in its sign-ins. Record what you find, because the same question will come up at the next review. First, disable sign-in for the enterprise application by setting Enabled for users to sign-in to No on its Properties page. This stops new tokens from being issued, for users and for the app itself, while preserving every setting, so you can turn it back on in seconds. Watch for complaints, help-desk tickets and failed sign-ins in the logs for an agreed period, such as two to four weeks. Then remove the credentials and permissions, and finally delete the service principal and, for apps you own, the app registration. Deleted app registrations remain restorable for 30 days from the Deleted applications tab, which provides a safety net if someone discovers a dependency late.",
   "Third-party multitenant apps behave differently. Deleting their service principal removes the app from your tenant only; the vendor's application object is untouched. Unless your consent settings prevent it, a user could consent again and recreate the service principal. To keep it out, tighten user consent settings, or keep the service principal but disable sign-in, which blocks it while leaving a record.",
   "Governance features help keep the problem from returning. Access reviews can include service principals assigned to privileged directory roles, with Workload ID Premium licensing, so their access is confirmed regularly. Consent settings and the admin consent workflow stop new overprivileged apps from arriving unnoticed. And a recurring review on the calendar, using recommendations and logs, turns cleanup into routine."
  ],
  "analogy": "App hygiene is like managing the keys to an apartment building. Some keys belong to tenants who moved out, some open every unit when they need only the laundry room, and some locks are about to be changed with nobody told. The safe way to retire a key is to deactivate it first and wait to see who complains, then destroy it, knowing the locksmith keeps a record for 30 days. The analogy stops in one place: an app registration can be fully restored with its settings, which a destroyed key cannot.",
  "terms": [
   [
    "Unused application",
    "An app registration or enterprise app with no recent sign-ins, a candidate for disabling and removal."
   ],
   [
    "Overprivileged application",
    "An app granted permissions broader than it needs, such as tenant-wide read and write access."
   ],
   [
    "Credential expiry",
    "The end date of a client secret or certificate after which the app can no longer authenticate with it."
   ],
   [
    "Enabled for users to sign-in",
    "An enterprise app property that, when set to No, blocks all sign-ins to that app."
   ],
   [
    "Microsoft Entra recommendations",
    "Tenant-specific guidance listing actions such as removing unused apps or renewing expiring credentials."
   ],
   [
    "Application management policy",
    "A policy that restricts app credentials, such as limiting secret lifetimes or blocking new secrets."
   ],
   [
    "Sites.Selected",
    "A permission that limits an app's access to specific SharePoint sites an administrator grants."
   ]
  ],
  "example": "A quarterly review finds an HR integration last used 14 months ago that still holds User.ReadWrite.All and a secret expiring next year. The admin confirms with HR that the vendor was replaced, sets Enabled for users to sign-in to No, waits two weeks without complaints, removes the secret, and deletes the app registration, knowing it can be restored for 30 days.",
  "mistakes": [
   [
    "Delete an app immediately once it looks unused; it can't be recovered anyway.",
    "Disable sign-in first and monitor. Deleted app registrations can be restored for 30 days, but disabling is safer and instant to undo."
   ],
   [
    "Deleting a third-party multitenant app's service principal removes the app permanently.",
    "It removes the app from your tenant only. Users could consent again unless consent settings prevent it."
   ],
   [
    "When a secret is about to expire, create a new one with the longest lifetime to avoid future outages.",
    "Long-lived secrets increase risk. Assign owners, track expiry, prefer certificates or federated credentials, and limit lifetimes with policies."
   ],
   [
    "Setting Visible to users to No disables an app.",
    "That only hides the My Apps tile. Enabled for users to sign-in set to No blocks sign-ins."
   ]
  ],
  "tryit": [
   [
    "Hannah finds Test-Sync-Old has no sign-ins in 20 months, holds Mail.ReadWrite as an application permission, and has a non-expiring secret. Its owner left. Nobody can say for sure that nothing depends on it. What sequence should she follow?",
    "Set Enabled for users to sign-in to No so no tokens are issued, then monitor sign-in logs and tickets for an agreed period. If nothing breaks, remove the secret and permissions, then delete the service principal and app registration, knowing the registration can be restored for 30 days if a dependency appears."
   ],
   [
    "The payroll integration's certificate expires in nine days and has no owner. What should Hannah do beyond renewing it?",
    "Assign an owner who receives notifications, add the new certificate before the old one expires, and track future expiry with the expiring credentials recommendation or a Graph query on keyCredentials end dates."
   ]
  ],
  "tip": "Disable before delete: set Enabled for users to sign-in to No to test the impact safely. For credential expiry questions, think owners, notifications, the expiring credentials recommendation and preferring certificates or federated credentials.",
  "check": [
   [
    "What is the safest first step before deleting an application you believe is unused?",
    "Disable it by setting Enabled for users to sign-in to No and monitor for impact."
   ],
   [
    "Where can you see which permissions an enterprise application has been granted?",
    "On the enterprise application's Permissions page, which lists admin and user consent grants."
   ],
   [
    "How long can a deleted app registration be restored?",
    "For 30 days after deletion."
   ],
   [
    "Which permission lets an app access only specific SharePoint sites instead of all sites?",
    "Sites.Selected, with an administrator granting access to the chosen sites."
   ]
  ]
 },
 {
  "t": "Entitlement management: catalogs, access packages, assignment policies, approvals, expiration and separation of duties",
  "hook": "Rafael starts as a project analyst at Birchwood Engineering on Monday. By Wednesday he has filed six tickets: one for the project Team, one for the SharePoint site, one for the drawing-review app, one for a distribution group, and two follow-ups because the first ones went to the wrong queue. Meanwhile an auditor has asked Grace, the identity administrator, why a former project contractor still belongs to the project Team eight months after the contract ended, and why one employee can both create vendors and approve vendor payments. Grace suspects all three problems share one cause: access is granted by hand, one resource at a time, and never removed. What would a better process look like?",
  "simple": "Entitlement management turns access requests into a self-service bundle. Instead of asking separately for a team, a website and an app, a person requests one package that contains all of them. Someone, like their manager, approves it, and access is granted automatically. The package can also have an end date, so access disappears when it is no longer needed, unless the person asks to extend it. Packages live in folders called catalogs, which let a department manage its own resources. You can also mark two packages as not allowed together, so nobody can hold both, such as creating vendors and approving payments. It is like a hotel package that bundles room, breakfast and parking, booked once and ending at checkout.",
  "body": [
   "Entitlement management, part of Microsoft Entra ID Governance, turns access requests into a self-service, auditable process. Without it, someone joining a project files tickets for each group, Microsoft Teams team, app and SharePoint site the project uses, and the access is rarely removed when the project ends. With entitlement management, the user requests one access package that contains all of those resources, an approver says yes, and access is granted automatically. Later, when the assignment expires, the access is removed automatically as well. The result is faster onboarding, fewer tickets and a clear record for auditors.",
   "The building blocks start with the catalog. A catalog is a container of resources and access packages. Resources can be groups and Teams, enterprise applications with their app roles, SharePoint Online sites with their site roles, and other supported resource types. Catalogs exist so you can delegate. Catalog owners manage the catalog's resources and access packages. Access package managers manage the access packages within a catalog but cannot add new resources. Catalog creators are users allowed to create new catalogs. A built-in catalog called General exists by default. A resource must be added to a catalog before it can be used in any access package, and adding a resource requires being an owner of that resource or holding an appropriate administrator role, which prevents someone from bundling resources they do not control.",
   "An access package bundles resource roles with one or more policies. Resource roles are specific permissions in each resource, such as Member of a group, the User role in an enterprise app, and Member or Visitor on a SharePoint site. Each assignment policy then defines who can request the package. The options are specific users and groups in your directory, all members, all users including guests, specific connected organizations for external partners, or none, meaning only administrators can assign it directly. The policy also defines what happens when someone requests and for how long they keep access. Automatic assignment policies take a different approach: they assign the package to every user who matches an attribute rule, such as everyone whose department is Sales, without anyone requesting it, and remove it when they no longer match.",
   "Approval settings live inside each policy. You decide whether approval is required at all, and who approves: specific approvers, the requestor's manager, the requestor's sponsors or internal sponsors for external users, or a combination. Approval can be single-stage or multi-stage, for example the manager first and then the resource owner. You can add backup approvers, configure escalation if the first approver does not respond, and set a timeout after which unapproved requests are denied automatically. Requestors can be required to provide a business justification and answer custom questions, such as a project code, which approvers see when deciding.",
   "Lifecycle settings in the policy define expiration. An assignment can expire on a specific date, after a number of days, after a number of hours, or never. Users can be allowed to request an extension before their access ends, which sends a new request through approval. Policies can also include recurring access reviews, so reviewers periodically confirm whether each assignment is still needed, and denied users lose access. Together, expiration and reviews are what stop the former contractor in the opening story from keeping access for eight months.",
   "Separation of duties prevents toxic combinations of access. In an access package's settings, you list incompatible access packages or incompatible groups. A user who already holds one of those cannot request this package. For example, if the Accounts Payable package is marked incompatible with the Payment Approver package, a user with Accounts Payable will be stopped when requesting Payment Approver. Administrators who assign packages directly can still override the check when there is a documented reason, and those checks and overrides are recorded, which gives auditors the evidence they need.",
   "Everything is audited. Requests, approvals, denials, assignments and removals appear on each access package's Requests and Assignments pages and in the Microsoft Entra audit log. Users request packages through the My Access portal, where approvers also act on pending requests. Custom extensions can call Azure Logic Apps at points in the lifecycle, for example to create an account in a system that Entra does not manage when an assignment is granted, or to notify a team when it is removed.",
   "Licensing matters for the exam. Entitlement management requires Microsoft Entra ID P2 or Microsoft Entra ID Governance licensing, and some advanced features, such as custom extensions and automatic assignment policies, require ID Governance specifically. When a question describes bundled, approved, time-limited access with automatic removal, the answer is an access package. When it describes preventing conflicting access, the answer is incompatible access packages or groups."
  ],
  "analogy": "Entitlement management works like a hotel's package deals. The hotel's departments, the catalogs, each own certain services. A package bundles a room, breakfast and parking, the resource roles. The booking rules, the policy, say who may book, whether a manager must approve, and when checkout happens, after which the key card stops working. The hotel also refuses to sell the staff-only package to someone who already holds a guest package, which is separation of duties. The analogy stops at extensions: here, staying longer needs a fresh approval.",
  "mnemonic": "Build order, inside out: Resources go in a Catalog, the catalog holds Packages, packages carry Policies. Remember R-C-P-P: Real Companies Plan Projects.",
  "terms": [
   [
    "Catalog",
    "A container of resources and access packages with its own delegated owners."
   ],
   [
    "Access package",
    "A bundle of resource roles (groups, apps, sites) with policies governing who can get them and for how long."
   ],
   [
    "Assignment policy",
    "Rules in an access package defining who can request, approval steps, expiration and reviews."
   ],
   [
    "Separation of duties",
    "Access package settings listing incompatible packages or groups to prevent conflicting access."
   ],
   [
    "Automatic assignment policy",
    "A policy that assigns an access package to users matching an attribute rule without a request."
   ],
   [
    "Connected organization",
    "An external partner organization whose users can be allowed to request access packages."
   ],
   [
    "My Access portal",
    "The portal where users request access packages and approvers act on requests."
   ]
  ],
  "example": "A new marketing campaign needs a Team, a SharePoint site and a design app. The marketing lead, a catalog owner, builds a Campaign access package with a policy letting Marketing department members request it, manager approval, and 90-day expiry with extension allowed. The package is marked incompatible with the Finance Approver package to enforce separation of duties.",
  "mistakes": [
   [
    "You can add any SharePoint site directly to an access package.",
    "A resource must first be added to the access package's catalog, which requires ownership of the resource or an appropriate admin role."
   ],
   [
    "Access package managers can add new resources to a catalog.",
    "Catalog owners add resources. Access package managers manage packages using resources already in the catalog."
   ],
   [
    "Separation of duties is enforced by approvers rejecting conflicting requests.",
    "It is a setting: list incompatible access packages or groups so the request is blocked automatically."
   ],
   [
    "Access package assignments last until an admin removes them.",
    "Policies set expiration on a date, after days or hours, or never, and can add extensions and recurring access reviews."
   ]
  ],
  "tryit": [
   [
    "Birchwood Engineering's project lead wants new analysts to get the project Team, SharePoint site and drawing-review app in one request, approved by their manager and then the project lead, lasting 180 days with the option to extend. Contractors from a partner firm should also be able to request it. Users with the Vendor Payments package must never get it. How should Grace build this?",
    "Add the three resources to a catalog the project lead owns, create an access package with their resource roles, and add policies: one for internal users and one for the partner as a connected organization, each with two-stage approval (manager or sponsor, then project lead), 180-day expiration and extensions allowed. In the package's separation of duties settings, list Vendor Payments as an incompatible access package."
   ]
  ],
  "tip": "Resources go into catalogs, catalogs hold access packages, and policies decide who, approval and duration. When a question describes time-limited, approved, bundled access, the answer is an access package; for preventing conflicting access, it's incompatible packages or groups.",
  "check": [
   [
    "What must happen before a SharePoint site can be included in an access package?",
    "The site must be added as a resource to the access package's catalog."
   ],
   [
    "Which access package setting stops a user who has package A from requesting package B?",
    "Separation of duties: list package A as an incompatible access package in package B's settings."
   ],
   [
    "Name two options for when an access package assignment expires.",
    "Any two of: on a specific date, after a number of days, after a number of hours, or never."
   ],
   [
    "Which policy type assigns a package to everyone in the Sales department without a request?",
    "An automatic assignment policy based on an attribute rule."
   ]
  ]
 },
 {
  "t": "Connected organizations and access packages for external users",
  "hook": "It is Monday morning at Harbor Credit Union, and Priya in identity operations opens a spreadsheet of 340 guest accounts. Each one was invited by hand over the past three years for a vendor audit, a marketing agency, a software partner. Nobody knows which projects are finished. A new partner, Lantern Analytics, needs access to a shared project site by Friday, and the business owner wants it done the same way: invite each person and hope someone remembers to remove them later. Priya knows that path only makes the spreadsheet longer. Is there a way to let partners ask for access themselves, have the right person approve it, and have the guest accounts clean themselves up when the work ends?",
  "simple": "Think of a shared office building. Instead of the front desk printing a badge for every visitor and forgetting to collect it, the building keeps a list of partner companies it works with. Visitors from those companies fill out a request for a specific room, a manager approves it, and the badge stops working on a set date. In Microsoft Entra, the list of partner companies is called connected organizations. The request form for a bundle of access, such as a Teams site plus an app, is called an access package. When a partner user is approved, Entra creates their guest account automatically. When their access ends, Entra can block the account and later delete it, so old guests do not pile up.",
  "body": [
   "Inviting guests one at a time works for a handful of partners, but it does not scale and it tends to leave stale guest accounts behind, because nobody owns the job of removing them. Entitlement management, part of Microsoft Entra ID Governance, offers a governed alternative. External users request an access package themselves, approvers decide, and the guest accounts are created on approval and cleaned up when access ends. For the SC-300 exam, this is the standard answer whenever a scenario asks for partner access that is self-service, approved, time-limited and automatically removed.",
   "The building block is the connected organization. A connected organization represents another organization you collaborate with, and you create it under Identity Governance, Entitlement management, Connected organizations in the Microsoft Entra admin center. It can be identified in two ways. If the partner uses Microsoft Entra, you identify it by its Entra tenant, which automatically covers all of that tenant's verified domains. If the partner's users authenticate another way, such as email one-time passcode (OTP) or a federated identity provider using Security Assertion Markup Language (SAML) or WS-Federation (WS-Fed), you identify it by domain name. Each connected organization can also have sponsors. Internal sponsors are people in your organization who own the relationship, and external sponsors are contacts at the partner. Both kinds of sponsor can be selected as approvers in an access package policy, which is a convenient way to route a partner's requests to the person who actually knows them.",
   "Connected organizations have a state, and the exam likes this detail. Configured means an administrator created the organization deliberately, or reviewed and promoted it. Users from a configured organization can request any package whose policy includes all configured connected organizations. Proposed means the organization was created automatically. This happens when a user from an organization you have never connected requests a package whose policy allows all users, including organizations not yet connected, and that request is approved. Entra records the new organization as proposed so you can see where your guests come from. A proposed organization is not included in the all configured connected organizations scope until an administrator changes its state to Configured. This split lets you open one package to anyone while still curating a separate list of trusted partners for your other packages.",
   "The access package policy is where you decide which external users may ask. When you add a policy, you choose For users not in your directory, then pick one of three scopes. Specific connected organizations limits requests to the partners you name. All configured connected organizations allows every partner you have marked as Configured, and automatically includes partners you configure later. All users allows anyone from any connected organization plus any new external user, which is the scope that can generate proposed organizations. Approval is usually required for external requests, often by the internal sponsor in a single stage, or with the external sponsor first and an internal approver second. You can also require requestor justification, ask additional questions, and set the assignment to expire after a number of days or on a fixed date.",
   "External users request access through the access package's My Access portal link. You copy that link from the package's overview page and share it with the partner, for example in an email or on a project page. The partner user opens it, signs in with their own identity, chooses the package, answers any questions and submits. When the request is approved, Entra creates a business-to-business (B2B) guest account in your directory if one does not already exist and adds it to the package's resources, such as a group, a Microsoft Teams team, a SharePoint site or an enterprise application role. A common reason requests fail is that the tenant's other settings still block the user. External collaboration settings must allow invitations to that domain, and cross-tenant access settings must allow inbound B2B collaboration from that partner tenant. Entitlement management does not override those controls.",
   "Cleanup is configured once, for the whole tenant, on entitlement management's Settings page under the external user lifecycle section. You can choose that when an external user loses their last access package assignment, because it expired or was removed, Entra blocks them from signing in to your directory. You can then have Entra remove the guest account after a set number of days. This applies only to guests created or managed through entitlement management. Guests you invited manually through the Users page are not touched, which is a frequent exam trap. Combined with expiring assignments and recurring access reviews in the package policy, these settings keep every guest tied to a current business need instead of a forgotten invitation.",
   "Finally, keep licensing and billing straight. Guest users themselves are billed through the Microsoft Entra External ID monthly active users (MAU) model, so you do not buy a seat for each guest. The governance features used by the inviting tenant, including entitlement management, require the appropriate Microsoft Entra ID P2 or Microsoft Entra ID Governance licensing. When a scenario mixes these, separate the question of how guests are billed from the question of which governance license your administrators and policies depend on."
  ],
  "analogy": "A connected organization is like a list of approved supplier companies at a warehouse, and an access package is a visitor pass for a specific area. A driver from an approved supplier fills in a request at the gate, the supplier's account manager signs it, and the pass is printed with an end date. When the pass expires, the gate stops accepting it, and after a while the pass record is shredded. The analogy breaks in one place: a warehouse would turn away an unknown company, but an all users policy in Entra can let a brand new organization in and then lists it as proposed.",
  "terms": [
   [
    "Connected organization",
    "An external organization, identified by its Microsoft Entra tenant or by a domain, whose users can request access packages."
   ],
   [
    "Configured state",
    "A connected organization an administrator created or approved, included in the all configured connected organizations scope."
   ],
   [
    "Proposed state",
    "A connected organization created automatically after an approved request from a new organization, not included in the configured scope until promoted."
   ],
   [
    "Sponsor",
    "An internal or external contact for a connected organization who can be chosen as an approver."
   ],
   [
    "External user lifecycle",
    "Entitlement management settings that block and later remove guests whose last assignment ends."
   ],
   [
    "My Access portal link",
    "The shareable link to an access package that external users open to sign in and submit a request."
   ]
  ],
  "example": "Contoso creates Fabrikam as a connected organization using Fabrikam's Entra tenant and names an internal sponsor. The Joint Project access package has a policy for specific connected organizations (Fabrikam), requires the internal sponsor's approval and expires assignments after 60 days. Fabrikam staff use the My Access link, and on approval their guest accounts are created and added to the project team. When the 60-day assignments expire, the external user lifecycle settings block the guests from signing in and remove their accounts after the configured number of days.",
  "mistakes": [
   [
    "Proposed connected organizations can request any package scoped to all configured connected organizations.",
    "Proposed organizations are excluded from that scope. An administrator must change the state to Configured first."
   ],
   [
    "The external user lifecycle settings will remove every stale guest in the tenant.",
    "They only act on guests created or managed through entitlement management. Manually invited guests need access reviews or other cleanup."
   ],
   [
    "An approved access package request will always succeed, whatever the external collaboration settings say.",
    "External collaboration and cross-tenant access settings still apply. If they block the domain or tenant, the guest cannot be created or sign in."
   ],
   [
    "A domain-based connected organization is the right choice for a partner that uses Microsoft Entra.",
    "Use the partner's tenant, which covers all of its domains. Domain-based identification is for users who authenticate by email one-time passcode or a SAML/WS-Fed provider."
   ]
  ],
  "tryit": [
   [
    "Northwind Legal wants to let any law firm request a read-only document library package for a court case, but only its three long-term partner firms should be able to request the package that includes the billing app. A new firm, Bluegate, requests the document library package and is approved. The next day a Bluegate user tries to request the billing package, which is scoped to all configured connected organizations. Will it work, and what would an administrator need to do?",
    "It will not work. The approval created Bluegate as a proposed connected organization, and proposed organizations are not included in the all configured connected organizations scope. If Northwind decides Bluegate is now a trusted partner, an administrator changes its state to Configured. Otherwise the separation is doing exactly what it was designed to do."
   ]
  ],
  "tip": "Proposed connected organizations are not included when a policy targets all configured connected organizations. To have Entra clean up guests automatically, configure the external user lifecycle settings in entitlement management, which only affect guests brought in through it. If an approved request still fails, check external collaboration and cross-tenant access settings.",
  "check": [
   [
    "What causes a connected organization to be created in the Proposed state?",
    "A user from an organization not yet connected requests and is approved for a package whose policy allows all users, including new external organizations."
   ],
   [
    "How do external users request an access package?",
    "Through the My Access portal link for the package, which you share with them; they sign in with their own identity."
   ],
   [
    "What can entitlement management do when an external user's last assignment ends?",
    "Block the user from signing in and remove the guest account after a configured number of days, for guests brought in through entitlement management."
   ],
   [
    "How should you identify a partner that uses Microsoft Entra as a connected organization?",
    "By its Entra tenant, which covers all of the tenant's domains."
   ]
  ]
 },
 {
  "t": "Access reviews: groups, apps, access packages and Entra roles; reviewers, recurrence, auto-apply and inactive-user recommendations",
  "hook": "An auditor sits across from you in a glass meeting room at Cedar Valley Health. She slides a printout across the table: a Teams site for a vendor migration that finished two years ago still has 46 guest members, and a former contractor can still open the claims app. 'Who confirmed these people still need access?' she asks. You open your mouth and realize the honest answer is that nobody ever asked. Your manager wants a plan by Friday that will not depend on someone remembering to check. How do you make the right people confirm access on a schedule, and make the removals happen even when they forget to answer?",
  "simple": "Over time people collect access they no longer need, the way a kitchen drawer collects old keys. An access review is a scheduled check where someone looks at a list of who has access to something and answers yes, keep it, or no, remove it. The person answering might be the group owner, the user's manager, or the users themselves. You decide how often the check repeats, such as every three months, and what happens afterward. If you turn on automatic apply, the people marked no lose access without an admin doing anything. Entra can also give hints, such as 'this person has not signed in for months', so reviewers can decide quickly and accurately.",
  "body": [
   "Access tends to accumulate. People change roles and keep their old group memberships, contractors finish and keep their app assignments, and guests complete a project and never leave. Access reviews let the right people periodically confirm whether each user still needs access, and remove it if not. They are part of Microsoft Entra ID Governance and require Microsoft Entra ID P2 or Microsoft Entra ID Governance licensing for the users covered by the review. You create most reviews in the Microsoft Entra admin center under Identity Governance, Access reviews.",
   "Start by knowing what you can review, because exam questions often hinge on where a review is created. Group membership reviews cover security groups and Microsoft 365 groups, including the groups behind Microsoft Teams. You can target a specific group or choose all Microsoft 365 groups with guest users, which sweeps every team that has external members. Application reviews cover users and groups assigned to an enterprise application. Access package assignment reviews are configured inside the access package's policy in entitlement management, so they run automatically for everyone who received that package. Privileged role reviews, for both Microsoft Entra roles and Azure resource roles, are created through Privileged Identity Management (PIM) rather than the general access reviews page. For any of these, you can limit the scope to guest users only, which is a common and low-risk way to start cleaning up external access.",
   "Next, choose who decides. Reviewers can be the group owners, selected users or groups, the managers of the users being reviewed, or the users themselves in a self-review, where each person attests to whether they still need their own access. When you choose managers, you also set a fallback reviewer for users who have no manager listed in the directory, otherwise those users would never be reviewed. Multi-stage reviews chain up to several stages, for example managers first and then the resource owner, and you can let later-stage reviewers see earlier decisions. You can also choose to send only denied or only approved users on to the next stage, so the final reviewer handles a shorter list.",
   "Then decide when and how long. Duration sets how many days reviewers have to respond. Recurrence can be one time, weekly, monthly, quarterly, semi-annually or annually, and the series can run indefinitely, end on a date, or end after a number of occurrences. Shorter durations push reviewers to act, while longer recurrence intervals reduce fatigue. Other settings include requiring a justification when approving, sending email notifications to reviewers when a review starts, and sending reminders partway through.",
   "Upon completion settings decide what happens next, and this is where many exam distractors live. Auto apply results to resource removes denied users automatically when the review ends. If it is off, the results sit in the review until an administrator selects Apply. Separately, the If reviewers don't respond setting decides the outcome for users nobody reviewed: no change, remove access, approve access, or take recommendations. These two settings work together. Auto apply acts on decisions, including the decisions created by the no-response setting. A strict cleanup design turns auto apply on and sets no-response to remove access, so silence leads to removal. A cautious design uses take recommendations, so only users the system flags as inactive are removed when reviewers stay silent.",
   "Decision helpers make reviews faster and more accurate. Recommendations suggest approve or deny next to each user based on signals. The inactive user signal flags people who have not signed in within a set period. User-to-group affiliation flags users whose position in the organization chart is far from the other members of the group, which can reveal someone who joined a team long ago from a different department. You can also scope the review itself to inactive users only, choosing users who have not signed in for a number of days, so reviewers focus on the most likely stale access. Reviewers see these recommendations in the My Access portal or by following the link in the review email, and can accept them in bulk.",
   "Results and history are kept for auditing. Each decision is logged with the reviewer, the decision, the time and any justification, and the audit log records the removals that auto apply performs. You can download review history reports to give auditors evidence that access was checked. A typical design that would satisfy the auditor in the opening scene is a quarterly review of all Microsoft 365 groups with guest users, reviewed by group owners, with a fallback reviewer, recommendations enabled, auto apply results turned on, and remove access if reviewers don't respond. Pair it with an annual review of enterprise application assignments reviewed by managers, and PIM reviews for privileged roles, and every type of access in the tenant has an owner who confirms it."
  ],
  "analogy": "An access review works like a landlord's yearly lease renewal. Each tenant's lease comes up on a schedule, the property manager confirms whether they are staying, and the locks are changed for anyone who is leaving. Auto apply is the locksmith who shows up automatically after the decision, instead of waiting for the landlord to call. The no-response setting is the rule for tenants who never answered the letter: renew, end, or follow the manager's advice. The analogy stops working for privileged roles, which in Entra are reviewed through PIM rather than the regular review page.",
  "terms": [
   [
    "Access review",
    "A scheduled or one-time campaign in which reviewers approve or deny continued access to a group, app, access package or role."
   ],
   [
    "Self-review",
    "An access review where users attest to whether they still need their own access."
   ],
   [
    "Fallback reviewer",
    "The reviewer used when a manager review targets a user who has no manager in the directory."
   ],
   [
    "Auto apply results",
    "A completion setting that automatically removes access that reviewers denied."
   ],
   [
    "If reviewers don't respond",
    "The setting deciding the outcome for unreviewed users: no change, remove access, approve access or take recommendations."
   ],
   [
    "Inactive-user recommendation",
    "A decision helper suggesting denial for users who have not signed in within a defined period."
   ]
  ],
  "example": "Contoso finds 800 guests in Teams from long-finished projects. It creates a quarterly access review of all Microsoft 365 groups with guest users, scoped to guests only, reviewed by group owners with the IT security team as fallback. Recommendations are enabled, auto apply results is on, and If reviewers don't respond is set to remove access. After the first cycle, more than half of the guests are removed automatically, and the downloaded review history goes into the compliance folder.",
  "mistakes": [
   [
    "Turning on auto apply means users nobody reviewed will be removed.",
    "Auto apply only applies decisions. Unreviewed users are handled by the If reviewers don't respond setting, which might be no change."
   ],
   [
    "You create a review of the Global Administrator role from the Access reviews page like any group.",
    "Reviews of Microsoft Entra roles and Azure resource roles are created through Privileged Identity Management."
   ],
   [
    "Manager reviews cover everyone automatically.",
    "Users without a manager attribute need a fallback reviewer, or they will not be reviewed by anyone."
   ],
   [
    "Access reviews are included with any Entra license.",
    "They require Microsoft Entra ID P2 or Microsoft Entra ID Governance licensing for the users in scope."
   ]
  ],
  "tryit": [
   [
    "Riverbend Logistics runs a monthly review of the users assigned to its warehouse management app, reviewed by managers. Auto apply is on and If reviewers don't respond is set to no change. After three cycles, the security team notices that dozens of former seasonal workers still have access, and their managers never opened the review emails. What single change would remove them without punishing users whose managers did respond?",
    "Change If reviewers don't respond to take recommendations, or to remove access if the team accepts that risk. Take recommendations removes users the system flags, such as those who have not signed in recently, while keeping active users. Auto apply then carries out those outcomes. Decisions managers actually made are unaffected."
   ],
   [
    "A team wants employees to confirm their own continued need for a sensitive finance group, with the finance director checking the approvals afterward. Which reviewer design fits?",
    "A multi-stage review: a self-review in the first stage, then the finance director as the second-stage reviewer, who can see the first-stage answers."
   ]
  ],
  "tip": "Auto apply only acts on decisions; the If reviewers don't respond setting decides what happens to users nobody reviewed. Role reviews for Entra roles and Azure resource roles are created through PIM. Access package reviews are set in the package policy. Manager reviews need a fallback reviewer.",
  "check": [
   [
    "Where do you create access reviews for Microsoft Entra roles?",
    "In Privileged Identity Management, which handles reviews of Entra roles and Azure resource roles."
   ],
   [
    "Which setting removes denied users without an admin taking action?",
    "Auto apply results to resource."
   ],
   [
    "What decision helper suggests denying access to someone who hasn't signed in recently?",
    "The inactive user recommendation, based on no sign-in within a set number of days."
   ],
   [
    "What option lets you review guests across every team at once?",
    "A review of all Microsoft 365 groups with guest users, optionally scoped to guest users only."
   ]
  ]
 },
 {
  "t": "Lifecycle workflows for joiner, mover and leaver tasks (employeeHireDate, employeeLeaveDateTime)",
  "hook": "It is the first Monday of the month at Pinecrest Engineering, and Daniel, a new structural engineer, is sitting in the lobby with a laptop he cannot sign in to. His manager emailed the help desk last week, but the ticket was buried. Down the hall, the help desk is also dealing with a report that someone who left in June still received a company-wide email on their personal phone, because their account was never disabled. Both problems trace back to the same thing: people doing identity tasks by memory. HR already knows Daniel's start date and the departed employee's last day. Why can't the directory act on those dates by itself?",
  "simple": "Every employee has a start date and, eventually, a last day. Lifecycle workflows are automatic checklists in Microsoft Entra that run based on those dates. A week before someone starts, a workflow can create a one-time sign-in code and send it to their manager. On the first day, another can turn on the account and add them to the right groups. On the last day, a workflow can turn off the account and remove licenses, and a month later it can delete the account. It is like setting reminders in your phone for a birthday, except the phone also buys the gift. The dates come from HR systems, so nobody has to remember to do the work.",
  "body": [
   "Joiner, mover and leaver (JML) processes are the moments when identity lifecycle mistakes happen. New hires arrive without access on their first day, movers keep the access from their old team, and leavers keep working accounts long after they are gone. Lifecycle workflows, a Microsoft Entra ID Governance feature, automate the tasks around these moments inside Microsoft Entra ID. You find them in the Microsoft Entra admin center under Identity Governance, Lifecycle workflows, and they require Microsoft Entra ID Governance licensing for the users they process.",
   "Every workflow has three parts: a trigger, execution conditions and tasks. The trigger decides when it runs. The most common is a time-based attribute trigger, which combines a date attribute with an offset in days, such as seven days before employeeHireDate, on employeeHireDate, or on employeeLeaveDateTime. Other trigger types include attribute changes, used for movers when something like department or job title changes, and group membership changes, which run when a user is added to or removed from a group. The execution conditions, also called the scope, decide who is processed, using a rule such as department equals Sales or a rule that matches all users. The tasks decide what happens, as an ordered list of built-in actions that run one after another.",
   "Microsoft provides templates so you do not start from a blank page. The templates include onboard pre-hire employee, onboard new hire employee, post-onboarding of an employee, real-time employee termination, pre-offboarding of an employee, offboard an employee on their last day, and post-offboarding of an employee. Each template comes with sensible triggers and tasks you can adjust. Real-time employee termination is different from the rest because it is run on demand for urgent cases rather than waiting for a date.",
   "The built-in tasks cover most identity chores. You can generate a Temporary Access Pass (TAP) and send it to the user's manager, so a new hire can set up passwordless sign-in or register methods on day one without a known password. You can send a welcome email, add the user to selected groups or Teams, enable or disable the account, remove the user from all groups or all Teams, remove all licenses, and delete the user. When the work must reach outside Entra, a custom task extension calls an Azure Logic App. That lets a workflow open a ticket in a service desk tool, notify HR, or update a system that Entra cannot write to directly. The workflow can wait for the Logic App to report back before moving on.",
   "The attributes are the heart of the design, so understand where they come from. employeeHireDate holds the user's start date, and employeeLeaveDateTime holds the date and time the user leaves. They can be set by human resources (HR) driven inbound provisioning from systems such as Workday or SuccessFactors, by synchronization from on-premises Active Directory (AD) using an attribute mapped in Microsoft Entra Connect or Cloud Sync, or directly through Microsoft Graph. employeeLeaveDateTime is treated as sensitive, because changing it can trigger an offboarding workflow that disables someone. For that reason, setting it through Graph requires a specific lifecycle information permission in addition to normal user write permissions. Dates are stored in Coordinated Universal Time (UTC), so think about time zones when choosing offsets. A user in a time zone far from UTC might otherwise be processed a day earlier or later than expected.",
   "Workflows run on a schedule, every few hours by default, and the interval can be adjusted in the lifecycle workflow settings. Each scheduled run checks which users meet the trigger and scope, then processes them. You can also run a workflow on demand for selected users, which is the safest way to test. A new workflow can be created with its schedule turned off, so you can run it against a test account, read the results, and only then enable the schedule. Every run records results per user and per task in the workflow's history, so when a manager says the TAP never arrived, you can see whether the task succeeded, failed or never ran because the user was out of scope.",
   "Finally, place lifecycle workflows in the bigger picture. They handle tasks inside Entra. HR-driven provisioning creates and updates the user accounts and their attributes, and entitlement management grants access packages with approvals and expirations. Lifecycle workflows can even request or remove access package assignments as part of their tasks in some configurations, but they do not replace either feature. Together, the three give a hire-to-retire process with minimal manual effort: HR enters the date, provisioning writes it to the user, and lifecycle workflows act on it."
  ],
  "analogy": "A lifecycle workflow is like a train timetable with an automated station crew. The date attribute is the scheduled arrival, the offset is how many days before or after the crew starts preparing, the scope decides which trains this crew handles, and the tasks are the jobs they always do in order. The timetable itself comes from HR, not the crew. Where the analogy weakens: the crew only checks the board every few hours, so a change in the timetable is not acted on instantly.",
  "mnemonic": "Trigger, Scope, Tasks answers When, Who, What. Read a workflow in that order: when does it fire, who does it touch, what does it do.",
  "terms": [
   [
    "Lifecycle workflow",
    "An automated set of tasks in Entra ID triggered by joiner, mover or leaver events."
   ],
   [
    "employeeHireDate",
    "The user attribute holding the start date, used to trigger onboarding workflows."
   ],
   [
    "employeeLeaveDateTime",
    "The user attribute holding the departure date and time, used to trigger offboarding workflows; setting it through Graph needs an extra lifecycle permission."
   ],
   [
    "Execution conditions",
    "The scope rule that determines which users a lifecycle workflow applies to."
   ],
   [
    "Custom task extension",
    "A workflow task that calls an Azure Logic App to perform actions outside the built-in tasks."
   ],
   [
    "Temporary Access Pass",
    "A time-limited passcode that lets a user sign in and register authentication methods, often generated for new hires."
   ]
  ],
  "example": "HR provisioning sets a new engineer's employeeHireDate to the first of next month. A pre-hire workflow scoped to department equals Engineering runs seven days before and generates a Temporary Access Pass sent to her manager. On her start date, an onboarding workflow enables the account, sends a welcome email and adds her to the Engineering groups and team. Two years later, when employeeLeaveDateTime arrives, an offboarding workflow disables her account, removes her from all groups and Teams and removes her licenses, and a post-offboarding workflow deletes the account 30 days after.",
  "mistakes": [
   [
    "Lifecycle workflows create user accounts from the HR system.",
    "HR-driven inbound provisioning creates and updates accounts. Lifecycle workflows act on accounts that already exist."
   ],
   [
    "Any admin with user write permission can set employeeLeaveDateTime through Graph.",
    "Because it can trigger offboarding, setting it requires an additional lifecycle permission beyond normal user write permissions."
   ],
   [
    "A workflow runs the instant its trigger date is reached.",
    "Workflows are evaluated on a schedule, every few hours by default, or on demand. Dates are also stored in UTC, which affects timing."
   ],
   [
    "Lifecycle workflows are included in Microsoft Entra ID P2.",
    "They require Microsoft Entra ID Governance licensing."
   ]
  ],
  "tryit": [
   [
    "Maplewood Foods wants every leaver's ticket in its external service desk tool to be closed automatically, and the departing user removed from all groups, on their last day. The service desk tool has an API but no Entra integration. A junior admin proposes building a separate scheduled script. What would you recommend instead?",
    "Create an offboarding workflow triggered on employeeLeaveDateTime with a zero-day offset, include the built-in remove from all groups task, and add a custom task extension that calls an Azure Logic App to update the service desk tool. Everything stays in one workflow with per-user history."
   ],
   [
    "You have built a new pre-hire workflow but are nervous it could send TAPs to the wrong managers. How do you test it safely?",
    "Create it with the schedule turned off, run it on demand for a test user, review the per-task results in the workflow history, and then enable the schedule."
   ]
  ],
  "tip": "Time-based triggers use a date attribute plus an offset. Onboarding pairs with employeeHireDate, offboarding with employeeLeaveDateTime, and setting employeeLeaveDateTime through Graph needs special permission. Reaching outside Entra means a custom task extension and a Logic App. Lifecycle workflows need Microsoft Entra ID Governance licensing.",
  "check": [
   [
    "Which attribute would trigger a workflow that runs on an employee's last day?",
    "employeeLeaveDateTime, with an offset of zero days."
   ],
   [
    "How can a lifecycle workflow perform an action in a system outside Entra ID?",
    "By using a custom task extension that calls an Azure Logic App."
   ],
   [
    "Which task would give a new hire a way to set up passwordless sign-in on day one?",
    "Generate a Temporary Access Pass and send it to the user's manager."
   ],
   [
    "What are the three parts of a lifecycle workflow?",
    "The trigger (when), the execution conditions or scope (who), and the tasks (what)."
   ]
  ]
 },
 {
  "t": "Terms of use and Conditional Access",
  "hook": "The general counsel at Silverline Biotech forwards you an email at 4:45 p.m. A research partner's contractor shared a confidential compound report, and the partner's lawyers are arguing that their contractor never agreed to any confidentiality terms. 'Can you prove that every guest accepted our non-disclosure agreement before opening anything?' she asks. You check. The NDA lives in a PDF on a SharePoint page that guests are supposed to read. There is no record of who read it, which version, or when. Tomorrow, a new group of partner scientists gets access. How do you make sure none of them can open a single file without accepting the agreement first, and keep proof that they did?",
  "simple": "Some organizations need people to agree to rules before they get in, like signing a visitor log that says you will keep things confidential. In Microsoft Entra, terms of use lets you upload a document, such as a PDF of the rules, and show it to people when they sign in. They must click Accept to continue, and Entra writes down who accepted, which version, and when. The terms do nothing by themselves, though. You connect them to a Conditional Access policy, which is a rule like 'all guests using any app must accept these terms'. If someone declines, they are blocked. It is the digital version of 'sign here before you enter'.",
  "body": [
   "Organizations often need users to accept legal terms before accessing resources. Examples include an acceptable use policy for employees, a non-disclosure agreement (NDA) for guests, or a regulatory notice required in a particular country. Microsoft Entra terms of use presents those documents at sign-in, records who accepted which version and when, and enforces acceptance through Conditional Access. Because enforcement depends on Conditional Access, the feature requires Microsoft Entra ID P1 for the users it applies to.",
   "You create terms of use in the Microsoft Entra admin center under Conditional Access, Terms of use. Each terms of use object holds one or more PDF documents. You choose a default language and can add more languages, and users see the version that matches their browser language, falling back to the default. Several settings shape the experience. Require users to expand the terms of use forces users to open and view the document before the Accept button works, which strengthens the claim that they had a chance to read it. Require users to consent on every device records acceptance per device instead of once per user. That option requires the device to be registered in Microsoft Entra ID, and some platforms and browsers have limitations, so test it before using it broadly.",
   "Two settings handle re-acceptance, and the exam expects you to tell them apart. Expire consents makes everyone reaccept on a fixed schedule that starts from a date you choose, for example annually starting January 1, so the whole population resets together. Duration before re-acceptance required counts a number of days from each user's own acceptance, so a person who accepted in March is prompted again in March of the next cycle while someone who accepted in July is prompted in July. Use expire consents when a legal or compliance calendar drives the requirement, and duration before re-acceptance when you simply want each person to reconfirm periodically. They can also be combined.",
   "Terms of use do not do anything on their own, which is the most important point in this lesson. You enforce them by creating a Conditional Access policy whose grant control includes the terms of use you created. The policy's assignments decide who must accept and for which apps. You might target all guest and external users accessing all cloud apps, all employees accessing the human resources app, or members of a specific group accessing a research portal. When the policy applies, users see the document after signing in and must accept to continue; declining blocks access. You can create the policy directly from the terms of use page, which pre-fills the grant control, or add the terms as a grant control in any existing Conditional Access policy. Terms can be combined with other grant controls, such as requiring multifactor authentication (MFA), with the policy set to require all selected controls.",
   "When acceptance is not being prompted, troubleshoot the policy rather than the terms. Check that the policy is turned on rather than set to report-only, that the user or guest is included and not excluded, that the app being opened is in scope, and that the sign-in actually reaches Conditional Access evaluation. The What If tool in Conditional Access is useful for confirming whether a policy would apply to a given user and app.",
   "Reporting and auditing are built in, which is what legal teams usually care about most. Each terms of use object shows the number of users who accepted and declined, and you can open the details to see each user, the version they accepted and the time of acceptance. Acceptance and decline events are recorded in the Microsoft Entra audit log, so you can export them or send them to a Log Analytics workspace for long-term retention. Users can also review the terms they have accepted from their own account portal.",
   "Updating the terms is handled with versions. When you upload a new version of the PDF, you choose whether to require reacceptance. If you do, everyone in scope must accept the new version at their next sign-in, and the reports track acceptance of each version separately. You cannot delete a terms of use object while a Conditional Access policy still references it; remove it from the policy first. A common design that answers the opening scenario is a guest NDA: a terms of use object holding the NDA PDF with expanded view required, consents set to expire annually, and a Conditional Access policy targeting guest and external users for all cloud apps, so no partner can access anything without accepting and every acceptance is recorded."
  ],
  "analogy": "Terms of use are like a sign-in sheet at a laboratory door, and Conditional Access is the security guard. The sheet records who signed and when, but it cannot stop anyone by itself. Only when the guard is told 'nobody enters this lab without signing' does it actually control entry. Expire consents is like the lab reprinting the sheet every January for everyone; duration before re-acceptance is like each visitor's badge expiring a year after their own first visit.",
  "terms": [
   [
    "Terms of use",
    "An Entra feature that presents PDF documents users must accept, enforced through a Conditional Access grant control."
   ],
   [
    "Require users to expand",
    "A terms of use setting forcing users to open the document before they can accept it."
   ],
   [
    "Require users to consent on every device",
    "A setting that records acceptance per registered device instead of once per user."
   ],
   [
    "Expire consents",
    "A setting that requires all users to reaccept on a recurring schedule from a chosen start date."
   ],
   [
    "Duration before re-acceptance",
    "A setting that requires each user to reaccept a set number of days after their own acceptance."
   ],
   [
    "Terms of use grant control",
    "The Conditional Access grant option requiring acceptance of a specific terms of use."
   ]
  ],
  "example": "A pharmaceutical company requires all guests to accept a confidentiality agreement. The admin uploads the agreement PDF in English and German, requires users to expand it and sets consents to expire yearly from January 1. A Conditional Access policy targeting guest and external users for all cloud apps grants access only when the terms are accepted. A German partner sees the German version, accepts, and continues; a guest who declines is blocked. The legal team exports the acceptance report each quarter and the audit log entries are kept in Log Analytics.",
  "mistakes": [
   [
    "Creating a terms of use object is enough to make users accept it.",
    "Terms of use are only enforced through a Conditional Access policy that uses them as a grant control."
   ],
   [
    "Expire consents and duration before re-acceptance do the same thing.",
    "Expire consents resets everyone on a shared schedule from a start date; duration before re-acceptance counts days from each user's own acceptance."
   ],
   [
    "Terms of use work with Microsoft Entra ID Free.",
    "They rely on Conditional Access, which requires Microsoft Entra ID P1."
   ],
   [
    "You can delete old terms of use at any time.",
    "Deletion is blocked while a Conditional Access policy still references the terms; remove them from the policy first."
   ]
  ],
  "tryit": [
   [
    "Elmstead University's legal office wants students to accept an acceptable use policy once per year, with all acceptances resetting on August 1 to match the academic calendar. Staff must accept a separate data handling agreement 180 days after each person's previous acceptance. Which re-acceptance setting fits each, and what else is needed?",
    "Use expire consents with a start date of August 1 and an annual frequency for the student policy, because the whole population resets together. Use duration before re-acceptance set to 180 days for staff, because it counts from each user's own acceptance. Each set of terms then needs a Conditional Access policy with the terms as a grant control, targeting the right users and apps."
   ]
  ],
  "tip": "Terms of use are enforced only through a Conditional Access grant control, so if acceptance isn't being prompted, check the policy's state and assignments. Expire consents resets everyone on a schedule; duration before re-acceptance is per user from their own acceptance date. Acceptance proof lives in the terms of use details and the audit log.",
  "check": [
   [
    "How do you force users to accept terms of use before accessing an app?",
    "Create a Conditional Access policy for those users and the app whose grant control requires the terms of use."
   ],
   [
    "Which setting ensures users actually open the document before accepting?",
    "Require users to expand the terms of use."
   ],
   [
    "Where can you prove when a specific user accepted the terms?",
    "In the terms of use acceptance details and in the audit log."
   ],
   [
    "What license does terms of use require?",
    "Microsoft Entra ID P1, because it is enforced through Conditional Access."
   ]
  ]
 },
 {
  "t": "Privileged Identity Management (PIM): eligible vs active assignments, activation settings, approval, alerts",
  "hook": "At 2:10 a.m., the security on-call phone buzzes for Marcus at Granite Insurance. A sign-in from an unfamiliar country succeeded against a help desk lead's account, and that account holds the Exchange Administrator role permanently. Marcus races to disable it and starts wondering how many mailbox rules were changed in the minutes before he arrived. In the morning review, the CISO asks a pointed question: why did this person have powerful admin rights at 2 a.m. on a Sunday when they only use them a few times a month? What if admin roles were switched off by default and only turned on, briefly and with checks, when someone actually needed them?",
  "simple": "Giving someone permanent admin rights is like handing them a master key they carry everywhere, even to the grocery store. If the key is stolen, the thief can open every door. Privileged Identity Management, or PIM, changes that. Admins are marked as eligible for a role, which means they can ask to turn it on when needed. When they turn it on, called activation, they might have to prove who they are again, explain why, give a ticket number, or wait for a manager to approve. The role then switches off automatically after a few hours. Most of the time, nobody holds the master key, so a stolen password is far less dangerous.",
  "body": [
   "Standing privilege, where admins hold powerful roles all the time, means that any compromise of an admin account immediately gives an attacker those powers. Microsoft Entra Privileged Identity Management (PIM) reduces that risk with just-in-time access: admins hold roles only when they need them, for a limited time, with checks along the way. PIM requires Microsoft Entra ID P2 or Microsoft Entra ID Governance licensing for the users who benefit from it, such as the admins who are made eligible and the approvers. You manage it in the Microsoft Entra admin center under Identity Governance, Privileged Identity Management.",
   "The central distinction is between eligible and active assignments. An eligible assignment means the user can activate the role when needed but does not have its permissions until they do. An active assignment means the user has the role's permissions now, with no activation step. Both kinds can be permanent or time-bound, with a start and end date, which gives four combinations. The recommended pattern is eligible, time-bound assignments for most admins, so that even the right to activate expires and must be renewed. Active permanent assignments should be reserved for emergency access accounts, sometimes called break-glass accounts, which must work even if PIM, MFA or Conditional Access fails. If you see a question about who should hold an active permanent Global Administrator assignment, emergency access accounts are the expected answer.",
   "Activation is the just-in-time step. The user opens PIM, selects My roles, finds the role on the Eligible assignments tab and chooses Activate. They provide whatever the role's settings demand and pick a duration up to the allowed maximum. Once activated, the role appears under Active assignments with an end time, and it is removed automatically when that time passes. The user can also deactivate it early when the work is done, which is a good habit worth teaching to every admin.",
   "Role settings are configured per role, so Global Administrator can be much stricter than Helpdesk Administrator. On activation, you can set the activation maximum duration, between 1 and 24 hours. You can require multifactor authentication (MFA), or require a Conditional Access authentication context, which lets a Conditional Access policy demand something stronger such as phishing-resistant MFA or a compliant device only for that sensitive activation. You can require justification text, require ticket information such as a change request number and ticketing system, and require approval to activate with selected approvers. Assignment settings control whether permanent eligible or permanent active assignments are allowed, the maximum assignment duration when they are not, and whether MFA and justification are needed when an admin creates an active assignment. Notification settings decide who receives email when roles are assigned, when eligible members activate, and when approvals are needed, separately for admins, assignees and approvers.",
   "Approval adds a second person. When a role requires approval, the activation request goes to the configured approvers, who see it in PIM's Approve requests page and in an email, and approve or deny it with a justification. Approvers do not need to hold the role themselves; a security lead can approve Global Administrator activations without being one. If no approvers are selected, the request goes to Privileged Role Administrators and Global Administrators by default. Until someone approves, the user does not have the role, so plan for approver availability across time zones and holidays, and avoid single approvers for roles needed during incidents. Users can also request to extend an assignment that is about to expire or renew one that has expired, which an administrator must approve.",
   "PIM alerts highlight risky configurations, and you view them on PIM's Alerts page for Microsoft Entra roles. Alerts include too many Global Administrators, roles being assigned outside of PIM, roles that do not require MFA for activation, administrators who are not using their privileged roles, and potential stale accounts in privileged roles. Each alert explains the risk, lists the affected users or roles, and suggests a fix, such as converting active assignments to eligible or removing unused roles. Some alerts can be configured with thresholds, such as the number of Global Administrators that triggers a warning.",
   "Monitoring and accountability complete the picture. PIM keeps an audit history of assignments, activations, approvals and setting changes, and the same events appear in the Microsoft Entra audit log for export. You can also create access reviews of role assignments from PIM, so eligible assignments are periodically confirmed as well. Managing PIM itself, including role settings and assignments, requires the Privileged Role Administrator or Global Administrator role. In a mature tenant, most admin work happens through short activations logged in PIM, and the number of people with active privileged roles at any given moment is close to zero, apart from the emergency access accounts."
  ],
  "analogy": "PIM is like a hotel safe-deposit room. Eligible staff are on the list of people allowed to request the key, but they do not carry it. To get it, they show ID again (MFA), write the reason in a logbook (justification and ticket), and for the most valuable boxes a manager must countersign (approval). The key is lent for a set number of hours and must be returned. An active permanent assignment is the one spare key locked in the owner's emergency envelope.",
  "terms": [
   [
    "Privileged Identity Management",
    "An Entra service providing just-in-time, time-bound and approval-based privileged role access."
   ],
   [
    "Eligible assignment",
    "A role assignment the user must activate before gaining the role's permissions."
   ],
   [
    "Active assignment",
    "A role assignment that grants permissions immediately without activation."
   ],
   [
    "Activation",
    "The just-in-time step where an eligible user turns on a role for a limited duration, meeting any required checks."
   ],
   [
    "Authentication context",
    "A Conditional Access label that PIM can require on activation so a policy can demand stronger controls for sensitive roles."
   ],
   [
    "PIM alert",
    "A warning about risky privileged access configuration, such as too many Global Administrators."
   ]
  ],
  "example": "Contoso makes all Exchange Administrators eligible rather than active, with eligibility expiring after six months. Activation lasts up to four hours and requires MFA, justification and a ticket number. For Global Administrator, activation requires an authentication context tied to phishing-resistant MFA and approval from the security lead or a deputy. When an admin activates the Exchange role to fix a mailbox issue, the security team receives a notification, and the role expires automatically at the end of the window. Two emergency access accounts keep active permanent Global Administrator assignments.",
  "mistakes": [
   [
    "Eligible means the user already has the role but it is monitored.",
    "Eligible users have no permissions until they activate. Active is the state that grants permissions now."
   ],
   [
    "Approvers must hold the role they are approving.",
    "Approvers can be any selected users or groups. They do not need the role themselves."
   ],
   [
    "Activation settings are set once for the whole tenant.",
    "Settings are configured per role, so each role can have its own duration, MFA, justification, ticket and approval requirements."
   ],
   [
    "Emergency access accounts should be eligible like everyone else.",
    "Emergency access accounts are the standard exception and keep active permanent assignments so they work when other controls fail."
   ]
  ],
  "tryit": [
   [
    "Bayview Hospital wants its Security Administrators to prove they are on a compliant device and use phishing-resistant MFA, but only when they activate the role, not for normal sign-ins. A colleague suggests turning on Require MFA on activation. Is that enough, and what would you configure?",
    "Require MFA on activation only checks for MFA. To demand phishing-resistant methods and a compliant device for activation specifically, create a Conditional Access authentication context, build a Conditional Access policy that targets that context with those grant controls, and set the Security Administrator role in PIM to require that authentication context on activation."
   ],
   [
    "An auditor notices six people have active permanent Global Administrator assignments, two of them emergency access accounts. What would PIM likely be showing, and what should you change?",
    "PIM would likely raise alerts such as roles being assigned outside of PIM or too many Global Administrators, depending on thresholds. Convert the four non-emergency assignments to eligible, time-bound assignments with strong activation settings, and keep only the emergency access accounts active."
   ]
  ],
  "tip": "Eligible means must activate; active means has it now. Settings like MFA or authentication context, justification, ticket and approval apply at activation and are configured per role. Maximum activation duration is 1 to 24 hours. Only emergency access accounts should be active permanent.",
  "check": [
   [
    "What is the difference between an eligible and an active role assignment in PIM?",
    "Eligible requires the user to activate the role before using it; active grants the permissions immediately."
   ],
   [
    "Where do you configure that the Security Administrator role requires approval to activate?",
    "In PIM, in the role settings for Security Administrator, by enabling Require approval to activate and choosing approvers."
   ],
   [
    "Name two PIM alerts.",
    "Any two of: too many Global Administrators, roles assigned outside of PIM, roles don't require MFA for activation, administrators aren't using their privileged roles, potential stale accounts in privileged roles."
   ],
   [
    "Which roles can manage PIM role settings and assignments?",
    "Privileged Role Administrator or Global Administrator."
   ]
  ]
 },
 {
  "t": "PIM for Groups and PIM for Azure resource roles",
  "hook": "Tomás leads the messaging team at Northshore Transit. Every time a mail flow problem crosses into Teams, his admins have to activate two separate roles in PIM, fill in two justifications and wait for two approvals while users complain. Meanwhile, the cloud team holds Owner on the production Azure subscription around the clock, because 'that's how the subscription was set up three years ago'. A recent internal audit flagged both: too much friction for the messaging admins and far too much standing power for the cloud team. Can the just-in-time approach that already protects Entra roles also cover bundles of roles and Azure subscriptions, without making daily work harder?",
  "simple": "PIM is the tool that keeps admin powers switched off until someone needs them. It does not only work for directory admin roles. With PIM for Groups, you can make someone eligible to join a group for a few hours. If that group carries several admin roles or app access, joining it turns all of them on at once, with one request. With PIM for Azure resources, you can do the same for powerful Azure roles like Owner on a subscription, which controls virtual machines, storage and billing. It is like having one temporary badge that opens a whole floor, instead of asking for a separate key for every door, and the badge still expires.",
  "body": [
   "Privileged Identity Management (PIM) is not limited to Microsoft Entra roles. Two more scopes use the same eligible and active model, the same activation checks and the same approval flow. PIM for Groups makes group membership or ownership just-in-time. PIM for Azure resources does the same for Azure role-based access control (RBAC) roles on management groups, subscriptions, resource groups and individual resources. On the exam, the hard part is usually choosing which of the three scopes fits a scenario, so keep the question 'where does the access actually come from?' in mind throughout this lesson.",
   "PIM for Groups lets you make a user an eligible member or an eligible owner of a group, so they join the group only when they activate and leave it automatically when the activation ends. Groups can carry many things: a Microsoft Entra role assignment if the group is role-assignable, Azure RBAC role assignments, enterprise application assignments, access to SharePoint sites or data, and even Conditional Access targeting. Just-in-time membership therefore becomes just-in-time access to everything the group grants, all at once. Supported groups are security groups and Microsoft 365 groups. Dynamic membership groups and groups synchronized from on-premises Active Directory (AD) are not supported, because their membership is controlled by rules or by the source directory, so PIM could not add and remove members on its own schedule.",
   "Role-assignable groups are the common case for bundling several Entra roles. A role-assignable group is created with the option to allow Microsoft Entra roles to be assigned to it, and that choice can only be made when the group is created. You might create one role-assignable group holding Exchange Administrator and Teams Administrator, then make messaging administrators eligible members. One activation, with one justification and one approval, gives them both roles for the activation window. Because such groups grant directory power, they are protected: only Privileged Role Administrators, Global Administrators and the group's owners can manage their membership, which prevents someone with ordinary group management rights from escalating their privileges by adding themselves.",
   "You enable a group for PIM from the group's Privileged Identity Management page, or from PIM, Groups, by selecting the group and bringing it under management. Member and owner have separate role settings, so you can, for example, require approval for membership but allow owners to activate with only MFA and justification. The activation settings mirror PIM for Entra roles: maximum duration, multifactor authentication (MFA) or a Conditional Access authentication context, justification, ticket information, approval and notifications, plus assignment rules about permanent or time-bound eligibility. Users activate from PIM, My roles, Groups, and the activation shows up as a temporary membership that disappears at the end time.",
   "PIM for Azure resources covers Azure RBAC roles such as Owner, Contributor, User Access Administrator and any custom role you have defined. Assignments can be made at management group, subscription, resource group or resource scope. Before you can manage a resource in PIM, it must be discovered and onboarded. You do this from PIM, Azure resources, by choosing Discover resources and selecting the management groups or subscriptions to manage. The person onboarding needs permission to manage role assignments on that scope, such as Owner or User Access Administrator. Once onboarded, you convert standing assignments to eligible ones, configure role settings for each role at that scope and use the same activation, approval and alerts as for Entra roles.",
   "Azure RBAC inheritance matters when you design eligibility. Assignments flow down the Azure hierarchy, so an eligible Owner on a subscription can manage every resource group and resource in it after activation, and an eligible role at a management group reaches every subscription beneath it. Assign at the narrowest scope that still lets people do their job. The roles most worth making eligible are Owner and User Access Administrator, because both can grant access to others; Contributor is also powerful because it can change and delete resources. Remember that Azure RBAC roles control Azure resources, while Microsoft Entra roles control the directory. A Global Administrator does not automatically have Owner on subscriptions, although they can elevate their access to manage all Azure subscriptions, an action that is itself logged.",
   "Governance features apply to these scopes as well. Access reviews can target PIM-managed groups and Azure resource role assignments, so eligible members and owners are periodically confirmed. The PIM audit history records every assignment, activation and approval for each scope. To choose the right scope in a scenario, use this rule: pick an Entra role in PIM for directory administration such as managing users or Exchange, pick PIM for Groups when access flows from group membership or when several roles should be activated together, and pick PIM for Azure resources for subscription and resource management."
  ],
  "analogy": "Think of PIM for Groups as a temporary all-access wristband at a conference. Instead of requesting separate tickets for each workshop room, you request the wristband once, and every room linked to it opens until the wristband expires. PIM for Azure resources is more like a building key that works on one floor and every room below it on that wing, because Azure permissions flow downward. The wristband analogy stops at dynamic groups: a wristband handed out automatically by a rule cannot also be a temporary pass you activate.",
  "terms": [
   [
    "PIM for Groups",
    "Just-in-time eligible membership or ownership of security or Microsoft 365 groups."
   ],
   [
    "Role-assignable group",
    "A group created with the option to hold Microsoft Entra role assignments, whose membership only privileged roles and owners can manage."
   ],
   [
    "PIM for Azure resources",
    "Just-in-time eligible assignment of Azure RBAC roles at management group, subscription, resource group or resource scope."
   ],
   [
    "Discovery and onboarding",
    "The step that brings Azure management groups, subscriptions or resources under PIM management."
   ],
   [
    "Eligible member",
    "A user who can activate group membership for a limited time through PIM."
   ],
   [
    "Role inheritance",
    "Azure RBAC behavior where a role assigned at a higher scope applies to all child scopes."
   ]
  ],
  "example": "Contoso's cloud team needs Owner on the production subscription only during changes. The admin discovers and onboards the subscription into PIM, removes the standing Owner assignments and makes the team eligible Owners requiring approval and a ticket number, with a two-hour maximum. Separately, a role-assignable group holding Exchange Administrator and Teams Administrator is enabled for PIM, and messaging admins become eligible members. They now activate both roles with a single request and justification, and both roles drop off when the activation ends.",
  "mistakes": [
   [
    "Any group, including dynamic groups, can be managed with PIM for Groups.",
    "Dynamic membership groups and groups synced from on-premises AD are not supported, because rules or the source directory control their membership."
   ],
   [
    "You can create eligible Azure role assignments in PIM as soon as you open the Azure resources page.",
    "The management group, subscription or resource must first be discovered and onboarded by someone who can manage role assignments there."
   ],
   [
    "Making a user an eligible member of a regular group can grant Entra roles.",
    "Entra roles can only be assigned to role-assignable groups, and that option must be chosen when the group is created."
   ],
   [
    "An eligible Owner on a resource group can manage the whole subscription after activation.",
    "RBAC inherits downward only. A resource group assignment does not reach the parent subscription."
   ]
  ],
  "tryit": [
   [
    "Lakeside Bank's data team needs temporary access to an Azure SQL resource group, a Power BI workspace backed by a security group, and a line-of-business app assignment, always together and usually for one afternoon. A colleague suggests three separate PIM eligible assignments. What simpler design would you propose?",
    "Grant the RBAC role on the resource group, the workspace access and the app assignment to a single security group, then enable that group for PIM for Groups and make the data team eligible members. One activation gives all three for the activation window, and all three disappear when it ends."
   ],
   [
    "A subscription Owner wants to make the operations team eligible for Contributor, but PIM shows no subscriptions to choose from. What is the likely reason and fix?",
    "The subscription has not been discovered and onboarded in PIM for Azure resources. Someone with permission to manage role assignments on it, such as the Owner, uses Discover resources to onboard it, then creates the eligible assignment."
   ]
  ],
  "tip": "PIM for Groups doesn't support dynamic or on-premises synced groups. Bundle several Entra roles with a role-assignable group plus eligible membership. Azure resources must be discovered and onboarded before they can be managed in PIM, and RBAC inherits downward. Owner and User Access Administrator are the Azure roles most worth making eligible.",
  "check": [
   [
    "Can you enable PIM for a dynamic membership group?",
    "No. PIM for Groups doesn't support dynamic groups or groups synchronized from on-premises AD."
   ],
   [
    "What must you do before creating eligible assignments for a subscription in PIM?",
    "Discover and onboard the subscription (or resource) in PIM for Azure resources."
   ],
   [
    "How can one activation grant several Entra roles at once?",
    "Assign the roles to a role-assignable group and make the user an eligible member of that group with PIM for Groups."
   ],
   [
    "Can member and owner of a PIM-managed group have different activation settings?",
    "Yes. Member and owner have separate role settings."
   ]
  ]
 },
 {
  "t": "Sign-in, audit and provisioning logs; default retention and diagnostic settings to Log Analytics, storage or Event Hubs",
  "hook": "Rachel, the incident lead at Oakridge Credit, is on a bridge call at 9 p.m. A finance user reported that their MFA phone number changed without their knowledge six weeks ago, and money transfer approvals may have been redirected. Rachel opens the Microsoft Entra admin center to find who made the change and from which IP address. The audit log shows nothing older than 30 days. The sign-in history is gone too. The company's security information and event management (SIEM) tool never received identity logs, because nobody connected it. The evidence she needs existed once. How do you make sure that the next time someone asks, the logs are still there and in the right tool?",
  "simple": "Microsoft Entra keeps three main diaries. The sign-in diary records every time someone or something tries to log in: who, to which app, from where, and whether it worked. The audit diary records every change, such as someone being added to a group or a password being reset. The provisioning diary records what Entra created or changed in other connected apps. The admin portal only keeps these diaries for a short time, a week on the free plan and about a month on paid plans. To keep them longer, you set up an export, called a diagnostic setting, that copies the diaries to a place you choose: a searchable database, cheap long-term storage, or a live stream to another security tool.",
  "body": [
   "Microsoft Entra ID records three main kinds of activity logs, and knowing which log answers which question saves time on the exam and in real incidents. Sign-in logs answer who signed in, to what, from where, how and with what result. Audit logs answer who changed what in the directory. Provisioning logs answer what the provisioning service created, updated or deleted in target systems. You find all three under Monitoring and health in the Microsoft Entra admin center, and each opens with filters for date range, user, application and status.",
   "Sign-in logs are divided into categories that you will see as separate tabs and separate export options. Interactive user sign-ins are those where the user provided a factor, such as a password, a multifactor authentication (MFA) approval or a passkey. Non-interactive user sign-ins are performed by a client on the user's behalf, for example when an app uses a refresh token to get a new access token without prompting; there are usually far more of these than interactive ones. Service principal sign-ins are apps authenticating with their own credentials, such as a client secret or certificate. Managed identity sign-ins are Azure resources authenticating with a managed identity. Each entry includes the user or app, the target application, IP address, location, device details, authentication details showing which methods were used, Conditional Access results showing which policies applied and whether they passed, and an error code when the sign-in failed. A single sign-in entry is often enough to explain why a user was blocked.",
   "Audit logs record changes by service and category, including user and group management, role assignments, application and service principal changes, policy updates, password resets and authentication method changes. Each entry shows the activity, such as Add member to group or Update user, the initiator, which might be a user or an app, the target, and the modified properties with old and new values. That is exactly what Rachel needed: an Update user entry showing the phone method change, the initiator and the time. Provisioning logs record actions from automatic app provisioning to software as a service (SaaS) apps, HR-driven inbound provisioning and cross-tenant synchronization. Each entry has step-by-step details of import, matching, action and result, which helps explain why a user was skipped or failed to provision.",
   "Retention in the admin center is limited, and the exam expects the numbers. With the Microsoft Entra ID Free edition, activity reports are kept for 7 days. With Microsoft Entra ID P1 or P2, sign-in and audit logs are kept for 30 days. If you need longer history, correlation with other data or alerting, you must export the logs yourself, and exporting sign-in logs requires a P1 or P2 license. Older entries are not recoverable after they age out, so export is something you set up before an incident, not after.",
   "Export is configured under Monitoring and health, Diagnostic settings. A diagnostic setting selects log categories and one or more destinations. Categories include AuditLogs, SignInLogs, NonInteractiveUserSignInLogs, ServicePrincipalSignInLogs, ManagedIdentitySignInLogs, ProvisioningLogs, RiskyUsers and UserRiskEvents, among others. Each category is a separate checkbox, so a setting that includes SignInLogs does not automatically include non-interactive sign-ins; you must select them explicitly.",
   "Each destination serves a different purpose. A Log Analytics workspace stores logs for Kusto Query Language (KQL) queries, workbooks and Azure Monitor alert rules, and it is the foundation for Microsoft Sentinel. An Azure storage account provides low-cost, long-term archiving, which suits compliance requirements to keep logs for years; lifecycle management rules can move or delete old blobs. An Azure Event Hub streams logs in near real time to a third-party security information and event management (SIEM) tool or any other consumer that reads from it. A partner solution destination is also available for supported integrations. You can create several diagnostic settings to send different categories to different places, for example everything to storage for long retention and sign-ins plus audit logs to Log Analytics for day-to-day analysis.",
   "Permissions and retention at the destination complete the design. Configuring diagnostic settings requires the Security Administrator or Global Administrator role in Entra, plus permissions on the destination Azure resource, such as rights to write to the workspace, storage account or Event Hub namespace. Retention after export is controlled at the destination, for example by the Log Analytics workspace's retention setting or a storage lifecycle policy, not by Entra. Microsoft Graph application programming interfaces (APIs) also expose sign-in, audit and provisioning logs within the portal retention window, which is useful for scripted reporting. Had Oakridge sent AuditLogs and all sign-in categories to a storage account and to Log Analytics, Rachel could have answered her question in a few minutes."
  ],
  "analogy": "The three Entra logs are like a building's records. Sign-in logs are the door badge reader: who tried to enter, which door, when, and whether it opened. Audit logs are the facilities change book: who rekeyed a lock or added a name to the access list. Provisioning logs are the courier receipts for badges sent to partner buildings. The front desk only keeps these records for a few weeks; diagnostic settings are your standing order to copy them to an archive room, an investigator's desk, or a live feed to an outside security firm.",
  "mnemonic": "For destinations, think Look, Keep, Stream: Log Analytics to look (query, workbooks, alerts), a storage account to keep (cheap long-term archive), Event Hub to stream (near real time to a SIEM).",
  "terms": [
   [
    "Sign-in logs",
    "Records of authentication events, split into interactive, non-interactive, service principal and managed identity sign-ins."
   ],
   [
    "Audit logs",
    "Records of directory changes showing the activity, initiator, target and modified properties with old and new values."
   ],
   [
    "Provisioning logs",
    "Records of actions taken by provisioning services in target systems, with step-by-step details."
   ],
   [
    "Diagnostic setting",
    "A configuration that exports selected Entra log categories to Log Analytics, storage, Event Hubs or a partner solution."
   ],
   [
    "Log Analytics workspace",
    "An Azure Monitor data store queried with KQL, used for workbooks, alert rules and Microsoft Sentinel."
   ],
   [
    "Event Hub",
    "An Azure streaming service used to forward logs in near real time to external SIEM tools."
   ]
  ],
  "example": "Auditors ask Contoso to keep identity logs for two years, and the security team uses a third-party SIEM. The admin creates one diagnostic setting sending audit logs and all sign-in categories to a storage account with a lifecycle policy that deletes data after two years, and a second setting streaming sign-in and risk logs to an Event Hub consumed by the SIEM. A Log Analytics workspace receives sign-ins and audit logs for workbooks and alert rules, with a 90-day retention setting on the workspace.",
  "mistakes": [
   [
    "Selecting SignInLogs exports every kind of sign-in.",
    "Non-interactive, service principal and managed identity sign-ins are separate categories that must be selected explicitly."
   ],
   [
    "Use a storage account to stream logs to a third-party SIEM.",
    "Storage is for low-cost archiving. Near real-time streaming to a SIEM uses an Event Hub (or a partner solution)."
   ],
   [
    "The audit log shows failed sign-in attempts.",
    "Sign-in attempts and their results are in the sign-in logs. The audit log records changes to directory objects."
   ],
   [
    "Entra keeps 90 days of sign-in logs on any paid plan.",
    "Portal retention is 7 days for Free and 30 days for P1 or P2. Longer retention requires export."
   ]
  ],
  "tryit": [
   [
    "Hillcrest Schools must keep identity logs for three years for a state audit, wants KQL alerts when an emergency access account signs in, and is evaluating a third-party SIEM next year. The tenant has Microsoft Entra ID P1. What diagnostic settings design would you recommend today?",
    "Send AuditLogs and all sign-in categories to a storage account with a three-year lifecycle policy for compliance, and send sign-in and audit logs to a Log Analytics workspace for KQL alert rules. When the SIEM arrives, add a diagnostic setting to an Event Hub. P1 covers exporting sign-in logs."
   ],
   [
    "A help desk analyst wants to know why a new SaaS user was never created in the target app last week. Which log should they open?",
    "The provisioning logs, which show the import, matching, action and result steps for each user and any error."
   ]
  ],
  "tip": "Default retention: 7 days free, 30 days P1/P2. Long-term archive means storage account; SIEM streaming means Event Hub; KQL, workbooks and alerts mean Log Analytics. Non-interactive sign-ins are a separate category you must select explicitly. Destination retention is set at the destination.",
  "check": [
   [
    "How long are sign-in and audit logs retained in the portal for a tenant with Entra ID P1?",
    "30 days (7 days for free tenants)."
   ],
   [
    "Which diagnostic setting destination should you choose to stream logs to a third-party SIEM?",
    "An Azure Event Hub (or a supported partner solution)."
   ],
   [
    "Which log would show who removed a user from a group?",
    "The audit log, which records directory changes with the initiator and target."
   ],
   [
    "Which Entra roles can configure diagnostic settings?",
    "Security Administrator or Global Administrator, plus permissions on the destination resource."
   ]
  ]
 },
 {
  "t": "Workbooks, KQL queries in Log Analytics, Identity Secure Score and Microsoft Entra recommendations",
  "hook": "Jordan has just been promoted to identity lead at Bramble Outdoor Supply, and the CIO wants two things by the end of the month: a plan to block legacy authentication without breaking anything, and a single number that shows whether identity security is getting better. Jordan's first instinct is to export sign-ins into a spreadsheet and sort by protocol, but there are millions of rows. The security team also keeps asking for an alert whenever someone uses an emergency access account. The data is already flowing somewhere, according to the previous admin. How do you turn raw identity logs into answers, alerts and a prioritized to-do list without drowning in rows?",
  "simple": "Once Entra's sign-in and change records are copied into a Log Analytics workspace, you can ask questions of them. Workbooks are ready-made, clickable reports, such as 'who still signs in with old, insecure methods'. KQL is a simple query language for asking your own questions, like 'show failed sign-ins per user today', and you can turn a query into an alert. Separately, Microsoft gives you two scorecards. Identity Secure Score is a percentage that shows how closely you follow recommended security practices, with a list of actions that raise it. Microsoft Entra recommendations is a to-do list of specific fixes for your tenant, such as removing apps nobody uses. Together they tell you what is happening and what to fix next.",
  "body": [
   "Once identity logs flow to a Log Analytics workspace through diagnostic settings, you can analyze them with workbooks and Kusto Query Language (KQL). Alongside that, Microsoft provides two built-in guidance tools, Identity Secure Score and Microsoft Entra recommendations, that tell you what to improve. The first pair answers what is happening in your tenant; the second pair answers what you should change. The exam tests both, often in the same scenario, for example by asking how you would confirm that an improvement action can be implemented safely and then how you would watch for problems afterward. Keep in mind that the analysis tools depend on exported data, while the guidance tools work from the tenant's configuration directly.",
   "Workbooks are interactive reports built on Log Analytics data, available under Monitoring and health, Workbooks in the Microsoft Entra admin center. Microsoft supplies templates for common identity questions. Conditional Access insights and reporting shows the impact of policies, including report-only ones, which makes it the go-to workbook before you switch a policy on. Sign-ins using legacy authentication shows who still uses protocols you plan to block, such as older mail protocols that cannot do multifactor authentication (MFA). Authentication prompts analysis shows how often users are prompted and with which methods. The sensitive operations report highlights risky changes such as new credentials on service principals, and app sign-in health shows success and failure trends per application. You can filter by time range, user and app, and you can customize a template or save a copy as your own. Workbooks require that the relevant logs be sent to a workspace; if a workbook shows no data, the first thing to check is the diagnostic setting.",
   "KQL queries go further than any template. You run them from the Logs page in the Entra admin center or in the Log Analytics workspace. Common tables include SigninLogs for interactive user sign-ins, AADNonInteractiveUserSignInLogs, AADServicePrincipalSignInLogs, AADManagedIdentitySignInLogs and AuditLogs. A query starts with a table name and pipes the results through operators, each on its own line after a pipe character. The where operator filters rows, summarize aggregates them, project chooses columns, and order by sorts them. This example counts failed sign-ins per user over the last day:",
   "```kusto\nSigninLogs\n| where TimeGenerated > ago(1d)\n| where ResultType != \"0\"\n| summarize Failures = count() by UserPrincipalName, ResultType\n| order by Failures desc\n```",
   "Reading results correctly matters. In SigninLogs, a ResultType of 0 means success and other values are error codes that you can look up, so filtering on ResultType not equal to 0 returns failures. Notice that the column is stored as text, which is why the value is in quotes. From a saved query you can create an Azure Monitor alert rule that runs on a schedule and notifies an action group when results meet a threshold. Classic identity alerts include any sign-in by an emergency access account, which should almost never happen, and any audit event showing credentials added to an application or service principal, which can indicate persistence by an attacker.",
   "Identity Secure Score measures posture. It is a percentage showing how closely your tenant follows Microsoft's identity security recommendations, found under Protection, Identity Secure Score. It lists improvement actions, such as requiring MFA for administrative roles, blocking legacy authentication, enabling user risk and sign-in risk policies, and designating fewer than five Global Administrators. Each action shows its maximum score impact, your current progress, the user impact and step-by-step implementation guidance. You can compare your score with similar organizations and track its history over time to show progress to leadership. Some actions can be marked as resolved through a third party or as risk accepted, which changes how they count, so document why you chose either status.",
   "Microsoft Entra recommendations is a related feed of specific, tenant-aware actions. Each recommendation has a priority, a status of Active, Completed, Dismissed or Postponed, a list of impacted resources and remediation steps. Examples include removing unused applications, renewing expiring application credentials, migrating applications off older authentication libraries and converting per-user MFA to Conditional Access. Recommendations update as your tenant changes, so a completed item can reappear if the problem returns, and recommendations related to secure score feed into it. Use both tools as a living, prioritized to-do list rather than a one-time checklist, and use workbooks and KQL to confirm that a change, such as blocking legacy authentication, did not break anything before and after you make it."
  ],
  "analogy": "Workbooks and KQL are like a car's dashboard and its diagnostic port. The dashboard shows ready-made gauges, while plugging into the port lets a mechanic ask any question and set a warning light. Identity Secure Score is like an annual inspection score, and Entra recommendations is the mechanic's itemized list of repairs, each with a priority. The analogy breaks in one way: the dashboard only works if the data has been wired in, just as workbooks only work after diagnostic settings send logs to a workspace.",
  "terms": [
   [
    "Workbook",
    "An interactive, customizable report built on Log Analytics data, with Entra templates for common scenarios."
   ],
   [
    "KQL",
    "Kusto Query Language, used to query Log Analytics tables such as SigninLogs and AuditLogs."
   ],
   [
    "SigninLogs",
    "The Log Analytics table containing interactive user sign-in events exported from Entra ID."
   ],
   [
    "ResultType",
    "The SigninLogs column holding the result code, where 0 means success."
   ],
   [
    "Identity Secure Score",
    "A percentage measuring alignment with Microsoft identity security best practices, with improvement actions."
   ],
   [
    "Microsoft Entra recommendations",
    "Tenant-specific, prioritized actions with status tracking and impacted resources."
   ]
  ],
  "example": "Before blocking legacy authentication, the admin opens the Sign-ins using legacy authentication workbook and finds two printers and a line-of-business app still sending mail with basic authentication. After moving them to modern methods, the admin enables a Conditional Access policy to block legacy authentication, watches the Conditional Access insights workbook for unexpected failures, and sees Identity Secure Score rise as the related improvement action completes. A KQL alert rule on SigninLogs notifies the security team whenever an emergency access account signs in.",
  "mistakes": [
   [
    "Workbooks show data for any tenant as soon as you open them.",
    "Workbooks read from a Log Analytics workspace, so diagnostic settings must first send the relevant logs there."
   ],
   [
    "In SigninLogs, a nonzero ResultType means success.",
    "ResultType 0 means success; other values are error codes."
   ],
   [
    "Identity Secure Score and Entra recommendations are the same list.",
    "Secure Score is a posture percentage with improvement actions; recommendations are tenant-specific fixes with statuses and impacted resources, some of which feed the score."
   ],
   [
    "The SigninLogs table includes non-interactive sign-ins.",
    "Non-interactive sign-ins are in a separate table, AADNonInteractiveUserSignInLogs, and must be exported separately."
   ]
  ],
  "tryit": [
   [
    "Fernwood Clinic plans to switch a report-only Conditional Access policy that requires compliant devices to On next week. The CISO worries that clinicians on shared tablets will be locked out. What would you use to estimate the impact first, and what must already be in place?",
    "Use the Conditional Access insights and reporting workbook, which shows how report-only policies would have affected sign-ins, filtered to the clinician users and apps. It requires sign-in logs to be flowing into a Log Analytics workspace through a diagnostic setting."
   ],
   [
    "The security team wants an email within minutes whenever someone adds a client secret to an app registration. Which tools would you combine?",
    "A KQL query on AuditLogs filtering for credential changes on applications or service principals, saved as an Azure Monitor alert rule with an action group that sends email."
   ]
  ],
  "tip": "Workbooks and KQL need logs in a Log Analytics workspace via diagnostic settings. In SigninLogs, ResultType 0 means success. Identity Secure Score measures posture as a percentage; recommendations list concrete fixes with statuses you can postpone or dismiss. Saved KQL queries can become alert rules.",
  "check": [
   [
    "What must be configured before Entra workbooks can show sign-in data?",
    "A diagnostic setting sending sign-in logs to a Log Analytics workspace."
   ],
   [
    "In a KQL query on SigninLogs, how do you filter to failed sign-ins?",
    "Use where ResultType != \"0\", because 0 indicates success."
   ],
   [
    "Name two Identity Secure Score improvement actions.",
    "For example: require MFA for administrative roles, block legacy authentication, enable user or sign-in risk policies, or designate fewer than five Global Administrators."
   ],
   [
    "Which workbook helps you predict the effect of a report-only Conditional Access policy?",
    "Conditional Access insights and reporting."
   ]
  ]
 },
 {
  "t": "Licensing: Microsoft Entra ID P1, P2 and Microsoft Entra ID Governance features",
  "hook": "The budget meeting at Willowbrook Manufacturing starts in an hour, and Aisha, the identity architect, has a slide that lists everything the security team wants: Conditional Access for everyone, risk-based sign-in blocking, just-in-time admin roles, quarterly guest reviews and automatic offboarding when HR records a last day. The finance director has one question for every line: 'Don't we already pay for this with Microsoft 365?' Some of those features are included in the plan the company already owns, and some are not. If Aisha guesses wrong, either the company buys licenses it does not need, or a feature quietly fails to work for half the users. How do you map each feature to the license it actually requires?",
  "simple": "Microsoft Entra comes in levels, like phone plans. The free level comes with Microsoft 365 or Azure and covers the basics: user accounts, groups, single sign-on to apps and simple security defaults. P1 adds the everyday business tools, especially Conditional Access, which lets you write rules like 'require extra verification outside the office'. P2 includes everything in P1 and adds risk detection, temporary admin rights through PIM, access reviews and access packages. Microsoft Entra ID Governance is an add-on that brings the most advanced automation, such as workflows that run on an employee's first and last day. You usually need a license for each person who benefits from a feature, not just for the admins.",
  "body": [
   "Many SC-300 questions hinge on licensing: a feature fits the scenario, but only if the tenant has the right plan. Microsoft Entra ID comes in a Free edition and the paid P1 and P2 editions, with Microsoft Entra ID Governance as an add-on. Other products, such as Microsoft Entra Workload ID Premium and the Global Secure Access licenses, are sold separately. Prices and bundles change over time, so for the exam focus on which features belong to which tier rather than on costs. Bundles matter mostly because they tell you what a tenant already owns: a scenario that mentions a Microsoft 365 plan is quietly telling you which Entra tier is already in place, and the question is then what, if anything, must be added on top.",
   "Microsoft Entra ID Free is included with Microsoft cloud subscriptions such as Microsoft 365 and Azure. It provides user and group management, directory synchronization with Microsoft Entra Connect or Cloud Sync, single sign-on (SSO) to software as a service (SaaS) apps, basic security reports, security defaults, self-service password change for cloud users, and business-to-business (B2B) collaboration. It does not include Conditional Access. That gap is why security defaults exist: they give small tenants a fixed baseline, such as requiring multifactor authentication (MFA) registration and blocking legacy authentication, without the policy engine that P1 provides.",
   "Microsoft Entra ID P1 adds the core enterprise features. The headline is Conditional Access, including features that depend on it, such as terms of use and named locations. P1 also brings dynamic groups, group-based licensing, self-service password reset with on-premises writeback, application proxy for publishing on-premises web apps, Microsoft Entra Connect Health, custom administrator roles, administrative units, custom banned password lists and password protection for on-premises Active Directory, company branding, and export of sign-in logs to diagnostic destinations with 30-day portal retention. P1 is included in Microsoft 365 E3 and Microsoft 365 Business Premium. When a scenario names one of these features and nothing riskier, P1 is usually the minimum.",
   "Microsoft Entra ID P2 includes everything in P1 and adds Microsoft Entra ID Protection, which provides risk detections, risky user and risky sign-in reports, and risk-based Conditional Access conditions such as sign-in risk and user risk. P2 also adds Privileged Identity Management (PIM) for just-in-time and approval-based admin roles, plus access reviews and entitlement management, which together form the identity governance basics. P2 is included in Microsoft 365 E5. A useful pattern: if a scenario mentions risk, privilege or periodic recertification, look at P2.",
   "Microsoft Entra ID Governance is an add-on for P1 or P2 customers, and it is also part of the Microsoft Entra Suite. It provides the complete governance feature set. On top of what P2 offers, it adds lifecycle workflows for joiner, mover and leaver automation, advanced entitlement management capabilities such as custom extensions that call Azure Logic Apps and automatic assignment policies, machine-learning-assisted access review features, and other advanced governance capabilities. When a scenario mentions lifecycle workflows, employeeHireDate or employeeLeaveDateTime triggers, or other advanced governance automation, think ID Governance.",
   "Other licenses round out the picture. Microsoft Entra Workload ID Premium covers Conditional Access and ID Protection for workload identities such as service principals, so a scenario about blocking risky service principal sign-ins points there rather than to P2. Microsoft Entra Internet Access and Microsoft Entra Private Access license the Global Secure Access features. Microsoft Entra External ID bills external users by monthly active users (MAU) rather than per seat. Licensing is generally per user who benefits from a feature, not per administrator. Every user protected by Conditional Access needs P1, every user covered by access reviews or PIM needs the corresponding license, and buying licenses only for the admins who configure the feature does not meet the terms.",
   "A reliable exam method is to identify every feature in the scenario, map each to its tier, and choose the lowest tier that contains them all. Conditional Access, dynamic groups, group licensing, application proxy and password writeback map to P1. Anything risk-based, PIM, access reviews and entitlement management map to P2. Lifecycle workflows and advanced governance map to ID Governance. Service principal risk and Conditional Access for workload identities map to Workload ID Premium. If the question asks for the minimum license and mentions both dynamic groups and PIM, the answer is P2, because P2 includes everything in P1."
  ],
  "analogy": "Entra licensing works like a gym membership. The free tier lets you in the door and use the basic equipment. P1 adds the classes everyone uses, with Conditional Access as the most popular one. P2 adds personal trainers who watch for risky form and a locked room for heavy equipment you check out temporarily. ID Governance is the premium concierge who automatically sets up your locker on your first day and clears it on your last. Unlike a gym, though, the membership card is needed by every person who benefits, not only the staff who run the classes.",
  "mnemonic": "P1 is Policy, P2 adds Privilege and Peril, Governance adds the Gate in and out. Policy means Conditional Access, Privilege means PIM, Peril means risk-based ID Protection, and the Gate means lifecycle workflows for joiners and leavers.",
  "terms": [
   [
    "Microsoft Entra ID Free",
    "The included edition with directory, sync, SSO, B2B and security defaults, but no Conditional Access."
   ],
   [
    "Microsoft Entra ID P1",
    "The paid edition adding Conditional Access, dynamic groups, group licensing, SSPR writeback, app proxy and more."
   ],
   [
    "Microsoft Entra ID P2",
    "P1 plus ID Protection, Privileged Identity Management, access reviews and entitlement management."
   ],
   [
    "Microsoft Entra ID Governance",
    "An add-on for P1 or P2 that adds lifecycle workflows and advanced governance features."
   ],
   [
    "Workload ID Premium",
    "A license adding Conditional Access and risk detection for workload identities."
   ],
   [
    "Minimum license",
    "The lowest tier that contains every feature a scenario requires."
   ]
  ],
  "example": "A company on Microsoft 365 E3, which includes P1, wants risk-based Conditional Access, just-in-time admin roles and automated offboarding. The identity architect notes that Conditional Access itself is already covered by P1, but risk-based policies and PIM require P2, and automated offboarding with lifecycle workflows requires Microsoft Entra ID Governance. The proposal adds P2 (or ID Governance licensing, which also covers these governance features) for the users protected by risk policies and PIM, and the Governance add-on for the users processed by lifecycle workflows.",
  "mistakes": [
   [
    "Conditional Access is included in Microsoft Entra ID Free.",
    "Free tenants get security defaults instead. Conditional Access requires P1."
   ],
   [
    "Lifecycle workflows are part of P2.",
    "Lifecycle workflows require Microsoft Entra ID Governance."
   ],
   [
    "Only administrators who configure a feature need the license.",
    "Licensing is generally per user who benefits, such as every user protected by Conditional Access or covered by an access review."
   ],
   [
    "Risk-based Conditional Access for service principals needs only P2.",
    "Conditional Access and ID Protection for workload identities require Workload ID Premium."
   ]
  ],
  "tryit": [
   [
    "Ashgrove Council has Microsoft 365 Business Premium. The security team wants to put helpdesk staff in an administrative unit, require MFA from outside the office with Conditional Access, and run quarterly access reviews of guests in Teams. What is the minimum additional licensing, and why?",
    "Business Premium includes P1, which covers administrative units and Conditional Access. Access reviews require P2 or ID Governance, so the council needs that licensing for the users covered by the reviews. No other add-on is needed for these three requirements."
   ],
   [
    "A scenario asks for the minimum license to use dynamic groups, group-based licensing and SSPR with on-premises writeback. Which tier?",
    "Microsoft Entra ID P1, because every one of those features is a P1 feature and none requires risk, PIM or governance."
   ]
  ],
  "tip": "Memorize the split: P1 is Conditional Access and hybrid conveniences; P2 is risk and privileged access plus basic governance; ID Governance is lifecycle workflows and advanced governance; Workload ID Premium is CA and risk for service principals. When a question asks for the minimum license, choose the lowest tier that contains every feature mentioned.",
  "check": [
   [
    "Which is the minimum license for Privileged Identity Management?",
    "Microsoft Entra ID P2 (or Microsoft Entra ID Governance)."
   ],
   [
    "Which license tier is needed for dynamic groups and group-based licensing?",
    "Microsoft Entra ID P1."
   ],
   [
    "A scenario requires lifecycle workflows. Which license does it need?",
    "Microsoft Entra ID Governance."
   ],
   [
    "Which Microsoft 365 plan includes Microsoft Entra ID P2?",
    "Microsoft 365 E5."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
