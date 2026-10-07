/* Lessons for HashiCorp Certified: Terraform Associate (Terraform Associate (004)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("terraform", [
 {
  "t": "What IaC is: infrastructure defined in version-controlled, machine-readable files instead of manual console changes",
  "hook": "It is Monday morning at Harbor Credit Union, and you have just inherited the staging environment from an engineer who left last month. The load-testing team needs an identical copy by Friday. You open the cloud console and find forty resources: networks, subnets, two virtual machines, a database and a tangle of firewall rules. Nobody wrote down which settings mattered, and the only documentation is a wiki page last edited two years ago. Was port 8443 opened on purpose, or by accident during some late-night fix? You could click through every screen and copy what you see, but you already suspect the copy will not quite match. What would it take for the environment to describe itself?",
  "simple": "Infrastructure as Code means writing down what your servers, networks and databases should look like in a text file, and letting a program build them for you. Think of a recipe card versus a cook who works from memory. If the cook leaves, the dish is gone; if the recipe is written clearly enough that a machine could follow it, anyone can make the same dish again. In IaC, the file is the recipe and a tool like Terraform is the cook that follows it exactly. The file is kept in a history-tracking system (version control), so you can see every change ever made to the recipe, who made it, and why. If you want something different, you edit the file, not the servers.",
  "body": [
   "Infrastructure as Code (IaC) means you describe servers, networks, databases, Domain Name System (DNS) records and other infrastructure in text files that a tool reads and acts on, rather than building them by clicking through a cloud console or typing one-off commands. The files become the source of truth. If you want a change, you change the file, and the tool makes reality match it. That single shift, from doing work by hand to declaring it in files, is the foundation for everything else you will study for the Terraform Associate exam.",
   "Two words in the definition carry most of the weight. Machine-readable means a program can parse the file and turn it into application programming interface (API) calls without a human interpreting it. Version-controlled means the files live in a system such as Git, so every change has an author, a timestamp, a message and a diff you can review or roll back. A wiki page describing how a server was built is documentation; a file that a tool can execute to build that server is code. Exam questions often hinge on exactly that difference, so it is worth saying it out loud: if a tool cannot run it, it is not IaC.",
   "To see why this matters, compare it with manual provisioning, sometimes called ClickOps. An engineer logs in to a console, creates a virtual network, picks a subnet range, launches a virtual machine and opens a firewall port. It works, but the knowledge of exactly what was done lives in that engineer's memory and perhaps in a few screenshots. Rebuilding it in another region, or explaining to an auditor why a port is open, means reconstructing the steps by hand. Over time small differences creep in between environments that were supposed to be identical, a problem known as configuration drift. Drift is rarely dramatic on any one day, but it is why a fix that works in staging can fail in production.",
   "Scripts are a step forward but not the whole answer. A shell script full of cloud command-line interface (CLI) commands is machine-readable, yet it usually records only the steps to create something once. Run it again and it may fail or create duplicates, and it says nothing about what currently exists. Mature IaC tools such as Terraform keep track of what they manage and compare it with what the files describe, which is what lets the files act as a living source of truth instead of a one-time setup routine.",
   "With Terraform, the IaC files are written in the HashiCorp Configuration Language (HCL) and usually end in `.tf`. A directory of `.tf` files is called a configuration. You write blocks that declare what should exist, run `terraform plan` to preview what Terraform would change, and run `terraform apply` to make those changes through the provider's API. Terraform also keeps a state file recording which real objects belong to which blocks, which you will study in detail later. For now, think of state as Terraform's memory of what it built.",
   "```hcl\nresource \"local_file\" \"hello\" {\n  filename = \"hello.txt\"\n  content  = \"Managed by Terraform\"\n}\n```",
   "This tiny example uses the `local` provider to manage a file on your own machine, which is a good way to learn the workflow without a cloud account. Read it from left to right: the keyword `resource`, a resource type (`local_file`), a name you choose (`hello`), and arguments inside the braces. The same pattern is how you would declare a cloud virtual machine, a storage bucket or a DNS record. If you later edit `content` and run plan again, Terraform shows you a change to that one file rather than starting over.",
   "Once infrastructure lives in files, a whole set of engineering habits becomes available. Changes can be reviewed in pull requests before they touch anything real. Pipelines can run checks and tests automatically. Environments can be recreated on demand after a disaster or copied for a new project with different input values. Auditors can be pointed at a commit history instead of a collection of memories. The next lesson walks through those advantages one by one, but they all trace back to the definition here: infrastructure described in version-controlled, machine-readable files that a tool applies."
  ],
  "analogy": "IaC is like an architect's blueprint compared with a builder who works from memory. The blueprint can be reviewed, copied and stamped by an inspector, and a second builder can produce the same house from it. Where the analogy stops working is that a blueprint does not build anything by itself. IaC files are executable: Terraform reads them and makes the API calls, and it keeps checking the finished building against the drawing on every run.",
  "terms": [
   [
    "Infrastructure as Code (IaC)",
    "Managing infrastructure through machine-readable definition files that a tool applies, instead of manual changes."
   ],
   [
    "Configuration",
    "In Terraform, the set of `.tf` files in a directory that together describe the desired infrastructure."
   ],
   [
    "HCL",
    "HashiCorp Configuration Language, the declarative language Terraform configurations are written in."
   ],
   [
    "Configuration drift",
    "Differences that build up between environments or between the recorded design and reality, usually from untracked manual changes."
   ],
   [
    "ClickOps",
    "Informal name for provisioning infrastructure by hand through a web console."
   ],
   [
    "Source of truth",
    "The single authoritative definition of what infrastructure should look like; in IaC, the code in version control."
   ]
  ],
  "example": "A team has a staging environment that someone built by hand two years ago. When they need a second copy for load testing, nobody remembers every setting. After they describe the environment in Terraform files stored in Git, creating a third copy is a matter of running plan and apply with different variable values.",
  "mistakes": [
   [
    "A detailed runbook or wiki page of console steps counts as Infrastructure as Code.",
    "Documentation is useful, but a tool cannot execute it. IaC files are machine-readable and applied by a tool, so the file itself produces the infrastructure."
   ],
   [
    "Any script that calls a cloud CLI is the same as IaC with Terraform.",
    "A script is code, but a one-shot creation script usually does not track what exists or compare it with a desired state. Terraform keeps state and plans only the differences, which is what lets the files stay the source of truth."
   ],
   [
    "IaC means you never need version control because the tool remembers everything.",
    "Version control is half of the definition. It provides history, review and rollback; Terraform state records real object mappings, not who changed the code or why."
   ]
  ],
  "tryit": [
   [
    "Priya at Lakeshore Logistics keeps a spreadsheet listing every server, its size and its firewall rules, and updates it after each console change. Her manager asks whether the team already practices Infrastructure as Code. The spreadsheet is stored in a shared drive with version history. What should Priya answer?",
    "No. The spreadsheet is versioned documentation, but no tool reads it to build or change the servers, and it can silently disagree with reality. To practice IaC the team would describe the servers in files such as Terraform `.tf` files, keep them in Git, and make changes by editing the files and applying them."
   ]
  ],
  "tip": "Exam questions define IaC by its properties: code stored in version control and applied by a tool. If an answer describes documenting manual steps or scripting console clicks without a source of truth, it is not the IaC benefit being asked about.",
  "check": [
   [
    "Why is a runbook describing console steps not considered Infrastructure as Code?",
    "Because a tool cannot execute it to produce the infrastructure; IaC files are machine-readable and applied automatically, so the file itself is the source of truth."
   ],
   [
    "What problem does storing IaC files in version control solve that manual changes do not?",
    "It records who changed what, when and why, allows review before changes, and lets you roll back to a known version."
   ],
   [
    "In Terraform, what is a configuration?",
    "The set of `.tf` files in a working directory that together describe the desired infrastructure."
   ]
  ]
 },
 {
  "t": "Advantages of IaC: repeatability, consistency, code review, audit history, automation, fewer configuration errors",
  "hook": "The quarterly audit at Pinecrest Health Network starts in ten minutes, and the auditor has one question for you: when was encryption turned on for the patient-records storage bucket, and who approved it? Across the hall, your colleague Dev is rebuilding a test environment by hand for the third time this month, and it still does not behave like production. Meanwhile last night's on-call engineer typed a subnet mask wrong during an outage and took down a reporting service for an hour. Three different problems, one team. Is there a single practice that would have answered the auditor, saved Dev's week and caught the typo before it shipped?",
  "simple": "Once your infrastructure is written down as code, several good things happen at once. You can build the same thing again and again and get the same result, like using a cookie cutter instead of shaping each cookie by hand. Your test and live environments come from the same cutter, so they match. Teammates can read a proposed change before it happens, the way an editor reviews a draft. Every change is saved with a name and date, so you can answer questions like who changed this and when. A computer can carry out the change instead of a tired person at 2 a.m., and because people catch problems early, fewer mistakes reach the real systems.",
  "body": [
   "Knowing what Infrastructure as Code (IaC) is gets you halfway; the Terraform Associate exam also expects you to explain why organizations adopt it. Each benefit follows directly from one fact: infrastructure is described in files that a tool applies. As you read, notice how each advantage is really a consequence of that fact rather than a separate feature someone bolted on. That makes them easier to remember and easier to match to exam wording.",
   "Repeatability is the first and most basic. It means you can run the same configuration again and get the same result. Need a new environment for a customer, a region or a short-lived test? Apply the same files with different input values, such as a different name prefix or instance size, rather than rebuilding by hand. Because Terraform knows everything it created, you can also destroy a temporary environment completely when you are done, which helps with cost control.",
   "Consistency is the related promise that development, staging and production are built from the same definitions. When a bug appears in production, it can be reproduced in staging because the two environments are genuinely alike rather than approximately alike. On the exam, consistency is the answer whenever a question describes environments that should match, or the classic complaint that something works in staging but not in production.",
   "Code review is possible because changes are text diffs. A teammate can read a pull request, see that a security group now allows inbound traffic from `0.0.0.0/0`, and ask why before anything reaches a live system. Terraform strengthens this with `terraform plan`, whose output can be attached to the review. Reviewers then see not just the code change but the exact infrastructure change it will cause, such as one resource to add, two to change and none to destroy. A console click offers no equivalent moment for a second pair of eyes.",
   "Audit history comes from version control. Every commit records who changed the infrastructure definition, when, and with what message, and pull requests record who approved it. When an auditor asks when encryption was enabled on a storage bucket, you can point to the commit and the linked review. Combined with pipeline logs showing when each apply ran, you get a trail that manual console work rarely produces, even in organizations that try hard to document everything.",
   "Automation means the apply step can run in a continuous integration and continuous delivery (CI/CD) pipeline or in HCP Terraform, HashiCorp's managed service for running Terraform, instead of on someone's laptop. The pattern is simple: humans approve, machines execute. This removes waiting for one specific person who has the right credentials, keeps credentials off individual laptops, and makes policy checks and tests a required part of the path to production rather than an optional extra.",
   "Fewer configuration errors is the payoff of all of the above. Typos in a console cannot be reviewed or tested; typos in code can be caught by `terraform validate`, by `terraform fmt` keeping files readable, by reviewers, by policy checks, and by trying the change in a lower environment first. Manual steps done at 2 a.m. during an outage are where mistakes happen, and IaC reduces how many manual steps exist in the first place. When a mistake does slip through, rolling back is a matter of reverting a commit and applying again.",
   "IaC also supports disaster recovery. If a region becomes unavailable or an environment is deleted, the code that describes it still exists, so you can recreate the infrastructure from code rather than from memory. Data still needs its own backups, because Terraform rebuilds infrastructure, not the contents of your databases. Keep that distinction in mind: exam answers that claim IaC replaces backups are overstating the benefit.",
   "When you meet a scenario question, look for the keyword that points to one benefit. Who changed it and when points to audit history. Identical dev and prod points to consistency. A new copy quickly points to repeatability. Caught before apply points to code review. Runs without a person at the keyboard points to automation. Fewer mistakes in production points to the combined payoff of reducing configuration errors. Some questions list several true statements and ask for the one that best fits the scenario, so read the scenario for its main complaint before looking at the options. A question about an auditor is not really asking about speed, and a question about a quick test environment is not really asking about history, even though IaC delivers both."
  ],
  "analogy": "Managing infrastructure as code is like a restaurant that uses written, tested recipes instead of letting each cook improvise. Every branch serves the same dish (consistency), a new branch can open quickly (repeatability), the head chef can taste-test a recipe change before it reaches the menu (code review), and the recipe book shows who changed the salt and when (audit history). The analogy stops short on automation: in IaC a machine actually follows the recipe for you.",
  "terms": [
   [
    "Repeatability",
    "The ability to produce the same infrastructure again from the same code and inputs."
   ],
   [
    "Consistency",
    "Environments built from the same definitions match each other, reducing works-in-staging-but-not-production surprises."
   ],
   [
    "Audit trail",
    "The record, from version control and pipeline logs, of who changed infrastructure, when and why."
   ],
   [
    "CI/CD",
    "Continuous integration and continuous delivery; automated pipelines that test and deploy changes."
   ],
   [
    "Pull request",
    "A proposed change in version control that teammates review and approve before it is merged."
   ]
  ],
  "example": "A security reviewer spots in a pull request that a new database would be publicly accessible. Because the change is code, she comments on the line, the author fixes it, and the corrected plan is approved. In a console-driven team the same mistake might only be found by a later scan, or by an attacker.",
  "mistakes": [
   [
    "IaC guarantees there will never be configuration errors.",
    "IaC reduces errors by making changes reviewable, testable and automated, but a bad change can still be written, approved and applied. The benefit is fewer errors and easier rollback, not zero errors."
   ],
   [
    "Recreating infrastructure from code means you no longer need data backups.",
    "Terraform rebuilds infrastructure objects, not the data stored in them. Databases and file stores still need their own backup and restore plans."
   ],
   [
    "The audit trail comes from Terraform state.",
    "State maps configuration to real objects. Who changed what and why comes from version control history, pull request approvals and pipeline logs."
   ],
   [
    "Consistency and repeatability are the same answer.",
    "They are related but tested differently: repeatability is producing the same result again, while consistency is environments matching one another because they share definitions."
   ]
  ],
  "tryit": [
   [
    "At Silverline Media, a manager wants two things: to stop engineers from applying changes from their laptops with personal credentials, and to make sure a policy check runs before every production change. Which IaC advantage addresses both, and how?",
    "Automation. Moving apply into a CI/CD pipeline or HCP Terraform means a reviewed, approved change is executed by the system with centrally managed credentials, and policy checks and tests become required steps on the path to production."
   ],
   [
    "A developer says the payment bug only happens in production and cannot be reproduced in staging. The team built staging by hand last year and production from Terraform. Which IaC benefit is missing, and what would fix it?",
    "Consistency. Staging and production are not built from the same definitions, so they differ in ways nobody can see. Building staging from the same Terraform configuration with different input values would make the environments genuinely alike."
   ]
  ],
  "tip": "If a question asks which IaC benefit lets you see who changed infrastructure and when, the answer is version control and audit history; if it asks about identical dev and prod, the answer is consistency.",
  "check": [
   [
    "Which IaC advantage lets a teammate catch an insecure change before it is applied?",
    "Code review: changes are text diffs, often with plan output attached, that can be reviewed in a pull request before apply."
   ],
   [
    "How does IaC help create a new test environment quickly?",
    "Repeatability: you apply the same configuration with different input values instead of rebuilding by hand."
   ],
   [
    "Why does attaching `terraform plan` output to a pull request improve review?",
    "Reviewers see the exact infrastructure changes the code will cause, such as resources to add, change or destroy, not just the text diff."
   ]
  ]
 },
 {
  "t": "Declarative (describe the end state) vs imperative (list the steps) approaches",
  "hook": "The deployment script at Cobalt Ridge Outfitters has worked for a year, so when Sam on the platform team reruns it after a network blip, nobody worries. Ten minutes later the cloud bill alert fires: there are now four web servers instead of two, two of them half-configured and attached to nothing. The script did exactly what it was told, step by step, a second time. Sam's lead asks a pointed question in the team channel: why does our tool not know the servers already exist? Somewhere between describing the steps and describing the result is a design choice that decides whether reruns are safe. Which one does Terraform make?",
  "simple": "There are two ways to ask for something. You can give step-by-step directions: walk two blocks, turn left, go into the third shop, buy bread. Or you can describe what you want at the end: there should be a loaf of bread on the kitchen table. The first style is called imperative, a list of steps. The second is called declarative, a description of the end result. Terraform is declarative. You write down what should exist, such as three servers, and Terraform looks at what already exists and works out the steps itself. If there is already bread on the table, a declarative helper does nothing. A step-by-step helper would go buy another loaf.",
  "body": [
   "There are two broad ways to tell a tool what infrastructure you want. An imperative approach lists the steps: create a network, then create a subnet, then launch two servers, then attach a disk. A declarative approach describes the end state: there should be one network, one subnet and two servers with disks attached, and the tool works out the steps needed to get there. The Terraform Associate exam expects you to know which camp Terraform sits in and what that choice means in practice.",
   "Terraform is declarative. You write blocks in the HashiCorp Configuration Language (HCL) describing the objects that should exist and their settings. Terraform compares that desired state with what its state file says exists and with what the provider reports about the real objects, then builds a plan of creates, updates and deletes needed to close the gap. You never write the order of operations. Terraform derives it from references between resources, plus any explicit `depends_on` arguments, and builds a dependency graph from them. That is also why the order in which blocks appear in your `.tf` files does not matter; you could split a configuration across files in any arrangement and the plan would be the same.",
   "The difference shows up most clearly when things change. Suppose you have two servers and want three. With an imperative script that says create two servers, running it again creates two more, giving four. To avoid that you would have to write your own logic that checks what exists and only creates what is missing. With Terraform, you change `count = 2` to `count = 3`, and the plan shows exactly one new server to add. You state the new end result, and the tool calculates the difference.",
   "```hcl\nresource \"aws_instance\" \"web\" {\n  count         = 3\n  ami           = var.ami_id\n  instance_type = \"t3.micro\"\n}\n```",
   "Removal works the same way, and it surprises people at first. In a declarative configuration, deleting a resource block is a statement that the object should no longer exist. The next plan shows that object to destroy, and apply removes it. In an imperative world, deleting a line from a script simply means that step is no longer run; the object it once created stays where it is. Keep that contrast in mind for scenario questions where someone removes a block and is surprised by a destroy in the plan.",
   "You can watch the declarative model at work in plan output. Each proposed action is marked with a symbol: `+` for create, `~` for update in place, `-` for destroy, and `-/+` for replace. A summary line at the end counts how many objects will be added, changed and destroyed. None of those actions came from instructions you wrote; each one is Terraform's calculation of what it takes to move from what exists today to what your configuration describes. Reading the plan is how you confirm that Terraform understood your intent before anything is touched.",
   "Imperative tools are not wrong. Shell scripts, programs written against a cloud software development kit (SDK), and many configuration management tasks are imperative, and they give fine control over sequence, which is sometimes exactly what you need. The trade-off is that you own the logic for checking current state, handling partial failures and cleaning up afterwards. Declarative tools take on that work in exchange for you expressing intent in the tool's model. For infrastructure that should look a certain way over months or years, describing the result usually scales better than scripting the steps.",
   "Terraform does have imperative corners, and the exam may point at them. Provisioners such as `local-exec` and `remote-exec` run scripts, and HashiCorp describes them as a last resort because Terraform cannot model what the script did. Commands such as `terraform import` and `terraform state rm` are operations rather than declarations: you run them once to change state. Newer `import` and `removed` blocks let you express even those as configuration that goes through plan and review, which fits the declarative model better.",
   "A quick way to classify any tool or snippet is to ask what happens if you run it twice with nothing changed. If the answer is that the steps execute again, it is imperative. If the answer is that the tool sees the world already matches and does nothing, it is declarative. That second behavior has a name, idempotence, and it is the subject of the next lesson."
  ],
  "analogy": "Declarative is like setting a thermostat to 70 degrees; imperative is like telling someone to run the heater for twenty minutes. The thermostat checks the current temperature and does only what is needed, and does nothing if the room is already warm. The heater instruction runs regardless. Where it stops matching: a thermostat reacts continuously on its own, while Terraform only compares desired and real state when you run plan or apply.",
  "terms": [
   [
    "Declarative",
    "Describing the desired end state and letting the tool determine the steps to reach it."
   ],
   [
    "Imperative",
    "Specifying the exact sequence of commands or steps to perform."
   ],
   [
    "Desired state",
    "The infrastructure described by the configuration, which Terraform tries to make real."
   ],
   [
    "Dependency graph",
    "The ordering Terraform builds from references and `depends_on`, used to decide which operations run first."
   ],
   [
    "Provisioner",
    "A Terraform feature that runs scripts or commands during resource creation or destruction; recommended only as a last resort."
   ]
  ],
  "example": "An engineer's Bash script calls the cloud CLI to create a load balancer. Run twice, it fails with a name conflict or creates a duplicate. Rewritten as a Terraform resource block, running apply twice leaves exactly one load balancer, and editing the block's settings updates it in place.",
  "mistakes": [
   [
    "Terraform creates resources in the order the blocks appear in the files.",
    "Block order is irrelevant. Terraform orders operations using the dependency graph built from references and `depends_on`."
   ],
   [
    "Deleting a resource block just stops Terraform from managing that object, leaving it in place.",
    "In a declarative model, removing the block means the object should not exist, so Terraform plans to destroy it. To stop managing an object without destroying it you use a `removed` block or `terraform state rm`."
   ],
   [
    "Declarative means Terraform has no way to run scripts at all.",
    "Provisioners exist and can run commands, but they are imperative escape hatches that HashiCorp recommends only as a last resort."
   ]
  ],
  "tryit": [
   [
    "At Northwind Clinics, an engineer changes `count = 4` to `count = 2` on a group of virtual machines and runs `terraform plan`. A teammate expected the plan to show nothing because nobody wrote a delete command. What will the plan show, and why?",
    "It will show two instances to destroy. Terraform is declarative: the configuration now says two should exist, so Terraform computes the difference between four real instances and two desired ones and plans to remove the extra two, typically the highest indexes."
   ]
  ],
  "tip": "The exam words it as 'Terraform is declarative: you describe the desired end state.' If an answer says Terraform executes your steps in the order you wrote them, it is wrong; block order in files does not matter.",
  "check": [
   [
    "In a declarative tool, what happens when you delete a resource block from the configuration and apply?",
    "The tool plans to destroy that object, because the desired state no longer includes it."
   ],
   [
    "Does the order in which you write resource blocks in `.tf` files decide the order Terraform creates them?",
    "No. Terraform builds a dependency graph from references and `depends_on`, and orders operations from that."
   ],
   [
    "Why are provisioners considered an imperative corner of Terraform?",
    "They run scripts whose effects Terraform cannot model, so the result is a sequence of actions rather than a described end state."
   ]
  ]
 },
 {
  "t": "Idempotence: applying the same configuration twice makes no further changes",
  "hook": "It is 6:40 a.m. and you are reviewing the overnight pipeline results for Juniper Street Bank. Every night the pipeline runs `terraform plan` against production, and every night for three weeks it has said the same thing: no changes. This morning it says one firewall rule will be modified. Nobody merged anything yesterday. Your first instinct is that the pipeline is broken, but your teammate Rosa points out that a plan which usually says nothing is exactly what makes this one line so loud. Something changed, and it was not the code. What property of Terraform turns a quiet nightly run into an alarm, and what can quietly break it?",
  "simple": "Something is idempotent if doing it once or doing it ten times ends the same way. Pressing a light switch to on is a good example: if the light is already on, pressing on again changes nothing. Terraform works like that. When you apply a configuration, it builds what is missing. If you apply the same configuration again and nothing has changed, Terraform says there is nothing to do and creates no duplicates. That makes it safe to run often. It also means that if Terraform suddenly wants to change something you did not touch, someone or something changed the real system behind your back, and you should find out why.",
  "body": [
   "An operation is idempotent if doing it once or doing it many times produces the same result. Pressing an elevator call button is a common analogy: pressing it five times does not summon five elevators. For infrastructure tools, idempotence means that running the same configuration against infrastructure that already matches it changes nothing. The Terraform Associate exam treats this as a core property of Terraform, and it often appears as a simple true or false statement about running apply twice.",
   "Terraform achieves idempotence because it is declarative and keeps state. On each run, `terraform plan` first refreshes its knowledge of the real objects by asking each provider for their current attributes. It then compares those attributes with the configuration and proposes only the differences. After a successful apply the differences are gone, so a second plan reports that no changes are needed. You will see the message that your infrastructure matches the configuration, and nothing is created, modified or destroyed. An imperative script, by contrast, would repeat its steps and could create duplicates or fail on name conflicts.",
   "```text\n$ terraform apply\n...\nNo changes. Your infrastructure matches the configuration.\n```",
   "This is what makes it safe to run Terraform repeatedly in automation. A continuous integration pipeline can run plan on every commit, or on a schedule, and if nothing relevant changed, nothing happens. Engineers do not need to remember whether a configuration was already applied; running it again is harmless. Teams sometimes rely on this to re-run a failed pipeline after a temporary network error, knowing that resources created on the first attempt will not be created twice.",
   "Idempotence also makes Terraform useful for detecting drift. Drift is any difference between the real infrastructure and what the configuration and state describe, usually caused by someone changing a setting by hand in a console. Because a clean configuration produces an empty plan, any proposed change on a day when nobody changed the code is a signal that reality and code disagree. The plan will show the change needed to put the setting back to what the code says, and applying it restores the coded value. Running plan with the `-refresh-only` option lets you review drift and update state to match reality without changing infrastructure, which is useful when the manual change was actually intended and the code should be updated next.",
   "Idempotence can be broken, and recognizing how is worth points on the exam. Values that change on every run, such as calling the `timestamp()` function inside a resource argument, cause a diff every time because the value is different on each plan. Provisioners and scripts run through `local-exec` or `remote-exec` do whatever the script does, and Terraform does not track their effects. Resources whose API normalizes a value differently from how you wrote it, for example reordering a list or changing letter case, can produce a perpetual diff until the configuration matches the normalized form or you add `lifecycle { ignore_changes = [...] }` for that argument. Two tools managing the same object, such as Terraform and a separate automation script, will also undo each other's work and show changes on every run.",
   "A good hands-on exercise uses the `random` provider to generate a pet name and write it to a file with the `local` provider, then applies twice. The first apply creates both resources. The second apply shows no changes, even though `random_pet` could produce a different name, because the generated value is stored in state and only regenerated if the resource must be replaced. That is a concrete demonstration that Terraform tracks results rather than re-running actions. If you then change an argument of `random_pet` that forces replacement, a new name appears, and the file that depends on it is updated too.",
   "When you read plan output, treat an unexpected change as information rather than noise. A well-maintained configuration should be quiet when nothing has changed. If a plan always shows the same update, investigate the cause, because a perpetual diff trains people to ignore plan output, and that is exactly when a real problem slips through. On the exam, connect the ideas in a chain: declarative configuration plus state makes Terraform idempotent; idempotence makes an unchanged configuration produce an empty plan; an empty plan is the baseline that makes drift visible. If a question asks why it is safe to run Terraform on every commit, or how a scheduled plan can reveal unauthorized manual changes, idempotence is the property being tested."
  ],
  "analogy": "Terraform is like a hotel housekeeper with a checklist that says how the room should look: bed made, two towels, one bottle of water. If the room already matches, the housekeeper leaves without touching anything. If a towel is missing, they replace only that towel. The analogy weakens for drift: the housekeeper only checks when they visit, just as Terraform only notices changes when you run plan or apply.",
  "terms": [
   [
    "Idempotence",
    "The property that repeating an operation produces the same result as doing it once, with no further changes."
   ],
   [
    "Drift",
    "A difference between real infrastructure and what the configuration and state describe, usually from manual changes."
   ],
   [
    "Refresh",
    "The part of planning where Terraform reads the current attributes of managed objects from the provider."
   ],
   [
    "Perpetual diff",
    "A change that appears in every plan because a value is non-deterministic or normalized differently by the API."
   ],
   [
    "ignore_changes",
    "A lifecycle setting that tells Terraform not to propose updates when the listed arguments differ from the configuration."
   ]
  ],
  "example": "A nightly pipeline runs `terraform plan` against production. Most nights it reports no changes. One morning it shows a firewall rule being modified back to its coded value, revealing that someone edited the rule in the console the day before.",
  "mistakes": [
   [
    "Running `terraform apply` twice creates duplicate resources.",
    "Terraform is idempotent. The second run compares desired and real state, finds no differences, and makes no changes."
   ],
   [
    "`random_pet` or `random_password` produce a new value on every apply.",
    "The generated value is stored in state and stays the same until the resource is replaced, so repeat applies keep the same value."
   ],
   [
    "A change in a plan when nobody edited the code means Terraform is malfunctioning.",
    "It usually means drift: something changed the real infrastructure outside Terraform, or a value in the configuration is non-deterministic, such as `timestamp()`."
   ]
  ],
  "tryit": [
   [
    "At Tidewater Freight, every plan for weeks has shown the same tag `LastDeployed` being updated on a storage bucket, even with no code changes. The configuration sets that tag to `timestamp()`. The team has started ignoring plan output entirely. What is wrong and what should they do?",
    "The `timestamp()` call returns a new value on every run, breaking idempotence and creating a perpetual diff. They should remove the non-deterministic value from the argument, or if the tag must exist, add it to `lifecycle { ignore_changes = [...] }` or set it another way, so that plans are quiet again and real drift stands out."
   ]
  ],
  "tip": "Expect a true/false question along the lines of 'running terraform apply twice with no configuration changes will create duplicate resources.' That is false: Terraform is idempotent and the second run makes no changes.",
  "check": [
   [
    "What should a second `terraform apply` report if nothing has changed since the first?",
    "No changes, because the real infrastructure already matches the configuration and state."
   ],
   [
    "Why can putting `timestamp()` directly in a resource argument break idempotence?",
    "Its value differs on every run, so each plan sees a new value and proposes a change."
   ],
   [
    "How does idempotence help with drift detection?",
    "Because a matching configuration produces an empty plan, any proposed change without a code change signals that the real infrastructure was altered outside Terraform."
   ]
  ]
 },
 {
  "t": "Terraform's plugin model: one workflow and language (HCL) for many providers",
  "hook": "Your first week on the platform team at Meadowbrook Insurance, and the backlog has three tickets with your name on them: add a storage bucket in the cloud account, create a new repository with branch protection on the Git platform, and set up an alert in the monitoring tool. Three different systems, three different consoles, three different sets of documentation. You brace yourself for learning three tools. Then your mentor, Kofi, opens one repository and shows you that all three are already managed with the same commands and the same file format. How can one small binary know how to talk to so many unrelated services?",
  "simple": "Terraform is split into two kinds of parts. The main program, called Terraform core, knows how to read your files, figure out what order to do things in, and keep track of what it built. It does not know how to talk to any particular service. That job belongs to plugins called providers. Each provider is a translator for one service, such as a cloud, a Git platform or a DNS service. Think of a universal travel adapter: the plug you carry is always the same, and you add the right adapter for each country. With Terraform you always write the same kind of file and run the same commands, and the right provider handles each service.",
  "body": [
   "Terraform itself knows nothing about AWS, Azure, GitHub or any particular platform. The core binary understands the HashiCorp Configuration Language (HCL), builds dependency graphs, manages state and runs the plan and apply workflow. Everything platform-specific lives in providers, which are separate plugin programs that Terraform downloads and runs alongside itself. This split is one of the most important architectural ideas on the Terraform Associate exam, because many other topics, from `terraform init` to version pinning, only make sense once you see it.",
   "Terraform core and a provider communicate over a remote procedure call (RPC) protocol. Core launches the provider as a separate process and sends it requests. When you write `resource \"azurerm_resource_group\" \"main\"`, core looks at the prefix of the resource type, `azurerm`, finds the matching provider, and asks it to validate the arguments, plan the change and then perform it. The provider translates those requests into calls against the platform's application programming interface (API), handles authentication and retries, and returns the resulting attributes to core, which records them in state. Core never speaks to the cloud directly.",
   "Because the two parts are separate programs, they have separate release cycles. HashiCorp can release Terraform core on one schedule, and provider authors, whether HashiCorp, a cloud vendor, a software company or a community member, can release on their own. A cloud vendor that launches a new service can add it to their provider without waiting for a new version of Terraform. This is also why you pin the Terraform version and provider versions separately, which later lessons cover.",
   "The result is one workflow and one language for many platforms. Whether you are managing a Kubernetes namespace, a Domain Name System (DNS) record or a virtual machine, you write HCL blocks, run `terraform init`, `terraform plan` and `terraform apply`, and read the same kind of plan output. Skills transfer: once you understand variables, outputs, modules, state and lifecycle rules, you only need to learn each provider's resource types and arguments, which the provider's documentation lists. A team can also apply the same review process, policy checks and pipeline to every platform it manages.",
   "```hcl\nterraform {\n  required_providers {\n    aws    = { source = \"hashicorp/aws\" }\n    github = { source = \"integrations/github\" }\n  }\n}\n```",
   "Providers expose three main things to your configuration. Resources are objects Terraform creates, updates and deletes, such as a virtual machine or a repository. Data sources are read-only lookups of information that already exists, such as the ID of the latest machine image or details of a network someone else manages. Some providers also offer provider-defined functions, called with a `provider::NAME::FUNCTION` syntax, although most everyday work uses Terraform's built-in functions. The provider also defines its own configuration block, written as `provider \"aws\" { ... }`, for settings such as region, endpoint or the source of credentials.",
   "`terraform init` is the step that makes the plugin model work. It reads the `required_providers` block, works out which provider versions satisfy the constraints, downloads them, usually from the public Terraform Registry, and installs them under the hidden `.terraform` directory in your working directory. It also records the selected versions in the dependency lock file, `.terraform.lock.hcl`. Until you run init, plan and apply cannot work, because core has no plugin to talk to; you will see an error telling you to run `terraform init`. When you add a new provider to a configuration you must run init again so the new plugin is installed.",
   "It helps to picture who is responsible for what when something goes wrong. A syntax error in your `.tf` files, a cycle in the dependency graph or a locked state file are core's domain. An error saying an argument is not expected for a resource type, or an API returning an access-denied message, comes from the provider. On the exam, if a question asks which component contains the code that calls a cloud API, or which component must be updated to support a newly launched cloud service, the answer is the provider.",
   "Finally, note that providers are not the only plugins in the broader ecosystem, but they are the ones the Associate exam focuses on. Modules, which you will study later, are not plugins at all; they are reusable collections of `.tf` files written in the same language as your own configuration. Keeping that distinction clear avoids a common trap: a module packages HCL, while a provider packages the executable code that talks to an API."
  ],
  "analogy": "Terraform core is like a universal remote control and providers are the device codes for each brand of TV, sound bar and streaming box. The buttons and the way you use the remote stay the same, while each code knows how to speak to one device. Where the analogy breaks: a remote usually has codes built in, but Terraform downloads each provider separately during `terraform init`, and providers update on their own schedule.",
  "terms": [
   [
    "Terraform core",
    "The main Terraform binary that parses configuration, builds the dependency graph, manages state and drives the workflow."
   ],
   [
    "Provider",
    "A plugin that lets Terraform manage a specific platform or service by translating requests into its API calls."
   ],
   [
    "Plugin",
    "A separate executable that core launches and talks to over RPC; providers are plugins."
   ],
   [
    "Data source",
    "A read-only lookup, supplied by a provider, that fetches information about existing objects."
   ],
   [
    "RPC",
    "Remote procedure call; the protocol Terraform core uses to send requests to provider plugins."
   ]
  ],
  "example": "A platform team manages AWS networking, Datadog monitors and PagerDuty schedules. Each uses a different provider, but engineers use the same init, plan and apply commands, the same variable and module patterns, and the same pull request review process for all three.",
  "mistakes": [
   [
    "Terraform core contains the code that calls each cloud's API.",
    "Core handles language, graph, state and workflow. Provider plugins contain the platform-specific code that calls the API."
   ],
   [
    "You must upgrade Terraform itself to use a newly released cloud service.",
    "New services are added to the provider. Upgrading the provider version is usually what is needed, because providers release independently of core."
   ],
   [
    "Providers are installed once on the machine and shared automatically by every configuration.",
    "`terraform init` installs providers into the working directory's `.terraform` folder based on that configuration's `required_providers`, and must be rerun after adding a provider."
   ],
   [
    "Modules and providers are both plugins.",
    "Providers are executable plugins that talk to APIs; modules are reusable collections of HCL configuration files."
   ]
  ],
  "tryit": [
   [
    "At Brightwater Schools, an engineer adds a `cloudflare_dns_record` resource to a configuration that previously used only the AWS provider, adds the Cloudflare provider to `required_providers`, and immediately runs `terraform plan`. The plan fails with an error about a missing provider. What happened, and what is the fix?",
    "The Cloudflare provider plugin has not been installed in the working directory, so core has nothing to send requests to. The engineer should run `terraform init`, which downloads the new provider, installs it under `.terraform` and updates the lock file, and then run plan again."
   ]
  ],
  "tip": "If asked which component contains the code that talks to a cloud API, the answer is the provider, not Terraform core. Core handles language, graph, state and workflow.",
  "check": [
   [
    "How does Terraform know which provider handles a resource of type `google_storage_bucket`?",
    "By the type's prefix, `google`, which maps to the local provider name declared in `required_providers` (here `hashicorp/google`)."
   ],
   [
    "What must you run after adding a new provider to a configuration, and why?",
    "`terraform init`, because it downloads and installs the provider plugin that core needs before plan or apply can work."
   ],
   [
    "What is the difference between a resource and a data source?",
    "A resource is an object Terraform creates and manages; a data source is a read-only lookup of information about something that already exists."
   ]
  ]
 },
 {
  "t": "Multi-cloud and hybrid-cloud deployments from a single configuration",
  "hook": "Failover drill day at Granite Peak Retail. The web tier runs in one public cloud, the disaster recovery copy sits in another, the DNS records live with a third company, and the inventory database still runs on servers in the basement data center. The runbook for switching traffic is eleven pages long and involves four consoles. Halfway through, Lena realizes the load balancer address she pasted into the DNS console is from last quarter. The drill fails, and the post-mortem asks a sharp question: why are four tightly connected systems managed by four disconnected processes? Can one configuration really span all of them, and what would it not solve?",
  "simple": "Some companies use more than one cloud company at the same time, which is called multi-cloud. Others mix a public cloud with their own computers in their own building, which is called hybrid cloud. Each cloud company offers its own setup tool, but those tools only work with that company's services. Terraform can work with all of them at once, because it has a separate plugin for each one. Think of a travel agent who books your flight, hotel and rental car in one go, and makes sure the car is booked for the day your flight lands. Terraform can create something in one cloud and pass its address to another system automatically, all in one run.",
  "body": [
   "Multi-cloud means using more than one public cloud provider, for example Amazon Web Services (AWS) for compute and Google Cloud for analytics. Hybrid cloud means combining public cloud with private or on-premises infrastructure, such as a VMware vSphere cluster in your own data center. Both are common in larger organizations, often for resilience, regulatory reasons, cost, or simply because different teams or acquired companies chose different platforms. The Terraform Associate exam expects you to explain how Terraform supports these setups and to avoid overstating what it does.",
   "Each cloud has its own native Infrastructure as Code (IaC) tool. AWS has CloudFormation, Azure has Azure Resource Manager (ARM) templates and Bicep, and Google Cloud has its own deployment tooling. Those tools work well within one platform and are often first to support a new service, but they cannot manage resources on another vendor's platform or on your own hardware. A team using only native tools for three platforms has three languages, three workflows, three ways of reviewing changes and no built-in way to connect them.",
   "Terraform's provider model removes that limit. Because every platform is reached through a provider plugin, one configuration, one language and one workflow can cover all of them. A single `terraform apply` can create resources in several clouds and on-premises systems, respecting dependencies between them. The same plan output shows every change across every platform, so a reviewer sees the whole picture of a change in one place rather than reviewing three separate tools.",
   "Cross-platform dependencies are where this shines. Imagine creating a load balancer in one cloud and a Domain Name System (DNS) record at a separate DNS provider pointing at it. Because the DNS record's argument references the load balancer's address attribute, Terraform adds an implicit dependency, knows to create the load balancer first, and passes the address along once it is known. With separate native tools you would have to run one, copy an output by hand or with glue scripts, and run the other, which is exactly where mistakes like a stale address creep in. In the snippet below, the `...` stands for arguments left out for readability.",
   "```hcl\nresource \"aws_lb\" \"app\" { ... }\n\nresource \"cloudflare_dns_record\" \"app\" {\n  zone_id = var.zone_id\n  name    = \"app\"\n  type    = \"CNAME\"\n  content = aws_lb.app.dns_name\n}\n```",
   "Be careful not to overstate what Terraform does, because the exam tests this boundary. Terraform does not make clouds interchangeable. An `aws_instance` and an `azurerm_linux_virtual_machine` are different resource types with different arguments, and you cannot move a workload between clouds by changing one word. What you gain is a common workflow, shared tooling for review, policy and state, and the ability to wire platforms together. Teams that want calling code to look similar often wrap each platform's details in modules with similar inputs, such as a `network` module for each cloud that takes a name and an address range, but the modules themselves are still platform-specific underneath.",
   "Hybrid cloud works the same way. On-premises platforms that expose an API, such as a vSphere cluster, a private OpenStack cloud or a network appliance, can have providers too, so the virtual machines in your own data center can be declared next to the cloud resources that depend on them. The one requirement is that the machine running Terraform can reach those APIs, which matters when Terraform runs in a hosted service rather than inside your network. HCP Terraform addresses this with agents that run inside the private network and carry out the work there. The idea to take into the exam is simple: if a platform has an API and a provider, Terraform can include it in the same workflow, whether it lives in a public cloud or down the hall.",
   "Multi-cloud setups also raise practical concerns you should recognize. Each provider needs its own credentials, ideally supplied through environment variables, workload identity or a secrets manager rather than written into `.tf` files. State for many platforms should be stored in a shared, secured remote backend so teammates and pipelines see the same picture and do not run conflicting applies. You can also configure several instances of the same provider, for example two AWS provider blocks with different regions distinguished by an `alias`, to deploy to multiple regions from one configuration.",
   "Size is the other practical concern. Very large configurations that span many platforms are often split into smaller ones, each with its own state, so that a mistake or a slow plan in one area does not affect everything. Outputs from one configuration can be read by another, which keeps the cross-platform wiring without putting every resource in a single blast radius. On the exam, remember the core message: Terraform's advantage over native tools is managing many providers, including multiple clouds and on-premises systems, with one workflow."
  ],
  "analogy": "Terraform across clouds is like a general contractor who coordinates an electrician, a plumber and a roofer from one master schedule. Each trade still uses its own tools and skills, but the contractor makes sure the plumbing goes in before the walls are closed. Where it stops: the contractor cannot make the plumber do the electrician's job, just as Terraform cannot make an AWS resource block work on Azure.",
  "terms": [
   [
    "Multi-cloud",
    "Using two or more public cloud providers together."
   ],
   [
    "Hybrid cloud",
    "Combining public cloud services with private or on-premises infrastructure."
   ],
   [
    "Native IaC tool",
    "A cloud vendor's own provisioning tool, such as CloudFormation or ARM templates, which only manages that vendor's resources."
   ],
   [
    "Cross-provider reference",
    "An expression in one provider's resource that uses an attribute from another provider's resource, creating an implicit dependency."
   ],
   [
    "Provider alias",
    "A second configuration of the same provider, such as another region, selected on resources with the `provider` meta-argument."
   ]
  ],
  "example": "A retailer runs its web tier in Azure, keeps a disaster recovery copy in AWS, and manages both plus its on-premises vSphere cluster from one repository. Engineers learn one workflow, and a failover DNS change is a reviewed pull request instead of a manual scramble.",
  "mistakes": [
   [
    "Terraform lets you move a workload between clouds by changing the provider name.",
    "Resource types and arguments are provider-specific. Moving clouds means rewriting those resources; Terraform gives you a common workflow, not portable resource definitions."
   ],
   [
    "CloudFormation or ARM templates can manage resources in other clouds just as well.",
    "Native tools manage only their own vendor's resources. Terraform's advantage is one workflow across many providers."
   ],
   [
    "You need to run apply separately for each cloud and pass values between them by hand.",
    "One configuration can include several providers; references between their resources create dependencies, and Terraform passes values automatically in a single apply."
   ]
  ],
  "tryit": [
   [
    "At Redfern Energy, the network team creates a load balancer in one cloud with that cloud's native template tool, then copies its address into a DNS provider's console. Twice this year the copied address was out of date. Their manager asks whether switching to Terraform would help, and how. What do you tell her?",
    "Yes. With Terraform, both the load balancer and the DNS record can live in one configuration using two providers. The DNS record references the load balancer's address attribute, which creates an implicit dependency, so Terraform creates the load balancer first and fills in the current address automatically on every apply, removing the manual copy step."
   ]
  ],
  "tip": "Exam questions contrast Terraform with CloudFormation or ARM templates: the Terraform advantage is managing many providers, including multiple clouds, with one workflow. It is not that the same resource block works on every cloud.",
  "check": [
   [
    "What Terraform feature makes multi-cloud deployment from one configuration possible?",
    "Its provider plugin model: each platform has a provider, and core drives them all with the same language and workflow."
   ],
   [
    "Can you move a workload from AWS to Azure by changing only the provider name in your configuration?",
    "No. Resource types and arguments are provider-specific, so you must rewrite those resources, though the workflow and tooling stay the same."
   ],
   [
    "How does Terraform know to create a load balancer before a DNS record that points at it?",
    "The DNS record's argument references the load balancer's attribute, creating an implicit dependency in the graph."
   ]
  ]
 },
 {
  "t": "Service-agnostic workflows: managing SaaS, DNS, Git, Kubernetes and monitoring tools with providers",
  "hook": "Security review at Oakhaven Payments, and the finding is uncomfortable: branch protection on the main payments repository was switched off for a weekend three months ago, and nobody can say who did it or why. The setting is back on now, but the gap means unreviewed code may have reached production. Your security lead, Amara, asks whether there is any way to make settings like this as visible and reviewable as the servers the team already manages with Terraform. A colleague says Terraform is only for clouds. Is that true, or can the same workflow reach the Git platform, the DNS service and the monitoring tool too?",
  "simple": "Terraform is often thought of as a tool for building cloud servers, but it can manage almost any online service that can be controlled by a program. If a service offers an API, which is a way for programs to send it instructions, someone can write a Terraform provider for it. That means you can describe your website addresses, your code repositories and their protection rules, your monitoring alerts, and much more, all in the same kind of file you use for servers. Think of a household where every appliance can be controlled from one app: the oven, the lights and the thermostat. Terraform plays that role for many different services, and every change leaves a written record.",
  "body": [
   "Terraform is often introduced as a cloud tool, but a provider can wrap any service that has an application programming interface (API). That is why Terraform is described as service-agnostic: the same workflow manages things that are not virtual machines at all. The Terraform Registry, the public catalog of providers and modules, lists thousands of providers covering Domain Name System (DNS) services, source control platforms, identity providers, monitoring and alerting tools, databases, content delivery networks and more. For the exam, the rule of thumb is simple: if a service has an API and a provider exists for it, Terraform can manage it.",
   "Consider what this lets you codify. DNS records can be managed with providers for DNS services or for cloud DNS offerings, so adding a new hostname becomes a reviewed change instead of a console edit. Git platforms can be managed with providers such as `integrations/github`, letting you define repositories, branch protection rules, teams and team access as code. Kubernetes objects such as namespaces and config maps can be managed with the `hashicorp/kubernetes` provider, and Helm chart releases with `hashicorp/helm`. Monitoring tools can have dashboards, alert rules and on-call schedules defined in code alongside the services they watch.",
   "Here is what managing a repository and its branch protection looks like. Notice that the protection rule references the repository's `node_id` attribute, which creates an implicit dependency so the repository is created first.",
   "```hcl\nresource \"github_repository\" \"service\" {\n  name       = \"payments-api\"\n  visibility = \"private\"\n}\n\nresource \"github_branch_protection\" \"main\" {\n  repository_id = github_repository.service.node_id\n  pattern       = \"main\"\n}\n```",
   "The benefits are the same as for cloud resources: repeatability, review and audit history. The security payoff can be especially large. Branch protection that is defined in code cannot be quietly turned off without either a visible change in version control or drift that the next plan reveals. Monitoring alerts that are part of the same configuration as the service they watch are created at the same time, so a new service is never deployed without them. Access to teams and repositories becomes something you can review in a pull request rather than discover in a settings page.",
   "There are also small utility providers you will meet in labs and in real configurations. The `hashicorp/random` provider generates random names, passwords and IDs, and stores the results in state so they stay stable between runs. The `hashicorp/local` provider manages files on the machine running Terraform. The `hashicorp/tls` provider can create private keys and certificates, and `hashicorp/http` offers a data source that fetches the response from an address. These do not manage a cloud at all, which makes them useful for learning the workflow without an account and for gluing configurations together.",
   "Be thoughtful about secrets when you use these providers. A password generated by `random_password` or a key generated by `tls_private_key` is stored in Terraform state, so state must be kept in a secured backend with restricted access. Marking outputs as sensitive hides them from command-line output but does not remove them from state. The exam returns to this theme in the state management domain, but it starts here, the first time you see a provider generate a secret.",
   "One more point to keep in mind is ownership. Some things you can manage with Terraform, such as the contents of a Kubernetes cluster, may also be managed by other tools, such as a GitOps controller that syncs manifests from a repository, or by people using the service's own interface. Decide which tool owns which objects. Two tools managing the same object will fight each other: each run of one undoes the other's change, and Terraform shows the same drift on every plan.",
   "When an exam question lists a service and asks whether Terraform can manage it, do not be thrown by the fact that it is not a cloud. Git repositories, DNS zones, identity groups, monitoring dashboards and on-call schedules are all fair game. The question to ask is whether the service has an API and a provider, not whether it runs servers. Providers on the Registry also carry a tier that tells you who maintains them: official providers are owned by HashiCorp, partner providers are written and maintained by technology companies for their own services, and community providers are published by individuals or groups. The tier helps you judge support and maintenance when you choose a provider for production, which is worth checking before you trust a provider with an important system."
  ],
  "analogy": "Service-agnostic Terraform is like a universal shopping list app that can place orders with the grocer, the pharmacy and the hardware store. You write every item in the same format, and the app routes each line to the right store. Where it breaks: the app can only order from stores it has a connection to, just as Terraform can only manage services for which a provider exists.",
  "terms": [
   [
    "Service-agnostic",
    "Able to manage any service that exposes an API, as long as a provider exists for it."
   ],
   [
    "Terraform Registry",
    "The public catalog where providers and modules are published and from which `terraform init` downloads them by default."
   ],
   [
    "Utility provider",
    "A provider such as `random`, `local`, `tls` or `http` that supports configurations without managing a cloud platform."
   ],
   [
    "Branch protection",
    "Git platform rules, such as required reviews, that can be codified with a Git provider."
   ],
   [
    "API",
    "Application programming interface; the programmatic interface a provider uses to manage a service."
   ]
  ],
  "example": "When a team launches a new microservice, one pull request adds a Git repository with branch protection, a Kubernetes namespace, a DNS record and an alert policy. All four are created in one apply, and removing the service later removes all four cleanly.",
  "mistakes": [
   [
    "Terraform can only manage cloud infrastructure such as VMs and networks.",
    "Terraform is service-agnostic. Any service with an API and a provider, including Git platforms, DNS, Kubernetes and monitoring tools, can be managed."
   ],
   [
    "Values from the `random` provider change on every apply.",
    "They are generated once and stored in state, and only change when the resource is replaced."
   ],
   [
    "It is fine for Terraform and another automation tool to both manage the same Kubernetes objects.",
    "Two owners will undo each other's changes and cause constant drift. Assign each object to exactly one tool."
   ]
  ],
  "tryit": [
   [
    "At Willowbank University, the identity team adds and removes members of a dozen access groups by hand in a web interface. An audit found three former staff still in an administrators group. The team already uses Terraform for cloud networks. What would you suggest, and what condition must be met?",
    "Manage the group memberships with Terraform using the identity platform's provider, so every membership change is a reviewed pull request with history, and drift such as a manual addition shows up in the next plan. The condition is that the identity service has an API and a Terraform provider that implements resources for groups and memberships."
   ]
  ],
  "tip": "If a question asks whether Terraform can manage things like GitHub teams, DNS records or monitoring dashboards, the answer is yes, provided a provider exists for the service's API.",
  "check": [
   [
    "What does a service need for Terraform to manage it?",
    "An API and a Terraform provider that implements resources for that API."
   ],
   [
    "Name a provider that manages no remote infrastructure and what it is used for.",
    "`hashicorp/random`, which generates values such as names or passwords that are stored in state; `local` and `tls` are other examples."
   ],
   [
    "Why should only one tool manage a given object?",
    "Two tools managing the same object undo each other's changes, causing constant drift and unpredictable results."
   ]
  ]
 },
 {
  "t": "Terraform vs configuration management tools: provisioning infrastructure vs configuring software inside servers",
  "hook": "Ticket 4471 lands in your queue at Summit Valley Logistics: twenty new web servers are needed behind a load balancer by next week, and each must have the web server package installed, a hardened SSH configuration and three service accounts. Your teammate Jonah has already written a Terraform configuration with a `remote-exec` provisioner that logs in to each server and runs a forty-line install script. It worked once in testing. Then the script failed halfway on server seven, and Terraform marked that server for replacement. Now your lead is asking whether Terraform is even the right tool for the inside of a server. Which part of this job belongs to Terraform, and which does not?",
  "simple": "Building a house and furnishing it are different jobs. Terraform is the builder: it creates the house itself, meaning the servers, networks and other big pieces, by asking the cloud to make them. Tools like Ansible, Chef and Puppet are the furnishers: once the house exists, they go inside and set up the rooms, installing software, writing settings files and creating user accounts, and they come back later to tidy up if something moved. Terraform can hand the furnisher a note on day one, like a first-boot script, but it is not good at tracking what happens inside the rooms. Many teams use both: Terraform builds, and a configuration tool furnishes.",
  "body": [
   "Terraform is a provisioning tool. It creates, updates and deletes infrastructure objects through application programming interfaces (APIs): networks, virtual machines, load balancers, databases, Domain Name System (DNS) records. Configuration management tools such as Ansible, Chef, Puppet and Salt focus on what happens inside a server once it exists: installing packages, writing configuration files, managing users and services, and keeping them in the desired condition over time. The Terraform Associate exam expects you to know where that line falls and what to use on each side of it.",
   "The boundary is not perfectly sharp, and the exam does not pretend it is. Ansible has modules that can create cloud resources, and Terraform can pass a startup script to a new virtual machine. But each tool is designed around a different model. Terraform tracks objects in a state file and plans changes against APIs, so it knows exactly which load balancer it created and can show you a diff before changing it. Configuration management tools usually connect to hosts, often over Secure Shell (SSH) or through an installed agent, and converge the operating system and applications toward a described configuration, repeatedly if needed. Running them on a schedule fixes drift inside the host, such as a changed file permission.",
   "In practice teams combine them. Terraform builds the virtual machine and network, then either hands off to a configuration management tool or avoids the need for one. Common hand-off patterns include passing `user_data` or a cloud-init document that runs at first boot, having the new instance register itself with a configuration management server, or generating an inventory file for Ansible from Terraform outputs such as the list of private IP addresses. Each pattern keeps Terraform responsible for the infrastructure and lets a purpose-built tool own the software.",
   "```hcl\nresource \"aws_instance\" \"web\" {\n  ami       = var.golden_image_id\n  user_data = file(\"${path.module}/cloud-init.yaml\")\n  ...\n}\n```",
   "In this snippet the `...` stands for arguments left out for readability. The `user_data` argument passes a cloud-init document to the instance, which the operating system processes on first boot to install packages or write files. Terraform only knows that it passed the document; it does not track what the document did inside the server.",
   "Terraform does offer provisioners for running commands. The `remote-exec` provisioner runs commands on the new resource over SSH or Windows Remote Management (WinRM), and `local-exec` runs a command on the machine running Terraform. HashiCorp documents provisioners as a last resort, and the reasons are worth knowing for the exam. Terraform cannot model what a script did, so it cannot plan changes to it, detect drift inside the server, or undo it cleanly. Provisioners also need network access and credentials to reach the host at apply time, which adds failure points and security concerns.",
   "Failure behavior is a favorite exam detail. By default, provisioners run when a resource is created. If a create-time provisioner fails, Terraform marks the resource as tainted, and the next plan proposes replacing it, because Terraform cannot know how far the script got. You can change that with `on_failure = continue`, and you can write destroy-time provisioners with `when = destroy`, but the guidance stays the same: prefer cloud-init, prebuilt images or a proper configuration management tool.",
   "A third option avoids in-place configuration entirely: build a machine image with everything preinstalled, for example with HashiCorp Packer, and have Terraform launch instances from that image. When the software needs to change, you build a new image and replace the instances rather than reconfiguring them. That is the immutable infrastructure pattern covered in the next lesson, and it pairs naturally with Terraform's model of creating and replacing whole objects.",
   "For scenario questions, look at the verb. Creating cloud networks, instances, load balancers or DNS records points to Terraform. Installing packages, managing files and services, or enforcing settings inside running servers over time points to configuration management. Running a one-off script during creation points to provisioners, with the reminder that they are the option of last resort. Also watch for answers that blur the two models. An option claiming Terraform will keep a package up to date inside a running server, or that Ansible keeps a state file of cloud resources the way Terraform does, is describing the wrong tool. The cleanest mental model is a relay race: Terraform runs the first leg by creating the infrastructure and handing over addresses and identities, and the configuration management tool or the image runs the second leg inside each machine."
  ],
  "analogy": "Terraform is the construction crew that builds an apartment building to plan; configuration management is the building manager who furnishes units and fixes things inside them week after week. The crew can leave a welcome note in each unit, like cloud-init, but it does not check on the apartments afterward. Where the analogy breaks: unlike a real crew, Terraform does keep checking the building's structure on every run, just not what happens inside the units.",
  "terms": [
   [
    "Provisioning",
    "Creating and managing infrastructure resources themselves, such as servers and networks, typically through APIs."
   ],
   [
    "Configuration management",
    "Installing and maintaining software and settings inside existing servers, as done by Ansible, Chef, Puppet or Salt."
   ],
   [
    "Provisioner",
    "A Terraform block such as `local-exec` or `remote-exec` that runs commands; a last resort because its effects are not tracked."
   ],
   [
    "cloud-init / user_data",
    "A mechanism for passing a first-boot script or configuration to a new virtual machine."
   ],
   [
    "Tainted",
    "A resource marked for replacement, for example after a create-time provisioner fails."
   ]
  ],
  "example": "An operations team uses Terraform to create 20 web servers and a load balancer, and passes each server's address to an Ansible inventory. Ansible then installs the web server software and hardens the operating system, and runs again weekly to fix any drift inside the hosts.",
  "mistakes": [
   [
    "Provisioners are the recommended way to configure software on new servers.",
    "HashiCorp calls provisioners a last resort. Prefer cloud-init or `user_data`, prebuilt images, or a configuration management tool."
   ],
   [
    "If a provisioner fails, Terraform rolls back the resource automatically.",
    "With a create-time provisioner failure the resource is left in place and marked tainted, and the next apply replaces it."
   ],
   [
    "Terraform and Ansible are competitors, so a team must choose one.",
    "They are usually complementary: Terraform provisions infrastructure and configuration management handles the software inside servers."
   ],
   [
    "Terraform detects drift inside a server, such as a changed config file.",
    "Terraform tracks resource attributes exposed by the provider API, not files or packages inside the operating system."
   ]
  ],
  "tryit": [
   [
    "At Crestline Media, an engineer wants every new virtual machine to have a monitoring agent installed. She is choosing between a `remote-exec` provisioner that runs an install script over SSH and a cloud-init document passed through `user_data`. The team does not want to open SSH from the pipeline to every server. Which should she choose and why?",
    "The cloud-init document through `user_data`. It runs at first boot without Terraform needing SSH access or credentials, and it avoids the provisioner's untracked side effects and tainting on failure. Better still for consistency would be baking the agent into a golden image so every instance starts with it."
   ]
  ],
  "tip": "When the exam asks which tool is best for creating cloud networks and instances, pick Terraform; for managing packages and files inside running servers, pick configuration management. Provisioners are a last resort.",
  "check": [
   [
    "Why does HashiCorp call provisioners a last resort?",
    "Terraform cannot model or plan what a script does, so it cannot detect drift or reverse it; declarative alternatives such as cloud-init, images or configuration management are preferred."
   ],
   [
    "What happens to a resource if its create-time provisioner fails?",
    "It is marked tainted, so Terraform plans to replace it on the next apply."
   ],
   [
    "What is the difference between `local-exec` and `remote-exec`?",
    "`local-exec` runs a command on the machine running Terraform; `remote-exec` runs commands on the remote resource over SSH or WinRM."
   ]
  ]
 },
 {
  "t": "Immutable infrastructure: replace rather than patch in place",
  "hook": "A critical library patch drops on a Thursday afternoon, and Fernhill Mutual has fifty web servers that need it. The last time this happened, the team logged in to each server one at a time. Server 23 had a slightly different version of the library from a fix someone made a year ago, the patch failed there, and a half-patched server served errors for an hour before anyone noticed. Today your colleague Mei suggests something that sounds wasteful at first: do not touch the running servers at all. Build fresh ones and throw the old ones away. Is that reckless, or is it the safer path?",
  "simple": "There are two ways to keep a fleet of servers up to date. One is to fix each server where it stands, the way you might repaint and repair an old car piece by piece. Over years, every car ends up a little different. The other way is to never change a running server at all. When something needs to change, you build a brand-new server from a fresh, tested template, swap it in, and remove the old one. This is called immutable infrastructure, because the running pieces never change. It sounds like more work, but because every server comes from the same template, they all match, problems are easier to undo, and nobody needs to log in to fix things by hand.",
  "body": [
   "In a mutable model, you keep servers running for a long time and change them in place: log in, apply patches, edit configuration files, upgrade software. Over months, each server accumulates its own history of changes, and two servers that started identical slowly diverge. These are sometimes called snowflake servers because no two are alike. Rebuilding one exactly becomes hard, testing a change on one server says little about how it will behave on another, and nobody is fully sure what is running in production.",
   "Immutable infrastructure flips this. Once a component is deployed, you do not modify it. When something needs to change, you build a new version, deploy it alongside or instead of the old one, and destroy the old one. Every running instance is built from a known, versioned definition, such as a machine image or container image, so what runs in production is exactly what was tested. The phrase to remember for the Terraform Associate exam is replace rather than patch in place.",
   "Terraform supports this pattern naturally. Many resource arguments cannot be changed on a live object because the underlying API does not allow it; changing them forces replacement. The plan marks such a resource with `-/+` and notes which argument forces replacement. For a virtual machine, changing the image ID is the typical example. The usual workflow is to bake a new machine image with HashiCorp Packer or a similar tool, update the image ID variable in Terraform, and apply. Terraform destroys the old instance and creates a new one from the new image.",
   "Replacement order matters for availability. By default, Terraform destroys the old object before creating the new one, because some objects cannot exist twice at the same time, for example when a unique name must be reused. That default can mean a gap in service. Adding `lifecycle { create_before_destroy = true }` reverses the order: the new object is created first, and the old one is destroyed only after the new one succeeds. In plan output this reversed replacement is shown as `+/-`. Combined with a load balancer, an auto scaling group or a rolling deployment, this gives zero or near-zero downtime updates.",
   "```hcl\nresource \"aws_instance\" \"web\" {\n  ami           = var.image_id\n  instance_type = \"t3.small\"\n\n  lifecycle {\n    create_before_destroy = true\n  }\n}\n```",
   "Watch out for one practical catch with `create_before_destroy`. Because the old and new objects exist at the same time for a moment, any argument that must be unique, such as a fixed name, can cause the create step to fail with a conflict. Teams usually solve this with name prefixes or generated names so the replacement can coexist briefly with the original. Also note that `create_before_destroy` affects ordering, not health checking. Terraform considers the new object created once the provider reports success; it is the load balancer or auto scaling group in front of it that decides when real traffic shifts, so pair the setting with health checks that confirm the new instance is actually ready.",
   "You can also trigger replacement deliberately, even when no argument has changed. Running `terraform apply -replace=\"aws_instance.web\"` tells Terraform to plan a replacement of that one resource, which is useful when an instance is unhealthy or has been tampered with. This option is the recommended way to force replacement and has taken the place of the older `terraform taint` command for this purpose, because it shows you the replacement in a plan before anything happens.",
   "The benefits of immutability are concrete. Consistency improves because every instance comes from the same image. Rollback becomes simple: redeploy the previous image. Configuration drift shrinks because nobody changes servers by hand, and the attack surface shrinks because production servers do not need interactive logins for routine changes. Security patches are applied by rebuilding images and replacing instances, so you know exactly which version every server runs.",
   "The costs are real too. Data must live outside the replaceable parts, in managed databases, object storage or separately managed volumes, or it will be lost when an instance is destroyed. Your pipeline must be able to build, test and roll out new images quickly, or patching becomes slower than logging in. Finally, Terraform does not force immutability: in-place updates remain available for arguments the provider can change on a live object, such as tags, and the plan marks those with `~`. Immutable infrastructure is a practice you choose, which Terraform's replace behavior makes easy."
  ],
  "analogy": "Immutable infrastructure is like replacing a paper cup instead of washing and patching an old mug. Every fresh cup is identical and clean, and if one is bad you grab another from the same sleeve. Where the analogy breaks: you would not throw away the coffee with the cup, and in the same way your data must live outside the replaceable server, in a database or storage service, so it survives the swap.",
  "terms": [
   [
    "Immutable infrastructure",
    "A practice where deployed components are never modified; changes are made by replacing them with new versions."
   ],
   [
    "Mutable infrastructure",
    "Servers that are updated and patched in place over their lifetime."
   ],
   [
    "Snowflake server",
    "A server whose configuration has drifted into something unique and hard to reproduce."
   ],
   [
    "Golden image",
    "A pre-built, versioned machine image containing the OS and software, used to launch identical instances."
   ],
   [
    "create_before_destroy",
    "A lifecycle setting that makes Terraform create the replacement before destroying the original."
   ],
   [
    "-replace",
    "A plan and apply option that forces Terraform to replace a specific resource even if its configuration has not changed."
   ]
  ],
  "example": "A critical OpenSSL patch is released. Instead of logging in to 50 servers, the team rebuilds its golden image with Packer, updates the image ID in Terraform, and applies. Instances are replaced behind the load balancer with `create_before_destroy`, and every server now runs the identical patched image.",
  "mistakes": [
   [
    "By default, Terraform creates the new resource before destroying the old one.",
    "The default is destroy then create, shown as `-/+`. Setting `create_before_destroy = true` reverses it, shown as `+/-`."
   ],
   [
    "Terraform forces you to use immutable infrastructure.",
    "Arguments the provider can update in place are changed with `~`. Immutability is a practice; Terraform makes replacement easy but does not require it."
   ],
   [
    "Data stored on an instance survives replacement.",
    "When an instance is destroyed, data on it is lost unless it lives in a separate database, object storage or a separately managed volume."
   ]
  ],
  "tryit": [
   [
    "At Ironbridge Analytics, a team updates the image ID for a single web server behind a DNS name and sees a plan with `-/+` and the note that the change forces replacement. The service has no load balancer, and users complained about downtime during the last update. What should they change before applying?",
    "Add `lifecycle { create_before_destroy = true }` so the new instance is created and healthy before the old one is destroyed; the plan will then show `+/-`. Ideally they would also put the instance behind a load balancer and make sure no unique argument, such as a fixed name, prevents the two instances from existing briefly at the same time."
   ]
  ],
  "tip": "Know that Terraform's default replacement order is destroy then create, and that `create_before_destroy` reverses it. In plan output, `-/+` means replace (destroy then create), while `+/-` means create then destroy.",
  "check": [
   [
    "How is a patch applied in an immutable infrastructure model?",
    "By building a new image or artifact with the patch and replacing the running components, not by modifying them in place."
   ],
   [
    "What is Terraform's default order when a resource must be replaced, and how do you change it?",
    "Destroy the old object, then create the new one; set `lifecycle { create_before_destroy = true }` to create the new one first."
   ],
   [
    "How can you force Terraform to replace a resource whose configuration has not changed?",
    "Run plan or apply with `-replace=\"ADDRESS\"`, for example `-replace=\"aws_instance.web\"`."
   ]
  ]
 },
 {
  "t": "Installing Terraform and pinning its version with `required_version`",
  "hook": "A new contractor, Theo, joins the infrastructure team at Bluefield Water Authority on Monday. By Monday afternoon he has opened a help-desk ticket: every Terraform command he runs in the main repository fails with a wall of syntax errors about blocks he has never seen. His teammates run the same commands on the same code without trouble. After an hour of comparing laptops, someone notices Theo installed Terraform from an old package he found on a shared drive. The code was fine all along. What one line in the configuration would have turned an hour of confusion into a clear, immediate message?",
  "simple": "Terraform is a single program file you download and run, like a portable app that does not need a big installer. Different releases of Terraform understand slightly different features, a bit like how an old word processor cannot open some files made by a newer one. To prevent confusion, a Terraform project can say which releases it works with, using a setting called `required_version`. If you try to run the project with a release that does not fit, Terraform stops right away and tells you plainly that your version is wrong, instead of failing in confusing ways. It is like a recipe card that says this recipe needs a convection oven, so you know before you start.",
  "body": [
   "Terraform is distributed as a single executable binary called `terraform`. There is no server to run and no database to install; you put the binary somewhere on your PATH, the list of directories your shell searches for commands, and run it. HashiCorp publishes builds for Linux, macOS and Windows on several processor architectures, and also provides package repositories so you can install and update it with tools such as `apt`, `yum` or `dnf` on Linux, Homebrew on macOS, or Chocolatey on Windows. Many teams also use a version manager so different projects can use different Terraform releases on the same machine.",
   "After installing, confirm it works with `terraform version` (or `terraform -version`). The output shows the Terraform version and the platform it was built for, and, when run in an initialized working directory, the provider versions in use. If a newer release is available, it also tells you. Two other commands are handy on day one: `terraform -help` lists the subcommands, and `terraform -install-autocomplete` sets up tab completion for your shell. None of these require a cloud account, which makes them a good first check that installation succeeded.",
   "Because Terraform's behavior and features change between releases, a configuration should state which Terraform versions it works with. That is the job of the `required_version` setting inside the top-level `terraform` block. It takes a version constraint string, and Terraform checks the running binary against it before doing anything else. If the running version does not satisfy the constraint, commands such as `init`, `plan` and `apply` stop with an error explaining that the configuration does not support this Terraform version. That clear message is the whole point.",
   "```hcl\nterraform {\n  required_version = \">= 1.12.0, < 2.0.0\"\n}\n```",
   "Why pin at all? Imagine one teammate on a newer Terraform release applies a configuration and the state file is written in a way an older release does not expect, or a configuration relies on a language feature only available in recent versions. Without a constraint, the person on the older version sees confusing parse errors or unexpected behavior. A clear constraint turns that confusion into an immediate, readable error. It also documents for future readers which version the code was written and tested against, which matters when someone opens the repository a year later.",
   "How tightly to pin is a judgment call. Pinning to an exact version, such as `= 1.12.1`, forces everyone to upgrade in lockstep and blocks harmless patch releases. Leaving it open-ended, such as `>= 1.0`, gives little protection against a future major release. Most teams use a range with an upper bound, like the example above, or the pessimistic constraint operator, such as `~> 1.12`, which allows newer releases within the same major version: 1.13 or 1.20, but not 2.0. Version constraint operators are covered in detail in a later lesson; for now, recognize that `required_version` accepts the same constraint syntax used for providers.",
   "Two details are commonly tested. First, `required_version` constrains only the Terraform command-line interface (CLI) version, not providers; providers are pinned separately in the `required_providers` block, which is the subject of the next lesson. Second, settings in the `terraform` block must be literal values. You cannot use input variables, locals or other expressions inside `required_version`, because Terraform must evaluate the block before it has processed the rest of the configuration. Writing `required_version = var.tf_version` produces an error. The same literal-only rule applies to the `required_providers` and `backend` settings in that block, which is why exam questions about using variables in a backend configuration also have the answer no.",
   "Modules can declare their own constraints too. A child module can include a `terraform` block with `required_version`, and every module in the configuration must be satisfied by the running binary. If the root module allows `>= 1.10` but a child module requires `>= 1.12`, a Terraform 1.11 binary will refuse to run. When you publish reusable modules, a minimum version constraint tells users which language features the module depends on.",
   "In HCP Terraform, HashiCorp's managed service for running Terraform, each workspace has its own Terraform version setting that chooses which binary runs remote plans and applies. That chosen version must still satisfy the configuration's `required_version`, or the run fails the same way it would on a laptop. Upgrading a workspace's version is therefore a deliberate step that should be coordinated with the constraints in the code."
  ],
  "analogy": "`required_version` works like the minimum and maximum height sign at an amusement park ride. Before anyone boards, the attendant checks you against the sign, and if you do not fit, you are turned away at the gate rather than discovering a problem halfway through the ride. Where the analogy stops: the sign is fixed in the code as a literal value, so you cannot pass in a different sign at runtime with a variable.",
  "terms": [
   [
    "terraform block",
    "The top-level block for settings about Terraform itself, such as `required_version`, `required_providers` and `backend`."
   ],
   [
    "required_version",
    "A version constraint that the running Terraform CLI must satisfy, or commands fail."
   ],
   [
    "terraform version",
    "Command that prints the installed Terraform version, platform and, in an initialized directory, provider versions."
   ],
   [
    "Version constraint",
    "A string of one or more conditions, such as `>= 1.12.0, < 2.0.0`, that a version must meet."
   ],
   [
    "Pessimistic constraint (`~>`)",
    "An operator that allows only the rightmost specified version component to increase, such as `~> 1.12` allowing 1.x releases from 1.12 upward."
   ]
  ],
  "example": "A contractor with an old Terraform install runs `terraform plan` on your repository. Because the configuration says `required_version = \"~> 1.12\"`, Terraform stops immediately with an unsupported version error, and the contractor upgrades instead of getting confusing syntax errors from newer language features.",
  "mistakes": [
   [
    "`required_version` pins the versions of providers.",
    "It constrains only the Terraform CLI. Providers are constrained with `version` inside `required_providers`."
   ],
   [
    "You can set `required_version` from a variable so each environment chooses its own version.",
    "The `terraform` block accepts only literal values. Variables and expressions are not allowed there."
   ],
   [
    "Pinning an exact version is always the safest choice.",
    "An exact pin forces lockstep upgrades and blocks patch releases. Most teams use a bounded range or `~>`."
   ],
   [
    "Only the root module's `required_version` matters.",
    "Every module's constraint must be satisfied by the running Terraform binary."
   ]
  ],
  "tryit": [
   [
    "At Harborview Hospital, a root module sets `required_version = \">= 1.9\"`. A shared networking module it calls sets `required_version = \">= 1.12\"`. An engineer runs Terraform 1.10 and gets an error, but insists the root module allows her version. Who is right, and what should she do?",
    "The error is correct. Every module's constraint must be satisfied, so the effective requirement is at least 1.12. She should upgrade her Terraform binary to a release that satisfies both constraints, and the team might update the root constraint so the requirement is visible at the top level."
   ]
  ],
  "tip": "Remember the split: `required_version` pins the Terraform CLI; `required_providers` pins providers. Neither accepts variables, because the `terraform` block only takes literal values.",
  "check": [
   [
    "Where is `required_version` declared and what does it constrain?",
    "In the top-level `terraform` block; it constrains which Terraform CLI versions may run the configuration."
   ],
   [
    "Can you set `required_version = var.tf_version`?",
    "No. Settings in the `terraform` block must be literal constants, not variables or expressions."
   ],
   [
    "Which command shows the installed Terraform version?",
    "`terraform version` (or `terraform -version`), which also shows provider versions in an initialized directory."
   ]
  ]
 },
 {
  "t": "The `required_providers` block: `source` addresses (hostname/namespace/type) and `version` constraints",
  "hook": "The release pipeline at Maple Grove Credit Union has been green for months. On Tuesday morning it turns red: a provider downloaded during `terraform init` is a brand-new major version, and three resource arguments your configuration relies on have been renamed. Nobody changed the code. Your teammate Inés scrolls to the top of `versions.tf` and finds the AWS provider declared with a source but no version at all. Meanwhile a junior engineer asks a quieter question in the channel: where does Terraform even download providers from, when the source just says `hashicorp/aws`? Two questions, one block. What should it say?",
  "simple": "Before Terraform can use a provider, it needs to know two things: where to get it and which versions are acceptable. The `required_providers` block answers both. The source is like a mailing address with three parts: the store, the company that makes the provider, and the provider's name. If you leave the store out, Terraform assumes the public Terraform Registry. The version setting is like telling a pharmacy which strengths of a medicine are acceptable, so you do not suddenly get a very different one. Writing both down means everyone on the team, and every automated pipeline, gets the right provider from the right place, and a surprise new release cannot quietly break your work.",
  "body": [
   "Every provider a module uses should be declared in a `required_providers` block nested inside the top-level `terraform` block. Each entry maps a local name, which is how you refer to the provider inside this module, to two key settings: the `source` address that says where to find the provider, and a `version` constraint that says which releases are acceptable. Together they make provider installation predictable for every teammate and pipeline that runs `terraform init`.",
   "```hcl\nterraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n    random = {\n      source  = \"hashicorp/random\"\n      version = \">= 3.5\"\n    }\n  }\n}\n```",
   "A source address has three parts: `HOSTNAME/NAMESPACE/TYPE`. The hostname is the registry that distributes the provider. It is optional and defaults to `registry.terraform.io`, the public Terraform Registry, so `hashicorp/aws` is shorthand for `registry.terraform.io/hashicorp/aws`. The namespace is the organization or person that publishes the provider, such as `hashicorp` for providers HashiCorp maintains or `integrations` for the GitHub provider. The type is the short provider name, such as `aws`, `azurerm` or `github`, and by convention it matches the prefix of that provider's resource types. Exam questions love the hidden default hostname, so make sure you can expand a two-part source into its full three-part form.",
   "Private registries use a different hostname. An organization using the private registry in HCP Terraform, HashiCorp's managed service, writes a source whose hostname is the HCP Terraform address, followed by the organization name as the namespace and then the provider type, for example `app.terraform.io/example-org/internaltool`. The format is the same; only the host changes. Terraform can also be configured, through the command-line interface (CLI) configuration file, to install providers from a local filesystem mirror or a network mirror, which is useful on networks without internet access. In those cases the source address in your configuration usually stays the same, and only where Terraform fetches the files changes.",
   "The local name, the key on the left such as `aws`, usually matches the type. It is the name you use in `provider \"aws\"` configuration blocks, and it is what Terraform matches against resource type prefixes, so `aws_instance` goes to the provider whose local name is `aws`. The local name only needs to be unique within the module. If two providers from different namespaces happen to share a type name, you can give one of them a different local name, and then select it on resources with the `provider` meta-argument.",
   "The `version` argument accepts a constraint string, explained fully in the next lesson. Constraints in `required_providers` are combined across all modules in the configuration. If the root module asks for `>= 5.0` and a child module asks for `< 6.0`, Terraform picks the newest available version that satisfies both. If no version satisfies every constraint, `terraform init` fails and tells you which constraints conflict. The version actually selected is then recorded in the dependency lock file, `.terraform.lock.hcl`, along with checksums, so later runs reuse the same version until you deliberately run `terraform init -upgrade`.",
   "If you use a resource without declaring its provider at all, Terraform infers a source of `hashicorp/<prefix>` from the resource type. That works for providers HashiCorp publishes under its own namespace, but it fails or finds the wrong provider for everyone else, such as a partner provider published under a company namespace. Leaving out `version` is also allowed, but then `init` selects the newest release available the first time, which is how a surprise major version can break a pipeline. Always declare providers explicitly, with both source and version.",
   "Best practice differs slightly between kinds of module. Reusable child modules should state a minimum version, such as `>= 5.0`, describing the features they need, without an upper bound that would block callers from upgrading. Root modules, the configurations you actually apply, should also set an upper bound, often with the pessimistic operator such as `~> 5.0`, so that a new major release is adopted on purpose after testing rather than by accident. The lock file then pins the exact version within that range.",
   "To tie it together, picture what `terraform init` does with this block. It reads each entry, expands the source to its full address, asks that registry for available versions, chooses the newest version that satisfies every module's constraints and the lock file, downloads the plugin into `.terraform`, and records the choice. Every piece of that process depends on the two settings in `required_providers`: where to look and what to accept."
  ],
  "analogy": "A provider source address works like a full shipping label: country, company and product. If you leave off the country, the shipper assumes your home country, just as Terraform assumes `registry.terraform.io` when you omit the hostname. The `version` constraint is the note saying which model years you will accept. The analogy stops at the lock file: once a version is chosen, Terraform keeps reordering that exact item until you ask to upgrade.",
  "terms": [
   [
    "required_providers",
    "Block inside `terraform` that declares each provider's local name, source address and version constraint."
   ],
   [
    "Source address",
    "The `HOSTNAME/NAMESPACE/TYPE` identifier telling Terraform where to download a provider."
   ],
   [
    "Namespace",
    "The publisher part of a source address, such as `hashicorp` or a company or user name."
   ],
   [
    "Local name",
    "The module-specific name for a provider, used in provider blocks and matched to resource type prefixes."
   ],
   [
    "Dependency lock file",
    "`.terraform.lock.hcl`, which records the provider versions and checksums selected by `terraform init`."
   ]
  ],
  "example": "A team adds the Datadog provider. They declare `datadog = { source = \"DataDog/datadog\", version = \"~> 3.0\" }` in `required_providers`, run `terraform init`, and Terraform downloads it from the public registry because no hostname was given.",
  "mistakes": [
   [
    "The default hostname for a provider source is the HCP Terraform address.",
    "When the hostname is omitted, it defaults to `registry.terraform.io`, the public Terraform Registry."
   ],
   [
    "Leaving out `version` is safe because Terraform picks a stable release.",
    "Without a constraint, init may select the newest release, including a new major version with breaking changes. Declare a constraint and commit the lock file."
   ],
   [
    "If modules declare different version constraints, the root module's constraint wins.",
    "Constraints from all modules are combined, and Terraform selects the newest version that satisfies every one; if none does, init fails."
   ],
   [
    "Any provider can be used without declaring it, because Terraform finds it automatically.",
    "Undeclared providers are assumed to be `hashicorp/<prefix>`, which is wrong for providers published under other namespaces."
   ]
  ],
  "tryit": [
   [
    "At Cedar Point Telecom, a configuration declares `pagerduty = { source = \"PagerDuty/pagerduty\" }` with no version. The root module is applied by a nightly pipeline that runs `terraform init` in a fresh workspace and does not commit the lock file. A teammate worries about surprise upgrades. What two changes would you recommend, and why?",
    "Add a version constraint such as `~> 3.0` so a new major release is never selected automatically, and commit `.terraform.lock.hcl` so every run uses the exact version the team tested. Upgrades then happen deliberately with `terraform init -upgrade` and a reviewed change to the lock file."
   ],
   [
    "A colleague sees `source = \"hashicorp/azurerm\"` and asks where Terraform will download it from and what each part means. What is your answer?",
    "From `registry.terraform.io`, the default hostname. The full address is `registry.terraform.io/hashicorp/azurerm`: the hostname is the public registry, the namespace `hashicorp` is the publisher, and the type `azurerm` is the provider name that matches resource prefixes such as `azurerm_resource_group`."
   ]
  ],
  "tip": "If a question shows `source = \"hashicorp/aws\"` and asks for the full address, the hidden default hostname is `registry.terraform.io`.",
  "check": [
   [
    "What are the three parts of a provider source address and which is optional?",
    "Hostname, namespace and type; the hostname is optional and defaults to `registry.terraform.io`."
   ],
   [
    "If the root module requires `aws` version `>= 5.0` and a child module requires `< 5.40`, what does Terraform choose?",
    "The newest available version satisfying both constraints, which is then recorded in the lock file."
   ],
   [
    "What does Terraform assume if a resource's provider is not declared in `required_providers`?",
    "A source of `hashicorp/<prefix>`, based on the resource type prefix, which is wrong for providers from other namespaces."
   ]
  ]
 },
 {
  "t": "Version constraint operators: `=`, `!=`, `>=`, `<=`, and the pessimistic `~>`",
  "hook": "It is Thursday afternoon at Lantern Freight, and Priya's pull request looks harmless: a new tag on three storage buckets. The pipeline plan, though, shows forty resources changing, and half of them say `forces replacement`. Nobody touched those resources. You scroll up and find the clue in the init output: a provider moved from version 4 to version 5 overnight, because someone deleted the lock file and the constraint read `>= 4.0`. Nothing in the code was wrong, exactly. The constraint simply allowed far more than anyone meant it to. How should that one line have been written so a surprise major upgrade could never slip in?",
  "simple": "Software tools release new versions over time, usually numbered like 5.31.2. The first number changes when something big and possibly breaking happens, the second when features are added, and the third for small bug fixes. A version constraint is a short rule you write that tells Terraform which versions you are willing to use. It works like telling a friend who is shopping for you: buy any milk from this brand, but not the new formula, and definitely not that one bad batch from last week. The special `~>` operator means: newer is fine, but only by updating the last number I wrote. So `~> 5.31.0` means bug fixes only, while `~> 5.31` means any 5.x from 5.31 up, but never version 6.",
  "body": [
   "Terraform uses one shared version constraint syntax in three places: the `required_version` setting in the `terraform` block, which limits which Terraform CLI versions may run the configuration; the `version` argument for each provider in `required_providers`; and the `version` argument on module blocks that call registry modules. A constraint is a string containing one or more conditions separated by commas, and a version is acceptable only if it satisfies all of them at once. Versions follow semantic versioning, written MAJOR.MINOR.PATCH, where a major bump may break compatibility, a minor bump adds features in a compatible way, and a patch bump fixes bugs.",
   "Start with the simple operators. `=` or no operator at all means exactly this version and nothing else. `!=` excludes one specific version while letting the other conditions decide the rest. `>`, `>=`, `<` and `<=` are the ordinary comparisons you already know from math. Combining them gives you ranges. For example, `\">= 1.2.0, < 2.0.0\"` allows anything from 1.2.0 up to but not including 2.0.0, and `\">= 3.5, != 3.7.1\"` allows 3.5 and every newer release while skipping one release that is known to have a bug. Because every condition must hold, adding a `!=` to a range is a clean way to dodge a single bad version.",
   "The pessimistic constraint operator, `~>`, is the one the exam cares about most. It allows only the rightmost version component you wrote to increase. Read `~> 1.2.0` as at least 1.2.0 but below 1.3.0, so it accepts 1.2.0, 1.2.1, 1.2.9 and so on: new patches only. Read `~> 1.2` as at least 1.2 but below 2.0, so it accepts 1.3, 1.9, 1.10 and any 1.x from 1.2 up: new minor and patch releases, but never a new major version. The number of components you write therefore decides how much freedom you allow. Writing more components is stricter; writing fewer is looser.",
   "```hcl\nversion = \"~> 5.0\"      # >= 5.0.0, < 6.0.0\nversion = \"~> 5.31.0\"   # >= 5.31.0, < 5.32.0\nversion = \"= 3.6.2\"     # exactly 3.6.2\nversion = \">= 2.0, < 3.0\"\n```",
   "There is a reliable way to find the upper bound of any `~>` constraint without memorizing examples. Drop the last component you wrote, then add one to the component that is now last, and treat the result as an exclusive upper limit. For `~> 2.1.3`, drop the 3 and increment the 1, giving less than 2.2.0. For `~> 2.1`, drop the 1 and increment the 2, giving less than 3.0. The lower bound is always the version exactly as written. If you can do this calculation in a few seconds, most constraint questions on the exam become arithmetic rather than guesswork.",
   "Pre-release versions get special treatment. A version such as `1.5.0-beta1` is matched only by an exact constraint, that is `=` or no operator. Range operators, including `>=` and `~>`, ignore pre-releases entirely. This is a safety feature: a broad constraint like `~> 1.5` will never quietly pull in a beta or release candidate, and you can only test a pre-release by naming it on purpose.",
   "Which style should you choose? HashiCorp's guidance separates reusable modules from root modules. A reusable child module should specify only a minimum version, for example `>= 5.0`, so that it combines easily with other modules that may need newer releases; if every module set a tight upper bound, Terraform could fail to find any version that satisfies all of them together. The root module, the one you actually run, should use `~>` or an explicit range so that a surprise major release cannot slip in. Exact pins are rarely needed for providers, because the dependency lock file already records the exact version selected. The constraint describes what is allowed when someone deliberately upgrades with `terraform init -upgrade`, while the lock file decides what is actually used day to day.",
   "Remember too that Terraform combines constraints from every module in the configuration. If the root module says `~> 5.0` for a provider and a child module says `>= 5.20`, Terraform needs a version that satisfies both, so it picks something in the 5.20 to 5.x range. If two constraints cannot both be met, such as `~> 4.0` in one place and `>= 5.0` in another, `terraform init` fails and reports that no available version matches. Reading that error is usually a matter of finding which module set the conflicting rule.",
   "The classic exam trap is treating `~> 1.2` and `~> 1.2.0` as the same thing. The first allows 1.9 because only the major version is fixed; the second does not, because the minor version is fixed too. Another trap is assuming `~>` means approximately equal in some vague sense. It has a precise meaning, and the components you write define it exactly."
  ],
  "analogy": "A pessimistic constraint is like a hotel booking that says: any room on the fourth floor. You might get room 401 or room 412, but never a room on the fifth floor. If you instead write: any room in the 41x block, you can get 410 through 419 but not 420. Writing more digits narrows your options. The analogy stops at the lower bound: `~>` also refuses anything below the version you wrote, while the hotel would happily put you in room 400.",
  "terms": [
   [
    "Semantic versioning",
    "Versioning scheme MAJOR.MINOR.PATCH where major changes may break compatibility, minor adds features and patch fixes bugs."
   ],
   [
    "Pessimistic constraint (~>)",
    "Allows only the rightmost specified version component to increase, so `~> 1.2` means >= 1.2 and < 2.0."
   ],
   [
    "Exact constraint (=)",
    "Allows only one specific version; also the only way to select a pre-release."
   ],
   [
    "Exclusion (!=)",
    "Rejects a specific version while allowing others permitted by the remaining conditions."
   ],
   [
    "required_version",
    "A setting in the `terraform` block that constrains which Terraform CLI versions may run the configuration."
   ]
  ],
  "example": "A provider release 4.12.0 has a bug that breaks your load balancer settings. You set `version = \"~> 4.11, != 4.12.0\"` so the team stays on 4.x, skips the broken release, and still picks up 4.12.1 once the fix ships.",
  "mistakes": [
   [
    "`~> 1.2` and `~> 1.2.0` mean the same thing.",
    "They do not. `~> 1.2` allows any 1.x from 1.2 up, including 1.9; `~> 1.2.0` allows only 1.2.x patch releases."
   ],
   [
    "A broad range like `>= 1.5` will pick up a beta such as 1.6.0-beta1 if it is the newest.",
    "Range operators ignore pre-releases. Only an exact `=` constraint, or no operator, can select a pre-release."
   ],
   [
    "Reusable modules should pin exact provider versions to be safe.",
    "HashiCorp recommends only a minimum version in reusable modules so they combine with other modules; root modules set the tighter upper bound."
   ],
   [
    "The constraint alone guarantees everyone uses the same version.",
    "Constraints define what is allowed. The dependency lock file records the exact version actually selected so every run uses the same one."
   ]
  ],
  "tryit": [
   [
    "Your root module currently uses provider 3.4.2. You want to accept bug fixes and new features within version 3 automatically when someone upgrades, but never version 4. A teammate proposes `~> 3.4.2`. Is that right?",
    "No. `~> 3.4.2` allows only 3.4.x patches. Use `~> 3.4`, which means >= 3.4 and < 4.0, accepting new minor and patch releases of version 3 but no major upgrade."
   ],
   [
    "Version 2.8.0 of a provider has a known defect, and 2.8.1 fixes it. You want to stay on major version 2, at 2.7 or newer. Write a constraint.",
    "`\">= 2.7, < 3.0, != 2.8.0\"` or the equivalent `\"~> 2.7, != 2.8.0\"`. Both keep you on 2.x from 2.7 up and skip only the broken release."
   ]
  ],
  "tip": "Upper bound rule for `~>`: remove the last written component and add one to the new last component. `~> 2.1.3` means < 2.2.0; `~> 2.1` means < 3.0.",
  "check": [
   [
    "Does `~> 1.4.0` allow version 1.5.0?",
    "No. It allows >= 1.4.0 and < 1.5.0, so only patch releases of 1.4."
   ],
   [
    "What does `\"~> 3.0\"` allow?",
    "Any version from 3.0.0 up to but not including 4.0.0."
   ],
   [
    "What constraint style does HashiCorp recommend for reusable modules?",
    "A minimum version such as `>= 5.0`, leaving tighter upper bounds to the root module."
   ],
   [
    "Which operator can select a pre-release version such as 2.0.0-rc1?",
    "Only an exact constraint, `=` or no operator; range operators ignore pre-releases."
   ]
  ]
 },
 {
  "t": "The dependency lock file `.terraform.lock.hcl`: what it records and why it is committed",
  "hook": "At Juniper Health Partners, Marcus runs `terraform plan` on his laptop and sees no changes. Ten minutes later the continuous integration job runs the same plan on the same commit and wants to modify six resources. Same code, same state, different answer. You compare the two logs line by line and finally spot it: Marcus is on provider 5.40.0, while the pipeline installed 5.42.0 that morning, because nothing told it otherwise. The constraint `~> 5.0` allowed both. Someone on the team says the fix is to pin an exact version everywhere. Someone else says there is a file for exactly this problem, and it was left out of the repository. Who is right?",
  "simple": "When Terraform downloads the plugins it needs, called providers, it writes a small note listing exactly which version of each one it chose, plus a fingerprint of the downloaded file. That note is the lock file, `.terraform.lock.hcl`. Next time, on any computer, Terraform reads the note and installs the same versions again instead of grabbing whatever is newest. Think of a family recipe that says not just flour but the exact brand and bag size, so the cake comes out the same in every kitchen. You save the lock file alongside your code so everyone shares the same note. When you truly want newer versions, you ask for an upgrade on purpose, and the note gets updated.",
  "body": [
   "Version constraints say which provider versions are acceptable. They do not guarantee that everyone uses the same version. If your constraint is `~> 5.0` and a new 5.x release comes out tomorrow, a teammate who initializes a fresh clone could get a different version from you, and the continuous integration (CI) pipeline could get yet another. Small differences between provider versions can change defaults, add new attributes or fix bugs in ways that alter a plan. The dependency lock file, `.terraform.lock.hcl`, exists to remove that uncertainty.",
   "When `terraform init` installs providers, it writes or updates `.terraform.lock.hcl` in the root module directory, the directory where you run Terraform. For each provider it records the full source address, such as `registry.terraform.io/hashicorp/random`, the exact version selected, the constraints that were in effect at the time, and a set of checksums, also called hashes, of the provider packages. On later runs of `init`, Terraform reuses the recorded version rather than picking the newest one allowed, and it verifies that the downloaded package matches one of the recorded hashes before using it.",
   "```hcl\nprovider \"registry.terraform.io/hashicorp/random\" {\n  version     = \"3.6.2\"\n  constraints = \"~> 3.5\"\n  hashes = [\n    \"h1:...\",\n    \"zh:...\",\n  ]\n}\n```",
   "Commit this file to version control. That is the single most important rule about it. Once it is in the repository, your laptop, your teammates' laptops, the CI pipeline and HCP Terraform all install exactly the same provider versions, and a change of provider version appears as a visible diff in a pull request where reviewers can question it. The file is generated by Terraform, so you should not edit it by hand, but you should read its diffs the same way you read code diffs. If a pull request changes the locked version of a cloud provider, that deserves a look at the provider's changelog before merging.",
   "The hashes also add a supply-chain safeguard. A checksum is a fingerprint calculated from the contents of a file; if even one byte changes, the fingerprint changes. If a downloaded package does not match any recorded checksum, init fails instead of running an unexpected binary. That protects you from a tampered mirror or a corrupted download, because the lock file pins not just a version number but the exact bits you agreed to run.",
   "To move to a newer provider version within your constraints, run `terraform init -upgrade`. With this flag, Terraform ignores the locked versions, selects the newest versions that satisfy the constraints, and rewrites the lock file. You then review the diff, run a plan to check for unexpected changes, and commit the updated file. If you edit a constraint so that the currently locked version no longer satisfies it, for example changing `~> 4.0` to `~> 5.0`, plain `init` reports an error explaining that the locked version does not match the new constraint and suggests running it with `-upgrade`. Terraform will not silently switch versions on you.",
   "Hashes are platform-specific, which surprises many teams. Each provider is built separately for each operating system and processor architecture, and the lock file may only contain hashes for the package downloaded on the machine where init ran. If developers use macOS on Apple silicon but the pipeline runs Linux on x86, a lock file created on a Mac might not contain a matching hash for the Linux package, and init on the pipeline can fail checksum verification. The `terraform providers lock` command fixes this by pre-populating hashes for several platforms at once, for example `terraform providers lock -platform=linux_amd64 -platform=darwin_arm64`.",
   "Two details come up again and again in exam questions. First, the lock file tracks providers only. It does not lock module versions; you constrain those with the `version` argument in each module block, and `terraform init -upgrade` also re-selects the newest allowed module versions, but the lock file itself has no module entries. Second, the lock file is different from the `.terraform` directory. The `.terraform` directory holds the downloaded provider binaries and module source code for one working copy, can be recreated at any time by running init, and should not be committed; add `.terraform/` to your `.gitignore`. A good way to remember the split is that the lock file is a small text record you share, while `.terraform/` is a large local cache you do not."
  ],
  "analogy": "The lock file is like a pharmacy prescription that names the exact drug, the exact strength and the manufacturer's batch code, rather than just saying: something for headaches. Any pharmacy can fill it identically, and the batch code lets them refuse a package that does not match. Changing it requires a new prescription, which is your `init -upgrade`. Where the analogy stops: a prescription covers one patient, while the lock file must cover every platform the team uses, which is why extra hashes sometimes need adding.",
  "terms": [
   [
    "Dependency lock file",
    "`.terraform.lock.hcl`, which records the exact provider versions, constraints and package checksums selected by `terraform init`."
   ],
   [
    "terraform init -upgrade",
    "Re-selects the newest provider (and module) versions allowed by constraints and updates the lock file."
   ],
   [
    "Checksum (hash)",
    "A fingerprint of a provider package used to verify that the downloaded file is the expected one."
   ],
   [
    ".terraform directory",
    "Local working directory where init stores downloaded providers and modules; not committed."
   ],
   [
    "terraform providers lock",
    "Command that adds provider hashes to the lock file, including for other platforms with `-platform`."
   ]
  ],
  "example": "A pipeline suddenly fails after a provider's new minor release changed a default. The team had not committed the lock file, so CI picked the newest version. After committing `.terraform.lock.hcl`, CI uses the same version as the developers until someone deliberately runs `terraform init -upgrade` and the version change is reviewed in a pull request.",
  "mistakes": [
   [
    "The lock file is a local cache, so it belongs in `.gitignore`.",
    "The lock file should be committed so every environment uses the same provider versions. It is the `.terraform/` directory that should be ignored."
   ],
   [
    "The lock file pins module versions too.",
    "It records providers only. Module versions are controlled with the `version` argument in module blocks."
   ],
   [
    "`terraform plan` or `terraform apply` updates the lock file when a newer provider is released.",
    "Only `terraform init` writes the lock file, and it moves to newer versions only when run with `-upgrade`."
   ],
   [
    "You should edit version numbers in the lock file by hand to upgrade.",
    "The file is generated. Change constraints in configuration if needed and run `terraform init -upgrade` to rewrite it."
   ]
  ],
  "tryit": [
   [
    "Your team commits `.terraform.lock.hcl` from developer Macs. The Linux CI job now fails during init with a checksum mismatch error for a provider whose version has not changed. What is the likely cause and fix?",
    "The lock file probably only contains hashes for the macOS package. Run `terraform providers lock` with `-platform=linux_amd64` (and the developer platforms) to add hashes for every platform, then commit the updated file."
   ],
   [
    "A security advisory says your locked provider version has a bug fixed in a newer release that your `~> 5.0` constraint already allows. What do you run, and what do you check before merging?",
    "Run `terraform init -upgrade` to select the newest allowed version and rewrite the lock file, then review the lock file diff and run `terraform plan` to confirm the upgrade causes no unexpected changes before committing."
   ]
  ],
  "tip": "Lock file: commit it. `.terraform/` directory: do not commit it. And the lock file covers providers, not modules.",
  "check": [
   [
    "What command updates the provider versions recorded in `.terraform.lock.hcl`?",
    "`terraform init -upgrade`, which selects the newest versions allowed by the constraints and rewrites the file."
   ],
   [
    "Does the dependency lock file pin module versions?",
    "No. It only tracks providers; module versions are constrained with the `version` argument in module blocks."
   ],
   [
    "What happens if a downloaded provider package does not match the hashes in the lock file?",
    "`terraform init` fails rather than using the package, which protects against tampered or corrupted downloads."
   ]
  ]
 },
 {
  "t": "How providers work: plugins that call APIs, downloaded by `terraform init` from the Terraform Registry",
  "hook": "It is your second day at Tidewater Logistics, and the onboarding doc says: clone the infrastructure repository and run `terraform plan`. You do exactly that, and Terraform stops with an error about required providers not being installed. You check the repository and see `required_providers` listing the cloud provider right there in `versions.tf`. The code knows what it needs, so why does Terraform act as though it has never heard of it? A senior engineer, Rosa, glances over and says one word: init. But what is a provider, really, where does it come from, and why can't Terraform just talk to the cloud by itself?",
  "simple": "Terraform on its own does not know how to talk to any cloud or service. It relies on add-on programs called providers, one for each platform, such as one for a cloud, one for a DNS service or one for generating random names. Each provider is like a translator who speaks one platform's language. Terraform says what it wants in its own words, and the provider turns that into the exact requests the platform understands, called API calls. Before you can work, you have to hire the translators, which is what `terraform init` does: it reads your list of needed providers, downloads the right versions from the public Terraform Registry and stores them in a hidden folder in your project. After that, plan and apply can use them.",
  "body": [
   "A provider is a separate program, usually written in the Go language using HashiCorp's plugin framework, that knows how to manage one platform. Terraform core, the `terraform` binary you run, contains the language, the dependency graph, state handling and the plan and apply logic, but no knowledge of any particular cloud. When Terraform needs a provider, it starts the provider as a separate process and talks to it over a local remote procedure call (RPC) protocol. The provider receives requests such as validate this resource configuration, plan this change, create this object or read this object's current state, and turns each one into calls to the platform's application programming interface (API), using the credentials and settings in its provider configuration.",
   "Each provider defines a schema. The schema lists the resource types and data sources the provider offers, the arguments and attributes for each, which arguments are required or optional, which attributes are computed by the platform after creation, such as an ID or an IP address, and which changes force the object to be replaced rather than updated in place. Terraform core uses the schema to type-check your configuration before anything happens remotely, and the provider's documentation on the registry is generated from the same schema, which is why every resource page has an argument reference and an attribute reference in a consistent layout.",
   "Providers are installed by `terraform init`, not by plan or apply. Init reads `required_providers` from every module in the configuration, resolves a version that satisfies all the constraints and matches the lock file, downloads the package built for your operating system and processor architecture, verifies it, and places it in `.terraform/providers` inside the working directory. By default packages come from the public Terraform Registry at `registry.terraform.io`. Init can also install from private registries, from network mirrors or filesystem mirrors on isolated networks, or from a shared plugin cache directory configured in the CLI configuration file, which avoids downloading the same large provider separately for every project on your machine.",
   "```text\n$ terraform init\nInitializing provider plugins...\n- Finding hashicorp/aws versions matching \"~> 5.0\"...\n- Installing hashicorp/aws v5.x.y...\n- Installed hashicorp/aws v5.x.y (signed by HashiCorp)\nTerraform has created a lock file .terraform.lock.hcl\n```",
   "Read that output closely, because it tells you a lot. It shows the constraint that was used to search for versions, the exact version installed, and who signed the package. Terraform checks provider signatures during installation from a registry, which helps ensure you are running the publisher's genuine build rather than something altered in transit. It also creates or updates the dependency lock file, recording the selected version and its checksums so the next init on any machine installs the same thing.",
   "Why separate providers from Terraform at all? Because providers are versioned and released independently of Terraform core. When a cloud vendor launches a new service, the provider can add support in its next release without anyone waiting for a new Terraform release, and thousands of providers can exist without bloating the core binary. The same independence has a cost: a provider upgrade can change behavior, add new defaults or deprecate arguments, which is exactly why you constrain provider versions and review lock file changes in pull requests.",
   "Adding or changing a provider always means running init again. If you add a new entry to `required_providers`, add a module that brings its own provider requirements, or change a provider's source or version constraint, plan will refuse to run until init has installed what is needed. Init is safe to rerun at any time; it changes only the local working directory, never your infrastructure. A useful habit is to check the `.terraform/providers` directory after init if something seems wrong: you will find a folder path built from the registry hostname, the namespace, the provider type, the version and your platform, such as a `linux_amd64` or `darwin_arm64` folder, which confirms exactly which build was installed. If that directory is deleted, nothing is lost permanently; running init again rebuilds it from the registry or mirror, using the versions recorded in the lock file.",
   "Once installed, providers take part in every plan and apply. During planning, Terraform asks each provider to read the current state of the objects it manages, a step called refresh, and then to compute the planned change for each resource by comparing configuration, state and reality. During apply, Terraform walks the dependency graph and asks the right provider to carry out each change in order, creating, updating or deleting objects through the platform API, and records the attributes the provider returns, including computed values, in state. Terraform core decides what and when; the provider knows how."
  ],
  "analogy": "Think of Terraform core as a general contractor and providers as specialist subcontractors: an electrician, a plumber, a roofer. The contractor reads the blueprint, decides the order of work and keeps the records, but never touches a wire. Each subcontractor knows one trade and the local codes for it. Before the job starts, the contractor has to book the subcontractors, which is `terraform init`. The analogy stops at independence: subcontractors are released and upgraded on their own schedule, so you must say which versions you will accept.",
  "terms": [
   [
    "Provider",
    "A plugin program that translates Terraform's requests into API calls for one platform or service."
   ],
   [
    "Provider schema",
    "The provider's definition of its resource types, data sources, arguments and attributes."
   ],
   [
    "Plugin cache",
    "An optional shared directory where init stores provider packages so they can be reused across working directories."
   ],
   [
    "Provider mirror",
    "A local or network copy of provider packages used instead of the public registry, for example on isolated networks."
   ],
   [
    "Computed attribute",
    "A value set by the provider or platform after creation, such as an ID, rather than by your configuration."
   ]
  ],
  "example": "A new team member clones the repository and runs `terraform plan`. It fails, saying the required providers are not installed. After running `terraform init`, the AWS provider is downloaded into `.terraform/providers` at the version recorded in the lock file, and plan now works.",
  "mistakes": [
   [
    "Terraform core contains built-in support for the major clouds.",
    "Core contains no platform logic. Every platform, including the major clouds, is supported through a separately released provider plugin."
   ],
   [
    "`terraform plan` downloads any missing providers automatically.",
    "Only `terraform init` installs providers. Plan and apply fail with an error until init has run."
   ],
   [
    "Providers are always downloaded from the cloud vendor's own website.",
    "By default init downloads from the public Terraform Registry; private registries, mirrors and a plugin cache are alternatives."
   ],
   [
    "Providers must be upgraded whenever Terraform is upgraded, and the reverse.",
    "Providers are versioned independently of Terraform core, and each is constrained separately."
   ]
  ],
  "tryit": [
   [
    "Your organization runs Terraform on build servers with no internet access. Engineers ask how `terraform init` can ever install providers there. What do you suggest?",
    "Provide providers from a filesystem mirror or a network mirror inside the network, or a private registry, configured in the CLI configuration file. Init then installs from that source instead of the public registry, still verifying versions and checksums."
   ],
   [
    "A developer adds a monitoring vendor's provider to `required_providers` and immediately runs `terraform apply`. It fails. What happened, and what must they run?",
    "The new provider has not been installed into `.terraform/providers`. They must run `terraform init` to download it and update the lock file, then plan and apply."
   ]
  ],
  "tip": "Providers are installed by `terraform init`, not by plan or apply, and by default come from the public Terraform Registry. Adding or changing a provider always requires running init again.",
  "check": [
   [
    "Where does `terraform init` put downloaded provider plugins?",
    "In the `.terraform/providers` directory inside the working directory, unless a shared plugin cache is configured."
   ],
   [
    "What part of Terraform translates a planned change into API calls?",
    "The provider plugin; Terraform core sends it requests over RPC and it calls the platform's API."
   ],
   [
    "Why can a cloud's new service be supported without a new Terraform release?",
    "Providers are released independently of Terraform core, so the provider adds support in its own release."
   ]
  ]
 },
 {
  "t": "Provider tiers in the registry: official, partner and community",
  "hook": "A ticket lands in your queue at Cobalt Ridge Insurance: the networking team wants to manage a new firewall appliance with Terraform, and they have already found a provider for it on the public registry. It has a few hundred downloads, a namespace you do not recognize, and its last release was eighteen months ago. Your security lead, Amara, asks a simple question before anyone writes a line of code: who actually stands behind this plugin, and what happens when it breaks at 2 a.m.? The registry page has a small badge near the provider name. What does that badge tell you, and is it enough to approve the request?",
  "simple": "Anyone can publish a provider, the plugin Terraform uses to talk to a platform, to the public Terraform Registry. So the registry puts a label, called a tier, on each one to show who made it and looks after it. Official providers are made and maintained by HashiCorp, the company behind Terraform. Partner providers are made by the company that owns the product, such as a software vendor writing the plugin for its own service, after joining HashiCorp's partner program. Community providers are made by individuals or groups of volunteers. It is like buying a phone charger: one from the phone maker, one from a certified accessory brand, or one from a seller you do not know. All might work, but the support you can expect is very different.",
  "body": [
   "Anyone can publish a provider to the public Terraform Registry, so the registry labels each provider with a tier that tells you who publishes and maintains it. The tier appears as a badge on the provider's registry page and in search results. Knowing the tiers helps you judge how much to trust a provider before running it with your credentials, and tells you who to go to when something breaks. The exam focuses on the three main tiers, official, partner and community, plus the archived label you may see on older providers.",
   "Official providers are owned and maintained by HashiCorp. They are published under the `hashicorp` namespace, which is the first part of the source address, so you see addresses such as `hashicorp/aws`, `hashicorp/azurerm`, `hashicorp/google`, `hashicorp/kubernetes`, and utility providers like `hashicorp/random`, `hashicorp/local` and `hashicorp/tls`. Some of these are developed jointly with the cloud vendor, but HashiCorp is the publisher of record. The registry shows an official badge on them. Official providers are also special in one small way in configuration: if you write a provider in `required_providers` with no `source`, Terraform assumes the `hashicorp` namespace, though writing the source explicitly is the recommended practice.",
   "Partner providers are written, maintained, validated and published by third-party technology companies against their own APIs. Those companies take part in HashiCorp's Technology Partner Program, which means they have gone through HashiCorp's partner process. Partner providers live under the company's own namespace rather than `hashicorp`, for example a monitoring, database or security vendor publishing a provider for its software as a service (SaaS) product under its own organization name. The partner badge tells you that the vendor that owns the API stands behind the provider, so support questions generally go to that vendor.",
   "Community providers are published by individual maintainers, groups of maintainers or other members of the Terraform community, under their own namespaces. Many are excellent and widely used, and some fill gaps for products that have no official or partner provider at all. Others are experiments, side projects or abandoned. There is no HashiCorp or vendor support promise behind them. Before depending on one in production, look at the source repository's recent activity, the number and age of open issues, how quickly maintainers respond, the quality of the documentation, the license, and whether releases are signed.",
   "The registry also marks archived providers. An archived provider is an official or partner provider that is no longer maintained, typically because the underlying API was deprecated or because there was too little interest to justify continued work. Archived providers remain downloadable so that existing configurations keep working, but they receive no further updates or fixes, so you should plan a migration away from them rather than starting new work with them.",
   "It is important to understand what the tier does not change. Tiers have no effect on how a provider works technically. Providers in every tier are declared in `required_providers` with a source address and a version constraint, installed by `terraform init`, verified by checksum and recorded in the lock file, and used in exactly the same way in resources and data sources. What differs is trust, accountability and support. Exam questions sometimes try to suggest that community providers need a special flag or a different installation process; they do not.",
   "Organizations usually turn this knowledge into policy. A security-conscious team might allow official and partner providers freely but require a documented review before anyone uses a community provider, recording the decision in an approved-providers list. Some go further and host approved providers in a private registry or a network mirror so that engineers and pipelines cannot pull arbitrary plugins from the internet. HCP Terraform's private registry supports this pattern by letting an organization publish its own approved providers and modules for internal use.",
   "For the exam, keep a short mental table. Official means HashiCorp maintains it and the namespace is `hashicorp`. Partner means a technology company maintains it for its own product, as a member of the Technology Partner Program, under its own namespace. Community means individuals or groups maintain it with no support guarantee. Archived means no longer maintained. When a question describes a provider and asks who to contact for help or who is responsible for fixes, map the description to that table. And if a question mentions a namespace other than `hashicorp`, do not assume it is a community provider: a partner provider also lives under its company's own namespace, so the badge, not the namespace alone, settles partner versus community. Only the `hashicorp` namespace is a reliable shortcut, and it points to official."
  ],
  "analogy": "Provider tiers are like the labels on apps in a phone's app store. Some apps are made by the phone maker itself, some are made by a well-known company for its own service, and some are made by independent developers, ranging from brilliant to abandoned. Every app installs and runs the same way; the label tells you who answers when something goes wrong. The analogy stops at vetting: being listed on the Terraform Registry is not an endorsement, and a community provider carries no vendor or HashiCorp support promise at all.",
  "terms": [
   [
    "Official provider",
    "Provider owned and maintained by HashiCorp, published under the `hashicorp` namespace."
   ],
   [
    "Partner provider",
    "Provider written and maintained by a third-party company in HashiCorp's Technology Partner Program, published under the company's namespace."
   ],
   [
    "Community provider",
    "Provider published by individuals or groups in the community, with no HashiCorp or vendor support guarantee."
   ],
   [
    "Archived provider",
    "A provider that is no longer maintained, kept available so existing configurations still work."
   ],
   [
    "Namespace",
    "The organization or user portion of a provider's source address, such as `hashicorp` in `hashicorp/aws`."
   ]
  ],
  "example": "A team wants to manage a niche network appliance. The only provider is a community one updated two years ago with many open issues. They test it in a lab, decide the risk is acceptable for a non-production environment only, and record that decision in their provider approval list.",
  "mistakes": [
   [
    "Partner providers are maintained by HashiCorp on behalf of the vendor.",
    "Partner providers are written and maintained by the third-party company that owns the API, as a member of HashiCorp's Technology Partner Program."
   ],
   [
    "Community providers need a special installation step or flag.",
    "All tiers are declared in `required_providers` and installed by `terraform init` in exactly the same way; the tier only describes who maintains the provider."
   ],
   [
    "Archived providers are removed and stop working.",
    "Archived providers remain available so existing configurations work, but they are no longer maintained, so you should migrate."
   ],
   [
    "A community provider is always low quality.",
    "Many community providers are high quality and widely used. The point is that there is no vendor or HashiCorp support guarantee, so you evaluate them yourself."
   ]
  ],
  "tryit": [
   [
    "Your company uses a SaaS logging product. On the registry you find a provider for it under the vendor's own namespace with a partner badge, and a second provider under an individual's namespace with more stars. Which should you prefer, and who would you contact for support?",
    "Prefer the partner provider in most cases: it is maintained by the vendor that owns the API and has gone through HashiCorp's partner process. Support questions go to that vendor. The community one could still be evaluated, but it has no support guarantee."
   ]
  ],
  "tip": "The namespace is the quick clue: `hashicorp/...` means official. Partner providers are maintained by the technology company that owns the API; community providers by individuals or groups.",
  "check": [
   [
    "Who maintains a partner-tier provider?",
    "The third-party technology company that owns the service, as a member of HashiCorp's Technology Partner Program."
   ],
   [
    "Does a provider's tier change how you declare or install it?",
    "No. All tiers are declared in `required_providers` and installed by `terraform init`; the tier indicates who publishes and supports it."
   ],
   [
    "What does the archived label mean?",
    "The provider is no longer maintained but remains available so existing configurations continue to work."
   ]
  ]
 },
 {
  "t": "Provider configuration blocks, multiple configurations with `alias`, and the `provider` meta-argument",
  "hook": "The disaster recovery audit at Saltmarsh Bank is in two weeks, and the finding from last year still stands: every backup bucket lives in the same region as the data it protects. Your manager, Tomas, asks you to add replica buckets in a second region using the existing Terraform configuration. You open `providers.tf` and see a single `provider \"aws\"` block with `region = \"us-east-1\"` hard-wired into it. Every resource in the stack quietly inherits that region. You could copy the whole configuration into a new folder, but that doubles the maintenance. Is there a way for one configuration to talk to two regions at once, and to say precisely which resource goes where?",
  "simple": "A provider block is where you tell Terraform how to connect to a platform, for example which cloud region or account to use. Usually you write one, and every resource uses it automatically. Sometimes you need two different settings for the same platform, such as two regions. You write a second provider block and give it a nickname with `alias`. Then, on any resource that should use the second settings, you add `provider = aws.west`, pointing at that nickname. Think of a delivery company with a main warehouse and a second warehouse across the country. Orders go out from the main one unless the label says otherwise, and the label is the `provider` argument.",
  "body": [
   "Declaring a provider in `required_providers` tells Terraform what to install. A `provider` block tells it how to configure that provider once installed: which region or endpoint to use, which account, subscription or project, and sometimes how to authenticate. The two are separate on purpose. The `required_providers` entry is about source and version; the `provider` block is about runtime settings. Provider blocks belong in the root module. Reusable child modules should normally not contain provider blocks of their own and instead receive configurations from whoever calls them, which keeps a module usable in any region or account.",
   "```hcl\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\nprovider \"aws\" {\n  alias  = \"west\"\n  region = \"us-west-2\"\n}\n```",
   "The first block above is the default configuration for the `aws` provider. Any AWS resource or data source that does not say otherwise uses it. The second block is an additional configuration distinguished by the `alias` argument. You can have one default and as many aliased configurations as you need, for different regions, accounts or credentials, as long as each alias is unique for that provider. If you write only aliased blocks and no default, resources that do not specify a provider fall back to an empty default configuration, which may fail if the provider has required settings, so it is usually clearer to keep one unaliased block.",
   "To choose a non-default configuration, use the `provider` meta-argument on a resource or data block. Its value is a reference in the form `<PROVIDER>.<ALIAS>`, written as a bare reference, not a quoted string. A meta-argument is an argument that Terraform itself interprets and that works on any resource type, unlike provider-specific arguments such as `bucket` or `instance_type`. The other common meta-arguments are `count`, `for_each`, `depends_on` and `lifecycle`.",
   "```hcl\nresource \"aws_s3_bucket\" \"replica\" {\n  provider = aws.west\n  bucket   = \"example-replica-bucket\"\n}\n```",
   "Modules need a slightly different mechanism, because a module block does not take a `provider` argument. Instead you pass configurations with the `providers` map, for example `providers = { aws = aws.west }`, which means: inside this module, the provider named `aws` is the caller's `aws.west` configuration. If you do not pass anything, a child module inherits the caller's default configurations automatically. A module that needs more than one configuration of the same provider, such as a primary and a replica region, declares the extra names with `configuration_aliases` inside its `required_providers` entry, and the caller maps each one in the `providers` argument. Inside such a module you would write `configuration_aliases = [aws.replica]` in the `aws` entry of `required_providers`, then set `provider = aws.replica` on the replica resources. In the root module, the caller writes `providers = { aws = aws, aws.replica = aws.west }`, which connects the module's default `aws` to the root's default and the module's `aws.replica` to the root's `aws.west`. Reading these maps left to right helps: the key is the name inside the module, and the value is the configuration from the caller.",
   "Credentials deserve care. Provider blocks can accept access keys directly as arguments, but hard-coding secrets in `.tf` files puts them in version control, where they are visible to everyone with repository access and remain in history even after deletion. Prefer environment variables, shared credential files, instance or workload identity, or dynamic, short-lived credentials from HCP Terraform or Vault. Provider arguments can use input variables and data from other sources, but their values must be known during planning. A provider configuration that depends on attributes of resources not yet created can cause plan failures or confusing behavior, so keep provider settings simple and based on known inputs.",
   "Why would you need aliases in practice? The common reasons are deploying the same resources to multiple regions for resilience, managing resources in several accounts by assuming different roles in each aliased block, and creating a resource that must live in one specific region while the rest of the stack lives elsewhere. A classic case is a certificate for a global content delivery network that must be created in one particular region even though the application runs in another.",
   "For the exam, keep the reference syntax exact. The value is `aws.west`, with a dot, and no quotation marks. A resource with no `provider` argument uses the default, unaliased configuration. Aliases are set in the provider block with `alias`, selected in resources with `provider`, and passed to modules with `providers`. When a plan shows a resource being created in the wrong region or account, the first thing to check is whether it is missing its `provider` argument and has silently fallen back to the default configuration."
  ],
  "analogy": "Provider configurations are like phone contacts for the same company: Main Office and Main Office West. Both reach the same organization, but one rings a different building. When you call without choosing, your phone dials the default contact. To reach the West office, you pick that specific contact, just as a resource names `aws.west`. The analogy stops at modules: a module cannot choose contacts from your phone on its own; you must hand them over through the `providers` map, or it gets your defaults.",
  "terms": [
   [
    "provider block",
    "Configuration for a provider, such as region, endpoint or authentication settings, normally placed in the root module."
   ],
   [
    "alias",
    "An argument that names an additional, non-default configuration of the same provider."
   ],
   [
    "provider meta-argument",
    "An argument on a resource or data block, like `provider = aws.west`, that selects a specific provider configuration."
   ],
   [
    "Meta-argument",
    "An argument handled by Terraform itself and usable on any resource type, such as `count`, `for_each`, `depends_on`, `provider` and `lifecycle`."
   ],
   [
    "providers map",
    "An argument on a module block, such as `providers = { aws = aws.west }`, that passes provider configurations to a child module."
   ],
   [
    "configuration_aliases",
    "A setting in a module's `required_providers` entry that declares the additional provider configuration names the module expects."
   ]
  ],
  "example": "A company keeps its application in `eu-west-1` but must create a certificate in `us-east-1` for its content delivery network. It adds a second `aws` provider block with `alias = \"use1\"` and sets `provider = aws.use1` on only the certificate resource.",
  "mistakes": [
   [
    "The reference is written as a string: `provider = \"aws.west\"`.",
    "It is a bare reference, `provider = aws.west`, with no quotation marks."
   ],
   [
    "You need a separate configuration directory for each region.",
    "One configuration can hold several configurations of the same provider using `alias`, with resources selecting one via the `provider` meta-argument."
   ],
   [
    "Module blocks use `provider = aws.west` like resources do.",
    "Module blocks use the `providers` map, such as `providers = { aws = aws.west }`."
   ],
   [
    "Putting access keys in the provider block is fine if the repository is private.",
    "Secrets in `.tf` files end up in version control history. Use environment variables, identity-based or dynamic credentials instead."
   ]
  ],
  "tryit": [
   [
    "Your configuration has a default `google` provider for `us-central1` and an aliased one, `alias = \"europe\"`, for `europe-west1`. A new storage bucket must be created in Europe, and a module called `network` must also deploy to Europe. What do you write on each?",
    "On the bucket resource, add `provider = google.europe`. On the module block, add `providers = { google = google.europe }`, so the module's default `google` provider is the European configuration."
   ]
  ],
  "tip": "The reference is `aws.west`, not `\"aws.west\"` and not `aws-west`. Resources without a `provider` argument use the default (unaliased) configuration.",
  "check": [
   [
    "How do you create two configurations of the same provider in one module?",
    "Write two `provider` blocks for it and give one (or more) an `alias`; the unaliased one is the default."
   ],
   [
    "How does a resource use a non-default provider configuration?",
    "By setting the `provider` meta-argument to `<name>.<alias>`, for example `provider = google.europe`."
   ],
   [
    "How do you give a child module a non-default provider configuration?",
    "Use the `providers` map on the module block, for example `providers = { aws = aws.west }`."
   ]
  ]
 },
 {
  "t": "Using several different providers in one configuration",
  "hook": "At Northwind Clinics, launching a new patient portal takes a checklist with nineteen steps across four tools. Someone creates the database in the cloud console, copies the endpoint into a ticket, someone else adds a DNS record in a different system, and a third person sets up an uptime check in the monitoring service by pasting the address again. Last month the address was pasted with a typo, and the monitor watched nothing for a week. Your lead, Devi, asks whether Terraform could do the whole thing. You know Terraform can manage the cloud. But the DNS and monitoring are different companies entirely. Can one configuration, one plan and one apply really span all of them, and keep the values in sync?",
  "simple": "Terraform can use many providers at the same time. A provider is the plugin that lets Terraform talk to one platform, such as a cloud, a container tool or a monitoring service. You list each one you need, and then you write resources for any of them in the same files. When one resource needs a value from another, such as a web address, you simply refer to it, and Terraform passes the value along and builds things in the right order. It is like planning a dinner party where the caterer, the florist and the musician all work from one shared schedule: the tables arrive before the flowers, and the flowers before the guests, even though each is a different company.",
  "body": [
   "A single Terraform configuration can use as many providers as it needs. You declare each one in `required_providers` with its source address and version constraint, configure each with its own `provider` block if it needs settings, and then write resources of any of their types side by side in the same `.tf` files. A single `terraform init` installs them all, and a single `terraform plan` shows proposed changes across every platform in one report. Nothing about the workflow changes because more providers are involved.",
   "```hcl\nterraform {\n  required_providers {\n    docker = { source = \"kreuzwerker/docker\", version = \"~> 3.0\" }\n    local  = { source = \"hashicorp/local\" }\n    random = { source = \"hashicorp/random\" }\n  }\n}\n\nprovider \"docker\" {}\n\nresource \"random_pet\" \"name\" {}\n\nresource \"docker_container\" \"web\" {\n  name  = random_pet.name.id\n  image = \"nginx:latest\"\n}\n\nresource \"local_file\" \"note\" {\n  filename = \"container.txt\"\n  content  = docker_container.web.name\n}\n```",
   "Notice how the resources connect. The container's name comes from `random_pet.name.id`, and the file's content comes from `docker_container.web.name`. These references create implicit dependencies: Terraform reads them and knows that the random name must exist before the container, and the container before the file. So it creates the random name first, then the container, then the file, even though three different providers are involved. This is the core advantage of Terraform over running separate tools or scripts for each platform. Terraform sees one dependency graph that spans every provider, and it orders, parallelizes and passes values between operations automatically. When you later destroy the configuration, it uses the same graph in reverse, removing the file before the container and the container before the name.",
   "How does Terraform know which provider handles which resource? It maps each resource to a provider using the prefix of the resource type, the part before the first underscore. `docker_container` goes to the provider whose local name is `docker`, `local_file` goes to `local`, and `random_pet` goes to `random`. The local name is the key you used in `required_providers`, which is why it normally matches the provider's type. If you need a resource to use a different provider configuration, for example an aliased one, you override the default with the `provider` meta-argument.",
   "Many providers need no configuration at all. Utility providers like `random`, `local`, `null` and `tls` work entirely on your machine or inside Terraform, so you can omit their `provider` blocks completely, and Terraform uses an empty default configuration. In the example above, `provider \"docker\" {}` is written out only for clarity; with no arguments it behaves the same as leaving it out. Providers that talk to remote services usually need at least a region, an endpoint or credentials, which you supply in a `provider` block or through environment variables.",
   "Multi-provider configurations come with a few practical considerations. Each provider has its own authentication, so the environment running Terraform, whether a laptop, a pipeline or an HCP Terraform workspace, needs credentials for all of them. Plans take longer as more APIs are queried during refresh. A failure in one provider's API can stop an apply part-way through, leaving earlier resources created; this is a partial apply. Terraform records everything that succeeded in state, so the next apply picks up from there instead of starting over or duplicating work. Finally, very large configurations spanning many providers and teams can become slow and risky to change, so organizations often split them into separate root modules along team or lifecycle lines, for example networking, data and applications, and pass values between them through outputs and data sources.",
   "This pattern is what the week's lab asks you to try. Adding the third-party `kreuzwerker/docker` provider next to `hashicorp/local` shows one workflow managing two unrelated platforms: a container runtime and your local filesystem. Note that the Docker provider is not in the `hashicorp` namespace, so its `source` must be written in full; only providers in the `hashicorp` namespace can be found from a bare name. After init, run `terraform providers` to list every provider the configuration requires and which module requires it, which is especially helpful when child modules bring in providers you did not declare yourself.",
   "For the exam, remember three ideas. First, one configuration can mix any number of providers, and there is no need for a separate configuration or command per provider. Second, references between resources of different providers create dependencies just as they do within one provider, and Terraform orders the work from a single graph. Third, the resource type prefix selects the provider, and providers without required settings need no `provider` block."
  ],
  "analogy": "A multi-provider configuration is like a wedding planner coordinating a caterer, a florist and a band, each a separate company with its own phone number and contract. The planner keeps one master timeline and knows the tables must be set before flowers go on them. The planner also relays details, such as the room number, so nobody retypes them. The analogy stops at failure: if the band cancels, the planner's notes still record what was already done, much like state after a partial apply.",
  "terms": [
   [
    "Resource type prefix",
    "The part of a resource type before the first underscore, such as `docker` in `docker_container`, which selects the provider."
   ],
   [
    "terraform providers",
    "Command that shows the providers required by the configuration and its modules."
   ],
   [
    "Dependency graph",
    "Terraform's internal map of which objects depend on which, used to order operations across all providers."
   ],
   [
    "Implicit dependency",
    "A dependency Terraform infers from a reference in one resource to another resource's attribute."
   ],
   [
    "Partial apply",
    "An apply that stops after some changes succeed; state records completed work so the next run can continue."
   ]
  ],
  "example": "A startup's configuration creates a managed database in its cloud provider, stores the generated password from the `random` provider in a secrets manager, and creates an uptime check in a monitoring SaaS pointing at the new endpoint, all in one plan.",
  "mistakes": [
   [
    "Each provider needs its own configuration directory and its own apply.",
    "One configuration, one init and one apply can manage resources from any number of providers."
   ],
   [
    "Terraform cannot order resources from different providers, so you must add `depends_on` everywhere.",
    "References between resources create implicit dependencies across providers; `depends_on` is only needed for hidden dependencies Terraform cannot see."
   ],
   [
    "Every provider requires a `provider` block.",
    "Providers with no required settings, such as `random` or `local`, work with only a `required_providers` entry."
   ],
   [
    "If an apply fails half-way, Terraform rolls back everything it created.",
    "Terraform does not roll back. State records what succeeded, and the next apply continues from there."
   ]
  ],
  "tryit": [
   [
    "Your configuration creates a cloud load balancer and a DNS record in a separate DNS provider pointing at the load balancer's hostname. During apply, the DNS provider's API times out after the load balancer is created. What does state contain, and what happens on the next apply?",
    "State records the load balancer as created, because that step succeeded. The DNS record is not in state. The next apply sees the load balancer already exists and only attempts to create the DNS record."
   ],
   [
    "A teammate writes `docker = { version = \"~> 3.0\" }` without a source and init fails to find the provider. Why?",
    "Without a source, Terraform assumes the `hashicorp` namespace. The Docker provider used here is published as `kreuzwerker/docker`, so the source must be written explicitly."
   ]
  ],
  "tip": "You do not need a separate configuration or command per provider. One configuration, one init and one apply can manage all of them, and references between them create dependencies automatically.",
  "check": [
   [
    "How does Terraform decide the creation order when resources from different providers reference each other?",
    "It builds a single dependency graph from the references, so a resource is created after anything it references, regardless of provider."
   ],
   [
    "Do you need a `provider` block for every provider you use?",
    "No. Providers that need no settings, such as `random` or `local`, can be used with only a `required_providers` entry."
   ],
   [
    "Which provider handles a resource of type `local_file`?",
    "The provider with local name `local`, selected from the resource type prefix before the first underscore."
   ]
  ]
 },
 {
  "t": "What state is for: mapping configuration to real objects, tracking metadata and dependencies, speeding up plans",
  "hook": "Friday, 4:40 p.m., at Brightwater Utilities. Leo, a new engineer tidying his project folder, notices a file called `terraform.tfstate`, decides it looks like a cache, and deletes it. On Monday he runs `terraform plan` and his stomach drops: Terraform wants to create all sixty-two resources, as if the production network, databases and servers had never existed. They are all still running. Nothing in the cloud changed, and nothing in the code changed. Only one file disappeared. Why would Terraform forget everything it built, when it could just look at the cloud account and see it all sitting there?",
  "simple": "Terraform keeps a notebook called state. In it, it writes down which real thing in the cloud belongs to which piece of your code. Your code might call a server `web`, but the cloud knows it only by a long ID number. The notebook links the two. Without it, Terraform cannot tell which of the hundreds of servers in an account are the ones it built. The notebook also remembers what depends on what, so things are removed in a safe order, and it keeps a copy of the last details it saw, which saves time. Think of a coat check: the ticket links your coat to a numbered hook. Lose the ticket, and the attendant cannot tell which coat is yours, even though it is right there.",
  "body": [
   "Terraform keeps a state file, by default named `terraform.tfstate` in the working directory, that records what it manages. Beginners often ask why Terraform cannot simply look at the cloud and work out what exists. The answer is that state serves several purposes that the platform's application programming interface (API) alone cannot. HashiCorp documents these purposes explicitly, and the exam expects you to recognize them: mapping configuration to real-world objects, tracking metadata, improving performance, and syncing work across a team.",
   "The first and most important purpose is mapping configuration to real objects. Your configuration says `aws_instance.web`; the cloud knows about an instance with an ID like `i-0abc...`. State records that this particular resource address corresponds to that particular remote ID. Without it, Terraform could not tell which of hundreds of instances in an account it created, which ones someone else created by hand or with another tool, or whether `aws_instance.web` already exists at all. Tags and names are not reliable for this, because they can be duplicated, changed or missing. Each resource address in state is bound to exactly one remote object, and Terraform expects that no other configuration claims the same object. If two configurations or two addresses both manage one object, they will fight over it, so this one-to-one rule matters.",
   "The second purpose is tracking metadata, especially dependencies. While a resource block exists, Terraform can read its references to know what it depends on. But when you remove a resource block from the configuration, the configuration no longer says anything about that resource. State remembers its dependencies, so Terraform can still destroy objects in the correct order, for example deleting a server before the subnet it lives in, even though the code describing them is gone. State also records which provider configuration manages each resource, which matters when aliased providers are in use, along with other bookkeeping such as schema versions.",
   "The third purpose is performance. For every managed object, state stores the attribute values Terraform last saw. By default, Terraform refreshes these during each plan by asking the providers for current values, which is how it detects drift, meaning changes made outside Terraform. In very large infrastructures that refresh can mean thousands of API calls and can run into rate limits. State lets Terraform work from cached values when appropriate. Options such as `terraform plan -refresh=false` let you plan quickly from state alone, at the cost of not detecting drift, so use them knowingly, for example when you are iterating on a change and you trust that nothing else touched the infrastructure.",
   "The fourth purpose is syncing in teams. When state is kept in a shared remote backend, such as HCP Terraform or an object storage bucket, everyone works against the same record of reality instead of separate copies on separate laptops. Most remote backends also support state locking, which stops two people or pipelines from applying at the same time and corrupting the record. Local state on one laptop cannot be shared safely, can be lost with the laptop, and offers no protection against two simultaneous runs, which is why teams move to remote backends early in a project.",
   "Treat state as Terraform's private data. Do not edit the JSON by hand; a small mistake can break the mapping or make the file unreadable. When you need to inspect or change state, use the commands designed for the purpose. To read it, use `terraform state list` to see every resource address and `terraform state show` to see one resource's attributes. To rename an address after refactoring code, use a `moved` block or `terraform state mv`. To stop managing an object without destroying it, use a `removed` block or `terraform state rm`. To adopt an object that already exists, use an `import` block or the `terraform import` command. The configuration-based blocks are generally preferred because they go through the normal plan and review process.",
   "Terraform also protects you a little against accidents with local state. Each time it writes a new local state file, it keeps the previous version as `terraform.tfstate.backup`. Remote backends often offer stronger protection, such as version history in HCP Terraform or object versioning in a storage bucket. In the opening scenario, restoring the backup or a remote version would restore the mapping and the plan would return to showing no changes. Without any copy, the only way back would be to import each existing object again.",
   "For the exam, if a question asks for the primary purpose of state, choose mapping resources in configuration to real-world objects. Metadata such as dependencies, performance through cached attributes, and team syncing are the other documented purposes."
  ],
  "analogy": "State is like a coat check ticket book. Each ticket links a ticket number, your resource address, to a specific hook, the real object's ID. The attendant cannot identify your coat by looking at it, because many coats look alike. The book also notes which items were checked together so they come back in the right order. The analogy stops at refresh: unlike a coat check, Terraform regularly walks to the hooks to see whether anyone changed your coat, which is how it detects drift.",
  "terms": [
   [
    "State",
    "Terraform's record of the real objects it manages, their attributes and metadata, stored in `terraform.tfstate` or a remote backend."
   ],
   [
    "Resource address",
    "The identifier of a resource in configuration and state, such as `aws_instance.web` or `module.net.aws_vpc.main`."
   ],
   [
    "Backend",
    "Where Terraform stores state, such as local disk, HCP Terraform or a cloud storage service."
   ],
   [
    "State locking",
    "A mechanism that prevents concurrent operations from writing the same state at once."
   ],
   [
    "Drift",
    "A difference between the real infrastructure and what state and configuration expect, usually caused by changes made outside Terraform."
   ]
  ],
  "example": "An engineer deletes the `terraform.tfstate` file thinking it is a cache. The next plan proposes creating every resource again because Terraform no longer knows they exist, and apply would fail with name conflicts or create duplicates. Restoring the backup or remote copy fixes the mapping.",
  "mistakes": [
   [
    "State is just a cache that Terraform can rebuild by scanning the cloud.",
    "State holds the mapping between resource addresses and real object IDs, which cannot be reliably reconstructed from the cloud. Losing it means re-importing objects."
   ],
   [
    "The primary purpose of state is to speed up plans.",
    "Performance is one purpose, but the primary purpose is mapping configuration to real-world objects."
   ],
   [
    "Editing the state JSON directly is the normal way to rename a resource.",
    "Use a `moved` block or `terraform state mv`; hand-editing risks corrupting state."
   ],
   [
    "`-refresh=false` is always safe because state is accurate.",
    "It skips querying providers, so it cannot detect drift made outside Terraform."
   ]
  ],
  "tryit": [
   [
    "You remove the block for an old server from your configuration and run plan. The server sits in a subnet that is also being removed in the same change. How does Terraform know to delete the server before the subnet, when neither block exists anymore?",
    "State recorded the dependency between the server and the subnet when they were created, along with their IDs and providers, so Terraform destroys them in the correct order using that metadata."
   ],
   [
    "A team of five still uses local state on whoever ran apply last. Twice this month two people applied at once. What should they change, and which purposes of state does that address?",
    "Move state to a shared remote backend that supports locking, such as HCP Terraform. This addresses syncing, since everyone uses one state, and locking prevents concurrent applies."
   ]
  ],
  "tip": "If asked for the primary purpose of state, choose mapping resources in configuration to real-world objects. Metadata such as dependencies and performance caching are the other listed purposes.",
  "check": [
   [
    "Why does Terraform need state to destroy a resource whose block you removed from configuration?",
    "State still records the resource's ID, provider and dependencies, so Terraform knows what to delete and in what order."
   ],
   [
    "What trade-off does `terraform plan -refresh=false` make?",
    "It is faster because it skips querying providers, but it cannot detect drift made outside Terraform."
   ],
   [
    "What file does Terraform keep as a safety copy of the previous local state?",
    "`terraform.tfstate.backup`."
   ]
  ]
 },
 {
  "t": "State contents: resource attributes, including sensitive values, in plain JSON",
  "hook": "The quarterly security review at Meadowlark Credit Union is going smoothly until the auditor, Ms. Okafor, asks a question nobody prepared for: where is the database administrator password stored? Your colleague answers confidently that it is a sensitive variable, so Terraform hides it. The auditor nods and asks to see the state file. You open the storage bucket, download `terraform.tfstate`, search for the database resource, and there it is in plain text, readable by anyone with access to that bucket, including the build pipeline and three former contractors whose access was never removed. The plan output always showed it as hidden. So what does `sensitive` actually protect, and what should have been protecting the state?",
  "simple": "Terraform's state file is a plain text file in a common format called JSON. It lists everything Terraform built and every detail about each item, including secrets like passwords and keys, written out in readable form. Marking something as sensitive only stops Terraform from printing it on your screen; the secret is still saved in the file. Think of a diary with a sticky note over one line on the page you show friends: the note hides it while you are showing the page, but the words are still underneath for anyone who has the diary. So the real protection is controlling who can get the file: store it somewhere encrypted with strict access, never in a code repository, and use newer features that keep secrets out of the file entirely.",
  "body": [
   "The state file is a JSON (JavaScript Object Notation) document. Open a local `terraform.tfstate` in a text editor and you will see its structure. At the top are a format `version`, the `terraform_version` that last wrote it, a `serial` number that increases with every write, and a `lineage` identifier, a unique value created when the state is first made that ties all later versions of that one state together. Terraform uses serial and lineage to refuse to overwrite a newer state with an older one, or with a state from a different project. Next come the root module's `outputs`, and then a `resources` list. Each resource entry records its mode (managed or data), type, name, provider, and one or more instances, each with its full set of attribute values and its dependencies.",
   "The important security point is that state contains every attribute Terraform knows about, and that includes sensitive values. A database resource's password argument, the generated result of a `random_password` resource, private keys created by the `tls` provider, connection strings, and access keys returned by an identity resource are all stored in the state file in plaintext. Terraform needs these values to detect changes and to pass them to other resources, so it records them. Marking a variable or output with `sensitive = true` hides the value in plan and apply output and in the console, where it appears as `(sensitive value)`, but it does not remove the value from state and it does not encrypt it.",
   "```json\n{\n  \"version\": 4,\n  \"serial\": 7,\n  \"resources\": [\n    {\n      \"mode\": \"managed\",\n      \"type\": \"random_password\",\n      \"name\": \"db\",\n      \"instances\": [ { \"attributes\": { \"result\": \"(plaintext secret here)\" } } ]\n    }\n  ]\n}\n```",
   "Because of this, treat state as sensitive data in its own right. Do not commit `terraform.tfstate` or `terraform.tfstate.backup` to Git; add both to `.gitignore`, because anything committed stays in repository history even after you delete the file. Store state in a remote backend that encrypts data at rest and in transit and restricts who can read it, such as HCP Terraform, or a cloud storage bucket with encryption, versioning and tight access policies. Limit which people and pipelines can read state, since read access to state can be equivalent to read access to every secret in it. Saved plan files created with `terraform plan -out` also contain sensitive values and need the same care; do not leave them lying around as build artifacts.",
   "Newer Terraform versions reduce how many secrets reach state in the first place. Ephemeral values, such as input variables declared with `ephemeral = true` and ephemeral resources, exist only for the duration of a run and are never written to state or plan files. Write-only arguments let a provider accept a value, such as a database password, that Terraform sends to the API but does not store; providers that support them mark those arguments in their documentation. Another approach is architectural: create and store secrets in a dedicated secrets manager and have applications read them at runtime, rather than generating or passing them through Terraform at all.",
   "When you need to inspect state, use the CLI rather than opening the raw file. `terraform state list` shows every resource address. `terraform state show ADDRESS` shows one resource's attributes in a readable form with sensitive values redacted. `terraform show` displays the current state, and `terraform show -json` gives a machine-readable version for tools, which does include sensitive values, so treat its output carefully. Likewise, `terraform output` redacts sensitive outputs in its normal listing, but `terraform output -json` and `terraform output -raw NAME` reveal the actual values, which is useful for scripts that need them but means those scripts and their logs must be protected too.",
   "If a secret does leak through state, the remedy has several parts. Rotate the exposed credential immediately, because removing a file does not undo exposure. Remove the file from version control history if it was committed. Move state to an encrypted, access-controlled backend and review who had access. Then reduce future exposure with ephemeral values, write-only arguments or a secrets manager. Notice that marking more things `sensitive` is not on that list; it is useful for keeping secrets out of logs and screens, which matters, but it is a display control rather than a storage control.",
   "For the exam, hold on to one sentence: `sensitive = true` hides values from output, not from state. The protection for state is where and how you store it, plus features that keep secrets out of it entirely."
  ],
  "analogy": "Marking a value sensitive is like a bank teller covering your account number with a hand while the screen faces the customer queue. Nobody in line sees it, but the number is still fully stored in the bank's records. Protecting state is like controlling who can enter the records room and keeping the files in a locked, encrypted cabinet. The analogy stops at ephemeral values: those are like information spoken aloud during the visit and never written into any record at all.",
  "terms": [
   [
    "terraform.tfstate",
    "The default local state file, a JSON document recording managed resources and their attributes."
   ],
   [
    "sensitive",
    "A flag on variables and outputs that redacts values in CLI output; the values are still stored in state."
   ],
   [
    "Ephemeral value",
    "A value that exists only during a Terraform run and is never persisted to state or plan files."
   ],
   [
    "Write-only argument",
    "A resource argument whose value Terraform sends to the provider but never stores in state or plan."
   ],
   [
    "Serial and lineage",
    "State metadata: the serial increments on each write, and the lineage identifies a single state's history."
   ]
  ],
  "example": "A security scan of a public repository finds a committed `terraform.tfstate` containing a database administrator password. The team rotates the password, removes the file from history, adds state files to `.gitignore`, and moves state to an encrypted remote backend with restricted access.",
  "mistakes": [
   [
    "`sensitive = true` encrypts the value in state.",
    "It only redacts the value in CLI and plan output. State still stores it in plaintext JSON."
   ],
   [
    "A private Git repository is a fine place to keep state.",
    "State should never be committed; it can contain secrets and stays in history. Use a remote backend with encryption and access control."
   ],
   [
    "`terraform output -json` keeps sensitive values hidden like the normal listing.",
    "`-json` and `-raw` reveal sensitive output values in plaintext, so scripts using them must be protected."
   ],
   [
    "Deleting a leaked state file from the repository fixes the exposure.",
    "The secret must be rotated, because anyone who saw or copied the file still has it, and history may retain it."
   ]
  ],
  "tryit": [
   [
    "Your module generates a database password with `random_password` and passes it to the database resource. A teammate marks the output that exposes it as `sensitive = true` and says the secret is now safe. What would you tell them, and what would you change?",
    "The output will be hidden in CLI output, but the password is still in plaintext in state. Store state in an encrypted, access-restricted backend, limit who can read it, and where supported use a write-only argument or a secrets manager so the password is not persisted in state at all."
   ]
  ],
  "tip": "`sensitive = true` hides values from output, not from state. The correct protection for secrets in state is a secure, encrypted, access-controlled backend, plus ephemeral values or write-only arguments where available.",
  "check": [
   [
    "Is a variable marked `sensitive = true` encrypted in the state file?",
    "No. It is redacted from plan and CLI output, but state stores it in plaintext JSON, so state itself must be protected."
   ],
   [
    "Name two ways to keep a secret out of state entirely in recent Terraform versions.",
    "Use ephemeral values (ephemeral variables or resources) or write-only arguments, which Terraform does not persist."
   ],
   [
    "Besides state, what other Terraform file can contain sensitive values?",
    "Saved plan files created with `terraform plan -out`."
   ]
  ]
 },
 {
  "t": "The Write → Plan → Apply workflow for individuals and teams",
  "hook": "It is 11:15 p.m. at Ironbark Outfitters, and the online store is down. An hour ago, Sam made a quick fix to a load balancer rule from his laptop, ran `terraform apply -auto-approve` to save time, and went to dinner. The apply did fix the rule. It also replaced the database subnet group, because his local copy of the code was two days behind the main branch, and nobody saw the plan. Now you are on call, staring at a destroyed and recreated resource and an empty review history. The same three commands could have been run in a way that made this almost impossible. What would that have looked like?",
  "simple": "Terraform work follows three steps: write, plan and apply. First you write or change the code that describes your infrastructure. Then you ask Terraform for a plan, a preview list of exactly what it would add, change or delete. Finally you apply, which actually makes those changes, but only after someone has read the plan and agreed. It is like renovating a kitchen: you draw the design, the contractor gives you a written quote listing every change, and only after you sign does anyone pick up a hammer. Working alone, you do all three steps yourself. On a team, the steps are shared out: one person writes, a shared system makes the plan, teammates review it, and an automated system applies it.",
  "body": [
   "Terraform's core workflow has three steps. Write means authoring or changing infrastructure as code. Plan means previewing the exact changes Terraform would make to bring real infrastructure in line with that code. Apply means carrying out those changes, after someone has reviewed and approved them. The steps are the same whether you are one person managing a hobby project or a large organization managing thousands of resources. What changes is who does each step, where it runs, and what safeguards surround it.",
   "For an individual practitioner, the loop is tight and local. You edit `.tf` files in your editor, ideally inside a Git repository so every change is recorded. You run `terraform init` once when you start, and again whenever providers, modules or the backend change. Then you run `terraform plan` often, much as a programmer runs tests, to see whether each edit produces the changes you expect and to catch mistakes early, before they become expensive. When the plan looks right, you run `terraform apply`. Apply shows the plan again and waits for you to type `yes`, which is your last chance to notice something unexpected. Afterward, you commit the code and push it so the repository reflects what is now deployed.",
   "For a team, the same steps are spread across people and tools, so that no one changes shared infrastructure from a laptop without review. A typical team flow looks like this:",
   "```text\n1. Write:  create a branch, change the code, push, open a pull request\n2. Plan:   CI or HCP Terraform runs a speculative plan and posts it to the PR\n3. Review: teammates review the code diff and the plan output together\n4. Apply:  after approval and merge, the pipeline or HCP Terraform applies\n```",
   "Notice what reviewers look at in step three. Reading a code diff alone can mislead, because a one-line change to a variable can ripple into dozens of resources, and a provider upgrade can change resources with no code change at all. Reading the plan alongside the code shows the real effect: how many resources will be added, changed and destroyed, and which ones are marked for replacement. The plan summary line, such as `Plan: 1 to add, 0 to change, 0 to destroy.`, is the first thing many reviewers check.",
   "Several practices make the team workflow safe. State lives in a shared remote backend with locking, so two applies cannot collide or overwrite each other's results. Credentials for applying to production live in the pipeline or in HCP Terraform, not on individual machines, which limits who can make changes and records every run. Formatting and validation, with `terraform fmt -check` and `terraform validate`, run automatically on every push, and policy checks can block plans that break organizational rules, such as storage without encryption. The plan that reviewers approved should be the plan that is applied; pipelines often save it with `terraform plan -out=tfplan` and later run `terraform apply tfplan`, which applies exactly that saved plan without asking again.",
   "HCP Terraform builds this team workflow in. A workspace can be connected to a version control repository so that opening a pull request automatically triggers a speculative plan. A speculative plan shows the proposed changes for review but can never be applied. Merging to the workspace's tracked branch triggers a real run, whose plan waits for someone to confirm it unless the workspace has auto-apply enabled. Runs execute remotely with shared state, workspace variables, team access controls and a history of who approved what, so the audit trail is automatic.",
   "Whichever way you work, keep the discipline of reading the plan before approving. The plan is the moment to notice an unexpected destroy, the replacement of a database that would lose data, or a change caused by drift that nobody knew about. Skipping that review with `-auto-approve` is appropriate in automation only when an approval gate already exists earlier in the process, such as an approved pull request whose saved plan is being applied. Using it on a laptop to save a few seconds, as in the opening scenario, removes the one safeguard that would have caught the problem.",
   "For the exam, know the order and the purpose of each step: Write is authoring code, Plan is previewing and reviewing, Apply is provisioning. Know too that in teams the plan is reviewed alongside the code before anything is applied, and that a speculative plan is for review only."
  ],
  "analogy": "The workflow is like a kitchen renovation. You draw the design, which is Write. The contractor gives a written, itemized quote listing every wall removed and every cabinet added, which is Plan. Nothing happens until you sign, and then the crew builds exactly what was quoted, which is Apply. On a big project, an architect and a building inspector review the quote too. The analogy stops at drift: a contractor's quote does not change if a neighbor moves your fence, but a Terraform plan will show it.",
  "terms": [
   [
    "Core workflow",
    "Terraform's Write, Plan and Apply cycle for changing infrastructure."
   ],
   [
    "Speculative plan",
    "A plan run for review only, such as on a pull request, that cannot be applied."
   ],
   [
    "Remote backend",
    "Shared state storage, such as HCP Terraform, that lets a team use one state safely with locking."
   ],
   [
    "Pull request",
    "A request to merge code changes that lets teammates review them, often with plan output attached."
   ],
   [
    "Saved plan",
    "A plan written to a file with `terraform plan -out`, which `terraform apply` can carry out exactly as reviewed."
   ]
  ],
  "example": "A developer opens a pull request adding a cache cluster. HCP Terraform posts a speculative plan showing one resource to add. A reviewer notices the plan also replaces a subnet because of an unrelated typo, the author fixes it, and after merge the run applies only the intended change.",
  "mistakes": [
   [
    "`terraform plan` makes small changes and apply makes the rest.",
    "Plan never changes infrastructure; only apply does."
   ],
   [
    "Reviewing the code diff is enough; the plan is optional.",
    "The plan shows the real effect, including replacements and drift that the code diff does not reveal."
   ],
   [
    "A speculative plan on a pull request can be applied after approval.",
    "A speculative plan cannot be applied. The real run happens after merge, or from a saved plan in a pipeline."
   ],
   [
    "`-auto-approve` is a good habit to save time.",
    "It skips the final human review. Use it only in automation where an approval gate already exists."
   ]
  ],
  "tryit": [
   [
    "Your pipeline runs `terraform plan` on a pull request, reviewers approve, and after merge the pipeline runs a fresh `terraform apply -auto-approve`. A teammate worries the applied changes might differ from what was reviewed. Are they right, and how could you fix it?",
    "Yes. A fresh apply computes a new plan, which can differ if infrastructure or other code changed in between. Save the plan with `terraform plan -out=tfplan` and apply that file with `terraform apply tfplan`, so exactly the reviewed plan is applied."
   ],
   [
    "You work alone on a personal lab. What does a sensible workflow look like?",
    "Edit code in a Git repository, run `terraform init` when needed, run `terraform plan` often to check each change, then `terraform apply` and read the plan before typing yes, and commit the code afterward."
   ]
  ],
  "tip": "Know the order and purpose: Write (code), Plan (preview and review), Apply (provision). In teams the plan is reviewed alongside the code before anything is applied.",
  "check": [
   [
    "In a team workflow, when is infrastructure actually changed?",
    "Only at the Apply step, after the code and its plan have been reviewed and approved, usually by a pipeline or HCP Terraform rather than a laptop."
   ],
   [
    "What is a speculative plan?",
    "A plan run to show proposed changes, for example on a pull request, that cannot itself be applied."
   ],
   [
    "How can a pipeline guarantee it applies exactly the plan that was reviewed?",
    "Save it with `terraform plan -out=FILE` and run `terraform apply FILE`."
   ]
  ]
 },
 {
  "t": "`terraform init`: backend setup, provider and module download, `-upgrade`, `-migrate-state`, `-reconfigure`, `-backend-config`",
  "hook": "Kestrel Analytics has finally outgrown local state. Hana adds a new backend block pointing at a shared storage bucket, runs `terraform init`, and Terraform asks a question she was not expecting: do you want to copy existing state to the new backend? She is not sure, so she cancels, searches online, and finds a forum post recommending `-reconfigure`. She runs it. The next plan wants to create all forty resources from scratch, as if the infrastructure did not exist. Panic spreads through the team channel, although nothing in the cloud has actually changed. Which init option should she have used, and why did the other one make everything appear to vanish?",
  "simple": "`terraform init` is the setup command you run before anything else in a Terraform project. It does not build any infrastructure. Instead it gets your folder ready: it connects to the place where Terraform keeps its records, called the backend, and downloads the plugins and shared code packages your project needs. Think of it as unpacking and plugging in a new kitchen appliance before you cook anything. A few options change how it behaves. `-upgrade` fetches newer allowed versions of plugins. When you move the records to a new place, `-migrate-state` copies the old records over, while `-reconfigure` starts fresh without copying. `-backend-config` lets you supply backend settings at the moment you run the command instead of writing them in the code.",
  "body": [
   "`terraform init` prepares a working directory so that other Terraform commands can run. It is the first command you run in a new configuration or a freshly cloned repository, and you run it again whenever you add or change providers, modules or backend settings. It is safe to run repeatedly, because it is idempotent: running it twice with the same configuration leaves the directory in the same state. Most importantly for the exam, init never creates, changes or destroys real infrastructure. It only sets up the local working directory and the connection to state.",
   "Init does three main jobs. First, it initializes the backend, reading the `backend` block, or the `cloud` block when you use HCP Terraform, and connecting to wherever state is stored. Second, it installs modules referenced by `module` blocks, downloading registry and Git modules into `.terraform/modules`; local path modules, such as `source = \"./modules/network\"`, are referenced in place rather than copied. Third, it installs providers as required by every `required_providers` block and the dependency lock file, writing or updating `.terraform.lock.hcl`. Everything downloaded goes under the hidden `.terraform` directory, which you should not commit to version control. If you ever see an error saying the directory has not been initialized, a module is not installed, or required plugins are missing, the fix is to run init.",
   "The `-upgrade` option tells init to ignore the versions already selected and pick the newest provider and module versions allowed by your version constraints. Without it, init sticks with the versions recorded in the lock file, which is what keeps every teammate and pipeline consistent. Use `-upgrade` deliberately when you want newer versions, then review the lock file diff, run a plan to look for unexpected changes, and commit the result.",
   "Backend changes are where init needs the most care. When you change the backend configuration, for example moving from local state to a cloud storage backend or changing the bucket or key of an existing backend, init notices that the saved backend settings in `.terraform` no longer match the configuration, and asks what to do with existing state. The `-migrate-state` option copies the existing state from the old backend to the new one, prompting for confirmation before it does so. This is the option you want when you are moving a live project to a new home. The `-reconfigure` option does the opposite: it ignores the saved backend configuration and any existing state and sets up the new backend fresh, without migrating anything.",
   "Use `-reconfigure` when you are pointing at a backend that already holds the correct state, for example after a teammate has already migrated state and you just need your local directory to use the new location, or when you intentionally want to start clean. Using it by mistake, as in the opening scenario, makes it look as though your resources have vanished: the new backend is empty, so the plan proposes creating everything. The resources are still running, and the old state still exists in the old location, so the recovery is to point back, or rerun init with `-migrate-state`, rather than applying that alarming plan.",
   "The `-backend-config` option supplies backend settings at init time, which is called partial configuration. You can leave some or all arguments out of the `backend` block and pass them as `-backend-config=\"key=value\"` pairs, or as a path to a file containing the settings. This is useful for keeping environment-specific values, such as a separate state key for staging and production, or credentials, out of the committed code. It matters because backend blocks cannot use input variables or other references; the backend is configured before Terraform evaluates the rest of the configuration.",
   "```hcl\nterraform {\n  backend \"s3\" {}\n}\n```",
   "```text\nterraform init \\\n  -backend-config=\"bucket=acme-tfstate\" \\\n  -backend-config=\"key=network/prod.tfstate\" \\\n  -backend-config=\"region=us-east-1\"\n```",
   "Other options are handy in automation. `-input=false` makes init fail with an error rather than wait for an interactive prompt that nobody in a pipeline can answer, and `-backend=false` skips backend initialization entirely, which some teams use for quick checks such as validation that do not need state. When you read init output, look for three sections, one each for the backend, modules and providers, and a final message confirming that the directory has been successfully initialized.",
   "For the exam, keep the options straight. `-migrate-state` moves existing state to a new backend. `-reconfigure` sets up the backend without moving state. `-upgrade` re-selects provider and module versions. `-backend-config` supplies partial backend configuration at init time. None of them change real infrastructure."
  ],
  "analogy": "Changing backends is like moving your filing cabinet to a new office. `-migrate-state` is hiring movers to carry every folder to the new office before you start work there. `-reconfigure` is walking into the new office and using whatever cabinet is already there; if it is empty, it looks as if your records are gone, though the old cabinet still sits in the old office. The analogy stops at the prompt: Terraform asks before migrating, while movers rarely do.",
  "terms": [
   [
    "terraform init",
    "Command that initializes a working directory: configures the backend and installs modules and providers."
   ],
   [
    "-migrate-state",
    "Init option that copies existing state to a newly configured backend."
   ],
   [
    "-reconfigure",
    "Init option that configures the backend fresh, ignoring saved settings and not migrating state."
   ],
   [
    "Partial configuration",
    "Leaving backend settings out of code and supplying them with `-backend-config` at init time."
   ],
   [
    "-upgrade",
    "Init option that selects the newest provider and module versions allowed by constraints, updating the lock file."
   ]
  ],
  "example": "A team outgrows local state. They add an `s3` backend block, run `terraform init -migrate-state`, confirm the prompt, and their existing state is copied to the bucket. Teammates then run plain `terraform init` on fresh clones and see the same state.",
  "mistakes": [
   [
    "`terraform init` can create or modify infrastructure.",
    "Init only prepares the working directory and backend connection; it never changes real infrastructure."
   ],
   [
    "`-reconfigure` moves state to the new backend.",
    "`-reconfigure` does not migrate anything. Use `-migrate-state` to copy existing state."
   ],
   [
    "You can use input variables inside a backend block.",
    "Backend blocks cannot use variables. Supply varying values with `-backend-config` partial configuration."
   ],
   [
    "Init always installs the newest provider versions.",
    "Init uses versions in the lock file unless you pass `-upgrade`."
   ]
  ],
  "tryit": [
   [
    "You maintain one configuration for staging and production, each with its own state file in the same bucket. You want to avoid editing the backend block when switching environments. How do you set this up?",
    "Leave the varying settings, such as `key`, out of the backend block and pass them at init time with `-backend-config`, for example a `staging.hcl` and a `prod.hcl` settings file. Backend blocks cannot use variables, so partial configuration is the supported approach."
   ],
   [
    "A teammate already migrated your project's state to a new remote backend and merged the backend change. You pull the change and init complains that the backend configuration changed. Which option fits?",
    "`terraform init -reconfigure`, because the new backend already holds the correct state and you only need your local directory to use it. Migrating your old local copy could overwrite newer state."
   ]
  ],
  "tip": "`-migrate-state` moves state to the new backend; `-reconfigure` does not. `-upgrade` changes provider and module versions. None of init's options change real infrastructure.",
  "check": [
   [
    "You changed the backend block and want your current state copied to the new location. Which init option do you use?",
    "`terraform init -migrate-state`."
   ],
   [
    "Why would you use `-backend-config` instead of writing values in the backend block?",
    "Backend blocks cannot use variables, so partial configuration lets you supply environment-specific or secret settings at init time without committing them."
   ],
   [
    "What are the three main jobs of `terraform init`?",
    "Initialize the backend, install modules, and install providers (updating the lock file)."
   ]
  ]
 },
 {
  "t": "`terraform validate`: syntax and internal consistency checks without contacting provider APIs",
  "hook": "At Willowbrook Schools District, the infrastructure pipeline takes eleven minutes to produce a plan, because it has to assume a role, refresh three hundred resources and talk to two cloud accounts. Yesterday, Owen waited all eleven minutes only to learn he had typed `var.regoin` instead of `var.region`. Today he asks you whether there is a faster check that could catch that kind of mistake in seconds, on every push, without giving the check any cloud credentials at all. You know there is a command for exactly this. But you also know someone will soon ask why that command said everything was valid when the apply then failed on an image ID that does not exist. What does it really check?",
  "simple": "`terraform validate` is a quick spell-check and grammar-check for your Terraform code. It reads your files and asks: does this code make sense on its own? It catches typos in names, missing required settings, references to things you never defined, and values of the wrong kind, like a word where a list was expected. It does not contact any cloud or service, so it needs no passwords and runs in seconds. That also means it cannot know about real-world problems, such as a server type your region does not offer or a name someone else already took. Think of a spell-checker on an email: it can tell you a word is misspelled, but not whether the address you typed belongs to a real person.",
  "body": [
   "`terraform validate` checks whether a configuration is syntactically valid and internally consistent. It answers the question: could Terraform make sense of this code at all? It does not answer whether the infrastructure change will succeed, because it never contacts remote services. It does not call provider application programming interfaces (APIs), and it does not read remote or local state. Everything it checks comes from your `.tf` files and the provider schemas installed on your machine.",
   "What does validate catch? Syntax errors, such as a missing closing brace, a stray character or an unterminated string. References to things that do not exist, such as `var.region` when no `variable \"region\"` block is declared, a reference to `module.network` with no such module block, or `aws_instance.web.ip` when the attribute is actually named differently. Missing required arguments and unknown arguments for a resource type, because the provider schema lists which arguments exist and which are required. Type mismatches, such as passing a string where a list is expected or a number where a map is required. And invalid meta-argument use, such as setting both `count` and `for_each` on the same resource, which Terraform does not allow.",
   "To check resource arguments, validate needs the provider schemas, which means the directory must be initialized with `terraform init` first so the providers and modules are installed. If you run validate in a fresh clone without init, it reports errors about missing providers or modules and tells you to run init first. Once initialized, validate does not need cloud credentials, does not need values for input variables, and does not read state. That combination makes it quick and safe to run almost anywhere: in a continuous integration (CI) job on every commit, in a pre-commit hook, or as a background check in your editor. Some teams run init with `-backend=false` in CI so validation does not even need access to the state backend.",
   "Here is what the two outcomes look like. When everything is consistent, validate prints a short success message stating that the configuration is valid and exits with status code 0. When it finds problems, it prints each error with the file, line and a description, and exits with a non-zero status, which is what makes a CI step fail.",
   "```text\n$ terraform validate\nError: Reference to undeclared input variable\n  on main.tf line 4: region = var.regoin\n```",
   "What does validate miss? Anything that requires talking to the real world. An invalid machine image ID, a storage bucket name already taken by someone else, insufficient permissions for the credentials, a quota limit on the account, or a region that does not offer a particular service or instance type will all pass validation and only surface at plan or apply. Some provider-side checks do run during plan, because providers can validate arguments against the API then, which is one reason plan catches more than validate. So treat validate as a fast first filter, not a guarantee that the change will work.",
   "It helps to place validate alongside its neighbors. `terraform fmt` is a separate check for style: it rewrites files into the canonical layout, and `terraform fmt -check` reports files that are not formatted, but it says nothing about whether code is valid. `terraform validate` checks meaning and consistency without contacting anything. `terraform plan` also performs validation as part of its work, but it additionally refreshes state, calls provider APIs and computes changes, so it is slower and needs credentials and variable values. A sensible pipeline runs them in that order, fmt then validate then plan, so cheap checks fail fast before expensive ones start.",
   "Validate has a few options and companions worth knowing. `terraform validate -json` produces machine-readable results that editors and CI tools can parse into annotations. When you want rules specific to your organization, such as allowed regions or naming conventions, add custom `validation` blocks to input variables, or `precondition` and `postcondition` blocks to resources and outputs. Note that variable validation rules are evaluated when values are known, typically during plan, so they complement rather than replace the command.",
   "For the exam, remember the boundaries. Validate checks syntax and internal consistency, needs `terraform init` first, and does not contact provider APIs or remote state, need credentials, or need variable values. Errors that depend on the real platform appear only at plan or apply."
  ],
  "analogy": "`terraform validate` is like a spell-checker and grammar-checker on a letter. It underlines misspelled words, missing punctuation and a sentence that refers to a person you never introduced. It cannot tell whether the street address on the envelope exists or whether the recipient still lives there; you only learn that when the letter is delivered. The analogy stops at the dictionary: validate needs the provider schemas installed by init, much as a spell-checker needs its dictionary loaded.",
  "terms": [
   [
    "terraform validate",
    "Command that checks configuration syntax and internal consistency without contacting remote services."
   ],
   [
    "Internal consistency",
    "Whether references, argument names, types and required arguments in the configuration agree with each other and with provider schemas."
   ],
   [
    "Provider schema",
    "The provider's list of resource types, arguments and types, needed by validate and obtained by `terraform init`."
   ],
   [
    "-json",
    "Option that outputs validation results in a machine-readable format."
   ],
   [
    "terraform fmt",
    "Command that rewrites configuration into canonical style; a style check, not a validity check."
   ]
  ],
  "example": "A CI pipeline runs `terraform fmt -check` and `terraform validate` on every push without any cloud credentials. A commit that misspells a variable reference fails in seconds, long before anyone asks for a plan against production.",
  "mistakes": [
   [
    "`terraform validate` confirms the apply will succeed.",
    "Validate never contacts provider APIs, so problems like invalid image IDs, permissions or quotas surface only at plan or apply."
   ],
   [
    "Validate can run without `terraform init`.",
    "It needs the provider schemas, so the directory must be initialized first."
   ],
   [
    "Validate needs credentials and variable values.",
    "It needs neither; it does not contact remote services and does not require input variable values."
   ],
   [
    "`terraform fmt` and `terraform validate` do the same thing.",
    "fmt fixes or checks style; validate checks syntax and internal consistency."
   ]
  ],
  "tryit": [
   [
    "Your security team will not give the CI linting stage any cloud credentials. You still want every push checked for typos, missing required arguments and bad references. What do you run, and what preparation is needed?",
    "Run `terraform init` (optionally with `-backend=false` so no state access is needed) to install providers and modules, then `terraform fmt -check` and `terraform validate`. Validate needs no credentials or variable values."
   ],
   [
    "A configuration passes `terraform validate`, but apply fails because the chosen instance type is not offered in the region. A teammate says validate is broken. How do you respond?",
    "Validate is working as designed. It checks only syntax and internal consistency and never contacts provider APIs, so region availability errors can only appear at plan or apply."
   ]
  ],
  "tip": "Validate does not contact provider APIs or remote state, and does not need variable values, but it does need `terraform init` first. Errors like a nonexistent image ID are caught only at plan or apply.",
  "check": [
   [
    "Will `terraform validate` catch a reference to an undeclared variable?",
    "Yes. Undeclared references are an internal consistency error detected without any API calls."
   ],
   [
    "Will `terraform validate` catch that a chosen instance type is not offered in your region?",
    "No. That requires contacting the provider's API, which validate never does; it would surface at plan or apply."
   ],
   [
    "Will validate catch `count` and `for_each` set on the same resource?",
    "Yes. That is invalid meta-argument use, detected from the configuration alone."
   ]
  ]
 },
 {
  "t": "`terraform plan`: refresh, diff and symbols (`+`, `-`, `~`, `-/+`), saved plans with `-out`",
  "hook": "It is 4:40 p.m. on a Friday at Lakeshore Freight, and Dev has a small pull request: change the tags on the web server so the finance team can track costs. He runs `terraform plan` out of habit, expecting a quiet `~` next to one resource. Instead the screen shows `-/+` in front of the production instance and a summary that reads one to add and one to destroy. Nobody mentioned rebuilding anything. Is this a harmless quirk of the output, or is Terraform about to delete the server that takes customer orders? The answer is sitting in the plan, if Dev knows how to read it.",
  "simple": "Before Terraform changes anything, it can show you a preview called a plan. Think of it like a contractor walking through your house and handing you a list: build this shelf, remove that wall, repaint this door. Nothing has been touched yet. The plan uses small symbols so you can scan it quickly. A plus sign means something new will be built. A minus sign means something will be removed. A tilde (the wavy line) means something will be adjusted where it stands. A minus and plus together mean the old thing will be torn out and a new one put in its place. You can also save the list to a file, so that later the contractor does exactly what you approved and nothing else.",
  "body": [
   "`terraform plan` creates an execution plan: a preview of what Terraform would change. It never changes real infrastructure, which is why it is safe to run as often as you like. Plan works in three stages. First it reads the current state, Terraform's record of the objects it manages. Then, by default, it refreshes: it asks each provider for the current attributes of every managed object, so it can see drift, meaning changes made outside Terraform, for example by someone clicking in a cloud console. Finally it compares the configuration with that refreshed view and works out which actions would make reality match the code. Refresh only updates Terraform's in-memory view during a normal plan; the state file itself is not rewritten by plan.",
   "The plan output lists each affected resource with a symbol and a short description. The main symbols are worth memorizing. `+` means create. `-` means destroy. `~` means update in place, and only the changed attributes are shown, with old and new values joined by an arrow. `-/+` means destroy and then create a replacement, because you changed an argument that cannot be modified on a live object, such as the machine image of a virtual machine. `+/-` also means replace, but in the opposite order: the new object is created first and the old one destroyed afterward, which happens when the resource has `lifecycle { create_before_destroy = true }`. Data sources that cannot be read until apply appear with `<=`, meaning read.",
   "```text\n  # aws_instance.web must be replaced\n-/+ resource \"aws_instance\" \"web\" {\n      ~ ami  = \"ami-old\" -> \"ami-new\" # forces replacement\n      ~ id   = \"i-0abc\" -> (known after apply)\n    }\n\nPlan: 1 to add, 0 to change, 1 to destroy.\n```",
   "The annotations tell you why each action is planned, so read them rather than only scanning the symbols. `# forces replacement` marks the specific argument that triggered a replace; that is the line to investigate when a replacement surprises you. `(known after apply)` means the value will only be known once the provider creates or updates the object, such as a new ID or IP address, so Terraform cannot print it yet. `(sensitive value)` means the value is hidden because it, or something it was derived from, is marked sensitive. The final summary line counts adds, changes and destroys, and a replacement counts as one add and one destroy. That is why the example above says 1 to add and 1 to destroy even though only one resource is involved.",
   "Plan also reports drift explicitly. If refresh finds that an object changed outside Terraform, the output first includes a section noting that objects have changed outside of Terraform and showing what changed. It then shows the actions Terraform would take to bring the object back in line with the configuration. This ordering helps you decide whether to let Terraform revert the manual change or to update the code so it adopts the new value. If you see changes you did not write, pause before applying.",
   "By default the plan is shown on screen and then discarded. When you later run `terraform apply`, Terraform plans again, and if anything changed in between, the second plan may differ from the one you reviewed. With `-out=FILE`, for example `terraform plan -out=tfplan`, Terraform saves the plan to a file so that exactly those actions can be applied later with `terraform apply tfplan`. This matters in pipelines, where a plan is produced, reviewed and approved, and then applied without being recomputed. The saved file is not meant to be read directly; view it in human-readable form with `terraform show tfplan`, or as machine-readable JSON with `terraform show -json tfplan` for policy and review tools.",
   "Treat a saved plan file as sensitive. It contains the full configuration, the variable values used and possibly secrets, so protect it the same way you protect the state file: do not commit it to version control, store pipeline artifacts with restricted access, and delete it when the run is done. A saved plan also becomes stale if the state changes before it is applied, and Terraform will refuse to apply it in that case, which protects you from applying an outdated preview.",
   "Two options make plan especially useful in automation. `-detailed-exitcode` changes the exit status so a script can tell what happened: 0 means the plan succeeded with no changes, 1 means an error, and 2 means the plan succeeded and there are changes. A scheduled job can use this to detect drift and alert someone. `-input=false` prevents Terraform from prompting for missing variable values, so a job fails clearly instead of hanging while it waits for keyboard input that will never come. Together with a saved plan, these options form the backbone of a safe, reviewable workflow."
  ],
  "analogy": "A plan is like a renovation quote. The contractor walks through, checks what is actually there now (refresh), compares it with your blueprint, and lists the work: add a shelf, remove a wall, repaint a door, or rip out and replace a window that cannot be repaired in place. Saving the plan is like signing that exact quote so the crew cannot quietly add work later. The analogy stops at one point: a signed quote stays valid for weeks, but a saved plan becomes stale the moment the state changes, and Terraform will refuse it.",
  "mnemonic": "Read the symbols as sentences: plus \"adds\", minus \"subtracts\", tilde \"tweaks\", minus-then-plus \"tear down, then build\", plus-then-minus \"build, then tear down\", and the arrow `<=` \"reads in\" a data source.",
  "terms": [
   [
    "Execution plan",
    "Terraform's preview of the create, update, replace and destroy actions needed to make real infrastructure match the configuration."
   ],
   [
    "Refresh",
    "The plan step that asks providers for the current attributes of managed objects so drift can be detected."
   ],
   [
    "Drift",
    "A difference between real infrastructure and Terraform state caused by changes made outside Terraform."
   ],
   [
    "-/+ (replace)",
    "Plan symbol meaning the existing object will be destroyed and a new one created; `+/-` means create first, then destroy."
   ],
   [
    "(known after apply)",
    "Plan annotation for values the provider will only determine when the change is carried out."
   ],
   [
    "Saved plan",
    "A plan written with `-out=FILE` that can be applied later, exactly as reviewed, with `terraform apply FILE`."
   ]
  ],
  "example": "A plan meant to change an instance's tags shows `-/+` and a replacement. Reading more closely, the engineer sees `# forces replacement` next to the subnet ID, realizes a variable points at the wrong subnet, and fixes it before any server is destroyed. The corrected plan shows a single `~` with only the tags changing.",
  "mistakes": [
   [
    "Running `terraform plan` can change infrastructure because it talks to the cloud provider.",
    "Plan only reads. It queries providers during refresh, but it never creates, modifies or destroys real objects."
   ],
   [
    "`-/+` and `~` both mean the resource is updated, so they are equally safe.",
    "`~` updates in place and the object survives. `-/+` destroys the object and creates a new one, which can mean downtime, a new ID and lost local data."
   ],
   [
    "A replacement counts as one change in the summary line.",
    "A replacement counts as one add and one destroy, so the summary shows both numbers increasing, not the change count."
   ],
   [
    "A saved plan file is harmless text that can be committed with the code.",
    "It can contain variable values and secrets. Protect it like state and keep it out of version control."
   ]
  ],
  "tryit": [
   [
    "Your pipeline runs `terraform plan` on every pull request and a nightly job checks production for drift. The nightly job must page someone only when real infrastructure no longer matches the code, and must never hang waiting for input. Which plan options should the nightly job use?",
    "Use `terraform plan -detailed-exitcode -input=false`. An exit code of 2 means changes were found, which the job turns into an alert; 0 means no drift and 1 means an error. `-input=false` makes the job fail instead of waiting for a prompt if a variable is missing."
   ],
   [
    "A teammate's plan shows `+/-` for a load balancer rather than `-/+`. She asks whether the replacement will cause an outage. What does the difference tell you?",
    "`+/-` means `create_before_destroy` is set, so Terraform builds the new load balancer first and destroys the old one afterward. That ordering is designed to reduce downtime, though dependent resources still need to switch to the new object."
   ]
  ],
  "tip": "Memorize the symbols: `+` create, `-` destroy, `~` update in place, `-/+` replace (destroy first), `+/-` replace (create first), `<=` read. Plan never changes infrastructure, though it does refresh from providers. To apply exactly what was reviewed, use `plan -out=FILE` then `apply FILE`.",
  "check": [
   [
    "What does `~` mean in plan output?",
    "The resource will be updated in place, without being destroyed."
   ],
   [
    "How do you guarantee that exactly the reviewed actions are applied?",
    "Save the plan with `terraform plan -out=FILE` and apply that file with `terraform apply FILE`."
   ],
   [
    "A plan summary reads `Plan: 1 to add, 0 to change, 1 to destroy` for a single resource. What is most likely happening?",
    "The resource is being replaced; a replacement counts as one add and one destroy. Look for `# forces replacement` to see which argument caused it."
   ],
   [
    "What does `terraform plan -detailed-exitcode` return when changes are pending?",
    "Exit code 2. It returns 0 for no changes and 1 for an error."
   ]
  ]
 },
 {
  "t": "Planning options: `-var`, `-var-file`, `-target`, `-refresh=false`, `-refresh-only`, `-replace`",
  "hook": "Priya is on call for Juniper Valley Health's platform team when a message arrives: the load balancer's idle timeout looks different from what the code says, and someone thinks a contractor changed it in the console last week. Her manager wants to know what drifted before anyone touches production. Meanwhile, a separate ticket asks her to rebuild one unhealthy web server without disturbing the other three, and a third says staging needs five instances instead of two, just for today. Three requests, one command. Which `terraform plan` options let her answer each one safely, and which tempting shortcut could leave state and reality quietly out of step?",
  "simple": "`terraform plan` has switches you can add to change what it looks at or what it proposes. Some switches feed in values, like telling a recipe app to make four servings instead of two without rewriting the recipe. Others narrow the focus to one piece, skip the step of checking the real world, only check the real world without proposing changes, or ask Terraform to rebuild one specific thing even though nothing in the code changed. Each switch solves a particular problem. The trick is knowing which one fits, and remembering that a couple of them are meant only for unusual situations because they can give you an incomplete picture.",
  "body": [
   "`terraform plan` accepts options that change either its inputs or its planning behavior. Most of them work the same way on `terraform apply`, because apply without a saved plan file creates a plan first and then asks for approval. Learning them on plan therefore teaches you apply as well. The six options in this lesson fall into three groups: supplying variable values (`-var`, `-var-file`), narrowing or changing what gets planned (`-target`, `-replace`), and controlling the refresh step (`-refresh=false`, `-refresh-only`).",
   "`-var` and `-var-file` supply input variable values. `-var 'instance_count=3'` sets one variable on the command line, and `-var-file=prod.tfvars` loads values from a file. You can repeat either option, and when the same variable is set more than once, the last one on the command line wins, because Terraform processes these options in the order given. Command-line values take the highest precedence, above `TF_VAR_` environment variables and automatically loaded files such as `terraform.tfvars` and `*.auto.tfvars`. A typical pattern is one variable file per environment, such as `dev.tfvars` and `prod.tfvars`, so the same code deploys differently-sized environments. Files with those custom names are not loaded automatically; they only take effect when passed with `-var-file`.",
   "`-target=ADDRESS` limits planning to one resource or module and whatever it depends on, for example `-target=aws_instance.web` or `-target=module.network`. Terraform prints a warning when you use it, because the result is a partial view that ignores other pending changes and can leave configuration and state out of step. Imagine three changes waiting in the code and you target only one: the plan looks clean, but the other two remain unapplied and invisible in that run. HashiCorp recommends `-target` only for exceptional situations, such as recovering from an error or working around a provider bug, not as a routine way to deploy part of a configuration. If you find yourself targeting regularly, the configuration probably wants to be split into smaller root modules.",
   "`-refresh=false` skips the refresh step and plans from state alone. Terraform does not ask providers for current attributes, so planning is faster on large configurations with many resources or slow APIs. The cost is accuracy: Terraform will not notice drift, so the plan can be wrong if something changed outside Terraform. Use it when you are confident nothing has drifted and speed matters, never as a default habit for production.",
   "`-refresh-only` creates a different kind of plan altogether. Instead of proposing changes to infrastructure, it proposes updating state to match what the providers report. Use it to review drift: `terraform plan -refresh-only` shows what changed outside Terraform, and `terraform apply -refresh-only` accepts those changes into state without touching any real objects. Afterward, a normal plan will show whether your configuration now disagrees with reality, which tells you whether to update the code. This replaces the older `terraform refresh` command, which updated state immediately without showing you first and is now deprecated. Keep the two refresh options straight: `-refresh=false` means do not check reality, while `-refresh-only` means only check reality.",
   "`-replace=ADDRESS` forces Terraform to plan replacement of a specific resource instance even though its configuration has not changed, for example when a virtual machine is unhealthy or a bootstrapping script failed. The plan shows the instance as replaced, as requested, and you review and approve it like any other change. It can be repeated for several resources in one command. It is the modern replacement for the deprecated `terraform taint` command, covered in its own lesson. Unlike `-target`, it does not narrow the plan: every other pending change in the configuration is still planned alongside the forced replacement, so you see the full picture. If the resource has `create_before_destroy` set, the replacement respects that ordering, and the new instance is built before the old one is removed.",
   "```text\nterraform plan -var-file=prod.tfvars -var 'instance_count=5'\nterraform plan -target=module.network\nterraform plan -refresh-only\nterraform apply -replace='aws_instance.web[0]'\n```",
   "Two practical details round this out. First, quote addresses that contain brackets or quotes, such as `'aws_instance.web[0]'` or `'aws_instance.web[\"blue\"]'`, so your shell does not interpret those characters before Terraform sees them. Second, a saved plan already contains its variable values and options. When you run `terraform plan -out=tfplan -var-file=prod.tfvars`, those values are baked into the file, so you set options when running plan, not when applying the saved file; `terraform apply tfplan` does not accept new variable values. If you need different values, create a new plan."
  ],
  "analogy": "Think of planning options as settings on a home inspection. Variable options tell the inspector which blueprint version to use. `-target` says inspect only the kitchen, which is quick but means problems in the basement go unreported. `-refresh=false` says skip walking through the house and trust last year's notes. `-refresh-only` says walk through and update the notes, but do not propose any repairs. `-replace` says replace this one window even though it looks fine on paper. The analogy is loose on one point: Terraform's notes are state, and updating them with `apply -refresh-only` is a real change to that file.",
  "terms": [
   [
    "-var / -var-file",
    "Options that set input variable values on the command line or from a file; highest precedence, and the last one given wins."
   ],
   [
    "-target",
    "Limits planning to specific resources or modules and their dependencies; intended for exceptional use only and prints a warning."
   ],
   [
    "-refresh=false",
    "Skips querying providers and plans from state alone; faster but blind to drift."
   ],
   [
    "-refresh-only",
    "Plan or apply mode that updates state to match real infrastructure without changing that infrastructure."
   ],
   [
    "-replace",
    "Forces replacement of a specific resource instance in the plan even when its configuration is unchanged."
   ]
  ],
  "example": "An administrator suspects someone changed a load balancer setting by hand. She runs `terraform plan -refresh-only`, sees the drifted attribute, and decides whether to accept it into state with `apply -refresh-only` or update the code, rather than letting a normal apply silently revert it.",
  "mistakes": [
   [
    "`-refresh=false` and `-refresh-only` are two spellings of the same thing.",
    "They are opposites. `-refresh=false` skips checking real infrastructure; `-refresh-only` does only that check and proposes updating state."
   ],
   [
    "`terraform refresh` is the recommended way to sync state with reality.",
    "It is deprecated because it updated state without a review step. Use `terraform plan -refresh-only` to review and `terraform apply -refresh-only` to accept."
   ],
   [
    "`-target` is a good everyday way to deploy just the part you changed.",
    "It gives a partial view, ignores other pending changes and prints a warning. It is for exceptional cases like recovering from errors."
   ],
   [
    "`prod.tfvars` in the working directory is loaded automatically.",
    "Only `terraform.tfvars`, `terraform.tfvars.json` and `*.auto.tfvars(.json)` load automatically. Other files need `-var-file`."
   ]
  ],
  "tryit": [
   [
    "A teammate wants to test a larger staging fleet for one afternoon without editing `staging.tfvars`, which sets `instance_count = 2`. She plans to run `terraform plan -var 'instance_count=6' -var-file=staging.tfvars`. Will she get six instances?",
    "No. Options are processed in order and the last value wins, so `staging.tfvars` coming after `-var` sets the count back to 2. She should put `-var 'instance_count=6'` after `-var-file=staging.tfvars`."
   ],
   [
    "After a weekend incident, an engineer suspects several security group rules were edited by hand. He wants to see exactly what changed and keep the manual fixes for now, without Terraform altering any real resources. What should he run?",
    "`terraform plan -refresh-only` to review the drift, then `terraform apply -refresh-only` to record it in state. No infrastructure changes. Later he should update the code so the next normal plan does not revert the fixes."
   ]
  ],
  "tip": "`-refresh=false` skips checking reality; `-refresh-only` does only that check and updates state. `terraform refresh` is deprecated in favor of `apply -refresh-only`. `-target` is for exceptional use, and for `-var` and `-var-file` the last value on the command line wins.",
  "check": [
   [
    "What does `terraform apply -refresh-only` change?",
    "Only the state file, updating it to match the real infrastructure; no infrastructure is created, modified or destroyed."
   ],
   [
    "If `-var-file=prod.tfvars` and a later `-var 'size=large'` both set `size`, which value is used?",
    "`large`, because command-line options are processed in order and the last value wins."
   ],
   [
    "Why does Terraform print a warning when you use `-target`?",
    "The plan covers only part of the configuration, ignores other pending changes and can leave state and configuration out of step."
   ]
  ]
 },
 {
  "t": "`terraform apply`: interactive approval, `-auto-approve`, applying a saved plan file",
  "hook": "At Cedar Ridge Schools, the release pipeline posted a plan to the team chat at noon: two new storage buckets, nothing else. Marcus approved it on his phone between meetings. At 12:20 the pipeline ran `terraform apply`, and the run log shows three resources changed, not two. A colleague had merged a small change at 12:05. Marcus is now staring at a question the auditor will certainly ask: if the team approved one plan, why did Terraform apply a different one? And what would have happened if someone had typed `y` instead of `yes` at the prompt, or run the pipeline with `-auto-approve` from a laptop?",
  "simple": "`terraform apply` is the command that actually does the work: it builds, changes or removes real things so they match your code. It can run in two ways. In the first, it works out a fresh plan, shows it to you, and waits until you type the full word yes. In the second, you hand it a plan you saved earlier, and it carries out exactly that plan without asking again, because saving and reviewing it was the approval. Think of ordering at a counter: either the cashier reads your order back and waits for you to confirm, or you hand over a signed order form that the kitchen simply follows. If anything changes in a way that makes the saved order outdated, the kitchen refuses it and asks for a new one.",
  "body": [
   "`terraform apply` executes changes to make real infrastructure match the configuration, then records the results in state. It runs in two distinct modes. Without a plan file, it creates a fresh plan and asks for approval. With a saved plan file, it carries out exactly the actions in that file. Knowing which mode you are in tells you whether there will be a prompt, whether you can pass variables, and how confident you can be that what runs is what was reviewed.",
   "In the first mode, apply runs the same steps as plan: it reads state, refreshes from providers, compares with the configuration and computes actions. It prints the plan and then stops with a prompt asking whether you want to perform these actions, noting that only `yes` will be accepted. Any other answer, including `y`, `Y` or `Yes please`, cancels the run and changes nothing. This interactive approval is your last chance to catch a surprise destroy or replacement, so it is worth reading the summary line and scanning for `-/+` and `-` before typing.",
   "`-auto-approve` skips the prompt and applies immediately. It is meant for automation where approval already happened somewhere else, such as a reviewed and merged pull request, or for disposable environments like a personal sandbox or a short-lived test stack. Using it on production from a laptop removes the safety check entirely, so treat it with care. Apply without a plan file also accepts the planning options you already know, such as `-var`, `-var-file`, `-target`, `-replace` and `-refresh-only`, because it is computing a plan as its first step. In automation, pair `-auto-approve` with `-input=false` so a missing variable makes the job fail instead of waiting forever for keyboard input, and make sure the pipeline itself enforces who may trigger the run. The flag removes a human check, so something else has to provide it.",
   "In the second mode, `terraform apply tfplan` applies a plan saved earlier with `terraform plan -out=tfplan`. There is no approval prompt, because running plan, saving the file and reviewing it is treated as the approval step. You cannot pass new variable values or planning options; they were fixed when the plan was made. If state has changed since the plan was created, for example because someone else applied in between, Terraform reports that the saved plan is stale and refuses to apply it, and you must plan again. This two-step pattern is the standard for pipelines: plan, review, then apply the reviewed file. In the opening scene, a saved plan would have either applied only the two reviewed buckets or been rejected as stale, never silently picked up the colleague's change.",
   "```text\nterraform plan -out=tfplan\nterraform show tfplan\nterraform apply tfplan\n```",
   "During apply, Terraform walks the dependency graph, creating, updating and deleting resources in order and running independent operations in parallel. After each change, it writes the result to state, so the record keeps pace with reality. Apply is not a transaction, which is a key exam point. If an error occurs part-way, changes that already succeeded remain in place, and state records them; nothing is rolled back. Fix the problem and apply again, and Terraform picks up from the current state rather than starting over. A resource whose creation partly failed, for example because a create-time provisioner errored, may be marked tainted in state and will be replaced on the next run.",
   "When apply finishes successfully it prints a completion message that counts what happened, for example `Resources: 2 added, 0 changed, 0 destroyed.`, followed by the root module's output values. Compare those counts with the plan you approved; they should match, and if they do not, find out why before anything else runs. Sensitive outputs are shown as `<sensitive>` instead of their values. You can read the outputs again later with `terraform output` without re-running apply.",
   "State locking protects apply from collisions. If the backend supports locking, Terraform acquires a lock at the start and holds it for the whole operation, so a second apply against the same state waits or fails with a lock error instead of corrupting the record. Combined with saved plans and the explicit `yes` prompt, locking gives you three layers of safety: you see what will happen, you approve exactly that, and nobody else can change the same state while it happens."
  ],
  "analogy": "Applying without a plan file is like a cashier reading your order back and waiting for a clear yes before sending it to the kitchen. Applying a saved plan is like handing over a signed order slip: the kitchen cooks exactly that, with no further questions. If the menu changed since you filled in the slip, the kitchen refuses it. Where the analogy breaks: a kitchen that drops a dish usually starts over, but Terraform keeps whatever finished successfully and continues from there on the next apply.",
  "terms": [
   [
    "terraform apply",
    "Command that carries out a plan to create, update or destroy infrastructure and records the results in state."
   ],
   [
    "Interactive approval",
    "The prompt shown by apply without a plan file; only the exact word `yes` proceeds."
   ],
   [
    "-auto-approve",
    "Skips the interactive `yes` confirmation; intended for automation with approval elsewhere or for disposable environments."
   ],
   [
    "Stale plan",
    "A saved plan whose state has changed since it was created; Terraform refuses to apply it."
   ],
   [
    "Tainted",
    "State marking for a resource that is known to be damaged, such as after a failed creation, so it will be replaced."
   ]
  ],
  "example": "A release pipeline runs `terraform plan -out=tfplan`, posts `terraform show tfplan` to a chat channel, and waits for a manual approval. Once approved, it runs `terraform apply tfplan`, which applies without prompting and exactly as reviewed. When a teammate's merge lands first, the pipeline's apply fails with a stale plan error and the team simply re-plans.",
  "mistakes": [
   [
    "Typing `y` at the apply prompt is enough to proceed.",
    "Only the exact word `yes` is accepted. Any other input cancels the apply."
   ],
   [
    "`terraform apply tfplan` still asks for confirmation.",
    "Applying a saved plan file is treated as already approved and runs without a prompt."
   ],
   [
    "You can override a variable when applying a saved plan, for example `terraform apply -var x=1 tfplan`.",
    "Variable values are fixed in the saved plan. To change them, create a new plan."
   ],
   [
    "If apply fails part-way, Terraform rolls everything back.",
    "Apply is not transactional. Completed changes stay and are recorded in state; the next apply continues from there."
   ]
  ],
  "tryit": [
   [
    "Your company wants pull requests to show a plan, a human to approve it, and then the exact reviewed changes to go live with no chance of extra changes slipping in. A junior engineer suggests running `terraform apply -auto-approve` after approval. What would you recommend instead, and why?",
    "Run `terraform plan -out=tfplan`, publish `terraform show tfplan` for review, then run `terraform apply tfplan` after approval. `-auto-approve` would compute a fresh plan that could include changes nobody reviewed; a saved plan applies only what was reviewed, or is refused as stale."
   ]
  ],
  "tip": "Applying a saved plan file does not prompt for approval and does not accept new variables. Without a plan file, apply prompts unless `-auto-approve` is used, and only the exact word `yes` proceeds. Apply is not transactional: completed changes stay in state after a failure.",
  "check": [
   [
    "Does `terraform apply tfplan` ask for confirmation?",
    "No. Applying a saved plan is treated as already approved, so it proceeds without a prompt."
   ],
   [
    "An apply fails after creating three of five resources. What happens to those three?",
    "They remain and are recorded in state; apply is not transactional, and the next apply continues from the current state."
   ],
   [
    "What happens if state changes between `terraform plan -out=tfplan` and `terraform apply tfplan`?",
    "Terraform detects that the saved plan is stale and refuses to apply it; you must create a new plan."
   ]
  ]
 },
 {
  "t": "`terraform destroy` and `terraform plan -destroy`",
  "hook": "The quarterly cloud bill at Bluewater Analytics just landed, and Ines in finance has circled a line item: dozens of test environments still running from a hackathon two months ago. The platform lead asks Sam to clean them up by the end of the day. Sam has the Terraform code for each environment, and also a vague memory that someone once deleted a state file thinking it would remove everything. Another engineer suggests running `terraform destroy` with `-target` on the production database to drop a leftover table. Which of these ideas actually removes cost safely, and which could take down something nobody meant to touch?",
  "simple": "`terraform destroy` is the off switch for everything a particular Terraform project created. It looks at its own records, lists everything it built, shows you that list and waits for you to type yes before it deletes anything. It removes things in the safe order, taking down the pieces that depend on others first, like taking books off a shelf before removing the shelf. There is also a preview-only version, `terraform plan -destroy`, that shows what would be deleted without deleting anything. Destroy only touches what Terraform itself is tracking. Things made by hand, or by a different project, are left alone, and you can protect important pieces so Terraform refuses to delete them.",
  "body": [
   "`terraform destroy` removes every object managed by the current configuration and its state. It is how you tear down a temporary environment, clean up after a lab, or retire a stack completely once it is no longer needed. Because it deletes real infrastructure, possibly including data, it follows the same safety pattern as apply: it builds a plan listing everything to be destroyed, prints it, and waits for you to type `yes`. Any other answer cancels the run and nothing is removed. Read that list carefully: once a database or storage bucket is destroyed, its data is usually gone for good unless you have backups outside Terraform.",
   "`terraform destroy` is a convenience alias for `terraform apply -destroy`, and the two behave identically. Both accept `-auto-approve` to skip the prompt, which is appropriate in automation that tears down short-lived environments. Both accept planning options such as `-var` and `-var-file`, which you may need because Terraform still has to evaluate the configuration, and required variables without defaults must have values even when the goal is deletion. Both also accept `-target`, which destroys only the targeted resource and anything that depends on it. As with ordinary planning, targeted use should be exceptional, because it leaves the rest of the configuration and state in a partial condition.",
   "`terraform plan -destroy` creates a speculative destroy plan: it shows what would be removed without removing anything. That makes it a safe way to answer questions like what exactly will disappear if we retire this stack. You can save it with `-out` and later apply it with `terraform apply FILE`, which gives destroy the same review-then-apply pattern as ordinary changes. This is especially useful in pipelines that tear down preview environments, because the logged plan becomes a record of what was removed and when.",
   "```text\nterraform plan -destroy -out=destroy.tfplan\nterraform show destroy.tfplan\nterraform apply destroy.tfplan\n```",
   "Destroy works through the dependency graph in reverse. When creating, Terraform builds the network, then the subnet, then the instance, because each depends on the one before it. When destroying, it goes the other way: the instance first, then the subnet, then the network. This avoids errors from cloud APIs that refuse to delete a network while something is still attached to it. In destroy plans every resource is shown with the `-` symbol, and the summary counts only destroys, such as `Plan: 0 to add, 0 to change, 7 to destroy.` Data sources are not destroyed, because Terraform never created them; it only reads them.",
   "Destroy only affects objects tracked in this configuration's state. Resources created by hand in a console, or managed by another configuration with its own state, are untouched. This boundary has two consequences that the exam likes to test. First, deleting a state file does not delete any infrastructure; it only makes Terraform forget about it, leaving orphaned resources that keep running and keep costing money. Second, deleting a state file is not a way to protect resources either, since the next apply would try to create everything again from scratch. If you want a single resource gone in normal work, the usual method is simply to remove its block from the configuration and run apply; the plan will show it with `-` and Terraform destroys it after approval.",
   "Protect critical objects with `lifecycle { prevent_destroy = true }` inside the resource block. Any plan that would destroy such a resource, whether it comes from `terraform destroy` or from a replacement caused by a changed argument, fails with an error instead of proceeding. To destroy the resource intentionally, someone must first remove the setting from the code, which forces a deliberate, reviewable change through version control. Note one limit: if you delete the entire resource block, the `prevent_destroy` setting goes with it, so the protection no longer applies. Many providers also offer their own deletion protection arguments on resources such as databases and load balancers, which are enforced by the cloud platform itself and act as a second safeguard.",
   "Put together, the destroy toolkit is small and consistent. Use `terraform plan -destroy` to preview, `terraform destroy` or `terraform apply -destroy` to remove a whole stack, a saved destroy plan when you want review and a record, removing a block and applying to delete one resource, and `prevent_destroy` plus provider deletion protection for anything you cannot afford to lose."
  ],
  "analogy": "Destroying a stack is like a moving crew emptying an apartment using only the inventory sheet you gave them. They take items off shelves before removing the shelves, and they ignore anything not on the sheet, even if it is in the same room. Shredding the inventory sheet does not empty the apartment; it just means the crew no longer knows what is yours. A sticker reading do not move on the piano is `prevent_destroy`: the crew stops and asks rather than carrying it out.",
  "terms": [
   [
    "terraform destroy",
    "Command that destroys all resources managed by the configuration; an alias for `terraform apply -destroy`."
   ],
   [
    "plan -destroy",
    "Creates a destroy plan to preview, and optionally save with `-out`, without destroying anything."
   ],
   [
    "Reverse dependency order",
    "Destroy removes dependents before the objects they depend on, the opposite of creation order."
   ],
   [
    "prevent_destroy",
    "Lifecycle setting that makes any plan that would destroy the resource fail with an error."
   ],
   [
    "Orphaned resource",
    "A real object that still exists but is no longer tracked in any state, for example after a state file is deleted."
   ]
  ],
  "example": "Each pull request in a web project gets a preview environment. When the pull request closes, the pipeline runs `terraform plan -destroy -out=destroy.tfplan`, logs the plan, and applies it, removing the preview's containers, DNS record and database cleanly. The shared production network, managed in a separate configuration, is untouched.",
  "mistakes": [
   [
    "Deleting the state file is a quick way to remove all the infrastructure.",
    "It removes nothing real. The resources keep running as orphans that Terraform no longer tracks, and they still cost money."
   ],
   [
    "`terraform plan -destroy` deletes resources.",
    "It only creates a destroy plan. Resources are removed only when that plan is applied or when you run `terraform destroy`."
   ],
   [
    "`terraform destroy -target` is the normal way to remove one resource.",
    "The usual method is to delete the resource block and apply. `-target` is for exceptional situations."
   ],
   [
    "`terraform destroy` also removes resources that were created by hand in the same account.",
    "Destroy only affects objects tracked in this configuration's state."
   ]
  ],
  "tryit": [
   [
    "A database resource has `prevent_destroy = true`. A teammate changes an argument that forces replacement of that database and runs plan. What happens, and what would have to change for the replacement to go ahead?",
    "The plan fails with an error because replacement requires destroying the protected resource. Someone would have to remove `prevent_destroy` from the code in a reviewed change, or revert the argument so no replacement is needed."
   ],
   [
    "A finance review finds a running cluster that nobody can find in any Terraform configuration. A colleague says running `terraform destroy` in the platform repository will clean it up. Will it?",
    "No. If the cluster is not in that configuration's state, destroy ignores it. It must be imported into a configuration, or removed through its owning tool or console, after confirming nobody needs it."
   ]
  ],
  "tip": "`terraform destroy` equals `terraform apply -destroy`. `terraform plan -destroy` only previews. To remove one resource in normal work, delete its block and apply rather than using destroy with `-target`. Destroy runs in reverse dependency order and never touches resources outside its state.",
  "check": [
   [
    "What is the difference between `terraform destroy` and `terraform plan -destroy`?",
    "Destroy (like `apply -destroy`) removes resources after approval; `plan -destroy` only shows, and can save, a destroy plan without changing anything."
   ],
   [
    "Will `terraform destroy` delete a virtual machine someone created in the console that is not in state?",
    "No. Destroy only affects objects tracked in the configuration's state."
   ],
   [
    "In what order are a network, a subnet in it, and an instance in that subnet destroyed?",
    "Instance first, then subnet, then network: the reverse of the dependency order used for creation."
   ]
  ]
 },
 {
  "t": "`terraform fmt`: canonical style, `-check`, `-diff` and `-recursive`",
  "hook": "It is Monday morning at Pinecrest Logistics, and Aisha opens a pull request review that should take two minutes. The change adds one tag to a storage bucket. The diff, however, shows 140 changed lines across six files, because the author's editor re-indented everything with tabs and shifted every equals sign. Somewhere in that noise is the one line that matters, and possibly a second change nobody mentioned. Aisha sighs and wonders why the build did not catch this before it reached her. What single command, run locally and in the pipeline, would have kept this review down to the one line that actually changed?",
  "simple": "`terraform fmt` is a tidy-up command for Terraform files. It fixes spacing and layout so every file looks the same way, the way a word processor can reformat a messy document into a consistent style. It indents lines neatly and lines up the equals signs, but it never changes what your code does, and it does not check whether the code is correct. By default it only tidies files in the folder you are in, not folders inside it, unless you ask it to go deeper. It also has a check-only mode that reports messy files without fixing them, which teams use to block untidy code from being merged.",
  "body": [
   "`terraform fmt` rewrites Terraform configuration files into the canonical format and style defined by HashiCorp. It changes whitespace and layout only: indenting nested blocks with two spaces per level, aligning the equals signs of consecutive arguments, normalizing spacing around operators and brackets, and similar adjustments. It never changes what the code means, so running it cannot alter your plan. It also does not check whether the code is valid; a file can be perfectly formatted and still reference a variable that does not exist. Checking correctness is the job of `terraform validate`.",
   "```hcl\n# before\nresource \"aws_s3_bucket\" \"logs\" {\nbucket=\"acme-logs\"\n    force_destroy = true\n}\n\n# after terraform fmt\nresource \"aws_s3_bucket\" \"logs\" {\n  bucket        = \"acme-logs\"\n  force_destroy = true\n}\n```",
   "In the example, fmt indented both arguments by two spaces, added spaces around the first equals sign, and padded `bucket` so its equals sign lines up with the one after `force_destroy`. Alignment happens for consecutive single-line arguments; a blank line or a nested block starts a new alignment group. That is why fmt output sometimes looks unevenly aligned across a whole file but consistent within each group. Running fmt a second time on the same files changes nothing, because the output is already canonical. That predictability is what makes it safe to run automatically on every save, in a pre-commit hook and in a pipeline without anyone needing to inspect the result.",
   "By default, fmt processes the `.tf` and `.tfvars` files (and Terraform test files) in the current directory only. It rewrites them in place and prints the names of the files it changed, so no output means nothing needed fixing. It does not look into subdirectories unless you add `-recursive`, which matters in repositories with module folders such as `modules/network` or environment folders such as `envs/prod`. You can also give it a specific directory or file as an argument, for example `terraform fmt modules/network`. Unlike most Terraform commands, fmt needs no `terraform init`, no providers, no credentials and no state; it works purely on the text of the files.",
   "Two options are especially useful in automation. `-check` does not modify any files; it only checks whether they are formatted, lists the files that are not, and exits with a nonzero status if any need changes. That makes it a natural continuous integration (CI) gate: the build fails until the author runs `terraform fmt` locally and commits the result. `-diff` prints the differences fmt would make, or has made, in a unified diff format, so you can see exactly which lines are involved. They are often combined, as in `terraform fmt -check -diff -recursive`, which fails the build, shows the author what to fix, and covers every module folder in one command.",
   "Why does consistent formatting matter enough to block a merge? When everyone's code is formatted the same way, diffs in pull requests show only meaningful changes, not whitespace noise, and reviewers can focus on what the change does. In the opening scene, a fmt check would have rejected the re-indented files before review, and the author's local `terraform fmt` would have restored the canonical layout, leaving a one-line diff. Formatting rules also remove style debates from code review, because the tool, not a person, decides. Many editors run `terraform fmt` automatically on save through Terraform language extensions, and teams often add it to a pre-commit hook as well.",
   "Remember the division of labor among the checking commands, which the exam frequently tests. `fmt` is about style and layout, needs no initialization and never contacts anything. `validate` is about syntax and internal consistency, such as correct argument names, types and references; it needs `terraform init` so it can load provider schemas, but it does not contact remote APIs or read remote state. `plan` is about real-world changes; it needs credentials, provider access and state. A healthy pipeline runs them in that order, cheapest first, so simple problems fail fast.",
   "A final detail: fmt fixes layout but does not do everything a linter would. It will not rename resources, reorder blocks or arguments into a preferred sequence, or warn about unused variables, deprecated syntax or provider-specific best practices. Teams that want stricter rules add separate linting tools to their pipeline alongside fmt. On the exam, if a question asks which built-in command enforces consistent style, the answer is `terraform fmt`; if it asks which catches an undeclared variable, the answer is `terraform validate`."
  ],
  "analogy": "`terraform fmt` is like the auto-format button in a word processor. It fixes indentation, spacing and alignment so every document follows the house style, but it will not correct a wrong fact or a misspelled name. `-check` is like a proofreader who only marks pages that need reformatting and hands them back, without touching them. `-recursive` is telling that proofreader to open the folders inside the folder too, not just the top-level pages.",
  "terms": [
   [
    "terraform fmt",
    "Command that rewrites configuration files into Terraform's canonical style without changing meaning."
   ],
   [
    "Canonical format",
    "HashiCorp's standard layout for Terraform files, including two-space indentation and aligned equals signs."
   ],
   [
    "-check",
    "fmt option that reports unformatted files and exits nonzero without modifying them."
   ],
   [
    "-diff",
    "fmt option that displays the formatting differences."
   ],
   [
    "-recursive",
    "fmt option that also processes files in subdirectories."
   ]
  ],
  "example": "A pipeline's first job runs `terraform fmt -check -recursive`. A contributor's pull request fails because a module in `modules/dns` has misaligned arguments. They run `terraform fmt -recursive` locally, commit, and the check passes. The reviewer then sees only the intended change.",
  "mistakes": [
   [
    "`terraform fmt` will catch a typo in a resource attribute name.",
    "fmt only fixes layout. `terraform validate` checks names, types and references."
   ],
   [
    "`terraform fmt` formats every file in the repository by default.",
    "It only processes the current or given directory. Add `-recursive` to include subdirectories."
   ],
   [
    "`terraform fmt -check` fixes the files and then reports them.",
    "`-check` never writes files. It lists unformatted files and returns a nonzero exit code."
   ],
   [
    "You must run `terraform init` before `terraform fmt`.",
    "fmt works on file text alone and needs no initialization, providers or credentials."
   ]
  ],
  "tryit": [
   [
    "Your team's repository has a root configuration plus five modules under `modules/`. You want the pipeline to fail if any file anywhere is not formatted, show the author exactly what is wrong, and never modify files on the build server. What command should the pipeline run?",
    "`terraform fmt -check -diff -recursive`. `-check` prevents writes and returns nonzero when files need formatting, `-diff` shows the required changes, and `-recursive` covers the module folders."
   ]
  ],
  "tip": "fmt only processes the current directory unless you add `-recursive`, and `-check` never writes files. fmt checks style, not correctness, and needs no init. Order of cheapness: fmt, then validate, then plan.",
  "check": [
   [
    "Which option makes `terraform fmt` suitable as a CI gate without changing files?",
    "`-check`, which lists unformatted files and returns a nonzero exit code if any exist."
   ],
   [
    "Will `terraform fmt` format files in a `modules/` subdirectory by default?",
    "No. It only processes the given or current directory unless you pass `-recursive`."
   ],
   [
    "A file is perfectly formatted but references `var.regin` instead of `var.region`. Which command reports the problem?",
    "`terraform validate`, because fmt checks only layout, not references."
   ]
  ]
 },
 {
  "t": "Resource replacement with `-replace` instead of the deprecated `terraform taint`",
  "hook": "Rosa works on the infrastructure team at Fernwood Credit Union. Last Tuesday, a teammate ran `terraform taint` on a misbehaving reporting server, then went home sick before applying. On Thursday, Rosa ran what she thought was a routine apply to add a firewall rule. The plan included a line she skimmed past, and the reporting server was destroyed and rebuilt in the middle of month-end processing. Nobody did anything forbidden, yet the result surprised everyone. Rosa now has to explain to her manager what went wrong, and propose a way to force a rebuild that nobody else can trip over days later. What should the team use instead?",
  "simple": "Sometimes a server or other resource is broken even though its settings in the code are fine, and the quickest fix is to throw it away and build a fresh copy. Terraform lets you ask for that with the `-replace` option when you plan or apply. You see the rebuild in the preview, you approve it, and it happens right then. The old way, `terraform taint`, put a sticky note on the resource in Terraform's records saying rebuild this next time. The problem was that the note stayed there until anyone at all ran the next apply, possibly days later, and that person might not expect it. The old command is now deprecated, which means it still exists but you should not use it.",
  "body": [
   "Sometimes you need Terraform to destroy and recreate a resource even though its configuration has not changed. A virtual machine may be in a bad state after a failed update, a bootstrapping script may have stopped half-way, a disk may be corrupted, or you may want to force a fresh certificate or key. In each case, the code is correct but the real object is not, so a normal plan reports no changes. You could log in and repair the object by hand, but manual fixes are slow, hard to repeat and invisible to the code. Rebuilding from configuration returns the object to a known-good state. Terraform offers the `-replace` option on plan and apply for exactly this situation.",
   "```text\nterraform plan -replace=\"aws_instance.web\"\nterraform apply -replace=\"aws_instance.web\"\n```",
   "The plan shows the resource with the replace symbol and a note that it will be replaced, as requested, so you can tell the replacement came from your option rather than a configuration change. You review it like any other plan and approve it, and Terraform replaces the object, respecting `create_before_destroy` if it is set, in which case the new object is built before the old one is destroyed. For resources created with `count` or `for_each`, target the specific instance, such as `-replace='aws_instance.web[1]'` or `-replace='aws_instance.web[\"blue\"]'`, quoting the address so your shell does not interpret the brackets and quotes. You can give `-replace` more than once in the same command to replace several instances together, and you can combine it with `-out` to save the plan for later review.",
   "Before `-replace` existed, the approach was `terraform taint ADDRESS`. Taint marked the resource as tainted directly in state, and the next plan, whenever it happened and whoever ran it, would replace it. `terraform untaint ADDRESS` removed the mark if you changed your mind. The taint command is now deprecated, and HashiCorp recommends `-replace` instead. Deprecated means the command still works for now but is discouraged and may be removed in a future release; on the exam, it is never the recommended answer.",
   "Why the change? Taint modified shared state immediately, with no plan to review first. In a team, a teammate running an unrelated apply could be surprised by the replacement, exactly as in the opening scene. The taint also persisted until someone applied, so the intent and the action were separated in time and often in person, and nobody could easily see who had asked for it or why. With `-replace`, the replacement is part of a single plan: you see it, you approve it, and nothing changes if you cancel, because the request lives only in that one command. It fits the Write, Plan, Apply workflow and works with saved plans and HCP Terraform runs, where a replace request can be attached to a specific run and reviewed by others.",
   "Tainting still happens automatically in one situation. If a resource is created but a create-time provisioner fails, or creation otherwise fails part-way, Terraform marks the object as tainted in state, because it cannot be sure the object is configured correctly. The next plan then shows that the resource will be replaced because it is tainted. You can see the status in `terraform state show ADDRESS` or in plan output. `terraform untaint` can still clear the mark if you have checked the object and are sure it is fine, which avoids an unnecessary rebuild.",
   "Keep `-replace` for real need. If you find yourself replacing the same resource often, the underlying problem, such as a fragile startup script, missing health checks or configuration drift, deserves a fix in the code. One option is the `replace_triggered_by` lifecycle argument, which tells Terraform to replace a resource automatically whenever a referenced resource or attribute changes; for example, recreating an instance whenever its launch template changes. That way, replacement becomes a predictable, reviewed outcome of a code change rather than a manual step someone has to remember.",
   "For exam purposes, the decision is straightforward. To force recreation of a healthy-looking configuration, choose `terraform apply -replace=ADDRESS` (or `plan -replace` to preview it). Recognize `terraform taint` as the deprecated predecessor, `terraform untaint` as the way to clear a tainted mark, and automatic tainting as the result of a failed create or provisioner. Whatever the method, the replacement creates a new object, so expect a new ID and any data stored only on the old object to be lost."
  ],
  "analogy": "Using `taint` was like leaving a sticky note on the office printer reading replace me, then going home. Whoever next walks past with a work order, maybe days later, ends up hauling it away without expecting to. Using `-replace` is like submitting a work order yourself that names the printer, gets signed off, and is done in one visit. If the work order is rejected, the printer stays put. The analogy holds well for the exam: the difference is about when and how visibly the change is approved.",
  "terms": [
   [
    "-replace",
    "Plan and apply option that forces a specific resource instance to be destroyed and recreated, shown in the plan for review."
   ],
   [
    "terraform taint",
    "Deprecated command that marked a resource in state for replacement on the next apply."
   ],
   [
    "terraform untaint",
    "Command that removes a tainted mark from a resource in state."
   ],
   [
    "Tainted resource",
    "A resource marked in state as damaged, usually after a failed create or provisioner, that will be replaced on the next apply."
   ],
   [
    "replace_triggered_by",
    "Lifecycle argument that replaces a resource automatically when a referenced resource or attribute changes."
   ]
  ],
  "example": "A web server's disk became corrupted after a failed update. Instead of logging in to fix it, the engineer runs `terraform apply -replace=\"aws_instance.web\"`, reviews the plan showing one replacement, types yes, and the server is rebuilt from the golden image.",
  "mistakes": [
   [
    "`terraform taint` is the recommended way to force recreation.",
    "It is deprecated. Use `terraform apply -replace=ADDRESS`, which puts the replacement in a reviewed plan."
   ],
   [
    "`-replace` takes effect later, like taint, on whoever runs the next apply.",
    "`-replace` applies only to the plan or apply where you pass it. If you cancel, nothing is recorded or changed."
   ],
   [
    "Resources only become tainted when someone runs `terraform taint`.",
    "Terraform also taints a resource automatically when creation or a create-time provisioner fails part-way."
   ],
   [
    "For a `count` resource you can just pass `-replace=aws_instance.web` to replace one instance.",
    "Name the specific instance, such as `'aws_instance.web[1]'`, and quote it for the shell."
   ]
  ],
  "tryit": [
   [
    "An apply created a virtual machine, but its create-time provisioner failed. The next plan says the machine will be replaced. You log in, confirm the software is installed correctly, and want to avoid an unnecessary rebuild. What do you do?",
    "Run `terraform untaint` on that resource address to clear the tainted mark, then plan again. The plan should no longer show a replacement. Only do this if you are confident the object is healthy."
   ],
   [
    "A team rebuilds the same autoscaling instance every time its launch template changes, using `-replace` by hand each time. What change to the code would remove the manual step?",
    "Add `lifecycle { replace_triggered_by = [...] }` on the instance, referencing the launch template, so Terraform plans the replacement automatically whenever the template changes."
   ]
  ],
  "tip": "If a question asks for the recommended way to force recreation of a resource, choose `terraform apply -replace=ADDRESS`, not `terraform taint`, which is deprecated. Automatic tainting still happens after a failed create or provisioner, and `untaint` clears it.",
  "check": [
   [
    "Why is `-replace` preferred over `terraform taint`?",
    "It makes the replacement part of a reviewed plan instead of silently modifying shared state for some later apply to act on."
   ],
   [
    "How would you force replacement of the second instance of a `count`-based resource `aws_instance.web`?",
    "`terraform apply -replace='aws_instance.web[1]'`, since count indexes start at zero."
   ],
   [
    "When does Terraform taint a resource automatically?",
    "When creation fails part-way, such as when a create-time provisioner fails; the next plan then replaces it."
   ]
  ]
 },
 {
  "t": "Parallelism and the dependency graph during apply",
  "hook": "Kenji at Northgate Media is rolling out 200 DNS records for a new set of regional sites. The apply starts briskly, then the log fills with errors: the DNS provider is throttling requests, too many at once. A few records were created, most were not, and the run ends with a long list of failures. His teammate suggests reordering the resource blocks in the file so the records go out more slowly. Another suggests adding `depends_on` chains between every record. Kenji suspects both ideas misunderstand how Terraform decides what runs when. What actually controls order, what controls speed, and which knob should he turn?",
  "simple": "Terraform does not work through your files from top to bottom. Instead, it figures out which things depend on which, like a recipe where you must boil water before adding pasta, but can chop vegetables at the same time. Anything that does not have to wait can happen at once, and by default Terraform will do up to ten things at the same time. You can turn that number up to go faster, or down to be gentler on a service that complains when it gets too many requests. Changing the number only changes how many things happen at once. It never changes the rule that the water must boil before the pasta goes in.",
  "body": [
   "Terraform does not process resources one at a time in file order. Moving a block to the top of a file, or splitting configuration across files, has no effect on when it is created. Instead, Terraform builds a dependency graph: a directed acyclic graph, meaning a graph whose connections have a direction and contain no loops. Each node is a resource, data source, provider, variable, output or similar object, and each edge means one node must be handled before another. Edges come from references between blocks, such as a subnet using `aws_vpc.main.id`, and from explicit `depends_on` arguments when a dependency cannot be expressed through a reference.",
   "When you plan or apply, Terraform walks this graph. Any node whose dependencies are complete can start right away. Resources that do not depend on each other, such as ten unrelated storage buckets, can be created at the same time. Resources on a chain, such as network then subnet then instance, happen in sequence, because each one needs an attribute, like an ID, that only exists once the previous one is created. During destroy, the graph is walked in reverse, so dependents are removed before the things they depend on: the instance goes first and the network last.",
   "Terraform limits how many operations run at once. By default it performs up to 10 concurrent operations. You can change this with `-parallelism=n` on plan, apply and destroy. Raising it can speed up large configurations with many independent resources, since more of them can be in progress at the same time. Lowering it, even to `-parallelism=1`, can help in three common situations: when a provider's application programming interface (API) enforces rate limits and starts throttling requests; when debugging, so you can watch operations happen one at a time in the log; or when the machine running Terraform is short on memory or network capacity. The setting controls concurrency only. It never changes the order required by dependencies, and it never makes a resource wait for something it does not depend on.",
   "```text\nterraform apply -parallelism=4\nterraform graph | dot -Tsvg > graph.svg\n```",
   "`terraform graph` prints the dependency graph in the DOT language, a plain-text format for describing graphs. Tools such as Graphviz can render that output as a picture, as in the second command above. It is a handy way to understand why Terraform orders things as it does, to confirm that a dependency you expected actually exists, or to spot an unexpected one that is slowing a run by forcing resources into sequence. For large configurations the picture can be busy, but even a quick look at one module's graph often explains a puzzling plan.",
   "Failures interact with the graph in a predictable way. If an operation fails during apply, Terraform stops starting new operations that depend on it, lets operations already in progress finish, and records everything that succeeded in state. Independent branches of the graph may also complete. The errors are reported together at the end of the run. That is why an apply can leave some resources created and others not, and why the next apply simply continues from the recorded state rather than starting over. In the opening scene, Kenji's created records are safely in state; once he lowers parallelism, the next apply only needs to create the remaining ones.",
   "Cycles are not allowed. If resource A references B and B references A, directly or through a chain of other resources, the graph has a loop and cannot be ordered. Terraform reports a cycle error during plan and lists the objects involved. The fix is to restructure the configuration so the dependency runs one way. A classic example is two security groups whose inline rules reference each other; moving the rules into separate rule resources lets both groups be created first and the rules afterward. Adding `depends_on` cannot fix a cycle, and adding it carelessly can create one.",
   "Returning to the opening questions: reordering blocks in a file would do nothing, and chaining every record with `depends_on` would technically slow things down but would clutter the code and misstate real relationships. The right tool for a rate-limited API is `-parallelism`, which limits how many requests are in flight without pretending that DNS records depend on each other. Order comes from the graph; speed comes from parallelism."
  ],
  "analogy": "The dependency graph is like a recipe card with arrows: boil water before adding pasta, but chop vegetables and grate cheese whenever you like. Parallelism is the number of cooks in the kitchen. More cooks finish independent tasks sooner, and one cook works slowly but calmly. No number of cooks lets the pasta go in before the water boils. Where it stops: real cooks can improvise around a missing step, but Terraform refuses to cook at all if the arrows form a loop.",
  "terms": [
   [
    "Dependency graph",
    "Directed acyclic graph of configuration objects that Terraform uses to order operations."
   ],
   [
    "Implicit dependency",
    "An edge in the graph created automatically when one block references another's attributes."
   ],
   [
    "-parallelism",
    "Option setting the maximum number of concurrent operations during plan, apply or destroy; the default is 10."
   ],
   [
    "terraform graph",
    "Command that outputs the dependency graph in DOT format for visualization."
   ],
   [
    "Cycle",
    "A circular dependency between objects that makes the graph impossible to order; Terraform reports it as an error."
   ]
  ],
  "example": "An apply creating 200 DNS records keeps failing with throttling errors from the DNS provider's API. Running `terraform apply -parallelism=2` spreads the requests out so the provider no longer throttles them, at the cost of a slower run. The records created by the earlier failed run are already in state and are not recreated.",
  "mistakes": [
   [
    "Terraform creates resources in the order they appear in the files.",
    "Order comes only from the dependency graph: references and `depends_on`. File and block order do not matter."
   ],
   [
    "`-parallelism=1` changes the order in which resources are created.",
    "It only limits concurrency to one operation at a time. The order is still whatever the graph requires."
   ],
   [
    "The default parallelism is unlimited, so Terraform runs everything at once.",
    "The default is 10 concurrent operations."
   ],
   [
    "Adding `depends_on` is the way to fix a cycle error.",
    "A cycle must be broken by restructuring, such as moving inline rules into separate resources. Extra `depends_on` cannot fix it and can cause one."
   ]
  ],
  "tryit": [
   [
    "A configuration creates 300 independent storage buckets and takes a long time. The cloud API has generous limits and the build machine has plenty of capacity. A colleague wants to speed it up by adding `depends_on` between buckets in batches. What would you suggest instead?",
    "Raise concurrency with `-parallelism`, for example `terraform apply -parallelism=30`. The buckets are independent, so more can run at once. `depends_on` would force sequencing and make the run slower, not faster."
   ]
  ],
  "tip": "Parallelism defaults to 10 and changes how many operations run at once, never the order. Order comes from the graph: implicit references plus `depends_on`, reversed for destroy. `terraform graph` outputs DOT for visualization, and cycles are errors fixed by restructuring.",
  "check": [
   [
    "What decides the order in which Terraform creates resources?",
    "The dependency graph built from references and `depends_on`; independent resources may be created concurrently."
   ],
   [
    "Why might you lower `-parallelism`?",
    "To avoid API rate limits or throttling, to simplify debugging, or to reduce load on the machine running Terraform."
   ],
   [
    "What is the default value of `-parallelism`?",
    "10 concurrent operations."
   ]
  ]
 },
 {
  "t": "Resource blocks vs data blocks, and addressing them (`TYPE.NAME`, `data.TYPE.NAME`)",
  "hook": "Tomas just joined the cloud team at Silverlake Insurance. His first task: launch a reporting server inside the shared network that the networking team built and manages in their own Terraform project. He copies the network's ID from the console into his code, and the plan works. A senior engineer stops him in review. The ID is different in every region, she says, and if you write a resource block for that network instead, you might end up trying to manage something another team owns. Tomas has two kinds of blocks to choose from and a reference syntax he keeps getting wrong. Which block fits, and how does he point at it correctly?",
  "simple": "Terraform code is mostly made of two kinds of blocks. A resource block says build this and look after it: Terraform creates it, changes it when you edit the code, and deletes it when you remove the block. A data block says go and look this up: it reads details about something that already exists, such as the newest approved server image, but never changes or deletes it. It is like the difference between building a shed in your yard and checking the address of the hardware store. To use either one elsewhere in your code, you write its address: the type and name for a resource, and the same with `data.` in front for a lookup.",
  "body": [
   "Terraform configurations are built mostly from two kinds of blocks that come from providers. A `resource` block declares an infrastructure object that Terraform manages: it creates the object, updates it when the arguments change, and destroys it when the block is removed. A `data` block declares a data source: a read-only query for information about something that already exists, which Terraform reads but never creates, changes or destroys. The distinction is about ownership. A resource puts the object's whole lifecycle in Terraform's hands; a data source only borrows information.",
   "```hcl\ndata \"aws_ami\" \"ubuntu\" {\n  most_recent = true\n  owners      = [\"099720109477\"]\n  filter {\n    name   = \"name\"\n    values = [\"ubuntu/images/*-amd64-server-*\"]\n  }\n}\n\nresource \"aws_instance\" \"web\" {\n  ami           = data.aws_ami.ubuntu.id\n  instance_type = \"t3.micro\"\n}\n```",
   "Both kinds of block have two labels. The first is the type, which comes from the provider, such as `aws_instance` or `aws_ami`; the prefix before the first underscore usually names the provider. The second is a local name that you choose, such as `web` or `ubuntu`. The combination of type and name must be unique within a module for each mode, so you can have a resource `aws_vpc.main` and a data source `data.aws_vpc.main` in the same module, but not two resources both called `aws_vpc.main`. The type determines which arguments are allowed, as documented by the provider. The name is only for referring to the block elsewhere in your code; it appears in plan output and in state, but it is not sent to the cloud as the object's name.",
   "Addresses are how you refer to these blocks. A managed resource is addressed as `TYPE.NAME`, such as `aws_instance.web`, and its attributes as `aws_instance.web.id` or `aws_instance.web.public_ip`. A data source always carries the `data.` prefix: `data.TYPE.NAME`, such as `data.aws_ami.ubuntu`, with attributes like `data.aws_ami.ubuntu.id`. Forgetting the `data.` prefix is a common error. Writing `aws_ami.ubuntu.id` makes Terraform look for a managed resource with that address, and `terraform validate` reports a reference to an undeclared resource.",
   "Addresses grow when you use modules and multiple instances. A resource inside a module called `network` is `module.network.aws_vpc.main`, and a data source in that module is `module.network.data.aws_vpc.main`. A resource with `count` has instances such as `aws_instance.web[0]` and `aws_instance.web[1]`, numbered from zero, and one with `for_each` has instances keyed by string, such as `aws_instance.web[\"blue\"]`. You use these full addresses with commands such as `terraform state show`, `terraform state list`, `-target` and `-replace`, so being fluent with them pays off well beyond writing references.",
   "When are data sources read? Normally during planning, so their results are available to compute the plan; the AMI lookup above happens before Terraform decides what the instance will look like. If a data source's arguments depend on values that are not known until apply, such as the ID of a resource about to be created, Terraform defers reading it until apply time. The plan shows it with the `<=` read symbol and its attributes as `(known after apply)`. Data sources are read again on every plan, so they always reflect current reality, and their latest results are also recorded in state. That is why `terraform state list` shows entries such as `data.aws_ami.ubuntu` alongside managed resources. Data blocks also accept meta-arguments such as `count`, `for_each` and `depends_on`, so a single block can look up several existing objects at once.",
   "Choosing between the two is usually simple once you ask who owns the object. If Terraform, in this configuration, should create and manage it, use a resource. If something else owns it, such as another team's network, a vendor-published machine image, a secret stored by a security team, or the identity of the current account, use a data source to look it up rather than hard-coding IDs. Hard-coded IDs break when you deploy to another account or region and silently go stale when the underlying object is rebuilt; lookups keep configurations portable. Writing a resource block for something another team manages is worse: it either fails because the object already exists, or, if imported, gives two configurations conflicting claims on one object.",
   "Finally, remember how destroy treats each kind. `terraform destroy` removes managed resources, in reverse dependency order, but simply stops reading data sources. The shared network, the published image and the account itself are untouched, because Terraform never created them. If you later decide this configuration should own one of those objects after all, the path is not to change `data` to `resource` and apply, which would try to create a duplicate. Instead, write a resource block and bring the existing object under management with an import, so Terraform records it in state without rebuilding it."
  ],
  "analogy": "A resource block is like a pet you adopt: you feed it, take it to the vet, and are responsible when it is gone. A data block is like looking up a neighbor's phone number in the directory: you use the information, but the neighbor is not yours to change or remove. The `data.` prefix is the directory label that reminds Terraform which is which. The analogy is loose on one point: Terraform rereads the directory on every plan, so the number is always current.",
  "terms": [
   [
    "Resource block",
    "Declares an infrastructure object that Terraform creates, updates and destroys."
   ],
   [
    "Data block (data source)",
    "Declares a read-only lookup of existing information that Terraform reads but does not manage."
   ],
   [
    "Resource address",
    "The reference form `TYPE.NAME` for resources and `data.TYPE.NAME` for data sources, extended with module paths and instance keys."
   ],
   [
    "Local name",
    "The second label of a resource or data block, chosen by you and unique per type within a module."
   ],
   [
    "Instance key",
    "The index or key that identifies one instance of a `count` resource (`[0]`) or `for_each` resource (`[\"blue\"]`)."
   ]
  ],
  "example": "Instead of hard-coding a machine image ID that differs in every region, a configuration uses `data \"aws_ami\" \"ubuntu\"` to look up the latest approved image, and the instance references `data.aws_ami.ubuntu.id`. Deploying to a new region needs no code change.",
  "mistakes": [
   [
    "A data source can be referenced as `TYPE.NAME`, the same as a resource.",
    "Data sources always need the `data.` prefix, as in `data.aws_ami.ubuntu.id`. Without it, validate reports an undeclared resource."
   ],
   [
    "`terraform destroy` deletes the objects that data sources look up.",
    "Data sources are read-only. Destroy never removes the objects they describe."
   ],
   [
    "To use another team's network, write a resource block for it.",
    "Use a data source. A resource block claims ownership and can fail or conflict with the owning configuration."
   ],
   [
    "The local name in a resource block becomes the object's name in the cloud.",
    "The local name is only a reference inside Terraform. The cloud name, if any, is set by an argument such as `name` or a tag."
   ]
  ],
  "tryit": [
   [
    "Your application stack must place instances in subnets owned by the networking team, who manage them in their own configuration. The subnet IDs differ between staging and production accounts. How should your configuration get the subnet IDs, and how would you reference one?",
    "Use a data source such as `data \"aws_subnet\" \"app\"` with a filter on tags or name, and reference it as `data.aws_subnet.app.id`. That avoids hard-coding IDs per account and does not claim ownership of the networking team's subnets."
   ]
  ],
  "tip": "Data sources are addressed with the `data.` prefix and are never destroyed by Terraform. If an exam question asks how to use an existing object that Terraform should not manage, the answer is a data source. Instances use `[0]` for `count` and `[\"key\"]` for `for_each`.",
  "check": [
   [
    "How do you reference the `id` attribute of a data source `aws_vpc` named `shared`?",
    "`data.aws_vpc.shared.id`."
   ],
   [
    "What happens to a data source when you run `terraform destroy`?",
    "Nothing on the real system; Terraform only reads data sources, so there is nothing to destroy."
   ],
   [
    "What is the full address of resource `aws_vpc.main` inside a module called `network`?",
    "`module.network.aws_vpc.main`."
   ]
  ]
 },
 {
  "t": "Cross-resource references and implicit dependencies",
  "hook": "Lena is pairing with a new hire, Omar, at Driftwood Outfitters. He has written a network, a subnet and a web server in three files, and he is worried. The server file sorts first alphabetically, so surely Terraform will try to build the server before the network exists and fail. He wants to rename the files with number prefixes, or add `depends_on` to every block just to be safe. Lena smiles and asks him to run the plan as it is. It works perfectly, with the network first and the server last. How did Terraform know the order when nobody told it, and when would Omar actually need to say more?",
  "simple": "In Terraform you connect pieces by pointing one at another. When the subnet's settings say use the ID of that network, you have written a reference. Terraform reads those pointers and works out the order by itself: the network has to exist before the subnet can use its ID, so the network goes first. This is called an implicit dependency, meaning a dependency Terraform figures out without being told. It is like a group project where Sam cannot start the slides until Ana sends the chart: nobody needs a schedule, because the handoff itself sets the order. You only need to spell out an order when two pieces depend on each other in a way the code does not show.",
  "body": [
   "Resources rarely stand alone. A subnet belongs to a network, an instance sits in a subnet, a DNS record points at a load balancer, and a security group rule refers to a security group. In Terraform you connect them with references: expressions that use another object's attributes as argument values. References are what turn a pile of separate blocks into a working system, and they also drive how Terraform orders its work.",
   "```hcl\nresource \"aws_vpc\" \"main\" {\n  cidr_block = \"10.0.0.0/16\"\n}\n\nresource \"aws_subnet\" \"app\" {\n  vpc_id     = aws_vpc.main.id\n  cidr_block = \"10.0.1.0/24\"\n}\n\nresource \"aws_instance\" \"web\" {\n  subnet_id     = aws_subnet.app.id\n  ami           = var.ami_id\n  instance_type = \"t3.micro\"\n}\n```",
   "Terraform has a small set of reference forms worth knowing by heart. `TYPE.NAME.ATTRIBUTE` refers to a resource, such as `aws_vpc.main.id`. `data.TYPE.NAME.ATTRIBUTE` refers to a data source. `var.NAME` refers to an input variable and `local.NAME` to a local value. `module.NAME.OUTPUT` refers to an output of a child module. `path.module`, `path.root` and `terraform.workspace` give filesystem and workspace information. You can reference both the arguments you set and the attributes the provider computes, such as `id`, `arn` or `public_ip`; the provider documentation lists both, usually under argument reference and attribute reference.",
   "Every reference to another resource or data source creates an implicit dependency. In the example, Terraform sees that the subnet uses `aws_vpc.main.id`, so the network must exist before the subnet can be created. The instance references the subnet, so it waits for the subnet. You never state the order; Terraform infers it and builds the dependency graph from these edges. Where the code is laid out, which file a block is in, and the order of blocks within a file make no difference. Resources with no references between them are free to be created in parallel, up to the parallelism limit. References to variables and locals also become edges in the graph, but they do not involve waiting for anything to be created.",
   "Implicit dependencies also explain the `(known after apply)` annotation in plans. The network's ID does not exist until the provider creates it, so during planning the subnet's `vpc_id` is unknown. Terraform carries the unknown value forward, shows it in the plan as known after apply, and fills it in during apply once the network is created. Anything computed from that value, such as a tag built from the ID, is unknown too. For destroy, the same edges are used in reverse: the instance goes first, then the subnet, then the network, so no cloud API refuses a delete because something is still attached.",
   "Prefer implicit dependencies wherever possible. They are precise, because Terraform knows exactly which attribute is needed, and they document themselves in the code: a reader can see why the subnet depends on the network just by reading `vpc_id = aws_vpc.main.id`. Explicit `depends_on` is needed only when a dependency exists that no attribute reference expresses. A typical case is an application inside a virtual machine that needs a permissions policy to exist before it starts, even though the instance's arguments never mention the policy. That is covered in a later lesson. Adding `depends_on` everywhere just to be safe makes plans more conservative, can force data sources that depend on changing resources to wait until apply before they are read, and hides the real relationships. Reviewers then have to guess which ordering is genuinely required and which was added out of caution, and future cleanups become riskier.",
   "A reference is also a contract between blocks. If you rename a resource, for example from `aws_instance.web` to `aws_instance.frontend`, every expression referring to it must change too, or validate will report references to an undeclared resource. Terraform also tracks objects by address in state, so a rename on its own looks like destroying the old object and creating a new one. Use a `moved` block, with `from` set to the old address and `to` set to the new one, to tell Terraform it is the same object so it updates state instead of replacing the real resource.",
   "Back to the opening scene: Omar's plan worked because the subnet referenced the network and the server referenced the subnet. File names were irrelevant, and adding `depends_on` would only have added noise. He would need more only when a real dependency is invisible in the arguments. As a habit, whenever you find yourself copying an ID, address or name from one resource into another by hand, stop and replace it with a reference. You gain correct ordering, a value that stays accurate when the object is rebuilt, and code that explains itself."
  ],
  "analogy": "References work like a relay race. The second runner cannot start until the baton, the network's ID, is in hand, so nobody needs a printed schedule; the handoff itself sets the order. Runners in separate lanes, with no baton between them, run at the same time. Where the analogy stops: in Terraform the baton can be promised before it exists, which is what `(known after apply)` means during planning.",
  "terms": [
   [
    "Reference",
    "An expression that uses a value from another object, such as `aws_vpc.main.id`, `var.region` or `module.network.subnet_ids`."
   ],
   [
    "Implicit dependency",
    "An ordering relationship Terraform infers automatically from a reference between objects."
   ],
   [
    "Explicit dependency",
    "An ordering relationship declared with `depends_on` when no attribute reference expresses it."
   ],
   [
    "Computed attribute",
    "An attribute set by the provider after creation, such as an ID, often shown as known after apply."
   ],
   [
    "moved block",
    "A block that tells Terraform a resource's address changed so it updates state instead of replacing the object."
   ]
  ],
  "example": "An engineer adds a security group and sets `vpc_security_group_ids = [aws_security_group.web.id]` on an existing instance. The plan creates the security group first and then updates the instance, without any explicit ordering, because the reference created a dependency.",
  "mistakes": [
   [
    "Terraform builds resources in the order of the files or blocks.",
    "Order comes from references and `depends_on`. File names and block positions make no difference."
   ],
   [
    "You should add `depends_on` to every resource to guarantee order.",
    "References already create dependencies. `depends_on` is only for dependencies no reference expresses, and overusing it makes plans more conservative and harder to read."
   ],
   [
    "`(known after apply)` means Terraform could not find the value and something is broken.",
    "It means the value is computed by the provider during apply, typically an ID from a resource being created in the same run."
   ],
   [
    "Renaming a resource in code just renames it in Terraform's records.",
    "Without a `moved` block, Terraform plans to destroy the old address and create a new one."
   ]
  ],
  "tryit": [
   [
    "You add a DNS record that should point at a new load balancer's DNS name. A colleague suggests writing the record with the hostname typed in by hand after the load balancer is created, plus a `depends_on`. What is a better approach, and why?",
    "Reference the load balancer's attribute directly, such as setting the record's value to `aws_lb.web.dns_name`. That creates the dependency automatically, uses the real value even if it changes, and needs no `depends_on` or hard-coded hostname."
   ],
   [
    "A teammate renames `aws_s3_bucket.logs` to `aws_s3_bucket.audit_logs` in code, and the plan now shows one bucket to destroy and one to create. The bucket holds years of logs. What should she do?",
    "Add a `moved` block with `from = aws_s3_bucket.logs` and `to = aws_s3_bucket.audit_logs`, and update any references. The plan will then show the move in state with no destroy or create."
   ]
  ],
  "tip": "Terraform orders operations using references, not file order. If a question asks how Terraform knows to create the network before the subnet, the answer is the implicit dependency from `aws_vpc.main.id`. Use `depends_on` only for dependencies no reference can express.",
  "check": [
   [
    "What creates an implicit dependency between two resources?",
    "One resource's argument referencing the other's attributes, such as `vpc_id = aws_vpc.main.id`."
   ],
   [
    "Why does a subnet's `vpc_id` show `(known after apply)` when the network is new?",
    "The network's ID is only assigned by the provider when it is created during apply, so it is unknown at plan time."
   ],
   [
    "How do you refer to an output called `subnet_ids` from a child module named `network`?",
    "`module.network.subnet_ids`."
   ]
  ]
 },
 {
  "t": "Input variables: `type`, `default`, `description`, `sensitive`, `nullable`, and value precedence (TF_VAR_, tfvars, auto.tfvars, -var)",
  "hook": "Nadia's pipeline at Brightwater Energy just deployed the staging environment into the wrong region. The pipeline sets `TF_VAR_region` to one region, the repository has a `terraform.tfvars` with another, a file called `zz-local.auto.tfvars` someone forgot to delete has a third, and the job runs `terraform plan -var-file=staging.tfvars`. Four sources, one variable, and nobody on the team can say for certain which one won. The incident review is at 3 p.m., and Nadia needs to explain exactly how Terraform chose the region, and how to stop a database password from showing up in the job log while she is at it. Which value wins, and why?",
  "simple": "Input variables are the settings you can change without editing the main code, like choosing the size and color when you order a shirt. Each variable can say what kind of value it accepts, offer a default, carry a short description, and be marked as secret so Terraform hides it on screen. Because you can supply a value in several places, such as an environment setting, a settings file, or the command you type, Terraform needs a rule for who wins. The rule is simple: the more specific and the later the source, the higher its priority, and anything typed on the command line beats everything else. Marking a value secret hides it from the screen, but it is still saved in Terraform's records.",
  "body": [
   "Input variables are a module's parameters. They let the same code serve different environments, regions or teams without editing it, which is one of the main ways infrastructure as code stays reusable. You declare each one with a `variable` block and refer to it inside the module as `var.NAME`. The block name is the variable's name, and everything inside the block describes how values are accepted, documented and displayed.",
   "```hcl\nvariable \"instance_count\" {\n  type        = number\n  default     = 2\n  description = \"Number of web servers to run.\"\n  nullable    = false\n\n  validation {\n    condition     = var.instance_count > 0\n    error_message = \"instance_count must be at least 1.\"\n  }\n}\n\nvariable \"db_password\" {\n  type      = string\n  sensitive = true\n}\n```",
   "Each argument has a specific job, and all of them are optional; an empty `variable \"name\" {}` block is valid and simply declares a required variable that accepts any type. `type` constrains which values are accepted, such as `string`, `number`, `bool` or complex types like `list(string)`, `map(string)` and `object({...})`; Terraform converts compatible values, such as the string `\"3\"` to the number 3, and rejects incompatible ones with an error. `default` supplies a value when none is given, which makes the variable optional; a variable with no default is required. `description` documents the purpose for users and for generated module documentation. `sensitive = true` redacts the value in plan and apply output, showing `(sensitive value)` instead, and anything derived from it is treated as sensitive too. It does not keep the value out of state, so state must still be protected. `nullable` controls whether `null` is an acceptable value; it defaults to true. With `nullable = false`, a caller that passes `null` gets the default instead, or an error if there is no default. A `validation` block adds custom rules with a helpful error message, checked before any infrastructure changes. Newer versions of Terraform also support `ephemeral = true` for values that must never be persisted in state or plan files.",
   "Values can be provided in several ways, and when the same variable is set in more than one place, Terraform uses a fixed precedence. Knowing this order matters because Terraform does not warn you when one source overrides another; it silently uses the winning value, and the only clue may be an unexpected change in the plan. From lowest to highest, later sources override earlier ones:",
   "```text\n1. Environment variables named TF_VAR_<name>, e.g. TF_VAR_region=us-east-1\n2. terraform.tfvars, if present\n3. terraform.tfvars.json, if present\n4. *.auto.tfvars and *.auto.tfvars.json files, in lexical order of filename\n5. -var and -var-file options on the command line, in the order given\n```",
   "A few details make this list work in practice. Only `terraform.tfvars`, `terraform.tfvars.json` and files ending in `.auto.tfvars` or `.auto.tfvars.json` are loaded automatically from the root module directory. Any other file, such as `prod.tfvars` or `staging.tfvars`, must be passed with `-var-file`, and then it takes command-line precedence. Among auto files, lexical order means `b.auto.tfvars` overrides `a.auto.tfvars`, so a leftover file whose name sorts late can quietly win. Within the command line, the last `-var` or `-var-file` that sets a variable wins. If a required variable has no value from any source, Terraform prompts for it interactively, or fails if run with `-input=false`. Defaults are used only when no source provides a value at all, which is why a default is best thought of as a fallback rather than a recommendation. In the opening scene, if `staging.tfvars` sets the region, it wins because it was passed on the command line; if it does not, `zz-local.auto.tfvars` wins over both `terraform.tfvars` and the environment variable.",
   "In HCP Terraform, workspace variables can also supply values; they are sent as Terraform variables or environment variables for each run, and variables can be marked sensitive in the workspace so they cannot be read back. For secrets in any setup, prefer environment variables or a secrets manager over committing `.tfvars` files containing passwords, mark those variables sensitive so they do not appear in logs, and remember that the values will still land in state.",
   "Precedence applies only to the root module, which surprises many people the first time they build reusable modules. For child modules, variables are set as arguments in the `module` block, such as `instance_count = 3`, and none of the sources above apply to them directly. Only the root module reads tfvars files and `TF_VAR_` variables. To pass a value from the command line into a child module, declare a variable in the root module and forward it as a module argument. This keeps modules predictable: a child module's behavior depends only on what its caller passes in, never on stray files or environment settings, which is exactly what makes a module safe to reuse across many projects."
  ],
  "analogy": "Variable precedence works like layers of instructions for a house-sitter. A note on the fridge (environment variables) is the general rule, a printed guide on the counter (`terraform.tfvars`) overrides it, sticky notes added later (`*.auto.tfvars`) override the guide, and a phone call on the day (`-var`) overrides everything. The last voice heard wins. Where the analogy stops: a house-sitter can use judgment, but Terraform follows the order mechanically, even when a forgotten sticky note is wrong.",
  "mnemonic": "Precedence from lowest to highest: \"Every Tidy Team Automates Commands\" for Environment (`TF_VAR_`), `terraform.tfvars`, `terraform.tfvars.json`, `*.auto.tfvars`, Command line (`-var` and `-var-file`).",
  "terms": [
   [
    "Input variable",
    "A module parameter declared with a `variable` block and referenced as `var.NAME`."
   ],
   [
    "TF_VAR_ environment variable",
    "An environment variable named `TF_VAR_<name>` that sets a root module variable; lowest precedence."
   ],
   [
    "terraform.tfvars",
    "Variable definitions file that Terraform loads automatically from the root module directory."
   ],
   [
    "*.auto.tfvars",
    "Variable files loaded automatically in lexical filename order, after `terraform.tfvars` and `terraform.tfvars.json`."
   ],
   [
    "nullable",
    "Variable setting (default true) controlling whether `null` is accepted; when false, null is replaced by the default."
   ],
   [
    "sensitive",
    "Variable setting that redacts the value in CLI output but does not keep it out of state."
   ]
  ],
  "example": "A pipeline sets `TF_VAR_region=us-east-1` in its environment, the repository has `terraform.tfvars` with `region = \"eu-west-1\"`, and the engineer runs `terraform plan -var region=ap-south-1`. Terraform uses `ap-south-1`, because command-line values have the highest precedence.",
  "mistakes": [
   [
    "`TF_VAR_` environment variables override files, because the environment is set last.",
    "Environment variables have the lowest precedence. Any tfvars file or command-line value overrides them."
   ],
   [
    "`prod.tfvars` in the root directory is loaded automatically.",
    "Only `terraform.tfvars`, `terraform.tfvars.json` and `*.auto.tfvars(.json)` load automatically. Others need `-var-file`."
   ],
   [
    "`sensitive = true` keeps a password out of the state file.",
    "It only redacts the value in CLI output. The value is still stored in state, so protect state."
   ],
   [
    "A child module reads `TF_VAR_` variables and tfvars files for its own variables.",
    "Only the root module does. Child module variables are set as arguments in the `module` block."
   ]
  ],
  "tryit": [
   [
    "A root module directory contains `terraform.tfvars` (`size = \"small\"`), `a.auto.tfvars` (`size = \"medium\"`) and `b.auto.tfvars` (`size = \"large\"`). The environment has `TF_VAR_size=tiny`. You run `terraform plan` with no options. Which value is used?",
    "`large`. Auto files override `terraform.tfvars` and the environment variable, and among auto files the one later in lexical order, `b.auto.tfvars`, wins."
   ],
   [
    "Your team wants a variable `environment` that must be one of `dev`, `staging` or `prod`, so a typo fails before anything is deployed. How would you enforce that?",
    "Add a `validation` block with a condition such as `contains([\"dev\", \"staging\", \"prod\"], var.environment)` and a clear `error_message`. Terraform checks it before planning any changes."
   ]
  ],
  "tip": "Precedence from low to high: TF_VAR_ environment variables, terraform.tfvars, terraform.tfvars.json, *.auto.tfvars in lexical order, then -var and -var-file. Files not named with those patterns load only through -var-file. `sensitive` hides output but not state.",
  "check": [
   [
    "If `region` is set both in `terraform.tfvars` and in `override.auto.tfvars`, which wins?",
    "`override.auto.tfvars`, because `*.auto.tfvars` files are loaded after `terraform.tfvars` and take precedence."
   ],
   [
    "What happens when a variable has no default and no value is provided?",
    "Terraform prompts for it interactively, or errors if input is disabled with `-input=false`."
   ],
   [
    "Does `sensitive = true` keep a variable's value out of the state file?",
    "No. It only redacts it in CLI output; the value may still be stored in state."
   ],
   [
    "With `nullable = false` and a default of 2, what value does the module see if the caller passes `null`?",
    "2. The default replaces the null value."
   ]
  ]
 },
 {
  "t": "Output values and local values",
  "hook": "At Maple Grove Transit, the networking team's Terraform stack builds the shared network, and the application team needs its private subnet IDs. Right now someone copies them from the console into a wiki page, and last month a stale ID on that page broke a deployment. Meanwhile, Jordan on the application team has the same five tags pasted into forty resource blocks, and two of them have a typo in the cost center. During a planning meeting, the team lead sketches a fix on the whiteboard using two Terraform features with very similar names. Which one shares values out of a stack, which one keeps a stack tidy inside, and why does the spelling trip people up?",
  "simple": "Output values and local values both give a name to a value, but they point in different directions. An output is like the label on the outside of a box: it tells people outside what useful thing is inside, such as a server's address, so other code or people can use it. A local is like a sticky note you keep on your own desk: a shortcut name for something you use over and over inside your own work, such as a standard set of labels, and nobody outside can change it. Outputs are how a piece of Terraform code hands results to whoever uses it. Locals keep the inside of that code shorter and more consistent.",
  "body": [
   "Output values and local values both give names to expressions, but they face in different directions. Outputs expose values from a module to whoever uses it, whether that is a person reading the terminal, a parent module, or another configuration. Locals name intermediate values inside a module to avoid repetition, and they cannot be set from outside. Keeping that direction in mind answers most exam questions about them. Neither one creates infrastructure; both simply give a useful name to a value that already exists in your configuration or state.",
   "```hcl\noutput \"web_ip\" {\n  value       = aws_instance.web.public_ip\n  description = \"Public IP of the web server.\"\n}\n\noutput \"db_password\" {\n  value     = random_password.db.result\n  sensitive = true\n}\n```",
   "An `output` block needs a `value`, and can also have a `description`, `sensitive`, a `depends_on` for rare hidden dependencies, and `precondition` checks that fail the run if an assumption about the value is broken. In the root module, outputs are printed at the end of `terraform apply` and stored in state. You can read them later without re-running apply: `terraform output` lists all of them, `terraform output web_ip` shows one, `terraform output -raw web_ip` prints the raw string without quotes, which is handy in shell scripts, and `terraform output -json` prints all of them as JSON for other tools. Sensitive outputs are shown as `<sensitive>` in the apply summary and in the plain `terraform output` listing. However, `terraform output -raw` and `-json` print them in plain text, because the value itself is stored in state. Marking an output sensitive protects it from casual display, not from anyone who can read state.",
   "In a child module, outputs are the only way to pass values back to the calling module. If a module called `network` declares `output \"subnet_ids\"`, the root module uses `module.network.subnet_ids`. Anything not exported as an output is invisible outside the module, even if it is a resource attribute the caller would like to use, so module authors must decide deliberately what to expose. Note also that child module outputs are not printed at the end of apply; only root module outputs are. To show a child value in the terminal, the root module must declare its own output that passes it through.",
   "Outputs from one root module can also be read by another configuration. The `terraform_remote_state` data source reads the root module outputs from another configuration's state, given that state's backend details. In HCP Terraform, the `tfe_outputs` data source reads a workspace's outputs in a way that keeps sensitive values marked as sensitive. This is how separate stacks share values such as network IDs, replacing fragile copy-and-paste. Only root outputs are exposed this way, so the networking team must declare an output for anything the application team needs.",
   "Local values are declared in a `locals` block, plural, and referenced with `local.NAME`, singular. That spelling difference is a favorite exam trap, and writing `locals.name_prefix` in a reference produces an error. A single `locals` block can define many values, and a module can have several `locals` blocks.",
   "```hcl\nlocals {\n  name_prefix = \"${var.project}-${var.environment}\"\n  common_tags = {\n    Project     = var.project\n    Environment = var.environment\n    ManagedBy   = \"terraform\"\n  }\n}\n\nresource \"aws_s3_bucket\" \"logs\" {\n  bucket = \"${local.name_prefix}-logs\"\n  tags   = local.common_tags\n}\n```",
   "Locals shine when the same expression would otherwise be repeated, or when naming a complex expression makes code clearer. In the opening scene, a `common_tags` local would replace forty pasted copies, so a cost center typo gets fixed in one place. Locals can reference variables, resources, data sources and other locals. Unlike input variables, they cannot be overridden by a caller, a tfvars file or the command line, which makes them a good place for values that should be computed consistently, such as naming conventions. Overusing them, however, can make code harder to follow, since readers must jump to the definition to see what a value is; a local that is used once and simply renames a variable adds little.",
   "To summarize the trio: variables are a module's inputs, set from outside and referenced as `var.NAME`; locals are its private working names, defined inside and referenced as `local.NAME`; and outputs are its return values, declared with `output` and reached from a parent as `module.NAME.OUTPUT`. If you think of a module as a function, variables are parameters, locals are local variables in the function body, and outputs are what the function returns. When you design a module, decide its outputs as carefully as its inputs. A small, stable set of well-described outputs, such as IDs and endpoints, makes the module easy to consume, while exposing every attribute couples callers to internal details you may want to change later."
  ],
  "analogy": "Think of a module as a function in a programming language. Input variables are the parameters you pass in, locals are temporary variables used inside the function body, and outputs are the return values. A caller can supply parameters and read return values, but can never reach inside to change a temporary variable. Where the analogy stops: Terraform outputs are also saved in state, so another configuration can read them later, which a normal function's return value cannot do.",
  "terms": [
   [
    "Output value",
    "A named value a module exports, printed for the root module and accessed as `module.NAME.OUTPUT` for child modules."
   ],
   [
    "Local value",
    "A named expression defined in a `locals` block and referenced as `local.NAME`, usable only inside its module."
   ],
   [
    "terraform output",
    "Command that reads root module output values from state, with `-raw` and `-json` options."
   ],
   [
    "terraform_remote_state",
    "Data source that reads the root module outputs of another configuration's state."
   ],
   [
    "Sensitive output",
    "An output marked `sensitive = true`, hidden as `<sensitive>` in normal CLI listings but still stored in state."
   ]
  ],
  "example": "A networking team's configuration outputs `private_subnet_ids`. An application team's configuration reads those outputs with a remote state data source, and uses a local `common_tags` map so every resource gets the same Project and Environment tags.",
  "mistakes": [
   [
    "Locals are referenced as `locals.NAME`, matching the block name.",
    "The block is `locals`, but references use the singular `local.NAME`."
   ],
   [
    "A caller can override a local with `-var` or a tfvars file.",
    "Locals are internal. Only input variables can be set from outside the module."
   ],
   [
    "Marking an output `sensitive` keeps it secret from everyone.",
    "It hides the value in normal CLI output, but `terraform output -raw` and `-json` show it, and it is stored in state."
   ],
   [
    "A parent module can reference any resource inside a child module directly.",
    "Only values the child declares as outputs are visible, as `module.NAME.OUTPUT`."
   ]
  ],
  "tryit": [
   [
    "A shell script needs the web server's IP address after apply, to run a quick health check. The root module has `output \"web_ip\"`. Which command should the script use, and why?",
    "`terraform output -raw web_ip`. It prints the bare string without quotes or formatting, so the script can use it directly. Plain `terraform output web_ip` adds quotes, and `-json` would require parsing."
   ],
   [
    "Your module repeats `\"${var.project}-${var.environment}\"` in twelve resource names. A teammate proposes adding a new input variable `name_prefix` so callers can set it. What is the trade-off, and what would you suggest if the naming convention must be enforced?",
    "An input variable lets callers override the prefix, which breaks the convention. A local `name_prefix` computed from the existing variables keeps the code short while guaranteeing the format, because locals cannot be overridden."
   ]
  ],
  "tip": "The block is `locals` but the reference is `local.name`. Child module values are reachable only through outputs, as `module.NAME.OUTPUT_NAME`. Sensitive outputs are hidden in normal listings but printed by `terraform output -raw` and `-json`, and are always in state.",
  "check": [
   [
    "How does a root module read a value produced inside a child module named `db`?",
    "The child must declare an output, for example `endpoint`, and the root references it as `module.db.endpoint`."
   ],
   [
    "Can a local value be overridden with `-var`?",
    "No. Locals are internal to the module; only input variables can be set from outside."
   ],
   [
    "Which data source lets one configuration read another configuration's root module outputs from its state?",
    "`terraform_remote_state` (or `tfe_outputs` for HCP Terraform workspaces)."
   ]
  ]
 },
 {
  "t": "Complex types: list, map, set, object, tuple; type conversion",
  "hook": "It is Tuesday afternoon at Lakeshore Freight, and Priya is reviewing a pull request for the shared networking module. The author declared `variable \"subnets\"` with `type = list(string)`, then tried to loop over it with `for_each`, and the plan fails before it even starts. A teammate suggests changing the type to `any` so the error goes away. Another wants a map of objects so every subnet carries its own CIDR block and availability zone. Priya has five minutes before standup. Which type actually describes the data, which one will `for_each` accept, and what will Terraform quietly convert on its own?",
  "simple": "A type is a promise about what shape a value has. Simple values are a piece of text, a number, or true or false. Complex types are containers that hold several values. Some containers hold many items of the same kind: a list keeps them in order, a set keeps only unique items with no order, and a map gives each item a name tag. Other containers hold a fixed mix: an object is like a form with named fields, each with its own kind of answer, and a tuple is a short row of slots in a set order. Think of a grocery list (ordered), a bag of distinct marbles (a set), and a labeled spice rack (a map). Terraform can often convert one shape into another for you when it is safe.",
  "body": [
   "Beyond the primitive types `string`, `number` and `bool`, Terraform has complex types that group several values into one. They come in two families, collection types and structural types, and knowing which family each type belongs to explains most of their rules. When you see a type constraint on a variable, an output or a module input, the first question to ask is simply: must every element share one type, or can the elements differ?",
   "Collection types hold many values that all share one element type. A `list(T)` is an ordered sequence, indexed from zero, such as `list(string)` holding `[\"a\", \"b\"]`, accessed with `var.zones[0]`. Order matters and duplicates are allowed, so `[\"a\", \"a\"]` is a valid two-element list. A `map(T)` is a group of string keys each pointing to a value of type T, such as `map(number)`, accessed with `var.sizes[\"small\"]`; keys are always strings, and every value must be the same type. A `set(T)` is an unordered collection of unique values. Duplicates are removed, there is no index, and you usually loop over a set or convert it rather than picking out one element. Writing `var.names[0]` against a set is an error, which surprises people who think of a set as just a list without duplicates.",
   "Structural types allow different types within one value, with the shape fixed in the type itself. An `object({...})` has named attributes, each with its own type, such as `object({ name = string, port = number })`. That is the key difference from a map: a map has arbitrary keys that all hold the same type of value, while an object has a known set of attribute names whose types may differ. A `tuple([...])` is a fixed-length sequence where each position has its own type, such as `tuple([string, number, bool])`. You will meet tuples less often in variable declarations, but they matter because of how Terraform reads literal syntax, as you will see below.",
   "Real modules usually combine these types. A common and very readable pattern is a map of objects, where each map key names one thing to build and each object describes its settings.",
   "```hcl\nvariable \"services\" {\n  type = map(object({\n    port     = number\n    public   = bool\n    replicas = optional(number, 1)\n  }))\n}\n```",
   "The `optional()` modifier marks an object attribute that callers may leave out, with an optional default as the second argument. In the example above, a caller can omit `replicas` and Terraform fills in 1; without a default, an omitted optional attribute becomes `null`. Without `optional()`, every attribute in an object type is required, and leaving one out produces an error that names the missing attribute. The special keyword `any` is a placeholder that lets Terraform infer the type from whatever value is supplied. It is flexible but gives weaker checking, because mistakes surface later and with less helpful messages, so prefer an explicit type where you can. Note that a bare `list` or `map` without an element type is shorthand for `list(any)` or `map(any)`.",
   "Type conversion happens automatically whenever a value of one type is assigned where another is expected and a safe conversion exists. The strings `\"5\"` and `\"true\"` convert to the number 5 and the bool true, and numbers and bools convert to strings. A tuple converts to a list if all its elements can share one type, and an object converts to a map in the same way. A list converts to a set, dropping order and duplicates. If no conversion exists, such as the string `\"hello\"` to a number, you get an error that says the value is not valid for the declared type, and the run stops before anything changes.",
   "Literal syntax matters here. In HCL, a value written with square brackets, `[...]`, is technically a tuple, and a value written with braces, `{...}`, is an object. When you assign `[\"a\", \"b\"]` to a variable declared as `list(string)`, Terraform converts the tuple to a list; when you assign `{ small = 1, large = 4 }` to `map(number)`, it converts the object to a map. This is why declaring types on variables is so useful: the declaration tells Terraform which conversion to apply, and you get a predictable shape inside the module no matter how the caller wrote the literal.",
   "You can also convert explicitly with functions: `tostring`, `tonumber`, `tobool`, `tolist`, `toset` and `tomap`. The most common case by far is `toset(var.names)`, because `for_each` accepts sets and maps but not lists. Explicit conversion is otherwise rarely needed; HashiCorp suggests relying on automatic conversion and declaring types on variables instead of sprinkling conversion functions through your code. On the exam, expect questions that ask which type fits a described piece of data, which type is unordered, which allows mixed attribute types, and what you must do before passing a list to `for_each`."
  ],
  "analogy": "Picture a school office. A list is the attendance sheet: names in a fixed order, numbered from the top, and the same name could appear twice by mistake. A set is the bag of name badges: each badge is unique and there is no first or last. A map is a wall of labeled mailboxes, where every box holds the same kind of thing. An object is an enrollment form with fixed fields like name, grade and bus number, each a different kind of answer. The analogy stops at keys: in Terraform, map keys are always strings, even when they look like numbers.",
  "terms": [
   [
    "Collection type",
    "list, map or set: many values that all share the same element type."
   ],
   [
    "Structural type",
    "object or tuple: a fixed shape whose attributes or positions may have different types."
   ],
   [
    "list(T)",
    "An ordered, zero-indexed sequence of values of type T that may contain duplicates."
   ],
   [
    "map(T)",
    "A collection of string keys, each pointing to a value of type T."
   ],
   [
    "set",
    "An unordered collection of unique values with no index."
   ],
   [
    "optional()",
    "Modifier in an object type that makes an attribute omittable, optionally with a default."
   ],
   [
    "any",
    "A type placeholder that lets Terraform infer the type from the supplied value, with weaker checking."
   ],
   [
    "Type conversion",
    "Automatic or function-based changing of a value to a compatible type, such as `toset()` on a list."
   ]
  ],
  "example": "A module takes `variable \"subnets\" { type = map(object({ cidr = string, az = string })) }`. The caller passes a map of named subnets, and the module uses `for_each = var.subnets` so each subnet is created with a stable key such as `\"app\"` or `\"db\"`. If a caller passes a CIDR block as a number by mistake, the type check fails at plan time with a clear message instead of the provider rejecting it halfway through an apply.",
  "mistakes": [
   [
    "A set is just a list without duplicates, so `var.names[0]` works on it.",
    "A set has no order and no index. You loop over it, test membership with `contains`, or convert it with `tolist` if you truly need positions."
   ],
   [
    "A map and an object are interchangeable because both use braces.",
    "A map has arbitrary string keys whose values all share one type; an object has fixed attribute names whose types may differ. The brace literal is an object that Terraform converts to a map only when a map type is declared and the values can share a type."
   ],
   [
    "Declaring everything as `any` is the safest choice because nothing ever fails.",
    "`any` only defers type errors, making them later and harder to read. Explicit types catch bad input at the boundary of the module."
   ],
   [
    "`for_each` accepts a list as long as the items are unique.",
    "`for_each` accepts only a map or a set of strings. Wrap a list in `toset()` first."
   ]
  ],
  "tryit": [
   [
    "You are writing a module input for firewall rules. Each rule needs a name, a port number and a flag saying whether it is public, and callers usually leave the flag at false. You also want to create one resource per rule with a stable key. What type do you declare?",
    "Use `map(object({ port = number, public = optional(bool, false) }))`, with the map key acting as the rule name. The object holds mixed attribute types, `optional()` supplies the usual default, and a map works directly with `for_each`, giving each rule a stable key."
   ]
  ],
  "tip": "Lists are ordered and indexed; sets are unordered and unique; maps have string keys and one value type. Objects and tuples are the structural versions allowing mixed types. `for_each` needs a map or set, so convert lists with `toset()`.",
  "check": [
   [
    "What is the difference between `list(string)` and `set(string)`?",
    "A list is ordered and allows duplicates, with elements accessed by index; a set is unordered, holds unique values and has no index."
   ],
   [
    "Which type allows attributes of different types with fixed names?",
    "`object({...})`, a structural type; a `map` requires all values to share one type."
   ],
   [
    "A variable is declared as `number` and a caller passes the string \"8\". What happens?",
    "Terraform automatically converts the string \"8\" to the number 8, because a safe conversion exists. A string like \"eight\" would cause a type error."
   ]
  ]
 },
 {
  "t": "Expressions: conditionals, `for` expressions, splat `[*]`, string templates, `dynamic` blocks",
  "hook": "At Juniper Valley Health, Marcus inherits a security group module with forty copy-pasted `ingress` blocks, one per port. A ticket asks him to open two more ports for a new clinic application and to stop creating the audit bucket in the dev environment. Every edit means scrolling, duplicating and hoping he did not miss a closing brace. His lead says the whole file could be a dozen lines with the right expressions. Marcus stares at the wall of repeated blocks. Which Terraform expressions let him decide, transform and repeat without turning his configuration into a full programming project?",
  "simple": "Expressions are the small formulas inside Terraform files that work out a value. A conditional is a yes-or-no choice: if this is production, use the big server, otherwise the small one. A `for` expression walks through a list and builds a new one, like taking a class roster and writing every name in capital letters. A splat, written `[*]`, is a shortcut for pulling one detail out of every item, such as every server's ID. A string template drops values into text, like a form letter that fills in each person's name. A `dynamic` block stamps out repeated sections inside one resource, like a cookie cutter making one rule per port from a list.",
  "body": [
   "Expressions compute values in Terraform. Beyond literals and references, a handful of expression forms let you make decisions, transform collections and generate repeated blocks without writing a general-purpose program. The first is the conditional expression, written `condition ? true_value : false_value`. For example, `instance_type = var.environment == \"prod\" ? \"m5.large\" : \"t3.micro\"` picks a larger size only in production. Both results should be of the same type, or convertible to one, because Terraform must know the result type before it can check the rest of the configuration. A very common idiom is `count = var.create_bucket ? 1 : 0`, which makes a whole resource optional: one instance when the flag is true and none when it is false.",
   "Next comes the `for` expression, which transforms one collection into another. The brackets around it decide the result. Square brackets produce a list or tuple; braces produce an object or map, using `=>` between key and value. An optional `if` clause at the end filters elements, keeping only those for which the condition is true. When iterating over a map, you can name both the key and the value, as in `for k, s in var.services`; over a list, a two-symbol form gives you the index and the element.",
   "```hcl\nupper_names = [for n in var.names : upper(n)]\nport_by_svc = { for k, s in var.services : k => s.port }\npublic_only = [for s in var.servers : s.name if s.public]\n```",
   "A splat expression is a shorthand for one particular, very common `for` expression. `aws_instance.web[*].id` means the same as `[for i in aws_instance.web : i.id]`: take a list of objects and return a list of one attribute from each. It works on lists, sets and tuples, such as resources created with `count`, which Terraform represents as a list of instances. It does not work directly on maps, so for a `for_each` resource, which is a map of instances keyed by string, you use `values(aws_instance.web)[*].id` or a `for` expression instead. One more detail: applying `[*]` to a single value that is not a list wraps it in a one-element list, and applying it to null gives an empty list, which can be handy when an argument expects a list.",
   "String templates embed expressions inside strings. Interpolation, as in `\"${var.project}-logs\"`, inserts a value. Directives add logic inside the string: `%{ if var.enabled }on%{ else }off%{ endif }` chooses text, and `%{ for ip in var.ips }${ip} %{ endfor }` repeats it. Multi-line strings use heredoc syntax, opening with `<<EOT` and closing with `EOT` on its own line, and the `<<-EOT` form strips common leading indentation so the text can be indented neatly in your file. To write a literal `${` without interpolating, escape it as `$${`, and similarly `%%{` for a literal directive. For larger templates, such as a cloud-init script or a policy document, keep the text in a separate file and render it with the `templatefile` function, passing a map of variables.",
   "The `dynamic` block generates repeated nested blocks inside a resource from a collection. Think of several `ingress` rules in a security group, several `setting` blocks in an application environment, or several disks attached to a virtual machine. The block's label names the nested block type to generate, `for_each` supplies the collection, and a `content` block describes what each generated block contains. Inside `content`, the iterator variable is named after the block label unless you set the `iterator` argument to choose a different name. It has two attributes: `.key`, the map key or list index, and `.value`, the current element.",
   "```hcl\ndynamic \"ingress\" {\n  for_each = var.allowed_ports\n  content {\n    from_port   = ingress.value\n    to_port     = ingress.value\n    protocol    = \"tcp\"\n    cidr_blocks = [\"10.0.0.0/8\"]\n  }\n}\n```",
   "Dynamic blocks make modules flexible, but overusing them makes code hard to read and review, because the reader has to evaluate the loop mentally to know what will be built. HashiCorp advises using them mainly to hide detail in reusable modules that must accept a variable number of nested settings, and writing nested blocks literally where possible. Know their limits for the exam: they can only generate nested blocks within a resource, data, provider or provisioner block. They cannot generate whole resources, which is the job of `count` and `for_each` on the resource itself, and they cannot generate meta-argument blocks such as `lifecycle`.",
   "Putting these together, a typical module might use a conditional to decide whether to create a logging bucket, a `for` expression to build a map of tags, a splat to output all instance IDs, a template to render a startup script, and a `dynamic` block to create one firewall rule per allowed port. Each form is small and declarative, and recognizing which bracket or symbol produces which result is exactly the skill the exam tests."
  ],
  "analogy": "A `for` expression is like a photocopier with a filter and a stamp: you feed in a stack of pages, it skips the ones you do not want, and it stamps each remaining copy. The tray you collect from decides the result: a numbered tray gives a list, a tray of labeled folders gives a map. A `dynamic` block is a rubber stamp used inside a single form, repeating one section many times. The analogy stops at whole forms: a dynamic block cannot print new resources, only sections within one.",
  "terms": [
   [
    "Conditional expression",
    "`condition ? a : b`, which chooses one of two values based on a boolean."
   ],
   [
    "for expression",
    "An expression that builds a list or map by transforming, and optionally filtering, another collection."
   ],
   [
    "Splat expression",
    "`[*]` shorthand that extracts one attribute from every element of a list, such as `aws_instance.web[*].id`."
   ],
   [
    "String template",
    "A string with `${...}` interpolation or `%{...}` directives."
   ],
   [
    "Heredoc",
    "Multi-line string syntax using `<<EOT` ... `EOT`; `<<-EOT` strips common leading indentation."
   ],
   [
    "dynamic block",
    "A construct that generates repeated nested blocks from a collection using `for_each` and `content`."
   ]
  ],
  "example": "A security group module accepts a list of ports. A `dynamic \"ingress\"` block produces one rule per port, and an output uses a `for` expression to return a map of rule descriptions, so callers can add ports without editing the module. A conditional on `var.environment` skips the flow log bucket in dev by setting its `count` to 0.",
  "mistakes": [
   [
    "A splat works on any resource with multiple instances, including `for_each` resources.",
    "Splat works on lists, sets and tuples. A `for_each` resource is a map, so use `values(resource)[*].attr` or a `for` expression."
   ],
   [
    "`{for ...}` and `[for ...]` produce the same thing.",
    "Square brackets produce a list or tuple; braces with `key => value` produce a map or object."
   ],
   [
    "A `dynamic` block can create several resources or a `lifecycle` block.",
    "Dynamic blocks generate only nested blocks inside a resource, data, provider or provisioner block. Use `count` or `for_each` for whole resources; lifecycle cannot be dynamic."
   ],
   [
    "The two branches of a conditional can return any types.",
    "Both results must share a type or be convertible to one, because Terraform needs to know the result type."
   ]
  ],
  "tryit": [
   [
    "Your module creates web servers with `for_each` over a map of names. A colleague writes an output `value = aws_instance.web[*].private_ip` and gets an error. You need a list of all private IPs. What do you write instead?",
    "Use `values(aws_instance.web)[*].private_ip` or `[for i in aws_instance.web : i.private_ip]`. A `for_each` resource is a map of instances, and splat works only on lists, sets and tuples, so you first turn the map into a list of its values."
   ],
   [
    "A teammate wants to give a security group one ingress rule per entry in a variable list of ports, and also to generate the whole security group only in production. Which constructs fit each need?",
    "A `dynamic \"ingress\"` block with `for_each = var.ports` generates the nested rules, and `count = var.environment == \"prod\" ? 1 : 0` on the resource makes the whole security group conditional. A dynamic block cannot decide whether the resource itself exists."
   ]
  ],
  "tip": "Know which brackets produce what: `[for ...]` gives a list or tuple, `{for ... : k => v}` gives a map or object. Splat works on lists, not maps, and `dynamic` generates nested blocks, not resources.",
  "check": [
   [
    "Write an expression returning the IDs of all instances of a `count`-based resource `aws_instance.web`.",
    "`aws_instance.web[*].id`, equivalent to `[for i in aws_instance.web : i.id]`."
   ],
   [
    "Inside `dynamic \"ingress\"` with no `iterator` set, how do you refer to the current element?",
    "As `ingress.value` (and `ingress.key` for its key or index)."
   ],
   [
    "How do you write a literal `${` in a Terraform string without interpolation?",
    "Escape it as `$${`."
   ]
  ]
 },
 {
  "t": "Built-in functions and testing them in `terraform console`",
  "hook": "Late on a Thursday at Cedar Ridge Schools, Dana is carving a new network into subnets for six campuses. She has written `cidrsubnet(var.vpc_cidr, 4, count.index)` and is fairly sure it produces /20 blocks, but the change request says /24. Running a full plan against production just to test a formula feels reckless, and guessing feels worse. A colleague leans over and asks whether she has tried the console. Dana has heard of it but never opened it. Is there a safe way to try out a function and see its exact result before it ever touches real infrastructure?",
  "simple": "Functions are ready-made tools built into Terraform. You hand a function some input and it hands back a result, like a calculator button: `upper(\"web\")` gives `\"WEB\"`, and `max(3, 9)` gives `9`. You cannot invent your own functions in Terraform files; you pick from the toolbox Terraform provides, plus a few that providers add. To try a tool before using it for real, you open `terraform console`, a little practice window. You type a formula, press Enter, and see the answer, and nothing in your cloud account changes. It is like testing a recipe step in a small bowl before mixing the whole batch.",
  "body": [
   "Terraform includes a library of built-in functions that you call inside expressions with the syntax `name(arg1, arg2)`. You cannot write your own functions in the Terraform language, which surprises people coming from general-purpose programming. Instead, you use the built-in ones, plus any functions a provider supplies, called with the `provider::NAME::FUNCTION(...)` syntax after the provider is declared in `required_providers`. The exam expects you to recognize common functions by category, to know a few behaviors that are easy to get wrong, and to know how to experiment with functions safely.",
   "The main categories are worth knowing with an example or two each. Numeric functions include `min`, `max`, `abs`, `ceil` and `floor`. String functions include `upper`, `lower`, `format`, `join`, `split`, `replace`, `trimspace` and `substr`. Collection functions include `length`, `concat`, `merge`, `lookup`, `element`, `flatten`, `keys`, `values`, `contains`, `distinct`, `coalesce` and `zipmap`. Encoding functions include `jsonencode`, `jsondecode`, `yamlencode` and `base64encode`, which are handy for building policy documents from HCL maps instead of writing raw JSON strings. Filesystem functions include `file`, `fileexists` and `templatefile`. Date and time functions include `timestamp` and `formatdate`. Hash and crypto functions include `sha256`, `md5` and `bcrypt`. IP network functions include `cidrsubnet`, `cidrhost` and `cidrnetmask`. Type conversion functions include `tostring`, `tonumber`, `tolist`, `toset` and `tomap`, plus `try` and `can` for handling errors gracefully.",
   "A few behaviors are commonly tested. `lookup(map, key, default)` returns the default when the key is missing, instead of failing. `element(list, index)` wraps around when the index is past the end, so `element([\"a\", \"b\"], 2)` returns `\"a\"`, unlike `list[index]`, which errors on an out-of-range index. `merge` combines maps, with later maps winning on duplicate keys, which makes it the usual way to layer default tags under resource-specific tags. `coalesce` returns the first argument that is not null or an empty string. `file` reads a file from disk while Terraform evaluates the configuration, and relative paths are best built with `path.module` so a module finds its own files no matter where it is called from. `templatefile(path, vars)` renders a template file with a map of variables.",
   "One function deserves a warning. `timestamp()` returns the current time and gives a new value on every run, so using it directly in resource arguments causes a change in every plan. Similarly, `bcrypt` produces a different hash each time because it uses a random salt. When a plan keeps showing the same attribute changing for no obvious reason, a function like this is often the cause.",
   "Testing functions is where `terraform console` comes in. It opens an interactive prompt where you can evaluate expressions against your configuration. Run it in an initialized working directory, type an expression at the `>` prompt, and see the result printed immediately. It knows your variables, locals and, if state exists, the attributes of your resources, so you can inspect `aws_instance.web.private_ip` or try out a `for` expression before putting it in code. Exit with `exit` or Ctrl+D. You can also pipe an expression into it, for example `echo 'max(3, 7)' | terraform console`, for quick scripted checks.",
   "```text\n$ terraform console\n> cidrsubnet(\"10.0.0.0/16\", 8, 1)\n\"10.0.1.0/24\"\n> lookup({a = 1}, \"b\", 0)\n0\n> join(\"-\", [\"app\", \"prod\"])\n\"app-prod\"\n> exit\n```",
   "The `cidrsubnet(prefix, newbits, netnum)` example is worth understanding in detail. It adds `newbits` to the prefix length, so here 16 plus 8 gives /24, and then picks subnet number `netnum` within that range, counting from zero. Subnet 0 would be `10.0.0.0/24`, subnet 1 is `10.0.1.0/24`, and so on. In the opening scenario, `cidrsubnet(\"10.0.0.0/16\", 4, 0)` would give a /20, because 16 plus 4 is 20; to get /24 blocks from a /16, `newbits` must be 8. The function is widely used with `count.index` or a `for` expression to carve subnets out of a network address block without hard-coding each one. Its relatives `cidrhost` and `cidrnetmask` return a specific host address and the dotted netmask for a prefix.",
   "When you meet an unfamiliar function in a question, reason from its name and category, then confirm the behavior in console during your labs. Knowing that console exists, and that it evaluates expressions without changing anything, is itself a likely exam point. Console reads state but never writes changes to infrastructure, so it is a safe place to answer the question of what a given formula actually returns."
  ],
  "analogy": "Built-in functions are like the fixed buttons on a kitchen appliance: chop, blend, whisk. You cannot add a new button, but you can combine the existing ones. `terraform console` is the tasting spoon: you dip in, check the flavor and adjust before serving. The analogy stops at the tasting spoon changing nothing at all; console does read your real state to show resource attributes, so it sees the live dish, but it still never changes the infrastructure.",
  "terms": [
   [
    "Built-in function",
    "A function supplied by Terraform, such as `join` or `cidrsubnet`, callable in expressions; user-defined functions are not supported."
   ],
   [
    "Provider-defined function",
    "A function shipped by a provider and called as `provider::NAME::FUNCTION(...)`."
   ],
   [
    "terraform console",
    "Interactive command for evaluating expressions against the current configuration and state without making changes."
   ],
   [
    "lookup",
    "Function that returns a map value by key, or a default when the key is missing."
   ],
   [
    "merge",
    "Function that combines maps; later arguments win when keys repeat."
   ],
   [
    "cidrsubnet",
    "Function that calculates a subnet address range within a larger CIDR block."
   ]
  ],
  "example": "Before writing a module that creates one subnet per availability zone, an engineer opens `terraform console` and tries `[for i in range(3) : cidrsubnet(\"10.20.0.0/16\", 4, i)]` to check that the ranges come out as expected. Seeing three /20 blocks, she realizes she wanted /24 and changes `newbits` to 8 before committing.",
  "mistakes": [
   [
    "You can define a custom function in a `.tf` file with a function block.",
    "Terraform does not support user-defined functions in configuration. You use built-in functions and provider-defined functions."
   ],
   [
    "`terraform console` might change resources if you type the wrong expression.",
    "Console only evaluates expressions; it does not create, update or destroy infrastructure."
   ],
   [
    "`element(list, 5)` on a three-item list errors just like `list[5]`.",
    "`element` wraps around using the remainder, while direct indexing with an out-of-range index errors."
   ],
   [
    "Using `timestamp()` in a tag is a good way to record when a resource was created.",
    "`timestamp()` changes on every run, so the tag would show a change in every plan. Use it carefully, for example with `ignore_changes`, or record creation time another way."
   ]
  ],
  "tryit": [
   [
    "Your team wants every resource to carry company-wide default tags, but each resource may override a default such as `Owner`. You have `local.default_tags` and `var.extra_tags`. Which function and argument order do you use, and how do you verify it?",
    "Use `merge(local.default_tags, var.extra_tags)`. Later maps win on duplicate keys, so the resource-specific tags override defaults. Paste the expression into `terraform console` to see the merged map before applying."
   ]
  ],
  "tip": "Terraform does not support user-defined functions in HCL. To test function behavior, use `terraform console`, which evaluates expressions without modifying infrastructure.",
  "check": [
   [
    "What does `lookup(var.sizes, \"xl\", \"medium\")` return if `var.sizes` has no `xl` key?",
    "\"medium\", the default given as the third argument."
   ],
   [
    "Can you define your own function in a Terraform configuration?",
    "No. You can only use built-in functions and functions provided by providers."
   ],
   [
    "What prefix length does `cidrsubnet(\"10.0.0.0/16\", 8, 3)` produce, and what range?",
    "A /24, because 16 plus 8 is 24; subnet number 3 is 10.0.3.0/24."
   ]
  ]
 },
 {
  "t": "`count` vs `for_each`, `count.index`, `each.key` and `each.value`",
  "hook": "Monday morning at Bayside Credit Union, Leo removes one name from the list of developer accounts: Aaron left on Friday. He runs `terraform plan` expecting one deletion. Instead the plan wants to change two other accounts and destroy a third, and one of those accounts belongs to the lead engineer who is presenting to the board in an hour. Leo did not touch those names. He checks the diff three times. The resource uses `count` over a list. Why would removing one item disturb people who were never edited, and how should this resource have been written?",
  "simple": "Sometimes you want many copies of the same thing, like ten servers or five user accounts. Terraform gives you two ways. `count` says \"make this many\" and numbers each copy 0, 1, 2 and so on, like seats numbered in a row. `for_each` says \"make one for each of these names\" and labels each copy with its name, like reserved seats with name cards. If someone in the middle of the numbered row leaves, everyone shifts over a seat, and Terraform thinks they all changed. With name cards, one person leaving frees only their own seat. That is why named things usually use `for_each`.",
  "body": [
   "Both `count` and `for_each` are meta-arguments, meaning arguments that Terraform itself handles rather than the provider, and both create several instances of a resource, data source or module from one block. They look similar but identify instances differently, and that difference decides which one you should use. Getting this choice wrong is one of the most common causes of surprising plans in real teams, and it is a favorite exam topic.",
   "`count` takes a whole number. Terraform creates that many instances, addressed by integer index: `aws_instance.web[0]`, `aws_instance.web[1]` and so on. Inside the block, `count.index` gives the current index, starting at zero, which you can use to vary names, pick from a list or calculate a subnet. With `count = 0`, no instances exist at all. In plan output and in `terraform state list`, you will see these numeric addresses, such as `aws_instance.web[2]`, which tells you immediately that the resource was built with `count`.",
   "```hcl\nresource \"aws_instance\" \"web\" {\n  count         = 3\n  ami           = var.ami_id\n  instance_type = \"t3.micro\"\n  tags = { Name = \"web-${count.index}\" }\n}\n```",
   "`for_each` takes a map or a set of strings. Terraform creates one instance per element, addressed by key: `aws_iam_user.dev[\"alice\"]`. Inside the block, `each.key` is the map key or set element and `each.value` is the map value. For a set, `each.value` is the same as `each.key`, because a set has no separate values. A list is not accepted directly, because a list could contain duplicates and its identity is positional, so wrap it in `toset()` first. Maps are ideal when each instance needs its own settings, since `each.value` can be an object carrying several attributes.",
   "```hcl\nresource \"aws_iam_user\" \"dev\" {\n  for_each = toset([\"alice\", \"bob\", \"carol\"])\n  name     = each.key\n}\n\nresource \"aws_s3_bucket\" \"b\" {\n  for_each = { logs = \"private\", site = \"public\" }\n  bucket   = \"acme-${each.key}\"\n  tags     = { Access = each.value }\n}\n```",
   "The key difference shows up when the collection changes. Suppose you used `count` with a list of three user names, `[\"alice\", \"bob\", \"carol\"]`, and set `name = var.users[count.index]`. If you remove `alice`, every remaining name shifts down one index. Terraform now sees index 0 changing from alice to bob, index 1 changing from bob to carol, and index 2 removed. Depending on the resource, that can mean renaming, or destroying and re-creating, objects you never intended to touch, exactly what happened in the opening scenario. With `for_each`, each instance is tied to a stable key; removing `alice` destroys only `[\"alice\"]` and leaves bob and carol alone, and the plan shows exactly one deletion.",
   "So the general rule is this. Use `count` when the instances are nearly identical and interchangeable, such as a pool of worker nodes where it does not matter which one is number 2, or when you want a simple on and off switch with `count = var.enabled ? 1 : 0`. Use `for_each` when each instance has a distinct identity or distinct settings, such as named users, named buckets, or subnets that each have their own CIDR block and zone. A single block cannot use both `count` and `for_each` at once; Terraform rejects the configuration.",
   "There is also a timing rule. For both meta-arguments, the number of instances, or the set of keys for `for_each`, must be known at plan time. You cannot base them on attributes that are only known after apply, such as IDs of resources being created in the same run. If you try, Terraform reports that the value depends on resource attributes that cannot be determined until apply. The usual fix is to key on values you control, such as names from a variable, and use the unknown IDs only inside the instance arguments, where unknown values are allowed. Map values for `for_each` may be unknown; only the keys must be known.",
   "Referencing works differently too. A `count` resource is a list of instances, so `aws_instance.web[0].id` gets one ID and `aws_instance.web[*].id` gets all of them. A `for_each` resource is a map of instances, so you use `aws_s3_bucket.b[\"logs\"].arn` for one, or `values(aws_s3_bucket.b)[*].arn` or a `for` expression for all. If you switch an existing resource from `count` to `for_each`, the addresses change from numbers to keys, so you add `moved` blocks (or use `terraform state mv`) to tell Terraform that `aws_iam_user.dev[0]` is now `aws_iam_user.dev[\"alice\"]`, avoiding a destroy and re-create."
  ],
  "analogy": "`count` is like numbered lockers in a gym: locker 0, 1, 2. If you remove locker 0 and renumber the rest, everyone's belongings appear to move to a different locker. `for_each` is like lockers with name plates: removing Alice's plate frees only her locker. Where the analogy stops: Terraform does not literally move anything, it compares old and new addresses, and a moved block can tell it that a numbered locker became a named one.",
  "terms": [
   [
    "Meta-argument",
    "An argument handled by Terraform itself, such as `count`, `for_each`, `depends_on` or `lifecycle`, rather than by the provider."
   ],
   [
    "count",
    "Meta-argument that creates a number of instances addressed by integer index."
   ],
   [
    "count.index",
    "The zero-based index of the current instance in a `count` block."
   ],
   [
    "for_each",
    "Meta-argument that creates one instance per element of a map or set of strings, addressed by key."
   ],
   [
    "each.key / each.value",
    "In a `for_each` block, the current element's key and value; identical for sets."
   ]
  ],
  "example": "A team manages developer accounts with `count` over a list of names. When one developer leaves and is removed from the start of the list, the plan wants to rename two other accounts. They switch to `for_each = toset(var.developers)`, moving existing state entries to the new keys with `moved` blocks, and future removals affect only the departing person.",
  "mistakes": [
   [
    "`for_each` accepts a list directly.",
    "It accepts a map or a set of strings. Convert a list with `toset()`."
   ],
   [
    "`count` and `for_each` are interchangeable; choosing one is just style.",
    "`count` identifies instances by position, so removing a middle item shifts indexes and changes other instances. `for_each` uses stable keys."
   ],
   [
    "You can combine `count` and `for_each` on one resource to get both behaviors.",
    "A block may use only one of them. Nest a module or restructure the data instead."
   ],
   [
    "You can use the IDs of resources created in the same run as `for_each` keys.",
    "Keys must be known at plan time. Use values you control, such as names, as keys."
   ]
  ],
  "tryit": [
   [
    "You need one subnet per entry in a map where each entry has a name, a CIDR block and an availability zone. Subnets may be added or removed over time. Which meta-argument do you use, and how do you reference each subnet's CIDR block inside the block?",
    "Use `for_each = var.subnets` so each subnet is keyed by its name and removing one affects only that subnet. Inside the block, refer to `each.value.cidr` and `each.value.az`, and use `each.key` for the name tag."
   ],
   [
    "A module should create a monitoring alarm only when `var.enable_alarm` is true. There is only ever zero or one alarm. Which approach is simplest?",
    "`count = var.enable_alarm ? 1 : 0`. The instance has no distinct identity, so a count of zero or one is the idiomatic on and off switch."
   ]
  ],
  "tip": "`for_each` accepts maps and sets of strings, not lists, and gives stable keys. `count` indexes shift when items are removed from the middle. You cannot use both on one block.",
  "check": [
   [
    "Why is `for_each` usually safer than `count` for a list of named users?",
    "Instances are keyed by name, so removing one user affects only that instance; with `count`, removing an item shifts indexes and changes other instances."
   ],
   [
    "In a `for_each` over `toset([\"a\", \"b\"])`, what are `each.key` and `each.value` for the first element?",
    "Both are `\"a\"`, because for a set the key and value are the same."
   ],
   [
    "What is the address of the second instance of `aws_instance.web` created with `count = 3`?",
    "`aws_instance.web[1]`, because indexes start at zero."
   ]
  ]
 },
 {
  "t": "Explicit dependencies with `depends_on`; `lifecycle` rules: `create_before_destroy`, `prevent_destroy`, `ignore_changes`, `replace_triggered_by`",
  "hook": "It is 2 a.m. at Northwind Outfitters and Sam's phone buzzes: the new order service crashed on boot right after last night's apply. The logs say access denied when the app tried to read its configuration bucket. By morning the role policy exists and a restart fixes everything, which means the instance simply started before its permissions were attached. Meanwhile, the database team asks Sam for a guarantee that nobody can destroy the customer database by accident, and the platform team complains that every plan tries to undo the autoscaler. How can one resource block express all of that?",
  "simple": "Terraform usually works out the order of building things by itself: if a server mentions a network, it builds the network first. But sometimes one thing needs another without mentioning it, like a cook who needs the oven preheated even though the recipe card never says \"oven\". `depends_on` is how you write that hidden need down. The `lifecycle` block is a set of house rules for one resource: build the new one before tearing down the old one, never allow this one to be deleted, ignore changes someone else makes to certain settings, and rebuild this one whenever something else changes.",
  "body": [
   "Most dependencies in Terraform are implicit, created by references. When one resource uses an attribute of another, such as `subnet_id = aws_subnet.app.id`, Terraform adds an edge to its dependency graph and creates the subnet first. Occasionally, though, one resource relies on another without using any of its attributes. The classic example is an instance whose application, at boot, calls a cloud API using a role. The instance must wait for the role's permission policy to be attached, but its arguments never reference the policy, so Terraform may create both in parallel. The `depends_on` meta-argument states that hidden dependency explicitly.",
   "```hcl\nresource \"aws_instance\" \"app\" {\n  ami                  = var.ami_id\n  instance_type        = \"t3.small\"\n  iam_instance_profile = aws_iam_instance_profile.app.name\n  # The app reads S3 at boot; the policy must be attached first.\n  depends_on           = [aws_iam_role_policy.app_s3]\n}\n```",
   "`depends_on` takes a list of references to resources, data sources or modules, written as bare references, not quoted strings. It works on resources, data sources, modules and outputs. Use it as a last resort and add a comment explaining why. It makes Terraform plan more conservatively, since more values may become unknown until apply, especially when it is placed on a data source or a whole module, and it hides the real reason for the dependency from readers. If you can express the relationship with a reference instead, do that.",
   "The `lifecycle` block is a nested meta-argument block that changes how Terraform handles changes to a resource. It has four settings the exam focuses on, and each solves a distinct operational problem: downtime during replacement, accidental deletion, fighting with another system over a value, and knowing when to rebuild.",
   "`create_before_destroy = true` reverses the default replacement order. Normally, when an argument cannot be updated in place, Terraform destroys the old object and then creates the new one. With this setting, the new object is created first and the old one is destroyed afterward, reducing downtime. It needs the resource to allow two copies at once, so arguments that must be unique, such as a name, often need a generated suffix or `name_prefix`. `prevent_destroy = true` makes Terraform reject any plan that would destroy the resource, including replacements and `terraform destroy`, with an error that names the protected resource. This protects databases and similar objects from accidents. It only works while the block is in the code; if someone deletes the whole resource block, the setting goes with it and the resource can be destroyed.",
   "`ignore_changes` lists attributes whose differences Terraform should ignore after creation. Typical cases are tags applied by another system, such as a scanner that stamps `LastScanned`, or a desired count adjusted by an autoscaler. Terraform still uses the value when it first creates the object, but afterward it stops trying to revert drift on those attributes. Use `ignore_changes = all` to ignore every attribute, so Terraform only creates and destroys the object. `replace_triggered_by` lists references to other managed resources or their attributes; when any of them changes or is replaced, this resource is planned for replacement too. It is the declarative way to say rebuild this instance whenever that configuration or template changes. Because it accepts only managed resource references, a plain variable is often wrapped in a `terraform_data` resource whose `input` changes when you want the trigger to fire.",
   "```hcl\nlifecycle {\n  create_before_destroy = true\n  prevent_destroy       = true\n  ignore_changes        = [tags[\"LastScanned\"], desired_count]\n  replace_triggered_by  = [terraform_data.app_version]\n}\n```",
   "The `lifecycle` block can also hold `precondition` and `postcondition` blocks for custom checks, which are covered with custom conditions. One more rule is commonly tested: lifecycle settings are processed while Terraform builds the dependency graph, before it evaluates most expressions, so `create_before_destroy`, `prevent_destroy` and `ignore_changes` accept only literal values. You cannot write `prevent_destroy = var.protect`; Terraform will report that variables are not allowed there. A module that wants optional protection usually needs two resource blocks, or documentation telling callers to protect the resource another way.",
   "To summarize the decision: if a resource needs another one to exist first and no reference shows it, use `depends_on`. If replacement causes downtime, use `create_before_destroy`. If a resource must never be deleted by a plan, use `prevent_destroy`, and remember its limit. If another system owns an attribute, use `ignore_changes`. And if a resource should be rebuilt whenever something else changes, use `replace_triggered_by`."
  ],
  "analogy": "Think of moving offices. `depends_on` is the note saying the movers must wait for the electrician, even though the furniture list never mentions wiring. `create_before_destroy` is setting up the new office before closing the old one. `prevent_destroy` is a \"do not remove\" sticker on the server rack, which only helps while the sticker is on; peel off the whole label sheet and the rack can go. `ignore_changes` is letting the tenants rearrange their own desks. `replace_triggered_by` is reprinting name badges whenever the company name changes.",
  "terms": [
   [
    "depends_on",
    "Meta-argument declaring an explicit dependency that no attribute reference expresses."
   ],
   [
    "create_before_destroy",
    "Lifecycle setting that creates the replacement object before destroying the old one."
   ],
   [
    "prevent_destroy",
    "Lifecycle setting that makes any plan destroying the resource fail with an error."
   ],
   [
    "ignore_changes",
    "Lifecycle setting listing attributes whose drift Terraform should not try to correct."
   ],
   [
    "replace_triggered_by",
    "Lifecycle setting that replaces the resource when referenced resources or attributes change."
   ],
   [
    "terraform_data",
    "A built-in managed resource that stores a value and can act as a trigger for `replace_triggered_by`."
   ]
  ],
  "example": "An autoscaling service changes the `desired_count` of a container service throughout the day, and every plan tries to reset it. Adding `lifecycle { ignore_changes = [desired_count] }` lets the autoscaler own that value while Terraform manages everything else about the service.",
  "mistakes": [
   [
    "Use `depends_on` everywhere to be safe about ordering.",
    "It makes plans more conservative and hides the real relationship. Prefer references; use `depends_on` only for hidden dependencies and comment why."
   ],
   [
    "`prevent_destroy` guarantees a resource can never be destroyed by Terraform.",
    "It blocks plans only while the setting is in the configuration. Removing the resource block removes the protection."
   ],
   [
    "You can set `prevent_destroy = var.is_prod` to protect only production.",
    "Lifecycle settings must be literal values; variables and computed expressions are not allowed there."
   ],
   [
    "`ignore_changes` means Terraform never sets the attribute at all.",
    "Terraform still sets the value on creation; it only stops correcting later drift on that attribute."
   ]
  ],
  "tryit": [
   [
    "A load balancer's TLS certificate must be replaced periodically. When Terraform replaces it, the listener briefly has no certificate because the old one is destroyed before the new one exists. The certificate name is generated with a prefix. Which setting fixes the outage?",
    "Add `lifecycle { create_before_destroy = true }` to the certificate. The new certificate is created first, the listener is updated to it, and only then is the old one destroyed. The generated name prefix means two certificates can exist at once."
   ],
   [
    "You want an instance rebuilt whenever a version string in a variable changes, but `replace_triggered_by = [var.app_version]` is rejected. What do you do?",
    "Create `resource \"terraform_data\" \"app_version\" { input = var.app_version }` and set `replace_triggered_by = [terraform_data.app_version]`. The trigger must reference a managed resource, and `terraform_data` changes whenever its input changes."
   ]
  ],
  "tip": "Use `depends_on` only for hidden dependencies. Remember that `prevent_destroy` does not stop destruction if the whole resource block is removed, and that lifecycle values must be literals, not variables.",
  "check": [
   [
    "When should you use `depends_on`?",
    "Only when a resource depends on another in a way no attribute reference expresses, such as an app needing a permission policy to exist first."
   ],
   [
    "Which lifecycle setting would you use so Terraform stops reverting tags that another tool adds?",
    "`ignore_changes`, listing the tag attributes (or `tags`) to ignore."
   ],
   [
    "What does `replace_triggered_by` do?",
    "It forces replacement of the resource whenever any referenced managed resource or attribute changes."
   ],
   [
    "What is the default order when Terraform must replace a resource?",
    "Destroy the old object first, then create the new one; `create_before_destroy` reverses that."
   ]
  ]
 },
 {
  "t": "Custom conditions: variable `validation`, `precondition` and `postcondition`, and `check` blocks",
  "hook": "At Silver Pine Logistics, a new hire passes `environment = \"production\"` to the shared module instead of `\"prod\"`. Nothing complains. The plan runs, the naming logic quietly falls through to the dev defaults, and a tiny instance with no backups goes live for a warehouse system. Two days later, Ana reviews the incident and lists every assumption the module made silently: allowed environment names, x86 images only, a public DNS name on every web server, a health endpoint that should always answer. Which of those should stop a run cold, and which should only raise a hand and warn the team?",
  "simple": "Custom conditions are rules you write so Terraform can catch mistakes for you. Each rule has a test that must be true and a friendly message to show when it is not. A `validation` checks what someone typed in, like a form that refuses a birthday in the year 3000. A `precondition` checks something before building, like checking you have all the ingredients before you start cooking. A `postcondition` checks the result after building, like tasting the soup. A `check` block is a gentle reminder that runs at the end: it tells you something looks wrong but does not stop the work, like a smoke detector chirp about a low battery.",
  "body": [
   "Terraform lets you write your own rules about what counts as valid input and valid infrastructure. These custom conditions turn assumptions that used to live in someone's head, such as \"the instance type must be a t3 size\" or \"the AMI must be for x86\", into code that fails early with a clear message. Every custom condition has the same two parts: a `condition` expression that must evaluate to true, and an `error_message` that explains what went wrong in plain language. HashiCorp recommends writing error messages as complete sentences that tell the user what to fix. There are four kinds to know, and the exam often asks you to pick between them.",
   "The first kind is the `validation` block inside a `variable` block. It checks a value as soon as it is supplied, before Terraform plans any resources. If the condition is false, Terraform stops and prints your error message along with the variable's name, so the person who supplied the bad value sees exactly what to change. Functions such as `contains`, `can`, `regex` and `length` are common here; `can(regex(...))` is a typical way to test a string format without the regex error itself stopping the run. A variable can have several validation blocks, each checked independently. In current Terraform versions a validation can also refer to other variables, but its main job is still to check the input it belongs to.",
   "```hcl\nvariable \"env\" {\n  type = string\n  validation {\n    condition     = contains([\"dev\", \"stage\", \"prod\"], var.env)\n    error_message = \"env must be dev, stage or prod.\"\n  }\n}\n```",
   "The second and third kinds live in the `lifecycle` block of a resource or data source. A `precondition` is checked before Terraform creates or changes the object, so it guards assumptions about inputs and other objects. For example, a precondition on an instance might confirm that a looked-up AMI uses the `x86_64` architecture before Terraform tries to launch it. A `postcondition` is checked after the object is created, updated or read, and can refer to the object itself with `self`, for example to confirm that the new instance really received a public DNS name, or that a data source returned a VPC with DNS support enabled. Output blocks can also have a `precondition`, which stops a module from exporting a value that breaks a promise to its callers.",
   "Severity matters. A failed validation, precondition or postcondition is an error: it blocks the run and prevents dependent resources from proceeding. That is what you want for a true gate, because continuing would build something wrong or unsafe. Where possible, Terraform evaluates these conditions during plan, so problems surface before anything changes; when a condition depends on values only known after apply, it is checked during apply instead.",
   "The fourth kind is the top-level `check` block, added in Terraform 1.5. A check contains one or more `assert` blocks, each with a condition and an error message, and may contain its own scoped `data` block, such as an HTTP request to confirm a website answers with status 200. That scoped data source exists only inside the check, and if it fails, the failure is also reported as a warning. The key difference is severity: a failed check produces a warning, not an error, so the plan and apply still complete. Checks run as the last step of every plan and apply, which makes them good for ongoing health verification rather than hard gates. They express \"tell me if this stops being true\" rather than \"never build this\".",
   "How do you choose? Use `validation` to reject bad input values early, right at the boundary of a module. Use `precondition` when a resource must not be built unless something is true about its inputs or other objects. Use `postcondition` to confirm that what was built or read matches your expectations, especially when a later resource relies on that guarantee. Use `check` when you want to be told about a problem without stopping the workflow, for example to monitor that an endpoint is still reachable or that a certificate is not about to expire. In HCP Terraform, continuous validation, part of health assessments, re-runs checks and conditions on a schedule and reports failures in the workspace, even when nobody has started a run.",
   "Going back to the opening scenario, a validation on the environment variable would have rejected `\"production\"` immediately. A precondition would enforce the x86 image rule, a postcondition would confirm the public DNS name, and a check block would watch the health endpoint and warn the team without blocking unrelated changes. Each assumption gets the severity it deserves."
  ],
  "analogy": "Imagine an airport. Validation is the ticket desk refusing a booking with an invalid name. A precondition is the gate agent refusing to board if the plane has no fuel. A postcondition is the pilot confirming the landing gear is down after takeoff checks. A check block is the departure board showing a warning that the coffee shop is closed; it is worth knowing, but planes still fly. The analogy stops at ordering: Terraform tries to evaluate preconditions and postconditions during plan when the values are already known.",
  "mnemonic": "\"Very Picky People Check\" gives the four kinds in the order they act: Validation (input arrives), Precondition (before the object changes), Postcondition (after it changes or is read), Check (last step, warning only).",
  "terms": [
   [
    "validation block",
    "A rule inside a variable block with a condition and error_message that rejects bad input values before planning."
   ],
   [
    "precondition",
    "A lifecycle (or output) condition evaluated before an object is created or changed; failure is an error that halts the run."
   ],
   [
    "postcondition",
    "A lifecycle condition evaluated after an object is created, updated or read; it can use self to inspect the result."
   ],
   [
    "check block",
    "A top-level block of assert conditions, optionally with a scoped data source, whose failures produce warnings instead of errors."
   ],
   [
    "self",
    "Inside a postcondition, a reference to the resource or data source the condition belongs to."
   ]
  ],
  "example": "A platform team exposes a module with an instance_type variable. A validation block restricts it to approved sizes, a precondition confirms the chosen AMI is x86_64, and a check block pings the load balancer's health URL after every apply, warning the team if it stops answering without blocking unrelated changes.",
  "mistakes": [
   [
    "A failed check block assertion stops the apply.",
    "Check failures are warnings. The plan or apply completes, and the warning is reported."
   ],
   [
    "A precondition can use `self` to inspect the new resource.",
    "Only a postcondition can use `self`, because it runs after the object exists. A precondition checks inputs and other objects."
   ],
   [
    "Preconditions go directly inside the resource block body.",
    "They go inside the resource's `lifecycle` block (or inside an output block)."
   ],
   [
    "Validation blocks are written at the top level of the configuration.",
    "A validation block lives inside the `variable` block it checks."
   ]
  ],
  "tryit": [
   [
    "Your module reads a VPC with a data source and creates private DNS records in it. Records only work if the VPC has DNS support enabled. If it does not, nothing should be built that depends on it. Which condition do you write, and where?",
    "A `postcondition` in the data source's `lifecycle` block, such as `condition = self.enable_dns_support`. It checks the result of the read, can use `self`, and as an error it stops dependent resources from being created."
   ],
   [
    "The security team wants to know whenever a public site's TLS certificate will expire within 30 days, but releases must not be blocked by that. Which construct fits?",
    "A `check` block with a scoped data source that reads the certificate details and an `assert` on the expiry date. Failures appear as warnings, and with HCP Terraform continuous validation they can be reported on a schedule."
   ]
  ],
  "tip": "Remember severity: validation, precondition and postcondition failures are errors that stop the run, while a failed check block assertion is only a warning.",
  "check": [
   [
    "You want to be warned when a website stops returning HTTP 200, but you do not want applies to fail. Which construct fits?",
    "A check block with an assert (and optionally a scoped data source), because check failures are reported as warnings and do not block plan or apply."
   ],
   [
    "Which custom condition can refer to the resource's own attributes using self?",
    "A postcondition, because it runs after the object has been created, updated or read."
   ],
   [
    "Where do you put a precondition for a resource?",
    "Inside the resource's lifecycle block; output blocks can also hold a precondition."
   ]
  ]
 },
 {
  "t": "Sensitive data: `sensitive` values, ephemeral variables and resources, write-only arguments, secrets in state",
  "hook": "An auditor from the state banking regulator sits across from Jordan at Riverbend Savings and asks a simple question: where does the database password live? Jordan answers confidently that it is marked sensitive, so Terraform never shows it. The auditor nods and asks to see the state file. Jordan opens `terraform.tfstate` on the projector, searches for the database resource, and there it is, in plain text, for anyone with read access to the state bucket. The room goes quiet. What did `sensitive` actually promise, and what would have kept the password out of state entirely?",
  "simple": "Terraform often handles secrets like passwords. Marking a value `sensitive` is like putting a sticky note over it on your screen: it hides it when Terraform prints things, but the real value is still written in Terraform's notebook, called the state file. Newer features go further. An ephemeral value is like a note written in disappearing ink: Terraform can use it while it works, but it is never written into the notebook. A write-only argument is like a mail slot: Terraform pushes the secret through to the cloud service but keeps no copy. Even so, treat the notebook as private, because older parts can still write secrets into it.",
  "body": [
   "Infrastructure code constantly handles secrets: database passwords, API tokens, private keys and certificates. Terraform offers several tools for them, and the exam expects you to know exactly what each one protects and what it does not. The most important distinction is between hiding a value from screen output and keeping it out of stored files. The oldest feature, and the most misunderstood, is the `sensitive` flag.",
   "Setting `sensitive = true` on a variable or output tells Terraform to redact that value in plan and apply output, showing `(sensitive value)` instead. Sensitivity propagates: any expression built from a sensitive value is also treated as sensitive, and a root module output that uses one must itself be marked sensitive, or Terraform reports an error asking you to add the flag. Providers can also mark resource attributes as sensitive in their schemas, so a password argument is often redacted even if you never set the flag yourself. But redaction is only about display. The real value is still written to the state file in plain text, and `terraform output -json` or `terraform output -raw NAME` will show it to anyone who can run the command. Sensitive values can also end up in a saved plan file.",
   "Ephemeral values close that gap. A variable declared with `ephemeral = true` can be used during a run but is never saved in the plan file or the state. Ephemeral resources, declared with an `ephemeral` block instead of a `resource` block, fetch or generate something temporary on each run, such as a secret read from a secrets manager or a short-lived token, and Terraform does not persist them. You refer to them with the `ephemeral.` prefix, as in `ephemeral.random_password.db.result`. Because Terraform must never store them, ephemeral values can only be used in places that do not persist them: provider configuration blocks, other ephemeral contexts such as locals and ephemeral variables, provisioner and connection blocks, and write-only arguments. Child modules can also mark outputs as ephemeral to pass them along to a caller. If you try to put an ephemeral value into a normal resource argument, Terraform reports an error.",
   "Write-only arguments are the matching piece on the resource side. A provider can offer an argument, often with a name ending in `_wo`, that accepts a value, including an ephemeral one, and sends it to the API but never records it in the plan or state. Because Terraform cannot compare a value it never stored, it cannot detect when the secret changes. For that reason these arguments usually come with a companion version argument; you increase the version number when you want Terraform to send a new value, and the change in version is what shows up in the plan.",
   "```hcl\nephemeral \"random_password\" \"db\" {\n  length = 20\n}\n\nresource \"aws_db_instance\" \"main\" {\n  # ...other arguments...\n  password_wo         = ephemeral.random_password.db.result\n  password_wo_version = 1\n}\n```",
   "In this example the password is generated during the run, sent to the database API through the write-only argument, and never written to state. To rotate it, you bump `password_wo_version` to 2. Note that in a real deployment you usually also need a way for the application to get the password, for example by storing it in a secrets manager, because Terraform itself keeps no copy.",
   "Even with these features, treat every state file as sensitive. Older providers, data sources and ordinary resource attributes still store secrets in state, and a state file also reveals your architecture: resource names, IP addresses and account identifiers. Protect state with an encrypted remote backend, strict access control, and audit logging where your backend offers it. Never commit state to version control, which is why `.gitignore` files for Terraform projects usually exclude `*.tfstate` and `*.tfstate.*`. Keep secrets out of `.tf` and `.tfvars` files that go into Git, and prefer environment variables (`TF_VAR_name`), a secrets manager, or ephemeral resources for supplying them.",
   "For the exam, line the features up by what they protect. `sensitive` protects console output only. Ephemeral variables and resources keep values out of plan and state. Write-only arguments let a resource receive a secret without storing it. And none of these replaces securing the state backend itself, because anything that does end up in state is stored in plain text."
  ],
  "analogy": "`sensitive` is like a blur filter on a video call: viewers cannot read the document on your desk, but the paper is still sitting there for anyone who walks into the room. Ephemeral values are a whispered message that nobody writes down. A write-only argument is a deposit slot at a bank: the money goes in, but the slot keeps no record you can read back, so you need a receipt number, the version argument, to show that a new deposit happened.",
  "terms": [
   [
    "sensitive = true",
    "Marks a variable or output so its value is redacted in CLI output; the value is still stored in state."
   ],
   [
    "Ephemeral variable",
    "A variable declared with ephemeral = true whose value is available during a run but never written to plan or state."
   ],
   [
    "Ephemeral resource",
    "An ephemeral block that obtains a temporary value (such as a secret or token) each run without persisting it."
   ],
   [
    "Write-only argument",
    "A resource argument that accepts a value and passes it to the provider but never stores it in plan or state, usually paired with a version argument."
   ],
   [
    "State file",
    "Terraform's record of managed objects and their attributes, stored in plain text and therefore sensitive."
   ]
  ],
  "example": "A team marked its database password variable sensitive and assumed it was safe, until an auditor opened terraform.tfstate and found the password in plain text. They switched to an ephemeral resource that reads the password from their secrets manager and passes it through the provider's write-only password argument, so the state no longer contains it.",
  "mistakes": [
   [
    "Marking a value `sensitive` encrypts it in state.",
    "`sensitive` only redacts display output. The value is stored in state in plain text."
   ],
   [
    "`terraform output` can never reveal a sensitive output.",
    "`terraform output -json` or `-raw NAME` prints the real value to anyone allowed to run it."
   ],
   [
    "You can pass an ephemeral value into any resource argument.",
    "Ephemeral values may only go to non-persisted places: provider blocks, other ephemeral contexts, provisioner and connection blocks, and write-only arguments."
   ],
   [
    "Terraform detects when a write-only secret changes, just like any other argument.",
    "It never stores the value, so it cannot compare it. You signal a new value by changing the companion version argument."
   ]
  ],
  "tryit": [
   [
    "Your team configures the cloud provider with an API token that a secrets manager issues for one hour. Security insists the token must never appear in any saved plan or state. How should the token reach the provider block?",
    "Read the token with an ephemeral resource (or pass it as an ephemeral variable) and reference it in the provider configuration block. Provider blocks are a non-persisted context, so the token is used during the run and never written to plan or state."
   ]
  ],
  "tip": "The exam's favorite trap: sensitive only hides values from CLI output. It does not encrypt them or keep them out of the state file.",
  "check": [
   [
    "Does marking an output sensitive keep it out of terraform.tfstate?",
    "No. It only redacts the value in plan, apply and default output display; the value is still stored in state in plain text."
   ],
   [
    "Why do write-only arguments usually have a companion version argument?",
    "Terraform never stores the write-only value, so it cannot detect a change; bumping the version tells Terraform to send the new value."
   ],
   [
    "Name two places where an ephemeral value may be used.",
    "Examples include a provider configuration block, a write-only argument, another ephemeral resource or variable, and provisioner or connection blocks."
   ]
  ]
 },
 {
  "t": "Secrets management with HashiCorp Vault and the Vault provider",
  "hook": "At Granite Peak Insurance, Theo finds a cloud access key pasted into a `terraform.tfvars` file during a routine review. It has full administrator rights, it is three years old, and it has been copied into at least four laptops and one old CI system. Nobody knows who created it. Rotating it will break every pipeline at once. His manager asks for a plan by Friday so this never happens again. The company already runs HashiCorp Vault for application secrets. Can Terraform get the credentials it needs from Vault, just in time, without anything long-lived sitting in a file?",
  "simple": "HashiCorp Vault is like a bank vault for passwords and keys. Instead of writing secrets in files, you keep them in Vault, which checks who is asking, writes down every visit, and can even create fresh keys that expire on their own, like a hotel key card that stops working at checkout. Terraform talks to Vault through the Vault provider, a plug-in that knows how to ask Vault for things. Terraform can ask for a stored password or for a brand-new short-lived cloud key at the start of a run. One catch: if Terraform reads a secret the ordinary way, it writes a copy into its own records, so those records need protecting too.",
  "body": [
   "HashiCorp Vault is a secrets management system. It stores secrets centrally, controls who can read them with policies, records every access in audit logs and, most importantly for infrastructure work, can generate dynamic secrets: credentials created on demand for a single use or a short lease and revoked automatically afterwards. Pairing Terraform with Vault means your configuration never needs a long-lived cloud key or database password typed into a file. The exam does not expect you to be a Vault administrator, but it does expect you to understand how Terraform consumes secrets from Vault and what risks remain.",
   "Terraform talks to Vault through the Vault provider, configured like any other provider with the Vault server address and a way to authenticate. The address and token are usually supplied through environment variables such as `VAULT_ADDR` and `VAULT_TOKEN` rather than written into code, or through an auth method such as AppRole or a cloud identity, so the configuration itself contains no credentials. Once configured, the provider can do two jobs. It can manage Vault itself as infrastructure, creating secrets engine mounts, policies, auth methods and roles with resources, so Vault's own setup is reviewed and versioned like everything else. And it can read secrets out of Vault for use elsewhere in your configuration.",
   "Reading a static secret from a key/value (KV) secrets engine is done with a data source, for example `vault_kv_secret_v2` for version 2 of the KV engine, or the older generic secret data source. You then reference an attribute of that data source in another resource or provider block. Static secrets are values a person stored in Vault, such as a third-party API key, and they stay the same until someone changes them. The identity Terraform uses must have a Vault policy that allows reading that path; if it does not, the plan fails with a permission denied error from Vault, which is a useful reminder that access is controlled centrally rather than by whoever happens to hold a file.",
   "```hcl\ndata \"vault_kv_secret_v2\" \"db\" {\n  mount = \"secret\"\n  name  = \"app/db\"\n}\n\n# later: data.vault_kv_secret_v2.db.data[\"password\"]\n```",
   "Dynamic secrets work differently. Vault secrets engines for clouds and databases can mint credentials on request. For example, the Vault provider's AWS access credentials data source asks Vault's AWS secrets engine to create short-lived AWS keys, which you can feed into the AWS provider block for the rest of the run. Every secret Vault issues this way has a lease, the length of time it stays valid. When the lease expires, Vault revokes the keys, so a leaked credential has a short useful life, and every issuance appears in Vault's audit log tied to the identity that asked for it.",
   "There is an important caveat that the exam likes to test: values read through a data source are stored in the Terraform state file, just like any other attribute. Vault protects the secret at rest inside Vault, but once Terraform reads it into a normal data source, your state becomes another place the secret lives, in plain text. Mitigations work together. Protect state with an encrypted, access-controlled remote backend. Prefer short-lived dynamic secrets, so that any copy in state quickly becomes useless. And where the provider supports it, use ephemeral resources instead of data sources, so the secret is used during the run but never persisted to plan or state.",
   "In HCP Terraform you can go further with dynamic provider credentials, where each run authenticates to Vault using a signed workload identity token instead of a stored Vault token. The workspace no longer holds any long-lived Vault credential at all; trust is established between HCP Terraform and Vault in advance, and each run proves who it is with a token that expires quickly. Vault can then issue the run its cloud credentials, completing a chain with no static secret anywhere.",
   "Whatever the pattern, the principle is the same: Vault is the single source of truth for secrets, Terraform fetches them just in time, and nothing secret is hard-coded in your configuration or committed to version control. In the opening scenario, Theo's plan would remove the static key, have pipelines authenticate to Vault, request short-lived cloud credentials per run, and lock down the state backend, since anything read through a normal data source still lands there."
  ],
  "analogy": "Vault with dynamic secrets is like a hotel front desk issuing key cards. Instead of copying one master key for every guest, the desk prints a card that opens one room and expires at checkout, and it logs every card it issues. Terraform is a guest who picks up a card at the start of each stay. The analogy stops at the receipt: when Terraform reads a secret through a data source, it keeps a photocopy of the card in its state file, so that file must be guarded, even though the card itself soon stops working.",
  "terms": [
   [
    "HashiCorp Vault",
    "A secrets management tool that stores, controls access to, audits and dynamically generates secrets."
   ],
   [
    "Dynamic secret",
    "A credential Vault generates on demand with a lease and revokes automatically when the lease expires."
   ],
   [
    "Static secret",
    "A value stored in Vault, such as in the KV engine, that stays the same until someone changes it."
   ],
   [
    "Vault provider",
    "The Terraform provider used to configure Vault and to read secrets from it through data sources or ephemeral resources."
   ],
   [
    "Lease",
    "The time period a Vault secret is valid for before it must be renewed or is revoked."
   ],
   [
    "Dynamic provider credentials",
    "An HCP Terraform feature where runs authenticate with short-lived workload identity tokens instead of stored credentials."
   ]
  ],
  "example": "Instead of storing an AWS access key in HCP Terraform variables, a team configures the Vault AWS secrets engine. Their configuration reads short-lived AWS credentials from Vault at the start of each run and passes them into the AWS provider block; the keys expire shortly after the run, so even the copy in state is quickly worthless.",
  "mistakes": [
   [
    "Reading a secret from Vault keeps it out of Terraform state.",
    "A normal data source stores what it reads in state. Protect state, prefer short-lived secrets, or use ephemeral resources where supported."
   ],
   [
    "Put the Vault token in the provider block so the configuration is self-contained.",
    "Supply it through `VAULT_TOKEN`, an auth method, or HCP Terraform dynamic credentials, never hard-coded in files committed to version control."
   ],
   [
    "The Vault provider can only read secrets.",
    "It can also manage Vault itself: mounts, policies, auth methods and roles."
   ],
   [
    "Dynamic secrets are just static secrets with a different name.",
    "Dynamic secrets are generated on request with a lease and revoked automatically; static secrets stay until changed."
   ]
  ],
  "tryit": [
   [
    "A security review finds that your Terraform state contains a third-party API key read from Vault's KV engine with `vault_kv_secret_v2`. The key cannot be made short-lived because the vendor only issues static keys. What can you do to reduce exposure?",
    "Restrict and encrypt the state backend and audit access to it, since anything read by a normal data source lands in state. If the Vault provider offers an ephemeral resource for KV secrets in your version, switch to it and pass the value only to non-persisted places such as a write-only argument or provider block, so it never reaches state."
   ]
  ],
  "tip": "Secrets read from Vault through a normal data source end up in Terraform state. Vault does not change that; protect the state and prefer short-lived or ephemeral secrets.",
  "check": [
   [
    "Why are dynamic secrets safer than static ones for Terraform runs?",
    "They are created on demand with a short lease and revoked automatically, so a leaked copy (including one in state) stops working soon after the run."
   ],
   [
    "How should the Vault token for the Vault provider usually be supplied?",
    "Through an environment variable such as VAULT_TOKEN or an auth method, not hard-coded in the configuration."
   ],
   [
    "What two broad jobs can the Vault provider perform?",
    "Managing Vault's own configuration (mounts, policies, auth methods, roles) and reading secrets from Vault for use in other resources or providers."
   ]
  ]
 },
 {
  "t": "Root module vs child modules; a module is any directory of .tf files",
  "hook": "Rosa joins the platform team at Maple Street Media on a Wednesday and clones the infrastructure repository. There are folders called `environments/prod`, `environments/dev` and `modules/network`, each full of `.tf` files. Her first ticket says to add a subnet in production. She opens `modules/network`, adds the subnet, and runs `terraform plan` right there. It asks her for variables she has never heard of and wants to create an entire new network from scratch. Her teammate winces and asks which directory she ran it from. What exactly is a module, and why does the folder you stand in change everything?",
  "simple": "In Terraform, a module is just a folder of Terraform files. Nothing special has to be written to make it one; the folder itself is the module. The folder where you type Terraform commands is the root module, the starting point. Other folders that the root module asks to use are child modules, like recipes that a main menu refers to: \"for dessert, follow the pie recipe.\" The same pie recipe can be cooked on its own for practice, or used as one part of a full dinner. Each recipe keeps its own ingredients to itself and only shares what it lists as inputs and results.",
  "body": [
   "In Terraform, a module is simply a set of `.tf` (and `.tf.json`) files kept together in one directory. There is no special declaration that makes a folder a module; the directory itself is the module. That means every Terraform configuration you have written so far was already a module, even if you never called it one. This simple definition is worth memorizing, because exam questions sometimes try to suggest that a module needs a manifest file, a registry entry or a special block.",
   "The module you run Terraform commands in is called the root module. When you type `terraform plan` in a working directory, Terraform reads all the `.tf` files in that directory, but not in its subdirectories, and treats them as one configuration. File names do not matter to Terraform; it merges every file in the directory, so splitting code into `main.tf`, `variables.tf` and `outputs.tf` is a convention for humans, not a requirement. You could put everything in one file, or name files after the services they hold, and Terraform would build exactly the same graph. The root module is also where backend configuration and provider configuration normally live, and it is the only module whose outputs are shown at the end of an apply.",
   "A child module is any module that another module calls with a `module` block. The root module can call child modules, and those child modules can call their own children, forming a tree. Child modules can come from a subdirectory of your project, from the public Terraform Registry, from a private registry or from a Git repository. Importantly, a subdirectory is not loaded just because it exists; Terraform only uses it if some module block points at it. The same directory of code can be a root module in one situation, when you run Terraform inside it to test it, and a child module in another, when someone calls it from their configuration. That is exactly what tripped up the new engineer in the opening scenario: running plan inside `modules/network` made it the root module, with its own empty state and its own required variables.",
   "Why use modules at all? They let you package a pattern once, such as a network with public and private subnets, route tables and a gateway, and reuse it in many places with different inputs. They create an abstraction: callers see a small set of input variables and outputs instead of dozens of resources and their wiring. And they encourage consistency, because every team that uses the approved module builds the same well-reviewed pattern with the same tagging and security settings. The trade-off is indirection, since a reader has to open another directory to see what is built, so good modules are focused and well documented rather than wrapping a single resource for no benefit. HashiCorp also advises keeping module trees relatively flat instead of nesting many layers deep.",
   "Addresses reflect the tree. A resource in the root module is addressed like `aws_instance.web`, while a resource inside a child module called `network` is addressed as `module.network.aws_subnet.private`. If that child module calls its own child named `nat`, a resource there becomes `module.network.module.nat.aws_nat_gateway.this`. You will see these addresses in plan output, in commands such as `terraform state list` and `terraform state show`, and when targeting or moving resources, so being able to read them tells you exactly where in the module tree a resource lives.",
   "Each module has its own namespace. Variables, locals and resources in a child module are not visible to its parent, and the parent's values are not visible to the child, except through the input variables and outputs the module declares. If the root module needs the ID of a subnet built inside the network module, the network module must declare an output for it, and the root refers to `module.network.private_subnet_id`. Likewise, the child cannot read `var.env` from the root unless the root passes it in as an argument. That encapsulation is what makes modules safe to reuse: a module's internals can change without breaking callers, as long as its inputs and outputs stay the same.",
   "For the exam, keep three facts straight. A module is any directory of Terraform configuration files. The root module is the one in your current working directory, the top of the tree. Child modules are only included when called with a `module` block, and they communicate with their parent only through variables and outputs."
  ],
  "analogy": "A module tree is like a company org chart. The root module is the head office where decisions start. Child modules are departments, each with its own internal files that other departments cannot open. Information moves only through official channels: requests go in as input variables, and reports come out as outputs. A department can also be run on its own for a trial, which makes it the head office for that moment. The analogy stops at people: a module has no memory of its own beyond what is in state.",
  "terms": [
   [
    "Module",
    "Any directory containing Terraform configuration files; Terraform treats all .tf files in it as one unit."
   ],
   [
    "Root module",
    "The module in the working directory where Terraform commands are run; the top of the module tree."
   ],
   [
    "Child module",
    "A module called by another module through a module block."
   ],
   [
    "Module address",
    "The path to a resource through the module tree, such as module.network.aws_subnet.private."
   ],
   [
    "Module output",
    "A value a module declares with an output block so its caller can use it, referenced as module.NAME.OUTPUT."
   ]
  ],
  "example": "A company keeps a modules/vpc directory. In its CI tests, engineers run terraform apply inside that directory, so it acts as a root module. In production, the environments/prod configuration calls it with a module block named vpc, so there it is a child module and its resources appear as module.vpc.aws_vpc.this.",
  "mistakes": [
   [
    "A directory needs a special file or block to become a module.",
    "Any directory of Terraform configuration files is a module."
   ],
   [
    "Terraform automatically loads `.tf` files in subdirectories of the working directory.",
    "It reads only the working directory. Subdirectories are used only when a module block calls them."
   ],
   [
    "The file names `main.tf`, `variables.tf` and `outputs.tf` are required.",
    "They are conventions. Terraform merges all `.tf` files in a directory regardless of name."
   ],
   [
    "A child module can read the root module's variables directly.",
    "Modules have separate namespaces. Values pass in only through input variables and come out only through outputs."
   ]
  ],
  "tryit": [
   [
    "Your root module calls `module \"storage\"` from `./modules/storage`, which creates a bucket named `aws_s3_bucket.logs`. Another resource in the root needs the bucket's ARN. Someone writes `aws_s3_bucket.logs.arn` in the root and gets an error. What is wrong and how do you fix it?",
    "The bucket lives in the child module's namespace, so the root cannot reference it directly. Add `output \"logs_arn\" { value = aws_s3_bucket.logs.arn }` in the storage module and use `module.storage.logs_arn` in the root."
   ]
  ],
  "tip": "If a question asks what makes a directory a module, the answer is simply that it contains Terraform configuration files; the root module is whichever one you run commands from.",
  "check": [
   [
    "Does Terraform read .tf files in subdirectories of the working directory automatically?",
    "No. It reads only the files in the working directory; subdirectories are used only if called as child modules."
   ],
   [
    "What is the address of a resource aws_s3_bucket.logs inside a child module named storage?",
    "module.storage.aws_s3_bucket.logs."
   ],
   [
    "Can the same directory be both a root module and a child module?",
    "Yes. It is a root module when you run Terraform inside it, and a child module when another configuration calls it with a module block."
   ]
  ]
 },
 {
  "t": "Module sources: local paths (`./` or `../`), the public Terraform Registry, private registries, Git and HTTP URLs",
  "hook": "Friday afternoon at Coastal Rail Services, Kenji copies a module block from the wiki into his configuration, changes `source = \"./modules/network\"` to `source = \"modules/network\"` because the dot looked like a typo, and runs `terraform init`. Instead of reading the folder sitting right next to his code, Terraform reaches out to a registry and fails with a message about a module that cannot be found. Meanwhile, a colleague's Git-sourced module silently picked up a breaking change from a branch overnight. Two small strings, two very different problems. How does Terraform decide where a module's code comes from?",
  "simple": "Every time you use a module, you must tell Terraform where to find its code, like giving a delivery driver an address. The format of the address tells Terraform what kind of trip to make. An address starting with `./` or `../` means \"it is right here in this building\", so nothing is downloaded. A short three-part name means \"pick it up from the public module library\". The same name with a company web address in front means \"pick it up from our private library\". A Git address means \"fetch it from this code repository\", and you can name an exact version so you always get the same thing.",
  "body": [
   "Every `module` block needs a `source` argument that tells Terraform where to find the module's code. The format of the source string decides how Terraform fetches it, so you must be able to recognize each form on sight. The source must be a literal string; you cannot build it from variables or other expressions, because Terraform resolves and downloads module sources during `terraform init`, before variables are evaluated.",
   "Local paths start with `./` or `../`, such as `source = \"./modules/network\"` or `source = \"../shared/dns\"`. The leading dot is required, because a string without it is interpreted as a registry address; that is exactly the failure in the opening scenario. Local modules are not downloaded or copied into the `.terraform` directory; Terraform reads them straight from disk, so changes to their code take effect on the next plan without reinstalling. They cannot have a `version` argument, since they are simply part of your code and are versioned along with the repository that contains them. Relative paths are resolved from the directory of the module that contains the `module` block, not from wherever you happen to run the command.",
   "Public Terraform Registry sources use the form `NAMESPACE/NAME/PROVIDER`, for example `terraform-aws-modules/vpc/aws`, where the last part names the main provider the module targets. Terraform downloads them during `terraform init` into the `.terraform/modules` directory, and you should pin them with a `version` constraint such as `~> 5.0` so that a new major release cannot change your infrastructure unexpectedly. Private registry sources add the registry hostname in front: `HOSTNAME/NAMESPACE/NAME/PROVIDER`. HCP Terraform's private registry uses `app.terraform.io/ORG/NAME/PROVIDER`, where ORG is your organization name. Private registries give an organization a curated catalog of approved modules with the same versioning features as the public registry, plus access control so only your organization can use them.",
   "Version control sources let you pull a module from a Git repository. Terraform recognizes shorthand such as `github.com/org/repo` and generic Git addresses with a `git::` prefix, such as `git::ssh://git@example.com/org/repo.git`. A double slash selects a subdirectory inside the repository, as in `repo.git//modules/vpc`, which is how one repository can hold several modules. A `?ref=` query selects a branch, tag or commit, and pinning to a tag or a commit SHA is what makes the module reproducible. Git sources do not use the `version` argument; `ref` does that job. Terraform also supports Mercurial repositories, archive sources such as an HTTP or HTTPS address pointing to a zip or tar file, and objects in S3 and GCS buckets using the `s3::` and `gcs::` prefixes.",
   "```hcl\nmodule \"vpc\" {\n  source  = \"terraform-aws-modules/vpc/aws\"\n  version = \"~> 5.0\"\n}\n\nmodule \"app\" {\n  source = \"../modules/app\"\n}\n\nmodule \"dns\" {\n  source = \"git::ssh://git@example.com/infra/dns.git?ref=v1.2.0\"\n}\n```",
   "Whenever you add a module block or change its `source` or `version`, you must run `terraform init` again so Terraform can install the new code. If you skip it, plan reports that the module is not installed and tells you to run init. For remote sources, you can also run `terraform init -upgrade` to fetch the newest version allowed by your constraints. Authentication for private Git repositories and private registries is handled outside the source string, for example with SSH keys, a Git credential helper, or a token configured for the registry hostname, so credentials do not need to appear in the configuration.",
   "Choosing a source is about trust and change control. Local paths suit modules that live in the same repository and change together with the code that calls them. The public registry offers community and partner modules, which can save a lot of work, but you should review them before use and pin versions, just as you would any third-party dependency. A private registry is the organizational answer for sharing approved modules across many teams with discoverability and versioning. Git sources work anywhere you can host a repository, but you must pin a tag or commit with `ref` to get repeatable builds; pointing at a branch means the code can change under you, which is exactly what happened to the colleague in the opening scenario.",
   "For the exam, read the shape of the string first. A leading `./` or `../` means local, three slash-separated parts mean public registry, a hostname followed by three parts means private registry, and a `git::` prefix, a recognized Git host shorthand, or a `?ref=` query means a version control source."
  ],
  "analogy": "Module sources are like shipping addresses. `./modules/network` is the room down the hall, so you just walk over. `terraform-aws-modules/vpc/aws` is a well-known public warehouse identified by a short code. Adding a hostname is a private warehouse only your company can enter. A Git address is a supplier's storeroom, and `?ref=v1.2.0` is the exact shelf label. The analogy stops at the leading dot: a missing `./` does not just misdirect a parcel, it makes Terraform treat a hallway as a warehouse code.",
  "terms": [
   [
    "source argument",
    "The required module block argument that tells Terraform where to find the module code."
   ],
   [
    "Registry source",
    "A module address in the form NAMESPACE/NAME/PROVIDER, prefixed with a hostname for private registries."
   ],
   [
    "Local path source",
    "A module path beginning with ./ or ../ that Terraform reads directly from disk without downloading."
   ],
   [
    "Double-slash subdirectory",
    "The // syntax in a source address that selects a subdirectory within a downloaded repository or archive."
   ],
   [
    "ref",
    "A query parameter on a Git source that pins a branch, tag or commit."
   ]
  ],
  "example": "An engineer writes source = \"modules/network\" and Terraform tries to download it from the public registry and fails. Changing it to source = \"./modules/network\" makes Terraform treat it as a local path and read the code from the repository.",
  "mistakes": [
   [
    "`modules/network` and `./modules/network` mean the same thing.",
    "Without the leading dot, Terraform treats the string as a registry address. Local paths must start with `./` or `../`."
   ],
   [
    "You can pin a Git or local module with the `version` argument.",
    "`version` applies to registry sources. Pin Git sources with `?ref=`; local modules are versioned with the repository."
   ],
   [
    "The source can be set from a variable so each environment uses a different module.",
    "Source must be a literal string because it is resolved during init, before variables are evaluated."
   ],
   [
    "Pointing a Git source at a branch is fine for production.",
    "A branch can change at any time. Pin a tag or commit with `ref` for repeatable builds."
   ]
  ],
  "tryit": [
   [
    "Your organization stores several modules in one Git repository under `modules/vpc`, `modules/dns` and `modules/iam`. You want the DNS module exactly as it was in release tag v2.3.0, fetched over SSH from `git@example.com:infra/platform.git`. How do you write the source?",
    "`source = \"git::ssh://git@example.com/infra/platform.git//modules/dns?ref=v2.3.0\"`. The `git::` prefix forces Git, the double slash selects the subdirectory, and `?ref=v2.3.0` pins the tag. Run `terraform init` afterwards to install it."
   ]
  ],
  "tip": "Know the address shapes: ./ or ../ means local, three slash-separated parts mean public registry, a hostname plus three parts means private registry, and git:: or ?ref= means a Git source.",
  "check": [
   [
    "What is the format of a private registry module source?",
    "HOSTNAME/NAMESPACE/NAME/PROVIDER, for example app.terraform.io/example-org/vpc/aws."
   ],
   [
    "Why must a local module path start with ./ or ../?",
    "Without the leading dot, Terraform interprets the string as a registry address instead of a local directory."
   ],
   [
    "Can the source argument be set from a variable?",
    "No. It must be a literal string, because Terraform resolves sources during init before variables are evaluated."
   ],
   [
    "Do local path modules need `terraform init` to pick up code edits?",
    "No. Local modules are read directly from disk, so edits take effect on the next plan; you run init when you add the module block or change its source."
   ]
  ]
 },
 {
  "t": "Calling a module with a `module` block and passing input variables",
  "hook": "At Hilltop Community College, Imani has been handed a well-tested server module and asked to stand up two new environments for the registration system before enrollment opens Monday. She writes her first `module` block, runs `terraform plan`, and gets two errors at once: one says an argument named `size` is not expected here, and the other says a required argument `subnet_id` is missing. She checks the module folder and sees a file full of `variable` blocks. The clock is ticking. How do the arguments in her module block connect to the code inside the module, and what else does she need to run?",
  "simple": "Using a module is like ordering from a menu. The module block is your order slip. You give the order a nickname so you can refer to it later, say where the recipe lives, and then fill in the choices the kitchen allows, such as size or color. The kitchen decides which choices exist: each one is a variable written inside the module. If you ask for something not on the menu, the order is rejected. If you skip a choice that has no house default, the kitchen asks you to fill it in. Choices with a default can be left blank.",
  "body": [
   "Using a module in your configuration is called calling it, and you do it with a `module` block. The label after `module` is a local name you choose, such as `module \"web_server\"`. That name is how you refer to this particular instance of the module elsewhere, for example `module.web_server.instance_id`, and it becomes part of the address of every resource the module creates. You can call the same module source several times under different names to build several independent copies with different settings, and each copy gets its own resources in state.",
   "Inside the block, a few arguments are reserved by Terraform itself. `source` is required and says where the code comes from. `version` pins a registry module release and is only valid for registry sources. The meta-arguments `count`, `for_each`, `providers` and `depends_on` work on module blocks much as they do on resources: `count` and `for_each` create several instances of the whole module, `providers` passes specific provider configurations into the child, such as a provider aliased to a second region, and `depends_on` declares a hidden dependency. Every other argument you write in the block sets one of the module's input variables, using the variable's name as the argument name.",
   "```hcl\nmodule \"web_server\" {\n  source        = \"./modules/server\"\n  instance_type = \"t3.small\"\n  subnet_id     = aws_subnet.public.id\n  tags          = { team = \"web\" }\n}\n```",
   "In this example the child module at `./modules/server` must declare `variable \"instance_type\"`, `variable \"subnet_id\"` and `variable \"tags\"`. The mapping is one-to-one, and Terraform checks it strictly. If you pass an argument the module does not declare, Terraform reports an unsupported argument error, which is the first error in the opening scenario: the module calls its input `instance_type`, not `size`. If the module declares a variable without a `default` and you do not pass it, Terraform reports that a required argument is missing, which is the second error. Variables with defaults are optional, and you only set them when you want a different value. Terraform also checks each value against the variable's `type` constraint, converting it where a safe conversion exists, and runs any `validation` rules the module author wrote, so bad input fails at the module boundary with a clear message.",
   "Reading a module's interface is therefore the first step before calling it. For a registry module, the registry page lists inputs, their types, defaults and descriptions, and the outputs it exposes. For a local module, open its variable declarations, conventionally in `variables.tf`, and look for any declaration without a `default`; those are the inputs you must supply. Well-written variables include a `description`, which is what documentation tools and the registry display.",
   "Input values can be any expression: literals, variables of the calling module such as `var.env`, resource attributes such as `aws_subnet.public.id`, or outputs of other modules such as `module.network.subnet_ids`. When you pass a resource attribute or another module's output, Terraform automatically records a dependency, so it creates the upstream objects first. Chaining modules this way, with one module's outputs feeding another's inputs, is how larger configurations are composed. You rarely need `depends_on` on a module; use it only for hidden dependencies Terraform cannot see from references, because a module-level `depends_on` makes every resource in the module wait and can make more values unknown during plan.",
   "After adding a module block or changing its source or version, you must run `terraform init` (or `terraform get`, which only installs modules) so Terraform installs the module code. Changing only the input values does not need a new init; just plan and apply. The plan will show the child module's resources with addresses that begin with `module.web_server.`, such as `module.web_server.aws_instance.this`, which is a quick way to confirm your call worked the way you expected. If you later rename the module block's label, those addresses change too, so you would add a `moved` block to avoid Terraform destroying and re-creating the resources.",
   "Back in the opening scenario, Imani renames `size` to `instance_type`, adds `subnet_id = aws_subnet.public.id`, runs `terraform init` because the module block is new, and the plan shows the expected resources under `module.registration_dev` and `module.registration_prod`. For the exam, remember the pattern: the label names the instance, `source` and the meta-arguments are handled by Terraform, every other argument must match a declared variable, required variables must be set, and a new or re-sourced module needs `terraform init` before it can be planned."
  ],
  "analogy": "A module block is like a form for ordering custom business cards. The print shop's form lists the fields it accepts: name, title, phone. You fill those in; you cannot add a field called \"favorite color\", and the shop will not print without the required name. Fields with a default, such as paper type, can be left alone. The nickname at the top of the order, the module label, is how you track that particular batch. The analogy stops at timing: you only need to re-run `terraform init` when the form itself changes source, not when you change what you write in it.",
  "terms": [
   [
    "module block",
    "A block that calls a child module, giving it a local name, a source and values for its input variables."
   ],
   [
    "Input variable",
    "A variable declared in the child module that callers set as an argument in the module block."
   ],
   [
    "Required input",
    "A module variable without a default; callers must supply it or Terraform reports an error."
   ],
   [
    "Meta-arguments",
    "Arguments Terraform itself handles on a module block: source, version, count, for_each, providers and depends_on."
   ],
   [
    "providers (module argument)",
    "A map that passes specific provider configurations, such as aliased providers, into a child module."
   ]
  ],
  "example": "A team calls the same ./modules/server module twice, as module \"web\" and module \"api\", passing different instance_type and subnet_id values. Terraform builds two independent sets of resources, addressed as module.web.aws_instance.this and module.api.aws_instance.this.",
  "mistakes": [
   [
    "You can pass any argument you like to a module block and the module will ignore extras.",
    "Every non-meta argument must match a variable declared in the child module; an undeclared argument is an error."
   ],
   [
    "You must run `terraform init` every time you change a value passed to a module.",
    "Init is needed when you add a module block or change its source or version. Changing input values only needs plan and apply."
   ],
   [
    "Modules always need `depends_on` to make sure their inputs exist first.",
    "Passing a resource attribute or module output creates an implicit dependency. Use `depends_on` only for hidden dependencies."
   ],
   [
    "The `version` argument works for every module source.",
    "`version` applies only to registry sources; Git sources use `?ref=` and local paths have no version."
   ]
  ],
  "tryit": [
   [
    "Your network module outputs `private_subnet_ids`, and your database module needs a list of subnet IDs in a variable named `subnet_ids`. A teammate proposes adding `depends_on = [module.network]` to the database module block plus hard-coding the IDs after the first apply. What do you do instead?",
    "Pass `subnet_ids = module.network.private_subnet_ids` in the database module block. The reference creates an implicit dependency so the network is built first, and the IDs flow automatically without hard-coding or a module-wide `depends_on`."
   ],
   [
    "You need the same server module deployed in two AWS regions. You have a default AWS provider and one aliased as `aws.west`. How do you make the second call use the west region?",
    "In the second module block, set `providers = { aws = aws.west }`. The `providers` meta-argument maps the child's default `aws` provider to the aliased configuration."
   ]
  ],
  "tip": "Arguments in a module block (other than the meta-arguments) map one-to-one to the child's variable blocks; a missing required variable or an undeclared argument are both errors.",
  "check": [
   [
    "You add a new module block. What must you run before terraform plan?",
    "terraform init (or terraform get) to install the module."
   ],
   [
    "What happens if you set an argument in a module block that the child module does not declare as a variable?",
    "Terraform reports an error for an unsupported argument."
   ],
   [
    "How do you refer to an output named `vpc_id` from a module block labeled `network`?",
    "`module.network.vpc_id`."
   ]
  ]
 },
 {
  "t": "Variable scope: child modules only see values passed in; outputs are read as `module.NAME.OUTPUT`",
  "hook": "It is Thursday afternoon at Lantern Freight, and Priya has just wired a new network module into the root configuration. The plan fails with an error she does not expect: a reference to an undeclared input variable named region. She is sure the root module declares `variable \"region\"`, and she even exported `TF_VAR_region` in her shell. A few minutes later her teammate Omar asks why the VPC ID he needs never shows up when he runs `terraform output`, even though the network module clearly has a `vpc_id` output. Both problems have the same root cause. What invisible wall sits between a root module and the modules it calls?",
  "simple": "Think of each Terraform module as a separate room with a closed door. Things inside one room cannot be seen from another room. If the root configuration (the top-level folder you run Terraform in) wants a child module (a module it calls) to know something, it has to hand that value through the door on purpose, as an input. If the child wants to give something back, it has to hand it out on purpose, as an output, and the root reads it by writing module, then the module's name, then the output's name. Nothing slips through by accident. It is like a takeout window at a restaurant: you pass your order in, the kitchen passes your food out, and you never walk into the kitchen to grab things yourself.",
  "body": [
   "Modules are sealed boxes, and that is by design. A child module cannot see the variables, locals, resources or data sources of the module that calls it, and the caller cannot reach inside the child to read its resources directly. The only way in is through input variables, and the only way out is through outputs. This strict scoping is what makes a module predictable and reusable: its behavior depends only on the values it is given, so the same module produces the same kind of infrastructure no matter which configuration calls it. For the Terraform Associate exam, think of every module as having a namespace of its own.",
   "Start with the inward direction. Consider a root module with `variable \"region\"`. A child module that writes `var.region` is referring to its own `region` variable, not the root's. If the child does not declare one, the reference is an error, and Terraform tells you so during validation or planning with a message about a reference to an undeclared input variable. To make the root's value available, the child must declare `variable \"region\"` in its own files, usually `variables.tf`, and the caller must pass it in the module block with an argument such as `region = var.region`. The left side of that line is the child's variable name; the right side is an expression evaluated in the caller's scope.",
   "Environment variables follow the same rule. Setting `TF_VAR_region` in your shell sets the root module's `region` variable only, never a child module's variable directly. The same is true for `-var` flags and `.tfvars` files: they all feed the root module. If a child needs that value, the root must forward it explicitly through the module block. This trips up many learners, because it feels as if a shell environment variable should be global. In Terraform it is global to the root module and nothing more.",
   "Now the outward direction. A child exposes data with `output` blocks. The caller reads those outputs using the syntax `module.MODULE_NAME.OUTPUT_NAME`, where MODULE_NAME is the label on the module block, not the folder name. If the module block uses `count`, you index it, as in `module.web[0].ip`, and with `for_each` you use the key, as in `module.web[\"blue\"].ip`. Anything the child does not export stays private. You cannot write `module.network.aws_vpc.this.id` in an expression to reach past the outputs into a resource; Terraform rejects it because that resource is not part of the module's interface.",
   "```hcl\n# modules/network/outputs.tf\noutput \"vpc_id\" {\n  value = aws_vpc.this.id\n}\n\n# root main.tf\nresource \"aws_security_group\" \"app\" {\n  vpc_id = module.network.vpc_id\n}\n```",
   "Referencing a module output also creates a dependency. In the example above, Terraform knows the security group depends on the network module's VPC, so it builds the VPC first. You get correct ordering for free, simply by passing values through the official interface rather than hard-coding IDs.",
   "Next comes the rule that surprises people on the command line. Only root module outputs are shown after `terraform apply` and by `terraform output`. If you want a child module's value to appear there, the root module must re-export it with an output of its own, such as `output \"vpc_id\" { value = module.network.vpc_id }`. This is a very common exam scenario: a value exists in a child module's output but does not appear on the command line because the root never passed it up. The same applies to anything that reads root outputs from outside, such as the `terraform_remote_state` data source used by another configuration, which can see only root-level outputs stored in state.",
   "Because values flow only through explicit interfaces, reading a module's `variables.tf` and `outputs.tf` tells you everything you need to use it. You do not need to read every resource inside. Designing good modules means choosing that interface carefully: expose the inputs callers genuinely need to change, give them types, descriptions and sensible defaults, and export the outputs other parts of the system will consume, such as IDs, ARNs (Amazon Resource Names) and endpoints. Keep everything else internal so you can refactor the inside of the module later without breaking anyone who calls it.",
   "To summarize the flow for the exam: values move down only through arguments on the module block, and they move up only through output blocks read as `module.NAME.OUTPUT`. Root-level inputs come from `-var`, `.tfvars` files, `TF_VAR_` environment variables and defaults; child-level inputs come only from the module block. When a question shows a child module using a value it was never given, or a root trying to read a resource buried in a child, the answer is almost always that the interface is missing a variable or an output."
  ],
  "analogy": "A module is like a vending machine. You can feed it coins and press buttons, which are its inputs, and you can collect what drops into the tray, which are its outputs. You cannot reach inside to grab a snack off the spiral, and the machine cannot reach into your pocket for change you did not insert. The analogy stops working in one way that matters: a Terraform module output also tells Terraform about ordering, so whatever reads it waits until the module has built the value.",
  "terms": [
   [
    "Module scope",
    "The rule that each module has its own namespace and sees only its own variables, locals and resources."
   ],
   [
    "Input variable",
    "A variable block in a module that receives a value from the caller, through the module block for child modules or from -var, .tfvars files and TF_VAR_ variables for the root module."
   ],
   [
    "Output value",
    "A value a module exports with an output block, readable by its caller as module.NAME.OUTPUT."
   ],
   [
    "Re-exporting",
    "Declaring a root module output whose value is a child module output, so it appears in terraform output."
   ],
   [
    "TF_VAR_ environment variable",
    "An environment variable that sets a root module input variable; it does not reach child modules directly."
   ]
  ],
  "example": "An engineer runs terraform output expecting to see the database endpoint, but nothing appears. The endpoint is an output of module.db, and the root module never re-exported it. Adding output \"db_endpoint\" { value = module.db.endpoint } in the root makes it visible.",
  "mistakes": [
   [
    "Setting TF_VAR_env in the shell gives every module, including child modules, a value for var.env.",
    "TF_VAR_ variables set root module inputs only. A child gets the value only if it declares variable \"env\" and the root passes env = var.env in the module block."
   ],
   [
    "The root can read any resource inside a child module, for example module.network.aws_vpc.this.id.",
    "Only declared outputs are visible to the caller. The child must declare an output such as vpc_id, and the root reads module.network.vpc_id."
   ],
   [
    "If a child module declares an output, terraform output will show it.",
    "terraform output and the apply summary show root module outputs only. The root must re-export the child's value with its own output block."
   ],
   [
    "module.NAME uses the folder name of the module source.",
    "NAME is the label on the module block, such as module \"network\", regardless of what the source directory is called."
   ]
  ],
  "tryit": [
   [
    "Your root module calls module \"app\" with for_each over the keys dev and prod. The app module has an output named url. A teammate wants to see the prod URL whenever they run terraform output. What exactly do you add, and where?",
    "Add an output block to the root module, for example output \"prod_url\" { value = module.app[\"prod\"].url }. The child's output is only visible to its caller, and because the module uses for_each, you must select the instance by key before naming the output. Only root outputs appear in terraform output."
   ]
  ],
  "tip": "Values move down only through module block arguments and up only through outputs; a child can never read the parent's var. values directly, and only root outputs appear in terraform output.",
  "check": [
   [
    "How does the root module read the subnet_ids output of a module named network?",
    "With module.network.subnet_ids."
   ],
   [
    "Why doesn't a child module output show up in terraform output?",
    "terraform output shows only root module outputs; the root must declare its own output that references the child's output."
   ],
   [
    "A child module references var.env but the root sets TF_VAR_env. Does the child get the value?",
    "Not automatically. The child must declare variable env and the root must pass it in the module block."
   ]
  ]
 },
 {
  "t": "Passing provider configurations to modules with the `providers` argument",
  "hook": "Lena at Bramblewood Health is building disaster recovery for the patient portal. The root configuration already has two AWS provider blocks, one for the primary region and one aliased `dr` for the recovery region. She calls the storage module a second time for the replica bucket, runs `terraform apply`, and watches both buckets land in the primary region. Nothing errored. The replica is simply in the wrong place, and the compliance review is on Monday. She stares at the module block and wonders why the module ignored the second provider she so carefully configured. How does a module decide which provider configuration to use?",
  "simple": "A provider is the plug-in Terraform uses to talk to a cloud, and a provider configuration tells it details such as which region or account to use. When you call a module, it automatically borrows the main provider settings from the configuration that calls it. If you set up a second, named copy of a provider (for example one pointed at another region), the module will not use that copy unless you hand it over by name. You hand it over with a small map called providers on the module block. It is like lending a friend your car: they get your everyday car automatically, but if you want them to take the truck, you have to give them the truck's keys and say so.",
  "body": [
   "Every resource needs a provider configuration, and modules are no exception. Resources in a child module need a configuration such as an AWS provider set to a particular region and account. By default, a child module inherits the default, unaliased provider configurations of its parent automatically. If your root module has one `provider \"aws\"` block, every module that uses AWS resources quietly uses it, and you never have to mention providers on the module block at all. That implicit inheritance covers most simple configurations, which is why many learners never notice it happening.",
   "Things change when you have more than one configuration of the same provider. You create extra configurations with the `alias` meta-argument, for example a second AWS provider for another region with `alias = \"west\"` and `region = \"us-west-2\"`, referenced elsewhere as `aws.west`. A resource in the root module selects it with its own `provider = aws.west` meta-argument. Aliased configurations are never inherited implicitly by child modules. To make a module use one, you pass it explicitly with the `providers` argument on the module block.",
   "```hcl\nprovider \"aws\" {\n  region = \"us-east-1\"\n}\n\nprovider \"aws\" {\n  alias  = \"west\"\n  region = \"us-west-2\"\n}\n\nmodule \"replica\" {\n  source = \"./modules/bucket\"\n  providers = {\n    aws = aws.west\n  }\n}\n```",
   "Reading the map correctly is the key exam skill. The `providers` argument is a map in which the key is the provider name as the child module sees it, and the value is a provider configuration in the calling module. In the example, everything in `./modules/bucket` that uses `aws` gets the us-west-2 configuration, even though the module's own code never mentions a region or an alias. Notice that the values are bare references such as `aws.west`, not quoted strings. Once you set `providers` for a module, Terraform uses only the mappings you listed and stops inheriting defaults for that module, so include every provider the module needs, for example both `aws` and `random` if it uses both.",
   "Some modules need two configurations of the same provider at once. Replication between a source bucket in one region and a destination bucket in another is the classic case, as are cross-account setups such as a DNS record in a shared networking account. Such a module declares the extra names it expects with `configuration_aliases` inside its `required_providers` entry, such as `configuration_aliases = [aws.src, aws.dst]`. Resources inside the module then pick one with `provider = aws.src` or `provider = aws.dst`. The caller maps both on the module block: `providers = { aws.src = aws.east, aws.dst = aws.west }`. If the caller forgets one, Terraform reports that the module requires a provider configuration that was not passed.",
   "This design puts the caller in charge, and that is deliberate. Best practice is that reusable child modules should not contain their own `provider` blocks. Provider configuration belongs in the root module, and child modules declare only their `required_providers` requirements, meaning the source address such as `hashicorp/aws` and a version constraint. That way the same module can be deployed to any region or account simply by changing what the caller passes, and credentials never get baked into shared code.",
   "Modules that do contain provider blocks are called legacy modules, and they come with real restrictions. They cannot be used with `count`, `for_each` or `depends_on` on the module block. They also cause trouble when removed: if you delete the module block, the provider configuration inside it disappears at the same moment, but Terraform still needs that configuration to destroy the module's resources, so the plan fails. The usual workaround is to destroy the resources first while the module still exists, which is awkward. Keeping providers in the root and passing them down avoids the whole problem.",
   "Mappings also chain through nested modules. If the root passes `aws.west` into a module named `app`, and `app` in turn calls a `bucket` module, then `app` can either let `bucket` inherit its default `aws` (which is now the us-west-2 configuration it received) or pass it along explicitly. Each module only ever knows provider names from its own point of view. When you troubleshoot, read the providers map at each level and follow the configuration down the tree, the same way you would follow an input variable.",
   "Putting it together, remember three rules. Default provider configurations flow into child modules automatically. Aliased configurations never do and must be passed with the `providers` map, keyed by the child's provider name. And when a module needs several configurations of one provider, it declares them with `configuration_aliases` so callers know exactly what to pass. If an exam question describes resources unexpectedly landing in the default region, look for a missing `providers` map."
  ],
  "analogy": "Think of a provider configuration as a company credit card. Every employee, like a child module, automatically gets the standard department card. The special travel card for the overseas office stays in the manager's drawer unless the manager hands it to a specific employee and says which purchases it is for. The `providers` map is that handover. The analogy stops working in one place: once you hand over any card in the map, the employee no longer gets the standard card automatically, so list every one they need.",
  "terms": [
   [
    "Provider alias",
    "An extra, named configuration of a provider created with the alias meta-argument and referenced as PROVIDER.ALIAS, such as aws.west."
   ],
   [
    "providers argument",
    "A map on a module block that assigns the caller's provider configurations to the provider names the child module uses."
   ],
   [
    "Implicit provider inheritance",
    "The default behavior where child modules automatically use the parent's default, unaliased provider configurations."
   ],
   [
    "configuration_aliases",
    "A required_providers setting in a child module that declares additional provider configuration names the caller must pass in."
   ],
   [
    "Legacy module",
    "A module that contains its own provider blocks; it cannot be used with count, for_each or depends_on and is hard to remove cleanly."
   ]
  ],
  "example": "A disaster recovery module creates a primary database in one region and a replica in another. It declares configuration_aliases = [aws.primary, aws.replica], and the root module calls it with providers = { aws.primary = aws, aws.replica = aws.dr }, so one module call builds resources in two regions.",
  "mistakes": [
   [
    "A child module automatically uses every provider configuration in the root, including aliased ones.",
    "Only default, unaliased configurations are inherited. Aliased ones must be passed explicitly with the providers map on the module block."
   ],
   [
    "The providers map is written with the root's alias on the left, like providers = { aws.west = aws }.",
    "The key is the name the child module uses and the value is the caller's configuration, so it is providers = { aws = aws.west } for a module that uses plain aws."
   ],
   [
    "The fix for a module that must deploy to another region is to add a provider block inside the module.",
    "Putting provider blocks in a child module makes it a legacy module that cannot use count, for_each or depends_on. Keep providers in the root and pass them in."
   ],
   [
    "After setting providers = { aws = aws.west }, the module still inherits other default providers it uses.",
    "Once providers is set, Terraform uses only the listed mappings, so every provider the module needs must appear in the map."
   ]
  ],
  "tryit": [
   [
    "Your company keeps DNS zones in a shared networking account and application resources in a workload account. You are writing a module that creates a load balancer in the workload account and a DNS record in the networking account. The root module has provider aws (workload) and provider aws with alias network. How should the module and the module block be set up?",
    "Inside the module, declare configuration_aliases = [aws.network] in the aws entry of required_providers, and set provider = aws.network on the DNS record resource. In the root, call the module with providers = { aws = aws, aws.network = aws.network }. The aliased configuration is never inherited, and the module must not contain its own provider blocks."
   ]
  ],
  "tip": "Default provider configurations are inherited automatically; aliased ones never are and must be passed with the providers map on the module block, keyed by the child's provider name.",
  "check": [
   [
    "Your root module defines provider aws with alias eu. How do you make module logs use it?",
    "Add providers = { aws = aws.eu } to the module \"logs\" block."
   ],
   [
    "Why should reusable modules avoid their own provider blocks?",
    "Provider configuration belongs to the caller; modules with provider blocks cannot use count, for_each or depends_on and are hard to remove safely."
   ],
   [
    "What does configuration_aliases declare?",
    "Additional provider configuration names, such as aws.src and aws.dst, that the module expects its caller to pass in through the providers map."
   ]
  ]
 },
 {
  "t": "The `version` argument (registry sources only) and `ref` for Git sources",
  "hook": "Monday morning at Copperline Insurance, the deployment pipeline shows a plan that wants to replace the production load balancer. Nobody touched the load balancer code. Daniel traces it back and finds the answer in the module block: the network module comes from a Git repository with `?ref=main`, and over the weekend someone merged a change to main that renamed a resource. On a second module, from the registry, a colleague had tried to protect against this by adding `version = \"2.1.0\"` to a local path source, and init rejected it. Two modules, two pinning mistakes. Which pinning tool belongs to which kind of source?",
  "simple": "A module is reusable Terraform code, and it changes over time as its authors release new versions. Pinning means telling Terraform exactly which version to use so nothing changes behind your back. How you pin depends on where the module comes from. If it comes from a registry (a library website for modules), you write a version setting, such as a version number or an allowed range. If it comes from a Git repository (a code history store), you add ref= to the address and name a tag, a branch or a specific commit. Local folders need no pin because they change with your own code. It is like ordering a book: from a bookstore you ask for a specific edition, but from a friend's shelf you point at the exact copy you want.",
  "body": [
   "Modules change over time, and an unpinned module can silently pull in a new release that renames resources or changes defaults. The result shows up as a surprise plan that wants to destroy and recreate things nobody meant to touch. Terraform gives you two different pinning mechanisms depending on where the module comes from, and the exam tests which one applies to which source.",
   "For modules from a registry, you use the `version` argument in the module block. That covers both the public Terraform Registry, with sources like `NAMESPACE/NAME/PROVIDER`, and private registries such as the one in HCP Terraform, with sources that start with a hostname. The argument accepts the same constraint syntax as provider versions: an exact version (`\"1.4.0\"` or `\"= 1.4.0\"`), comparisons (`\">= 1.2.0, < 2.0.0\"`), exclusions (`\"!= 1.3.1\"`) and the pessimistic operator `~>`. With `~> 1.4`, Terraform allows 1.4 and any later 1.x release but not 2.0. With `~> 1.4.0`, it allows only 1.4.x patch releases. During `terraform init`, Terraform picks the newest available version that satisfies the constraint, and the init output shows which version it downloaded.",
   "The `version` argument works only with registry sources. Put it on a local path such as `./modules/app`, or on a Git, HTTP or S3 source, and Terraform reports an error during init, because those sources have no registry version list to choose from. Local modules are versioned together with the code around them, so they need no pin; whatever commit of your repository you check out is the version of the local module you get.",
   "For Git sources you pin with the `ref` query parameter at the end of the source string. It can name a tag, a branch or a full commit SHA (the secure hash that identifies a commit), as in `source = \"git::ssh://git@example.com/infra/modules.git//vpc?ref=v2.1.0\"`. The double slash separates the repository from a subdirectory inside it, and the `?ref=` comes after the subdirectory. The same `ref` parameter also works with the GitHub and Bitbucket shorthand source forms, since they are fetched with Git as well.",
   "Not every ref is equally safe. Tags give readable, stable releases that match how module authors publish. A commit SHA is the most exact and cannot be moved, which is attractive for strict supply-chain control, although it is harder for humans to read. A branch name is the weakest choice, because the branch moves as people push to it, so two runs of `terraform init` on different days could fetch different code. Without any `ref`, Terraform uses the repository's default branch, which carries the same risk as naming a branch.",
   "```hcl\nmodule \"vpc\" {\n  source  = \"app.terraform.io/example-org/vpc/aws\"\n  version = \"~> 3.2\"\n}\n\nmodule \"dns\" {\n  source = \"git::ssh://git@example.com/infra/dns.git?ref=v1.0.4\"\n}\n```",
   "One more distinction catches many people. Unlike providers, module versions are not recorded in the dependency lock file, `.terraform.lock.hcl`. That file tracks provider versions and checksums only. So for modules, the constraint in your code is your only protection: if you write `~> 3.2` and the author publishes 3.9 tomorrow, the next fresh init may pick it up. That is why exact or tightly bounded versions, or immutable tags and SHAs, are recommended for production, while looser constraints are more acceptable in development.",
   "Upgrading is deliberate. Once a module is installed in `.terraform/modules`, a plain `terraform init` keeps it if it still satisfies the constraint. To move to a newer allowed version, run `terraform init -upgrade` or `terraform get -update`. For Git sources, you upgrade by editing the `ref` to a new tag or SHA and running init again. Either way, review the plan carefully after an upgrade, because a new module version can change resource addresses or defaults.",
   "In practice, teams combine these tools with a review habit. A common pattern is to keep development environments on a slightly looser registry constraint, such as `~> 3.2`, so they pick up fixes early, while production uses an exact version that is bumped only through a pull request. For Git modules, the same pull request changes the tag or SHA in `?ref=`. Because the change is visible in version control, reviewers can read the module's release notes, run `terraform plan`, and approve the upgrade knowingly instead of discovering it during an unrelated deployment.",
   "For the exam, reduce this to a quick decision. Registry source: use `version` with a constraint. Git source: use `?ref=` with a tag, branch or SHA, preferring tags or SHAs. Local path: no pin at all. Lock file: providers only, never modules."
  ],
  "analogy": "Pinning a registry module is like ordering from a catalog by edition number: you can say exactly 4th edition, or any printing of the 4th edition, and the catalog finds the newest match. Pinning a Git module is like pointing at a specific shelf location in a library. A tag is a labeled shelf, a commit SHA is a sealed box with a serial number, and a branch is the 'new arrivals' shelf whose contents change every week. The analogy is loose on tags: they can technically be moved, which is why a SHA is called the most immutable.",
  "terms": [
   [
    "version argument",
    "A module block argument that sets a version constraint; valid only for registry module sources."
   ],
   [
    "ref parameter",
    "A query parameter in a Git source address that selects a tag, branch or commit to check out."
   ],
   [
    "Pessimistic constraint (~>)",
    "A version operator that allows only the rightmost specified component to increase, such as ~> 1.4 allowing 1.x from 1.4 up but not 2.0."
   ],
   [
    "Commit SHA",
    "The hash that uniquely identifies a Git commit; pinning to it fetches exactly that code and cannot be moved."
   ],
   [
    "Dependency lock file",
    ".terraform.lock.hcl, which records provider versions and hashes but not module versions."
   ]
  ],
  "example": "A team pinned its Git module to ?ref=main. One morning a colleague merged a breaking change to main, and the next CI run pulled it in and planned to replace a load balancer. They switched to ?ref=v4.2.0 tags so module upgrades happen only when someone edits the ref deliberately.",
  "mistakes": [
   [
    "You can add version = \"1.2.0\" to any module block, including Git and local sources.",
    "The version argument is supported only for registry sources. Git sources pin with ?ref= and local paths need no pin; anything else makes init fail."
   ],
   [
    "The dependency lock file keeps module versions stable between runs.",
    ".terraform.lock.hcl records provider versions and checksums only. Module stability depends entirely on the constraint or ref you write."
   ],
   [
    "~> 1.4.0 allows any 1.x release from 1.4.0 upward.",
    "With three components, only the last one may increase, so ~> 1.4.0 allows 1.4.x patches only. ~> 1.4 allows 1.4 and later 1.x releases."
   ],
   [
    "Pinning a Git module to a branch name is as safe as pinning to a tag.",
    "A branch moves whenever someone pushes, so different inits can fetch different code. Tags are stable releases and a commit SHA is the most exact."
   ]
  ],
  "tryit": [
   [
    "Your security team requires that the exact code of every third-party module be reviewed before use, and that nothing can change without a code change in your repository. One module comes from a Git repository and its maintainers occasionally re-tag releases. How should you pin it?",
    "Use ?ref= with the full commit SHA that was reviewed. Tags can be moved and branches move constantly, while a SHA always refers to the same code, so nothing changes until someone edits the ref."
   ],
   [
    "A registry module is pinned with version = \"~> 5.1\". The maintainer releases 5.4.0 and 6.0.0. A teammate runs terraform init -upgrade. Which version is installed?",
    "5.4.0. The ~> 5.1 constraint allows 5.1 and later 5.x releases but not 6.0, and -upgrade selects the newest version that satisfies it."
   ]
  ],
  "tip": "version is for registry modules only; Git modules pin with ?ref= (a tag or SHA is safer than a branch). Also remember that the lock file does not pin module versions.",
  "check": [
   [
    "You add version = \"1.0.0\" to a module whose source is ./modules/app. What happens?",
    "Terraform reports an error, because the version argument is only supported for registry sources."
   ],
   [
    "Which Git ref is the most immutable choice?",
    "A full commit SHA, since tags can technically be moved and branches move constantly."
   ],
   [
    "Does .terraform.lock.hcl record module versions?",
    "No. It records only provider versions and checksums."
   ]
  ]
 },
 {
  "t": "`terraform init` or `terraform get` to install modules into `.terraform/modules`",
  "hook": "It is Jamal's first day on the platform team at Fernhill Schools District. He clones the infrastructure repository, opens a terminal, and eagerly runs `terraform plan` to see what the team manages. Instead of a plan, he gets a red error: module \"vpc\" is not installed. He checks the repository and the module block is right there in `main.tf`. A senior engineer glances over and says, \"You skipped a step.\" Jamal also notices a large hidden folder appear on a teammate's machine that is not in the repository at all. Where does Terraform keep module code, and what puts it there?",
  "simple": "Before Terraform can build anything, it needs the actual code for every module your configuration uses. Some of that code lives online, in a registry (a library of shared modules) or a Git repository. Running terraform init downloads all of it, along with the provider plug-ins Terraform needs, and saves it in a hidden folder called .terraform inside your project. terraform get is a smaller command that only fetches modules. You run one of them whenever you add a module or change where it comes from. It is like unpacking ingredients before cooking: the recipe card is in your hand, but you cannot cook until the groceries are on the counter.",
  "body": [
   "Terraform cannot plan a configuration until it has the code for every module that configuration calls. A module block only holds an address, such as a registry path or a Git URL, and Terraform has to fetch what that address points to before it can read the resources inside. Installing modules is one of the jobs of `terraform init`, alongside initializing the backend and installing providers. You must run init whenever you add a module block, change a module's `source` or `version`, or clone a repository onto a fresh machine.",
   "Here is what happens during init. Terraform walks the module tree, starting at the root, reads each `source` and fetches what it needs, including modules called by other modules. Registry modules are downloaded at the newest version that satisfies the `version` constraint, and Git or archive sources are cloned or unpacked. The code lands in the hidden `.terraform/modules` directory inside your working directory, in a subfolder named after the module call. Terraform also writes a `modules.json` manifest there that records which module call maps to which directory, source and version. Local path modules are not copied; the manifest simply points at their location on disk, which is why edits to a local module take effect immediately.",
   "```text\n$ terraform init\nInitializing modules...\nDownloading registry.terraform.io/terraform-aws-modules/vpc/aws 5.x.y for vpc...\n- vpc in .terraform/modules/vpc\n- app in modules/app\n```",
   "Reading init output is a useful skill. In the excerpt above, the line with Downloading shows a registry module being fetched and the version chosen, while `- app in modules/app` shows a local module being recorded in place rather than downloaded. After the modules section, init goes on to initialize the backend and install providers, and it finishes with a message that the working directory has been successfully initialized.",
   "`terraform get` is the narrower tool. It does only the module step: it downloads and updates modules without touching the backend or providers. It is handy when you have edited module blocks and want to refresh them quickly, or when you want to inspect module code without configuring a backend. Most people simply run init, because it covers everything and is safe to repeat.",
   "Both commands support an upgrade flag, and the names differ slightly. `terraform init -upgrade` and `terraform get -update` fetch the newest versions allowed by your constraints instead of keeping what is already installed. Without those flags, Terraform keeps already-installed modules if they still satisfy the configuration, which keeps runs predictable. Note that `init -upgrade` also re-evaluates provider constraints and can update the dependency lock file, while `get -update` affects modules only.",
   "Next, consider what belongs in version control. The whole `.terraform` directory is a local cache. It should be listed in `.gitignore` and never committed, because it contains downloaded module code and provider binaries specific to the machine's operating system and architecture, and it can be recreated at any time by running init again. The dependency lock file, `.terraform.lock.hcl`, is different: it lives next to your configuration files, outside `.terraform`, and should be committed so everyone uses the same provider versions.",
   "Nested modules are handled in the same pass, which is worth understanding when you read the directory. If the root calls a registry module named `vpc`, and that module internally calls its own submodules, init installs those too and records them in `modules.json` under combined keys such as `vpc.subnets`. You never write separate install steps for them. If a nested module fails to download, perhaps because a Git host requires credentials you do not have, init stops and names the module call that failed, so you know exactly which source address to investigate before trying again.",
   "It also helps to know which changes do not need init. Editing input values passed to a module, such as changing `instance_count = 2` to `instance_count = 3`, is an ordinary configuration change that `terraform plan` handles directly. Only changes to what code is fetched, meaning `source` or `version`, or adding and removing module blocks, require reinstalling.",
   "Finally, learn to recognize the symptom. If you forget to run init after adding a module, `terraform plan` stops with an error saying the module is not installed and suggests running `terraform init`. That message is a reliable signal. Running init is safe to repeat; it is idempotent and will not change infrastructure, which is why CI (continuous integration) pipelines typically run it at the start of every job on a clean runner."
  ],
  "analogy": "Think of `.terraform/modules` as the pantry and `terraform init` as the grocery run. Your configuration is a recipe that names ingredients, but you cannot cook until someone fetches them. `terraform get` is a quick trip for one aisle only, while init also sets up the kitchen, meaning the backend and providers. The pantry is not something you mail to a friend; they do their own shopping from the same list. The analogy stops at local modules, which are like herbs already growing on your windowsill: init notes where they are but does not copy them.",
  "terms": [
   [
    ".terraform/modules",
    "The hidden directory in the working directory where Terraform stores downloaded module code and the modules.json manifest."
   ],
   [
    "terraform get",
    "A command that downloads and updates modules only, without initializing backends or providers."
   ],
   [
    "terraform init -upgrade",
    "Re-evaluates version constraints and installs the newest allowed module and provider versions."
   ],
   [
    "terraform get -update",
    "Checks for and downloads newer allowed versions of already installed modules."
   ],
   [
    "modules.json",
    "A manifest in .terraform/modules that records each module call's source, version and install directory."
   ]
  ],
  "example": "A new engineer clones the infrastructure repository and runs terraform plan straight away. Terraform errors that module \"vpc\" is not installed. After running terraform init, the VPC module appears under .terraform/modules/vpc and the plan succeeds.",
  "mistakes": [
   [
    "You must run terraform init every time you change a value passed into a module.",
    "Changing module input values only needs plan and apply. Init is required when you add or remove a module block or change its source or version."
   ],
   [
    "The .terraform directory should be committed so teammates do not have to download modules.",
    "It is a machine-specific cache and belongs in .gitignore. Teammates recreate it by running init; commit .terraform.lock.hcl instead."
   ],
   [
    "terraform get also installs providers and configures the backend.",
    "get handles modules only. init does all three: backend, providers and modules."
   ],
   [
    "Local path modules are copied into .terraform/modules like registry modules.",
    "Local modules are referenced in place. The modules.json manifest records their path, so edits take effect without reinstalling."
   ]
  ],
  "tryit": [
   [
    "A teammate changes a module block's version from \"~> 4.0\" to \"~> 5.0\" and also changes an input from size = \"small\" to size = \"medium\". They run terraform plan and get an error that the installed module version does not match the configuration. What should they run, and why did only one of their two edits cause the error?",
    "They should run terraform init (with -upgrade if an already installed version would still satisfy the new constraint) to fetch a version that matches ~> 5.0. The version change alters what code must be downloaded, which needs init; the input change is ordinary configuration that plan handles on its own."
   ]
  ],
  "tip": "Adding or changing a module source or version requires init (or get); changing only module input values does not. Never commit the .terraform directory, but do commit .terraform.lock.hcl.",
  "check": [
   [
    "What is the difference between terraform init and terraform get?",
    "init initializes the backend, installs providers and modules; get only downloads or updates modules."
   ],
   [
    "Where are downloaded modules stored?",
    "In the .terraform/modules directory inside the working directory."
   ],
   [
    "Which flag makes init fetch newer module versions that still satisfy your constraints?",
    "-upgrade, as in terraform init -upgrade."
   ]
  ]
 },
 {
  "t": "Using `count` and `for_each` on module blocks",
  "hook": "At Saltmarsh Logistics, Ines maintains three almost identical module blocks for the regional order service, one per region, each sixty lines long. Product has just asked for a fourth region by Friday, and she can already picture copying and pasting a fourth block and missing one setting. Worse, last quarter a colleague converted a similar setup to use `count`, removed the second region from a list, and watched the plan propose destroying and recreating the third region's entire stack. Ines wants one module block that can grow and shrink safely. Which meta-argument gives her that, and what traps does it hide?",
  "simple": "A module is a reusable package of Terraform code. Normally one module block builds one copy of that package. The count and for_each settings let a single module block build several copies. count says 'make this many', and numbers the copies 0, 1, 2 and so on. for_each says 'make one copy for each item in this list or map', and labels each copy with the item's name. Labels are safer than numbers when you might remove one in the middle, because the other copies keep their names. It is like seating a dinner party: numbered chairs force everyone to shuffle when one guest leaves, but name cards let the others stay put.",
  "body": [
   "Multiplying whole modules is a core skill. Since Terraform 0.13, the `count` and `for_each` meta-arguments work on `module` blocks as well as resources. They let one module block create several instances of an entire module, each with its own copy of all the module's resources. This is how you stamp out a set of similar environments, buckets or services without copying code, and it keeps every instance consistent because they all come from the same block.",
   "Start with `count`. You give it a whole number and Terraform creates that many instances, indexed from zero. Inside the module block, `count.index` gives the current number, which you can use to vary inputs, for example `name = \"web-${count.index}\"`. The instances are addressed as `module.NAME[0]`, `module.NAME[1]` and so on, and you will see those addresses in plan output and in `terraform state list`, such as `module.web[1].aws_instance.this`.",
   "`count` also works as an on/off switch, which is one of its most popular uses. Writing `count = var.enable_monitoring ? 1 : 0` includes or omits the entire module based on a boolean variable. When the module is off, it has zero instances and none of its resources exist; when it is on, it has exactly one, addressed as `module.monitoring[0]`.",
   "Now `for_each`. You give it a map or a set of strings, and Terraform creates one instance per element. Inside the block, `each.key` and `each.value` are available. For a set, both are the same string; for a map, `each.key` is the map key and `each.value` its value. Instances are addressed by key, such as `module.bucket[\"logs\"]`. A list must be converted first, commonly with `toset()`, because `for_each` does not accept a plain list.",
   "The big practical difference is stability. Because each `for_each` instance is tied to a stable key rather than a position, removing one element from the middle of the collection destroys only that instance. With `count`, removing an element from the middle of a list shifts every later index down by one, so Terraform sees the old instance 2 as the new instance 1 and can plan unwanted replacements. That is exactly the surprise that hits teams who use `count` over a list of names.",
   "```hcl\nmodule \"bucket\" {\n  source   = \"./modules/bucket\"\n  for_each = toset([\"logs\", \"backups\", \"assets\"])\n  name     = \"example-${each.key}\"\n}\n\noutput \"bucket_arns\" {\n  value = { for k, m in module.bucket : k => m.arn }\n}\n```",
   "Reading outputs changes too. Because a counted or `for_each` module is a collection, you read outputs with an index or key, such as `module.bucket[\"logs\"].arn`, or iterate over all instances as in the example's `for` expression, which builds a map of bucket names to ARNs (Amazon Resource Names). With `count`, a splat expression like `module.web[*].ip` returns a list of every instance's output. Writing `module.bucket.arn` without a key fails, because Terraform cannot know which instance you mean.",
   "Maps unlock richer patterns. A common design passes a map of objects, such as `{ east = { cidr = \"10.0.0.0/16\", size = \"small\" }, west = { cidr = \"10.1.0.0/16\", size = \"large\" } }`, and then sets `cidr = each.value.cidr` and `size = each.value.size` in the module block. Each region gets its own settings while sharing the same module code, and adding a region means adding one map entry. The keys become part of the resource addresses in state, so choose short, stable keys that you will not want to rename later, because renaming a key looks like removing one instance and adding another.",
   "There are firm limits on the values you feed in. The values used in `count` and `for_each` must be known at plan time; you cannot base them on attributes that only exist after apply, such as a generated ID, or Terraform reports that the value cannot be determined until apply. A module block also cannot use `count` and `for_each` together. Pick the one that fits: `count` for a number of identical copies or a simple toggle, `for_each` for distinct, named instances.",
   "One restriction ties back to provider design: a module that contains its own `provider` blocks, known as a legacy module, cannot be used with `count`, `for_each` or `depends_on`. This is another reason to keep provider configuration in the root module and pass it down. Finally, when converting an existing single module call to `for_each`, the resource addresses change, for example from `module.bucket.aws_s3_bucket.this` to `module.bucket[\"logs\"].aws_s3_bucket.this`. Add a `moved` block from `module.bucket` to `module.bucket[\"logs\"]` so Terraform updates state instead of destroying and recreating the resources."
  ],
  "analogy": "Using `count` is like numbered parking spaces in a small lot: when the car in space 1 leaves, everyone after it has to move up one space, which in Terraform means replacements. Using `for_each` is like reserved spaces with name signs: when one person leaves, the others stay exactly where they are. The analogy stops working for the on/off case, where `count` is the better tool because there is only ever space 0 or nothing.",
  "terms": [
   [
    "count on a module",
    "Creates a number of module instances addressed by index, such as module.web[0]."
   ],
   [
    "for_each on a module",
    "Creates one module instance per map key or set element, addressed by key, such as module.web[\"blue\"]."
   ],
   [
    "each.key / each.value",
    "Values available inside a for_each block that identify the current element."
   ],
   [
    "count.index",
    "The zero-based number of the current instance inside a block that uses count."
   ],
   [
    "Legacy module",
    "A module containing its own provider blocks; it cannot be used with count, for_each or depends_on."
   ]
  ],
  "example": "A company runs the same service in three regions. Instead of three module blocks, it uses for_each over a map of region names to CIDR ranges and passes each.value as the network range. Adding a fourth region is a one-line change to the map.",
  "mistakes": [
   [
    "count is fine for a list of named environments because you can always look up the name with count.index.",
    "Removing a name from the middle of the list shifts later indexes, so Terraform plans to replace instances. Use for_each with a set or map for distinct, named instances."
   ],
   [
    "You can read a for_each module's output as module.app.endpoint.",
    "The module is a collection, so you must pick an instance, such as module.app[\"prod\"].endpoint, or iterate over module.app."
   ],
   [
    "for_each accepts a plain list such as [\"a\", \"b\"].",
    "for_each takes a map or a set of strings. Convert a list with toset() first."
   ],
   [
    "count or for_each can depend on an ID that a resource generates during apply.",
    "Their values must be known at plan time. Use values from variables, locals or data known before apply."
   ]
  ],
  "tryit": [
   [
    "Your configuration has a single module \"vpc\" block that has been in production for a year. You want to add a second VPC, so you add for_each = { main = \"10.0.0.0/16\", analytics = \"10.1.0.0/16\" } to it. The plan shows the existing VPC being destroyed and a new one created under module.vpc[\"main\"]. How do you prevent the replacement?",
    "Add a moved block with from = module.vpc and to = module.vpc[\"main\"]. The existing resources keep their real objects in state under the new keyed address, so the plan only creates the analytics instance instead of replacing the main one."
   ]
  ],
  "tip": "Prefer for_each over count when instances are distinct and may be removed individually; count indexes shift when an item in the middle is removed. Use count = condition ? 1 : 0 to make a module optional.",
  "check": [
   [
    "How do you read the endpoint output of the instance with key prod in a for_each module named app?",
    "module.app[\"prod\"].endpoint."
   ],
   [
    "How can count be used to make a module optional?",
    "Set count = var.enabled ? 1 : 0 so the module has one instance or none."
   ],
   [
    "Which kind of module cannot use count or for_each?",
    "A module that includes its own provider configuration blocks."
   ]
  ]
 },
 {
  "t": "Standard module structure: main.tf, variables.tf, outputs.tf, README",
  "hook": "Rosa at Quarry Hill Credit Union inherits a networking module from a contractor who has moved on. The folder holds `a.tf`, `b.tf`, `stuff.tf` and `misc2.tf`, with variables, outputs and resources scattered across all four, half the variables lacking descriptions, and no README. Her manager wants the module shared with two other teams next week, and possibly published so a partner can reuse it. Rosa spends an hour just figuring out which inputs are required. Terraform runs the module fine, so nothing is technically broken. What layout would let anyone, including the Terraform Registry, understand this module in a minute?",
  "simple": "Terraform reads every file ending in .tf in a folder and treats them as one big configuration, so it does not care what the files are called. People do care. HashiCorp recommends a standard layout so anyone opening a module knows where things are: main.tf holds the main building blocks, variables.tf lists the settings you can pass in, outputs.tf lists the values the module hands back, and README.md explains in plain words what the module does and how to use it. It is like a kitchen where every cook agrees that knives go in the top drawer and pans under the stove: any cook can walk in and start working without opening every cupboard.",
  "body": [
   "Start with a fact that surprises many beginners. Terraform does not care what your files are called; it reads every `.tf` file in a directory and merges them into one configuration. You could put an entire module in one file named `everything.tf` and it would work. People, however, care a great deal. HashiCorp documents a standard module structure so that anyone opening a module, or the Terraform Registry rendering it, knows where to look. Following it is expected for modules you publish and is good practice for internal ones.",
   "The minimal recommended layout has three configuration files plus documentation. `main.tf` is the primary entry point, holding the main resources or nested module calls. For a complex module, resources can be split into more files, but `main.tf` remains where a reader starts. `variables.tf` contains every `variable` block, each with a `description` and a `type`, so callers can see the full input interface in one place and know which inputs are required because they have no default. `outputs.tf` contains every `output` block, again with descriptions, so callers know what values they can consume. A `README.md` explains what the module does, how to use it and any assumptions. A `LICENSE` file is expected for modules shared publicly, so others know the terms under which they may use it.",
   "```text\nterraform-aws-network/\n  README.md\n  LICENSE\n  main.tf\n  variables.tf\n  outputs.tf\n  versions.tf        # terraform and required_providers blocks\n  modules/\n    subnet/          # nested modules\n  examples/\n    basic/           # example root configurations\n```",
   "Larger modules add a few conventional pieces. Many teams put the `terraform` block with `required_version` and `required_providers` in a `versions.tf` file, so the version requirements are easy to find and update. Nested modules go under a `modules/` subdirectory, and a nested module without a README is treated as internal, meaning external users are not expected to call it directly. Example configurations that show how to call the module go under `examples/`, each as its own small root module that someone can copy and run. Tests can live in a `tests/` directory for the `terraform test` framework, using files that end in `.tftest.hcl`.",
   "Why do descriptions matter so much? Because they are documentation that tools can read. The registry, and documentation generators that teams run in their pipelines, pull the description of every variable and output into tables automatically. A variable written as `variable \"cidr\" {}` tells a reader nothing; `variable \"cidr\" { type = string, description = \"CIDR block for the VPC, such as 10.0.0.0/16\" }` tells them exactly what to pass. Good descriptions also reduce the questions other teams send you about how to use the module.",
   "Publishing to the public Terraform Registry adds rules of its own. The module must live in a public GitHub repository named in the form `terraform-PROVIDER-NAME`, such as `terraform-aws-network`, where PROVIDER is the main provider the module uses and NAME describes what it builds. It must follow the standard structure, and it needs semantic version tags like `v1.0.0`, which the registry turns into releases that callers can pin with the `version` argument. The registry reads the README, inputs and outputs and generates documentation automatically, which is one more reason clear descriptions on variables and outputs matter. Private registries, such as the one in HCP Terraform, follow similar conventions.",
   "Good structure goes beyond file names. A well-designed module does one job, such as building a network or a database, rather than an entire application stack. It exposes only the inputs callers genuinely need, provides sensible defaults for the rest, exports the IDs and endpoints consumers will need, and leaves provider configuration to the caller rather than including `provider` blocks. It should also avoid hard-coding values such as regions or account numbers, so the same module can be reused across environments without edits.",
   "Consistency pays off over time. When every module in an organization follows the same layout, reviewers know where to look for risky changes, new engineers learn one pattern instead of many, and automated checks can rely on finding version requirements in `versions.tf` and interfaces in `variables.tf` and `outputs.tf`. Running `terraform fmt` keeps the formatting consistent as well, and `terraform validate` confirms that the merged files form a valid configuration.",
   "For the exam, hold on to two ideas. First, the file names are a convention, not a requirement: Terraform loads all `.tf` files in a directory regardless of name. Second, the standard structure of `main.tf`, `variables.tf`, `outputs.tf` and a README, plus the `terraform-PROVIDER-NAME` repository naming and semantic version tags for public registry publishing, is what HashiCorp recommends and what questions will describe."
  ],
  "analogy": "A standard module layout is like the standard layout of a nutrition label. Nothing about the food requires calories to be printed near the top, and it tastes the same either way, but because every label follows the same pattern, anyone can find what they need in seconds. `variables.tf` is the ingredients list, `outputs.tf` is what you get per serving, and the README is the cooking instructions. The analogy stops at enforcement: Terraform never rejects a module for unusual file names, but the public registry does enforce its naming and tagging rules.",
  "terms": [
   [
    "main.tf",
    "The conventional primary file of a module, holding its main resources and module calls."
   ],
   [
    "variables.tf",
    "The conventional file holding a module's input variable declarations, forming its input interface."
   ],
   [
    "outputs.tf",
    "The conventional file holding a module's output declarations, forming its output interface."
   ],
   [
    "versions.tf",
    "A conventional file holding the terraform block with required_version and required_providers."
   ],
   [
    "terraform-PROVIDER-NAME",
    "The repository naming convention required for modules published to the public Terraform Registry."
   ]
  ],
  "example": "An engineer inherits a module where all resources, variables and outputs are mixed across files named a.tf, b.tf and misc.tf. Reorganizing it into main.tf, variables.tf with descriptions, outputs.tf and a README with a usage example lets teammates understand and call it without reading every line.",
  "mistakes": [
   [
    "Terraform requires a main.tf file or it cannot find the module's resources.",
    "Terraform loads every .tf file in the directory regardless of name. main.tf is a naming convention for humans and tools."
   ],
   [
    "A public registry module can live in any repository name as long as the code is valid.",
    "The public registry requires a public GitHub repository named terraform-PROVIDER-NAME and semantic version tags such as v1.0.0."
   ],
   [
    "A reusable module should include its own provider block so it works out of the box.",
    "Provider configuration belongs to the caller. Modules should declare required_providers only, so callers control region, account and credentials."
   ],
   [
    "Nested modules under modules/ are all meant to be called directly by users.",
    "A nested module without a README is treated as internal. Callers are expected to use the root module of the package or documented submodules."
   ]
  ],
  "tryit": [
   [
    "Your team wants to publish an internal storage module to the public Terraform Registry. Its repository is named storage-module, it has one file named everything.tf, and releases are tagged release-1, release-2. Which changes are required for publishing, and which are recommended but not enforced?",
    "Required: rename the repository to the terraform-PROVIDER-NAME pattern (for example terraform-aws-storage), keep it public on GitHub, follow the standard structure, and tag releases with semantic versions such as v1.0.0. Recommended: split the code into main.tf, variables.tf, outputs.tf and versions.tf with descriptions, and add a README, LICENSE and examples. Terraform itself would run everything.tf either way."
   ]
  ],
  "tip": "File names are a convention, not a requirement: Terraform merges all .tf files in a directory, but the standard structure (main, variables, outputs, README) is what the registry and reviewers expect.",
  "check": [
   [
    "Does Terraform require a file named main.tf?",
    "No. Terraform loads every .tf file in the directory; main.tf is only a naming convention."
   ],
   [
    "What naming format must a GitHub repository use to publish a module to the public registry?",
    "terraform-PROVIDER-NAME, for example terraform-aws-vpc."
   ],
   [
    "What does the registry use version tags such as v1.2.0 for?",
    "It turns semantic version tags into module releases that callers can select with the version argument."
   ]
  ]
 },
 {
  "t": "The default local backend and the `terraform.tfstate` file, `terraform.tfstate.backup`",
  "hook": "Theo, a junior engineer at Wren Valley Clinics, built a small test environment from his laptop last month: a few virtual machines and a storage bucket. Over the weekend IT reimaged his laptop. On Monday he pulls the code from Git, runs `terraform plan`, and Terraform proposes creating every resource from scratch, even though they are all still running and still billing. The Git repository has every line of configuration. What it does not have is one file that never left his old hard drive. What did Terraform lose, and why does it matter so much?",
  "simple": "Terraform keeps a notebook, called state, that records which real cloud resources it created and how each one matches a block in your code. Without the notebook, Terraform has no idea that a server it built yesterday is the same server described in your file. If you do not tell Terraform where to keep the notebook, it saves it on your own computer in a file named terraform.tfstate, and it keeps the previous page in terraform.tfstate.backup. That works for practice, but if the computer is lost, so is the notebook. It is like a valet parking stand: the cars are still in the lot, but if the ticket book is lost, nobody knows which car belongs to whom.",
  "body": [
   "Terraform must remember which real objects belong to which resource blocks, along with their current attributes. It keeps that memory in state. Without state, Terraform could not tell whether `aws_instance.web` already exists or which of many cloud instances it corresponds to, because most cloud APIs (application programming interfaces) have no idea which tool created an object. State is the mapping between your configuration and the real world. Where and how state is stored is controlled by the backend.",
   "The default is simple. If you do not configure any backend, Terraform uses the local backend. It stores state in a file named `terraform.tfstate` in the root of your working directory, right next to your configuration files. The first `terraform apply` creates it; before that, there is no state at all, and Terraform treats every resource as new.",
   "It is worth knowing what is inside. The file is JSON (JavaScript Object Notation) and contains a format version, the Terraform version that wrote it, a serial number that increases with every change, a lineage ID that identifies this state's history, root module outputs, and a list of resources with all their attributes, including IDs, IP addresses and anything else the provider returned. The serial and lineage help Terraform detect when someone tries to write an older or unrelated state over a newer one. You can open the file and read it, but you should never edit it by hand. Use Terraform's commands instead, such as `terraform state list`, `terraform state show`, `terraform state mv` and `terraform state rm`, which understand the format and keep the serial and lineage consistent.",
   "```text\n$ ls -a\n.  ..  .terraform  .terraform.lock.hcl  main.tf\nterraform.tfstate  terraform.tfstate.backup  variables.tf\n```",
   "Reading state safely is part of everyday work. Instead of opening the JSON file, run `terraform state list` to see every resource address Terraform tracks, such as `aws_instance.web` or `module.network.aws_vpc.this`, and `terraform state show aws_instance.web` to see one resource's recorded attributes. `terraform show` prints the whole state in a readable form, and `terraform output` prints root module outputs from it. These commands read state through the backend, so they work the same way later when you move to a remote backend and there is no local file to open.",
   "The backup file is a safety net with a short memory. Every time Terraform writes a new state, the local backend first saves the previous version as `terraform.tfstate.backup`. If an apply goes badly or the state becomes corrupted, that backup gives you one step of history to recover from. It is only one step, though: the next write overwrites the backup with whatever the state was just before that write. Real version history comes from remote backends with versioning, such as an S3 bucket with versioning enabled or HCP Terraform, which keeps a list of past state versions for each workspace.",
   "Workspaces and custom paths change the file location. When you use CLI workspaces with the local backend, the default workspace keeps using `terraform.tfstate`, while other workspaces store state under `terraform.tfstate.d/WORKSPACE_NAME/terraform.tfstate`. You can also point the local backend to a different file with its `path` argument in a `backend \"local\"` block, or override the location for one command with the older `-state` flags, although those flags are legacy and not recommended for normal use.",
   "The local backend is fine for learning and for single-person experiments, but it has serious drawbacks for teams. The state exists only on one laptop, so teammates cannot safely run Terraform against the same infrastructure; losing the laptop loses the state, as Theo discovered. It contains secrets in plain text, because sensitive values such as database passwords are stored as ordinary attributes, and marking an output as `sensitive` hides it from the console but not from the state file. And unless you are careful, it ends up committed to Git, where secrets leak and two people's copies conflict. Add `*.tfstate` and `*.tfstate.*` to `.gitignore`, and move to a remote backend with locking and encryption once more than one person or a CI (continuous integration) pipeline is involved.",
   "State also does more than mapping. It improves performance, because Terraform can work from cached attributes in large configurations, and it tracks metadata such as dependencies between resources. Terraform needs those dependencies to destroy objects in the right order even after you delete their configuration, since the configuration that described the relationship is gone. That is why state is essential, not a cache you can throw away. If state is lost, the recovery path is to bring existing objects back under management with `terraform import` or `import` blocks, which is slow and error-prone compared with protecting state in the first place."
  ],
  "analogy": "State is like the coat-check ticket book at a theater. The coats, your cloud resources, hang safely on the racks whether or not the book exists, but the book is the only thing that says which coat belongs to ticket 42. The backup file is like a photocopy of yesterday's page only: helpful after one mistake, useless for last week. The analogy stops at secrets: a ticket book does not usually contain the guests' house keys, but a state file can contain passwords in plain text, so it must be guarded.",
  "terms": [
   [
    "State",
    "Terraform's record mapping resources in configuration to real objects, with their attributes and metadata."
   ],
   [
    "Local backend",
    "The default backend, which stores state in a file on the local disk."
   ],
   [
    "terraform.tfstate",
    "The JSON state file the local backend writes in the working directory."
   ],
   [
    "terraform.tfstate.backup",
    "A copy of the previous state that the local backend writes before replacing terraform.tfstate."
   ],
   [
    "Serial and lineage",
    "Fields in the state file: the serial increases with each write and the lineage identifies the state's history, helping Terraform reject stale or unrelated state."
   ]
  ],
  "example": "A student runs terraform apply on a laptop, then reformats the laptop. The cloud resources still exist, but terraform.tfstate is gone, so Terraform no longer knows about them and the next apply would try to create duplicates. Importing them back or keeping state in a remote backend would have avoided the problem.",
  "mistakes": [
   [
    "terraform.tfstate.backup keeps a full history of every previous state.",
    "It holds only the state from just before the most recent write. For real history, use a remote backend with versioning or HCP Terraform."
   ],
   [
    "Marking a value as sensitive keeps it out of the state file.",
    "sensitive only hides values in CLI output. The value is still stored in plain text in state, which is why state must be protected."
   ],
   [
    "State is just a cache; if it is lost, Terraform can rebuild it by scanning the cloud.",
    "Terraform cannot reliably match existing objects to resource blocks without state. Lost state must be rebuilt with imports, and dependency metadata is lost."
   ],
   [
    "Committing terraform.tfstate to Git is a simple way to share it with the team.",
    "Git exposes secrets in the file and offers no locking, so concurrent edits can conflict and corrupt state. Use a remote backend instead."
   ]
  ],
  "tryit": [
   [
    "You run terraform apply locally and it fails halfway through because of a network outage, then a second attempt seems to have produced a damaged state file. A colleague suggests deleting terraform.tfstate and running apply again. What should you do instead, and why?",
    "Do not delete state. First look at terraform.tfstate.backup, which holds the state from before the last write, and keep copies of both files. Deleting state would make Terraform forget the resources that already exist and try to create duplicates. Restore from the backup if it is the better copy, then run terraform plan to compare state against reality before applying."
   ]
  ],
  "tip": "No backend block means the local backend, which writes terraform.tfstate plus a single-step terraform.tfstate.backup in the working directory. Keep both out of Git.",
  "check": [
   [
    "What file holds the previous version of local state?",
    "terraform.tfstate.backup, written before each new state is saved."
   ],
   [
    "Why should terraform.tfstate not be committed to Git?",
    "It can contain secrets in plain text and cannot be locked, so sharing it through Git risks leaks and conflicting changes."
   ],
   [
    "Where does a non-default CLI workspace store state with the local backend?",
    "In terraform.tfstate.d/WORKSPACE_NAME/terraform.tfstate."
   ]
  ]
 },
 {
  "t": "State locking: why it prevents corruption, which backends support it, `-lock-timeout` and `terraform force-unlock`",
  "hook": "It is 6:40 p.m. at Birchway Utilities, and Kenji's deployment pipeline fails with a red error: Error acquiring the state lock. The message names a lock ID, a user named ci-runner and an operation of OperationTypeApply that started forty minutes ago. Kenji remembers someone cancelling a stuck pipeline around then. His teammate says, \"Just run it with -lock=false, we need this out tonight.\" Kenji hesitates. If another job really is still running, that shortcut could leave the state describing infrastructure that does not exist. What is the lock protecting, and what is the safe way forward?",
  "simple": "Terraform's state file is its record of what it built. If two people change the infrastructure at the same moment, both might save their own version of that record, and the second save would wipe out the first, leaving a record that no longer matches reality. A lock prevents that: before Terraform makes changes, it puts a 'busy' sign on the state, and anyone else who tries must wait or stop. When it finishes, it takes the sign down. If a crash leaves the sign up by mistake, a person can remove it by hand, but only after checking nobody is really working. It is like the occupied sign on a single-person restroom: it keeps two people from walking in at once.",
  "body": [
   "Start with the problem locking solves. Imagine two engineers running `terraform apply` against the same state at the same moment. Both read the same starting state, both make changes in the cloud and both try to write a new state. Whichever writes second overwrites the first, and the state no longer matches reality: resources the first engineer created are now missing from state, so Terraform may later try to create them again or lose track of them entirely. State locking prevents this by letting only one operation that could write state run at a time.",
   "Locking is automatic. When a backend supports locking, Terraform acquires the lock before any operation that might write state, such as `plan`, `apply`, `destroy`, `import`, `refresh` and the state-changing `state` subcommands, and releases it at the end. You do not have to do anything to enable locking beyond choosing a backend that supports it. If someone else holds the lock, your command fails with an error that shows the lock ID, who holds it, the operation type, the Terraform version and when it was taken. That information is your starting point for deciding what to do.",
   "```text\nError: Error acquiring the state lock\n\nLock Info:\n  ID:        6f1c2a3b-9d4e-4a7b-8c21-0e5f7d9a1b22\n  Operation: OperationTypeApply\n  Who:       ci-runner@build-07\n  Created:   (timestamp)\n```",
   "Not every backend supports locking, and the exam expects you to know the common ones. The local backend locks using the operating system's file locking. Among remote backends, azurerm uses blob leases on the state blob, gcs uses a lock file in the bucket, consul and pg (PostgreSQL) support locking natively, and HCP Terraform locks workspaces during runs and also lets people lock a workspace manually. The s3 backend historically needed a separate DynamoDB table for locking, configured with the `dynamodb_table` argument. Newer Terraform versions can instead use a lock file in the S3 bucket itself with `use_lockfile = true`, and the DynamoDB approach is deprecated and being phased out. Always check the backend's documentation, because a backend without locking leaves you exposed to exactly the race described above.",
   "Two flags control lock behavior from the command line. `-lock-timeout=DURATION`, such as `-lock-timeout=5m`, tells Terraform to keep retrying for that long before giving up, which is useful in CI (continuous integration) where jobs might briefly overlap. The default is zero, which means fail immediately if the lock is held. `-lock=false` disables locking for a command. It is dangerous and should be avoided except in unusual recovery situations where you are certain nothing else can touch the state, because it removes the only protection against concurrent writes.",
   "Sometimes a lock is left behind. A CI job might be killed, a laptop might lose its network connection mid-apply, or a process might crash before it releases the lock. In those cases the lock stays in place even though nothing is running, and every later command fails. `terraform force-unlock LOCK_ID` removes it. It requires the lock ID shown in the error message, asks you to confirm by typing yes (unless you add `-force`), and only unlocks state for the configuration in the current working directory.",
   "```text\n$ terraform force-unlock 6f1c2a3b-9d4e-4a7b-8c21-0e5f7d9a1b22\nDo you really want to force-unlock?\n  Only 'yes' will be accepted to confirm.\n```",
   "Treat force-unlock as a last resort and verify first. Check the CI system for running jobs, ask the person named in the Who field, and compare the Created time with when the job ended. Use force-unlock only when you are sure no other operation is actually running; force-unlocking an active run invites exactly the corruption locking was meant to prevent. After unlocking, run `terraform plan` to see whether the interrupted run left changes half-applied, and let the next apply bring state and reality back in line.",
   "Locking also shapes how teams organize their work. Because the lock covers a whole state, two engineers changing unrelated parts of one large configuration still have to take turns. That is one reason teams split infrastructure into several smaller states, for example networking, databases and applications, each with its own backend key or workspace. Smaller states mean shorter lock times, fewer collisions and a smaller blast radius if something does go wrong, while the lock still guarantees that each individual state is written by only one operation at a time.",
   "To summarize for the exam: locking is automatic on supporting backends and protects state from concurrent writes. Know which backends lock and how. Use `-lock-timeout` to wait for a lock instead of failing immediately, avoid `-lock=false`, and use `terraform force-unlock` with the lock ID only for stale locks after confirming nothing is running."
  ],
  "analogy": "State locking works like the talking stick in a meeting: only the person holding it may speak, so two people never talk over each other. `-lock-timeout` is like politely waiting a few minutes for the stick to come around instead of walking out. `force-unlock` is like the facilitator taking the stick from someone who left the room without handing it back. The analogy breaks if the person is still in the room and mid-sentence: taking the stick then is exactly the interruption the rule exists to prevent.",
  "terms": [
   [
    "State locking",
    "A backend feature that allows only one state-writing Terraform operation at a time to prevent corruption."
   ],
   [
    "-lock-timeout",
    "A flag that makes Terraform retry acquiring a held lock for a given duration before failing; the default is to fail immediately."
   ],
   [
    "-lock=false",
    "A flag that disables locking for one command; risky and only for rare recovery situations."
   ],
   [
    "terraform force-unlock",
    "Manually removes a stale lock using its lock ID; for use only when no operation is running."
   ],
   [
    "Lock ID",
    "The identifier shown in a lock error that force-unlock needs to release that specific lock."
   ]
  ],
  "example": "A CI job applying networking changes is cancelled halfway, leaving the S3 backend locked. The next pipeline fails with a lock error. After confirming in the CI system that no job is still running, an engineer runs terraform force-unlock with the lock ID from the error, then re-runs the pipeline.",
  "mistakes": [
   [
    "You must turn on locking with a special flag or setting for every command.",
    "On a backend that supports it, Terraform acquires and releases locks automatically. Some backends, such as s3, need a locking option configured once in the backend block."
   ],
   [
    "When you see a lock error, the fix is to rerun with -lock=false.",
    "That removes protection against concurrent writes. Find out whether another operation is running; wait with -lock-timeout or, if the lock is stale, use force-unlock with its ID."
   ],
   [
    "terraform force-unlock works without arguments and clears every lock.",
    "It requires the specific lock ID from the error message and applies to the current configuration's state."
   ],
   [
    "Every backend supports locking.",
    "Support varies. local, s3 (with a lock file or DynamoDB), azurerm, gcs, consul, pg and HCP Terraform support it, but you must check each backend's documentation."
   ]
  ],
  "tryit": [
   [
    "Two CI pipelines in your organization sometimes start within seconds of each other for the same workspace, and the second one fails with a lock error even though the first finishes in about two minutes. Nobody wants to disable locking. What change do you make?",
    "Add -lock-timeout to the pipeline's Terraform commands, for example -lock-timeout=5m. The second job will retry until the first releases the lock instead of failing immediately, and locking still prevents simultaneous writes."
   ],
   [
    "A lock error names a user who left for vacation yesterday, created eighteen hours ago, with operation apply. Your CI shows no running jobs. What do you do?",
    "Verify as far as possible that nothing is running, then run terraform force-unlock with the lock ID from the error and confirm. Afterwards run terraform plan to check whether the interrupted apply left anything half-done before applying again."
   ]
  ],
  "tip": "Locking is automatic on supporting backends. force-unlock needs the lock ID and is a last resort; -lock-timeout waits for a lock instead of failing immediately.",
  "check": [
   [
    "What argument does terraform force-unlock require?",
    "The lock ID of the lock to remove, shown in the lock error message."
   ],
   [
    "Your pipeline sometimes fails because another job briefly holds the lock. Which flag helps?",
    "-lock-timeout, for example -lock-timeout=5m, so Terraform retries instead of failing immediately."
   ],
   [
    "Do you need to enable locking manually on a backend that supports it?",
    "No. Terraform acquires and releases locks automatically for operations that could write state."
   ]
  ]
 },
 {
  "t": "The `backend` block inside `terraform {}`: remote backends such as S3, azurerm, gcs, consul and pg",
  "hook": "Northgate Library Services has grown from one infrastructure engineer to five, plus a CI pipeline, and the state file still lives on Amara's laptop. Last week two people applied changes on the same afternoon from copies of the state they had emailed each other, and it took a day to untangle. Amara's manager asks her to put state somewhere shared, locked and encrypted before anyone touches production again. She opens `main.tf` and wonders where that setting even goes, which storage options Terraform understands, and what happens to the state she already has. Where does Terraform decide where state lives?",
  "simple": "Terraform keeps a record of everything it built, called state. A backend is the setting that decides where that record is stored. If you say nothing, it stays in a file on your own computer. For a team, you pick a remote backend, which means a shared storage service in the cloud or on a server, such as an Amazon S3 bucket, an Azure storage container, a Google Cloud Storage bucket, a Consul server or a PostgreSQL database. You choose it by writing a backend block inside the terraform block at the top of your project. It is like moving a family calendar from one person's phone to a shared wall calendar in the kitchen, where everyone sees the same dates and only one person writes at a time.",
  "body": [
   "A backend decides where Terraform stores state and, for many backends, how it locks that state. You choose one with a `backend` block nested inside the top-level `terraform` block of the root module, the same block that holds `required_version` and `required_providers`. The block has one label, the backend type, such as `backend \"s3\"`, followed by that backend's arguments. Only one backend can be configured per configuration, and only the root module's backend matters; child modules cannot have their own, because state belongs to the whole configuration, not to individual modules.",
   "Why go remote at all? Remote backends put state somewhere shared, durable and access-controlled, which is what teams need. Everyone and every pipeline reads and writes the same state instead of passing copies around. Locking prevents simultaneous writes. The storage service can provide encryption at rest, access policies and version history, so a bad write can be rolled back. Terraform also reads and writes remote state in memory where possible rather than leaving full copies on each engineer's disk, which reduces the chance of secrets in state lingering on laptops.",
   "```hcl\nterraform {\n  backend \"s3\" {\n    bucket       = \"example-tf-state\"\n    key          = \"network/terraform.tfstate\"\n    region       = \"us-east-1\"\n    encrypt      = true\n    use_lockfile = true\n  }\n}\n```",
   "The s3 backend is the one you will see most often. It stores state as an object in an Amazon S3 bucket. The `bucket` argument names the bucket, `key` is the object path inside it, `region` is where the bucket lives, and `encrypt` enables server-side encryption. Locking uses either an S3 lock file stored next to the state (`use_lockfile = true`) or, in older setups, a DynamoDB table named with `dynamodb_table`. Teams usually enable versioning on the bucket so every past state can be recovered, and they choose a distinct `key` per configuration, such as `network/terraform.tfstate` and `app/terraform.tfstate`, so several configurations can share one bucket safely.",
   "The other common backends follow the same idea with different storage. `azurerm` stores state as a blob in an Azure Storage container, using arguments such as `resource_group_name`, `storage_account_name`, `container_name` and `key`, and it locks with blob leases. `gcs` stores state in a Google Cloud Storage bucket using `bucket` and an optional `prefix`, which works like a folder, and it supports locking. `consul` stores state in HashiCorp Consul's key/value store under a `path` and supports locking. `pg` stores state in a PostgreSQL database and supports locking. There are others, such as `http` and `kubernetes`, and the `local` backend is the default when no backend block is present.",
   "Changing the backend block always requires re-initialization. After you add, edit or remove it, `terraform init` configures the backend. If state already exists in the old location, init detects the change and offers to copy it, which is covered by the `-migrate-state` flag. Until you re-initialize, commands such as `terraform plan` stop with an error saying the backend configuration has changed and init is required.",
   "Do not confuse two similarly named files. Terraform records the active backend settings in `.terraform/terraform.tfstate` inside the hidden `.terraform` directory. Despite its name, this small file is not your infrastructure state; it only remembers which backend and settings this working directory is using. Your real state lives in the backend itself, for example as the S3 object at the configured key. Deleting the `.terraform` directory does not delete your state; it just means you must run init again.",
   "Credentials deserve special care. Backend credentials, such as cloud access keys, should not be written into the backend block, because that file is committed to version control. Supply them with the usual provider-style environment variables, shared credential files, managed identities or instance roles, or with partial configuration at init time. The backend block also cannot use variables or other expressions, which is why values that differ per environment are usually supplied the same way.",
   "Finally, know where HCP Terraform fits. HCP Terraform is configured with a separate `cloud` block inside `terraform {}` rather than a backend block, naming an organization and one or more workspaces. Older configurations may still use the `remote` backend for the same service. A configuration uses either a `cloud` block or a `backend` block, never both, and for the exam remember that the `backend` block belongs inside `terraform {}`, only in the root module, and that any change to it requires `terraform init`."
  ],
  "analogy": "A backend is like choosing where a shared ledger is kept. The local backend is a notebook in one person's desk drawer. A remote backend is a ledger in the office safe that anyone authorized can consult, with a sign-out sheet so only one person writes at a time. The `key` is the page number, which lets many ledgers share one safe. The analogy stops at the `.terraform/terraform.tfstate` file, which is just a sticky note saying which safe to use, not the ledger itself.",
  "terms": [
   [
    "Backend",
    "The component that determines where Terraform state is stored and whether it can be locked."
   ],
   [
    "backend block",
    "A block inside terraform {} that selects a backend type and sets its arguments; only one per root module."
   ],
   [
    "Remote backend",
    "A backend that stores state in a shared service such as S3, Azure Storage, GCS, Consul or PostgreSQL."
   ],
   [
    "key (s3/azurerm)",
    "The path or blob name under which the state file is stored in the bucket or container."
   ],
   [
    "cloud block",
    "The block inside terraform {} that connects a configuration to HCP Terraform instead of using a backend block."
   ]
  ],
  "example": "A team moves from local state to the s3 backend. They add a backend \"s3\" block with the bucket, key, region, encrypt = true and locking, run terraform init, accept the prompt to copy the existing state, and from then on every engineer and the CI pipeline share the same locked state.",
  "mistakes": [
   [
    "Each child module can declare its own backend to store its part of the state.",
    "Only the root module's backend is used. Child modules cannot have backends; state belongs to the whole configuration."
   ],
   [
    "The backend block can go at the top level of a file, like a provider block.",
    "It must be nested inside the terraform {} block of the root module."
   ],
   [
    "The file .terraform/terraform.tfstate is the real state, so deleting it destroys your state.",
    "It only records which backend and settings this directory uses. Real state lives in the backend; deleting .terraform just requires running init again."
   ],
   [
    "Putting access keys in the backend block is fine because it is only read at init.",
    "The block is committed to version control. Provide credentials through environment variables, credential files, managed identities or partial configuration."
   ]
  ],
  "tryit": [
   [
    "Your organization runs on Azure. You need shared state for three separate configurations (network, data and apps) with locking, and you already have one storage account and container for Terraform. How do you configure the backends so the three states do not collide?",
    "Use the azurerm backend in each root module with the same storage_account_name and container_name, but a different key for each, such as network.tfstate, data.tfstate and apps.tfstate. azurerm locks with blob leases automatically, and the distinct keys keep the states separate. Run terraform init in each configuration after adding the block."
   ]
  ],
  "tip": "The backend block goes inside terraform {}, only in the root module, and any change to it requires running terraform init again. HCP Terraform uses a cloud block instead.",
  "check": [
   [
    "Where is a backend block placed?",
    "Inside the top-level terraform block of the root module."
   ],
   [
    "Which backend stores state in Azure Storage and locks with blob leases?",
    "The azurerm backend."
   ],
   [
    "What must you run after changing backend settings?",
    "terraform init, which reconfigures the backend and can migrate existing state."
   ]
  ]
 },
 {
  "t": "Backend blocks cannot use variables; partial configuration with `-backend-config`",
  "hook": "Felix at Driftwood Ferries wants one Terraform codebase for dev, staging and prod, each with its own state bucket. It seems obvious: add `variable \"state_bucket\"` and write `bucket = var.state_bucket` in the backend block, then pass a different value per environment. He runs `terraform init` and gets an error that variables may not be used here. A colleague suggests hard-coding the prod bucket and access key into the block and using Git branches for the rest, which makes the security lead wince. Felix needs different backend settings per environment without secrets in code. How do teams do it?",
  "simple": "Terraform has to find its record of what it built, called state, before it does anything else. The backend block tells it where that record lives. Because Terraform reads the backend block first, before it has worked out any of your variables, the backend block cannot use variables at all; it only accepts plain, typed-out values. To use different settings for different environments, you leave some settings out of the block and supply them when you run terraform init, either typed on the command line or from a small settings file. It is like a delivery driver who needs the street address before leaving the depot: you cannot write 'whatever address the customer picks later' on the label.",
  "body": [
   "The rule comes from the order in which Terraform does things. Terraform initializes the backend before it evaluates anything else in the configuration, because it needs the backend to read state, and it needs state before it can plan. At that early point, input variables, locals and data sources have not been processed. As a result, a `backend` block cannot contain references such as `var.bucket`, `local.key` or any other expression that depends on configuration values. Only literal values are allowed, and Terraform reports an error during init if you try to use a variable there, with a message explaining that variables may not be used in this block.",
   "That restriction creates a practical problem. You often want the same code to use a different bucket, storage account or key for each environment, so that dev and prod never share state. You certainly do not want access keys hard-coded in version control. And you do not want to maintain separate copies of the code just to change a few backend values. The answer is partial configuration: leave some or all backend arguments out of the block and supply them when you run `terraform init`.",
   "There are three ways to provide the missing values, and you can combine them. You can pass key/value pairs on the command line with `-backend-config=\"KEY=VALUE\"`, repeating the flag for each argument, such as `-backend-config=\"bucket=example-dev-state\"`. You can pass a file path with `-backend-config=PATH`, where the file contains the arguments in HCL format. The file is commonly given a name such as `prod.s3.tfbackend`, and HashiCorp recommends the `.tfbackend` suffix. Or, if you run init interactively and required values are still missing, Terraform prompts for them. Many backends also read certain settings, especially credentials and sometimes the region, from environment variables, which is a fourth source that does not involve init flags at all.",
   "```text\n# backend.tf\nterraform {\n  backend \"s3\" {}\n}\n\n# prod.s3.tfbackend\nbucket = \"example-prod-state\"\nkey    = \"app/terraform.tfstate\"\nregion = \"us-east-1\"\n\n$ terraform init -backend-config=prod.s3.tfbackend\n```",
   "An empty backend block like `backend \"s3\" {}` is valid and common. It declares the backend type while leaving all settings to init. Note that the backend type itself must be in the block; you cannot choose between s3 and azurerm at init time. A middle ground is also common, where shared values such as the region and `encrypt = true` stay in the block and only the environment-specific bucket and key come from the file.",
   "Terraform merges the values from the block, the files and the command line into one final configuration. If the same argument appears in more than one place, values supplied at init time are applied on top of what the block contains, and when multiple `-backend-config` flags are given they are processed in order. In practice, avoid setting the same argument in several places, because it makes the result harder to reason about.",
   "Be careful about where those values end up. The final merged configuration is stored in `.terraform/terraform.tfstate` and in any saved plan files, so secrets passed with `-backend-config` are written to local disk in plain text. For credentials, environment variables or the platform's standard credential chain, such as instance roles, managed identities or workload identity in CI (continuous integration), are usually a better choice. Keep `.tfbackend` files for non-secret values like bucket names and keys, which are safe to commit.",
   "Partial configuration fits CI pipelines naturally. A pipeline can call `terraform init -backend-config=env/${ENV}.tfbackend` for each environment while the Terraform code stays identical, and the choice of environment becomes a pipeline parameter rather than a code change. It also keeps environment-specific or sensitive details out of shared modules and makes it easy to add an environment: create a new `.tfbackend` file and run init with it. Remember that switching an existing working directory to a different backend configuration is a backend change, so use `-reconfigure` or `-migrate-state` as appropriate, or use a fresh working directory per environment.",
   "The same idea applies to HCP Terraform. The `cloud` block has a similar limitation, since it is also read before variables are evaluated, and it can instead read settings from environment variables such as `TF_CLOUD_ORGANIZATION` and `TF_WORKSPACE`. For the exam, the pattern to recognize is simple: if a question shows `var.` inside a backend block, that is not allowed, and the fix is partial configuration with `-backend-config` files or key/value pairs at init."
  ],
  "analogy": "A backend block is like the address printed on a shipping label before the truck leaves the warehouse. The truck cannot depart with a label that says 'fill in later from the customer's order form', because the order form is opened only after delivery. Partial configuration is like printing the label with the city already filled in and handing the driver a card with the street address at the loading dock. The analogy stops at secrets: whatever is written on that card is also kept in the driver's logbook, so do not put the door key on it.",
  "terms": [
   [
    "Partial configuration",
    "Leaving some backend arguments out of the backend block and supplying them at terraform init time."
   ],
   [
    "-backend-config",
    "An init flag that supplies backend settings, either as KEY=VALUE pairs or as a path to a configuration file."
   ],
   [
    "Backend configuration file",
    "An HCL file of backend arguments passed with -backend-config, often named with a .tfbackend suffix."
   ],
   [
    "Early evaluation",
    "The reason backends cannot use variables: backends are initialized before variables and locals are evaluated."
   ],
   [
    "Empty backend block",
    "A block such as backend \"s3\" {} that names the backend type and leaves all arguments to init."
   ]
  ],
  "example": "A pipeline deploys the same code to dev and prod. The backend block is just backend \"azurerm\" {}. The dev job runs terraform init -backend-config=dev.tfbackend and the prod job uses prod.tfbackend, each pointing at a different storage account and key, with credentials coming from the pipeline's managed identity.",
  "mistakes": [
   [
    "You can write bucket = var.state_bucket in a backend block if the variable has a default.",
    "No expressions are allowed in a backend block, defaults included, because the backend is initialized before variables are evaluated. Use -backend-config instead."
   ],
   [
    "-backend-config is the safest place to pass access keys.",
    "Values passed this way are saved in .terraform/terraform.tfstate and in plan files on disk. Prefer environment variables or the platform's credential chain for secrets."
   ],
   [
    "With partial configuration you can choose the backend type at init, for example s3 or gcs.",
    "The backend type must be written in the block. Partial configuration supplies only that backend's arguments."
   ],
   [
    "You need a separate copy of the code for each environment's backend.",
    "One codebase with an empty or partial backend block and one .tfbackend file per environment is the standard approach."
   ]
  ],
  "tryit": [
   [
    "Your pipeline deploys to dev and prod from the same repository using the gcs backend. Security requires that no credentials be stored in the repository or on runner disks, and that dev and prod states be in different buckets. How do you set up the backend and the init commands?",
    "Write terraform { backend \"gcs\" {} } (optionally with shared values), create dev.gcs.tfbackend and prod.gcs.tfbackend containing only the bucket and prefix, and run terraform init -backend-config=dev.gcs.tfbackend or the prod file in each job. Supply credentials through the runner's workload identity or environment-based credentials, not through -backend-config, because init-time values are written to disk."
   ]
  ],
  "tip": "If a question shows var. inside a backend block, the answer is that it is not allowed; use -backend-config files or key/value pairs at init instead, and keep secrets in environment variables.",
  "check": [
   [
    "Why can't a backend block reference input variables?",
    "The backend is initialized before Terraform evaluates variables and locals, so only literal values are allowed."
   ],
   [
    "Name two forms the -backend-config flag accepts.",
    "A KEY=VALUE pair such as -backend-config=\"bucket=my-state\", or a path to a file containing backend arguments."
   ],
   [
    "Why are credentials better supplied through environment variables than -backend-config?",
    "Values passed with -backend-config are stored in .terraform/terraform.tfstate and plan files on local disk."
   ]
  ]
 },
 {
  "t": "Migrating state between backends with `terraform init -migrate-state`",
  "hook": "Sunday maintenance window at Kestrel Pharmacy Group. Ravi has just added a gcs backend block to the configuration that has run from local state for two years. He types `terraform init`, sees a question about the backend change, and remembers a forum post that said to use `-reconfigure`. A colleague on the call stops him: last year another team did exactly that, saw a plan to create two hundred resources that already existed, and nearly applied it. Ravi has one hour, a production estate, and a state file that must arrive in the new bucket intact. Which flag moves the state, and how does he prove it worked?",
  "simple": "Terraform keeps a record of what it built, called state, in a place chosen by the backend setting. Sometimes you want to move that record, for example from your laptop to a shared cloud bucket. You change the backend setting in your code, then run terraform init with -migrate-state, and Terraform copies the record from the old place to the new one after asking you to confirm. A different flag, -reconfigure, switches to the new place without copying anything, which can leave Terraform looking at an empty record. It is like moving house: -migrate-state packs your belongings into the truck, while -reconfigure just hands you the keys to an empty new home.",
  "body": [
   "Moving state is a normal part of a team's growth. Teams often start with local state and later move to a remote backend, or move between remote backends when they change clouds, consolidate storage or adopt HCP Terraform. Terraform can copy existing state from the old backend to the new one for you as part of re-initialization, so you do not have to download, rename and upload files by hand, which is error-prone and easy to get wrong under time pressure.",
   "The process is short. First, edit the configuration: add, change or remove the `backend` block, or add a `cloud` block for HCP Terraform. Next, run `terraform init`. Terraform compares the new backend configuration with the one recorded in `.terraform/terraform.tfstate` and notices that it differs. Running `terraform init -migrate-state` tells it explicitly that you want to copy the existing state into the new backend. Terraform then asks for confirmation, copies the state, and from that point on reads and writes the new location.",
   "```text\n$ terraform init -migrate-state\nInitializing the backend...\nDo you want to copy existing state to the new backend?\n  Enter \"yes\" to copy and \"no\" to start with an empty state.\n```",
   "Read that prompt carefully, because the answer matters. Typing yes copies the state. Typing no starts the new backend with an empty state, which is rarely what you want for a live environment. If the destination already contains a state, Terraform warns you and asks whether to overwrite it, which is another moment to stop and check that you are pointing at the right bucket and key.",
   "Compare this with `terraform init -reconfigure`, the flag that causes the most confusion. It also accepts a changed backend configuration, but it ignores the old saved backend settings entirely and does not migrate any state. It is useful when you intentionally want to point at a different state that already exists, for example switching a working directory from the dev bucket to the prod bucket, or when the old backend is unreachable and you have already restored state elsewhere. Used by mistake, it leaves you looking at an empty or different state while the old state sits untouched, and the next plan may propose creating every resource again. Remember: `-migrate-state` copies, `-reconfigure` does not.",
   "Migration works in both directions and across workspaces. Moving back from a remote backend to local state works the same way: remove the `backend` block and run `terraform init -migrate-state`, and Terraform copies the state into a local `terraform.tfstate`. If you use multiple CLI workspaces, Terraform can migrate all of them, and it will ask how to map them when the destination handles workspaces differently, for example when moving to HCP Terraform, where each CLI workspace becomes an HCP Terraform workspace. Adding `-force-copy` answers yes to the copy prompts automatically, which is handy in automation, but it removes your chance to catch a wrong destination, so use it only in scripts you have tested.",
   "Before any migration, take precautions. Make sure no one else is running Terraform against this state, and pause any pipelines that might start during the window. Keep a backup copy of the state, for example with `terraform state pull > backup.tfstate`, which writes the current state from the configured backend to a local file. Confirm you have permission to write to the new backend and that locking is configured there. These steps take minutes and turn a risky change into a reversible one.",
   "After the migration, verify. Run `terraform plan` and confirm that it reports no changes, or only the changes you already expected. A clean plan proves that the new backend holds the same resources and that Terraform still matches them to real infrastructure. You can also compare `terraform state list` output before and after. A plan that wants to create everything is the classic sign that state did not arrive and that `-reconfigure` or a no answer was used by mistake.",
   "Finally, close the old location. Once you are confident, remove or lock down the old state so nobody keeps writing to it from an outdated working directory or pipeline. For local state, delete or archive the old `terraform.tfstate` and its backup securely, since they may contain secrets. For an old remote backend, restrict write access and keep versioned copies for a while in case you need to investigate. For the exam, hold on to the core contrast: to keep your resources tracked when changing backends, use `-migrate-state`; `-reconfigure` starts with the new backend as it is and copies nothing."
  ],
  "analogy": "Migrating state is like moving a library's card catalog to a new building. `-migrate-state` hires movers who carry every drawer across and ask you to sign for the delivery. `-reconfigure` simply tells the librarians to work in the new building, where the catalog drawers happen to be empty, so they conclude no books exist and start ordering duplicates. The analogy stops at the books themselves: your cloud resources never move during a migration; only the record that describes them does.",
  "terms": [
   [
    "terraform init -migrate-state",
    "Re-initializes with a changed backend and copies existing state from the old backend to the new one."
   ],
   [
    "terraform init -reconfigure",
    "Re-initializes with a changed backend while ignoring the previous backend settings and without migrating state."
   ],
   [
    "-force-copy",
    "An init flag that automatically answers yes to state migration prompts."
   ],
   [
    "terraform state pull",
    "Outputs the current state from the configured backend, useful for taking a backup before migration."
   ],
   [
    "Backend migration",
    "Moving state from one backend to another, such as local to s3 or s3 to HCP Terraform, without changing the real infrastructure."
   ]
  ],
  "example": "A startup has been using local state. The lead adds a gcs backend block, runs terraform state pull to save a backup, then runs terraform init -migrate-state and answers yes. A follow-up terraform plan shows no changes, confirming the bucket now holds the same state.",
  "mistakes": [
   [
    "-reconfigure and -migrate-state both move your existing state to the new backend.",
    "Only -migrate-state copies state. -reconfigure ignores the old backend and copies nothing, so Terraform may see an empty state."
   ],
   [
    "Migrating state moves or recreates the cloud resources themselves.",
    "Only the state record moves. Real resources are untouched, which is why a clean plan afterward is the proof of success."
   ],
   [
    "Once migration finishes, you can leave the old state file in place without consequences.",
    "An outdated working directory or pipeline could keep writing to it, and it may contain secrets. Remove or lock down the old location."
   ],
   [
    "-force-copy is always the best choice because it avoids typing yes.",
    "It removes the confirmation step that catches a wrong destination. Use it only in tested automation."
   ]
  ],
  "tryit": [
   [
    "You have changed a configuration's backend from s3 to gcs and run terraform init -migrate-state. The next terraform plan proposes creating all 140 resources. What most likely happened, and what do you do before anything else?",
    "The state probably did not arrive: the copy prompt may have been answered no, the wrong bucket or prefix was configured, or -reconfigure was used instead. Do not apply. Check the gcs bucket and backend settings, restore from the backup you pulled or from the old s3 state, rerun init -migrate-state and confirm yes, then plan again until it shows no unexpected changes."
   ],
   [
    "Your team is moving a configuration with dev and prod CLI workspaces from the local backend to an s3 backend during a maintenance window. List the steps in order.",
    "Pause other Terraform runs; back up state for each workspace with terraform state pull; add the s3 backend block with locking; run terraform init -migrate-state and confirm copying all workspaces; run terraform plan in each workspace and confirm no changes; then securely remove or archive the old local state files."
   ]
  ],
  "tip": "To keep your resources tracked when changing backends, use -migrate-state; -reconfigure starts fresh with the new backend and copies nothing. Back up first, plan after.",
  "check": [
   [
    "You change your backend from local to s3 and want your existing state moved. Which command?",
    "terraform init -migrate-state, then confirm the copy."
   ],
   [
    "What is the risk of using terraform init -reconfigure after changing backends?",
    "It does not copy state, so Terraform may see an empty state and plan to recreate existing resources."
   ],
   [
    "How do you confirm a migration succeeded?",
    "Run terraform plan against the new backend and check that it shows no unexpected changes."
   ]
  ]
 },
 {
  "t": "The `cloud` block for HCP Terraform",
  "hook": "It is Monday morning at Ridgeway Outfitters, and Dana has just inherited the networking configuration from a contractor who left on Friday. The state file lives on the contractor's old laptop, the cloud keys are pasted into a shell profile, and two engineers ran `apply` at the same time last month and spent a weekend untangling the result. Your manager wants every run to happen in HCP Terraform, with state stored centrally, locked during runs and visible to the whole team. You open `main.tf` and see an empty `terraform {}` block. What exactly do you write inside it, and what happens the next time someone types `terraform plan`?",
  "simple": "Normally Terraform keeps its notes about your infrastructure, called state, in a file on your own computer, and it runs on your computer too. HCP Terraform is a website run by HashiCorp that can keep those notes for you and even do the runs on its own machines. The `cloud` block is a few lines you add to your code that say: use HCP Terraform, this is our organization, and this is the workspace (a named container for one set of infrastructure). It is like switching from keeping your family photos in a shoebox at home to a shared online album: you tell the app which account and which album, and from then on everyone sees the same copy, and two people cannot overwrite each other at the same moment.",
  "body": [
   "HCP Terraform (HashiCorp Cloud Platform Terraform, formerly Terraform Cloud) is HashiCorp's hosted service for running Terraform and storing state. To connect a configuration to it, you add a `cloud` block inside the top-level `terraform` block. The `cloud` block replaced the older `remote` backend as the recommended integration, and it does more than a backend does. Besides storing state, it lets ordinary command-line interface (CLI) commands such as `terraform plan` and `terraform apply` run remotely in HCP Terraform while you watch the output in your own terminal. The same block also works with Terraform Enterprise, the self-hosted edition of the platform.",
   "The block needs two pieces of information: which organization to use and which workspace or workspaces the configuration maps to. The `organization` argument names the HCP Terraform organization that owns the workspaces. The nested `workspaces` block then selects workspaces in one of two ways. Using `name` maps the configuration to exactly one workspace. Using `tags` maps it to every workspace carrying those tags, and you switch among them with `terraform workspace select`, just as you would with CLI workspaces. Two optional arguments round out the block: `project` places newly created workspaces into a particular HCP Terraform project, and `hostname` points at a Terraform Enterprise installation instead of the default HCP Terraform address.",
   "```hcl\nterraform {\n  cloud {\n    organization = \"example-org\"\n    workspaces {\n      name = \"networking-prod\"\n    }\n  }\n}\n```",
   "A few rules about where the block can appear and what it can contain are favorites on the exam. A configuration can have either a `cloud` block or a `backend` block, never both, because both answer the same question of where state lives. Like backend blocks, the `cloud` block is read very early, during initialization, before Terraform evaluates the rest of the configuration, so it cannot use input variables, locals or data sources. To keep the code reusable anyway, HCP Terraform supports environment variables that fill in or override settings: `TF_CLOUD_ORGANIZATION` for the organization, `TF_CLOUD_HOSTNAME` for the hostname, `TF_CLOUD_PROJECT` for the project and `TF_WORKSPACE` for the workspace. A continuous integration (CI) pipeline can therefore point the same code at different organizations or workspaces just by setting variables in its job definition.",
   "Authentication comes next. Before `terraform init` can talk to HCP Terraform, the CLI needs an application programming interface (API) token. The usual way to get one is `terraform login`, which opens a browser page where you generate a token and then stores it in a local credentials file in your user profile. In automation you supply the token through an environment variable or a CLI configuration file instead of an interactive login. Without a valid token, initialization fails with an authorization error rather than silently falling back to local state.",
   "With the block written and a token in place, you run `terraform init`. Terraform connects to the organization, creates the named workspace if it does not exist yet and, if you already had state somewhere else, such as a local `terraform.tfstate` file or an older backend, offers to migrate that state into the workspace. This is how teams move existing projects into HCP Terraform without recreating any infrastructure: the resources stay exactly where they are, and only the record of them moves.",
   "What happens on `terraform plan` after that depends on the workspace's execution mode, a setting stored on the workspace rather than in your code. In remote mode, the default, Terraform uploads your configuration, the plan runs on HCP Terraform's infrastructure and the output streams back to your terminal. The run uses variables and credentials stored in the workspace, so engineers do not need cloud keys on their laptops, and the run appears in the workspace's history for everyone to see. In local mode, runs happen on your own machine with your own credentials, and HCP Terraform only stores the state. A third option, agent mode, runs the work on self-hosted agents that you operate inside your own network, which is useful when the infrastructure is not reachable from the internet.",
   "Whichever mode you choose, the state benefits are the same. State is stored in the workspace, encrypted at rest, versioned so you can view or roll back to earlier snapshots, and locked automatically while a run is in progress so two people cannot apply at once. This is why the `cloud` block is often the simplest answer to the classic problems of local state: lost files, secrets on laptops and concurrent runs that corrupt each other.",
   "Keep the distinctions straight for the exam. The `cloud` block goes inside `terraform {}`, not at the top level. It selects one workspace by `name` or many by `tags`, not both at once. It cannot reference variables, but environment variables can supply or override its settings. And it is mutually exclusive with any `backend` block, including the legacy `remote` backend that it replaced."
  ],
  "analogy": "Think of the `cloud` block as the mailing address on a parcel service account. The organization is the company account, and the workspace name is the specific delivery address. Once it is written down, every package (every run and every state update) goes to the same place, gets tracked and is signed for one at a time. The analogy stops working on one point the exam likes: you cannot fill in the address with a variable at the counter. It has to be written literally or supplied through environment variables.",
  "terms": [
   [
    "cloud block",
    "A block inside terraform {} that connects a configuration to HCP Terraform or Terraform Enterprise for state storage and remote runs."
   ],
   [
    "organization",
    "The cloud block argument naming the HCP Terraform organization that owns the workspaces."
   ],
   [
    "workspaces { name / tags }",
    "The nested block that maps the configuration to one workspace by name or to several by tags."
   ],
   [
    "Execution mode",
    "A workspace setting that decides whether runs execute remotely in HCP Terraform, locally on your machine, or on self-hosted agents."
   ],
   [
    "terraform login",
    "A command that obtains an HCP Terraform API token and saves it in a local credentials file for the CLI to use."
   ],
   [
    "TF_CLOUD_ORGANIZATION / TF_WORKSPACE",
    "Environment variables that supply or override the organization and workspace used by the cloud block."
   ]
  ],
  "example": "A team adds a cloud block naming their organization and the workspace app-staging, runs terraform login and then terraform init, which offers to migrate their old local state. Their next terraform plan runs in HCP Terraform, streams output to the terminal and uses cloud credentials stored as workspace variables, so nobody needs keys on their laptop and every run shows up in the workspace history.",
  "mistakes": [
   [
    "Putting both a cloud block and a backend block in the same configuration so state is stored twice.",
    "They are mutually exclusive. A configuration declares exactly one place for state: either a backend block or a cloud block."
   ],
   [
    "Writing organization = var.org_name so the block can be reused.",
    "The cloud block cannot use input variables or locals. Use environment variables such as TF_CLOUD_ORGANIZATION and TF_WORKSPACE to change settings per pipeline."
   ],
   [
    "Assuming the cloud block only stores state, like a storage backend.",
    "It also enables remote runs. In the default remote execution mode, plan and apply execute on HCP Terraform's infrastructure using workspace variables."
   ],
   [
    "Believing name and tags can be combined to select workspaces.",
    "The workspaces block uses name for exactly one workspace or tags for a group of workspaces, not both together."
   ]
  ],
  "tryit": [
   [
    "Your platform team keeps one configuration for an application and wants the CI pipeline to deploy it into app-dev, app-test and app-prod workspaces in HCP Terraform. A teammate proposes three copies of the code, each with a different workspace name in the cloud block. Is there a better approach?",
    "Yes. Keep one copy of the code. Either tag all three workspaces (for example with app) and select the tag in the workspaces block, then choose the target with terraform workspace select, or have the pipeline set TF_WORKSPACE for each job. Copying the code would let the environments drift apart."
   ],
   [
    "A developer runs terraform init on a laptop where nobody has ever used HCP Terraform before, and init fails with an authorization error. The cloud block looks correct. What is the most likely fix?",
    "The CLI has no API token. Run terraform login (or provide a token through an environment variable or CLI configuration file in automation), then run terraform init again."
   ]
  ],
  "tip": "The cloud block and a backend block are mutually exclusive; the cloud block selects workspaces by name (one) or tags (many), cannot use variables, and can be overridden with TF_CLOUD_ORGANIZATION and TF_WORKSPACE.",
  "check": [
   [
    "Can a configuration contain both a cloud block and a backend block?",
    "No. They are mutually exclusive ways of configuring where state is stored."
   ],
   [
    "How does a cloud block map a configuration to several workspaces?",
    "By using tags in the workspaces block instead of a single name."
   ],
   [
    "In the default remote execution mode, where does terraform plan actually run?",
    "On HCP Terraform's infrastructure, with output streamed back to your terminal and workspace variables used for the run."
   ]
  ]
 },
 {
  "t": "Sensitive data in state and protecting remote state (encryption, access control)",
  "hook": "The auditor at Kestrel Mutual Insurance asks a simple question during Thursday's review: who can read the production database password? Sam, the team lead, answers confidently that the password is marked `sensitive` in Terraform, so nobody can see it. The auditor asks to see the storage bucket that holds the state file. You pull up its permissions and count forty-two developers with read access, no encryption setting you can explain and versioning switched off. Then you open the latest state snapshot and search for the database resource. The password is sitting right there in plain text. How did `sensitive = true` fail to protect it, and what should the team have done instead?",
  "simple": "Terraform keeps a record, called state, of everything it built and every setting of each thing, including passwords and secret keys. Marking a value as sensitive only hides it on your screen; it is still written in the record. So the record itself has to be protected. Think of a diary where you write down your house alarm code. Drawing a sticky note over the code when friends look over your shoulder helps a little, but anyone who takes the diary can peel the note off. Real protection means locking the diary in a safe (encryption), giving the key to very few people (access control), keeping photocopies in case it is lost (versioning) and, best of all, writing fewer secrets in it in the first place.",
  "body": [
   "Terraform state records every attribute of every resource and data source it manages, and many of those attributes are secrets: database master passwords, generated private keys, access tokens and connection strings. Marking a variable or output `sensitive` hides it in plan and apply output, but it does not remove the value from state, where it is stored in plain text inside a JavaScript Object Notation (JSON) document. So you must assume that anyone who can read your state can read your secrets, and protect state accordingly. The exam returns to this point often: `sensitive` is a display setting, not encryption.",
   "The first defense is simply where state lives. Local state files sit unencrypted on disk, are easy to copy, end up in laptop backups and are easy to commit to version control by accident. Remote backends let you apply the storage service's protections. Encryption at rest is available on the major backends: the S3 backend's `encrypt` option enables server-side encryption, optionally with a customer-managed Key Management Service (KMS) key named by `kms_key_id`; Azure Storage and Google Cloud Storage (GCS) encrypt data at rest by default; and HCP Terraform (HashiCorp Cloud Platform Terraform) encrypts state at rest. Remote backends communicate over Transport Layer Security (TLS), protecting state in transit between the Terraform command-line interface (CLI) and the storage service.",
   "```hcl\nterraform {\n  backend \"s3\" {\n    bucket     = \"example-tf-state\"\n    key        = \"prod/network.tfstate\"\n    region     = \"us-east-1\"\n    encrypt    = true\n    kms_key_id = \"alias/terraform-state\"\n  }\n}\n```",
   "The second defense is access control. Treat read access to state as equivalent to read access to every secret inside it. Use the cloud's identity and access management (IAM) to limit who and what can read or write the bucket, container or database, typically the CI (continuous integration) pipeline's role plus a small group of administrators. Developers who only need to see a plan can often get it from the pipeline output instead of reading state directly. In HCP Terraform, workspace permissions control who can read state versions, and remote state sharing settings control which other workspaces may read a workspace's outputs, so you can share an output with one consuming workspace without opening the whole organization.",
   "The third defense is history and recovery. Enable object versioning on S3 or GCS buckets so an accidental overwrite or deletion can be rolled back to an earlier snapshot, and consider enabling access logging on the state storage so you can audit who read it and when. A good audit trail turns the auditor's question of who can read the password into a report you can produce in minutes. HCP Terraform keeps a version history of state automatically, and each state version is linked to the run that created it.",
   "The best defense is to reduce the secrets that reach state in the first place. Use ephemeral variables and ephemeral resources for values needed only during a run, write-only arguments where providers support them so a password is sent to the API but never saved, and short-lived dynamic credentials from a secrets manager such as HashiCorp Vault so that anything that does land in state expires quickly. Keep secrets out of `.tf` and `.tfvars` files in version control, add `*.tfstate` and `*.tfstate.*` to `.gitignore`, and be careful with commands that print state values, such as `terraform show`, `terraform show -json` and `terraform output -raw`, in shared CI logs that many people can read.",
   "Sharing outputs between configurations deserves care too. The `terraform_remote_state` data source gives the consumer access to the root module outputs of another configuration's state, but in practice the consumer needs read access to that entire state snapshot, secrets included, because the backend cannot hand out only part of a file. Where possible, publish only the needed values through a dedicated channel such as a cloud parameter store, or in HCP Terraform use the `tfe_outputs` data source from the `tfe` provider, which reads just a workspace's outputs rather than its full state.",
   "Putting it together, a well-protected setup looks like this: state in a remote backend with encryption at rest and TLS in transit, an access policy granting read and write to the deployment role and a handful of named administrators, versioning and access logging enabled, no state files in the repository, and as few long-lived secrets as possible written into state. When an exam question asks how to protect sensitive data in state, look for answers that combine encryption and access control on a remote backend, and be suspicious of any option that claims `sensitive = true` alone solves the problem."
  ],
  "analogy": "State is like the signed lease file a building manager keeps, which includes every tenant's spare key code. Marking a field sensitive is like folding the page so visitors at the front desk do not see it; the code is still in the file. Real protection is the locked cabinet (encryption), the short list of staff with the cabinet key (access control) and the copy kept off site (versioning). Where the analogy stops: unlike a paper file, Terraform can be told never to write some secrets down at all, through ephemeral values and write-only arguments.",
  "terms": [
   [
    "Secrets in state",
    "The fact that Terraform stores resource attributes, including passwords and keys, in state in plain text."
   ],
   [
    "sensitive",
    "A setting on variables and outputs that redacts values in CLI output but does not encrypt or remove them from state."
   ],
   [
    "Encryption at rest",
    "Protection of stored state by the backend's storage service, such as S3 server-side encryption with encrypt = true and an optional KMS key."
   ],
   [
    "Access control",
    "IAM or platform permissions that restrict who can read or write the state storage."
   ],
   [
    "terraform_remote_state",
    "A data source that reads root outputs from another configuration's state, requiring read access to that whole state."
   ],
   [
    "Ephemeral values and write-only arguments",
    "Features that let Terraform use a secret during a run without persisting it in state or plan files."
   ]
  ],
  "example": "A security review finds that every developer has read access to the S3 bucket holding production state, which contains the database password. The team restricts the bucket policy to the deployment role and two administrators, enables versioning, access logging and KMS encryption, adds state files to .gitignore, and moves the password to an ephemeral resource passed through a write-only argument so it no longer appears in new state snapshots.",
  "mistakes": [
   [
    "Marking a variable or output sensitive = true encrypts it in state.",
    "It only hides the value in CLI output. The value is still stored in plain text in state, so the state itself must be encrypted and access-controlled."
   ],
   [
    "Committing terraform.tfstate to Git so teammates can share it.",
    "This copies every secret into repository history, where it is hard to remove. Use a remote backend for sharing and add state files to .gitignore."
   ],
   [
    "Granting broad read access to the state bucket because reading cannot break anything.",
    "Reading state reveals every secret in it. Read access should be limited as tightly as write access."
   ],
   [
    "Using terraform_remote_state is safe because it only exposes outputs.",
    "The consumer needs read access to the whole state snapshot. Prefer a parameter store or tfe_outputs to share just the needed values."
   ]
  ],
  "tryit": [
   [
    "Your team's S3 state bucket has encryption enabled, but a new contractor needs to see what Terraform will change in production. The contractor asks for read access to the bucket. What do you recommend?",
    "Do not grant bucket access. Reading state would expose every secret in it. Instead, let the contractor review plans produced by the pipeline (or give a role scoped to plan output), keeping state readable only by the deployment role and a few administrators."
   ],
   [
    "A service in one configuration needs the VPC ID created by another configuration, and someone proposes terraform_remote_state. The network state also contains a generated VPN pre-shared key. What is a safer way to share just the VPC ID?",
    "Have the network configuration write the VPC ID to a parameter store (or, in HCP Terraform, read it with tfe_outputs). terraform_remote_state would require read access to the entire network state, including the pre-shared key."
   ]
  ],
  "tip": "sensitive = true is not encryption. Protect state with an encrypted, access-controlled, versioned remote backend, keep it out of version control, and keep secrets out of state where you can.",
  "check": [
   [
    "Name two ways to protect remote state stored in S3.",
    "Enable server-side encryption (encrypt = true, optionally with a KMS key) and restrict access with IAM or bucket policies; versioning adds recovery."
   ],
   [
    "Why is read access to state treated as sensitive?",
    "Because state stores resource attributes, including secrets, in plain text."
   ],
   [
    "Does marking an output sensitive keep its value out of the state file?",
    "No. It is redacted in CLI output but still stored in state."
   ]
  ]
 },
 {
  "t": "Resource drift: detecting it with `plan` and `apply -refresh-only`, reconciling configuration",
  "hook": "At 1:40 a.m., Leo on the night shift at Bluewater Clinics gets paged: the patient portal cannot reach its payment service. He opens the cloud console, finds a missing firewall rule on the security group and adds port 8443 by hand. The portal recovers and Leo goes back to sleep. Two days later, Priya merges an unrelated tagging change, and the pipeline's plan quietly proposes removing that rule. Nobody reads the plan closely, the apply runs, and the portal fails again at lunchtime. Terraform did exactly what the code said. So how should the team have spotted Leo's change, and how should they have made it stick?",
  "simple": "Terraform keeps a list of what it built and how each thing was set up. Drift is when the real thing gets changed behind Terraform's back, for example when someone clicks a setting in a website console. Terraform does not watch your infrastructure all day; it only notices when you ask it to look, which it does at the start of every plan. Once it notices, you have two choices: put things back the way the code says, or change the code to match the new reality. It is like a seating chart for a dinner party. If a guest swaps chairs, you either ask them to move back or update the chart. Simply noting the swap on a sticky note, without changing the chart, means someone will move them back later.",
  "body": [
   "Drift happens when real infrastructure no longer matches what Terraform last recorded in state. Someone edits a security group in the console during an incident, an autoscaling process changes a setting, another tool modifies tags, or a resource is deleted by hand. Terraform does not watch your infrastructure continuously; it has no background agent. So drift stays invisible until the next time Terraform checks, and the danger is not the change itself but the surprise when the next routine plan tries to undo it.",
   "That check is the refresh step. By default, `terraform plan` and `terraform apply` refresh first: they ask each provider for the current settings of every managed object and update Terraform's in-memory view of state. Then the plan compares your configuration to that refreshed view. If something changed, the plan prints a note that objects have changed outside of Terraform, lists what changed, and then shows the actions needed to bring reality back in line with your configuration. A resource that was deleted by hand shows up as needing to be created again. You can skip this step with `-refresh=false` to speed up a plan, but then drift will not be detected.",
   "Sometimes you want to see or accept drift without changing any infrastructure. `terraform plan -refresh-only` shows how the state would change to match reality, without proposing any infrastructure changes at all. `terraform apply -refresh-only` does the same and, after you approve, writes those updated values into the state file. It never creates, modifies or destroys real objects. This mode replaced the older `terraform refresh` command, which updated state immediately without showing you what would change or asking for approval. `terraform refresh` still exists for compatibility but is deprecated, because silently rewriting state could, for example, record a resource as gone after a temporary credential problem.",
   "```text\n$ terraform plan -refresh-only\nNote: Objects have changed outside of Terraform\n  # aws_security_group.web has changed\n  ~ ingress = [...]\n```",
   "Detecting drift is half the job; reconciling it is the other half, and there are exactly two honest choices. If the manual change was wrong, run a normal `terraform apply`, and Terraform changes the resource back to match your configuration. If the manual change was right, for example an emergency fix that should stay, update the configuration to match it, then run `terraform plan` to confirm that it reports no changes. Running `apply -refresh-only` on its own is not a third choice: it only updates the state so it agrees with reality. On the next normal plan, Terraform compares configuration with that updated state, sees that they disagree, and still proposes to revert the object.",
   "Reading the plan carefully matters here. The section listing changes made outside of Terraform is informational, while the section listing resource actions is what will actually happen. In the scenario of a manual firewall rule, the informational section shows the new ingress rule, and the action section shows Terraform planning to remove it. A reviewer who skims only the summary line, such as one to change and zero to add, can miss that the change is a reversal of someone's fix. A useful habit is to run `terraform plan -refresh-only` first whenever you suspect manual changes, so the drift is shown on its own without any proposed actions mixed in. Once the team agrees on which changes to keep, they update the code, and a normal plan then shows only the reversals they actually want.",
   "To reduce drift in the first place, limit console access for resources Terraform manages, route changes through code review, and give on-call engineers a fast path to an emergency pull request. Where an attribute is legitimately managed elsewhere, such as a desired count adjusted by an autoscaler or tags added by a cost tool, use `lifecycle { ignore_changes = [...] }` so Terraform stops proposing to reset it. Be careful not to overuse this, since ignored attributes are no longer controlled by your code at all.",
   "Finally, drift can be detected on a schedule rather than waiting for the next change. HCP Terraform (HashiCorp Cloud Platform Terraform) health assessments can run drift detection automatically and alert the team when a workspace's real infrastructure no longer matches its configuration. Teams without that feature often run a scheduled `terraform plan -detailed-exitcode` in their pipeline, which returns exit code 2 when changes are present, and raise an alert when it does."
  ],
  "analogy": "Drift is like a thermostat someone adjusted by hand while you were out. Refreshing is walking past and reading the current setting. A refresh-only apply is writing the new number in your notebook, but your house rules still say 21 degrees, so the next time you enforce the rules you will turn it back. To keep the new setting, you must change the house rules, which in Terraform means changing the configuration.",
  "terms": [
   [
    "Drift",
    "A difference between real infrastructure and the state Terraform last recorded, usually from changes made outside Terraform."
   ],
   [
    "Refresh",
    "The step where Terraform reads the current settings of managed objects from providers before planning."
   ],
   [
    "-refresh-only",
    "A plan or apply mode that only updates state to match real infrastructure, without changing any resources."
   ],
   [
    "terraform refresh",
    "The deprecated command that updated state immediately without showing changes or asking for approval."
   ],
   [
    "ignore_changes",
    "A lifecycle setting that tells Terraform to ignore changes to specific attributes when planning."
   ],
   [
    "Health assessments",
    "An HCP Terraform feature that can check workspaces for drift on a schedule and alert the team."
   ]
  ],
  "example": "During an incident, an engineer opens port 8443 on a security group in the console. The next terraform plan reports that the group changed outside of Terraform and proposes removing the rule. Because the change should stay, the team adds the rule to the configuration in a reviewed pull request, and the next plan shows no changes.",
  "mistakes": [
   [
    "Running terraform apply -refresh-only makes the manual change permanent.",
    "It only updates state. If the configuration still disagrees, the next normal plan will propose reverting the object. To keep the change, update the configuration."
   ],
   [
    "Terraform constantly monitors infrastructure and alerts on drift.",
    "Terraform only detects drift when it refreshes, during plan or apply, unless you schedule checks such as HCP Terraform health assessments or a periodic plan."
   ],
   [
    "terraform refresh is the recommended way to sync state.",
    "terraform refresh is deprecated because it rewrote state without review. Use terraform apply -refresh-only, which shows changes and asks for approval."
   ],
   [
    "Using ignore_changes on every drifting attribute is a good way to stop noisy plans.",
    "Ignored attributes are no longer managed by your code. Use ignore_changes only for attributes genuinely owned by another process."
   ]
  ],
  "tryit": [
   [
    "An autoscaler changes the desired_capacity of an Auto Scaling group several times a day, and every plan proposes setting it back to the value in code. The team wants Terraform to manage everything else about the group. What should they do?",
    "Add lifecycle { ignore_changes = [desired_capacity] } to the resource. The autoscaler legitimately owns that attribute, so Terraform should stop resetting it while still managing the rest of the group."
   ],
   [
    "A plan shows that a storage bucket was deleted outside Terraform and proposes creating it again. Nobody knows whether the deletion was intentional. What should you do before applying?",
    "Pause and investigate with the owners. Applying would create a new, empty bucket. If the deletion was intended, remove the resource from configuration; if not, recover data if possible and then apply to recreate it."
   ]
  ],
  "tip": "apply -refresh-only updates state only and never changes infrastructure; to keep a manual change permanently you must also update the configuration.",
  "check": [
   [
    "Which command updates state to match real infrastructure without changing any resources?",
    "terraform apply -refresh-only."
   ],
   [
    "What happens if you run a normal terraform apply after someone manually changed a managed resource?",
    "Terraform plans to change the resource back to match the configuration."
   ],
   [
    "Which older command does -refresh-only replace?",
    "terraform refresh, which is deprecated because it updated state without review."
   ]
  ]
 },
 {
  "t": "CLI workspaces: `terraform workspace new/select/list`, `terraform.workspace`",
  "hook": "Marco at Tidewater Logistics wants to try a new load balancer setting without disturbing the shared dev environment, so he creates a CLI workspace called `lb-test` and applies. It works nicely. An hour later he runs `terraform destroy` to clean up, types yes, and watches resources disappear. Then the dev channel lights up: the shared dev environment is gone. Marco scrolls back through his terminal and sees it. Somewhere between lunch and the destroy, he had switched back to `default`. Same code, same backend, same credentials, different state. What exactly is a CLI workspace, and why did nothing stop him?",
  "simple": "A Terraform project normally has one state, the record of what it built. A CLI workspace lets the same project keep several separate records side by side, so you can build a second copy of the same setup without the two getting mixed up. Every project starts in a workspace called default, and you can create more with a short command. It is like a notebook with tabs: the same notebook, the same handwriting, but each tab tracks a different shopping trip. The catch is that anyone holding the notebook can flip to any tab, and it is easy to write on the wrong one. That is why workspaces are great for quick experiments but are not a safe wall between test and production.",
  "body": [
   "A CLI (command-line interface) workspace lets one configuration and one backend hold several independent states. Every working directory starts in a workspace called `default`. When you create another workspace, Terraform starts a separate, empty state for it, so the same code can manage a second copy of the infrastructure without the two interfering. Nothing in the code changes; only the state that Terraform reads and writes is different.",
   "The commands are short and worth memorizing. `terraform workspace new NAME` creates a workspace and switches to it immediately. `terraform workspace select NAME` switches to an existing one, and newer versions also accept `-or-create` to create it if it does not exist yet, which is handy in pipelines. `terraform workspace list` shows all workspaces with an asterisk beside the current one, and `terraform workspace show` prints just the current name, which is useful in scripts and prompts. `terraform workspace delete NAME` removes a workspace. You cannot delete `default`, you cannot delete the workspace you are currently in, and Terraform refuses to delete a workspace whose state still tracks resources unless you add `-force`, because doing so would leave those real objects running with nothing tracking them.",
   "```text\n$ terraform workspace new dev\nCreated and switched to workspace \"dev\"\n$ terraform workspace list\n  default\n* dev\n$ terraform workspace show\ndev\n```",
   "Where the states live depends on the backend. With the local backend, the default workspace uses `terraform.tfstate` in the working directory, and every other workspace uses `terraform.tfstate.d/NAME/terraform.tfstate`. Remote backends that support workspaces store each state under a derived key or path; for example, the S3 backend places non-default workspaces under a prefix such as `env:/NAME/` in front of the configured key. Not every backend supports multiple workspaces, so check the backend's documentation before relying on them.",
   "Inside the configuration, the expression `terraform.workspace` returns the name of the current workspace. You can use it to vary names and sizes so two workspaces do not collide: `name = \"app-${terraform.workspace}\"` gives each copy its own resource names, and `instance_type = terraform.workspace == \"prod\" ? \"m5.large\" : \"t3.micro\"` changes size by workspace. Naming matters because many cloud resources, such as storage buckets or load balancers, require unique names; without the workspace in the name, the second workspace's apply would fail with a name conflict.",
   "A typical short-lived use looks like this. A developer wants to test a change in isolation, so they run `terraform workspace new feature-x`, apply, check the result, run `terraform destroy` while still in that workspace, then `terraform workspace select default` and `terraform workspace delete feature-x`. The order matters: destroy first while the workspace is selected, then switch, then delete. Many teams also show the current workspace in their shell prompt so it is always visible before a destructive command.",
   "Workspaces also appear in automation. A pipeline can run `terraform workspace select -or-create NAME` before planning, or set the `TF_WORKSPACE` environment variable so every Terraform command in that job uses the named workspace without an explicit select. Because the list of workspaces is stored in the backend, not on one laptop, everyone who uses the same remote backend sees the same set of workspaces. That is convenient for sharing a test copy with a colleague, but it also means a mistaken delete or destroy affects everyone, so the same care you take with the default workspace applies to every workspace in a shared backend.",
   "Understand the limits, because the exam tests them. CLI workspaces share the same code, the same backend and usually the same credentials, so they are not a strong boundary between environments. A person with access to dev state typically has access to prod state, every workspace must use the same provider configuration unless you add conditional logic, and it is easy to run a command in the wrong workspace. HashiCorp recommends CLI workspaces for short-lived copies, such as testing a change or a feature branch, and separate directories, separate backends or HCP Terraform (HashiCorp Cloud Platform Terraform) workspaces for long-lived environments that need different credentials, approvals and access controls.",
   "Finally, do not confuse CLI workspaces with HCP Terraform workspaces. An HCP Terraform workspace is a much richer object, with its own variables, permissions, run history, execution settings and state, and it behaves more like a separate working directory than a CLI workspace. When an exam question mentions per-workspace permissions or stored variables, it is describing HCP Terraform workspaces; when it mentions `terraform workspace new` or `terraform.tfstate.d`, it is describing CLI workspaces."
  ],
  "analogy": "CLI workspaces are like the save slots in a video game. The game itself (your configuration) is identical, but each slot keeps its own progress (state). You can experiment in slot two without losing slot one. Where the analogy stops: game slots usually ask before overwriting, while Terraform will happily destroy whatever the current slot tracks, and anyone who can open the game can open every slot, so slots are not a security boundary.",
  "terms": [
   [
    "CLI workspace",
    "A named, separate state for the same configuration and backend, managed with terraform workspace commands."
   ],
   [
    "default workspace",
    "The workspace every configuration starts in; it cannot be deleted."
   ],
   [
    "terraform.workspace",
    "An expression that returns the name of the current workspace for use in configuration."
   ],
   [
    "terraform.tfstate.d",
    "The directory where the local backend stores state for non-default workspaces."
   ],
   [
    "terraform workspace select -or-create",
    "A form of the select command that switches to a workspace, creating it first if it does not exist."
   ]
  ],
  "example": "A developer wants to test a load balancer change without touching the shared dev environment. They run terraform workspace new lb-test, apply, check the result, then run terraform destroy while still in lb-test, switch back with terraform workspace select default and delete the lb-test workspace.",
  "mistakes": [
   [
    "CLI workspaces are the recommended way to separate dev, staging and production.",
    "They share code, backend and usually credentials, so they are a weak boundary. Use separate directories, backends or HCP Terraform workspaces for long-lived environments."
   ],
   [
    "You can delete any workspace, including default, once you are done with it.",
    "The default workspace can never be deleted, and you cannot delete the workspace you are currently using."
   ],
   [
    "Creating a new workspace copies the existing resources into it.",
    "A new workspace starts with an empty state. Applying in it creates a separate copy of the infrastructure."
   ],
   [
    "CLI workspaces and HCP Terraform workspaces are the same thing.",
    "HCP Terraform workspaces have their own variables, permissions and run history and behave more like separate working directories."
   ]
  ],
  "tryit": [
   [
    "Two developers each create a CLI workspace from the same configuration and apply. The second apply fails because a storage bucket name is already taken. The bucket resource has bucket = \"acme-reports\". How should the configuration change?",
    "Include the workspace name in the bucket name, for example bucket = \"acme-reports-${terraform.workspace}\", so each workspace creates a uniquely named bucket."
   ],
   [
    "Your security team requires that production changes use a different cloud role than development and that only two people can apply to production. A colleague suggests a prod CLI workspace in the same directory. Does that meet the requirement?",
    "No. CLI workspaces share the same backend, configuration and usually credentials, so they cannot enforce different roles or approvers. Use a separate directory and backend, or a separate HCP Terraform workspace with its own permissions and variables."
   ]
  ],
  "tip": "CLI workspaces separate state only, not credentials or backends; they suit short-lived copies and are not recommended as the isolation boundary for production environments.",
  "check": [
   [
    "Where does the local backend store state for a workspace named staging?",
    "In terraform.tfstate.d/staging/terraform.tfstate."
   ],
   [
    "Which workspace can never be deleted?",
    "The default workspace."
   ],
   [
    "How do you make resource names include the workspace name?",
    "Interpolate terraform.workspace, for example name = \"app-${terraform.workspace}\"."
   ]
  ]
 },
 {
  "t": "Importing existing infrastructure with `import` blocks and generating configuration with `terraform plan -generate-config-out`",
  "hook": "Northfield Library District has run its website for six years on servers, buckets and DNS records that someone built by clicking through a cloud console. Now the board wants everything managed as code, and Aisha has been given the job. She opens an empty repository and stares at a list of sixty existing resources. Rebuilding them is out of the question; the website cannot go down, and the buckets hold years of scanned archives. Writing every resource block by hand, attribute by attribute, would take weeks and invite mistakes. Is there a way to tell Terraform to adopt what already exists, show the team exactly what it will do first, and even draft the code?",
  "simple": "Importing means telling Terraform: this thing already exists, please start looking after it, and do not build a new one. You do that by writing a small import block that says which real thing it is (its ID) and which name in your code should own it. Terraform shows the import in its normal preview before anything is recorded, so the team can review it. Terraform can also write a first draft of the matching code for you. It is like a new apartment manager taking over a building: instead of tearing down and rebuilding each apartment, they walk through, write down what is in each unit and add it to their records. The draft notes still need checking before they become the official records.",
  "body": [
   "Many organizations adopt Terraform after they already have infrastructure built by hand, by scripts or by other tools. Importing brings those existing objects under Terraform management by recording them in state and binding them to resource blocks in configuration, without recreating or interrupting anything. Since Terraform 1.5, the recommended way to do this is the declarative `import` block, which lives in your `.tf` files alongside everything else.",
   "An `import` block has two required arguments. `to` is the resource address that should own the object, such as `aws_s3_bucket.logs` or `module.web.aws_instance.app`. `id` is the provider-specific identifier of the real object, such as an instance ID, a bucket name or a full resource path. Import identifiers differ by resource type and by provider, so check the resource's documentation in the Terraform Registry, which usually has an import section near the bottom showing the expected format. Using the wrong format is the most common reason an import fails during plan.",
   "A few placement rules are easy to miss. Import blocks must be written in the root module, the configuration where you run Terraform, even though the `to` address may point to a resource inside a child module, such as `module.storage.aws_s3_bucket.this`. The `id` must be known when Terraform plans, so it is usually a literal string or a value built from variables and locals. If the plan reports that the object cannot be found, double-check the region, the account or subscription the provider is configured for and the ID format before assuming the resource is missing. These checks save a lot of time when importing dozens of objects at once.",
   "```hcl\nimport {\n  to = aws_s3_bucket.logs\n  id = \"example-company-logs\"\n}\n```",
   "The big advantage over the old `terraform import` command is that import blocks go through the normal plan and apply workflow. `terraform plan` shows exactly which objects will be imported, alongside any other changes, so reviewers can see them in a pull request. Nothing is written to state until you apply, and the apply records the import together with any other changes in one reviewed run. You can import many resources at once, and import blocks accept `for_each` so you can import a set of similar objects, such as a list of bucket names, with a single block. After a successful apply, the import blocks can be left in place, because they are idempotent and do nothing once the object is already in state, or removed to keep the code tidy.",
   "Writing the matching resource blocks by hand is often the hardest part, especially for resources with dozens of attributes. Terraform can draft them for you. If an import block targets an address that has no resource block yet, run `terraform plan -generate-config-out=generated.tf`. Terraform asks the provider for the object's current settings and writes HashiCorp Configuration Language (HCL) for the missing resources into that new file. The file must not already exist; Terraform will not overwrite or append to an existing file. The generated code is a starting point, not a finished product: review it, remove attributes you do not want to manage, replace hard-coded values with references and variables, and move it into your normal files and modules.",
   "The typical workflow has five steps. First, write the import blocks. Second, run `terraform plan -generate-config-out=FILE` to draft any missing resource blocks. Third, edit the generated configuration so it fits your standards. Fourth, run `terraform plan` again until it shows only imports and no unexpected creates, updates or destroys. Fifth, apply. If the plan shows an update in addition to the import, your configuration does not quite match the real object yet, and applying would change the real resource. Sometimes that is intended, such as adding a missing tag, but usually it means another round of editing.",
   "Two limits are worth remembering for the exam and for real projects. Import binds one real object to one resource address, so you must never import the same object into two addresses, whether in the same configuration or in two different ones; both would try to manage it and fight each other. And generated configuration is not guaranteed to be perfect, especially for attributes that conflict with each other or values the provider cannot read back, such as some secrets, so careful review is essential before the first apply.",
   "Finally, remember what import means in the long run. Once an object is imported, Terraform owns it like any resource it created. Changing the configuration changes the real object, and removing the resource block or running `terraform destroy` deletes it. Make sure the team agrees that Terraform should be the sole manager of each imported object, and retire any other process that used to change it."
  ],
  "analogy": "An import block is like registering a car you already own with a new insurance company. You give them the vehicle identification number (the id) and say which policy it belongs on (the to address), and they show you the paperwork for approval before it takes effect. Generated configuration is their pre-filled form based on the car's records, which you still check line by line. Where it stops: once registered, Terraform does not just insure the car, it can also change or scrap it.",
  "terms": [
   [
    "import block",
    "A declarative block with to and id that tells Terraform to bring an existing object under a resource address during plan and apply."
   ],
   [
    "Import ID",
    "The provider-specific identifier of an existing object, such as an instance ID or bucket name, documented on each resource's page."
   ],
   [
    "-generate-config-out",
    "A terraform plan flag that writes generated HCL for import targets that lack resource blocks into a new file that must not already exist."
   ],
   [
    "Adopting infrastructure",
    "Bringing manually created resources under Terraform management without recreating them."
   ],
   [
    "for_each in import blocks",
    "A way to import a set of similar objects, such as many buckets, from one import block."
   ]
  ],
  "example": "A company has forty S3 buckets created by hand. An engineer writes an import block with for_each over the bucket names, runs terraform plan -generate-config-out=buckets.tf, tidies the generated code into a module call, confirms the plan shows only imports and no updates, and applies. The buckets are now managed without downtime.",
  "mistakes": [
   [
    "Import blocks write to state as soon as you run terraform plan.",
    "Plan only previews the import. Nothing is recorded in state until terraform apply."
   ],
   [
    "You can point -generate-config-out at your existing main.tf to append the new code.",
    "The output file must not already exist. Terraform writes a new file, which you then review and move into your normal files."
   ],
   [
    "Generated configuration can be applied as-is.",
    "It is a draft. Review it, remove unwanted attributes, add references and variables, and plan until only imports appear."
   ],
   [
    "Importing the same object into two configurations lets both teams manage it.",
    "Each real object should be bound to exactly one resource address. Two managers would overwrite each other's changes."
   ]
  ],
  "tryit": [
   [
    "After writing an import block and generated configuration for an existing load balancer, the plan shows 1 to import and 1 to change: Terraform wants to set idle_timeout from 120 to 60. Nobody intended to change the timeout. What should you do before applying?",
    "Edit the configuration so idle_timeout = 120 (matching the real object) and plan again until the plan shows only the import. Applying now would change the live load balancer."
   ],
   [
    "Your team must adopt 25 existing virtual networks whose IDs are in a list, and the change must go through the normal pull request review. Should you script 25 terraform import commands or use import blocks?",
    "Use import blocks, ideally one block with for_each over the IDs. The imports then appear in the reviewed plan, are applied in one run and can use -generate-config-out to draft the resource blocks."
   ]
  ],
  "tip": "import blocks are reviewed in plan and applied like other changes; -generate-config-out writes starter HCL into a file that must not already exist, and a clean import plan shows imports only.",
  "check": [
   [
    "What are the two required arguments of an import block?",
    "to (the resource address) and id (the existing object's identifier)."
   ],
   [
    "Why is an import block preferred over the old import command?",
    "It works through plan and apply, so imports are previewed, reviewed, can be done in bulk, and can generate configuration."
   ],
   [
    "When does an import block actually record the object in state?",
    "When you run terraform apply; plan only previews it."
   ]
  ]
 },
 {
  "t": "The older `terraform import` CLI command",
  "hook": "Halcyon Dental's only Terraform engineer, Rosa, needs to bring one hand-built DNS zone under management before lunch. She finds an old runbook that says to run `terraform import aws_route53_zone.main` followed by the zone ID. She pastes the command, and Terraform stops with an error saying the resource address does not exist in the configuration. She tries again after adding a block, and this time it reports success instantly, with no plan and no approval prompt. Her next `terraform plan`, though, wants to change four settings on the live zone. What does this older command actually do, what does it expect from you first, and why do most teams now prefer something else?",
  "simple": "Before the newer import blocks existed, the only way to make Terraform adopt something that was already built was a single command: terraform import, followed by a name from your code and the real thing's ID. It writes the thing into Terraform's records straight away, with no preview. It also does not write any code for you, so you must create a matching block first and then adjust it until Terraform agrees it matches reality. It is like adding an existing bank account to a budgeting app by typing in the account number: the app links it immediately, but you still have to fill in the category and limits yourself, and until you do, the app may try to change things you did not expect.",
  "body": [
   "Before import blocks arrived in Terraform 1.5, the only way to bring existing infrastructure under Terraform management was the `terraform import` command. It is still available, it is still used in older runbooks and tooling, and it still appears on the exam, so you need to know exactly how it works, what it requires and why the newer approach is usually preferred.",
   "The syntax is `terraform import ADDRESS ID`. `ADDRESS` is the resource address in your configuration, such as `aws_instance.web`, `aws_instance.web[0]` for a resource using `count`, `aws_instance.web[\"blue\"]` for one using `for_each`, or `module.app.aws_instance.web` for a resource inside a module. `ID` is the provider's identifier for the real object, in the format documented on that resource's page. The command asks the provider to read the object and writes it into state under that address immediately.",
   "```text\n$ terraform import aws_instance.web i-0abc123def4567890\naws_instance.web: Importing from ID \"i-0abc123def4567890\"...\naws_instance.web: Import prepared\naws_instance.web: Refreshing state... [id=i-0abc123def4567890]\nImport successful\n```",
   "There is an important prerequisite: the resource block must already exist in your configuration before you run the command. `terraform import` does not write configuration for you. If `aws_instance.web` is not declared, the command fails with an error explaining that the address is not in the configuration. So the older workflow had three stages. First, write an empty or approximate resource block, often just the required arguments. Second, run `terraform import`. Third, run `terraform plan` and keep adjusting the block until the plan shows no changes. Only then is the configuration a faithful description of the real object, and only then is it safe to apply anything else. This loop can take several rounds for complex resources, because some attributes are optional in the provider schema yet still have values on the real object, and each one you leave out may show up as a proposed change. Resources that are made of several related objects, such as a bucket with separate versioning or policy resources, may also need several imports, one for each related resource address.",
   "That third stage is where many people get caught. Right after the import succeeds, the state accurately describes the real object, but the configuration may still be a rough sketch. If you apply at that point, Terraform will change the real object to match the sketch, which can mean removing tags, resetting settings or even forcing replacement. Running `terraform show` or `terraform state show ADDRESS` after the import helps here, because it displays every attribute Terraform recorded, which you can copy into the resource block and then tidy up.",
   "Compared with import blocks, the command has clear limitations. It imports one resource per invocation, so bringing in dozens of objects means dozens of commands or a script. It changes state immediately, with no plan to review first and no record in version control of what was imported or why. It cannot generate configuration. And it happens outside the normal pull request workflow, which makes it harder to audit in team settings, especially with HCP Terraform (HashiCorp Cloud Platform Terraform), where you would otherwise want every state change to come from a reviewed run with a visible history.",
   "The command also accepts familiar flags such as `-var` and `-var-file`, because Terraform must evaluate the configuration, including provider settings like region and credentials, to know how to reach the object. If the provider configuration depends on a variable, you must supply that variable during the import. With a remote backend, the imported object is written to the remote state, and the usual state locking applies, so an import cannot collide with a run that someone else is performing at the same moment.",
   "When should you still use the command? It is fine for a quick one-off import on a small personal project, in an emergency where you need one object in state right now, or with tooling that has not moved to import blocks. For anything larger, shared or production-facing, prefer import blocks, which give you the review, bulk import and generated configuration that the command lacks.",
   "Either way, import is not the same as creating. Terraform takes over management of an existing object, and from then on it treats that object like anything it built. A later change to the block changes the real object, and a later `terraform destroy` will delete it. Before importing, be sure the team intends Terraform to own the object and that no other tool or person will keep changing it behind Terraform's back."
  ],
  "analogy": "The terraform import command is like a librarian stamping an old donated book into the catalog on the spot: it is in the system immediately, with no committee review. But the catalog card (your resource block) has to be written by hand beforehand, and until it describes the book correctly, the next inventory check will try to relabel the book to match the card. Import blocks are the same donation going through the acquisitions meeting first.",
  "terms": [
   [
    "terraform import",
    "A CLI command that immediately writes an existing object into state at a given resource address."
   ],
   [
    "ADDRESS",
    "The resource address in configuration that the imported object will be bound to, such as aws_instance.web or module.app.aws_instance.web[0]."
   ],
   [
    "ID",
    "The provider-specific identifier of the real object, in the format documented for that resource type."
   ],
   [
    "Prerequisite resource block",
    "The resource block that must already exist in configuration before terraform import can succeed."
   ],
   [
    "Post-import plan",
    "Running terraform plan after import and adjusting configuration until no changes are shown."
   ]
  ],
  "example": "An engineer needs to manage one hand-built DNS zone. They write resource \"aws_route53_zone\" \"main\" {} with the zone name, run terraform import aws_route53_zone.main followed by the zone ID, use terraform state show aws_route53_zone.main to see the recorded attributes, and then adjust the block until terraform plan reports no changes.",
  "mistakes": [
   [
    "terraform import will create the resource block for you if it is missing.",
    "The command never writes configuration. The resource block must exist first, or the import fails."
   ],
   [
    "terraform import shows a plan and asks for approval like apply does.",
    "It writes to state immediately with no plan. Only import blocks are previewed in plan and applied after approval."
   ],
   [
    "Once the import says successful, the job is done.",
    "The configuration may not match the real object yet. Run terraform plan and adjust the block until no changes are shown, or the next apply may modify the resource."
   ],
   [
    "terraform import can bring in many resources with one command.",
    "It imports one object per invocation. For bulk imports, use import blocks, optionally with for_each."
   ]
  ],
  "tryit": [
   [
    "A teammate runs terraform import aws_s3_bucket.assets my-assets-bucket and it succeeds. They then immediately run terraform apply on a configuration where the bucket block contains only bucket = \"my-assets-bucket\". The real bucket has versioning and several tags. What risk do you point out?",
    "The configuration does not describe versioning or the tags, so the plan may propose removing or changing them on the live bucket. They should run terraform plan first and update the block (and any related resources) until no changes are shown."
   ],
   [
    "You are on a small personal project and need one existing virtual machine in state today. No one else works on the code. Is the terraform import command acceptable?",
    "Yes. For a quick one-off import on a small project, the command is fine. Write the resource block, run terraform import with the address and ID, then plan and adjust until there are no changes."
   ]
  ],
  "tip": "terraform import needs the resource block to exist first, imports one object at a time, writes to state immediately and does not generate configuration; import blocks remove those limits.",
  "check": [
   [
    "What must exist before you run terraform import aws_instance.web i-123?",
    "A resource block for aws_instance.web in the configuration."
   ],
   [
    "Does terraform import show a plan before changing state?",
    "No. It writes to state immediately; only import blocks go through plan and apply."
   ],
   [
    "Why might terraform import need -var or -var-file?",
    "Terraform evaluates the configuration, including provider settings, to reach the object, so required variables must be supplied."
   ]
  ]
 },
 {
  "t": "Inspecting state: `terraform state list`, `terraform state show`, `terraform show`, `terraform output`",
  "hook": "It is 3:15 a.m. at Copperline Energy, and Jae on call needs the private IP address of the database proxy so the monitoring agent can be pointed at it. The person who built it is asleep, and the wiki page is two years out of date. A colleague's advice in the chat is to download the state file and search through the JSON. You know that file holds passwords, and you know that one careless save could corrupt it. Terraform already knows the answer, and it has commands made for exactly this question, all read-only. Which one gives you a single resource's IP address, which lists everything, and which prints an output for a script?",
  "simple": "Terraform keeps a record of everything it manages, called state. Instead of opening that record directly, which is risky, Terraform gives you safe commands to look inside it. One command lists the names of everything Terraform manages. Another shows all the details of one item. Another prints the whole record, or a saved plan, in readable form. And another prints the output values, the useful results your project chose to share, like a website address. Think of a warehouse: you do not wander into the stacks yourself. You ask the clerk for the inventory list, the details of one box, a full report, or just the summary sheet posted at the front desk. None of these questions moves any boxes.",
  "body": [
   "You should never open the state file in a text editor to find out what Terraform manages. Doing so risks corrupting the file and exposing secrets, and with a remote backend the file is not on your disk anyway. Terraform provides read-only commands that work with any backend, local or remote, and present state in a safe, readable way. Knowing which command answers which question is a classic exam topic, because the four commands look similar but serve different purposes.",
   "`terraform state list` prints the address of every resource and data source in state, one per line, including those inside modules, such as `module.network.aws_subnet.private[0]`. You can filter it by passing an address prefix, such as `terraform state list module.network` to see only that module, or by a real-world object ID with `-id=`, which is handy when you have an ID from a console and want to know which address manages it. It is the quickest way to answer what Terraform manages here and to find exact addresses to use in other commands, such as `state show`, `moved` blocks or `-target`.",
   "`terraform state show ADDRESS` prints every attribute of a single resource instance as Terraform recorded it, in a readable format similar to HashiCorp Configuration Language (HCL). Use it to find an instance's Internet Protocol (IP) address, an Amazon Resource Name (ARN), a generated ID or the current value of any setting. For resources with `count` or `for_each`, include the index or key in the address, and quote it in your shell when it contains brackets or quotation marks. Sensitive attributes are redacted in this output.",
   "```text\n$ terraform state list\naws_instance.web\naws_security_group.web\nmodule.network.aws_vpc.this\n\n$ terraform state show aws_instance.web\n# aws_instance.web:\nresource \"aws_instance\" \"web\" {\n    ami           = \"ami-0abc...\"\n    instance_type = \"t3.micro\"\n    private_ip    = \"10.0.1.25\"\n    ...\n}\n```",
   "`terraform show` with no arguments prints the entire current state in human-readable form: every resource with its attributes, followed by the root module outputs. Given a saved plan file, as in `terraform show tfplan`, it prints that plan instead, which is how reviewers inspect a plan created earlier with `terraform plan -out=tfplan`. Adding `-json` produces machine-readable JavaScript Object Notation (JSON) output for tools, scripts and policy checks. Note that the JSON form includes sensitive values in plain text, so be careful where you send it, especially in shared continuous integration (CI) logs.",
   "`terraform output` prints the root module's output values from state. With no arguments it lists them all; with a name, as in `terraform output db_endpoint`, it prints just that one. Sensitive outputs are shown as `<sensitive>` in the list view, but asking for one by name, or using `-json` or `-raw`, reveals the value. The `-raw` flag prints a plain string without quotes, which is handy in shell scripts: `ssh admin@$(terraform output -raw public_ip)`. Only root module outputs appear here; outputs of child modules are visible only if the root module passes them through its own output blocks.",
   "Choosing the right command becomes simple once you match it to the question. If you need addresses, use `state list`. If you need everything about one resource, use `state show`. If you need the whole picture, or want to read a saved plan, use `show`. If you need a value the configuration deliberately publishes, such as an endpoint or an ID for another system, use `output`. A common pattern combines them: `terraform state list | grep proxy` to find the address, then `terraform state show` on that address to read one attribute.",
   "Remote backends and HCP Terraform (HashiCorp Cloud Platform Terraform) work the same way from your point of view. The commands fetch the latest state snapshot from the backend, read it and print the result, so you need read permission on the state but never need to download or handle the file yourself. In HCP Terraform you can also browse state versions and outputs in the workspace's web interface, which is useful for people who do not have the CLI (command-line interface) set up. If a command reports that no state exists, check that you ran `terraform init` in the right directory and selected the right workspace before assuming the infrastructure is missing.",
   "None of these commands change state or infrastructure, so they are safe to run at any time, even during an incident. For changing state there is a separate group of commands, `terraform state mv`, `terraform state rm`, `terraform state push` and `terraform state replace-provider`, with `terraform state pull` to download a copy of the raw state. Those should be used carefully, ideally after taking a backup, and where possible replaced with configuration-driven blocks such as `moved` and `removed`, which are reviewed in plan like any other change."
  ],
  "analogy": "Think of state as a library's catalog. state list is the shelf list of every call number. state show is pulling one catalog card to read every detail of a single book. show is printing the whole catalog, or a proposed acquisitions list (a saved plan). output is the short notice board at the entrance with the few facts the library chose to post. Where it stops: unlike a notice board, a sensitive output is revealed if you ask for it by name.",
  "terms": [
   [
    "terraform state list",
    "Lists the addresses of all resources in state, optionally filtered by an address prefix or by -id."
   ],
   [
    "terraform state show",
    "Shows all recorded attributes of one resource instance in state, with sensitive values redacted."
   ],
   [
    "terraform show",
    "Shows the whole state, or a saved plan file, in human-readable or JSON form."
   ],
   [
    "terraform output",
    "Prints root module output values from state, with -json and -raw options for scripting."
   ],
   [
    "-raw",
    "A terraform output flag that prints a single string value without quotes or formatting."
   ]
  ],
  "example": "An on-call engineer needs the private IP of a database proxy. They run terraform state list | grep proxy to find the address module.db.aws_instance.proxy, then terraform state show module.db.aws_instance.proxy to read its private_ip attribute, all without touching the state file.",
  "mistakes": [
   [
    "terraform output shows the outputs of every module in the configuration.",
    "It shows root module outputs only. Child module outputs appear only if the root module re-exports them."
   ],
   [
    "terraform state show prints the whole state.",
    "state show prints one resource instance. terraform show (no arguments) prints the whole state."
   ],
   [
    "Sensitive outputs can never be printed by terraform output.",
    "They are hidden in the list view, but requesting one by name, or with -json or -raw, reveals the value."
   ],
   [
    "It is fine to open terraform.tfstate in an editor to look up a value.",
    "Use the read-only commands instead. Editing or saving the file risks corruption, and remote state is not on disk anyway."
   ]
  ],
  "tryit": [
   [
    "A deployment script needs the load balancer's DNS name, which the root module exposes as an output called lb_dns. The script currently gets the value with quotation marks around it, which breaks the next command. What should the script use?",
    "terraform output -raw lb_dns, which prints the plain string without quotes."
   ],
   [
    "A reviewer receives a saved plan file named release.tfplan from the pipeline and wants to read it before approval. Which command should they run, and what option helps if they want to feed it to a policy tool?",
    "terraform show release.tfplan for a human-readable view; add -json for machine-readable output, remembering that the JSON contains sensitive values in plain text."
   ]
  ],
  "tip": "state list gives addresses, state show gives one resource's attributes, show gives everything (or a plan file), and output gives root outputs only.",
  "check": [
   [
    "Which command shows the attributes of just one resource in state?",
    "terraform state show ADDRESS."
   ],
   [
    "How do you print an output value without quotes for use in a shell script?",
    "terraform output -raw NAME."
   ],
   [
    "What does terraform show tfplan do?",
    "Displays the contents of the saved plan file tfplan in human-readable form."
   ]
  ]
 },
 {
  "t": "Refactoring: `moved` blocks and `terraform state mv`",
  "hook": "Owen at Silverpine Credit Union has spent the afternoon tidying the payments configuration. He renamed `aws_db_instance.main` to `aws_db_instance.primary`, because the old name confused everyone, and moved the logging buckets into a new module. The code reads beautifully. Then the pull request's plan comes back: 1 to add, 0 to change, 1 to destroy for the database, and the same pattern for every bucket. The reviewer, Fatima, leaves a single comment in red: this would delete the production database. Owen did not change a single setting on any real resource. So why does Terraform think it must destroy and recreate them, and how do you tell it they simply moved?",
  "simple": "Terraform remembers each thing it built by its name in your code, called its address. If you rename that address, Terraform does not realize it is the same thing under a new name. It thinks the old thing should go away and a brand new one should be built. Refactoring tools fix that by telling Terraform: this item just moved from the old name to the new name. It is like moving house and filing a change-of-address form with the post office. Without the form, mail for your old address is returned and treated as if you no longer exist. With the form, the same person keeps getting their mail at the new place. Terraform's modern form is called a moved block, written in your code.",
  "body": [
   "As configurations grow, you rename resources, move them into modules, rename module calls and switch from a single resource to `count` or `for_each`. Each of these changes the resource's address. Terraform tracks real objects in state by address, so if you simply rename `aws_instance.web` to `aws_instance.frontend`, the plan shows the old address being destroyed and a new one being created. For a stateless test server that may be harmless, but for a database, a storage bucket full of data or a production load balancer, that is exactly what you do not want. Refactoring tools tell Terraform that the object has only changed address, not identity.",
   "The modern approach, added in Terraform 1.1, is the `moved` block. You write it in configuration with two arguments: `from`, the old address, and `to`, the new address. During the next plan, Terraform sees that state has an object at the old address and none at the new one, updates the state entry to the new address, and reports the move in the plan output, for example saying the old address has moved to the new one, rather than proposing a destroy and a create. The actual object is untouched.",
   "```hcl\nmoved {\n  from = aws_instance.web\n  to   = aws_instance.frontend\n}\n\nmoved {\n  from = aws_s3_bucket.logs\n  to   = module.logging.aws_s3_bucket.this\n}\n```",
   "`moved` blocks handle most everyday refactors. They work for renaming a resource, for moving resources into or out of modules, for renaming a module call (`from = module.a`, `to = module.b`, which moves every resource inside it), and for adding `count` or `for_each` to an existing resource, such as `from = aws_instance.web` and `to = aws_instance.web[0]`, or `to = aws_instance.web[\"blue\"]` when using `for_each` keys. Without that last kind of `moved` block, adding `count` to an existing resource would plan to destroy the unindexed instance and create an indexed one.",
   "Because the move lives in code, it brings the benefits of everything else in code. It is reviewed in a pull request, shown in the plan so reviewers can confirm there are moves and no destroys, and applied automatically in every environment and workspace that uses the configuration, the next time each one runs. Module authors can ship `moved` blocks inside a new module version so that callers upgrade without losing resources, which is one of the most valuable uses. You can keep old `moved` blocks as a history of changes; removing them too early may break users or environments whose state still has the old address and has not yet run a plan with the new code.",
   "The older approach is the `terraform state mv SOURCE DESTINATION` command. It edits state immediately: `terraform state mv aws_instance.web aws_instance.frontend`. It also works for whole modules (`terraform state mv module.a module.b`), for indexed instances, and can move items into a separate state file with the `-state-out` option, which is occasionally useful when splitting a configuration in two. The command changes state directly without a plan or approval, so it must be run separately in every environment and workspace, and nothing is recorded in version control. Always update the configuration to match the new address immediately, consider running with `-dry-run` first to see what would move, and with a local backend note the backup file it writes in case you need to undo.",
   "Comparing the two side by side helps. A `moved` block is declarative, reviewable, repeatable across environments and safe for module consumers. `terraform state mv` is imperative, immediate and invisible to version control, but it does not require a plan run and can reach across state files. The exam expects you to prefer `moved` blocks for refactoring in shared or multi-environment setups, and to recognize `terraform state mv` as the imperative alternative, for example in a one-off fix on a single state.",
   "Neither tool changes the real infrastructure; they only change which address Terraform associates with an existing object. That has a consequence. If a refactor also needs an actual change to the object, such as moving to a different resource type, `state mv` cannot help, because it only renames entries of the same type. A `moved` block can cross types only when the provider explicitly supports that migration, as Terraform does for moving from `null_resource` to the built-in `terraform_data`. Otherwise, the path is to import the object into the new resource type and remove the old one from state, using the import and removal tools covered in related lessons.",
   "A practical refactoring routine ties this together. Make the code change, add one `moved` block per changed address, run `terraform plan`, and confirm the summary shows only moves (and any intended updates) with zero destroys. If any destroy remains, find the address you missed before merging."
  ],
  "analogy": "A moved block is a change-of-address form filed with the post office. The person (the real object) is the same; only the address the mail system uses changes, and every branch office (each environment) applies the form automatically when it next processes mail. terraform state mv is calling one branch office and asking a clerk to update their records by hand: it works there, right now, but the other branches never hear about it.",
  "terms": [
   [
    "moved block",
    "A configuration block with from and to that records a change of address so Terraform updates state instead of replacing the object."
   ],
   [
    "terraform state mv",
    "A CLI command that immediately changes the address of an object in state, with -dry-run to preview."
   ],
   [
    "Refactoring",
    "Restructuring configuration (renaming, moving into modules, adding count or for_each) without changing the real infrastructure."
   ],
   [
    "Resource address",
    "The identifier Terraform uses to track an object, such as module.app.aws_instance.web[0]."
   ],
   [
    "Destroy-and-create plan",
    "What Terraform proposes when an address changes and no moved block or state mv tells it the object only moved."
   ]
  ],
  "example": "A team moves ten resources from the root module into a new module named network. They add ten moved blocks mapping each old address to module.network.<address>. The plan shows ten moves and zero destroys, and the same pull request safely updates dev, staging and prod as each environment's pipeline runs.",
  "mistakes": [
   [
    "Renaming a resource in code is harmless because the settings did not change.",
    "Terraform tracks objects by address. Without a moved block or state mv, a rename plans a destroy of the old address and a create of the new one."
   ],
   [
    "A moved block or state mv changes the real resource.",
    "Both only change the address in state. The real object is untouched."
   ],
   [
    "terraform state mv is better for teams because it acts immediately.",
    "It must be repeated in every environment and leaves no record in version control. moved blocks are reviewed in plan and applied everywhere the code runs."
   ],
   [
    "Old moved blocks should be deleted right after the next apply.",
    "Keep them until every environment and module consumer has applied the change; removing them early can bring back destroy-and-create plans."
   ]
  ],
  "tryit": [
   [
    "You add count = 2 to an existing resource aws_instance.web so you can run two servers. The plan shows the existing server being destroyed and two new ones created. How do you keep the existing server?",
    "Add a moved block with from = aws_instance.web and to = aws_instance.web[0]. Terraform then treats the existing server as index 0 and only creates index 1."
   ],
   [
    "You maintain a shared module used by twelve teams, and version 3 renames an internal resource. You want callers to upgrade without losing data. What do you include in the release?",
    "A moved block inside the module mapping the old internal address to the new one. Each caller's next plan then shows a move instead of a destroy, with no manual commands."
   ]
  ],
  "tip": "Renaming a resource without moved or state mv makes Terraform plan a destroy and create; moved is the reviewable, declarative choice and works in every environment automatically.",
  "check": [
   [
    "You rename resource aws_db_instance.main to aws_db_instance.primary. How do you avoid replacing the database?",
    "Add a moved block with from = aws_db_instance.main and to = aws_db_instance.primary (or run terraform state mv)."
   ],
   [
    "Name one advantage of moved blocks over terraform state mv.",
    "They are in version control, visible in plan and applied automatically in every environment that uses the code."
   ],
   [
    "Does a moved block change the real infrastructure?",
    "No. It only changes the address Terraform associates with the existing object."
   ]
  ]
 },
 {
  "t": "Removing resources from state without destroying them: `removed` blocks and `terraform state rm`",
  "hook": "The analytics team at Marigold Health has asked to take over the reporting bucket that your platform team created two years ago. It holds every quarterly report the organization has ever produced. Your teammate Ben suggests the obvious step: delete the bucket's resource block from your configuration and let the analytics team import it into theirs. You open a draft pull request to try it, and the plan comes back with a single red line: 1 to destroy. The bucket is still in your state, it is no longer in your code, and Terraform has drawn the logical conclusion. How do you make Terraform let go of something without destroying it?",
  "simple": "Terraform keeps a list of the things it looks after. If you remove something from your code, Terraform assumes you want it gone and plans to delete the real thing. Sometimes you only want Terraform to stop looking after it, so someone else can take over. Terraform has two ways to do that: a removed block, written in your code and reviewed like any change, or an older command, terraform state rm, that crosses the item off the list right away. It is like handing a rented car to a colleague. You do not want the rental company to crush it; you just want it taken off your contract, and your colleague then adds it to theirs. The car keeps running the whole time.",
  "body": [
   "Sometimes you want Terraform to stop managing an object without deleting it. Another team may be taking over a database, the resource may be moving to a different Terraform configuration, it may have been imported by mistake, or you may be retiring Terraform for a component that will now be managed by another tool. If you simply delete the resource block, Terraform will plan to destroy the real object, because state still contains it and configuration no longer does. That difference between state and configuration is exactly how Terraform decides something should be destroyed. You need a way to make Terraform forget the object instead.",
   "The declarative way, added in Terraform 1.7, is the `removed` block. It has a `from` argument naming the resource or module address, and a `lifecycle` block whose `destroy` argument decides what happens to the real object. With `destroy = false`, Terraform removes the object from state and leaves the real infrastructure untouched. You delete the original resource block in the same change; the `removed` block replaces it rather than sitting beside it.",
   "```hcl\nremoved {\n  from = aws_instance.legacy\n\n  lifecycle {\n    destroy = false\n  }\n}\n```",
   "Because it goes through plan and apply, the removal is previewed, reviewed and applied consistently. The plan states that the object will no longer be managed by Terraform but will not be destroyed, and the summary counts it separately from destroys, so reviewers can confirm nothing will be deleted. The same pull request then removes the object from state in every environment and workspace that uses the configuration as each one runs. A `removed` block can target a whole module, such as `from = module.old_app`, which forgets every resource inside it at once. Setting `destroy = true` instead is the same as deleting the resource block normally: Terraform destroys the object, which can be useful when you want the removal to be explicit and documented in code. Removed blocks can also carry destroy-time provisioners if you need a cleanup action when the object is destroyed.",
   "The older, imperative way is `terraform state rm ADDRESS`. It deletes the entry from state immediately, with no plan and no approval prompt. For example, `terraform state rm aws_instance.legacy` forgets one resource, `terraform state rm 'aws_instance.web[1]'` forgets a single indexed instance, and `terraform state rm module.old_app` forgets a whole module. The real object keeps running, and Terraform simply no longer knows about it. You must also remove the resource block from configuration; otherwise the next plan sees an address in code with nothing in state and will try to create a brand new object for it. Like other state commands, `state rm` supports `-dry-run` to show what would be removed, and with a local backend it writes a backup file before changing state. Because it acts immediately, it must be repeated in every environment and leaves no trace in version control.",
   "A common scenario combines removal with import to move ownership between configurations. To move a resource from configuration A to configuration B, first remove it from A's state using a `removed` block with `destroy = false` or `terraform state rm`, and delete its resource block from A. Then add an `import` block and a matching resource block in B, run a plan to confirm it shows only the import, and apply. Doing it in this order, and never letting both configurations manage the object at the same time, avoids two configurations fighting over one resource.",
   "Keep the consequences in mind. Forgetting an object does not delete it, so it keeps running and keeps costing money. Once Terraform has forgotten it, Terraform will not update it, will not show drift for it and will not destroy it when you run `terraform destroy`. Make sure somebody or something else owns it afterwards, and record the handover so it does not become an orphaned resource that no one remembers.",
   "For the exam, connect each action to its result. Deleting a resource block alone leads to destroy. A `removed` block with `destroy = false`, or `terraform state rm` plus deleting the block, leads to forget without destroy. A `removed` block with `destroy = true` leads to destroy, documented in code. And the declarative `removed` block is preferred for shared, multi-environment code for the same reasons `moved` and `import` blocks are preferred over their command-line equivalents: preview, review and consistency."
  ],
  "analogy": "A removed block with destroy = false is like a landlord transferring a lease to a new tenant through the leasing office: the paperwork is reviewed, signed and filed, and the apartment is never emptied. terraform state rm is the landlord crossing the unit off a personal spreadsheet on the spot. Deleting the resource block alone is like telling the office the unit is no longer needed, so they schedule the demolition crew. The analogy holds well, with one twist: Terraform's office will rebuild the unit if you leave its address in the plans.",
  "terms": [
   [
    "removed block",
    "A configuration block that tells Terraform to stop managing an address, destroying it or not according to lifecycle destroy."
   ],
   [
    "destroy = false",
    "The removed block lifecycle setting that removes the object from state while leaving the real infrastructure in place."
   ],
   [
    "terraform state rm",
    "A CLI command that immediately deletes a resource entry from state without affecting the real object, with -dry-run to preview."
   ],
   [
    "Unmanaged resource",
    "A real object that exists but is not tracked in any Terraform state."
   ],
   [
    "Ownership transfer",
    "Moving management of an object from one configuration to another by removing it from one state and importing it into another."
   ]
  ],
  "example": "The data team is taking over an analytics bucket that the platform team created. The platform team deletes the bucket's resource block, adds a removed block with destroy = false, confirms the plan says the bucket will no longer be managed but not destroyed, and applies. The data team then adds an import block for the same bucket in their own configuration.",
  "mistakes": [
   [
    "Deleting the resource block is the way to make Terraform stop managing something.",
    "That plans a destroy of the real object. Use a removed block with destroy = false, or terraform state rm, to forget without destroying."
   ],
   [
    "After terraform state rm, you can leave the resource block in the code.",
    "The next plan would try to create a new object at that address. Remove the block as well."
   ],
   [
    "A removed block keeps the resource block in place next to it.",
    "The removed block replaces the resource block. Delete the original block in the same change."
   ],
   [
    "Once removed from state, terraform destroy will still clean the object up later.",
    "Terraform no longer knows about it, so destroy ignores it. Someone else must own and eventually delete it."
   ]
  ],
  "tryit": [
   [
    "A team accidentally imported a production database into their sandbox configuration. They want the sandbox to stop managing it immediately, and the database must not be touched. The sandbox code is used in three workspaces. Which approach do you recommend?",
    "Delete the database resource block and add a removed block with from set to its address and lifecycle { destroy = false }. The plan will confirm it is forgotten, not destroyed, and the change applies consistently in all three workspaces."
   ],
   [
    "During an incident, an engineer needs one stuck resource out of a single local state right now so a plan can run, and there is no time for a pull request. Which tool fits, and what must they do afterwards?",
    "terraform state rm ADDRESS (optionally with -dry-run first). Afterwards they must remove or adjust the matching resource block in the code and record the change, or the next plan will try to create a new object."
   ]
  ],
  "tip": "Deleting a resource block alone means destroy. To stop managing without deleting, use a removed block with destroy = false or terraform state rm, and remove the resource block.",
  "check": [
   [
    "What happens if you delete a resource block and run terraform apply?",
    "Terraform destroys the real object, because it is still in state but no longer in configuration."
   ],
   [
    "Which lifecycle setting in a removed block keeps the real object?",
    "destroy = false."
   ],
   [
    "After terraform state rm, why must you also delete the resource block?",
    "Otherwise the next plan sees the address in configuration with nothing in state and plans to create a new object."
   ]
  ]
 },
 {
  "t": "Verbose logging with `TF_LOG` (TRACE, DEBUG, INFO, WARN, ERROR, JSON), `TF_LOG_PATH`, `TF_LOG_CORE` and `TF_LOG_PROVIDER`",
  "hook": "The pipeline at Granite Peak Schools has failed three nights in a row with the same unhelpful message: an access denied error from the cloud provider, with no hint of which call or which role. Nadia has checked the obvious permissions twice. Her lead suggests turning on debug logging, so she adds `TF_LOG=TRACE` to the job and reruns it. The log that comes back is tens of thousands of lines long, most of it about graph walking and configuration loading, and the one line she needs is buried somewhere in the middle. Worse, she spots what looks like an access token in the output. How can she get exactly the detail she needs, in a file, without drowning in noise or leaking secrets?",
  "simple": "Normally Terraform only tells you the headline: what it plans to do and whether something failed. Logging lets you see the behind-the-scenes conversation, like every request Terraform sends to a cloud service and every reply. You switch it on by setting a setting in your computer's environment, not by adding an option to the command. You pick how chatty it should be, from TRACE (everything) down to ERROR (only problems), choose whether to save it to a file, and can even choose to log only Terraform itself or only the plugins that talk to clouds. It is like turning on subtitles plus director's commentary for a movie: very useful for understanding a confusing scene, but you would not leave it on all the time.",
  "body": [
   "Terraform's normal output tells you what it plans and what went wrong at a high level. When you need to see what is happening underneath, such as which application programming interface (API) calls a provider makes, how Terraform walks the dependency graph or why a plugin crashed, you turn on detailed logging with environment variables. No command-line flag does this; logging is controlled entirely by the environment, which makes it easy to enable for one terminal session or one pipeline job without changing code or commands.",
   "`TF_LOG` enables logging and sets the level. The levels, from most to least verbose, are `TRACE`, `DEBUG`, `INFO`, `WARN` and `ERROR`. Each level includes the messages of every less verbose level below it, so `DEBUG` also shows `INFO`, `WARN` and `ERROR` messages. `TRACE` is the most detailed and the level HashiCorp asks for in bug reports. There is also `JSON`, which produces logs at the `TRACE` level in a machine-readable JavaScript Object Notation (JSON) format, useful for feeding into log analysis tools. Leaving `TF_LOG` unset, or setting it to `OFF`, disables logging. Level names are not case-sensitive in practice, but the uppercase forms are what you will see in documentation and exam questions.",
   "```text\n$ export TF_LOG=DEBUG\n$ export TF_LOG_PATH=./terraform-debug.log\n$ terraform plan\n$ unset TF_LOG TF_LOG_PATH\n\n# PowerShell\nPS> $env:TF_LOG = \"TRACE\"\nPS> $env:TF_LOG_PATH = \"terraform.log\"\n```",
   "By default, logs go to standard error, mixed into your terminal alongside Terraform's normal output. `TF_LOG_PATH` sends them to a file instead, which is much easier to search, share with a colleague or attach to an issue. The file is appended to rather than overwritten, so repeated runs pile up in the same file unless you delete it or change the name between runs. `TF_LOG_PATH` only has an effect when logging is enabled with a level; setting a path without any level produces no log at all, which is a common source of confusion when someone expects a file to appear.",
   "Terraform's logs come from two sources. Terraform core is the CLI (command-line interface) program itself, which loads configuration, builds and walks the dependency graph, evaluates expressions and handles state. Provider plugins are separate programs that Terraform starts and talks to, and they make the actual API calls to clouds and services. You can set log levels for each separately. `TF_LOG_CORE` controls core logging and `TF_LOG_PROVIDER` controls provider logging, each accepting the same levels as `TF_LOG`. For example, `TF_LOG_PROVIDER=TRACE` with `TF_LOG_CORE` unset shows detailed provider activity, including request and response details, without flooding you with core graph messages, which is ideal when you suspect an API or permissions problem.",
   "Choosing a level is a balance between detail and noise. Start with `DEBUG` for the component you suspect, since it usually shows enough to identify a failing call. Move to `TRACE` when you need the full detail or when you are preparing a bug report that maintainers will read. `INFO`, `WARN` and `ERROR` are rarely used for troubleshooting Terraform itself, but they can help when you want a light record of a run in automation. Whatever level you choose, search the log for the word `error`, for the resource address involved or for the Hypertext Transfer Protocol (HTTP) status code returned by the API.",
   "Logs at `DEBUG` and `TRACE` can contain sensitive information, such as request bodies, resource attributes and sometimes credentials or tokens. Treat log files like state files. Do not commit them to version control, keep them out of artifact storage that many people can read, review and redact them before sharing publicly, and delete them when you are done. In shared continuous integration (CI) systems, prefer writing logs to a file with restricted access rather than to the job's console output, which is often visible to everyone with access to the project.",
   "Finally, remember to unset the variables afterwards. Verbose logging slows Terraform down, because writing every message takes time, and it produces very large files, especially at `TRACE` with many resources. A forgotten `TF_LOG=TRACE` in a shell profile or a pipeline definition can quietly fill disks and expose secrets for weeks. Setting the variables inline for a single command, as in `TF_LOG=DEBUG terraform plan` on Linux and macOS, is a good habit because they then apply only to that one run."
  ],
  "analogy": "Terraform logging is like the volume and channel controls on a two-way radio. TF_LOG is the master volume, from TRACE (every whisper) down to ERROR (only alarms). TF_LOG_CORE and TF_LOG_PROVIDER are separate channel knobs, so you can turn up the provider channel to hear the conversation with the cloud while keeping the core channel quiet. TF_LOG_PATH is plugging in a recorder. The analogy stops in one place: a recorder works without volume, but TF_LOG_PATH records nothing unless a level is set.",
  "mnemonic": "Levels from most to least verbose: The Dog Is Wagging Excitedly, for TRACE, DEBUG, INFO, WARN, ERROR. JSON is TRACE detail in JSON format.",
  "terms": [
   [
    "TF_LOG",
    "Environment variable that enables Terraform logging at TRACE, DEBUG, INFO, WARN, ERROR or JSON level; unset or OFF disables it."
   ],
   [
    "TF_LOG_PATH",
    "Environment variable that writes (appends) log output to a file instead of standard error; it needs a log level to be set."
   ],
   [
    "TF_LOG_CORE",
    "Environment variable that sets the log level for Terraform core only."
   ],
   [
    "TF_LOG_PROVIDER",
    "Environment variable that sets the log level for provider plugins only."
   ],
   [
    "JSON log level",
    "A TF_LOG value that outputs TRACE-level logs in machine-readable JSON format."
   ]
  ],
  "example": "A plan fails with a vague permission error from a cloud provider. An engineer sets TF_LOG_PROVIDER=DEBUG and TF_LOG_PATH=provider.log, reruns the plan, searches the file for the error and finds the exact API call and the role that was denied, then unsets both variables and deletes the log.",
  "mistakes": [
   [
    "There is a terraform plan -debug flag that enables verbose logging.",
    "Logging is controlled only by environment variables such as TF_LOG, not by command-line flags."
   ],
   [
    "Setting TF_LOG_PATH alone will produce a log file.",
    "TF_LOG_PATH has no effect unless a level is set with TF_LOG (or TF_LOG_CORE or TF_LOG_PROVIDER)."
   ],
   [
    "DEBUG is the most verbose level.",
    "TRACE is the most verbose. JSON produces TRACE-level detail in JSON format."
   ],
   [
    "TF_LOG_PATH overwrites the file on each run.",
    "It appends, so logs from repeated runs accumulate in the same file."
   ]
  ],
  "tryit": [
   [
    "An apply fails with a vague error from a provider, and you want detailed request and response information without thousands of lines about Terraform's graph. You also want the output saved to a file for a colleague. Which variables do you set?",
    "Set TF_LOG_PROVIDER=DEBUG (or TRACE if more detail is needed) and TF_LOG_PATH to a file name, leaving TF_LOG_CORE unset. Review and redact the file before sharing it."
   ],
   [
    "A teammate set TF_LOG_PATH=terraform.log in the pipeline weeks ago, but no log file ever appears. What is missing?",
    "A log level. TF_LOG_PATH only works when TF_LOG, TF_LOG_CORE or TF_LOG_PROVIDER is set to a level such as DEBUG or TRACE."
   ]
  ],
  "tip": "TRACE is the most verbose level, JSON outputs TRACE-level logs as JSON, TF_LOG_PATH appends to a file and does nothing unless a log level is set.",
  "check": [
   [
    "Which TF_LOG level is the most verbose?",
    "TRACE."
   ],
   [
    "How do you get detailed logs from providers but not from Terraform core?",
    "Set TF_LOG_PROVIDER to a level such as TRACE or DEBUG and leave TF_LOG_CORE unset."
   ],
   [
    "Where do logs go if TF_LOG is set but TF_LOG_PATH is not?",
    "To standard error, shown in the terminal."
   ]
  ]
 },
 {
  "t": "When to use logs: provider errors, crashes and bug reports",
  "hook": "Friday afternoon at Hollow Creek Water Authority, and Tomas is staring at an apply that failed while creating a load balancer. The only message says the context deadline was exceeded. His first instinct is to turn on TRACE logging for everything and post the whole log in a public issue tracker, asking for help. His colleague Mei stops him with two questions. Is this even a Terraform bug, or something about the cloud account? And has he looked at what is in that log before sharing it with the world? Knowing when logs help, which component to log, and how to file a useful bug report safely is the skill this lesson builds. Where should Tomas start?",
  "simple": "Most Terraform mistakes are easy to fix because the error message tells you exactly which file and line is wrong. Detailed logs are for the harder cases: when a cloud service rejects a request with a vague message, when a plugin times out, or when Terraform itself crashes. It helps to first ask where the problem lives: in your code, in Terraform's records, in Terraform itself, or in the plugin that talks to the cloud. Logs mostly help with the last two. It is like a car problem: a flat tire is obvious, but a strange engine noise needs the mechanic to plug in a diagnostic reader. And before you post the reader's printout online, you would black out your license plate and address.",
  "body": [
   "Most Terraform errors do not need logs. Syntax problems, missing variables, type mismatches, invalid references and failed validations produce clear messages that point to a file and line number, often with a short explanation of what Terraform expected. `terraform validate` catches many of these before you even plan, and `terraform fmt` fixes formatting so that real problems are easier to spot. Reach for logs only when the normal output is not enough to explain what happened, because verbose logs are long, slow to produce and can contain secrets.",
   "It helps to know where a problem lives before deciding how to investigate it. Terraform troubleshooting is usually grouped into four areas. Language errors are problems in HashiCorp Configuration Language (HCL) syntax or meaning, found by Terraform core and reported clearly. State errors come from drift or corruption in state, often fixed with a refresh-only plan or apply, or with state commands. Core errors are bugs in Terraform itself. Provider errors are problems in a provider plugin or in the remote application programming interface (API) it calls. The first two are usually solved from the normal output; logs are most valuable for the last two.",
   "Provider errors are the most common reason to enable logging. When a cloud API rejects a request with a vague message, a provider times out, or a resource keeps showing changes after every apply, provider logs show the actual requests and responses. Setting `TF_LOG_PROVIDER=DEBUG` or `TRACE` lets you see the endpoint called, the status code returned and the error body. From there you can tell whether the issue is permissions, a quota, an API rate limit, a region mismatch or a genuine provider bug. Many problems that look like Terraform failures turn out to be account settings, which you fix in the cloud account rather than in Terraform or in your configuration.",
   "```text\n$ export TF_LOG_PROVIDER=DEBUG\n$ export TF_LOG_PATH=./provider-debug.log\n$ terraform apply\n$ grep -i error ./provider-debug.log\n$ unset TF_LOG_PROVIDER TF_LOG_PATH\n```",
   "Crashes are the other big case. If Terraform or a plugin panics, meaning it hits an unexpected internal error and stops, you see a message that Terraform crashed along with a stack trace printed to the output. That stack trace, and a `TRACE`-level log of the same run, is what the maintainers need to find the bug. Where you report it depends on which program crashed. For a core crash, you report it to the Terraform project. For a provider crash, you report it to that provider's maintainers, because providers are separate programs developed and released separately from Terraform. The stack trace usually makes clear which one failed, since provider panics mention the provider plugin.",
   "When filing a bug report, include the information maintainers need to reproduce the problem. That means the Terraform version and provider versions, which `terraform version` shows together in one command; a minimal configuration that reproduces the problem, stripped of anything unrelated; the expected behavior and the actual behavior; the exact commands you ran; and the relevant log, usually captured with `TF_LOG=TRACE` and `TF_LOG_PATH`. Before sharing, remove secrets such as tokens, passwords, private keys and account identifiers, because trace logs can contain them. If a log is too sensitive to post publicly even after redaction, say so in the report and offer to share it privately.",
   "A minimal reproduction deserves extra effort. Start from the failing configuration and remove resources, modules and variables one at a time, rerunning each time, until removing anything more makes the problem disappear. The result is often only a provider block and one or two resources. This process frequently reveals the cause on its own, and when it does not, it gives maintainers a report they can act on quickly instead of a large configuration they cannot run.",
   "A practical approach to logging ties all of this together. Reproduce the problem first, so you know it is consistent. Turn on logging at `DEBUG` for the component you suspect, usually the provider, and write it to a file. Increase to `TRACE` only if you need more detail or are preparing a bug report. Search the log for the word `error`, for the resource address involved, or for a Hypertext Transfer Protocol (HTTP) status code such as 403 or 429. Then turn logging off again and delete the file, since verbose logs slow runs down, fill disks and may hold secrets."
  ],
  "analogy": "Troubleshooting Terraform is like a hospital triage desk. Most patients (language errors) have an obvious problem and a clear label, so they are treated straight away without scans. Logs are the scanner: you order one for unexplained symptoms, such as provider errors, or for a collapse, such as a crash, and you scan the body part you suspect rather than everything. Where the analogy stops: scan images stay private, but Terraform logs you share can reveal secrets unless you redact them.",
  "mnemonic": "Four troubleshooting areas in HashiCorp's usual order: Little Snails Climb Poles, for Language, State, Core, Provider. Logs help most with the last two.",
  "terms": [
   [
    "Provider error",
    "A failure in a provider plugin or the remote API it calls, often diagnosed with provider logs."
   ],
   [
    "Crash (panic)",
    "An unexpected termination of Terraform or a plugin that prints a stack trace and should be reported with logs."
   ],
   [
    "terraform version",
    "Command that shows the Terraform version and installed provider versions, needed for bug reports."
   ],
   [
    "Minimal reproduction",
    "The smallest configuration that still shows the problem, included in a bug report."
   ],
   [
    "Troubleshooting areas",
    "The four places problems usually live: language, state, core and provider."
   ]
  ],
  "example": "An apply fails with a timeout while creating a load balancer. Normal output only says the context deadline was exceeded. With TF_LOG_PROVIDER=DEBUG, the engineer sees the API returning a throttling error on repeated status checks, and raises the request quota instead of editing the configuration.",
  "mistakes": [
   [
    "Turn on TRACE logging for every error, including syntax errors.",
    "Language errors have clear messages with file and line. Use terraform validate and the normal output first; reserve logs for provider errors and crashes."
   ],
   [
    "Report every crash to the Terraform project.",
    "Core crashes go to the Terraform project, but provider crashes go to that provider's maintainers, because providers are separate programs."
   ],
   [
    "Paste the full trace log into a public issue as-is.",
    "Trace logs can contain tokens, passwords and account identifiers. Redact them first, or offer to share privately."
   ],
   [
    "Only the Terraform version matters in a bug report.",
    "Include provider versions too (terraform version shows both), plus a minimal configuration, expected and actual behavior, and the relevant log."
   ]
  ],
  "tryit": [
   [
    "A plan fails immediately with an error pointing to main.tf line 42, saying an argument named instnce_type is not expected here. A teammate wants to enable TRACE logging to investigate. What do you suggest?",
    "No logs are needed. This is a language error with a clear message: the argument name is misspelled. Fix it to instance_type and run terraform validate."
   ],
   [
    "During apply, Terraform prints that a plugin crashed, and the stack trace mentions the cloud provider plugin. You want to report it. Where do you report it, and what do you include?",
    "Report it to that provider's maintainers. Include terraform version output (Terraform and provider versions), a minimal configuration that reproduces it, expected and actual behavior, the stack trace and a redacted TRACE log captured with TF_LOG and TF_LOG_PATH."
   ]
  ],
  "tip": "Use logs for provider errors and crashes; report core crashes to Terraform and provider crashes to the provider; include terraform version output, a minimal configuration and a redacted TRACE log in bug reports.",
  "check": [
   [
    "Which command gives the version details you should include in a bug report?",
    "terraform version, which lists Terraform and provider versions."
   ],
   [
    "Why should trace logs be reviewed before posting them publicly?",
    "They can contain sensitive data such as tokens, passwords and resource attributes."
   ],
   [
    "A crash stack trace points to a provider plugin. Who should receive the bug report?",
    "That provider's maintainers, since providers are developed separately from Terraform core."
   ]
  ]
 },
 {
  "t": "Reviewing outputs and dependencies with `terraform output -json` and `terraform graph`",
  "hook": "It is the last step of the release pipeline at Lakeshore Freight, and the deployment job has failed again. The job needs the load balancer's DNS name and the database endpoint that Terraform created ten minutes earlier, but someone hard-coded last month's values into a script. Meanwhile Priya, the new platform engineer, is staring at a plan that wants to replace three instances after a one-line security group change, and nobody on the team can explain why. Your lead asks you to fix both problems before lunch: get Terraform's results into the pipeline without copy and paste, and show Priya exactly how the pieces of this configuration depend on each other. Which two commands do you reach for, and what should you be careful about with each?",
  "simple": "When Terraform builds things, it can report useful facts afterward, such as the web address of a new server. These reports are called outputs. The command `terraform output -json` prints all of them in JSON, a tidy text format that other programs can read easily, a bit like filling in a form instead of writing a letter. One catch: this form shows secret values too, so keep it safe. The second command, `terraform graph`, draws a map of which pieces depend on which. Think of a recipe: you must boil the pasta before you add the sauce. The graph shows those must-come-first links, so you can understand why Terraform builds or replaces things in a certain order.",
  "body": [
   "Terraform configurations rarely stand alone. Scripts, continuous integration (CI) pipelines and other tools need the values Terraform produced, and humans need to understand how resources depend on each other before they approve a change. Two commands cover these needs: `terraform output -json` shares results in a machine-readable way, and `terraform graph` makes the dependency structure visible. Both are read-only review tools, and both appear in the exam's maintenance and workflow objectives.",
   "Start with outputs. `terraform output -json` prints all root module outputs as a single JSON (JavaScript Object Notation) object. Each output appears as a key whose value is another object with three fields: `value`, the actual data; `type`, Terraform's type for it, such as `\"string\"` or a list of strings; and `sensitive`, a true or false flag. The key difference from the default human-readable view is how secrets are handled. Plain `terraform output` shows `<sensitive>` in place of a protected value, but the JSON form includes sensitive values in plain text, because it is meant for programs that need the real data. The flag tells the consuming program which values it should treat carefully.",
   "You can also ask for a single output. `terraform output -json subnet_ids` prints just that value as JSON, which is the right choice for lists and maps. Compare this with `terraform output -raw web_ip`, which prints a bare string with no quotes and is handy in shell scripts, but only works for strings, numbers and booleans. If a question asks how to get a list output into a script, `-json` is the answer, usually piped into a JSON tool such as `jq`.",
   "```text\n$ terraform output -json | jq -r '.web_ip.value'\n203.0.113.10\n\n$ terraform output -json subnet_ids\n[\"subnet-0a1\",\"subnet-0b2\"]\n\n$ terraform graph | dot -Tsvg > graph.svg\n```",
   "In practice, pipelines use `terraform output -json` to pass values to later stages: handing a cluster endpoint to a deployment job, writing an inventory file for a configuration management tool, or publishing connection details for another team. Because outputs are read from the latest state, the command is quick and does not contact providers or the cloud APIs. That also means it reflects the last apply, not the live world, so drift that happened since then will not show up. Treat the resulting JSON file as sensitive. If it lands in a build artifact, a log or a shared bucket, any secrets inside travel with it, so restrict where it is written and clean it up after use.",
   "Now the graph. `terraform graph` prints Terraform's internal dependency graph in DOT, the graph description language used by the open-source Graphviz tools. Each node is a resource, data source, provider or module element, and each edge (arrow) says that one node depends on another. Terraform builds this graph from two sources: references between blocks, such as `aws_instance.web` using `aws_security_group.web.id`, which create implicit dependencies, and `depends_on` arguments, which create explicit dependencies. It then walks the graph to decide creation order, the reverse order for destruction, and which operations can run in parallel because nothing connects them. Piping the text into Graphviz's `dot` command renders an image such as an SVG or PNG that you can open and inspect. The `-type` option asks for the graph of a particular operation, such as `-type=plan` or `-type=apply`, which can include extra detail about planned actions.",
   "Why does this matter for maintenance? A graph makes hidden coupling visible. You can see that a security group feeds several instances, which explains why a change to it ripples outward, or that one module consumes another module's output. It helps you explain why Terraform wants to replace something or why an apply happens in a particular order. It is also the quickest way to confirm that a `depends_on` you added actually produced the edge you expected. For large configurations the image becomes crowded, so focus on the part you care about, for example by running the command inside a smaller configuration or searching the DOT text for one resource address.",
   "Keep the two commands straight for the exam. `terraform output -json` answers the question what did this configuration produce, in a form programs can consume, and it reveals sensitive values. `terraform graph` answers the question how do the pieces connect, in DOT format that you render with Graphviz. Neither changes infrastructure or state. Used together during a review, they let you hand reliable values to the next stage and understand the order and blast radius of a change before anyone types `apply`."
  ],
  "analogy": "Think of a building project. `terraform output -json` is the handover sheet the builder gives you at the end: the address, the alarm code and the meter numbers, written on a standard form so the moving company can read it. Because the alarm code is on it, you lock it away. `terraform graph` is the construction schedule chart that shows the foundation must be poured before walls go up. The analogy stops at timing: the handover sheet reflects the last handover (the last apply), not any changes made to the building since.",
  "terms": [
   [
    "terraform output -json",
    "Prints root module outputs as JSON, each with value, type and sensitive fields, and reveals sensitive values in plain text."
   ],
   [
    "terraform output -raw",
    "Prints a single string, number or boolean output without quotes, for use in shell scripts; it cannot print lists or maps."
   ],
   [
    "terraform graph",
    "Prints the dependency graph of the configuration or of a chosen operation in DOT format."
   ],
   [
    "DOT / Graphviz",
    "A graph description language and the open-source toolset, including the dot command, that renders it as an image."
   ],
   [
    "Implicit dependency",
    "A dependency Terraform infers when an expression references another block's attributes."
   ],
   [
    "Explicit dependency",
    "A dependency declared with the depends_on argument when no reference exists."
   ]
  ],
  "example": "A CI pipeline applies infrastructure, then runs `terraform output -json > outputs.json`. The next stage reads the load balancer DNS name and database endpoint from that file with `jq` to configure the application deployment, so no values are copied by hand. Because the file contains the database password output, the pipeline marks it as a protected artifact and deletes it when the job ends.",
  "mistakes": [
   [
    "Believing `terraform output -json` hides sensitive values the same way the default view does.",
    "It does not. The default view prints `<sensitive>`, but the JSON form prints the real value along with `\"sensitive\": true`. Protect any file or log that receives it."
   ],
   [
    "Using `-raw` to export a list or map output into a script.",
    "`-raw` only works for primitive values such as strings and numbers. Use `-json` for lists, maps and objects, then parse the result."
   ],
   [
    "Thinking `terraform graph` produces an image directly.",
    "It prints DOT text. You render it with a Graphviz tool such as `dot -Tsvg` or `dot -Tpng`."
   ],
   [
    "Assuming `terraform output` queries the cloud for current values.",
    "Outputs come from the latest state. They reflect the last apply and do not show drift that happened since."
   ]
  ],
  "tryit": [
   [
    "Your deployment script needs the list of private subnet IDs that Terraform created, and a teammate suggests `terraform output -raw private_subnet_ids`. The script will loop over the IDs in a shell. The output is declared as a list of strings. What command should the script use, and why?",
    "Use `terraform output -json private_subnet_ids`, then parse it with a JSON tool such as `jq -r '.[]'`. The `-raw` flag only supports primitive values, so it fails for a list. The JSON form preserves the list structure that the loop needs."
   ],
   [
    "After adding `depends_on = [aws_iam_role_policy.app]` to an instance, a reviewer wants proof that Terraform now orders the policy before the instance. Nobody wants to run an apply just to check. What can you show the reviewer?",
    "Run `terraform graph`, render it with Graphviz or search the DOT text, and show the edge from the instance node to the policy node. The graph includes explicit dependencies from depends_on, and the command does not change anything."
   ]
  ],
  "tip": "`terraform output -json` shows sensitive values in plain text, and is the way to export lists and maps; `-raw` is for single primitive values. `terraform graph` outputs DOT, which you render with Graphviz.",
  "check": [
   [
    "What format does terraform graph produce?",
    "DOT, the Graphviz graph description language, which you render with a tool such as dot."
   ],
   [
    "Does terraform output -json hide sensitive outputs?",
    "No. The JSON output includes sensitive values in plain text along with a sensitive flag set to true."
   ],
   [
    "Which two sources does Terraform use to build its dependency graph?",
    "Implicit dependencies from references between blocks, and explicit dependencies declared with depends_on."
   ],
   [
    "Why might terraform output show a value that no longer matches the real resource?",
    "Because outputs are read from state, which reflects the last apply; changes made outside Terraform since then are not reflected."
   ]
  ]
 },
 {
  "t": "HCP Terraform (formerly Terraform Cloud): remote state, remote runs, a free tier and paid tiers",
  "hook": "At Juniper Valley Clinics, the infrastructure team is four people and one shared bucket that holds every Terraform state file. Last Thursday, Marco and Ellen applied changes to the same environment within a minute of each other, and the state file ended up missing two resources. The cloud keys live on everyone's laptops, and the only record of who changed what is a chat thread. Your director has read about HCP Terraform and asks you a direct question in the hallway: what does it actually give us that our bucket does not, does it cost anything to try, and is it the same thing as Terraform Cloud that the old blog posts mention? You have until the Friday meeting to answer clearly.",
  "simple": "Terraform needs somewhere to keep its notes about what it built (called state) and a computer to run on. Many teams start with notes on one laptop, which breaks down when several people work together. HCP Terraform is a website run by HashiCorp that keeps those notes safely in one place, stops two people changing them at once, and can run Terraform on its own computers so everyone sees the same results. It used to be called Terraform Cloud. There is a free option to start, and paid options add stricter rules and bigger-team features. It is like moving from a paper ledger in someone's desk to a shared online accounting system that keeps history and only lets one person post at a time.",
  "body": [
   "HCP Terraform is HashiCorp's software-as-a-service (SaaS) platform for running Terraform as a team. It was called Terraform Cloud until HashiCorp renamed it as part of the HashiCorp Cloud Platform (HCP) family. Terraform Enterprise is the self-hosted distribution of the same product, for organizations that must run it on their own infrastructure, for example because of regulatory or network isolation requirements. The current exam uses the name HCP Terraform, but older study material, blog posts and even some error messages still say Terraform Cloud, so recognize both names as the same service.",
   "The first core feature is remote state. Each workspace stores its state on HashiCorp's side, encrypted at rest, with automatic locking while a run is in progress so two operations cannot write at the same time. Every saved state becomes a state version, and the workspace keeps that history so you can inspect earlier versions, compare them and recover from a bad change. Access to state follows team permissions, so you can let some people read outputs without letting them download full state. Other workspaces can read a workspace's outputs only if you allow it through remote state sharing. In short, you get the benefits of a well-run remote backend without designing, securing and maintaining a storage bucket and lock table yourself.",
   "The second core feature is remote runs. Instead of running `terraform plan` and `terraform apply` on a laptop, runs execute on HashiCorp-managed workers. If your infrastructure sits in a private network that those workers cannot reach, you can install HCP Terraform agents inside that network and let them pick up the runs instead. Either way, everyone sees the same run history, plan output and logs in the web interface, and the CLI streams the same output back to the person who started the run. Variables and credentials are stored in the workspace, so engineers no longer need cloud keys on their own machines. Runs are queued per workspace, which means only one run can apply at a time in a given workspace, and that ordering removes the kind of collision Juniper Valley experienced.",
   "Around those two foundations, HCP Terraform adds collaboration and governance features. These include version control system (VCS) integration that plans automatically on pull requests, a private registry for sharing modules and providers inside the organization, team-based access control, policy as code with Sentinel or Open Policy Agent (OPA), run tasks for third-party checks such as security scanning, notifications, health assessments that detect drift, and dynamic provider credentials that replace long-lived cloud keys. Later lessons cover each one. The important point here is that which of these you get depends on your plan.",
   "HCP Terraform has a free tier suitable for individuals and small teams. It includes the core workflow: remote state, remote runs, VCS integration and the private registry, with limits on scale such as how many resources or users are covered. Paid tiers add more advanced governance and operations features, such as broader policy enforcement, more concurrent runs, drift detection and larger-scale team management. HashiCorp changes tier names, prices and limits from time to time, so do not memorize numbers for the exam. Focus on the shape of the offer: core workflow features are available to start for free, while governance and enterprise-scale features sit in paid tiers or in Terraform Enterprise.",
   "Why use HCP Terraform instead of a plain remote backend such as an object storage bucket? A bucket backend can store state and, with the right configuration, lock it, but it does not run anything, record who approved a change, keep credentials out of laptops, enforce policies or show a plan on a pull request. Building all of that yourself is undifferentiated work that every team repeats. HCP Terraform provides it as a consistent, auditable workflow in which every change is a recorded run tied to a person or a commit. For regulated or very large organizations that cannot use a SaaS product, Terraform Enterprise offers the same workflow inside their own environment.",
   "Expect exam questions to test three things: that Terraform Cloud and HCP Terraform are the same service; that Terraform Enterprise is the self-hosted option; and which benefits come from remote state (secure storage, locking, version history, controlled sharing) versus remote runs (shared logs, centralized credentials, consistent execution, queuing). If a scenario describes a team that wants to stop passing state files around and stop storing keys locally, HCP Terraform is the intended answer."
  ],
  "analogy": "HCP Terraform is like a shared, staffed workshop compared with everyone building furniture in their own garage. The workshop keeps one master blueprint in a locked cabinet (remote state), lets only one crew use the saw on a project at a time (locking and queuing), and logs every job in a book (run history). Terraform Enterprise is the same workshop built on your own property. The analogy stops at cost: a basic workshop membership here is free, and premium rules cost extra.",
  "terms": [
   [
    "HCP Terraform",
    "HashiCorp's hosted service, formerly Terraform Cloud, for remote state, remote runs and team collaboration with Terraform."
   ],
   [
    "Terraform Enterprise",
    "The self-hosted distribution of HCP Terraform for organizations that run it on their own infrastructure."
   ],
   [
    "Remote run",
    "A Terraform plan or apply executed on HCP Terraform workers or agents, with output shown in the web UI and streamed to the CLI."
   ],
   [
    "State version history",
    "The record of every state saved in a workspace, which can be viewed, compared and used for recovery."
   ],
   [
    "HCP Terraform agent",
    "A lightweight process you run in your own network so remote runs can reach private infrastructure."
   ]
  ],
  "example": "A five-person team replaces its homemade object storage state setup and laptop-based applies with HCP Terraform's free tier. Every change now runs remotely with shared logs, the cloud credentials live only in sensitive workspace variables, and pull requests show a plan automatically. When they later need policy enforcement across many teams, they evaluate a paid tier rather than building their own checks.",
  "mistakes": [
   [
    "Treating Terraform Cloud and HCP Terraform as two different products.",
    "They are the same service under an old and a new name. The exam uses HCP Terraform."
   ],
   [
    "Calling Terraform Enterprise the paid tier of the hosted service.",
    "Terraform Enterprise is the self-hosted distribution that you install and operate yourself. Paid tiers of HCP Terraform are still hosted by HashiCorp."
   ],
   [
    "Believing HCP Terraform has no free option, or that the free tier includes every governance feature.",
    "There is a free tier with the core workflow, and advanced governance and scale features are in paid tiers. Learn the categories, not prices."
   ],
   [
    "Assuming a plain bucket backend gives the same benefits.",
    "A bucket can store and lock state, but it does not run Terraform, store credentials, keep run history or enforce policies."
   ]
  ],
  "tryit": [
   [
    "A bank's security team says no infrastructure tooling may run on a third-party SaaS platform, but the platform team wants the HCP Terraform workflow with remote runs, private registry and policies. They have their own data center and Kubernetes clusters. Which offering fits, and why?",
    "Terraform Enterprise, the self-hosted distribution. It provides the same workflow as HCP Terraform but runs inside the bank's own environment, satisfying the no-SaaS rule."
   ],
   [
    "A startup of three engineers keeps state in a shared folder and has already overwritten it twice. They have no budget and only need shared state, locking and plans on pull requests. What should they try first?",
    "The HCP Terraform free tier. It includes remote state with locking and history, remote runs and VCS integration, which address their problems without cost."
   ]
  ],
  "tip": "Terraform Cloud was renamed HCP Terraform; Terraform Enterprise is the self-hosted version. Do not memorize prices or limits; know that core workflow features are free to start and governance features sit in paid tiers.",
  "check": [
   [
    "What is the self-hosted version of HCP Terraform called?",
    "Terraform Enterprise."
   ],
   [
    "Name two core benefits of HCP Terraform over running Terraform locally with local state.",
    "Secure shared remote state with locking and version history, and remote runs with shared logs and centrally stored credentials."
   ],
   [
    "How can HCP Terraform run plans against infrastructure in a private network it cannot reach directly?",
    "By using HCP Terraform agents installed inside that network to execute the runs."
   ]
  ]
 },
 {
  "t": "Connecting the CLI: `terraform login` and the `cloud` block (organization, workspaces by name or tags)",
  "hook": "Your first week at Bramble Logistics, and the onboarding doc says only: clone the infra repository, connect to HCP Terraform, and plan the billing stack in dev. You run `terraform plan` and get an error saying the CLI has no credentials for the host. A senior engineer, Tomas, glances over and says you never logged in, and also that the repository's `cloud` block uses tags, so you will need to pick a workspace. Later that afternoon, the CI pipeline breaks because it has no browser to log in with. Three questions are now on your sticky note: how does the CLI get a token, how does the pipeline get one, and how does one configuration know which workspace to use?",
  "simple": "Before your terminal can talk to HCP Terraform, two things are needed. First, the terminal must prove who you are. The command `terraform login` opens a web page where you create a token, a long secret password just for tools, and saves it on your computer. Robots such as build pipelines cannot use a web page, so they get the token from a special setting called an environment variable. Second, your code must say where it belongs. A short `cloud` block names your organization (your company's account) and either one workspace by name or a group of workspaces by labels called tags. It is like a gym: your membership card proves who you are, and the class schedule says which room to go to.",
  "body": [
   "To use HCP Terraform from a terminal, two things must be in place. The command-line interface (CLI) must be able to authenticate to HCP Terraform, and the configuration must say which organization and which workspaces it belongs to. `terraform login` takes care of the first, and the `cloud` block inside the `terraform` block takes care of the second. Keep these separate in your head: one is about identity, the other about destination.",
   "`terraform login` opens a browser page where you generate an application programming interface (API) token for your user account, then asks you to paste it back into the terminal. The CLI saves the token in a credentials file in your user profile, named `credentials.tfrc.json`, inside the `.terraform.d` directory on Linux and macOS, or in the application data directory on Windows. The token is stored in plain text, so protect that file with normal file permissions and never commit it to a repository. By default the command targets HCP Terraform's standard hostname, `app.terraform.io`. For Terraform Enterprise, pass your own hostname, as in `terraform login tfe.example.com`. When you are done on a shared machine, `terraform logout` removes the stored token for that host.",
   "Automation has no browser, so pipelines supply the token differently. The usual method is an environment variable named `TF_TOKEN_` followed by the hostname with dots replaced by underscores, for example `TF_TOKEN_app_terraform_io`. Store that value as a protected secret in the CI system. A CLI configuration file with a `credentials` block also works. For CI, prefer a team token or a dedicated service account over a personal user token, so the pipeline keeps working when a person leaves and so its permissions can be scoped narrowly.",
   "```hcl\nterraform {\n  cloud {\n    organization = \"example-org\"\n    workspaces {\n      tags = [\"app\", \"aws\"]\n    }\n  }\n}\n```",
   "The `cloud` block's `organization` argument names the HCP Terraform organization. Inside the nested `workspaces` block, you choose one of two strategies. With `name = \"app-prod\"`, the configuration maps to exactly one HCP Terraform workspace, which Terraform creates during init if it does not already exist. With `tags`, the configuration maps to every workspace that carries all of the listed tags. Tag mode lets one configuration serve several workspaces, such as `app-dev` and `app-prod`. You see them with `terraform workspace list`, switch with `terraform workspace select app-dev`, and create a new one that automatically gets those tags with `terraform workspace new app-staging`. You cannot set both `name` and `tags` in the same block, and that rule is a favorite exam distractor. An optional `project` argument chooses which project new workspaces are created in, and an optional `hostname` argument points at Terraform Enterprise.",
   "After writing the block, run `terraform init`. Terraform uses your token to authenticate, connects to the organization, and sets up or selects the workspace. If the directory previously used local state or a different backend, init detects that and offers to migrate the existing state into the HCP Terraform workspace, so you do not lose track of resources you already manage. From then on, `terraform plan` and `terraform apply` either run remotely or locally depending on the workspace's execution mode, and in both cases state is stored in the workspace rather than on disk.",
   "Environment variables can fill in or override the block's settings, which keeps pipelines flexible. `TF_CLOUD_ORGANIZATION` sets the organization, `TF_CLOUD_HOSTNAME` the host, `TF_CLOUD_PROJECT` the project, and `TF_WORKSPACE` selects a workspace. This even allows an empty `cloud {}` block, with every detail supplied by the environment of the job that runs it. A common pattern is to keep the organization in code and let each pipeline set `TF_WORKSPACE` for its target environment.",
   "When something goes wrong, the error usually tells you which half failed. A message saying the CLI has no credentials for a host, or that a token is invalid, is an identity problem: log in again, check that the `TF_TOKEN_` variable name matches the hostname exactly, or confirm the token has not been revoked. A message saying an organization or workspace cannot be found, or that no workspaces match the given tags, is a destination problem: check the spelling in the `cloud` block, the tags on the workspaces, and whether your account has permission to see them. Remember that changing the `cloud` block always requires running `terraform init` again before plan or apply will work.",
   "For the exam, connect each problem to its tool. Authentication for a person: `terraform login`, which stores a token in `credentials.tfrc.json`. Authentication for automation: `TF_TOKEN_<hostname>` or a CLI configuration file. Destination: the `cloud` block, with `organization` plus either `name` for one workspace or `tags` for many. Activation: `terraform init`, which can migrate existing state."
  ],
  "analogy": "Think of a hotel. `terraform login` is checking in at the front desk and receiving a key card, and the card sits in your wallet (the credentials file), so anyone who takes your wallet can use it. A pipeline is a delivery robot that is handed a key card directly by staff (the environment variable). The `cloud` block is the room assignment: one specific room by number (`name`) or any room on the floor with certain features (`tags`). You cannot be assigned both ways at once.",
  "mnemonic": "Login, Block, Init: L-B-I, like Library. Get your library card (terraform login), write which shelf you want (the cloud block), then check in at the desk (terraform init).",
  "terms": [
   [
    "terraform login",
    "A command that obtains an HCP Terraform API token through the browser and stores it locally for the CLI."
   ],
   [
    "credentials.tfrc.json",
    "The local file where terraform login stores API tokens in plain text."
   ],
   [
    "TF_TOKEN_hostname",
    "An environment variable that supplies an API token for a given host, such as TF_TOKEN_app_terraform_io, with dots replaced by underscores."
   ],
   [
    "cloud block",
    "A block inside the terraform block that names the HCP Terraform organization and the workspace or workspaces the configuration uses."
   ],
   [
    "Workspace tags mapping",
    "Using tags in the cloud block so one configuration maps to every workspace carrying all the listed tags."
   ]
  ],
  "example": "A developer clones a repository with a cloud block using `tags = [\"billing\"]`. They run `terraform login`, paste a token, run `terraform init`, then `terraform workspace select billing-dev` to work on the dev workspace. The CI pipeline that applies to `billing-prod` instead sets `TF_TOKEN_app_terraform_io` from its secret store and `TF_WORKSPACE=billing-prod`, so it never needs a browser.",
  "mistakes": [
   [
    "Setting both `name` and `tags` in the `workspaces` block to be safe.",
    "They are mutually exclusive. Use `name` for exactly one workspace or `tags` to map to several."
   ],
   [
    "Running `terraform login` inside a CI job.",
    "Login needs an interactive browser and a person pasting a token. CI should use a `TF_TOKEN_<hostname>` environment variable or a CLI configuration file holding a team or service token."
   ],
   [
    "Assuming the stored token is encrypted on disk.",
    "`credentials.tfrc.json` holds the token in plain text. Protect the file and use `terraform logout` on shared machines."
   ],
   [
    "Writing the variable as `TF_TOKEN_app.terraform.io`.",
    "Dots in the hostname are replaced with underscores: `TF_TOKEN_app_terraform_io`."
   ]
  ],
  "tryit": [
   [
    "A team has one configuration for its web tier and wants separate dev, staging and prod workspaces in HCP Terraform, each with its own state and variables. They want developers to switch between environments from the terminal without editing code. How should they write the cloud block?",
    "Use the `tags` strategy, for example `tags = [\"web\"]`, and tag each workspace accordingly. Developers can then use `terraform workspace list` and `terraform workspace select` to switch. A `name` setting would bind the configuration to a single workspace."
   ],
   [
    "Your Terraform Enterprise server is at `tfe.corp.example`. A new engineer runs `terraform login` and ends up on the HCP Terraform sign-in page instead. What went wrong, and what should they run?",
    "By default `terraform login` targets HCP Terraform's standard host. They should run `terraform login tfe.corp.example`, and the cloud block should set `hostname` to the same value."
   ]
  ],
  "tip": "terraform login stores a token in credentials.tfrc.json; in CI use TF_TOKEN_<host> with dots replaced by underscores. In the cloud block, workspaces use name (one) or tags (many), never both, and terraform init activates it.",
  "check": [
   [
    "How does a CI job authenticate to HCP Terraform without terraform login?",
    "By setting an environment variable such as TF_TOKEN_app_terraform_io with an API token, or by using a CLI configuration file with credentials."
   ],
   [
    "What does tags in the cloud block's workspaces block do?",
    "Maps the configuration to all workspaces with those tags, so you can switch among them with terraform workspace select."
   ],
   [
    "Which environment variable selects the workspace when a cloud block uses tags or is empty?",
    "TF_WORKSPACE."
   ]
  ]
 },
 {
  "t": "Workflows: VCS-driven, CLI-driven and API-driven runs",
  "hook": "At Silverpine Insurance, three teams share HCP Terraform but work in completely different ways. The networking team reviews every change as a pull request and wants plans to appear on the pull request automatically. The data team works from terminals and tests ideas before committing anything. The release engineering team already has a large in-house deployment system and refuses to give it up. Your manager hands you a whiteboard marker in the planning meeting and asks: can one platform support all three, and which workspace setup does each team need? Then the networking lead adds a twist: why did my `terraform apply` from the laptop get rejected by our workspace yesterday?",
  "simple": "HCP Terraform can be told to start work in three different ways. In the first, it watches your code storage site (such as GitHub). When someone saves new code to the main branch, it starts automatically, and when someone proposes a change, it shows a preview that cannot be carried out. In the second, you type commands in your own terminal, but the work happens on HCP Terraform's computers. In the third, another program sends it instructions through its API, a doorway for programs. The actual steps (preview, checks, then build) are the same in all three. Only the starting signal differs, like a coffee shop that takes orders at the counter, through an app, or from a delivery service.",
  "body": [
   "Every HCP Terraform workspace uses one of three workflows: VCS-driven, CLI-driven or API-driven. The workflow determines how configuration arrives in the workspace and what starts a run. The run itself does not change between workflows. A run still produces a plan, may pass through policy checks and run tasks, may wait for approval, and then applies. What differs is the trigger and where the source of truth for the code lives. Understanding that distinction makes most exam questions on this topic straightforward.",
   "In the VCS-driven workflow, the workspace is connected to a repository and branch on a version control system (VCS) provider such as GitHub, GitLab, Bitbucket or Azure DevOps. When someone pushes a commit to the tracked branch, HCP Terraform receives a webhook, fetches that commit's configuration and starts a run automatically. When someone opens a pull request against the branch, HCP Terraform runs a speculative plan, a plan-only run that can never be applied, and posts the result as a status check on the pull request. Reviewers can click through and see exactly which resources would be added, changed or destroyed before they approve. Merging the pull request puts the commit on the tracked branch, which triggers the real run. You can also limit runs to changes in certain directories of a repository, which helps when one repository holds several configurations. This is the most GitOps-style workflow, where the repository is the single source of truth, and it is the most common choice for teams.",
   "In the CLI-driven workflow, you work from your terminal as usual, with a `cloud` block in the configuration. When you run `terraform plan`, the command-line interface (CLI) packages your local configuration files, uploads them to HCP Terraform, and the plan executes remotely while the output streams back to your terminal. `terraform apply` does the same and then asks for confirmation, either in the terminal or in the web interface. It feels like local Terraform, but state, variables, credentials and run history all live in the workspace. This suits teams that want remote execution and central state but already have their own review process, and developers who want to test uncommitted changes before opening a pull request.",
   "```text\n$ terraform plan\nRunning plan in HCP Terraform. Output will stream here.\nPressing Ctrl-C will stop streaming the logs, but will not stop the plan running remotely.\n```",
   "Notice the second line of that output. Because the run executes remotely, pressing Ctrl-C only stops your terminal from showing the logs; the run continues in HCP Terraform, and you can cancel it there if needed. This is a small but telling detail that confirms the CLI-driven workflow is truly remote.",
   "In the API-driven workflow, an external tool controls everything through the HCP Terraform application programming interface (API). A script or continuous integration and continuous delivery (CI/CD) system packages the configuration into a compressed tarball, creates a configuration version in the workspace, uploads the tarball to it, and then creates a run, optionally polling for its status and approving it through the API. This gives the most control over when and how runs happen and is used by organizations with their own pipelines or custom internal platforms. It also requires the most engineering effort, because your tooling has to handle packaging, uploading, status checks and error handling that the other workflows provide for free.",
   "Choosing a workflow is mostly a question of where your source of truth and your approvals live. If pull requests in a repository should drive every change, choose VCS-driven. If people run Terraform interactively and want the remote benefits, choose CLI-driven. If an existing pipeline or custom tool must orchestrate runs, choose API-driven. These map neatly to typical exam scenarios that describe a team's habits and ask which workflow fits.",
   "One rule catches many learners. A workspace connected to VCS does not accept `terraform apply` from the CLI, because the repository is its source of truth; letting someone apply unreviewed local files would bypass that. You can still run `terraform plan` from the CLI against a VCS-connected workspace, which produces a speculative plan using your local files, useful for checking a change before pushing it. To apply, push or merge to the tracked branch, or start a run from the web interface."
  ],
  "analogy": "Think of a print shop. The VCS-driven workflow is a standing order: whenever a new approved file lands in the shared folder, the shop prints it, and drafts get a free proof that cannot become a print job. The CLI-driven workflow is walking in with a USB stick and watching the printer from the counter. The API-driven workflow is your own system sending orders by integration. The analogy breaks slightly for VCS shops: they refuse walk-in print jobs, just as a VCS-connected workspace refuses CLI applies.",
  "terms": [
   [
    "VCS-driven workflow",
    "A workspace connected to a repository branch, where commits to the branch trigger runs and pull requests trigger speculative plans."
   ],
   [
    "CLI-driven workflow",
    "Runs started from the local terraform CLI that upload the local configuration and execute remotely in HCP Terraform."
   ],
   [
    "API-driven workflow",
    "Runs started by external tools that create and upload configuration versions and create runs through the HCP Terraform API."
   ],
   [
    "Speculative plan",
    "A plan-only run that shows proposed changes but can never be applied, used for pull request checks and CLI plans on VCS workspaces."
   ],
   [
    "Configuration version",
    "A snapshot of configuration files uploaded to a workspace, which a run uses as its code."
   ]
  ],
  "example": "A platform team connects its networking workspace to the main branch of a GitHub repository. Each pull request shows a speculative plan as a status check; after approval and merge, HCP Terraform plans and waits for an authorized user to confirm the apply. A data engineer on another team uses the CLI-driven workflow to try changes from a terminal, while release engineering's own deployment system creates configuration versions and runs through the API.",
  "mistakes": [
   [
    "Thinking a pull request triggers a real run that can be applied.",
    "Pull requests trigger speculative plans only. The real run starts when the change lands on the tracked branch."
   ],
   [
    "Believing CLI-driven means the plan runs on your laptop.",
    "The CLI uploads the configuration and the run executes remotely; output only streams back to your terminal."
   ],
   [
    "Expecting `terraform apply` from the CLI to work on a VCS-connected workspace.",
    "VCS-connected workspaces reject CLI applies because the repository is the source of truth. CLI plans still work as speculative plans."
   ],
   [
    "Assuming the three workflows run different kinds of plans and applies.",
    "The run stages are the same; only the trigger and the source of configuration differ."
   ]
  ],
  "tryit": [
   [
    "A company already uses a mature in-house deployment tool that runs tests, collects approvals and deploys applications. They want that tool to start Terraform runs in HCP Terraform at the right moment in each release and report status back. Which workflow should their workspaces use, and why?",
    "The API-driven workflow. Their tool can create configuration versions, upload code and create runs through the API, keeping orchestration in the existing system. VCS-driven would move the trigger to repository events, and CLI-driven relies on people at terminals."
   ],
   [
    "A developer on a VCS-connected workspace wants to see what their uncommitted change would do before pushing. They worry the CLI is blocked entirely. What can they do?",
    "Run `terraform plan` from the CLI. On a VCS-connected workspace it produces a speculative plan from their local files. Only `terraform apply` from the CLI is rejected."
   ]
  ],
  "tip": "Pull requests trigger speculative (plan-only) runs in the VCS workflow; merges to the tracked branch trigger real runs. VCS-connected workspaces reject CLI applies but allow CLI speculative plans. API-driven means configuration versions uploaded by your own tooling.",
  "check": [
   [
    "Which workflow uses configuration versions uploaded through the API?",
    "The API-driven workflow."
   ],
   [
    "What kind of run does opening a pull request start in a VCS-driven workspace?",
    "A speculative plan, which shows changes but cannot be applied."
   ],
   [
    "In the CLI-driven workflow, what happens if you press Ctrl-C during a remote plan?",
    "The terminal stops streaming logs, but the run continues in HCP Terraform unless you cancel it there."
   ]
  ]
 },
 {
  "t": "Workspaces: each holds its own state, variables, run history and permissions",
  "hook": "An external auditor is sitting across from you at Northgate Credit Union, laptop open, and asks a simple question: who changed the production firewall rule on the fourteenth, what exactly did they change, and who approved it? In the old days that would have meant searching chat logs and asking around. Today the firewall configuration lives in an HCP Terraform workspace, and a junior engineer, Aisha, quietly asks you afterward why the team bothered creating separate dev and prod workspaces instead of just using `terraform workspace new prod` like her last job. What does a workspace actually hold, and why does that answer both the auditor and Aisha?",
  "simple": "In HCP Terraform, a workspace is a labeled box for one piece of your infrastructure, such as the production network. Each box keeps its own things: the notes about what was built (state), the settings and secrets it needs (variables), a diary of every change (run history), and a list of who is allowed to look or make changes (permissions). Because each box is separate, a mistake in the test box cannot spill into the production box, and you can let only a few people touch production. It is like separate bank accounts: each has its own balance, its own statement history and its own list of people allowed to sign, even if the same family owns them all.",
  "body": [
   "In HCP Terraform, a workspace is the unit that manages one collection of infrastructure. A useful mental model is everything a Terraform working directory on your laptop would contain, such as the state and the variable values, plus the collaboration features a team needs, such as history, approvals and access control. Organizations usually create one workspace per component per environment, giving names like `networking-prod`, `networking-dev` and `app-prod`. Splitting by component keeps each state small and each blast radius limited; splitting by environment keeps production isolated.",
   "Each workspace holds its own state. The current state and every previous state version are stored in the workspace, locked automatically while a run is in progress, and visible only to users with permission. Because states are separate, a mistake in one workspace cannot overwrite another's state. If someone runs a destructive change in `app-dev`, the state of `app-prod` is untouched. Separate state also means you can restrict who may download production state, which matters because state can contain sensitive values.",
   "Each workspace holds its own variables. Terraform input variables and environment variables, such as cloud credentials or `TF_LOG`, are set per workspace and can be marked sensitive so their values become write-only. Variable sets shared across many workspaces can supplement them. This replaces `.tfvars` files and local environment variables on laptops, and it is how the same configuration code produces different results in production and development: the code is identical, but `instance_count` or the target account differs per workspace.",
   "Each workspace keeps its own run history. Every plan and apply is recorded with who or what triggered it, the commit or configuration version used, the full plan and apply logs, any policy check and run task results, comments, who confirmed the apply, and the resulting state version. This is the audit trail Northgate's auditor needs. You can open the run from the fourteenth, see the commit that introduced the firewall change, read the exact plan output, and see who clicked confirm. The history also helps engineers answer the everyday question of when a setting changed and why.",
   "Each workspace has its own permissions and settings. Team access decides who can read, plan, write or administer the workspace, either granted directly on the workspace or inherited from its project. Settings include the execution mode (remote, local or agent), whether applies happen automatically after a successful plan or wait for manual confirmation, the Terraform version used for runs, the VCS connection and working directory, run triggers, notifications, and remote state sharing. Because these settings are per workspace, production can require manual approval while development auto-applies, using the same code.",
   "Contrast this with CLI workspaces, the ones created with `terraform workspace new` against a regular backend. A CLI workspace is just an additional, named state for the same configuration and the same backend; it shares the backend's credentials, access controls and everything else. Anyone who can reach the backend can reach every CLI workspace's state. An HCP Terraform workspace, by contrast, is a complete, independently permissioned environment. The two ideas do meet: when a `cloud` block maps to workspaces by tags, `terraform workspace select` switches between HCP Terraform workspaces from the terminal. For the exam, remember that HCP Terraform workspaces separate state, variables, runs and access, which makes them suitable for isolating environments in a way CLI workspaces are not.",
   "How do you decide how many workspaces to create? A practical rule is that each workspace should be something one team owns and changes together, at a size where a plan finishes quickly and a reviewer can read it. A single huge workspace makes every plan slow and every change risky, because one mistake can touch everything. Too many tiny workspaces create a web of dependencies that is hard to follow. Consistent names that include the component and the environment, plus tags, make large collections easier to search and to map from a `cloud` block.",
   "Workspaces can still share data when you want them to. With remote state sharing enabled on a source workspace, another workspace can read its outputs using the `tfe_outputs` data source from the `tfe` provider or the `terraform_remote_state` data source. Sharing can be limited to specific workspaces or opened to the whole organization. Run triggers can also start a downstream workspace's run automatically when an upstream workspace applies, so an application workspace can re-plan after the network workspace changes. These controlled connections let you keep workspaces small and isolated without making them blind to each other."
  ],
  "analogy": "An HCP Terraform workspace is like a separate apartment in a building: its own lease (permissions), its own utility accounts (variables), its own mailbox history (run history) and its own furniture inventory (state). A CLI workspace is more like an extra room in one shared apartment: different furniture, but everyone with the front door key can walk in. The analogy stops at sharing: workspaces can choose to publish their outputs to neighbors, which apartments rarely do.",
  "terms": [
   [
    "HCP Terraform workspace",
    "A container for one infrastructure collection with its own state, variables, run history, settings and permissions."
   ],
   [
    "Run history",
    "The recorded list of a workspace's plans and applies with logs, triggers, approvers and resulting state versions."
   ],
   [
    "Auto-apply",
    "A workspace setting that applies successful plans automatically instead of waiting for manual confirmation."
   ],
   [
    "Execution mode",
    "A workspace setting choosing whether runs execute remotely on HCP Terraform workers, locally on the user's machine, or on self-hosted agents."
   ],
   [
    "Remote state sharing",
    "A workspace setting that controls which other workspaces may read its outputs."
   ]
  ],
  "example": "An auditor asks who changed a production firewall rule last month. The team opens the `firewall-prod` workspace's run history, finds the run, sees the commit it came from, who approved the apply and the exact plan output, and exports the log for the audit file. Meanwhile `firewall-dev` uses the same code with auto-apply enabled and broader team access, which the auditor confirms cannot affect production state.",
  "mistakes": [
   [
    "Treating HCP Terraform workspaces and CLI workspaces as the same thing.",
    "CLI workspaces only add separate state under one backend and its access controls. HCP Terraform workspaces each have their own state, variables, run history, settings and permissions."
   ],
   [
    "Believing all workspaces in an organization share one set of variables.",
    "Variables are per workspace. Variable sets can share values deliberately, but nothing is shared by default."
   ],
   [
    "Assuming one workspace can automatically read another's outputs.",
    "Remote state sharing must allow it, and then the consumer uses `tfe_outputs` or `terraform_remote_state`."
   ],
   [
    "Thinking auto-apply is an organization-wide switch.",
    "It is a per-workspace setting, so production can require confirmation while development applies automatically."
   ]
  ],
  "tryit": [
   [
    "A team runs dev and prod from one backend using CLI workspaces. A contractor needs to work on dev but must not be able to read production state, which contains database connection details. Can they enforce this with CLI workspaces, and what would you recommend?",
    "Not reliably, because CLI workspaces share the backend's credentials and access controls. Move to separate HCP Terraform workspaces, give the contractor's team access to the dev workspace only, and keep production access limited."
   ],
   [
    "The app workspace needs the VPC ID that the network workspace outputs. The network workspace currently has remote state sharing turned off. What two things must happen for the app configuration to read that value?",
    "Enable remote state sharing on the network workspace for the app workspace (or the organization), then read the output in the app configuration with the `tfe_outputs` or `terraform_remote_state` data source."
   ]
  ],
  "tip": "HCP Terraform workspaces are full, separately permissioned environments (state, variables, runs, settings, access); CLI workspaces only separate state within one backend.",
  "check": [
   [
    "Name four things each HCP Terraform workspace holds separately.",
    "Its state and state history, variables, run history, and permissions and settings."
   ],
   [
    "Why are HCP Terraform workspaces better than CLI workspaces for separating prod and dev?",
    "They have separate variables, credentials and access controls, not just separate state."
   ],
   [
    "Which data sources can read another workspace's outputs when sharing is enabled?",
    "tfe_outputs from the tfe provider, or terraform_remote_state."
   ]
  ]
 },
 {
  "t": "Projects: grouping workspaces and assigning team access at the project level",
  "hook": "It is Tuesday at Copperfield Media, and the HCP Terraform organization has grown to more than three hundred workspaces. Every time a new service launches, Rosa, the only platform administrator, spends an afternoon granting the right team access to each new workspace by hand. Last week she missed one, and the payments team could not deploy for a day. This morning she found that a marketing contractor still had write access to two old payments workspaces. Her manager asks whether there is a way to let each team manage its own corner of HCP Terraform without giving anyone the keys to everything and without Rosa becoming the bottleneck. What structure is she missing?",
  "simple": "When a company has hundreds of workspaces (the boxes that each manage one piece of infrastructure), giving people access box by box gets slow and messy. A project is a folder that holds a group of related workspaces, such as everything the payments team runs. You give a team access to the folder once, and that access automatically covers every box inside it, including boxes added later. Each box sits in exactly one folder. It is like a shared drive at school: instead of sharing each file with your group one by one, you share the group folder, and every new file you put in it is shared automatically.",
  "body": [
   "As organizations adopt HCP Terraform widely, they end up with hundreds of workspaces. Managing access workspace by workspace becomes slow and error-prone: new workspaces wait for someone to grant permissions, and old permissions linger after people change roles. Projects solve this by grouping related workspaces into a container that you can organize and permission as one unit. They sit between the organization and its workspaces in the hierarchy.",
   "Every workspace belongs to exactly one project. An organization starts with a default project, and new workspaces land there unless you choose otherwise. You can create projects that mirror how your company is organized, such as one per application, business unit, team or environment, and move workspaces between projects as ownership changes. When you connect a configuration through the CLI, the `cloud` block's `project` argument, or the `TF_CLOUD_PROJECT` environment variable, tells Terraform which project to place newly created workspaces in. If neither is set, new workspaces go to the default project.",
   "The most important feature of projects is project-level team access. Instead of granting a team permission on each workspace, you grant it once on the project, and it applies to every workspace in that project, including workspaces created later. That single change fixes both of Copperfield's problems: new workspaces inherit access automatically, and removing a team from a project removes its access everywhere inside at once. Built-in project permission levels range from read access, through write access for running and applying, up to full administration of the project. A project admin can create, manage and delete workspaces within that project and manage team access to it, without holding any rights across the rest of the organization. Custom permission sets are also available when the built-in levels do not fit, for example letting a team run plans and applies but not change variables.",
   "This supports a clean delegation model. Organization owners set up projects and decide which teams may use them. Each application team then works independently inside its own project, creating workspaces as new services appear, while other teams cannot see or change them unless granted access. This follows the principle of least privilege, giving each team only what it needs, without making central administrators a bottleneck for routine work. Access is additive: a team's effective permission on a workspace is the combination of what it receives at the organization level, the project level and directly on the workspace.",
   "Projects also help with shared configuration. Variable sets can be scoped to a project, so shared values, such as the settings for a team's cloud account or credentials for a sandbox, reach every workspace in the project automatically. Policy sets can likewise be applied to projects, so stricter rules can be enforced on a production project while a sandbox project runs lighter checks. Some project-level features and settings depend on your HCP Terraform tier, so check what your plan includes rather than assuming every option is available.",
   "A common layout uses one project per team or application, with workspaces inside named by component and environment, such as `payments-api-dev` and `payments-api-prod`. Some organizations instead create separate projects for production and non-production, so production policies and approvals apply to an entire project. Either works; the key is that the project boundary should match the boundary at which you want to grant access and apply shared variables and policies.",
   "Because so much is inherited from the project, moving a workspace is a meaningful change, not just a cosmetic one. When a workspace moves from one project to another, it stops receiving the old project's team access, project-scoped variable sets and project-level policy sets, and starts receiving the new project's. Its own state, run history and workspace-specific variables travel with it unchanged. Before moving a workspace, check that the new project grants the right teams access and supplies any shared credentials the runs depend on, or the next run may fail or the wrong people may lose access.",
   "Keep the hierarchy straight for the exam. An organization is the top-level container and holds projects, teams and organization settings. Projects contain workspaces, and each workspace belongs to exactly one project. Each workspace has its own state, variables, run history and settings. Teams belong to the organization and receive access at the organization, project or workspace level. If a question asks how to give a team access to all current and future workspaces for an application with one setting, the answer is project-level team access."
  ],
  "analogy": "Projects work like floors in an office building with keycard access. Instead of programming every badge for every individual office door, security grants the payments team access to the third floor, and any new office built on that floor is automatically covered. Each office is on exactly one floor. The analogy has a limit: in HCP Terraform a team can also be granted access to a single workspace on another floor, like a visitor pass for one room.",
  "terms": [
   [
    "Project",
    "An HCP Terraform container that groups related workspaces for organization, access control and shared configuration."
   ],
   [
    "Default project",
    "The project new workspaces are placed in when no other project is specified."
   ],
   [
    "Project-level team access",
    "Permissions granted to a team on a project that apply to all its current and future workspaces."
   ],
   [
    "Organization",
    "The top-level HCP Terraform container that holds projects, workspaces, teams and settings."
   ],
   [
    "TF_CLOUD_PROJECT",
    "An environment variable that sets the project in which the cloud block creates new workspaces."
   ]
  ],
  "example": "A company creates a payments project and grants the payments team admin access to it. The team can now create and manage its own workspaces for new services, and a payments-specific variable set and policy set apply automatically, while the marketing team cannot see any of it. When a contractor's engagement ends, removing their team from the project removes access to every payments workspace in one step.",
  "mistakes": [
   [
    "Believing a workspace can belong to several projects at once.",
    "Each workspace belongs to exactly one project, though you can move it to another project."
   ],
   [
    "Thinking project-level access only covers workspaces that existed when access was granted.",
    "It applies to every workspace in the project, including ones created later."
   ],
   [
    "Assuming project admins have organization-wide powers.",
    "Project admin rights are limited to that project; organization-level settings stay with organization owners or teams granted those permissions."
   ],
   [
    "Confusing projects with workspaces as the place state lives.",
    "State, variables and runs live in workspaces. Projects group workspaces and carry shared access, variable sets and policy sets."
   ]
  ],
  "tryit": [
   [
    "A retail company has a checkout team that launches two or three new services a month, each needing dev and prod workspaces. The platform team wants checkout engineers to create those workspaces themselves but not touch any other team's infrastructure. What should the platform team set up?",
    "Create a checkout project and grant the checkout team admin access on that project. They can create and manage workspaces inside it, and access applies automatically to every new workspace, while they have no rights elsewhere in the organization."
   ],
   [
    "An engineer runs `terraform init` with a cloud block that maps to a new workspace by name, and the workspace appears in the default project instead of the team's analytics project. Nothing else is configured. How can they make future workspaces land in the right project?",
    "Set the `project` argument in the cloud block, or the `TF_CLOUD_PROJECT` environment variable, to the analytics project. The existing workspace can be moved to that project in the settings."
   ]
  ],
  "tip": "Hierarchy: organization contains projects, projects contain workspaces; each workspace is in exactly one project, and project-level team access covers all its current and future workspaces.",
  "check": [
   [
    "How many projects can a workspace belong to?",
    "Exactly one."
   ],
   [
    "What is the advantage of granting a team access at the project level?",
    "The permission automatically covers every workspace in the project, including ones created later."
   ],
   [
    "Besides team access, name two things that can be scoped to a project.",
    "Variable sets and policy sets."
   ]
  ]
 },
 {
  "t": "Variables and variable sets; Terraform vs environment variables; sensitive variables",
  "hook": "The first remote run of the new analytics stack at Fernhill Utilities fails with an error saying the provider has no valid credentials. Darnell is sure he entered the cloud access key into the workspace an hour ago, and he can see it listed right there. Then the security lead walks over with a different concern: the same access key is pasted separately into forty workspaces, and it has to be rotated by Friday. And a third question arrives in chat from an administrator who wants to read back a token someone saved last month, but the value field is blank. What category was Darnell's key saved under, how do you rotate one key for forty workspaces, and why can nobody see the token?",
  "simple": "When Terraform runs on HCP Terraform's computers instead of your laptop, it needs its settings and secrets stored on HCP Terraform. There are two kinds. A Terraform variable fills in a blank that your code asks for, such as how many servers to build. An environment variable is a setting placed in the computer's background, which is where cloud tools look for passwords. Any value can be marked sensitive, which means once saved, nobody can read it again, only replace it. A variable set is a bundle of values you share with many workspaces at once, so you change it in one place. It is like a family password manager entry shared with everyone, instead of sticky notes on every fridge.",
  "body": [
   "HCP Terraform runs happen on remote workers, so the values your configuration needs, both input variables and credentials, must be stored in HCP Terraform rather than on your laptop. You define them in each workspace's Variables page, or share them across many workspaces with variable sets. Getting the category, the sensitivity and the scope right is what this topic is about.",
   "Each variable has a category, and choosing it correctly matters. A Terraform variable sets an input variable declared in your configuration, exactly as a line in a `.tfvars` file would. Its key must match the name in the `variable` block, such as `instance_count`. You can tick the HCL option so the value is parsed as HashiCorp Configuration Language (HCL), letting you supply a list, map or object rather than a plain string. An environment variable, by contrast, is exported into the shell of the run before Terraform starts. That is how you pass provider credentials such as cloud access keys, which providers read from the environment; Terraform settings such as `TF_LOG`; and input values in the form `TF_VAR_name`. Picking the wrong category is a classic mistake: a provider credential saved as a Terraform variable is never seen by the provider, and the run fails with a credentials error, which is exactly what happened to Darnell.",
   "Any variable can be marked sensitive. Sensitive variables are write-only in HCP Terraform: once saved, nobody can read the value back through the user interface or the application programming interface (API), not even organization owners. You can only overwrite or delete them. During runs they are still delivered to Terraform, and Terraform redacts them in plan and apply output where it knows they are sensitive. This is the right place for secrets such as tokens and keys. Remember the limits, though. Marking a workspace variable sensitive protects how it is stored and displayed in HCP Terraform, but if your configuration writes the value into a resource attribute, it can still end up in state, so state access must also be controlled.",
   "Variable sets are reusable groups of variables. You create a set once, for example the credentials for a sandbox cloud account, and apply it to specific workspaces, to entire projects, or globally to every workspace in the organization. Updating the set updates every workspace that uses it on their next run, which makes credential rotation a single edit rather than forty. Variable sets can contain both categories and can include sensitive values. Their scope is also a governance tool: an administrator can maintain the set while workspace users simply benefit from it.",
   "When the same key is defined in more than one place, precedence rules decide which value wins. Workspace-specific variables override values from ordinary variable sets. Among variable sets, a set applied directly to a workspace beats a project-scoped set, which beats a global set. Values from `*.auto.tfvars` files in the configuration also participate, and workspace variables override them. The exception is a variable set marked as priority: its values override workspace variables and even values supplied for a single run, which lets administrators enforce settings that workspace users cannot override. When an exam question asks which value wins, check for a priority set first, then a workspace-specific value, then sets from narrowest to broadest scope, then files in the configuration.",
   "```text\nCategory      Key                      Value        Sensitive\nterraform     instance_count           3            no\nterraform     allowed_cidrs (HCL)      [\"10.0.0.0/16\"] no\nenv           AWS_ACCESS_KEY_ID        ****         yes\nenv           AWS_SECRET_ACCESS_KEY    ****         yes\nenv           TF_LOG                   INFO         no\n```",
   "Environment variables in HCP Terraform also switch on platform features. Dynamic provider credentials are enabled with environment variables beginning with `TFC_`, which tell the run to obtain short-lived credentials instead of using stored keys, and `TF_CLI_ARGS` or command-specific variants such as `TF_CLI_ARGS_plan` add flags to the commands in remote runs. If you remember that environment variables configure the run environment while Terraform variables feed your code, you can sort almost any scenario into the right category.",
   "To summarize the exam points: provider credentials belong in the environment category; input variables declared in code belong in the Terraform category, with HCL ticked for complex types; sensitive means write-only, not invisible to state; variable sets share values across workspaces, projects or the whole organization; and priority sets override everything else."
  ],
  "analogy": "Think of cooking from a recipe in a shared kitchen. Terraform variables are the amounts written into the recipe card's blanks, such as two cups of rice. Environment variables are the kitchen's conditions, like the oven temperature and the key to the pantry, which the appliances read directly. A sensitive variable is a sealed envelope you can replace but never reopen. A variable set is the house pantry stocked for every cook. The analogy stops at precedence: a priority set is a house rule no recipe can override.",
  "terms": [
   [
    "Terraform variable (category)",
    "A workspace variable that sets a Terraform input variable declared in the configuration, optionally parsed as HCL."
   ],
   [
    "Environment variable (category)",
    "A workspace variable exported into the run's shell, used for provider credentials, Terraform settings and TF_VAR_ values."
   ],
   [
    "Sensitive variable",
    "A write-only variable whose value cannot be viewed after saving but is still available to runs."
   ],
   [
    "Variable set",
    "A reusable group of variables applied to selected workspaces, whole projects or the entire organization."
   ],
   [
    "Priority variable set",
    "A variable set whose values override workspace variables and run-specific values."
   ]
  ],
  "example": "A team stores its cloud provider access key ID and secret as sensitive environment variables in a variable set scoped to its project. When the keys are rotated, one edit updates every workspace in the project, and nobody can read the old or new secret back from the UI. Each workspace still sets its own `instance_count` as a Terraform variable, so dev runs one instance and prod runs three from the same code.",
  "mistakes": [
   [
    "Saving cloud credentials as Terraform variables.",
    "Providers read credentials from the environment, so they must be environment variables. A Terraform variable only works if the code declares and uses it."
   ],
   [
    "Believing an organization owner can reveal a sensitive variable.",
    "Sensitive variables are write-only for everyone. You can replace or delete them but not view them."
   ],
   [
    "Assuming a variable set always beats a workspace variable.",
    "Ordinary variable sets lose to workspace-specific variables. Only a priority variable set overrides workspace values."
   ],
   [
    "Thinking sensitive variables can never appear in state.",
    "If the configuration writes the value into a resource attribute, it can be stored in state, so state access still needs protection."
   ]
  ],
  "tryit": [
   [
    "A security team wants to guarantee that every workspace in the organization uses a specific `TF_LOG` level and a mandatory tagging value, and workspace owners must not be able to change them. Ordinary variable sets keep getting overridden by workspace variables. What should they use?",
    "A priority variable set applied globally or to the relevant projects. Priority sets override workspace variables and run-specific values, which ordinary sets cannot do."
   ],
   [
    "A developer adds a workspace variable named `subnets` with the value `[\"a\",\"b\"]`, but the plan fails because the variable is declared as `list(string)` and receives a string. What setting should they change?",
    "Tick the HCL option on that Terraform variable so the value is parsed as an HCL list instead of a plain string."
   ]
  ],
  "tip": "Provider credentials go in environment variables, not Terraform variables. Sensitive variables are write-only. Workspace variables beat ordinary variable sets; priority variable sets beat workspace values.",
  "check": [
   [
    "Which variable category should hold cloud provider credentials?",
    "Environment variable, because providers read credentials from the run environment."
   ],
   [
    "Can an organization owner read the value of a sensitive variable after it is saved?",
    "No. Sensitive variables are write-only; they can be replaced but not viewed."
   ],
   [
    "What does a variable set let you do?",
    "Define variables once and apply them to many workspaces, whole projects or the entire organization."
   ],
   [
    "A workspace variable and an ordinary project-scoped variable set define the same key. Which value is used?",
    "The workspace variable, unless the variable set is marked as priority."
   ]
  ]
 },
 {
  "t": "Collaboration and governance: teams and permissions, run approvals, policy as code (Sentinel and OPA), private registry",
  "hook": "At Westbrook Health, a pull request just merged that would have created a storage bucket open to the public internet, holding patient appointment exports. The plan looked fine to a tired reviewer at the end of a long day. Fortunately the run stopped after the plan with a message saying a policy had failed, and the apply never happened. The next morning the chief information security officer asks you to explain exactly what stopped it, who could have overridden it, who is even allowed to apply in production, and how the team can stop people copying insecure bucket code from old projects. Four questions, four features. Can you connect each one?",
  "simple": "When many people share one system for building infrastructure, you need rules about who can do what and automatic checks that catch mistakes. HCP Terraform offers four helpers. Teams and permissions decide who can only look, who can preview changes and who can actually make them. Run approvals mean a person must say yes before changes go live. Policy as code is a set of written rules a computer checks automatically after the preview, such as no public storage. The private registry is a company-only shelf of approved, reusable building blocks. It is like a school science lab: some students may only watch, the teacher signs off experiments, safety rules are checked every time, and approved kits sit on the shelf.",
  "body": [
   "HCP Terraform's value for larger organizations comes from controlling who can do what and enforcing standards automatically. The exam covers four areas here: teams and permissions, run approvals, policy as code, and the private registry. Each answers a different question. Permissions answer who may act; approvals answer whether a human must confirm; policies answer whether a change is allowed at all; and the registry answers what good building blocks look like.",
   "Teams are groups of users within an organization. Every organization has a built-in owners team with full control, including billing, settings and all workspaces, so membership should be kept small. Other teams receive permissions at three levels: at the organization level, such as the ability to manage policies, workspaces, projects or VCS settings; at the project level, covering every workspace in a project; or on individual workspaces. Built-in workspace permission levels include read (view state versions, runs and variables without sensitive values), plan (queue plans as well), write (apply runs and edit variables too) and admin (manage settings and team access). Custom permissions allow finer combinations, such as allowing plans and applies but not variable changes. Teams can also have team API tokens for automation. Following least privilege, most engineers get read or plan on production, and only a small group or a pipeline identity can apply.",
   "Run approvals control whether an apply happens automatically. By default, after a successful plan a workspace waits for a user with apply permission to review the plan and click Confirm and Apply, giving a human checkpoint. Enabling auto-apply skips that wait, which suits development workspaces, or VCS workflows where approval already happened in the pull request review. Runs that should not proceed can be discarded at the confirmation stage, runs in progress can be cancelled, and users can leave comments on runs to record reasons for approval or rejection, which become part of the audit trail.",
   "Policy as code checks runs against organizational rules before anything is applied. HCP Terraform supports two frameworks: Sentinel, HashiCorp's own policy language, and Open Policy Agent (OPA), an open-source engine whose policies are written in the Rego language. Policies are grouped into policy sets, usually stored in a VCS repository, and a policy set can apply to the whole organization or to selected projects and workspaces. Policy checks run after the plan and before the apply, so a policy can inspect the planned changes, along with configuration and state data, to require tags, forbid public buckets, restrict regions or limit instance sizes. Enforcement levels decide what happens when a policy fails. Sentinel has three: advisory, which only warns and lets the run continue; soft-mandatory, which stops the run unless a user with permission to override policies chooses to continue; and hard-mandatory, which cannot be overridden at all and requires the code to be fixed. OPA policies use two levels: advisory and mandatory.",
   "```text\nPlan: 3 to add, 0 to change, 0 to destroy.\nPolicy check: require-cost-center-tag (soft-mandatory) FAILED\n  -> an authorized user may override to continue\n```",
   "Reading that excerpt the way the exam expects: the plan succeeded, the policy evaluated the planned resources, and because the failing policy is soft-mandatory, the run is paused rather than permanently blocked. If the same policy were hard-mandatory, no override button would exist. If it were advisory, the run would continue to the apply stage with a warning in the log.",
   "The private registry lets an organization publish its own modules and providers for internal use only. Modules are typically published from VCS repositories whose names follow the registry naming convention, with semantic version tags such as `v1.4.0` creating new versions. Consumers call them with a source like `app.terraform.io/ORG/NAME/PROVIDER` and a `version` constraint, just as they would with the public registry, and the registry shows documentation, inputs and outputs automatically. A private registry encourages teams to reuse approved, reviewed building blocks, such as a storage module that is private by default, rather than copying old code. Some tiers also offer no-code provisioning, which lets users deploy approved modules from the interface without writing Terraform.",
   "Together, these features turn Terraform from a tool individuals run into a governed platform. The registry supplies good patterns, policy blocks bad ones, approvals keep a human in the loop, and permissions keep each team in its lane. In the Westbrook story, a Sentinel or OPA policy stopped the public bucket after the plan; whether anyone could override it depended on its enforcement level; apply rights in production were limited by team permissions; and a private registry module that is secure by default would stop the insecure pattern from spreading."
  ],
  "analogy": "Picture an airport. Team permissions are the badges deciding who may enter the terminal, the gate area or the cockpit. Run approvals are the captain's final check before pushback. Policies are security screening that every bag passes after check-in: some alarms only warn (advisory), some a supervisor can clear (soft-mandatory), and some stop the bag no matter who asks (hard-mandatory). The private registry is the airline's approved catering supplier. The analogy stops at timing: policy checks happen after the plan, not at the start.",
  "mnemonic": "Sentinel levels from gentlest to strictest: A-S-H, Advisory, Soft-mandatory, Hard-mandatory. Advisory warns, soft can be overridden, hard cannot.",
  "terms": [
   [
    "Owners team",
    "The built-in team with full administrative control of an HCP Terraform organization."
   ],
   [
    "Workspace permission levels",
    "Built-in levels of read, plan, write and admin, plus custom permissions for finer combinations."
   ],
   [
    "Sentinel",
    "HashiCorp's policy-as-code framework with advisory, soft-mandatory and hard-mandatory enforcement levels."
   ],
   [
    "OPA (Open Policy Agent)",
    "An open-source policy engine using the Rego language, supported in HCP Terraform with advisory and mandatory levels."
   ],
   [
    "Policy set",
    "A group of policies applied to the whole organization or to selected projects and workspaces."
   ],
   [
    "Private registry",
    "An organization-only registry for sharing approved, versioned modules and providers."
   ]
  ],
  "example": "A company requires every resource to carry a cost-center tag. A Sentinel policy set applied to all workspaces checks planned resources for the tag at soft-mandatory level, so runs missing it stop after the plan until a team lead either fixes the code or overrides with a documented reason. A separate hard-mandatory policy forbids public storage buckets outright, and the platform team publishes a private-by-default bucket module to the private registry so teams never need to write bucket code from scratch.",
  "mistakes": [
   [
    "Thinking policy checks run before the plan.",
    "They run after the plan and before the apply, because they evaluate the planned changes."
   ],
   [
    "Believing an organization owner can override a hard-mandatory Sentinel failure.",
    "Hard-mandatory cannot be overridden by anyone. Only soft-mandatory allows an authorized override."
   ],
   [
    "Assuming OPA policies have the same three levels as Sentinel.",
    "OPA policies in HCP Terraform are advisory or mandatory."
   ],
   [
    "Giving every engineer write access to production for convenience.",
    "Least privilege means most users get read or plan on production, with apply rights limited to a small group or a pipeline identity."
   ]
  ],
  "tryit": [
   [
    "A finance team wants new resources to be blocked when they lack a budget tag, but during quarter-end emergencies a manager must be able to let a run through with a recorded reason. Engineers must not be able to bypass it themselves. Which Sentinel enforcement level fits, and why?",
    "Soft-mandatory. It stops failing runs, but users with permission to override policies, such as the manager, can allow the run to continue. Hard-mandatory would block even emergencies, and advisory would never stop anything."
   ],
   [
    "Several teams keep copying an old network module from a wiki page, each with slightly different security settings. The platform team wants one reviewed, versioned module that every team consumes with a version constraint. What HCP Terraform feature should they use?",
    "The private registry. Publish the module from a VCS repository with version tags, and teams call it with a source of the form `app.terraform.io/ORG/NAME/PROVIDER` and a `version` constraint."
   ]
  ],
  "tip": "Policy checks run after plan and before apply. Sentinel levels: advisory warns, soft-mandatory can be overridden by authorized users, hard-mandatory cannot. OPA uses advisory and mandatory.",
  "check": [
   [
    "When in a run are policy checks evaluated?",
    "After the plan and before the apply, so they can inspect the planned changes."
   ],
   [
    "Which Sentinel enforcement level allows an authorized user to override a failure?",
    "Soft-mandatory."
   ],
   [
    "What does the private registry provide?",
    "A place to publish and version the organization's own modules and providers for internal reuse."
   ],
   [
    "Which workspace permission level allows queuing plans but not applying them?",
    "Plan."
   ]
  ]
 },
 {
  "t": "Health assessments: drift detection and continuous validation",
  "hook": "Nobody has touched the `dns-prod` workspace at Orchard Lane Schools for seven weeks. It just works, so nobody looks. Then on a Monday morning parents start reporting a browser warning on the enrollment site: the certificate expired over the weekend. While investigating, Kenji also discovers that someone changed a firewall rule in the cloud console during a late-night fix a month ago, and Terraform's state still describes the old rule. The fix itself takes ten minutes. The uncomfortable question from the principal takes longer: how could the team have learned about both problems before users did, without someone remembering to run Terraform every day? What HCP Terraform feature watches the workspace while nobody is running it?",
  "simple": "Terraform only notices problems when someone runs it. If nobody runs it for weeks, things can quietly go wrong. Someone may change a setting by hand (this mismatch is called drift), or a condition you care about, such as a security certificate staying valid, may stop being true. Health assessments are automatic check-ups that HCP Terraform runs on a schedule. They compare the real world with Terraform's notes and re-check the rules written into your code, then raise a flag if something is off. They never fix anything themselves; they tell you, so you can decide. It is like a smoke detector: it does not put out fires, but it warns you early, even when nobody is in the room.",
  "body": [
   "Terraform only notices problems when someone runs it. If a workspace is not touched for weeks, two kinds of trouble can go unseen: drift, where real infrastructure no longer matches what Terraform last recorded, and failing conditions, where something the configuration asserts is no longer true. HCP Terraform's health assessments address both by checking workspaces automatically on a schedule and reporting problems, without anyone starting a run. Health assessments are a paid-tier feature and must be enabled, either for the whole organization or for individual workspaces.",
   "The first half is drift detection. During each assessment, HCP Terraform performs a refresh-only plan against the workspace's real infrastructure and compares the result with the stored state. A refresh-only plan asks the providers to read the current attributes of every managed resource, then reports how those differ from state, without proposing changes from the configuration. If resources were modified or deleted outside Terraform, for example a firewall rule edited in the cloud console or an instance resized by hand, the workspace is flagged as drifted. The interface lists which resources drifted and which attributes differ, showing the recorded value next to the real one. In effect, it is an automatic `terraform plan -refresh-only` running for you in the background.",
   "Detection does not fix anything. Once drift is reported, you decide how to respond, exactly as you would locally. If the outside change was a mistake, start a normal run so Terraform puts the infrastructure back to match the configuration. If the change should be kept, update the configuration to describe it, and possibly run a refresh-only apply so state records the new reality, then plan to confirm there are no further differences. Health assessments never modify state or infrastructure on their own; that design keeps a human or a reviewed run in control of every change.",
   "The second half is continuous validation. Your configuration may contain custom conditions: `check` blocks with `assert` statements, and `precondition` and `postcondition` blocks inside resources, data sources and outputs. Normally these are evaluated only during plans and applies. Continuous validation re-evaluates them during each health assessment, so a condition that becomes false later is reported in the workspace's health status even though nobody has run Terraform. Typical examples include a certificate approaching its expiry date, an endpoint no longer returning a successful status code, or an image no longer available.",
   "```hcl\ncheck \"site_up\" {\n  data \"http\" \"home\" {\n    url = \"<site-address>/health\"\n  }\n  assert {\n    condition     = data.http.home.status_code == 200\n    error_message = \"The site health endpoint did not return 200.\"\n  }\n}\n```",
   "That `check` block shows why continuous validation is useful. During a normal run, a failed `check` assertion produces a warning rather than stopping the run. During health assessments, the same assertion is re-evaluated on schedule, so when the health endpoint starts failing, the workspace shows a failed check and a notification can alert the team, weeks after the last apply. Preconditions and postconditions behave the same way in assessments: they are re-checked and reported, not used to block anything, because there is no run to block.",
   "Health assessment results appear on each workspace's Health page and in organization-wide views that show which workspaces are drifted or have failing checks, which helps platform teams spot trouble across hundreds of workspaces. Combined with notification configurations, they can alert teams through email, chat tools or webhooks when a workspace's health status changes. A few practical requirements apply: the workspace must be able to run plans, which means valid credentials and reachable infrastructure; assessments are skipped while other runs are in progress; and a workspace generally needs a successful apply before it has state worth assessing.",
   "It helps to compare health assessments with what you would do without them. Locally, you could schedule a job that runs `terraform plan -refresh-only` every night and emails the output, but you would need to manage credentials for that job, parse the results, and build your own dashboard across many configurations. Health assessments provide the same idea as a managed feature, using the workspace's existing variables and credentials, with results recorded where the team already looks. That convenience is the reason the feature exists, not any new kind of check Terraform could not perform itself.",
   "The main exam points are compact. Health assessments are scheduled and automatic. Drift detection is based on refresh-only plans that compare real infrastructure with state. Continuous validation re-runs `check` blocks and preconditions and postconditions between runs. Neither changes infrastructure or state; they inform you so that you can act through a normal run or a configuration change."
  ],
  "analogy": "Health assessments are like a building's scheduled inspection by a facilities officer who walks the halls every few days with the floor plan (state) in hand. If a wall was moved without paperwork, they note the drift; if a fire door that must stay closed is propped open, they note the failed check. They write a report and alert the manager, but they never move walls or close doors themselves. The analogy stops at frequency: HCP Terraform decides the schedule, not you.",
  "terms": [
   [
    "Health assessment",
    "An automatic, scheduled HCP Terraform check of a workspace for drift and failing conditions."
   ],
   [
    "Drift detection",
    "The part of health assessments that uses refresh-only plans to find changes made outside Terraform."
   ],
   [
    "Continuous validation",
    "The part of health assessments that re-evaluates check blocks and preconditions and postconditions between runs."
   ],
   [
    "Refresh-only plan",
    "A plan that reads current real-world attributes and reports differences from state without proposing configuration changes."
   ],
   [
    "Drifted workspace",
    "A workspace whose real infrastructure no longer matches its stored state."
   ]
  ],
  "example": "A check block asserts that the company's public TLS certificate has more than 30 days of validity. Weeks after the last run, continuous validation marks the workspace as failing, a notification is sent to the team chat, and the team renews the certificate before users see an error. The same assessment flags a security group rule changed in the console, and the team starts a normal run to restore the reviewed configuration.",
  "mistakes": [
   [
    "Believing health assessments automatically revert drift.",
    "They only detect and report. You fix drift with a normal run or by updating the configuration."
   ],
   [
    "Thinking drift detection runs a full normal plan and apply.",
    "It uses a refresh-only plan that compares real infrastructure with state, and nothing is applied."
   ],
   [
    "Assuming continuous validation checks every variable validation rule.",
    "It re-evaluates check block assertions and preconditions and postconditions, the custom conditions that describe infrastructure."
   ],
   [
    "Expecting assessments to run while a workspace is mid-run or has invalid credentials.",
    "Assessments need the workspace to be able to plan and are skipped while other runs are in progress."
   ]
  ],
  "tryit": [
   [
    "A health assessment flags that an engineer increased a database's storage in the console during an incident, and the team agrees the larger size should stay. If they simply start a normal run, Terraform would shrink it back. What should they do?",
    "Update the configuration to the larger size, then run a plan to confirm there are no remaining differences, applying if needed so state matches. A refresh-only apply can also record the new value in state, but the configuration must change or the next normal run will revert it."
   ],
   [
    "A team wants to be told if their public API stops returning a successful response, even during weeks when nobody runs Terraform. They already use HCP Terraform with health assessments enabled. What should they add to the configuration?",
    "A `check` block with an `assert` on the endpoint's response status. Continuous validation re-evaluates it on schedule and reports failures, and a notification configuration can alert the team."
   ]
  ],
  "tip": "Health assessments only detect and report; they never change infrastructure or state. Drift detection equals a scheduled refresh-only plan; continuous validation re-checks check blocks and pre and postconditions.",
  "check": [
   [
    "What kind of plan does drift detection use?",
    "A refresh-only plan that compares real infrastructure with the stored state."
   ],
   [
    "Which configuration constructs does continuous validation re-evaluate?",
    "check block assertions and precondition and postcondition blocks."
   ],
   [
    "Does a health assessment change your infrastructure when it finds drift?",
    "No. It reports the drift; you decide whether to run a normal apply or update the configuration."
   ]
  ]
 },
 {
  "t": "Integrations: VCS providers, run triggers, run tasks, notifications, dynamic provider credentials",
  "hook": "The architecture review at Redcliff Transit has a list of five complaints on the whiteboard. The app team keeps forgetting to re-plan after the network team changes subnets. Security wants a vulnerability scanner to check every plan before it can be applied. On-call engineers miss runs waiting for approval because nobody looks at the HCP Terraform page. The cloud access keys stored in workspaces have not been rotated in a year. And a new team asks how to connect their GitLab repository. Your lead turns to you and says each of these has a matching HCP Terraform integration. Can you pair every complaint with the right feature before the meeting ends?",
  "simple": "HCP Terraform can connect to other tools in five main ways. A code storage connection (like GitHub) lets it start work when code changes. Run triggers chain workspaces together, so when one finishes building, the next one automatically starts a preview. Run tasks send the plan to outside checkers, such as a security scanner, and can stop the run if the checker says no. Notifications send messages by email, chat or to another system when something happens. Dynamic provider credentials give each run a fresh, short-lived pass to the cloud instead of a permanent password. It is like a hotel issuing a room key that stops working at checkout, rather than handing out a master key that never expires.",
  "body": [
   "HCP Terraform connects to the rest of your toolchain in several ways, and each integration solves a different problem. The exam expects you to match the feature to the scenario, so for each one keep two things in mind: what event or need it responds to, and what it does in return.",
   "VCS providers connect an organization to a version control system (VCS) such as GitHub, GitLab, Bitbucket or Azure DevOps. An administrator sets up the connection once, typically using an OAuth application or, for GitHub, the GitHub App, and workspaces can then select repositories from that provider. Once connected, workspaces can use the VCS-driven workflow: commits to a tracked branch start runs, pull requests receive speculative plans shown as status checks, and the private registry can publish modules straight from tagged repositories. The VCS connection is the foundation for most GitOps-style use of HCP Terraform.",
   "Run triggers link workspaces together. You configure a downstream workspace to watch one or more source workspaces in the same organization. When a source workspace completes a successful apply, HCP Terraform automatically queues a run in the downstream workspace. This suits layered infrastructure: when the network workspace changes subnets, the application workspace that reads its outputs through `tfe_outputs` or `terraform_remote_state` re-plans automatically, so nobody has to remember. The downstream run still follows its own workspace settings, so it may wait for approval if auto-apply is off. Run triggers connect workspaces inside HCP Terraform; they do not call outside services.",
   "Run tasks send run data to external services and wait for their verdict. Examples include security and compliance scanners, cost estimation tools and custom checks your organization builds. A run task can be attached at stages such as pre-plan, post-plan, pre-apply and post-apply. HCP Terraform calls the service, which can download the plan data it needs and then report a result back. Each run task has an enforcement level: advisory, where results are shown but the run continues, or mandatory, where a failure stops the run. Run tasks are how third-party checks join the same gate as Sentinel or Open Policy Agent (OPA) policies, and they are the answer when a scenario mentions sending the plan to an external tool before apply.",
   "Notifications tell people and systems about run events. A workspace can have several notification configurations, each with a destination: email to selected users, Slack, Microsoft Teams, or a generic webhook that another system can consume. You choose which events trigger them, such as when a run is created, when it needs attention because it is waiting for approval or a policy override, when it completes, when it errors, and when health assessments detect drift or failed checks. Notifications are one-way messages; unlike run tasks, they do not influence whether a run proceeds.",
   "Dynamic provider credentials remove long-lived secrets from workspaces. Instead of storing static cloud access keys, HCP Terraform issues a signed workload identity token for each run using OpenID Connect (OIDC). You configure a trust relationship in the target platform, such as an AWS Identity and Access Management (IAM) role, an Azure app registration, a Google Cloud workload identity pool or a Vault role, that accepts tokens from your organization and, if you choose, only from a specific project, workspace or run phase. Workspace environment variables beginning with `TFC_` turn the feature on and name the role to use. During the run, the provider exchanges the token for short-lived credentials valid only for that run, so there is nothing long-lived to leak or rotate.",
   "```text\nTFC_AWS_PROVIDER_AUTH = true\nTFC_AWS_RUN_ROLE_ARN  = arn:aws:iam::111122223333:role/tfc-app-prod\n```",
   "These integrations often work together, and the order of events in a single run shows how. A merged pull request arrives through the VCS connection and starts a run. The run authenticates to the cloud with dynamic credentials, produces a plan, and passes through any post-plan run tasks and policy checks. If it then waits for approval, a needs-attention notification reaches the right people. After a successful apply, run triggers queue runs in downstream workspaces, which repeat the same pattern with their own settings.",
   "Putting it together for Redcliff: connect GitLab as a VCS provider for the new team; add a run trigger on the app workspace with the network workspace as its source; attach the security scanner as a mandatory post-plan run task; create notification configurations that send needs-attention events to the on-call chat channel; and replace stored keys with dynamic provider credentials so rotation stops being a problem. On the exam, the quick mapping is: run triggers chain workspaces, run tasks call external checks that can block, notifications send alerts that cannot block, VCS providers connect repositories, and dynamic credentials replace static secrets."
  ],
  "analogy": "Think of a railway. The VCS connection is the timetable feed that tells the station when a new train is scheduled. Run triggers are connecting services: when train A arrives, train B departs. Run tasks are safety inspectors who can hold a train at the platform. Notifications are the station announcements. Dynamic credentials are single-journey tickets that expire on arrival instead of a lifetime pass. The analogy stops at run triggers: they fire only after a successful apply, not every arrival.",
  "terms": [
   [
    "VCS provider connection",
    "An organization-level link to a version control system that lets workspaces use repositories, speculative plans and registry publishing."
   ],
   [
    "Run trigger",
    "A link that automatically queues a run in a workspace after a source workspace applies successfully."
   ],
   [
    "Run task",
    "An integration that sends run data to an external service at a set stage and can block the run when mandatory."
   ],
   [
    "Notification configuration",
    "A workspace setting that sends run and health events to email, Slack, Microsoft Teams or webhooks."
   ],
   [
    "Dynamic provider credentials",
    "Short-lived cloud credentials obtained per run by exchanging an HCP Terraform OIDC workload identity token."
   ]
  ],
  "example": "A company's app workspace reads VPC IDs from a network workspace. They add a run trigger so the app workspace re-plans whenever the network workspace applies, attach a mandatory post-plan run task that runs a security scanner, send failures and approval requests to a chat channel, and switch both workspaces to dynamic AWS credentials so no access keys are stored.",
  "mistakes": [
   [
    "Using a run task to start a run in another workspace.",
    "Run triggers chain workspaces. Run tasks send data to external services and return a pass or fail."
   ],
   [
    "Expecting a notification to stop a failing run.",
    "Notifications only send messages. To block a run based on an external check, use a mandatory run task or a policy."
   ],
   [
    "Thinking dynamic provider credentials store a cloud key more securely.",
    "They store no long-lived key at all; each run gets short-lived credentials through an OIDC token exchange against a trust relationship."
   ],
   [
    "Assuming run triggers fire after every plan.",
    "They queue a downstream run only after the source workspace completes a successful apply."
   ]
  ],
  "tryit": [
   [
    "Security wants every plan in production workspaces scanned by an external tool, and any high-severity finding must stop the apply. A teammate suggests a webhook notification to the scanner. Will that work, and what should be used instead?",
    "No, notifications cannot block a run. Use a run task attached at the post-plan stage with mandatory enforcement, so a failing result from the scanner stops the run before apply."
   ],
   [
    "An auditor flags that static cloud access keys in fifteen workspaces have never been rotated. The team uses AWS and wants nothing long-lived stored in HCP Terraform. What should they configure?",
    "Dynamic provider credentials: create an IAM role that trusts HCP Terraform's OIDC tokens, limited to their organization and workspaces, then set `TFC_AWS_PROVIDER_AUTH` and `TFC_AWS_RUN_ROLE_ARN` as workspace environment variables and remove the static keys."
   ]
  ],
  "tip": "Match the feature: VCS providers connect repositories, run triggers chain workspaces after a successful apply, run tasks call external checks that can block, notifications send alerts that cannot block, and dynamic provider credentials replace static cloud keys with per-run OIDC credentials.",
  "check": [
   [
    "Which feature starts a run in workspace B after workspace A applies?",
    "A run trigger configured on workspace B with A as its source."
   ],
   [
    "What problem do dynamic provider credentials solve?",
    "They eliminate long-lived static cloud credentials by issuing short-lived credentials per run through OIDC workload identity."
   ],
   [
    "At which stages can run tasks be attached?",
    "Pre-plan, post-plan, pre-apply and post-apply."
   ],
   [
    "Which destinations can notification configurations send to?",
    "Email, Slack, Microsoft Teams and generic webhooks."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
