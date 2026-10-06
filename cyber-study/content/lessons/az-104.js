/* Lessons for Microsoft Certified: Azure Administrator Associate (AZ-104): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("az-104", [
 {
  "t": "Microsoft Entra users and groups: create, bulk create, security vs Microsoft 365 groups, assigned vs dynamic membership",
  "hook": "It is Monday morning at Harbor Credit Union, and Priya from HR drops a spreadsheet on your desk: 60 new call-center staff start on Wednesday. Each one needs a sign-in, access to the member-support resource group and, by Friday, a shared Teams space for their training cohort. Last year your predecessor created every account by hand and granted access person by person, and six months later nobody could say who still had what. You have two days, a CSV file and a nagging question: how do you build this so that access stays correct on its own when people join, move and leave?",
  "simple": "Microsoft Entra ID is the address book and front door for everyone who uses your company's Azure. Each person gets a user account, which is their sign-in. Instead of giving permissions to people one at a time, you put people into groups and give the permission to the group. Think of a gym: you do not hand each member a key to the pool, you give pool access to the 'swim members' list and then just add or remove names. Entra ID has two kinds of groups. Security groups are for giving access. Microsoft 365 groups are for teamwork, with a shared mailbox and calendar. A group's member list can be kept by hand (assigned) or filled automatically by a rule such as 'everyone whose department is Sales' (dynamic).",
  "body": [
   "Microsoft Entra ID (formerly Azure Active Directory, or Azure AD) is the cloud identity service behind every Azure subscription. Every person who signs in to the Azure portal, and every group you use to grant access, lives in an Entra tenant: a dedicated instance of the directory that belongs to your organization. As an Azure administrator you will spend a lot of time creating users and groups, because good group design is what keeps access manageable. You grant permissions to groups once, then add and remove people from those groups as their jobs change, instead of editing dozens of individual permissions every time someone joins or leaves. That single habit is the difference between an environment you can audit and one nobody understands after a year.",
   "Start with the user object, because everything else hangs off it. You can create a user in the portal (Microsoft Entra ID > Users > New user > Create new user), with the Azure command-line interface (CLI) (`az ad user create --display-name \"Ana Silva\" --user-principal-name ana@contoso.com --password <initial-password>`), with Microsoft Graph PowerShell (`New-MgUser`), or by inviting an external user as a guest. A cloud user needs a display name, a user principal name (UPN) such as `ana@contoso.com` whose domain suffix is a verified domain in the tenant (or the default `onmicrosoft.com` domain), and an initial password that the user is usually forced to change at first sign-in. If you type a suffix the tenant has not verified, the portal will not accept it, which is a frequent cause of failed creations.",
   "Not every user is created in the cloud. Users synchronized from on-premises Active Directory Domain Services (AD DS) with Microsoft Entra Connect or Cloud Sync are sourced on-premises, so on-premises remains the source of authority. In the portal you will see their source listed as Windows Server AD, and most of their properties appear greyed out. You change attributes such as department or job title in AD DS, and the next synchronization cycle carries the change to Entra ID. If you edit them in the cloud instead, the change is blocked or overwritten.",
   "When the numbers grow, switch to bulk operations. On the Users page, Bulk operations > Bulk create gives you a CSV (comma-separated values) template. You fill in one row per user with the display name, UPN, initial password and any optional properties such as department or job title, upload the file, and the portal runs the job in the background so you can keep working. When it finishes you open Bulk operation results and download a file showing which rows succeeded and which failed and why, typically a duplicate UPN or an unverified domain. You fix only the failed rows and upload them again. The same menu offers bulk invite for guests and bulk delete, and groups have bulk import and bulk remove of members from a CSV file.",
   "Next comes the group type, and the exam expects you to choose correctly between the two. A security group is used to grant access to resources: Azure role-based access control (RBAC) role assignments, enterprise app assignments, licenses and Conditional Access policies. Its members can be users, devices, service principals and other groups (nesting). A Microsoft 365 group is a collaboration group: it comes with a shared mailbox, calendar and SharePoint site, and it can back a Microsoft Teams team. Its members can only be users, it cannot contain other groups, and it always has its own email address. If a question is about granting Azure permissions to a set of administrators or targeting devices, the answer is a security group; if it mentions shared email, calendars or Teams, it is a Microsoft 365 group.",
   "Each group also has a membership type, which decides who keeps the member list current. Assigned means an administrator or group owner adds and removes members by hand. Dynamic user means Entra ID evaluates a rule against user attributes and keeps membership current automatically, for example `(user.department -eq \"Sales\") -and (user.country -eq \"US\")`. Dynamic device does the same with device attributes such as `device.deviceOSType -eq \"Windows\"`, and it is only available for security groups. A single group cannot mix user and device rules. You cannot add or remove members of a dynamic group by hand; the Add members button is simply unavailable, so you change the rule or the user's attributes instead.",
   "Dynamic membership has two practical catches. First, it requires Microsoft Entra ID P1 licensing (or a product that includes it) for users who are members of dynamic groups. Second, rule processing is not instant, so a new hire can take a while to appear in the group, and therefore in everything the group grants. You can switch a group between assigned and dynamic, but switching to dynamic replaces the existing members with whoever the rule matches, so any manually added people disappear unless the rule also matches them.",
   "Consider a worked example. Contoso hires 40 seasonal support agents. You download the bulk create template, fill in 40 rows with each agent's name, UPN, temporary password and department set to `Support`, and upload it. The results file shows 39 successes and one failure caused by a typo in the domain suffix, which you fix and re-upload as a single row. A dynamic user security group called Support-Agents already exists with the rule `user.department -eq \"Support\"`, and that group holds the Reader role on the support resource group. Within a short time the 40 new accounts appear in the group and inherit access, with no individual role assignments. When the season ends and human resources (HR) changes their department, they drop out of the group automatically, and their access goes with it.",
   "Common mistakes follow a pattern: trying to put devices or nested groups into a Microsoft 365 group; creating a dynamic device rule on a Microsoft 365 group; expecting to add a single person manually to a dynamic group; forgetting the P1 license requirement for dynamic membership; and editing a synchronized user's department in the portal, only to find the change is blocked or overwritten by the next sync. Exam questions usually hide the answer in a clue word. 'Automatically', 'based on department' or 'based on attribute' points to dynamic membership. 'Devices', 'nested group' or 'assign an Azure role' points to a security group. 'Shared mailbox', 'Teams' or 'collaboration' points to a Microsoft 365 group. 'Hundreds of users from a spreadsheet' points to bulk create with the CSV template. 'User is managed on-premises' means change the attribute in AD DS, not in Entra ID."
  ],
  "analogy": "Groups work like a building's badge system. Instead of programming every door for every employee, security programs each door for a role, such as 'IT staff', and then adds or removes badge holders from that role. A dynamic group is like a badge list fed directly from the HR system: change someone's department and their doors change too. The analogy stops working with Microsoft 365 groups, which are less about doors and more about a shared office with its own mailbox and calendar, and which can only hold people, never devices or other groups.",
  "terms": [
   [
    "User principal name (UPN)",
    "The sign-in name of an Entra user in email-address format, whose suffix must be a verified domain of the tenant."
   ],
   [
    "Security group",
    "An Entra group used to grant access to resources; it can contain users, devices, service principals and other groups."
   ],
   [
    "Microsoft 365 group",
    "A collaboration group with a shared mailbox, calendar, SharePoint site and optional Teams team; members can only be users."
   ],
   [
    "Assigned membership",
    "Group membership that an administrator or group owner maintains by adding and removing members by hand."
   ],
   [
    "Dynamic membership",
    "Group membership calculated automatically from a rule on user or device attributes; it requires Entra ID P1."
   ],
   [
    "Bulk create",
    "A portal operation that creates many users from an uploaded CSV template and reports per-row results."
   ],
   [
    "Microsoft Entra Connect",
    "The tool that synchronizes users and groups from on-premises AD DS into Entra ID, keeping on-premises as the source of authority."
   ],
   [
    "Dynamic device membership",
    "A dynamic rule that evaluates device attributes such as operating system; it is supported only on security groups."
   ]
  ],
  "example": "A company hires 40 seasonal support agents. The administrator fills in the bulk create CSV template to create the accounts in one upload, sets each user's department to Support, and relies on a dynamic user security group with the rule user.department -eq Support that already holds the Reader role on the support resource group. The new agents get access without any further steps, and they lose it automatically when HR changes their department at the end of the season.",
  "mistakes": [
   [
    "A Microsoft 365 group can hold devices or nested groups if you need it to.",
    "Microsoft 365 groups can contain only users. Devices, service principals and nested groups require a security group."
   ],
   [
    "You can add one extra person to a dynamic group by hand as an exception.",
    "Dynamic membership is controlled entirely by the rule. Change the person's attributes, change the rule, or create a separate assigned group for exceptions."
   ],
   [
    "Dynamic groups are free in every tenant.",
    "Dynamic membership requires Microsoft Entra ID P1 (or a product that includes it) for the users who are members of dynamic groups."
   ],
   [
    "To fix a synchronized user's department, edit it in the Entra portal.",
    "Synchronized users are sourced in on-premises AD DS. Change the attribute there and let Entra Connect or Cloud Sync carry it to the cloud."
   ]
  ],
  "tryit": [
   [
    "Northwind Clinics wants every Windows laptop to receive a compliance policy automatically, and it also wants each clinic team to have a shared calendar and mailbox. An intern proposes one dynamic Microsoft 365 group with a device rule to do both jobs. What do you recommend instead?",
    "Two groups. Use a security group with dynamic device membership (for example `device.deviceOSType -eq \"Windows\"`) to target the laptops, because device rules only work on security groups and Microsoft 365 groups cannot hold devices. Use a Microsoft 365 group per clinic team for the mailbox and calendar, with assigned or dynamic user membership. A single group cannot mix user and device rules anyway."
   ],
   [
    "You upload a bulk create CSV with 120 rows. The results file shows 117 successes and three failures, all with a UPN ending in `@harborcu.org`, while the others end in `@harborcu.com`. What is the likely cause and the fix?",
    "The `harborcu.org` domain is probably not a verified domain in the tenant, or the rows contain a typo. Verify the domain under Custom domain names (or correct the suffix), then upload a CSV containing only the three failed rows."
   ]
  ],
  "tip": "Watch for the member type. Devices can only go in security groups, dynamic device rules only work for security groups, Microsoft 365 groups cannot contain nested groups, and dynamic groups need Entra ID P1 licensing.",
  "check": [
   [
    "You need a group that automatically contains every Windows device in the tenant. Which group type and membership type do you choose?",
    "A security group with dynamic device membership. Microsoft 365 groups cannot contain devices, and dynamic device rules are only supported on security groups."
   ],
   [
    "A group has dynamic user membership, and a manager asks you to add one extra person by hand. What happens?",
    "You cannot add members by hand to a dynamic group. Either change the user's attributes so the rule matches, change the rule, or use a separate assigned group."
   ],
   [
    "What is the fastest portal method to create 200 cloud users?",
    "Bulk create on the Users page: download the CSV template, fill in one row per user, upload it and review the results file for failed rows."
   ],
   [
    "A team needs a shared mailbox, a calendar and a Teams workspace. Which group type fits?",
    "A Microsoft 365 group, because it provisions collaboration resources; a security group is for granting access, not collaboration."
   ],
   [
    "You switch an assigned group with 15 hand-picked members to dynamic user membership. What happens to those 15 people?",
    "They are replaced by whoever the rule matches; anyone the rule does not match is removed from the group."
   ]
  ]
 },
 {
  "t": "User and group properties, licenses (including group-based licensing), external (B2B guest) users and self-service password reset",
  "hook": "It is 7:40 a.m. at Bayview Engineering, and your queue already has four tickets. A new hire cannot open Outlook because 'no license is assigned', even though the license dashboard shows 30 spare seats. A partner architect needs access to a project tomorrow but should not get a company password. And the help desk lead wants to know why half of her calls last month were password resets. Each problem has a different fix, and each fix lives in a different corner of Microsoft Entra ID. Where do you start?",
  "simple": "Every user account has details attached to it, like department, manager and country. Those details are not just for show: they decide which licenses can be given out and which automatic groups a person joins. A license is permission to use a paid product, such as Microsoft 365. Instead of handing out licenses one by one, you can give a license to a group, and everyone in the group gets it. People from other companies can be invited as guests, and they sign in with their own work account, so you never manage their password. Self-service password reset lets people reset their own forgotten password after proving who they are, a bit like a bank texting you a code before letting you change your PIN.",
  "body": [
   "A user object in Microsoft Entra ID carries far more than a name and password. Properties such as job title, department, manager, office location, employee ID and usage location are used by dynamic group rules, by the global address list and by licensing. You edit them on the user's Properties page in the portal, in bulk with Microsoft Graph PowerShell (`Update-MgUser -UserId ana@contoso.com -Department \"Finance\"`), or, for synchronized users, in on-premises Active Directory Domain Services (AD DS), because the on-premises directory is the source of authority. Keeping these attributes accurate is worth the effort, because a wrong department value can silently drop someone out of a dynamic group and the access and licenses it grants.",
   "Groups have properties too: name, description, owners, membership type, and whether the group can be assigned Microsoft Entra roles. Owners can manage membership without being administrators, which lets a team lead maintain their own project group. The role-assignable setting is the one to watch: you can only choose it when you create the group, and it cannot be turned on afterwards. If you later need a group to hold an Entra role, you create a new group with that option enabled.",
   "Licenses come next. Products such as Microsoft 365 or Microsoft Entra ID P1 and P2 are licensed per user. Before a license can be assigned, the user must have a usage location set, a two-letter country property, because some services are not available in every country; assignment fails without it, no matter how many spare licenses the tenant owns. You can assign a license directly on the user's Licenses page, but at scale direct assignment becomes hard to track and easy to forget when people leave, so licenses keep being paid for after their holders are gone.",
   "Group-based licensing solves that. You assign the license to a group, and every member receives it, with the option to turn off individual service plans inside the product, for example disabling one app for a department. When a user joins the group they get the license; when they leave, it is removed. Combine this with a dynamic group and licensing follows human resources (HR) data automatically. Group-based licensing needs Entra ID P1 or a product that includes it. If assignment fails, for example because there are not enough licenses, a usage location is missing or two service plans conflict, the group's Licenses page shows those users in an error state so you can fix them and reprocess. A user can hold the same license both directly and through a group; removing the direct assignment then leaves the inherited one in place, which is a safe way to migrate from direct to group-based licensing.",
   "External collaboration is the next topic, and it uses Microsoft Entra B2B (business-to-business). You invite a partner by email address (Users > New user > Invite external user, or `New-MgInvitation`), and a guest user object is created in your tenant with a user type of Guest. The partner signs in with their own identity from their home organization, a Microsoft account, or an email one-time passcode, so you never store or reset their password. After they redeem the invitation you can put guests in groups and give them role-based access control (RBAC) roles like any other user. External collaboration settings control who can invite guests (for example only admins and users in the Guest Inviter role), how much of your directory guests can see, and which partner domains are allowed or blocked. Cross-tenant access settings add finer control over inbound and outbound collaboration with specific organizations.",
   "Self-service password reset (SSPR) tackles the help desk problem. Under Microsoft Entra ID > Password reset you enable it for None, Selected (one group) or All users, choose which authentication methods are allowed (such as the Microsoft Authenticator app, mobile phone, email or security questions), and set how many methods are required to reset: one or two. Users must register methods before they can use SSPR, and you can require registration at sign-in with a periodic reconfirmation, so people are prompted to set up methods before the day they forget their password. Administrator accounts always use a stricter built-in policy that requires two methods and never allows security questions, regardless of your settings.",
   "Hybrid environments add one more requirement. For users synchronized from on-premises, password writeback through Microsoft Entra Connect or Cloud Sync is needed so the new password is written back to AD DS. Without it, the reset either fails or leaves the on-premises password unchanged, and the user ends up with a cloud password that does not open their workstation or file shares.",
   "Consider a worked example. An engineering firm creates a dynamic user group for `user.department -eq \"Engineering\"` and assigns the Microsoft 365 license to it, turning off one service plan the team does not use. A new engineer is created with department Engineering but no usage location, and the group shows her in an error state. You set usage location to Canada, reprocess the group, and the license arrives. A contractor from a partner firm is invited as a B2B guest, redeems the invitation with his own company account, and is added to a project security group that has Contributor on one resource group. SSPR is enabled for the Engineering group with two required methods, and password writeback is turned on because the engineers sync from on-premises.",
   "Common mistakes include assuming spare licenses guarantee assignment when the usage location is empty; thinking guests have passwords in your tenant; picking 'Selected' for SSPR and expecting to add several groups (it takes one group, so nest groups or use All); forgetting that writeback is needed for synchronized users; and believing the role-assignable group setting can be turned on later. Exam wording gives these away. 'License assignment fails but licenses are available' points to usage location. 'Assign licenses automatically when users join a department' points to group-based licensing with a dynamic group. 'External partner, their own credentials' points to B2B guest invitation. 'Users reset their own password, change must reach on-premises' points to SSPR plus password writeback. 'Minimize help desk calls' is almost always SSPR."
  ],
  "analogy": "Group-based licensing is like a company parking garage that gives a permit to every car registered to a department. Join the department and your car is recognized; leave and the permit lapses, with nobody having to remember to revoke it. The usage location is like the garage asking which country your license plate is from before issuing anything: no plate country, no permit, however many spaces are empty. Where it stops working: a user can hold a license both directly and through a group, while a car rarely has two permits.",
  "terms": [
   [
    "Usage location",
    "The country property on a user that must be set before a license can be assigned."
   ],
   [
    "Group-based licensing",
    "Assigning a license to a group so that all members inherit it and lose it when they leave the group."
   ],
   [
    "Service plan",
    "An individual component of a license product that can be turned off during assignment."
   ],
   [
    "B2B guest user",
    "An external identity invited into your tenant with user type Guest who signs in with credentials from their own organization or account."
   ],
   [
    "External collaboration settings",
    "Tenant settings that control who can invite guests, what guests can see and which domains are allowed."
   ],
   [
    "Self-service password reset (SSPR)",
    "A feature that lets registered users reset their own password using verified authentication methods."
   ],
   [
    "Password writeback",
    "A sync feature that writes passwords reset in the cloud back to on-premises Active Directory."
   ],
   [
    "Guest Inviter role",
    "An Entra role that lets non-administrators invite external users when external collaboration settings restrict invitations."
   ]
  ],
  "example": "An engineering firm adds a dynamic group for all users in the Engineering department and assigns the Microsoft 365 license to it. A new engineer's license fails until the administrator sets her usage location to Canada and reprocesses the group. A contractor from a partner firm is invited as a B2B guest, added to a project group and signs in with his own company account, while engineers reset forgotten passwords through SSPR with writeback to on-premises AD DS.",
  "mistakes": [
   [
    "Spare licenses in the tenant mean assignment cannot fail.",
    "Assignment also needs a usage location on the user, and group-based assignment can fail on conflicting service plans. Check the user's usage location first."
   ],
   [
    "You can scope SSPR to several separate groups with the Selected option.",
    "Selected accepts a single group. Nest the groups you need inside one group, or enable SSPR for All."
   ],
   [
    "Guest users get a password in your tenant that you can reset.",
    "B2B guests authenticate with their home organization, a Microsoft account or a one-time passcode. Your tenant does not hold their password."
   ],
   [
    "You can mark an existing group as role-assignable later.",
    "The setting that lets a group hold Entra roles can only be chosen when the group is created."
   ]
  ],
  "tryit": [
   [
    "Lakeshore Logistics syncs all staff from on-premises AD DS. You enable SSPR for All users with one required method, and users report that the reset page says success but their laptop still accepts only the old password. What is missing, and is anything else worth reviewing?",
    "Password writeback through Microsoft Entra Connect or Cloud Sync is missing, so the new password never reaches AD DS. Turn it on. It is also worth reviewing the one-method setting; requiring two methods makes resets harder to abuse, and administrators already require two methods regardless."
   ],
   [
    "Finance wants every member of a dynamic Finance group to receive Microsoft 365 but without one app inside the product. Three users show errors on the group's Licenses page. Name two likely causes you would check.",
    "A missing usage location on those users, not enough available licenses, or a service plan conflict with a license they already hold directly. Fix the cause and reprocess the group; the disabled app is handled by turning off that service plan in the group assignment."
   ]
  ],
  "tip": "If a license assignment fails, check the usage location first. For SSPR, the scope options are None, Selected (a single group) and All, administrators always need two methods, and synchronized users need password writeback.",
  "check": [
   [
    "A license assignment to a new user fails with an error. The tenant has spare licenses. What is the most likely cause?",
    "The user's usage location is not set; it is required before a license can be assigned."
   ],
   [
    "How does a B2B guest authenticate to your tenant?",
    "With their own identity from their home organization, a Microsoft account or a one-time passcode; your tenant does not store their password."
   ],
   [
    "You enable SSPR for synchronized users, but reset passwords do not work on-premises. What is missing?",
    "Password writeback through Microsoft Entra Connect or Cloud Sync, which writes the new password back to Active Directory."
   ],
   [
    "You want every user in the Sales department to receive a license automatically. What do you configure?",
    "Group-based licensing on a dynamic user group whose rule matches the Sales department, which requires Entra ID P1."
   ],
   [
    "What authentication policy applies when an administrator uses SSPR?",
    "A stricter built-in policy that always requires two methods and never allows security questions, regardless of the tenant settings."
   ]
  ]
 },
 {
  "t": "Azure RBAC: built-in roles (Owner, Contributor, Reader, User Access Administrator), assigning roles at different scopes and interpreting access",
  "hook": "A message arrives from the audit team at Meridian Health Partners: 'Explain why Jordan, a junior developer, was able to delete a production database last Thursday.' You open the database's Access control blade and find no assignment for Jordan at all. Then you notice a group called Dev-Leads holding Owner on the whole subscription, and inside it, a nested group with Jordan's name. Nobody meant to give a junior developer the keys to production, yet the access was real. How do you read role assignments well enough to spot this before the auditors do, and design them so it cannot happen again?",
  "simple": "Azure role-based access control decides who is allowed to do what to your cloud resources. Every permission is a sentence with three parts: who (a person, group or app), what (a role, which is a named list of allowed actions) and where (which resources it covers). Owner can do everything, including giving access to others. Contributor can build and change things but cannot hand out access. Reader can only look. User Access Administrator can hand out access but cannot build anything. Permissions given at a higher level flow down to everything inside it, like a master key for a whole floor of a hotel opening every room on that floor. If someone has two different permissions, they get everything both allow.",
  "body": [
   "Azure role-based access control (RBAC) decides what a signed-in identity can do to Azure resources. Every grant is a role assignment made of three parts: a security principal (a user, group, service principal or managed identity), a role definition (a list of allowed operations) and a scope (where the grant applies). If you remember 'who, what, where', you can read any assignment and predict what it allows. RBAC is the answer whenever a question asks who may create, change, view or delete resources, so it is worth knowing the moving parts precisely.",
   "The four fundamental built-in roles appear on nearly every exam. Owner has full access to manage resources and can also assign roles to others. Contributor can create, change and delete every kind of resource but cannot grant access to anyone. Reader can view resources but change nothing. User Access Administrator can manage role assignments (grant and remove access) but cannot manage the resources themselves. Notice the symmetry: Contributor and User Access Administrator each hold one half of Owner's power. Beyond these there are many service-specific roles, such as Virtual Machine Contributor or Network Contributor, which follow the principle of least privilege by covering one resource type, and the Role Based Access Control Administrator role, which can manage assignments and can be limited with conditions to certain roles or principals.",
   "Under the hood, a role definition is a JavaScript Object Notation (JSON) document. It lists `Actions` (allowed control-plane operations such as `Microsoft.Compute/virtualMachines/start/action`), `NotActions` (operations subtracted from Actions), `DataActions` and `NotDataActions` for the data plane, and `AssignableScopes`. Contributor, for instance, has `*` in Actions with `Microsoft.Authorization/*/Write` and `Microsoft.Authorization/*/Delete` in NotActions, which is exactly why it cannot assign roles. When no built-in role fits, you create a custom role from JSON (`az role definition create --role-definition @role.json`) or by cloning an existing role in the portal and trimming its permissions. Reading the Actions list of a built-in role is often the fastest way to settle an argument about what it can do.",
   "Scope is where inheritance comes in. Scopes form a hierarchy: management group, subscription, resource group, then individual resource. An assignment at a scope is inherited by everything below it, so Reader on a subscription means Reader on every resource group and resource in it, including ones created next month. You cannot remove an inherited permission at a lower scope; you have to remove the assignment where it was made. To assign a role, open Access control (IAM, for identity and access management) on the target scope, choose Add > Add role assignment, pick the role, then the members, or use `az role assignment create --assignee <group-object-id> --role Reader --scope /subscriptions/<id>/resourceGroups/rg-app`. Assign to groups rather than individuals so that access follows group membership.",
   "Effective access is calculated by addition. RBAC is additive: a user's effective access is the union of every role assigned to them directly and through any group, at any scope above the resource. If Ana has Reader on the subscription and Contributor on one resource group, she can change resources in that resource group and only view everything else. NotActions is not a deny: if another role grants an operation, the user has it. The only thing that overrides an allow is a deny assignment, which you cannot create directly; Azure features such as deployment stacks and managed applications create them.",
   "To check access, use the tools on the Access control (IAM) blade. Check access shows what a particular principal can do at that scope, including access that arrives through groups. Role assignments lists every assignment at that scope, with a column showing whether each one is set here or inherited from a parent. Roles lets you inspect each role's permissions. In the opening audit scenario, Check access for Jordan would immediately show Owner inherited from the subscription through the Dev-Leads group, even though no assignment names Jordan directly.",
   "Consider a worked example. A help desk team must restart virtual machines (VMs) in the Production resource group but must not delete them or change networking. Contributor is far too broad, and Virtual Machine Contributor can still delete VMs. You clone Virtual Machine Contributor into a custom role, keep only `Microsoft.Compute/virtualMachines/read`, `start/action`, `restart/action` and `powerOff/action`, set the assignable scope to the subscription, and assign it to the HelpDesk security group at the Production resource group. A help desk member signs in, restarts a VM successfully, and gets an authorization error when trying to delete it.",
   "Common mistakes are predictable: thinking Contributor can grant access (it cannot); thinking User Access Administrator can create resources (it cannot); believing an assignment at a resource group can remove access inherited from the subscription; treating NotActions as a deny; and assigning roles to individual users instead of groups. Another trap is forgetting that effective access comes from group memberships too, so a user with no direct assignment may still have Owner through a nested group.",
   "Exam wording usually points at one answer. 'Grant access to others but not manage resources' points to User Access Administrator. 'Manage all resources but not grant access' points to Contributor. 'Least privilege' plus a narrow task points to a service-specific or custom role at the smallest scope. 'User has Reader here and Contributor there, what can they do' is an additive-permissions question: take the union at each scope. 'All resource groups, including future ones' points to assigning at the subscription or management group."
  ],
  "analogy": "Think of a hotel key system. The role is the type of key card (cleaning staff, manager, guest), the principal is who carries it, and the scope is which floor or room it is encoded for. A card encoded for a whole floor opens every room on it. If you carry two cards, you can open any door either one opens. Where the analogy breaks: in a hotel, a manager could block one room for a cleaner, but in Azure RBAC you cannot subtract inherited access at a lower scope with a role assignment.",
  "mnemonic": "Who, what, where: every role assignment is a security principal (who), a role definition (what) and a scope (where). Read any assignment in that order and you can predict what it allows.",
  "terms": [
   [
    "Role assignment",
    "The binding of a security principal to a role definition at a specific scope."
   ],
   [
    "Security principal",
    "The identity receiving access: a user, group, service principal or managed identity."
   ],
   [
    "Scope",
    "The level at which access applies: management group, subscription, resource group or resource; lower levels inherit it."
   ],
   [
    "NotActions",
    "Operations removed from the Actions list of a role definition; it is not a deny and can be granted back by another role."
   ],
   [
    "User Access Administrator",
    "A built-in role that can manage role assignments but cannot manage the resources themselves."
   ],
   [
    "Custom role",
    "A role definition you create with your own Actions, DataActions and assignable scopes when no built-in role fits."
   ],
   [
    "Deny assignment",
    "A block on specific actions that overrides role assignments; created by Azure features, not directly by administrators."
   ],
   [
    "Check access",
    "A feature on the Access control (IAM) blade that shows a principal's effective role assignments at a scope, including those inherited or granted through groups."
   ]
  ],
  "example": "A help desk team needs to restart virtual machines in the Production resource group but must not delete them or change networking. Rather than Contributor, or Virtual Machine Contributor (which can still delete VMs), the administrator creates a custom role with only the read, start, restart and power off actions and assigns it to the help desk security group at the Production resource group scope. A test sign-in confirms restarts work and deletes are refused.",
  "mistakes": [
   [
    "Contributor can add role assignments because it can do everything else.",
    "Contributor's definition excludes Microsoft.Authorization write and delete operations in NotActions, so it cannot grant access. Owner, User Access Administrator or Role Based Access Control Administrator can."
   ],
   [
    "NotActions in one role blocks that operation even if another role allows it.",
    "NotActions only subtracts from that role's own Actions. RBAC is additive, so another role granting the operation wins. Only deny assignments override allows."
   ],
   [
    "An assignment at a resource group can restrict access inherited from the subscription.",
    "Inherited access cannot be removed lower down. Remove or narrow the assignment at the scope where it was made."
   ],
   [
    "If a user has no assignment on a resource, they have no access to it.",
    "Access can arrive through group membership, including nested groups, and through assignments at any parent scope. Use Check access to see effective permissions."
   ]
  ],
  "tryit": [
   [
    "At Cedar Point Logistics, a new operations analyst needs to view every resource in all 8 subscriptions under the Ops management group, including subscriptions added later, and to restart VMs only in rg-ops-tools. What assignments do you create with least privilege?",
    "Assign Reader to the analyst's group at the Ops management group, which is inherited by all current and future subscriptions under it. Then assign a narrow role, such as a custom role with VM read, start and restart actions, at the rg-ops-tools resource group. The union gives view access everywhere and restart rights only in that resource group."
   ]
  ],
  "tip": "Contributor cannot assign roles, and User Access Administrator cannot create resources; only Owner can do both. Permissions add up across all assignments and groups, and NotActions is not a deny.",
  "check": [
   [
    "A user has Reader on the subscription and Contributor on resource group RG1. Can they delete a VM in RG2? In RG1?",
    "Not in RG2, where they only inherit Reader. Yes in RG1, where Contributor applies; RBAC permissions are additive."
   ],
   [
    "Which built-in role lets a person grant others access to a subscription without letting them create resources?",
    "User Access Administrator (or Role Based Access Control Administrator)."
   ],
   [
    "Why can a Contributor not add a role assignment?",
    "The Contributor definition lists Microsoft.Authorization write and delete operations in NotActions, so role assignment operations are not included."
   ],
   [
    "Can you block a user at one resource group from access they inherit through a subscription-level Owner assignment?",
    "Not with a role assignment; RBAC is additive. You must remove or narrow the subscription-level assignment, because you cannot create deny assignments yourself."
   ],
   [
    "A role assignment is listed as 'inherited' on a resource's Access control (IAM) blade. Where must you go to remove it?",
    "To the parent scope (resource group, subscription or management group) where the assignment was created."
   ]
  ]
 },
 {
  "t": "Entra roles vs Azure RBAC roles, and data-plane roles such as Storage Blob Data Reader",
  "hook": "Rosa, the newly promoted operations manager at Sunridge Outfitters, is Owner of the company's production subscription. At 4:15 p.m. she messages you, frustrated: she cannot reset a locked-out employee's password, and when she tested a new reporting app's managed identity with Reader on a storage account, every request for a blob came back 'not authorized'. 'I'm the Owner,' she writes. 'How can Azure say no to me?' Both failures have the same root: Azure has more than one permission system. Which one governs each task, and which role actually fixes it?",
  "simple": "Azure has two separate rule books for permissions. One rule book covers the company directory: creating user accounts, resetting passwords, managing groups. These are Microsoft Entra roles, such as User Administrator. The other covers the cloud resources themselves, like virtual machines and storage: these are Azure RBAC roles, such as Owner or Reader. Being powerful in one rule book gives you nothing in the other. There is a second split inside the resource rule book: managing a storage account (its settings) is different from reading the files inside it. Think of an apartment building: the building manager can repaint the hallways and change the locks, but that does not mean they can open your mail. Reading the files needs a special data role, like Storage Blob Data Reader.",
  "body": [
   "Azure has two separate role systems, and exam questions often test whether you know which one applies. Microsoft Entra roles control what someone can do in the directory itself: create users, reset passwords, manage groups, register applications and configure tenant settings. Examples are Global Administrator, User Administrator, Groups Administrator, Helpdesk Administrator, License Administrator and Application Administrator. Their scope is the whole tenant or an administrative unit (a container that limits a role to a subset of users or groups), and you assign them in Microsoft Entra ID > Roles and administrators.",
   "Azure role-based access control (RBAC) roles, by contrast, control what someone can do to Azure resources: virtual machines, storage accounts, networks. Their scopes are management groups, subscriptions, resource groups and resources, and you assign them on a resource's Access control (IAM, identity and access management) blade. The two systems are independent. A Global Administrator does not automatically have any access to subscriptions, and a subscription Owner cannot create users in Entra ID unless they also hold a suitable Entra role. When you read a question, first decide whether the task touches directory objects (users, groups, apps, licenses, passwords) or Azure resources; that decides which role system the answer comes from.",
   "There is one bridge between them, intended for emergencies. A Global Administrator can turn on 'Access management for Azure resources' in Microsoft Entra ID > Properties. That gives them the User Access Administrator role at root scope (`/`), above all management groups and subscriptions, so they can grant themselves or others access to any subscription. This is meant for recovery, such as when the only subscription Owner has left the company, and it should be switched off again afterwards, because the elevated assignment is powerful and is logged for auditing.",
   "Azure RBAC itself splits into two planes, and this is where many learners get caught. The control plane (management plane) is the Azure Resource Manager (ARM) application programming interface (API) at `management.azure.com`: creating a storage account, changing its firewall, reading its properties. The data plane is the data inside the resource: blobs, queue messages, table entities, Key Vault secrets, reached through the service's own endpoint such as `<account>.blob.core.windows.net`. Owner, Contributor and Reader are control-plane roles. Their definitions contain `Actions` but no `DataActions`, so by themselves they do not grant reading a blob through Microsoft Entra authorization. That is why Rosa's Owner role did not help her app.",
   "Data-plane roles fill that gap. Storage Blob Data Reader lets a principal read and list containers and blobs; Storage Blob Data Contributor adds write and delete; Storage Blob Data Owner also allows setting Portable Operating System Interface (POSIX) access control lists (ACLs) in Azure Data Lake Storage. There are matching roles for queues (Storage Queue Data Reader and Contributor), tables (Storage Table Data Reader and Contributor), Azure Files over the REST (Representational State Transfer) API, and Key Vault in its RBAC permission model (Key Vault Secrets User, Key Vault Administrator). Assign them at the storage account or, for least privilege, the container scope, for example `az role assignment create --role \"Storage Blob Data Reader\" --assignee <principal-id> --scope <storage-account-id>/blobServices/default/containers/reports`.",
   "A common surprise is that a Contributor can still read blobs in the portal without any data role. That is because Contributor has the control-plane action `Microsoft.Storage/storageAccounts/listKeys/action`, so the portal can fetch the storage account key and use Shared Key authorization, which bypasses Entra data roles entirely. If you disable shared key access on the account, or switch the portal's authentication method to 'Microsoft Entra user account', only data-plane roles work. A Reader, who cannot list keys, sees the account but gets an authorization error when opening a container unless they also have a data role. In the portal this shows up as a message that you do not have permissions to list the data using your user account.",
   "Consider a worked example. An analytics app runs with a managed identity and needs to read files from the `reports` container only. Reader on the storage account would not work, because Reader has no data actions and cannot list the keys, and Contributor would let the app delete the account. You assign Storage Blob Data Reader on the `reports` container to the managed identity. Separately, a colleague who is Owner of the subscription asks why she cannot reset a user's password; you explain that Owner is an RBAC role and assign her Helpdesk Administrator in Entra ID, scoped to an administrative unit for her department so she can help only her own staff.",
   "Common mistakes include expecting Global Administrator to manage virtual machines (VMs) by default; expecting subscription Owner to manage users; picking Reader or Contributor when the question is about reading blob contents with Entra ID; and forgetting to turn off elevated access after a recovery. Exam wording helps sort them: 'reset passwords', 'create users', 'register applications' point to Entra roles. 'Create VMs', 'manage networks' point to Azure RBAC. 'Read blob data using Microsoft Entra ID' or 'managed identity reads a container' points to a Storage Blob Data role. 'Only Owner left, regain access' points to elevating a Global Administrator to User Access Administrator at root scope."
  ],
  "analogy": "Picture an office tower. The HR office (Entra roles) issues staff badges and resets forgotten PINs. The facilities team (RBAC control plane) can build, rewire and remove rooms. Neither can open the locked filing cabinets inside a room; that needs a cabinet key (a data-plane role such as Storage Blob Data Reader). Where the analogy bends: a facilities manager with Contributor can, in effect, copy the master cabinet key by listing the storage account keys, unless shared key access is turned off.",
  "terms": [
   [
    "Microsoft Entra role",
    "A directory role, such as User Administrator, that controls management of Entra objects and tenant settings."
   ],
   [
    "Administrative unit",
    "An Entra container that limits the scope of a directory role to a subset of users, groups or devices."
   ],
   [
    "Control plane",
    "Management operations on Azure resources through Azure Resource Manager, governed by Actions in RBAC roles."
   ],
   [
    "Data plane",
    "Operations on the data inside a resource, such as reading blobs, governed by DataActions in RBAC roles."
   ],
   [
    "Storage Blob Data Reader",
    "A built-in data-plane role that allows reading and listing blob containers and blobs using Entra authorization."
   ],
   [
    "Elevated access",
    "The Global Administrator option that grants User Access Administrator at root scope to recover access to all subscriptions."
   ],
   [
    "Storage Blob Data Contributor",
    "A data-plane role that allows reading, writing and deleting blobs and containers using Entra authorization."
   ]
  ],
  "example": "An analytics app runs with a managed identity and needs to read files from one container. The administrator assigns Storage Blob Data Reader on that container only. Giving it Reader on the storage account would not work, because Reader has no data actions and cannot list the keys, and Contributor would give it far more power than it needs, including the ability to delete the account.",
  "mistakes": [
   [
    "A Global Administrator can manage every VM and storage account by default.",
    "Entra roles grant no Azure resource access. A Global Administrator must elevate to User Access Administrator at root scope, or be assigned an RBAC role, to manage resources."
   ],
   [
    "A subscription Owner can create users and reset passwords.",
    "Owner is an Azure RBAC role. Directory tasks need an Entra role such as User Administrator or Helpdesk Administrator."
   ],
   [
    "Reader on a storage account lets an app read blob contents.",
    "Reader has no DataActions and cannot list keys. Reading blobs with Entra authorization needs Storage Blob Data Reader or higher."
   ],
   [
    "Elevated access can stay on permanently for convenience.",
    "It grants User Access Administrator over every subscription. Use it for recovery, grant what is needed, then switch it off."
   ]
  ],
  "tryit": [
   [
    "At Granite Ridge Insurance, a Function app's managed identity must upload files to the `claims-intake` container and read them back, but must not change the storage account's settings. Shared key access is disabled on the account. Which role do you assign, and at what scope?",
    "Storage Blob Data Contributor at the `claims-intake` container scope. It grants read, write and delete on blobs through Entra authorization, which is required because shared key access is off. It has no control-plane rights, so the app cannot alter account settings, and the container scope keeps it away from other containers."
   ],
   [
    "The last subscription Owner at Granite Ridge has left, and nobody can add role assignments. A Global Administrator is available. What should they do, and what should they do afterward?",
    "Turn on 'Access management for Azure resources' in Entra ID Properties, which grants User Access Administrator at root scope, then assign Owner on the subscription to an appropriate group. Afterward, switch the elevated access off again."
   ]
  ],
  "tip": "Directory tasks (users, groups, passwords, app registrations) point to Entra roles; resource tasks point to Azure RBAC. If the question is about reading blob contents with Entra ID, look for a Storage Blob Data role, not Reader or Contributor.",
  "check": [
   [
    "A user is Owner of a subscription. Can they reset another user's password in Entra ID?",
    "Not because of that role. Owner is an Azure RBAC role; resetting passwords needs an Entra role such as Helpdesk Administrator or User Administrator."
   ],
   [
    "A user with Reader on a storage account gets an authorization error when opening a container in the portal. Which role fixes this with least privilege?",
    "Storage Blob Data Reader at the container or account scope, which grants data-plane read access."
   ],
   [
    "How can a Global Administrator regain access to a subscription whose only Owner left?",
    "Enable 'Access management for Azure resources' to receive User Access Administrator at root scope, grant the needed role, then turn it off."
   ],
   [
    "Why can a Contributor browse blobs in the portal even without a data role?",
    "Contributor can list the storage account keys, so the portal uses Shared Key authorization; disabling shared key access removes that path."
   ],
   [
    "An administrator needs to reset passwords only for users in the Paris office. What do you assign?",
    "An Entra role such as Helpdesk Administrator scoped to an administrative unit containing the Paris users."
   ]
  ]
 },
 {
  "t": "Azure Policy: definitions, initiatives, assignments, scopes and exclusions, effects (Deny, Audit, Modify, DeployIfNotExists) and remediation tasks",
  "hook": "The compliance officer at Alder Valley Bank forwards you a regulator's letter: customer data must never leave two approved European regions, and the bank must prove it. That afternoon you discover a developer with Owner rights spun up a test database in East US last month. RBAC did exactly what it was told; the developer was allowed to create databases. What you lacked was a rule about what resources may look like, one that even an Owner cannot ignore, plus a way to find and fix everything that already breaks it. How do you build that guardrail?",
  "simple": "Azure Policy is a set of house rules for your cloud. Permissions decide who may do something; policies decide what is allowed to exist, no matter who asks. A rule might say 'only these two regions' or 'every resource must have a cost center label'. You write or pick a rule (a definition), optionally bundle several rules together (an initiative), and then switch the rule on for part of your environment (an assignment). Each rule has an effect: block the request, just report it, quietly fix it, or add something missing. It is like a homeowners' association: you own your house, but the rules still say the fence cannot be taller than six feet, and the association can flag or fix fences that break the rule.",
  "body": [
   "Azure Policy enforces rules about what resources may look like, while role-based access control (RBAC) controls who may act. RBAC answers 'can Ana create a virtual machine (VM)?'; Policy answers 'is this VM, in this region, with these tags and this size, allowed to exist?'. Policy applies even to Owners, which is what makes it a governance tool rather than a permission system. Organizations use it to keep data in approved regions, require tags for cost reporting, restrict expensive VM sizes and make sure monitoring or security settings are always present.",
   "Everything starts with a definition. A policy definition is a JavaScript Object Notation (JSON) rule with an `if` condition and a `then` effect, for example 'if the resource location is not in the allowed list, then Deny'. Hundreds of built-in definitions exist, such as Allowed locations, Allowed virtual machine size SKUs (stock-keeping units, meaning VM sizes) and Require a tag on resources, and you can write custom ones. Definitions usually expose parameters, such as `listOfAllowedLocations`, so one definition can be reused with different values in different places. An initiative (policy set definition) groups several definitions so you can assign them together and track them as one compliance goal; the Microsoft cloud security benchmark is a built-in initiative that Microsoft Defender for Cloud uses.",
   "Nothing happens until you create an assignment. You assign a definition or initiative to a scope (management group, subscription or resource group), fill in its parameters and optionally add exclusions, which are child scopes the assignment skips. Assignments are inherited by all child scopes, just like RBAC. From the command line you can run `az policy assignment create --name allowed-eu --policy <definition-id> --scope /subscriptions/<id> --params '{\"listOfAllowedLocations\":{\"value\":[\"westeurope\",\"northeurope\"]}}'`. Exemptions are a separate object that exempt a specific scope or resource for a documented reason, in a Waiver or Mitigated category, often with an expiry date. The distinction matters: an exclusion is just a line on the assignment, while an exemption is its own auditable record explaining why.",
   "The effect decides what happens when a resource matches the condition. Deny blocks the create or update request, so the deployment fails with a `RequestDisallowedByPolicy` error that names the assignment. Audit allows the request but marks the resource non-compliant in the Compliance view. AuditIfNotExists and DeployIfNotExists check for a related resource after the main one is created, such as a diagnostic setting or an antimalware extension; AuditIfNotExists only reports, while DeployIfNotExists deploys the missing resource with an Azure Resource Manager (ARM) template. Modify adds, replaces or removes properties or tags on the request, for example adding a CostCenter tag. Append adds fields to the request, and Disabled turns the rule off, which is handy as a parameter value when testing.",
   "Timing explains a lot of exam questions. New and updated resources are evaluated at request time. Existing resources are evaluated after assignment and in periodic compliance scans, and Deny does not change them; they are simply reported as non-compliant. Compliance results are not instant either: a new assignment can take some time before its first evaluation shows up in Policy > Compliance, so an empty compliance view right after assigning does not mean everything is fine.",
   "Fixing what already exists is the job of remediation. To bring existing resources into line for Modify and DeployIfNotExists policies, you create a remediation task from the assignment or from Policy > Remediation. Because these effects change resources, the assignment needs a managed identity holding the roles listed in the definition's `roleDefinitionIds`, which the portal creates when you assign the policy. If that identity lacks a role at the right scope, the remediation task fails with an authorization error. A good rollout practice is to assign with Audit first, review the compliance results, then switch to Deny, so you learn what would break before you break it.",
   "Consider a worked example. A company must keep all data in two European regions. You assign the built-in Allowed locations definition to the root management group with `westeurope` and `northeurope` as parameters, and exclude the sandbox subscription used for experiments. A developer later tries to deploy a storage account to East US and receives a `RequestDisallowedByPolicy` error naming the assignment. Existing out-of-region resources keep running and appear in Policy > Compliance as non-compliant, so the team plans their migration. You also assign a DeployIfNotExists policy that sends VM diagnostics to a Log Analytics workspace, and run a remediation task to configure the 30 VMs that existed before the assignment.",
   "Common mistakes include expecting Deny or Audit to fix existing resources; forgetting that remediation needs the assignment's managed identity with the right roles; confusing an exclusion (set on the assignment, no reason recorded) with an exemption (a separate object with a category and optional expiry); expecting RBAC Owner to bypass a Deny policy; and assuming a definition does anything before it is assigned.",
   "Exam wording maps cleanly onto effects. 'Prevent creation' or 'block' points to Deny. 'Report without blocking' points to Audit. 'Automatically add a tag' points to Modify. 'Automatically deploy an agent, extension or diagnostic setting if missing' points to DeployIfNotExists. 'Fix resources that already exist' points to a remediation task. 'Group several policies into one compliance goal' points to an initiative, and 'skip one resource group' points to an exclusion or exemption."
  ],
  "analogy": "Azure Policy works like building codes. The code book holds the rules (definitions), a city adopts a chapter of them for a district (assignment), and inspectors act on violations. Some violations stop construction before it starts (Deny), some only get written up (Audit), and some are corrected by a crew the city sends (Modify, DeployIfNotExists with remediation). Where the analogy fails: a Deny rule never tears down existing buildings; old resources just get flagged until you remediate or migrate them.",
  "terms": [
   [
    "Policy definition",
    "A JSON rule with a condition and an effect that describes an allowed or required resource configuration."
   ],
   [
    "Initiative",
    "A policy set definition that groups multiple policy definitions to be assigned and tracked together."
   ],
   [
    "Assignment",
    "The application of a definition or initiative to a scope, with parameter values and optional exclusions."
   ],
   [
    "Exclusion",
    "A child scope listed on an assignment that the assignment does not evaluate."
   ],
   [
    "Exemption",
    "A separate object that excuses a scope or resource from an assignment for a Waiver or Mitigated reason, optionally with an expiry."
   ],
   [
    "DeployIfNotExists",
    "An effect that deploys a related resource when it is missing, using a managed identity for the assignment."
   ],
   [
    "Remediation task",
    "A job that brings existing non-compliant resources into compliance for Modify and DeployIfNotExists policies."
   ],
   [
    "Modify effect",
    "A policy effect that adds, replaces or removes properties or tags on a resource during create or update, and can remediate existing resources."
   ],
   [
    "Audit effect",
    "A policy effect that allows the request but marks the resource as non-compliant."
   ]
  ],
  "example": "A company must keep data in two European regions. The administrator assigns the built-in Allowed locations definition to the root management group with those two regions as parameters, and excludes the sandbox subscription. When a developer tries to deploy to East US, the deployment fails with a RequestDisallowedByPolicy error, and existing out-of-region resources appear as non-compliant so the team can plan their migration.",
  "mistakes": [
   [
    "Assigning a Deny policy removes or fixes resources that already violate it.",
    "Deny only blocks new create and update requests. Existing resources are reported as non-compliant and stay as they are."
   ],
   [
    "An Owner can override a policy because Owner has full permissions.",
    "Policy applies regardless of RBAC role. The only ways around it are an exclusion, an exemption, or changing the assignment."
   ],
   [
    "Exclusions and exemptions are the same thing.",
    "An exclusion is a scope listed on the assignment. An exemption is a separate object with a Waiver or Mitigated category and an optional expiry date."
   ],
   [
    "A remediation task works without any extra configuration.",
    "It runs as the assignment's managed identity, which needs the roles in the definition's roleDefinitionIds at the right scope."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Media wants every new VM to send diagnostics to a central Log Analytics workspace, and it already has 120 VMs without that setting. Leadership also wants to know, before blocking anything, how many storage accounts allow public network access. What effects and steps do you use?",
    "Assign a DeployIfNotExists policy for VM diagnostics, which configures new VMs automatically, and create a remediation task so the 120 existing VMs are configured using the assignment's managed identity. For storage accounts, assign the relevant policy with Audit first to measure non-compliance without blocking deployments, then consider switching to Deny once the results are reviewed."
   ]
  ],
  "tip": "Deny and Audit do not change existing resources. If a question asks how to fix resources that already exist, the answer involves a Modify or DeployIfNotExists policy and a remediation task, with a managed identity.",
  "check": [
   [
    "You assign a policy with the Deny effect. What happens to resources that already violate it?",
    "They keep running and are shown as non-compliant; Deny only blocks new create and update requests."
   ],
   [
    "Which effect should you use to automatically add a missing tag to new resources?",
    "Modify, which can add or replace tags during the request; use a remediation task for existing resources."
   ],
   [
    "What is the difference between an initiative and an assignment?",
    "An initiative is a grouping of policy definitions; an assignment applies a definition or initiative to a scope with parameters and exclusions."
   ],
   [
    "A DeployIfNotExists remediation task fails with an authorization error. What should you check?",
    "The assignment's managed identity and whether it holds the roles the definition requires at the right scope."
   ],
   [
    "You need a policy for 10 subscriptions that skips one resource group with a documented reason and an end date. What do you use?",
    "An exemption on that resource group with a Waiver or Mitigated category and an expiry date."
   ]
  ]
 },
 {
  "t": "Resource locks: CanNotDelete vs ReadOnly, inheritance and who can remove them",
  "hook": "At 11:52 p.m. a cleanup script at Tidewater Shipping starts deleting every resource tagged with an old project name. It runs under a service principal with Contributor rights, and nobody notices that the production virtual network and firewall carry that same stale tag. You are woken by an alert, open the activity log, and brace for the worst. Instead of deletions you see a column of `ScopeLocked` failures, and production is still running. One small setting made months ago saved the night. What is it, what can it stop, and what can it not stop?",
  "simple": "A resource lock is a safety catch you put on something important in Azure so nobody deletes or changes it by accident, even people who are normally allowed to. There are two kinds. A 'cannot delete' lock lets people use and adjust the thing but not delete it. A 'read only' lock lets people look but not change or delete anything. Locks pass downward, so a lock on a folder-like resource group protects everything inside it. To get past a lock, someone with the right role has to take the lock off first, on purpose. It is like the cover over an aircraft's eject button: the pilot can still press it, but only after deliberately lifting the cover. Locks protect the resource itself, not the files or data stored inside it.",
  "body": [
   "Resource locks protect important resources from accidental changes, including by people who have full permissions. Role-based access control (RBAC) might let an Owner delete a production database, but a lock stops the delete until someone deliberately removes the lock first. Locks are a safety catch, not an access-control system: they do not decide who can act, they add a deliberate extra step before dangerous operations. That extra step is exactly what prevents a mistyped command or an over-eager cleanup script from destroying production. Locks also apply to automation, so pipelines and scripts running as service principals are stopped just like people.",
   "There are two lock levels, and the names describe what remains allowed. CanNotDelete (shown as Delete in the portal) lets authorized users read and modify a resource but not delete it. ReadOnly lets authorized users read a resource but not delete or update it, which behaves roughly like restricting everyone to the Reader role for that resource. You apply a lock to a subscription, a resource group or an individual resource from its Locks blade (Settings > Locks > Add), giving it a name and an optional note explaining why, or from the command line:",
   "```bash\naz lock create --name keep-prod --lock-type CanNotDelete --resource-group rg-prod\naz lock list --resource-group rg-prod --output table\naz lock delete --name keep-prod --resource-group rg-prod\n```",
   "Locks are inherited, which is both their strength and a source of surprises. A lock on a resource group applies to every resource in it, including resources added later, and a lock on a subscription applies to everything in the subscription. If several locks apply, the most restrictive one wins. A CanNotDelete lock on a resource group also means the resource group itself cannot be deleted, although you can still add new resources to it. The reverse also holds: a CanNotDelete lock on a single resource blocks deletion of its whole resource group, because deleting the group would delete the locked resource.",
   "It is just as important to know what locks do not cover. Locks act on the control plane, meaning operations sent to Azure Resource Manager at `management.azure.com`. They do not stop data-plane operations: a CanNotDelete lock on a storage account stops someone deleting the account but not deleting blobs inside it, and a ReadOnly lock on a SQL server does not stop rows being changed in its databases. For data, use soft delete, versioning, backups or immutability policies.",
   "ReadOnly locks have side effects that exam questions like to test, because some operations that look like reads are really POST requests. A ReadOnly lock on a storage account blocks the list keys operation, so users who rely on account keys cannot browse data in the portal. A ReadOnly lock on a resource group containing a virtual machine (VM) blocks starting, stopping, resizing or adding a data disk. A ReadOnly lock on an App Service blocks viewing the log stream and scaling. Many teams therefore prefer CanNotDelete for production and reserve ReadOnly for resources that truly never change.",
   "Removing a lock is itself a privileged action. To create or delete a lock you need `Microsoft.Authorization/locks/*` permissions; among built-in roles, only Owner and User Access Administrator have them. Contributor does not, so a Contributor cannot remove a lock and therefore cannot delete a locked resource. That is exactly why the cleanup script in the opening scene, running as a Contributor, could not simply remove the lock and carry on.",
   "Consider a worked example. You put a CanNotDelete lock on the resource group holding a company's production virtual network and firewall. Months later a Contributor runs a cleanup script that deletes every resource with an old project tag. The network resources survive, the script logs `ScopeLocked` errors, and the team reviews the change calmly instead of rebuilding the network. Later an Owner legitimately needs to delete an obsolete subnet's network security group; she removes the lock, performs the delete, and adds the lock back, recording both steps in the change ticket.",
   "Common mistakes include expecting a lock to protect data inside a resource; choosing ReadOnly for a VM resource group and then being surprised that VMs cannot be started or scaled; thinking Contributor can remove locks; and forgetting that locks are inherited, so a subscription-level lock you forgot about blocks deletion of a test resource group. On the exam, 'prevent accidental deletion but allow changes' points to CanNotDelete. 'Prevent any modification' points to ReadOnly. 'Users with Owner cannot delete the resource' means there is a lock, and the fix is to remove it first. 'Which role can remove the lock' is Owner or User Access Administrator. 'After applying a lock, users cannot view storage data or start VMs' is the ReadOnly side effect. 'Protect blobs from deletion' is not a lock question; look for soft delete or immutability."
  ],
  "analogy": "A resource lock is like the safety cover over a big red switch. It does not change who is allowed in the control room; it just makes flipping the switch a two-step, deliberate act. CanNotDelete covers only the 'off' switch, while ReadOnly covers every dial on the panel, which is why routine actions suddenly stop working. The analogy stops at the data: the cover protects the switch panel (the resource), not the documents stored in the cabinet behind it (blobs or database rows).",
  "terms": [
   [
    "CanNotDelete lock",
    "A lock that allows reading and modifying a resource but blocks deleting it."
   ],
   [
    "ReadOnly lock",
    "A lock that allows reading a resource but blocks both updates and deletion."
   ],
   [
    "Lock inheritance",
    "The rule that a lock on a subscription or resource group applies to all resources beneath it, including ones created later."
   ],
   [
    "Control plane",
    "Management operations through Azure Resource Manager, which is the only layer locks protect."
   ],
   [
    "Microsoft.Authorization/locks/*",
    "The permission needed to create or delete locks, held by Owner and User Access Administrator among built-in roles."
   ],
   [
    "ScopeLocked",
    "The error Azure returns when an operation is blocked by a resource lock."
   ]
  ],
  "example": "An administrator puts a CanNotDelete lock on the resource group holding a company's production virtual network and firewall. Months later a Contributor runs a cleanup script that tries to delete everything with an old tag; the network resources survive, the script logs ScopeLocked errors, and the team can review the change calmly instead of rebuilding the network under pressure.",
  "mistakes": [
   [
    "A CanNotDelete lock on a storage account protects the blobs inside it.",
    "Locks only block control-plane operations. Deleting blobs is a data-plane operation; use soft delete, versioning, backups or immutability policies."
   ],
   [
    "Contributor can remove a lock because it can modify the resource.",
    "Removing locks needs Microsoft.Authorization/locks/* permissions, which among built-in roles only Owner and User Access Administrator have."
   ],
   [
    "ReadOnly is the safest choice for every production resource group.",
    "ReadOnly blocks operations such as starting VMs, scaling, and listing storage keys. CanNotDelete is usually the better fit for resources that still need normal operation."
   ],
   [
    "A lock on one resource does not affect its resource group.",
    "If any resource in a group has a CanNotDelete lock, the resource group cannot be deleted either, because that would delete the locked resource."
   ]
  ],
  "tryit": [
   [
    "At Copperline Utilities, the finance team asks you to make sure nobody can accidentally delete the production SQL server, but the database team still needs to scale it and adjust firewall rules weekly. Separately, legal wants archived contract PDFs in a storage container protected from deletion. What do you configure for each?",
    "Put a CanNotDelete lock on the SQL server (or its resource group); it blocks deletion but still allows scaling and firewall changes. A lock will not protect the PDFs, because deleting blobs is a data-plane operation. For the contracts, use blob soft delete, versioning or an immutability policy on the container."
   ]
  ],
  "tip": "Only Owner and User Access Administrator (among built-in roles) can remove locks. ReadOnly can break normal operations such as listing storage keys or starting VMs, and locks never protect the data inside a resource.",
  "check": [
   [
    "A resource group has a CanNotDelete lock. Can a Contributor create a new VM in it? Delete the VM later?",
    "Yes, they can create it; no, they cannot delete it, because the inherited lock blocks deletion and a Contributor cannot remove locks."
   ],
   [
    "Does a CanNotDelete lock on a storage account stop a user from deleting blobs?",
    "No. Locks apply to control-plane operations; deleting blobs is a data-plane operation. Use soft delete or immutability for data protection."
   ],
   [
    "Why might users be unable to browse a storage account's containers after a ReadOnly lock is applied?",
    "Listing account keys is a POST operation that the ReadOnly lock blocks, so Shared Key access through the portal fails."
   ],
   [
    "A subscription and a resource group inside it have different lock levels. Which applies?",
    "The most restrictive lock applies, because locks are inherited and combine; ReadOnly beats CanNotDelete."
   ],
   [
    "An Owner tries to delete a resource group and gets a ScopeLocked error, but there is no lock on the group itself. What should she look for?",
    "A lock inherited from the subscription, or a CanNotDelete lock on an individual resource inside the group."
   ]
  ]
 },
 {
  "t": "Tags: applying tags, why tags are not inherited, and enforcing or inheriting tags with policy",
  "hook": "The CFO of Willow Creek Schools opens the monthly cloud report and frowns: 70 percent of the spending is labeled 'untagged'. 'We told every team to tag their resource groups with a cost center,' she says. 'Who is ignoring the rule?' You check, and every resource group does carry a CostCenter tag. The virtual machines, disks and databases inside them, where the money is actually spent, carry nothing at all. Nobody broke the rule. The rule just does not work the way everyone assumed. Why not, and how do you fix it for every resource, including the ones that already exist?",
  "simple": "A tag is a small label you stick on something in Azure, made of a name and a value, like 'Department = Finance' or 'Environment = Test'. Tags do not change how anything works. They help you sort, search and report, especially when you want to know which team is spending what. The surprising part is that labels do not copy themselves downward. If you label a resource group, the things inside it do not get the label. It is like labeling a moving box 'Kitchen': the plates inside are not individually labeled, so if they get unpacked into a shared pile, nobody knows where they came from. Azure Policy can apply the labels for you, or block anything created without them.",
  "body": [
   "Tags are name and value pairs, such as `CostCenter = 1234` or `Environment = Production`, that you attach to subscriptions, resource groups and resources. They do not change how a resource works. Instead they add business metadata you can filter, report and automate on: who owns the resource, which project pays for it, whether it may be shut down at night. Cost analysis in Microsoft Cost Management can group spending by tag, which is often the main reason organizations adopt a tagging standard in the first place. Automation can use them too, for example a runbook that stops every virtual machine (VM) tagged `AutoShutdown = Yes` each evening. A tagging standard only works if it is enforced, which is where Azure Policy comes in later in this lesson.",
   "You can apply tags in several places: on a resource's Tags blade, when creating it in the portal, in Azure Resource Manager (ARM) or Bicep templates with the `tags` property, or from the command line. Watch the operation you choose, because it decides what happens to tags already present. Merge adds or updates the tags you name, while Replace removes every existing tag and leaves only the new set, and Delete removes the named tags.",
   "```bash\naz tag update --resource-id <id> --operation Merge --tags CostCenter=1234 Owner=ana\naz tag update --resource-id <id> --operation Replace --tags Owner=ana\n# PowerShell equivalent\nUpdate-AzTag -ResourceId <id> -Tag @{CostCenter='1234'} -Operation Merge\n```",
   "A few rules govern tags themselves. Tag names are not case-sensitive for most operations, while values are, so `Environment = Prod` and `Environment = prod` are different values in a report. Each resource has a limit on how many tags it can carry, and not every resource type supports tags. To edit tags you need write access to the resource, which Contributor provides. The built-in Tag Contributor role lets someone manage tags on resources without giving them access to the resources themselves, which suits a finance or governance team. Because tags are plain text visible to anyone with read access, never store secrets or personal data in them.",
   "The key exam fact is that tags are not inherited. If you tag a resource group `CostCenter = 1234`, the VMs, disks and network interfaces inside it do not get that tag, and the same is true for subscriptions. This explains the finance report in the opening scene: the money is spent by resources, and the resources were never tagged. Cost Management has its own tag inheritance setting that applies subscription and resource group tags to usage records for reporting, but it does not tag the resources themselves, so automation or queries that look at resource tags still see nothing.",
   "Azure Policy closes the gap. Built-in definitions include 'Require a tag on resources' and 'Require a tag and its value on resource groups', which use the Deny effect so untagged deployments fail. 'Add or replace a tag on resources' and 'Inherit a tag from the resource group if missing' use the Modify effect, so Azure adds the tag automatically as resources are created or updated. For resources that already exist, run a remediation task on the Modify assignment, and it tags them in bulk using the assignment's managed identity.",
   "A good pattern combines both kinds of policy. Require a CostCenter tag on resource groups with Deny, so every new group starts with one. Assign 'Inherit a tag from the resource group if missing' for the same tag at the subscription or management group, so resources pick it up automatically. Then remediate existing resources once. Developers never have to remember to tag individual resources, and the reports stay complete.",
   "Consider a worked example. Finance reports that 70 percent of last month's spending is untagged, even though every resource group has a CostCenter tag. You explain that tags are not inherited, then assign 'Inherit a tag from the resource group if missing' for CostCenter at the subscription and create a remediation task that tags existing resources. You also assign 'Require a tag on resource groups' with Deny so new groups cannot be created without CostCenter. Next month's cost analysis grouped by CostCenter shows almost no untagged spend, and developers never had to change their templates.",
   "Common mistakes include assuming a resource group tag flows to its resources; using Replace when you meant Merge and wiping existing tags; picking Deny when the requirement is to add tags automatically; forgetting remediation for existing resources; and giving a finance team Contributor just so they can edit tags, when Tag Contributor is the least-privilege choice. Exam wording: 'resources do not show the resource group's tags' points to lack of inheritance. 'Automatically apply the resource group's tag' points to the Modify policy 'Inherit a tag from the resource group if missing'. 'Prevent resources without a tag' points to Deny with 'Require a tag'. 'Apply to existing resources' points to a remediation task. 'Manage tags only' points to Tag Contributor. 'Report costs by department' points to tags plus cost analysis grouped by tag."
  ],
  "analogy": "Tags are like sticky labels on moving boxes. Labeling the box 'Kitchen' does not label each plate inside, so once things are unpacked into a shared space, the plates cannot be traced back. Azure Policy with Modify is the helper who copies the box label onto every item as it goes in, and a remediation task is that helper going back to label what was already unpacked. The analogy stops at Cost Management's tag inheritance, which is more like noting the box label on the inventory sheet without touching the plates.",
  "terms": [
   [
    "Tag",
    "A name and value pair of metadata attached to a subscription, resource group or resource."
   ],
   [
    "Merge vs Replace",
    "Tag update operations: Merge adds or changes the named tags, Replace overwrites the whole tag set."
   ],
   [
    "Tag Contributor",
    "A built-in role that allows managing tags on entities without granting access to the entities themselves."
   ],
   [
    "Require a tag on resources",
    "A built-in Deny policy that blocks creating or updating resources that lack a specified tag."
   ],
   [
    "Inherit a tag from the resource group",
    "A built-in Modify policy that copies a tag from the parent resource group onto resources that lack it."
   ],
   [
    "Cost Management tag inheritance",
    "A billing setting that applies parent tags to usage records for reporting without changing the resources."
   ]
  ],
  "example": "Finance reports that 70 percent of last month's spending is untagged, although every resource group has a CostCenter tag. The administrator assigns the built-in 'Inherit a tag from the resource group if missing' policy for CostCenter at the subscription, creates a remediation task to tag existing resources, and next month's cost analysis grouped by CostCenter shows almost no untagged spend.",
  "mistakes": [
   [
    "Resources automatically get the tags of their resource group or subscription.",
    "Tags are not inherited. Use a Modify policy such as 'Inherit a tag from the resource group if missing', plus remediation for existing resources."
   ],
   [
    "Replace and Merge both just add the new tag.",
    "Merge adds or updates the named tags. Replace removes every existing tag and leaves only the set you specify."
   ],
   [
    "A Deny policy is the right way to add missing tags automatically.",
    "Deny blocks untagged resources; it never adds anything. Use Modify to add or copy tags automatically."
   ],
   [
    "The finance team needs Contributor to edit tags.",
    "Tag Contributor lets them manage tags without access to the resources themselves, which is the least-privilege choice."
   ]
  ],
  "tryit": [
   [
    "Juniper Labs has 400 existing resources without an Environment tag, though each resource group has one. Leadership wants new resources tagged automatically, no new resource group created without the tag, and the old resources fixed without asking developers to redeploy. What do you set up?",
    "Assign 'Require a tag on resource groups' (Deny) for Environment so new groups must have it. Assign 'Inherit a tag from the resource group if missing' (Modify) for Environment at the subscription or management group so new and updated resources get it automatically. Create a remediation task on the Modify assignment so the 400 existing resources are tagged using the assignment's managed identity."
   ]
  ],
  "tip": "Tags are never inherited automatically. If a question asks how resources can get their resource group's tags, the answer is an Azure Policy with the Modify effect (plus remediation for existing resources), not a lock or RBAC.",
  "check": [
   [
    "You tag a resource group Environment = Test. Does a storage account created in it later have that tag?",
    "No. Tags are not inherited; you need a Modify policy such as 'Inherit a tag from the resource group if missing' to copy it."
   ],
   [
    "Which policy effect stops users from creating resources without a required tag?",
    "Deny, as used by the built-in 'Require a tag on resources' definition."
   ],
   [
    "What happens if you update tags with the Replace operation and only specify Owner = Ana?",
    "All existing tags are removed and the resource ends up with only the Owner tag."
   ],
   [
    "A finance analyst must edit tags on all resources but not change the resources. Which role do you assign?",
    "Tag Contributor, which grants tag management without access to the resources themselves."
   ],
   [
    "Cost Management tag inheritance is enabled. Will a runbook that selects VMs by tag now find VMs that inherited a resource group tag?",
    "No. Cost Management tag inheritance only applies tags to usage records for reporting; the resources themselves still have no tag."
   ]
  ]
 },
 {
  "t": "Resource groups: create, move resources between groups and subscriptions",
  "hook": "The pilot for Fernhill Bakery's online ordering site has gone well, and the director wants it in the production subscription by Friday. Ravi, a junior admin, has already tried: he selected the web app, clicked Move, and got a validation error. When he retried, he also wondered whether moving it would shift it to the West Europe region where the production resource group lives, and whether the site would go down. A deadline, an error and three open questions. How do resource groups really work, and what does a move change and leave alone?",
  "simple": "A resource group is a folder in Azure that holds related things, like the website, its database and its storage for one app. Everything in Azure must sit in exactly one folder, and folders cannot be placed inside other folders. You usually put things in the same folder if they are built, used and deleted together. You can move things from one folder to another, even into a folder in a different subscription, which is a separate billing account. Moving changes which folder something is in, but not where it physically runs. It is like moving a file from one drawer label to another in an office catalog: the item stays in the same warehouse, but its catalog address changes, so anything that used the old address has to be updated.",
  "body": [
   "A resource group is a logical container for resources that share a lifecycle: you deploy them together, manage access to them together and usually delete them together. Every resource must belong to exactly one resource group, and resource groups cannot be nested. Group by lifecycle and ownership, for example one resource group per application environment such as `rg-shop-prod` and `rg-shop-test`, rather than by resource type such as 'all virtual machines'. Role-based access control (RBAC) assignments, Azure Policy assignments and locks applied to a resource group are inherited by the resources in it, which is why the grouping matters: a good grouping makes access and governance simple, and a poor one makes every permission an exception.",
   "Creating a resource group takes only a name and a region, in the portal, with `az group create --name rg-app --location westeurope` or with `New-AzResourceGroup -Name rg-app -Location westeurope`. The region only says where the group's metadata (the list of resources and deployment history) is stored. Resources inside can be in any region, so a group in West Europe can hold a virtual machine (VM) in East Asia. If the group's region has an outage you may not be able to update resources through it, which is why some organizations keep the metadata region close to the resources.",
   "Deleting is the other end of the lifecycle. Deleting a resource group (`az group delete --name rg-app`) deletes everything in it, which makes cleanup easy in a lab and dangerous in production. That is one reason to put CanNotDelete locks on important resource groups, and one reason to group by lifecycle: if everything in a group should disappear together, deleting the group is a clean, complete teardown.",
   "Moving resources is a common administrative task. You can move resources to another resource group in the same subscription, or to a resource group in another subscription, as long as both subscriptions trust the same Microsoft Entra tenant. In the portal select the resources and choose Move > Move to another resource group or Move to another subscription. From the command line use `az resource move --destination-group rg-new --ids <resource-id>` (add `--destination-subscription-id` for a different subscription) or `Move-AzResource`. The portal first validates the move. During the move both the source and the target resource group are locked against writes and deletes, but the resources keep running, so there is no downtime for most types.",
   "Several rules decide whether a move succeeds, and validation errors almost always trace back to one of them. Not every resource type supports moving, and some only support moving within a subscription; Microsoft publishes a support table per type. Dependent resources must move together: a VM with its disks and network interface, or an App Service app with its plan. The target subscription must have the needed resource providers registered (for example `az provider register --namespace Microsoft.Web`) and enough quota. You need write permission on the source group and on the target group. Moving to a different tenant requires transferring the whole subscription instead.",
   "Two distinctions show up again and again. First, the region does not change in a move: a VM in East US stays in East US even if its new resource group's metadata is in West Europe. To change regions you redeploy, or use Azure Resource Mover or Azure Site Recovery. Second, after a move the resource ID changes, because it includes the subscription ID and resource group name (`/subscriptions/<id>/resourceGroups/<rg>/providers/...`). Scripts, templates, alerts or pipelines that referenced the old ID must be updated, or they fail with 'resource not found'.",
   "Access and governance also change with the move. Role assignments made directly on the resource do not move with it. The resource now inherits assignments, policies and locks from its new resource group and subscription, and stops inheriting from the old ones, so check access and compliance after moving. A resource that was compliant in a development subscription may suddenly be non-compliant under production policies.",
   "Consider a worked example. A project finishes its pilot, and its web app, App Service plan and storage account must move from the Dev subscription to Production. You confirm both subscriptions are in the same tenant, register `Microsoft.Web` in the target, select all three resources together and run Move to another subscription. Validation passes, and the move completes while the site keeps serving traffic. Afterwards you update a deployment pipeline that referenced the old resource IDs and re-create a role assignment that had been set directly on the web app. The resources now also fall under the Production subscription's policies.",
   "Common mistakes include expecting a move to relocate a resource to another region; trying to move a VM without its disks and network interface; moving to a subscription in another tenant; forgetting to register providers in the target subscription; and assuming resource-level role assignments travel with the resource. On the exam, 'can a resource group in region A contain resources in region B' is yes. 'Move to another region' is not a move operation; look for Resource Mover, Site Recovery or redeployment. 'Script fails after the move with resource not found' points to the changed resource ID. 'Move between subscriptions' requires the same Entra tenant and moving dependent resources together. 'Delete all lab resources at once' points to deleting the resource group."
  ],
  "analogy": "A resource group is like a project folder in a filing cabinet index, while the resources themselves sit in warehouses around the world. Moving a resource re-files its index card into another folder, even in another department's cabinet, but the item never leaves its warehouse, so its region is unchanged. Because the card's filing path is part of its address, anyone who saved the old address must update it. The analogy stops at the folder's own location: the cabinet's city only matters for where the index is kept.",
  "terms": [
   [
    "Resource group",
    "A logical container for Azure resources that share a lifecycle; every resource belongs to exactly one."
   ],
   [
    "Resource group location",
    "The region where the group's metadata is stored; it does not restrict where its resources are deployed."
   ],
   [
    "Move validation",
    "A check Azure runs before a move to confirm the resource types, dependencies and target are supported."
   ],
   [
    "Resource ID",
    "The full path of a resource, including subscription and resource group, which changes when the resource is moved."
   ],
   [
    "Resource provider registration",
    "Enabling a namespace such as Microsoft.Web in a subscription so its resource types can be created or moved there."
   ],
   [
    "Azure Resource Mover",
    "A service that helps relocate resources to another Azure region, which a resource group move cannot do."
   ]
  ],
  "example": "A project finishes its pilot, and its web app, App Service plan and storage account must move from the Dev subscription to Production. The administrator confirms both subscriptions are in the same tenant, registers Microsoft.Web in the target, selects all three resources together and runs Move. Afterwards they update a deployment pipeline that referenced the old resource IDs and re-create a role assignment that had been set directly on the web app.",
  "mistakes": [
   [
    "Moving a resource to a resource group in another region moves the resource to that region.",
    "A move never changes a resource's region. Use Azure Resource Mover, Azure Site Recovery or redeployment to change regions."
   ],
   [
    "You can move a VM on its own and leave its disks and network interface behind.",
    "Dependent resources must move together, such as a VM with its disks and network interface, or a web app with its App Service plan."
   ],
   [
    "Role assignments on a resource travel with it to the new subscription.",
    "Resource-level assignments do not move. The resource inherits from its new resource group and subscription, so re-create direct assignments as needed."
   ],
   [
    "Resources can be moved to a subscription in any tenant.",
    "Both subscriptions must trust the same Entra tenant. Moving to another tenant means transferring the whole subscription."
   ]
  ],
  "tryit": [
   [
    "Oakmont Analytics wants to move a VM, its two managed disks, its network interface and a public IP address from rg-dev in Subscription A to rg-prod in Subscription B, both in the same tenant. Validation fails saying a resource provider is not registered. After you fix it, a monitoring alert rule stops working. Explain both problems.",
    "Subscription B has not registered a provider the resources need (for example Microsoft.Compute or Microsoft.Network); register it with az provider register and revalidate, moving all dependent resources together. The alert rule broke because the VM's resource ID changed to include Subscription B and rg-prod; update the rule's target to the new ID."
   ]
  ],
  "tip": "Moving resources never changes their region and does not carry resource-level role assignments. Both subscriptions must be in the same Entra tenant, and dependent resources must move together.",
  "check": [
   [
    "A resource group is in West US. Can it contain a VM in East Asia?",
    "Yes. The resource group location only stores metadata; resources can be in any region."
   ],
   [
    "After moving a storage account to another subscription, an automation script fails with 'resource not found'. Why?",
    "The resource ID changed because it includes the subscription and resource group, so the script is using the old ID."
   ],
   [
    "Can you move a VM to a resource group in another region with a move operation?",
    "The resource group can be anywhere, but the VM's own region does not change; relocating the VM to another region needs Resource Mover, Site Recovery or redeployment."
   ],
   [
    "What must be true before you can move resources to a different subscription?",
    "Both subscriptions must be in the same Entra tenant, the resource types must support the move, dependent resources move together and the target has the providers registered."
   ],
   [
    "During a move between resource groups, can you create new resources in the source or target group?",
    "No. Both groups are locked against writes and deletes while the move runs, although the moving resources keep running."
   ]
  ]
 },
 {
  "t": "Subscriptions and management groups: hierarchy, inheritance of policy and RBAC",
  "hook": "Stonebridge Retail has grown from 3 Azure subscriptions to 30 in two years, one per store region, team and experiment. Now the auditors want read access to all of them, legal wants data kept in the European Union everywhere, and a new subscription for the loyalty program goes live next week. Your colleague Dana proposes a spreadsheet and a weekend of clicking through 30 Access control blades and 30 policy assignments, then doing it again for every new subscription. You suspect there is a better way. Where in Azure can you set a rule once and have it apply to every subscription, including ones that do not exist yet?",
  "simple": "Azure arranges everything in layers, like a set of nesting boxes. The smallest items are resources, such as a website or a database. Resources go into resource groups. Resource groups live inside subscriptions, which are like separate billing accounts with their own limits. Subscriptions can be gathered into management groups, which exist so you can manage many subscriptions at once. Anything you set on an outer box, such as who can read things or a rule about allowed regions, automatically applies to everything inside it, including boxes added later. Think of a school district: a rule set by the district applies to every school, every classroom and every new school that opens, and a single classroom cannot cancel a district rule.",
  "body": [
   "Azure organizes resources in a four-level hierarchy: management groups contain subscriptions, subscriptions contain resource groups, and resource groups contain resources. Understanding the hierarchy is essential because role-based access control (RBAC) role assignments and Azure Policy assignments made at any level flow down to everything beneath it. If you know where an assignment was made, you can predict exactly which resources it affects, today and in the future. Most governance questions on the exam come down to picking the right level for an assignment.",
   "Start with the subscription, because it is the boundary people meet first. A subscription is a billing and management boundary. Each one has its own invoice line, its own quotas (such as how many virtual central processing units, or vCPUs, you can run per region), and trusts exactly one Microsoft Entra tenant for identities, although a tenant can have many subscriptions. Organizations often separate subscriptions by environment (production versus development), by business unit or by billing owner, so that limits and costs are isolated and access can be granted per subscription. You can view quotas under Subscription > Usage + quotas and request increases there when a deployment fails for lack of capacity.",
   "Management groups sit above subscriptions and let you manage many subscriptions as one. Every tenant has a single root management group, shown as the Tenant Root Group, and all other management groups and subscriptions sit under it. You can nest management groups to mirror your organization, up to six levels below the root, for example Root > Corp > Europe > Production. Each management group and each subscription has exactly one parent, though a parent can have many children. New subscriptions land in a default management group, which is the root unless you change the default in the hierarchy settings. You create and organize them in the portal under Management groups, or with commands such as:",
   "```bash\naz account management-group create --name Corp --display-name \"Corp\"\naz account management-group subscription add --name Corp --subscription <subscription-id>\n```",
   "Inheritance is the whole point. If you assign the Reader role to the Auditors group on the Corp management group, auditors can read every subscription and resource under Corp, including subscriptions added next year. If you assign an Allowed locations policy there, every child subscription is restricted too. A child scope cannot remove what it inherits: a subscription Owner cannot delete a policy assignment or role assignment made on a parent management group, although someone with rights at the assignment's scope can add exclusions or exemptions. In the portal, inherited assignments are listed on the child's Access control and Policy pages with the parent scope shown, so you can always trace where a rule came from.",
   "Moving a subscription is where inheritance bites. Moving a subscription to a different management group changes what it inherits immediately: it loses the old parent's assignments and gains the new ones. A subscription that was compliant yesterday can show policy violations today, and a team can lose access it had through the old parent. To move a subscription you need rights on the subscription (such as Owner) and on the target parent management group (such as Management Group Contributor), plus write access on the current parent. Hierarchy settings can also require a permission before users create new management groups, which keeps the structure from sprawling.",
   "Consider a worked example. A retailer has 30 subscriptions and must keep all data in the European Union (EU). Instead of assigning Allowed locations 30 times, you create a management group called Retail under the root, move the 30 subscriptions into it and assign the policy once at Retail. You also assign Reader to the Auditors group at Retail and Contributor to each application team on its own subscription. When a new subscription is created next quarter and moved into Retail, it is compliant and visible to auditors from day one, with no extra work. This is the landing zone pattern: company-wide guardrails high up, business-unit rules one level down, and teams given freedom within their own subscriptions.",
   "Common mistakes include expecting assignments to flow up or sideways (they only flow down); believing a subscription can have two parent management groups or trust two tenants; thinking a subscription Owner can remove a policy inherited from a management group; forgetting that moving a subscription instantly changes its inherited policies and access; and assigning the same policy to many subscriptions one by one instead of at a common parent. Another trap is confusing management groups with resource groups: management groups hold subscriptions, resource groups hold resources.",
   "Exam wording usually signals the level. 'Apply to all current and future subscriptions with the least administrative effort' points to an assignment at a management group, often the root or a common parent. 'Separate billing' or 'separate quotas' points to separate subscriptions. 'Subscription moved and now fails a policy' points to inheritance from the new parent. 'How many parents can a subscription have' is one. 'Users in one subscription must not be affected' points to placing that subscription in a different branch of the hierarchy or using an exclusion."
  ],
  "analogy": "The hierarchy works like a school system. The district (management group) sets policies that every school (subscription) must follow, each school has its own budget, and classrooms (resource groups) hold the actual desks and computers (resources). A district rule reaches every classroom, including schools that open next year, and a principal cannot cancel it locally. Where the analogy weakens: in Azure, moving a school to a different district instantly swaps every inherited rule, something real schools rarely experience overnight.",
  "mnemonic": "Top to bottom: My Sister Rides Rockets. Management group, Subscription, Resource group, Resource. Assignments flow down this list, never up.",
  "terms": [
   [
    "Management group",
    "A container above subscriptions used to apply policy and RBAC to many subscriptions at once."
   ],
   [
    "Tenant Root Group",
    "The single top-level management group in every tenant, from which all management groups and subscriptions descend."
   ],
   [
    "Subscription",
    "A billing, quota and management boundary for Azure resources that trusts one Entra tenant."
   ],
   [
    "Inheritance",
    "The flow of RBAC and policy assignments from a parent scope to all child scopes."
   ],
   [
    "Default management group",
    "The management group where newly created subscriptions are placed, the root unless changed in hierarchy settings."
   ],
   [
    "Landing zone",
    "A design pattern that places shared guardrails high in the hierarchy and gives teams their own subscriptions beneath it."
   ]
  ],
  "example": "A retailer has 30 subscriptions and must keep all data in the EU. Instead of assigning Allowed locations 30 times, the administrator builds a management group called Retail, moves the subscriptions under it and assigns the policy once. When a new subscription is created and moved into Retail, it is compliant from day one, and auditors given Reader at Retail can see it immediately.",
  "mistakes": [
   [
    "A subscription can belong to two management groups to pick up rules from both.",
    "Each subscription and management group has exactly one parent. To combine rules, place them at a common ancestor."
   ],
   [
    "A subscription Owner can delete a policy assignment inherited from a management group.",
    "Inherited assignments can only be changed at the scope where they were made, by someone with rights there."
   ],
   [
    "Moving a subscription to a new management group keeps its old policies until you reapply them.",
    "The move takes effect immediately: the subscription loses the old parent's assignments and inherits the new parent's."
   ],
   [
    "Management groups and resource groups are interchangeable containers.",
    "Management groups hold subscriptions and other management groups; resource groups hold resources inside a subscription."
   ]
  ],
  "tryit": [
   [
    "Larkspur Energy has 15 subscriptions under the Tenant Root Group. Security wants a Deny policy on public IP addresses everywhere except the two networking subscriptions, and auditors need Reader on all subscriptions, including future ones. What hierarchy and assignments would you design?",
    "Assign Reader to the Auditors group at the root (or a top-level management group that will hold every subscription) so current and future subscriptions inherit it. Create management groups such as Workloads and Networking, place the 13 workload subscriptions under Workloads and the two networking subscriptions under Networking, and assign the Deny policy at Workloads. Because assignments flow only down, Networking is unaffected, and new workload subscriptions placed under Workloads inherit the policy automatically."
   ]
  ],
  "tip": "Assignments flow down, never up or sideways. To apply a rule to many subscriptions with the least effort, assign it at their common management group. A subscription trusts one tenant, and each subscription has exactly one parent management group.",
  "check": [
   [
    "You assign Contributor to a group on a management group. Do members have Contributor on resource groups in subscriptions under it?",
    "Yes. Role assignments are inherited by all child management groups, subscriptions, resource groups and resources."
   ],
   [
    "What is the minimal way to apply the same policy to 12 subscriptions?",
    "Place them under a common management group and assign the policy once at that management group."
   ],
   [
    "What happens to inherited policies when a subscription is moved to a different management group?",
    "It stops inheriting the old parent's assignments and immediately inherits the new parent's."
   ],
   [
    "Can a subscription Owner delete a policy assignment made at the parent management group?",
    "No. Inherited assignments can only be changed at the scope where they were made, by someone with rights there."
   ],
   [
    "A tenant has many subscriptions. Can one subscription trust more than one Entra tenant?",
    "No. A subscription trusts exactly one tenant, although a tenant can have many subscriptions."
   ]
  ]
 },
 {
  "t": "Cost management: cost analysis, budgets and budget alerts, Azure Advisor cost recommendations, reservations",
  "hook": "It is the third of the month at Brightwater Design Studio, and the cloud invoice has arrived 40 percent higher than usual. The managing partner wants to know why, and whether it will happen again. You dig in and find an expensive graphics-processing test VM someone forgot to stop, six unattached disks from a finished project and a database server that has run at the same size around the clock for two years at full pay-as-you-go price. Nothing warned anyone. Which Azure tools would have shown the spending, raised the alarm before the bill and pointed out the easy savings?",
  "simple": "Azure charges you for what you use, a bit like an electricity bill, so leaving something running costs money even if nobody is using it. Azure gives you free tools to keep an eye on this. Cost analysis is a set of charts showing where the money goes, by team, service or label. A budget is a spending limit that sends you an alert when you get close, but it never switches anything off by itself. Azure Advisor is like a helpful inspector that points out waste, such as machines doing almost nothing. A reservation is like a yearly gym membership: you promise to use something steadily for one or three years, and in exchange you pay less than the drop-in price.",
  "body": [
   "Azure is billed on consumption, so costs can grow quietly: a forgotten test virtual machine (VM), an unattached disk or a public Internet Protocol (IP) address left behind after a lab all keep charging. Microsoft Cost Management, available in the portal at no extra charge for Azure resources, gives you the tools to see where money goes, warn you before overspending and find savings. An administrator is expected to set these up and act on them, not just read the invoice at the end of the month. This lesson covers four tools: cost analysis, budgets, Azure Advisor and reservations.",
   "Cost analysis is the reporting view (Cost Management > Cost analysis). You pick a scope (management group, subscription or resource group), a date range and a view such as accumulated costs, daily costs or cost by service. Then you group and filter by resource group, service name, location, meter or tag. Grouping by tag is how you do chargeback or showback to departments, which is why tagging matters. The accumulated view also shows forecasted cost for the rest of the period, and you can save views, pin them to dashboards, or schedule exports of cost data to a storage account for analysis in other tools. Cost data is refreshed several times a day, not in real time, so do not expect a resource created a minute ago to appear yet.",
   "A budget turns that visibility into a warning system. It sets a spending threshold for a scope over a reset period (monthly, quarterly or annually). You attach alert conditions as percentages of the budget, based on actual cost or forecasted cost, for example 50 percent actual, 90 percent actual and 100 percent forecasted. When a condition is met, Azure emails the listed recipients and can trigger an action group, which can run an Azure Automation runbook, a Logic App or a function, for instance to shut down development VMs. A forecasted alert is useful because it warns you before you overspend rather than after.",
   "The most tested fact about budgets is what they do not do. Budgets never stop resources or spending by themselves; they only notify, and any stopping has to be done by the automation you attach through an action group. If a question says resources must stop automatically when a threshold is reached, the answer is a budget plus an action group running automation, never a budget alone.",
   "Azure Advisor finds savings you might miss. It analyzes your configuration and usage and gives recommendations in five categories: Cost, Security, Reliability, Operational Excellence and Performance. Cost recommendations include shutting down or resizing underused virtual machines, deleting unattached managed disks and idle public IP addresses, and buying reservations or savings plans for steady workloads. Each recommendation shows its estimated savings; you can act on it, postpone it or dismiss it, and you can adjust the central processing unit (CPU) threshold Advisor uses to judge a VM as underused.",
   "Commitment discounts reward predictable usage. Azure Reservations give a discount in exchange for committing to a specific resource type, such as a VM size family in a region, for one or three years. The reservation is a billing discount applied automatically to matching running resources; it does not create, start or guarantee capacity for a VM. You scope a reservation to a single resource group, a single subscription, a management group or shared across the billing context so that any matching usage benefits. Azure savings plans for compute commit to an hourly spend across services and regions, trading some discount for more flexibility.",
   "Several other levers round out the toolkit. Azure Hybrid Benefit lets you use existing Windows Server or SQL Server licenses with Software Assurance in Azure. Spot VMs offer unused capacity at a discount for interruptible work that can tolerate being evicted. Auto-shutdown schedules on development VMs stop them every evening, and right-sizing moves workloads to a smaller size that still meets their needs.",
   "Consider a worked example. A development team keeps running over its expected spend. You create a monthly budget on the team's resource group with email alerts at 80 percent actual and 100 percent forecasted, and link the forecasted alert to an action group that runs a runbook stopping VMs tagged `Environment = Dev`. In Advisor's Cost category you find three unattached disks and a VM averaging low CPU, so the team deletes the disks and resizes the VM. For the production database VMs, which run all the time on the same size, you buy a reservation scoped to the production subscription.",
   "Common mistakes include assuming a budget caps spending; expecting a reservation to deploy or hold a VM; buying a reservation for workloads that are resized or switched off often, where a savings plan or nothing at all fits better; forgetting that cost data lags; and relying on resource group tags that were never copied to resources, which leaves spending untagged in cost analysis. Exam wording: 'notify when spending reaches' points to a budget with alert conditions. 'Automatically stop resources when the budget is reached' points to a budget plus an action group running automation. 'Identify underused VMs' or 'recommendations to reduce cost' points to Azure Advisor. 'Steady workload running continuously for years' points to a reservation. 'Break down costs by department' points to tags and cost analysis grouped by tag. 'Reuse on-premises Windows licenses' points to Azure Hybrid Benefit."
  ],
  "analogy": "Managing Azure costs is like managing a household's utilities. Cost analysis is the itemized bill broken down by room. A budget is the alert your utility app sends at 80 percent of your usual spend, which warns you but does not switch off the heater; you need a smart plug (an action group with automation) for that. Advisor is the energy auditor who points out the freezer running empty in the garage. A reservation is a fixed-rate contract: cheaper, but only worth it if you will really use that much.",
  "mnemonic": "Azure Advisor's five recommendation categories spell CROPS: Cost, Reliability, Operational Excellence, Performance, Security.",
  "terms": [
   [
    "Cost analysis",
    "The Cost Management view for exploring actual and forecasted costs by scope, grouped and filtered by dimensions such as tag."
   ],
   [
    "Budget",
    "A spending threshold for a scope and period with alert conditions; it notifies but does not stop spending."
   ],
   [
    "Action group",
    "A reusable set of notification and automation actions that budgets and alerts can trigger."
   ],
   [
    "Azure Advisor",
    "A service that analyzes your resources and gives Cost, Security, Reliability, Operational Excellence and Performance recommendations."
   ],
   [
    "Reservation",
    "A one- or three-year commitment to a resource type in exchange for a billing discount on matching usage."
   ],
   [
    "Savings plan for compute",
    "A commitment to an hourly compute spend that discounts usage across services and regions."
   ],
   [
    "Azure Hybrid Benefit",
    "A licensing benefit that lets you use existing Windows Server or SQL Server licenses with Software Assurance in Azure."
   ],
   [
    "Forecasted alert",
    "A budget alert condition that fires when projected spending for the period is expected to cross a threshold, before the money is actually spent."
   ]
  ],
  "example": "A development team keeps running over its budget. The administrator creates a monthly budget on the team's resource group with email alerts at 80 percent actual and 100 percent forecasted, and links an action group to a runbook that stops tagged dev VMs. Advisor also flags three idle disks and a VM running at low CPU, which the team deletes and resizes, and the next month's cost analysis shows the savings.",
  "mistakes": [
   [
    "A budget stops resources when spending reaches 100 percent.",
    "Budgets only send alerts and can trigger action groups. Stopping resources requires automation, such as a runbook, connected through an action group."
   ],
   [
    "Buying a VM reservation deploys or reserves capacity for a VM.",
    "A reservation is a billing discount applied to matching running VMs. You still deploy and run the VMs yourself."
   ],
   [
    "A reservation is always the cheapest option for any VM.",
    "Reservations suit steady, predictable workloads. For workloads that change size or region or are often switched off, a savings plan, auto-shutdown or nothing may fit better."
   ],
   [
    "Cost analysis shows every resource's cost the moment it is created.",
    "Cost data is refreshed several times a day, not in real time, so new usage appears after a delay."
   ]
  ],
  "tryit": [
   [
    "Hollins Architecture runs 12 development VMs that are only needed on weekdays, plus two production VMs that run around the clock on the same size and will for years. The office manager wants an email at 75 percent of the monthly budget and wants the dev VMs stopped automatically if the forecast exceeds 100 percent. What do you configure?",
    "Create a monthly budget at the right scope with an actual-cost alert at 75 percent that emails the manager, and a forecasted alert at 100 percent linked to an action group running a runbook that stops VMs tagged as development. Add auto-shutdown schedules on the dev VMs for evenings. For the two steady production VMs, buy a reservation, which applies a billing discount automatically."
   ]
  ],
  "tip": "Budgets alert; they do not enforce. If a question asks how to automatically stop resources when spending reaches a threshold, the answer is a budget with an action group that runs automation. Reservations are billing discounts, not capacity.",
  "check": [
   [
    "A budget reaches 100 percent. Do resources stop?",
    "No. Budgets only send alerts or trigger action groups; stopping resources requires automation connected to the action group."
   ],
   [
    "Where do you find a recommendation to resize an underused VM?",
    "Azure Advisor, Cost category (also surfaced in Cost Management)."
   ],
   [
    "How do you show costs per department in cost analysis?",
    "Tag resources with a department tag and group cost analysis by that tag."
   ],
   [
    "Does buying a VM reservation create a virtual machine?",
    "No. A reservation is a billing discount applied automatically to matching running VMs; you still deploy the VMs yourself."
   ],
   [
    "Which Advisor category would recommend deleting unattached managed disks?",
    "The Cost category."
   ]
  ]
 },
 {
  "t": "Storage account types and redundancy: LRS, ZRS, GRS, RA-GRS, GZRS and RA-GZRS",
  "hook": "It is 6:40 a.m. and the status page for Tidewater Gazette, a regional news site, shows a warning: one availability zone in its Azure region is having power trouble. Priya, the editor on the early shift, messages you: \"Are the photos for this morning's lead story safe? Will readers still see them?\" Your answer depends entirely on one dropdown someone picked when the storage account was created two years ago. Was it LRS, ZRS, or one of the geo options? And if the whole region goes dark next, can the site still read its images, or does it have to wait for someone to fail over? You open the account's Redundancy blade to find out.",
  "simple": "Azure never keeps just one copy of your files. When you create a storage account, you choose how many places the copies live in. The cheapest choice keeps three copies inside one building. A step up spreads three copies across three separate buildings in the same city, so one building losing power does not matter. The geo choices also send copies to a second city far away, in case the whole first city has a problem. Some geo choices even let your app read from the second city at any time. Think of keeping copies of your house key: one drawer, three neighbors on your street, or also a relative in another state.",
  "body": [
   "A storage account is the top-level container for the Azure Storage services: blobs, files, queues and tables. When you create one you choose a globally unique name (3 to 24 lowercase letters and numbers, which becomes part of endpoints such as `name.blob.core.windows.net`), a region, a performance tier and a redundancy option. Performance and redundancy are the two decisions the AZ-104 exam tests most, because together they determine latency, which features you get, how your data survives failures and what you pay every month.",
   "Start with the account type. Standard general-purpose v2 is the recommended kind for most workloads: it supports all four services, the Hot, Cool, Cold and Archive access tiers and every redundancy option, and it runs on hard-disk based storage. Premium accounts use solid-state storage for low, consistent latency and come in three kinds, each dedicated to one service: premium block blobs, premium file shares and premium page blobs. The trade-off is that premium accounts support only locally or zone-redundant options, never geo-redundancy. So if a question needs a copy in another region with built-in replication, it needs a standard account. From the command line you can create one with `az storage account create --name stcontoso01 --resource-group rg-data --location westeurope --sku Standard_RAGZRS --kind StorageV2`; notice that the redundancy choice is carried in the SKU name.",
   "Next, the in-region options. Locally redundant storage (LRS) keeps three synchronous copies within a single datacenter in the primary region. It is the cheapest option and protects against disk, rack and server failures, but not against a problem that takes out the whole datacenter, such as a fire or a flood. Zone-redundant storage (ZRS) keeps three synchronous copies spread across three availability zones in the primary region. Each zone is one or more datacenters with independent power, cooling and networking, so if one zone fails, data stays available for both reads and writes with no action from you. ZRS is the choice for high availability within a region and for data that must stay inside one region for compliance or data residency reasons.",
   "Then the geo options, which add a second region. Geo-redundant storage (GRS) keeps three copies with LRS in the primary region and replicates them asynchronously to the paired secondary region, where another three copies are kept with LRS. Geo-zone-redundant storage (GZRS) uses ZRS in the primary region and LRS in the secondary, combining zone protection and region protection. Because geo-replication is asynchronous, the secondary is always slightly behind. The Last Sync Time property, visible on the account's Redundancy blade, tells you the point up to which writes have reached the secondary; anything written after that time could be lost if you fail over. This is why geo-redundancy reduces risk but is not lossless.",
   "Reading from the secondary is a separate decision. With plain GRS and GZRS, the secondary copy cannot be read until a failover happens. The read-access versions, RA-GRS and RA-GZRS, let applications read from a secondary endpoint at any time. That endpoint is the account name with `-secondary` appended, such as `name-secondary.blob.core.windows.net`, and it is read-only. Applications can be written to fall back to it when the primary returns errors. If the primary region is unavailable, a customer can initiate failover from the account's redundancy settings, which promotes the secondary to primary. After an unplanned failover, the account becomes locally redundant in the new primary region, so you must reconfigure geo-redundancy afterwards if you still need it.",
   "You can change redundancy after creation, but not every change is equal. Moving between LRS, GRS and RA-GRS is a simple setting change on the account. Moving to or from zone redundancy, such as LRS to ZRS, requires a conversion that Azure performs in the background, or in some cases a manual data migration to a new account. Some features have restrictions tied to redundancy; for example, the Archive access tier is not supported on accounts using ZRS, GZRS or RA-GZRS. The rule for choosing is simple: pick the cheapest option that meets the stated requirement. Disk or server failure only means LRS; zone or datacenter failure means ZRS; regional failure means GRS or GZRS; zone plus regional failure means GZRS; and reading during a regional outage without failover means one of the RA options.",
   "Consider a worked example. A news site stores images in a storage account. It must keep serving them if one availability zone fails, without any disruption, and it must keep serving them during a full regional outage without waiting for a failover. ZRS alone survives a zone failure but not a region failure. RA-GRS allows secondary reads but uses LRS in the primary, so a zone failure could interrupt the primary. RA-GZRS meets both: ZRS in the primary handles the zone, and the read-only secondary endpoint keeps images available if the region fails. The application is configured to retry against the secondary endpoint on read errors, and the team watches Last Sync Time to judge how much recent content a failover might lose.",
   "Several mistakes come up again and again. People choose a premium account when geo-redundancy is required; confuse GRS, whose secondary is not readable until failover, with RA-GRS; think geo-replication is synchronous and therefore lossless; assume failover keeps geo-redundancy automatically; and choose GZRS when only zone protection is required, which costs more than needed. Also remember that redundancy is about availability and durability, not backup. A deleted or overwritten blob is replicated to every copy too, so you still need soft delete, versioning or backup to recover from mistakes.",
   "Finally, learn the exam wording. 'Cheapest' plus 'datacenter failure' or 'zone failure' points to ZRS; 'cheapest' with no failure requirement points to LRS. 'Regional outage' points to GRS or GZRS. 'Read from the secondary region at any time' or 'without failover' points to RA-GRS or RA-GZRS. 'Both zone and region failure' points to GZRS or RA-GZRS. 'Premium' plus 'another region' is a trap, since premium accounts have no geo-redundant option."
  ],
  "analogy": "Think of redundancy as where you keep copies of an important house key. LRS is three copies in one kitchen drawer: fine if one key snaps, useless if the house burns down. ZRS is a copy with each of three neighbors on different streets in your town. GRS adds a relative in another state who gets new keys by mail, a few days late. RA-GRS is a relative who will also let you in any time you ask. The analogy stops at timing: Azure's geo copies lag by minutes, not days, but they can still miss the newest writes.",
  "mnemonic": "Read the letters left to right as a scope ladder: L = Local (one datacenter), Z = Zones (three in a region), G = Geo (adds the paired region), RA = Read Access (secondary readable without failover). GZRS is Geo plus Zones in the primary.",
  "terms": [
   [
    "LRS",
    "Locally redundant storage: three synchronous copies in one datacenter in the primary region."
   ],
   [
    "ZRS",
    "Zone-redundant storage: three synchronous copies across three availability zones in the primary region."
   ],
   [
    "GRS / GZRS",
    "Geo-redundant options that replicate asynchronously to the paired secondary region, using LRS or ZRS in the primary respectively."
   ],
   [
    "RA-GRS / RA-GZRS",
    "Read-access geo-redundant options that allow reads from the secondary endpoint at any time."
   ],
   [
    "Last Sync Time",
    "A property showing the point up to which data has been replicated to the secondary region."
   ],
   [
    "Standard general-purpose v2",
    "The recommended storage account kind that supports all services, access tiers and redundancy options."
   ],
   [
    "Premium account",
    "A solid-state storage account dedicated to block blobs, file shares or page blobs, with local or zone redundancy only."
   ],
   [
    "Customer-initiated failover",
    "An action that promotes the secondary region to primary when the primary region is unavailable."
   ]
  ],
  "example": "A news site stores images in a storage account and must keep serving them even if the entire primary region goes down, without waiting for a failover, and must survive a single zone failure without disruption. RA-GZRS meets both: ZRS protects against a zone failure in the primary, and read access to the secondary endpoint keeps images available during a regional outage while the team decides whether to fail over.",
  "mistakes": [
   [
    "Choosing a premium storage account when the requirement says data must be replicated to another region.",
    "Premium accounts support only LRS or ZRS. Built-in geo-redundancy requires a standard general-purpose v2 account."
   ],
   [
    "Treating GRS and RA-GRS as the same thing.",
    "With GRS the secondary cannot be read until a failover. Only RA-GRS and RA-GZRS expose a read-only secondary endpoint at all times."
   ],
   [
    "Believing geo-replication is synchronous, so a failover never loses data.",
    "Geo-replication is asynchronous. Writes after the Last Sync Time may be lost when you fail over."
   ],
   [
    "Thinking redundancy replaces backup.",
    "Deletes and overwrites are replicated to every copy. Use soft delete, versioning or Azure Backup to recover from mistakes."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union keeps statements in a storage account. Regulators require the data to stay in one region. The team wants the cheapest option that keeps statements readable and writable if a single datacenter in the region fails. Which redundancy option do you choose?",
    "ZRS. It keeps three synchronous copies across availability zones within the one region, so a datacenter or zone failure causes no outage, and it never copies data to another region. LRS would not survive a datacenter failure, and any geo option would break the single-region requirement and cost more."
   ],
   [
    "An app uses an RA-GRS account. The primary region has an outage, and the app owner asks you to fail over immediately. Before you do, what should you check and why?",
    "Check the Last Sync Time. Because replication is asynchronous, anything written after that time will be lost on failover. Also note that RA-GRS already lets the app read from the secondary endpoint, so you may be able to wait, and that after an unplanned failover the account becomes LRS until you reconfigure geo-redundancy."
   ]
  ],
  "tip": "Map requirements to options: zone or datacenter failure = ZRS minimum; region failure = GRS or GZRS; must read during a regional outage = RA-GRS or RA-GZRS. Premium accounts do not offer geo-redundancy, and Archive is not supported with ZRS, GZRS or RA-GZRS.",
  "check": [
   [
    "Which is the cheapest option that keeps data available if one availability zone fails?",
    "ZRS, which stores three copies across three zones in the primary region."
   ],
   [
    "An app must read data from the secondary region without a failover. Which options qualify?",
    "RA-GRS or RA-GZRS, which expose a read-only secondary endpoint."
   ],
   [
    "You need a premium block blob account replicated to another region. Is that possible?",
    "Not with built-in account redundancy; premium accounts support only local or zone redundancy. Use a standard account or replicate data yourself, for example with object replication."
   ],
   [
    "Why can data be lost when you fail over a GRS account?",
    "Geo-replication is asynchronous, so writes made after the Last Sync Time may not have reached the secondary."
   ]
  ]
 },
 {
  "t": "Storage firewalls and virtual network rules, trusted Microsoft services, private endpoints for storage",
  "hook": "A quarterly security review at Pinecrest Insurance lands on your desk with one red line: \"Storage account stfinance01 accepts connections from any network on the internet.\" The data is protected by keys, but the auditor, Daniel, wants a network barrier too. You flip the account to selected networks and, within an hour, two tickets arrive. The nightly Azure Backup job failed, and the on-premises accounting team, connected over VPN, suddenly cannot open their reports. You locked the front door, but you also locked out the people and services that were supposed to be inside. Which network option should you have used, and what did you forget?",
  "simple": "A storage account has two kinds of protection. The first is like a key to a room: you need the right password or sign-in to read the data. The second is like a guard at the building entrance who checks where you are coming from before you even reach the room. The storage firewall is that guard. You can tell it to let in only certain internet addresses or certain networks inside Azure. You can also give the storage account a private address inside your own network, called a private endpoint, so it never needs to be reachable from the internet at all. A few trusted Azure helper services, like backup, can be put on the guard's guest list.",
  "body": [
   "Start with the default. A new storage account accepts connections from any network and relies on authorization, meaning account keys, shared access signatures (SAS) or Microsoft Entra ID, to keep data safe. The storage firewall adds a network layer on top: even a request with a valid key is refused if it does not come from an allowed network. You configure it on the account's Networking blade, where public network access can be enabled from all networks, enabled from selected virtual networks and IP addresses, or disabled. Defense in depth means using both layers together: strong authorization and restricted networks, so a leaked key alone is not enough to reach the data.",
   "When you choose selected networks, the account denies everything except what you list, and there are two kinds of list entries. IP network rules allow specific public IP addresses or ranges in Classless Inter-Domain Routing (CIDR) notation, such as your office's internet address range `203.0.113.0/24`. They only work for public addresses; you cannot use them for private address ranges inside a virtual network, and the portal rejects such ranges. Virtual network rules allow specific subnets. For a subnet to be added, it must have a service endpoint for `Microsoft.Storage` enabled, which the portal can turn on for you, or you can run `az network vnet subnet update --vnet-name vnet-hub --name snet-app --resource-group rg-net --service-endpoints Microsoft.Storage` and then `az storage account network-rule add --account-name stfin --vnet-name vnet-hub --subnet snet-app`.",
   "It is worth being precise about what a service endpoint does. With a service endpoint, traffic from the subnet travels to storage over the Microsoft backbone network and carries the subnet's identity, so the firewall can recognize it and allow it. However, the storage account keeps its public IP address, the name still resolves to that public address, and the client still connects to the public endpoint. Service endpoints only help traffic that starts in an Azure subnet; they do nothing for on-premises clients arriving over VPN (virtual private network) or ExpressRoute, and they do not extend across peered virtual networks unless the endpoint and rule exist for the peered subnet too.",
   "Blocking public traffic can break Azure services that need to reach your account, such as Azure Backup, Azure Monitor diagnostic logs, Azure Event Grid or Azure Site Recovery. The exception 'Allow Azure services on the trusted services list to access this storage account', shown as a checkbox under the firewall settings, lets those specific first-party services through using strong authentication. It does not open the account to every Azure customer's virtual machines; it covers only the listed platform services. Resource instance rules go further and allow one particular resource, such as a specific Azure Synapse workspace, to reach the account through its managed identity, which is tighter than trusting a whole service.",
   "A private endpoint is the strongest option. It creates a network interface in one of your subnets with a private IP address from that subnet, connected by Azure Private Link to one sub-resource of the storage account: `blob`, `file`, `queue`, `table`, `web` or `dfs`. Clients in the virtual network, in peered networks, or on-premises networks connected by VPN or ExpressRoute reach the account over that private IP. You can then set public network access to Disabled so the account has no internet exposure at all. You need one private endpoint per sub-resource you use, so an app that uses both blobs and file shares needs two private endpoints.",
   "Private endpoints depend on DNS (Domain Name System), and most private endpoint problems are DNS problems. The account name must resolve to the private IP for clients that should use the endpoint. The portal offers to integrate with a private DNS zone such as `privatelink.blob.core.windows.net`, linked to your virtual network, so `name.blob.core.windows.net` resolves through a CNAME record to the private address. On-premises clients need DNS forwarding to Azure, for example through Azure DNS Private Resolver, to get the same answer; otherwise they resolve the public IP and are blocked by the firewall. Running `nslookup name.blob.core.windows.net` from a client quickly shows which address it receives: a 10.x or other private address means the setup works, a public address means DNS is not configured for that client.",
   "Consider a worked example. A finance team's storage account must not be reachable from the internet, but VMs in the Hub virtual network and users in the on-premises office over VPN need to read blobs. You create a private endpoint for the `blob` sub-resource in a Hub subnet, integrate it with the `privatelink.blob.core.windows.net` private DNS zone, configure on-premises DNS forwarding, and set public network access to Disabled. You enable the trusted services exception so Azure Backup still works. An `nslookup` from the office now returns the private address, and a test from a home internet connection is refused.",
   "Common mistakes: trying to add a private IP range to the IP rules; adding a subnet rule without enabling the `Microsoft.Storage` service endpoint; expecting service endpoints to help on-premises clients; creating a private endpoint for `blob` and expecting file shares to work through it; forgetting DNS so clients still resolve the public address; and locking down the firewall without the trusted services exception, which silently breaks backup or logging.",
   "Exam wording: 'allow the office's public IP' points to an IP network rule. 'Allow a subnet' or 'traffic over the Azure backbone while keeping the public endpoint' points to a service endpoint and virtual network rule. 'Private IP address', 'no public access', 'on-premises over VPN or ExpressRoute' or 'peered network' points to a private endpoint. 'Azure Backup or diagnostic logs stopped working after restricting access' points to the trusted Microsoft services exception. 'Name still resolves to a public address' points to private DNS zone configuration."
  ],
  "analogy": "Picture a bank branch. IP rules are a guard who admits people only from listed street addresses. A service endpoint is a private shuttle from your office park: it uses a protected road and the guard recognizes your badge, but you still walk through the public front door. A private endpoint is a teller window built inside your own office, reachable only from within. The analogy stops at DNS: unlike a real window, clients only use the private one if their directory lookup points them there.",
  "terms": [
   [
    "Storage firewall",
    "Network rules on a storage account that allow only listed public IP ranges, subnets and exceptions to connect."
   ],
   [
    "IP network rule",
    "A firewall rule that allows a public IP address or CIDR range; private ranges are not allowed."
   ],
   [
    "Service endpoint",
    "A subnet setting that routes traffic to a service over the Azure backbone and identifies the subnet so it can be allowed by virtual network rules."
   ],
   [
    "Trusted Microsoft services",
    "A firewall exception that lets specific Azure platform services access the account even when public access is restricted."
   ],
   [
    "Resource instance rule",
    "A firewall rule that allows one specific Azure resource, through its managed identity, to reach the account."
   ],
   [
    "Private endpoint",
    "A network interface with a private IP in your subnet that connects to a specific storage sub-resource through Private Link."
   ],
   [
    "Private DNS zone",
    "A DNS zone such as privatelink.blob.core.windows.net that resolves the account name to the private endpoint's IP inside linked networks."
   ]
  ],
  "example": "A finance team's storage account must not be reachable from the internet, but VMs in the Hub virtual network and the on-premises office over VPN need to read blobs. The administrator creates a private endpoint for the blob sub-resource in a Hub subnet, integrates it with the privatelink.blob.core.windows.net private DNS zone, configures on-premises DNS forwarding, and sets public network access to Disabled. The trusted services exception is enabled so Azure Backup still works.",
  "mistakes": [
   [
    "Adding a private range such as 10.1.0.0/16 to the storage firewall's IP rules.",
    "IP rules accept only public addresses. Allow Azure subnets with virtual network rules (service endpoints) or use a private endpoint."
   ],
   [
    "Choosing a service endpoint so on-premises users over VPN can reach the account privately.",
    "Service endpoints apply only to traffic from Azure subnets and still use the public endpoint. On-premises private access needs a private endpoint with DNS forwarding."
   ],
   [
    "Creating one private endpoint and expecting blobs and file shares both to work through it.",
    "Each private endpoint targets one sub-resource. Blob and file need separate endpoints and DNS zones."
   ],
   [
    "Locking down the firewall and then wondering why Azure Backup or diagnostic logs fail.",
    "Enable the 'Allow Azure services on the trusted services list' exception, or a resource instance rule, so those platform services can still connect."
   ]
  ],
  "tryit": [
   [
    "Elm Street Clinic's VMs in one subnet must reach a storage account, and nothing else should. There is no on-premises access and the team wants the simplest, lowest-effort option, keeping the account's public endpoint. What do you configure?",
    "Enable the Microsoft.Storage service endpoint on the subnet, add a virtual network rule for that subnet, and set public access to selected networks. This meets the need without private endpoints or DNS changes; a private endpoint would only be needed for a private IP or on-premises and peered access."
   ],
   [
    "After you create a blob private endpoint and disable public access, an on-premises server gets 'This request is not authorized to perform this operation' errors. nslookup on the server returns a public IP. What is wrong and how do you fix it?",
    "The server resolves the public address, which is now blocked. Configure on-premises DNS to forward the storage zone to Azure, for example through Azure DNS Private Resolver, so the name resolves to the private endpoint's IP."
   ]
  ],
  "tip": "Service endpoints keep the public endpoint and only work from Azure subnets; private endpoints give a private IP usable from peered and on-premises networks. IP rules cannot contain private addresses, and private endpoints need correct DNS.",
  "check": [
   [
    "You add a subnet to a storage firewall, but the portal says a service endpoint is required. Which one?",
    "Microsoft.Storage on that subnet."
   ],
   [
    "After restricting a storage account to selected networks, Azure Backup can no longer write to it. What should you enable?",
    "The exception that allows trusted Microsoft services to access the storage account."
   ],
   [
    "On-premises users connected by VPN must reach a storage account using a private IP address. Service endpoint or private endpoint?",
    "A private endpoint; service endpoints only apply to traffic from Azure subnets and still use the public endpoint."
   ],
   [
    "A private endpoint for blob exists, but a VM still connects to the public IP. What is the likely cause?",
    "DNS: the private DNS zone is missing or not linked to the VM's virtual network, so the name resolves to the public address."
   ]
  ]
 },
 {
  "t": "Shared access signatures: account, service and user delegation SAS; stored access policies; access keys and key rotation",
  "hook": "On Friday afternoon, Marcus from the partnerships team at Northfield Logistics forwards you an email thread. A contractor they stopped working with this morning still has a link that lets them upload files into your shipping-manifests container, and the link does not expire for another month. Worse, someone suggests \"just regenerate the storage key\", but three production apps use that key, and the weekend shipping run starts in two hours. You need the contractor out now, without breaking everything else. Whether that is a one-click fix or an evening of outages depends on how the link was created in the first place.",
  "simple": "A storage account comes with two master passwords, called access keys. Anyone with one can do anything to all the data, so you do not want to hand them out. Instead you can create a special link, called a shared access signature or SAS, that says exactly what the holder may do, where, and until when: for example, 'upload to this one folder until Sunday'. It is like a hotel key card that opens one room for three nights, instead of the master key. Some links can be tied to a rule kept on the container, so you can cancel the link by deleting the rule. Because there are two master keys, you can change one while apps use the other, so nothing breaks.",
  "body": [
   "Begin with the keys, because everything else is built around their danger. Every storage account has two access keys, key1 and key2. Either key gives full control of all data in the account, much like a root password, which is why sharing keys with applications or partners is risky: you cannot limit what the holder does, which container they touch or how long they keep access. Shared access signatures (SAS) exist so you can hand out limited, time-bound access instead, and Microsoft Entra ID authorization with data-plane roles is better still wherever the client can use it.",
   "A SAS is a URI (uniform resource identifier) with a set of query parameters and a signature. The parameters describe what is allowed: which services and resource types, which permissions (read, write, delete, list, add, create), start and expiry times, optionally allowed IP addresses, and whether only HTTPS is permitted. In the token you will see fields such as `sp=rw` for permissions, `se=` for the expiry and `spr=https` for the protocol. The signature (`sig=`) proves the token was created by someone holding a secret, so the parameters cannot be altered. Anyone holding the URI can use it until it expires, so treat it like a password: use short expiry times, grant the fewest permissions, and require HTTPS. In the portal you create one under Security + networking > Shared access signature (account level) or from a container's Shared access tokens menu, and from the CLI with commands such as `az storage blob generate-sas`.",
   "There are three kinds of SAS, and the exam expects you to tell them apart by what signs them and what they cover. An account SAS is signed with an account key and can grant access to one or more services (blob, file, queue, table) and to service-level operations such as listing containers or setting service properties. A service SAS is also signed with an account key but covers resources in just one service, such as a single container or blob. A user delegation SAS is signed with a user delegation key that you request using Microsoft Entra credentials, and it works only for Blob Storage (including Data Lake Storage). Its effective permissions are limited to what the Entra identity that requested it can do, and the user delegation key itself is valid for at most seven days, so these tokens are short-lived by design. Microsoft recommends user delegation SAS where possible because no account key is involved and access can be traced to an identity:",
   "```bash\naz storage container generate-sas --account-name stcontoso01 --name uploads \\\n  --permissions rw --expiry <utc-time-within-7-days> --auth-mode login --as-user --https-only\n```",
   "Revocation is where stored access policies matter. A stored access policy is defined on a container, file share, queue or table and holds the start time, expiry and permissions. A service SAS can reference the policy by name instead of carrying those values itself. To cancel every SAS tied to the policy, you change its expiry or delete the policy, and other clients are unaffected. Only service SAS can use stored access policies; an account SAS cannot. Without a stored access policy, the only way to revoke a key-signed SAS before it expires is to regenerate the account key that signed it, which also breaks everything else using that key. A user delegation SAS is revoked by revoking the user delegation keys or by removing the identity's role assignment.",
   "Two keys exist so you can rotate without downtime. The usual sequence is: update applications to use key2, regenerate key1 (`az storage account keys renew --account-name stcontoso01 --key key1`), then later move applications back to key1 and regenerate key2. Never regenerate the key your applications are currently using. You can set a key expiration policy so Azure flags keys older than a chosen number of days, and you should store keys or connection strings in Azure Key Vault rather than in application settings or code. For the strongest posture, disable 'Allow storage account key access' on the account's Configuration blade so only Entra ID authorization works; that also disables account and service SAS, leaving only user delegation SAS.",
   "Consider a worked example. A partner needs to upload files to one container for the next week. You create a stored access policy named `partner-upload` on the container with write and list permissions and a seven-day expiry, and issue a service SAS that references it. When the partnership ends early, you delete the policy and the partner's SAS stops working, while your own applications using the account keys are unaffected. Had you issued an account SAS instead, revoking it would have meant regenerating the key and updating every application that used it.",
   "Common mistakes: sharing account keys instead of a SAS; issuing long-lived SAS tokens with broad permissions; expecting an account SAS to use a stored access policy; thinking user delegation SAS works for Azure Files, queues or tables (it is Blob Storage only); and regenerating the key your applications are currently using, which causes an outage.",
   "Exam wording: 'revoke one partner's access without affecting others' points to a stored access policy. 'Avoid account keys' or 'use Entra credentials' points to user delegation SAS. 'Leaked account SAS' points to regenerating the signing key. 'Rotate keys without downtime' points to switching between key1 and key2. 'Access to several services in one token' points to an account SAS. 'Only Entra ID authorization allowed' points to disabling shared key access."
  ],
  "analogy": "An account key is the hotel's master key: it opens every room, forever. A SAS is a guest key card that opens one room until checkout. A stored access policy is like the front desk keeping a list of which cards belong to one tour group, so deactivating the group cancels all their cards at once. Without that list, the only way to kill a lost card early is to rekey the whole hotel. The analogy breaks slightly because a SAS is a link anyone can copy, not a physical card.",
  "terms": [
   [
    "Account key",
    "One of two secrets that give full access to a storage account's data and are used to sign account and service SAS."
   ],
   [
    "Account SAS",
    "A SAS signed with an account key that can span several services and service-level operations."
   ],
   [
    "Service SAS",
    "A SAS signed with an account key that grants access to resources in a single storage service."
   ],
   [
    "User delegation SAS",
    "A blob SAS signed with a key obtained through Microsoft Entra credentials, limited by that identity's permissions."
   ],
   [
    "Stored access policy",
    "A named set of SAS constraints on a container, share, queue or table that lets you revoke linked service SAS tokens."
   ],
   [
    "Key rotation",
    "Regenerating access keys on a schedule, using the second key to keep applications running during the change."
   ],
   [
    "Allow storage account key access",
    "An account setting that, when disabled, blocks shared key authorization and every SAS signed with an account key."
   ]
  ],
  "example": "A partner needs to upload files to one container for the next week. The administrator creates a stored access policy on the container with write and list permissions and a seven-day expiry, and issues a service SAS that references it. When the partnership ends early, the administrator deletes the policy and the partner's SAS stops working, while other applications using the account keys are unaffected.",
  "mistakes": [
   [
    "Revoking an account SAS by deleting a stored access policy.",
    "Account SAS cannot reference a stored access policy. Revoking it early means regenerating the account key that signed it."
   ],
   [
    "Picking user delegation SAS for an Azure Files share or a queue.",
    "User delegation SAS is supported only for Blob Storage, including Data Lake Storage. Other services need a service or account SAS."
   ],
   [
    "Regenerating key1 first during rotation while apps still use key1.",
    "Move apps to key2 first, then regenerate key1. Regenerating the active key causes an outage."
   ],
   [
    "Believing a SAS can be safely shared because it is not a key.",
    "Anyone holding the URI can use it until it expires. Keep expiry short, permissions minimal and require HTTPS."
   ]
  ],
  "tryit": [
   [
    "Juniper Analytics wants a reporting tool to read blobs from one container. Security policy says no account keys may be used anywhere, and every access must be traceable to an identity. The tool cannot sign in to Entra ID itself, so it needs a URL. What do you issue?",
    "A user delegation SAS for the container with read and list permissions, generated with Entra credentials. It does not use account keys, its permissions are capped by the issuing identity's role, and it can be traced to that identity. A service SAS or account SAS would require an account key."
   ],
   [
    "An account SAS with write access to all services was accidentally posted in a public code repository. Two internal apps use key1; nothing uses key2. Which key do you regenerate and how do you limit disruption?",
    "Find which key signed the SAS. If it was key2, regenerate key2 right away with no disruption. If it was key1, first switch the apps to key2, then regenerate key1. Afterward, consider moving partners to service SAS with stored access policies or user delegation SAS."
   ]
  ],
  "tip": "To revoke a SAS without affecting others, use a stored access policy. Account SAS cannot use one, so revoking it means regenerating the signing key. User delegation SAS is blob-only and does not use account keys.",
  "check": [
   [
    "Which SAS type is recommended for blob access because it avoids account keys?",
    "User delegation SAS, signed with a key obtained using Microsoft Entra credentials."
   ],
   [
    "A leaked account SAS must be invalidated immediately. What must you do?",
    "Regenerate the account key that signed it, since account SAS cannot be tied to a stored access policy."
   ],
   [
    "Why does a storage account have two access keys?",
    "So you can switch applications to one key while regenerating the other, rotating keys without downtime."
   ],
   [
    "You disable 'Allow storage account key access'. Which SAS types still work?",
    "Only user delegation SAS, because account and service SAS are signed with the account keys."
   ]
  ]
 },
 {
  "t": "Identity-based access for Azure Files (AD DS, Entra Domain Services, Entra Kerberos) with share-level RBAC and NTFS permissions",
  "hook": "Bluebell Architects has just retired its aging file server and moved every project folder to an Azure file share. On Monday morning, Hana in accounting calls: she can open the Payroll folder and read the spreadsheets, but every time she tries to save, Windows says access is denied. Her NTFS permissions on Payroll say Modify, exactly as they did on the old server. Meanwhile Leo, a remote designer on an Entra-joined laptop at home, cannot open the share at all. Two users, two different failures, and both trace back to how Azure Files decides who someone is and what they may do. Where do you look first?",
  "simple": "An Azure file share is a shared network drive that lives in Azure. You could let everyone open it with one shared password, but then everyone has full control and you cannot tell people apart. Instead you can have people sign in with their normal work account, using the same ticket system Windows offices already use, called Kerberos. Then access is checked twice: first, are you allowed into this share at all; second, what may you do inside each folder. Both checks must say yes. It is like an office building: your badge must open the front door, and then each room has its own lock. If either says no, you cannot get in.",
  "body": [
   "Azure Files offers managed file shares over SMB (Server Message Block), the same protocol Windows file servers use. You can mount a share with the storage account key, but that gives everyone who knows the key full access, like being administrator on the file server, and it cannot tell users apart in audit logs or permissions. For a real file-server replacement you want users to sign in with their own identities and receive only the access they should have. That is identity-based authentication, and it relies on Kerberos tickets, just like an on-premises Windows file share.",
   "Azure Files supports three identity sources for SMB, and a storage account can use only one of them at a time. You choose it on the storage account's File shares blade under identity-based access. The first is on-premises Active Directory Domain Services (AD DS). You join the storage account to your domain as a computer or service logon account, typically with the AzFilesHybrid PowerShell module and its `Join-AzStorageAccount` cmdlet, and users must be synchronized to Microsoft Entra ID with Entra Connect so share-level roles can be assigned to them. Clients need network line of sight to a domain controller to get their Kerberos tickets.",
   "The second source is Microsoft Entra Domain Services, a managed domain hosted in Azure. You enable it on the storage account, and clients joined to that managed domain use Kerberos against it. This suits organizations with no on-premises Active Directory that still need traditional domain features. The third is Microsoft Entra Kerberos, where Entra ID itself issues Kerberos tickets, so clients that are Microsoft Entra joined or hybrid joined can reach shares without line of sight to a domain controller. That makes it a natural fit for remote workers on internet connections. It was designed around hybrid user identities synchronized from AD DS.",
   "Once a user is authenticated, access is checked at two levels, and both must allow the action. Share-level permissions are Azure role-based access control (RBAC) roles assigned to Entra users or groups on the share or the storage account. Storage File Data SMB Share Reader gives read access. Storage File Data SMB Share Contributor gives read, write and delete. Storage File Data SMB Share Elevated Contributor additionally lets the user change NTFS (New Technology File System) permissions. You can also set a default share-level permission that applies to all authenticated identities, which saves assigning roles to each group if you want NTFS permissions to do all the fine-grained work.",
   "Directory and file level permissions are ordinary Windows NTFS access control lists (ACLs). To set them, an administrator mounts the share, commonly with the storage account key for full control or as a user with Elevated Contributor, and uses File Explorer's Security tab or `icacls`. The flags `(OI)(CI)` make the permission inherit to files and subfolders, and `M` means Modify. For example:",
   "```powershell\nnet use Z: \\\\stcontoso01.file.core.windows.net\\finance /user:localhost\\stcontoso01 <storage-account-key>\nicacls Z:\\Payroll /grant \"CONTOSO\\Finance-Staff:(OI)(CI)M\"\n```",
   "The effective access is the more restrictive of the two layers. A user with Share Contributor but only Read on a folder's NTFS ACL can only read that folder. A user with Share Reader but Modify in NTFS can still only read, because the share layer caps them. A user with Full Control in NTFS but no share-level role, and no default share permission, cannot open the share at all. Remember too that SMB uses TCP port 445. Identity configuration does not help if the client's network blocks outbound 445, which many internet service providers and some corporate firewalls do; in that case use a VPN, ExpressRoute or Azure File Sync to a local server.",
   "Consider a worked example. A company retires its on-premises file server and moves the data to an Azure file share. You join the storage account to the existing AD DS domain, confirm users sync to Entra ID, and set the default share-level permission to Storage File Data SMB Share Contributor. The NTFS ACLs copied from the old server with the data keep controlling who opens each department folder. Users map `Z:` with their normal domain credentials. A laptop user working from home cannot connect, and you trace it to port 445 being blocked by the home ISP, so she connects through the company VPN.",
   "Common mistakes: expecting two identity sources on one account; granting a share role and forgetting NTFS, or the reverse; giving Share Contributor to someone who must edit ACLs (they need Elevated Contributor); and mounting with the account key for everyday users, which bypasses identity entirely.",
   "Exam wording: 'Entra-joined devices, no line of sight to domain controllers' points to Microsoft Entra Kerberos. 'Existing on-premises domain, keep current NTFS permissions' points to AD DS authentication. 'Managed domain in Azure, no on-premises AD' points to Entra Domain Services. 'Can read but cannot write although NTFS allows it' points to the share-level role. 'Change NTFS permissions' points to Elevated Contributor. 'Cannot connect from home' often points to port 445."
  ],
  "analogy": "Think of an office building with a lobby turnstile and locked rooms. The share-level role is your badge at the turnstile: Reader lets you look around, Contributor lets you move things, Elevated Contributor also lets you rekey room locks. NTFS permissions are the locks on each room. You need both: a badge that admits you and a room lock that opens for you, and the stricter one decides. Where the analogy stops: the identity source is who prints the badges, and Azure lets only one printer per building.",
  "terms": [
   [
    "AD DS authentication",
    "Azure Files authentication where the storage account is joined to on-premises Active Directory and users present AD Kerberos tickets."
   ],
   [
    "Microsoft Entra Domain Services",
    "A managed Azure domain that can authenticate SMB access to Azure Files for clients joined to it."
   ],
   [
    "Microsoft Entra Kerberos",
    "An Azure Files option where Entra ID issues Kerberos tickets, so clients need no domain controller line of sight."
   ],
   [
    "Share-level permission",
    "An Azure RBAC role, such as Storage File Data SMB Share Contributor, that controls access to a whole file share."
   ],
   [
    "Default share-level permission",
    "A setting that grants a chosen share role to all authenticated identities without per-user assignments."
   ],
   [
    "NTFS permissions",
    "Windows access control lists on directories and files in the share that provide fine-grained access."
   ],
   [
    "Storage File Data SMB Share Elevated Contributor",
    "The share-level role that adds the ability to change NTFS permissions on files and folders."
   ]
  ],
  "example": "A company retires its on-premises file server and moves data to an Azure file share. The storage account is joined to the existing AD DS domain, the default share-level permission is set to Storage File Data SMB Share Contributor, and the NTFS ACLs copied from the old server continue to control who can open each department folder. Users map the drive with their normal domain credentials, and remote users connect through the VPN because home networks block port 445.",
  "mistakes": [
   [
    "Assuming NTFS Modify alone lets a user write to an Azure file share.",
    "The share-level RBAC role must also allow writing. With only Share Reader, the stricter layer limits the user to read."
   ],
   [
    "Giving Storage File Data SMB Share Contributor to the person who must manage folder permissions.",
    "Changing NTFS ACLs requires Storage File Data SMB Share Elevated Contributor (or mounting with the storage account key)."
   ],
   [
    "Enabling both AD DS and Entra Domain Services on one storage account for different user groups.",
    "A storage account supports only one identity source for SMB at a time. Use separate accounts if you truly need two."
   ],
   [
    "Mounting the share for all staff with the storage account key to save setup time.",
    "The key grants full control to everyone and bypasses identity and NTFS. Reserve it for administrative tasks."
   ]
  ],
  "tryit": [
   [
    "Copperline Media has no on-premises servers. All staff use Entra-joined Windows laptops, mostly from home, and their identities are hybrid accounts synced from an AD DS forest the company keeps only for legacy apps in Azure VMs. Laptops cannot reach any domain controller. Which identity source do you enable for the file share?",
    "Microsoft Entra Kerberos. Entra ID issues the Kerberos tickets, so Entra-joined clients do not need line of sight to a domain controller. AD DS authentication would require that line of sight, and Entra Domain Services would require the laptops to join the managed domain."
   ],
   [
    "A user has the Storage File Data SMB Share Contributor role and an NTFS ACL of Read on the Contracts folder. She says she can open files but cannot save edits. Is something broken?",
    "No. Effective access is the more restrictive layer, and NTFS allows only Read on that folder. If she should edit, an administrator with Elevated Contributor or the storage key updates the NTFS ACL to Modify."
   ]
  ],
  "tip": "Two layers: share-level RBAC first, NTFS second, and the stricter one wins. Only one identity source can be enabled per storage account. Elevated Contributor is the share role that allows changing NTFS ACLs.",
  "check": [
   [
    "A user has Storage File Data SMB Share Reader on a share and Full Control NTFS permission on a folder. Can they create files in the folder?",
    "No. Share-level Reader limits them to read-only, and the more restrictive layer applies."
   ],
   [
    "Which identity option lets Entra-joined laptops outside the office reach Azure Files with Kerberos without contacting a domain controller?",
    "Microsoft Entra Kerberos authentication."
   ],
   [
    "How do you usually set the initial NTFS permissions on a new share?",
    "Mount the share with administrative access (for example the storage account key) and use File Explorer or icacls to set the ACLs."
   ],
   [
    "Can one storage account use AD DS and Entra Domain Services authentication at the same time?",
    "No. A storage account supports only one identity source for SMB at a time."
   ]
  ]
 },
 {
  "t": "Encryption: Microsoft-managed vs customer-managed keys in Key Vault, infrastructure encryption, encryption scopes",
  "hook": "The compliance officer at Meadowbrook Health, Rosa, schedules a call with one agenda item. A hospital customer's new contract says Meadowbrook must be able to make that hospital's patient documents unreadable within minutes if the contract ends, and the auditors want proof the data is encrypted twice. \"Is our storage even encrypted?\" Rosa asks. It is, and always has been, but by keys Microsoft holds. Making the data unreadable on demand, encrypting twice, and doing it for one customer without affecting the others sharing the same account are three different features. One of them can only be turned on at the moment an account is created. Which one, and what does that mean for the existing account?",
  "simple": "Everything you store in Azure Storage is scrambled automatically so that nobody can read the raw disks. You cannot turn this off, and you do not pay extra for it. The only question is who holds the key that unscrambles it. By default Microsoft looks after the key. If your rules say you must hold the key yourself, you can keep it in a secure key safe in Azure called Key Vault, and if you ever lock that key away, the data becomes unreadable. Some strict customers want the data scrambled twice with two different keys, which you choose when creating the account. You can also use different keys for different customers' folders in one account, like separate padlocks on lockers in one room.",
  "body": [
   "Start with the baseline: all data written to Azure Storage is encrypted at rest automatically with 256-bit AES (Advanced Encryption Standard) encryption, a feature called Azure Storage encryption or Storage Service Encryption (SSE). You cannot turn it off, and it costs nothing extra. Encryption and decryption are transparent: applications read and write data normally, with no code changes. What you choose is who manages the keys and whether to add extra layers. That distinction, rather than whether data is encrypted, is what AZ-104 questions test.",
   "By default, Microsoft-managed keys are used. Microsoft generates, stores and rotates the keys, and you have nothing to configure. This meets most requirements. Some organizations, however, have compliance rules that demand control over the encryption key: the ability to rotate it on their own schedule, audit its use, or make data unreadable by revoking the key. For them there are customer-managed keys (CMK), configured on the storage account's Security + networking > Encryption blade, where the encryption type switches from Microsoft-managed keys to customer-managed keys.",
   "With customer-managed keys, you create an RSA key in Azure Key Vault or Azure Key Vault Managed HSM (hardware security module), and the storage account uses it to wrap (encrypt) the account's data encryption keys. This pattern is called envelope encryption: the data is still encrypted with data encryption keys, but those keys are only usable when your key unwraps them. The storage account needs a managed identity, system-assigned or user-assigned, with permission on the key, for example the Key Vault Crypto Service Encryption User role in the RBAC permission model, or get, wrap key and unwrap key permissions in a vault access policy. The key vault must have soft delete and purge protection enabled so the key cannot be permanently lost by accident.",
   "Rotation and revocation follow from that design. If you reference the key without a version, Azure Storage automatically picks up new key versions when you rotate it, so rotation is just adding a new version in Key Vault, and you can even schedule automatic rotation there. If you disable or delete the key, or remove the identity's access, the data becomes inaccessible until access is restored, which is both the point and the risk. The command-line form of the switch looks like this:",
   "```bash\naz storage account update --name stcontoso01 --resource-group rg-data \\\n  --encryption-key-source Microsoft.Keyvault \\\n  --encryption-key-vault <key-vault-uri> \\\n  --encryption-key-name storage-cmk\n```",
   "Infrastructure encryption adds a second layer of encryption at the infrastructure level, using a different encryption algorithm mode and separate keys that are always Microsoft-managed, so data is encrypted twice. It exists for strict compliance scenarios that require double encryption, and it can be combined with either Microsoft-managed or customer-managed keys for the service layer. It must be enabled when you create the storage account, on the Encryption tab of the creation wizard, and cannot be enabled or disabled afterwards. If an existing account needs it, you create a new account with it turned on and migrate the data.",
   "Encryption scopes let you use different keys within one account for Blob Storage. You create a scope on the account, backed by either a Microsoft-managed key or a customer-managed key, then set it as the default for a container or specify it when writing individual blobs. You can require that all blobs in a container use the container's default scope, so a client cannot write a blob under a different key. This suits multi-tenant applications where each customer's data needs its own key inside a shared account; disabling one customer's scope key affects only that customer.",
   "Consider a worked example. A healthcare company must be able to cut off access to patient documents immediately if a contract ends, and its auditors require double encryption. Because infrastructure encryption can only be chosen at creation, you create a new storage account with it enabled and migrate the data. You create a key in a Key Vault with soft delete and purge protection, give the account's system-assigned managed identity the Key Vault Crypto Service Encryption User role, and switch the account to customer-managed keys, referencing the key without a version. Rotation now only requires adding a new key version, and disabling the key would make the data unreadable.",
   "Common mistakes: believing encryption at rest is optional or must be enabled; expecting to add infrastructure encryption to an existing account; configuring CMK without a managed identity or without purge protection on the vault; deleting a key that still protects data; and confusing storage encryption with virtual machine disk features such as encryption at host or Azure Disk Encryption, which are covered with virtual machines. Encryption in transit is a separate setting too: 'Secure transfer required' and a minimum TLS (Transport Layer Security) version force clients to use HTTPS or encrypted SMB.",
   "Exam wording: 'control the key', 'rotate on our schedule' or 'revoke access to the data' points to customer-managed keys in Key Vault. 'Double encryption' points to infrastructure encryption, set at creation. 'Different keys for different customers in one account' points to encryption scopes. 'What does the storage account need to use CMK' points to a managed identity with key permissions and a vault with soft delete and purge protection. 'Disable encryption to improve performance' is not possible."
  ],
  "analogy": "Imagine a bank vault where every safe-deposit box is always locked. With Microsoft-managed keys, the bank holds all the keys. With a customer-managed key, the boxes' keys sit inside a lockbox only you can open, so if you take your lockbox home, nobody can open your boxes. Infrastructure encryption is a second locked door the bank adds around the vault. Encryption scopes give each tenant's boxes a different lockbox. The analogy stops at the second door: you cannot add it to a vault that is already built.",
  "terms": [
   [
    "Azure Storage encryption",
    "Automatic, always-on AES-256 encryption of data at rest in Azure Storage."
   ],
   [
    "Microsoft-managed key",
    "The default option in which Microsoft creates, stores and rotates the storage encryption keys."
   ],
   [
    "Customer-managed key (CMK)",
    "A key you control in Key Vault or Managed HSM that protects a storage account's data encryption keys."
   ],
   [
    "Envelope encryption",
    "Encrypting data with data encryption keys that are themselves wrapped by a separate key encryption key."
   ],
   [
    "Purge protection",
    "A Key Vault setting that prevents deleted keys from being permanently removed during the retention period; required for CMK."
   ],
   [
    "Infrastructure encryption",
    "An optional second layer of encryption at the infrastructure level that must be enabled at account creation."
   ],
   [
    "Encryption scope",
    "A named key configuration within a storage account that can be applied to containers or individual blobs."
   ]
  ],
  "example": "A healthcare company must be able to cut off access to patient documents instantly if a contract ends. The administrator creates a key in a Key Vault with purge protection, gives the storage account's system-assigned managed identity the Key Vault Crypto Service Encryption User role and switches the account to customer-managed keys. Disabling the key would make the data unreadable, and rotating it only requires adding a new key version.",
  "mistakes": [
   [
    "Planning a project to 'turn on encryption' for a storage account.",
    "Encryption at rest with AES-256 is always on and cannot be disabled. The real choices are key management and extra layers."
   ],
   [
    "Enabling infrastructure encryption on an existing account.",
    "It can only be set at account creation. Create a new account with it enabled and migrate the data."
   ],
   [
    "Pointing the account at a Key Vault key without giving the account any identity or permissions.",
    "The storage account needs a managed identity with get, wrap and unwrap rights on the key, and the vault needs soft delete and purge protection."
   ],
   [
    "Using a separate storage account per customer only to get separate keys.",
    "Encryption scopes provide per-container or per-blob keys inside one account."
   ]
  ],
  "tryit": [
   [
    "Silverline SaaS stores files for 40 customers in one storage account, one container per customer. A large customer demands that its data use a key it can have revoked, without affecting anyone else, and that no blob in its container can be written with a different key. What do you configure?",
    "Create an encryption scope backed by a customer-managed key in Key Vault for that customer, set it as the container's default scope and require that all blobs use the default scope. Disabling that key affects only the customer's container. Switching the whole account to CMK would tie every customer to one key."
   ],
   [
    "An engineer, trying to tidy Key Vault, deletes an old-looking key. An hour later, applications get errors reading a storage account configured with customer-managed keys. What happened and how can you recover?",
    "That key was protecting the account's data encryption keys, so the account can no longer unwrap them and data is inaccessible. Because CMK requires soft delete and purge protection, the deleted key can be recovered from Key Vault within its retention period, which restores access."
   ]
  ],
  "tip": "Infrastructure encryption can only be set when creating the account. CMK needs a managed identity and a key vault with soft delete and purge protection. Encryption at rest cannot be disabled.",
  "check": [
   [
    "Can you enable infrastructure encryption on an existing storage account?",
    "No. It must be enabled when the account is created, so you would create a new account and move the data."
   ],
   [
    "What does the storage account need in order to use a customer-managed key in Key Vault?",
    "A managed identity with permission to get, wrap and unwrap the key, and a key vault with soft delete and purge protection enabled."
   ],
   [
    "Two customers' blobs share one storage account, and each must be encrypted with a different key. What feature helps?",
    "Encryption scopes, each backed by a different key and set as the default on each customer's container."
   ],
   [
    "What happens to data if the customer-managed key is disabled?",
    "The data becomes inaccessible until the key is re-enabled or access restored, because the account can no longer unwrap its data encryption keys."
   ]
  ]
 },
 {
  "t": "Object replication, and data movement with AzCopy and Azure Storage Explorer",
  "hook": "Riverbend Studios renders short videos in a West Europe datacenter, but most of its new viewers are in North America, and they complain that clips take ages to start. Your manager, Tomas, wants a copy of every newly published video in an East US storage account, kept up to date automatically, with no one running scripts at midnight. At the same time the render team wants their nightly output pushed to Azure without re-uploading 2 TB of unchanged files every night, and an editor just wants to drag a few thumbnails into a container from her laptop. Three requests, three different tools. Which one fits each, and what has to be switched on before the automatic one will even save?",
  "simple": "Sometimes you need your files in more than one place. Azure gives you an automatic option and two do-it-yourself tools. Object replication is the automatic one: you set a rule once, and every new file put in one container is copied on its own to a container in another storage account, maybe in another part of the world. AzCopy is a command you type or schedule; it copies files fast and can copy only what has changed since last time. Azure Storage Explorer is a desktop app with folders and buttons, for people who prefer clicking to typing. Think of it as a mail-forwarding service, a moving truck you drive yourself, and a filing cabinet with drawers you can open.",
  "body": [
   "Moving data into, out of and between storage accounts is a routine administrator job: seeding a new account, keeping a copy near users in another region, or pushing nightly output from a server. Azure offers an automatic, policy-based option called object replication, and tools you run yourself: AzCopy on the command line and Azure Storage Explorer as a desktop application. Knowing which fits a scenario, and what each needs before it works, is what the exam tests.",
   "Object replication asynchronously copies block blobs from a container in a source storage account to a container in a destination account, which can be in another region or even another subscription. Typical uses are keeping a copy close to users in another region to reduce read latency, feeding a separate analytics account, or keeping a distribution copy for a different team. You configure a replication policy with one or more rules, each pairing a source container with a destination container, optionally filtered by blob name prefix and by creation time so that only new blobs, or everything, is copied. In the portal it lives on the storage account's Data management > Object replication blade, and the same policy is associated with both the source and the destination account.",
   "Object replication has prerequisites that are tested often. Blob versioning must be enabled on both the source and destination accounts, and change feed must be enabled on the source account. It works with block blobs only, not page or append blobs, and the destination container becomes read-only for replicated data while the policy exists, so applications cannot write there. It also does not replace geo-redundancy. Object replication is per container, asynchronous, and lets you choose the destination account and region and which blobs to copy. Geo-redundant storage (GRS) replicates the entire account to the fixed paired region, and you cannot choose the target or filter what is replicated.",
   "AzCopy is a free command-line tool for copying data to and from Blob Storage and Azure Files. You authenticate with `azcopy login`, which uses Microsoft Entra ID and needs a data-plane role such as Storage Blob Data Contributor, or by appending a shared access signature (SAS) token to the URL. Common commands look like this:",
   "```bash\n# <container-url> = the container's full URL on the account's blob endpoint\nazcopy login\nazcopy copy \"C:\\data\\*\" \"<container-url>\" --recursive\nazcopy sync \"C:\\data\" \"<container-url>\" --recursive --delete-destination=true\nazcopy copy \"<source-container-url>?<SAS>\" \"<destination-container-url>?<SAS>\" --recursive\n```",
   "The difference between `copy` and `sync` matters. `azcopy copy` copies everything you point it at. `azcopy sync` compares source and destination by last-modified time and copies only new or changed files, optionally deleting extra files at the destination with `--delete-destination`, which you should use with care because it removes data. Account-to-account copies run server to server, so data does not pass through your machine. AzCopy is the tool of choice for scripted, large or repeatable transfers, and it writes a job log and plan files so an interrupted transfer can continue with `azcopy jobs resume`.",
   "Azure Storage Explorer is a free graphical application for Windows, macOS and Linux. You connect with your Entra account, an account key, a connection string or a SAS URL, then browse containers, file shares, queues and tables, upload and download, change access tiers, create SAS tokens and set stored access policies. It uses AzCopy behind the scenes for transfers and suits one-off tasks and people who prefer a GUI (graphical user interface). For very large offline transfers over slow networks, where uploading would take weeks, Azure Data Box devices are the alternative: Microsoft ships a storage appliance, you copy data locally, and it is shipped back and loaded into your account.",
   "Consider a worked example. A media company produces videos in West Europe but many viewers are in East US. You enable versioning on both accounts and change feed on the source, then create an object replication policy from the source `published` container to a container in the East US account. New videos appear there shortly after upload without any scripts. An editor uses Storage Explorer to upload a few thumbnails by hand, and a nightly scheduled task on the render server runs `azcopy sync` to push only changed output files.",
   "Common mistakes: forgetting versioning on the destination or change feed on the source; expecting object replication to handle page or append blobs; using `azcopy copy` for nightly jobs and re-uploading everything; and running `azcopy login` as a Contributor who has no data-plane role, which fails with a permission error.",
   "Exam wording: 'automatically copy new blobs to another account or region' points to object replication. 'Prerequisites for object replication' points to versioning on both accounts and change feed on the source. 'Only copy new or changed files' points to `azcopy sync`. 'Script a large transfer' points to AzCopy. 'Graphical tool to browse and manage storage' points to Storage Explorer. 'Too much data for the network' points to Data Box."
  ],
  "analogy": "Object replication is like setting up mail forwarding: once the rule exists, every new letter arriving at one address is sent on to another, a little later, without you lifting a finger. AzCopy is renting a moving truck: you decide when to go and what to load, and with sync you only carry boxes that changed. Storage Explorer is walking through the house opening drawers by hand. The analogy breaks for forwarding prerequisites: the post office does not demand you keep old versions of every letter, but object replication does require versioning.",
  "terms": [
   [
    "Object replication",
    "Asynchronous, policy-based copying of block blobs from a source container to a destination container in another account."
   ],
   [
    "Blob versioning",
    "A feature that keeps previous versions of blobs automatically; required on both accounts for object replication."
   ],
   [
    "Change feed",
    "An ordered log of changes to blobs in an account, required on the source account for object replication."
   ],
   [
    "AzCopy",
    "A command-line tool for copying and synchronizing data with Blob Storage and Azure Files."
   ],
   [
    "azcopy sync",
    "An AzCopy command that copies only new or changed files and can optionally delete extra files at the destination."
   ],
   [
    "Azure Storage Explorer",
    "A free desktop GUI for browsing and managing storage accounts that uses AzCopy for transfers."
   ],
   [
    "Azure Data Box",
    "A physical device Microsoft ships for transferring large amounts of data offline into Azure."
   ]
  ],
  "example": "A media company produces videos in West Europe but has many viewers in East US. The administrator enables versioning on two accounts and change feed on the source, then creates an object replication policy from the source published container to a container in East US. Separately, an editor uses Storage Explorer to upload a few files, while a nightly scheduled task runs azcopy sync to push the render server's changed output files.",
  "mistakes": [
   [
    "Enabling versioning only on the source account and expecting object replication to work.",
    "Versioning is required on both source and destination, and change feed on the source."
   ],
   [
    "Choosing GRS when the requirement is to copy one container to an account in a region you choose.",
    "GRS replicates the whole account only to the fixed paired region. Object replication lets you pick containers, destination account and region."
   ],
   [
    "Using azcopy copy in a nightly job for a mostly unchanged folder.",
    "azcopy sync transfers only new or changed files; copy re-sends everything you point it at."
   ],
   [
    "Assuming the Contributor role is enough for azcopy login transfers.",
    "Contributor is a control-plane role. Entra-authenticated data access needs a data-plane role such as Storage Blob Data Contributor."
   ]
  ],
  "tryit": [
   [
    "Granite Bay Research has 60 TB of instrument data on-premises and a 100 Mbps internet link that is already busy during the day. They want the data in Blob Storage within a few weeks. Should you use AzCopy, Storage Explorer or something else?",
    "Azure Data Box. At that size and bandwidth an online upload would take far too long and compete with daily traffic. AzCopy and Storage Explorer are good for online transfers, and AzCopy can handle later incremental changes after the bulk load arrives on the device."
   ],
   [
    "An object replication policy has been running for a month. A developer tries to write a configuration file directly into the destination container and gets an error. Is the policy broken?",
    "No. While a replication policy exists, the destination container is read-only for writes, so only replicated data can land there. The developer should write to the source container or to a different container in the destination account."
   ]
  ],
  "tip": "Object replication needs versioning on both accounts and change feed on the source, and it only handles block blobs. Use azcopy sync for incremental updates and azcopy copy for full copies.",
  "check": [
   [
    "Object replication setup fails. Which features must be enabled on the source and destination accounts?",
    "Blob versioning on both, and change feed on the source."
   ],
   [
    "Which AzCopy command copies only new or changed files from a local folder to a container?",
    "azcopy sync, run with --recursive for subfolders."
   ],
   [
    "An AzCopy command authenticated with azcopy login fails with a permission error, although the user is Contributor. Why?",
    "Entra authentication to blob data needs a data-plane role such as Storage Blob Data Contributor; Contributor is a control-plane role."
   ],
   [
    "How does object replication differ from GRS?",
    "Object replication copies chosen containers to an account and region you pick; GRS replicates the whole account to the fixed paired region."
   ]
  ]
 },
 {
  "t": "Blob containers and access tiers: Hot, Cool, Cold and Archive; rehydration from Archive",
  "hook": "At Ashford and Lane, a small law firm, the storage bill has crept up every month for three years. Nearly all of it is scanned case files that nobody opens after a case closes. You move the closed cases to the Archive tier and the bill drops sharply. Then, on a Tuesday at 1 p.m., Grace, a senior partner, walks over: an old case has been reopened, and she needs three scanned contracts for a 4 p.m. hearing. You click Download, and Azure refuses. The files are there, safe and cheap, but offline. Can you get them back in three hours, and will doing so throw away the archived originals the firm must keep?",
  "simple": "Azure lets you store files on different price shelves depending on how often you need them. The Hot shelf is near the front: more expensive to keep things on, but cheap and quick to grab. Cool and Cold shelves are further back: cheaper to store, a bit more expensive each time you fetch something, and you are expected to leave things there for a while. Archive is like a storage unit across town: very cheap, but you cannot open a box there. You must first ask for it to be brought back, which can take hours unless you pay for a rush delivery. Picking the right shelf for each file can cut your bill a lot.",
  "body": [
   "Start with where blobs live. Blob Storage stores unstructured data such as documents, images, backups and logs. Blobs live in containers, which are like top-level folders in a storage account, and a blob's full address is `<account>.blob.core.windows.net/<container>/<blob>` on the account's blob endpoint. There are three blob types: block blobs for most files, append blobs for data that is only ever added to, such as logs, and page blobs for random read and write access, used by virtual machine disks. Access tiers apply to block blobs, and choosing the right tier is one of the easiest ways an administrator can cut storage cost.",
   "Each container has an anonymous access level. Private means no anonymous access and is the default. Blob allows anonymous read of individual blobs if you know the URL. Container allows anonymous read and listing of the whole container. Anonymous access only works if the storage account setting 'Allow blob anonymous access' is enabled. Keep it disabled unless you are deliberately publishing public content, because a single misconfigured container can expose sensitive data to anyone on the internet; a shared access signature is usually the better way to share. You create a container in the portal under Data storage > Containers, or with `az storage container create --account-name stcontoso01 --name reports --auth-mode login`.",
   "Access tiers trade storage cost against access cost. Hot is for frequently accessed data, with the highest storage price and the lowest access price. Cool is for infrequently accessed data kept at least 30 days, such as short-term backups. Cold is for rarely accessed data kept at least 90 days that still needs to be read quickly. Archive is for data rarely if ever read and kept at least 180 days, such as compliance records, with the lowest storage price and the highest cost and delay to read. If you delete or move a blob out of Cool, Cold or Archive before its minimum period, an early deletion charge applies for the remaining days. Hot, Cool and Cold are online tiers: data can be read immediately. Archive is offline: you cannot read or modify the blob's content, only its metadata.",
   "Tiers are set at two levels. The storage account has a default access tier (Hot or Cool, and Cold where supported) used for blobs without an explicit tier, while an individual blob can be set to any tier. Archive can only be set on individual blobs, not as the account default, and it is not supported on accounts using zone-redundant storage (ZRS), geo-zone-redundant storage (GZRS) or RA-GZRS. In the portal a blob's properties show its tier, and you change it with Change tier; from the CLI you run `az storage blob set-tier --account-name stcontoso01 --container-name reports --name 2019.pdf --tier Archive --auth-mode login`. At scale you would use lifecycle management rules rather than changing tiers by hand.",
   "To read an archived blob, you rehydrate it to an online tier, and there are two ways to do it. You can change the blob's tier with Set Blob Tier, which changes the original blob in place, so after rehydration there is no longer an archived copy. Or you can copy it to a new blob in an online tier with Copy Blob, which leaves the archived original in place; this is useful if you only need the data briefly or must keep the archived record untouched.",
   "Each rehydration has a priority. Standard priority can take up to 15 hours. High priority is faster, often under an hour for smaller blobs, and costs more. While it runs, the blob's properties show a rehydrate-pending status, and you can subscribe to an Azure Event Grid event that fires on completion instead of polling. Plan around this delay: Archive is only appropriate for data whose owners can tolerate hours of waiting.",
   "Consider a worked example. A law firm must keep scanned case files for seven years but almost never opens them. After a case closes, the files are set to Archive, cutting their storage cost sharply. Two years later an old case is reopened and a lawyer needs three files the same afternoon. The clerk copies them to a new blob in the Hot tier with High priority, so they are readable within the hour, and the archived originals stay untouched for compliance. The following week, a request for an entire archived folder with no deadline is rehydrated with Standard priority overnight to save money.",
   "Common mistakes: expecting to download an archived blob directly; trying to set Archive as the account default; choosing Archive on a ZRS or GZRS account; forgetting early deletion charges when moving data out of Cool, Cold or Archive too soon; choosing Hot for data that is read once a year; and enabling anonymous access at the account level when a shared access signature would do. Also remember that tiers apply to block blobs, not page blobs used by VM disks.",
   "Exam wording: 'frequently accessed' points to Hot. 'Infrequently accessed, stored at least 30 days' points to Cool. 'Rarely accessed but must be available immediately' points to Cold. 'Rarely accessed, can tolerate hours of latency, lowest storage cost' points to Archive. 'Read an archived blob within an hour' points to High priority rehydration. 'Keep the archived copy while reading the data' points to Copy Blob rather than Set Blob Tier. 'Deleted after 10 days in Cool' points to an early deletion charge."
  ],
  "analogy": "Think of a warehouse. Hot is the shelf by the loading dock: pricey floor space, instant pickup. Cool and Cold are the back aisles: cheaper rent, a small fee each time a forklift fetches something, and a minimum lease. Archive is an off-site storage unit: very cheap rent, but nothing can be opened there; you request delivery and wait, standard or rush. Copy Blob is ordering a photocopy delivered while the original stays in storage. The analogy stops at minimum leases: Azure charges the remainder if you leave early.",
  "mnemonic": "Minimum days, Hot to Archive: none, a month, a quarter, half a year. That is Hot 0, Cool 30, Cold 90, Archive 180, and each colder step means cheaper storage but costlier reads.",
  "terms": [
   [
    "Container",
    "A grouping of blobs inside a storage account, with its own anonymous access level."
   ],
   [
    "Access tier",
    "The Hot, Cool, Cold or Archive setting of a block blob that determines storage and access costs."
   ],
   [
    "Online tier",
    "Hot, Cool or Cold, in which blob data can be read immediately."
   ],
   [
    "Archive tier",
    "An offline tier for rarely accessed data; blobs must be rehydrated before they can be read."
   ],
   [
    "Rehydration",
    "Moving an archived blob back to an online tier, by changing its tier or copying it, with Standard or High priority."
   ],
   [
    "Early deletion charge",
    "A fee for removing or re-tiering a blob before the tier's minimum retention period ends."
   ],
   [
    "Anonymous access level",
    "A container setting (Private, Blob or Container) that controls unauthenticated reads, effective only if the account allows it."
   ]
  ],
  "example": "A law firm must keep scanned case files for seven years but almost never opens them. The files are set to Archive after the case closes. When an old case is reopened, a clerk copies the needed files to the Hot tier with High priority so they can be read the same day, leaving the archived originals untouched for compliance.",
  "mistakes": [
   [
    "Choosing Archive for data that is rarely read but must be available instantly.",
    "Archive is offline and needs hours of rehydration. Cold is the online tier for rarely accessed data that must be readable immediately."
   ],
   [
    "Setting Archive as the storage account's default access tier.",
    "Archive can only be set on individual blobs. The account default can be Hot or Cool, and Cold where supported."
   ],
   [
    "Using Set Blob Tier to read an archived record that must also remain archived.",
    "Set Blob Tier changes the original in place. Copy Blob to an online tier keeps the archived original."
   ],
   [
    "Moving blobs out of Cool after a week to save money, ignoring minimums.",
    "Cool, Cold and Archive have minimum periods (30, 90 and 180 days). Leaving early triggers an early deletion charge for the remaining days."
   ]
  ],
  "tryit": [
   [
    "Fairview Radiology keeps imaging reports that radiologists open a few times a year, but when they need one it is usually during a patient visit and must open immediately. The reports are kept for years. Which tier minimizes cost while meeting the need?",
    "Cold. It is an online tier for rarely accessed data with a 90-day minimum, so reports open instantly at lower storage cost than Hot or Cool. Archive would be cheaper to store but would make doctors wait hours for rehydration."
   ],
   [
    "A storage account uses GZRS. A team asks you to move ten-year-old logs in it to Archive to save money. What do you tell them?",
    "Archive is not supported on ZRS, GZRS or RA-GZRS accounts. Options are to use Cold in this account, or move the logs to a separate account with LRS, GRS or RA-GRS redundancy where Archive is available."
   ]
  ],
  "tip": "Archive is offline and must be rehydrated first; Standard priority can take up to 15 hours. Minimum durations are 30 days for Cool, 90 for Cold and 180 for Archive. Archive cannot be the account default tier.",
  "check": [
   [
    "A user needs to read an archived blob within the hour. What should you do?",
    "Rehydrate it with High priority, either by changing its tier or by copying it to an online tier."
   ],
   [
    "Which tier is cheapest for storage but cannot be read directly?",
    "Archive, which is offline until rehydrated."
   ],
   [
    "A blob in the Cool tier is deleted after 10 days. What cost applies?",
    "An early deletion charge for the remaining 20 days of the 30-day minimum."
   ],
   [
    "Data is read only a few times a year but must be available instantly when needed. Which tier fits best?",
    "Cold, an online tier for rarely accessed data that can still be read immediately; Archive would need hours of rehydration."
   ]
  ]
 },
 {
  "t": "Lifecycle management policies that tier or delete blobs by age",
  "hook": "Kestrel Devices runs a fleet of smart thermostats, and every one of them uploads diagnostic files to a storage account. Two years in, the account holds 400 million blobs, every one still in the Hot tier, and the finance lead, Imani, has circled the storage line on the cloud bill. Engineers only look at files from the last few weeks. You could write a script to retier blobs, but then someone has to run it, monitor it and fix it when it fails at 3 a.m. Azure can do this for you with a few lines of JSON. But you create the rule, refresh the portal, and nothing moves. Did you do something wrong, or is something else going on?",
  "simple": "Imagine a filing system that tidies itself. You write down simple rules once, like 'when a file has not been changed for 30 days, move it to the cheaper shelf; after 90 days, send it to off-site storage; after a year, shred it'. Azure then checks your files about once a day and follows those rules for you, so nobody has to remember to do it. You can aim a rule at just one folder or at files with a certain label. These rules are called lifecycle management policies. They save money because old files that nobody reads stop sitting on the most expensive shelf. Just be patient: the first run can take up to a day.",
  "body": [
   "Setting access tiers by hand does not scale when a storage account holds millions of blobs. Lifecycle management lets you define rules that Azure runs automatically, moving blobs to cooler tiers as they age and deleting them when they are no longer needed. It is the standard way to keep storage costs in line with how data is actually used: logs that are hot for a week, reports that are read for a month, backups kept for a year and then removed. One policy per account can hold many rules, so different containers or kinds of data can follow different schedules.",
   "Here is how a policy is structured. A lifecycle management policy is a JSON document of rules, attached to a storage account (general-purpose v2, premium block blob or legacy Blob Storage accounts) under Data management > Lifecycle management. Each rule has a name, an enabled flag, filters that select blobs and actions that say what to do. Filters include `blobTypes` (such as `blockBlob` or `appendBlob`), `prefixMatch` (a container name followed by an optional path, such as `logs/app1`) and `blobIndexMatch` (blob index tags, key and value pairs you set on blobs). Actions apply to the current version of blobs (`baseBlob`), and separately to previous versions (`version`) and snapshots (`snapshot`).",
   "Actions and conditions come next. Actions include `tierToCool`, `tierToCold`, `tierToArchive` and `delete`, each with a condition. Conditions are based on age: days since the blob was last modified (`daysAfterModificationGreaterThan`), days since creation (`daysAfterCreationGreaterThan`), or days since last access (`daysAfterLastAccessTimeGreaterThan`). The last one requires last access time tracking to be enabled on the account, because otherwise Azure does not record reads. With last access time you can also use `enableAutoTierToHotFromCool` to move a blob back to Hot when it is read again, which suits data whose popularity comes and goes. Here is a rule for a logs container:",
   "```json\n{\n  \"rules\": [{\n    \"name\": \"age-logs\",\n    \"enabled\": true,\n    \"type\": \"Lifecycle\",\n    \"definition\": {\n      \"filters\": { \"blobTypes\": [\"blockBlob\"], \"prefixMatch\": [\"logs/\"] },\n      \"actions\": { \"baseBlob\": {\n        \"tierToCool\":    { \"daysAfterModificationGreaterThan\": 30 },\n        \"tierToArchive\": { \"daysAfterModificationGreaterThan\": 90 },\n        \"delete\":        { \"daysAfterModificationGreaterThan\": 365 }\n      } }\n    }\n  }]\n}\n```",
   "Reading the example closely, the policy moves block blobs in the logs container to Cool after 30 days without modification, to Archive after 90 and deletes them after a year. The portal's list view builds the same JSON through a wizard, and the code view shows the raw document, which is handy for copying between accounts. From the command line you apply a saved file with `az storage account management-policy create --account-name stcontoso01 --resource-group rg-data --policy @policy.json`.",
   "Timing and design deserve attention. Azure runs the policy about once a day, and after you create or change a policy it can take up to 24 hours before actions start, so do not expect blobs to move immediately in a lab. Order actions so tiers only get cooler over time. Respect minimum retention periods: moving from Cool to Archive before 30 days incurs early deletion charges, so leave sensible gaps between steps. Add `version` or `snapshot` actions to clean up old versions if versioning is on; otherwise old versions keep costing money even after the current blob is tiered or deleted.",
   "Consider a worked example. An Internet of Things (IoT) platform writes diagnostic files to a `telemetry` container. Engineers read them for a few weeks, auditors occasionally ask for older data, and nothing older than two years is needed. You create one rule with `prefixMatch` `telemetry/` that tiers blobs to Cool at 30 days, to Archive at 180 days and deletes them at 730 days. Because versioning is enabled for protection, you add a `version` action that deletes previous versions after 90 days. The next month's bill shows storage cost falling, and nobody had to write or schedule a script.",
   "Common mistakes: using a last-access condition without enabling access time tracking; expecting rules to act within minutes; filtering with a path that omits the container name; forgetting that previous versions and snapshots are not touched by `baseBlob` actions; and tiering to Archive on an account using zone-redundant storage (ZRS) or geo-zone-redundant storage (GZRS), where Archive is not supported. Another trap is deleting data with a lifecycle rule that a legal hold or retention requirement says must be kept; check requirements before adding `delete`.",
   "Exam wording: 'automatically move blobs to a cooler tier after N days' points to a lifecycle management rule. 'If nobody has read it for N days' points to `daysAfterLastAccessTimeGreaterThan` with last access time tracking enabled. 'Only in one container' or 'only in a folder' points to `prefixMatch`. 'Based on blob index tags' points to `blobIndexMatch`. 'Old versions keep growing costs' points to a `version` delete action. 'Rule created but nothing happened yet' points to the 24-hour delay."
  ],
  "analogy": "A lifecycle policy is like a library's standing instructions to its staff: books not borrowed in a month go to the back stacks, after six months to the basement, and after five years to the book sale. Nobody decides each book by hand; the staff walk the shelves once a day and apply the rules. The analogy stops at timing: a new instruction is not followed instantly, and the staff only notice who borrowed a book if the library has turned on its borrowing log, just like last access tracking.",
  "terms": [
   [
    "Lifecycle management policy",
    "A set of JSON rules on a storage account that automatically tier or delete blobs based on conditions."
   ],
   [
    "prefixMatch",
    "A rule filter that limits a rule to blobs whose names start with a container name and optional path."
   ],
   [
    "blobIndexMatch",
    "A rule filter that selects blobs by their blob index tags."
   ],
   [
    "daysAfterModificationGreaterThan",
    "A condition that triggers an action when a blob has not been modified for more than the given number of days."
   ],
   [
    "Last access time tracking",
    "An account setting that records blob reads so rules can act on days since last access."
   ],
   [
    "enableAutoTierToHotFromCool",
    "An option that moves a blob back to Hot when it is accessed again, used with last access time conditions."
   ],
   [
    "baseBlob, version and snapshot actions",
    "Separate action sections for current blobs, previous versions and snapshots in a lifecycle rule."
   ]
  ],
  "example": "An IoT platform writes diagnostic files to a telemetry container. Engineers read them for a few weeks, auditors occasionally ask for older data, and nothing older than two years is needed. A lifecycle rule tiers telemetry blobs to Cool at 30 days, to Archive at 180 days and deletes them at 730 days, and a version action removes old versions after 90 days, cutting storage cost without any scripts.",
  "mistakes": [
   [
    "Writing a rule with daysAfterLastAccessTimeGreaterThan and nothing else.",
    "Last access time tracking must be enabled on the account first, or Azure has no read data to evaluate."
   ],
   [
    "Setting prefixMatch to a folder path such as 'app1/' when app1 is inside the logs container.",
    "prefixMatch starts with the container name, so the filter must be 'logs/app1'."
   ],
   [
    "Assuming a baseBlob delete action also removes old versions and snapshots.",
    "Previous versions and snapshots need their own version and snapshot actions."
   ],
   [
    "Concluding the policy is broken because blobs have not moved an hour after saving it.",
    "Policies run about once a day and can take up to 24 hours to take effect after a change."
   ]
  ],
  "tryit": [
   [
    "Oakridge Publishing keeps manuscripts in a drafts container. Editors open some old manuscripts again months later, and when they do, those should become fast and cheap to read again. Others are never touched. The team wants rarely read manuscripts to move to Cool automatically. What do you configure?",
    "Enable last access time tracking, then add a rule on prefixMatch 'drafts/' with tierToCool based on daysAfterLastAccessTimeGreaterThan and enableAutoTierToHotFromCool. Blobs nobody reads move to Cool, and a manuscript that is opened again returns to Hot. A modification-based rule would move manuscripts that are read often but never edited."
   ],
   [
    "A policy tiers blobs to Cool at 10 days and to Archive at 20 days. The account uses LRS. Will this work, and is it a good design?",
    "It will run, but it is a poor design. Blobs leave Cool after only 10 days of the 30-day minimum, so each one incurs an early deletion charge for the remaining days. Space the steps out, for example Cool at 30 days and Archive at 90 or later."
   ]
  ],
  "tip": "Lifecycle rules act on age since modification, creation or last access; last-access rules need access tracking enabled. Changes can take up to 24 hours to apply, and versions and snapshots need their own actions.",
  "check": [
   [
    "You want blobs moved to Cool if nobody has read them for 60 days. What must be enabled?",
    "Last access time tracking on the storage account, then a rule with daysAfterLastAccessTimeGreaterThan 60."
   ],
   [
    "Which filter restricts a lifecycle rule to one container?",
    "prefixMatch with the container name (optionally followed by a path)."
   ],
   [
    "You created a lifecycle rule an hour ago and nothing has changed. Is something wrong?",
    "Not necessarily; policies run about once a day and can take up to 24 hours to take effect."
   ],
   [
    "Versioning is enabled and storage costs keep rising although a baseBlob delete rule exists. Why?",
    "The baseBlob action does not remove previous versions; add a version action that deletes old versions after a set age."
   ]
  ]
 },
 {
  "t": "Data protection: blob and container soft delete, versioning, snapshots, change feed",
  "hook": "It is 4:15 p.m. on a Thursday at Larkspur Outfitters, an online gear shop, when the product pages start showing blank white squares. Sam, a developer, runs to your desk: a cleanup script he tested on his laptop ran against production. It overwrote 5,000 product images with empty files, then deleted a container of old catalogs for good measure. The storage account has a CanNotDelete lock on it, and Sam is hoping that saves him. It does not. Whether the shop is back to normal by dinner or spends days restoring from backup depends on which data protection checkboxes someone ticked months ago. Which ones would save you here?",
  "simple": "Mistakes happen: someone deletes a file, or a program writes junk over a good file. Azure Blob Storage has several safety nets. Soft delete is like a recycle bin: deleted files and folders wait there for a number of days before they are gone for good. Versioning keeps the old copy automatically every time a file is changed, like a document's version history. A snapshot is a photo of a file you take by hand at a moment you choose. The change feed is a diary that records every change made. Each safety net catches a different kind of mistake, so most teams turn on several of them together.",
  "body": [
   "Start with what does not protect your data. Resource locks stop someone deleting a storage account, but they do nothing to protect the data inside it from an accidental delete, an overwrite by a buggy application, or ransomware encrypting files. Blob Storage has its own data protection features, found on the account's Data management > Data protection blade. You usually combine several of them, because each protects against a different kind of mistake, and the exam expects you to match the feature to the threat.",
   "Soft delete is the recycle bin. Blob soft delete keeps deleted blobs, and blob snapshots, for a retention period you choose, between 1 and 365 days. During that time a deleted blob is hidden but can be restored with Undelete, in the portal by turning on Show deleted blobs in the container view, or through the API. After the period ends it is permanently removed. Container soft delete works the same way for whole containers: if someone deletes a container, you can restore it with all its blobs within the retention period. Neither protects against deleting the storage account itself; use a CanNotDelete lock for that. You can enable both from the CLI with `az storage account blob-service-properties update --account-name stcontoso01 --resource-group rg-data --enable-delete-retention true --delete-retention-days 14 --enable-container-delete-retention true --container-delete-retention-days 14`.",
   "Versioning handles overwrites. Blob versioning automatically keeps the previous state of a blob every time it is overwritten or deleted. Each version has a version ID based on a timestamp, the current version is the live blob, and you can promote any previous version back to current from the blob's Versions tab. Versioning is the strongest protection against accidental overwrites, and it is a prerequisite for object replication and point-in-time restore. Versions cost storage, so pair versioning with a lifecycle rule that deletes old versions after a while.",
   "Snapshots are the manual cousin of versioning. A snapshot is a read-only copy of a blob at the moment you take it, created by an administrator or by an application, for example just before a risky change. Snapshots share unchanged data with the base blob, so you pay mainly for the differences. The difference from versioning is control: snapshots only exist when someone creates them, whereas versioning captures every change automatically. Microsoft recommends versioning for new designs, and snapshots remain useful when an application wants to mark specific points in time.",
   "The change feed is an ordered, durable log of every create, modify and delete event on blobs in the account, stored as blobs in a special container named `$blobchangefeed`. It is used for auditing, for rebuilding state in other systems, and as a prerequisite for object replication (on the source account) and point-in-time restore. Point-in-time restore uses versioning, change feed and soft delete together to roll block blobs in chosen containers back to their state at a past date and time, such as just before a ransomware attack. Its retention must be shorter than the soft delete retention, because the restore relies on soft-deleted data still being there.",
   "For data that must not be changed at all, immutable storage adds WORM (write once, read many) policies. Time-based retention blocks changes and deletes until a period has passed, and legal holds block them until the hold is cleared. These can be set on containers or on individual versions, and a locked time-based policy cannot be shortened or removed, which is what regulators often require. In a lab, enable blob soft delete and versioning, upload a file, overwrite it and then delete it, and practice restoring both the previous version and the deleted blob so the portal steps feel familiar.",
   "Consider a worked example. A developer's script accidentally overwrites 5,000 product images with blank files and then deletes a container of old catalogs. Because versioning, blob soft delete and container soft delete were enabled with 14-day retention, you restore the deleted container first, then promote the previous version of each image. Point-in-time restore would also work here, if it was enabled, rolling the images container back to the moment before the script ran in one operation. No backup restore is needed, and the shop is back to normal within the hour.",
   "Common mistakes: relying on a resource lock to protect blobs; expecting soft delete to recover overwritten content (that is versioning's job, although soft delete does keep snapshots of overwritten blobs); forgetting to enable change feed and versioning before trying point-in-time restore; leaving versioning on without a lifecycle rule and watching costs climb; and assuming any of these features protect against deleting the storage account itself.",
   "Exam wording: 'recover a deleted blob' points to blob soft delete. 'Recover a deleted container' points to container soft delete. 'Recover content after an overwrite without anyone taking a copy first' points to versioning. 'Manually capture a copy before a change' points to a snapshot. 'Audit log of blob changes' points to change feed. 'Roll a container back to a time before an incident' points to point-in-time restore. 'Data must not be modified or deleted for seven years' points to immutable storage."
  ],
  "analogy": "Think of a shared office document system. Soft delete is the recycle bin that empties after a set number of days. Versioning is automatic version history that saves the old draft every time someone hits save. A snapshot is you choosing to save a copy as 'before the big edit'. The change feed is the audit trail listing who changed what and when. Immutable storage is a sealed archive box nobody can open until the date on the label. The analogy stops at the building: none of these help if the whole storage account is deleted.",
  "terms": [
   [
    "Blob soft delete",
    "A setting that retains deleted blobs and snapshots for a set number of days so they can be undeleted."
   ],
   [
    "Container soft delete",
    "A setting that retains deleted containers and their contents for a set number of days."
   ],
   [
    "Blob versioning",
    "Automatic retention of a blob's previous state each time it is modified or deleted."
   ],
   [
    "Snapshot",
    "A manually created read-only point-in-time copy of a blob."
   ],
   [
    "Change feed",
    "A durable, ordered log of blob changes stored in the $blobchangefeed container."
   ],
   [
    "Point-in-time restore",
    "A feature that rolls block blobs in chosen containers back to a past time using versioning, change feed and soft delete."
   ],
   [
    "Immutable storage",
    "WORM policies, time-based retention or legal hold, that prevent blobs from being changed or deleted."
   ]
  ],
  "example": "A developer's script accidentally overwrites 5,000 product images with blank files and then deletes a container of old catalogs. Because versioning, blob soft delete and container soft delete were enabled, the administrator restores the container within its retention period and promotes the previous version of each image, with no need to restore from backup.",
  "mistakes": [
   [
    "Believing a CanNotDelete lock on the storage account protects the blobs inside it.",
    "Locks act on the Azure resource (the account), not on data operations. Use soft delete, versioning or immutability to protect blobs."
   ],
   [
    "Choosing blob soft delete to recover content after an application overwrote a file.",
    "Versioning is the feature that keeps the previous content on every overwrite. Soft delete is aimed at deletions."
   ],
   [
    "Trying point-in-time restore on an account that only has soft delete enabled.",
    "Point-in-time restore needs versioning, change feed and blob soft delete, with its retention shorter than soft delete's."
   ],
   [
    "Choosing change feed when the requirement is to restore deleted data.",
    "The change feed records what changed for auditing and processing; it does not by itself restore anything."
   ]
  ],
  "tryit": [
   [
    "Willow Creek Bank must keep loan documents unchanged and undeletable for seven years to satisfy a regulator, and administrators themselves must not be able to shorten that period. Which feature do you use and how?",
    "Immutable storage with a time-based retention policy of seven years on the container, then lock the policy. A locked policy cannot be shortened or removed, which meets the regulator's requirement. Soft delete and versioning still allow deletion after their retention, so they do not satisfy WORM."
   ],
   [
    "A ransomware infection encrypted files in three containers over the past six hours. Versioning, change feed, blob soft delete and point-in-time restore were all enabled last year. What is the fastest recovery approach?",
    "Use point-in-time restore to roll those containers back to a time just before the infection began. It restores the block blobs in one operation using the existing versions and change feed, instead of promoting thousands of versions one by one."
   ]
  ],
  "tip": "Soft delete protects against deletion; versioning protects against overwrites; snapshots are manual. Object replication and point-in-time restore both need versioning and change feed. None of these protect the storage account itself.",
  "check": [
   [
    "An application overwrites a blob with bad data. Which feature lets you recover the old content automatically, without anyone having taken a copy first?",
    "Blob versioning, which keeps the previous version on each overwrite."
   ],
   [
    "Which feature restores a deleted container with all its blobs?",
    "Container soft delete, within its retention period."
   ],
   [
    "What is the change feed used for?",
    "It records blob changes in order for auditing and processing, and it is required for object replication and point-in-time restore."
   ],
   [
    "Regulations require that financial records cannot be changed or deleted for a fixed period. Which feature applies?",
    "Immutable storage with a time-based retention policy, which enforces WORM behavior."
   ]
  ]
 },
 {
  "t": "Azure Files: create and configure file shares, snapshots, soft delete, and SMB port 445 considerations",
  "hook": "Cedar Valley Engineering has just moved its shared drive to an Azure file share, and the cutover email went out at 8 a.m. By 8:20 the help desk queue is full. Nobody in the Millbrook branch office can map the new drive, yet you tested it yesterday from an Azure VM and it mounted in seconds. Ana, the branch manager, says her team has \"tried their passwords twenty times\". Then, mid-morning, someone at headquarters asks how to get back a spreadsheet they deleted by mistake. Neither problem is about passwords. One is about a single port number that many networks quietly block, and the other is about knowing which safety net works at the file level.",
  "simple": "Azure Files gives you a shared network drive that lives in Azure instead of on a server in your office. Computers connect to it the same way they connect to an office file server. To reach it, they use a specific network door numbered 445. Many home internet providers and some offices keep that door shut for safety, so the drive works from inside Azure but not from the office until you open another path, like a private tunnel. The share also has safety nets: snapshots are like photos of the whole drive at a moment in time, which let people grab an older copy of a file, and soft delete keeps a whole deleted share around for a while so you can undelete it.",
  "body": [
   "Azure Files provides fully managed file shares in the cloud that clients mount like a network drive, using SMB (Server Message Block) or, for premium shares, NFS (Network File System). Windows, Linux and macOS clients can all connect, and the shares can replace or extend on-premises file servers without you managing any server hardware or operating system. Azure File Sync can cache a share on local Windows Servers for fast access in branch offices, with the cloud share as the central copy, which also helps when direct SMB access to Azure is not possible.",
   "Shares live inside storage accounts, and the account type decides what you can build. A standard general-purpose v2 account hosts standard shares on hard-disk storage, with tiers such as transaction optimized, hot and cool that trade storage cost against transaction cost. A premium FileStorage account hosts premium shares on solid-state storage for low latency and high IOPS (input/output operations per second), and it is the only option for NFS shares. Each share has a quota or provisioned size, which in premium shares also determines performance. In the portal go to the storage account > Data storage > File shares > + File share; with the CLI run `az storage share-rm create --resource-group rg-files --storage-account stfiles01 --name finance --quota 1024`.",
   "Mounting is straightforward once the network allows it. On Windows, the portal's Connect button generates a script that essentially runs `net use Z: \\\\<account>.file.core.windows.net\\<share>` with credentials, either the storage account key or, better, identity-based authentication so users sign in as themselves. On Linux you mount with the `cifs` file system type, for example `sudo mount -t cifs //<account>.file.core.windows.net/finance /mnt/finance -o vers=3.1.1,credentials=/etc/smbcredentials/<account>.cred,serverino`, and add a line to `/etc/fstab` to make it persistent. The share's UNC (Universal Naming Convention) path always uses the account's file endpoint.",
   "Port 445 is the classic stumbling block. SMB uses TCP port 445. Clients outside Azure connect across the internet, and many internet service providers and corporate networks block outbound port 445 because of old SMB worms. If a mount fails from an office, test with PowerShell: `Test-NetConnection -ComputerName <account>.file.core.windows.net -Port 445`. If `TcpTestSucceeded` is False, the problem is the network path, not credentials. Options are to open the port on the firewall, connect over a site-to-site VPN (virtual private network), point-to-site VPN or ExpressRoute (usually with a private endpoint), or use Azure File Sync so users talk to a local server over the office network. Connections from outside the Azure region require SMB 3.x with encryption, so old SMB 2.1 clients cannot connect across the internet.",
   "Share snapshots capture a read-only, point-in-time copy of an entire file share. They are incremental, so only changes since the previous snapshot use space, rather than each snapshot being a full copy. Users on Windows can open Previous Versions on a file or folder in the mounted share to restore files themselves, and administrators can browse and restore from snapshots in the portal on the share's Snapshots blade. Azure Backup for Azure Files uses share snapshots under the hood and adds scheduling, retention and a restore interface, so most organizations let Backup manage snapshots rather than creating them by hand.",
   "Soft delete for file shares keeps a deleted share, including its snapshots, for a retention period you set, so you can undelete it from the File shares list by turning on Show deleted shares. It is enabled by default on new storage accounts, and you can adjust the retention on the account's data protection settings for file shares. Soft delete works at the share level only; to recover an individual file you use snapshots or backup. Keep that distinction in mind, because exam questions often offer soft delete as a distractor for single-file recovery.",
   "Consider a worked example. Staff in a branch office cannot map a new Azure file share, although it mounts fine from an Azure VM in the same region. You run `Test-NetConnection` to the share's endpoint on port 445 from the office and see it fail because the ISP blocks the port. Rather than asking the ISP, you create a private endpoint for the `file` sub-resource in the hub virtual network, configure DNS (Domain Name System) so the account name resolves to the private IP, and route access over the existing site-to-site VPN. The share mounts, and you configure Azure Backup to take daily snapshots so users can restore their own files from Previous Versions.",
   "Common mistakes: trying to create an NFS share in a standard account; blaming permissions when the real problem is a blocked port 445; expecting share soft delete to restore a single deleted file; assuming snapshots are full copies that double the cost; mounting with the storage account key for everyday users when identity-based access is available; and connecting from an old SMB client that does not support encryption.",
   "Exam wording: 'mounts from an Azure VM but not from on-premises' points to port 445 being blocked. 'Which command tests connectivity' points to `Test-NetConnection` on port 445. 'User restores a previous version of a file' points to share snapshots. 'Recover a deleted share' points to share soft delete. 'NFS' or 'low latency, high IOPS' points to a premium FileStorage account. 'Cache files locally in branch offices' points to Azure File Sync."
  ],
  "analogy": "Think of the file share as a shared storeroom in another building. Port 445 is the one road leading to it; if your town has closed that road, your key does not matter, and you need a private tunnel (VPN) or a local copy of the storeroom (File Sync). Snapshots are photos of every shelf taken at set times, so you can see and fetch yesterday's version of one box. Soft delete is a grace period before a demolished storeroom is cleared away. The analogy stops at snapshots: Azure stores only the changes, not full photos.",
  "terms": [
   [
    "Azure file share",
    "A managed SMB or NFS share hosted in a storage account that clients mount like a network drive."
   ],
   [
    "FileStorage account",
    "The premium storage account kind for file shares on SSD, required for NFS shares."
   ],
   [
    "Share snapshot",
    "An incremental, read-only point-in-time copy of a whole file share."
   ],
   [
    "File share soft delete",
    "A setting that retains deleted file shares for a period so they can be undeleted."
   ],
   [
    "Port 445",
    "The TCP port SMB uses, often blocked by ISPs and firewalls, which prevents mounting Azure file shares from outside."
   ],
   [
    "Test-NetConnection",
    "A PowerShell cmdlet that checks whether a TCP port, such as 445, is reachable on a host."
   ],
   [
    "Azure File Sync",
    "A service that caches an Azure file share on local Windows Servers for fast access."
   ]
  ],
  "example": "Staff in a branch office cannot map a new Azure file share, although it works from an Azure VM. The administrator runs Test-NetConnection to the share's endpoint on port 445 from the office and sees it fail because the ISP blocks the port. The fix is to route access over the existing site-to-site VPN to a private endpoint for the storage account, with DNS resolving the account name to the private IP.",
  "mistakes": [
   [
    "Resetting users' passwords or share permissions when an Azure file share will not mount from the office.",
    "If it mounts from Azure but not on-premises, test port 445 with Test-NetConnection. A blocked port is the usual cause."
   ],
   [
    "Using file share soft delete to bring back one deleted file.",
    "Soft delete restores whole shares. Use share snapshots (Previous Versions) or Azure Backup for individual files."
   ],
   [
    "Creating an NFS share in a standard general-purpose v2 account.",
    "NFS shares require a premium FileStorage account."
   ],
   [
    "Avoiding snapshots because each one supposedly doubles the storage used.",
    "Share snapshots are incremental and store only changes since the previous snapshot."
   ]
  ],
  "tryit": [
   [
    "Bayside Dental's three clinics each need fast access to a shared patient-forms folder. Their internet links are slow, and two clinics' ISPs block port 445. Each clinic already has a small Windows Server. How do you give staff fast, reliable access to an Azure file share?",
    "Deploy Azure File Sync with each clinic's Windows Server as a server endpoint. Staff use the local server over the clinic network, so port 445 to Azure is not needed for users and frequently used files open quickly, while the Azure file share stays the central copy."
   ],
   [
    "A Linux analytics cluster needs a shared file system using NFS with low, consistent latency. The team created a standard general-purpose v2 account and cannot find an NFS option. What do you advise?",
    "Create a premium FileStorage account and an NFS share in it. NFS is supported only on premium file shares, which also run on solid-state storage for the low latency the cluster needs."
   ]
  ],
  "tip": "If a share mounts from Azure VMs but not from on-premises, suspect blocked port 445 first. Soft delete protects whole shares; snapshots or Azure Backup restore individual files. NFS requires a premium account.",
  "check": [
   [
    "Which PowerShell command checks whether a client can reach an Azure file share over SMB?",
    "Test-NetConnection -ComputerName <account>.file.core.windows.net -Port 445."
   ],
   [
    "A user deletes one file from a share. Which feature lets them restore it themselves in Windows?",
    "Share snapshots, through the Previous Versions tab (Azure Backup also uses snapshots for this)."
   ],
   [
    "Which account type do you need for an NFS file share?",
    "A premium FileStorage account."
   ],
   [
    "An administrator deletes an entire file share by mistake. How do you recover it?",
    "If share soft delete is enabled, show deleted shares in the File shares list and undelete it within the retention period."
   ]
  ]
 },
 {
  "t": "ARM templates and Bicep files: interpret and modify, deploy, export a deployment as a template, convert ARM JSON to Bicep",
  "hook": "It is Thursday afternoon at Pinewood Outfitters, and Dev from the test team messages you: he needs an exact copy of the web app environment you built by hand in the portal last month, and he needs it by Monday. You remember clicking through a dozen blades, picking a plan size, typing settings you no longer recall. Doing it again by hand means guessing, and a slightly different copy means test results nobody trusts. Somewhere in the portal there is a way to turn what already exists into a file you can read, change and deploy again. Can you get from a hand-built resource group to a clean, reusable template before the weekend?",
  "simple": "Instead of building cloud resources by clicking buttons, you can write down what you want in a file and let Azure build it for you. That idea is called infrastructure as code. Azure understands two file styles. ARM templates are written in JSON, a strict text format full of braces and quotation marks. Bicep says the same things in shorter, friendlier lines and is turned into JSON behind the scenes. Think of a recipe card: once it is written, anyone can cook the same dish again, and if you want a bigger portion you change one number instead of rewriting the whole card. Parameters are the blanks you fill in each time, like the number of guests. Outputs are what the recipe hands back when it is done, like the address of the finished website.",
  "body": [
   "Infrastructure as code (IaC) means describing Azure resources in files and letting Azure Resource Manager (ARM), the deployment and management layer behind every Azure request, create them, instead of clicking through the portal. The files are repeatable, reviewable and version-controlled, so the same environment can be built for development, test and production without drift, the slow divergence that happens when people change each copy by hand. Azure's native formats are ARM templates, written in JSON (JavaScript Object Notation), and Bicep, a simpler domain-specific language that compiles to ARM JSON. Whatever you write, ARM receives JSON in the end. The exam expects you to read both formats, change a value correctly and deploy the result.",
   "Start with the shape of an ARM template, because every question about it relies on knowing where things live. It has a fixed structure: `$schema` and `contentVersion`, then `parameters` (values supplied at deployment time, such as a VM name), `variables` (values computed inside the template), `resources` (what to deploy, each with a `type`, `apiVersion`, `name`, `location` and `properties`), and `outputs` (values returned after deployment). Expressions in square brackets call template functions, for example `[resourceGroup().location]`, `[parameters('storageName')]` or `[concat(variables('prefix'), 'web')]`. `dependsOn` states ordering between resources, such as deploying a virtual network before the network interface that uses it. Parameters can have `allowedValues`, a `defaultValue` and types such as `string`, `int` and `securestring` for passwords, which keeps the value out of deployment history and logs. Bicep expresses the same things with far less punctuation. Here is a storage account with a parameter and an output:",
   "```bicep\nparam storageName string\nparam location string = resourceGroup().location\n\nresource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: storageName\n  location: location\n  sku: { name: 'Standard_LRS' }\n  kind: 'StorageV2'\n}\n\noutput blobEndpoint string = sa.properties.primaryEndpoints.blob\n```",
   "Read it top down. `param` declares inputs, with an optional default after the equals sign. `resource` declares a resource with a symbolic name (`sa`), a type and API version joined by `@`, and a body of properties. `output` returns a value once deployment finishes. Bicep works out dependencies automatically when one resource references another's symbolic name, so you rarely write `dependsOn`. To change the redundancy you would edit `Standard_LRS` to `Standard_GRS`; to let the deployer choose, add `@allowed(['Standard_LRS','Standard_GRS']) param skuName string` and use `skuName` in the resource. The decorator rejects any other value before anything is deployed. Reusable pieces go in modules (`module net './network.bicep' = { ... }`), which lets a team keep a standard network definition in one file and call it from many templates.",
   "Parameter values do not have to be typed every time. They can come from a parameters file, either `.json` or the newer `.bicepparam` format, so one template deploys dev and production with different values: a small SKU and one instance in dev, a larger SKU and more instances in production. The template stays identical, and only the parameters file changes. This is the main reason exam questions about reuse point to parameters rather than to editing the template itself.",
   "You can also start from what already exists. In the portal, a resource group or an individual resource has Export template under Automation, which generates a template describing its current state. A past deployment, listed in the resource group's Deployments blade, shows the original template and parameters that were used. Exported templates are a starting point, not a finished product. They often hard-code names and resource IDs, include read-only properties that cannot be set on deployment, and may not cover every resource type, so parameterize and clean them before reuse.",
   "Converting between formats is done with the Bicep CLI (command-line interface), which is included with the Azure CLI. `az bicep decompile --file main.json` converts an ARM JSON template to a Bicep file as a best effort; you then review the result and fix any warnings it prints. `az bicep build --file main.bicep` goes the other way and compiles Bicep to ARM JSON. You rarely need to build manually, because `az deployment group create --resource-group rg-app --template-file main.bicep` and `New-AzResourceGroupDeployment -ResourceGroupName rg-app -TemplateFile main.bicep` accept `.bicep` files directly and compile them for you. The portal's Deploy a custom template page accepts ARM JSON, offers quickstart templates, and lets you edit the template and fill in parameters in a form before deploying.",
   "Consider a worked example. You built a working web app environment by hand in the portal and now need an identical copy for a test team. You open the resource group, choose Export template, download the JSON and run `az bicep decompile` on it. The Bicep file has the web app name and App Service plan SKU hard-coded, so you replace them with `param appName string` and `param planSku string = 'B1'`, delete read-only properties the decompiler flagged, and create a `test.bicepparam` file with the test values. You deploy to a new resource group, check the output URL that the template returns, and commit the Bicep file to source control so future changes are reviewed before anyone deploys them.",
   "Common mistakes are predictable. People confuse parameters (supplied at deploy time) with variables (computed inside the template), expect an exported template to deploy cleanly without editing, run `decompile` when they meant `build`, change an `apiVersion` or SKU name to something the resource provider does not recognize, and hard-code secrets instead of using `securestring` parameters or Key Vault references.",
   "Exam wording follows these distinctions closely. 'Value chosen at deployment' points to a parameter. 'Value returned after deployment' points to an output. 'Reuse resources created manually' points to Export template. 'Convert JSON to Bicep' points to `az bicep decompile`, and 'compile Bicep to JSON' to `az bicep build`. 'Which line do you change to use geo-redundant storage' points to the `sku` name."
  ],
  "analogy": "A template is like an architect's blueprint with blanks on it. The blueprint fixes the structure of the house, while the blanks, such as paint color or number of bedrooms, are parameters the buyer fills in. Outputs are the keys and address handed over at the end. Export template is like sketching a blueprint from a house that already stands: useful, but it records details such as the current owner's name that you must erase before building the next house. Unlike a real blueprint, redeploying a template to an existing house fixes it rather than building a second one.",
  "mnemonic": "The core ARM template sections in order: Some Clever People Value Real Outcomes, for $schema, contentVersion, parameters, variables, resources, outputs.",
  "terms": [
   [
    "Infrastructure as code (IaC)",
    "Describing infrastructure in version-controlled files that a deployment engine turns into real resources."
   ],
   [
    "ARM template",
    "A JSON file that declares Azure resources, parameters, variables and outputs for Azure Resource Manager to deploy."
   ],
   [
    "Bicep",
    "A domain-specific language for Azure that compiles to ARM JSON with simpler syntax and automatic dependencies."
   ],
   [
    "Parameter",
    "A value supplied at deployment time so one template can be reused with different inputs."
   ],
   [
    "Variable",
    "A value computed inside the template, often from parameters, to avoid repeating expressions."
   ],
   [
    "Output",
    "A value a template returns after deployment, such as an endpoint URL."
   ],
   [
    "Export template",
    "A portal feature that generates a template from existing resources or shows a past deployment's template."
   ],
   [
    "Decompile",
    "Converting an ARM JSON template to Bicep with az bicep decompile."
   ],
   [
    "Parameters file",
    "A .json or .bicepparam file that supplies parameter values so one template serves several environments."
   ]
  ],
  "example": "An administrator built a working web app environment by hand in the portal and wants to recreate it for a test team. They use Export template on the resource group, decompile the JSON to Bicep, replace hard-coded names with parameters, and deploy it to a new resource group with a test parameters file, then commit the Bicep file to source control.",
  "mistakes": [
   [
    "Variables are the place to put values the deployer chooses at deployment time.",
    "Values chosen at deployment are parameters. Variables are computed inside the template and cannot be supplied by the deployer."
   ],
   [
    "An exported template is ready to deploy as is.",
    "Exported templates often hard-code names and IDs, include read-only properties and may skip some resource types. Parameterize and clean them first."
   ],
   [
    "az bicep build converts an ARM JSON template into Bicep.",
    "build compiles Bicep to JSON. decompile converts JSON to Bicep."
   ],
   [
    "You must compile a .bicep file to JSON before the Azure CLI or PowerShell can deploy it.",
    "az deployment group create and New-AzResourceGroupDeployment accept .bicep files directly and compile them automatically."
   ]
  ],
  "tryit": [
   [
    "Your team keeps one Bicep file for a storage account. Developers want Standard_LRS in dev, but production must use Standard_GRS, and nobody should be able to deploy any other SKU. A colleague suggests keeping two copies of the file with different hard-coded SKUs. What do you do instead?",
    "Keep one file and add a parameter with an allowed list, for example `@allowed(['Standard_LRS','Standard_GRS']) param skuName string`, then reference `skuName` in the `sku` block. Supply the value from a dev and a production parameters file. One template avoids drift, and the decorator rejects any other SKU before deployment."
   ],
   [
    "A vendor hands you a 900-line ARM JSON template and your team has standardized on Bicep. You also need to deploy it today to rg-vendor. Which commands do you use, and what do you check?",
    "Run `az bicep decompile --file vendor.json` to produce a Bicep file, review and fix the warnings it reports, then deploy with `az deployment group create --resource-group rg-vendor --template-file vendor.bicep`. No separate build step is needed. If time is short you can deploy the original JSON directly, since ARM accepts it."
   ]
  ],
  "tip": "Know where values come from: parameters are supplied at deployment, variables are computed in the template, outputs are returned afterwards. az bicep decompile converts JSON to Bicep; az bicep build goes the other way.",
  "check": [
   [
    "Which template section would you edit so that the VM size can be chosen at deployment time?",
    "Add a parameter for the size in the parameters section (param in Bicep) and reference it in the VM resource."
   ],
   [
    "How do you convert an existing ARM JSON template to Bicep?",
    "Run az bicep decompile --file template.json and review the result."
   ],
   [
    "Where can you get a template of resources that were created manually in the portal?",
    "Export template on the resource group or resource (under Automation), then clean up and parameterize it."
   ],
   [
    "Do you need to compile a Bicep file to JSON before deploying it with the Azure CLI?",
    "No. az deployment group create and New-AzResourceGroupDeployment accept .bicep files and compile them automatically."
   ],
   [
    "A template must return the web app's default host name after deployment. Which section do you use?",
    "The outputs section (output in Bicep), which returns values once the deployment completes."
   ]
  ]
 },
 {
  "t": "Deployment modes (incremental vs complete) and deploying with `az deployment group create` or `New-AzResourceGroupDeployment`",
  "hook": "It is 6:40 p.m. at Bluegate Logistics, and the release pipeline is waiting for your approval. The developer's template declares a VM and a storage account for rg-shipping, and the pipeline setting says Mode: Complete. You glance at the resource group and see a third resource: the key vault the security team created by hand last week, holding the certificates the shipping portal needs tonight. Nobody mentioned it in the template. If you click Approve, will Azure leave that key vault alone, or quietly delete it because the template never asked for it? One setting decides, and you need to know which way it cuts before you press the button.",
  "simple": "When you hand Azure a template for a resource group, Azure compares the template with what is already in that group. The deployment mode decides what happens to things in the group that the template does not mention. Incremental mode, the normal setting, only adds or updates what the template lists and leaves everything else alone. Complete mode makes the group match the template exactly, so anything extra gets deleted. Picture tidying a shared closet with a list. In incremental mode you put the listed items in place and ignore the rest. In complete mode you throw out anything not on your list, even your roommate's coat. A preview called what-if lets you read the list of changes before anything happens.",
  "body": [
   "When you deploy a template to a resource group, Azure Resource Manager (ARM) compares what the template declares with what already exists in that resource group. The deployment mode decides what happens to resources that are in the resource group but not in the template. This single setting can decide whether a deployment is a routine update or the moment production disappears, so the exam tests it, usually with a scenario listing which resources exist and which ones the template declares. Your job is to predict the end state.",
   "Incremental mode is the default, and it is the forgiving one. Resources in the template are created if missing or updated to match the template if they exist. Resources that exist in the resource group but are not in the template are left alone, whoever created them. There is one subtlety worth remembering: for resources that are in the template, the properties you specify are applied as written, so a property you omit may be reset to its default rather than kept. Incremental does not mean 'merge every property'; it means 'do not touch resources I did not mention'. Because template deployments are idempotent, redeploying the same template brings resources back to the declared state without creating duplicates, which is why teams can run the same pipeline again and again safely.",
   "Complete mode makes the resource group match the template exactly. Resources in the template are created or updated as in incremental mode, and any resource in the resource group that is not in the template is deleted. Complete mode only applies to resource group deployments; subscription, management group and tenant deployments do not support it. It is useful when a resource group is owned entirely by one template, because removing a resource from the file then removes it from Azure. It is dangerous if other people also create resources in that group, because their work vanishes on the next deployment. A CanNotDelete lock on a resource prevents complete mode from deleting it, and the deployment reports an error for that resource instead. For new designs Microsoft recommends deployment stacks, which track the resources they manage, as a safer way to clean up resources removed from a template.",
   "Before any risky deployment, and always before complete mode, preview the changes with what-if. It lists each resource with a change type: Create, Modify, Delete, NoChange or Ignore, and for modified resources it shows which properties would change. Nothing is altered while it runs. The commands look like this:",
   "```bash\n# Azure CLI: preview, then deploy in complete mode\naz deployment group what-if --resource-group rg-web --template-file main.bicep --parameters @prod.parameters.json --mode Complete\naz deployment group create  --resource-group rg-web --template-file main.bicep --parameters @prod.parameters.json --mode Complete\n\n# Azure PowerShell equivalent (incremental is the default if -Mode is omitted)\nNew-AzResourceGroupDeployment -ResourceGroupName rg-web -TemplateFile main.bicep -TemplateParameterFile prod.parameters.json -Mode Complete -WhatIf\nNew-AzResourceGroupDeployment -ResourceGroupName rg-web -TemplateFile main.bicep -TemplateParameterFile prod.parameters.json\n```",
   "Now the mechanics of the commands themselves. Parameters can be passed inline (`--parameters storageName=stcontoso01` in the Azure CLI, or as named arguments like `-storageName stcontoso01` in PowerShell) or from a parameters file; inline values override file values when both are given, which is handy for a one-off change without editing the file. The resource group must exist first, created with `az group create` or `New-AzResourceGroup`, because a resource group deployment cannot create its own container. Other scopes use different commands: `az deployment sub create` or `New-AzSubscriptionDeployment` deploy at subscription level, for example to create resource groups or assign policies, and there are management group and tenant variants too.",
   "Every deployment leaves a record. It appears under the resource group's Deployments blade with its template, parameters, the operations it ran and any error. If a deployment fails, open that entry to see which resource failed and the error message, fix the template or parameters and redeploy. Resources that succeeded stay in place, and because deployments are idempotent the rerun simply completes the rest.",
   "Consider a worked example. A resource group contains a VM, a storage account and a key vault that the security team created by hand. A developer's template declares only the VM and storage account, and the pipeline is set to complete mode. You run `az deployment group what-if --mode Complete` first, and the output lists the key vault with a Delete change type. You stop the pipeline, discuss it with the security team, and either add the key vault to the template or switch the pipeline to incremental mode. Only then do you run `az deployment group create`. A CanNotDelete lock on the key vault would have been a useful second line of defense.",
   "Common mistakes: assuming incremental mode deletes resources removed from the template (it never does); running complete mode against a shared resource group; forgetting that complete mode applies only at resource group scope; assuming an omitted property keeps its current value; and deploying to a resource group that does not exist yet. Another is treating what-if as optional for complete mode. It is the cheapest insurance you have, and many teams make it a required pipeline step that a reviewer approves before the real deployment runs.",
   "Exam wording follows these distinctions. 'Remove resources not defined in the template' points to complete mode. 'Default mode' or 'leave other resources untouched' points to incremental. 'Preview changes' points to what-if. 'Deploy to create resource groups' points to a subscription-scope deployment. 'Which PowerShell cmdlet deploys to a resource group' is `New-AzResourceGroupDeployment`, and its CLI partner is `az deployment group create`."
  ],
  "analogy": "Think of a gardener with a planting plan. In incremental mode the gardener plants and prunes everything on the plan and walks past anything else growing in the bed. In complete mode the gardener also pulls up every plant that is not on the plan, including the roses a neighbor planted yesterday. What-if is walking the bed with the plan first and marking what would be pulled. The analogy stops at one point: for plants on the plan, the gardener follows the plan's description exactly, so details you leave out of the plan may be reset rather than preserved.",
  "terms": [
   [
    "Incremental mode",
    "The default deployment mode that creates or updates template resources and leaves other resources in the group untouched."
   ],
   [
    "Complete mode",
    "A deployment mode that also deletes resources in the resource group that are not declared in the template."
   ],
   [
    "What-if",
    "A preview operation that shows what a deployment would create, change or delete without making changes."
   ],
   [
    "Idempotent",
    "Producing the same result no matter how many times it is run, which is how template deployments behave."
   ],
   [
    "Deployment scope",
    "The level a deployment targets: resource group, subscription, management group or tenant, each with its own command."
   ],
   [
    "Deployment stack",
    "A resource that tracks the resources a deployment manages so they can be cleaned up or protected as a group."
   ],
   [
    "Resource lock",
    "A CanNotDelete or ReadOnly setting on a resource or scope that blocks deletion, including deletion attempted by a complete-mode deployment."
   ]
  ],
  "example": "A resource group contains a VM, a storage account and a key vault. A template that declares only the VM and storage account is about to be deployed in complete mode. The what-if output lists the key vault as Delete, so the administrator stops, adds the key vault to the template, and only then runs az deployment group create.",
  "mistakes": [
   [
    "Incremental mode deletes resources you removed from the template.",
    "Incremental mode never deletes anything. Only complete mode removes resources that exist in the resource group but are not in the template."
   ],
   [
    "In incremental mode, any property you leave out of a resource keeps its current value.",
    "Properties of resources in the template are applied as written, so an omitted property can be reset to its default."
   ],
   [
    "Complete mode works at any scope, including subscription deployments.",
    "Complete mode applies only to resource group deployments."
   ],
   [
    "A deployment can create the resource group it targets.",
    "A resource group deployment needs the group to exist first. Create it with az group create or New-AzResourceGroup, or use a subscription-scope deployment to create resource groups."
   ]
  ],
  "tryit": [
   [
    "rg-data holds a SQL server, a storage account, a key vault with a CanNotDelete lock, and a log analytics workspace. A template declares only the SQL server and the storage account and is deployed in complete mode. What is the end state, and how does the deployment report?",
    "The SQL server and storage account are created or updated. The log analytics workspace is deleted because it is not in the template. The key vault survives because the lock blocks deletion, and the deployment reports an error for that resource. Running what-if first would have shown both Delete change types in advance."
   ],
   [
    "A teammate needs to deploy a template that creates three resource groups and assigns a policy to them. She runs az deployment group create and it fails. What should she use?",
    "A subscription-scope deployment, az deployment sub create (or New-AzSubscriptionDeployment), because creating resource groups and assigning policies happen at subscription level, not inside an existing resource group."
   ]
  ],
  "tip": "Incremental is the default and never deletes; complete deletes whatever is in the resource group but not in the template. Always run what-if before a complete-mode deployment.",
  "check": [
   [
    "A resource group has three resources and you deploy a template containing one of them in incremental mode. What happens to the other two?",
    "Nothing; incremental mode leaves resources not in the template unchanged."
   ],
   [
    "Which PowerShell parameter makes New-AzResourceGroupDeployment delete resources that are not in the template?",
    "-Mode Complete."
   ],
   [
    "How can you see the effect of a deployment before running it?",
    "Use what-if: az deployment group what-if, or New-AzResourceGroupDeployment with -WhatIf."
   ],
   [
    "A complete-mode deployment fails to delete one resource that is not in the template. What is a likely reason?",
    "The resource has a CanNotDelete (or ReadOnly) lock, which blocks the deletion."
   ],
   [
    "You pass a parameters file and also --parameters storageName=stdev02 on the command line. Which value wins?",
    "The inline value; inline parameters override values from a parameters file."
   ]
  ]
 },
 {
  "t": "Create virtual machines: images, sizes, OS and data disks, disk types (Standard HDD to Ultra), encryption at host and Azure Disk Encryption",
  "hook": "Monday, 9:15 a.m. at Fernhill Analytics. A ticket from Marco on the data team: the new reporting VM 'lost' last week's extracted files over the weekend, and the database admin wants the next VM on 'the fastest disk you have, OS included.' Meanwhile the security lead has left a note on your desk: nothing on the new SQL Server VM may ever be stored unencrypted, not even caches or scratch space. You open the Create a virtual machine page and stare at the choices: image, size, disk type, encryption options. Which combination keeps Marco's files, satisfies the database admin as far as Azure allows, and passes the security review?",
  "simple": "A virtual machine is a computer you rent in Azure. When you create one you pick a starting operating system (the image), how powerful it is (the size), and its disks, which are like hard drives. Disk types range from cheap and slow to expensive and very fast, and the two fastest kinds can only hold data, not the operating system. Most VMs also get a temporary scratch drive that is wiped when the VM is shut down and released, so never keep important files there. Think of a hotel room: the safe is your permanent disk, while anything left on the desk is cleared after checkout. Azure always encrypts stored disks, and extra options also encrypt the scratch drive and the computer's short-term caches.",
  "body": [
   "Azure Virtual Machines give you full control of an operating system in the cloud, which also means you are responsible for patching, configuring and securing it. Creating one involves a set of choices on the Create a virtual machine page: subscription and resource group, name, region and availability options, security type (Standard or Trusted Launch), image, size, administrator account (password or SSH key), inbound ports, disks, networking and management settings. Each choice affects cost, performance or resilience, and several cannot be changed later without redeploying, so it pays to understand them before you click Create.",
   "Start with the image, the template for the OS disk. Azure Marketplace images include Windows Server, Windows client for some uses, and Linux distributions such as Ubuntu, Red Hat Enterprise Linux and SUSE. You can also build your own generalized images and share them through an Azure Compute Gallery so teams deploy a standard, hardened build across subscriptions and regions. The image also sets the VM generation (Gen 1 or Gen 2), and Gen 2 is needed for features such as Trusted Launch with Secure Boot and a virtual TPM (Trusted Platform Module). From the Azure CLI (command-line interface): `az vm create --resource-group rg-app --name vm-web01 --image Ubuntu2204 --size Standard_D2s_v5 --admin-username azureuser --generate-ssh-keys`.",
   "Next, the size sets the virtual CPUs (vCPUs), memory, temporary storage, maximum number of data disks and network bandwidth. Sizes are grouped by purpose: B-series burstable for light workloads, D-series general purpose, E-series memory optimized, F-series compute optimized, L-series storage optimized and N-series with GPUs (graphics processing units). An 's' in the size name, as in `Standard_D2s_v5`, means it supports Premium storage. Not every size is available in every region or zone, and your subscription has vCPU quotas per region and family, so a deployment can fail with a quota error until you request an increase on the Usage + quotas page.",
   "Disks are where the most exam questions hide. Every VM has an OS disk, and most sizes also include a temporary disk (drive D: on Windows, often `/dev/sdb` or `/mnt` on Linux) that lives on the physical host. It is lost when the VM is deallocated, resized onto new hardware or moved, so use it only for scratch data such as page files. Persistent application data goes on data disks, which are managed disks you attach and then initialize inside the OS. Managed disk types, from cheapest to fastest: Standard HDD for backups and non-critical data; Standard SSD for web servers and light production; Premium SSD for production and performance-sensitive workloads; Premium SSD v2 and Ultra Disk, where you set capacity, IOPS (input/output operations per second) and throughput independently for the most demanding databases. Premium SSD v2 and Ultra Disk can only be data disks, not OS disks, and have regional and zone restrictions.",
   "Encryption comes in layers, and the exam wants you to know which layer covers what. Managed disks are always encrypted at rest by server-side encryption (SSE) with platform-managed keys, and you can switch to customer-managed keys through a disk encryption set linked to Azure Key Vault. SSE protects data once it lands in storage, but not the temporary disk or the disk caches on the host.",
   "Encryption at host closes that gap. Data on the temporary disk and the OS and data disk caches is encrypted on the VM's host before it flows to storage, so the data is encrypted end to end, with no agent inside the guest. The `EncryptionAtHost` feature must be registered for the subscription (`az feature register --namespace Microsoft.Compute --name EncryptionAtHost`) and then enabled per VM. Azure Disk Encryption (ADE) takes a different approach: it encrypts inside the guest OS using BitLocker on Windows or DM-Crypt on Linux, with keys stored in a Key Vault that has been enabled for disk encryption. Microsoft has announced the retirement of ADE and recommends encryption at host for new deployments, and the two cannot be combined on one VM.",
   "Consider a worked example. A team deploys a SQL Server VM. They choose an E-series memory-optimized size with an 's' so Premium storage is supported, a Premium SSD OS disk, and Premium SSD v2 data disks for data and logs with IOPS and throughput set to match the workload. The tempdb database goes on the local temporary disk because SQL Server rebuilds it at every start, so losing it on deallocation does no harm. The security team requires that nothing, including caches and the temporary disk, is stored unencrypted, so the administrator registers the feature, enables encryption at host, and uses a disk encryption set with a customer-managed key.",
   "Common mistakes: choosing Ultra Disk or Premium SSD v2 for the OS disk; storing important files on the temporary disk; selecting a size without an 's' and then being unable to attach Premium disks; assuming server-side encryption covers the temporary disk and caches (that is encryption at host); trying to enable both ADE and encryption at host on one VM; and forgetting to check the regional vCPU quota before a large deployment.",
   "Exam wording maps to answers. 'Lowest cost, infrequent access, non-critical' points to Standard HDD. 'Production, consistent low latency' points to Premium SSD. 'Tune IOPS and throughput independently for a demanding database' points to Premium SSD v2 or Ultra Disk, as data disks only. 'Data lost after deallocation' points to the temporary disk. 'Encrypt temporary disk and caches without an agent in the guest' points to encryption at host. 'BitLocker or DM-Crypt with Key Vault' points to Azure Disk Encryption."
  ],
  "analogy": "Think of a VM as a rented workshop. The OS and data disks are lockers bolted to the building: whatever you store stays, even when you go home. The temporary disk is the workbench, fast and handy, but the cleaning crew wipes it whenever you hand back the keys, which is what deallocation does. Server-side encryption locks the lockers. Encryption at host also covers the workbench and the trays you carry between bench and locker. Unlike a real workshop, you cannot choose the very fastest lockers, Premium SSD v2 or Ultra, to hold the building's foundations, the OS disk.",
  "mnemonic": "Disk types from cheapest to fastest: Honest Students Prefer Version Upgrades, for Standard HDD, Standard SSD, Premium SSD, Premium SSD v2, Ultra Disk. The last two (Version, Upgrades) are data disks only.",
  "terms": [
   [
    "VM size",
    "The combination of vCPUs, memory, temporary storage and disk and network limits for a VM."
   ],
   [
    "Azure Compute Gallery",
    "A service for storing and sharing custom VM images across subscriptions and regions."
   ],
   [
    "Temporary disk",
    "Non-persistent local storage on the VM host that is lost when the VM is deallocated or moved."
   ],
   [
    "Ultra Disk",
    "The highest-performance managed disk type, with independently adjustable IOPS and throughput, usable only as a data disk."
   ],
   [
    "Disk encryption set",
    "A resource that links managed disks to a customer-managed key in Key Vault for server-side encryption."
   ],
   [
    "Encryption at host",
    "A platform feature that encrypts the temporary disk and disk caches on the host, providing end-to-end encryption."
   ],
   [
    "Azure Disk Encryption",
    "In-guest volume encryption using BitLocker or DM-Crypt with keys in Azure Key Vault."
   ],
   [
    "Server-side encryption (SSE)",
    "Automatic encryption at rest of managed disks in storage, with platform-managed or customer-managed keys."
   ],
   [
    "Trusted Launch",
    "A VM security type for Gen 2 VMs that adds Secure Boot and a virtual TPM."
   ]
  ],
  "example": "A team deploys a SQL Server VM. They choose an E-series memory-optimized size, a Premium SSD OS disk, Premium SSD v2 data disks for data and logs with IOPS set to match the workload, keep tempdb on the local temporary disk, and enable encryption at host with a customer-managed key in a disk encryption set to satisfy the security team.",
  "mistakes": [
   [
    "Ultra Disk or Premium SSD v2 is the best choice for a high-performance OS disk.",
    "Both can be used only as data disks. Use Premium SSD for a fast OS disk and put demanding data on Premium SSD v2 or Ultra Disk."
   ],
   [
    "Because managed disks are encrypted at rest, the temporary disk and caches are encrypted too.",
    "SSE covers data in storage. Encrypting the temporary disk and host caches requires encryption at host (or ADE, which is being retired)."
   ],
   [
    "Any VM size can use Premium SSD disks.",
    "The size must support Premium storage, usually shown by an 's' in the name, such as D2s_v5."
   ],
   [
    "You can layer Azure Disk Encryption on top of encryption at host for extra protection.",
    "The two cannot be combined on one VM. Microsoft recommends encryption at host for new deployments."
   ]
  ],
  "tryit": [
   [
    "A web team wants a VM for a low-traffic internal site at the lowest reasonable cost, with an OS disk that gives steadier performance than spinning disks. They also want to store nightly log archives that are rarely read. Which disk types do you pick for the OS disk and the archive data disk?",
    "Standard SSD for the OS disk, since it suits web servers and light production with more consistent latency than HDD at modest cost. Standard HDD for the archive data disk, since it is the cheapest option for infrequently accessed, non-critical data."
   ],
   [
    "A compliance auditor asks you to prove that a VM's page file, which lives on the temporary disk, is encrypted, and you must not install software in the guest. The VM currently relies only on default server-side encryption. What do you do?",
    "Register the EncryptionAtHost feature for the subscription and enable encryption at host on the VM (this typically requires the VM to be deallocated). That encrypts the temporary disk and caches on the host without any guest agent; SSE alone does not cover the temporary disk."
   ]
  ],
  "tip": "Ultra Disk and Premium SSD v2 cannot be OS disks. The temporary disk loses data on deallocation. Encryption at host is platform-level and needs no agent; ADE is in-guest with Key Vault and is being retired.",
  "check": [
   [
    "Which disk types can be used for a VM's OS disk?",
    "Standard HDD, Standard SSD and Premium SSD; Premium SSD v2 and Ultra Disk are data-disk only."
   ],
   [
    "A VM's application wrote files to drive D: and they disappeared after the VM was stopped and deallocated. Why?",
    "Drive D: on Azure Windows VMs is the temporary disk, which is not persistent."
   ],
   [
    "Which option encrypts a VM's temporary disk and caches without installing anything in the guest OS?",
    "Encryption at host."
   ],
   [
    "You cannot attach a Premium SSD data disk to a VM. What should you check first?",
    "Whether the VM size supports Premium storage, usually shown by an 's' in the size name."
   ],
   [
    "Which subscription step is required before you can enable encryption at host on a VM?",
    "Registering the EncryptionAtHost feature for the Microsoft.Compute namespace, for example with az feature register."
   ]
  ]
 },
 {
  "t": "Resize VMs, move VMs between resource groups, subscriptions and regions, manage disks",
  "hook": "Month-end at Copperline Insurance, 4:50 p.m. The reporting VM is crawling, and Hana from finance needs her close reports by morning. You open the VM's Size blade to pick a bigger E-series size, but it simply is not in the list. In the same hour, your manager forwards two more requests: move the reporting VM into the finance team's own subscription, and plan for the whole workload to relocate to another region next quarter. A colleague suggests 'just use Move for all of it.' Which of these jobs need a restart, which need the VM fully stopped, and which need a completely different tool?",
  "simple": "After you create a virtual machine, you will often need to change it. Resizing gives it more or less power, and it restarts the VM. If the size you want is missing from the list, stop the VM fully first so Azure can place it on different hardware. Moving a VM to another folder (resource group) or billing account (subscription) is a simple move that keeps it in the same place on the map. Moving it to another region, a different part of the world, actually builds a copy there with a separate tool. Disks can grow but never shrink. Think of renting a storage unit: you can upgrade to a bigger unit, but you cannot squeeze the same boxes into a smaller one.",
  "body": [
   "Workloads change after deployment, so administrators often resize virtual machines (VMs), relocate them and adjust their disks. Some of these operations happen while the VM runs, some need a restart, some need the VM deallocated, and each kind of move uses a different tool. Knowing which is which is exactly what the exam tests, because choosing wrongly means unnecessary downtime or an operation that simply fails.",
   "Start with resizing. To resize, open the VM's Size blade, or run `az vm resize --resource-group rg-app --name vm-report --size Standard_E8s_v5`, or in PowerShell change `$vm.HardwareProfile.VmSize` and run `Update-AzVM`. Resizing a running VM restarts it, so plan it for a maintenance window. The list of sizes shown depends on the hardware cluster currently hosting the VM. If the size you want is not listed, stop (deallocate) the VM first; then every size available in the region can be chosen, and Azure places the VM on suitable hardware when it starts. Deallocated means stopped and released from the host, shown in the portal as Stopped (deallocated); a VM merely shut down from inside the OS still holds its host and still incurs compute charges.",
   "Resizing has side effects to check. It can change the number of data disks and network interfaces (NICs) the VM supports, so when moving to a smaller size confirm that the new size allows as many disks and NICs as are attached. Remember too that the temporary disk's contents are lost if the VM moves to new hardware, and a size without an 's' cannot keep Premium disks attached.",
   "Moving within Azure's management structure is a different operation. Moving a VM to another resource group or subscription uses the ordinary resource move operation (Move in the portal, or `az resource move`). Move the VM together with its dependent resources, such as its disks, network interfaces and public IP addresses, which the portal's validation step checks before it starts. The VM does not change region and the move does not stop it, but its resource ID changes, so scripts, alerts and role assignments that referenced the old ID need updating. Both subscriptions must be in the same Microsoft Entra tenant, the target must have the needed resource providers registered, and some configurations, such as VMs created from certain Marketplace plans, have extra restrictions.",
   "Moving a VM to a different region is not a move operation at all; it is a relocation that creates a copy in the target region. Azure Resource Mover orchestrates moving VMs and related resources such as virtual networks, network security groups (NSGs) and load balancers across regions. You add resources, it checks dependencies and suggests any you missed, and you prepare, initiate the move, then commit or discard. Azure Site Recovery can also replicate a VM to another region and fail it over permanently. Either way, expect new IP addresses and some downtime at cutover, and clean up the source resources afterwards so you do not pay twice.",
   "Now disk management, starting with adding capacity. You can attach new or existing data disks on the VM's Disks blade while the VM runs (`az vm disk attach --vm-name vm-report --resource-group rg-app --name data02 --new --size-gb 256`), then initialize and format them in the OS: Disk Management on Windows, or partition, format and mount on Linux. Azure presents a raw disk; the OS does the rest. You can increase a disk's size but never shrink it. Depending on disk type and configuration an expansion may need the VM deallocated, and afterwards you extend the partition inside the OS, because Azure does not touch the file system.",
   "Changing a disk's type, such as Standard SSD to Premium SSD, is done with the VM deallocated or the disk detached, and Premium disks need a size that supports Premium storage. Disk snapshots capture a full or incremental copy of a managed disk, useful before risky changes or to create a new disk from a known good state. Detaching a data disk keeps it as a separate resource, and deleting a VM does not necessarily delete its disks unless delete options were set, so look for orphaned unattached disks, which still cost money. The Disks list in the portal can be filtered by disk state to find them.",
   "Consider a worked example. A reporting VM needs more memory for month-end jobs. The E-series size you want is not in the resize list, so during a maintenance window you deallocate the VM, select the new size and start it again. Before converting its data disk from Standard SSD to Premium SSD, you take an incremental snapshot, then change the disk type while the VM is still deallocated. Later the business moves its operations to another region, so you use Azure Resource Mover to relocate the VM together with its virtual network and NSG, commit the move, update DNS to the new IP address and delete the source resources.",
   "Common mistakes: expecting a resource group or subscription move to change a VM's region; moving a VM without its disks and NICs; trying to shrink a managed disk; forgetting to extend the partition in the OS after enlarging a disk; resizing a running VM during business hours without realizing it restarts; and leaving unattached disks behind after deleting VMs. Exam wording follows these points. 'Desired size not in the list' points to deallocating first. 'Move to another subscription' points to resource move with dependent resources, same tenant. 'Move to another region' points to Azure Resource Mover or Site Recovery. 'Reduce disk size' is not possible; copy data to a new, smaller disk. 'Unexpected storage costs after deleting VMs' points to orphaned disks."
  ],
  "analogy": "Picture an office worker. Resizing is giving them a bigger desk: they step away briefly while it is swapped, and if no bigger desk fits on their floor, they must pack up so facilities can seat them on another floor, which is deallocation. A resource group or subscription move is changing which department pays their salary: they stay at the same desk in the same city. A region move is relocating them to another city, which means a new desk, a new phone number and a moving day. Filing cabinets, the disks, can be swapped for bigger ones, never smaller.",
  "terms": [
   [
    "Deallocate",
    "Stopping a VM so it releases its host hardware and stops compute billing, allowing it to be placed on different hardware."
   ],
   [
    "Resize",
    "Changing a VM's size, which restarts the VM and may require deallocation if the size is not available on the current cluster."
   ],
   [
    "Resource move",
    "Moving a VM and its dependent resources to another resource group or subscription without changing its region."
   ],
   [
    "Azure Resource Mover",
    "A service that moves VMs and related resources between Azure regions with dependency checks and commit steps."
   ],
   [
    "Disk snapshot",
    "A point-in-time copy of a managed disk, which can be incremental."
   ],
   [
    "Unattached disk",
    "A managed disk not connected to any VM, which still incurs storage cost."
   ],
   [
    "Stopped (deallocated)",
    "The VM state in which the VM has released its host, stopping compute billing, as opposed to an OS shutdown that keeps the host."
   ],
   [
    "Azure Site Recovery",
    "A replication and failover service that can also be used to relocate a VM to another region."
   ]
  ],
  "example": "A reporting VM needs more memory for month-end jobs. The desired E-series size is not in the list, so the administrator deallocates the VM during a maintenance window, selects the new size and starts it again. Later, the business wants the VM in another region, so the administrator uses Azure Resource Mover to move it together with its virtual network and network security group.",
  "mistakes": [
   [
    "Moving a VM to another subscription also lets you change its region.",
    "Resource group and subscription moves never change region. Use Azure Resource Mover or Site Recovery to relocate across regions."
   ],
   [
    "Shutting down a VM from inside Windows is the same as deallocating it.",
    "An OS shutdown leaves the VM allocated to its host and still billed for compute. Deallocate from the portal, CLI or PowerShell to release the host and see every regional size."
   ],
   [
    "After enlarging a managed disk in Azure, the extra space appears automatically in the OS.",
    "Azure enlarges the disk only. You must extend the partition or file system inside the OS."
   ],
   [
    "You can shrink a managed disk to save money.",
    "Managed disks can only grow. To reduce size, create a smaller disk and copy the data to it."
   ]
  ],
  "tryit": [
   [
    "The finance team has its own subscription in the same Entra tenant and wants vm-report moved into it this afternoon. The VM has an OS disk, two data disks, a NIC and a public IP. Users must not lose access during the move. How do you proceed, and what changes afterwards?",
    "Use the resource move operation (Move to another subscription, or az resource move) and include the disks, NIC and public IP with the VM. The VM stays in the same region and keeps running, but its resource ID changes, so update scripts, alerts and role assignments that referenced the old ID. Confirm the target subscription has the required resource providers registered."
   ],
   [
    "You run az vm resize to shrink a VM from an 8-vCPU size to a 2-vCPU size, and it fails. The VM has six data disks attached. What is a likely cause?",
    "The smaller size supports fewer data disks than are attached. Detach disks or choose a size whose maximum data disk count covers all six. Also confirm the new size supports Premium storage if any attached disks are Premium."
   ]
  ],
  "tip": "If a size is missing from the resize list, deallocate the VM first. Moving between resource groups or subscriptions never changes a VM's region; use Resource Mover or Site Recovery for regions. Disks can grow, not shrink.",
  "check": [
   [
    "You want to resize a VM, but the size is not available in the list. What should you do?",
    "Stop (deallocate) the VM, then choose from all sizes available in the region."
   ],
   [
    "Which service moves a VM and its network resources to another Azure region?",
    "Azure Resource Mover (Azure Site Recovery can also be used)."
   ],
   [
    "Can you reduce a managed data disk from 256 GiB to 128 GiB?",
    "No. Managed disks can be expanded but not shrunk; you would copy the data to a new, smaller disk."
   ],
   [
    "You expand a data disk from 128 GiB to 256 GiB, but the OS still shows 128 GiB. What is missing?",
    "Extending the partition or file system inside the OS, which Azure does not do for you."
   ],
   [
    "A VM was moved from rg-old to rg-new. What changed and what did not?",
    "Its resource ID changed; its region, IP configuration and running state did not."
   ]
  ]
 },
 {
  "t": "Availability sets (fault and update domains) vs availability zones and their SLAs",
  "hook": "Quarterly review at Tidewater Books. The operations director slides a printout across the table: last spring a power fault in a single rack took the online store down for forty minutes, because both web VMs happened to share that rack. 'This can never happen again,' she says, 'and I want to know what happens if an entire datacenter goes dark.' She asks for a design and the uptime commitment you can promise in writing. You know Azure offers availability sets and availability zones, each with its own service level agreement. Which one answers a rack failure, which one answers a datacenter failure, and what number do you write down?",
  "simple": "Any single computer will fail sometime, so for important websites you run at least two copies and keep them apart. Azure gives you two ways to keep them apart. An availability set places your copies on different racks and staggers maintenance reboots inside one building, so one broken rack or one reboot cannot stop them all. Availability zones put your copies in separate buildings, each with its own power and cooling, inside the same region. Think of storing two spare house keys: one in a different drawer protects you from losing one drawer, while one at a friend's house protects you if your whole house is locked. Zones give the higher promised uptime, but you still need a load balancer to send visitors to whichever copy is healthy.",
  "body": [
   "A single virtual machine (VM) will eventually be interrupted, by a hardware failure, a host update or a datacenter problem. Azure gives you two ways to spread several VMs so one event cannot take them all down: availability sets within a datacenter, and availability zones across datacenters in a region. Each comes with a different service level agreement (SLA), the uptime percentage Microsoft commits to for VM connectivity, and the exam expects you to match a requirement to the right option and SLA. The key is to ask what kind of failure the business is worried about.",
   "Start with the availability set, the older and more local of the two. An availability set is a logical grouping of VMs that Azure spreads across fault domains and update domains. A fault domain is a group of hardware that shares a power source and network switch, similar to a rack; if it fails, only the VMs in that fault domain go down. Regions support up to three fault domains for availability sets (two in some regions). An update domain is a group of hosts that Azure may reboot at the same time during planned platform maintenance; only one update domain is rebooted at a time, and you can configure up to 20, with 5 as the default.",
   "Placement inside a set is automatic. VMs in the set are assigned to domains round robin, so with two web servers they land in different fault and update domains, and a single rack failure or a single maintenance reboot affects at most one of them. You create a set with `az vm availability-set create --resource-group rg-web --name avset-web --platform-fault-domain-count 2 --platform-update-domain-count 5`, then reference it when creating each VM. Availability sets are free; you pay only for the VMs.",
   "Availability zones protect against something bigger. An availability zone is a physically separate location within a region, with independent power, cooling and networking; regions that support zones have at least three. When you create a VM you can pin it to zone 1, 2 or 3 (a zonal deployment), for example with `az vm create ... --zone 1`. Placing VMs in two or more zones protects against the failure of a whole datacenter, which an availability set cannot do, because every VM in a set lives in one datacenter. Some services, such as zone-redundant storage, Standard load balancers and Standard public IP addresses, can be zone-redundant, spanning all zones automatically, which pairs naturally with zonal VMs.",
   "The published VM SLAs map directly to these choices. Two or more VMs deployed across two or more availability zones in the same region earn 99.99 percent connectivity. Two or more VMs in the same availability set earn 99.95 percent. A single VM earns 99.9 percent when all its disks are Premium SSD, Premium SSD v2 or Ultra Disk, with lower commitments for single VMs on standard disks. The higher tiers require at least two instances, which is why you always pair them with a load balancer and a health probe that send traffic only to healthy VMs. The SLA covers the platform; your application still needs to tolerate an instance disappearing, for example by keeping session state outside the VM.",
   "A few rules decide many exam scenarios. A VM can be added to an availability set only when it is created; to move an existing VM into a set you must recreate it, typically keeping its OS and data disks. A VM cannot be in both an availability set and an availability zone. Zones are only available in some regions and for some sizes, so a requirement to survive a datacenter failure rules out regions without zones. For large, elastic groups, Virtual Machine Scale Sets in Flexible orchestration can spread instances across zones or fault domains for you and add autoscaling.",
   "Consider a worked example. An online shop runs two web VMs behind a load balancer in a single availability set. The business now asks for protection against a full datacenter outage in the region. An availability set only protects against rack failures and planned maintenance within one datacenter, so it cannot meet the requirement. You redeploy the VMs from their existing disks into zones 1 and 2, place them behind a zone-redundant Standard load balancer with a Standard public IP, and confirm health probes mark both healthy. The design now qualifies for the 99.99 percent SLA, and a datacenter outage in zone 1 leaves the zone 2 VM serving customers.",
   "Common mistakes: confusing fault domains (unplanned hardware failure) with update domains (planned maintenance); expecting an availability set to survive a datacenter outage; trying to add a running VM to an availability set; combining an availability set and a zone on one VM; deploying a single VM in a zone and expecting 99.99 percent; and forgetting the load balancer, without which the second VM does not help users.",
   "Exam wording is consistent. 'Survive a datacenter failure' or 'highest SLA' points to availability zones and 99.99 percent. 'Protect against rack failure and planned maintenance' points to an availability set and 99.95 percent. 'Single VM, premium disks' points to 99.9 percent. 'Planned host reboot' points to update domains, 'power or switch failure' to fault domains. 'Add an existing VM to a set' means recreate it. 'Region without zones' means zones are not an option."
  ],
  "analogy": "Imagine a theater company with two lead actors. An availability set is like seating them in different dressing rooms with separate fuse boxes (fault domains) and scheduling their costume fittings at different times (update domains): a blown fuse or a fitting never removes both from the stage. Availability zones are like keeping the understudy in a different building across town, so even a fire that closes the whole theater leaves one actor ready. The analogy stops working in one place: Azure cannot move an existing actor into a dressing-room plan; a VM must join an availability set when it is created.",
  "mnemonic": "SLA ladder from top to bottom: Zones, Set, Single. Four nines for zones (99.99), ninety-nine point nine five for a set (99.95), three nines for a single premium-disk VM (99.9).",
  "terms": [
   [
    "Fault domain",
    "A group of hardware sharing power and network that can fail together, like a rack."
   ],
   [
    "Update domain",
    "A group of hosts that may be rebooted together during planned maintenance; only one is updated at a time."
   ],
   [
    "Availability set",
    "A grouping that spreads VMs across fault and update domains within one datacenter."
   ],
   [
    "Availability zone",
    "A physically separate datacenter location within a region with independent power, cooling and networking."
   ],
   [
    "Zone-redundant",
    "A service configuration that spans all zones in a region automatically, such as a Standard load balancer frontend."
   ],
   [
    "SLA",
    "Service level agreement: Microsoft's committed uptime percentage for a configuration."
   ],
   [
    "Zonal deployment",
    "A VM pinned to a specific availability zone number, such as zone 1."
   ],
   [
    "Health probe",
    "A load balancer check that sends traffic only to instances that respond as healthy."
   ]
  ],
  "example": "An online shop runs two web VMs behind a load balancer. The business asks for protection against a full datacenter outage in the region. An availability set would only protect against rack and maintenance failures, so the administrator redeploys the VMs into zones 1 and 2 behind a zone-redundant Standard load balancer, moving the design to the 99.99 percent SLA.",
  "mistakes": [
   [
    "An availability set protects against a whole datacenter going offline.",
    "All VMs in a set are in one datacenter. Only spreading VMs across availability zones survives a datacenter failure."
   ],
   [
    "Fault domains protect against planned maintenance reboots.",
    "Update domains cover planned maintenance. Fault domains cover unplanned hardware failures such as a power or switch fault."
   ],
   [
    "A single VM placed in an availability zone gets the 99.99 percent SLA.",
    "99.99 percent requires two or more VMs across two or more zones. A single VM's SLA depends on its disk types."
   ],
   [
    "You can add an existing VM to an availability set from its settings.",
    "The set is chosen at creation only. Recreate the VM, typically from its existing disks, to place it in a set."
   ]
  ],
  "tryit": [
   [
    "Willow Health runs an internal scheduling app on two VMs in a region that does not support availability zones. The requirement is to stay up during Azure's planned maintenance and a single hardware rack failure. What do you deploy and what SLA applies?",
    "Put both VMs in one availability set with at least two fault domains and multiple update domains, behind a load balancer with a health probe. That protects against a rack failure and staggers maintenance reboots, and it qualifies for the 99.95 percent SLA. Zones are not an option in that region."
   ],
   [
    "A colleague's design lists 'VM in availability set avset-api, zone 2' for each of three API servers to get 'the best of both.' What is wrong, and what should the design say?",
    "A VM cannot be in both an availability set and an availability zone. If datacenter-level protection is required, place the three VMs in different zones (for example 1, 2 and 3) behind a zone-redundant Standard load balancer and drop the availability set. That qualifies for 99.99 percent."
   ]
  ],
  "tip": "Datacenter failure = availability zones (99.99 percent); rack or maintenance protection = availability set (99.95 percent); single VM with premium disks = 99.9 percent. Availability sets are chosen at creation only.",
  "check": [
   [
    "What is the difference between a fault domain and an update domain?",
    "A fault domain is shared hardware that can fail together (unplanned); an update domain is a group rebooted together during planned maintenance."
   ],
   [
    "Can you add an existing running VM to an availability set?",
    "No. The set must be chosen at creation, so you would recreate the VM, for example from its existing disks."
   ],
   [
    "What SLA applies to two VMs in different availability zones?",
    "99.99 percent VM connectivity."
   ],
   [
    "Can one VM be in an availability set and an availability zone at the same time?",
    "No. You choose one or the other; for datacenter-level protection, use zones."
   ],
   [
    "What are the maximum fault domains and update domains you can configure for an availability set?",
    "Up to three fault domains (two in some regions) and up to 20 update domains, with 5 update domains by default."
   ]
  ]
 },
 {
  "t": "Virtual Machine Scale Sets: orchestration modes, autoscale rules, scale-in",
  "hook": "The flash sale at Lantern Home Goods ended at midnight, and it is now 9 a.m. The storefront handled the rush beautifully: the scale set grew from three VMs to fifteen as traffic climbed. But Rosa in finance has just flagged the cost dashboard, because all fifteen VMs are still running on a quiet Tuesday morning. Worse, someone on the analytics team mentions that their long-running report lives on one of those instances, and they are nervous about which VM disappears first if you shrink the set. What did the autoscale settings forget, and how do you control exactly which instances go when it scales back in?",
  "simple": "A scale set is a group of identical or similar virtual machines that Azure manages as one. Instead of building each server by hand, you describe one and tell Azure how many to run. Autoscale adds machines when they get busy and removes them when things calm down, but only if you give it rules for both directions. Think of a supermarket opening more checkout lanes when queues grow and closing them when the store empties: if the manager only ever opens lanes and never closes them, payroll keeps climbing. A scale-in policy decides which machines are removed first, and instance protection is like telling the manager 'never close lane 4, someone is still working there.'",
  "body": [
   "A Virtual Machine Scale Set (VMSS) manages a group of load-balanced virtual machines (VMs) as one resource. Instead of creating each VM by hand, you describe the model once (image, size, network, extensions) and tell the scale set how many instances to run. It can add and remove instances automatically based on demand, spread them across availability zones and fault domains, and roll out updates. Scale sets are the standard answer for stateless tiers such as web front ends, API servers and batch workers, where any instance can handle any request and losing one does not lose data.",
   "The first decision is the orchestration mode, chosen at creation and not changeable afterwards. Uniform orchestration uses identical instances created from one model; you manage them mainly through the scale set's own APIs, which suits large, homogeneous stateless workloads. Flexible orchestration, the default and recommended mode for new deployments, manages standard Azure VMs that you can also manage individually with normal VM commands such as `az vm restart`. It lets you mix VM sizes and Spot and regular capacity, spreads instances across fault domains and zones for high availability, and can take VMs you add manually. If a question requires mixing sizes or treating instances as ordinary VMs, the answer is Flexible.",
   "Autoscale is configured on the scale set's Scaling blade and uses the Azure Monitor autoscale engine. Step by step: switch from manual scale to custom autoscale; set a minimum, maximum and default instance count; add a scale-out rule, for example 'average Percentage CPU across instances greater than 70 over 10 minutes, increase count by 2'; then add the mirror scale-in rule, 'average CPU below 30 over 10 minutes, decrease count by 1'. Each rule has a cool down period, five minutes being typical, during which no further scaling happens so the metric can settle after new instances join. The same thing from the Azure CLI (command-line interface):",
   "```bash\naz monitor autoscale create --resource-group rg-web --resource vmss-web \\\n  --resource-type Microsoft.Compute/virtualMachineScaleSets \\\n  --name as-web --min-count 2 --max-count 10 --count 2\naz monitor autoscale rule create --resource-group rg-web --autoscale-name as-web \\\n  --condition \"Percentage CPU > 70 avg 10m\" --scale out 2\naz monitor autoscale rule create --resource-group rg-web --autoscale-name as-web \\\n  --condition \"Percentage CPU < 30 avg 10m\" --scale in 1\n```",
   "Beyond metric rules, two other tools handle predictable load. Schedule-based profiles change the limits at set times, such as a higher minimum during business hours, and predictive autoscale can scale ahead of recurring daily or weekly load patterns, so capacity is ready before the rush instead of reacting to it. Whatever the rules say, autoscale never goes below the minimum or above the maximum, and it uses the default count when metrics are unavailable. Rules can use host metrics such as CPU, network and disk, guest OS metrics, Application Insights metrics or even queue length on a storage or Service Bus queue.",
   "Scaling in raises the question of which instance goes. The scale-in policy decides. The Default policy first balances instances across availability zones and fault domains, then deletes the instance with the highest instance ID. NewestVM removes the most recently created instances first, and OldestVM removes the oldest, both still balancing across zones. Instance protection overrides the policy for specific VMs: 'protect from scale-in' means autoscale never removes that instance, and 'protect from scale set actions' also excludes it from upgrades and other scale set operations. Finally, the upgrade policy controls how model changes reach existing instances: Manual, Automatic (all at once, possible downtime) or Rolling (batches with health checks between them).",
   "Consider a worked example. A retailer runs its storefront on a Flexible scale set of six VMs across three zones behind a Standard load balancer with an HTTP health probe on `/health`. Evenings are busy, so the team sets minimum 3, maximum 15, default 3, a scale-out rule at 70 percent CPU and a scale-in rule at 30 percent, plus a schedule profile raising the minimum to 6 from 17:00 to 22:00. One VM hosts a long-running reporting job, so they enable 'protect from scale-in' on it. They choose the NewestVM scale-in policy because new instances have the least warm cache. After a sale ends, the set shrinks back to three evenly spread instances and the reporting VM survives.",
   "Common mistakes are mostly about one-sided or jittery rules. People create only a scale-out rule, so the set grows and never shrinks and the bill keeps rising. They set scale-out and scale-in thresholds too close together, for example 60 and 55 percent, which causes flapping as each action triggers the other. They expect autoscale to go below the minimum at night, forget a health probe or the Application Health extension so traffic reaches instances that are still booting, and assume they can switch from Uniform to Flexible later, which is not possible without redeploying.",
   "Exam questions usually hide the answer in a clue word. 'Mix VM sizes' or 'manage instances as individual VMs' points to Flexible orchestration. 'Costs keep rising after the peak' points to a missing scale-in rule. 'Which VM is removed first?' points to the scale-in policy, with Default meaning balance zones then highest instance ID. 'Ensure a specific VM is never removed' points to instance protection. 'Add capacity before the 9:00 rush every day' points to a schedule-based profile or predictive autoscale, not a metric rule."
  ],
  "analogy": "A scale set is like a call center staffing desk. The minimum and maximum are the smallest and largest crew the budget allows. Scale-out and scale-in rules are the supervisor's instructions: call in two more agents when the hold queue stays long for ten minutes, send one home when it stays short. The cool down is waiting for new agents to log in before judging the queue again. Instance protection is a sticky note on one agent's desk saying 'mid-call, do not send home.' Unlike a call center, Azure picks who leaves by a fixed policy, not by asking who wants to go.",
  "terms": [
   [
    "Virtual Machine Scale Set (VMSS)",
    "An Azure resource that deploys and manages a group of identical or mixed VMs as one unit with built-in scaling."
   ],
   [
    "Flexible orchestration",
    "The recommended scale set mode that manages standard VMs, allows mixed sizes and lets you manage each VM individually."
   ],
   [
    "Uniform orchestration",
    "A scale set mode that creates identical instances from one model, managed through the scale set APIs."
   ],
   [
    "Autoscale rule",
    "A condition on a metric, such as average CPU over a time window, that adds or removes instances when met."
   ],
   [
    "Cool down",
    "The waiting period after a scale action during which autoscale takes no further action so metrics can settle."
   ],
   [
    "Scale-in policy",
    "The setting (Default, NewestVM or OldestVM) that decides which instances are deleted when the set shrinks."
   ],
   [
    "Instance protection",
    "A per-instance flag that prevents a VM from being removed by scale-in or affected by scale set actions."
   ],
   [
    "Upgrade policy",
    "The scale set setting (Manual, Automatic or Rolling) that controls how model changes reach existing instances."
   ],
   [
    "Schedule-based profile",
    "An autoscale profile that changes instance limits at set times, such as a higher minimum during business hours."
   ]
  ],
  "example": "A media company processes uploaded videos with a pool of worker VMs. It uses a scale set with an autoscale rule on the length of its storage queue: when more than 500 messages wait, add 3 instances; when fewer than 50 wait, remove 1. Minimum is 1 and maximum is 20. Overnight the queue empties and the set shrinks to a single VM, while a morning upload surge brings it back up within minutes without anyone logging in.",
  "mistakes": [
   [
    "A scale-out rule on its own is enough; autoscale will shrink the set when load drops.",
    "Autoscale removes instances only when a scale-in rule says so. Every scale-out rule needs a matching scale-in rule."
   ],
   [
    "Setting thresholds close together, such as out at 60 percent and in at 55 percent, makes scaling more responsive.",
    "Close thresholds cause flapping, where each action triggers the opposite one. Leave a wide gap, such as 70 and 30 percent."
   ],
   [
    "The Default scale-in policy removes the oldest VM.",
    "Default first balances across zones and fault domains, then removes the highest instance ID. OldestVM is a separate policy."
   ],
   [
    "You can switch a Uniform scale set to Flexible when you need mixed sizes.",
    "Orchestration mode is fixed at creation. Changing it means deploying a new scale set."
   ]
  ],
  "tryit": [
   [
    "An e-learning platform knows that every weekday at 8:30 a.m. thousands of students log in within minutes, and CPU-based rules react too late, so the first users see slow pages. The scale set already has CPU rules at 70 and 30 percent. What do you add?",
    "Add a schedule-based profile that raises the minimum instance count shortly before 8:30 on weekdays, or enable predictive autoscale to scale ahead of the recurring pattern. Metric rules react to load after it arrives; a schedule or prediction has capacity ready in advance. Keep the CPU rules for unexpected spikes."
   ],
   [
    "A scale set spans zones 1, 2 and 3 with instances distributed 3, 3 and 2. Autoscale decides to remove one instance, and the Default scale-in policy is in place. Which zone loses an instance, and which one within that zone?",
    "The Default policy balances zones first, so it removes from zone 1 or zone 2, which have more instances than zone 3. Within the chosen zone it deletes the instance with the highest instance ID, unless that instance is protected from scale-in."
   ]
  ],
  "tip": "Always pair a scale-out rule with a scale-in rule. The Default scale-in policy balances across zones and fault domains, then removes the highest instance ID; use instance protection to keep a specific VM, and choose Flexible orchestration when sizes must be mixed.",
  "check": [
   [
    "A scale set grew during a traffic spike but never shrank afterwards. What is the most likely cause?",
    "There is no scale-in rule; autoscale only removes instances when a rule tells it to, so every scale-out rule needs a matching scale-in rule."
   ],
   [
    "Which orchestration mode lets you mix VM sizes and manage instances with ordinary VM commands?",
    "Flexible orchestration, which manages standard Azure VMs and is the recommended mode for new deployments."
   ],
   [
    "With the Default scale-in policy, which instance is removed?",
    "After balancing across availability zones and fault domains, the instance with the highest instance ID is removed."
   ],
   [
    "How do you stop autoscale from ever deleting one particular instance?",
    "Enable instance protection on it with 'protect from scale-in', or 'protect from scale set actions' to also exclude it from upgrades."
   ],
   [
    "What does the cool down period do in an autoscale rule?",
    "It pauses further scaling for a set time after an action so metrics can settle and the set does not overreact."
   ]
  ]
 },
 {
  "t": "Azure Container Registry tiers and image management",
  "hook": "A Friday security review at Northstar Freight. Aisha, the security lead, has pulled up the deployment pipeline's settings, and there it is in plain text: the container registry's admin username and password, pasted into a pipeline variable eight months ago. She also wants to know why the production app is running an image tagged `latest`, and nobody in the room can say which build that actually is. The registry bill has crept up every month too. You are asked to fix all three before Monday without breaking deployments. Where do images live, who should be allowed to pull them, and how do you keep the registry clean?",
  "simple": "A container image is a packaged-up app with everything it needs to run, like a boxed meal kit with every ingredient included. Azure Container Registry is your private pantry for those boxes, kept inside your Azure account so only people and services you approve can take boxes out (pull) or put new ones in (push). Each box has a label called a tag, such as version 1.0, but a label can be moved to a different box, so for production you name the exact box. There are three service levels: Basic, Standard and Premium, with Premium adding copies in several regions and private network access. Old unlabeled boxes still take up shelf space and cost money until you clean them out.",
  "body": [
   "A container image packages an application with everything it needs to run: code, runtime, libraries and settings. Azure Container Registry (ACR) is a managed, private registry for storing those images and related artifacts, such as Helm charts, close to where you run them: Azure Container Instances, Azure Container Apps, App Service or Azure Kubernetes Service (AKS). Think of it as a private Docker Hub inside your subscription, protected by Microsoft Entra ID and Azure role-based access control (RBAC), so only the people and services you choose can pull or push images.",
   "Naming follows a fixed pattern worth memorizing. Each registry has a login server name such as `contosoacr.azurecr.io`, and images are referenced as `loginserver/repository:tag`. A repository groups versions of one image, and a tag labels a version. Behind each tag is a manifest identified by an immutable digest such as `sha256:...`, so a digest always points to exactly the same content while a tag can be moved. A typical manual workflow with the Docker command-line interface (CLI) and the Azure CLI looks like this:",
   "```bash\naz acr create --resource-group rg-app --name contosoacr --sku Standard\naz acr login --name contosoacr\ndocker tag webapp:1.0 contosoacr.azurecr.io/shop/webapp:1.0\ndocker push contosoacr.azurecr.io/shop/webapp:1.0\naz acr repository list --name contosoacr --output table\naz acr repository show-tags --name contosoacr --repository shop/webapp\n```",
   "ACR comes in three service tiers that share the same core API, so tools work the same way whichever you choose. Basic is the entry point for development and learning, with the lowest included storage and throughput. Standard increases storage and throughput for most production workloads. Premium adds the enterprise features: geo-replication (one registry replicated to several regions so pulls are local and survive a regional outage), private endpoints through Azure Private Link and network firewall rules, customer-managed keys for encryption, the highest throughput, connected registries and a retention policy for untagged manifests. You can move between tiers later without recreating the registry. Exact storage amounts differ per tier and change over time, so learn which features need Premium rather than memorizing numbers.",
   "You do not even need Docker installed locally. ACR Tasks builds an image in Azure from a Dockerfile with `az acr build --registry contosoacr --image shop/webapp:1.1 .`, uploading your source folder and pushing the result, and tasks can rebuild automatically on source code commits or when a base image is updated, which keeps images patched without anyone remembering to rebuild. `az acr import` copies images from another registry, such as a public one, directly into ACR without pulling them to your machine first.",
   "Authentication is where most real-world mistakes happen. Individuals sign in with Entra ID through `az acr login`. Service principals and managed identities get RBAC roles such as AcrPull (pull only) and AcrPush (pull and push). Repository-scoped tokens give limited access to specific repositories. The admin user is a single shared username and password that is disabled by default and should stay that way except for quick tests, because it cannot be tied to one person or service and grants full push and pull. For a service pulling images, give its managed identity AcrPull on the registry and nothing more.",
   "Image management keeps the registry tidy, secure and cheap. Tags such as `latest` can be moved to a different image, so production deployments should use specific version tags or image digests. When you push a new image with an existing tag, the old manifest becomes untagged but still consumes storage. You can delete old images with `az acr repository delete`, schedule a cleanup with `az acr run` and the purge command (for example removing images older than 30 days), and on Premium enable a retention policy that deletes untagged manifests after a set number of days. You can also lock an image or tag with `az acr repository update --write-enabled false` so it cannot be overwritten or deleted, which protects a release that auditors may need to inspect later.",
   "Consider a worked example. A company runs its API on Container Apps in West Europe and East US, and security requires that the registry is not reachable from the internet. That combination, two regions pulling locally plus private access, requires Premium. The team enables geo-replication to both regions, creates a private endpoint in each hub virtual network and disables public network access. The Container Apps use a user-assigned managed identity with AcrPull. A nightly `acr purge` task removes images older than 60 days except those tagged as releases.",
   "Common mistakes: enabling the admin user and pasting its password into pipelines instead of using a managed identity; giving an identity AcrPush or Contributor when it only needs to pull; deploying `latest` to production and losing track of which code is running; assuming Basic or Standard can use private endpoints or geo-replication; and forgetting that untagged manifests still cost storage. Exam wording follows clear patterns: 'replicate to multiple regions', 'private endpoint' or 'customer-managed key' means Premium; 'least privilege for a service that deploys containers' means AcrPull on a managed identity; 'build without Docker installed' means ACR Tasks with `az acr build`; 'copy from Docker Hub' means `az acr import`; 'prevent an image being overwritten' means locking it."
  ],
  "analogy": "A registry works like a library. The login server is the library's address, a repository is a shelf for one title, and tags are the sticky labels saying 'second edition' or 'newest'. A digest is the book's ISBN: it never changes, while someone can move the 'newest' sticker to another copy overnight. AcrPull is a library card that lets you borrow; AcrPush also lets you donate books. The admin user is a master key left under the doormat. Where the analogy stops: in ACR, books whose labels were moved stay on the shelf, untagged, and you keep paying for them until you purge them.",
  "terms": [
   [
    "Azure Container Registry (ACR)",
    "A managed private registry for container images and related artifacts, secured with Entra ID and RBAC."
   ],
   [
    "Login server",
    "The registry's fully qualified name, such as contosoacr.azurecr.io, used as the prefix for image names."
   ],
   [
    "Geo-replication",
    "A Premium feature that replicates one registry to several regions for local pulls and regional resilience."
   ],
   [
    "AcrPull",
    "A built-in role that allows an identity to pull images from a registry but not push them."
   ],
   [
    "ACR Tasks",
    "A registry feature that builds, tests and patches images in Azure, triggered manually, by commits or by base image updates."
   ],
   [
    "Image digest",
    "An immutable content hash that identifies exactly one image manifest, unlike a tag which can move."
   ],
   [
    "Admin user",
    "A single shared username and password for a registry, disabled by default and not recommended for production."
   ],
   [
    "AcrPush",
    "A built-in role that allows an identity to push and pull images."
   ],
   [
    "Repository",
    "A collection of versions of one image within a registry, such as shop/webapp."
   ]
  ],
  "example": "A development team pushes a new image every day with the tag latest, and the registry's storage bill slowly grows. An administrator finds hundreds of untagged manifests left behind by overwritten tags. They schedule an ACR task that runs the purge command weekly to delete untagged manifests and images older than 90 days, switch the release pipeline to version tags such as 2.4.1, and grant the pipeline's managed identity AcrPush while the production Container App gets only AcrPull.",
  "mistakes": [
   [
    "Enabling the admin user is the simplest secure way to let a pipeline push images.",
    "The admin user is one shared credential with full access and is disabled by default. Use a managed identity or service principal with AcrPush for pipelines."
   ],
   [
    "A service that deploys containers needs AcrPush or Contributor on the registry.",
    "A service that only runs images needs AcrPull. Least privilege means pull only."
   ],
   [
    "Standard tier supports private endpoints if you configure the network correctly.",
    "Private endpoints, network firewall rules and geo-replication require Premium."
   ],
   [
    "Pushing a new image with an existing tag replaces the old image and frees its storage.",
    "The old manifest becomes untagged but remains and still costs storage until it is purged or removed by a retention policy."
   ]
  ],
  "tryit": [
   [
    "Your developers' laptops are locked down and cannot run Docker, but they need to build images from a Dockerfile in a Git repository and store them in ACR. They also want images rebuilt whenever the base image gets a security patch. What do you set up?",
    "Use ACR Tasks. Developers run az acr build to build in Azure and push to the registry without local Docker, and a task triggered on base image updates (and optionally on commits) rebuilds images automatically when the base image is patched."
   ],
   [
    "A regulated client asks for one registry that serves images to clusters in two regions with local pulls, encrypts data with the client's own key, and is not reachable from the internet. The team has a Standard registry today. What do you recommend?",
    "Upgrade the existing registry to Premium, which can be done in place. Then enable geo-replication to both regions, configure a customer-managed key, create private endpoints and disable public network access. All three requirements are Premium features."
   ]
  ],
  "tip": "Geo-replication, private endpoints and customer-managed keys point to the Premium tier. A service that only pulls images needs AcrPull on its managed identity; keep the shared admin user disabled and deploy version tags or digests, not latest.",
  "check": [
   [
    "A registry must be reachable only through a private endpoint. Which tier is required?",
    "Premium, because private endpoints and network firewall rules for ACR are Premium features."
   ],
   [
    "What is the least-privilege way to let an App Service app pull images from ACR?",
    "Enable a managed identity on the app and assign it the AcrPull role on the registry."
   ],
   [
    "How can you build an image from a Dockerfile when Docker is not installed on your machine?",
    "Use ACR Tasks, for example az acr build, which builds the image in Azure and pushes it to the registry."
   ],
   [
    "Why should production deployments avoid the latest tag?",
    "Tags can be moved to different images, so latest may change unexpectedly; version tags or digests identify exactly which image runs."
   ],
   [
    "How do you copy a public image into your registry without pulling it to your workstation?",
    "Use az acr import, which copies the image registry to registry."
   ]
  ]
 },
 {
  "t": "Azure Container Instances (container groups, restart policies) and Azure Container Apps (revisions, ingress, scale rules)",
  "hook": "Tuesday morning at Saltmarsh Mutual. The cost alert says a container named csv-convert has been running for nine days, yet the nightly conversion job it runs takes eleven minutes. Leo, who deployed it, shrugs: 'I just used the defaults.' In the same stand-up, the product owner asks how the new claims API can send a tenth of customers to version 2 first, scale with traffic, and cost nothing overnight when nobody files claims. Both workloads run containers, and neither team wants to manage a Kubernetes cluster. Which Azure service fits each job, and which single setting is making csv-convert run forever?",
  "simple": "Containers are packaged apps, and Azure can run them without you looking after any servers. Azure Container Instances is the quick option: you say 'run this container' and it starts in seconds, like hiring a taxi for one trip. A restart policy tells it what to do when the app finishes: always start again, start again only if it crashed, or never. Azure Container Apps is the option for websites and services that need to grow and shrink with demand, like a bus company that adds buses at rush hour and parks them all at night. It keeps numbered versions of your app, called revisions, so you can send some visitors to a new version and switch back if something goes wrong.",
  "body": [
   "Azure offers several ways to run containers without managing virtual machines. Two are in scope for this exam: Azure Container Instances (ACI), for running containers quickly and simply, and Azure Container Apps, for running microservices and web apps with automatic scaling, revisions and managed ingress. Neither requires you to operate a Kubernetes cluster yourself. The skill tested is picking the right service and configuring its key settings: container groups and restart policies for ACI, and revisions, ingress and scale rules for Container Apps.",
   "Start with ACI. It starts a container in seconds and bills per second for the vCPU (virtual CPU) and memory it uses. The unit of deployment is a container group: one or more containers scheduled on the same host that share a lifecycle, a local network (they reach each other on `localhost`), an optional public IP address with a DNS name label, and mounted volumes such as an Azure file share. It is similar to a Kubernetes pod. Multi-container groups are supported for Linux containers and are usually deployed from a YAML file or an Azure Resource Manager (ARM) template, for example an app container plus a logging sidecar. A container group can also be deployed into a virtual network subnet for private access. A quick single container looks like this:",
   "```bash\naz container create --resource-group rg-jobs --name nightly-report \\\n  --image contosoacr.azurecr.io/tools/report:3.2 --cpu 1 --memory 2 \\\n  --restart-policy OnFailure --assign-identity\naz container logs --resource-group rg-jobs --name nightly-report\n```",
   "ACI restart policies control what happens when a container exits, and they are the most tested ACI setting. Always, the default, restarts the containers whenever they stop, which suits long-running services such as a small web server. OnFailure restarts only if the process exits with a non-zero code, which suits jobs that should retry after an error but stop once they succeed. Never runs the containers once, which suits one-off tasks such as a build, a report or a data transformation. If you run a batch job with Always, it restarts endlessly after finishing and keeps billing. Because ACI has no built-in autoscale or traffic splitting, it is best for simple tasks, burst jobs and quick tests.",
   "Azure Container Apps sits at the other end. It is a serverless platform built on Kubernetes and open-source components such as KEDA (Kubernetes Event-driven Autoscaling), Dapr (Distributed Application Runtime) and Envoy, with the complexity hidden. Apps run in a Container Apps environment, a shared network and logging boundary for a set of apps, so apps in one environment can call each other and send logs to the same Log Analytics workspace.",
   "Revisions are how Container Apps handles versions. A revision is an immutable snapshot of an app version. Changing revision-scoped settings, such as the image, CPU, memory or scale rules, creates a new revision; changing application-scoped settings, such as secrets or ingress, does not. In single revision mode the new revision replaces the old one automatically. In multiple revision mode several revisions run at once and you split traffic by percentage, for blue-green or canary releases, and roll back by moving traffic back to the previous revision.",
   "Ingress and scaling complete the picture. Ingress controls how traffic reaches the app. It can be disabled (for background workers), internal (reachable only within the environment or its virtual network) or external (reachable from the internet), for HTTP or TCP, on a target port you specify. Scale rules set how many replicas run between a minimum and maximum: HTTP rules scale on concurrent requests, TCP rules on connections, and custom rules use KEDA scalers such as the length of an Azure Service Bus or Storage queue. With a minimum of zero replicas, an app scales to zero when idle and you pay nothing for compute until traffic arrives, at the cost of a short delay for the first request.",
   "Consider a worked example. A team has two needs. First, a nightly script converts CSV files and must retry if it crashes; they deploy it to ACI with restart policy OnFailure and mount an Azure file share for input and output. Second, a customer-facing API must scale with traffic and release safely. They put it in Container Apps with external ingress on port 8080, an HTTP scale rule of 50 concurrent requests per replica, minimum 1 and maximum 10, and multiple revision mode. Version 2 gets 10 percent of traffic; when errors stay low they move it to 100 percent.",
   "Common mistakes: leaving a batch job on the default Always policy; expecting ACI to autoscale or split traffic; trying to split traffic in single revision mode; expecting a secret change to create a new revision; and setting ingress to internal and then wondering why the internet cannot reach the app. Exam clue words: 'run once and stop' means Never; 'retry on error' means OnFailure; 'sidecar sharing localhost' means a container group; 'canary', 'blue-green' or 'split traffic' means multiple revision mode; 'scale based on queue messages' means a KEDA custom scale rule; and 'pay nothing when idle' means minimum replicas of zero."
  ],
  "analogy": "ACI is like booking a single taxi: it arrives fast, you pay by the minute, and the restart policy is your instruction to the driver, either keep circling the block forever (Always), come back only if the trip went wrong (OnFailure), or drop you off and leave (Never). Container Apps is a bus network: buses are added at rush hour and parked at night (scale rules and scale to zero), and a new route can carry a few passengers before it replaces the old one (revisions). The analogy stops at the container group, which is more like several passengers who must share one taxi.",
  "terms": [
   [
    "Container group",
    "The ACI deployment unit: containers on one host sharing lifecycle, network, IP address and volumes."
   ],
   [
    "Restart policy",
    "The ACI setting (Always, OnFailure or Never) that decides whether containers restart when they exit."
   ],
   [
    "Container Apps environment",
    "A shared boundary that provides networking and logging for a set of container apps."
   ],
   [
    "Revision",
    "An immutable snapshot of a container app version, created when revision-scoped settings change."
   ],
   [
    "Multiple revision mode",
    "A Container Apps setting that runs several revisions at once so traffic can be split between them."
   ],
   [
    "Ingress",
    "The Container Apps setting that exposes an app internally or externally over HTTP or TCP on a target port."
   ],
   [
    "KEDA",
    "Kubernetes Event-driven Autoscaling, the component Container Apps uses for scale rules based on events such as queue length."
   ],
   [
    "Scale to zero",
    "A Container Apps configuration with minimum replicas of zero, so the app runs no replicas and incurs no compute charges when idle."
   ]
  ],
  "example": "An insurance company receives claim documents into a Service Bus queue. It runs the processing service in Azure Container Apps with ingress disabled, a KEDA scale rule of one replica per 20 queued messages, minimum 0 and maximum 30. At night the app scales to zero and costs nothing for compute. A separate one-off migration script runs in Azure Container Instances with restart policy Never, so it runs once, writes its log and stops billing.",
  "mistakes": [
   [
    "The default ACI restart policy is fine for a batch job.",
    "The default is Always, which restarts the job after it finishes and keeps billing. Use Never for run-once tasks or OnFailure to retry only on errors."
   ],
   [
    "ACI can autoscale and split traffic between versions if you configure it.",
    "ACI has no built-in autoscale or traffic splitting. Use Container Apps for scaling and revisions."
   ],
   [
    "Changing a secret or ingress setting in a container app creates a new revision.",
    "Secrets and ingress are application-scoped. Only revision-scoped changes such as the image, CPU, memory or scale rules create a new revision."
   ],
   [
    "Internal ingress makes an app reachable from the internet through the environment.",
    "Internal ingress limits access to the environment or its virtual network. Internet access needs external ingress."
   ]
  ],
  "tryit": [
   [
    "A logistics firm needs to run a web container plus a log-shipping sidecar that reads the web container's output through localhost and a shared volume. It runs a fixed, small load with no scaling needs, and it is Linux based. Which service and structure do you choose?",
    "An ACI container group containing both containers, deployed from a YAML file or ARM template. Containers in a group share the host, localhost networking and mounted volumes, which is exactly what a sidecar needs, and multi-container groups are supported for Linux. Container Apps would add scaling and revisions the workload does not need."
   ],
   [
    "A container app runs in single revision mode. The team wants to send 5 percent of users to a new image for a day before deciding. They deploy the new image and see 100 percent of traffic move to it. What went wrong and what is the fix?",
    "In single revision mode the new revision replaces the old one, so all traffic moves. Switch the app to multiple revision mode, keep the previous revision active, and set traffic weights of 95 and 5 percent; roll back by moving traffic back if needed."
   ]
  ],
  "tip": "Batch jobs in ACI need Never or OnFailure, not the default Always. In Container Apps, traffic splitting requires multiple revision mode, and a minimum replica count of zero allows scale to zero; ACI has no autoscale.",
  "check": [
   [
    "A container in ACI runs a one-off data load but keeps running and billing after it finishes. What should you change?",
    "Set the restart policy to Never (or OnFailure if it should retry on errors), because the default Always restarts it after every exit."
   ],
   [
    "What do containers in the same ACI container group share?",
    "The host, lifecycle, local network (localhost), public IP address and DNS label, and mounted volumes."
   ],
   [
    "You want to send 20 percent of traffic to a new Container Apps version. What is required?",
    "Multiple revision mode, with traffic weights set to 80 percent on the old revision and 20 percent on the new one."
   ],
   [
    "Does updating a secret in a container app create a new revision?",
    "No. Secrets are application-scoped; only revision-scoped changes such as the image or scale rules create a new revision."
   ],
   [
    "A queue-processing container app should run no replicas when the queue is empty. What two settings make that happen?",
    "A KEDA custom scale rule on the queue length and a minimum replica count of zero."
   ]
  ]
 },
 {
  "t": "App Service plans: tiers, scaling up vs scaling out, autoscale",
  "hook": "Two weeks before the spring fundraising drive at Riverbend Animal Rescue, you get two messages within an hour. Jonah, the volunteer developer, wants a staging copy of the donation site so he can test changes without touching the live page. The director wants the site to 'grow on its own' if a news story sends a wave of visitors. The three charity websites share one Basic App Service plan, and a quick look shows no deployment slots and no autoscale options anywhere. Is the answer more servers, bigger servers, or a different plan altogether, and what happens to the other two sites when you change it?",
  "simple": "Azure App Service runs websites for you without you managing any servers. Every site lives on an App Service plan, which is the set of servers you rent. Several sites can share one plan, like roommates sharing an apartment and its rent. Plans come in levels from Free up to Isolated, and higher levels unlock more features. Scaling up means moving to a bigger or better plan level, like upgrading from a small car to a big one. Scaling out means adding more copies of the same server to share the visitors, like adding more cars of the same model. Autoscale adds and removes those copies automatically, but only on Standard plans and above. All sites on a plan grow and shrink together.",
  "body": [
   "Azure App Service hosts web apps, REST APIs and mobile back ends without you managing servers, patching operating systems or configuring load balancers. Every app runs in an App Service plan, which defines the compute resources: region, operating system (Windows or Linux), pricing tier, instance size and number of instances. All apps in the same plan share those instances, so a busy app can slow its neighbors, and you pay for the plan whether one app or ten run on it. Understanding the plan is the key to cost, performance and feature questions, because almost every App Service scaling decision is really a plan decision.",
   "Start with the pricing tiers, which fall into groups. Free and Shared run your app on infrastructure shared with other customers, with CPU quotas, no scale-out and limited features; they are for trying things out. Basic provides dedicated instances with manual scale-out, suitable for low-traffic apps and development, and includes custom domains and TLS (Transport Layer Security) bindings. Standard adds rule-based autoscale and deployment slots, and it is the usual starting point for production. Premium (current generations are Premium v3 and later) adds faster hardware, more instances and slots, and platform-managed automatic scaling. Isolated runs your apps in an App Service Environment (ASE), dedicated infrastructure inside your own virtual network for maximum isolation and scale. Instance limits and slot counts differ per tier and change over time, so learn the order of features rather than numbers.",
   "Scaling up, also called vertical scaling, means changing the plan to a higher tier or a larger instance size: more CPU, memory and disk per instance, plus the features of that tier. You do it on the plan's Scale up blade or with `az appservice plan update --name plan-web --resource-group rg-web --sku P1V3`. It takes effect quickly without redeploying the app. Scaling up is how you get access to a feature such as deployment slots or autoscale, and how you fix an app that runs out of memory on every instance, because a single request can only use the resources of the instance that serves it.",
   "Scaling out, or horizontal scaling, means increasing the number of instances running your apps, with the built-in load balancer spreading requests across them. On Basic you set the count manually, for example `az appservice plan update --name plan-web --resource-group rg-web --number-of-workers 3`. On Standard and above you can configure rule-based autoscale on the plan's Scale out blade, which uses the same Azure Monitor autoscale engine as Virtual Machine Scale Sets: a default profile with minimum, maximum and default instance counts, metric rules such as 'CPU percentage above 70 over 10 minutes, increase by 1' with a matching scale-in rule, and schedule-based profiles for predictable peaks.",
   "Premium plans offer a second option. With automatic scaling, the platform adds instances based on HTTP traffic without rules, and you set only a maximum burst and, optionally, a minimum number of always-ready instances per app. It suits teams that want elasticity without tuning thresholds, while rule-based autoscale gives finer control over exactly when and why instances change.",
   "Because autoscale works on the plan, every app in the plan scales together. If one resource-hungry app drives scaling for all of them, move it to its own plan so it can scale independently and its cost is visible on its own. You can move an app to another plan in the same resource group and region (strictly, the same deployment unit, called a webspace); otherwise you clone or redeploy it. Remember too that a plan's region and operating system are fixed: Linux and Windows apps need separate plans.",
   "Consider a worked example. A charity hosts three sites on one Basic B1 plan. Before a fundraising campaign they need a staging slot for testing and automatic scaling for the donation page. Basic offers neither, so they scale up to Standard S1, create a staging slot, and on Scale out add a rule: CPU above 70 percent for 10 minutes adds one instance, CPU below 30 percent for 10 minutes removes one, minimum 2, maximum 6. During the campaign the plan runs four instances; afterwards it returns to two. They later move the busy donation app to its own plan so the other sites stop scaling with it.",
   "Common mistakes: scaling out when each instance is running out of memory, since more instances of a too-small size may not help; scaling up to fix a load problem that simply needs more instances; expecting autoscale or deployment slots on Basic; forgetting that apps in one plan scale together and share cost; creating a scale-out rule without a scale-in rule; and assuming a Free plan app can use a custom domain.",
   "Exam wording maps cleanly to answers. 'More CPU or memory per instance', 'a feature not available in the current tier' or 'needs deployment slots' means scale up. 'Handle more concurrent users' or 'add instances' means scale out. 'Automatically add instances based on CPU' means rule-based autoscale on Standard or higher. 'Network isolation on dedicated infrastructure' means Isolated with an App Service Environment. 'Minimize cost for a dev site' means Free or Basic. 'One app should scale independently' means a separate plan."
  ],
  "analogy": "An App Service plan is like a restaurant kitchen shared by several food brands. Scaling up is replacing the stove with a bigger one or moving to a better-equipped kitchen that comes with extras such as a walk-in fridge, the way higher tiers bring slots and autoscale. Scaling out is adding more identical stoves and cooks so more orders run at once. Because every brand shares the kitchen, a rush on one brand means more stoves for all of them, and the bill is shared. If one brand outgrows the rest, give it its own kitchen, which is a separate plan.",
  "mnemonic": "App Service tiers from lowest to highest: Five Small Boats Sail Past Islands, for Free, Shared, Basic, Standard, Premium, Isolated. Autoscale and slots start at the fourth boat, Standard.",
  "terms": [
   [
    "App Service plan",
    "The set of compute resources (region, OS, tier, size and instance count) that one or more App Service apps run on."
   ],
   [
    "Scale up",
    "Moving to a larger instance size or higher tier to get more resources per instance or extra features."
   ],
   [
    "Scale out",
    "Increasing the number of instances that run the apps in a plan, with requests load balanced across them."
   ],
   [
    "Rule-based autoscale",
    "Azure Monitor autoscale rules on a plan (Standard and above) that add or remove instances based on metrics or schedules."
   ],
   [
    "Automatic scaling",
    "A Premium plan feature where the platform scales on HTTP traffic without you writing rules."
   ],
   [
    "App Service Environment (ASE)",
    "A single-tenant deployment of App Service inside your virtual network, used by the Isolated tier."
   ],
   [
    "Instance",
    "One virtual machine in an App Service plan that runs all of the plan's apps; scaling out adds instances."
   ]
  ],
  "example": "A software company's reporting web app crashes with out-of-memory errors whenever users export large files, even though only a few users are online. Adding instances would not help because each export runs on one instance, so the administrator scales the plan up from a 3.5 GB instance size to a larger size in the same tier. The crashes stop, and the existing rule-based autoscale on CPU still handles busy periods by scaling out.",
  "mistakes": [
   [
    "Scaling out fixes an app that runs out of memory on every instance.",
    "Each request runs on one instance, so more small instances may not help. Scale up to a larger size for more memory per instance."
   ],
   [
    "Basic plans support autoscale if you add a rule.",
    "Basic supports only manual scale-out. Rule-based autoscale and deployment slots start at Standard."
   ],
   [
    "Each app in a shared plan scales independently.",
    "Scaling applies to the whole plan, so all its apps scale together. Move an app to its own plan to scale it separately."
   ],
   [
    "You can host a Linux app and a Windows app in the same plan.",
    "A plan's operating system is fixed. Linux and Windows apps need separate plans."
   ]
  ],
  "tryit": [
   [
    "A marketing site on a Standard S1 plan slows down every weekday from noon to 2 p.m. when a newsletter goes out, but each instance shows modest memory use and high CPU only during that window. The team asks whether to upgrade to Premium. What do you recommend first?",
    "Scale out rather than up. Add a schedule-based profile that raises the instance count before noon on weekdays, plus CPU rules (for example out at 70 percent, in at 30 percent) for unexpected spikes. Memory per instance is fine, so a larger size is not the issue; Standard already supports rule-based autoscale."
   ],
   [
    "A company must host an internal HR app that has to run on dedicated infrastructure inside its own virtual network, with no shared multi-tenant front ends. Which tier meets this?",
    "The Isolated tier, which runs apps in an App Service Environment deployed into the company's virtual network. Lower tiers run on multi-tenant infrastructure even when instances are dedicated."
   ]
  ],
  "tip": "Scale up for more power per instance or for a tier feature; scale out for more instances. Rule-based autoscale and deployment slots start at Standard, and all apps in one plan share its instances and scale together.",
  "check": [
   [
    "An app on a Basic plan needs deployment slots. What should you do?",
    "Scale up the plan to Standard or higher, because deployment slots are not available in Basic."
   ],
   [
    "What is the difference between scaling up and scaling out?",
    "Scaling up gives each instance more resources or a higher tier; scaling out adds more instances to share the load."
   ],
   [
    "Two apps share a plan, and one app's traffic keeps triggering autoscale for both. How do you fix this?",
    "Move the busy app to its own App Service plan so it scales and is billed independently."
   ],
   [
    "Which tier runs apps on dedicated infrastructure inside your own virtual network?",
    "The Isolated tier, which uses an App Service Environment."
   ],
   [
    "Which tier is the lowest that allows manual scale-out to more than one instance?",
    "Basic; Free and Shared do not support scale-out."
   ]
  ]
 },
 {
  "t": "App Service: TLS certificates, custom DNS names, backups, networking (VNet integration, private endpoints) and deployment slots",
  "hook": "Go-live week for the client portal at Hollis and Grant, a small law firm. The partners want clients to type `portal.hollisgrant.com`, see a padlock, and never notice when updates ship. The portal must read a database that has no public address at all, and the IT manager, Ines, asks a sharp question in the planning meeting: 'If the app can reach our private network, does that mean the public can no longer reach the app?' Then she adds: 'And when we release on Thursday night, what stops the staging settings from ending up in production?' You have five blades to configure. Which one answers each of her questions?",
  "simple": "Every App Service website starts with a free Azure web address, but businesses want their own name, a padlock certificate, backups, private connections and safe updates. To use your own name, you add records in your domain's DNS, the internet's phone book, to prove you own it and to point it at the app. A certificate turns on the padlock. For networking, remember two directions: one feature lets the app call out to private systems, and a different feature lets people reach the app privately. Deployment slots are like a dress rehearsal stage next to the main stage: you set up the new show there, check it, then swap the stages in an instant, and swap back if something goes wrong.",
  "body": [
   "Every App Service app gets a default host name, `<app-name>.azurewebsites.net`, with HTTPS already working through a Microsoft certificate. Production apps usually need more: a custom domain, their own TLS (Transport Layer Security) certificate, backups, private networking and a safe way to release updates. These settings sit on the app's blades in the portal (Custom domains, Certificates, Backups, Networking and Deployment slots), and the exam expects you to know what each one does and, for networking, which direction of traffic it affects.",
   "Start with the custom domain. Go to Custom domains > Add custom domain. App Service asks you to prove ownership with a TXT record named `asuid.<subdomain>` (or `asuid` for the root) containing the app's domain verification ID, and to map the name: a CNAME record pointing `www` to `<app-name>.azurewebsites.net`, or, for a root (apex) domain like `contoso.com`, an A record pointing to the app's inbound IP address, because DNS (Domain Name System) rules do not allow a CNAME at the apex. After validation the name is added to the app. Custom domains are not available on the Free tier.",
   "Next, make HTTPS work on that custom name by binding a certificate. Options include a free App Service managed certificate (automatically renewed, but not for wildcard names), an App Service certificate bought through Azure, a certificate imported from Azure Key Vault, or an uploaded private certificate file (`.pfx`). Bindings are usually SNI (Server Name Indication) SSL, which lets many certificates share one IP address because the browser names the site it wants during the handshake; IP-based SSL gives a dedicated address. Turn on HTTPS Only so HTTP requests redirect to HTTPS, and set the minimum TLS version to reject outdated clients.",
   "Backups are the safety net for content and configuration. A backup copies the app's content and configuration, and optionally a connected database. Automatic backups are taken by the platform in Basic and higher tiers. Custom backups let you set your own schedule and retention and send the backup to a storage account you choose. You can restore to the same app, a different app or a deployment slot. Backups are not a replacement for source control, but they help recover from a bad change or accidental deletion of content.",
   "Networking has two directions, and the exam checks that you do not mix them up. Inbound traffic is people or systems reaching the app. A private endpoint gives the app a private IP address in your virtual network (VNet), so clients reach it privately, and you can then disable public network access; access restrictions provide IP- or service-endpoint-based allow and deny rules on the public endpoint. Outbound traffic is the app calling something else. VNet integration lets the app call resources inside a VNet, such as a database on a private IP, through a dedicated subnet delegated to `Microsoft.Web/serverFarms`.",
   "Keep the two features separate in your head. VNet integration does not make the app privately reachable; the public endpoint stays open unless you restrict it. A private endpoint does not let the app reach into the network; it only gives clients a private way in. Many secure designs use both: a private endpoint for inbound, VNet integration for outbound, and public access disabled.",
   "Deployment slots, available in Standard and above, are how you release without downtime. Slots are live apps with their own host names, such as `<app-name>-staging.azurewebsites.net`. You deploy to staging, test and warm it up, then swap it with production with `az webapp deployment slot swap --slot staging --target-slot production`; routing switches without downtime, and swapping back is an instant rollback. App settings and connection strings move with the code during a swap unless marked as deployment slot settings (sticky), which keeps them with the slot. You can also route a percentage of production traffic to a slot and enable auto swap after deployment.",
   "Consider a worked example. A law firm moves its client portal to App Service Standard. It adds `portal.contoso.com` with a CNAME and an `asuid.portal` TXT record, binds a free managed certificate with SNI SSL and enables HTTPS Only with minimum TLS 1.2. The portal reads a SQL database that has only a private endpoint, so the team enables VNet integration into a delegated subnet. A staging slot holds a sticky connection string pointing at a test database. Each release goes to staging, is tested, then swapped; when one release fails, they swap back within a minute.",
   "Common mistakes: using a CNAME for the apex domain; forgetting the asuid TXT record; expecting VNet integration to hide the app from the internet; forgetting to mark a staging database connection string as a slot setting, so production points at test data after a swap; and expecting a managed certificate to cover a wildcard name. Exam clue words: 'app must reach a private database' means VNet integration; 'only reachable from the corporate network' means a private endpoint; 'zero-downtime release with instant rollback' means slots and swap; 'setting must stay with the slot' means deployment slot setting; 'root domain' means an A record."
  ],
  "analogy": "Think of the app as a shop. VNet integration is a private back door the shop's staff use to reach the warehouse: it lets the shop go out, but customers still use the front entrance. A private endpoint is a private customer entrance from inside the office park, and you can then lock the street door. Deployment slots are a second fully stocked shop floor behind a curtain; swapping moves the curtain. Sticky settings are fixtures bolted to each floor, such as the cash register connected to the real bank, that stay put when the curtain moves.",
  "mnemonic": "A for Apex: the root domain uses an A record. Subdomains such as www use a CNAME. Both need an asuid TXT record to prove ownership.",
  "terms": [
   [
    "Custom domain",
    "Your own DNS name mapped to an App Service app with a CNAME or A record plus an asuid TXT verification record."
   ],
   [
    "App Service managed certificate",
    "A free, automatically renewed TLS certificate for non-wildcard custom domains on an app."
   ],
   [
    "SNI SSL",
    "A TLS binding that uses Server Name Indication so many certificates can share one IP address."
   ],
   [
    "VNet integration",
    "An outbound feature that lets an app reach resources in a virtual network through a delegated subnet."
   ],
   [
    "Private endpoint",
    "An inbound feature that gives the app a private IP in a VNet so clients can reach it privately."
   ],
   [
    "Deployment slot",
    "A separate live instance of an app, such as staging, that can be swapped with production."
   ],
   [
    "Deployment slot setting",
    "An app setting or connection string marked sticky so it stays with its slot during a swap."
   ],
   [
    "Access restrictions",
    "Allow and deny rules on an app's public endpoint based on IP ranges or service endpoints."
   ],
   [
    "HTTPS Only",
    "An app setting that redirects all HTTP requests to HTTPS."
   ]
  ],
  "example": "An online shop deploys each release to a staging slot that uses a sticky connection string for a test payment gateway. After smoke tests pass, the team swaps staging into production; the code moves, but the production slot keeps its live payment gateway setting. When a bug appears an hour later, they swap again to restore the previous version instantly, then investigate the faulty build in the staging slot without affecting customers.",
  "mistakes": [
   [
    "Enabling VNet integration makes the app reachable only from the private network.",
    "VNet integration is outbound only. To restrict inbound access, use a private endpoint (and disable public access) or access restrictions."
   ],
   [
    "You can point the apex domain contoso.com at the app with a CNAME.",
    "DNS does not allow a CNAME at the apex. Use an A record to the app's inbound IP plus an asuid TXT record."
   ],
   [
    "All app settings stay with their slot when you swap.",
    "Settings move with the code unless marked as deployment slot settings. Mark environment-specific values such as database connection strings as sticky."
   ],
   [
    "A free App Service managed certificate can secure a wildcard name like *.contoso.com.",
    "Managed certificates do not support wildcard names. Use an App Service certificate, a Key Vault certificate or an uploaded .pfx."
   ]
  ],
  "tryit": [
   [
    "Fairview Dental's booking app must be reachable only by staff on the corporate network, which connects to Azure over a VPN, and it must also write to a storage account that accepts traffic only from a private network. Which App Service networking features do you configure, and why both?",
    "Configure a private endpoint for inbound access so staff reach the app on a private IP, then disable public network access. Configure VNet integration with a delegated subnet for outbound access so the app can reach the storage account privately. Each feature covers only one direction, so the design needs both."
   ],
   [
    "After Thursday's swap, the production site starts sending test emails because it is using the staging mail server setting. The mail server is stored as an app setting in both slots. What happened, and how do you fix it now and for the future?",
    "The setting was not marked as a deployment slot setting, so it moved with the code during the swap. Swap back to restore production immediately, then mark the mail server setting as a deployment slot setting in both slots so each keeps its own value on future swaps."
   ]
  ],
  "tip": "VNet integration is outbound only; a private endpoint is inbound only. Slot swaps move settings unless they are marked as deployment slot settings. An apex domain uses an A record, a subdomain usually a CNAME, and both need an asuid TXT record.",
  "check": [
   [
    "An App Service app must connect to a SQL database that only has a private IP address. Which feature is needed?",
    "VNet integration, which gives the app outbound access into the virtual network through a delegated subnet."
   ],
   [
    "Which DNS records do you create to map contoso.com (the apex) to an App Service app?",
    "An A record pointing to the app's IP address and a TXT record named asuid containing the domain verification ID."
   ],
   [
    "After a swap, production is using the staging database. What was missed?",
    "The connection string was not marked as a deployment slot setting, so it moved with the code during the swap."
   ],
   [
    "What is the minimum tier for deployment slots?",
    "Standard; Free, Shared and Basic plans do not support deployment slots."
   ],
   [
    "Which binding type lets many TLS certificates share one IP address on App Service?",
    "SNI SSL, which uses Server Name Indication to pick the certificate for the requested host name."
   ]
  ]
 },
 {
  "t": "Virtual networks and subnets: address space planning, the 5 reserved IPs per subnet",
  "hook": "It is your second week as the Azure administrator at Juniper Freight, and Omar from the data team pings you: the analytics VNet will not peer with production, and the new site-to-site VPN to the warehouse keeps failing to create. You open both VNets in the portal and see the same address space on each, 10.0.0.0/16, the value the portal suggested when someone clicked through the wizard a year ago. The warehouse uses 10.0.0.0/16 too. Meanwhile a developer asks why a /28 subnet she sized for 16 build agents only fits 11. Two small planning shortcuts are now blocking real work. How should a virtual network be planned so this never happens again?",
  "simple": "A virtual network, or VNet, is your own private network inside Azure. You give it a range of private addresses, like a street with a block of house numbers, and then split that range into smaller pieces called subnets, like sections of the street. Two rules matter most. First, no two networks you want to connect can share the same numbers, just as two houses on a joined street cannot both be number 12. Second, Azure keeps five addresses in every subnet for its own use: the first four and the last one. So a subnet with 256 addresses gives you 251 you can actually hand out, and the first one you can use ends in .4.",
  "body": [
   "An Azure virtual network (VNet) is your private network in the cloud. Resources such as virtual machines (VMs), private endpoints and internal load balancers get private IP addresses from it and can talk to each other, reach the internet outbound, and, through peering or a VPN (virtual private network), connect to other networks. A VNet belongs to one region and one subscription, and it automatically spans all availability zones in that region, so you do not create a separate network per zone. A VNet cannot stretch across regions; for a second region you build a second VNet and connect the two. Everything else in Azure networking, from security groups to gateways, is attached to a VNet or one of its subnets, which is why good address planning at the start saves painful rebuilds later.",
   "Planning starts with the address space. When you create a VNet you give it one or more address spaces in CIDR (Classless Inter-Domain Routing) notation, normally from the private ranges defined in RFC 1918: 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. The most important planning rule is to avoid overlap. Two VNets with overlapping address spaces cannot be peered, and a VNet that overlaps your on-premises network cannot be connected to it by VPN or ExpressRoute, because routers would have no way to tell which side an address belongs to. Large organizations therefore keep an IP address management (IPAM) plan, even if it is just a shared spreadsheet, and give each VNet its own non-overlapping block, with room to grow. You can add further address spaces to an existing VNet later if you run out, which is far easier than renumbering.",
   "Next, you divide the address space into subnets, for example 10.1.0.0/24 for web servers and 10.1.1.0/24 for databases. Subnets are where you apply network security groups (NSGs), route tables, service endpoints and delegations, so group resources by the security and routing they need rather than by team or project name. Some services require a dedicated subnet with an exact name: `GatewaySubnet` for VPN and ExpressRoute gateways, `AzureBastionSubnet` for Azure Bastion and `AzureFirewallSubnet` for Azure Firewall. The portal and deployment will reject a misspelled name or simply not offer the subnet for that service. Others, such as App Service VNet integration, need a subnet delegated to them, and nothing else can be placed there.",
   "The five reserved addresses are the most tested number in this topic. Azure reserves five IP addresses in every subnet, and exam questions often ask how many usable addresses a subnet has. In 10.1.0.0/24 the reserved addresses are: 10.1.0.0, the network address; 10.1.0.1, reserved for the default gateway; 10.1.0.2 and 10.1.0.3, reserved to map Azure DNS IP addresses into the VNet; and 10.1.0.255, the network broadcast address. So a /24 subnet has 256 minus 5, or 251, usable addresses, and the first address you can assign is x.x.x.4. This differs from a home router, where .1 is often the first host. The smallest supported IPv4 subnet is /29, which has 8 addresses minus 5 reserved, leaving 3 usable. A /28 leaves 11, a /27 leaves 27, a /26 leaves 59 and a /25 leaves 123. The quick formula is always the block size minus five.",
   "Creating the network is straightforward with the Azure command-line interface (CLI). The first command creates the VNet with its address space and a first subnet; the second adds another subnet:",
   "```bash\naz network vnet create --resource-group rg-net --name vnet-prod \\\n  --address-prefixes 10.1.0.0/16 --subnet-name web --subnet-prefixes 10.1.0.0/24\naz network vnet subnet create --resource-group rg-net --vnet-name vnet-prod \\\n  --name db --address-prefixes 10.1.1.0/24\n```",
   "You can also create VNets in the portal, in PowerShell or in Bicep templates. Changing a subnet's range later is only possible if no resources use addresses outside the new range, so plan generously and size subnets for scale: a scale set, AKS (Azure Kubernetes Service) cluster or App Service integration may need many addresses, and growth is painful once a subnet is full. Name resolution is part of the VNet too. By default, VMs use Azure-provided DNS (Domain Name System), reached at the virtual IP 168.63.129.16, unless you set custom DNS servers on the VNet; changing DNS servers takes effect after VMs renew their settings or restart, which is a common reason a DNS change seems to do nothing at first.",
   "Consider a worked example that pulls these rules together. A company plans three VNets: a hub in West Europe, a production spoke and a development spoke, plus an on-premises network that already uses 10.0.0.0/16. They choose 10.10.0.0/16 for the hub, 10.20.0.0/16 for production and 10.30.0.0/16 for development, so nothing overlaps with each other or with on-premises. In the hub they create `GatewaySubnet` as 10.10.0.0/27, `AzureBastionSubnet` as 10.10.1.0/26 and `AzureFirewallSubnet` as 10.10.2.0/26. The production web tier expects up to 200 VMs, so it gets a /24 with 251 usable addresses rather than a /25 with only 123. Every choice is written into the IPAM sheet before anyone deploys.",
   "Several mistakes come up again and again: forgetting the five reserved addresses and sizing a subnet too tightly; reusing 10.0.0.0/16 in every VNet because it is the portal default, which later blocks peering; misspelling a special subnet name; placing ordinary VMs in `GatewaySubnet`; assuming a VNet can span regions; and thinking the first usable address is .1 as it might be on a home router.",
   "Exam questions phrase this in predictable ways. 'How many IP addresses can be assigned in a /27 subnet?' means 32 minus 5, so 27. 'What is the first IP address assigned to a VM?' means .4. 'The VNets cannot be peered' or 'the VPN connection fails to create' usually points to overlapping address spaces. 'Which subnet name is required for Bastion, VPN gateway or Azure Firewall?' tests the exact names, and 'the smallest subnet' is /29. If you can do the subtraction quickly and spot overlap at a glance, most questions on this topic become easy points."
  ],
  "analogy": "Planning a VNet is like laying out house numbers for a new housing estate that will later be joined to the town. If two estates both use numbers 1 to 500, the post office cannot deliver once the roads connect, which is exactly why overlapping VNets cannot be peered. In each street, the council keeps the first few plots and the last one for the gate, the utility box and the sign, which is like the five reserved addresses. The analogy breaks down in one way: Azure always reserves the same five positions, no matter how big or small the subnet is.",
  "terms": [
   [
    "Virtual network (VNet)",
    "A private, isolated network in one Azure region and subscription that spans the region's availability zones."
   ],
   [
    "Address space",
    "The CIDR block or blocks assigned to a VNet, from which all its subnets are carved."
   ],
   [
    "CIDR",
    "Classless Inter-Domain Routing notation, such as 10.1.0.0/24, where the suffix gives the number of network bits."
   ],
   [
    "Subnet",
    "A range inside a VNet's address space where NSGs, route tables, service endpoints and delegations are applied."
   ],
   [
    "Reserved addresses",
    "The five addresses Azure keeps in every subnet: network, default gateway, two for Azure DNS, and broadcast."
   ],
   [
    "Subnet delegation",
    "Dedicating a subnet to a specific Azure service, such as App Service VNet integration, so it can inject resources there."
   ],
   [
    "GatewaySubnet",
    "The exact subnet name required for VPN and ExpressRoute virtual network gateways."
   ],
   [
    "IPAM",
    "IP address management: the plan or tool that records which address blocks are assigned to which networks."
   ]
  ],
  "example": "A startup created every VNet with the default 10.0.0.0/16. A year later it tries to peer the production and analytics VNets and connect both to the office network over VPN, and every attempt fails because the ranges overlap. The team rebuilds analytics as 10.40.0.0/16, documents an address plan in a shared spreadsheet, and from then on assigns each new VNet a unique /16 before anyone deploys into it.",
  "mistakes": [
   [
    "A /28 subnet holds 16 VMs.",
    "Azure reserves five addresses in every subnet, so a /28 has 16 minus 5, or 11, usable addresses. Always subtract five."
   ],
   [
    "The first VM in 10.1.0.0/24 gets 10.1.0.1.",
    "Addresses .0 to .3 are reserved (network, gateway, two for DNS), so the first assignable address is 10.1.0.4."
   ],
   [
    "Using the portal default 10.0.0.0/16 everywhere is harmless because VNets are isolated.",
    "They are isolated until you need to connect them. Overlapping address spaces block peering and VPN or ExpressRoute connections, so give every VNet a unique range from the start."
   ],
   [
    "A VNet can cover two regions if you add subnets in each.",
    "A VNet lives in one region (spanning that region's zones). A second region needs its own VNet, connected with global peering or a gateway."
   ]
  ],
  "tryit": [
   [
    "You must create a subnet for a scale set that may grow to 50 instances, and you want the smallest subnet that fits. Your options are /27, /26 and /25. Which do you pick?",
    "A /26. A /27 gives only 27 usable addresses after the five reserved, which is too few. A /26 gives 59, enough for 50 instances with a little room. A /25 (123 usable) also works but wastes space if smallest is the goal."
   ],
   [
    "The on-premises network uses 10.0.0.0/16 and 172.16.0.0/16. A colleague proposes 10.0.128.0/17 for a new hub VNet that will connect over VPN. Do you approve?",
    "No. 10.0.128.0/17 sits inside 10.0.0.0/16, so it overlaps on-premises and the VPN connection would not work. Choose a range that overlaps nothing, such as 10.10.0.0/16, and record it in the IPAM plan."
   ]
  ],
  "tip": "Usable addresses equal the subnet size minus 5, and the first usable address is .4. Overlapping address spaces block both peering and VPN connections, and special services need exactly named subnets such as GatewaySubnet and AzureBastionSubnet.",
  "check": [
   [
    "How many usable IP addresses does a /26 subnet have in Azure?",
    "59, because a /26 has 64 addresses and Azure reserves 5 in every subnet."
   ],
   [
    "Which addresses are reserved in 192.168.5.0/24?",
    "192.168.5.0 (network), .1 (default gateway), .2 and .3 (Azure DNS) and .255 (broadcast)."
   ],
   [
    "Two VNets cannot be peered even though you have the right permissions. What should you check first?",
    "Whether their address spaces overlap, because overlapping VNets cannot be peered."
   ],
   [
    "What is the smallest IPv4 subnet Azure supports, and how many usable addresses does it have?",
    "A /29, with 8 addresses minus 5 reserved, leaving 3 usable."
   ]
  ]
 },
 {
  "t": "Virtual network peering: non-transitive, gateway transit and use remote gateways, global peering",
  "hook": "At Cedar Valley Health, you built a tidy hub-and-spoke network last month: a hub VNet with the VPN gateway to the clinics, plus Billing and Records spokes peered to it. This morning a ticket arrives from Lena in Billing: her app cannot reach the Records API, even though both spokes are peered to the same hub and every peering shows Connected. An hour later the clinic network team asks why they can reach the hub but not either spoke. Your manager also wants to know whether you really need a second VPN gateway for the new spoke in another region. Everything looks connected on the diagram. So why is traffic stopping, and what single setting is missing?",
  "simple": "Peering is a private cable between two Azure networks, so machines on each side can talk as if they were on one network. The catch is that a cable only joins the two ends it touches. If network A is cabled to B, and B is cabled to C, A still cannot talk to C through B. You either add a cable from A to C, or put a router in B and tell traffic to go through it. Peering also lets networks share one expensive VPN gateway: the network that owns the gateway says 'others may use mine', and each other network says 'use theirs instead of my own'. Peering works within one region or between regions.",
  "body": [
   "Virtual network peering connects two virtual networks (VNets) so resources in them communicate using private IP addresses, as if they were one network. Traffic travels over the Microsoft backbone, never the public internet, with low latency and no gateway in the path. Peering VNets in the same region is regional peering; peering VNets in different regions is global peering, which works the same way. VNets can be in different subscriptions, and even in different Microsoft Entra tenants when the administrator has permissions on both sides. Peering is the building block of hub-and-spoke networks, where shared services such as gateways and firewalls live in a central hub and workloads live in spokes.",
   "A peering is really two links, one from each side. In the portal, creating a peering on one VNet can create both links at once. With the command-line interface (CLI) or PowerShell you create both yourself, for example `az network vnet peering create --name hub-to-spoke1 --resource-group rg-hub --vnet-name vnet-hub --remote-vnet <spoke1-id> --allow-vnet-access` and then the reverse link on the spoke. The peering status shows Initiated when only one side exists and Connected when both do, so Initiated is a clear sign that someone forgot the second link. The VNets must not have overlapping address spaces. Peering traffic is charged per gigabyte in and out, with higher rates for global peering, which is worth remembering when a question mentions cost.",
   "The most tested fact about peering is that it is non-transitive. If VNet A is peered with VNet B, and B is peered with C, A cannot reach C through B. Each peering only shares routes between its own two VNets; B does not advertise A's range to C. In a hub-and-spoke design, where spokes peer only with a central hub, spokes therefore cannot talk to each other by default. To allow spoke-to-spoke traffic you either peer the spokes directly, or route traffic through a network virtual appliance (NVA) or Azure Firewall in the hub using user-defined routes, with Allow forwarded traffic enabled on the peerings. Azure Virtual Network Manager and Azure Virtual WAN can also build connected topologies for you.",
   "Each peering link has settings that control what may cross it. Allow access to the remote VNet, which is on by default, permits communication at all. Allow forwarded traffic accepts traffic that did not originate in the peer VNet, such as traffic routed through an appliance from another spoke. Allow gateway transit, set on the hub side, lets peered VNets use the hub's VPN or ExpressRoute gateway. Use remote gateways, set on the spoke side, tells the spoke to use the peer's gateway instead of its own. A simple way to remember the direction: the VNet that has the gateway allows transit, and the VNet that borrows it uses remote gateways.",
   "Gateway transit is how a hub-and-spoke network shares one VPN gateway instead of paying for one per spoke. The hub has the gateway and enables Allow gateway transit; each spoke enables Use remote gateways. Spokes can then reach on-premises through the hub gateway, and on-premises learns routes to the spokes, either over BGP (Border Gateway Protocol) or through prefixes you add to the local network gateway. There are firm limits to remember: a spoke that already has its own gateway cannot use remote gateways, and a VNet can use remote gateways from only one peering. Gateway transit works with global peering as well as regional peering, so a spoke in another region can still share the hub's gateway.",
   "Consider a worked example. A company has a hub VNet in North Europe with a site-to-site VPN gateway to its head office, and two spokes, Finance and HR. Staff in the office must reach both spokes, and Finance must reach HR. The administrator peers each spoke with the hub, enabling Allow gateway transit on the hub-side links and Use remote gateways on the spoke-side links; the office can now reach both spokes. For Finance-to-HR traffic they deploy Azure Firewall in the hub, add a route table to each spoke subnet sending the other spoke's range to the firewall's private IP, and enable Allow forwarded traffic on the peerings. Checking effective routes on a Finance VM shows the peering route to the hub and the user-defined route to HR via the firewall.",
   "Troubleshooting peering usually comes down to three checks. Are both links Connected, or is one still Initiated? Do the address spaces overlap? Do network security groups or route tables block the traffic? Network Watcher's effective routes on a VM's network interface show whether a route with next hop type VNet peering exists for the remote address space; if it is missing, the peering is not working, and if it is present but traffic still fails, look at NSGs and the guest firewall.",
   "Common mistakes include expecting spoke-to-spoke connectivity through a hub without an appliance and routes; setting Use remote gateways on the hub instead of the spoke; creating only one side of the peering and leaving it in the Initiated state; trying to peer overlapping ranges; and trying to enable Use remote gateways on a spoke that has its own gateway.",
   "Exam questions describe a topology and ask what is reachable. 'A is peered to B and B to C; can A reach C?' is always no without extra configuration. 'Spokes must use the hub's VPN gateway' means Allow gateway transit on the hub and Use remote gateways on each spoke. 'Connect VNets in different regions privately' means global peering. 'Peering status is Initiated' means the other side's link is missing. 'Minimum cost to let two spokes talk' usually means peering them directly rather than deploying a firewall just for that purpose."
  ],
  "analogy": "Peering is like a private footbridge between two office buildings. People in building A can walk to B, and people in B can walk to C over another bridge, but nobody from A is allowed to walk through B's lobby to reach C unless B posts a receptionist (the firewall or appliance) and signs pointing the way (user-defined routes). Gateway transit is like building B letting its neighbors use its loading dock to the highway. The analogy stops working for cost: unlike a bridge, peering charges for traffic in each direction.",
  "terms": [
   [
    "Virtual network peering",
    "A private, low-latency connection between two VNets over the Microsoft backbone."
   ],
   [
    "Global peering",
    "Peering between VNets in different Azure regions."
   ],
   [
    "Non-transitive",
    "The property that peering does not pass through a third VNet: A-B and B-C does not give A-C."
   ],
   [
    "Allow gateway transit",
    "A peering setting on the VNet that owns a gateway, letting peers use that gateway."
   ],
   [
    "Use remote gateways",
    "A peering setting on the VNet without a gateway, telling it to use the peer's gateway."
   ],
   [
    "Allow forwarded traffic",
    "A peering setting that accepts traffic not originating in the peer VNet, such as traffic routed via an appliance."
   ],
   [
    "Hub-and-spoke",
    "A topology where spoke VNets peer with a central hub that holds shared services such as gateways and firewalls."
   ],
   [
    "Peering status",
    "Initiated when only one link exists, Connected when both links exist."
   ]
  ],
  "example": "A retailer's three regional spokes all need access to on-premises inventory servers. Rather than deploying three VPN gateways, the network team places one gateway in the hub, enables Allow gateway transit on each hub-to-spoke link and Use remote gateways on each spoke-to-hub link. On-premises routers now learn all spoke prefixes through the hub gateway, and the company pays for one gateway instead of three.",
  "mistakes": [
   [
    "Two spokes peered to the same hub can talk to each other automatically.",
    "Peering is non-transitive. Spokes need a direct peering, or routing through a firewall or NVA in the hub with user-defined routes and Allow forwarded traffic."
   ],
   [
    "Use remote gateways is set on the hub, since the hub owns the gateway.",
    "The hub sets Allow gateway transit. Use remote gateways goes on each spoke that borrows the hub's gateway."
   ],
   [
    "Gateway transit only works for VNets in the same region.",
    "Gateway transit works over global peering too, so a spoke in another region can use the hub's gateway."
   ],
   [
    "A peering in the Initiated state just needs time to finish.",
    "Initiated means only one link exists. Create the matching link from the other VNet and the status becomes Connected."
   ]
  ],
  "tryit": [
   [
    "VNet-Hub has an ExpressRoute gateway. You create VNet-Spoke3, which already has its own small VPN gateway for a partner, and peer it to the hub. The team wants Spoke3 to reach on-premises through the hub's ExpressRoute. You try to enable Use remote gateways on Spoke3 and it fails. Why, and what are your options?",
    "A VNet that has its own gateway cannot use remote gateways. Either remove Spoke3's gateway (moving the partner connection to the hub) and then enable Use remote gateways, or give Spoke3 its own path to on-premises."
   ],
   [
    "Spoke-A and Spoke-B are both peered to a hub with no firewall. They need to exchange a small amount of traffic, and the requirement says to minimize cost and administration. What do you do?",
    "Peer Spoke-A and Spoke-B directly. Deploying a firewall or NVA in the hub just for this adds cost and route tables, while a direct peering solves it with two links."
   ]
  ],
  "tip": "Peering is non-transitive: A-B and B-C does not give A-C. Allow gateway transit goes on the VNet that has the gateway; Use remote gateways goes on the VNet that borrows it. Address spaces must not overlap and both links must show Connected.",
  "check": [
   [
    "VNet1 is peered with VNet2, and VNet2 with VNet3. Can VM1 in VNet1 reach VM3 in VNet3?",
    "No. Peering is non-transitive; you need a direct peering or routing through an appliance in VNet2."
   ],
   [
    "Where do you enable Allow gateway transit and Use remote gateways?",
    "Allow gateway transit on the hub VNet that has the gateway; Use remote gateways on each spoke VNet that shares it."
   ],
   [
    "A peering shows the status Initiated. What does that mean?",
    "Only one side of the peering has been created; the link from the other VNet is missing."
   ],
   [
    "Can VNets in different regions be peered, and what is it called?",
    "Yes. Peering across regions is called global peering and works like regional peering, including gateway transit."
   ]
  ]
 },
 {
  "t": "Public IP addresses: Standard SKU, static allocation, zones",
  "hook": "It is launch night for the new booking site at Northgate Travel, and Sam from the web team messages you: the load balancer has a shiny new public IP, DNS points to it, the VMs are healthy, and yet every browser times out. Meanwhile the payments partner emails asking for the single outbound address they should allow-list by tomorrow, and your architect wants proof that the site keeps its address if one datacenter zone goes dark. Three requests, one small Azure resource that sits in front of all of them. Why is nothing getting in, and which choices made at creation time can never be changed afterward?",
  "simple": "A public IP address is the internet-facing phone number for something in Azure, such as a website's load balancer. In Azure it is its own separate item, so you can keep the number even if you replace the thing it rings. The modern kind, called Standard, has three habits. Its number never changes once created. It refuses all incoming calls until you write a rule that allows them. And it can be spread across several datacenters in a region, called zones, so it keeps working if one fails. Picking zones happens once, when you create it, and cannot be changed later, a bit like choosing which buildings a phone line runs through.",
  "body": [
   "A public IP address is a separate Azure resource that you associate with something that must be reachable from, or appear from, the internet: a virtual machine's network interface, a public load balancer, a VPN gateway, Application Gateway, Azure Bastion, Azure Firewall or a NAT (network address translation) gateway. Because it is its own resource with its own lifecycle, you can keep the address when you delete or replace the resource it was attached to. That matters when partners, DNS (Domain Name System) records or firewall allow-lists depend on that exact address, and it is why a careful administrator detaches and keeps an important public IP rather than deleting it along with a VM.",
   "Public IPs come in SKUs (stock-keeping units), and Standard is the SKU to use. Microsoft has retired the older Basic SKU, so new designs, and exam answers, should assume Standard. Standard public IPs have three properties that matter. First, they always use static allocation: the address is assigned when you create the resource and does not change until you delete it. Second, they are secure by default: inbound traffic is blocked unless a network security group (NSG) explicitly allows it. Third, they support availability zones. A Standard public IP must also be paired with a Standard SKU load balancer, because the SKUs of a load balancer and its public IP must match.",
   "Static versus dynamic allocation is a classic exam topic because it explains a common real-world complaint. With the old Basic SKU, a dynamic address was assigned when the resource started and could change when a VM was stopped and deallocated, so DNS records and partner allow-lists silently broke after maintenance. A static address never changes, which is what you need for DNS A records, firewall allow-lists and some certificates. Standard addresses are always static, so if a question says an address keeps changing after deallocation, the fix is a static Standard public IP.",
   "Zone settings are chosen when you create the IP and cannot be changed later. A zone-redundant IP is served from all zones in the region and survives the failure of any single zone; this is the usual choice in regions with zones. A zonal IP is pinned to one zone (1, 2 or 3) and fails if that zone does, which suits a VM deliberately placed in that zone. No zone is the option for regions without availability zones. Match the IP to your design: a zone-redundant load balancer front end should use a zone-redundant public IP. If you later need a different zone setting, you create a new public IP and move to it. The CLI makes the choices explicit:",
   "```bash\naz network public-ip create --resource-group rg-web --name pip-lb-web \\\n  --sku Standard --allocation-method Static --zone 1 2 3 \\\n  --dns-name contoso-shop\n```",
   "The portal shows several other properties worth recognizing. IP version can be IPv4 or IPv6. Tier is Regional, or Global for a cross-region load balancer. An optional DNS name label creates a name such as `contoso-shop.westeurope.cloudapp.azure.com` that follows the address. Routing preference chooses whether traffic enters and leaves over the Microsoft network or the public internet, and idle timeout controls how long an idle connection is kept. A public IP prefix reserves a contiguous block of static public addresses, useful when partners must allow-list a predictable range rather than a scattered set of single addresses.",
   "Outbound access deserves its own design decision. For outbound-only internet access from private VMs, a NAT gateway with a Standard public IP or prefix is the recommended approach, rather than giving each VM its own public IP. Fewer public IPs mean a smaller attack surface: every VM with a public address is a target for scanning. Administrators should reach VMs through Azure Bastion or VPN instead of opening public RDP (Remote Desktop Protocol) or SSH (Secure Shell).",
   "Consider a worked example. A payment provider must allow-list your outbound address, and your website needs a fixed address that survives a zone failure. For inbound, you create a zone-redundant Standard public IP for the load balancer front end and add an NSG rule allowing TCP 443 from the internet to the web subnet, since Standard IPs block inbound traffic by default. For outbound, you attach a NAT gateway with a public IP prefix to the application subnet and send the prefix to the payment provider. None of the VMs has its own public IP, and the design has no single-zone dependency.",
   "Watch for these common mistakes: expecting a new Standard public IP to accept traffic without an NSG rule; trying to change a zonal IP to zone-redundant after creation; pairing a Standard IP with a Basic load balancer; giving every VM a public IP for outbound access; and deleting a VM together with its public IP when the address needed to be kept.",
   "Exam clue words map neatly to answers. 'Address must never change' means static Standard. 'Survive a zone failure' means zone-redundant. 'No inbound traffic arrives on a new public IP' means add an NSG allow rule. 'Predictable contiguous range' means a public IP prefix. 'Outbound only, no inbound exposure' means a NAT gateway."
  ],
  "analogy": "A Standard public IP is like a business phone number you lease separately from the phone. You can swap the handset (the VM or load balancer) and keep the number. The line is set to do-not-disturb out of the box, so no calls ring through until you add callers to an allow list, which is the NSG rule. Choosing zone-redundant is like having the line routed through three exchanges at once. Where the analogy stops: you cannot reroute an existing line later; a different zone setting means leasing a new number.",
  "mnemonic": "Standard is S-S-Z: Static, Secure by default, Zone-aware.",
  "terms": [
   [
    "Public IP address",
    "A standalone Azure resource that gives an associated resource an internet-routable address."
   ],
   [
    "Standard SKU",
    "The current public IP SKU: always static, secure by default and zone aware."
   ],
   [
    "Static allocation",
    "An address assigned at creation that does not change until the public IP resource is deleted."
   ],
   [
    "Zone-redundant",
    "A public IP served from all availability zones in a region so it survives a single zone failure."
   ],
   [
    "Zonal",
    "A public IP pinned to one availability zone, which fails if that zone fails."
   ],
   [
    "Public IP prefix",
    "A reserved contiguous block of static public IP addresses."
   ],
   [
    "NAT gateway",
    "A managed service that provides outbound internet connectivity for a subnet through shared public IPs or prefixes."
   ]
  ],
  "example": "A company runs a VPN gateway and a web load balancer in a region with availability zones. During a design review, the architect checks that both use Standard, zone-redundant public IPs, so the loss of one datacenter zone does not change or remove the addresses that branch offices and customers rely on. She also confirms that the web subnet's NSG explicitly allows TCP 443, because Standard public IPs block inbound traffic until a rule permits it.",
  "mistakes": [
   [
    "A new Standard public IP is open to the internet as soon as it is attached.",
    "Standard is secure by default. Inbound traffic is blocked until an NSG on the subnet or NIC explicitly allows the port."
   ],
   [
    "You can switch a zonal public IP to zone-redundant during a maintenance window.",
    "Zone settings are fixed at creation. You must create a new zone-redundant public IP and move the resource to it."
   ],
   [
    "Choose dynamic allocation to save money and set the address in DNS.",
    "Standard public IPs are always static, and a dynamic address could change after deallocation, breaking DNS and allow-lists."
   ],
   [
    "Give each private VM a public IP so it can download updates.",
    "Use a NAT gateway on the subnet for outbound access. It avoids inbound exposure and gives a small, predictable set of outbound addresses."
   ]
  ],
  "tryit": [
   [
    "You are deploying a public Standard load balancer in a region with three availability zones. The business requires the site address to keep working if any one zone fails and never to change. Which public IP settings do you choose, and what else must you configure before users can connect?",
    "A Standard SKU, static, zone-redundant public IP (zones 1, 2 and 3). Because Standard is secure by default, you must also add an NSG rule allowing the site's port, such as TCP 443, to the backend subnet or NICs."
   ]
  ],
  "tip": "Standard public IPs are always static, zone-aware and closed to inbound traffic until an NSG allows it. The zone choice is fixed at creation, and load balancer and public IP SKUs must match.",
  "check": [
   [
    "A new Standard public IP is attached to a VM, but nobody can reach the web server. What is the likely cause?",
    "Standard public IPs are secure by default, so an NSG rule must explicitly allow the inbound port, such as TCP 443."
   ],
   [
    "Can you change a zonal public IP to zone-redundant later?",
    "No. The zone setting is chosen at creation and cannot be changed; you must create a new public IP."
   ],
   [
    "What allocation method do Standard public IPs use?",
    "Static only; the address stays the same until the resource is deleted."
   ],
   [
    "Private VMs need outbound internet access through a small, fixed set of addresses. What is recommended?",
    "A NAT gateway on their subnet with a Standard public IP or public IP prefix."
   ]
  ]
 },
 {
  "t": "User-defined routes: route tables, next hop types (virtual appliance, virtual network gateway, internet, none) and forced tunneling",
  "hook": "At 7 a.m. the security lead at Bramble Insurance, Dana, forwards an audit finding to you: traffic from the claims app spoke reaches the internet directly, skipping the Azure Firewall the company paid for. You add a route table, and by 7:20 the help desk is lit up because the claims VMs cannot reach anything at all. Network Watcher says traffic is going to the firewall's IP, but nothing comes back. Later, a compliance officer asks whether internet traffic could instead be sent back to the head office for inspection. Routing in Azure normally just works, until you change it. How do you steer traffic where you want without breaking everything?",
  "simple": "Azure normally decides by itself where network traffic goes, like a GPS choosing the default route. A user-defined route is you telling the GPS 'for trips to this area, go via this checkpoint instead'. You write these instructions in a route table and attach it to a subnet. Each instruction says a destination and a next stop: a firewall, the VPN to your office, straight to the internet, or nowhere (drop it). If two instructions match, the more specific one wins, just as 'deliver to 12 Elm Street' beats 'deliver to the city'. Forced tunneling means sending all internet trips back to the office first so they can be inspected.",
  "body": [
   "Azure routes traffic automatically with system routes, which you cannot delete. Each subnet gets a route for the VNet's own address space (next hop Virtual network), a default route 0.0.0.0/0 to the Internet, routes for peered VNets and routes learned from gateways. Certain private and reserved ranges not used in the VNet get next hop None, so traffic to them is dropped. This works well until you want traffic to go somewhere else, most often through a firewall for inspection, or back to on-premises for compliance.",
   "User-defined routes (UDRs) let you override system routes. You create a route table resource, add routes to it, and associate the route table with one or more subnets. A route table affects traffic leaving resources in the subnets it is associated with; it is never associated with a network interface (NIC) or with a whole VNet, and each subnet can have at most one route table. One route table can, however, be shared by many subnets. The route table must be in the same region and subscription as the VNet. The steps look like this with the Azure command-line interface (CLI):",
   "```bash\naz network route-table create --resource-group rg-net --name rt-spoke\naz network route-table route create --resource-group rg-net --route-table-name rt-spoke \\\n  --name default-to-fw --address-prefix 0.0.0.0/0 \\\n  --next-hop-type VirtualAppliance --next-hop-ip-address 10.0.1.4\naz network vnet subnet update --resource-group rg-net --vnet-name vnet-spoke \\\n  --name app --route-table rt-spoke\n```",
   "Each route has an address prefix (the destination) and a next hop type, and the next hop types are a core exam list. Virtual appliance sends traffic to the private IP of a network virtual appliance (NVA), such as Azure Firewall or a third-party firewall VM; you must enter that next hop IP address, and it is the only type that needs one. Virtual network gateway sends traffic to the VPN gateway, typically toward on-premises. Virtual network routes traffic within the VNet, useful to override a broader rule for a specific range. Internet sends traffic to the internet directly, even if a broader route would send it elsewhere. None drops the traffic, a simple way to block a destination without a firewall.",
   "Route selection follows a clear order. When several routes match a destination, Azure picks the longest prefix match: a /24 route wins over a /16 route, which wins over 0.0.0.0/0. Only if routes with the same prefix come from different sources does the source matter: a UDR wins over a BGP (Border Gateway Protocol) route learned from a gateway, which wins over a system route. The route table also has a Propagate gateway routes setting; turning it off stops routes learned by the VPN or ExpressRoute gateway from being added to the subnet, which is common on spokes that must send everything through a firewall. Finally, remember the appliance itself: an NVA forwards traffic that is not addressed to itself, so on its network interface you must enable IP forwarding in Azure, and routing inside its operating system. Azure Firewall handles this for you.",
   "Forced tunneling means sending all internet-bound traffic back to on-premises for inspection instead of letting it leave Azure directly. With a VPN gateway, you create a UDR for 0.0.0.0/0 with next hop Virtual network gateway and configure a default site on the route-based gateway; with ExpressRoute, on-premises advertises a default route over BGP. Either way, Azure resources now reach the internet through the corporate security stack. Use Network Watcher's effective routes or next hop tool to confirm which route a VM's traffic actually takes.",
   "Consider a worked example. Security requires that all traffic from the App spoke, both to the internet and to the Data spoke, passes through Azure Firewall at 10.0.1.4 in the hub. You create route table rt-app with a route 0.0.0.0/0 to Virtual appliance 10.0.1.4 and associate it with the App subnet, then a similar table on the Data subnet so return traffic is symmetric. Because the hub VPN gateway would otherwise inject on-premises routes that bypass the firewall, you disable gateway route propagation on both tables. Next hop from an App VM to 8.8.8.8 now shows VirtualAppliance 10.0.1.4 and the route table's ID, which is the evidence the auditor wants.",
   "Several mistakes recur: trying to associate a route table with a NIC; forgetting IP forwarding on a third-party NVA's network interface; routing only one direction through a firewall, creating asymmetric routing that breaks stateful sessions; putting a 0.0.0.0/0 UDR on the `GatewaySubnet` or `AzureBastionSubnet`, which is unsupported and breaks those services; and forgetting that a more specific system or BGP route beats a broader UDR, since prefix length is checked before route source.",
   "Exam wording maps to answers in a few patterns. 'Send all traffic through the firewall' means 0.0.0.0/0 next hop Virtual appliance. 'Inspect internet traffic on-premises' means forced tunneling. 'Block traffic to a range' means next hop None. 'Which route is used?' means longest prefix first, then UDR over BGP over system. 'Traffic reaches the NVA but goes no further' means IP forwarding is off on the NVA's NIC."
  ],
  "analogy": "A route table is like a set of detour signs posted at the exit of one neighborhood (the subnet). Drivers leaving follow the most specific sign: 'Elm Street via the checkpoint' beats 'all destinations via the highway'. Virtual appliance is the security checkpoint, None is a road-closed barrier, and forced tunneling sends every out-of-town trip back through headquarters first. The analogy stops working for the checkpoint itself: a real guard waves cars on automatically, while an Azure NVA forwards traffic only if IP forwarding is enabled.",
  "mnemonic": "Prefix first, then source: longest prefix wins; on a tie, U-B-S, User-defined beats BGP beats System.",
  "terms": [
   [
    "System route",
    "A default route Azure creates automatically for every subnet, such as the VNet range and 0.0.0.0/0 to the internet."
   ],
   [
    "User-defined route (UDR)",
    "A custom route in a route table that overrides system routes for associated subnets."
   ],
   [
    "Route table",
    "An Azure resource holding UDRs, associated with one or more subnets (at most one table per subnet)."
   ],
   [
    "Next hop type",
    "Where matching traffic is sent: Virtual appliance, Virtual network gateway, Virtual network, Internet or None."
   ],
   [
    "Longest prefix match",
    "The rule that the most specific matching route, such as a /24 over a /16, is chosen."
   ],
   [
    "IP forwarding",
    "A NIC setting that lets a VM receive and forward traffic not addressed to itself, required for NVAs."
   ],
   [
    "Forced tunneling",
    "Redirecting all internet-bound traffic from Azure to on-premises for inspection."
   ],
   [
    "Propagate gateway routes",
    "A route table setting that controls whether routes learned by a VPN or ExpressRoute gateway are added to the subnet."
   ]
  ],
  "example": "After adding a route table that sends 0.0.0.0/0 to a third-party firewall VM, a team finds that their VMs can no longer reach anything outside the subnet. Next hop confirms traffic goes to the firewall's IP, but the firewall never forwards it. The network interface of the firewall VM has IP forwarding disabled. Enabling it on the NIC, and in the firewall's operating system, restores connectivity with inspection in place.",
  "mistakes": [
   [
    "Associate the route table with the VM's network interface.",
    "Route tables are associated with subnets only, at most one per subnet. Every resource in the subnet then uses it."
   ],
   [
    "A UDR always beats a system route.",
    "Longest prefix match is checked first. A system route for 10.1.0.0/16 beats a UDR for 10.0.0.0/8 for traffic to 10.1.2.3; source priority only breaks ties between equal prefixes."
   ],
   [
    "Route traffic to the firewall in one direction only; return traffic will find its way.",
    "One-way routing creates asymmetric paths, and stateful firewalls drop the return packets. Route both directions through the same appliance."
   ],
   [
    "Add a 0.0.0.0/0 route to the firewall on GatewaySubnet to inspect everything.",
    "A default route on GatewaySubnet (or AzureBastionSubnet) is unsupported and breaks the service. Apply UDRs on workload subnets instead."
   ]
  ],
  "tryit": [
   [
    "A spoke subnet's route table sends 0.0.0.0/0 to Azure Firewall. Users report that traffic to the on-premises range 192.168.0.0/16 bypasses the firewall and goes straight to the VPN gateway. Effective routes show a gateway-learned route for 192.168.0.0/16. Why, and how do you fix it?",
    "The BGP route for 192.168.0.0/16 is more specific than 0.0.0.0/0, so it wins. Disable Propagate gateway routes on the route table (and, if needed, add a 192.168.0.0/16 UDR to the firewall) so on-premises traffic also goes through the firewall."
   ],
   [
    "You need a quick way to stop a subnet from sending any traffic to a partner range 203.0.113.0/24 while you investigate an issue, without deploying a firewall. What route do you add?",
    "A UDR for 203.0.113.0/24 with next hop type None in the subnet's route table. Traffic to that range is dropped."
   ]
  ],
  "tip": "Route tables are associated with subnets, not NICs. The longest prefix wins; on a tie, UDR beats BGP beats system routes. Virtual appliance needs a next hop IP address and IP forwarding on the NVA's NIC, and None drops traffic.",
  "check": [
   [
    "Which next hop type sends traffic to a firewall VM, and what extra value is required?",
    "Virtual appliance, with the firewall's private IP address as the next hop IP address."
   ],
   [
    "A subnet has a UDR for 10.0.0.0/8 and a system route for 10.1.0.0/16. Which applies to 10.1.2.3?",
    "The system route for 10.1.0.0/16, because the longest prefix match is chosen before route source is considered."
   ],
   [
    "How do you force all internet-bound traffic from Azure through on-premises security devices?",
    "Forced tunneling: a 0.0.0.0/0 route to the virtual network gateway with a default site, or a default route advertised over BGP for ExpressRoute."
   ],
   [
    "What does next hop type None do?",
    "It drops traffic to the matching destination prefix."
   ]
  ]
 },
 {
  "t": "Network security groups and application security groups: rule priority, default rules, subnet vs NIC association, effective security rules",
  "hook": "Friday, 4:45 p.m., at Lakeshore Logistics. Theo, a developer, messages you: the order app tier suddenly cannot connect to the database. Nobody touched the database subnet's rules, he insists. You open the portal and find a brand-new network security group attached directly to one database VM's network interface, created that afternoon 'just to be safe' with a single rule copied from the subnet: deny everything from the virtual network. Two weeks earlier, a colleague added an Allow rule for RDP that never seemed to work. Firewall rules in Azure look simple: allow or deny, a port, a source. Yet the order they are read in, and where they are attached, decide everything. What is really blocking the traffic?",
  "simple": "A network security group, or NSG, is a list of rules that says which network traffic may enter or leave a group of machines, like a guest list at a door. Each rule has a number, and Azure reads the list from the smallest number up, stopping at the first rule that fits. So rule 100 beats rule 200. Every list ends with built-in rules that, among other things, turn away anyone from the internet unless an earlier rule lets them in. You can put a list on a whole subnet, on a single machine's network card, or both; with both, traffic must pass both doors. Application security groups let you write rules using names like 'web servers' instead of addresses.",
  "body": [
   "A network security group (NSG) filters traffic to and from Azure resources in a virtual network with a list of allow and deny rules. Each rule matches on source, source port, destination, destination port and protocol (TCP, UDP, ICMP or any) and has a direction (inbound or outbound), an action and a priority. NSGs are stateful: if an inbound connection is allowed, the return traffic is allowed automatically without an outbound rule. NSGs are the basic layer 3 and layer 4 firewall of every Azure network and appear in almost every networking question on the exam.",
   "Priority decides which rule wins. Priority is a number from 100 to 4096. Rules are processed in order from the lowest number to the highest, and processing stops at the first rule that matches. So a Deny at priority 100 beats an Allow at 200 for the same traffic, and an Allow at 100 beats a Deny at 200. The number is not a measure of importance in the everyday sense; think of it as a position in a queue. Leave gaps between priorities, such as 100, 200, 300, so you can insert rules later without renumbering. A rule is created like this: `az network nsg rule create --resource-group rg-web --nsg-name nsg-web --name allow-https --priority 100 --direction Inbound --access Allow --protocol Tcp --source-address-prefixes Internet --destination-port-ranges 443`.",
   "Every NSG also includes default rules with priorities 65000 and above, which you cannot delete but can override with lower-numbered rules. Inbound: AllowVnetInBound (65000) allows traffic from within the VNet and connected networks, AllowAzureLoadBalancerInBound (65001) allows Azure load balancer health probes, and DenyAllInBound (65500) blocks everything else, including the internet. Outbound: AllowVnetOutBound (65000), AllowInternetOutBound (65001) and DenyAllOutBound (65500). This means a new, empty NSG already allows internal traffic and outbound internet, but blocks every inbound connection from the internet. Source and destination can use service tags such as `VirtualNetwork`, `Internet`, `AzureLoadBalancer` or `Storage` instead of IP ranges, and Azure keeps their address lists up to date for you.",
   "Where you attach an NSG matters as much as its rules. You can associate an NSG with a subnet, with a network interface (NIC), or with both, and one NSG can be reused on many subnets and NICs. When both exist, traffic must be allowed by both. For inbound traffic the subnet NSG is evaluated first, then the NIC NSG. For outbound traffic the NIC NSG is evaluated first, then the subnet NSG. If either denies, the traffic is dropped. Many teams apply NSGs to subnets only, for simplicity, and use NIC-level NSGs only for exceptions, because two layers of rules double the places a block can hide.",
   "When traffic is blocked unexpectedly, look at effective security rules. On the VM's NIC, open Effective security rules (or use Network Watcher) to see the combined rules from both the subnet and NIC NSGs, including default rules and expanded service tags. Network Watcher's IP flow verify goes one step further and tells you exactly which rule allows or denies a specific packet, by name, which turns a guessing game into a one-minute check.",
   "Application security groups (ASGs) let you group NICs by role and use the group name in rules instead of IP addresses. You create ASGs such as `asg-web` and `asg-db`, assign each VM's NIC to the right ASG, then write a rule like 'allow TCP 1433 from asg-web to asg-db'. When you add a new web server, you only add its NIC to `asg-web`; no rule changes are needed, and when a server is removed it loses access automatically. All NICs in an ASG must be in the same VNet, and a rule's source and destination ASGs must be in the same VNet too.",
   "Consider a worked example. A three-tier app has web, app and database subnets. The web subnet NSG has priority 100 allowing TCP 443 from `Internet`. The database subnet NSG has priority 100 allowing TCP 1433 from `asg-app` to `asg-db`, and priority 4000 denying all traffic from `VirtualNetwork`, overriding AllowVnetInBound so web servers cannot reach the database directly. A developer then adds a NIC-level NSG on one database VM and copies in only the priority 4000 deny rule, forgetting the ASG allow rule. Connections from the app tier to that VM fail: inbound traffic passes the subnet NSG, where the allow at 100 matches, but then reaches the NIC NSG, where the first matching rule is the deny at 4000. Note that an empty NIC NSG would not have caused this, because its default AllowVnetInBound rule permits traffic from inside the VNet; the copied deny rule is what overrides it. Effective security rules shows both NSGs side by side and reveals exactly where the packet stops.",
   "Common mistakes include assuming a higher priority number means more important; adding an Allow at 300 below a Deny at 200 and wondering why nothing changes; forgetting that the internet is blocked inbound by DenyAllInBound; blocking the `AzureLoadBalancer` tag so health probes fail; and forgetting that both subnet and NIC NSGs must allow traffic.",
   "Exam clue words map to answers. 'Which rule applies?' means find the lowest matching priority number. 'Inbound order' means subnet then NIC; 'outbound order' means NIC then subnet. 'Group servers by role without IP addresses' means ASGs. 'See all rules applied to a VM' means effective security rules. 'Which rule blocks this packet?' means IP flow verify."
  ],
  "analogy": "An NSG is like a numbered checklist a security guard reads top to bottom, acting on the first line that matches the visitor. A building with a guard at the front gate (subnet NSG) and another at an office door (NIC NSG) means visitors must pass both; arriving, they meet the gate guard first, and leaving, the office guard first. ASGs are like badge colors: the rule says 'blue badges may enter the vault', so new staff just get a blue badge. The analogy stops working with replies: NSGs are stateful, so answers to an allowed request walk out without a second check.",
  "terms": [
   [
    "Network security group (NSG)",
    "A stateful set of allow and deny rules that filters traffic for subnets and network interfaces."
   ],
   [
    "Priority",
    "A number from 100 to 4096; lower numbers are processed first and the first match wins."
   ],
   [
    "Default rules",
    "Built-in NSG rules at 65000 and above, such as AllowVnetInBound and DenyAllInBound, that cannot be deleted."
   ],
   [
    "Service tag",
    "A named group of IP prefixes for an Azure service or scope, such as Internet or AzureLoadBalancer, maintained by Microsoft."
   ],
   [
    "Application security group (ASG)",
    "A logical grouping of NICs by role that can be used as a source or destination in NSG rules."
   ],
   [
    "Effective security rules",
    "The combined view of all NSG rules from subnet and NIC that actually apply to a network interface."
   ],
   [
    "Stateful filtering",
    "Automatically allowing return traffic for a connection that a rule already allowed."
   ]
  ],
  "example": "A company adds new web servers every month and used to update NSG rules with each server's IP address. The administrator creates an application security group named asg-web, rewrites the database NSG rule to allow TCP 1433 from asg-web only, and adds every web server's NIC to the group during deployment. New servers get database access automatically, and removed servers lose it as soon as their NIC leaves the group.",
  "mistakes": [
   [
    "A rule with priority 4000 is more important than one with priority 100.",
    "Lower numbers are processed first and the first match wins, so priority 100 is evaluated before 4000."
   ],
   [
    "Adding an Allow at 300 will fix traffic blocked by a Deny at 200.",
    "Processing stops at the Deny at 200. Give the Allow a lower number than the Deny, such as 150."
   ],
   [
    "If the subnet NSG allows traffic, a NIC NSG cannot block it.",
    "When both exist, both must allow. Inbound is checked subnet then NIC, outbound NIC then subnet, and a deny in either drops the traffic."
   ],
   [
    "Denying all traffic from the AzureLoadBalancer tag is a harmless hardening step.",
    "Load balancer health probes come from that tag. Blocking it makes every backend look unhealthy, so the pool stops receiving traffic."
   ]
  ],
  "tryit": [
   [
    "A VM's subnet NSG allows inbound TCP 22 from your office IP at priority 200. The VM's NIC has its own NSG with only the default rules. You still cannot SSH in from the office. What is happening, and what are two ways to fix it?",
    "Inbound traffic passes the subnet NSG but then reaches the NIC NSG, where DenyAllInBound blocks traffic from outside the VNet. Either add a matching allow rule to the NIC NSG or remove the NIC NSG and rely on the subnet NSG."
   ],
   [
    "Your team adds and removes app servers weekly, and each time someone forgets to update the database NSG with the new IP. How do you redesign the rule?",
    "Create an application security group for the app servers, add each app server's NIC to it, and write the database rule with that ASG as the source. Membership changes then need no rule edits."
   ]
  ],
  "tip": "The lowest priority number wins and processing stops at the first match. Inbound traffic is checked by the subnet NSG then the NIC NSG; outbound by the NIC then the subnet; both must allow. The default DenyAllInBound blocks internet traffic unless you add an Allow.",
  "check": [
   [
    "An NSG has Deny TCP 3389 at priority 200 and Allow TCP 3389 at priority 300. Is RDP allowed?",
    "No. Rules are processed from the lowest number, so the Deny at 200 matches first and processing stops."
   ],
   [
    "A VM has NSGs on both its subnet and its NIC. What must be true for inbound traffic to reach it?",
    "Both NSGs must allow it; the subnet NSG is evaluated first, then the NIC NSG."
   ],
   [
    "Which default rule blocks inbound traffic from the internet?",
    "DenyAllInBound at priority 65500. Only AllowVnetInBound (65000) and AllowAzureLoadBalancerInBound (65001) come before it, and neither covers internet sources."
   ],
   [
    "How can you allow SQL traffic from all web servers without listing their IP addresses?",
    "Put the web servers' NICs in an application security group and use that ASG as the rule's source."
   ]
  ]
 },
 {
  "t": "Azure Bastion: AzureBastionSubnet, SKUs, browser and native client access",
  "hook": "The quarterly security scan at Pinecrest Credit Union lands in your inbox at 8 a.m.: fourteen VMs answer on port 3389 from anywhere on the internet, and the sign-in logs show thousands of failed password attempts overnight. Ruth, the chief information security officer, wants every public management port closed by Friday. But the operations team still has to administer those servers, two contractors need access to one VM each without seeing the rest of the portal, and the senior engineer insists on copying files with her own Remote Desktop client. Closing the ports is easy. Keeping everyone productive while you do it is the real problem. Which service, which subnet and which SKU solve all of this at once?",
  "simple": "Normally, to manage a cloud server remotely, people open a door straight from the internet to that server, and attackers knock on that door all day. Azure Bastion is a guarded lobby instead. You sign in to the Azure portal, step into Bastion through a secure web connection, and Bastion walks you to the server through the private network. The server itself no longer needs any door facing the internet. Bastion needs its own small room in your network, a subnet that must be called exactly AzureBastionSubnet. It comes in tiers: the cheaper ones work in a web browser, and the higher tiers add extras like using your own remote desktop app or copying files.",
  "body": [
   "Opening RDP (Remote Desktop Protocol, port 3389) or SSH (Secure Shell, port 22) to the internet exposes virtual machines (VMs) to constant scanning and password-guessing attacks. Azure Bastion is a managed service that lets you connect to your VMs over RDP and SSH without giving them public IP addresses. You connect to Bastion over TLS (Transport Layer Security) on port 443, from the Azure portal or a native client, and Bastion opens the RDP or SSH session to the VM's private IP inside the virtual network (VNet). The VMs need no public IP and no agent, which shrinks the attack surface dramatically. Bastion is a platform service, so there is no jump-box operating system for you to patch.",
   "A dedicated Bastion deployment needs specific networking. It lives in its own subnet, which must be named exactly `AzureBastionSubnet` and be at least a /26. The Bastion host gets a Standard public IP address. You deploy it in a VNet, often a hub, and from the Basic SKU upward it can reach VMs in that VNet and in peered VNets, so one Bastion can serve a whole hub-and-spoke network. Network security groups (NSGs) on the VMs' subnets must allow RDP or SSH from the Bastion subnet's address range. If you place an NSG on AzureBastionSubnet itself, it must allow the specific inbound and outbound traffic Bastion needs, such as HTTPS 443 inbound from the internet and from the `GatewayManager` service tag; a too-strict NSG there is a common reason a new Bastion fails to deploy or connect.",
   "Bastion comes in several SKUs, and features grow with each tier. Developer is a free, lightweight option for development and test that uses shared infrastructure, supports one connection at a time to VMs in the same VNet and does not need AzureBastionSubnet; it is available only in some regions. Basic is a dedicated deployment with portal-based RDP and SSH and a fixed capacity. Standard adds host scaling (you choose the number of instances for more concurrent sessions), native client support, IP-based connection (connect to a private IP, including on-premises machines reachable from the VNet), shareable links, custom ports and file transfer through the native client. Premium adds features such as session recording and private-only deployment without a public IP. You can upgrade a SKU, for example Basic to Standard, but not downgrade, so choose deliberately.",
   "Browser access is the simplest way to connect. Open the VM in the portal, choose Connect > Bastion, enter credentials (a username and password, an SSH private key, or a key stored in Azure Key Vault), and the session opens in a browser tab. Copy and paste of text works through the Bastion clipboard. The user needs only outbound HTTPS from their own computer and Reader-level access to the VM, its NIC and the Bastion resource, which makes it practical for locked-down corporate laptops.",
   "Native client access, available on Standard and Premium, lets you use your local Remote Desktop client or SSH client, which supports features like file transfer and multiple monitors. Native client support must be enabled in the Bastion configuration first; then you sign in with the Azure command-line interface (CLI) and open the session:",
   "```bash\naz network bastion rdp --name bas-hub --resource-group rg-hub \\\n  --target-resource-id /subscriptions/<sub>/resourceGroups/rg-app/providers/Microsoft.Compute/virtualMachines/vm-app1\naz network bastion ssh --name bas-hub --resource-group rg-hub \\\n  --target-resource-id <vm-id> --auth-type AAD\n```",
   "Consider a worked example. A company has a hub VNet and three peered spokes containing about forty VMs, several of which currently have public IPs with RDP open to the internet. The administrator creates `AzureBastionSubnet` as 10.0.3.0/26 in the hub and deploys Bastion Standard with two instances. She enables native client support so engineers can copy files with their own RDP client, updates the spoke NSGs to allow TCP 3389 and 22 only from 10.0.3.0/26, and then removes every VM public IP. Engineers now connect through the portal or with `az network bastion rdp`, contractors get shareable links to the two VMs they maintain, and security scans no longer show exposed management ports.",
   "Watch for these common mistakes: naming the subnet `BastionSubnet` or making it smaller than /26; assuming VMs still need a public IP; blocking RDP or SSH from the Bastion subnet range in the target NSG; expecting native client, file transfer or shareable links on the Basic SKU; choosing the Developer SKU for production or for peered VNets; and assuming Bastion is a jump-box VM you have to patch, when it is a fully managed platform service.",
   "Exam questions usually test names, sizes and SKU features. 'Connect to VMs without public IP addresses over the internet using only port 443' means Azure Bastion. 'Which subnet name and minimum size?' means `AzureBastionSubnet`, /26 or larger. 'Use the local RDP client', 'upload files', 'shareable link', 'more concurrent sessions' or 'connect by IP address to an on-premises server' all mean Standard or higher. 'Record sessions' means Premium. 'Cheapest option for a single dev VM' points to the Developer SKU."
  ],
  "analogy": "Bastion is like a staffed reception desk in a secure office building. Visitors never get a key to a private office's outside window (a public IP on the VM); they come through the one front entrance (port 443), show credentials, and are escorted down internal corridors (the VNet and peered VNets) to the office. A higher-tier desk offers extras: visitor passes you can hand to contractors (shareable links) and a cart for carrying boxes (file transfer). The analogy stops at maintenance: you never staff or train this desk, because Microsoft runs it.",
  "terms": [
   [
    "Azure Bastion",
    "A managed platform service that provides RDP and SSH to VMs over TLS without exposing public IPs on the VMs."
   ],
   [
    "AzureBastionSubnet",
    "The exact subnet name, at least /26, required for a dedicated Bastion deployment."
   ],
   [
    "Native client support",
    "A Standard and Premium feature that lets you connect with your local RDP or SSH client via the Azure CLI."
   ],
   [
    "Host scaling",
    "Adding Bastion instances (Standard and above) to support more concurrent sessions."
   ],
   [
    "IP-based connection",
    "A Standard feature for connecting to a private IP address, including machines on-premises reachable from the VNet."
   ],
   [
    "Shareable link",
    "A Standard feature that lets a user connect to a specific VM through a link without portal access."
   ],
   [
    "Developer SKU",
    "A free, shared-infrastructure Bastion option for dev and test with one connection at a time and no dedicated subnet."
   ]
  ],
  "example": "An auditor flags that twelve production VMs accept RDP from the internet. The operations team deploys Azure Bastion Standard in the hub VNet, confirms engineers can connect to every peered spoke through the portal, and then deletes the VMs' public IP addresses. Contractors who should not see the portal receive shareable links to the two VMs they maintain, and the NSGs now allow management ports only from the Bastion subnet.",
  "mistakes": [
   [
    "Name the subnet BastionSubnet and make it a /27 to save addresses.",
    "A dedicated Bastion needs a subnet named exactly AzureBastionSubnet, sized /26 or larger."
   ],
   [
    "VMs still need public IPs so Bastion can reach them.",
    "Bastion connects to the VMs' private IPs inside the VNet. Removing VM public IPs is the whole point."
   ],
   [
    "The Basic SKU supports the native RDP client and file transfer.",
    "Native client support, file transfer, shareable links, host scaling and IP-based connection need Standard or higher. Session recording needs Premium."
   ],
   [
    "The Developer SKU is fine for a production hub that serves peered spokes.",
    "Developer is for dev and test, allows one connection at a time and reaches only VMs in its own VNet. Production hubs need Basic or higher."
   ]
  ],
  "tryit": [
   [
    "Your company has a Bastion Basic deployment in the hub. Engineers now want to transfer files with their own Remote Desktop client and reach an on-premises server by its private IP through the VPN. What do you change?",
    "Upgrade Bastion to Standard (an upgrade is allowed; a downgrade is not), enable native client support and IP-based connection. Engineers then use az network bastion rdp, and file transfer works through the native client."
   ],
   [
    "A developer has a single test VM and wants browser-based SSH at the lowest possible cost, with no peered networks involved. Which SKU fits, and does she need AzureBastionSubnet?",
    "The Developer SKU, if available in her region. It is free, uses shared infrastructure, supports one connection at a time to VMs in the same VNet and does not require AzureBastionSubnet."
   ]
  ],
  "tip": "The subnet must be named AzureBastionSubnet and be /26 or larger. Native client, file transfer, host scaling, shareable links and IP-based connection need Standard or higher, and the target VMs need no public IP.",
  "check": [
   [
    "What are the name and minimum size of the subnet for a dedicated Bastion host?",
    "AzureBastionSubnet, with a prefix of /26 or larger."
   ],
   [
    "Engineers want to connect through Bastion with their own Remote Desktop client. Which SKU and setting are needed?",
    "Standard or Premium with native client support enabled, then connect using az network bastion rdp."
   ],
   [
    "Can one Bastion in a hub VNet reach VMs in peered spoke VNets?",
    "Yes, Basic and higher SKUs can reach VMs in peered VNets; the Developer SKU cannot."
   ],
   [
    "Which port do users need open outbound to use Bastion from a browser?",
    "TCP 443, because the session runs over TLS to the Bastion host rather than directly over 3389 or 22."
   ]
  ]
 },
 {
  "t": "Service endpoints vs private endpoints, and private DNS zones for private link",
  "hook": "At Silverline Accounting, the compliance team has one rule for the new statements storage account: no public access, ever. You flip public network access to Disabled on Tuesday evening. By Wednesday morning, Marco in the head office cannot open a single file, and the reporting VM in Azure is throwing 403 errors too. Last month a colleague set up 'private access' for this account using a subnet setting, and you also created something called a private endpoint yesterday. Both sound like they should work. On the VM, a quick name lookup still returns a public IP address. What is the difference between these two features, and why does the answer start with DNS?",
  "simple": "Azure services like storage normally have a public front door on the internet. There are two ways to reach them more privately. A service endpoint is like a staff-only lane on the public road: your Azure subnet's traffic takes a private lane to the service's public door, and the service can say 'only let in cars from this lane'. A private endpoint is different: it builds a private door for one specific service right inside your own network, with its own private address, so even your office can reach it over the VPN. The catch is that your computers must look up the service's name and get the new private address, which is the job of a private DNS zone, a kind of private phone book.",
  "body": [
   "Many Azure platform services, such as Azure Storage, Azure SQL Database and Azure Key Vault, are reached by default through public endpoints on the internet. Two features let resources in a virtual network (VNet) reach them more securely: service endpoints and private endpoints. They sound alike but work very differently, and choosing between them is a frequent exam scenario, usually decided by whether on-premises access, per-resource scope or fully disabled public access is required.",
   "A service endpoint is a setting on a subnet, such as `Microsoft.Storage` or `Microsoft.Sql`. Once enabled, traffic from that subnet to the service travels over the Azure backbone and carries the subnet's identity. The service's firewall can then allow that specific subnet (a virtual network rule) and deny everything else. Crucially, the service still uses its public IP address, and the VM keeps connecting to the public name. Service endpoints are free, quick to set up, only work for traffic originating in Azure subnets (not from on-premises over VPN), and allow access to every instance of that service type, unless you add a service endpoint policy (available for Storage) that limits which accounts can be reached. In the storage account's Networking blade you would see the VNet and subnet listed under virtual networks, with public access set to 'Enabled from selected virtual networks and IP addresses'.",
   "A private endpoint is a network interface placed in your subnet with a private IP address, connected through Azure Private Link to one specific resource, such as the blob service of one storage account or one SQL server. Clients connect to that private IP. Because it is a real address in your VNet, it is reachable from peered VNets and from on-premises over VPN or ExpressRoute, and you can then disable public network access on the resource entirely. Because it maps to one resource instance, it also helps prevent data exfiltration to other accounts, since the endpoint cannot be used to reach an attacker's storage account. Private endpoints are billed per hour and per gigabyte processed.",
   "DNS is what makes a private endpoint actually work. Private endpoints only work if clients resolve the service's normal name to the private IP. When you create a private endpoint, the public DNS (Domain Name System) name, such as `contoso.blob.core.windows.net`, gets a CNAME to a `privatelink` name, such as `contoso.privatelink.blob.core.windows.net`. You create an Azure private DNS zone with that privatelink name, link it to your VNets, and add an A record for the private IP. The portal does this for you when you choose Integrate with private DNS zone, attaching a DNS zone group to the endpoint so records are maintained automatically. Examples: `privatelink.blob.core.windows.net` for blobs, `privatelink.file.core.windows.net` for files, `privatelink.database.windows.net` for Azure SQL and `privatelink.vaultcore.azure.net` for Key Vault. Applications keep using the normal name, and Transport Layer Security (TLS) certificates still match, which is why you should never point apps at the raw private IP.",
   "Larger networks need a DNS design, not just a zone. In a hub-and-spoke network, keep the privatelink zones in one place and link them to every VNet that needs resolution. On-premises DNS servers must forward queries for those zones into Azure, usually to an Azure DNS Private Resolver inbound endpoint, because on-premises machines cannot query Azure DNS at 168.63.129.16 directly. You can test resolution from a VM with `nslookup contoso.blob.core.windows.net`; the answer should be a private address such as 10.20.1.5, and the alias should include `privatelink`. If it returns a public address, the private endpoint will not be used.",
   "Consider a worked example. A finance team stores statements in a storage account and must access it from Azure VMs and from the head office over a site-to-site VPN, with no public access at all. Service endpoints cannot help the office, so the administrator creates a private endpoint for the blob sub-resource in the hub VNet, integrates it with the `privatelink.blob.core.windows.net` zone linked to hub and spokes, configures the office DNS servers to conditionally forward `blob.core.windows.net` to the Private Resolver inbound endpoint, and sets public network access to Disabled. Both VMs and office PCs now resolve the account to 10.10.4.6, and the compliance rule is met.",
   "Several mistakes recur: assuming a service endpoint gives the service a private IP; expecting service endpoints to work from on-premises; creating a private endpoint without DNS integration, so `nslookup` still returns a public IP and the connection is refused once public access is disabled; creating a private zone but forgetting to link it to the client's VNet; and pointing on-premises servers at 168.63.129.16. When a private endpoint connection fails, check DNS first.",
   "Exam wording has clear clues. 'Free', 'simplest', 'restrict a storage account to a subnet' means a service endpoint with a virtual network rule. 'Private IP address', 'accessible from on-premises', 'disable public network access' or 'only this one storage account' means a private endpoint. 'Name resolves to a public IP' means a missing private DNS zone or VNet link. 'On-premises clients cannot resolve the private endpoint' means a DNS forwarder or Private Resolver."
  ],
  "analogy": "A service endpoint is like a staff-only lane on a public highway that leads to a company's public front gate; the gate guard recognizes cars from your lane and waves them in, but the gate is still on the public road and your branch offices cannot use that lane. A private endpoint is like the company opening a private side door inside your own building, reachable from any connected building. The private DNS zone is the updated building directory: if it still lists the old front gate, people walk to the wrong door.",
  "terms": [
   [
    "Service endpoint",
    "A subnet setting that routes traffic to an Azure platform service over the Azure backbone and identifies the subnet to the service's firewall."
   ],
   [
    "Private endpoint",
    "A network interface with a private IP in your subnet that connects to one specific resource through Private Link."
   ],
   [
    "Azure Private Link",
    "The platform technology that exposes Azure services on private IP addresses inside your VNet."
   ],
   [
    "Private DNS zone",
    "An Azure DNS zone resolvable only from linked VNets, used for privatelink names."
   ],
   [
    "Virtual network link",
    "The association that lets a VNet resolve records in a private DNS zone."
   ],
   [
    "Service endpoint policy",
    "A policy that limits service endpoint traffic to specific Azure Storage accounts."
   ],
   [
    "Azure DNS Private Resolver",
    "A managed service with inbound and outbound endpoints that lets on-premises DNS resolve Azure private zones and vice versa."
   ]
  ],
  "example": "After a storage account's public access is disabled, an application VM starts failing with 403 errors. An engineer runs nslookup on the VM and sees the account resolving to a public address. The private endpoint exists, but its privatelink.blob.core.windows.net zone is linked only to the hub VNet, not the spoke where the VM lives. Adding a virtual network link from the zone to the spoke makes the name resolve to the private IP, and the application recovers.",
  "mistakes": [
   [
    "A service endpoint gives the storage account a private IP in my subnet.",
    "The service keeps its public IP. A service endpoint only routes subnet traffic over the backbone and lets the service firewall identify the subnet. A private IP requires a private endpoint."
   ],
   [
    "Service endpoints let on-premises users reach Storage privately over the VPN.",
    "Service endpoints only apply to traffic that starts in Azure subnets. On-premises access over VPN or ExpressRoute needs a private endpoint."
   ],
   [
    "Once the private endpoint is created, everything automatically uses it.",
    "Clients must resolve the service name to the private IP. Without an integrated, linked privatelink zone (and forwarding for on-premises), names still resolve publicly."
   ],
   [
    "Point on-premises DNS servers at 168.63.129.16 to resolve the private zone.",
    "That address is only reachable from inside Azure. Forward on-premises queries to an Azure DNS Private Resolver inbound endpoint or a DNS forwarder VM."
   ]
  ],
  "tryit": [
   [
    "A development subnet needs to reach one storage account. Requirements: no extra cost, set up in minutes, only Azure VMs need access, and public access may stay enabled for other selected networks. Service endpoint or private endpoint?",
    "A service endpoint for Microsoft.Storage on the subnet, plus a virtual network rule on the storage account. It is free and simple, and on-premises access and fully disabled public access are not required."
   ],
   [
    "An auditor requires that a Key Vault be reachable only from a private address, including from the branch office over ExpressRoute, and that data cannot be sent to any other vault through the same path. What do you deploy, and what DNS pieces are needed?",
    "A private endpoint for the Key Vault with public network access disabled. Integrate it with the privatelink.vaultcore.azure.net private DNS zone linked to the client VNets, and configure branch DNS to forward to a Private Resolver inbound endpoint."
   ]
  ],
  "tip": "On-premises access, disabling public access or scoping to one resource instance means a private endpoint. If a private endpoint connection fails, check DNS first: the name must resolve to the private IP through a linked privatelink zone.",
  "check": [
   [
    "Which option lets on-premises clients reach an Azure SQL server over a VPN using a private IP address?",
    "A private endpoint, because service endpoints only work for traffic from Azure subnets and keep the public IP."
   ],
   [
    "After creating a private endpoint, nslookup on a VM returns a public IP. What is the likely cause?",
    "The privatelink private DNS zone is missing, lacks the A record, or is not linked to the VM's VNet."
   ],
   [
    "What does enabling Microsoft.Storage as a service endpoint on a subnet actually change?",
    "Traffic from the subnet reaches Storage over the Azure backbone with the subnet's identity, so the storage firewall can allow that subnet; the service keeps its public IP."
   ],
   [
    "Which private DNS zone name is used for a blob storage private endpoint?",
    "privatelink.blob.core.windows.net."
   ]
  ]
 },
 {
  "t": "Azure DNS: public zones, delegation, record sets, alias records; private DNS zones with auto-registration",
  "hook": "Willow Creek Outfitters is moving its website to Azure this weekend. On Thursday you created the `willowcreek.com` zone in Azure DNS and added every record from the old provider, yet on Friday afternoon nothing resolves from the internet. The marketing lead, Grace, also wants the bare domain, without www, to point at the new Front Door profile, and the old provider's support page says that is impossible with a CNAME. Meanwhile the server team asks why they keep hand-editing an internal hosts spreadsheet every time a VM is rebuilt. Three DNS problems, one service. What is the zone missing, and how do you name the apex and the VMs without constant manual edits?",
  "simple": "DNS is the internet's phone book: it turns names like shop.example.com into the numeric addresses computers use. Azure DNS can host your phone book page, called a zone, but it does not sell you the name; you buy that from a registrar. After creating the zone, you must tell the registrar 'my phone book now lives at Azure', or nobody will look there. Inside the zone, entries with the same name and type form a record set. An alias record is a smart entry that points at an Azure resource and updates itself if that resource's address changes. Private zones are phone books only your Azure networks can read, and they can add entries for new VMs automatically.",
  "body": [
   "Azure DNS hosts DNS (Domain Name System) zones on Microsoft's global network of name servers, so you manage your records with the same tools, role-based access control (RBAC), locks and templates as the rest of Azure. It does not register domain names for you; you buy a domain from a registrar and then host its zone in Azure DNS. There are two kinds of zones: public zones answer queries from the internet, and private zones answer only for virtual networks (VNets) you link to them. Keeping the two straight is the first step in most exam questions on this topic.",
   "Delegation is what turns a public zone on. Creating a public zone such as `contoso.com` gives it an SOA (start of authority) record and an NS (name server) record set listing four Azure name servers assigned to that zone, with names under `azure-dns.com`, `azure-dns.net`, `azure-dns.org` and `azure-dns.info`. The zone does nothing until you delegate the domain: at your registrar, replace the domain's name server entries with those four Azure name servers. After the change propagates, internet resolvers ask Azure DNS for your records. You can check with `nslookup -type=NS contoso.com`. Delegating a subdomain works the same way inside DNS: to host `dev.contoso.com` as its own zone, perhaps managed by another team with its own RBAC, create the child zone, then in the parent `contoso.com` zone add an NS record set named `dev` containing the child zone's name servers.",
   "Records are organized in record sets: all records with the same name and type form one set, with a single TTL (time to live) that says how long resolvers may cache the answer. For example, the A record set `www` can contain several IP addresses. Supported types include A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT and CAA. Two rules trip people up. A CNAME record set can contain only one record, and you cannot create a CNAME at the zone apex (`contoso.com` itself), which is a DNS standard rule rather than an Azure limitation. Before a planned change, lowering the TTL a day ahead means the old answer expires quickly when you switch.",
   "Alias records solve two problems at once. An alias record set of type A, AAAA or CNAME points to an Azure resource instead of a fixed value: a public IP address, a Traffic Manager profile, an Azure Front Door or CDN (content delivery network) endpoint, or another record set in the same zone. When the resource's IP changes, the alias updates automatically, so you never have dangling records pointing to an old address that someone else might later receive. And because an A alias can sit at the apex, you can point `contoso.com` at a Traffic Manager profile or Front Door, which a CNAME cannot do. The basic commands look like this:",
   "```bash\naz network dns zone create --resource-group rg-dns --name contoso.com\naz network dns record-set a add-record --resource-group rg-dns \\\n  --zone-name contoso.com --record-set-name www --ipv4-address 20.50.10.4\naz network dns zone show --resource-group rg-dns --name contoso.com --query nameServers\n```",
   "Private zones handle names inside Azure. A private DNS zone, such as `corp.contoso.com`, works only inside Azure. You link it to VNets with virtual network links; VMs in linked VNets can resolve its records through Azure-provided DNS. When you create a link you can enable auto-registration, and Azure then automatically creates and removes A records for the VMs in that VNet as they are created, change IP or are deleted. A VNet can be linked to many private zones for resolution, but only one of them can have auto-registration enabled for that VNet. Private zones are also what makes private endpoints resolve to their private IPs, using names such as `privatelink.blob.core.windows.net`.",
   "Consider a worked example. Contoso buys `contoso.com` from a registrar and wants Azure to host it. The administrator creates the public zone, reads the four assigned name servers, and updates the registrar. She adds an A alias record at the apex pointing to the web load balancer's public IP, so the record follows the IP automatically, and a CNAME `www` pointing to `contoso.com`. Internally, she creates the private zone `corp.contoso.com`, links the hub VNet with auto-registration enabled, and links the spokes for resolution only. New VMs in the hub appear as `vm-name.corp.contoso.com` without anyone editing records, and spoke VMs can resolve them.",
   "Common mistakes include creating a zone but never updating the registrar, so nothing resolves; trying to add a CNAME at the apex; adding a second value to a CNAME set; setting a very long TTL just before a planned change, so old answers stay cached; expecting auto-registration on more than one private zone per VNet; and forgetting to link a private zone to the VNet that needs it.",
   "In exam questions, 'records do not resolve from the internet after creating the zone' means update the NS records at the registrar; 'point the root domain at Front Door or Traffic Manager' means an alias record; 'avoid dangling DNS when an IP changes' means alias; 'VMs automatically get DNS names' means a private zone with auto-registration; 'another team manages a subdomain' means child zone plus NS delegation."
  ],
  "analogy": "A public zone is like printing a new page for the town phone book, but it only matters once the town directory office (the registrar) is told which printer holds your page; that is delegation. An alias record is like listing 'call the front desk' instead of a specific extension, so it keeps working when extensions change. A private zone is an internal staff directory that updates itself when new staff join. The analogy stops working at the apex rule: in DNS, the main listing for the domain itself cannot be a simple redirect (CNAME), only an alias.",
  "terms": [
   [
    "DNS zone",
    "A container for the DNS records of one domain, hosted in Azure DNS as public or private."
   ],
   [
    "Delegation",
    "Pointing a domain or subdomain to specific name servers with NS records at the registrar or parent zone."
   ],
   [
    "Record set",
    "All DNS records with the same name and type in a zone, sharing one TTL."
   ],
   [
    "TTL",
    "Time to live, the number of seconds resolvers may cache a DNS answer."
   ],
   [
    "Alias record",
    "An A, AAAA or CNAME record set that references an Azure resource and updates automatically when its address changes."
   ],
   [
    "Private DNS zone",
    "A zone that resolves only for VNets linked to it through virtual network links."
   ],
   [
    "Auto-registration",
    "A virtual network link option that automatically maintains A records for VMs in that VNet; one zone per VNet."
   ],
   [
    "Zone apex",
    "The root of a zone, such as contoso.com itself, where a CNAME record is not allowed."
   ]
  ],
  "example": "A company's marketing site moves behind Azure Front Door, and the team needs the bare domain fabrikam.com, not just www, to reach it. A CNAME cannot be placed at the zone apex, so the administrator creates an A alias record at the apex in the Azure DNS public zone that targets the Front Door endpoint. When Front Door's addresses change, the record follows automatically and there is no dangling entry to clean up.",
  "mistakes": [
   [
    "Creating the zone in Azure DNS is enough for internet users to find the records.",
    "The registrar must be updated to use the four Azure name servers assigned to the zone. Until then, resolvers keep asking the old servers."
   ],
   [
    "Put a CNAME at contoso.com pointing to the Traffic Manager profile.",
    "CNAMEs are not allowed at the zone apex. Use an alias A record that targets the Traffic Manager profile."
   ],
   [
    "Azure DNS can buy the domain name for you.",
    "Azure DNS hosts zones; it does not register domains. You buy the domain from a registrar, then delegate it to Azure DNS."
   ],
   [
    "Enable auto-registration on every private zone linked to a VNet.",
    "Only one private zone per VNet can have auto-registration. Other zones can be linked for resolution only."
   ]
  ],
  "tryit": [
   [
    "The platform team wants to manage `api.contoso.com` themselves in their own subscription, while you keep `contoso.com`. Both zones are in Azure DNS. What do you create, and where?",
    "The platform team creates the child zone api.contoso.com. In the parent contoso.com zone, you add an NS record set named api containing the child zone's four name servers. That delegates the subdomain while each team keeps its own access control."
   ],
   [
    "A web app's public IP is going to be replaced next month during a redesign. The record www currently has a fixed A record with the old IP. How do you avoid a broken or dangling record?",
    "Replace it with an alias A record that targets the public IP resource (or the new front end). The alias follows the resource, and if the resource is deleted the record does not keep pointing at an address someone else may receive."
   ]
  ],
  "tip": "A zone does nothing until the registrar's NS records point to Azure's name servers. Use an alias record for the zone apex and to track Azure resources, and remember only one private zone per VNet can have auto-registration.",
  "check": [
   [
    "You created a public zone in Azure DNS but its records do not resolve on the internet. What is missing?",
    "Delegation: the registrar's name server records must be changed to the four Azure DNS name servers assigned to the zone."
   ],
   [
    "How can you point the zone apex contoso.com at a Traffic Manager profile?",
    "Create an alias A record at the apex that targets the Traffic Manager profile, because a CNAME is not allowed at the apex."
   ],
   [
    "A VNet is linked to three private DNS zones. How many can have auto-registration enabled for it?",
    "Only one."
   ],
   [
    "How do you delegate dev.contoso.com to a separate zone?",
    "Create the dev.contoso.com zone, then add an NS record set named dev in the contoso.com zone listing the child zone's name servers."
   ]
  ]
 },
 {
  "t": "Azure Load Balancer: public vs internal, Standard SKU, backend pools, health probes, load-balancing and inbound NAT rules",
  "hook": "It is 9 p.m. at Riverbend Games, an hour before a new season launches, and Jun on the platform team pings you: the three new game-lobby VMs behind the public load balancer show healthy probes, but players get timeouts. Earlier that day someone added a 'tighten security' NSG rule that denies a service tag nobody recognized, and one VM briefly vanished from the pool. A producer also wants to know why her shopping-cart test keeps losing items between page loads, and an engineer asks how to reach one specific VM through the single public address. One load balancer, four confusing symptoms. What are the moving parts, and which one is broken?",
  "simple": "A load balancer is like a host at a busy restaurant who spreads arriving guests across several identical tables so no single table is swamped. In Azure, the 'tables' are virtual machines in a backend pool. The host regularly checks each table is ready, called a health probe, and stops seating guests at one that does not answer. A public load balancer faces the internet; an internal one only works inside your private network. A load-balancing rule says which door and port guests use and which tables serve them. An inbound NAT rule is a reservation: 'guests asking for door 50001 go straight to table 1'. Azure's Load Balancer looks only at addresses and ports, not at web page contents.",
  "body": [
   "Azure Load Balancer distributes incoming network traffic across a group of healthy virtual machines (VMs) or scale set instances. It works at layer 4 of the OSI (Open Systems Interconnection) model, the transport layer, so it balances TCP and UDP flows based on IP addresses and ports, without looking at HTTP content. For URL-based routing, TLS (Transport Layer Security) termination or a web application firewall (WAF) you would use Application Gateway, a layer 7 service, instead. Load Balancer is fast, low latency and suited to any TCP or UDP protocol, including game, name resolution and database traffic.",
   "A load balancer is public or internal according to its front-end IP configuration. A public load balancer has a public IP address as its front end and balances internet traffic to VMs, and it can also provide outbound internet connectivity for them. An internal load balancer has a private IP address from a subnet as its front end and balances traffic inside a virtual network (VNet) or from connected networks, for example between a web tier and an application tier, or from on-premises over a VPN.",
   "Use the Standard SKU. Microsoft has retired the Basic SKU, and Standard has the features the exam focuses on: it supports availability zones (zone-redundant or zonal front ends), has an SLA (service level agreement), supports larger backend pools, HTTPS health probes and HA ports, and is secure by default, meaning inbound traffic is blocked unless a network security group (NSG) on the backend VMs' subnets or NICs allows it. A Standard load balancer must use Standard public IPs, and its backend pool members must be in one VNet.",
   "Four building blocks make it work. The backend pool is the set of VM network interfaces or IP addresses that receive traffic. A health probe checks each backend on a protocol and port (TCP, HTTP or HTTPS) at an interval; an instance that fails is taken out of rotation until it passes again. HTTP probes expect a 200 response from a path such as `/health`. Probes come from the Azure platform address 168.63.129.16, which the default NSG rule AllowAzureLoadBalancerInBound permits, so do not block it. A load-balancing rule ties everything together: front-end IP and port, backend pool and port, protocol, health probe and session persistence. Creating a probe and a rule looks like this:",
   "```bash\naz network lb probe create --resource-group rg-web --lb-name lb-web \\\n  --name http-probe --protocol Http --port 80 --path /health\naz network lb rule create --resource-group rg-web --lb-name lb-web --name http \\\n  --protocol Tcp --frontend-port 80 --backend-port 80 \\\n  --frontend-ip-name fe-web --backend-pool-name bp-web --probe-name http-probe\n```",
   "Distribution and persistence explain many puzzling symptoms. By default the load balancer uses a five-tuple hash (source IP, source port, destination IP, destination port, protocol), so different connections from one client may land on different VMs. If the application keeps session state in memory, users appear to lose their data. Session persistence set to Client IP, or Client IP and protocol, keeps a client on the same VM. On an internal Standard load balancer, an HA ports rule balances all ports and protocols at once, which is handy for network virtual appliances (NVAs) such as firewalls.",
   "Not all traffic should be balanced. An inbound NAT (network address translation) rule forwards traffic arriving at a specific front-end port to a specific VM and port, rather than balancing it. For example, front-end port 50001 to VM1 port 3389 and 50002 to VM2 port 3389 lets you reach each VM individually through the load balancer's single public IP. Outbound rules control how backend VMs share the front-end IPs for outbound internet access, although a NAT gateway is now the recommended way to provide outbound connectivity.",
   "Consider a worked example. A web tier of three VMs in zones 1, 2 and 3 sits behind a public Standard load balancer with a zone-redundant front-end IP, a health probe on HTTP `/health` and a load-balancing rule for TCP 443. An application tier sits behind an internal Standard load balancer at 10.1.2.10 on port 8080. After deployment, the website does not respond, even though probes succeed. The NSG on the web subnet has no rule allowing 443 from the internet, and Standard is closed by default; probes still pass because AllowAzureLoadBalancerInBound admits them. Adding the rule fixes it. Later, a VM whose web service crashes is removed from rotation automatically because its probe fails.",
   "Common mistakes include expecting a Standard load balancer to pass traffic without an NSG allow rule; blocking the `AzureLoadBalancer` service tag so every probe fails and the pool looks empty; probing a port or path the application does not serve; mixing SKUs of public IP and load balancer; choosing Load Balancer when the scenario needs URL path routing or a WAF; and using a load-balancing rule when you need to reach one specific VM.",
   "Exam wording is predictable. 'Distribute TCP or UDP traffic' means Azure Load Balancer. 'Private front end between tiers' means internal load balancer. 'Route by URL path' or 'WAF' means Application Gateway. 'Remove unhealthy VMs automatically' means a health probe. 'Users must stay on the same VM' means session persistence (Client IP). 'Connect to each VM on a different port through one public IP' means inbound NAT rules. 'All ports for an NVA' means HA ports on an internal Standard load balancer."
  ],
  "analogy": "Azure Load Balancer is like a restaurant host who seats arriving parties at identical tables, checking every few minutes that each table's server is present (the health probe) and skipping tables whose server has gone home. Session persistence is the host remembering a regular and always seating them at the same table. An inbound NAT rule is a reserved booth: anyone who asks for booth 50001 goes straight there. The analogy stops working at the menu: the host never reads what guests order, just as Load Balancer never inspects HTTP paths, which is Application Gateway's job.",
  "terms": [
   [
    "Azure Load Balancer",
    "A layer 4 service that distributes TCP and UDP flows across healthy backend instances."
   ],
   [
    "Internal load balancer",
    "A load balancer with a private front-end IP that balances traffic inside a VNet or connected networks."
   ],
   [
    "Backend pool",
    "The set of VM NICs or IP addresses that receive traffic from a load balancer."
   ],
   [
    "Health probe",
    "A periodic TCP, HTTP or HTTPS check that removes failing backend instances from rotation."
   ],
   [
    "Load-balancing rule",
    "A mapping from a front-end IP and port to a backend pool and port, using a health probe."
   ],
   [
    "Inbound NAT rule",
    "A rule that forwards one front-end port to a specific backend VM and port."
   ],
   [
    "Session persistence",
    "A setting that keeps a client's connections on the same backend instance, based on client IP."
   ],
   [
    "HA ports",
    "A load-balancing rule on an internal Standard load balancer that covers all ports and protocols at once."
   ]
  ],
  "example": "A game studio runs UDP game servers on six VMs. A public Standard load balancer with a zone-redundant front end distributes players across the servers, and a TCP health probe on the game port removes any server whose process hangs. For maintenance, the studio adds inbound NAT rules mapping ports 50001 to 50006 to SSH on each VM, reachable only from the office IP through an NSG rule, rather than giving each VM its own public IP.",
  "mistakes": [
   [
    "A Standard load balancer passes traffic to backends as soon as the rule exists.",
    "Standard is secure by default. The backend subnet or NICs need an NSG rule allowing the inbound port, such as TCP 443."
   ],
   [
    "Denying the AzureLoadBalancer service tag tightens security without side effects.",
    "Health probes come from 168.63.129.16, covered by that tag. Blocking it makes every instance look unhealthy and the pool stops receiving traffic."
   ],
   [
    "Use Azure Load Balancer to send /images requests to one pool and /api to another.",
    "Load Balancer works at layer 4 and cannot see URL paths. Path-based routing and WAF require Application Gateway."
   ],
   [
    "Use a load-balancing rule to RDP to one particular VM.",
    "Load-balancing rules spread connections across the pool. To reach a specific VM through the front end, use an inbound NAT rule (or, better, Azure Bastion)."
   ]
  ],
  "tryit": [
   [
    "A web app behind a public Standard load balancer stores shopping carts in each VM's memory. Users complain that items disappear when they browse to another page. Health probes are green and the NSG is correct. What do you change on the load balancer, and what is the longer-term fix?",
    "Set session persistence on the load-balancing rule to Client IP (or Client IP and protocol) so a client stays on the same VM. Longer term, store session state outside the VMs, such as in a shared cache or database, so any VM can serve any request."
   ],
   [
    "Three firewall VMs must receive all traffic, on every port and protocol, from spoke subnets inside Azure. Which load balancer type and rule do you use?",
    "An internal Standard load balancer with an HA ports load-balancing rule, which balances all ports and protocols, with the firewall VMs in the backend pool."
   ]
  ],
  "tip": "Standard load balancers block inbound traffic until an NSG allows it. Load-balancing rules spread traffic; inbound NAT rules map a port to one VM. Layer 7 needs such as URL paths or a WAF point to Application Gateway, not Load Balancer.",
  "check": [
   [
    "Web servers behind a new public Standard load balancer receive no traffic, but the health probes succeed. What should you check?",
    "The NSG on the backend subnet or NICs, because Standard is secure by default and needs an explicit rule allowing the inbound port."
   ],
   [
    "What is the difference between a load-balancing rule and an inbound NAT rule?",
    "A load-balancing rule spreads traffic across the backend pool; an inbound NAT rule forwards one front-end port to one specific VM."
   ],
   [
    "A shopping cart loses state because users hit different VMs. What load balancer setting helps?",
    "Session persistence set to Client IP (or Client IP and protocol) so a client stays on the same VM."
   ],
   [
    "Which service should you use if requests must be routed by URL path?",
    "Application Gateway, because Azure Load Balancer works at layer 4 and does not inspect HTTP paths."
   ]
  ]
 },
 {
  "t": "Troubleshooting connectivity with Network Watcher: IP flow verify, next hop, connection troubleshoot, effective routes",
  "hook": "Your phone buzzes at 2:10 a.m. It is the on-call alert at Meadowbrook Pharmacy: the prescription app VM cannot reach the inventory API in a peered VNet, and the morning shift opens in five hours. Earlier that evening the network team pushed a route table change and the security team tightened some NSG rules, and each team's chat message says 'not us'. You cannot sign in to the VM easily, and guessing means changing production rules in the dark. Azure can tell you, from its own point of view, whether a packet is allowed, where it is sent and whether the far end answers. Which tool do you open first, and what will each one prove?",
  "simple": "When a computer in Azure cannot reach something, there are usually three suspects: a security rule blocking it, a wrong road sending the traffic somewhere else, or the destination not answering. Network Watcher is Azure's toolbox for checking each suspect without logging in to the machine. IP flow verify answers 'would a security rule let this through, and which rule decided?'. Next hop answers 'where would Azure send this traffic next?'. Effective routes shows the whole list of roads a machine's network card uses. Connection troubleshoot actually tries the trip end to end and reports whether it arrived, how long it took and where it got stuck, like a test delivery.",
  "body": [
   "When a virtual machine (VM) cannot reach something, the cause is usually one of three things: a network security group (NSG) rule blocks the traffic, a route sends it somewhere unexpected, or the destination itself is not listening or is unreachable. Azure Network Watcher provides tools that test each possibility from the Azure platform's point of view, without logging in to the VM. Network Watcher is enabled automatically per region when you create a virtual network, and its tools are in the portal under Network Watcher or on a VM's Help and Connection troubleshoot blades. Knowing which tool answers which question is exactly what the exam tests.",
   "IP flow verify answers the security question. It checks whether a specific packet would be allowed or denied to or from a VM. You specify the VM and NIC, direction (inbound or outbound), protocol (TCP or UDP), local IP and port, and remote IP and port. The result is Access allowed or Access denied, plus the name of the NSG rule that made the decision, such as `DenyAllInBound` or a custom rule. This is the fastest way to prove or rule out an NSG problem, and it needs the VM to be running. The CLI equivalent is `az network watcher test-ip-flow --vm vm-web --direction Inbound --protocol TCP --local 10.1.0.4:443 --remote 203.0.113.10:50000`.",
   "Next hop answers the routing question for one destination. It tells you where Azure would send a packet from a VM to a destination IP. It returns the next hop type, such as Internet, VirtualNetwork, VirtualAppliance, VirtualNetworkGateway or None, the next hop IP address if there is one, and the ID of the route table containing the matching user-defined route (UDR). If traffic to the internet unexpectedly goes to a firewall, or to None, next hop shows it immediately: `az network watcher show-next-hop --vm vm-web --source-ip 10.1.0.4 --dest-ip 10.20.0.5`.",
   "Effective routes gives the full routing picture. Found on a VM's network interface under Help > Effective routes, it lists every route that applies to the NIC: system routes, routes from route tables, routes learned over BGP (Border Gateway Protocol) from gateways, and peering routes, with their source, state and next hop. Where next hop answers 'where does this one packet go?', effective routes shows the whole routing table so you can spot an overly broad UDR, a route marked Invalid, or a missing peering route. Effective security rules is the matching view for combined NSG rules from both subnet and NIC.",
   "Connection troubleshoot tests the real journey. It tests an actual connection from a source, such as a VM, a scale set instance or an Application Gateway, to a destination VM, FQDN (fully qualified domain name), URI (uniform resource identifier) or IP address on a port. It reports whether the connection succeeded, latency, the hops along the path, and problems it found, such as an NSG denying the traffic, a route to None, or the destination port not responding. For VMs it relies on the Network Watcher agent VM extension, which the portal can install for you.",
   "A practical order saves time when a VM cannot connect. Run connection troubleshoot first for an overall verdict. If it points to a rule, use IP flow verify to name the NSG rule. If it points to routing, use next hop and effective routes. If Azure's view says traffic is allowed and routed correctly, look inside the VM (the operating system firewall, or a service that is not running) or at the destination. Packet capture and flow logs help for intermittent problems that a single test may miss.",
   "Consider a worked example. After the network team adds a route table to the app subnet, `vm-app1` can no longer reach an API at 10.30.0.8 in a peered VNet. Connection troubleshoot reports the destination unreachable. IP flow verify outbound on TCP 443 says Access allowed by `AllowVnetOutBound`, so the NSG is not the problem. Next hop to 10.30.0.8 returns VirtualAppliance 10.0.1.4 and the new route table's ID. Effective routes shows a user-defined route for 10.30.0.0/16 with next hop VirtualAppliance; because it has the same prefix as the peering route, the UDR wins, and the firewall has no rule allowing this traffic. Adding a firewall rule restores connectivity, and connection troubleshoot now reports Reachable with latency. Each team's claim was checked with evidence rather than opinion.",
   "Common mistakes include using IP flow verify to diagnose a routing problem (it only evaluates NSG rules); expecting next hop to tell you about NSGs; forgetting that IP flow verify needs the VM running; testing inbound when the question is about outbound; skipping the Network Watcher agent extension for connection troubleshoot; and assuming that because Azure allows the traffic, the guest operating system firewall does too.",
   "Exam questions map symptoms to tools. 'Determine which NSG rule blocks traffic' means IP flow verify. 'Determine where traffic is sent' or 'identify the route table that affects traffic' means next hop. 'View all routes applied to a NIC' means effective routes. 'Test connectivity end to end with latency and hops' means connection troubleshoot. 'Capture packets for analysis' means packet capture, and 'record all traffic flows' means flow logs."
  ],
  "analogy": "Think of a parcel that never arrived. IP flow verify is asking the security desk 'would you have let this parcel through, and which rule says so?'. Next hop is asking the sorting center 'which truck would this parcel go on next?'. Effective routes is the sorting center's full routing chart. Connection troubleshoot is sending a tracked test parcel and reading every scan along the way. The analogy stops at the front door: if the recipient's own house rules (the guest operating system firewall) refuse delivery, none of the carrier's tools can see that.",
  "terms": [
   [
    "Network Watcher",
    "A regional Azure service with diagnostic and monitoring tools for virtual network resources."
   ],
   [
    "IP flow verify",
    "A tool that tests whether a specific packet is allowed or denied to or from a VM and names the NSG rule responsible."
   ],
   [
    "Next hop",
    "A tool that shows where Azure will send a packet from a VM, including next hop type, IP and route table."
   ],
   [
    "Effective routes",
    "The full list of system, user-defined, BGP and peering routes applied to a network interface."
   ],
   [
    "Connection troubleshoot",
    "A tool that tests an actual connection from a source to a destination and reports reachability, latency, hops and issues."
   ],
   [
    "Network Watcher agent",
    "A VM extension required for connection troubleshoot, packet capture and Connection Monitor from Azure VMs."
   ],
   [
    "Effective security rules",
    "The combined view of subnet and NIC NSG rules that apply to a network interface."
   ]
  ],
  "example": "Users report that a web VM stopped answering on port 443 after a security change. IP flow verify, run inbound for TCP 443 from an internet address, returns Access denied by a custom rule named Deny-All-Web at priority 150, which a colleague added above the existing Allow rule at 200. Renumbering the Allow rule to 140 fixes the problem, and IP flow verify now reports Access allowed.",
  "mistakes": [
   [
    "Use IP flow verify to find out why traffic goes to the firewall instead of the internet.",
    "IP flow verify only evaluates NSG rules. Routing questions need next hop or effective routes."
   ],
   [
    "Next hop will show if an NSG is blocking the packet.",
    "Next hop reports only the routing decision: next hop type, IP and route table. Use IP flow verify or effective security rules for NSGs."
   ],
   [
    "If IP flow verify says Access allowed, the application must be reachable.",
    "Azure's view ends at the NIC. The guest operating system firewall, a stopped service or a problem at the destination can still block the connection; connection troubleshoot helps reveal this."
   ],
   [
    "Connection troubleshoot works on any VM with no preparation.",
    "From a VM source it needs the Network Watcher agent VM extension, which the portal can install for you."
   ]
  ],
  "tryit": [
   [
    "A VM can reach the internet, but traffic to an on-premises server at 192.168.10.20 times out. NSG rules were not changed recently, but a new route table was attached yesterday. Which two tools do you use, in what order, and what are you looking for?",
    "Start with next hop to 192.168.10.20 to see the next hop type and which route table it came from; then open effective routes to see whether a UDR (for example to a virtual appliance or None) overrides the gateway route for that range. If routing looks right, use IP flow verify to rule out NSGs."
   ],
   [
    "A help-desk ticket says a VM 'cannot connect to the database', with no further detail. You want a single test that reports reachability, latency, the path and likely cause. Which tool fits, and what might you need to install first?",
    "Connection troubleshoot from the VM to the database's address and port. It may need the Network Watcher agent extension on the VM, which the portal can install."
   ]
  ],
  "tip": "Blocked by an NSG? IP flow verify names the rule. Wrong path? Next hop shows the next hop and route table, and effective routes shows the full table. End-to-end test with latency and hops? Connection troubleshoot.",
  "check": [
   [
    "Which tool tells you the exact NSG rule that denies a packet?",
    "IP flow verify, which returns Access allowed or denied and the name of the deciding rule."
   ],
   [
    "Internet traffic from a VM is going through a firewall unexpectedly. Which tool shows why?",
    "Next hop, which shows the next hop type (VirtualAppliance), its IP address and the route table containing the matching route."
   ],
   [
    "What is the difference between next hop and effective routes?",
    "Next hop evaluates one destination; effective routes lists every route applied to the NIC with source and state."
   ],
   [
    "What does connection troubleshoot require on an Azure VM source?",
    "The Network Watcher agent VM extension, which the portal can install automatically."
   ]
  ]
 },
 {
  "t": "Azure Monitor metrics vs logs, and diagnostic settings that send resource logs to a Log Analytics workspace",
  "hook": "It is Thursday afternoon at Lakeshore Mutual, and Dev from the security team is standing at your desk. A database connection string vanished from the production key vault two weeks ago, and the application team only noticed when a nightly job failed. Dev wants a simple answer: who read or deleted that secret, and when. You open the portal, find the activity log, and see plenty of entries about the vault being tagged and its firewall being edited, but nothing about secrets at all. Your stomach drops as you realize the data may never have been collected. Why does Azure record some things automatically and stay silent about others, and what should you have switched on?",
  "simple": "Azure keeps two kinds of records about your resources. Metrics are simple numbers measured over and over, like a car dashboard showing speed every second. Azure collects them for you automatically. Logs are detailed diary entries, such as \"this person opened this secret at 3:14 p.m.\" Some diaries are kept automatically, like the record of who created or deleted a resource. But the detailed diary of what happens inside a resource is not kept until you ask for it. You ask by creating a diagnostic setting, which is simply an instruction saying \"send this resource's diary to this place.\" The usual place is a Log Analytics workspace, a searchable store where you can ask questions of the data later. If you never created the setting, the diary pages were never written.",
  "body": [
   "Azure Monitor is the platform service that collects, stores and analyzes telemetry from Azure resources, operating systems and applications. Almost everything it does rests on two kinds of data: metrics and logs. Knowing which is which, what is collected automatically, and what you must switch on yourself answers a large share of monitoring questions on the AZ-104 exam. It also saves you from discovering, in the middle of an incident, that the data you need was never captured.",
   "Start with metrics. Metrics are numeric values sampled at regular intervals and stored as a time series, such as Percentage CPU for a virtual machine (VM), Transactions for a storage account or Data Path Availability for a load balancer. Platform metrics are collected automatically for Azure resources with no setup. They are lightweight and near real time, which makes them ideal for charts and fast alerts. You explore them in Metrics explorer by choosing a resource, a metric and an aggregation (average, minimum, maximum, sum or count), and optionally splitting by a dimension such as API name so you can see which operation is driving the numbers. Platform metrics are kept for 93 days. If you need longer retention, or want to query metrics alongside other data, you send them to a workspace.",
   "Logs are the second kind of data, and they are richer. A log is a record of an event or observation with many properties, such as a sign-in, an HTTP request, a Windows event or a performance counter reading tagged with its computer name. Logs are stored in a Log Analytics workspace, where you query them with KQL (Kusto Query Language), correlate data from many sources and keep it for a configurable retention period. Logs are more flexible than metrics but take a little longer to arrive, and they cost money per gigabyte ingested and retained, which is why Azure does not collect everything by default.",
   "Three log sources matter at the Azure level, and the exam expects you to tell them apart. The activity log records control-plane events for a subscription: who created, changed or deleted which resource and when, plus service health events. It is collected automatically and kept for 90 days. Resource logs record what happens inside a resource, such as Key Vault access requests, storage read and write operations or NSG (network security group) events. They are not collected at all until you create a diagnostic setting. Guest operating system logs and performance counters from inside VMs need the Azure Monitor Agent, which a later lesson covers. A useful way to remember the split: the activity log is about the resource as an object in Azure, resource logs are about the work the resource does.",
   "A diagnostic setting is how you turn resource logs on and decide where they go. It is configured per resource under Monitoring > Diagnostic settings. You pick log categories or category groups (such as `allLogs` or `audit`) and optionally AllMetrics, then one or more destinations. A Log Analytics workspace is for querying and alerting. A storage account is for cheap long-term archival. An event hub is for streaming to a third-party SIEM (security information and event management) system. A partner solution is the fourth option. Each resource can have several diagnostic settings, so you can send audit logs to both a workspace and an archive at once. The activity log has its own diagnostic setting at the subscription level, so it can also be sent to a workspace for longer retention and cross-subscription queries. From the CLI (command-line interface) it looks like this:",
   "```bash\naz monitor diagnostic-settings create --name kv-to-law \\\n  --resource /subscriptions/<sub>/resourceGroups/rg-sec/providers/Microsoft.KeyVault/vaults/kv-prod \\\n  --workspace /subscriptions/<sub>/resourceGroups/rg-mon/providers/Microsoft.OperationalInsights/workspaces/law-prod \\\n  --logs '[{\"categoryGroup\":\"audit\",\"enabled\":true}]' --metrics '[{\"category\":\"AllMetrics\",\"enabled\":true}]'\n```",
   "Consider a worked example that shows why this matters. After a secret disappears from a production key vault, the security team wants to know who read or deleted secrets last month. The activity log shows management operations on the vault, such as a firewall change, but secret reads and deletes are data-plane operations recorded only in resource logs. No diagnostic setting existed, so that history is gone and cannot be recovered. The administrator now creates diagnostic settings on every key vault sending the audit category group to the central workspace and also to a storage account for seven-year archival. Because people forget, she also assigns an Azure Policy definition with the DeployIfNotExists effect so every new vault gets the same setting automatically. Next time, a KQL query answers the question in seconds.",
   "Several mistakes come up again and again. People assume resource logs are collected by default. They confuse the activity log (who changed the resource) with resource logs (what happened inside it). They send data to a storage account and then expect to query or alert on it, when a storage account only holds files. They forget that each resource needs its own diagnostic setting. And they think metrics are kept forever, when platform metrics age out after 93 days.",
   "When you read exam questions, translate the wording into a data type or destination. 'Performance counter charted in near real time' or 'numeric value over time' means metrics. 'Query and correlate' means logs in a Log Analytics workspace. 'Who deleted the VM' means the activity log. 'Capture storage read operations' means a diagnostic setting. 'Retain for years cheaply' means a storage account. 'Stream to a third-party SIEM' means an event hub. 'Ensure every new resource sends logs' means Azure Policy with DeployIfNotExists."
  ],
  "analogy": "Think of a building. The thermometer and electricity meter on the wall are metrics: they tick along automatically, show a number right now, and the building manager only keeps the readings for a few months. The front-desk sign-in book is the activity log: it records who came in to change the building itself. What happens inside each office, who opened which filing cabinet, is only written down if that office installs a camera, and the camera only records if you tell it where to send the tape. That camera instruction is the diagnostic setting. The analogy stops working on cost: real cameras cost the same whether anyone watches, but Azure charges for the log data you ingest and keep.",
  "mnemonic": "Destinations by job: Workspace to Query, Storage to Keep, Event hub to Stream. Remember \"Q, K, S\": query in a workspace, keep in storage, stream through an event hub.",
  "terms": [
   [
    "Azure Monitor",
    "The Azure platform service that collects, stores, analyzes and alerts on metrics and logs."
   ],
   [
    "Platform metrics",
    "Numeric time-series data collected automatically for Azure resources and kept for 93 days."
   ],
   [
    "Log Analytics workspace",
    "The Azure Monitor store for log data, queried with KQL and used for log alerts and insights."
   ],
   [
    "Activity log",
    "A subscription-level record of control-plane operations and service health events, collected automatically and kept for 90 days."
   ],
   [
    "Resource logs",
    "Data-plane logs emitted by a resource, collected only when a diagnostic setting is configured."
   ],
   [
    "Diagnostic setting",
    "A per-resource configuration that sends selected logs and metrics to a workspace, storage account, event hub or partner solution."
   ],
   [
    "Event hub",
    "A streaming ingestion service used as a diagnostic destination to forward data to external tools such as a SIEM."
   ],
   [
    "Category group",
    "A preset bundle of log categories, such as allLogs or audit, chosen in a diagnostic setting."
   ]
  ],
  "example": "A retailer wants to investigate slow storage requests and keep an audit trail for compliance. Metrics explorer already shows Success E2E Latency for the storage account because platform metrics are automatic. To see which operations were slow and who made them, the administrator adds a diagnostic setting sending blob read, write and delete logs to the operations Log Analytics workspace, and a second copy to an archive storage account with a long retention rule for auditors.",
  "mistakes": [
   [
    "Resource logs, such as key vault secret reads, are collected automatically like metrics.",
    "Only platform metrics and the activity log are automatic. Resource logs are not captured at all until you create a diagnostic setting on that resource, and anything before that moment is lost."
   ],
   [
    "The activity log will show who read or deleted a secret or blob.",
    "The activity log records control-plane operations on the resource itself, such as creating it or changing its firewall. Data-plane operations inside the resource appear only in resource logs."
   ],
   [
    "Sending logs to a storage account lets you query them and build alerts.",
    "A storage account is for cheap archival. To query with KQL or create log search alerts, the destination must be a Log Analytics workspace."
   ],
   [
    "Platform metrics are kept indefinitely, so no export is needed for long-term trends.",
    "Platform metrics are retained for 93 days. Send them to a workspace or storage account through a diagnostic setting if you need them longer."
   ]
  ],
  "tryit": [
   [
    "Fernvale Clinics must keep NSG event logs for seven years for auditors, wants the security team's third-party SIEM to receive the same events within seconds, and needs no interactive querying in Azure. The budget is tight. Which destinations should the diagnostic setting use?",
    "A storage account for the seven-year archive, because it is the cheapest long-term store, and an event hub to stream the events to the SIEM in near real time. A Log Analytics workspace is not required because nobody needs to query or alert on the data inside Azure."
   ],
   [
    "Your manager asks for an alert if CPU on a VM stays above 85 percent for five minutes, and also wants a chart of it on the team dashboard. Do you need to create a diagnostic setting first?",
    "No. Percentage CPU is a platform metric collected automatically for the VM, so you can chart it in Metrics explorer and base a metric alert on it without any diagnostic setting."
   ]
  ],
  "tip": "Metrics and the activity log are collected automatically; resource logs require a diagnostic setting. Choose the destination by purpose: a workspace to query and alert, a storage account to archive cheaply, an event hub to stream to external tools.",
  "check": [
   [
    "You need to query who read secrets in a key vault. What must be configured?",
    "A diagnostic setting on the key vault that sends its audit resource logs to a Log Analytics workspace."
   ],
   [
    "Which destination should you use to forward Azure resource logs to a third-party SIEM in near real time?",
    "An event hub, which streams the data to external systems."
   ],
   [
    "What is the difference between the activity log and resource logs?",
    "The activity log records management operations on resources (who created or deleted what); resource logs record operations inside a resource and need a diagnostic setting."
   ],
   [
    "How can you make sure every new storage account automatically sends logs to a workspace?",
    "Assign an Azure Policy definition with the DeployIfNotExists effect that creates the diagnostic setting."
   ],
   [
    "How long are platform metrics retained by default?",
    "93 days. Use a diagnostic setting to send them elsewhere if you need longer retention."
   ]
  ]
 },
 {
  "t": "Querying logs with basic KQL (where, summarize, project, render)",
  "hook": "It is 7:40 a.m. at Pinecrest Logistics and Rosa, the operations manager, has a meeting at nine. She wants one slide: how many failed sign-ins each Windows server had overnight, worst first, and a chart showing when they happened. The data is already flowing into the Log Analytics workspace, millions of rows of it. You open the Logs blade and stare at an empty query window with a blinking cursor. Scrolling through raw events by hand would take all day. You know the answer is in there somewhere. Which few lines of query turn a flood of records into one clear table and one chart before Rosa walks into that room?",
  "simple": "Log data is like a giant spreadsheet with millions of rows. KQL is the way you ask that spreadsheet questions. You start by naming the table, then add steps one at a time, each separated by a straight line called a pipe. Each step takes the rows from the step before and does one thing to them. One step keeps only the rows you care about, like a coffee shop keeping only today's receipts. Another step groups rows and counts or averages them, like adding up sales per cashier. Another chooses which columns to show. A final step can draw a chart. KQL only reads data; it can never change or delete the records, so you can experiment safely.",
  "body": [
   "Kusto Query Language (KQL) is the read-only query language used by Log Analytics, Azure Monitor log search alerts, Microsoft Sentinel and Azure Resource Graph. You open it in a workspace's Logs blade, or in a resource's Logs blade where the scope is already set to that resource. A query starts with a table name and passes the data through a pipeline of operators separated by the pipe character `|`, each one transforming the result of the previous step. You do not need to memorize the whole language. If you know a handful of operators, you can answer most AZ-104 exam questions and handle everyday troubleshooting.",
   "The first group of operators shapes rows and columns. `where` filters rows by a condition. `project` chooses and renames columns, and `project-away` drops the columns you name. `extend` adds calculated columns, such as converting bytes to megabytes. `sort by` (or `order by`) orders results, and `take` or `limit` returns a sample of rows, which is handy when you just want to see what a table looks like. `top 10 by` combines sorting and limiting in one step.",
   "Time deserves special attention because almost every question has a time range. Most tables have a `TimeGenerated` column, and the `ago()` function expresses relative time, so `where TimeGenerated > ago(1h)` keeps the last hour and `ago(7d)` keeps the last week. Comparison operators include `==`, `!=`, `>`, `contains`, `has`, `startswith` and `in`. String comparisons with `==` are case sensitive, while `=~` is case insensitive, which matters for fields like computer names that are not always typed consistently. `has` matches whole terms and is faster than `contains`, which matches any substring.",
   "The second group of operators aggregates and visualizes. `summarize` groups rows and calculates values for each group, much like GROUP BY in SQL (Structured Query Language). Aggregation functions include `count()`, `avg()`, `max()`, `min()`, `sum()` and `dcount()` (distinct count), followed by `by` and the grouping columns. To build a time series, group by `bin(TimeGenerated, 5m)`, which rounds each timestamp down into a five-minute bucket. `render` then turns the result into a chart, such as `timechart`, `barchart`, `piechart` or `columnchart`. Three typical queries show the pattern:",
   "```kusto\n// Computers that have not sent a heartbeat in 15 minutes\nHeartbeat\n| summarize LastSeen = max(TimeGenerated) by Computer\n| where LastSeen < ago(15m)\n\n// Average CPU per computer in 5-minute bins over the last day, as a chart\nPerf\n| where TimeGenerated > ago(1d)\n| where ObjectName == \"Processor\" and CounterName == \"% Processor Time\"\n| summarize AvgCPU = avg(CounterValue) by bin(TimeGenerated, 5m), Computer\n| render timechart\n\n// Who deleted resources in the last week\nAzureActivity\n| where TimeGenerated > ago(7d) and OperationNameValue endswith \"DELETE\"\n| project TimeGenerated, Caller, ResourceGroup, OperationNameValue\n| sort by TimeGenerated desc\n```",
   "Read each query from top to bottom, as a series of transformations. In the first, all heartbeat records are reduced to one row per computer showing its latest check-in time, and then filtered to those older than 15 minutes. That is the classic 'which agents stopped reporting' query, and it can back a log search alert. The order of operators matters for two reasons. Filtering with `where` early makes queries faster and cheaper because later steps handle fewer rows. And a `project` or `summarize` that removes a column prevents later operators from using it: after `summarize ... by Computer`, only the grouping column and the new aggregate exist.",
   "You will also meet the same tables repeatedly. `Heartbeat` holds agent check-ins, `Perf` holds performance counters, `Event` holds Windows event logs, and `Syslog` holds Linux logs. `AzureActivity` is the activity log. Resource logs land in `AzureDiagnostics` or in resource-specific tables such as `StorageBlobLogs`, and `InsightsMetrics` holds VM insights data. Knowing the table tells you where to start the pipeline.",
   "Consider a worked example. Your manager asks how many failed Windows sign-ins each server had in the last 24 hours, most first. Event ID 4625 is a failed logon in the Security log, collected into the `SecurityEvent` table. You write `SecurityEvent | where TimeGenerated > ago(24h) and EventID == 4625 | summarize Failures = count() by Computer | sort by Failures desc`. To show the trend, you change the last lines to `summarize Failures = count() by bin(TimeGenerated, 1h) | render timechart`. The spike at 03:00 leads you to a server with RDP (Remote Desktop Protocol) exposed to the internet, which you move behind Azure Bastion.",
   "Watch for the usual mistakes. People put `where` after `summarize` and then filter on a column that no longer exists. They forget a time filter, so the query scans far more data than needed. They use `==` for a string whose case varies. They expect `project` to aggregate, or confuse `count()`, which counts rows, with `dcount()`, which counts distinct values. They forget that `bin()` is needed to make a time series for `render timechart`. And they forget that KQL is read-only: it cannot delete or change log data.",
   "In exam questions, look for which operator produces the requested shape. Filtering rows is `where`. Counting or averaging per group is `summarize ... by`. Choosing or renaming columns is `project`. Adding a calculated column is `extend`. A chart is `render`. The most recent hour is `ago(1h)`, and hourly buckets are `bin(TimeGenerated, 1h)`. If a question shows a query with a blank and asks which operator returns one row per computer, the answer is `summarize`."
  ],
  "analogy": "A KQL query is like an assembly line in a mail-sorting room. The table is the pile of mail dumped at the start. The first worker (`where`) throws away everything not addressed to your building. The next worker (`summarize`) puts letters into bins by apartment and writes a count on each bin. Another (`project`) peels off only the labels you need. The last one (`render`) draws a chart of the counts. Once a worker has binned the mail, the individual envelopes are gone, which is why you cannot filter on a column that `summarize` already removed. Where the analogy breaks: the original mail is never destroyed, because KQL only reads data.",
  "terms": [
   [
    "KQL",
    "Kusto Query Language, the read-only pipeline query language used by Log Analytics and related services."
   ],
   [
    "where",
    "The KQL operator that filters rows by a condition."
   ],
   [
    "summarize",
    "The KQL operator that aggregates rows into groups with functions such as count() and avg()."
   ],
   [
    "project",
    "The KQL operator that selects, renames or orders output columns."
   ],
   [
    "extend",
    "The KQL operator that adds a calculated column to each row."
   ],
   [
    "render",
    "The KQL operator that displays results as a chart such as a timechart or barchart."
   ],
   [
    "bin()",
    "A KQL function that rounds values, typically timestamps, into fixed-size buckets for time series."
   ],
   [
    "ago()",
    "A KQL function that returns a time relative to now, such as ago(1d) for one day ago."
   ]
  ],
  "example": "An operations engineer needs a daily chart of storage errors. She queries StorageBlobLogs, filters with where StatusCode >= 400 and TimeGenerated > ago(7d), summarizes count() by bin(TimeGenerated, 1h) and StatusText, and ends with render timechart. The chart shows a burst of authorization failures after a key rotation, and she pins it to a shared dashboard so the team can watch it return to normal.",
  "mistakes": [
   [
    "`project` can count or average values per computer.",
    "`project` only selects, renames and orders columns. Aggregation per group is done with `summarize`, for example `summarize avg(CounterValue) by Computer`."
   ],
   [
    "You can filter on any original column after a `summarize`.",
    "`summarize` outputs only the grouping columns and the new aggregates. Filter on raw columns with `where` before `summarize`, or filter afterward only on the columns it produced."
   ],
   [
    "`count()` and `dcount()` give the same answer.",
    "`count()` counts rows, while `dcount()` counts distinct values. Ten failed sign-ins from three computers give count 10 but dcount(Computer) 3."
   ],
   [
    "`render timechart` works on any grouped result.",
    "A useful time series needs a time column grouped with `bin()`, such as `bin(TimeGenerated, 1h)`. Without it there is no regular time axis to plot."
   ]
  ],
  "tryit": [
   [
    "A colleague's query is `Perf | summarize avg(CounterValue) by Computer | where CounterName == \"% Processor Time\"`, and it returns an error about an unknown column. What is wrong and how do you fix it?",
    "After `summarize`, only Computer and the average exist, so CounterName is gone. Move the filter before the aggregation: `Perf | where CounterName == \"% Processor Time\" | summarize avg(CounterValue) by Computer`. Filtering early is also faster and cheaper."
   ],
   [
    "Your security lead wants to know how many different user accounts had at least one failed sign-in on each server today, not how many failures there were. Which aggregation function do you use?",
    "Use `dcount()` on the account column, for example `summarize Accounts = dcount(Account) by Computer`, because the question asks for distinct accounts. `count()` would return the number of failed events instead."
   ]
  ],
  "tip": "Map the question to the operator: filter rows = where, aggregate per group = summarize ... by, pick columns = project, add a column = extend, chart = render. Time filters use ago(), and time series use bin().",
  "check": [
   [
    "Which operator returns one row per computer with the average CPU?",
    "summarize, for example summarize avg(CounterValue) by Computer."
   ],
   [
    "How do you limit a query to the last 30 minutes?",
    "Filter with where TimeGenerated > ago(30m)."
   ],
   [
    "What does bin(TimeGenerated, 5m) do?",
    "It rounds each timestamp down into five-minute buckets so results can be grouped into a time series."
   ],
   [
    "Which operator keeps only the TimeGenerated, Computer and EventID columns?",
    "project TimeGenerated, Computer, EventID."
   ],
   [
    "Which comparison operator matches a string regardless of upper or lower case?",
    "=~, because == is case sensitive."
   ]
  ]
 },
 {
  "t": "Alert rules (metric, log search, activity log), action groups and alert processing rules",
  "hook": "Saturday, 11:20 p.m. Jonah, the on-call administrator at Redwood Freight, is woken by his phone for the fourth time tonight. Each page is a CPU alert from servers that the patching team is rebooting on schedule, exactly as planned. Meanwhile, on Friday, someone deleted a virtual network in production and nobody was told until customers called on Monday. The alerting is noisy where it should be quiet and silent where it should shout. On Monday your manager asks you to fix it without losing any history of what fired. Which kind of rule catches a deleted network, which one watches CPU, and how do you hush the planned maintenance noise?",
  "simple": "An alert is Azure tapping you on the shoulder. You set up a rule that says what to watch, what counts as trouble, and who to tell. Some rules watch numbers, like a smoke detector watching temperature. Some rules search the detailed records for a pattern, like scanning a security guard's notebook every few minutes. Some rules watch the record of who changed things, like being told whenever someone moves furniture. The \"who to tell\" part is stored once in a contact list called an action group, so many rules can share it. Finally, an alert processing rule is like putting your phone on do-not-disturb during a planned event: the alerts still happen and are written down, but nobody's phone rings.",
  "body": [
   "Alerts in Azure Monitor tell you when something needs attention and can start automatic responses. Every alert rule has three parts: the scope (which resources it watches), the condition (what triggers it) and the actions (what happens when it fires, delivered through action groups). Each rule also has a severity from 0 (critical) to 4 (verbose), plus a name and description that appear in notifications, so write them for the tired person reading them at night. Choosing the right rule type for a scenario is one of the most tested monitoring skills on the AZ-104 exam.",
   "Metric alert rules are the first type. They evaluate a platform or custom metric at a regular frequency over a look-back window, for example 'average Percentage CPU greater than 85 over the last 5 minutes, checked every minute'. Thresholds can be static, a fixed number you choose, or dynamic, where machine learning learns the metric's normal pattern, including daily and weekly cycles, and alerts on deviations. One metric alert rule can monitor many resources of the same type in a region, such as all virtual machines (VMs) in a subscription. Metric alerts are stateful: they fire once, then resolve automatically when the condition clears, so you are not paged every minute. They are fast and cheap, which makes them the first choice for performance thresholds.",
   "Log search alert rules are the second type. They run a KQL (Kusto Query Language) query against a Log Analytics workspace or Application Insights on a schedule, for example every 5 minutes over the last 15 minutes, and fire when the result meets a condition, such as the number of rows being greater than zero or an aggregated value crossing a threshold. They suit conditions only visible in logs: a particular Windows event ID, a missing heartbeat, or a pattern across several resources. Because they depend on log ingestion and a scheduled query, they have more delay and cost more than metric alerts.",
   "Activity log alert rules are the third type. They fire on events in the subscription's activity log. These include administrative operations, such as 'someone deleted a virtual network' or 'a role assignment was created'; service health events, meaning Azure incidents and planned maintenance affecting your regions and services; and resource health events, such as a specific VM becoming unavailable. Activity log alerts are how you are told about changes and platform issues rather than performance.",
   "An action group is the reusable 'who and what' of alerting, shared by many alert rules. Notifications include email, SMS (text messages), Azure mobile app push, voice calls, and email to Azure Resource Manager roles such as Owner. Actions include Azure Automation runbooks, Azure Functions, Logic Apps, webhooks, event hubs and IT service management (ITSM) connectors that open tickets. Create action groups per team or response, such as `ag-ops-oncall`, and attach them to rules. When the on-call phone number changes, you edit one action group instead of twenty rules: `az monitor action-group create --resource-group rg-mon --name ag-ops-oncall --short-name opsoncall --action email ops ops@contoso.com`.",
   "Alert processing rules modify fired alerts without editing the alert rules themselves. You scope a processing rule to a subscription, resource group or resource, with optional filters such as severity, alert rule or monitor service, and choose one of two behaviors. Suppress notifications stops action groups from running, for example during a planned maintenance window on a schedule. Apply action group adds action groups to all matching alerts, for example sending every Sev0 alert in production to the on-call team. Suppression stops notifications, but the alerts still fire and are recorded, so you keep the history. In the portal, Monitor > Alerts shows fired alerts, and you change their user response to Acknowledged or Closed as you work on them.",
   "Consider a worked example. An operations team wants a page when any production VM's CPU stays above 90 percent, an email when anyone deletes a resource in the production subscription, a ticket when the Security log shows more than 20 failed sign-ins in 10 minutes, and no notifications during Saturday night patching. They create one metric alert rule scoped to all VMs in the production resource group, an activity log alert on the Delete operation, and a log search alert on `SecurityEvent` counting Event ID 4625. All three use the action group `ag-ops-oncall`. A scheduled alert processing rule suppresses action groups every Saturday from 22:00 to 02:00, so alerts are still recorded but nobody is woken.",
   "Common mistakes follow a pattern. Administrators use a log search alert for a simple CPU threshold that a metric alert handles faster and more cheaply. They expect a metric alert to catch 'someone deleted a VM', which is an activity log event, not a number. They disable alert rules for maintenance and forget to re-enable them, instead of using an alert processing rule. They recreate the same email list in every rule instead of sharing an action group. And they assume suppressed alerts are not recorded, when in fact only the notifications stop.",
   "In exam questions, the wording points to the tool. 'CPU above a threshold' means a metric alert. 'KQL', 'event ID' or 'custom query' means a log search alert. 'Deleted', 'role assignment created', 'service health' or 'resource health' means an activity log alert. 'Send SMS and run a runbook' means an action group. 'Silence during maintenance' or 'route all Sev0 alerts' means an alert processing rule."
  ],
  "analogy": "In a building safety system, smoke and heat detectors are metric alerts: they watch a number continuously and react fast. A guard scanning the visitor log every few minutes for a suspicious pattern is a log search alert: thorough but slower. The doorman who calls you whenever someone moves furniture out is an activity log alert. The printed phone tree on the wall, used by all of them, is the action group. Telling the front desk 'do not call anyone during the fire drill on Saturday, but still note every alarm' is the alert processing rule. Unlike a real fire drill, Azure suppression applies only to notifications; the alerts still fire and remain in the alert history.",
  "mnemonic": "Match the rule to the data: Metric for numbers, Log search for queries, Activity log for actions taken on resources and Azure health. Action group says who to tell; processing rule says when to stay quiet or who else to add.",
  "terms": [
   [
    "Alert rule",
    "A definition of scope, condition and actions that fires an alert when the condition is met."
   ],
   [
    "Metric alert",
    "An alert rule that evaluates a metric against a static or dynamic threshold at regular intervals."
   ],
   [
    "Log search alert",
    "An alert rule that runs a KQL query on a schedule and fires based on the results."
   ],
   [
    "Activity log alert",
    "An alert rule that fires on administrative, service health or resource health events in the activity log."
   ],
   [
    "Action group",
    "A reusable set of notifications and automated actions that alert rules call when they fire."
   ],
   [
    "Alert processing rule",
    "A rule that suppresses or adds action groups for fired alerts matching a scope and filters, optionally on a schedule."
   ],
   [
    "Dynamic threshold",
    "A metric alert option that uses machine learning to learn normal behavior and alert on deviations."
   ],
   [
    "Severity",
    "A level from Sev0 (critical) to Sev4 (verbose) assigned to an alert rule."
   ]
  ],
  "example": "A company wants to know immediately if anyone deletes a resource lock or a virtual network in production. The administrator creates activity log alert rules for those Delete operations scoped to the production subscription, attaches an action group that emails the cloud team and posts to their chat channel through a webhook, and adds a second action that runs an Automation runbook to record the caller's details in the change management system.",
  "mistakes": [
   [
    "A metric alert can notify you when someone deletes a VM or creates a role assignment.",
    "Deletions and role assignments are administrative operations in the activity log. Use an activity log alert; metric alerts only evaluate numeric metrics."
   ],
   [
    "The best way to stop maintenance noise is to disable the alert rules for the weekend.",
    "Disabled rules are easy to forget and record nothing. A scheduled alert processing rule suppresses notifications while alerts still fire and are recorded, with no edits to the rules."
   ],
   [
    "Suppressed alerts disappear from Azure Monitor.",
    "Suppression only stops action groups from running. The alerts still fire and appear in the alert history."
   ],
   [
    "A log search alert is the best choice for a simple CPU threshold.",
    "A metric alert is faster and cheaper for platform metrics like Percentage CPU. Use log search alerts when the condition is only visible in logs."
   ]
  ],
  "tryit": [
   [
    "Maplewood Schools wants three things: a text message when Azure posts a service health incident affecting its region, the same text plus an email when a web app's response time crosses a learned normal range, and both sent to the same two administrators. How many action groups and which rule types do you need?",
    "One action group containing the SMS and email notifications for the two administrators, shared by both rules. Use an activity log alert for the service health event and a metric alert with a dynamic threshold for the response time, because dynamic thresholds learn the normal range."
   ],
   [
    "Your company wants every Sev0 alert from any rule in the production subscription to also open a ticket in the IT service management system, but the rules are owned by many teams and you may not edit them. What do you create?",
    "An alert processing rule scoped to the production subscription, filtered on severity Sev0, using the apply action group option with an action group that contains the ITSM connector. This adds the ticketing action without editing any alert rule."
   ]
  ],
  "tip": "Performance thresholds mean a metric alert; a KQL condition means a log search alert; 'someone deleted', service health or resource health means an activity log alert. To silence notifications during maintenance without disabling rules, use an alert processing rule.",
  "check": [
   [
    "Which alert type should notify you when someone creates a role assignment?",
    "An activity log alert on the administrative operation for creating role assignments."
   ],
   [
    "How do you stop alert notifications during a weekly maintenance window without editing alert rules?",
    "Create a scheduled alert processing rule that suppresses action groups for the affected scope during the window."
   ],
   [
    "What is an action group used for?",
    "It holds reusable notifications (email, SMS, push, voice) and actions (runbooks, functions, Logic Apps, webhooks) that alert rules trigger."
   ],
   [
    "An alert must fire when a specific Windows event ID appears. Which rule type do you use?",
    "A log search alert that runs a KQL query against the Event or SecurityEvent table in a Log Analytics workspace."
   ],
   [
    "What does it mean that metric alerts are stateful?",
    "They fire once when the condition is met and resolve automatically when it clears, instead of firing on every evaluation."
   ]
  ]
 },
 {
  "t": "Azure Monitor insights: VM insights, storage and network insights, Azure Monitor Agent and data collection rules",
  "hook": "Tuesday morning at Bluebird Hosting, the help desk queue is full of complaints that the customer portal freezes every afternoon. Leila, your team lead, opens Metrics explorer for the web servers and sees CPU sitting comfortably at 40 percent. 'So what is choking them?' she asks. You go looking for a memory chart and find there is none. Last week you installed the Azure Monitor Agent on every server, so you expected rich data by now, yet the workspace has not received a single guest counter. Something in the chain is missing. Why would an installed agent send nothing, and where does memory data even come from?",
  "simple": "Azure can see the outside of a virtual machine, such as how busy its processor is, without any help. But it cannot see inside the operating system, such as how much memory is used or which errors Windows wrote down. To see inside, you install a small helper program called the Azure Monitor Agent. The agent does nothing on its own. It waits for a set of instructions called a data collection rule, which says what to gather and where to send it, like a shopping list handed to a courier. Insights are ready-made dashboards that turn that data into useful pictures, so you do not have to build charts yourself. Some insights, like the one for storage, use outside measurements and need no agent at all.",
  "body": [
   "Insights are curated monitoring experiences in Azure Monitor built for a particular kind of resource. They combine metrics, logs and workbooks into ready-made views, so you do not have to design charts and queries yourself. You find them under Monitor > Insights, and many also appear on the resource's own Insights blade. For the AZ-104 exam you need to know what VM insights, storage insights and network insights show, and how guest data reaches Azure Monitor through the Azure Monitor Agent and data collection rules.",
   "VM insights monitors the performance and health of virtual machines (VMs) and scale sets, covering both Azure VMs and servers connected through Azure Arc. The Performance view shows charts of CPU, memory, disk and network across all monitored machines, and helps you find the busiest or most constrained ones, for example the five servers with the least available memory. The Map view, which also needs the Dependency agent, shows processes on each VM and their network connections to other machines and services. That is very useful for discovering dependencies before a migration. VM insights stores its data in a Log Analytics workspace, mostly in the `InsightsMetrics` table. You enable it from the VM's Insights blade, which installs the agent and creates a data collection rule for you.",
   "Storage insights and network insights work differently because they rely on platform data. Storage insights gives a unified view of capacity, transactions, availability and latency across your storage accounts, drawn from platform metrics, so it works without extra setup or agents. It quickly spots an account with rising errors or unexpected growth. Network insights shows the health and metrics of network resources, such as load balancers, gateways and public IP addresses, with a topology view, and it links to Network Watcher tools such as Connection Monitor.",
   "Guest-level data is the part that needs an agent. Data from inside a VM, such as Windows event logs, Linux syslog and operating system performance counters like memory usage, is collected by the Azure Monitor Agent (AMA). AMA is installed as a VM extension (and on Arc-enabled servers) and authenticates with a managed identity. It replaced the older Log Analytics agent, which has been retired. Unlike the old agent, AMA does not decide on its own what to collect or where to send it. That is defined separately, in data collection rules.",
   "A data collection rule (DCR) is an Azure resource that describes what data to collect, how to transform it, and where to send it. For VMs, a DCR might collect the '% Processor Time' and 'Available MBytes' counters every 60 seconds plus Warning and Error events from the System and Application logs, and send them to a Log Analytics workspace. Performance counters can also go to Azure Monitor Metrics. You connect the DCR to VMs through data collection rule associations. One VM can have several DCRs, and one DCR can apply to many VMs, so you might have a baseline DCR for all servers and an extra DCR for SQL servers.",
   "DCRs also let you control cost and scale. Transformations written in KQL (Kusto Query Language) can filter or modify data before it is stored, which reduces ingestion cost, for example dropping a chatty informational event that nobody reads. To deploy at scale, use Azure Policy initiatives that install AMA and associate DCRs automatically on every new VM, so a server built next month is monitored the same way as today's.",
   "When data is missing, troubleshoot the chain link by link. First, check that the agent extension is installed and healthy on the VM. Second, check that the VM is associated with the DCR. Third, check that the DCR's destination workspace is the one you are querying. A quick KQL check is `Heartbeat | where Computer == \"vm-sql01\" | take 5`; heartbeats prove the agent is talking to the workspace, so if heartbeats arrive but events do not, the DCR content or association is the likely gap.",
   "Consider a worked example. A team migrating twenty servers wants to know which ones talk to each other, plus Windows System errors from all of them. They enable VM insights with the Map option, which installs AMA and the Dependency agent and creates a DCR. The Map view reveals that an old reporting server still connects to the database, so it joins the migration wave instead of being left behind. They then create a second DCR collecting Error events from the System log, associate it with all twenty servers through a policy assignment, and add a KQL transformation that drops a noisy informational event ID to keep costs down.",
   "The common mistakes are predictable. People install AMA and expect data without associating a DCR. They expect the Map view without the Dependency agent. They assume storage insights needs an agent. They confuse platform metrics, which are host-level and automatic, with guest counters such as memory usage, which need AMA and a DCR. And some still plan around the retired Log Analytics agent.",
   "In exam questions, 'collect Windows event logs or syslog from VMs' means AMA plus a DCR. 'See dependencies between servers' means VM insights Map with the Dependency agent. 'One view of all storage accounts' means storage insights. 'Filter data before ingestion' means a DCR transformation. 'Apply to all new VMs automatically' means Azure Policy."
  ],
  "analogy": "The Azure Monitor Agent is like a courier who has been hired and is standing at the door of each server, but has no delivery note. The data collection rule is the delivery note: pick up these items, trim off the packaging (transformation), and drop them at this address (the workspace). One delivery note can be handed to many couriers, and a courier can carry several notes. Without a note, the courier just stands there, which is why AMA alone sends almost nothing useful. The analogy stops short in one place: the agent does still send a regular heartbeat when connected, so seeing heartbeats proves the courier is on duty, not that he has instructions.",
  "terms": [
   [
    "Insights",
    "Curated Azure Monitor experiences that combine metrics, logs and workbooks for a resource type."
   ],
   [
    "VM insights",
    "An insight showing VM performance charts and, with the Dependency agent, a map of processes and connections."
   ],
   [
    "Azure Monitor Agent (AMA)",
    "The current agent that collects guest OS logs and performance data from VMs and Arc-enabled servers."
   ],
   [
    "Data collection rule (DCR)",
    "An Azure resource defining what data to collect, how to transform it and where to send it."
   ],
   [
    "Data collection rule association",
    "The link between a DCR and a VM or other resource that makes the agent apply that rule."
   ],
   [
    "Dependency agent",
    "An agent required for the VM insights Map view to discover processes and network connections."
   ],
   [
    "Transformation",
    "A KQL statement in a DCR that filters or modifies incoming data before it is stored."
   ],
   [
    "Storage insights",
    "An insight that shows capacity, transactions, availability and latency across storage accounts from platform metrics."
   ]
  ],
  "example": "A hosting company notices memory pressure complaints but Metrics explorer shows no memory metric for its VMs, because memory usage is a guest OS counter. The administrator creates a data collection rule that gathers Available MBytes and % Committed Bytes In Use every minute, associates it with all web servers through an Azure Policy assignment, and uses VM insights Performance to find three servers constantly near their memory limit.",
  "mistakes": [
   [
    "Installing the Azure Monitor Agent is enough to start collecting event logs.",
    "AMA collects according to data collection rules. Until a DCR that defines the events and destination is associated with the VM, no event data is sent."
   ],
   [
    "Memory usage is a platform metric available in Metrics explorer for every VM.",
    "Memory used inside the guest is an operating system counter. Collect it with AMA and a DCR, then view it in VM insights or the workspace."
   ],
   [
    "Storage insights requires installing an agent or diagnostic setting before it shows anything.",
    "Storage insights is built on platform metrics, which Azure collects automatically, so it works with no extra setup."
   ],
   [
    "The VM insights Map view works as soon as VM insights is enabled.",
    "The Map view also needs the Dependency agent to discover processes and connections. Without it you get Performance charts but no map."
   ]
  ],
  "tryit": [
   [
    "Heartbeats from vm-web03 arrive in the workspace every minute, but none of the Application log errors you expect show up, while vm-web01 and vm-web02 report them fine. All three should be using the same DCR. What do you check first?",
    "Check whether vm-web03 is associated with the DCR that collects Application log errors. Heartbeats prove the agent is installed and connected to the workspace, so the most likely gap is the missing data collection rule association on that one VM."
   ],
   [
    "Granite Insurance is charged heavily for a Windows informational event that appears thousands of times an hour and that nobody uses, but it must keep collecting warnings and errors from the same log. What is the most direct fix?",
    "Add a KQL transformation to the data collection rule that filters out that event ID before ingestion, or narrow the DCR's event selection. Data dropped before storage is not billed as ingested data, and the warnings and errors still flow."
   ]
  ],
  "tip": "The Azure Monitor Agent collects nothing until a data collection rule is associated with the machine. The VM insights Map view needs the Dependency agent, and storage insights uses platform metrics with no agent at all.",
  "check": [
   [
    "You installed the Azure Monitor Agent on a VM but no events arrive in the workspace. What is most likely missing?",
    "A data collection rule associated with the VM that defines the events and the destination workspace."
   ],
   [
    "Which extra component does the VM insights Map view require?",
    "The Dependency agent, in addition to the Azure Monitor Agent."
   ],
   [
    "Can one data collection rule apply to many VMs?",
    "Yes. A DCR can be associated with many machines, and one machine can have several DCRs."
   ],
   [
    "How can you reduce ingestion cost by dropping unneeded events before they are stored?",
    "Add a KQL transformation to the data collection rule that filters out those events."
   ],
   [
    "How do you make sure every new VM gets AMA and the baseline DCR automatically?",
    "Assign an Azure Policy initiative that installs the agent and creates the data collection rule association."
   ]
  ]
 },
 {
  "t": "Network Watcher and Connection Monitor",
  "hook": "Every evening around eight, customers of Copper Kettle Goods report that checkout spins for ten seconds before the payment goes through. By the time Sam on the network team logs in to test, everything is fast again. Each morning Sam runs a quick connectivity check from the web servers to the on-premises database and the partner payment service, and each morning it passes. The business owner is losing patience: 'If it works when you look, how will you ever find it?' One-off tests clearly are not enough. What tool watches the connection all day and all night, keeps the history, and shows exactly where along the path the delay begins?",
  "simple": "Network Watcher is Azure's toolbox for checking networks. Some tools are like a quick phone call to see if someone answers right now: they test a connection once. Connection Monitor is different. It is like a nurse checking a patient's pulse every few seconds, all day, and writing every reading on a chart. It keeps sending small test messages between two places, such as your web server and a partner's website, and records how long each one takes and how many get lost. Later you can look back at the chart and see that the slowdown happens every evening at the same step along the route. You can also be alerted the moment the readings get bad.",
  "body": [
   "Azure Network Watcher is the regional service that provides monitoring, diagnostic and logging tools for resources in Azure virtual networks, such as virtual machines (VMs), VPN (virtual private network) gateways and application gateways. It is enabled automatically in each region when you create or update a virtual network there, and appears in the portal as a resource called `NetworkWatcher_<region>` in a resource group named `NetworkWatcherRG`. It monitors the network path and configuration, not the application running on your VMs, so it tells you whether packets get through and how fast, not why your code is slow.",
   "Its tools fall into three groups. Monitoring includes Topology, which draws the resources in a network and how they connect, and Connection Monitor, for continuous checks. The network diagnostic tools are used for one-off investigations: IP flow verify, NSG (network security group) diagnostics, next hop, effective security rules, connection troubleshoot, packet capture (which captures traffic to and from a VM into a file for analysis) and VPN troubleshoot (which diagnoses a VPN gateway or connection). The traffic group includes flow logs, which record the IP traffic flowing through NSGs or virtual networks, and traffic analytics, which processes flow logs in a Log Analytics workspace to show traffic patterns, top talkers and unusual flows. Virtual network flow logs are the successor to the older NSG flow logs, which are being retired.",
   "Connection Monitor provides continuous, end-to-end monitoring of connectivity between endpoints. The difference from the diagnostic tools is time. Connection troubleshoot answers 'can I connect right now?', while Connection Monitor answers 'has this connection been healthy all week, and how fast was it?'. It is the tool for tracking latency and packet loss between an application's tiers, between Azure and on-premises, or from Azure to an external endpoint such as a partner API (application programming interface).",
   "You build a connection monitor from test groups. Each test group has three parts. Sources are the machines that send tests, such as Azure VMs or scale sets with the Network Watcher agent extension, or on-premises and Arc-enabled machines with the Azure Monitor Agent. Destinations are the targets, such as Azure VMs, IP addresses, URLs or fully qualified domain names (FQDNs). Test configurations set the protocol (TCP, HTTP or ICMP), port, test frequency and success thresholds, for example 'checks failed below 5 percent and round-trip time below 100 milliseconds'. Connection Monitor runs the tests continuously and stores the results in a Log Analytics workspace.",
   "Results appear in the Connection Monitor dashboard. You see the state of each source and destination pair, charts of round-trip time and checks failed, and a hop-by-hop topology showing where along the path a problem occurs, such as a drop at a firewall or high latency at an internet provider hop. Connection Monitor emits metrics, so you can create metric alert rules on them, for example alerting when ChecksFailedPercent exceeds a threshold, and route the alerts through action groups to email, SMS or a ticketing system. Because results are in a workspace, you can also query them with KQL (Kusto Query Language) for longer-term reports.",
   "Consider a worked example. An online shop in Azure calls a partner's payment API and a database on-premises over a site-to-site VPN. Customers occasionally report slow checkouts in the evening. The network team creates a connection monitor with two test groups: the web VMs to the partner API URL on HTTPS port 443, and the web VMs to the on-premises database IP address on TCP 1433, each tested every 30 seconds with a threshold of 150 milliseconds round-trip time. They add a metric alert on checks failed. Two days later the dashboard shows latency to the database climbing every evening at a hop inside the VPN path. Running VPN troubleshoot on the gateway reveals a tunnel renegotiating repeatedly, which the provider fixes.",
   "Notice how the tools worked together in that example. Connection Monitor found the pattern and the location over time, and a one-off diagnostic tool, VPN troubleshoot, confirmed the cause. That combination is typical: continuous monitoring to detect and localize, diagnostic tools to explain.",
   "Several mistakes trip people up. They use connection troubleshoot when the question asks for ongoing monitoring with history. They forget the Network Watcher agent extension on Azure VM sources. They expect Connection Monitor to explain which NSG rule blocked traffic, which is the job of IP flow verify. They delete the `NetworkWatcherRG` resource group and then wonder why tools stop working in a region. And they expect flow logs to show packet contents, when flow logs record flow metadata such as addresses, ports and allow or deny decisions; packet capture is the tool that records actual packets.",
   "Exam questions map needs to tools. A one-time 'why can't this VM connect?' points to IP flow verify, next hop or connection troubleshoot. 'Continuously monitor latency and packet loss' or 'alert when connectivity to an endpoint degrades' points to Connection Monitor. 'Analyze who talked to whom' or 'identify top talkers' points to flow logs with traffic analytics. 'Site-to-site tunnel is down' points to VPN troubleshoot. 'Capture traffic for Wireshark analysis' points to packet capture, and 'visualize resources and connections' points to Topology."
  ],
  "analogy": "Connection troubleshoot is like calling a friend once to see if they pick up. Connection Monitor is like a fitness tracker on your wrist: it measures your heart rate every few seconds, keeps weeks of history, buzzes when the reading crosses a limit, and lets you see that your pulse spikes every evening at the same time. The hop-by-hop topology is like a delivery tracking map showing which depot the parcel got stuck in. The tracker shows that something is wrong and where, but like a doctor ordering a specific test, you still use a diagnostic tool such as VPN troubleshoot or IP flow verify to learn why.",
  "terms": [
   [
    "Network Watcher",
    "A regional service offering monitoring, diagnostic and traffic logging tools for Azure networks."
   ],
   [
    "Connection Monitor",
    "A Network Watcher feature that continuously tests connectivity, latency and packet loss between endpoints."
   ],
   [
    "Test group",
    "A Connection Monitor unit combining sources, destinations and test configurations."
   ],
   [
    "Test configuration",
    "The protocol, port, frequency and success thresholds used for Connection Monitor checks."
   ],
   [
    "Network Watcher agent extension",
    "The VM extension required for an Azure VM to act as a Connection Monitor source."
   ],
   [
    "Flow logs",
    "Records of IP traffic flows through NSGs or virtual networks, stored in a storage account."
   ],
   [
    "Traffic analytics",
    "A feature that processes flow logs in Log Analytics to show traffic patterns and top talkers."
   ],
   [
    "VPN troubleshoot",
    "A diagnostic tool that checks the health of a VPN gateway or connection and reports issues."
   ]
  ],
  "example": "A bank must prove that its Azure web tier can reach an on-premises fraud-checking service within 50 milliseconds at all times. The network team sets up Connection Monitor with a test group from the web VMs to the service's IP address on TCP 8443, a threshold of 50 milliseconds, and a metric alert that pages the network on-call engineer through an action group whenever the threshold is breached for five minutes.",
  "mistakes": [
   [
    "Connection troubleshoot is the right tool to track latency to an endpoint over a week.",
    "Connection troubleshoot is a one-off test of connectivity right now. Continuous measurement with history and alerting is Connection Monitor."
   ],
   [
    "Connection Monitor will tell you which NSG rule blocked the traffic.",
    "Connection Monitor shows that checks fail and where on the path. To identify the specific allow or deny rule, use IP flow verify or NSG diagnostics."
   ],
   [
    "Flow logs let you read the contents of packets.",
    "Flow logs record metadata such as source and destination addresses, ports, protocol and whether traffic was allowed or denied. Use packet capture to record actual packets."
   ],
   [
    "Any Azure VM can be a Connection Monitor source without extra setup.",
    "Azure VM sources need the Network Watcher agent extension. On-premises and Arc-enabled sources use the Azure Monitor Agent."
   ]
  ],
  "tryit": [
   [
    "Hollow Pine Games runs game servers in Azure that call a third-party matchmaking service by its FQDN over HTTPS. Players sometimes report lag, and the operations lead wants a record of response times every minute, plus a text message to on-call when failures exceed 10 percent. What do you configure?",
    "A Connection Monitor test group with the game server VMs (with the Network Watcher agent extension) as sources, the matchmaking FQDN as destination, and an HTTP or TCP test on port 443 every minute. Then create a metric alert on checks failed percent above 10 with an action group that sends SMS to on-call."
   ],
   [
    "A developer reports that a VM cannot reach a database VM on port 1433 right now and asks you to set up Connection Monitor so you can investigate. Is that the best first step?",
    "No. For an immediate 'cannot connect' problem, use one-off diagnostics: IP flow verify or NSG diagnostics to see whether a rule blocks port 1433, next hop to check routing, or connection troubleshoot for an end-to-end test. Connection Monitor is for ongoing monitoring and history."
   ]
  ],
  "tip": "Connection Monitor is for continuous monitoring with history and alerts; connection troubleshoot is a one-off test. Azure VM sources need the Network Watcher agent extension, and results are stored in a Log Analytics workspace.",
  "check": [
   [
    "Which tool continuously measures latency and packet loss from Azure VMs to an on-premises server and keeps history?",
    "Connection Monitor in Network Watcher."
   ],
   [
    "What must be installed on an Azure VM used as a Connection Monitor source?",
    "The Network Watcher agent VM extension."
   ],
   [
    "Which Network Watcher feature helps identify the top talkers across a network over the past week?",
    "Flow logs analyzed with traffic analytics in a Log Analytics workspace."
   ],
   [
    "A site-to-site VPN connection keeps dropping. Which Network Watcher tool diagnoses it?",
    "VPN troubleshoot, which checks the gateway and connection health and returns detailed logs."
   ],
   [
    "Where are Connection Monitor test results stored?",
    "In a Log Analytics workspace, and Connection Monitor also emits metrics you can alert on."
   ]
  ]
 },
 {
  "t": "Recovery Services vault vs Backup vault and what each protects",
  "hook": "It is your second week at Northgate Veterinary Group, and the project list from your manager, Carla, reads like a shopping list: protect the twenty clinic VMs, the SQL Server database on one of them, the shared Azure file share, the reception laptops' Documents folders, the managed disks behind the imaging scale set, and the storage account full of signed consent forms. You open the portal, type 'vault', and Azure offers you two different kinds. You create one, try to add a managed disk, and it is not even in the list of options. Carla wants a plan by Friday. Which vault holds which workload, and what settings must you get right before the first backup runs?",
  "simple": "A backup vault in Azure is like a safe deposit box room at a bank, where Azure keeps copies of your data and the rules for how long to keep them. You never handle the shelves inside; Azure manages them. The catch is that Azure has two kinds of rooms. The older kind, the Recovery Services vault, is for whole servers and the things running on them, plus file shares and office computers. The newer kind, the Backup vault, is for newer types of data, such as individual disks, blob storage, some managed databases and Kubernetes clusters. Each room only accepts certain items. You also have to choose, before you store anything, whether copies are kept in one building or also in a distant city, because you cannot change it later.",
  "body": [
   "Azure Backup protects data by taking backups on a schedule and storing them in a vault, a storage entity managed by Azure that holds recovery points and backup policies. You never manage the underlying storage accounts yourself; Azure handles the capacity, replication and security of the stored copies. Azure has two kinds of vault, and each supports a different set of workloads. Picking the right vault for a data source is a classic AZ-104 exam question, because you cannot, for example, back up an Azure virtual machine (VM) into a Backup vault, or managed disks as standalone items into a Recovery Services vault.",
   "A Recovery Services vault is the original vault type, and it is centered on servers and what runs on them. It protects Azure VMs (Windows and Linux, the whole VM including all its disks); SQL Server and SAP HANA databases running inside Azure VMs; Azure Files shares; on-premises files, folders and system state through the MARS (Microsoft Azure Recovery Services) agent; and on-premises workloads through Microsoft Azure Backup Server (MABS) or System Center Data Protection Manager (DPM). A Recovery Services vault is also where Azure Site Recovery replication is configured, so the same vault type serves both backup and disaster recovery.",
   "A Backup vault is the newer vault type, used by newer data sources. It protects Azure managed disks (Azure Disk Backup, using incremental snapshots), Azure Blobs (operational and vaulted backup), Azure Database for PostgreSQL and Azure Kubernetes Service (AKS) clusters, among others. If a question asks where to back up individual managed disks on a frequent schedule, or blob data against accidental deletion or corruption, the answer is a Backup vault. The two vault types even live under different resource providers, which shows up clearly when you create each one from the command line:",
   "```bash\naz backup vault create --resource-group rg-bcdr --name rsv-prod-weu --location westeurope\naz dataprotection backup-vault create --resource-group rg-bcdr --vault-name bv-prod-weu \\\n  --location westeurope --type SystemAssigned \\\n  --storage-settings \"[{type:'LocallyRedundant',datastore-type:'VaultStore'}]\"\n```",
   "Some rules apply to both vault types, and the first is about location. The vault should be in the same region as the resources it protects, and for Azure VM backup it must be. If you create a vault in North Europe and try to protect a VM in West Europe, the VM simply does not appear in the list of items you can select.",
   "The second shared rule is about redundancy. You choose the vault's backup storage redundancy: locally redundant storage (LRS), zone-redundant storage (ZRS) or geo-redundant storage (GRS). Set it before protecting the first item, because it cannot be changed after items are protected. GRS is needed if you want cross-region restore, the ability to restore in the paired secondary region. LRS is cheaper and may suit test workloads, but it keeps copies only in one datacenter region.",
   "Both vault types also share security and management features. Both support soft delete, immutability and role-based access control (RBAC) roles such as Backup Contributor, Backup Operator and Backup Reader, so you can let a help desk team run backups and restores without letting them remove backup data or create vaults. You manage everything from one place: the Business Continuity Center in the portal (the successor to Backup center) gives a single view of protected items, jobs, policies and vaults across both vault types, subscriptions and regions. You can also configure backup directly from a resource, for example on a VM's Backup blade, where you pick or create a vault and a policy.",
   "Consider a worked example. A company in West Europe needs to protect twenty Azure VMs, a SQL Server database running on one of them, an Azure file share, a laptop fleet's Documents folders, a set of managed disks used by a scale set, and a storage account holding contracts. The administrator creates a Recovery Services vault in West Europe for the VMs, the SQL database (as a SQL in Azure VM workload), the file share and the MARS agent backups. She creates a Backup vault in West Europe for the managed disks and blob backup. Both vaults are set to geo-redundant storage before the first item is protected, because the auditors require cross-region restore.",
   "Watch for these mistakes: choosing a Backup vault for Azure VMs; creating the vault in a different region from the VMs and then finding the VMs do not appear; trying to change storage redundancy after items are protected; confusing Azure Site Recovery (replication for disaster recovery) with Azure Backup (point-in-time copies), even though both use a Recovery Services vault; and assuming a new data source uses the older vault type without checking.",
   "Exam wording gives the answer away. 'Azure VM', 'SQL Server in an Azure VM', 'Azure Files', 'MARS agent', 'on-premises files and folders' or 'Site Recovery' means a Recovery Services vault. 'Managed disks', 'blobs', 'Azure Database for PostgreSQL' or 'AKS' means a Backup vault. 'Vault in another region cannot see the VM' means the vault must be in the VM's region. 'Must restore in the paired region' means geo-redundant storage set before protection. A simple memory aid: Recovery Services vault for servers and what runs in them; Backup vault for newer PaaS (platform as a service) and storage data sources."
  ],
  "analogy": "Think of two storage facilities run by the same company. The older one has big garage bays sized for whole vehicles, so it takes entire servers, the files on office computers and file shares, and it also runs the company's spare-car service (Site Recovery). The newer facility has racks designed for particular modern items, such as individual disks, blob containers, databases and Kubernetes clusters. You cannot drive a whole car into the newer racks, and the older bays will not accept a loose disk on its own. In both, you pick at sign-up whether copies are mirrored to a facility in another city, and that choice is locked once your first item is stored.",
  "mnemonic": "Recovery Services vault: \"servers and what runs in them\" (VMs, SQL and SAP HANA in VMs, Azure Files, MARS, MABS and DPM, Site Recovery). Backup vault: \"newer data sources\" (disks, blobs, PostgreSQL, AKS).",
  "terms": [
   [
    "Azure Backup",
    "The Azure service that takes scheduled, policy-driven backups and stores recovery points in a vault."
   ],
   [
    "Recovery Services vault",
    "The vault type for Azure VMs, SQL and SAP HANA in VMs, Azure Files, MARS, MABS and DPM, and Azure Site Recovery."
   ],
   [
    "Backup vault",
    "The newer vault type for data sources such as managed disks, blobs, Azure Database for PostgreSQL and AKS."
   ],
   [
    "MARS agent",
    "The Microsoft Azure Recovery Services agent that backs up files, folders and system state from Windows machines."
   ],
   [
    "Backup storage redundancy",
    "The vault's LRS, ZRS or GRS setting, which must be chosen before the first item is protected."
   ],
   [
    "Business Continuity Center",
    "The portal hub that manages backup and disaster recovery across vault types, subscriptions and regions."
   ],
   [
    "Backup Operator",
    "An Azure RBAC role that can manage backups and restores, except removing backups, creating vaults or granting access to others."
   ]
  ],
  "example": "A hospital's cloud team is asked to protect a new AKS cluster and the managed disks of its imaging servers with frequent backups, alongside its existing VM backups. They discover the Recovery Services vault they already use cannot hold these data sources, so they create a Backup vault in the same region with the right storage redundancy, configure AKS backup and Azure Disk Backup there, and view both vaults together in the Business Continuity Center.",
  "mistakes": [
   [
    "A Backup vault is just the newer version of the same thing, so it can protect Azure VMs.",
    "Azure VM backup uses a Recovery Services vault. The Backup vault supports a different set of newer data sources such as managed disks, blobs, PostgreSQL and AKS."
   ],
   [
    "You can create one central vault in any region and protect VMs from all regions.",
    "For Azure VM backup the vault must be in the same region as the VMs. A vault in another region will not list them."
   ],
   [
    "Storage redundancy can be switched from LRS to GRS later when auditors ask for it.",
    "Redundancy must be set before the first item is protected and cannot be changed afterward. Plan for GRS up front if cross-region restore may be needed."
   ],
   [
    "Because Site Recovery uses a Recovery Services vault, it is the same as backup.",
    "Site Recovery continuously replicates workloads for failover, while Azure Backup keeps point-in-time recovery points. They share the vault type but solve different problems."
   ]
  ],
  "tryit": [
   [
    "Silverline Realty wants backups for a Linux VM running a web app, its Azure Database for PostgreSQL server, and a blob container of scanned leases, all in East US. The compliance officer says copies must be restorable in the paired region. How many vaults of which type do you create, and what redundancy setting do you choose before protection?",
    "Two vaults in East US: a Recovery Services vault for the Linux VM, and a Backup vault for the PostgreSQL server and the blob container. Set both to geo-redundant storage before protecting any item, because GRS is required for cross-region restore and cannot be added afterward."
   ],
   [
    "A colleague created a Recovery Services vault in Central US to protect VMs that live in South Central US, and reports that the VMs do not appear when configuring backup. What is wrong and what is the fix?",
    "For Azure VM backup the vault must be in the same region as the VMs. Create a Recovery Services vault in South Central US and protect the VMs there."
   ]
  ],
  "tip": "Azure VMs, Azure Files, SQL in VMs, MARS and Site Recovery use a Recovery Services vault. Managed disks, blobs, PostgreSQL and AKS use a Backup vault. Set storage redundancy before the first item is protected.",
  "check": [
   [
    "Which vault type do you need to back up an Azure VM running SQL Server, including the database itself?",
    "A Recovery Services vault, which supports both Azure VM backup and SQL Server in Azure VM backup."
   ],
   [
    "Where do you configure Azure Disk Backup for individual managed disks?",
    "In a Backup vault."
   ],
   [
    "Why might a VM not appear when you try to add it to a Recovery Services vault?",
    "The vault is in a different region; for Azure VM backup, the vault must be in the same region as the VM."
   ],
   [
    "When should you set a vault's storage redundancy to geo-redundant?",
    "Before protecting any items, because it cannot be changed after items are protected, and it is required for cross-region restore."
   ],
   [
    "Which portal experience gives one view of backup items across both vault types and multiple subscriptions?",
    "The Business Continuity Center, the successor to Backup center."
   ]
  ]
 },
 {
  "t": "Backup policies (standard and enhanced), on-demand backup, soft delete and cross-region restore",
  "hook": "At 6:15 a.m. on a Monday, Theo, the IT lead at Brookside Accounting, calls you in a panic. Overnight, someone using a compromised admin account stopped protection on the billing VM and deleted its backup data. The same week, the partners had asked for backups every four hours because a day's lost invoices would be a disaster, and the auditors had asked how the firm would recover if the whole region went down. Theo assumes everything is gone. You take a breath and open the vault. Whether this is a bad morning or a catastrophe depends on choices made weeks ago. Which settings decide that?",
  "simple": "A backup policy is a timetable plus a keep-or-throw-away rule: \"take a copy every night and keep each copy for 30 days.\" The standard timetable allows one copy a day. The enhanced timetable allows several copies a day, so you lose less work if something breaks. You can also take an extra copy whenever you like, such as before a big update, and decide separately how long to keep it. Soft delete is like a recycle bin for backups: if someone deletes them, Azure quietly keeps them for 14 days so you can bring them back. Cross-region restore means a copy of your backups also lives in a faraway region, so you can rebuild there if your main region has a disaster.",
  "body": [
   "A backup policy defines when backups run and how long recovery points are kept. You attach one policy to many protected items, so changing the policy updates them all. The default policy for Azure virtual machines (VMs) takes one backup a day and keeps it for 30 days, but you will normally create your own to match business requirements. Two requirements drive the design: the recovery point objective (RPO, the maximum acceptable data loss measured in time) and compliance retention periods, such as keeping month-end copies for years.",
   "For Azure VMs there are two policy types, and the first is the standard policy. It allows one scheduled backup per day (or per week) at a set time, with retention rules for daily, weekly, monthly and yearly recovery points. For example, you might keep dailies for 30 days, Sunday weeklies for 12 weeks and first-of-month monthlies for 12 months. That layered retention, sometimes called grandfather-father-son, gives you many recent points and a few long-term ones without storing every daily copy for years.",
   "The enhanced policy is the second type. It allows multiple backups per day, such as every 4 hours, for workloads needing a lower RPO. Microsoft requires it for some newer VM configurations, such as Trusted Launch VMs and VMs with Premium SSD v2 or Ultra disks, so for those VMs the standard policy is not an option. Both policy types keep recent recovery points as snapshots for a configurable period, a feature called instant restore, so restores from recent points are fast, while older points are restored from the vault.",
   "An on-demand backup, labeled Backup now in the portal, takes an extra backup outside the schedule, for example before an operating system upgrade or a risky application change. You specify how long to keep it with a retain-until date, separately from the policy's retention rules. The first backup of a newly protected VM is often run on demand so you have protection straight away instead of waiting for the scheduled time:",
   "```bash\naz backup protection enable-for-vm --resource-group rg-bcdr --vault-name rsv-prod-weu \\\n  --vm vm-app1 --policy-name DailyPolicy-30d\naz backup protection backup-now --resource-group rg-bcdr --vault-name rsv-prod-weu \\\n  --container-name vm-app1 --item-name vm-app1 --backup-management-type AzureIaasVM \\\n  --retain-until 31-12-2026\n```",
   "Soft delete protects backups from accidental or malicious deletion. When backup data is deleted, for example by stopping protection and choosing to delete data, it is kept in a soft-deleted state for 14 days by default at no charge, and can be undeleted so protection resumes. Enhanced soft delete lets you choose a longer retention period and make soft delete always-on so it cannot be turned off, which defends against attackers who compromise an administrator account and try to disable it before deleting backups.",
   "Related protections add further layers. Immutable vaults block operations that could lose recovery points, such as reducing retention. Multi-user authorization (MUA) with Resource Guard requires a second person's approval for critical operations such as disabling soft delete, so a single compromised account is not enough. Together these features are the core of ransomware resilience for backups.",
   "Cross-region restore (CRR) covers regional disasters. It lets you restore Azure VMs, and some other data sources, in the Azure paired secondary region using backup data replicated there. It needs a vault with geo-redundant storage (GRS) and the cross-region restore setting enabled. You can use it at any time, for a real regional outage or for a drill, without waiting for Microsoft to declare a disaster. The replicated recovery points lag slightly behind the primary region, so the newest point may not yet be available in the secondary region.",
   "Consider a worked example. An accounting firm's billing VM needs backups every four hours during the working day, three months of daily points and seven years of month-end points; ransomware is its top concern; and it must survive a regional outage. The administrator creates an enhanced policy with a 4-hour schedule, daily retention of 90 days and monthly retention of 84 months. The vault uses GRS with cross-region restore enabled, enhanced soft delete set to always-on, and Resource Guard so that a second person must approve any attempt to reduce protection. Before a major application update, she runs Backup now with a retain-until date two weeks away.",
   "Exam wording is direct. 'Back up every four hours', 'Trusted Launch VM' or 'Ultra disks' means the enhanced policy. 'Extra backup before a change' means an on-demand backup with its own retention. 'Recover backups deleted by mistake' means soft delete, and 'prevent an attacker from disabling soft delete' means always-on enhanced soft delete, immutability or multi-user authorization. 'Restore in the secondary region without waiting for Microsoft' means cross-region restore on a GRS vault. Common traps include expecting a standard policy to run more than once a day, assuming an on-demand backup follows the policy's retention, forgetting that CRR needs GRS set before protection, and turning off soft delete in a lab and forgetting to turn it back on."
  ],
  "analogy": "Think of a photo library. The backup policy is your phone's automatic setting: snap a copy every night (standard) or every few hours (enhanced), keep dailies for a month and one per month for years. Backup now is taking a deliberate photo before you repaint a room and pinning it until a chosen date. Soft delete is the Recently Deleted album that keeps photos for a while after you delete them; always-on soft delete is an album you cannot empty early, even if someone steals your phone. Cross-region restore is your cloud copy in another city. The analogy breaks on timing: the distant copy in Azure lags slightly behind.",
  "terms": [
   [
    "Backup policy",
    "A reusable schedule and retention definition applied to many protected items."
   ],
   [
    "Standard policy",
    "An Azure VM backup policy allowing one scheduled backup per day or per week with daily, weekly, monthly and yearly retention."
   ],
   [
    "Enhanced policy",
    "An Azure VM backup policy supporting multiple backups per day and required for some newer VM types such as Trusted Launch."
   ],
   [
    "On-demand backup",
    "A manual backup taken outside the schedule with its own retain-until date."
   ],
   [
    "Instant restore",
    "Keeping recent recovery points as snapshots so they can be restored quickly."
   ],
   [
    "Soft delete",
    "Retaining deleted backup data for a period, 14 days by default, so it can be recovered."
   ],
   [
    "Cross-region restore (CRR)",
    "Restoring from backup data replicated to the paired region, requiring GRS and the CRR setting."
   ],
   [
    "Multi-user authorization (MUA)",
    "A protection using Resource Guard that requires a second authorized person for critical backup operations."
   ]
  ],
  "example": "An attacker who compromised an administrator account stops protection on several VMs and deletes their backup data. Because the vault had enhanced soft delete set to always-on with a 30-day retention, the recovery points are still present in a soft-deleted state. The security team undeletes them, resumes protection and restores the VMs to a point before the intrusion, then enables multi-user authorization so a single account can never do this again.",
  "mistakes": [
   [
    "A standard policy can be set to back up a VM every four hours.",
    "The standard policy allows only one scheduled backup per day or per week. Multiple daily backups require the enhanced policy."
   ],
   [
    "An on-demand backup is kept according to the policy's daily retention.",
    "An on-demand backup uses its own retain-until date chosen when you start it, independent of the policy's retention rules."
   ],
   [
    "Once backup data is deleted it is gone immediately.",
    "Soft delete keeps deleted backup data for 14 days by default, and enhanced soft delete can extend that and make it always-on."
   ],
   [
    "Cross-region restore works on any vault as long as you enable it during a disaster.",
    "CRR needs a vault with geo-redundant storage, which must be chosen before items are protected, plus the cross-region restore setting enabled."
   ]
  ],
  "tryit": [
   [
    "Elmwood Legal is deploying a new Trusted Launch VM for its case management system. The partners want backups twice a day and month-end copies kept for ten years. A junior admin suggests cloning the existing standard daily policy and adding a second backup time. What should you do instead?",
    "Create an enhanced policy. Trusted Launch VMs require the enhanced policy, and only enhanced policies support more than one backup per day. Configure a 12-hour schedule and add a monthly retention rule of 120 months."
   ],
   [
    "After a phishing incident, the security team worries that an attacker with a stolen Backup Contributor account could disable soft delete and then delete every backup. Which two controls best address that risk?",
    "Enable enhanced soft delete in always-on mode so it cannot be turned off, and enable multi-user authorization with Resource Guard so critical operations require approval from a second person. Making the vault immutable adds another layer by blocking operations that would lose recovery points."
   ]
  ],
  "tip": "More than one backup a day, Trusted Launch VMs or Premium SSD v2 and Ultra disks point to the enhanced policy. Cross-region restore requires GRS plus the CRR setting, and soft-deleted backups are kept for 14 days by default.",
  "check": [
   [
    "A VM needs a backup every 4 hours. Which policy type is required?",
    "The enhanced policy, because the standard policy allows only one scheduled backup per day."
   ],
   [
    "How long is soft-deleted backup data kept by default?",
    "14 days, during which it can be undeleted and protection resumed."
   ],
   [
    "What two things are needed to restore an Azure VM in the paired region?",
    "A vault with geo-redundant storage and the cross-region restore setting enabled."
   ],
   [
    "How is retention set for an on-demand backup?",
    "With a retain-until date chosen when you start the backup, separate from the policy's retention rules."
   ],
   [
    "What does multi-user authorization add to backup security?",
    "It uses Resource Guard to require a second authorized person to approve critical operations, such as disabling soft delete."
   ]
  ]
 },
 {
  "t": "Restoring VMs, disks and individual files",
  "hook": "Three tickets land in your queue at Willow Creek Library District before lunch. Marcus in finance deleted a folder of budget spreadsheets from the file server last Tuesday. A Windows patch has left the catalog server unable to boot, and its name, IP address and firewall rules must not change because a dozen systems point at it. And an auditor wants a copy of the database server exactly as it was at month-end, in an isolated network, on a bigger VM size. All three servers are backed up, but restoring every one of them the same way would be slow, risky or simply wrong. Which restore option fits each request?",
  "simple": "Having a backup is only half the job; getting things back is the other half. Azure gives you several ways to restore a virtual machine, a bit like ways to recover after a kitchen flood. If only a couple of plates broke, you replace those plates: that is File Recovery, where you open an old backup like a temporary drive and copy back just the files you need. If the kitchen is fine but the contents are ruined, you restock the same kitchen: that is Replace existing, which puts old disks back into the same machine. If you want a brand new kitchen quickly, you build one: Create new. If you want the parts to build a custom kitchen, you get the cabinets delivered: Restore disks.",
  "body": [
   "A backup is only as good as your ability to restore it. Azure Backup offers several restore types for Azure virtual machines (VMs), and each fits a different situation. You start a restore from the vault's backup item or from the VM's Backup blade and choose a recovery point. Recovery points can be crash-consistent, file-system consistent or application-consistent, and the most recent ones are often available as instant restore snapshots, which restore fastest. Then you choose a restore type. Knowing which restore type matches a scenario is exactly what the AZ-104 exam tests.",
   "Create new virtual machine is the simplest option. It builds a new VM from the recovery point, in a virtual network and subnet you choose, with a new name. It is the quickest way to get a working machine back with basic settings, but it offers limited customization, so you cannot, for example, pick every detail of the original deployment.",
   "Restore disks gives you the parts instead of a finished machine. It creates managed disks from the recovery point in a target resource group, using a staging storage account, and also produces a template you can customize to create the VM. Use it when you need settings the quick restore cannot handle, such as a specific size, availability set or extensions, or when you only want the disks, for example to attach one to another VM and copy data off it.",
   "Replace existing restores the disks over those of the existing VM, keeping the VM's configuration such as its name, network interface and IP settings. The VM must still exist, and Azure takes a snapshot of the current disks before replacing them so you can go back if needed. This is the natural choice when a VM is intact but its data is corrupted, for example after a failed update, and other systems depend on its identity.",
   "Cross-region restore performs the same operations in the paired secondary region, for vaults configured with geo-redundant storage and cross-region restore. Restoring a VM to a point in time before a ransomware infection is also why soft delete and immutability matter: attackers often try to destroy recovery points first, and the restore options are useless if the points are gone.",
   "Often you do not need the whole VM, just a few files. File Recovery lets you mount a recovery point as local drives. You select File Recovery, pick the recovery point and download a script, an executable for Windows or a Python script for Linux. Running it on a machine, either the original VM or another one with a compatible operating system, connects the recovery point's disks as volumes over iSCSI (Internet Small Computer Systems Interface). You browse them like any drive, copy the files you need, then select Unmount disks in the portal. The connection is kept only for a limited time, and the script requires outbound access to Azure endpoints, so a locked-down server may need a firewall exception or you can run the script on another machine.",
   "Other data sources restore differently. Azure Disk Backup in a Backup vault restores a snapshot as a new managed disk, which you then attach to a VM; it never overwrites the original disk. Azure Files backups can restore the whole share or individual files and folders, to the original location (overwriting or skipping conflicts) or to an alternate share. SQL Server in a VM can be restored to a specific point in time using log backups, either overwriting the database or as a new database. From the command line, `az backup recoverypoint list` shows the available recovery points for an item, and `az backup job list --operation Restore` lets you follow a restore job to completion.",
   "Consider a worked example with three requests on the same day. A user deleted a spreadsheet folder on the file server `vm-fs1` last Tuesday, so you use File Recovery for Tuesday's recovery point, run the script on `vm-fs1`, copy the folder back and unmount. A patch corrupted the operating system on `vm-app2`, but its name, IP address and firewall rules must stay the same, so you use Replace existing with the recovery point before the patch. An auditor wants a copy of `vm-db3` as it was at month-end, in an isolated network with a larger size, so you use Restore disks, then deploy the generated template with the size and network changed.",
   "Avoid the common mistakes: restoring a whole VM when only a few files are needed; choosing Create new when the VM's identity and IP address must stay the same; expecting Replace existing to work after the VM was deleted; forgetting to unmount File Recovery disks; and expecting a disk restore from a Backup vault to overwrite the original disk.",
   "In exam questions, 'a few files' or 'a single folder' means File Recovery. 'VM still exists but data is bad, keep configuration' means Replace existing. 'Custom settings' or 'only the disks' means Restore disks. 'Fastest way to get a new working VM' means Create new. 'Restore in the paired region' means cross-region restore."
  ],
  "analogy": "Restoring is like recovering from damage to a car. If you only lost something from the glovebox, you open last week's photo of the glovebox and copy what you need: File Recovery. If the car is fine but the engine is ruined, the garage swaps the engine and you keep the same plates and registration: Replace existing. If you want a working car fast, the dealer hands you a new one with standard options: Create new. If you need custom wheels and paint, they deliver the parts and a build sheet you can edit: Restore disks. Like a car swap, Replace existing needs the original car to still be there.",
  "mnemonic": "Match the restore to the damage: Files lost = File Recovery; Same VM, bad data = Replace existing; Custom build or just disks = Restore disks; Quick new VM = Create new.",
  "terms": [
   [
    "Recovery point",
    "A point-in-time copy of protected data from which you can restore."
   ],
   [
    "Create new virtual machine",
    "A restore type that quickly builds a new VM from a recovery point with basic settings."
   ],
   [
    "Restore disks",
    "A restore type that creates managed disks and a customizable template instead of a finished VM."
   ],
   [
    "Replace existing",
    "A restore type that overwrites an existing VM's disks while keeping its configuration."
   ],
   [
    "File Recovery",
    "A feature that mounts a recovery point as drives through a downloaded script so individual files can be copied."
   ],
   [
    "iSCSI",
    "Internet Small Computer Systems Interface, the protocol File Recovery uses to attach recovery point disks as volumes."
   ],
   [
    "Staging storage account",
    "A storage account used during Restore disks to hold data while managed disks are created."
   ]
  ],
  "example": "A legal assistant accidentally overwrites a contract template on a Windows file server VM. The administrator opens the VM's Backup blade, selects File Recovery, chooses the previous night's recovery point, downloads the executable script and runs it on the file server. A new drive letter appears with the old volume, she copies the template back to its folder, and then unmounts the disks from the portal. The whole task takes fifteen minutes and the VM never goes offline.",
  "mistakes": [
   [
    "Restoring the whole VM is the safest way to get back one deleted folder.",
    "A full restore is slow and can overwrite newer data. File Recovery mounts the recovery point so you copy back only the folder while the VM keeps running."
   ],
   [
    "Create new virtual machine is fine even when other systems depend on the VM's name and IP address.",
    "Create new builds a separate VM with a new name. When identity and network configuration must stay the same, use Replace existing."
   ],
   [
    "Replace existing can bring back a VM that was deleted.",
    "Replace existing requires the VM to still exist. For a deleted VM, use Create new or Restore disks."
   ],
   [
    "Restoring an Azure Disk Backup overwrites the original managed disk.",
    "Azure Disk Backup restores create a new managed disk from the snapshot, which you then attach to a VM."
   ]
  ],
  "tryit": [
   [
    "At Cedar Point Clinics, a Linux VM running the appointment app was accidentally deleted along with its network interface. Management wants it back today with the same VM size, an availability set and two VM extensions. Which restore type do you choose and why?",
    "Restore disks. Replace existing is impossible because the VM no longer exists, and Create new offers limited customization. Restore disks creates the managed disks plus a template you can edit to set the size, availability set and extensions before deploying."
   ],
   [
    "You run the File Recovery script on a hardened Windows server, but it fails to connect. The server blocks most outbound internet traffic. What are two ways forward?",
    "Allow the outbound access to the required Azure endpoints that the script needs, or run the script on a different machine with a compatible operating system and outbound access, then copy the files to the server over the network. Remember to unmount the disks afterward."
   ]
  ],
  "tip": "A few files means the File Recovery script. VM exists but data is bad means Replace existing. Custom VM settings or only the disks means Restore disks. A quick new VM means Create new, and disk backups in a Backup vault restore as new disks.",
  "check": [
   [
    "A user needs three files from last week's backup of a VM. Which restore option should you use?",
    "File Recovery, which mounts the recovery point as drives through a script so you can copy just those files."
   ],
   [
    "A VM's data is corrupted but its name and network configuration must stay the same. Which restore type fits?",
    "Replace existing, which restores the disks over the existing VM and keeps its configuration."
   ],
   [
    "When would you choose Restore disks instead of Create new virtual machine?",
    "When you need custom settings such as a specific size or availability set, or only want the disks to attach elsewhere."
   ],
   [
    "How is a managed disk protected by Azure Disk Backup restored?",
    "As a new managed disk created from the snapshot, which you then attach to a VM; the original disk is not overwritten."
   ],
   [
    "What protocol does File Recovery use to attach recovery point disks?",
    "iSCSI (Internet Small Computer Systems Interface)."
   ]
  ]
 },
 {
  "t": "Azure Site Recovery: replication to a secondary region, test failover, failover, commit and failback",
  "hook": "The regulator's letter arrives at Summit Ridge Insurance on a Wednesday: within 60 days, demonstrate that the claims system can run from a second Azure region, without disrupting production. Priya, the operations director, forwards it to you with one line: 'We have backups, right?' You do, but restoring six VMs from backup one at a time would take most of a day, and nobody has ever tried it. You also remember a colleague's horror story about a disaster recovery drill that knocked production offline because the test servers came up on the live network with the same names. How do you prove recovery works, in order, without touching production?",
  "simple": "Backups are like photos of your house you can use to rebuild later. Disaster recovery is more like keeping a ready-to-move-in twin house in another town, kept up to date every few minutes. Azure Site Recovery copies your servers continuously to another region. A test failover is a fire drill: you start the twin house in a sealed-off area to check it works, then tear the test down, while the real house carries on. A real failover is moving into the twin house during an actual emergency. Commit means \"we are staying here now.\" Re-protect starts copying back the other way, so that when the original town is safe, you can move back home, which is called failback.",
  "body": [
   "Backup protects data so you can restore it later; disaster recovery keeps whole workloads running when a region or site fails. Azure Site Recovery (ASR) continuously replicates virtual machines (VMs) to a secondary location so you can fail over to it. The recovery point objective (RPO, how much data you can lose) is typically minutes, and the recovery time objective (RTO, how long recovery takes) depends mostly on how fast the VMs start. ASR supports Azure VMs replicating to another Azure region, and on-premises Hyper-V, VMware and physical servers replicating to Azure. The AZ-104 exam focuses on Azure-to-Azure replication and the order of the steps.",
   "Setting up replication starts in the VM's Disaster recovery blade or in a Recovery Services vault. The vault must be in a different region from the source VMs, typically the target region, so that it survives the outage it is meant to cover. You choose the target region, resource group, virtual network, and the replication policy, which sets how long recovery points are retained and how often application-consistent snapshots are taken. Azure installs the Mobility service extension on the VM, uses a cache storage account in the source region to stage changes, and creates replica managed disks in the target region. Initial replication copies the full disks; after that only changes are sent. The VM shows as Protected when replication is healthy.",
   "A test failover is the safe way to prove it works. It creates VMs in the target region from a chosen recovery point, in a virtual network you choose. That network should be isolated from production so the test copies, which have the same names and often the same IP addresses, do not conflict with running systems. Replication continues during the test and production is unaffected. After checking the application, you run Cleanup test failover to delete the test VMs and stop paying for them. Regular test failovers, with documented results, are how you prove your disaster recovery plan to auditors.",
   "A failover is the real thing. Planned failovers are for expected events, such as an announced datacenter move, and can avoid data loss by shutting down the source first. Unplanned failovers are for outages. You choose a recovery point: Latest gives the lowest RPO because it processes all pending data first, but it is slower; Latest processed gives the fastest RTO; Latest app-consistent gives an application-consistent point; or you pick a custom point. ASR then creates the VMs in the target region.",
   "Recovery plans orchestrate failover for multi-tier applications. A recovery plan lets you fail over many VMs in order, such as databases first, then application servers, then web servers, with scripts or Azure Automation runbooks between groups to do things like update a DNS (Domain Name System) record or reconfigure a connection string. One click on the plan replaces a long manual checklist during a stressful outage.",
   "After a failover, the steps continue in a fixed order. The VMs keep a list of recovery points for a while, so you can switch to a different point with Change recovery point if the first one has a problem. When you are satisfied, you Commit the failover, which finalizes it and removes the other recovery points. The VMs now run in the secondary region without protection. Re-protect reverses replication so the secondary VMs replicate back to the primary region. When the primary region is healthy, you fail over again from secondary to primary, which is called failback, then commit, and re-protect once more to restore the original direction. The full cycle is: enable replication, test failover and cleanup, failover, commit, re-protect, failback, commit, re-protect.",
   "Consider a worked example. A logistics company runs a three-tier app in West Europe and must be able to run it in North Europe within an hour. The administrator creates a Recovery Services vault in North Europe, enables replication for the six VMs, and builds a recovery plan with three groups, SQL VMs, then app VMs, then web VMs, plus a runbook that updates a DNS record. Each quarter she runs a test failover into an isolated virtual network, has the application team sign off, then runs Cleanup test failover. When a real regional incident occurs, she runs an unplanned failover of the recovery plan using Latest processed, confirms the app works, commits, and re-protects. Two days later she fails back during a maintenance window.",
   "The common mistakes are worth memorizing. Running a test failover into the production virtual network causes IP or name conflicts. Forgetting Cleanup test failover leaves test VMs running and billing. Failing to commit leaves recovery points listed and the failover unfinished. Trying to fail back without re-protecting first does not work. Placing the vault in the same region as the source VMs defeats the purpose. And treating ASR as a replacement for backup is dangerous, because replicated corruption or deletion is copied to the target too; you still need point-in-time backups.",
   "Exam questions test the order and purpose of each step. 'Validate DR without affecting production' means test failover to an isolated network. 'Finalize the failover' means Commit. 'Start replicating back to the original region' means Re-protect. 'Return to the primary region' means failback after re-protect. 'Fail over VMs in a specific order' means a recovery plan. 'Lowest data loss' means Latest, and 'fastest recovery' means Latest processed."
  ],
  "analogy": "Site Recovery is like keeping a fully furnished twin apartment in another city, with a moving service that copies every change you make at home within minutes. A test failover is spending a night in the twin to check the heating works, with the doors sealed so the neighbors never notice, then cleaning up. A failover is moving in during an emergency; Commit is signing the lease; Re-protect is having the movers start copying from the twin back to your old home; failback is moving home once it is repaired. The analogy breaks in one important way: if you spill paint at home, the movers copy the spill too, which is why you still need backups.",
  "mnemonic": "Test, then two rounds of F-C-R: Failover, Commit, Re-protect; then Fail back, Commit, Re-protect.",
  "terms": [
   [
    "Azure Site Recovery (ASR)",
    "A service that continuously replicates workloads to a secondary location so they can fail over during an outage."
   ],
   [
    "RPO",
    "Recovery point objective, the maximum acceptable data loss measured in time."
   ],
   [
    "RTO",
    "Recovery time objective, the maximum acceptable time to restore service."
   ],
   [
    "Test failover",
    "A non-disruptive failover drill into an isolated network, removed afterwards with Cleanup test failover."
   ],
   [
    "Commit",
    "The step that finalizes a failover and discards the other recovery points."
   ],
   [
    "Re-protect",
    "Reversing replication after failover so the running VMs replicate back to the other region."
   ],
   [
    "Failback",
    "Failing over again from the secondary region to the primary region once it is healthy, after re-protecting."
   ],
   [
    "Recovery plan",
    "An ordered group of VMs, with optional scripts and runbooks, that fail over together."
   ]
  ],
  "example": "A regulator requires an insurance company to demonstrate disaster recovery twice a year. The company replicates its claims system to a secondary region with Azure Site Recovery and runs a test failover of its recovery plan into an isolated virtual network. Testers confirm the application opens and data is current to within minutes, the results are documented for the regulator, and the team runs Cleanup test failover. Production and replication are never interrupted.",
  "mistakes": [
   [
    "A test failover should use the production virtual network in the target region so it is realistic.",
    "Test VMs share names and often IP addresses with production. Use an isolated virtual network to avoid conflicts, then run Cleanup test failover."
   ],
   [
    "After a failover you can fail back straight away.",
    "You must commit and then re-protect so the VMs replicate back to the primary region. Failback is only possible once that reverse replication is in place."
   ],
   [
    "The Recovery Services vault for ASR should sit in the same region as the source VMs, like a backup vault.",
    "For Azure-to-Azure replication, the vault must be in a different region from the source VMs, typically the target region, so it survives a source region outage."
   ],
   [
    "Site Recovery replaces backups because it keeps a copy in another region.",
    "Replication copies corruption and deletions to the target too. Keep point-in-time backups alongside ASR."
   ]
  ],
  "tryit": [
   [
    "Juniper Freight has failed over its order system to the secondary region during an outage. The app works, but the team notices that the database looks about an hour older than expected and wonders if a newer point exists. They have not committed yet. What should they do?",
    "Use Change recovery point to try a different, more recent recovery point before committing. Once they commit, the other recovery points are removed and switching is no longer possible. After choosing the right point, commit and then re-protect."
   ],
   [
    "A three-tier app must come up with the database first, then the API servers, then the web front end, and a DNS record must be updated at the end. The on-call engineer wants a single action during an outage. What do you build?",
    "A recovery plan with three ordered groups (database, API, web) and an Azure Automation runbook or script step after the web group to update the DNS record. Failing over the recovery plan runs the whole sequence."
   ]
  ],
  "tip": "A test failover uses an isolated network and does not affect replication; always clean it up. After a real failover you commit, then re-protect before failing back. The vault must be in a different region from the source VMs.",
  "check": [
   [
    "How can you validate disaster recovery for replicated VMs without affecting production?",
    "Run a test failover into an isolated virtual network, then run Cleanup test failover."
   ],
   [
    "What does Commit do after a failover?",
    "It finalizes the failover and removes the other available recovery points, so you can no longer change recovery point."
   ],
   [
    "What must you do after failing over to the secondary region before you can fail back?",
    "Re-protect the VMs so they replicate from the secondary region back to the primary region."
   ],
   [
    "In which region should the Recovery Services vault for Azure-to-Azure replication be created?",
    "In a region different from the source VMs, typically the target region."
   ],
   [
    "Which recovery point option gives the fastest recovery time?",
    "Latest processed, because it does not need to process pending data first."
   ]
  ]
 },
 {
  "t": "Backup reports and alerts",
  "hook": "The quarterly review at Ironwood Managed Services is on Friday, and Grace, the account director, has two questions for you. First, can you prove that every critical VM for the Harlow Dental account had a successful backup every single day last quarter? Second, why did the backup bill jump this month? Then she adds, almost in passing, that a customer told her a backup job had been failing for a week and nobody at Ironwood noticed. The portal shows you jobs one at a time, and the alerts page is full of entries that apparently went to nobody. Where do trends, costs and timely notifications come from?",
  "simple": "Taking backups is like having a security camera; you still need someone to check the recordings and be told when the camera stops working. Backup reports are summary dashboards: they show trends over weeks, such as which backups failed most often, how much storage you use, and whether every important machine was backed up every day. They only work once each backup vault is told to send its records to a central log store. Backup alerts are the tap on the shoulder when something goes wrong, like a failed backup or someone deleting backup data. Azure creates many alerts automatically, but by default they just get written down. To actually get an email or text, you connect them to a contact list called an action group.",
  "body": [
   "Taking backups is not enough; you must know they are succeeding, how much they cost and when something goes wrong. Azure Backup provides reports for trends and governance and alerts for events that need action. Both are built on Azure Monitor and surfaced in the Business Continuity Center (formerly Backup center). That means the skills from the monitoring lessons, such as diagnostic settings, Log Analytics, alert rules and action groups, apply directly here, and AZ-104 questions often combine the two topics.",
   "Backup reports are built on Azure Monitor workbooks and read data from a Log Analytics workspace, so the first step is getting data into that workspace. You configure diagnostic settings on each Recovery Services vault and Backup vault to send backup data to a workspace in resource-specific mode. That mode creates dedicated tables such as `CoreAzureBackup`, `AddonAzureBackupJobs`, `AddonAzureBackupPolicy` and `AddonAzureBackupStorage`, which are easier and cheaper to query than the legacy AzureDiagnostics table. A built-in Azure Policy definition can configure these diagnostic settings for all vaults in a scope automatically, so new vaults are covered too. After data starts flowing, which can take several hours, open Backup reports and select the workspace or workspaces, even across subscriptions and tenants.",
   "The reports have tabs for different questions. Summary gives a high-level view of backup items, jobs and storage. Backup Items lists protected items and their storage consumption. Usage shows billed instances and storage trends, useful for chargeback to departments or customers. Jobs shows success and failure trends and failure reasons. Policies lists policies and the items using them. Optimize finds savings, such as inactive items still being billed, retention that seems too long, or databases that could use cheaper backup options. Policy adherence shows which items had a successful backup every day.",
   "Why use reports instead of the job list? You can filter reports by time range, subscription, vault and workload type, and export results. They answer governance questions such as 'did every critical VM have a successful backup every day this month?' and 'which vault is growing fastest?', which job lists alone cannot answer because they show one event at a time rather than trends.",
   "Backup alerts use Azure Monitor alerts. Built-in alerts are generated automatically for important scenarios, such as backup or restore job failures and security-relevant events like deleting backup data, disabling soft delete or stopping protection with data deletion. They appear in the Business Continuity Center and in Monitor > Alerts. Each alert carries a severity, the affected backup item and a description of the problem, and you can acknowledge or close it as you work on it. The older classic backup alerts have been replaced by these Azure Monitor alerts.",
   "The detail that catches many administrators is notification. By default, built-in backup alerts are recorded but no one is notified. To get emails or trigger automation, create an alert processing rule that routes backup alerts to an action group, for example all backup alerts of severity Sev1 or higher in a subscription going to the on-call team's email and ticketing webhook.",
   "For custom conditions, use Azure Monitor capabilities directly. You can create metric alerts on the backup health metrics exposed by vaults, or log search alerts that run KQL (Kusto Query Language) against the backup tables. For example, this query finds any failed backup job in the last day and could back a log search alert that runs every hour:",
   "```kusto\nAddonAzureBackupJobs\n| where TimeGenerated > ago(1d)\n| where JobOperation == \"Backup\" and JobStatus == \"Failed\"\n| project TimeGenerated, BackupItemUniqueId, JobFailureCode\n```",
   "Consider a worked example. A managed service provider looks after backups for several customers in separate subscriptions. It assigns the built-in policy that configures vault diagnostic settings to a central Log Analytics workspace in every subscription. The next week, Backup reports show that one customer's SQL backups fail every Sunday with the same failure code, and the Optimize tab lists forty inactive VM backup items still being billed. For day-to-day response, the provider creates an alert processing rule scoped to all subscriptions that sends every backup alert of severity Sev1 or higher to its on-call action group, which emails engineers and opens a ticket through a webhook. At the monthly review, the Policy adherence tab confirms which customers met their daily backup commitment, giving the provider evidence for its service reports.",
   "Watch for the usual mistakes: expecting Backup reports to work without vault diagnostic settings sending data to a workspace; using AzureDiagnostics (legacy) mode instead of resource-specific tables; expecting built-in alerts to email someone without an action group; opening reports minutes after enabling diagnostics and assuming they are broken; and relying on job status alone without checking policy adherence. In exam questions, 'view backup trends across vaults and subscriptions' means Backup reports with a Log Analytics workspace; 'no data in Backup reports' means configure diagnostic settings; 'get emailed when a backup fails' means an alert processing rule with an action group; 'find items still billed but unused' means the Optimize tab; and 'custom failure condition' means a log search alert on the backup tables."
  ],
  "analogy": "Backup reports are like a bank statement, and alerts are like a fraud text. The statement shows months of activity, totals and trends, but only if the bank has been sent your transactions, which is what the vault diagnostic settings do. The fraud text arrives the moment something odd happens, but only if you gave the bank your phone number; the action group is that phone number, and the alert processing rule decides which events trigger a text. The analogy stops in one place: a bank texts you by default, whereas Azure records built-in backup alerts silently until you connect an action group.",
  "terms": [
   [
    "Backup reports",
    "Azure Monitor workbooks that show backup items, jobs, usage, policies and optimization data from a Log Analytics workspace."
   ],
   [
    "Resource-specific tables",
    "Dedicated Log Analytics tables such as AddonAzureBackupJobs that vault diagnostic settings write to."
   ],
   [
    "Built-in backup alerts",
    "Azure Monitor alerts generated automatically for backup failures and security-relevant backup events."
   ],
   [
    "Alert processing rule",
    "A rule that routes matching fired alerts to action groups or suppresses them."
   ],
   [
    "Action group",
    "A reusable set of notifications and actions, such as email or webhooks, triggered by alerts."
   ],
   [
    "Policy adherence",
    "A report view showing whether each item had a successful backup in every period."
   ],
   [
    "Optimize tab",
    "The Backup reports view that highlights savings such as inactive items and long retention."
   ]
  ],
  "example": "An IT manager is asked why the backup bill grew 30 percent. She opens Backup reports, which already receive data because every vault's diagnostic settings send to the operations workspace. The Usage tab shows storage growth from a single file share with very long retention, and the Optimize tab lists twelve VMs deleted months ago whose backups are still retained. She shortens the file share's retention and stops protection on the orphaned items after confirming the data is no longer needed.",
  "mistakes": [
   [
    "Backup reports work automatically for every vault.",
    "Reports read from a Log Analytics workspace. Each vault needs a diagnostic setting sending backup data in resource-specific mode, and data can take several hours to appear."
   ],
   [
    "Built-in backup alerts email the subscription owner by default.",
    "Built-in alerts are recorded but notify no one until you route them to an action group, typically with an alert processing rule."
   ],
   [
    "The AzureDiagnostics mode is fine for Backup reports.",
    "Backup reports rely on the resource-specific tables such as AddonAzureBackupJobs. Choose resource-specific mode in the vault diagnostic setting."
   ],
   [
    "Checking that the latest job succeeded proves daily backups were met.",
    "A single job status shows one event. The Policy adherence tab shows whether each item had a successful backup in every period."
   ]
  ],
  "tryit": [
   [
    "Fairhaven Credit Union enabled diagnostic settings on its two vaults this morning, choosing AzureDiagnostics mode, and an hour later the Backup reports workbook is empty. What two things would you check or change?",
    "Change the diagnostic settings to resource-specific mode so data lands in tables such as AddonAzureBackupJobs, which the reports use. Then allow several hours for data to flow before judging the reports as broken."
   ],
   [
    "The security officer wants an immediate text message whenever anyone disables soft delete or deletes backup data in any vault in the production subscription, without writing a custom query. What do you set up?",
    "Rely on the built-in backup alerts, which already fire for those security events, and create an alert processing rule scoped to the production subscription that routes backup alerts to an action group containing the officer's SMS notification."
   ]
  ],
  "tip": "Backup reports need vault diagnostic settings sending to a Log Analytics workspace; no workspace, no reports. Built-in backup alerts do not notify anyone until you connect an action group, usually through an alert processing rule.",
  "check": [
   [
    "Backup reports show no data for a new vault. What should you configure?",
    "A diagnostic setting on the vault that sends backup data to the Log Analytics workspace in resource-specific mode."
   ],
   [
    "Built-in backup alerts appear in the portal, but nobody is emailed. How do you fix this?",
    "Create an alert processing rule that routes backup alerts to an action group containing email notifications."
   ],
   [
    "Which Backup reports tab helps identify cost savings such as inactive items?",
    "The Optimize tab."
   ],
   [
    "How can you alert on a custom backup condition, such as any failed job for a critical VM?",
    "Create a log search alert rule with a KQL query against the backup tables, such as AddonAzureBackupJobs."
   ],
   [
    "Which Backup reports tab shows whether every item had a successful backup each day?",
    "The Policy adherence tab."
   ]
  ]
 }
], {"reviewed":"2026-10-06"});
