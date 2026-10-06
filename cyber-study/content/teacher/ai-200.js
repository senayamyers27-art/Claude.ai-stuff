/* Teacher edition for Microsoft Certified: Azure AI Cloud Developer Associate (AI-200 (replaced AZ-204)): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("ai-200", [
 {
  "t": "Dockerfiles for Python apps: base images, multi-stage builds, non-root users, .dockerignore",
  "objectives": [
   "Students will be able to explain how base image choice and instruction order affect image size and rebuild speed.",
   "Students will be able to describe how a multi-stage build keeps build tools and build-time secrets out of the final image.",
   "Students will be able to apply a non-root USER and a .dockerignore file to harden a Python Dockerfile.",
   "Students will be able to diagnose a Dockerfile problem from a symptom such as slow rebuilds, a large image or a leaked file."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a one-stage Dockerfile that runs as root and copies everything. Ask students to list anything that worries them, then collect answers on the whiteboard without judging."
   ],
   [
    12,
    "Teach",
    "Walk through the four habits: pinned slim base, layer order for caching, multi-stage builds, non-root USER, and .dockerignore. Show the lesson's multi-stage example and trace which files end up in the final stage."
   ],
   [
    18,
    "Activity",
    "Run the Dockerfile makeover in pairs (see activity). Circulate and ask each pair to justify one change in terms of size, speed or security."
   ],
   [
    5,
    "Discuss",
    "Pairs share their rewritten Dockerfiles. Compare choices of base image and what went into .dockerignore."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If someone pulled your app's image from a registry today, what could they find inside it that you never meant to ship?",
  "activity": {
   "title": "Dockerfile makeover",
   "materials": "Printed copy of a flawed one-stage Dockerfile and a short folder listing (including .git, .env, tests, __pycache__), pens, whiteboard; optional student laptops with a text editor.",
   "steps": [
    "Give each pair the flawed Dockerfile: FROM python:latest, COPY . . before pip install, no USER, no .dockerignore, and a RUN rm .env line.",
    "Pairs mark every problem and label it as size, speed or security.",
    "Pairs rewrite it as a two-stage build with a pinned slim base, requirements copied first, a non-root user and a port above 1024.",
    "Pairs write a .dockerignore from the folder listing and explain why RUN rm .env did not protect the secret.",
    "Two pairs swap and review each other's version against a short checklist on the whiteboard."
   ]
  },
  "discussion": [
   "When might a full base image with build tools be the right choice despite its size?",
   "Why does deleting a file in a later layer not remove it from an image, and what does that teach us about secrets in builds?"
  ],
  "exit": [
   [
    "Why copy requirements.txt before the rest of the code?",
    "So the dependency layer is cached and only rebuilds when requirements change, not on every code change."
   ],
   [
    "What does a multi-stage build keep out of the final image?",
    "Compilers, build tools, caches and any build-time secrets, because only artifacts copied with COPY --from reach the final stage."
   ],
   [
    "Name two entries that belong in a Python app's .dockerignore and why.",
    "For example .git and .env: .git bloats the build context, and .env could leak credentials into an image layer."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed two-stage Dockerfile with blanks for FROM, COPY --from and USER, and a word bank.",
   "Extend: Ask fast finishers to estimate which layers rebuild after a code-only change in both the original and rewritten files, and to explain how an ACR base image update trigger complements a pinned base tag."
  ]
 },
 {
  "t": "Azure Container Registry: Basic, Standard and Premium tiers; geo-replication and private endpoints on Premium",
  "objectives": [
   "Students will be able to identify the features shared by all ACR tiers and those that are Premium only.",
   "Students will be able to explain how geo-replication serves several regions behind one login server.",
   "Students will be able to describe how a private endpoint and disabled public access restrict registry traffic to a VNet.",
   "Students will be able to choose the least expensive ACR tier that meets a stated requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take three or four answers. Note any assumptions about tiers on the board."
   ],
   [
    12,
    "Teach",
    "Draw a registry in one region serving clusters in two regions. Explain shared features, then add a replica for geo-replication and a private endpoint inside a VNet. Show the az acr create, replication create and update commands."
   ],
   [
    18,
    "Activity",
    "Run the tier-picking card sort in small groups (see activity)."
   ],
   [
    5,
    "Discuss",
    "Groups explain the two hardest cards and the clue words that settled them."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If your app runs in two regions but your registry lives in one, what happens every time the far region scales out?",
  "activity": {
   "title": "Pick the tier",
   "materials": "Printed requirement cards (about twelve), three labeled zones on a table or whiteboard for Basic, Standard and Premium, sticky notes.",
   "steps": [
    "Prepare cards such as 'one registry name, pulls in three regions', 'webhook on push', 'block internet access', 'nightly ACR Task', 'customer-managed key', 'small dev project'.",
    "Groups place each card under the cheapest tier that meets it.",
    "For each Premium card, groups write the exact feature (geo-replication, private endpoint, firewall rules, customer-managed keys) on a sticky note.",
    "For each Basic card, groups explain why no upgrade is needed.",
    "The teacher reveals the answers and groups correct their placements."
   ]
  },
  "discussion": [
   "When would separate registries per region still make sense instead of geo-replication?",
   "How would you explain to a manager why moving from Standard to Premium is worth the cost for a compliance requirement?"
  ],
  "exit": [
   [
    "Name two features available only in the Premium tier.",
    "Any two of geo-replication, private endpoints, selected-network firewall rules and customer-managed keys."
   ],
   [
    "With geo-replication, how many times do you push an image and to what name?",
    "Once, to the single login server; ACR replicates it to every replica region."
   ],
   [
    "A team needs ACR Tasks builds and nothing else. Which tier is the cheapest that works?",
    "Basic, because ACR Tasks is supported in all tiers."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference card listing shared features and Premium-only features for students to use during the card sort.",
   "Extend: Ask fast finishers to sketch the DNS resolution path for myregistry.azurecr.io from inside a VNet with a private endpoint and private DNS zone, and from the internet after public access is disabled."
  ]
 },
 {
  "t": "Build and push images with `az acr build` (quick tasks) and ACR Tasks triggered by commits, base-image updates or schedules",
  "objectives": [
   "Students will be able to explain how az acr build differs from a local docker build and push.",
   "Students will be able to compare commit, base image update and timer triggers for ACR tasks.",
   "Students will be able to select the correct trigger for a described scenario.",
   "Students will be able to read an az acr task create command and identify its context, image tag and trigger settings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for when images should be rebuilt."
   ],
   [
    12,
    "Teach",
    "Contrast a local build-and-push with az acr build. Introduce saved tasks and the three triggers, then annotate the lesson's az acr task create command on the projector."
   ],
   [
    18,
    "Activity",
    "Run the trigger matching relay (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss scenarios where more than one trigger would be useful on the same task."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Your app code has not changed in a month, but its base image just received a security patch. Should your app image change, and who should make that happen?",
  "activity": {
   "title": "Trigger matching relay",
   "materials": "Printed scenario cards (about ten), three labeled boxes or whiteboard columns for Commit, Base image, Timer, plus a fourth for Quick task; projector with an annotated az acr task create command.",
   "steps": [
    "Split the class into teams and place the scenario cards face down.",
    "One student per team draws a card, reads it aloud and places it in a column, then the next student goes.",
    "Teams must underline the clue word on each card, such as 'pushed', 'patched parent image', 'nightly' or 'one-time build'.",
    "After all cards are placed, teams rewrite one scenario so that it fits a different trigger.",
    "Review answers together and correct placements."
   ]
  },
  "discussion": [
   "What risks come with automatic rebuilds on base image updates, and how would a deployment pipeline reduce them?",
   "Why might a team prefer ACR Tasks to running Docker on its own build agents?"
  ],
  "exit": [
   [
    "Which trigger rebuilds an image when its FROM image is patched?",
    "The base image update trigger, which is on by default."
   ],
   [
    "What do you need to give ACR so a commit trigger can watch a GitHub repository?",
    "The repository URL with branch as the context and a personal access token so ACR can read it and register a webhook."
   ],
   [
    "How do you start a one-time cloud build without a local Docker engine?",
    "Run az acr build with the registry, image tag and context path."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page table pairing each trigger with typical clue words and an example command flag.",
   "Extend: Ask fast finishers to outline a multi-step task YAML in plain words that builds an image, runs a test container and pushes only if tests pass."
  ]
 },
 {
  "t": "Tags vs digests, stable vs unique tags, and cleaning up old images with `az acr repository` and purge tasks",
  "objectives": [
   "Students will be able to distinguish tags from digests and stable tags from unique tags.",
   "Students will be able to explain why deployments should reference unique tags or digests.",
   "Students will be able to use az acr repository commands to list, untag and delete images.",
   "Students will be able to design a scheduled acr purge task with sensible filter, age and keep settings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch two replicas pulling 'latest' at different times."
   ],
   [
    12,
    "Teach",
    "Explain tags versus digests with a pointer diagram. Show what happens to a manifest when a stable tag moves. Walk through show-tags, untag, delete and the acr purge task from the lesson."
   ],
   [
    18,
    "Activity",
    "Run the registry timeline exercise (see activity)."
   ],
   [
    5,
    "Discuss",
    "Compare each group's purge settings and discuss what could go wrong with each."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Two servers both run 'myapp:latest'. Are they guaranteed to run the same code? How could you prove it?",
  "activity": {
   "title": "Registry timeline",
   "materials": "Whiteboard, sticky notes in two colors (one for images, one for tags), printed event list.",
   "steps": [
    "Give each group an event list: push build 101 tagged 101 and latest, push build 102 tagged 102 and latest, deploy using latest, scale out, push build 103.",
    "Groups model the registry on the whiteboard, moving tag sticky notes between image sticky notes as each event happens.",
    "Groups identify which replicas run which image and which manifests become untagged.",
    "Groups rewrite the deployment step to use a unique tag and replay the timeline.",
    "Groups write an acr purge command with filter, ago, keep and untagged options and justify each value."
   ]
  },
  "discussion": [
   "What are the trade-offs between deploying by unique tag and by digest?",
   "How many old images should a team keep for rollback, and what drives that number?"
  ],
  "exit": [
   [
    "What is the difference between a tag and a digest?",
    "A tag is a mutable label that can move; a digest is an immutable hash of the manifest that always identifies the same image."
   ],
   [
    "Why should production deployments avoid stable tags such as latest?",
    "Replicas may pull different images over time, causing mixed versions and unclear rollbacks."
   ],
   [
    "Which command and options give scheduled cleanup of old tags and dangling manifests?",
    "acr purge with --filter, --ago, --keep and --untagged, run in an ACR task with a --schedule timer."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-drawn timeline with blanks for students to fill in which tag points where after each event.",
   "Extend: Ask fast finishers to describe how a Premium retention policy for untagged manifests and acr purge would work together, and what each one does not cover."
  ]
 },
 {
  "t": "Pull images without passwords: managed identity with the AcrPull role instead of the admin user",
  "objectives": [
   "Students will be able to explain why the ACR admin user is unsuitable for production image pulls.",
   "Students will be able to configure a managed identity with the AcrPull role for Container Apps, App Service or AKS.",
   "Students will be able to compare system-assigned and user-assigned identities for a new app's first pull.",
   "Students will be able to troubleshoot an unauthorized image pull using identity, role and registry settings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers about shared passwords on the board."
   ],
   [
    12,
    "Teach",
    "Contrast the admin user with managed identity plus AcrPull. Walk through the lesson's commands and the per-service settings, then explain the system-assigned chicken-and-egg problem with a timeline drawing."
   ],
   [
    18,
    "Activity",
    "Run the pull failure troubleshooting role-play (see activity)."
   ],
   [
    5,
    "Discuss",
    "Groups share root causes they found and the order in which they checked things."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If five apps share one registry password and it leaks, how would you know which app was involved, and what would rotating it break?",
  "activity": {
   "title": "Pull failure role-play",
   "materials": "Printed role cards (Developer, Azure Portal, Registry), printed configuration snippets for four broken scenarios, whiteboard.",
   "steps": [
    "In groups of three, one student is the developer and the others hold cards describing the app's identity settings and the registry's role assignments.",
    "The developer may ask one question at a time, such as 'Is an identity attached?' or 'Which roles does principal X hold on the registry?'.",
    "Groups work through scenarios: no identity attached, identity has AcrPush on the wrong registry, system-assigned identity on a brand-new app, role assigned two minutes ago.",
    "For each, the group writes the root cause and the fix on a sticky note.",
    "Groups swap roles between scenarios so everyone plays the developer once."
   ]
  },
  "discussion": [
   "When might a service principal or repository-scoped token still be the right choice for pulling images?",
   "What are the trade-offs of sharing one user-assigned identity across many apps?"
  ],
  "exit": [
   [
    "Which role should an app's identity get to pull images?",
    "AcrPull on the registry, because it is read-only and least privilege."
   ],
   [
    "Why can a system-assigned identity fail on a new app's first image pull?",
    "It does not exist until the app is created, so AcrPull cannot be granted before the first pull attempt."
   ],
   [
    "Name one reason the admin user is a poor production choice.",
    "It is a shared registry-wide credential with full push and pull rights that cannot be scoped or traced to one app."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-step checklist card (identity attached, AcrPull assigned to that principal, registry configured to use it) for students to follow in the role-play.",
   "Extend: Ask fast finishers to describe how the same user-assigned identity could also read Key Vault secrets, and which additional role it would need."
  ]
 },
 {
  "t": "App Service custom containers on Linux: WEBSITES_PORT, continuous deployment and deployment slots",
  "objectives": [
   "Students will be able to configure WEBSITES_PORT and related settings to fix a custom container that fails to start.",
   "Students will be able to compare webhook-based continuous deployment with pipeline-driven image updates.",
   "Students will be able to explain how deployment slots, swaps and sticky settings enable zero-downtime releases.",
   "Students will be able to identify tier requirements and per-slot identity needs for slots."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the 'did not respond to HTTP pings' log excerpt and ask students to guess the cause."
   ],
   [
    12,
    "Teach",
    "Explain the App Service front end and WEBSITES_PORT, then continuous deployment via ACR webhook, then slots, swaps and sticky settings with a two-box diagram."
   ],
   [
    18,
    "Activity",
    "Run the swap simulation (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss which settings each group marked sticky and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your container works on your laptop on port 5000 but restarts endlessly on App Service. What might App Service not know?",
  "activity": {
   "title": "Swap simulation",
   "materials": "Whiteboard divided into Production and Staging boxes, sticky notes in two colors (one for image and code, one for settings), a printed list of app settings.",
   "steps": [
    "Groups place sticky notes for image version, WEBSITES_PORT, database connection string, feature flag and API key in each slot box.",
    "Groups decide which settings must be sticky and mark them with a star.",
    "The teacher announces 'swap'; groups move only the non-sticky notes between boxes.",
    "Groups check whether production now points at the correct database and image.",
    "Groups write the steps to roll back and identify which App Service tier is required."
   ]
  },
  "discussion": [
   "When would you prefer a pipeline that updates a unique tag over webhook continuous deployment on a stable tag?",
   "What could go wrong in production if a connection string is not marked as a slot setting?"
  ],
  "exit": [
   [
    "Which app setting tells App Service the port your custom container listens on?",
    "WEBSITES_PORT."
   ],
   [
    "What makes a setting stay with its slot during a swap?",
    "Marking it as a deployment slot setting (sticky)."
   ],
   [
    "What is the minimum tier for deployment slots?",
    "Standard tier or higher."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the App Service front end forwarding ports 80 and 443 to the container port, with WEBSITES_PORT highlighted.",
   "Extend: Ask fast finishers to design a release that routes a percentage of production traffic to staging before a full swap and to list the metrics they would watch."
  ]
 },
 {
  "t": "Azure Container Apps: environments, ingress (external vs internal), secrets and managed identity",
  "objectives": [
   "Students will be able to explain what a Container Apps environment provides and when to use separate environments.",
   "Students will be able to choose external, internal or no ingress for a given app role.",
   "Students will be able to configure secrets with secretref and Key Vault references and explain their update behavior.",
   "Students will be able to distinguish inbound ingress from outbound managed identity access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch a four-app system on the board."
   ],
   [
    12,
    "Teach",
    "Explain environments, the three ingress states, secrets with secretref and Key Vault references, and managed identity. Annotate the lesson's az containerapp create command."
   ],
   [
    18,
    "Activity",
    "Run the architecture whiteboard exercise (see activity)."
   ],
   [
    5,
    "Discuss",
    "Groups present their designs and defend one ingress choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If every service in an app has a public URL, what extra work does each service now have to do to stay safe?",
  "activity": {
   "title": "Doors and badges",
   "materials": "Whiteboard or large paper per group, markers, printed app role cards (storefront, internal API, queue worker, admin tool, scheduled reporter).",
   "steps": [
    "Each group draws one environment box and places the app role cards inside it.",
    "For each app, groups draw a door type: external, internal or none, and label the target port.",
    "Groups list each app's secrets and decide whether each becomes a secretref, a Key Vault reference or is replaced by managed identity.",
    "Groups draw badge arrows from each app's identity to the services it needs and name the role, such as AcrPull or Key Vault Secrets User.",
    "Groups write the steps required after rotating a password stored as a secret."
   ]
  },
  "discussion": [
   "When would you split apps into separate Container Apps environments even if they talk to each other?",
   "Why is removing connection strings with managed identity often better than storing them as secrets?"
  ],
  "exit": [
   [
    "What do apps in one Container Apps environment share?",
    "A virtual network boundary and a Log Analytics workspace, and they can call each other by name."
   ],
   [
    "Which ingress setting does a queue worker that only pulls messages need?",
    "None; ingress can be disabled because it receives no inbound traffic."
   ],
   [
    "After changing a secret's value, what must you do for running replicas to use it?",
    "Restart the revision or create a new revision, because secret changes do not restart replicas."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision card: 'Called from the internet? external. Called only by other apps? internal. Called by no one? none.'",
   "Extend: Ask fast finishers to explain how an environment with an internal load balancer changes what external ingress means, and when that design fits."
  ]
 },
 {
  "t": "Container Apps revisions: single vs multiple revision mode, traffic splitting and labels",
  "objectives": [
   "Students will be able to distinguish revision-scope from application-scope changes.",
   "Students will be able to compare single and multiple revision modes and choose one for a scenario.",
   "Students will be able to configure traffic weights for blue-green and canary releases.",
   "Students will be able to explain how revision labels provide stable URLs for testing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas for releasing to a small group of users first."
   ],
   [
    12,
    "Teach",
    "Explain revisions and scopes, the two modes, traffic weights and labels. Walk through the lesson's commands, pausing on set-mode, traffic set and label add."
   ],
   [
    18,
    "Activity",
    "Run the release desk simulation (see activity)."
   ],
   [
    5,
    "Discuss",
    "Groups compare their weight tables and explain the trap of new revisions receiving no traffic."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How would you let only one in ten users try a new version of your app, and how would you get them back if it fails?",
  "activity": {
   "title": "Release desk",
   "materials": "Printed change cards (new image, new secret value, changed scale rule, changed ingress port, new environment variable), whiteboard table with columns Revision, Weight, Label.",
   "steps": [
    "Groups sort change cards into 'creates a revision' and 'application-scope' piles.",
    "Groups start with revision v1 at 100 percent in multiple revision mode.",
    "The teacher announces release events: deploy v2, start canary, QA needs a fixed URL, errors rise, promote, retire v1.",
    "After each event, groups update the table with weights and labels and write the CLI command they would run.",
    "Groups identify the point at which v2 would have received no traffic if they forgot to update weights."
   ]
  },
  "discussion": [
   "When is single revision mode the better choice even for an important app?",
   "What metrics would you watch during a canary before raising the weight?"
  ],
  "exit": [
   [
    "Does changing a container app's image create a new revision? Does changing a secret value?",
    "Changing the image does because it is in the template; changing a secret value does not because it is application-scope."
   ],
   [
    "Which revision mode is required for a canary release?",
    "Multiple revision mode, with ingress enabled."
   ],
   [
    "What does a revision label provide?",
    "A stable URL that follows the labeled revision regardless of traffic weights or generated names."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column cheat sheet listing template (revision-scope) settings and application-scope settings.",
   "Extend: Ask fast finishers to design a blue-green release that swaps labels between revisions and to explain how traffic by label weight simplifies automation."
  ]
 },
 {
  "t": "Container Apps scaling: HTTP rules, KEDA event rules (for example Service Bus queue length), min/max replicas and scale to zero",
  "objectives": [
   "Students will be able to explain how minimum and maximum replicas control cost, cold starts and downstream load.",
   "Students will be able to compare HTTP, event-driven and CPU or memory scale rules.",
   "Students will be able to configure an azure-servicebus scale rule and interpret its messageCount target.",
   "Students will be able to explain why CPU and memory rules cannot scale to zero."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about checkout lanes and connect it to replicas."
   ],
   [
    12,
    "Teach",
    "Explain replicas, min and max, HTTP rules, KEDA event rules and the CPU limitation. Annotate the lesson's az containerapp update command."
   ],
   [
    18,
    "Activity",
    "Run the scaling calculator exercise (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss how each group chose a maximum and what downstream limit drove it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A store has one cashier at noon and five at midnight. What signal should the manager have watched instead?",
  "activity": {
   "title": "Scaling calculator",
   "materials": "Printed scenario sheets with queue lengths and request counts at different times, calculators or student laptops, whiteboard.",
   "steps": [
    "Give pairs a worker scenario: azure-servicebus rule with messageCount 20, min 0, max 20, and queue lengths at 02:00, 09:00, 12:05 and 12:30.",
    "Pairs calculate the target replicas at each time, capping at the maximum.",
    "Give an API scenario: HTTP rule with 50 concurrent requests per replica and request counts across a day; pairs calculate replicas.",
    "Pairs change the worker to a CPU rule and explain what happens at 02:00 and why.",
    "Pairs recommend final min and max values for both apps and justify them in one sentence each."
   ]
  },
  "discussion": [
   "When is paying for an always-warm replica worth more than the savings of scale to zero?",
   "Why does idempotent message processing matter more as you scale out?"
  ],
  "exit": [
   [
    "Why can't a CPU scale rule scale an app to zero?",
    "A running replica is needed to measure CPU, so at zero replicas there is no metric to trigger scale-out."
   ],
   [
    "With messageCount 20 and 300 messages queued, about how many replicas will KEDA target if max is 20?",
    "About 15 replicas, since 300 divided by 20 is 15, which is under the maximum."
   ],
   [
    "What is the cost of setting min replicas to 0?",
    "A cold start delay for the first request or message after idle."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked example of the replica calculation and a fill-in table for the remaining times.",
   "Extend: Ask fast finishers to explain how they would authenticate the Service Bus scale rule with a managed identity instead of a connection string secret and why that is preferable."
  ]
 },
 {
  "t": "Container Apps jobs: manual, scheduled and event-driven",
  "objectives": [
   "Students will be able to distinguish run-to-completion jobs from continuously running container apps.",
   "Students will be able to choose Manual, Schedule or Event triggers for a described workload.",
   "Students will be able to write a UTC cron expression for a scheduled job.",
   "Students will be able to explain how exit codes, retries, timeouts and parallelism determine an execution's outcome."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student examples of work that starts and stops."
   ],
   [
    12,
    "Teach",
    "Contrast apps and jobs, explain the three trigger types, UTC cron, and execution settings. Annotate the lesson's az containerapp job create command."
   ],
   [
    18,
    "Activity",
    "Run the job designer card activity (see activity)."
   ],
   [
    5,
    "Discuss",
    "Groups share one tricky workload and how they classified it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name three tasks in an application that should run, finish and stop rather than run forever.",
  "activity": {
   "title": "Job designer",
   "materials": "Printed workload cards (nightly report, schema migration, video render per upload, web API, weekly re-index, chat front end), blank job spec sheets, whiteboard with a UTC offset table.",
   "steps": [
    "Groups first sort cards into 'container app' or 'job'.",
    "For each job card, groups choose Manual, Schedule or Event and write a reason.",
    "For scheduled cards, groups write the cron expression in UTC using the offset table.",
    "Groups fill in replica timeout, retry limit, parallelism and completion count for one job and justify each value.",
    "Groups write two lines of pseudocode showing how the container reports success or failure with an exit code."
   ]
  },
  "discussion": [
   "When would you choose an event-driven job over a container app with a Service Bus scale rule?",
   "What problems can a job cause if its work is not safe to retry?"
  ],
  "exit": [
   [
    "Which trigger type starts executions when messages are waiting in a queue?",
    "The Event trigger, using KEDA scale rules such as azure-servicebus."
   ],
   [
    "In which time zone are scheduled job cron expressions evaluated?",
    "UTC."
   ],
   [
    "How does a job execution report failure?",
    "The container exits with a non-zero exit code, which marks the replica failed and may trigger retries."
   ]
  ],
  "differentiation": [
   "Support: Provide a cron field reference card (minute, hour, day of month, month, day of week) with two worked examples.",
   "Extend: Ask fast finishers to design a batch job that splits work across four parallel replicas and requires all four to succeed, and to explain what happens if one exceeds the replica timeout."
  ]
 },
 {
  "t": "AKS basics for developers: Deployment and Service manifests, `kubectl apply`, requests and limits, ConfigMaps and Secrets, attaching ACR",
  "objectives": [
   "Students will be able to explain the roles of a Deployment and a Service and read a basic manifest.",
   "Students will be able to distinguish resource requests from limits and predict OOMKilled versus throttling.",
   "Students will be able to compare ConfigMaps and Secrets and explain why base64 is not encryption.",
   "Students will be able to troubleshoot ImagePullBackOff using kubectl describe and az aks update --attach-acr."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the output of kubectl get pods with ImagePullBackOff and OOMKilled statuses and ask students to guess causes."
   ],
   [
    12,
    "Teach",
    "Walk through the lesson's manifest line by line: Deployment, labels, Service, envFrom, requests and limits. Then cover ConfigMaps, Secrets, kubectl apply and attach-acr."
   ],
   [
    18,
    "Activity",
    "Run the manifest detective exercise (see activity)."
   ],
   [
    5,
    "Discuss",
    "Pairs share which bug was hardest to find and what command or field revealed it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you tell a system 'keep three copies of my app running' instead of 'start three copies', what should happen when one copy crashes?",
  "activity": {
   "title": "Manifest detective",
   "materials": "Printed manifests with planted bugs and matching printed kubectl describe excerpts, highlighters; optional projector and student laptops with a browser-based YAML viewer.",
   "steps": [
    "Give pairs four broken manifest and event pairs: selector does not match template labels, Service targetPort does not match containerPort, memory limit far below real usage, and a cluster without ACR attached.",
    "Pairs highlight the line or field that causes each problem.",
    "Pairs match each bug to the symptom in the event excerpt, such as no pods selected, connection refused, OOMKilled or unauthorized pull.",
    "Pairs write the fix, either a corrected YAML line or the az or kubectl command to run.",
    "Pairs rewrite a password currently in a ConfigMap into a Secret and note how they would restrict access to it."
   ]
  },
  "discussion": [
   "When would a team choose AKS over Azure Container Apps, given the extra responsibility?",
   "What are the risks of setting no requests and limits on containers in a shared cluster?"
  ],
  "exit": [
   [
    "What does a Service add on top of a Deployment?",
    "A stable IP and DNS name that load-balances to the Deployment's pods by label."
   ],
   [
    "A container exceeds its memory limit. What happens? And if it exceeds its CPU limit?",
    "Memory: it is OOMKilled and restarted. CPU: it is throttled."
   ],
   [
    "Which command lets AKS nodes pull from ACR without passwords?",
    "az aks update --attach-acr, which grants AcrPull to the kubelet identity."
   ]
  ],
  "differentiation": [
   "Support: Provide an annotated copy of the lesson's manifest with each field labeled in plain language for reference during the activity.",
   "Extend: Ask fast finishers to describe how the Key Vault provider for the Secrets Store CSI Driver would replace the Kubernetes Secret and which identity would need access to Key Vault."
  ]
 },
 {
  "t": "Cosmos DB for NoSQL with the Python SDK (azure-cosmos): CosmosClient, create/upsert/read/delete items, parameterized queries",
  "objectives": [
   "Students will be able to explain the account, database, container and item hierarchy and why id plus partition key identifies an item.",
   "Students will be able to compare create_item, replace_item, upsert_item, patch_item and read_item, including the status codes each can return.",
   "Students will be able to rewrite a string-built query as a parameterized query_items call with a partition key.",
   "Students will be able to justify creating a single CosmosClient authenticated with DefaultAzureCredential."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about duplicate queue messages. Collect two or three answers on the whiteboard without correcting yet."
   ],
   [
    12,
    "Teach",
    "Draw the account, database, container, item hierarchy. Walk through the SDK code on the projector line by line, pausing at create_item and upsert_item to ask what happens on a duplicate. Explain point reads and why they cost about 1 RU."
   ],
   [
    18,
    "Activity",
    "Run the method-matching card sort in pairs, then have each pair fix the broken code snippet."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect idempotency, security and cost."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or sticky notes."
   ]
  ],
  "warmup": "A queue sometimes delivers the same order message twice. Your code inserts each order into a database. What could go wrong, and how would you want the database call to behave?",
  "activity": {
   "title": "Pick the right call, then fix the code",
   "materials": "Printed scenario cards (one scenario per card), printed method cards (create_item, replace_item, upsert_item, patch_item, read_item, delete_item, query_items), a printed buggy code snippet, whiteboard.",
   "steps": [
    "Give each pair the method cards and eight scenario cards, such as 'insert a new order and fail if it already exists' or 'set status to shipped without resending the document'.",
    "Pairs match each scenario to one method and write the HTTP status code they would expect on failure (409, 404 or none).",
    "Hand out the buggy snippet: a CosmosClient created inside a request function, a query built with an f-string from user input, and read_item called with only the id.",
    "Pairs annotate three fixes directly on the printout: move the client to startup, convert to @parameters with partition_key, and add the partition key to read_item.",
    "Two pairs present their fixes; the class agrees on a final version written on the whiteboard."
   ]
  },
  "discussion": [
   "Why is idempotency so important when a message system guarantees at-least-once delivery?",
   "When would patch_item be safer than upsert_item if two services update the same document?",
   "What trade-offs come with using account keys instead of Microsoft Entra ID for the client?"
  ],
  "exit": [
   [
    "Which method inserts or replaces an item without failing on duplicates?",
    "upsert_item."
   ],
   [
    "What two values does read_item require?",
    "The item id and its partition key value."
   ],
   [
    "Name one benefit of parameterized queries.",
    "They prevent injection (and let the service treat values consistently and reuse query plans)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table listing each method, what it does and its failure code, and let them use it during the card sort.",
   "Extend: Ask fast finishers to sketch how they would detect and handle a 412 Precondition Failed when using ETags for optimistic concurrency with replace_item."
  ]
 },
 {
  "t": "Partition key design: high cardinality, even spread, point reads; hierarchical partition keys",
  "objectives": [
   "Students will be able to distinguish logical partitions from physical partitions and state the 20 GB logical partition limit.",
   "Students will be able to evaluate candidate partition keys against cardinality, even spread and access pattern.",
   "Students will be able to explain why a hot partition causes 429 errors when total throughput is not exhausted.",
   "Students will be able to recommend a hierarchical partition key when one tenant outgrows a single logical partition."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about checkout lanes and let students describe the problem in their own words."
   ],
   [
    13,
    "Teach",
    "Draw logical partitions as colored boxes stacked onto a few physical partition rectangles. Show how throughput is divided across physical partitions. Introduce the three goals and then hierarchical keys with a tenant, user, session diagram."
   ],
   [
    17,
    "Activity",
    "Groups run the partition key tribunal with scenario cards and present verdicts."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on how to spot a hot partition in metrics."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A store assigns shoppers to checkout lanes by the first letter of their surname, and most shoppers in town are named Smith. What happens, and how would you fix it without building more lanes?",
  "activity": {
   "title": "Partition key tribunal",
   "materials": "Printed scenario cards (orders, IoT telemetry, multitenant SaaS, chat rooms, product catalog), sticky notes, whiteboard divided into three columns: Cardinality, Spread, Reads.",
   "steps": [
    "Split the class into groups of three or four and give each group two scenario cards describing data volume and the most common queries.",
    "For each scenario, groups list two or three candidate keys on sticky notes.",
    "Groups test each candidate against the three columns on the whiteboard, marking pass or fail with a reason.",
    "Each group announces a verdict: the winning key, or a hierarchical key when one value could exceed 20 GB or dominate traffic.",
    "The teacher challenges one verdict per group with a twist, such as 'one tenant just tripled in size', and the group adapts."
   ]
  },
  "discussion": [
   "What would you look for in Azure Monitor to tell a hot partition apart from simply needing more throughput?",
   "When is /id a sensible partition key, and what do you give up by choosing it?",
   "Why might a team still use a synthetic key today instead of a hierarchical key?"
  ],
  "exit": [
   [
    "What is the storage limit of a single logical partition?",
    "20 GB."
   ],
   [
    "Container usage is 30 percent overall, but requests for one key value get 429s. What is the cause?",
    "A hot partition: throughput is divided across physical partitions and that one is saturated."
   ],
   [
    "A tenant exceeds 20 GB in a container partitioned by /tenantId. What feature helps?",
    "Hierarchical partition keys, for example /tenantId then /userId, in a new container."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist card with the three goals as yes/no questions and one worked example to copy the reasoning from.",
   "Extend: Ask fast finishers to design a migration plan from the old container to a new one with a hierarchical key, including how to keep writes flowing during the move."
  ]
 },
 {
  "t": "Request Units: point reads vs queries, indexing policy include/exclude paths, consistency levels and their RU cost",
  "objectives": [
   "Students will be able to explain what a Request Unit measures and how to read the cost of an operation from x-ms-request-charge.",
   "Students will be able to compare the RU cost of point reads, queries and writes.",
   "Students will be able to modify an indexing policy with included, excluded and composite paths to lower cost.",
   "Students will be able to rank the five consistency levels and identify which ones roughly double read cost."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up taxi question and take a few answers."
   ],
   [
    13,
    "Teach",
    "Explain RUs with the point read baseline. Project the sample indexing policy and annotate /?, /* and composite indexes. Draw a strength ladder of the five consistency levels and mark the two that cost double for reads."
   ],
   [
    17,
    "Activity",
    "Pairs complete the RU budget clinic using printed scenario sheets."
   ],
   [
    5,
    "Discuss",
    "Run the discussion questions on trade-offs between cost and guarantees."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a taxi charged by effort instead of distance, which trips would be cheap and which expensive? How might a database charge in a similar way?",
  "activity": {
   "title": "RU budget clinic",
   "materials": "Printed sheets each describing a workload with a sample item, current indexing policy JSON, account consistency level and the queries it runs; pens; projector to share answers.",
   "steps": [
    "Give each pair one workload sheet whose monthly RU cost is over budget.",
    "Pairs circle every place cost could be reduced: queries that could be point reads, missing partition key filters, unneeded indexed paths and an overly strong consistency level.",
    "Pairs rewrite the indexing policy JSON by hand, adding excluded paths and any composite index the queries need.",
    "Pairs write one sentence justifying whether consistency can be relaxed in their scenario.",
    "Two pairs present on the projector, and the class checks each change against the four levers."
   ]
  },
  "discussion": [
   "When is the default index-everything policy actually the right choice?",
   "What kind of application genuinely needs Strong consistency despite the extra cost?",
   "Why might a team prefer serverless mode over provisioned throughput for a new feature?"
  ],
  "exit": [
   [
    "About how many RUs does a point read of a 1 KB item cost?",
    "About 1 RU."
   ],
   [
    "Name two consistency levels whose reads cost roughly double.",
    "Strong and Bounded Staleness."
   ],
   [
    "Your writes are expensive because of a large embedding array you never filter on. What do you change?",
    "Exclude the embedding path (for example /embedding/*) from the indexing policy."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with the five consistency levels in order, the path syntax rules and the four cost levers to use during the activity.",
   "Extend: Ask fast finishers to estimate, in relative terms, how a workload with 80 percent reads would change in cost after moving from Strong to Session and excluding two large paths, and to explain their assumptions."
  ]
 },
 {
  "t": "Cosmos DB vector search: container vector policy (path, data type, dimensions, distance function), vector indexes (flat, quantizedFlat, diskANN) and VectorDistance()",
  "objectives": [
   "Students will be able to list the four settings of a container vector policy and explain why dimensions must match the model.",
   "Students will be able to compare flat, quantizedFlat and diskANN vector indexes by accuracy, cost and scale.",
   "Students will be able to write a VectorDistance query with TOP, ORDER BY and a metadata filter.",
   "Students will be able to identify the need to exclude the embedding path from the range index."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about arranging library books by subject on a map. Connect answers to the idea of vectors and distance."
   ],
   [
    13,
    "Teach",
    "Project the vector policy and indexing policy JSON. Label each of the four policy settings, then the vectorIndexes entry and the excluded path. Draw a three-column table comparing flat, quantizedFlat and diskANN. Walk through the VectorDistance query."
   ],
   [
    17,
    "Activity",
    "Pairs complete the configuration review and index-choice cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had to arrange every book in a library so that books on similar topics sit close together, how would you find the five books most like one you are holding?",
  "activity": {
   "title": "Vector config review",
   "materials": "Printed JSON snippets of vector policies and indexing policies, some with deliberate errors (wrong dimensions, missing excluded path, mismatched path names, no TOP in the query); three printed scenario cards for index choice; pens.",
   "steps": [
    "Give each pair four printed configurations and a note stating which embedding model output length is used.",
    "Pairs find and circle each error, writing the fix beside it: mismatched dimensions, missing /embedding/* exclusion, vector index path not matching the policy path, or a query without TOP.",
    "Pairs then read three scenario cards (small exact, mid-size, very large low-latency) and choose flat, quantizedFlat or diskANN with a one-line reason.",
    "Each pair writes one corrected VectorDistance query with a WHERE filter on a metadata field.",
    "Review answers together on the projector."
   ]
  },
  "discussion": [
   "What are the advantages of storing vectors next to operational data instead of in a separate vector database?",
   "When would a small loss of recall from an approximate index be unacceptable?",
   "What has to happen to your data if you switch to an embedding model with a different dimension count?"
  ],
  "exit": [
   [
    "Name the four settings in a vector embedding policy.",
    "Path, data type, dimensions and distance function."
   ],
   [
    "Which vector index type gives exact results but suits only small datasets?",
    "flat."
   ],
   [
    "Which query function ranks items by similarity in Cosmos DB?",
    "VectorDistance(), used with TOP and ORDER BY."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram of the policy JSON with each field explained in plain words, and let them use it while hunting for errors.",
   "Extend: Ask fast finishers to design a container that stores two different embeddings per item (for example text and image) and write both the vector policy and the indexing policy."
  ]
 },
 {
  "t": "Change feed: change feed processor with a lease container, Azure Functions Cosmos DB trigger, latest-version mode vs all versions and deletes",
  "objectives": [
   "Students will be able to describe the four parts of the change feed processor and the role of the lease container.",
   "Students will be able to compare latest version mode with all versions and deletes mode, including the continuous backup requirement.",
   "Students will be able to configure an Azure Functions Cosmos DB trigger and explain why multiple functions need separate lease prefixes.",
   "Students will be able to apply the soft delete with TTL pattern to propagate deletions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about bookmarks and shared reading. Ask how a reader knows where they left off."
   ],
   [
    12,
    "Teach",
    "Draw the monitored container, lease container, two compute instances and the delegate. Show a lease moving to the surviving instance when one fails. Compare the two modes in a table. Walk through the Python trigger code."
   ],
   [
    18,
    "Activity",
    "Run the change feed role-play, then debrief on what went wrong in each round."
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
  "warmup": "If three people share one book and each reads at a different time, how does each one know where to start? What happens if two of them share a single bookmark?",
  "activity": {
   "title": "Change feed role-play",
   "materials": "Sticky notes representing item changes (create, update, delete) labeled with partition letters A to D, two colors of index cards for lease documents, a whiteboard area for the monitored container and one for the lease container.",
   "steps": [
    "Pick four students to be the monitored container partitions A to D; each holds a stack of change sticky notes in order. Two students act as compute instances, and one acts as the lease container keeper.",
    "Round 1: instances claim partitions by taking lease cards, read changes, and the keeper records each checkpoint. Then one instance 'crashes'; the other takes over its leases and resumes from the last checkpoint.",
    "Round 2: include delete notes but play latest version mode, where deletes are removed from the stacks before reading. Ask the class what the downstream index now contains, then replay with soft delete notes marked 'deleted: true'.",
    "Round 3: add a second, independent function that uses the same lease cards. Observe that each function sees only some partitions. Fix it by giving the second function a different colored set of lease cards (a new prefix).",
    "Debrief: list on the whiteboard each failure and the configuration that prevents it."
   ]
  },
  "discussion": [
   "Why is the change feed a better trigger for re-embedding documents than a scheduled query?",
   "When would all versions and deletes mode be worth its continuous backup requirement?",
   "How would you design a handler so that processing the same batch twice causes no harm?"
  ],
  "exit": [
   [
    "What does the lease container store?",
    "Checkpoints and ownership of partition ranges for change feed consumers."
   ],
   [
    "Does latest version mode include deletes? How do you work around it?",
    "No; use a soft delete flag plus TTL (or switch to all versions and deletes mode with continuous backup)."
   ],
   [
    "Two functions monitor one container with the same lease settings. What goes wrong?",
    "They split the leases and each misses changes; use different lease prefixes or containers."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page diagram of the processor with each part labeled and a two-row table of the modes, and pair them with a confident partner during the role-play.",
   "Extend: Ask fast finishers to compare the Functions trigger with query_items_change_feed and continuation tokens, and describe when they would choose the pull model."
  ]
 },
 {
  "t": "Azure Database for PostgreSQL flexible server: allow-listing and enabling the vector (pgvector) extension",
  "objectives": [
   "Students will be able to explain why managed flexible server requires allow-listing extensions in azure.extensions.",
   "Students will be able to sequence the steps to enable pgvector: allow-list VECTOR, then CREATE EXTENSION vector per database.",
   "Students will be able to diagnose common errors such as not allow-listed, wrong extension name and missing per-database creation.",
   "Students will be able to describe Entra ID authentication and private networking options for a vector-enabled server."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about apartment appliance rules and collect a few answers."
   ],
   [
    12,
    "Teach",
    "Project the CLI command and SQL statements. Explain the server parameter versus the per-database statement using a diagram of one server with two databases. Mention azure_pg_admin, Entra ID tokens, private access and memory sizing."
   ],
   [
    18,
    "Activity",
    "Pairs work through the error message triage cards."
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
  "warmup": "In an apartment building with an approved-appliance list, what two things have to happen before you can use a new dishwasher in your unit?",
  "activity": {
   "title": "Error message triage",
   "materials": "Printed cards, each showing a short terminal transcript (a command and the error or output it produced), a sorting mat with columns 'Not allow-listed', 'Wrong name', 'Wrong database', 'Allow list overwritten', 'Works'; pens.",
   "steps": [
    "Give each pair a set of eight transcript cards, including CREATE EXTENSION pgvector, a 'not allow-listed' error, a 'type vector does not exist' error in a second database, and a parameter set that dropped PG_TRGM.",
    "Pairs sort each card into the matching column on the mat.",
    "For each failing card, pairs write the exact corrective command or statement on the back.",
    "Pairs order the corrected commands into a single setup runbook for a brand-new server with two databases.",
    "Compare runbooks as a class and agree on the canonical order on the whiteboard."
   ]
  },
  "discussion": [
   "Why might a managed service restrict which extensions you can install, even for administrators?",
   "What are the security benefits of using a managed identity token instead of a stored database password?",
   "How would you make sure allow-listing is not accidentally undone in an automated deployment?"
  ],
  "exit": [
   [
    "Which server parameter must include VECTOR before pgvector can be created?",
    "azure.extensions."
   ],
   [
    "What is the exact SQL statement to enable pgvector in a database?",
    "CREATE EXTENSION vector; (often with IF NOT EXISTS)."
   ],
   [
    "After enabling pgvector in one database, does a second database on the same server have it?",
    "No; extensions are per database, so run CREATE EXTENSION there too."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-step flowchart card (allow-list on the server, create in each database) and let struggling students use it during triage.",
   "Extend: Ask fast finishers to outline how they would enable azure_ai alongside pgvector and connect with a managed identity, listing every server and database setting involved."
  ]
 },
 {
  "t": "Pgvector: vector(n) columns, distance operators (<-> L2, <=> cosine, <#> inner product), HNSW vs IVFFlat indexes and tuning (m, ef_search, lists, probes)",
  "objectives": [
   "Students will be able to match each pgvector operator (<->, <=>, <#>) to its distance measure and its operator class.",
   "Students will be able to compare HNSW and IVFFlat by build behavior, memory, recall and when each can be created.",
   "Students will be able to choose which tuning parameter (m, ef_construction, hnsw.ef_search, lists, ivfflat.probes) to change for a given goal.",
   "Students will be able to diagnose a sequential scan caused by an operator class mismatch using EXPLAIN."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question about two ways to find a book quickly and take a few answers."
   ],
   [
    13,
    "Teach",
    "Project the table definition and top-k query. Write the three operators with their operator classes in a matching grid. Draw an HNSW layered graph and an IVFFlat set of clusters side by side and label the tuning knobs on each."
   ],
   [
    17,
    "Activity",
    "Pairs complete the matching and tuning-knob challenge, followed by an EXPLAIN reading."
   ],
   [
    5,
    "Discuss",
    "Run the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "One library uses signposts that guide you from section to shelf; another sorted books into bins once and only checks the nearest bins. Which would you rather use if books keep arriving every day, and why?",
  "activity": {
   "title": "Operators, knobs and EXPLAIN",
   "materials": "Printed operator cards (<->, <=>, <#>), operator class cards (vector_l2_ops, vector_cosine_ops, vector_ip_ops), printed goal cards (for example 'better recall at query time with IVFFlat'), two printed EXPLAIN outputs (one sequential scan, one index scan), pens.",
   "steps": [
    "Pairs match each operator card to its distance measure and its operator class card.",
    "Pairs draw goal cards and name the parameter to change and whether it is set at build time or query time.",
    "Hand out the two EXPLAIN outputs plus the matching index definitions. Pairs identify which query ignores its index and explain why.",
    "Pairs write the corrected CREATE INDEX statement for the failing case.",
    "Volunteers share answers; the teacher confirms on the projector."
   ]
  },
  "discussion": [
   "Why might a team accept approximate results instead of exact search?",
   "When would you lower ef_search or probes on purpose?",
   "How could a very selective WHERE filter affect results from an approximate index, and what could you do about it?"
  ],
  "exit": [
   [
    "Which operator class must an index use for queries that ORDER BY embedding <=> $1?",
    "vector_cosine_ops."
   ],
   [
    "Which index type can be built on an empty table and stays accurate as rows are added?",
    "HNSW."
   ],
   [
    "Name the query-time recall parameter for HNSW and for IVFFlat.",
    "hnsw.ef_search and ivfflat.probes."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference grid of operators, operator classes and parameters (build time versus query time) to consult during the activity.",
   "Extend: Ask fast finishers to explain why cosine and inner product rank normalized embeddings identically and which operator they would choose for normalized vectors and why."
  ]
 },
 {
  "t": "Retrieval-augmented generation: chunking, embedding, storing, top-k retrieval with metadata filters, adding results to the prompt",
  "objectives": [
   "Students will be able to sequence the RAG ingestion and query pipelines from chunking to prompt construction.",
   "Students will be able to explain chunk size and overlap trade-offs and the need for a single embedding model.",
   "Students will be able to apply metadata filters in retrieval to enforce tenant or permission boundaries.",
   "Students will be able to design a grounded prompt that delimits sources, requires citations and handles missing answers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about open-book exams and what makes the book helpful or harmful."
   ],
   [
    12,
    "Teach",
    "Draw the two pipelines on the whiteboard as boxes: chunk, embed, store; then embed question, retrieve top-k with filter, build prompt, generate. Walk through the Python example on the projector, pointing out the filter, partition key and system message."
   ],
   [
    18,
    "Activity",
    "Groups run the human RAG pipeline with paper chunks."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to link failures to pipeline stages."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In an open-book exam, what makes the book genuinely helpful, and what could make it lead you to a wrong answer?",
  "activity": {
   "title": "Human RAG pipeline",
   "materials": "Two printed fictional policy documents for different countries, scissors, sticky notes for metadata labels, a printed list of employee questions with the asker's country, whiteboard.",
   "steps": [
    "Groups cut the policy documents into chunks, deciding chunk boundaries and whether to repeat a line as overlap.",
    "Groups label each chunk with sticky-note metadata: source, section, country and audience.",
    "The teacher reads a question and the asker's country. One student acts as the retriever and picks the best three chunks, applying the country filter; another acts as the model and must answer only from those chunks, citing them.",
    "Run a second round with no filter and oversized chunks, and compare the answers to the first round.",
    "Groups write on the whiteboard one rule each for chunking, metadata, retrieval and prompting that would have prevented the errors."
   ]
  },
  "discussion": [
   "Why is a metadata filter safer than an instruction in the prompt for enforcing permissions?",
   "How would you notice that your embedding model changed and the stored vectors are now stale?",
   "When might hybrid search or reranking be worth the extra complexity?"
  ],
  "exit": [
   [
    "List the RAG ingestion steps in order.",
    "Chunk, embed, store (with metadata)."
   ],
   [
    "Why must chunks and queries use the same embedding model?",
    "Vectors from different models are not comparable, so similarity scores would be meaningless."
   ],
   [
    "Where do you enforce that users only see their own tenant's documents?",
    "In the retrieval query with a metadata filter or partition key, before content reaches the prompt."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pipeline diagram with blank boxes to fill in and a word bank (chunk, embed, store, retrieve, filter, prompt).",
   "Extend: Ask fast finishers to design a debugging checklist that determines whether a wrong answer came from chunking, retrieval or prompting, with one test for each stage."
  ]
 },
 {
  "t": "Azure Managed Redis: cache-aside pattern, TTL and invalidation, eviction policies",
  "objectives": [
   "Students will be able to describe the cache-aside read and write paths and identify the application as responsible for loading the cache.",
   "Students will be able to explain how TTL and explicit invalidation limit stale data, including why delete beats overwrite.",
   "Students will be able to compare noeviction, allkeys-lru, volatile-lru and related policies and choose one for a scenario.",
   "Students will be able to interpret hit ratio and eviction metrics to recommend tuning changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the kitchen counter and pantry."
   ],
   [
    12,
    "Teach",
    "Draw the cache-aside flow as a decision diagram: check cache, hit or miss, read database, set with TTL. Walk through the Python code. Show the update path deleting the key. List eviction policies in a two-column table: allkeys versus volatile."
   ],
   [
    18,
    "Activity",
    "Run the full-cache simulation with sticky notes, then policy-choice scenarios."
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
  "warmup": "You keep your most-used ingredients on the counter and the rest in a basement pantry. When should something on the counter be thrown away, and who decides what goes back on the counter?",
  "activity": {
   "title": "The full cache",
   "materials": "A whiteboard grid of eight squares representing cache memory, sticky notes in two colors (yellow for cache entries with a TTL written on them, pink for keys with no TTL), a timer, printed eviction policy cards.",
   "steps": [
    "Students act as the app: the teacher calls out read requests, and students place sticky notes in the grid on a miss, writing a TTL and a 'last used' tick mark each time a note is read.",
    "When the grid is full, draw an eviction policy card. Students decide which note to remove under that policy (allkeys-lru, volatile-lru, volatile-ttl, noeviction).",
    "Repeat with pink notes for 'session' keys and observe which policies protect them.",
    "Call out an update to a product; students practice the invalidation step by removing that note, then reload it on the next read.",
    "In pairs, students answer three printed scenarios by choosing a policy and TTL strategy, then share."
   ]
  },
  "discussion": [
   "What are the risks of keeping important data, such as carts or sessions, only in a cache?",
   "How would you choose a TTL for prices compared with product descriptions?",
   "What would a low hit ratio and high eviction count together tell you?"
  ],
  "exit": [
   [
    "In cache-aside, what does the app do on a cache miss?",
    "Read from the database, write the value to the cache with a TTL and return it."
   ],
   [
    "Which eviction policy only removes keys that have a TTL?",
    "A volatile policy, such as volatile-lru."
   ],
   [
    "After updating a record in the database, what should the app do to the cache?",
    "Delete the corresponding cache key so the next read reloads fresh data."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart card of cache-aside reads and writes and a table of policy names with one-line meanings.",
   "Extend: Ask fast finishers to describe how a change feed or message queue could drive invalidation when another system updates the database, and what could still go wrong."
  ]
 },
 {
  "t": "Redis vector indexes and semantic caching of model responses",
  "objectives": [
   "Students will be able to describe the parts of an FT.CREATE vector field: algorithm, type, dimensions and distance metric.",
   "Students will be able to explain the semantic cache flow for hits and misses.",
   "Students will be able to evaluate the similarity threshold trade-off between hit rate and correctness.",
   "Students will be able to apply scoping filters and TTLs so cached answers are not shared inappropriately."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a receptionist remembering similar questions."
   ],
   [
    12,
    "Teach",
    "Project the FT.CREATE and FT.SEARCH commands and label each part, including the attribute count and DIALECT 2. Draw the semantic cache flow: embed prompt, KNN with filters, compare to threshold, return or call model and store."
   ],
   [
    18,
    "Activity",
    "Groups play the threshold game with printed prompt pairs."
   ],
   [
    5,
    "Discuss",
    "Run the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A receptionist answers 'Where do I park?' with the same reply she gave to 'Is there visitor parking?'. When is that helpful, and when could it go wrong?",
  "activity": {
   "title": "The threshold game",
   "materials": "Printed cards each showing a new prompt, the nearest cached prompt, a made-up distance score and the tenant and language of each; a number line drawn on the whiteboard from 0.00 to 0.50; sticky notes.",
   "steps": [
    "Give each group twelve prompt-pair cards, some true paraphrases and some different questions that sound alike.",
    "Groups place each card on the whiteboard number line by its distance score and mark it 'same question' or 'different question'.",
    "Groups pick a threshold that captures as many true paraphrases as possible while excluding different questions, and count the hits and wrong answers it produces.",
    "Reveal that three cards come from a different tenant or language; groups decide which pre-filters would have blocked them.",
    "Each group writes its final threshold, filters and TTL on a sticky note and justifies it in one sentence."
   ]
  },
  "discussion": [
   "Which kinds of questions should never be served from a semantic cache?",
   "How would you keep cached answers correct when the underlying policy documents change?",
   "How does a semantic cache work together with a RAG pipeline rather than replacing it?"
  ],
  "exit": [
   [
    "Name three settings a Redis VECTOR field needs besides the algorithm.",
    "Element type, number of dimensions and distance metric."
   ],
   [
    "What is the risk of setting the similarity threshold too loose?",
    "Users receive cached answers to different questions."
   ],
   [
    "Name two fields you might use to scope semantic cache entries.",
    "Any two of tenant, user, language and model version."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students an annotated copy of the FT.CREATE command and a flowchart of the hit and miss paths to refer to during the game.",
   "Extend: Ask fast finishers to design an invalidation scheme that removes cached answers tied to a specific source document when that document is updated."
  ]
 },
 {
  "t": "Choosing the store: Cosmos DB vs PostgreSQL + pgvector vs Redis for a given AI workload",
  "objectives": [
   "Students will be able to compare Cosmos DB, PostgreSQL with pgvector and Azure Managed Redis on data shape, scale, latency, durability and cost.",
   "Students will be able to identify the dominant requirement in a scenario and select the matching store.",
   "Students will be able to design a combined architecture with a durable vector store and a Redis semantic cache.",
   "Students will be able to explain why vector support alone does not decide the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about where to keep different things at home and connect answers to durability and speed."
   ],
   [
    12,
    "Teach",
    "Build a comparison grid on the whiteboard with the three services as columns and rows for data shape, scale, latency, durability, strengths and typical fits. Show the combined architecture diagram with a durable store behind a Redis cache."
   ],
   [
    18,
    "Activity",
    "Groups run the architecture pitch with scenario cards."
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
  "warmup": "Where at home would you keep your passport, your phone charger and today's shopping list, and why not all in the same place?",
  "activity": {
   "title": "Architecture pitch",
   "materials": "Printed scenario cards (global chat memory, existing PostgreSQL line-of-business app, high-traffic FAQ bot, giant archive of embeddings, multitenant SaaS knowledge base, mixed requirements), sticky notes in three colors for the three services, whiteboard.",
   "steps": [
    "Give each group two scenario cards. Groups underline the clues for data shape, scale, latency, durability and existing systems.",
    "Groups circle the single dominant requirement and choose a primary store with a colored sticky note.",
    "Groups decide whether a second store should be added, such as Redis as a semantic cache, and sketch the architecture in boxes and arrows.",
    "Each group pitches its design in one minute; another group must challenge it with one requirement it may not meet.",
    "The class records winning clues for each service on the whiteboard as a decision cheat sheet."
   ]
  },
  "discussion": [
   "What clues in a scenario would make you reject Redis as the primary store?",
   "When could PostgreSQL with pgvector beat Cosmos DB even for a fast-growing app?",
   "What new operational responsibilities come with running two data stores together?"
  ],
  "exit": [
   [
    "Which store best fits a workload that needs global distribution and a change feed?",
    "Azure Cosmos DB for NoSQL."
   ],
   [
    "Which store fits vector search that must join with relational tables and transactions?",
    "Azure Database for PostgreSQL flexible server with pgvector."
   ],
   [
    "What role does Redis usually play in a combined AI architecture?",
    "A low-latency cache, such as a semantic cache of model responses, in front of a durable system of record."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a completed comparison grid and a list of clue words for each service to match against their scenario.",
   "Extend: Ask fast finishers to estimate which parts of a combined design would need invalidation and how they would use the change feed or events to keep Redis consistent."
  ]
 },
 {
  "t": "Service Bus queues vs topics and subscriptions; Basic tier has no topics",
  "objectives": [
   "Students will be able to explain the difference between point-to-point queues and publish-subscribe topics with subscriptions in Azure Service Bus.",
   "Students will be able to identify which Service Bus tier supports topics and list features missing from the Basic tier.",
   "Students will be able to choose between a queue and a topic for a given multi-consumer scenario and justify the choice.",
   "Students will be able to recommend the correct Service Bus data roles for sending and receiving applications."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect two or three answers. Do not correct yet; write the answers on the board to revisit later."
   ],
   [
    12,
    "Teach",
    "Draw a namespace box containing one queue and one topic with three subscriptions. Walk a message through each path and say explicitly that a queue gives each message to one receiver while a topic gives each subscription a copy. Close with the tier table: Basic has queues only; Standard and Premium add topics, sessions, transactions and duplicate detection."
   ],
   [
    18,
    "Activity",
    "Run the mailroom role-play described below, first as a queue, then as a topic. Pause after each round to ask what each consumer received."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up answers and ask groups which ones they would now change. Use the discussion questions to connect to the tier trap and role-based access."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your store has one stream of order messages. Billing and shipping both need every order. If both services read from the same queue, what happens?",
  "activity": {
   "title": "Mailroom role-play: queue versus topic",
   "materials": "Index cards numbered 1 to 12 labeled as orders, sticky notes, a whiteboard and markers.",
   "steps": [
    "Choose one student as the sender and two as consumers named Billing and Shipping. The rest of the class are observers who record which orders each consumer gets.",
    "Round 1 (queue): the sender places cards one at a time in a single tray. Billing and Shipping take turns grabbing the next card. Observers record that each consumer got only some of the orders.",
    "Round 2 (topic): the teacher acts as the topic and copies each card onto two sticky notes, placing one in a Billing tray and one in a Shipping tray. Observers confirm each consumer received all 12.",
    "Add a third consumer, Analytics, by creating a new tray only. Ask whether the sender had to change anything (it did not).",
    "Finally, announce that the namespace is on the Basic tier. Ask groups which round is no longer possible and what tier they need, then have them write the role each app needs (Data Sender or Data Receiver) on its tray."
   ]
  },
  "discussion": [
   "When would competing consumers on a queue be exactly what you want rather than a problem?",
   "What risks come with distributing a namespace connection string to every application, and how do data roles reduce them?",
   "If analytics falls hours behind, how does a topic with separate subscriptions protect billing and shipping?"
  ],
  "exit": [
   [
    "Two services must each receive every message. Queue or topic?",
    "A topic with one subscription per service, because a queue delivers each message to only one receiver."
   ],
   [
    "Which tier cannot host topics, and name one other feature it lacks.",
    "Basic; it also lacks sessions, transactions and duplicate detection."
   ],
   [
    "Which role should a receiving app have on its subscription?",
    "Azure Service Bus Data Receiver, assigned through Microsoft Entra ID and RBAC instead of sharing keys."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-column card (one consumer per message versus every consumer gets a copy) and have them sort five short scenarios into the columns before attempting tier questions.",
   "Extend: ask fast finishers to read the Python sample and rewrite it to send to a queue and receive with a queue receiver, then explain which lines changed and why."
  ]
 },
 {
  "t": "Receive modes: peek-lock (complete, abandon, dead-letter, defer) vs receive-and-delete; lock duration and lock renewal",
  "objectives": [
   "Students will be able to compare peek-lock and receive-and-delete in terms of message loss and delivery guarantees.",
   "Students will be able to choose the correct settlement action (complete, abandon, dead-letter or defer) for a given processing outcome.",
   "Students will be able to explain lock duration defaults and limits and diagnose lock lost errors.",
   "Students will be able to apply lock renewal and idempotent handling to long-running message processing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student guesses on the board."
   ],
   [
    12,
    "Teach",
    "Contrast the two receive modes with a timeline drawing: receive, process, settle. Mark where a crash loses data in receive-and-delete. Introduce the four settlement actions with one sentence each, then the lock duration (default one minute, maximum five) and what happens when it lapses."
   ],
   [
    17,
    "Activity",
    "Run the settlement card sort below in pairs, then the timed lock simulation as a whole class."
   ],
   [
    6,
    "Discuss",
    "Use the discussion questions to connect lock expiry to duplicate processing and idempotent design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "A worker receives a message and then crashes before finishing. Should the message be gone, or should someone else get another try? Who decides?",
  "activity": {
   "title": "Settlement card sort and lock-timer simulation",
   "materials": "Printed scenario cards (eight short processing outcomes), four labeled sticky notes per pair (Complete, Abandon, Dead-letter, Defer), a projector with a visible timer.",
   "steps": [
    "Give each pair eight scenario cards, such as 'JSON cannot be parsed', 'database timed out', 'order saved successfully', 'adjustment arrived before its invoice'.",
    "Pairs place each card under the settlement sticky note they choose and write one sentence of reasoning on the back.",
    "Review as a class; highlight the difference between abandon (retry now, count increases) and defer (retrieve later by sequence number).",
    "Lock simulation: one student holds a 'message' card while a one-minute timer runs on the projector. They must say 'renew' before the timer ends or the teacher hands the card to another student. When the first student then says 'complete', announce 'lock lost'.",
    "Ask pairs to write the two fixes (renew the lock, make processing idempotent) and when raising lock duration alone is not enough."
   ]
  },
  "discussion": [
   "Why does at-least-once delivery force you to think about idempotency, and what would an idempotent order handler look like?",
   "When is losing a message acceptable enough to choose receive-and-delete?",
   "What problems might appear if you defer messages but forget to store their sequence numbers?"
  ],
  "exit": [
   [
    "Which receive mode can lose messages if the consumer crashes?",
    "Receive-and-delete, because the message is removed on delivery."
   ],
   [
    "A message has malformed data that will never parse. Which settlement action?",
    "Dead-letter it with a reason, rather than abandoning it repeatedly."
   ],
   [
    "What are the default and maximum lock durations, and what do you do for longer work?",
    "Default one minute, maximum five minutes; renew the lock, for example with AutoLockRenewer."
   ]
  ],
  "differentiation": [
   "Support: provide a one-page flowchart (did it succeed, is the error permanent, is it waiting on another message) that leads to each settlement action, and let students use it during the card sort.",
   "Extend: have fast finishers modify the sample handler to defer dependent messages and later retrieve them with receive_deferred_messages, explaining where they would store the sequence numbers."
  ]
 },
 {
  "t": "Dead-letter queues: max delivery count, TTL expiry, reading the $DeadLetterQueue subqueue",
  "objectives": [
   "Students will be able to list the three main ways messages enter a Service Bus dead-letter queue and the reason each records.",
   "Students will be able to construct the dead-letter queue path for a queue or subscription.",
   "Students will be able to explain the default max delivery count and the default behavior for expired messages.",
   "Students will be able to describe a safe process to monitor, inspect and resubmit dead-lettered messages."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up prompt and let pairs discuss for two minutes before sharing."
   ],
   [
    12,
    "Teach",
    "Draw a queue with its DLQ underneath and three arrows into it: delivery count exceeded, TTL expired (with a dotted line labeled 'only if enabled'), and explicit dead-letter by code. Write both path formats on the board. Explain that the DLQ never drains itself."
   ],
   [
    18,
    "Activity",
    "Run the incident triage exercise below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, focusing on who owns the DLQ in a real team."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "If a message fails every single time it is processed, what should a messaging system do with it, and what would happen if it did nothing?",
  "activity": {
   "title": "Dead-letter incident triage",
   "materials": "Printed handouts showing six mock dead-lettered messages with sequence number, delivery count, dead-letter reason and error description; whiteboard; sticky notes.",
   "steps": [
    "Give each group the handout. Messages include examples with MaxDeliveryCountExceeded, TTLExpiredException and a custom reason such as BadFormat.",
    "Groups label each message with how it entered the DLQ and whether the fix belongs in the sender, the receiver code or the queue configuration.",
    "For the TTL message, groups must state which entity setting made it appear in the DLQ at all.",
    "Groups write the correct DLQ path for a subscription named audit on topic events and for a queue named orders.",
    "Each group writes a four-step runbook on a sticky note (alert, inspect, fix, resubmit then complete) and posts it; the class compares runbooks and checks the send-then-complete order."
   ]
  },
  "discussion": [
   "Why is explicitly dead-lettering a malformed message better than letting it reach max delivery count?",
   "Who on a team should be alerted when the dead-lettered message count rises, and what threshold makes sense?",
   "What could go wrong if you resubmit dead-lettered messages before fixing the cause?"
  ],
  "exit": [
   [
    "What is the default max delivery count?",
    "10; after it is exceeded the message is dead-lettered with MaxDeliveryCountExceeded."
   ],
   [
    "An expired message is not in the DLQ. Why?",
    "Dead-lettering on message expiration is off by default, so the expired message was dropped."
   ],
   [
    "Write the DLQ path for subscription billing on topic orders.",
    "orders/subscriptions/billing/$DeadLetterQueue."
   ]
  ],
  "differentiation": [
   "Support: give students a fill-in diagram with the three entry arrows unlabeled and a word bank (MaxDeliveryCountExceeded, TTLExpiredException, explicit dead-letter) to complete before the triage activity.",
   "Extend: ask fast finishers to read the sample DLQ reader and extend it in pseudocode to resend a copy to the main queue before completing, preserving application properties."
  ]
 },
 {
  "t": "Sessions for ordered processing, duplicate detection, scheduled messages and subscription filters (SQL and correlation)",
  "objectives": [
   "Students will be able to match sessions, duplicate detection, scheduled messages and subscription filters to the problems they solve.",
   "Students will be able to explain why duplicate detection requires a business-derived message ID.",
   "Students will be able to compare SQL filters and correlation filters and choose the efficient option for an equality match.",
   "Students will be able to identify the default rule as the cause of a filter that does not seem to work."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to name the two problems they hear."
   ],
   [
    13,
    "Teach",
    "Build a four-row problem-solution table on the board: out of order to sessions, retried duplicates to duplicate detection, deliver later to scheduled messages, route to subscribers to filters. For each, show the one property or setting that makes it work (session_id, message_id plus history window, scheduled enqueue time, rule expression)."
   ],
   [
    17,
    "Activity",
    "Run the routing desk exercise below in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, ending with the default rule trap."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A payment service retries a send after a timeout, and the customer is charged twice. Whose fault is it, the sender's, the broker's or the receiver's, and where should the fix live?",
  "activity": {
   "title": "Routing desk: filters, sessions and duplicates",
   "materials": "A printed deck of 15 message cards showing subject, message_id, session_id and two user properties (region, amount); sticky notes; whiteboard.",
   "steps": [
    "Write three subscriptions on the board with rules: Refunds (correlation filter subject = Refund), EU-Large (SQL filter region = 'EU' AND amount > 100), and Audit (no custom rule).",
    "Groups sort each card into every subscription it would reach. Remind them that Audit still has the default rule.",
    "Two cards share the same message_id. Ask groups what happens if duplicate detection is enabled and both arrive within the history window.",
    "Several cards share a session_id. Groups must put them in the order a session receiver would deliver them.",
    "Finally, reveal that EU-Large never had its default rule deleted. Groups recount what EU-Large actually received and write the fix on a sticky note."
   ]
  },
  "discussion": [
   "Why does the broker, rather than the receiver, make a good place to drop duplicate sends, and when would you still need an idempotent receiver?",
   "What tradeoffs come with sessions, for example if one session has a very slow message?",
   "When is a SQL filter worth its extra cost over a correlation filter?"
  ],
  "exit": [
   [
    "What must the sender set for duplicate detection to work?",
    "A consistent message_id derived from business data, so retries carry the same ID."
   ],
   [
    "Which filter type is more efficient for an exact match on subject?",
    "A correlation filter."
   ],
   [
    "A subscription with a new SQL filter still gets every message. Why?",
    "The $Default accept-all rule was not removed."
   ]
  ],
  "differentiation": [
   "Support: give students a matching worksheet pairing four symptoms with the four features before the routing activity, and let them keep it as a reference.",
   "Extend: ask fast finishers to write a SQL filter with a SQL action that sets a priority property for large EU orders, and explain why a correlation filter could not express the amount condition."
  ]
 },
 {
  "t": "Event Grid: system and custom topics, event subscriptions, filters (event type, subject begins/ends with, advanced)",
  "objectives": [
   "Students will be able to distinguish Event Grid system topics, custom topics and event subscriptions.",
   "Students will be able to configure event type, subject begins with, subject ends with and advanced filters for a scenario.",
   "Students will be able to identify valid Event Grid handlers and explain why filtering belongs on the subscription.",
   "Students will be able to contrast Event Grid's push model with Service Bus's pull model."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a blob subject string on the projector and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Draw source (system and custom topics), subscription (with a filter funnel) and handlers. Underline the parts of a blob subject string to show where the container and extension appear, and introduce the three filter kinds."
   ],
   [
    18,
    "Activity",
    "Run the filter-building challenge below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect filtering to cost and to Service Bus."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at /blobServices/default/containers/uploads/blobs/2026/report.pdf. Which part tells you the container, and which part tells you the file type?",
  "activity": {
   "title": "Filter-building challenge",
   "materials": "Projector, student laptops with a browser or paper worksheets, a printed list of 12 sample event subjects and event types.",
   "steps": [
    "Give pairs the list of 12 sample events mixing BlobCreated and BlobDeleted across containers uploads, archive and logs, with .pdf, .png and .log files.",
    "Present four requirements one at a time (for example only new PDFs in uploads; only deletions in archive; only blobs in uploads/invoices/; only non-empty files). For each, pairs write the event types, subject begins with, subject ends with and any advanced filter.",
    "Pairs then mark which of the 12 events would be delivered under each subscription they wrote.",
    "Swap worksheets with another pair to check each other's filters against the sample events.",
    "Close by asking which requirement needed an advanced filter and why a subject filter could not express it."
   ]
  },
  "discussion": [
   "Why is it cheaper and cleaner to filter on the subscription than inside the handler code?",
   "When would you deliver Event Grid events into a Service Bus queue instead of directly to a function?",
   "What kind of events from your own application might deserve a custom topic?"
  ],
  "exit": [
   [
    "How do you limit blob events to the uploads container?",
    "Subject begins with /blobServices/default/containers/uploads/."
   ],
   [
    "Who publishes to a system topic?",
    "The Azure service itself; your code publishes only to custom topics."
   ],
   [
    "Name three valid Event Grid handlers.",
    "Any three of webhooks, Azure Functions, Service Bus queues or topics, Storage queues, Event Hubs and Logic Apps."
   ]
  ],
  "differentiation": [
   "Support: provide a color-coded subject string (container in one color, file name in another) and a cheat card mapping each filter type to what it matches.",
   "Extend: ask fast finishers to design a custom topic for an order app, define two event types and write subscriptions that route them to different handlers with advanced filters on order amount."
  ]
 },
 {
  "t": "Event Grid delivery: retry policy, event time-to-live, dead-lettering to Blob Storage, webhook validation, CloudEvents schema",
  "objectives": [
   "Students will be able to state Event Grid's default retry limits and explain exponential backoff.",
   "Students will be able to configure dead-lettering to Blob Storage and explain what happens without it.",
   "Students will be able to describe synchronous and manual webhook validation and the CloudEvents handshake.",
   "Students will be able to compare the Event Grid schema with the CloudEvents v1.0 schema."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question; collect estimates on the board."
   ],
   [
    12,
    "Teach",
    "Draw a delivery timeline with growing gaps between retries and two stop lines: 30 attempts and 1,440 minutes. Show where an event goes when it stops, with and without a dead-letter container. Then walk through the validation handshake and put the two schemas side by side."
   ],
   [
    18,
    "Activity",
    "Run the delivery desk role-play below in groups of four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on idempotency and choosing a TTL."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a website you send notifications to is down for two days, how long should a notification service keep trying, and what should it do when it gives up?",
  "activity": {
   "title": "Delivery desk role-play",
   "materials": "Printed event cards in both Event Grid and CloudEvents formats, a printed validation event card, a die, a whiteboard timer, sticky notes.",
   "steps": [
    "Assign roles: Event Grid, Webhook, Storage container and Observer. Event Grid delivers an event card; the Webhook rolls the die and responds with success on 4 to 6 and failure otherwise.",
    "On failure, Event Grid records the attempt and waits a doubling number of seconds before retrying. After a set limit (scaled down, such as five attempts), the card goes to Storage if a dead-letter container was configured or into the bin if not. Play one round each way.",
    "Validation round: Event Grid hands the Webhook a SubscriptionValidationEvent card. The Webhook must write the correct reply (validationResponse with the code) on a sticky note before any events are delivered.",
    "Schema round: groups receive the same event in both formats and highlight the matching fields (eventType and type, eventTime and time, topic and source).",
    "Observers report what was lost, what was kept and why, linking it to the real defaults of 30 attempts and 1,440 minutes."
   ]
  },
  "discussion": [
   "Why might you deliberately shorten the event TTL for some subscriptions?",
   "How would you build a handler that safely ignores an event delivered twice?",
   "When would a team choose CloudEvents over the Event Grid schema?"
  ],
  "exit": [
   [
    "What are Event Grid's default max delivery attempts and event TTL?",
    "30 attempts and 1,440 minutes (24 hours), whichever comes first."
   ],
   [
    "Where do Event Grid dead-lettered events go?",
    "To a Blob Storage container you configure, as JSON; without it they are dropped."
   ],
   [
    "How does a custom webhook validate synchronously with the Event Grid schema?",
    "It returns the validationCode in the response body as validationResponse."
   ]
  ],
  "differentiation": [
   "Support: give students a labeled timeline handout with blanks for the default limits and the two outcomes (dropped or dead-lettered) to fill in during the teach segment.",
   "Extend: ask fast finishers to sketch, in pseudocode, a webhook that handles both the Event Grid validation event and the CloudEvents OPTIONS handshake, and a replay tool that reads dead-lettered blobs."
  ]
 },
 {
  "t": "Picking Service Bus, Event Grid or Event Hubs for a scenario",
  "objectives": [
   "Students will be able to distinguish messages, discrete events and event streams.",
   "Students will be able to select Service Bus, Event Grid or Event Hubs for a described scenario and justify the choice with key capabilities.",
   "Students will be able to identify common distractors, such as ordering with Event Grid or dead-lettering with Event Hubs.",
   "Students will be able to design a simple architecture that combines two or more of the services."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and take a quick hand vote for each item."
   ],
   [
    10,
    "Teach",
    "Draw three columns headed message, discrete event and stream. Fill each with a definition, the matching service, three capabilities and keyword cues. Close with the two combination patterns."
   ],
   [
    20,
    "Activity",
    "Run the scenario card sort and architecture sketch below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface distractors."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Classify each as a task, an announcement or a stream: a payment to process, a file was uploaded, a smartwatch heart-rate reading every second.",
  "activity": {
   "title": "Scenario card sort and architecture sketch",
   "materials": "Printed cards with 12 short scenarios, three labeled zones on the whiteboard (Service Bus, Event Grid, Event Hubs), markers, sticky notes.",
   "steps": [
    "Groups receive the 12 scenario cards, including IoT telemetry, order processing, Key Vault near-expiry notices, clickstreams, load leveling and per-customer FIFO billing.",
    "Groups place each card in a zone and write the deciding keyword on a sticky note attached to it.",
    "The teacher reviews placements and challenges any card where a distractor applies, for example asking why Event Grid cannot handle FIFO billing.",
    "Each group picks one combined scenario (blob upload processed reliably by a slow AI service) and sketches an architecture on the whiteboard using at least two services.",
    "Groups present their sketch in one minute, naming what each service contributes."
   ]
  },
  "discussion": [
   "Why does it matter whether the sender expects the work to be done or is just reporting a fact?",
   "What does replay give an analytics team that a queue cannot?",
   "When might Storage queues be a reasonable choice instead of Service Bus?"
  ],
  "exit": [
   [
    "Millions of sensor readings per second must be replayed by two teams. Which service?",
    "Event Hubs, with consumer groups and retention."
   ],
   [
    "A payment workflow needs FIFO per customer and dead-lettering. Which service?",
    "Service Bus with sessions."
   ],
   [
    "Run code when a Key Vault secret is near expiry. Which service?",
    "Event Grid, using the Key Vault system topic."
   ]
  ],
  "differentiation": [
   "Support: give students a three-question decision card (Does the sender need work done? Does each event matter alone? Is volume very high with replay?) to use while sorting.",
   "Extend: ask fast finishers to add failure handling to their architecture sketch, naming where dead-lettering or checkpoints apply in each service."
  ]
 },
 {
  "t": "Azure Functions Python v2 model: function_app.py, decorators, triggers and input/output bindings",
  "objectives": [
   "Students will be able to describe the structure of a Python v2 function app, including function_app.py, host.json, local.settings.json and requirements.txt.",
   "Students will be able to distinguish triggers from input and output bindings and apply the one-trigger rule.",
   "Students will be able to read decorator code and explain arg_name, func.Out, binding expressions and the connection argument.",
   "Students will be able to diagnose why a v2 app shows no functions after deployment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student ideas of what a function needs to start and connect."
   ],
   [
    12,
    "Teach",
    "Project the sample function_app.py. Annotate each decorator live: trigger, output binding, arg_name to parameter, binding expression {name}, connection as a setting name. Compare quickly with a v1 folder layout so students recognize old tutorials."
   ],
   [
    18,
    "Activity",
    "Run the decorator detective activity below in pairs."
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
  "warmup": "If you wanted code to run every time a file is uploaded and then save a result somewhere else, what two things would you need to tell the platform?",
  "activity": {
   "title": "Decorator detective",
   "materials": "Projector, printed handouts of three short function_app.py snippets (one correct, two with planted errors), highlighters, student laptops with a browser for optional documentation lookup.",
   "steps": [
    "Pairs highlight every trigger in one color and every binding in another across all three snippets.",
    "For each binding, pairs draw a line from arg_name to the matching function parameter and note whether it is func.Out.",
    "Pairs find the planted errors: one function with two trigger decorators, and one binding whose arg_name does not match its parameter.",
    "Pairs rewrite a connection argument that contains a literal connection string so it names an app setting instead, and write what that setting would be called.",
    "Each pair designs, on paper, decorators for a new function: blob trigger plus queue output, using a binding expression in the queue message."
   ]
  },
  "discussion": [
   "What do bindings save you from writing, and when might you still prefer the SDK directly?",
   "Why is naming an app setting in the connection argument safer than embedding the connection string?",
   "How would you organize a function app with twenty functions so it stays maintainable?"
  ],
  "exit": [
   [
    "How many triggers can a function have?",
    "Exactly one; it can have multiple input and output bindings."
   ],
   [
    "What does connection=\"DocsStorage\" refer to?",
    "An app setting (or settings prefix) named DocsStorage that holds connection information."
   ],
   [
    "In the v2 model, what replaces function.json?",
    "Decorators on functions in function_app.py."
   ]
  ],
  "differentiation": [
   "Support: give students a labeled diagram of one decorated function with arrows naming each part (trigger, binding, arg_name, parameter, connection) to reference during the activity.",
   "Extend: ask fast finishers to refactor the sample into a blueprint module and write the register_functions line, then explain how the host still discovers the functions."
  ]
 },
 {
  "t": "Common triggers: HTTP (auth levels), timer (six-field NCRONTAB), Service Bus, Cosmos DB, Blob, Event Grid",
  "objectives": [
   "Students will be able to explain HTTP trigger authorization levels and why keys are not user authentication.",
   "Students will be able to write and interpret six-field NCRONTAB timer expressions.",
   "Students will be able to describe how the Service Bus, Cosmos DB, Blob and Event Grid triggers behave, including settlement and blob source options.",
   "Students will be able to choose the right trigger for a described scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write * 0 2 * * * on the board and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Label the six NCRONTAB fields on the board. Then cover each trigger with its one key fact: HTTP auth levels and keys, Service Bus complete or abandon, Cosmos DB lease container and no deletes, Blob polling versus Event Grid source, Event Grid automatic validation."
   ],
   [
    18,
    "Activity",
    "Run the schedule-and-trigger relay below in teams."
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
  "warmup": "A teammate says this schedule runs once a night at 2:00: * 0 2 * * *. Do you agree? How many times will it run?",
  "activity": {
   "title": "Schedule-and-trigger relay",
   "materials": "Whiteboard divided into team columns, printed cards with 8 schedule descriptions and 8 trigger scenarios, markers.",
   "steps": [
    "Split the class into teams. Each team lines up at its whiteboard column.",
    "Round 1: the teacher reads a schedule description (every 15 minutes; 6:15 daily; noon on weekdays; first day of each month at midnight). The next student from each team writes the NCRONTAB expression; teams score a point for each correct one.",
    "Round 2: the teacher reads trigger scenarios (react to Key Vault changes, process orders reliably, respond to a mobile app request, process uploads within seconds). Students write the trigger and one key setting, such as auth level or source=EventGrid.",
    "Round 3: the teacher shows a buggy expression or configuration and teams race to identify and fix it.",
    "Debrief by asking which questions were most often wrong and why."
   ]
  },
  "discussion": [
   "Why is run_on_startup risky in production?",
   "If keys are not user authentication, what are they good for?",
   "Why might a team prefer the Event Grid source for blob triggers even on plans that support polling?"
  ],
  "exit": [
   [
    "Write an NCRONTAB expression for every day at 06:15 UTC.",
    "0 15 6 * * *."
   ],
   [
    "Where does a caller pass a key for a FUNCTION-level HTTP trigger?",
    "In the x-functions-key header or the code query parameter."
   ],
   [
    "What happens when a Service Bus-triggered function throws?",
    "The message is abandoned and retried; after exceeding max delivery count it is dead-lettered."
   ]
  ],
  "differentiation": [
   "Support: give students a six-box template labeled second, minute, hour, day, month, day-of-week to fill in for each schedule before writing it as a single line.",
   "Extend: ask fast finishers to write the v2 decorators for an Event Grid-based blob trigger and a topic-subscription Service Bus trigger, and explain which app settings each connection would need."
  ]
 },
 {
  "t": "Hosting plans: Flex Consumption, Premium and Dedicated; cold starts, scale limits and VNet integration",
  "objectives": [
   "Students will be able to compare Flex Consumption, Premium and Dedicated plans on scaling, billing and networking.",
   "Students will be able to explain what causes a cold start and list ways to reduce it.",
   "Students will be able to identify execution timeout and scale-limit considerations, including the HTTP idle timeout.",
   "Students will be able to select a hosting plan for a scenario with multiple requirements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers about why the first request is slow."
   ],
   [
    12,
    "Teach",
    "Build a comparison table on the board with rows for scale to zero, cold start, billing, VNet integration and long runs, and columns for Flex Consumption, Premium and Dedicated. Draw the cold-start sequence: allocate, start runtime, load code, import packages."
   ],
   [
    18,
    "Activity",
    "Run the plan-matching consultancy activity below in groups of three."
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
  "warmup": "An app is fast all day but the very first request each morning takes several seconds. What might the platform be doing during that time?",
  "activity": {
   "title": "Hosting plan consultancy",
   "materials": "Printed client brief cards (six fictional clients with three or four requirements each), a printed comparison table template, sticky notes, whiteboard.",
   "steps": [
    "Each group receives two client brief cards, for example: must reach a private database, no cold starts, lowest idle cost; or already pays for an App Service plan and runs nightly timers.",
    "Groups fill the comparison table template from the teach segment and use it to choose a plan for each client.",
    "Groups write a one-sentence recommendation plus one setting the client must configure (always-ready instances, Always On, VNet integration, per-app maximum scale).",
    "Groups swap briefs with another group, who must find one requirement the recommendation fails, or agree it meets them all.",
    "The teacher closes by revealing the intended answers and highlighting the HTTP idle timeout and legacy Consumption traps."
   ]
  },
  "discussion": [
   "When is paying for always-ready or pre-warmed instances worth the cost?",
   "Why might you set a per-app maximum instance count lower than the plan allows?",
   "How would you redesign an HTTP function that needs 15 minutes of processing?"
  ],
  "exit": [
   [
    "Name two ways to reduce Python cold starts.",
    "Always-ready (Flex) or pre-warmed (Premium) instances, and trimming or lazily importing heavy dependencies."
   ],
   [
    "Why enable Always On for a Dedicated-plan app with timer triggers?",
    "So the host stays loaded and timers and other non-HTTP triggers keep firing."
   ],
   [
    "Which plan scales to zero, supports VNet integration and is recommended for new serverless apps?",
    "Flex Consumption."
   ]
  ],
  "differentiation": [
   "Support: provide a pre-filled comparison table with two cells blank per row, so students complete it rather than build it from scratch before matching clients.",
   "Extend: ask fast finishers to design a two-app solution where an HTTP API hands long work to a queue-triggered function on a different plan, justifying both plan choices."
  ]
 },
 {
  "t": "Configuration and deployment: app settings, local.settings.json, host.json, identity-based connections, `func azure functionapp publish`",
  "objectives": [
   "Students will be able to explain the roles of app settings, local.settings.json and host.json and which are deployed.",
   "Students will be able to configure an identity-based connection using double-underscore settings and the required RBAC role.",
   "Students will be able to deploy a Python function app with func azure functionapp publish and verify indexed functions.",
   "Students will be able to diagnose common works-locally-fails-in-Azure configuration problems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student guesses."
   ],
   [
    12,
    "Teach",
    "Draw a laptop and an Azure function app side by side. Place local.settings.json only on the laptop, host.json on both with an arrow labeled deploy, and app settings only in Azure. Then rewrite a connection string setting as an identity-based setting with a double underscore and add an RBAC role box."
   ],
   [
    18,
    "Activity",
    "Run the configuration detective activity below in pairs."
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
  "warmup": "Your function works on your laptop but fails in Azure with a missing setting error, and the code is identical. What could be different?",
  "activity": {
   "title": "Configuration detective",
   "materials": "Printed packets showing a local.settings.json, a host.json, a list of Azure app settings and four short error messages; highlighters; whiteboard.",
   "steps": [
    "Pairs compare the local.settings.json Values with the Azure app settings list and highlight any setting present locally but missing in Azure.",
    "Pairs match each error message to its cause (missing app setting, authorization failure from a missing role, no functions indexed, wrong separator in a setting name).",
    "Pairs rewrite a connection string setting for Service Bus as an identity-based setting and name the role the identity needs for a queue trigger.",
    "Pairs decide where three requested changes belong: raise logging for all functions, change Service Bus concurrency, use a different Cosmos DB endpoint in production.",
    "Pairs write the deployment command and the command to confirm indexed functions, then compare with another pair."
   ]
  },
  "discussion": [
   "Why should local.settings.json be in .gitignore, and what could happen if it is committed?",
   "What are the security benefits of identity-based connections over Key Vault references to connection strings?",
   "When would publishing local settings to Azure be helpful, and when would it be dangerous?"
  ],
  "exit": [
   [
    "Is local.settings.json deployed by default?",
    "No; it is local-only, so required values must be created as app settings in Azure."
   ],
   [
    "Where do you change Service Bus concurrency for all functions?",
    "In host.json under the Service Bus extension settings."
   ],
   [
    "What two things make an identity-based Service Bus trigger work?",
    "A <connection>__fullyQualifiedNamespace app setting with the namespace host name, and a data role such as Azure Service Bus Data Receiver for the app's identity."
   ]
  ],
  "differentiation": [
   "Support: give students a three-column sorting sheet (local only, deployed with code, Azure only) and a set of setting cards to place before the detective activity.",
   "Extend: ask fast finishers to write the settings for a user-assigned identity connection, including __credential and __clientId, and explain how local development authenticates with the same settings."
  ]
 },
 {
  "t": "Managed identities: system-assigned vs user-assigned; DefaultAzureCredential in azure-identity",
  "objectives": [
   "Students will be able to explain how a managed identity removes stored secrets from an application.",
   "Students will be able to compare system-assigned and user-assigned identities by lifecycle and sharing, and choose one for a scenario.",
   "Students will be able to describe the order in which DefaultAzureCredential tries credential sources and why the same code works locally and in Azure.",
   "Students will be able to diagnose a failed authentication caused by a missing role assignment or a missing AZURE_CLIENT_ID."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board under the heading \"Where secrets hide\". Keep the list for the discussion."
   ],
   [
    12,
    "Teach",
    "Draw one web app with a system-assigned identity and three container apps sharing one user-assigned identity. Say explicitly: system-assigned lives and dies with its resource; user-assigned is its own resource. Then write the DefaultAzureCredential chain on the board (environment, workload identity, managed identity, developer tools) and show the short Python snippet from the lesson."
   ],
   [
    18,
    "Activity",
    "Run the identity scenario card sort described below. Circulate and ask each group to justify one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions. Return to the warm-up list and ask which secrets on it a managed identity could eliminate."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or sticky notes and hand them in."
   ]
  ],
  "warmup": "Think of an app you have built or used. Where were its passwords or keys stored, and who could see them?",
  "activity": {
   "title": "Card sort: which identity, and why does it fail?",
   "materials": "Printed scenario cards (8 to 10 per group), sticky notes, a whiteboard divided into three columns: System-assigned, User-assigned, Broken (fix needed).",
   "steps": [
    "Prepare cards in advance, for example: one web app that needs its own Key Vault access; twelve container apps that pull from one registry; an app recreated nightly by a pipeline; an app with two identities getting 403 from Key Vault; a function whose identity is enabled but has no roles.",
    "In groups of three or four, students place each card in a column and write a one-line reason on a sticky note attached to it.",
    "For each card in the Broken column, groups write the specific fix, such as granting Key Vault Secrets User or setting AZURE_CLIENT_ID.",
    "Groups rotate to another group's board, mark any placement they disagree with, and the original group defends or changes it.",
    "The teacher reviews the contested cards with the whole class and confirms the correct answer for each."
   ]
  },
  "discussion": [
   "Why might a team choose ManagedIdentityCredential in production even though DefaultAzureCredential works there too?",
   "What risks remain after you replace secrets with managed identities, and how would role scope reduce them?",
   "When would orphaned role assignments from deleted system-assigned identities become a problem for an auditor?"
  ],
  "exit": [
   [
    "Ten apps need identical access to one Key Vault. Which identity type fits best?",
    "A user-assigned identity, because it can be attached to all ten and needs only one role assignment."
   ],
   [
    "Name the order of sources DefaultAzureCredential tries.",
    "Environment variables, workload identity, managed identity, then developer tool sign-ins such as the Azure CLI."
   ],
   [
    "An app's identity is enabled but Key Vault returns 403. Give one likely cause.",
    "The identity has no data-plane role such as Key Vault Secrets User, or the app is using the wrong identity because AZURE_CLIENT_ID is not set."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-row comparison table (lifecycle, sharing, typical use) to fill in before the card sort, and pair them with a partner who reads each card aloud.",
   "Extend: ask fast finishers to write the CLI commands to create a user-assigned identity, assign it AcrPull and attach it to a container app, then explain how they would verify the role assignment took effect."
  ]
 },
 {
  "t": "Azure RBAC data-plane roles: Key Vault Secrets User, Service Bus Data Sender/Receiver, AcrPull, Cosmos DB built-in data roles",
  "objectives": [
   "Students will be able to distinguish control-plane operations from data-plane operations and explain why Owner and Contributor do not grant data access.",
   "Students will be able to select the least-privilege data role for Key Vault, Service Bus, Container Registry and Storage scenarios.",
   "Students will be able to explain how Cosmos DB for NoSQL built-in data roles are assigned and scoped differently from standard Azure roles.",
   "Students will be able to troubleshoot a persistent 403 Forbidden by checking role, scope and identity."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the building manager and the safe deposit boxes. Take a show of hands and ask two students to explain their answer."
   ],
   [
    12,
    "Teach",
    "Draw a vertical line on the board: control plane on the left, data plane on the right. List example operations for each. Then build a role table for Key Vault, Service Bus, ACR and Cosmos DB, saying explicitly that Cosmos DB data roles use az cosmosdb sql role assignment, not the IAM page."
   ],
   [
    18,
    "Activity",
    "Run the least-privilege matching game described below. Groups present their most debated answer."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions, focusing on why least privilege matters when an identity is shared by several apps."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually and hand them in."
   ]
  ],
  "warmup": "A building manager can repaint the lobby of a bank. Should that also let them open customers' safe deposit boxes? How might cloud permissions follow the same idea?",
  "activity": {
   "title": "Least-privilege matching game",
   "materials": "Two sets of printed cards per group: task cards (for example, read a secret, send to a queue, pull an image, push an image, query Cosmos DB items, rotate secrets) and role cards (Key Vault Secrets User, Key Vault Secrets Officer, Key Vault Reader, Service Bus Data Sender, Data Receiver, Data Owner, AcrPull, AcrPush, Cosmos DB Built-in Data Reader, Built-in Data Contributor, Owner, Contributor). Whiteboard and markers.",
   "steps": [
    "Give each group the two card sets. Groups match each task card to the single least-privilege role card and also write the narrowest sensible scope (secret, queue, registry, container).",
    "Groups put aside any role card they think should never be given to an application and write why.",
    "Hand out three troubleshooting cards, such as an identity with Contributor on Cosmos DB getting 403. Groups write the fix and the exact type of command they would use.",
    "Each group presents one match the members disagreed about. The class votes, and the teacher confirms the answer.",
    "Finish by asking every group to name the one service whose data roles are assigned differently (Cosmos DB for NoSQL)."
   ]
  },
  "discussion": [
   "Why does Azure intentionally keep control-plane power separate from data access, and what risk remains because an Owner can still grant themselves a data role?",
   "After moving to Microsoft Entra roles, what is gained by disabling key-based authentication, and what could break?",
   "How would you decide whether to scope a Service Bus role to a single queue or to the whole namespace?"
  ],
  "exit": [
   [
    "A worker only receives messages from one queue. Which role and scope?",
    "Azure Service Bus Data Receiver scoped to that queue."
   ],
   [
    "Why does Contributor on a Key Vault not let an app read secret values in RBAC mode?",
    "Contributor is a control-plane role; reading secret values needs a data-plane role such as Key Vault Secrets User."
   ],
   [
    "How do you grant an identity read and write access to items in Cosmos DB for NoSQL?",
    "Create a Cosmos DB SQL role assignment for Cosmos DB Built-in Data Contributor, for example with az cosmosdb sql role assignment create, at the account, database or container scope."
   ]
  ],
  "differentiation": [
   "Support: give students a pre-filled two-column chart with control-plane and data-plane examples and let them use it during the matching game; pair them with a partner who reads each task aloud.",
   "Extend: ask fast finishers to write both CLI commands for a scenario (a Cosmos DB SQL role assignment and a standard role assignment on a queue) and explain how they would confirm the assignment from the CLI."
  ]
 },
 {
  "t": "Key Vault: secrets, keys and certificates, versions, soft delete and purge protection, RBAC vs access policies",
  "objectives": [
   "Students will be able to classify sensitive items as Key Vault secrets, keys or certificates and explain how each is used.",
   "Students will be able to explain how versions, soft delete and purge protection behave, including name reservation and the irreversibility of purge protection.",
   "Students will be able to compare the Azure RBAC permission model with vault access policies and recommend one for a scenario.",
   "Students will be able to apply operational practices such as logging, network restriction and caching to a Key Vault design."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the deleted file. Collect answers about recycle bins and backups and link them to soft delete."
   ],
   [
    12,
    "Teach",
    "Draw a vault with three drawers labeled Secrets, Keys and Certificates and give one example each. Then draw a timeline: delete, soft-deleted for 7 to 90 days, recover or purge, and mark purge protection as a wall that cannot be removed. Finish with a two-column comparison of access policies and RBAC."
   ],
   [
    18,
    "Activity",
    "Run the vault incident role-play described below, rotating roles once."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the incidents back to permission models and purge protection."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "You deleted an important file by accident. What would you want the system to do so you could get it back, and what would you want to stop someone from deleting it on purpose?",
  "activity": {
   "title": "Vault incident role-play",
   "materials": "Printed incident cards, a whiteboard showing a simple vault diagram, sticky notes in two colors.",
   "steps": [
    "Split the class into groups of three: an on-call engineer, a security lead and an auditor.",
    "Give each group four incident cards, for example: a pipeline fails with a conflict creating a secret; a developer with Contributor gave themselves Get on all secrets; an app stores an encryption key as a secret; a team asks to disable purge protection after a project ends.",
    "For each card, the engineer proposes a fix, the security lead checks it against least privilege and purge protection rules, and the auditor writes the final answer on a sticky note.",
    "Rotate roles after two cards so each student plays at least two roles.",
    "Groups post their sticky notes on the board under the matching incident, and the teacher reviews any notes that disagree."
   ]
  },
  "discussion": [
   "Why might Microsoft have made purge protection impossible to disable once it is enabled?",
   "What problems could you face when migrating a busy vault from access policies to the RBAC permission model, and how would you plan the switch?",
   "When is it better to reference a specific secret version, and when is the latest version the right choice?"
  ],
  "exit": [
   [
    "An app needs to sign data without ever holding the private key. Which Key Vault object type fits?",
    "A key, because Key Vault performs the signing inside the vault."
   ],
   [
    "What is the soft delete retention range, and what does purge protection add?",
    "7 to 90 days (90 by default); purge protection prevents permanent deletion until the retention period ends and cannot be turned off."
   ],
   [
    "Name one limitation of vault access policies compared with RBAC.",
    "They cannot be scoped to a single secret, and anyone with Contributor on the vault can edit them to grant themselves access."
   ]
  ],
  "differentiation": [
   "Support: provide a one-page reference card with the three object types, the soft delete timeline and the two permission models, and let struggling students use it during the role-play.",
   "Extend: ask fast finishers to write a short runbook for recovering a deleted secret and moving a vault to the RBAC permission model, including the role each step requires."
  ]
 },
 {
  "t": "Secret rotation and Key Vault events (SecretNearExpiry) through Event Grid",
  "objectives": [
   "Students will be able to explain why secret rotation reduces risk and how expiration dates and versions support it.",
   "Students will be able to describe the event-driven rotation flow from Key Vault through an Event Grid system topic to an Azure Function.",
   "Students will be able to apply dual-credential rotation to avoid downtime for services with two keys.",
   "Students will be able to assign least-privilege roles to the rotation function and to consuming apps."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about passwords that never change and list reasons on the board."
   ],
   [
    12,
    "Teach",
    "Draw the flow left to right: Key Vault secret with expiry, system topic, Event Grid subscription filtered on SecretNearExpiry, Azure Function, owning service, new secret version. Say explicitly that the event fires 30 days before expiry. Then show the dual-key timeline with two rows for key 1 and key 2."
   ],
   [
    18,
    "Activity",
    "Run the human rotation pipeline described below. Run it once with a single key and once with dual keys."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, contrasting secrets with keys and certificates."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Your home Wi-Fi password has not changed in five years. List three people or devices who might still know it. Why is that a problem for a company?",
  "activity": {
   "title": "Human rotation pipeline",
   "materials": "Index cards labeled Key 1 and Key 2, a large paper calendar or whiteboard timeline, sticky notes, markers, and role badges written on paper (Key Vault, Event Grid, Function, Storage Account, App).",
   "steps": [
    "Assign five students to the roles. The App holds a card showing which key it is using. Key Vault holds the current secret card with an expiry date written on it.",
    "Round 1: the teacher advances the calendar. When it reaches 30 days before expiry, Key Vault hands a SecretNearExpiry sticky note to Event Grid, which passes it to the Function.",
    "The Function asks the Storage Account to regenerate the key the App is currently using. The class observes that the App is now broken and records the downtime.",
    "Round 2: repeat with dual keys. The Function regenerates the unused key, gives it to Key Vault as a new version, and the App switches. The class confirms nothing broke.",
    "Groups write on a sticky note which role each participant needs (Secrets Officer, Secrets User, key regeneration rights) and post it on the board for review."
   ]
  },
  "discussion": [
   "Why does Key Vault offer built-in rotation for keys and auto-renewal for certificates, but rely on your own code for secrets?",
   "What should an app do if it gets an authentication failure shortly after a rotation?",
   "When a service supports managed identities, is rotation still needed? Why or why not?"
  ],
  "exit": [
   [
    "Which event and which service trigger a Key Vault secret rotation function?",
    "The Microsoft.KeyVault.SecretNearExpiry event, delivered by Event Grid through the vault's system topic."
   ],
   [
    "What role does the rotation function need on the vault, and what role do consumers need?",
    "Key Vault Secrets Officer for the rotator; Key Vault Secrets User for consumers."
   ],
   [
    "How does dual-credential rotation avoid downtime?",
    "Apps use one key while the other is regenerated and stored, then switch, so the key in use is never invalidated."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a flow diagram with blank boxes to label (vault, system topic, subscription, function, owning service) before the role-play.",
   "Extend: ask fast finishers to design a rotation for a single-credential database user, explaining how they would create an overlap period and how the app would reload the value."
  ]
 },
 {
  "t": "Key Vault references in App Service, Functions and Container Apps settings",
  "objectives": [
   "Students will be able to explain how Key Vault references let apps use vault secrets without code changes.",
   "Students will be able to write the @Microsoft.KeyVault reference syntax for App Service and Functions and the keyvaultref and secretref pattern for Container Apps.",
   "Students will be able to troubleshoot an unresolved reference by checking identity, role, keyVaultReferenceIdentity and networking.",
   "Students will be able to choose between versioned and unversioned references based on rotation needs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project an app setting showing the raw @Microsoft.KeyVault text and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Write both App Service reference forms on the board and the two Container Apps commands. Draw the bridge: app, managed identity, Key Vault Secrets User, vault. Say explicitly that the default is the system-assigned identity and keyVaultReferenceIdentity selects a user-assigned one."
   ],
   [
    18,
    "Activity",
    "Run the broken reference clinic described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and compare references with calling the SDK directly."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An app's database password setting shows the text @Microsoft.KeyVault(VaultName=shop-kv;SecretName=db-password). Is that good or bad, and what might it tell you?",
  "activity": {
   "title": "Broken reference clinic",
   "materials": "Printed case cards, each with an app setting, a short description of the identity and its roles, and the vault's network settings. Whiteboard and sticky notes.",
   "steps": [
    "Give each pair five case cards. Examples: a user-assigned identity with no keyVaultReferenceIdentity set; a reference with a typo in the vault name; a vault limited to private endpoints; a pinned SecretVersion after rotation; a Container Apps variable using the @Microsoft.KeyVault syntax.",
    "Pairs diagnose each case and write the fix on a sticky note.",
    "Each pair then writes a correct configuration for one App Service app and one container app from a requirements card.",
    "Pairs swap their configurations with another pair, who checks the syntax against the board.",
    "The teacher reviews the most common errors with the class."
   ]
  },
  "discussion": [
   "When would you prefer Key Vault references over calling the Key Vault SDK in code, and when the opposite?",
   "Why might identity-based connections be better than a Key Vault reference for AzureWebJobsStorage?",
   "How does the refresh behavior of references affect how quickly a rotated secret takes effect?"
  ],
  "exit": [
   [
    "Write the App Service reference for secret api-key in vault shop-kv.",
    "@Microsoft.KeyVault(VaultName=shop-kv;SecretName=api-key)"
   ],
   [
    "An App Service app uses a user-assigned identity for references. What property must be set?",
    "keyVaultReferenceIdentity, set to the user-assigned identity's resource ID."
   ],
   [
    "How does a container app set an environment variable from a Key Vault-backed secret?",
    "Define a secret with keyvaultref and identityref, then set the variable to secretref:<secret-name>."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a checklist (identity exists, role assigned, identity selected, name correct, network open) to walk through for each case card.",
   "Extend: ask fast finishers to describe how they would verify a reference's status from the portal and what logs they would check if the status looked healthy but the app still failed."
  ]
 },
 {
  "t": "Azure App Configuration: key-values, labels, feature flags, Key Vault references, sentinel-key refresh and snapshots",
  "objectives": [
   "Students will be able to explain how key-values, key filters and labels organize settings across environments.",
   "Students will be able to describe how feature flags and their filters support gradual rollout and instant rollback.",
   "Students will be able to explain the sentinel key refresh pattern and why the sentinel is updated last.",
   "Students will be able to choose between labels, feature flags, Key Vault references and snapshots for a scenario and name the roles an app needs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about changing settings across many apps and collect pain points on the board."
   ],
   [
    12,
    "Teach",
    "Draw a store with keys such as Orders:MaxBatchSize in columns for no label, Dev and Prod. Add a feature flag with a 10 percent filter, a Key Vault reference arrow to a vault, a sentinel key with a bell icon, and a camera icon for snapshots. Walk through the Python load call line by line."
   ],
   [
    18,
    "Activity",
    "Run the whiteboard configuration store simulation described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, especially comparing App Configuration with Key Vault."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "You run fifteen copies of an app in three environments. A setting must change in production only, today. How do you do it now, and what could go wrong?",
  "activity": {
   "title": "Whiteboard configuration store simulation",
   "materials": "A whiteboard drawn as a configuration store with columns for unlabeled, Dev and Prod; sticky notes for key-values; a separate sticky note for the sentinel key; printed request cards; a phone camera or paper sheets to represent snapshots.",
   "steps": [
    "Volunteers act as three apps (one Dev, two Prod). Each writes on paper the settings they would load using their label filter, with unlabeled defaults first.",
    "The teacher reads change request cards, such as lowering the Prod batch size and raising the retry delay. A student editor updates the sticky notes one at a time.",
    "Round 1: apps reread the board whenever they like. The class notes any app that read a half-changed set.",
    "Round 2: apps reread only when the sentinel sticky note changes, and the editor changes it last. The class confirms each app loaded a consistent set.",
    "Finish by taking a snapshot (a photo or copied sheet) labeled release-12, then editing the board and showing that the snapshot did not change. Groups then match five scenario cards to labels, feature flags, Key Vault references or snapshots."
   ]
  },
  "discussion": [
   "Why does App Configuration point to Key Vault for secrets instead of storing them itself?",
   "What are the trade-offs of a short refresh interval versus a long one?",
   "How would you combine feature flags and snapshots in a release process?"
  ],
  "exit": [
   [
    "Which feature turns a new feature on for 10 percent of users?",
    "A feature flag with a percentage filter."
   ],
   [
    "Why is the sentinel key changed last?",
    "Apps reload all settings only when the sentinel changes, so changing it last ensures they load the complete, consistent set."
   ],
   [
    "Which two roles does an app need to read a Key Vault reference from App Configuration?",
    "App Configuration Data Reader and Key Vault Secrets User."
   ]
  ],
  "differentiation": [
   "Support: provide a four-row decision table (labels, feature flags, Key Vault references, snapshots) with one example each for students to consult during the scenario matching.",
   "Extend: ask fast finishers to explain how push-based refresh with Event Grid events would change the design and what the app would still need to do."
  ]
 },
 {
  "t": "Application Insights with the Azure Monitor OpenTelemetry Distro for Python: connection strings, traces, spans, custom metrics",
  "objectives": [
   "Students will be able to explain the roles of Application Insights, OpenTelemetry and the Azure Monitor OpenTelemetry Distro.",
   "Students will be able to configure a Python app with a connection string and describe where to call configure_azure_monitor.",
   "Students will be able to map server spans, client spans, logs and metrics to the requests, dependencies, traces and customMetrics tables.",
   "Students will be able to choose between custom metrics and span attributes for a given measurement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the slow chatbot and list what students would want to know."
   ],
   [
    12,
    "Teach",
    "Project the Python snippet and annotate it: configure_azure_monitor, tracer, span, attribute, counter. Draw four buckets labeled requests, dependencies, traces and customMetrics, and draw arrows from server spans, client spans, logging and meters into them. Say explicitly that the traces table holds log messages."
   ],
   [
    18,
    "Activity",
    "Run the telemetry sorting relay described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect telemetry choices to cost and troubleshooting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A chatbot sometimes takes twelve seconds to reply. If you could add one note at each step of its work, what would you write down, and why?",
  "activity": {
   "title": "Telemetry sorting relay",
   "materials": "Printed telemetry event cards (for example: incoming GET /ask handled by FastAPI; outgoing call to a search index; logging.warning(\"cache miss\"); KeyError raised in a handler; tokens counter add 512; custom span rag.retrieve), four labeled bins or whiteboard areas named requests, dependencies, traces and customMetrics, plus a fifth named exceptions.",
   "steps": [
    "Divide the class into teams lined up at the back of the room. Each team gets a shuffled stack of event cards.",
    "One student at a time takes a card, walks it to the correct bin and returns, then the next student goes.",
    "After all cards are placed, teams check another team's bins and flag any card they think is misplaced.",
    "The teacher reviews flagged cards, emphasizing that logging messages belong in traces and custom spans in dependencies.",
    "In pairs, students then write one counter or histogram they would add to a real app, including its name, unit and one attribute, and share it with another pair."
   ]
  },
  "discussion": [
   "Why might a team prefer OpenTelemetry over a vendor-specific SDK?",
   "Is the connection string a secret? What risk does requiring Microsoft Entra authentication for ingestion reduce?",
   "What could go wrong if you stored a high-cardinality value, such as a user ID, as a metric attribute?"
  ],
  "exit": [
   [
    "Which environment variable does configure_azure_monitor read by default?",
    "APPLICATIONINSIGHTS_CONNECTION_STRING."
   ],
   [
    "In which tables do incoming server spans and outgoing client spans appear?",
    "Server spans in requests; client spans in dependencies."
   ],
   [
    "Where do Python logging messages appear in Application Insights?",
    "In the traces table."
   ]
  ],
  "differentiation": [
   "Support: provide a one-line mapping card (server to requests, client to dependencies, logs to traces, meters to customMetrics, exceptions to exceptions) that struggling students can keep during the relay.",
   "Extend: ask fast finishers to sketch how they would add a histogram for model latency and a span attribute for the index name, and explain which question each one answers."
  ]
 },
 {
  "t": "Distributed tracing across services, sampling and live metrics",
  "objectives": [
   "Students will be able to explain how W3C Trace Context propagation links spans across HTTP calls and messaging.",
   "Students will be able to locate a slow hop using operation_Id, the end-to-end transaction view and the application map.",
   "Students will be able to explain per-trace sampling and correct a count on sampled data with sum(itemCount).",
   "Students will be able to decide when to use Live Metrics instead of stored telemetry."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the relay race and let two students answer."
   ],
   [
    12,
    "Teach",
    "Draw five boxes for front end, API, Cosmos DB, Service Bus and worker. Draw a traceparent arrow between each and write the same trace ID on every box. Then show a timeline with nested bars. Explain per-trace sampling with a stack of ten trace cards where one whole card is kept, and introduce itemCount."
   ],
   [
    18,
    "Activity",
    "Run the trace relay described below, twice."
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
  "warmup": "In a relay race, the team finished slowly. What would you need to record at each handoff to find out which runner was slowest?",
  "activity": {
   "title": "Trace relay with a broken link",
   "materials": "Sticky notes, markers, a stopwatch or phone timer, a whiteboard for drawing the timeline, and printed role cards (Front end, API, Cosmos DB, Service Bus, Worker).",
   "steps": [
    "Five students take the role cards and stand in a line. The teacher hands the Front end a sticky note with a trace ID written on it.",
    "Each student writes a span note (service name, start time, end time, parent) using the timer, then passes the trace ID to the next service. One student is told secretly to pause for several seconds.",
    "The class builds the timeline on the whiteboard from the span notes and identifies the slow hop.",
    "Round 2: the Service Bus student is told not to pass the trace ID. The worker starts a new ID. The class sees the trace split into two pieces and names the fix (propagate context in message properties).",
    "Finish with a sampling demo: the class has ten completed traces on cards, keeps one whole card, writes itemCount 10 on it and calculates the estimated total."
   ]
  },
  "discussion": [
   "What would you lose if sampling were done per item instead of per trace?",
   "How would you choose a sampling ratio for a busy production app versus a quiet test app?",
   "Why is Live Metrics not a replacement for stored telemetry when investigating yesterday's incident?"
  ],
  "exit": [
   [
    "Which header carries trace context between HTTP services?",
    "The traceparent header from the W3C Trace Context standard."
   ],
   [
    "Which Application Insights field links all telemetry from one operation?",
    "operation_Id."
   ],
   [
    "Why might count() undercount requests, and what should you use?",
    "With sampling, each stored row represents itemCount originals; use sum(itemCount)."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a printed timeline template with labeled rows for each service so they can place span notes without drawing from scratch.",
   "Extend: ask fast finishers to write a KQL query that lists every item for one operation_Id across requests, dependencies and exceptions, and explain how they would set role names for each service."
  ]
 },
 {
  "t": "KQL: where, project, summarize, bin(), join and render against requests, dependencies, exceptions and traces",
  "objectives": [
   "Students will be able to identify which Application Insights table holds requests, dependencies, exceptions and log messages.",
   "Students will be able to write KQL queries using where, project, extend, summarize and bin() to filter and aggregate telemetry.",
   "Students will be able to join requests and exceptions on operation_Id and explain the default innerunique join kind.",
   "Students will be able to render a time series chart from a summarized query."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the post-release error spike and collect ideas for what data students would need."
   ],
   [
    12,
    "Teach",
    "Project the failure-rate query and walk through it one pipe at a time, writing the row count after each step on the board. Then project the join query and explain operation_Id and the innerunique default. Write a four-row table of the core tables and what they hold."
   ],
   [
    18,
    "Activity",
    "Run the paper KQL pipeline described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students write the three exit answers on paper."
   ]
  ],
  "warmup": "Your app's error rate jumped after a release. If you had a giant spreadsheet of every request and error, which three questions would you ask it first?",
  "activity": {
   "title": "Paper KQL pipeline",
   "materials": "Printed mini tables: a requests table of about 15 rows (timestamp, name, success, duration, operation_Id) and an exceptions table of about 6 rows (timestamp, type, operation_Id). Operator cards (where, project, summarize, bin, join, render). Scissors or sticky notes, and a whiteboard.",
   "steps": [
    "In groups of three, students receive the printed tables and a question card, for example: how many failed requests per endpoint, and which exception type caused them?",
    "Groups arrange operator cards in order to answer the question and write the full KQL query on paper.",
    "They then execute the query by hand: cross out rows removed by where, cut or cover columns removed by project, group rows for summarize and match rows on operation_Id for join.",
    "A second question asks for failures per 10-minute bucket. Groups apply bin by rounding timestamps on the paper and sketch the resulting timechart.",
    "Groups compare final answers on the board, and the teacher reviews each query on the board, pointing out where the order of operators changed the result."
   ]
  },
  "discussion": [
   "Why does filtering on time first matter for both speed and cost?",
   "When would you choose kind=leftouter instead of kind=inner when joining requests to exceptions?",
   "How does sampling change the way you should count in your queries?"
  ],
  "exit": [
   [
    "Which table holds outgoing calls your app makes?",
    "dependencies."
   ],
   [
    "Write a query fragment that charts request count per 5 minutes.",
    "requests | summarize count() by bin(timestamp, 5m) | render timechart"
   ],
   [
    "What is the default join kind in KQL, and what does it do?",
    "innerunique, which deduplicates the left side before matching."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a fill-in-the-blank query template (table, where, summarize ... by bin(...), render) and a printed list of the core tables and columns.",
   "Extend: ask fast finishers to write a query that computes failure rate per endpoint using sum(itemCount) and sumif, then add a filter to show only endpoints above 5 percent."
  ]
 },
 {
  "t": "Alerts: metric vs log search alerts and action groups",
  "objectives": [
   "Students will be able to describe the three parts of an alert rule and the severity scale.",
   "Students will be able to compare metric alerts and log search alerts by signal, latency, cost and statefulness.",
   "Students will be able to choose the right alert type for a monitoring requirement and justify it.",
   "Students will be able to design action groups and alert processing rules for notifications, automation and maintenance windows."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the smoke detector and the security guard and take a few answers."
   ],
   [
    10,
    "Teach",
    "Write Scope, Condition, Action on the board. Draw two columns, Metric alert and Log search alert, and fill in signal, speed, cost, stateful, and example. Draw one action group box with arrows from several rules into it, then add an alert processing rule as a filter in front of the action group."
   ],
   [
    20,
    "Activity",
    "Run the on-call design challenge described below."
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
  "warmup": "A smoke detector reacts in seconds to one thing. A security guard reviewing camera footage can spot many kinds of problems, but later. Which would you want for a queue that is filling up, and which for a specific error message?",
  "activity": {
   "title": "On-call design challenge",
   "materials": "Printed requirement cards, a whiteboard, sticky notes in three colors (metric alert, log search alert, action group), and markers.",
   "steps": [
    "Give each group six requirement cards, for example: page on-call when dead-lettered messages exceed 10; email the team when one exception type exceeds 20 in 15 minutes; open a ticket for any failed payment request; notify owners when a resource is deleted; silence alerts during Sunday maintenance; alert when CPU deviates from its usual pattern.",
    "Groups decide the alert type for each card and write a sticky note with scope, condition (threshold or KQL idea, frequency and window) and severity.",
    "Groups design two or three action groups that cover all the cards and draw arrows from each rule to the action groups it uses.",
    "Groups add any alert processing rule or other alert source (activity log alert, dynamic threshold) the cards require.",
    "Each group presents its design in two minutes, and other groups point out one improvement. The teacher confirms the correct alert type for each card."
   ]
  },
  "discussion": [
   "What problems can alert fatigue cause, and how do severity, dimensions and stateful alerts help reduce it?",
   "When would the extra latency of a log search alert be unacceptable?",
   "Why might a team route severity 0 alerts to a different action group than severity 3 alerts?"
  ],
  "exit": [
   [
    "Name the three parts of an alert rule.",
    "Scope, condition and actions (action groups)."
   ],
   [
    "A requirement is to alert within minutes when HTTP 5xx count exceeds 50. Which alert type?",
    "A metric alert, because it is a numeric metric threshold needing fast detection."
   ],
   [
    "What is an action group, and why is it useful?",
    "A reusable set of notifications and actions that many alert rules share, so changes are made in one place."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a decision flowchart (Is it a single numeric metric? Yes: metric alert. Needs a query or text? Log search alert.) to use during the challenge.",
   "Extend: ask fast finishers to write the KQL for one log search alert in their design, choose its frequency and lookback period, and explain the trade-off between faster detection and cost."
  ]
 },
 {
  "t": "Troubleshooting: App Service log stream, Container Apps console and system logs, Functions invocation logs",
  "objectives": [
   "Students will be able to locate real-time and historical logs for App Service, Container Apps and Azure Functions.",
   "Students will be able to distinguish Container Apps console logs from system logs and decide which to check first for a symptom.",
   "Students will be able to explain why App Service container output needs file system logging enabled and how host.json log levels affect Functions logs.",
   "Students will be able to apply a structured troubleshooting order: platform, code, dependency, identity or configuration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the empty console log and take two or three hypotheses."
   ],
   [
    10,
    "Teach",
    "Draw three columns for App Service, Container Apps and Functions. Under each, list the live view, the stored location and the commands from the lesson. Circle the console versus system split in Container Apps. Write the four-step troubleshooting order on the side of the board."
   ],
   [
    20,
    "Activity",
    "Run the log detective pair troubleshooting exercise described below."
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
  "warmup": "A container app revision shows failed, and its console log is completely empty. Does that mean the app has no bugs? What else might be going on?",
  "activity": {
   "title": "Log detective: pair troubleshooting",
   "materials": "Printed symptom cards and matching log excerpt cards written by the teacher (for example, a system log line showing an unauthorized image pull, an App Service log stream line showing a probe waiting on port 80, an Invocations entry with a KeyError, a host.json snippet with the default level set to Warning). Whiteboard and sticky notes.",
   "steps": [
    "Pairs receive a symptom card only, such as a revision stuck in failed or a function with no visible log lines.",
    "Each pair writes which log source they would check first and the command or portal page they would use, then requests that log excerpt card from the teacher.",
    "If they asked for the right source, they receive the excerpt with the clue. If not, they receive an unhelpful excerpt (for example, an empty console log) and must choose again.",
    "Pairs write the root cause and fix on a sticky note and place it on the board under the matching step of the troubleshooting order (platform, code, dependency, identity or configuration).",
    "The class reviews each case, counting how many requests each pair needed, and discusses which first choice would have been fastest."
   ]
  },
  "discussion": [
   "Why is it useful to check whether the platform started your code before reading application logs?",
   "What are the trade-offs of keeping logs only in a live stream versus sending them to a Log Analytics workspace?",
   "How could Application Insights sampling make a troubleshooting session misleading?"
  ],
  "exit": [
   [
    "Which Container Apps log type would show an image pull failure?",
    "System logs."
   ],
   [
    "What must you enable before App Service log stream shows a custom container's stdout?",
    "Application logging to the file system, for example with az webapp log config --docker-container-logging filesystem."
   ],
   [
    "Where do you find the logs for one specific Azure Function execution?",
    "In the function's Invocations view under Monitor, backed by Application Insights, or by querying requests and traces for that invocation ID."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page map listing each platform's live and stored log sources, and let them use it to choose their first request during the activity.",
   "Extend: ask fast finishers to write a KQL query against ContainerAppSystemLogs_CL that would find recent image pull failures, and explain how they would turn it into a log search alert."
  ]
 }
]);
