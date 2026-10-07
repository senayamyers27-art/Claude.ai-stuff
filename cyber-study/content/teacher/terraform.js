/* Teacher edition for HashiCorp Certified: Terraform Associate (Terraform Associate (004)): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("terraform", [
 {
  "t": "What IaC is: infrastructure defined in version-controlled, machine-readable files instead of manual console changes",
  "objectives": [
   "Students will be able to define Infrastructure as Code using its two key properties, machine-readable and version-controlled.",
   "Students will be able to distinguish IaC from documentation, manual console work and one-off scripts.",
   "Students will be able to explain how configuration drift arises from manual provisioning.",
   "Students will be able to identify the parts of a simple Terraform resource block."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard under two headings: what was written down and what lived in someone's head."
   ],
   [
    12,
    "Teach",
    "Define IaC, stressing machine-readable and version-controlled. Contrast ClickOps, a runbook and a script. Show the `local_file` example on the projector and label resource type, name and arguments."
   ],
   [
    15,
    "Activity",
    "Run the IaC or not card sort in small groups, then have each group defend one borderline card to the class."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect drift and auditing to the definition. Ask who in the room has seen two environments that were supposed to match but did not."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Think of something at work or home that was set up once and that nobody could rebuild exactly today, like a router, a shared drive or a game server. Why would rebuilding it be hard?",
  "activity": {
   "title": "IaC or not card sort",
   "materials": "Printed cards (one set per group of three or four), whiteboard, projector.",
   "steps": [
    "Prepare about ten cards, each describing a practice, such as a wiki page of console steps, a `.tf` file in Git, a Bash script of CLI commands run once, a screenshot folder, a spreadsheet of servers, a Terraform configuration applied from a pipeline, and a configuration file kept only on one laptop.",
    "Groups sort the cards into three columns: IaC, not IaC, and depends. For each card they write which property is present or missing: machine-readable, version-controlled, applied by a tool.",
    "Each group picks one card from the depends column and explains what would have to change to make it real IaC.",
    "Close by projecting the teacher's sort and resolving disagreements, emphasizing that documentation and unversioned files fail the definition."
   ]
  },
  "discussion": [
   "If an auditor asks why a firewall port is open, what evidence would a ClickOps team have, and what would an IaC team have?",
   "Is a script that creates resources once the same as a configuration that Terraform keeps applying? What is missing?"
  ],
  "exit": [
   [
    "What two properties make a file Infrastructure as Code rather than documentation?",
    "It is machine-readable so a tool can apply it, and it is kept in version control."
   ],
   [
    "What is configuration drift?",
    "Differences that build up between environments, or between the design and reality, usually from untracked manual changes."
   ],
   [
    "In `resource \"local_file\" \"hello\" { ... }`, which part is the resource type and which is the name?",
    "`local_file` is the resource type and `hello` is the name chosen by the author."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column checklist (machine-readable? version-controlled?) to apply to each card before sorting, and pair them with a confident peer.",
   "Extend: Ask fast finishers to rewrite the wiki-page card as a short Terraform resource block for any resource they know, and explain what Terraform would do on a second apply."
  ]
 },
 {
  "t": "Advantages of IaC: repeatability, consistency, code review, audit history, automation, fewer configuration errors",
  "objectives": [
   "Students will be able to list and define the main advantages of IaC: repeatability, consistency, code review, audit history, automation and fewer configuration errors.",
   "Students will be able to match a scenario description to the IaC benefit it illustrates.",
   "Students will be able to explain how `terraform plan` output supports code review.",
   "Students will be able to identify overstated claims about IaC, such as replacing data backups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and tally answers on the whiteboard, grouping them into rough themes as students speak."
   ],
   [
    12,
    "Teach",
    "Walk through the six benefits, linking each one back to the fact that infrastructure is code applied by a tool. Show a sample pull request description with plan summary text on the projector."
   ],
   [
    15,
    "Activity",
    "Run the benefit matching relay with scenario cards."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, steering toward limits of IaC such as data backups and bad changes that pass review."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "Describe a time a change to a computer, phone or network went wrong. What would have helped you catch it before it happened, or undo it afterwards?",
  "activity": {
   "title": "Benefit matching relay",
   "materials": "Printed scenario cards, six large sticky notes on the whiteboard labeled with each benefit, projector.",
   "steps": [
    "Prepare twelve short scenario cards, two per benefit, for example an auditor asking when encryption was enabled, a reviewer catching an open port, a team spinning up a customer environment in an hour, or a pipeline applying changes overnight.",
    "Split the class into two teams. One student at a time draws a card, reads it aloud and places it under the benefit they think it shows.",
    "The other team may challenge a placement; the challenger must explain which keyword in the scenario points to a different benefit.",
    "Finish by reviewing any contested cards together and adding one overstated claim card, such as IaC replaces backups, that belongs under none of the benefits."
   ]
  },
  "discussion": [
   "Which benefit would matter most to a security team, and which to a finance team? Why might they differ?",
   "Can a bad change still reach production in a team that uses IaC? Which practices reduce that risk?"
  ],
  "exit": [
   [
    "Which IaC advantage answers the question of who changed a firewall rule and when?",
    "Audit history from version control, supported by pull request approvals and pipeline logs."
   ],
   [
    "Name the benefit that makes staging and production genuinely alike.",
    "Consistency, because both are built from the same definitions."
   ],
   [
    "Give one reason IaC reduces configuration errors.",
    "Changes can be validated, reviewed, policy-checked and tested in lower environments before apply, and fewer manual steps exist."
   ]
  ],
  "differentiation": [
   "Support: Provide a keyword list (who and when, identical, quickly, before apply, without a person, mistakes) that maps to each benefit, and let students use it during the relay.",
   "Extend: Ask fast finishers to write two new scenario cards that each blend two benefits, and explain which one an exam would most likely be testing."
  ]
 },
 {
  "t": "Declarative (describe the end state) vs imperative (list the steps) approaches",
  "objectives": [
   "Students will be able to define declarative and imperative approaches to infrastructure.",
   "Students will be able to explain how Terraform determines operation order from references rather than file order.",
   "Students will be able to predict the plan outcome when a count changes or a resource block is removed.",
   "Students will be able to identify imperative features within Terraform, such as provisioners."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have two volunteers read their directions aloud, one step-by-step and one end-result."
   ],
   [
    12,
    "Teach",
    "Define both approaches, show the count example on the projector, and explain the dependency graph and why file order does not matter. Contrast deleting a block with deleting a script line."
   ],
   [
    15,
    "Activity",
    "Run the human Terraform role-play."
   ],
   [
    8,
    "Discuss",
    "Work through the discussion questions and connect the role-play to idempotence, previewing the next lesson."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Write directions for making a cup of tea in two ways: as numbered steps, and as a one-sentence description of the finished cup. Which version still works if someone already boiled the water?",
  "activity": {
   "title": "Human Terraform role-play",
   "materials": "Sticky notes in two colors, whiteboard, printed scenario slips.",
   "steps": [
    "Draw a simple cloud on the whiteboard and place two sticky notes inside it to represent existing servers.",
    "Give one student an imperative slip reading create two servers and another a declarative slip reading there should be three servers. Each acts out their slip by adding or removing sticky notes.",
    "Repeat the round with new slips: run the imperative slip again, then change the declarative slip to there should be one server. The class records what each approach does on each run.",
    "Finish with a removal round where the declarative slip no longer mentions a database note, and ask the class what Terraform would plan."
   ]
  },
  "discussion": [
   "When might an imperative script still be the better choice than a declarative tool?",
   "Why might deleting a block and seeing a destroy in the plan be a safety feature rather than a hazard?"
  ],
  "exit": [
   [
    "Is Terraform declarative or imperative, and what does that mean?",
    "Declarative: you describe the desired end state and Terraform works out the steps."
   ],
   [
    "If you change `count = 2` to `count = 3` and run plan, what does Terraform propose?",
    "Creating one additional instance, because only the difference is planned."
   ],
   [
    "What decides the order in which Terraform creates resources?",
    "The dependency graph built from references between resources and any `depends_on`, not the order of blocks in files."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-row table with the headings run once and run twice, and have them fill it in for each approach during the role-play.",
   "Extend: Ask fast finishers to explain how an `import` block or `removed` block turns an imperative state command into a declarative change that can be reviewed."
  ]
 },
 {
  "t": "Idempotence: applying the same configuration twice makes no further changes",
  "objectives": [
   "Students will be able to define idempotence and explain why Terraform is idempotent.",
   "Students will be able to explain how an empty plan enables drift detection.",
   "Students will be able to identify common causes of broken idempotence, including `timestamp()`, provisioners and API normalization.",
   "Students will be able to predict the outcome of applying an unchanged configuration twice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of actions that are safe to repeat and ones that are not."
   ],
   [
    12,
    "Teach",
    "Define idempotence, show the no-changes output on the projector, explain refresh and comparison, and describe drift detection with a nightly plan."
   ],
   [
    15,
    "Activity",
    "Run the plan detective activity with printed plan excerpts."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore why perpetual diffs are dangerous and how teams should respond to drift."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "List two actions in daily life that are safe to repeat, such as locking an already locked door, and two that are not, such as paying a bill. What makes the difference?",
  "activity": {
   "title": "Plan detective",
   "materials": "Printed cards with short plan excerpts and matching configuration snippets, whiteboard.",
   "steps": [
    "Prepare five cards, each showing a short configuration snippet and the plan summary from a second run, for example a clean configuration with no changes, a bucket tag set to `timestamp()`, a firewall rule changed in a console, a `local-exec` provisioner, and a `random_pet` resource.",
    "In pairs, students decide for each card whether idempotence holds, and if not, what is causing the change: drift, a non-deterministic value, an untracked script, or nothing.",
    "Each pair proposes a fix for one broken card, such as removing `timestamp()`, adding `ignore_changes`, or investigating who made a manual change.",
    "Review as a class, writing the cause categories on the whiteboard and asking which ones would trigger a real alert in a nightly pipeline."
   ]
  },
  "discussion": [
   "If a nightly plan shows drift, should the team always apply to restore the coded value? When might updating the code be the right answer instead?",
   "Why does a plan that always shows the same harmless change make a team less safe?"
  ],
  "exit": [
   [
    "What does it mean that Terraform is idempotent?",
    "Applying the same configuration again with nothing changed results in no further changes."
   ],
   [
    "A plan proposes changing a setting nobody edited in code. What is the most likely cause?",
    "Drift: the real infrastructure was changed outside Terraform, for example by hand in a console."
   ],
   [
    "Name one thing that can break idempotence.",
    "A non-deterministic value such as `timestamp()` in an argument, a provisioner script, or an API that normalizes values differently from the configuration."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-question flowchart for each card: did the code change, did reality change, does the value change by itself? Let them follow it to classify the card.",
   "Extend: Ask fast finishers to explain the difference between applying to fix drift and running a refresh-only plan, and when each is appropriate."
  ]
 },
 {
  "t": "Terraform's plugin model: one workflow and language (HCL) for many providers",
  "objectives": [
   "Students will be able to describe the division of responsibilities between Terraform core and providers.",
   "Students will be able to explain how Terraform maps a resource type prefix to a provider.",
   "Students will be able to distinguish resources, data sources and provider-defined functions.",
   "Students will be able to explain why `terraform init` must run before plan and after adding a provider."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board, then reveal that Terraform uses the same idea."
   ],
   [
    12,
    "Teach",
    "Draw core and three providers as boxes on the whiteboard with arrows labeled RPC and API. Explain prefix mapping, separate release cycles, resources versus data sources, and what init installs."
   ],
   [
    15,
    "Activity",
    "Run the core or provider sorting game and the prefix mapping drill."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about release cycles and troubleshooting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Your phone runs apps from many different companies. What does the phone's operating system do, and what does each app do? Where is the line?",
  "activity": {
   "title": "Core or provider sorting game",
   "materials": "Printed responsibility cards, two labeled areas on the whiteboard (Core and Provider), projector showing sample resource types.",
   "steps": [
    "Prepare about twelve cards such as parse HCL files, build the dependency graph, call a cloud API to create a VM, authenticate to a Git platform, write state, know which arguments a resource type accepts, run the plan and apply workflow, and return attributes after creation.",
    "Small groups take turns placing cards under Core or Provider and must justify each placement in one sentence.",
    "Next, project a list of resource types such as `azurerm_resource_group`, `github_repository`, `random_pet` and `kubernetes_namespace`. Groups write the provider local name each one maps to.",
    "Close by asking groups which side of the board they would look at for a syntax error versus an access-denied message from an API."
   ]
  },
  "discussion": [
   "Why is it useful that a cloud vendor can release a provider update without waiting for a new Terraform version?",
   "If an apply fails with an error from the cloud's API, which part of the system would you investigate first, and why?"
  ],
  "exit": [
   [
    "Which component translates Terraform requests into cloud API calls?",
    "The provider plugin."
   ],
   [
    "What does `terraform init` do for providers?",
    "It reads `required_providers`, downloads matching provider versions, installs them under `.terraform` and records the versions in the lock file."
   ],
   [
    "Which provider handles a resource of type `kubernetes_namespace`, and how does Terraform know?",
    "The provider with local name `kubernetes`, determined from the resource type's prefix."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of core, providers and APIs that students can annotate during the sorting game.",
   "Extend: Ask fast finishers to explain when a configuration would need a different local name for a provider than its type, and how resource prefixes would then be handled."
  ]
 },
 {
  "t": "Multi-cloud and hybrid-cloud deployments from a single configuration",
  "objectives": [
   "Students will be able to define multi-cloud and hybrid cloud.",
   "Students will be able to compare Terraform with native vendor IaC tools.",
   "Students will be able to explain how cross-provider references create dependencies in one configuration.",
   "Students will be able to identify what Terraform does not provide, such as portable resource definitions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples on the whiteboard of tasks that span more than one service."
   ],
   [
    12,
    "Teach",
    "Define multi-cloud and hybrid cloud, contrast native tools, and project the load balancer and DNS example, tracing the reference that creates the dependency. Stress the portability myth."
   ],
   [
    15,
    "Activity",
    "Run the whiteboard dependency map activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions on credentials, state and splitting configurations."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Think of a task you do that needs two different apps or companies to cooperate, like booking a flight and a hotel. What goes wrong when you coordinate them by hand?",
  "activity": {
   "title": "Whiteboard dependency map",
   "materials": "Whiteboard, sticky notes in three colors (one per platform), markers.",
   "steps": [
    "Describe a small scenario: a network and VM in cloud A, a backup bucket in cloud B, a DNS record at a separate DNS provider, and a monitoring alert that needs the VM's address.",
    "Groups write each resource on a sticky note colored by platform and arrange them on the whiteboard, drawing arrows for every reference such as DNS record uses VM address.",
    "Groups then write the order in which Terraform would create the resources and point out which arrows cross platform boundaries.",
    "Finally, each group lists what would be needed for credentials and state, and the class compares answers."
   ]
  },
  "discussion": [
   "Why might an organization choose to use more than one cloud, and what new risks does that bring?",
   "If Terraform cannot make resources portable, what is the real value of using it across clouds?"
  ],
  "exit": [
   [
    "What is the difference between multi-cloud and hybrid cloud?",
    "Multi-cloud uses two or more public clouds; hybrid combines public cloud with private or on-premises infrastructure."
   ],
   [
    "What advantage does Terraform have over a native tool such as CloudFormation?",
    "It manages many providers, including multiple clouds and on-premises systems, with one language and workflow."
   ],
   [
    "Does changing the provider name move a resource to another cloud?",
    "No. Resource types and arguments are provider-specific and must be rewritten."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partly completed dependency map with arrows drawn, and ask them only to number the creation order and mark cross-platform arrows.",
   "Extend: Ask fast finishers to sketch how they would split the scenario into two configurations with separate state, and how one would read the other's outputs."
  ]
 },
 {
  "t": "Service-agnostic workflows: managing SaaS, DNS, Git, Kubernetes and monitoring tools with providers",
  "objectives": [
   "Students will be able to explain what service-agnostic means for Terraform.",
   "Students will be able to give examples of non-cloud services that Terraform can manage through providers.",
   "Students will be able to describe the purpose of utility providers such as `random`, `local`, `tls` and `http`.",
   "Students will be able to explain why each object should have a single managing tool."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the services students name on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Explain service-agnostic, walk through the GitHub example on the projector, introduce utility providers, and raise the secrets-in-state and single-owner points."
   ],
   [
    15,
    "Activity",
    "Run the codify-a-launch planning activity."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions on security payoff and tool ownership."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "List every service a small software team might use besides servers: places to store code, send alerts, manage website addresses and so on. Which of those settings would you want a record of?",
  "activity": {
   "title": "Codify a service launch",
   "materials": "Whiteboard, sticky notes, printed one-page scenario describing a new microservice launch.",
   "steps": [
    "Give each group the scenario: a new service needs a code repository with branch protection, a Kubernetes namespace, a DNS hostname, a monitoring alert and a generated database password.",
    "Groups write one sticky note per item, naming the kind of provider that would manage it, for example a Git provider, the Kubernetes provider, a DNS provider, a monitoring provider and the `random` provider.",
    "Groups draw arrows for references between items, such as branch protection needing the repository ID, and mark any item that would place a secret in state.",
    "Each group presents one risk they spotted, such as secrets in state or another tool already owning the namespace, and how they would handle it."
   ]
  },
  "discussion": [
   "Why might codifying branch protection or access groups matter more to a security team than codifying servers?",
   "How would you decide whether Terraform or a GitOps controller should own objects inside a Kubernetes cluster?"
  ],
  "exit": [
   [
    "What makes it possible for Terraform to manage a non-cloud service?",
    "The service has an API and a Terraform provider exists for it."
   ],
   [
    "What does the `hashicorp/random` provider do?",
    "It generates values such as names, IDs or passwords and stores them in state so they stay stable."
   ],
   [
    "Name two non-cloud things Terraform can manage.",
    "For example Git repositories and branch protection, DNS records, Kubernetes namespaces, or monitoring alerts."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching sheet pairing example resource types, such as `github_repository` or `kubernetes_namespace`, with the service they manage before the group activity.",
   "Extend: Ask fast finishers to explain how they would protect a password generated by `random_password` that ends up in state."
  ]
 },
 {
  "t": "Terraform vs configuration management tools: provisioning infrastructure vs configuring software inside servers",
  "objectives": [
   "Students will be able to distinguish provisioning tools from configuration management tools.",
   "Students will be able to describe common hand-off patterns between Terraform and configuration management, such as `user_data` and generated inventories.",
   "Students will be able to explain why provisioners are a last resort and what happens when a create-time provisioner fails.",
   "Students will be able to choose an appropriate tool for a given infrastructure or software task."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into building and furnishing on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Contrast Terraform's API and state model with configuration management's host convergence. Show the `user_data` snippet, explain provisioners, tainting on failure, and the image-based alternative."
   ],
   [
    15,
    "Activity",
    "Run the right tool for the job card sort and pair debate."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about hand-off patterns and SSH access."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "When you move into a new apartment, which jobs belong to the people who built it, and which belong to you or a furnishing service? What happens if the builders try to do your job?",
  "activity": {
   "title": "Right tool for the job",
   "materials": "Printed task cards, three labeled columns on the whiteboard (Terraform, Configuration management, Provisioner as last resort), sticky notes.",
   "steps": [
    "Prepare about twelve task cards such as create a VPC and subnets, install a web server package, rotate a config file weekly, create a DNS record, add Linux user accounts, register an instance with a load balancer, run a one-time database seed script, and enforce file permissions.",
    "Pairs place each card in a column and write a one-line justification on a sticky note.",
    "Pick three borderline cards and have pairs debate the best option, considering cloud-init, golden images and generated Ansible inventories.",
    "Close by revealing a recommended sort and highlighting which tasks need ongoing convergence inside the host."
   ]
  },
  "discussion": [
   "Why might a team prefer baking software into an image over running configuration management after launch?",
   "What security concerns arise when a pipeline needs SSH access to every new server for provisioners?"
  ],
  "exit": [
   [
    "Which kind of tool installs packages and manages files inside running servers over time?",
    "A configuration management tool such as Ansible, Chef, Puppet or Salt."
   ],
   [
    "What happens if a create-time provisioner fails?",
    "The resource is marked tainted and is replaced on the next apply."
   ],
   [
    "Name one preferred alternative to provisioners.",
    "Passing cloud-init through `user_data`, launching from a prebuilt golden image, or using a configuration management tool."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a simple rule card: outside the server equals Terraform, inside the server over time equals configuration management, and let them use it during the sort.",
   "Extend: Ask fast finishers to describe how Terraform outputs could generate an Ansible inventory and what would happen to that inventory when instances are replaced."
  ]
 },
 {
  "t": "Immutable infrastructure: replace rather than patch in place",
  "objectives": [
   "Students will be able to contrast mutable and immutable infrastructure and explain the snowflake server problem.",
   "Students will be able to interpret the plan symbols `-/+`, `+/-` and `~` in the context of replacement.",
   "Students will be able to explain Terraform's default replacement order and how `create_before_destroy` changes it.",
   "Students will be able to identify the trade-offs of immutable infrastructure, including where data must live."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record the pros and cons students raise in two columns."
   ],
   [
    12,
    "Teach",
    "Contrast mutable and immutable models, show the golden image workflow, project plan symbols and the `create_before_destroy` snippet, and mention `-replace`."
   ],
   [
    15,
    "Activity",
    "Run the replacement timeline whiteboard exercise."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about data placement and pipeline speed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Your laptop has been running for three years with dozens of updates and tweaks. Would you rather keep patching it, or wipe it and reinstall from a known setup? What would you lose and gain?",
  "activity": {
   "title": "Replacement timeline",
   "materials": "Whiteboard, sticky notes in two colors for old and new servers, a printed plan excerpt showing `-/+` and `+/-`.",
   "steps": [
    "Draw a timeline on the whiteboard with a load balancer at one end. Students place an old-server sticky note in service.",
    "Groups act out a default replacement: remove the old note, then add the new note, and mark the gap in service on the timeline.",
    "Groups repeat with `create_before_destroy`: add the new note first, then remove the old one, and mark that no gap occurs. They note the moment both exist and what unique arguments might conflict.",
    "Groups read the printed plan excerpt and label each resource's symbol with the order it represents and whether data on the instance would survive."
   ]
  },
  "discussion": [
   "Where should a web application's uploaded files and database live if the servers are replaced on every release?",
   "What happens to an immutable approach if building and testing a new image takes two days?"
  ],
  "exit": [
   [
    "What does `-/+` mean in a Terraform plan?",
    "The resource will be replaced, destroying the old object first and then creating the new one."
   ],
   [
    "How do you make Terraform create the replacement before destroying the original?",
    "Set `lifecycle { create_before_destroy = true }` on the resource."
   ],
   [
    "Name one benefit and one cost of immutable infrastructure.",
    "Benefit: consistency, easy rollback or less drift. Cost: data must live outside instances and the pipeline must build images quickly."
   ]
  ],
  "differentiation": [
   "Support: Provide a symbol legend card for `+`, `-`, `~`, `-/+` and `+/-` with a one-line meaning for each, to use during the activity.",
   "Extend: Ask fast finishers to explain why a fixed resource name can make `create_before_destroy` fail and how name prefixes solve it."
  ]
 },
 {
  "t": "Installing Terraform and pinning its version with `required_version`",
  "objectives": [
   "Students will be able to describe how Terraform is installed as a single binary and verify the installation.",
   "Students will be able to write a `required_version` constraint in the `terraform` block.",
   "Students will be able to explain why the `terraform` block accepts only literal values.",
   "Students will be able to distinguish `required_version` from provider version constraints."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect stories of software that broke because of a version mismatch."
   ],
   [
    10,
    "Teach",
    "Explain the single binary, PATH, package managers, and `terraform version`. Project the `required_version` example and explain what happens on a mismatch and why literals are required."
   ],
   [
    18,
    "Activity",
    "Run the version gatekeeper exercise with constraint cards."
   ],
   [
    7,
    "Discuss",
    "Use the discussion questions on how tightly to pin and coordinating upgrades."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Have you ever opened a file or game save that an older version of an app could not read? What message did you get, and was it helpful?",
  "activity": {
   "title": "Version gatekeeper",
   "materials": "Printed constraint cards, printed binary version cards, whiteboard. Optional: student laptops with a browser to read Terraform's version constraint documentation.",
   "steps": [
    "Prepare constraint cards such as `>= 1.12.0, < 2.0.0`, `~> 1.12`, `= 1.12.1` and `>= 1.9`, plus binary cards such as 1.9.8, 1.12.0, 1.13.2 and 2.0.0.",
    "Pairs take a constraint card and decide for each binary card whether Terraform would run or stop, recording results in a grid on the whiteboard.",
    "Add a twist round with a root constraint and a child module constraint, and ask pairs to find which binaries satisfy both.",
    "Finish by showing a card with `required_version = var.tf_version` and asking pairs to explain why it fails."
   ]
  },
  "discussion": [
   "What are the risks of pinning Terraform to one exact version across a large team?",
   "How should a team coordinate upgrading the Terraform version in HCP Terraform workspaces and in code?"
  ],
  "exit": [
   [
    "In which block is `required_version` set?",
    "The top-level `terraform` block."
   ],
   [
    "What happens if the running Terraform version does not satisfy `required_version`?",
    "Commands such as init, plan and apply stop with an error explaining the version is unsupported."
   ],
   [
    "Does `required_version` control provider versions?",
    "No. Provider versions are constrained in `required_providers`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a number line from 1.9 to 2.0 on which they shade the range each constraint allows before checking binary cards.",
   "Extend: Ask fast finishers to write a constraint that allows 1.12 and later 1.x releases but excludes a hypothetical broken 1.13.0, and explain their choice of operators."
  ]
 },
 {
  "t": "The `required_providers` block: `source` addresses (hostname/namespace/type) and `version` constraints",
  "objectives": [
   "Students will be able to identify the hostname, namespace and type in a provider source address and state the default hostname.",
   "Students will be able to write a `required_providers` block with source and version for multiple providers.",
   "Students will be able to explain how version constraints from multiple modules are combined and recorded in the lock file.",
   "Students will be able to explain the risks of omitting a provider declaration or version constraint."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on how a package or app store knows which version to install."
   ],
   [
    12,
    "Teach",
    "Project the `required_providers` example, break down `HOSTNAME/NAMESPACE/TYPE`, explain local names, combined constraints and the lock file, and show what happens when providers are undeclared."
   ],
   [
    15,
    "Activity",
    "Run the source address and constraint puzzle in pairs."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions on upper bounds and private registries."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "When you install an app, how does your phone know where to download it from and which version to get? What could go wrong if it always grabbed the newest version without asking?",
  "activity": {
   "title": "Source address and constraint puzzle",
   "materials": "Printed puzzle sheets, whiteboard, projector. Optional: student laptops with a browser to look up providers in the public registry.",
   "steps": [
    "Give pairs a sheet listing short source addresses such as `hashicorp/aws`, `integrations/github` and `DataDog/datadog`, and one private registry address. Pairs expand each into hostname, namespace and type.",
    "Next, pairs write a complete `required_providers` block for a configuration that uses three of those providers, choosing a sensible version constraint for a root module.",
    "Present a scenario with a root module constraint and two child module constraints for the same provider, plus a list of available versions. Pairs determine which version init would select, or whether init fails.",
    "Review answers on the projector and discuss what would be written to `.terraform.lock.hcl`."
   ]
  },
  "discussion": [
   "Why might a reusable module avoid an upper bound on provider versions while a root module sets one?",
   "What problems does a private registry or provider mirror solve for an organization?"
  ],
  "exit": [
   [
    "Expand `source = \"hashicorp/google\"` into its full address.",
    "`registry.terraform.io/hashicorp/google`."
   ],
   [
    "Where are provider version constraints declared?",
    "In the `version` argument of each entry in `required_providers`, inside the `terraform` block."
   ],
   [
    "What records the provider version Terraform actually selected?",
    "The dependency lock file, `.terraform.lock.hcl`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a color-coded template that highlights hostname, namespace and type in different colors to fill in for each address.",
   "Extend: Ask fast finishers to explain how two providers with the same type from different namespaces could be used in one module, using different local names and the `provider` meta-argument."
  ]
 },
 {
  "t": "Version constraint operators: `=`, `!=`, `>=`, `<=`, and the pessimistic `~>`",
  "objectives": [
   "Students will be able to state the meaning of each version constraint operator: `=`, `!=`, `>`, `>=`, `<`, `<=` and `~>`.",
   "Students will be able to calculate the lower and upper bounds of any pessimistic `~>` constraint.",
   "Students will be able to write a constraint that meets a stated upgrade policy, including excluding a single bad release.",
   "Students will be able to explain why reusable modules use minimum versions while root modules use `~>` or ranges."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a list of version numbers (1.2.0, 1.2.9, 1.3.0, 1.9.4, 2.0.0, 2.0.0-beta1). Ask students which ones they would trust to install on a production system and why. Collect a few answers to introduce MAJOR.MINOR.PATCH."
   ],
   [
    12,
    "Teach",
    "Walk through each operator on the whiteboard. Spend most of the time on `~>`: show the drop-and-increment rule on three examples, then contrast `~> 1.2` with `~> 1.2.0`. Explain the pre-release rule and the module versus root module guidance."
   ],
   [
    15,
    "Activity",
    "Run the constraint sorting game in pairs (see activity). Circulate and ask pairs to say the upper bound out loud for each constraint before they sort."
   ],
   [
    6,
    "Discuss",
    "Bring the class together and work through the cards pairs disagreed on. Use the discussion questions to connect constraints to the lock file and team policy."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually on paper or a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "If a tool you depend on releases version 6.0.0 tonight, should your pipeline pick it up automatically tomorrow morning? What would you want to happen instead?",
  "activity": {
   "title": "Constraint sorting game",
   "materials": "Printed cards: eight constraint cards (for example `~> 1.2`, `~> 1.2.0`, `>= 1.2, < 2.0`, `= 1.4.1`, `>= 1.3, != 1.5.0`, `~> 1.4`, `~> 1.4.0`, `>= 2.0`) and twelve version cards (such as 1.1.9, 1.2.0, 1.2.7, 1.3.0, 1.4.1, 1.5.0, 1.9.9, 2.0.0, 2.0.0-beta1, 2.3.0). Whiteboard for the scoreboard.",
   "steps": [
    "Give each pair a full set of cards. Pairs place one constraint card at a time at the top of the desk.",
    "For each constraint, pairs first write its lower and upper bound on a sticky note, then sort every version card into accepted or rejected.",
    "After all eight constraints, pairs write one new constraint of their own that accepts exactly three of the version cards and swap it with a neighbor pair to solve.",
    "Reveal the answer key on the projector. Pairs score one point per correctly sorted version and note any card they missed, especially the pre-release card."
   ]
  },
  "discussion": [
   "If the lock file already records an exact version, why bother writing a constraint at all?",
   "What could go wrong if every shared module in your organization set a tight `~>` upper bound on the same provider?",
   "When might a team choose an exact `=` pin despite the lock file?"
  ],
  "exit": [
   [
    "What versions does `~> 4.6` allow?",
    "Any version >= 4.6.0 and < 5.0.0."
   ],
   [
    "Write a constraint for: version 3 only, 3.2 or newer, but skip 3.4.0.",
    "`\"~> 3.2, != 3.4.0\"` or `\">= 3.2, < 4.0, != 3.4.0\"`."
   ],
   [
    "Which kind of module should normally use only a minimum version like `>= 5.0`, and why?",
    "A reusable child module, so it can combine with other modules' constraints; the root module sets the tighter limit."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a printed number line from 1.0 to 3.0 and have them shade the allowed range for each constraint before deciding, and practice the drop-and-increment rule on just two examples first.",
   "Extend: ask fast finishers to write constraints from three different modules for the same provider and work out whether any version satisfies all of them, then design a set that would make `terraform init` fail."
  ]
 },
 {
  "t": "The dependency lock file `.terraform.lock.hcl`: what it records and why it is committed",
  "objectives": [
   "Students will be able to describe what `.terraform.lock.hcl` records for each provider: source address, version, constraints and hashes.",
   "Students will be able to explain why the lock file is committed while the `.terraform/` directory is not.",
   "Students will be able to choose the correct command to upgrade providers or add hashes for another platform.",
   "Students will be able to distinguish the provider lock file from module version constraints."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let two or three students describe a time something worked on one computer but not another."
   ],
   [
    12,
    "Teach",
    "Project the sample lock file entry and annotate each line. Explain constraints versus locked version, the hash check, `init -upgrade`, platform-specific hashes and `terraform providers lock`. Finish with the commit versus ignore split."
   ],
   [
    15,
    "Activity",
    "Groups complete the repository review exercise (see activity) and fill in their decisions on a worksheet."
   ],
   [
    6,
    "Discuss",
    "Groups share their decisions for the trickiest files and scenarios. Use the discussion questions to probe supply-chain and review practices."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Have you ever had code or a game mod that worked on your computer but not a friend's, even though you both had the same files? What was different?",
  "activity": {
   "title": "Repository review: what gets committed",
   "materials": "Projector or printed handout showing a sample repository listing (`main.tf`, `variables.tf`, `.terraform.lock.hcl`, `.terraform/providers/...`, `.terraform/modules/...`, `terraform.tfstate`, `.gitignore`), plus four short scenario cards. Sticky notes in two colors.",
   "steps": [
    "In groups of three, students mark each file in the listing with a green sticky note (commit) or a red one (ignore), writing a one-line reason on each.",
    "Groups then draw a scenario card, such as a checksum failure on a Linux pipeline, a teammate getting a newer provider, or a pull request that changes a locked version, and write the command or action they would take.",
    "Each group writes a three-line `.gitignore` that matches their decisions.",
    "The teacher reveals the answer key and groups correct any notes, paying attention to the difference between the lock file and the `.terraform/` directory."
   ]
  },
  "discussion": [
   "Why might a reviewer want to read the provider changelog when a pull request changes only the lock file?",
   "What risks does the checksum check protect against, and what risks does it not cover?",
   "Why do you think HashiCorp chose not to lock module versions in the same file?"
  ],
  "exit": [
   [
    "Name three things the lock file records for each provider.",
    "Any three of: source address, exact version, constraints in effect, package hashes."
   ],
   [
    "Which should be committed to Git: `.terraform.lock.hcl` or `.terraform/`?",
    "`.terraform.lock.hcl` is committed; `.terraform/` is ignored."
   ],
   [
    "A CI job on Linux fails a hash check because the lock file was generated on a Mac. Which command helps?",
    "`terraform providers lock` with `-platform` options for each needed platform, such as `-platform=linux_amd64`."
   ]
  ],
  "differentiation": [
   "Support: provide a two-column comparison chart (lock file versus `.terraform/` directory) with blanks for what it holds, who creates it, and whether it is committed, and let students fill it in during the teach segment.",
   "Extend: ask students to explain, in writing, how the lock file interacts with a constraint change from `~> 4.0` to `~> 5.0`, including the exact error behavior and the commands needed to complete the upgrade safely."
  ]
 },
 {
  "t": "How providers work: plugins that call APIs, downloaded by `terraform init` from the Terraform Registry",
  "objectives": [
   "Students will be able to explain the division of work between Terraform core and provider plugins.",
   "Students will be able to describe what `terraform init` does to install providers, including where they come from and where they are stored.",
   "Students will be able to interpret `terraform init` output, identifying the constraint, installed version and signer.",
   "Students will be able to identify when init must be rerun after configuration changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board under two headings: knows what to do, knows how to do it."
   ],
   [
    12,
    "Teach",
    "Draw Terraform core in the center with arrows to three providers and then to three APIs. Explain RPC, schemas, computed attributes and independent versioning. Project the init output and annotate each line."
   ],
   [
    15,
    "Activity",
    "Run the core-versus-provider role-play (see activity)."
   ],
   [
    6,
    "Discuss",
    "Debrief the role-play using the discussion questions, linking each role to a real component."
   ],
   [
    7,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "If you hire a general contractor to build a house, do they personally install the wiring? Who does, and how does the contractor coordinate them?",
  "activity": {
   "title": "Core and providers role-play",
   "materials": "Printed role cards (Terraform core, AWS provider, Random provider, DNS provider, Cloud API, Registry), a short printed configuration with three resources that reference each other, sticky notes for messages, whiteboard.",
   "steps": [
    "Assign roles in groups of six. The Terraform core student reads the configuration and writes request sticky notes such as plan this resource or create this object.",
    "Before any requests, core must visit the Registry student to obtain each provider card, acting out `terraform init`; the Registry student records the version handed out on a mock lock file.",
    "Core passes requests in dependency order to the right provider student, who translates them into an API request note for the Cloud API student, who returns an ID that core records on a mock state sheet.",
    "Run the scenario a second time where a new provider is added mid-way without visiting the Registry, and let the group observe that the request has nowhere to go."
   ]
  },
  "discussion": [
   "What are the benefits and risks of providers being released independently from Terraform?",
   "Why might a company want a plugin cache or a private mirror instead of downloading from the public registry every time?",
   "How does the provider schema help you catch mistakes before anything reaches the cloud?"
  ],
  "exit": [
   [
    "Which component makes the actual API calls to a cloud platform?",
    "The provider plugin, on behalf of Terraform core."
   ],
   [
    "Which command installs providers, and where are they stored by default?",
    "`terraform init`, into `.terraform/providers` in the working directory."
   ],
   [
    "Give one change that requires rerunning `terraform init`.",
    "Adding a new provider, changing a provider's source or version constraint, adding a module, or changing the backend."
   ]
  ],
  "differentiation": [
   "Support: give students a labeled diagram with blanks for core, provider, API, registry and `.terraform/providers`, and have them fill it in while following the init output line by line.",
   "Extend: ask students to research and explain in writing how a plugin cache directory and a filesystem mirror differ, and when an isolated network would need each."
  ]
 },
 {
  "t": "Provider tiers in the registry: official, partner and community",
  "objectives": [
   "Students will be able to identify the official, partner and community provider tiers and who maintains each.",
   "Students will be able to recognize an official provider from its `hashicorp` namespace.",
   "Students will be able to explain that tiers affect trust and support, not declaration or installation.",
   "Students will be able to recommend a provider approval approach based on tier and maintenance signals."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about phone chargers and list student criteria for trusting an accessory on the board."
   ],
   [
    10,
    "Teach",
    "Present the three tiers and the archived label with a simple table on the whiteboard. Emphasize namespaces, the Technology Partner Program, and that installation is identical across tiers."
   ],
   [
    18,
    "Activity",
    "Groups run the provider approval board exercise (see activity)."
   ],
   [
    6,
    "Discuss",
    "Each group presents one decision and its reasoning. Use the discussion questions to connect to supply-chain risk."
   ],
   [
    6,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You need a replacement phone charger. You can buy one from the phone maker, from a certified accessory brand, or from an unknown online seller. How do you decide, and what are you really worried about?",
  "activity": {
   "title": "Provider approval board",
   "materials": "Printed provider profile cards the teacher writes in advance, each showing a fictional source address, tier badge, last release age, open issue count, license and a short description (for example one official, two partner, three community, one archived). A printed approval form per group.",
   "steps": [
    "In groups of four, students act as a provider approval board for a fictional company. Each group receives the full set of profile cards.",
    "For each card, the group identifies the tier and who maintains it, then decides: approve for production, approve for non-production only, or reject, writing a one-sentence reason on the form.",
    "Groups must name who they would contact for support for each approved provider.",
    "Groups draft a two-sentence provider policy for the company, such as rules for community providers, and post it on the whiteboard for comparison."
   ]
  },
  "discussion": [
   "Is a partner badge alone enough to approve a provider for production? What else would you check?",
   "Why might a company host approved providers in a private registry or mirror?",
   "What should a team do if a provider it depends on becomes archived?"
  ],
  "exit": [
   [
    "Who maintains official providers, and what namespace do they use?",
    "HashiCorp, under the `hashicorp` namespace."
   ],
   [
    "Who maintains a partner provider?",
    "The third-party technology company that owns the API, as part of HashiCorp's Technology Partner Program."
   ],
   [
    "Does installing a community provider require a different command than an official one?",
    "No. All tiers are declared in `required_providers` and installed with `terraform init`."
   ]
  ],
  "differentiation": [
   "Support: give students a three-row tier table with the maintainer and namespace columns partly filled in, and let them complete it before starting the approval activity.",
   "Extend: ask students to write a provider risk checklist of at least six signals, such as release signing, issue response time and license, and apply it to two of the profile cards with a scored result."
  ]
 },
 {
  "t": "Provider configuration blocks, multiple configurations with `alias`, and the `provider` meta-argument",
  "objectives": [
   "Students will be able to distinguish a `required_providers` entry from a `provider` configuration block.",
   "Students will be able to write a default and an aliased provider configuration for the same provider.",
   "Students will be able to select an aliased configuration on a resource with the `provider` meta-argument and pass one to a module with `providers`.",
   "Students will be able to explain safe alternatives to hard-coding credentials in provider blocks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch a main warehouse and a second warehouse on the board."
   ],
   [
    12,
    "Teach",
    "Project the two provider blocks and the replica bucket. Explain default versus aliased configurations, the bare reference syntax, meta-arguments, the `providers` map for modules and `configuration_aliases`. Close with credential practices."
   ],
   [
    15,
    "Activity",
    "Students do the fix-the-config exercise in pairs (see activity)."
   ],
   [
    7,
    "Discuss",
    "Review answers to the broken snippets on the projector, then use the discussion questions."
   ],
   [
    6,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A delivery company has a main warehouse and a second warehouse in another region. How should an order indicate that it must ship from the second warehouse instead of the main one?",
  "activity": {
   "title": "Fix the provider configuration",
   "materials": "Printed handout or projected slides with five short HCL snippets, each containing one mistake: a quoted `provider = \"aws.west\"`, a module using `provider =` instead of `providers =`, a duplicate unaliased block, an access key hard-coded in a provider block, and a resource missing its `provider` argument for a required region. Student laptops with a browser or plain text editor are optional.",
   "steps": [
    "Pairs read each snippet and circle the line that is wrong.",
    "For each snippet, pairs rewrite the corrected HCL on the handout and write one sentence explaining why the original fails or is unsafe.",
    "Pairs then write their own small configuration from scratch: a default provider in one region, an aliased provider in another, one resource using each, and one module receiving the aliased configuration.",
    "Pairs swap their configurations with a neighbor pair to check syntax and reasoning."
   ]
  },
  "discussion": [
   "Why do you think HashiCorp recommends keeping provider blocks out of reusable child modules?",
   "What problems could arise if a provider's region depended on an attribute of a resource that has not been created yet?",
   "Which real situations at a company would justify more than two configurations of the same provider?"
  ],
  "exit": [
   [
    "Write a second `aws` provider block for `eu-central-1` with an alias.",
    "A `provider \"aws\"` block containing `alias = \"frankfurt\"` and `region = \"eu-central-1\"`, each on its own line (any alias name is fine)."
   ],
   [
    "Which configuration does a resource use if it has no `provider` argument?",
    "The default, unaliased configuration of its provider."
   ],
   [
    "How do you pass the aliased configuration `aws.west` to a module as its default `aws` provider?",
    "`providers = { aws = aws.west }` on the module block."
   ]
  ],
  "differentiation": [
   "Support: give students a fill-in-the-blank template showing where `alias`, `provider` and `providers` go, and pair them with a partner who reads each snippet aloud before fixing it.",
   "Extend: ask students to design a module that deploys a primary bucket in one region and a replica in another, using `configuration_aliases`, and write the calling module block that maps both configurations."
  ]
 },
 {
  "t": "Using several different providers in one configuration",
  "objectives": [
   "Students will be able to write a configuration that declares and uses several different providers.",
   "Students will be able to explain how references create implicit dependencies across providers in one graph.",
   "Students will be able to identify which provider handles a resource from its type prefix.",
   "Students will be able to describe the effects of a partial apply and the credential needs of multi-provider configurations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of multi-company projects students know, such as a move or an event."
   ],
   [
    10,
    "Teach",
    "Project the Docker, local and random example. Trace each reference with arrows, explain type prefixes, unconfigured providers, partial applies and `terraform providers`."
   ],
   [
    18,
    "Activity",
    "Students build a dependency graph from cards (see activity)."
   ],
   [
    6,
    "Discuss",
    "Compare graphs across groups and use the discussion questions."
   ],
   [
    6,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "When you plan an event with several vendors, such as a venue, a caterer and a photographer, how do you make sure they do things in the right order and use the same details?",
  "activity": {
   "title": "Cross-provider dependency graph",
   "materials": "Printed resource cards, each showing one short resource block from a fictional configuration that uses four providers (for example `random_password`, a cloud database, a secrets manager secret, a DNS record and a monitoring check), plus arrows cut from paper or drawn on the whiteboard. Sticky notes.",
   "steps": [
    "In groups of three, students lay out the resource cards and underline every reference to another resource.",
    "Groups draw arrows from each resource to what it depends on, label each card with the provider chosen by its type prefix, and number the creation order.",
    "The teacher announces a failure: one provider's API times out during apply. Groups mark which cards would be in state and what the next apply would do.",
    "Groups finish by writing the `required_providers` block their configuration needs, including source addresses."
   ]
  },
  "discussion": [
   "What are the advantages of managing several platforms in one configuration, and when would you split them up instead?",
   "How does the credential situation change when one pipeline manages four providers?",
   "Why does Terraform record partial progress in state rather than rolling back?"
  ],
  "exit": [
   [
    "How does Terraform choose the provider for a resource of type `random_pet`?",
    "From the type prefix `random`, which maps to the provider with that local name."
   ],
   [
    "Resource B references an attribute of resource A from a different provider. Which is created first?",
    "Resource A, because the reference creates an implicit dependency."
   ],
   [
    "Name one provider that usually needs no `provider` block.",
    "For example `random`, `local`, `null` or `tls`."
   ]
  ],
  "differentiation": [
   "Support: give students a partly completed graph with the first two arrows drawn, and a reference sheet of the four providers' type prefixes.",
   "Extend: ask students to propose how they would split a large configuration with eight providers into separate root modules, and how values would flow between them using outputs and data sources."
  ]
 },
 {
  "t": "What state is for: mapping configuration to real objects, tracking metadata and dependencies, speeding up plans",
  "objectives": [
   "Students will be able to identify the documented purposes of Terraform state: mapping, metadata, performance and team syncing.",
   "Students will be able to explain why the mapping between resource addresses and remote IDs cannot be replaced by scanning the cloud.",
   "Students will be able to choose the correct command or block for reading, renaming, removing or importing state entries.",
   "Students will be able to describe the trade-off of planning with `-refresh=false`."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Use the coat check warm-up question and let students explain how a coat check works."
   ],
   [
    12,
    "Teach",
    "Draw two columns on the whiteboard: resource addresses and cloud IDs, connected by lines labeled state. Walk through each purpose with an example, then list the safe state commands and blocks."
   ],
   [
    15,
    "Activity",
    "Groups play the lost state simulation (see activity)."
   ],
   [
    7,
    "Discuss",
    "Debrief what went wrong in each round and use the discussion questions."
   ],
   [
    6,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "At a coat check, there are fifty black coats on the rack. How does the attendant give you the right one, and what happens if you lose your ticket?",
  "activity": {
   "title": "Lost state simulation",
   "materials": "Printed cards: ten cloud object cards with only IDs and a few attributes (some created by Terraform, some by hand), a printed configuration listing six resource addresses, and a printed state sheet mapping those addresses to IDs with dependency notes. Scissors or a marker to remove a line.",
   "steps": [
    "In groups of four, students first use the state sheet to match each configuration address to a cloud card and confirm a plan of no changes.",
    "Round two: the teacher takes away the state sheet. Groups must decide which cloud cards belong to the configuration using only names and attributes, and note where they are unsure or wrong.",
    "Round three: the state sheet returns, but two resource blocks are removed from the configuration. Groups use the dependency notes to decide the order of destruction.",
    "Groups write the command or block they would use for four tasks: list addresses, rename an address, stop managing an object, adopt an existing object."
   ]
  },
  "discussion": [
   "Why are tags or names not a reliable replacement for state?",
   "When might `-refresh=false` be acceptable, and when would it be dangerous?",
   "Why do teams move to remote backends with locking early in a project?"
  ],
  "exit": [
   [
    "What is the primary purpose of Terraform state?",
    "Mapping resources in configuration to real-world objects."
   ],
   [
    "Name two other purposes of state.",
    "Any two of: tracking metadata such as dependencies, performance through cached attributes, syncing state across a team."
   ],
   [
    "Which tool would you use to rename a resource address after refactoring?",
    "A `moved` block or `terraform state mv`."
   ]
  ],
  "differentiation": [
   "Support: give students a four-box graphic organizer, one box per purpose of state, with an example already filled in for mapping, and let them complete the other three during the teach segment.",
   "Extend: ask students to write a short runbook for recovering from deleted local state, comparing restoring a backup, restoring a remote version and re-importing objects, with risks of each."
  ]
 },
 {
  "t": "State contents: resource attributes, including sensitive values, in plain JSON",
  "objectives": [
   "Students will be able to describe the main parts of a state file, including serial, lineage, outputs and resources.",
   "Students will be able to explain why sensitive values are stored in plaintext in state and what `sensitive = true` does and does not do.",
   "Students will be able to recommend controls for protecting state, such as encrypted remote backends and access restrictions.",
   "Students will be able to identify ephemeral values and write-only arguments as ways to keep secrets out of state."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a sticky note over a diary line and take a few answers."
   ],
   [
    12,
    "Teach",
    "Project the sample state JSON and annotate each field. Demonstrate the difference between redaction in output and storage in state. Cover remote backends, `.gitignore`, plan files, ephemeral values and write-only arguments, and which CLI commands reveal values."
   ],
   [
    15,
    "Activity",
    "Groups run the state audit exercise (see activity)."
   ],
   [
    7,
    "Discuss",
    "Groups report their top risks and fixes; use the discussion questions."
   ],
   [
    6,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you put a sticky note over one line of your diary before showing a page to a friend, is that line secret? What would actually keep it secret?",
  "activity": {
   "title": "State security audit",
   "materials": "A printed, fictional state file excerpt (teacher-made, with obviously fake placeholder secrets) showing serial, lineage, an output marked sensitive, a `random_password` result and a `tls_private_key`, plus a printed description of a fictional team's practices (state in a shared folder, plan files saved in CI artifacts, everyone with read access). Highlighters and a worksheet.",
   "steps": [
    "In groups of three, students highlight every value in the excerpt that would be a secret and label each field (serial, lineage, outputs, resources).",
    "Groups read the team practices sheet and list every risk they find, ranking the top three.",
    "For each risk, groups write a specific fix, such as an encrypted remote backend, access restriction, `.gitignore` entries, protecting plan files, or using ephemeral values or write-only arguments.",
    "Groups write a two-sentence answer to an auditor who asks whether `sensitive = true` protects the database password."
   ]
  },
  "discussion": [
   "Why does Terraform need to store secret values in state at all?",
   "Who in your fictional organization should be allowed to read state, and why?",
   "What is lost or gained by moving secret generation out of Terraform and into a secrets manager?"
  ],
  "exit": [
   [
    "Does `sensitive = true` remove a value from state?",
    "No. It only hides the value in CLI and plan output; state still contains it in plaintext."
   ],
   [
    "Give two controls that protect secrets in state.",
    "Any two of: encrypted remote backend, restricted read access, not committing state to Git, versioning, protecting plan files."
   ],
   [
    "Which features keep a secret from being written to state at all?",
    "Ephemeral values (variables or resources) and write-only arguments."
   ]
  ],
  "differentiation": [
   "Support: provide a labeled diagram of the state JSON structure and a short glossary card for serial, lineage and sensitive, and let students work with a partner during the audit.",
   "Extend: ask students to compare which commands reveal sensitive values (`terraform output -json`, `terraform output -raw`, `terraform show -json`) and which redact them, and write guidance for a CI pipeline that needs one secret output."
  ]
 },
 {
  "t": "The Write → Plan → Apply workflow for individuals and teams",
  "objectives": [
   "Students will be able to state the three steps of the core workflow in order and the purpose of each.",
   "Students will be able to contrast the individual and team versions of the workflow, including where plans and applies run.",
   "Students will be able to explain speculative plans and saved plans and when each is used.",
   "Students will be able to identify practices that make team applies safe, such as locking, centralized credentials and plan review."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the renovation warm-up question and list the steps students suggest on the board."
   ],
   [
    10,
    "Teach",
    "Map Write, Plan and Apply onto the renovation steps. Walk through the individual loop, then the team flow on the projector, explaining speculative plans, saved plans, `-auto-approve` and HCP Terraform VCS-driven runs."
   ],
   [
    18,
    "Activity",
    "Run the pull request role-play (see activity)."
   ],
   [
    6,
    "Discuss",
    "Debrief what the reviewers caught and use the discussion questions."
   ],
   [
    6,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you hired someone to renovate your kitchen, what would you want to see and sign before they started knocking down walls?",
  "activity": {
   "title": "Pull request review role-play",
   "materials": "Printed packets for each group: a short code diff (for example, adding a tag and changing a variable default), a matching plan excerpt that shows one hidden replacement of a database, and role cards (author, two reviewers, pipeline). Whiteboard for a shared workflow diagram.",
   "steps": [
    "In groups of four, the author presents the code diff and explains the intended change.",
    "The pipeline student reveals the speculative plan excerpt. Reviewers compare it with the code diff and must find anything unexpected, writing their review comments on sticky notes.",
    "The group decides whether to approve, request changes, or ask for a saved plan, and the pipeline student explains what happens after merge.",
    "Each group adds one safeguard to the shared workflow diagram on the whiteboard, such as locking, policy checks or saved plans, with a sentence on what it prevents."
   ]
  },
  "discussion": [
   "Why is reviewing the plan more informative than reviewing the code diff alone?",
   "When, if ever, is `-auto-approve` appropriate?",
   "What changes about the workflow when you move from one person to a team of twenty?"
  ],
  "exit": [
   [
    "List the three steps of the core workflow in order.",
    "Write, Plan, Apply."
   ],
   [
    "Can a speculative plan be applied?",
    "No. It is for review only."
   ],
   [
    "Name two practices that make team applies safe.",
    "Any two of: remote state with locking, credentials held by the pipeline or HCP Terraform, plan review on pull requests, saved plans, automated validation and policy checks."
   ]
  ],
  "differentiation": [
   "Support: give students a printed flowchart of the team workflow with blanks for each step and for who performs it, to fill in during the role-play.",
   "Extend: ask students to design a pipeline with stages for formatting, validation, speculative plan, approval and apply from a saved plan, and explain what each stage would catch."
  ]
 },
 {
  "t": "`terraform init`: backend setup, provider and module download, `-upgrade`, `-migrate-state`, `-reconfigure`, `-backend-config`",
  "objectives": [
   "Students will be able to list the three jobs `terraform init` performs and where it stores downloads.",
   "Students will be able to choose between `-migrate-state` and `-reconfigure` for a given backend change.",
   "Students will be able to explain when to use `-upgrade` and how it affects the lock file.",
   "Students will be able to configure a backend with partial configuration using `-backend-config`."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the moving-office warm-up question and collect answers about what could go wrong."
   ],
   [
    12,
    "Teach",
    "Walk through init's three jobs with annotated output on the projector. Explain each option with a short scenario: `-upgrade`, `-migrate-state`, `-reconfigure`, `-backend-config`, `-input=false`. Stress that none change infrastructure."
   ],
   [
    15,
    "Activity",
    "Groups play the init option matching game (see activity)."
   ],
   [
    7,
    "Discuss",
    "Review contested scenarios and use the discussion questions."
   ],
   [
    6,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your team is moving to a new office building. What could go wrong with the filing cabinets, and how would you make sure no records get lost?",
  "activity": {
   "title": "Which init option?",
   "materials": "Printed scenario cards (about ten, for example: first clone of a repository, adding a new module, moving from local state to a bucket, pointing at a backend a teammate already migrated, upgrading a provider within constraints, supplying a production state key without committing it, running init in a pipeline with no prompts) and option cards (`init`, `-upgrade`, `-migrate-state`, `-reconfigure`, `-backend-config`, `-input=false`).",
   "steps": [
    "In pairs, students match each scenario card with the option card or combination they would use.",
    "For each match, pairs write one sentence on what would go wrong if they chose the wrong option, especially for the backend scenarios.",
    "Pairs write a partial backend configuration: an empty backend block and the init command with `-backend-config` values for a fictional bucket and key.",
    "The teacher reveals the answers, and pairs score themselves and correct any mismatches."
   ]
  },
  "discussion": [
   "Why do you think Terraform prompts before migrating state rather than doing it automatically?",
   "Why can backend blocks not use variables, and how does partial configuration work around that?",
   "How would you recover if someone ran `-reconfigure` by mistake and the plan wanted to recreate everything?"
  ],
  "exit": [
   [
    "Which option copies existing state to a newly configured backend?",
    "`-migrate-state`."
   ],
   [
    "What does `terraform init -upgrade` do?",
    "Selects the newest provider and module versions allowed by the constraints and updates the lock file."
   ],
   [
    "Does `terraform init` ever change real infrastructure?",
    "No. It only prepares the working directory and backend connection."
   ]
  ],
  "differentiation": [
   "Support: provide a decision flowchart (Did the backend change? Is the state already in the new location?) that leads to `-migrate-state` or `-reconfigure`, and let students use it during the matching game.",
   "Extend: ask students to write init commands for three environments using separate backend settings files, and explain how a pipeline would select the right one non-interactively."
  ]
 },
 {
  "t": "`terraform validate`: syntax and internal consistency checks without contacting provider APIs",
  "objectives": [
   "Students will be able to list the categories of errors `terraform validate` detects.",
   "Students will be able to explain why validate cannot detect errors that depend on the real platform.",
   "Students will be able to state the prerequisites of validate: init is required, credentials, state and variable values are not.",
   "Students will be able to order fmt, validate and plan in a pipeline and justify the order."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the spell-checker warm-up question and collect examples of mistakes a spell-checker misses."
   ],
   [
    10,
    "Teach",
    "Project the error example. List what validate catches and misses in two columns on the whiteboard. Explain the init prerequisite, no credentials or variables, `-json`, and the difference from fmt and plan."
   ],
   [
    18,
    "Activity",
    "Pairs play caught or missed (see activity)."
   ],
   [
    6,
    "Discuss",
    "Review disputed cards and use the discussion questions."
   ],
   [
    6,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A spell-checker says your email has no errors, but it bounces. What kinds of mistakes can a spell-checker never catch?",
  "activity": {
   "title": "Caught or missed",
   "materials": "Printed error cards (about twelve), each describing a mistake: missing brace, undeclared variable, misspelled attribute, missing required argument, string passed to a list argument, `count` with `for_each`, nonexistent image ID, bucket name already taken, expired credentials, quota exceeded, unformatted indentation, region without the service. Three labeled areas on desks or the whiteboard: validate catches, only plan or apply catches, fmt catches.",
   "steps": [
    "Pairs sort each card into one of the three areas and write a one-line reason on a sticky note.",
    "Pairs compare with a neighboring pair and resolve any disagreements, noting which cards caused debate.",
    "Each pair writes a three-stage pipeline (fmt, validate, plan) and annotates which cards each stage would stop.",
    "The teacher reveals the answers, with special attention to cards that look like code mistakes but actually need an API call."
   ]
  },
  "discussion": [
   "Why is it useful to have a check that needs no credentials at all?",
   "If plan already validates, why run validate separately?",
   "What kinds of organizational rules would you add with variable `validation` blocks or preconditions?"
  ],
  "exit": [
   [
    "Does `terraform validate` contact provider APIs?",
    "No. It checks syntax and internal consistency only."
   ],
   [
    "What must you run before `terraform validate` in a fresh clone?",
    "`terraform init`, to install providers and modules so their schemas are available."
   ],
   [
    "Give one error validate catches and one it misses.",
    "Catches: for example an undeclared variable reference. Misses: for example a nonexistent image ID or insufficient permissions."
   ]
  ],
  "differentiation": [
   "Support: give students a two-column reference card (checked from code alone versus needs the real platform) to consult during sorting, and start them with four of the clearer cards.",
   "Extend: ask students to write a variable `validation` block that restricts a region variable to two allowed values, and explain at which step its error would appear compared with a validate error."
  ]
 },
 {
  "t": "`terraform plan`: refresh, diff and symbols (`+`, `-`, `~`, `-/+`), saved plans with `-out`",
  "objectives": [
   "Students will be able to describe the three stages of `terraform plan`: read state, refresh, and compare with configuration.",
   "Students will be able to interpret plan symbols (`+`, `-`, `~`, `-/+`, `+/-`, `<=`) and annotations such as `# forces replacement` and `(known after apply)`.",
   "Students will be able to explain why and how to save a plan with `-out` and apply it later.",
   "Students will be able to choose `-detailed-exitcode` and `-input=false` for automated drift checks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a plan summary line reading 1 to add, 0 to change, 1 to destroy for a single resource. Ask students what they think is about to happen and whether they would approve it."
   ],
   [
    15,
    "Teach",
    "Walk through the three stages of plan on the whiteboard. Introduce each symbol with a one-line example, then project the sample plan from the lesson and point at `# forces replacement` and `(known after apply)`. Close with `-out`, `terraform show`, and why saved plans are sensitive."
   ],
   [
    15,
    "Activity",
    "Run the Plan Detective card activity. Pairs read printed plan excerpts and decide approve or stop, writing the reason on a sticky note."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share the excerpt that fooled them longest. Connect each surprise to the annotation that would have revealed it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "You are about to approve a change that should only update tags, but the summary says one resource will be added and one destroyed. What would you look for before typing yes?",
  "activity": {
   "title": "Plan Detective",
   "materials": "Printed cards, each with a short plan excerpt (an in-place tag update, a replacement forced by an image change, a `+/-` replacement, a drift section, a deferred data source with `<=`, and a sensitive value); sticky notes; whiteboard.",
   "steps": [
    "Give each pair a set of six plan excerpt cards, face down.",
    "For each card, students name every symbol and annotation they see and write in plain words what Terraform will do.",
    "They decide approve or stop, and write the reason on a sticky note, naming the exact line that drove the decision.",
    "Pairs place their sticky notes on the whiteboard under Approve or Stop for each card number.",
    "The teacher reveals the intended reading for each card and discusses any card where the class split."
   ]
  },
  "discussion": [
   "Why might a team prefer a saved plan in a pipeline even though running apply alone also shows a plan?",
   "If a plan reports drift, how do you decide whether to let Terraform revert it or to update the code instead?",
   "What risks come with storing saved plan files as pipeline artifacts, and how would you reduce them?"
  ],
  "exit": [
   [
    "What is the difference between `-/+` and `+/-`?",
    "Both mean replacement. `-/+` destroys the old object first; `+/-` creates the new one first because `create_before_destroy` is set."
   ],
   [
    "What does `(known after apply)` tell you?",
    "The value, such as a new ID, will only be determined by the provider during apply, so it cannot be shown in the plan."
   ],
   [
    "Which commands save a plan and then apply exactly that plan?",
    "`terraform plan -out=tfplan` followed by `terraform apply tfplan`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page symbol key with each symbol, its meaning and a tiny example, and let them use it during the card activity, starting with the three simplest cards.",
   "Extend: Ask fast finishers to sketch a pipeline that runs a plan with `-detailed-exitcode`, saves it with `-out`, publishes `terraform show` output for review, and applies only after approval, noting where secrets could leak."
  ]
 },
 {
  "t": "Planning options: `-var`, `-var-file`, `-target`, `-refresh=false`, `-refresh-only`, `-replace`",
  "objectives": [
   "Students will be able to distinguish `-refresh=false` from `-refresh-only` and explain when to use each.",
   "Students will be able to predict which value wins when `-var` and `-var-file` set the same variable.",
   "Students will be able to explain why `-target` is for exceptional use and what risk it carries.",
   "Students will be able to select the correct planning option for a given operational scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write `-refresh=false` and `-refresh-only` side by side on the board. Ask students to guess, in one sentence each, what they do. Leave the guesses up."
   ],
   [
    15,
    "Teach",
    "Group the six options into inputs, scope and refresh. Explain each with a one-line command on the board, stressing the last-one-wins rule, the `-target` warning, and that `terraform refresh` is deprecated. Revisit the warm-up guesses."
   ],
   [
    15,
    "Activity",
    "Run the Option Match card sort: pairs match scenario cards to option cards and justify each match."
   ],
   [
    5,
    "Discuss",
    "Ask which scenario had the most tempting wrong answer and why. Highlight `-target` versus splitting configurations."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Here are two options that look almost identical: `-refresh=false` and `-refresh-only`. Without looking anything up, write what you think each does.",
  "activity": {
   "title": "Option Match",
   "materials": "Two sets of printed cards per pair: six option cards (`-var`, `-var-file`, `-target`, `-refresh=false`, `-refresh-only`, `-replace`) and eight short scenario cards; sticky notes; whiteboard.",
   "steps": [
    "Hand each pair the option cards and scenario cards, shuffled.",
    "Pairs match each scenario to the best option, noting that some scenarios may need two options and some options fit more than one scenario.",
    "For each match, pairs write a sticky note with the exact command they would run and one risk to watch for.",
    "Two pairs compare their matches and resolve any disagreements together.",
    "The teacher reviews the trickiest scenarios, including an argument-order question about `-var` and `-var-file`."
   ]
  },
  "discussion": [
   "If your team uses `-target` every week, what does that suggest about how the configuration is organized?",
   "When drift is found, who should decide whether to accept it into state or revert it, and why?",
   "Why might a fast `-refresh=false` plan be acceptable in development but risky in production?"
  ],
  "exit": [
   [
    "What is the difference between `-refresh=false` and `-refresh-only`?",
    "`-refresh=false` skips checking real infrastructure; `-refresh-only` checks real infrastructure and proposes updating only state."
   ],
   [
    "Which value is used if `-var 'env=dev'` comes after `-var-file=prod.tfvars`, which sets `env = \"prod\"`?",
    "`dev`, because the last value on the command line wins."
   ],
   [
    "What command replaced the deprecated `terraform refresh`?",
    "`terraform apply -refresh-only`, with `terraform plan -refresh-only` to review first."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat sheet listing each option with a plain-language what it does and when to use it, and pair struggling students with a partner for the card sort.",
   "Extend: Ask fast finishers to write a short runbook for a drift investigation that uses `plan -refresh-only`, `apply -refresh-only`, and a follow-up code change, explaining why each step is in that order."
  ]
 },
 {
  "t": "`terraform apply`: interactive approval, `-auto-approve`, applying a saved plan file",
  "objectives": [
   "Students will be able to contrast apply without a plan file and apply with a saved plan file, including prompts and variable handling.",
   "Students will be able to explain when `-auto-approve` is appropriate and the risks of using it elsewhere.",
   "Students will be able to describe what happens to state when an apply fails part-way.",
   "Students will be able to design a plan, review, apply sequence for a pipeline."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: if you approve a plan at noon and apply at 12:20, can you be sure the same changes run? Collect quick answers."
   ],
   [
    12,
    "Teach",
    "Draw the two apply modes as two columns on the whiteboard: prompt or no prompt, variables allowed or not, fresh plan or saved plan. Explain the exact-word `yes` rule, `-auto-approve`, stale plans and non-transactional apply with tainting."
   ],
   [
    18,
    "Activity",
    "Run the Pipeline Role-Play: small groups act out a release with a planner, a reviewer, an applier and a teammate who merges mid-way."
   ],
   [
    5,
    "Discuss",
    "Debrief what the role-play showed about saved plans versus `-auto-approve`, and about partial failures."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you approve a plan at noon and the pipeline applies at 12:20, how sure can you be that the same changes run? What could make them different?",
  "activity": {
   "title": "Pipeline Role-Play",
   "materials": "Printed role cards (Planner, Reviewer, Applier, Busy Teammate), printed plan summaries for two rounds, whiteboard for the shared state record, sticky notes.",
   "steps": [
    "Form groups of four and hand out role cards. The whiteboard represents the shared state.",
    "Round one: the Planner reads a plan summary aloud, the Reviewer approves, the Busy Teammate updates state on the board in between, and the Applier uses `apply -auto-approve`. The group records what actually got applied.",
    "Round two: repeat the same story, but the Planner saves the plan with `-out` and the Applier applies the file. The group decides what Terraform does when state has changed, and writes it on a sticky note.",
    "Round three: the teacher announces that the apply fails after two of four resources. Each group updates the board to show what state contains and what the next apply will do.",
    "Groups compare their boards and the teacher confirms the stale plan and partial failure behaviors."
   ]
  },
  "discussion": [
   "In what situations is `-auto-approve` a reasonable choice, and who should be allowed to use it?",
   "Why might it be safer that apply is not transactional, even though partial results can be confusing?",
   "How should a team protect saved plan files that pass between pipeline stages?"
  ],
  "exit": [
   [
    "Does `terraform apply tfplan` prompt for approval?",
    "No. Applying a saved plan file is treated as already approved."
   ],
   [
    "What input does the interactive apply prompt accept to proceed?",
    "Only the exact word `yes`; anything else cancels."
   ],
   [
    "An apply fails after creating some resources. What does state contain?",
    "The resources that were successfully created; nothing is rolled back, and the next apply continues from there."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column comparison card of the two apply modes to keep at their desk during the role-play, and assign them the Reviewer role first.",
   "Extend: Ask fast finishers to write the steps of a pipeline that uses plan, show, manual approval and apply of a saved file, including how it should react to a stale plan error and a partial failure."
  ]
 },
 {
  "t": "`terraform destroy` and `terraform plan -destroy`",
  "objectives": [
   "Students will be able to explain that `terraform destroy` is an alias for `terraform apply -destroy` and contrast it with `terraform plan -destroy`.",
   "Students will be able to predict the order in which dependent resources are destroyed.",
   "Students will be able to explain why destroy only affects resources in state and why deleting state is not deletion.",
   "Students will be able to apply `prevent_destroy` to protect critical resources."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students: if you delete a Terraform state file, what happens to the servers it described? Take a quick show of hands for the options deleted, still running, or not sure."
   ],
   [
    13,
    "Teach",
    "Explain destroy as an alias of `apply -destroy`, then `plan -destroy` with `-out`. Draw a network, subnet and instance on the board and number the destroy order in reverse. Cover the state boundary and `prevent_destroy`, then revisit the warm-up."
   ],
   [
    17,
    "Activity",
    "Run Teardown Order: groups sequence sticky-note resources for destruction and handle twist cards."
   ],
   [
    5,
    "Discuss",
    "Discuss the twist cards that caused disagreement, especially the deleted state file and the protected database."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If someone deletes a Terraform state file, what happens to the servers it described: are they deleted, still running, or something else?",
  "activity": {
   "title": "Teardown Order",
   "materials": "Sticky notes, markers, whiteboard, and printed twist cards (a hand-made VM in the same account, a resource with `prevent_destroy`, a deleted state file, a data source, a destroy with `-target`).",
   "steps": [
    "Each group writes one sticky note per resource for a small stack: network, two subnets, a security group, two instances, a DNS record and a data source for a machine image, and draws dependency arrows on the board.",
    "Groups number the sticky notes in the order Terraform would destroy them, and mark anything that would not be destroyed at all.",
    "The teacher hands each group two twist cards. For each card, the group writes what Terraform would do and why.",
    "Groups present one twist card each to the class.",
    "The teacher confirms correct answers, emphasizing reverse order, untouched data sources and the state boundary."
   ]
  },
  "discussion": [
   "Why might a team prefer `terraform plan -destroy -out` followed by apply over a plain `terraform destroy -auto-approve` in a pipeline?",
   "What are the trade-offs between `prevent_destroy` in Terraform and deletion protection offered by the cloud provider?",
   "How would you find and handle resources that are running but not tracked in any state?"
  ],
  "exit": [
   [
    "Which command is equivalent to `terraform destroy`?",
    "`terraform apply -destroy`."
   ],
   [
    "Does deleting a state file remove the infrastructure it tracks?",
    "No. The resources keep running, but Terraform no longer tracks them."
   ],
   [
    "What happens when a plan would destroy a resource with `prevent_destroy = true`?",
    "The plan fails with an error, and nothing is destroyed."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn dependency diagram with arrows already in place, so they can focus on reversing the order, and walk through the first twist card together.",
   "Extend: Ask fast finishers to design a cleanup process for preview environments that uses a saved destroy plan, keeps a record of what was removed, and protects a shared database from accidental deletion."
  ]
 },
 {
  "t": "`terraform fmt`: canonical style, `-check`, `-diff` and `-recursive`",
  "objectives": [
   "Students will be able to describe what `terraform fmt` changes and what it does not change.",
   "Students will be able to choose the right combination of `-check`, `-diff` and `-recursive` for a scenario.",
   "Students will be able to distinguish the roles of `fmt`, `validate` and `plan` in a pipeline."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a messy, badly indented resource block. Ask students to list what is wrong with it and whether those problems would change what Terraform builds."
   ],
   [
    12,
    "Teach",
    "Show the before and after example. Explain alignment groups, the default current-directory scope, `-recursive`, `-check` and `-diff`. Draw the fmt, validate, plan ladder and what each needs."
   ],
   [
    18,
    "Activity",
    "Run Human Formatter: pairs format printed messy blocks by hand to canonical style, then classify a set of problems as fmt, validate or plan issues."
   ],
   [
    5,
    "Discuss",
    "Ask why teams block merges on formatting and how editors and hooks can reduce friction."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at this badly indented resource block. List what is wrong with it. Would any of those problems change what Terraform actually builds?",
  "activity": {
   "title": "Human Formatter",
   "materials": "Printed handouts with three messy HCL blocks and twelve problem cards (for example misaligned equals signs, an undeclared variable, a wrong attribute name, tabs instead of spaces, drift in the cloud, an expired credential); pens; whiteboard with three columns labeled fmt, validate and plan.",
   "steps": [
    "Pairs rewrite each messy block by hand in canonical style: two-space indentation and aligned equals signs within each group of consecutive arguments.",
    "The teacher projects the real fmt output and pairs mark any differences from their version.",
    "Pairs sort the twelve problem cards into the fmt, validate and plan columns on the whiteboard according to which command would first report each problem.",
    "The class reviews the board and moves any misplaced cards, with pairs explaining their reasoning.",
    "Each pair writes the single fmt command they would put in a CI pipeline for a repository with modules."
   ]
  },
  "discussion": [
   "Is it fair to fail a build over whitespace? What does the team gain and lose?",
   "Where should formatting happen: in the editor, in a pre-commit hook, in CI, or all three?",
   "What kinds of problems would you still want a separate linter to catch?"
  ],
  "exit": [
   [
    "Does `terraform fmt` change what infrastructure Terraform will build?",
    "No. It changes only whitespace and layout."
   ],
   [
    "What does `terraform fmt -check` do if a file is unformatted?",
    "Lists the file and exits with a nonzero status, without modifying it."
   ],
   [
    "Which command, not fmt, would report a reference to an undeclared variable?",
    "`terraform validate`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students one short block with only indentation problems first, and a reference card showing the canonical layout rules, before moving to the alignment examples.",
   "Extend: Ask fast finishers to design a three-stage pipeline (fmt, validate, plan) and explain what each stage needs, such as init, credentials or state, and why the stages are ordered that way."
  ]
 },
 {
  "t": "Resource replacement with `-replace` instead of the deprecated `terraform taint`",
  "objectives": [
   "Students will be able to use `-replace` with plan and apply to force recreation of a specific resource instance.",
   "Students will be able to explain why `terraform taint` is deprecated in favor of `-replace`.",
   "Students will be able to describe automatic tainting and when `terraform untaint` is appropriate.",
   "Students will be able to write correct `-replace` addresses for `count` and `for_each` instances."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Tell the Fernwood story from the lesson hook in two sentences and ask: who made the mistake, and what process would have prevented the surprise?"
   ],
   [
    12,
    "Teach",
    "Show `plan -replace` and `apply -replace`, including `count` and `for_each` addresses with quoting. Contrast with `taint` on a timeline on the whiteboard: mark now, apply later by anyone. Cover automatic tainting, `untaint` and `replace_triggered_by`."
   ],
   [
    18,
    "Activity",
    "Run the Sticky Note Timeline role-play contrasting a taint workflow and a replace workflow."
   ],
   [
    5,
    "Discuss",
    "Debrief which workflow left a clearer record of intent and approval."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A teammate marked a server for rebuild on Tuesday and went home. On Thursday, your routine apply rebuilt it during month-end processing. Who made the mistake, and what process would have prevented the surprise?",
  "activity": {
   "title": "Sticky Note Timeline",
   "materials": "Whiteboard with a five-day timeline drawn across it, sticky notes in two colors, printed role cards (Engineer A, Engineer B, Reviewer), printed address cards for `count` and `for_each` resources.",
   "steps": [
    "In groups of three, students act out the taint workflow: Engineer A places a colored sticky note (the taint) on Tuesday; Engineer B runs an unrelated apply on Thursday. The group writes what Engineer B sees and whether it was expected.",
    "Repeat with the replace workflow: Engineer A writes a `-replace` command on a sticky note, the Reviewer approves it, and the apply happens the same day. The group records what changes if the Reviewer says no.",
    "Groups receive address cards and write the correct, shell-quoted `-replace` argument for the second `count` instance and for the `for_each` instance keyed `blue`.",
    "Each group adds one scenario where automatic tainting would happen, and decides whether `untaint` is appropriate.",
    "The teacher reviews addresses and scenarios with the whole class."
   ]
  },
  "discussion": [
   "Why does it matter that intent and action happen in the same plan?",
   "When would you trust `terraform untaint` over letting Terraform rebuild the resource?",
   "What signals tell you a resource should get `replace_triggered_by` or a code fix rather than repeated manual replacement?"
  ],
  "exit": [
   [
    "What is the recommended command to force recreation of `aws_instance.web`?",
    "`terraform apply -replace=\"aws_instance.web\"` (or preview with `terraform plan -replace`)."
   ],
   [
    "Why is `terraform taint` discouraged?",
    "It changed shared state immediately without a reviewed plan, so a later, unrelated apply could replace the resource unexpectedly; it is deprecated."
   ],
   [
    "How do you replace the instance keyed `blue` in a `for_each` resource `aws_instance.web`?",
    "`terraform apply -replace='aws_instance.web[\"blue\"]'`."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked example card showing the exact `-replace` commands for a single resource, a `count` instance and a `for_each` instance, and let struggling students act as Reviewer first.",
   "Extend: Ask fast finishers to write a short team policy for forced replacements that covers `-replace`, saved plans, automatic tainting after provisioner failures, and when to use `replace_triggered_by`."
  ]
 },
 {
  "t": "Parallelism and the dependency graph during apply",
  "objectives": [
   "Students will be able to explain how Terraform builds and walks a dependency graph from references and `depends_on`.",
   "Students will be able to distinguish what `-parallelism` controls (concurrency) from what the graph controls (order).",
   "Students will be able to choose an appropriate `-parallelism` value for a scenario such as API throttling.",
   "Students will be able to recognize a dependency cycle and describe how to break it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list the steps of making a sandwich and mark which steps could be done by two people at the same time."
   ],
   [
    12,
    "Teach",
    "Draw a dependency graph for network, two subnets, three instances and a bucket. Show which nodes can run together, the default of 10, `-parallelism`, reverse order for destroy, `terraform graph`, and a two-node cycle."
   ],
   [
    18,
    "Activity",
    "Run Human Graph: students act as resources and a scheduler, executing the graph with different parallelism limits."
   ],
   [
    5,
    "Discuss",
    "Connect observations to rate limits, debugging and cycle errors."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List the steps of making a sandwich. Which steps could two people do at the same time, and which must wait for another step?",
  "activity": {
   "title": "Human Graph",
   "materials": "Index cards labeled with resource names (network, subnet-a, subnet-b, instance-1 to instance-3, bucket-1 to bucket-3), string or tape to show arrows on the floor or whiteboard, a timer.",
   "steps": [
    "Volunteers each hold a resource card. The class draws arrows on the whiteboard showing which resources reference which.",
    "One student acts as Terraform. With a parallelism limit of 2, they tap at most two resources at a time; a tapped resource counts five seconds aloud, then sits down as created. The class times the run.",
    "Repeat with a limit of 10 and then with 1, recording the times and noting that the order of dependent resources never changes.",
    "Run a destroy: students stand back up in reverse order as Terraform removes them.",
    "The teacher adds an arrow from network back to an instance to create a cycle. The class explains why Terraform cannot start and proposes a restructure."
   ]
  },
  "discussion": [
   "Why does Terraform ignore file order, and what would go wrong if it did not?",
   "How would you decide on a parallelism value for a provider that throttles requests?",
   "When is `depends_on` necessary, and what are the costs of using it when a reference would do?"
  ],
  "exit": [
   [
    "Does `-parallelism=1` change the order in which dependent resources are created?",
    "No. It only limits concurrency; order still comes from the dependency graph."
   ],
   [
    "What is the default maximum number of concurrent operations?",
    "10."
   ],
   [
    "Resource A references B and B references A. What happens at plan time?",
    "Terraform reports a cycle error; the configuration must be restructured so the dependency runs one way."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn graph with numbered levels showing which nodes can start together, and have them predict the run with parallelism 2 before acting it out.",
   "Extend: Ask fast finishers to design a small configuration with two security groups whose rules reference each other, identify the cycle, and rewrite it using separate rule resources so it can be planned."
  ]
 },
 {
  "t": "Resource blocks vs data blocks, and addressing them (`TYPE.NAME`, `data.TYPE.NAME`)",
  "objectives": [
   "Students will be able to distinguish resource blocks from data blocks by what Terraform does with each.",
   "Students will be able to write correct addresses for resources, data sources, module resources and `count` or `for_each` instances.",
   "Students will be able to decide whether a scenario calls for a resource or a data source.",
   "Students will be able to explain when data sources are read and how they appear in a plan."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: name one thing in your home you own and maintain, and one thing you only look up. Connect the answers to resources and data sources."
   ],
   [
    12,
    "Teach",
    "Project the AMI and instance example. Label the type, local name and address of each block. Build up addresses on the board: `TYPE.NAME`, `data.TYPE.NAME`, module paths, `[0]` and `[\"blue\"]`. Explain when data sources are read and the `<=` symbol."
   ],
   [
    18,
    "Activity",
    "Run Own It or Look It Up: groups sort scenario cards and write the address for each."
   ],
   [
    5,
    "Discuss",
    "Discuss scenarios where groups disagreed about ownership."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name one thing in your home that you own and maintain, and one thing you only look up, like a bus timetable. How does that difference change what you are allowed to do with it?",
  "activity": {
   "title": "Own It or Look It Up",
   "materials": "Printed scenario cards (for example a new storage bucket, another team's network, the latest vendor image, the current account ID, three web servers created with `count`, a resource inside a module), two labeled areas on the whiteboard (Resource and Data source), markers.",
   "steps": [
    "Groups of three draw scenario cards one at a time and decide whether each calls for a resource block or a data block.",
    "For each card, the group writes the block header (type and local name) and the address another block would use to reference its ID.",
    "Groups place cards on the whiteboard under Resource or Data source.",
    "The teacher picks three cards and asks a different group to check the address, watching for missing `data.` prefixes and instance keys.",
    "Each group writes one sentence explaining what `terraform destroy` would do to the objects on two of their cards."
   ]
  },
  "discussion": [
   "What problems can hard-coded IDs cause when a configuration moves to a new region or account?",
   "What could go wrong if two configurations both manage the same object as a resource?",
   "Why might it be useful that data sources are reread on every plan, and when might it be surprising?"
  ],
  "exit": [
   [
    "How do you reference the `id` of a data source of type `aws_ami` named `ubuntu`?",
    "`data.aws_ami.ubuntu.id`."
   ],
   [
    "What does `terraform destroy` do to objects that data sources read?",
    "Nothing; data sources are read-only and are never destroyed."
   ],
   [
    "What is the address of the second instance of `aws_instance.web` created with `count`?",
    "`aws_instance.web[1]`."
   ]
  ],
  "differentiation": [
   "Support: Provide an address template card with blanks (`____.____`, `data.____.____`, `module.____.____.____`) and worked examples, and start struggling students on the simplest scenario cards.",
   "Extend: Ask fast finishers to write a short configuration that looks up an existing network with a data source and creates a subnet in it, then list every address that would appear in `terraform state list`."
  ]
 },
 {
  "t": "Cross-resource references and implicit dependencies",
  "objectives": [
   "Students will be able to write the main reference forms: resource, data source, variable, local, module output and path or workspace values.",
   "Students will be able to explain how references create implicit dependencies that order creation and destruction.",
   "Students will be able to explain why `(known after apply)` appears for values that depend on new resources.",
   "Students will be able to decide when `depends_on` or a `moved` block is needed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: in a group project, how do you know who has to finish first? Collect answers that hint at handoffs rather than schedules."
   ],
   [
    12,
    "Teach",
    "Project the network, subnet and instance example. Circle each reference and draw the resulting arrows. List the reference forms on the board. Explain `(known after apply)`, reverse order for destroy, when `depends_on` is needed, and renames with `moved`."
   ],
   [
    18,
    "Activity",
    "Run Draw the Arrows: pairs read a printed configuration, draw the dependency graph and answer ordering questions."
   ],
   [
    5,
    "Discuss",
    "Ask pairs which arrow they nearly missed and what would happen if a reference were hard-coded instead."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In a group project, how do you know who has to finish first? Do you need a written schedule, or does the handoff itself tell you?",
  "activity": {
   "title": "Draw the Arrows",
   "materials": "Printed one-page configuration with about eight blocks (network, two subnets, security group, instance, load balancer, DNS record, a variable and a local), colored pens, whiteboard.",
   "steps": [
    "Pairs circle every reference in the printed configuration and label its form, such as resource attribute, variable or local.",
    "Pairs draw an arrow for each dependency and number the order in which Terraform could create the resources, marking any that can run in parallel.",
    "Pairs list which values would appear as `(known after apply)` in the first plan and explain why.",
    "Pairs reverse their numbering to show destroy order.",
    "The teacher presents a rename of one resource and asks pairs to write the `moved` block that avoids a replacement."
   ]
  },
  "discussion": [
   "Why do implicit dependencies document themselves better than `depends_on`?",
   "What could go wrong if you copied a resource ID from the console into your code instead of referencing it?",
   "Can you think of a real dependency that no attribute reference would capture?"
  ],
  "exit": [
   [
    "How does Terraform know to create `aws_vpc.main` before `aws_subnet.app`?",
    "The subnet references `aws_vpc.main.id`, which creates an implicit dependency."
   ],
   [
    "In what order are a network, subnet and instance destroyed?",
    "Instance, then subnet, then network: dependencies in reverse."
   ],
   [
    "What should you add when renaming a resource to avoid destroying and recreating it?",
    "A `moved` block from the old address to the new address."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a version of the configuration with references already highlighted, so they can focus on drawing arrows and ordering.",
   "Extend: Ask fast finishers to find a place in the configuration where `depends_on` would be justified, write it, and explain why no attribute reference could express that dependency."
  ]
 },
 {
  "t": "Input variables: `type`, `default`, `description`, `sensitive`, `nullable`, and value precedence (TF_VAR_, tfvars, auto.tfvars, -var)",
  "objectives": [
   "Students will be able to declare an input variable using `type`, `default`, `description`, `sensitive`, `nullable` and `validation`.",
   "Students will be able to determine which value wins when a variable is set by several sources.",
   "Students will be able to explain what `sensitive` does and does not protect.",
   "Students will be able to explain how child module variables differ from root module variables."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the Brightwater scenario from the hook aloud: four sources set the region. Ask students to vote on which value wins and write the vote counts on the board."
   ],
   [
    13,
    "Teach",
    "Walk through the variable block arguments using the example. Write the five-level precedence ladder on the board with the mnemonic. Stress automatic file names, lexical order, last-one-wins on the command line, `sensitive` and state, and root versus child modules. Revisit the warm-up vote."
   ],
   [
    17,
    "Activity",
    "Run Precedence Ladder: groups resolve scenario cards by placing value sticky notes on a ladder drawn on the whiteboard."
   ],
   [
    5,
    "Discuss",
    "Discuss surprising results, especially leftover auto files and environment variables losing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A variable called `region` is set by an environment variable, by `terraform.tfvars`, by a forgotten `.auto.tfvars` file and by a `-var-file` on the command line. Vote: which one does Terraform use?",
  "activity": {
   "title": "Precedence Ladder",
   "materials": "Whiteboard with a five-rung ladder labeled with the precedence levels, sticky notes in several colors, printed scenario cards each listing three to five sources and values for one variable.",
   "steps": [
    "Each group draws a scenario card and writes each source's value on a sticky note.",
    "Groups place the sticky notes on the correct rungs of the ladder, ordering auto files lexically and command-line options in the order given.",
    "Groups circle the winning value and explain why in one sentence.",
    "The teacher adds twist cards: a file named `prod.tfvars` with no `-var-file`, a required variable with no source and `-input=false`, and a child module variable. Groups decide what happens.",
    "Groups swap scenario cards with a neighbor and check each other's answers."
   ]
  },
  "discussion": [
   "Why do you think environment variables have the lowest precedence rather than the highest?",
   "What practices would stop a forgotten `.auto.tfvars` file from changing deployments?",
   "If `sensitive` does not keep values out of state, what else must a team do to protect secrets?"
  ],
  "exit": [
   [
    "Which source has the highest precedence for a root module variable?",
    "`-var` and `-var-file` on the command line, with the last one given winning."
   ],
   [
    "Is `staging.tfvars` loaded automatically?",
    "No. Only `terraform.tfvars`, `terraform.tfvars.json` and `*.auto.tfvars(.json)` files load automatically; others need `-var-file`."
   ],
   [
    "What does `sensitive = true` do?",
    "It redacts the value in plan and apply output, but the value can still be stored in state."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed precedence ladder with the mnemonic and one worked example, and let them solve two-source scenarios before moving to four-source ones.",
   "Extend: Ask fast finishers to write a variable block for an `environment` variable with a type, description, `nullable = false` and a validation that allows only three values, then predict the error message for a typo."
  ]
 },
 {
  "t": "Output values and local values",
  "objectives": [
   "Students will be able to declare outputs and locals and reference them correctly with `module.NAME.OUTPUT` and `local.NAME`.",
   "Students will be able to use `terraform output` with `-raw` and `-json` and explain how sensitive outputs are displayed.",
   "Students will be able to explain how values flow between modules and between configurations.",
   "Students will be able to decide whether a value should be a variable, a local or an output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write `locals {}` and `local.name` on the board and ask students to spot the difference and guess why it exists."
   ],
   [
    12,
    "Teach",
    "Present the function analogy: parameters, local variables, return values. Show the output and locals examples, `terraform output` options, sensitive behavior, child module outputs and `terraform_remote_state`."
   ],
   [
    18,
    "Activity",
    "Run Input, Inside or Output: groups classify value cards and write the declaration and the reference for each."
   ],
   [
    5,
    "Discuss",
    "Discuss cards where groups disagreed, especially values that could be either a variable or a local."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at `locals { ... }` and `local.name_prefix`. What is different, and why do you think Terraform spells them that way?",
  "activity": {
   "title": "Input, Inside or Output",
   "materials": "Printed value cards (for example a region chosen per environment, a standard tag map, a server's public IP, a naming prefix built from two variables, a database password, subnet IDs another team needs), a whiteboard with three columns labeled Variable, Local and Output, markers.",
   "steps": [
    "Groups of three sort each value card into Variable, Local or Output and tape it to the whiteboard.",
    "For each card, the group writes the declaration and how it would be referenced, such as `var.region`, `local.common_tags` or `module.network.subnet_ids`.",
    "For any output card, the group writes the `terraform output` command a script would use to read it, and notes whether it should be sensitive.",
    "The teacher picks two cards that could fit more than one column and asks groups to argue for their choice.",
    "Each group writes one sentence explaining how a second configuration could read the subnet IDs."
   ]
  },
  "discussion": [
   "When does adding a local make code clearer, and when does it make code harder to read?",
   "What are the risks of sharing values between stacks through remote state, and how could a team limit them?",
   "Why might a module author choose not to expose a value as an output?"
  ],
  "exit": [
   [
    "How is a local named `name_prefix` referenced?",
    "`local.name_prefix`."
   ],
   [
    "How does the root module use output `endpoint` from a child module named `db`?",
    "`module.db.endpoint`."
   ],
   [
    "Will `terraform output -json` show a sensitive output's value?",
    "Yes. `-json` and `-raw` print sensitive values in plain text, because the value is stored in state."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column reference card showing the declaration and reference syntax for variables, locals and outputs, with one worked example each.",
   "Extend: Ask fast finishers to design a small root module that calls a network module, passes the subnet IDs into a compute module, and exposes the server IP as a root output, writing every reference involved."
  ]
 },
 {
  "t": "Complex types: list, map, set, object, tuple; type conversion",
  "objectives": [
   "Students will be able to distinguish collection types (list, map, set) from structural types (object, tuple).",
   "Students will be able to choose an appropriate type constraint, including `optional()`, for a described input.",
   "Students will be able to predict when Terraform converts a value automatically and when an error occurs.",
   "Students will be able to explain why `toset()` is needed before passing a list to `for_each`."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project three short data descriptions (a list of zones, a set of unique user names, a server with name and port) and ask pairs to guess what container shape each needs."
   ],
   [
    15,
    "Teach",
    "Walk through the two families on the whiteboard with one example each. Show the map of objects example with `optional()`, then the conversion rules, stressing that brackets make tuples and braces make objects that Terraform converts."
   ],
   [
    15,
    "Activity",
    "Run the type-matching card sort described below and debrief each group's hardest card."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface why explicit types beat `any` in shared modules."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If you had to describe a hotel to a computer, which parts are an ordered list, which are unique items, and which are labeled fields of different kinds?",
  "activity": {
   "title": "Type-matching card sort",
   "materials": "Printed cards with data descriptions and HCL values, printed cards with type constraints, whiteboard, markers.",
   "steps": [
    "Give each group of three a set of about twelve data cards (for example, three availability zones in order, unique team names, a map of environment to instance count, a database config with name, port and encrypted flag).",
    "Groups match each data card to a type constraint card and write the HCL literal they would pass.",
    "Add four conversion cards (for example, \"5\" assigned to number, \"hello\" assigned to number, a list passed to for_each) and ask groups to predict success or error.",
    "Each group presents one card where they disagreed and explains the final answer; the teacher corrects any misconceptions on the whiteboard."
   ]
  },
  "discussion": [
   "When would a module author reasonably choose `any`, and what does the caller lose?",
   "Why might a team prefer a map of objects over a list of objects for resources created with `for_each`?"
  ],
  "exit": [
   [
    "Which complex types are structural types?",
    "object and tuple, because they allow different types in fixed attributes or positions."
   ],
   [
    "What does `optional(number, 1)` mean inside an object type?",
    "The attribute may be omitted by callers, and if it is, Terraform uses the default value 1."
   ],
   [
    "Why must you wrap a list in `toset()` for `for_each`?",
    "`for_each` accepts only maps and sets of strings, not lists."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page chart of the five complex types with an everyday picture and one HCL literal each, and let students use it during the card sort.",
   "Extend: Ask students to write a variable with a nested type, such as a map of objects containing a list of strings, plus a sample tfvars value, and explain every conversion Terraform would perform."
  ]
 },
 {
  "t": "Expressions: conditionals, `for` expressions, splat `[*]`, string templates, `dynamic` blocks",
  "objectives": [
   "Students will be able to write conditional and `for` expressions that produce lists and maps.",
   "Students will be able to use splat expressions correctly and explain why they do not apply directly to `for_each` resources.",
   "Students will be able to read and write string templates, including interpolation, directives and heredocs.",
   "Students will be able to decide when a `dynamic` block is appropriate and state its limits."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a resource with six identical copy-pasted ingress blocks and ask students what they would change if a seventh port were needed."
   ],
   [
    15,
    "Teach",
    "Introduce each expression form with a one-line example on the projector. Emphasize the bracket rule for `for`, the list-only rule for splat, and that dynamic blocks generate nested blocks only."
   ],
   [
    15,
    "Activity",
    "Pairs complete the refactoring worksheet below, then compare answers with another pair."
   ],
   [
    5,
    "Discuss",
    "Discuss readability: when does a dynamic block help and when does it hide too much?"
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you had to write the same paragraph forty times with only one word changing, what tool would you want, and what could go wrong with it?",
  "activity": {
   "title": "Refactor the repetition",
   "materials": "Printed worksheet with four repetitive HCL snippets and their desired outputs, pencils, a projector for the answer key.",
   "steps": [
    "Snippet 1: replace two near-identical resources with one resource whose `count` uses a conditional on `var.environment`.",
    "Snippet 2: write a `for` expression that turns a list of names into a map of name to uppercase name, and another that filters only public servers.",
    "Snippet 3: replace six literal ingress blocks with a `dynamic` block driven by a list of ports.",
    "Snippet 4: write an output that lists all IDs for a `count` resource and for a `for_each` resource, noting the difference.",
    "Pairs swap worksheets with another pair, check each answer against the projected key, and note one error they found."
   ]
  },
  "discussion": [
   "What makes a configuration with many dynamic blocks harder to review in a pull request?",
   "Why does Terraform require both branches of a conditional to have compatible types?"
  ],
  "exit": [
   [
    "What type of value does `{ for k, v in var.m : k => upper(v) }` produce?",
    "A map (or object), because braces with `=>` produce key-value results."
   ],
   [
    "Why does `aws_instance.web[*].id` fail for a `for_each` resource?",
    "A `for_each` resource is a map of instances and splat works on lists, sets and tuples; use `values(aws_instance.web)[*].id`."
   ],
   [
    "Can a `dynamic` block generate a `lifecycle` block?",
    "No. Dynamic blocks generate only ordinary nested blocks, not meta-argument blocks such as lifecycle, and not whole resources."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card that shows each expression form beside its plain-English reading, and let them start the worksheet with snippet 1 and 2 only.",
   "Extend: Ask students to write a `templatefile`-style template using `%{ for }` and `%{ if }` directives that renders a hosts file from a map, and explain how heredoc indentation stripping affects it."
  ]
 },
 {
  "t": "Built-in functions and testing them in `terraform console`",
  "objectives": [
   "Students will be able to classify common Terraform functions by category and describe what each returns.",
   "Students will be able to predict the output of `lookup`, `element`, `merge` and `cidrsubnet` for given inputs.",
   "Students will be able to use `terraform console` to evaluate expressions safely and explain that it makes no changes.",
   "Students will be able to state that Terraform does not support user-defined functions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to name a spreadsheet function they use and what it does, then connect that to Terraform's built-in functions."
   ],
   [
    12,
    "Teach",
    "Show the function categories on the projector with one example each. Demonstrate the commonly tested behaviors and walk through the cidrsubnet arithmetic on the whiteboard."
   ],
   [
    18,
    "Activity",
    "Students run the function prediction relay below, first predicting on paper, then checking answers in a console session projected by the teacher or on their own machines if Terraform is installed."
   ],
   [
    5,
    "Discuss",
    "Discuss why functions like timestamp cause perpetual diffs and how console helps catch that early."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on an index card."
   ]
  ],
  "warmup": "In a spreadsheet you can type =UPPER(A1). What would you expect Terraform's equivalent to look like, and could you write your own version?",
  "activity": {
   "title": "Function prediction relay",
   "materials": "Printed cards each showing one function call (for example, lookup with a missing key, element past the end, merge with duplicate keys, cidrsubnet with different newbits), whiteboard, projector.",
   "steps": [
    "Split the class into teams and give each team a stack of ten function cards face down.",
    "One student at a time flips a card and the team writes its predicted output on a sticky note within one minute.",
    "After all cards are done, the teacher evaluates each call live in a projected console session (or shows prepared output) while teams score their predictions.",
    "For every wrong prediction, the team writes one sentence explaining the actual behavior on the whiteboard."
   ]
  },
  "discussion": [
   "Why might HashiCorp have chosen not to allow user-defined functions in the Terraform language?",
   "How would you use console when reviewing someone else's module that you do not fully understand?"
  ],
  "exit": [
   [
    "What does `merge({a = 1}, {a = 2})` return?",
    "`{a = 2}`, because later maps win on duplicate keys."
   ],
   [
    "What does `terraform console` change in your infrastructure?",
    "Nothing. It only evaluates expressions against configuration and state."
   ],
   [
    "Which category does `cidrhost` belong to?",
    "IP network functions."
   ]
  ],
  "differentiation": [
   "Support: Provide a function cheat sheet grouped by category with one worked example each, and pair struggling students with a partner for the relay.",
   "Extend: Challenge students to write a single expression combining `for`, `cidrsubnet` and `zipmap` that maps three zone names to three /24 subnets, then predict its full output."
  ]
 },
 {
  "t": "`count` vs `for_each`, `count.index`, `each.key` and `each.value`",
  "objectives": [
   "Students will be able to compare how `count` and `for_each` identify resource instances.",
   "Students will be able to predict the plan impact of removing an item from a collection used with each meta-argument.",
   "Students will be able to use `count.index`, `each.key` and `each.value` correctly in a resource block.",
   "Students will be able to choose the appropriate meta-argument for a described scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Line up five students in numbered chairs, then remove the student in chair 0 and have the rest shift. Ask what changed for each person."
   ],
   [
    12,
    "Teach",
    "Show count and for_each examples on the projector, explain addressing by index versus key, and walk through the remove-alice plan output on the whiteboard."
   ],
   [
    18,
    "Activity",
    "Run the seat-shift role-play and plan prediction exercise below."
   ],
   [
    5,
    "Discuss",
    "Discuss when count is still the better choice and why keys must be known at plan time."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If seats in a theater were assigned by row number instead of by name on the ticket, what would happen when one person in the middle canceled?",
  "activity": {
   "title": "Seat shift: count versus for_each",
   "materials": "Sticky notes, whiteboard, printed sheets showing two short configurations (one with count over a list, one with for_each over a set), markers.",
   "steps": [
    "Write the five names from a list on sticky notes and place them on the whiteboard under numbered slots 0 to 4, labeled count.",
    "Place the same names under name-labeled slots, labeled for_each.",
    "Remove the second name from both and have students rewrite what each slot now holds, listing every address Terraform would see as changed, created or destroyed.",
    "In pairs, students write the plan summary (to add, to change, to destroy) for each case on the printed sheet.",
    "Pairs then write the `moved` block that would migrate `aws_iam_user.dev[0]` to `aws_iam_user.dev[\"alice\"]`."
   ]
  },
  "discussion": [
   "Can you think of resources where it truly does not matter which instance is number 2?",
   "Why does Terraform insist that `for_each` keys be known before apply, while values may be unknown?"
  ],
  "exit": [
   [
    "What types does `for_each` accept?",
    "A map or a set of strings."
   ],
   [
    "With `count` over a list of four names, you remove the first. How many instances does the plan touch?",
    "All four addresses: indexes 0 to 2 change because names shift, and index 3 is destroyed."
   ],
   [
    "In a `for_each` over a map `{ logs = \"private\" }`, what is `each.value`?",
    "\"private\"."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column comparison table of count and for_each with blanks to fill in during the teach segment, and let them keep it during the activity.",
   "Extend: Ask students to convert a module call from count to for_each over a map of objects, including the moved blocks needed so no resources are destroyed."
  ]
 },
 {
  "t": "Explicit dependencies with `depends_on`; `lifecycle` rules: `create_before_destroy`, `prevent_destroy`, `ignore_changes`, `replace_triggered_by`",
  "objectives": [
   "Students will be able to identify when a dependency is hidden and justify the use of `depends_on`.",
   "Students will be able to explain the effect of each of the four lifecycle settings on a plan.",
   "Students will be able to select the right lifecycle setting for an operational scenario.",
   "Students will be able to state the limits of `prevent_destroy` and the literal-values rule for lifecycle settings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to describe a time something failed because a step happened before a prerequisite was ready, then link it to hidden dependencies."
   ],
   [
    15,
    "Teach",
    "Explain implicit versus explicit dependencies with the IAM policy example, then present each lifecycle setting with the problem it solves, writing the four on the whiteboard as problem and solution pairs."
   ],
   [
    15,
    "Activity",
    "Groups solve the scenario cards below and write the matching HCL snippet."
   ],
   [
    5,
    "Discuss",
    "Discuss the risks of overusing depends_on and of relying on prevent_destroy as the only safeguard."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your new laptop's software installer needs the network driver to be installed first, but nothing on the installer's list says so. How would you make sure the order is right?",
  "activity": {
   "title": "Lifecycle scenario cards",
   "materials": "Printed scenario cards (eight short operational problems), blank paper, whiteboard, markers.",
   "steps": [
    "Give each group of three four scenario cards, such as an autoscaler changing desired count, a database that must never be deleted, a certificate that causes downtime when replaced, an app that needs a policy first, and an instance that must rebuild when a template changes.",
    "For each card, the group writes which setting solves it and a short HCL snippet showing it.",
    "Groups swap cards with another group, review the answers, and mark any that use a variable inside lifecycle or misuse depends_on.",
    "The teacher reviews the most debated card with the class and highlights the prevent_destroy limitation."
   ]
  },
  "discussion": [
   "Why might a team still lose a protected database even though it had `prevent_destroy = true`?",
   "What other safeguards besides `prevent_destroy` could protect critical resources?"
  ],
  "exit": [
   [
    "Which setting reduces downtime during replacement?",
    "`create_before_destroy = true`."
   ],
   [
    "Why is `prevent_destroy = var.protect` invalid?",
    "Lifecycle settings are processed early and accept only literal values, not variables."
   ],
   [
    "Give a valid reason to use `depends_on`.",
    "A resource needs another to exist first but does not reference any of its attributes, such as an instance needing an IAM policy attached before its app starts."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching worksheet where students connect each lifecycle setting to a one-line plain-language description before attempting the scenario cards.",
   "Extend: Ask students to design a `terraform_data` trigger so an instance is replaced whenever a rendered startup script changes, and explain how they would review the plan."
  ]
 },
 {
  "t": "Custom conditions: variable `validation`, `precondition` and `postcondition`, and `check` blocks",
  "objectives": [
   "Students will be able to describe the two required parts of every custom condition.",
   "Students will be able to compare validation, precondition, postcondition and check blocks by location, timing and severity.",
   "Students will be able to write a variable validation using functions such as `contains` or `can(regex(...))`.",
   "Students will be able to choose the correct construct for a described assumption."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students where in daily life a mistake is blocked outright and where you only get a warning, such as a card declined versus a low-balance alert."
   ],
   [
    13,
    "Teach",
    "Build a four-column table on the whiteboard (validation, precondition, postcondition, check) with rows for where it lives, when it runs, whether it can use self, and severity. Show one HCL snippet for each."
   ],
   [
    17,
    "Activity",
    "Groups run the assumption triage exercise below and write one condition in HCL."
   ],
   [
    5,
    "Discuss",
    "Discuss which assumptions deserve a hard stop and which a warning."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a form on a website that rejected your input. Was the message helpful? What makes a good error message?",
  "activity": {
   "title": "Assumption triage",
   "materials": "Printed list of ten module assumptions, sticky notes in four colors (one per construct), whiteboard divided into four zones.",
   "steps": [
    "Groups read each assumption, such as an allowed environment name, an AMI architecture, a required public DNS name, or a health endpoint returning 200.",
    "For each one, groups place a colored sticky note in the zone for validation, precondition, postcondition or check, writing the assumption on it.",
    "Each group writes one full condition in HCL for an assumption of their choice, including a helpful error_message.",
    "The class reviews the board; the teacher moves any misplaced notes and explains the timing or severity reason."
   ]
  },
  "discussion": [
   "When could a check block's warning be ignored for too long, and how could a team prevent that?",
   "Why is it useful for a module output to have a precondition?"
  ],
  "exit": [
   [
    "What happens to the run when a check block assertion fails?",
    "Terraform reports a warning and the plan or apply still completes."
   ],
   [
    "Where does a validation block go?",
    "Inside the variable block it checks."
   ],
   [
    "Which construct would ensure a looked-up AMI is x86_64 before launching an instance?",
    "A precondition in the instance's lifecycle block."
   ]
  ],
  "differentiation": [
   "Support: Give students the completed four-column comparison table as a handout and let them triage only five assumptions.",
   "Extend: Ask students to write a check block with a scoped data source and an assert, plus a postcondition using self, and explain how each behaves in plan versus apply."
  ]
 },
 {
  "t": "Sensitive data: `sensitive` values, ephemeral variables and resources, write-only arguments, secrets in state",
  "objectives": [
   "Students will be able to explain what `sensitive = true` protects and what it does not.",
   "Students will be able to compare sensitive values, ephemeral variables and resources, and write-only arguments.",
   "Students will be able to identify where ephemeral values may and may not be used.",
   "Students will be able to recommend controls for protecting state files that contain secrets."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a redacted plan output line reading (sensitive value) and ask students whether the password is safe. Collect a quick show of hands."
   ],
   [
    15,
    "Teach",
    "Explain each feature in order of strength: sensitive for display, ephemeral for not persisting, write-only arguments for resources. Show the ephemeral random_password and password_wo example and explain the version argument."
   ],
   [
    15,
    "Activity",
    "Groups play the auditor role-play below."
   ],
   [
    5,
    "Discuss",
    "Discuss why state must still be protected even when using ephemeral features."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a password is hidden on screen but saved in a file, who could still read it?",
  "activity": {
   "title": "Auditor role-play",
   "materials": "Printed excerpts of a fictional configuration, plan output and a state file snippet showing a password in plain text, printed role cards (auditor, engineer), sticky notes.",
   "steps": [
    "In groups of three, one student is the auditor, one the engineer, and one the note-taker.",
    "The auditor asks where each secret in the configuration excerpt is visible: screen, plan file, state file, version control.",
    "The engineer answers using only the printed material, and the note-taker records each exposure on a sticky note.",
    "The group then redesigns the configuration on paper using an ephemeral resource, a write-only argument with a version, and a protected remote backend, and lists which exposures disappear."
   ]
  },
  "discussion": [
   "What can a state file reveal besides passwords, and why does that matter to an attacker?",
   "How would you rotate a secret that is passed through a write-only argument?"
  ],
  "exit": [
   [
    "Is a value marked sensitive stored in state?",
    "Yes, in plain text; sensitive only redacts CLI output."
   ],
   [
    "What is the main difference between an ephemeral resource and a normal resource?",
    "An ephemeral resource's values are used during the run but never written to plan or state."
   ],
   [
    "What must you change to make Terraform send a new value to a write-only argument?",
    "Its companion version argument."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-row chart (sensitive, ephemeral, write-only) with columns for screen, plan file and state, and have students fill in yes or no for each.",
   "Extend: Ask students to design an end-to-end flow where a secret is generated, sent through a write-only argument, stored in a secrets manager for the application, and rotated, without any copy in state."
  ]
 },
 {
  "t": "Secrets management with HashiCorp Vault and the Vault provider",
  "objectives": [
   "Students will be able to explain how Vault stores, controls, audits and dynamically generates secrets.",
   "Students will be able to describe how the Vault provider authenticates and reads static and dynamic secrets.",
   "Students will be able to explain why secrets read through data sources end up in state and list mitigations.",
   "Students will be able to design a just-in-time credential flow for Terraform runs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students where long-lived keys tend to hide in organizations they know (files, chat messages, CI settings) and why that is risky."
   ],
   [
    12,
    "Teach",
    "Draw Vault in the center of the whiteboard with arrows for policies, audit logs and dynamic secrets. Show the Vault provider configuration via environment variables, the KV data source example, and the dynamic AWS credentials flow. Highlight the state caveat."
   ],
   [
    18,
    "Activity",
    "Groups whiteboard the credential flow redesign described below."
   ],
   [
    5,
    "Discuss",
    "Discuss trade-offs between data sources and ephemeral resources for reading secrets."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A shared password has been on a sticky note for three years. What would you need to replace it with something safer?",
  "activity": {
   "title": "Credential flow redesign",
   "materials": "Whiteboard or large paper per group, markers, a printed fictional scenario describing a static cloud key in a tfvars file.",
   "steps": [
    "Groups read the scenario and list every place the static key currently lives.",
    "Groups draw a new flow: how the pipeline authenticates to Vault, how Terraform obtains short-lived cloud credentials, and how those reach the provider block.",
    "Groups mark with a red marker every place a secret could still be stored, including state, and write one mitigation beside each.",
    "Each group presents its diagram in two minutes while the class checks for hard-coded tokens or unprotected state."
   ]
  },
  "discussion": [
   "If a dynamic credential leaks from a state file an hour after the run, how much damage can it still do?",
   "What are the benefits of managing Vault's own policies and mounts with Terraform?"
  ],
  "exit": [
   [
    "Does reading a secret with a Vault data source keep it out of state?",
    "No. The value read by a normal data source is stored in state."
   ],
   [
    "What is a lease in Vault?",
    "The period a secret is valid before it must be renewed or is revoked."
   ],
   [
    "Name one secure way to give the Vault provider its credentials.",
    "The VAULT_TOKEN environment variable, an auth method such as AppRole, or HCP Terraform dynamic provider credentials."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially drawn flow diagram with blanks for Vault, the provider, the lease and state, and let students fill in labels before drawing their own.",
   "Extend: Ask students to compare a data source, an ephemeral resource and HCP Terraform dynamic provider credentials in a short table covering where secrets persist and how long they remain useful."
  ]
 },
 {
  "t": "Root module vs child modules; a module is any directory of .tf files",
  "objectives": [
   "Students will be able to define a module as any directory of Terraform configuration files.",
   "Students will be able to distinguish the root module from child modules in a given directory layout.",
   "Students will be able to read and write module addresses for resources in nested modules.",
   "Students will be able to explain module encapsulation and how values cross module boundaries."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a repository folder tree and ask students which folders they think Terraform will read when plan runs in environments/prod."
   ],
   [
    12,
    "Teach",
    "Define module, root module and child module. Show that file names are conventions, draw a module tree on the whiteboard, and write the address of a resource at each level."
   ],
   [
    18,
    "Activity",
    "Students build the paper module tree described below and answer address questions."
   ],
   [
    5,
    "Discuss",
    "Discuss the opening scenario: what happened when plan ran inside the child module directory?"
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you open a folder of recipes and one recipe says \"see the sauce recipe\", which recipes are you actually cooking from?",
  "activity": {
   "title": "Paper module tree",
   "materials": "Index cards, string or tape, markers, a printed directory listing of a fictional repository with root and child modules.",
   "steps": [
    "Each group writes one index card per directory in the printed listing and marks which .tf files and module blocks it contains.",
    "Groups arrange and tape the cards into a tree starting from the root module named on the sheet, ignoring directories no module block calls.",
    "Using the tree, groups write the full address of five listed resources, including one in a nested child module.",
    "Groups trace how a value (a subnet ID) travels from a child module to the root, labeling the output and the reference.",
    "The teacher picks two groups to explain why one directory on the sheet is not part of the tree."
   ]
  },
  "discussion": [
   "When does wrapping resources in a module add value, and when does it just add indirection?",
   "Why might a team intentionally run Terraform inside a module directory?"
  ],
  "exit": [
   [
    "What makes a directory a Terraform module?",
    "It contains Terraform configuration files; nothing else is required."
   ],
   [
    "What is the address of aws_instance.app inside a child module named web?",
    "module.web.aws_instance.app."
   ],
   [
    "How does a root module use a value created inside a child module?",
    "The child declares an output, and the root references module.NAME.OUTPUT."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-drawn tree with blank boxes and a word bank of directory names and addresses to place.",
   "Extend: Ask students to design a module layout for three environments sharing two child modules, and write the addresses of resources nested two levels deep."
  ]
 },
 {
  "t": "Module sources: local paths (`./` or `../`), the public Terraform Registry, private registries, Git and HTTP URLs",
  "objectives": [
   "Students will be able to identify local, public registry, private registry and Git module sources from their address format.",
   "Students will be able to write source strings that select a Git subdirectory and pin a ref.",
   "Students will be able to explain when the `version` argument applies and why sources must be literal strings.",
   "Students will be able to recommend a source type based on trust and change-control needs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write four source strings on the whiteboard without labels and ask students to guess where each one fetches code from."
   ],
   [
    12,
    "Teach",
    "Explain each source form with its address shape, the version versus ref distinction, the double-slash subdirectory, and the literal-string rule. Emphasize the leading dot for local paths."
   ],
   [
    18,
    "Activity",
    "Groups run the source address sort and repair exercise below."
   ],
   [
    5,
    "Discuss",
    "Discuss how much to trust public registry modules and how pinning reduces risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you mailed a package with only a room number and no building name, where might it end up?",
  "activity": {
   "title": "Source address sort and repair",
   "materials": "Printed cards with about fifteen source strings (some valid, some broken), whiteboard divided into columns for local, public registry, private registry, Git and broken.",
   "steps": [
    "Groups sort each source card into the right column on the whiteboard.",
    "For each card in the broken column (for example, a missing leading dot, a version argument on a Git source, a source built from a variable), groups write the corrected version.",
    "Groups write one Git source that selects a subdirectory and pins a tag, and one private registry source for a fictional organization.",
    "The class reviews the board together and the teacher explains any misplaced card."
   ]
  },
  "discussion": [
   "What risks come with using a public registry module, and how would you review one before adopting it?",
   "When would a private registry be worth the effort compared with Git sources?"
  ],
  "exit": [
   [
    "What kind of source is `example-corp/network/aws`?",
    "A public Terraform Registry source in NAMESPACE/NAME/PROVIDER form."
   ],
   [
    "How do you pin a Git module source to a tag?",
    "Add a `?ref=` query with the tag, such as `?ref=v1.2.0`."
   ],
   [
    "What does the double slash in `repo.git//modules/vpc` do?",
    "It selects the modules/vpc subdirectory within the repository."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card listing each source shape with one example and let them sort only the valid cards first.",
   "Extend: Ask students to write a short team policy for module sources covering which types are allowed in production, how versions are pinned, and how upgrades are reviewed."
  ]
 },
 {
  "t": "Calling a module with a `module` block and passing input variables",
  "objectives": [
   "Students will be able to write a module block with a source, meta-arguments and input variable values.",
   "Students will be able to explain the one-to-one mapping between module block arguments and child module variables.",
   "Students will be able to diagnose unsupported-argument and missing-required-argument errors.",
   "Students will be able to state when `terraform init` is required after module changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hand out a sample order form with required and optional fields and ask students what happens if they add a field or skip a required one."
   ],
   [
    12,
    "Teach",
    "Show a child module's variables beside a module block that calls it, drawing lines between each argument and its variable. Cover meta-arguments, implicit dependencies through module outputs, and when init is needed."
   ],
   [
    18,
    "Activity",
    "Pairs complete the module call debugging exercise below."
   ],
   [
    5,
    "Discuss",
    "Discuss how to read a module's interface before using it and why module-level depends_on is rarely needed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you fill out an online form, how do you know which fields are required and which are optional?",
  "activity": {
   "title": "Module call debugging",
   "materials": "Printed handout with a child module's variables.tf (some with defaults, some without) and five broken module blocks with their error messages, pens, projector for the answer key.",
   "steps": [
    "Pairs read the child module's variable declarations and highlight every required input.",
    "For each broken module block, pairs match it to its error message (unsupported argument, missing required argument, type mismatch, module not installed) and write the fix.",
    "Pairs write one correct module block that also consumes an output from another module, and state whether init is required after their change.",
    "Two pairs present their fixes while the teacher projects the answer key and explains the implicit dependency created by the module output reference."
   ]
  },
  "discussion": [
   "What makes a module's interface easy or hard to use correctly?",
   "Why might calling the same module twice with different labels be preferable to using count on one module block?"
  ],
  "exit": [
   [
    "What happens if a module variable has no default and the caller does not set it?",
    "Terraform reports an error that a required argument is missing."
   ],
   [
    "Which arguments in a module block are not input variables?",
    "The meta-arguments: source, version, count, for_each, providers and depends_on."
   ],
   [
    "After changing only an input value in an existing module block, do you need terraform init?",
    "No. Plan and apply are enough; init is needed when adding a module or changing its source or version."
   ]
  ],
  "differentiation": [
   "Support: Provide a color-coded version of the handout where required variables are already highlighted, and let students fix three of the five broken blocks.",
   "Extend: Ask students to call one module in two regions using an aliased provider and the providers meta-argument, then write the resulting resource addresses."
  ]
 },
 {
  "t": "Variable scope: child modules only see values passed in; outputs are read as `module.NAME.OUTPUT`",
  "objectives": [
   "Students will be able to explain why a child module cannot read the caller's variables, locals or resources.",
   "Students will be able to pass a value from the root module into a child module by declaring a variable and setting it in the module block.",
   "Students will be able to write correct references of the form module.NAME.OUTPUT, including indexed and keyed instances.",
   "Students will be able to re-export a child module output so it appears in terraform output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up question and take three or four answers. Do not correct them yet; write the guesses on the board to revisit."
   ],
   [
    12,
    "Teach",
    "Draw two boxes on the whiteboard, root and child, with an arrow labeled 'module block arguments' going in and one labeled 'outputs' coming out. Walk through var.region in each scope, the TF_VAR_ rule, module.NAME.OUTPUT syntax with count and for_each, and re-exporting. Show the code example from the lesson."
   ],
   [
    18,
    "Activity",
    "Run the 'Fix the interface' card activity in pairs. Circulate and ask each pair to say aloud which direction each broken value needs to travel."
   ],
   [
    5,
    "Discuss",
    "Bring the class back and use the discussion questions. Return to the warm-up guesses and correct them together."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Your shell has TF_VAR_region set to us-east-1, and a module you call writes var.region. Will the module see us-east-1? Why or why not?",
  "activity": {
   "title": "Fix the interface",
   "materials": "Printed cards, each showing a short broken root and child configuration (prepared by the teacher), whiteboard markers, sticky notes.",
   "steps": [
    "Give each pair four cards. Each card shows a root module and a child module with one interface problem: a child using an undeclared var, a root reaching into a child's resource, a missing re-export, or a wrong reference to a for_each instance.",
    "Pairs write the error they expect Terraform to report on a sticky note and stick it on the card.",
    "Pairs then write the fix directly on the card: the variable block to add, the module block argument, the output block, or the corrected reference.",
    "Each pair draws an arrow on the card showing which direction the value travels: down through the module block or up through an output.",
    "Two pairs swap cards and check each other's fixes, then one pair presents a card to the class."
   ]
  },
  "discussion": [
   "Why might HashiCorp have chosen strict module scope instead of letting child modules read the root's variables automatically?",
   "What are the trade-offs of exposing many outputs from a module versus only a few?"
  ],
  "exit": [
   [
    "Write the expression the root uses to read the db_host output of a module labeled database.",
    "module.database.db_host"
   ],
   [
    "A child module's output does not appear in terraform output. What do you add?",
    "An output block in the root module whose value references the child output, for example output \"db_host\" { value = module.database.db_host }."
   ],
   [
    "Does TF_VAR_env set a child module's env variable? Explain.",
    "No. TF_VAR_ sets root module variables only; the child must declare env and the root must pass it in the module block."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page diagram of the two boxes with arrows labeled 'in: module block arguments' and 'out: outputs', and let them annotate each card against it before writing fixes.",
   "Extend: Ask fast finishers to design the variables.tf and outputs.tf for a reusable database module, justifying which values are inputs, which are outputs and which stay internal."
  ]
 },
 {
  "t": "Passing provider configurations to modules with the `providers` argument",
  "objectives": [
   "Students will be able to explain which provider configurations a child module inherits automatically and which it does not.",
   "Students will be able to write a correct providers map on a module block to pass an aliased configuration.",
   "Students will be able to describe when a module needs configuration_aliases and how the caller satisfies them.",
   "Students will be able to justify why reusable modules should not contain provider blocks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the replica bucket landing in the wrong region. Collect guesses on the board."
   ],
   [
    13,
    "Teach",
    "Project the lesson's code example. Trace the arrow from aws.west in the root to aws inside the module. Explain implicit inheritance, the key/value direction of the providers map, configuration_aliases and legacy module restrictions."
   ],
   [
    17,
    "Activity",
    "Run the 'Route the keys' whiteboard activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, connecting them to separation of duties between platform and application teams."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A root module has two AWS provider blocks, one aliased dr. A module that creates a bucket is called twice, and both buckets end up in the default region. What do you think went wrong?",
  "activity": {
   "title": "Route the keys",
   "materials": "Whiteboard or large paper per group, markers, printed scenario cards prepared by the teacher describing root provider blocks and module needs.",
   "steps": [
    "Give each group a scenario card, such as 'module needs plain aws in eu-west-1' or 'module needs aws.src and aws.dst for replication'.",
    "Groups draw the root module on the left with its provider blocks and the child module on the right with the provider names it uses.",
    "Groups draw arrows for each provider handover, then write the providers map that matches the arrows, plus any configuration_aliases the module must declare.",
    "Groups trade boards with another group and check that each map key is the child's name and each value is the root's configuration.",
    "The teacher picks one board with a common error, such as reversed keys, and corrects it with the class."
   ]
  },
  "discussion": [
   "Why might a platform team want child modules to be unable to choose their own region or account?",
   "What could go wrong when removing a legacy module that contains a provider block, and how would you plan around it?"
  ],
  "exit": [
   [
    "Write the module block argument that makes module \"logs\" use the provider aws.eu.",
    "providers = { aws = aws.eu }"
   ],
   [
    "Which provider configurations does a child module inherit without a providers map?",
    "Only the caller's default, unaliased provider configurations."
   ],
   [
    "Name one restriction on a module that contains its own provider block.",
    "It cannot be used with count, for_each or depends_on (and it is hard to remove because its provider disappears with it)."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank template, providers = { ___ = ___ }, with the labels 'child's name' and 'root's configuration' printed under each blank.",
   "Extend: Ask fast finishers to write a module skeleton for cross-region replication with configuration_aliases, resource-level provider arguments and the matching root module call."
  ]
 },
 {
  "t": "The `version` argument (registry sources only) and `ref` for Git sources",
  "objectives": [
   "Students will be able to choose the correct pinning mechanism (version or ?ref=) for registry, Git and local module sources.",
   "Students will be able to interpret version constraints including =, !=, comparison ranges and the pessimistic operator.",
   "Students will be able to compare tags, branches and commit SHAs as Git refs in terms of stability.",
   "Students will be able to explain why the dependency lock file does not protect module versions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up scenario and ask students to vote on which line caused the surprise replacement."
   ],
   [
    12,
    "Teach",
    "Write three columns on the board: Registry, Git, Local. Fill in the pinning method for each. Then work through ~> 1.4 versus ~> 1.4.0 with a number line, and contrast branch, tag and SHA."
   ],
   [
    18,
    "Activity",
    "Run the 'Pin it or break it' card sort in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect pinning to supply-chain safety."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A Git-sourced module pinned to ?ref=main produced a plan that replaces a load balancer, even though nobody changed your code. How could that happen?",
  "activity": {
   "title": "Pin it or break it",
   "materials": "Printed cards with module blocks (some valid, some invalid) and version-number cards, prepared by the teacher; sticky notes; a projector for the answer key.",
   "steps": [
    "Give each pair a stack of module block cards mixing registry, Git and local sources with version and ref settings.",
    "Pairs sort the cards into 'valid' and 'init fails' piles and write the reason on a sticky note for each invalid card.",
    "For the valid registry cards, pairs receive a set of available version numbers and mark which version init would choose.",
    "For the Git cards, pairs rank the refs from most to least stable and explain the order.",
    "Project the answer key and let pairs score themselves, then discuss any disagreements."
   ]
  },
  "discussion": [
   "When is a loose constraint like ~> 3.0 acceptable, and when should you pin exactly?",
   "Since the lock file does not cover modules, what practices could a team adopt to keep module upgrades controlled?"
  ],
  "exit": [
   [
    "Which argument pins a module from the public Terraform Registry, and which pins a Git module?",
    "The version argument for registry modules; the ?ref= query parameter for Git modules."
   ],
   [
    "Which versions does ~> 2.3 allow?",
    "2.3 and any later 2.x release, but not 3.0."
   ],
   [
    "Does .terraform.lock.hcl pin module versions?",
    "No. It records provider versions and checksums only."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card that lists each source type with its pinning method and a number line showing what ~> 1.4 and ~> 1.4.0 each include.",
   "Extend: Ask fast finishers to draft a short team policy for module pinning in dev versus prod, covering registry constraints, Git refs and how upgrades are reviewed."
  ]
 },
 {
  "t": "`terraform init` or `terraform get` to install modules into `.terraform/modules`",
  "objectives": [
   "Students will be able to identify which configuration changes require terraform init or terraform get.",
   "Students will be able to compare the scope of terraform init and terraform get, including their upgrade flags.",
   "Students will be able to describe the contents of .terraform/modules and explain why the .terraform directory is not committed.",
   "Students will be able to interpret init output and the 'module not installed' error."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the new engineer's error and take a few answers."
   ],
   [
    12,
    "Teach",
    "Project the init output excerpt and annotate each line. Draw the working directory tree on the board showing .terraform/modules, modules.json, the lock file and .gitignore. Contrast init and get, -upgrade and -update."
   ],
   [
    18,
    "Activity",
    "Run the 'Init or not?' change-log sort in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about CI pipelines and caching."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A new teammate clones your repository and runs terraform plan first. It fails saying a module is not installed. What did they skip, and what does that step actually do?",
  "activity": {
   "title": "Init or not?",
   "materials": "Printed change-log cards prepared by the teacher (each describes one edit to a configuration), a two-column sorting mat drawn on the whiteboard, sticky notes.",
   "steps": [
    "Give each group about ten change cards, such as 'added a new module block', 'changed a module input from 2 to 3', 'changed a Git ref from v1.0.0 to v1.1.0', 'cloned the repository onto a new laptop'.",
    "Groups sort cards into 'needs init or get' and 'plan is enough', writing a one-line reason on each.",
    "For cards in the init column, groups note whether plain init is enough or whether -upgrade is needed.",
    "Each group then marks which files in a sample directory listing should be committed and which belong in .gitignore.",
    "Review as a class, focusing on cards where groups disagreed."
   ]
  },
  "discussion": [
   "Why do CI pipelines usually run terraform init at the start of every job instead of caching the .terraform directory in the repository?",
   "What risks could come from committing a .terraform directory created on someone else's machine?"
  ],
  "exit": [
   [
    "Name two jobs that terraform init does that terraform get does not.",
    "Initializing the backend and installing providers."
   ],
   [
    "Where does Terraform store downloaded module code?",
    "In .terraform/modules inside the working directory, with a modules.json manifest."
   ],
   [
    "Does changing a module input value require terraform init?",
    "No. Only adding or removing modules or changing a source or version requires init; input changes are handled by plan."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple flowchart: 'Did you add, remove, or change the source or version of a module? Yes: run init. No: run plan.'",
   "Extend: Ask fast finishers to explain what modules.json records and to predict its contents for a configuration with one registry module, one Git module and one local module."
  ]
 },
 {
  "t": "Using `count` and `for_each` on module blocks",
  "objectives": [
   "Students will be able to write module blocks that use count and for_each, including count as a conditional toggle.",
   "Students will be able to compare how count and for_each instances are addressed and why removing an item behaves differently.",
   "Students will be able to reference outputs from counted and for_each module instances.",
   "Students will be able to identify restrictions: plan-time known values, no mixing of count and for_each, and legacy modules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about removing a middle item from a list. Ask students to predict what Terraform will do."
   ],
   [
    12,
    "Teach",
    "Show count and for_each module blocks side by side. Write the resulting instance addresses on the board. Demonstrate the index-shift problem with a list of three names, then show the same with for_each keys. Cover output references, plan-time limits, legacy modules and moved blocks."
   ],
   [
    18,
    "Activity",
    "Run the 'Shuffle the seats' role-play and address-writing exercise."
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
  "warmup": "You create three module instances with count from the list [\"dev\", \"test\", \"prod\"]. Then you delete \"test\" from the list. What do you think the plan will show for prod?",
  "activity": {
   "title": "Shuffle the seats",
   "materials": "Sticky notes, whiteboard, printed name cards for environments (dev, test, stage, prod) prepared by the teacher.",
   "steps": [
    "Ask four volunteers to stand in a row holding environment name cards. Label their positions 0 to 3 on sticky notes on the board to represent count indexes.",
    "Remove the 'test' volunteer. The class calls out which index each remaining volunteer now has and which instances Terraform would replace.",
    "Repeat with for_each: volunteers are labeled by their name cards instead of numbers. Remove 'test' again and note that only one instance changes.",
    "In pairs, students write the full addresses for each scenario (module.env[1] versus module.env[\"stage\"]) and an output reference for prod in both styles.",
    "Pairs finish by writing a moved block that converts a single module call into a keyed for_each instance."
   ]
  },
  "discussion": [
   "When would count still be the better choice than for_each for a module?",
   "Why must count and for_each values be known at plan time, and how would you work around a value that is only known after apply?"
  ],
  "exit": [
   [
    "Write the address of the 'logs' instance of a for_each module named bucket.",
    "module.bucket[\"logs\"]"
   ],
   [
    "Why can removing an item from the middle of a count-based list cause replacements?",
    "Later items shift to lower indexes, so Terraform treats them as different instances and plans to replace them."
   ],
   [
    "How do you make a module optional with count?",
    "count = var.enabled ? 1 : 0"
   ]
  ],
  "differentiation": [
   "Support: Provide a table with columns 'count' and 'for_each' and rows 'input type', 'address example', 'output reference', 'best for', and let students fill it in during the role-play.",
   "Extend: Ask fast finishers to write a for_each module block over a map of objects (region to CIDR and instance size) and a root output that returns a map of region to endpoint."
  ]
 },
 {
  "t": "Standard module structure: main.tf, variables.tf, outputs.tf, README",
  "objectives": [
   "Students will be able to describe the purpose of main.tf, variables.tf, outputs.tf, README.md and common extras such as versions.tf, modules/ and examples/.",
   "Students will be able to explain that Terraform merges all .tf files regardless of name.",
   "Students will be able to list the public Terraform Registry publishing requirements: repository naming, public GitHub repository, standard structure and semantic version tags.",
   "Students will be able to reorganize a messy module into the standard structure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick show of hands."
   ],
   [
    10,
    "Teach",
    "Project the directory tree from the lesson. Explain each file's role, then the registry rules. Emphasize that names are conventions while registry naming and tags are enforced."
   ],
   [
    20,
    "Activity",
    "Run the 'Tidy the module' card sort in pairs."
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
  "warmup": "If you renamed main.tf to banana.tf, would Terraform still work? Raise your hand for yes or no, and be ready to explain.",
  "activity": {
   "title": "Tidy the module",
   "materials": "Printed cards, each holding one Terraform block (variable, output, resource, terraform block, module call) from a messy module, prepared by the teacher; sheets of paper labeled with standard file names; tape or sticky notes.",
   "steps": [
    "Give each pair a shuffled set of about twelve block cards and five labeled sheets: main.tf, variables.tf, outputs.tf, versions.tf and README.md.",
    "Pairs place each card on the sheet where it belongs, and write a missing description on any variable or output card that lacks one.",
    "Pairs write three or four sentences on the README sheet describing what the module does and one usage example.",
    "Pairs then propose a repository name and first release tag for publishing the module to the public registry.",
    "Two pairs compare layouts and resolve any differences, then the teacher reviews common decisions with the class."
   ]
  },
  "discussion": [
   "If Terraform ignores file names, why do teams and the registry care so much about them?",
   "What makes a module interface easy or hard for another team to use?"
  ],
  "exit": [
   [
    "Which file conventionally holds a module's input variable declarations?",
    "variables.tf"
   ],
   [
    "Does Terraform require specific file names? Explain.",
    "No. It loads and merges every .tf file in the directory; names are conventions."
   ],
   [
    "Name two requirements for publishing a module to the public Terraform Registry.",
    "Any two of: a public GitHub repository named terraform-PROVIDER-NAME, the standard module structure, and semantic version tags such as v1.0.0."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference sheet showing a small, complete module with each file labeled and color-coded, to use while sorting.",
   "Extend: Ask fast finishers to add an examples/basic root configuration and a tests/ directory outline, explaining what each would contain."
  ]
 },
 {
  "t": "The default local backend and the `terraform.tfstate` file, `terraform.tfstate.backup`",
  "objectives": [
   "Students will be able to explain what Terraform state records and why Terraform cannot work without it.",
   "Students will be able to identify where the local backend stores terraform.tfstate, terraform.tfstate.backup and workspace state.",
   "Students will be able to describe the limits of the backup file and the risks of local state for teams.",
   "Students will be able to recommend safe handling practices for state files."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask what Terraform will do on the next plan."
   ],
   [
    12,
    "Teach",
    "Project a short, made-up state file excerpt with fake values. Point out version, serial, lineage, outputs and resources. Show the directory listing from the lesson, then explain the single-step backup, workspace paths and team risks."
   ],
   [
    18,
    "Activity",
    "Run the 'State file detective' excerpt-reading activity in pairs."
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
  "warmup": "An engineer's laptop is reimaged. The code is in Git, and the cloud resources are still running. What happens on the next terraform plan, and why?",
  "activity": {
   "title": "State file detective",
   "materials": "A printed or projected fictional state file excerpt with fake IDs and a fake password, prepared by the teacher; a printed directory listing; highlighters.",
   "steps": [
    "Give each pair the state excerpt. Pairs highlight the serial, lineage, Terraform version and one resource with its ID.",
    "Pairs find and circle any secret stored in plain text, such as the fake database password, and note why sensitive does not remove it.",
    "Show a second excerpt with a higher serial. Pairs decide which file is terraform.tfstate and which is terraform.tfstate.backup, and explain how they know.",
    "Pairs write the .gitignore lines needed to keep state out of Git.",
    "Pairs list two risks of keeping this file only on one laptop and present one to the class."
   ]
  },
  "discussion": [
   "Why is a single-step backup not enough for a production system?",
   "At what point should a team move from the local backend to a remote backend, and what should they look for in one?"
  ],
  "exit": [
   [
    "What is the default file name for local state, and where is it stored?",
    "terraform.tfstate, in the root of the working directory."
   ],
   [
    "How much history does terraform.tfstate.backup keep?",
    "Only one step: the state just before the latest write."
   ],
   [
    "Give one reason not to commit state to Git.",
    "It can contain secrets in plain text, and Git provides no locking, so concurrent changes can conflict."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of a working directory showing each file and a one-line purpose, and pre-highlight the serial field on the excerpt.",
   "Extend: Ask fast finishers to explain how serial and lineage help prevent overwriting newer state and to outline a recovery plan if state were lost."
  ]
 },
 {
  "t": "State locking: why it prevents corruption, which backends support it, `-lock-timeout` and `terraform force-unlock`",
  "objectives": [
   "Students will be able to explain how concurrent writes corrupt state and how locking prevents it.",
   "Students will be able to identify common backends that support locking and the mechanism each uses.",
   "Students will be able to choose between -lock-timeout, -lock=false and terraform force-unlock for a given situation.",
   "Students will be able to read a lock error and decide safely whether a lock is stale."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask two volunteers to 'save' different numbers to the same spot on the whiteboard at the same time to show a lost update. Ask the class what went wrong."
   ],
   [
    12,
    "Teach",
    "Explain automatic locking, walk through the lock error excerpt field by field, list backends and mechanisms on the board, and contrast -lock-timeout, -lock=false and force-unlock."
   ],
   [
    18,
    "Activity",
    "Run the 'Lock desk' triage role-play in groups of three."
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
  "warmup": "Two engineers apply changes to the same state at the same time. Both succeed in the cloud. What do you think the state file looks like afterward?",
  "activity": {
   "title": "Lock desk",
   "materials": "Printed lock-error cards and scenario cards prepared by the teacher (fictional lock IDs, users, times and CI status), a whiteboard decision chart.",
   "steps": [
    "In groups of three, assign roles: on-call engineer, CI system (holds the scenario card with job status), and reviewer.",
    "The on-call engineer reads a lock error card aloud and asks the CI system questions, such as whether any job is running and when the last job ended.",
    "The group chooses an action: wait, add -lock-timeout, contact the lock holder, or run force-unlock with the lock ID. The reviewer writes the chosen command and justification.",
    "Rotate roles and repeat with two more cards, including one where a job is still actively running.",
    "Groups share one decision with the class, and the teacher fills in the decision chart on the whiteboard."
   ]
  },
  "discussion": [
   "Why might a team decide to block -lock=false in its pipelines entirely?",
   "What information would you want before force-unlocking someone else's lock, and where would you find it?"
  ],
  "exit": [
   [
    "What does terraform force-unlock need, and when is it safe to use?",
    "The lock ID from the error; only when you have confirmed no operation is still running."
   ],
   [
    "Which flag makes Terraform wait for a held lock instead of failing immediately?",
    "-lock-timeout, for example -lock-timeout=5m."
   ],
   [
    "Name two backends that support state locking.",
    "Any two of: local, s3, azurerm, gcs, consul, pg, HCP Terraform."
   ]
  ],
  "differentiation": [
   "Support: Provide a simple decision flowchart: 'Is a job running? Yes: wait or use -lock-timeout. No and confirmed: force-unlock with the lock ID.'",
   "Extend: Ask fast finishers to compare s3 locking with a DynamoDB table versus use_lockfile and explain why removing an external dependency is attractive."
  ]
 },
 {
  "t": "The `backend` block inside `terraform {}`: remote backends such as S3, azurerm, gcs, consul and pg",
  "objectives": [
   "Students will be able to place a backend block correctly inside terraform {} in the root module.",
   "Students will be able to match common remote backends (s3, azurerm, gcs, consul, pg) to their storage service, key arguments and locking method.",
   "Students will be able to explain why changes to the backend require terraform init and distinguish .terraform/terraform.tfstate from real state.",
   "Students will be able to recommend safe credential handling for backends."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for 'where should shared state live' on the board."
   ],
   [
    12,
    "Teach",
    "Project the s3 backend example and annotate each argument. Build a table on the board of backends, storage, key arguments and locking. Explain init after changes, the .terraform/terraform.tfstate file and the cloud block."
   ],
   [
    18,
    "Activity",
    "Run the 'Backend matchmaker' card match and write-a-block exercise in pairs."
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
  "warmup": "Your team of five shares one state file by email. List two things that could go wrong, and suggest where the state should live instead.",
  "activity": {
   "title": "Backend matchmaker",
   "materials": "Printed cards prepared by the teacher: backend names, storage services, key arguments and locking mechanisms; blank paper; student laptops with a browser-based text editor (optional).",
   "steps": [
    "Give each pair a shuffled deck of cards and ask them to build rows that match each backend to its storage service, main arguments and locking method.",
    "Pairs check their rows against the board table and fix mismatches.",
    "Each pair receives a scenario (for example, a Google Cloud shop with two configurations) and writes a complete terraform {} block with the right backend and distinct keys or prefixes.",
    "Pairs swap blocks with another pair, who checks placement inside terraform {}, absence of credentials and absence of variables.",
    "The teacher displays two blocks and discusses what init would do next."
   ]
  },
  "discussion": [
   "Why do you think Terraform allows only one backend per configuration?",
   "What features would you require from a remote backend before trusting it with production state?"
  ],
  "exit": [
   [
    "Where must a backend block be written?",
    "Inside the terraform {} block of the root module."
   ],
   [
    "Which backend stores state in a Google Cloud Storage bucket?",
    "gcs"
   ],
   [
    "What is .terraform/terraform.tfstate?",
    "A local file recording the backend configuration for the working directory, not the real infrastructure state."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed backend table with storage services filled in, so students focus on matching arguments and locking.",
   "Extend: Ask fast finishers to compare the cloud block with the s3 backend, listing what HCP Terraform adds beyond state storage."
  ]
 },
 {
  "t": "Backend blocks cannot use variables; partial configuration with `-backend-config`",
  "objectives": [
   "Students will be able to explain why backend blocks cannot use variables, locals or other expressions.",
   "Students will be able to configure partial backend configuration using KEY=VALUE pairs and .tfbackend files with terraform init.",
   "Students will be able to design a multi-environment backend setup that keeps secrets out of code and off disk.",
   "Students will be able to recognize invalid backend blocks in exam-style questions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a backend block with bucket = var.state_bucket and ask whether it will work."
   ],
   [
    12,
    "Teach",
    "Draw Terraform's startup order on the board: read backend, read state, evaluate variables, plan. Show why variables are not yet available. Then demonstrate partial configuration with the lesson's example and discuss where merged values are stored."
   ],
   [
    18,
    "Activity",
    "Run the 'One code, three environments' design exercise in pairs."
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
  "warmup": "A teammate writes bucket = var.state_bucket inside a backend block and sets a default value. Will terraform init accept it? Write down your prediction and one reason.",
  "activity": {
   "title": "One code, three environments",
   "materials": "Whiteboard or paper, markers, printed requirement cards prepared by the teacher (environment names, bucket names, security rules).",
   "steps": [
    "Give each pair a requirement card for dev, staging and prod, including a rule that no credentials may be in the repository.",
    "Pairs write the backend block for the shared code, deciding which values stay in the block and which move to files.",
    "Pairs write the three .tfbackend files and the three terraform init commands a pipeline would run.",
    "Pairs annotate where credentials come from and which local files will contain the merged backend settings.",
    "Pairs exchange designs and check each other's work for any expression in the backend block or any secret in a .tfbackend file."
   ]
  },
  "discussion": [
   "Why might HashiCorp keep this restriction rather than letting backends read variables?",
   "What are the trade-offs between one working directory per environment and reconfiguring a single directory?"
  ],
  "exit": [
   [
    "Why is var.bucket not allowed in a backend block?",
    "The backend is initialized before variables are evaluated, so only literal values are allowed."
   ],
   [
    "Write an init command that loads backend settings from a file named prod.tfbackend.",
    "terraform init -backend-config=prod.tfbackend"
   ],
   [
    "Where are values passed with -backend-config stored locally?",
    "In .terraform/terraform.tfstate and in any saved plan files."
   ]
  ],
  "differentiation": [
   "Support: Provide a template with an empty backend block and a blank .tfbackend file outline listing the argument names, so students fill in values only.",
   "Extend: Ask fast finishers to describe how the cloud block can be configured with TF_CLOUD_ORGANIZATION and TF_WORKSPACE in a pipeline."
  ]
 },
 {
  "t": "Migrating state between backends with `terraform init -migrate-state`",
  "objectives": [
   "Students will be able to perform the steps of a backend migration using terraform init -migrate-state.",
   "Students will be able to contrast -migrate-state with -reconfigure and predict the result of each.",
   "Students will be able to plan safety steps before and after migration, including state backups and a verification plan.",
   "Students will be able to diagnose a failed migration from plan output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about -reconfigure and record predictions on the board."
   ],
   [
    12,
    "Teach",
    "Walk through the migration sequence on the board: edit backend, back up, init -migrate-state, confirm, plan, retire the old location. Project the prompt excerpt. Contrast -reconfigure and -force-copy."
   ],
   [
    18,
    "Activity",
    "Run the 'Migration runbook' sequencing and troubleshooting activity in groups."
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
  "warmup": "You add a new backend block and run terraform init -reconfigure. What will the next terraform plan show if your resources already exist?",
  "activity": {
   "title": "Migration runbook",
   "materials": "Printed step cards (shuffled) and printed fictional plan outputs prepared by the teacher, sticky notes, whiteboard.",
   "steps": [
    "Give each group a shuffled set of step cards, including distractors such as 'run init -reconfigure' and 'delete the old state first'.",
    "Groups arrange the correct steps into a runbook for moving local state to a remote backend and set aside the distractors with a reason on a sticky note.",
    "Hand each group two fictional plan outputs after a migration: one with no changes and one proposing to create everything.",
    "Groups decide which migration succeeded, list likely causes for the failed one and write the recovery steps.",
    "Groups post their runbooks on the wall and do a quick gallery walk to compare."
   ]
  },
  "discussion": [
   "Why might a team still choose -reconfigure in some situations, and how would they avoid the risks?",
   "What should a team do with the old state location after a successful migration, and why?"
  ],
  "exit": [
   [
    "Which init flag copies existing state into a newly configured backend?",
    "-migrate-state"
   ],
   [
    "What does -reconfigure do with existing state?",
    "Nothing; it ignores the old backend settings and copies no state."
   ],
   [
    "Name one step to take before and one step to take after a migration.",
    "Before: back up state with terraform state pull (and stop other runs). After: run terraform plan and confirm no unexpected changes."
   ]
  ],
  "differentiation": [
   "Support: Give students a partly completed runbook with the first and last steps filled in and a two-column chart comparing -migrate-state and -reconfigure.",
   "Extend: Ask fast finishers to write a runbook for migrating multiple CLI workspaces to HCP Terraform, including how workspace names map."
  ]
 },
 {
  "t": "The `cloud` block for HCP Terraform",
  "objectives": [
   "Students will be able to write a cloud block that connects a configuration to an HCP Terraform organization and workspace.",
   "Students will be able to compare workspace selection by name and by tags and explain when to use each.",
   "Students will be able to explain the authentication and initialization steps (terraform login, terraform init, state migration).",
   "Students will be able to distinguish remote, local and agent execution modes and identify the environment variables that override cloud block settings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard under the heading Problems with local state. Point out that each answer is something the cloud block addresses."
   ],
   [
    15,
    "Teach",
    "Project the sample cloud block and annotate each line. Explain organization, workspaces by name versus tags, project and hostname. State the two hard rules: no backend block alongside it and no variables inside it. Walk through terraform login, terraform init and state migration, then the three execution modes."
   ],
   [
    15,
    "Activity",
    "Run the Fix the cloud block card activity in pairs. Circulate and ask pairs to justify each fix aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the cloud block to team workflows and security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Imagine five engineers share one Terraform project and the state file lives on one person's laptop. List everything that could go wrong.",
  "activity": {
   "title": "Fix the cloud block",
   "materials": "Printed cards (one per pair) with six short terraform blocks, some correct and some broken; whiteboard; markers.",
   "steps": [
    "Prepare six cards: a correct cloud block by name, a correct one by tags, one that also contains a backend block, one that uses organization = var.org, one with the cloud block outside terraform {}, and one with both name and tags.",
    "Pairs label each card Valid or Invalid and, for invalid ones, write the corrected version or the rule that is broken.",
    "For the var.org card, pairs must also write the environment variable that would solve the reuse problem (TF_CLOUD_ORGANIZATION).",
    "Each pair presents one card to the class; the teacher confirms the rule and records it on the whiteboard as a class checklist."
   ]
  },
  "discussion": [
   "Why might a security team prefer remote execution mode over local mode for production workspaces?",
   "When would tags be a better choice than a single workspace name, and what new risk does selecting among many workspaces introduce?"
  ],
  "exit": [
   [
    "Which two arguments or blocks does every cloud block need?",
    "organization and a workspaces block (selecting by name or by tags)."
   ],
   [
    "Why can't you write workspaces { name = var.env } in a cloud block, and what can you use instead?",
    "The cloud block is read during init and cannot use variables; set TF_WORKSPACE (and TF_CLOUD_ORGANIZATION if needed) as environment variables."
   ],
   [
    "In local execution mode, what does HCP Terraform still do for you?",
    "It stores the state, with locking and version history, while the runs happen on your machine."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram showing laptop, HCP Terraform workspace and cloud provider, with arrows for remote versus local runs, and let them match each cloud block line to a part of the diagram.",
   "Extend: Ask fast finishers to write the sequence of commands and prompts for migrating an existing project from an S3 backend to a cloud block, and to note what happens to the old state."
  ]
 },
 {
  "t": "Sensitive data in state and protecting remote state (encryption, access control)",
  "objectives": [
   "Students will be able to explain why secrets appear in Terraform state and why sensitive = true does not protect them there.",
   "Students will be able to identify encryption at rest, encryption in transit and access control options for common remote backends.",
   "Students will be able to recommend practices that reduce secrets in state, such as ephemeral values, write-only arguments and dynamic credentials.",
   "Students will be able to compare terraform_remote_state with narrower output-sharing options in terms of exposure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick hand vote: does sensitive = true hide the password from the state file? Record the vote on the board without revealing the answer."
   ],
   [
    12,
    "Teach",
    "Show a short, fictional state excerpt on the projector with a password attribute in plain text. Reveal the vote answer. Explain the defenses in order: where state lives, encryption at rest and TLS, access control, versioning and logging, and reducing secrets. Close with the terraform_remote_state exposure issue."
   ],
   [
    18,
    "Activity",
    "Run the State security audit activity in groups of three, then have each group report its top two findings."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare convenience and security trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "Your Terraform code marks the database password as sensitive. Is that password safe from someone who downloads the state file? Why or why not?",
  "activity": {
   "title": "State security audit",
   "materials": "Printed one-page scenario sheet describing a fictional company's Terraform setup (backend settings, bucket permissions, repository contents, CI log habits); highlighters; whiteboard.",
   "steps": [
    "Hand each group the scenario sheet, which deliberately contains about eight weaknesses (no encrypt setting, broad read access, state file in the repository, versioning off, outputs printed with -raw in public CI logs, terraform_remote_state used for one value, and so on).",
    "Groups highlight every weakness and label it Encryption, Access, Recovery, Exposure or Reduce.",
    "For each weakness, groups write one specific fix, such as encrypt = true with a KMS key or limiting the bucket policy to the deploy role.",
    "Groups rank their fixes by impact and present the top two; the teacher builds a combined checklist on the whiteboard."
   ]
  },
  "discussion": [
   "If developers lose direct read access to state, what workflows do they need instead to stay productive?",
   "Why is reducing the secrets that reach state often more powerful than protecting the state file after the fact?"
  ],
  "exit": [
   [
    "What does sensitive = true actually do?",
    "It redacts the value in CLI output; the value is still stored in plain text in state."
   ],
   [
    "Give one encryption setting and one access-control measure for an S3 backend.",
    "encrypt = true (optionally with kms_key_id) and an IAM or bucket policy limiting access to the deployment role and a few administrators."
   ],
   [
    "Why can terraform_remote_state expose more than intended?",
    "The consumer needs read access to the whole state snapshot, including any secrets, not just the outputs."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-column organizer (Where state lives, Who can read it, What is inside it) and have them sort printed fact cards into the columns before attempting the audit.",
   "Extend: Ask fast finishers to design a sharing approach for three configurations that need each other's outputs without any of them reading another's full state, and to justify their choice."
  ]
 },
 {
  "t": "Resource drift: detecting it with `plan` and `apply -refresh-only`, reconciling configuration",
  "objectives": [
   "Students will be able to explain what drift is and when Terraform detects it.",
   "Students will be able to compare terraform plan, terraform plan -refresh-only and terraform apply -refresh-only in terms of what each changes.",
   "Students will be able to choose the correct reconciliation path (revert with apply or update configuration) for a given drift scenario.",
   "Students will be able to apply ignore_changes appropriately for attributes owned by other processes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students write their answer before sharing. Collect answers on the board."
   ],
   [
    12,
    "Teach",
    "Draw three boxes on the whiteboard: Configuration, State, Real infrastructure. Use arrows to show what a normal plan, a refresh-only plan, a refresh-only apply and a normal apply each read and write. Explain why terraform refresh was deprecated and introduce ignore_changes."
   ],
   [
    18,
    "Activity",
    "Run the Drift decision cards activity in pairs, followed by a quick share-out of the trickiest card."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore process changes that reduce drift."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Someone fixed a production problem by clicking in the cloud console. Terraform's code says something different. Who wins the next time the pipeline runs, and why?",
  "activity": {
   "title": "Drift decision cards",
   "materials": "Printed scenario cards (eight per pair), each describing a drift event and a short plan excerpt; whiteboard with the three-box diagram left visible.",
   "steps": [
    "Give each pair eight cards, such as an emergency port opened, an autoscaler changing capacity, a bucket deleted by hand, tags added by a cost tool, and a misconfigured setting changed by an intern.",
    "For each card, pairs decide: revert with terraform apply, update configuration, add ignore_changes, or investigate first. They write the command or code change they would use.",
    "Pairs mark which cards would still be reverted if someone only ran terraform apply -refresh-only.",
    "The teacher reveals recommended answers and asks pairs that disagreed to explain their reasoning."
   ]
  },
  "discussion": [
   "How could a team give on-call engineers a fast, safe way to make emergency changes without causing drift?",
   "What are the risks of scheduling automatic applies to correct drift, compared with scheduled drift detection and alerts?"
  ],
  "exit": [
   [
    "What does terraform apply -refresh-only change?",
    "Only the state file, to match real infrastructure; it never changes resources."
   ],
   [
    "A manual change should stay. What two steps make that permanent?",
    "Update the configuration to match the change, then run terraform plan to confirm no changes are proposed."
   ],
   [
    "When does Terraform detect drift by default?",
    "During the refresh at the start of terraform plan or terraform apply."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in flowchart (Drift found, Was the change correct? Yes leads to update configuration, No leads to normal apply) that students can follow while working through the cards.",
   "Extend: Ask fast finishers to design a nightly pipeline job that detects drift with terraform plan -detailed-exitcode and describe what it should do for exit codes 0, 1 and 2."
  ]
 },
 {
  "t": "CLI workspaces: `terraform workspace new/select/list`, `terraform.workspace`",
  "objectives": [
   "Students will be able to use terraform workspace new, select, list, show and delete correctly.",
   "Students will be able to explain where workspace state is stored for the local backend and for remote backends.",
   "Students will be able to apply terraform.workspace to avoid naming collisions between workspaces.",
   "Students will be able to evaluate when CLI workspaces are appropriate and when separate configurations or HCP Terraform workspaces are needed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let two or three students explain their idea of a workspace. Note misconceptions on the board to revisit."
   ],
   [
    12,
    "Teach",
    "Project a terminal transcript of workspace commands. Draw the local file layout: terraform.tfstate and terraform.tfstate.d/NAME. Show terraform.workspace in a name and a conditional. Finish with the limits and the difference from HCP Terraform workspaces."
   ],
   [
    18,
    "Activity",
    "Run the Which workspace am I in role-play in groups of three, then debrief the near-misses."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about environment isolation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If you wanted to build a second, temporary copy of an environment from the same Terraform code, what would you need to keep separate so the two copies do not interfere?",
  "activity": {
   "title": "Which workspace am I in",
   "materials": "Printed command cards (terraform workspace new, select, list, show, delete, apply, destroy), a whiteboard grid with columns for each workspace's state, markers.",
   "steps": [
    "One student plays Terraform and keeps the whiteboard grid showing which workspace is current and which resources each workspace's state tracks.",
    "A second student plays the engineer and draws command cards in a scripted order the teacher provides, saying each command aloud.",
    "The third student plays the reviewer and must stop the engineer before any command that would affect the wrong workspace or that Terraform would refuse (such as deleting default or the current workspace).",
    "Rotate roles twice with new scripts, then the class lists every rule the reviewer had to enforce."
   ]
  },
  "discussion": [
   "Why does sharing a backend and credentials make CLI workspaces a weak boundary for production?",
   "What everyday habits, such as showing the workspace in the shell prompt, could prevent mistakes like destroying the wrong workspace?"
  ],
  "exit": [
   [
    "Which command creates a workspace called qa and switches to it?",
    "terraform workspace new qa."
   ],
   [
    "Where does the local backend store the state for the qa workspace?",
    "terraform.tfstate.d/qa/terraform.tfstate."
   ],
   [
    "Give one reason CLI workspaces are not recommended for separating production from development.",
    "They share the same backend, code and usually credentials, so access to one environment's state usually means access to all, and running in the wrong workspace is easy."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page command reference with each workspace command, what it does and one rule (for example, cannot delete default), and let students use it during the role-play.",
   "Extend: Ask fast finishers to sketch a directory and backend layout for dev, staging and prod with separate credentials, and explain where CLI workspaces could still be useful inside it."
  ]
 },
 {
  "t": "Importing existing infrastructure with `import` blocks and generating configuration with `terraform plan -generate-config-out`",
  "objectives": [
   "Students will be able to write an import block with correct to and id arguments.",
   "Students will be able to describe the workflow for generating configuration with terraform plan -generate-config-out.",
   "Students will be able to interpret an import plan and decide whether the configuration matches the real object.",
   "Students will be able to compare import blocks with the terraform import command."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for adopting existing infrastructure on the board."
   ],
   [
    12,
    "Teach",
    "Project an import block and annotate to and id. Show where import ID formats appear in provider documentation. Walk through the five-step workflow with -generate-config-out, emphasizing that the output file must be new and that a clean plan shows imports only."
   ],
   [
    18,
    "Activity",
    "Run the Import plan review activity in pairs and discuss each excerpt."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about ownership and review."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your company has fifty servers built by hand that must now be managed by Terraform without any downtime. What are your options, and what could go wrong?",
  "activity": {
   "title": "Import plan review",
   "materials": "Printed sheet with five short plan output excerpts and matching import blocks; a projector showing the five-step workflow; pens.",
   "steps": [
    "Give pairs five plan excerpts: one clean import, one import plus an unintended update, one import that would replace a resource, one error from a wrong ID format, and one error because the generate-config file already exists.",
    "Pairs decide for each: safe to apply, edit configuration first, fix the import ID, or choose a new output file name.",
    "For the unintended update, pairs write the exact attribute change they would make to the configuration.",
    "Pairs swap sheets with a neighbor and check each other's decisions before the teacher reveals answers."
   ]
  },
  "discussion": [
   "Once an object is imported, who should be allowed to change it outside Terraform, and how do you enforce that?",
   "What review steps would you require before applying generated configuration for production resources?"
  ],
  "exit": [
   [
    "Write the two required arguments of an import block and what each means.",
    "to: the resource address in configuration; id: the provider's identifier for the existing object."
   ],
   [
    "What does terraform plan -generate-config-out=gen.tf do, and what is one rule about gen.tf?",
    "It writes draft HCL for import targets without resource blocks; gen.tf must not already exist."
   ],
   [
    "An import plan shows 1 to import, 1 to change. Is it safe to apply?",
    "Not necessarily; the change would modify the real object. Edit the configuration to match unless the change is intended, then plan again."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in-the-blank import block template and a checklist for the five-step workflow that students can tick off while reading the plan excerpts.",
   "Extend: Ask fast finishers to write an import block that uses for_each over a map of bucket names, and to explain how the generated configuration would need to be reshaped into a single resource with for_each."
  ]
 },
 {
  "t": "The older `terraform import` CLI command",
  "objectives": [
   "Students will be able to state the syntax and prerequisite of the terraform import command.",
   "Students will be able to explain the post-import plan-and-adjust workflow and why it is necessary.",
   "Students will be able to compare the terraform import command with import blocks across review, bulk import and configuration generation.",
   "Students will be able to judge when the older command is still an acceptable choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take quick answers. Write the phrase Import is not create on the board."
   ],
   [
    12,
    "Teach",
    "Show the command syntax with several address forms (plain, count index, for_each key, module path). Explain the prerequisite resource block, the immediate state write and the plan-and-adjust loop. Finish with a comparison table against import blocks."
   ],
   [
    18,
    "Activity",
    "Run the Old way, new way comparison sort in small groups, then review the table together."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about auditability and risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If a command changes Terraform's records instantly, without showing you a preview, what could go wrong in a team of ten engineers?",
  "activity": {
   "title": "Old way, new way comparison sort",
   "materials": "Printed statement cards (about twelve), a two-column chart on the whiteboard labeled terraform import command and import block, tape or sticky notes.",
   "steps": [
    "Hand each group a set of statement cards such as Writes state immediately, Previewed in plan, Can generate configuration, Requires an existing resource block, Supports for_each, Visible in a pull request, Imports one object per run.",
    "Groups place each card under the command, the import block, or both, and tape it to the chart.",
    "Groups then order three workflow cards for the command (write block, import, plan and adjust) and five for import blocks.",
    "The class reviews the chart; the teacher corrects any misplaced cards and asks students to explain why."
   ]
  },
  "discussion": [
   "Why does an immediate state change without a plan make auditing harder for a team using HCP Terraform?",
   "Can you think of a situation where the speed of the old command outweighs the benefits of import blocks?"
  ],
  "exit": [
   [
    "Write the syntax of the terraform import command.",
    "terraform import ADDRESS ID."
   ],
   [
    "What happens if the resource block does not exist when you run terraform import?",
    "The command fails, because it cannot bind the object to an address that is not in the configuration."
   ],
   [
    "Name two advantages import blocks have over the command.",
    "Any two of: previewed in plan, reviewed in version control, bulk import with for_each, configuration generation, applied in a normal run."
   ]
  ],
  "differentiation": [
   "Support: Give students a worked example on paper showing the command, its output and the first post-import plan, with the changed attributes highlighted, and have them write the corrected resource block.",
   "Extend: Ask fast finishers to convert a list of five terraform import commands from an old runbook into equivalent import blocks, using for_each where it fits."
  ]
 },
 {
  "t": "Inspecting state: `terraform state list`, `terraform state show`, `terraform show`, `terraform output`",
  "objectives": [
   "Students will be able to choose between terraform state list, terraform state show, terraform show and terraform output for a given question.",
   "Students will be able to use filters and flags such as an address prefix, -json and -raw appropriately.",
   "Students will be able to explain how sensitive values are handled by each inspection command.",
   "Students will be able to distinguish read-only inspection commands from state-modifying commands."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Emphasize that state should not be opened directly."
   ],
   [
    12,
    "Teach",
    "Project sample outputs of all four commands side by side. For each, state the question it answers. Cover filters, -json, -raw and sensitive handling, then briefly list the state-modifying commands as a contrast."
   ],
   [
    18,
    "Activity",
    "Run the Ask the right command relay in teams, then review the tricky prompts."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about safety and secrets."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You need one value, such as an IP address, from Terraform's records at 3 a.m. Why is opening the state file in an editor a bad idea, and what would you rather do?",
  "activity": {
   "title": "Ask the right command relay",
   "materials": "Printed question cards (fifteen), a projected sample state list and sample state show output, whiteboard divided into four columns for the four commands.",
   "steps": [
    "Divide the class into teams. Each team gets a stack of question cards such as Find the ARN of the web bucket, List everything in the network module, Read a saved plan, Get the database endpoint for a script without quotes.",
    "One student at a time runs to the board and places the card under the correct command column, adding any needed flag or argument.",
    "The next teammate may correct the previous placement before adding their own card.",
    "The teacher reviews the board, awarding points for correct command plus correct flag, and discusses any card that two teams placed differently."
   ]
  },
  "discussion": [
   "Why does terraform show -json need to be treated carefully in CI logs, even though terraform state show redacts sensitive values?",
   "When would you choose an output block over telling colleagues to use terraform state show to find a value?"
  ],
  "exit": [
   [
    "Which command lists every resource address in state?",
    "terraform state list."
   ],
   [
    "How would you see all attributes of module.db.aws_instance.proxy?",
    "terraform state show module.db.aws_instance.proxy."
   ],
   [
    "Which command prints outputs, and does it include child module outputs?",
    "terraform output; it shows root module outputs only, unless the root re-exports child outputs."
   ]
  ],
  "differentiation": [
   "Support: Provide a question-to-command cheat card (addresses, one resource, everything or plan, outputs) for students to use during the relay.",
   "Extend: Ask fast finishers to write a short shell pipeline that finds every resource in a module and prints one attribute for each, using state list and state show."
  ]
 },
 {
  "t": "Refactoring: `moved` blocks and `terraform state mv`",
  "objectives": [
   "Students will be able to explain why changing a resource address causes Terraform to plan a destroy and create.",
   "Students will be able to write moved blocks for renames, module moves and adding count or for_each.",
   "Students will be able to compare moved blocks with terraform state mv in terms of review, repeatability and scope.",
   "Students will be able to verify a refactor by reading a plan for moves and zero destroys."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students predict what the plan will show. Record predictions."
   ],
   [
    12,
    "Teach",
    "Show a rename with no moved block and the resulting destroy-and-create plan. Add a moved block and show the moved plan. Cover module moves, count and for_each indexes, then state mv with -dry-run and its limits."
   ],
   [
    18,
    "Activity",
    "Run the Refactor without a casualty pair exercise, then compare answers on the board."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about module authors and teams."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "If you rename a variable in a normal program, nothing outside the program changes. If you rename a resource in Terraform, what do you think the next plan will show, and why?",
  "activity": {
   "title": "Refactor without a casualty",
   "materials": "Printed before-and-after code pairs (five scenarios), blank paper, whiteboard for sharing answers.",
   "steps": [
    "Give each pair five before-and-after code pairs: a simple rename, moving a bucket into a module, renaming a module call, adding count to a resource, and switching a resource to for_each with keys.",
    "Pairs write the moved block for each scenario on paper, with exact from and to addresses.",
    "For two scenarios, pairs also write the equivalent terraform state mv command and list what extra steps it needs in three environments.",
    "Pairs predict the plan summary for each scenario with their moved blocks; the teacher reveals the expected summaries and pairs check for any missed address."
   ]
  },
  "discussion": [
   "Why are moved blocks especially valuable for authors of shared modules?",
   "When might a team still reach for terraform state mv instead of a moved block?"
  ],
  "exit": [
   [
    "Write a moved block for renaming aws_instance.app to aws_instance.api.",
    "moved { from = aws_instance.app  to = aws_instance.api }"
   ],
   [
    "What does the plan show for a correct refactor?",
    "The objects as moved to their new addresses, with no destroy and create for them."
   ],
   [
    "Give one drawback of terraform state mv compared with moved blocks.",
    "It changes state immediately without a plan, must be run in every environment and leaves no record in version control."
   ]
  ],
  "differentiation": [
   "Support: Provide an address anatomy card (module path, resource type, name, index or key) and color-code the parts that change in each scenario before students write moved blocks.",
   "Extend: Ask fast finishers to plan a refactor that changes a null_resource to terraform_data and another that changes resource type with no provider support, explaining which tools apply to each."
  ]
 },
 {
  "t": "Removing resources from state without destroying them: `removed` blocks and `terraform state rm`",
  "objectives": [
   "Students will be able to explain why deleting a resource block causes Terraform to destroy the object.",
   "Students will be able to write a removed block with lifecycle destroy = false for a resource or module.",
   "Students will be able to compare removed blocks with terraform state rm in terms of preview, repeatability and required follow-up.",
   "Students will be able to plan an ownership transfer between two configurations using removal and import."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Have students vote on what happens when a resource block is deleted, then reveal that Terraform plans a destroy."
   ],
   [
    12,
    "Teach",
    "Draw configuration and state side by side and show how a missing block with a state entry means destroy. Present the removed block with destroy = false and destroy = true, module targeting, then terraform state rm with -dry-run and the need to delete the block."
   ],
   [
    18,
    "Activity",
    "Run the Handover role-play: two groups represent two configurations transferring a bucket, then switch roles with a new resource."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about orphaned resources."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If you delete a resource block from your Terraform code and run apply, what happens to the real resource? What if you only wanted Terraform to stop managing it?",
  "activity": {
   "title": "Handover role-play",
   "materials": "Sticky notes representing state entries, two whiteboard areas labeled Config A and Config B (each with Code and State columns), printed step cards.",
   "steps": [
    "Place a sticky note for a bucket in both the Code and State columns of Config A. Group A must transfer it to Group B without ever destroying it.",
    "Group A chooses a removal method (removed block or state rm), writes the code or command on the board and moves the sticky notes accordingly, narrating what the plan would say.",
    "Group B writes the import block and resource block, moves sticky notes into Config B, and narrates the plan they expect (import only).",
    "The class checks for errors such as leaving the block in Config A after state rm or both configurations managing the bucket at once; then groups swap roles with a module instead of a single resource."
   ]
  },
  "discussion": [
   "What processes should a team follow so that forgotten resources do not become orphaned and keep costing money?",
   "Why might a team choose destroy = true in a removed block instead of simply deleting the resource block?"
  ],
  "exit": [
   [
    "Write a removed block that forgets aws_instance.legacy without destroying it.",
    "removed { from = aws_instance.legacy  lifecycle { destroy = false } }"
   ],
   [
    "Which command forgets a resource immediately, and what follow-up is required?",
    "terraform state rm ADDRESS; you must also delete the resource block so the next plan does not create a new object."
   ],
   [
    "In what order do you move a resource from configuration A to configuration B?",
    "Remove it from A's state (removed block with destroy = false or state rm, deleting the block), then import it into B with an import block and matching resource block."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision card: Want the object gone? Delete the block. Want Terraform to forget it? removed block with destroy = false, or state rm plus delete the block. Students use it during the role-play.",
   "Extend: Ask fast finishers to write the full set of code changes for transferring an entire module of resources from one configuration to another, including import blocks with for_each where appropriate."
  ]
 },
 {
  "t": "Verbose logging with `TF_LOG` (TRACE, DEBUG, INFO, WARN, ERROR, JSON), `TF_LOG_PATH`, `TF_LOG_CORE` and `TF_LOG_PROVIDER`",
  "objectives": [
   "Students will be able to list the TF_LOG levels in order of verbosity and explain the JSON option.",
   "Students will be able to configure TF_LOG_PATH correctly and explain its dependency on a log level.",
   "Students will be able to choose between TF_LOG_CORE and TF_LOG_PROVIDER for a given troubleshooting scenario.",
   "Students will be able to describe the security and performance precautions for verbose logs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas. Point out that Terraform has no debug flag and logging is environment-driven."
   ],
   [
    12,
    "Teach",
    "Write the five levels vertically on the board from TRACE to ERROR and add JSON beside TRACE. Explain TF_LOG_PATH, appending and its dependency on a level. Draw Terraform core and a provider plugin as two boxes and map TF_LOG_CORE and TF_LOG_PROVIDER to each. Finish with security and cleanup."
   ],
   [
    18,
    "Activity",
    "Run the Set the dials activity in pairs, using scenario cards and a shared answer sheet."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about logs in shared pipelines."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "When a program fails with a vague message, what extra information would help you find the cause, and what risks come with collecting it?",
  "activity": {
   "title": "Set the dials",
   "materials": "Printed scenario cards (eight), printed dial sheets showing TF_LOG, TF_LOG_CORE, TF_LOG_PROVIDER and TF_LOG_PATH with blanks, pens; projector for the answer key.",
   "steps": [
    "Give each pair eight scenarios, such as a provider permissions error, a suspected core crash, logs needed for a log analysis tool, a file that never appears, and a log that must not include core messages.",
    "For each scenario, pairs fill in the dial sheet with the variables they would set and the values, leaving unneeded ones blank.",
    "Pairs add one precaution per scenario, such as redact before sharing, delete the file or unset afterwards.",
    "The teacher projects the answer key; pairs score themselves and discuss any differences, such as DEBUG versus TRACE choices."
   ]
  },
  "discussion": [
   "How should a team handle verbose Terraform logs in a CI system where many people can read job output?",
   "Why might it be better to start with DEBUG on one component rather than TRACE on everything?"
  ],
  "exit": [
   [
    "List the TF_LOG levels from most to least verbose.",
    "TRACE, DEBUG, INFO, WARN, ERROR (JSON gives TRACE detail in JSON format)."
   ],
   [
    "You set only TF_LOG_PATH=out.log. What happens?",
    "Nothing is logged; a level must also be set with TF_LOG, TF_LOG_CORE or TF_LOG_PROVIDER."
   ],
   [
    "Which variable would you set to see API calls made by a provider without core noise?",
    "TF_LOG_PROVIDER, leaving TF_LOG_CORE unset."
   ]
  ],
  "differentiation": [
   "Support: Provide a laminated reference card listing each variable, its purpose and an example value, and pair struggling students with the card while filling in the dial sheets.",
   "Extend: Ask fast finishers to write a short pipeline step that enables provider logging only when a job fails and rerun is requested, writes to a restricted file and cleans up afterwards, described in plain steps."
  ]
 },
 {
  "t": "When to use logs: provider errors, crashes and bug reports",
  "objectives": [
   "Students will be able to classify a Terraform problem as a language, state, core or provider issue.",
   "Students will be able to decide when logs are needed and which component to log.",
   "Students will be able to list the contents of a good bug report, including terraform version output and a minimal reproduction.",
   "Students will be able to explain how to redact and handle logs safely before sharing them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into two columns on the board: needs logs and does not need logs."
   ],
   [
    12,
    "Teach",
    "Introduce the four troubleshooting areas with one example each. Explain why logs matter most for provider errors and crashes, where to report core versus provider crashes, and the parts of a good bug report. Demonstrate the start-narrow logging approach."
   ],
   [
    18,
    "Activity",
    "Run the Triage desk card sort in groups of three, then have each group draft one bug report outline."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about public reports and redaction."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Think of the last confusing error you saw in any program. How did you decide whether it was your mistake or the program's bug?",
  "activity": {
   "title": "Triage desk card sort",
   "materials": "Printed error cards (ten) with short error messages or descriptions, four labeled areas on the whiteboard (Language, State, Core, Provider), sticky notes, a printed bug report template.",
   "steps": [
    "Groups receive ten error cards, such as an unsupported argument on a specific line, a resource showing changes after every apply, an access denied error with no detail, a panic in a provider plugin, and a state lock that cannot be acquired.",
    "Groups place each card under the right area and write on a sticky note whether logs are needed and which variable they would set.",
    "Each group picks one crash card and fills in the bug report template: versions command, minimal configuration outline, expected and actual behavior, log settings and what to redact.",
    "Groups present their bug report outline; the class checks it for missing items and for any secrets that should have been removed."
   ]
  },
  "discussion": [
   "What kinds of information might appear in a trace log that you would not want in a public issue tracker?",
   "Why does building a minimal reproduction often solve the problem before you even file a report?"
  ],
  "exit": [
   [
    "Name the four troubleshooting areas and the two where logs help most.",
    "Language, state, core, provider; logs help most with core and provider problems."
   ],
   [
    "Where should a crash in a cloud provider plugin be reported?",
    "To that provider's maintainers, not the Terraform core project."
   ],
   [
    "List three things to include in a Terraform bug report.",
    "Any three of: terraform version output (Terraform and provider versions), a minimal reproducing configuration, expected and actual behavior, commands run, a redacted TRACE log."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart (Is there a file and line? Language error. Does output mention changes outside Terraform? State. Did something crash? Check whether core or provider. Vague API error? Provider logs.) to guide the card sort.",
   "Extend: Ask fast finishers to take a provided 20-line fictional configuration and reduce it to a minimal reproduction for a described provider bug, explaining each removal."
  ]
 },
 {
  "t": "Reviewing outputs and dependencies with `terraform output -json` and `terraform graph`",
  "objectives": [
   "Students will be able to explain the structure of terraform output -json results, including the value, type and sensitive fields.",
   "Students will be able to choose between terraform output, -raw and -json for a given scripting need.",
   "Students will be able to interpret a terraform graph excerpt and identify implicit and explicit dependencies.",
   "Students will be able to describe the security risk of sensitive values in JSON output and how to handle it in a pipeline."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers on the whiteboard. Steer the class toward two needs: passing values to other tools and understanding build order."
   ],
   [
    12,
    "Teach",
    "Project a sample terraform output -json result and walk through value, type and sensitive. Contrast it with the default view showing <sensitive> and with -raw for a single string. Then project a short DOT excerpt and explain nodes, edges, implicit references and depends_on. Say clearly: JSON reveals secrets, graph prints DOT, neither changes anything."
   ],
   [
    18,
    "Activity",
    "Run the Dependency Detective activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions. Ask pairs to share one surprising edge they found and one place where outputs could leak."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or sticky notes and hand them in."
   ]
  ],
  "warmup": "Your deployment script needs the IP address Terraform just created. List every way you can think of to get it there, and say which ways could go wrong.",
  "activity": {
   "title": "Dependency Detective",
   "materials": "Printed handout with a short Terraform configuration (a VPC, subnet, security group, two instances and an output block with one sensitive output), its terraform output -json result and a matching DOT excerpt; whiteboard; markers.",
   "steps": [
    "Give each pair the handout. Ask them to read the configuration and draw, by hand, the arrows they expect between resources, marking each as implicit (from a reference) or explicit (from depends_on).",
    "Have them compare their drawing with the printed DOT excerpt and circle any edges they missed or added.",
    "Ask each pair to write the exact command they would use to get the list of subnet IDs into a shell loop, and the command to get the single web IP without quotes.",
    "Point to the sensitive output in the JSON. Each pair writes two rules for handling the outputs file safely in a CI pipeline.",
    "Two pairs present their graph on the whiteboard; the class agrees on the creation order and the destruction order."
   ]
  },
  "discussion": [
   "When would you rather hand values between stages using terraform output -json, and when would remote state or a data source be a better fit?",
   "How could a graph help you explain to a reviewer why a small change causes several resources to be replaced?"
  ],
  "exit": [
   [
    "Which flag prints a list output as machine-readable data: -raw or -json?",
    "-json; -raw only works for primitive values such as strings and numbers."
   ],
   [
    "What does terraform output -json do with a sensitive output?",
    "It prints the real value in plain text with a sensitive flag set to true."
   ],
   [
    "What format does terraform graph print, and how do you turn it into a picture?",
    "DOT; render it with a Graphviz tool such as dot -Tsvg."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed dependency drawing with two arrows filled in, and a reference card listing terraform output, -raw and -json with one example each.",
   "Extend: Ask fast finishers to explain how Terraform uses the graph to decide which resources can be created in parallel, and to propose how they would keep the outputs file out of build logs."
  ]
 },
 {
  "t": "HCP Terraform (formerly Terraform Cloud): remote state, remote runs, a free tier and paid tiers",
  "objectives": [
   "Students will be able to identify HCP Terraform, Terraform Cloud and Terraform Enterprise and explain how they relate.",
   "Students will be able to explain the benefits of remote state and remote runs compared with local workflows.",
   "Students will be able to classify features as core workflow or governance and relate them to free and paid tiers without relying on prices.",
   "Students will be able to recommend HCP Terraform or Terraform Enterprise for a described organization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List the pain points students name on the whiteboard in a column titled Local Terraform problems."
   ],
   [
    12,
    "Teach",
    "Explain the naming (Terraform Cloud became HCP Terraform; Terraform Enterprise is self-hosted). Walk through remote state (encryption, locking, version history, sharing) and remote runs (workers, agents, shared logs, credentials, queuing). Then sketch the feature list and explain that tiers differ, stressing that prices and limits change."
   ],
   [
    18,
    "Activity",
    "Run the Feature Sort card activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, connecting answers back to the pain points from the warm-up."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Imagine five engineers all running Terraform from their own laptops against the same production account. What could go wrong?",
  "activity": {
   "title": "Feature Sort",
   "materials": "Printed cards, one per feature (remote state, state locking, state version history, remote runs, agents, VCS integration, private registry, team permissions, Sentinel and OPA policies, run tasks, drift detection, dynamic credentials); three short organization scenario cards; whiteboard.",
   "steps": [
    "Groups sort the feature cards into two piles: core workflow and governance or operations at scale.",
    "Groups then match each card from the warm-up pain-point list to the feature that fixes it, taping cards beside the pain points on the whiteboard.",
    "Hand each group a scenario card (a three-person startup, a mid-size company with many teams, a bank that bans SaaS tools) and ask them to recommend HCP Terraform free tier, a paid tier or Terraform Enterprise, with one sentence of reasoning.",
    "Each group presents its recommendation; the teacher corrects any confusion between paid tiers and Terraform Enterprise."
   ]
  },
  "discussion": [
   "What work does HCP Terraform remove from a team compared with building its own remote backend and pipeline?",
   "Why might an exam avoid asking about specific prices or limits, and what should you learn instead?"
  ],
  "exit": [
   [
    "What was HCP Terraform previously called?",
    "Terraform Cloud."
   ],
   [
    "What is Terraform Enterprise?",
    "The self-hosted distribution of HCP Terraform that an organization runs on its own infrastructure."
   ],
   [
    "Give one benefit of remote state and one benefit of remote runs.",
    "Remote state: secure storage with locking and version history. Remote runs: shared logs and credentials kept in the workspace rather than on laptops."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference sheet listing remote state benefits and remote run benefits so struggling students can sort cards against it.",
   "Extend: Ask fast finishers to explain when HCP Terraform agents are needed and how a team might move from a bucket backend to HCP Terraform without losing state."
  ]
 },
 {
  "t": "Connecting the CLI: `terraform login` and the `cloud` block (organization, workspaces by name or tags)",
  "objectives": [
   "Students will be able to explain how terraform login obtains and stores an API token and the security implications of the credentials file.",
   "Students will be able to configure authentication for automation using TF_TOKEN_ environment variables.",
   "Students will be able to write a cloud block that maps to one workspace by name or to several by tags.",
   "Students will be able to describe what terraform init does after a cloud block is added, including state migration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers. Point out the two separate needs: identity and destination."
   ],
   [
    12,
    "Teach",
    "Walk through terraform login, the credentials file location and plain-text storage, terraform logout, and the TF_TOKEN_ variable naming rule. Then project two cloud blocks, one with name and one with tags, and explain workspace list, select and new. Close with terraform init, migration and the TF_CLOUD_ environment variables."
   ],
   [
    18,
    "Activity",
    "Run the Fix the Config pair activity."
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
  "warmup": "When you sign in to a website on your phone and on a smart TV, how do the two sign-ins differ? Which one is more like a CI pipeline?",
  "activity": {
   "title": "Fix the Config",
   "materials": "Printed sheet with five short broken snippets (a cloud block with both name and tags, a CI script calling terraform login, a variable written TF_TOKEN_app.terraform.io, a block missing organization with no TF_CLOUD_ORGANIZATION set, and a block pointing at Enterprise without hostname); pens; projector.",
   "steps": [
    "Pairs read each snippet and write what error or problem it would cause.",
    "Pairs rewrite each snippet so it works, choosing the right authentication method for people versus pipelines.",
    "For the tags snippet, pairs write the commands a developer would use to list, select and create workspaces.",
    "Project each snippet and invite a different pair to present their fix; discuss alternatives such as supplying values through environment variables."
   ]
  },
  "discussion": [
   "Why is a team token or service account better than a personal token for a pipeline?",
   "When would you choose name over tags in the cloud block, and what does each choice imply about how many environments a configuration serves?"
  ],
  "exit": [
   [
    "Where does terraform login store the token, and is it encrypted?",
    "In credentials.tfrc.json in the user's Terraform directory, in plain text."
   ],
   [
    "What environment variable would supply a token for app.terraform.io in CI?",
    "TF_TOKEN_app_terraform_io."
   ],
   [
    "Can a cloud block's workspaces block set both name and tags?",
    "No; use name for one workspace or tags for many."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram showing the token flow from browser to credentials file to CLI, and a template cloud block with blanks to fill in.",
   "Extend: Ask fast finishers to design a pipeline that applies to three environments from one configuration using only environment variables and an empty cloud block."
  ]
 },
 {
  "t": "Workflows: VCS-driven, CLI-driven and API-driven runs",
  "objectives": [
   "Students will be able to describe how VCS-driven, CLI-driven and API-driven workflows start runs.",
   "Students will be able to explain what a speculative plan is and when it occurs.",
   "Students will be able to choose the appropriate workflow for a described team.",
   "Students will be able to explain why a VCS-connected workspace rejects CLI applies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch three arrows on the whiteboard labeled repository, terminal and API, all pointing to a box labeled run."
   ],
   [
    12,
    "Teach",
    "Explain each workflow in turn. For VCS, draw push versus pull request and show the speculative plan status check. For CLI, project the streaming output and explain Ctrl-C. For API, list the steps: tarball, configuration version, upload, create run. End with the CLI apply rule for VCS workspaces."
   ],
   [
    18,
    "Activity",
    "Run the Workflow Match role-play in groups of three."
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
  "warmup": "Name three different ways a restaurant can receive an order. Does the kitchen cook the food differently depending on how the order arrived?",
  "activity": {
   "title": "Workflow Match",
   "materials": "Printed team profile cards (six short descriptions of teams and their habits), printed event cards (push to main, open pull request, terraform plan in terminal, terraform apply in terminal on a VCS workspace, script uploads a tarball), whiteboard.",
   "steps": [
    "Each group draws two team profile cards and decides which workflow each team should use, writing one sentence of reasoning.",
    "Groups then draw event cards and, for a VCS-connected workspace, predict what happens: real run, speculative plan, rejection or nothing.",
    "One student in each group plays HCP Terraform and must announce the result of each event; the others check it against the lesson notes.",
    "Groups share their trickiest card with the class, and the teacher records the correct outcomes on the whiteboard."
   ]
  },
  "discussion": [
   "What are the trade-offs between the control of the API-driven workflow and the simplicity of the VCS-driven workflow?",
   "How does a speculative plan on a pull request change the conversation during code review?"
  ],
  "exit": [
   [
    "What starts a real run in a VCS-driven workspace?",
    "A commit landing on the tracked branch, such as a push or a merged pull request."
   ],
   [
    "What does a CLI-driven terraform plan do with your local files?",
    "Uploads them to HCP Terraform, where the plan runs remotely and streams output back."
   ],
   [
    "Which workflow would you choose for a team whose own CI/CD system must orchestrate runs?",
    "The API-driven workflow."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-column table with the trigger, source of truth and typical team for each workflow already partly filled in.",
   "Extend: Ask fast finishers to list, in order, the API operations an external tool must perform to start a run, and what it must handle that the VCS workflow handles automatically."
  ]
 },
 {
  "t": "Workspaces: each holds its own state, variables, run history and permissions",
  "objectives": [
   "Students will be able to list what each HCP Terraform workspace holds separately: state, variables, run history, settings and permissions.",
   "Students will be able to compare HCP Terraform workspaces with CLI workspaces and explain which is suitable for environment isolation.",
   "Students will be able to use run history to answer an audit question about a change.",
   "Students will be able to explain how workspaces share outputs and trigger downstream runs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers about what makes accounts separate."
   ],
   [
    12,
    "Teach",
    "Draw a workspace as a box with four compartments: state, variables, run history, permissions and settings. Then draw a single backend with three CLI workspaces sharing one lock and key. Explain remote state sharing and run triggers as controlled doors between boxes."
   ],
   [
    18,
    "Activity",
    "Run the Audit Trail activity with printed run records."
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
  "warmup": "If you and a sibling shared one bank login with two savings pots, versus each having your own account, what could go wrong in the shared setup?",
  "activity": {
   "title": "Audit Trail",
   "materials": "Printed mock run history cards for two workspaces (firewall-dev and firewall-prod), each card showing a run trigger, commit message, plan summary, approver and time; a printed auditor question sheet; sticky notes.",
   "steps": [
    "Groups receive the run cards shuffled together and must first sort them into the correct workspace using the details on each card.",
    "Groups answer the auditor's questions: who changed the production rule, which commit introduced it, who approved it and when.",
    "Groups write on sticky notes which workspace settings they would set differently for prod and dev (auto-apply, team access, execution mode) and post them on the whiteboard.",
    "The class discusses which of their answers would have been impossible with CLI workspaces on a shared backend."
   ]
  },
  "discussion": [
   "How would you decide how to split infrastructure into workspaces: by component, by environment, or both?",
   "What risks come with enabling remote state sharing to the whole organization?"
  ],
  "exit": [
   [
    "What four kinds of things does each HCP Terraform workspace keep separately?",
    "State, variables, run history, and permissions and settings."
   ],
   [
    "What does a CLI workspace separate?",
    "Only the state, within the same backend and its access controls."
   ],
   [
    "Where would you look to find who approved a production apply last month?",
    "The production workspace's run history."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled workspace diagram with the four compartments and a one-line description of each to use during the activity.",
   "Extend: Ask fast finishers to design a workspace layout for three components across three environments, including which workspaces share outputs and which run triggers they would add."
  ]
 },
 {
  "t": "Projects: grouping workspaces and assigning team access at the project level",
  "objectives": [
   "Students will be able to describe the HCP Terraform hierarchy of organization, projects and workspaces.",
   "Students will be able to explain how project-level team access applies to current and future workspaces.",
   "Students will be able to design a project layout that delegates workspace management to teams using least privilege.",
   "Students will be able to identify how the cloud block or TF_CLOUD_PROJECT places new workspaces in a project."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of shared folders or keycard floors."
   ],
   [
    12,
    "Teach",
    "Draw the hierarchy on the whiteboard: organization at the top, projects below, workspaces inside projects, teams on the side with arrows to each level. Explain the default project, project-level access, project admin, custom permissions, project-scoped variable sets and policy sets, and the project argument in the cloud block."
   ],
   [
    18,
    "Activity",
    "Run the Org Chart Builder whiteboard design activity."
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
  "warmup": "At school or work, how do you share a set of files with a group so new files are shared automatically?",
  "activity": {
   "title": "Org Chart Builder",
   "materials": "Printed scenario sheet describing a fictional company with four teams and twelve workspaces, sticky notes in three colors (projects, workspaces, teams), whiteboard space per group.",
   "steps": [
    "Groups read the scenario and write each workspace on a sticky note.",
    "Groups create project sticky notes and place every workspace into exactly one project, justifying the grouping.",
    "Groups attach team sticky notes to projects with a permission level (read, write or admin) so each team has only what it needs.",
    "The teacher announces two changes (a new service launches; a contractor team leaves) and groups show how their design handles each with one change.",
    "Groups do a quick gallery walk and leave one comment on another group's design."
   ]
  },
  "discussion": [
   "Should projects be organized by team, by application or by environment? What changes with each choice?",
   "How do projects help reduce the risk of forgotten permissions?"
  ],
  "exit": [
   [
    "What does an HCP Terraform organization contain?",
    "Projects, workspaces inside those projects, teams and organization settings."
   ],
   [
    "If a team has write access on a project and a new workspace is created in it, does the team have access to the new workspace?",
    "Yes; project-level access covers current and future workspaces in the project."
   ],
   [
    "How can you make terraform init create new workspaces in a specific project?",
    "Set the project argument in the cloud block or the TF_CLOUD_PROJECT environment variable."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-drawn hierarchy template with labeled boxes for organization, project and workspace to fill in during the activity.",
   "Extend: Ask fast finishers to add project-scoped variable sets and policy sets to their design and explain how production rules would differ from sandbox rules."
  ]
 },
 {
  "t": "Variables and variable sets; Terraform vs environment variables; sensitive variables",
  "objectives": [
   "Students will be able to distinguish Terraform variables from environment variables and choose the correct category for a value.",
   "Students will be able to explain what marking a variable sensitive does and does not protect.",
   "Students will be able to apply variable sets at workspace, project and organization scope.",
   "Students will be able to determine which value wins when a key is defined in several places."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of filling blanks versus setting the environment."
   ],
   [
    12,
    "Teach",
    "Project a sample workspace variables table. Explain the two categories with examples, the HCL option, sensitive write-only behavior and its limit with state, variable set scopes and the precedence order with priority sets on top."
   ],
   [
    18,
    "Activity",
    "Run the Variable Triage card sort and precedence puzzles."
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
  "warmup": "If a recipe says add X cups of flour, and the oven needs to be at a certain temperature, which of those is part of the recipe and which is part of the kitchen?",
  "activity": {
   "title": "Variable Triage",
   "materials": "Printed cards listing values (cloud access key, region input variable, TF_LOG level, a list of CIDR blocks, an API token, TF_VAR_env, a database password used by a resource), three printed precedence puzzles, whiteboard.",
   "steps": [
    "Groups sort each value card into Terraform variable or environment variable, and mark which should be sensitive and which need the HCL option.",
    "Groups decide for each card whether it belongs in a workspace variable or a variable set, and at which scope.",
    "Groups solve the precedence puzzles, each showing one key defined in two or three places, and write which value wins and why.",
    "The teacher reviews answers on the whiteboard, highlighting the credential category mistake and the priority set exception."
   ]
  },
  "discussion": [
   "What risks remain even after a secret is stored as a sensitive variable?",
   "When would an administrator want a priority variable set, and what could go wrong if it is overused?"
  ],
  "exit": [
   [
    "Where should an AWS secret access key be stored in an HCP Terraform workspace?",
    "As a sensitive environment variable, ideally in a variable set."
   ],
   [
    "What happens when you try to view a sensitive variable after saving it?",
    "You cannot; it is write-only and can only be replaced or deleted."
   ],
   [
    "Which beats a workspace variable: an ordinary global variable set or a priority variable set?",
    "A priority variable set; ordinary sets lose to workspace variables."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart that asks: does the code declare it? Does a provider or Terraform itself read it from the environment? Is it secret?",
   "Extend: Ask fast finishers to design a credential rotation plan for fifty workspaces across three projects using variable sets, then explain how dynamic provider credentials would remove the need for rotation."
  ]
 },
 {
  "t": "Collaboration and governance: teams and permissions, run approvals, policy as code (Sentinel and OPA), private registry",
  "objectives": [
   "Students will be able to describe team permission levels and apply least privilege to a production workspace.",
   "Students will be able to explain how run approvals and auto-apply affect when an apply happens.",
   "Students will be able to compare Sentinel and OPA enforcement levels and predict the outcome of a failed policy check.",
   "Students will be able to explain how the private registry supports reuse of approved modules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the controls students suggest."
   ],
   [
    12,
    "Teach",
    "Present the four areas in order: teams and permission levels, run approvals and auto-apply, policy as code with Sentinel and OPA and their enforcement levels, and the private registry with its source address format. Project the policy check excerpt and talk through what each enforcement level would do."
   ],
   [
    18,
    "Activity",
    "Run the Governance Gate role-play."
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
  "warmup": "If you ran a shared workshop with power tools, what rules would you set about who can use which tool, and how would you check that safety rules are followed every time?",
  "activity": {
   "title": "Governance Gate",
   "materials": "Printed run cards each describing a planned change (for example a bucket without tags, a public bucket, an oversized instance) and which policies apply at which level; role badges made from sticky notes (engineer, team lead with override rights, owner); whiteboard.",
   "steps": [
    "Assign roles in groups of four: one engineer, one team lead with policy override permission, one owner, and one narrator who plays HCP Terraform.",
    "The narrator reads a run card, announces the plan result and the policy results, and states which enforcement level each failing policy has.",
    "The engineer and team lead decide what can happen next: continue, override, or fix the code. The owner checks whether the decision is allowed by the enforcement level.",
    "After four cards, groups write a least-privilege permission plan for a production workspace on the whiteboard.",
    "The class compares answers, focusing on any card where someone tried to override a hard-mandatory policy."
   ]
  },
  "discussion": [
   "When is advisory enforcement useful, given that it never blocks a run?",
   "How does a private registry module that is secure by default reduce the number of policy failures teams see?"
  ],
  "exit": [
   [
    "When do policy checks run in an HCP Terraform run?",
    "After the plan and before the apply."
   ],
   [
    "What is the difference between soft-mandatory and hard-mandatory?",
    "Soft-mandatory failures can be overridden by an authorized user; hard-mandatory failures cannot be overridden."
   ],
   [
    "What source format do consumers use for a module from the private registry?",
    "app.terraform.io/ORG/NAME/PROVIDER with a version constraint."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing the four permission levels and the Sentinel and OPA enforcement levels with one-line meanings.",
   "Extend: Ask fast finishers to write, in plain English, three policies they would enforce on a production project and choose an enforcement level for each with justification."
  ]
 },
 {
  "t": "Health assessments: drift detection and continuous validation",
  "objectives": [
   "Students will be able to explain what health assessments are and why scheduled checks matter for rarely run workspaces.",
   "Students will be able to describe how drift detection uses refresh-only plans to compare real infrastructure with state.",
   "Students will be able to identify the constructs continuous validation re-evaluates and write a simple check block assertion idea.",
   "Students will be able to choose the correct response to reported drift."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of things that change silently when nobody is watching."
   ],
   [
    12,
    "Teach",
    "Explain the two halves. Draw state on one side and real infrastructure on the other with a refresh-only plan between them. Then project the check block and explain how it is re-evaluated on schedule. Stress that assessments never change anything, and list the requirements: enabled, valid credentials, no run in progress."
   ],
   [
    18,
    "Activity",
    "Run the Health Report Triage activity in pairs."
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
  "warmup": "Your car has a dashboard warning light. What is the difference between a light that warns you and a system that fixes the problem by itself? Which would you trust more for important changes?",
  "activity": {
   "title": "Health Report Triage",
   "materials": "Printed mock health assessment reports for four workspaces (one drifted security group rule, one deleted instance, one failing certificate check, one healthy), a response options card (normal run, update configuration then plan, refresh-only apply, investigate credentials), pens.",
   "steps": [
    "Pairs read each report and label it as drift, failed continuous validation or healthy.",
    "For each drift report, pairs decide whether the outside change should be reverted or kept and choose the matching response from the options card.",
    "For the failed check report, pairs write who should be notified and what action fixes the underlying issue.",
    "Pairs swap reports with a neighbor and compare decisions, then the teacher walks through the expected answers."
   ]
  },
  "discussion": [
   "Why might HashiCorp have designed health assessments to report rather than automatically fix drift?",
   "What kinds of conditions in your own projects would be worth asserting in a check block?"
  ],
  "exit": [
   [
    "What does drift detection compare?",
    "The real infrastructure, read through a refresh-only plan, against the workspace's stored state."
   ],
   [
    "Name two constructs that continuous validation re-evaluates.",
    "check block assertions and precondition or postcondition blocks."
   ],
   [
    "A drifted change is a mistake. How do you fix it?",
    "Start a normal run so Terraform restores the infrastructure to match the configuration."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column chart labeled drift detection and continuous validation with prompts for what each checks, how and what it reports.",
   "Extend: Ask fast finishers to sketch a check block for a certificate expiry or endpoint health and explain how notifications would route the failure to the right team."
  ]
 },
 {
  "t": "Integrations: VCS providers, run triggers, run tasks, notifications, dynamic provider credentials",
  "objectives": [
   "Students will be able to match VCS providers, run triggers, run tasks, notifications and dynamic provider credentials to the problems they solve.",
   "Students will be able to explain the difference between run tasks, which can block runs, and notifications, which cannot.",
   "Students will be able to describe how run triggers chain workspaces after a successful apply.",
   "Students will be able to explain how dynamic provider credentials use OIDC to replace static cloud keys."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record the integrations students already know from other tools."
   ],
   [
    12,
    "Teach",
    "Walk through the five integrations with a one-line purpose for each. Draw two workspaces joined by a run trigger arrow, a run task box at post-plan with pass and fail branches, notification arrows to chat and email, and an OIDC token exchange between HCP Terraform and a cloud role."
   ],
   [
    18,
    "Activity",
    "Run the Complaint Match card activity."
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
  "warmup": "Think of an app on your phone that connects to other apps. What kinds of connections are there: ones that start something, ones that check something, ones that just tell you something?",
  "activity": {
   "title": "Complaint Match",
   "materials": "Printed complaint cards (ten short team complaints such as forgetting to re-plan after network changes, needing a scanner to block bad plans, missing approval requests, unrotated keys, connecting a new repository), printed feature cards for the five integrations, tape, whiteboard.",
   "steps": [
    "Groups receive the complaint cards and the five feature cards and tape each complaint under the feature that solves it.",
    "For each run task match, groups choose the stage (pre-plan, post-plan, pre-apply or post-apply) and enforcement level (advisory or mandatory).",
    "For each notification match, groups choose the destination and the run events that should trigger it.",
    "Groups present one tricky card each; the class votes, and the teacher confirms or corrects, especially notifications versus run tasks and run triggers versus run tasks."
   ]
  },
  "discussion": [
   "Why is removing long-lived credentials often better than rotating them more frequently?",
   "What could go wrong if run triggers chained many workspaces together, and how would you keep that manageable?"
  ],
  "exit": [
   [
    "Which feature can stop a run based on an external scanner's result?",
    "A mandatory run task."
   ],
   [
    "When does a run trigger queue a run in the downstream workspace?",
    "After the source workspace completes a successful apply."
   ],
   [
    "What do dynamic provider credentials exchange for short-lived cloud credentials?",
    "A signed OIDC workload identity token issued by HCP Terraform for the run."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page matching sheet with each integration's purpose, a trigger, and whether it can block a run.",
   "Extend: Ask fast finishers to design the trust conditions for an AWS role that accepts HCP Terraform tokens only from one project's production workspaces during the apply phase, described in plain language."
  ]
 }
]);
