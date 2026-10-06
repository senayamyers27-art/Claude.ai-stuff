/* Teacher edition for AWS Certified Security – Specialty (SCS-C03): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("aws-security", [
 {
  "t": "Security monitoring strategy: deciding what to monitor per workload, CloudWatch metrics and alarms, and Route 53 health checks",
  "objectives": [
   "Students will be able to build a monitoring requirement list for a workload by mapping risks to signals and owners.",
   "Students will be able to explain how CloudWatch metrics, alarms, evaluation periods and composite alarms work.",
   "Students will be able to compare CloudWatch alarms, Route 53 health checks, CloudTrail, GuardDuty and Security Hub and choose the right one for a requirement.",
   "Students will be able to describe how Route 53 health checks support DNS failover and Shield Advanced health-based detection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without judging them. Point out that answers mix availability, configuration and threat concerns."
   ],
   [
    15,
    "Teach",
    "Walk through the three planning questions (what could go wrong, what would it look like, who needs to know). Draw a CloudWatch metric graph with a threshold line and show how evaluation periods and the three alarm states work. Add a composite alarm on the board. Finish with Route 53 health checks, failover and Shield Advanced health-based detection, then show the requirement-to-layer mapping table."
   ],
   [
    15,
    "Activity",
    "Run the monitoring plan card sort described below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Ask each group to share one signal they chose and one they rejected, and why. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Imagine you are the only person watching a credit union's online banking site overnight. Name one thing that could go wrong and how you would find out about it before a customer calls.",
  "activity": {
   "title": "Monitoring plan card sort",
   "materials": "Printed cards with risks (site down, slow responses, credential stuffing, bucket policy changed, instance mining cryptocurrency, encryption turned off), printed cards with signals (CloudWatch metric alarm, composite alarm, Route 53 health check, CloudTrail event, GuardDuty finding, Security Hub control), sticky notes and a whiteboard.",
   "steps": [
    "Give each group a fictional workload description: a public payments API or an internal data lake.",
    "Groups pick the four risks most relevant to their workload and pair each with the signal card that would detect it.",
    "For each pair, they write on a sticky note the threshold or condition and the owner who gets the alert.",
    "Groups mark any pair where they would use a composite alarm to reduce noise.",
    "Each group posts its plan on the whiteboard; the teacher checks for mismatches such as GuardDuty for downtime and asks the group to fix them."
   ]
  },
  "discussion": [
   "What is the cost of an alert that nobody owns, and how would you prevent that in a real team?",
   "When might an outside health check fail while every internal metric looks normal?",
   "How do you decide whether a signal should page a person at night or only appear on a dashboard?"
  ],
  "exit": [
   [
    "Which service would you use to detect that a public website stopped answering requests from the internet?",
    "A Route 53 health check, with a CloudWatch alarm on its status for notification."
   ],
   [
    "What problem does a composite alarm solve?",
    "It reduces noisy pages by alerting only when several alarms are in ALARM together."
   ],
   [
    "A requirement says 'find out who changed the bucket policy.' Which service provides that information?",
    "AWS CloudTrail, which records the API call, the identity, time and source IP."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column reference sheet that maps question words (down, slow, who, threat, one view) to services, and let them complete the card sort with it.",
   "Extend: Ask fast finishers to design a composite alarm rule in plain words for their workload and explain how they would treat missing data for an endpoint that stops reporting."
  ]
 },
 {
  "t": "AWS CloudTrail: management vs data events, organization trails, CloudTrail Lake and log file integrity validation",
  "objectives": [
   "Students will be able to distinguish management, data and Insights events and identify which type records a given action.",
   "Students will be able to explain how an organization trail protects logging from member account administrators.",
   "Students will be able to describe how log file integrity validation proves logs were not altered, and contrast it with encryption.",
   "Students will be able to choose between Event history, a trail and CloudTrail Lake for a retention or query requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student guesses for where the record of a file deletion would live."
   ],
   [
    15,
    "Teach",
    "Project a sample CloudTrail JSON event and label its key fields. Explain management, data and Insights events with examples, then Event history limits. Draw an organization with a management account, member accounts and a log archive bucket to show an organization trail. Explain digest files and validate-logs, and contrast with SSE-KMS. Close with CloudTrail Lake and a sample SQL question."
   ],
   [
    15,
    "Activity",
    "Students work in pairs on the event classification and investigation exercise below."
   ],
   [
    5,
    "Discuss",
    "Review the pairs' answers for the trickiest events and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students write answers to the three exit questions."
   ]
  ],
  "warmup": "Someone deleted 500 files from a storage bucket last night. Where would you expect to find a record of who did it, and what might stop that record from existing?",
  "activity": {
   "title": "Classify the event, then investigate",
   "materials": "A printed handout of 12 simplified CloudTrail events (eventName, eventSource, userIdentity, sourceIPAddress) including CreateUser, PutBucketPolicy, GetObject, DeleteObject, Invoke, StopLogging and DeleteTrail, plus a projector showing the same list.",
   "steps": [
    "Pairs label each event as management or data and note whether a default trail would capture it.",
    "Pairs circle any event that suggests someone is trying to hide activity, such as StopLogging or DeleteTrail.",
    "Using the handout, pairs reconstruct a short timeline of what the suspicious identity did and from which IP address.",
    "Pairs write one sentence explaining which control would have prevented the logging change (organization trail) and which would prove logs were untouched (integrity validation).",
    "The teacher reveals the answer key on the projector and pairs score themselves."
   ]
  },
  "discussion": [
   "Why might a company choose not to enable data events for every bucket, and what risk does that create?",
   "How would you explain to a non-technical auditor the difference between encrypting logs and validating them?",
   "When would CloudTrail Lake be a better choice than querying trail files with Athena?"
  ],
  "exit": [
   [
    "Is an S3 DeleteObject call a management event or a data event?",
    "A data event, so it is logged only if data events are enabled for that bucket."
   ],
   [
    "What feature lets you prove that CloudTrail log files were not modified or deleted?",
    "Log file integrity validation, checked with aws cloudtrail validate-logs against signed hourly digest files."
   ],
   [
    "What kind of trail logs all accounts in an organization and cannot be changed by member accounts?",
    "An organization trail."
   ]
  ],
  "differentiation": [
   "Support: Provide a cue card that says 'changes a setting = management, touches the contents = data' and walk through the first three events together before pairs continue.",
   "Extend: Ask fast finishers to write, in plain words, an advanced event selector that logs data events only for buckets whose names start with a sensitive prefix, and explain the cost benefit."
  ]
 },
 {
  "t": "Amazon GuardDuty: foundational data sources, protection plans, finding types and a delegated administrator for the organization",
  "objectives": [
   "Students will be able to name GuardDuty's foundational data sources and explain why they do not need to be enabled separately.",
   "Students will be able to match common detection needs to the correct GuardDuty protection plan.",
   "Students will be able to decode a GuardDuty finding type and describe a first response.",
   "Students will be able to design organization-wide GuardDuty coverage using a delegated administrator and auto-enable across Regions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers. Steer toward the idea that security tools often miss new accounts and unused Regions."
   ],
   [
    15,
    "Teach",
    "Explain foundational sources and the independent-stream fact. Present protection plans as a table of 'what it watches'. Break down one finding type name on the board, part by part. Draw an organization with a management account, a security tooling account as delegated administrator and member accounts in several Regions, and show auto-enable."
   ],
   [
    15,
    "Activity",
    "Groups complete the finding decoder and response exercise below."
   ],
   [
    5,
    "Discuss",
    "Groups share their first response for one finding; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your company creates a new AWS account every month for new projects. What could go wrong if security tools are switched on by hand in each one?",
  "activity": {
   "title": "Finding decoder and first response",
   "materials": "Printed cards, each showing one GuardDuty finding type name, a severity and a short detail line (for example a remote IP country or a domain name); a printed table of protection plans; sticky notes.",
   "steps": [
    "Give each group four finding cards, such as CryptoCurrency:EC2/BitcoinTool.B!DNS and UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration.OutsideAWS.",
    "Groups decode each name into threat purpose, resource type, threat family and detection mechanism, writing each part on a sticky note.",
    "For each card, groups decide which data source or protection plan most likely produced it.",
    "Groups write a first response step for each finding, such as isolating an instance or revoking role sessions, and note whether it could be automated through EventBridge.",
    "Each group presents one card to the class and the teacher corrects any misread names."
   ]
  },
  "discussion": [
   "Why might attackers prefer AWS Regions that a company does not normally use?",
   "What are the risks of creating too many suppression rules?",
   "Should GuardDuty findings trigger fully automatic responses, or should a person approve them first? When does each make sense?"
  ],
  "exit": [
   [
    "Name GuardDuty's three foundational data sources.",
    "CloudTrail management events, VPC Flow Logs and Route 53 Resolver DNS query logs."
   ],
   [
    "Which protection plan watches process and file activity on EC2, EKS and ECS workloads?",
    "Runtime Monitoring."
   ],
   [
    "How do you make sure new accounts get GuardDuty automatically?",
    "Designate a delegated administrator and turn on auto-enable for new organization members in every Region."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the finding type format with one fully decoded example so students can match each part of the other cards.",
   "Extend: Ask fast finishers to sketch an EventBridge event pattern in plain words that matches only high and critical GuardDuty findings for EC2 and sends them to an isolation runbook."
  ]
 },
 {
  "t": "AWS Security Hub: aggregating findings, security standards checks and cross-Region aggregation",
  "objectives": [
   "Students will be able to explain how Security Hub aggregates findings from multiple services in a common format.",
   "Students will be able to describe how security standards and controls produce findings and scores, and why AWS Config is required.",
   "Students will be able to configure, on paper, organization-wide Security Hub with a delegated administrator, central configuration and cross-Region aggregation.",
   "Students will be able to choose between insights, custom actions and automation rules for a workflow need."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch on the board the number of consoles a team would visit without an aggregator."
   ],
   [
    15,
    "Teach",
    "Draw source services feeding into Security Hub with ASFF in the middle. Explain standards, controls, scores and the AWS Config dependency. Add the delegated administrator, central configuration policies and the aggregation Region. Finish with insights, custom actions and automation rules, using one concrete example each."
   ],
   [
    15,
    "Activity",
    "Groups whiteboard an organization-wide design, then solve two short troubleshooting cards."
   ],
   [
    5,
    "Discuss",
    "Groups present their designs; ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your security team had to check six different tools in 25 accounts every morning, what would slip through the cracks?",
  "activity": {
   "title": "Design the single pane of glass",
   "materials": "Whiteboard or large paper per group, markers, two printed troubleshooting cards ('controls show no data in a new account' and 'sandbox findings drown out production findings').",
   "steps": [
    "Give each group a scenario: 20 accounts in three OUs (production, development, sandbox) across three Regions.",
    "Groups draw where the delegated administrator lives, which Region aggregates and which configuration policy applies to each OU.",
    "Groups label which source services feed findings in and where findings leave for automation through EventBridge.",
    "Groups solve the two troubleshooting cards, writing the cause and the fix (AWS Config recording; an automation rule).",
    "The teacher walks the room and asks each group to justify one design choice."
   ]
  },
  "discussion": [
   "Why might an organization apply different configuration policies to sandbox and production OUs?",
   "Is a high security score proof that an environment is secure? What can it miss?",
   "Which findings would you be comfortable handling with fully automatic rules, and which need a human?"
  ],
  "exit": [
   [
    "Which service must be recording for Security Hub controls to evaluate resources?",
    "AWS Config."
   ],
   [
    "What feature shows findings from all linked Regions in one Region?",
    "Cross-Region aggregation."
   ],
   [
    "Which Security Hub feature changes the severity of matching findings automatically when they arrive?",
    "An automation rule."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed diagram with the delegated administrator and source services already drawn, so they only add the aggregation Region and policies.",
   "Extend: Ask fast finishers to explain how Security Hub and Security Lake differ in purpose, and when an organization would use both."
  ]
 },
 {
  "t": "Log sources for detection: VPC Flow Logs, Route 53 Resolver query logs, S3 server access logs, and ELB and CloudFront access logs",
  "objectives": [
   "Students will be able to identify the fields contained in VPC Flow Logs, Resolver query logs, S3 server access logs, ELB, CloudFront and WAF logs.",
   "Students will be able to select the correct log source for a given investigative question.",
   "Students will be able to explain the limits of flow logs, including no payloads, no DNS names and no indication of which control rejected traffic.",
   "Students will be able to compare S3 server access logs with CloudTrail S3 data events for security use."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers. Note which answers name a log type and which name a vague 'logs'."
   ],
   [
    15,
    "Teach",
    "Project one sample record from each log type (flow log line, Resolver query entry, ALB access log line, WAF log snippet). Highlight the fields each contains and does not contain. Explain Traffic Mirroring as the only option for payloads, and contrast S3 server access logs with CloudTrail data events."
   ],
   [
    15,
    "Activity",
    "Pairs complete the 'which log answers it' investigation below."
   ],
   [
    5,
    "Discuss",
    "Walk through the hardest questions as a class and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An instance might be leaking data. You can open exactly one log. What would you want it to show you, and why?",
  "activity": {
   "title": "Which log answers it",
   "materials": "A printed packet with sanitized sample log lines (two flow log records, two Resolver query log records, two ALB access log lines, one WAF log excerpt) and a list of ten investigative questions; a projector for the answer key.",
   "steps": [
    "Pairs read each sample log and highlight the fields they recognize.",
    "For each of the ten questions, such as 'which domain did 10.0.2.15 look up' or 'which rule blocked this request', pairs name the log source and point to the field in the sample that answers it.",
    "Pairs mark any question that none of the samples can answer and write which capability would be needed, such as Traffic Mirroring for payloads.",
    "Pairs swap packets with another pair and check each other's answers.",
    "The teacher reveals the answer key and discusses any disagreement."
   ]
  },
  "discussion": [
   "Logging everything costs money. How would you decide which VPCs or buckets get the more detailed logs?",
   "Why might an attacker's activity appear in DNS logs before it appears anywhere else?",
   "What is the difference between seeing a threat in a log and stopping it, and which AWS features do the stopping?"
  ],
  "exit": [
   [
    "Which log shows the URL path and status code of each request to an Application Load Balancer?",
    "ELB (ALB) access logs."
   ],
   [
    "Can VPC Flow Logs show the contents of a packet? If not, what can?",
    "No; flow logs contain only metadata. VPC Traffic Mirroring captures packet contents."
   ],
   [
    "Which log records DNS names looked up by instances in a VPC?",
    "Route 53 Resolver query logs."
   ]
  ],
  "differentiation": [
   "Support: Give students a color-coded reference card showing one key field per log type (port and action, domain name, URL and status, rule ID) to use during the activity.",
   "Extend: Ask fast finishers to write a short investigation plan that combines three log sources to trace a suspected DNS tunneling incident from first alert to containment."
  ]
 },
 {
  "t": "Centralizing and analyzing logs: CloudWatch Logs Insights, Athena on S3, Amazon Security Lake and OpenSearch",
  "objectives": [
   "Students will be able to explain why logs are centralized in a log archive account and which controls protect them.",
   "Students will be able to choose between CloudWatch Logs Insights, Athena, OpenSearch Service and Security Lake for a given query need.",
   "Students will be able to describe how partitioning and columnar formats reduce Athena cost and time.",
   "Students will be able to describe what Security Lake does, including OCSF normalization, storage in customer-owned S3 and subscribers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the answers in two columns: 'need it now' and 'need it from long ago'."
   ],
   [
    15,
    "Teach",
    "Draw the log flow: workload accounts, subscription filters and trails, a log archive account and S3. Project a sample Logs Insights query and read it pipe by pipe. Show a simple Athena SQL query and explain partitions and Parquet. Add OpenSearch as the search-and-dashboard layer and Security Lake with sources, OCSF and subscribers."
   ],
   [
    15,
    "Activity",
    "Groups play the 'pick the tool' request desk role-play below."
   ],
   [
    5,
    "Discuss",
    "Review contested answers and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your manager needs an answer from last night's logs in five minutes, and an auditor needs an answer from logs a year old by Friday. Would you use the same approach for both? Why or why not?",
  "activity": {
   "title": "The log request desk",
   "materials": "Printed request cards (about 12, for example 'top blocked IPs in the last hour', 'who changed a security group last year', 'feed all accounts' logs to a SIEM in one format', 'dashboard of WAF blocks for the SOC'), four labeled table signs (Logs Insights, Athena, OpenSearch, Security Lake), and a whiteboard.",
   "steps": [
    "Assign four students to staff the tool tables; the rest of the class works in small groups as requesters.",
    "Each requester group draws a request card and decides which table to visit, then reads the request aloud to that table.",
    "The table staff accept or reject the request with a one-sentence reason, such as 'the data is in S3, not CloudWatch Logs'.",
    "Rejected requests are taken to another table; accepted ones are posted on the whiteboard under that tool.",
    "After two rounds, rotate staff and repeat with new cards; the teacher reviews the board for any misplacements."
   ]
  },
  "discussion": [
   "Why should a workload account administrator not be able to delete logs that have already been shipped to the log archive account?",
   "What are the trade-offs between building your own Athena pipeline and using Security Lake?",
   "How does a common schema like OCSF help analysts who work with many tools?"
  ],
  "exit": [
   [
    "Which tool would you use for an interactive query over the last hour of flow logs in CloudWatch Logs?",
    "CloudWatch Logs Insights."
   ],
   [
    "Name two ways to make Athena queries over large log archives cheaper.",
    "Partition the data (for example by date and account) and store it in a compressed columnar format such as Parquet."
   ],
   [
    "What schema does Security Lake normalize data to, and where is the data stored?",
    "OCSF, stored as Parquet in S3 buckets in the customer's own account."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart with two questions (Is the data in CloudWatch Logs or S3? Is it recent or long-term?) to use at the request desk.",
   "Extend: Ask fast finishers to write a Logs Insights query in plain pipe steps that finds the IAM principals with the most AccessDenied errors in CloudTrail logs, and explain each step."
  ]
 },
 {
  "t": "Alerting with Amazon EventBridge rules, SNS notifications and CloudWatch Logs metric filters",
  "objectives": [
   "Students will be able to explain how EventBridge rules, event patterns and targets route security events.",
   "Students will be able to create, in plain words, a CloudWatch Logs metric filter and alarm for a CloudTrail pattern.",
   "Students will be able to choose between EventBridge and a metric filter with an alarm for a given alerting requirement.",
   "Students will be able to troubleshoot common SNS delivery problems such as unconfirmed subscriptions and restrictive topic or key policies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort answers on the board into 'one event matters' and 'many events matter'."
   ],
   [
    15,
    "Teach",
    "Project a sample GuardDuty event JSON and an event pattern that matches it, pointing out source, detail-type and detail.severity. Show targets and a central event bus. Explain SNS topics, subscriptions, topic policies and confirmation. Then project a CloudTrail record, a metric filter pattern and an alarm threshold, and contrast the two paths."
   ],
   [
    15,
    "Activity",
    "Pairs complete the alert design workshop below."
   ],
   [
    5,
    "Discuss",
    "Pairs share one design; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Which would you rather be woken up for at 3 a.m.: one root user sign-in, or 50 failed API calls? Explain your choice.",
  "activity": {
   "title": "Alert design workshop",
   "materials": "A printed sheet of six alert requirements (root sign-in, high-severity GuardDuty finding, more than 20 AccessDenied errors in 5 minutes, security group change, console sign-in without MFA, StopLogging on the organization trail), two sample event JSON printouts, and blank design templates with boxes for 'source', 'match', 'path' and 'target'.",
   "steps": [
    "Pairs read each requirement and decide whether it calls for an EventBridge rule or a metric filter with an alarm.",
    "For two of the EventBridge items, pairs write the event pattern fields in plain words using the sample JSON as a guide.",
    "For one metric filter item, pairs write the filter condition, the metric name, the alarm threshold and the period.",
    "Pairs choose a target for each alert (SNS topic, Lambda, Systems Manager Automation) and list one permission the target needs.",
    "Pairs swap designs with a neighbor, who must find one possible failure point in the chain."
   ]
  },
  "discussion": [
   "What happens to an on-call team's trust in alerts if too many fire? How do thresholds help?",
   "Why might a company route all findings to a central event bus instead of handling them in each account?",
   "Which alerts would you send to a chat channel only, and which should page a person?"
  ],
  "exit": [
   [
    "Which service would you use to react immediately to a single high-severity GuardDuty finding?",
    "An Amazon EventBridge rule with an event pattern matching the finding, targeting SNS or an automation."
   ],
   [
    "What must be configured before a metric filter can count CloudTrail AccessDenied errors?",
    "CloudTrail must deliver to a CloudWatch Logs log group."
   ],
   [
    "Name one reason an SNS email alert might not be delivered.",
    "The subscription was not confirmed, the topic policy blocks the publisher, or the KMS key policy blocks the service."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in example design for one requirement so students can model the others on it, and pair them with a confident partner.",
   "Extend: Ask fast finishers to design a cross-account pattern where 30 accounts forward findings to a central bus, and to write in plain words the resource policy statement the central bus needs."
  ]
 },
 {
  "t": "Troubleshooting monitoring and logging: missing log delivery, bucket policies for log delivery and KMS key policies for encrypted logs",
  "objectives": [
   "Students will be able to apply an ordered troubleshooting method (destination, permissions, encryption, configuration) to missing logs.",
   "Students will be able to read a log bucket policy and identify whether a service principal can deliver logs.",
   "Students will be able to explain what a KMS key policy must allow for encrypted CloudTrail and CloudWatch Logs delivery.",
   "Students will be able to recommend the narrowest fix and a detective control to catch future logging failures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect guesses about why logs stop."
   ],
   [
    15,
    "Teach",
    "Introduce the four-step order. Project a sample log bucket policy with a service principal statement and aws:SourceArn condition, then a version with a broad organization deny. Show a CloudTrail key policy statement with the encryption context condition. Show sample get-trail-status output with LatestDeliveryError. Cover the flow logs IAM role and the CloudWatch Logs key policy."
   ],
   [
    15,
    "Activity",
    "Pairs work through the broken pipeline troubleshooting cases below."
   ],
   [
    5,
    "Discuss",
    "Pairs present one diagnosis; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A security camera has been recording to a hard drive that filled up three weeks ago. Nobody noticed. What does that teach us about logging in the cloud?",
  "activity": {
   "title": "Broken pipeline troubleshooting",
   "materials": "Printed case cards, each with a short symptom, a policy or status excerpt (bucket policy JSON, key policy JSON, get-trail-status output, flow log IAM role trust policy), and a blank 'diagnosis and fix' box; a projector for review.",
   "steps": [
    "Each pair receives four case cards, for example 'trail stopped after new KMS key', 'ALB logs stopped after bucket policy change', 'flow logs to CloudWatch Logs empty', 'trail shows IsLogging false'.",
    "Pairs apply the four-step order and write which step reveals the problem.",
    "Pairs underline the exact line in the excerpt that causes the failure.",
    "Pairs write the narrowest fix in plain words, naming the principal, action and condition.",
    "Pairs add one detective control that would have caught the failure sooner, then the teacher reviews answers on the projector."
   ]
  },
  "discussion": [
   "Why do broad deny statements in bucket policies and SCPs so often break log delivery?",
   "How would you make sure a change to a logging key or bucket policy is reviewed before it is applied?",
   "What signals would tell you that the logging pipeline itself is healthy every day?"
  ],
  "exit": [
   [
    "List the four troubleshooting steps for missing logs in order.",
    "Destination, permissions, encryption, configuration."
   ],
   [
    "What must a CloudTrail customer managed key policy allow?",
    "The cloudtrail.amazonaws.com principal to use kms:GenerateDataKey* (scoped with the trail's encryption context), and readers to use kms:Decrypt."
   ],
   [
    "Flow logs to CloudWatch Logs are empty. What do you check first for permissions?",
    "The IAM role's trust policy (vpc-flow-logs.amazonaws.com) and its logs permissions such as CreateLogStream and PutLogEvents."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a highlighted policy excerpt with the principal, action and condition already labeled, and work the first case together.",
   "Extend: Ask fast finishers to write a plain-language bucket policy statement that allows CloudTrail delivery from all organization accounts while blocking every other outside principal, and explain each condition."
  ]
 },
 {
  "t": "Incident response plans and runbooks on AWS: response phases, Systems Manager Automation runbooks and OpsCenter",
  "objectives": [
   "Students will be able to list the incident response phases in order and give an AWS example action for each.",
   "Students will be able to distinguish an incident response plan, a playbook and a runbook.",
   "Students will be able to describe how Systems Manager Automation runbooks are built and triggered, including approval steps.",
   "Students will be able to explain how OpsCenter OpsItems support tracking and fixing an incident."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers; highlight that most answers are about roles and order, not tools."
   ],
   [
    15,
    "Teach",
    "Write the phases across the board and add one AWS action under each. Show the nesting of plan, playbook and runbook. Project a short Automation document outline with executeAwsApi, approve and branch steps. Show the three triggers (person, EventBridge, Config remediation) and an OpsItem with linked runbooks."
   ],
   [
    15,
    "Activity",
    "Groups write a playbook and runbook outline for an assigned incident type, as described below."
   ],
   [
    5,
    "Discuss",
    "Groups compare which steps they automated and which needed approval; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If the fire alarm went off right now, how would everyone know what to do? What makes a fire drill work, and how is a cyber incident similar?",
  "activity": {
   "title": "Write the playbook, automate the runbook",
   "materials": "Printed incident scenario cards (public S3 bucket, compromised EC2 instance, leaked access key, logging turned off), a playbook template sheet with boxes for detection, roles, decision points and runbooks, sticky notes in two colors, and a whiteboard.",
   "steps": [
    "Each group draws one scenario card and fills in the playbook template: how it is detected, who leads, and one key decision point.",
    "Groups list five to seven runbook steps on sticky notes, one step per note.",
    "Using a second color, groups mark which steps an Automation runbook could do and which need an approval step or a human.",
    "Groups choose how the runbook starts (EventBridge rule, Config remediation or manual) and how the case is tracked (an OpsItem).",
    "Groups post their runbook on the whiteboard in order and the teacher checks that evidence is preserved before destructive steps."
   ]
  },
  "discussion": [
   "Which incident response steps should never be fully automated, and why?",
   "How would you keep a playbook current as your AWS environment changes?",
   "What makes a post-incident review blameless, and why does that matter for finding the real cause?"
  ],
  "exit": [
   [
    "List the incident response phases in order.",
    "Preparation; detection and analysis; containment, eradication and recovery; post-incident activity (learning)."
   ],
   [
    "What is a runbook, compared with a playbook?",
    "A runbook is the step-by-step procedure for a task; a playbook covers how to handle a whole type of incident and uses runbooks."
   ],
   [
    "Name one way to trigger a Systems Manager Automation runbook automatically and one way to include human judgment in it.",
    "Trigger from an EventBridge rule or AWS Config remediation; include an aws:approve step."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a pre-filled playbook for a public S3 bucket as a model before they work on their own scenario.",
   "Extend: Ask fast finishers to outline a runbook with a branch step that takes different actions depending on whether the affected instance is tagged as production."
  ]
 },
 {
  "t": "Preparing for incidents: break-glass access, a dedicated forensics account, and game days to test the plan",
  "objectives": [
   "Students will be able to design pre-provisioned incident response roles and a break-glass procedure with monitoring.",
   "Students will be able to describe the purpose and controls of a dedicated forensics account, including immutable evidence storage.",
   "Students will be able to explain why KMS key policies must be prepared for sharing encrypted evidence across accounts.",
   "Students will be able to compare tabletop exercises and game days and plan a simple game day."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers about what the team would be missing."
   ],
   [
    15,
    "Teach",
    "Present the three preparation areas. Draw an organization with IR roles in each account, a break-glass box with an alarm, and a forensics account in its own OU with Object Lock buckets and an isolated analysis VPC. Explain the default EBS key sharing limit and the fix. Contrast tabletop exercises and game days."
   ],
   [
    15,
    "Activity",
    "The class runs the short tabletop exercise described below."
   ],
   [
    5,
    "Discuss",
    "Debrief the gaps found in the tabletop and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your identity provider is down and an attack is underway. You cannot sign in to AWS. What would you wish you had set up last month?",
  "activity": {
   "title": "Ten-minute tabletop: the locked-out responders",
   "materials": "Printed role cards (incident commander, cloud engineer, forensic analyst, communications lead, observer), a printed scenario with three timed injects revealed by the teacher, a whiteboard for the timeline and sticky notes for gaps.",
   "steps": [
    "Form groups of five and hand out role cards; the observer records decisions and gaps on sticky notes.",
    "The teacher reads inject one: GuardDuty reports credential exfiltration and the identity provider is down. Each role states what they do first.",
    "Inject two: the suspect volume is encrypted with the default EBS key. Groups decide how to get evidence to the forensics account.",
    "Inject three: an alarm shows the break-glass account was used. Groups decide how to confirm it was their own team and what happens afterwards.",
    "Observers read their gap list aloud and each group proposes one preparation task that would close the biggest gap."
   ]
  },
  "discussion": [
   "Why is it risky to keep evidence in the account where the incident happened?",
   "How often should break-glass access be tested, and what could go wrong if it never is?",
   "What would make a game day safe to run, and what would make it realistic enough to be useful?"
  ],
  "exit": [
   [
    "Name two controls that protect break-glass credentials.",
    "Hardware MFA and sealed, audited storage with dual control, plus an alarm on every use."
   ],
   [
    "Why is evidence copied to a separate forensics account?",
    "To keep it isolated from a possibly compromised account and protected by strict policies and immutable storage such as Object Lock."
   ],
   [
    "What must you do before sharing a snapshot encrypted with the default AWS managed EBS key?",
    "Copy and re-encrypt it with a customer managed key whose key policy allows the forensics account."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a preparation checklist (roles, break-glass, forensics account, key policies, exercises) to consult during the tabletop.",
   "Extend: Ask fast finishers to design a game day scenario with a canary access key, listing the expected detection, the automated response and the timings they would measure."
  ]
 },
 {
  "t": "Responding to compromised IAM credentials: deactivating access keys, revoking role sessions and reviewing CloudTrail activity",
  "objectives": [
   "Students will be able to distinguish long-term access keys from temporary role credentials and choose the right containment action for each.",
   "Students will be able to explain how Revoke active sessions works using aws:TokenIssueTime.",
   "Students will be able to plan a CloudTrail investigation that scopes attacker activity and finds persistence.",
   "Students will be able to recommend root cause fixes such as IMDSv2, roles instead of keys and IAM Identity Center."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the actions students would take, in the order they suggest."
   ],
   [
    15,
    "Teach",
    "Show AKIA and ASIA key IDs and the userIdentity types. Explain deactivate versus delete. Project the revoke-sessions deny policy with the aws:TokenIssueTime condition and explain why legitimate callers keep working. Walk through a CloudTrail search and a list of persistence signs, then root cause fixes including IMDSv2."
   ],
   [
    15,
    "Activity",
    "Pairs do the CloudTrail timeline hunt described below."
   ],
   [
    5,
    "Discuss",
    "Review the persistence items pairs found; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You learn that one of your company's AWS keys was posted publicly ten minutes ago. Write down the first three things you would do, in order.",
  "activity": {
   "title": "CloudTrail timeline hunt",
   "materials": "A printed, simplified CloudTrail excerpt of about 20 events from a fictional compromise (GetCallerIdentity, ListBuckets, CreateUser, CreateAccessKey, RunInstances in an unusual Region, UpdateAssumeRolePolicy, StopLogging attempt, GetObject calls), highlighters and a whiteboard.",
   "steps": [
    "Pairs identify whether the leaked credential is a long-term key or temporary credentials from the key ID prefix and userIdentity type, and write the correct first containment action.",
    "Pairs highlight every event made with the leaked credential and build a timeline on paper.",
    "Pairs circle each persistence action and each data access event, and list the cleanup step for each.",
    "Pairs write two root cause fixes for this scenario.",
    "The class builds a combined timeline on the whiteboard and the teacher confirms the complete list of persistence items."
   ]
  },
  "discussion": [
   "When might deactivating a key cause business harm, and how would you weigh that against the risk of leaving it active?",
   "Why do attackers often call GetCallerIdentity or list resources first, and how can that help detection?",
   "How would you convince a team to move from long-term access keys to roles and IAM Identity Center?"
  ],
  "exit": [
   [
    "What is the first containment action for a leaked IAM user access key, and why not delete it?",
    "Deactivate it; deleting removes the key ID needed for investigation and prevents reactivation after a false positive."
   ],
   [
    "How do you stop stolen temporary role credentials without breaking the workload?",
    "Use Revoke active sessions, which denies requests from tokens issued before the revocation time using aws:TokenIssueTime."
   ],
   [
    "Name two persistence actions to look for in CloudTrail after a credential compromise.",
    "For example CreateUser or CreateAccessKey, and changes to role trust policies such as UpdateAssumeRolePolicy."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-row decision card (long-term key: deactivate; role: revoke sessions) and a short list of persistence event names to look for in the excerpt.",
   "Extend: Ask fast finishers to write, in plain words, the deny policy that Revoke active sessions creates and explain how they would also limit instance credentials to the company's VPC."
  ]
 },
 {
  "t": "Containing a compromised EC2 instance: isolation, EBS snapshots, memory capture and preserving evidence",
  "objectives": [
   "Students will be able to sequence the containment and evidence steps for a compromised EC2 instance in the correct order.",
   "Students will be able to explain why stateful security groups do not cut tracked connections and choose a network ACL or untracked-flow approach to fix it.",
   "Students will be able to justify capturing memory before snapshotting EBS volumes and before stopping the instance.",
   "Students will be able to describe how evidence is moved to and analyzed in a forensics account."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick show of hands: terminate, stop, or something else. Write the three answers on the board without judging them."
   ],
   [
    12,
    "Teach",
    "Walk through the runbook on the board as four columns: Protect, Isolate, Capture memory, Snapshot. For each, explain what you do in the console and why. Spend extra time on connection tracking: draw an open connection crossing a security group and show that removing the rule does not cut it, then show a network ACL dropping packets."
   ],
   [
    15,
    "Activity",
    "Run the card-sequencing activity in groups of three. Circulate and ask each group to defend the position of the memory-capture card and the Auto Scaling card."
   ],
   [
    8,
    "Discuss",
    "Reveal the correct order. Ask groups where they disagreed and use the discussion questions to explore trade-offs such as using a subnet network ACL that affects neighboring instances."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "GuardDuty just told you a production web server is talking to a known malicious IP. Your teammate wants to terminate it immediately. Do you agree? What might you lose?",
  "activity": {
   "title": "Runbook card sort",
   "materials": "Printed cards (one set per group of three), each with one step: enable termination protection, tag with incident ID, detach from Auto Scaling group, deregister from target group, apply isolation security group, add network ACL deny, revoke role sessions, capture memory via Systems Manager, snapshot all EBS volumes, share snapshots to forensics account, record hashes and chain of custody, attach volume copies to forensic instance, terminate and redeploy from known-good image. Add two distractor cards: 'reboot to clear malware' and 'stop instance to save cost'.",
   "steps": [
    "Give each group a shuffled set of cards and ask them to lay out the runbook in order, discarding any card that should never be used.",
    "Ask each group to mark the one step where order matters most for evidence and write why on a sticky note.",
    "Project a short VPC Flow Log excerpt showing traffic continuing after a security group change and ask groups which card they would add or move to fix it.",
    "Groups compare their sequence with a neighboring group and resolve differences before the class reveal."
   ]
  },
  "discussion": [
   "A network ACL deny affects every instance in the subnet. When is that acceptable, and when would you prefer the untracked-flow security group approach?",
   "Which steps of this runbook would you automate with Step Functions, and which would you keep behind a human approval?"
  ],
  "exit": [
   [
    "Name the first thing you do to stop your own automation from destroying the instance.",
    "Enable termination protection and detach it from the Auto Scaling group or set it to Standby (and deregister it from target groups)."
   ],
   [
    "Why might an attacker's connection survive replacing the security group?",
    "Security groups are stateful, so tracked connections persist after rules are removed; a network ACL deny cuts them."
   ],
   [
    "Memory capture or EBS snapshot first, and why?",
    "Memory first, because it is volatile and lost on stop or reboot."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed sequence with the four PICS headings already placed, so they only sort the detailed cards under each heading.",
   "Extend: Ask fast finishers to sketch a Step Functions workflow for the runbook, marking which states run Systems Manager documents and where a human approval step belongs."
  ]
 },
 {
  "t": "Investigating and scoping with Amazon Detective and CloudTrail Lake queries",
  "objectives": [
   "Students will be able to explain what Amazon Detective's behavior graph contains and how it supports investigation.",
   "Students will be able to compare Detective, CloudTrail Lake, Athena and GuardDuty by their role in an investigation.",
   "Students will be able to write the filters for a CloudTrail Lake query that scopes activity by access key, IP address or API name.",
   "Students will be able to apply scoping thinking that includes both actual activity and potential blast radius."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the board under 'what we need to know'."
   ],
   [
    12,
    "Teach",
    "Map each question on the board to a tool: GuardDuty raised it, Detective explores relationships, CloudTrail Lake gives exact lists. Draw a small behavior graph with a role, two IPs and three buckets. Show the shape of a CloudTrail Lake query with SELECT, FROM, WHERE on accessKeyId and eventTime."
   ],
   [
    15,
    "Activity",
    "Run the scoping investigation activity in pairs, using the printed event table."
   ],
   [
    8,
    "Discuss",
    "Pairs share their incident timeline and blast radius. Use the discussion questions to compare findings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "You get one alert saying a role made unusual API calls. List every question you would want answered before deciding how big your response should be.",
  "activity": {
   "title": "Paper behavior graph",
   "materials": "A printed table of about 25 simplified CloudTrail events (time, account, principal, source IP, event name, resource) prepared by the teacher, including one suspicious IP; sticky notes; whiteboard or large paper per pair.",
   "steps": [
    "Pairs read the event table and put one sticky note on their paper for each entity (role, IP, bucket, account) involved with the suspicious IP.",
    "Pairs draw lines between entities that interacted and write the first and last time on each line, building their own behavior graph.",
    "Pairs write, in plain words, the CloudTrail Lake query filters they would use to produce a complete list of the suspicious IP's activity.",
    "Pairs write a two-sentence scope statement: start time, affected accounts and resources, and what the role could still do based on a printed policy snippet."
   ]
  },
  "discussion": [
   "Which question was easier to answer with the graph, and which needed an exact query?",
   "How would you decide whether a finding is a true positive or a traveling developer before you contain anything?"
  ],
  "exit": [
   [
    "Which service lets you visually explore an IAM role's interactions and new behavior over time?",
    "Amazon Detective."
   ],
   [
    "What makes a CloudTrail Lake event data store useful as evidence?",
    "It is immutable, has configurable long retention and can collect events from all accounts in an organization."
   ],
   [
    "Besides what the attacker did, what else should scoping assess?",
    "What the compromised principal could do (its permissions and trust relationships) and any persistence it created."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-highlighted event table where the suspicious IP's rows are marked, so they focus on drawing relationships and choosing the right tool.",
   "Extend: Ask fast finishers to write a full CloudTrail Lake SQL query for the scenario and explain how they would add a second query to find any new IAM users or access keys the attacker created."
  ]
 },
 {
  "t": "Automated response: EventBridge with Lambda or Step Functions, Security Hub automation rules and AWS Config remediation",
  "objectives": [
   "Students will be able to describe how EventBridge routes security findings and API events to response targets.",
   "Students will be able to choose between Lambda, Step Functions, Systems Manager Automation, Config remediation and Security Hub automation rules for a given scenario.",
   "Students will be able to design a multi-step response workflow that includes least-privilege roles and a human approval step.",
   "Students will be able to identify risks of automated response such as loops and false-positive impact."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for what should happen automatically versus with a human."
   ],
   [
    12,
    "Teach",
    "Draw EventBridge in the center of the board with sources on the left (GuardDuty, Security Hub, Config, CloudTrail) and targets on the right (Lambda, Step Functions, Systems Manager). Add Security Hub automation rules and Config remediation as separate boxes and explain what each does and does not do."
   ],
   [
    15,
    "Activity",
    "Run the scenario-matching card game in groups of four."
   ],
   [
    8,
    "Discuss",
    "Groups present one scenario where they disagreed. Use the discussion questions on approvals and loops."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "An access key leaks at 4 a.m. on a Saturday. Which response steps would you trust a script to do on its own, and which would you want a person to approve?",
  "activity": {
   "title": "Pick the building block",
   "materials": "Printed scenario cards (about 12), printed tool cards (EventBridge rule, Lambda, Step Functions, Systems Manager Automation, Config remediation, Security Hub automation rule, Security Hub custom action), whiteboard for scoring.",
   "steps": [
    "Each group draws a scenario card, for example 'suppress findings for the sandbox account' or 'isolate, snapshot and wait for approval'.",
    "The group selects every tool card needed and arranges them as a flow from trigger to action.",
    "For each flow, the group writes one least-privilege permission the automation's role needs and one place a human approval might belong.",
    "Groups rotate scenario cards twice, then the teacher reveals the expected flows and groups score one point per correct match."
   ]
  },
  "discussion": [
   "What is the worst thing a buggy auto-remediation could do in your organization, and how would you limit that risk?",
   "When is suppressing a finding with an automation rule a good idea, and when does it hide real risk?"
  ],
  "exit": [
   [
    "Which service should run a response that needs retries, waits and an approval step?",
    "AWS Step Functions."
   ],
   [
    "What can a Security Hub automation rule do to a finding?",
    "Update it, for example change severity, set workflow status such as SUPPRESSED or NOTIFIED, add notes or update fields."
   ],
   [
    "What kind of document does AWS Config remediation run?",
    "A Systems Manager Automation document."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page decision table (single action, multi-step, fix config, change finding, analyst-triggered) for students to consult while matching cards.",
   "Extend: Ask fast finishers to write an EventBridge event pattern in JSON that matches only high-severity GuardDuty findings of one type and explain how they would test it safely."
  ]
 },
 {
  "t": "Forensic evidence handling: S3 Object Lock, chain of custody and tagging evidence",
  "objectives": [
   "Students will be able to explain how S3 Object Lock compliance mode, governance mode and legal holds differ.",
   "Students will be able to build a chain-of-custody record that includes hashes, collectors, times and access history.",
   "Students will be able to describe why snapshots encrypted with the AWS managed EBS key cannot be shared and how to share evidence correctly.",
   "Students will be able to design a forensics account evidence bucket with encryption, logging and tagging controls."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up courtroom question and collect ideas on the board."
   ],
   [
    12,
    "Teach",
    "Explain the forensics account and the evidence bucket settings layer by layer: versioning, Object Lock modes, legal hold, KMS customer managed key, Block Public Access, CloudTrail data events. Then cover hashes, chain of custody, tags and the snapshot-sharing encryption rule."
   ],
   [
    15,
    "Activity",
    "Run the evidence-bag role-play in groups of four."
   ],
   [
    8,
    "Discuss",
    "Groups report where their chain of custody broke and how the AWS controls would have caught it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A lawyer asks you to prove a file you collected eight months ago has not changed. What would you need to have done on the day you collected it?",
  "activity": {
   "title": "Evidence bag relay",
   "materials": "Envelopes as evidence bags, printed chain-of-custody forms, a short printed text 'evidence file' with a teacher-computed SHA-256 hash written on a card, student laptops with a browser for an offline hash check if available, sticky notes.",
   "steps": [
    "One student per group plays collector, fills in the chain-of-custody form (item, source resource ID, time, hash) and seals the envelope.",
    "The envelope passes through two more students (transfer and analyst) who each sign the form; the teacher secretly asks one group to alter the evidence text.",
    "Each group compares the evidence against the recorded hash value and decides whether it is intact; the altered group should detect the mismatch.",
    "Groups then map each paper step to the AWS control that does the same job: Object Lock, KMS key policy, CloudTrail data events, tags, snapshot sharing with a customer managed key."
   ]
  },
  "discussion": [
   "When would you choose governance mode over compliance mode for incident data, if ever?",
   "Who in your organization should be allowed to remove a legal hold, and how would you enforce that in IAM?"
  ],
  "exit": [
   [
    "Which Object Lock mode prevents even the root user from deleting an object before retention ends?",
    "Compliance mode."
   ],
   [
    "Why can a snapshot encrypted with aws/ebs not be shared with the forensics account, and what is the fix?",
    "The AWS managed key's policy cannot be changed to allow another account; copy and re-encrypt with a customer managed key that grants the forensics account access."
   ],
   [
    "Name three items a chain-of-custody record should include.",
    "Who collected the item, when and from which resource, the hash, how it was transferred and who accessed it since (any three)."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in sample chain-of-custody form and a two-column table comparing compliance mode, governance mode and legal hold for students to reference.",
   "Extend: Ask fast finishers to write the key policy statement and bucket policy conditions that let only a forensics role read evidence, and explain how they would log every read."
  ]
 },
 {
  "t": "Recovering after an incident: restoring from AWS Backup, rotating secrets and applying lessons learned",
  "objectives": [
   "Students will be able to explain why rebuilding from trusted images is preferred over cleaning a compromised system.",
   "Students will be able to design backup protection using cross-account copies, Vault Lock compliance mode and logically air-gapped vaults.",
   "Students will be able to list the secrets and persistence mechanisms that must be rotated or removed after an incident.",
   "Students will be able to run a blameless post-incident review that produces root cause and concrete actions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the burglary and keys; connect answers to cloud recovery."
   ],
   [
    12,
    "Teach",
    "Present recovery in four steps on the board: rebuild, restore, rotate and remove, review. For restore, draw a production account, a backup account with a locked vault, and an arrow showing the cross-account copy. Explain choosing a recovery point from before first access."
   ],
   [
    18,
    "Activity",
    "Run the mock post-incident review in groups of five with assigned roles."
   ],
   [
    5,
    "Discuss",
    "Ask each group to read out its root cause and one action item. Use one discussion question."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Burglars got into your house and may have copied your keys. After they leave, what do you do before you feel safe sleeping there again?",
  "activity": {
   "title": "Mock blameless review",
   "materials": "A one-page printed incident timeline prepared by the teacher (leaked access key, instance launch, secret read, ransomware, containment), role cards (facilitator, timeline keeper, engineer, security analyst, business owner), whiteboard or large paper, sticky notes.",
   "steps": [
    "Each group reads the timeline and the facilitator leads a ten-minute review, reminding everyone that the goal is to fix systems, not blame people.",
    "The timeline keeper marks first access, detection, containment and recovery times; the group calculates time to detect and time to contain.",
    "The group identifies the root cause and lists every secret to rotate and every persistence item to remove based on the timeline.",
    "The group writes three action items, each with an owner and an AWS control (for example a Config rule, SCP, Vault Lock or GuardDuty plan)."
   ]
  },
  "discussion": [
   "What would make people at your organization reluctant to speak honestly in a post-incident review, and how would you change that?",
   "How often should a team test restores, and what should a restore test measure?"
  ],
  "exit": [
   [
    "Why is restoring the most recent backup sometimes wrong?",
    "It may contain tampered data or malware; restore from a recovery point before the attacker's first access."
   ],
   [
    "Which AWS Backup feature prevents anyone, including root, from deleting recovery points early?",
    "Backup Vault Lock in compliance mode (after the grace period)."
   ],
   [
    "Name two kinds of attacker persistence to remove during recovery.",
    "New IAM users or access keys, modified role trust policies, new roles, Lambda functions, scheduled EventBridge rules or SSH keys (any two)."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist template with the headings Rebuild, Restore, Rotate, Remove and Review to fill in during the activity.",
   "Extend: Ask fast finishers to design an AWS Backup policy for an organization, including the backup account, vault lock mode and cross-Region copy, and explain how they would test restores each quarter."
  ]
 },
 {
  "t": "Edge protection with AWS WAF: web ACLs, managed rule groups, rate-based rules and OWASP Top 10 threats",
  "objectives": [
   "Students will be able to identify which AWS resources can be protected by a WAF web ACL.",
   "Students will be able to explain how rule priority, default actions, managed rule groups and rate-based rules work together.",
   "Students will be able to apply a safe rollout process using Count mode and WAF logs.",
   "Students will be able to distinguish threats WAF addresses from those handled by Shield, security groups or Network Firewall."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into 'web layer' and 'network layer' columns."
   ],
   [
    12,
    "Teach",
    "Draw a request flowing into a web ACL with numbered rules and a default action. Explain managed rule groups and the OWASP Top 10 connection, rate-based rules with aggregation keys, labels, WCUs and Count mode. Finish with the resources WAF attaches to and the aws-waf-logs- naming rule."
   ],
   [
    15,
    "Activity",
    "Run the log-reading activity in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share which rules they would move from Count to Block and why. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your login page gets thousands of sign-in attempts a minute from hundreds of IPs. Why would blocking IPs in a security group not solve this well?",
  "activity": {
   "title": "Count before you block",
   "materials": "A printed or projected set of about 15 simplified WAF log records prepared by the teacher (client IP, URI, terminating rule, action COUNT, a header or two), including a credential-stuffing pattern, a SQL injection attempt and a few legitimate requests falsely matched; whiteboard; sticky notes.",
   "steps": [
    "Pairs read each log record and label it as attack, legitimate or unclear.",
    "For each rule that matched, pairs decide whether to switch it to Block, keep it in Count or add an exception, and write the decision on a sticky note.",
    "Pairs design one rate-based rule for the login flood, naming the aggregation key, the scope-down path and the action.",
    "Pairs swap with another pair and check whether any decision would block a legitimate customer."
   ]
  },
  "discussion": [
   "What are the risks of relying only on managed rule groups without reviewing logs?",
   "When would you choose a CAPTCHA or challenge action instead of Block?"
  ],
  "exit": [
   [
    "Name four resources a WAF web ACL can be attached to.",
    "Any four of CloudFront, ALB, API Gateway REST API, AppSync, Cognito user pool, App Runner, Verified Access."
   ],
   [
    "What does Count mode let you do?",
    "Record what a rule would match without blocking, so you can tune it before switching to Block."
   ],
   [
    "A question mentions blocking SSH brute force. Is WAF the answer? Why?",
    "No; WAF only inspects HTTP and HTTPS. Use security groups, network ACLs or Session Manager."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing WAF actions (Allow, Block, Count, CAPTCHA, Challenge) and the main managed rule groups with one-line descriptions.",
   "Extend: Ask fast finishers to sketch a web ACL with rule priorities that uses a label from one rule as a condition in a later rule, and estimate which rules would cost the most WCUs."
  ]
 },
 {
  "t": "DDoS resilience: AWS Shield Standard vs Shield Advanced, CloudFront, Route 53 and AWS Firewall Manager",
  "objectives": [
   "Students will be able to compare Shield Standard and Shield Advanced features and identify when each is the right answer.",
   "Students will be able to design a DDoS-resilient architecture using CloudFront, Route 53, private origins, Auto Scaling and WAF.",
   "Students will be able to state the prerequisites for AWS Firewall Manager and what policy types it manages.",
   "Students will be able to explain how the Shield Response Team and health-based detection support response during an attack."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Use the warm-up question to elicit what makes a website fall over under load."
   ],
   [
    12,
    "Teach",
    "Draw a two-column comparison of Shield Standard and Shield Advanced on the board. Then draw the resilient architecture from the user through Route 53 and CloudFront to a private ALB and Auto Scaling group, marking where WAF and Shield act. Close with Firewall Manager prerequisites."
   ],
   [
    15,
    "Activity",
    "Run the whiteboard design challenge in groups of three or four."
   ],
   [
    8,
    "Discuss",
    "Each group presents its design in one minute; the class finds one weakness in each. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A ticket site gets ten times its normal traffic, mostly junk, two hours before a big event. Which parts of the system would break first, and why?",
  "activity": {
   "title": "Design for the flood",
   "materials": "Whiteboard or large paper per group, markers, printed requirement cards (for example 'origin must not be reachable directly', 'finance fears the scaling bill', 'twenty accounts need the same rules', 'need experts at 3 a.m.').",
   "steps": [
    "Each group draws a baseline web architecture with users, DNS, an ALB and an Auto Scaling group.",
    "The teacher hands out requirement cards one at a time; groups modify the design and label the AWS feature that meets each card.",
    "Groups mark on the drawing which protections come free with Shield Standard and which need Shield Advanced.",
    "Groups list the prerequisites they would need before using Firewall Manager across the twenty accounts."
   ]
  },
  "discussion": [
   "How would you decide whether a workload justifies Shield Advanced?",
   "Why does hiding the origin matter as much as buying more protection?"
  ],
  "exit": [
   [
    "Which DDoS protection is free and automatic for every AWS customer?",
    "AWS Shield Standard."
   ],
   [
    "Name two features only Shield Advanced provides.",
    "Any two of 24/7 SRT access, DDoS cost protection, health-based detection, automatic application layer mitigation, detailed attack reports."
   ],
   [
    "What three prerequisites does Firewall Manager require?",
    "AWS Organizations, a Firewall Manager administrator account and AWS Config enabled."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-drawn architecture outline with empty boxes to fill with service names, plus the Standard versus Advanced comparison table.",
   "Extend: Ask fast finishers to explain how they would lock an ALB origin to CloudFront in two different ways and compare the trade-offs."
  ]
 },
 {
  "t": "CloudFront security: origin access control, signed URLs and signed cookies, security headers and field-level encryption",
  "objectives": [
   "Students will be able to configure, on paper, an S3 bucket policy and KMS key policy that allow access only through a specific CloudFront distribution with OAC.",
   "Students will be able to choose between signed URLs and signed cookies, and between canned and custom policies, for a given scenario.",
   "Students will be able to explain how to prevent origin bypass for S3 and ALB origins.",
   "Students will be able to describe the purpose of security headers and field-level encryption."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the leaked bucket links and collect ideas."
   ],
   [
    13,
    "Teach",
    "Draw viewer, CloudFront, S3 and ALB on the board. Walk through OAC with the bucket policy condition on aws:SourceArn and the KMS key policy. Then contrast signed URLs and cookies, the us-east-1 certificate rule, response headers policies and field-level encryption."
   ],
   [
    15,
    "Activity",
    "Run the policy-reading activity in pairs using printed policy snippets."
   ],
   [
    7,
    "Discuss",
    "Pairs share which snippet had the most dangerous flaw. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Students are sharing direct links to a company's S3 bucket to watch paid videos for free. What two things went wrong, and how might CloudFront help?",
  "activity": {
   "title": "Spot the bypass",
   "materials": "Printed cards with six short JSON or configuration snippets prepared by the teacher: a bucket policy missing the aws:SourceArn condition, a correct OAC bucket policy, a KMS key policy missing CloudFront, an ALB security group open to 0.0.0.0/0, a viewer protocol policy set to allow HTTP and HTTPS, and a cache behavior requiring a key group. Sticky notes and a projector.",
   "steps": [
    "Pairs read each snippet and mark it as secure or flawed.",
    "For each flawed snippet, pairs write on a sticky note what an outsider could do and the one-line fix.",
    "Pairs decide, for three short scenarios on the back of the card, whether to use a signed URL or signed cookies and whether a canned or custom policy is needed.",
    "The teacher projects the answers and pairs score themselves."
   ]
  },
  "discussion": [
   "Why is a bucket policy that trusts cloudfront.amazonaws.com without a condition risky?",
   "When would field-level encryption be worth the extra complexity compared with HTTPS alone?"
  ],
  "exit": [
   [
    "Why should new designs use OAC instead of OAI?",
    "OAC is the recommended replacement, uses SigV4 and supports SSE-KMS encrypted buckets, which OAI does not."
   ],
   [
    "Signed URLs or signed cookies for a course with 300 video segment files?",
    "Signed cookies, because they cover many files under a path without changing URLs."
   ],
   [
    "In which Region must the ACM certificate for a CloudFront custom domain be?",
    "US East (N. Virginia), us-east-1."
   ]
  ],
  "differentiation": [
   "Support: Provide an annotated example of a correct OAC bucket policy with each element labeled, so students can compare it line by line with the flawed snippets.",
   "Extend: Ask fast finishers to write a custom policy outline for a signed cookie that limits access to one path, a 24-hour window and one IP range, and explain where the private key should be stored."
  ]
 },
 {
  "t": "VPC traffic controls: security groups vs network ACLs, AWS Network Firewall and Route 53 Resolver DNS Firewall",
  "objectives": [
   "Students will be able to compare security groups and network ACLs by attachment point, statefulness, rule types and evaluation order.",
   "Students will be able to explain how AWS Network Firewall is deployed with firewall subnets and route tables and what its stateful rules can inspect.",
   "Students will be able to describe when Route 53 Resolver DNS Firewall is the right control.",
   "Students will be able to select the correct VPC traffic control for a given requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the three requests on the board."
   ],
   [
    12,
    "Teach",
    "Draw a VPC with two subnets, an instance, a network ACL at each subnet edge and a security group around each instance. Trace one HTTPS request and its response, showing why network ACLs need ephemeral ports. Add a central inspection VPC with Network Firewall and a DNS query going to the Resolver with DNS Firewall."
   ],
   [
    15,
    "Activity",
    "Run the pair troubleshooting activity with printed rule tables."
   ],
   [
    8,
    "Discuss",
    "Pairs explain one fix. Use the discussion questions to compare layered designs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "You need to block an IP range, stop servers from looking up bad domains, and keep the database reachable only from the app tier. Which of these sounds hardest, and why?",
  "activity": {
   "title": "Fix the broken network",
   "materials": "Printed tickets (one per scenario) with a short network ACL table and security group rules prepared by the teacher, such as missing ephemeral ports outbound, a deny rule numbered after an allow rule, a database security group open to 0.0.0.0/0, and a request to block a domain that changes IPs; whiteboard; markers.",
   "steps": [
    "Pairs take a ticket and trace the traffic flow through the network ACL and security group rules on paper.",
    "Pairs identify why the traffic is allowed or blocked and write the corrected rule, including rule numbers for network ACLs.",
    "For the domain ticket, pairs choose between network ACL, security group, Network Firewall and DNS Firewall and justify their choice.",
    "Pairs swap tickets with another pair and check each other's fixes."
   ]
  },
  "discussion": [
   "Why might a team use both Network Firewall domain filtering and DNS Firewall, rather than only one?",
   "What are the risks of using network ACLs for fine-grained, per-application rules?"
  ],
  "exit": [
   [
    "Which control can reference another security group as a traffic source?",
    "A security group."
   ],
   [
    "A network ACL has rule 100 allowing all traffic from 0.0.0.0/0 and rule 200 denying 203.0.113.0/24. Is the range blocked? Why?",
    "No; rules are evaluated from the lowest number and rule 100 matches first, so the deny must have a lower number."
   ],
   [
    "Which control blocks DNS lookups for known malicious domains?",
    "Route 53 Resolver DNS Firewall."
   ]
  ],
  "differentiation": [
   "Support: Provide a comparison card with four columns (attaches to, stateful, allow or deny, what it inspects) for students to complete before the activity.",
   "Extend: Ask fast finishers to draw a hub-and-spoke design with Transit Gateway route tables sending egress through a central Network Firewall and explain how return traffic stays symmetric."
  ]
 },
 {
  "t": "Private connectivity: gateway and interface VPC endpoints, endpoint policies, PrivateLink and Transit Gateway segmentation",
  "objectives": [
   "Students will be able to compare gateway and interface VPC endpoints by supported services, mechanism, cost and reach.",
   "Students will be able to write the intent of an endpoint policy and a bucket policy condition that together form a data perimeter.",
   "Students will be able to explain how PrivateLink exposes a single service without routing and how it handles overlapping CIDRs.",
   "Students will be able to design Transit Gateway route table segmentation between production, development and shared services."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss why internet paths for internal traffic concern auditors."
   ],
   [
    12,
    "Teach",
    "Draw a VPC with a gateway endpoint (route table entry) and an interface endpoint (network interface with security group). Show the endpoint policy on the VPC side and the bucket policy with aws:SourceVpce on the S3 side. Then draw a Transit Gateway with three route tables and a PrivateLink endpoint service."
   ],
   [
    16,
    "Activity",
    "Run the data perimeter whiteboard design in groups of three."
   ],
   [
    7,
    "Discuss",
    "Groups compare designs and explain which policy stops which threat. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "An auditor says your sensitive VPC reaches S3 through a NAT gateway and the internet. Why might that worry them even if the traffic is encrypted?",
  "activity": {
   "title": "Build the data perimeter",
   "materials": "Whiteboard or large paper per group, markers, printed requirement cards: 'no internet gateway in the analytics VPC', 'workloads may write only to company buckets', 'the data bucket accepts only requests from the analytics VPC', 'dev must not reach prod', 'a partner with overlapping CIDRs needs one API'.",
   "steps": [
    "Groups draw the analytics VPC and choose the right endpoint type for S3, KMS and STS, labeling each with cost and mechanism.",
    "Groups write, in plain English, the endpoint policy statement and the bucket policy condition key that meet the second and third cards.",
    "Groups add a Transit Gateway with route tables that satisfy the dev and prod card, drawing which attachments associate and propagate to which tables.",
    "Groups add the partner integration using PrivateLink and present one threat their design blocks."
   ]
  },
  "discussion": [
   "What legitimate access might break if a bucket policy denies everything not coming through one VPC endpoint, and how would you plan for it?",
   "When would you choose PrivateLink over VPC peering or Transit Gateway for connecting to another team's service?"
  ],
  "exit": [
   [
    "Which endpoint type would on-premises servers use to reach S3 privately over Direct Connect?",
    "An S3 interface endpoint, because gateway endpoints only serve traffic from inside the VPC."
   ],
   [
    "Which condition key restricts a bucket to requests that come through a specific VPC endpoint?",
    "aws:SourceVpce."
   ],
   [
    "How does an endpoint policy help prevent data exfiltration?",
    "It limits which resources can be reached through the endpoint, for example only buckets in the company's organization."
   ]
  ],
  "differentiation": [
   "Support: Give students a comparison table template for gateway versus interface endpoints and a list of condition keys with one-line meanings to use during the activity.",
   "Extend: Ask fast finishers to draft a full JSON endpoint policy using aws:ResourceOrgID and a bucket policy using aws:SourceVpce, and identify one way an administrator could lock themselves out."
  ]
 },
 {
  "t": "Hybrid and remote access: Site-to-Site VPN, Direct Connect with MACsec, Client VPN and Verified Access",
  "objectives": [
   "Students will be able to compare Site-to-Site VPN, Direct Connect, Client VPN and Verified Access by purpose, encryption and authentication.",
   "Students will be able to explain why Direct Connect is not encrypted by default and choose between MACsec and VPN over Direct Connect.",
   "Students will be able to describe how Client VPN authorization rules and authentication methods limit user access.",
   "Students will be able to apply zero trust reasoning to decide when Verified Access replaces a VPN."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about whether a private line is secure, and take a quick vote."
   ],
   [
    12,
    "Teach",
    "Draw a data center, a remote user and a VPC on the board. Add Site-to-Site VPN with two tunnels, Direct Connect with virtual interfaces, MACsec on the link and VPN over Direct Connect. Add Client VPN with authentication and authorization rules, then Verified Access in front of an app with identity and device trust providers."
   ],
   [
    15,
    "Activity",
    "Run the requirement card sort in groups of three."
   ],
   [
    8,
    "Discuss",
    "Groups present their trickiest card. Use the discussion questions on zero trust and VPN fatigue."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Your company leases a private line from its data center to AWS. Is the data on that line encrypted? Vote yes or no and explain your reasoning.",
  "activity": {
   "title": "Which road do they need?",
   "materials": "Printed requirement cards (about 12), for example 'encrypt 100 Gbps of traffic to AWS', 'quick encrypted link for a small branch office', 'admins need full network access from home with SAML sign-in', 'contractors reach one web app from managed laptops only', 'backup path if the private line fails'; five labeled zones on the whiteboard (Site-to-Site VPN, Direct Connect plus MACsec, VPN over Direct Connect, Client VPN, Verified Access); sticky notes.",
   "steps": [
    "Groups sort each card into the zone of the service that best meets it.",
    "For each card, groups write one sticky note with the deciding phrase in the requirement, such as 'without a VPN' or 'line rate'.",
    "Groups pick two cards and list the authentication or encryption settings they would configure.",
    "The class walks the whiteboard, and the teacher resolves disputed cards with the group that placed them."
   ]
  },
  "discussion": [
   "What does zero trust change about how we think of being 'inside the network'?",
   "What are the trade-offs between MACsec and IPsec VPN over Direct Connect for an organization with a small network team?"
  ],
  "exit": [
   [
    "Is Direct Connect traffic encrypted by default?",
    "No; it is private but not encrypted unless you add MACsec or a VPN over it."
   ],
   [
    "At which layers do MACsec and VPN over Direct Connect encrypt?",
    "MACsec at layer 2; IPsec VPN at layer 3."
   ],
   [
    "Which service grants per-application access based on identity and device posture without a VPN?",
    "AWS Verified Access."
   ]
  ],
  "differentiation": [
   "Support: Provide a comparison grid (purpose, encryption, authentication, who uses it) with the first row filled in for Site-to-Site VPN.",
   "Extend: Ask fast finishers to design a hybrid network with Direct Connect primary and VPN backup through Transit Gateway, explaining how BGP preferences keep Direct Connect as the primary path."
  ]
 },
 {
  "t": "Securing compute: Session Manager instead of SSH, IMDSv2, patching with Patch Manager and hardened images",
  "objectives": [
   "Students will be able to explain how Session Manager provides audited shell access without inbound ports or SSH keys and list its three prerequisites.",
   "Students will be able to describe how IMDSv2's token flow and hop limit protect instance role credentials from SSRF.",
   "Students will be able to choose between Patch Manager and EC2 Image Builder for a given hardening or patching requirement.",
   "Students will be able to identify ways to enforce IMDSv2 across an organization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard under 'ways in' and 'things to steal'."
   ],
   [
    15,
    "Teach",
    "Draw an EC2 instance with arrows: inbound SSH versus outbound SSM Agent traffic. Walk through Session Manager prerequisites, then draw the IMDSv1 GET versus IMDSv2 PUT-then-GET flow and explain why SSRF fails. Close with Patch Manager baselines and maintenance windows versus Image Builder pipelines."
   ],
   [
    15,
    "Activity",
    "Run the 'Harden this server' card activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their fixes; the teacher highlights any group that relied on network placement for SSRF and corrects it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If you were an attacker and found a web server on AWS, what two things would you most want: a way in, or the credentials it already has? Why?",
  "activity": {
   "title": "Harden this server",
   "materials": "Printed problem cards (one per group), whiteboard markers, sticky notes.",
   "steps": [
    "Give each group a card describing a server: port 22 open to 0.0.0.0/0, IMDSv1 enabled, an image built by hand two years ago, no patching schedule, a shared SSH key on a wiki page.",
    "Groups list every risk on sticky notes, then pair each risk with an AWS control (Session Manager, IMDSv2 with hop limit, Patch Manager baseline and maintenance window, Image Builder pipeline, SCP or declarative policy).",
    "Each group writes the prerequisites they must confirm before removing SSH, including network access to Systems Manager in a subnet with no internet.",
    "Groups rank their fixes by impact and justify the top item in one sentence."
   ]
  },
  "discussion": [
   "Why is 'remove inbound access entirely' stronger than 'restrict SSH to the office IP range'?",
   "What could go wrong if you require IMDSv2 on day one without checking which software still uses IMDSv1?"
  ],
  "exit": [
   [
    "Name the three prerequisites for Session Manager.",
    "The SSM Agent, an instance profile with Systems Manager permissions, and a network path (internet or interface endpoints) to Systems Manager."
   ],
   [
    "Why can't a typical SSRF flaw steal credentials when IMDSv2 is required?",
    "It cannot send the PUT request with the required header to obtain a session token."
   ],
   [
    "Which service builds hardened, tested AMIs on a schedule?",
    "EC2 Image Builder."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed risk-to-control table with the controls listed so students only match them, and pair struggling students with a confident partner.",
   "Extend: Ask fast finishers to write, in plain words, an SCP statement that denies launching instances unless IMDSv2 is required, and explain how they would roll it out without breaking production."
  ]
 },
 {
  "t": "Vulnerability management with Amazon Inspector for EC2 instances, ECR container images and Lambda functions",
  "objectives": [
   "Students will be able to describe what Amazon Inspector scans for EC2 instances, ECR images and Lambda functions, including agent-based and agentless EC2 scanning.",
   "Students will be able to explain how the Inspector score differs from a raw CVSS score.",
   "Students will be able to design an automated flow from Inspector findings to remediation using EventBridge and Systems Manager.",
   "Students will be able to distinguish Inspector from GuardDuty and Macie in scenario questions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students call out answers; note on the board how long manual checking would take."
   ],
   [
    12,
    "Teach",
    "Draw three columns: EC2, ECR, Lambda. Under each, list how Inspector scans it. Then explain scoring with an example of a CVE on an unreachable port, and draw the path Inspector to Security Hub and EventBridge to ticketing or Patch Manager."
   ],
   [
    18,
    "Activity",
    "Run the 'Triage the findings' card sort in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs explain their top three priorities and which service or team fixes each."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A critical flaw is announced in a popular library this morning. How would you find out, today, every place your company runs it?",
  "activity": {
   "title": "Triage the findings",
   "materials": "Printed finding cards (about ten per pair) the teacher writes in advance, each with a resource type, CVE severity, network reachability, exploit available yes or no, and fix version; plus three cards labeled Inspector, GuardDuty, Macie as distractors.",
   "steps": [
    "Pairs sort the finding cards from highest to lowest real priority, using severity, reachability and exploit availability rather than CVSS alone.",
    "For each of the top five, pairs write who fixes it and how: Patch Manager for EC2, rebuild and push for ECR images, update dependencies and redeploy for Lambda.",
    "Mixed into the deck are three cards describing an exposed S3 object with personal data, a crypto mining alert and an outdated package; pairs must say which service would produce each.",
    "Pairs write one EventBridge rule in plain words that would open tickets for their top category."
   ]
  },
  "discussion": [
   "When is it reasonable to suppress a finding rather than fix it, and who should approve that?",
   "Why is continuous rescanning of images more valuable than scanning only at build time?"
  ],
  "exit": [
   [
    "What does agentless EC2 scanning analyze?",
    "Snapshots of the instance's EBS volumes."
   ],
   [
    "Which service would you pair with Inspector to automatically patch EC2 instances?",
    "AWS Systems Manager Patch Manager, triggered on a schedule or from findings through EventBridge."
   ],
   [
    "A question asks for discovery of personal data in S3. Is Inspector the answer?",
    "No. That is Amazon Macie; Inspector finds software vulnerabilities and network exposure."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page cheat sheet with the three workload types and the matching scan method, and reduce the card deck to five cards.",
   "Extend: Ask fast finishers to explain how they would use an SBOM export and suppression rules together to answer an auditor who asks where a specific library version runs and why some findings are not fixed."
  ]
 },
 {
  "t": "Network troubleshooting and analysis: VPC Reachability Analyzer, Network Access Analyzer and Traffic Mirroring",
  "objectives": [
   "Students will be able to explain how Reachability Analyzer identifies the component that blocks a path without sending traffic.",
   "Students will be able to write a plain-language Network Access Scope for a segmentation requirement.",
   "Students will be able to compare Traffic Mirroring with VPC Flow Logs and choose the right one for an investigation.",
   "Students will be able to select the correct tool for a given network troubleshooting or audit scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sort student answers into 'should connect but doesn't' and 'shouldn't connect but can'."
   ],
   [
    13,
    "Teach",
    "Whiteboard a VPC with public, app and database subnets, an internet gateway and NACLs. Trace one path hop by hop as Reachability Analyzer would. Then describe a scope 'internet gateway to database subnets' for Network Access Analyzer. Finish by comparing flow log fields with mirrored packets."
   ],
   [
    17,
    "Activity",
    "Run 'Be the analyzer': groups trace paths on a printed network diagram."
   ],
   [
    5,
    "Discuss",
    "Groups report the blocking component they found and the violating path they discovered."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "An app suddenly cannot reach its database after a change. What are all the places in a VPC where that traffic could be blocked?",
  "activity": {
   "title": "Be the analyzer",
   "materials": "Printed VPC diagram with route tables, security group rules and NACL rules listed (one per group), highlighters, whiteboard.",
   "steps": [
    "Groups trace the path from the app instance to the database on TCP 5432, checking route tables, both security groups and both NACLs in each direction, and highlight the rule that blocks it (the teacher plants a missing ephemeral port rule).",
    "Groups then act as Network Access Analyzer: find every path from the internet gateway to the database subnet in the diagram (the teacher plants one misrouted subnet).",
    "Each group writes the Network Access Scope they used in one plain sentence.",
    "Finally, groups decide whether flow logs or Traffic Mirroring would help confirm a planted suspicious transfer, and justify the choice."
   ]
  },
  "discussion": [
   "Why might an auditor trust a Network Access Analyzer result more than a network diagram?",
   "What kinds of problems can a configuration-only tool never find?"
  ],
  "exit": [
   [
    "Which tool tells you the exact rule blocking one connection?",
    "VPC Reachability Analyzer."
   ],
   [
    "Which tool finds every path that violates a segmentation rule?",
    "Network Access Analyzer, using a Network Access Scope."
   ],
   [
    "When do you need Traffic Mirroring instead of flow logs?",
    "When you must inspect packet contents, not just flow metadata such as addresses, ports and accept or reject."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a simplified diagram with only one subnet pair and one NACL, and a checklist of the components to check in order.",
   "Extend: Ask fast finishers to describe a scope that requires all production egress to pass a firewall endpoint, and explain how they would schedule and act on its results."
  ]
 },
 {
  "t": "IAM policy types and evaluation logic: identity-based, resource-based, permissions boundaries, session policies and explicit deny",
  "objectives": [
   "Students will be able to classify IAM policy types as granting (identity-based, resource-based) or limiting (SCP, RCP, permissions boundary, session policy).",
   "Students will be able to apply the evaluation order of explicit deny, guardrails and allow to determine the outcome of a request.",
   "Students will be able to explain how same-account and cross-account evaluation differ, including the KMS key policy and trust policy exceptions.",
   "Students will be able to troubleshoot an AccessDenied scenario by identifying the policy that caused it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and take a quick vote on why the request failed."
   ],
   [
    12,
    "Teach",
    "Draw two boxes on the board, 'Grants' and 'Limits', and have students place each policy type. Then draw the evaluation flowchart: implicit deny, explicit deny check, guardrails, allow. Contrast same-account and cross-account with two quick examples, and call out KMS key policies and trust policies."
   ],
   [
    18,
    "Activity",
    "Run 'Policy court' with request cards in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups present their toughest case and the deciding policy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A role has a policy allowing every S3 action, yet deleting a bucket fails with AccessDenied. List every place that 'no' could have come from.",
  "activity": {
   "title": "Policy court",
   "materials": "Printed case cards (eight to ten) the teacher prepares, each listing a request and the relevant identity policy, resource policy, SCP, boundary or session policy in plain words; a printed evaluation flowchart per group.",
   "steps": [
    "In groups of three, one student is the 'requester', one the 'judge' and one the 'clerk'; roles rotate each case.",
    "The judge walks the flowchart aloud: any explicit deny, every guardrail allows, an allow exists on the right side (both sides if cross-account).",
    "The clerk records the verdict (allowed or denied) and the exact policy that decided it.",
    "Include at least one cross-account case, one KMS key policy case, one management account SCP case and one session policy case.",
    "Groups check verdicts against the teacher's answer key and discuss any disagreement."
   ]
  },
  "discussion": [
   "Why would AWS design guardrails that cannot grant permissions? What problems would arise if they could?",
   "Why do you think KMS key policies and role trust policies are treated differently from other resource policies in the same account?"
  ],
  "exit": [
   [
    "Name two policy types that can grant permissions and two that only limit them.",
    "Grant: identity-based and resource-based. Limit: any two of SCP, RCP, permissions boundary, session policy."
   ],
   [
    "A request matches an Allow in an identity policy and a Deny in a bucket policy. What happens?",
    "It is denied, because an explicit deny overrides every allow."
   ],
   [
    "What is needed for a principal in account A to read a bucket in account B?",
    "An allow in the principal's identity policy in A and an allow in the bucket policy in B, with no deny or guardrail blocking it."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the flowchart with sample answers filled in for two cases, and start them on same-account cases only.",
   "Extend: Ask fast finishers to write a case that is denied only because of a session policy, and another that succeeds only because of a resource-based policy, then swap with another group."
  ]
 },
 {
  "t": "Writing least-privilege policies: condition keys, attribute-based access control with tags, and policy variables",
  "objectives": [
   "Students will be able to select global and service condition keys that meet network, MFA, organization and TLS requirements.",
   "Students will be able to design an ABAC policy that compares principal and resource tags and prevents tag tampering.",
   "Students will be able to use policy variables to give each user access to their own resources.",
   "Students will be able to evaluate whether a policy is least privilege and propose a narrower version."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and list student ideas for 'one policy for 140 teams' on the board."
   ],
   [
    13,
    "Teach",
    "Project a sample policy and annotate actions, resources and conditions. Walk through a table of global condition keys with one use case each. Explain ABAC with principal and resource tags, then show the tag tampering gap and how to close it. Finish with ${aws:username} in an S3 ARN."
   ],
   [
    17,
    "Activity",
    "Run 'Tighten this policy' in pairs on printed policies."
   ],
   [
    5,
    "Discuss",
    "Pairs share the most dangerous gap they found and their fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your company has 140 project teams and gets a new one every week. How could you give each team access to only its own servers without writing 140 policies?",
  "activity": {
   "title": "Tighten this policy",
   "materials": "Printed JSON policies (four per pair) the teacher prepares, a printed condition key reference table, highlighters, a projector for review.",
   "steps": [
    "Pairs read policy one, an ABAC policy with no tag controls, and write how a user could escalate their access and which statements would stop it.",
    "Policy two allows S3 access from 'the company network' using aws:SourceIp, but traffic comes through a VPC endpoint; pairs identify why it fails and fix it.",
    "Policy three uses a list of account IDs; pairs rewrite it with aws:PrincipalOrgID and add a TLS requirement.",
    "Policy four grants s3:* on a shared bucket; pairs narrow it to each user's own prefix with a policy variable.",
    "The teacher projects model answers and pairs compare."
   ]
  },
  "discussion": [
   "What are the operational trade-offs of ABAC compared to one policy per team?",
   "Who in an organization should be allowed to set the tags that grant access, and why?"
  ],
  "exit": [
   [
    "Which condition key would you use to allow S3 access only through a specific VPC endpoint?",
    "aws:SourceVpce."
   ],
   [
    "What extra control does a secure ABAC design need beyond matching tags?",
    "Restrictions on who can create, change or remove the authorization tags on resources and principals."
   ],
   [
    "Write the resource ARN pattern that gives each IAM user their own folder in a bucket named home-bucket.",
    "arn:aws:s3:::home-bucket/${aws:username}/*"
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a filled example of a correct condition block next to each broken policy, and let them do policies three and four first.",
   "Extend: Ask fast finishers to explain the ForAllValues missing-key trap and write a condition that requires the project tag to be present at resource creation."
  ]
 },
 {
  "t": "Temporary credentials: IAM roles, STS AssumeRole, trust policies, external IDs and the confused deputy problem",
  "objectives": [
   "Students will be able to distinguish a role's trust policy from its permissions policies.",
   "Students will be able to describe the requirements for cross-account role assumption and the effect of role chaining on session duration.",
   "Students will be able to explain the confused deputy problem and apply an external ID for third parties.",
   "Students will be able to apply aws:SourceArn and aws:SourceAccount conditions for AWS service principals."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about why permanent keys are risky."
   ],
   [
    12,
    "Teach",
    "Draw two accounts and a role with two labeled policies. Walk through AssumeRole and what STS returns. Show role chaining and the one-hour limit. Then tell the vendor story and introduce the external ID, followed by the service principal case with source ARN and source account."
   ],
   [
    18,
    "Activity",
    "Run the 'Confused deputy role-play' in groups of four."
   ],
   [
    5,
    "Discuss",
    "Groups explain how the attack worked before and why it failed after the fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why might a temporary visitor badge be safer than a permanent key for someone who needs to enter your office occasionally?",
  "activity": {
   "title": "Confused deputy role-play",
   "materials": "Index cards labeled Vendor, Customer A, Customer B (attacker), and Role in Customer A; sticky notes for role ARNs and external IDs; whiteboard.",
   "steps": [
    "Each group assigns the four roles. Customer A writes its role ARN on a sticky note and 'trusts' the Vendor.",
    "Customer B obtains the ARN and asks the Vendor to read 'their' data using it; the Vendor assumes the role and hands over Customer A's data. Groups record why this worked.",
    "The Vendor now issues a unique external ID card to each customer, and Customer A adds 'require this external ID' to its trust policy note.",
    "Customer B repeats the attempt; the Vendor passes Customer B's own external ID, the trust policy check fails, and the group records why.",
    "Groups then adapt the scenario to an AWS service writing to a bucket and write which conditions replace the external ID."
   ]
  },
  "discussion": [
   "Why should the vendor, not the customer, generate the external ID?",
   "When is it acceptable for a trust policy to name a whole account rather than a specific role?"
  ],
  "exit": [
   [
    "What does a trust policy control, and what do permissions policies control?",
    "The trust policy controls who can assume the role; permissions policies control what the role can do."
   ],
   [
    "How does an external ID stop a confused deputy attack?",
    "The vendor passes the external ID tied to the requesting customer, so an attacker cannot make it pass the victim's ID and the trust policy condition fails."
   ],
   [
    "Which conditions protect a resource policy that allows an AWS service principal?",
    "aws:SourceArn and aws:SourceAccount."
   ]
  ],
  "differentiation": [
   "Support: Provide a step-by-step script for the role-play and a diagram with the trust and permissions policies already labeled.",
   "Extend: Ask fast finishers to explain how sts:SourceIdentity and the role session name help attribute actions across chained sessions in CloudTrail."
  ]
 },
 {
  "t": "Workforce identity: IAM Identity Center, permission sets, SAML 2.0 federation, SCIM provisioning and MFA",
  "objectives": [
   "Students will be able to explain the roles of SAML 2.0 and SCIM in connecting an external identity provider to IAM Identity Center.",
   "Students will be able to describe how permission sets and assignments become IAM roles in member accounts.",
   "Students will be able to design a multi-account workforce access model with MFA and no IAM users for people.",
   "Students will be able to compare Identity Center with per-account IAM SAML federation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and count on the board how many manual steps the current offboarding takes."
   ],
   [
    12,
    "Teach",
    "Draw the IdP, Identity Center and three member accounts. Add arrows for SAML (sign-in) and SCIM (provisioning) in different colors. Show a permission set turning into AWSReservedSSO roles. Close with MFA choices and the CLI flow."
   ],
   [
    18,
    "Activity",
    "Run 'Design the access model' in groups using company profile cards."
   ],
   [
    5,
    "Discuss",
    "Groups present their offboarding flow and explain how it reaches every account."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When someone leaves your company, how many systems would someone need to update by hand to remove their access? What could go wrong?",
  "activity": {
   "title": "Design the access model",
   "materials": "Printed company profile cards (number of accounts, identity provider, teams and needs), sticky notes in three colors, whiteboard or large paper.",
   "steps": [
    "Each group reads its company profile and draws the identity source, Identity Center and the accounts.",
    "Groups create permission sets on sticky notes (for example ReadOnly, Developer, SecurityAudit) and assign groups to accounts with arrows.",
    "Groups mark which arrow is SAML, which is SCIM, and where MFA is enforced.",
    "Each group walks through 'a developer joins' and 'a contractor leaves' step by step on their diagram.",
    "Groups list one reason per-account SAML federation would be worse for their profile."
   ]
  },
  "discussion": [
   "Should MFA be enforced at the IdP or in Identity Center, and what decides that?",
   "What risks remain if some IAM users with access keys are kept for legacy tools?"
  ],
  "exit": [
   [
    "Which standard handles sign-in and which handles provisioning between an IdP and Identity Center?",
    "SAML 2.0 for sign-in; SCIM for provisioning."
   ],
   [
    "What appears in an account after you assign a permission set to a group there?",
    "An IAM role with an AWSReservedSSO_ prefix containing the permission set's policies."
   ],
   [
    "Name a phishing-resistant MFA method Identity Center supports.",
    "FIDO2 security keys or passkeys."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a partially drawn diagram with the IdP and Identity Center already placed and a word bank of SAML, SCIM, permission set and assignment.",
   "Extend: Ask fast finishers to add ABAC to their design by mapping an IdP attribute to a session tag and describing one policy that uses it."
  ]
 },
 {
  "t": "Application and customer identity: Amazon Cognito user pools vs identity pools, and Amazon Verified Permissions",
  "objectives": [
   "Students will be able to distinguish Cognito user pools (authentication and tokens) from identity pools (temporary AWS credentials).",
   "Students will be able to describe how identity pool roles and policy variables restrict each user to their own data.",
   "Students will be able to explain when to use Amazon Verified Permissions and Cedar for application authorization.",
   "Students will be able to map application identity requirements to the correct service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and list the risks students identify with IAM users for app customers."
   ],
   [
    12,
    "Teach",
    "Draw the three boxes: sign-in, AWS credentials, business rules. Fill in the user pool with tokens, the identity pool with authenticated and guest roles, and Verified Permissions with a sample Cedar rule in plain words. Show the policy variable for per-user S3 prefixes."
   ],
   [
    18,
    "Activity",
    "Run the 'Which box?' requirement card sort in pairs, then a mini design."
   ],
   [
    5,
    "Discuss",
    "Pairs share any requirement they found ambiguous and how they decided."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A team plans to create an IAM user for each of their app's two million customers. List every problem you can think of with that plan.",
  "activity": {
   "title": "Which box?",
   "materials": "Printed requirement cards (about twelve) the teacher writes, three labeled zones on desks or the whiteboard (User pool, Identity pool, Verified Permissions), plus a distractor zone labeled IAM Identity Center.",
   "steps": [
    "Pairs sort requirement cards such as 'sign in with Apple', 'guest users read public images in S3', 'only album owners can delete albums', 'employees sign in to the AWS console', 'MFA for customers', 'each user writes only to their own DynamoDB items'.",
    "For each card in the identity pool zone, pairs write which role (authenticated or guest) and what the policy would allow.",
    "For each card in the Verified Permissions zone, pairs write the rule as a plain-language permit or forbid statement.",
    "Pairs then sketch the full flow for a photo-sharing app from sign-in to upload to sharing decision."
   ]
  },
  "discussion": [
   "What are the benefits and costs of moving business authorization rules out of application code?",
   "When would you allow unauthenticated access through an identity pool, and how would you limit it?"
  ],
  "exit": [
   [
    "What does a user pool issue after sign-in?",
    "JWTs: an ID token, an access token and a refresh token."
   ],
   [
    "How does an identity pool give an app user AWS access?",
    "It exchanges the user's token for temporary credentials by assuming an IAM role through STS."
   ],
   [
    "Which service evaluates Cedar policies for application authorization?",
    "Amazon Verified Permissions."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a reference card with one example requirement already placed in each zone, and reduce the deck to six cards.",
   "Extend: Ask fast finishers to describe how a Cognito user pool group claim could drive both identity pool role selection and a Verified Permissions policy."
  ]
 },
 {
  "t": "Workload identity outside AWS: IAM Roles Anywhere, OIDC federation for CI/CD pipelines, and EKS Pod Identity",
  "objectives": [
   "Students will be able to explain how IAM Roles Anywhere uses trust anchors, profiles and X.509 certificates to issue temporary credentials.",
   "Students will be able to evaluate an OIDC trust policy for a CI/CD pipeline and identify missing or weak aud and sub conditions.",
   "Students will be able to compare EKS Pod Identity with IRSA and explain why pods should not use the node role.",
   "Students will be able to choose the right workload identity method for a given environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and list every place students have seen access keys stored."
   ],
   [
    12,
    "Teach",
    "Draw three lanes: data center server, CI/CD pipeline, EKS pod. For each, show the identity proof (certificate, OIDC token, service account), the AWS trust configuration and the temporary credentials. Highlight the sub condition and the node role problem."
   ],
   [
    18,
    "Activity",
    "Run 'Trust policy review' in pairs with printed policy excerpts."
   ],
   [
    5,
    "Discuss",
    "Pairs share the most dangerous trust policy they found and their fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Where have you seen passwords or keys stored in build systems, scripts or config files? What could happen if one of those files were shared by mistake?",
  "activity": {
   "title": "Trust policy review",
   "materials": "Printed trust policy excerpts (five per pair) in plain JSON prepared by the teacher, highlighters, a projector for answers.",
   "steps": [
    "Pairs review an OIDC trust policy with no sub condition, one with a wildcard sub, and one correctly scoped to a repository and environment; they rank them by risk and rewrite the weak ones.",
    "Pairs review a Roles Anywhere trust policy without certificate attribute conditions and add a condition limiting it to one server's subject.",
    "Pairs review a Kubernetes design where all pods use the node role and redesign it with Pod Identity, noting the service principal and per-service-account roles.",
    "Pairs write one sentence per case explaining who could have abused the original policy."
   ]
  },
  "discussion": [
   "What new operational duties does Roles Anywhere create, such as certificate issuance and revocation, and who should own them?",
   "Why is a wildcard in a sub condition more dangerous than it first looks?"
  ],
  "exit": [
   [
    "What does IAM Roles Anywhere use to verify a workload's identity?",
    "An X.509 certificate validated against a trust anchor (the trusted CA)."
   ],
   [
    "Which two token claims should an OIDC trust policy for CI/CD check?",
    "The audience (aud) and the subject (sub)."
   ],
   [
    "Why should EKS pods not use the node's instance role?",
    "All pods on the node would share its permissions; Pod Identity or IRSA gives each workload its own least-privilege role."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs an annotated example of a correct OIDC trust policy to compare against before they review the weak ones.",
   "Extend: Ask fast finishers to explain how Pod Identity session tags could be used in an ABAC policy so one role serves several namespaces safely."
  ]
 },
 {
  "t": "Root user and credential hygiene: protecting the root user, centralized root access, removing long-term keys and credential reports",
  "objectives": [
   "Students will be able to list the controls that protect a standalone account's root user and identify tasks that require root.",
   "Students will be able to explain how centralized root access management and sts:AssumeRoot work in AWS Organizations.",
   "Students will be able to read a credential report to identify stale keys, unused credentials and users without MFA.",
   "Students will be able to describe a safe access key rotation process and the preferred alternatives to long-term keys."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers about who should hold a master key."
   ],
   [
    12,
    "Teach",
    "List root-only tasks on the board, then the standalone root checklist. Draw an organization with a delegated administrator issuing a task-scoped root session to a member account. Project a sample credential report header row and explain each column group. Finish with the four-step key rotation."
   ],
   [
    18,
    "Activity",
    "Run 'Audit the credential report' in pairs using a printed sample report."
   ],
   [
    5,
    "Discuss",
    "Pairs share their top remediation priorities and the long-term fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your organization had a single master key that opened every door and could even sell the building, where would you keep it, and how would you know if someone used it?",
  "activity": {
   "title": "Audit the credential report",
   "materials": "A printed sample credential report (about fifteen fictional users, prepared by the teacher, including the root row), highlighters, a remediation worksheet.",
   "steps": [
    "Pairs highlight the root row and check for active root access keys and MFA status.",
    "Pairs mark users with access keys older than 90 days, keys never used, users without MFA and users inactive for six months.",
    "For each marked user, pairs choose an action: rotate, deactivate then delete, enforce MFA, or replace with Identity Center or a role.",
    "Pairs write the four rotation steps for one key that must stay.",
    "Pairs add one sentence on how centralized root access would change the root row across 100 member accounts."
   ]
  },
  "discussion": [
   "What are the risks of storing root MFA devices for many accounts in one physical location?",
   "Why does AWS limit AssumeRoot sessions to specific tasks instead of granting full root?"
  ],
  "exit": [
   [
    "Should root access keys exist? Why?",
    "No. Almost no task requires them, and a leaked root key gives complete control; delete any that exist."
   ],
   [
    "What does sts:AssumeRoot provide?",
    "A short-term, task-scoped root session in a member account, used with centralized root access management."
   ],
   [
    "What should you do before deleting an old access key during rotation?",
    "Create and deploy the new key, confirm the old key is no longer used, and deactivate it first."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a column guide that explains each credential report field in plain words, and a shortened report with eight users.",
   "Extend: Ask fast finishers to describe an SCP statement that denies actions by the root user in member accounts and explain how it interacts with centralized root access."
  ]
 },
 {
  "t": "Finding and removing excess access: IAM Access Analyzer external and unused access findings, policy generation and last-accessed data",
  "objectives": [
   "Students will be able to explain how the zone of trust determines external access findings.",
   "Students will be able to distinguish external access findings, unused access findings, policy generation and policy validation.",
   "Students will be able to plan a permission cleanup that uses Access Analyzer and last-accessed data without breaking workloads.",
   "Students will be able to choose between archiving a finding and changing a policy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up and list student ideas for finding unused access."
   ],
   [
    12,
    "Teach",
    "Draw an organization boundary and an account boundary, and show how the same cross-account grant is or is not a finding depending on the zone of trust. Introduce unused access findings, policy generation from CloudTrail, validation and custom checks, and last-accessed data, one sentence and one example each."
   ],
   [
    18,
    "Activity",
    "Run 'Findings triage board' in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups explain one archive decision and one policy change, and their cleanup order."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your company has 1,900 roles and nobody knows which are still used. How would you find out without breaking anything?",
  "activity": {
   "title": "Findings triage board",
   "materials": "Printed finding cards (about twelve) the teacher prepares, mixing external access findings (bucket shared with a former vendor, KMS key shared with an auditor, public SQS queue) and unused access findings (role unused for 120 days, unused access key, unused service permissions); whiteboard divided into Archive, Fix policy, Remove, Investigate.",
   "steps": [
    "Groups sort each card onto the board and write a one-line justification on a sticky note.",
    "For each 'Archive' card, groups write the archive rule criteria they would use.",
    "For one active role with broad permissions, groups write the steps to tighten it: generate a policy from CloudTrail, refine resources and conditions, validate, confirm with last-accessed data, deploy.",
    "Groups decide which zone of trust they would choose and how that changes two of the cards."
   ]
  },
  "discussion": [
   "What is the risk of deleting a role flagged as unused, and how would you reduce it?",
   "Who should be allowed to archive findings, and how would you review archive rules over time?"
  ],
  "exit": [
   [
    "With an account zone of trust, is access granted to another account in your organization reported?",
    "Yes. Only the analyzer's own account is trusted, so other accounts are external."
   ],
   [
    "Which feature reports roles and access keys that have not been used?",
    "The unused access analyzer in IAM Access Analyzer."
   ],
   [
    "What does policy generation base its output on, and what must you still add?",
    "CloudTrail activity over a chosen period; you still refine it with specific resources and conditions."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a decision flowchart (intended? archive; not intended? fix policy) and fewer cards.",
   "Extend: Ask fast finishers to design a CI/CD gate using custom policy checks, describing which checks they would run and what would fail the build."
  ]
 },
 {
  "t": "Troubleshooting access denied errors: reading the error message, CloudTrail, the IAM policy simulator and cross-account checks",
  "objectives": [
   "Students will be able to interpret AWS access denied error wording to identify whether an SCP, identity policy or resource policy caused the denial.",
   "Students will be able to use CloudTrail event fields and sts get-caller-identity to confirm the principal, action, resource and Region of a failed call.",
   "Students will be able to explain how the IAM policy simulator evaluates identity policies, boundaries, SCPs and resource policies.",
   "Students will be able to diagnose hidden causes such as KMS key policies, VPC endpoint policies and missing cross-account allows."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a real-looking AccessDenied message with no other context. Ask students to write down the first three things they would check and share a few answers."
   ],
   [
    12,
    "Teach",
    "Walk through the four-step method: read the message, check CloudTrail, test with the policy simulator, then check usual suspects. Show example error wordings and map each one to the policy type to inspect. Emphasize that encrypted data needs both data and KMS permissions."
   ],
   [
    18,
    "Activity",
    "Run the 'Denied Detective' case cards in pairs. Each pair diagnoses three cases using a printed CloudTrail event and policy excerpts, and writes the blocking policy and the least-privilege fix."
   ],
   [
    5,
    "Discuss",
    "Pairs report one case each. Ask which clue in the evidence gave the answer away and which wrong fix was tempting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note or short form."
   ]
  ],
  "warmup": "You receive the message 'User: arn:aws:sts::111122223333:assumed-role/ReportJob/abc is not authorized to perform s3:GetObject'. List the first three things you would check, in order, and why.",
  "activity": {
   "title": "Denied Detective: diagnose the blocking policy",
   "materials": "Printed case cards (made by the teacher) each containing a short scenario, a CloudTrail event excerpt and two to four policy excerpts; whiteboard; markers.",
   "steps": [
    "Prepare six case cards: an SCP explicit deny on a Region, a missing identity allow, a KMS key policy that omits the role, a VPC endpoint policy limited to another bucket, a condition requiring MFA, and a cross-account call missing the caller-side allow.",
    "Give each pair three cards. For each, they highlight the CloudTrail fields that matter (principal, action, resource, Region, error code).",
    "Pairs identify which policy is blocking the request and whether the denial is explicit or implicit.",
    "Pairs write the smallest fix that would resolve the denial without granting broad permissions, and note one fix that would be wrong.",
    "Pairs swap one card with a neighboring pair and check each other's diagnosis."
   ]
  },
  "discussion": [
   "Why is adding AdministratorAccess a poor troubleshooting step even when it appears to fix the problem?",
   "How would your process change if the error message gave no hint about the policy type?"
  ],
  "exit": [
   [
    "What does 'with an explicit deny in a service control policy' tell you?",
    "An organization SCP explicitly denies the action; no permission inside the account can override it, so the request or the SCP must change."
   ],
   [
    "A role has s3:GetObject but reading an SSE-KMS object fails. What is the likely cause?",
    "The role lacks kms:Decrypt on the key, usually because the KMS key policy does not allow it."
   ],
   [
    "What must be true for a principal in account A to read a bucket in account B?",
    "Account A's identity policy must allow the action and account B's bucket policy must allow account A or that principal."
   ]
  ],
  "differentiation": [
   "Support: give struggling students a one-page flowchart (message, CloudTrail, simulator, keys, endpoints, other account) and let them work the first case card alongside the teacher.",
   "Extend: ask fast finishers to write their own case card with a subtle cause, such as a session policy or a tag-based condition, and trade it with another pair."
  ]
 },
 {
  "t": "Encryption in transit: TLS certificates from ACM, ELB security policies, enforcing aws:SecureTransport and inter-node encryption",
  "objectives": [
   "Students will be able to explain how ACM issues, validates and renews certificates, including the limits of imported certificates and the us-east-1 rule for CloudFront.",
   "Students will be able to compare TLS termination, re-encryption and pass-through on ALBs and NLBs.",
   "Students will be able to write a resource policy statement that enforces TLS with aws:SecureTransport.",
   "Students will be able to identify where service-specific inter-node encryption must be enabled."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a simple diagram of browser to ALB to EC2 to S3 and OpenSearch. Ask students to circle every hop they think is encrypted and explain why."
   ],
   [
    13,
    "Teach",
    "Cover ACM validation and renewal, imported certificates, the CloudFront us-east-1 rule, ELB security policies, redirects, re-encryption versus pass-through, the aws:SecureTransport deny and node-to-node encryption."
   ],
   [
    17,
    "Activity",
    "Groups use 'Trace the Hop' architecture cards to mark each hop, choose a control and write one enforcing policy statement."
   ],
   [
    5,
    "Discuss",
    "Compare group answers on the ALB-to-target hop and the S3 policy. Ask why the Deny form matters."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a website shows a padlock in the browser, is the data encrypted all the way to the database? Write yes or no and one sentence of reasoning.",
  "activity": {
   "title": "Trace the Hop",
   "materials": "Printed architecture cards (made by the teacher) showing four different designs; colored markers; whiteboard; student laptops with a browser optional for looking up policy syntax.",
   "steps": [
    "Give each group of three one architecture card with five to seven network hops, including a load balancer, compute, S3, a database and a cluster service.",
    "Groups mark each hop green (encrypted and enforced), yellow (encrypted but not enforced) or red (plaintext).",
    "For each yellow or red hop, groups name the control that fixes it: ACM certificate, ELB security policy, redirect, re-encryption, NLB pass-through, aws:SecureTransport deny, force TLS parameter or node-to-node encryption.",
    "Each group writes a bucket policy statement on the whiteboard that denies requests when aws:SecureTransport is false.",
    "Groups rotate to check another group's card and add one sticky-note comment."
   ]
  },
  "discussion": [
   "When would you accept TLS termination at the load balancer, and when would you insist on pass-through?",
   "Why might an auditor not accept hardware-level Nitro encryption as the only control for regulated data?"
  ],
  "exit": [
   [
    "Where must an ACM certificate for CloudFront be located?",
    "In the us-east-1 Region."
   ],
   [
    "Write the condition that enforces TLS on an S3 bucket.",
    "An explicit Deny statement for all principals and S3 actions with Condition Bool aws:SecureTransport false."
   ],
   [
    "Name one way to keep traffic encrypted between an ALB and its targets.",
    "Use an HTTPS target group so the ALB re-encrypts to targets (or use an NLB TCP pass-through instead)."
   ]
  ],
  "differentiation": [
   "Support: provide a partially completed hop diagram and a fill-in-the-blank policy template so students focus on choosing the right control.",
   "Extend: ask students to design mutual TLS for a partner API and explain whether ALB mTLS or NLB pass-through fits better, with trade-offs."
  ]
 },
 {
  "t": "AWS KMS fundamentals: key types, key policies, grants, envelope encryption, encryption context and key rotation",
  "objectives": [
   "Students will be able to compare customer managed, AWS managed and AWS owned KMS keys by who controls the policy, rotation and visibility.",
   "Students will be able to explain why the key policy must allow access before IAM policies take effect.",
   "Students will be able to describe the steps of envelope encryption using GenerateDataKey and Decrypt.",
   "Students will be able to apply encryption context and rotation correctly in a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: 'If the safe's key is in the safe, how do you open the safe?' Use responses to introduce why KMS keys never leave the HSMs."
   ],
   [
    13,
    "Teach",
    "Present key types, key policies and the default root statement, grants and kms:ViaService, the 4 KB limit and envelope encryption, encryption context and rotation behavior."
   ],
   [
    17,
    "Activity",
    "Pairs role-play envelope encryption with paper 'keys' and envelopes, then solve two key policy cards."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play: what was thrown away, what was stored, and what showed up in the 'CloudTrail' log the teacher kept."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your app has an IAM policy allowing kms:Decrypt on a key, but calls are denied. Name one possible reason before we start.",
  "activity": {
   "title": "Envelope Encryption Role-Play",
   "materials": "Paper slips labeled as data keys, envelopes, sticky notes for encryption context, a whiteboard section labeled CloudTrail, and two printed key policy cards made by the teacher.",
   "steps": [
    "Assign one student per pair as the Application and the teacher acts as KMS at the front of the room.",
    "The Application requests a data key; KMS hands over a plaintext slip and a sealed envelope containing an identical slip, and writes the call and its encryption context sticky note on the CloudTrail board.",
    "The Application 'encrypts' a paragraph by writing it in a simple code using the slip, tears up the plaintext slip, and staples the sealed envelope to the ciphertext.",
    "To decrypt, the Application returns the envelope with the same encryption context; KMS refuses any request with a different context.",
    "Pairs then read two key policy cards and decide whether an IAM policy alone would grant access in each case, and why."
   ]
  },
  "discussion": [
   "Why might an organization choose a customer managed key even though AWS managed keys are simpler?",
   "What could go wrong if a developer put a customer's email address in the encryption context?"
  ],
  "exit": [
   [
    "What two items does GenerateDataKey return?",
    "A plaintext data key and the same data key encrypted under the KMS key."
   ],
   [
    "Can you edit the key policy of aws/ebs?",
    "No. AWS managed key policies cannot be changed; use a customer managed key for control."
   ],
   [
    "What happens to old ciphertext after automatic rotation?",
    "It still decrypts, because KMS keeps previous key material and the key ID stays the same."
   ]
  ],
  "differentiation": [
   "Support: provide a labeled diagram of envelope encryption with blanks for students to fill in while following the role-play.",
   "Extend: ask students to write a key policy statement that allows a role to decrypt only via S3 in one Region and only with a specific encryption context key."
  ]
 },
 {
  "t": "Advanced KMS: cross-account key use, multi-Region keys, imported key material and CloudHSM key stores",
  "objectives": [
   "Students will be able to explain the two policies needed for cross-account KMS key use and why AWS managed keys cannot be shared.",
   "Students will be able to describe how multi-Region keys support cross-Region decryption and what remains Region-specific.",
   "Students will be able to compare imported key material, CloudHSM key stores and external key stores by control, responsibility and availability.",
   "Students will be able to select the right KMS feature for a given regulatory or architectural requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the Brightwater scenario's three problems on the board and ask students to guess which need a new kind of key and which need only a policy change."
   ],
   [
    13,
    "Teach",
    "Explain cross-account key policy plus IAM, the AWS managed key snapshot limitation, multi-Region keys, imported key material, CloudHSM key stores and external key stores with their trade-offs."
   ],
   [
    17,
    "Activity",
    "Requirement matching card sort in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups defend their choice for the hardest card and the class votes on disagreements."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your backup account cannot copy an encrypted RDS snapshot from production. Is the problem the snapshot or the key? Explain in one sentence.",
  "activity": {
   "title": "Requirement to Key Feature card sort",
   "materials": "Printed requirement cards (made by the teacher), six header cards (standard KMS, cross-account key policy, multi-Region key, imported key material, CloudHSM key store, external key store), tape or a whiteboard.",
   "steps": [
    "Give each group of three or four a deck of twelve requirement cards, such as 'decrypt in a second Region during failover' or 'regulator requires keys never stored in AWS'.",
    "Groups place each card under the header that best meets it, using standard KMS when nothing special is required.",
    "For each placement, groups write one trade-off on a sticky note, such as added latency or responsibility for availability.",
    "Groups compare with a neighboring group and resolve differences.",
    "The teacher reveals the intended answers and highlights cards that tempt over-engineering."
   ]
  },
  "discussion": [
   "Why does AWS recommend multi-Region keys only when needed, and how could they conflict with data residency rules?",
   "What new operational risks does a team accept when it moves keys to a CloudHSM or external key store?"
  ],
  "exit": [
   [
    "What must change to share an EBS snapshot encrypted with aws/ebs?",
    "Copy and re-encrypt it with a customer managed key whose key policy allows the other account, then share the copy."
   ],
   [
    "Which feature lets a replica in another Region decrypt ciphertext locally?",
    "A multi-Region key."
   ],
   [
    "Which option keeps key material in single-tenant HSMs while still using KMS APIs?",
    "A CloudHSM key store."
   ]
  ],
  "differentiation": [
   "Support: provide a decision table listing each feature with one trigger phrase so students can match cards by keyword first.",
   "Extend: ask students to design key strategy for a company with three Regions and a separate backup account, specifying key types, policies and rotation."
  ]
 },
 {
  "t": "S3 encryption and access: SSE-S3, SSE-KMS, DSSE-KMS and SSE-C, S3 Bucket Keys, Block Public Access and Object Ownership",
  "objectives": [
   "Students will be able to compare SSE-S3, SSE-KMS, DSSE-KMS, SSE-C and client-side encryption by key control, auditing and responsibility.",
   "Students will be able to explain how S3 Bucket Keys reduce KMS cost and how they change the encryption context.",
   "Students will be able to describe the four Block Public Access settings and the effect of bucket owner enforced Object Ownership.",
   "Students will be able to write a bucket policy condition that requires a specific encryption type."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: 'If S3 already encrypts everything by default, why would anyone choose a different option?' Collect answers on the board."
   ],
   [
    12,
    "Teach",
    "Present the encryption options in a comparison table, then Bucket Keys, Block Public Access settings, Object Ownership, access points and presigned URLs."
   ],
   [
    18,
    "Activity",
    "Groups act as a cloud review board choosing S3 settings for four department requests."
   ],
   [
    5,
    "Discuss",
    "Compare decisions, especially where groups chose SSE-C or DSSE-KMS, and discuss the trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List two reasons a company might prefer a customer managed KMS key over the S3 default encryption.",
  "activity": {
   "title": "S3 Review Board",
   "materials": "Printed request cards (made by the teacher), a blank S3 settings worksheet per group listing encryption type, Bucket Key, Block Public Access, Object Ownership and policy condition, whiteboard.",
   "steps": [
    "Give each group four request cards, for example a high-volume log bucket, a partner upload bucket, a regulated archive requiring dual-layer encryption, and an app that must hold its own keys.",
    "For each request, the group fills in the settings worksheet and justifies each choice in one line.",
    "Each group writes one bucket policy condition on a sticky note enforcing the chosen encryption.",
    "Groups present one request to the class, and other groups challenge one setting.",
    "The teacher summarizes common patterns on the whiteboard."
   ]
  },
  "discussion": [
   "What risks does SSE-C shift onto the customer, and when are those risks worth taking?",
   "Why did AWS make bucket owner enforced and Block Public Access the defaults for new buckets?"
  ],
  "exit": [
   [
    "Which option keeps the key out of AWS storage entirely while S3 still performs encryption?",
    "SSE-C."
   ],
   [
    "Why enable S3 Bucket Keys?",
    "To reduce KMS requests, throttling and cost for SSE-KMS."
   ],
   [
    "What does bucket owner enforced do?",
    "Disables ACLs and makes the bucket owner own every object, so only policies control access."
   ]
  ],
  "differentiation": [
   "Support: give a comparison table with blanks for key holder, logging and responsibility so students build understanding before the activity.",
   "Extend: ask students to write a full bucket policy that denies non-TLS requests and uploads not using a specific KMS key ARN."
  ]
 },
 {
  "t": "Data integrity and retention: S3 Object Lock governance vs compliance mode, versioning, MFA Delete and AWS Backup Vault Lock",
  "objectives": [
   "Students will be able to distinguish S3 Object Lock governance mode, compliance mode and legal holds.",
   "Students will be able to explain what versioning and MFA Delete protect against and their limitations.",
   "Students will be able to describe how AWS Backup Vault Lock and cross-account copies protect backups from account compromise.",
   "Students will be able to choose the right retention control from scenario wording."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students: 'An attacker has your administrator password. What data could they destroy, and what could stop them?' List ideas."
   ],
   [
    12,
    "Teach",
    "Cover versioning and delete markers, MFA Delete limits, Object Lock modes and legal holds, default retention, Vault Lock modes and cooling-off time, and cross-account backup copies."
   ],
   [
    18,
    "Activity",
    "Ransomware tabletop: groups receive attacker action cards and decide which controls would stop each action."
   ],
   [
    5,
    "Discuss",
    "Groups share which attacker actions got through and what control would have stopped them."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your manager says 'We have versioning on, so our data cannot be deleted.' Is that true? Write one sentence.",
  "activity": {
   "title": "Ransomware Tabletop",
   "materials": "Printed attacker action cards and environment cards (made by the teacher), whiteboard grid with columns for each control, markers.",
   "steps": [
    "Give each group an environment card describing a bucket and backup setup, such as versioning only, governance mode with a broadly granted bypass permission, or compliance mode with cross-account backups.",
    "The teacher reads attacker actions one at a time, for example 'delete all object versions', 'shorten retention', 'delete recovery points', 'disable versioning'.",
    "Groups decide whether each action succeeds in their environment and record the reason.",
    "After all actions, groups redesign their environment with the minimum changes to block every action while meeting a stated business need.",
    "Groups post their redesign on the whiteboard grid."
   ]
  },
  "discussion": [
   "When is compliance mode too strict for a business, and what could go wrong if it is chosen carelessly?",
   "Why is a separate backup account valuable even when Vault Lock is already in place?"
  ],
  "exit": [
   [
    "Which Object Lock mode stops even the root user from deleting a locked version?",
    "Compliance mode."
   ],
   [
    "What does a legal hold do that a retention period does not?",
    "It prevents deletion with no end date until someone with permission removes it."
   ],
   [
    "Why is MFA Delete less practical than Object Lock?",
    "Only the root user can enable it, via CLI or API, and it requires the root MFA code for each permanent delete."
   ]
  ],
  "differentiation": [
   "Support: provide a two-column cheat sheet of governance versus compliance mode with who can bypass and how retention can change.",
   "Extend: ask students to design a retention strategy for logs, trade records and database backups across three accounts, with justification for each mode."
  ]
 },
 {
  "t": "Secrets and certificates: Secrets Manager rotation, Parameter Store SecureString and AWS Private CA",
  "objectives": [
   "Students will be able to compare Secrets Manager and Parameter Store SecureString by rotation, cost and access control.",
   "Students will be able to describe the four Lambda rotation steps and the role of staging labels.",
   "Students will be able to explain how to share a secret across accounts using a resource policy and a customer managed KMS key.",
   "Students will be able to explain what AWS Private CA provides and why certificate issuance must be tightly restricted."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a fictional code snippet with a hard-coded password and ask students to list every way that password could leak."
   ],
   [
    13,
    "Teach",
    "Cover Secrets Manager managed and Lambda rotation, staging labels, cross-account access, caching clients, Parameter Store tiers and SecureString, and AWS Private CA hierarchy, issuance and revocation."
   ],
   [
    17,
    "Activity",
    "Groups act out a rotation and then sort secret-storage scenario cards."
   ],
   [
    5,
    "Discuss",
    "Debrief what would have broken without the testSecret step and which scenarios were hardest to classify."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A password has been leaked in a public repository. List everything you would have to change today if it were hard-coded in your applications.",
  "activity": {
   "title": "Rotation Relay and Storage Sort",
   "materials": "Index cards labeled createSecret, setSecret, testSecret and finishSecret; sticky notes labeled AWSCURRENT and AWSPENDING; printed scenario cards made by the teacher; whiteboard.",
   "steps": [
    "In groups of four, each student takes one rotation step card and the group acts out a rotation, physically moving the AWSPENDING and AWSCURRENT sticky notes between two written passwords on the whiteboard.",
    "The teacher introduces a failure at testSecret for one group and asks what the application sees; the group explains why the label did not move.",
    "Groups then sort eight scenario cards into Secrets Manager, Parameter Store String, Parameter Store SecureString or AWS Private CA.",
    "For each card, groups note one reason for the choice and any KMS key requirement.",
    "Groups compare sorts with a neighboring group and resolve disagreements."
   ]
  },
  "discussion": [
   "What are the trade-offs between reading a secret at application startup and reading it on every request?",
   "Why might an organization use short-lived certificates instead of relying on revocation lists?"
  ],
  "exit": [
   [
    "Which service rotates RDS credentials without custom code?",
    "AWS Secrets Manager with managed rotation (or RDS-managed master passwords in Secrets Manager)."
   ],
   [
    "What is the limitation of Parameter Store SecureString compared with Secrets Manager?",
    "It has no built-in automatic rotation."
   ],
   [
    "Why restrict acm-pca:IssueCertificate?",
    "Anyone who can issue certificates can impersonate internal services."
   ]
  ],
  "differentiation": [
   "Support: give students a side-by-side comparison card of Secrets Manager and Parameter Store to reference during the sort.",
   "Extend: ask students to design an alternating-users rotation for a database and explain how it avoids downtime compared with single-user rotation."
  ]
 },
 {
  "t": "Sensitive data discovery and masking: Amazon Macie and CloudWatch Logs data protection policies",
  "objectives": [
   "Students will be able to explain how Macie evaluates S3 bucket posture and discovers sensitive data with managed and custom data identifiers.",
   "Students will be able to compare automated sensitive data discovery with sensitive data discovery jobs.",
   "Students will be able to describe how CloudWatch Logs data protection policies mask data and how logs:Unmask controls access.",
   "Students will be able to distinguish Macie, GuardDuty and Inspector in exam scenarios."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: 'If you inherited 500 storage buckets today, how would you find the ones with customer data?' Collect ideas."
   ],
   [
    12,
    "Teach",
    "Cover Macie bucket inventory and policy findings, data identifiers and allow lists, automated discovery versus jobs, EventBridge and Security Hub integration, delegated administration, and CloudWatch Logs data protection."
   ],
   [
    18,
    "Activity",
    "Pairs play 'Find and Mask' with printed fake records, writing simple patterns and masking a log excerpt."
   ],
   [
    5,
    "Discuss",
    "Discuss false positives and false negatives from the activity and how allow lists and keywords help."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name three kinds of data you would consider sensitive if you found them in a log file.",
  "activity": {
   "title": "Find and Mask",
   "materials": "Printed sheets of clearly fake records and a fake application log excerpt (made by the teacher), highlighters, student laptops with a browser for an optional free regular expression tester, whiteboard.",
   "steps": [
    "Give each pair a sheet of 30 fake records containing names, fake employee IDs in a company format, test card numbers and harmless lookalike numbers.",
    "Pairs highlight what a managed identifier would catch and design a custom identifier for the employee ID, writing a pattern and a keyword such as 'employee'.",
    "Pairs list values that belong on an allow list, such as published test card numbers.",
    "Pairs then take the fake log excerpt and rewrite it as a masked version, noting who in the company should hold logs:Unmask.",
    "Two pairs swap and check whether any sensitive value was missed."
   ]
  },
  "discussion": [
   "Why is masking logs not enough on its own, and who is responsible for fixing the application?",
   "How would you balance the cost of full Macie scans against the risk of missing sensitive data?"
  ],
  "exit": [
   [
    "Which Macie feature samples objects daily to score buckets?",
    "Automated sensitive data discovery."
   ],
   [
    "What does logs:Unmask allow?",
    "Viewing the original values masked by a CloudWatch Logs data protection policy."
   ],
   [
    "A question asks for the service that finds credit card numbers in S3. GuardDuty, Inspector or Macie?",
    "Macie."
   ]
  ],
  "differentiation": [
   "Support: provide a three-row chart of Macie, GuardDuty and Inspector with the question each answers, and a pre-written pattern to adapt.",
   "Extend: ask students to design an EventBridge-driven response that restricts a bucket automatically when Macie reports high-severity sensitive data findings, noting the risks of automated changes."
  ]
 },
 {
  "t": "Encrypting data stores: EBS encryption by default, RDS, Aurora and DynamoDB encryption, and encrypting existing unencrypted resources",
  "objectives": [
   "Students will be able to explain the scope and limits of EBS encryption by default.",
   "Students will be able to describe the procedure to encrypt existing unencrypted EBS volumes and RDS or Aurora databases.",
   "Students will be able to compare the key options for DynamoDB and the creation-time encryption rule for EFS.",
   "Students will be able to recommend detective and preventive controls for unencrypted resources."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the auditor's finding from the hook and ask students to vote on which resources can be encrypted in place."
   ],
   [
    12,
    "Teach",
    "Walk through EBS encryption and encryption by default, the snapshot-copy method, RDS and Aurora rules including replicas and DMS, TDE, DynamoDB key choices, EFS, S3 Batch Operations, and Config rules and SCPs."
   ],
   [
    18,
    "Activity",
    "Groups write migration runbooks for a mixed set of unencrypted resources on the whiteboard."
   ],
   [
    5,
    "Discuss",
    "Compare runbooks for downtime and order of steps, and discuss which preventive control each group added."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "True or false: you can encrypt an existing RDS database by editing its settings. Hold up a card and be ready to justify.",
  "activity": {
   "title": "Encryption Remediation Runbook",
   "materials": "Printed resource cards (made by the teacher) describing unencrypted resources with size and downtime limits, sticky notes, whiteboard divided into lanes per group.",
   "steps": [
    "Give each group four resource cards, for example an EBS data volume, an EBS root volume, a large RDS database with tight downtime limits and an EFS file system.",
    "Groups write ordered steps on sticky notes to encrypt each resource, noting where downtime occurs.",
    "Groups add one detective control and one preventive control that would stop the problem recurring.",
    "Groups place their runbooks on the whiteboard and do a gallery walk, adding a sticky-note question to another group's runbook.",
    "The teacher reviews common errors, such as expecting encryption by default to fix existing volumes."
   ]
  },
  "discussion": [
   "Why do you think AWS requires encryption to be chosen at creation for some services but not others?",
   "When is the extra complexity of AWS DMS worth it compared with a snapshot and restore?"
  ],
  "exit": [
   [
    "What are the steps to encrypt an existing EBS volume?",
    "Snapshot it, copy the snapshot with encryption, create a new volume from the copy and swap it in."
   ],
   [
    "What is the default key for DynamoDB encryption at rest?",
    "An AWS owned key; you can change to an AWS managed or customer managed key."
   ],
   [
    "Name one control that prevents new unencrypted resources.",
    "An SCP denying creation when the encrypted condition is false, or EBS encryption by default."
   ]
  ],
  "differentiation": [
   "Support: supply a step template with blanks for the EBS and RDS procedures so students can focus on ordering.",
   "Extend: ask students to write an SCP statement that denies creating unencrypted RDS instances and EBS volumes across an organization."
  ]
 },
 {
  "t": "Securing generative AI data: Amazon Bedrock guardrails, private model access with VPC endpoints and invocation logging",
  "objectives": [
   "Students will be able to describe Bedrock's data protection commitments and how customer managed KMS keys apply to Bedrock resources.",
   "Students will be able to restrict model access using IAM, SCPs and VPC endpoint policies.",
   "Students will be able to match risks such as PII exposure, prompt injection and off-limits topics to specific Guardrails features.",
   "Students will be able to explain the purpose and sensitivity of model invocation logs and how they differ from CloudTrail."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list everything that could go wrong if a bank launched a chatbot tomorrow with no special controls."
   ],
   [
    13,
    "Teach",
    "Map each risk from the warm-up to a control: data protection and KMS, IAM and SCPs, interface endpoints and endpoint policies, invocation logging versus CloudTrail, each Guardrails filter, RAG data separation and SageMaker AI isolation."
   ],
   [
    17,
    "Activity",
    "Red team and blue team guardrail role-play in groups."
   ],
   [
    5,
    "Discuss",
    "Review which red team prompts got through and which controls beyond Guardrails were needed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name three risks of letting customers chat with an AI model connected to bank data.",
  "activity": {
   "title": "Guardrail Red Team, Blue Team",
   "materials": "Printed guardrail configuration worksheet (made by the teacher), index cards, a projector showing the bank chatbot scenario, whiteboard.",
   "steps": [
    "Split each group into a blue team and a red team. The blue team fills in the worksheet: denied topics, words to block, PII types to mask or block, content filter strengths and whether to enable grounding checks.",
    "The red team writes six harmless test prompts on index cards that try to get around the rules, such as asking for advice in different words or embedding an instruction inside a pasted 'document'. No real exploit content is used; the aim is to test policy coverage.",
    "The teacher acts as the judge, deciding for each card which guardrail filter, if any, would catch it.",
    "For prompts that would slip through, the blue team proposes an additional control, such as data separation, IAM restrictions or logging.",
    "Teams switch roles for a short second round."
   ]
  },
  "discussion": [
   "Why is data separation in a knowledge base a stronger control than a denied topic?",
   "Who in an organization should be allowed to read model invocation logs, and why?"
  ],
  "exit": [
   [
    "Which control keeps Bedrock traffic off the public internet?",
    "An interface VPC endpoint (PrivateLink) for Bedrock."
   ],
   [
    "Which Guardrails feature can mask account numbers in responses?",
    "Sensitive information filters."
   ],
   [
    "How do you restrict an organization to one approved model?",
    "Use IAM policies and an SCP that deny bedrock:InvokeModel on any model ARN except the approved one."
   ]
  ],
  "differentiation": [
   "Support: provide a matching worksheet of risks and controls with a word bank so students can connect each risk to one feature.",
   "Extend: ask students to design a full secure architecture for a RAG chatbot, including roles, endpoints, KMS keys, logging and guardrails, and identify residual risks."
  ]
 },
 {
  "t": "Multi-account strategy: AWS Organizations, organizational units, AWS Control Tower landing zones and dedicated security accounts",
  "objectives": [
   "Students will be able to explain why AWS accounts are used as isolation boundaries and how OUs and organization policies govern them.",
   "Students will be able to describe the roles of the management, log archive and security tooling accounts and why the management account stays nearly empty.",
   "Students will be able to compare preventive, detective and proactive Control Tower controls and how each is implemented.",
   "Students will be able to design a basic OU structure for a given organization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Describe Bluepeak's single-account setup from the hook and ask students to list three risks."
   ],
   [
    12,
    "Teach",
    "Cover account isolation, Organizations and OU design, management account rules, delegated administrators, log archive and audit accounts, Control Tower landing zone, Account Factory, control types and drift."
   ],
   [
    18,
    "Activity",
    "Groups design an OU and account structure on the whiteboard with sticky notes."
   ],
   [
    5,
    "Discuss",
    "Each group explains where logs, security tools and sandboxes live, and the class challenges one choice per design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If one AWS account holds production, test and all the logs, what could a single compromised developer credential do?",
  "activity": {
   "title": "Build the Landing Zone",
   "materials": "Sticky notes in three colors (accounts, OUs, policies), whiteboard or flip chart per group, printed company profile cards made by the teacher.",
   "steps": [
    "Give each group a company profile card, such as a fintech with three product teams, regulated production and a data science group.",
    "Groups draw the organization root and place OUs (Security, Infrastructure, Workloads with Prod and Non-prod, Sandbox, Suspended) using one sticky note color.",
    "Groups add accounts in a second color, including management, log archive, security tooling and workload accounts.",
    "Groups attach at least three controls in a third color, labeling each as preventive, detective or proactive and naming how it is implemented.",
    "Groups mark which account is the delegated administrator for GuardDuty and Security Hub and explain why it is not the management account."
   ]
  },
  "discussion": [
   "What problems could arise if OUs are designed around the org chart instead of security needs?",
   "How would you protect the log archive account from a compromised administrator in a workload account?"
  ],
  "exit": [
   [
    "Why should the management account run no workloads?",
    "SCPs do not restrict it, so compromise there bypasses guardrails; keeping it empty limits risk."
   ],
   [
    "Which account should be the delegated administrator for Security Hub?",
    "The security tooling (audit) account."
   ],
   [
    "How is a proactive Control Tower control implemented?",
    "With AWS CloudFormation hooks that check resources before deployment."
   ]
  ],
  "differentiation": [
   "Support: provide a partially completed landing zone diagram with the Security OU already filled in so students add only workloads and controls.",
   "Extend: ask students to write one SCP for the Sandbox OU and one RCP idea for protecting data, and explain how they would test them before applying organization-wide."
  ]
 },
 {
  "t": "Organization guardrails: service control policies, resource control policies and declarative policies",
  "objectives": [
   "Students will be able to explain why SCPs, RCPs and declarative policies set maximum permissions or configurations but never grant access.",
   "Students will be able to compare SCPs and RCPs by who they restrict, including the case of external principals.",
   "Students will be able to choose the correct guardrail type for a given organization-wide requirement.",
   "Students will be able to identify which principals and accounts are outside the scope of SCPs and RCPs."
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
    "Draw an organization tree (root, two OUs, accounts). Walk through SCP evaluation with FullAWSAccess, a deny-list example and an allow-list example, then add an external account to show where SCPs stop and RCPs start. Finish with declarative policies and the IMDSv2 and public AMI examples."
   ],
   [
    15,
    "Activity",
    "Run the guardrail sort described below in groups of three, then have each group defend two of its placements."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface the management account exemption and the risk of broad root-level denies."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your organization's administrators all have AdministratorAccess in their accounts. How could a central security team stop one of them from turning off CloudTrail, without taking away their admin role?",
  "activity": {
   "title": "Guardrail sort",
   "materials": "Printed cards (one requirement per card, about 12), three labeled columns on the whiteboard (SCP, RCP, Declarative policy) plus a fourth column (None of these), tape or sticky notes.",
   "steps": [
    "Prepare cards such as: block leaving the organization; stop outside accounts reading our S3 objects; make IMDSv2 the default for new instances; require TLS for all bucket access; deny use of non-approved Regions; block public EBS snapshot sharing; restrict actions by the management account's admins; grant developers access to DynamoDB.",
    "Groups place each card in a column and write one sentence on the back explaining why.",
    "Include trap cards (management account restrictions, granting access) that belong in None of these, and reveal why when groups present.",
    "Each group presents two cards; the class votes, and the teacher confirms using the subject-of-the-restriction rule."
   ]
  },
  "discussion": [
   "Why might an organization prefer a deny-list SCP strategy over an allow-list strategy, and what does it give up?",
   "What could go wrong if a team attaches a new deny SCP to the root without testing it in a sandbox OU first?"
  ],
  "exit": [
   [
    "An external partner account can read your bucket through a bucket policy. Which organization policy type can cap that access across all member accounts?",
    "A resource control policy, for example denying access when aws:PrincipalOrgID is not your organization."
   ],
   [
    "Name two kinds of principals that SCPs do not restrict.",
    "Principals in the management account and service-linked roles."
   ],
   [
    "Which policy type enforces EC2 settings such as IMDSv2 defaults even for new API calls?",
    "A declarative policy."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table with three rows (SCP, RCP, declarative) and three columns (what it limits, example, does not apply to) to fill in during the teach segment, and let them use it during the sort.",
   "Extend: Ask fast finishers to write, in plain words, the statements and conditions an RCP would need to enforce an organization-only data perimeter while still allowing CloudTrail to write logs, and explain why the service exception is needed."
  ]
 },
 {
  "t": "Delegated administration for GuardDuty, Security Hub, Config and other security services",
  "objectives": [
   "Students will be able to explain why security services should be administered from a delegated administrator account rather than the management account.",
   "Students will be able to describe the steps to enable trusted access, register a delegated administrator and turn on auto-enable.",
   "Students will be able to account for the Regional nature of security services when designing organization-wide coverage.",
   "Students will be able to choose between delegated administration and the invitation model for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally answers. Highlight anything that involves logging in to every account."
   ],
   [
    12,
    "Teach",
    "Draw the management account, security tooling account and member accounts. Show trusted access, registration, auto-enable, and findings flowing to the tooling account. Then draw three Region columns to show why setup repeats per Region and how cross-Region aggregation helps."
   ],
   [
    18,
    "Activity",
    "Run the coverage gap hunt described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion prompts, steering toward separation of duties and attacker attempts to disable detection."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "Your company adds a new AWS account every week. List every way you can think of to make sure GuardDuty is on in each new account. Which way would still work if you went on vacation for a month?",
  "activity": {
   "title": "Coverage gap hunt",
   "materials": "Projector or printed handout showing a fictional organization: 3 OUs, 10 accounts, 3 Regions, with a table of which services are enabled where and which account is delegated administrator in each Region; markers.",
   "steps": [
    "Give pairs the handout, which contains deliberate gaps: GuardDuty delegated administrator set in only two of three Regions, auto-enable off in one Region, Security Hub administered from the management account, one account joined by invitation.",
    "Pairs circle every gap and write the fix next to it (for example, register delegated administrator in the third Region, turn on auto-enable, move Security Hub administration to the tooling account).",
    "Pairs add one SCP statement, in plain words, that would stop a compromised workload admin from disabling detection.",
    "Two pairs present their gap lists; the class compares and the teacher fills in any missed gaps."
   ]
  },
  "discussion": [
   "What should a security team be allowed to do in member accounts, and what should it not, once it is delegated administrator?",
   "Why do attackers often try to disable GuardDuty or CloudTrail early, and how does organization-managed membership help?"
  ],
  "exit": [
   [
    "Which account should usually be registered as delegated administrator for security services?",
    "A dedicated security tooling (audit) member account, not the management account."
   ],
   [
    "Your GuardDuty delegated administrator is set in us-east-1 only. Are new accounts in eu-west-1 covered?",
    "No. GuardDuty is Regional; you must designate the administrator and enable auto-enable in eu-west-1 too."
   ],
   [
    "What setting makes a security service turn on automatically for accounts that join the organization later?",
    "Auto-enable, configured by the delegated administrator."
   ]
  ],
  "differentiation": [
   "Support: Provide a step card listing the setup in order (enable trusted access, register delegated administrator, enable for existing members, turn on auto-enable, repeat per Region) for students to check off during the activity.",
   "Extend: Ask fast finishers to design coverage for five services across four Regions and explain how Security Hub central configuration and cross-Region aggregation reduce the work."
  ]
 },
 {
  "t": "Secure and consistent deployment: CloudFormation StackSets, Service Catalog and scanning infrastructure as code",
  "objectives": [
   "Students will be able to explain how StackSets with service-managed permissions deploy a security baseline to current and future accounts.",
   "Students will be able to describe how a Service Catalog launch constraint lets users deploy approved resources without broad IAM permissions.",
   "Students will be able to compare pipeline scanning (cfn-lint, CloudFormation Guard) with deployment-time enforcement (Hooks, proactive controls) and drift detection.",
   "Students will be able to select the right deployment control for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers in two columns: manual and automated."
   ],
   [
    15,
    "Teach",
    "Draw the pipeline left to right: Git and pull request, cfn-lint and Guard, pipeline role, CloudFormation with Hooks, StackSets fanning out to OUs, Service Catalog portfolio, and drift detection plus Config at the end. Explain each control at its point on the line."
   ],
   [
    15,
    "Activity",
    "Run the template review activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and connect answers back to the pipeline drawing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Your company has 40 accounts, and each one needs the same incident response role. Last month someone forgot to create it in two accounts. How would you make sure that never happens again, even for accounts created next year?",
  "activity": {
   "title": "Template review and policy-as-code",
   "materials": "Projector or printed copies of a short fictional CloudFormation YAML template (an S3 bucket without Block Public Access, an unencrypted EBS volume, a security group open to 0.0.0.0/0 on port 22, a hardcoded password parameter default), student laptops or paper.",
   "steps": [
    "Pairs read the template and mark every security problem they find.",
    "For each problem, pairs write a plain-language Guard-style rule (for example: every AWS::S3::Bucket must set all four PublicAccessBlockConfiguration properties to true).",
    "Pairs decide where each rule should run: pipeline (Guard), deployment time (Hooks or proactive control), or after deployment (Config rule), and justify the choice.",
    "The teacher projects a corrected template and the class compares rules; discuss why the password belongs in Secrets Manager."
   ]
  },
  "discussion": [
   "If developers can deploy only through Service Catalog, what new risks or bottlenecks might appear, and how could the platform team reduce them?",
   "Why is it useful to have checks both in the pipeline and inside CloudFormation itself?"
  ],
  "exit": [
   [
    "Which StackSets feature deploys a baseline automatically to accounts that join an OU later?",
    "Service-managed permissions with automatic deployment enabled for the target OU."
   ],
   [
    "A user without rds:CreateDBInstance launches an approved RDS product. What makes this work?",
    "A Service Catalog launch constraint role that has the permissions and is used to create the resources."
   ],
   [
    "Does drift detection correct a manually changed security group?",
    "No. It reports the difference; you must update the resource or stack to fix it."
   ]
  ],
  "differentiation": [
   "Support: Give students a matching card set pairing each need (future accounts, least privilege deployment, pre-deploy checks, post-deploy changes) with its tool, to use as a reference during the activity.",
   "Extend: Ask fast finishers to design a full deployment flow for a new regulated workload that uses all of StackSets, Service Catalog, Guard, Hooks and Config, and explain what each would catch that the others would miss."
  ]
 },
 {
  "t": "Evaluating compliance: AWS Config rules, conformance packs and aggregators",
  "objectives": [
   "Students will be able to explain how the Config recorder, configuration items and the resource timeline provide configuration history.",
   "Students will be able to compare managed rules, custom rules, conformance packs and aggregators and state the purpose of each.",
   "Students will be able to describe how remediation actions use Systems Manager Automation to fix noncompliant resources.",
   "Students will be able to distinguish Config's detective and corrective role from preventive controls such as SCPs and IAM."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Write students' answers about proving past state on the board."
   ],
   [
    15,
    "Teach",
    "Draw a flow: resource change, configuration item, recorder and delivery channel to S3, rules evaluating, COMPLIANT or NON_COMPLIANT, EventBridge alert, remediation runbook. Then add an organization layer: conformance pack deployed from the delegated administrator, aggregator collecting results. Close with the prevent versus detect boundary."
   ],
   [
    15,
    "Activity",
    "Run the auditor role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce the boundary between detection and prevention."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "An auditor asks you to prove that a firewall rule was not open to the internet at any time last month. Today it is closed. What evidence would you need, and where would it come from?",
  "activity": {
   "title": "Auditor role-play",
   "materials": "Printed auditor request cards (about 8), a projector showing a fictional Config compliance dashboard and resource timeline excerpt (plain text is fine), whiteboard.",
   "steps": [
    "Split the class into auditors and cloud teams. Auditors draw request cards such as: prove all volumes were encrypted all quarter; show who opened port 22 on a group; show compliance across all 30 accounts on one page; show PCI DSS controls are checked.",
    "Cloud teams answer each request by naming the Config feature (timeline, managed rule, custom rule, conformance pack, aggregator, remediation) and any other service needed, such as CloudTrail.",
    "Include two trick requests (prevent anyone from creating a public bucket; block a Region) where the correct answer is that Config cannot prevent this and another control is needed.",
    "Switch roles halfway; the teacher reviews the trickiest answers with the class."
   ]
  },
  "discussion": [
   "When should a Config rule automatically remediate, and when is automatic remediation too risky?",
   "Why might a company use both SCPs and Config rules for the same requirement?"
  ],
  "exit": [
   [
    "Which AWS Config feature gives a single view of compliance across all organization accounts and Regions?",
    "An aggregator."
   ],
   [
    "A security group was changed last week. Which service shows the before and after configuration, and which shows who made the change?",
    "AWS Config shows the configuration timeline; CloudTrail shows who made the change."
   ],
   [
    "Can AWS Config stop a user from opening SSH to the internet?",
    "No. It can detect and remediate after the change; preventing it requires IAM, SCPs or other preventive controls."
   ]
  ],
  "differentiation": [
   "Support: Provide a diagram handout with blanks for recorder, configuration item, rule, remediation, conformance pack and aggregator that students fill in during the teach segment.",
   "Extend: Ask fast finishers to write a plain-language advanced query that finds all unencrypted EBS volumes across the organization and to explain how they would turn the result into a recurring compliance report."
  ]
 },
 {
  "t": "Audit evidence and reports: AWS Audit Manager and AWS Artifact",
  "objectives": [
   "Students will be able to explain how AWS Artifact and AWS Audit Manager map to the two halves of the shared responsibility model.",
   "Students will be able to identify which documents and agreements are obtained from Artifact Reports and Artifact Agreements.",
   "Students will be able to describe how Audit Manager frameworks, assessments, automated evidence and assessment reports work together.",
   "Students will be able to sort audit requests by the service that provides the evidence."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the evidence students suggest in two columns without labeling the columns yet."
   ],
   [
    12,
    "Teach",
    "Label the columns 'security of the cloud' and 'security in the cloud'. Introduce Artifact Reports and Agreements for the first column and Audit Manager for the second, walking through framework, assessment, evidence sources, delegation and assessment report."
   ],
   [
    18,
    "Activity",
    "Run the evidence binder sort described below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, emphasizing that neither service makes a workload compliant."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "An auditor asks your company to prove that its cloud provider's data centers have guards and that your own team reviews user access every month. Where would you get each kind of proof?",
  "activity": {
   "title": "Evidence binder sort",
   "materials": "About 14 printed audit request cards, two large sheets or whiteboard areas labeled Artifact and Audit Manager, a third labeled Other or Neither, tape.",
   "steps": [
    "Prepare request cards such as: AWS SOC 2 Type II report; accept the BAA; show root MFA was on all quarter; show who changed IAM policies; AWS PCI DSS attestation; our written incident response policy; ISO 27001 certificate for AWS; Config rule results for encryption; proof our workload is HIPAA compliant.",
    "Groups place each card under the service that provides it, and for Audit Manager cards they write the evidence source (Config, Security Hub, CloudTrail, API snapshot, manual).",
    "Include cards that belong under Neither, such as 'proof our workload is HIPAA compliant', and ask groups why no service can provide that alone.",
    "Groups compare boards; the teacher resolves disagreements and records the final mapping."
   ]
  },
  "discussion": [
   "Why do you think AWS requires you to accept terms before downloading some Artifact reports?",
   "What risks arise if a team assumes AWS's certifications cover their own workload?"
  ],
  "exit": [
   [
    "Where would you download AWS's PCI DSS attestation of compliance?",
    "AWS Artifact Reports."
   ],
   [
    "Name three automated evidence sources used by Audit Manager.",
    "AWS Config rule evaluations, Security Hub checks, CloudTrail activity, and API configuration snapshots (any three)."
   ],
   [
    "Who decides whether you are compliant at the end of an audit?",
    "The auditor; Audit Manager only collects and organizes the evidence."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat sheet: Artifact (AWS's reports, agreements with AWS) and Audit Manager (your evidence, frameworks, assessment reports) to use during the sort.",
   "Extend: Ask fast finishers to design a custom Audit Manager framework with three controls for an internal policy, naming the evidence source for each control and which control needs manual evidence."
  ]
 },
 {
  "t": "Tagging for security and governance: tag policies, requiring tags with conditions, and backup policies",
  "objectives": [
   "Students will be able to explain why tags used for ABAC, backups and data classification must be standardized, required and protected.",
   "Students will be able to distinguish what a tag policy enforces from what an SCP or IAM condition requiring aws:RequestTag enforces.",
   "Students will be able to describe how to prevent users from changing access-control tags.",
   "Students will be able to explain how backup policies use tags to deploy AWS Backup plans across accounts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect examples of messy labels students have seen at work or school."
   ],
   [
    15,
    "Teach",
    "Show three needs on the board: consistent, required, protected. Map tag policies to consistent, SCP or IAM conditions with aws:RequestTag and Null to required, and denying tagging actions to protected. Finish with backup policies selecting by tag and the required-tags Config rule."
   ],
   [
    15,
    "Activity",
    "Run the policy reading activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore ABAC risks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "If a building's door locks opened for anyone wearing a badge that said 'Engineering', and anyone could print their own badge, what would go wrong? How is that like tags in the cloud?",
  "activity": {
   "title": "Read the policy, find the gap",
   "materials": "Projector or printed handouts with four short fictional policy excerpts in JSON (a tag policy with allowed values, an SCP with a Null condition on aws:RequestTag, an ABAC IAM policy using aws:ResourceTag and aws:PrincipalTag, and a backup policy selecting backup=daily), pens.",
   "steps": [
    "Pairs read each excerpt and write in one sentence what it does and does not do.",
    "Pairs answer scenario prompts: an instance is launched with no tag; an engineer retags another team's instance; a database tagged backup=Daily (capital D) is not backed up.",
    "Pairs propose one change for each gap (add a deny on tagging actions, add a Null condition, fix capitalization through tag policy enforcement).",
    "The class reviews answers; the teacher highlights the tag policy versus required tag distinction."
   ]
  },
  "discussion": [
   "What are the advantages and risks of using ABAC with tags compared with writing a separate IAM policy for each team?",
   "Who in an organization should be allowed to set or change data classification tags, and why?"
  ],
  "exit": [
   [
    "Does a tag policy prevent creating a resource without a tag?",
    "No. It standardizes keys and values; requiring a tag needs an SCP or IAM condition on aws:RequestTag."
   ],
   [
    "Which condition key checks a tag included in a create request?",
    "aws:RequestTag."
   ],
   [
    "How can you make sure every resource tagged backup=daily in all accounts is backed up without per-account setup?",
    "Attach an Organizations backup policy that selects resources by that tag."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-row reference card (Consistent: tag policy; Required: SCP or IAM with aws:RequestTag and Null; Protected: deny tagging actions on key tags) to use during the activity.",
   "Extend: Ask fast finishers to describe in plain words a complete set of guardrails for a DataClassification tag, including session tags from an identity provider, and explain where each guardrail could still be bypassed."
  ]
 },
 {
  "t": "Shared responsibility and security reviews: the Well-Architected security pillar, Trusted Advisor and threat modeling",
  "objectives": [
   "Students will be able to assign security tasks to AWS or the customer for EC2, RDS, Lambda and S3.",
   "Students will be able to list the design principles and best practice areas of the Well-Architected security pillar.",
   "Students will be able to compare the Well-Architected Tool and Trusted Advisor by how they review a workload.",
   "Students will be able to apply STRIDE to a simple architecture and propose AWS controls for each threat."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and have students vote by raising hands for AWS, customer or both on each task."
   ],
   [
    12,
    "Teach",
    "Draw a stacked diagram for EC2, RDS and Lambda showing where the responsibility line falls. Then present the seven security pillar design principles, contrast the Well-Architected Tool with Trusted Advisor, and introduce the four threat modeling questions and STRIDE."
   ],
   [
    18,
    "Activity",
    "Run the STRIDE whiteboard session described below in groups of four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions and connect threats found to the responsibility line."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Who is responsible for each of these on AWS: replacing a failed disk in a data center, patching Windows on an EC2 instance, patching the MySQL engine on RDS, and making an S3 bucket private? Vote AWS, customer or both.",
  "activity": {
   "title": "STRIDE whiteboard session",
   "materials": "Whiteboard or large paper per group, markers, sticky notes in six colors (one per STRIDE category) or six labeled sticky note pads, a printed one-paragraph description of a fictional document upload app (users upload files through a load balancer to an application that stores them in S3 and records metadata in RDS; support staff can view files).",
   "steps": [
    "Groups draw the app's data flow and mark trust boundaries (internet to load balancer, application to S3, support staff to application).",
    "Groups place at least one sticky note per STRIDE category on the diagram, describing a realistic threat at a specific point.",
    "For each threat, groups write an AWS control and note whether it is AWS's or the customer's responsibility.",
    "Groups rotate to another group's board, add one missed threat, then return and review; the teacher summarizes the most common findings."
   ]
  },
  "discussion": [
   "Why does using more managed services shift responsibility to AWS, and what responsibilities never shift?",
   "How would you decide which threats from a threat model to fix before launch and which to accept or schedule later?"
  ],
  "exit": [
   [
    "On Amazon RDS, who patches the database engine software?",
    "AWS, during the maintenance window the customer chooses; the customer still controls access, users and encryption."
   ],
   [
    "Which tool runs a guided, question-based review of a workload against best practices: Trusted Advisor or the Well-Architected Tool?",
    "The Well-Architected Tool. Trusted Advisor runs automated checks on account resources."
   ],
   [
    "Name the STRIDE category for an attacker using stolen credentials to pretend to be a user, and one AWS control for it.",
    "Spoofing; MFA, strong federation through IAM Identity Center, or short-lived credentials."
   ]
  ],
  "differentiation": [
   "Support: Give students a STRIDE reference card listing each category with a one-line definition and a sample AWS control, and a filled-in responsibility diagram for EC2 to use as a model for RDS and Lambda.",
   "Extend: Ask fast finishers to map each of their group's threats to a Well-Architected security pillar best practice area and identify which ones Trusted Advisor or Security Hub could detect automatically after launch."
  ]
 }
]);
