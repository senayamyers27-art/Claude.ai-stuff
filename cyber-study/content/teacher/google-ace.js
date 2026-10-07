/* Teacher edition for Google Cloud Associate Cloud Engineer (Associate Cloud Engineer): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("google-ace", [
 {
  "t": "Resource hierarchy: organization, folders and projects, and how IAM and organization policies are inherited",
  "objectives": [
   "Students will be able to describe the levels of the Google Cloud resource hierarchy and what each level is used for.",
   "Students will be able to explain why IAM allow policies are additive and predict a principal's effective access from grants at several levels.",
   "Students will be able to distinguish IAM allow policies, IAM deny policies and organization policies in a scenario.",
   "Students will be able to choose the right level of the hierarchy at which to apply a grant or a constraint."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the contractor who keeps access. Collect two or three guesses on the whiteboard without confirming any yet."
   ],
   [
    12,
    "Teach",
    "Draw the tree: organization, folders, projects, resources. Explain that every resource lives in one project, then walk through inheritance with a Viewer-on-folder, Editor-on-project example. Contrast IAM allow, deny and organization policies with one sentence each."
   ],
   [
    18,
    "Activity",
    "Run the 'Trace the access' card activity in pairs. Circulate and ask each pair to say aloud which layer (allow, deny, organization policy) decided each outcome."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up guesses and resolve them. Use the discussion questions to connect the activity to design choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "An administrator removes a contractor's Viewer role on a project, but the contractor can still list buckets in that project. Write down two possible reasons.",
  "activity": {
   "title": "Trace the access",
   "materials": "Whiteboard, printed scenario cards (one hierarchy diagram per card with grants and policies written at each level), sticky notes, markers.",
   "steps": [
    "Give each pair a card showing an organization, two folders and four projects, with grants such as 'group:auditors Viewer at organization' and 'user:leo Editor on folder Dev'.",
    "For five listed questions on the card, such as 'Can Leo start a VM in project dev-api?', pairs trace upward from the resource and write the effective access on a sticky note.",
    "Add a twist card: an organization policy on the Prod folder blocks external IPs, and a deny policy blocks project deletion for everyone outside the security group. Pairs re-answer the affected questions.",
    "Each pair redesigns one grant on their card to follow least privilege and explains the change to a neighboring pair."
   ]
  },
  "discussion": [
   "Why do you think Google made allow policies additive instead of letting a child override its parent?",
   "When would you put a rule on a folder rather than on each project, and what risk does that create?"
  ],
  "exit": [
   [
    "A user is Viewer on a folder and Editor on a project inside it. What is their effective access on that project?",
    "Editor, because effective access is the union of all inherited and direct grants."
   ],
   [
    "What tool restricts allowed regions for everyone, including project Owners?",
    "An organization policy using the resource locations constraint."
   ],
   [
    "Every resource belongs to how many projects?",
    "Exactly one."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn tree with arrows showing the direction of inheritance, and have them answer only the first three trace questions before the twist card.",
   "Extend: Ask fast finishers to write a scenario where an IAM deny policy is the only correct answer, and explain why an organization policy or removing a grant would not work."
  ]
 },
 {
  "t": "Creating projects: project name, project ID and project number, and enabling APIs",
  "objectives": [
   "Students will be able to distinguish the project name, project ID and project number and state which can change.",
   "Students will be able to write the gcloud commands to create a project in a folder and enable an API.",
   "Students will be able to diagnose an 'API not enabled' error and choose the correct fix over IAM distractors.",
   "Students will be able to explain what happens when a project is deleted and restored."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and let students share which identifier they think scripts should use and why."
   ],
   [
    12,
    "Teach",
    "Show a project's settings page on the projector (or a screenshot) and point out name, ID and number. Write `gcloud projects create` and `gcloud services enable` on the board and explain each flag. Explain service agents and project deletion."
   ],
   [
    18,
    "Activity",
    "Run the 'Error message triage' activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their trickiest card and the discussion questions are used to generalize."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your manager wants to rename a project from 'acct-tmp' to 'Accounting Production'. Which parts of the project can change, and what might break if they did?",
  "activity": {
   "title": "Error message triage",
   "materials": "Printed cards each showing a short, realistic gcloud error or request (API disabled, billing not linked, permission denied, request to change project ID), whiteboard, markers.",
   "steps": [
    "In groups of three, students sort the cards into three columns on the whiteboard: 'Enable an API', 'Fix IAM or billing', and 'Not possible'.",
    "For each 'Enable an API' card, the group writes the exact `gcloud services enable` command with the correct service name.",
    "For each 'Not possible' card, such as changing a project ID, the group writes what the team should do instead.",
    "Groups swap boards with another group and check each other's commands for typos and wrong service names."
   ]
  },
  "discussion": [
   "Why might Google make project IDs permanent and globally unique, even though that occasionally frustrates teams?",
   "What naming convention would you propose for project IDs in a company with many teams and environments?"
  ],
  "exit": [
   [
    "Which project identifier can be changed after creation?",
    "Only the project name (display name)."
   ],
   [
    "Write the command to enable the Cloud Run API in the current project.",
    "`gcloud services enable run.googleapis.com`."
   ],
   [
    "A deleted project's ID: can it be reused after the pending deletion period ends?",
    "No, it can never be reused."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference sheet listing common service names (compute, run, container, sqladmin) so students can focus on recognizing the error type.",
   "Extend: Ask students to write a short shell script outline that creates a project in a folder, links billing and enables three APIs, noting which roles the runner needs."
  ]
 },
 {
  "t": "Organization Policy Service: constraints such as resource locations and disabling service account key creation",
  "objectives": [
   "Students will be able to explain how organization policies differ from IAM and why they apply even to project Owners.",
   "Students will be able to match common requirements to the correct predefined constraint.",
   "Students will be able to describe how organization policies are inherited and why they are generally not retroactive.",
   "Students will be able to identify which role is required to set organization policies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to vote: IAM change or something else."
   ],
   [
    12,
    "Teach",
    "Contrast who-can (IAM) with what-is-allowed (organization policy). Introduce list and boolean constraints and walk through the five common constraints, writing each name on the board with a one-line purpose. Explain inheritance and the not-retroactive rule."
   ],
   [
    18,
    "Activity",
    "Run the 'Requirement to control' card match."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore when guardrails help and when they slow teams down."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A company wants to guarantee that nobody, not even project owners, can create storage outside Europe. Is removing roles from owners a good solution? Why or why not?",
  "activity": {
   "title": "Requirement to control",
   "materials": "Printed requirement cards (about 12), printed control cards (constraint names, IAM role ideas, deny policy), whiteboard, tape.",
   "steps": [
    "Pairs receive requirement cards such as 'No public buckets anywhere', 'Only the network team may create firewall rules', and 'No grants to Gmail accounts'.",
    "Pairs match each requirement to a control card, placing organization policy answers on the left of the whiteboard and IAM answers on the right.",
    "For each organization policy match, pairs note whether existing resources will be affected and what cleanup is needed.",
    "The class reviews the board together, and the teacher highlights the wording cues ('nobody', 'even owners', 'only this group') that decided each answer."
   ]
  },
  "discussion": [
   "What problems could an organization-wide constraint cause for teams, and how would you handle legitimate exceptions?",
   "Why is blocking service account key creation considered such an important guardrail?"
  ],
  "exit": [
   [
    "Which constraint blocks new service account keys?",
    "iam.disableServiceAccountKeyCreation."
   ],
   [
    "Which role is needed to set organization policies, and where is it granted?",
    "Organization Policy Administrator, granted at the organization level."
   ],
   [
    "A VM with an external IP existed before the external IP constraint was enforced. What happens to it?",
    "It keeps its IP; constraints are checked on create and update, not applied retroactively."
   ]
  ],
  "differentiation": [
   "Support: Give students a glossary card pairing each constraint name with a plain-language description before the matching activity.",
   "Extend: Ask students to sketch a YAML policy for gcp.resourceLocations that allows only an EU value group on one folder, and explain how a child project could merge or replace it."
  ]
 },
 {
  "t": "Managing users and groups with Cloud Identity or Google Workspace, and Google Cloud Directory Sync",
  "objectives": [
   "Students will be able to explain where Google Cloud user identities live and why IAM does not create users.",
   "Students will be able to describe what Google Cloud Directory Sync does, including its one-way direction, and how SAML SSO complements it.",
   "Students will be able to justify granting IAM roles to groups rather than to individual users.",
   "Students will be able to distinguish identities for people from identities for workloads."
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
    "Draw the flow: Active Directory, then GCDS, then Cloud Identity users and groups, then IAM bindings on projects. Add a separate arrow for SAML SSO from the browser to the identity provider. Explain super admins and why service accounts are not for people."
   ],
   [
    18,
    "Activity",
    "Run the 'Joiner, mover, leaver' role-play."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on what the role-play showed."
   ],
   [
    5,
    "Exit ticket",
    "Collect the three exit answers."
   ]
  ],
  "warmup": "Your company has 3,000 employees in Active Directory. How would you give them access to Google Cloud without typing every name into a new system?",
  "activity": {
   "title": "Joiner, mover, leaver",
   "materials": "Sticky notes in three colors, whiteboard drawn with three zones (Active Directory, Cloud Identity, IAM on projects), printed event cards.",
   "steps": [
    "Assign roles: HR (edits AD), GCDS (copies changes at 'sync time'), identity provider (answers sign-in), and project admin (manages IAM).",
    "Read event cards one at a time: a new hire in the network team, an engineer moving from dev to data, a contractor leaving. HR moves sticky notes in the AD zone.",
    "On 'sync time', the GCDS student copies the changes into the Cloud Identity zone. The class checks whether any IAM change was needed, which it should not be when roles are granted to groups.",
    "Debrief by asking what would have happened if roles had been granted to individuals or if the contractor used a personal Gmail account."
   ]
  },
  "discussion": [
   "What risks appear if a company lets employees use personal Gmail accounts for Google Cloud?",
   "Why might a company still sync on a schedule rather than in real time, and what gap does SSO close?"
  ],
  "exit": [
   [
    "Which tool copies users and groups from Active Directory into Cloud Identity, and in which direction?",
    "Google Cloud Directory Sync, one way from AD to Google."
   ],
   [
    "What lets users sign in to Google with their existing corporate credentials?",
    "SAML single sign-on with the company's identity provider."
   ],
   [
    "Should a new employee be given a service account to access the console?",
    "No. Service accounts are for workloads; employees use managed user accounts and receive roles via groups."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the AD to GCDS to Cloud Identity to IAM flow that students can annotate during the role-play.",
   "Extend: Ask fast finishers to list what should happen to the cloud access of a departing super administrator and design a safe process for it."
  ]
 },
 {
  "t": "Granting IAM roles to users and groups at the organization, folder and project levels",
  "objectives": [
   "Students will be able to identify the principal, role and resource in an IAM binding.",
   "Students will be able to write gcloud commands that add and remove IAM bindings on projects, folders and the organization.",
   "Students will be able to choose the narrowest level and role that satisfies a stated access requirement.",
   "Students will be able to explain why a principal might have access that is not visible on a project's own policy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up request and ask students to suggest a grant. Write the fastest and the safest suggestions side by side."
   ],
   [
    12,
    "Teach",
    "Break a binding into principal, role and resource. Show `add-iam-policy-binding` for project, folder and organization, highlighting the member prefixes and the roles/ prefix. Compare basic, predefined and custom roles, then mention conditions and Policy Troubleshooter."
   ],
   [
    18,
    "Activity",
    "Run 'Write the grant' in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion prompts to review tradeoffs between convenience and least privilege."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "The data team says 'just make us Editor on everything so we stop filing tickets.' What could go wrong, and what would you offer instead?",
  "activity": {
   "title": "Write the grant",
   "materials": "Printed request cards, a printed hierarchy diagram with folder and project IDs, a short list of predefined role names, whiteboard.",
   "steps": [
    "Each pair draws four request cards, such as 'Security team must view everything in the company' or 'One analyst needs to read one dataset'.",
    "For each card, pairs write the full gcloud command, including the correct level (organization, folder, project or resource), the member prefix and the role.",
    "Pairs trade cards with another pair, who check for three things: right level, group rather than user where sensible, and narrowest role.",
    "The teacher picks two commands with common errors (missing prefix, basic role at the organization) and the class corrects them together on the whiteboard."
   ]
  },
  "discussion": [
   "When, if ever, is a basic role like Editor acceptable, and what would you do to limit the risk?",
   "How would you audit a project to find everyone who can delete its resources?"
  ],
  "exit": [
   [
    "In `--member=group:devs@example.com --role=roles/compute.viewer` on a project, what are the principal, role and resource?",
    "Principal: the devs group; role: Compute Viewer; resource: the project."
   ],
   [
    "Where should you grant a role that must apply to all current and future projects in the Finance department?",
    "On the Finance folder."
   ],
   [
    "Write the command to remove that role from the group on project web-prod.",
    "`gcloud projects remove-iam-policy-binding web-prod --member=group:devs@example.com --role=roles/compute.viewer`."
   ]
  ],
  "differentiation": [
   "Support: Provide a command template with blanks for level, ID, member type, member and role so students can focus on choosing the right values.",
   "Extend: Ask fast finishers to add an IAM condition to one of their grants that limits it to resources with a name prefix or makes it expire, and explain one limitation of conditions."
  ]
 },
 {
  "t": "Cloud Billing accounts: linking projects to billing and the billing IAM roles",
  "objectives": [
   "Students will be able to explain the relationship between billing accounts and projects, including the one-account-per-project rule.",
   "Students will be able to match billing IAM roles to job requirements using least privilege.",
   "Students will be able to describe the permissions needed on both the billing account and the project to link billing.",
   "Students will be able to predict what happens to resources when a project loses billing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and take quick guesses."
   ],
   [
    12,
    "Teach",
    "Draw one billing account with arrows to several projects. List the billing roles in a table with 'can do' and 'cannot do' columns. Show the `gcloud billing projects link` command and explain the two-sided permission check."
   ],
   [
    18,
    "Activity",
    "Run the 'Who gets which key' role-matching activity."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect billing roles to real separation-of-duties concerns."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A pipeline can create projects but fails when it tries to attach them to the company billing account. What permission might it be missing, and on which resource?",
  "activity": {
   "title": "Who gets which key",
   "materials": "Printed persona cards (finance lead, platform automation, FinOps analyst, engineering manager, developer), printed role cards for each billing role, whiteboard.",
   "steps": [
    "Small groups receive the persona cards, each describing what the person must and must not be able to do.",
    "Groups assign the narrowest billing role (or none) to each persona and tape the pairings on the whiteboard.",
    "The teacher reveals a twist: the automation account can create projects but linking fails. Groups decide which additional role is missing and on which resource.",
    "Groups explain one choice to the class, naming the specific action the role allows and one action it prevents."
   ]
  },
  "discussion": [
   "Why might finance want to keep payment control separate from the engineers who create projects?",
   "When would a company justify more than one billing account?"
  ],
  "exit": [
   [
    "Which billing role lets someone link projects to a billing account without managing it?",
    "Billing Account User."
   ],
   [
    "How many billing accounts can one project be linked to at the same time?",
    "One."
   ],
   [
    "What happens to VMs in a project whose billing is disabled?",
    "They are shut down, and paid services stop; data may eventually be deleted."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column cheat sheet of billing roles with plain-language descriptions to use while matching personas.",
   "Extend: Ask students to outline the full set of roles an automation service account needs to create a project in a folder, link billing and enable APIs."
  ]
 },
 {
  "t": "Budgets, budget alerts and exporting billing data to BigQuery",
  "objectives": [
   "Students will be able to explain what budgets and threshold rules do and state clearly that budgets do not cap spending.",
   "Students will be able to design an automated response to budget alerts using Pub/Sub and a function.",
   "Students will be able to describe the billing export types and when to use BigQuery export for cost analysis.",
   "Students will be able to explain how labels improve cost reporting."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt and ask for a show of hands: does a budget stop spending?"
   ],
   [
    12,
    "Teach",
    "Draw the flow: usage, billing data (with a delay), budget thresholds, notifications to email, Monitoring and Pub/Sub, then optional code. Separately draw billing export into a BigQuery dataset and a sample SQL idea grouped by label."
   ],
   [
    18,
    "Activity",
    "Run 'Design the guardrail' in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh automation risks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A lab set a $200 budget but still received a much larger bill. List two reasons this could happen even though the budget was configured correctly.",
  "activity": {
   "title": "Design the guardrail",
   "materials": "Whiteboard or large paper, markers, printed scenario cards (sandbox lab, production web app, finance reporting request), sticky notes.",
   "steps": [
    "Each group receives one scenario card describing a team, its risk and its reporting needs.",
    "Groups draw their design: budget scope and amount, threshold rules (actual or forecasted), notification targets, and whether Pub/Sub automation is used and what it does.",
    "Groups add a reporting section: which labels to require and whether billing export to BigQuery is needed, with one example question the data should answer.",
    "Groups present for two minutes each while others check one thing: does the design wrongly assume the budget itself stops spending?"
   ]
  },
  "discussion": [
   "What could go wrong if automation disables billing on a project when a budget is reached, and where is that acceptable?",
   "Why does a delay in billing data matter when designing cost controls?"
  ],
  "exit": [
   [
    "Does a budget stop resources when spend reaches 100%? What would you need for automatic action?",
    "No. Publish budget notifications to Pub/Sub and use code, such as a Cloud Run function, to act."
   ],
   [
    "Which tool lets finance analyze costs with SQL?",
    "Billing export to BigQuery."
   ],
   [
    "What threshold type warns you before you actually exceed the budget?",
    "A forecasted spend threshold."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in diagram with boxes for budget, thresholds, notification targets and optional automation so students can focus on choices rather than layout.",
   "Extend: Ask students to write, in plain words or pseudocode, the SQL query that would sum cost by a team label per month, naming the columns they expect to use."
  ]
 },
 {
  "t": "Installing and configuring the Google Cloud CLI: gcloud init, named configurations, default project, region and zone",
  "objectives": [
   "Students will be able to describe what gcloud init does and which properties a configuration holds.",
   "Students will be able to create, activate and list named configurations and set default project, region and zone.",
   "Students will be able to distinguish gcloud auth login from gcloud auth application-default login.",
   "Students will be able to explain how flags and environment variables override configuration properties."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Tell the story from the warm-up and ask students how the wrong VM got deleted."
   ],
   [
    12,
    "Teach",
    "On the projector or whiteboard, walk through `gcloud init`, `gcloud config set`, `gcloud config list` and the `configurations` subcommands. Draw the precedence ladder: flag, environment variable, active configuration. Contrast the two auth commands."
   ],
   [
    18,
    "Activity",
    "Run 'Command card relay' in teams, or in Cloud Shell if student accounts are available."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect habits to safety."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An engineer deleted a VM in the wrong customer's project. The command itself was correct. What could have caused this, and how could it have been prevented?",
  "activity": {
   "title": "Command card relay",
   "materials": "Printed task cards and printed command cards (some correct, some invented distractors), whiteboard divided into team columns, or student laptops with a browser if Cloud Shell is available.",
   "steps": [
    "Teams line up. The teacher reads a task, such as 'Create a configuration named staging' or 'Set the default zone to europe-west1-b'.",
    "One student per team runs to the table, picks the correct command card from a pile that includes invented distractors, and tapes it in the team's column.",
    "After eight tasks, teams review the board together; any team that picked a fake command must explain the correct syntax.",
    "Optional extension if laptops are available: students run the real commands in Cloud Shell and show `gcloud config configurations list` output."
   ]
  },
  "discussion": [
   "What habits would you build into your daily workflow to avoid running commands against the wrong project?",
   "Why should automation scripts pass --project explicitly instead of relying on the active configuration?"
  ],
  "exit": [
   [
    "Write the command to set the default zone to us-central1-a.",
    "`gcloud config set compute/zone us-central1-a`."
   ],
   [
    "Which command switches to a configuration named prod?",
    "`gcloud config configurations activate prod`."
   ],
   [
    "Your app's client library can't find credentials on your laptop, but gcloud works. What do you run?",
    "`gcloud auth application-default login`."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page command reference grouped by purpose (auth, config, configurations) for students to consult during the relay.",
   "Extend: Ask students to explain the precedence between a --project flag, the CLOUDSDK_ACTIVE_CONFIG_NAME variable and the active configuration, with an example where each one wins."
  ]
 },
 {
  "t": "Cloud Shell, the Google Cloud console and Cloud Shell Editor",
  "objectives": [
   "Students will be able to describe what Cloud Shell provides and which part of it persists between sessions.",
   "Students will be able to choose between the console, Cloud Shell, Cloud Shell Editor and Cloud Workstations for a given task.",
   "Students will be able to use the console's Equivalent code link to find the CLI command for a console action.",
   "Students will be able to explain the limits of Cloud Shell as a workspace."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about responding to an incident from a borrowed computer."
   ],
   [
    10,
    "Teach",
    "Demonstrate (live or with screenshots) the project picker, search bar, a create form with the Equivalent code link, opening Cloud Shell, and opening the editor. Explain what persists and what does not."
   ],
   [
    20,
    "Activity",
    "Run the 'What survives?' sort and the tool-choice cards."
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
  "warmup": "You are on call and only have a borrowed computer with a browser. How would you run gcloud and kubectl commands without installing anything?",
  "activity": {
   "title": "What survives?",
   "materials": "Printed item cards (a script in $HOME, a package installed with apt, a .bashrc alias, a file in /tmp, a cloned repo in $HOME), printed task cards for tool choice, whiteboard with two columns labeled Survives and Lost.",
   "steps": [
    "Pairs sort the item cards into Survives and Lost columns for a new Cloud Shell session the next day.",
    "The class checks the sort together; the teacher explains how .customize_environment can reinstall tools automatically.",
    "Pairs then match task cards (quick kubectl check, full-time dev environment, learn the command for a console form, preview a web app on port 8080) to the best tool or feature.",
    "If laptops with browsers and accounts are available, pairs open Cloud Shell and find the Equivalent code link on a create form to confirm one answer."
   ]
  },
  "discussion": [
   "Why might a company prefer that engineers use Cloud Shell over installing tools on personal devices?",
   "What should never be stored only in a Cloud Shell home directory, and where should it go instead?"
  ],
  "exit": [
   [
    "What persists in Cloud Shell between sessions?",
    "Only the home directory."
   ],
   [
    "What console feature shows the gcloud command for a form you filled out?",
    "The Equivalent code or command line link."
   ],
   [
    "How do you view a web app running on port 8080 in Cloud Shell?",
    "Use Cloud Shell web preview on that port."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled screenshot of the console header showing the project picker, search bar and Cloud Shell icon to reference during the activity.",
   "Extend: Ask students to write the contents of a short .customize_environment idea that installs a tool each session, and explain why it lives in the home directory."
  ]
 },
 {
  "t": "Quotas: viewing usage, understanding quota errors and requesting increases",
  "objectives": [
   "Students will be able to distinguish allocation quotas, rate quotas and system limits.",
   "Students will be able to read a quota error and identify the metric and region that must change.",
   "Students will be able to describe how to view quotas and request an increase, and which permission is required.",
   "Students will be able to reject IAM and API-related distractors when troubleshooting quota failures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up error message on the projector and ask students what it tells them."
   ],
   [
    12,
    "Teach",
    "Explain the three kinds of limits with examples. Point out that many Compute Engine quotas are regional. Walk through the Quotas and system limits page (screenshot or live) and the Edit quota flow, including justification and approval timing."
   ],
   [
    18,
    "Activity",
    "Run the 'Error detective' card activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to discuss planning and cost control."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "An error says: Quota 'CPUS' exceeded. Limit: 24.0 in region us-east1. What two pieces of information in that message tell you what to fix?",
  "activity": {
   "title": "Error detective",
   "materials": "Printed error cards (CPU quota exceeded, HTTP 429 from an API, permission denied, API not enabled, maximum object size exceeded), printed fix cards, whiteboard.",
   "steps": [
    "Pairs receive a mixed stack of error cards and sort them into Quota, System limit, IAM and API enablement piles.",
    "For each Quota card, pairs write the metric, the region or dimension, and two valid fixes, such as requesting an increase or deploying to another region.",
    "For each System limit card, pairs describe a design change instead of a request.",
    "Pairs swap stacks and check each other's work; the teacher calls out any card where an IAM fix was suggested for a quota error and asks the class to correct it."
   ]
  },
  "discussion": [
   "Why would Google start new projects with conservative quotas, and how does that help customers?",
   "When would you deliberately lower a quota, and what is the risk of setting it too low?"
  ],
  "exit": [
   [
    "Name the three kinds of limits.",
    "Allocation quotas, rate quotas and system limits."
   ],
   [
    "A deployment fails with a regional CPUS quota error. Give one correct fix.",
    "Request a quota increase for CPUS in that region, or deploy in another region with available quota."
   ],
   [
    "Will granting Owner to the service account fix a quota error?",
    "No. Quotas are separate from IAM."
   ]
  ],
  "differentiation": [
   "Support: Highlight the metric and region in each printed error message so students can practice recognizing the pattern before working unaided.",
   "Extend: Ask students to design a monitoring alert on quota usage and explain the threshold they would choose and who should receive it."
  ]
 },
 {
  "t": "Regions, zones and labels: placing resources and organizing them for cost reporting",
  "objectives": [
   "Students will be able to explain the difference between regions and zones and classify resources as global, regional or zonal.",
   "Students will be able to design placement that survives a zone failure and identify when a second region is needed.",
   "Students will be able to list factors for choosing a region.",
   "Students will be able to distinguish labels, network tags and resource manager tags and choose labels for cost reporting."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers on a simple map on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw a region with three zones. Place example resources (VM, zonal disk, regional disk, subnet, VPC, load balancer) at the right scope. Explain zone versus region failure. Then introduce labels with examples and contrast them with network tags and resource manager tags."
   ],
   [
    18,
    "Activity",
    "Run 'Place and label' in small groups."
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
  "warmup": "If every server for an app is in one data center building and that building loses power, what happens? How would you avoid it?",
  "activity": {
   "title": "Place and label",
   "materials": "Whiteboard or large paper with a drawn region containing three zones and a second region, sticky notes representing resources, printed requirement cards, markers.",
   "steps": [
    "Each group receives a requirement card, such as 'survive a zone outage', 'survive a regional outage', or 'keep EU customer data in the EU'.",
    "Groups place resource sticky notes (VMs, disks, database, load balancer, VPC, subnets) on the diagram to meet their requirement, noting each resource's scope.",
    "Groups write a label scheme on the sticky notes (keys and allowed values) so finance could report cost by app and environment, and add one network tag for a firewall rule, explaining the difference.",
    "Groups rotate to review another group's diagram and leave one sticky-note comment about a single point of failure or an inconsistent label."
   ]
  },
  "discussion": [
   "What tradeoffs come with deploying to two regions instead of one?",
   "How would you make sure every team applies labels consistently?"
  ],
  "exit": [
   [
    "Classify these: VPC network, subnet, VM instance.",
    "VPC network: global; subnet: regional; VM instance: zonal."
   ],
   [
    "A requirement says the app must survive a zone failure. What do you do?",
    "Spread instances across multiple zones in the region, for example with a regional managed instance group and highly available storage."
   ],
   [
    "Which feature should you use to report costs by application: labels or network tags?",
    "Labels."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing common resources with their scope so students can focus on placement decisions.",
   "Extend: Ask students to write a gcloud filter that lists only production VMs by label and to explain how resource manager tags could be used in an IAM condition."
  ]
 },
 {
  "t": "Choosing a compute option: Compute Engine, GKE, Cloud Run, Cloud Run functions and App Engine",
  "objectives": [
   "Students will be able to describe what each Google Cloud compute service manages for the customer and what the customer still manages.",
   "Students will be able to compare Compute Engine, GKE, Cloud Run, Cloud Run functions and App Engine on control, scaling and operational effort.",
   "Students will be able to select the most appropriate compute service for a written workload scenario and justify the choice using scenario keywords.",
   "Students will be able to identify when a mix of compute services is the right design."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt on the projector. Ask students to vote by raising hands for which service they would pick, and write the tally on the whiteboard without revealing an answer."
   ],
   [
    12,
    "Teach",
    "Draw a horizontal line labeled 'more control' on the left and 'less to manage' on the right. Place Compute Engine, GKE Standard, GKE Autopilot, App Engine, Cloud Run and Cloud Run functions along it, saying what Google takes over at each step. Highlight the keyword clues for each."
   ],
   [
    15,
    "Activity",
    "Run the 'Workload placement' card sort in groups of three. Circulate and ask groups to name the single keyword that drove each placement."
   ],
   [
    8,
    "Discuss",
    "Have each group share one card they argued about. Use the discussion questions to draw out trade-offs between control and effort."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in as they leave."
   ]
  ],
  "warmup": "A team has one stateless web container that gets traffic only during business hours. Would you run it on a VM, a Kubernetes cluster or a serverless platform? Write one reason.",
  "activity": {
   "title": "Workload placement",
   "materials": "Whiteboard with five labeled columns (Compute Engine, GKE, Cloud Run, Cloud Run functions, App Engine), printed workload cards the teacher prepares (about 12), sticky notes, markers.",
   "steps": [
    "Give each group a stack of workload cards, such as 'legacy app needs a licensed kernel agent', 'thirty microservices deployed with Helm', 'resize an image when it lands in a bucket' and 'existing web app needs to send 10% of traffic to a new version'.",
    "Groups place each card under a column and write on a sticky note the keyword that drove the decision.",
    "Groups walk to the whiteboard and post their cards. Where groups disagree, the teacher asks both to defend their choice for one minute.",
    "Finish with one 'mixed system' card describing four workloads in one company, and have each group sketch which service runs each part."
   ]
  },
  "discussion": [
   "When would the extra control of Compute Engine be worth the extra operational work?",
   "Why might Google steer new projects toward Cloud Run instead of App Engine, and when would you still choose App Engine?"
  ],
  "exit": [
   [
    "Which compute service fits a workload that requires a custom kernel module?",
    "Compute Engine, because only VMs you manage give full OS and kernel control."
   ],
   [
    "A stateless container should scale to zero and needs no cluster. Which service?",
    "Cloud Run."
   ],
   [
    "What triggers can start a Cloud Run function?",
    "HTTP requests or events, such as a Cloud Storage object upload or a Pub/Sub message."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page keyword chart (kernel or license, Kubernetes or Helm, scale to zero, run on upload, traffic splitting) to use during the card sort.",
   "Extend: Ask fast finishers to write two scenario cards of their own where the obvious answer is wrong, and explain the keyword that changes it."
  ]
 },
 {
  "t": "Compute Engine instances: machine families, custom machine types, images and Spot VMs",
  "objectives": [
   "Students will be able to match Compute Engine machine family categories to workload types.",
   "Students will be able to explain when a custom machine type is more cost-effective than a predefined type.",
   "Students will be able to explain why image families are used in VM creation commands.",
   "Students will be able to decide whether a workload is suitable for Spot VMs and justify the decision."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Ask three students to share their answer and note the reasons on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Walk through the four choices when creating a VM. Write the family categories on the board with one example workload each, decode n2-standard-8 and n2-highmem-8, explain custom types and image families, then explain Spot VM preemption and the 30-second notice."
   ],
   [
    15,
    "Activity",
    "Run 'Right-size the fleet' in pairs. Circulate and challenge each pair to say what would happen to their design if Google preempted half the Spot VMs."
   ],
   [
    7,
    "Discuss",
    "Pairs share one recommendation each. Use the discussion questions to compare Spot VMs with committed use discounts."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on a sticky note and post them on the door."
   ]
  ],
  "warmup": "Your company could save a lot of money if it accepted that some servers might be shut off with 30 seconds of warning. Which of your company's workloads could live with that, and which could not?",
  "activity": {
   "title": "Right-size the fleet",
   "materials": "Printed fleet sheet the teacher prepares (eight fictional VMs with workload description, current machine type and average CPU and memory use), projector, student laptops with a browser for optional reference, pens.",
   "steps": [
    "Hand each pair the fleet sheet listing VMs such as an overnight render worker, a reporting database, a CI runner and a web server using 10% CPU.",
    "For each VM, pairs choose a machine family category, decide whether a custom machine type would help, and mark whether Spot VMs are acceptable.",
    "Pairs rewrite the create command for one VM, using an image family and, where appropriate, a custom CPU and memory size.",
    "Pairs swap sheets with another pair, who must find one recommendation they disagree with and explain why."
   ]
  },
  "discussion": [
   "What makes a workload fault tolerant enough for Spot VMs, and how can you make a workload more tolerant?",
   "Why might a security team insist that all VMs be created from a custom image family rather than public images?"
  ],
  "exit": [
   [
    "A batch job retries failed tasks automatically and needs the lowest cost. Which VM option fits?",
    "Spot VMs, ideally in a managed instance group, because the job tolerates preemption."
   ],
   [
    "What does an image family resolve to?",
    "The latest non-deprecated image in that series."
   ],
   [
    "When is a custom machine type the right choice?",
    "When no predefined type matches the needed vCPU and memory combination and you want to pay only for what you use, within the family's supported ratios."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each family category with one example workload and a decoded machine type name, and let struggling pairs complete only four VMs on the fleet sheet.",
   "Extend: Ask fast finishers to design how a render job should handle the 30-second preemption notice so no finished work is lost, and where the results should be stored."
  ]
 },
 {
  "t": "Compute Engine disks: Persistent Disk and Hyperdisk types, regional disks and local SSD",
  "objectives": [
   "Students will be able to compare Persistent Disk types, Hyperdisk and local SSD on performance, durability and cost.",
   "Students will be able to explain how a regional persistent disk supports recovery from a zone failure.",
   "Students will be able to predict what happens to data on each storage type when a VM is stopped, deleted or loses its zone.",
   "Students will be able to choose a disk type for a described workload and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud. Students write their answer individually, then two share."
   ],
   [
    13,
    "Teach",
    "Draw a VM box with three disk options: network disk, regional disk spanning two zone boxes, and local SSD inside the host. Explain each type, performance scaling with size, resize rules, Hyperdisk's separate performance setting and snapshots versus regional replication."
   ],
   [
    15,
    "Activity",
    "Run 'What survives?' in small groups. Circulate and ask groups to explain the mechanism behind each answer, not just the outcome."
   ],
   [
    7,
    "Discuss",
    "Groups compare their grids. Use the discussion questions to connect durability to cost."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "A database VM's zone goes down. Its data disk was a normal zonal disk with a snapshot taken at midnight. It is now 3 p.m. What data could you lose, and what could have prevented it?",
  "activity": {
   "title": "What survives?",
   "materials": "Printed grid the teacher prepares (rows: pd-standard, pd-balanced, pd-ssd, Hyperdisk Balanced, regional persistent disk, local SSD; columns: VM rebooted, VM stopped, VM deleted with disk kept, zone outage), printed workload cards, markers, whiteboard.",
   "steps": [
    "Groups fill in the grid with 'data kept', 'data lost' or 'depends', writing a short reason in each cell.",
    "The teacher reveals answers for two rows and lets groups correct the rest.",
    "Groups draw four workload cards, such as 'cache for a web app', 'self-managed database that must survive a zone outage', 'log archive on a budget' and 'database needing high IOPS without a huge disk', and pick a storage type for each.",
    "Each group presents one workload choice and one rejected alternative with the reason it was rejected."
   ]
  },
  "discussion": [
   "Why would a team pay more for a regional disk instead of relying on snapshots?",
   "What kinds of data are safe to keep on storage that can disappear, and how would you rebuild it?"
  ],
  "exit": [
   [
    "Which storage is fastest but loses data when the VM stops?",
    "Local SSD."
   ],
   [
    "How do you recover a VM's data quickly after a zone outage if it used a regional persistent disk?",
    "Force-attach the regional disk to a VM in the other zone of the region."
   ],
   [
    "Name two ways to improve Persistent Disk performance without changing the application.",
    "Increase disk size or the VM's vCPU count, or switch to a higher-performance type such as pd-ssd or Hyperdisk."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a partially completed grid with the regional disk and local SSD rows filled in as models.",
   "Extend: Ask fast finishers to design storage for a self-managed database that needs zone resilience, point-in-time recovery and a fast temporary sort area, naming each storage component."
  ]
 },
 {
  "t": "Instance templates and managed instance groups: autoscaling, autohealing and rolling updates",
  "objectives": [
   "Students will be able to explain why instance templates are immutable and how that shapes the update process.",
   "Students will be able to compare zonal MIGs, regional MIGs and unmanaged instance groups.",
   "Students will be able to configure autoscaling and autohealing settings appropriate to a described application.",
   "Students will be able to plan a rolling or canary update using maxSurge and maxUnavailable."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and ask students to discuss with a neighbor for two minutes before sharing."
   ],
   [
    12,
    "Teach",
    "Draw a template card feeding a MIG box with VMs across three zones. Explain autoscaling signals and limits, autohealing with health checks and initial delay, and the difference from load balancer health checks. Show the rolling update settings with a simple timeline."
   ],
   [
    18,
    "Activity",
    "Run the 'Rolling update simulation' with sticky notes. Circulate and ask groups to state their capacity at each step."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect statelessness and regional design to the simulation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your four web servers were each set up by hand. One crashes at 2 a.m. and traffic triples at 9 a.m. What would you want the platform to do automatically in each case?",
  "activity": {
   "title": "Rolling update simulation",
   "materials": "Whiteboard divided into three zone columns, sticky notes in two colors (old template and new template), markers, printed update scenario cards the teacher prepares.",
   "steps": [
    "Each group starts with six sticky notes in the old color, two per zone column, representing a regional MIG.",
    "The teacher reads a scenario card, such as 'maxSurge 2, maxUnavailable 0', and groups move through the update step by step, adding new-color notes and removing old ones while recording total and serving capacity at each step.",
    "Repeat with 'maxSurge 0, maxUnavailable 2' and compare how capacity dips.",
    "Final card: a canary at 1 of 6 VMs fails its health check. Groups show the rollback and explain which template the group returns to."
   ]
  },
  "discussion": [
   "Why must VMs in a MIG be stateless, and where should session data and files go instead?",
   "When would you choose a schedule-based autoscaling signal over CPU utilization?"
  ],
  "exit": [
   [
    "How do you change the machine type of VMs in a MIG?",
    "Create a new instance template with the new machine type and start a rolling update to it."
   ],
   [
    "What does autohealing do that a load balancer health check does not?",
    "It recreates failing VMs from the template rather than only stopping traffic to them."
   ],
   [
    "Which MIG type protects a web tier from a single zone outage?",
    "A regional MIG."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a worked example of the first two steps of the rolling update with capacity numbers already filled in.",
   "Extend: Ask fast finishers to choose autoscaling signals, limits and an initialization period for a queue-processing worker group and justify each value."
  ]
 },
 {
  "t": "Google Kubernetes Engine clusters: Autopilot vs Standard, zonal vs regional, and node pools",
  "objectives": [
   "Students will be able to explain which components Google manages in GKE Autopilot and Standard modes.",
   "Students will be able to compare zonal, multi-zonal and regional clusters for control plane and workload availability.",
   "Students will be able to calculate total node counts for regional Standard clusters.",
   "Students will be able to design node pools with taints and tolerations for specialized workloads."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the whiteboard under 'Google manages' and 'I manage'."
   ],
   [
    13,
    "Teach",
    "Draw a control plane box and node boxes. Shade what Google manages in Autopilot versus Standard. Then draw one zone versus three zones and show where the control plane lives in zonal, multi-zonal and regional clusters. Work through a --num-nodes example and introduce node pools and taints."
   ],
   [
    15,
    "Activity",
    "Run 'Cluster design desk' in pairs. Circulate and ask pairs to state the total node count and the zone-failure behavior of each design."
   ],
   [
    7,
    "Discuss",
    "Pairs share one design. Use the discussion questions to explore cost and control trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "In a Kubernetes cluster, list everything that has to be patched, scaled or monitored. Which of those would you like someone else to handle?",
  "activity": {
   "title": "Cluster design desk",
   "materials": "Printed request cards the teacher prepares (five fictional team requests), whiteboard, markers, blank paper for diagrams.",
   "steps": [
    "Each pair draws two request cards, such as 'small team, no node management, must survive zone outage' and 'ML team needs GPUs and a custom node setting alongside general services'.",
    "Pairs choose mode (Autopilot or Standard) and location type (zonal or regional) for each request and sketch the cluster, including any node pools.",
    "For any Standard regional design, pairs write the gcloud flags they would use and calculate the total node count.",
    "Pairs add taints and tolerations to any specialized pool and explain which pods can land there."
   ]
  },
  "discussion": [
   "Why might Google recommend Autopilot for most workloads, and what would make you choose Standard anyway?",
   "Is a zonal cluster ever the right choice? What would you trade for its lower cost?"
  ],
  "exit": [
   [
    "Who manages the control plane in a GKE Standard cluster?",
    "Google, in both Standard and Autopilot modes."
   ],
   [
    "A regional Standard cluster uses three zones and --num-nodes=3. How many nodes are created?",
    "Nine."
   ],
   [
    "How do you keep general pods off an expensive GPU node pool?",
    "Taint the GPU nodes and add a matching toleration only to the pods that should run there."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-by-two grid (mode by location type) with one example per cell for struggling pairs to reference during the design task.",
   "Extend: Ask fast finishers to compare the monthly billing basis of an Autopilot cluster with a Standard cluster running mostly idle nodes, explaining in words which costs disappear."
  ]
 },
 {
  "t": "Deploying workloads to GKE with kubectl: Deployments, Services and Ingress",
  "objectives": [
   "Students will be able to explain the role of get-credentials and kubeconfig in connecting kubectl to a GKE cluster.",
   "Students will be able to compare ClusterIP, NodePort and LoadBalancer Services and Ingress for exposing applications.",
   "Students will be able to choose the right workload object (Deployment, StatefulSet, DaemonSet, Job or CronJob) for a scenario.",
   "Students will be able to interpret kubectl get, describe and logs output to diagnose a failing pod."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question. Students jot an answer, then the teacher writes 'pod IPs change' on the board as the key idea."
   ],
   [
    13,
    "Teach",
    "Walk through the deployment path on the board: get-credentials, Deployment, Service, Ingress. Show the kubectl expose command and label port versus target-port. List StatefulSet, DaemonSet, Job, CronJob, ConfigMap and Secret with one use each."
   ],
   [
    15,
    "Activity",
    "Run 'Pod triage' in pairs with printed kubectl output. Circulate and ask each pair what command they would run next."
   ],
   [
    7,
    "Discuss",
    "Pairs share diagnoses. Use the discussion questions to compare Ingress and LoadBalancer Services."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If every time a server restarted it got a brand-new IP address, how would other programs keep finding it?",
  "activity": {
   "title": "Pod triage",
   "materials": "Printed kubectl output excerpts the teacher prepares (get pods, describe pod events, get services, logs), a projector, sticky notes, pens.",
   "steps": [
    "Give each pair four fictional output cards: a pod in ImagePullBackOff with a permission error event, a pod Pending with an insufficient CPU event, a CrashLoopBackOff with a log line about a missing environment variable, and a Service list showing only ClusterIP for an app that must be public.",
    "Pairs write on a sticky note the cause and the fix for each card, including the kubectl or gcloud command they would run.",
    "Pairs then design exposure for a two-service app with path routing and write which objects they would create.",
    "The teacher projects each card and pairs volunteer their diagnosis."
   ]
  },
  "discussion": [
   "When is a LoadBalancer Service enough, and when do you need an Ingress?",
   "Why keep Deployment definitions in YAML files under version control instead of using kubectl create commands?"
  ],
  "exit": [
   [
    "Which command must you run before kubectl can reach a new GKE cluster?",
    "gcloud container clusters get-credentials with the cluster name and location."
   ],
   [
    "Which Service type is reachable only inside the cluster?",
    "ClusterIP."
   ],
   [
    "What object do you use for one external IP that routes /api and / to different Services?",
    "An Ingress, which on GKE creates an Application Load Balancer."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a status glossary card (Running, Pending, CrashLoopBackOff, ImagePullBackOff) with the usual causes before they start the triage.",
   "Extend: Ask fast finishers to write a short YAML outline (field names only) for a Deployment and matching Service, making sure the Service selector matches the pod labels."
  ]
 },
 {
  "t": "Cloud Run services and Cloud Run functions: deploying containers and event-driven code with Eventarc and Pub/Sub",
  "objectives": [
   "Students will be able to describe how Cloud Run services, jobs and functions differ and when each is used.",
   "Students will be able to explain how revisions, scaling to zero and concurrency work in Cloud Run.",
   "Students will be able to design an event-driven flow using Eventarc and Pub/Sub topics and subscriptions.",
   "Students will be able to secure Cloud Run services using the Invoker role, ingress settings and dedicated service accounts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect answers and group them under 'push it' and 'pull it'."
   ],
   [
    12,
    "Teach",
    "Show the deploy commands and explain revisions, traffic splitting, scaling and concurrency. Contrast services, jobs and functions. Draw an event flow: bucket to Eventarc to function to Pub/Sub topic to subscription to service. Mark every arrow with the identity and role it needs."
   ],
   [
    18,
    "Activity",
    "Run 'Wire the pipeline' in groups of three. Circulate and ask each group who is allowed to call each component."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare direct event delivery with Pub/Sub decoupling."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "When a customer uploads a photo, should the website wait while the thumbnail is made, or hand the work to something else? What could go wrong with each approach?",
  "activity": {
   "title": "Wire the pipeline",
   "materials": "Printed component cards the teacher prepares (Cloud Storage bucket, Eventarc trigger, Cloud Run function, Pub/Sub topic, push subscription, Cloud Run service, Cloud Scheduler, Cloud Run job, service account cards), string or whiteboard markers, sticky notes.",
   "steps": [
    "Give each group a scenario: uploads become thumbnails, a search index updates when thumbnails are ready, and a nightly report job runs at 2 a.m.",
    "Groups lay out cards and connect them with arrows on the whiteboard or with string, labeling each arrow with the event or message type.",
    "Groups place a service account card on each caller and write the role it needs on a sticky note, marking which services are public and which are private.",
    "The teacher removes one component, such as the indexer being down for an hour, and groups explain what happens to the messages."
   ]
  },
  "discussion": [
   "What does Pub/Sub add compared with having one service call another directly?",
   "Why is giving each Cloud Run service its own service account better than sharing one?"
  ],
  "exit": [
   [
    "How do you let only one specific service call a private Cloud Run service?",
    "Require authentication and grant roles/run.invoker on the target to that caller's service account."
   ],
   [
    "Which Google Cloud service routes a Cloud Storage object finalized event to a Cloud Run function?",
    "Eventarc."
   ],
   [
    "What is the difference between a pull and a push Pub/Sub subscription?",
    "With pull, the subscriber requests messages; with push, Pub/Sub sends each message to an HTTPS endpoint such as a Cloud Run URL."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a partially wired pipeline with the first two arrows and roles already labeled.",
   "Extend: Ask fast finishers to add a traffic split for a new revision of the indexer service and an ingress setting for the indexer, explaining how each reduces risk."
  ]
 },
 {
  "t": "Choosing a data product: Cloud SQL, AlloyDB, Spanner, Firestore, Bigtable and BigQuery",
  "objectives": [
   "Students will be able to classify a workload as relational or non-relational and as transactional or analytical.",
   "Students will be able to compare Cloud SQL, AlloyDB, Spanner, Firestore, Bigtable and BigQuery by data model, scale and use case.",
   "Students will be able to select the appropriate data product for each part of a multi-part scenario and justify it.",
   "Students will be able to identify distractor answers that misuse an analytics or NoSQL product for transactional relational needs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up list and have students sort the items into 'quick updates' and 'big questions' on scrap paper."
   ],
   [
    12,
    "Teach",
    "Draw a two-axis chart on the whiteboard: relational versus non-relational, and transactional versus analytical. Place each product on it and add scale and global notes. Give one keyword clue per product."
   ],
   [
    18,
    "Activity",
    "Run the 'Data product matchmaker' card game in groups of four. Circulate and ask groups to name the deciding requirement for each match."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore when combining products is the right design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Sort these into 'quick updates for an app' and 'big questions over history': adding an item to a cart, total sales by region last year, updating a player's score, average delivery time by month.",
  "activity": {
   "title": "Data product matchmaker",
   "materials": "Two decks of printed cards the teacher prepares: product cards (Cloud SQL, AlloyDB, Spanner, Firestore, Bigtable, BigQuery, Memorystore, Cloud Storage) and requirement cards (about 14 short scenarios), whiteboard, markers.",
   "steps": [
    "Deal product cards face up in the middle and give each group a stack of requirement cards, such as 'global inventory, never oversell', 'IoT readings, millions of writes per minute' and 'existing MySQL app, regional'.",
    "Groups match each requirement to a product and write the deciding keyword on the card.",
    "Groups then receive one multi-part company scenario and build a small architecture on the whiteboard using at least three products.",
    "Each group presents its architecture while another group plays skeptic and proposes a cheaper or simpler product for one part."
   ]
  },
  "discussion": [
   "Why might a company use four different data products instead of one, and what does that cost them operationally?",
   "When does Spanner's extra cost become worth it compared with Cloud SQL?"
  ],
  "exit": [
   [
    "A mobile app needs real-time sync of user documents and offline support. Which product?",
    "Firestore."
   ],
   [
    "Which product is designed for SQL analytics over petabytes of data?",
    "BigQuery."
   ],
   [
    "Which product fits time-series telemetry with very high write throughput and key-based lookups?",
    "Bigtable."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups the two-axis chart printed with product names already placed, so they can match requirements by locating them on the chart.",
   "Extend: Ask fast finishers to explain how data would flow from Bigtable and Cloud SQL into BigQuery for reporting, and why reporting should not run on the transactional databases."
  ]
 },
 {
  "t": "Cloud Storage buckets: storage classes, locations, lifecycle rules and Object Versioning",
  "objectives": [
   "Students will be able to compare the Standard, Nearline, Coldline and Archive storage classes by access pattern and minimum storage duration.",
   "Students will be able to choose a bucket location type (region, dual-region or multi-region) for a scenario.",
   "Students will be able to design lifecycle rules and Object Versioning settings to control cost and recover from mistakes.",
   "Students will be able to distinguish lifecycle deletion from retention policies and Bucket Lock."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick answers from around the room."
   ],
   [
    12,
    "Teach",
    "Draw four storage class boxes with access frequency and minimum days. Explain location types, then lifecycle rules as automatic actions with conditions, versioning with noncurrent versions, and retention policies as the opposite of deletion."
   ],
   [
    18,
    "Activity",
    "Run 'Bucket policy workshop' in pairs. Circulate and ask pairs to calculate whether any rule would trigger early-deletion charges."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore the risks of locking a retention policy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You have old family photos you look at once a year and a grocery list you check daily. Where would you keep each, and why does it matter how often you look?",
  "activity": {
   "title": "Bucket policy workshop",
   "materials": "Printed data profile cards the teacher prepares (five fictional datasets with access patterns and retention needs), a whiteboard, markers, student laptops with a browser to view the Cloud Storage documentation if desired.",
   "steps": [
    "Each pair receives two data profile cards, such as 'website images used daily worldwide' and 'audit logs read rarely, kept seven years'.",
    "Pairs choose a location type and starting class, then write lifecycle rules as plain sentences with an action and conditions.",
    "Pairs decide whether to enable versioning, soft delete or a retention policy, and whether to lock it, writing one reason for each.",
    "Pairs swap with another pair to check for early-deletion charges or missing protection, then fix any problems found."
   ]
  },
  "discussion": [
   "Why is locking a retention policy a decision to make carefully, and who in an organization should approve it?",
   "When would Autoclass be a better choice than writing lifecycle rules yourself?"
  ],
  "exit": [
   [
    "What are the minimum storage durations for Nearline, Coldline and Archive?",
    "30, 90 and 365 days."
   ],
   [
    "Can you change a bucket's location after creation?",
    "No. You must create a new bucket and copy the data."
   ],
   [
    "Which setting lets you restore an object that was accidentally overwritten?",
    "Object Versioning, which keeps the previous content as a noncurrent version."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a class reference card with access frequency and minimum durations, and a lifecycle rule template with blanks for action and condition.",
   "Extend: Ask fast finishers to write the lifecycle rules for one profile as a JSON outline with action and condition fields, including a rule that limits noncurrent versions."
  ]
 },
 {
  "t": "VPC networks: auto vs custom mode, subnets, firewall rules, Shared VPC and VPC Network Peering",
  "objectives": [
   "Students will be able to explain that VPC networks are global while subnets are regional.",
   "Students will be able to compare auto mode and custom mode VPCs and justify custom mode for production.",
   "Students will be able to evaluate a set of firewall rules using direction, priority, targets and implied rules to predict whether traffic is allowed.",
   "Students will be able to choose between Shared VPC and VPC Network Peering for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch two student answers on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw a global VPC spanning two regions with one subnet each. Contrast auto and custom modes. Write a firewall rule's parts on the board and explain priority and implied rules. Draw Shared VPC (host and service projects) and peering, showing the non-transitive triangle."
   ],
   [
    18,
    "Activity",
    "Run 'Firewall judge' with printed rule tables in pairs. Circulate and ask pairs which single rule decided each packet."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare central control with independent administration."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Two offices both numbered their rooms 1 to 100. Now they want to merge into one building. What problem do they have, and how could they have avoided it?",
  "activity": {
   "title": "Firewall judge",
   "materials": "Printed rule tables the teacher prepares (six to eight firewall rules with direction, action, priority, ports, source and target tags, plus the implied rules), printed packet cards describing traffic, a projector, markers.",
   "steps": [
    "Give each pair a rule table and eight packet cards, such as 'tcp:22 from 203.0.113.5 to a VM tagged web' and 'tcp:443 from 0.0.0.0/0 to a VM tagged db'.",
    "Pairs decide allow or deny for each packet and write the deciding rule's priority on the card.",
    "Pairs then fix the rule table so that SSH is allowed only from an approved range and the database VM accepts traffic only from web VMs.",
    "Finish with a network design card: twelve projects, one network team and one partner. Pairs sketch Shared VPC and peering on the whiteboard."
   ]
  },
  "discussion": [
   "What are the advantages and risks of letting one central team control the network for every project?",
   "Why does the non-transitive nature of peering matter when a company has many networks?"
  ],
  "exit": [
   [
    "Two rules match a packet: allow with priority 1000 and deny with priority 500. What happens?",
    "The deny rule wins because lower priority numbers take precedence."
   ],
   [
    "Why is custom mode recommended for production VPCs?",
    "You choose subnet ranges, avoiding overlaps with on-premises or other networks, and create subnets only where needed."
   ],
   [
    "Which feature lets service projects use subnets from a host project's network?",
    "Shared VPC."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a flowchart for evaluating a packet: check direction, find matching rules, pick the lowest priority number, fall back to implied rules.",
   "Extend: Ask fast finishers to plan non-overlapping subnet ranges for three regions and a data center, and explain where GKE secondary ranges would fit."
  ]
 },
 {
  "t": "Load balancing, Cloud NAT and hybrid connectivity with Cloud VPN and Cloud Interconnect",
  "objectives": [
   "Students will be able to select a Cloud Load Balancing product using the layer, external or internal, and global or regional questions.",
   "Students will be able to explain how Cloud NAT and Private Google Access give private resources outbound access.",
   "Students will be able to compare HA VPN, Dedicated Interconnect and Partner Interconnect on setup time, bandwidth, privacy and encryption.",
   "Students will be able to design a hybrid connectivity plan that combines a quick connection with a long-term one."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect two or three answers on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Draw a decision tree on the board with the three load balancer questions. Then draw a private VM with arrows to Cloud Storage (Private Google Access) and the internet (Cloud NAT). Finish with a data center connected by a VPN tunnel and an Interconnect line, labeling encryption and bandwidth on each."
   ],
   [
    15,
    "Activity",
    "Run 'Connectivity consultants' in groups of three. Circulate and ask each group to defend one choice against an alternative."
   ],
   [
    7,
    "Discuss",
    "Groups present one design. Use the discussion questions to explore trade-offs and backups."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A server has no public address, but it still needs to download software updates. How could it reach the internet without anyone on the internet being able to reach it?",
  "activity": {
   "title": "Connectivity consultants",
   "materials": "Printed client brief cards the teacher prepares (four fictional companies with traffic types, user locations and connectivity needs), whiteboard, markers, sticky notes.",
   "steps": [
    "Each group receives one client brief, such as 'global web store needing CDN and URL routing, private back ends, warehouses on-premises'.",
    "Groups walk the load balancer decision tree and write the chosen load balancer and the reason on a sticky note.",
    "Groups decide how private VMs reach the internet and Google APIs, and choose a hybrid connection plan with a timeline.",
    "Groups draw the final architecture on the whiteboard, and another group asks one 'what if' question, such as 'what if the VPN tunnel fails?' or 'what if the data must be encrypted on the Interconnect?'"
   ]
  },
  "discussion": [
   "Why might a company keep an HA VPN running even after its Interconnect is live?",
   "What are the trade-offs between a global and a regional load balancer for a business with customers in one country?"
  ],
  "exit": [
   [
    "Which load balancer gives one anycast IP worldwide with URL-based routing?",
    "The global external Application Load Balancer."
   ],
   [
    "Private VMs need to reach Cloud Storage only. What is the simplest setting?",
    "Enable Private Google Access on their subnet."
   ],
   [
    "Is Interconnect traffic encrypted by default?",
    "No. It is private but not encrypted unless you add encryption."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a printed decision tree with the three load balancer questions and a two-column table comparing VPN and Interconnect.",
   "Extend: Ask fast finishers to explain why load balancer health checks might fail after a new firewall policy is applied, and what rule would fix it."
  ]
 },
 {
  "t": "Infrastructure as code with Terraform and Cloud Marketplace solutions",
  "objectives": [
   "Students will be able to explain the purpose of each step in the Terraform workflow: init, plan, apply and destroy.",
   "Students will be able to justify storing shared Terraform state in a versioned Cloud Storage bucket using the gcs backend.",
   "Students will be able to compare Terraform, Infrastructure Manager, Config Connector and the deprecated Deployment Manager.",
   "Students will be able to choose between Terraform and Cloud Marketplace for a given deployment scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Ask students to share one time a manual setup went wrong. Write key words such as 'forgot a step' and 'nobody knew' on the board."
   ],
   [
    12,
    "Teach",
    "Project a short HCL snippet with a VPC and a VM. Walk through init, plan, apply and destroy, reading a sample plan output aloud and pointing out the plus, tilde and minus markers. Explain state and why it must be shared and locked. Close with Infrastructure Manager, Config Connector, the deprecation of Deployment Manager, and when Marketplace fits instead."
   ],
   [
    16,
    "Activity",
    "Run the 'Read the plan' activity in pairs. Circulate and ask pairs to explain why each resource is being created, changed or destroyed."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions. Steer toward the idea that IaC adds review and history, and that Marketplace trades control for speed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note before leaving."
   ]
  ],
  "warmup": "Your team built a production network by hand last year. Today you must build an identical one. What could go wrong, and what would you want to have written down?",
  "activity": {
   "title": "Read the plan",
   "materials": "Projector, printed handouts with a short Terraform configuration and a matching terraform plan output (teacher-made), highlighters, whiteboard.",
   "steps": [
    "Give each pair a handout showing a configuration with a VPC, a subnet, a firewall rule and a VM, plus plan output with one resource to add, one to change in place and one to destroy.",
    "Pairs highlight each resource line and write next to it whether it is being created, changed or destroyed, and what change in the configuration likely caused it.",
    "Reveal a scenario card: the destroyed resource is a production firewall rule someone added in the console. Pairs decide what to do: import it into configuration, or let Terraform remove it, and justify the choice.",
    "Each pair writes a two-sentence recommendation for where the team should store state and who should be allowed to run apply, then shares it with another pair.",
    "Finish with three quick scenario cards read aloud; pairs hold up 'T' for Terraform or 'M' for Marketplace."
   ]
  },
  "discussion": [
   "What are the risks if a team keeps making console changes after adopting Terraform?",
   "When would you accept the lower control of a Marketplace solution in exchange for speed?",
   "Why might an organization prefer Infrastructure Manager over running Terraform from engineers' laptops?"
  ],
  "exit": [
   [
    "Which Terraform command previews changes without making them?",
    "terraform plan."
   ],
   [
    "Where should a team keep shared state, and why?",
    "In a Cloud Storage bucket with the gcs backend and Object Versioning, so state is shared, locked during runs and recoverable."
   ],
   [
    "A team needs a common third-party product running today with minimal effort. What should they use?",
    "Cloud Marketplace."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing the four commands with one-line descriptions and the meaning of the plus, tilde and minus markers, and let students complete only the first two activity steps.",
   "Extend: Ask fast finishers to sketch a module structure for dev and prod environments that share one VPC module with different variables, and explain how the plan would differ between them."
  ]
 },
 {
  "t": "Managing Compute Engine VMs: start, stop, resize, SSH with OS Login and IAP TCP forwarding",
  "objectives": [
   "Students will be able to describe the effect of stop, start, suspend, resume and reset on a VM and on billing.",
   "Students will be able to list the steps to change a VM's machine type and to enlarge its disk.",
   "Students will be able to compare metadata-based SSH keys with OS Login and choose the correct OS Login role.",
   "Students will be able to configure the IAM role and firewall rule needed for IAP TCP forwarding."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and collect student ideas about how a departed contractor might still reach a VM."
   ],
   [
    12,
    "Teach",
    "Project the gcloud commands for list, stop, start, suspend, reset and set-machine-type, explaining billing for each. Draw a diagram of a user, IAP, the firewall and a VM with no external IP. Contrast metadata keys and OS Login and name the two OS Login roles."
   ],
   [
    18,
    "Activity",
    "Run the 'Fix the access ticket' pair troubleshooting activity. Circulate and ask each pair whether the problem is reachability (IAP and firewall) or login (OS Login)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the tickets to a secure default design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "A contractor left yesterday. His SSH public key is still in project metadata, and two VMs still have external IPs. List every way he might still get in.",
  "activity": {
   "title": "Fix the access ticket",
   "materials": "Printed help-desk ticket cards (teacher-made), each with a short description, an IAM excerpt and a firewall rule list; whiteboard; markers.",
   "steps": [
    "Give each pair four ticket cards, for example 'IAP SSH times out', 'user can log in but sudo fails', 'resize command fails', and 'ex-employee still logs in'.",
    "For each ticket, pairs identify the root cause from the excerpts and write the fix as a gcloud command or an IAM or firewall change.",
    "Pairs label each ticket as a reachability problem, a login problem or a lifecycle problem.",
    "Two pairs swap cards and check each other's fixes, noting any disagreement.",
    "The teacher reviews one ticket of each type with the class on the whiteboard."
   ]
  },
  "discussion": [
   "Why is removing external IPs and using IAP considered safer than a bastion host with a public address?",
   "What problems might an organization face when switching from metadata SSH keys to OS Login?"
  ],
  "exit": [
   [
    "What source range must a firewall rule allow for IAP TCP forwarding?",
    "35.235.240.0/20."
   ],
   [
    "A user needs SSH with sudo through OS Login. Which role?",
    "Compute OS Admin Login."
   ],
   [
    "List the steps to change a VM's machine type.",
    "Stop the VM, run set-machine-type, start the VM."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page cheat sheet with each command, its billing effect and the three IAM roles, and pair them with a partner who has already solved one ticket.",
   "Extend: Ask fast finishers to design a project setup that enforces OS Login and blocks external IPs across all projects using organization policies, and explain how they would roll it out without locking anyone out."
  ]
 },
 {
  "t": "Snapshots, snapshot schedules, custom images and image families",
  "objectives": [
   "Students will be able to distinguish snapshots, custom images, image families and machine images by purpose and scope.",
   "Students will be able to explain how incremental snapshots work and how a snapshot schedule automates backups and retention.",
   "Students will be able to describe how an image family supports rollout and rollback of golden images.",
   "Students will be able to choose the right capture method for a backup, template, clone or relocation scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let students suggest answers; list the words they use for 'copy' on the board."
   ],
   [
    12,
    "Teach",
    "Draw a disk with three snapshots showing changed blocks only. Show the snapshot schedule commands. Then draw an image family with three images, deprecate the newest, and show which one new VMs use. End with a machine image of a multi-disk VM."
   ],
   [
    16,
    "Activity",
    "Run the 'Pick the copy' card sort in groups of three."
   ],
   [
    7,
    "Discuss",
    "Review contested cards as a class and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Your phone backs up photos every night, but you also keep a 'template' contact card you copy for new friends. How are these two kinds of copy different in purpose?",
  "activity": {
   "title": "Pick the copy",
   "materials": "Printed scenario cards (teacher-made), five header cards (Snapshot, Snapshot schedule, Custom image, Image family, Machine image), tape or a whiteboard.",
   "steps": [
    "Give each group about twelve scenario cards, such as 'nightly backup with 30-day retention', 'clone a three-disk VM', 'move a disk to europe-west1' and 'new VMs always use latest hardened build'.",
    "Groups place each card under the best header and write a one-line reason on the back.",
    "Hand out two trap cards, such as 'roll back a bad golden image' and 'backup before a risky upgrade within the same zone', and ask groups to place them.",
    "Groups compare their sort with another group and resolve differences.",
    "The teacher reveals the answer key and highlights the incremental snapshot and image family behaviors."
   ]
  },
  "discussion": [
   "Why might a company use both snapshot schedules and machine images instead of just one?",
   "What could go wrong if instance templates reference a specific image name instead of an image family?"
  ],
  "exit": [
   [
    "What makes snapshot storage efficient?",
    "Snapshots are incremental, storing only changed blocks after the first."
   ],
   [
    "What do you use to give many new VMs the same hardened boot disk, always the latest build?",
    "A custom image in an image family referenced by the instance template."
   ],
   [
    "Which capture includes a VM's machine type, metadata and all disks?",
    "A machine image."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-question flowchart (protect data or create a template; one disk or whole VM) to use while sorting cards.",
   "Extend: Ask fast finishers to write the gcloud commands to create a daily snapshot schedule with 7-day retention and attach it to a disk, and explain why a schedule is regional."
  ]
 },
 {
  "t": "Managing GKE: scaling Deployments, node pool autoscaling, rollouts and rollbacks, and cluster upgrades",
  "objectives": [
   "Students will be able to distinguish pod-level scaling (kubectl scale, HPA, VPA) from node-level scaling (cluster autoscaler, resize, auto-provisioning).",
   "Students will be able to perform and reverse a Deployment rollout using kubectl rollout commands.",
   "Students will be able to explain how release channels, maintenance windows, exclusions and PodDisruptionBudgets shape cluster upgrades.",
   "Students will be able to diagnose a Pending pod from kubectl describe output and choose the right fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the restaurant warm-up question and sketch tables and diners on the board."
   ],
   [
    13,
    "Teach",
    "Map the restaurant to pods and nodes. Show kubectl scale, kubectl autoscale and the gcloud node pool autoscaling command. Walk through a rollout with maxSurge and maxUnavailable, then rollout history and undo. Finish with release channels, maintenance windows and exclusions, surge upgrades and PDBs."
   ],
   [
    17,
    "Activity",
    "Run the 'Which layer?' troubleshooting activity in pairs using printed kubectl output excerpts."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare Standard and Autopilot responsibilities."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "A restaurant has a long line at the door. Sometimes the fix is seating more groups at existing tables, and sometimes it is bringing in more tables. How do you tell which one you need?",
  "activity": {
   "title": "Which layer?",
   "materials": "Printed excerpts of kubectl get pods, kubectl describe events and kubectl rollout history output (teacher-made), whiteboard, markers.",
   "steps": [
    "Give each pair five excerpts, for example a FailedScheduling event, a CrashLoopBackOff after a new image, a CPU spike with a fixed replica count, a rollout history listing, and an upgrade notice.",
    "For each excerpt, pairs label the layer (pod, node, release or cluster version) and write the command or setting that fixes it.",
    "Pairs write the exact kubectl rollout undo command for the bad release excerpt, including a --to-revision option based on the history.",
    "Pairs swap answers with a neighbor and mark any fix that targets the wrong layer.",
    "The teacher reviews the trickiest excerpt on the whiteboard."
   ]
  },
  "discussion": [
   "Why does the cluster autoscaler look at pod requests rather than actual CPU usage, and what problem does that create if requests are missing?",
   "What responsibilities move from you to Google when you choose Autopilot instead of Standard?"
  ],
  "exit": [
   [
    "Which object changes the number of pod replicas based on CPU?",
    "The Horizontal Pod Autoscaler."
   ],
   [
    "Which command reverts a Deployment to its previous revision?",
    "kubectl rollout undo deployment/NAME."
   ],
   [
    "What controls how quickly a cluster receives new Kubernetes versions?",
    "Its release channel (Rapid, Regular or Stable)."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column table (pods versus nodes) listing each tool, and let students use it while labeling the excerpts.",
   "Extend: Ask fast finishers to write a PodDisruptionBudget in plain words for a service with five replicas and explain how it interacts with a surge upgrade that drains one node at a time."
  ]
 },
 {
  "t": "Managing Cloud Run: revisions, traffic splitting, minimum and maximum instances",
  "objectives": [
   "Students will be able to explain what a Cloud Run revision is and why revisions enable instant rollback.",
   "Students will be able to plan a canary release using --no-traffic, tags and update-traffic.",
   "Students will be able to choose minimum instances, maximum instances and concurrency settings to solve cold-start, cost and database-protection problems.",
   "Students will be able to read a service's traffic split and revision list to describe its current state."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about trying a new recipe. Connect answers to the idea of gradual release."
   ],
   [
    12,
    "Teach",
    "Draw a service box with three revision boxes and arrows labeled with percentages. Show deploy with --no-traffic and --tag, update-traffic, and --to-latest. Then explain minimum instances, maximum instances and concurrency with a quick calculation of database connections."
   ],
   [
    18,
    "Activity",
    "Run the 'Release day' role-play in groups of three: release manager, on-call engineer and database administrator."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to debrief the role-play."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A restaurant wants to try a new recipe without risking every customer's dinner. How would you roll it out, and how would you undo it if diners hated it?",
  "activity": {
   "title": "Release day",
   "materials": "Printed role cards and event cards (teacher-made), a whiteboard showing a service with revisions and a traffic split, markers.",
   "steps": [
    "Assign roles in each group. The release manager decides traffic changes, the on-call engineer reacts to metrics, and the database administrator enforces a connection limit.",
    "The teacher reads event cards one at a time, such as 'new revision deployed', 'canary error rate rising', 'first request each morning is slow' and 'spike opens too many connections'.",
    "After each event, the group writes the gcloud command or setting change they would make and updates their drawn traffic split.",
    "For the connection event, groups calculate a safe maximum instances value from given numbers.",
    "Groups compare final states with another group and explain any difference."
   ]
  },
  "discussion": [
   "When is it worth paying for minimum instances, and when is scale to zero the better choice?",
   "How does traffic splitting change the risk of releasing on a Friday afternoon?"
  ],
  "exit": [
   [
    "How do you send 10 percent of traffic to a new revision?",
    "gcloud run services update-traffic with --to-revisions, setting the new revision to 10 and the old one to 90."
   ],
   [
    "Which setting reduces cold starts, and what does it cost?",
    "Minimum instances; you pay for idle instances."
   ],
   [
    "Which setting protects a database from too many connections?",
    "Maximum instances (considered together with concurrency and connections per instance)."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card with the three commands (deploy --no-traffic --tag, update-traffic --to-revisions, update-traffic --to-latest) and a table matching each scaling setting to the problem it solves.",
   "Extend: Ask fast finishers to compare request-based and instance-based billing for a service that sends emails after returning a response, and justify their choice."
  ]
 },
 {
  "t": "Managing Cloud Storage objects with gcloud storage and moving data with Storage Transfer Service",
  "objectives": [
   "Students will be able to use gcloud storage commands to list, copy, move, delete and synchronize objects.",
   "Students will be able to explain why Cloud Storage folders are name prefixes and why objects are immutable.",
   "Students will be able to choose between gcloud storage, Storage Transfer Service, Transfer Appliance and BigQuery Data Transfer Service for a transfer scenario.",
   "Students will be able to describe how storage class changes affect new and existing objects."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the moving-house warm-up and collect answers."
   ],
   [
    12,
    "Teach",
    "Demonstrate or project gcloud storage ls, cp, mv, rm and rsync. Explain flat namespaces and immutability. Then compare the three transfer options and BigQuery Data Transfer Service using a table on the board."
   ],
   [
    18,
    "Activity",
    "Run the 'Command builder and mover match' pair activity."
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
  "warmup": "You are moving house. When would you use your own car, a moving company, or a shipping container? What decides it?",
  "activity": {
   "title": "Command builder and mover match",
   "materials": "Printed task cards (teacher-made), student laptops with a browser for optional reference to official documentation, whiteboard.",
   "steps": [
    "Part one: give each pair six task cards such as 'upload report.csv to the reports prefix', 'delete everything under old/', and 'make the bucket match my local projects folder'. Pairs write the gcloud storage command for each.",
    "Part two: give each pair five transfer scenarios with data size, source location and bandwidth. Pairs choose gcloud storage, Storage Transfer Service, Transfer Appliance or BigQuery Data Transfer Service and justify it in one sentence.",
    "Pairs exchange answers with another pair and mark any disagreement.",
    "The teacher reviews disagreements on the whiteboard, emphasizing destination and bandwidth as deciding factors."
   ]
  },
  "discussion": [
   "What risks come with the rsync option that deletes destination objects, and how would you guard against them?",
   "Why might an organization still use Storage Transfer Service for a one-time copy instead of a script?"
  ],
  "exit": [
   [
    "Which command synchronizes a local folder to a bucket prefix?",
    "gcloud storage rsync."
   ],
   [
    "Which service copies data from Amazon S3 to Cloud Storage on a schedule?",
    "Storage Transfer Service."
   ],
   [
    "Does updating a bucket's default storage class change existing objects?",
    "No, only new objects; existing ones need a rewrite or lifecycle rule."
   ]
  ],
  "differentiation": [
   "Support: Provide a command template sheet with blanks for the source and destination so students focus on choosing the right verb.",
   "Extend: Ask fast finishers to design a lifecycle policy in plain words that moves objects to Nearline after 30 days, Coldline after 90 days and deletes them after 365 days, and explain how it interacts with versioning."
  ]
 },
 {
  "t": "Operating databases: Cloud SQL backups, high availability and read replicas, and BigQuery dry runs",
  "objectives": [
   "Students will be able to match Cloud SQL backups, point-in-time recovery, high availability and read replicas to the failures each one addresses.",
   "Students will be able to explain why synchronous HA replication does not protect against data mistakes.",
   "Students will be able to estimate BigQuery query cost with a dry run and identify changes that reduce bytes processed.",
   "Students will be able to describe secure connection options for Cloud SQL, including the Auth Proxy and private IP."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt and take a quick hand vote on whether HA would save the deleted rows."
   ],
   [
    12,
    "Teach",
    "Draw a region with two zones, a primary, a standby, and a read replica in another region. Label synchronous and asynchronous arrows. Walk through PITR with a timeline. Then project a BigQuery dry run result and show how column selection and partition filters change it while LIMIT does not."
   ],
   [
    17,
    "Activity",
    "Run the 'Incident desk' pair activity with scenario cards."
   ],
   [
    6,
    "Discuss",
    "Revisit the warm-up vote and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A developer accidentally deletes every row in a production table. The database has high availability in two zones. Will failover bring the rows back? Vote yes or no and give one reason.",
  "activity": {
   "title": "Incident desk",
   "materials": "Printed scenario cards (teacher-made), a printed sheet of four sample BigQuery queries with dry run byte estimates, whiteboard.",
   "steps": [
    "Give each pair eight Cloud SQL scenario cards such as 'zone outage', 'dropped table at 14:02', 'reporting slows checkout', 'region outage' and 'need to change machine type'.",
    "Pairs write which feature or action solves each card and whether it is automatic or manual.",
    "Hand out the BigQuery sheet. Pairs rank the four queries by cost and rewrite the most expensive one to scan less data, explaining their changes.",
    "Pairs join another pair to compare answers, focusing on any card where they chose HA.",
    "The teacher reviews the region outage and LIMIT cards with the class."
   ]
  },
  "discussion": [
   "Why would a team pay for both HA and point-in-time recovery instead of choosing one?",
   "What guardrails would you put in place before giving many analysts access to large BigQuery tables?"
  ],
  "exit": [
   [
    "Which Cloud SQL feature undoes an accidental DELETE with minimal data loss?",
    "Point-in-time recovery."
   ],
   [
    "Can an HA standby serve read traffic?",
    "No; use read replicas."
   ],
   [
    "Does LIMIT reduce bytes processed for a normal BigQuery table?",
    "No; select fewer columns and filter on partitioned or clustered columns."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row table (zone failure, mistake, too busy) to fill with the matching feature before they start the scenario cards.",
   "Extend: Ask fast finishers to plan a disaster recovery runbook for a regional outage using a cross-region replica, including how the application's connection settings change after promotion."
  ]
 },
 {
  "t": "Operating networks: expanding subnets, static IP addresses and Cloud DNS",
  "objectives": [
   "Students will be able to expand a subnet's primary range and identify when an expansion would overlap another range.",
   "Students will be able to calculate usable addresses in a Google Cloud subnet given its prefix length.",
   "Students will be able to distinguish ephemeral and static external IP addresses and explain how to promote an ephemeral address.",
   "Students will be able to choose between public zones, private zones, forwarding zones and automatic internal DNS for a naming need."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the phone number warm-up and connect it to static and ephemeral IPs."
   ],
   [
    12,
    "Teach",
    "Draw a VPC with two regional subnets on the board. Show expand-ip-range and work through 252 usable addresses in a /24. Explain ephemeral versus static, including promotion. Close with public and private zones, forwarding zones and internal DNS names."
   ],
   [
    18,
    "Activity",
    "Run the 'Network change request' pair activity with subnet math and DNS cards."
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
  "warmup": "When you move apartments, why might you want to keep your old phone number? What would break if it changed?",
  "activity": {
   "title": "Network change request",
   "materials": "Printed change request cards with a VPC diagram listing existing subnet ranges (teacher-made), scratch paper for subnet math, whiteboard.",
   "steps": [
    "Give each pair a diagram of a VPC with four subnets and six change request cards, such as 'expand app-subnet to /22', 'keep the SFTP server's IP', and 'let services find the database by name'.",
    "For each subnet expansion card, pairs write out the start and end of the proposed range and check for overlap, then approve or reject the request.",
    "For each IP and DNS card, pairs choose the right resource (static external IP, static internal IP, public zone, private zone, forwarding zone or automatic internal DNS) and write the gcloud command outline.",
    "Pairs calculate usable addresses for each approved subnet.",
    "Two pairs compare decisions and the teacher resolves disagreements on the whiteboard."
   ]
  },
  "discussion": [
   "Why is it a good idea to plan subnet sizes generously at the start, given that expansions cannot be undone?",
   "When would you use a private DNS zone instead of relying on automatic internal DNS names?"
  ],
  "exit": [
   [
    "How many usable addresses are in a /23 subnet in Google Cloud?",
    "508 (512 minus 4 reserved)."
   ],
   [
    "How do you make a VM's current ephemeral public IP permanent?",
    "Promote it to a static external IP by reserving that address."
   ],
   [
    "Which Cloud DNS zone type answers only for authorized VPC networks?",
    "A private zone."
   ]
  ],
  "differentiation": [
   "Support: Provide a prefix length chart showing total addresses for /20 through /29 so students focus on the reserved-address rule and overlap checks.",
   "Extend: Ask fast finishers to design DNS for a hybrid setup where on-premises users must resolve a private zone and cloud VMs must resolve an on-premises domain, naming the Cloud DNS features used."
  ]
 },
 {
  "t": "Cloud Monitoring: metrics, dashboards, alerting policies, uptime checks and the Ops Agent",
  "objectives": [
   "Students will be able to identify which VM metrics are built in and which require the Ops Agent.",
   "Students will be able to design an alerting policy with appropriate conditions, durations and notification channels.",
   "Students will be able to explain the purpose of uptime checks and metrics scopes.",
   "Students will be able to describe SLOs, error budgets and burn-rate alerts at a conceptual level."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the car dashboard warm-up and list student answers."
   ],
   [
    12,
    "Teach",
    "Project a list of built-in metrics and highlight the missing memory and disk metrics. Explain the Ops Agent and agent policies. Draw an alerting policy as condition plus channel, then an uptime check from several world locations. Briefly define SLO, error budget and burn rate."
   ],
   [
    18,
    "Activity",
    "Run the 'Design the alerts' group activity."
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
  "warmup": "A car dashboard shows speed and engine temperature. What would you want it to warn you about that it currently cannot measure, and what would you need to add?",
  "activity": {
   "title": "Design the alerts",
   "materials": "Printed outage stories (teacher-made), blank alerting policy templates with fields for condition, duration, channel and documentation, sticky notes, whiteboard.",
   "steps": [
    "Give each group of three an outage story, such as a full disk, a VM that silently stopped sending metrics, a website returning an error page, or a spike in failed payments in logs.",
    "Groups decide what data was missing and whether the Ops Agent, an uptime check, a log-based condition or a metric absence condition would have caught it.",
    "Groups fill in an alerting policy template, including a duration and a short documentation note for responders.",
    "Each group posts its template on the board and another group checks it for noise (too sensitive) or gaps (would miss the outage).",
    "The teacher summarizes which condition type matched each story."
   ]
  },
  "discussion": [
   "How do you balance catching every problem against waking people up for alerts that do not matter?",
   "Why might an organization prefer SLO burn-rate alerts over simple threshold alerts for user-facing services?"
  ],
  "exit": [
   [
    "What must you install to see memory and disk usage for a VM?",
    "The Ops Agent."
   ],
   [
    "Name the two required parts of an alerting policy.",
    "Conditions and notification channels."
   ],
   [
    "Which feature tests whether your website is reachable from around the world?",
    "An uptime check (with an alerting policy to notify)."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching sheet pairing each outage symptom with one of four tools before they fill in templates.",
   "Extend: Ask fast finishers to write an SLO for the billing portal, calculate its monthly error budget in minutes for a 30-day month at 99.9 percent, and describe the burn-rate alert they would create."
  ]
 },
 {
  "t": "Cloud Logging: Logs Explorer, log-based metrics, log buckets and sinks",
  "objectives": [
   "Students will be able to write basic Logging query language filters to find entries in Logs Explorer.",
   "Students will be able to explain the default _Required and _Default buckets, their retention, and how exclusions affect cost.",
   "Students will be able to choose a sink destination for archiving, analysis or streaming and grant its writer identity access.",
   "Students will be able to design an aggregated sink and a log-based metric for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the mailroom warm-up and collect ideas about which mail should be kept, forwarded or thrown away."
   ],
   [
    12,
    "Teach",
    "Project a sample log entry and point out severity, resource, log name and payload. Show two queries. Draw the Log Router with _Required and _Default buckets, a user-defined sink with a writer identity, an exclusion and an aggregated sink on an organization. Explain counter and distribution log-based metrics."
   ],
   [
    18,
    "Activity",
    "Run the 'Route the logs' pair activity using printed log entries and requirement cards."
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
  "warmup": "A company mailroom gets thousands of letters a day. Some must be kept for years, some go to specific teams, and some are junk. What rules would you set up?",
  "activity": {
   "title": "Route the logs",
   "materials": "Printed sample log entries in JSON (teacher-made), requirement cards, a blank Log Router diagram per pair, markers.",
   "steps": [
    "Give each pair five sample log entries and ask them to write a Logging query that matches each one, such as a VM error or a Cloud Run 500.",
    "Hand out requirement cards such as 'keep audit logs seven years', 'stream security logs to a SIEM', 'analyze errors with SQL', 'drop DEBUG noise' and 'alert on payment declined spikes'.",
    "Pairs draw the routing on their Log Router diagram: which sink, destination, exclusion or log-based metric meets each requirement, and what permission the writer identity needs.",
    "Pairs mark which requirements need an aggregated sink at the organization or folder level.",
    "Two pairs swap diagrams and check for missing permissions or wrong destinations."
   ]
  },
  "discussion": [
   "What are the trade-offs between keeping logs in a log bucket, BigQuery or Cloud Storage for long-term retention?",
   "What risks come with using exclusion filters to cut costs, and how would you decide what is safe to exclude?"
  ],
  "exit": [
   [
    "What is the default retention of the _Default bucket?",
    "30 days, adjustable."
   ],
   [
    "Which sink destination is best for low-cost long-term archiving?",
    "A Cloud Storage bucket."
   ],
   [
    "What turns 'payment declined' log entries into a number you can alert on?",
    "A counter log-based metric."
   ]
  ],
  "differentiation": [
   "Support: Provide a destination chooser card (archive, analyze, stream, centralize searchable) and a list of the writer identity roles for each destination.",
   "Extend: Ask fast finishers to write a complete gcloud command for an aggregated sink on a folder that sends only Data Access audit logs to BigQuery, and list the permission to grant afterward."
  ]
 },
 {
  "t": "Cloud Audit Logs: Admin Activity, Data Access, System Event and Policy Denied logs",
  "objectives": [
   "Students will be able to name the four Cloud Audit Log types and state which are always on and which must be enabled.",
   "Students will be able to enable Data Access audit logs for a specific service and exempt principals.",
   "Students will be able to identify the IAM role needed to view each audit log type.",
   "Students will be able to write a Logs Explorer filter to find who performed a given action."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the security camera warm-up and list which rooms students would put cameras in."
   ],
   [
    12,
    "Teach",
    "Present a four-column table of audit log types with examples, default state, cost and viewer role. Show the Audit logs page and an auditConfigs excerpt. Project a sample audit entry and highlight methodName, principalEmail and resourceName."
   ],
   [
    18,
    "Activity",
    "Run the 'Investigation board' group activity with printed audit entries."
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
  "warmup": "If you could put security cameras in only some rooms of a building because footage is expensive to store, which rooms would you choose, and what could you never prove about the other rooms?",
  "activity": {
   "title": "Investigation board",
   "materials": "Printed audit log entries in simplified JSON (teacher-made) including Admin Activity, System Event, Data Access and Policy Denied examples, incident question cards, sticky notes, whiteboard.",
   "steps": [
    "Give each group a stack of about twelve audit entries and four incident questions, such as 'who deleted the VM', 'why was the VM restarted at 03:00', 'who read the payroll file' and 'why did the export job fail'.",
    "Groups sort entries by log type using the logName field, then find the entries that answer each question and write the principal and time on a sticky note.",
    "One question has no matching Data Access entry. Groups explain why and write the configuration change that would have captured it.",
    "Groups write a Logs Explorer filter for one of the questions using protoPayload fields.",
    "Each group presents one finding and the class checks whether the right log type was used."
   ]
  },
  "discussion": [
   "How would you decide which services and projects need Data Access logs enabled?",
   "Why might an organization restrict Private Logs Viewer more tightly than Logs Viewer?"
  ],
  "exit": [
   [
    "Which audit log type is always on and records who changed an IAM policy?",
    "Admin Activity audit logs."
   ],
   [
    "Which role is required to view Data Access logs?",
    "Private Logs Viewer (roles/logging.privateLogViewer)."
   ],
   [
    "For which service are Data Access logs enabled by default?",
    "BigQuery."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card showing the logName suffix for each audit log type and one example method per type.",
   "Extend: Ask fast finishers to design an organization-level audit logging setup: which Data Access logs to enable where, which principals to exempt, and how to route audit logs for seven-year retention."
  ]
 },
 {
  "t": "Troubleshooting with Error Reporting, Cloud Trace and Cloud Profiler",
  "objectives": [
   "Students will be able to state the question that Error Reporting, Cloud Trace and Cloud Profiler each answer.",
   "Students will be able to distinguish a cross-service latency problem from a function-level resource problem and choose the matching tool.",
   "Students will be able to describe the setup each tool needs, including automatic Error Reporting on serverless services and OpenTelemetry or agent instrumentation.",
   "Students will be able to sequence the tools in a realistic investigation that starts from an alert."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up prompt and have pairs list every place they would look first. Collect answers on the whiteboard in three unlabeled columns that you later name Errors, Time and Code."
   ],
   [
    12,
    "Teach",
    "Walk through each tool with its one-line question. Sketch a trace waterfall with spans on the board, then a simple flame graph. Stress that Trace looks across services and Profiler looks inside one service. Mention that Error Reporting works automatically from logged stack traces on Cloud Run, Cloud Run functions and App Engine."
   ],
   [
    18,
    "Activity",
    "Run the symptom card sort described below. Circulate and ask each group to justify one card out loud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the tools into one investigation chain and to talk about what happens when a team only has logs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a sticky note and place it on the door as they leave."
   ]
  ],
  "warmup": "Your checkout page slowed from under a second to four seconds right after a release. You have six services in the request path. What is the very first question you want answered, and where would you look?",
  "activity": {
   "title": "Which tool answers this? Symptom card sort",
   "materials": "Printed cards (about 15 per group) each with one symptom or question, three header cards labeled Error Reporting, Cloud Trace and Cloud Profiler, plus a fourth labeled Something else, and a whiteboard.",
   "steps": [
    "Prepare cards in advance, such as 'Which of six services adds the most latency?', 'Is this NullPointerException new since Tuesday?', 'Which function uses the most CPU in the pricing service?', 'Heap memory grows steadily all day', 'VM cannot reach Cloud SQL on port 3306' and 'An idle VM is wasting money'.",
    "In groups of three, students sort each card under one header and write a one-sentence reason on the back.",
    "Each group swaps its layout with another group, which marks any placement it disagrees with using a sticky note.",
    "Groups resolve disagreements, then the teacher reveals the intended answers, including that the network card belongs to Connectivity Tests and the idle VM card to Active Assist.",
    "As a final step, each group orders four cards into an investigation chain starting from a latency alert."
   ]
  },
  "discussion": [
   "Why is it useful that Error Reporting tracks when an error group was first seen, especially around releases?",
   "What would be hard about finding a slow microservice using only logs and CPU metrics?",
   "When would continuous profiling in production be more useful than profiling in a test environment?"
  ],
  "exit": [
   [
    "Which tool shows which service in a chain of microservices adds the most latency?",
    "Cloud Trace, through the spans in each request's trace."
   ],
   [
    "A team wants to find the function using the most CPU in one production service. Which tool?",
    "Cloud Profiler, which samples CPU and memory use by function with low overhead."
   ],
   [
    "What does a Cloud Run service need for Error Reporting to group its exceptions?",
    "Usually nothing beyond writing exceptions with stack traces to its logs; no code changes are required."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-row reference card with each tool's one-line question and a tiny sketch (a pile of errors, a waterfall, a flame graph) to use during the card sort.",
   "Extend: Ask fast finishers to write a short incident timeline for a fictional outage that uses all three tools plus Logs Explorer, naming exactly what each tool showed at each step."
  ]
 },
 {
  "t": "IAM roles: basic, predefined and custom roles, and least privilege",
  "objectives": [
   "Students will be able to explain the difference between basic, predefined and custom roles and the permission format service.resource.verb.",
   "Students will be able to choose the narrowest suitable role and scope for a given job description.",
   "Students will be able to state where custom roles can be created and who maintains them.",
   "Students will be able to justify why basic roles are discouraged in production."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the contractor who wants Editor. Take three quick answers and write them on the board without judging them."
   ],
   [
    12,
    "Teach",
    "Show the three role types as three key rings on the board. Write example permissions in the service.resource.verb format. Demonstrate reading the output of a role describe command projected on screen. Emphasize that custom roles live only at organization or project level and are not updated by Google."
   ],
   [
    18,
    "Activity",
    "Run the least privilege role-matching game described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore trade-offs between custom role maintenance and using broader predefined roles."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "A manager asks you to give a contractor Editor on production so he can restart VMs. What could go wrong, and what would you offer instead?",
  "activity": {
   "title": "Least privilege role-matching game",
   "materials": "Printed job cards (for example 'restart VMs only', 'read one bucket', 'deploy Cloud Run services', 'view logs', 'manage IAM for one project'), printed permission cards with entries such as compute.instances.start and storage.objects.get, a list of predefined role names projected on screen, and the whiteboard.",
   "steps": [
    "Split the class into groups of three and give each group four job cards.",
    "For each job, the group first looks for a fitting predefined role on the projected list and writes the role and the narrowest scope (organization, folder, project or single resource).",
    "If no predefined role fits, the group builds a custom role from permission cards and records whether it would be created at the organization or project level.",
    "Groups trade answers with a neighbor, who challenges any grant that is broader than needed.",
    "The teacher reviews one tricky card with the class, such as 'restart VMs only', and confirms the custom role answer."
   ]
  },
  "discussion": [
   "What ongoing work does a custom role create for the team that owns it?",
   "Why might granting a role on a single bucket be better than granting a narrower role on the whole project?",
   "How do Google groups make least privilege easier to maintain over time?"
  ],
  "exit": [
   [
    "Which basic role can manage IAM policies, and which cannot?",
    "Owner can manage IAM policies; Editor and Viewer cannot."
   ],
   [
    "Where can custom roles be created?",
    "At the organization or project level, not on folders."
   ],
   [
    "A user only needs to read objects in one bucket. What do you grant?",
    "Storage Object Viewer on that bucket rather than a broader role on the project."
   ]
  ],
  "differentiation": [
   "Support: Provide a short cheat sheet with five common predefined roles, their IDs and one-line descriptions so students can focus on matching jobs to scope.",
   "Extend: Ask fast finishers to write the YAML outline for a custom role (title, description, stage, permissions) for a 'VM operator' and list which predefined role they compared it with."
  ]
 },
 {
  "t": "Viewing and changing IAM allow policies with gcloud, and IAM Conditions",
  "objectives": [
   "Students will be able to read an allow policy and identify its bindings, members, etag and version.",
   "Students will be able to choose between add-iam-policy-binding and set-iam-policy and explain the risk of the latter.",
   "Students will be able to write a simple time-based IAM Condition and state the limits on conditions.",
   "Students will be able to explain why allow policies cannot remove inherited access and name deny policies as the alternative."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up story of the stale policy upload and ask students to guess what happened."
   ],
   [
    12,
    "Teach",
    "Project a sample policy in YAML and label each part. Compare add-iam-policy-binding with the download-edit-upload flow, and explain the etag. Write a request.time condition on the board and list the rules: version 3, no basic roles, not every attribute everywhere."
   ],
   [
    18,
    "Activity",
    "Run the policy file detective activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on when deny policies are the right tool."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Two admins edit the same project's access at the same time, one in the console and one by uploading a file they saved an hour earlier. What could go wrong, and how might the system protect against it?",
  "activity": {
   "title": "Policy file detective",
   "materials": "Printed copies of three short sample allow policies in YAML written by the teacher (one with a conditional binding, one stale copy and one current copy with different etags), highlighters, and the projector.",
   "steps": [
    "Pairs receive the three printed policies and highlight every binding, member prefix, etag and version field.",
    "Pairs compare the stale and current copies and list exactly which bindings would be lost if the stale copy were uploaded with set-iam-policy without an etag check.",
    "Pairs write the add-iam-policy-binding commands they would use instead to make the intended changes safely.",
    "Pairs write a condition expression that grants an auditor Security Reviewer until a date of their choice, and note why the conditional policy needs version 3.",
    "The teacher projects model answers and asks two pairs to explain their reasoning."
   ]
  },
  "discussion": [
   "When might a team still choose set-iam-policy, and how could they make it safer?",
   "Why does Google evaluate deny policies before allow policies?",
   "What risks remain if expired conditional bindings are left in a policy for months?"
  ],
  "exit": [
   [
    "Which command safely adds a single role binding to a project?",
    "gcloud projects add-iam-policy-binding with --member and --role."
   ],
   [
    "What does the etag do in an allow policy?",
    "It makes an upload fail if the policy changed since you read it, preventing accidental overwrites."
   ],
   [
    "How do you grant temporary access that ends automatically?",
    "Add an IAM Condition on request.time to the binding, using a non-basic role."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram of a policy file with arrows pointing to bindings, members, etag and version to keep beside them during the activity.",
   "Extend: Ask fast finishers to write a condition that combines a time limit with a resource name prefix and explain which services' resources it would and would not reliably apply to."
  ]
 },
 {
  "t": "Service accounts: creating them, granting roles, attaching them to resources, and default service accounts",
  "objectives": [
   "Students will be able to explain why a service account is both a principal and a resource.",
   "Students will be able to describe the steps to create a service account, grant it a narrowly scoped role and attach it to a VM or Cloud Run service.",
   "Students will be able to identify Service Account User as the role needed to attach a service account and distinguish it from Service Account Admin.",
   "Students will be able to explain the risks of the Compute Engine default service account and contrast default service accounts with service agents."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up question aloud and have pairs discuss for two minutes before sharing."
   ],
   [
    12,
    "Teach",
    "Draw a VM, its attached service account and the metadata server on the board, with arrows for token requests. Walk through the create, grant and attach commands. Explain Service Account User with the 'borrowing a badge' story, then discuss default service accounts and service agents."
   ],
   [
    18,
    "Activity",
    "Run the identity design whiteboard activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare shared and dedicated service accounts."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "If an app on a VM needs to write files to a storage bucket, how should it prove who it is? Should it use your account, a password in a file, or something else?",
  "activity": {
   "title": "Identity design for a three-tier app",
   "materials": "Whiteboard or large paper per group, markers, and a printed scenario card describing an app with a web front end on Cloud Run, a worker on a VM, and access needs to one bucket, one secret and one BigQuery dataset.",
   "steps": [
    "Groups read the scenario card and draw each workload as a box.",
    "For each workload, groups name a dedicated service account and list the narrowest role and resource it needs, such as Storage Object Creator on one bucket.",
    "Groups add the people involved (a developer, a release engineer) and mark which of them needs Service Account User on which service account, and who, if anyone, needs Service Account Admin.",
    "Groups mark where the Compute Engine default service account would have been used and write one sentence on why they avoided it.",
    "Two groups present, and the class checks each grant for least privilege."
   ]
  },
  "discussion": [
   "What is lost in audit logs when many applications share one service account?",
   "Why does Google require a separate permission to attach a service account rather than relying only on permission to create VMs?",
   "How would you safely migrate existing VMs away from a default service account with Editor?"
  ],
  "exit": [
   [
    "What role does a user need to attach a service account to a new VM?",
    "Service Account User on that service account."
   ],
   [
    "How does an app on a VM obtain credentials without a key file?",
    "It requests short-lived tokens from the metadata server for the attached service account."
   ],
   [
    "Why is the Compute Engine default service account risky?",
    "It may be granted Editor automatically and is used by any VM that does not specify another account."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank template of the three gcloud commands (create, grant, attach) so students can focus on choosing names, roles and scopes.",
   "Extend: Ask fast finishers to explain how they would prevent new projects from granting Editor to default service accounts, and what checks they would add to a deployment review."
  ]
 },
 {
  "t": "Service account impersonation, short-lived credentials and avoiding service account keys",
  "objectives": [
   "Students will be able to explain why long-lived service account keys are risky and name alternatives for workloads and people.",
   "Students will be able to describe how impersonation works, including the Service Account Token Creator role and the gcloud flag or configuration setting.",
   "Students will be able to distinguish Service Account Token Creator from Service Account User.",
   "Students will be able to sequence the correct response to a leaked service account key."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario about a key committed to a public repository and ask students what they would do first."
   ],
   [
    12,
    "Teach",
    "Contrast a key with an impersonation flow on the board. Show the gcloud impersonation flag and config setting. Explain token lifetimes, audit log traceability and the organization policy that blocks key creation. Clarify Token Creator versus Service Account User."
   ],
   [
    18,
    "Activity",
    "Run the leaked key tabletop exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore when a key might still be unavoidable."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A teammate says, 'I deleted the commit with the key, so we're fine.' Do you agree? Why or why not?",
  "activity": {
   "title": "Leaked key tabletop exercise",
   "materials": "Printed scenario cards revealed one at a time (key found in a public repo, audit log excerpt written by the teacher showing activity by the service account, a request from the developer to keep using keys), sticky notes and the whiteboard.",
   "steps": [
    "Groups of four take roles: incident lead, IAM admin, log reviewer and developer.",
    "On card one, the group writes the first three actions on sticky notes in order and places them on the board.",
    "On card two, the log reviewer reads the excerpt aloud and the group identifies suspicious actions and the principal that performed them.",
    "On card three, the group designs the replacement workflow using impersonation, naming the role, who gets it, and the gcloud setting.",
    "Groups compare their action orders, and the teacher confirms that disabling or deleting the key comes before cleanup of the repository."
   ]
  },
  "discussion": [
   "What makes impersonation more traceable than a shared key?",
   "In which real situations might a key still be required, and how would you limit its risk?",
   "Why might delegation chains between service accounts make access reviews harder?"
  ],
  "exit": [
   [
    "Which role allows a user to impersonate a service account?",
    "Service Account Token Creator on that service account."
   ],
   [
    "Name two reasons impersonation is safer than a key.",
    "Credentials are short-lived, and audit logs record the human who impersonated the service account; there is no long-lived file to leak."
   ],
   [
    "What is the first step after a key leaks?",
    "Disable or delete the key in IAM, then review audit logs."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column chart comparing keys and impersonation (lifetime, where stored, traceability, how to revoke) for students to complete during the lesson.",
   "Extend: Ask fast finishers to describe how a CI system outside Google Cloud could avoid keys entirely and what organization policies they would enforce."
  ]
 },
 {
  "t": "Workload Identity Federation for GKE and for workloads outside Google Cloud",
  "objectives": [
   "Students will be able to explain why sharing a node's service account across pods violates least privilege.",
   "Students will be able to describe how Workload Identity Federation for GKE maps Kubernetes service accounts to IAM identities.",
   "Students will be able to outline the components of Workload Identity Federation for external workloads: pool, provider, attribute mapping, attribute condition and Security Token Service.",
   "Students will be able to choose the keyless option for a GKE or CI/CD access scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect quick ideas about how a pipeline outside Google could prove its identity."
   ],
   [
    12,
    "Teach",
    "Draw two diagrams side by side: pods on a node before and after Workload Identity Federation for GKE, and a GitHub Actions job exchanging a token with the Security Token Service. Label pool, provider, attribute mapping and condition."
   ],
   [
    18,
    "Activity",
    "Run the token exchange role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore what attribute conditions protect against."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A build pipeline on another platform needs to deploy to Cloud Run. Without giving it a password or key file, how could Google Cloud know the request really comes from your pipeline?",
  "activity": {
   "title": "Token exchange role-play",
   "materials": "Printed role cards (GitHub job, Security Token Service, provider rules, Cloud Run deploy API), printed 'token' slips with claims such as repository and branch, sticky notes, and the whiteboard.",
   "steps": [
    "The teacher writes a provider's attribute condition on the board, such as repository must be example-org/shop and branch must be main.",
    "In groups of four, students take roles. The GitHub job student presents a token slip to the Security Token Service student.",
    "The Security Token Service student checks the slip against the provider rules and either issues a short-lived federated token sticky note or refuses.",
    "The group repeats with tricky slips, such as a fork's repository or a different branch, and records which are refused and why.",
    "Groups then redraw the flow for a GKE pod, replacing the external token with a Kubernetes service account, and present one difference they noticed."
   ]
  },
  "discussion": [
   "What could happen if a provider trusted a large public identity provider with no attribute condition?",
   "Why are federated, short-lived tokens easier to govern than keys stored as secrets?",
   "When would you grant roles directly to a federated principal instead of having it impersonate a service account?"
  ],
  "exit": [
   [
    "How do pods get distinct Google identities in GKE?",
    "By enabling Workload Identity Federation for GKE and granting roles to each pod's Kubernetes service account, directly or through a linked Google service account."
   ],
   [
    "What are the main parts of Workload Identity Federation for a CI pipeline?",
    "A workload identity pool, a provider trusting the external identity provider, attribute mappings and conditions, and the Security Token Service exchange."
   ],
   [
    "What is the most secure way to let GitHub Actions deploy to Google Cloud?",
    "Workload Identity Federation with a provider restricted to the repository, with no service account key."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-drawn flow diagram with blank labels for pool, provider, Security Token Service and service account to complete during the teach segment.",
   "Extend: Ask fast finishers to write an attribute condition that restricts access to one repository and one protected branch, and explain what a fork would see."
  ]
 },
 {
  "t": "Identity-Aware Proxy and OS Login for secure administrative access",
  "objectives": [
   "Students will be able to explain the zero-trust model that IAP implements and contrast it with VPN-based access.",
   "Students will be able to configure the roles and firewall requirements for IAP web access and IAP TCP forwarding.",
   "Students will be able to distinguish Compute OS Login, Compute OS Admin Login and Compute OS Login External User.",
   "Students will be able to troubleshoot a failed IAP SSH connection by checking roles, firewall rules and external IPs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the risks of VPNs and bastion hosts on the board."
   ],
   [
    12,
    "Teach",
    "Draw a request flowing from a user through IAP to a load balancer backend, then an SSH session through an IAP tunnel to a VM with no external IP. Add the firewall rule with 35.235.240.0/20. Then layer OS Login on top, explaining the three OS Login roles."
   ],
   [
    18,
    "Activity",
    "Run the pair troubleshooting stations described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare metadata SSH keys with OS Login."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If an attacker gets onto your office network, what can they reach today? How would you change that if every request had to prove who the user is?",
  "activity": {
   "title": "IAP and OS Login troubleshooting stations",
   "materials": "Four printed station cards, each describing a failed access attempt with a short configuration excerpt written by the teacher (roles granted, firewall rules, external IP status, metadata settings), plus answer sheets and the whiteboard.",
   "steps": [
    "Pairs rotate through four stations, spending about four minutes at each.",
    "Station examples: SSH through IAP times out (missing firewall rule for 35.235.240.0/20); user can SSH but sudo fails (has Compute OS Login, not Admin Login); HR app reachable directly by IP (backend has a public IP and open firewall); vendor cannot log in (missing External User role at organization level).",
    "At each station, pairs write the cause and the least-privilege fix on the answer sheet.",
    "After rotation, the teacher reviews each station and asks pairs to explain the fix in one sentence."
   ]
  },
  "discussion": [
   "Why does OS Login make offboarding faster than SSH keys in metadata?",
   "What does IAP fail to protect if backends keep public IP addresses?",
   "How could context-aware access levels further reduce risk for sensitive apps?"
  ],
  "exit": [
   [
    "Which role allows a user through IAP to a protected web app?",
    "IAP-secured Web App User."
   ],
   [
    "What two things does IAP TCP forwarding to SSH need besides the VM?",
    "The IAP-secured Tunnel User role and a firewall rule allowing 35.235.240.0/20 to port 22."
   ],
   [
    "Which OS Login role grants sudo?",
    "Compute OS Admin Login."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist card listing roles, firewall rule, external IP and OS Login metadata so struggling students can work through each station systematically.",
   "Extend: Ask fast finishers to design access for a vendor team that needs RDP to Windows VMs and read-only access to an internal dashboard, naming every role and rule."
  ]
 },
 {
  "t": "Encryption: Google default encryption, Cloud KMS customer-managed keys and customer-supplied keys",
  "objectives": [
   "Students will be able to describe default encryption at rest and in transit, including envelope encryption.",
   "Students will be able to compare default encryption, CMEK, CSEK and client-side encryption by who controls and stores the key.",
   "Students will be able to identify the IAM role a service agent needs to use a CMEK key.",
   "Students will be able to select the correct encryption option from a compliance requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write students' answers about who holds the keys on the board."
   ],
   [
    12,
    "Teach",
    "Draw envelope encryption with a DEK inside a KEK. Then draw a horizontal spectrum from default to client-side, adding who holds the key, who encrypts, and what happens if the key is lost or disabled. Explain the service agent's Encrypter/Decrypter role and key destruction waiting periods."
   ],
   [
    18,
    "Activity",
    "Run the requirement matching card sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh control against operational burden."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your cloud provider encrypts all your data automatically, why would any organization want to manage its own keys?",
  "activity": {
   "title": "Requirement matching card sort",
   "materials": "Printed requirement cards (for example 'must disable access to data on demand', 'provider must never store the key', 'no special requirement', 'provider must never see plaintext', 'keys must be in hardware security modules'), four header cards labeled Default, CMEK, CSEK and Client-side, and sticky notes.",
   "steps": [
    "Groups of three sort each requirement card under the best header.",
    "For every CMEK card, the group writes on a sticky note which identity needs which role on the key.",
    "Groups list the operational tasks each option creates, such as storing and delivering keys for CSEK.",
    "The teacher reveals answers and highlights the cards students most often misplace, especially CMEK versus CSEK."
   ]
  },
  "discussion": [
   "What is the trade-off between control and risk of data loss with CSEK?",
   "Why might an organization choose Cloud EKM over Cloud HSM?",
   "How does the ability to disable a CMEK key support compliance requirements?"
  ],
  "exit": [
   [
    "Which option lets you control rotation and disable a key while Google performs encryption?",
    "CMEK in Cloud KMS."
   ],
   [
    "Which role does a service agent need on a CMEK key?",
    "Cloud KMS CryptoKey Encrypter/Decrypter."
   ],
   [
    "What happens if a customer-supplied key is lost?",
    "The data cannot be recovered, because Google does not store the key."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed comparison table with rows for each option and columns for who holds the key, who encrypts, and what happens if the key is lost.",
   "Extend: Ask fast finishers to design key management for a multi-region analytics platform, considering key ring locations, rotation schedules and who should hold Cloud KMS admin roles."
  ]
 },
 {
  "t": "Secret Manager for passwords, API keys and certificates",
  "objectives": [
   "Students will be able to explain why secrets should not live in code, images or configuration files.",
   "Students will be able to describe secrets, versions, the latest alias and replication policies in Secret Manager.",
   "Students will be able to grant least-privilege access to a secret for a workload's service account.",
   "Students will be able to distinguish Secret Manager from Cloud KMS in exam scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list every place students have seen passwords stored."
   ],
   [
    12,
    "Teach",
    "Draw a secret as a box holding stacked versions. Show the create and versions add commands and the Cloud Run --set-secrets flag. Explain Secret Accessor versus Admin, replication choices and the contrast with Cloud KMS."
   ],
   [
    18,
    "Activity",
    "Run the secret cleanup audit described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore rotation strategies."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Where have you seen passwords or API keys stored in projects you have worked on or heard about? What could go wrong with each place?",
  "activity": {
   "title": "Secret cleanup audit",
   "materials": "Printed excerpts written by the teacher: a deployment YAML with a password in plain text, a Dockerfile with an ENV API key line, a config file in a bucket, and an IAM policy granting Secret Manager Admin at the project level to an app's service account; plus highlighters and the whiteboard.",
   "steps": [
    "Pairs highlight every exposed secret and every overly broad permission in the excerpts.",
    "For each secret, pairs write the gcloud commands to create a Secret Manager secret and add its first version.",
    "Pairs rewrite the IAM grant so each app's service account has Secret Accessor only on the secrets it uses.",
    "Pairs describe how the Cloud Run service would consume the secret and how they would rotate it later.",
    "Two pairs present their redesign, and the class checks for any remaining exposure."
   ]
  },
  "discussion": [
   "What are the trade-offs between mounting a secret as a file and exposing it as an environment variable?",
   "How would you rotate a database password with minimal downtime using secret versions?",
   "Why is it important that Cloud KMS does not return raw key material for its keys?"
  ],
  "exit": [
   [
    "How do you rotate a secret in Secret Manager?",
    "Add a new version, move applications to it, then disable or destroy the old version."
   ],
   [
    "Which role should a workload's service account have to read one secret?",
    "Secret Manager Secret Accessor on that secret."
   ],
   [
    "Should an app's database password be stored in Cloud KMS or Secret Manager?",
    "Secret Manager; Cloud KMS manages encryption keys, not application secrets."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page flow showing create secret, add version, grant Secret Accessor, deploy with the secret, so they can follow along during the audit.",
   "Extend: Ask fast finishers to design an automated rotation using a rotation schedule, a Pub/Sub topic and a function, listing the IAM roles each component needs."
  ]
 },
 {
  "t": "Cloud Storage access: uniform bucket-level access, public access prevention and signed URLs",
  "objectives": [
   "Students will be able to compare IAM and ACLs in Cloud Storage and explain what uniform bucket-level access changes.",
   "Students will be able to explain what public access prevention blocks and how to enforce it organization-wide.",
   "Students will be able to choose a signed URL for time-limited sharing and state its V4 maximum lifetime.",
   "Students will be able to distinguish uniform bucket-level access from public access prevention in a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about sharing a large file with someone outside the organization and collect answers."
   ],
   [
    12,
    "Teach",
    "Draw a bucket with IAM on top and ACLs on individual objects, then cross out the ACLs to show uniform bucket-level access. Add a lock icon for public access prevention and explain allUsers and allAuthenticatedUsers. Finish with a signed URL diagram showing signature and expiry."
   ],
   [
    18,
    "Activity",
    "Run the bucket access scenario cards described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce the difference between the two bucket settings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You need to send a large confidential file to a client who has no Google account. What options can you think of, and what are the risks of each?",
  "activity": {
   "title": "Bucket access scenario cards",
   "materials": "Printed scenario cards (for example 'share a file with a client for one day', 'stop any bucket in the company from going public', 'a legacy app shares individual objects', 'simplify access so only IAM counts', 'browser uploads from anonymous users'), a printed decision chart, and sticky notes.",
   "steps": [
    "Groups of three draw a scenario card and decide which control or combination of controls fits.",
    "Groups write the setting or command they would use, such as an organization policy constraint or a gcloud storage sign-url duration.",
    "Groups note one risk or limitation of their choice, such as signed URLs being usable by anyone who has them.",
    "Groups pass cards clockwise and review the previous group's answer with a sticky note of agreement or a challenge.",
    "The teacher reviews disputed cards with the whole class."
   ]
  },
  "discussion": [
   "Why might an organization enforce public access prevention even if no bucket is public today?",
   "What responsibilities come with sending a signed URL to someone?",
   "How would you migrate a legacy app that depends on object ACLs to uniform bucket-level access?"
  ],
  "exit": [
   [
    "What does uniform bucket-level access do?",
    "It disables ACLs so only IAM controls access to the bucket."
   ],
   [
    "How do you ensure no bucket in the organization can be made public?",
    "Enforce the storage.publicAccessPrevention organization policy constraint at the organization level."
   ],
   [
    "What is the maximum validity of a V4 signed URL?",
    "7 days."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-row summary card with each control, the problem it solves and one example scenario to use during the activity.",
   "Extend: Ask fast finishers to explain how to generate a signed URL without a key file and which permissions the signing service account needs."
  ]
 },
 {
  "t": "Policy Troubleshooter, IAM recommendations and audit roles for reviewing access",
  "objectives": [
   "Students will be able to match Policy Troubleshooter, Policy Analyzer and the IAM recommender to the question each answers.",
   "Students will be able to list the inputs Policy Troubleshooter needs and interpret its result.",
   "Students will be able to explain how the IAM recommender uses a 90-day observation period and why its suggestions need review.",
   "Students will be able to select read-only roles such as Security Reviewer and Private Logs Viewer for audit scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario and have students vote on which question is hardest to answer by clicking through IAM pages."
   ],
   [
    12,
    "Teach",
    "Write the three questions on the board and map each tool to one. Show the three inputs to Policy Troubleshooter and what its result reports. Explain Policy Analyzer's group and inheritance awareness, the IAM recommender's 90-day window, and the read-only audit roles."
   ],
   [
    18,
    "Activity",
    "Run the access review help desk role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to discuss how often to review access and who should approve changes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A user says, 'I was given access last week but I still get permission denied.' List every possible reason you can think of in two minutes.",
  "activity": {
   "title": "Access review help desk role-play",
   "materials": "Printed request cards written by the teacher (for example a denied user, an auditor needing read-only access, a CISO asking for excess permissions, a manager asking who can read a bucket), a printed tool menu card, and the whiteboard.",
   "steps": [
    "Students form pairs: one plays the requester reading a card, the other plays the cloud engineer.",
    "The engineer names the tool or role, the inputs they would provide, and what output they expect to see.",
    "The requester checks the answer against a key on the back of the card and notes any missing detail, such as deny policies or group membership.",
    "Pairs switch roles and repeat with new cards until each student has handled at least three requests.",
    "The class builds a shared one-line summary for each tool on the whiteboard."
   ]
  },
  "discussion": [
   "Why should IAM recommender suggestions be reviewed with workload owners rather than applied automatically?",
   "What risks come from granting auditors the basic Viewer role instead of Security Reviewer?",
   "How could Policy Analyzer findings feed into a regular access review process?"
  ],
  "exit": [
   [
    "Which tool explains why a specific user is denied a specific permission?",
    "Policy Troubleshooter, given the principal, resource and permission."
   ],
   [
    "Which tool lists everyone who can read a bucket, including through groups and inheritance?",
    "Policy Analyzer."
   ],
   [
    "What role should an auditor who must view IAM policies but not change them receive?",
    "Security Reviewer."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column card with the question, tool and required inputs for each Policy Intelligence tool to reference during the role-play.",
   "Extend: Ask fast finishers to design a quarterly access review process combining the IAM recommender, Policy Analyzer and Security Command Center, including who approves each change."
  ]
 }
]);
