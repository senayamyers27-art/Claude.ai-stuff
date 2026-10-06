/* Teacher edition for AWS Certified Developer – Associate (DVA-C02): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("aws-developer", [
 {
  "t": "Architectural patterns: event-driven, microservices, fan-out, choreography vs orchestration, loosely coupled and stateless designs",
  "objectives": [
   "Students will be able to explain loose coupling and identify tightly coupled designs in an AWS architecture.",
   "Students will be able to compare choreography and orchestration and choose AWS Step Functions or event-based coordination for a given scenario.",
   "Students will be able to design an SNS to SQS fan-out for one event with several independent consumers.",
   "Students will be able to identify stateful design choices and move state to an external store such as DynamoDB or ElastiCache."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a slow email service blocking checkout and collect three or four answers on the whiteboard without judging them."
   ],
   [
    12,
    "Teach",
    "Walk through coupling, event-driven design, microservices and fan-out using a whiteboard diagram of SNS feeding three SQS queues. Then contrast choreography and orchestration, and finish with stateless design and the warning signs of state on instances."
   ],
   [
    18,
    "Activity",
    "Run the Kitchen Rail role-play described in the activity, first tightly coupled, then with sticky-note queues, then with a Step Functions coordinator."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect what students felt during the role-play to exam clues such as slow consumers must not block others."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "An online store's checkout code calls the payment, warehouse and email services one after another and waits for each. The email provider goes down for ten minutes. What happens to sales, and what would you change?",
  "activity": {
   "title": "Kitchen Rail role-play: coupled, fanned out and orchestrated",
   "materials": "Whiteboard, sticky notes in three colors, printed order cards the teacher prepares (about 20), a timer on the projector.",
   "steps": [
    "Assign roles: one checkout producer, and three consumers named payment, warehouse and email. In round one, the producer must hand each order card to each consumer in turn and wait for a thumbs-up; the teacher tells the email student to stop responding for one minute. Time how many orders complete.",
    "Round two: tape three sticky-note queues to the whiteboard, one per consumer. The producer writes each order on three sticky notes (fan-out) and sticks one on each queue, then moves on. Pause the email student again and count completed orders and the email backlog.",
    "Round three: add a coordinator student playing Step Functions, who calls payment, then warehouse, then email in order, records each step on the board, and triggers a refund card if warehouse fails. Ask the group which round gave the clearest view of a stuck order.",
    "Debrief at the board: label round one tight coupling, round two SNS to SQS fan-out with choreography, and round three orchestration. Have students note one exam clue for each."
   ]
  },
  "discussion": [
   "In the fan-out round, what did the queue give the email consumer that a direct call did not?",
   "When would a team accept the reduced visibility of choreography in exchange for independence?",
   "Where have you seen sticky sessions or local files used for state, and what would break if that server were replaced?"
  ],
  "exit": [
   [
    "Name the AWS pattern for delivering one event to several independent consumers that must not block each other.",
    "Publish to an SNS topic with an SQS queue subscribed for each consumer (or EventBridge with multiple targets)."
   ],
   [
    "Which service is typically used for orchestration, and name one reason to choose orchestration over choreography.",
    "AWS Step Functions; it provides central visibility of state, ordering, retries and compensation, or human approval steps."
   ],
   [
    "What change makes a web tier stateless?",
    "Moving session and user data from instance memory or local disk to an external store such as DynamoDB or ElastiCache."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column card listing clues on the left (slow consumer, visual workflow, any instance can serve any request) and patterns on the right to match before the exit ticket.",
   "Extend: Ask fast finishers to redesign the round-two system using EventBridge rules with event patterns, and explain when content-based filtering would be better than SNS fan-out."
  ]
 },
 {
  "t": "Resilient code: retries with exponential backoff and jitter, idempotency, timeouts, handling partial failures and dead-letter queues",
  "objectives": [
   "Students will be able to distinguish transient errors that should be retried from errors that should not.",
   "Students will be able to explain how exponential backoff and jitter reduce load on a struggling service.",
   "Students will be able to apply idempotency techniques such as DynamoDB conditional writes to make retries safe.",
   "Students will be able to configure handling for partial batch failures and poison messages using partial batch responses and a dead-letter queue."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and ask students to vote by show of hands on whether retrying immediately is helpful or harmful."
   ],
   [
    12,
    "Teach",
    "Explain transient versus permanent errors, then draw backoff timelines on the whiteboard with and without jitter. Cover idempotency keys and conditional writes, timeouts shorter than the caller's timeout, partial batch failures and DLQs with maxReceiveCount."
   ],
   [
    18,
    "Activity",
    "Run the Retry Storm card sort and log reading activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share one decision they disagreed about and the teacher resolves it against the lesson."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually on paper."
   ]
  ],
  "warmup": "A payment API starts returning HTTP 429 Too Many Requests. A thousand clients each retry every 50 milliseconds until it works. What happens to the payment API?",
  "activity": {
   "title": "Retry Storm: sort the errors, then read the log",
   "materials": "Printed error cards the teacher prepares (ThrottlingException, HTTP 503, connection timeout, ValidationException, AccessDenied, ConditionalCheckFailedException, ProvisionedThroughputExceededException, malformed JSON), a printed or projected SQS processing log excerpt, sticky notes.",
   "steps": [
    "In pairs, students sort the error cards into Retry with backoff, Do not retry, and Means a duplicate was safely ignored, writing a one-line reason on a sticky note for each.",
    "Project a short invented log showing the same message ID failing six times with a JSON parse error and a batch of ten where one record fails and all ten are retried. Pairs identify the poison message and the partial failure.",
    "Pairs write the fixes on the whiteboard: a redrive policy with maxReceiveCount and a DLQ with an alarm, ReportBatchItemFailures returning only the failed ID, and a conditional put with attribute_not_exists for idempotency.",
    "The teacher reveals an answer key and pairs score themselves, discussing any card they placed differently."
   ]
  },
  "discussion": [
   "Why is a timeout on a request that actually succeeded one of the most dangerous situations for a payment system?",
   "What would you put in a runbook for someone who receives the DLQ depth alarm at night?",
   "When might natural idempotency be easier than tracking idempotency keys?"
  ],
  "exit": [
   [
    "Why add jitter to exponential backoff?",
    "So clients that failed together do not retry in synchronized waves; randomness spreads retries out."
   ],
   [
    "Give one technique that makes processing an SQS message idempotent.",
    "A DynamoDB conditional write such as attribute_not_exists(orderId) keyed on a unique ID, or an idempotency key checked before processing."
   ],
   [
    "What SQS setting moves a poison message to a DLQ?",
    "A redrive policy on the source queue with a maxReceiveCount; after that many receives without deletion, the message moves to the DLQ."
   ]
  ],
  "differentiation": [
   "Support: Provide a backoff worksheet with a starting delay of 100 ms where students fill in the next four delays and then add a random amount to each, making the jitter idea concrete.",
   "Extend: Ask fast finishers to explain how the SDK retry modes (standard and adaptive) differ in concept and where they would still need custom retry logic in their own code."
  ]
 },
 {
  "t": "Messaging and streaming: SQS standard vs FIFO (message groups, deduplication, visibility timeout, long polling), SNS fan-out, EventBridge rules and Scheduler, Kinesis Data Streams",
  "objectives": [
   "Students will be able to choose between SQS, SNS, EventBridge and Kinesis Data Streams from scenario clues.",
   "Students will be able to explain SQS FIFO message groups and deduplication and how they preserve per-key ordering while scaling.",
   "Students will be able to diagnose duplicate processing and high empty-receive costs using visibility timeout and long polling.",
   "Students will be able to describe when EventBridge Scheduler or Kinesis retention and replay are required."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question and have students write a one-word answer for each of the three needs."
   ],
   [
    13,
    "Teach",
    "Use a four-column whiteboard table for SQS, SNS, EventBridge and Kinesis covering push or pull, consumers per message, ordering, retention and replay. Draw a FIFO queue with three message groups and the visibility timeout timeline."
   ],
   [
    17,
    "Activity",
    "Run the Messaging Service Match card game in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups present the scenario they found hardest and the class debates it."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You need three things: send one alert to five systems, process each order exactly once and in order per customer, and let two teams replay yesterday's clickstream. Which AWS service would you guess for each?",
  "activity": {
   "title": "Messaging Service Match",
   "materials": "Printed scenario cards (12, written by the teacher), four large labels taped to desks (SQS standard or FIFO, SNS, EventBridge or Scheduler, Kinesis Data Streams), whiteboard.",
   "steps": [
    "Groups of three draw scenario cards such as per-account ordering of transactions, route S3 events by bucket name to Step Functions, nightly job at 1 a.m. Chicago time, and two consumers must re-read the last day of IoT data.",
    "For each card the group places it at the right service label and writes the deciding clue and any key setting, such as MessageGroupId, filter policy, event pattern or partition key.",
    "The teacher hands two troubleshooting cards: messages processed twice by different workers, and thousands of empty ReceiveMessage responses. Groups write the setting that fixes each.",
    "Groups rotate to check another group's placements and leave a sticky note on any they would challenge, then the teacher reviews the contested cards."
   ]
  },
  "discussion": [
   "Why does SNS usually deliver into SQS queues rather than straight to services?",
   "What would make you choose EventBridge over SNS for routing?",
   "How would you pick a MessageGroupId that balances strict ordering with throughput?"
  ],
  "exit": [
   [
    "Messages in an SQS queue are being processed twice by different consumers. What is the most likely cause?",
    "The visibility timeout is shorter than the processing time, so messages reappear before they are deleted."
   ],
   [
    "How does a FIFO queue keep per-customer order but still process many customers in parallel?",
    "Use the customer ID as the MessageGroupId; order is kept within each group while different groups are processed in parallel."
   ],
   [
    "Which service lets multiple consumers independently read and replay an ordered stream?",
    "Kinesis Data Streams, because records are retained for the retention period and each consumer tracks its own position."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flowchart with questions (one consumer or many, order needed, replay needed, route by content, on a schedule) to use during the card game.",
   "Extend: Ask fast finishers to design an ordered fan-out using an SNS FIFO topic into SQS FIFO queues and explain how deduplication behaves when a producer retries."
  ]
 },
 {
  "t": "AWS Step Functions: Standard vs Express workflows, retry/catch, task tokens for callbacks",
  "objectives": [
   "Students will be able to describe the main Step Functions state types and what each does.",
   "Students will be able to choose between Standard and Express workflows based on duration, volume, execution semantics and auditing needs.",
   "Students will be able to read and write Retry and Catch blocks, including IntervalSeconds, MaxAttempts, BackoffRate and ResultPath.",
   "Students will be able to explain the Request Response, Run a Job (.sync) and Wait for Callback (.waitForTaskToken) integration patterns."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as boxes and arrows on the board."
   ],
   [
    12,
    "Teach",
    "Introduce ASL and state types, then compare Standard and Express in a two-column table. Project the ChargeCard Task state and walk through the retry timing and the Catch with ResultPath, then explain the three integration patterns."
   ],
   [
    18,
    "Activity",
    "Students whiteboard an expense approval state machine in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups compare designs and the teacher highlights good use of Catch for compensation and task tokens."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "A claims process must check a policy, wait up to three days for an adjuster, then pay or reject. Where would you keep track of which step each claim is on if it all ran inside one function?",
  "activity": {
   "title": "Whiteboard an approval workflow",
   "materials": "Whiteboard or large paper per group, markers, a projected ASL snippet of a Task with Retry and Catch, printed state-type cards.",
   "steps": [
    "Each group receives the scenario: save an expense claim, send it to a manager for approval (which may take days), pay it if approved, notify the employee if rejected, and refund or alert if payment fails.",
    "Groups draw the state machine using state-type cards (Task, Choice, Wait, Succeed, Fail) and label which workflow type they chose and why.",
    "Groups mark the approval Task with .waitForTaskToken, note who calls SendTaskSuccess or SendTaskFailure, and add HeartbeatSeconds or a timeout.",
    "Groups write a Retry block for the payment Task (with IntervalSeconds, MaxAttempts and BackoffRate) and a Catch routing to a compensation or notification state with ResultPath set to $.error, then present in two minutes."
   ]
  },
  "discussion": [
   "What would go wrong if this approval workflow were built as an Express workflow?",
   "Why is it useful to keep the original input and place the error at $.error rather than replacing the state data?",
   "Which steps in your design could call an AWS service directly without a Lambda function?"
  ],
  "exit": [
   [
    "What is the maximum duration of an Express workflow, and what type would you use for a process that waits days?",
    "Five minutes; a Standard workflow, which can run for up to one year."
   ],
   [
    "What does Catch do that Retry does not?",
    "It routes the execution to a fallback state after retries are exhausted, while Retry only re-attempts the same state."
   ],
   [
    "How does an external system resume a workflow paused with .waitForTaskToken?",
    "It calls SendTaskSuccess or SendTaskFailure with the task token it received."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed state machine diagram where students only fill in the workflow type, the callback suffix and the Catch target.",
   "Extend: Ask fast finishers to add a Map state that processes each line item of an expense claim and explain how they would handle a failure in a single item."
  ]
 },
 {
  "t": "Calling AWS services with the SDKs and CLI: credential provider chain, pagination, waiters, error handling",
  "objectives": [
   "Students will be able to describe the broad order of the default credential provider chain and explain why roles are preferred over access keys.",
   "Students will be able to diagnose unexpected permissions caused by credentials earlier in the chain, using aws sts get-caller-identity.",
   "Students will be able to handle paginated results with paginators, continuation tokens and CLI pagination options.",
   "Students will be able to use waiters and handle specific SDK error codes and retry settings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up mystery and let students suggest causes."
   ],
   [
    12,
    "Teach",
    "Draw the credential chain as a stack on the whiteboard and walk through the classic leftover-keys case. Project the Boto3 paginator example and explain tokens, CLI pagination flags, waiters and common error codes."
   ],
   [
    18,
    "Activity",
    "Pairs work through the Who Am I troubleshooting cases."
   ],
   [
    5,
    "Discuss",
    "Pairs share their fixes and the teacher reinforces role-based credentials."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A script on an EC2 instance can delete objects even though the instance's role only allows reads. Where else could its permissions be coming from?",
  "activity": {
   "title": "Who Am I: credential and pagination troubleshooting",
   "materials": "Printed case cards (written by the teacher) with short invented terminal outputs, such as an env listing showing AWS_ACCESS_KEY_ID, a get-caller-identity result, a list call returning a NextToken, and a ResourceNotFoundException after CreateTable; student laptops with a browser optional for reviewing SDK documentation.",
   "steps": [
    "Pairs receive four case cards. For each, they identify which credential source or API behavior explains the symptom.",
    "For the credential case, pairs write the order in which the SDK checked sources and which one won, then the fix (remove leftover keys so the instance profile is used).",
    "For the pagination and waiter cases, pairs write the corrected approach: a paginator loop or passing the token back, and a table_exists waiter after CreateTable.",
    "For an error-handling case, pairs decide which exceptions to catch and retry (ThrottlingException) versus surface to the user (AccessDeniedException), and where to log the request ID."
   ]
  },
  "discussion": [
   "Why are temporary role credentials safer than long-lived access keys even when both have the same permissions?",
   "How would you prevent leftover keys from being deployed in the first place?",
   "When might --page-size help a CLI command that keeps timing out?"
  ],
  "exit": [
   [
    "Why can access keys in environment variables override an EC2 instance profile?",
    "Environment variables come earlier in the default credential provider chain than the instance profile, and the first source found wins."
   ],
   [
    "A DynamoDB Scan returns LastEvaluatedKey. What should the code do?",
    "Repeat the Scan with ExclusiveStartKey set to that value until no LastEvaluatedKey is returned."
   ],
   [
    "What is a waiter used for?",
    "To poll a resource until it reaches a desired state, such as a table becoming ACTIVE, instead of hand-written sleep loops."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the credential chain with blanks for each source for students to fill in before the activity.",
   "Extend: Ask fast finishers to explain how an assume-role profile in ~/.aws/config works and how it differs from using an instance profile directly."
  ]
 },
 {
  "t": "Lambda configuration: memory, timeout (15-minute max), ephemeral /tmp storage, environment variables, layers, concurrency, VPC access",
  "objectives": [
   "Students will be able to state the key Lambda configuration limits for memory, timeout, ephemeral storage, environment variables and layers.",
   "Students will be able to explain how memory affects CPU and cost and choose a setting for a CPU-bound function.",
   "Students will be able to distinguish reserved concurrency from provisioned concurrency and apply each to a scenario.",
   "Students will be able to troubleshoot VPC-connected Lambda functions that cannot reach the internet."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student guesses for each symptom."
   ],
   [
    13,
    "Teach",
    "Walk through each configuration setting with its limit, writing them in a table on the whiteboard. Draw a VPC with private subnets, a NAT gateway and a VPC endpoint to show Lambda networking."
   ],
   [
    17,
    "Activity",
    "Groups play Configuration Doctor with symptom cards."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest symptom cards together."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A Lambda function fails after exactly 3 seconds, another is slow while resizing images, and a third can reach its database but not a public API. Which setting would you check first for each?",
  "activity": {
   "title": "Configuration Doctor",
   "materials": "Printed symptom cards (written by the teacher), a projected Lambda configuration screenshot or a hand-drawn mock of the configuration tab, whiteboard, sticky notes.",
   "steps": [
    "Groups of three draw symptom cards such as Task timed out after 3.00 seconds, a job that needs 40 minutes, /tmp data missing on some invocations, an RDS database overwhelmed by connections, and a VPC function that cannot call a payments API.",
    "For each card, the group writes a diagnosis and the setting or service that fixes it on a sticky note and places it on the matching setting on the projected or drawn configuration tab.",
    "Groups compare reserved and provisioned concurrency by writing one scenario on the board that needs each.",
    "The teacher reveals the answers, and groups correct any sticky notes on the wrong setting."
   ]
  },
  "discussion": [
   "Why might raising memory lower the total cost of a function?",
   "What risks come with storing secrets in environment variables, and what would you use instead?",
   "When would you choose VPC endpoints over a NAT gateway for a VPC-connected function?"
  ],
  "exit": [
   [
    "What is the maximum timeout for a Lambda function, and what should you use for longer work?",
    "15 minutes (900 seconds); use Step Functions, Fargate or Batch, or split the work."
   ],
   [
    "How do you give a Lambda function more CPU?",
    "Increase the memory setting, because CPU is allocated in proportion to memory."
   ],
   [
    "A VPC-connected function cannot reach a public API. What fixes it?",
    "Route the function's private subnets through a NAT gateway (or use VPC endpoints for AWS services)."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card listing each setting and its range so they can focus on matching symptoms to settings.",
   "Extend: Ask fast finishers to compare layers with container image packaging and explain when each is the better choice for a team with shared dependencies."
  ]
 },
 {
  "t": "Lambda invocation models: synchronous, asynchronous (retries, destinations, DLQs) and event source mappings (SQS, Kinesis, DynamoDB Streams, partial batch responses)",
  "objectives": [
   "Students will be able to identify whether a Lambda event source uses synchronous, asynchronous or event source mapping invocation.",
   "Students will be able to explain who retries failures in each model and where failed events end up.",
   "Students will be able to compare dead-letter queues with on-failure and on-success destinations.",
   "Students will be able to apply partial batch responses and stream error-handling settings to avoid reprocessing and blocked shards."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up puzzle and ask students to predict where the failed events went."
   ],
   [
    12,
    "Teach",
    "Draw three lanes on the whiteboard for synchronous, asynchronous and event source mappings, listing example sources, retry behavior and failure targets for each. Explain SQS versus stream error behavior and show the partial batch response handler."
   ],
   [
    18,
    "Activity",
    "Groups complete the Follow the Failed Event tracing exercise."
   ],
   [
    5,
    "Discuss",
    "Groups share where they placed DLQs and destinations and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A team attached a DLQ to a Lambda function that processes SQS messages, but failed messages never arrive there. Why might that be?",
  "activity": {
   "title": "Follow the failed event",
   "materials": "Printed scenario cards (written by the teacher) for S3, API Gateway, SQS, Kinesis and EventBridge sources; a large three-lane chart drawn on the whiteboard; sticky notes.",
   "steps": [
    "Groups take a scenario card and place it in the correct invocation lane on the whiteboard chart.",
    "For each scenario, groups trace a failure step by step on sticky notes: who retries, how many times by default, and where the event ends up (client, DLQ, destination, source queue DLQ, or blocked shard).",
    "Groups add the configuration they would change, such as a redrive policy on the SQS queue, an on-failure destination for an asynchronous source, or bisect batch and maximum retry attempts for a stream.",
    "The teacher shows the correct lane and trace for each card, and groups correct their notes."
   ]
  },
  "discussion": [
   "Why does a single bad record hurt a Kinesis-triggered function more than an SQS-triggered one?",
   "What extra information does an on-failure destination give you compared with a DLQ, and why does that matter during an incident?",
   "Why should every asynchronous handler be idempotent?"
  ],
  "exit": [
   [
    "Which invocation model does S3 use, and how many times does Lambda retry by default after the first failure?",
    "Asynchronous; Lambda retries twice more by default before sending the event to a DLQ or on-failure destination."
   ],
   [
    "Where do you configure the DLQ for an SQS event source?",
    "On the source SQS queue through its redrive policy; the function's DLQ applies only to asynchronous invocations."
   ],
   [
    "What does a function return to report partial batch failures?",
    "An object with batchItemFailures listing the itemIdentifier of each failed record, with ReportBatchItemFailures enabled on the mapping."
   ]
  ],
  "differentiation": [
   "Support: Give students a completed example lane for API Gateway so they can model the other traces on it.",
   "Extend: Ask fast finishers to explain how the parallelization factor changes stream processing while preserving per-partition-key order."
  ]
 },
 {
  "t": "Lambda coding practices: initializing SDK clients and connections outside the handler, reading events, returning API Gateway proxy responses",
  "objectives": [
   "Students will be able to explain the init phase and why SDK clients and connections belong outside the handler.",
   "Students will be able to identify data leaks caused by storing request data in global variables.",
   "Students will be able to read event fields correctly for S3, SQS and API Gateway proxy events, including missing or encoded values.",
   "Students will be able to construct a valid Lambda proxy response and diagnose a 502 Malformed Lambda proxy response."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a short handler with a body returned as an object and ask students what the client will see."
   ],
   [
    12,
    "Teach",
    "Explain the init phase and warm invocations, project the DynamoDB handler example, then walk through event shapes for S3, SQS and API Gateway REST and HTTP payload 2.0, the proxy response format and CORS headers."
   ],
   [
    18,
    "Activity",
    "Pairs do the Spot the Bug code review."
   ],
   [
    5,
    "Discuss",
    "Pairs share the bug they found hardest and its fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A function returns {'statusCode': 200, 'body': {'id': 7}} to API Gateway with a proxy integration. What will the client receive, and why?",
  "activity": {
   "title": "Spot the Bug code review",
   "materials": "Printed or projected handler snippets the teacher prepares (five short Python or Node.js functions, each with one bug), student laptops with a browser optional, highlighters.",
   "steps": [
    "Pairs receive five snippets: a database connection created inside the handler, a global variable holding the current user, a body returned as an object, an S3 key used without URL-decoding, and code reading queryStringParameters without a null check.",
    "Pairs highlight the bug in each snippet, write the symptom a user or operator would see (slow responses, data leak, 502, NoSuchKey, TypeError), and rewrite the line or lines.",
    "Pairs swap with another pair and check each other's fixes against the lesson.",
    "The teacher reviews each snippet with the class, emphasizing the 502 case and why the function's own logs look clean."
   ]
  },
  "discussion": [
   "Which of these bugs would you most likely miss in a code review, and how could testing catch it?",
   "Why does Lambda's environment reuse help performance but also create risk?",
   "How could a recursive S3 trigger happen by accident, and how would you prevent it?"
  ],
  "exit": [
   [
    "Why initialize SDK clients and database connections outside the handler?",
    "They are created once per execution environment and reused by warm invocations, reducing latency and connection counts."
   ],
   [
    "What type must the body field be in a Lambda proxy response?",
    "A string; objects must be serialized with json.dumps or JSON.stringify."
   ],
   [
    "In a REST API proxy event, what is queryStringParameters when no query string is sent?",
    "null, so code must check for it before reading values."
   ]
  ],
  "differentiation": [
   "Support: Provide a template of a correct proxy response with statusCode, headers and a serialized body that students can compare each snippet against.",
   "Extend: Ask fast finishers to modify a handler so it uses the remaining-time method on the context object to save progress and exit cleanly before timing out."
  ]
 },
 {
  "t": "DynamoDB: partition and sort keys, Query vs Scan, LSI vs GSI, RCU/WCU math, consistency models, condition expressions, TTL, Streams, DAX",
  "objectives": [
   "Students will be able to explain partition keys and sort keys and choose Query over Scan for a given access pattern.",
   "Students will be able to compare LSIs and GSIs and pick the right index for a new query on an existing table.",
   "Students will be able to calculate RCU and WCU for strongly consistent, eventually consistent and transactional operations.",
   "Students will be able to use condition expressions, TTL, Streams and DAX appropriately."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students estimate the answer before teaching."
   ],
   [
    13,
    "Teach",
    "Draw a table with partition and sort keys, show a Query and a Scan side by side, then build a comparison table for LSI and GSI. Work through the RCU and WCU examples step by step on the whiteboard, then cover consistency, condition expressions, TTL, Streams and DAX."
   ],
   [
    17,
    "Activity",
    "Teams compete in the Capacity Math Relay and index design challenge."
   ],
   [
    5,
    "Discuss",
    "Review the most common calculation mistakes and the index design answers."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "How many read capacity units would 10 strongly consistent reads per second of 6 KB items need? Write down your guess before we start.",
  "activity": {
   "title": "Capacity Math Relay and index design",
   "materials": "Whiteboard divided into team columns, printed problem cards (written by the teacher) with item sizes and request rates, a printed table design scenario, calculators or student laptops.",
   "steps": [
    "Teams of three line up. The first student solves a card (for example 25 eventually consistent reads per second of 9 KB items) on the whiteboard, showing the rounding step, then tags the next student.",
    "Cards include strongly consistent reads, eventually consistent reads, writes of fractional KB sizes and one transactional write so students practice doubling.",
    "After the relay, each team receives a table design scenario (orders by customer, plus a new need to find orders by status) and decides on partition key, sort key and whether the new pattern needs an LSI or GSI.",
    "Teams add one condition expression that would prevent overwriting an existing order, and the teacher reviews answers and rounding errors."
   ]
  },
  "discussion": [
   "Why does a FilterExpression not reduce the capacity a Scan consumes?",
   "What makes a partition key a poor choice, and what symptoms would you see?",
   "When would DAX not help, even for a read-heavy application?"
  ],
  "exit": [
   [
    "How many RCU do 20 eventually consistent reads per second of 9 KB items need?",
    "9 KB rounds to 12 KB, which is 3 RCU per strongly consistent read; eventually consistent halves it, so 30 RCU."
   ],
   [
    "You need a query with a different partition key on an existing table. LSI or GSI?",
    "A GSI, because it can use a different partition key and can be added to an existing table."
   ],
   [
    "Which exception tells you a conditional write failed?",
    "ConditionalCheckFailedException."
   ]
  ],
  "differentiation": [
   "Support: Provide a step card (round the size up, divide by 4 KB or 1 KB, multiply by the rate, adjust for consistency or transactions) that students follow for each problem.",
   "Extend: Ask fast finishers to design a single table that supports two access patterns using a GSI, and explain how GSI write capacity can throttle the base table."
  ]
 },
 {
  "t": "Amazon S3 from code: multipart upload, storage classes and lifecycle, event notifications",
  "objectives": [
   "Students will be able to describe the multipart upload API flow and when multipart upload is required or recommended.",
   "Students will be able to choose an S3 storage class based on access frequency, durability needs and retrieval time.",
   "Students will be able to design lifecycle rules for transitions, expiration and aborting incomplete multipart uploads.",
   "Students will be able to configure S3 event notifications with filters, required permissions and safe handler design."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question about a failed large upload and collect ideas."
   ],
   [
    12,
    "Teach",
    "Draw the multipart flow as three boxes with upload ID and ETags, then present a storage class ladder from Standard to Deep Archive. Explain lifecycle rules and event notifications with prefix and suffix filters and resource policies."
   ],
   [
    18,
    "Activity",
    "Groups design a storage plan for an invented media company on the whiteboard."
   ],
   [
    5,
    "Discuss",
    "Groups compare their lifecycle choices and notification designs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A 12 GB video upload fails at 97 percent and must start over. What would you change about how the file is uploaded?",
  "activity": {
   "title": "Design a storage plan",
   "materials": "Whiteboard or large paper per group, markers, printed storage class reference cards, a printed scenario sheet describing an invented media company's files and access patterns.",
   "steps": [
    "Groups read the scenario: field crews upload 10 to 30 GB videos, editors use them heavily for a month, occasionally for six months, and legal must keep them for five years; thumbnails can be regenerated.",
    "Groups sketch the upload path, choosing multipart upload with a part size, and noting where Transfer Acceleration might help remote crews.",
    "Groups write lifecycle rules with transition days and target classes, an expiration rule, and an abort-incomplete-multipart-uploads rule, and choose a class for thumbnails.",
    "Groups add an event notification that starts transcoding for new .mp4 files under uploads/, naming the destination, the permission required and how to avoid a recursive trigger, then present briefly."
   ]
  },
  "discussion": [
   "Why might a bucket's bill grow even though the listed objects are not increasing?",
   "When would Intelligent-Tiering be a better choice than writing your own lifecycle transitions?",
   "Why should S3-triggered handlers be idempotent?"
  ],
  "exit": [
   [
    "What are the three API calls in a successful multipart upload?",
    "CreateMultipartUpload, UploadPart for each part, then CompleteMultipartUpload."
   ],
   [
    "Which storage class suits data with unpredictable access patterns?",
    "S3 Intelligent-Tiering."
   ],
   [
    "What must be in place for S3 to invoke a Lambda function on upload?",
    "An event notification on the bucket and a resource-based policy on the function allowing s3.amazonaws.com to invoke it."
   ]
  ],
  "differentiation": [
   "Support: Provide a storage class comparison card with access speed, retrieval fees and number of Availability Zones so students can focus on matching needs to classes.",
   "Extend: Ask fast finishers to compare sending S3 events directly to SQS versus enabling EventBridge delivery, and list what each approach makes easier."
  ]
 },
 {
  "t": "Caching strategies with ElastiCache: lazy loading, write-through, TTLs; choosing between SQL, NoSQL and in-memory stores",
  "objectives": [
   "Students will be able to explain lazy loading and write-through caching, including their advantages and drawbacks.",
   "Students will be able to use TTLs to balance freshness and database load and explain the role of eviction policies.",
   "Students will be able to choose between Redis OSS or Valkey and Memcached for a given requirement.",
   "Students will be able to choose a relational, NoSQL or in-memory store for a workload."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the stale headline and gather explanations."
   ],
   [
    12,
    "Teach",
    "Draw the lazy loading flow (check cache, miss, read database, write cache) and the write-through flow on the whiteboard. Explain TTLs and eviction, compare engines in a table, then cover SQL, NoSQL and in-memory store selection."
   ],
   [
    18,
    "Activity",
    "Groups run the Cache Simulation with index cards."
   ],
   [
    5,
    "Discuss",
    "Groups share how many misses and stale reads each strategy produced."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "A news site caches articles for an hour. An editor fixes a wrong headline, but readers keep seeing the old one. Why, and what could you change?",
  "activity": {
   "title": "Cache Simulation with index cards",
   "materials": "Index cards, a small box labeled Cache (holds only five cards), a larger box labeled Database, a printed sequence of read and write requests the teacher prepares, a tally sheet on the whiteboard.",
   "steps": [
    "In groups of four, assign roles: application, cache, database and scorekeeper. The application processes a printed list of about 20 requests, reads and writes for article IDs.",
    "Round one uses lazy loading: on each read, check the cache box first; on a miss, fetch from the database box, copy the card into the cache, and tally a miss. On a write, update only the database card. The scorekeeper tallies hits, misses and stale reads.",
    "Round two uses write-through plus lazy loading: every write updates both the database card and the cache card. When the cache box is full, evict the least recently used card. Tally again.",
    "Groups compare tallies on the whiteboard and write one sentence on when to add TTLs and which engine they would choose if the cache had to survive a node failure."
   ]
  },
  "discussion": [
   "Why might the first request after a cache node fails be slower than having no cache at all?",
   "What problems could happen if many keys share exactly the same TTL?",
   "When is it a mistake to treat a cache as the only copy of data?"
  ],
  "exit": [
   [
    "What is the main drawback of lazy loading?",
    "Data can become stale because the cache is updated only on a miss, and each miss adds extra round trips."
   ],
   [
    "Why combine write-through with a TTL?",
    "Write-through caches every write, including rarely read data; a TTL expires unused keys so memory is not wasted."
   ],
   [
    "When would you choose Redis OSS or Valkey over Memcached?",
    "When you need replication and automatic failover, persistence, backups or advanced data structures such as sorted sets."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart card for each strategy to follow during the simulation so they can focus on observing hits, misses and staleness.",
   "Extend: Ask fast finishers to describe how they would use a Redis OSS or Valkey sorted set for a leaderboard and how DAX differs from ElastiCache in front of DynamoDB."
  ]
 },
 {
  "t": "IAM for applications: execution roles, instance profiles, ECS task roles, least-privilege policies, policy evaluation (explicit deny wins)",
  "objectives": [
   "Students will be able to identify the correct IAM role mechanism for Lambda, EC2 and ECS workloads, including the difference between the ECS task role and task execution role.",
   "Students will be able to write a least-privilege policy statement that limits actions and resources to what an application needs.",
   "Students will be able to apply the IAM policy evaluation logic to predict whether a request is allowed, explicitly denied or implicitly denied.",
   "Students will be able to describe a troubleshooting sequence for an AccessDenied error from application code."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question and take three or four answers. Steer toward the risks of long-lived keys: leaking, no expiry, manual rotation."
   ],
   [
    12,
    "Teach",
    "Draw three boxes on the whiteboard: Lambda, EC2, ECS. Under each, write the role mechanism (execution role, instance profile, task role plus task execution role). Show the sample DynamoDB policy on the projector and narrate how each element narrows access. Finish with the evaluation flow: start at implicit deny, check for explicit deny, then look for an allow."
   ],
   [
    18,
    "Activity",
    "Run the policy evaluation card sort described below in groups of three. Circulate and ask each group to justify one decision aloud."
   ],
   [
    5,
    "Discuss",
    "Bring the class together and go through the discussion questions, focusing on the ECS two-role confusion and why explicit deny is useful as a guardrail."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or a sticky note before leaving."
   ]
  ],
  "warmup": "If you had to give a script on a server permission to upload files to S3, what are two ways you could hand it credentials, and which one would worry you more if the server were stolen?",
  "activity": {
   "title": "Allow, Deny or Implicit Deny: policy evaluation card sort",
   "materials": "Printed scenario cards (about 10 per group) that each show a request plus short policy excerpts (identity policy, SCP, boundary, bucket policy); three header cards labeled Allowed, Explicitly denied, Implicitly denied; whiteboard.",
   "steps": [
    "Give each group a deck of scenario cards, for example: 'Task role allows dynamodb:PutItem on table Orders; request is PutItem on table Orders' or 'Identity policy allows s3:*; SCP denies s3:DeleteBucket; request is DeleteBucket'.",
    "Groups place each card under one of the three headers and write on the card which policy element decided the outcome.",
    "Include two 'wrong role' cards where the permission sits on the ECS task execution role but the request comes from application code; groups must spot that the task role is the identity in use.",
    "Each group rewrites one overly broad policy card (such as dynamodb:* on *) into a least-privilege statement on a sticky note.",
    "Groups swap decks with a neighbor and check each other's placements, flagging any disagreements for the class discussion."
   ]
  },
  "discussion": [
   "Why might a security team prefer an explicit Deny in an SCP over simply not granting a permission?",
   "What design choices would make it harder for a developer to confuse the ECS task role and task execution role?",
   "When is an inline policy a better choice than a customer managed policy?"
  ],
  "exit": [
   [
    "A Lambda function reads messages from SQS. Which policy needs the sqs:ReceiveMessage permission?",
    "The function's execution role, because Lambda polls SQS using that role."
   ],
   [
    "An identity policy allows kms:Decrypt, and another attached policy explicitly denies kms:Decrypt. What is the result?",
    "Denied, because an explicit deny overrides any allow."
   ],
   [
    "Name the role an ECS container's code uses to call S3.",
    "The ECS task role."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page flowchart of the evaluation logic (implicit deny, explicit deny check, allow check, limits from boundaries and SCPs) to use while sorting cards, and pair them with a confident partner for the first three cards.",
   "Extend: Ask fast finishers to design a permissions boundary that lets developers create Lambda execution roles but never grants IAM or Organizations actions, and explain how it prevents privilege escalation."
  ]
 },
 {
  "t": "Resource-based policies: Lambda permissions for S3/SNS/API Gateway, S3 bucket policies, KMS key policies",
  "objectives": [
   "Students will be able to distinguish identity-based from resource-based policies by their structure and purpose.",
   "Students will be able to determine whether a Lambda event source needs a function policy statement or execution role permissions.",
   "Students will be able to write S3 bucket policy conditions that enforce HTTPS and restrict access.",
   "Students will be able to explain why a KMS key policy can block a user who has full IAM permissions, and what cross-account key use requires."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the badge and the guest list. Collect answers and introduce the two policy types."
   ],
   [
    12,
    "Teach",
    "Project an identity policy and a resource-based policy side by side and highlight the Principal element. Draw a push versus poll diagram for Lambda event sources. Walk through a bucket policy that denies non-HTTPS traffic and the default KMS key policy statement, explaining delegation to IAM."
   ],
   [
    18,
    "Activity",
    "Run the 'Who holds the permission?' troubleshooting stations activity described below."
   ],
   [
    5,
    "Discuss",
    "Debrief the hardest station and work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A delivery driver arrives at a gated apartment building. The driver works for a trusted company but is not a resident. What has to be true for the gate to open, and who controls that decision?",
  "activity": {
   "title": "Who holds the permission? Troubleshooting stations",
   "materials": "Five printed station cards placed around the room, each with a short scenario, an error message and policy excerpts; sticky notes; projector for the debrief.",
   "steps": [
    "Station 1: an S3 trigger created by a template never fires; the card shows an execution role with s3:* and an empty function policy.",
    "Station 2: an SQS-triggered function fails to receive messages; the card shows a function policy allowing sqs.amazonaws.com and an execution role with only CloudWatch Logs permissions.",
    "Station 3: an API Gateway stage that uses a second alias returns HTTP 500; the card shows a permission for only one alias.",
    "Station 4: an administrator cannot decrypt with a KMS key; the card shows a key policy with no account principal statement.",
    "Station 5: a partner account gets AccessDenied reading a bucket; the card shows the bucket policy only. Groups of three rotate every three minutes, write the fix and the policy it belongs in on a sticky note, and leave it at the station for the next group to review."
   ]
  },
  "discussion": [
   "Why do you think AWS designed polled event sources to use the execution role while pushed sources use the function policy?",
   "What risks would exist if Lambda function policies did not support SourceArn and SourceAccount conditions?",
   "Why might an organization deliberately remove the default account statement from a KMS key policy?"
  ],
  "exit": [
   [
    "An EventBridge rule should invoke a Lambda function. Which policy needs updating?",
    "The function's resource-based policy, allowing events.amazonaws.com with the rule's ARN as the source ARN."
   ],
   [
    "What condition key in a bucket policy denies requests that do not use HTTPS?",
    "aws:SecureTransport set to false in a Deny statement."
   ],
   [
    "What two things are required for a role in account B to decrypt with a KMS key in account A?",
    "Account A's key policy must allow account B or the role, and account B's IAM policy must allow the KMS action on the key's ARN."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference sheet listing event sources as push or poll, plus a highlighted example of where the Principal element appears, so students can match each station to a pattern.",
   "Extend: Ask students to draft a complete bucket policy that enforces HTTPS, requires SSE-KMS on uploads and grants read access to one role in another account, then explain each statement's purpose to a partner."
  ]
 },
 {
  "t": "Cross-account access with STS AssumeRole and trust policies; temporary credentials",
  "objectives": [
   "Students will be able to explain the roles of the trust policy, the permissions policy and the caller's identity policy in cross-account access.",
   "Students will be able to describe the temporary credentials returned by STS AssumeRole and how their duration is controlled.",
   "Students will be able to choose when to use an external ID, MFA conditions or AssumeRoleWithWebIdentity.",
   "Students will be able to trace an assumed-role action in CloudTrail using the role session name."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board under 'permanent key' and 'temporary pass'."
   ],
   [
    12,
    "Teach",
    "Draw two account boxes. In the target account draw a role with a trust policy and a permissions policy; in the source account draw the caller with an sts:AssumeRole allow. Show the sample trust policy with an external ID. Explain the three credential values, default and maximum durations, role chaining, and the related STS APIs."
   ],
   [
    18,
    "Activity",
    "Run the 'Two keys to the door' role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play to real pipeline and vendor scenarios."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A contractor needs to work in your office building for one afternoon. Would you give them a copy of your house key or a visitor badge? What makes one safer than the other?",
  "activity": {
   "title": "Two keys to the door: cross-account role-play",
   "materials": "Index cards labeled Trust Policy, Permissions Policy, Caller Policy, STS and CloudTrail; blank cards for temporary credentials; a timer; whiteboard.",
   "steps": [
    "Assign roles in groups of five: Caller (in account A), Caller Policy, STS, Target Role (holding Trust Policy and Permissions Policy cards in account B), and CloudTrail recorder.",
    "The Caller requests access by naming a role ARN and a session name. Caller Policy decides whether sts:AssumeRole is allowed; Target Role checks whether the trust policy names the Caller and whether any external ID condition is met.",
    "If both agree, STS writes three values plus an expiry time on a credential card and hands it over; the CloudTrail recorder logs the session name and action.",
    "Run three rounds with twists the teacher announces: round two removes the caller's sts:AssumeRole permission, round three adds a vendor scenario requiring an external ID and the Caller first forgets it.",
    "Finish with a chaining round where the Caller uses its credential card to assume a second role; STS must cap the new card at one hour."
   ]
  },
  "discussion": [
   "Why is trusting a specific role in the source account safer than trusting the entire account?",
   "How would meaningful role session names change an incident investigation?",
   "What are the trade-offs of setting a role's maximum session duration to 12 hours?"
  ],
  "exit": [
   [
    "A role's trust policy allows account A, but a user in account A gets AccessDenied calling AssumeRole. What should you check?",
    "Whether the user's identity policy in account A allows sts:AssumeRole on the target role's ARN, and any trust policy conditions such as external ID or MFA."
   ],
   [
    "What problem does an external ID solve?",
    "The confused deputy problem, where a third party serving many customers is tricked into using its access on behalf of the wrong customer."
   ],
   [
    "How long can a role chaining session last?",
    "At most one hour."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in diagram of two accounts with blank boxes for the three policies and the three credential values, and let students complete it during the teaching segment.",
   "Extend: Ask students to write a trust policy for a CI system using OIDC federation with AssumeRoleWithWebIdentity, including conditions that restrict access to one repository, and explain each condition in plain words."
  ]
 },
 {
  "t": "Amazon Cognito: user pools (sign-up, sign-in, ID/access/refresh tokens) vs identity pools (temporary AWS credentials)",
  "objectives": [
   "Students will be able to distinguish Cognito user pools from identity pools by what each returns and when to use it.",
   "Students will be able to explain the purpose of ID, access and refresh tokens and how a backend validates a JWT.",
   "Students will be able to select appropriate user pool Lambda triggers for customization requirements.",
   "Students will be able to design fine-grained per-user access using identity pool roles and policy variables."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the gym membership. Record answers in two columns: 'proves who you are' and 'opens a door'."
   ],
   [
    13,
    "Teach",
    "Draw the combined flow on the whiteboard: app to user pool (tokens), app to API Gateway with access token, app to identity pool with ID token, identity pool to STS to role, app to S3 with credentials. Label each token's purpose and default lifetime. Show a decoded sample JWT on the projector, pointing out sub, email, token_use and exp. List the main Lambda triggers."
   ],
   [
    17,
    "Activity",
    "Run the requirements card sort described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, highlighting cases where both components are needed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you join a gym, you get a membership card, and some gyms also give you a locker key. What does each one prove or allow, and could one replace the other?",
  "activity": {
   "title": "User pool, identity pool or both? Requirements card sort",
   "materials": "Printed requirement cards (about 14), three header cards (User pool, Identity pool, Both), sticky notes; optionally student laptops with a browser to view a sample decoded JWT the teacher prepares.",
   "steps": [
    "Give each pair a deck of requirement cards such as 'users reset forgotten passwords', 'guests read public files from S3', 'sign in with Google', 'app uploads directly to the user's own S3 prefix', 'add a loyalty tier claim to tokens', 'API Gateway checks the caller is signed in'.",
    "Pairs sort each card under a header and, for user pool cards, write which feature or trigger handles it on a sticky note.",
    "For identity pool cards, pairs write the IAM role (authenticated or unauthenticated) and any policy variable or condition key needed.",
    "Each pair then sketches the end-to-end flow for a photo app that needs sign-in plus direct uploads, labeling which token goes where.",
    "Pairs compare with another pair and resolve any card they placed differently."
   ]
  },
  "discussion": [
   "Why might a team choose to call AWS services through their own API instead of giving devices AWS credentials through an identity pool?",
   "What could go wrong if a backend decoded a JWT but skipped signature validation?",
   "When would enabling unauthenticated identities be a reasonable product decision, and how would you limit the risk?"
  ],
  "exit": [
   [
    "A web app needs sign-up with email verification and MFA. Which Cognito component provides this?",
    "A user pool."
   ],
   [
    "Which token should be sent to an API Gateway method that requires OAuth scopes?",
    "The access token, because it contains the scopes."
   ],
   [
    "What condition key restricts identity pool users to DynamoDB items with their own partition key?",
    "dynamodb:LeadingKeys, matched to the user's identity ID policy variable."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the combined user pool and identity pool flow with blanks for token names and outputs, and a short glossary card for JWT, claim and policy variable.",
   "Extend: Ask students to outline the validation steps a Node.js or Python backend would perform on a Cognito access token without an authorizer, including which claims to check and why."
  ]
 },
 {
  "t": "API Gateway authorization: IAM (SigV4), Cognito user pool authorizers, Lambda authorizers, API keys and usage plans",
  "objectives": [
   "Students will be able to match API Gateway authorization types (IAM, Cognito user pool authorizer, Lambda authorizer) to caller scenarios.",
   "Students will be able to explain what a Lambda authorizer receives and returns, and how result caching affects behavior.",
   "Students will be able to explain why API keys are not authentication and describe how usage plans apply throttles and quotas.",
   "Students will be able to predict the HTTP status codes returned for throttling and for missing API keys."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the loyalty card and collect responses."
   ],
   [
    12,
    "Teach",
    "Draw API Gateway as a door with four checkpoints: SigV4 signature check, JWT check, Lambda authorizer, and API key with usage plan. For each, show the caller type, what the client sends and what happens on failure. Project a sample Lambda authorizer response policy and explain caching with the 300-second default TTL."
   ],
   [
    18,
    "Activity",
    "Run the 'Design the door' pair whiteboard exercise described below."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your coffee shop loyalty card has a number on it. If a friend copied that number, what could they do with it, and what could they not prove?",
  "activity": {
   "title": "Design the door: choosing API authorization",
   "materials": "Printed scenario cards (six API scenarios), whiteboard space or large paper for each pair, markers.",
   "steps": [
    "Give each pair two scenario cards, such as 'mobile app users signed in with Cognito', 'a partner using their own OAuth provider', 'an internal Lambda function', 'a public API with free and paid tiers', 'a private API reachable only from one VPC', 'a multi-tenant API that needs a tenant header and a token'.",
    "Pairs draw the request path for each scenario and label the authorization type, what the client sends (signature, JWT, token, x-api-key header) and where it is validated.",
    "For any Lambda authorizer design, pairs write a sketch of the returned policy, including principalId and the method ARN, and decide on a caching approach.",
    "Pairs add the expected status code for two failure cases: an expired token and a client over its usage plan quota.",
    "Two pairs join to present their designs to each other and challenge one choice each."
   ]
  },
  "discussion": [
   "Why might a team still use API keys even when every request is authenticated by a Cognito authorizer?",
   "What are the trade-offs of a long authorizer cache TTL for a system where accounts can be suspended at any time?",
   "When would you combine a resource policy with IAM authorization on the same API?"
  ],
  "exit": [
   [
    "A public API must offer a free tier limited to a number of requests per day. Which feature applies the limit?",
    "A usage plan with a quota, associated with each customer's API key."
   ],
   [
    "Which authorization type validates Cognito user pool tokens without custom code?",
    "A Cognito user pool authorizer."
   ],
   [
    "Why can a cached Lambda authorizer policy cause unexpected 403 errors?",
    "The cached policy is reused for other methods with the same token during the TTL; if it only allowed the first method, the others are denied."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision tree with three questions (Does the caller have AWS credentials? Is the token from Cognito? Is custom logic needed?) leading to the authorization type, plus a separate box for API keys.",
   "Extend: Ask students to write pseudocode for a request-based Lambda authorizer that checks a token and a tenant header, returns a policy covering all of that tenant's routes, and passes the tenant ID in the context."
  ]
 },
 {
  "t": "Encryption at rest: SSE-S3, SSE-KMS, SSE-C, S3 Bucket Keys, client-side encryption with the AWS Encryption SDK",
  "objectives": [
   "Students will be able to compare SSE-S3, SSE-KMS, DSSE-KMS, SSE-C and client-side encryption by key management, audit capability and where encryption occurs.",
   "Students will be able to select the correct S3 encryption option for a stated security or compliance requirement.",
   "Students will be able to explain how S3 Bucket Keys reduce KMS cost and throttling.",
   "Students will be able to describe how default bucket encryption and bucket policies enforce an encryption method."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Use the warm-up question to surface ideas about who holds the key and who keeps a log."
   ],
   [
    12,
    "Teach",
    "Build a comparison table on the whiteboard with columns Option, Who holds the key, Where encryption happens, Audit trail, Key requirement header. Fill rows for SSE-S3, SSE-KMS, DSSE-KMS, SSE-C and client-side encryption, then explain Bucket Keys and the enforcement pattern."
   ],
   [
    18,
    "Activity",
    "Run the 'Auditor's requirements' matching game described below."
   ],
   [
    5,
    "Discuss",
    "Debrief the matches students disagreed on and pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you store something valuable, would you rather keep it in a hotel safe, a bank deposit box, or a locked case you carry yourself? What do you gain and give up with each?",
  "activity": {
   "title": "The auditor's requirements: encryption matching game",
   "materials": "Printed requirement cards (12), option cards (SSE-S3, SSE-KMS, DSSE-KMS, SSE-C, client-side encryption, Bucket Keys), sticky notes, whiteboard.",
   "steps": [
    "In groups of three, students receive requirement cards such as 'log every decryption', 'AWS must never see plaintext', 'keys stay in our own hardware and are sent per request', 'cheapest option with zero configuration', 'KMS throttling at high request rates', 'two layers of encryption required by regulation'.",
    "Groups match each requirement to one or more option cards and write the deciding reason on a sticky note.",
    "For each SSE-KMS match, groups list the KMS permissions needed for upload and download.",
    "Groups write a one-sentence bucket policy idea that would block uploads using a different encryption method.",
    "The teacher reads each requirement aloud and groups hold up their option card; disagreements are discussed on the spot."
   ]
  },
  "discussion": [
   "Why might an organization choose SSE-KMS with a customer managed key instead of the AWS managed aws/s3 key?",
   "What operational risks come with SSE-C and client-side encryption that do not exist with SSE-S3?",
   "How would you explain to a non-technical auditor what changes in CloudTrail when Bucket Keys are enabled?"
  ],
  "exit": [
   [
    "Which S3 encryption option provides a CloudTrail record of each key use and lets you revoke access through a key policy?",
    "SSE-KMS, ideally with a customer managed key."
   ],
   [
    "What should you enable to reduce KMS throttling for an SSE-KMS bucket with heavy traffic?",
    "S3 Bucket Keys."
   ],
   [
    "A requirement says data must be encrypted before it leaves the application. What approach meets it?",
    "Client-side encryption, for example with the AWS Encryption SDK or the Amazon S3 Encryption Client."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed comparison table with the 'who holds the key' column filled in, so students focus on matching requirements to options.",
   "Extend: Ask students to draft a bucket policy that denies PutObject unless the request uses SSE-KMS with a specific key ID, and explain which condition keys they used."
  ]
 },
 {
  "t": "AWS KMS: customer managed vs AWS managed keys, envelope encryption with GenerateDataKey, 4 KB Encrypt limit, cross-account key use",
  "objectives": [
   "Students will be able to compare customer managed, AWS managed and AWS owned KMS keys in terms of control, rotation and sharing.",
   "Students will be able to explain the 4 KB Encrypt limit and describe the envelope encryption steps using GenerateDataKey and Decrypt.",
   "Students will be able to identify remedies for KMS throttling and the purpose of an encryption context.",
   "Students will be able to list the requirements for using a KMS key from another account."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about shipping a large item securely and connect answers to the idea of protecting a small key instead of the whole item."
   ],
   [
    12,
    "Teach",
    "Draw the envelope encryption flow: app calls GenerateDataKey, receives plaintext and encrypted data keys, encrypts data locally, discards plaintext key, stores ciphertext plus encrypted key. Then draw the decrypt flow. Add a key types table and a short cross-account diagram."
   ],
   [
    18,
    "Activity",
    "Run the envelope encryption role-play described below."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions and connect them to exam wording."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You need to send a large locked trunk across the country and keep the key safe. Would you ship the key inside the trunk, ship it separately, or lock the key in something else? Why?",
  "activity": {
   "title": "Sealed envelopes: acting out envelope encryption",
   "materials": "Paper envelopes, index cards, colored markers, a box labeled KMS, sticky notes; optional student laptops with a browser to view the teacher's projected pseudocode.",
   "steps": [
    "Assign roles in groups of four: Application, KMS (sits with the box and holds the secret master key card that never leaves), Storage, and Auditor (records every request to KMS like CloudTrail).",
    "The Application asks KMS for a data key; KMS writes a short code on two cards, puts one copy in a sealed envelope marked with the master key's name, and hands over both. The Auditor logs the request.",
    "The Application uses the plaintext card to 'encrypt' a long message (a simple letter-shift is fine for the role-play), tears up the plaintext card, and gives Storage the ciphertext plus the sealed envelope.",
    "To decrypt, the Application hands the sealed envelope to KMS, which checks a permissions list (the key policy) before returning the code. Run a second round where the Application belongs to another account and the key policy does not list it.",
    "Groups write down which step corresponds to GenerateDataKey, Decrypt and the 4 KB limit, and what an encryption context would add."
   ]
  },
  "discussion": [
   "Why is envelope encryption both cheaper and faster than sending all data to KMS?",
   "What are the risks and benefits of caching data keys?",
   "When would you choose a multi-Region key instead of re-encrypting data in a second Region?"
  ],
  "exit": [
   [
    "What is the maximum plaintext size for the KMS Encrypt API?",
    "4 KB."
   ],
   [
    "After encrypting data locally with a plaintext data key, what should the application store?",
    "The ciphertext and the encrypted copy of the data key; the plaintext key should be discarded."
   ],
   [
    "Which type of KMS key is required for cross-account access?",
    "A customer managed key, because its key policy can be edited to allow the other account."
   ]
  ],
  "differentiation": [
   "Support: Provide a numbered flowchart of envelope encryption with blanks for API names, and pair students with a partner who explains each step aloud.",
   "Extend: Ask students to write pseudocode for encrypting a file with GenerateDataKey and an encryption context, then list three things that could go wrong in production and how they would detect each in CloudTrail."
  ]
 },
 {
  "t": "Encryption in transit: TLS, ACM certificates (us-east-1 for CloudFront), enforcing aws:SecureTransport",
  "objectives": [
   "Students will be able to explain how TLS protects data in transit and the role of certificates.",
   "Students will be able to describe ACM certificate provisioning, DNS versus email validation and renewal behavior, including for imported certificates.",
   "Students will be able to determine which Region an ACM certificate must be in for CloudFront, edge-optimized and Regional API Gateway domains, and load balancers.",
   "Students will be able to write or interpret a bucket policy that enforces HTTPS with aws:SecureTransport."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect the answers to certificates proving identity."
   ],
   [
    12,
    "Teach",
    "Sketch a client, CloudFront, an ALB and EC2 targets on the whiteboard. Mark where TLS terminates and which Region each certificate lives in. Explain ACM validation methods and renewal. Project the aws:SecureTransport bucket policy and walk through each line."
   ],
   [
    18,
    "Activity",
    "Run the 'Where does the certificate live?' architecture review described below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you visit your bank's website, how do you know you are talking to the real bank and not an impostor in the middle? What does the padlock icon actually promise?",
  "activity": {
   "title": "Where does the certificate live? Architecture review",
   "materials": "Printed architecture diagrams (five), red and green markers, sticky notes, projector.",
   "steps": [
    "Give pairs five diagrams, each with a short note on where the ACM certificate was requested, for example: a CloudFront distribution with a certificate in eu-west-1; an edge-optimized API with a certificate in us-east-1; a Regional API in ap-southeast-2 with a certificate in us-east-1; an ALB terminating TLS and forwarding HTTP while a compliance rule requires end-to-end encryption; an S3 bucket with no HTTPS enforcement.",
    "Pairs mark each diagram green (correct) or red (broken or non-compliant) and write the fix on a sticky note.",
    "For the S3 diagram, pairs write the Deny statement condition on the diagram.",
    "Pairs then identify which certificates would renew automatically and which would need manual work, given a mix of DNS-validated, email-validated and imported certificates listed on the sheet.",
    "Volunteers present one fix each on the projector while the class confirms or corrects."
   ]
  },
  "discussion": [
   "What are the trade-offs between terminating TLS at a load balancer and re-encrypting to the targets?",
   "Why is a Deny on aws:SecureTransport false more reliable than relying on clients to use HTTPS?",
   "How would you make sure an imported certificate never expires unnoticed?"
  ],
  "exit": [
   [
    "In which Region must an ACM certificate be for a CloudFront distribution?",
    "us-east-1 (US East, N. Virginia)."
   ],
   [
    "Which ACM validation method allows fully automatic renewal?",
    "DNS validation, as long as the CNAME record remains."
   ],
   [
    "What statement in a bucket policy forces HTTPS?",
    "A Deny for all S3 actions on the bucket and its objects when aws:SecureTransport is false."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference card with three rules (CloudFront and edge-optimized use us-east-1; Regional endpoints use their own Region; deny when aws:SecureTransport is false) to apply while reviewing diagrams.",
   "Extend: Ask students to design an SQS queue policy that enforces TLS and allows one SNS topic to send messages, and to explain how both statements interact."
  ]
 },
 {
  "t": "Secrets and configuration: Secrets Manager (rotation) vs Systems Manager Parameter Store (SecureString, tiers)",
  "objectives": [
   "Students will be able to compare Secrets Manager and Parameter Store by features, cost model and typical use.",
   "Students will be able to describe how Secrets Manager rotation works, including the role of the rotation Lambda function and staging labels.",
   "Students will be able to explain Parameter Store hierarchies, SecureString decryption requirements and the Standard and Advanced tiers.",
   "Students will be able to apply best practices for retrieving secrets in Lambda and CloudFormation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show a short fictional config file with a hardcoded password on the projector and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Draw two columns, Parameter Store and Secrets Manager, and fill in features, cost, encryption and rotation. Draw the four-step rotation cycle with staging labels moving from AWSPENDING to AWSCURRENT. Show a parameter hierarchy and a CloudFormation dynamic reference."
   ],
   [
    18,
    "Activity",
    "Run the 'Sort the config file' activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at this configuration file. If this repository were accidentally made public tonight, what would an attacker gain, and what would you have to change tomorrow morning?",
  "activity": {
   "title": "Sort the config file",
   "materials": "A printed fictional configuration file per pair (about 20 lines mixing settings and secrets), highlighters in two colors, sticky notes, whiteboard.",
   "steps": [
    "Pairs highlight each line as configuration or secret using two colors.",
    "For each line, pairs decide whether it belongs in Parameter Store (String, StringList or SecureString, Standard or Advanced) or in Secrets Manager, and write the parameter path or secret name they would use.",
    "The teacher reveals two new requirements: the database password must rotate every 30 days, and one setting must expire automatically after a promotion ends. Pairs revise their choices.",
    "Pairs write the IAM permissions a production Lambda function would need to read its values, including kms:Decrypt where appropriate.",
    "Pairs sketch how the Lambda function retrieves and caches the values, then compare with another pair."
   ]
  },
  "discussion": [
   "What could break during a password rotation if an application cached the secret forever?",
   "Why might a team use both services in the same application?",
   "How does storing configuration in a path hierarchy help with least privilege?"
  ],
  "exit": [
   [
    "A requirement says the Aurora password must rotate automatically. Which service do you choose?",
    "AWS Secrets Manager."
   ],
   [
    "What two things are needed to retrieve a SecureString parameter as plaintext?",
    "WithDecryption=true in the request and kms:Decrypt permission on the KMS key."
   ],
   [
    "Where in a Lambda function should secrets be retrieved for best performance?",
    "During initialization outside the handler, cached with a refresh interval, for example with the Parameters and Secrets Lambda Extension."
   ]
  ],
  "differentiation": [
   "Support: Provide a decision card listing trigger words (rotation, replication, RDS integration point to Secrets Manager; free, hierarchy, plain config point to Parameter Store) to use during sorting.",
   "Extend: Ask students to outline what a custom rotation function for a third-party API key would do in each of the four rotation steps and how it would handle a failure in the test step."
  ]
 },
 {
  "t": "Keeping sensitive data out of code and logs: default credential chain, no hardcoded keys, CloudWatch Logs data protection masking",
  "objectives": [
   "Students will be able to explain how the default credential provider chain supplies role credentials to code on AWS and why hardcoded keys are unsafe.",
   "Students will be able to describe the response steps for an exposed access key.",
   "Students will be able to identify what should and should not be written to application logs and apply structured logging.",
   "Students will be able to configure a CloudWatch Logs data protection policy conceptually, including managed and custom identifiers, logs:Unmask and its limits."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and gather instinctive first responses."
   ],
   [
    12,
    "Teach",
    "Draw the SDK credential chain as a sequence of checks ending at role credentials on AWS compute. List safe homes for secrets. Project a sanitized structured log line next to an unsafe one. Explain data protection policies, logs:Unmask, audit findings and the 'only new events' limit."
   ],
   [
    18,
    "Activity",
    "Run the 'Log line red team' review described below."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "You discover that a teammate pasted an AWS access key into a public code snippet an hour ago. What are the first three things you would do, and in what order?",
  "activity": {
   "title": "Log line and code review: find the leaks",
   "materials": "Printed packets with fictional code snippets and log excerpts (about 12 items, all made up), red pens, sticky notes, projector.",
   "steps": [
    "Pairs receive a packet including items such as an SDK client created with explicit access keys, a Lambda handler that logs the entire event, a structured log line with only safe fields, a CloudFormation template with a plaintext password, and log lines containing a card number and an email address.",
    "Pairs circle each leak in red and write on a sticky note where the data should live instead (role and credential chain, Secrets Manager, Parameter Store SecureString, dynamic reference, or not logged at all).",
    "For each log leak, pairs decide whether a managed data identifier covers it or a custom data identifier is needed, and who should receive logs:Unmask.",
    "Pairs rewrite one unsafe log statement as a structured log line with explicit safe fields.",
    "Pairs swap packets with another pair to check for missed leaks, then the class reviews the trickiest items on the projector."
   ]
  },
  "discussion": [
   "Why should you assume an exposed key was used, even if it was public for only a few minutes?",
   "What is the balance between logging enough to troubleshoot and logging too much?",
   "Why is masking alone not a complete solution for sensitive data in logs?"
  ],
  "exit": [
   [
    "How should code running on ECS obtain AWS credentials?",
    "Through the ECS task role, picked up automatically by the SDK default credential chain."
   ],
   [
    "Which permission allows a user to see unmasked values in CloudWatch Logs?",
    "logs:Unmask."
   ],
   [
    "Name two things that should not be written to application logs.",
    "Any two of: passwords, tokens or Authorization headers, full card numbers, secret keys, personal data."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist of six common leak patterns with a short example of each so students can match packet items to patterns.",
   "Extend: Ask students to write a custom data identifier regular expression for a fictional internal account number format, and describe how they would test that it masks correctly without over-masking."
  ]
 },
 {
  "t": "Presigned URLs for temporary S3 access; IAM Access Analyzer for least privilege",
  "objectives": [
   "Students will be able to explain how presigned URLs grant temporary access to a single S3 object operation and what limits their validity.",
   "Students will be able to choose between presigned PUT URLs, presigned POST and CloudFront signed URLs for a given scenario.",
   "Students will be able to describe IAM Access Analyzer's external access, unused access, policy generation and policy validation features.",
   "Students will be able to outline a least-privilege workflow for an application role using Access Analyzer."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about sharing a single item temporarily and list answers."
   ],
   [
    12,
    "Teach",
    "Draw the presigned URL flow: client asks backend, backend signs URL locally, client calls S3 directly, S3 checks signature, expiry and signer permissions. List what makes a URL stop working. Then introduce Access Analyzer's four capabilities with one example finding each, and the least-privilege workflow."
   ],
   [
    18,
    "Activity",
    "Run the 'Will this link work?' and Access Analyzer findings stations described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You want a friend to pick up one package from your locked storage unit tomorrow, but you do not want them to have permanent access. What would you give them, and what could go wrong?",
  "activity": {
   "title": "Will this link work? Presigned URL and findings stations",
   "materials": "Printed scenario cards (8 presigned URL cases, 4 fictional Access Analyzer findings), sticky notes, whiteboard; optional student laptops with a browser for viewing a projected sample URL structure.",
   "steps": [
    "Groups of three receive presigned URL cards, each describing how a URL was signed and what happens, for example: signed by a Lambda role session ending in 40 minutes with ExpiresIn of 2 hours, used after 1 hour; signer's s3:GetObject permission removed after signing; expiry set to 10 days with SigV4; URL shared over a chat link and used by someone else.",
    "Groups decide for each card whether the request succeeds and write the reason on a sticky note.",
    "Groups then review fictional Access Analyzer findings, such as a bucket shared with an unknown account, a role trusted by an external account, an unused access key and a policy with a broad wildcard, and decide whether to fix, archive as intended, or remove.",
    "Each group designs an upload flow for a browser app that must limit file size and destination prefix, choosing between presigned PUT and presigned POST.",
    "Groups present one URL case and one finding to the class with their decision."
   ]
  },
  "discussion": [
   "Why is a presigned URL described as a bearer token, and how does that affect how you share it?",
   "When should a team archive an Access Analyzer finding instead of fixing it?",
   "What are the risks of generating a policy from CloudTrail activity that did not cover all code paths?"
  ],
  "exit": [
   [
    "A customer without AWS credentials needs to download one private S3 object for 10 minutes. What do you provide?",
    "A presigned GET URL for that object with a 10-minute expiry, generated by a backend with s3:GetObject permission."
   ],
   [
    "Name two reasons a presigned URL might stop working before its expiry time.",
    "The signing credentials expired (such as a role session ending) or the signer's permissions were removed."
   ],
   [
    "Which Access Analyzer feature reports an S3 bucket shared with an account outside your organization?",
    "External access analysis."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-question checklist for presigned URL cards (Has the URL expired? Have the signing credentials expired? Does the signer still have permission?) to apply to each case.",
   "Extend: Ask students to design a CI/CD step that uses Access Analyzer custom policy checks to block any pull request that adds new access compared to the current policy, and explain what the pipeline should do when the check fails."
  ]
 },
 {
  "t": "Preparing artifacts: .zip packages vs container images in ECR, Lambda layers, dependency packaging, CodeArtifact",
  "objectives": [
   "Students will be able to compare .zip packages and container images for Lambda by size limits, patching responsibility and tooling.",
   "Students will be able to diagnose native-dependency import errors and choose a Lambda-compatible build method.",
   "Students will be able to explain how Lambda layers are structured under /opt and when to use them.",
   "Students will be able to describe how CodeArtifact domains, upstream repositories and external connections support controlled builds."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard without judging them. Say: today we will learn which box fits which kind of code."
   ],
   [
    15,
    "Teach",
    "Draw two columns, .zip and container image. Fill in limits (50 MB direct zipped upload, 250 MB unzipped with layers, 10 GB image), who patches the runtime, where the artifact lives, and that the type is fixed at creation. Then sketch /opt with python/ and nodejs/node_modules/ subfolders for layers, and finish with a CodeArtifact diagram: domain, repository, upstream, external connection."
   ],
   [
    15,
    "Activity",
    "Run the Packaging Triage card activity in pairs (steps below). Circulate and ask each pair to justify one decision aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare how pairs handled the ambiguous cards, especially the native-library and layer-folder cards."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your function needs a 2 GB machine learning library. Name every way you can think of to get that code into Lambda, and guess which one AWS would accept.",
  "activity": {
   "title": "Packaging Triage",
   "materials": "Printed scenario cards (about 10, made by the teacher), whiteboard, markers, sticky notes.",
   "steps": [
    "Give each pair a deck of scenario cards, for example: a 3 GB dependency set; a NumPy import error after building on a Mac; eight functions sharing one utility library; a layer attached but module not found; builds must not pull from the public internet; a team wants AWS to patch the runtime.",
    "Pairs sort each card under one of four whiteboard headings: .zip package, container image, layer, CodeArtifact. A card may also get a sticky note naming a build fix such as sam build --use-container.",
    "For each card, pairs write one sentence of reasoning that cites a limit or behavior (for example the 250 MB unzipped limit or the /opt/python path).",
    "Two pairs swap decks and check each other's sorting, marking any disagreements to raise in discussion."
   ]
  },
  "discussion": [
   "When would you choose a container image even though your code fits in a .zip package, and what ongoing work does that choice create?",
   "What risks does a build pipeline face if it pulls packages directly from public registries, and how does CodeArtifact reduce them?"
  ],
  "exit": [
   [
    "Your dependencies total 600 MB unzipped. Which Lambda packaging format must you use?",
    "A container image stored in ECR, because .zip packages plus layers are limited to 250 MB unzipped while images allow up to 10 GB."
   ],
   [
    "A Python layer is attached but the function cannot import its library. What is the likely cause?",
    "The layer's files are not under the python/ folder, so they do not appear in /opt/python where the runtime looks."
   ],
   [
    "What does a CodeArtifact external connection provide?",
    "Access to a public registry through the managed repository, which caches packages so builds are consistent, auditable and resilient to public registry changes."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference table of the size limits and the /opt folder paths, and let struggling students sort only the first five cards with a partner who reads each scenario aloud.",
   "Extend: Ask fast finishers to write a short buildspec install and pre_build sequence that logs in to CodeArtifact and builds native dependencies in a Lambda-compatible container, and explain each line."
  ]
 },
 {
  "t": "AWS SAM: template structure, sam build, sam deploy --guided, sam local invoke / start-api, samconfig.toml",
  "objectives": [
   "Students will be able to identify a SAM template by its Transform line and explain what SAM resource types expand into.",
   "Students will be able to read a SAM function definition and describe what its Events, Policies and Globals settings create.",
   "Students will be able to choose the correct SAM CLI command for building, local testing and deploying.",
   "Students will be able to explain the role of samconfig.toml and per-environment configuration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Point out that each manual step they name is something SAM automates."
   ],
   [
    12,
    "Teach",
    "Project the sample template from the lesson. Walk line by line: Transform, Globals, the function, Events, Policies, the SimpleTable. Then draw the CLI workflow on the board: init, build, local invoke or start-api, deploy --guided, with samconfig.toml as an output arrow."
   ],
   [
    18,
    "Activity",
    "Run the Template Expansion activity (steps below) in groups of three."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions and connect answers back to where local testing stops being enough."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "If you had to set up one Lambda function behind an API route with permission to read one database table entirely by hand, what separate pieces would you need to create?",
  "activity": {
   "title": "Template Expansion",
   "materials": "Projector with the lesson's SAM template, printed copies of the template, sticky notes in two colors, whiteboard.",
   "steps": [
    "Give each group a printed SAM template. On yellow sticky notes, groups write every underlying AWS resource they think the transform will create (for example Lambda function, IAM role, API Gateway method, Lambda permission, DynamoDB table).",
    "Groups place each sticky note next to the template line that causes it, then compare with another group and resolve differences.",
    "On blue sticky notes, groups write the SAM CLI command they would run for each need the teacher reads aloud: prepare artifacts, run one test event, test the API with curl, first deployment, repeat deployment, deploy to prod settings.",
    "The teacher reveals answers; groups score themselves and explain any surprises, such as the automatic Lambda permission from Events."
   ]
  },
  "discussion": [
   "What kinds of bugs can sam local catch, and which kinds can only show up once the stack is deployed?",
   "Why might a team keep separate [default] and [prod] sections in samconfig.toml instead of typing parameters each time?"
  ],
  "exit": [
   [
    "Which line identifies a SAM template?",
    "Transform: AWS::Serverless-2016-10-31."
   ],
   [
    "You want to test one function with a saved S3 event without deploying. Which command do you run, and what must be installed?",
    "sam local invoke with -e and the event file; Docker must be installed."
   ],
   [
    "What does sam deploy --guided do that plain sam deploy does not?",
    "It prompts for settings such as stack name, Region and parameters and saves them to samconfig.toml for later deployments."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a command cheat sheet with each SAM CLI command and a one-line purpose, and have them match commands to needs before doing the template expansion.",
   "Extend: Ask fast finishers to add AutoPublishAlias and a DeploymentPreference with a canary type and an alarm to the template, and explain what CodeDeploy will do on the next deployment."
  ]
 },
 {
  "t": "CloudFormation: templates, parameters, outputs and exports, Fn::ImportValue, change sets, packaging local artifacts to S3",
  "objectives": [
   "Students will be able to identify the sections of a CloudFormation template and the purpose of common intrinsic functions.",
   "Students will be able to explain how Outputs with Export and Fn::ImportValue share values between stacks and why exported stacks cannot be deleted.",
   "Students will be able to use a change set to predict whether an update modifies or replaces a resource.",
   "Students will be able to describe the package-then-deploy workflow and when CAPABILITY_IAM is required."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to vote on what will happen. Record the vote on the board."
   ],
   [
    15,
    "Teach",
    "Project a template and label each section. Demonstrate Ref versus Fn::GetAtt with two examples. Draw two stacks connected by an Export arrow and an ImportValue arrow, then explain the deletion lock. Finish with the package and deploy commands and the capabilities error."
   ],
   [
    15,
    "Activity",
    "Run the Change Set Prediction activity in pairs (steps below)."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up vote and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions in their notebooks and hand them in."
   ]
  ],
  "warmup": "You change one property on a database table in your template and deploy. Will AWS edit the existing table, or throw it away and build a new one? How would you find out before deploying?",
  "activity": {
   "title": "Change Set Prediction",
   "materials": "Printed pairs of before-and-after template excerpts (made by the teacher), printed blank change set tables with Action and Replacement columns, whiteboard.",
   "steps": [
    "Give each pair five template diffs, for example: adding an Output, changing a Lambda function's memory, renaming a DynamoDB table's partition key, adding a new SQS queue, removing a bucket that has DeletionPolicy: Retain.",
    "For each diff, pairs fill in the blank change set row: Action (Add, Modify, Remove) and Replacement (True, False, Conditional), with a one-sentence justification.",
    "Pairs mark any row where data could be lost and write which protection (DeletionPolicy, UpdateReplacePolicy, backup) they would add first.",
    "The teacher reveals the expected change set; pairs explain any mismatches to the class."
   ]
  },
  "discussion": [
   "When would you choose exports and Fn::ImportValue over nested stacks, and what coupling does each create between teams?",
   "Why does CloudFormation force you to acknowledge IAM changes with a capability flag instead of just doing them?"
  ],
  "exit": [
   [
    "Which template section is required?",
    "Resources."
   ],
   [
    "A network stack exports a subnet ID that an app stack imports. What happens if you try to delete the network stack?",
    "CloudFormation refuses until the app stack no longer imports the export."
   ],
   [
    "Your template creates an IAM role and uses CodeUri pointing to a local folder. Which two things must you do to deploy it with the AWS CLI?",
    "Run aws cloudformation package to upload the code to S3, then deploy the packaged template with --capabilities CAPABILITY_IAM (or CAPABILITY_NAMED_IAM for named roles)."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled sample template with each section color-coded and a short glossary of Ref, Fn::GetAtt, Fn::Sub and Fn::ImportValue for students to refer to during the activity.",
   "Extend: Ask fast finishers to design how they would share a value between stacks in two different Regions, since exports are Region-scoped, and justify their approach."
  ]
 },
 {
  "t": "AWS CDK basics: constructs, cdk bootstrap, cdk synth, cdk deploy",
  "objectives": [
   "Students will be able to explain how a CDK app is synthesized into CloudFormation and deployed.",
   "Students will be able to distinguish L1, L2 and L3 constructs and give an example of each.",
   "Students will be able to state when cdk bootstrap is required and what the CDKToolkit stack contains.",
   "Students will be able to choose between cdk synth, cdk diff and cdk deploy for a given need."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather pros and cons on the board in two columns."
   ],
   [
    12,
    "Teach",
    "Draw the construct tree: App, Stack, constructs. Show the L1, L2, L3 ladder with CfnBucket, s3.Bucket and a pattern. Project the lesson's Python code and point out grant_read and Code.from_asset. Then draw the CLI flow: init, bootstrap once, synth to cdk.out, diff, deploy through CloudFormation."
   ],
   [
    18,
    "Activity",
    "Run the Construct Ladder and Error Clinic activity in small groups (steps below)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the CDK to students' earlier CloudFormation knowledge."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions on index cards."
   ]
  ],
  "warmup": "Would you rather describe twenty nearly identical queues in a 600-line YAML file or in a five-line loop in a programming language? What could go wrong with each choice?",
  "activity": {
   "title": "Construct Ladder and Error Clinic",
   "materials": "Printed cards with construct names and descriptions, printed error message cards (made by the teacher), whiteboard, markers.",
   "steps": [
    "Part one: groups receive mixed cards (CfnBucket, s3.Bucket, a load-balanced Fargate pattern, CfnTable, dynamodb.Table, a Lambda-backed REST API pattern) and place each on an L1, L2 or L3 rung drawn on the board, writing one reason per card.",
    "Part two: groups receive error and request cards, for example 'This stack uses assets, so the toolkit stack must be deployed', 'I want to see the template before deploying', 'What will change compared to production?', and 'The bucket still exists after I removed it from my code'.",
    "For each card, groups write the CDK command or concept that resolves it (cdk bootstrap, cdk synth, cdk diff, removal policy) and a one-sentence explanation.",
    "Groups present one card each; the class challenges any answer that does not mention CloudFormation's role."
   ]
  },
  "discussion": [
   "What new risks appear when infrastructure is written in a full programming language, and how do unit tests on synthesized templates help?",
   "Why might the CDK retain stateful resources like buckets and tables by default instead of deleting them?"
  ],
  "exit": [
   [
    "Your first cdk deploy in a new Region fails because the staging bucket does not exist. What do you run?",
    "cdk bootstrap for that account and Region, then deploy again."
   ],
   [
    "Which command shows the CloudFormation template your CDK app will produce, without deploying?",
    "cdk synth, which writes templates to cdk.out."
   ],
   [
    "Give one difference between an L1 and an L2 construct.",
    "L1 constructs (Cfn prefix) map directly to CloudFormation resources with no extra defaults; L2 constructs add sensible defaults and helper methods such as grant_read."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed construct ladder and a command-to-purpose matching sheet so students focus on recognizing patterns before explaining them.",
   "Extend: Ask fast finishers to sketch a unit test using the CDK assertions module that fails if any S3 bucket in the synthesized template lacks versioning, and explain why that test runs without AWS credentials."
  ]
 },
 {
  "t": "Lambda versions and aliases; weighted aliases; CodeDeploy canary, linear and all-at-once traffic shifting with alarm rollback",
  "objectives": [
   "Students will be able to distinguish $LATEST, published versions and aliases, including qualified and unqualified ARNs.",
   "Students will be able to configure a weighted alias conceptually and explain its constraints.",
   "Students will be able to compare canary, linear and all-at-once CodeDeploy configurations for Lambda.",
   "Students will be able to explain how CloudWatch alarms and lifecycle hooks trigger automatic rollback."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let students suggest strategies; list them on the board."
   ],
   [
    12,
    "Teach",
    "Draw $LATEST, versions 1 to 4 as boxes, and an alias arrow labeled prod. Move the arrow to show release and rollback. Split the arrow 90/10 to show weights. Then sketch timelines for canary, linear and all-at-once, and add an alarm icon that sends the arrow back."
   ],
   [
    18,
    "Activity",
    "Run the Human Traffic Shift role-play (steps below)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare the role-play outcomes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions on paper."
   ]
  ],
  "warmup": "You have a new version of a payment function and you are nervous about it. If you could control exactly how many customers see it at first, what would you do, and how would you undo it fast?",
  "activity": {
   "title": "Human Traffic Shift",
   "materials": "Twenty sticky notes per group representing requests, two labeled paper boxes (Version 3 and Version 4), a printed deployment configuration card for each group, a red card representing an alarm, whiteboard timer.",
   "steps": [
    "Each group receives a deployment configuration card: canary 10 percent then all after a wait, linear 10 percent per step, or all at once. One student plays CodeDeploy, one plays the CloudWatch alarm, and others are requests.",
    "In timed rounds of about thirty seconds, the CodeDeploy student moves request sticky notes into the Version 4 box according to the configuration, announcing the current weight.",
    "At a random moment the teacher hands some groups the red alarm card. The CodeDeploy student must immediately move all requests back to Version 3 and announce the rollback.",
    "Groups record how many requests reached Version 4 before rollback and compare across configurations on the whiteboard."
   ]
  },
  "discussion": [
   "Which configuration exposed the fewest requests to the bad version in our role-play, and what is the cost of choosing that configuration every time?",
   "Why is it important that triggers point at an alias rather than a version number or $LATEST?"
  ],
  "exit": [
   [
    "What is the difference between $LATEST and a published version?",
    "$LATEST is mutable and changes with every edit; a published version is an immutable, numbered snapshot."
   ],
   [
    "Describe what LambdaLinear10PercentEvery1Minute does.",
    "It shifts an additional 10 percent of traffic to the new version every minute until 100 percent, taking about ten minutes."
   ],
   [
    "Name two things that can cause CodeDeploy to roll back a Lambda deployment automatically.",
    "A configured CloudWatch alarm entering ALARM, or a failing BeforeAllowTraffic or AfterAllowTraffic hook."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram of $LATEST, versions and an alias arrow, and let them act as requests in the role-play before taking the CodeDeploy role.",
   "Extend: Ask fast finishers to write the SAM function properties for AutoPublishAlias, a linear DeploymentPreference, an alarm and both hooks, and explain which CodeDeploy resources SAM creates from them."
  ]
 },
 {
  "t": "API Gateway stages, stage variables, deployments, mock integrations, canary releases",
  "objectives": [
   "Students will be able to explain the relationship between REST API edits, deployments and stages.",
   "Students will be able to configure stage variables to route stages to different Lambda aliases and identify the required permissions.",
   "Students will be able to choose a mock integration for appropriate scenarios such as early development and CORS preflight.",
   "Students will be able to describe how a stage canary release is configured, monitored, promoted or rolled back."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and ask students to guess why the change is invisible. Note guesses on the board."
   ],
   [
    15,
    "Teach",
    "Draw the flow: working API definition, Create deployment arrow, stages dev and prod with their URLs. Add stage variables to each stage and arrows to Lambda aliases, with a padlock icon for the per-alias permission. Then show the four integration types and highlight mock. Finally, split the prod stage into 90 percent current and 10 percent canary."
   ],
   [
    15,
    "Activity",
    "Run the Support Ticket Triage activity in pairs (steps below)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on why API Gateway separates editing from deploying."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions on sticky notes."
   ]
  ],
  "warmup": "A developer edits an API in the console, refreshes the app, and sees no change. List three possible reasons.",
  "activity": {
   "title": "Support Ticket Triage",
   "materials": "Printed support ticket cards (made by the teacher), a projector showing a simplified stage configuration, whiteboard, markers.",
   "steps": [
    "Give each pair eight ticket cards, for example: 'Fix not visible to the mobile app', 'Dev stage calls the prod database function', 'Front end blocked, backend not built', 'Browser blocks call due to missing CORS preflight response', 'Canary traffic all 500 errors', 'Need to test new release on 5 percent of users'.",
    "For each ticket, pairs write the root cause and the API Gateway feature or action that resolves it (create deployment, stage variable change, add Lambda permission, mock integration, canary settings, promote canary).",
    "Pairs order the tickets by how quickly each fix can be applied and note which fixes require a new deployment.",
    "The teacher projects answers; pairs explain any disagreements, especially around permissions for stage-variable aliases."
   ]
  },
  "discussion": [
   "What are the benefits and risks of HTTP APIs deploying changes automatically compared with REST APIs requiring an explicit deployment?",
   "How do stage variables and Lambda aliases together reduce the number of API definitions a team must maintain?"
  ],
  "exit": [
   [
    "Why might clients not see a change you just saved to a REST API?",
    "No new deployment was created to the stage, so the stage still serves the old snapshot."
   ],
   [
    "What two things are needed for the prod stage to invoke my-function:prod through a stage variable?",
    "An integration ARN such as my-function:${stageVariables.lambdaAlias} with lambdaAlias set to prod on the stage, and a Lambda resource-based permission letting API Gateway invoke the prod alias."
   ],
   [
    "Give one use of a mock integration.",
    "Returning fixed responses before the backend exists, testing, or answering CORS preflight OPTIONS requests."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flow diagram template with blank boxes for edit, deployment, stage, stage variable and alias, and have them fill it in before triaging tickets.",
   "Extend: Ask fast finishers to design a custom domain with base path mappings for v1 and v2 and explain which endpoint type they would choose for a global mobile audience versus an internal VPC-only service."
  ]
 },
 {
  "t": "Elastic Beanstalk deployment policies: all at once, rolling, rolling with additional batch, immutable, traffic splitting, blue/green URL swap",
  "objectives": [
   "Students will be able to describe how each Elastic Beanstalk deployment policy rolls out a new application version.",
   "Students will be able to compare the policies by speed, downtime, extra cost and rollback behavior.",
   "Students will be able to select the correct policy or blue/green technique from a set of business requirements.",
   "Students will be able to explain why production databases should be created outside a Beanstalk environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about renovating a busy store and collect strategies on the board."
   ],
   [
    12,
    "Teach",
    "Draw a row of eight instance boxes. Animate each policy on the board by erasing and redrawing: all at once, rolling in batches of two, rolling with additional batch adding two new boxes first, immutable drawing a whole second row, traffic splitting with a percentage arrow, and blue/green as two separate environments with a CNAME swap arrow."
   ],
   [
    18,
    "Activity",
    "Run the Policy Matrix and Requirements Match activity in groups of three or four (steps below)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface trade-offs students noticed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "A busy store needs to replace every cash register before the weekend. What are the different ways you could do it, and what does each cost in lost sales or extra money?",
  "activity": {
   "title": "Policy Matrix and Requirements Match",
   "materials": "Whiteboard grid or printed matrix with policies as rows and speed, downtime, extra cost and rollback as columns; printed requirement cards (made by the teacher); markers.",
   "steps": [
    "Groups fill in the matrix for all at once, rolling, rolling with additional batch, immutable, traffic splitting and blue/green, using short entries such as fastest, none, temporary double, terminate new instances.",
    "The teacher deals six requirement cards, for example: 'dev environment, cheapest and fastest', 'must never drop below full capacity', 'fastest safe rollback if health checks fail', 'test on 10 percent of real traffic first', 'test a new platform for a day before cutover', 'no extra cost, reduced capacity acceptable'.",
    "Groups match each card to a policy or technique and write the matrix cell that justifies the choice.",
    "Groups trade cards with a neighbor group and challenge one match they disagree with, then the teacher confirms answers."
   ]
  },
  "discussion": [
   "Rolling and rolling with additional batch both leave two versions serving traffic for a while. What kinds of application changes make that dangerous?",
   "Why might a team choose immutable over blue/green, or the other way around, when both offer quick rollback?"
  ],
  "exit": [
   [
    "Which policy keeps full capacity during a batch-by-batch update?",
    "Rolling with additional batch."
   ],
   [
    "A deployment must be the safest possible with the quickest rollback if new instances fail health checks. Which policy?",
    "Immutable, because the old instances are untouched and failed new instances are simply terminated."
   ],
   [
    "How do you perform blue/green in Elastic Beanstalk?",
    "Deploy the new version to a separate environment, test it, then use Swap Environment URLs to exchange the CNAMEs with production."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially filled matrix with the speed and cost columns completed so students focus on downtime and rollback, and pair them with a peer for the requirement match.",
   "Extend: Ask fast finishers to explain how traffic splitting differs from a Lambda canary deployment in CodeDeploy, and when DNS caching makes blue/green rollback slower than immutable rollback."
  ]
 },
 {
  "t": "CodePipeline stages and actions, manual approvals; CodeBuild buildspec phases and artifacts",
  "objectives": [
   "Students will be able to describe the structure of a CodePipeline pipeline in terms of stages, actions, run order and artifacts.",
   "Students will be able to explain how a manual approval action works, including notifications, permissions and the seven-day timeout.",
   "Students will be able to read a buildspec.yml file and identify the purpose of each phase and section.",
   "Students will be able to troubleshoot common pipeline problems such as missing artifacts, exposed secrets and service role permissions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write students' release steps on the board in order."
   ],
   [
    12,
    "Teach",
    "Turn the students' steps into pipeline stages on the board. Add actions, run order and artifact arrows between stages with an S3 bucket icon. Show a manual approval with an SNS envelope icon. Project the sample buildspec and label each phase and section."
   ],
   [
    18,
    "Activity",
    "Run the Pipeline Whiteboard Build and Buildspec Bug Hunt activity in groups (steps below)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect pipeline design to release safety."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions on paper."
   ]
  ],
  "warmup": "Think of a release that went wrong at a job, school project or app you use. What steps would have caught the problem if they had run automatically every time?",
  "activity": {
   "title": "Pipeline Whiteboard Build and Buildspec Bug Hunt",
   "materials": "Sticky notes, whiteboard, printed buildspec excerpts containing deliberate mistakes (made by the teacher), markers.",
   "steps": [
    "Part one: each group designs a pipeline on the whiteboard with sticky notes for stages and actions: GitHub source, CodeBuild build, parallel unit test and scan actions, CloudFormation deploy to staging, manual approval with SNS, deploy to production. They draw and label every artifact arrow.",
    "Part two: groups receive a printed buildspec with four planted problems, for example a password in plain env variables, the packaged template missing from artifacts, unit tests placed in post_build instead of before the build, and the ECR login placed after the image push.",
    "Groups circle each problem and write the fix and the consequence if it were not fixed.",
    "Groups swap buildspecs with another group to check fixes, then the teacher reviews the answers with the class."
   ]
  },
  "discussion": [
   "Why is it important to deploy the same build artifact to staging and production rather than rebuilding for each environment?",
   "Where should a manual approval sit in a pipeline, and what information should reviewers receive to make a good decision?"
  ],
  "exit": [
   [
    "List the buildspec phases in order.",
    "install, pre_build, build, post_build."
   ],
   [
    "How does a deploy action get the files produced by a CodeBuild action?",
    "The build action declares an output artifact listed in the buildspec artifacts section, stored in the pipeline's S3 bucket, and the deploy action uses it as an input artifact."
   ],
   [
    "What happens if a manual approval is not acted on?",
    "It fails after seven days, stopping the pipeline execution."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled reference buildspec and a stage template with blank boxes so they can place sticky notes without designing the structure from scratch.",
   "Extend: Ask fast finishers to add an invoke action that runs a Lambda function to post a release note, and to write the IAM permissions both the pipeline and the approver need."
  ]
 },
 {
  "t": "CodeDeploy appspec.yml lifecycle hooks for EC2, Lambda and ECS; the CodeDeploy agent",
  "objectives": [
   "Students will be able to sequence the EC2 in-place lifecycle hooks and identify which events accept scripts.",
   "Students will be able to compare the lifecycle hooks available for EC2, Lambda and ECS deployments.",
   "Students will be able to read an appspec.yml file and explain what each section does.",
   "Students will be able to troubleshoot EC2 deployments that fail to start or fail at ApplicationStop."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect a class list of steps on the board."
   ],
   [
    12,
    "Teach",
    "Map the class list onto the EC2 hook order, marking DownloadBundle and Install as CodeDeploy-only events. Explain the agent's polling model and the instance profile. Project the sample appspec.yml and label files and hooks. Then draw short timelines for Lambda (two hooks) and ECS (five hooks with a test listener)."
   ],
   [
    18,
    "Activity",
    "Run the Hook Card Sequencing and Platform Sort activity in groups (steps below)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, including the ApplicationStop surprise."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions on index cards."
   ]
  ],
  "warmup": "If you had to update a website running on twelve servers by hand, what steps would you do on each server, and in what order?",
  "activity": {
   "title": "Hook Card Sequencing and Platform Sort",
   "materials": "Printed cards with every lifecycle event name (made by the teacher), three labeled whiteboard columns for EC2, Lambda and ECS, printed scenario cards, markers.",
   "steps": [
    "Each group receives shuffled EC2 event cards and lays them in order, including the load balancer traffic events. They flip over the four cards that cannot take scripts.",
    "Groups then sort a second set of hook cards into the EC2, Lambda and ECS columns; some hooks belong to more than one platform.",
    "The teacher hands out scenario cards, such as 'one instance shows no events', 'all deployments fail at ApplicationStop after an old script was deleted', 'run tests on new ECS tasks before users', 'verify the app responds after start on EC2'. Groups write the hook or fix for each.",
    "Groups compare answers with a neighbor and the teacher confirms using the projected AppSpec."
   ]
  },
  "discussion": [
   "Why do you think CodeDeploy uses an agent that polls the service instead of connecting into instances directly?",
   "What are the advantages of blue/green deployments for ECS compared with in-place updates on EC2, and what do they cost?"
  ],
  "exit": [
   [
    "List the EC2 in-place lifecycle events in order.",
    "ApplicationStop, DownloadBundle, BeforeInstall, Install, AfterInstall, ApplicationStart, ValidateService."
   ],
   [
    "Which hooks can a Lambda deployment use?",
    "BeforeAllowTraffic and AfterAllowTraffic."
   ],
   [
    "An EC2 instance never shows any lifecycle events. What is the most likely cause?",
    "The CodeDeploy agent is not installed or running, or the instance profile lacks access to the revision."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the mnemonic and a partially ordered EC2 card set with the first and last events fixed, and let them work with a partner on the platform sort.",
   "Extend: Ask fast finishers to write an ECS AppSpec outline naming the task definition, container, port and all five hooks, and explain what each hook's Lambda function should test."
  ]
 },
 {
  "t": "Testing in development environments: unit tests in CI, integration tests against deployed stages, AppConfig feature flags and gradual configuration rollout",
  "objectives": [
   "Students will be able to distinguish unit tests, local emulation and integration tests by what each can and cannot detect.",
   "Students will be able to place each type of test in the correct stage of a CI/CD pipeline.",
   "Students will be able to explain how AppConfig feature flags, deployment strategies and alarms enable gradual, reversible configuration changes.",
   "Students will be able to describe how Lambda functions retrieve AppConfig configuration efficiently."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and ask students how a feature with passing tests could fail in production."
   ],
   [
    12,
    "Teach",
    "Draw a testing pyramid: unit tests at the base, local emulation in the middle, integration tests at the top. Beside it, draw a pipeline with test stages placed correctly. Then draw an AppConfig rollout curve over time with a bake period and an alarm icon causing a drop back to zero."
   ],
   [
    18,
    "Activity",
    "Run the Which Test Catches It activity followed by a quick AppConfig strategy design (steps below)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about testing costs and feature flags."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions on paper."
   ]
  ],
  "warmup": "A feature passed hundreds of automated tests, then failed for every user in production. Brainstorm what kinds of problems could slip past tests that run only on a developer's laptop.",
  "activity": {
   "title": "Which Test Catches It",
   "materials": "Printed bug cards (made by the teacher), three labeled zones on the whiteboard for unit test, local emulation and integration test, sticky notes, markers.",
   "steps": [
    "Each group receives ten bug cards, such as an off-by-one error in price calculation, a missing dynamodb:PutItem permission, a handler that misreads the SQS event shape, a wrong queue URL in an environment variable, a timeout calling a real payment API, and a JSON parsing error in business logic.",
    "Groups place each card in the cheapest zone that would reliably catch it and write one sentence explaining why cheaper layers would miss it.",
    "Groups then design an AppConfig rollout for a risky feature on a sticky note: growth type, total time, bake time and the CloudWatch alarm they would associate.",
    "Groups present one bug card placement and their rollout design; the class questions any choice that relies on mocks for permissions."
   ]
  },
  "discussion": [
   "Integration tests are slower and cost money to run. How would you decide which scenarios deserve an integration test?",
   "What new risks do feature flags introduce, such as old flags left in code, and how could a team manage them?"
  ],
  "exit": [
   [
    "Why can't mocked unit tests detect a missing IAM permission?",
    "Mocks never call AWS, so no authorization check happens; only tests against deployed resources exercise real permissions."
   ],
   [
    "Where in a pipeline should integration tests run?",
    "In a test stage after deploying the stack to a dedicated test environment, before promotion to production."
   ],
   [
    "What causes AppConfig to roll back a configuration automatically?",
    "A CloudWatch alarm associated with the environment entering ALARM during the deployment or bake time."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card listing what each test layer can and cannot see, and let them place the first five bug cards with teacher prompts.",
   "Extend: Ask fast finishers to sketch how a Lambda function would read a feature flag through the AppConfig Lambda extension and explain why caching matters for latency and cost."
  ]
 },
 {
  "t": "Root cause analysis with CloudWatch Logs, Logs Insights queries, metrics and dashboards",
  "objectives": [
   "Students will be able to explain the structure of CloudWatch Logs, including log groups, log streams, retention and Lambda REPORT lines.",
   "Students will be able to write simple Logs Insights queries using fields, filter, stats, sort and limit.",
   "Students will be able to interpret key Lambda, API Gateway, SQS and DynamoDB metrics to locate a problem.",
   "Students will be able to choose between metrics, logs, metric filters, dashboards and traces in a root cause investigation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario and ask students where they would look first. Tally answers on the board."
   ],
   [
    12,
    "Teach",
    "Draw the investigation funnel: metrics (what and when), narrow the window, Logs Insights (why), request IDs and traces (where). Project a sample REPORT line and label its fields. Show the two sample queries and explain each pipe. Compare Latency and IntegrationLatency on a quick sketch graph."
   ],
   [
    18,
    "Activity",
    "Run the Incident Detective activity in pairs (steps below)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on investigation order and logging practices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer three exit questions on index cards."
   ]
  ],
  "warmup": "Users say the app has been slow since lunch. You have graphs, millions of log lines and no other information. What is the very first thing you would look at, and why?",
  "activity": {
   "title": "Incident Detective",
   "materials": "Printed packets per pair (made by the teacher) containing sketched metric graphs, a page of sample Lambda log lines including REPORT lines, and blank query cards; projector; whiteboard.",
   "steps": [
    "Each pair receives an incident packet: graphs of API Gateway Latency and IntegrationLatency, Lambda Duration p99, Errors and Throttles, and SQS ApproximateAgeOfOldestMessage, plus log excerpts.",
    "Pairs use the graphs to write down when the problem started and which component is affected, citing the specific metrics.",
    "Pairs write two Logs Insights queries on query cards: one to find errors in the narrowed window and one to summarize duration and memory from REPORT lines in five-minute bins.",
    "Pairs propose one metric filter and alarm that would have caught the incident earlier, then present their root cause to another pair, who must agree or challenge it using the evidence."
   ]
  },
  "discussion": [
   "Why does writing structured JSON logs make investigations faster, and what fields would you always include?",
   "How should a team decide on log retention periods, balancing cost, compliance and the need to investigate past incidents?"
  ],
  "exit": [
   [
    "How do you alarm on a specific error message that appears only in logs?",
    "Create a metric filter on the log group matching the message, then a CloudWatch alarm on the resulting metric."
   ],
   [
    "Which Lambda log line shows duration, max memory used and cold start init duration?",
    "The REPORT line written at the end of each invocation."
   ],
   [
    "Write a Logs Insights query that shows the 20 most recent log lines containing ERROR.",
    "fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc | limit 20"
   ]
  ],
  "differentiation": [
   "Support: Provide a query template card with the pipe commands listed and blanks to fill, and a labeled sample REPORT line, so students can focus on choosing filters rather than syntax.",
   "Extend: Ask fast finishers to design a one-screen dashboard for the checkout service, choosing six widgets with metric names, statistics and periods, and justify each choice."
  ]
 },
 {
  "t": "Common Lambda errors: throttling (429), timeouts, AccessDenied from the execution role, malformed proxy responses (502), API Gateway 504 integration timeouts",
  "objectives": [
   "Students will be able to match the errors 429, 502, 504, Task timed out and AccessDenied to their most likely cause in a Lambda and API Gateway application.",
   "Students will be able to distinguish Lambda throttling from API Gateway throttling using the Throttles metric.",
   "Students will be able to explain why raising a Lambda timeout does not fix an API Gateway 504 and propose an asynchronous design.",
   "Students will be able to correct a malformed Lambda proxy response and identify the missing permission in an AccessDenied message."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the three error codes 429, 502 and 504 and ask pairs to guess what each one means for an API. Collect guesses on the whiteboard without correcting them yet."
   ],
   [
    12,
    "Teach",
    "Walk through each error in turn: cause, evidence (metric or log line) and fix. Emphasize the 29-second integration timeout versus the Lambda timeout, the proxy response shape, and that AccessDenied messages name the missing action and resource. Return to the warm-up guesses and correct them."
   ],
   [
    18,
    "Activity",
    "Run the error triage card sort described below. Groups match symptom cards to cause and fix cards, then present one tricky card to the class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare when synchronous APIs should become asynchronous, and how to tell Lambda throttling from API Gateway throttling."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "Your app shows users a 504 error after exactly 29 seconds, but the Lambda logs show the function finished successfully after 45 seconds. What do you think happened?",
  "activity": {
   "title": "Error triage card sort",
   "materials": "Printed cards in three colors (symptom, cause, fix), whiteboard, tape or sticky notes.",
   "steps": [
    "Before class, print about ten symptom cards (for example 'Clients get 429, Lambda Throttles metric is zero', 'Log shows Task timed out after 3.00 seconds', 'API Gateway log shows Malformed Lambda proxy response', 'Message names assumed-role and dynamodb:PutItem', 'No logs at all in CloudWatch'), with matching cause and fix cards.",
    "In groups of three or four, students shuffle and match each symptom to one cause and one fix, taping the sets on the whiteboard in rows.",
    "Each group adds one sticky note per row naming the evidence they would check first (a metric, a log line or a policy).",
    "The teacher reviews the rows, asks one group to defend its hardest match, and highlights the API Gateway 429 versus Lambda 429 and 500-invoke-permission versus 502-bad-shape distinctions."
   ]
  },
  "discussion": [
   "When should a team stop trying to make a slow synchronous API faster and redesign it to return 202 with a job ID?",
   "Why might reserving concurrency for one critical function help other parts of the system stay healthy, and what could it hurt?"
  ],
  "exit": [
   [
    "A Lambda proxy function returns {\"statusCode\": 200, \"body\": {\"ok\": true}} and clients get 502. Why?",
    "The body must be a string; it should be serialized with JSON.stringify or json.dumps, otherwise API Gateway reports a malformed proxy response."
   ],
   [
    "Clients see 504 after 29 seconds. The Lambda timeout is 5 minutes. What is the recommended fix?",
    "Make the work asynchronous: queue it (SQS or Step Functions), return 202 with a job ID, and let the client poll or get a callback."
   ],
   [
    "How can you tell whether a 429 comes from Lambda or from API Gateway?",
    "Check the Lambda Throttles metric; if it is not rising, the throttling comes from API Gateway stage, method or usage plan limits."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page cheat sheet with the five errors in a table (code, where you see it, cause, fix) and let them use it during the card sort.",
   "Extend: Ask fast finishers to sketch the asynchronous version of a slow report API on the whiteboard, naming each service, the 202 response and how the client learns the job is done."
  ]
 },
 {
  "t": "AWS X-Ray: segments, subsegments, annotations vs metadata, sampling, active tracing, the X-Ray daemon/CloudWatch agent",
  "objectives": [
   "Students will be able to describe the relationship between traces, segments and subsegments in AWS X-Ray.",
   "Students will be able to choose between annotations and metadata for a given piece of trace data and justify the choice.",
   "Students will be able to explain the default sampling rule and when to create a custom sampling rule.",
   "Students will be able to list the steps needed to send traces from Lambda and from EC2 or ECS, including the daemon on UDP port 2000 and IAM permissions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and have students sketch on paper how they would find which step of a five-service request was slow."
   ],
   [
    12,
    "Teach",
    "Project a simple service map drawing and a trace timeline. Define trace, segment and subsegment, then annotations versus metadata, then sampling. Finish with the two data paths: Lambda active tracing versus SDK to daemon on UDP 2000 on EC2 and ECS."
   ],
   [
    18,
    "Activity",
    "Run the 'human trace' role-play below, then have groups decide which fields become annotations and which become metadata."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore sampling trade-offs and what to label."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "A request passes through an API, two functions, a database and a partner API, and takes nine seconds. Without any tracing tool, how would you work out which step took the longest?",
  "activity": {
   "title": "Human trace role-play",
   "materials": "Sticky notes in two colors, a whiteboard, a timer or phone stopwatch, printed role cards (API Gateway, Order function, DynamoDB, Payment partner, X-Ray daemon).",
   "steps": [
    "Assign five students the role cards and line them up. A 'request' (a folded paper with a trace ID written on it) is passed down the line.",
    "Each service student writes a segment on a sticky note when they receive and pass on the paper: service name, start and end time from the timer, and any error. The Order function student also writes subsegments for 'DynamoDB call' and 'Payment call'.",
    "The X-Ray daemon student collects the notes and arranges them on the whiteboard as a timeline, showing which bar was longest.",
    "In small groups, students receive a list of fields (customer ID, full order JSON, customer tier, stack trace, region) and sort them onto annotation or metadata sticky notes, then defend one choice to the class.",
    "Close by asking what would happen if the daemon student left the room, linking to missing traces on EC2 and ECS."
   ]
  },
  "discussion": [
   "What do you lose and gain by tracing only one request per second plus five percent, rather than every request?",
   "Which business values in an application you know would be worth indexing as annotations, and which would just add noise?"
  ],
  "exit": [
   [
    "You need to find all traces for orders from customer C-77. Annotation or metadata?",
    "Annotation, because only annotations are indexed and usable in filter expressions."
   ],
   [
    "Name two things required to send traces from a Lambda function.",
    "Active tracing enabled on the function, and execution role permissions such as xray:PutTraceSegments and xray:PutTelemetryRecords."
   ],
   [
    "An EC2 application uses the X-Ray SDK but no traces appear. Name two things to check.",
    "That the X-Ray daemon or CloudWatch agent is running and listening on UDP port 2000, and that the instance role has X-Ray write permissions."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of a trace with one segment and two subsegments, and a two-column table of annotation versus metadata properties, for students to annotate during the lesson.",
   "Extend: Ask fast finishers to write two X-Ray filter expressions (one using an annotation, one using response time) and design a custom sampling rule for a high-volume health-check path."
  ]
 },
 {
  "t": "Custom metrics: PutMetricData, CloudWatch embedded metric format, high-resolution metrics",
  "objectives": [
   "Students will be able to identify a CloudWatch metric by its namespace, name and dimensions and explain why high-cardinality dimensions are a problem.",
   "Students will be able to compare PutMetricData and the embedded metric format and choose the right one for a Lambda workload.",
   "Students will be able to explain when high-resolution metrics are needed and which alarm periods they allow.",
   "Students will be able to read an EMF log line and say which fields become metrics and dimensions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for business metrics on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Explain namespace, metric name, dimensions and units. Show the PutMetricData CLI example, then the EMF JSON example, and compare them on latency, throttling and context. Cover high-resolution metrics and the CloudWatch agent for EC2 memory."
   ],
   [
    18,
    "Activity",
    "Run the 'metric or log field' design exercise below in pairs, ending with each pair writing one EMF line on the board."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh cost against visibility."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you ran an online bookstore, what three numbers would you want on a dashboard that AWS could not measure for you automatically?",
  "activity": {
   "title": "Metric or log field: design an EMF line",
   "materials": "Projector showing the EMF example, printed scenario cards, whiteboard markers, student laptops with a browser-based JSON validator or plain text editor.",
   "steps": [
    "Give each pair a scenario card, such as 'food delivery app: delivery time, restaurant (200 restaurants), driver ID, city (12 cities), order ID'.",
    "Pairs sort each field into metric, dimension or plain log field, and write one sentence justifying each dimension's cardinality.",
    "Pairs write an EMF JSON line for their scenario and check it parses in a JSON validator or by careful review.",
    "Two pairs present; the class checks that no unbounded value became a dimension and that the namespace does not start with AWS/.",
    "Finish by asking each pair whether any of their metrics need high resolution, and why."
   ]
  },
  "discussion": [
   "How would you explain to a manager why per-customer metrics are a bad idea in CloudWatch, but per-customer log searches are fine?",
   "What kinds of decisions in a business genuinely need second-level metric data, and which are fine at one minute?"
  ],
  "exit": [
   [
    "Which field in the EMF line tells CloudWatch which values are metrics?",
    "The _aws object, specifically its CloudWatchMetrics array listing the namespace, dimensions and metric names."
   ],
   [
    "A team wants a 10-second alarm period. What must be true of the metric?",
    "It must be a high-resolution metric published with StorageResolution set to 1."
   ],
   [
    "How do you get EC2 memory utilization into CloudWatch?",
    "Install and configure the CloudWatch agent on the instance, which publishes memory as a custom metric."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed EMF template with blanks for namespace, dimension and metric name, and a short list of good and bad dimension examples.",
   "Extend: Ask fast finishers to design a statistic set PutMetricData call that summarizes 500 latency observations, and explain how it reduces API calls compared with sending each value."
  ]
 },
 {
  "t": "CloudWatch alarms with SNS notifications; structured logging and correlation IDs",
  "objectives": [
   "Students will be able to configure the parts of a CloudWatch metric alarm, including period, threshold, datapoints to alarm and missing data treatment.",
   "Students will be able to explain how alarms notify people through SNS and diagnose two common reasons notifications fail.",
   "Students will be able to compare free-text and structured JSON logs for investigation.",
   "Students will be able to design how a correlation ID is generated, propagated and logged across API Gateway, Lambda, SQS and EventBridge."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and have students list on sticky notes every reason an alert might not reach a person."
   ],
   [
    12,
    "Teach",
    "Walk through the put-metric-alarm example parameter by parameter. Cover alarm states, M of N, missing data, anomaly detection and composite alarms, then SNS delivery and the confirmation and KMS pitfalls. Switch to structured logs and correlation IDs with a before-and-after log excerpt."
   ],
   [
    18,
    "Activity",
    "Run the 'follow the order' log investigation described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to talk about alert fatigue and logging standards."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "An alarm went into ALARM state on Saturday night, but nobody received an email. List every reason you can think of why the alert might not have reached anyone.",
  "activity": {
   "title": "Follow the order: log investigation",
   "materials": "Printed log excerpts from three fictional services (one set as free text, one set as JSON with correlationId), highlighters, whiteboard.",
   "steps": [
    "Prepare two handouts with about 30 log lines each from an API function, an SQS consumer and a shipping function, mixing several orders. Version A is free text with no IDs; version B is structured JSON with timestamp, level, service, orderId and correlationId.",
    "Give half the groups version A and half version B. Each group must find where order o-552 failed and write the time and service on the whiteboard. Time each group.",
    "Swap handouts and repeat with a different order so every student experiences both versions.",
    "As a class, compare times and list which fields made the search possible, then decide where the correlation ID must be copied (HTTP header, SQS message attribute) for the chain to stay unbroken."
   ]
  },
  "discussion": [
   "How many alerts per week can an on-call engineer receive before they start ignoring them, and which alarm features help prevent that?",
   "If you were writing a logging standard for your team, which fields would you make mandatory on every log line, and why?"
  ],
  "exit": [
   [
    "An alarm should fire only when at least 3 of the last 5 one-minute periods breach. Which settings achieve this?",
    "Period 60 seconds, evaluation periods 5, datapoints to alarm 3."
   ],
   [
    "An SNS email subscriber never receives alarm notifications. Give one likely cause.",
    "The email subscription was never confirmed (or the topic's KMS key policy does not allow CloudWatch to use the key)."
   ],
   [
    "Where should a correlation ID be placed when a Lambda function sends a message to SQS?",
    "In a message attribute (or the message body), so the consumer can read it and include it in its own logs."
   ]
  ],
  "differentiation": [
   "Support: Give students a labeled diagram of the alarm flow (metric, alarm, SNS topic, subscribers) and a template JSON log line to copy fields from during the activity.",
   "Extend: Ask fast finishers to write a CloudWatch Logs Insights query that filters by correlationId across log groups and sorts by timestamp, and to design a composite alarm rule for error rate AND latency."
  ]
 },
 {
  "t": "Lambda performance: memory/CPU tuning, cold starts, provisioned concurrency, reserved concurrency",
  "objectives": [
   "Students will be able to explain how Lambda memory settings affect CPU, duration and cost.",
   "Students will be able to identify what causes a cold start and list at least three ways to reduce it.",
   "Students will be able to compare provisioned concurrency and reserved concurrency in purpose, cost and configuration.",
   "Students will be able to choose the right setting for a scenario involving latency spikes or downstream protection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the 9:00 latency spike and collect hypotheses."
   ],
   [
    12,
    "Teach",
    "Show a sample REPORT log line and point out Duration, Max Memory Used and Init Duration. Explain memory to CPU scaling and the memory times duration billing, then cold starts and mitigations, then provisioned versus reserved concurrency side by side on the whiteboard."
   ],
   [
    18,
    "Activity",
    "Run the 'knob or not' scenario sort and the memory cost calculation described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore cost trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "An app is slow only for the first few seconds after traffic jumps each morning, then fast all day. What do you think is happening inside Lambda?",
  "activity": {
   "title": "Knob or not: scenario sort and cost math",
   "materials": "Printed scenario cards, whiteboard divided into four columns (Memory, Cold start fixes, Provisioned concurrency, Reserved concurrency), calculators or student laptops.",
   "steps": [
    "Give each group eight scenario cards, such as 'CPU-heavy PDF rendering is slow', 'Interactive API has p99 spikes after deployments', 'Nightly job overwhelms the database', 'Critical payments function is throttled when other functions are busy'.",
    "Groups tape each card under the column with the right lever, writing on the card why the other levers would not work.",
    "Next, give groups a table with two test runs of the same function (for example 512 MB taking 4 seconds and 1,024 MB taking 1.8 seconds). Groups compute memory times duration in GB-seconds for each and decide which is cheaper and faster.",
    "Review answers as a class, focusing on any card where groups disagreed."
   ]
  },
  "discussion": [
   "Provisioned concurrency costs money even when idle. How would you decide how much to provision and when?",
   "What risks come with setting reserved concurrency too low on an important function?"
  ],
  "exit": [
   [
    "A latency-sensitive API suffers cold starts during morning ramp-up. Which feature removes them, and where is it configured?",
    "Provisioned concurrency, on a published version or alias, often scaled on a schedule with Application Auto Scaling."
   ],
   [
    "What does reserved concurrency do besides guaranteeing capacity?",
    "It caps the function's maximum concurrency; invocations above it are throttled."
   ],
   [
    "Why can raising memory make a CPU-bound function cheaper?",
    "Memory brings proportional CPU, so duration drops; because cost is memory times duration, the total can stay the same or fall."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison chart of provisioned versus reserved concurrency (purpose, cost, configured on, effect on cold starts, effect on throttling) for students to fill in during the teach segment.",
   "Extend: Ask fast finishers to design a full plan for the banking API: scheduled provisioned concurrency values, reserved concurrency for the reporting function, and where RDS Proxy fits, then explain the expected effect on the REPORT log lines."
  ]
 },
 {
  "t": "Stream and queue troubleshooting: Kinesis IteratorAge, parallelization factor, SQS dead-letter queues and redrive",
  "objectives": [
   "Students will be able to interpret IteratorAge, ApproximateNumberOfMessagesVisible and ApproximateAgeOfOldestMessage to diagnose a lagging consumer.",
   "Students will be able to choose between error-handling settings (bisect, retry limits, partial batch responses) and throughput settings (parallelization factor, shards, enhanced fan-out) for a stalled stream.",
   "Students will be able to configure an SQS redrive policy and explain DLQ requirements for type, account, Region and retention.",
   "Students will be able to describe how to reprocess messages with DLQ redrive after a fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show two hand-drawn graphs on the whiteboard, one flat IteratorAge and one rising, and ask students what each might mean."
   ],
   [
    12,
    "Teach",
    "Explain IteratorAge and retention risk, then the two families of causes: blocked shards (errors) and slow consumers (parallelism). Cover producer hot shards briefly. Switch to SQS metrics, the visibility timeout rule, DLQ redrive policy and redrive back to source."
   ],
   [
    18,
    "Activity",
    "Run the 'conveyor belt' simulation and diagnosis cards described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about ordering and alerting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "A graph of a stream consumer's IteratorAge rises in a straight line all afternoon. What could be happening, and what is the risk if nobody acts?",
  "activity": {
   "title": "Conveyor belt simulation and diagnosis",
   "materials": "Index cards numbered and labeled with partition keys (for example A, B, C), one card marked 'poison', a timer, whiteboard, printed diagnosis cards.",
   "steps": [
    "Line up a 'shard' of 20 numbered cards on a desk. One student is the Lambda consumer and processes one batch of 4 cards every 10 seconds while the teacher adds 4 new cards every 5 seconds. Another student records the age of the oldest card each round on the whiteboard to plot iterator age.",
    "Insert the poison card. The consumer must retry the batch containing it every round. The class watches the age climb, then applies 'bisect' by splitting the batch until the poison card is isolated and set aside in an 'on-failure destination' pile.",
    "Raise the parallelization factor to 3 by adding two more consumer students, with the rule that all cards with the same partition key go to the same student. The class observes order is preserved per key and age falls.",
    "In groups, students work through printed diagnosis cards (for example 'messages processed twice', 'DLQ messages expire quickly', 'WriteProvisionedThroughputExceeded on one shard') and write the fix for each."
   ]
  },
  "discussion": [
   "Why might a team prefer to skip a bad record and send it to an on-failure destination rather than retry it until it succeeds?",
   "Who should be notified when a DLQ receives its first message, and how quickly?"
  ],
  "exit": [
   [
    "IteratorAge is rising, there are no errors, and duration is high. Name one fix.",
    "Raise the parallelization factor (up to 10), add shards, increase memory or optimize the function."
   ],
   [
    "Messages from an SQS queue are being processed twice by a Lambda consumer. What setting should you check?",
    "The queue's visibility timeout, which should be well above the function timeout (AWS recommends at least six times)."
   ],
   [
    "Which setting in the redrive policy decides when a message moves to the DLQ?",
    "maxReceiveCount: after a message is received more than that many times without being deleted, it moves to the DLQ."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart that starts at 'IteratorAge rising' and branches on 'Errors present?' to the error-handling fixes or the throughput fixes, to use during the diagnosis cards.",
   "Extend: Ask fast finishers to write a complete event source mapping configuration (batch size, parallelization factor, bisect, maximum retry attempts, maximum record age, on-failure destination) for the bus-tracking stream and justify each value qualitatively."
  ]
 },
 {
  "t": "DynamoDB optimization: hot partitions, key design, on-demand vs provisioned capacity, adaptive capacity",
  "objectives": [
   "Students will be able to explain why per-partition throughput limits cause throttling even when total table capacity is underused.",
   "Students will be able to evaluate partition key choices for cardinality and access distribution and propose write sharding where needed.",
   "Students will be able to compare on-demand and provisioned capacity modes and select one for a described workload.",
   "Students will be able to describe what burst and adaptive capacity can and cannot fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up puzzle and let pairs propose explanations."
   ],
   [
    12,
    "Teach",
    "Draw a table split into partitions on the whiteboard and show hashing by partition key. State the per-partition limits, show the hot partition symptom pattern, then key design, write sharding, caching and Query versus Scan. Finish with capacity modes, GSI capacity, and burst and adaptive capacity limits."
   ],
   [
    18,
    "Activity",
    "Run the 'pigeonhole' key design exercise below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare cost and complexity trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A table is provisioned for 10,000 writes per second, uses only 3,000, and still throttles writes at noon. How can that happen?",
  "activity": {
   "title": "Pigeonhole key design",
   "materials": "Whiteboard drawn with ten numbered boxes (partitions), sticky notes, printed dataset cards describing workloads, a die or a phone random number generator.",
   "steps": [
    "Give each group a workload card, such as 'IoT readings: deviceId, timestamp, date, region (3 regions), reading'.",
    "Groups first try the worst key (for example region). For each of 30 sticky-note 'writes', they place the note in the box chosen by a simple rule the teacher gives (for example the same box for the same value), and observe how many boxes overflow past a limit of 5 notes.",
    "Groups then try a high-cardinality key (deviceId) and a sharded key (date plus a suffix from a die roll), placing notes again and counting overflow.",
    "Each group writes on the board the key they would choose, the read pattern it supports, and whether they need a GSI or sharded reads to answer a daily report.",
    "Close by asking each group which capacity mode they would choose for their workload card and why."
   ]
  },
  "discussion": [
   "Write sharding makes reads more complex. When is that trade-off worth it, and when would caching or a different key be better?",
   "Why might a team start on on-demand and later move to provisioned capacity, and what would they need to know first?"
  ],
  "exit": [
   [
    "What are the per-partition throughput limits in DynamoDB?",
    "Up to 3,000 RCUs and 1,000 WCUs per second per partition."
   ],
   [
    "A table throttles with low overall consumed capacity. What is the likely cause, and one fix?",
    "A hot partition; fix by choosing a higher-cardinality partition key, write sharding, or caching hot reads."
   ],
   [
    "Can adaptive capacity fix a single key that receives more traffic than one partition can handle?",
    "No; it redistributes throughput and can isolate hot items, but one key cannot exceed a partition's maximum, so key design or caching is needed."
   ]
  ],
  "differentiation": [
   "Support: Provide a short checklist for evaluating a partition key (How many distinct values? Is access even? Does it support the main query?) and a worked example of a good and a bad key.",
   "Extend: Ask fast finishers to design a calculated-suffix sharding scheme for a daily events table, explaining how to compute the suffix on write and how to read one specific item without querying every shard."
  ]
 },
 {
  "t": "Caching for performance: API Gateway stage caching, CloudFront, ElastiCache, DAX",
  "objectives": [
   "Students will be able to describe where each of API Gateway caching, CloudFront, ElastiCache and DAX sits in an application architecture.",
   "Students will be able to select the appropriate cache for a scenario based on data source, user location and access pattern.",
   "Students will be able to explain how cache keys and TTLs affect correctness and freshness, including the API Gateway defaults of 300 and 3,600 seconds.",
   "Students will be able to state the DAX limitation for strongly consistent reads and the permission needed to invalidate an API Gateway cache entry."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about everyday caches on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw a request path from user to CloudFront to API Gateway to Lambda to ElastiCache, RDS, DAX and DynamoDB. Explain each cache, its cache key and TTL controls, and its main limitation. Emphasize the API Gateway cache key bug and the DAX strongly consistent read pass-through."
   ],
   [
    18,
    "Activity",
    "Run the 'place the cache' whiteboard design challenge below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about freshness and cost."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "Where do you see caching in everyday life, such as a browser, a phone or a coffee shop, and what goes wrong when the cached copy is out of date?",
  "activity": {
   "title": "Place the cache: architecture design challenge",
   "materials": "Whiteboard with a blank architecture diagram (user, edge, API, function, databases), printed cache cards (API Gateway cache, CloudFront, ElastiCache, DAX), printed scenario cards, markers.",
   "steps": [
    "Give each group three scenario cards, for example 'global users load the same product images', 'same GET /prices?region=eu called thousands of times a minute', 'expensive SQL join repeated hourly', 'microsecond reads of hot DynamoDB items, eventually consistent'.",
    "Groups tape the correct cache card onto the diagram for each scenario and write the cache key and a sensible TTL beside it.",
    "The teacher adds a twist card to each group, such as 'the app switches to strongly consistent reads' or 'responses vary by Accept-Language header', and groups adjust their design.",
    "Each group presents one scenario and its twist, and the class checks whether the cache key and freshness choices would return correct data."
   ]
  },
  "discussion": [
   "For a banking app, which data could safely be cached for five minutes and which should never be cached?",
   "How would you decide whether a cache is worth its cost, and which metrics would you watch to find out?"
  ],
  "exit": [
   [
    "What are the default and maximum TTLs for API Gateway stage caching?",
    "300 seconds by default, up to 3,600 seconds; 0 disables caching."
   ],
   [
    "An application reads hot items from a relational database and also from DynamoDB with eventually consistent reads. Which caches fit each?",
    "ElastiCache for the relational database results, and DAX for the DynamoDB reads."
   ],
   [
    "Users of different categories get the same API response after caching is enabled. What went wrong?",
    "The category query string parameter is not part of the cache key, so different requests match the same cached entry."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision table with four rows (one per cache) and columns for 'where it sits', 'what data', 'code change needed' and 'main limitation', partly filled in, to complete during the lesson.",
   "Extend: Ask fast finishers to design a layered caching plan combining CloudFront, API Gateway caching and DAX for one application, and to explain how a product price update would propagate through each layer and how long stale data could survive."
  ]
 }
]);
