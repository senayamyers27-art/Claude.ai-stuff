/* Lessons for Google Cloud Associate Cloud Engineer: one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("google-ace", [
 {
  "t": "Resource hierarchy: organization, folders and projects, and how IAM and organization policies are inherited",
  "hook": "It is Monday morning at Harbor Credit Union, and Priya from internal audit is standing at your desk. She has a printout showing that a contractor named Leo can read every Cloud Storage bucket in the payments project. You check the project's IAM page and remove his Viewer grant. Ten minutes later Priya is back: Leo can still list the buckets. Nothing on the project page explains it, and the audit report is due Friday. Where is that access really coming from, and how do you make sure the next contractor never ends up in the same place?",
  "simple": "Think of Google Cloud as a set of nested boxes. The biggest box is your whole company (the organization). Inside it you can put smaller boxes called folders, for example one per department. Inside folders you put projects, and every cloud thing you build, like a server or a storage bucket, lives inside exactly one project. When you give someone permission on a big box, they automatically get it on every box inside. Company-wide rules work the same way: a rule set on the company box applies to everything inside. It is like a house key: a key to the front door also gets you into every unlocked room inside, so you hand out the front door key carefully.",
  "body": [
   "Everything you create in Google Cloud sits in a tree called the resource hierarchy. At the top is the organization node, which represents your company and is tied to a Cloud Identity or Google Workspace domain such as example.com. Under it you can create folders, folders can contain other folders, and at the bottom are projects. Every resource, whether a virtual machine (VM), a Cloud Storage bucket or a Cloud SQL instance, belongs to exactly one project. The hierarchy matters because it is how you apply access and rules to many resources at once instead of one at a time. In the console you see it in the project picker and on the Manage resources page, where folders and projects appear as an expandable tree under the organization name.",
   "Projects are the basic unit of organization. Each one has its own set of enabled APIs, its own quotas, its own IAM policy and its own billing link, and it acts as a boundary for most resources. A VM in one project cannot simply attach a disk from another project, and deleting a project deletes everything in it. Because of that boundary, many teams create separate projects per application and per environment, such as payments-dev and payments-prod, so a mistake in one does not spill into the other.",
   "Folders usually mirror how the company works. You might group by department (Finance, Engineering), by environment (Prod, Non-prod), or by team, and you can nest folders several levels deep, for example Engineering, then Payments, then Prod. A new organization is created automatically when a Cloud Identity or Workspace customer first creates a project, and administrators then decide who may create folders and projects by granting roles such as Folder Admin and Project Creator. Without an organization, projects float on their own with no shared parent, which is why the exam expects organizations for any real company setup.",
   "Identity and Access Management (IAM) allow policies can be attached at the organization, folder, project and many individual resources, such as a bucket, a service account or a Pub/Sub topic. A policy is inherited by everything below it, and effective access is the union of all the policies from the resource up to the organization. That makes IAM additive: if a user is Viewer on a folder and Editor on a project inside it, they are Editor on that project. A child cannot remove a grant it inherits from a parent. This is exactly the trap in the audit story: removing a project-level grant does nothing if the same person also holds a role on the parent folder or the organization. The console's IAM page marks inherited grants, and Policy Troubleshooter can explain why a principal has a specific permission.",
   "When you truly need to block a permission regardless of grants, Google Cloud offers IAM deny policies. Deny policies are attached at the organization, folder or project level, are inherited the same way, and are evaluated before allow policies. If a deny rule matches, the permission is refused even if an allow policy somewhere grants it. Deny policies are a precise tool for guardrails such as 'nobody outside the security group may delete projects', but for day-to-day access you still design with allow policies granted at the right level.",
   "Organization policies are a separate mechanism, and the exam likes to test the difference. Instead of saying who can do something, they restrict what can be configured, for example which regions resources may be created in, whether VMs may have external IP addresses, or whether service account keys may be created. The Organization Policy Service applies to everyone, including project Owners. Organization policies are also set on the organization, a folder or a project and are inherited downward. Depending on the constraint, a lower level can inherit the parent's policy, merge its own values with it, or replace it, if administrators allow that. You manage them on the Organization policies page under IAM and admin.",
   "Putting the two together gives you a simple mental model. IAM answers 'who can do what on which resources'. Organization policies answer 'what is allowed to exist at all'. A request succeeds only if IAM allows the caller to perform the action, no deny policy blocks it, and the resulting configuration does not violate an organization policy. When an exam question describes a failure, check which of these layers is speaking: a permission denied error points to IAM, while an error naming a constraint points to an organization policy.",
   "A practical design is to place broad, stable controls high in the tree and narrow, job-specific grants low. For example, you might grant security auditors Security Reviewer at the organization, put a location restriction on an EU folder, and grant developers roles only on their own projects or on individual resources. This keeps least privilege intact, keeps policies short, and makes it easy to answer an auditor's question about who has access to what. It also means new projects created in the right folder automatically pick up the correct access and restrictions without anyone remembering to configure them."
  ],
  "analogy": "The resource hierarchy works like an office building's key system. A master key for the building (the organization) opens every floor (folder) and every office (project). A floor key opens every office on that floor. Taking away someone's office key does nothing if they still carry the master key. Building rules posted in the lobby, such as 'no space heaters', are like organization policies: they apply to everyone, even the person with the master key. The analogy stops working with deny policies, which are more like a guard who refuses entry no matter which key you hold.",
  "mnemonic": "Top to bottom: Our Folders Protect Resources. Organization, then Folders, then Projects, then Resources. Grants and organization policies flow downward along that path.",
  "terms": [
   [
    "Organization node",
    "The root of the hierarchy, tied to a Cloud Identity or Google Workspace domain."
   ],
   [
    "Folder",
    "A grouping of projects and other folders that lets you apply IAM and organization policies to all of them."
   ],
   [
    "Project",
    "The container that every resource belongs to, with its own APIs, quotas, IAM policy and billing link."
   ],
   [
    "Policy inheritance",
    "IAM and organization policies set on a node apply to every folder, project and resource beneath it."
   ],
   [
    "IAM deny policy",
    "A policy that blocks specific permissions for chosen principals, evaluated before allow policies."
   ],
   [
    "Organization policy",
    "A rule built from a constraint that restricts how resources may be configured, regardless of IAM roles."
   ]
  ],
  "example": "A retailer creates folders named Prod and Non-prod under its organization. The security team is granted Security Reviewer at the organization, the platform team is Editor on the Non-prod folder only, and an organization policy on Prod blocks external IP addresses on VMs. New projects created in either folder get the right access and restrictions automatically.",
  "mistakes": [
   [
    "Removing a user's role on a project always removes their access to that project.",
    "Allow policies are additive and inherited. If the user also holds a role on a parent folder or the organization, they keep that access. Check grants higher in the tree."
   ],
   [
    "You can set a more restrictive IAM allow policy on a child to override a parent's grant.",
    "Allow policies cannot subtract inherited access. To block a permission despite grants, use an IAM deny policy, or remove the grant at the level where it was made."
   ],
   [
    "Organization policies and IAM policies are two names for the same thing.",
    "IAM controls who can act. Organization policies control what configurations are allowed for everyone, including Owners."
   ],
   [
    "A resource can belong to several projects so it can be shared.",
    "Every resource belongs to exactly one project. You share access by granting IAM roles, not by placing the resource in more than one project."
   ]
  ],
  "tryit": [
   [
    "Northwind Clinics has folders for Research and Clinical. Clinical data must never be stored outside the United States, and the research team should be able to manage its own projects but not touch clinical ones. A new engineer suggests granting the research group Editor at the organization and asking them to stay out of clinical projects. What would you do instead?",
    "Grant the research group Editor (or narrower predefined roles) on the Research folder only, so it inherits into research projects but not clinical ones. Put a resource locations organization policy on the Clinical folder that allows only United States locations. Granting at the organization would give the research group access to everything, and you could not remove it lower down."
   ]
  ],
  "tip": "IAM allow policies are additive and can't be revoked lower in the tree. If a question says a user still has access after you removed a project-level grant, look for a grant on a folder or the organization above it.",
  "check": [
   [
    "A user is Viewer on the organization and has no project-level grants. Can they see resources in every project?",
    "Yes. The Viewer grant at the organization is inherited by every folder and project below it."
   ],
   [
    "What is the difference between an IAM allow policy and an organization policy?",
    "An IAM policy says which principals have which roles. An organization policy restricts how resources may be configured, whatever roles the person has."
   ],
   [
    "Where should you apply a rule that must cover every project in the Prod environment, including projects created next year?",
    "On the Prod folder, so every current and future project in it inherits the rule."
   ]
  ]
 },
 {
  "t": "Creating projects: project name, project ID and project number, and enabling APIs",
  "hook": "Sam, a new developer at Tidewater Logistics, messages you on chat: the deploy script he copied from a teammate fails with an error saying the Cloud Run API has not been used in project tw-route-dev or is disabled. He has already asked for Owner on the project twice, thinking it is a permissions problem. Meanwhile his manager wants the project renamed from 'tw-route-dev' to 'Route Planner Dev' and asks whether that will break the pipeline. You have two questions to answer before standup. What actually identifies a project, and what is really wrong with Sam's deploy?",
  "simple": "A project is the folder-like container where you build things in Google Cloud. Every project has three labels. The name is a friendly nickname you can change any time. The project ID is a unique, permanent code you pick when you create it, and tools use it to find the project. The project number is a permanent number Google gives it. Inside a project, each Google service, like Cloud Run or Compute Engine, starts switched off. Before using one, you flip its switch on, called enabling the API. It is like a new apartment where the electricity, water and internet each need to be turned on before you can use them, and turning them on does not cost anything until you start using them.",
  "body": [
   "Before you can build anything you need a project. You can create one in the console from the project picker by choosing New project, or from the command line with `gcloud projects create PROJECT_ID --name=\"Display name\" --folder=FOLDER_ID`. You can use `--organization=ORG_ID` instead of `--folder` to place it directly under the organization. Creating projects requires the Project Creator role on the organization or folder where the project will live, and the project must be linked to a billing account before you can use most paid services. A brand-new project with no billing link can exist, but trying to create a VM in it will fail with a billing error.",
   "Every project has three identifiers, and exam questions like to test the difference. The project name is a friendly display label. You can change it at any time, it does not need to be unique, and two teams can both have a project called Sandbox. The project ID is a globally unique string of lowercase letters, digits and hyphens that you choose, or accept a generated one, when you create the project. It must start with a letter and be 6 to 30 characters long. It can never be changed, and it is what gcloud, APIs, Terraform code and many resource names use. The project number is assigned by Google, is also permanent, and appears in places such as the default Compute Engine service account, `PROJECT_NUMBER-compute@developer.gserviceaccount.com`.",
   "Because the project ID is permanent and globally unique, choose it with care. A good convention includes the team or app and the environment, such as `payroll-prod` or `shop-dev`, sometimes with a short suffix when the obvious ID is already taken by someone else in the world. If a team later decides the ID is wrong, the only way to get a different ID is to create a new project and move the workloads. Renaming the display name, by contrast, is a harmless change that does not affect scripts, because scripts reference the ID.",
   "Services in Google Cloud are exposed as APIs, and most of them are disabled in a new project. If you try to use a service whose API is off, you get an error telling you the API has not been used in the project before or is disabled, usually with a link to enable it. This is not a permissions problem, and granting more IAM roles will not fix it. You enable the API on the APIs and services page in the console or with `gcloud services enable compute.googleapis.com`, and the same pattern works for `run.googleapis.com`, `container.googleapis.com`, `sqladmin.googleapis.com` and so on. `gcloud services list --enabled` shows what is on, and `gcloud services list --available` shows what you could turn on.",
   "Enabling an API costs nothing by itself. You pay for the resources you then create and the usage you generate. Enabling does require a permission, `serviceusage.services.enable`, which roles such as Owner, Editor and Service Usage Admin include. Some gcloud commands will offer to enable an API for you the first time you use a service, which is convenient but also explains why a teammate's script may work in their project and fail in yours. Remember that enabled APIs are per project: turning on Cloud Run in shop-dev does nothing for shop-prod, so automation that creates projects usually enables the needed APIs as one of its first steps.",
   "Enabling some APIs also creates Google-managed service accounts, called service agents, which let the service act in your project, for example to attach disks, pull container images or write logs. They have email addresses that usually include the project number and a Google-owned domain, and they appear on the IAM page when you tick the option to include Google-provided role grants. Do not delete them or remove their roles, or the service will stop working in confusing ways.",
   "When a project is no longer needed, shut it down with `gcloud projects delete PROJECT_ID` or from the console's Manage resources page. The project enters a pending deletion period of roughly 30 days, during which billing stops and resources are shut down, and an Owner can restore it with `gcloud projects undelete PROJECT_ID`. After that period it is deleted for good, and its project ID can never be reused by anyone. Deleting a project is the cleanest way to make sure nothing in it keeps costing money, which is why short-lived sandboxes are often created as separate projects."
  ],
  "analogy": "A project's identifiers are like a person's details at a bank. The name on the account can be updated when someone gets married, and two customers can share the same name. The account number is permanent and unique, and every payment system uses it, so changing it would break everything; you would have to open a new account. Enabling APIs is like activating services on that account, such as online banking or a debit card: they are off until you request them, and turning them on is free, while using them may cost money.",
  "terms": [
   [
    "Project ID",
    "The permanent, globally unique identifier you choose at creation and use in commands and APIs."
   ],
   [
    "Project number",
    "A permanent numeric identifier Google assigns, used in some service account names."
   ],
   [
    "Project name",
    "A changeable display label that doesn't need to be unique."
   ],
   [
    "Service agent",
    "A Google-managed service account that a Google Cloud service uses to act on resources in your project."
   ],
   [
    "Project Creator",
    "The IAM role, granted on an organization or folder, that allows creating projects there."
   ],
   [
    "gcloud services enable",
    "The command that turns on an API, such as run.googleapis.com, in the current project."
   ]
  ],
  "example": "A developer creates a project with the ID shop-dev-4821 and the name Shop Dev. When she runs `gcloud run deploy`, gcloud offers to enable the Cloud Run API. Later the team renames the project to Shop Development in the console; all scripts keep working because they reference the unchanged project ID.",
  "mistakes": [
   [
    "An 'API not enabled' error means the user needs a more powerful IAM role.",
    "The service is switched off in the project. Enable it with `gcloud services enable SERVICE.googleapis.com` or on the APIs and services page. More roles won't help until it is enabled."
   ],
   [
    "You can edit the project ID in project settings if you made a typo.",
    "The project ID is permanent. Only the display name can change. To get a new ID you create a new project."
   ],
   [
    "The project number and project ID are the same thing.",
    "The ID is a string you choose; the number is a numeric value Google assigns. Both are permanent, and they show up in different places."
   ],
   [
    "Deleted project IDs become available again right away.",
    "A deleted project can be restored during the pending deletion period, and after that its ID can never be reused."
   ]
  ],
  "tryit": [
   [
    "Fernhill Studios wants a new project for its rendering pipeline. The team proposes the ID 'render' and plans to rename it later to 'render-prod' once the pipeline goes live. They also want the project to sit in the Media folder. What do you tell them, and which command creates it correctly?",
    "The ID cannot be renamed later, so pick the final ID now, for example `render-prod` (if it is free globally and at least 6 characters). Create it with `gcloud projects create render-prod --name=\"Render Prod\" --folder=MEDIA_FOLDER_ID`, which requires Project Creator on that folder. The display name can be adjusted at any time."
   ],
   [
    "After creating the project, a teammate runs `gcloud compute instances create` and receives an error that the Compute Engine API is not enabled. Another teammate suggests granting Compute Admin. What should happen instead?",
    "Enable the API with `gcloud services enable compute.googleapis.com` and make sure the project is linked to billing. The error is about the service being off, not missing permissions."
   ]
  ],
  "tip": "If a question says the team wants to change a project ID, the answer is that it can't be done; only the display name can change. An 'API not enabled' error is fixed by enabling the API, not by granting more IAM roles.",
  "check": [
   [
    "Which project identifier appears in the default Compute Engine service account's email address?",
    "The project number, as in PROJECT_NUMBER-compute@developer.gserviceaccount.com."
   ],
   [
    "How do you list the APIs enabled in the current project?",
    "Run `gcloud services list --enabled`, or look at APIs and services in the console."
   ],
   [
    "What role do you need on a folder to create projects in it?",
    "Project Creator."
   ]
  ]
 },
 {
  "t": "Organization Policy Service: constraints such as resource locations and disabling service account key creation",
  "hook": "The compliance officer at Bluewater Insurance forwards you a finding from last quarter's review: a downloaded service account key was found in a public code repository, and a test bucket had briefly been created in a region outside the approved list. Both were created by people with Owner on their projects, so removing roles would break their work. Diego, the head of security, asks for something stronger than a policy document: a control that makes these mistakes impossible, even for project owners. What in Google Cloud can say no to an Owner?",
  "simple": "In Google Cloud, permissions decide who is allowed to do things. But sometimes a company needs rules that nobody can break, not even the most powerful users. Organization policies are those rules. They do not care who you are; they care what you are trying to create. For example, a rule might say 'storage can only be created in Europe' or 'nobody may download secret key files'. If anyone, even a project owner, tries to break the rule, Google Cloud refuses and tells them which rule blocked them. Think of a city building code: it does not matter that you own the house, you still cannot build a fifth floor if the code says three floors maximum.",
  "body": [
   "The Organization Policy Service gives administrators central guardrails. Where Identity and Access Management (IAM) decides who can act, an organization policy decides what configurations are allowed at all. Even a project Owner cannot create a resource that an organization policy forbids. This makes organization policies the right answer whenever a requirement says something must never happen 'even by administrators' or 'even by project owners'. It also means you can grant teams fairly broad roles on their own projects while still guaranteeing that certain risky configurations never appear anywhere in the company.",
   "A policy is built from a constraint. A constraint is a definition of a restriction on a particular service's behavior, and an organization policy is the setting you apply for that constraint at a node in the hierarchy. Google provides many predefined constraints, and you can write custom constraints for some resource types using conditions on resource fields. There are two main kinds of predefined constraints. List constraints allow or deny a list of values, such as a set of permitted regions. Boolean constraints are simply enforced or not enforced, such as 'disable service account key creation'.",
   "Several constraints come up again and again in exam questions. The resource locations constraint, `gcp.resourceLocations`, restricts the regions and multi-regions where location-based resources such as buckets, disks and Cloud SQL instances can be created. It accepts value groups such as an EU or US location group, which saves listing every region. `iam.disableServiceAccountKeyCreation` blocks creation of new user-managed service account keys, which removes the risk of long-lived key files leaking. `compute.vmExternalIpAccess` restricts which VMs may have external IP addresses, usually by allowing none or only a short list. `iam.allowedPolicyMemberDomains` limits IAM grants to identities from your own Cloud Identity or Workspace customers, which is called domain restricted sharing. `storage.publicAccessPrevention` stops Cloud Storage buckets from being made public, and `storage.uniformBucketLevelAccess` requires buckets to use uniform bucket-level access instead of object access control lists.",
   "You set policies on the organization, a folder or a project. In the console you go to IAM and admin, then Organization policies, search for the constraint, and choose Manage policy. From the command line you write a small YAML file that names the constraint and the rules and apply it with `gcloud org-policies set-policy policy.yaml`. You can inspect what is in effect with `gcloud org-policies describe CONSTRAINT --project=PROJECT_ID --effective`, which shows the merged result of the inheritance chain. Setting policies requires the Organization Policy Administrator role, which is granted at the organization level; a project Owner does not have it by default, which is exactly why owners cannot switch the guardrails off.",
   "Policies are inherited down the hierarchy. A policy on the organization applies to every folder and project unless a lower level sets its own policy for the same constraint. For list constraints, a child can inherit the parent's policy, merge its own values with it, or replace it entirely. Boolean constraints are simpler: the setting at the nearest level that defines one wins. Organization policies can also carry conditions based on resource manager tags, so you might enforce a constraint everywhere except on projects tagged as approved exceptions. This flexibility is powerful but means you should keep exceptions rare and documented.",
   "Policies generally are not retroactive. They are checked when a resource is created or updated, so an existing VM with an external IP keeps it after you enforce `compute.vmExternalIpAccess`, but new VMs with external IPs are blocked, and editing that existing VM may fail until it complies. Existing service account keys keep working after you enforce key creation blocking; you still need to find and delete them. When you roll out a new constraint, plan a cleanup of existing resources alongside it.",
   "Organization policies are often combined with IAM. For example, you might grant developers Compute Admin on their projects but use the external IP constraint so that none of their VMs can be exposed directly, and then give them Identity-Aware Proxy (IAP) TCP forwarding for SSH access. Or you might block service account key creation and teach teams to use attached service accounts and Workload Identity Federation instead. Because policies are evaluated when a resource is created or updated, they are easy to test: try to create a forbidden resource and read the error, which names the constraint that blocked the request. Google also offers a dry-run mode for some policies so you can see what would be blocked before enforcing."
  ],
  "analogy": "An organization policy is like a building code, and IAM is like the keys to the building. Having the keys, even the master key, lets you into every room, but it does not let you install wiring that the code forbids. The inspector checks new work, not every old outlet, which matches how policies apply at create and update time rather than fixing existing resources. The analogy breaks slightly because a building code rarely allows exceptions per room, while organization policies can be replaced or merged at lower levels if administrators allow it.",
  "terms": [
   [
    "Constraint",
    "A definition of a restriction on a Google Cloud service's behavior, such as allowed locations."
   ],
   [
    "List constraint",
    "A constraint that allows or denies a set of values, such as permitted regions."
   ],
   [
    "Boolean constraint",
    "A constraint that is either enforced or not, such as disabling service account key creation."
   ],
   [
    "Organization Policy Administrator",
    "The role that lets someone set organization policies; it is granted at the organization level."
   ],
   [
    "Resource locations constraint",
    "gcp.resourceLocations, which limits where location-based resources can be created."
   ],
   [
    "Domain restricted sharing",
    "A constraint that allows IAM grants only to identities from listed Cloud Identity or Workspace customers."
   ]
  ],
  "example": "A bank must keep customer data in the EU. The cloud team sets the resource locations constraint on the EU-Customers folder to EU locations only. When an engineer with Owner on a project tries to create a bucket in us-central1, the request fails with an error naming the constraint.",
  "mistakes": [
   [
    "Create a custom IAM role without the key creation permission to stop everyone from creating service account keys.",
    "Other roles, such as Owner, still include the permission, and anyone can be granted those. Only an organization policy applies to everyone regardless of role."
   ],
   [
    "Enforcing the external IP constraint removes external IPs from existing VMs.",
    "Constraints are checked on create and update. Existing VMs keep their IPs until someone changes or replaces them."
   ],
   [
    "A project Owner can turn off an organization policy that blocks them.",
    "Changing policies needs Organization Policy Administrator, granted at the organization. Owner on a project does not include it."
   ],
   [
    "Organization policies say which users can create resources in a region.",
    "Organization policies don't name users. They restrict configurations for everyone. Controlling which users can act is IAM's job."
   ]
  ],
  "tryit": [
   [
    "At Bluewater Insurance, auditors require that no service account keys exist anywhere and that new VMs never get public IPs. Engineers have Owner on their projects and need to keep it for now. Several old keys already exist. What combination of actions meets the requirement?",
    "Enforce `iam.disableServiceAccountKeyCreation` and `compute.vmExternalIpAccess` (deny all) at the organization. Because policies are not retroactive, also find and delete existing keys and remove external IPs from existing VMs. Owners cannot undo the policies because they lack Organization Policy Administrator. Offer IAP for SSH and attached service accounts or Workload Identity Federation so teams don't need keys or public IPs."
   ]
  ],
  "tip": "Read the requirement: 'nobody, including owners' points to an organization policy; 'only this group may' points to IAM. Service account key creation, external IPs and allowed regions are classic organization policy questions.",
  "check": [
   [
    "Why doesn't a custom IAM role solve 'no one may create service account keys'?",
    "Other roles, such as Owner, still include the permission. An organization policy applies to everyone regardless of role."
   ],
   [
    "Does setting the external IP constraint remove IPs from existing VMs?",
    "No. Constraints are checked when resources are created or changed; existing configurations generally aren't changed."
   ],
   [
    "Which constraint keeps location-based resources in approved regions?",
    "The resource locations constraint, gcp.resourceLocations."
   ]
  ]
 },
 {
  "t": "Managing users and groups with Cloud Identity or Google Workspace, and Google Cloud Directory Sync",
  "hook": "Granite Ridge Manufacturing is moving its first workloads to Google Cloud, and Ana, the IT director, has a question for you on the first day. The company has 3,000 employees in Microsoft Active Directory, and HR updates that directory every time someone joins, moves or leaves. She does not want anyone typing those users into a second system, and she definitely does not want people remembering a new password. A consultant has suggested creating a service account per employee. Ana looks at you: is that right, and if not, how do employees actually get into Google Cloud?",
  "simple": "Google Cloud does not keep its own list of people. Instead, people sign in with Google accounts that your company manages through a service called Cloud Identity (or Google Workspace, which adds Gmail and Docs). You can put people into groups, like 'network admins', and give permissions to the whole group at once. If your company already keeps a list of employees in another system, a free tool called Google Cloud Directory Sync copies that list into Google automatically, one way. With single sign-on, people can log in with the password they already use at work. It is like a school that copies its official class roster into the library system every night, so the library never has to enter students by hand.",
  "body": [
   "Google Cloud does not have its own user directory inside Identity and Access Management (IAM). People sign in with Google identities: accounts managed in Cloud Identity or Google Workspace for your company's domain, or, less ideally, individual Google accounts such as Gmail addresses. Cloud Identity is an identity-as-a-service (IDaaS) product. Its free edition gives you managed users and groups for your domain without Workspace apps like Gmail and Docs, and a premium edition adds more device and security management features. Workspace includes the same identity features plus the productivity apps. Either way, verifying your domain also creates the organization node that sits at the top of your Google Cloud resource hierarchy.",
   "Using managed accounts instead of personal Gmail accounts matters for control. When an employee leaves, an administrator can suspend or delete their managed account in the Admin console, and every Google Cloud permission granted to that identity stops working. With personal accounts, the company has no such control; the person still owns the account. That is why the domain restricted sharing organization policy is often used to stop grants to identities outside the company's own Cloud Identity or Workspace customer.",
   "Groups are created in the Admin console or the Groups section of the Google Cloud console, and each has an email address, such as gcp-network-admins@example.com. IAM treats a group as a principal, so granting a role to a group gives it to every member. When someone joins or leaves a team, you change group membership and every related IAM grant follows automatically. Google's recommended practice is to grant roles to groups, not to individual users. In an IAM policy this looks like a binding with the member `group:gcp-network-admins@example.com`, and the IAM page lists the group once rather than dozens of individual people. Groups can also contain other groups, which helps model teams within departments.",
   "Many companies already manage employees in Microsoft Active Directory (AD) or another Lightweight Directory Access Protocol (LDAP) directory. Google Cloud Directory Sync (GCDS) is a free tool you run on a server in your own network. It reads users and groups from AD or LDAP and creates, updates and suspends matching accounts in Cloud Identity or Workspace, in one direction only: from your directory to Google. Nothing in Google is written back to AD. You configure which organizational units and groups to sync, how attributes map, and how often it runs, often on a schedule such as nightly or hourly. A simulated sync lets you preview changes before applying them.",
   "GCDS does not synchronize passwords by default. For sign-in, you usually set up single sign-on (SSO) using Security Assertion Markup Language (SAML), so users authenticate against your existing identity provider (IdP), such as Active Directory Federation Services or Microsoft Entra ID, and Google trusts the result. Users then sign in to the Google Cloud console with their usual work credentials, and the company's existing password and multi-factor rules apply. The combination of GCDS for provisioning and SAML SSO for authentication is the classic exam answer for 'use existing AD identities without re-creating them'.",
   "Identities for workloads are different. Applications should use service accounts, not user accounts, and workloads running outside Google Cloud, such as in another cloud or an on-premises CI system, should use Workload Identity Federation rather than downloaded keys. Mixing the two is a common exam distractor: service accounts are never the answer for giving employees access, because they are not tied to a person, cannot use the person's SSO and multi-factor authentication, and make audit trails harder to read. If a question describes a person, think users and groups; if it describes code, a VM or a pipeline, think service accounts. Keeping that line clear also keeps your IAM policies readable, because each binding then says plainly whether it is for a team of people or for a specific workload.",
   "Finally, protect the most powerful accounts. Super administrators in Cloud Identity or Workspace can manage every user and group and can grant themselves any role in the organization. Keep only a few, protect them with strong two-step verification such as security keys, and do not use them for daily work. Day-to-day cloud administration should happen through ordinary managed accounts that receive IAM roles via groups. Audit logs in the Admin console and Cloud Audit Logs in Google Cloud then give a clear record of which person did what."
  ],
  "analogy": "Google Cloud Directory Sync is like a nightly photocopy of the official employee roster. HR keeps the master roster in Active Directory, and each night a copy is delivered to Google so the badge office (Cloud Identity) knows who works there. Changes never flow the other way: writing on the copy does not change the master. SAML single sign-on is like the badge office trusting the HR office's stamp instead of issuing its own passwords. The analogy stops at timing: the sync runs on a schedule you choose, so a change in AD is not instantly reflected in Google.",
  "terms": [
   [
    "Cloud Identity",
    "Google's identity-as-a-service product for managing users, groups and devices for a domain, available in a free edition."
   ],
   [
    "Google Cloud Directory Sync",
    "A tool that one-way syncs users and groups from Active Directory or LDAP into Cloud Identity or Google Workspace."
   ],
   [
    "SAML single sign-on",
    "Federation that lets users sign in to Google with their existing identity provider's credentials."
   ],
   [
    "Google group",
    "A collection of identities with its own email address that can be granted IAM roles."
   ],
   [
    "Super administrator",
    "The most powerful Cloud Identity or Workspace admin, able to manage all users and grant any role; keep few and protect them."
   ],
   [
    "Workload Identity Federation",
    "A way for external workloads to access Google Cloud using their own identity provider's tokens instead of service account keys."
   ]
  ],
  "example": "A manufacturer with 3,000 employees in Active Directory runs GCDS nightly so every department's AD group appears as a Google group. SSO with its identity provider means staff sign in with their normal password, and IAM roles are granted only to the synced groups, so HR changes in AD flow into cloud access automatically.",
  "mistakes": [
   [
    "Create users directly in IAM.",
    "IAM doesn't create or store users. Users live in Cloud Identity or Workspace (or are Google accounts); IAM only grants roles to them."
   ],
   [
    "Give each employee their own service account.",
    "Service accounts are for workloads. Employees should use managed user accounts, ideally with SSO, and receive roles through groups."
   ],
   [
    "GCDS syncs both ways, so changes in Google update Active Directory.",
    "GCDS is one way, from AD or LDAP to Google. AD stays the source of truth."
   ],
   [
    "GCDS copies passwords so users can sign in with their AD password.",
    "Password sync isn't the default. The usual design is GCDS for accounts plus SAML SSO so users authenticate with the existing identity provider."
   ]
  ],
  "tryit": [
   [
    "Granite Ridge wants employees to access Google Cloud using their existing AD accounts and passwords. When someone leaves, HR disables them in AD, and the company wants their cloud access to end soon after without a separate manual step. Which design do you propose?",
    "Run Google Cloud Directory Sync on a scheduled basis to provision and suspend Cloud Identity accounts and groups from AD, and configure SAML SSO with the company's identity provider. Grant IAM roles to the synced groups. When HR disables a user, SSO stops working immediately and the next sync suspends the account and removes them from groups."
   ]
  ],
  "tip": "Existing AD users plus 'without re-creating them' means Google Cloud Directory Sync (often with SAML SSO). IAM doesn't create users, and service accounts are for workloads, not employees.",
  "check": [
   [
    "In which direction does Google Cloud Directory Sync copy data?",
    "One way, from Active Directory or LDAP into Cloud Identity or Google Workspace."
   ],
   [
    "Why grant IAM roles to groups instead of users?",
    "Access follows group membership, so joiners, movers and leavers are handled in one place and IAM policies stay short."
   ],
   [
    "A company wants managed Google identities but does not need Gmail or Docs. What can it use?",
    "Cloud Identity, which has a free edition, instead of Google Workspace."
   ]
  ]
 },
 {
  "t": "Granting IAM roles to users and groups at the organization, folder and project levels",
  "hook": "A ticket lands in your queue at Copperline Analytics: 'Data team needs BigQuery access ASAP, quarterly report due tomorrow.' The quickest fix would be to make the whole data team Editor on the organization, and a senior engineer in the channel suggests exactly that. But you remember last year's incident review, where a broad grant let an intern delete a production dataset in a project they never meant to touch. You have the gcloud CLI open and a deadline. Where should this grant go, to whom, and with which role, so the report ships and nothing else is exposed?",
  "simple": "Giving access in Google Cloud has three parts: who (a person, a group or an app), what they can do (a role, which is a bundle of permissions), and where (the whole company, a department folder, one project, or a single resource like one storage bucket). Whatever you grant at a higher level automatically applies to everything underneath. So the safest habit is to give people only the role they need, only where they need it, and to give it to a group instead of to each person. It is like a hotel: you would give a cleaner a key to the rooms on one floor, not a master key to the whole building.",
  "body": [
   "In Identity and Access Management (IAM), you grant a role to a principal on a resource. A principal can be a Google account, a Google group, a service account, a Cloud Identity or Workspace domain, or special identifiers such as `allUsers` (anyone on the internet) and `allAuthenticatedUsers` (anyone signed in with a Google account). A role is a collection of permissions, and permissions follow a `service.resource.verb` pattern, such as `compute.instances.start` or `storage.objects.get`. The combination of one role and its principals is a binding, and all bindings on a resource form its allow policy. You never grant a single permission directly; you always grant a role that contains it.",
   "Roles come in three types, and the exam expects you to choose well among them. Basic roles (Owner, Editor and Viewer) are very broad and apply across almost every service in the project. Predefined roles are curated by Google for specific jobs, such as Compute Instance Admin, BigQuery Job User or Storage Object Viewer. Custom roles are ones you build from a chosen list of permissions when no predefined role fits. The usual rule is to prefer predefined roles, use custom roles only for a real gap, and avoid basic roles in production.",
   "You can grant roles in the console on the IAM page of the organization, folder or project by choosing Grant access, entering the principal and picking a role. Many individual resources, such as a bucket, a BigQuery dataset, a service account or a Pub/Sub topic, have their own permissions panel. From the command line you use commands like `gcloud projects add-iam-policy-binding my-proj --member=group:devs@example.com --role=roles/compute.instanceAdmin.v1`. There are matching commands for folders, `gcloud resource-manager folders add-iam-policy-binding FOLDER_ID`, and for the organization, `gcloud organizations add-iam-policy-binding ORG_ID`. To remove a grant, use `remove-iam-policy-binding` with the same member and role. These commands change one binding at a time, which is safer than downloading, editing and re-uploading a whole policy with `set-iam-policy`.",
   "Where you grant a role decides how far it reaches. A role granted at the organization applies to every folder and project, which is right only for a handful of central teams, such as security reviewers or billing administrators. A role granted on a folder covers every project in it, now and in the future, which suits a department or an environment such as all non-production projects. Granting on a project, or on a single resource inside it, is the narrowest and best for least privilege. Always check the scope in a question: 'only this bucket' means grant on the bucket, not the project, and 'all projects in the marketing department' points to the Marketing folder.",
   "Grants can also carry IAM conditions, which limit when a binding applies. A condition is an expression in Common Expression Language (CEL) that can check attributes such as the resource name prefix, resource tags or the request time. For example, you could grant a contractor a role that expires at the end of the month, or allow access only to buckets whose names start with `reports-`. Conditions are useful for temporary access and fine-grained scoping, but they are not supported on every role and resource, so check before relying on them.",
   "To review access, `gcloud projects get-iam-policy my-proj` prints the bindings for the project, and the console's IAM page shows both direct and inherited grants, with a column that says where an inherited role came from. Remember that what you see on a project may be only part of the story: a principal might also have roles inherited from a folder or the organization, or granted on individual resources. Tools such as Policy Analyzer answer 'who has access to what' across the hierarchy, and Policy Troubleshooter explains why a specific principal does or does not have a specific permission on a specific resource. IAM Recommender also suggests removing permissions that have not been used.",
   "Prefix members by type in gcloud: `user:`, `group:`, `serviceAccount:` and `domain:`. A missing or wrong prefix is a common reason a grant fails, for example writing `--member=devs@example.com` instead of `--member=group:devs@example.com`. Role names in commands also need the `roles/` prefix for predefined and basic roles, such as `roles/storage.objectViewer`, while custom roles use `projects/PROJECT_ID/roles/NAME` or `organizations/ORG_ID/roles/NAME`.",
   "Bringing it together, a good grant answers three questions with the narrowest honest answer. Who: a group that represents the job, not an individual. What: the smallest predefined role that covers the task. Where: the lowest level of the hierarchy that contains everything they need. When access spans many projects of the same kind, use a folder rather than repeating grants project by project. When you are tempted to use Editor because it is quick, remember that Editor includes the ability to modify and delete most resources in the project."
  ],
  "analogy": "Granting an IAM role is like issuing a badge at a large company campus. The badge says who you are (principal), which doors you can open (role), and which buildings it works in (the resource where you grant it). A badge valid for the whole campus opens every building's matching doors, including buildings built next year. A badge for one lab opens only that lab. Where the analogy stops: in IAM you cannot issue a 'no entry' badge to override a campus-wide one; you would need a deny policy or to change the original grant.",
  "terms": [
   [
    "Principal",
    "An identity that can be granted access: a user, group, service account, domain or special identifier."
   ],
   [
    "Role binding",
    "The pairing of a role with one or more principals in an allow policy."
   ],
   [
    "Allow policy",
    "The set of role bindings attached to a resource, also called an IAM policy."
   ],
   [
    "add-iam-policy-binding",
    "The gcloud subcommand that adds one member-role binding to a resource's policy."
   ],
   [
    "Predefined role",
    "A Google-curated role for a specific job, preferred over broad basic roles."
   ],
   [
    "IAM condition",
    "An expression attached to a binding that limits when it applies, such as an expiry time or resource name prefix."
   ]
  ],
  "example": "The data team needs to run BigQuery jobs in the analytics project only. The admin runs `gcloud projects add-iam-policy-binding analytics-prod --member=group:data-team@example.com --role=roles/bigquery.jobUser` and grants BigQuery Data Viewer on one dataset, rather than giving the group a broad role on the whole organization.",
  "mistakes": [
   [
    "Grant Editor at the organization so the team never gets blocked again.",
    "That gives write and delete access to almost everything in every project, now and later. Grant a predefined role at the lowest level that meets the need."
   ],
   [
    "Grant the role to each person on the team individually.",
    "Grant it to a Google group. Membership changes then update access everywhere without editing IAM policies."
   ],
   [
    "Use `--member=data-team@example.com` without a prefix.",
    "gcloud needs the type prefix, such as `group:`, `user:` or `serviceAccount:`. Without it the command fails or targets the wrong principal type."
   ],
   [
    "If a project's IAM page doesn't list a user, they have no access to it.",
    "They may have inherited roles from a folder or the organization, or roles on individual resources. Use the inherited view, Policy Analyzer or Policy Troubleshooter."
   ]
  ],
  "tryit": [
   [
    "Copperline's marketing department has eight projects in a Marketing folder, and two more will be created next quarter. The marketing-analysts group needs read-only access to Cloud Storage objects in all of them, and nothing elsewhere. Which grant do you make?",
    "Grant `roles/storage.objectViewer` to `group:marketing-analysts@example.com` on the Marketing folder. It inherits to all current and future projects in that folder and nowhere else, and it uses a narrow predefined role instead of Viewer or Editor."
   ],
   [
    "A contractor needs to manage VMs in one project for two weeks only. What would you add to the grant?",
    "Grant `roles/compute.instanceAdmin.v1` on that project with an IAM condition that expires on the contract end date, so access ends automatically."
   ]
  ],
  "tip": "Choose the lowest level that meets the requirement, grant to a group, and use a predefined role before a basic role. If the question mentions 'all projects in the department', a folder-level grant is usually the intended answer.",
  "check": [
   [
    "Which command removes a role from a group on a project?",
    "`gcloud projects remove-iam-policy-binding PROJECT --member=group:NAME@example.com --role=ROLE`."
   ],
   [
    "A user needs access to one bucket. Where should you grant the role?",
    "On the bucket itself, so the access doesn't extend to other buckets in the project."
   ],
   [
    "Which tool explains why a particular user has, or lacks, a permission on a resource?",
    "Policy Troubleshooter."
   ]
  ]
 },
 {
  "t": "Cloud Billing accounts: linking projects to billing and the billing IAM roles",
  "hook": "At Saltmarsh Media, the platform team's new project-creation pipeline keeps failing at the last step with a billing permission error. The finance lead, Grace, is happy to help but refuses to hand engineers full control of the company billing account, where the payment card and invoices live. Meanwhile a developer asks why the VMs in an old test project suddenly shut down overnight. You need to sort out who can pay, who can link, and who can only look. Which billing role does the pipeline actually need, and what happened to that test project?",
  "simple": "A Cloud Billing account is how Google Cloud knows who pays. It holds the payment details, like a credit card or an invoice arrangement. Projects are connected to a billing account, and each project can be connected to only one at a time, while one billing account can pay for many projects. If a project loses its billing connection, its paid services stop. Billing accounts have their own permissions, separate from project permissions: some people can manage everything, some can only connect projects to the account, and some can only view costs. It is like a family credit card: one parent manages the card, a teenager may be allowed to use it for school purchases, and a grandparent may only see the statement.",
  "body": [
   "A Cloud Billing account defines who pays for Google Cloud usage. It holds the payments profile, which may use a credit card or other self-serve payment method, or invoiced billing for larger customers, and it is linked to one or more projects. A project can be linked to only one billing account at a time, but one billing account can pay for many projects. The billing account has its own ID in the format of three groups of six hexadecimal characters, such as `0X0X0X-0X0X0X-0X0X0X`, and you see it in the console's Billing section and in gcloud output.",
   "Billing status directly affects running resources. If a project has no active billing account, because billing was disabled, the link was removed, or the payment method failed and the account was closed, its paid resources stop. VMs are shut down, billable APIs return errors, and if billing is not restored, data in that project can eventually be deleted. This is why the overnight VM shutdown in the hook is the first thing to investigate on the project's Billing page.",
   "Billing accounts are usually owned by the organization and have their own Identity and Access Management (IAM) roles, separate from project roles. Billing Account Administrator manages everything about the account, including payment methods, billing users, budgets and which projects are linked. Billing Account User lets someone link projects to that billing account but not change the account itself. Billing Account Viewer can see costs and transactions without changing anything. Billing Account Costs Manager can manage budgets and view and export cost information without managing payments. These roles are granted on the billing account, or at the organization so they apply to all billing accounts in it.",
   "Linking a project to billing takes permissions on both sides. On the billing account side you need Billing Account User or Administrator. On the project side you need a role that includes `resourcemanager.projects.createBillingAssignment`, which Project Billing Manager and Owner include. Project Billing Manager is granted on a project, folder or organization and lets someone attach or detach that project's billing without seeing the billing account's details. This two-sided check is why a pipeline can create a project successfully and then fail when linking it: it often has Project Creator but not Billing Account User.",
   "You link or change billing in the console, either from Billing, then Account management, or from the project's own Billing page, where you choose Change billing account. From the command line you use `gcloud billing projects link PROJECT_ID --billing-account=0X0X0X-0X0X0X-0X0X0X`, and `gcloud billing projects describe PROJECT_ID` shows the current link and whether billing is enabled. `gcloud billing accounts list` shows the billing accounts you can see. To detach billing, which stops paid services, you use `gcloud billing projects unlink PROJECT_ID`.",
   "When something goes wrong with billing, troubleshoot in a fixed order. First confirm the project is linked and that billing is enabled, using the project's Billing page or `gcloud billing projects describe`. Next check that the billing account itself is open and in good standing, which a Billing Account Administrator can see on the account overview. Finally, if a link operation fails, read the error for which permission is missing, and check both the billing account roles and the project roles of whoever, or whatever automation, made the request.",
   "Some companies use several billing accounts, for example one per business unit, per legal entity, or per reseller agreement, but most use one and split costs with projects, labels and reports. Moving a project to a different billing account is a relinking operation: resources stay where they are and keep running, and future charges simply go to the new account. If you need costs broken down by team or app inside one billing account, labels and the billing export to BigQuery are the usual tools, not extra billing accounts.",
   "A common least-privilege pattern ties this together. The finance team has Billing Account Administrator and owns the payments profile. A platform team or its automation service account that creates projects has Billing Account User on the corporate billing account, plus Project Creator on the right folder, so it can create and link new projects. Engineering managers might have Billing Account Viewer to watch costs, and a FinOps analyst might have Billing Account Costs Manager to set budgets. Developers have no billing roles at all, and when they need a new project they request it through the platform team."
  ],
  "analogy": "A Cloud Billing account is like a company credit card. The card administrator (Billing Account Administrator) can change the card, add users and see everything. An employee authorized to charge expenses to it (Billing Account User) can attach new purchases, meaning projects, but cannot change the card or the limit. An accountant with read access (Billing Account Viewer) sees statements only. Each purchase, or project, goes on exactly one card at a time. The analogy stops in one place: a declined card in real life just blocks new purchases, while losing billing in Google Cloud also stops resources already running.",
  "mnemonic": "A-U-V for billing roles: Administrator runs the account, User links projects to it, Viewer only looks. Costs Manager sits beside them for budgets and exports.",
  "terms": [
   [
    "Cloud Billing account",
    "The account that pays for usage in the projects linked to it."
   ],
   [
    "Billing Account User",
    "A role that allows linking projects to a billing account without managing it."
   ],
   [
    "Billing Account Administrator",
    "A role that manages a billing account's payment settings, users and links."
   ],
   [
    "Billing Account Viewer",
    "A role that can view costs and transactions on a billing account without changing anything."
   ],
   [
    "Billing Account Costs Manager",
    "A role that can manage budgets and view and export cost information without managing payments."
   ],
   [
    "Project Billing Manager",
    "A project-level role that allows attaching or detaching the project's billing."
   ]
  ],
  "example": "A platform team automates new project creation with Terraform. Its service account has Project Creator on a folder and Billing Account User on the corporate billing account, so it can create a project and link it to billing, but it can't view invoices or change the payment method.",
  "mistakes": [
   [
    "Give the pipeline Billing Account Administrator so linking always works.",
    "That also allows changing payment methods and users. Billing Account User is enough to link projects, combined with a project-side role such as Project Billing Manager, Owner or creator rights on new projects."
   ],
   [
    "A project can be split across two billing accounts to divide costs.",
    "A project has one billing account at a time. Split costs with separate projects, labels and billing reports."
   ],
   [
    "Project Owner automatically lets you link any billing account.",
    "You also need Billing Account User or Administrator on the billing account itself. Linking needs permission on both sides."
   ],
   [
    "Moving a project to another billing account requires migrating its resources.",
    "It's only a relink. Resources keep running; future charges go to the new account."
   ]
  ],
  "tryit": [
   [
    "At Saltmarsh Media, a FinOps analyst must create budgets and export cost data for all projects but must not change the payment method or link projects. An engineering manager only wants to watch monthly costs. Which roles do you grant on the billing account?",
    "Grant the analyst Billing Account Costs Manager, which covers budgets and cost export without payment management or linking. Grant the manager Billing Account Viewer, which is read-only. Neither needs Billing Account Administrator or User."
   ]
  ],
  "tip": "'Link projects but not change the billing account' is Billing Account User. 'View costs only' is Billing Account Viewer. 'Manage everything' is Billing Account Administrator.",
  "check": [
   [
    "Can a project be linked to two billing accounts?",
    "No. A project has at most one billing account at a time, though one billing account can pay for many projects."
   ],
   [
    "What happens to a project's paid resources if billing is disabled?",
    "They stop working; for example VMs are shut down, and data may eventually be deleted."
   ],
   [
    "Which gcloud command links a project to a billing account?",
    "`gcloud billing projects link PROJECT_ID --billing-account=ACCOUNT_ID`."
   ]
  ]
 },
 {
  "t": "Budgets, budget alerts and exporting billing data to BigQuery",
  "hook": "It is the first of the month at Lakeshore University, and Professor Okafor is in your office holding an invoice. Her lab's sandbox project was supposed to cost about $200 a month. This month it was many times that, because a student left a large GPU VM running over a long weekend. 'I thought we set a budget,' she says. You did: a $200 budget with alerts at 50%, 90% and 100%. The emails went to an inbox nobody reads. Why did a budget not stop the spending, and what would actually have caught it in time?",
  "simple": "Cloud costs can grow quietly, so Google Cloud gives you ways to watch them. A budget is a spending target with warning points, like 50%, 90% and 100%. When spending passes a warning point, Google sends alerts. Important: a budget only warns you; it never switches anything off by itself. If you want something to happen automatically, you connect the alerts to a small program that takes action. For deeper questions like 'which team spent the most last month', you can send detailed billing data into BigQuery, a database where you can ask questions in SQL. It is like a phone plan that texts you at 80% of your data, but keeps charging you if you ignore the text.",
  "body": [
   "Cloud Billing gives you several ways to watch spending, and each fits a different need. Reports in the console show cost trends by project, service, SKU (stock keeping unit, the individual billable item such as a particular machine type's core hours), label and time range, and they are the quickest way to see where money goes. For proactive control you create budgets and alerts, and for deep, custom analysis you export billing data to BigQuery. The exam often describes a need and asks which of these three fits, so it helps to keep their purposes separate in your head.",
   "A budget is set on a billing account and can be scoped to all of it or to selected projects, services or labels. You give it an amount, either a fixed number or last month's spend, and threshold rules such as 50%, 90% and 100%. Thresholds can be based on actual spend or forecasted spend, so you can be warned partway through the month that you are on track to exceed the budget, before it actually happens. You create budgets in the console under Billing, then Budgets and alerts, or with `gcloud billing budgets create`, and you need a role such as Billing Account Administrator or Billing Account Costs Manager to manage them.",
   "When a threshold is crossed, Google sends notifications. By default, email goes to billing account administrators and billing account users. You can also connect the budget to Cloud Monitoring notification channels, so alerts reach the team's usual paging or chat tools, and you can publish budget notifications to a Pub/Sub topic. Pub/Sub notifications are sent regularly with the current spend and budget amount, not only at thresholds, which makes them a good input for automation. In the hook, the alerts were working; they were just going to the wrong place.",
   "The most important fact about budgets is that they do not cap spending. A budget never stops a VM, disables an API or turns off billing on its own. If you need automatic action, for example disabling billing on a sandbox project when it reaches its limit, or stopping VMs labeled `env=sandbox`, you publish budget notifications to Pub/Sub and trigger your own code, such as a Cloud Run function, to take that action. Keep in mind that disabling billing stops every paid service in the project, so this pattern suits sandboxes, not production. Also note that billing data is not real time; there can be a delay of hours before usage appears in reports and budgets, so a budget can never be a precise, instant limit.",
   "Billing export to BigQuery writes detailed rows of cost and usage data to a dataset you choose, on an ongoing basis. There are three kinds of export: standard usage cost data, detailed usage cost data, which adds resource-level detail such as individual VM instances, and pricing data, which lists the prices for your billing account. You configure it in the console under Billing, then Billing export, by choosing a project and a BigQuery dataset. You need a role such as Billing Account Costs Manager or Billing Account Administrator on the billing account, plus a BigQuery role, such as BigQuery User, on the project that contains the dataset.",
   "Once the export is running, you can write SQL to break down cost by project, service, SKU, label or day. A typical query sums the `cost` column grouped by a label value and month, which answers questions like 'what did each lab spend in March'. You can then build dashboards in Looker Studio on top of the dataset. The export only includes data from when you enable it onward; it does not backfill your full history, so turn it on early, ideally the day you create the billing account. Billing export is also the right answer when finance wants to join cost data with other business data.",
   "Labels make all of these tools far more useful. Consistent label keys such as `env`, `team` and `app`, applied to resources like VMs, disks and buckets, flow into billing reports, budget filters and the BigQuery export. That lets you answer 'what does the checkout app cost' even when several apps share a project, and it lets you scope a budget to one team's resources. Agree on label keys and allowed values early, and enforce them through automation or reviews, because unlabeled resources show up as a blank category in every report.",
   "A complete cost-control setup usually combines all three tools. Each team or project has a budget with forecasted and actual thresholds, alerts flow to a monitored channel and to Pub/Sub, sandbox projects have automation that stops resources at their limit, and finance reviews monthly trends in reports and runs deeper SQL analysis on the BigQuery export. When an exam question asks for automatic action, look for Pub/Sub plus code; when it asks for SQL analysis or custom dashboards, look for billing export to BigQuery."
  ],
  "analogy": "A budget is like a smoke detector, not a sprinkler. It makes noise when something starts to go wrong, and a forecasted threshold is like a detector sensitive enough to sound before there are flames. But it does not put out the fire. If you want water to flow automatically, you connect the alarm to a sprinkler system, which is the Pub/Sub topic plus your own code. The analogy has a limit: a smoke detector reacts in seconds, while billing data can lag by hours, so even an automated response is not instant.",
  "terms": [
   [
    "Budget",
    "An amount and set of threshold rules that trigger alerts as actual or forecasted spend grows."
   ],
   [
    "Threshold rule",
    "A percentage of the budget that sends a notification when crossed."
   ],
   [
    "Forecasted spend",
    "Google's estimate of what the month's total will be, which budgets can alert on."
   ],
   [
    "Billing export",
    "A continuous feed of detailed Cloud Billing data into a BigQuery dataset."
   ],
   [
    "Detailed usage cost data",
    "The billing export type that adds resource-level detail, such as individual VM instances."
   ],
   [
    "Budget Pub/Sub notification",
    "A message published to a topic with current spend, used to trigger automated responses."
   ]
  ],
  "example": "A university gives each research lab a project with a $200 budget alerting at 50%, 90% and 100% of forecasted spend. Alerts publish to Pub/Sub, and a small function emails the lab lead. Finance also exports billing data to BigQuery and runs a monthly query grouped by the lab label.",
  "mistakes": [
   [
    "A budget at 100% stops resources automatically.",
    "Budgets only send notifications. To act automatically, publish to Pub/Sub and have your own code stop resources or disable billing."
   ],
   [
    "Use Cloud Audit Logs to analyze costs by team with SQL.",
    "Audit logs record who did what, not cost. For SQL cost analysis, use billing export to BigQuery."
   ],
   [
    "Billing export includes all past billing history once enabled.",
    "It captures data from the time you enable it onward, so enable it early."
   ],
   [
    "Budgets react instantly, so they can enforce a hard spending limit.",
    "Billing data can lag by hours. Budgets and any automation built on them are approximate, not hard real-time caps."
   ]
  ],
  "tryit": [
   [
    "Lakeshore University wants every lab sandbox to stop running VMs automatically when the month's spending reaches its budget, and to warn the lab lead when spending is forecast to exceed the budget. Production projects must never be shut down automatically. How do you set this up?",
    "Create a budget per sandbox project with a forecasted threshold (for example 100% forecasted) that notifies the lab lead through email or a Monitoring channel, and an actual-spend threshold at 100%. Connect the sandbox budgets to a Pub/Sub topic with a Cloud Run function that stops VMs or disables billing in that project. Don't attach the automation to production budgets; give those alerts only."
   ],
   [
    "Finance asks for a monthly breakdown of cost per team, joined with headcount data from another table. What do you enable?",
    "Billing export to BigQuery (standard or detailed usage cost data), with consistent `team` labels on resources, so finance can write SQL that groups cost by label and joins the headcount table."
   ]
  ],
  "tip": "If a question expects spending to stop automatically, a budget alone is wrong; it needs Pub/Sub notifications and code. For SQL analysis of costs, the answer is billing export to BigQuery, not audit logs.",
  "check": [
   [
    "Does a budget stop resources when it reaches 100%?",
    "No. It sends alerts. Automatic action requires handling Pub/Sub notifications with your own code."
   ],
   [
    "When does billing export start including data?",
    "From the time you enable it; it doesn't backfill all history, so enable it early."
   ],
   [
    "How can you be warned before the month ends that you will exceed a budget?",
    "Use a threshold based on forecasted spend instead of actual spend."
   ]
  ]
 },
 {
  "t": "Installing and configuring the Google Cloud CLI: gcloud init, named configurations, default project, region and zone",
  "hook": "Kenji works for Brightpath Consulting and supports two clients from the same laptop. Late on a Thursday he runs `gcloud compute instances delete test-vm-1` to clean up after a demo for the first client. The command succeeds. A minute later the second client's on-call engineer calls: their test VM, with the same name, has vanished. Kenji's terminal was still pointed at the second client's project from a call earlier that afternoon. Nobody lost production data this time, but his manager wants a fix before Monday. How do professionals make sure every command lands in the right project?",
  "simple": "The Google Cloud CLI is a set of command-line tools, mainly `gcloud`, that lets you control Google Cloud by typing commands instead of clicking. After installing it, you run `gcloud init`, which signs you in and asks which project, region and zone you usually work in, so you do not have to type them every time. Those saved choices are called a configuration. You can keep several named configurations, for example one for each customer or one for dev and one for production, and switch between them with one command. It is like having separate saved profiles in a music app for home and the gym: switching profiles changes all the settings at once, so you never play the wrong playlist.",
  "body": [
   "The Google Cloud CLI (command-line interface) is the command-line toolset for Google Cloud. It includes `gcloud` for most services, `gsutil`, the older Cloud Storage tool that is now largely replaced by `gcloud storage`, and `bq` for BigQuery. It can also install extra components, such as `kubectl` for Kubernetes and the alpha and beta command groups. You can install it on Linux, macOS or Windows, either with an installer, an archive or a system package manager, and it comes preinstalled and already authenticated in Cloud Shell. `gcloud version` shows what is installed, and `gcloud components list` shows which components are available or installed.",
   "After installing, run `gcloud init`. It opens a browser so you can authorize your user account, then creates or updates a configuration and asks you to pick a default project and, optionally, a default Compute Engine region and zone. On a machine without a browser, `gcloud init --no-launch-browser` or `gcloud auth login --no-launch-browser` gives you a link and code to complete sign-in elsewhere. If you only need to add or refresh credentials without the rest of the setup, `gcloud auth login` authorizes a user account, and `gcloud auth list` shows which accounts are credentialed and which one is active, marked with an asterisk.",
   "Keep in mind that `gcloud auth application-default login` is different, and the exam likes this distinction. It creates Application Default Credentials (ADC) on your machine, which the Google Cloud client libraries in your own code look for automatically. It does not change which account the gcloud CLI itself uses. So if your Python script fails with a credentials error on your laptop while gcloud commands work fine, ADC is the missing piece. In production, code running on Google Cloud uses the attached service account through ADC instead, and you should not need user credentials at all.",
   "A configuration is a named set of properties. The main ones are `core/account`, `core/project`, `compute/region` and `compute/zone`. You set them with commands such as `gcloud config set project my-proj` or `gcloud config set compute/zone us-central1-a`, and you can unset them with `gcloud config unset`. `gcloud config list` shows the properties in the active configuration, and `gcloud config get-value project` prints just one. If a command needs a zone and none is set or passed with `--zone`, gcloud will prompt you or fail, depending on whether it is running interactively.",
   "Named configurations are how professionals avoid running commands in the wrong place, which is exactly Kenji's problem. `gcloud config configurations create prod` creates a new configuration named prod and activates it; you then set its account, project, region and zone. `gcloud config configurations activate dev` switches back, and `gcloud config configurations list` shows all of them with the active one marked as true. You can also describe or delete configurations. Many people add the active configuration or project to their shell prompt, so the context is always visible before pressing Enter.",
   "You can override properties for a single command without changing the configuration. Flags such as `--project=my-proj`, `--zone=europe-west1-b` and `--configuration=prod` apply only to that command. The `CLOUDSDK_ACTIVE_CONFIG_NAME` environment variable sets the active configuration for one shell session, which is handy when you keep two terminals open for two customers. Scripts should pass `--project` explicitly rather than relying on whatever configuration happens to be active on the machine that runs them.",
   "Precedence matters when values conflict. A flag on the command line wins over an environment variable, which wins over the property stored in the active configuration. If a question describes a command that ran against an unexpected project, check the active configuration first, then any environment variables, and remember that an explicit `--project` flag would have prevented the problem. Running `gcloud config list` before any destructive command takes a second and shows exactly which account, project and zone the command will use.",
   "Keep the CLI current with `gcloud components update`. On installs managed by a package manager such as apt or yum, the component manager is disabled and you update through the package manager instead. Many new features appear first under `gcloud beta` or `gcloud alpha` command groups, which need their components installed and may change without notice, so use them carefully in scripts. With the CLI installed, authorized and organized into named configurations, you can work across many projects and customers with confidence."
  ],
  "analogy": "Named configurations are like contact profiles on a work phone that also switch the SIM card. When you switch to the 'Client A' profile, the number you call from, the address book and the default area code all change together. Forgetting to switch means you call the right person from the wrong line. A command-line flag such as `--project` is like dialing a full number with country code: it works no matter which profile is active. The analogy stops for Application Default Credentials, which are a separate badge your apps use, not part of the phone profile.",
  "terms": [
   [
    "gcloud init",
    "An interactive command that authorizes an account and sets up a configuration with defaults."
   ],
   [
    "Named configuration",
    "A saved set of gcloud properties, such as account, project, region and zone, that you can switch between."
   ],
   [
    "Application Default Credentials",
    "Credentials that client libraries find automatically; set locally with gcloud auth application-default login."
   ],
   [
    "gcloud config set",
    "The command to set a property, such as compute/zone, in the active configuration."
   ],
   [
    "gcloud auth list",
    "The command that shows credentialed accounts and which one is active."
   ],
   [
    "gcloud components update",
    "The command that updates the CLI and its components on installs not managed by a package manager."
   ]
  ],
  "example": "An engineer supports two customers. She creates configurations named acme and globex, each with its own account, project and region. Before a change she runs `gcloud config configurations activate acme`, and her shell prompt shows the active configuration, so she never deploys to the wrong customer.",
  "mistakes": [
   [
    "Use `gcloud compute zones set us-central1-a` to set a default zone.",
    "That command doesn't exist. The correct syntax is `gcloud config set compute/zone us-central1-a`."
   ],
   [
    "Running `gcloud auth application-default login` changes which account gcloud uses.",
    "It only creates credentials for client libraries in your code. gcloud's own account comes from `gcloud auth login` and the configuration's core/account."
   ],
   [
    "You must run `gcloud init` again every time you switch projects.",
    "Use `gcloud config set project` or switch named configurations with `gcloud config configurations activate`."
   ],
   [
    "A configuration's default project always wins.",
    "A `--project` flag on the command, or an environment variable, overrides the active configuration's property."
   ]
  ],
  "tryit": [
   [
    "Kenji needs to work safely on two clients, each with its own Google account, project and default region. He sometimes keeps two terminals open at once. What setup do you recommend?",
    "Create two named configurations with `gcloud config configurations create`, and set account, project, region and zone in each. Switch with `gcloud config configurations activate`, or set `CLOUDSDK_ACTIVE_CONFIG_NAME` per terminal so each window is pinned to one client, and show the active configuration in the shell prompt. For scripts, pass `--project` explicitly."
   ],
   [
    "A developer's gcloud commands work, but her local Python app using a Google Cloud client library fails with a 'could not find default credentials' error. What should she run?",
    "`gcloud auth application-default login`, which creates Application Default Credentials for client libraries. Her gcloud login doesn't provide credentials to the app."
   ]
  ],
  "tip": "Know the exact syntax: `gcloud config set compute/zone ZONE`, `gcloud config set project ID` and `gcloud config configurations activate NAME`. Distractors often invent commands like `gcloud compute zones set`.",
  "check": [
   [
    "What does gcloud config configurations create do?",
    "It creates a new named configuration and makes it active, so you can set its properties."
   ],
   [
    "How is gcloud auth application-default login different from gcloud auth login?",
    "The first creates credentials for client libraries in your code; the second authorizes the gcloud CLI itself."
   ],
   [
    "How do you see which properties are set in the active configuration?",
    "Run `gcloud config list`."
   ]
  ]
 },
 {
  "t": "Cloud Shell, the Google Cloud console and Cloud Shell Editor",
  "hook": "Maya is on call for Redwood Outfitters and is visiting family when her phone buzzes at 11 p.m.: checkout errors are spiking. Her work laptop is at the office. All she has is her cousin's old desktop and a browser. She cannot install anything, and she needs `kubectl` and `gcloud` within minutes to look at pods and logs. Last week she saved a troubleshooting script somewhere in her cloud environment, but she is not sure it survived. What can she open in a browser right now, and what can she count on still being there?",
  "simple": "The Google Cloud console is the website where you manage everything in Google Cloud by clicking. Cloud Shell is a terminal that opens inside that website. It runs on a small computer that Google manages for you, already signed in as you, with the common tools installed. You do not need to install anything on your own computer. You get a personal home folder that keeps your files between sessions, but anything you install outside that folder disappears when the session's computer is replaced. Cloud Shell Editor is a code editor that also runs in the browser and edits the same files. It is like a library computer that keeps your personal locker of files, even though the computer itself is wiped each night.",
  "body": [
   "The Google Cloud console is the web interface at the heart of daily work. You use the project picker at the top to choose which project you are working in, the navigation menu to reach each product, and the search bar to jump straight to a service, a resource or even a documentation page. You can pin frequently used products to the top of the navigation menu, and the dashboard for each project shows key information such as the project ID and number, recent activity and resource summaries. Always check the project picker before making changes; it is the console's equivalent of checking your active gcloud configuration.",
   "Many console pages have an Equivalent code or Equivalent command line link, often at the bottom of a create form. It shows the gcloud command, REST request or sometimes Terraform that matches what you have configured in the form. This is a great way to learn the command-line interface (CLI) and to turn a one-off console action into a repeatable script. On the exam, if someone wants the command that matches what they built in the console, this link is the answer.",
   "Cloud Shell is a free, browser-based terminal that runs on a temporary Compute Engine virtual machine (VM) managed by Google. It is already authenticated as the user who opened it, and it comes with the Google Cloud CLI, `kubectl`, Terraform, Docker, git, common language runtimes and editors such as vim and nano preinstalled. You open it with the Activate Cloud Shell terminal icon at the top of the console, and it starts in the current project. Because it runs in the browser, it is ideal when you cannot install software locally, when you are on a borrowed or locked-down machine, or when you need to run a quick command from anywhere.",
   "Each user gets a persistent home directory of a few gigabytes that survives between sessions, so scripts, configuration files, cloned repositories and dotfiles such as `.bashrc` you keep in `$HOME` remain available the next time. Anything installed outside the home directory, for example a package added with `sudo apt install`, is lost when the VM is recycled. If you need extra tools every time, install them into your home directory or add the install steps to a startup script such as `.customize_environment` in your home directory, which Cloud Shell runs when a session starts.",
   "Cloud Shell is meant for interactive use, not as a server. Sessions end after a period of inactivity, there is a weekly usage limit, and if you do not use Cloud Shell for a long time, your home directory may be deleted. So do not treat it as long-term storage or as a place to run long background jobs. Keep important code in a source repository, keep data in Cloud Storage, and treat Cloud Shell as a convenient, disposable workspace with a small persistent locker.",
   "Cloud Shell Editor is a browser-based code editor built on the open source Code OSS project, the same base as Visual Studio Code. You open it with the Open Editor button in the Cloud Shell toolbar. It edits files in your Cloud Shell home directory, works with git, and includes Cloud Code extensions that help you write Kubernetes and Cloud Run configuration, deploy to Cloud Run or Google Kubernetes Engine (GKE), and browse documentation. You can switch between the editor and the terminal, which share the same files. For heavier or long-running development, Google also offers Cloud Workstations, which are managed, configurable development environments that you pay for.",
   "The console and Cloud Shell include a few other everyday tools. The Activity view shows recent actions in a project, and the Notifications panel shows the progress of long-running operations such as creating a cluster. Cloud Shell's web preview lets you open a web server running inside the session, on a port such as 8080, in a new browser tab through a temporary proxied address, which is handy for testing an app before deploying it. You can also upload and download files through the Cloud Shell menu.",
   "For the exam, connect each tool to its best use. The console is for exploring, one-off changes and seeing inherited settings. Cloud Shell is the quickest way to run gcloud, kubectl, bq or Terraform from any browser without installing anything. The Equivalent code link bridges the two. Cloud Shell Editor is for quick edits and small projects tied to your Cloud Shell files, while Cloud Workstations suits full-time development environments."
  ],
  "analogy": "Cloud Shell is like a hotel room with a personal safe. Each time you check in, you may get a different room, freshly cleaned, with the standard amenities already provided, like towels and a TV, the way Cloud Shell provides gcloud and kubectl. Anything you leave lying around the room is gone after checkout, just like software installed outside your home directory. But your safe, the home directory, follows you from room to room. The analogy has one gap: if you stay away for a very long time, even the safe can be emptied.",
  "terms": [
   [
    "Cloud Shell",
    "A free, preauthenticated browser terminal on a temporary VM with Google Cloud tools preinstalled."
   ],
   [
    "Cloud Shell Editor",
    "A browser-based code editor built on Code OSS that works on the Cloud Shell home directory."
   ],
   [
    "Persistent home directory",
    "Cloud Shell storage that survives between sessions, unlike the rest of the VM."
   ],
   [
    "Web preview",
    "A Cloud Shell feature that opens a web server running in the session on a chosen port."
   ],
   [
    "Equivalent code link",
    "A console option that shows the gcloud command or REST request for what you configured in a form."
   ],
   [
    "Cloud Workstations",
    "Managed, paid development environments for heavier or long-running development work."
   ]
  ],
  "example": "On a hotel business center PC, an on-call engineer signs in to the console, opens Cloud Shell and runs `kubectl get pods` and `gcloud logging read` to diagnose an incident, without installing anything. Her helper scripts are in her Cloud Shell home directory from last week.",
  "mistakes": [
   [
    "Packages installed with apt in Cloud Shell will be there next session.",
    "Only the home directory persists. Install tools into $HOME or script the install in a startup file such as .customize_environment."
   ],
   [
    "Cloud Shell is a good place to run a long background job or host a small app.",
    "Sessions end after inactivity and have usage limits. Use Compute Engine, Cloud Run or another service for long-running work."
   ],
   [
    "Cloud Shell needs you to run gcloud auth login before using it.",
    "It is already authenticated as the user who opened it."
   ],
   [
    "To learn the command for a console action, you must search the documentation.",
    "Many console forms provide an Equivalent code or command line link that shows the exact command."
   ]
  ],
  "tryit": [
   [
    "Maya is on a borrowed computer with only a browser. She needs to check GKE pods and read recent logs, and she wants a helper script she wrote last week. Where should she work, and where should her script have been saved to still be there?",
    "She should open Cloud Shell from the console; it is preauthenticated and has gcloud and kubectl installed. Her script will be there only if she saved it in her Cloud Shell home directory, which persists between sessions, as long as she hasn't left Cloud Shell unused for a very long time. A copy in a source repository is safer."
   ],
   [
    "A developer is testing a small web app in Cloud Shell listening on port 8080 and wants to see it in a browser before deploying. What should he use?",
    "Cloud Shell web preview on port 8080, which opens the app in a new tab through a temporary proxied address."
   ]
  ],
  "tip": "'Can't install software locally' or 'quickest way to run gcloud and kubectl' points to Cloud Shell. Remember only the home directory persists.",
  "check": [
   [
    "Which part of a Cloud Shell environment persists between sessions?",
    "The home directory. Software installed elsewhere on the VM is lost when the session's VM is recycled."
   ],
   [
    "How can you learn the gcloud command for something you configured in the console?",
    "Use the Equivalent code or command line link shown on many console creation pages."
   ],
   [
    "Which open source project is Cloud Shell Editor built on?",
    "Code OSS, the same base as Visual Studio Code."
   ]
  ]
 },
 {
  "t": "Quotas: viewing usage, understanding quota errors and requesting increases",
  "hook": "It is launch morning at Juniper Games, and the new multiplayer servers are supposed to scale out to handle the opening rush. Instead, the managed instance group is stuck. Omar on the platform team pastes an error into the incident channel: Quota 'CPUS' exceeded, Limit: 24.0 in region us-east1. Someone suggests granting the deployment service account Owner. Someone else wants to disable and re-enable the Compute Engine API. Players are already posting about queue times. What does this error actually mean, and what is the fastest correct fix?",
  "simple": "Quotas are limits Google Cloud places on each project, such as how many processors you can run in a region or how many requests per minute you can send to a service. They protect you from surprise bills and runaway mistakes, and they protect Google's shared systems. When you hit a quota, your request fails with an error that names the limit and, often, the region. Most quotas can be raised by sending a request with a short reason, and some are approved quickly. A few hard limits, called system limits, can never be raised. It is like a credit card limit: the bank sets a starting limit, you can ask for more, but the request can take time, so ask before the big purchase.",
  "body": [
   "Quotas protect both you and Google Cloud from unexpected usage. They stop a runaway script or a compromised account from creating thousands of virtual machines (VMs), and they keep shared capacity fair across customers. There are two main kinds. Allocation quotas limit how much of a resource a project can hold at once, such as the number of CPUs in a region, the number of static external IP addresses, or the total persistent disk capacity. Rate quotas limit how often you can call an API in a period, such as requests per minute per project. Separately, system limits are fixed values that cannot be raised, such as the maximum size of a single object or disk, and you design around them instead of requesting more.",
   "Many Compute Engine quotas are regional. The CPUS quota in us-central1 is separate from the one in europe-west1, and there are separate quotas for specific machine families, for GPUs by type, for Spot and preemptible capacity, for persistent disk capacity by disk type, and for in-use external IP addresses. A few quotas are global for the project, such as the number of VPC networks or firewall rules. Because of this, a deployment can fail in one region while the same deployment would succeed in another, and a quota that looks generous overall can still be too small in the region you actually need. New projects and free trial accounts start with conservative quotas.",
   "When a request would exceed a quota, it fails with a message that names the metric, the limit and usually the region, for example `Quota 'CPUS' exceeded. Limit: 24.0 in region us-central1`. In a managed instance group you would see the group unable to reach its target size, with the error repeated in its status and in Cloud Logging. API rate quota errors usually return HTTP 429 Too Many Requests, or the status RESOURCE_EXHAUSTED in gRPC-based APIs. Read the message carefully: it tells you exactly which quota to raise and where, which saves you from guessing.",
   "Quota errors are not permission errors, and that distinction is a favorite exam trap. Granting Owner, adding IAM roles, re-enabling the API, moving the project to another folder or changing billing accounts does not change the quota. The fixes are to request a higher limit for the named metric and region, to reduce what you are asking for, for example by using a smaller machine type, or to deploy in a region that has spare quota. For rate quotas, clients should also retry with exponential backoff, which spreads requests out instead of hammering the API.",
   "To view and manage quotas, go to IAM and admin, then Quotas and system limits in the console, or open a specific service's page and choose its Quotas tab. You can filter by service, metric, dimension such as region, and usage, and you can see current usage against each limit, often with a chart of recent peaks. From the command line, regional Compute Engine quotas also appear in `gcloud compute regions describe us-central1`, which lists each metric with its limit and usage, and project-wide ones in `gcloud compute project-info describe`.",
   "To raise a quota, select it on the Quotas page, choose Edit quota, enter the new value and a short justification, and submit. Some increases are granted automatically within minutes, especially modest ones on projects with good billing history; others are reviewed by Google and may take longer or be partially approved. Plan ahead of big launches, load tests and migrations, and request increases days or weeks in advance rather than on launch morning. You need a role that includes the `serviceusage.quotas.update` permission, such as Quota Administrator or Owner, and the project usually needs an active billing account.",
   "Quotas are not only something you raise; you can also lower them yourself. Setting a lower quota, for example capping an API's requests per day or limiting the number of GPUs in a sandbox project, is a simple cost and safety control, because requests beyond the cap fail instead of generating charges. You can also create Cloud Monitoring alerts on quota usage, so you are warned when usage reaches, say, a high percentage of a limit, well before deployments start failing.",
   "Putting this together for exam scenarios: if an error names a quota, the answer involves the Quotas page and the named metric and region, or deploying somewhere else, never IAM. If the requirement is to prevent overspending on an API, consider lowering a quota. If a team is planning a large event, the best answer is to check quotas and request increases in advance. And if a value is a system limit, no request will change it, so the design must change instead."
  ],
  "analogy": "Quotas are like the seating capacity rules for rooms in a conference center. Each room, like each region, has its own capacity, so a full room in one wing says nothing about space in another. You can ask the venue manager to open the partition and add chairs, which is a quota increase, but approval may take time, so you ask before the event. Some limits, like the fire code for the whole building, never change; those are system limits. The analogy stops for rate quotas, which limit how fast people enter rather than how many fit.",
  "mnemonic": "A-R-S for the three kinds of limits: Allocation (how much you can hold), Rate (how often you can call), System limit (fixed, can't be raised).",
  "terms": [
   [
    "Allocation quota",
    "A limit on how much of a resource a project can hold, such as regional CPUs."
   ],
   [
    "Rate quota",
    "A limit on how many API requests can be made in a time period."
   ],
   [
    "System limit",
    "A fixed maximum that can't be increased by request."
   ],
   [
    "Quota increase request",
    "A request made from the Quotas page to raise a limit, sometimes approved automatically."
   ],
   [
    "RESOURCE_EXHAUSTED",
    "The error status, often with HTTP 429, returned when a rate quota is exceeded."
   ],
   [
    "Quota Administrator",
    "A role that includes permission to view and change quotas, including submitting increase requests."
   ]
  ],
  "example": "A team plans a 200-VM load test in us-east1. A week before, they check the Quotas page, see a CPUS limit that is too low for their machine type, and request an increase with a short justification. The request is approved before the test, avoiding a launch-day failure.",
  "mistakes": [
   [
    "A quota error means the service account needs more IAM permissions.",
    "Quotas are separate from IAM. Request an increase for the named metric and region, use fewer resources, or deploy in another region."
   ],
   [
    "Disabling and re-enabling the API resets the quota.",
    "It doesn't change quota limits. Only an approved increase, a lower request or a different region helps."
   ],
   [
    "CPU quota is one global number for the whole project.",
    "Most Compute Engine quotas, including CPUs, are regional. Each region has its own limit."
   ],
   [
    "Any limit can be raised if you ask.",
    "System limits are fixed. You must change the design to work within them."
   ]
  ],
  "tryit": [
   [
    "Juniper Games' managed instance group in us-east1 cannot grow past its current size, and the error names the CPUS quota in that region. Launch is in progress and players are waiting. The team also has unused CPU quota in us-central1, and latency to players is similar from both regions. What do you do now, and what should change for next time?",
    "Right now, either submit an increase request for CPUS in us-east1 (it may be approved quickly) or, to recover faster, add capacity in us-central1 where quota is available. IAM changes or re-enabling APIs won't help. For next time, review quotas on the Quotas page before launches, request increases in advance, and set Cloud Monitoring alerts on quota usage."
   ]
  ],
  "tip": "Quota errors are fixed by requesting an increase for the named metric and region (or deploying elsewhere). Re-enabling APIs, changing IAM or moving folders doesn't change quotas.",
  "check": [
   [
    "Are Compute Engine CPU quotas global or regional?",
    "Mostly regional; each region has its own CPU quota."
   ],
   [
    "Which HTTP status often indicates a rate quota was exceeded?",
    "429 Too Many Requests (RESOURCE_EXHAUSTED)."
   ],
   [
    "How could you stop a sandbox project from making unlimited calls to a paid API?",
    "Lower that API's quota, for example its requests per day, so extra calls fail instead of generating cost."
   ]
  ]
 },
 {
  "t": "Regions, zones and labels: placing resources and organizing them for cost reporting",
  "hook": "At Cedar Valley Health, the patient portal went down for two hours last month when a single zone had a problem, because every VM, plus its disk, lived in us-central1-a. Now the CFO, Helen, has a second complaint: the monthly invoice shows one large number for the shared platform project, and nobody can say how much the portal costs compared with the scheduling app. You are asked to redesign placement and fix the reporting in one plan. Where should the resources live, and how do you make the bill tell you which app spent what?",
  "simple": "Google Cloud runs in data centers around the world. A region is a geographic area, like Iowa or Belgium. Each region has several zones, which are separate sections with their own power and networking, so one zone can fail without the others. If you put all your servers in one zone and it has trouble, your app goes down; spreading them across zones keeps it running. Labels are simple name tags, like team=payments or env=prod, that you attach to resources. They show up on the bill, so you can see what each team or app costs. It is like a supermarket chain with stores in several neighborhoods of a city, and price stickers on every item that say which department it belongs to.",
  "body": [
   "Google Cloud infrastructure is divided into regions and zones. A region is a specific geographic location, such as us-central1 (Iowa), europe-west1 (Belgium) or asia-northeast1 (Tokyo). Each region contains several zones, named by adding a letter to the region, such as us-central1-a, us-central1-b and us-central1-c. A zone is an isolated deployment area with its own power, cooling and networking, so a failure in one zone should not affect the others in the same region. Zones in a region are connected by fast, low-latency networking, which makes it practical to spread one application across them.",
   "Every resource has a scope, and that scope shapes how you design for availability. Zonal resources, such as a virtual machine (VM) instance or a zonal persistent disk, live in one zone and fail with it. Regional resources span zones in one region: examples include subnets, regional managed instance groups, regional persistent disks that replicate synchronously across two zones, regional Google Kubernetes Engine (GKE) clusters, and Cloud SQL instances configured for high availability. Global resources, such as Virtual Private Cloud (VPC) networks, firewall rules, global external load balancers and custom images, are not tied to one region. Cloud Storage adds multi-region and dual-region locations for buckets, alongside single regions.",
   "Knowing the scope helps you read exam scenarios. If a requirement is to survive a zone failure, spread the workload across at least two zones in a region, for example with a regional managed instance group behind a load balancer and data on a regional disk or a highly available database. If the requirement is to survive the loss of a whole region, you need resources in a second region, such as a standby deployment and replicated data, which is disaster recovery rather than simple high availability. A single VM in one zone, however large, survives neither.",
   "Choosing a region involves several factors. Latency to users matters, so you usually place workloads near most of your customers. Data residency and compliance rules may require certain data to stay in a country or area, which organization policies can enforce through the resource locations constraint. Not every product, machine type or GPU is available in every region or zone, so check availability before committing. Price also varies by region, and network egress between regions costs money, so keeping chatty components in the same region saves both latency and cost. You can list options with `gcloud compute regions list` and `gcloud compute zones list`, and set defaults with `gcloud config set compute/region` and `compute/zone`.",
   "Labels are key-value pairs, such as `env=prod`, `team=payments` or `app=portal`, that you attach to resources like VMs, disks, buckets, BigQuery datasets and projects. They are used to organize and filter resources, for example `gcloud compute instances list --filter=labels.env=prod`, and most importantly to break down costs, because labels appear in billing reports and in the BigQuery billing export. Keys and values must be lowercase, can contain letters, digits, underscores and hyphens, and keys must start with a letter. You set them in the console or with commands such as `gcloud compute instances update web-1 --update-labels=env=prod` and remove them with `--remove-labels=env`.",
   "Labels pay off only when they are consistent. Agree on a small set of keys, such as env, team, app and cost-center, define allowed values, and apply them at creation time through templates, Terraform modules or deployment pipelines. A resource with `env=Prod` cannot even exist because uppercase is not allowed, but `env=production` next to `env=prod` will split your reports into two categories. In billing reports you can then group or filter by label, and in the BigQuery export you can sum cost by label value to answer what each application costs, even when several apps share one project.",
   "Do not confuse labels with network tags. Network tags are plain strings, such as `web-server`, attached to VM instances and used to target firewall rules and routes; they do not appear as cost categories in billing. There are also resource manager tags, which are key-value pairs defined centrally at the organization or project level, attached to resources, and usable in IAM conditions and organization policy conditions. Tags are for access and policy decisions; labels are for organizing and cost reporting. For cost reporting across applications, the usual exam answer is labels.",
   "Bringing it together for the hook: Cedar Valley Health should run the portal in a regional managed instance group across several zones of one region, behind a load balancer, with a highly available database, and consider a second region for disaster recovery. Every resource should carry labels such as `app=portal` and `env=prod`, and finance should use billing reports and the BigQuery export grouped by the app label. Placement solves the outage; labels solve the bill."
  ],
  "analogy": "Regions and zones are like a city and its neighborhoods, each with its own power substation. If one neighborhood loses power, stores in other neighborhoods stay open, so a chain with branches in several neighborhoods keeps serving customers; opening in a second city protects against a citywide disaster. Labels are like department stickers on every item in the store, so the accountant can total spending by department. The analogy stops with network tags: they are more like door badges that control which doors open, not stickers that show up on the receipt.",
  "mnemonic": "G-R-Z, scope from biggest to smallest: Global, Regional, Zonal. A VPC network is global, a subnet is regional, a VM is zonal.",
  "terms": [
   [
    "Region",
    "An independent geographic area, such as us-central1, made up of zones."
   ],
   [
    "Zone",
    "An isolated deployment area within a region, such as us-central1-a."
   ],
   [
    "Label",
    "A key-value pair on a resource used to organize, filter and report costs."
   ],
   [
    "Network tag",
    "A string on a VM used to apply firewall rules and routes to it."
   ],
   [
    "Regional persistent disk",
    "A disk that replicates synchronously across two zones in a region for higher availability."
   ],
   [
    "Resource manager tag",
    "A centrally defined key-value pair attached to resources and used in IAM and organization policy conditions."
   ]
  ],
  "example": "A media company runs its video API on instances in three zones of europe-west4 so a zone outage doesn't take it down. Every resource carries labels app=video and env=prod, so finance can see the app's monthly cost in the billing export even though it shares projects with other apps.",
  "mistakes": [
   [
    "Use network tags to report costs by application.",
    "Network tags target firewall rules and routes and don't appear as cost categories. Use labels for cost reporting."
   ],
   [
    "Putting several VMs in the same zone protects against a zone outage.",
    "They all fail with that zone. Spread instances across zones, for example with a regional managed instance group."
   ],
   [
    "A VPC network and its subnets are both regional.",
    "The VPC network is global; subnets are regional."
   ],
   [
    "Running in multiple zones of one region protects against a regional outage.",
    "Zones protect against zone failure only. Surviving a region failure needs resources and data in another region."
   ]
  ],
  "tryit": [
   [
    "Cedar Valley Health's portal runs on four VMs in us-central1-a with a zonal disk for uploads. Management wants the portal to survive a zone outage with little extra effort and to see the portal's cost separately from other apps in the same project. What changes do you make?",
    "Move the VMs into a regional managed instance group spread across several zones of us-central1 behind a load balancer, and store uploads on a regional persistent disk or, better, Cloud Storage. Make the database highly available across zones. Label every portal resource with `app=portal` (and env), then group billing reports or the BigQuery export by that label."
   ],
   [
    "A team wants firewall rules that allow HTTP only to web server VMs, and also wants to track web server cost. Which mechanism serves each need?",
    "A network tag such as `web-server` on the VMs, targeted by the firewall rule, and a label such as `app=web` for cost reporting. They are separate features."
   ]
  ],
  "tip": "Zone failure means spread across zones in a region; region failure means another region. For cost by application, choose labels, not network tags.",
  "check": [
   [
    "Name a global, a regional and a zonal resource.",
    "Global: a VPC network. Regional: a subnet or regional persistent disk. Zonal: a VM instance."
   ],
   [
    "What are network tags used for?",
    "Targeting firewall rules and routes to specific VMs."
   ],
   [
    "How would you add the label env=prod to an existing VM named web-1?",
    "`gcloud compute instances update web-1 --update-labels=env=prod`."
   ]
  ]
 },
 {
  "t": "Choosing a compute option: Compute Engine, GKE, Cloud Run, Cloud Run functions and App Engine",
  "hook": "You are the only cloud engineer at Juniper Valley Outfitters, and the planning meeting has handed you four workloads at once. There is an old inventory server whose vendor agent only installs on a specific Linux kernel. There are twenty-two container-based microservices the developers want to run with Helm charts. There is a new returns API that is busy on Mondays and silent most nights. And marketing wants thumbnails made automatically whenever someone drops a photo into a bucket. Your manager, Dana, asks a simple question before the meeting ends: can you put all of this on one service and be done with it? You suspect the honest answer is no. So which service fits each job, and why?",
  "simple": "Google Cloud gives you several ways to run your code, and they differ in how much work you do yourself. At one end you rent a whole virtual computer and look after everything on it, like renting an empty apartment and buying your own furniture. At the other end you hand Google a small packaged app, or even a single piece of code, and Google runs it only when someone needs it, like ordering a meal instead of cooking. In between are options for running many packaged apps together. The trade-off is always the same: more control means more work for you, and less work for you means accepting Google's way of doing things. Picking well means matching the job to the right point on that scale.",
  "body": [
   "Google Cloud offers a spectrum of compute services, from full control to fully managed. A large share of Associate Cloud Engineer exam questions come down to picking the right one, so it pays to learn what each service is for and, just as important, what it takes off your plate. As you move along the spectrum, Google takes over more of the operational work, such as patching operating systems, managing clusters and scaling, and you give up some control in exchange.",
   "Compute Engine sits at the full-control end. It is infrastructure as a service (IaaS): virtual machines (VMs) where you choose the machine type, operating system (OS) image and disks, and you manage the operating system yourself, including patches, agents and software. Choose it for lift-and-shift migrations where you want to move a server without rewriting it, for software that needs a specific OS, kernel module or license, for long-running stateful servers, or when you need graphics processing units (GPUs) with full control over drivers. On its own a VM is a single machine, but managed instance groups add autoscaling and self-healing by creating identical VMs from a template and replacing unhealthy ones. In the console you would see this under Compute Engine, VM instances, with each VM showing a zone, machine type and external or internal IP address.",
   "Google Kubernetes Engine (GKE) is managed Kubernetes. Google runs the control plane, which includes the Kubernetes API server and scheduler, and you deploy containers using Kubernetes objects such as Deployments and Services described in YAML files. Choose it for containerized microservices that need Kubernetes features, for portability across environments that already use Kubernetes, for fine control over networking and scheduling, or for packing many services onto shared capacity. GKE has two modes. Autopilot mode removes node management, so Google provisions and maintains the nodes and you pay mainly for what your pods request. Standard mode gives you control over nodes and node pools, and you pay for the node VMs. If a scenario mentions Helm charts, kubectl, pods or an existing Kubernetes setup, GKE is almost always the intended answer.",
   "Cloud Run is a serverless platform for containers. You give it a container image that either listens for HTTP requests (a Cloud Run service) or runs to completion (a Cloud Run job), and Google handles the servers, the scaling, including scaling to zero when there is no traffic, and the HTTPS endpoint. You pay for resources used while handling requests, or for instance time, depending on billing settings. Choose it for stateless web apps and APIs with variable traffic when you do not need Kubernetes. The word stateless matters: instances can start and stop at any time, so anything that must persist has to live in a database or Cloud Storage, not on the container's local file system.",
   "Cloud Run functions, formerly called Cloud Functions, go one step further. Instead of building a container, you deploy just a function written in a supported language, and Google builds and runs it. A function is triggered either by an HTTP request or by an event, such as a file uploaded to Cloud Storage or a message published to a Pub/Sub topic. Functions run on Cloud Run infrastructure, which is why Google now presents them as part of Cloud Run. They are ideal for small pieces of glue code that react to something happening, like resizing an image or writing a record when a message arrives.",
   "App Engine is Google's original platform as a service (PaaS) for web apps. The standard environment runs apps in language-specific sandboxes and can scale to zero. The flexible environment runs apps in containers on managed VMs, which allows more customization but does not scale to zero in the same way. Each project can have only one App Engine application, created in one region that cannot be changed afterward. New projects are generally steered toward Cloud Run, but App Engine still appears in exam scenarios, for example splitting traffic between versions of an app to test a new release on a small share of users.",
   "To pick quickly under exam pressure, read the scenario for keywords. Words like kernel, OS control, custom agent or license point to Compute Engine. Kubernetes, Helm or pods point to GKE. A stateless container that should scale to zero with no infrastructure to manage points to Cloud Run. Run code when a file is uploaded or when a message arrives points to Cloud Run functions. An existing App Engine app or a question about traffic splitting between versions points to App Engine.",
   "A useful overall rule ties it together: the less you want to manage, the further toward Cloud Run and functions you go; the more control or special OS requirements you have, the further toward Compute Engine you go. Real systems often mix several services, and that is normal. The skill the exam tests is not memorizing a single best product, but matching each workload's requirements to the service that meets them with the least operational effort."
  ],
  "analogy": "Choosing compute is like choosing how to get a meal. Compute Engine is renting a kitchen: you buy the ingredients, cook and clean, but you can make anything. GKE is running a commercial kitchen with a manager who keeps the building working while you organize many cooks. Cloud Run is a caterer who shows up only when guests arrive and leaves when they go. Cloud Run functions are a vending machine that does one thing when you press a button. The analogy stops working on cost: an idle Cloud Run service can cost nothing, while an idle kitchen still charges rent.",
  "terms": [
   [
    "Compute Engine",
    "Google Cloud's infrastructure as a service (IaaS) virtual machines, where you manage the operating system."
   ],
   [
    "GKE",
    "Google Kubernetes Engine, a managed Kubernetes service for running containers, in Autopilot or Standard mode."
   ],
   [
    "Cloud Run",
    "A serverless platform that runs stateless containers and scales automatically, including to zero."
   ],
   [
    "Cloud Run functions",
    "Event-driven or HTTP-triggered functions deployed as source code, formerly Cloud Functions."
   ],
   [
    "App Engine",
    "Google's original platform as a service (PaaS) for web apps, with standard and flexible environments and one application per project."
   ]
  ],
  "example": "A company moves a legacy ERP server that needs a licensed agent to Compute Engine, runs its 30 microservices on GKE Autopilot, hosts a marketing API with bursty traffic on Cloud Run, and uses a Cloud Run function to generate thumbnails whenever an image lands in a bucket.",
  "mistakes": [
   [
    "Picking GKE for any containerized app because it uses containers.",
    "Containers alone do not mean Kubernetes. If the scenario has a single stateless container and wants minimal management or scale to zero, Cloud Run is the better answer. Choose GKE when Kubernetes features, Helm or many coordinated services are called for."
   ],
   [
    "Choosing Cloud Run for an app that keeps important data on its local disk.",
    "Cloud Run instances are stateless and can be stopped at any time. Persistent data belongs in a database or Cloud Storage, or the workload belongs on Compute Engine with a persistent disk."
   ],
   [
    "Thinking a project can host several App Engine applications in different regions.",
    "A project has one App Engine application, and its region is fixed at creation. You use services and versions within that one application."
   ],
   [
    "Selecting Compute Engine whenever the word scalable appears.",
    "Compute Engine can scale with managed instance groups, but if the scenario stresses no infrastructure management, a serverless option such as Cloud Run is usually intended."
   ]
  ],
  "tryit": [
   [
    "Lakeshore Clinic has a nightly job that reads a file, transforms it and writes results to BigQuery. It takes about twenty minutes, is packaged as a container, and should not cost anything during the day. Nobody on the team knows Kubernetes. Which service fits best?",
    "A Cloud Run job. It runs a container to completion, needs no cluster or VM management, and you pay only while it runs. It can be started on a schedule by Cloud Scheduler. GKE adds Kubernetes overhead the team does not need, and a Compute Engine VM would sit idle or need extra automation to start and stop."
   ],
   [
    "A vendor's monitoring software must be installed as a kernel module, and the app it watches needs a fixed hostname and a large local data directory. Which compute option should you pick?",
    "Compute Engine. Kernel modules and full OS control are only available on VMs you manage. Serverless platforms and GKE Autopilot do not let you load custom kernel modules."
   ]
  ],
  "tip": "Keywords decide it: 'kernel', 'OS control', 'license' mean Compute Engine; 'Kubernetes' or 'Helm' mean GKE; 'stateless container, scale to zero, no infrastructure' means Cloud Run; 'run code when a file is uploaded' means Cloud Run functions; 'traffic splitting between versions of an existing web app' often means App Engine.",
  "check": [
   [
    "Which service fits a stateless HTTP container that should cost nothing when idle?",
    "Cloud Run, because it scales to zero and needs no servers or clusters."
   ],
   [
    "How many App Engine applications can a project have?",
    "One, and its region can't be changed after creation."
   ],
   [
    "What does GKE Autopilot remove compared with GKE Standard?",
    "Node management. Google provisions and maintains nodes, and billing is based mainly on pod resource requests."
   ]
  ]
 },
 {
  "t": "Compute Engine instances: machine families, custom machine types, images and Spot VMs",
  "hook": "The finance lead at Bluebird Animation, Marcus, forwards you last month's cloud bill with one line highlighted: Compute Engine. The studio runs its render farm on large general-purpose VMs around the clock, even though frames only render overnight. One database server is sized two steps too big because the next smaller shape did not have quite enough memory. And a junior engineer built a dozen VMs from a hand-picked image that is now months behind on patches. Marcus wants the bill down without slowing the artists. Where do you start: the machine shapes, the images, or the way the VMs are bought?",
  "simple": "A Compute Engine instance is a virtual computer that you rent from Google. When you create one, you pick a few things: where it runs, how powerful it is, and what operating system it starts with. Google groups its machine sizes into families, a bit like car models: some balance everything, some are built for raw speed, some carry huge amounts of memory. If no standard size fits, you can build your own size. You also choose a starting disk picture, called an image, that holds the operating system. Finally, you can save a lot of money with Spot VMs, which use Google's spare machines. The catch is that Google can take a Spot VM back at short notice, like a cheap standby airline seat.",
  "body": [
   "Creating a virtual machine (VM) on Compute Engine means making four main choices: a zone, a machine type, a boot disk image and networking. The zone decides where the VM physically runs, the machine type decides how many virtual CPUs (vCPUs) and how much memory it has, the image decides the operating system on the boot disk, and the network settings decide which Virtual Private Cloud (VPC) subnet it joins and whether it has an external IP address. From the command line a basic example is `gcloud compute instances create web-1 --zone=us-central1-a --machine-type=e2-medium --image-family=debian-12 --image-project=debian-cloud`. The same choices appear as fields on the Create an instance page in the console.",
   "Machine types are grouped into families, and each family is tuned for a class of workload. General-purpose families, such as E2, N2, N2D, N4 and C3 in current generations, balance CPU and memory and suit most web servers, small databases and business apps. E2 is the cost-optimized family and includes shared-core types such as e2-micro and e2-small, which share a physical core and are good for very light workloads. Compute-optimized families, such as C2 and H3, offer high per-core performance for CPU-heavy work like high-performance computing, gaming servers and scientific modeling. Memory-optimized families, the M series, serve very large in-memory databases. Accelerator-optimized families, the A and G series, attach GPUs for machine learning and graphics. Exact family names change as new generations launch, so for the exam focus on the categories and the kind of workload each one serves.",
   "Within a family, predefined machine types come in shapes such as standard, highmem and highcpu. The name tells you the shape and size: n2-standard-8 is a general-purpose N2 machine with 8 vCPUs and a balanced amount of memory, while n2-highmem-8 has the same vCPUs with more memory per vCPU. Reading these names quickly is useful when a question lists several machine types and asks which fits a memory-hungry or CPU-hungry workload.",
   "If no predefined type fits, you can create a custom machine type in families that support it, such as E2, N2 and N1. You choose the number of vCPUs and the amount of memory, for example `--custom-cpu=6 --custom-memory=20GB`. You pay for what you choose, which avoids paying for the next larger predefined size when you only need a little more of one resource. Memory per vCPU must stay within the family's allowed ratio, unless you enable extended memory in families that offer it. Custom types are the exam answer when a workload has an unusual ratio of CPU to memory and the scenario stresses cost.",
   "Images supply the contents of the boot disk. Public images from Google and vendors cover Debian, Ubuntu, Rocky Linux, Windows Server and others, and Container-Optimized OS is a minimal image designed to run containers securely. An image family is a name that always points to the latest non-deprecated image in a series, which is why commands often use `--image-family=debian-12` rather than a dated image name: new VMs automatically start from current, patched images. You can also build custom images from your own disks or snapshots, for example a hardened base image with your agents preinstalled, and share them with other projects. Many teams combine custom images with their own image families so that every new VM gets the approved, up-to-date build.",
   "Spot VMs are spare Compute Engine capacity sold at a steep discount. The trade-off is that Google can stop, or preempt, them at any time when it needs the capacity back, giving about 30 seconds of notice, and there is no availability guarantee. When preempted, a Spot VM is stopped or deleted depending on the termination action you set. Spot VMs are ideal for fault-tolerant batch jobs, rendering, continuous integration (CI) runners and stateless workers in managed instance groups that can recreate lost VMs. They are a poor fit for databases or anything that cannot tolerate interruption. Preemptible VMs are the older version of the same idea and are limited to 24 hours of runtime; Spot VMs do not have that maximum runtime.",
   "Spot VMs are not the only way to save money. For steady workloads that must stay up, committed use discounts reduce the price in exchange for committing to a certain amount of usage for a term, and sustained use discounts apply automatically to some machine families when a VM runs for a large part of the month. Right-sizing also matters: Compute Engine can show recommendations when a VM is consistently underused. A good exam habit is to ask whether the workload can be interrupted. If yes, think Spot VMs. If no but it runs constantly, think committed use discounts and correct sizing."
  ],
  "analogy": "Picking a machine type is like renting a moving truck. Rental companies offer standard sizes, and if your load is oddly shaped you might ask for a custom configuration instead of paying for the next big truck. Spot VMs are like a standby discount: you pay much less, but if a full-price customer needs the truck, yours is reclaimed with only a moment's warning. The analogy stops working in one way that matters: a reclaimed Spot VM can be automatically replaced by a managed instance group, so a well-designed job simply carries on.",
  "terms": [
   [
    "Machine family",
    "A group of machine types optimized for a workload class, such as general-purpose, compute-optimized, memory-optimized or accelerator-optimized."
   ],
   [
    "Custom machine type",
    "A VM shape where you choose the number of vCPUs and amount of memory, within the family's allowed ratio."
   ],
   [
    "Image family",
    "A name that always resolves to the newest non-deprecated image in a series, such as debian-12."
   ],
   [
    "Spot VM",
    "A discounted VM that Google can preempt at any time, with about 30 seconds of notice, when it needs the capacity."
   ],
   [
    "Preemptible VM",
    "The older form of discounted, interruptible VM, limited to 24 hours of runtime."
   ]
  ],
  "example": "An animation studio renders frames overnight on 200 Spot VMs in a managed instance group. When some are preempted, the group recreates them and the job queue hands the unfinished frames to other workers, cutting the rendering bill substantially compared with regular VMs.",
  "mistakes": [
   [
    "Choosing Spot VMs for a production database to save money.",
    "Spot VMs can be preempted at any time with about 30 seconds of notice and have no availability guarantee. Databases need regular VMs, possibly with committed use discounts for savings."
   ],
   [
    "Picking the next larger predefined machine type when only memory is short.",
    "A custom machine type lets you add just the memory you need and pay for exactly that, within the family's ratio limits or with extended memory."
   ],
   [
    "Pinning a specific dated image name in automation so builds stay current.",
    "A specific image name never changes, so new VMs start from an aging image. An image family always resolves to the latest non-deprecated image."
   ],
   [
    "Believing Spot VMs stop after 24 hours.",
    "The 24-hour limit applies to the older preemptible VMs. Spot VMs have no maximum runtime, though they can still be preempted at any time."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Labs runs a genomics pipeline that splits work into thousands of small tasks. Any task that fails is retried automatically by the job scheduler, and results are written to Cloud Storage. The team wants the lowest possible compute cost. What should they run the workers on?",
    "Spot VMs in a managed instance group. The work is fault tolerant because failed tasks are retried and results are stored outside the VMs, so preemption only delays some tasks. The group recreates preempted VMs, and the discount is far larger than for regular VMs."
   ],
   [
    "An application needs 6 vCPUs and 40 GB of memory. The closest predefined types either have too little memory or double the vCPUs. The team wants to avoid paying for unused capacity. What do you recommend?",
    "A custom machine type, for example in the N2 family, with 6 vCPUs and the required memory, enabling extended memory only if the ratio exceeds the family's limit. This avoids paying for extra vCPUs the app will not use."
   ]
  ],
  "tip": "'Can be interrupted' plus 'lowest cost' means Spot VMs. 'Needs an unusual CPU-to-memory ratio' means a custom machine type. 'Always start from the latest patched OS' means an image family. Spot VMs are not a fit for databases.",
  "check": [
   [
    "What happens to a Spot VM when Google needs the capacity back?",
    "It's preempted (stopped or deleted, depending on its termination action) after about 30 seconds of notice."
   ],
   [
    "Why use --image-family instead of a specific image name?",
    "The family always resolves to the latest non-deprecated image, so you get current patches."
   ],
   [
    "Which machine family category fits a very large in-memory database?",
    "Memory-optimized, such as the M series."
   ]
  ]
 },
 {
  "t": "Compute Engine disks: Persistent Disk and Hyperdisk types, regional disks and local SSD",
  "hook": "It is 4 a.m. and your phone buzzes. Rosa from the Cedar Ridge Credit Union night desk says the loan application site is down. You check the status page: one zone in your region is having trouble, and the VM that runs the self-managed PostgreSQL database lives in that zone. You have a standby VM template ready in another zone, but the database files sit on the disk attached to the broken VM. Can you get that data into the healthy zone right now, or will you be restoring last night's backup and explaining a day of lost loan applications? The answer depends on a choice someone made when the disk was created.",
  "simple": "A virtual machine needs disks, just like a laptop needs a drive to store its system and files. Google offers a few kinds. The most common kind lives on Google's network, separate from the machine, so the data stays safe even if you turn the machine off or move the disk to another machine. Some of these disks are cheap and slow, some are fast and costly. A special version keeps a copy in two different data center zones at once, so a problem in one zone does not lose your data. Finally there is local SSD, a very fast drive inside the physical server. It is great for temporary work, but like a whiteboard that gets wiped at night, its contents disappear when the machine stops.",
  "body": [
   "Compute Engine virtual machines (VMs) use block storage for their boot and data disks. Block storage appears to the operating system as a raw drive that you format with a file system such as ext4 or NTFS. The main choices are Persistent Disk, Hyperdisk and local SSD, and they differ in performance, durability, where the data physically lives and how they are priced. Knowing which to pick for a given workload, and what happens to the data in a failure, is a frequent exam theme.",
   "Persistent Disk is network-attached, durable block storage that lives independently of the VM. Because it is separate, you can stop the VM, detach the disk and attach it to another VM in the same zone, and the data stays intact. Persistent Disk comes in several types. Standard (pd-standard) is backed by hard disk drives (HDDs) and is the cheapest, suited to sequential reads and writes or less demanding workloads such as bulk storage and logs. Balanced (pd-balanced) is backed by solid-state drives (SSDs) and is a good default for most boot and data disks. SSD (pd-ssd) offers higher input/output operations per second (IOPS) and lower latency for databases. Extreme (pd-extreme) lets you provision IOPS for the most demanding database workloads on supported machine types.",
   "Performance of most Persistent Disk types grows with disk size and with the VM's vCPU count. That surprises many people: if a database disk is too slow, one fix is simply to make the disk larger, or to give the VM more vCPUs. You can grow a disk while it is attached, for example with `gcloud compute disks resize data-1 --size=500GB --zone=us-central1-a`, and then extend the partition and file system inside the operating system. You cannot shrink a disk, so to reduce size you would create a smaller disk and copy the data across.",
   "Hyperdisk is the newer generation of network block storage. With Hyperdisk you provision capacity and performance separately, depending on the type: you can set IOPS and throughput independently of size, so you do not have to buy a huge disk just to get speed. Types include Hyperdisk Balanced for general use, Hyperdisk Extreme for the highest IOPS, and Hyperdisk Throughput for streaming workloads such as analytics and log processing. Hyperdisk is supported on newer machine series, and some of those series support only Hyperdisk, so check machine series compatibility before choosing a disk type. If a create command fails because a disk type is not supported, compatibility is usually the reason.",
   "By default a disk is zonal: it lives in one zone and can only attach to VMs in that zone. A regional persistent disk, and the regional Hyperdisk Balanced High Availability type, synchronously replicates data across two zones in the same region. Every write is committed in both zones before it is acknowledged. If the primary zone fails, you can force-attach the disk to a VM in the other zone, which gives a very low recovery point objective (RPO), meaning little or no data loss, for stateful apps without needing application-level replication. The trade-offs are a higher price and some added write latency, because each write must reach both zones.",
   "Snapshots complement all of this. A snapshot is an incremental backup of a disk stored separately, and you can schedule snapshots with a snapshot schedule attached to the disk. Snapshots protect against accidental deletion or corruption and let you create new disks in other zones or regions. A regional disk protects against a zone outage in real time, while snapshots protect against mistakes and give point-in-time recovery. Many production designs use both.",
   "Local SSD is physically attached to the server that hosts the VM. It offers very high IOPS and very low latency, because data does not cross the network. The catch is that data is ephemeral: it does not survive the VM being stopped or deleted, or a host failure, although Google tries to preserve it during live migration. Use local SSD for caches, scratch space, temporary processing and data you can rebuild, never as the only copy of important data. It comes in fixed sizes per device, and you attach a number of devices rather than choosing any size.",
   "Other storage options appear in the same exam questions. Filestore provides managed Network File System (NFS) file shares that many VMs can mount at once, which suits shared content and legacy apps that expect a file server. Cloud Storage holds objects such as images, backups and data lake files. Mounting a bucket with Cloud Storage FUSE is convenient, but it is not a replacement for block storage and is a poor fit for databases."
  ],
  "analogy": "Persistent Disk is like a storage unit across town connected to your house by a fast road: if your house burns down, the boxes are fine and you can drive them to a new house. A regional disk is like keeping identical storage units in two towns that are updated together. Local SSD is the desk drawer in your office: grabbing things is instant, but when you move out, the drawer is emptied. The analogy stops working on speed: a real storage unit is slow, while a network disk is fast enough for most databases.",
  "mnemonic": "Persistent Disk types from cheapest and slowest to fastest: 'Some Boats Sail Easily' for Standard, Balanced, SSD, Extreme.",
  "terms": [
   [
    "Persistent Disk",
    "Durable network-attached block storage for VMs, in standard, balanced, SSD and extreme types."
   ],
   [
    "Hyperdisk",
    "Network block storage where capacity and performance (IOPS and throughput) are provisioned separately, depending on the type."
   ],
   [
    "Regional persistent disk",
    "A disk replicated synchronously across two zones in one region that can be force-attached in the surviving zone."
   ],
   [
    "Local SSD",
    "High-performance storage physically attached to the host, whose data doesn't persist when the VM stops or is deleted."
   ],
   [
    "Snapshot",
    "An incremental, point-in-time backup of a disk that can be used to create new disks."
   ]
  ],
  "example": "A team running a self-managed PostgreSQL VM puts its data on a regional persistent disk. When a zone has an outage, they start a standby VM in the second zone, force-attach the regional disk and are serving again with no lost writes.",
  "mistakes": [
   [
    "Storing a database's only copy of data on local SSD because it is fastest.",
    "By default, local SSD data is lost when the VM stops, is deleted or the host fails. Use it for caches and scratch data, and keep durable data on Persistent Disk or Hyperdisk."
   ],
   [
    "Expecting to shrink a persistent disk after over-provisioning it.",
    "Disks can only grow. To get a smaller disk, create a new one and copy the data."
   ],
   [
    "Thinking snapshots alone give zero data loss in a zone outage.",
    "Snapshots are point-in-time, so anything written after the last snapshot is lost. A regional disk replicates every write synchronously across two zones."
   ],
   [
    "Assuming any disk type works on any machine series.",
    "Some newer machine series support only Hyperdisk, and some disk types are limited to certain series. Check compatibility first."
   ]
  ],
  "tryit": [
   [
    "Maple Freight runs a reporting VM whose pd-balanced data disk is too slow during month-end queries. The disk is half full. The team cannot change the application this month. What is a quick way to improve disk performance?",
    "Increase the disk size, and if needed the VM's vCPU count, because Persistent Disk performance scales with both. Resize the disk while attached, then extend the file system. Alternatively move to pd-ssd or, on a supported machine series, Hyperdisk with provisioned performance."
   ],
   [
    "A video processing job downloads raw files, transcodes them in temporary working space and uploads the results to Cloud Storage. Any interrupted file can simply be reprocessed. Which storage should hold the working files?",
    "Local SSD. It gives the highest IOPS and lowest latency for temporary data, and losing it only means reprocessing a file, since source and results live in Cloud Storage."
   ]
  ],
  "tip": "Survive a zone failure without losing writes: regional disk. Fastest scratch storage and data loss is acceptable: local SSD. Cheapest bulk block storage: standard persistent disk. Separate performance from capacity: Hyperdisk.",
  "check": [
   [
    "Can you shrink a persistent disk?",
    "No. You can increase its size, but not reduce it."
   ],
   [
    "What happens to local SSD data when you stop the VM?",
    "It's discarded, so local SSD must only hold data you can recreate."
   ],
   [
    "How does a regional persistent disk protect data?",
    "It synchronously replicates writes to two zones in a region, so you can force-attach it to a VM in the surviving zone."
   ]
  ]
 },
 {
  "t": "Instance templates and managed instance groups: autoscaling, autohealing and rolling updates",
  "hook": "Black Friday is three days away at Willow Lane Home Goods, and the web tier is four hand-built VMs that Sam named after his cats. Last year one of them froze at noon and nobody noticed for an hour. Traffic doubled at 9 a.m. and the team scrambled to clone servers by hand. Now Sam needs to patch the operating system on all four before the sale, without taking the shop offline. Leah, the engineering manager, asks you whether Google Cloud can add servers when traffic spikes, replace a frozen one on its own, and roll out the patch gradually. It can, but only if the servers stop being pets. How?",
  "simple": "Imagine a bakery that uses one recipe card to bake identical loaves. An instance template is that recipe card for virtual machines: it lists exactly how each machine should be built. A managed instance group is the bakery that follows the recipe. It keeps the right number of identical machines running. When lots of customers arrive, it bakes more; when it gets quiet, it bakes fewer. If a machine goes bad, the group throws it out and builds a fresh one from the recipe. And when you want to change the recipe, you write a new card, and the group gradually swaps old machines for new ones so customers are always served.",
  "body": [
   "Managing servers one at a time does not scale. Google Cloud solves this with two building blocks: instance templates, which describe what a virtual machine (VM) should look like, and managed instance groups, which use a template to run and maintain many identical VMs. Together they provide autoscaling, autohealing and controlled software rollouts, and they appear throughout the exam's planning and operations domains.",
   "An instance template is a saved VM definition. It records the machine type, boot image, disks, network and subnet, network tags, labels, the service account and metadata such as a startup script that installs and starts your application. Templates are immutable: once created, you cannot edit one. To change anything, even a single label, you create a new template. You can create one from the command line with `gcloud compute instance-templates create web-v2 --machine-type=e2-medium --image-family=debian-12 --image-project=debian-cloud --tags=web --metadata-from-file=startup-script=start.sh`, or from an existing VM in the console. Versioned names such as web-v1 and web-v2 make it easy to track which build is running.",
   "A managed instance group (MIG) uses a template to create and maintain a set of identical VMs. You tell it how many VMs you want, and it keeps that number running. A zonal MIG keeps its VMs in one zone. A regional MIG spreads them across multiple zones in a region, which protects against a zone failure and is recommended for production. Unmanaged instance groups, by contrast, are just collections of existing VMs, possibly with different configurations, that you manage yourself. They can sit behind a load balancer, but they do not autoscale, autoheal or support rolling updates, so they mainly exist for legacy setups.",
   "Creating the group itself is one command once the template exists, for example `gcloud compute instance-groups managed create web-mig --region=us-central1 --template=web-v2 --size=3`. The group immediately starts creating VMs with generated names based on a base instance name, and the console's Instance groups page shows each VM's status, the template it was built from and whether it is healthy. To put the group behind a load balancer, you add it as a backend of a backend service and usually define a named port, such as http on 8080, so the load balancer knows which port to send traffic to.",
   "Autoscaling adds and removes VMs based on a signal. The signal can be average CPU utilization, load balancer serving capacity, a Cloud Monitoring metric such as queue length, or a schedule for predictable peaks. You set a minimum and maximum number of instances and a target, such as 60% CPU. When average CPU rises above the target, the autoscaler adds VMs; when it falls, the autoscaler removes them, never going below the minimum. An initialization period, sometimes called a cool-down, tells the autoscaler to ignore data from new VMs while they boot, so a VM that is busy starting up does not trigger even more scaling. For example: `gcloud compute instance-groups managed set-autoscaling web-mig --region=us-central1 --min-num-replicas=2 --max-num-replicas=10 --target-cpu-utilization=0.6`.",
   "Autohealing keeps the group healthy. It uses an application health check, such as an HTTP request to a path like /healthz that should return a success code. If a VM fails the check repeatedly, the MIG deletes it and recreates it from the template. Set an initial delay long enough for the application to start, or the group may recreate VMs that are simply still booting, causing a loop where nothing ever becomes healthy. Autohealing is different from load balancer health checks. A load balancer health check only stops sending traffic to an unhealthy backend; it does not repair it. Many teams use both, often with a slightly more lenient autohealing check.",
   "To change the software, image or machine type, you create a new template and start an update on the group. A rolling update replaces VMs gradually. Two settings control the pace: maxSurge is how many extra VMs the group may create above its target size during the update, and maxUnavailable is how many VMs may be offline at once. Setting maxSurge to 3 and maxUnavailable to 0, for example, means new VMs come up before old ones are removed, so capacity never drops. You can also run a canary by setting a second template for part of the group, such as 10% of instances, watching for errors, and then moving the rest. Rolling back is simply another update to the previous template, which is one reason to keep old templates around.",
   "Because VMs in a MIG can be deleted and recreated at any time by autoscaling, autohealing or updates, you should keep them stateless. Store data in databases such as Cloud SQL, in Cloud Storage or in other managed services, and pull configuration at boot through the startup script or metadata. Stateful MIGs exist for special cases where VMs need to keep specific disks or names across recreation, but for the exam the default answer is a stateless, regional MIG behind a load balancer."
  ],
  "analogy": "A MIG is like a staffing agency with a written job description. The job description is the instance template: you cannot quietly edit it, you issue a new version. The agency keeps the right number of workers on shift, sends more during rush hour, and replaces anyone who stops responding. When the job description changes, the agency rotates staff a few at a time so the counter is never empty. The analogy stops working on memory: a replaced VM remembers nothing, so anything important must be stored outside the workers.",
  "terms": [
   [
    "Instance template",
    "An immutable definition of VM properties used to create VMs in a managed instance group."
   ],
   [
    "Managed instance group",
    "A group of identical VMs created from a template that supports autoscaling, autohealing and rolling updates."
   ],
   [
    "Regional MIG",
    "A managed instance group that spreads its VMs across multiple zones in a region for higher availability."
   ],
   [
    "Autohealing",
    "Recreating VMs that repeatedly fail an application health check."
   ],
   [
    "Rolling update",
    "Gradually replacing a group's VMs with ones from a new template, governed by maxSurge and maxUnavailable."
   ]
  ],
  "example": "An online shop runs a regional MIG of 3 to 20 web servers that autoscales at 65% CPU. To patch the OS, the team builds a new image, creates template web-v8 and starts a rolling update with maxSurge 3 and maxUnavailable 0, so capacity never drops during the change.",
  "mistakes": [
   [
    "Trying to edit an existing instance template to change the machine type.",
    "Templates are immutable. Create a new template and start a rolling update on the MIG to apply it."
   ],
   [
    "Assuming a load balancer health check will repair failed VMs.",
    "A load balancer health check only stops routing traffic. Autohealing on the MIG is what recreates unhealthy VMs."
   ],
   [
    "Using an unmanaged instance group to get autoscaling for different existing VMs.",
    "Unmanaged instance groups do not autoscale or autoheal. You need a MIG built from a template, which means identical VMs."
   ],
   [
    "Setting a very short autohealing initial delay to react faster.",
    "If the delay is shorter than the app's startup time, the MIG recreates VMs before they can pass the check, creating a loop."
   ]
  ],
  "tryit": [
   [
    "Oak Hollow Bank's web tier is a zonal MIG of six VMs. Last quarter a zone outage took the whole site down. The team also wants to deploy a new release to a small share of VMs first. What two changes do you recommend?",
    "Recreate the tier as a regional MIG so VMs are spread across zones and survive a zone outage. For releases, use a canary update that applies the new template to a target size such as 10% of the group, then complete the rollout or roll back to the old template."
   ],
   [
    "A MIG keeps deleting and recreating VMs every few minutes, and none ever serve traffic. The app takes about four minutes to start, and the autohealing initial delay is 60 seconds. What is wrong?",
    "The initial delay is too short. The health check fails while the app is still starting, so autohealing recreates the VM before it is ready. Raise the initial delay above the startup time."
   ]
  ],
  "tip": "You can't edit a template: new template, then rolling update. Autohealing needs a health check. Unmanaged groups don't autoscale. Zone resilience means a regional MIG. maxUnavailable 0 keeps capacity during updates.",
  "check": [
   [
    "What is the difference between a zonal and a regional MIG?",
    "A zonal MIG keeps VMs in one zone; a regional MIG spreads them across zones in a region for higher availability."
   ],
   [
    "Why set an initial delay on autohealing?",
    "So the MIG doesn't recreate VMs that are still booting and haven't passed the health check yet."
   ],
   [
    "What do maxSurge and maxUnavailable control in a rolling update?",
    "maxSurge is how many extra VMs may be created above the target size; maxUnavailable is how many VMs may be offline at once."
   ]
  ]
 },
 {
  "t": "Google Kubernetes Engine clusters: Autopilot vs Standard, zonal vs regional, and node pools",
  "hook": "Nadia, the platform lead at Riverbend Payments, drops a request into your queue. The customer API team wants a GKE cluster by Friday, and they never want to think about nodes. The data science team wants their own cluster with GPU machines and a specific node configuration. And the risk officer, Tom, has added a note: last year a competitor's cluster could not be managed during a zone outage, and he wants to know ours will not have that problem. You open the GKE create page and see two big buttons, Autopilot and Standard, and a choice between zonal and regional. Which combination answers each team, and Tom?",
  "simple": "Kubernetes is a system that runs packaged apps, called containers, across a group of computers. In Google Kubernetes Engine, there is a 'brain' that decides where apps run (the control plane) and the worker computers that actually run them (the nodes). Google always looks after the brain. You choose who looks after the workers. In Autopilot, Google looks after them too, and you pay for what your apps ask for. In Standard, you choose and manage the workers and pay for them whether busy or not. You also choose whether the cluster lives in one data center zone or is spread across several, like keeping copies of your house keys with neighbors on different streets.",
  "body": [
   "A Google Kubernetes Engine (GKE) cluster has two parts. The control plane runs the Kubernetes application programming interface (API) server, the scheduler and the controllers that keep the cluster in its desired state. The nodes are Compute Engine virtual machines (VMs) that run your pods, which are the smallest deployable units in Kubernetes, each holding one or more containers. Google always manages the control plane: you never patch the API server or see its VMs. What differs between cluster modes is who manages the nodes, and that one difference drives cost, flexibility and operational effort.",
   "In Autopilot mode, Google provisions, scales, secures and upgrades nodes for you. You deploy workloads, and GKE creates the right capacity based on each pod's resource requests for CPU and memory. You are billed mainly for the CPU, memory and storage that your pods request, not for whole nodes, so you do not pay for idle node capacity. Autopilot applies security best practices by default and restricts some low-level settings, such as privileged containers and direct node access. It is Google's recommended mode for most workloads. You create one with `gcloud container clusters create-auto my-cluster --region=us-central1`. Note that pod resource requests matter more in Autopilot, because they decide both scheduling and billing.",
   "In Standard mode, you manage node pools yourself. You choose machine types, node counts, node autoscaling, and settings such as Spot VMs, GPUs or custom node configuration, and you pay for the node VMs whether pods use them or not. Choose Standard when you need that control, for example specific machine types, node-level system settings or configurations Autopilot does not allow. You create one with `gcloud container clusters create my-cluster --zone=us-central1-a --num-nodes=3`. In the console, a Standard cluster shows a Nodes tab listing node pools and their VMs, which also appear in the Compute Engine VM list.",
   "Clusters also have a location type, separate from the mode. A zonal cluster has a single control plane in one zone. Its nodes run in that zone, or in several zones if you make it a multi-zonal cluster. If the control plane's zone fails, you cannot manage the cluster through the API until the zone recovers, although workloads on nodes in other zones may keep running. Control plane upgrades on a zonal cluster also cause short periods when the API is unavailable. A regional cluster runs control plane replicas in multiple zones of a region and, by default, nodes in three zones, so both management and workloads survive a zone outage, and upgrades happen without API downtime. Autopilot clusters are always regional.",
   "One detail trips up many test takers. In a regional Standard cluster, `--num-nodes` is per zone, not total. With the default three zones, `--num-nodes=1` creates three nodes, and `--num-nodes=2` creates six. This affects cost estimates and is a classic exam question. If you want fewer total nodes in a regional cluster, you can restrict node locations to fewer zones with `--node-locations`.",
   "In practice, many teams decide with a short checklist. If the team wants the least operational work and its workloads fit Autopilot's defaults, choose Autopilot. If it needs privileged containers, specific node images, or tight control over machine types and node-level settings, choose Standard. Then choose regional unless cost pressure and tolerance for management downtime justify a zonal cluster, which is more common for development and testing than for production.",
   "A node pool is a group of nodes with the same configuration within a Standard cluster. Every Standard cluster starts with a default pool, and you can add pools with different machine types, such as a GPU pool or a high-memory pool, with `gcloud container node-pools create gpu-pool --cluster=my-cluster --machine-type=...` and the accelerator options you need. You then steer pods to the right pool with node selectors or node affinity, and keep other pods off special pools with taints and tolerations: a taint on the GPU nodes repels pods unless they carry a matching toleration. Cluster autoscaler can add and remove nodes per pool based on pending pods, within the minimum and maximum you set.",
   "A few related features complete the picture. Private clusters give nodes only internal IP addresses, which reduces exposure, and usually pair with Cloud NAT for outbound internet access. Release channels, named Rapid, Regular and Stable, let GKE upgrade clusters automatically to versions that match how quickly you want new features versus stability. Maintenance windows and exclusions control when automatic upgrades may happen. For the exam, remember the core pattern: choose the mode by who should manage nodes, choose the location type by availability needs, and use node pools when one Standard cluster needs different kinds of machines."
  ],
  "analogy": "Autopilot is like staying in a hotel: you say how many guests are coming, the hotel finds rooms, cleans them and charges you per guest. Standard is like leasing an apartment building: you pick the units, furnish them and pay rent on empty units too, but you can renovate as you like. A regional cluster is a hotel chain with front desks in three buildings, so one closing does not lock you out. The analogy stops working on the front desk itself: in both modes Google runs the control plane, so you never staff it.",
  "terms": [
   [
    "Autopilot",
    "A GKE mode where Google manages nodes and billing is based mainly on pod resource requests."
   ],
   [
    "Standard cluster",
    "A GKE mode where you configure, manage and pay for node pools."
   ],
   [
    "Regional cluster",
    "A cluster with control plane replicas and nodes spread across multiple zones in a region."
   ],
   [
    "Node pool",
    "A group of nodes in a cluster that share the same configuration, such as machine type."
   ],
   [
    "Taint and toleration",
    "A node marking that repels pods, and a pod setting that allows it to be scheduled on such nodes."
   ]
  ],
  "example": "A fintech runs its customer API on a regional Autopilot cluster so it doesn't have to manage nodes. Its ML team needs GPUs with specific drivers and node settings, so they run a separate Standard cluster with a default pool for general services and a GPU node pool tainted so only training pods land there.",
  "mistakes": [
   [
    "Thinking Autopilot means Google manages the control plane while Standard means you manage it.",
    "Google manages the control plane in both modes. The difference is node management and billing."
   ],
   [
    "Calculating total nodes in a regional Standard cluster as the --num-nodes value.",
    "In a regional cluster, --num-nodes is per zone. With three zones, --num-nodes=2 means six nodes."
   ],
   [
    "Choosing a multi-zonal cluster to keep the control plane available during a zone outage.",
    "A multi-zonal cluster still has a single control plane in one zone. Only a regional cluster replicates the control plane across zones."
   ],
   [
    "Adding node pools to an Autopilot cluster to get GPU machines.",
    "Node pools are a Standard mode concept you manage. Autopilot provisions capacity from pod requests, including supported accelerator requests, without you managing pools."
   ]
  ],
  "tryit": [
   [
    "Copperfield Logistics wants a cluster for twelve web microservices. The team is small, wants Google to handle node upgrades and security hardening, and wants to avoid paying for idle nodes. The control plane must stay manageable during a zone outage. What do you create?",
    "A GKE Autopilot cluster. It is always regional, so the control plane survives a zone outage; Google manages nodes; and billing is based on pod resource requests rather than node VMs."
   ],
   [
    "A Standard regional cluster in us-central1 uses three zones and was created with --num-nodes=4. Finance asks how many node VMs they are paying for. What do you tell them, and how could you reduce it while keeping the cluster regional?",
    "Twelve nodes, because --num-nodes is per zone. To reduce cost, lower --num-nodes, enable cluster autoscaler with a lower minimum, or limit node locations to fewer zones, keeping in mind that fewer zones reduces workload resilience."
   ]
  ],
  "tip": "'Don't manage nodes' means Autopilot. 'Control plane must survive a zone outage' means a regional cluster. 'Different machine types in one cluster' means node pools. In regional Standard clusters, --num-nodes is per zone.",
  "check": [
   [
    "In a regional Standard cluster across three zones, how many nodes does --num-nodes=2 create?",
    "Six: two per zone."
   ],
   [
    "How are Autopilot clusters billed?",
    "Mainly by the resources pods request, rather than by node VMs."
   ],
   [
    "What happens to management of a zonal cluster if its control plane zone fails?",
    "You can't manage the cluster through the API until the zone recovers, because there is only one control plane."
   ]
  ]
 },
 {
  "t": "Deploying workloads to GKE with kubectl: Deployments, Services and Ingress",
  "hook": "Your first week at Sunfield Grocers, and Omar from the e-commerce team pings you: the new storefront container is built and pushed, the GKE cluster exists, and the launch demo is at 3 p.m. You open a terminal, type `kubectl get pods`, and get an error about no configuration. After fixing that, you start the app, but nobody outside the cluster can reach it. Then Omar adds that the API container also needs to be reachable at the same web address under /api, with a proper certificate. You have four hours. Which Kubernetes objects do you need, in what order, and which one actually gives customers an address?",
  "simple": "Running an app on Kubernetes takes a few separate pieces. First your computer needs the cluster's address and login details, which one command fetches. Then a Deployment tells Kubernetes 'keep three copies of this app running', and Kubernetes replaces any copy that dies. But copies come and go with new addresses each time, so a Service gives them one steady address, like a restaurant's phone number that rings whichever host is free. A Service can be internal only, or it can ask Google for a public address. Finally, an Ingress is like a receptionist at one front door who sends visitors to the right department based on which web address and path they ask for.",
  "body": [
   "Before you can use kubectl, the Kubernetes command-line tool, against a GKE cluster, you need credentials. Run `gcloud container clusters get-credentials my-cluster --region=us-central1` (or `--zone` for a zonal cluster). This writes an entry to your kubeconfig file with the cluster's endpoint and authentication settings, so that kubectl talks to that cluster's application programming interface (API) server using your Google identity. If you skip this step, kubectl commands fail with connection or configuration errors. Access inside the cluster is controlled by Identity and Access Management (IAM) roles such as Kubernetes Engine Developer or Kubernetes Engine Viewer, and optionally by Kubernetes role-based access control (RBAC) for finer, namespace-level permissions.",
   "A Deployment is the standard way to run a stateless app. It declares the container image, the number of replicas and the resource requests, and Kubernetes keeps that many pods running through a ReplicaSet. If a pod crashes or a node fails, the ReplicaSet creates a replacement. When you change the image, the Deployment performs a rolling update, starting new pods and removing old ones gradually, and `kubectl rollout undo deployment/web` rolls back. You can create a Deployment quickly with `kubectl create deployment web --image=us-docker.pkg.dev/my-proj/repo/web:1.0`, but in practice you describe it in a YAML manifest and run `kubectl apply -f web.yaml`, which lets you keep the definition in version control. Scaling is `kubectl scale deployment web --replicas=5`, or automatic with a HorizontalPodAutoscaler.",
   "Images typically come from Artifact Registry, Google's repository for container images and other packages. The nodes, or the pods when using Workload Identity Federation for GKE, need permission to pull them, usually the Artifact Registry Reader role on the repository. A pod stuck in ImagePullBackOff status often means a wrong image path or missing pull permission.",
   "Labels and selectors are the glue between these objects. A Deployment stamps labels such as app=web on every pod it creates, and a Service finds its pods by selecting that same label. If the labels do not match, the Service has no endpoints and traffic goes nowhere, which `kubectl get endpoints web` reveals quickly. Namespaces add another layer of organization, letting teams separate workloads such as dev and prod inside one cluster and apply different access rules and resource quotas to each.",
   "Pods get new IP addresses whenever they are recreated, so clients should never connect to pods directly. Instead you expose them with a Service, which gives a stable virtual IP address and a DNS name inside the cluster, and load-balances across all pods whose labels match the Service's selector. Type ClusterIP, the default, is reachable only inside the cluster, which suits back-end services that only other pods call. Type NodePort opens the same port on every node. Type LoadBalancer makes GKE create a Google Cloud passthrough Network Load Balancer with an external IP address, or an internal one when you add the internal load balancer annotation. The quick way is `kubectl expose deployment web --type=LoadBalancer --port=80 --target-port=8080`, where port is what clients connect to and target-port is what the container listens on. After a minute, `kubectl get service web` shows the EXTERNAL-IP column change from pending to an address.",
   "For HTTP and HTTPS apps, an Ingress routes traffic by host name and URL path to different Services. On GKE, creating an Ingress makes Google Cloud provision an external Application Load Balancer, which supports Google-managed certificates and Cloud CDN. The newer Gateway API offers similar routing with a more flexible, role-oriented model, and GKE supports it as well. Ingress is the answer when you need one IP address for several services with URL-based routing, for example sending shop.example.com/ to a frontend Service and shop.example.com/api to an API Service. A LoadBalancer Service, by contrast, gives one external IP per Service and does not route by path.",
   "Other workload objects appear on the exam too. A StatefulSet runs apps that need stable identities and their own persistent volumes, such as databases, where each pod keeps its name and disk across restarts. A DaemonSet runs one pod on every node, which suits log collectors and monitoring agents. Jobs run pods to completion, and CronJobs run Jobs on a schedule. ConfigMaps hold non-sensitive configuration, and Secrets hold sensitive values such as passwords, which you can mount as files or environment variables.",
   "When something goes wrong, three commands are your first stop. `kubectl get pods` shows each pod's status, such as Running, Pending, CrashLoopBackOff or ImagePullBackOff, and its restart count. `kubectl describe pod NAME` shows events, such as failed scheduling due to insufficient CPU or failed image pulls. `kubectl logs NAME` shows the container's output, and adding `--previous` shows logs from the last crashed instance. Reading those three outputs answers most troubleshooting questions in both the exam and real life."
  ],
  "analogy": "Think of a call center. The Deployment is the staffing manager who makes sure three agents are always on shift and replaces anyone who leaves. Agents change desks constantly, so customers never dial an agent directly. The Service is the main phone number that rings whichever agent is free. An Ingress is a single switchboard for several departments that routes callers by what they ask for. The analogy stops working on public access: a ClusterIP Service is an internal extension that outside callers cannot reach at all.",
  "terms": [
   [
    "Deployment",
    "A Kubernetes object that keeps a set number of identical pod replicas running and handles rolling updates."
   ],
   [
    "Service",
    "A stable IP and DNS name that load-balances traffic to a set of pods selected by labels."
   ],
   [
    "LoadBalancer Service",
    "A Service type that provisions a Google Cloud passthrough Network Load Balancer with an external or internal IP."
   ],
   [
    "Ingress",
    "A Kubernetes object that routes HTTP(S) traffic by host and path; on GKE it creates an Application Load Balancer."
   ],
   [
    "kubeconfig",
    "The local file that stores cluster endpoints and credentials kubectl uses, updated by get-credentials."
   ]
  ],
  "example": "A team deploys frontend and api Deployments, each with a ClusterIP Service. An Ingress routes shop.example.com/ to frontend and shop.example.com/api to api through one external Application Load Balancer with a Google-managed certificate.",
  "mistakes": [
   [
    "Exposing several services that need path-based routing with one LoadBalancer Service each.",
    "LoadBalancer Services give one IP per Service and do not route by path. Use an Ingress (or Gateway) for one IP with host and path routing."
   ],
   [
    "Connecting clients directly to pod IP addresses.",
    "Pod IPs change whenever pods are recreated. Clients should use a Service's stable IP or DNS name."
   ],
   [
    "Confusing --port and --target-port in kubectl expose.",
    "--port is the port clients use on the Service; --target-port is the port the container listens on."
   ],
   [
    "Running kubectl right after creating a cluster and assuming it will connect.",
    "You must first run gcloud container clusters get-credentials to add the cluster to your kubeconfig."
   ]
  ],
  "tryit": [
   [
    "Elmwood Library deploys a catalog app on GKE. The pods show Running, but users cannot reach the app from the internet. `kubectl get services` shows only a ClusterIP Service named catalog. The container listens on port 8080 and users should use port 80. What do you do?",
    "Expose the Deployment with a LoadBalancer Service, for example kubectl expose deployment catalog --type=LoadBalancer --port=80 --target-port=8080, or change the Service type. ClusterIP is reachable only inside the cluster. Once the external IP appears, users connect on port 80."
   ],
   [
    "A new pod stays in ImagePullBackOff. The image path is correct and the image exists in Artifact Registry in another project. What is the most likely cause?",
    "The identity pulling the image, the node service account or the workload's identity, lacks permission on that repository. Grant Artifact Registry Reader on the repository to that identity."
   ]
  ],
  "tip": "Internal only: ClusterIP. One external IP for one service: LoadBalancer. URL-based routing to several services: Ingress. Don't forget get-credentials before kubectl works. Stable identity and disk per pod: StatefulSet. One pod per node: DaemonSet.",
  "check": [
   [
    "What does gcloud container clusters get-credentials do?",
    "It adds the cluster's endpoint and auth settings to your kubeconfig so kubectl can use it."
   ],
   [
    "In kubectl expose, what is the difference between --port and --target-port?",
    "--port is the port the Service listens on; --target-port is the container port traffic is sent to."
   ],
   [
    "Which workload object runs one pod on every node?",
    "A DaemonSet."
   ]
  ]
 },
 {
  "t": "Cloud Run services and Cloud Run functions: deploying containers and event-driven code with Eventarc and Pub/Sub",
  "hook": "At Tidewater Photo Co-op, members upload thousands of pictures a day, and the website shows a spinning wheel while a single overworked VM makes thumbnails one by one. Jun, the lead developer, wants to throw the VM away. His plan: the website becomes a container that scales on its own, thumbnails get made the moment a photo lands in the bucket, and a separate search indexer picks up a message whenever a thumbnail is ready. Then security reviewer Ana asks the question that stops the room: who exactly is allowed to call each of these pieces, and how do we stop the internet from calling the indexer? How do you wire it so it is both automatic and locked down?",
  "simple": "Cloud Run lets you hand Google a packaged app and get a working web address back, without renting or managing any servers. When requests arrive, Google starts copies of your app; when it is quiet, it can shut them all down so you pay nothing. Cloud Run functions are even smaller: you hand over just one piece of code that runs when something happens, like a new file being uploaded. Something has to notice those happenings and pass them on. Eventarc is that messenger, and Pub/Sub is like a post office where one program drops off a letter and others pick it up later. Permissions decide who may knock on each app's door.",
  "body": [
   "Cloud Run runs containers without servers or clusters. A container for a Cloud Run service must listen for HTTP requests on the port given in the `PORT` environment variable, which is 8080 by default, and it should be stateless, because instances can be started and stopped at any time. You deploy a prebuilt image with `gcloud run deploy web --image=us-docker.pkg.dev/my-proj/repo/web:1.0 --region=us-central1`, or you deploy straight from source code with `gcloud run deploy web --source . --region=us-central1`, which builds the image with Cloud Build and stores it in Artifact Registry for you. In the console, each service page shows its URL, its revisions, metrics such as request count and latency, and a Logs tab.",
   "Each deployment creates an immutable revision, a snapshot of the image and configuration such as environment variables, memory and CPU limits. By default the newest revision receives all traffic, but you can split traffic between revisions, for example sending 10% to a new revision to test it, and move traffic back if something breaks. Cloud Run scales the number of container instances with traffic, from zero up to a maximum you can set, and you can set a minimum number of instances to avoid cold starts for latency-sensitive apps. Each instance can handle multiple requests at once, controlled by the concurrency setting, which is why Cloud Run is efficient for typical web traffic.",
   "Every service gets an HTTPS URL, and access is controlled by Identity and Access Management (IAM). Allowing unauthenticated invocations grants the Cloud Run Invoker role (roles/run.invoker) to allUsers, which suits a public website or public API. Otherwise, callers must present an identity token for a principal, such as a user or service account, that has roles/run.invoker on the service, and requests without one are rejected before reaching your code. Ingress settings add a network layer of control: you can restrict a service to internal traffic from your Virtual Private Cloud (VPC) or to traffic coming through a load balancer, so even a valid token from the internet cannot reach it directly.",
   "Cloud Run jobs are for work that runs to completion rather than serving requests, such as a nightly data export, a database migration or a batch of image conversions. A job can run many tasks in parallel, each processing part of the work, and it stops when all tasks finish. Jobs are often triggered on a schedule by Cloud Scheduler, and you can also execute one manually with `gcloud run jobs execute`.",
   "Configuration for both services and jobs is supplied at deploy time rather than baked into the image. You can set environment variables with `--set-env-vars`, reference values stored in Secret Manager so passwords never appear in the image or in plain configuration, and set memory and CPU limits and a request timeout. Changing any of these settings creates a new revision, just like deploying a new image, so every configuration change is tracked and can be rolled back.",
   "Cloud Run functions let you deploy just a function written in a supported language such as Node.js, Python, Go or Java. You deploy with `gcloud functions deploy`, or through the Cloud Run pages in the console, and Google builds the function into a container and runs it on Cloud Run. Functions are triggered either by HTTP requests or by events. This is the simplest way to write small pieces of glue code that react to something happening in your environment.",
   "Events are delivered by Eventarc, which routes events from Google Cloud sources to Cloud Run services and functions. Sources include Cloud Storage, for example the object finalized event when an upload completes, Pub/Sub messages, and Cloud Audit Logs entries for many Google Cloud services, such as a VM being created. Pub/Sub is Google's managed messaging service: publishers send messages to a topic, and subscriptions deliver them to subscribers either by pull, where the subscriber asks for messages, or by push, where Pub/Sub sends each message to an HTTPS endpoint. This decouples producers from consumers, so a slow consumer does not slow down the producer, and messages wait until they are processed and acknowledged. A push subscription can send messages directly to a Cloud Run URL, using a service account identity to authenticate.",
   "Identity ties it together. An Eventarc trigger or push subscription runs as a service account, and that service account needs permission to invoke the target, usually roles/run.invoker on the Cloud Run service. Separately, each Cloud Run service runs as its own service account, ideally a dedicated one rather than the default Compute Engine service account, with only the roles it requires, such as reading one bucket or accessing one secret in Secret Manager. Keeping callers and runtime identities narrow is what lets you leave internal services private while the public website stays open."
  ],
  "analogy": "Cloud Run is like a food truck that appears only when customers line up and multiplies when the line grows. Eventarc is the building's alarm system that notices a door opening and calls the right person. Pub/Sub is a mailroom: senders drop letters in a slot and leave, and recipients collect them when ready. The Invoker role is the guest list at the truck's window. The analogy stops working at the window: a public service puts 'everyone' on the guest list, which is exactly what granting the role to allUsers does.",
  "terms": [
   [
    "Revision",
    "An immutable snapshot of a Cloud Run service's image and configuration created on each deployment."
   ],
   [
    "Concurrency",
    "The maximum number of requests one Cloud Run instance handles at the same time."
   ],
   [
    "Eventarc",
    "A service that routes events from Google Cloud sources to Cloud Run services and functions."
   ],
   [
    "Pub/Sub",
    "A managed messaging service where publishers send messages to topics and subscribers receive them through pull or push subscriptions."
   ],
   [
    "Cloud Run Invoker",
    "The IAM role (roles/run.invoker) that allows a principal to call a Cloud Run service."
   ]
  ],
  "example": "A photo app stores uploads in a bucket. An Eventarc trigger on the object finalized event invokes a Cloud Run function that creates a thumbnail and publishes a message to a Pub/Sub topic, which a separate Cloud Run service consumes to update the search index.",
  "mistakes": [
   [
    "Making a service public so an Eventarc trigger or Pub/Sub can call it.",
    "Keep the service private and grant roles/run.invoker to the trigger's or subscription's service account. Public access is not required for event delivery."
   ],
   [
    "Writing uploaded files to the container's local disk to keep them.",
    "Cloud Run instances are stateless and can be removed at any time. Store files in Cloud Storage or data in a database."
   ],
   [
    "Using a Cloud Run service for a nightly batch export that runs and stops.",
    "A Cloud Run job fits work that runs to completion, often started by Cloud Scheduler. Services are for answering requests."
   ],
   [
    "Leaving every service running as the default Compute Engine service account.",
    "That account often has broad permissions. Give each service a dedicated service account with only the roles it needs."
   ]
  ],
  "tryit": [
   [
    "Harper County's permit system has a public web frontend on Cloud Run and an internal pricing service that only the frontend should call. Right now both allow unauthenticated invocations. What changes make the pricing service private while the frontend keeps working?",
    "Remove allUsers from the pricing service so it requires authentication, give the frontend its own service account, and grant that account roles/run.invoker on the pricing service. The frontend sends an identity token with each call. Optionally set the pricing service's ingress to internal traffic only."
   ],
   [
    "A team wants a message whenever a new invoice PDF is uploaded, to be processed even if the processor is briefly down, without losing invoices. Should the upload event go straight to the processor, or through Pub/Sub?",
    "Through Pub/Sub. A topic and subscription hold messages until the processor acknowledges them, so a temporary outage only delays processing. Pub/Sub also decouples the upload path from the processor's speed."
   ]
  ],
  "tip": "'Run code when a file lands in a bucket' is an event-driven function via Eventarc. 'Only specific services may call it' means require authentication and grant Cloud Run Invoker to those identities. 'Runs to completion on a schedule' means a Cloud Run job with Cloud Scheduler.",
  "check": [
   [
    "What does allowing unauthenticated invocations actually do?",
    "It grants the Cloud Run Invoker role to allUsers, making the service publicly callable."
   ],
   [
    "What's the difference between a Cloud Run service and a Cloud Run job?",
    "A service responds to requests and scales with traffic; a job runs tasks to completion and then stops."
   ],
   [
    "Which port must a Cloud Run service container listen on?",
    "The port in the PORT environment variable, 8080 by default."
   ]
  ]
 },
 {
  "t": "Choosing a data product: Cloud SQL, AlloyDB, Spanner, Firestore, Bigtable and BigQuery",
  "hook": "The architecture review at Northstar Games is in an hour, and the whiteboard already has five arrows pointing at a box labeled 'database'. The mobile app needs player profiles that sync instantly to phones. The match servers will write millions of telemetry events a minute. The in-game store sells items to players on three continents and must never sell the same rare sword twice. The finance team wants daily revenue reports in SQL. And the old account system is a MySQL app nobody wants to rewrite. Priya, the CTO, asks you to replace the single box with real products. One database cannot do all of this well. Which product goes where, and how do you defend each choice?",
  "simple": "Different kinds of data need different kinds of storage, the way a library, a filing cabinet and a warehouse each suit different things. Some data fits neatly into tables with rows and columns, like a spreadsheet; that is relational data. Some data is better stored as flexible documents or as huge lists of readings keyed by an ID. Some systems handle lots of small, quick updates, like processing purchases. Others answer big questions over enormous piles of history, like 'how much did we sell last year by country'. Google offers a product for each pattern. Picking well means asking: is it tables or not, quick updates or big analysis, how big, and does it need to work across the world?",
  "body": [
   "Choosing the right data product is one of the most tested skills on the Associate Cloud Engineer exam. Start every scenario with four questions. Is the data relational, with tables, schemas and joins, or non-relational? Is the workload online transaction processing (OLTP), with many small reads and writes for an application, or online analytical processing (OLAP), with large scans for reporting? How big will it get and how fast must it handle reads and writes? And does it need to span regions with strong consistency? The answers usually point to one product.",
   "Cloud SQL is fully managed MySQL, PostgreSQL and SQL Server. Google handles patching, backups, replication and failover, and you connect with normal drivers and tools, so existing applications often move with few changes. High availability is configured by adding a standby in another zone of the same region, and read replicas offload read traffic. It scales vertically with bigger machine types and horizontally for reads with replicas, and it is a regional service. It is the default answer for typical web and business applications that need a relational database. Connections commonly go through the Cloud SQL Auth Proxy or private IP, which avoids exposing the database to the internet.",
   "AlloyDB for PostgreSQL is a fully managed, PostgreSQL-compatible database designed for higher performance on demanding transactional workloads and for mixed workloads that also run analytical queries. Choose it when a question stresses PostgreSQL compatibility together with high performance or fast analytical queries on operational data. If the question simply says managed PostgreSQL for a normal app, Cloud SQL remains the usual answer.",
   "Spanner is a relational database that scales horizontally, offers strong consistency, and supports multi-region configurations with very high availability. You get SQL, schemas and transactions, but capacity grows by adding compute rather than moving to a bigger single machine. Choose it for global, mission-critical transactional systems such as inventory, financial trading or gaming platforms that outgrow a single Cloud SQL instance or must keep consistent data across regions. Spanner costs more than Cloud SQL for small workloads, so it is the wrong answer for a modest regional app.",
   "Firestore is a serverless NoSQL document database for web, mobile and server apps. Data is stored as documents in collections, and it offers real-time listeners that push changes to clients, offline support for mobile clients, and automatic scaling with no instances to manage. It suits user profiles, app state, chat and catalogs where the structure varies. Bigtable is a wide-column NoSQL database for huge volumes of data with very high read and write throughput and low latency by row key, such as time series, Internet of Things (IoT) telemetry, ad tech and financial ticks. It is not relational and does not support SQL joins across tables in the usual way, and designing a good row key is central to its performance. Memorystore offers managed Redis and Memcached for in-memory caching in front of other databases.",
   "BigQuery is the serverless data warehouse. You load or stream data into it and query it with standard SQL at petabyte scale, with no servers to size. You pay for storage and for queries, either by bytes processed on demand or by reserved capacity, which is why selecting only the columns you need and partitioning tables matters for cost. You can preview a query's bytes with a dry run, for example `bq query --dry_run --use_legacy_sql=false 'SELECT ...'`. BigQuery is for analytics and reporting, not for serving an app's transactions. It can also query some external data in place, such as files in Cloud Storage.",
   "Cloud Storage completes the picture. It holds unstructured objects such as images, videos, backups and data lake files, and it is often part of the answer alongside these databases, for example storing raw files that are later loaded into BigQuery. Real systems usually combine several products, and the exam rewards recognizing the main requirement in each part of a scenario rather than forcing one product to do everything.",
   "A quick decision path helps under time pressure. Relational and regional points to Cloud SQL, or AlloyDB if high-performance PostgreSQL is stressed. Relational with global scale and strong consistency points to Spanner. Documents for mobile or web apps with real-time sync point to Firestore. Massive key-based throughput such as time series points to Bigtable. SQL analytics over large datasets points to BigQuery. Files and objects point to Cloud Storage."
  ],
  "analogy": "Think of a city's record keeping. Cloud SQL is the town hall filing cabinet: organized, familiar and fine for one town. Spanner is a national registry kept perfectly in sync across many offices. Firestore is a stack of flexible folders that each citizen's phone can check instantly. Bigtable is a giant conveyor belt of sensor readings sorted by label. BigQuery is the statistics bureau that studies all the records at once but never stamps your passport. The analogy stops working on cost: a national registry is overkill, and overpriced, for one small town.",
  "terms": [
   [
    "Cloud SQL",
    "Managed MySQL, PostgreSQL and SQL Server for regional relational workloads."
   ],
   [
    "AlloyDB for PostgreSQL",
    "A managed, PostgreSQL-compatible database for high-performance transactional and mixed analytical workloads."
   ],
   [
    "Spanner",
    "A horizontally scalable, strongly consistent relational database that can span regions."
   ],
   [
    "Firestore",
    "A serverless NoSQL document database with real-time listeners and offline support for mobile and web apps."
   ],
   [
    "Bigtable",
    "A wide-column NoSQL database for massive, low-latency key-based workloads such as time series."
   ],
   [
    "BigQuery",
    "A serverless data warehouse for SQL analytics at very large scale."
   ]
  ],
  "example": "A gaming company keeps player profiles in Firestore for its mobile app, match telemetry in Bigtable for fast writes, a global item store in Spanner for consistent purchases across regions, and exports everything into BigQuery for daily analytics.",
  "mistakes": [
   [
    "Choosing BigQuery as the database behind an application's checkout because it uses SQL.",
    "BigQuery is an analytics warehouse optimized for large scans, not for low-latency transactional updates. Use Cloud SQL, AlloyDB or Spanner for transactions."
   ],
   [
    "Picking Spanner for a small regional business app because it is the most powerful.",
    "Spanner fits global scale and strong consistency across regions. For a typical regional relational app, Cloud SQL is simpler and cheaper."
   ],
   [
    "Choosing Bigtable when a scenario needs SQL joins and relational transactions.",
    "Bigtable is NoSQL with key-based access and no joins in the usual sense. Relational needs point to Cloud SQL, AlloyDB or Spanner."
   ],
   [
    "Treating Firestore and Bigtable as interchangeable NoSQL options.",
    "Firestore is a document database for app data with real-time sync; Bigtable is for very high throughput key-based data such as telemetry and time series."
   ]
  ],
  "tryit": [
   [
    "Glenwood Utilities installs smart meters that each report readings every 15 seconds. They need to store years of readings, write millions of rows per minute, and look up a meter's recent readings in milliseconds. Monthly reports will be built separately. Which product should store the raw readings?",
    "Bigtable. It handles very high write throughput and low-latency lookups by row key, such as meter ID plus timestamp. Monthly reporting can export or query the data in BigQuery. Cloud SQL would not scale to that write volume, and BigQuery is not designed for millisecond lookups."
   ],
   [
    "A regional HR application runs on PostgreSQL today. It has a few hundred users, standard queries, and the team wants managed backups and failover with minimal code changes. Which product fits?",
    "Cloud SQL for PostgreSQL, with high availability enabled. It is managed, compatible with existing PostgreSQL tools and appropriate for a regional workload of this size. AlloyDB or Spanner would add cost without a matching requirement."
   ]
  ],
  "tip": "Relational and regional: Cloud SQL. High-performance PostgreSQL: AlloyDB. Relational and global scale: Spanner. Time series or IoT at huge scale: Bigtable. Mobile or web documents: Firestore. Analytics with SQL: BigQuery. Caching: Memorystore.",
  "check": [
   [
    "Which product fits a regional app that needs a managed MySQL database?",
    "Cloud SQL for MySQL."
   ],
   [
    "Why isn't BigQuery the right store for an app's shopping cart?",
    "It's an analytics warehouse, optimized for large scans, not for low-latency transactional updates."
   ],
   [
    "Which relational product scales horizontally across regions with strong consistency?",
    "Spanner."
   ]
  ]
 },
 {
  "t": "Cloud Storage buckets: storage classes, locations, lifecycle rules and Object Versioning",
  "hook": "On Tuesday morning, Elena from the records office at Brookside Regional Hospital calls you in a panic. A script that was meant to clean up a test folder overwrote two hundred scanned patient forms in the production bucket. The originals are gone from view. Then the compliance officer, Victor, forwards a second worry: the storage bill has tripled because years of scans sit in the most expensive class, and the regulator requires seven years of retention that nobody can shorten. You have three problems in one bucket: recover the forms, cut the cost and prove nothing can be deleted early. Which bucket settings solve each one?",
  "simple": "Cloud Storage is a place to keep files of any kind, from photos to backups, in containers called buckets. When you make a bucket, you choose where in the world it lives, and you cannot move it later. You also choose a storage class, which is like choosing between a desk drawer, a basement and an off-site warehouse: the drawer costs more to rent but is cheap to open often, and the warehouse is cheap to rent but charges you each time you fetch something. Rules can move files to cheaper storage as they age, or delete them. Versioning keeps old copies when a file is replaced or deleted, like the undo history in a document.",
  "body": [
   "Cloud Storage stores objects, which are files plus their metadata, in containers called buckets. Bucket names are globally unique across all of Google Cloud, so a name like backups is almost certainly taken. You create a bucket with `gcloud storage buckets create gs://my-bucket --location=us-central1 --default-storage-class=STANDARD`, and you choose its location when you create it. You cannot change a bucket's location later; to move data you create a new bucket in the new location and copy the objects across, for example with `gcloud storage cp` or Storage Transfer Service.",
   "Locations come in three kinds, and the choice affects availability, latency and price. A region, such as us-central1, keeps data in one region at the lowest storage cost, and it is the right choice for data used mainly by compute in that same region, such as files processed by VMs or Cloud Run in us-central1. A dual-region keeps data in two specific regions, either a predefined pair or a configurable pair you choose, for higher availability and resilience to a regional outage. A multi-region, such as US, EU or ASIA, spreads data across a large geographic area, which suits content served to users across a continent. Higher availability locations cost more to store data in.",
   "Storage classes trade storage price against access cost. Standard is for frequently accessed, or hot, data such as website assets and active datasets, and it has no minimum storage duration. Nearline is for data accessed about once a month or less, with a 30-day minimum storage duration. Coldline is for data accessed about once a quarter or less, with a 90-day minimum. Archive is for data accessed less than once a year, such as long-term compliance archives and disaster recovery copies, with a 365-day minimum. Colder classes have cheaper storage but charge retrieval fees when you read data, and early-deletion charges if you delete or replace an object before its minimum duration. Unlike some other clouds' archive tiers, all Cloud Storage classes give the same fast access, in milliseconds, when you do read; there is no hours-long restore. Autoclass is a bucket setting that moves objects between classes automatically based on how often they are accessed, which helps when access patterns are unpredictable.",
   "Object Lifecycle Management applies rules to objects automatically, so you do not need scripts to tidy up. Each rule has an action, such as SetStorageClass or Delete, and one or more conditions, such as age in days, creation date, current storage class, whether the object is live or noncurrent, or the number of newer versions. A typical policy moves objects to Coldline after 90 days, to Archive after a year, and deletes them after a set period. You write the rules as a JSON file and apply them with `gcloud storage buckets update gs://my-bucket --lifecycle-file=rules.json`. Rules can take up to a day to act, so they are not instant.",
   "Object Versioning protects against accidental overwrites and deletions. When it is enabled, overwriting or deleting a live object keeps the previous content as a noncurrent version, identified by a generation number, so you can restore it by copying that version back. You enable it with `gcloud storage buckets update gs://my-bucket --versioning`. Noncurrent versions are billed as storage, so a bucket with frequent overwrites can grow quickly; combine versioning with a lifecycle rule that deletes noncurrent versions after some days or keeps only a few newer versions. Soft delete is a separate protection that retains deleted objects for a retention period so they can be restored, even when versioning is off.",
   "Retention policies work in the opposite direction from lifecycle deletes. A retention policy sets a minimum age that objects must reach before they can be deleted or overwritten. This is used for compliance requirements such as keeping records for several years. Until locked, the policy can be changed or removed. Locking it with Bucket Lock makes it permanent: the retention period can then be increased but never reduced or removed, and the bucket cannot be deleted while it contains objects still under retention. That permanence is the point for regulators, and also a reason to lock only after careful review.",
   "Putting it together, a well-designed bucket answers four questions. Where should the data live, which sets the location and cannot change? How often is it read, which sets the starting class and any lifecycle transitions or Autoclass? How do you recover from mistakes, which points to versioning and soft delete? And must data be kept for a minimum time, which points to a retention policy and possibly Bucket Lock?"
  ],
  "analogy": "Storage classes are like places to keep your belongings. Standard is the shelf in your room: rent is high, but grabbing something is free. Nearline is the hall closet, Coldline is the basement and Archive is a storage unit across town where each visit costs a fee and you promised to rent for a year. Lifecycle rules are a helper who moves boxes down as they gather dust. The analogy stops working on speed: in Cloud Storage, even Archive data comes back in milliseconds, not after a long drive.",
  "mnemonic": "Classes from hottest to coldest with minimum days: 'Some New Cats Arrive' for Standard (none), Nearline (30), Coldline (90), Archive (365).",
  "terms": [
   [
    "Storage class",
    "The Standard, Nearline, Coldline or Archive setting that sets storage price, access cost and minimum duration."
   ],
   [
    "Bucket location",
    "The region, dual-region or multi-region where a bucket's data is stored, chosen at creation and not changeable."
   ],
   [
    "Lifecycle rule",
    "An automatic action, such as changing class or deleting, applied when an object meets conditions."
   ],
   [
    "Object Versioning",
    "A bucket setting that keeps noncurrent versions of overwritten or deleted objects."
   ],
   [
    "Retention policy",
    "A minimum time objects must be kept before they can be deleted or replaced, lockable with Bucket Lock."
   ]
  ],
  "example": "A hospital stores scanned records in a regional bucket in Standard class. A lifecycle rule moves objects to Coldline after 90 days and Archive after one year, and a locked retention policy guarantees nothing can be deleted for 7 years, satisfying the regulator.",
  "mistakes": [
   [
    "Believing Archive or Coldline data takes hours to retrieve.",
    "All Cloud Storage classes return data in milliseconds. Colder classes cost more per read and have minimum storage durations, but access is not delayed."
   ],
   [
    "Planning to change a bucket's location later if needs change.",
    "A bucket's location is fixed at creation. Moving data means creating a new bucket and copying objects."
   ],
   [
    "Turning on versioning and forgetting about cost.",
    "Every noncurrent version is billed as storage. Add a lifecycle rule to delete old noncurrent versions."
   ],
   [
    "Using a lifecycle rule to guarantee records are kept for seven years.",
    "Lifecycle rules act on objects but do not prevent deletion. A retention policy, locked with Bucket Lock for compliance, prevents early deletion."
   ]
  ],
  "tryit": [
   [
    "Ridgeline Architects keeps project drawings that are edited heavily for two months, opened occasionally for a year, and rarely touched after that, but must be kept for ten years. Staff sometimes overwrite files by mistake. Design the bucket settings.",
    "Start in Standard class. Add lifecycle rules to move objects to Nearline or Coldline after about 60 days and to Archive after a year. Enable Object Versioning to recover overwrites, with a lifecycle rule deleting noncurrent versions after a set period. Add a ten-year retention policy, locking it with Bucket Lock once reviewed. Autoclass is an alternative to manual class transitions."
   ],
   [
    "A team stores nightly database backups that they expect to read only if disaster strikes, and they delete each backup after 30 days. They chose Archive class to save money. Is that a good choice?",
    "No. Archive has a 365-day minimum storage duration, so deleting after 30 days incurs early-deletion charges for the remaining period. Nearline, with a 30-day minimum, fits better for 30-day retention with rare access."
   ]
  ],
  "tip": "Match access frequency to the class: monthly is Nearline, quarterly is Coldline, yearly or less is Archive. Remember the 30, 90 and 365-day minimums, that every class reads in milliseconds, and that a bucket's location can't be changed later.",
  "check": [
   [
    "Which class suits backups that are read about once a quarter?",
    "Coldline, which has a 90-day minimum storage duration."
   ],
   [
    "What happens when you overwrite an object in a bucket with versioning on?",
    "The previous content becomes a noncurrent version that you can restore."
   ],
   [
    "What does locking a retention policy with Bucket Lock do?",
    "It makes the policy permanent: the retention period can be increased but not reduced or removed."
   ]
  ]
 },
 {
  "t": "VPC networks: auto vs custom mode, subnets, firewall rules, Shared VPC and VPC Network Peering",
  "hook": "Kofi, the network lead at Granite State Insurance, slides a diagram across the table. Twelve app teams each built their own project with the default network, and now the company wants to connect everything to the data center over VPN. The trouble: half the projects use the same 10.128.0.0/9 ranges, so they overlap with each other, and nobody can say which firewall rules are letting SSH in from the internet. Kofi wants one team to control networking for all twelve projects, and a link to a partner company's network that his team does not manage. Where do you start untangling this, and which Google Cloud features fit each request?",
  "simple": "A Virtual Private Cloud, or VPC, is your own private network inside Google Cloud, like the private hallways and rooms of an office building. Unusually, one VPC can stretch across the whole world, with smaller sections called subnets in each region. You can let Google create a subnet in every region automatically, or plan them yourself so the address numbers do not clash with your office network. Firewall rules are the door locks: by default, nobody can come in from outside, and anything inside can go out. Shared VPC lets one central team run the network that many projects use. Peering is like a private corridor joining your building to a neighbor's building.",
  "body": [
   "A Virtual Private Cloud (VPC) network in Google Cloud is global. One VPC can contain subnets in many regions, and virtual machines (VMs) in different regions of the same VPC can talk to each other over internal IP addresses without any extra setup such as VPN tunnels between regions. This is different from some other clouds, where a virtual network belongs to one region. Subnets, however, are regional: each subnet lives in one region and has a primary IPv4 range, for example 10.10.0.0/20, plus optional secondary ranges that are used for things like Google Kubernetes Engine (GKE) pod and service IP addresses.",
   "When you create a VPC you choose a subnet creation mode. In auto mode, Google creates one subnet in every region automatically from the 10.128.0.0/9 block and adds new subnets as new regions launch. The default network that new projects often receive is an auto mode VPC that also comes with permissive firewall rules, for example rules allowing internal traffic between its subnets, plus Secure Shell (SSH), Remote Desktop Protocol (RDP) and Internet Control Message Protocol (ICMP) from any address. In custom mode, you create only the subnets you want, in the regions you choose, with the IP ranges you choose. Custom mode is recommended for production because it avoids overlapping ranges with on-premises networks or other VPCs you might connect later, and it avoids creating subnets in regions you never use. You can convert an auto mode network to custom mode, but you cannot convert it back. A custom subnet can be created with `gcloud compute networks subnets create app-east --network=prod --region=us-east1 --range=10.10.0.0/20`.",
   "VPC firewall rules control traffic to and from VM instances. They are stateful, which means that if a connection is allowed in one direction, the return traffic for that connection is automatically allowed. Each rule has a direction, either ingress (incoming) or egress (outgoing); an action, either allow or deny; a priority from 0 to 65535, where lower numbers have higher priority and the lowest-numbered matching rule wins; protocols and ports; a source range for ingress or a destination range for egress; and targets, which can be all instances in the network, instances with a specific network tag, or instances running as a specific service account. Every VPC also has two implied rules at the lowest possible priority that cannot be deleted: deny all ingress and allow all egress. That is why a new VM in a custom network cannot be reached until you add an allow rule.",
   "An example rule allowing web traffic to tagged VMs looks like this: `gcloud compute firewall-rules create allow-web --network=prod --direction=INGRESS --action=ALLOW --rules=tcp:80,tcp:443 --source-ranges=0.0.0.0/0 --target-tags=web`. Targeting by service account is generally considered stronger than by network tag, because anyone who can edit a VM can change its tags, while changing a VM's service account requires additional permissions. For SSH access to VMs without public exposure, a common pattern is to allow tcp:22 only from the Identity-Aware Proxy range rather than from 0.0.0.0/0. Beyond VPC firewall rules, hierarchical firewall policies at the organization or folder level and network firewall policies add central control, letting a security team enforce rules that project teams cannot override.",
   "Shared VPC solves the problem of many projects needing one centrally managed network. A host project owns the VPC network, and service projects are attached to it so that their resources, such as VMs and GKE clusters, use subnets from the host network. A central network team manages subnets, routes and firewall rules in the host project, while app teams get the Compute Network User role on specific subnets so they can deploy into them without changing the network itself. This is the answer when a scenario asks for centralized network control across many projects in the same organization, with separation of duties between network administrators and application teams.",
   "VPC Network Peering connects two VPC networks, in the same project, different projects or even different organizations, so they exchange subnet routes and communicate privately over internal IP addresses using Google's network. Each side remains administered separately, and both sides must configure the peering for it to become active. Subnet ranges in the two networks must not overlap. Peering is also not transitive: if network A peers with network B, and B peers with C, A cannot reach C through B. If A needs C, you must peer A and C directly or use a different design.",
   "Choosing between the two is a common exam decision. If one organization wants a central team to own the network that many projects use, choose Shared VPC. If two separately managed networks, possibly from different organizations, need private connectivity while keeping independent administration, choose VPC Network Peering. In both cases, careful custom mode IP planning from the start avoids the overlapping ranges that make connections impossible later."
  ],
  "analogy": "A global VPC is like one company campus with buildings in many cities connected by private hallways, where each building is a subnet. Firewall rules are door locks checked from the lowest-numbered rule up, and the default is that outsiders cannot enter while insiders can leave. Shared VPC is a facilities department running hallways for every team. Peering is a private bridge to a neighbor's campus. The analogy stops working on transitivity: crossing two bridges in a row is not allowed, so a neighbor's neighbor is unreachable.",
  "terms": [
   [
    "Custom mode VPC",
    "A VPC where you create subnets and choose their ranges yourself, recommended for production."
   ],
   [
    "Firewall rule priority",
    "A number from 0 to 65535 where the lowest-numbered matching rule takes effect."
   ],
   [
    "Implied firewall rules",
    "The built-in, lowest-priority rules in every VPC that deny all ingress and allow all egress."
   ],
   [
    "Shared VPC",
    "A model where service projects use subnets from a centrally managed host project's VPC."
   ],
   [
    "VPC Network Peering",
    "A private, non-transitive connection between two VPC networks that exchanges subnet routes."
   ]
  ],
  "example": "A company builds a custom mode VPC in a Shared VPC host project with subnets in us-east1 and europe-west1 that don't overlap its data center ranges. Five app teams attach their service projects, and a firewall rule allows tcp:443 only to VMs with the tag web.",
  "mistakes": [
   [
    "Thinking a VPC is regional and needs a VPN between regions.",
    "Google Cloud VPCs are global. Only subnets are regional, and VMs in different regions of one VPC communicate over internal IPs."
   ],
   [
    "Assuming a higher priority number means a rule is stronger.",
    "Lower numbers win. A rule with priority 100 beats a rule with priority 1000 when both match."
   ],
   [
    "Expecting A to reach C because A peers with B and B peers with C.",
    "Peering is not transitive. A and C need their own peering or another connectivity design."
   ],
   [
    "Using auto mode networks for production that will connect to on-premises.",
    "Auto mode uses the same 10.128.0.0/9 block everywhere, which can overlap with other networks. Custom mode lets you plan non-overlapping ranges."
   ]
  ],
  "tryit": [
   [
    "A new VM in a custom mode VPC runs a web server, but nobody can reach it on port 443, even from another VM in the same subnet. No firewall rules have been created yet. Why, and what do you add?",
    "The implied rule denies all ingress, so even internal traffic is blocked. Add an ingress allow rule for tcp:443 from the needed source ranges, targeting the VM by network tag or service account."
   ],
   [
    "Fernhill Media has 30 projects in one organization. The security team wants a single network team to control all subnets and firewall rules, while app teams deploy VMs themselves. A partner company also needs private access to one analytics network. What do you recommend for each?",
    "Use Shared VPC: a host project with the network managed centrally, service projects attached, and Compute Network User granted on specific subnets to app teams. For the partner, use VPC Network Peering between the analytics network and the partner's VPC, ensuring ranges do not overlap."
   ]
  ],
  "tip": "Central team manages the network for many projects: Shared VPC. Connecting two separately managed VPCs: peering. Peering isn't transitive and ranges can't overlap. Lower priority numbers win. Implied rules deny ingress and allow egress.",
  "check": [
   [
    "Is a VPC network regional or global in Google Cloud?",
    "Global. Its subnets are regional."
   ],
   [
    "Which implied firewall rules does every VPC have?",
    "Deny all ingress and allow all egress, at the lowest priority."
   ],
   [
    "Can you convert a custom mode VPC to auto mode?",
    "No. You can convert auto mode to custom mode, but not back."
   ]
  ]
 },
 {
  "t": "Load balancing, Cloud NAT and hybrid connectivity with Cloud VPN and Cloud Interconnect",
  "hook": "Grace, the operations manager at Lantern Street Books, has three tickets open and one deadline. Customers in Europe complain the storefront is slow, and the site runs on VMs in a single US region. The security team removed every external IP from the back-end VMs, and now nightly package updates fail. And the warehouse systems still live in a data center that must reach the cloud database privately, starting next week, with a faster dedicated link to follow in a few months. Grace wants a plan for all three before Friday's change board. Which load balancer, which outbound path and which hybrid connection fit, and in what order would you build them?",
  "simple": "A load balancer is like a host at a busy restaurant who greets every guest and sends them to a free table, so no single waiter is overwhelmed and a sick waiter is simply skipped. Google offers several kinds, depending on whether the traffic is web pages or other network traffic, whether it comes from the internet or from inside, and whether users are worldwide or local. Cloud NAT lets private servers with no public address reach out to the internet, for updates for example, without letting strangers reach in. Finally, to connect your own office or data center to Google, you can use an encrypted tunnel over the internet (VPN) or rent a private cable (Interconnect).",
  "body": [
   "Cloud Load Balancing is a family of managed load balancers that distribute traffic across healthy backends. To pick the right one, ask three questions. Is the traffic HTTP or HTTPS, which is layer 7 of the Open Systems Interconnection (OSI) model, or other TCP and UDP traffic at layer 4? Does it come from the internet (external) or from inside your network (internal)? And should it be global, serving users in many regions through one address, or regional? The answers narrow the choice to one product family, and exam questions are usually built around exactly these three distinctions.",
   "Application Load Balancers are layer 7 proxies for HTTP and HTTPS. The global external Application Load Balancer gives you one anycast IP address worldwide, so users connect to the nearest Google edge location and traffic travels over Google's network to the closest healthy backend. It routes requests by host and path using URL maps, terminates Transport Layer Security (TLS) with Google-managed or your own certificates, and integrates with Cloud CDN for caching and Cloud Armor for web application firewall and denial-of-service protection. Regional external and internal Application Load Balancers serve HTTP and HTTPS traffic within one region, for example for internal microservices or when data must stay in a region.",
   "Network Load Balancers work at layer 4. Proxy Network Load Balancers terminate TCP connections, optionally with TLS offload, and open new connections to the backends. Passthrough Network Load Balancers forward packets to backends without proxying, so backends see the original client IP address, and they support TCP, UDP and other protocols. Internal passthrough Network Load Balancers distribute traffic inside a Virtual Private Cloud (VPC) network, which suits internal databases or services that other VMs call on private addresses. If a scenario needs UDP or requires the backend to see the client's real source IP, a passthrough Network Load Balancer is usually the answer.",
   "All of these load balancers share the same building blocks. A frontend has an IP address and port, a backend service defines how traffic is distributed and which health check to use, and backends can be managed instance groups, network endpoint groups (NEGs) for GKE pods or serverless services such as Cloud Run, or Cloud Storage buckets for static content. Health checks probe each backend, and unhealthy ones stop receiving traffic. Remember that health check probes come from Google's specific probe IP ranges, so firewall rules must allow them; a load balancer reporting every backend as unhealthy is often a missing firewall rule.",
   "Cloud NAT provides outbound internet access for resources without external IP addresses, such as private VMs and GKE nodes, while blocking unsolicited inbound connections from the internet. It is a managed, software-defined service rather than a proxy VM, so there is no single machine to size or patch. Cloud NAT is configured per region on a Cloud Router, for example with `gcloud compute routers nats create nat-1 --router=router-1 --region=us-central1 --auto-allocate-nat-external-ips --nat-all-subnet-ip-ranges`. A related subnet setting, Private Google Access, lets VMs without external IPs reach Google APIs and services such as Cloud Storage and BigQuery without going through NAT. If private VMs only need Google APIs, Private Google Access is enough; if they need the wider internet, add Cloud NAT.",
   "To connect on-premises networks to a VPC, Cloud VPN creates Internet Protocol Security (IPsec) tunnels over the public internet, encrypting traffic in transit. HA VPN uses a gateway with two interfaces and, when configured with two tunnels correctly, offers a 99.99% availability service level agreement (SLA). It uses Cloud Router to exchange routes dynamically with Border Gateway Protocol (BGP), so new subnets on either side are learned automatically. VPN is quick to set up and inexpensive, but its throughput and latency depend on internet performance, so it suits smaller bandwidth needs, a first connection while a dedicated link is provisioned, or a backup path.",
   "Cloud Interconnect provides private, high-bandwidth connections that do not cross the public internet. Dedicated Interconnect is a direct physical link between your network and Google's in a colocation facility, for organizations that can reach such a facility and need large capacity. Partner Interconnect goes through a supported service provider when you cannot reach a Google facility or need less bandwidth than a dedicated link offers. Interconnect traffic is private but not encrypted by default, so sensitive traffic may need encryption at the application layer or an encryption option on top of the link. Both forms use Cloud Router and BGP for routing.",
   "Do not confuse Interconnect with peering. Direct Peering and Carrier Peering connect your network to Google's public edge to reach Google's public services, such as Google Workspace, more efficiently; they do not give private access to your VPC. A good decision summary for the exam: global HTTP or HTTPS with URL routing or CDN means the global external Application Load Balancer; non-HTTP traffic that must preserve client IPs means a passthrough Network Load Balancer; private VMs needing outbound internet means Cloud NAT; a fast, encrypted connection over the internet means HA VPN; and private, high-bandwidth connectivity means Dedicated or Partner Interconnect."
  ],
  "analogy": "Picture a shipping company. The global Application Load Balancer is a worldwide front desk that reads each package's address label and sends it to the right warehouse. A passthrough Network Load Balancer is a conveyor belt that moves boxes along without opening them, so the sender's label stays intact. Cloud NAT is a mailroom that sends letters out under the company address but refuses unexpected deliveries. HA VPN is an armored van on public roads; Interconnect is a private rail line. The analogy stops working on security: the private rail line is not locked by default, since Interconnect traffic is unencrypted unless you add encryption.",
  "terms": [
   [
    "Application Load Balancer",
    "A layer 7 proxy load balancer for HTTP(S) with URL-based routing, available as global or regional, external or internal."
   ],
   [
    "Passthrough Network Load Balancer",
    "A layer 4 load balancer that forwards packets and preserves client IP addresses."
   ],
   [
    "Cloud NAT",
    "Managed network address translation that gives private resources outbound internet access, configured on a Cloud Router."
   ],
   [
    "HA VPN",
    "Highly available IPsec VPN to Google Cloud using two interfaces and BGP through Cloud Router."
   ],
   [
    "Cloud Interconnect",
    "Private, high-bandwidth connectivity to a VPC, either Dedicated (direct physical link) or Partner (through a service provider)."
   ]
  ],
  "example": "A retailer serves its storefront through a global external Application Load Balancer with Cloud CDN, runs back-end VMs without external IPs that download updates through Cloud NAT, and connects its warehouses over HA VPN while a Partner Interconnect is being provisioned.",
  "mistakes": [
   [
    "Assuming Interconnect traffic is encrypted because it is private.",
    "Interconnect keeps traffic off the public internet but does not encrypt it by default. Add encryption if required."
   ],
   [
    "Choosing Cloud NAT so private VMs can reach Cloud Storage.",
    "Private Google Access on the subnet is enough for Google APIs. Cloud NAT is needed for general internet destinations."
   ],
   [
    "Picking an Application Load Balancer for UDP game traffic.",
    "Application Load Balancers handle HTTP and HTTPS only. UDP needs a passthrough Network Load Balancer."
   ],
   [
    "Using Direct Peering to reach VMs in a VPC privately.",
    "Direct and Carrier Peering reach Google's public services. Private VPC access needs Cloud VPN or Cloud Interconnect."
   ]
  ],
  "tryit": [
   [
    "Bayview Clinic's back-end VMs have no external IPs. They need to download operating system patches from public repositories and read files from Cloud Storage. No inbound internet traffic should reach them. What do you configure?",
    "Enable Private Google Access on the subnet so the VMs reach Cloud Storage, and configure Cloud NAT on a Cloud Router in that region for outbound access to the public patch repositories. Cloud NAT does not allow unsolicited inbound connections, so the VMs stay unreachable from the internet."
   ],
   [
    "A company needs to connect its data center to Google Cloud within a week, with redundancy, and later wants several gigabits of private bandwidth. It is not located near a Google colocation facility. What sequence do you recommend?",
    "Set up HA VPN first with two tunnels and BGP through Cloud Router for a quick, encrypted, highly available connection. Then order Partner Interconnect through a service provider, since the company cannot reach a Google facility, and keep the VPN as a backup path."
   ]
  ],
  "tip": "HTTP(S) plus global plus URL routing or CDN: global external Application Load Balancer. UDP or client IP preserved: passthrough Network Load Balancer. Private VMs needing outbound internet: Cloud NAT. Fast to set up over the internet: HA VPN. Private, high bandwidth: Interconnect.",
  "check": [
   [
    "Which load balancers preserve the client's source IP to the backend?",
    "Passthrough Network Load Balancers, because they don't proxy connections."
   ],
   [
    "What does Cloud NAT need to be configured on?",
    "A Cloud Router in the region where the private resources are."
   ],
   [
    "When would you choose Partner Interconnect over Dedicated Interconnect?",
    "When you can't reach a Google colocation facility or need less bandwidth than a dedicated link provides."
   ]
  ]
 },
 {
  "t": "Infrastructure as code with Terraform and Cloud Marketplace solutions",
  "hook": "It is Thursday afternoon at Lantern Freight, and Omar has just rebuilt the staging network by hand for the third time this quarter. Production has a firewall rule nobody can explain, staging is missing two subnets, and the only record of how things were built is a wiki page last edited a year ago. Your manager wants a new environment for the Denver warehouse by Monday, identical to production, plus a WordPress site for the marketing team by tomorrow. Clicking through the console again will take days and drift again. How do you build environments that come out the same every time, and what is the fastest honest way to stand up that WordPress site?",
  "simple": "Infrastructure as code means writing down what your cloud setup should look like in a text file, the way a recipe lists ingredients and steps. A tool called Terraform reads the file and builds exactly what it describes. Because the file is saved and shared like any document, teammates can review it before anything changes, and you can build the same setup again whenever you need it. Terraform also keeps a notebook, called state, that remembers which real things it built. Cloud Marketplace is different: it is like an app store for the cloud, where you pick a ready-made product, such as a website platform, and deploy it in a few clicks instead of building it yourself.",
  "body": [
   "Infrastructure as code (IaC) means describing your infrastructure in files that are stored in version control, reviewed like code and applied automatically. Instead of clicking through the console and hoping you remember every setting, you write down the desired result once. The payoff is repeatable environments, peer review of changes before they happen, and a history of who changed what and why. For Google Cloud, the most common IaC tool is Terraform, an open source tool from HashiCorp, used together with the Google Cloud provider, which is the plugin that knows how to talk to Google Cloud APIs.",
   "Terraform configuration is declarative and written in HashiCorp Configuration Language (HCL). Declarative means you describe what should exist, not the steps to create it. For example, a `google_compute_instance` resource block describes a virtual machine (VM) by its name, zone, machine type and boot disk, and a `google_compute_network` block describes a Virtual Private Cloud (VPC) network. Terraform works out the order of operations from the references between blocks, so a VM that refers to a subnet is created after that subnet. Variables let the same configuration build a dev and a prod environment with different sizes or regions.",
   "The core workflow has four commands, and the exam expects you to know what each one does. `terraform init` prepares a working directory by downloading providers and modules and configuring the backend where state lives. `terraform plan` compares your configuration with the recorded state and with reality, then prints what would be created, changed or destroyed, without touching anything. Lines marked with a plus sign are new resources, a tilde means an in-place change, and a minus sign means a deletion. `terraform apply` makes those changes, normally after showing the plan and asking for confirmation. `terraform destroy` removes everything the configuration manages, which is useful for tearing down a temporary test environment.",
   "State is what makes Terraform work, so it deserves care. The state file maps each block in your configuration to a real resource, such as the self link of a particular VM, so Terraform knows what it already manages. If state is kept only on one engineer's laptop, nobody else can safely run Terraform, and losing the laptop means losing track of your infrastructure. For teams, store state remotely in a Cloud Storage bucket using the gcs backend. That gives everyone one shared copy, locks the state while a run is in progress so two people cannot apply at once, and, with Object Versioning turned on in the bucket, lets you recover an earlier copy if state is ever corrupted. Treat the state bucket as sensitive, because state can contain secrets such as generated passwords, and restrict who can read it with IAM.",
   "Modules are how you avoid copying the same configuration everywhere. A module packages reusable configuration, such as a standard VPC with your approved subnets and firewall rules, or a project factory that creates a project, links billing and enables APIs in one step. Google's Cloud Foundation Toolkit publishes Terraform modules that follow Google's recommended practices, so you can start from a tested blueprint rather than a blank file. Teams typically keep their own modules in a shared repository and call them from each environment's configuration.",
   "Google Cloud gives you several ways to run Terraform. Terraform is preinstalled in Cloud Shell, so you can try it with no setup, and many console pages can show the equivalent Terraform for a resource you are about to create. Infrastructure Manager is a managed Google Cloud service that runs Terraform deployments for you, using Cloud Build behind the scenes, and stores the state for you, which removes the need to manage a state bucket yourself. Google's older Deployment Manager, which used YAML and Jinja or Python templates, has been deprecated in favor of Infrastructure Manager, so new work should use Terraform or Infrastructure Manager. Config Connector is another option for teams that live in Kubernetes: it lets you manage Google Cloud resources as Kubernetes objects from a Google Kubernetes Engine (GKE) cluster, applying YAML with `kubectl`.",
   "A typical team workflow ties these pieces together. Engineers change configuration on a branch and open a pull request. An automated pipeline runs `terraform plan` and posts the output, so reviewers see exactly which resources will change. After approval, merging runs `terraform apply` against the shared remote state. Manual changes made in the console are discouraged, because the next plan will show them as drift and may try to revert them.",
   "Cloud Marketplace solves a different problem. It is a catalog of prebuilt solutions from Google and partners, such as WordPress stacks, databases, security appliances, monitoring tools and developer tools, that you can deploy into your project in a few clicks. Many deployments create ordinary resources you can see afterward, such as a VM, a disk and firewall rules, and some solutions are delivered as GKE applications or software as a service. Some products are free, while others are billed through your Cloud Billing account under the vendor's license terms, in addition to the cost of the underlying Google Cloud resources. Marketplace is the answer when a question asks for the quickest way to deploy a common third-party product, while Terraform is the answer when the question stresses repeatability, review, previews or version control."
  ],
  "analogy": "Terraform is like an architect's blueprint plus a building inspector's checklist. The blueprint (your configuration) says what the house should look like, and the checklist (state) records what has actually been built, so the contractor only adds or removes what differs. `terraform plan` is the walkthrough before any work starts. The comparison weakens on one point the exam cares about: a real checklist cannot be edited by two inspectors at once, but a Terraform state file can be corrupted that way, which is why shared state lives in a locked, versioned Cloud Storage bucket.",
  "mnemonic": "\"I Plan, Apply, Destroy\": init downloads providers and sets up the backend, plan previews changes, apply makes them, destroy removes everything the configuration manages. Init always comes first in a new working directory.",
  "terms": [
   [
    "Infrastructure as code",
    "Managing infrastructure through versioned, declarative configuration files instead of manual changes."
   ],
   [
    "terraform plan",
    "Shows the changes Terraform would make, compared with state, without applying them."
   ],
   [
    "Terraform state",
    "A file that records which real resources correspond to each block of the configuration."
   ],
   [
    "gcs backend",
    "The Terraform backend that stores shared state in a Cloud Storage bucket, with locking during runs."
   ],
   [
    "Module",
    "A reusable package of Terraform configuration, such as a standard VPC or project factory."
   ],
   [
    "Infrastructure Manager",
    "A managed Google Cloud service that runs Terraform deployments and stores their state."
   ],
   [
    "Cloud Marketplace",
    "A catalog of ready-to-deploy solutions from Google and partners, some billed through Cloud Billing."
   ]
  ],
  "example": "A platform team keeps its network, projects and GKE clusters in a git repository of Terraform modules. Each pull request runs terraform plan so reviewers see the exact changes, and merging runs terraform apply with state stored in a versioned Cloud Storage bucket. When marketing asks for a WordPress site the same week, the team deploys a Marketplace WordPress solution into a separate project in about ten minutes rather than writing it from scratch.",
  "mistakes": [
   [
    "Keeping the state file on a laptop or committing it to git is fine for a team.",
    "Local state cannot be shared or locked, and state in git can leak secrets. Use the gcs backend with a versioned, access-restricted bucket, or let Infrastructure Manager store state."
   ],
   [
    "terraform plan makes the changes and apply just confirms them.",
    "Plan changes nothing; it only previews. Apply is the command that creates, changes or destroys resources."
   ],
   [
    "Deployment Manager is the recommended Google tool for new infrastructure as code.",
    "Deployment Manager has been deprecated in favor of Infrastructure Manager. New work should use Terraform, directly or through Infrastructure Manager."
   ],
   [
    "Cloud Marketplace is the best way to manage your own repeatable environments.",
    "Marketplace is for quickly deploying common third-party products. Repeatable, reviewed, version-controlled infrastructure points to Terraform."
   ]
  ],
  "tryit": [
   [
    "Two engineers at Lantern Freight both run terraform apply from their laptops against the same production project, each with their own local state file. A week later, a plan shows Terraform wants to delete a load balancer that is serving traffic. What went wrong, and how should the team set things up?",
    "Each engineer's local state only knew about the resources that person created, so one state file did not include the load balancer and Terraform treated it as something to reconcile. The fix is one shared remote state in a Cloud Storage bucket with the gcs backend, Object Versioning on and access restricted, so runs are locked and everyone sees the same state. Running applies from a pipeline instead of laptops makes this even safer."
   ],
   [
    "A product manager needs a well-known open source content management system running for a two-week pilot, and nobody on the team has time to build it. What is the fastest appropriate approach?",
    "Deploy it from Cloud Marketplace. It is designed for quickly deploying common third-party products. Check whether the listing has license charges beyond the infrastructure cost, and delete the deployment when the pilot ends."
   ]
  ],
  "tip": "'Preview changes before applying', 'version-controlled', 'repeatable' and 'reusable modules' all point to Terraform. 'Managed Terraform with state handled for you' points to Infrastructure Manager. 'Deploy a common third-party product quickly' points to Cloud Marketplace. Shared state belongs in a Cloud Storage bucket with the gcs backend.",
  "check": [
   [
    "Where should a team store shared Terraform state on Google Cloud?",
    "In a Cloud Storage bucket using the gcs backend, ideally with Object Versioning enabled and access restricted, because state is shared, locked during runs and can contain secrets."
   ],
   [
    "What does terraform plan do?",
    "It shows what would be created, changed or destroyed, without changing anything."
   ],
   [
    "Which Google Cloud service runs Terraform for you and stores state, replacing Deployment Manager for new work?",
    "Infrastructure Manager."
   ],
   [
    "A question asks for the quickest way to deploy a popular third-party database stack. What do you choose?",
    "Cloud Marketplace."
   ]
  ]
 },
 {
  "t": "Managing Compute Engine VMs: start, stop, resize, SSH with OS Login and IAP TCP forwarding",
  "hook": "It is 11 p.m. at Cedar Hollow Clinic, and Dana on the infrastructure team gets a message: the patient portal VM is pegged at full CPU and needs a bigger machine type now. At the same time, the security lead reminds her that a contractor left the company today, and his SSH key may still be sitting in project metadata. None of the clinic's VMs have external IP addresses, and there is no bastion host. Dana needs to resize a VM, get a shell on it, and make sure a former contractor cannot. Which commands and features let her do all three tonight without opening a single public port?",
  "simple": "A Compute Engine VM is a computer you rent from Google. Managing it day to day means turning it on and off, making it bigger, and logging in to fix things. Turning it off stops most of the bill, but you still pay to keep its disks, like paying for a storage unit even when you are not visiting it. To make a VM bigger you turn it off first, change its size, and turn it back on. To log in, the safest method is OS Login, which uses your company Google account, so when someone leaves and their account is switched off, their access disappears too. If a VM has no public address, Identity-Aware Proxy acts like a guarded side door that checks your identity before letting you in.",
  "body": [
   "Day-to-day VM management is mostly a handful of gcloud commands, and knowing what each one does to billing and to the running system is a common exam theme. `gcloud compute instances list` shows your VMs with their zones, status (such as RUNNING, TERMINATED or SUSPENDED) and internal and external IP addresses. `gcloud compute instances stop web-1 --zone=us-central1-a` stops a VM and `start` brings it back. A stopped VM does not incur charges for its virtual CPUs (vCPUs) and memory, but you still pay for its persistent disks and for any reserved static IP addresses attached to it. `suspend` saves the contents of memory to disk and `resume` restores the VM to exactly where it left off, which is handy for workloads with a slow warm-up. `reset` is a hard restart, like pulling the power cord, so the operating system does not shut down cleanly.",
   "Changing a VM's size is the classic in-place change that still needs downtime. To change the machine type, you must stop the VM first, run `gcloud compute instances set-machine-type web-1 --machine-type=e2-standard-4 --zone=us-central1-a`, and then start it again. If you try it on a running VM, the command fails. The VM keeps its disks, internal IP address and configuration through the change. Before resizing, it is worth checking the rightsizing recommendations Compute Engine shows in the console, which suggest a smaller or larger machine type based on observed usage.",
   "Disks and other settings are more flexible. A persistent disk can be enlarged while the VM runs with `gcloud compute disks resize web-1 --size=200GB --zone=us-central1-a`, after which you grow the partition and file system inside the operating system, because Google enlarges the block device but not your file system. Disks can grow but never shrink. You can also add or change labels, metadata such as a startup script, network tags used by firewall rules, and the attached service account's scopes (the last one requires the VM to be stopped) without recreating the VM. Moving a VM to another zone or region, on the other hand, generally means creating a new VM from a snapshot or machine image in the target location and deleting the old one.",
   "For SSH, `gcloud compute ssh web-1 --zone=us-central1-a` generates and uploads keys for you and connects. Behind the scenes there are two ways a key gets authorized. With metadata-based SSH keys, public keys are stored in project or instance metadata, and anyone whose key is there can log in until someone removes it. That is easy to start with, but keys pile up and nobody notices when a departing employee's key stays behind. With OS Login, Linux accounts on the VM are tied to Google identities. Access is controlled by IAM roles: Compute OS Login (`roles/compute.osLogin`) for regular users and Compute OS Admin Login (`roles/compute.osAdminLogin`) for users who need sudo. OS Login can require two-step verification, and removing a person's role or disabling their account removes their access immediately. Enable it with the metadata key `enable-oslogin=TRUE` on the project or on individual instances, or enforce it everywhere with an organization policy. OS Login is the recommended approach for organizations.",
   "Many VMs should not have external IP addresses at all, because a public address is an attack surface. To reach them without a bastion host or a virtual private network (VPN), use Identity-Aware Proxy (IAP) TCP forwarding: `gcloud compute ssh web-1 --zone=us-central1-a --tunnel-through-iap`. IAP wraps the SSH connection in HTTPS, checks that the user holds the IAP-secured Tunnel User role (`roles/iap.tunnelResourceAccessor`) on the VM or project, and only then forwards traffic to the VM's internal address. For this to work, your VPC firewall must allow ingress on tcp:22 (or tcp:3389 for Remote Desktop Protocol, RDP) from IAP's source range, 35.235.240.0/20. If users get a connection error after the IAM check passes, the missing firewall rule is the usual culprit. The same technique works for RDP to Windows VMs and for other TCP ports through `gcloud compute start-iap-tunnel`.",
   "OS Login and IAP solve different problems, and they work well together. IAP controls whether you can reach the VM's port without a public IP; OS Login controls whether you can log in once you get there. A well-run project usually has both: no external IPs, an IAP firewall rule, the Tunnel User role for operators, and OS Login roles for the people who need a shell.",
   "When SSH itself is broken, for example after a bad firewall change or a misconfigured SSH daemon, you have two diagnostic tools. Serial port output, read with `gcloud compute instances get-serial-port-output web-1 --zone=us-central1-a`, shows boot messages and kernel logs and is safe to read without enabling anything. The interactive serial console lets you interact with the VM's boot process and login prompt, but it must be enabled with the `serial-port-enable` metadata key, and it should be used carefully because it is a powerful path into the machine."
  ],
  "analogy": "OS Login and IAP together work like an office building with a staffed lobby and badge-controlled rooms. IAP is the lobby desk: you cannot even reach the elevators unless security checks your company badge (your Google identity and Tunnel User role). OS Login is the badge reader on each office door: your badge either opens it or not, and when HR deactivates your badge, every door stops opening at once. Metadata SSH keys are like handing out physical keys that keep working until someone remembers to change the locks.",
  "terms": [
   [
    "OS Login",
    "A feature that ties Linux accounts on VMs to Google identities and controls SSH access with IAM roles."
   ],
   [
    "Compute OS Admin Login",
    "The IAM role that grants OS Login access with sudo privileges; Compute OS Login grants access without sudo."
   ],
   [
    "IAP TCP forwarding",
    "Tunneling SSH, RDP or other TCP traffic through Identity-Aware Proxy to VMs without external IPs."
   ],
   [
    "IAP-secured Tunnel User",
    "The IAM role a user needs to open an IAP TCP forwarding tunnel to a VM."
   ],
   [
    "35.235.240.0/20",
    "The source range IAP TCP forwarding uses, which firewall rules must allow."
   ],
   [
    "Serial console",
    "Interactive access to a VM's serial port for troubleshooting when normal login fails."
   ]
  ],
  "example": "A security team removes all external IPs from their VMs, enables OS Login at the project level and grants the ops group Compute OS Admin Login and IAP-secured Tunnel User. They add one firewall rule allowing tcp:22 from 35.235.240.0/20. Admins now connect with `gcloud compute ssh --tunnel-through-iap`, and when someone leaves the company their access ends as soon as their account is disabled.",
  "mistakes": [
   [
    "You can change a VM's machine type while it is running.",
    "The VM must be stopped first. Stop it, run set-machine-type, then start it."
   ],
   [
    "A stopped VM costs nothing.",
    "Stopping ends vCPU and memory charges, but persistent disks and reserved static IPs are still billed."
   ],
   [
    "Granting IAP-secured Tunnel User is enough for IAP SSH to work.",
    "A firewall rule must also allow ingress on the port from 35.235.240.0/20. Without it the tunnel cannot reach the VM."
   ],
   [
    "To give a VM's users access you should keep adding SSH keys to project metadata.",
    "Metadata keys are hard to audit and are not revoked when someone leaves. OS Login ties access to IAM and to the person's account."
   ]
  ],
  "tryit": [
   [
    "At Cedar Hollow Clinic, an engineer has the IAP-secured Tunnel User role and runs gcloud compute ssh with --tunnel-through-iap, but the command times out trying to connect on port 22. The VM has no external IP, and OS Login is enabled. What is the most likely cause?",
    "The VPC firewall is not allowing ingress on tcp:22 from IAP's range, 35.235.240.0/20. The IAM check passed, but IAP cannot reach the VM. Add a firewall rule for that source range, ideally targeted with a network tag or service account."
   ],
   [
    "A developer needs to log in to a VM to read application logs but should not be able to install packages or change system files. OS Login is enabled. Which role do you grant?",
    "Compute OS Login, not Compute OS Admin Login. The admin role grants sudo, which this user does not need."
   ]
  ],
  "tip": "No external IP and no bastion: IAP TCP forwarding with a firewall rule for 35.235.240.0/20 and the IAP-secured Tunnel User role. Access tied to IAM and removed automatically: OS Login. Changing the machine type requires stopping the VM. Disks grow while running, never shrink.",
  "check": [
   [
    "What must you do before changing a VM's machine type?",
    "Stop the VM, change the type, then start it again."
   ],
   [
    "Which IAM role lets a user connect through IAP TCP forwarding?",
    "IAP-secured Tunnel User, together with a firewall rule allowing 35.235.240.0/20."
   ],
   [
    "Which OS Login role grants sudo access?",
    "Compute OS Admin Login."
   ],
   [
    "What do you still pay for while a VM is stopped?",
    "Its persistent disks and any reserved static IP addresses."
   ]
  ]
 },
 {
  "t": "Snapshots, snapshot schedules, custom images and image families",
  "hook": "It is Tuesday morning at Bluewater Outfitters, and a patch pushed overnight has corrupted the order database disk on a production VM. Kenji, the on-call engineer, asks the obvious question: when was the last backup? Silence. Someone took a snapshot by hand three weeks ago. Meanwhile, the web team wants every new VM to start from the same hardened, patched build, and the finance team wants to clone an entire reporting server, settings and all, into a test project. Snapshots, schedules, images, image families and machine images all sound similar. Which one fits each job, and how do you make sure nobody ever has to ask about the last backup again?",
  "simple": "Compute Engine gives you several ways to save copies of your servers, each for a different purpose. A snapshot is a photo of one disk at a moment in time, used as a backup; after the first photo, later ones only save what changed, so they are cheap. A snapshot schedule takes those photos automatically, like a phone that backs up every night and deletes old backups. A custom image is a master copy of a boot disk that you use to stamp out many identical servers, like a cookie cutter. An image family is a label that always points to the newest master copy. A machine image saves a whole server, every disk plus its settings, so you can clone it completely.",
  "body": [
   "Compute Engine has several ways to capture disks and whole VMs, and each has a different purpose. The exam often describes a need, such as daily backups, identical servers or a full clone, and asks you to pick the right one. The key is to ask two questions: am I protecting data or creating a template, and do I need one disk or the whole VM?",
   "A snapshot is a point-in-time backup of a single persistent disk or Hyperdisk volume. Snapshots are incremental: the first one contains all the data on the disk, and later ones store only the blocks that changed since the previous snapshot, which keeps storage costs low. If you delete an older snapshot, Compute Engine moves any data still needed by newer snapshots, so each remaining snapshot can still be restored on its own. Snapshots are stored in Cloud Storage-backed locations, multi-regional by default or in a region you choose for data residency, and they can be restored to a new disk in any zone or region. That restore ability is also the standard way to move a disk between zones or regions. Create one with `gcloud compute snapshots create web-snap --source-disk=web-1 --source-disk-zone=us-central1-a`, and restore with `gcloud compute disks create web-1-restored --source-snapshot=web-snap --zone=us-east1-b`.",
   "Consistency matters when you snapshot a running disk. You can snapshot a disk while it is attached and in use, but the result is crash-consistent: it looks like a disk from a machine that lost power, which databases can usually recover from but not always cleanly. For application-consistent backups, flush or pause application writes first, or on Windows use the Volume Shadow Copy Service (VSS) option. Compute Engine also offers instant snapshots, which are stored with the disk for very fast in-zone rollback, for example before a risky upgrade, and archive snapshots, which cost less to store and suit long-term retention you rarely restore.",
   "Taking snapshots by hand is how organizations end up with three-week-old backups. A snapshot schedule fixes that. It is a resource policy that creates snapshots automatically on an hourly, daily or weekly schedule, for example daily at 02:00, and deletes them after a retention period such as 14 days. Create it with `gcloud compute resource-policies create snapshot-schedule daily-backup --region=us-central1 --daily-schedule --start-time=02:00 --max-retention-days=14`, then attach it to disks with `gcloud compute disks add-resource-policies web-1 --resource-policies=daily-backup --zone=us-central1-a`. A schedule lives in a region and can be attached to disks in that region. This is the no-scripting way to back up VMs. For centralized, policy-based backups with reporting across many VMs, databases and other resources, Google also offers the Backup and DR service.",
   "A custom image is a different tool with a different goal: it is a boot disk template. You create one from a disk, a snapshot, another image or a file in Cloud Storage, typically after installing your software and hardening the operating system, and then create many VMs or instance templates from it. Creating an image from a running VM's boot disk is possible with a force flag, but stopping the VM first gives a cleaner image. Images are global resources, and they can be shared with other projects by granting the Compute Image User role, which is how a central team publishes a golden image to the whole organization.",
   "Image families make golden images manageable over time. When you create an image, you can assign it to a family, such as web-base. Instance templates and gcloud commands can reference the family instead of a specific image name, so new VMs automatically use the newest non-deprecated image in that family. When you publish a patched build next month, nothing else needs to change. If the new image turns out to be bad, you deprecate it with `gcloud compute images deprecate`, and the family falls back to the previous image. Google's public images, such as Debian or Ubuntu, are organized the same way, which is why you usually specify an image family when creating a VM.",
   "A machine image captures an entire VM: its configuration, including machine type, metadata, labels, network settings and service account, and the data on all of its attached disks. It is the right tool for cloning a complete multi-disk VM, or for backing up a VM together with its settings so it can be recreated exactly. The contrast to remember is that an image contains only one disk and is meant as a template for new VMs, while a machine image contains the whole VM.",
   "Putting it together, a sensible operations design uses all of these. Snapshot schedules protect data on every production disk. Custom images in an image family give every new VM the same tested starting point. Machine images handle the occasional full clone. And when a disk needs to move to another region, a snapshot is the bridge."
  ],
  "analogy": "Think of a bakery. A snapshot is a photo of today's display case, used to prove what was there and rebuild it if something spills; later photos only record what changed. A snapshot schedule is the camera set to take that photo every night and throw away photos older than two weeks. A custom image is the cookie cutter, and an image family is the hook on the wall where the newest cutter always hangs. A machine image is a copy of the whole kitchen setup. The analogy stops at incremental storage: deleting an old photo would lose detail, but deleting an old snapshot does not break newer ones.",
  "terms": [
   [
    "Snapshot",
    "An incremental, point-in-time backup of one disk that can be restored to a new disk in any zone or region."
   ],
   [
    "Snapshot schedule",
    "A resource policy that creates and deletes disk snapshots automatically on a schedule."
   ],
   [
    "Crash-consistent",
    "A backup state like a sudden power loss; application-consistent backups flush writes first."
   ],
   [
    "Custom image",
    "A boot disk template made from your own disk, snapshot or image, used to create identical VMs."
   ],
   [
    "Image family",
    "A group of images where references to the family resolve to the newest non-deprecated image."
   ],
   [
    "Machine image",
    "A capture of a whole VM, including its configuration and all its disks."
   ]
  ],
  "example": "An operations team attaches a daily snapshot schedule with 14-day retention to every production disk. Each month they build a patched, hardened custom image in the family web-base, and their instance templates reference the family so new VMs always start from the latest build. When one month's image breaks a library, they deprecate it and new VMs automatically use the previous month's image while they fix it.",
  "mistakes": [
   [
    "Every snapshot is a full copy, so frequent snapshots are expensive.",
    "Snapshots are incremental. After the first, each stores only changed blocks."
   ],
   [
    "A custom image is the best way to back up a server's data every night.",
    "Images are templates for new VMs. Regular backups of data are snapshots, ideally on a snapshot schedule."
   ],
   [
    "An image captures the whole VM, including all disks and the machine type.",
    "An image covers one disk. A machine image captures the full VM configuration and all disks."
   ],
   [
    "To move a disk to another region you change its zone setting.",
    "You snapshot the disk and create a new disk from the snapshot in the target region."
   ]
  ],
  "tryit": [
   [
    "Bluewater Outfitters wants every web server created by its managed instance group to use the latest hardened build, without editing the instance template each month. They also want an easy way to back out a bad build. What should they set up?",
    "Publish each build as a custom image in an image family and have the instance template reference the family. New VMs then use the newest image automatically, and deprecating a bad image makes the family resolve to the previous one."
   ],
   [
    "A finance reporting VM has three disks and specific metadata and network settings. The team wants an exact copy in a test environment. Which capture method fits best?",
    "A machine image, because it captures the whole VM configuration and all its disks. Snapshots or images would require rebuilding the configuration by hand."
   ]
  ],
  "tip": "Backup of a disk: snapshot. Automatic backups without scripts: snapshot schedule. Template for many identical VMs: custom image in an image family. Whole VM with its settings: machine image. Move a disk across regions: snapshot, then new disk.",
  "check": [
   [
    "Why are successive snapshots of the same disk cheaper than the first?",
    "They're incremental, storing only blocks that changed since the previous snapshot."
   ],
   [
    "How can you move a disk's data to another region?",
    "Take a snapshot and create a new disk from it in the target region."
   ],
   [
    "What happens to VMs created from an image family when you deprecate the newest image?",
    "New VMs use the previous non-deprecated image in the family."
   ],
   [
    "Which feature takes and expires snapshots automatically?",
    "A snapshot schedule, a resource policy attached to disks."
   ]
  ]
 },
 {
  "t": "Managing GKE: scaling Deployments, node pool autoscaling, rollouts and rollbacks, and cluster upgrades",
  "hook": "It is the first evening of the spring sale at Maple Lane Market, and Rosa is watching the checkout service on a GKE dashboard. Traffic triples in twenty minutes. The Horizontal Pod Autoscaler asks for more pods, but a dozen of them sit in Pending. An hour later a new release goes out with a bug, and payment errors start climbing. Then a notice arrives that the cluster is due for a version upgrade this week. Pods, nodes, rollouts and upgrades all need attention at once. Which layer is out of capacity, which command undoes a bad release in seconds, and how do you keep upgrades from landing in the middle of the sale?",
  "simple": "Google Kubernetes Engine (GKE) runs your apps in small packages called pods, and the pods run on servers called nodes. Think of nodes as tables in a restaurant and pods as groups of diners. When more diners arrive, you can seat more groups (more pods), but if every table is full, new groups have to wait until you bring in more tables (more nodes). GKE can do both automatically. When you release a new version of your app, Kubernetes swaps old pods for new ones a few at a time, and if the new version is broken, one command switches back. Google also keeps the cluster's software up to date, and you choose how fast and when those updates happen.",
  "body": [
   "Running Google Kubernetes Engine (GKE) means managing two layers of capacity: pods and nodes. Pods are the units that run your containers, and nodes are the virtual machines (VMs) the pods run on. Keep the two layers straight, because exam distractors deliberately mix them up, for example offering the cluster autoscaler when the question is about the number of replicas, or the Horizontal Pod Autoscaler when nodes are full.",
   "At the pod layer, you scale a Deployment manually with `kubectl scale deployment/web --replicas=8`, which is fine for a planned event. To scale automatically, create a Horizontal Pod Autoscaler (HPA), for example `kubectl autoscale deployment web --cpu-percent=60 --min=2 --max=20`. The HPA watches a metric, such as average CPU utilization compared with the pods' CPU requests, memory, or custom and external metrics from Cloud Monitoring, and changes the number of pod replicas to keep the metric near the target. The HPA only works well if your pods declare resource requests, because utilization is measured against them. The Vertical Pod Autoscaler (VPA) is different: it recommends or sets pod CPU and memory requests, making each pod bigger or smaller, rather than changing the replica count.",
   "At the node layer in a Standard cluster, the cluster autoscaler adds nodes when pods are Pending because no node has room for them, and removes nodes that have been underused for a while once their pods can be moved elsewhere. It decides based on pod resource requests, not on live CPU usage. You enable it per node pool with minimum and maximum sizes: `gcloud container clusters update prod --enable-autoscaling --node-pool=default-pool --min-nodes=1 --max-nodes=10 --region=us-central1`. You can also resize a pool manually with `gcloud container clusters resize prod --node-pool=default-pool --num-nodes=5 --region=us-central1`. Node auto-provisioning goes a step further and creates new node pools automatically with machine types that fit pending pods. In Autopilot clusters, Google manages nodes entirely and you pay for pod resource requests, so node scaling is handled for you. One rule worth remembering: do not configure autoscaling on the Compute Engine managed instance groups behind GKE node pools directly; use GKE's own settings.",
   "Updating an application is a rollout. Change the image with `kubectl set image deployment/web web=REPO/web:2.0` or by applying updated YAML, and Kubernetes creates a new ReplicaSet and gradually shifts pods to it according to the Deployment's rolling update strategy. `maxSurge` sets how many extra pods may be created above the desired count during the rollout, and `maxUnavailable` sets how many may be missing. Readiness probes matter here, because a new pod receives traffic only once it reports ready. Watch progress with `kubectl rollout status deployment/web`, list past versions with `kubectl rollout history deployment/web`, and if the new version misbehaves, `kubectl rollout undo deployment/web` returns to the previous revision, or `--to-revision=3` returns to a specific one. Undo is fast because the old ReplicaSet still exists.",
   "Clusters themselves need upgrades, and GKE automates most of the work. Google upgrades the control plane automatically. Nodes are upgraded automatically when node auto-upgrade is enabled, which is the default and is required in Autopilot. Release channels decide how quickly new Kubernetes versions arrive: Rapid gets them first, Regular is the default balance, and Stable waits longest for proven versions. Maintenance windows define when automatic upgrades may happen, such as weekends at night, and maintenance exclusions block upgrades during a period such as a holiday sale. You can also upgrade manually with `gcloud container clusters upgrade`.",
   "Upgrades replace nodes, so protecting availability during that process is part of the job. Surge upgrades create a few new nodes, drain old ones, and repeat, controlled by settings for maximum surge and maximum unavailable nodes; blue-green node upgrades are an alternative that keeps the old pool until the new one is verified. PodDisruptionBudgets (PDBs) tell Kubernetes how many replicas of an app must stay available while nodes are drained, so an upgrade cannot take down every replica at once. Node auto-repair, also on by default, recreates nodes that repeatedly fail health checks.",
   "To see what is happening, start with `kubectl get pods` to spot Pending or CrashLoopBackOff states, then `kubectl describe pod NAME` to read events such as 'FailedScheduling: 0/3 nodes are available: insufficient cpu', which tells you the node layer is full. The GKE pages in the Google Cloud console show workloads, events, logs from Cloud Logging and metrics from Cloud Monitoring, and they surface upgrade notifications and recommendations.",
   "A useful mental flow for exam scenarios: if the question is about more copies of the app, think HPA or kubectl scale. If pods are Pending for lack of room, think cluster autoscaler or node pool resize. If a release went wrong, think rollout undo. If the concern is when or how fast versions change, think release channels, maintenance windows and exclusions."
  ],
  "analogy": "Picture a restaurant on a busy night. The HPA is the host who seats more parties of diners (pods) when the line grows. The cluster autoscaler is the manager who brings in extra tables (nodes) when every table is taken and parties are waiting at the door, and stacks tables away when the room empties. A rollout is swapping the menu one table at a time, and rollout undo is handing back the old menus. The analogy breaks slightly because the cluster autoscaler looks at reserved seats (pod requests), not how much diners actually eat.",
  "terms": [
   [
    "Horizontal Pod Autoscaler",
    "Kubernetes object that changes a workload's number of pod replicas based on metrics."
   ],
   [
    "Vertical Pod Autoscaler",
    "Recommends or sets pod CPU and memory requests instead of changing replica counts."
   ],
   [
    "Cluster autoscaler",
    "GKE feature that adds or removes nodes in a node pool based on pending pods and utilization."
   ],
   [
    "kubectl rollout undo",
    "Reverts a Deployment to its previous revision, or to a chosen one with --to-revision."
   ],
   [
    "Release channel",
    "A GKE setting (Rapid, Regular, Stable) that controls how quickly a cluster receives new Kubernetes versions."
   ],
   [
    "PodDisruptionBudget",
    "A Kubernetes object that limits how many replicas can be down during voluntary disruptions such as node upgrades."
   ]
  ],
  "example": "During a sale, a retailer's HPA scales the checkout Deployment from 4 to 30 pods. Several go Pending, so the cluster autoscaler adds nodes to the pool within minutes. After a buggy release later that day, the on-call engineer runs `kubectl rollout undo deployment/checkout` and error rates return to normal. Before next year's sale, the team adds a maintenance exclusion so no automatic upgrade can happen that week.",
  "mistakes": [
   [
    "The HPA adds nodes when the cluster is full.",
    "The HPA changes pod replicas only. The cluster autoscaler adds nodes when pods are Pending for lack of room."
   ],
   [
    "To scale GKE nodes, configure autoscaling on the underlying managed instance group.",
    "Use GKE node pool autoscaling or resize. Changing the instance group directly conflicts with GKE's management."
   ],
   [
    "Rolling back a bad release requires rebuilding the old container image.",
    "kubectl rollout undo returns to the previous ReplicaSet, which still references the old image."
   ],
   [
    "Choosing the Stable release channel disables automatic upgrades.",
    "Release channels set how fast versions arrive. Upgrades still happen; maintenance windows and exclusions control when."
   ]
  ],
  "tryit": [
   [
    "At Maple Lane Market, kubectl describe on a Pending pod shows 'FailedScheduling: insufficient cpu' on all three nodes. The HPA has already raised replicas to 30. The cluster is Standard mode with autoscaling off. What should Rosa do?",
    "Enable the cluster autoscaler on the node pool with a suitable maximum, or resize the pool manually right now. The bottleneck is node capacity, not pod count, so changing the HPA would not help."
   ],
   [
    "A payments team worries that an automatic node upgrade could drain every replica of their service at once during business hours. Which two settings address this?",
    "A maintenance window to restrict upgrades to quiet hours, and a PodDisruptionBudget so draining nodes never takes too many replicas down at once. A maintenance exclusion can also block upgrades during critical periods."
   ]
  ],
  "tip": "More pods: kubectl scale or HPA. More nodes: cluster autoscaler or resize the node pool. Bad release: kubectl rollout undo. Version speed: release channel. Upgrade timing: maintenance windows and exclusions. Don't autoscale GKE's underlying instance groups directly.",
  "check": [
   [
    "Pods are stuck in Pending because nodes are full. Which feature adds nodes automatically?",
    "The cluster autoscaler, enabled on the node pool (or Autopilot, which does it for you)."
   ],
   [
    "Which command shows a Deployment's previous revisions?",
    "`kubectl rollout history deployment/NAME`."
   ],
   [
    "What is the difference between the HPA and the VPA?",
    "The HPA changes the number of replicas; the VPA changes each pod's CPU and memory requests."
   ],
   [
    "Which setting prevents automatic upgrades during a holiday sale?",
    "A maintenance exclusion."
   ]
  ]
 },
 {
  "t": "Managing Cloud Run: revisions, traffic splitting, minimum and maximum instances",
  "hook": "It is release day at Northgate Savings, and Theo has a new version of the account-balance API ready on Cloud Run. Last month a release went straight to every customer and broke the mobile app for an hour. This time the product owner wants proof the new version works before anyone sees it, then a slow ramp. Meanwhile, support has complaints that the first request each morning takes several seconds, and the database team warns that a traffic spike last week opened more connections than the database can handle. Three problems, one service. How do revisions, traffic splitting and instance limits let Theo fix all three without a single rebuild?",
  "simple": "Cloud Run runs your app in containers and adds or removes copies automatically as visitors come and go. Every time you deploy, Cloud Run saves that version as a revision, a snapshot that never changes, so you can always go back. You can send a small share of visitors to a new version, say 10 percent, and the rest to the old one, like testing a new recipe on a few tables before changing the whole menu. You can also set a minimum number of copies that stay awake, so the first visitor of the day does not wait while one starts up, and a maximum so a rush does not overwhelm the database behind your app.",
  "body": [
   "Every deployment to a Cloud Run service creates a new immutable revision, named something like web-00007-abc. Immutable means the revision's container image and settings never change after it is created; changing an environment variable, memory limit or secret reference also creates a new revision. Because older revisions are kept, you can send traffic back to an earlier one at any time. By default, a new revision receives 100 percent of traffic as soon as it starts and passes its health check, which is convenient but means every user sees the new code at once.",
   "Traffic splitting is how you release gradually instead. First deploy the new revision without sending it any traffic: `gcloud run deploy web --image=REGION-docker.pkg.dev/PROJECT/repo/web:2.0 --region=us-central1 --no-traffic --tag=green`. The tag gives the revision its own URL, formed from the tag, three hyphens and the service's hostname, so testers and automated checks can reach it while customers still use the old version. When you are confident, shift a share of traffic: `gcloud run services update-traffic web --region=us-central1 --to-revisions=web-00007-abc=10,web-00006-def=90` creates a 10 percent canary. Watch error rates and latency, increase the percentage in steps, and finally run `gcloud run services update-traffic web --to-latest` to send everything to the newest revision and keep following future deployments.",
   "Rolling back is just another traffic change. If the canary misbehaves, send 100 percent of traffic to the previous revision with `update-traffic --to-revisions=web-00006-def=100`, or use the Manage traffic option on the service's Revisions tab in the console. There is no rebuild and no redeploy, because the old revision is still there, ready to serve. This is the Cloud Run answer to 'how do we roll back quickly' on the exam. It also explains why teams avoid sending all traffic with --to-latest during a risky release: pinning traffic to named revisions keeps each change deliberate, and a later deployment cannot silently take over the traffic.",
   "Scaling is automatic, but you set its limits, and each limit solves a specific problem. Maximum instances caps how many container instances can run at once. That protects downstream systems, such as a Cloud SQL database with a limited connection pool, and puts a ceiling on cost; requests beyond what the capped instances can handle wait briefly and may be rejected if capacity does not free up. Minimum instances keeps a number of instances warm even when there is no traffic. That reduces cold-start latency, which is the delay while Cloud Run starts a new instance, pulls the container and runs your initialization code, at the cost of paying for those idle instances. With minimum instances at zero, a service that gets no traffic scales to zero and costs nothing for compute.",
   "Concurrency is the third scaling setting and is easy to overlook. It sets how many requests one instance handles at the same time; the default is 80. Higher concurrency means fewer instances for the same traffic, which saves money and database connections. Setting concurrency to 1 suits code that is not thread-safe or that uses a lot of memory per request, but it increases the number of instances needed and therefore cost and cold starts. When you size maximum instances to protect a database, remember that total possible connections roughly equal maximum instances times the connections each instance opens.",
   "Other settings you will adjust on a service include CPU and memory per instance, the request timeout, environment variables, secrets mounted from Secret Manager, and the service account the service runs as, which should be a dedicated, least-privilege account rather than the default compute service account. Billing mode also matters. With request-based billing, CPU is allocated only while a request is being processed, which is cheapest for typical web traffic. With instance-based billing, sometimes described as CPU always allocated, instances keep CPU between requests, which suits background work such as finishing tasks after the response is sent, and is often paired with minimum instances.",
   "To observe a service, the Cloud Run console shows request counts, latencies, container instance counts, CPU and memory use, and logs, and you can filter metrics by revision to compare a canary with the stable version. `gcloud run services describe web --region=us-central1` shows the current traffic split and tags, and `gcloud run revisions list --service=web --region=us-central1` shows all revisions with their creation times. Request logs in Cloud Logging include the revision name, which helps when tracing which version produced an error."
  ],
  "analogy": "Revisions and traffic splitting work like a radio station's playlists. Each revision is a saved playlist that never changes, and the traffic split is the mixing board deciding how much airtime each playlist gets. To test a new playlist, you play it for a small share of listeners; if they complain, you slide the fader back. Minimum instances are DJs kept on standby in the booth so nobody hears dead air. The analogy stops at payment: standby DJs on Cloud Run are billed even when idle.",
  "terms": [
   [
    "Revision",
    "An immutable version of a Cloud Run service created by each deployment or configuration change."
   ],
   [
    "Traffic split",
    "Percentages of requests sent to different revisions of one service."
   ],
   [
    "Revision tag",
    "A label that gives a revision its own URL for testing, even with no traffic."
   ],
   [
    "Minimum instances",
    "A setting that keeps instances warm to reduce cold starts, billed while idle."
   ],
   [
    "Maximum instances",
    "A cap on concurrent container instances that limits cost and protects downstream systems."
   ],
   [
    "Concurrency",
    "The number of requests a single instance handles at once; the default is 80."
   ],
   [
    "Cold start",
    "The delay when Cloud Run starts a new container instance to handle a request."
   ]
  ],
  "example": "A bank's API team deploys a new revision with --no-traffic and a green tag, runs tests against its tagged URL, then sends 5 percent of traffic to it. After an hour of clean error metrics they move to 50 percent and then 100 percent. They keep minimum instances at 2 so customers never hit a cold start during business hours, and set maximum instances to 20 so the service can never open more database connections than Cloud SQL allows.",
  "mistakes": [
   [
    "To roll back a Cloud Run service you must rebuild and redeploy the old image.",
    "Old revisions are kept. Move 100 percent of traffic back to the previous revision; no rebuild is needed."
   ],
   [
    "Minimum instances limit cost and protect the database.",
    "Minimum instances reduce cold starts and add idle cost. Maximum instances cap cost and protect downstream systems."
   ],
   [
    "A canary on Cloud Run requires two separate services behind a load balancer.",
    "Traffic splitting between revisions of the same service handles canaries natively."
   ],
   [
    "Setting concurrency to 1 makes the service cheaper.",
    "Concurrency 1 means one request per instance, so more instances are needed. It suits non-thread-safe code, not cost savings."
   ]
  ],
  "tryit": [
   [
    "Northgate Savings' Cloud Run API opens 10 database connections per instance, and its Cloud SQL instance supports about 200 connections for this app. During a spike the service scaled to 40 instances and the database refused connections. What setting should Theo change, and to roughly what value?",
    "Set maximum instances so instances times connections stays under the limit, about 20 or slightly lower to leave headroom. Maximum instances is the control that protects downstream systems."
   ],
   [
    "A team wants testers to try a new revision for a day without any customer traffic reaching it. How do they deploy it?",
    "Deploy with --no-traffic and a --tag, then share the tagged URL. Customers keep using the current revision until traffic is shifted."
   ]
  ],
  "tip": "Gradual release on Cloud Run is traffic splitting between revisions of the same service, often with --no-traffic and a tag first. Rollback is a traffic change. Slow first request is fixed with minimum instances; protecting a database is done with maximum instances.",
  "check": [
   [
    "How do you roll back a Cloud Run service to the previous version?",
    "Send 100% of traffic to the previous revision with gcloud run services update-traffic (or the console)."
   ],
   [
    "What's the trade-off of setting minimum instances above zero?",
    "Fewer cold starts, but you pay for those instances even when there is no traffic."
   ],
   [
    "What does the --no-traffic flag do on gcloud run deploy?",
    "It creates the new revision without sending it any traffic, so you can test it first, usually through a tag URL."
   ],
   [
    "Which setting controls how many requests one instance handles at the same time?",
    "Concurrency, which defaults to 80."
   ]
  ]
 },
 {
  "t": "Managing Cloud Storage objects with gcloud storage and moving data with Storage Transfer Service",
  "hook": "It is Wednesday at Riverbend Studios, and Amara has two requests on her desk. The editors want a simple way to push finished video projects from their workstations to Cloud Storage every evening, without re-uploading files that have not changed. The head of engineering wants 400 terabytes of archived footage moved from another cloud provider's object storage into Cloud Storage, followed by a nightly copy of anything new, with a report of every failure. Someone suggests writing a shell script with a loop. Someone else suggests shipping hard drives. Which tool fits each job, and where does a script stop being a good idea?",
  "simple": "Cloud Storage keeps files, called objects, inside containers called buckets. The `gcloud storage` command lets you list, copy, move and delete those files from a terminal, a bit like managing folders on your own computer. There is a command that keeps a bucket matched to a folder, copying only what changed, like a backup app that skips files it already has. For big moves, such as copying a huge library of files from another cloud every night, Google offers Storage Transfer Service, a managed mover you schedule and then let it run. When the amount of data is so large that the internet would take weeks, Google can mail you a physical storage device called Transfer Appliance.",
  "body": [
   "The `gcloud storage` command group is the current command-line interface (CLI) for Cloud Storage and replaces most uses of the older `gsutil` tool. It is faster for large jobs because it parallelizes transfers automatically, and it follows the same patterns as the rest of gcloud. Buckets and objects are addressed with gs:// URLs, such as gs://my-bucket/reports/jan.csv.",
   "A handful of commands cover daily work. `gcloud storage ls gs://my-bucket` lists objects, and adding `--recursive` or a wildcard lists deeper prefixes. `gcloud storage cp report.csv gs://my-bucket/reports/` uploads a file, and reversing the arguments downloads it. `gcloud storage cp -r ./site gs://my-bucket` copies a whole local folder. `gcloud storage mv` moves or renames objects, which under the hood is a copy followed by a delete. `gcloud storage rm gs://my-bucket/old/**` deletes everything under a prefix, where the double asterisk matches across slashes. `gcloud storage rsync ./projects gs://my-bucket/projects --recursive` synchronizes a directory with a bucket prefix, copying only new or changed files, and with `--delete-unmatched-destination-objects` it also removes objects that no longer exist at the source, so use that flag carefully. `gcloud storage cat` prints a small object, and `gcloud storage du` shows how much space a prefix uses.",
   "You also manage storage classes and bucket settings from the CLI. You can change one object's storage class by rewriting it, for example `gcloud storage objects update gs://my-bucket/file --storage-class=COLDLINE`. For many objects, an Object Lifecycle Management rule is better, because it moves or deletes objects automatically based on age or other conditions, with no script to maintain. Bucket-level settings are managed with `gcloud storage buckets update`: change the default storage class, add labels, set a retention policy, or enable Object Versioning with `--versioning`. Changing a bucket's default class affects only objects written after the change; existing objects keep their class unless they are rewritten or a lifecycle rule changes them.",
   "Two facts about how Cloud Storage works explain a lot of its behavior. First, Cloud Storage has no real folders. A name such as reports/2026/jan.csv is a single flat object name that happens to contain slashes, and the console simply displays the slashes as folders. That is why renaming a 'folder' means rewriting every object under it, unless the bucket uses the optional hierarchical namespace feature. Second, objects are immutable. You cannot edit part of an object in place; an update writes a whole new object, or a new noncurrent version if versioning is on.",
   "For large or recurring transfers, Storage Transfer Service is the managed choice. It copies data into Cloud Storage from other clouds, such as Amazon Simple Storage Service (Amazon S3) and Azure Blob Storage, from lists of HTTP or HTTPS URLs, from other Cloud Storage buckets, and from on-premises file systems using transfer agents you install on machines in your data center. You create a transfer job in the console or with `gcloud transfer jobs create`, and it can run once or on a schedule. Options let it copy only new or changed files, overwrite or skip existing objects, delete source files after a successful transfer, or delete destination objects that are not at the source. Jobs retry failures, report progress and errors, and write logs, which is exactly what a hand-written loop lacks. That makes Storage Transfer Service the right answer for moving terabytes from another cloud or keeping two buckets in sync nightly. It needs permissions: the service uses a Google-managed service agent that must be able to read the source and write to the destination bucket, and for other clouds you supply credentials or a federated identity.",
   "Sometimes the network is the bottleneck. For very large datasets with limited bandwidth, Transfer Appliance is a physical storage device that Google ships to you. You copy data onto it in your data center, ship it back, and Google uploads it to your bucket. As a rough rule, if uploading over your connection would take weeks or more, consider the appliance. Data on the appliance is encrypted, so a lost shipment does not expose the contents.",
   "BigQuery Data Transfer Service is a different product that is easy to confuse with the others because of its name. It loads data into BigQuery, not Cloud Storage, from sources such as Google advertising and marketing products, some software as a service (SaaS) applications and other clouds, and it also runs scheduled queries. On the exam, the destination is the giveaway: into Cloud Storage points to gcloud storage, Storage Transfer Service or Transfer Appliance, and into BigQuery from a SaaS source points to BigQuery Data Transfer Service.",
   "A simple decision path helps. A developer copying files or syncing a folder uses `gcloud storage`. A scheduled, monitored, large or cross-cloud copy uses Storage Transfer Service. A data volume the network cannot carry in a reasonable time uses Transfer Appliance."
  ],
  "analogy": "Moving data is like moving house. `gcloud storage cp` and `rsync` are carrying boxes in your own car: perfect for a few trips. Storage Transfer Service is hiring a moving company with a schedule, insurance and an inventory list, the right call for a whole house or a weekly delivery. Transfer Appliance is renting a shipping container that a truck collects when the roads are too slow for anything else. The analogy weakens on cost: hiring the mover for a single small box is unnecessary, but it is not wrong.",
  "terms": [
   [
    "gcloud storage",
    "The current gcloud command group for managing buckets and objects, replacing most uses of gsutil."
   ],
   [
    "gcloud storage rsync",
    "A command that makes a bucket prefix match a local directory or another location, copying only changes."
   ],
   [
    "Object Lifecycle Management",
    "Bucket rules that change storage class or delete objects automatically based on conditions such as age."
   ],
   [
    "Storage Transfer Service",
    "A managed service for copying data into Cloud Storage from other clouds, URLs, buckets or on-premises."
   ],
   [
    "Transfer Appliance",
    "A physical device shipped by Google for offline transfer of very large datasets."
   ],
   [
    "BigQuery Data Transfer Service",
    "A service that loads data into BigQuery from SaaS and other sources on a schedule."
   ]
  ],
  "example": "A media company sets up a Storage Transfer Service job that copies new files from an Amazon S3 bucket to Cloud Storage every night at 01:00 and deletes nothing at the source. Their editors use `gcloud storage rsync` to push finished projects from a workstation to a bucket, and a lifecycle rule moves projects older than 90 days to Coldline.",
  "mistakes": [
   [
    "Changing a bucket's default storage class moves all existing objects to the new class.",
    "It only affects new objects. Existing objects change class only when rewritten or by a lifecycle rule."
   ],
   [
    "A shell script looping over gcloud storage cp is the best way to copy terabytes from another cloud nightly.",
    "Storage Transfer Service is managed, scheduled, retries failures and reports errors. Scripts are fragile at that scale."
   ],
   [
    "BigQuery Data Transfer Service can move files from Amazon S3 into a Cloud Storage bucket.",
    "BigQuery Data Transfer Service loads into BigQuery. For Cloud Storage destinations use Storage Transfer Service."
   ],
   [
    "Renaming a folder in Cloud Storage is a single quick operation.",
    "Folders are just name prefixes in a flat namespace, so renaming means rewriting every object under the prefix (unless hierarchical namespace is enabled)."
   ]
  ],
  "tryit": [
   [
    "Riverbend Studios has 400 TB in another cloud's object storage and a fast internet connection between the two providers. They want the initial copy plus a nightly copy of new files, with error reporting. What should Amara use?",
    "Storage Transfer Service with a scheduled job that copies only new or changed files. It supports other clouds as sources, runs on a schedule and reports failures. Transfer Appliance is for data in your own location with limited bandwidth."
   ],
   [
    "A small office has 300 TB on local file servers and an internet link that would need months to upload it. What is the best first step?",
    "Order Transfer Appliance, load the data, and ship it back. Afterward, ongoing changes can be copied with Storage Transfer Service agents or gcloud storage."
   ]
  ],
  "tip": "Other cloud to Cloud Storage, scheduled and managed: Storage Transfer Service. Hundreds of terabytes over a slow link: Transfer Appliance. Into BigQuery from SaaS: BigQuery Data Transfer Service. Sync a local folder: gcloud storage rsync.",
  "check": [
   [
    "Which command lists the objects in gs://logs-bucket?",
    "`gcloud storage ls gs://logs-bucket`."
   ],
   [
    "Does changing a bucket's default storage class change existing objects?",
    "No. It applies to new objects; existing objects keep their class unless rewritten or changed by a lifecycle rule."
   ],
   [
    "Which service copies data from Azure Blob Storage to Cloud Storage on a schedule?",
    "Storage Transfer Service."
   ],
   [
    "What does gcloud storage rsync do differently from cp -r?",
    "It copies only new or changed files so the destination matches the source, and can optionally delete extra destination objects."
   ]
  ]
 },
 {
  "t": "Operating databases: Cloud SQL backups, high availability and read replicas, and BigQuery dry runs",
  "hook": "It is 4:15 p.m. on a Friday at Granite Peak Outdoor, and a developer has just run a DELETE statement against the production orders table without a WHERE clause. Thousands of rows are gone. Your Cloud SQL instance has high availability, and someone in the chat says, 'We're fine, it will fail over.' At the same moment, an analyst pings you about a BigQuery report that might scan several terabytes and asks whether it will blow the monthly budget. High availability, backups, replicas and query cost all sound like safety nets. Which one actually brings back those orders, and how do you know what a query costs before you run it?",
  "simple": "Cloud SQL is a database that Google runs for you, but you still choose how it is protected. Backups are saved copies you can restore from, and point-in-time recovery lets you rewind to a specific minute, like an undo button for the whole database. High availability keeps a spare copy in another building that takes over if the first one fails, but it copies mistakes too, so it cannot undo a deleted table. Read replicas are extra copies that answer read-only questions so the main database is less busy. BigQuery charges by how much data a query reads, so a dry run shows the size of the bill before you run it, like checking the price tag first.",
  "body": [
   "Cloud SQL handles much of database administration for you, such as patching and hardware, but you choose and configure the protection features. The exam tests whether you can match each feature to the failure it protects against, so it helps to think in terms of three different problems: a zone goes down, someone makes a mistake, and the database is too busy.",
   "Backups and point-in-time recovery (PITR) cover mistakes. Automated backups run daily during a backup window you choose and are kept for a configurable number of days or backups. You can also take an on-demand backup right before a risky change, such as a schema migration, with `gcloud sql backups create --instance=orders-db`. PITR adds transaction logs, binary logs for MySQL and write-ahead logs for PostgreSQL, so you can restore the database to a specific moment, for example one minute before a bad DELETE. In practice you clone the instance to a timestamp with `gcloud sql instances clone orders-db orders-db-restore --point-in-time='2026-10-02T16:14:00Z'`, verify the data, and then copy the missing rows back or switch the application over. Restores go to a new or existing instance and take time; they are not instant failover, and restoring over an existing instance overwrites its current data.",
   "High availability (HA), also called the regional configuration, covers zone failures. An HA instance runs a primary in one zone and a standby in another zone of the same region, with synchronous replication of the storage, so every committed write exists in both zones. If the primary or its zone fails, Cloud SQL fails over automatically to the standby, and clients keep using the same IP address after a short interruption while connections are reestablished, so applications should retry failed connections. The standby does not serve reads; it exists only to take over. Because replication is synchronous, HA faithfully copies mistakes too: a dropped table is dropped on the standby at the same instant. HA protects against infrastructure failures, while backups and PITR protect against human and application errors, and production databases usually need both.",
   "Read replicas cover the 'too busy' problem. A read replica is a copy of the primary that receives asynchronous replication and serves read-only queries, so you can point reporting tools, dashboards or read-heavy parts of your application at it and reduce load on the primary. Because replication is asynchronous, replicas can lag slightly behind, which matters for code that reads immediately after writing. Create one with `gcloud sql instances create orders-replica --master-instance-name=orders-db`. Cross-region replicas also support disaster recovery: if an entire region is lost, you can promote a replica in another region to a standalone primary. Promotion is a manual, one-way action; the promoted instance stops replicating and becomes independent. Replicas require the primary to have automated backups enabled, and for MySQL, binary logging as well.",
   "Several other operations come up regularly. Connect securely with the Cloud SQL Auth Proxy or the Cloud SQL language connectors, which authenticate with IAM and encrypt traffic, so you do not need to manage SSL certificates or add client IP addresses to authorized networks. Use private IP so the instance has an address in your Virtual Private Cloud (VPC) network and is not reachable from the internet. Scaling up the machine type, adding vCPUs or memory, requires a restart, so schedule it. Storage can grow automatically when the automatic storage increase setting is on, but it cannot shrink. Maintenance windows let you choose when Google applies updates that need a restart.",
   "In BigQuery, the main operational concern is cost and control rather than servers. With on-demand pricing you pay by the number of bytes a query processes, so a careless query over a large table can be expensive. Before running a large query, perform a dry run: `bq query --use_legacy_sql=false --dry_run 'SELECT order_id, total FROM sales.orders WHERE order_date = \"2026-10-01\"'`. It validates the query and reports how many bytes it would process, without running it or charging for it. In the console, the query validator in the editor shows the same estimate, for example 'This query will process 1.2 GB when run.' You can turn the bytes estimate into a cost estimate with the pricing calculator.",
   "Reducing bytes processed is mostly about reading less data. BigQuery stores data by column, so select only the columns you need instead of `SELECT *`. Filter on the partitioning column of a partitioned table so BigQuery can skip whole partitions, and use clustering so filters on clustered columns read fewer blocks. Adding LIMIT does not reduce bytes scanned for a normal table, because BigQuery still reads the columns before trimming the output, and the dry run will show the same estimate with or without it. For guardrails, set a maximum bytes billed limit on a query or job, which makes it fail instead of running if it would exceed the limit, and use custom quotas to cap how much a project or user can query per day."
  ],
  "analogy": "Think of your database as an important notebook. High availability is a carbon-copy sheet underneath: if the top page is ruined by a spilled coffee, the copy is ready, but if you write something wrong, the mistake appears on both sheets. Backups with point-in-time recovery are dated photocopies plus a log of every edit, so you can rebuild the notebook as it was at 4:14 p.m. Read replicas are photocopies handed to readers so they stop crowding your desk. The analogy stops at timing: replicas are updated a moment later than the original, while the carbon copy is instant.",
  "terms": [
   [
    "Point-in-time recovery",
    "Restoring a database to a specific moment using backups plus transaction logs."
   ],
   [
    "Cloud SQL high availability",
    "A primary and a standby in different zones of a region with synchronous replication and automatic failover."
   ],
   [
    "Read replica",
    "An asynchronously updated copy that serves read-only traffic and can be promoted manually."
   ],
   [
    "Cloud SQL Auth Proxy",
    "A client that connects to Cloud SQL using IAM authorization and encrypted traffic without managing certificates or IP allowlists."
   ],
   [
    "Dry run",
    "A BigQuery query validation that reports bytes to be processed without running or charging."
   ],
   [
    "Maximum bytes billed",
    "A query setting that makes a BigQuery job fail rather than process more than a set number of bytes."
   ]
  ],
  "example": "An e-commerce team runs Cloud SQL for PostgreSQL with HA for zone failures, point-in-time recovery for mistakes, and a read replica for its reporting tool. When a bad DELETE removes orders, they clone the instance to one minute before the statement and copy the rows back. Analysts estimate every new BigQuery report with a dry run and add a partition filter when one query would have scanned 3 TB.",
  "mistakes": [
   [
    "HA will recover data after an accidental DELETE or DROP TABLE.",
    "HA replicates synchronously, so the mistake is copied to the standby. Use point-in-time recovery or a backup."
   ],
   [
    "The HA standby can be used to offload read queries.",
    "The standby serves no traffic until failover. Use read replicas for reads."
   ],
   [
    "Adding LIMIT 10 to a BigQuery query reduces its cost.",
    "For a normal table, LIMIT does not reduce bytes scanned. Select fewer columns and filter on partition or cluster columns."
   ],
   [
    "Promoting a cross-region read replica is automatic and reversible.",
    "Promotion is manual and one-way; the replica becomes an independent primary."
   ]
  ],
  "tryit": [
   [
    "At Granite Peak Outdoor, the orders table lost rows at 16:14:30 because of a bad DELETE. The Cloud SQL for MySQL instance has HA, daily backups and binary logging enabled. How do you recover the rows with the least data loss?",
    "Use point-in-time recovery: clone the instance to a timestamp just before 16:14:30, verify the orders, and copy the missing rows back to production (or cut over). HA cannot help because the delete was replicated to the standby, and restoring last night's backup would lose a day of orders."
   ],
   [
    "An analyst's BigQuery query uses SELECT * on a 5 TB table partitioned by date, with LIMIT 100, to look at yesterday's orders. The dry run estimate is about 5 TB. How should the query change?",
    "Select only the needed columns and add a WHERE filter on the date partitioning column for yesterday. Removing LIMIT makes no difference to cost; the column and partition filters are what cut bytes processed."
   ]
  ],
  "tip": "Automatic zone failover: HA. Offload reads: read replica. Region loss: promote a cross-region replica. Undo a bad change: point-in-time recovery. Estimate BigQuery cost: dry run. Cap cost: maximum bytes billed or custom quotas. LIMIT doesn't reduce bytes scanned.",
  "check": [
   [
    "Can a Cloud SQL HA standby serve read queries?",
    "No. It only takes over on failover; use read replicas for reads."
   ],
   [
    "What does a BigQuery dry run tell you?",
    "Whether the query is valid and how many bytes it would process, without running it."
   ],
   [
    "What feature lets you restore a Cloud SQL database to one minute before a mistake?",
    "Point-in-time recovery, which uses backups plus binary logs (MySQL) or write-ahead logs (PostgreSQL)."
   ],
   [
    "Which BigQuery setting makes a query fail rather than process too much data?",
    "Maximum bytes billed."
   ]
  ]
 },
 {
  "t": "Operating networks: expanding subnets, static IP addresses and Cloud DNS",
  "hook": "It is Monday morning at Willow Creek Logistics, and three tickets land at once. The app subnet has run out of addresses, so the managed instance group cannot add VMs. A customer reports that their firewall is blocking your SFTP server because its public IP changed over the weekend after a maintenance restart. And the developers are tired of hard-coding the database's private IP into every service. Priya, the network engineer, wonders whether she needs to rebuild the subnet, buy a new address, or run her own DNS servers. Which of these can be fixed in place, without downtime, before lunch?",
  "simple": "A Virtual Private Cloud network is your private network in Google Cloud, divided into subnets, which are blocks of addresses for your servers. If a subnet runs out of addresses, you can make it bigger without disturbing what is already there, but you can never make it smaller. Servers can get public addresses that change when they restart, or a reserved address that stays yours, like keeping a phone number when you move. Cloud DNS is the phone book of the internet and of your private network: it turns easy names like db.corp.internal into addresses, so people and programs use names instead of numbers.",
  "body": [
   "Networks change as workloads grow, and the exam expects you to know which changes can be made in place and which force you to rebuild. The three most common operations are giving a subnet more addresses, keeping a public IP address from changing, and giving resources stable names with Cloud DNS.",
   "Subnet ranges can be expanded but not shrunk. If 10.10.0.0/24 is running out of addresses, `gcloud compute networks subnets expand-ip-range app-subnet --region=us-central1 --prefix-length=22` grows it to 10.10.0.0/22. Existing VMs keep their addresses and keep running, so there is no downtime. The only conditions are that the larger range must not overlap other subnets in the network or in peered networks and connected on-premises ranges, and that the expansion cannot be undone, so choose the new size deliberately. If you need a smaller range, you have to create a new subnet and move workloads to it.",
   "Address math is a favorite exam detail. Each subnet reserves four addresses in its primary range: the network address, the default gateway address, the second-to-last address and the broadcast address. A /24 contains 256 addresses, so it gives 252 usable addresses, and a /29, the smallest allowed for most subnets, gives only 4. Besides expanding, you can add secondary ranges to a subnet, which are used for alias IP addresses such as Google Kubernetes Engine (GKE) pod and service ranges, and you can add new subnets in any region of the same Virtual Private Cloud (VPC) network, because VPC networks are global while subnets are regional.",
   "IP addresses come in two lifetimes. Ephemeral external IP addresses are assigned when a VM starts and are released when it stops or is deleted, so the address can change after a stop and start. That is fine for a test VM but breaks anything that depends on a fixed address, such as a customer's firewall allowlist or a DNS record pointing at the VM. Static external IP addresses are reserved to your project until you release them. Reserve a new one with `gcloud compute addresses create web-ip --region=us-central1` for VMs and regional load balancers, or with `--global` for global external Application Load Balancers. You can also promote the ephemeral address a VM already has, so it never changes again, by reserving it with `gcloud compute addresses create sftp-ip --addresses=34.0.0.10 --region=us-central1` using its current value; the VM keeps the address and nothing needs to be updated elsewhere.",
   "Internal addresses can be static too. Reserving a static internal IP address lets a server, such as a database VM or an internal load balancer, keep the same private address across restarts and recreation. On the cost side, remember that reserved static external IP addresses that are not attached to anything are billed, so release addresses you no longer use with `gcloud compute addresses delete`.",
   "Cloud DNS is a managed, authoritative Domain Name System (DNS) service with high availability, managed through the console, gcloud or the API. A public zone serves records for a domain on the internet, such as example.com. After creating the zone, you update your domain registrar to use the name servers Cloud DNS assigns to it, shown in the zone's NS record; until you do, the internet keeps asking your old provider. A private zone answers only queries from the VPC networks you authorize, which is ideal for internal names like db.corp.internal that should never be visible publicly. You manage record sets such as A (IPv4 address), AAAA (IPv6 address), CNAME (alias), MX (mail) and TXT (verification text) in the console or with `gcloud dns record-sets create db.corp.internal. --zone=corp-private --type=A --ttl=300 --rrdatas=10.10.0.20`.",
   "Hybrid and security features round out Cloud DNS. Forwarding zones send queries for a domain, such as an on-premises corp.example.com, to your own DNS servers over a VPN or Interconnect, and inbound server policies let on-premises systems resolve your private zones. DNS peering lets one VPC network use another network's zones. For public zones, you can enable Domain Name System Security Extensions (DNSSEC), which signs records so resolvers can detect tampering.",
   "Finally, you often do not need to create records for VMs at all. Compute Engine provides automatic internal DNS names of the form VM_NAME.ZONE.c.PROJECT_ID.internal, so other VMs in the same VPC network can reach a VM by name without anyone managing records. Private zones are for friendlier names, for names that point at load balancers or managed services, and for names that must stay the same when the underlying VM is replaced."
  ],
  "analogy": "A subnet is like a parking lot painted on a large plot of land you already own. When it fills up, you can paint more spaces into the empty land next to it, as long as you do not paint over a neighbor's lot, and cars already parked never move. You cannot shrink the lot without moving every car. A static IP is a reserved parking space with your name on it; an ephemeral IP is whatever space is free when you arrive. The analogy stops at reserved spaces: in Google Cloud you pay for a reserved address even while it sits empty.",
  "terms": [
   [
    "expand-ip-range",
    "The gcloud subcommand that enlarges a subnet's primary range in place; it cannot be undone or reversed."
   ],
   [
    "Reserved addresses",
    "The four addresses in each subnet's primary range that you cannot assign: network, gateway, second-to-last and broadcast."
   ],
   [
    "Ephemeral external IP",
    "A public address assigned while a VM runs that can change after a stop and start."
   ],
   [
    "Static external IP",
    "A reserved public address that stays with your project until released."
   ],
   [
    "Private DNS zone",
    "A Cloud DNS zone visible only to authorized VPC networks."
   ],
   [
    "Internal DNS",
    "Automatic names that let VMs in a network reach each other by name."
   ]
  ],
  "example": "A SaaS company's app subnet fills up, so they expand it from /24 to /22 during business hours with no downtime. They promote the ephemeral IP of their SFTP server to static so customers' allowlists keep working, and create a private Cloud DNS zone so services find the database at db.prod.internal. A month later they release two unused static addresses they found on the billing report.",
  "mistakes": [
   [
    "You can shrink a subnet if you over-provisioned it.",
    "Subnets can only grow. To get a smaller range, create a new subnet and migrate workloads."
   ],
   [
    "A /24 subnet gives 254 usable addresses, as in traditional networking.",
    "Google Cloud reserves four addresses per primary range, so a /24 gives 252."
   ],
   [
    "To keep a VM's current public IP, you must reserve a brand-new static address and update everyone.",
    "You can promote the VM's existing ephemeral address to static, so it stays the same."
   ],
   [
    "A private Cloud DNS zone can be queried from the internet if you know its name.",
    "Private zones answer only for authorized VPC networks (and connected on-premises clients through server policies)."
   ]
  ],
  "tryit": [
   [
    "At Willow Creek Logistics, the app-subnet is 10.20.4.0/24 and is full. The VPC also has a subnet at 10.20.6.0/24 in the same network. Priya wants to expand app-subnet to /22. Will that work?",
    "No. A /22 starting at 10.20.4.0 covers 10.20.4.0 through 10.20.7.255, which overlaps 10.20.6.0/24. She could expand to /23 (10.20.4.0 to 10.20.5.255) if that range is free, or create a new subnet elsewhere."
   ],
   [
    "An SFTP server's public IP changed after a restart, breaking customer allowlists. The team gets the old address back by luck. How do they stop this from happening again?",
    "Promote the VM's current ephemeral external IP to a static external IP. It then stays reserved to the project and survives stops and restarts."
   ]
  ],
  "tip": "Subnets grow, never shrink, and must not overlap. A /24 gives 252 usable addresses. A changing public IP is fixed by reserving or promoting a static address. Internal-only names: private DNS zone. Public zone: update the registrar's name servers.",
  "check": [
   [
    "How many usable addresses does a /24 subnet provide in Google Cloud?",
    "252, because four addresses in each primary range are reserved."
   ],
   [
    "Do reserved static external IPs cost money when unused?",
    "Yes. Unattached reserved addresses are billed, so release them."
   ],
   [
    "After creating a public zone in Cloud DNS, what must you do for it to take effect?",
    "Update the domain registrar to use the name servers Cloud DNS assigned to the zone."
   ],
   [
    "Does expanding a subnet disrupt running VMs?",
    "No. Existing VMs keep their addresses and keep running."
   ]
  ]
 },
 {
  "t": "Cloud Monitoring: metrics, dashboards, alerting policies, uptime checks and the Ops Agent",
  "hook": "It is 2:40 a.m. at Sunfield Energy, and a customer emails support: the billing portal has been down for an hour. Nobody was paged. In the morning, Malik opens Cloud Monitoring and finds the VM's CPU chart looking perfectly calm. When he goes looking for memory and disk charts, there are none. The root cause turns out to be a full disk, which nothing was measuring, and an outage nobody outside the network was checking for. Your manager asks a simple question: how do we make sure we find out before customers do? What do you need to collect, chart and alert on?",
  "simple": "Cloud Monitoring is the dashboard for your cloud, like the gauges in a car. Google automatically measures some things, such as how hard a server's processor is working, but it cannot see inside the server's operating system to know how full its memory or disk is unless you install a small helper program called the Ops Agent. Dashboards show the gauges. Alerting policies are the warning lights: you decide the rule, such as 'disk more than 85 percent full', and who gets a message. Uptime checks are like a friend in another city who tries to open your website every minute and calls you if it does not load.",
  "body": [
   "Cloud Monitoring collects metrics, which are numeric measurements recorded over time, from Google Cloud services, applications and agents. Many metrics are built in and need no setup: Compute Engine CPU utilization, network bytes and disk read and write operations; Cloud Run request counts, latencies and instance counts; Cloud SQL connections and CPU; load balancer request counts and response codes. Each metric has a type, such as `compute.googleapis.com/instance/cpu/utilization`, labels you can filter and group by, and a monitored resource it belongs to.",
   "Monitoring often spans many projects, so Cloud Monitoring uses a metrics scope. Every project has one, and by default it contains only that project. You can add other projects to a scoping project's metrics scope, so one project can view metrics, dashboards and alerts across a whole environment, for example a dedicated monitoring project that sees dev, test and prod. Adding a project to a metrics scope grants visibility of metrics only, not permission to change those projects.",
   "Some important VM metrics come from inside the guest operating system (OS) and are not collected by default, because the hypervisor cannot see them. The two the exam loves are memory utilization and disk space used. To get them, install the Ops Agent on the VM. The Ops Agent collects system metrics such as memory, disk usage, swap and processes, can collect metrics from common applications such as web servers and databases, and also sends logs to Cloud Logging. It replaces the older separate Monitoring agent and Logging agent with one agent. You can install it on individual VMs from the console's Observability tab, with a script, or on whole fleets with an agent policy that installs and keeps the agent updated on every VM matching labels or operating systems. The VM's service account needs permission to write metrics and logs, which the Monitoring Metric Writer and Logs Writer roles provide.",
   "Dashboards turn metrics into pictures. Google provides predefined dashboards for many services, such as VM instances, Cloud SQL and GKE, which appear automatically when you use them. You can build custom dashboards with line charts, stacked bars, heatmaps, scorecards and tables, add filters and group results, for example CPU per instance or errors per Cloud Run revision. Metrics Explorer is for quick ad hoc questions: choose a metric, pick an aggregation such as mean or 95th percentile, and group by a label, then save the chart to a dashboard if it is useful.",
   "Alerting policies notify people when something needs attention. A policy has one or more conditions and one or more notification channels. Condition types include metric threshold conditions, such as CPU above 80 percent for 5 minutes or disk usage above 85 percent; metric absence conditions, which fire when a metric stops reporting, often a sign a VM or agent is down; and log-match conditions, which fire when a log entry matching a filter appears. The duration setting avoids alerts on short spikes. Notification channels include email, SMS, the Cloud console mobile app, Slack, PagerDuty, webhooks and Pub/Sub. When a condition is met, Monitoring opens an incident, sends notifications and closes the incident when the condition clears. The documentation field in the policy tells responders what the alert means and what to do first, which is invaluable at 2 a.m.",
   "Uptime checks test availability from outside, the way a user experiences it. An uptime check sends HTTP, HTTPS or TCP requests to a public URL, IP address or Google Cloud resource, such as a load balancer or instance, from several locations around the world at an interval you choose, such as every minute. It can verify the response code and check that the response body contains expected text, so a page that returns an error message with a 200 status still fails. Combined with an alerting policy, typically one that fires when checks fail from more than one region, uptime checks tell you when users cannot reach your site, even if every internal metric looks healthy. For private endpoints that are not reachable from the internet, uptime checks can target internal resources through a supported private configuration.",
   "Service monitoring builds on these pieces. You define a service, then service-level indicators (SLIs) such as availability or latency, and service-level objectives (SLOs) such as 99.9 percent of requests served successfully in under 300 milliseconds over 28 days. The allowed failure, 0.1 percent in that example, is the error budget. Burn-rate alerts warn when you are consuming the error budget faster than the SLO allows, which catches serious problems quickly without paging on every small blip.",
   "Putting it together for a typical web application: install the Ops Agent through an agent policy, use a dashboard showing CPU, memory, disk and request latency, create threshold alerts on disk usage and error rates, add an uptime check on the home page, and consider SLOs for the most important user journeys."
  ],
  "analogy": "Cloud Monitoring is like the instrument panel of a car. Built-in metrics are gauges wired at the factory, such as speed and engine temperature. Memory and disk space are like the fuel level of a tank Google cannot see into, so you install a sensor, the Ops Agent. Alerting policies are warning lights with a rule and someone to call. An uptime check is a friend standing on the road watching whether the car actually drives past. The analogy stops at fleets: one metrics scope can show the panels of many cars at once.",
  "terms": [
   [
    "Metric",
    "A numeric measurement recorded over time, with labels and a monitored resource."
   ],
   [
    "Metrics scope",
    "The set of projects whose metrics a scoping project can view together."
   ],
   [
    "Ops Agent",
    "Google's agent that collects guest OS metrics, such as memory and disk usage, and logs from VMs."
   ],
   [
    "Alerting policy",
    "Conditions plus notification channels that open incidents when a metric or log condition is met."
   ],
   [
    "Uptime check",
    "A probe of a URL, IP or resource from multiple global locations to test availability."
   ],
   [
    "Service-level objective",
    "A target for a service-level indicator, such as 99.9 percent of requests succeeding, used with burn-rate alerts."
   ]
  ],
  "example": "An operations team installs the Ops Agent on all VMs through an agent policy, adds a dashboard showing CPU, memory and disk per service, creates an alert when disk usage exceeds 85 percent for 10 minutes, and adds an uptime check on the www.example.com home page that pages the on-call engineer through PagerDuty if checks fail from two regions.",
  "mistakes": [
   [
    "Memory utilization is a built-in Compute Engine metric available for every VM.",
    "Memory and disk space used are guest OS metrics and require the Ops Agent."
   ],
   [
    "An uptime check by itself notifies the on-call engineer.",
    "An uptime check only tests availability. You need an alerting policy on the check to send notifications."
   ],
   [
    "Adding a project to a metrics scope gives the scoping project admin access to it.",
    "It grants visibility of metrics only, not permission to change resources."
   ],
   [
    "Setting a CPU alert with no duration is safest because it catches everything.",
    "Short spikes cause noisy, ignored alerts. Use a duration window, such as 5 minutes, so alerts mean something."
   ]
  ],
  "tryit": [
   [
    "At Sunfield Energy, Malik needs to be paged when any production VM's disk is more than 90 percent full, and when the public billing portal is unreachable from outside. Agents have never been installed. What does he set up?",
    "Install the Ops Agent on the VMs (ideally with an agent policy) so disk usage is collected, then create an alerting policy with a metric threshold on disk usage above 90 percent and a PagerDuty or SMS channel. Add an uptime check on the portal's URL with an alerting policy that fires when checks fail from multiple regions."
   ],
   [
    "A company has 30 projects and wants one place to see metrics and alerts for all production projects. What should they configure?",
    "A scoping project whose metrics scope includes the production projects, and build dashboards and alerting policies there."
   ]
  ],
  "tip": "Memory and disk-space metrics need the Ops Agent. 'Notify when a metric crosses a threshold' is an alerting policy. 'Is my website reachable from around the world' is an uptime check. 'One place for many projects' is a metrics scope. 'Error budget' points to SLOs and burn-rate alerts.",
  "check": [
   [
    "Why don't you see memory utilization for a new VM by default?",
    "Memory is measured inside the guest OS, so it requires the Ops Agent."
   ],
   [
    "What are the two main parts of an alerting policy?",
    "Conditions that define when to alert, and notification channels that define who is told."
   ],
   [
    "What does an uptime check test, and from where?",
    "Whether a URL, IP or resource responds correctly, tested from multiple locations around the world."
   ],
   [
    "How can one project view metrics from many projects?",
    "By adding those projects to its metrics scope."
   ]
  ]
 },
 {
  "t": "Cloud Logging: Logs Explorer, log-based metrics, log buckets and sinks",
  "hook": "It is Thursday at Elmstead Health Partners, and three requests arrive before noon. The compliance officer needs every audit log from all 40 projects kept for seven years, in one place the security team controls. The payments developers want an alert whenever 'payment declined' starts showing up in their logs more than usual. And finance has noticed the logging bill climbing because a chatty debug service writes millions of lines a day. Jordan, the new cloud engineer, opens Logs Explorer and stares at a wall of entries. Where do logs go by default, how long do they stay, and how do you send them where they need to be?",
  "simple": "Cloud Logging is the diary of your cloud. Every service, server and app writes entries that say what happened and when. Logs Explorer is the search box for that diary. If you want to count how often something appears, such as an error message, you can turn matching entries into a number you can chart and alert on. By default, logs are stored in containers called buckets for a set time, then deleted. A sink is like a mail-forwarding rule: it sends copies of chosen entries somewhere else, such as cheap long-term storage, a database for analysis, or a security tool. You can also tell Logging to drop noisy entries you do not want to pay for.",
  "body": [
   "Cloud Logging collects log entries from Google Cloud services, Cloud Audit Logs, VMs running the Ops Agent, Google Kubernetes Engine (GKE) containers, Cloud Run and your own applications. On serverless platforms and GKE, anything your code writes to standard output or standard error is captured automatically, and client libraries let you write structured entries directly. Each entry has a timestamp, a severity such as INFO, WARNING or ERROR, a monitored resource such as a VM or a Cloud Run revision, a log name, and a payload. The payload is either plain text (`textPayload`) or structured JSON (`jsonPayload`), and audit logs use `protoPayload`. Writing structured JSON is worth the effort, because you can filter on individual fields later.",
   "Logs Explorer in the console is where you search. You write queries in the Logging query language, for example `resource.type=\"gce_instance\" severity>=ERROR` to find errors from VMs, `textPayload:\"payment declined\"` to find entries containing a phrase, or `jsonPayload.status=500` for a structured field. You narrow the time range, use the histogram to spot spikes, and expand an entry to see all its fields. From the command line, `gcloud logging read 'severity>=ERROR' --limit=20 --freshness=1h` returns recent matching entries, and `gcloud logging write` writes a test entry. Log Analytics lets you query logs with SQL when a log bucket is upgraded to use it, which is useful for aggregations such as counting errors by service per hour.",
   "Log-based metrics turn log entries into Cloud Monitoring metrics, bridging logs and alerting. A counter metric counts entries matching a filter, such as how many times 'payment declined' appears per minute. A distribution metric extracts a numeric value from each matching entry, such as a latency field, and records its distribution so you can chart percentiles. You create them in the console under Log-based Metrics or with `gcloud logging metrics create declined-payments --log-filter='textPayload:\"payment declined\"'`. Once created, they behave like any other metric: chart them on dashboards and build alerting policies on them. Note that a log-based metric counts only entries received after it is created; it does not backfill history.",
   "Routing and storage are controlled by the Log Router, and understanding the defaults explains both retention and cost. Every log entry that arrives in a project passes through the Log Router, where sinks decide where it goes. Each project starts with two log buckets and two matching sinks. The _Required bucket stores Admin Activity audit logs, System Event audit logs and a few other required logs for 400 days; you cannot change its retention, delete it or stop logs going to it, and it costs nothing. The _Default bucket receives most other logs, through the _Default sink, and keeps them for 30 days by default, a retention you can change.",
   "You can shape this routing in three ways. You can create your own log buckets with custom retention, up to many years, including in specific regions for data residency, and point sinks at them. You can add exclusion filters to a sink, such as dropping DEBUG entries from a chatty service, so those entries are never stored and never billed for storage. And you can create user-defined sinks that send copies of matching entries to other destinations.",
   "Sink destinations each fit a purpose. A Cloud Storage bucket is the cheap choice for long-term archiving, for example seven years of audit logs for compliance. A BigQuery dataset is for SQL analysis and reporting across large volumes. A Pub/Sub topic is for streaming entries to other systems in near real time, such as a third-party security information and event management (SIEM) tool. A log bucket, possibly in another project, centralizes logs while keeping them searchable in Logs Explorer, and you can also route to another Google Cloud project, whose own sinks then process the entries. Sinks apply only to new entries; they do not copy logs that arrived before the sink existed.",
   "Permissions are the step people forget. When you create a sink to another destination, Logging assigns it a writer identity, which is a service account. You must grant that identity permission on the destination: for example, BigQuery Data Editor on the dataset, Storage Object Creator on the bucket, or Pub/Sub Publisher on the topic. Until you do, the sink exists but entries fail to arrive, and Logging reports sink errors. You can see the identity with `gcloud logging sinks describe SINK_NAME`.",
   "Centralization across many projects uses aggregated sinks. An aggregated sink is created on an organization or folder with `--include-children`, for example `gcloud logging sinks create org-audit storage.googleapis.com/org-audit-archive --organization=ORG_ID --include-children --log-filter='logName:\"cloudaudit.googleapis.com\"'`. It routes matching logs from every project beneath that node, including projects created later, which is the standard way to centralize security and audit logs in a project the security team controls."
  ],
  "analogy": "The Log Router is like the mailroom of a large office. Every letter (log entry) arrives at the mailroom, where rules decide where it goes. Some mail must always go to the legal archive (_Required) and stays there for a fixed time. Most goes to the general inbox (_Default) and is shredded after 30 days. Forwarding rules (sinks) send copies to the records warehouse, the analytics team or an outside security firm, and junk-mail filters (exclusions) throw away flyers before anyone files them. The analogy stops at permissions: each forwarding courier, the writer identity, needs its own key to the destination.",
  "terms": [
   [
    "Logs Explorer",
    "The console tool for querying and viewing log entries with the Logging query language."
   ],
   [
    "Log-based metric",
    "A Cloud Monitoring metric derived from log entries that match a filter; counter or distribution."
   ],
   [
    "Log bucket",
    "A storage container for logs with its own retention; _Required (400 days, fixed) and _Default (30 days, changeable) exist by default."
   ],
   [
    "Sink",
    "A Log Router rule that sends matching log entries to a destination such as BigQuery, Cloud Storage or Pub/Sub."
   ],
   [
    "Writer identity",
    "The service account a sink uses, which must be granted permission on the destination."
   ],
   [
    "Exclusion filter",
    "A rule that drops matching entries so they are not stored or billed."
   ],
   [
    "Aggregated sink",
    "A sink on an organization or folder that routes logs from all child projects."
   ]
  ],
  "example": "A company creates an aggregated sink on its organization that sends all audit logs to a Cloud Storage bucket with a seven-year retention policy in a security project, and another that streams them to Pub/Sub for its SIEM. Developers add a counter log-based metric for 'payment declined' and alert when it spikes, and the platform team adds an exclusion filter that drops DEBUG logs from a noisy service.",
  "mistakes": [
   [
    "Creating a sink to BigQuery is enough; logs start flowing automatically.",
    "You must grant the sink's writer identity permission on the destination, such as BigQuery Data Editor on the dataset."
   ],
   [
    "You can shorten the _Required bucket's retention to save money.",
    "The _Required bucket's 400-day retention is fixed and it is not billed. You can change _Default and custom buckets."
   ],
   [
    "A new sink or log-based metric includes all historical logs.",
    "Sinks and log-based metrics apply only to entries received after they are created."
   ],
   [
    "To collect logs from all 40 projects you need 40 separate sinks.",
    "An aggregated sink on the organization or folder with include-children covers all child projects, including future ones."
   ]
  ],
  "tryit": [
   [
    "At Elmstead Health Partners, Jordan must keep all audit logs from every project for seven years at low cost, in a project the security team controls. What should Jordan build?",
    "An aggregated sink on the organization with --include-children and a filter for audit logs, sending to a Cloud Storage bucket in the security project with an appropriate retention policy. Then grant the sink's writer identity permission to create objects in that bucket."
   ],
   [
    "A debug-heavy service writes millions of entries a day that nobody reads, and the logging bill is rising. What is the simplest fix that keeps other logs intact?",
    "Add an exclusion filter, on the _Default sink or the relevant sink, that matches that service's DEBUG entries. Excluded entries are not stored, so they are not billed for storage."
   ]
  ],
  "tip": "Count or chart something that appears in logs: log-based metric. Send logs somewhere else: sink (and grant its writer identity access). All projects in the organization: aggregated sink with include-children. Long-term cheap archive: Cloud Storage. SQL analysis: BigQuery. SIEM streaming: Pub/Sub. Drop noise: exclusion filter.",
  "check": [
   [
    "How long are logs kept in the _Default bucket by default?",
    "30 days, which you can change."
   ],
   [
    "What must you do after creating a sink to BigQuery?",
    "Grant the sink's writer identity permission to write to the dataset."
   ],
   [
    "Which sink destination suits streaming logs to a third-party SIEM?",
    "A Pub/Sub topic."
   ],
   [
    "How long does the _Required bucket keep Admin Activity audit logs?",
    "400 days, and that retention cannot be changed."
   ]
  ]
 },
 {
  "t": "Cloud Audit Logs: Admin Activity, Data Access, System Event and Policy Denied logs",
  "hook": "It is 9:05 a.m. at Pinecrest Medical Group, and the production scheduling VM is simply gone. No alert fired, the instance list shows nothing, and the clinic opens in an hour. Ines, the cloud engineer, has two questions to answer for her director: who deleted it, and when. A week later, a new privacy regulation asks a harder one: can you prove who read patient records in the storage bucket last month? Ines discovers that one of these questions can be answered from logs that were always there, and the other only if someone had turned the right logs on in advance. Which is which?",
  "simple": "Cloud Audit Logs are the security camera footage of your Google Cloud account. They record who did what, to which resource, and when. Some cameras are always on and free: they record every change to your setup, like creating or deleting a server, and every action Google's own systems take. Another set of cameras records who looked at or changed the actual data, such as opening a file; those produce a lot of footage, so they are off by default for most services and you turn them on where you need them. A fourth kind records when a security rule blocked someone. Watching the sensitive data footage needs a special permission.",
  "body": [
   "Cloud Audit Logs answer the question 'who did what, where and when' for Google Cloud resources. They are written to Cloud Logging, and each entry records the principal (a user or service account), the method called, such as `v1.compute.instances.delete`, the resource name, the time, the caller's IP address and user agent, and whether the request succeeded or was denied. They are essential for security investigations, compliance evidence and plain troubleshooting, such as finding out why a setting changed overnight. There are four types, and the exam expects you to know which are always on, which cost money and which must be enabled.",
   "Admin Activity audit logs record API calls and other actions that modify the configuration or metadata of resources. Examples include creating or deleting a VM, changing an Identity and Access Management (IAM) policy, updating a bucket's settings, or creating a service account key. They are always enabled, cannot be turned off or excluded from the _Required bucket, are kept there for 400 days, and are free. If a question asks who deleted, created or reconfigured something, the answer is in Admin Activity logs, whether or not anyone planned ahead.",
   "System Event audit logs record actions taken by Google systems rather than by users. Examples are live migration of a VM to another host, a managed instance group's autohealing recreating an unhealthy VM, or a preemptible or Spot VM being stopped. They are also always on, stored in the _Required bucket and free. They help when something changed and no human principal appears in Admin Activity logs.",
   "Data Access audit logs are the ones that need planning. They record API calls that read the configuration or metadata of resources (ADMIN_READ), and calls that read or write user-provided data (DATA_READ and DATA_WRITE), such as reading an object in Cloud Storage, listing objects, or querying a table. Because these can be extremely high volume, they are disabled by default for most services, and they are stored in the _Default bucket, where you pay for log volume beyond the free allotment. BigQuery is the notable exception: its Data Access logs are enabled by default and cannot be disabled. Data Access logs do not record access to publicly available resources, because there is no authenticated principal to record.",
   "Enabling Data Access logs is done per service and per log type, at the project, folder or organization level, and settings are inherited down the hierarchy. In the console, go to IAM and admin, then Audit logs, select a service such as Cloud Storage, and tick DATA_READ, DATA_WRITE or ADMIN_READ. Programmatically, the settings live in the `auditConfigs` section of the IAM policy, so you can edit the policy with `gcloud projects get-iam-policy` and `set-iam-policy`. You can exempt specific principals, for example a backup service account that reads every object nightly, to cut noise and cost. The key exam point is timing: logs are only written after you enable them, so if no one turned on DATA_READ for Cloud Storage last month, there is no record of who read those objects last month.",
   "Policy Denied audit logs are written when Google Cloud denies access to a user or service account because of a security policy violation, such as a request blocked by a VPC Service Controls perimeter. They are generated by default, are stored in the _Default bucket, and you can exclude them with an exclusion filter if you do not want them. They are useful for spotting misconfigured perimeters and attempted data exfiltration.",
   "Viewing audit logs requires the right IAM role, because some of them are sensitive. The Logs Viewer role (`roles/logging.viewer`) can see Admin Activity, System Event and Policy Denied logs. Data Access logs can reveal who looked at what data, so they are considered private and require the Private Logs Viewer role (`roles/logging.privateLogViewer`), which includes everything Logs Viewer can see plus Data Access logs. Grant it narrowly, typically to security and compliance staff.",
   "To find audit entries in Logs Explorer, filter on `logName` containing `cloudaudit.googleapis.com`, then narrow by type, for example `logName:\"cloudaudit.googleapis.com%2Factivity\"` for Admin Activity or `%2Fdata_access` for Data Access. Useful fields include `protoPayload.methodName` for the operation, `protoPayload.authenticationInfo.principalEmail` for who did it, and `protoPayload.resourceName` for what was affected. A query such as `protoPayload.methodName:\"instances.delete\"` finds VM deletions quickly. For long-term retention beyond 400 days, or for analysis across many projects, route audit logs with an aggregated sink to Cloud Storage or BigQuery."
  ],
  "analogy": "Audit logs are like a building's security system. Admin Activity logs are the always-on cameras at every door that record who moved furniture or changed the locks. System Event logs record what the building's own maintenance robots did. Data Access logs are cameras inside the filing room that record who opened which folder; they produce so much footage that you install them only in rooms that matter. Policy Denied logs record each time a badge reader refused entry. The analogy holds firmly on one point: footage from a camera that was never switched on does not exist.",
  "mnemonic": "\"Always See Data Denials\": Admin Activity and System Event are always on and free, Data Access must be enabled for most services, and Policy Denied is generated by default but can be excluded.",
  "terms": [
   [
    "Admin Activity audit logs",
    "Always-on, free logs of API calls that change resource configuration or metadata."
   ],
   [
    "System Event audit logs",
    "Always-on, free logs of actions taken by Google systems, such as live migration."
   ],
   [
    "Data Access audit logs",
    "Logs of reads of configuration (ADMIN_READ) and reads or writes of user data (DATA_READ, DATA_WRITE), off by default for most services."
   ],
   [
    "Policy Denied audit logs",
    "Logs written when a security policy, such as a VPC Service Controls perimeter, denies access."
   ],
   [
    "auditConfigs",
    "The section of an IAM policy that enables Data Access audit logs and lists exempted principals."
   ],
   [
    "Private Logs Viewer",
    "The role needed to view Data Access audit logs."
   ]
  ],
  "example": "After a production VM disappears, an engineer filters Admin Activity logs for methodName containing instances.delete and finds the principal and time within a minute. To meet a new regulation, the company then enables DATA_READ audit logs for Cloud Storage on its patient-records project only, exempts the nightly backup service account, and grants Private Logs Viewer to two compliance analysts, keeping log costs and access under control.",
  "mistakes": [
   [
    "You can disable Admin Activity audit logs to save money.",
    "They are always on, cannot be disabled and are free."
   ],
   [
    "Data Access logs are always available, so you can investigate who read data last month at any time.",
    "For most services they must be enabled first and only record from that point on. BigQuery is the exception, with them on by default."
   ],
   [
    "Logs Viewer is enough to see every audit log.",
    "Data Access logs require Private Logs Viewer because they are considered sensitive."
   ],
   [
    "Enabling Data Access logs organization-wide for every service is the safest default.",
    "It can generate very large volumes and cost. Enable them where needed, for the right services, and exempt noisy principals."
   ]
  ],
  "tryit": [
   [
    "At Pinecrest Medical Group, Ines must show who read objects in the patient-records bucket over the past 30 days. Data Access logs were never enabled for Cloud Storage. What can she report, and what should she change?",
    "She cannot produce read records for that period, because DATA_READ logs did not exist. Admin Activity logs still show configuration changes such as IAM policy updates. She should enable DATA_READ (and likely DATA_WRITE) for Cloud Storage on that project now, route them to long-term storage if retention requires it, and grant Private Logs Viewer to the people who need to review them."
   ],
   [
    "An analyst with the Logs Viewer role can see VM deletions in audit logs but cannot see entries showing who queried a sensitive table. Why?",
    "Those entries are Data Access logs, which require the Private Logs Viewer role. Logs Viewer covers Admin Activity, System Event and Policy Denied logs."
   ]
  ],
  "tip": "Who changed or deleted something: Admin Activity (always on, free). Google's own actions: System Event. Who read data: Data Access, which must be enabled first (except BigQuery). Blocked by VPC Service Controls: Policy Denied. Viewing Data Access logs needs Private Logs Viewer.",
  "check": [
   [
    "Can you disable Admin Activity audit logs?",
    "No. They're always written and can't be turned off."
   ],
   [
    "Why are Data Access logs disabled by default for most services?",
    "They can be very high volume and add cost, so you enable them where needed."
   ],
   [
    "Which audit log type records a VM live migration?",
    "System Event audit logs."
   ],
   [
    "Where in an IAM policy are Data Access logs configured?",
    "In the auditConfigs section, per service and log type, with optional exempted principals."
   ]
  ]
 },
 {
  "t": "Troubleshooting with Error Reporting, Cloud Trace and Cloud Profiler",
  "hook": "It is 9:40 p.m. at Lantern Outfitters, an online gear shop, and Dev on the platform team gets a page: checkout requests that usually finish in 300 milliseconds are now taking four seconds. The release went out an hour ago. Dashboards show CPU climbing on one Cloud Run service, but there are six services in the checkout path, and the logs are a waterfall of text. The product manager is already asking in chat whether to roll back. You have metrics and logs, but neither tells you which service is slow, which function is burning CPU, or whether a brand-new exception came with the release. Which tool should Dev open first, and what will each one actually show?",
  "simple": "When an app misbehaves, you usually have three different questions. First, what is breaking? Second, where is the time going? Third, which part of my own code is working hardest? Google Cloud has one tool for each. Error Reporting collects crash messages and sorts identical ones into piles, so you can see that one error happened 500 times since lunch. Cloud Trace follows a single request as it hops between services and times each hop, like a receipt that lists how long each station in a kitchen took to prepare your order. Cloud Profiler watches your running code and shows which functions use the most processor time or memory. Pick the tool by the question you are asking.",
  "body": [
   "Metrics and logs tell you that something is wrong, but application problems usually need sharper tools. Google Cloud Observability includes three that focus on the code itself: Error Reporting, Cloud Trace and Cloud Profiler. Each one answers a different question, and Associate Cloud Engineer exam questions usually hinge on matching the question in the scenario to the right tool. If you remember the question each tool answers, most of these items become straightforward.",
   "Error Reporting answers the question 'what errors is my app throwing, and are they new?'. It analyzes logs from Cloud Run, Cloud Run functions, App Engine, Google Kubernetes Engine (GKE) and Compute Engine, and it also accepts errors sent directly through its API or client libraries. It recognizes stack traces in log entries and groups similar exceptions together, so instead of 4,000 separate log lines you see one error group such as `TimeoutError: upstream pricing call exceeded deadline`, with a count, first-seen and last-seen times, the affected service and version, and sample stack traces. You can mark a group as acknowledged or resolved, and if a resolved error comes back it is flagged again. It can notify you when a new error group appears, which is often the fastest way to learn that a release introduced a bug.",
   "A key exam detail is how little setup Error Reporting needs. For many serverless services, such as Cloud Run, Cloud Run functions and App Engine, it works automatically with no code changes, as long as your application writes exceptions with their stack traces to standard error or to Cloud Logging. On Compute Engine or GKE the same idea applies: get the stack traces into Cloud Logging in a recognizable format, or report them through the client library, and Error Reporting does the grouping for you.",
   "Cloud Trace answers the question 'where is the time going in a request?'. It is a distributed tracing system. Each incoming request gets a trace, and the trace is made of spans, one for each timed step: the front end receiving the request, a call to an inventory service, a query to Cloud SQL, a call to an external payment API. In the console you see these spans as a waterfall chart, so a request that took 4.1 seconds might show 3.6 seconds inside a single span for the pricing service. Cloud Trace also shows latency distributions over time, which helps you notice that the slowest five percent of requests got worse after a deployment. Many Google services and load balancers produce trace data, and you instrument your own code with OpenTelemetry, the open standard for traces and metrics, to send spans of your own.",
   "Cloud Profiler answers the question 'which functions in my code use the most CPU or memory?'. It continuously samples running applications in production with low overhead, so you can leave it on rather than reproducing a problem in a test lab. The results appear as flame graphs, where the width of each bar shows how much CPU time, heap memory or another resource a function and its children consumed. You enable it by adding the profiling agent or library to your application at startup. Teams use it to cut latency and cost by finding hot code paths, such as a parsing routine that runs on every request or a loop that allocates far more memory than it needs.",
   "The distinction between Trace and Profiler is the one learners most often blur. Trace looks across services and tells you which hop in a request is slow. Profiler looks inside one service and tells you which function is expensive. If a scenario mentions microservices, request paths or latency between components, think Trace. If it mentions functions, CPU hot spots, memory use or optimizing code, think Profiler.",
   "In practice the tools work together. A typical investigation starts when an alerting policy in Cloud Monitoring fires on high latency. Cloud Trace shows that most of the time is spent in one service. Cloud Profiler shows which function in that service is consuming CPU. Logs Explorer shows the related log entries, filtered by the trace ID so you see only the lines for slow requests. Error Reporting shows whether a new exception group started with the latest release. That chain lets the team decide quickly between rolling back and shipping a fix.",
   "Other helpers round out troubleshooting. Active Assist recommendations suggest changes such as right-sizing or stopping idle virtual machines (VMs). Network Intelligence Center's Connectivity Tests analyze the configured network path between two endpoints, which helps when the real problem is a firewall rule or route rather than the code. On the exam, read the question for its verb: grouped exceptions point to Error Reporting, slow requests across services point to Cloud Trace, and code-level CPU or memory hot spots point to Cloud Profiler."
  ],
  "analogy": "Think of a restaurant on a busy night. Error Reporting is the manager's complaint log that groups every 'cold soup' complaint into one line with a count. Cloud Trace is a ticket that is timestamped at each station, showing your order spent 20 minutes at the grill and two minutes everywhere else. Cloud Profiler is someone watching the grill cook and noticing that most of the time goes into one slow technique. The analogy stops at sampling: Profiler watches continuously at low cost rather than following one specific order.",
  "terms": [
   [
    "Error Reporting",
    "A service that groups and counts application exceptions from logs or its API, tracks first and last occurrence, and can notify you about new error groups."
   ],
   [
    "Cloud Trace",
    "A distributed tracing service that shows request latency broken into spans across services."
   ],
   [
    "Cloud Profiler",
    "A low-overhead continuous profiler that shows CPU, memory and other resource use by function, usually as flame graphs."
   ],
   [
    "Span",
    "One timed operation within a trace, such as a call to another service or a database query."
   ],
   [
    "Flame graph",
    "A visualization where the width of each bar represents how much of a resource a function and the functions it calls consumed."
   ],
   [
    "OpenTelemetry",
    "An open standard and set of libraries for instrumenting code to emit traces and metrics."
   ]
  ],
  "example": "Checkout latency rises after a release. Cloud Trace shows most of the time in the pricing service, Cloud Profiler reveals a JSON-parsing function consuming most of its CPU, and Error Reporting shows a new timeout exception group that started with the same release. The team rolls back, fixes the parser, and redeploys.",
  "mistakes": [
   [
    "Using Cloud Profiler to find which microservice in a chain is slow.",
    "Profiler looks inside one running application at function-level resource use. Finding the slow hop across services is the job of Cloud Trace and its spans."
   ],
   [
    "Assuming Error Reporting needs a special SDK in every Cloud Run service.",
    "On Cloud Run, Cloud Run functions and App Engine it usually works automatically from exceptions with stack traces written to logs. The API and client libraries are optional extras."
   ],
   [
    "Choosing Logs Explorer as the answer when the question asks for grouped exceptions with counts and first-seen times.",
    "Logs Explorer shows raw entries. Error Reporting is the tool that groups similar exceptions and tracks when each group first and last appeared."
   ],
   [
    "Thinking Cloud Profiler is only for test environments because profiling is expensive.",
    "Cloud Profiler is designed for continuous, low-overhead sampling in production."
   ]
  ],
  "tryit": [
   [
    "A team runs a single monolithic App Engine application. Latency is fine, but the monthly bill has doubled because instances run hot on CPU. They want to know which parts of the code to optimize first, without reproducing load in a lab. Which tool fits best?",
    "Cloud Profiler. The question is about CPU use by function inside one application, in production. Cloud Trace would show request timing but not which function burns CPU, and Error Reporting is about exceptions."
   ],
   [
    "Shortly after a deployment, a support engineer hears that some users see a generic error page. Logs contain thousands of lines. She wants to know whether this is one new problem or many, and when it started. Where should she look?",
    "Error Reporting. It groups the exceptions by stack trace and shows counts and first-seen times, so she can tell whether a single new error group appeared with the release."
   ]
  ],
  "tip": "Grouped exceptions and 'is this error new': Error Reporting. Slow requests across services: Cloud Trace. Code-level CPU or memory hot spots: Cloud Profiler.",
  "check": [
   [
    "Which tool shows which microservice adds the most latency to a request?",
    "Cloud Trace, through the spans in each trace."
   ],
   [
    "Does Error Reporting require code changes on Cloud Run?",
    "Usually not; it reads exceptions with stack traces from the service's logs."
   ],
   [
    "A developer wants to see which functions allocate the most heap memory in a production service. Which tool?",
    "Cloud Profiler, which samples heap and CPU use by function with low overhead."
   ]
  ]
 },
 {
  "t": "IAM roles: basic, predefined and custom roles, and least privilege",
  "hook": "On Tuesday morning at Cedar Valley Logistics, a ticket lands in your queue from Marco, a contractor who restarts VMs during the weekly maintenance window. His manager wrote one line: 'Just give him Editor so he stops getting blocked.' You know Editor would also let Marco delete disks, change firewall rules and drop a production database. You also know that if you say no without an alternative, someone else will approve it by lunch. Is there a role that lets Marco start and stop VMs and do nothing else, and if Google does not offer one, can you build it yourself?",
  "simple": "In Google Cloud, you do not hand people individual permissions one by one. You give them roles, which are bundles of permissions, a bit like key rings. Some key rings are huge and open almost every door in the building; those are the basic roles: Viewer, Editor and Owner. Some are made by Google for specific jobs, like 'can read files in storage'; those are predefined roles. And if no ready-made ring fits, you can make your own ring with exactly the keys you choose; that is a custom role. The safest habit, called least privilege, is to give each person the smallest key ring that lets them do their job, and only for the rooms they actually need.",
  "body": [
   "In Google Cloud you never grant permissions directly to a user; you grant roles, which are collections of permissions. Identity and Access Management (IAM) checks whether a principal, such as a user, group or service account, holds a role that contains the permission an API call needs. A permission has the form service.resource.verb, such as `compute.instances.start` or `storage.objects.get`. When a request fails, the error usually names the missing permission, which is your clue to which role is needed. Picking the right role is the core of least privilege: give each principal only the access its job requires, at the narrowest scope that works.",
   "Basic roles are the original, very broad roles that predate IAM's fine-grained model. Viewer can read most resources. Editor can view, create, change and delete most resources. Owner has Editor's rights plus the ability to manage IAM policies and billing for the project, which is what makes Owner so powerful: an Owner can grant anyone, including themselves, any access. These roles include thousands of permissions across nearly every service, and they grow as services are added. That is why Google recommends against them in production. Exam answers that grant Owner or Editor 'to make it work' or 'to save time' are almost always wrong.",
   "Predefined roles are created and maintained by Google for specific services and job functions, and Google updates them as services add features. Examples include Compute Instance Admin (v1), Storage Object Viewer, BigQuery Data Editor, Cloud Run Developer, Kubernetes Engine Developer and Logs Viewer. They are the first choice in most situations, because someone at Google has already worked out which permissions a given job needs. Role IDs look like `roles/storage.objectViewer`. To see exactly what a role contains, run `gcloud iam roles describe roles/storage.objectViewer`, and to browse roles for a service you can use `gcloud iam roles list --filter` or the Roles page in the console.",
   "Custom roles contain exactly the permissions you choose, and you create them when no predefined role fits. A classic example is a role that can start and stop VMs but not delete them. You can define custom roles at the organization level or the project level, but not on folders. You maintain them yourself: Google does not add new permissions to them when services change. You create one with a command such as `gcloud iam roles create vmOperator --project=my-proj --permissions=compute.instances.start,compute.instances.stop,compute.instances.get,compute.instances.list` or from a YAML file that lists the title, description, stage and permissions. Some permissions are not supported in custom roles, so check before you design one, and roles carry a launch stage such as ALPHA, BETA or GA that signals how mature they are.",
   "A useful way to remember the order of preference is from most to least maintained by Google. Predefined roles are maintained for you and usually fit. Custom roles fill the gaps but become your responsibility. Basic roles are convenient but far too broad. When an exam question offers all three, the best answer is usually the narrowest predefined role, unless the scenario clearly says no predefined role matches, in which case a custom role is right.",
   "Least privilege also means choosing the scope carefully. Roles are granted on a resource, and they are inherited down the resource hierarchy from organization to folder to project to resource. A role granted on one bucket is safer than the same role on the whole project, and a role on a project is safer than the same role on a folder or the organization. If a data analyst only needs one dataset, grant BigQuery Data Viewer on that dataset rather than on the project.",
   "It helps to know how roles appear in day-to-day work. In the console, the IAM page lists principals and the roles they hold on the current resource, with an option to include inherited grants, and the Roles page lets you search roles by name or by a permission they contain. On the command line, a permission-denied error such as 'Permission compute.instances.delete denied' tells you exactly which permission was missing. Rather than reaching for a broader role, search for the smallest predefined role that contains that permission, and confirm with a role describe command before you grant it.",
   "Good operating habits make least privilege sustainable. Grant roles to Google groups rather than individuals, so that access follows team membership and leavers lose access when they leave the group. Review access regularly using the IAM recommender, which suggests removing roles that have not been used. Use IAM Conditions for temporary or restricted grants, for example access that expires at the end of a project. Finally, keep a small, named set of people with Owner or Organization Administrator, and treat any new broad grant as something to justify in writing."
  ],
  "analogy": "Roles are like key rings in an office building. Basic roles are master keys: convenient, but losing one is a disaster. Predefined roles are the key rings facilities already prepared for each job, like 'mailroom' or 'server room'. A custom role is a ring you assemble yourself from individual keys. The analogy breaks in one place that matters for the exam: Google keeps adding keys to its predefined rings as new doors appear, but your custom ring never changes unless you change it.",
  "terms": [
   [
    "Basic roles",
    "The broad Owner, Editor and Viewer roles that apply across nearly all services."
   ],
   [
    "Predefined role",
    "A Google-maintained role for a specific service and job, such as Storage Object Viewer."
   ],
   [
    "Custom role",
    "A role you define with an exact list of permissions, at the organization or project level, which you maintain yourself."
   ],
   [
    "Permission",
    "A single allowed action in the form service.resource.verb, such as compute.instances.start."
   ],
   [
    "Least privilege",
    "Granting only the permissions needed, at the narrowest scope that works."
   ],
   [
    "Launch stage",
    "A label on a custom role, such as ALPHA, BETA or GA, that indicates its maturity."
   ]
  ],
  "example": "An operations contractor must restart VMs during maintenance windows. Instead of Editor, the admin creates a custom role with the start, stop, get and list permissions for instances, grants it to the contractor group on one project, and the contractor can't delete VMs or change anything else.",
  "mistakes": [
   [
    "Granting Editor because it is the quickest way to unblock someone.",
    "Editor includes thousands of permissions across almost every service. Choose the narrowest predefined role, or a custom role if none fits."
   ],
   [
    "Believing custom roles can be created on folders.",
    "Custom roles exist only at the organization or project level. A role defined at the organization can then be granted anywhere below it, including on folders."
   ],
   [
    "Assuming Google updates custom roles when a service adds new features.",
    "Only predefined roles are updated by Google. Custom roles stay exactly as you defined them until you edit them."
   ],
   [
    "Thinking Editor can manage IAM policies.",
    "Managing IAM policies and billing on a project is what Owner adds on top of Editor. Editor cannot change who has access."
   ]
  ],
  "tryit": [
   [
    "A finance analyst needs to read query results from one BigQuery dataset in the analytics project. Her manager proposes granting Viewer on the project. Another engineer proposes a custom role with the exact read permissions. What do you grant?",
    "Grant the predefined BigQuery Data Viewer role on that one dataset, plus a role that lets her run jobs if she needs to query, such as BigQuery Job User on the project. Viewer is a broad basic role, and a custom role is unnecessary because predefined roles already fit."
   ]
  ],
  "tip": "Prefer predefined roles; use custom roles only when no predefined role fits; avoid basic roles. Custom roles can't be created on folders and aren't updated automatically by Google.",
  "check": [
   [
    "Which basic role can change IAM policies on a project?",
    "Owner. Editor can't manage IAM policies."
   ],
   [
    "At what levels can custom roles be created?",
    "The organization or a project, not folders."
   ],
   [
    "Which command shows the permissions inside a predefined role?",
    "gcloud iam roles describe followed by the role ID, such as roles/storage.objectViewer."
   ]
  ]
 },
 {
  "t": "Viewing and changing IAM allow policies with gcloud, and IAM Conditions",
  "hook": "Friday at 4:50 p.m. at Northgate Analytics, Ana downloads the project's IAM policy to a file, adds two new data analysts, and plans to upload it after a coffee. While she is away, her teammate grants the on-call group access through the console. Ana returns, runs her upload, and minutes later the on-call engineer cannot see logs during a live incident. Meanwhile, an external auditor starts Monday and needs read access for exactly two weeks, and nobody trusts themselves to remember to remove it. What went wrong with Ana's upload, and how can access be made to expire on its own?",
  "simple": "Every Google Cloud project, folder and many individual resources carry a list called an allow policy. It says, in effect, 'these people have this role'. Each line pairing a role with a list of people is called a binding. You can add or remove one line at a time, which is safe, or you can replace the whole list with a new copy, which is risky if your copy is out of date, like pasting an old version of a shared spreadsheet over everyone's newer edits. You can also attach a condition to a line, such as 'only until December 31', so the access switches itself off without anyone having to remember.",
  "body": [
   "An allow policy is a document, shown as JavaScript Object Notation (JSON) or YAML, that is attached to a resource such as an organization, folder, project, bucket or service account. It contains a list of bindings, each with one role and a list of members, plus an etag and a version number. Members are written with a prefix, such as `user:ana@example.com`, `group:oncall@example.com` or `serviceAccount:app-sa@my-proj.iam.gserviceaccount.com`. Knowing this shape helps you read command output quickly and spot what a scenario is really describing.",
   "To view a policy, run `gcloud projects get-iam-policy my-proj`, optionally with `--format=json` or `--format=yaml`. Similar get-iam-policy commands exist for folders, organizations, buckets (`gcloud storage buckets get-iam-policy gs://b`), service accounts and many other resources. The output lists each binding with its role, such as `roles/logging.viewer`, followed by its members. Remember that the policy on a project shows only the grants made on that project; access inherited from a folder or the organization appears in the parent's policy, not here.",
   "The simplest and safest way to change one binding is `add-iam-policy-binding` or `remove-iam-policy-binding`. For example, `gcloud projects add-iam-policy-binding my-proj --member=group:analysts@example.com --role=roles/bigquery.dataViewer` reads the current policy, adds the member to that role, and writes the result back in one step. Because the command fetches a fresh copy each time, it does not overwrite other people's recent changes. This is the answer to most exam questions that describe granting or revoking a single role.",
   "For bulk changes you can download the policy, edit it, and upload it with `gcloud projects set-iam-policy my-proj policy.json`. Be careful: set-iam-policy replaces the entire policy with the file's contents. If the file is stale or is missing bindings, those bindings are removed, which can cut off other teams or even your own access. The etag protects against the worst case of concurrent edits. If someone changed the policy after you downloaded it, the etag in your file no longer matches, the upload is rejected, and you must fetch the policy again and reapply your edits. If you strip the etag out of the file, that protection is lost.",
   "IAM Conditions let a binding apply only when an expression written in Common Expression Language (CEL) evaluates to true. Common uses are time-limited access, such as `request.time < timestamp(\"2026-12-31T00:00:00Z\")`, and resource-based limits, such as allowing access only to resources whose name starts with a certain prefix or that carry a certain tag. You add one with `--condition='expression=...,title=...'` on add-iam-policy-binding, and an optional description helps reviewers understand why it exists. A conditional binding appears in the policy with a `condition` block that holds the title, description and expression.",
   "Conditions come with a few rules worth memorizing. Policies that contain conditions use policy version 3, so tools reading them must request that version. Not every service or role supports every condition attribute, so check the documentation before relying on, for example, a resource-name condition for a specific service. Basic roles such as Owner, Editor and Viewer cannot be used in conditional bindings. When a condition stops being true, such as after its expiry time, the binding simply stops granting access, although it remains visible in the policy until someone removes it.",
   "Reading the output carefully also pays off when troubleshooting. A typical YAML policy lists `bindings:` followed by entries with `members:` and `role:`, then an `etag:` value such as `BwX...` and `version: 1` or `version: 3`. If a user insists they were granted access but the project policy does not show them, check whether the grant was made to a group they belong to, whether it sits on a parent folder or organization, or whether it carries a condition that is no longer true. These three explanations cover most 'but I was given access' tickets.",
   "Finally, remember what an allow policy cannot do. Allow policies are additive and inherited, so a policy on a project cannot remove access granted higher in the hierarchy, such as Viewer granted on the parent folder. To block a permission regardless of allow grants, Google Cloud offers IAM deny policies, which explicitly deny specific permissions to specific principals and are evaluated before allow policies. Principal access boundary policies are another, separate control that limits which resources a principal is eligible to access at all. On the exam, 'remove access a parent grants' or 'ensure nobody can do X even if granted' points toward deny policies, not edits to the child's allow policy."
  ],
  "analogy": "An allow policy is like a shared guest list on a clipboard at a venue door. Adding one name with add-iam-policy-binding is writing a single line on the current clipboard. Using set-iam-policy is replacing the clipboard with a photocopy you made an hour ago, which erases names added since. The etag is a page number that the doorman checks so old copies are refused. A condition is a note beside a name saying 'valid until Friday'.",
  "terms": [
   [
    "Allow policy",
    "A document attached to a resource that lists role bindings, an etag and a version."
   ],
   [
    "Binding",
    "One role and the list of members that hold it in an allow policy, optionally with a condition."
   ],
   [
    "etag",
    "A version marker that prevents overwriting a policy someone else changed."
   ],
   [
    "set-iam-policy",
    "A command that replaces a resource's entire allow policy with a file's contents."
   ],
   [
    "IAM Condition",
    "A CEL expression that makes a role binding apply only in certain cases, such as before a date."
   ],
   [
    "Deny policy",
    "An IAM policy that explicitly blocks specific permissions for specific principals, evaluated before allow policies."
   ]
  ],
  "example": "An auditor needs read access for two weeks. The admin runs add-iam-policy-binding with a predefined read-only role, such as Security Reviewer, on the audit project and a condition on request.time that expires on the last day of the audit, so the access disappears automatically without anyone remembering to remove it.",
  "mistakes": [
   [
    "Using set-iam-policy to grant one new role because it seems more direct.",
    "set-iam-policy replaces the whole policy and can remove other bindings. For a single change, use add-iam-policy-binding or remove-iam-policy-binding."
   ],
   [
    "Believing you can remove inherited access by editing the project's allow policy.",
    "Allow policies only add access. To block access granted at a folder or organization, remove it where it was granted or use an IAM deny policy."
   ],
   [
    "Attaching a time condition to the Editor role for a temporary contractor.",
    "Basic roles cannot be used with IAM Conditions. Use a predefined or custom role with the condition."
   ],
   [
    "Assuming an expired conditional binding is deleted automatically.",
    "It stops granting access, but the binding remains in the policy until someone removes it."
   ]
  ],
  "tryit": [
   [
    "An engineer exported a project's policy on Monday, edited it on Wednesday to add three members, and ran set-iam-policy. The command failed with an error about the policy having changed. A colleague suggests deleting the etag line from the file and retrying. What should the engineer do instead?",
    "Fetch the current policy again, reapply the three additions, and upload, or better, use add-iam-policy-binding for each member. Removing the etag would disable the concurrency check and could silently erase changes others made since Monday."
   ]
  ],
  "tip": "For one change, use add- or remove-iam-policy-binding. set-iam-policy overwrites everything. Temporary access is an IAM Condition on request.time. Blocking inherited access is a deny policy.",
  "check": [
   [
    "What happens if you run set-iam-policy with a file missing some bindings?",
    "Those bindings are removed, because the whole policy is replaced."
   ],
   [
    "Which IAM feature grants a role only until a certain date?",
    "An IAM Condition using request.time in the binding."
   ],
   [
    "Which policy version is required for bindings with conditions?",
    "Version 3."
   ]
  ]
 },
 {
  "t": "Service accounts: creating them, granting roles, attaching them to resources, and default service accounts",
  "hook": "Wednesday afternoon at Bluefin Insurance, a security review flags something odd: an image-resizing VM wrote to the claims bucket, read a billing dataset, and modified a firewall rule, all in the same week. Nobody on the imaging team touched billing or networking. You open the VM's details and see it runs as the Compute Engine default service account, which in this project holds the Editor role. Every VM created without a second thought has been running with nearly full project access. How should each workload get its own identity, and why did creating a VM quietly hand out so much power?",
  "simple": "A service account is an account for a program instead of a person. When your app running on a virtual machine wants to save a file to storage, it has to prove who it is, just like you do when you sign in. The service account is that identity. You create one for each app, give it only the permissions that app needs, and attach it to the machine or service that runs the app. Google then hands the app short-lived passes automatically, so no passwords are stored anywhere. Some Google services create a default service account for you, but it is often far too powerful, a bit like giving every new employee a master key on day one.",
  "body": [
   "A service account is an identity for a workload, not a person. Applications running on Compute Engine virtual machines (VMs), Google Kubernetes Engine (GKE), Cloud Run or Cloud Run functions use service accounts to call Google APIs, such as writing to Cloud Storage or querying BigQuery. A service account has an email address like `app-sa@my-proj.iam.gserviceaccount.com`. It is unusual in being two things at once. It is a principal, so it can be granted roles on resources. It is also a resource, so people can be granted roles on it, such as permission to use it or manage it. Many exam questions turn on that dual nature.",
   "Creating a service account is quick: `gcloud iam service-accounts create app-sa --display-name=\"App\"`. A new service account has no access until you grant it roles on the resources it needs. For example, to let an upload service add files to one bucket, run `gcloud storage buckets add-iam-policy-binding gs://uploads --member=serviceAccount:app-sa@my-proj.iam.gserviceaccount.com --role=roles/storage.objectCreator`. Notice that the role is granted on the bucket, not the project, which keeps the scope narrow.",
   "Create a separate service account for each application or component. Sharing one service account across many apps forces you to give it the union of all their permissions, so a bug or compromise in the least important app exposes everything. Separate accounts also make audit logs meaningful: when Cloud Audit Logs show that `invoice-sa` read a secret, you know which workload did it. A practical naming pattern is one service account per service per environment, such as `orders-prod-sa` and `orders-dev-sa`.",
   "Attaching a service account to a resource is how the workload gets credentials. For a VM, use `gcloud compute instances create vm-1 --service-account=app-sa@my-proj.iam.gserviceaccount.com --scopes=cloud-platform`. Code on the VM then gets short-lived OAuth 2.0 access tokens from the metadata server automatically, and Google client libraries find those credentials without any configuration. There are no key files to copy, rotate or leak. Cloud Run services and Cloud Run functions take a `--service-account` flag at deployment and work the same way. Access scopes are a legacy VM mechanism that limits which APIs the VM's credentials can reach regardless of IAM; Google's recommendation is to set the cloud-platform scope and control access entirely with IAM roles on the service account.",
   "Attaching a service account is itself a privileged action. To attach one, you need the Service Account User role (`roles/iam.serviceAccountUser`) on that service account, because any code running as it can use its permissions. Without this check, someone with only permission to create VMs could launch a VM that runs as a powerful service account and borrow its access. If a user can create VMs but gets a permission error when choosing a particular service account, the missing piece is almost always Service Account User on that account. Service Account Admin is a separate role that lets you create, update and delete service accounts and manage their policies, which is a different power from using them.",
   "Some services create default service accounts automatically. The best known is the Compute Engine default service account, `PROJECT_NUMBER-compute@developer.gserviceaccount.com`, which VMs use unless you choose another. App Engine has a similar default account. Depending on your organization's settings and when the project was created, the Compute Engine default service account may be granted the Editor role automatically, which is why a carelessly created VM can end up with sweeping access. Best practice is to create dedicated, least-privilege service accounts for each workload instead, and many organizations enforce the organization policy that disables the automatic Editor grant for default service accounts.",
   "You can also inspect and adjust service accounts after creation. `gcloud iam service-accounts list` shows the accounts in a project, and `gcloud iam service-accounts get-iam-policy app-sa@my-proj.iam.gserviceaccount.com` shows who can use or manage that account, which is the 'service account as a resource' view. To change the service account on an existing VM, you stop the VM, run `gcloud compute instances set-service-account` with the new account and scopes, and start it again. Disabling a service account immediately blocks its use without deleting it, which is a safe first step when you suspect it is unused or compromised.",
   "Do not confuse default service accounts with service agents. Service agents are Google-managed service accounts that Google services use to act on your behalf, for example when Cloud Storage uses a customer-managed encryption key or when Compute Engine manages instance groups. They usually have names that include the service and the project number, and Google grants them the roles they need. You rarely create or attach them yourself, but you sometimes grant them access to your resources, such as a Cloud Key Management Service key. Removing their roles can break the service that depends on them."
  ],
  "analogy": "A service account is like an employee badge issued to a delivery robot rather than a person. The badge opens only the doors the robot needs, and the robot gets a fresh daily pass from a kiosk on its floor, which is the metadata server. Letting someone program a robot to wear a given badge is itself controlled, which is Service Account User. The default badge some buildings hand every new robot happens to open nearly every door, so careful teams issue custom badges instead.",
  "terms": [
   [
    "Service account",
    "An identity for applications and workloads, identified by an email address, that is both a principal and a resource."
   ],
   [
    "Service Account User",
    "A role on a service account that allows attaching it to resources or running operations as it."
   ],
   [
    "Service Account Admin",
    "A role that allows creating, updating and deleting service accounts and managing their settings."
   ],
   [
    "Metadata server",
    "An endpoint available to each VM that provides short-lived tokens for the attached service account."
   ],
   [
    "Compute Engine default service account",
    "An automatically created service account that VMs use unless another is specified, which may hold Editor depending on settings."
   ],
   [
    "Service agent",
    "A Google-managed service account that a Google service uses to act on your resources on your behalf."
   ]
  ],
  "example": "A team deploys an invoice service to Cloud Run with its own service account, invoice-sa, which has only Secret Manager Secret Accessor on one secret and Cloud SQL Client on the project. When the logs show an unexpected read, they know exactly which service made it.",
  "mistakes": [
   [
    "Downloading a service account key and copying it onto a VM so the app can authenticate.",
    "Attach the service account to the VM instead. The metadata server provides short-lived tokens automatically, with no key to manage or leak."
   ],
   [
    "Granting Service Account Admin to a developer who only needs to deploy a VM with a specific service account.",
    "Deploying with a service account needs Service Account User on that account. Service Account Admin is for creating and managing service accounts."
   ],
   [
    "Relying on access scopes as the main way to restrict what a VM can do.",
    "Access scopes are a legacy mechanism. Set the cloud-platform scope and restrict access with IAM roles on a dedicated service account."
   ],
   [
    "Treating service agents like your own default service accounts and removing their roles to tighten security.",
    "Service agents are how Google services operate on your behalf. Removing their roles can break features such as CMEK encryption."
   ]
  ],
  "tryit": [
   [
    "A developer has Compute Instance Admin on a project and tries to create a VM that runs as reports-sa. The request fails with a permission error mentioning iam.serviceAccounts.actAs. The developer asks for Owner to fix it. What is the least-privilege fix?",
    "Grant the developer Service Account User on reports-sa only. The actAs permission comes from that role, and it is required because the VM would run with reports-sa's permissions. Owner is far broader than needed."
   ],
   [
    "An audit finds 30 VMs running as the Compute Engine default service account with Editor. The team wants to keep the VMs running but reduce risk. What should they do?",
    "Create dedicated service accounts with only the roles each workload needs, switch each VM to its new service account (a stop and edit is needed for an existing VM), then remove Editor from the default account and consider the organization policy that stops automatic Editor grants for new projects."
   ]
  ],
  "tip": "Workloads should use attached, dedicated service accounts, not keys and not the default Editor account. Permission errors when attaching a service account mean the user lacks Service Account User on it.",
  "check": [
   [
    "Why does attaching a service account to a VM require Service Account User?",
    "Because the VM's code can then use the service account's permissions, which is a form of acting as it."
   ],
   [
    "How does code on a VM get credentials for its attached service account?",
    "From the metadata server, which issues short-lived access tokens automatically."
   ],
   [
    "What is the email format of the Compute Engine default service account?",
    "PROJECT_NUMBER-compute@developer.gserviceaccount.com."
   ]
  ]
 },
 {
  "t": "Service account impersonation, short-lived credentials and avoiding service account keys",
  "hook": "Sunday morning at Willow Creek Health, a monitoring tool emails you: a JSON key for the deploy service account appeared in a public code repository two hours ago. The developer who committed it, Jordan, has already pushed a new commit deleting the file and messages you that 'it's gone now'. You know it is not gone. The key still works from any laptop anywhere, and copies of public repositories spread quickly. As you start the response, a bigger question forms: why did Jordan need a key on his laptop at all, and how could the team deploy without any keys existing in the first place?",
  "simple": "A service account key is like a permanent copy of a building key. Whoever holds the file can get in from anywhere, at any time, until someone changes the locks, and files get copied, emailed and uploaded by accident all the time. A safer approach is impersonation: you sign in as yourself, and Google lets you borrow the service account's powers for about an hour at a time, if you have been given permission to do that. It is like a front desk that checks your own ID and hands you a visitor badge that expires at the end of the day. Nothing permanent exists to lose, and records show exactly who borrowed the badge.",
  "body": [
   "A service account key is a long-lived private key, usually downloaded as a JSON file, that anyone can use to authenticate as the service account from anywhere until the key is deleted or disabled. Keys are one of the most common causes of cloud security incidents because they are easy to copy: they end up in source code, on laptops, in continuous integration and continuous delivery (CI/CD) systems, in container images and in chat messages. Unlike a user's password, a key is not protected by two-step verification. Google's guidance is to avoid creating keys whenever another option exists, and many organizations block key creation entirely with the `iam.disableServiceAccountKeyCreation` organization policy constraint.",
   "For workloads running on Google Cloud, the alternative is to attach a service account to the resource, such as a VM, a Cloud Run service or a GKE workload, so the platform provides short-lived tokens through the metadata server. For workloads running outside Google Cloud, Workload Identity Federation lets them exchange their own identity tokens for Google credentials. For people who need to act as a service account, for example to test its permissions, run an automation script or deploy with exactly the access a pipeline would have, the alternative is impersonation.",
   "Impersonation means a principal uses its own credentials to obtain short-lived credentials for a service account. The principal needs the Service Account Token Creator role (`roles/iam.serviceAccountTokenCreator`) on that specific service account. With gcloud you add `--impersonate-service-account=deploy-sa@my-proj.iam.gserviceaccount.com` to a single command, or you set it for a whole configuration with `gcloud config set auth/impersonate_service_account deploy-sa@my-proj.iam.gserviceaccount.com`, after which every command runs as the service account until you unset it. Terraform providers and Google client libraries support impersonation as well, so automation can use the same pattern.",
   "Impersonation has two big advantages over keys. First, the credentials are short-lived: access tokens typically expire after an hour, so a leaked token is useful only briefly, and there is nothing long-lived to rotate. Second, it is traceable: Cloud Audit Logs record both the service account and the human who impersonated it, in the authentication information of each entry. Revoking a person's ability is as simple as removing their Token Creator grant or removing them from the group that holds it.",
   "Under the hood, the IAM Service Account Credentials API issues these credentials. It can generate OAuth 2.0 access tokens for calling Google APIs, OpenID Connect (OIDC) ID tokens for calling services that check identity, such as a Cloud Run service that requires authentication, and signed blobs or JSON Web Tokens (JWTs), which are useful for tasks such as creating signed URLs without a key file. Chains of impersonation, called delegation, are possible, where one service account impersonates another, but they make access harder to reason about and should be used sparingly.",
   "Sometimes a key genuinely must exist, for example for a third-party system that supports no other authentication method. In that case, manage it carefully. Store the key in a secrets manager such as Secret Manager rather than in code or on disk. Rotate it regularly by creating a new key, switching the system over, and deleting the old one. Set an expiry using the key expiry organization policy where available. Monitor key usage, and delete keys that are not being used; service account insights can show keys that have gone unused.",
   "It also helps to recognize keys when you review a project. `gcloud iam service-accounts keys list --iam-account=deploy-sa@my-proj.iam.gserviceaccount.com` lists a service account's keys and shows which are user-managed and when they were created. Google-managed keys, which Google rotates automatically and uses behind the scenes for attached service accounts, are not something you download or protect. User-managed keys are the ones that create risk, and an old user-managed key that no one can explain is a strong signal that a workflow should be moved to impersonation or federation.",
   "If a key leaks, the response order matters. First, disable or delete the key immediately, because that is the only action that makes it stop working. Removing the key from a repository, rewriting git history or deleting a chat message does not invalidate it, since copies may already exist. Second, review Cloud Audit Logs for activity by that service account since the key was exposed, and look for new resources, changed IAM policies or data access. Third, fix the root cause by moving the workflow to impersonation, an attached service account or Workload Identity Federation so that a key is no longer needed."
  ],
  "analogy": "A service account key is a copied metal key to the office: it works for whoever holds it, forever, until the lock changes. Impersonation is the lobby desk that checks your own photo ID, confirms you are on the approved list, and prints a visitor badge that stops working in an hour, while logging your name next to the badge. The analogy stops at the lock change: disabling a key is instant in Google Cloud, and it is the only thing that makes a leaked key useless.",
  "terms": [
   [
    "Service account key",
    "A long-lived private key that lets anyone holding it authenticate as the service account."
   ],
   [
    "Impersonation",
    "Using your own identity to obtain short-lived credentials for a service account."
   ],
   [
    "Service Account Token Creator",
    "The role that allows generating short-lived credentials for a service account."
   ],
   [
    "Short-lived credentials",
    "Access or ID tokens that expire quickly, typically after about an hour."
   ],
   [
    "IAM Service Account Credentials API",
    "The API that issues access tokens, ID tokens, signed blobs and signed JWTs for service accounts."
   ],
   [
    "iam.disableServiceAccountKeyCreation",
    "An organization policy constraint that prevents users from creating service account keys."
   ]
  ],
  "example": "A developer used to keep a key for deploy-sa on her laptop. Her team deletes the key, grants her group Service Account Token Creator on deploy-sa, and she now runs `gcloud config set auth/impersonate_service_account deploy-sa@my-proj.iam.gserviceaccount.com`. Audit logs show each deployment with both her identity and the service account.",
  "mistakes": [
   [
    "Granting Service Account User when the requirement is to run gcloud commands as a service account through impersonation.",
    "Generating short-lived tokens for a service account requires Service Account Token Creator. Service Account User is for attaching the account to resources."
   ],
   [
    "Believing a leaked key is safe once the commit that contained it is deleted.",
    "The key remains valid until it is disabled or deleted in IAM. Copies may already exist, so disable or delete it first, then review logs."
   ],
   [
    "Choosing 'store the key in a secure bucket' as the best way for an engineer to test a service account's access.",
    "The best practice is to avoid creating a key at all and use impersonation with Token Creator."
   ],
   [
    "Assuming impersonation hides who did the work.",
    "Audit logs record both the service account and the human principal who impersonated it."
   ]
  ],
  "tryit": [
   [
    "A platform team wants engineers to run Terraform locally with the same permissions the CI pipeline's service account has. Today, each engineer has a copy of the pipeline's key. Security wants all keys removed this quarter. What should the team set up?",
    "Delete the keys, grant the engineers' group Service Account Token Creator on the pipeline service account, and configure Terraform or gcloud to impersonate it. Consider enforcing iam.disableServiceAccountKeyCreation so new keys cannot be created."
   ]
  ],
  "tip": "'Without creating a key' plus 'act as a service account' means Token Creator and impersonation. A leaked key must be disabled or deleted; deleting the commit isn't enough.",
  "check": [
   [
    "Which role is required to impersonate a service account?",
    "Service Account Token Creator on that service account."
   ],
   [
    "What should you do first if a key is committed to a public repository?",
    "Disable or delete the key, then review audit logs for misuse."
   ],
   [
    "Which organization policy constraint prevents service account key creation?",
    "iam.disableServiceAccountKeyCreation."
   ]
  ]
 },
 {
  "t": "Workload Identity Federation for GKE and for workloads outside Google Cloud",
  "hook": "At Riverbend Media, Sam inherits two worrying setups on the same day. In the GKE cluster, a small analytics pod and the payments pod share a node, and both can read the payments bucket because they both use the node's service account. Over in the GitHub Actions workflow that deploys to Cloud Run, a service account key sits in the repository's secrets, and three former contractors once had access to that repository. Security wants both fixed this sprint without creating any new keys. How can each pod and each pipeline get its own short-lived Google identity?",
  "simple": "Programs need to prove who they are before Google Cloud lets them in, and long-lived key files are risky. Workload Identity Federation lets a program use an identity it already has instead of a key. Inside a Kubernetes cluster, each app already has a Kubernetes identity, and Google can trust that identity directly, so each app gets its own permissions rather than sharing the machine's. Outside Google Cloud, a build system like GitHub Actions can already prove which repository it is running for. Google can be told to trust that proof and swap it for a short-lived pass. It is like a hotel accepting your airline boarding pass as proof of identity and issuing a room key that expires at checkout.",
  "body": [
   "Workloads need identities too, and the goal is to give each one its own short-lived Google credentials without any long-lived keys. Google Cloud offers two related features that share the name Workload Identity Federation. One is for pods running in Google Kubernetes Engine (GKE). The other is for workloads running outside Google Cloud, such as CI/CD pipelines, other clouds and on-premises systems. Both follow the same principle: trust an identity the workload already has, and exchange it for short-lived Google credentials.",
   "Start with the GKE problem. Without special configuration, pods on a GKE node use the node's service account through the metadata server, so every pod on that node shares the same permissions. If one pod needs to read a sensitive bucket, granting that access to the node's service account gives it to every pod that lands on the node, including unrelated or less trusted ones. That breaks least privilege and makes audit logs ambiguous, because every action appears to come from the same node identity.",
   "Workload Identity Federation for GKE fixes this. When it is enabled on the cluster and on the node pool (it is always enabled in Autopilot clusters), GKE runs a GKE metadata server on each node that intercepts credential requests from pods and gives each pod credentials based on its Kubernetes service account. You then have two ways to grant access. You can grant IAM roles directly to the Kubernetes service account using a principal identifier that includes the project's workload identity pool, written as `PROJECT_ID.svc.id.goog`, along with the namespace and service account name. Or you can link the Kubernetes service account to a Google service account by granting it the Workload Identity User role on that Google service account and adding an annotation to the Kubernetes service account that names the Google service account. Either way, each application gets only the access its own identity is granted, and audit logs show which workload acted.",
   "Now consider workloads outside Google Cloud. Workload Identity Federation for external workloads lets applications authenticate without keys. Typical examples are CI/CD pipelines in GitHub Actions or GitLab, workloads running on Amazon Web Services (AWS) or Microsoft Azure, and on-premises systems that use an OpenID Connect (OIDC) or Security Assertion Markup Language (SAML) 2.0 identity provider. These platforms can already issue signed tokens that describe the workload, such as which repository and branch a GitHub Actions job is running for.",
   "Setting it up has a few parts. You create a workload identity pool, which is a container for external identities that Google Cloud trusts. Inside it you create a provider that trusts a specific external identity provider, such as GitHub's OIDC token issuer. You define attribute mappings that copy claims from the external token into Google attributes, for example mapping the repository claim to `attribute.repository`, and you add an attribute condition that restricts which external identities are accepted, such as only tokens from one organization's repository. At run time, the external workload exchanges its own token with Google's Security Token Service for a short-lived federated token. It then either uses that token directly on resources where the federated principal has been granted roles, or uses it to impersonate a service account, which requires granting the federated principal the Workload Identity User role on that service account.",
   "Attribute conditions are the safety catch. Without a condition, a provider for a large public identity provider could accept tokens from workloads you do not control, such as any repository on the same platform. A condition such as requiring the repository to equal `example-org/shop`, perhaps combined with a branch or environment claim, ensures that only your intended pipeline can obtain credentials. A fork or an unrelated project then cannot get in, even though it uses the same identity provider.",
   "Both approaches remove long-lived keys from the picture, so there is nothing to leak, store or rotate, and access is tied to verifiable identities such as a specific repository or Kubernetes namespace and service account. The exam typically presents a scenario with a CI pipeline, a workload in another cloud or pods that need different permissions, and asks for the most secure way to give access. The answer is the matching Workload Identity Federation feature, not a service account key stored as a secret and not broader roles on the node's service account."
  ],
  "analogy": "Think of a conference that accepts a government ID at registration instead of mailing everyone a permanent pass. The ID is the token the workload already has, the registration desk is the Security Token Service, and the badge it prints expires at the end of the day. The guest list rules, such as 'only employees of this one company', are the attribute conditions. Where the analogy stops: in GKE, the 'ID' is the pod's Kubernetes service account, issued inside your own cluster rather than by an outside authority.",
  "terms": [
   [
    "Workload Identity Federation for GKE",
    "A GKE feature that gives each Kubernetes service account its own IAM identity and short-lived credentials."
   ],
   [
    "Workload identity pool",
    "A container for external identities that Google Cloud trusts; GKE uses a pool named PROJECT_ID.svc.id.goog."
   ],
   [
    "Workload identity pool provider",
    "The configuration that trusts a specific external identity provider, such as GitHub's OIDC issuer."
   ],
   [
    "Attribute mapping",
    "Rules that copy claims from an external token into Google attributes used in conditions and principal identifiers."
   ],
   [
    "Attribute condition",
    "An expression on a provider that restricts which external identities can exchange tokens."
   ],
   [
    "Security Token Service",
    "The Google service that exchanges external tokens for short-lived federated tokens."
   ]
  ],
  "example": "A company's GitHub Actions workflow deploys to Cloud Run. A workload identity pool provider trusts GitHub's OIDC tokens only for the repository example-org/shop, and that identity can impersonate deploy-sa. No key exists anywhere, and a fork of the repository can't obtain credentials.",
  "mistakes": [
   [
    "Granting more roles to the node's service account so one pod can reach a bucket.",
    "That gives the access to every pod on the node. Enable Workload Identity Federation for GKE and grant the role to that pod's Kubernetes service account."
   ],
   [
    "Storing a service account key as a CI secret as the 'secure' option for GitHub Actions.",
    "Secrets can still be exposed and keys do not expire. Workload Identity Federation with a pool and provider removes the key entirely."
   ],
   [
    "Creating a provider for a public identity provider without an attribute condition.",
    "Without a condition, tokens from workloads you do not control might be accepted. Restrict by claims such as repository or organization."
   ],
   [
    "Thinking Workload Identity Federation for GKE must be enabled manually on Autopilot clusters.",
    "It is always enabled on Autopilot. On Standard clusters you enable it on the cluster and node pools."
   ]
  ],
  "tryit": [
   [
    "A GKE Standard cluster runs a reporting app and a billing app in different namespaces. Only the billing app should read the invoices bucket. Today both use the node's service account, which has Storage Object Viewer on the bucket. What should you change?",
    "Enable Workload Identity Federation for GKE on the cluster and node pools, give the billing app its own Kubernetes service account, grant that identity Storage Object Viewer on the bucket (directly or through a linked Google service account with Workload Identity User), and remove the bucket role from the node's service account."
   ],
   [
    "A team runs nightly jobs on AWS that load files into BigQuery. They currently use a downloaded Google service account key. How can they remove the key?",
    "Create a workload identity pool and an AWS provider, map attributes such as the AWS role, add an attribute condition for the specific role, and let the job exchange its AWS credentials through the Security Token Service, then access BigQuery directly or by impersonating a service account."
   ]
  ],
  "tip": "Pods needing their own Google identity: Workload Identity Federation for GKE. CI/CD or other clouds without keys: Workload Identity Federation with a pool and provider. Keys in secrets are the wrong answer.",
  "check": [
   [
    "Why is using the node's service account for all pods a problem?",
    "Every pod on the node shares the same permissions, breaking least privilege."
   ],
   [
    "What restricts which GitHub repositories can use a workload identity pool provider?",
    "Attribute mappings and attribute conditions on the provider, such as a condition on the repository claim."
   ],
   [
    "Which Google service exchanges an external token for a federated token?",
    "The Security Token Service."
   ]
  ]
 },
 {
  "t": "Identity-Aware Proxy and OS Login for secure administrative access",
  "hook": "At Summit Ridge College, the IT team still runs a bastion VM with a public IP address so admins can SSH into internal servers, and an aging VPN for staff to reach the HR web app. Last month a former contractor's SSH key was still sitting in project metadata, three weeks after he left. Now the dean of operations, Lena, wants the VPN retired by spring and asks you to explain who can reach which server and how fast access disappears when someone leaves. Can you give staff and admins access based on who they are, with no public IPs and no scattered SSH keys?",
  "simple": "Traditionally, if you were on the right network, for example connected to the office VPN, you could reach the company's systems. Identity-Aware Proxy flips that around: it checks who you are every single time you try to open an internal website or connect to a server, and only lets you through if you are on the approved list. It acts like a receptionist who checks your ID at every door instead of only at the front gate. OS Login handles the next step for Linux servers: once you reach the machine, it decides whether you may log in and whether you get administrator powers, based on your Google account. When someone leaves and their account is disabled, all of that access disappears at once.",
  "body": [
   "Identity-Aware Proxy (IAP) implements a zero-trust access model. Instead of trusting anyone who is on the right network, it checks who the user is, and optionally their device and context, on every request, and only then lets the request through to the application or virtual machine (VM). This removes the need for virtual private networks (VPNs) and bastion hosts for many access patterns, and it means a stolen network position, such as a compromised laptop on the office Wi-Fi, is not enough to reach internal systems.",
   "For web applications, IAP sits in front of an external Application Load Balancer's backend service, App Engine or Cloud Run. When a user opens the app, IAP redirects them to sign in with their Google identity, then checks IAM. The request is allowed only if the user holds the IAP-secured Web App User role on the app, typically granted to a group such as `hr-staff@example.com`. IAP then passes the request to the backend along with headers that identify the user, which the app can use for its own logging or authorization.",
   "IAP only protects traffic that flows through it, so the backend must accept traffic only from the load balancer. For VM-based backends, that usually means firewall rules that allow only the load balancer's health check and proxy ranges, and no external IP addresses on the backend VMs. Otherwise a user who knows a backend's address could bypass IAP entirely. With Access Context Manager you can add context-aware conditions through access levels, such as requiring a company-managed device or a certain IP range, which turns IAP into a building block for a broader zero-trust approach.",
   "For administrative access to VMs, IAP TCP forwarding tunnels SSH, Remote Desktop Protocol (RDP) or other TCP connections to VMs that have no external IP address. The user's connection goes to IAP, which checks identity and IAM, then forwards the traffic to the VM over Google's network. Users need the IAP-secured Tunnel User role on the project or instance, and a firewall rule must allow ingress from the IAP range `35.235.240.0/20` to the relevant port, such as 22 for SSH or 3389 for RDP. Commands such as `gcloud compute ssh vm-1 --tunnel-through-iap` or `gcloud compute start-iap-tunnel vm-1 3389 --local-host-port=localhost:3389` set up the tunnel; the console's SSH button can use IAP as well.",
   "OS Login complements IAP by controlling who can log in to Linux VMs once connected. Without it, SSH access is managed by public keys stored in project or instance metadata, which tend to accumulate and outlive the people who added them. OS Login links Linux user accounts to Google identities and grants access through IAM roles instead. Compute OS Login allows a normal login. Compute OS Admin Login allows login with sudo privileges. You enable it by setting the metadata key `enable-oslogin` to `TRUE` on the project or instance, or through the matching organization policy.",
   "Because OS Login uses IAM, governance becomes much simpler. Access is removed as soon as a role is revoked or the Google account is disabled, with no keys to hunt down. OS Login can enforce two-step verification for SSH, and logins are recorded in audit logs tied to real identities. For users outside your organization, such as a vendor's engineers, the Compute OS Login External User role is also needed, granted at the organization level, in addition to the OS Login role on the project or instance.",
   "It is worth contrasting this with the older patterns IAP replaces. A bastion host is a VM with a public IP address that admins SSH into first, then hop to private VMs; it must be patched, monitored and hardened, and anyone who reaches it gets a foothold inside the network. A VPN gives users broad network-level access once connected. IAP instead authorizes each connection to each VM or app individually, based on IAM, and Google operates the proxy, so there is no bastion to maintain and no network-wide access to misuse.",
   "Together these tools give a clean model for secure administration. VMs have no public IP addresses. IAP decides who can reach the VM or app, based on identity and context. OS Login decides who can log in and with what privileges. Firewall rules allow only the IAP range or load balancer ranges. Cloud Audit Logs record it all. On the exam, 'identity-based access to an internal web app without a VPN' points to IAP, 'SSH to VMs without external IPs' points to IAP TCP forwarding, and 'manage SSH access with IAM and sudo control' points to OS Login."
  ],
  "analogy": "Picture a secure office building. IAP is the security desk at every door that checks your badge and your name on the list each time you enter, rather than letting anyone inside the lobby roam freely. OS Login is the rule inside each server room about who may sit at the console and who may use the admin chair. The analogy stops in one place: IAP only guards doors it stands in front of, so you must brick up the side entrances with firewall rules and no public IPs.",
  "terms": [
   [
    "Identity-Aware Proxy",
    "A service that authorizes each request based on user identity and context before it reaches an app or VM."
   ],
   [
    "IAP-secured Web App User",
    "The role that allows a user through IAP to a protected web app."
   ],
   [
    "IAP-secured Tunnel User",
    "The role that allows TCP forwarding through IAP to VMs."
   ],
   [
    "IAP TCP forwarding",
    "A feature that tunnels SSH, RDP or other TCP traffic through IAP to VMs without external IP addresses."
   ],
   [
    "OS Login",
    "A feature that ties Linux VM logins to Google identities and IAM roles instead of metadata SSH keys."
   ],
   [
    "Compute OS Admin Login",
    "The OS Login role that grants login with sudo privileges."
   ]
  ],
  "example": "A company retires its VPN for an internal HR app by putting it behind an external Application Load Balancer with IAP enabled, granting IAP-secured Web App User to the hr-staff group, and requiring company-managed devices through an access level. Admins reach the app's VMs through IAP tunnels with OS Login.",
  "mistakes": [
   [
    "Thinking enabling IAP alone is enough, while the backend VMs still have public IPs and open firewall rules.",
    "Users could bypass IAP by connecting directly. Remove external IPs and allow only load balancer or IAP ranges in firewall rules."
   ],
   [
    "Granting Compute OS Login when the user needs sudo.",
    "Compute OS Login gives a normal login. Sudo requires Compute OS Admin Login."
   ],
   [
    "Opening port 22 to 0.0.0.0/0 so IAP TCP forwarding can work.",
    "Only the IAP range 35.235.240.0/20 needs to be allowed to the port."
   ],
   [
    "Choosing IAP-secured Web App User for SSH tunneling.",
    "Tunneling requires IAP-secured Tunnel User. Web App User is for web apps behind IAP."
   ]
  ],
  "tryit": [
   [
    "A VM named db-admin has no external IP. An engineer runs gcloud compute ssh db-admin --tunnel-through-iap and the connection times out. She has IAP-secured Tunnel User and Compute OS Login. What is the most likely missing piece?",
    "A firewall rule allowing ingress from 35.235.240.0/20 to port 22 on the VM. The roles are in place, so the traffic from IAP is probably being blocked by the firewall."
   ],
   [
    "An outside vendor's engineer, using his own company's Google account, must SSH into two VMs with sudo through OS Login. Which roles does he need?",
    "Compute OS Admin Login on the project or the two instances, the Compute OS Login External User role at the organization level, and IAP-secured Tunnel User if he connects through IAP."
   ]
  ],
  "tip": "Identity-based access to an internal web app without VPN: IAP. SSH without external IPs: IAP TCP forwarding with firewall access from 35.235.240.0/20. SSH access controlled by IAM: OS Login, with Admin Login for sudo.",
  "check": [
   [
    "Which role lets a user run sudo on a VM using OS Login?",
    "Compute OS Admin Login."
   ],
   [
    "What stops users from bypassing IAP to reach the backend directly?",
    "Firewall rules that allow traffic only from the load balancer and IAP ranges, and no public IPs on the backends."
   ],
   [
    "Which IP range must firewall rules allow for IAP TCP forwarding?",
    "35.235.240.0/20."
   ]
  ]
 },
 {
  "t": "Encryption: Google default encryption, Cloud KMS customer-managed keys and customer-supplied keys",
  "hook": "At Pinecrest Medical Group, the compliance officer, Grace, forwards you a new requirement from a hospital partner: 'You must be able to render our patient records unreadable on demand, and you must control key rotation yourselves.' Your architect says Google already encrypts everything. A developer suggests generating keys on a laptop and sending them with every request. The partner's contract review is next Thursday, and you need to explain which option meets the requirement without creating an operational nightmare. Is default encryption enough, or do you need keys of your own, and who should hold them?",
  "simple": "Encryption scrambles data so only someone with the right key can read it. Google Cloud always scrambles your stored data automatically, using keys Google looks after, so by default you do not have to do anything. Some organizations want more control. With customer-managed keys, you create the key in Google's key service and decide when it changes or gets switched off, while Google still does the scrambling; switch the key off and the data becomes unreadable. With customer-supplied keys, you keep the key yourself and hand it over with each request, and Google never saves it. Lose it, and the data is gone for good. It is like the difference between a bank holding your safe deposit key, the bank holding it but obeying your instructions, and you carrying it yourself.",
  "body": [
   "All data stored in Google Cloud is encrypted at rest by default, with no action on your part. Google uses envelope encryption: data is encrypted with data encryption keys (DEKs), and those DEKs are themselves encrypted with key encryption keys (KEKs) held in Google's internal key management systems. Data in transit between Google data centers and to Google services is also encrypted. For many workloads, this default encryption with Google-owned and Google-managed keys is enough, and it is the right exam answer when a scenario has no special key-control requirement.",
   "Some organizations must control the keys themselves, for compliance or to be able to cut off access to data. Customer-managed encryption keys (CMEK) let you create key rings and keys in Cloud Key Management Service (Cloud KMS) and tell services such as Cloud Storage, Compute Engine persistent disks, BigQuery, Cloud SQL and GKE to use them. A key ring is a grouping of keys in one location, and the key's location should match where the data lives. Google still performs the encryption, but you control the key's lifecycle: the rotation schedule, enabling and disabling versions, destroying versions, and IAM on the key. If you disable the key, the service can no longer decrypt the data, which is how organizations meet requirements to make data unreadable on demand.",
   "To use CMEK, each service relies on a service agent, a Google-managed service account, that needs the Cloud KMS CryptoKey Encrypter/Decrypter role on the key. For example, to set a default CMEK on a Cloud Storage bucket, you grant that role to the Cloud Storage service agent for the project, then set the bucket's default key. If the service agent lacks the role, writes to the bucket fail with a permission error, which is a common troubleshooting scenario. Cloud KMS key rotation creates a new primary key version for new encryption; older versions remain available to decrypt data encrypted earlier.",
   "Cloud KMS offers several protection levels. Keys can be protected in software, in hardware security modules through Cloud HSM, which are validated to Federal Information Processing Standard (FIPS) 140 Level 3, or kept outside Google entirely in a supported external key manager through Cloud External Key Manager (Cloud EKM). Key usage is recorded in Cloud Audit Logs, so you can see which identity used which key. Destroying a key version is not immediate: it is scheduled after a waiting period to protect against mistakes, and during that period you can restore it. Once a version is actually destroyed, data encrypted with it cannot be recovered.",
   "Customer-supplied encryption keys (CSEK) are a different model supported by only a few services, notably Cloud Storage and Compute Engine disks. You generate the key yourself, outside Google Cloud, and supply it with each request, for example when creating a disk or reading an object. Google uses the key in memory to encrypt or decrypt, and does not store it. If you lose the key, Google cannot recover your data. CSEK gives maximum control but adds significant operational burden, since you must securely store and deliver the key for every operation, which is why CMEK is the usual answer for compliance-driven key control.",
   "Finally, client-side encryption means you encrypt data before sending it to Google Cloud, so Google only ever sees ciphertext. This is entirely your responsibility and is independent of the server-side options. You might use client-side encryption for highly sensitive fields while still relying on default encryption or CMEK for everything else.",
   "A few practical details often appear in scenarios. Cloud KMS keys are regional, dual-regional, multi-regional or global resources, and a service usually requires the key to be in a compatible location with the data it protects, such as a key in the same region as a Cloud SQL instance. Key rings and keys cannot be deleted, only key versions destroyed, so naming matters. Separation of duties is also common: one team holds Cloud KMS Admin to manage keys, while a different team, or only the service agents, hold Encrypter/Decrypter to use them.",
   "For the exam, think of these options as a spectrum of increasing customer control and responsibility. Default encryption requires nothing. CMEK gives you control over the key's lifecycle and access while Google does the work. CSEK means you hold the key and Google never stores it. Client-side encryption means Google never sees plaintext at all. Read each scenario for the key phrase: 'control rotation' or 'be able to disable the key' points to CMEK, 'Google must not store the key' points to CSEK, and no requirement points to default encryption."
  ],
  "analogy": "Think of storing valuables at a bank. Default encryption is the bank's vault with its own keys. CMEK is a safe deposit box where the bank does the locking but follows your instructions, and you can tell it to stop opening the box at any moment. CSEK is bringing your own key every visit; the bank never keeps a copy, so if you lose it, nobody can open the box. The analogy stops at destruction: destroying a CMEK key version in Cloud KMS has a waiting period before it becomes permanent.",
  "mnemonic": "Do Customers Control Crypto: Default, CMEK, CSEK, Client-side, in order of increasing customer control and responsibility.",
  "terms": [
   [
    "Default encryption",
    "Automatic encryption at rest of all data with Google-owned and Google-managed keys."
   ],
   [
    "Envelope encryption",
    "Encrypting data with data encryption keys that are themselves encrypted with key encryption keys."
   ],
   [
    "CMEK",
    "Customer-managed encryption keys in Cloud KMS that you control and Google services use."
   ],
   [
    "CSEK",
    "Customer-supplied encryption keys that you provide with each request and Google doesn't store."
   ],
   [
    "Key ring",
    "A grouping of Cloud KMS keys in one location."
   ],
   [
    "Cloud HSM",
    "A Cloud KMS protection level that keeps keys in validated hardware security modules."
   ]
  ],
  "example": "A healthcare company must be able to make patient data unreadable on demand. It creates a key in Cloud KMS, sets it as the default CMEK on its records bucket and grants the Cloud Storage service agent Encrypter/Decrypter on the key. Security can disable the key to block all decryption instantly.",
  "mistakes": [
   [
    "Choosing CSEK whenever a scenario says the company wants control over keys.",
    "CSEK is for cases where Google must never store the key. For controlling rotation and the ability to disable keys with less burden, CMEK is the usual answer."
   ],
   [
    "Granting the Encrypter/Decrypter role to the user who creates the bucket instead of the service agent.",
    "The service agent performs the encryption, so it needs Cloud KMS CryptoKey Encrypter/Decrypter on the key."
   ],
   [
    "Assuming data is unencrypted unless you configure Cloud KMS.",
    "All data at rest is encrypted by default with Google-managed keys."
   ],
   [
    "Believing that destroying a key version takes effect instantly and cannot be undone.",
    "Destruction is scheduled after a waiting period during which it can be restored. After it is destroyed, the data encrypted with it is unrecoverable."
   ]
  ],
  "tryit": [
   [
    "A team enables a CMEK key on a new Cloud Storage bucket. Uploads immediately fail with a permission error, even though the uploader has Storage Admin. Nothing else has changed. What is the most likely fix?",
    "Grant the Cloud Storage service agent the Cloud KMS CryptoKey Encrypter/Decrypter role on the key. The service agent, not the uploader, uses the key to encrypt objects."
   ]
  ],
  "tip": "'Control rotation and be able to disable the key, but Google does the encryption' is CMEK. 'Google must never store the key' is CSEK. Nothing required means default encryption.",
  "check": [
   [
    "What permission does a service need to use a CMEK key?",
    "Its service agent needs the Cloud KMS CryptoKey Encrypter/Decrypter role on the key."
   ],
   [
    "What happens if you lose a customer-supplied key?",
    "The data encrypted with it can't be recovered, because Google doesn't store the key."
   ],
   [
    "What happens to data protected by CMEK if you disable the key version?",
    "The service can no longer decrypt it until the key version is re-enabled."
   ]
  ]
 },
 {
  "t": "Secret Manager for passwords, API keys and certificates",
  "hook": "Thursday at Copperline Payments, Rosa from the security team runs a routine scan of the company's container registry and finds the payment processor's live API key baked into an image layer from eight months ago. The same key also appears in a deployment YAML file in the team's repository and in a Cloud Storage bucket called config-prod. Nobody knows who has pulled those images, and rotating the key means editing three places and redeploying everything at once. The processor's account manager wants confirmation by Monday that the key is stored properly. Where should a secret like this live, and how do apps read it without ever writing it down?",
  "simple": "Apps need passwords and keys to talk to databases and other services. If you type those secrets directly into code or config files, anyone who can see the files can see the secrets, and changing them later is a chore. Secret Manager is a safe place in Google Cloud to keep them. Each secret has a name, and every time you change the value, a new version is saved, a bit like a document with version history. You then give one specific app permission to read one specific secret, and every read is recorded. It is like keeping a spare house key in a lockbox that only certain family members can open, instead of under the doormat.",
  "body": [
   "Applications need secrets: database passwords, third-party API keys, Transport Layer Security (TLS) private keys and certificates, and tokens. Putting them in source code, container images, plain environment variables in deployment files or configuration buckets is risky, because anyone who can read those places can read the secret, copies spread into backups and forks, and rotating a value means hunting down every copy. Secret Manager is Google Cloud's managed service for storing secrets securely, controlling who can read them, and recording every access.",
   "A secret in Secret Manager is a named container, and the actual values are stored as versions. Each version is immutable once created. When you rotate a password, you add a new version, move applications to it, and once nothing uses the old one, disable or destroy it. Applications can request a specific version number, such as version 3, or the alias `latest`, which always points to the newest enabled version. Disabling a version is reversible, which is useful during a rollout; destroying it permanently removes the value.",
   "Creating and populating a secret takes two commands. `gcloud secrets create db-password --replication-policy=automatic` creates the container, and `gcloud secrets versions add db-password --data-file=pw.txt` adds a value from a file, which avoids leaving the password in your shell history. Replication can be automatic, where Google chooses where to store the data, or user-managed, where you choose specific regions, which helps meet data residency requirements. Secrets are encrypted at rest by default, and you can optionally protect them with customer-managed encryption keys (CMEK) from Cloud Key Management Service (Cloud KMS).",
   "Access is controlled by Identity and Access Management (IAM). The key role is Secret Manager Secret Accessor (`roles/secretmanager.secretAccessor`), which allows reading secret values. Grant it to the specific service account of the workload, on the specific secret, not on the whole project, so that each app can read only its own secrets. Secret Manager Admin can create, update and delete secrets and manage their policies; grant it only to administrators. There are also narrower roles, such as Secret Manager Viewer, which lets people see secret metadata without reading values. Every access is recorded in Cloud Audit Logs, as Data Access logs when those are enabled, so you can see which identity read a secret and when.",
   "Integrations make secrets easy to use without writing them anywhere. Cloud Run and Cloud Run functions can mount a secret as a file or expose it as an environment variable at deployment, for example `gcloud run deploy api --set-secrets=DB_PASSWORD=db-password:latest`. The service's runtime service account must have Secret Accessor on that secret, or the deployment or startup fails. Mounting as a file has a practical advantage: when you reference `latest`, a mounted volume can pick up a new version without redeploying, while an environment variable is resolved when an instance starts. GKE can read secrets through the Secret Manager add-on or the Secrets Store Container Storage Interface (CSI) driver, and any application can call the Secret Manager API with Google client libraries.",
   "Secret Manager also supports lifecycle features. Rotation schedules can send notifications to a Pub/Sub topic at the times you choose, which can trigger your own rotation code, for example a Cloud Run function that generates a new database password, updates the database, and adds a new secret version. Secrets can have expiration times so temporary credentials are removed automatically, and labels and annotations help organize them by team or application.",
   "Recognizing the right tool also means recognizing the wrong ones. A plain environment variable written directly into a Cloud Run service's configuration is visible to anyone who can view the service, and a value baked into a container image is readable by anyone who can pull the image. Kubernetes Secrets stored only in the cluster are base64-encoded rather than encrypted by default at the application layer. When an exam scenario lists these options next to Secret Manager with a narrowly granted Secret Accessor role, the Secret Manager answer is the one that limits exposure and supports rotation.",
   "Finally, know where Secret Manager stops. It is for application secrets that your code needs to read in plain form. It is different from Cloud KMS, which manages encryption keys used to encrypt and decrypt data, and which never gives you the raw key material of a software or hardware security module key. On the exam, 'store a database password or API key securely' points to Secret Manager, while 'control the key used to encrypt a bucket or disk' points to Cloud KMS."
  ],
  "analogy": "Secret Manager is like a lockbox with a logbook and a numbered stack of envelopes inside. Each time the code changes, you add a new envelope on top rather than erasing the old one, and you can hand a specific person permission to open only this box. Cloud KMS is different: it is a machine that seals and unseals envelopes for you but never lets you take its master stamp home. The analogy stops at the logbook: audit logging of reads depends on Data Access logs being enabled.",
  "terms": [
   [
    "Secret",
    "A named container in Secret Manager that holds versions of a sensitive value."
   ],
   [
    "Secret version",
    "An immutable value of a secret; new versions are added to rotate."
   ],
   [
    "latest",
    "An alias that resolves to the newest enabled version of a secret."
   ],
   [
    "Secret Manager Secret Accessor",
    "The IAM role that allows reading a secret's value."
   ],
   [
    "Replication policy",
    "Whether a secret's data is replicated automatically or only to regions you choose."
   ],
   [
    "Rotation schedule",
    "A setting that sends Pub/Sub notifications at set times so your code can rotate a secret."
   ]
  ],
  "example": "A payments team stores its processor API key in Secret Manager, grants Secret Accessor on that one secret to the checkout service's service account, and deploys to Cloud Run with --set-secrets. When the processor rotates the key, the team adds a new version, and the next deployment picks up latest.",
  "mistakes": [
   [
    "Storing API keys in Cloud KMS because it is the 'key management' service.",
    "Cloud KMS manages encryption keys and never returns raw key material for software or HSM keys. Application secrets such as passwords and API keys belong in Secret Manager."
   ],
   [
    "Granting Secret Manager Admin to an application's service account so it can read secrets.",
    "Reading values requires only Secret Manager Secret Accessor, granted on the specific secret."
   ],
   [
    "Granting Secret Accessor at the project level for convenience.",
    "That lets the workload read every secret in the project. Grant it on each secret the workload needs."
   ],
   [
    "Rotating by editing the existing value in place.",
    "Versions are immutable. Rotation means adding a new version, moving clients to it, then disabling or destroying the old one."
   ]
  ],
  "tryit": [
   [
    "A Cloud Run service deploys with --set-secrets=API_KEY=vendor-key:latest, but new revisions fail to start with a permission error on the secret. The developer who deployed has Secret Manager Admin. What is missing?",
    "The Cloud Run service's runtime service account needs Secret Manager Secret Accessor on vendor-key. The developer's own role does not matter at run time, because the service reads the secret as its service account."
   ],
   [
    "A European bank must keep all copies of its secrets within two specific regions. Which Secret Manager setting addresses this?",
    "A user-managed replication policy that lists only those regions. Automatic replication lets Google choose locations, which may not meet the residency requirement."
   ]
  ],
  "tip": "Passwords and API keys belong in Secret Manager with Secret Accessor granted to the workload's service account on the specific secret. Cloud KMS is for encryption keys, not for storing app passwords.",
  "check": [
   [
    "How do you rotate a secret in Secret Manager?",
    "Add a new version, move applications to it, then disable or destroy the old version."
   ],
   [
    "Which role should a Cloud Run service's service account have to read a secret?",
    "Secret Manager Secret Accessor on that specific secret."
   ],
   [
    "Which replication policy lets you choose the regions where a secret is stored?",
    "User-managed replication."
   ]
  ]
 },
 {
  "t": "Cloud Storage access: uniform bucket-level access, public access prevention and signed URLs",
  "hook": "Monday at Alder and Finch, a small law firm, partner Helen needs to send a 2 GB settlement file to a client who has no Google account, today. A junior admin suggests just making the bucket public for an hour. Meanwhile, an old document-portal app still shares individual files with object ACLs, and nobody can say for sure who can read what in that bucket. Helen still remembers a colleague's story about a client file left open to the internet, and she does not want to live it. How do you share one file safely, and how do you make it impossible for anyone to make a bucket public by mistake?",
  "simple": "Cloud Storage holds files, called objects, in containers called buckets. There are two older ways to say who can open them: permissions on the whole bucket, and separate permission lists on individual files. Mixing them gets confusing, so uniform bucket-level access turns off the per-file lists and leaves one clear set of rules. Public access prevention is a safety lock that stops anyone from opening a bucket to the whole internet, even by accident. And when you need to share one file with someone outside your organization, a signed URL is a special link that works only for that file and only until a set time, like a parking pass that expires at midnight.",
  "body": [
   "Cloud Storage has two access control systems, and understanding both explains why Google recommends turning one of them off. Identity and Access Management (IAM) grants roles on the project or on a bucket, and with managed folders on groups of objects that share a prefix. Typical roles are Storage Object Viewer, Storage Object Creator, Storage Object User and Storage Admin. Access control lists (ACLs) are an older, finer-grained system that can grant access on individual objects as well as buckets. Using both at once makes it hard to know who can read what, because an object might be readable through an ACL that never appears in any IAM policy.",
   "Uniform bucket-level access disables ACLs on a bucket so that only IAM, at the bucket and project levels plus managed folders, controls access. It is recommended for almost all buckets and is required for some features, such as IAM Conditions on buckets and managed folders. You can enable it when creating a bucket or later with `gcloud storage buckets update gs://b --uniform-bucket-level-access`. Once enabled, you have a limited window, 90 days, to turn it off again before it becomes permanent, which gives teams time to discover any app that still relied on ACLs. The alternative mode, called fine-grained access, keeps ACLs for special cases such as per-object sharing in legacy applications.",
   "A bucket or object becomes public when access is granted to one of two special principals. `allUsers` means anyone on the internet, signed in or not. `allAuthenticatedUsers` means anyone with any Google account, which is effectively the public too, since anyone can create one. Public access prevention blocks grants to both. You can enforce it on a single bucket, or across projects, folders or the whole organization with the `storage.publicAccessPrevention` organization policy constraint. With it enforced, even an administrator cannot make data public by mistake, and existing public grants stop working.",
   "Public access prevention and uniform bucket-level access solve different problems, and the exam likes to test the difference. Uniform bucket-level access simplifies how access is granted, but IAM can still grant `allUsers` a role, so it does not by itself stop a bucket from becoming public. Public access prevention stops public grants, whichever system tries to make them. Most organizations want both. If you genuinely need to host a public website or public downloads, use a bucket in a project where prevention is not enforced, or a design built for public serving, such as a load balancer with Cloud CDN in front of the bucket.",
   "Signed URLs give time-limited access to a specific object to someone who does not have a Google identity, without making the bucket public. The URL contains query parameters that include the expiry time and a cryptographic signature created with a service account's credentials. Anyone holding the URL can perform the specified action, for example GET to download or PUT to upload, until it expires. With V4 signing, the maximum lifetime is 7 days. Because the URL itself is the permission, treat it like a password: send it only to the intended recipient and choose the shortest practical duration.",
   "You can create a signed URL with `gcloud storage sign-url gs://bucket/report.pdf --duration=1h --private-key-file=key.json`, but a better approach avoids keys entirely by signing through impersonation of a service account, using the `--impersonate-service-account` flag, so the signature is produced by the IAM credentials service. The service account that signs needs permission to access the object, since the URL grants only what the signer could do. For browser form uploads, signed policy documents provide the same kind of time-limited permission with rules such as maximum file size.",
   "Seeing the settings in practice helps. `gcloud storage buckets describe gs://b` shows fields such as `uniform_bucket_level_access: true` and `public_access_prevention: enforced` or `inherited`, where inherited means the bucket follows any organization policy rather than setting its own value. In the console, a bucket that is public carries a clear 'Public to internet' label in the bucket list. When public access prevention is enforced and someone tries to grant allUsers a role, the request fails with an error explaining that public access prevention is enforced, which is the behavior you want.",
   "Other controls round out Cloud Storage security. Retention policies and object holds prevent deletion for a set period, which supports legal and compliance needs. Requester Pays makes the person accessing data pay for network and operation costs. VPC Service Controls perimeters reduce the risk of data being copied out to unauthorized projects. Customer-managed encryption keys (CMEK) give you control over the key protecting objects. Data Access audit logs, when enabled, record who read which objects."
  ],
  "analogy": "A bucket is like an apartment building. ACLs are spare keys taped to individual doors; uniform bucket-level access removes them so only the front-desk list counts. Public access prevention is a building rule that forbids ever propping the main door open, no matter who asks. A signed URL is a timed parking pass for one visitor: it works for one spot until midnight, and anyone holding the pass can use it, which is why you hand it only to the right person.",
  "terms": [
   [
    "Uniform bucket-level access",
    "A bucket setting that disables ACLs so only IAM controls access."
   ],
   [
    "Fine-grained access",
    "A bucket mode that keeps object and bucket ACLs alongside IAM."
   ],
   [
    "Public access prevention",
    "A setting or organization policy that blocks access grants to allUsers and allAuthenticatedUsers."
   ],
   [
    "Signed URL",
    "A URL that grants time-limited access to an object without requiring a Google identity."
   ],
   [
    "allUsers",
    "A special principal meaning anyone on the internet."
   ],
   [
    "allAuthenticatedUsers",
    "A special principal meaning anyone signed in with any Google account."
   ]
  ],
  "example": "A law firm needs to share a 2 GB file with a client who has no Google account. The bucket has uniform bucket-level access and public access prevention enforced, so the admin generates a V4 signed URL valid for 24 hours. The client downloads the file, and the link stops working the next day.",
  "mistakes": [
   [
    "Believing uniform bucket-level access prevents a bucket from being made public.",
    "It only disables ACLs. IAM can still grant allUsers access unless public access prevention is enforced."
   ],
   [
    "Thinking allAuthenticatedUsers limits access to people in your organization.",
    "It means anyone with any Google account, which is effectively public."
   ],
   [
    "Making a bucket public briefly to share one file with an outside client.",
    "Use a signed URL with a short duration. It grants access to one object for a limited time without exposing the bucket."
   ],
   [
    "Assuming a signed URL can be valid for 30 days.",
    "With V4 signing, the maximum lifetime is 7 days."
   ]
  ],
  "tryit": [
   [
    "A media company's security lead wants to guarantee that no bucket in any project can ever be made public, including new projects created next year. One team hosts a public marketing site from a bucket today. What should the lead do?",
    "Enforce the storage.publicAccessPrevention organization policy constraint at the organization, then move the marketing site to a design meant for public serving, such as a project where the policy is explicitly not enforced or a load balancer with Cloud CDN, after reviewing that exception."
   ],
   [
    "An app uploads files from customers' browsers directly to Cloud Storage. Customers have no Google accounts, and uploads should be allowed only for 15 minutes after the app approves them. What should the app generate?",
    "A V4 signed URL for a PUT on the specific object path with a 15-minute duration, or a signed policy document if the upload uses a browser form. The bucket stays private."
   ]
  ],
  "tip": "Only IAM, no ACLs: uniform bucket-level access. Never public, even by mistake: enforce public access prevention (org policy for everything). Temporary access for someone without an account: signed URL, maximum 7 days with V4.",
  "check": [
   [
    "What is the maximum lifetime of a V4 signed URL?",
    "7 days."
   ],
   [
    "Does uniform bucket-level access by itself stop a bucket from being made public?",
    "No. IAM can still grant allUsers access unless public access prevention is enforced."
   ],
   [
    "Which organization policy constraint enforces public access prevention across projects?",
    "storage.publicAccessPrevention."
   ]
  ]
 },
 {
  "t": "Policy Troubleshooter, IAM recommendations and audit roles for reviewing access",
  "hook": "Quarter-end at Meridian Freight, and three requests hit your desk before 10 a.m. A data scientist, Omar, says he gets 'permission denied' on a BigQuery table even though 'someone gave me access last week'. The internal auditor, Beth, wants a list of everyone who can read the payroll bucket, including through groups, and she needs read-only access to review IAM policies without being able to change anything. And the CISO wants evidence that the company is reducing excess permissions, not just adding them. You could click through dozens of IAM pages, or you could use the tools built for exactly these questions. Which tool answers which request?",
  "simple": "Giving people access is only half the job; you also need to check it. Google Cloud has helper tools for three common questions. 'Why can or can't this person do this?' Policy Troubleshooter checks all the rules and explains the answer. 'Who can get into this?' Policy Analyzer searches every rule, including group memberships, and lists the people. 'What access is nobody using?' The IAM recommender compares what each person is allowed to do with what they have actually done, and suggests removing the extras. For auditors who should look but not touch, there are read-only roles like Security Reviewer. Think of it like a building manager checking who has keys, why a key did not work, and which keys have not been used in months.",
  "body": [
   "Granting access is only half the job; you also need to understand and review it. Google Cloud's Policy Intelligence tools help you answer three recurring questions: 'why can or can't this person do this?', 'who has access to this?', and 'what access is no longer needed?'. Each question has its own tool, and Associate Cloud Engineer exam items usually describe one of these questions in plain words and ask which tool to use.",
   "Policy Troubleshooter answers the first question. You give it three inputs: a principal, such as `omar@example.com`; a resource, such as a BigQuery dataset or table; and a permission, such as `bigquery.tables.getData`. It evaluates all the relevant allow policies up the resource hierarchy, from the resource through its project and folders to the organization, along with deny policies and principal access boundary policies. It then reports whether access is granted, which binding grants it, or, if access is denied, which binding is missing or which deny rule blocks it. It also accounts for group membership where it can view it. That makes it the first stop when a user reports 'permission denied'. Many console error pages include a link that opens Policy Troubleshooter with the details already filled in.",
   "Policy Analyzer answers the second question: who has access to what. It searches Identity and Access Management (IAM) policies across a project, folder or organization. For example, you can ask it to list every principal that can read a sensitive bucket, and it includes access granted through group membership and inherited from parent resources, which you would miss by reading only the bucket's own policy. You can also ask the reverse question, such as which resources a particular user or service account can access. Policy Analyzer relies on Cloud Asset Inventory, which also lets you search and export resource metadata and IAM policies, for example to BigQuery for reporting or to Cloud Storage for an audit archive.",
   "The IAM recommender, part of Active Assist, answers the third question: what can be removed. It compares the permissions each principal has with the permissions they have actually used over a recent observation period of 90 days. It then recommends removing roles that were not used at all or replacing broad roles, such as Editor, with smaller predefined roles that cover only what was used. Recommendations appear in the console on the IAM page and can be listed with gcloud. Applying them steadily, rather than once, is what moves an organization toward least privilege, because new grants keep appearing.",
   "Related insights add context. Service account insights can flag service accounts that have not been used for a long time, which may be good candidates to disable after confirming with their owners, and lateral movement insights can point out where a service account in one project can impersonate accounts in another. Treat recommendations as suggestions rather than commands: an annual process might use a permission that the 90-day window did not observe, so review high-impact changes with the people who own the workload.",
   "For people who review access rather than change it, use read-only roles. Security Reviewer (`roles/iam.securityReviewer`) can list resources and view IAM policies without changing them, which is exactly what auditors need, and it is often granted at the organization level so the auditor can see the whole hierarchy. Viewer-type roles support investigations without granting write access: Logs Viewer for most logs, Private Logs Viewer for Data Access audit logs, which may contain sensitive details, and Cloud Asset Viewer for Cloud Asset Inventory searches. Avoid granting the basic Viewer role to auditors as a shortcut, because it exposes much more data than a policy review requires.",
   "Security Command Center adds a centralized view of misconfigurations and threats across the organization, such as publicly accessible buckets, overly permissive firewall rules, or service account keys that should not exist. It complements the Policy Intelligence tools: Security Command Center surfaces risky configurations, while Policy Troubleshooter, Policy Analyzer and the IAM recommender help you understand and fix IAM specifically. On the exam, match the wording: 'why is this user denied' is Policy Troubleshooter, 'who can access this resource' is Policy Analyzer, 'which roles are unused' is the IAM recommender, and 'auditor can view but not change' is Security Reviewer."
  ],
  "analogy": "Imagine managing keys for a large office building. Policy Troubleshooter is the locksmith who takes one person and one door and explains exactly why the key does or does not turn. Policy Analyzer is the master key register that lists everyone who can open the payroll office, including through shared team keys. The IAM recommender is the report showing keys no one has used in three months. The analogy stops at timing: the recommender only sees the observation window, so rarely used keys may look unused.",
  "terms": [
   [
    "Policy Troubleshooter",
    "A tool that explains whether a principal has a permission on a resource and why, considering allow, deny and boundary policies."
   ],
   [
    "Policy Analyzer",
    "A tool that finds which principals have which access across the hierarchy, including through groups and inheritance."
   ],
   [
    "Cloud Asset Inventory",
    "A service for searching and exporting resource metadata and IAM policies, which Policy Analyzer relies on."
   ],
   [
    "IAM recommender",
    "An Active Assist feature that suggests removing or reducing roles based on permission usage over 90 days."
   ],
   [
    "Security Reviewer",
    "A read-only role for listing resources and viewing IAM policies."
   ],
   [
    "Private Logs Viewer",
    "A role that allows reading Data Access audit logs and other private logs as well as regular logs."
   ]
  ],
  "example": "Each quarter, a security engineer applies IAM recommender suggestions that shrink Editor grants to predefined roles, runs Policy Analyzer to list everyone who can read the payroll bucket, and grants the external auditors Security Reviewer at the organization. When a developer reports a permission error, Policy Troubleshooter shows the missing BigQuery role in seconds.",
  "mistakes": [
   [
    "Using Policy Analyzer to figure out why one user is denied a specific permission.",
    "Policy Analyzer lists who has access. Explaining a single principal-resource-permission decision, including deny rules, is Policy Troubleshooter's job."
   ],
   [
    "Granting auditors the basic Viewer role so they can review IAM.",
    "Viewer exposes much more data than needed. Security Reviewer lets them view IAM policies and list resources without broad data access."
   ],
   [
    "Assuming the IAM recommender sees all-time usage.",
    "It uses a 90-day observation period, so rarely used permissions may appear unused. Review recommendations with workload owners."
   ],
   [
    "Reading only a bucket's own IAM policy to list who can access it.",
    "Access can be inherited from the project, folder or organization and granted through groups. Policy Analyzer accounts for these."
   ]
  ],
  "tryit": [
   [
    "A developer can view a Cloud Run service but gets an error when deploying a new revision. Her manager insists the team group was granted Cloud Run Developer on the project. What should you check first, and with which tool?",
    "Run Policy Troubleshooter with the developer, the Cloud Run service and the deploy permission. It will show whether the group binding applies, whether she is actually in the group, whether a deny policy blocks her, or whether another permission, such as Service Account User on the runtime service account, is missing."
   ]
  ],
  "tip": "'Why is this user denied' is Policy Troubleshooter. 'Who can access this resource' is Policy Analyzer. 'Which roles are unused' is the IAM recommender. 'Auditor can view but not change' is Security Reviewer.",
  "check": [
   [
    "What inputs does Policy Troubleshooter need?",
    "A principal, a resource and a permission."
   ],
   [
    "What data does the IAM recommender use?",
    "Permission usage over a recent observation period (90 days) compared with the permissions granted."
   ],
   [
    "Which role lets an auditor view IAM policies across the organization without changing them?",
    "Security Reviewer, granted at the organization level."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
