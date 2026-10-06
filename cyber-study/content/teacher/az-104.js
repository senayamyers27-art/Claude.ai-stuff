/* Teacher edition for Microsoft Certified: Azure Administrator Associate (AZ-104): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("az-104", [
 {
  "t": "Microsoft Entra users and groups: create, bulk create, security vs Microsoft 365 groups, assigned vs dynamic membership",
  "objectives": [
   "Students will be able to create cloud users individually and in bulk, and explain the role of the UPN and verified domains.",
   "Students will be able to compare security groups and Microsoft 365 groups by purpose and allowed member types.",
   "Students will be able to choose between assigned, dynamic user and dynamic device membership for a given requirement, including the P1 licensing requirement.",
   "Students will be able to identify when a user attribute must be changed in on-premises AD DS instead of Entra ID."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question aloud and collect three or four answers on the whiteboard. Point out that granting access person by person does not scale, which is why groups exist."
   ],
   [
    12,
    "Teach",
    "Walk through user creation (portal, CLI, bulk CSV), then draw a two-column table: security group versus Microsoft 365 group, listing purpose and member types. Add a second table for assigned, dynamic user and dynamic device membership, and write a sample rule such as user.department -eq \"Sales\" on the board."
   ],
   [
    18,
    "Activity",
    "Run the group-design card sort described below. Circulate and ask each pair to justify one placement out loud."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest cards as a class, especially the device and nested-group cards, and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Your company hires 200 people next month and moves 50 existing staff between departments. If every permission were granted directly to individual people, what would go wrong, and how would you know who has access to what?",
  "activity": {
   "title": "Group design card sort",
   "materials": "Printed requirement cards (about 12, prepared by the teacher), sticky notes, a whiteboard divided into four zones: Security/Assigned, Security/Dynamic, Microsoft 365/Assigned, Microsoft 365/Dynamic.",
   "steps": [
    "Prepare cards with requirements such as 'all Windows devices get a policy', 'project team needs shared mailbox', 'every Sales user gets a license automatically', 'nest the Help Desk group inside IT Admins', 'one contractor needs temporary access' and 'Teams workspace for the marketing department'.",
    "In pairs, students place each card in one of the four zones and write on a sticky note the reason, naming the member type (users, devices, groups) involved.",
    "Pairs flag any card that is impossible as stated, such as a device rule on a Microsoft 365 group, and write what they would do instead.",
    "Each pair adds one card of their own for another pair to sort, then the class compares placements on the board."
   ]
  },
  "discussion": [
   "When would you deliberately choose assigned membership even though dynamic membership is available and licensed?",
   "What risks come with dynamic rules that depend on HR data, and how would you reduce them?"
  ],
  "exit": [
   [
    "Which group type and membership type would you use to automatically include every Windows device?",
    "A security group with dynamic device membership; Microsoft 365 groups cannot contain devices."
   ],
   [
    "Name two things a Microsoft 365 group provides that a security group does not.",
    "Any two of: a shared mailbox, a shared calendar, a SharePoint site, a Teams team, its own email address."
   ],
   [
    "A synchronized user's job title is wrong. Where do you fix it?",
    "In on-premises AD DS, which is the source of authority; the change syncs to Entra ID."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page reference table of group types and membership types to keep beside them during the card sort, and pair them with a confident partner for the first three cards.",
   "Extend: ask fast finishers to write dynamic membership rules for three cards, combining two attributes with -and, and to explain what happens to existing members if an assigned group is switched to dynamic."
  ]
 },
 {
  "t": "User and group properties, licenses (including group-based licensing), external (B2B guest) users and self-service password reset",
  "objectives": [
   "Students will be able to diagnose a failed license assignment, including a missing usage location.",
   "Students will be able to configure group-based licensing and explain how it interacts with dynamic groups and direct assignments.",
   "Students will be able to explain how B2B guest users are invited and how they authenticate.",
   "Students will be able to configure SSPR scope, methods and password writeback for synchronized users."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list the students' guesses on the whiteboard without confirming any yet."
   ],
   [
    15,
    "Teach",
    "Explain user properties and usage location, then group-based licensing and its error state. Cover B2B guest invitation and redemption, then SSPR scope (None, Selected, All), methods, number of methods, the stricter admin policy and password writeback. Return to the warm-up guesses and confirm the usage location answer."
   ],
   [
    15,
    "Activity",
    "Run the help desk ticket triage activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups present one ticket each and the class challenges the proposed fixes using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A new hire's Microsoft 365 license assignment fails, but the admin center shows 30 unused licenses. What could possibly stop the assignment?",
  "activity": {
   "title": "Help desk ticket triage",
   "materials": "Printed ticket cards (eight, prepared by the teacher), a whiteboard with columns for Licensing, Guests and SSPR, markers.",
   "steps": [
    "Prepare tickets such as 'license fails, spare licenses exist', 'partner needs access without our password', 'sales staff should get licenses automatically', 'reset works in the cloud but not on the laptop', 'admin cannot pick security questions for reset' and 'need SSPR for three departments'.",
    "Groups of three draw a ticket, decide which column it belongs in, and write the root cause and fix on a sticky note.",
    "Each group writes the exact portal location they would visit for the fix, such as the user's Properties page or Password reset > Properties.",
    "Groups rotate tickets once and check another group's answer, adding a second sticky note if they disagree."
   ]
  },
  "discussion": [
   "What are the trade-offs between allowing all users to invite guests and restricting invitations to administrators and Guest Inviters?",
   "Why might an organization require two SSPR methods for everyone, not only for administrators?"
  ],
  "exit": [
   [
    "What user property must be set before any license can be assigned?",
    "Usage location, the user's two-letter country property."
   ],
   [
    "How does a B2B guest sign in to your tenant?",
    "With their own identity from their home organization, a Microsoft account or an email one-time passcode."
   ],
   [
    "SSPR works for cloud users but synchronized users' new passwords do not work on-premises. What do you enable?",
    "Password writeback in Microsoft Entra Connect or Cloud Sync."
   ]
  ],
  "differentiation": [
   "Support: provide a flowchart that starts at 'license failed' and branches through usage location, license count and service plan conflicts, and let struggling students use it during the triage.",
   "Extend: ask fast finishers to plan a migration from direct license assignment to group-based licensing for 500 users without anyone losing access, explaining why the order of steps matters."
  ]
 },
 {
  "t": "Azure RBAC: built-in roles (Owner, Contributor, Reader, User Access Administrator), assigning roles at different scopes and interpreting access",
  "objectives": [
   "Students will be able to describe a role assignment as a principal, a role definition and a scope.",
   "Students will be able to compare the permissions of Owner, Contributor, Reader and User Access Administrator.",
   "Students will be able to determine a user's effective access from multiple assignments at different scopes.",
   "Students will be able to choose a least-privilege built-in or custom role and scope for a given task."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick show of hands for each answer before revealing that the user can delete the VM in one place but not the other."
   ],
   [
    12,
    "Teach",
    "Draw the scope hierarchy as a vertical stack on the whiteboard. Write the four built-in roles in a two-by-two grid: can manage resources yes or no, can grant access yes or no. Show a short role JSON on the projector and point out Actions and NotActions in Contributor. Stress that RBAC is additive and NotActions is not a deny."
   ],
   [
    18,
    "Activity",
    "Run the effective access puzzle described below."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share the puzzle answer they found hardest and walk through it on the board, then use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Ana has Reader on a subscription and Contributor on resource group RG1 inside it. Can she delete a VM in RG1? In RG2? Decide before we start.",
  "activity": {
   "title": "Effective access puzzle",
   "materials": "Projector or printed handout showing a hierarchy diagram (one management group, two subscriptions, four resource groups), a list of eight role assignments to users and groups, and a group membership table; whiteboard.",
   "steps": [
    "The teacher draws or projects the hierarchy and lists assignments such as 'Dev-Leads: Owner on Sub-A', 'Ana: Reader on the management group', 'HelpDesk: VM restart custom role on RG-Prod' and the group memberships, including one nested group.",
    "In pairs, students answer six prompts, such as 'Can Jordan delete a storage account in RG-Prod?' and 'Who can add a role assignment in Sub-B?', writing which assignment grants or fails to grant each permission.",
    "Each pair proposes one change that removes Jordan's accidental Owner access without removing Owner from the real leads, and explains at which scope the change must be made.",
    "Pairs swap answers with a neighboring pair and mark any disagreement for the class discussion."
   ]
  },
  "discussion": [
   "Why do organizations prefer assigning roles to groups instead of individual users, and what new risk do nested groups introduce?",
   "When is creating a custom role worth the maintenance effort compared with using a broader built-in role?"
  ],
  "exit": [
   [
    "Which built-in role can manage all resources but cannot grant access to others?",
    "Contributor."
   ],
   [
    "A user has Reader on a subscription and Contributor on RG1. What can they do in RG2 of the same subscription?",
    "Only view resources, because RG2 inherits Reader and Contributor applies only to RG1."
   ],
   [
    "Can you remove access inherited from a subscription by adding an assignment at a resource group?",
    "No. RBAC is additive; you must change the assignment at the subscription scope."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a printed two-by-two grid of the four built-in roles and a blank 'who, what, where' template to fill in for each assignment in the puzzle.",
   "Extend: ask fast finishers to write the Actions list for a custom role that lets a team start, restart and power off VMs and read their status, and to name the narrowest sensible assignable scope."
  ]
 },
 {
  "t": "Entra roles vs Azure RBAC roles, and data-plane roles such as Storage Blob Data Reader",
  "objectives": [
   "Students will be able to distinguish Microsoft Entra roles from Azure RBAC roles by what they manage and where they are assigned.",
   "Students will be able to explain the difference between control-plane and data-plane access for a storage account.",
   "Students will be able to select a least-privilege data-plane role and scope for an identity that reads or writes blobs.",
   "Students will be able to describe when and how a Global Administrator uses elevated access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to vote: is this a bug, a missing role, or the wrong kind of role."
   ],
   [
    13,
    "Teach",
    "Draw two large boxes on the whiteboard labeled Directory (Entra roles) and Resources (Azure RBAC), and list example roles and assignment locations in each. Then split the Resources box into control plane and data plane, using a storage account as the running example. Explain the listKeys path and why Contributor can browse blobs. Close with elevated access as the single bridge."
   ],
   [
    17,
    "Activity",
    "Run the 'which rule book' sorting relay described below."
   ],
   [
    5,
    "Discuss",
    "Review contested cards and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card or sticky note."
   ]
  ],
  "warmup": "Rosa is Owner of the production subscription, but she cannot reset a colleague's password and her app with Reader cannot read blobs. Is Azure broken, or is something else going on?",
  "activity": {
   "title": "Which rule book: sorting relay",
   "materials": "Printed task cards (about 14), three sheets of paper taped to the wall labeled 'Entra role', 'RBAC control plane' and 'RBAC data plane', tape or sticky notes, markers.",
   "steps": [
    "The teacher prepares task cards such as 'reset a user's password', 'register an application', 'create a VM', 'change a storage firewall', 'read blobs in a container with Entra ID', 'read a Key Vault secret in the RBAC model' and 'regain access to an orphaned subscription'.",
    "Teams of three or four line up; each student in turn takes a card, tapes it under the correct sheet and writes the least-privilege role name on it.",
    "After all cards are placed, each team reviews another team's wall and marks any role they think is too broad or in the wrong system.",
    "The class resolves disagreements together, with the teacher confirming the correct role and scope for each card."
   ]
  },
  "discussion": [
   "Why might Microsoft keep directory permissions and resource permissions in separate systems instead of one?",
   "What risks does Shared Key authorization create, and why might an organization disable it on storage accounts?"
  ],
  "exit": [
   [
    "Which kind of role does someone need to create users in Entra ID: an Entra role or an Azure RBAC role?",
    "An Entra role, such as User Administrator."
   ],
   [
    "A managed identity has Reader on a storage account but cannot read blobs. What least-privilege role fixes this?",
    "Storage Blob Data Reader, assigned at the container or account scope."
   ],
   [
    "What does turning on 'Access management for Azure resources' give a Global Administrator?",
    "The User Access Administrator role at root scope, so they can grant access to any subscription; it should be turned off afterward."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-column cheat sheet listing five common Entra roles and five common RBAC roles with one-line descriptions, and let them use it during the relay.",
   "Extend: ask fast finishers to explain step by step what happens when a Contributor opens a container in the portal with shared key access enabled and then disabled, and which role would be needed in the second case."
  ]
 },
 {
  "t": "Azure Policy: definitions, initiatives, assignments, scopes and exclusions, effects (Deny, Audit, Modify, DeployIfNotExists) and remediation tasks",
  "objectives": [
   "Students will be able to explain the relationship between policy definitions, initiatives and assignments.",
   "Students will be able to select the correct policy effect (Deny, Audit, Modify, DeployIfNotExists) for a requirement.",
   "Students will be able to distinguish exclusions from exemptions and apply each appropriately.",
   "Students will be able to describe how remediation tasks fix existing resources and why they need a managed identity."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers. Highlight that RBAC alone cannot express 'only in these regions'."
   ],
   [
    13,
    "Teach",
    "Draw the flow definition, then initiative, then assignment on the whiteboard, with scope and exclusions hanging off the assignment. Present each effect with a one-line example. Explain request-time versus existing-resource evaluation, and remediation with a managed identity. Show a short policy JSON on the projector and identify the if and then blocks."
   ],
   [
    17,
    "Activity",
    "Run the policy effect matching activity described below."
   ],
   [
    5,
    "Discuss",
    "Groups share their rollout plans and the class uses the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A developer with Owner rights deployed a database to a region your company is not allowed to use. Which Azure feature should have stopped it, given that the developer was correctly allowed to create databases?",
  "activity": {
   "title": "Choose the effect, plan the rollout",
   "materials": "Printed requirement cards (10), printed effect cards (Deny, Audit, AuditIfNotExists, DeployIfNotExists, Modify, Append, Disabled), whiteboard, markers.",
   "steps": [
    "In groups of three, students match each requirement card to one effect card. Examples: 'block VMs larger than an approved size', 'report storage accounts with public access', 'add a CostCenter tag automatically', 'install a monitoring extension if missing', 'turn this rule off while testing'.",
    "For each match, the group writes whether existing resources will be changed, and if so, what extra step is required (a remediation task with a managed identity).",
    "Each group then writes a three-step rollout plan for the 'allowed regions' requirement, including the scope, one exclusion or exemption, and when they would move from Audit to Deny.",
    "Groups post their plans on the board and compare them."
   ]
  },
  "discussion": [
   "What could go wrong if you assign a Deny policy at the root management group without auditing first?",
   "When would you record an exemption instead of simply adding an exclusion to the assignment?"
  ],
  "exit": [
   [
    "Which effect blocks a non-compliant resource from being created?",
    "Deny."
   ],
   [
    "What do you need to bring existing resources into compliance with a DeployIfNotExists policy?",
    "A remediation task, run by the assignment's managed identity with the required roles."
   ],
   [
    "What is an initiative?",
    "A policy set definition that groups several policy definitions so they can be assigned and tracked together."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page effect table with columns for 'blocks new', 'changes new', 'changes existing with remediation' and 'only reports' to use during matching.",
   "Extend: ask fast finishers to sketch the if and then structure of a custom policy that denies storage accounts without a specific tag, and to explain how they would parameterize the tag name."
  ]
 },
 {
  "t": "Resource locks: CanNotDelete vs ReadOnly, inheritance and who can remove them",
  "objectives": [
   "Students will be able to compare CanNotDelete and ReadOnly locks and predict which operations each blocks.",
   "Students will be able to explain lock inheritance across subscriptions, resource groups and resources.",
   "Students will be able to identify which built-in roles can create and remove locks.",
   "Students will be able to recognize that locks protect the control plane, not data inside a resource."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let two or three students answer. Write 'RBAC = who' and 'Lock = safety catch' on the board."
   ],
   [
    12,
    "Teach",
    "Explain the two lock levels with a table of allowed and blocked actions. Show the az lock commands on the projector. Draw the hierarchy and show inheritance, the 'most restrictive wins' rule, and the case where a locked resource blocks resource group deletion. Cover ReadOnly side effects and the control plane versus data plane limit, then which roles can remove locks."
   ],
   [
    18,
    "Activity",
    "Run the 'will it work?' lock scenario game described below."
   ],
   [
    5,
    "Discuss",
    "Review the scenarios that split the room and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An Owner has every permission on a subscription. Why would an organization want to stop that Owner from deleting a resource, and how could Azure do it without taking the Owner role away?",
  "activity": {
   "title": "Will it work? Lock scenarios",
   "materials": "Projector with a list of 12 scenarios prepared by the teacher, colored index cards (green for 'works', red for 'blocked') for each student, whiteboard.",
   "steps": [
    "The teacher projects a setup: a subscription with a CanNotDelete lock on rg-prod, a ReadOnly lock on rg-archive, and no lock on rg-dev.",
    "For each scenario, such as 'Contributor starts a VM in rg-archive', 'Owner deletes a blob in a storage account in rg-prod', 'Contributor creates a new VM in rg-prod' or 'Contributor deletes the lock on rg-prod', students hold up green or red at the same time.",
    "After each vote, one student explains the reasoning, naming the lock level, whether the operation is control plane or data plane, and which role is involved.",
    "In the last five minutes, pairs write their own tricky scenario on an index card and swap it with another pair to answer."
   ]
  },
  "discussion": [
   "What process should a team follow when an Owner needs to remove a lock to perform a legitimate change?",
   "Since locks do not protect data, what combination of features would you use to protect a critical storage account fully?"
  ],
  "exit": [
   [
    "Which lock level allows changes but blocks deletion?",
    "CanNotDelete (shown as Delete in the portal)."
   ],
   [
    "Which built-in roles can remove a lock?",
    "Owner and User Access Administrator."
   ],
   [
    "Does a CanNotDelete lock on a storage account stop blob deletion? Why?",
    "No. Locks act on control-plane operations, and deleting blobs is a data-plane operation."
   ]
  ],
  "differentiation": [
   "Support: provide a printed two-row table (CanNotDelete, ReadOnly) with columns for read, modify, delete and example side effects, which struggling students can use during the scenario game.",
   "Extend: ask fast finishers to explain why a ReadOnly lock blocks listing storage account keys even though it sounds like a read, and to propose a lock and data-protection design for a resource group containing VMs, a storage account and a key vault."
  ]
 },
 {
  "t": "Tags: applying tags, why tags are not inherited, and enforcing or inheriting tags with policy",
  "objectives": [
   "Students will be able to apply and update tags using Merge, Replace and Delete operations and predict the result.",
   "Students will be able to explain why tags are not inherited and what that means for cost reporting.",
   "Students will be able to choose Azure Policy definitions to require or inherit tags, including remediation for existing resources.",
   "Students will be able to select the least-privilege role for a team that only manages tags."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a mock cost report on the projector with a large 'untagged' slice and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Explain tags and their uses, then demonstrate Merge versus Replace with the az tag commands on the projector. State plainly that tags are not inherited, then present the Deny and Modify tag policies and remediation, and the Tag Contributor role."
   ],
   [
    18,
    "Activity",
    "Run the 'label the boxes' tagging simulation described below."
   ],
   [
    5,
    "Discuss",
    "Groups share their tagging standard and the class uses the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Every resource group in our company has a CostCenter tag, yet most spending shows as untagged in the cost report. What do you think is happening?",
  "activity": {
   "title": "Label the boxes: a tagging simulation",
   "materials": "Sticky notes in two colors, a whiteboard drawn with three resource group boxes each containing four resource icons, printed policy cards ('Require a tag on resource groups' Deny, 'Inherit a tag from the resource group if missing' Modify, 'Add or replace a tag' Modify), markers.",
   "steps": [
    "The teacher puts a CostCenter sticky note on each resource group box only, and asks students to say which resources would appear as tagged in a cost report (none).",
    "In groups, students choose which policy cards to assign and at what scope, then a volunteer adds sticky notes to new resources that the Modify policy would tag as they are created.",
    "The teacher announces 'remediation task runs', and students tag the existing resources with the second color, discussing what identity performs the change.",
    "Finally each group writes a four-tag standard (for example CostCenter, Owner, Environment, AutoShutdown) and states which tags they would require with Deny and which they would inherit with Modify."
   ]
  },
  "discussion": [
   "What problems can inconsistent tag values, such as Prod versus Production, cause, and how could policy help prevent them?",
   "Why might an organization use both a Deny tag policy and a Modify tag policy instead of only one?"
  ],
  "exit": [
   [
    "Does a resource created in a tagged resource group receive that tag automatically?",
    "No. Tags are not inherited; a Modify policy is needed to copy it."
   ],
   [
    "Which built-in policy copies a tag from the resource group to resources that lack it, and what effect does it use?",
    "'Inherit a tag from the resource group if missing', which uses the Modify effect."
   ],
   [
    "A resource has three tags and you run a tag update with Replace specifying one tag. How many tags remain?",
    "One; Replace overwrites the entire tag set."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a printed Merge/Replace/Delete before-and-after table with three worked examples to refer to during the simulation.",
   "Extend: ask fast finishers to design a policy initiative that enforces a full tagging standard, deciding which tags use Deny, which use Modify, at which scope, and how they would roll it out without breaking existing deployments."
  ]
 },
 {
  "t": "Resource groups: create, move resources between groups and subscriptions",
  "objectives": [
   "Students will be able to create resource groups and explain what the resource group location does and does not control.",
   "Students will be able to determine whether a resource move between resource groups or subscriptions will succeed.",
   "Students will be able to predict what changes after a move, including resource IDs, inherited access and policy.",
   "Students will be able to choose the right tool when a resource must change regions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick vote, then hold the answer until the teach segment."
   ],
   [
    13,
    "Teach",
    "Explain resource groups as lifecycle containers, the metadata location, and deletion. Demonstrate the az group create and az resource move commands on the projector. Draw a resource ID on the board and circle the subscription and resource group parts to show why IDs change. List the move rules: supported types, dependencies, same tenant, providers, permissions."
   ],
   [
    17,
    "Activity",
    "Run the move review board activity described below."
   ],
   [
    5,
    "Discuss",
    "Groups present one approved and one rejected move, then use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you move a VM from a resource group in East US to a resource group whose location is West Europe, where does the VM run afterwards?",
  "activity": {
   "title": "Move review board",
   "materials": "Printed move request cards (eight, prepared by the teacher), a printed checklist (same tenant, supported type, dependencies included, provider registered, permissions on both groups), whiteboard with Approve and Reject columns.",
   "steps": [
    "The teacher prepares requests such as 'move a VM without its disks', 'move a web app and its plan to another subscription in the same tenant', 'move a storage account to a subscription in another tenant', 'move a database to change its region' and 'move resources where the target lacks Microsoft.Web'.",
    "Groups act as a change advisory board: for each request they run the checklist, decide Approve or Reject, and write the fix for any rejection.",
    "For approved moves, each group lists the follow-up work: update scripts that use the old resource ID, re-create direct role assignments and check policy compliance in the new scope.",
    "Groups place their cards in the Approve or Reject column on the whiteboard and compare decisions."
   ]
  },
  "discussion": [
   "What are the advantages of grouping resources by application environment rather than by resource type?",
   "How would you prepare automation and monitoring before a large move so nothing breaks afterward?"
  ],
  "exit": [
   [
    "Can a resource group in West US contain a VM in East Asia?",
    "Yes; the resource group location only stores metadata."
   ],
   [
    "Why might a script fail with 'resource not found' after a successful move?",
    "The resource ID changed because it includes the subscription and resource group, so the script uses the old ID."
   ],
   [
    "What must be true of two subscriptions before you can move resources between them?",
    "They must trust the same Microsoft Entra tenant (plus supported types, dependencies moved together and providers registered)."
   ]
  ],
  "differentiation": [
   "Support: give struggling students the move checklist with a short explanation of each item and one worked approval and one worked rejection to model the reasoning.",
   "Extend: ask fast finishers to plan relocating an application from East US to West Europe, comparing a redeployment with Azure Resource Mover, and listing what they would verify afterward."
  ]
 },
 {
  "t": "Subscriptions and management groups: hierarchy, inheritance of policy and RBAC",
  "objectives": [
   "Students will be able to describe the four levels of the Azure hierarchy and the purpose of subscriptions and management groups.",
   "Students will be able to predict which resources are affected by an RBAC or policy assignment made at a given level.",
   "Students will be able to explain the effect of moving a subscription between management groups.",
   "Students will be able to design a simple management group structure that applies rules with the least administrative effort."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record proposed approaches on the whiteboard, including 'do it 30 times'."
   ],
   [
    12,
    "Teach",
    "Draw the hierarchy as a tree with the Tenant Root Group at the top. Explain subscriptions as billing, quota and tenant boundaries, then management groups, the single-parent rule, the default management group and nesting. Show inheritance with colored arrows flowing down only, and demonstrate what happens when a subscription moves branches."
   ],
   [
    18,
    "Activity",
    "Run the hierarchy design whiteboard activity described below."
   ],
   [
    5,
    "Discuss",
    "Teams present their designs and the class uses the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your company has 30 subscriptions and must apply the same region rule and the same auditor access to all of them, including ones created next year. How would you do it with the least work?",
  "activity": {
   "title": "Design the hierarchy",
   "materials": "Whiteboard or large sheets of paper, sticky notes in three colors (management groups, subscriptions, assignments), a printed requirements brief prepared by the teacher, markers.",
   "steps": [
    "The teacher hands each team a brief: 12 subscriptions (production, development and sandbox for four business units), auditors need Reader everywhere, production must use only two regions, sandboxes must not be affected by the region rule, and a new business unit arrives next quarter.",
    "Teams build a management group tree with sticky notes and place assignment notes at the levels they choose, writing the role or policy on each.",
    "The teacher then announces a change: one sandbox subscription is promoted to production. Teams move its sticky note and list every inherited assignment it gains and loses.",
    "Teams swap boards with a neighbor and check that every requirement is met with the fewest assignments."
   ]
  },
  "discussion": [
   "What are the risks of assigning powerful policies or roles at the Tenant Root Group?",
   "Why might an organization change the default management group for new subscriptions instead of leaving it at the root?"
  ],
  "exit": [
   [
    "How many parent management groups can a subscription have?",
    "Exactly one."
   ],
   [
    "You assign Reader at a management group. Does a subscription added under it next month get that access?",
    "Yes; assignments are inherited by all current and future children."
   ],
   [
    "What happens to inherited policies when a subscription moves to a different management group?",
    "It immediately loses the old parent's assignments and inherits the new parent's."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a partly completed tree with the root and one branch already drawn, plus a list of the requirements to tick off as they place assignments.",
   "Extend: ask fast finishers to add a landing zone layer to their design, explaining which guardrails belong at the root, which at a business-unit level, and what freedom each application team gets in its own subscription."
  ]
 },
 {
  "t": "Cost management: cost analysis, budgets and budget alerts, Azure Advisor cost recommendations, reservations",
  "objectives": [
   "Students will be able to use cost analysis views, grouping and filters, including grouping by tag, to explain spending.",
   "Students will be able to configure a budget with actual and forecasted alert conditions and an action group.",
   "Students will be able to interpret Azure Advisor cost recommendations and decide how to act on them.",
   "Students will be able to explain when a reservation, savings plan, Azure Hybrid Benefit or Spot VM is appropriate."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and ask students to name every reason a cloud bill could jump 40 percent in one month."
   ],
   [
    13,
    "Teach",
    "Walk through cost analysis (scope, views, group by tag, forecast), then budgets with actual and forecasted alerts and action groups, stressing that budgets never stop resources. Show Advisor's five categories and typical cost recommendations, then compare reservations, savings plans, Hybrid Benefit, Spot VMs and auto-shutdown in a table on the board."
   ],
   [
    17,
    "Activity",
    "Run the cost detective activity described below."
   ],
   [
    5,
    "Discuss",
    "Groups share their savings plans and the class uses the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "This month's cloud bill is 40 percent higher than last month's, and nobody received a warning. What could have caused it, and what would you want Azure to have told you, and when?",
  "activity": {
   "title": "Cost detective",
   "materials": "Printed one-page mock cost report prepared by the teacher (costs grouped by resource group, service and tag, including an untagged slice), a printed list of eight mock Advisor recommendations, whiteboard, markers.",
   "steps": [
    "In groups of three, students study the mock report and identify the three biggest cost drivers and the share of untagged spend.",
    "Groups review the mock Advisor recommendations (for example underused VMs, unattached disks, idle public IP addresses, a reservation suggestion) and decide for each one: act, postpone or dismiss, with a reason.",
    "Groups design a budget for one resource group: amount, reset period, at least two alert conditions (one actual, one forecasted), recipients and what an action group should do.",
    "Each group writes a one-paragraph savings recommendation on the whiteboard, choosing between a reservation, savings plan, Hybrid Benefit, Spot VMs or auto-shutdown for the workloads in the report."
   ]
  },
  "discussion": [
   "Why do budgets notify instead of stopping resources automatically, and when would automatic stopping be dangerous?",
   "What makes a workload a good or poor candidate for a three-year reservation?"
  ],
  "exit": [
   [
    "A budget reaches 100 percent. What happens to running resources by default?",
    "Nothing; budgets only send alerts or trigger action groups, and stopping resources requires attached automation."
   ],
   [
    "Where do you find a recommendation to resize an underused VM?",
    "Azure Advisor, in the Cost category."
   ],
   [
    "Does buying a reservation create or guarantee a VM?",
    "No; it is a billing discount applied automatically to matching running resources."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a glossary card for budget, action group, forecasted alert, reservation and savings plan, and a filled-in example budget to adapt.",
   "Extend: ask fast finishers to compare a reservation and a savings plan for a workload that may move regions next year, and to describe how they would scope the reservation to maximize its use across subscriptions."
  ]
 },
 {
  "t": "Storage account types and redundancy: LRS, ZRS, GRS, RA-GRS, GZRS and RA-GZRS",
  "objectives": [
   "Students will be able to describe where LRS, ZRS, GRS, GZRS, RA-GRS and RA-GZRS keep their copies and which failures each survives.",
   "Students will be able to compare standard general-purpose v2 and premium accounts, including the premium limit on geo-redundancy.",
   "Students will be able to select the cheapest redundancy option that meets a written availability requirement.",
   "Students will be able to explain why geo-replication can lose recent writes and what Last Sync Time shows."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without correcting them yet."
   ],
   [
    15,
    "Teach",
    "Draw two regions on the board, each with three zones. Place copies for each option as you name it: LRS in one datacenter, ZRS across zones, GRS and GZRS adding the paired region. Mark which secondaries are readable. Stress asynchronous replication, Last Sync Time, failover making the account LRS, and the premium and Archive restrictions."
   ],
   [
    15,
    "Activity",
    "Run the requirement card match described below. Circulate and ask each pair to justify why a cheaper option would not work."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface the difference between availability and backup."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your company's photos live in one building. List every event you can think of that could make them unreadable, from smallest to largest. Which of those would you pay extra to survive?",
  "activity": {
   "title": "Requirement card match",
   "materials": "Printed cards: six option cards (LRS, ZRS, GRS, RA-GRS, GZRS, RA-GZRS) per pair and ten requirement cards the teacher writes (for example 'cheapest, survive a zone failure', 'read during regional outage without failover', 'premium block blobs in two regions'); whiteboard for the shared answer key.",
   "steps": [
    "Give each pair a set of option cards and a shuffled stack of requirement cards.",
    "Pairs place each requirement card under the cheapest option that satisfies it, or under a 'not possible as stated' heading.",
    "For each placement, pairs write one sentence explaining why the next cheaper option fails.",
    "Pairs swap tables with a neighbor and mark any placement they disagree with.",
    "The teacher reveals the key on the whiteboard and the class resolves disputed cards together."
   ]
  },
  "discussion": [
   "If every copy of a blob is overwritten by a buggy app at the same moment, which redundancy option helps, and what does that tell you about redundancy versus backup?",
   "When would a business accept the risk of losing a few minutes of writes in a regional failover, and when would it not?"
  ],
  "exit": [
   [
    "Which option is the cheapest that survives a single availability zone failure?",
    "ZRS."
   ],
   [
    "An application must read data during a regional outage without anyone initiating failover. Name the options that work.",
    "RA-GRS or RA-GZRS."
   ],
   [
    "Why can a customer-initiated failover lose data?",
    "Geo-replication is asynchronous, so writes after the Last Sync Time may not have reached the secondary."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat card that lists each option with 'where the copies live' and 'readable secondary yes or no', and let them use it during the card match.",
   "Extend: Ask fast finishers to write a short recommendation for moving an existing LRS account to GZRS, noting that zone changes require a conversion or migration and checking whether any blobs use the Archive tier."
  ]
 },
 {
  "t": "Storage firewalls and virtual network rules, trusted Microsoft services, private endpoints for storage",
  "objectives": [
   "Students will be able to explain the difference between IP network rules, virtual network rules with service endpoints, and private endpoints.",
   "Students will be able to choose a network access method for a storage account given client locations (Azure subnet, peered network, on-premises, internet).",
   "Students will be able to identify when the trusted Microsoft services exception or a resource instance rule is required.",
   "Students will be able to diagnose a private endpoint DNS problem using nslookup output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the answers as arrows toward a storage account icon on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Build one diagram step by step: internet client, office public IP, Azure subnet with a service endpoint, peered VNet, on-premises over VPN, and a private endpoint NIC. For each, say which rule lets it in. Show a private DNS zone resolving the name through a CNAME to the private IP, and add the trusted services checkbox."
   ],
   [
    15,
    "Activity",
    "Run the nslookup and scenario triage activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare cost and complexity of service endpoints and private endpoints."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "A storage account is protected by a strong key. Name two reasons an organization might still want to restrict which networks can even reach it.",
  "activity": {
   "title": "Who gets in? Network triage",
   "materials": "Projector or printed handout with six short scenarios and four nslookup output excerpts the teacher prepares (some returning a private 10.x address through a privatelink CNAME, some returning a public address); sticky notes in two colors.",
   "steps": [
    "Pairs read each scenario (for example 'VM in a peered VNet', 'office public IP', 'Azure Backup job', 'on-premises server over ExpressRoute') and write on a sticky note which configuration allows it: IP rule, VNet rule with service endpoint, private endpoint, or trusted services exception.",
    "Pairs then examine each nslookup excerpt and decide whether the client will use the private endpoint or be blocked, writing the reason.",
    "For each blocked case, pairs write the fix (private DNS zone link, DNS forwarding, or an additional private endpoint for another sub-resource).",
    "Pairs post their sticky notes on the board under each scenario; the teacher reviews clusters of disagreement with the class."
   ]
  },
  "discussion": [
   "Why might a team start with service endpoints and later move to private endpoints?",
   "What could go wrong operationally if public network access is set to Disabled before DNS is tested from every client location?"
  ],
  "exit": [
   [
    "Can you add 10.0.0.0/16 to a storage account's IP network rules? Why or why not?",
    "No. IP rules accept only public addresses; use a virtual network rule or a private endpoint for private ranges."
   ],
   [
    "On-premises clients over VPN must reach storage through a private IP. Which feature do you use?",
    "A private endpoint, with DNS forwarding so the name resolves to its private IP."
   ],
   [
    "After restricting a storage account, diagnostic logs stop arriving. What setting likely fixes it?",
    "Allow trusted Microsoft services to access the storage account."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page decision flowchart (Is the client in an Azure subnet? Does it need a private IP? Is it on-premises?) that students follow for each scenario.",
   "Extend: Ask fast finishers to design access for an app that uses both blobs and file shares from on-premises and a peered VNet, listing every private endpoint and private DNS zone required."
  ]
 },
 {
  "t": "Shared access signatures: account, service and user delegation SAS; stored access policies; access keys and key rotation",
  "objectives": [
   "Students will be able to distinguish account, service and user delegation SAS by signing method and scope.",
   "Students will be able to explain how a stored access policy enables revocation and which SAS types can use one.",
   "Students will be able to sequence a zero-downtime access key rotation using key1 and key2.",
   "Students will be able to choose the right access method when a scenario forbids account keys."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about lending access on the board."
   ],
   [
    15,
    "Teach",
    "Project an example SAS URI with a fake signature and label each parameter (sp, se, spr, sig). Draw a three-column table for account, service and user delegation SAS: what signs it, what it covers, how to revoke it. Then walk through the key rotation sequence and the effect of disabling shared key access."
   ],
   [
    15,
    "Activity",
    "Run the revocation role-play described below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about trade-offs between convenience and control."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on an index card."
   ]
  ],
  "warmup": "You want a neighbor to water your plants while you are away. Would you give them your only house key, a copy of it, or something else? What would you want to be able to do if they lost it?",
  "activity": {
   "title": "Revoke it without breaking it",
   "materials": "Printed role cards (Administrator, Partner, App Owner) and five incident cards the teacher writes (for example 'leaked account SAS signed with key1', 'partner contract ends, service SAS uses stored policy', 'user delegation SAS holder left the company'); whiteboard showing which apps use which key.",
   "steps": [
    "In groups of three, students take the roles of Administrator, Partner and App Owner.",
    "The teacher reads an incident card; the Administrator proposes the revocation step, the App Owner checks the whiteboard to say which apps would break, and the Partner says whether their access stops.",
    "The group writes the final action and its blast radius (who is affected) on a sheet.",
    "Roles rotate for each incident card so every student plays Administrator at least once.",
    "The class compares answers, highlighting where a stored access policy or user delegation SAS would have reduced the blast radius."
   ]
  },
  "discussion": [
   "If user delegation SAS is safer, why might some teams still issue service SAS tokens?",
   "What are the risks of disabling 'Allow storage account key access' on an account that has been in production for years?"
  ],
  "exit": [
   [
    "Which SAS type can reference a stored access policy?",
    "A service SAS."
   ],
   [
    "Put the key rotation steps in order: regenerate key1, switch apps to key2, switch apps back to key1, regenerate key2.",
    "Switch apps to key2, regenerate key1, switch apps back to key1, regenerate key2."
   ],
   [
    "What signs a user delegation SAS, and which storage service does it support?",
    "A user delegation key obtained with Microsoft Entra credentials; it supports Blob Storage only."
   ]
  ],
  "differentiation": [
   "Support: Give students a color-coded reference card: red for anything signed by an account key, green for Entra-based, with the one revocation method beside each SAS type.",
   "Extend: Ask fast finishers to write an access plan for three external partners with different needs, specifying the SAS type, permissions, expiry and revocation method for each, and justifying where Key Vault fits."
  ]
 },
 {
  "t": "Identity-based access for Azure Files (AD DS, Entra Domain Services, Entra Kerberos) with share-level RBAC and NTFS permissions",
  "objectives": [
   "Students will be able to compare AD DS, Microsoft Entra Domain Services and Microsoft Entra Kerberos as identity sources for Azure Files.",
   "Students will be able to determine a user's effective access from a share-level RBAC role and an NTFS ACL.",
   "Students will be able to identify which share-level role is needed to change NTFS permissions.",
   "Students will be able to recognize port 445 blocking as a non-identity cause of connection failures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of two separate checks."
   ],
   [
    15,
    "Teach",
    "Draw a decision tree for the identity source (on-premises AD with line of sight, managed domain only, Entra-joined remote clients). Then draw two gates, share-level RBAC and NTFS, and work three examples showing the stricter layer wins. Show the icacls example and explain (OI)(CI)M."
   ],
   [
    15,
    "Activity",
    "Run the effective access card game described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about default share-level permissions and key-based mounting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "At a concert you need a ticket to enter the venue and a wristband to enter the VIP area. If you have a VIP wristband but no ticket, where can you go? How is that like file permissions?",
  "activity": {
   "title": "Effective access card game",
   "materials": "Printed cards: share-role cards (Reader, Contributor, Elevated Contributor, None) and NTFS cards (Read, Modify, Full Control, None), plus action cards (open file, save edit, delete file, change folder permissions); answer sheet for each pair.",
   "steps": [
    "Each pair draws one share-role card, one NTFS card and one action card.",
    "Pairs decide whether the action succeeds and write the reason, naming which layer allowed or blocked it.",
    "Repeat for at least eight draws, recording each on the answer sheet.",
    "Pairs then design the minimum share role and NTFS permission for three described employees (a payroll clerk, an auditor, the IT file administrator).",
    "The teacher reviews tricky combinations on the whiteboard, especially NTFS Full Control with no share role."
   ]
  },
  "discussion": [
   "What are the benefits and risks of setting a default share-level permission for all authenticated users instead of assigning roles per group?",
   "Why might an administrator still mount a share with the storage account key, and how should that access be controlled?"
  ],
  "exit": [
   [
    "A user has Share Contributor and NTFS Read on a folder. Can they delete a file there?",
    "No; NTFS Read is the more restrictive layer and does not allow delete."
   ],
   [
    "Which identity source suits Entra-joined laptops that cannot reach a domain controller?",
    "Microsoft Entra Kerberos."
   ],
   [
    "Which share-level role allows changing NTFS ACLs?",
    "Storage File Data SMB Share Elevated Contributor."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-gate diagram template where they fill in the share role and NTFS permission, then shade the smaller of the two to find effective access.",
   "Extend: Ask fast finishers to write the migration steps for moving an on-premises share with existing ACLs to Azure Files with AD DS authentication, including identity sync, storage account domain join, role assignment and how users connect from home."
  ]
 },
 {
  "t": "Encryption: Microsoft-managed vs customer-managed keys in Key Vault, infrastructure encryption, encryption scopes",
  "objectives": [
   "Students will be able to state that Azure Storage encryption at rest is always on and explain what Microsoft-managed keys provide.",
   "Students will be able to list the requirements for customer-managed keys: Key Vault or Managed HSM, managed identity permissions, soft delete and purge protection.",
   "Students will be able to explain when infrastructure encryption can be enabled and why it is used.",
   "Students will be able to apply encryption scopes to a multi-tenant storage scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and record student guesses about who holds the keys."
   ],
   [
    15,
    "Teach",
    "Draw envelope encryption: data, data encryption key, key encryption key in Key Vault, and the managed identity arrow between storage and the vault. Add a second outer box for infrastructure encryption marked 'creation only'. Then draw one account with three containers, each tied to a different encryption scope."
   ],
   [
    15,
    "Activity",
    "Run the compliance request sort described below in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about the risk of holding your own keys."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If your data is already encrypted by your cloud provider, why would any company want to manage its own encryption key? Write one reason.",
  "activity": {
   "title": "Compliance request sort",
   "materials": "Printed cards with eight compliance requests the teacher writes (for example 'we must revoke access on demand', 'double encryption required for an existing account', 'each tenant needs its own key', 'turn encryption off for speed'); four labeled areas on the whiteboard: Default (nothing to do), Customer-managed key, Infrastructure encryption, Encryption scope, plus a 'Not possible' area.",
   "steps": [
    "Groups of three or four receive a shuffled set of request cards.",
    "Groups place each card in the area that satisfies it and note any prerequisite (managed identity, purge protection, new account).",
    "For the 'double encryption on an existing account' card, groups write the migration steps they would follow.",
    "Each group presents two of its placements; the class challenges any it disagrees with.",
    "The teacher confirms the answers and highlights the creation-time limit on infrastructure encryption."
   ]
  },
  "discussion": [
   "Customer-managed keys give control but add a way to lose access to your own data. How would you protect against that operationally?",
   "Why might an auditor ask about encryption in transit as well as at rest, and which storage settings answer that question?"
  ],
  "exit": [
   [
    "Can encryption at rest be turned off for a storage account?",
    "No; Azure Storage encryption with AES-256 is always on."
   ],
   [
    "Name two Key Vault settings required before using it for storage customer-managed keys.",
    "Soft delete and purge protection."
   ],
   [
    "A team wants double encryption on an account created last year. What must they do?",
    "Create a new storage account with infrastructure encryption enabled and migrate the data, since it can only be set at creation."
   ]
  ],
  "differentiation": [
   "Support: Give students a fill-in diagram of envelope encryption with blanks for 'data encryption key', 'customer-managed key', 'managed identity' and 'Key Vault', and review it before the activity.",
   "Extend: Ask fast finishers to compare system-assigned and user-assigned managed identities for CMK and explain which they would choose if the key vault must be configured before the storage account exists."
  ]
 },
 {
  "t": "Object replication, and data movement with AzCopy and Azure Storage Explorer",
  "objectives": [
   "Students will be able to list the prerequisites and limits of object replication.",
   "Students will be able to compare object replication with geo-redundant storage.",
   "Students will be able to choose between azcopy copy, azcopy sync, Storage Explorer and Data Box for a transfer scenario.",
   "Students will be able to explain why azcopy login needs a data-plane role."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers into 'automatic' and 'manual' columns on the board."
   ],
   [
    15,
    "Teach",
    "Draw source and destination accounts with versioning, change feed and a replication rule arrow, labeled block blobs only and destination read-only. Contrast with GRS to the paired region. Project the AzCopy commands and explain copy versus sync, SAS versus azcopy login, and when Storage Explorer or Data Box fits."
   ],
   [
    15,
    "Activity",
    "Run the tool selection relay described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about automation and risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You need a copy of your photo library at a relative's house that stays current. Would you drive over a hard drive every week, or set something up once? What would make you choose each?",
  "activity": {
   "title": "Tool selection relay",
   "materials": "Printed scenario strips (ten short transfer scenarios the teacher writes, such as 'copy new blobs to another region automatically', 'nightly push of changed files', 'one-off upload by a non-technical user', '80 TB over a slow link'); whiteboard divided into Object replication, azcopy copy, azcopy sync, Storage Explorer, Data Box.",
   "steps": [
    "Split the class into two teams lined up facing the whiteboard.",
    "The first student in each team takes a scenario strip, tapes it under the tool they choose, and writes one prerequisite or caution next to it (for example 'versioning on both accounts' or 'needs Storage Blob Data Contributor').",
    "The next student may move one strip they disagree with, explaining why, before placing their own.",
    "After all strips are placed, the class reviews each column together and the teacher corrects placements.",
    "Finish by asking each team to write the one command a nightly sync job would run."
   ]
  },
  "discussion": [
   "When would object replication be a better choice than GRS, and when would GRS be enough?",
   "What could go wrong if a nightly job uses azcopy sync with --delete-destination=true pointed at the wrong folder?"
  ],
  "exit": [
   [
    "What must be enabled for object replication, and on which accounts?",
    "Blob versioning on both source and destination, and change feed on the source."
   ],
   [
    "Which AzCopy command transfers only new or changed files?",
    "azcopy sync."
   ],
   [
    "Which blob type does object replication support?",
    "Block blobs only."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision table listing each tool with 'automatic or manual', 'GUI or command line', and 'best for', which students can consult during the relay.",
   "Extend: Ask fast finishers to design a replication setup that sends only blobs with a given prefix created after a certain date to a different subscription, and to explain how they would monitor that replication is keeping up."
  ]
 },
 {
  "t": "Blob containers and access tiers: Hot, Cool, Cold and Archive; rehydration from Archive",
  "objectives": [
   "Students will be able to describe the Hot, Cool, Cold and Archive tiers, including minimum retention periods and online versus offline access.",
   "Students will be able to select the most cost-effective tier for a described access pattern.",
   "Students will be able to compare Set Blob Tier and Copy Blob rehydration and choose Standard or High priority.",
   "Students will be able to explain container anonymous access levels and why account-level anonymous access is usually disabled."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and place students' items on a hot-to-archive line drawn on the board."
   ],
   [
    15,
    "Teach",
    "Build a four-column table on the whiteboard: tier, online or offline, minimum days, storage cost versus access cost. Explain early deletion, the account default tier, the Archive restrictions (not as default, not with ZRS or GZRS), and the two rehydration methods with their priorities. Briefly cover container anonymous access levels."
   ],
   [
    15,
    "Activity",
    "Run the tier the data activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about cost versus convenience."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Think about things in your home: some you use daily, some once a season, some you keep only in case. Where do you store each kind, and what does it cost you to get them out?",
  "activity": {
   "title": "Tier the data",
   "materials": "Printed data profile cards the teacher writes (for example 'website images viewed constantly', 'monthly backups kept 60 days', 'tax records kept 7 years and almost never read', 'clinical reports read rarely but instantly'), plus three rehydration request cards with deadlines; student worksheets.",
   "steps": [
    "Pairs receive eight data profile cards and assign each a tier, writing the reason and any early deletion risk.",
    "Pairs then handle three rehydration requests, choosing Set Blob Tier or Copy Blob and Standard or High priority based on the deadline and whether the archive copy must remain.",
    "Pairs swap worksheets with another pair and check each other's choices against the minimum retention periods.",
    "The teacher reviews the answers on the projector and discusses any case where two tiers could be argued."
   ]
  },
  "discussion": [
   "Why might moving everything to Archive actually increase cost for some data sets?",
   "What controls would you put in place to prevent a container from being accidentally made public?"
  ],
  "exit": [
   [
    "What is the minimum retention period for the Cold tier?",
    "90 days."
   ],
   [
    "A lawyer needs an archived file within an hour and the archived copy must remain. What do you do?",
    "Copy the blob to an online tier with High priority rehydration."
   ],
   [
    "Can Archive be the default tier of a storage account?",
    "No; Archive can only be set on individual blobs."
   ]
  ],
  "differentiation": [
   "Support: Give students a tier ladder card showing each tier's minimum days and online or offline status, and have them place data cards on the ladder physically before writing reasons.",
   "Extend: Ask fast finishers to estimate, in relative terms, when moving a data set from Cool to Archive saves money given how often it is read, and to explain how a lifecycle policy could automate the move."
  ]
 },
 {
  "t": "Lifecycle management policies that tier or delete blobs by age",
  "objectives": [
   "Students will be able to read a lifecycle management policy JSON rule and describe what it does to matching blobs.",
   "Students will be able to write rule filters (prefixMatch, blobTypes, blobIndexMatch) and age conditions for a requirement.",
   "Students will be able to explain why last access time tracking, version actions and the 24-hour delay matter.",
   "Students will be able to design a tiering schedule that avoids early deletion charges."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas about automatic cleanup."
   ],
   [
    15,
    "Teach",
    "Project the logs rule JSON and annotate each part: filters, baseBlob actions, conditions. Then cover the three condition types, last access tracking and auto-tier back to Hot, version and snapshot actions, the daily run and 24-hour delay, and the Archive limitation on ZRS and GZRS."
   ],
   [
    15,
    "Activity",
    "Run the write-the-rule activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about safe deletion."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your phone keeps every photo forever unless you delete them. If you could set three automatic rules to manage your photos by age, what would they be?",
  "activity": {
   "title": "Write the rule",
   "materials": "Projector showing a blank rule template; printed requirement cards the teacher writes (for example 'move backups/ to Cold after 60 days and delete after 400', 'tier blobs tagged project=closed to Archive after 30 days', 'delete old versions after 90 days'); student laptops with any text editor or paper.",
   "steps": [
    "Each pair receives two requirement cards.",
    "Pairs write the JSON rule for each card on paper or in a text editor, choosing filters, action names and conditions.",
    "Pairs check their own rules for three issues: container name in prefixMatch, last access tracking if needed, and minimum retention gaps between tiers.",
    "Pairs exchange rules with another pair, who must explain in plain words what the rule will do and spot any error.",
    "The teacher projects model answers and discusses the most common errors found."
   ]
  },
  "discussion": [
   "What checks should happen before anyone adds a delete action to a lifecycle rule in production?",
   "When would a rule based on last access time be better than one based on last modification, and when worse?"
  ],
  "exit": [
   [
    "Which condition moves blobs based on how long since they were last read, and what must be enabled for it?",
    "daysAfterLastAccessTimeGreaterThan, with last access time tracking enabled on the account."
   ],
   [
    "Which filter limits a rule to the reports container?",
    "prefixMatch with 'reports/'."
   ],
   [
    "Why might storage cost keep rising even after a baseBlob delete rule runs on a versioned account?",
    "Previous versions are not deleted by baseBlob actions; a version action is needed."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed JSON rule with blanks only for the filter value, action names and day counts.",
   "Extend: Ask fast finishers to write one policy with two rules, one using blobIndexMatch and one using last access time with auto-tier back to Hot, and to explain how the rules interact if a blob matches both."
  ]
 },
 {
  "t": "Data protection: blob and container soft delete, versioning, snapshots, change feed",
  "objectives": [
   "Students will be able to match blob soft delete, container soft delete, versioning, snapshots, change feed and immutable storage to the threat each addresses.",
   "Students will be able to list the prerequisites for point-in-time restore and object replication.",
   "Students will be able to explain why resource locks do not protect blob data.",
   "Students will be able to plan a recovery sequence for an accidental overwrite and container deletion."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the 'undo' features students already know from everyday apps."
   ],
   [
    15,
    "Teach",
    "Draw a threat column (blob deleted, container deleted, blob overwritten, need a known-good copy, need an audit trail, must never change, account deleted) and a feature column. Draw lines between them as you explain each feature, then show point-in-time restore depending on versioning, change feed and soft delete."
   ],
   [
    15,
    "Activity",
    "Run the incident response tabletop described below in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about cost and layering."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Name every way you can 'undo' a mistake in apps you use daily, such as email, documents or photos. Which ones work after an overwrite, and which only after a delete?",
  "activity": {
   "title": "Incident response tabletop",
   "materials": "Printed incident cards the teacher writes (for example 'script overwrote 2,000 blobs', 'container deleted yesterday', 'ransomware hit three containers', 'auditor asks who deleted a file', 'regulator requires seven-year WORM'), each with a line stating which features were enabled; group worksheets.",
   "steps": [
    "Groups of three or four draw an incident card.",
    "Groups decide whether recovery is possible with the features listed, and write the exact recovery steps in order, naming the feature used at each step.",
    "If recovery is not possible, groups write which feature should have been enabled beforehand and any prerequisite it needs.",
    "Each group presents one incident in two minutes; other groups may challenge the plan.",
    "The teacher summarizes with a recommended baseline set of protections for a typical production account."
   ]
  },
  "discussion": [
   "Versioning protects against overwrites but increases cost. How would you balance protection and cost for a container that changes thousands of times a day?",
   "Why do regulators often require that a retention policy be locked, and what risk does locking create for the organization?"
  ],
  "exit": [
   [
    "Which feature recovers a blob's previous content after an overwrite without anyone taking a copy first?",
    "Blob versioning."
   ],
   [
    "Name the three features point-in-time restore depends on.",
    "Blob versioning, change feed and blob soft delete."
   ],
   [
    "Does a CanNotDelete lock on a storage account prevent blobs from being deleted? Explain.",
    "No; locks protect the account resource, not data operations on blobs inside it."
   ]
  ],
  "differentiation": [
   "Support: Provide a threat-to-feature matching card with the features listed so students only need to draw lines, then discuss the matches with a partner before the tabletop.",
   "Extend: Ask fast finishers to design the data protection settings and lifecycle rules for a production account, specifying retention days for soft delete, how old versions are cleaned up, and whether immutability applies to any containers."
  ]
 },
 {
  "t": "Azure Files: create and configure file shares, snapshots, soft delete, and SMB port 445 considerations",
  "objectives": [
   "Students will be able to choose between a standard general-purpose v2 account and a premium FileStorage account for a file share requirement.",
   "Students will be able to diagnose an SMB mount failure caused by blocked port 445 and propose fixes.",
   "Students will be able to distinguish share snapshots, Azure Backup and file share soft delete by what they recover.",
   "Students will be able to describe how Windows and Linux clients mount an Azure file share."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to network ports and blocked paths."
   ],
   [
    15,
    "Teach",
    "Sketch an Azure file share with three clients: an Azure VM, a branch office, and a home user. Mark port 445 on each path and show where it is blocked. Explain Test-NetConnection output, then the fixes (VPN or ExpressRoute with a private endpoint, Azure File Sync). Finish with standard versus premium accounts, NFS, snapshots, Azure Backup and share soft delete."
   ],
   [
    15,
    "Activity",
    "Run the help desk ticket triage described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about reliability and self-service restore."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your work laptop connects to the office file server fine in the office but not from a coffee shop. Brainstorm every reason that might happen.",
  "activity": {
   "title": "Help desk ticket triage",
   "materials": "Printed help desk tickets the teacher writes (for example 'cannot map drive from branch, works from Azure VM', 'deleted one spreadsheet', 'entire share deleted by admin', 'need NFS for Linux cluster', 'old Windows client cannot connect from home'), plus two printed Test-NetConnection output excerpts showing TcpTestSucceeded True and False.",
   "steps": [
    "Pairs receive six tickets and the two Test-NetConnection excerpts.",
    "For each ticket, pairs write the likely cause, the evidence they would gather, and the fix, naming the Azure feature used.",
    "Pairs match each Test-NetConnection excerpt to the ticket it best explains and state what it proves.",
    "Pairs combine into groups of four to compare answers and agree on a final fix for each ticket.",
    "The teacher walks through each ticket on the projector, emphasizing the share-level versus file-level recovery distinction."
   ]
  },
  "discussion": [
   "What are the trade-offs between solving blocked port 445 with a VPN and private endpoint versus deploying Azure File Sync?",
   "Why might an organization want users to restore their own files from Previous Versions, and what risks does that create?"
  ],
  "exit": [
   [
    "A share mounts from an Azure VM but not from the office. What do you test first, and with which command?",
    "Whether TCP port 445 is reachable, using Test-NetConnection -ComputerName <account>.file.core.windows.net -Port 445."
   ],
   [
    "Which feature recovers a single deleted file, and which recovers an entire deleted share?",
    "Share snapshots (or Azure Backup) for a single file; file share soft delete for a whole share."
   ],
   [
    "Which storage account type is required for NFS file shares?",
    "A premium FileStorage account."
   ]
  ],
  "differentiation": [
   "Support: Give students a troubleshooting flowchart starting with 'Does it mount from Azure?' and 'Does Test-NetConnection succeed on 445?' to guide ticket triage.",
   "Extend: Ask fast finishers to design a file service for a company with headquarters, two branches and remote workers, specifying account type, identity-based access, network path for each location, and the backup and soft delete settings."
  ]
 },
 {
  "t": "ARM templates and Bicep files: interpret and modify, deploy, export a deployment as a template, convert ARM JSON to Bicep",
  "objectives": [
   "Students will be able to identify the sections of an ARM template and the equivalent Bicep keywords.",
   "Students will be able to modify a template so that a value is chosen at deployment time using a parameter with allowed values.",
   "Students will be able to export a template from existing resources and explain why it needs cleanup before reuse.",
   "Students will be able to choose between az bicep decompile and az bicep build and deploy a .bicep file directly."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard, grouping them under 'repeatable', 'reviewable' and 'error-prone'."
   ],
   [
    12,
    "Teach",
    "Project an ARM JSON storage template beside the equivalent Bicep file. Walk through parameters, variables, resources and outputs, point out square-bracket expressions and dependsOn, then show how Bicep infers dependencies. Finish with Export template, decompile versus build, and deploying a .bicep file directly."
   ],
   [
    18,
    "Activity",
    "Run the template surgery activity in pairs. Circulate and ask each pair to justify which section each change belongs in."
   ],
   [
    6,
    "Discuss",
    "Bring the class together and work through the discussion questions, focusing on why exported templates need cleanup and where secrets should live."
   ],
   [
    4,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "You built a web app environment by hand last month and now need an identical copy for testing. What could go wrong if you rebuild it by clicking through the portal again, and what would you want instead?",
  "activity": {
   "title": "Template surgery",
   "materials": "Printed copies of a short Bicep storage template and the matching ARM JSON template, a printed 'exported template' excerpt with hard-coded names and a read-only property, highlighters, and a whiteboard.",
   "steps": [
    "Give each pair the Bicep and JSON versions. Ask them to highlight parameters in one color, resources in another and outputs in a third, in both files.",
    "Hand out three change requests: let the deployer choose between Standard_LRS and Standard_GRS only, return the blob endpoint after deployment, and default the location to the resource group's location. Pairs write the exact lines they would change in the Bicep file.",
    "Give each pair the exported template excerpt. They circle every hard-coded value that should become a parameter and cross out anything that looks read-only.",
    "Pairs write on a card the command they would run to convert the exported JSON to Bicep and the command to deploy the result to a resource group named rg-test.",
    "Two pairs present their changes, and the class checks them against the template rules on the whiteboard."
   ]
  },
  "discussion": [
   "Why might a team insist that every change to production goes through a template in source control rather than the portal?",
   "An exported template contains a hard-coded resource ID from another subscription. What could happen if you deploy it unchanged?",
   "Where should a database password come from in a template, and why not a plain string parameter?"
  ],
  "exit": [
   [
    "Which template section holds a value the deployer chooses at deployment time?",
    "Parameters (param in Bicep)."
   ],
   [
    "Which command converts an ARM JSON template to Bicep?",
    "az bicep decompile --file template.json."
   ],
   [
    "Where in the portal do you get a template for resources that were created by hand, and what must you do before reusing it?",
    "Export template under Automation on the resource group or resource; then replace hard-coded names and IDs with parameters and remove read-only properties."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram of the template sections with one example line each, and let them match JSON lines to Bicep lines before attempting the change requests.",
   "Extend: Ask fast finishers to split the storage resource into a module, call it from a main Bicep file, and write a .bicepparam file for dev and another for production."
  ]
 },
 {
  "t": "Deployment modes (incremental vs complete) and deploying with `az deployment group create` or `New-AzResourceGroupDeployment`",
  "objectives": [
   "Students will be able to predict the end state of a resource group after an incremental or complete deployment.",
   "Students will be able to run what-if with the Azure CLI or PowerShell and interpret its change types.",
   "Students will be able to choose the correct deployment command for resource group and subscription scopes.",
   "Students will be able to explain how locks and deployment stacks protect against accidental deletion."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and take a quick show of hands: will the key vault survive? Record the split on the whiteboard without revealing the answer."
   ],
   [
    12,
    "Teach",
    "Explain incremental and complete modes with a before-and-after diagram of a resource group. Show the CLI and PowerShell commands, the --mode and -Mode switches, what-if change types, scope commands, and how a CanNotDelete lock interrupts complete mode."
   ],
   [
    17,
    "Activity",
    "Run the deployment prediction card game in small groups, then reveal answers round by round."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to connect the activity to real pipeline design and approval steps."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper and hand them in."
   ]
  ],
  "warmup": "A template lists two resources, the resource group holds three, and the pipeline says Mode: Complete. What happens to the third resource, and what would change if it had a lock?",
  "activity": {
   "title": "Predict the deployment",
   "materials": "Printed scenario cards (each shows the resources in a resource group, the resources in a template, the mode and any locks), sticky notes in three colors for Create, Delete and Unchanged, and a whiteboard.",
   "steps": [
    "Form groups of three and give each group six scenario cards, mixing incremental and complete modes and including at least one locked resource and one subscription-scope task.",
    "For each card, the group places colored sticky notes on every resource to show its predicted outcome and writes the exact CLI command they would run, including what-if.",
    "Rotate cards between groups so each group checks another group's predictions and marks disagreements.",
    "The teacher reveals the answers on the projector card by card, and groups explain any disagreements in one sentence.",
    "Each group writes one pipeline rule on the whiteboard that would have prevented the most dangerous outcome they saw."
   ]
  },
  "discussion": [
   "When would you deliberately choose complete mode for a resource group, and what conditions would you insist on first?",
   "Why might a team prefer deployment stacks over complete mode for cleaning up resources removed from templates?",
   "Should what-if output require a human approval before production deployments? What are the trade-offs?"
  ],
  "exit": [
   [
    "You deploy a template containing one of three existing resources in incremental mode. What happens to the other two?",
    "Nothing; incremental mode leaves resources not in the template untouched."
   ],
   [
    "Which command previews a resource group deployment without changing anything?",
    "az deployment group what-if (or New-AzResourceGroupDeployment with -WhatIf)."
   ],
   [
    "A complete-mode deployment fails to delete one resource that is not in the template. Give a likely reason.",
    "The resource has a CanNotDelete or ReadOnly lock that blocks the deletion."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference card comparing incremental and complete modes, and let struggling students work the first two scenario cards with the teacher before continuing with their group.",
   "Extend: Ask fast finishers to sketch how a deployment stack would handle the same scenarios and to write the PowerShell equivalent of every CLI command on their cards."
  ]
 },
 {
  "t": "Create virtual machines: images, sizes, OS and data disks, disk types (Standard HDD to Ultra), encryption at host and Azure Disk Encryption",
  "objectives": [
   "Students will be able to select a VM image, generation and size family that match a workload's requirements.",
   "Students will be able to rank managed disk types by cost and performance and identify which can be OS disks.",
   "Students will be able to explain why data on the temporary disk is lost and what belongs there.",
   "Students will be able to compare server-side encryption, encryption at host and Azure Disk Encryption."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student guesses on the whiteboard under 'kept' and 'lost'."
   ],
   [
    13,
    "Teach",
    "Project the Create a virtual machine page (screenshots or a live sandbox if available). Walk through image and generation, size families and the 's' suffix, the OS, temporary and data disks, the disk type ladder, and the three encryption layers drawn as nested boxes."
   ],
   [
    17,
    "Activity",
    "Run the VM build card sort in pairs, then have two pairs present their builds."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions, emphasizing the encryption layers and quota planning."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "An app saved files to drive D: on a Windows VM in Azure. The VM was stopped and deallocated over the weekend. On Monday the files are gone. What do you think happened?",
  "activity": {
   "title": "Build the VM: a card sort",
   "materials": "Printed cards for size families (B, D, E, F, L, N), disk types (Standard HDD, Standard SSD, Premium SSD, Premium SSD v2, Ultra Disk), encryption options (SSE platform key, SSE customer key, encryption at host, ADE), four printed workload briefs, and a whiteboard.",
   "steps": [
    "Give each pair a workload brief, such as a burstable dev box, a SQL Server VM with strict encryption rules, a GPU rendering node, or a low-cost file archive.",
    "Pairs choose one size family card, an OS disk card, any data disk cards and an encryption card, and write one sentence justifying each choice.",
    "The teacher announces a twist for each brief, for example 'the security team now requires encrypted caches' or 'the database admin wants Ultra Disk for the OS', and pairs adjust or explain why the request is impossible.",
    "Pairs swap briefs with a neighbor and check each other's choices against the rules on the whiteboard.",
    "Two pairs present their final builds and the class votes on whether each meets the brief."
   ]
  },
  "discussion": [
   "Why do you think Azure restricts Ultra Disk and Premium SSD v2 to data disks?",
   "What kinds of data are safe to keep on the temporary disk, and how would you explain the risk to a developer?",
   "If server-side encryption is always on, why would a security team still require encryption at host?"
  ],
  "exit": [
   [
    "Name the two managed disk types that cannot be used as an OS disk.",
    "Premium SSD v2 and Ultra Disk."
   ],
   [
    "A VM size cannot attach a Premium SSD data disk. What should you check?",
    "Whether the size supports Premium storage, shown by an 's' in the size name."
   ],
   [
    "Which option encrypts the temporary disk and caches without installing anything in the guest OS?",
    "Encryption at host."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page ladder diagram of disk types with a typical use beside each, and a three-box diagram of the encryption layers to refer to during the card sort.",
   "Extend: Ask fast finishers to write the az vm create command for their build, including size, image and an attached data disk, and to list which settings could not be changed later without redeploying."
  ]
 },
 {
  "t": "Resize VMs, move VMs between resource groups, subscriptions and regions, manage disks",
  "objectives": [
   "Students will be able to resize a VM and explain when deallocation is required.",
   "Students will be able to distinguish a resource group or subscription move from a cross-region relocation and name the tool for each.",
   "Students will be able to attach, expand and convert managed disks and list the OS steps that follow.",
   "Students will be able to identify orphaned disks and explain their cost impact."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and have students vote with fingers: 1 for restart, 2 for deallocate, 3 for a different tool, for each of three quick operations."
   ],
   [
    12,
    "Teach",
    "Draw a three-lane diagram on the whiteboard: running, restart, deallocated. Place resize, resize-to-missing-size, attach disk, expand disk and change disk type in the correct lanes. Then contrast resource move and Resource Mover with a map sketch."
   ],
   [
    18,
    "Activity",
    "Run the change request triage activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to address downtime planning and resource ID changes."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on a half sheet."
   ]
  ],
  "warmup": "You need to give a VM more memory, move it to a different subscription, and later move it to another region. Which of these do you think will interrupt users, and why?",
  "activity": {
   "title": "Change request triage",
   "materials": "A stack of printed change request cards (resize, region move, subscription move, attach disk, expand disk, shrink disk, convert disk type, delete VM), a printed triage sheet with columns for tool, VM state needed, downtime and follow-up OS step, and a whiteboard.",
   "steps": [
    "Give each group eight change request cards and a triage sheet.",
    "Groups fill in each column for every card, including 'not possible' where appropriate, such as shrinking a disk.",
    "The teacher reads out a surprise complication for three cards, for example 'the size is not in the list' or 'the target subscription is in a different tenant', and groups revise their answers.",
    "Groups trade sheets and mark another group's work using a projected answer key.",
    "Each group writes on a sticky note the single change they think is most often done wrong in real life and posts it on the whiteboard for discussion."
   ]
  },
  "discussion": [
   "Why does a VM's resource ID change on a resource group move matter for automation and access control?",
   "How would you schedule a resize that requires deallocation for a VM that users rely on during business hours?",
   "What process would you put in place to catch orphaned disks before they show up on the bill?"
  ],
  "exit": [
   [
    "The size you want is missing from a VM's resize list. What do you do?",
    "Deallocate the VM, then choose from all sizes available in the region."
   ],
   [
    "Which service moves a VM and its network resources to another region?",
    "Azure Resource Mover (Site Recovery can also be used)."
   ],
   [
    "You expanded a data disk in Azure, but the OS still shows the old size. What is missing?",
    "Extending the partition or file system inside the OS."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart that starts with 'Same region?' and 'Same tenant?' to guide struggling students to the right move tool, and pre-fill the VM state column for the first two cards.",
   "Extend: Ask fast finishers to write the Azure CLI commands for the resize, disk attach and resource move cards, and to explain how a snapshot reduces risk before a disk type change."
  ]
 },
 {
  "t": "Availability sets (fault and update domains) vs availability zones and their SLAs",
  "objectives": [
   "Students will be able to distinguish fault domains from update domains and the failures each addresses.",
   "Students will be able to compare availability sets and availability zones by scope of protection.",
   "Students will be able to match a configuration to its VM SLA: 99.99, 99.95 or 99.9 percent.",
   "Students will be able to recognize design rules such as creation-time set membership and no set-plus-zone combination."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Draw a rack, a datacenter and a region on the whiteboard and let students place the two failures from the story on the right picture."
   ],
   [
    12,
    "Teach",
    "Build a whiteboard diagram: one datacenter with three racks (fault domains) and colored hosts (update domains), then a region with three zone buildings. Add the SLA ladder beside it and cover the key rules."
   ],
   [
    18,
    "Activity",
    "Run the outage role-play: groups design, then the teacher 'breaks' parts of the diagram."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect SLAs to business decisions and costs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Two web servers sat in the same rack and both went down when the rack lost power. What would you change, and would your change also survive a fire that closed the whole building?",
  "activity": {
   "title": "Break the design",
   "materials": "Large paper or whiteboard space for each group, markers, a set of printed 'outage cards' (rack power failure, planned host maintenance, datacenter cooling failure, single VM crash, region without zones), and a printed SLA reference card.",
   "steps": [
    "Each group receives a business requirement card, such as 'survive rack failure, lowest cost' or 'highest possible SLA in one region', and draws a design showing VMs, sets or zones, and a load balancer.",
    "Groups write the SLA they expect their design to earn next to the drawing.",
    "The teacher draws outage cards one at a time. Groups cross out affected VMs on their diagram and say whether users stay online.",
    "Groups that fail an outage revise their design, explaining the change in one sentence.",
    "The class compares final designs and identifies the cheapest design that met each requirement."
   ]
  },
  "discussion": [
   "Why do the higher SLAs require at least two VMs and a load balancer, and what does the application itself still need to handle?",
   "When would an availability set still be the right answer even though zones offer a higher SLA?",
   "What might a business be willing to pay for to move from 99.95 to 99.99 percent, and how would you explain the difference in minutes of downtime?"
  ],
  "exit": [
   [
    "Which domain type protects against planned maintenance reboots?",
    "Update domains."
   ],
   [
    "What SLA applies to two VMs in two different availability zones?",
    "99.99 percent VM connectivity."
   ],
   [
    "Can you add an existing VM to an availability set?",
    "No; the set is chosen at creation, so you recreate the VM, for example from its existing disks."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn diagram with racks, hosts and zones labeled, and a fill-in table pairing each failure type with the protection that covers it.",
   "Extend: Ask fast finishers to redesign their group's solution using a Virtual Machine Scale Set in Flexible orchestration across zones, and to explain what the scale set adds beyond the SLA."
  ]
 },
 {
  "t": "Virtual Machine Scale Sets: orchestration modes, autoscale rules, scale-in",
  "objectives": [
   "Students will be able to compare Uniform and Flexible orchestration and choose the right mode for a scenario.",
   "Students will be able to configure paired scale-out and scale-in rules with minimum, maximum, default and cool down settings.",
   "Students will be able to predict which instance a scale-in policy removes and how instance protection changes the outcome.",
   "Students will be able to choose schedule-based profiles or predictive autoscale for recurring load."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Write 'missing rule?' and 'which VM goes?' as two headings for the lesson."
   ],
   [
    12,
    "Teach",
    "Project the Scaling blade (screenshots or a sandbox). Explain orchestration modes, then build a rule pair on the whiteboard with minimum, maximum, default and cool down. Cover the three scale-in policies, instance protection and upgrade policies."
   ],
   [
    18,
    "Activity",
    "Run the human scale set simulation with the class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on flapping, cost and stateful workloads."
   ],
   [
    5,
    "Exit ticket",
    "Students write answers to the three exit questions and hand them in."
   ]
  ],
  "warmup": "After a big sale, a web tier grew to fifteen servers and stayed there for days. What setting do you think was missing, and why would that cost money?",
  "activity": {
   "title": "Human scale set",
   "materials": "Printed name tags with instance IDs and zone numbers, a projector or whiteboard showing a 'CPU meter' the teacher updates, printed rule cards (thresholds, cool down, minimum, maximum), and one 'protected' badge.",
   "steps": [
    "Eight to twelve volunteers wear instance tags with IDs and zones; three start 'running' at the front, the rest wait at the side. One volunteer wears the protected badge.",
    "The class agrees on a rule set from the cards: minimum, maximum, scale-out and scale-in thresholds, and a cool down counted aloud.",
    "The teacher moves the CPU meter up and down through a scripted sequence. Seated students call out when a rule fires, and volunteers join or leave the front according to the rules and the Default scale-in policy.",
    "Repeat the sequence with the thresholds set close together (60 and 55) so the class sees flapping, then with only a scale-out rule so they see the set never shrink.",
    "Switch the policy to NewestVM and run one scale-in to compare which volunteer leaves; confirm the protected volunteer never leaves."
   ]
  },
  "discussion": [
   "Why does a stateless design matter for a workload that runs in a scale set?",
   "How would you choose the gap between scale-out and scale-in thresholds for a real application?",
   "When would you pick NewestVM or OldestVM instead of the Default scale-in policy?"
  ],
  "exit": [
   [
    "A scale set grew during a spike and never shrank. What is the most likely cause?",
    "There is no scale-in rule."
   ],
   [
    "Which orchestration mode lets you mix VM sizes and manage instances as ordinary VMs?",
    "Flexible orchestration."
   ],
   [
    "How do you make sure autoscale never deletes one particular instance?",
    "Enable instance protection on it, with 'protect from scale-in' (or 'protect from scale set actions')."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a filled-in example rule pair to annotate, and a one-line summary card for each scale-in policy to use during the simulation.",
   "Extend: Ask fast finishers to design an autoscale configuration for a queue-driven worker pool, including a schedule profile, and to write the az monitor autoscale commands for it."
  ]
 },
 {
  "t": "Azure Container Registry tiers and image management",
  "objectives": [
   "Students will be able to identify which ACR features require the Premium tier.",
   "Students will be able to construct a fully qualified image reference and explain the difference between a tag and a digest.",
   "Students will be able to choose least-privilege authentication for people, pipelines and services pulling images.",
   "Students will be able to describe how to clean up untagged manifests and lock important images."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas; point out any that mention passwords or tags."
   ],
   [
    12,
    "Teach",
    "Draw the image reference pattern on the whiteboard and label login server, repository, tag and digest. Present a three-column tier chart, then the authentication options from most to least recommended, ACR Tasks, import, and cleanup commands."
   ],
   [
    18,
    "Activity",
    "Run the registry audit activity with printed findings."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why tags and shared credentials cause real incidents."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A production app runs an image tagged latest. Someone asks exactly which version of the code is running. How would you find out, and why might it be hard?",
  "activity": {
   "title": "Registry audit",
   "materials": "Printed audit packets describing a fictional registry (tier, admin user status, role assignments, a tag list with repeated pushes to latest, storage growth, network settings), red and green pens, and a whiteboard for the remediation list.",
   "steps": [
    "Pairs read the audit packet and circle every finding they think is a security, cost or reliability problem.",
    "For each finding, pairs write the fix and the command or setting that applies, such as disabling the admin user, assigning AcrPull, or scheduling acr purge.",
    "Pairs mark which fixes require upgrading to Premium and justify the upgrade in one sentence.",
    "Two pairs join to compare lists and agree on a priority order for the fixes.",
    "The class builds a combined remediation list on the whiteboard, ordered by risk."
   ]
  },
  "discussion": [
   "Why is a moving tag like latest risky in production but convenient in development?",
   "What problems does a shared admin credential create when someone leaves the team?",
   "How would you decide whether the extra cost of Premium is justified for a team?"
  ],
  "exit": [
   [
    "A registry must be reachable only through a private endpoint. Which tier is required?",
    "Premium."
   ],
   [
    "What is the least-privilege way to let an App Service app pull images from ACR?",
    "Enable a managed identity on the app and assign it AcrPull on the registry."
   ],
   [
    "Which command builds an image in Azure from a Dockerfile without Docker installed locally?",
    "az acr build (ACR Tasks)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a tier feature chart and a role chart to consult during the audit, and pre-highlight the first two findings in their packet.",
   "Extend: Ask fast finishers to write an acr purge command that keeps release-tagged images, and to explain how a digest-based deployment would change their release pipeline."
  ]
 },
 {
  "t": "Azure Container Instances (container groups, restart policies) and Azure Container Apps (revisions, ingress, scale rules)",
  "objectives": [
   "Students will be able to choose between Azure Container Instances and Azure Container Apps for a workload.",
   "Students will be able to select the correct ACI restart policy for services, retrying jobs and run-once tasks.",
   "Students will be able to explain container groups and what their containers share.",
   "Students will be able to configure Container Apps revisions, ingress and scale rules, including traffic splitting and scale to zero."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up puzzle about the container that ran for nine days and take guesses."
   ],
   [
    12,
    "Teach",
    "Compare ACI and Container Apps side by side on the whiteboard. Cover container groups and restart policies, then revisions (revision-scoped versus application-scoped), ingress options and scale rules including KEDA and minimum zero."
   ],
   [
    18,
    "Activity",
    "Run the workload matching activity with scenario and setting cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare cost and release safety."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A container that converts files every night takes eleven minutes to finish, but the bill shows it running for nine days straight. What setting might explain that?",
  "activity": {
   "title": "Match the workload",
   "materials": "Printed scenario cards (one-off migration, retrying nightly job, web app with sidecar, canary API release, queue worker that should cost nothing when idle, internal-only service), printed setting cards (ACI, Container Apps, Always, OnFailure, Never, container group, single revision, multiple revision, external ingress, internal ingress, ingress disabled, HTTP scale rule, KEDA queue rule, min replicas 0), and tape or sticky tack.",
   "steps": [
    "Groups of three receive the scenario cards and a full set of setting cards.",
    "For each scenario, groups attach the service card and every setting card that applies, and write one sentence explaining the choice.",
    "The teacher reads out a change for two scenarios, such as 'the job must now retry on failure' or 'the API must be reachable from the internet', and groups adjust.",
    "Groups walk the room to view another group's board and leave one sticky note question or correction.",
    "The class reviews the answers together on the projector."
   ]
  },
  "discussion": [
   "What are the trade-offs of scaling an app to zero replicas?",
   "How does multiple revision mode reduce the risk of a release compared with replacing the old version immediately?",
   "When would you still choose ACI over Container Apps for a production task?"
  ],
  "exit": [
   [
    "An ACI container runs a one-off data load but keeps running after it finishes. What should you change?",
    "Set the restart policy to Never (or OnFailure if it should retry on errors)."
   ],
   [
    "What is required to send 20 percent of traffic to a new Container Apps version?",
    "Multiple revision mode with traffic weights of 80 and 20 percent."
   ],
   [
    "Does updating a secret in a container app create a new revision?",
    "No; secrets are application-scoped."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart (scaling needed? traffic splitting needed? runs once?) and a one-line definition card for each restart policy and ingress option.",
   "Extend: Ask fast finishers to write the YAML outline for a two-container ACI group with a shared volume, or the az containerapp commands to set traffic weights between two revisions."
  ]
 },
 {
  "t": "App Service plans: tiers, scaling up vs scaling out, autoscale",
  "objectives": [
   "Students will be able to order App Service pricing tiers and name the features that each tier group adds.",
   "Students will be able to distinguish scaling up from scaling out and choose the right one for a symptom.",
   "Students will be able to configure rule-based autoscale with paired rules and instance limits on a Standard or higher plan.",
   "Students will be able to explain why apps in one plan scale together and when to separate them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into 'bigger' and 'more' columns on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw the tier ladder from Free to Isolated and annotate feature unlocks. Illustrate scaling up with one tall box and scaling out with several boxes behind a load balancer. Show the Scale out blade and contrast rule-based autoscale with Premium automatic scaling."
   ],
   [
    18,
    "Activity",
    "Run the symptom clinic activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore shared plans and cost."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Your website is slow. Would you rather have one much more powerful server or three ordinary ones? What would make you choose one over the other?",
  "activity": {
   "title": "Symptom clinic",
   "materials": "Printed 'patient' cards describing App Service symptoms (out-of-memory errors with few users, slow pages under heavy concurrent traffic, needs a staging slot on Basic, one app driving scaling for others, Linux app on a Windows plan, dev site on a budget), printed prescription cards (scale up, scale out, autoscale rule, schedule profile, new plan, change tier), and a whiteboard.",
   "steps": [
    "Pairs draw three patient cards and diagnose each symptom in one sentence.",
    "For each patient, pairs choose one or more prescription cards and write the specific tier, size or rule they would apply.",
    "Pairs write the CLI command for one of their prescriptions, using az appservice plan update with --sku or --number-of-workers.",
    "Each pair swaps one card with a neighboring pair and reviews their diagnosis, marking agreement or a counterproposal.",
    "The class discusses the trickiest card, the out-of-memory case, and agrees on the reasoning."
   ]
  },
  "discussion": [
   "What are the advantages and risks of running several apps on one App Service plan?",
   "When would you prefer Premium automatic scaling over writing your own autoscale rules?",
   "How would you explain to a manager why a scale-in rule matters as much as a scale-out rule?"
  ],
  "exit": [
   [
    "An app on a Basic plan needs deployment slots. What should you do?",
    "Scale up the plan to Standard or higher."
   ],
   [
    "What is the difference between scaling up and scaling out?",
    "Scaling up gives each instance more resources or a higher tier; scaling out adds more instances."
   ],
   [
    "Two apps share a plan and one app's traffic triggers autoscale for both. How do you fix it?",
    "Move the busy app to its own App Service plan."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a tier ladder handout with feature checkmarks and a two-picture reminder of up versus out to use during the clinic.",
   "Extend: Ask fast finishers to design a complete autoscale configuration with a default profile, a weekday schedule profile and paired CPU rules, and to justify each threshold."
  ]
 },
 {
  "t": "App Service: TLS certificates, custom DNS names, backups, networking (VNet integration, private endpoints) and deployment slots",
  "objectives": [
   "Students will be able to configure a custom domain with the correct DNS records for a subdomain and an apex domain.",
   "Students will be able to choose a TLS certificate option and binding type and enforce HTTPS.",
   "Students will be able to distinguish VNet integration (outbound) from private endpoints (inbound) in a design.",
   "Students will be able to use deployment slots and slot settings to release and roll back safely."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record the class's yes and no votes with reasons on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Walk through the five blades in order. Draw DNS records for www and the apex, compare certificate options, then draw an app box with an arrow going out (VNet integration) and an arrow coming in (private endpoint). Finish with a slot swap diagram showing which settings move and which stay."
   ],
   [
    17,
    "Activity",
    "Run the go-live checklist activity in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce traffic direction and sticky settings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "If a web app can connect to a database on your private network, does that mean the public internet can no longer reach the web app? Why or why not?",
  "activity": {
   "title": "Go-live checklist",
   "materials": "Printed requirement sheets for a fictional portal (custom subdomain and apex domain, padlock with automatic renewal, private database, staff-only access, safe weekly releases), blank DNS record tables, printed slot setting tables listing app settings, and a whiteboard.",
   "steps": [
    "Groups of three fill in the DNS record table for both the subdomain and the apex domain, including the asuid TXT records.",
    "Groups pick a certificate option and binding type for each name and note any limitation, such as wildcard support.",
    "Groups draw the networking design with arrows labeled inbound and outbound and name the feature on each arrow.",
    "Groups mark each row of the slot settings table as 'moves with code' or 'sticky' and explain the choice for database and mail settings.",
    "The teacher reveals a mock incident, such as production using the test database after a swap, and groups identify the missed step on their checklist."
   ]
  },
  "discussion": [
   "Why do you think App Service requires a TXT verification record in addition to the CNAME or A record?",
   "What could go wrong if a team relies only on VNet integration to protect an internal app?",
   "Which settings in your own projects would you mark as slot settings, and which should move with the code?"
  ],
  "exit": [
   [
    "Which DNS records map the apex domain contoso.com to an App Service app?",
    "An A record to the app's inbound IP address and a TXT record named asuid with the verification ID."
   ],
   [
    "An app must connect to a SQL database that only has a private IP. Which feature is needed?",
    "VNet integration through a delegated subnet."
   ],
   [
    "After a swap, production is using the staging database. What was missed?",
    "The connection string was not marked as a deployment slot setting."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a direction cheat card (outbound equals VNet integration, inbound equals private endpoint) and a partially completed DNS table with the record types filled in.",
   "Extend: Ask fast finishers to design a release process that uses traffic routing to send a small percentage of users to the staging slot before a full swap, and to list what they would monitor."
  ]
 },
 {
  "t": "Virtual networks and subnets: address space planning, the 5 reserved IPs per subnet",
  "objectives": [
   "Students will be able to calculate the number of usable addresses and the first assignable address in any Azure subnet from /29 to /24.",
   "Students will be able to identify the five reserved addresses in a given subnet and explain what each is for.",
   "Students will be able to design non-overlapping address spaces for a hub, spokes and an on-premises network.",
   "Students will be able to name the exact subnets required for VPN gateways, Azure Bastion and Azure Firewall."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick answers. Write the most common guess (usually 256 or 254) on the board to revisit later."
   ],
   [
    12,
    "Teach",
    "Explain VNets as regional and zone-spanning, then the RFC 1918 ranges and the no-overlap rule. Work through 10.1.0.0/24 on the board, labeling .0, .1, .2, .3 and .255, and build a table of /29 to /24 with usable counts. Finish with the special subnet names."
   ],
   [
    18,
    "Activity",
    "Run the address-plan design challenge below in pairs. Circulate and check the math on reserved addresses and overlap."
   ],
   [
    5,
    "Discuss",
    "Have two pairs present their plans and compare. Use the discussion questions to surface trade-offs between generous and tight sizing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "Your home router hands out addresses starting at .2 or .100. If you create a /24 subnet in Azure, how many addresses do you think you can give to virtual machines, and which one comes first?",
  "activity": {
   "title": "Address plan design challenge",
   "materials": "Printed scenario sheet (prepared by the teacher), whiteboard or large paper per pair, markers, student laptops with a browser for an optional online subnet calculator.",
   "steps": [
    "Give each pair a scenario: on-premises uses 10.0.0.0/16; build a hub with a VPN gateway, Bastion and Azure Firewall, a production spoke with a 200-VM web tier and a 40-VM database tier, and a development spoke.",
    "Pairs choose a non-overlapping address space for each VNet and write it on their paper.",
    "Pairs carve subnets, using the exact special names, and write the usable address count and first usable address next to each subnet.",
    "The teacher then reveals a twist card, such as 'a partner network using 10.20.0.0/16 must connect next year', and pairs check whether their plan still works and adjust.",
    "Pairs swap papers with a neighbor, who checks every usable count by subtracting five and flags any overlap."
   ]
  },
  "discussion": [
   "Why might a team deliberately give every VNet a /16 even if it only needs a few hundred addresses today?",
   "What are the real costs of discovering an address overlap after workloads are already running?"
  ],
  "exit": [
   [
    "How many usable addresses are in a /27 subnet in Azure, and what is the first usable address in 10.5.2.0/27?",
    "27 usable (32 minus 5); the first usable address is 10.5.2.4."
   ],
   [
    "Two VNets use 10.0.0.0/16 and 10.0.128.0/17. Can they be peered?",
    "No. The second range is inside the first, so they overlap, and overlapping VNets cannot be peered."
   ],
   [
    "What subnet name does a VPN gateway require?",
    "GatewaySubnet, spelled exactly."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed table of block sizes from /29 to /24 with a blank 'usable' column, and have them fill it in by subtracting five before starting the design challenge.",
   "Extend: Ask fast finishers to add a second region with its own hub and spokes, keep every range unique, and explain how they would leave room for five more spokes."
  ]
 },
 {
  "t": "Virtual network peering: non-transitive, gateway transit and use remote gateways, global peering",
  "objectives": [
   "Students will be able to explain why VNet peering is non-transitive and predict reachability in a multi-VNet topology.",
   "Students will be able to configure gateway transit by placing Allow gateway transit and Use remote gateways on the correct sides.",
   "Students will be able to compare options for spoke-to-spoke connectivity: direct peering versus routing through a hub firewall.",
   "Students will be able to interpret peering status (Initiated versus Connected) and apply a three-step troubleshooting check."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Draw three circles labeled A, B and C with lines A-B and B-C. Ask the warm-up question and take a show of hands."
   ],
   [
    12,
    "Teach",
    "Explain peering as two links, status values, no overlap, and global peering. Reveal that A cannot reach C. Then add a gateway to the hub on the diagram and label which side gets Allow gateway transit and which gets Use remote gateways."
   ],
   [
    18,
    "Activity",
    "Run the human peering network role-play below. Debrief each round by asking which packets were delivered and why."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare direct peering, hub firewall routing and managed options."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If network A is connected to B, and B is connected to C, should A be able to reach C? Give one reason it might be good that the answer in Azure is no.",
  "activity": {
   "title": "Human peering network",
   "materials": "Sticky notes or index cards for each student labeled with a VNet name and address range, string or tape for drawn 'peering links' on the floor or whiteboard, printed packet cards with source and destination addresses, a projector showing the topology.",
   "steps": [
    "Assign students to be VNets: one Hub, three Spokes and one On-premises site. Each holds a card with their address range.",
    "Draw or tape peering links between the hub and each spoke only. Hand packet cards to spoke students and ask them to deliver each packet only along links, following the rule that a VNet will not pass traffic it did not originate unless it is a router with routes.",
    "Round 2: give the Hub student a 'firewall' badge, and give spokes 'route table' cards pointing the other spoke's range at the firewall. Repeat delivery and note what now works and which setting (Allow forwarded traffic) is needed.",
    "Round 3: give the Hub a 'VPN gateway' card. Students decide which peering settings each side needs so the On-premises student can reach all spokes, writing Allow gateway transit or Use remote gateways on sticky notes on the correct link ends.",
    "Finish by making one spoke hold its own gateway card and ask the class whether it can still use remote gateways."
   ]
  },
  "discussion": [
   "When would you choose a hub firewall for spoke-to-spoke traffic instead of direct peering, even though it costs more?",
   "How does sharing one gateway through gateway transit change the risk if the hub is misconfigured?"
  ],
  "exit": [
   [
    "VNet-X peers with VNet-Y, and VNet-Y peers with VNet-Z. Can VNet-X reach VNet-Z by default?",
    "No, peering is non-transitive. A direct peering or routing through an appliance in VNet-Y is needed."
   ],
   [
    "A spoke must use the hub's VPN gateway. Which setting goes on the hub link and which on the spoke link?",
    "Allow gateway transit on the hub side; Use remote gateways on the spoke side."
   ],
   [
    "A peering status shows Initiated. What should you do?",
    "Create the matching peering link from the other VNet so both sides exist and the status becomes Connected."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed table with two columns, 'VNet that has the gateway' and 'VNet that borrows it', with the setting names pre-filled, and let them refer to it during the role-play.",
   "Extend: Ask fast finishers to design a two-region hub-and-spoke with one gateway per region and explain which links use global peering and where gateway transit is and is not possible."
  ]
 },
 {
  "t": "Public IP addresses: Standard SKU, static allocation, zones",
  "objectives": [
   "Students will be able to describe the three key properties of a Standard public IP: static allocation, secure by default and zone support.",
   "Students will be able to choose between zone-redundant, zonal and no-zone public IPs for a given availability requirement.",
   "Students will be able to diagnose why traffic does not reach a resource behind a new Standard public IP.",
   "Students will be able to recommend a NAT gateway or public IP prefix for outbound and allow-list scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Steer toward the idea that an address used by partners must never change."
   ],
   [
    12,
    "Teach",
    "Explain public IPs as standalone resources, then the Standard properties, writing 'Static, Secure by default, Zone-aware' on the board. Draw a region with three zones and show zone-redundant versus zonal. Close with NAT gateway and public IP prefixes for outbound."
   ],
   [
    18,
    "Activity",
    "Run the requirement-to-configuration matching activity below in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share one tricky card and their reasoning; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A partner company will only accept traffic from IP addresses you send them in advance. What could go wrong if your outbound address changed every time a server restarted?",
  "activity": {
   "title": "Public IP requirement match-up",
   "materials": "Printed requirement cards and configuration cards (prepared by the teacher), sticky notes, a whiteboard, optionally student laptops with a browser to view the portal's Create public IP page in a free or sandbox subscription.",
   "steps": [
    "Give each group about ten requirement cards, such as 'address must survive any single zone failure', 'VM pinned to zone 2 needs an address', 'partner must allow-list a contiguous range', 'private VMs need outbound only', 'site gets no traffic on a new public IP'.",
    "Give each group configuration cards: zone-redundant Standard IP, zonal Standard IP, public IP prefix, NAT gateway, add NSG allow rule, create new IP and migrate.",
    "Groups match each requirement to one or more configuration cards and write a one-line justification on a sticky note.",
    "The teacher reveals answers card by card; groups score a point for each correct match and a bonus for a correct justification.",
    "Groups pick the requirement they found hardest and explain to the class what clue word gave it away."
   ]
  },
  "discussion": [
   "Why does Azure make Standard public IPs closed by default, and what does that mean for how you plan a deployment?",
   "What are the security and operational trade-offs between giving each VM a public IP and using a NAT gateway plus Azure Bastion?"
  ],
  "exit": [
   [
    "A website on a new Standard public IP gets no traffic, and the VMs are healthy. What do you add?",
    "An NSG rule allowing the inbound port, because Standard public IPs block inbound traffic by default."
   ],
   [
    "Which zone option keeps a public IP working if any one zone fails?",
    "Zone-redundant."
   ],
   [
    "What is the recommended way to give private VMs outbound internet access through a fixed address?",
    "A NAT gateway on their subnet with a Standard public IP or public IP prefix."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference card listing each public IP property with a plain-language meaning, and pair struggling students with a partner who reads requirement cards aloud.",
   "Extend: Ask fast finishers to design inbound and outbound addressing for an app in two regions, explaining where a Global tier public IP or a public IP prefix would help."
  ]
 },
 {
  "t": "User-defined routes: route tables, next hop types (virtual appliance, virtual network gateway, internet, none) and forced tunneling",
  "objectives": [
   "Students will be able to create a route table, add a route and associate it with a subnet.",
   "Students will be able to select the correct next hop type (Virtual appliance, Virtual network gateway, Virtual network, Internet, None) for a requirement.",
   "Students will be able to predict which route applies using longest prefix match and then source priority (UDR, BGP, system).",
   "Students will be able to explain forced tunneling and the role of IP forwarding on an NVA."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the student answers as arrows on a simple network diagram."
   ],
   [
    12,
    "Teach",
    "Show the default system routes for a subnet, then add a route table with 0.0.0.0/0 to a firewall. Walk through each next hop type with a one-line use case, then demonstrate longest prefix match with two routes on the board. Finish with forced tunneling and IP forwarding."
   ],
   [
    18,
    "Activity",
    "Run the route table detective worksheet below in pairs."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest worksheet packet together and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Your company bought a firewall in Azure, but VMs still reach the internet directly. Without touching the VMs themselves, how could you make their traffic pass through the firewall?",
  "activity": {
   "title": "Route table detective",
   "materials": "Printed worksheet (prepared by the teacher) showing an effective routes table for a VM with system, BGP and user-defined routes, plus a list of destination IPs; a projector showing the same table; pens.",
   "steps": [
    "Hand out a worksheet listing about eight routes, for example 10.0.0.0/16 Virtual network (system), 0.0.0.0/0 Internet (system), 192.168.0.0/16 Virtual network gateway (BGP), 0.0.0.0/0 Virtual appliance 10.0.1.4 (UDR) and 203.0.113.0/24 None (UDR).",
    "Pairs decide, for each of eight destination IPs, which route wins and what the next hop is, writing the rule they used (longest prefix or source priority).",
    "Next, pairs fix three broken scenarios on the back of the sheet: traffic stops at a third-party NVA, on-premises traffic bypasses the firewall, and a UDR was attached to GatewaySubnet.",
    "The teacher projects the answers and pairs mark their own work, explaining any disagreements aloud.",
    "Each pair writes one exam-style question from the worksheet for another pair to answer."
   ]
  },
  "discussion": [
   "Why might an organization choose forced tunneling to on-premises instead of inspecting internet traffic with a firewall in Azure?",
   "How would you prove to an auditor that a subnet's internet traffic really goes through the firewall?"
  ],
  "exit": [
   [
    "Can a route table be associated with a network interface?",
    "No. Route tables are associated with subnets, at most one per subnet."
   ],
   [
    "A UDR for 10.0.0.0/8 and a system route for 10.1.0.0/16 both exist. Which handles traffic to 10.1.5.5?",
    "The system route for 10.1.0.0/16, because the longest prefix wins before source priority is considered."
   ],
   [
    "Traffic reaches a third-party firewall VM but is never forwarded. What setting is missing?",
    "IP forwarding on the firewall VM's network interface (and routing in its operating system)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart card: step 1, find all routes containing the destination; step 2, keep the longest prefix; step 3, if tied, UDR beats BGP beats system.",
   "Extend: Ask fast finishers to design route tables for a hub-and-spoke where both spoke-to-spoke and internet traffic go through Azure Firewall, ensuring symmetric routing and explaining their Propagate gateway routes choice."
  ]
 },
 {
  "t": "Network security groups and application security groups: rule priority, default rules, subnet vs NIC association, effective security rules",
  "objectives": [
   "Students will be able to determine which NSG rule applies to a packet using priority order and first-match processing.",
   "Students will be able to list the default inbound and outbound rules and explain their effect on internet and VNet traffic.",
   "Students will be able to explain the evaluation order when NSGs are associated with both a subnet and a NIC.",
   "Students will be able to design rules with application security groups and use effective security rules and IP flow verify to troubleshoot."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a nightclub guest list and connect the answers to first-match processing."
   ],
   [
    12,
    "Teach",
    "Project an NSG with custom and default rules. Walk through priority order, the default rules, and subnet versus NIC evaluation order using a two-door diagram. Then introduce ASGs with a before-and-after rule rewrite and show the Effective security rules view."
   ],
   [
    18,
    "Activity",
    "Run the 'be the NSG' packet simulation below in small groups."
   ],
   [
    5,
    "Discuss",
    "Discuss the trickiest packet and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A door guard has a list: line 1 says 'no hats', line 2 says 'VIPs welcome'. A VIP arrives wearing a hat. If the guard stops reading at the first line that matches, does the VIP get in? What does that tell you about the order of rules?",
  "activity": {
   "title": "Be the NSG",
   "materials": "Printed rule sheets for a subnet NSG and a NIC NSG (prepared by the teacher, including default rules), printed packet cards with source, destination, port and direction, two sets of colored sticky notes for Allow and Deny, a whiteboard.",
   "steps": [
    "Divide each group into a Subnet NSG student and a NIC NSG student, each holding their rule sheet, and a Packet carrier.",
    "The Packet carrier draws a packet card. For inbound packets it goes to the Subnet NSG student first, then the NIC NSG student; for outbound, the reverse. Each NSG student reads rules from the lowest priority up and announces the first match.",
    "The group records the outcome and the deciding rule name on the board with an Allow or Deny sticky note.",
    "After ten packets, the teacher hands out a change card, such as 'replace IP-based rules with asg-web and asg-db' or 'add an empty NSG to the NIC', and groups rerun three packets to see what changes.",
    "Groups write one sentence explaining how effective security rules or IP flow verify would have found the answer faster."
   ]
  },
  "discussion": [
   "Should most organizations apply NSGs at the subnet, the NIC or both? What are the trade-offs?",
   "How do application security groups change the way security and operations teams work together when servers are added often?"
  ],
  "exit": [
   [
    "An NSG has Allow TCP 443 at priority 300 and Deny all at priority 250 for the same source. Is TCP 443 allowed?",
    "No. The Deny at 250 is processed first and matches, so processing stops."
   ],
   [
    "In what order are subnet and NIC NSGs evaluated for inbound traffic?",
    "Subnet NSG first, then NIC NSG; both must allow."
   ],
   [
    "Which feature lets a rule say 'from web servers to database servers' without IP addresses?",
    "Application security groups."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a rule sheet with priorities already sorted and highlighted, and a two-door diagram labeled 'inbound: subnet then NIC; outbound: NIC then subnet'.",
   "Extend: Ask fast finishers to write a complete NSG and ASG design for a three-tier app that blocks web-to-database traffic, allows health probes and allows management only from a Bastion subnet."
  ]
 },
 {
  "t": "Azure Bastion: AzureBastionSubnet, SKUs, browser and native client access",
  "objectives": [
   "Students will be able to explain how Azure Bastion removes the need for public IPs and open RDP or SSH ports on VMs.",
   "Students will be able to state the subnet name and minimum size required for a dedicated Bastion deployment.",
   "Students will be able to choose the correct Bastion SKU (Developer, Basic, Standard, Premium) for a set of feature requirements.",
   "Students will be able to configure NSG rules on target subnets to allow management traffic only from the Bastion subnet."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the risks students name on the board."
   ],
   [
    12,
    "Teach",
    "Draw the connection path: user, port 443, Bastion in AzureBastionSubnet, private IP of the VM in a peered spoke. Then build a SKU feature table on the board from Developer to Premium, and show the native client CLI command on the projector."
   ],
   [
    18,
    "Activity",
    "Run the SKU shopping activity below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups share their most debated requirement; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If a server accepts Remote Desktop connections from anywhere on the internet, what will happen to it within a day or two, and how would you know?",
  "activity": {
   "title": "Bastion SKU shopping",
   "materials": "Printed customer requirement cards (prepared by the teacher), a printed SKU feature table with some cells blanked out, sticky notes, a whiteboard.",
   "steps": [
    "Groups first complete the blanked-out cells of the SKU feature table from memory and the lesson, then check with the teacher.",
    "Each group draws four customer cards, such as 'one dev VM, lowest cost', 'forty VMs across peered spokes, browser only', 'engineers need file transfer with their own RDP client', 'auditors require session recordings', 'contractor access without portal rights'.",
    "For each card the group picks the cheapest SKU that meets every requirement and writes it on a sticky note with the feature that forced the choice.",
    "Groups then write the NSG rule they would add to the target subnet (source, port, action) for one of their customers.",
    "Groups swap cards with another group and check each other's choices, flagging any over- or under-specified SKU."
   ]
  },
  "discussion": [
   "What risks remain even after you deploy Bastion and remove VM public IPs?",
   "Why might an organization choose Premium's private-only deployment despite the higher cost?"
  ],
  "exit": [
   [
    "What subnet name and minimum prefix does a dedicated Bastion need?",
    "AzureBastionSubnet, /26 or larger."
   ],
   [
    "Which is the lowest SKU that supports native client and file transfer?",
    "Standard."
   ],
   [
    "Which source should an NSG on a spoke subnet allow for RDP when using Bastion?",
    "The AzureBastionSubnet address range (for example 10.0.3.0/26)."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed SKU feature table with each feature highlighted in a different color, and let struggling students match customer cards by color.",
   "Extend: Ask fast finishers to design management access for a two-region environment, deciding how many Bastion hosts are needed, where they go and which SKU each uses."
  ]
 },
 {
  "t": "Service endpoints vs private endpoints, and private DNS zones for private link",
  "objectives": [
   "Students will be able to compare service endpoints and private endpoints by IP address, scope, cost and on-premises reach.",
   "Students will be able to choose the correct option for a scenario involving on-premises access, disabled public access or a single resource.",
   "Students will be able to explain how privatelink CNAMEs, private DNS zones and virtual network links make a private endpoint resolve.",
   "Students will be able to troubleshoot a failing private endpoint by checking name resolution first."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch a VM, the internet and a storage account on the board."
   ],
   [
    12,
    "Teach",
    "Draw both paths side by side: service endpoint (public IP, backbone, subnet identity) and private endpoint (NIC with private IP in the VNet). Then walk through the DNS chain from the public name to the privatelink CNAME to the A record, and show where on-premises forwarding fits."
   ],
   [
    18,
    "Activity",
    "Run the DNS trace and decide activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and review one broken scenario together."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If your company turns off all public internet access to a storage account, how could a server in Azure and a laptop in the head office still reach it?",
  "activity": {
   "title": "DNS trace and decide",
   "materials": "Printed scenario cards and printed nslookup output snippets (prepared by the teacher), a whiteboard, student laptops with a browser for viewing a projected diagram.",
   "steps": [
    "Part A: give pairs eight requirement cards and ask them to label each 'service endpoint' or 'private endpoint' with the clue word that decided it (free, on-premises, disable public access, one account, simplest).",
    "Part B: hand out four nslookup outputs, some resolving through a privatelink alias to a private address and some returning a public address, along with a short description of the network.",
    "For each output, pairs decide whether the private endpoint will be used and, if not, name the missing piece: zone missing, A record missing, VNet link missing, or on-premises forwarding missing.",
    "Pairs draw the corrected DNS path on the whiteboard for one scenario, including the Private Resolver inbound endpoint for on-premises.",
    "The teacher reviews answers and asks each pair to explain one fix out loud."
   ]
  },
  "discussion": [
   "Why does Microsoft recommend that applications keep using the normal service name instead of the private IP address of a private endpoint?",
   "When might a team still choose service endpoints today, despite private endpoints offering more control?"
  ],
  "exit": [
   [
    "Which option works for on-premises clients over a VPN: service endpoint or private endpoint?",
    "Private endpoint, because service endpoints only apply to traffic from Azure subnets."
   ],
   [
    "A VM resolves a storage account to a public IP even though a private endpoint exists. Name one likely cause.",
    "The privatelink private DNS zone is not linked to the VM's VNet, or the zone or A record is missing."
   ],
   [
    "Does a service endpoint change the IP address the client connects to?",
    "No. The service keeps its public IP; only the route and the subnet identity change."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column comparison card (service endpoint versus private endpoint) with rows for IP, scope, cost, on-premises and DNS, to use during Part A.",
   "Extend: Ask fast finishers to design DNS for a hub-and-spoke with ten spokes and an on-premises site, explaining where the privatelink zones live, which VNets are linked and how on-premises forwarding is configured."
  ]
 },
 {
  "t": "Azure DNS: public zones, delegation, record sets, alias records; private DNS zones with auto-registration",
  "objectives": [
   "Students will be able to explain how to delegate a domain and a subdomain to Azure DNS using NS records.",
   "Students will be able to describe record sets, TTL and the rules for CNAME records, including the zone apex restriction.",
   "Students will be able to choose an alias record to point the apex at an Azure resource and avoid dangling records.",
   "Students will be able to configure a private DNS zone with virtual network links and auto-registration, including the one-zone-per-VNet limit."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect guesses. Use them to introduce registrars versus DNS hosting."
   ],
   [
    12,
    "Teach",
    "Draw the resolution chain: resolver, top-level domain servers, registrar's NS entries, Azure name servers. Show a zone with record sets on the projector, explain the apex CNAME rule and alias records, then draw a private zone linked to a hub (auto-registration) and spokes (resolution only)."
   ],
   [
    18,
    "Activity",
    "Run the zone file workshop below in pairs."
   ],
   [
    5,
    "Discuss",
    "Review two student designs and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You just moved your phone book page to a new printer, but the town directory still lists the old printer. What happens when someone looks up your number? How does this relate to moving a domain's DNS?",
  "activity": {
   "title": "Zone file workshop",
   "materials": "Printed requirement sheet and blank record-set tables (prepared by the teacher), a whiteboard, sticky notes, student laptops with a browser to run nslookup-style lookups in a free online DNS lookup tool against well-known domains (optional).",
   "steps": [
    "Give pairs a requirement sheet: host fabrikam.com in Azure DNS, point the apex at a Front Door endpoint, point www at the apex, add mail records, delegate dev.fabrikam.com to another team, and give VMs in a hub VNet automatic internal names.",
    "Pairs fill in the blank record-set tables: name, type, TTL, value or alias target. They mark which records are alias records.",
    "Pairs list the steps needed at the registrar and in the parent zone for delegation, writing them on sticky notes in order.",
    "Pairs sketch the private zone design: which VNets are linked, which link has auto-registration, and why only one.",
    "The teacher reveals two planted errors in a sample zone (a CNAME at the apex and a CNAME set with two values) and pairs explain why each is invalid."
   ]
  },
  "discussion": [
   "Why are dangling DNS records a security concern, and how do alias records help?",
   "What should you do with TTL values before a planned migration, and why?"
  ],
  "exit": [
   [
    "After creating a public zone in Azure DNS, what must you change at the registrar?",
    "The domain's name server entries, to the four Azure DNS name servers assigned to the zone."
   ],
   [
    "Which record type lets the zone apex point to an Azure Front Door endpoint?",
    "An alias A record (a CNAME is not allowed at the apex)."
   ],
   [
    "How many private zones can have auto-registration enabled for a single VNet?",
    "One."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed record-set table with the record types filled in, so struggling students focus on values and the apex rule.",
   "Extend: Ask fast finishers to design DNS for a hybrid network where on-premises clients must resolve the private zone, identifying where forwarding is configured."
  ]
 },
 {
  "t": "Azure Load Balancer: public vs internal, Standard SKU, backend pools, health probes, load-balancing and inbound NAT rules",
  "objectives": [
   "Students will be able to distinguish public and internal load balancers and choose between Azure Load Balancer and Application Gateway.",
   "Students will be able to describe the roles of the front end, backend pool, health probe and load-balancing rule.",
   "Students will be able to explain session persistence, HA ports and inbound NAT rules and select each for a scenario.",
   "Students will be able to troubleshoot a Standard load balancer that passes probes but delivers no traffic."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up restaurant question and map the students' answers to load balancer parts on the board."
   ],
   [
    12,
    "Teach",
    "Draw a public load balancer with front end, rule, probe and backend pool, then an internal load balancer between tiers. Explain Standard as secure by default, the probe source 168.63.129.16, session persistence, HA ports and inbound NAT rules. Contrast with Application Gateway in one sentence."
   ],
   [
    18,
    "Activity",
    "Run the build-a-load-balancer card activity below in groups."
   ],
   [
    5,
    "Discuss",
    "Discuss the troubleshooting cards and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A restaurant host must seat guests across five tables, but one waiter has gone home sick. How should the host find out, and what should happen to guests who always want the same table?",
  "activity": {
   "title": "Build a load balancer, then break it",
   "materials": "Printed component cards (front end public, front end private, backend pool, health probe HTTP, health probe TCP, load-balancing rule, inbound NAT rule, session persistence, HA ports, NSG allow rule), printed scenario and symptom cards (prepared by the teacher), a whiteboard.",
   "steps": [
    "Groups receive a design scenario, such as 'web tier on TCP 443 from the internet across three zones, app tier on 8080 internal only, admins must reach each web VM on its own port'.",
    "Groups lay out component cards on their desk or the whiteboard to build the design, writing ports and probe paths on sticky notes.",
    "The teacher hands each group three symptom cards, such as 'probes pass but no traffic', 'whole pool marked unhealthy after a security change', 'users lose shopping carts'.",
    "For each symptom, groups identify which component is missing or misconfigured and replace or add the right card.",
    "Groups present one fix to the class, naming the clue in the symptom that pointed to it."
   ]
  },
  "discussion": [
   "When would you put an internal load balancer and Application Gateway in the same design, and what does each do?",
   "Why is relying on session persistence considered a weaker design than storing session state outside the VMs?"
  ],
  "exit": [
   [
    "A Standard load balancer's probes succeed, but clients get no response. What is the likely cause?",
    "No NSG rule allows the inbound port; Standard is secure by default."
   ],
   [
    "Which feature lets you reach VM2's RDP port through the load balancer's public IP on port 50002?",
    "An inbound NAT rule mapping front-end port 50002 to VM2 port 3389."
   ],
   [
    "A requirement says to route requests by URL path. Is Azure Load Balancer the right choice?",
    "No. Use Application Gateway, which works at layer 7; Load Balancer works at layer 4."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram of a load balancer with blanks for each component name, to complete before the card activity.",
   "Extend: Ask fast finishers to design a highly available NVA pair behind an internal Standard load balancer with HA ports, including the route tables that send spoke traffic to the load balancer's front-end IP."
  ]
 },
 {
  "t": "Troubleshooting connectivity with Network Watcher: IP flow verify, next hop, connection troubleshoot, effective routes",
  "objectives": [
   "Students will be able to match a connectivity symptom to the correct Network Watcher tool: IP flow verify, next hop, effective routes or connection troubleshoot.",
   "Students will be able to interpret the output of IP flow verify and next hop, including the deciding rule and route table.",
   "Students will be able to apply a logical troubleshooting order that separates NSG, routing and destination problems.",
   "Students will be able to identify the limits of each tool, including the agent requirement and the guest operating system firewall blind spot."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a lost parcel and list the possible causes students suggest."
   ],
   [
    12,
    "Teach",
    "Present the three suspects (NSG, route, destination) on the board and map each Network Watcher tool to them. Project sample output for IP flow verify, next hop and effective routes, and walk through the recommended troubleshooting order."
   ],
   [
    18,
    "Activity",
    "Run the incident triage relay below in teams."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and revisit any incident teams disagreed on."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A parcel you sent never arrived. List every place it could have gone wrong between your door and the recipient's door, and say how you would check each one.",
  "activity": {
   "title": "Incident triage relay",
   "materials": "Printed incident cards and matching printed tool outputs (prepared by the teacher: IP flow verify results, next hop results, effective routes tables, connection troubleshoot summaries), a whiteboard with a column per tool, sticky notes.",
   "steps": [
    "Split the class into teams of three: a Tool picker, an Output reader and a Fixer.",
    "The teacher reads an incident card aloud, such as 'web VM stopped answering on 443 after a security change' or 'traffic to a peered VNet now times out after a route table change'.",
    "The Tool picker places a sticky note in the column of the tool to run first. If correct, the teacher hands over the matching printed output.",
    "The Output reader interprets the output (deciding rule, next hop type, route source) and the Fixer proposes the change, writing it on the board.",
    "Rotate roles for each of five incidents. Finish with an incident where Azure says allowed and routed correctly, and teams must name what to check inside the VM."
   ]
  },
  "discussion": [
   "Why is it valuable to test from Azure's point of view before signing in to a VM or changing rules in production?",
   "How would you use these tools to settle a disagreement between a network team and a security team about who caused an outage?"
  ],
  "exit": [
   [
    "Which tool names the NSG rule that blocks a packet?",
    "IP flow verify."
   ],
   [
    "Which tool shows the next hop type and the route table used for traffic to one destination?",
    "Next hop."
   ],
   [
    "What must be installed on a VM to use it as a source for connection troubleshoot?",
    "The Network Watcher agent VM extension."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a symptom-to-tool lookup card (blocked by rule, wrong path, all routes, end-to-end test) to use during the relay.",
   "Extend: Ask fast finishers to write their own incident card with realistic tool outputs that requires two different tools to solve, then swap with another team."
  ]
 },
 {
  "t": "Azure Monitor metrics vs logs, and diagnostic settings that send resource logs to a Log Analytics workspace",
  "objectives": [
   "Students will be able to distinguish metrics from logs by structure, collection method, latency and retention.",
   "Students will be able to identify which data (platform metrics, activity log, resource logs) Azure collects automatically and which requires a diagnostic setting.",
   "Students will be able to choose the correct diagnostic setting destination (Log Analytics workspace, storage account, event hub) for a stated requirement.",
   "Students will be able to explain how Azure Policy with DeployIfNotExists enforces diagnostic settings at scale."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick answers. Write 'automatic' and 'must switch on' as two column headings on the whiteboard and leave them for later."
   ],
   [
    13,
    "Teach",
    "Explain metrics versus logs with one example of each on the board (Percentage CPU as a number line, a key vault access record as a row with many columns). Fill the two columns: platform metrics and the activity log under automatic, resource logs and guest data under must switch on. Project or read the CLI diagnostic setting command and walk through each flag. Finish with the three destinations and their jobs."
   ],
   [
    17,
    "Activity",
    "Run the destination-matching card activity below in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, steering toward the cost reason for opt-in logging and the idea that missing history cannot be recovered."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or a sticky note and hand them in."
   ]
  ],
  "warmup": "A secret disappeared from a key vault last month. Where would you look first to find out who deleted it, and do you think that record exists today?",
  "activity": {
   "title": "Where does this data go?",
   "materials": "Printed requirement cards (about 12, one requirement each), three labeled envelopes or whiteboard areas for Workspace, Storage account and Event hub, plus a fourth area labeled No diagnostic setting needed.",
   "steps": [
    "Prepare cards such as 'chart CPU on a dashboard', 'keep NSG logs seven years cheaply', 'send audit events to an external SIEM in seconds', 'query storage read operations with KQL', 'see who deleted a VM last week', 'alert when a specific key vault operation occurs'.",
    "Groups of three sort each card into one or more areas. Some cards belong in two areas, and some belong in No diagnostic setting needed because the data is automatic.",
    "For every card in a destination area, the group writes the log category or metric it would enable on the card.",
    "Groups swap with a neighbor and check each other's placements, marking any they disagree with.",
    "The teacher reveals the answers and asks disagreeing groups to explain their reasoning before confirming."
   ]
  },
  "discussion": [
   "Why might Microsoft leave resource logs off by default instead of collecting everything for every customer?",
   "If your organization had to prove seven years of key vault access history, what would you set up today, and how would you make sure nobody forgets a new vault?"
  ],
  "exit": [
   [
    "Name two types of data Azure Monitor collects automatically with no configuration.",
    "Platform metrics and the activity log."
   ],
   [
    "Which diagnostic setting destination would you use to run KQL queries and log alerts?",
    "A Log Analytics workspace."
   ],
   [
    "How do you make sure every new key vault gets a diagnostic setting without manual work?",
    "Assign an Azure Policy definition with the DeployIfNotExists effect that creates the diagnostic setting."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page table with three rows (platform metrics, activity log, resource logs) and columns for 'automatic?', 'what it shows' and 'retention', partly filled in, to complete during the teach segment.",
   "Extend: Ask fast finishers to design a diagnostic strategy for a subscription with 30 storage accounts and 10 key vaults, including which category groups, which destinations and which policy assignments they would use, and to estimate which choices drive cost."
  ]
 },
 {
  "t": "Querying logs with basic KQL (where, summarize, project, render)",
  "objectives": [
   "Students will be able to read a KQL pipeline from top to bottom and describe what each operator does to the result.",
   "Students will be able to select the correct operator (where, summarize, project, extend, render) for a requested output shape.",
   "Students will be able to write a time-filtered query using ago() and a time series using bin().",
   "Students will be able to diagnose common query errors caused by operator order or case-sensitive comparisons."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Draw a small five-row table on the board (Computer, EventID, TimeGenerated) to use throughout the lesson."
   ],
   [
    12,
    "Teach",
    "Using the board table, physically cross out rows to show where, circle columns to show project, and redraw a two-row result to show summarize count() by Computer. Then project or write the three sample queries and read each one aloud line by line. Introduce ago() and bin() with a timeline sketch."
   ],
   [
    18,
    "Activity",
    "Run the human pipeline and query repair activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially why filtering early saves cost."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you had a spreadsheet with a million rows of sign-in events, what three steps would you take to find which server had the most failures yesterday?",
  "activity": {
   "title": "Human pipeline and query repair",
   "materials": "A printed sheet of 20 fake log rows (Computer, EventID, Account, TimeGenerated) per group, operator cards (where, summarize, project, sort by, render), and a printed set of four broken queries. Student laptops with a browser are optional for checking syntax against Microsoft's public demo data if available to the class.",
   "steps": [
    "Groups of four each take one operator card and sit in a row as a pipeline.",
    "The teacher reads a question, such as 'failed sign-ins per computer, most first'. The group arranges its cards in order and passes the paper rows down the line, each student applying only their operator by crossing out, grouping or rewriting.",
    "The last student writes the final result and the full query on the whiteboard.",
    "Each group then receives the four broken queries (filter after summarize, missing time filter, == on mixed-case names, timechart without bin) and writes a corrected version with one sentence explaining the fix.",
    "Groups compare repairs with a neighboring group and resolve differences."
   ]
  },
  "discussion": [
   "Why does putting where early in a query make it cheaper and faster, and when might you still need a where after summarize?",
   "What kinds of everyday admin questions would you rather answer with a saved KQL query than by clicking through the portal?"
  ],
  "exit": [
   [
    "Which operator would you use to produce one row per resource group with a count of deletions?",
    "summarize count() by ResourceGroup."
   ],
   [
    "Write a filter that keeps only the last 12 hours of data.",
    "where TimeGenerated > ago(12h)."
   ],
   [
    "A query uses render timechart but the chart is a single bar. What is likely missing?",
    "Grouping by bin(TimeGenerated, <interval>) in the summarize step to create a time series."
   ]
  ],
  "differentiation": [
   "Support: Provide a cheat card listing each operator with a one-line purpose and a sample, and let struggling students work only with where, summarize and project during the activity.",
   "Extend: Challenge fast finishers to write a query that finds computers whose heartbeat stopped in the last hour but which reported in the previous day, using summarize max() and a second where, and to explain how it could back a log search alert."
  ]
 },
 {
  "t": "Alert rules (metric, log search, activity log), action groups and alert processing rules",
  "objectives": [
   "Students will be able to describe the three parts of an alert rule (scope, condition, actions) and the severity scale.",
   "Students will be able to choose between metric, log search and activity log alert rules for a given scenario.",
   "Students will be able to explain how action groups are reused across rules and list common notification and action types.",
   "Students will be able to apply alert processing rules to suppress notifications on a schedule or add action groups by scope and severity."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student examples of good and bad alerts on the board."
   ],
   [
    13,
    "Teach",
    "Draw an alert rule as three boxes (scope, condition, actions). Under condition, branch into metric, log search and activity log with one example each. Show action groups as a shared box that several rules point to. Then draw the alert processing rule as a filter sitting between fired alerts and action groups, with suppress and add options."
   ],
   [
    17,
    "Activity",
    "Run the alert design workshop below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about alert fatigue and maintenance windows."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Think of a time an alarm, notification or reminder annoyed you so much that you ignored it. What went wrong with how it was set up?",
  "activity": {
   "title": "Alert design workshop",
   "materials": "Printed scenario sheet with eight monitoring requirements, sticky notes in three colors (one per rule type), and whiteboard space per group.",
   "steps": [
    "Give each group the scenario sheet for a fictional company, with requirements such as 'page on high CPU', 'email when a VNet is deleted', 'ticket when 20 failed sign-ins occur in 10 minutes', 'tell us about Azure outages in our region', 'no pages on Saturday nights', and 'every Sev0 must also go to the security team'.",
    "Groups write each requirement on a sticky note colored by rule type (metric, log search, activity log), or on a white note if it is not a rule but an action group or alert processing rule.",
    "On the whiteboard, groups draw how many action groups they need and connect each rule to one, aiming for the fewest action groups that still meet the requirements.",
    "Groups add any alert processing rules with their scope, filter and schedule.",
    "One group presents; others challenge any placement, and the teacher confirms or corrects."
   ]
  },
  "discussion": [
   "How does alert fatigue put an organization at risk, and which features from today help reduce it?",
   "Why might an auditor prefer suppression through an alert processing rule over disabling alert rules during maintenance?"
  ],
  "exit": [
   [
    "Which rule type should alert when Azure announces planned maintenance affecting your services?",
    "An activity log alert on service health events."
   ],
   [
    "You need to page the team when average CPU exceeds 90 percent for 5 minutes. Which rule type?",
    "A metric alert rule."
   ],
   [
    "How do you send all Sev0 alerts in a subscription to an extra team without editing the rules?",
    "Create an alert processing rule scoped to the subscription, filtered on Sev0, that applies the team's action group."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart with three questions (Is it a number? Is it a query on logs? Is it something someone did or an Azure health event?) to use while sorting scenarios.",
   "Extend: Ask fast finishers to compare static and dynamic thresholds for a web app with strong daily traffic patterns, and to design an alerting setup that avoids paging at predictable peaks while still catching real anomalies."
  ]
 },
 {
  "t": "Azure Monitor insights: VM insights, storage and network insights, Azure Monitor Agent and data collection rules",
  "objectives": [
   "Students will be able to explain what VM insights, storage insights and network insights show and which data each relies on.",
   "Students will be able to describe the relationship between the Azure Monitor Agent, data collection rules and data collection rule associations.",
   "Students will be able to troubleshoot missing guest data by checking agent health, DCR association and destination.",
   "Students will be able to apply DCR transformations and Azure Policy to control cost and scale."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers into 'Azure can see from outside' and 'needs to look inside' on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Tour the three insights with a quick sketch of each view. Then draw the chain VM -> AMA extension -> DCR association -> DCR (what, transform, where) -> workspace. Emphasize that AMA without a DCR sends no guest data and that the Map view needs the Dependency agent."
   ],
   [
    17,
    "Activity",
    "Run the broken chain troubleshooting activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about cost control and policy-driven deployment."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If a server feels slow but its CPU chart looks fine, what other information would you want, and could Azure see it from outside the machine?",
  "activity": {
   "title": "Find the broken link",
   "materials": "Printed troubleshooting cards, each describing a VM monitoring setup and a symptom, plus a whiteboard drawing of the data chain for reference.",
   "steps": [
    "Prepare six cards such as 'AMA installed, no DCR associated; no events', 'DCR sends to workspace A, analyst queries workspace B', 'VM insights enabled, Map empty', 'heartbeats arrive, no syslog', 'storage team asks which agent storage insights needs', 'costs high from one noisy event'.",
    "Pairs take a card, mark on the chain diagram where the break or problem is, and write the fix in one sentence.",
    "Pairs rotate cards every three minutes so each pair solves at least four.",
    "For each card, pairs also write the one KQL query or portal check that would confirm their diagnosis, such as a Heartbeat query.",
    "The class reviews answers card by card, with pairs explaining their chain marking."
   ]
  },
  "discussion": [
   "Why might Microsoft have separated what to collect (the DCR) from the agent itself, compared with older agents that were configured on the workspace?",
   "How would you balance collecting enough guest data to troubleshoot incidents against the cost of ingesting it?"
  ],
  "exit": [
   [
    "What links a data collection rule to a specific VM?",
    "A data collection rule association."
   ],
   [
    "Which insight needs no agent and shows capacity and latency across storage accounts?",
    "Storage insights, built on platform metrics."
   ],
   [
    "Heartbeats arrive but no events do. Name one likely cause.",
    "The VM is not associated with a DCR that collects those events, or the DCR sends to a different workspace."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram of the AMA and DCR chain with blanks to fill in, and pair them with a partner who reads the card aloud.",
   "Extend: Ask fast finishers to design a DCR strategy for 200 servers with three roles (web, SQL, file), deciding how many DCRs to create, what each collects, which transformations to add and how Azure Policy will associate them."
  ]
 },
 {
  "t": "Network Watcher and Connection Monitor",
  "objectives": [
   "Students will be able to list Network Watcher's monitoring, diagnostic and traffic tools and state the purpose of each.",
   "Students will be able to distinguish continuous monitoring with Connection Monitor from one-off diagnostics such as connection troubleshoot and IP flow verify.",
   "Students will be able to design a Connection Monitor test group with sources, destinations, protocol, frequency and thresholds.",
   "Students will be able to select the correct Network Watcher tool for a described network problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about intermittent problems and collect strategies."
   ],
   [
    12,
    "Teach",
    "Draw three columns on the board: Monitoring (Topology, Connection Monitor), Diagnostics (IP flow verify, NSG diagnostics, next hop, effective security rules, connection troubleshoot, packet capture, VPN troubleshoot), Traffic (flow logs, traffic analytics). Then sketch a test group: sources, destinations, test configuration, results into a workspace, metric alert into an action group."
   ],
   [
    18,
    "Activity",
    "Run the tool-matching and test group design activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A problem only happens every evening and is gone by the time you test in the morning. How would you go about catching it?",
  "activity": {
   "title": "Pick the tool, then design the monitor",
   "materials": "Printed tool cards for each Network Watcher tool, printed problem cards (about 10), and a blank test group worksheet per pair.",
   "steps": [
    "Lay out the tool cards on each table. The teacher reads problem cards one at a time, such as 'Which NSG rule blocks port 22?', 'Who are the top talkers this week?', 'The S2S tunnel is flapping', 'Capture packets for analysis', 'Alert when latency to a partner API degrades'.",
    "Pairs hold up the tool card they choose within 30 seconds; the teacher reveals the answer and asks one pair to justify it.",
    "Each pair then gets a scenario for a fictional company with an Azure web tier, an on-premises database and an external API.",
    "Pairs complete the worksheet: test groups, sources and required agents, destinations, protocol and port, frequency, thresholds, and the alert they would create.",
    "Two pairs swap worksheets and check for a missing agent, wrong protocol or missing alert."
   ]
  },
  "discussion": [
   "Why is it valuable to keep connectivity history even when nothing seems wrong?",
   "What would happen in a region if someone deleted the NetworkWatcherRG resource group, and how would you prevent that?"
  ],
  "exit": [
   [
    "Which tool would you use to alert when packet loss to an on-premises server exceeds a threshold?",
    "Connection Monitor, with a metric alert on its checks failed metric."
   ],
   [
    "What agent must an Azure VM source have for Connection Monitor?",
    "The Network Watcher agent extension."
   ],
   [
    "You need to know which security rule denied traffic to a VM on port 3389. Which tool?",
    "IP flow verify (or NSG diagnostics)."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page 'question to tool' reference with the key phrase for each tool, such as 'right now' for connection troubleshoot and 'over time' for Connection Monitor.",
   "Extend: Ask fast finishers to design monitoring for a hub-and-spoke network with two spokes, an on-premises site and an internet API, including where flow logs and traffic analytics fit alongside Connection Monitor."
  ]
 },
 {
  "t": "Recovery Services vault vs Backup vault and what each protects",
  "objectives": [
   "Students will be able to identify which workloads a Recovery Services vault protects and which a Backup vault protects.",
   "Students will be able to explain the same-region requirement for Azure VM backup and the impact of choosing storage redundancy before protection.",
   "Students will be able to design a vault layout for a mixed set of Azure and on-premises workloads.",
   "Students will be able to distinguish Azure Backup from Azure Site Recovery even though both use a Recovery Services vault."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers. Introduce the idea that Azure has two vault types with different accepted items."
   ],
   [
    12,
    "Teach",
    "Draw two large boxes labeled Recovery Services vault and Backup vault and fill in their workloads as you explain. Add shared rules beneath: same region, choose LRS, ZRS or GRS before the first item, soft delete, RBAC roles, Business Continuity Center. Point out that Site Recovery also lives in the Recovery Services vault."
   ],
   [
    18,
    "Activity",
    "Run the vault sorting card activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you had to protect a laptop, a database, a whole server and a shared folder, would you use the same backup method for all four? Why or why not?",
  "activity": {
   "title": "Which vault takes it?",
   "materials": "Printed workload cards (Azure VM, SQL Server in a VM, SAP HANA in a VM, Azure Files share, on-premises folder with MARS, MABS, managed disk, blob container, Azure Database for PostgreSQL, AKS cluster, Site Recovery replication), two labeled sheets for the vault types, and region tags on sticky notes.",
   "steps": [
    "Groups of three shuffle the workload cards and place each on the correct vault sheet.",
    "The teacher adds a twist: each card gets a region sticky note. Groups must decide how many vaults they now need, given that VM backup requires a same-region vault.",
    "Groups write the storage redundancy they would choose for each vault and why, given a stated requirement that production data must be restorable in the paired region.",
    "Groups compare layouts with a neighboring group and count vaults; any difference must be justified.",
    "The teacher reveals the reference layout and highlights the most common misplacements."
   ]
  },
  "discussion": [
   "Why might Microsoft have created a new vault type for newer data sources rather than extending the original one?",
   "What could go wrong for an organization that picks LRS for its production vault to save money, and how would they discover it?"
  ],
  "exit": [
   [
    "Which vault type protects an Azure Files share?",
    "A Recovery Services vault."
   ],
   [
    "Which vault type protects an AKS cluster?",
    "A Backup vault."
   ],
   [
    "When must you choose GRS if you want cross-region restore?",
    "Before protecting the first item, because redundancy cannot be changed afterward."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat sheet with the phrase 'servers and what runs in them' on one side and 'newer data sources' on the other, and have them sort only six cards first.",
   "Extend: Ask fast finishers to design a vault layout for a company with workloads in three regions plus an on-premises site, including RBAC role assignments for a help desk that can restore but not delete."
  ]
 },
 {
  "t": "Backup policies (standard and enhanced), on-demand backup, soft delete and cross-region restore",
  "objectives": [
   "Students will be able to compare standard and enhanced Azure VM backup policies, including when the enhanced policy is required.",
   "Students will be able to design retention rules from RPO and compliance requirements.",
   "Students will be able to explain how on-demand backups, soft delete, immutability and multi-user authorization protect recovery points.",
   "Students will be able to state the prerequisites for cross-region restore."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers about how often and how long."
   ],
   [
    13,
    "Teach",
    "Draw a timeline showing daily, weekly, monthly and yearly retention points. Contrast standard (one per day) with enhanced (several per day, required for Trusted Launch, Premium SSD v2 and Ultra disks). Add Backup now as a pinned point with its own date. Draw a shield layer for soft delete, always-on, immutability and MUA, and a second region for CRR with GRS."
   ],
   [
    17,
    "Activity",
    "Run the policy design challenge below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about ransomware and trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If your laptop died right now, how much of your work could you afford to lose, and how far back would you ever need to go to find an old file?",
  "activity": {
   "title": "Policy design challenge",
   "materials": "Printed requirement cards for four fictional workloads, a blank policy worksheet per group, and the whiteboard for sharing.",
   "steps": [
    "Give each group one workload card with RPO, retention and risk requirements, such as 'backups every 6 hours, 60 days daily, 5 years monthly, ransomware concern, must survive regional outage, Trusted Launch VM'.",
    "Groups fill in the worksheet: policy type, schedule, daily, weekly, monthly and yearly retention, vault redundancy, CRR setting, soft delete mode, and whether to use immutability or MUA.",
    "Groups add one on-demand backup event their workload would need and its retain-until date.",
    "Each group passes its worksheet clockwise; the receiving group checks it against the card and writes one correction or confirmation.",
    "Groups present their final design in one minute each while the teacher confirms key choices."
   ]
  },
  "discussion": [
   "Why would an attacker target backups before encrypting production systems, and which settings from today stop that?",
   "What are the costs and trade-offs of keeping many backups per day and long retention, and how would you justify them to a manager?"
  ],
  "exit": [
   [
    "Name one VM configuration that requires the enhanced backup policy.",
    "Trusted Launch VMs (or VMs with Premium SSD v2 or Ultra disks)."
   ],
   [
    "How long are soft-deleted backups kept by default?",
    "14 days."
   ],
   [
    "What vault setting must be chosen before protection to allow cross-region restore later?",
    "Geo-redundant storage (GRS), then the CRR setting is enabled."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in sample policy for a simple workload and have struggling students modify it for their card rather than starting from blank.",
   "Extend: Ask fast finishers to estimate how many recovery points their design holds at any time and to propose a cheaper retention scheme that still meets the requirements."
  ]
 },
 {
  "t": "Restoring VMs, disks and individual files",
  "objectives": [
   "Students will be able to describe the four main Azure VM restore options: Create new, Restore disks, Replace existing and File Recovery.",
   "Students will be able to select the correct restore option for a scenario based on what was lost and what must be preserved.",
   "Students will be able to outline the File Recovery process, including the script, iSCSI mount and unmount step.",
   "Students will be able to explain how restores differ for Azure Disk Backup, Azure Files and SQL Server in a VM."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to 'match the fix to the damage'."
   ],
   [
    12,
    "Teach",
    "Draw a decision tree on the board starting with 'What was lost?': a few files leads to File Recovery; whole VM leads to 'Does the VM still exist and must identity stay?' (Replace existing) or 'Need custom settings or only disks?' (Restore disks) or 'Just need a working VM fast?' (Create new). Then add a side branch for other data sources: disk backup restores as a new disk, Azure Files to original or alternate location, SQL to a point in time."
   ],
   [
    18,
    "Activity",
    "Run the help desk restore role-play below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you accidentally deleted one photo from your phone, would you restore the whole phone from a backup? What would you do instead?",
  "activity": {
   "title": "Restore desk role-play",
   "materials": "Printed ticket cards (about 10) describing restore requests, a printed decision tree per pair, and sticky notes.",
   "steps": [
    "In pairs, one student is the requester and reads a ticket card aloud, such as 'I deleted a folder yesterday', 'The VM was deleted and we need it with a specific size', 'The VM boots to a blue screen after patching but must keep its IP', 'We need a disk from last week attached to a test VM'.",
    "The other student is the administrator and must choose the restore type, state one prerequisite (such as the VM must exist, or the script needs outbound access) and one follow-up step (such as unmount disks).",
    "Pairs switch roles after each ticket and record answers on sticky notes.",
    "After eight tickets, pairs place their sticky notes on a class board grouped by restore type.",
    "The teacher reviews any tickets placed under more than one restore type and settles the correct answer with the class."
   ]
  },
  "discussion": [
   "Why might an organization regularly practice restores even when nothing is broken?",
   "When could Replace existing be risky, and how does the pre-restore snapshot reduce that risk?"
  ],
  "exit": [
   [
    "A VM was deleted and must come back with custom settings. Which restore type?",
    "Restore disks, then deploy the customized template."
   ],
   [
    "What must you do in the portal after copying files with File Recovery?",
    "Unmount the disks."
   ],
   [
    "Which restore type keeps the VM's name and IP while replacing corrupted data?",
    "Replace existing."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a laminated decision tree and limit them to the four VM restore types before introducing other data sources.",
   "Extend: Ask fast finishers to write a restore runbook for a ransomware scenario covering which recovery point to choose, which restore type to use for each of three servers, and how soft delete and immutability affect the plan."
  ]
 },
 {
  "t": "Azure Site Recovery: replication to a secondary region, test failover, failover, commit and failback",
  "objectives": [
   "Students will be able to explain the difference between Azure Site Recovery and Azure Backup in terms of RPO, RTO and purpose.",
   "Students will be able to describe how Azure-to-Azure replication is configured, including vault placement and the Mobility service.",
   "Students will be able to sequence the ASR lifecycle: enable replication, test failover and cleanup, failover, commit, re-protect, failback, commit, re-protect.",
   "Students will be able to choose recovery point options and recovery plans for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about fire drills and record why drills must not disrupt normal work."
   ],
   [
    12,
    "Teach",
    "Draw two regions on the board with arrows. Show replication primary to secondary, the vault in the secondary region, and the cache storage account in the source. Walk through test failover into an isolated VNet and cleanup. Then draw the failover, commit, re-protect arrow reversing, failback, commit, re-protect. Add recovery point options and recovery plans with ordered groups."
   ],
   [
    18,
    "Activity",
    "Run the DR lifecycle sequencing and role-play activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Why do schools run fire drills, and what rules make sure a drill does not cause problems of its own?",
  "activity": {
   "title": "Run the DR drill",
   "materials": "Printed step cards (Enable replication, Test failover, Cleanup test failover, Failover, Change recovery point, Commit, Re-protect, Failback, Commit, Re-protect), a printed scenario sheet, and whiteboard space with two regions drawn.",
   "steps": [
    "Groups of four receive shuffled step cards and arrange them in the correct order on their desks, setting aside any optional step.",
    "The teacher reads a scenario timeline for a fictional company (quarterly drill, then a real outage, then recovery of the primary region). Groups move a marker along their cards and, at each point, state which region the VMs run in and which direction replication flows.",
    "The teacher injects problems, such as 'test VMs were started on the production VNet' or 'the team wants a newer recovery point after committing', and groups decide the consequence and correct action.",
    "Each group designs a recovery plan for a three-tier app on the whiteboard, listing groups in order and one script or runbook step.",
    "Groups compare orders and plans, and the teacher confirms the reference sequence."
   ]
  },
  "discussion": [
   "Why is it important that a disaster recovery plan is tested regularly rather than only documented?",
   "In what situations would you choose Latest over Latest processed, and what does that trade off?"
  ],
  "exit": [
   [
    "What step finalizes a failover and removes other recovery points?",
    "Commit."
   ],
   [
    "What must you do before failing back to the primary region?",
    "Re-protect, so the VMs replicate from the secondary back to the primary region."
   ],
   [
    "Where should the vault for Azure-to-Azure replication be located?",
    "In a different region from the source VMs, typically the target region."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the step cards with numbers on the back so they can self-check the order, and a two-region diagram to trace arrows on.",
   "Extend: Ask fast finishers to write the RPO and RTO they would promise for a given app, justify the recovery point option they would pick in an unplanned failover, and explain how they would combine ASR with Azure Backup for ransomware protection."
  ]
 },
 {
  "t": "Backup reports and alerts",
  "objectives": [
   "Students will be able to explain the prerequisites for Backup reports, including vault diagnostic settings in resource-specific mode and a Log Analytics workspace.",
   "Students will be able to identify which Backup reports tab answers a given governance or cost question.",
   "Students will be able to configure notification for built-in backup alerts using an alert processing rule and an action group.",
   "Students will be able to choose a log search or metric alert for a custom backup monitoring condition."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the difference between trends (reports) and events (alerts)."
   ],
   [
    12,
    "Teach",
    "Draw the reports pipeline on the board: vault -> diagnostic setting (resource-specific) -> Log Analytics workspace -> Backup reports workbook, with a note that data takes hours. List the report tabs and one question each answers. Then draw the alerts path: built-in alerts -> recorded silently -> alert processing rule -> action group -> email or webhook. Show the sample KQL query for a custom log search alert."
   ],
   [
    18,
    "Activity",
    "Run the 'which tab, which alert' scenario relay below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If you were in charge of backups for 50 servers, how would you know on a Monday morning that every one of them was backed up over the weekend?",
  "activity": {
   "title": "Which tab, which alert?",
   "materials": "Printed question cards (about 12), a printed list of Backup reports tabs and alerting options, and whiteboard columns for Reports and Alerts.",
   "steps": [
    "Prepare cards such as 'Which customer's storage grew most?', 'Did every critical VM back up daily last month?', 'Text me when soft delete is disabled', 'Find items still billed but unused', 'Alert when any SQL backup fails three nights in a row', 'Reports show no data for a new vault'.",
    "Teams line up in a relay. One student at a time takes a card, runs to the board, places it under Reports or Alerts, and writes the specific tab, setting or alert type.",
    "The next teammate may either take a new card or correct one previous placement from their team.",
    "After all cards are placed, teams review the board and challenge any answers they think are wrong.",
    "The teacher confirms answers and highlights the prerequisite cards (diagnostic settings, action groups) that unlock the others."
   ]
  },
  "discussion": [
   "Why might Microsoft record built-in backup alerts without notifying anyone by default, and what risk does that create if administrators do not configure routing?",
   "How could a managed service provider use Backup reports as evidence in conversations with customers?"
  ],
  "exit": [
   [
    "What must be configured on each vault before Backup reports show data?",
    "A diagnostic setting sending backup data to a Log Analytics workspace in resource-specific mode."
   ],
   [
    "How do you get emailed for built-in backup alerts?",
    "Create an alert processing rule that routes backup alerts to an action group with email notifications."
   ],
   [
    "Which tab would you open to find backup items that are still billed but no longer needed?",
    "The Optimize tab."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching sheet that pairs each report tab with a sample question, and a two-step card reminding them 'reports need diagnostics; alerts need an action group'.",
   "Extend: Ask fast finishers to write a KQL query against AddonAzureBackupJobs that counts failed backup jobs per backup item over seven days, and to describe the log search alert they would base on it, including frequency and threshold."
  ]
 }
]);
