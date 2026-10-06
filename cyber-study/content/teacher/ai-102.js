/* Teacher edition for Microsoft Certified: Azure AI Engineer Associate (AI-102): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("ai-102", [
 {
  "t": "Choosing the right Azure AI service for a workload: Azure OpenAI, AI Search, Vision, Language, Speech, Translator and Document Intelligence",
  "objectives": [
   "Students will be able to describe the primary output of Azure OpenAI, AI Search, Vision, Language, Speech, Translator, Document Intelligence and Content Safety.",
   "Students will be able to distinguish near-miss pairs such as Vision Read versus Document Intelligence and sentiment analysis versus Content Safety.",
   "Students will be able to select and justify the most direct service for a one- or two-sentence business scenario.",
   "Students will be able to explain when a prebuilt service is preferable to a custom model or a language model prompt."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up prompt. Ask three students to share which AI tool they would reach for and why. Write their answers on the board without judging them."
   ],
   [
    12,
    "Teach",
    "Walk through the services one by one, writing each service name with its output shape next to it (generated text, ranked results, named fields, sentiment score, audio, translated text, harm scores). Stress the rule: match the output the scenario asks for."
   ],
   [
    15,
    "Activity",
    "Run the scenario card sort in small groups, then have each group defend two of its hardest placements to the class."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore when a language model is a reasonable shortcut and when a purpose-built service wins on cost, consistency and evaluation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your manager says, 'Let's just use a chatbot for everything.' Name one task where that is a good idea and one where you would push back.",
  "activity": {
   "title": "Service match card sort",
   "materials": "Printed scenario cards (about 16, each a one-sentence business need), printed service header cards for each Azure AI service, tape or a whiteboard to group them.",
   "steps": [
    "Give each group of three a deck of scenario cards and the service header cards.",
    "Groups place each scenario under the service whose output matches it, writing the expected output shape on the card (for example 'named fields').",
    "Include deliberate near misses: a street sign photo versus a receipt total, a negative review versus a hateful post, a chat message versus a live speaker.",
    "Groups flag any card where two services seem possible and write one sentence explaining their final choice.",
    "The teacher reveals the intended answers and the class discusses the flagged cards."
   ]
  },
  "discussion": [
   "A language model can do sentiment analysis. Why might a team still pay for Azure AI Language instead?",
   "When would you accept the time and data cost of training a custom model rather than using a prebuilt one?"
  ],
  "exit": [
   [
    "Which service extracts the total and due date from an invoice?",
    "Azure AI Document Intelligence, using the prebuilt invoice model, because the output is named fields."
   ],
   [
    "A social platform needs to score posts for violence and hate. Which service fits?",
    "Azure AI Content Safety, which returns severity levels for hate, sexual, violence and self-harm categories."
   ],
   [
    "What is the usual role of Azure AI Search in a RAG solution?",
    "It is the retrieval layer that finds relevant passages with keyword, vector or hybrid search, which a language model then uses to ground its answer."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference that lists each service with a single example input and output, and let them use it during the card sort.",
   "Extend: Ask fast finishers to design a solution for a multi-step scenario (such as the insurance example) that uses at least four services, and to draw the data flow between them."
  ]
 },
 {
  "t": "Azure AI Foundry hubs, projects and resources vs single-service and multi-service Azure AI services resources",
  "objectives": [
   "Students will be able to compare single-service, multi-service and Azure AI Foundry resources by endpoint, keys, billing and tier options.",
   "Students will be able to explain the roles of a hub and a project, including the dependent resources a hub creates.",
   "Students will be able to choose the right resource structure for a scenario that describes sharing, isolation, billing or free-tier needs.",
   "Students will be able to describe how project connections keep secrets out of application code."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect two or three answers. Connect them to the idea of shared versus separate accounts."
   ],
   [
    12,
    "Teach",
    "Draw three boxes on the whiteboard: single-service, multi-service, Foundry. Under Foundry draw a hub with two projects and the storage account and Key Vault beside it. Explain the renames (Cognitive Services to Azure AI services, AI Studio to Foundry) and point out that templates still say CognitiveServices."
   ],
   [
    15,
    "Activity",
    "Run the client pilot design activity in pairs."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions, focusing on the security trade-off of one key that opens many services."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Would you rather your family share one streaming account with one bill, or have separate accounts? What are the trade-offs for security and cost?",
  "activity": {
   "title": "Design the client pilots",
   "materials": "Projector with three short client briefs, whiteboard or paper for sketches, sticky notes in two colors.",
   "steps": [
    "Project three client briefs: a translate-only app needing a free tier, a receipt reader using three prebuilt services with one bill, and four teams building generative AI agents with shared private networking.",
    "Pairs sketch the resources they would create for each brief, labeling endpoints, keys and where billing appears.",
    "Pairs use one sticky note color for shared settings and another for per-team assets on the agent brief.",
    "Two pairs present their sketches; the class compares and corrects them.",
    "The teacher reveals a reference design and highlights where a hub or Foundry resource holds shared connections."
   ]
  },
  "discussion": [
   "What is the security downside of a multi-service key, and how could you reduce that risk?",
   "When would adding Azure AI Foundry to a project create more work than value?"
  ],
  "exit": [
   [
    "An app uses Vision, Language and Translator, and finance wants one bill. What should you create?",
    "A multi-service Azure AI services resource with one endpoint, one key pair and combined billing."
   ],
   [
    "Name two things a hub provides that projects share.",
    "Any two of: connections to other resources, networking settings, compute, security policies, and dependent storage and Key Vault resources."
   ],
   [
    "How does a project connection help security?",
    "It stores how to reach a resource such as AI Search, ideally with a managed identity, so developers do not paste keys into code."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision table with four rows (one service and free tier, several services one bill, generative AI workspace, many teams sharing governance) and the matching resource, and let students use it during the activity.",
   "Extend: Ask fast finishers to list which Azure resources would appear in the resource group after creating a hub-based project, and explain why each one is there."
  ]
 },
 {
  "t": "Planning model deployments: regions, model availability, deployment types (Standard, Global, Data Zone, Provisioned) and quotas",
  "objectives": [
   "Students will be able to explain what a deployment is and why code calls the deployment name.",
   "Students will be able to compare Standard, Global Standard, Data Zone Standard, Provisioned and Batch deployments by processing location and billing model.",
   "Students will be able to interpret a 429 error and list ways to resolve quota and rate limit problems.",
   "Students will be able to choose a deployment type for scenarios that combine capacity, residency and latency requirements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about pay-as-you-go versus reserved plans on the board."
   ],
   [
    12,
    "Teach",
    "Draw a world map sketch with three rings: one region (Standard), a data zone (Data Zone), and the whole world (Global). Add a separate column for billing: per token versus PTUs versus Batch. Explain TPM quota per subscription, region and model, and what 429 means."
   ],
   [
    15,
    "Activity",
    "Run the deployment advisor role-play in groups of three."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to explore cost and residency trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your phone plan is either pay per gigabyte or a fixed monthly bundle. Which would you pick if your usage were steady, and which if it changed wildly month to month?",
  "activity": {
   "title": "Deployment advisor role-play",
   "materials": "Printed requirement cards (residency, traffic pattern, latency need, budget), a printed reference sheet of deployment types, whiteboard.",
   "steps": [
    "In groups of three, one student plays the client, one the engineer and one the auditor.",
    "The client draws two requirement cards and describes the workload; the engineer recommends a deployment type and quota approach.",
    "The auditor checks the recommendation against the residency and billing rules on the reference sheet and challenges anything that does not fit.",
    "Rotate roles and repeat twice with new cards.",
    "Each group writes its hardest scenario and final answer on the whiteboard for class review."
   ]
  },
  "discussion": [
   "A global routing option gives the most capacity. Why might a company still choose a smaller regional deployment?",
   "What signs in usage data would tell you it is time to move from pay-per-token to provisioned capacity?"
  ],
  "exit": [
   [
    "Which deployment type gives more capacity while keeping processing inside the EU?",
    "Data Zone Standard (or a Data Zone provisioned deployment), which routes requests only among regions in the EU data zone."
   ],
   [
    "What does HTTP 429 from an Azure OpenAI deployment mean, and what should the client do?",
    "The deployment exceeded its rate limit or quota; the client should wait for the retry-after time and retry with backoff, and the team may need to adjust quota."
   ],
   [
    "How are provisioned deployments billed?",
    "For reserved capacity measured in PTUs, regardless of how many tokens are used."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-column cheat sheet (where processed, how billed, best for) for each deployment type to use during the role-play.",
   "Extend: Ask fast finishers to design a resilient setup for a global app that uses a provisioned deployment for baseline traffic and pay-as-you-go deployments for overflow, and explain how a gateway would route between them."
  ]
 },
 {
  "t": "Deploying Azure AI resources with the portal, Azure CLI, ARM templates and Bicep",
  "objectives": [
   "Students will be able to identify the service and pricing tier of an Azure AI resource from the kind and sku properties in a template.",
   "Students will be able to explain the purpose of customSubDomainName, publicNetworkAccess, disableLocalAuth and the identity block.",
   "Students will be able to compare deploying with the portal, the Azure CLI, ARM templates and Bicep.",
   "Students will be able to modify a short Bicep template to meet a security requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about recipes and connect it to repeatable deployments."
   ],
   [
    12,
    "Teach",
    "Project the Bicep example and annotate each line. Show the kind value mapping table (TextAnalytics to Language, FormRecognizer to Document Intelligence and so on). Show the equivalent CLI command and explain that Bicep compiles to ARM JSON."
   ],
   [
    15,
    "Activity",
    "Run the template review in pairs."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions to connect infrastructure as code to audits and drift."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "If you baked a cake by memory and your friend baked the same cake from a written recipe, whose would be more consistent next month? Why?",
  "activity": {
   "title": "Template code review",
   "materials": "Printed copies of four short Bicep snippets, each with a deliberate problem; red and green pens; projector for the answer key.",
   "steps": [
    "Give each pair the four snippets and a requirement for each, such as 'Speech resource, keyless, not reachable from the internet'.",
    "Pairs mark in red what breaks the requirement (for example the wrong kind, a missing customSubDomainName or disableLocalAuth missing) and write the fix in green.",
    "Pairs then write the Azure CLI command that would create the first resource.",
    "The teacher projects the answer key and asks pairs to explain each fix aloud.",
    "Close by asking which fixes an auditor would check first."
   ]
  },
  "discussion": [
   "How does keeping templates in source control help when an auditor asks why two environments differ?",
   "What are the risks of letting people change production resources by hand in the portal?"
  ],
  "exit": [
   [
    "Which template property decides whether a resource is Language, Speech or Document Intelligence?",
    "kind, for example TextAnalytics, SpeechServices or FormRecognizer."
   ],
   [
    "Which property must be set for Entra ID token authentication to work?",
    "customSubDomainName, which gives the resource a unique endpoint."
   ],
   [
    "How does Bicep relate to ARM templates?",
    "Bicep compiles to ARM JSON templates, so they deploy the same resources; Bicep is easier to read and write."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram of the Bicep example with each property explained in plain words before they start the review.",
   "Extend: Ask fast finishers to add a child model deployment resource to the template, using parent, a model name and version, and a sku with a deployment type and capacity."
  ]
 },
 {
  "t": "Endpoints, keys and SDKs: calling Azure AI services with REST and the Python and C# SDKs",
  "objectives": [
   "Students will be able to describe the parts of a REST call to an Azure AI service: endpoint, path, api-version, credential header and body.",
   "Students will be able to identify the correct key header for Azure OpenAI and other Azure AI services, and the bearer token alternative.",
   "Students will be able to explain the asynchronous 202 and Operation-Location polling pattern.",
   "Students will be able to diagnose 400, 401, 403, 404 and 429 responses."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about restaurant order tickets and connect it to synchronous and asynchronous calls."
   ],
   [
    12,
    "Teach",
    "Project an annotated REST request and response. Highlight the header names, then show the Python SDK snippet and explain DefaultAzureCredential. Write the status code table on the board."
   ],
   [
    15,
    "Activity",
    "Run the broken request clinic in pairs."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about SDKs versus raw REST."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "At a busy restaurant, a coffee comes right away but a large catering order gets a ticket number. How is that like the way some AI services respond?",
  "activity": {
   "title": "Broken request clinic",
   "materials": "Printed cards, each showing a short HTTP request and the response status (for example a Language call with an api-key header and a 401), whiteboard for the class status code table.",
   "steps": [
    "Give each pair six request cards with problems: wrong header, missing api-version, wrong deployment name, missing role, rate limit, asynchronous 202.",
    "Pairs write the cause and the fix on each card.",
    "Pairs sort the cards by status code on the whiteboard table.",
    "The teacher calls on pairs to explain one card each, and the class agrees on the fix.",
    "Finish with one card where the response is 200 but one document failed, and ask how the app should notice."
   ]
  },
  "discussion": [
   "If SDKs hide the REST details, why is it still worth knowing the raw request shape?",
   "Why is DefaultAzureCredential safer than reading a key from a configuration file?"
  ],
  "exit": [
   [
    "Which header carries a key for Azure OpenAI?",
    "api-key (most other Azure AI services use Ocp-Apim-Subscription-Key)."
   ],
   [
    "A call returns 202 Accepted. What do you do next?",
    "Poll the URL in the Operation-Location header, or use the SDK poller, until the status is succeeded."
   ],
   [
    "What do 401 and 429 each mean?",
    "401 means a bad or missing credential; 429 means the caller is being rate limited."
   ]
  ],
  "differentiation": [
   "Support: Give students a status code reference card with one plain-language sentence per code to use during the clinic.",
   "Extend: Ask fast finishers to write pseudocode for a polling loop with a wait between checks and a stop on succeeded or failed, then compare it to what the SDK poller does."
  ]
 },
 {
  "t": "Authentication: API keys vs Microsoft Entra ID, managed identities and Cognitive Services RBAC roles",
  "objectives": [
   "Students will be able to compare API keys and Microsoft Entra ID authentication in terms of risk, traceability and revocation.",
   "Students will be able to distinguish system-assigned from user-assigned managed identities and choose one for a scenario.",
   "Students will be able to select the least-privilege data-plane role, distinguishing Cognitive Services User, OpenAI User and OpenAI Contributor from Reader and Contributor.",
   "Students will be able to list the steps to move an app to keyless authentication, including the custom subdomain and disableLocalAuth."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about shared door codes and personal badges. Collect answers about who can be traced in each case."
   ],
   [
    12,
    "Teach",
    "Draw two columns on the board: keys and Entra ID. Walk through the token flow, the custom subdomain prerequisite and managed identity types. Then draw two layers, management plane and data plane, and place each role in its layer."
   ],
   [
    15,
    "Activity",
    "Run the role assignment matching game in small groups."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about least privilege and the risk of Contributor-level roles."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An office uses one door code for everyone. A laptop goes missing. What can the office find out, and what would be different if everyone had their own badge?",
  "activity": {
   "title": "Least privilege matching",
   "materials": "Printed identity cards (a function app, a team of analysts, a pipeline that creates deployments, an auditor who only views settings), printed role cards (Reader, Contributor, Cognitive Services User, Cognitive Services OpenAI User, Cognitive Services OpenAI Contributor, Search Index Data Reader), tape.",
   "steps": [
    "Groups receive identity cards, each with a short description of what it must do and which resource.",
    "Groups match each identity to the narrowest role and write the scope (resource, resource group or subscription).",
    "Groups also decide whether each identity should be a system-assigned identity, a user-assigned identity, a group or a user.",
    "The teacher reveals a trap card: an app given Reader that gets 403. Groups explain why.",
    "Groups present one match each and the class challenges any role that grants more than needed."
   ]
  },
  "discussion": [
   "Why might an organization keep key authentication enabled for a while after moving its main apps to managed identities?",
   "How can a Contributor-level role grant data access even without a data-plane role, and how would you close that gap?"
  ],
  "exit": [
   [
    "An App Service app must call Azure AI Vision with no stored secret. What three things do you configure?",
    "Enable a managed identity on the app, assign it Cognitive Services User on the Vision resource, and use DefaultAzureCredential in the code (the resource needs a custom subdomain)."
   ],
   [
    "Can an identity with the Reader role call Azure AI Language APIs?",
    "No. Reader is management plane only; it needs a data-plane role such as Cognitive Services User."
   ],
   [
    "What does setting disableLocalAuth to true do?",
    "It turns off key authentication so only Entra ID tokens are accepted."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-layer diagram (management plane and data plane) with each role pre-placed, and have students use it as a reference during matching.",
   "Extend: Ask fast finishers to describe how they would migrate five apps that share one key to keyless access with no downtime, including the order of steps and how they would detect any remaining key users."
  ]
 },
 {
  "t": "Protecting keys and networks: Azure Key Vault, key rotation, private endpoints and network restrictions",
  "objectives": [
   "Students will be able to explain how Azure Key Vault and Key Vault references keep AI service keys out of code.",
   "Students will be able to describe the zero-downtime two-key rotation procedure and the response to a leaked key.",
   "Students will be able to compare allowing all networks, selected networks, private endpoints and disabled public access.",
   "Students will be able to troubleshoot private endpoint and locked-down network problems, including DNS and service-to-service access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about spare house keys and collect answers."
   ],
   [
    12,
    "Teach",
    "Diagram an app, Key Vault and an AI resource on the board, then add a virtual network, a private endpoint and a private DNS zone. Walk through the rotation steps and the leak response."
   ],
   [
    15,
    "Activity",
    "Run the leaked key incident drill in groups of four."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about layered defense and service-to-service access."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Where do people hide spare house keys, and why are those hiding places risky? What would a safer system look like?",
  "activity": {
   "title": "Leaked key incident drill",
   "materials": "Printed incident timeline card, printed action cards (regenerate key 1, update Key Vault secret, move clients to key 2, add private endpoint, disable public access, create private DNS zone, enable managed identity), whiteboard.",
   "steps": [
    "Read the incident aloud: a Language key was found in a public repository, and the app must stay up for staff arriving in an hour.",
    "Groups order the action cards into an immediate response and a longer-term hardening plan.",
    "Groups mark which actions protect secrets and which protect the network.",
    "Each group places its timeline on the whiteboard; the class compares the first three actions across groups.",
    "The teacher adds a twist: after the private endpoint is added, the app cannot connect. Groups name the likely cause and fix."
   ]
  },
  "discussion": [
   "If a resource has a private endpoint and public access disabled, does a leaked key still matter? Why or why not?",
   "What breaks when you lock down networks around services that call each other, and how do you fix it without opening access to the internet?"
  ],
  "exit": [
   [
    "Describe zero-downtime key rotation.",
    "Move clients to key 2, regenerate key 1, later move clients back to key 1 and regenerate key 2."
   ],
   [
    "What two settings keep an AI resource completely off the public internet while still reachable from your network?",
    "A private endpoint in your virtual network plus public network access set to Disabled."
   ],
   [
    "Which Key Vault role lets an app's managed identity read secrets?",
    "Key Vault Secrets User."
   ]
  ],
  "differentiation": [
   "Support: Give students a numbered rotation diagram showing which key each client uses at each step, and let them trace it with a finger before ordering the action cards.",
   "Extend: Ask fast finishers to design network access for a RAG solution where Azure AI Search, a storage account and Azure OpenAI are all private, listing every connection and how it is secured."
  ]
 },
 {
  "t": "Running Azure AI services in containers: connected and disconnected containers and billing settings",
  "objectives": [
   "Students will be able to explain why an organization would run Azure AI services in containers.",
   "Students will be able to list the three required settings for a connected container and describe what each one does.",
   "Students will be able to compare connected and disconnected containers, including what data leaves the site and the approval needed.",
   "Students will be able to troubleshoot a container that fails to start or stops serving requests."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about rented equipment that reports usage."
   ],
   [
    12,
    "Teach",
    "Draw a host with a container, a client app and a dotted line to Azure labeled 'usage only'. Project the docker run command and circle ApiKey, Billing and Eula. Then contrast disconnected containers with a second diagram that has no line to Azure."
   ],
   [
    15,
    "Activity",
    "Run the container troubleshooting stations in pairs."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about responsibility and compliance."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Some offices rent printers that send the supplier a page count each month. What does the supplier learn from that report, and what does it not learn?",
  "activity": {
   "title": "Container troubleshooting stations",
   "materials": "Four printed station cards, each with a docker run command and a symptom; a projector for the answer key; sticky notes.",
   "steps": [
    "Set up four stations around the room: missing Billing, mismatched resource kind, no internet for days on a connected container, and too little memory.",
    "Pairs rotate through the stations, spending about three minutes at each, and write the cause and fix on a sticky note.",
    "At the last station, pairs also decide whether the scenario should use a disconnected container instead.",
    "The teacher reviews each station with the class using the projected answer key."
   ]
  },
  "discussion": [
   "When you run AI models in your own data center, which security responsibilities move from Microsoft to your team?",
   "Is a connected container enough to satisfy a rule that 'data must stay on site'? What would you tell an auditor?"
  ],
  "exit": [
   [
    "Name the three settings every connected container needs at startup.",
    "ApiKey, Billing and Eula=accept."
   ],
   [
    "What data leaves the site with a connected container?",
    "Only usage metering for billing; the text, images or audio stay local."
   ],
   [
    "What two things are required to use disconnected containers?",
    "Approval from Microsoft and a commitment tier plan."
   ]
  ],
  "differentiation": [
   "Support: Give students an annotated docker run command with each part labeled in plain words before they visit the stations.",
   "Extend: Ask fast finishers to sketch a Kubernetes deployment with three replicas of a container behind a load balancer, including where the key is stored and which health endpoint the probes call."
  ]
 },
 {
  "t": "Monitoring and cost: Azure Monitor metrics, diagnostic logs, alerts, pricing tiers and budgets",
  "objectives": [
   "Students will be able to distinguish metrics, resource logs and alerts and choose the right one for a monitoring requirement.",
   "Students will be able to select a diagnostic setting destination (Log Analytics, storage or event hub) for a scenario.",
   "Students will be able to explain how pricing tiers, token billing and always-on services such as Azure AI Search drive cost.",
   "Students will be able to configure a cost control plan using budgets, tags and alerts with action groups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about car dashboards and trip records."
   ],
   [
    12,
    "Teach",
    "Draw the flow on the board: resource to metrics (automatic), resource to diagnostic setting to Log Analytics, storage or event hub, and both feeding alert rules that call an action group. Add a side box for Cost Management budgets and the pricing models."
   ],
   [
    15,
    "Activity",
    "Run the monitoring plan design in small groups."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about surprise bills and alert fatigue."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your car has gauges, a warning light and maybe a trip recorder. Which would help you notice a problem right now, and which would help you explain what happened last Tuesday?",
  "activity": {
   "title": "Monitoring and cost plan",
   "materials": "Printed requirement cards (for example: alert on-call within five minutes of failures, keep logs seven years, stream logs to a security tool, warn finance at 80 percent of budget, find which deployment uses the most tokens), whiteboard, markers.",
   "steps": [
    "Give each group five requirement cards.",
    "Groups decide for each card whether it needs metrics, a diagnostic setting (and which destination), an alert rule (metric or log search), an action group or a budget.",
    "Groups draw their design on the whiteboard as boxes and arrows.",
    "Groups then review a printed mock invoice with an idle search service and a provisioned deployment, and name two cost savings.",
    "The class compares designs and the teacher highlights any missing diagnostic settings."
   ]
  },
  "discussion": [
   "What happens to a team that creates too many alerts, and how would you decide which ones matter?",
   "Why do always-on charges such as search units and provisioned capacity surprise teams more than per-call charges?"
  ],
  "exit": [
   [
    "You need to query request logs with KQL. What must you configure?",
    "A diagnostic setting on the resource that sends logs to a Log Analytics workspace."
   ],
   [
    "What does an action group do?",
    "It defines the notifications and automated actions, such as email, SMS or a webhook, that run when an alert fires."
   ],
   [
    "Name two ways to reduce Azure OpenAI pay-as-you-go cost.",
    "Any two of: shorter prompts and system messages, fewer retrieved passages, limiting response length, or using a smaller model for simple tasks."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision chart with three questions (do you need history, do you need KQL, do you need someone notified) that leads to metrics, a diagnostic setting destination or an alert.",
   "Extend: Ask fast finishers to write, in plain words, the logic of a KQL query that counts failed calls per operation in five-minute bins, and describe the alert rule they would build on it."
  ]
 },
 {
  "t": "Responsible AI principles and Azure AI Content Safety: harm categories, severity levels and blocklists",
  "objectives": [
   "Students will be able to name Microsoft's six responsible AI principles and map a scenario to the correct one.",
   "Students will be able to describe the four Content Safety harm categories and the default severity scale.",
   "Students will be able to choose severity thresholds and actions for different audiences and justify them.",
   "Students will be able to decide when a custom blocklist is needed in addition to harm categories."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about game chat moderation and collect two opposing views."
   ],
   [
    12,
    "Teach",
    "List the six principles on the board with one short example each. Then draw a table with the four harm categories as rows and severity 0, 2, 4, 6 as columns. Explain thresholds as business decisions and introduce blocklists."
   ],
   [
    15,
    "Activity",
    "Run the moderation policy workshop in groups."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about who sets thresholds and how users should be told."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Should an online game for teenagers and one for adults block the same chat messages? Who should decide where the line is?",
  "activity": {
   "title": "Moderation policy workshop",
   "materials": "Printed audience cards (children's learning app, adult gaming server, war news comments, mental health forum), printed blank policy grids (four categories by four severity levels), printed principle scenario cards.",
   "steps": [
    "Each group draws one audience card and fills in the policy grid with allow, review or block for every category and severity.",
    "Groups list three terms they would add to a blocklist for their audience and explain why the categories would miss them.",
    "Groups swap grids with another group, which challenges one decision.",
    "Groups then sort six principle scenario cards to the matching responsible AI principle.",
    "The teacher reviews the principle answers and asks two groups to explain their hardest threshold choice."
   ]
  },
  "discussion": [
   "Who in an organization should own content moderation thresholds, and how does that connect to accountability?",
   "How should an app tell users that their message was hidden by an automated system, and why does it matter?"
  ],
  "exit": [
   [
    "What are the four Content Safety harm categories?",
    "Hate, sexual, violence and self-harm."
   ],
   [
    "A chatbot does not tell users they are talking to an AI. Which principle is violated?",
    "Transparency."
   ],
   [
    "When do you use a custom blocklist?",
    "When you need to catch specific terms, such as banned brand names or local slurs, that the harm categories do not target."
   ]
  ],
  "differentiation": [
   "Support: Give students a principle card set with a one-line definition and an example for each principle, to use while sorting scenarios.",
   "Extend: Ask fast finishers to design a review workflow for medium-severity content, including who reviews, how quickly, and how decisions feed back into thresholds or blocklists."
  ]
 },
 {
  "t": "Content filters, prompt shields and groundedness detection for generative AI applications",
  "objectives": [
   "Students will be able to describe the default Azure OpenAI content filter and how custom configurations change it.",
   "Students will be able to distinguish a prompt that was filtered from an output that was filtered by reading the API response.",
   "Students will be able to differentiate user prompt attacks from document attacks and select prompt shields for each.",
   "Students will be able to match a generative AI risk to the right control, including groundedness and protected material detection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about tricking a helpful assistant and collect examples."
   ],
   [
    12,
    "Teach",
    "Draw a pipeline on the board: user message, retrieved documents, model, output. Place the content filter on input and output, prompt shields on the user message and documents, and groundedness detection on the output compared with the documents. Show the 400 response and the finish_reason response side by side."
   ],
   [
    15,
    "Activity",
    "Run the red team and blue team guardrail match."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about layered defense and agents."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever seen someone try to trick a chatbot into breaking its rules? What did they try, and how could the chatbot have noticed?",
  "activity": {
   "title": "Guardrail match, red team and blue team",
   "materials": "Printed risk cards describing safe, fictional misuse scenarios (role-play jailbreak, hidden instruction in an email, invented policy in a summary, song lyrics in output, violent prompt), printed control cards, printed API response snippets.",
   "steps": [
    "Split each group into a red pair and a blue pair. The red pair reads a risk card aloud in plain words (no real attack text).",
    "The blue pair chooses the control that catches it and says where in the pipeline it runs.",
    "Swap roles after each card until all risk cards are used.",
    "Groups then read four API response snippets and label each as prompt filtered, output filtered or not filtered.",
    "The class reviews the snippets together, and the teacher stresses how the app should respond to each."
   ]
  },
  "discussion": [
   "Why is indirect prompt injection more dangerous for an agent that can call tools than for a simple chatbot?",
   "If no single guardrail is perfect, how do you decide which layers a new app needs?"
  ],
  "exit": [
   [
    "How does an app know the output, not the prompt, was filtered?",
    "The request succeeds, but finish_reason is content_filter and the annotations show the triggered category."
   ],
   [
    "Instructions hidden in a retrieved web page tell the model to reveal its system prompt. What is this called and what detects it?",
    "A document attack (indirect prompt injection), detected by prompt shields."
   ],
   [
    "Which control flags a summary that states facts not found in the source documents?",
    "Groundedness detection."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row chart (comes from the user, comes from content, comes from the output) with the matching control for each, to use during the match.",
   "Extend: Ask fast finishers to write a system message outline that separates trusted instructions from untrusted retrieved content and lists which actions require human confirmation."
  ]
 },
 {
  "t": "Azure OpenAI and the Azure AI Foundry model catalog: chat, reasoning, embedding and image models, and how to choose and deploy one",
  "objectives": [
   "Students will be able to classify models in the Azure AI Foundry catalog as chat, reasoning, embedding, image or audio models by what they produce.",
   "Students will be able to choose a model for a task based on quality, cost, latency, context window and feature support.",
   "Students will be able to compare serverless API, managed compute and resource deployments of catalog models.",
   "Students will be able to describe the steps to deploy a model and call it by deployment name."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about choosing vehicles and connect it to choosing models."
   ],
   [
    12,
    "Teach",
    "Draw five columns on the board: chat, reasoning, embedding, image, audio, with what goes in and what comes out of each. Explain the hosting options and the model card. Walk through the deploy steps and the chat playground's view code option, using a projector if available."
   ],
   [
    15,
    "Activity",
    "Run the model shopping challenge in small groups."
   ],
   [
    8,
    "Discuss",
    "Use the discussion questions about routing and benchmarks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Would you use a delivery truck to pick up a coffee, or a scooter to move a sofa? What does that tell us about picking one AI model for every job?",
  "activity": {
   "title": "Model shopping challenge",
   "materials": "Printed requirement cards for five apps, printed simplified model cards (generic names such as small chat, large chat, reasoning, embedding, image) listing relative cost, speed, context window and features, whiteboard.",
   "steps": [
    "Each group receives two app requirement cards, such as a FAQ bot, semantic product search, a complex pricing calculator or a marketing image tool.",
    "Groups pick the model types each app needs from the simplified model cards and note the deployment option they would use.",
    "Groups check each choice against the context window and feature columns and change anything that does not fit.",
    "Groups present one app design; the class asks one challenge question per group.",
    "The teacher highlights designs that route only hard requests to a reasoning model and that use the same embedding model for indexing and queries."
   ]
  },
  "discussion": [
   "When is a small model plus routing better than one large model for everything?",
   "Why might a model that ranks highly on a public benchmark still be the wrong choice for your app?"
  ],
  "exit": [
   [
    "Which type of model do you need to create vectors for search?",
    "An embedding model, used for both indexing documents and embedding queries."
   ],
   [
    "What is the trade-off when using a reasoning model?",
    "Better accuracy on complex, multistep problems in exchange for higher latency and token cost."
   ],
   [
    "In code, what name do you use to call a deployed model?",
    "The deployment name chosen when the model was deployed, not the model name."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page 'input and output' chart for each model type, with an everyday example, to use during the challenge.",
   "Extend: Ask fast finishers to design a routing rule that decides when a request goes to a small chat model versus a reasoning model, and describe how they would measure whether the rule saves money without hurting quality."
  ]
 },
 {
  "t": "Chat completions: system, user and assistant messages, and calling a deployment with the Azure OpenAI SDK",
  "objectives": [
   "Students will be able to describe the purpose of system, user, assistant and tool messages in a chat completions request.",
   "Students will be able to explain why the chat completions API is stateless and how an app maintains conversation memory.",
   "Students will be able to identify the deployment name, finish_reason and usage fields in Python or C# client code and responses.",
   "Students will be able to choose a fix for a described symptom such as forgotten context, cut-off answers or slow perceived response."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Take three or four answers and write the ideas on the board without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Walk through the four message roles with a projected request. Stress that the API is stateless and show how history grows. Project the Python sample and point out the deployment name in model, then the finish_reason values and usage."
   ],
   [
    18,
    "Activity",
    "Run the Memoryless Assistant role-play described below. Circulate and prompt groups to notice what breaks and why."
   ],
   [
    5,
    "Discuss",
    "Bring groups back. Ask the discussion questions and connect answers to token cost and trimming strategies."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes and post them on the door as they leave."
   ]
  ],
  "warmup": "You text a friend who has total amnesia every time a message arrives. How would you have to write each text so they can still help you plan a weekend trip?",
  "activity": {
   "title": "The Memoryless Assistant",
   "materials": "Index cards labeled System, User, Assistant and Tool; blank paper; markers; a projector showing a sample response JSON with finish_reason and usage.",
   "steps": [
    "Form groups of four. One student is the Model and must turn their back and may only read the cards handed to them for each turn.",
    "The group writes a System card with rules for a bike shop support bot, then a User card with a first question. The Model writes an Assistant card reply.",
    "For turn two, the group first hands over only the new User card. The Model replies, and the group notes what the Model got wrong.",
    "Repeat turn two, this time handing over the System card plus all earlier cards in order. Compare the replies.",
    "Count the words handed over on each turn as a stand-in for prompt tokens and graph how they grow over five turns.",
    "Finally, show the projected response and have each group label finish_reason, the deployment name and usage, and say what length or content_filter would mean."
   ]
  },
  "discussion": [
   "What would you keep and what would you drop when trimming a long conversation, and why must the system message always stay?",
   "When might it be acceptable for a chat app to forget earlier turns on purpose?"
  ],
  "exit": [
   [
    "Where should persona and rules for a chatbot go?",
    "In the system message."
   ],
   [
    "A user's follow-up ignores details they gave two turns ago. What is the most likely cause?",
    "The app is not resending the earlier messages, because the API is stateless."
   ],
   [
    "What does finish_reason length tell you, and what is one fix?",
    "The output hit the token limit and was cut off; raise max tokens or ask for shorter answers."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-filled message list with roles color-coded and ask them only to add the next user turn and predict what the model will see.",
   "Extend: Ask fast finishers to design a history-trimming strategy that keeps the system message, the last six turns and a running summary, and estimate how it changes prompt tokens over 30 turns."
  ]
 },
 {
  "t": "Tuning model output with parameters: temperature, top_p, max tokens, stop sequences and penalties",
  "objectives": [
   "Students will be able to explain how temperature and top_p change token sampling.",
   "Students will be able to select the correct parameter for a described symptom: inconsistency, truncation, unwanted continuation or repetition.",
   "Students will be able to compare frequency penalty and presence penalty.",
   "Students will be able to recommend parameter settings for extraction tasks versus creative tasks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect quick answers. Use them to introduce the idea that a model chooses each next token from a set of probabilities."
   ],
   [
    12,
    "Teach",
    "Draw a bar chart of next-token probabilities on the board. Show what low and high temperature do to it, then shade the top_p cutoff. Cover max tokens and finish_reason length, stop sequences, and the two penalties with one sentence each."
   ],
   [
    18,
    "Activity",
    "Run the Dice and Dials card activity below. Groups simulate sampling and then solve symptom cards."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions. Emphasize the change one, not both rule and testing on a fixed input set."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper before leaving."
   ]
  ],
  "warmup": "If you asked ten people to finish the sentence The sky is ..., which answers would you expect most often, and how could you make the answers more surprising?",
  "activity": {
   "title": "Dice and Dials",
   "materials": "Printed probability cards for a short sentence, a six-sided die or a browser random-number page, and a set of printed symptom cards describing app problems.",
   "steps": [
    "In pairs, students receive a card listing five next words with probabilities. They mark the top_p 0.5 cutoff and cross out words outside it.",
    "Students simulate low temperature by always choosing the top word, then simulate high temperature by rolling to choose among all five, and compare the resulting sentences.",
    "Each pair draws four symptom cards, such as answers cut off mid-sentence, the same slogan repeats, labels differ between runs, or the model writes a second item after the first.",
    "For each card the pair writes the parameter to change, the direction of change and a one-line reason.",
    "Pairs swap cards with a neighbor to check answers, then flag any disagreements for the class discussion."
   ]
  },
  "discussion": [
   "Why might a creative writing app and a code-generation app use the same model but very different settings?",
   "What risks come with setting temperature very high in a customer-facing app?"
  ],
  "exit": [
   [
    "Your extraction output differs between runs on the same input. Which parameter do you lower?",
    "Temperature."
   ],
   [
    "An answer stops mid-sentence and finish_reason is length. What do you change?",
    "Raise max tokens, or ask for a shorter answer."
   ],
   [
    "Which penalty grows with how many times a token has appeared?",
    "Frequency penalty."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page cheat sheet that pairs each symptom with its parameter and have struggling students complete the symptom cards using it before trying without.",
   "Extend: Ask fast finishers to write two full request bodies, one for contract extraction and one for slogan brainstorming, justifying every parameter they set and every one they leave at default."
  ]
 },
 {
  "t": "Prompt engineering techniques: clear instructions, few-shot examples, output formats and step-by-step reasoning",
  "objectives": [
   "Students will be able to write a system message that states role, audience, rules and fallback behavior.",
   "Students will be able to distinguish zero-shot from few-shot prompting and explain when examples are needed.",
   "Students will be able to apply delimiters and explicit output formats to make output parseable.",
   "Students will be able to explain when chain-of-thought helps and why reasoning models need simpler prompts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up drawing prompt. Show how different the drawings are and connect that to vague prompts."
   ],
   [
    10,
    "Teach",
    "Present the techniques in order: clear instructions, delimiters, few-shot examples, output format, chain-of-thought, and iteration on a fixed test set. Show a weak and a strong prompt side by side on the projector."
   ],
   [
    20,
    "Activity",
    "Run Prompt Repair Shop below. Groups improve a broken prompt and test it against classmates acting as the model."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare approaches and highlight that prompting comes before RAG or fine-tuning."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "Draw a house in 30 seconds. Now compare drawings with your neighbor. What would I have needed to tell you for every drawing to come out the same?",
  "activity": {
   "title": "Prompt Repair Shop",
   "materials": "Printed weak prompts (for example: sort these customer emails), printed sets of six sample inputs, sticky notes, whiteboard.",
   "steps": [
    "Give each group a weak prompt and six sample inputs. One student acts as the model and must follow the prompt literally, writing answers on sticky notes.",
    "The group records how inconsistent the six outputs are, such as varied labels, lengths or formats.",
    "The group rewrites the prompt with a role, explicit rules, a fallback for unknowns, delimiters around the input and two varied few-shot examples, plus an exact output format.",
    "A different student acts as the model and answers the same six inputs with the new prompt. The group compares consistency.",
    "Each group posts its before and after prompts on the whiteboard and names the single change that helped most."
   ]
  },
  "discussion": [
   "Which single technique made the largest difference in your group, and why do you think that was?",
   "How could delimiters help when the content being processed comes from an untrusted email or web page?"
  ],
  "exit": [
   [
    "What prompting technique most reliably teaches a model an exact output format?",
    "Few-shot examples, ideally combined with structured output or JSON mode."
   ],
   [
    "Why place delimiters around content?",
    "To separate content from instructions so the model does not treat document text as commands."
   ],
   [
    "Should you add step-by-step instructions to a reasoning model's prompt?",
    "Generally no; reasoning models reason internally, so keep prompts simple and direct."
   ]
  ],
  "differentiation": [
   "Support: Provide a prompt template with labeled blanks (role, audience, rules, fallback, examples, format) for students to fill in during the activity.",
   "Extend: Ask fast finishers to design a ten-item test set for their prompt, including edge cases, and explain how they would compare two prompt versions fairly."
  ]
 },
 {
  "t": "Retrieval augmented generation (RAG): grounding a model in your own data with Azure AI Search",
  "objectives": [
   "Students will be able to explain why language models fabricate answers about private or recent information and how RAG addresses it.",
   "Students will be able to describe the ingestion and query-time phases of a RAG solution in order.",
   "Students will be able to identify Azure AI Search capabilities and add your data options that affect answer quality.",
   "Students will be able to justify RAG over fine-tuning for scenarios involving changing facts, citations or per-user access."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Point out that the best answers involve looking something up rather than remembering."
   ],
   [
    12,
    "Teach",
    "Draw the two-phase RAG pipeline on the whiteboard: ingestion on the left, query time on the right. Explain keyword, vector, hybrid and semantic ranking briefly, then the add your data options. Close with the advantages and costs."
   ],
   [
    18,
    "Activity",
    "Run the Human RAG Pipeline activity below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the activity to retrieval quality and security filtering."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on index cards."
   ]
  ],
  "warmup": "If someone asked you a detailed question about your school's attendance policy, would you answer from memory or look it up first? What would you do to make your answer trustworthy?",
  "activity": {
   "title": "The Human RAG Pipeline",
   "materials": "Twenty printed policy cards for a fictional company (each with a title and a short paragraph), envelopes, sticky notes, whiteboard.",
   "steps": [
    "Assign roles in groups of four or five: Indexer, Retriever, Prompt Builder, Model and Auditor.",
    "The Indexer sorts the policy cards into envelopes by topic and writes a title on each, simulating ingestion and chunking.",
    "The teacher reads a question aloud. The Retriever has 30 seconds to pull the three most relevant cards.",
    "The Prompt Builder writes a sticky note with the rule answer only from these cards and cite the card title, and hands it with the cards to the Model, who writes the answer.",
    "The Auditor checks whether each fact in the answer appears on a retrieved card and whether the citation is right.",
    "Repeat with a question whose answer card the Retriever is likely to miss, and discuss how the answer degrades when retrieval fails. Then swap one card for an updated version and show the next answer changes without retraining anyone."
   ]
  },
  "discussion": [
   "In the activity, what caused more wrong answers: the Model or the Retriever? What does that suggest about where to invest effort?",
   "How would you make sure a contractor never sees an employee-only policy in a RAG app?"
  ],
  "exit": [
   [
    "Name the two phases of RAG.",
    "Ingestion and query time."
   ],
   [
    "A RAG bot gives wrong answers because the right document is never retrieved. What should you fix first?",
    "Retrieval, for example by using hybrid search, semantic ranking or better chunking."
   ],
   [
    "Give two reasons to choose RAG over fine-tuning for a policy assistant.",
    "Policies change and RAG stays current by updating the index; RAG can cite sources; it can also enforce per-user access with security filters."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram of the pipeline with blanks to fill in as they complete each role in the activity.",
   "Extend: Ask fast finishers to write the full system instruction for a RAG prompt, including citation format and the fallback when sources lack the answer, and to explain how they would rewrite a follow-up question using chat history."
  ]
 },
 {
  "t": "Embeddings and vector retrieval for RAG: chunking documents, embedding models and similarity search",
  "objectives": [
   "Students will be able to explain how embeddings let vector search match meaning instead of exact words.",
   "Students will be able to justify a chunking strategy, including chunk size, overlap and metadata.",
   "Students will be able to describe the vector field settings in Azure AI Search and when re-embedding is required.",
   "Students will be able to compare exhaustive KNN with HNSW and keyword search with vector search."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about grouping words by meaning. Record groupings on the board."
   ],
   [
    12,
    "Teach",
    "Explain embeddings as points in space using a two-dimensional sketch. Cover cosine similarity, KNN versus HNSW, the same-model rule, chunking with overlap and metadata, and the Azure AI Search vector field properties."
   ],
   [
    18,
    "Activity",
    "Run Meaning Map and Chunk Cutters below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions, steering toward why hybrid search exists."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here are eight words: puppy, kitten, invoice, receipt, dog, bill, cat, payment. Group them however you like. Why did you put them where you did?",
  "activity": {
   "title": "Meaning Map and Chunk Cutters",
   "materials": "A large two-axis grid on the whiteboard, sticky notes, a printed four-page fictional equipment manual, scissors.",
   "steps": [
    "Each student writes a short sentence about a car or a billing problem on a sticky note and places it on the grid so similar meanings sit close together. This represents embedding.",
    "The teacher writes a query sticky note, places it on the grid, and the class picks the three nearest notes, discussing why cosine closeness beats shared words.",
    "In groups, students cut the printed manual into chunks two ways: by fixed length with a few overlapping lines, and by section headings. They label each chunk with title and page metadata.",
    "The teacher reads three questions. Groups find the best chunk under each strategy and note which strategy found complete answers.",
    "Groups record one example where a chunk was too small to be useful and one where it was too large."
   ]
  },
  "discussion": [
   "When would keyword search beat vector search in your groups' examples?",
   "What could go wrong if a team upgrades its embedding model but forgets to re-index?"
  ],
  "exit": [
   [
    "Why must queries use the same embedding model as the indexed documents?",
    "Vectors from different models are not comparable, so nearest-neighbor results would be meaningless."
   ],
   [
    "What does chunk overlap prevent?",
    "Losing content that falls across a chunk boundary."
   ],
   [
    "Which nearest neighbor algorithm is the default in Azure AI Search, and why?",
    "HNSW, because it is an approximate method that is much faster than exhaustive KNN on large indexes."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn meaning map with some notes already placed and ask them to place the remaining notes and explain one choice.",
   "Extend: Ask fast finishers to draft the JSON definition of a vector field in an Azure AI Search index, naming the type, dimensions and profile, and to explain what changes if the embedding model changes."
  ]
 },
 {
  "t": "Prompt flow in Azure AI Foundry: flows, nodes, connections, variants and deployment",
  "objectives": [
   "Students will be able to identify the LLM, Prompt and Python tools and describe how nodes pass data in a flow.",
   "Students will be able to choose between standard, chat and evaluation flows for a scenario.",
   "Students will be able to explain the purpose of connections, variants and managed online endpoints.",
   "Students will be able to use tracing output to locate the step that caused a bad answer."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Sketch a student's multi-step process as boxes and arrows."
   ],
   [
    12,
    "Teach",
    "Introduce flows, nodes and tools using a projected diagram of a RAG chat flow. Cover the flow.dag.yaml file, the three flow types, connections, variants, deployment and tracing."
   ],
   [
    18,
    "Activity",
    "Run Build a Flow on Paper below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions and connect answers to evaluation and environment promotion."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "Think about making a sandwich for someone with allergies. List the steps. Which steps depend on the result of an earlier step?",
  "activity": {
   "title": "Build a Flow on Paper",
   "materials": "Printed node cards (LLM, Prompt, Python, Index Lookup, Content Safety), arrow cards, connection cards, a printed trace excerpt with node inputs, outputs and timings, whiteboard.",
   "steps": [
    "In groups, students receive a scenario: a chat assistant answering HR policy questions with sources.",
    "Groups lay out node cards and arrows to build the flow, choose the flow type and label every input and output.",
    "Groups attach connection cards to the nodes that call external resources and explain why no keys appear on node cards.",
    "Groups add a variant card to the answer node describing two prompt versions and write how they would compare them with an evaluation flow.",
    "The teacher hands out a printed trace of a bad answer. Groups find the node where the problem started, using the inputs and outputs shown, and propose a fix.",
    "Each group states how the finished flow would be exposed to the HR portal."
   ]
  },
  "discussion": [
   "How do connections make it easier to move a flow from a test environment to production?",
   "What would you include in a test dataset before comparing two variants?"
  ],
  "exit": [
   [
    "Which flow type has built-in chat history?",
    "A chat flow."
   ],
   [
    "What feature lets one LLM node hold several prompt versions for comparison?",
    "Variants."
   ],
   [
    "Where do you deploy a finished flow so an app can call it as an API?",
    "A managed online endpoint."
   ]
  ],
  "differentiation": [
   "Support: Provide a partly completed flow diagram with node types labeled and ask struggling students to add the arrows, flow type and connections.",
   "Extend: Ask fast finishers to write a short Jinja prompt template for the answer node that inserts the question and retrieved sources, and to describe what the evaluation flow would measure."
  ]
 },
 {
  "t": "Evaluating generative AI apps: groundedness, relevance, coherence, fluency and safety evaluations",
  "objectives": [
   "Students will be able to define groundedness, relevance, coherence and fluency and match each to a described symptom.",
   "Students will be able to compare AI-assisted metrics with overlap metrics such as F1, BLEU and ROUGE.",
   "Students will be able to explain why safety evaluation requires simulated adversarial data and red teaming.",
   "Students will be able to outline an evaluation loop that uses a fixed dataset and inspects low-scoring rows."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about judging essays. Collect criteria on the board and group them."
   ],
   [
    12,
    "Teach",
    "Map the board criteria to the Foundry metrics. Explain AI-assisted judges, overlap metrics and their need for ground truth, and safety evaluators with adversarial simulation. Walk through the evaluation loop."
   ],
   [
    18,
    "Activity",
    "Run Be the Judge below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore judge reliability and production monitoring."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had to grade 500 short essays tonight, what criteria would you use, and how would you make sure your grading was fair from the first essay to the last?",
  "activity": {
   "title": "Be the Judge",
   "materials": "Printed sets of a question, a source passage and four candidate answers (one ungrounded, one off topic, one jumbled, one good); rubric sheets with 1 to 5 scales; projector.",
   "steps": [
    "In pairs, students read the source passage and the question.",
    "For each of the four answers, pairs score groundedness, relevance, coherence and fluency on the rubric sheet, writing one sentence of reasoning per score.",
    "Pairs compare scores with another pair and discuss any score that differs by two or more points.",
    "The teacher projects a reference answer. Pairs count overlapping words for each candidate to simulate an overlap metric and note where it disagrees with their judgment.",
    "Each pair names which answer would be flagged by groundedness and what fix they would try first."
   ]
  },
  "discussion": [
   "Where did human judges disagree, and what does that suggest about trusting an AI judge without spot checks?",
   "Why might fluency stay high even when an app's answers become less trustworthy?"
  ],
  "exit": [
   [
    "A RAG answer includes a date that appears nowhere in the retrieved text. Which metric catches this?",
    "Groundedness."
   ],
   [
    "What do overlap metrics such as BLEU require?",
    "A ground-truth reference answer."
   ],
   [
    "Why are simulated adversarial conversations used in safety evaluation?",
    "Because ordinary test sets rarely include attacks, so you need them to measure how the app handles harmful or manipulative input."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching card set that pairs each metric name with a one-line symptom before they start the scoring task.",
   "Extend: Ask fast finishers to design a 20-item test dataset for a RAG assistant, including edge cases and the metrics they would apply, and to explain how they would decide whether a cheaper model is acceptable."
  ]
 },
 {
  "t": "Fine-tuning vs prompt engineering vs RAG: when each approach fits and how fine-tuning data is prepared",
  "objectives": [
   "Students will be able to diagnose whether a problem calls for prompt engineering, RAG or fine-tuning.",
   "Students will be able to explain the strengths and drawbacks of fine-tuning, including cost and inability to cite sources.",
   "Students will be able to construct a valid chat fine-tuning example in JSONL format.",
   "Students will be able to describe the role of training files, validation files and epochs in a fine-tuning job."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up scenario about training a new employee and collect answers."
   ],
   [
    12,
    "Teach",
    "Present the three approaches as a decision table on the board: problem, best tool, why. Show the JSONL example on the projector and explain training files, validation files, epochs and evaluation."
   ],
   [
    18,
    "Activity",
    "Run the Prescription Desk card sort and JSONL fix-up below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions about combining approaches."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on paper."
   ]
  ],
  "warmup": "A new employee keeps using the wrong tone with customers and also does not know this week's sale prices. Would one training session fix both problems? What would you do for each?",
  "activity": {
   "title": "The Prescription Desk",
   "materials": "Printed scenario cards (ten short business problems), three labeled zones on the whiteboard (Prompt, RAG, Fine-tune), printed JSONL lines with deliberate errors, student laptops with a browser for an optional online JSON validator.",
   "steps": [
    "Groups receive ten scenario cards, such as answers must cite the latest HR handbook or every reply must follow a strict legal template.",
    "Groups place each card in the zone for the first approach they would try and the approach they would add if that is not enough, writing the reason on a sticky note.",
    "The class reviews any card placed in different zones by different groups and agrees on the reasoning.",
    "Groups receive four JSONL training lines with errors, such as a missing assistant message, an array wrapping all lines, or a wrong role name, and correct them.",
    "Groups write one new valid training line for a scenario of their choice."
   ]
  },
  "discussion": [
   "What are the risks of fine-tuning before you have tried a strong prompt?",
   "How would you design a solution that uses all three approaches at once?"
  ],
  "exit": [
   [
    "A chatbot must quote prices that change daily and cite the price list. Which approach fits?",
    "RAG."
   ],
   [
    "Give one good reason to fine-tune.",
    "To get a consistent style or format that prompts cannot reliably achieve, to shorten long prompts, or to let a smaller model perform a narrow task at lower cost."
   ],
   [
    "What does each line of a chat fine-tuning JSONL file contain?",
    "One JSON object with a messages array of system, user and assistant messages."
   ]
  ],
  "differentiation": [
   "Support: Provide a flowchart with three questions (Is it missing facts? Is it a style problem prompts cannot fix? Otherwise?) to guide struggling students through the card sort.",
   "Extend: Ask fast finishers to plan a fine-tuning dataset of a few hundred examples for a support bot, describing how they would collect, review and split examples into training and validation files and how they would evaluate the result."
  ]
 },
 {
  "t": "Generating images and working with multimodal chat models that accept images",
  "objectives": [
   "Students will be able to distinguish image generation models from multimodal chat models and choose the right one for a scenario.",
   "Students will be able to describe the images API options and response formats, including the revised prompt.",
   "Students will be able to construct a chat message that combines text and image parts.",
   "Students will be able to justify when Document Intelligence or Azure AI Vision is a better fit than a multimodal model."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show two tasks on the projector: describe this photo and draw a poster. Ask which is harder for a computer and why."
   ],
   [
    12,
    "Teach",
    "Cover image generation (prompt, size, quality, style, URL or base64, revised prompt, content filters) and multimodal input (content parts, URL or data URL, detail setting). End with when to use purpose-built services."
   ],
   [
    18,
    "Activity",
    "Run Illustrator or Examiner below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions about cost and fit."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "If you needed to know what is in 10,000 photos, and also needed one brand-new poster, would you hire the same person for both jobs? Why or why not?",
  "activity": {
   "title": "Illustrator or Examiner",
   "materials": "Printed scenario cards, printed photos or projected images of everyday scenes, a printed skeleton of a chat request with blank content parts, paper and markers.",
   "steps": [
    "Pairs sort eight scenario cards into three piles: image generation model, multimodal chat model, or purpose-built service (Document Intelligence or Vision), writing a one-line reason for each.",
    "For one multimodal scenario, pairs fill in the request skeleton with a text part and an image part, choosing URL or base64 and low or high detail, and justify the choice.",
    "For one generation scenario, pairs write a detailed image prompt covering subject, setting, style, lighting and composition.",
    "Pairs swap prompts. The partner pair writes what they think a revised prompt might add, then sketches the expected image to test how specific the prompt was.",
    "The class compares sorting decisions and resolves disagreements."
   ]
  },
  "discussion": [
   "What would you weigh when choosing between a multimodal chat model and Document Intelligence for invoice processing?",
   "How should an app respond to users when an image prompt is refused by content filters?"
  ],
  "exit": [
   [
    "A team needs new illustrations for a brochure. What kind of model do they deploy?",
    "An image generation model such as DALL-E 3."
   ],
   [
    "How do you include an image in a chat completion request?",
    "Make the user content a list with a text part and an image_url part holding a URL or base64 data URL."
   ],
   [
    "Why should an app download a generated image soon after receiving its URL?",
    "The URL is temporary and stops working after a limited time."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column chart (makes a new picture versus understands an existing picture) to use while sorting scenarios.",
   "Extend: Ask fast finishers to estimate the relative cost impact of low versus high detail for a high-volume photo app and design a two-pass approach that uses high detail only when needed."
  ]
 },
 {
  "t": "Operating generative AI apps: token usage, rate limits, latency, tracing and monitoring",
  "objectives": [
   "Students will be able to identify the main drivers of token cost and propose ways to reduce them.",
   "Students will be able to explain HTTP 429 responses and the exponential backoff with jitter pattern.",
   "Students will be able to choose among more deployments, an AI gateway, provisioned throughput and batch deployments for a scaling scenario.",
   "Students will be able to distinguish what Azure Monitor metrics show from what tracing in Application Insights shows."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a crowded coffee shop and collect strategies."
   ],
   [
    12,
    "Teach",
    "Map the coffee shop strategies to token reduction, rate limits and backoff, gateways, provisioned throughput, batch, streaming and tracing. Show a sample 429 response with a retry-after header on the projector."
   ],
   [
    18,
    "Activity",
    "Run the On-Call Incident Drill below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions about trade-offs between cost and quality."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on sticky notes."
   ]
  ],
  "warmup": "A coffee shop has one barista and a line out the door. List every way you could serve customers faster or cheaper without hiring a new barista right away.",
  "activity": {
   "title": "On-Call Incident Drill",
   "materials": "Printed incident cards with symptoms, printed excerpts of a metrics summary and a trace showing step timings and token counts, whiteboard, timer.",
   "steps": [
    "In groups, students draw an incident card, such as 429 errors at peak, token bill doubled, first token takes six seconds, or wrong answers with no errors.",
    "Each group reads the metrics excerpt and the trace excerpt for its incident and identifies the evidence that points to the cause.",
    "Groups write an immediate mitigation and a longer-term fix, naming the specific feature, such as backoff, API Management, provisioned throughput, batch deployment, streaming, history trimming or fewer retrieved chunks.",
    "Groups present a 60-second incident summary to the class as if briefing a manager.",
    "The class votes on whether each fix addresses the root cause or only the symptom."
   ]
  },
  "discussion": [
   "When would you accept higher cost for better quality, and how would you measure that trade-off?",
   "Why is it useful for an AI gateway to enforce per-app token limits in a large organization?"
  ],
  "exit": [
   [
    "What does an HTTP 429 response mean, and how should a client respond?",
    "A rate limit was exceeded; retry with exponential backoff and jitter, honoring retry-after."
   ],
   [
    "Which option suits a large offline summarization job?",
    "A batch deployment."
   ],
   [
    "Which tool shows which step of a request caused a bad answer?",
    "Tracing, viewed in Application Insights through Azure AI Foundry."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a symptom-to-fix reference table to use during the incident drill, then have them explain one fix in their own words.",
   "Extend: Ask fast finishers to design an architecture with API Management in front of two regional deployments plus a batch deployment, describing how they would route traffic and what they would log."
  ]
 },
 {
  "t": "What an AI agent is: model, instructions and tools, and when an agent fits better than a plain chat app",
  "objectives": [
   "Students will be able to define an AI agent and explain how its decide-act-observe loop differs from a plain chat completion.",
   "Students will be able to name the three core components of an agent and describe the role of a thread.",
   "Students will be able to classify scenarios as agent tasks or plain chat completion tasks and justify the choice.",
   "Students will be able to recommend safeguards for agents that can take consequential actions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question comparing a brochure and a travel agent. Note the verbs students use."
   ],
   [
    12,
    "Teach",
    "Draw the agent loop on the whiteboard: request, decide, call tool, observe, repeat, answer. Label model, instructions and tools. Contrast with a single chat completion. Cover fit, risks and safeguards, then the Azure options."
   ],
   [
    18,
    "Activity",
    "Run Agent or Not, then the Agent Loop role-play below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions on autonomy and approval."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What can a travel agent do for you that a printed travel brochure cannot? List the actions, not just the information.",
  "activity": {
   "title": "Agent or Not, and the Agent Loop",
   "materials": "Printed scenario cards, printed tool cards (Order Lookup, Claims API, Send Email, Search Index), sticky notes, whiteboard.",
   "steps": [
    "Pairs sort twelve scenario cards into Agent and Plain Chat piles, writing the deciding verb on each card.",
    "The class reviews borderline cards, such as summarize this report and email it to my manager, and agrees on criteria.",
    "In groups of four, assign roles: User, Agent Brain, Tool Desk and Safety Officer. The User reads a multi-step request.",
    "The Agent Brain decides each next step aloud and requests a tool card; the Tool Desk returns a pre-written result. The group repeats until the task is done.",
    "The Safety Officer must approve any consequential action and can reject a step that uses a tool not needed for the task.",
    "Groups record how many loop iterations were needed and which step required approval."
   ]
  },
  "discussion": [
   "Which actions in your role-play should always require human approval, and why?",
   "How could an agent be tricked by instructions hidden in a document it reads, and what design choices limit the damage?"
  ],
  "exit": [
   [
    "What are an agent's three core components?",
    "Model, instructions and tools."
   ],
   [
    "Is classifying a single support ticket a good agent task? Why?",
    "No; it is a single text transformation, better as a plain chat completion."
   ],
   [
    "Give one safeguard for an agent that can send email on a user's behalf.",
    "Require human approval before sending, limit the tool's privileges, validate inputs or trace every step."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-question checklist (Does it need live data? Does it need to act? Does it need several steps?) to help struggling students sort scenarios.",
   "Extend: Ask fast finishers to write the instructions for a booking-change agent, listing its tools, the rules for when to ask for confirmation and when to hand off to a human."
  ]
 },
 {
  "t": "Azure AI Foundry Agent Service: agents, threads, messages and runs",
  "objectives": [
   "Students will be able to describe the agent, thread, message and run objects and how they relate.",
   "Students will be able to sequence the code steps for creating an agent and processing a conversation turn.",
   "Students will be able to interpret run statuses, including the action required for requires_action.",
   "Students will be able to explain data persistence and cleanup considerations, including the standard setup option."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a group chat and an assistant. Map answers to the four objects."
   ],
   [
    12,
    "Teach",
    "Draw the four objects on the whiteboard with arrows: agent defines behavior, thread holds messages, run processes. Walk through the code sequence and the run status path, emphasizing requires_action. Mention run steps and persistence."
   ],
   [
    18,
    "Activity",
    "Run the Run Status Relay below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions about design choices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "In a group chat, how would you set up a helper that only replies when you press a button? What would it need to remember, and where would that memory live?",
  "activity": {
   "title": "Run Status Relay",
   "materials": "Printed cards for each code step (create client, create agent, create thread, add message, create run, list messages), printed status cards (queued, in_progress, requires_action, completed, failed, cancelled, expired), a printed run-steps excerpt, whiteboard.",
   "steps": [
    "Groups shuffle the code-step cards and arrange them in the correct order for the first user turn, then rearrange to show the second turn, which reuses the same agent and thread.",
    "Assign roles: App, Agent Service and Function Server. The App adds a message and creates a run; Agent Service moves the run through status cards aloud.",
    "At a scripted point, Agent Service places requires_action and a function request. The App must pass the request to the Function Server, get a result and submit it, or the run moves to expired.",
    "Groups repeat once with the App deliberately ignoring requires_action and record what happens.",
    "Groups read the printed run-steps excerpt and identify which tool was called, with what arguments, and what it returned.",
    "Each group writes one rule their production app would follow for thread IDs and cleanup."
   ]
  },
  "discussion": [
   "Why might a company require the standard setup with its own storage and database rather than Microsoft-managed storage?",
   "How does keeping history in a thread change the app's job compared with calling the chat completions API directly?"
  ],
  "exit": [
   [
    "Which object holds the conversation history?",
    "The thread."
   ],
   [
    "What must the app do when a run reaches requires_action?",
    "Execute the requested function calls and submit the tool outputs."
   ],
   [
    "How do you send the second user turn in a conversation?",
    "Add a new message to the same thread and create a new run."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram with the four objects and the status path, and have them annotate it during the relay.",
   "Extend: Ask fast finishers to write pseudocode for a loop that polls a run, handles requires_action by calling local functions and submitting outputs, and stops on any terminal status."
  ]
 },
 {
  "t": "Agent tools: file search, code interpreter, Azure AI Search, OpenAPI and function calling",
  "objectives": [
   "Students will be able to distinguish knowledge tools (file search, Azure AI Search, Bing grounding) from action tools (code interpreter, function calling, Azure Functions, OpenAPI).",
   "Students will be able to select the correct Agent Service tool for a described business scenario and justify the choice.",
   "Students will be able to explain how function calling pauses a run in requires_action and why the application executes the function.",
   "Students will be able to write a clear tool description that helps the model choose the tool correctly."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question. Collect three or four answers aloud and write the abilities students name on the whiteboard, then group them into 'knowing things' and 'doing things'."
   ],
   [
    12,
    "Teach",
    "Walk through the two tool families. For each tool, say what it does, where the data lives and one scenario. Draw the function calling loop: model proposes call, run shows requires_action, app runs function, app submits output, run resumes. Stress that tool descriptions drive selection."
   ],
   [
    15,
    "Activity",
    "Run the tool-matching card sort in pairs. Circulate and ask pairs to defend any card they placed under two tools."
   ],
   [
    8,
    "Discuss",
    "Review contested cards as a class, then use the discussion questions to talk about descriptions and permissions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If you hired an assistant who could only talk, never look anything up, never use a calculator and never touch another system, what would they be bad at? Name three abilities you would give them first.",
  "activity": {
   "title": "Tool-matching card sort",
   "materials": "Printed scenario cards (about 12), six header cards (file search, Azure AI Search, Bing grounding, code interpreter, OpenAPI, function calling), sticky notes, whiteboard.",
   "steps": [
    "Before class, write 12 short scenarios on cards, such as 'chart monthly sales from an uploaded Excel file', 'answer from the existing HR index with per-user security', 'submit an order to a REST API that has a published spec'.",
    "Give each pair a set of scenario cards and the six header cards. Pairs place each scenario under the tool they would use.",
    "For each placement, pairs write a one-line reason on a sticky note attached to the card.",
    "Pairs then pick one scenario and write the tool name and description they would give the model, as if configuring the agent.",
    "Two pairs swap tables and check each other's sort, flagging any disagreements for the class discussion."
   ]
  },
  "discussion": [
   "Why might an agent with fifteen tools perform worse than one with four, even if all fifteen are useful somewhere?",
   "When would you rather keep logic in your own code with function calling than give the service an OpenAPI specification, even though the API has one?"
  ],
  "exit": [
   [
    "A team has 20 PDF files and no search infrastructure, and wants cited answers. Which tool?",
    "File search, which uploads the files to a vector store and returns answers with citations."
   ],
   [
    "What status does a run show when the model wants your app to execute a function?",
    "requires_action; the app runs the function and submits the tool output so the run continues."
   ],
   [
    "Why should tool descriptions be specific?",
    "The model chooses tools only from their names and descriptions, so vague descriptions cause wrong or missed tool calls."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-question flowchart (knowledge or action, then where does the data live) printed on a card to use during the sort.",
   "Extend: Ask fast finishers to design a three-tool agent for a scenario of their choice, write each tool's description and state the minimum permission each tool needs."
  ]
 },
 {
  "t": "Function calling: describing functions with JSON schema and handling tool calls in code",
  "objectives": [
   "Students will be able to write a function definition with a name, description and JSON schema parameters including required fields.",
   "Students will be able to trace the chat completions tool-call loop from finish_reason tool_calls to the follow-up request with tool messages.",
   "Students will be able to compare how tool calls surface in chat completions and in Agent Service runs (requires_action).",
   "Students will be able to identify validation and authorization checks needed before executing a model-proposed action."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up prompt. Take a few answers and note that the order slip is structured, not free text, which is the key idea of function calling."
   ],
   [
    13,
    "Teach",
    "Project the get_order_status JSON. Explain each field. Then draw the loop on the whiteboard: request with tools, response with tool_calls, app runs function, app appends assistant and tool messages with tool_call_id, second request, final answer. Mention tool_choice and the Agent Service requires_action equivalent."
   ],
   [
    15,
    "Activity",
    "Run the human function-calling role-play in groups of three."
   ],
   [
    7,
    "Discuss",
    "Debrief the role-play, focusing on the round where the 'user' tried manipulation, then the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "When you order food at a counter, why does the cashier type your order into a system with fixed buttons instead of writing down exactly what you said? What problems does that structure prevent?",
  "activity": {
   "title": "Human function-calling role-play",
   "materials": "Printed role cards (User, Model, App), printed function definition sheet for get_order_status and cancel_order, a printed 'order database' table, blank slips of paper.",
   "steps": [
    "Form groups of three and hand out role cards. The Model may only respond with either a final answer or a written tool-call slip containing an ID, function name and JSON arguments.",
    "The User asks three questions from a prompt card, including one that needs two orders checked at once.",
    "The App reads each slip, looks up the order database table, checks the order belongs to the User, and returns a result slip that repeats the tool call ID.",
    "In round four the User tries to cancel someone else's order. The App must decide what validation stops it and write the check as a sentence.",
    "Groups rotate roles once and repeat with the cancel_order function, which requires a confirmation step."
   ]
  },
  "discussion": [
   "Why do you think the arguments come back as a JSON string rather than as already-parsed values, and what does that mean for your code?",
   "If strict schema mode guarantees well-formed arguments, what risks still remain, and whose job is it to handle them?"
  ],
  "exit": [
   [
    "Name the three parts of a function definition.",
    "A name, a description, and parameters written as JSON schema (properties, types, required)."
   ],
   [
    "After running a requested function, what must the tool message include?",
    "The tool role, the matching tool_call_id and the function result, sent along with the assistant message that made the call."
   ],
   [
    "How do you guarantee the model calls one particular function?",
    "Set tool_choice to force that specific function."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed JSON definition with blanks for description, type and required, and a flow diagram of the loop to annotate during the role-play.",
   "Extend: Ask fast finishers to design a function with an enum parameter and two required fields, then write three validation checks the app must run before executing it."
  ]
 },
 {
  "t": "Building agents in code with Semantic Kernel, AutoGen and the Microsoft Agent Framework",
  "objectives": [
   "Students will be able to describe the roles of the kernel, AI services and plugins in Semantic Kernel.",
   "Students will be able to explain how KernelFunction attributes and automatic function calling expose app methods to a model.",
   "Students will be able to compare Semantic Kernel, AutoGen, the Microsoft Agent Framework and Agent Service for a given scenario.",
   "Students will be able to justify a hosted versus code-first agent design using control, hosting and provider flexibility."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers in two columns, 'rent' and 'build', then connect them to hosted versus code-first agents."
   ],
   [
    13,
    "Teach",
    "Sketch the kernel as a box holding a chat service and two plugins. Show a C# method with KernelFunction and Description attributes on the projector (pseudo-code is fine). Explain automatic function calling. Then summarize AutoGen and the Microsoft Agent Framework in one sentence each."
   ],
   [
    15,
    "Activity",
    "Groups run the framework consultancy activity using scenario cards."
   ],
   [
    7,
    "Discuss",
    "Groups present one recommendation each; class challenges it with the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "When a company needs office space, when would it rent a furnished office and when would it fit out its own? What does each choice trade away?",
  "activity": {
   "title": "Framework consultancy",
   "materials": "Printed client scenario cards (six), a printed comparison grid with rows for Agent Service, Semantic Kernel, AutoGen and Microsoft Agent Framework, whiteboard markers.",
   "steps": [
    "Groups of three or four each draw two client scenario cards, such as 'expose existing Java methods in our service' or 'prototype three debating agents for research'.",
    "Using the comparison grid, groups fill in what each option offers for hosting, control, multi-agent support and tools.",
    "Groups write a one-paragraph recommendation for each client, naming the option and at least two reasons.",
    "For any Semantic Kernel recommendation, groups sketch which plugin functions they would create and write a description for one of them.",
    "Groups post recommendations on the wall and do a gallery walk, leaving a sticky-note question on another group's poster."
   ]
  },
  "discussion": [
   "What risks come with keeping agent orchestration in your own code rather than in a managed service, and how would you reduce them?",
   "Why might a vendor merge two frameworks into one, and how should a team with an existing Semantic Kernel app respond?"
  ],
  "exit": [
   [
    "What does the kernel hold in Semantic Kernel?",
    "AI service connections, such as a chat completion service, and plugins."
   ],
   [
    "Which framework is most associated with multi-agent conversation prototypes?",
    "AutoGen."
   ],
   [
    "Give one reason to choose Agent Service over a framework.",
    "Managed state, built-in tools and little infrastructure to run, making it the fastest path to a working agent."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the kernel with services and plugins, and a sentence-starter template for recommendations ('We recommend X because...').",
   "Extend: Ask fast finishers to design a hybrid solution where a Semantic Kernel app uses a hosted Agent Service agent for file search, and explain where state lives."
  ]
 },
 {
  "t": "Multi-agent solutions: orchestration patterns, handoffs and connected agents",
  "objectives": [
   "Students will be able to explain why splitting a large agent into specialists improves reliability and testability.",
   "Students will be able to identify sequential, concurrent, handoff, group chat and magentic orchestration from scenario descriptions.",
   "Students will be able to describe how connected agents in Agent Service route work using names and descriptions.",
   "Students will be able to design a small multi-agent system with non-overlapping responsibilities and deterministic mandatory steps."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Write the student answers about what goes wrong when one person does every job, and map them to agent failure modes."
   ],
   [
    12,
    "Teach",
    "Draw each of the five patterns as a simple diagram with arrows. Then draw connected agents: a main agent with three specialists hanging off it as tools, contrasted with a handoff arrow that moves the user to another agent."
   ],
   [
    16,
    "Activity",
    "Run the human orchestration simulation, then groups design their own system on the whiteboard."
   ],
   [
    7,
    "Discuss",
    "Groups share designs; class critiques overlap in descriptions and unnecessary agents."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a time you called a company and were transferred three times. What went wrong, and what would have made the routing better?",
  "activity": {
   "title": "Human orchestration simulation and design",
   "materials": "Printed customer request cards (ten), printed specialist description cards, whiteboard, sticky notes.",
   "steps": [
    "Pick four volunteers as specialist agents and give each a description card (policy, claims, billing, address changes). One volunteer is the main agent and may route only by reading the description cards aloud.",
    "Read customer request cards one at a time. The main agent chooses a specialist; the class notes any misroutes caused by vague or overlapping descriptions.",
    "Rewrite any description that caused a misroute, then rerun those cards.",
    "In groups of four, students design a multi-agent system for a new scenario (for example a university help desk), choosing a pattern, naming each agent, writing its description and marking which steps must be deterministic.",
    "Groups draw their design on a section of whiteboard for the discussion."
   ]
  },
  "discussion": [
   "When would you choose a handoff instead of connected agents, given the effect on who talks to the user?",
   "How would you decide which steps should be deterministic code and which should be model-driven routing?"
  ],
  "exit": [
   [
    "Research, then draft, then review, always in that order: which pattern?",
    "Sequential orchestration."
   ],
   [
    "How does a connected agent setup differ from a handoff?",
    "With connected agents the main agent keeps control and uses specialists like tools; in a handoff control of the conversation moves to the other agent."
   ],
   [
    "Name one cost of adding another agent.",
    "More latency, more token use or another chance for routing error."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page pattern cheat sheet with a tiny diagram for each pattern to use while classifying scenarios.",
   "Extend: Ask fast finishers to add a test plan to their design that covers a clear route, an ambiguous request and an out-of-scope request for each specialist."
  ]
 },
 {
  "t": "Testing, securing and monitoring agents: tracing, human approval and least-privilege tools",
  "objectives": [
   "Students will be able to design an agent test set that includes normal, ambiguous, refusal and manipulation cases.",
   "Students will be able to apply least privilege and code-enforced limits to an agent's tools.",
   "Students will be able to explain where human-in-the-loop approval fits in the requires_action flow.",
   "Students will be able to use tracing concepts to locate the failing step in an agent run."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and collect first reactions. List the questions students would ask on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Cover the three pillars: test, secure, monitor. Draw the requires_action flow with a human approval box inserted before execution. Explain direct and indirect prompt injection at a recognition level and where Prompt Shields fit."
   ],
   [
    16,
    "Activity",
    "Pairs work through the trace investigation activity using printed trace excerpts."
   ],
   [
    7,
    "Discuss",
    "Pairs share their root cause and controls; class compares solutions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A new employee gets a company credit card on day one. What rules, limits and records would you set up before handing it over?",
  "activity": {
   "title": "Trace investigation",
   "materials": "Printed, teacher-made trace excerpts for a fictional refund agent showing spans (user message, model decision, tool call with arguments, tool result), highlighters, worksheet with three questions.",
   "steps": [
    "Hand each pair a trace excerpt from a fictional incident where a refund agent issued repeated refunds after reading a pasted message containing fake 'system notes'.",
    "Pairs highlight the span where behavior went wrong and the content that caused it, and label it as direct or indirect injection.",
    "Pairs list which controls would have stopped it: least-privilege tool scope, code-enforced limits, human approval, Prompt Shields.",
    "Pairs write three test cases to add to the evaluation set so this failure is caught before release.",
    "Each pair writes the code rule (in plain words) that would have blocked the fourteenth refund."
   ]
  },
  "discussion": [
   "Where is the line between actions that need human approval and actions an agent can safely take on its own?",
   "If tracing records arguments and results, what privacy concerns does that raise, and how would you handle them?"
  ],
  "exit": [
   [
    "Name two kinds of test cases beyond normal requests.",
    "Any two of: ambiguous requests needing a clarifying question, requests the agent should refuse, manipulation or injection attempts."
   ],
   [
    "Where should a refund limit be enforced, and why?",
    "In code, because instructions can be ignored or manipulated while code always runs."
   ],
   [
    "Which service receives agent traces from a Foundry project?",
    "Application Insights, using OpenTelemetry."
   ]
  ],
  "differentiation": [
   "Support: Provide a trace excerpt with the spans pre-labeled and a checklist of the four controls to match against the incident.",
   "Extend: Ask fast finishers to write an alert rule in plain language for unusual tool activity and decide what threshold and response it should trigger."
  ]
 },
 {
  "t": "Deploying agents and integrating them into applications",
  "objectives": [
   "Students will be able to explain how an application calls a hosted agent through the project endpoint using Entra ID and a managed identity.",
   "Students will be able to describe the application's responsibilities: thread mapping, runs, requires_action handling, streaming and rendering citations.",
   "Students will be able to compare deployment of hosted agents with framework-based agents on Azure compute services.",
   "Students will be able to design a promotion pipeline with an evaluation quality gate across dev, test and production."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list the differences between a test kitchen and a restaurant chain that students suggest."
   ],
   [
    12,
    "Teach",
    "Draw the architecture: user, web app with managed identity, project endpoint, agent, threads. Then draw a dev-test-prod pipeline with a quality gate. Contrast with a Semantic Kernel agent in a container on Container Apps. Briefly cover channels and the basic versus standard setup."
   ],
   [
    16,
    "Activity",
    "Groups whiteboard a deployment design for an assigned scenario."
   ],
   [
    7,
    "Discuss",
    "Groups present for one minute each; class asks the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A recipe works perfectly in your kitchen. What would have to change for 200 restaurants to serve it safely every day?",
  "activity": {
   "title": "Whiteboard a deployment",
   "materials": "Whiteboard or large paper per group, markers, printed scenario cards (college help desk, hospital with private data, nightly ticket digest, retail chatbot in Teams).",
   "steps": [
    "Each group of three or four draws one scenario card.",
    "Groups draw the runtime path: users, channel, app, identity, endpoint or host, and where thread IDs are stored.",
    "Groups add the release path: source control, dev, test and production projects, and the quality gate with two metrics they would check.",
    "Groups mark any enterprise requirements (private networking, data residency) and state basic or standard setup.",
    "Groups list one thing that could go wrong in production and how monitoring would reveal it."
   ]
  },
  "discussion": [
   "What could go wrong if a team edits production instructions directly, even with good intentions?",
   "When would you prefer an event-triggered background agent over a chat interface?"
  ],
  "exit": [
   [
    "How should a web app authenticate to a hosted agent?",
    "With Microsoft Entra ID, ideally a managed identity that has a role on the Foundry project."
   ],
   [
    "Why store the thread ID with the user's session?",
    "So later messages go into the same thread and the conversation continues."
   ],
   [
    "Name one Azure service you could host a framework-based agent on.",
    "Azure Container Apps, AKS, App Service or Azure Functions."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially drawn architecture diagram with labeled blank boxes for students to fill in.",
   "Extend: Ask fast finishers to add a rollback plan to their pipeline and describe how they would test a model version upgrade."
  ]
 },
 {
  "t": "Azure AI Vision Image Analysis: captions, dense captions, tags, objects, people and smart crops",
  "objectives": [
   "Students will be able to match a business requirement to the correct Image Analysis 4.0 feature (caption, dense captions, tags, objects, people, smart crops).",
   "Students will be able to interpret an Image Analysis JSON response, including confidence scores and bounding boxes.",
   "Students will be able to explain options such as gender-neutral captions, language and region availability.",
   "Students will be able to identify when a prebuilt model is insufficient and a custom model or another service is needed."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a busy street photo (any classroom-appropriate image). Run the warm-up and collect answers on the whiteboard in columns that secretly match caption, tags and objects."
   ],
   [
    12,
    "Teach",
    "Reveal the column names as feature names. Walk through each feature with what it returns. Show the Python snippet and a sample JSON response with a caption, tags and an object bounding box. Cover options, region support and the 3.2 versus Content Safety point."
   ],
   [
    15,
    "Activity",
    "Pairs do the human image analyzer activity with printed photos."
   ],
   [
    8,
    "Discuss",
    "Pairs share results and the class discusses confidence thresholds and the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at this photo for ten seconds. Write one sentence about it, then five single words about it, then list every object you could draw a box around. Which took longest, and why?",
  "activity": {
   "title": "Human image analyzer",
   "materials": "Printed photos (four per pair, any royalty-free or teacher-taken images), transparent sheets or tracing paper, markers, a printed requirement card set.",
   "steps": [
    "Each pair receives four photos and a stack of requirement cards such as 'alt text for a blog', 'count bikes in a rack', 'square thumbnail keeping the subject'.",
    "For each card, pairs name the Image Analysis feature they would request.",
    "Pairs then 'run' the feature by hand on one photo: write a caption, a list of tags with made-up confidence scores, or draw object and people boxes on the transparent sheet.",
    "Pairs write a sample JSON fragment for one feature, showing the field names they would expect (text, confidence, boundingBox).",
    "Pairs decide a confidence threshold for automatic cataloging and what happens to images below it."
   ]
  },
  "discussion": [
   "Why might a news organization prefer gender-neutral captions even when the model is confident?",
   "How would you decide where to set a confidence threshold for tags, and who should review the images below it?"
  ],
  "exit": [
   [
    "Which feature returns several region descriptions with bounding boxes?",
    "Dense captions."
   ],
   [
    "Does the People feature tell you who someone is?",
    "No, it only returns where people are in the image."
   ],
   [
    "What should you use for moderating adult imagery in a new solution?",
    "Azure AI Content Safety rather than Image Analysis 4.0."
   ]
  ],
  "differentiation": [
   "Support: Provide a feature cheat card with a one-line question each feature answers ('What is this whole image?', 'Where is each thing?') to use during the activity.",
   "Extend: Ask fast finishers to design a photo archive pipeline that combines three features and specifies thresholds and a human review step."
  ]
 },
 {
  "t": "Reading printed and handwritten text with the OCR (Read) feature of Azure AI Vision",
  "objectives": [
   "Students will be able to explain what OCR does and describe the block, line and word structure of a Read result.",
   "Students will be able to choose between Vision Read, Document Intelligence and the Azure AI Search OCR skill for a scenario.",
   "Students will be able to use word confidence scores to design a human review step.",
   "Students will be able to distinguish the synchronous Image Analysis 4.0 Read feature from the older asynchronous Read API."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hand out the warm-up images. Students transcribe them and note where they hesitated, which introduces confidence."
   ],
   [
    12,
    "Teach",
    "Explain OCR and the Read hierarchy. Project a sample Read JSON excerpt and point out a line polygon and a word confidence. Then compare Vision Read, Document Intelligence and the Search OCR skill with one scenario each. Mention the older Operation-Location polling pattern."
   ],
   [
    15,
    "Activity",
    "Pairs run the OCR result review activity."
   ],
   [
    8,
    "Discuss",
    "Class discusses thresholds and service choices using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here are three images: a printed street sign, a neat handwritten note and a messy handwritten note. Transcribe each one and mark any word you were not sure about. How would you tell a computer to handle the words you were unsure of?",
  "activity": {
   "title": "OCR result review",
   "materials": "Printed, teacher-made Read JSON excerpts for a shipping label (lines, words, confidence values), a printed list of five scenarios, highlighters.",
   "steps": [
    "Give each pair the JSON excerpt. Pairs highlight each line's text and circle every word with confidence below 0.8.",
    "Pairs write in plain words the code logic to find a tracking number pattern and flag low-confidence words for review.",
    "Pairs sort the five scenarios (label photo, 40-page contract, invoice totals, searchable scanned archive, whiteboard photo) into Vision Read, Document Intelligence or Search OCR skill.",
    "Pairs write one sentence justifying each choice.",
    "Pairs swap sorts with a neighbor and resolve any differences."
   ]
  },
  "discussion": [
   "Where would a wrong OCR reading be most costly in a real organization, and how would you design review for it?",
   "Why might raw OCR text be harder to use than structured fields, even when every word is correct?"
  ],
  "exit": [
   [
    "What does each word in a Read result include?",
    "Its text, a bounding polygon and a confidence score."
   ],
   [
    "Which service suits extracting totals and line items from invoices?",
    "Azure AI Document Intelligence."
   ],
   [
    "How do you make scanned files searchable during indexing?",
    "Add the built-in OCR skill to an Azure AI Search skillset."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the block, line and word hierarchy and a decision card with three questions (photo or document, need tables or fields, need search).",
   "Extend: Ask fast finishers to design a pipeline that uses Vision Read on label photos and Document Intelligence on paperwork, and define what triggers human review in each."
  ]
 },
 {
  "t": "Custom Vision: image classification (multiclass vs multilabel) vs object detection",
  "objectives": [
   "Students will be able to distinguish multiclass classification, multilabel classification and object detection by what each returns.",
   "Students will be able to select the correct Custom Vision project type for a scenario using location, count and exclusivity clues.",
   "Students will be able to explain when to choose a compact domain and why non-compact models cannot be exported.",
   "Students will be able to describe the roles of training and prediction resources."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up with three projected photos. Record whether students gave one label, several labels or pointed at locations."
   ],
   [
    12,
    "Teach",
    "Map the warm-up answers to multiclass, multilabel and object detection. Draw a decision flow on the whiteboard: location or count, then exclusivity, then offline. Explain domains, compact export and the two resource roles."
   ],
   [
    16,
    "Activity",
    "Groups run the photo labeling challenge."
   ],
   [
    7,
    "Discuss",
    "Groups compare labeling effort and project type choices; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at three photos: a single dog, a picnic table with many foods, and a parking lot. For each, what is the most useful thing a computer could tell you about it?",
  "activity": {
   "title": "Photo labeling challenge",
   "materials": "Printed photos (six per group: single items, mixed scenes, crowded shelves), sticky notes, markers, a printed scenario card for each photo set, a timer.",
   "steps": [
    "Give each group six photos and three scenario cards (for example 'sort into one category', 'tag every ingredient', 'guide a robot to each item').",
    "For each scenario, groups choose the project type and write it on a sticky note.",
    "Groups label the photos as the project type requires: one sticky label per photo for multiclass, several for multilabel, and a drawn box plus label for every instance for detection. Time each method.",
    "Groups compare how long each labeling method took and note the effort difference.",
    "Groups add a domain choice for each scenario and state whether it must be compact."
   ]
  },
  "discussion": [
   "How did the labeling time for object detection compare with classification, and how should that affect project choices?",
   "What would you tell a manager who wants an offline model but has already trained on a General domain?"
  ],
  "exit": [
   [
    "Each image belongs to exactly one category: which project type?",
    "Multiclass classification."
   ],
   [
    "Which project type tells you how many items are on a shelf?",
    "Object detection."
   ],
   [
    "What domain type is required to export a model?",
    "A compact domain."
   ]
  ],
  "differentiation": [
   "Support: Provide the three-question decision flowchart as a printed card and allow students to work through scenarios with it.",
   "Extend: Ask fast finishers to write two scenarios that are deliberately ambiguous between multilabel and object detection, and explain what extra detail would settle each."
  ]
 },
 {
  "t": "Training and evaluating a Custom Vision model: tagging images, iterations, precision, recall and mAP",
  "objectives": [
   "Students will be able to calculate precision and recall from a small set of prediction results.",
   "Students will be able to predict how raising or lowering the probability threshold changes precision and recall.",
   "Students will be able to explain iterations, the Negative tag, tag balance and image variety as levers for model quality.",
   "Students will be able to identify mAP as the summary metric for comparing object detection iterations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up smoke alarm question and write 'false alarm' and 'missed fire' on the board as the two failure types."
   ],
   [
    12,
    "Teach",
    "Explain the training loop, iterations and data quality levers. Define precision and recall with a worked example on the whiteboard. Show how the threshold shifts them. Introduce AP, mAP and IoU briefly."
   ],
   [
    16,
    "Activity",
    "Groups run the threshold slider game with printed prediction cards."
   ],
   [
    7,
    "Discuss",
    "Groups share their chosen thresholds and justify them by error cost."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "You can buy a smoke alarm that never gives false alarms but misses some fires, or one that never misses a fire but goes off when you make toast. Which would you put in a kitchen, and which in a server room? Why?",
  "activity": {
   "title": "Threshold slider game",
   "materials": "Printed prediction cards (20 per group), each showing an image description, the true label and a model probability; a printed threshold line from 0 to 1; calculators or phones.",
   "steps": [
    "Groups lay out the 20 cards in order of probability along the threshold line.",
    "Set the threshold at 0.5. Groups count true positives, false positives and false negatives, then calculate precision and recall.",
    "Move the threshold to 0.8 and then to 0.3, recalculating each time, and record results in a table.",
    "Groups are given a scenario (medical screening or public catalog tagging) and choose a threshold with a written justification.",
    "Groups identify two cards the model got wrong and suggest what new training images would help."
   ]
  },
  "discussion": [
   "In which real situations is a missed case much worse than a false alarm, and the other way around?",
   "Why does improving the data usually help more than changing training settings?"
  ],
  "exit": [
   [
    "Of 20 positive predictions, 15 were correct. What is precision?",
    "75 percent (15 of 20)."
   ],
   [
    "What happens to recall when you lower the threshold?",
    "It usually rises, because more true cases are flagged, while precision usually falls."
   ],
   [
    "Which metric summarizes object detection quality across tags?",
    "mAP, mean average precision."
   ]
  ],
  "differentiation": [
   "Support: Provide a confusion table template with labeled boxes for true positives, false positives and false negatives, plus the two formulas.",
   "Extend: Ask fast finishers to explain how a large imbalance between two tags would show up in the metrics and design a data plan to correct it."
  ]
 },
 {
  "t": "Publishing and consuming a Custom Vision model: prediction resource, published iterations and exporting compact models",
  "objectives": [
   "Students will be able to explain how publish names decouple apps from iteration numbers and enable updates and rollback.",
   "Students will be able to troubleshoot a 'retrained but no change' scenario by checking publication, name and resource keys.",
   "Students will be able to convert normalized bounding boxes into pixel coordinates.",
   "Students will be able to describe when and how to export compact models and the maintenance trade-off."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a shop window and connect it to publish names."
   ],
   [
    12,
    "Teach",
    "Draw the training resource and prediction resource side by side with their keys. Show iterations 4, 5, 6 with a 'productModel' label moving between them. Explain the prediction request and response, normalized boxes and export formats."
   ],
   [
    16,
    "Activity",
    "Pairs work the support ticket desk activity."
   ],
   [
    7,
    "Discuss",
    "Pairs share diagnoses; the class discusses the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A shop always shows 'This season's coat' in its window. The tailor makes a better coat in the back room. What has to happen before customers see it, and what would you do if customers hated it?",
  "activity": {
   "title": "Support ticket desk",
   "materials": "Printed teacher-made support tickets (six), each with a symptom and a short configuration excerpt (publish name, iteration list, key used, domain); printed image grids with dimensions; calculators.",
   "steps": [
    "Pairs receive six tickets, such as 'retrained but no change', 'unauthorized error on prediction call', 'cannot export model', 'boxes drawn in the wrong place'.",
    "For each ticket, pairs identify the root cause from the configuration excerpt.",
    "Pairs write the fix in one or two sentences, including whether a code change is needed.",
    "For the bounding box ticket, pairs convert the normalized values to pixels on the provided image grid and draw the corrected box.",
    "Pairs rank the tickets by how quickly each could be fixed and explain the ranking."
   ]
  },
  "discussion": [
   "What are the advantages and risks of exporting models to hundreds of devices instead of calling a published endpoint?",
   "How could publishing two iterations under different names help a team decide whether to switch models?"
  ],
  "exit": [
   [
    "The app shows no improvement after retraining. What is the most likely cause?",
    "The new iteration was not published under the publish name the app calls."
   ],
   [
    "A box has left 0.1 and width 0.5 on a 1000-pixel-wide image. Where does it start and how wide is it?",
    "It starts at 100 pixels and is 500 pixels wide."
   ],
   [
    "What is required before a model can be exported?",
    "It must be trained on a compact domain."
   ]
  ],
  "differentiation": [
   "Support: Provide a troubleshooting checklist (published, correct name, prediction key, compact domain for export) and a worked bounding box conversion.",
   "Extend: Ask fast finishers to design a safe rollout plan using two publish names and describe how they would distribute an exported model update to edge devices."
  ]
 },
 {
  "t": "Azure AI Face: face detection, attributes and Limited Access features",
  "objectives": [
   "Students will be able to distinguish face detection, verification and identification and give a use case for each.",
   "Students will be able to classify a requested face capability as available, Limited Access or retired.",
   "Students will be able to describe the identification workflow: enroll persons with face images, train where required, detect, then identify.",
   "Students will be able to recommend responsible practices, including consent, alternatives, data deletion and choosing the least sensitive feature."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect opinions on the board without judging them; return to them at the end."
   ],
   [
    12,
    "Teach",
    "Present three buckets on the whiteboard: available (detection, landmarks, image and pose attributes), Limited Access (verification, identification, find similar, grouping, liveness), retired (emotion, age, gender and similar). Explain why each bucket exists. Draw the identification workflow as four boxes."
   ],
   [
    15,
    "Activity",
    "Groups run the three-bucket card sort and approval role-play."
   ],
   [
    8,
    "Discuss",
    "Revisit the warm-up opinions and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Would you be comfortable if a shop camera counted how many people came in? What if it recognized you by name? What if it guessed your mood and age? Where would you draw the line, and why?",
  "activity": {
   "title": "Three-bucket sort and approval role-play",
   "materials": "Printed request cards (twelve face-related business requests), three bucket labels (Available, Limited Access, Retired), printed one-page mock intake form written by the teacher, sticky notes.",
   "steps": [
    "Groups sort the twelve request cards into Available, Limited Access or Retired, such as 'blur faces in footage', 'match selfie to ID', 'estimate shopper age'.",
    "For each Available card, groups name the feature; for each Retired card, groups propose a responsible alternative or explain why the goal should be dropped.",
    "Each group picks one Limited Access card and fills in the mock intake form: use case, consent approach, alternative for people who decline, data retention.",
    "Groups swap forms and act as reviewers, deciding whether the use case seems eligible and noting one question they would ask.",
    "Groups sketch the identification or verification workflow for their case in four boxes."
   ]
  },
  "discussion": [
   "Why do you think Microsoft retired emotion and age inference rather than simply warning developers about accuracy?",
   "What should an organization offer people who do not consent to face recognition, and why does that matter?"
  ],
  "exit": [
   [
    "Matching one face against a group of enrolled employees is which operation, and does it need approval?",
    "Face identification, which is a Limited Access feature requiring approval."
   ],
   [
    "Can you use the Face service to estimate a customer's age?",
    "No, age inference was retired along with emotion, gender and similar attributes."
   ],
   [
    "Name two attributes still returned by face detection.",
    "Any two of: head pose, glasses, occlusion, accessories, blur, exposure, noise, mask, quality for recognition."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column reference card listing examples in each bucket and the one-to-one versus one-to-many definitions.",
   "Extend: Ask fast finishers to write a short responsible use plan for a consent-based building entry system, covering enrollment quality checks, liveness, data deletion and demographic testing."
  ]
 },
 {
  "t": "Analyzing video with Azure AI Video Indexer",
  "objectives": [
   "Students will be able to list the main audio and visual insights Video Indexer produces and explain why time coding matters.",
   "Students will be able to describe the upload, asynchronous indexing and retrieval workflow, including widgets and the insights JSON.",
   "Students will be able to choose Video Indexer over Image Analysis or Custom Vision when a scenario involves recorded video with audio.",
   "Students will be able to identify which Video Indexer features require Limited Access approval and which customizations improve accuracy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how they would find one sentence inside a three-hour recorded meeting. Collect answers on the whiteboard and point out that each one requires watching or listening."
   ],
   [
    12,
    "Teach",
    "Walk through the account and storage setup, asynchronous indexing, the three ways to consume results (portal, JSON, widgets), and the audio and visual insight lists. Stress time coding, customizations and the Limited Access rule for face identification."
   ],
   [
    15,
    "Activity",
    "Run the insight-sorting activity in small groups, then have each group present one search scenario their insights would answer."
   ],
   [
    6,
    "Discuss",
    "Discuss service boundaries: when a scenario points to Video Indexer versus Image Analysis, Custom Vision or a live-camera design."
   ],
   [
    7,
    "Exit ticket",
    "Students answer the three exit questions on paper or in a shared form; review one answer aloud."
   ]
  ],
  "warmup": "You have a three-hour recorded town hall and need the exact moment the CEO mentioned the new parking policy. How would you find it without watching the whole recording?",
  "activity": {
   "title": "Audio, visual or not Video Indexer",
   "materials": "Printed cards (one capability or requirement per card), sticky notes, whiteboard divided into three columns.",
   "steps": [
    "Prepare about 20 cards such as 'spoken keywords', 'on-screen slide text', 'applause', 'brand logo on screen', 'classify a single product photo', 'count people live at a door', 'speaker labels', 'recognize a named employee'.",
    "Groups sort each card into Audio insight, Visual insight, or Not a Video Indexer task, and mark any card that needs Limited Access with a sticky note.",
    "Each group writes one search a user might run, such as 'find every slide that mentions budget while the CFO is speaking', and lists the insights that answer it.",
    "Groups compare columns; the teacher resolves disagreements and corrects any card placed in the wrong service."
   ]
  },
  "discussion": [
   "Why is Limited Access applied to face identification but not to transcription?",
   "When would an organization choose the Arc-enabled version of Video Indexer instead of the cloud service?"
  ],
  "exit": [
   [
    "Name one audio insight and one visual insight Video Indexer provides.",
    "Audio: transcript, speakers, keywords, topics, sentiment or audio effects. Visual: OCR, labels, scenes, shots, keyframes, faces or brands."
   ],
   [
    "How does an app know when indexing has finished?",
    "Indexing is asynchronous, so the app polls the video state or receives a callback, then retrieves the insights JSON."
   ],
   [
    "A requirement says to classify thousands of single product photos into your own categories. Is Video Indexer the right choice?",
    "No. Single images with custom categories point to Custom Vision; Video Indexer is for recorded video."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a two-column cheat sheet of audio and visual insights and have them highlight the time-coded part of each during the card sort.",
   "Extend: ask fast finishers to sketch a pipeline that indexes videos, pushes the insights JSON into a search index and embeds widgets in a portal, labeling each step."
  ]
 },
 {
  "t": "Choosing between prebuilt Image Analysis, Custom Vision and multimodal models for a vision task",
  "objectives": [
   "Students will be able to compare Image Analysis, Custom Vision and multimodal models on training needs, cost, consistency and offline use.",
   "Students will be able to identify when a specialist service such as Document Intelligence, Face, Video Indexer or Content Safety is the better choice.",
   "Students will be able to apply a decision path to select a vision option for a given business scenario and justify it.",
   "Students will be able to design a combined pipeline that uses a cheap prebuilt filter before a more expensive model."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let students vote by show of hands for each tool. Leave the votes on the board to revisit."
   ],
   [
    12,
    "Teach",
    "Present each option with its strengths and limits, then the specialist services. Draw the decision path on the whiteboard: prebuilt first, Custom Vision for own categories at scale or offline, multimodal for open-ended questions, and combinations."
   ],
   [
    15,
    "Activity",
    "Run the scenario auction: groups get scenario cards and must pick and defend a tool."
   ],
   [
    8,
    "Discuss",
    "Revisit the warm-up votes and discuss which constraints (volume, offline, measurable accuracy, changing questions) changed students' minds."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "A retailer wants to know which of its 1 million product photos show a person. Would you use Image Analysis, Custom Vision or a multimodal model, and why?",
  "activity": {
   "title": "Vision tool scenario auction",
   "materials": "Printed scenario cards (about 12), whiteboard with columns for Image Analysis, Custom Vision, Multimodal, Specialist, sticky notes.",
   "steps": [
    "Write scenario cards that vary volume, need for custom categories, offline use, open-endedness and document or face content, for example 'read totals from 5,000 invoices' or 'describe hazards in 20 photos'.",
    "In groups of three, students draw a card, decide the best option, and write a one-sentence justification on a sticky note naming the deciding constraint.",
    "Groups place sticky notes in the matching column; for any card, another group may 'challenge' with an alternative and a reason.",
    "The teacher resolves challenges, highlighting cases where a combined design or a specialist service is best."
   ]
  },
  "discussion": [
   "What risks come with using a multimodal model's free-text output in an automated decision, and how would you reduce them?",
   "How would you explain to a manager why the most powerful model is not always the right choice?"
  ],
  "exit": [
   [
    "Which option needs no training data and returns consistent JSON for general concepts?",
    "Prebuilt Image Analysis."
   ],
   [
    "A factory needs offline defect detection for its own part types on a line-side device. Which option?",
    "Custom Vision, with a compact model exported for edge deployment."
   ],
   [
    "Name two trade-offs of multimodal models for vision tasks.",
    "Higher cost per image, higher latency, variable outputs between runs, harder evaluation, and possible confident misreading of details (any two)."
   ]
  ],
  "differentiation": [
   "Support: give students a one-page decision flowchart with yes or no questions (Is it a general concept? Your own categories? Offline? Open-ended?) to use during the auction.",
   "Extend: ask fast finishers to estimate, in relative terms, how cost changes when a multimodal model processes every image versus only images pre-filtered by Image Analysis, and write a short recommendation."
  ]
 },
 {
  "t": "Azure AI Language text analysis: language detection, key phrases, entities, entity linking and sentiment with opinion mining",
  "objectives": [
   "Students will be able to explain what language detection, key phrase extraction, NER, entity linking and sentiment analysis each return.",
   "Students will be able to distinguish NER from entity linking and sentiment from opinion mining in exam-style scenarios.",
   "Students will be able to interpret a sentiment result, including mixed labels and opinion mining targets and assessments.",
   "Students will be able to design a prebuilt text analysis pipeline for a business problem such as review analysis."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project three short reviews and ask students to say, for each, what language it is in, what it is about, and whether it is positive or negative."
   ],
   [
    13,
    "Teach",
    "Introduce the analyze-text call and its kinds, then each feature with its output. Use the 'Mars' and 'Paris' examples for entity linking and a mixed review for sentiment and opinion mining."
   ],
   [
    15,
    "Activity",
    "Students act as the service in the human analyzer activity, producing JSON-like results by hand."
   ],
   [
    7,
    "Discuss",
    "Compare groups' results with what the real service would return; discuss country hints and mixed labels."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Read this review: 'Lovely staff, but the Wi-Fi kept dropping and breakfast was cold.' Is it positive or negative? What would a manager actually want to know from it?",
  "activity": {
   "title": "Be the Language service",
   "materials": "Printed sheets with eight short reviews in English and one or two other languages, colored pens, a projector showing a sample JSON response.",
   "steps": [
    "Assign each group one feature: language detection, key phrases, NER, entity linking or sentiment with opinion mining.",
    "Groups process all eight reviews by hand and write simplified JSON-like output, such as {\"sentiment\": \"mixed\", \"targets\": [...]} for their feature.",
    "Rotate the sheets so each group adds its feature to another group's output, building a full pipeline result per review.",
    "Show the sample real response on the projector and have groups mark where their output matched or differed."
   ]
  },
  "discussion": [
   "Why might a manager prefer opinion mining results over an average sentiment score?",
   "When could language detection be wrong, and how would a wrong answer affect later steps in a pipeline?"
  ],
  "exit": [
   [
    "A scenario needs to know whether 'Amazon' refers to the river or the company. Which feature?",
    "Entity linking."
   ],
   [
    "What two things does opinion mining return for each aspect?",
    "The target (the aspect, such as 'room') and the assessment with its sentiment (such as 'spacious', positive)."
   ],
   [
    "What does ISO 639-1 code 'fr' with confidence 0.98 tell you?",
    "Language detection judged the text to be French with high confidence."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a reference card listing each feature with a one-line 'question it answers' (What language? What about? Who or what? Which one? How do they feel? About what?).",
   "Extend: ask fast finishers to sketch the order of calls in a multilingual review pipeline, deciding where translation fits and which calls could be combined into one asynchronous job."
  ]
 },
 {
  "t": "Detecting and redacting personally identifiable information (PII) with Azure AI Language",
  "objectives": [
   "Students will be able to explain what PII detection returns, including entity categories, offsets, confidence scores and redactedText.",
   "Students will be able to configure detection with a categories filter, the phi domain and the conversational or container options for a scenario.",
   "Students will be able to distinguish PII detection from Content Safety and general NER.",
   "Students will be able to place redaction correctly in a data pipeline and name complementary privacy controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a fictional support chat on the projector and ask students to circle every piece of personal data they see."
   ],
   [
    12,
    "Teach",
    "Explain the PiiEntityRecognition call, the response fields, redaction policies, the categories filter, the phi domain, conversational PII and containers. Contrast with Content Safety and NER."
   ],
   [
    15,
    "Activity",
    "Run the redaction pipeline whiteboard activity in pairs."
   ],
   [
    8,
    "Discuss",
    "Discuss false negatives and false positives, and where each group placed redaction in its pipeline."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here is a short fictional chat between a customer and an agent. Circle every detail that could identify the customer. Which ones would you still want an analyst to see?",
  "activity": {
   "title": "Redact and route",
   "materials": "Printed fictional transcripts (no real personal data), highlighters, whiteboard, sticky notes labeled with pipeline stages (ingest, log, store, analytics, language model).",
   "steps": [
    "Pairs highlight each PII item in a transcript and label it with a likely category such as Person, PhoneNumber or Email.",
    "Each pair receives a requirement card, such as 'keep names, hide contact details' or 'clinical notes, must stay on premises', and writes the configuration: categories filter, domain, conversational or document, cloud or container.",
    "Pairs arrange the pipeline sticky notes on the whiteboard and place a 'PII redaction' note where it should run, justifying the position.",
    "The class reviews placements; the teacher highlights designs where raw text reaches logs before redaction."
   ]
  },
  "discussion": [
   "What would happen if PII detection missed a phone number written as words, and which other controls would limit the damage?",
   "Is it better to redact with asterisks or with category names for an analytics team, and why?"
  ],
  "exit": [
   [
    "Which response field contains the masked text?",
    "redactedText."
   ],
   [
    "What setting detects protected health information?",
    "Set the domain parameter to phi."
   ],
   [
    "A team must block hateful chat messages. Is PII detection the right feature?",
    "No. That is Azure AI Content Safety; PII detection masks personal data."
   ]
  ],
  "differentiation": [
   "Support: give students a two-column card listing 'personal data' examples versus 'harmful content' examples to anchor the PII versus Content Safety distinction.",
   "Extend: ask fast finishers to design a test plan for PII detection on real data, including how they would measure missed items and false positives and tune a confidence threshold."
  ]
 },
 {
  "t": "Translating text and documents with Azure AI Translator and Custom Translator",
  "objectives": [
   "Students will be able to construct a text translation request with api-version, optional from, multiple to parameters and the correct authentication headers.",
   "Students will be able to explain the batch document translation workflow, including Blob Storage containers and SAS tokens or managed identity.",
   "Students will be able to distinguish translate, transliterate, detect and dictionary lookup operations.",
   "Students will be able to decide when Custom Translator is justified and how a request selects it by category ID."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to translate a short phrase with a free online translator into two languages and note anything that went wrong, such as a brand name or technical term."
   ],
   [
    13,
    "Teach",
    "Walk through the translate request on the projector, highlighting from, multiple to values, the body, and the region header behind 401 errors. Then cover the other operations, document translation with Blob Storage, and Custom Translator with category IDs."
   ],
   [
    15,
    "Activity",
    "Run the 'fix the request' troubleshooting activity in pairs."
   ],
   [
    7,
    "Discuss",
    "Discuss when a glossary or dynamic dictionary is enough versus training a Custom Translator model."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Use a free online translator to translate 'Our StormShell jacket is rated for heavy rain' into French and German. What happened to the product name and the technical term?",
  "activity": {
   "title": "Fix the Translator request",
   "materials": "Printed request cards showing broken translate calls or job descriptions, a projector, whiteboard.",
   "steps": [
    "Prepare six cards, each with a flaw: a missing region header with a regional key, separate calls for each language, transliterate used to change language, a batch job without target container access, a custom model not used because category is missing, HTML tags getting translated.",
    "Pairs identify the flaw on each card and write the corrected parameter, header or step.",
    "Each pair presents one fix to the class and explains the symptom a user would have seen.",
    "The teacher summarizes the fixes on the whiteboard as a troubleshooting checklist."
   ]
  },
  "discussion": [
   "What risks come with publishing machine-translated legal or medical content without human review?",
   "How would you decide between a glossary file and a Custom Translator model for a company's terminology?"
  ],
  "exit": [
   [
    "How do you translate one string into Spanish and Japanese in a single call?",
    "Include two to parameters, to=es and to=ja, in the translate request."
   ],
   [
    "A call with a correct key to a regional resource returns 401. What is the likely fix?",
    "Add the Ocp-Apim-Subscription-Region header with the resource's region."
   ],
   [
    "What must you give Translator for batch document translation?",
    "Source and target Blob Storage containers and access to them through SAS tokens or a managed identity."
   ]
  ],
  "differentiation": [
   "Support: provide an annotated sample request where each part (endpoint, api-version, to, headers, body) is labeled with its purpose, and let students refer to it during the activity.",
   "Extend: ask fast finishers to outline how they would measure whether a Custom Translator model is better than the general model, using a held-out set of professionally translated sentences."
  ]
 },
 {
  "t": "Speech to text with Azure AI Speech: real-time, continuous and batch transcription",
  "objectives": [
   "Students will be able to choose between recognize once, continuous recognition, batch transcription and fast transcription for a given scenario.",
   "Students will be able to describe the SpeechConfig, AudioConfig and SpeechRecognizer setup and interpret result reasons.",
   "Students will be able to explain the roles of the recognizing, recognized, canceled and session_stopped events.",
   "Students will be able to name options that improve accuracy or usability, such as phrase lists, diarization and language detection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list three apps that turn speech into text and decide whether each handles a short command, a long live stream or recorded files."
   ],
   [
    13,
    "Teach",
    "Walk through the Python snippet on the projector, the result reasons, then continuous recognition events, batch transcription jobs and fast transcription. End with phrase lists and accuracy factors."
   ],
   [
    15,
    "Activity",
    "Run the live caption role-play followed by the method-matching cards."
   ],
   [
    7,
    "Discuss",
    "Discuss the two prototype bugs from the hook: only the first sentence captured, and Canceled results."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a voice assistant, a meeting captioning tool and a call-center archive. How is the audio different in each, and why might one method not suit all three?",
  "activity": {
   "title": "Be the recognizer",
   "materials": "Whiteboard, two markers, printed scenario cards, a short paragraph for a student to read aloud.",
   "steps": [
    "One student reads a paragraph aloud slowly. A second student at the whiteboard writes partial words as they hear them (recognizing) and a third rewrites each finished sentence neatly below (recognized).",
    "Repeat with the reader saying one command and stopping; the class notes that only one result is produced, as with recognize once.",
    "Groups then sort scenario cards (voice command, webinar captions, nightly call archive, one urgent voicemail) into recognize once, continuous, batch or fast transcription.",
    "Groups explain one choice each, and the teacher adds the event names and result reasons to the board."
   ]
  },
  "discussion": [
   "What privacy considerations apply when transcribing customer calls in bulk?",
   "When would a phrase list be enough, and when would you need a custom speech model?"
  ],
  "exit": [
   [
    "Which method suits a single spoken command in a kiosk app?",
    "recognize_once_async, which returns one result at the first pause."
   ],
   [
    "Which event should drive live captions, and why?",
    "recognizing, because it delivers interim partial text while the person is still speaking."
   ],
   [
    "How is batch transcription started and completed?",
    "Through a REST API job referencing stored audio files or a container, polled until it succeeds, then the JSON transcripts are downloaded."
   ]
  ],
  "differentiation": [
   "Support: give students a table with columns for audio type, length and method, pre-filled for one row, to complete during the activity.",
   "Extend: ask fast finishers to sketch pseudocode for continuous recognition that writes interim text to a caption box and appends final text to a transcript file, including handling the canceled event."
  ]
 },
 {
  "t": "Text to speech with neural voices and SSML for pronunciation, pauses, rate and style",
  "objectives": [
   "Students will be able to configure the Speech SDK for synthesis, including voice name, output to a file and result checking.",
   "Students will be able to match pronunciation, pacing and style problems to the correct SSML elements.",
   "Students will be able to read and correct a short SSML document.",
   "Students will be able to explain when plain text is sufficient and when SSML is required."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read aloud a phone message containing a date, a phone number and an abbreviation in a flat, rushed voice. Ask students what sounded wrong."
   ],
   [
    12,
    "Teach",
    "Cover neural voices, SpeechSynthesizer, AudioConfig to file, result reasons and batch synthesis. Walk through the SSML example line by line, then each element and the symptom it fixes."
   ],
   [
    16,
    "Activity",
    "Run the SSML director activity in pairs, with partners performing each other's markup."
   ],
   [
    7,
    "Discuss",
    "Discuss accessibility benefits and when a style could be inappropriate, such as cheerful delivery of bad news."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Listen to me read this message: 'Your appointment is on 10/14 at 3:30. Call 5550100. Bring your Rx.' What would a confused listener complain about?",
  "activity": {
   "title": "SSML director",
   "materials": "Printed message cards with problems, blank paper, a projector showing an SSML element reference, optional student laptops with a browser to view the Speech documentation's SSML examples.",
   "steps": [
    "Pairs receive a message card listing listener complaints, such as 'numbers read as one big number', 'too fast at the end', 'abbreviation read literally', 'name mispronounced'.",
    "Each pair writes SSML for the message using prosody, break, say-as, sub, phoneme or express-as, inside speak and voice elements.",
    "Pairs swap scripts and one student 'performs' the other's markup aloud exactly as written, which reveals missing or wrong tags.",
    "The class reviews two scripts on the projector and corrects any element misuse."
   ]
  },
  "discussion": [
   "How can SSML improve accessibility for listeners with hearing or cognitive difficulties?",
   "Which messages should never use an upbeat speaking style, and why does that matter for brand trust?"
  ],
  "exit": [
   [
    "Which element inserts a half-second pause?",
    "<break time=\"500ms\"/>."
   ],
   [
    "A voice mispronounces a medication name. What should you use?",
    "phoneme with a phonetic alphabet such as IPA, or a custom lexicon."
   ],
   [
    "Which result reason indicates successful synthesis?",
    "SynthesizingAudioCompleted."
   ]
  ],
  "differentiation": [
   "Support: give students a symptom-to-element card (too fast to prosody, needs pause to break, numbers to say-as, name to phoneme, abbreviation to sub, tone to express-as) to keep beside them.",
   "Extend: ask fast finishers to write a two-voice SSML dialogue for a customer service exchange that uses at least four different elements correctly."
  ]
 },
 {
  "t": "Speech translation, intent recognition and keyword recognition with the Speech SDK",
  "objectives": [
   "Students will be able to configure speech translation with SpeechTranslationConfig, a source language and multiple target languages.",
   "Students will be able to compare pattern matching and CLU for intent recognition and choose one for a scenario.",
   "Students will be able to explain how keyword recognition works on the device and why it reduces cost and protects privacy.",
   "Students will be able to design a voice assistant flow that chains keyword, recognition or translation, intent and synthesis."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how a smart speaker knows when to start listening and whether they think it records everything."
   ],
   [
    13,
    "Teach",
    "Present speech translation with the code snippet, the translations dictionary and spoken output options; then intent recognition by pattern matching and CLU; then keyword models, the .table file and verification."
   ],
   [
    15,
    "Activity",
    "Groups whiteboard a voice assistant pipeline for a scenario card and label each SDK class."
   ],
   [
    7,
    "Discuss",
    "Groups present; class critiques privacy and cost decisions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Does a smart speaker send everything you say in your kitchen to the cloud? What would you want it to do instead, and why?",
  "activity": {
   "title": "Design the voice assistant",
   "materials": "Whiteboard or large paper per group, markers, printed scenario cards (museum guide, hotel room assistant, factory floor helper, hospital bedside device), a printed list of SDK class names.",
   "steps": [
    "Each group draws a scenario card and lists its requirements: languages, type of commands, privacy limits.",
    "Groups draw the pipeline as boxes: wake word, capture, translation if needed, intent, response. They write the SDK class or service in each box, such as KeywordRecognizer, TranslationRecognizer, CLU, SpeechSynthesizer.",
    "Groups decide pattern matching or CLU for intents and write one sentence justifying it.",
    "Groups present in two minutes each; others ask one question about cost or privacy."
   ]
  },
  "discussion": [
   "What are the privacy benefits and limits of on-device keyword recognition?",
   "When might a company move from pattern matching to CLU, and what signals would tell them it is time?"
  ],
  "exit": [
   [
    "Which config class and method set up translation into French and German?",
    "SpeechTranslationConfig with add_target_language('fr') and add_target_language('de')."
   ],
   [
    "What file does Speech Studio generate for a custom keyword, and which class loads it?",
    "A .table model file, loaded with KeywordRecognitionModel."
   ],
   [
    "When is pattern matching a reasonable choice for intent recognition?",
    "When there is a small, fixed set of commands with predictable phrasing."
   ]
  ],
  "differentiation": [
   "Support: provide a partially completed pipeline diagram with class names in a word bank so students only need to place and justify them.",
   "Extend: ask fast finishers to identify failure points in their pipeline, such as a false wake or a low-confidence intent, and design how the assistant should respond to each."
  ]
 },
 {
  "t": "Conversational language understanding (CLU): intents, entities, utterances, training and deployment",
  "objectives": [
   "Students will be able to define intents, entities, utterances and the None intent and identify them in a sample sentence.",
   "Students will be able to choose the correct entity component (learned, list, prebuilt, regex) for a requirement.",
   "Students will be able to interpret evaluation metrics and a confusion matrix and propose data fixes.",
   "Students will be able to describe deployment and querying, including handling low-confidence predictions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write three customer messages on the board and ask students what each person wants and which details a pizza shop would need."
   ],
   [
    12,
    "Teach",
    "Explain intents, None, entity components with examples, utterance quality and balance, training types, evaluation metrics, the confusion matrix, named deployments and the prediction response."
   ],
   [
    16,
    "Activity",
    "Groups build a paper CLU project with sticky notes, then 'test' it with new utterances from another group."
   ],
   [
    7,
    "Discuss",
    "Review which test utterances failed and why; connect failures to None, balance and entity choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A customer types 'Can I get a big veggie pizza to 12 Elm Road for 6:30?' What does the customer want, and which pieces of information would the shop need to act on it?",
  "activity": {
   "title": "Paper CLU project",
   "materials": "Sticky notes in three colors (intents, utterances, entities), whiteboard or poster paper, printed test utterance cards.",
   "steps": [
    "Each group picks a domain (pizza ordering, gym bookings, library help) and writes three intents plus None on colored sticky notes.",
    "Groups write at least five varied utterances per intent, mark entity spans with a pen, and label each entity as learned, list, prebuilt or regex.",
    "Groups swap posters and the other group 'predicts' the intent and entities for six new test cards, including one out-of-scope message.",
    "Groups tally correct and incorrect predictions into a simple confusion grid and suggest which utterances to add."
   ]
  },
  "discussion": [
   "Why might a model that scores well in testing still perform poorly with real customers?",
   "What should a bot do when the top intent's confidence is low, and how does that affect user trust?"
  ],
  "exit": [
   [
    "Which entity component fits order numbers like ORD-12345?",
    "A regular expression entity."
   ],
   [
    "The model sends 'tell me a joke' to OrderPizza. What is the most likely fix?",
    "Add varied out-of-scope examples to the None intent and retrain."
   ],
   [
    "What does a confusion matrix show?",
    "Which intents (or entities) the model mixes up, comparing predicted with actual labels."
   ]
  ],
  "differentiation": [
   "Support: provide a four-row reference card for entity components with one example each, and pre-written utterances students only need to label.",
   "Extend: ask fast finishers to explain how they would use staging and production deployments to roll out a retrained model safely, and when they would add an orchestration workflow."
  ]
 },
 {
  "t": "Custom question answering: projects, sources, multi-turn prompts, synonyms and confidence thresholds",
  "objectives": [
   "Students will be able to describe how a custom question answering project is created from sources, including the Azure AI Search requirement and chit-chat.",
   "Students will be able to distinguish alternate questions, synonyms, metadata and follow-up prompts and apply each correctly.",
   "Students will be able to explain how the confidence threshold and default answer affect bot behavior and tune them for a scenario.",
   "Students will be able to identify when to combine question answering with CLU in an orchestration workflow."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students about a frustrating FAQ bot they have used and what it did wrong."
   ],
   [
    12,
    "Teach",
    "Cover project setup, the Azure AI Search dependency, sources and chit-chat, alternate questions, metadata, synonyms, follow-up prompts and context-only, deployment and query settings, active learning and orchestration."
   ],
   [
    16,
    "Activity",
    "Run the human FAQ bot role-play with threshold cards."
   ],
   [
    7,
    "Discuss",
    "Discuss where the threshold should sit for different audiences and the cost of wrong answers versus 'I don't know'."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a chatbot that gave you a wrong or useless answer. Would you rather it had said 'I don't know'? Why or why not?",
  "activity": {
   "title": "Be the FAQ bot",
   "materials": "Printed FAQ sheet (about 10 question and answer pairs for a fictional school IT desk), index cards with user questions, cards showing confidence scores, whiteboard.",
   "steps": [
    "One student per group is the bot and holds the FAQ sheet; others read user questions from cards, including reworded questions, synonyms like 'MFA' and off-topic questions.",
    "For each question, the group agrees a confidence score from 0 to 1 and compares it with a threshold card (0.3, 0.5 or 0.8); below the threshold, the bot must give the default answer.",
    "Groups record which questions failed and decide the fix: alternate question, synonym, follow-up prompt, metadata or threshold change.",
    "Groups share their fixes on the whiteboard, and the class compares outcomes at each threshold."
   ]
  },
  "discussion": [
   "For a medical clinic's FAQ bot, would you set a higher or lower confidence threshold than for a pizza shop, and why?",
   "When does a business need both question answering and CLU, and how does orchestration help?"
  ],
  "exit": [
   [
    "Users say 'leave', 'PTO' and 'vacation' interchangeably. What should you configure?",
    "Project-level synonyms treating those words as equivalent."
   ],
   [
    "The bot answers unrelated questions with wrong answers. What two settings help?",
    "Raise the confidence threshold and set a default answer."
   ],
   [
    "How do you let the bot ask 'For email or VPN?' after a password question?",
    "Add follow-up prompts (multi-turn) linking the answer to the email and VPN pairs."
   ]
  ],
  "differentiation": [
   "Support: give students a matching card with four symptoms and four fixes (alternate questions, synonyms, follow-up prompts, threshold and default answer) to complete before the role-play.",
   "Extend: ask fast finishers to design an orchestration workflow for a campus bot that routes FAQ questions to question answering and booking requests to CLU, listing example utterances for each route."
  ]
 },
 {
  "t": "Custom text classification and custom named entity recognition",
  "objectives": [
   "Students will be able to choose between single-label classification, multi-label classification and custom NER for a scenario.",
   "Students will be able to describe the workflow from Blob Storage and labeling through training, evaluation and deployment.",
   "Students will be able to interpret precision, recall and F1 score and recommend data fixes for weak classes or entities.",
   "Students will be able to distinguish custom features from CLU, question answering and prebuilt NER."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show three short fictional emails and ask students to sort them into folders, noticing that one fits two folders."
   ],
   [
    12,
    "Teach",
    "Cover single-label versus multi-label, custom NER, the storage and labeling workflow, train-test splits, precision, recall, F1, the confusion matrix and deployment through analyze-text jobs."
   ],
   [
    16,
    "Activity",
    "Groups label a small document set, then score a 'model' prediction sheet and calculate precision and recall."
   ],
   [
    7,
    "Discuss",
    "Discuss which classes scored worst and what labeling changes would help."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here are three emails to a company. Put each in one folder: Billing, Technical or Sales. Is there one that does not fit just one folder? What does that mean for an automated sorter?",
  "activity": {
   "title": "Label, predict, score",
   "materials": "Printed packets of 12 short fictional support tickets and 3 short contract excerpts, highlighters, a printed 'model predictions' sheet, calculators or phones.",
   "steps": [
    "Groups label each ticket with one or more classes and highlight entity spans (such as Party and EffectiveDate) in the contract excerpts, agreeing a labeling rule when they disagree.",
    "Groups compare their labels with the printed model predictions and count true positives, false positives and false negatives for one class and one entity.",
    "Groups calculate precision and recall, and estimate F1, for those items.",
    "Each group recommends one data change (more examples, varied wording, consistency fix) and states whether it would raise precision or recall."
   ]
  },
  "discussion": [
   "Why can inconsistent labeling between team members hurt a model more than having slightly fewer examples?",
   "When would you choose Document Intelligence instead of custom NER for extracting fields?"
  ],
  "exit": [
   [
    "A document can belong to several categories or none. Which project type?",
    "Multi-label custom text classification."
   ],
   [
    "A custom NER entity has low recall. What does that mean, and what is a typical fix?",
    "The model misses many real instances; add more varied, consistently labeled examples and retrain."
   ],
   [
    "Which feature extracts standard types like Person and Location without training?",
    "Prebuilt named entity recognition."
   ]
  ],
  "differentiation": [
   "Support: give students a worked example of precision and recall with small numbers and a feature-choice flowchart (short utterance, FAQ, whole document, fields in document, standard entities).",
   "Extend: ask fast finishers to explain how an automatic versus manual train-test split could change the evaluation results, and when a manual split is the better choice."
  ]
 },
 {
  "t": "Custom speech models and custom neural voice: when to train them and responsible use limits",
  "objectives": [
   "Students will be able to choose between prebuilt models, phrase lists, plain text training and audio training for a recognition problem.",
   "Students will be able to calculate word error rate and use it to compare base and custom models.",
   "Students will be able to explain the Limited Access and consent requirements for custom neural voice and why they exist.",
   "Students will be able to identify responsible use practices for synthetic voices, such as disclosure and scope limits."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Play or read a short sentence with jargon and ask students to guess how a speech recognizer might mangle it."
   ],
   [
    12,
    "Teach",
    "Cover custom speech data types, WER with a worked example, custom endpoints and phrase lists, then custom neural voice, Limited Access, the consent statement, personal voice and responsible use."
   ],
   [
    15,
    "Activity",
    "Pairs compute WER from transcripts, then run the voice request review role-play."
   ],
   [
    8,
    "Discuss",
    "Discuss the ethics of synthetic voices and what disclosure should look like."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Imagine a phone call from a voice that sounds exactly like your manager asking you to approve a payment. What safeguards would you want companies that make synthetic voices to have?",
  "activity": {
   "title": "Score it, then approve it",
   "materials": "Printed reference transcripts and two 'model output' versions (base and custom) of the same 20-word sentences, pens, printed voice request cards, whiteboard.",
   "steps": [
    "Pairs mark substitutions, deletions and insertions in each model output against the reference and calculate WER for base and custom models.",
    "Pairs decide whether the custom model should replace the base model and state which training data type likely produced the improvement.",
    "Each pair then reads a voice request card (for example, 'clone a retired actor from old films', 'brand voice with a hired actor who consents', 'CEO voice for internal messages') and acts as a review board deciding what is required or whether to refuse.",
    "Pairs share decisions; the teacher records the requirements (Limited Access approval, recorded consent, studio recordings, scope, disclosure) on the board."
   ]
  },
  "discussion": [
   "Is disclosure that a voice is synthetic always necessary? Where might it matter most?",
   "Why does Microsoft check the consent recording against the training audio instead of accepting a signed form?"
  ],
  "exit": [
   [
    "A reference transcript has 50 words; the model makes 2 substitutions, 1 deletion and 2 insertions. What is the WER?",
    "(2 + 1 + 2) / 50 = 10 percent."
   ],
   [
    "Recognition fails because of heavy background noise. Which training data helps most?",
    "Audio recorded in that environment with human-labeled transcripts."
   ],
   [
    "Name two requirements before training custom neural voice.",
    "Limited Access approval from Microsoft and a recorded consent statement from the voice talent (plus studio recordings with matching scripts)."
   ]
  ],
  "differentiation": [
   "Support: provide a step-by-step WER worksheet with the counting categories pre-labeled and a decision ladder card (prebuilt, phrase list, plain text, audio, custom voice).",
   "Extend: ask fast finishers to draft a short responsible use checklist for a company deploying a custom neural voice, covering consent scope, disclosure, access control and handling misuse reports."
  ]
 },
 {
  "t": "Azure AI Search components: data sources, indexers, indexes, skillsets, service tiers, replicas and partitions",
  "objectives": [
   "Students will be able to describe the role of data sources, indexers, indexes and skillsets in an Azure AI Search pipeline.",
   "Students will be able to choose between adding replicas and adding partitions for a given performance or availability problem.",
   "Students will be able to calculate search units and state the replica counts required for read and read-write SLAs.",
   "Students will be able to compare the indexer (pull) model with the push API and select one for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard without judging them."
   ],
   [
    12,
    "Teach",
    "Draw the pipeline left to right: data source, indexer (with an optional skillset), index, optional knowledge store. Then draw a grid of replicas (columns) by partitions (rows) and explain throughput, availability, storage and search units. Cover tiers and the no-downgrade rule, then keys and Entra ID roles."
   ],
   [
    15,
    "Activity",
    "Run the Scale Doctor card activity described below, with pairs diagnosing each scenario card."
   ],
   [
    8,
    "Discuss",
    "Walk through the cards that split the room, especially SLA counts and push versus indexer, using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "Your company's search box is slow every Monday morning but fine the rest of the week. Would you make the index bigger, make more copies of it, or do something else? Why?",
  "activity": {
   "title": "Scale Doctor",
   "materials": "Printed scenario cards (8 to 10, one scenario each), whiteboard, markers, a projector showing the replica-by-partition grid.",
   "steps": [
    "Before class, write scenario cards such as: queries slow at peak but index is half full; index near storage limit; indexing takes all night; need a read-write SLA with one replica today; data lives in an on-premises system; want to drop from S2 to S1.",
    "Pairs draw three cards and, for each, write a prescription: add replicas, add partitions, change tier, switch to push, or other, plus the new search unit count.",
    "Each pair posts one prescription on the whiteboard grid and explains it in 30 seconds.",
    "The class challenges any prescription that would cost more without fixing the problem, and the teacher confirms the correct answer."
   ]
  },
  "discussion": [
   "Why do you think Microsoft ties the availability SLA to replica count rather than to the tier?",
   "When would the push API's extra coding effort be worth it compared with a scheduled indexer?",
   "How would you explain search unit billing to a manager who sees cost even on days with no queries?"
  ],
  "exit": [
   [
    "Name the component that crawls a data source and loads the index.",
    "The indexer."
   ],
   [
    "Queries are slow but the index has plenty of space. Replicas or partitions?",
    "Replicas, which add query throughput."
   ],
   [
    "How many search units do 2 replicas and 3 partitions use, and does that meet the read-write SLA?",
    "Six search units; it does not meet the read-write SLA, which needs at least three replicas."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page cheat sheet with the pipeline diagram and the two rules (replicas equal queries and uptime, partitions equal size and indexing), and let them work with a partner who reads scenarios aloud.",
   "Extend: Ask fast finishers to design a service for a fictional company with a stated query rate and data size, justify tier, replica and partition counts, and explain how they would migrate if they later needed a smaller tier."
  ]
 },
 {
  "t": "Designing a search index: key field, field attributes (searchable, filterable, sortable, facetable, retrievable), analyzers and suggesters",
  "objectives": [
   "Students will be able to match each field attribute (searchable, filterable, sortable, facetable, retrievable) to the query feature it enables.",
   "Students will be able to state the requirements for the key field and choose appropriate EDM data types.",
   "Students will be able to select an analyzer (standard, language or keyword) for a given field.",
   "Students will be able to explain when a suggester is needed and which schema changes require rebuilding an index."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list the features students name on the whiteboard."
   ],
   [
    13,
    "Teach",
    "Project a sample hotel index definition. Walk through the key field, data types and each attribute, linking every attribute to one of the warm-up features. Then explain analyzers with the 'running' and 'AB-1234' examples, suggesters, and the rule that most attribute changes need a rebuild."
   ],
   [
    15,
    "Activity",
    "Run the Schema Switchboard activity in small groups."
   ],
   [
    7,
    "Discuss",
    "Compare group schemas, focusing on fields where groups disagreed, using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "Open any shopping site you know in your head. List three things you can do on the results page besides typing a search, such as sort or narrow results.",
  "activity": {
   "title": "Schema Switchboard",
   "materials": "Printed field cards (about 10 fields for a fictional bookstore, such as id, title, description, genre, price, publishDate, isbn, coverVector, popularityScore), a printed list of required site features, sticky notes in five colors (one per attribute), whiteboard.",
   "steps": [
    "Give each group the feature list (for example, sort by price, genre sidebar counts, filter by year, autocomplete titles, exact ISBN search, do not show internal scores).",
    "Groups place colored sticky notes on each field card for the attributes it needs, choose its data type and write an analyzer choice on searchable fields.",
    "Groups mark which field is the key and which fields belong in the suggester.",
    "The teacher then announces a late change request, such as 'make price facetable', and groups decide whether it requires a rebuild and explain why."
   ]
  },
  "discussion": [
   "Why might a team deliberately leave some fields non-retrievable even if users never see the difference?",
   "How would you plan an index rebuild so the live site keeps working?",
   "What problems could arise from using the same analyzer for every field?"
  ],
  "exit": [
   [
    "A sidebar needs counts of hotels per city. Which attribute must the city field have?",
    "Facetable."
   ],
   [
    "Which analyzer suits a part-number field such as XJ-200-B?",
    "The keyword analyzer, which keeps the whole value as one token."
   ],
   [
    "What must exist in the index for the autocomplete endpoint to work?",
    "A suggester whose source fields were defined when those fields were created."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference card that pairs each query parameter ($filter, $orderby, facets, search, select) with its required attribute, and let students check each field against it.",
   "Extend: Ask students to add a scoring profile and a synonym map to their bookstore design and explain how each would change result ranking or matching."
  ]
 },
 {
  "t": "AI enrichment with built-in skills: document cracking, OCR, image analysis, entities and key phrases in a skillset",
  "objectives": [
   "Students will be able to describe the stages of the enrichment pipeline: document cracking, skills on the enrichment tree and output field mappings.",
   "Students will be able to select built-in skills (OCR, Merge, Image Analysis, entity recognition, key phrases, Text Split, embedding) for stated requirements.",
   "Students will be able to configure imageAction, skill context and an attached Azure AI services resource correctly.",
   "Students will be able to troubleshoot missing enriched data in an index."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hold up a printed scanned page and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Draw the pipeline on the whiteboard as a conveyor belt: cracking, normalized images, skills writing to the enrichment tree, output field mappings into the index. Show a short skillset excerpt on the projector and point out context, inputs and outputs. Finish with billing, incremental enrichment and debug sessions."
   ],
   [
    16,
    "Activity",
    "Run the Enrichment Tree Relay activity."
   ],
   [
    7,
    "Discuss",
    "Review the relay results and lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "This page is in our document library. Why can't a normal search find the words on it, and what would a computer need to do first?",
  "activity": {
   "title": "Enrichment Tree Relay",
   "materials": "Printed skill cards (OCR, Merge, Image Analysis, Entity Recognition, Key Phrases, Language Detection, Text Split, Embedding, Shaper), printed requirement sheets, large paper or whiteboard space per team, markers.",
   "steps": [
    "Give each team a requirement sheet, such as 'make scanned contracts searchable and filter them by organization'.",
    "Teams draw an enrichment tree starting at /document and place skill cards in order, writing each skill's context, inputs and outputs as paths.",
    "Teams add the indexer settings (imageAction) and the output field mappings needed to reach the index.",
    "Teams swap trees, and the receiving team hunts for one bug, such as a missing imageAction, a wrong context or a missing mapping, then returns it with a note."
   ]
  },
  "discussion": [
   "Which enrichment in your design adds the most value for users, and which is mostly a cost?",
   "How would incremental enrichment change the way you develop a skillset?",
   "What risks come with running PII detection or sentiment on documents at scale?"
  ],
  "exit": [
   [
    "Which indexer setting must be configured before OCR can work on scanned PDFs?",
    "imageAction set to generateNormalizedImages or generateNormalizedImagePerPage."
   ],
   [
    "What context would an OCR skill use to run once per extracted image?",
    "/document/normalized_images/*"
   ],
   [
    "How do enriched values get from the enrichment tree into the index?",
    "Through output field mappings on the indexer."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed pipeline diagram with blanks for the setting, two skills and one mapping, plus a word bank.",
   "Extend: Ask students to design a RAG-ready pipeline that chunks merged content with Text Split, creates embeddings and maps the chunks, and to explain why chunking comes before embedding."
  ]
 },
 {
  "t": "Custom skills: calling an Azure Function or web API from a skillset",
  "objectives": [
   "Students will be able to identify when a requirement calls for a custom Web API skill instead of a built-in skill.",
   "Students will be able to describe the custom skill request and response interface, including the values array, recordId, data, errors and warnings.",
   "Students will be able to configure a WebApiSkill's URI, inputs, outputs, batch size and authentication.",
   "Students will be able to apply design practices for scale and troubleshoot common custom skill failures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note the examples students give."
   ],
   [
    12,
    "Teach",
    "Project the request and response JSON side by side. Trace one record from the search service to the function and back, circling recordId each time. Explain batch size, timeout, parallelism, key versus managed identity authentication and how outputs join the enrichment tree."
   ],
   [
    15,
    "Activity",
    "Run the Human Custom Skill role-play."
   ],
   [
    8,
    "Discuss",
    "Debrief the role-play failures and lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of a piece of information about documents that only your school or workplace could add, such as an internal course code. Could a general AI service figure it out on its own?",
  "activity": {
   "title": "Human Custom Skill",
   "materials": "Index cards, markers, a timer, a projector showing the response format.",
   "steps": [
    "One student acts as the search service and writes a batch of three record cards, each with a recordId and a short text input.",
    "A pair acts as the custom skill and must return one output card per record within 60 seconds, copying the recordId and adding a data value (for example, a made-up department code) or an error entry.",
    "The teacher secretly instructs one round's skill pair to drop a record and another to renumber recordIds; the search service student must detect the problem.",
    "Rotate roles and repeat, then the class lists the rules a real function must follow."
   ]
  },
  "discussion": [
   "What are the trade-offs of a larger batch size for a custom skill?",
   "Why is returning per-record errors better than failing the whole request?",
   "How would you estimate the cost of a custom skill before indexing millions of documents?"
  ],
  "exit": [
   [
    "What skill type calls your own HTTPS endpoint during enrichment?",
    "The custom Web API skill (WebApiSkill)."
   ],
   [
    "What field links each response item to its input record?",
    "recordId."
   ],
   [
    "How can the search service call an Entra ID-protected function without a stored key?",
    "By using its managed identity to obtain an access token."
   ]
  ],
  "differentiation": [
   "Support: Give students a fill-in-the-blank JSON response template with the values, recordId, data, errors and warnings keys labeled.",
   "Extend: Ask students to write pseudocode for an idempotent, batch-aware function that returns per-record errors and to explain how they would choose batch size and timeout."
  ]
 },
 {
  "t": "Querying an index: simple and full Lucene syntax, OData filters, facets, sorting and paging",
  "objectives": [
   "Students will be able to distinguish simple and full Lucene query syntax and identify which features require queryType full.",
   "Students will be able to write OData filter expressions using comparison operators, collection lambdas, search.in and geo.distance.",
   "Students will be able to use facets, orderby, select, top, skip, count and highlight to shape a response.",
   "Students will be able to diagnose a failing query by checking attributes, analyzer, parser and paging."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show three broken queries from the hook on the projector and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Annotate the sample POST body on the projector, labeling each parameter as matching (search, queryType, searchMode, filter) or shaping (facets, orderby, select, top, skip, count, highlight). Compare simple and full syntax with examples and write the OData operator list on the board."
   ],
   [
    15,
    "Activity",
    "Run the Query Repair Shop activity in pairs."
   ],
   [
    8,
    "Discuss",
    "Review the trickiest repairs and lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here are three search requests that do not work. Without knowing any syntax yet, guess what each one is trying to do and what might be wrong.",
  "activity": {
   "title": "Query Repair Shop",
   "materials": "Printed cards, each with a requirement and a broken query (for example, a filter using >=, a fuzzy term with queryType simple, skip set to page numbers, orderby on a non-sortable field), a printed index schema showing field attributes, whiteboard.",
   "steps": [
    "Pairs draw a card and read the requirement and the broken query.",
    "Using the printed schema, pairs identify the bug category (parser, OData syntax, attribute, paging) and write the corrected query.",
    "Pairs swap cards with another pair to verify each other's fix.",
    "Each pair writes its best fix on the whiteboard, and the class votes on whether it fully meets the requirement."
   ]
  },
  "discussion": [
   "When would you prefer searchMode all over any, and what might users notice?",
   "Why are filters, rather than search terms, the right tool for security trimming?",
   "What risks come with exposing full Lucene syntax directly to end users?"
  ],
  "exit": [
   [
    "Which queryType is required for the query enginer~?",
    "full, because fuzzy search is part of the full Lucene syntax."
   ],
   [
    "Write a filter for documents with price less than or equal to 100 in the city Oslo.",
    "price le 100 and city eq 'Oslo'"
   ],
   [
    "What top and skip values return the fourth page of 25 results?",
    "top 25 and skip 75."
   ]
  ],
  "differentiation": [
   "Support: Provide an operator translation sheet (>= to ge, == to eq, && to and) and a paging table showing skip values for pages 1 to 5.",
   "Extend: Ask students to write a security-trimmed query that combines full-text search, a group-based filter, facets and highlighting, and explain each part to a partner."
  ]
 },
 {
  "t": "Semantic ranking, vector search and hybrid queries in Azure AI Search",
  "objectives": [
   "Students will be able to explain how BM25 keyword search, vector search and hybrid search differ and when each succeeds or fails.",
   "Students will be able to describe how Reciprocal Rank Fusion merges keyword and vector results.",
   "Students will be able to configure semantic ranking, including the semantic configuration and queryType semantic, and describe captions and answers.",
   "Students will be able to recommend a retrieval design for a RAG scenario and justify it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the two queries from the hook aloud and ask the warm-up question."
   ],
   [
    13,
    "Teach",
    "Draw two ranked lists (keyword and vector) for the same query on the whiteboard and show how RRF combines them by rank. Then draw a funnel: hybrid retrieves candidates, the semantic ranker reorders the top 50. Cover HNSW versus exhaustive KNN, vectorizers and the semantic configuration."
   ],
   [
    15,
    "Activity",
    "Run the Rank Fusion by Hand activity."
   ],
   [
    7,
    "Discuss",
    "Compare team results and lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "One user searches for an exact error code; another describes a problem in everyday words. Should the same search method serve both? Why or why not?",
  "activity": {
   "title": "Rank Fusion by Hand",
   "materials": "Printed sheets with a query and two ranked lists of eight fictional article titles (one keyword, one vector), a printed simplified RRF formula (score = sum of 1 divided by (60 plus rank)), calculators or student laptops, whiteboard.",
   "steps": [
    "Teams compute an RRF score for each article from its rank in each list and produce the merged order.",
    "Teams then act as the semantic ranker: they read the top five merged titles and short snippets and reorder them by how well they answer the query.",
    "Teams identify one article that appears in only one list and explain why it did or did not survive the fusion.",
    "Each team presents its final top three and explains which stage contributed most."
   ]
  },
  "discussion": [
   "Why do you think rank-based fusion is used instead of adding scores together?",
   "What kinds of queries in your own work would fail with vector search alone?",
   "How would you build an evaluation set to decide whether semantic ranking is worth its cost?"
  ],
  "exit": [
   [
    "What method merges keyword and vector results in hybrid search?",
    "Reciprocal Rank Fusion."
   ],
   [
    "Can semantic ranking surface a document the first-stage query did not return? Why?",
    "No, it only re-ranks the top results (up to 50) from the first stage."
   ],
   [
    "Name two things required to run a semantic query.",
    "A semantic configuration in the index and queryType semantic with the semanticConfiguration name in the request (on a tier where semantic ranking is enabled)."
   ]
  ],
  "differentiation": [
   "Support: Pre-fill the RRF calculations for half the articles and provide a diagram of the two-stage funnel to reference during the activity.",
   "Extend: Ask students to explain prefiltering versus postfiltering for vector queries and design a hybrid query that also applies security trimming."
  ]
 },
 {
  "t": "Knowledge store: projections to tables, objects and files in Azure Storage",
  "objectives": [
   "Students will be able to explain why a knowledge store is used alongside or instead of a search index.",
   "Students will be able to choose between table, object and file projections for a given consumer.",
   "Students will be able to describe the roles of the Shaper skill and projection groups.",
   "Students will be able to read a knowledge store definition and predict what it writes to Azure Storage."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers in two columns: search uses and other uses."
   ],
   [
    12,
    "Teach",
    "Show the enrichment tree feeding both an index and a knowledge store. Introduce the three projection types with a consumer for each, then explain shaping and projection groups. Project the JSON example and walk through what each line produces."
   ],
   [
    15,
    "Activity",
    "Run the Projection Planner activity in small groups."
   ],
   [
    8,
    "Discuss",
    "Groups present designs and the class tests them against the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your search system has already pulled names, topics and moods out of 100,000 documents. Besides searching, who else in a company might want that data, and in what format?",
  "activity": {
   "title": "Projection Planner",
   "materials": "Printed consumer cards (finance dashboard in Power BI, data science notebook, image review team, CRM import), printed sample enrichment tree for one document, sticky notes in three colors for tables, objects and files, whiteboard.",
   "steps": [
    "Each group receives two consumer cards and the sample enrichment tree.",
    "Groups sketch a Shaper output with the fields their consumers need and choose projection types with colored sticky notes.",
    "Groups decide which projections belong in the same group and draw lines for joinable keys.",
    "Groups trade designs and predict the tables, containers and rows the other group's design would produce for one document."
   ]
  },
  "discussion": [
   "When would you run an indexer only to fill a knowledge store, without an index?",
   "What are the trade-offs between using a Shaper skill and inline shaping?",
   "How might sensitive enriched data, such as detected PII, change where and how you store projections?"
  ],
  "exit": [
   [
    "Which projection type best supports a Power BI report?",
    "Table projections."
   ],
   [
    "What makes rows in two projected tables joinable?",
    "Placing both projections in the same projection group so they share generated keys."
   ],
   [
    "Where is a knowledge store defined?",
    "In the skillset, with a storage connection and projections."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-row matrix mapping consumers to projection types and a pre-drawn Shaper output for students to complete.",
   "Extend: Ask students to write a full knowledge store JSON definition with two projection groups and explain what each group writes and why they are separate."
  ]
 },
 {
  "t": "Azure AI Document Intelligence prebuilt models: read, layout, invoice, receipt and ID document",
  "objectives": [
   "Students will be able to distinguish the read, layout and prebuilt scenario models by what each returns.",
   "Students will be able to select the correct prebuilt model (invoice, receipt, ID document) for a business scenario.",
   "Students will be able to describe the asynchronous analyze pattern with 202 Accepted, Operation-Location and polling.",
   "Students will be able to use confidence scores to design a human review step."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hand out a printed receipt and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Draw a ladder: read (text), layout (structure), prebuilt scenario models (named fields). Show sample outputs for each on the projector. Draw the async sequence: POST, 202 with Operation-Location, GET polling, succeeded. Explain confidence and the review threshold pattern."
   ],
   [
    15,
    "Activity",
    "Run the Model Matchmaker and Mock Analysis activity."
   ],
   [
    8,
    "Discuss",
    "Review the matches and lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at this receipt. If a computer read only the words on it, what would still be missing before an expense app could use it?",
  "activity": {
   "title": "Model Matchmaker and Mock Analysis",
   "materials": "Printed sample documents (an invoice, a receipt, a fictional ID card, a report page with a table, a handwritten note, a form with checkboxes), printed model cards (read, layout, invoice, receipt, ID document), a printed mock JSON result with fields and confidence scores, sticky notes.",
   "steps": [
    "Groups match each sample document to the best model card and write one sentence justifying each match.",
    "Groups receive the mock JSON result and highlight each field's value, type, location and confidence.",
    "Groups set a confidence threshold and sort the mock fields into auto-accept and human review piles.",
    "Each group acts out the async flow, with one student as the client and one as the service returning 202, running and succeeded."
   ]
  },
  "discussion": [
   "How would you choose a confidence threshold for automating invoice payments versus tagging archived letters?",
   "Why might an app use layout instead of read even when it only needs the text?",
   "What privacy considerations apply when processing ID documents?"
  ],
  "exit": [
   [
    "Which model returns checkboxes and tables but no named business fields?",
    "prebuilt-layout."
   ],
   [
    "Which model would extract MerchantName and Total from a photo of a receipt?",
    "prebuilt-receipt."
   ],
   [
    "After a 202 Accepted response, what should the client do?",
    "Poll the URL in the Operation-Location header with GET until the status is succeeded."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision flowchart (text only? structure? common document type?) for students to follow when matching models.",
   "Extend: Ask students to design an intake pipeline that uses layout markdown for RAG and the invoice model for payments, including how low-confidence fields reach a reviewer."
  ]
 },
 {
  "t": "Custom Document Intelligence models: template vs neural, custom classifiers and composed models",
  "objectives": [
   "Students will be able to describe the custom model training workflow in Document Intelligence Studio, including labeling and sample requirements.",
   "Students will be able to choose between custom template and custom neural models based on layout variability.",
   "Students will be able to explain the roles of custom classifiers and composed models in an intake pipeline.",
   "Students will be able to design an evaluation approach for a custom model."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show two different invoice layouts side by side and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Walk through the Studio workflow: storage container, labeling, training, model ID. Contrast template and neural with the mailroom analogy. Draw a pipeline: mixed PDF, classifier, extraction models, composed model, app. Close with evaluation practices."
   ],
   [
    15,
    "Activity",
    "Run the Intake Architect whiteboard design activity."
   ],
   [
    8,
    "Discuss",
    "Groups present and the class critiques designs using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "These two invoices contain the same kinds of information. If you taught a computer where the total is on the first one, would it find the total on the second? Why?",
  "activity": {
   "title": "Intake Architect",
   "materials": "Printed scenario cards (fixed internal forms, multi-vendor purchase orders, mixed loan packets, a mix of prebuilt and custom documents), whiteboard sections or large paper per group, markers, sticky notes labeled template, neural, classifier, composed and prebuilt.",
   "steps": [
    "Each group draws a scenario card describing incoming documents and the app's needs.",
    "Groups design the pipeline on the whiteboard using the labeled sticky notes, writing the number and variety of training samples they would collect.",
    "Groups add an evaluation plan: which test documents they would hold back and which metrics they would check.",
    "Groups rotate to another design and leave one improvement suggestion on a sticky note."
   ]
  },
  "discussion": [
   "Why do you think Microsoft recommends neural models as the default starting point?",
   "What are the operational benefits of hiding several models behind a composed model ID?",
   "How would you collect training samples that represent poor-quality real-world scans?"
  ],
  "exit": [
   [
    "Which custom model type suits a form whose layout never changes?",
    "A custom template model."
   ],
   [
    "What do you use to identify document types in a mixed PDF before extraction?",
    "A custom classification model."
   ],
   [
    "What is the main benefit of a composed model for application developers?",
    "The app calls one model ID for many form types, and components can be updated without changing the app."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision table with two questions (does the layout vary? are document types mixed?) mapping answers to template, neural, classifier and composed.",
   "Extend: Ask students to explain how they would combine prebuilt models with custom models in one intake flow and how the app would interpret the document type and confidence values in the result."
  ]
 },
 {
  "t": "Azure AI Content Understanding: extracting fields from documents, images, audio and video with analyzers",
  "objectives": [
   "Students will be able to describe an analyzer's components: content type, configuration options and field schema.",
   "Students will be able to classify fields as extract, generate or classify based on a requirement.",
   "Students will be able to write clear field descriptions that guide the model.",
   "Students will be able to choose between Content Understanding, Document Intelligence and Video Indexer for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Play or read a short fictional call transcript and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Explain analyzers and field schemas with the contact center example. Write the three methods on the board with two examples each. Show how descriptions act like prompts. Describe the async analyze call and grounding. Finish with a comparison table of Content Understanding, Document Intelligence and Video Indexer."
   ],
   [
    16,
    "Activity",
    "Run the Schema Workshop activity in small groups."
   ],
   [
    7,
    "Discuss",
    "Groups share schemas and the class critiques descriptions using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "After reading this call transcript, what three facts would a supervisor want recorded? Which of them are written word for word in the transcript, and which would someone have to figure out?",
  "activity": {
   "title": "Schema Workshop",
   "materials": "Printed sample content (a fictional call transcript, a photo printout of a damaged appliance, a scanned form, a short video storyboard), blank schema worksheets with columns for name, type, method and description, whiteboard.",
   "steps": [
    "Each group picks one sample and lists five fields a business would want from it.",
    "For each field, the group chooses a type and a method (extract, generate or classify) and writes a one-sentence description, listing categories for classify fields.",
    "Groups swap worksheets; the receiving group acts as the model and fills in values from the sample using only the descriptions, noting any field they could not answer clearly.",
    "Original groups revise their descriptions based on the feedback and state whether Content Understanding or another service fits best."
   ]
  },
  "discussion": [
   "What makes a field description good or bad, based on your swap results?",
   "Which fields in your schema would you never fully automate, and why?",
   "When might a team use both Content Understanding and Document Intelligence in the same solution?"
  ],
  "exit": [
   [
    "Which field method would you use for 'the call's topic: billing, repair or cancellation'?",
    "Classify."
   ],
   [
    "What does an analyzer contain?",
    "The content type, configuration options and a field schema of named, typed, described fields with methods."
   ],
   [
    "A team needs fields from audio, video and images with one service. Which service fits?",
    "Azure AI Content Understanding."
   ]
  ],
  "differentiation": [
   "Support: Provide a sorted example schema with one field of each method and a sentence starter for descriptions ('The ... as stated by ...').",
   "Extend: Ask students to design how Content Understanding output for videos would feed a RAG search index, including which fields become filterable and how timestamps are used for grounding."
  ]
 }
]);
