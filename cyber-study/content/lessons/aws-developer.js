/* Lessons for AWS Certified Developer – Associate (DVA-C02): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("aws-developer", [
 {
  "t": "Architectural patterns: event-driven, microservices, fan-out, choreography vs orchestration, loosely coupled and stateless designs",
  "hook": "It is Black Friday morning at Larkspur Outfitters, and Dev, the only developer on call, watches the checkout dashboard turn red. The email provider the shop uses for receipts is down, and because the checkout function calls it directly and waits, every order is now failing. Customers are adding items to carts and then giving up. Payment and shipping are perfectly healthy, yet they are stuck behind one slow dependency that has nothing to do with taking money. Dev's manager asks the obvious question: why does a broken receipt email stop the whole store from selling anything, and how do we make sure it never happens again?",
  "simple": "Imagine a restaurant where the waiter takes your order and then stands in the kitchen until the chef, the dessert cook and the dishwasher are all finished before serving the next table. One slow person stops everything. Better restaurants pin the order ticket on a rail and move on; each station picks up the ticket when ready. That is loose coupling: parts of a program pass notes through something in between, such as a queue (a waiting line for messages), instead of waiting on each other. Event-driven means parts announce what happened, like order placed, and whoever cares reacts. Stateless means a worker does not keep your details in its head, so any worker can serve you because the details are written down in a shared place.",
  "body": [
   "Coupling is the idea underneath almost every architecture question on the AWS Certified Developer – Associate (DVA-C02) exam. Most scenarios describe an application built from small pieces that talk to each other and ask which design keeps it reliable and easy to change. Coupling measures how much one component needs to know about, and wait for, another. A tightly coupled system breaks as a whole when one part is slow or down, because callers block on it. A loosely coupled system puts something in between, such as a queue, a topic, an event bus or a stable API contract, so each part can fail, scale and be deployed on its own. When you read an exam scenario, ask first: if this component disappears for ten minutes, what else stops?",
   "Event-driven architecture is the most common way to loosen coupling. Instead of calling each other directly, components announce that something happened, such as an order being placed or a file being uploaded. The producer emits an event and moves on; any number of consumers react to it, and the producer does not need to know who they are. On AWS the usual carriers are Amazon Simple Queue Service (SQS) for work queues, Amazon Simple Notification Service (SNS) for publish/subscribe, Amazon EventBridge for routing events by their content, and Amazon Kinesis Data Streams for ordered, high-volume streams. Many AWS services can also emit events themselves: an object landing in Amazon S3 or an item changing in an Amazon DynamoDB table can trigger an AWS Lambda function directly, with no polling code of your own.",
   "Microservices apply the same thinking to the whole application. You split it into small services, each owning one business capability and its own data store, deployed independently and reached only through its API or its events. The payoff is that the inventory team can release on Tuesday without coordinating with the payments team, and the busy search service can scale out while the quiet account service stays small. The cost is real: more network calls, more things to monitor, and the need to handle partial failure when one service is down while others are up. A common exam distractor is a design where two services share one database table. It looks efficient, but a schema change for one service now breaks the other, which quietly couples them again.",
   "Fan-out means one message is delivered to many consumers in parallel. The classic AWS pattern is SNS to multiple SQS queues. A producer publishes once to a topic, and each subscribed queue gets its own copy of the message. An email service, an analytics service and an inventory service then each pull from their own queue at their own pace. If the email service is slow or offline, its messages simply wait in its queue, while the other two keep working, and nothing is lost when it comes back. This is better than SNS pushing straight to each service, because the queue is a buffer that absorbs outages and bursts. EventBridge rules with several targets achieve a similar result and add content-based filtering, so a rule can send only events whose detail matches a pattern to a given target.",
   "Choreography and orchestration are two ways to coordinate a multi-step business process such as take payment, reserve stock, then ship. In choreography there is no central controller. Each service listens for events and emits new ones, like dancers who each know their own part of the routine. The payment service hears OrderPlaced and later emits PaymentTaken; the warehouse hears PaymentTaken and emits Shipped. It is very loosely coupled, and services can evolve independently, but the overall flow lives nowhere in particular, so it is hard to see, test and debug when an order gets stuck halfway.",
   "In orchestration, one coordinator calls each step in turn, tracks state, and handles retries and compensation. On AWS the coordinator is typically AWS Step Functions, whose console shows each execution as a diagram with the failed step highlighted. Choose orchestration when the process needs visibility, strict ordering, error handling with compensating actions such as a refund when shipping fails, or a human approval step. Choose choreography when services should simply react to events and you value independence over a single picture of the flow. Exam wording such as visual workflow, track the state of each order or roll back earlier steps points toward Step Functions.",
   "Stateless design is what lets all of this scale out. A stateless compute unit keeps no session or user data in its own memory or local disk between requests, so any Amazon EC2 instance, container or Lambda execution environment can serve any request and can be replaced at any moment without losing anything. State lives in an external store such as DynamoDB, Amazon ElastiCache or S3. Warning signs of a stateful design include sticky sessions on a load balancer, a shopping cart held in a server variable, or data kept only in a Lambda function's `/tmp` directory. Each of these breaks when the instance is terminated or when a second instance receives the user's next request.",
   "Putting it together, the exam usually rewards the design that buffers between components, lets each scale independently, and keeps state outside compute. Read the clues: one event, several independent reactions, slow consumers must not block others, which suggests SNS fan-out into SQS or EventBridge with multiple targets. An ordered business process with retries, compensation and visibility suggests Step Functions. Any instance can handle any request suggests externalized session state in DynamoDB or ElastiCache."
  ],
  "analogy": "A loosely coupled system works like the order rail in a busy diner kitchen. The server clips a ticket to the rail and goes back to the floor; the grill, the fryer and the dessert station each pull the ticket when they are ready, and a slow dessert station never stops burgers from going out. Fan-out is the server printing three copies of the ticket, one per station. The analogy stops working in one way that matters: a real ticket can be lost, while an SQS queue keeps each message durably until a consumer deletes it.",
  "terms": [
   [
    "Loose coupling",
    "Designing components so they interact through an intermediary or stable contract, letting each fail, scale and deploy independently."
   ],
   [
    "Fan-out",
    "Delivering one published message to many subscribers in parallel, for example an SNS topic with several SQS queue subscriptions."
   ],
   [
    "Choreography",
    "Coordination where each service reacts to events and emits new ones with no central controller."
   ],
   [
    "Orchestration",
    "Coordination where a central workflow engine, such as Step Functions, invokes each step and manages state and errors."
   ],
   [
    "Stateless service",
    "A service that keeps no client state between requests, storing it externally so any instance can handle any request."
   ],
   [
    "Event-driven architecture",
    "A design in which components emit events about things that happened and other components react, rather than calling each other directly."
   ],
   [
    "Microservice",
    "A small, independently deployable service that owns one business capability and its own data, reached through an API or events."
   ]
  ],
  "example": "An online shop's checkout Lambda function publishes an OrderPlaced message to an SNS topic. Three SQS queues subscribe: one feeds the payment service, one the warehouse service and one the email service. When the email provider has an outage, messages simply wait in its queue while payments and shipping continue normally.",
  "mistakes": [
   [
    "Having SNS invoke each downstream service directly is just as resilient as SNS to SQS fan-out.",
    "Without a queue in between there is no buffer, so a slow or failed consumer can miss or delay work. Subscribing an SQS queue per consumer lets each one catch up at its own pace."
   ],
   [
    "Microservices that share one database table are still loosely coupled because they deploy separately.",
    "Sharing a table couples them through the schema and data. Each microservice should own its data and expose it only through an API or events."
   ],
   [
    "Choreography is always better because it is more decoupled.",
    "Choreography hides the overall flow, which makes ordering, retries and compensation hard. When a process needs visibility, error handling or human approval, orchestration with Step Functions is the better answer."
   ],
   [
    "Keeping session data in instance memory with sticky sessions makes an application stateless enough to scale.",
    "Sticky sessions are a symptom of state on the instance. If the instance is replaced, the session is lost. Store session data in DynamoDB or ElastiCache instead."
   ]
  ],
  "tryit": [
   [
    "Rivermint Pharmacy's prescription service must, after each new prescription, notify the patient by SMS, update a reporting database and alert the pharmacist's tablet app. The reporting database is sometimes slow during nightly maintenance, and the team does not want that to delay patient notifications. Which design fits best?",
    "Publish one message per prescription to an SNS topic and subscribe a separate SQS queue for each of the three consumers. Each consumer processes at its own pace, and when the reporting database is slow, its messages wait in its queue without delaying SMS or tablet alerts. A single Lambda function that calls all three in sequence would couple them."
   ],
   [
    "A loan application process at Brookfield Lending checks credit, waits up to three days for an underwriter's approval, then either funds the loan or sends a decline letter. Auditors want to see exactly which step each application is on. Choreography or orchestration?",
    "Orchestration with an AWS Step Functions Standard workflow. It keeps a visible execution history per application, supports a long human approval wait, and centralizes branching and error handling, none of which choreography provides on its own."
   ]
  ],
  "tip": "When a question says one event must trigger several independent processes and a slow consumer must not affect the others, look for SNS fan-out to SQS queues (or EventBridge with multiple targets). When it stresses a visible, ordered workflow with error handling, pick Step Functions orchestration.",
  "check": [
   [
    "Why is SNS publishing to several SQS queues more resilient than SNS invoking several services directly?",
    "Each queue buffers messages for its consumer, so a slow or failed consumer can catch up later without losing messages or delaying other consumers."
   ],
   [
    "When would you choose orchestration over choreography?",
    "When the process needs a central view of state, strict ordering, retries or compensation for failed steps, or human approval, which a Step Functions state machine provides."
   ],
   [
    "What makes a web tier stateless?",
    "It stores session and user data in an external store such as DynamoDB or ElastiCache instead of instance memory or local disk, so any instance can serve any request."
   ],
   [
    "Two services exchange data by reading and writing the same DynamoDB table. What is the design problem?",
    "They are coupled through shared data, so a change by one can break the other; each microservice should own its data and share it through an API or events."
   ]
  ]
 },
 {
  "t": "Resilient code: retries with exponential backoff and jitter, idempotency, timeouts, handling partial failures and dead-letter queues",
  "hook": "At 2:14 a.m. your phone buzzes. Northgate Utilities' billing queue has stopped moving, and the payment provider's dashboard shows a wall of throttling errors. Your teammate Priya pulls up the logs: thousands of Lambda invocations retried the same call at exactly the same instant, every few milliseconds, and one malformed message has been failing and reappearing in the queue for hours. Worse, a handful of customers were charged twice when a retry succeeded after the first attempt had quietly gone through. By morning you need to explain three things to your manager: why retrying made it worse, why customers were double charged, and why one bad message could jam everything.",
  "simple": "Things on a network fail for a moment all the time, like a phone call that drops. Resilient code handles that calmly. If a call fails because the other side is busy, wait a little and try again, and wait longer each time; that is backoff. Add a bit of random waiting, called jitter, so everyone does not redial at the same second. Make actions safe to repeat, which is idempotency: pressing an elevator button twice still calls one elevator. Give every call a time limit so you do not wait forever. And if one message keeps failing no matter what, set it aside in a special holding area called a dead-letter queue so a person can look at it later while everything else keeps moving.",
  "body": [
   "Distributed systems fail in small ways all the time. A request is throttled because a service is protecting itself, a network call times out, or a downstream service briefly returns an error while it scales. Resilient code expects this and responds in a measured way instead of crashing or making things worse. The AWS Certified Developer – Associate (DVA-C02) exam tests whether you know the standard techniques, which failure each one fixes, and the AWS features that implement them.",
   "Retries are the first tool, but only for transient errors. Good candidates are throttling (`ThrottlingException`, `ProvisionedThroughputExceededException`, HTTP 429), HTTP 5xx server errors and network timeouts, because the same request may well succeed a moment later. Retrying a validation error, a malformed request or an `AccessDenied` just repeats the failure and wastes time, since nothing about the request has changed. Retrying immediately in a tight loop is actively harmful: every client hammers the struggling service at once, which keeps it overloaded.",
   "Exponential backoff solves the tight-loop problem by waiting longer after each failed attempt, for example 100 milliseconds (ms), then 200 ms, 400 ms and 800 ms, up to a maximum delay and a maximum number of attempts. Jitter adds randomness to each wait. Without it, thousands of clients that failed at the same moment would all retry at the same moment, recreating the spike in synchronized waves. With jitter, their retries spread out over time and the service can recover. The AWS SDKs already implement retries with backoff and jitter for calls to AWS APIs; you configure the retry mode and maximum attempts rather than writing the loop yourself. For calls to your own services or third-party APIs, you add the same logic in your code or with a retry library.",
   "Idempotency is what makes retries safe. An operation is idempotent if performing it twice has the same effect as performing it once. This matters because duplicates are normal in AWS: an SDK retry may resend a request that actually succeeded, SQS standard queues deliver messages at least once, and Lambda retries failed asynchronous invocations. Your code should detect and ignore repeats. Common techniques are an idempotency key supplied by the client, such as an order ID or payment ID; a DynamoDB conditional write such as `attribute_not_exists(orderId)` that fails with `ConditionalCheckFailedException` if the item was already processed; and natural idempotency, such as setting a status to SHIPPED rather than incrementing a counter.",
   "Timeouts stop one slow dependency from consuming all your resources. Set explicit connect and read timeouts on HTTP and SDK clients, and make them shorter than your function or request timeout. That way your code gets control back in time to log the problem, retry or return a clean error, instead of being killed mid-operation with no useful log line. A Lambda function behind Amazon API Gateway, for instance, should give up on a slow downstream call well before API Gateway's own integration timeout, so the client gets a meaningful response rather than a generic gateway error.",
   "Partial failure happens when a batch contains good and bad items. If one record in a batch of ten fails and your code throws an error for the whole batch, the entire batch is retried, including the nine that already succeeded, which wastes work and can create duplicates. Batch APIs report per-item results so you can avoid this: DynamoDB `BatchWriteItem` returns `UnprocessedItems`, and SQS `SendMessageBatch` returns a list of failed entries. Your code must retry only those, ideally with backoff. For Lambda functions that read from SQS, Kinesis or DynamoDB Streams, partial batch responses let you report just the failed items so Lambda retries only them.",
   "A dead-letter queue (DLQ) is where messages go after they have failed a set number of times. Its job is to deal with a poison message, one that can never be processed successfully, perhaps because its JSON is malformed or it references a record that no longer exists. Without a DLQ, a poison message keeps returning, wasting compute and, in ordered systems, blocking everything behind it. In SQS you attach a redrive policy to the source queue with a `maxReceiveCount`; once a message has been received that many times without being deleted, SQS moves it to the DLQ. Asynchronous Lambda invocations can send failed events to an SQS queue or SNS topic configured as the function's DLQ, or to a richer on-failure destination.",
   "A DLQ is only useful if someone notices it. Create an Amazon CloudWatch alarm on the DLQ's `ApproximateNumberOfMessagesVisible` metric, investigate what lands there, fix the cause, and then redrive the messages back to the source queue. Together these techniques form a pattern the exam returns to often: retry transient errors with backoff and jitter, make handlers idempotent, bound every call with a timeout, retry only failed batch items, and catch the leftovers in a monitored DLQ."
  ],
  "analogy": "Think of a crowded coffee shop when the espresso machine jams. If every customer shouts their order again every second, the barista never recovers; that is retrying without backoff. If each customer waits a little longer each time, and some wait a few seconds more than others at random, the line recovers; that is backoff with jitter. Writing your name on the cup so a repeated order is not made twice is idempotency, and the counter where unclaimable cups go is the dead-letter queue. The analogy stops short in one way: a DLQ does not fix anything on its own, it only holds messages until you investigate.",
  "terms": [
   [
    "Exponential backoff",
    "A retry strategy where the wait between attempts grows multiplicatively, reducing pressure on a struggling service."
   ],
   [
    "Jitter",
    "Random variation added to retry delays so many clients do not retry in synchronized waves."
   ],
   [
    "Idempotency",
    "The property that repeating an operation produces the same result as doing it once, making retries and duplicate deliveries safe."
   ],
   [
    "Poison message",
    "A message that fails processing every time it is received and would loop forever without a dead-letter queue."
   ],
   [
    "Dead-letter queue (DLQ)",
    "A queue that receives messages or events that failed processing after a configured number of attempts, for later inspection."
   ],
   [
    "Idempotency key",
    "A unique value, such as an order ID, sent with a request so the receiver can detect and ignore repeats of the same operation."
   ],
   [
    "Redrive policy",
    "The SQS setting that names a dead-letter queue and the maxReceiveCount after which failed messages move to it."
   ]
  ],
  "example": "A payment Lambda function processes SQS messages. It records each payment ID in DynamoDB with a conditional put using attribute_not_exists, so a message delivered twice is charged once. Its SQS queue has a redrive policy with maxReceiveCount of 5 and a DLQ, and a CloudWatch alarm fires when the DLQ holds any messages.",
  "mistakes": [
   [
    "When an API returns throttling errors, the fix is to retry immediately and more often.",
    "Immediate retries add load to a service that is already overloaded. Use exponential backoff with jitter, and consider reducing request rate or raising capacity."
   ],
   [
    "Every error should be retried a few times just in case.",
    "Only transient errors such as throttling, 5xx and timeouts should be retried. Validation errors and AccessDenied fail the same way every time."
   ],
   [
    "If my code retries, I do not need idempotency because each retry only happens after a failure.",
    "A failure you observe may be a timeout on a request that actually succeeded, and SQS and asynchronous Lambda can deliver duplicates anyway. Idempotent handlers are required for retries to be safe."
   ],
   [
    "Configuring a DLQ fixes poison messages.",
    "A DLQ only stops them from blocking processing. You still need an alarm on its depth, an investigation of the cause and a redrive once fixed."
   ]
  ],
  "tryit": [
   [
    "Corvid Logistics uses a Lambda function to process SQS messages that each create a shipping label through a partner API. Occasionally the partner API times out after creating the label, the message is retried, and the customer receives two labels. The team wants to keep automatic retries. What should the developer change?",
    "Make the handler idempotent. Before calling the partner, record the message's shipment ID in DynamoDB with a conditional put using attribute_not_exists, and skip processing if the condition fails, or pass an idempotency key to the partner API if it supports one. Removing retries would lose real failures, so idempotency is the right fix."
   ]
  ],
  "tip": "If a question mentions throttling errors such as ProvisionedThroughputExceededException or ThrottlingException, the answer is almost always retries with exponential backoff (and jitter), not simply adding more retries or raising timeouts.",
  "check": [
   [
    "Why add jitter to exponential backoff?",
    "Without randomness, clients that failed together retry together, recreating the load spike; jitter spreads retries out over time."
   ],
   [
    "Which errors should not be retried?",
    "Client errors that will fail again unchanged, such as validation errors, malformed requests or AccessDenied; retry only transient errors like throttling, 5xx and timeouts."
   ],
   [
    "How does a DLQ help with a poison message in SQS?",
    "After the message's receive count exceeds maxReceiveCount, SQS moves it to the DLQ, so it stops being retried and blocking processing, and you can inspect it."
   ],
   [
    "A Lambda function processes a batch of ten SQS messages and one fails. How do you avoid reprocessing the nine successes?",
    "Enable partial batch responses (ReportBatchItemFailures) and return only the failed message ID, so only that message is retried."
   ]
  ]
 },
 {
  "t": "Messaging and streaming: SQS standard vs FIFO (message groups, deduplication, visibility timeout, long polling), SNS fan-out, EventBridge rules and Scheduler, Kinesis Data Streams",
  "hook": "Tomás runs the back end for Juniper Bank's mobile app, and a customer has just complained that a deposit and a withdrawal were applied in the wrong order, triggering an overdraft fee. The same week, the warehouse team says some shipment messages are processed twice by two workers, and the analytics team wants to replay yesterday's clickstream after fixing a bug. Three teams, three complaints, and every one of them uses the word queue to mean something different. Tomás opens the AWS console and sees SQS, SNS, EventBridge and Kinesis side by side. Which one fits which problem, and which settings would have prevented each complaint?",
  "simple": "Think of four ways to pass along messages. A queue (SQS) is a to-do pile: one worker takes a task, finishes it, and throws it away. A special version (FIFO, first in, first out) keeps strict order, like a deli number ticket. A topic (SNS) is a group text: one message goes to everyone who signed up. An event bus (EventBridge) is a mail room that reads each envelope and sends it to the right desk based on what is inside, and it can also send things on a timer. A stream (Kinesis) is a recording: messages are kept in order for a while, so several people can play it back from any point, even more than once.",
  "body": [
   "AWS offers several services for moving messages between components, and the AWS Certified Developer – Associate (DVA-C02) exam expects you to pick the right one from a few clues in the question: whether order matters, whether duplicates are acceptable, how many consumers need each message, whether data must be replayed, and whether routing depends on content. Learn the defining traits of each service and most questions become straightforward.",
   "Amazon Simple Queue Service (SQS) is a pull-based queue. Producers send messages and consumers poll for them; each message is processed by one consumer and then deleted. Standard queues offer very high throughput with at-least-once delivery and best-effort ordering, so you may occasionally see a duplicate or a message out of order, and your consumer should be idempotent. FIFO (first-in, first-out) queues, whose names must end in `.fifo`, guarantee order and exactly-once processing within a five-minute deduplication window, at lower throughput than standard queues.",
   "Ordering in a FIFO queue is per message group, which is the key to scaling it. Messages with the same `MessageGroupId` are delivered strictly in order, and while one message in a group is in flight, the next one in that group waits. Different groups, however, can be processed in parallel by different consumers. Using a customer or account ID as the group ID therefore keeps each customer's events in order while thousands of customers are handled at once. Deduplication uses either a `MessageDeduplicationId` you supply or content-based deduplication, which hashes the message body, so a producer that retries a send within five minutes does not create a second copy.",
   "The visibility timeout explains most duplicate-processing puzzles. When a consumer receives an SQS message, the message is not deleted; it becomes invisible to other consumers for the visibility timeout, 30 seconds by default. The consumer must call `DeleteMessage` before the timeout ends, or the message becomes visible again and another consumer may process it a second time. If processing takes longer, raise the queue's timeout or call `ChangeMessageVisibility` to extend it for that message. Long polling, set with `WaitTimeSeconds` up to 20 seconds on `ReceiveMessage` or with the queue's receive message wait time, makes the call wait for messages to arrive instead of returning empty immediately. That cuts empty responses and cost. Short polling is the default.",
   "Amazon Simple Notification Service (SNS) is push-based publish/subscribe. A message published to a topic is pushed to every subscriber: SQS queues, Lambda functions, HTTP or HTTPS endpoints, email and SMS. SNS itself does not store messages for later reading, so if you need durability per consumer, subscribe an SQS queue. Subscription filter policies let each subscriber receive only messages whose attributes, or body, match, which keeps consumers from discarding irrelevant messages. SNS FIFO topics can deliver messages in order to SQS FIFO queues when a fan-out must also preserve order.",
   "Amazon EventBridge is an event bus with content-based routing. Rules match events using event patterns written in JSON, for example source `aws.s3` and a specific bucket name in the detail, and send matching events to targets such as Lambda, Step Functions, SQS or another event bus. EventBridge receives events from AWS services, from your own applications through `PutEvents`, and from supported software as a service (SaaS) partners, and it can archive events and replay them later. For time-based work, EventBridge Scheduler creates one-time or recurring schedules using cron or rate expressions that invoke targets, with time zone support and its own retry and dead-letter queue (DLQ) settings. Scheduled rules on an event bus are the older way to run jobs on a timer.",
   "Amazon Kinesis Data Streams is for ordered, replayable, high-volume streaming data such as clickstreams, application logs or Internet of Things (IoT) telemetry. A stream is made of shards. Each record has a partition key that decides which shard it lands in, and ordering is guaranteed within a shard. Unlike SQS, consuming a record does not delete it: records stay in the stream for the retention period, 24 hours by default and extendable, so multiple consumers can read the same data independently, each tracking its own position, and reprocess it after a bug fix. Capacity is managed either with provisioned shards or with on-demand mode.",
   "A quick choice guide ties it together. To decouple work where each message needs exactly one consumer, use SQS. When you need strict order or no duplicates, use SQS FIFO with a sensible message group ID. To send one message to many subscribers, use SNS, usually delivering into SQS queues. To route by event content, or to react to events from AWS services and SaaS partners, use EventBridge, and use EventBridge Scheduler for timed invocations. For a real-time ordered stream with several consumers and replay, use Kinesis Data Streams."
  ],
  "analogy": "A visibility timeout works like checking out a library book. While you have it, nobody else can borrow it; if you do not return it, meaning delete the message, by the due date, it goes back on the shelf and someone else may check it out, so the work gets done twice. Kinesis is different: it is like a podcast episode, where listening does not remove it and every listener can start from wherever they like until it is taken down at the end of the retention period.",
  "terms": [
   [
    "Visibility timeout",
    "The period after an SQS message is received during which it is hidden from other consumers; it reappears if not deleted in time."
   ],
   [
    "Message group ID",
    "The FIFO queue attribute that defines an ordered group; messages in the same group are processed strictly in order."
   ],
   [
    "Long polling",
    "A ReceiveMessage call that waits up to 20 seconds for messages, reducing empty responses and cost."
   ],
   [
    "Event pattern",
    "The JSON filter in an EventBridge rule that selects which events are sent to the rule's targets."
   ],
   [
    "Shard",
    "The unit of capacity and ordering in a Kinesis data stream; records with the same partition key go to the same shard."
   ],
   [
    "Subscription filter policy",
    "An SNS setting that delivers only messages whose attributes or body match the policy to a given subscriber."
   ],
   [
    "EventBridge Scheduler",
    "An EventBridge capability that invokes targets on one-time or recurring cron or rate schedules, with time zones, retries and DLQ settings."
   ]
  ],
  "example": "A bank processes account transactions through an SQS FIFO queue, using the account number as the MessageGroupId. Transactions for one account are applied strictly in order, while thousands of different accounts are processed in parallel, and the MessageDeduplicationId stops a retried send from debiting twice.",
  "mistakes": [
   [
    "A FIFO queue processes only one message at a time across the whole queue, so it cannot scale.",
    "Ordering is per message group. Different MessageGroupId values are processed in parallel, so choosing a fine-grained group ID such as a customer ID allows high concurrency."
   ],
   [
    "Duplicate processing in SQS means SQS is broken, so switch to SNS.",
    "Usually the visibility timeout is shorter than processing time, so messages reappear before they are deleted. Raise the timeout or extend it with ChangeMessageVisibility, and keep handlers idempotent."
   ],
   [
    "SNS can store messages until a consumer is ready.",
    "SNS pushes and does not retain messages for later polling. Subscribe an SQS queue to give each consumer durable storage."
   ],
   [
    "SQS lets several applications read and replay the same messages.",
    "An SQS message is deleted after one consumer processes it. Multiple independent readers with replay call for Kinesis Data Streams, or EventBridge archive and replay for events."
   ]
  ],
  "tryit": [
   [
    "Fernhill Health collects heart-rate readings from thousands of wearable devices every second. A real-time alerting application and a separate machine learning pipeline must both read every reading in order per device, and the data team wants to reprocess the last day of readings when a model changes. Which service should carry the data, and what partition key makes sense?",
    "Kinesis Data Streams with the device ID as the partition key. Each device's readings land on one shard in order, both applications can consume independently, and records are retained for at least 24 hours so the pipeline can reprocess them. SQS would delete messages after one consumer."
   ],
   [
    "A nightly report at Alder & Pine Accounting must run at 1 a.m. local time in the Chicago office, including across daylight saving changes, by invoking a Lambda function. Which feature fits?",
    "EventBridge Scheduler, which supports cron expressions with a time zone and has built-in retry and DLQ settings. Older scheduled rules on an event bus use UTC, so they would drift by an hour around daylight saving changes."
   ]
  ],
  "tip": "Messages being processed twice by different consumers usually means the visibility timeout is shorter than the processing time. Many empty ReceiveMessage responses and high cost point to enabling long polling.",
  "check": [
   [
    "How can an SQS FIFO queue keep per-customer ordering but still scale?",
    "Use the customer ID as the MessageGroupId; order is kept within each group while different groups are processed in parallel."
   ],
   [
    "What is the difference between SNS and SQS delivery?",
    "SNS pushes each message to all subscribers and does not keep it; SQS stores messages until a single consumer polls, processes and deletes them."
   ],
   [
    "Which service lets several applications read and replay the same ordered stream of records?",
    "Kinesis Data Streams, because records are retained for the retention period and each consumer tracks its own position."
   ],
   [
    "Consumers see many empty ReceiveMessage responses and costs are higher than expected. What setting helps?",
    "Enable long polling by setting WaitTimeSeconds (up to 20 seconds) or the queue's receive message wait time, so calls wait for messages instead of returning empty."
   ]
  ]
 },
 {
  "t": "AWS Step Functions: Standard vs Express workflows, retry/catch, task tokens for callbacks",
  "hook": "Wren Insurance's claims process lives in one enormous Lambda function that calls five services in a row, sleeps while it waits for adjusters, and gives up when it hits its time limit. When a payout fails halfway, nobody can tell whether the customer was paid, and the support team spends Monday mornings reading logs line by line. Your lead, Amara, sketches a different picture on the whiteboard: small functions, a visual workflow, automatic retries, and a pause that can last for days while a human reviews the claim, without paying for compute that sits idle. She asks you which Step Functions workflow type to choose and how the pause would work.",
  "simple": "Step Functions is like a recipe card for a computer process. Each step on the card says what to do next: call this function, check this value and pick a path, wait, or do several things at once. If a step fails, the card can say try again three times, and if it still fails, go to the clean-up step. There are two kinds of cards. Standard is for slow, important processes that might take days, and it keeps a full record of every step. Express is for very fast, very frequent jobs that finish within minutes. A task token is like a claim ticket: the process hands it to someone outside, then waits until they bring it back to say done.",
  "body": [
   "AWS Step Functions is a serverless orchestration service. You describe a workflow as a state machine in Amazon States Language (ASL), a JSON-based format, and Step Functions runs it: calling AWS Lambda functions and other AWS services, passing data between steps, waiting, branching and handling errors. Because the workflow's logic lives in the state machine rather than in your code, each Lambda function stays small and focused on one job, and the console shows every execution visually, step by step, with the failed state highlighted and its input and output available for inspection. That visibility is a large part of why exam questions about tracking or auditing a multi-step process point to Step Functions.",
   "States are the building blocks. The main state types are `Task`, which does work such as invoking a Lambda function or calling an AWS API directly through an AWS software development kit (SDK) integration; `Choice`, which branches on values in the data; `Parallel`, which runs several branches at the same time and waits for all of them; `Map`, which runs the same steps for each item in an array; `Wait`, which pauses for a number of seconds or until a timestamp; `Pass`, which passes or reshapes data without doing work; and `Succeed` and `Fail`, which end the execution. Calling services directly from a `Task` state, for example writing to DynamoDB or publishing to SNS, often removes the need for a glue Lambda function at all.",
   "There are two workflow types, and you choose one when you create the state machine. Standard workflows can run for up to one year, use exactly-once execution of each step, and keep a full execution history that you can inspect in the console. They are billed per state transition. They suit long-running, auditable business processes, including ones that wait for humans, such as order fulfillment, loan approvals or employee onboarding.",
   "Express workflows run for up to five minutes and are designed for high-volume event processing, such as handling streaming data, transforming incoming messages or backing API requests. They are billed by the number of executions, their duration and memory, rather than per transition, which makes them much cheaper at high rates. They do not keep execution history in the service; instead they send it to Amazon CloudWatch Logs when logging is enabled. Asynchronous Express workflows have at-least-once execution semantics and synchronous Express workflows have at-most-once semantics, so the steps they call should be idempotent. On the exam, long-running, auditable or human approval points to Standard, while very high event rates with short duration points to Express.",
   "Error handling is declared on states rather than coded in your functions. A `Retry` block lists error names, such as `States.Timeout`, `States.TaskFailed`, `Lambda.ServiceException` or custom error names your function throws, together with `IntervalSeconds`, `MaxAttempts` and `BackoffRate`, which gives exponential backoff without any code. A `Catch` block runs after retries are exhausted, or immediately for errors not covered by a retrier, and sends the execution to a fallback state. `ResultPath` controls where the error details are placed in the state's data, so you can keep the original input and add the error alongside it, for example at `$.error`. This is how you build compensation, also called the saga pattern: if shipping fails after a card was charged, the catch routes to a state that refunds the payment.",
   "The following Task state retries a failed Lambda invocation up to three times, with waits of 2, 4 and 8 seconds, and then routes any remaining error to a notification state while keeping the original input.",
   "```json\n\"ChargeCard\": {\n  \"Type\": \"Task\",\n  \"Resource\": \"arn:aws:states:::lambda:invoke\",\n  \"Retry\": [{ \"ErrorEquals\": [\"States.TaskFailed\"], \"IntervalSeconds\": 2, \"MaxAttempts\": 3, \"BackoffRate\": 2 }],\n  \"Catch\": [{ \"ErrorEquals\": [\"States.ALL\"], \"ResultPath\": \"$.error\", \"Next\": \"NotifyFailure\" }],\n  \"Next\": \"ShipOrder\"\n}\n```",
   "Service integrations come in three patterns, and the exam likes to test them. Request Response calls a service and moves on as soon as the service replies, without waiting for any underlying job to finish. Run a Job, written with the `.sync` suffix, waits for a job such as an AWS Batch job, an Amazon ECS task or another state machine execution to complete before moving to the next state. Wait for Callback, written with the `.waitForTaskToken` suffix, pauses the workflow and passes a task token to something outside it, for example in a message to an SQS queue read by a human approval application or a third-party integration.",
   "With a callback, the workflow stays paused until the external process calls `SendTaskSuccess` or `SendTaskFailure` with that token, or until the task times out. `HeartbeatSeconds` adds a safety check: the worker must call `SendTaskHeartbeat` within that interval or the task fails with `States.HeartbeatTimeout`, which detects a worker that crashed or went silent. Task tokens are how Standard workflows wait days for a manager to approve something without paying for idle compute, because a paused Standard execution incurs no transitions while it waits."
  ],
  "analogy": "A Standard workflow is like a registered parcel with tracking. It can take days, every hand-off is recorded, and you can look up exactly where it is. An Express workflow is like a high-speed mail sorting machine: it handles enormous volumes quickly and cheaply, but it does not keep a tracking page for each envelope, only a log. A task token is the claim ticket from a coat check: the workflow hands it over and waits until someone returns it. The analogy breaks down on duration, since Express workflows have a hard five-minute limit.",
  "terms": [
   [
    "Amazon States Language (ASL)",
    "The JSON-based language used to define Step Functions state machines."
   ],
   [
    "Standard workflow",
    "A Step Functions workflow type for long-running (up to one year), exactly-once, fully audited executions."
   ],
   [
    "Express workflow",
    "A Step Functions workflow type for high-volume, short (up to five minutes) executions, logged to CloudWatch Logs."
   ],
   [
    "Task token",
    "A token Step Functions passes to an external process in the Wait for Callback pattern; the workflow resumes when SendTaskSuccess or SendTaskFailure is called with it."
   ],
   [
    "Retry and Catch",
    "State-level error handling in ASL: Retry re-attempts a failed state with backoff, and Catch routes unresolved errors to a fallback state."
   ],
   [
    "HeartbeatSeconds",
    "A Task setting that fails the task if the external worker does not send a heartbeat within the interval, detecting silent failures."
   ]
  ],
  "example": "An expense workflow saves a claim, then uses an SQS task with .waitForTaskToken to put the token in a message for the approval app. Two days later a manager clicks Approve, and the app calls SendTaskSuccess with the token, so the Standard workflow resumes and pays the claim.",
  "mistakes": [
   [
    "Express workflows are just faster Standard workflows and can be used for anything.",
    "Express workflows are limited to five minutes, lack the built-in execution history, and have at-least-once or at-most-once semantics. Long-running or auditable processes need Standard."
   ],
   [
    "To wait for a human approval, add a Wait state that loops and checks a database.",
    "Polling loops add transitions and complexity. Use the Wait for Callback pattern with .waitForTaskToken, and have the approval app call SendTaskSuccess or SendTaskFailure."
   ],
   [
    "Retry and Catch do the same thing, so you only need one.",
    "Retry re-attempts the same state; Catch moves the execution to a different state after retries are exhausted. Robust workflows use Retry for transient errors and Catch for compensation."
   ],
   [
    "Step Functions requires a Lambda function for every step.",
    "Task states can call many AWS services directly through SDK and optimized integrations, such as DynamoDB, SNS, SQS and ECS, without a Lambda function in between."
   ]
  ],
  "tryit": [
   [
    "Osprey Media receives about 50,000 small image metadata events per second from an upload pipeline. Each event needs three quick transformation steps that finish in under a second, and the team only needs CloudWatch logs, not per-execution history. Which workflow type should the developer choose and why?",
    "An Express workflow. It is designed for high-volume, short executions, is billed per execution and duration rather than per transition, and logs to CloudWatch Logs. Standard would be far more expensive at this rate and its one-year duration and history are not needed. The steps should be idempotent because of at-least-once semantics for asynchronous Express."
   ],
   [
    "A procurement workflow at Calder Manufacturing sends a purchase request to an external supplier system and must wait until the supplier confirms, which can take up to a week. Sometimes the supplier's worker crashes silently. How should the developer design this step?",
    "Use a Task with .waitForTaskToken in a Standard workflow, passing the token to the supplier integration, which calls SendTaskSuccess or SendTaskFailure when done. Set HeartbeatSeconds and a timeout so a silent crash causes a heartbeat timeout that a Catch can route to an alert or retry."
   ]
  ],
  "tip": "Long-running, auditable, or waiting on humans points to Standard. High event rates with short duration points to Express. Anything that must pause until an outside system responds points to a task token with .waitForTaskToken.",
  "check": [
   [
    "What does a Catch block do that Retry does not?",
    "Catch redirects the execution to a fallback state after the error (and any retries) is not resolved, while Retry only re-attempts the same state."
   ],
   [
    "Why would a workflow that runs for several days need a Standard workflow?",
    "Express workflows are limited to five minutes, while Standard workflows can run for up to one year."
   ],
   [
    "How does an external system resume a workflow paused on a task token?",
    "It calls SendTaskSuccess (or SendTaskFailure) with the task token it received."
   ],
   [
    "Which service integration pattern waits for an AWS Batch job to finish before moving on?",
    "Run a Job, using the .sync suffix on the resource ARN."
   ]
  ]
 },
 {
  "t": "Calling AWS services with the SDKs and CLI: credential provider chain, pagination, waiters, error handling",
  "hook": "Marisol at Tidewater Analytics gets a security ticket on Tuesday morning: a reporting script on an EC2 instance just deleted objects from a bucket it was never supposed to touch. The instance profile only allows read access, so how did the delete succeed? Digging in, she finds that months ago someone exported an administrator's access keys as environment variables on that machine to test something, and never removed them. The same script also quietly processes only the first thousand objects in a bucket that holds fifty thousand. Two bugs, one root cause: not knowing how the SDK actually decides who you are and how much data comes back.",
  "simple": "When your program talks to AWS, it has to show an ID card, called credentials, on every request. The SDK (a code library for AWS) looks for that ID card in a fixed order of places, like checking your coat pocket, then your wallet, then your bag, and uses the first one it finds. If an old, powerful card is sitting in your coat pocket, it gets used even though you meant to use the one in your bag. Many AWS answers also come in pages, like search results; you ask for the next page with a bookmark token. Waiters are helpers that keep checking until something is ready, like refreshing a delivery tracker until it says arrived.",
  "body": [
   "Every call your code makes to AWS is an HTTPS request to a service API, whether it goes through an AWS software development kit (SDK), such as Boto3 for Python or the AWS SDK for JavaScript v3, or through the AWS Command Line Interface (CLI). Each request is signed with Signature Version 4 (SigV4) using credentials, so the service can authenticate the caller and AWS Identity and Access Management (IAM) can authorize the action. Knowing where those credentials come from, how to handle multi-page results, how to wait for long operations and how to handle errors is core developer knowledge on the DVA-C02 exam.",
   "The SDKs and CLI look for credentials in a fixed order called the default credential provider chain. The exact order varies slightly between SDKs, but broadly it is: credentials passed explicitly in code; environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and, for temporary credentials, `AWS_SESSION_TOKEN`); the shared credentials and config files (`~/.aws/credentials` and `~/.aws/config`), including named profiles, IAM Identity Center (single sign-on, or SSO) profiles and assume-role profiles; and finally the credentials of the compute environment, such as a Lambda execution role, an Amazon Elastic Container Service (ECS) task role, or an Amazon EC2 instance profile delivered through the instance metadata service. The first source that provides credentials wins, and the SDK stops looking.",
   "That ordering explains both best practice and a classic troubleshooting case. The right way to give code running on AWS its permissions is to attach a role and put no keys in code or config files. The chain finds the role's temporary credentials automatically and refreshes them before they expire, so there is nothing long-lived to leak or rotate. The troubleshooting case is the reverse: an EC2 instance or container behaves with unexpected permissions because someone left access keys in environment variables or a credentials file, which take precedence over the instance profile. The quickest diagnostic is `aws sts get-caller-identity`, which prints the account and the Amazon Resource Name (ARN) of the identity your credentials actually resolve to.",
   "Pagination is the next trap. List and describe APIs return results in pages rather than all at once. A response includes a continuation token, named `NextToken`, `Marker`, `ContinuationToken` for S3 `ListObjectsV2`, or `LastEvaluatedKey` for DynamoDB, and you pass it back in the next request until no token is returned. Code that makes a single call and ignores the token silently processes only the first page; for S3 that is at most 1,000 objects per call. SDKs provide paginators that follow the tokens for you, as in this Boto3 example.",
   "```python\nimport boto3\ns3 = boto3.client('s3')\nfor page in s3.get_paginator('list_objects_v2').paginate(Bucket='my-bucket'):\n    for obj in page.get('Contents', []):\n        print(obj['Key'])\n```",
   "The CLI paginates automatically by default, making as many underlying calls as needed to return the full result. You can control output with `--max-items`, which limits how many items the command prints and returns a token if more exist, and `--starting-token`, which resumes from that token. `--page-size` is different: it changes how many items each underlying API call fetches without changing the total output, which can help avoid timeouts on services that struggle with large pages. For DynamoDB, a `Query` or `Scan` that returns `LastEvaluatedKey` should be repeated with that value as `ExclusiveStartKey`.",
   "Waiters handle operations that take time to complete. A waiter polls a describe call until a resource reaches a desired state, such as `bucket_exists`, an EC2 instance's `instance_running` or a DynamoDB table's `table_exists`, then returns, or raises an error after a maximum number of attempts. In the CLI they look like `aws dynamodb wait table-exists --table-name Orders`. Use waiters instead of writing your own sleep-and-check loops; they already use sensible intervals and limits, and they make deployment scripts that create a table and then write to it reliable.",
   "Error handling completes the picture. SDKs raise service exceptions that carry an error code and an HTTP status. Catch specific codes and act on them: `ConditionalCheckFailedException` usually means another writer got there first, `ResourceNotFoundException` means a wrong name or Region, `AccessDeniedException` means a missing IAM permission, and `ThrottlingException` means you are calling too fast. The SDKs automatically retry throttling and transient errors with exponential backoff; you can set the retry mode, such as `standard` or `adaptive` in many SDKs, and the maximum number of attempts in code or with the `AWS_RETRY_MODE` and `AWS_MAX_ATTEMPTS` environment variables.",
   "Finally, log the request ID from failed calls, because AWS Support and AWS CloudTrail use it to trace exactly what happened to a request. When debugging from the CLI, `--debug` prints the full signed request, the credential source that was used and the raw response, which often reveals a wrong Region, profile or endpoint at a glance."
  ],
  "analogy": "The credential provider chain is like a hotel key-card reader that checks your pockets in a fixed order and uses the first card it touches. If an old master key is in your front pocket, it opens doors you never meant to open, even though your proper room key is in your bag. The fix is not a smarter reader but removing the stray card. Where the analogy stops: role credentials are temporary and refreshed automatically, so the card in your bag quietly renews itself.",
  "mnemonic": "For the broad credential chain order, think Code, Environment, Files, Role: CEFR. Explicit credentials in code come first, then environment variables, then the shared credentials and config files, and last the compute environment's role. Exact ordering differs slightly by SDK, but this broad sequence is what exam questions rely on.",
  "terms": [
   [
    "Default credential provider chain",
    "The ordered list of places an SDK or the CLI looks for credentials, ending with the role credentials of the compute environment."
   ],
   [
    "Paginator",
    "An SDK helper that automatically follows continuation tokens to return every page of a list API's results."
   ],
   [
    "Waiter",
    "An SDK or CLI helper that polls until a resource reaches a specified state or a maximum number of attempts is reached."
   ],
   [
    "SigV4",
    "Signature Version 4, the process that signs AWS API requests with credentials so the service can authenticate them."
   ],
   [
    "Instance profile",
    "A container for an IAM role that EC2 uses to deliver temporary role credentials to software on the instance through the instance metadata service."
   ],
   [
    "aws sts get-caller-identity",
    "A CLI command that returns the account, user ID and ARN of the identity the current credentials resolve to."
   ]
  ],
  "example": "A script run by a CI job lists every object in a bucket with 50,000 objects but only processes the first 1,000. The developer switches from a single list_objects_v2 call to the list_objects_v2 paginator, and the script now follows ContinuationToken through every page.",
  "mistakes": [
   [
    "An instance profile always overrides other credentials on an EC2 instance.",
    "The role is near the end of the chain. Environment variables or a credentials file on the instance take precedence, so leftover keys win over the instance profile."
   ],
   [
    "Storing access keys in a Lambda environment variable is fine because environment variables are encrypted.",
    "The execution role already supplies temporary, rotated credentials. Long-lived keys can leak, need manual rotation and may override the intended role."
   ],
   [
    "--page-size limits how many results the CLI returns.",
    "--page-size only changes how many items each underlying API call fetches. Use --max-items to limit the output."
   ],
   [
    "A list call that returns fewer results than expected means the API is broken.",
    "Most likely the results are paginated and the code ignored the continuation token. Use a paginator or loop until no token is returned."
   ]
  ],
  "tryit": [
   [
    "A developer at Bramble Software runs a deployment script that creates a DynamoDB table and immediately writes seed data, but the writes fail with ResourceNotFoundException about half the time. The table name and Region are correct. What should the developer add?",
    "A waiter, such as the SDK's table_exists waiter or aws dynamodb wait table-exists, between creating the table and writing to it. The table takes time to become ACTIVE, and the waiter polls until it is ready instead of racing it. A fixed sleep would be fragile."
   ],
   [
    "A containerized job on ECS at Pinecrest Freight should use its task role to read from one bucket, but it is getting AccessDenied on that bucket and succeeding on buckets the role cannot access. What is the likely cause and how do you confirm it?",
    "Credentials earlier in the chain, most likely access keys baked into the image as environment variables or a credentials file, are being used instead of the task role. Running aws sts get-caller-identity inside the container shows which identity is in use; remove the embedded keys so the chain falls through to the task role."
   ]
  ],
  "tip": "If code on EC2, ECS or Lambda uses the wrong permissions, suspect hardcoded or environment-variable credentials winning over the role in the credential chain. Run aws sts get-caller-identity to confirm who you are.",
  "check": [
   [
    "Why should Lambda code not contain access keys?",
    "The execution role's temporary credentials are provided automatically through the credential chain and rotated; embedded keys are long-lived, can leak and override the intended role."
   ],
   [
    "A DynamoDB Scan returns a LastEvaluatedKey. What does that mean?",
    "The results are paginated; pass that key as ExclusiveStartKey in the next request to continue until no LastEvaluatedKey is returned."
   ],
   [
    "What is a waiter for?",
    "It polls a resource's status until it reaches a desired state, such as a table becoming ACTIVE, replacing hand-written sleep-and-check loops."
   ],
   [
    "Which CLI command shows exactly which identity your current credentials resolve to?",
    "aws sts get-caller-identity, which returns the account, user ID and ARN."
   ]
  ]
 },
 {
  "t": "Lambda configuration: memory, timeout (15-minute max), ephemeral /tmp storage, environment variables, layers, concurrency, VPC access",
  "hook": "Keisha just deployed her first Lambda function for Silverleaf Clinics. It pulls appointment data from a database in a private subnet and sends reminders through a public text-message API. In testing it failed after exactly three seconds. She raised the timeout, and now database reads work but every call to the messaging API hangs until the function times out. Meanwhile, a colleague's image-processing function is crawling, and someone suggests buying more CPU, though Lambda has no CPU setting at all. Keisha stares at the configuration tab: memory, timeout, ephemeral storage, environment variables, layers, concurrency, VPC. Which knob fixes which problem?",
  "simple": "Lambda runs your code for you without you managing a server, but you still choose a few settings. Memory is how much working space the code gets, and choosing more memory also gives it more processing power. Timeout is the longest one run may last, and the most is 15 minutes. The /tmp folder is a scratch pad that may be wiped at any time. Environment variables are settings, like a table name, stored outside your code. Layers are shared toolboxes several functions can use. Concurrency is how many copies run at once. VPC access lets the function reach private resources, but then it needs a special exit, called a NAT gateway, to reach the internet.",
  "body": [
   "AWS Lambda runs your code in managed execution environments. You never choose or patch servers; instead you set a handful of configuration values, and the AWS Certified Developer – Associate (DVA-C02) exam checks that you know what each one controls and its key limits. Many troubleshooting questions are really configuration questions in disguise, so it pays to connect each symptom with the setting that causes it.",
   "Memory is the main performance setting, from 128 megabytes (MB) up to 10,240 MB. There is no separate CPU setting: Lambda allocates CPU power in proportion to memory, so raising memory also makes CPU-bound code such as image resizing or compression run faster. Because you pay for memory multiplied by duration, a higher setting sometimes costs less overall, since the function finishes sooner. Measuring a few settings and comparing duration and cost is a common optimization step.",
   "The timeout is how long one invocation may run, from 1 second up to a maximum of 900 seconds, which is 15 minutes. The default is only 3 seconds, which surprises many people when a function that calls a slow API or opens a database connection fails with a `Task timed out after 3.00 seconds` message in its logs. Work that needs longer than 15 minutes does not belong in a single Lambda invocation. It belongs in AWS Step Functions, which can chain many short invocations, in AWS Fargate containers or AWS Batch jobs, or it must be split into smaller pieces, for example by processing a file in chunks.",
   "Each execution environment has ephemeral storage mounted at `/tmp`, 512 MB by default and configurable up to 10,240 MB. It persists between invocations that reuse the same environment, which makes it handy for caching a downloaded model or reference file so warm invocations skip the download. However, it is not shared between environments, and it disappears when the environment is recycled, which Lambda may do at any time. Never treat it as durable storage. For shared or persistent files, use Amazon S3, or mount Amazon Elastic File System (EFS), which Lambda supports for functions connected to a VPC.",
   "Environment variables hold configuration such as table names, queue URLs or stage settings, read with `os.environ` in Python or `process.env` in Node.js, so the same code can run in development and production with different values. They are encrypted at rest with AWS Key Management Service (KMS), using an AWS managed key by default or a customer managed key you choose, and all variables together are limited to 4 kilobytes (KB). Secrets such as database passwords should instead be fetched at runtime from AWS Secrets Manager or AWS Systems Manager Parameter Store, or at least encrypted with a customer managed key using the console's encryption helpers, so they are not visible in plain text to anyone who can view the function configuration.",
   "Layers are .zip archives of libraries, custom runtimes or shared code that several functions can reference, so you do not bundle the same dependencies into every deployment package. A function can use up to five layers, and the combined unzipped size of the function and all its layers must stay within the 250 MB deployment limit. Layers are versioned and immutable: publishing a change creates a new version, and functions reference a specific layer version Amazon Resource Name (ARN), so updating a layer does not change existing functions until you point them at the new version. Functions packaged as container images do not use layers; you add dependencies to the image instead.",
   "Concurrency is the number of invocations running at the same time. Each account has a Regional concurrency quota shared by all functions, 1,000 by default and raisable through a quota increase. Reserved concurrency does two things at once: it guarantees a function a slice of that pool, so other functions cannot starve it, and it caps the function at that number, which protects a fragile downstream database from being overwhelmed. Setting reserved concurrency to 0 effectively disables the function, because every invocation is throttled. Provisioned concurrency is different: it keeps a number of execution environments initialized in advance so requests avoid cold-start latency, at an additional cost.",
   "Networking is the last major setting. By default a Lambda function runs in an AWS-managed network with internet access but no access to resources in your private virtual private cloud (VPC). To reach an Amazon Relational Database Service (RDS) database or ElastiCache cluster in private subnets, configure the function with VPC subnets and security groups. Lambda then creates Hyperplane elastic network interfaces for it, and the execution role needs permission to manage network interfaces, which the `AWSLambdaVPCAccessExecutionRole` managed policy includes.",
   "Once attached to a VPC, the function has no internet access unless its subnets route outbound traffic through a NAT gateway in a public subnet. Placing the function in a public subnet does not help, because its network interfaces never receive public IP addresses. For AWS services such as S3, DynamoDB or Secrets Manager, you can instead add VPC endpoints so traffic stays on the AWS network without needing a NAT gateway."
  ],
  "analogy": "Configuring Lambda is like renting a workshop by the minute. Memory is the size of the workshop, and bigger workshops come with more power tools, so jobs finish faster. The timeout is the maximum rental period, never more than 15 minutes. The /tmp folder is the workbench, which may be cleared between renters. Joining a VPC is like moving into a gated industrial park: you can reach the private buildings, but you need a staffed exit gate, the NAT gateway, to drive out to the public road.",
  "terms": [
   [
    "Timeout",
    "The maximum run time for one Lambda invocation, configurable from 1 second to 15 minutes, with a default of 3 seconds."
   ],
   [
    "Ephemeral storage (/tmp)",
    "Per-environment scratch disk for a Lambda function, 512 MB by default and configurable up to 10,240 MB, not durable."
   ],
   [
    "Layer",
    "A versioned .zip archive of shared code or dependencies that many functions can reference; each function can include up to five layers."
   ],
   [
    "Reserved concurrency",
    "A setting that both guarantees and caps the number of concurrent executions for a function."
   ],
   [
    "Provisioned concurrency",
    "A setting that keeps a chosen number of execution environments initialized ahead of time to avoid cold starts."
   ],
   [
    "NAT gateway",
    "A managed service that lets resources in private subnets, including VPC-connected Lambda functions, make outbound internet connections."
   ]
  ],
  "example": "A function in private subnets must read from an RDS database and also call a public payments API. It works for the database but the payment calls time out. The fix is to route the subnets' outbound traffic through a NAT gateway, because a VPC-connected Lambda function has no internet access on its own.",
  "mistakes": [
   [
    "To make a CPU-bound function faster, raise its CPU setting.",
    "Lambda has no separate CPU setting. Increase memory, and CPU is allocated proportionally."
   ],
   [
    "A job that takes 40 minutes can run in Lambda if you raise the timeout high enough.",
    "The maximum timeout is 15 minutes. Use Step Functions, Fargate or Batch, or split the work into smaller pieces."
   ],
   [
    "Putting a VPC-connected function in a public subnet gives it internet access.",
    "Lambda network interfaces do not get public IP addresses. Route the private subnets through a NAT gateway, or use VPC endpoints for AWS services."
   ],
   [
    "Reserved concurrency and provisioned concurrency are the same thing.",
    "Reserved concurrency guarantees and caps the number of concurrent executions. Provisioned concurrency pre-initializes environments to reduce cold starts."
   ]
  ],
  "tryit": [
   [
    "Maplewood Library's search function connects to an RDS database that can handle only about 100 connections. During a busy enrollment week, the function scales to hundreds of concurrent executions and the database starts rejecting connections, which also breaks other applications using it. What Lambda setting is the quickest way to protect the database?",
    "Set reserved concurrency on the function to a value the database can tolerate, such as below 100. That caps concurrent executions so the function cannot open more connections than the database allows. Placing Amazon RDS Proxy in front of the database is a complementary fix that pools connections."
   ],
   [
    "A function at Harbor Freightways downloads a 300 MB reference file from S3 on every invocation and takes several seconds each time. The file changes only once a week. How can the developer speed up warm invocations?",
    "Increase ephemeral storage above the default 512 MB if needed and cache the file in /tmp, checking whether it already exists before downloading. Warm invocations in the same environment reuse it. Because /tmp is not durable, the code must still download the file when it is missing."
   ]
  ],
  "tip": "Need more than 15 minutes: not Lambda (use Step Functions, Fargate or Batch). CPU-bound and slow: raise memory. VPC function cannot reach the internet: add a NAT gateway or VPC endpoints.",
  "check": [
   [
    "How do you give a Lambda function more CPU?",
    "Increase its memory setting; Lambda allocates CPU power in proportion to configured memory."
   ],
   [
    "Is data written to /tmp available to the next invocation?",
    "Only if that invocation reuses the same execution environment; it is not shared or durable, so use S3 or EFS for data that must persist."
   ],
   [
    "What happens if you set a function's reserved concurrency to 0?",
    "No invocations can run, so the function is effectively throttled and disabled until the setting is changed."
   ],
   [
    "A VPC-connected function can read from RDS but cannot reach a public API. What is the fix?",
    "Route the function's private subnets through a NAT gateway, because a VPC-connected function has no internet access on its own."
   ]
  ]
 },
 {
  "t": "Lambda invocation models: synchronous, asynchronous (retries, destinations, DLQs) and event source mappings (SQS, Kinesis, DynamoDB Streams, partial batch responses)",
  "hook": "On Monday morning Femi, a developer at Cobalt Print Shop, finds three puzzles waiting. Corrupt uploads to S3 failed overnight, but the dead-letter queue he attached to the function is empty. An SQS-triggered order function has a DLQ configured on the function too, yet failed orders are looping back again and again. And the Kinesis-fed analytics function has not processed anything new for six hours because one malformed record keeps failing. All three use the same Lambda function settings page, so why does each behave so differently? The answer depends on one question nobody on the team asked: how is each function being invoked?",
  "simple": "A Lambda function can be started in three ways. Synchronous is like a phone call: the caller waits for an answer and decides whether to call back if it fails. Asynchronous is like leaving a voicemail: Lambda takes the message, says got it, and tries a few more times on its own if the function fails, then can put the failed message somewhere for review. The third way is polling: Lambda itself keeps checking a queue or a stream for new items and hands them to your function in bundles. If a bundle partly fails, your function can say exactly which items failed so only those get retried, instead of redoing the whole bundle.",
  "body": [
   "How a Lambda function is invoked decides who retries on failure and where errors end up. There are three models: synchronous, asynchronous and event source mappings. Many AWS Certified Developer – Associate (DVA-C02) questions quietly depend on which one is in play, so the first step in any Lambda error-handling question is to identify the event source and its invocation model.",
   "Synchronous invocation, with `InvocationType` set to `RequestResponse`, means the caller waits for the function to finish and receives the result or the error. Amazon API Gateway, Application Load Balancer, Amazon Cognito triggers and a direct `aws lambda invoke` call with default settings are synchronous. Lambda does not retry on its own in this model; the caller decides. If the function throws, API Gateway returns an error such as a 502 to the client, and it is the client's job, or the calling SDK's retry logic, to try again.",
   "Asynchronous invocation, with `InvocationType` set to `Event`, puts the event on an internal Lambda queue and returns immediately with HTTP 202 Accepted. Amazon S3 event notifications, Amazon SNS and Amazon EventBridge invoke functions this way. If the function returns an error, Lambda retries it twice more by default, configurable to 0, 1 or 2 retries, with delays between attempts. Events can wait in the internal queue for up to six hours by default, which you can lower with the maximum event age setting. An event that exceeds the maximum event age, for example because the function was throttled for a long time, is not retried further and goes to the configured failure target, if any.",
   "When all asynchronous attempts fail, the event can go to a dead-letter queue (DLQ), which is an SQS queue or SNS topic that receives only the original event payload, or to an on-failure destination, the newer and richer option. Destinations can also route successful results. On-success and on-failure destinations can be SQS, SNS, another Lambda function or EventBridge, and Amazon S3 is supported for failures. A destination receives an invocation record that includes the request payload, the response or error details, and metadata such as the number of attempts, which makes troubleshooting much easier than a bare DLQ message. Because events may be delivered more than once, asynchronous handlers must be idempotent.",
   "Event source mappings handle poll-based sources: Amazon SQS, Amazon Kinesis Data Streams, Amazon DynamoDB Streams, Amazon MQ, Amazon Managed Streaming for Apache Kafka (MSK) and self-managed Apache Kafka. Here the Lambda service runs pollers on your behalf that read records in batches and invoke your function synchronously with each batch. You do not write polling code. Settings include batch size and batching window, which trade latency for efficiency, and for streams, the starting position, such as `TRIM_HORIZON` or `LATEST`, and a parallelization factor that lets several batches from one shard be processed concurrently while preserving order per partition key.",
   "Error behavior differs by source, and this is where the exam's traps live. For SQS, a failed batch is not deleted, so its messages become visible again after the queue's visibility timeout and are retried until they succeed or exceed the queue's `maxReceiveCount`, at which point SQS moves them to the queue's own DLQ. That DLQ is configured on the source queue, not on the function; a DLQ set on the function applies only to asynchronous invocations and is ignored here. Set the queue's visibility timeout comfortably longer than the function timeout so messages are not redelivered while still being processed.",
   "For Kinesis and DynamoDB Streams, a failing batch blocks its shard, because records must be processed in order. By default Lambda keeps retrying that batch until it succeeds or the records expire from the stream, which can stall processing for hours or days. Stream mappings give you controls to limit the damage: maximum retry attempts, maximum record age, bisect batch on function error, which splits a failing batch in half to isolate the bad record, and an on-failure destination, an SQS queue or SNS topic that receives details about the discarded records so you can investigate them.",
   "Partial batch responses avoid reprocessing records that already succeeded. Enable `ReportBatchItemFailures` on the event source mapping and have the function return the identifiers of only the failed items. Lambda then retries just those messages for SQS, or, for streams, restarts from the first failed sequence number. Returning an empty list means the whole batch succeeded. The following Python handler collects failures as it goes and reports them in the required shape.",
   "```python\ndef handler(event, context):\n    failures = []\n    for record in event['Records']:\n        try:\n            process(record)\n        except Exception:\n            failures.append({'itemIdentifier': record['messageId']})\n    return {'batchItemFailures': failures}\n```"
  ],
  "analogy": "Synchronous invocation is a phone call: the caller waits on the line, and if it fails, the caller decides whether to dial again. Asynchronous invocation is a voicemail: Lambda takes the message, says it was received, tries the function a few more times on its own, and files messages that never get through in a failure tray. Event source mappings are a mail carrier who empties your mailbox in bundles. The analogy breaks for streams, where one bad letter blocks every letter behind it in that slot until it is handled or ages out.",
  "terms": [
   [
    "Synchronous invocation",
    "The caller waits for the function's response; retries are the caller's responsibility."
   ],
   [
    "Asynchronous invocation",
    "Lambda queues the event, returns 202 immediately, and retries failures itself before sending them to a DLQ or destination."
   ],
   [
    "Lambda destination",
    "A target (SQS, SNS, Lambda, EventBridge, or S3 for failures) that receives a record of an asynchronous or stream invocation's success or failure."
   ],
   [
    "Event source mapping",
    "A Lambda resource that polls a queue or stream and invokes the function with batches of records."
   ],
   [
    "ReportBatchItemFailures",
    "An event source mapping setting that lets the function return only the failed records so successful ones are not retried."
   ],
   [
    "Bisect batch on function error",
    "A stream event source mapping option that splits a failing batch in two and retries each half to isolate a bad record."
   ],
   [
    "Maximum event age",
    "An asynchronous invocation setting that limits how long Lambda keeps an event in its internal queue, up to six hours."
   ]
  ],
  "example": "An S3 upload triggers an image-resizing function asynchronously. Corrupt images make it throw an error, so Lambda retries twice and then sends the invocation record, including the error message and the original event, to an on-failure destination SQS queue that the team reviews each morning.",
  "mistakes": [
   [
    "A DLQ configured on the Lambda function catches failed SQS messages.",
    "Function DLQs apply only to asynchronous invocations. For an SQS event source, configure a redrive policy and DLQ on the source queue."
   ],
   [
    "Lambda retries failed API Gateway requests automatically.",
    "API Gateway invokes synchronously, so Lambda does not retry. The client or caller must retry."
   ],
   [
    "Throwing an error for the whole batch is fine because only the bad record is retried.",
    "Without partial batch responses, the entire batch is retried, including successful records. Enable ReportBatchItemFailures and return only failed item identifiers."
   ],
   [
    "A DLQ and an on-failure destination are interchangeable for every invocation type.",
    "Both work for asynchronous invocations, but destinations carry richer records including error details and also support success routing. For stream sources, use the event source mapping's on-failure destination."
   ]
  ],
  "tryit": [
   [
    "At Quarry Lane Books, an EventBridge rule invokes a Lambda function that updates inventory. The team wants to know exactly which events failed after all retries, including the error message, and also wants successful updates to be sent to an audit queue. What should the developer configure?",
    "Configure asynchronous invocation destinations on the function: an on-failure destination, such as an SQS queue, and an on-success destination pointing to the audit queue. Destinations receive the full invocation record with the error or response. A classic DLQ would hold only the event payload and cannot route successes."
   ],
   [
    "A DynamoDB Streams-triggered function at Saltmarsh Telecom has been stuck on the same batch for hours because one item has a field the code cannot parse. New changes are piling up behind it. What event source mapping settings should the developer add?",
    "Set a maximum retry attempts value and maximum record age, enable bisect batch on function error to isolate the bad record, add an on-failure destination to capture details of discarded records, and enable ReportBatchItemFailures so only failing records are retried. Then fix the parsing bug."
   ]
  ],
  "tip": "A DLQ configured on the Lambda function only applies to asynchronous invocations. For an SQS event source, configure the redrive policy and DLQ on the source queue itself.",
  "check": [
   [
    "Which invocation model does S3 use, and what happens when the function fails?",
    "Asynchronous; Lambda retries up to two more times by default, then sends the event to a DLQ or on-failure destination if configured."
   ],
   [
    "Why can one bad record stall a Kinesis-triggered function?",
    "Stream batches are processed in order per shard, so Lambda keeps retrying the failing batch until it succeeds or expires unless you set retry limits, bisect on error or partial batch responses."
   ],
   [
    "What does a function return to report partial batch failures?",
    "An object with batchItemFailures listing the itemIdentifier (message ID or sequence number) of each failed record."
   ],
   [
    "Which invocation model does API Gateway use, and who handles retries?",
    "Synchronous; Lambda does not retry, so the client or calling code decides whether to retry."
   ]
  ]
 },
 {
  "t": "Lambda coding practices: initializing SDK clients and connections outside the handler, reading events, returning API Gateway proxy responses",
  "hook": "The Thursday release at Glasswing Travel went out smoothly, until the mobile team reported that every booking lookup now returns 502 Bad Gateway. The Lambda logs show no errors at all; the function finds the booking and returns it. At the same time, the database team is paging you because connection counts tripled overnight, and a user filed a ticket saying she briefly saw another customer's name in her itinerary. Your teammate Jun pulls up the refactored handler code. Somewhere in about thirty lines are three mistakes: one in the response shape, one in where a connection is created, and one in where a variable lives. Can you spot them?",
  "simple": "A Lambda handler is the one function AWS calls each time your code runs. It receives two things: the event, which is the input such as a web request, and the context, which is information like how much time is left. Lambda keeps the same copy of your program warm for a while and reuses it, so anything you set up outside the handler, like a database connection, is created once and reused, like leaving the coffee machine on between customers. But do not leave one customer's order sitting on the counter for the next. When API Gateway, the front door for web requests, calls your function, your reply must follow a set format with a status code and a text body.",
  "body": [
   "A Lambda function is built around a handler: a function that Lambda calls once per invocation with two arguments. The first is the event, the input data, whose shape depends on what invoked the function. The second is the context object, which carries runtime information such as the request ID, the function name, the memory limit and the remaining execution time. Writing the handler well has a direct effect on speed, cost and correctness, and the AWS Certified Developer – Associate (DVA-C02) exam tests a few specific habits.",
   "The most important habit comes from how Lambda reuses execution environments. The first invocation in a new environment runs the init phase, which loads your code and runs everything outside the handler; this work is part of a cold start. Later invocations in the same environment, called warm invocations, skip straight to the handler. So create AWS software development kit (SDK) clients and database connections, read configuration, and load large libraries at module level, outside the handler. They are created once and reused across many warm invocations, which saves time on every request and avoids opening a new database connection each time, a common cause of exhausted connection pools.",
   "The flip side is that module-level state outlives a single request. Keep anything request-specific inside the handler, and never store user data in global variables, because the next invocation in the same environment may come from a different user. A global variable named `current_user` that is set in one request and read in the next is exactly how one customer ends up seeing another's data. The example below shows the right split: the DynamoDB table resource is created once at module level, while the order ID, the lookup and the response are all handled inside the handler.",
   "```python\nimport os, json, boto3\n\ntable = boto3.resource('dynamodb').Table(os.environ['TABLE_NAME'])  # runs once per environment\n\ndef handler(event, context):\n    order_id = event['pathParameters']['id']\n    item = table.get_item(Key={'orderId': order_id}).get('Item')\n    if not item:\n        return {'statusCode': 404, 'body': json.dumps({'message': 'not found'})}\n    return {\n        'statusCode': 200,\n        'headers': {'Content-Type': 'application/json'},\n        'body': json.dumps(item, default=str)\n    }\n```",
   "Reading the event correctly means knowing its shape for each source. An Amazon S3 notification arrives as a list of records, with the bucket at `event['Records'][i]['s3']['bucket']['name']` and the key at `['object']['key']`. Object keys are URL-encoded in the event, so a file named `my photo.jpg` appears as `my+photo.jpg` and must be decoded before you call `GetObject`. Amazon SQS delivers `Records` where each `body` is a string, which you usually parse as JSON. Treat every field as possibly missing and validate input before using it.",
   "An API Gateway proxy integration event carries the HTTP request. For a REST API it includes `httpMethod`, `path`, `headers`, `queryStringParameters`, `pathParameters` and `body`; for an HTTP API using payload format version 2.0, the method is at `requestContext.http.method` and the path is `rawPath`. The `body` is always a string, possibly Base64-encoded when `isBase64Encoded` is true, so you parse it yourself. Handle missing fields deliberately: in a REST API event, `queryStringParameters` is null when no query string is sent, and in a 2.0 event the field is simply absent, so code that indexes into it without checking will throw.",
   "With a Lambda proxy integration, API Gateway passes the whole request to the function and expects a specific response object back: `statusCode` as a number, optional `headers` and `multiValueHeaders`, `body` as a string, and optional `isBase64Encoded` for binary content. You must serialize objects with `json.dumps` in Python or `JSON.stringify` in JavaScript. If you return a different shape, such as a raw object or a body that is a dictionary rather than a string, API Gateway cannot map it and the client receives a 502 Bad Gateway, while the API Gateway logs show a message such as Malformed Lambda proxy response. The function's own logs look clean, which is why this error confuses people.",
   "Cross-origin resource sharing (CORS) is a related trap. When a browser application on another domain calls a proxy integration, API Gateway passes the response through unchanged, so the function itself must return CORS headers such as `Access-Control-Allow-Origin` in every response, including error responses. For a REST API, enabling CORS in the API Gateway console handles the preflight `OPTIONS` request but does not add headers to responses that your proxy-integrated function returns.",
   "A few more good practices round out the topic. Use the context object's remaining-time method, `get_remaining_time_in_millis()` in Python or `getRemainingTimeInMillis()` in Node.js, to stop gracefully and save progress before the function times out. Log in structured JSON so Amazon CloudWatch Logs Insights can query fields easily. Keep deployment packages small to shorten cold starts. And avoid recursive patterns, such as a function triggered by uploads to a bucket prefix that writes its output back to the same prefix, which invokes itself in a loop and can run up a large bill."
  ],
  "analogy": "The init phase is like opening a food truck for the day: you fire up the grill and lay out the ingredients once, then serve many customers quickly. Starting the grill from cold for every order would be slow and wasteful, which is what creating a database connection inside the handler does. But each customer's order slip is thrown away after serving; you do not leave it on the counter for the next customer, which is what storing user data in a global variable does. Where the analogy stops: Lambda may close the truck at any time, so nothing at module level is guaranteed to survive.",
  "terms": [
   [
    "Handler",
    "The function Lambda calls for each invocation, receiving the event and the context object."
   ],
   [
    "Init phase",
    "The part of a cold start where Lambda loads code and runs initialization outside the handler, done once per execution environment."
   ],
   [
    "Lambda proxy integration",
    "An API Gateway integration that passes the full HTTP request to Lambda and expects a response with statusCode, headers and a string body."
   ],
   [
    "Context object",
    "The second handler argument, exposing the request ID, function name, memory limit and remaining execution time."
   ],
   [
    "Payload format version 2.0",
    "The HTTP API event format, which places the method at requestContext.http.method and the path at rawPath, and omits absent query strings."
   ],
   [
    "Cold start",
    "The extra latency of a new execution environment, including the init phase, before the handler runs for the first time."
   ]
  ],
  "example": "A team's API returns 502 errors after a refactor. The logs show the function now returns {'statusCode': 200, 'body': {'id': 7}}. Because the body is an object rather than a string, API Gateway rejects the response; wrapping it in json.dumps fixes the error.",
  "mistakes": [
   [
    "A 502 from an API Gateway proxy integration means the Lambda function crashed.",
    "Often the function succeeded but returned the wrong shape, such as a non-string body or a missing statusCode. Check that body is serialized and statusCode is a number."
   ],
   [
    "Creating SDK clients inside the handler is safer because each request gets a fresh client.",
    "It adds latency and can exhaust database connections. Create clients and connections outside the handler so warm invocations reuse them."
   ],
   [
    "Global variables are a good place to keep the current user's details between function calls.",
    "Environments are reused across different users, so request data in globals can leak between requests. Keep request-specific data inside the handler."
   ],
   [
    "Enabling CORS in the REST API console is enough for a Lambda proxy integration.",
    "With a proxy integration, the function must return CORS headers such as Access-Control-Allow-Origin in its responses."
   ]
  ],
  "tryit": [
   [
    "A Lambda function at Elmstead Realty processes photos uploaded to an S3 bucket. It works for most files but fails with NoSuchKey for files whose names contain spaces, such as front porch.jpg. What is wrong and how should the developer fix it?",
    "S3 event notifications URL-encode object keys, so the key arrives as front+porch.jpg. The function must URL-decode the key, for example with urllib.parse.unquote_plus in Python, before calling GetObject."
   ],
   [
    "A Node.js function behind an HTTP API at Thistle Games reads event.queryStringParameters.page. It works when the client sends ?page=2 but throws a TypeError when no query string is sent. Why, and what is the fix?",
    "In payload format 2.0, queryStringParameters is absent when there is no query string (in a REST API event it would be null), so reading .page on undefined throws. Guard the access, for example with optional chaining and a default value."
   ]
  ],
  "tip": "Expect a question where the fix for slow or connection-exhausting functions is moving client or connection creation outside the handler. A 502 from a proxy integration almost always means the response shape or string body is wrong.",
  "check": [
   [
    "Why initialize a database connection outside the handler?",
    "It runs once per execution environment and is reused by warm invocations, reducing latency and the number of connections opened."
   ],
   [
    "What must the body field be in a Lambda proxy response?",
    "A string; objects must be serialized, for example with JSON.stringify or json.dumps."
   ],
   [
    "Where is the query string found in a REST API proxy event, and what is its value when none is sent?",
    "In queryStringParameters, which is null when the request has no query string, so code must handle that case."
   ],
   [
    "Why can storing user data in a module-level variable cause a data leak?",
    "Lambda reuses execution environments across invocations, so a later request from a different user can read data left in the global variable."
   ]
  ]
 },
 {
  "t": "DynamoDB: partition and sort keys, Query vs Scan, LSI vs GSI, RCU/WCU math, consistency models, condition expressions, TTL, Streams, DAX",
  "hook": "Halcyon Games launched its new mobile puzzle app on Friday, and by Saturday the DynamoDB bill had jumped and players were complaining that the leaderboard took seconds to load. Sana, the developer on call, opens the code and finds the leaderboard runs a Scan across every score ever recorded and then filters for one game. A product manager asks for a new feature, finding all players by country, on a table that already exists. Finance asks why reads cost what they cost. And a tester reports that a score she just saved did not appear when she refreshed. Sana has one weekend to fix the design, do the math and explain consistency. Where should she start?",
  "simple": "DynamoDB is a database that stores items like rows in a giant, very fast filing system. Every item has a key, like a label on a folder. The first part of the key, the partition key, decides which drawer it goes in; an optional second part, the sort key, decides its order inside that drawer. Asking for one drawer and a range of folders is a Query, which is fast. Opening every drawer and checking every folder is a Scan, which is slow and costly. Indexes are extra filing systems sorted a different way. Capacity units are how you pay for reading and writing, and reads can be instantly up to date or a moment behind.",
  "body": [
   "Amazon DynamoDB is a serverless key-value and document database. It delivers consistent single-digit-millisecond performance at almost any scale, but only if you design around its keys. It is heavily tested on the AWS Certified Developer – Associate (DVA-C02) exam, including capacity arithmetic, so work through the numbers in this lesson rather than just reading them.",
   "Every table has a primary key, and it shapes everything else. A simple primary key is just a partition key. DynamoDB hashes the partition key value to choose the storage partition, so each value must be unique in the table. A composite primary key adds a sort key: many items can share a partition key, and within it they are stored sorted by the sort key. That enables range queries such as all orders for customer 42 between two dates. Choose a partition key with many distinct, evenly used values so traffic spreads across partitions instead of concentrating on a hot key. Individual items can be up to 400 kilobytes (KB).",
   "`Query` and `Scan` are the two ways to read many items, and the exam strongly favors one. `Query` finds items by partition key, which must be an exact match, and can narrow results by sort key conditions such as `=`, `<`, `between` and `begins_with`. It reads only the matching items, so it is efficient. `Scan` reads every item in the table or index and only then applies any filter, consuming capacity for everything read even when a `FilterExpression` discards most of it. Prefer Query; use Scan only for small tables, one-off exports or analytics, and speed up large scans with parallel scan segments. Note that `ProjectionExpression` limits which attributes are returned but not the capacity consumed, because the whole item is still read.",
   "Secondary indexes enable efficient queries on attributes other than the primary key. A local secondary index (LSI) keeps the same partition key as the table but uses a different sort key. It must be created when the table is created, it shares the table's capacity, and it supports strongly consistent reads. A global secondary index (GSI) can have a completely different partition key and sort key, can be added to an existing table at any time, has its own capacity settings, and supports only eventually consistent reads. GSIs are updated asynchronously from the base table. If a GSI's write capacity is too low to keep up, writes to the base table get throttled, a subtle cause of throttling that shows up in exam scenarios.",
   "Capacity math is where careful reading pays off. One read capacity unit (RCU) is one strongly consistent read per second of an item up to 4 KB, or two eventually consistent reads per second of that size. One write capacity unit (WCU) is one write per second of an item up to 1 KB. Always round the item size up to the next 4 KB for reads or the next 1 KB for writes first, then multiply by the number of operations per second. Transactional reads and writes cost double.",
   "Here are the worked examples. Ten strongly consistent reads per second of 6 KB items: 6 KB rounds up to 8 KB, which is 2 RCU per read, so 20 RCU. If those reads were eventually consistent, halve it to 10 RCU. Writing 5 items per second of 2.5 KB each: 2.5 KB rounds up to 3 KB, which is 3 WCU per write, so 15 WCU. These figures apply to provisioned capacity mode; on-demand mode bills per request and needs no capacity planning, but the same item-size rounding applies to how requests are measured.",
   "Consistency and conditional writes come next. Reads are eventually consistent by default and may briefly miss a write made a moment earlier; set `ConsistentRead=true` for strongly consistent reads, at double the RCU cost. Condition expressions make writes conditional: `attribute_not_exists(pk)` prevents overwriting an existing item, and `version = :expected` implements optimistic locking, where an update succeeds only if nobody changed the item since you read it. A failed condition raises `ConditionalCheckFailedException`, which your code should catch and handle. `UpdateItem` with `ADD` or `SET x = x + :inc` updates a counter atomically without reading it first, avoiding race conditions.",
   "Three features handle lifecycle, change capture and caching. Time to Live (TTL) deletes items after a timestamp stored in an attribute you name, as Unix epoch seconds, at no write cost. Deletion happens in the background, typically within a few days of expiry, so filter out expired items in queries if that matters. DynamoDB Streams records item-level changes, with a view type of keys only, new image, old image, or new and old images, and keeps them for 24 hours; it commonly triggers Lambda for replication, auditing, aggregation or notifications.",
   "DynamoDB Accelerator (DAX) is an in-memory cache that is API-compatible with DynamoDB, so applications switch to it with minimal code change. It brings eventually consistent reads down to microseconds for read-heavy, repeated access patterns. It does not help strongly consistent reads, which pass through to the table, and it does not help write-heavy workloads."
  ],
  "analogy": "A DynamoDB table is like a library organized by author. The partition key is the author's name, which tells you which shelf to walk to, and the sort key is the publication date, so books on that shelf are in order. A Query is walking to one author's shelf and pulling books from 2015 to 2020. A Scan is walking every aisle and checking every book. A GSI is a second catalog organized by subject. The analogy stops at cost: in DynamoDB you pay for every book you pick up during a Scan, even the ones you put back.",
  "terms": [
   [
    "Partition key",
    "The key attribute DynamoDB hashes to decide which partition stores an item."
   ],
   [
    "Global secondary index (GSI)",
    "An index with its own partition and sort key, addable any time, with separate capacity and eventually consistent reads only."
   ],
   [
    "Local secondary index (LSI)",
    "An index sharing the table's partition key with an alternate sort key; created only with the table."
   ],
   [
    "Read capacity unit (RCU)",
    "One strongly consistent read per second, or two eventually consistent reads, of an item up to 4 KB."
   ],
   [
    "Write capacity unit (WCU)",
    "One write per second of an item up to 1 KB."
   ],
   [
    "Condition expression",
    "A rule on a write, such as attribute_not_exists or a version check, that makes the write fail with ConditionalCheckFailedException if not met."
   ],
   [
    "DynamoDB Accelerator (DAX)",
    "An in-memory, DynamoDB API-compatible cache that serves eventually consistent reads in microseconds."
   ]
  ],
  "example": "A game stores scores with partition key playerId and sort key gameDate. To show a leaderboard for one game across all players, the developer adds a GSI with partition key gameId and sort key score, then runs a Query on the GSI with ScanIndexForward set to false.",
  "mistakes": [
   [
    "A FilterExpression reduces the read capacity a Scan or Query consumes.",
    "Capacity is consumed for every item read before the filter. Only better key design, a Query on the right key or an index reduces what is read."
   ],
   [
    "You can add an LSI to an existing table to support a new query.",
    "LSIs can only be created with the table. Use a GSI, which can be added at any time and can have a different partition key."
   ],
   [
    "For RCU math, divide the item size by 4 KB and keep the fraction.",
    "Round the item size up to the next 4 KB first, so a 6 KB item counts as 8 KB, or 2 RCU per strongly consistent read."
   ],
   [
    "DAX speeds up strongly consistent reads and heavy writes.",
    "DAX accelerates eventually consistent reads only. Strongly consistent reads go through to the table, and writes gain no speed."
   ]
  ],
  "tryit": [
   [
    "Kestrel Ride Share must support 40 strongly consistent reads per second of trip records that are 5 KB each, and 20 writes per second of 1.5 KB status updates, in provisioned mode. How many RCU and WCU are needed?",
    "Reads: 5 KB rounds up to 8 KB, which is 2 RCU per strongly consistent read, so 40 x 2 = 80 RCU. Writes: 1.5 KB rounds up to 2 KB, which is 2 WCU per write, so 20 x 2 = 40 WCU."
   ],
   [
    "Two clerks at Ashby Hardware edit the same product record at nearly the same time, and one clerk's price change silently overwrites the other's. How should the developer prevent lost updates?",
    "Use optimistic locking: store a version attribute, and make each update conditional with a condition expression such as version = :expected while incrementing the version. The second writer's update fails with ConditionalCheckFailedException, and the app can reload the item and retry."
   ]
  ],
  "tip": "For RCU/WCU questions, always round item size up to the next 4 KB (reads) or 1 KB (writes) before multiplying, then halve for eventually consistent reads or double for transactions.",
  "check": [
   [
    "How many RCUs do 20 eventually consistent reads per second of 9 KB items need?",
    "9 KB rounds to 12 KB, which is 3 RCU per strongly consistent read; eventually consistent halves it, so 20 x 3 / 2 = 30 RCU."
   ],
   [
    "You need a new query pattern on an existing table with a different partition key. LSI or GSI?",
    "A GSI, because it can use a different partition key and can be added to an existing table."
   ],
   [
    "Why is a Scan with a FilterExpression expensive?",
    "Capacity is consumed for every item read before the filter is applied, not just for items returned."
   ],
   [
    "How many WCU are needed to write 10 items per second of 3.5 KB each, in provisioned mode?",
    "3.5 KB rounds up to 4 KB, which is 4 WCU per write, so 10 x 4 = 40 WCU."
   ]
  ]
 },
 {
  "t": "Amazon S3 from code: multipart upload, storage classes and lifecycle, event notifications",
  "hook": "Lantern Films lets documentary crews upload raw footage straight from the field, and Rafael, the developer who built the uploader, is getting angry messages. A 12 GB upload from a crew in a remote valley failed at 97 percent and had to start over, twice. Finance has a separate question: the S3 bill keeps rising every month, but when anyone lists the bucket, the objects add up to far less than what is being charged. And the editors want new clips to start transcoding the moment they land, without anyone polling the bucket. Rafael has three problems that look unrelated. Are they?",
  "simple": "Amazon S3 is online storage for files, which it calls objects, kept in containers called buckets. Very large files are uploaded in pieces, like shipping a big couch in several boxes; if one box gets lost, you resend only that box, and S3 puts the pieces back together. Storage classes are like choosing between a closet, a basement and an off-site storage unit: cheaper places are slower or cost more each time you fetch something. Lifecycle rules move or delete files automatically after a set time, like a rule that says move last year's tax papers to the basement. Event notifications tell another program the moment a new file arrives, like a doorbell.",
  "body": [
   "Amazon Simple Storage Service (S3) stores objects, which are files plus metadata, in buckets, and each object is addressed by its key, the full name including any prefix such as `uploads/2024/clip.mp4`. As a developer you mostly call `PutObject`, `GetObject`, `ListObjectsV2` and `DeleteObject`. The AWS Certified Developer – Associate (DVA-C02) exam goes further and focuses on three areas: uploading large objects efficiently, choosing storage classes and automating their lifecycle, and reacting to changes in a bucket from code.",
   "Large uploads start with a hard limit. A single `PutObject` request can upload up to 5 gigabytes (GB). Multipart upload splits a large object into parts that are uploaded independently, and in parallel if you like, then assembled by S3 into one object. It is required for objects above 5 GB and recommended for objects over about 100 megabytes (MB), because it improves throughput and resilience. If one part fails because of a dropped connection, you retry only that part instead of restarting the whole upload, which is exactly what Lantern Films' field crews need.",
   "The multipart flow has three steps. `CreateMultipartUpload` starts the upload and returns an upload ID. `UploadPart` sends each part with a part number and the upload ID, and S3 returns an entity tag (ETag) for each part. Parts must be between 5 MB and 5 GB, except the last part, which can be smaller, and an upload can have up to 10,000 parts. Finally, `CompleteMultipartUpload` sends the list of part numbers and their ETags, and S3 assembles the object. `AbortMultipartUpload` cancels an upload and discards its parts. The SDKs' high-level transfer utilities, such as the Boto3 `upload_file` method, and the CLI's `aws s3 cp` handle all of this automatically above a size threshold.",
   "Incomplete multipart uploads explain Rafael's mysterious bill. If an upload is started but never completed or aborted, its parts remain stored, and billed, even though they do not appear as objects in a normal bucket listing. The fix is a lifecycle rule that aborts incomplete multipart uploads after a set number of days, which every bucket that receives large uploads should have.",
   "Two related features help with speed. For fast uploads from geographically distant clients, S3 Transfer Acceleration routes data through Amazon CloudFront edge locations and then over the AWS network to the bucket, using a special accelerated endpoint. For downloads, byte-range fetches, using the HTTP `Range` header on `GetObject`, retrieve specific parts of an object, so you can download a large file in parallel pieces or resume a failed download from where it stopped.",
   "Storage classes trade storage cost against access speed and retrieval cost, and you set the class per object with the `StorageClass` parameter. S3 Standard is for frequently accessed data. S3 Intelligent-Tiering moves objects between access tiers automatically based on how often they are used, which makes it a good choice when access patterns are unknown or change over time. S3 Standard-Infrequent Access (Standard-IA) and S3 One Zone-IA cost less to store but charge a fee per GB retrieved. One Zone-IA keeps data in a single Availability Zone, so use it only for data you can re-create, such as thumbnails generated from originals stored elsewhere.",
   "The archive classes are S3 Glacier Instant Retrieval, which still returns data in milliseconds for rarely accessed data, and S3 Glacier Flexible Retrieval and S3 Glacier Deep Archive. The latter two require a restore request, which takes minutes to hours depending on the class and retrieval option, before the data can be read with `GetObject`. Exam questions that mention long-term archives that are almost never read, with retrieval within hours being acceptable, point to these classes.",
   "Lifecycle configuration automates storage management with rules scoped by prefix or object tag. Transition actions move objects to cheaper classes after a number of days, for example to Standard-IA at 30 days and to Glacier Flexible Retrieval at 90 days. Expiration actions delete objects after a period, delete old noncurrent versions in versioned buckets, and abort incomplete multipart uploads. Lifecycle rules run automatically in the background, so you do not write cleanup scripts.",
   "S3 event notifications let code react to changes without polling. They fire when objects are created, removed, restored or replicated, and can be filtered by key prefix and suffix, for example `uploads/` and `.jpg`. Destinations are AWS Lambda, Amazon SQS and Amazon SNS, and the destination's resource-based policy must allow the S3 service to invoke or send to it. Alternatively, enable delivery of S3 events to Amazon EventBridge for richer filtering and many more targets. Notifications are typically delivered within seconds and can occasionally be delivered more than once, so handlers should be idempotent. Finally, avoid writing a function's output back into the prefix that triggers it, which creates an invocation loop; write to a different prefix or bucket."
  ],
  "analogy": "Multipart upload is like moving house with numbered boxes instead of trying to carry everything in one trip. Each box travels separately, several can be on the road at once, and if one truck breaks down you resend only that box. When every box arrives, the movers unpack them in number order. Incomplete multipart uploads are boxes sitting in a storage unit you forgot about: you keep paying rent until you tell someone to throw them out, which is what the abort lifecycle rule does.",
  "mnemonic": "For the multipart flow, think Create, Upload, Complete: CUC. CreateMultipartUpload returns the upload ID, UploadPart sends each numbered part and returns its ETag, and CompleteMultipartUpload assembles them. If you need to cancel instead of complete, AbortMultipartUpload replaces the last step.",
  "terms": [
   [
    "Multipart upload",
    "Uploading an object as separately uploaded parts that S3 assembles; required above 5 GB and recommended for large files."
   ],
   [
    "Lifecycle rule",
    "A bucket configuration that transitions objects to other storage classes or expires them after set periods."
   ],
   [
    "S3 Intelligent-Tiering",
    "A storage class that automatically moves objects between access tiers based on how often they are accessed."
   ],
   [
    "Event notification",
    "An S3 feature that sends object-level events to Lambda, SQS, SNS or EventBridge, optionally filtered by prefix and suffix."
   ],
   [
    "S3 Transfer Acceleration",
    "A bucket feature that speeds long-distance uploads by routing them through CloudFront edge locations over the AWS network."
   ],
   [
    "Byte-range fetch",
    "A GetObject request with a Range header that retrieves part of an object, enabling parallel or resumable downloads."
   ]
  ],
  "example": "A video platform uploads 20 GB files from a mobile app. It uses multipart upload with 100 MB parts in parallel, so a dropped connection only retries one part. An ObjectCreated notification filtered to the suffix .mp4 sends a message to an SQS queue that transcoding workers consume, and a lifecycle rule moves originals to Glacier Flexible Retrieval after 90 days.",
  "mistakes": [
   [
    "A single PutObject can upload any file if the network is fast enough.",
    "PutObject is limited to 5 GB. Larger objects must use multipart upload, which is also recommended above about 100 MB."
   ],
   [
    "If no objects appear in a listing, there is nothing to pay for.",
    "Parts of incomplete multipart uploads are stored and billed but not listed as objects. Add a lifecycle rule to abort incomplete multipart uploads."
   ],
   [
    "S3 One Zone-IA is a good cheap home for the only copy of important records.",
    "One Zone-IA stores data in a single Availability Zone, so it suits only re-creatable data. Use Standard-IA or Intelligent-Tiering for data that must survive an AZ loss."
   ],
   [
    "Objects in Glacier Flexible Retrieval can be read immediately with GetObject.",
    "Glacier Flexible Retrieval and Deep Archive require a restore request that takes minutes to hours first. Glacier Instant Retrieval is the archive class with millisecond access."
   ]
  ],
  "tryit": [
   [
    "Birchwood Labs stores instrument data in S3. Each file is read heavily for about a month, occasionally for the next few months, and must then be kept for seven years in case of an audit, when a retrieval taking up to a day is acceptable. Which lifecycle rules should the developer configure?",
    "Keep new objects in S3 Standard, transition them to Standard-IA after 30 days, and transition them to Glacier Deep Archive after a few months, with an expiration action after seven years. Also add a rule to abort incomplete multipart uploads. Deep Archive suits rarely accessed data where hours of restore time is acceptable."
   ],
   [
    "A developer at Moorland Press configures an S3 event notification on a bucket to invoke a Lambda function for new .pdf files, but the function is never invoked, and the console reported an error when saving the notification. What is most likely missing?",
    "The Lambda function's resource-based policy must allow s3.amazonaws.com to invoke it, scoped to that bucket. Without that permission, S3 cannot validate or deliver to the destination. Adding the permission, for example with aws lambda add-permission, fixes it."
   ]
  ],
  "tip": "Uploads over 5 GB must use multipart upload. Remember the lifecycle rule to abort incomplete multipart uploads when a question asks why storage costs keep growing with no visible objects.",
  "check": [
   [
    "What three API calls make up a multipart upload?",
    "CreateMultipartUpload, UploadPart for each part, then CompleteMultipartUpload (or AbortMultipartUpload to cancel)."
   ],
   [
    "Which storage class suits data with unpredictable access patterns?",
    "S3 Intelligent-Tiering, which moves objects between tiers automatically based on access."
   ],
   [
    "What must be in place for S3 to invoke a Lambda function on upload?",
    "An event notification configuration on the bucket and a resource-based policy on the function allowing s3.amazonaws.com to invoke it."
   ],
   [
    "What lifecycle action stops storage costs from growing because of abandoned uploads?",
    "An expiration action that aborts incomplete multipart uploads after a set number of days."
   ]
  ]
 },
 {
  "t": "Caching strategies with ElastiCache: lazy loading, write-through, TTLs; choosing between SQL, NoSQL and in-memory stores",
  "hook": "Every weekday at 9 a.m. the Morning Ledger, a regional news site, publishes its top story, and every weekday at 9:01 the Aurora database behind it groans as tens of thousands of readers request the same article. Ines, the lead developer, adds a cache and the site flies, until an editor corrects a wrong headline and readers keep seeing the old one for an hour. A colleague suggests updating the cache on every write instead, but another warns the cache will fill with articles nobody reads. Then someone asks whether the comment system should move to DynamoDB, and whether the cache could just replace the database entirely. Which strategy, which engine, which store?",
  "simple": "A cache is a small, very fast memory that keeps copies of things people ask for often, like keeping your most-used spices on the counter instead of in the basement pantry. Lazy loading means you only put a spice on the counter after someone asks for it once. Write-through means every time you buy a spice, you put a copy on the counter right away. A TTL, short for time to live, is an expiration sticker that says toss this after ten minutes, so old copies do not hang around. Different stores suit different jobs: a relational database for related tables and complex questions, NoSQL for huge scale with simple lookups, and memory for speed.",
  "body": [
   "A cache keeps frequently read data in fast memory so your application does not hit the database for every request. That lowers latency for users and reduces load and cost on the database. Amazon ElastiCache is a managed in-memory service that runs the Redis OSS, Valkey or Memcached engines, handling provisioning, patching and failover for you. The AWS Certified Developer – Associate (DVA-C02) exam asks how to populate and expire a cache, which engine to pick, and when a different type of data store is the right choice altogether.",
   "Lazy loading, also called cache-aside, loads data into the cache only when it is requested. The application checks the cache first. On a cache hit it returns the value straight away. On a cache miss it reads from the database, writes the result into the cache, and returns it. The advantages are that only data someone actually requested takes up memory, and a failed cache node is not fatal, because the application simply falls back to the database while a replacement node warms up.",
   "Lazy loading has two drawbacks. Every miss costs three trips, to the cache, the database and the cache again, so the first request for each item is slower than with no cache at all. And cached data can become stale, because nothing updates the cache when the database changes; the old value stays until it expires or is evicted. The following Python function shows the pattern with a five-minute TTL set when the value is written.",
   "```python\ndef get_product(pid):\n    cached = cache.get(f'product:{pid}')\n    if cached:\n        return json.loads(cached)\n    item = db_get_product(pid)\n    cache.set(f'product:{pid}', json.dumps(item), ex=300)  # 5-minute TTL\n    return item\n```",
   "Write-through takes the opposite approach: the application updates the cache whenever it writes to the database. Data in the cache is never stale, and reads of recently written data are always fast. The costs are a write penalty, since every update now performs two writes, and cache churn, because much of what you write may never be read, wasting memory. Write-through also leaves data missing from the cache until it is written, so a new or replaced node starts empty. That is why write-through is usually combined with lazy loading: writes keep hot items fresh, and lazy loading fills in anything that is missing.",
   "A time to live (TTL) on each key limits both staleness and memory use. When a key expires, the next read is a miss and reloads fresh data from the database. Short TTLs mean fresher data but more database load; long TTLs mean less load but older data. Adding a little random variation to TTLs prevents many keys from expiring at the same moment and sending a burst of misses to the database. When memory fills up, the engine evicts keys according to its eviction policy, such as least recently used (LRU), so watch eviction counts in Amazon CloudWatch; frequent evictions suggest the cache is too small.",
   "Engine choice follows from requirements. Redis OSS and Valkey support rich data structures, including sorted sets for leaderboards, hashes, lists and counters, as well as replication with automatic failover across Availability Zones, persistence, backups and publish/subscribe messaging. Memcached is simpler, multi-threaded and partitions data horizontally across nodes, but has no replication or persistence, so a node failure loses its data. If a question mentions high availability, sorted leaderboards, or session stores that must survive a node failure, pick Redis OSS or Valkey. If it emphasizes the simplest possible cache for objects with multi-threaded performance, Memcached fits.",
   "Choosing the data store itself is a related exam skill. Use a relational database, such as Amazon Relational Database Service (RDS) or Amazon Aurora, when you need Structured Query Language (SQL) joins, complex ad hoc queries and multi-row transactions over structured data with a fixed schema. Use a NoSQL store such as Amazon DynamoDB when access patterns are known in advance, scale is massive, latency must be single-digit milliseconds, and the schema should be flexible.",
   "Use an in-memory store, either ElastiCache or DynamoDB Accelerator (DAX) in front of DynamoDB, for microsecond to sub-millisecond reads of hot data, session state, rate-limiting counters and leaderboards. In-memory stores usually sit in front of a durable database rather than replacing it, because memory is expensive and, depending on the engine and configuration, data may not survive a failure. On the exam, an answer that uses a cache as the only copy of important data is usually a distractor."
  ],
  "analogy": "Lazy loading is like a coffee shop that brews a flavor only after the first customer asks for it, then keeps the pot warm for the next people. Write-through is brewing every new flavor the moment it arrives from the supplier, even ones nobody orders. The TTL is the rule to pour out any pot older than twenty minutes so nobody gets stale coffee. The analogy stops working on failure: if the warm pots disappear, the shop still has its beans in the back, just as the database still holds the data when a cache node fails.",
  "terms": [
   [
    "Lazy loading (cache-aside)",
    "A strategy that populates the cache only on a cache miss, after reading from the database."
   ],
   [
    "Write-through",
    "A strategy that writes to the cache every time the database is updated, keeping cached data current."
   ],
   [
    "TTL (time to live)",
    "An expiry time on a cache key after which it is removed and reloaded on the next read."
   ],
   [
    "Cache hit ratio",
    "The proportion of reads served from the cache; a low ratio suggests poor keys, short TTLs or too small a cache."
   ],
   [
    "Cache miss",
    "A read where the requested key is not in the cache, so the application must fetch from the database."
   ],
   [
    "Eviction policy",
    "The rule an in-memory engine uses to remove keys when memory is full, such as least recently used (LRU)."
   ]
  ],
  "example": "A news site reads article pages from Aurora. It adds ElastiCache for Valkey with lazy loading and a 10-minute TTL, so popular articles are served from memory. When an editor updates an article, the CMS also writes the new version to the cache (write-through), so readers never see a stale headline.",
  "mistakes": [
   [
    "Lazy loading keeps the cache perfectly up to date.",
    "Lazy loading only refreshes data on a miss, so cached values can be stale until they expire. Add write-through or shorter TTLs to reduce staleness."
   ],
   [
    "Write-through alone is ideal because data is never stale.",
    "Write-through caches every write, including rarely read data, and new nodes start empty. Combine it with lazy loading and TTLs."
   ],
   [
    "Memcached is the right engine for a highly available session store.",
    "Memcached has no replication or persistence. Redis OSS or Valkey provide replication, automatic failover and persistence."
   ],
   [
    "An in-memory cache can replace the database to save money.",
    "Caches usually sit in front of a durable database. Memory is costly and may not be durable, so the database remains the source of truth."
   ]
  ],
  "tryit": [
   [
    "Pemberton Sports runs a fantasy league app whose leaderboard ranks hundreds of thousands of players by points and updates constantly. Users complain it is slow, and the team needs the leaderboard to survive a cache node failure. Which caching solution fits?",
    "ElastiCache for Redis OSS or Valkey with replication and Multi-AZ automatic failover, using a sorted set keyed by points. Sorted sets return top-ranked players efficiently, and replication keeps the data available if a node fails. Memcached lacks sorted sets and replication."
   ],
   [
    "Users of Dunmore Bank's offers page sometimes see an expired promotion for up to an hour after marketing removes it. The page uses lazy loading with a one-hour TTL. What are two reasonable fixes?",
    "Shorten the TTL so stale entries expire sooner, and update or delete the cache entry whenever marketing changes an offer, which adds write-through behavior. Combining both keeps the page fresh without sending every read to the database."
   ]
  ],
  "tip": "Stale data complaint: add write-through or shorten the TTL. Cache filling with data nobody reads: that is write-through churn, so combine it with TTLs. Need replication, failover or sorted sets: Redis OSS or Valkey, not Memcached.",
  "check": [
   [
    "What is the main drawback of lazy loading?",
    "Data can become stale because the cache is only updated on a miss, and every miss adds latency from extra round trips."
   ],
   [
    "Why combine write-through with a TTL?",
    "Write-through caches every write, including rarely read data; a TTL expires unused keys so memory is not wasted."
   ],
   [
    "When would you choose ElastiCache for Redis OSS over Memcached?",
    "When you need replication and automatic failover, persistence, backups or advanced data structures such as sorted sets."
   ],
   [
    "A workload needs joins across several tables and ad hoc reporting queries. Which type of store fits?",
    "A relational database such as Amazon RDS or Aurora, because it supports SQL joins, complex ad hoc queries and multi-row transactions."
   ]
  ]
 },
 {
  "t": "IAM for applications: execution roles, instance profiles, ECS task roles, least-privilege policies, policy evaluation (explicit deny wins)",
  "hook": "It is Tuesday afternoon at Lantern Freight, and Priya has just moved the shipment-tracking service from a laptop prototype to Amazon ECS on Fargate. The first container starts, the first request arrives, and the logs fill with `AccessDeniedException` every time the code tries to write to the Shipments table. She checks the console: the role she attached has full DynamoDB access. A teammate suggests pasting an access key into an environment variable just to get the demo working. Priya hesitates. The permissions look right, so why is AWS saying no, and is a hardcoded key really the only way out?",
  "simple": "Programs that run in AWS need permission to touch other AWS things, like saving a file or reading a database row. Instead of giving a program a permanent password, AWS gives it a role: a badge with a list of allowed actions. The program borrows the badge and gets a short-lived pass that refreshes on its own. Each kind of compute has its own badge slot. Good practice is to put only the exact actions the program needs on the badge. When AWS decides yes or no, it starts at no, looks for a yes, and any written 'definitely not' beats every yes. It is like a building where your key card opens only your floor, and a 'closed for repairs' sign overrides any key card.",
  "body": [
   "Applications need permissions just as people do, and AWS Identity and Access Management (IAM) provides them through roles. A role is an identity with permission policies but no long-term password or access keys. Whoever is allowed to assume it receives temporary credentials from the AWS Security Token Service (STS): an access key ID, a secret access key and a session token that expire and are refreshed automatically. Giving your code a role, rather than embedding an IAM user's access keys, is the pattern the exam expects every time, because temporary credentials cannot leak into a repository in a form that works forever, and there is nothing to rotate by hand.",
   "Each compute service has its own way to attach a role, and the exam tests that you know which slot is which. A Lambda execution role is assumed by the Lambda service on the function's behalf. Its trust policy allows the principal `lambda.amazonaws.com`, and its permissions policies decide what the function code can call. At minimum it needs permission to create log streams and write log events to Amazon CloudWatch Logs, which is exactly what the `AWSLambdaBasicExecutionRole` managed policy contains. If the function reads from Amazon Simple Queue Service (SQS), Amazon Kinesis or DynamoDB Streams through an event source mapping, the execution role also needs the matching read permissions, because Lambda polls those sources using this role.",
   "For Amazon Elastic Compute Cloud (EC2), a role is attached through an instance profile, a container for the role that the instance exposes through the instance metadata service. You rarely see the instance profile as a separate thing in the console, because creating an EC2 role there creates a matching profile behind the scenes, but the term appears in CLI commands and in CloudFormation as `AWS::IAM::InstanceProfile`. The SDK default credential provider chain picks up the credentials from the metadata service automatically and refreshes them before they expire, so the application code contains no credentials at all.",
   "For Amazon Elastic Container Service (ECS) there are two roles, and mixing them up is a classic trap. The task role gives the application containers their AWS permissions: if your code calls S3 or DynamoDB, that permission belongs on the task role. The task execution role is used by the ECS agent, not your code, to pull images from Amazon Elastic Container Registry (ECR), send container logs to CloudWatch Logs and fetch secrets referenced in the task definition. A container that fails with AccessDenied when calling DynamoDB, while the execution role has broad DynamoDB access, almost always has the permission on the wrong role.",
   "Least privilege means granting only the actions and resources the code actually needs. A policy statement has `Effect` (Allow or Deny), `Action`, `Resource` and an optional `Condition`. Instead of `dynamodb:*` on `*`, grant `dynamodb:GetItem` and `dynamodb:PutItem` on the Amazon Resource Name (ARN) of one table, as in the policy below. Conditions narrow access further, for example by source VPC endpoint, by resource tag, or by requiring encryption. The payoff is a smaller blast radius: if the function is compromised or has a bug, it can only touch one table in two ways.",
   "```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": [\"dynamodb:GetItem\", \"dynamodb:PutItem\"],\n    \"Resource\": \"arn:aws:dynamodb:us-east-1:111122223333:table/Orders\"\n  }]\n}\n```",
   "Policy evaluation within one account follows a short, predictable logic. Every request starts as implicitly denied. AWS then gathers all applicable policies: identity-based policies, resource-based policies, permissions boundaries, session policies, and service control policies (SCPs) from AWS Organizations. If any applicable policy has an explicit `Deny` that matches the request, the request is denied, no matter how many Allows exist. Otherwise, if an Allow grants the action, and no boundary, SCP or session policy limits it, the request is allowed. If nothing allows it, the implicit deny stands. The order to remember is: explicit deny beats allow, and allow beats the default implicit deny. Boundaries, SCPs and session policies never grant anything themselves; they only cap what other policies can grant.",
   "Managed and inline policies differ in how they are reused. Managed policies, whether AWS managed or customer managed, are standalone objects that can be attached to many roles and keep a version history, so you can roll back a change. Inline policies are embedded in a single role or user and are deleted with it, which suits a strict one-to-one relationship. Permissions boundaries set the maximum permissions an identity-based policy can grant, which is useful when developers are allowed to create roles for their own functions without being able to escalate beyond an approved ceiling.",
   "When something is denied, troubleshoot methodically. Read the `AccessDenied` error message first: many services now name the principal, the missing action, and the type of policy that blocked the request, such as an SCP or an explicit deny in an identity-based policy. Confirm which identity the code is actually using with `aws sts get-caller-identity`, which is how you catch the wrong-ECS-role mistake. Then test the policy with the IAM policy simulator, which evaluates a principal's policies against a chosen action and resource and shows which statement allowed or denied it."
  ],
  "analogy": "Think of a hotel. The role is a key card program, not a physical key you keep forever: the front desk (STS) encodes a card that stops working at checkout, and you can get a new one any time you are still a guest. Policies are the list of doors the card opens. An explicit deny is a 'closed for maintenance' lock on a door that no card can open, however senior. The analogy stops working in one place: a hotel card is handed to a person, while an IAM role is assumed by a service or code, and each compute type has its own card slot.",
  "terms": [
   [
    "Execution role",
    "The IAM role a Lambda function assumes to get temporary credentials for calling other AWS services, including writing its logs."
   ],
   [
    "Instance profile",
    "A container that attaches an IAM role to an EC2 instance so applications on it receive temporary credentials through the instance metadata service."
   ],
   [
    "ECS task role",
    "The IAM role whose permissions the application containers in an ECS task use, distinct from the task execution role."
   ],
   [
    "ECS task execution role",
    "The IAM role the ECS agent uses to pull container images from ECR, send logs and retrieve referenced secrets."
   ],
   [
    "Explicit deny",
    "A policy statement with Effect Deny that overrides any Allow for matching requests."
   ],
   [
    "Implicit deny",
    "The default result for any request that no policy allows."
   ],
   [
    "Least privilege",
    "Granting only the specific actions and resources needed to perform a task."
   ],
   [
    "Permissions boundary",
    "A managed policy that sets the maximum permissions an identity-based policy can grant to a user or role."
   ]
  ],
  "example": "A containerized service on Fargate fails with AccessDenied when writing to S3, even though the task execution role has AmazonS3FullAccess. The developer runs `aws sts get-caller-identity` from inside the container and sees the task role's ARN, not the execution role's. The application uses the task role, so the developer removes the broad S3 policy from the execution role and attaches a policy allowing only `s3:PutObject` on the one bucket's objects to the task role instead.",
  "mistakes": [
   [
    "Putting the application's AWS permissions on the ECS task execution role.",
    "The execution role is for the ECS agent (image pulls, logs, secrets injection). The code inside the container uses the task role, so DynamoDB, S3 or SQS permissions belong there."
   ],
   [
    "Storing an IAM user's access keys on an EC2 instance or in a Lambda environment variable because it is 'quicker'.",
    "Keys on disk or in variables are long-lived and leak easily. Attach a role (instance profile, execution role or task role) and let the SDK credential chain fetch temporary credentials."
   ],
   [
    "Thinking a more specific Allow can override a Deny.",
    "No Allow, however specific, overrides a matching explicit Deny. Explicit deny always wins, and the only fix is to change or remove the Deny or narrow its scope."
   ],
   [
    "Believing a permissions boundary or SCP grants permissions.",
    "Boundaries and SCPs only limit. An action must also be allowed by an identity-based or resource-based policy to succeed."
   ]
  ],
  "tryit": [
   [
    "Diego's Lambda function processes messages from an SQS queue. The function code works in tests, but after he creates the event source mapping, the console shows an error that Lambda cannot receive messages from the queue. The queue has no special queue policy. Where should Diego add permissions, and which ones?",
    "Add `sqs:ReceiveMessage`, `sqs:DeleteMessage` and `sqs:GetQueueAttributes` on that queue's ARN to the function's execution role. With SQS, Lambda polls the queue on the function's behalf using the execution role, so no change to the function's resource-based policy is needed."
   ],
   [
    "A developer's role has an identity policy allowing `s3:*` on all resources. A permissions boundary on the same role allows only `s3:GetObject` and `s3:PutObject`. Can the role delete objects?",
    "No. The effective permissions are the intersection of the identity policy and the boundary. `s3:DeleteObject` is not in the boundary, so it is not allowed even though the identity policy includes it."
   ]
  ],
  "tip": "If a question shows both an Allow and a Deny for the same action, the answer is denied. If it asks how an app on EC2 should get credentials, pick an IAM role through an instance profile, never access keys on the instance. For ECS, application permissions go on the task role.",
  "check": [
   [
    "Which role lets an ECS container call DynamoDB, and which lets ECS pull the image from ECR?",
    "The task role grants the application's permissions; the task execution role lets the ECS agent pull images and write logs."
   ],
   [
    "A user has an identity policy allowing s3:* and an SCP denies s3:DeleteBucket. Can they delete a bucket?",
    "No; the explicit deny in the SCP overrides the allow."
   ],
   [
    "What does a Lambda execution role need at minimum?",
    "Permission to create log streams and write log events to CloudWatch Logs, as in AWSLambdaBasicExecutionRole."
   ],
   [
    "How does an application on EC2 receive its role credentials?",
    "Through the instance profile, which exposes temporary credentials via the instance metadata service; the SDK credential chain retrieves and refreshes them."
   ]
  ]
 },
 {
  "t": "Resource-based policies: Lambda permissions for S3/SNS/API Gateway, S3 bucket policies, KMS key policies",
  "hook": "At Juniper Health Analytics, Sam wires up a new feature before lunch: when a lab report lands in the uploads bucket, a Lambda function should extract the results. He created the trigger with a CloudFormation template, the execution role has every S3 permission he can think of, and the function works perfectly when he tests it by hand. Yet files keep arriving and the function's invocation count stays at zero. Down the hall, Rosa reports a different puzzle: her administrator account cannot decrypt data with a KMS key a contractor created last year. Both of them have generous IAM permissions. What is missing?",
  "simple": "Most permissions in AWS are written on the person or program: 'this role may do these things'. Some permissions are written on the thing being used instead: 'these callers may use me'. That second kind is a resource-based policy. When S3 or SNS wants to start your Lambda function, it does not borrow your function's role, so the function itself must say 'S3 may call me'. An S3 bucket can carry rules like 'only allow HTTPS'. An encryption key in KMS always carries its own rules, and if those rules do not mention you, even an administrator is turned away. Think of a private club: your ID card matters, but so does the guest list at the door.",
  "body": [
   "Identity-based policies are attached to a user or role and say what that identity can do. Resource-based policies are attached to a resource and say who can access it. The visible difference is the `Principal` element: a resource-based policy names who is allowed, which can be an AWS account, a specific role, or an AWS service such as `s3.amazonaws.com`. Many integration errors on the DVA-C02 exam come down to a missing resource-based policy, so whenever one AWS service needs to act on another, ask which side holds the permission.",
   "A Lambda function's resource-based policy, usually called its function policy, controls which services and accounts may invoke it. When Amazon S3, Amazon Simple Notification Service (SNS), Amazon EventBridge or Amazon API Gateway invokes a function, those services do not assume your execution role. They need permission on the function itself. You add it with `aws lambda add-permission`, and the console adds it automatically when you configure a trigger there, which is why a trigger built in the console works while the same trigger built by a script or template can silently fail. Infrastructure as code tools need an explicit resource such as `AWS::Lambda::Permission`.",
   "Scope each function policy statement with conditions. Use `SourceArn` so only your specific bucket, topic, rule or API can invoke the function, and for S3 also use `SourceAccount`, because bucket ARNs do not include an account ID and a bucket name could later be owned by someone else. These conditions prevent the confused deputy problem, where another customer's resource causes a trusted AWS service to invoke your function. The command below grants S3 permission for one bucket in one account.",
   "```bash\naws lambda add-permission \\\n  --function-name resize-image \\\n  --statement-id s3-invoke \\\n  --action lambda:InvokeFunction \\\n  --principal s3.amazonaws.com \\\n  --source-arn arn:aws:s3:::my-upload-bucket \\\n  --source-account 111122223333\n```",
   "For API Gateway, the principal is `apigateway.amazonaws.com` and the source ARN is the API's `execute-api` ARN, which can be scoped to a stage, HTTP method and resource path. When a stage variable points to different function aliases, each alias is a separate resource and needs its own permission statement. A missing permission shows up as an HTTP 500 error from API Gateway, with a message about invalid permissions on the Lambda function in the execution logs. For SQS, Amazon Kinesis and DynamoDB Streams event sources it is the opposite: Lambda polls them through an event source mapping, so the execution role needs read permissions on the source and no function policy statement is required. Remember the split as push sources versus poll sources.",
   "Amazon S3 bucket policies are JSON policies attached to a bucket. They can grant access to other accounts, enforce conditions for everyone, and restrict where requests come from. Common patterns include denying any request where `aws:SecureTransport` is false so only HTTPS is accepted, denying `s3:PutObject` without the required server-side encryption header, and allowing access only through a specific VPC endpoint using the `aws:SourceVpce` condition, or only from certain IP ranges with `aws:SourceIp`. Within one account, access is granted if either the identity policy or the bucket policy allows it and nothing explicitly denies it. Cross-account access requires both sides to allow it: the bucket policy must name the other account or role, and that principal's identity policy must allow the S3 actions. S3 Block Public Access settings sit above all of this and override bucket policies or access control lists that would make data public.",
   "AWS Key Management Service (KMS) key policies are special and appear often in exam questions. Every KMS key must have exactly one key policy, and it is the primary access control. IAM policies grant access to a key only if the key policy allows IAM to be used, typically through the default statement that gives the account principal (`arn:aws:iam::111122223333:root`) full access. That statement does not mean only the root user can use the key; it delegates to IAM, so IAM policies in the account start to count. If a key policy lacks that statement and does not name a user, even an administrator with `kms:*` in an IAM policy cannot use the key.",
   "For cross-account KMS use, both sides must agree again: the key policy must name the other account or a role in it, and that account's IAM policies must also allow the KMS actions, such as `kms:Decrypt` or `kms:GenerateDataKey`, on the key's ARN. Grants are an additional mechanism for temporary, programmatic delegation of key use, often created by AWS services such as Amazon EBS on your behalf; they can be created and retired without editing the key policy. When troubleshooting any of these resource-based policies, compare the principal, action, resource and conditions in the policy against the exact request shown in the error or in AWS CloudTrail."
  ],
  "analogy": "An identity-based policy is like a staff badge that lists the rooms you may enter. A resource-based policy is the guest list taped to one particular door. Some doors (Lambda functions invoked by S3, SNS or API Gateway) only check the guest list, because the visitor is a delivery service with no staff badge. KMS keys are like a vault whose own list is the final word: a badge only works if the vault's list says 'honor badges from this company'. The analogy stops working for cross-account access, where both the badge and the guest list must agree.",
  "mnemonic": "Push needs a Policy on the function; Poll needs Permissions on the role. S3, SNS, EventBridge and API Gateway push; SQS, Kinesis and DynamoDB Streams are polled.",
  "terms": [
   [
    "Resource-based policy",
    "A policy attached to a resource that names the principals allowed to access it."
   ],
   [
    "Principal",
    "The element in a resource-based policy that identifies the account, role, user or service being granted or denied access."
   ],
   [
    "Function policy",
    "The resource-based policy on a Lambda function that authorizes services or accounts to invoke it."
   ],
   [
    "Bucket policy",
    "A resource-based policy on an S3 bucket controlling access and enforcing conditions for requests to it."
   ],
   [
    "Key policy",
    "The mandatory resource-based policy on a KMS key; IAM policies only work if it allows them."
   ],
   [
    "Grant",
    "A KMS mechanism for delegating use of a key to a principal, often an AWS service, without changing the key policy."
   ],
   [
    "Confused deputy",
    "A situation where a trusted service is tricked into acting for the wrong party, prevented with SourceArn and SourceAccount conditions."
   ]
  ],
  "example": "A developer creates an SNS topic subscription to a Lambda function using the CLI, but messages never trigger it. The topic's delivery metrics show failures, and the function policy has no statement allowing `sns.amazonaws.com`. Running `aws lambda add-permission` with `--principal sns.amazonaws.com` and the topic's ARN as the source ARN fixes delivery, and only that topic can invoke the function.",
  "mistakes": [
   [
    "Adding `lambda:InvokeFunction` to the execution role so S3 can trigger the function.",
    "The execution role controls what the function can do, not who can call it. S3 needs a statement in the function's resource-based policy, added with add-permission or AWS::Lambda::Permission."
   ],
   [
    "Adding a function policy for an SQS trigger.",
    "SQS, Kinesis and DynamoDB Streams are polled by Lambda using the execution role. The fix is read permissions on the execution role, not a function policy."
   ],
   [
    "Assuming an administrator's IAM policy always works on any KMS key.",
    "The key policy is the primary control. If it does not allow the account (delegating to IAM) or the user directly, IAM permissions are ignored for that key."
   ],
   [
    "Thinking a bucket policy alone is enough for cross-account access.",
    "Cross-account requests need both an allow in the bucket policy and an allow in the caller's identity policy in their own account."
   ]
  ],
  "tryit": [
   [
    "Mei builds an API Gateway REST API with a stage variable that selects either the `blue` or `green` alias of a Lambda function. The `blue` stage works, but requests to the `green` stage return HTTP 500, and execution logs mention invalid permissions on the Lambda function. Nothing else differs. What should Mei do?",
    "Add a function policy statement for the `green` alias, with principal `apigateway.amazonaws.com` and a source ARN for the API. Each alias is a distinct resource, so the permission granted for `blue` does not cover `green`."
   ],
   [
    "A partner account needs to read objects from your bucket `reports-prod`. You add a bucket policy granting their account `s3:GetObject`, but their developers still get AccessDenied. The objects are not encrypted with KMS. What is the most likely missing piece?",
    "The partner's own IAM policy for their role or user must also allow `s3:GetObject` on your bucket's objects. Cross-account access requires an allow on both sides."
   ]
  ],
  "tip": "Push-based sources (S3, SNS, API Gateway, EventBridge) need permission in the function's resource-based policy. Poll-based sources (SQS, Kinesis, DynamoDB Streams) need permissions in the execution role. For KMS, the key policy is checked first.",
  "check": [
   [
    "Why does S3 need a Lambda function policy but SQS does not?",
    "S3 invokes the function directly, so the function must allow the S3 principal; with SQS, Lambda polls the queue using the execution role's permissions."
   ],
   [
    "An admin with full IAM permissions cannot use a KMS key. Why might that be?",
    "The key policy does not allow the account principal or the admin, so IAM policies are not honored for that key."
   ],
   [
    "How can you force all S3 access to a bucket to use HTTPS?",
    "Add a bucket policy that denies all actions when the condition aws:SecureTransport is false."
   ],
   [
    "Why should an S3 trigger's permission include SourceAccount as well as SourceArn?",
    "Bucket ARNs do not contain an account ID, so SourceAccount ensures only a bucket in your account can invoke the function, preventing confused deputy issues."
   ]
  ]
 },
 {
  "t": "Cross-account access with STS AssumeRole and trust policies; temporary credentials",
  "hook": "Kenji maintains the deployment pipeline at Copperline Games. The build system lives in a tools account, and production lives in a separate, locked-down account. Today the security team sends a message: an audit found an IAM user named deploy-bot in production whose access keys are four years old and stored as a pipeline secret. They want it gone by Friday, with no loss of deployments. Kenji wonders how the pipeline can deploy into an account where it has no user at all, and how anyone will later tell which pipeline run made which change.",
  "simple": "Companies often keep separate AWS accounts, like separate houses for testing and for real customers. Sometimes a program in one house needs to do a job in another. Instead of handing it a permanent key to the second house, the second house sets up a role, which is a job description with a list of allowed tasks, plus a note saying who may take that job. The program asks a token service for a temporary pass to that role. The pass works for a limited time, usually an hour, then expires. Both sides must agree: the second house must trust the program, and the program must be allowed to ask. It is like a contractor getting a day pass at a front desk instead of a permanent key.",
  "body": [
   "Organizations run many AWS accounts, and applications often need to reach resources in another account: a build pipeline deploying to production, a reporting job reading a data account's bucket, or a central monitoring tool collecting metrics. The standard, secure way to do this is for the caller to assume a role in the target account and receive short-lived credentials. Creating IAM users with long-term access keys in every account is the pattern the exam wants you to replace, because those keys never expire on their own, must be rotated by hand, and are easy to leak.",
   "Two policies on the target role make cross-account access work. The trust policy, which is the role's resource-based policy and is also called the assume role policy document, says who may assume the role. Its `Principal` names the trusted account or a specific role, and the action is `sts:AssumeRole`. Trusting a whole account (its root ARN) delegates the decision to that account's administrators; naming a specific role is tighter. The permissions policy says what the role can do once assumed. On the calling side, the caller's own identity policy must allow `sts:AssumeRole` on the target role's ARN. Both sides must agree, and that is the rule for all cross-account access on AWS.",
   "```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Principal\": { \"AWS\": \"arn:aws:iam::111122223333:role/ci-deployer\" },\n    \"Action\": \"sts:AssumeRole\",\n    \"Condition\": { \"StringEquals\": { \"sts:ExternalId\": \"example-external-id\" } }\n  }]\n}\n```",
   "The caller then calls the AWS Security Token Service (STS) `AssumeRole` API with the role ARN and a role session name. STS returns temporary credentials: an access key ID (which begins with `ASIA` for temporary keys), a secret access key and a session token, plus an expiration time. The session lasts one hour by default. You can request a duration from 15 minutes up to the role's configured maximum session duration, which can be set as high as 12 hours. Code must use all three values together; the session token is what distinguishes temporary credentials from long-term ones, and forgetting to set it is a common cause of 'invalid token' errors. When credentials expire, the caller must assume the role again. SDK assume-role credential providers, and CLI profiles that set `role_arn` with `source_profile`, refresh automatically.",
   "An external ID is a value that a third party must pass when assuming a role in your account, enforced through an `sts:ExternalId` condition in the trust policy, as in the example above. It protects against the confused deputy problem when a vendor serves many customers: without it, another customer of the same vendor could give the vendor your role ARN and trick the vendor into accessing your account. The external ID is not a password, but it should be unique per customer. Multi-factor authentication (MFA) can also be required for human callers with the `aws:MultiFactorAuthPresent` condition. When one assumed role is used to assume another, which is called role chaining, the new session is limited to a maximum of one hour regardless of the role's configured maximum.",
   "STS has related APIs worth recognizing by name. `AssumeRoleWithWebIdentity` exchanges a token from an OpenID Connect (OIDC) provider, such as a continuous integration (CI) system's identity token or a Cognito identity pool's token, for AWS credentials, so external pipelines need no stored keys. `AssumeRoleWithSAML` does the same for Security Assertion Markup Language (SAML) identity providers used for workforce sign-in. `GetSessionToken` returns temporary credentials for an IAM user, typically to satisfy an MFA requirement before sensitive calls. `GetCallerIdentity` tells you which account and principal the current credentials belong to and needs no permissions, which makes it the first command in many troubleshooting sessions. `DecodeAuthorizationMessage` decodes the encoded message that some services, notably EC2, return with an authorization failure, revealing which policy denied a request.",
   "Auditing is built in. Every assumed-role action is logged in AWS CloudTrail. In the target account, the actions appear as performed by an assumed-role identity whose ARN includes the role name and the session name, for example `arn:aws:sts::444455556666:assumed-role/deploy/run-8812`. Choose meaningful session names, such as the pipeline run ID or the user's name, so investigators can trace each change. The `AssumeRole` event itself is recorded too, showing which principal from the source account requested the session. With a role in place, Kenji's pipeline can delete the old IAM user, and every deployment is traceable to a run."
  ],
  "analogy": "Cross-account access is like a visiting nurse working a shift at a partner hospital. The partner hospital keeps a list of which agencies it trusts (the trust policy) and defines what visiting staff may do on the ward (the permissions policy). The nurse's own agency must also authorize the assignment (the caller's sts:AssumeRole permission). At the front desk, the nurse receives a badge that expires at the end of the shift (temporary credentials). The analogy stops working for role chaining: a hospital might extend a shift, but a chained AWS role session is capped at one hour.",
  "terms": [
   [
    "Trust policy",
    "The resource-based policy on an IAM role that specifies which principals may assume it."
   ],
   [
    "AssumeRole",
    "The STS API that returns temporary credentials for a role to a trusted caller."
   ],
   [
    "Temporary credentials",
    "An access key ID, secret access key and session token that expire after a set duration."
   ],
   [
    "Role session name",
    "A caller-chosen identifier for an assumed-role session that appears in CloudTrail and the assumed-role ARN."
   ],
   [
    "External ID",
    "A value required in a trust policy condition that third parties must supply when assuming a role, preventing confused deputy problems."
   ],
   [
    "Role chaining",
    "Using credentials from one assumed role to assume another role; sessions are limited to one hour."
   ],
   [
    "AssumeRoleWithWebIdentity",
    "The STS API that exchanges an OIDC identity token for temporary AWS credentials."
   ]
  ],
  "example": "A CodeBuild project in a tools account deploys to a production account. Production has a deploy role whose trust policy allows the build project's service role, and the build role's policy allows `sts:AssumeRole` on that ARN. The buildspec runs `aws sts assume-role` with a session name built from the build ID, exports the three returned values as environment variables, and runs the deployment. CloudTrail in production shows each change under the deploy role with that build ID as the session name.",
  "mistakes": [
   [
    "Updating only the target role's trust policy and expecting cross-account access to work.",
    "The caller's identity policy must also allow sts:AssumeRole on the target role ARN. Both sides must allow it."
   ],
   [
    "Using only the access key ID and secret access key from AssumeRole.",
    "Temporary credentials require the session token as well; without it, requests fail with an invalid or missing token error."
   ],
   [
    "Creating an IAM user with access keys in each account for a pipeline or vendor.",
    "The secure pattern is a role assumed through STS, with an external ID for third parties or OIDC federation for external CI systems."
   ],
   [
    "Expecting a chained role session to last up to 12 hours.",
    "Role chaining limits the session to one hour, even if the role's maximum session duration is longer."
   ]
  ],
  "tryit": [
   [
    "Northwind Metrics, a monitoring vendor, asks you to create a role in your account that their platform can assume to read CloudWatch metrics. Their platform uses the same AWS account to serve hundreds of customers. What should your trust policy include beyond trusting the vendor's account?",
    "Require an external ID with an `sts:ExternalId` condition, using a value unique to your organization that the vendor supplies when assuming the role. This prevents another of the vendor's customers from tricking the vendor into accessing your account with your role ARN."
   ],
   [
    "A long-running data migration job assumes Role A, then uses those credentials to assume Role B in another account. Role B's maximum session duration is set to 8 hours, but the job's credentials keep expiring after an hour. Why?",
    "This is role chaining, which caps the session at one hour. The job should refresh credentials by assuming the role again before expiry, or assume Role B directly from non-role credentials if a longer session is genuinely needed."
   ]
  ],
  "tip": "Cross-account access needs both sides: the target role's trust policy must trust the caller, and the caller's IAM policy must allow sts:AssumeRole on the role. If either is missing, you get AccessDenied. Third-party vendors point to external IDs; external CI systems point to AssumeRoleWithWebIdentity.",
  "check": [
   [
    "What three values make up temporary credentials?",
    "An access key ID, a secret access key and a session token."
   ],
   [
    "Which policy on a role decides who can assume it?",
    "The trust policy (assume role policy document)."
   ],
   [
    "Which STS API would a CI system with an OIDC token use to get AWS credentials without stored keys?",
    "AssumeRoleWithWebIdentity."
   ],
   [
    "What is the default duration of an AssumeRole session?",
    "One hour; it can be requested from 15 minutes up to the role's maximum session duration, which can be set as high as 12 hours."
   ]
  ]
 },
 {
  "t": "Amazon Cognito: user pools (sign-up, sign-in, ID/access/refresh tokens) vs identity pools (temporary AWS credentials)",
  "hook": "Amara is the only backend developer at Fernway Trails, a small startup building a hiking app. The product manager's list for the next sprint reads: let hikers sign up with email or their Google account, keep them signed in for weeks, show their profile name in the app, let them upload trail photos straight to storage, and let people without accounts browse public trail maps. Amara opens the Amazon Cognito console and finds two very different things: user pools and identity pools. Which one handles which item on the list, and does she need both?",
  "simple": "Amazon Cognito helps apps handle their own customers, not company staff. It has two parts. A user pool is like a membership desk: people sign up, sign in, reset passwords, and get a digital membership card (a token) that proves who they are. An identity pool is like a key exchange window: you show your membership card, and it hands you a temporary key that opens certain AWS storage or database doors directly. Many apps use both: sign in at the membership desk, then trade the card for a temporary key to upload photos. If the app only needs to know who you are and call its own API, the user pool alone is enough.",
  "body": [
   "Amazon Cognito provides identity for your application's end users: the customers of a mobile or web app, not IAM users or your workforce. It has two components with different jobs, and choosing between them is one of the most common DVA-C02 questions. A quick way to frame it: one component authenticates people and returns tokens, the other authorizes access to AWS resources and returns AWS credentials.",
   "A user pool is a user directory and authentication service. It handles sign-up with email or phone verification, sign-in, password policies, multi-factor authentication (MFA), account recovery and a hosted sign-in user interface (UI). It can also federate with social providers such as Google or Apple and with enterprise identity providers that use Security Assertion Markup Language (SAML) or OpenID Connect (OIDC), so users can sign in with an existing account while your app still receives consistent user pool tokens. Users can be placed in groups, which appear in tokens and can be used for authorization decisions in your API.",
   "After a successful sign-in, the user pool issues JSON Web Tokens (JWTs), and each has a distinct purpose. The ID token contains claims about the user's identity, such as `email`, `sub` (the user's unique identifier) and `cognito:groups`, and is meant for your application to learn who the user is. The access token contains scopes and groups and is meant to authorize calls to APIs, including Amazon API Gateway with a Cognito authorizer and the user pool's own user APIs, such as updating attributes. The refresh token is long-lived and is used to obtain new ID and access tokens without signing in again. ID and access tokens are short-lived, one hour by default; refresh tokens default to 30 days and are configurable per app client.",
   "Your backend must validate JWTs rather than trust them blindly. Validation means checking the signature against the user pool's public keys, published as a JSON Web Key Set (JWKS), then verifying the issuer matches your user pool, the audience (for ID tokens) or client ID (for access tokens) matches your app client, the `token_use` claim is the expected type, and the token has not expired. API Gateway's Cognito authorizer does this for you, which is a major reason to use it.",
   "Lambda triggers let you customize user pool flows without running servers. A pre sign-up trigger can auto-confirm users from a trusted domain or block disposable email addresses. A post confirmation trigger can write a profile record to DynamoDB once a user verifies their account. A pre token generation trigger can add, change or suppress claims, such as adding a subscription tier. A custom message trigger personalizes verification emails, and the define, create and verify auth challenge triggers implement custom authentication flows, such as passwordless sign-in.",
   "An identity pool, also called federated identities, does something different: it exchanges a token from an identity provider for temporary AWS credentials, so the app can call AWS services such as Amazon S3 or DynamoDB directly from the device. Supported providers include a Cognito user pool, social providers, SAML and OIDC providers, and your own developer-authenticated identities. Identity pools can also issue credentials for unauthenticated (guest) users if you enable that option. Behind the scenes, the identity pool uses the AWS Security Token Service (STS) `AssumeRoleWithWebIdentity` to assume an IAM role: one role for authenticated users and one for guests, or roles chosen by rules or by token claims, for example mapping an admin group to a more privileged role.",
   "Fine-grained access is achieved with IAM policy variables, so one role can safely serve millions of users. A role policy can allow access to the S3 prefix `private/${cognito-identity.amazonaws.com:sub}/*`, where the variable resolves to each user's identity ID, so a user can only touch their own folder. For DynamoDB, the `dynamodb:LeadingKeys` condition key restricts users to items whose partition key equals their own identity ID. Keep the guest role very narrow, such as read-only access to public assets.",
   "To keep them straight: user pools answer 'who is this user?' and return JWTs; identity pools answer 'what AWS resources may this user reach directly?' and return AWS credentials. Many apps use both. A typical flow signs in with a user pool, then trades the ID token at the identity pool for credentials to upload to S3, while ordinary API calls go to API Gateway with the access token. In Amara's case, sign-up, Google sign-in, staying signed in and profile names belong to the user pool; direct photo uploads and guest map browsing belong to the identity pool."
  ],
  "analogy": "Picture a theme park. The user pool is the ticket office: it checks who you are, sells you a wristband (the ID and access tokens), and gives you a voucher to get a fresh wristband tomorrow without queuing again (the refresh token). The identity pool is the locker counter: you show your wristband and receive a temporary locker key (AWS credentials) that opens only your own locker. Guests without a ticket can get a key to the public lost-and-found shelf only. The analogy stops short in one way: a theme park wristband lasts all day, while ID and access tokens default to one hour.",
  "terms": [
   [
    "User pool",
    "A Cognito user directory that handles sign-up and sign-in and issues JWT ID, access and refresh tokens."
   ],
   [
    "Identity pool",
    "A Cognito component that exchanges identity provider tokens for temporary AWS credentials via IAM roles."
   ],
   [
    "ID token",
    "A JWT containing claims about the authenticated user's identity, such as email and sub."
   ],
   [
    "Access token",
    "A JWT containing scopes and groups, used to authorize API requests."
   ],
   [
    "Refresh token",
    "A long-lived token used to obtain new ID and access tokens without re-authenticating."
   ],
   [
    "Unauthenticated identity",
    "A guest identity in an identity pool that receives credentials for a limited IAM role without signing in."
   ],
   [
    "Pre token generation trigger",
    "A user pool Lambda trigger that can add, modify or suppress claims before tokens are issued."
   ]
  ],
  "example": "A photo app signs users in with a Cognito user pool. The app passes the ID token to an identity pool, receives temporary credentials for the authenticated role, and uploads photos straight to S3 under `private/` followed by the user's identity ID, which the role policy restricts each user to. Calls to the app's own comment API go to API Gateway with the access token, validated by a Cognito authorizer.",
  "mistakes": [
   [
    "Choosing an identity pool to handle sign-up, passwords and MFA.",
    "Identity pools do not store users or authenticate them; they trade existing tokens for AWS credentials. Sign-up, sign-in, password policies and MFA belong to a user pool."
   ],
   [
    "Using the ID token to call an API that requires OAuth scopes.",
    "Scopes are in the access token. When API Gateway methods require scopes, the client must send the access token."
   ],
   [
    "Embedding IAM user access keys in a mobile app so it can upload to S3.",
    "Keys in an app can be extracted. Use an identity pool to issue temporary credentials scoped by policy variables to each user's own prefix."
   ],
   [
    "Assuming refresh tokens last as long as ID tokens.",
    "ID and access tokens default to one hour; refresh tokens default to 30 days and are used to get new ID and access tokens."
   ]
  ],
  "tryit": [
   [
    "A news app wants anonymous readers to fetch public article images directly from S3, and signed-in subscribers to save bookmarks to their own items in a DynamoDB table. Sign-in already works through a Cognito user pool. What should the team add, and how should DynamoDB access be limited?",
    "Add an identity pool with unauthenticated identities enabled, mapped to a guest role with read-only access to the public image prefix, and an authenticated role for subscribers. In the authenticated role policy, use the `dynamodb:LeadingKeys` condition with the identity ID variable so each subscriber can only access items whose partition key is their own identity ID."
   ],
   [
    "Product managers want every token to include the user's subscription plan, which is stored in a separate billing database, so the API can decide which features to allow. How can this be done without changing the client?",
    "Use a pre token generation Lambda trigger on the user pool to look up the plan and add it as a custom claim before the tokens are issued."
   ]
  ],
  "tip": "If the scenario needs sign-up, sign-in or tokens for an API, choose a user pool. If users must access AWS services such as S3 or DynamoDB directly from the device, or guests need limited access, choose an identity pool.",
  "check": [
   [
    "Which Cognito component gives temporary AWS credentials?",
    "An identity pool, which assumes an IAM role for the user through STS."
   ],
   [
    "What is the refresh token used for?",
    "Getting new ID and access tokens after they expire, without making the user sign in again."
   ],
   [
    "How can you add a custom claim to tokens?",
    "Use a pre token generation Lambda trigger on the user pool."
   ],
   [
    "How do you limit each user to their own S3 folder when using an identity pool?",
    "Use a policy variable such as ${cognito-identity.amazonaws.com:sub} in the role's S3 resource ARN."
   ]
  ]
 },
 {
  "t": "API Gateway authorization: IAM (SigV4), Cognito user pool authorizers, Lambda authorizers, API keys and usage plans",
  "hook": "Tomas leads the API team at Brightwater Weather Data. Three kinds of callers want in: the company's own mobile app users, an internal billing service running on Lambda, and a growing list of partner companies who pay for higher request volumes. Last month a partner's API key appeared in a public code snippet, and someone used it for a weekend of free forecasts. Tomas's manager asks a pointed question in the review meeting: 'If API keys are not security, what is protecting this API?' Tomas needs a clear answer for each kind of caller.",
  "simple": "Amazon API Gateway is the front door to your backend. Before letting a request in, it can check who is knocking, in one of a few ways. Callers that already have AWS credentials can sign their requests, like stamping a letter with an official seal. App users who signed in with Cognito can show their login token, and the gateway checks it for you. If you use some other login system, you can write a small function that inspects the request and says yes or no. API keys are different: they are like a loyalty card number. They tell you which customer is calling so you can limit how much they use, but anyone who copies the number can use it, so they do not prove identity.",
  "body": [
   "Amazon API Gateway can check who is calling before a request ever reaches your backend, which saves your Lambda functions or servers from handling unauthorized traffic. Each method in a REST API (or each route in an HTTP API) chooses an authorization type, and the exam expects you to match the option to the kind of caller. There are three real authorization mechanisms, plus API keys, which are about identification and metering rather than security.",
   "IAM authorization, shown in the console and templates as `AWS_IAM`, requires requests to be signed with AWS Signature Version 4 (SigV4) using AWS credentials. API Gateway verifies the signature and checks that the caller's IAM policy allows `execute-api:Invoke` on the method's Amazon Resource Name (ARN), which looks like `arn:aws:execute-api:region:account-id:api-id/stage/GET/orders`. It is the natural choice for callers that already have AWS credentials: other AWS services, internal tools, Lambda functions with execution roles, or app users who received temporary credentials from a Cognito identity pool. The AWS SDKs sign requests for you. Resource policies on REST APIs can additionally restrict access by AWS account, source IP address range or VPC endpoint, which is how private APIs are locked down and how you allow another account's role to call your API.",
   "A Cognito user pool authorizer validates a JSON Web Token (JWT) from an Amazon Cognito user pool, sent by the client in a header such as `Authorization`. API Gateway checks the token's signature and expiration itself, with no code to write. For REST APIs, if you configure OAuth scopes on the method, the client must send an access token that contains one of those scopes; without scopes configured, an ID token is accepted. HTTP APIs offer a general JWT authorizer that works with Cognito or any OpenID Connect (OIDC) compliant issuer. Your backend can read the verified claims, such as `sub` or `email`, from the request context rather than parsing the token again.",
   "A Lambda authorizer, formerly called a custom authorizer, runs your own function to decide. A token-based authorizer receives a single header value, such as a bearer token. A request-based authorizer receives headers, query string parameters, stage variables and request context, which is useful when the decision depends on several values, such as a token plus a tenant header. The function validates the credential however you like, for example against a third-party OAuth provider or a legacy session store, and returns an IAM policy document that allows or denies `execute-api:Invoke`, plus a `principalId` and optional context values passed to the backend integration. Returning an explicit Deny, or raising an unauthorized error, results in a 401 or 403 response without the backend ever running.",
   "Lambda authorizer results can be cached. API Gateway can cache the returned policy for a configurable time to live (TTL), 300 seconds by default, keyed on the identity source such as the token header. Caching cuts latency and reduces authorizer invocations and cost. Be careful, though: the cached policy is reused for every method the same token calls during the TTL, so if your function returns a policy that allows only the one method being requested, later requests to other methods may be wrongly denied. A common fix is to return a policy covering all the resources that user may call, using wildcards in the method ARN, or to disable caching while debugging.",
   "API keys and usage plans are not authentication. An API key is an identifier a client sends in the `x-api-key` header; it can be shared, copied or leaked, so it only identifies which customer is calling. Usage plans associate API keys with throttling limits (a steady-state requests per second rate and a burst) and quotas (a number of requests per day, week or month) for specific API stages. The typical use is offering free and paid tiers of a public API and tracking usage per customer. Combine API keys with a real authorizer if the API needs security. When a client exceeds its throttle or quota it receives HTTP 429 Too Many Requests; a missing or invalid key on a method that requires one returns 403 Forbidden.",
   "Putting it together gives a short decision guide. Internal or AWS-credentialed callers use IAM authorization. Your application's signed-in Cognito users use a Cognito user pool authorizer, or a JWT authorizer on HTTP APIs. Tokens from other identity systems, or decisions that need custom logic, use a Lambda authorizer. Metering and throttling per customer use API keys with usage plans, layered on top of one of the real mechanisms. For Tomas, mobile users get a Cognito authorizer, the billing service uses IAM authorization, and partners keep their API keys for usage plans but must also pass a Lambda authorizer that validates a signed partner token, so a leaked key alone opens nothing."
  ],
  "analogy": "API Gateway authorization is like entry to a conference. Staff with company badges scan them at a reader that checks the badge is genuine and lists this hall (IAM with SigV4). Registered attendees show a printed pass that the door scanner verifies automatically (Cognito authorizer). Visitors from partner events are sent to a person at a desk who checks their credentials in a custom way (Lambda authorizer). Separately, a wristband color shows which ticket tier you bought and how many sessions you may attend (API key and usage plan). A wristband can be handed to a friend, which is exactly why it is not identity.",
  "terms": [
   [
    "IAM authorization",
    "API Gateway authorization that requires SigV4-signed requests and an IAM policy allowing execute-api:Invoke."
   ],
   [
    "SigV4",
    "AWS Signature Version 4, the process of signing HTTP requests with AWS credentials so AWS can verify the caller."
   ],
   [
    "Cognito user pool authorizer",
    "An API Gateway authorizer that validates JWTs issued by a Cognito user pool without custom code."
   ],
   [
    "Lambda authorizer",
    "A function that receives a token or request parameters and returns an IAM policy allowing or denying the request."
   ],
   [
    "Authorizer caching",
    "Storing a Lambda authorizer's returned policy for a TTL, keyed on the identity source, to avoid invoking it on every request."
   ],
   [
    "Usage plan",
    "An API Gateway configuration that applies throttling and quota limits to the API keys associated with it."
   ],
   [
    "API resource policy",
    "A resource-based policy on a REST API that restricts or allows access by account, IP range or VPC endpoint."
   ]
  ],
  "example": "A company exposes a weather API. Mobile users sign in with Cognito, so the public routes use a Cognito user pool authorizer. Partners who integrate from their servers get API keys attached to a Gold usage plan with a higher throttle rate, and each partner request also passes a Lambda authorizer that validates a partner-signed token. The internal billing Lambda function calls an admin route protected with IAM authorization, signing requests with its execution role.",
  "mistakes": [
   [
    "Choosing API keys to secure an API.",
    "API keys identify clients for usage plans and can be leaked. Use IAM, a Cognito authorizer or a Lambda authorizer for real authorization."
   ],
   [
    "Writing a Lambda authorizer to validate Cognito user pool tokens.",
    "A Cognito user pool authorizer validates them with no code. Reserve Lambda authorizers for other token types or custom logic."
   ],
   [
    "Returning a policy for only the requested method while caching is enabled.",
    "The cached policy is reused across methods for the same token during the TTL, causing unexpected 403s. Return a policy that covers all allowed resources or adjust caching."
   ],
   [
    "Expecting a throttled client to receive 403.",
    "Exceeding a usage plan throttle or quota returns 429 Too Many Requests; 403 is for a missing or invalid API key or an authorization denial."
   ]
  ],
  "tryit": [
   [
    "Ivy's company is migrating an older app whose users sign in through an existing in-house identity system that issues opaque session tokens. The new API in API Gateway must accept those tokens and reject requests for suspended accounts, which are listed in a DynamoDB table. Which authorization type fits?",
    "A Lambda authorizer. The tokens are not Cognito or OIDC JWTs, and the decision needs custom logic (checking the session and the suspended accounts table). The function returns an Allow or Deny policy, and caching can reduce repeat lookups."
   ],
   [
    "An analytics team's Lambda function in the same account needs to call an internal reporting endpoint in API Gateway. No end users are involved. What is the simplest secure option?",
    "Use IAM authorization on the method and allow `execute-api:Invoke` on that method's ARN in the function's execution role; the function signs requests with SigV4 using its role credentials."
   ]
  ],
  "tip": "API keys are for identifying clients and applying usage plans, not for securing an API. If a question needs custom or third-party token validation, choose a Lambda authorizer; for Cognito tokens with no code, choose a Cognito authorizer; for AWS-credentialed callers, choose IAM.",
  "check": [
   [
    "What does a Lambda authorizer return?",
    "An IAM policy document allowing or denying execute-api:Invoke, a principalId and optional context values."
   ],
   [
    "Which authorization type should an internal service with an IAM role use to call an API?",
    "IAM authorization, signing requests with SigV4."
   ],
   [
    "What response does a client receive for exceeding a usage plan's throttle?",
    "HTTP 429 Too Many Requests."
   ],
   [
    "What is the difference between a token-based and a request-based Lambda authorizer?",
    "A token-based authorizer receives one header value such as a bearer token; a request-based authorizer receives headers, query strings, stage variables and context."
   ]
  ]
 },
 {
  "t": "Encryption at rest: SSE-S3, SSE-KMS, SSE-C, S3 Bucket Keys, client-side encryption with the AWS Encryption SDK",
  "hook": "Leila is the lead developer at Meadowbrook Clinics, and an auditor is sitting across the table with a printed checklist. 'Your patient files are in Amazon S3,' he says. 'Show me they are encrypted at rest, show me who decrypted them last month, and tell me how fast you could cut off a former contractor.' Leila knows S3 encrypts new objects by default, so the first question feels easy. The second and third make her pause. Default encryption is real, but does it leave the kind of trail and control this auditor wants?",
  "simple": "Encryption at rest means stored files are scrambled so that a stolen disk or backup is useless without the key. In Amazon S3 the main choice is who holds the key and where the scrambling happens. S3 can handle everything for you with its own keys. Or S3 can use a key you manage in a separate key service, which keeps a record every time the key is used and lets you switch off access. You can even hand S3 your own key with each request, which it uses and then forgets. Or your app can scramble files before they ever leave your computer. It is like choosing between a hotel safe, a bank deposit box with a sign-in log, or a locked case you carry in yourself.",
  "body": [
   "Encryption at rest protects stored data if the storage media, snapshots or backups are ever exposed. For Amazon S3 you choose two things: who manages the keys, and where encryption happens (in S3 or in your application). Exam questions describe requirements such as auditing key use, controlling and revoking access to keys, managing keys entirely yourself, or never letting AWS see plaintext, and each requirement points to one option.",
   "Server-side encryption means S3 encrypts an object when it writes it to disk and decrypts it when an authorized caller reads it, transparently to the application. SSE-S3 uses keys that S3 fully manages, with the Advanced Encryption Standard using 256-bit keys (AES-256). You request it with the header `x-amz-server-side-encryption: AES256`, and there is nothing else to configure. S3 now applies SSE-S3 as the default encryption for all new objects, so every new object is encrypted at rest unless you choose another option. The limitation is control: you cannot see a per-request audit trail of key use or revoke access to the key separately from S3 permissions.",
   "SSE-KMS encrypts with a key in AWS Key Management Service (KMS). You request it with `x-amz-server-side-encryption: aws:kms` and optionally name a key with `x-amz-server-side-encryption-aws-kms-key-id`. You can use the AWS managed key for S3, with the alias `aws/s3`, or your own customer managed key. The benefits are the ones auditors ask for: every use of the key is logged in AWS CloudTrail, you control the key policy and rotation of a customer managed key, and reading an object requires both S3 permission and `kms:Decrypt` on the key, which gives separation of duties. Uploads need `kms:GenerateDataKey`. Revoking a role's KMS permission blocks reads even if its S3 permissions remain.",
   "SSE-KMS has one main drawback. Because object operations call KMS, very high request rates can hit KMS request quotas, causing throttling errors, and add KMS request costs. Dual-layer server-side encryption with KMS keys (DSSE-KMS) applies two independent layers of encryption for workloads with that specific compliance requirement, at additional cost.",
   "S3 Bucket Keys reduce that KMS traffic. With a Bucket Key enabled, S3 asks KMS to create a short-lived bucket-level key and then derives per-object data keys from it locally, so it calls KMS far less often. This lowers KMS request costs and reduces throttling risk while keeping the benefits of SSE-KMS. One visible side effect: CloudTrail events for KMS now show the bucket ARN, rather than each object ARN, as the encryption context, so any policies or audit queries that relied on object-level encryption context need updating.",
   "SSE-C, server-side encryption with customer-provided keys, means you send your own 256-bit key with every request in headers. S3 uses it to encrypt or decrypt the object, then discards the key, storing only a salted hash so it can confirm later requests supply the same key. You must manage and never lose the key; if you do, the data is unrecoverable, and S3 cannot help. Requests must use HTTPS, and S3 rejects SSE-C requests over plain HTTP because the key travels in the headers. SSE-C is also not available through the S3 console for uploads, so it is a programmatic option.",
   "Client-side encryption means your application encrypts data before sending it, so S3 only ever stores ciphertext and AWS never sees the plaintext. The AWS Encryption SDK is a client-side library that implements envelope encryption for you: it obtains a data key from a keyring or master key provider, often backed by KMS, encrypts your data with that key, and stores the encrypted data key alongside the ciphertext in a portable message format, so any holder of KMS decrypt permission can later decrypt it. The Amazon S3 Encryption Client is a related library specialized for S3 objects. Choose client-side encryption when requirements say data must be encrypted before it leaves the application or that AWS must never have access to plaintext.",
   "To enforce a choice, set default bucket encryption, for example to SSE-KMS with your customer managed key and Bucket Keys enabled, so uploads without encryption headers still get the right protection. If you must also stop clients from choosing a different method, add a bucket policy that denies `s3:PutObject` requests whose `s3:x-amz-server-side-encryption` condition key does not match the required value. Together, defaults and a deny statement make the encryption method consistent across every upload path."
  ],
  "analogy": "Think of storing valuables. SSE-S3 is the hotel room safe: it works automatically, but the hotel manages the master code and you get no log of openings. SSE-KMS is a bank safe deposit box: the bank still does the work, but every opening is signed in a log and you can remove someone from the access list. SSE-C is bringing your own padlock that the bank uses for a moment and hands back; lose the key and nobody can open it. Client-side encryption is locking items in your own case before you even enter the bank.",
  "terms": [
   [
    "SSE-S3",
    "Server-side encryption with keys fully managed by S3, using AES-256; the default for new objects."
   ],
   [
    "SSE-KMS",
    "Server-side encryption using a KMS key, providing CloudTrail auditing and key-policy control."
   ],
   [
    "DSSE-KMS",
    "Dual-layer server-side encryption with KMS keys, applying two layers of encryption for specific compliance needs."
   ],
   [
    "SSE-C",
    "Server-side encryption with a customer-provided key sent in each HTTPS request and not stored by S3."
   ],
   [
    "S3 Bucket Key",
    "A bucket-level key derived from KMS that reduces the number of KMS calls, cost and throttling for SSE-KMS."
   ],
   [
    "Client-side encryption",
    "Encrypting data in the application before upload, so the storage service only receives ciphertext."
   ],
   [
    "AWS Encryption SDK",
    "A client-side library that performs envelope encryption so data is encrypted before it leaves the application."
   ]
  ],
  "example": "A healthcare startup needs an audit trail of who decrypted patient files and must be able to revoke access instantly. They use SSE-KMS with a customer managed key; removing a role's `kms:Decrypt` permission from the key policy blocks reads even for users with S3 access, and CloudTrail shows every decrypt. As upload volume grows and `ThrottlingException` errors appear from KMS, they enable S3 Bucket Keys on the bucket.",
  "mistakes": [
   [
    "Choosing SSE-S3 when the requirement is an audit trail of key usage or the ability to revoke key access.",
    "SSE-S3 keys are managed entirely by S3. Auditing each key use and controlling access through a key policy requires SSE-KMS, ideally with a customer managed key."
   ],
   [
    "Picking SSE-C when the requirement says AWS must never see plaintext.",
    "With SSE-C, S3 still receives your plaintext and key and performs the encryption. Only client-side encryption keeps plaintext away from AWS."
   ],
   [
    "Fixing SSE-KMS throttling by switching to SSE-C.",
    "The standard fix is enabling S3 Bucket Keys, which keeps SSE-KMS while reducing KMS calls; retries with backoff or a quota increase are other options."
   ],
   [
    "Assuming s3:GetObject alone is enough to read an SSE-KMS object.",
    "The caller also needs kms:Decrypt on the KMS key, which is what provides separation of duties."
   ]
  ],
  "tryit": [
   [
    "A research lab's partners send encrypted datasets that must remain encrypted with keys the lab generates and keeps in its own hardware, outside AWS. The lab is willing to let S3 perform encryption and decryption during each request, but S3 must never store the keys. Which option fits, and what must every request use?",
    "SSE-C. The lab supplies its own 256-bit key with each request, S3 encrypts or decrypts and discards the key, storing only a salted hash. Every request must use HTTPS, and the lab must safeguard the keys because S3 cannot recover data if a key is lost."
   ],
   [
    "An application writes millions of small objects per hour to a bucket using SSE-KMS with a customer managed key. The team sees rising KMS costs and occasional throttling errors, but compliance still requires KMS key control. What should they change?",
    "Enable S3 Bucket Keys for the bucket. S3 then derives object keys from a short-lived bucket-level key, calling KMS far less often while keeping SSE-KMS and key-policy control."
   ]
  ],
  "tip": "Audit trail and control of key usage: SSE-KMS. KMS throttling or cost with SSE-KMS: enable Bucket Keys. You manage keys and S3 must never store them: SSE-C (HTTPS only). AWS must never see plaintext: client-side encryption.",
  "check": [
   [
    "What extra permission does reading an SSE-KMS object require?",
    "kms:Decrypt on the KMS key, in addition to s3:GetObject."
   ],
   [
    "Why must SSE-C requests use HTTPS?",
    "Because the encryption key is sent in request headers, and S3 rejects SSE-C requests made over HTTP."
   ],
   [
    "What problem do S3 Bucket Keys solve?",
    "They reduce the number of requests from S3 to KMS, lowering cost and the risk of KMS throttling for SSE-KMS."
   ],
   [
    "What encryption does S3 apply to new objects if you specify nothing?",
    "SSE-S3, which is the default encryption for all new objects."
   ]
  ]
 },
 {
  "t": "AWS KMS: customer managed vs AWS managed keys, envelope encryption with GenerateDataKey, 4 KB Encrypt limit, cross-account key use",
  "hook": "Owen joins the data team at Riverside Insurance on a Monday, and his first ticket looks simple: encrypt the nightly claims export, about 50 MB, with the company's KMS key before it is archived. He writes three lines of code that call KMS `Encrypt` with the whole file. The job fails with a validation error about the plaintext being too long. A senior engineer glances at the stack trace and says, 'You never send the file to KMS. You send it a much smaller job.' What does she mean, and how does a 50 MB file get protected by a key that never leaves KMS?",
  "simple": "AWS Key Management Service, or KMS, is a very secure vault for master keys. The master keys never leave the vault. You can ask the vault to lock tiny things, up to about the size of a short text file, but not big files. For big files you use a trick called envelope encryption: ask the vault for a fresh small key, use that small key on your own computer to lock the big file, then keep a vault-locked copy of the small key next to the file and throw away the unlocked copy. To open the file later, ask the vault to unlock the small key. It is like locking a suitcase with a padlock and then putting the padlock's key in a bank safe.",
  "body": [
   "AWS Key Management Service (KMS) creates and controls cryptographic keys whose key material never leaves KMS unencrypted. KMS keys live inside hardware security modules managed by AWS, and every use is an API call that IAM and the key policy authorize and that AWS CloudTrail records. Services such as Amazon S3, Amazon DynamoDB, AWS Lambda and AWS Secrets Manager call KMS for you when you turn on encryption, and your own code can call it directly through the SDK.",
   "KMS keys come in kinds based on who manages them, and the exam often hinges on that difference. AWS managed keys, with aliases like `aws/s3` or `aws/lambda`, are created automatically in your account when you use a service's default KMS encryption. You can view them and see their use in CloudTrail, but you cannot change their key policy, and AWS rotates them automatically every year. Customer managed keys are ones you create. You control the key policy, grants, enabling and disabling, scheduled deletion with a waiting period of 7 to 30 days, tags and aliases, and you can turn on automatic rotation. AWS owned keys are a third category, used internally by AWS services in accounts you cannot see, with no visibility or control for you.",
   "The practical consequence is simple to remember. Only customer managed keys can be shared with other accounts or given fine-grained policies, so requirements like 'control who can use the key', 'disable the key on demand' or 'decrypt in another account' point to customer managed keys. If a question just needs encryption with minimal effort, an AWS managed key or the service default is usually enough.",
   "The `Encrypt` API can encrypt at most 4 KB of plaintext directly. That is fine for a password, a small configuration value or another key, but not for a file. For larger data, use envelope encryption: encrypt the data with a data key, and encrypt the data key with the KMS key. In code, call `GenerateDataKey` with your KMS key ID and a key spec such as `AES_256`. KMS returns the data key in two forms: plaintext, and encrypted under the KMS key. Your code encrypts the data locally with the plaintext data key, for example with AES in Galois/Counter Mode (AES-GCM), then discards the plaintext key from memory and stores the encrypted data key next to the ciphertext, such as in object metadata or a file header.",
   "Decryption reverses the steps. Call `Decrypt` with the encrypted data key; KMS checks your permissions and returns the plaintext data key, and your code decrypts the data locally. A variant, `GenerateDataKeyWithoutPlaintext`, returns only the encrypted copy, which is useful when one component prepares keys and another component will encrypt later. Envelope encryption is faster because large data never travels to KMS, cheaper because you pay for one KMS call per data key rather than per byte, and it avoids the 4 KB limit. The AWS Encryption SDK and S3 SSE-KMS both use it internally.",
   "An encryption context is a set of non-secret key-value pairs you pass with `Encrypt` or `GenerateDataKey`, such as `{\"department\": \"claims\"}`. The exact same pairs must be supplied to decrypt, which binds the ciphertext to its intended use and adds an integrity check, and the pairs appear in CloudTrail, making audits clearer. Key policies and grants can also use the encryption context in conditions.",
   "KMS has request quotas per account and Region. When calls fail with `ThrottlingException`, you have hit them. Answers include caching data keys so one data key encrypts many messages (the Encryption SDK supports data key caching), using S3 Bucket Keys for SSE-KMS buckets, retrying with exponential backoff, or requesting a quota increase.",
   "For cross-account use, two things are required. The key policy in the key's account must allow the other account, or a specific role in it, to use the key, and in the other account an IAM policy must grant the user or role the needed KMS actions, such as `kms:Decrypt` or `kms:GenerateDataKey`, on that key's Amazon Resource Name (ARN). AWS managed keys cannot be used this way, because their key policies cannot be edited. Keys are Regional resources; multi-Region keys are related keys with the same key material in several Regions, letting you decrypt in another Region without re-encrypting the data."
  ],
  "analogy": "Envelope encryption is like a hotel safe and a filing cabinet. You would never carry the whole filing cabinet to the front desk safe; it does not fit. Instead, you lock the cabinet with an ordinary key, then have the front desk seal that small key in an envelope that only their safe can open, and tape the sealed envelope to the cabinet. To open it, you hand the envelope back to the front desk. The analogy stops working in one detail: KMS never stores your data keys for you; you keep the encrypted copy yourself.",
  "terms": [
   [
    "Customer managed key",
    "A KMS key you create and control, including its key policy, rotation, disabling and cross-account access."
   ],
   [
    "AWS managed key",
    "A KMS key created by an AWS service for your account, with a fixed key policy you cannot change."
   ],
   [
    "AWS owned key",
    "A key owned and used by an AWS service across many accounts, which you cannot view or manage."
   ],
   [
    "Envelope encryption",
    "Encrypting data with a data key and then encrypting that data key with a KMS key."
   ],
   [
    "GenerateDataKey",
    "A KMS API that returns a data key in plaintext and encrypted forms for local encryption."
   ],
   [
    "Encryption context",
    "Non-secret key-value pairs bound to a KMS encryption operation that must match on decryption."
   ],
   [
    "Multi-Region key",
    "A set of related KMS keys in different Regions sharing key material, so data can be decrypted in another Region without re-encryption."
   ]
  ],
  "example": "An application must encrypt 50 MB log archives before storing them. Calling `Encrypt` fails because it only accepts 4 KB of plaintext. Instead the code calls `GenerateDataKey` with an encryption context naming the archive date, encrypts the archive locally with the plaintext data key, discards that key, and stores the encrypted data key as object metadata alongside the file. To restore an archive, it calls `Decrypt` on the stored key with the same encryption context.",
  "mistakes": [
   [
    "Calling KMS Encrypt directly on large files.",
    "Encrypt is limited to 4 KB of plaintext. Use GenerateDataKey and envelope encryption, or a library such as the AWS Encryption SDK that does it for you."
   ],
   [
    "Storing the plaintext data key alongside the ciphertext.",
    "Store only the encrypted data key. The plaintext key should be used in memory and discarded; anyone with the plaintext key could decrypt the data without KMS."
   ],
   [
    "Choosing an AWS managed key for a cross-account or custom key policy requirement.",
    "AWS managed key policies cannot be edited, so they cannot grant other accounts access. Use a customer managed key."
   ],
   [
    "Thinking the KMS key policy alone is enough for cross-account access.",
    "The other account's IAM policy must also allow the KMS actions on the key's ARN."
   ]
  ],
  "tryit": [
   [
    "A messaging service encrypts each of millions of small messages per hour with its own data key from GenerateDataKey. It starts receiving ThrottlingException from KMS during peak hours. The security team is comfortable reusing a data key for a short time across many messages. What change should the developers make?",
    "Enable data key caching, for example with the AWS Encryption SDK's caching feature, with limits on age and number of messages per key. This cuts GenerateDataKey calls dramatically. Retries with exponential backoff help with occasional throttling, and a quota increase is another option if needed."
   ],
   [
    "A finance team must disable a key immediately if a breach is suspected and must let an auditing account decrypt reports. Currently their S3 data uses the aws/s3 key. Can they meet these requirements without changing keys?",
    "No. They need a customer managed key, because only customer managed keys can be disabled on demand by the customer and have key policies that can grant another account access. They should re-encrypt the data with the new key and update the key policy and the auditing account's IAM policy."
   ]
  ],
  "tip": "Any question with data larger than 4 KB and KMS points to envelope encryption with GenerateDataKey. Cross-account or custom key policy requirements rule out AWS managed keys. ThrottlingException points to data key caching, Bucket Keys, backoff or a quota increase.",
  "check": [
   [
    "What does GenerateDataKey return?",
    "A plaintext data key for immediate local encryption and a copy of the same key encrypted under the KMS key for storage."
   ],
   [
    "Why can't you share an AWS managed key with another account?",
    "Its key policy is controlled by AWS and cannot be edited, so it cannot grant access to other accounts."
   ],
   [
    "Name two ways to reduce KMS throttling.",
    "Cache data keys (for example with the Encryption SDK) and enable S3 Bucket Keys; also retry with backoff or request a quota increase."
   ],
   [
    "What must you supply to decrypt data that was encrypted with an encryption context?",
    "The exact same encryption context key-value pairs."
   ]
  ]
 },
 {
  "t": "Encryption in transit: TLS, ACM certificates (us-east-1 for CloudFront), enforcing aws:SecureTransport",
  "hook": "It is launch week at Saltmarsh Outfitters, an online store for sailing gear. Nadia requested a TLS certificate for shop.saltmarsh.example in AWS Certificate Manager this morning, validated it through DNS, and watched it turn to Issued in the Ireland Region, right next to the rest of the stack. Now she opens the Amazon CloudFront distribution settings to attach it, and the certificate list is empty. The marketing email goes out in four hours. The certificate exists, it is valid, and CloudFront cannot see it. What did she miss?",
  "simple": "Encryption in transit means scrambling data while it travels across a network, so nobody in the middle can read or change it. On the web this is TLS, the technology behind the padlock and https in your browser. A website proves its identity with a certificate, like an ID card issued by a trusted authority. AWS Certificate Manager gives you these certificates for free for use with AWS services and renews them automatically. One quirk to remember: the CloudFront content delivery service only looks for certificates in one specific AWS location, US East (N. Virginia). You can also write a storage rule that says 'refuse any request that is not encrypted', like a bank that will only accept sealed envelopes.",
  "body": [
   "Encryption in transit protects data moving over networks from eavesdropping and tampering. On AWS this almost always means Transport Layer Security (TLS), the protocol behind HTTPS. All AWS service API endpoints support TLS, and the AWS SDKs and the AWS Command Line Interface (CLI) use HTTPS by default, so calls from your code to AWS services are already encrypted. The developer's job is mostly about your own endpoints, such as websites and APIs, and about making sure clients cannot fall back to unencrypted connections.",
   "TLS works by having the server present a certificate issued by a trusted certificate authority, proving it controls the domain name the client asked for. The client checks the certificate chain and the name, and the two sides agree on session keys and encrypt everything that follows. For your own endpoints you therefore need a certificate for your domain, and someone has to renew it before it expires; an expired certificate shows a browser warning and breaks API clients.",
   "AWS Certificate Manager (ACM) handles this for integrated services. It provisions public TLS certificates at no extra cost for use with integrated services, validates domain ownership by DNS or by email, and renews certificates automatically. DNS validation is preferred: you add a CNAME record that ACM provides, and as long as that record stays in place, ACM can renew the certificate without anyone doing anything. Email validation requires someone to click an approval link at each renewal. You can also import third-party certificates into ACM, but ACM cannot renew imported certificates, so you must track their expiry and re-import them yourself.",
   "ACM certificates are deployed to integrated services, including Elastic Load Balancing, Amazon CloudFront, Amazon API Gateway and AWS Elastic Beanstalk environments through their load balancers. With standard ACM public certificates, you generally cannot export the private key to install on your own Amazon EC2 web server. If a scenario requires a certificate directly on an instance, the usual answer is to put a load balancer in front and terminate TLS there with an ACM certificate.",
   "ACM certificates are Regional resources, and this drives an exam favorite. CloudFront is a global service that only uses ACM certificates from the US East (N. Virginia) Region, `us-east-1`. If your CloudFront distribution, or an API Gateway edge-optimized custom domain name (which uses CloudFront under the hood), cannot find your certificate, you probably requested it in another Region. The fix is to request or import the certificate in `us-east-1`; with DNS validation, the same CNAME record often validates it. A Regional API Gateway custom domain, or an Application Load Balancer, uses a certificate from its own Region instead.",
   "Where TLS terminates matters too. An Application Load Balancer can terminate TLS, decrypting traffic and forwarding plain HTTP to targets in private subnets, or it can re-encrypt traffic to the targets with HTTPS if end-to-end encryption is required, for example by a compliance rule. A Network Load Balancer can terminate TLS with a TLS listener or pass encrypted traffic through untouched with a TCP listener, leaving the targets to handle the certificate. CloudFront has two separate legs to think about: the viewer protocol policy controls the connection from browsers to CloudFront, and the origin protocol policy controls the connection from CloudFront to your origin, so end-to-end HTTPS requires both to be set appropriately. When a certificate problem appears in production, check the certificate status and Region in the ACM console, confirm the domain name on the certificate matches the hostname clients use, and look for imported certificates nearing expiry, which ACM reports through Amazon CloudWatch metrics and events.",
   "Enforcing TLS for Amazon S3 uses the global condition key `aws:SecureTransport`, which is true when the request came over HTTPS and false otherwise. A bucket policy that denies all actions when it is false blocks any plain HTTP access, regardless of the caller's IAM permissions, because an explicit deny always wins in policy evaluation. Note that the policy covers both the bucket ARN and the objects ARN.",
   "```json\n{\n  \"Effect\": \"Deny\",\n  \"Principal\": \"*\",\n  \"Action\": \"s3:*\",\n  \"Resource\": [\"arn:aws:s3:::my-bucket\", \"arn:aws:s3:::my-bucket/*\"],\n  \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"false\" } }\n}\n```",
   "The same condition key works in Amazon Simple Notification Service (SNS) topic policies and Amazon Simple Queue Service (SQS) queue policies. For other services, enforce TLS through configuration: expose only HTTPS listeners, redirect HTTP to HTTPS with a CloudFront viewer protocol policy or an ALB listener redirect rule, require TLS in database connection settings, and choose security policies that set a minimum TLS version on load balancers, CloudFront distributions and API Gateway custom domains."
  ],
  "analogy": "A TLS certificate is like a notarized ID that a shop shows at the door so customers know it is the real shop, and ACM is a service that issues and renews those IDs automatically. The CloudFront rule is like a national chain whose head office, in one specific city, keeps every branch's ID on file; an ID filed in a regional office simply is not in its records. The aws:SecureTransport deny is a mailroom rule: postcards are refused, only sealed envelopes are accepted.",
  "terms": [
   [
    "TLS",
    "Transport Layer Security, the protocol that encrypts and authenticates network connections such as HTTPS."
   ],
   [
    "AWS Certificate Manager (ACM)",
    "A service that provisions, deploys and automatically renews TLS certificates for integrated AWS services."
   ],
   [
    "DNS validation",
    "Proving domain ownership to ACM with a CNAME record, which also lets ACM renew the certificate automatically."
   ],
   [
    "Imported certificate",
    "A third-party certificate stored in ACM that ACM cannot renew; you must replace it before expiry."
   ],
   [
    "aws:SecureTransport",
    "A global IAM condition key that is true when a request was made over TLS."
   ],
   [
    "TLS termination",
    "The point where encrypted traffic is decrypted, such as a load balancer or CloudFront."
   ]
  ],
  "example": "A team requests an ACM certificate for shop.example.com in eu-west-1 and tries to attach it to their CloudFront distribution, but it does not appear in the list. They request the certificate again in us-east-1, validate it with the same DNS record, and CloudFront can use it. They also set the viewer protocol policy to redirect HTTP to HTTPS, and add a bucket policy on the origin bucket denying requests where aws:SecureTransport is false.",
  "mistakes": [
   [
    "Requesting the CloudFront certificate in the same Region as the rest of the application.",
    "CloudFront, and edge-optimized API Gateway custom domains, only use ACM certificates from us-east-1. Regional endpoints such as an ALB use certificates from their own Region."
   ],
   [
    "Assuming ACM renews every certificate it holds.",
    "ACM automatically renews certificates it issued (most reliably with DNS validation), but not imported certificates."
   ],
   [
    "Planning to export an ACM public certificate to install on an EC2 web server.",
    "Standard ACM public certificates are for integrated services. Terminate TLS at a load balancer or CloudFront with the ACM certificate instead."
   ],
   [
    "Trying to enforce HTTPS with an Allow statement that requires aws:SecureTransport true.",
    "Other policies could still allow HTTP access. A Deny when aws:SecureTransport is false reliably blocks it, because explicit deny wins."
   ]
  ],
  "tryit": [
   [
    "A compliance rule says traffic must be encrypted all the way from the client to the application servers, which run on EC2 behind an Application Load Balancer. The team currently terminates TLS at the ALB and forwards HTTP to targets. What should change?",
    "Keep the HTTPS listener with the ACM certificate on the ALB, and change the target group to use HTTPS so the ALB re-encrypts traffic to the instances, which need their own certificate (for example a self-managed or private certificate). Alternatively, use a Network Load Balancer with TCP pass-through so the instances terminate TLS."
   ],
   [
    "Your API Gateway custom domain api.example.com is configured as a Regional endpoint in ap-southeast-2. A colleague insists the certificate must be created in us-east-1. Are they right?",
    "No. Regional custom domains use an ACM certificate in the same Region as the API, here ap-southeast-2. Only edge-optimized custom domains, which use CloudFront, need the certificate in us-east-1."
   ]
  ],
  "tip": "CloudFront (and edge-optimized API Gateway domains) need ACM certificates in us-east-1. To force HTTPS on an S3 bucket, deny requests where aws:SecureTransport is false in the bucket policy. DNS validation keeps ACM renewals automatic.",
  "check": [
   [
    "Why doesn't a certificate created in ap-southeast-2 show up for CloudFront?",
    "CloudFront only uses ACM certificates from the us-east-1 Region."
   ],
   [
    "What bucket policy condition blocks HTTP access to S3?",
    "A Deny statement with the condition Bool aws:SecureTransport equal to false."
   ],
   [
    "Why is DNS validation preferred for ACM certificates?",
    "As long as the CNAME record stays in place, ACM can renew the certificate automatically."
   ],
   [
    "Can ACM automatically renew a certificate you imported from another certificate authority?",
    "No; imported certificates must be renewed with the issuer and re-imported."
   ]
  ]
 },
 {
  "t": "Secrets and configuration: Secrets Manager (rotation) vs Systems Manager Parameter Store (SecureString, tiers)",
  "hook": "Ben inherits the order service at Hollowbrook Bakery Supply. In the repository he finds a file called config.prod.js containing the database host, three feature settings, a payment provider API key and the Aurora master password, all in plain text. The compliance officer has just added a new rule: database passwords must change every 30 days, with no outage. Ben has heard of both AWS Secrets Manager and Systems Manager Parameter Store, and both can hold encrypted values. Which one belongs where, and how does the password change monthly without the application falling over?",
  "simple": "Programs need settings, like which database to use, and secrets, like passwords. Neither should be written inside the code, where anyone who sees the code sees them. AWS offers two safe places to keep them. Parameter Store is like a tidy filing cabinet of labeled folders: cheap, simple, great for settings, and it can lock some drawers for secrets. Secrets Manager is like a security guard who not only keeps the passwords but also changes them on a schedule, updates the database to match, and makes sure the app always gets the working one. Pick the filing cabinet for everyday settings and low cost; pick the guard when passwords must be changed automatically.",
  "body": [
   "Applications need configuration values, such as feature settings, endpoint URLs and table names, and secrets, such as database passwords and third-party API keys. Both should live outside the code, in a service that controls access with IAM and records each retrieval in AWS CloudTrail. Moving them out of code means you can change a value without redeploying, give different values to each environment, and keep secrets out of source control. AWS offers two main options, and the DVA-C02 exam typically asks you to pick between them based on a keyword in the scenario.",
   "AWS Systems Manager Parameter Store is a hierarchical key-value store for configuration and secrets. Parameters have names like file paths, such as `/myapp/prod/db-url`, which lets you fetch a whole branch with `GetParametersByPath` and control access by path in IAM policies, for example allowing a production role to read only `/myapp/prod/*`. Parameter types are `String`, `StringList` and `SecureString`. SecureString values are encrypted with an AWS Key Management Service (KMS) key, either the AWS managed `aws/ssm` key or your own customer managed key, and are returned decrypted only when you pass `WithDecryption=true` and the caller has `kms:Decrypt` permission on that key. Every parameter keeps a version history, and you can reference a specific version or a label.",
   "Parameter Store has two tiers. Standard parameters are free, with a maximum value size of 4 KB and a per-Region count quota. Advanced parameters allow larger values, up to 8 KB, and support parameter policies such as expiration dates and notifications before expiry or when a value has not changed for a period; they are charged per parameter. Standard throughput is enough for most applications, and a higher throughput setting can be enabled for an extra charge when many functions read parameters at once.",
   "AWS Secrets Manager is built specifically for secrets, and its headline feature is automatic rotation. On a schedule you choose, Secrets Manager invokes a rotation Lambda function that runs four steps: create a new secret version, set the new credential in the database or service, test that it works, and finish by marking it current. AWS provides ready-made rotation functions for Amazon Relational Database Service (RDS), Amazon Aurora, Amazon Redshift and Amazon DocumentDB, and you can write your own for other systems, such as a third-party API.",
   "During rotation, staging labels track versions so applications always read a working value. `AWSCURRENT` marks the version applications should use, `AWSPENDING` marks the new version being created and tested, and `AWSPREVIOUS` marks the last good version, which is useful for rollback. Because the label only moves after the test step succeeds, an application that always requests `AWSCURRENT` never receives an untested password. Secrets Manager also supports cross-Region replication of secrets for multi-Region applications, resource-based policies for cross-account access, and generating random passwords with `GetRandomPassword`. Secrets are always encrypted with KMS, and pricing is a per-secret monthly charge plus API request charges.",
   "Choosing between them comes down to the requirement. If the scenario mentions automatic rotation of database credentials, cross-Region replicas of secrets, or native RDS integration, choose Secrets Manager. If it emphasizes low cost, simple configuration values, a hierarchy of settings, or storing non-secret configuration alongside a few encrypted values, choose Parameter Store with SecureString. The two are not exclusive: Parameter Store can reference Secrets Manager secrets through a special path prefix, `/aws/reference/secretsmanager/`, giving applications one API for both. Whichever you choose, access works the same way: grant each application role read permission (`ssm:GetParameter`, `ssm:GetParametersByPath` or `secretsmanager:GetSecretValue`) only on its own parameters or secrets, add `kms:Decrypt` on the key that protects them, and review CloudTrail to see which identities retrieved which values and when.",
   "How you read secrets matters for performance and cost. In AWS Lambda, fetch secrets during initialization, outside the handler, and cache them for a period instead of calling the service on every invocation; this reduces latency and API costs and avoids throttling. Refresh the cache periodically so rotated values are picked up. The AWS Parameters and Secrets Lambda Extension provides a local cache over HTTP for exactly this purpose.",
   "Infrastructure as code can inject values without exposing them. In AWS CloudFormation, dynamic references such as `{{resolve:secretsmanager:MySecret:SecretString:password}}` and `{{resolve:ssm-secure:/myapp/db-pass}}` (for supported resource properties) resolve values at deploy time, so they never appear in the template. Plain `{{resolve:ssm:...}}` references work for non-secret String parameters. Never store secrets in plain environment variables, in source control or in container images; reference them from one of these services instead."
  ],
  "analogy": "Parameter Store is a well-labeled filing cabinet in a shared office: folders by team and environment, a few drawers with locks for sensitive papers, and it costs almost nothing. Secrets Manager is a building's key management desk that not only stores master keys but re-cuts the locks every month, tests the new key before handing it out, and keeps the previous key in case something goes wrong. The analogy stops working on one point: Parameter Store can point to Secrets Manager entries, as if the filing cabinet held a note saying 'ask the key desk'.",
  "terms": [
   [
    "Secrets Manager rotation",
    "A scheduled process in which a Lambda function replaces a secret's credential in both the secret and the target service."
   ],
   [
    "SecureString",
    "A Parameter Store parameter type whose value is encrypted with a KMS key."
   ],
   [
    "Parameter hierarchy",
    "Path-style parameter names that group settings and allow retrieval and IAM control by path."
   ],
   [
    "Advanced parameter",
    "A paid Parameter Store tier with larger values and parameter policies such as expiration."
   ],
   [
    "Staging label",
    "A label such as AWSCURRENT, AWSPENDING or AWSPREVIOUS that marks which version of a secret is in use."
   ],
   [
    "Dynamic reference",
    "A CloudFormation placeholder that resolves a Parameter Store or Secrets Manager value at deploy time."
   ]
  ],
  "example": "A compliance team requires the production Aurora password to change every 30 days with no downtime. The developers store it in Secrets Manager with the built-in Aurora rotation function on a 30-day schedule, and their Lambda functions read the secret through the caching extension so new values are picked up within minutes. Non-secret settings, such as the table name and feature settings, go into Parameter Store under `/orders/prod/`, read once at initialization with `GetParametersByPath`.",
  "mistakes": [
   [
    "Choosing Parameter Store SecureString when the requirement is automatic rotation of RDS credentials.",
    "Parameter Store has no built-in rotation. Secrets Manager rotates RDS and Aurora credentials with provided Lambda rotation functions."
   ],
   [
    "Choosing Secrets Manager for dozens of plain configuration values to keep costs low.",
    "Secrets Manager charges per secret. Standard Parameter Store parameters are free and suit hierarchical configuration."
   ],
   [
    "Calling GetParameter without WithDecryption and expecting the plaintext SecureString.",
    "Without WithDecryption=true the value is returned encrypted; the caller also needs kms:Decrypt on the key."
   ],
   [
    "Fetching the secret inside the Lambda handler on every invocation.",
    "This adds latency, cost and throttling risk. Retrieve during initialization and cache with a refresh interval, for example with the Parameters and Secrets Lambda Extension."
   ]
  ],
  "tryit": [
   [
    "A startup runs 40 microservices, each needing about 15 configuration values per environment and a single third-party API key that changes only when the vendor requires it. Budget is tight and there is no rotation requirement. How should they store these values?",
    "Use Parameter Store: Standard String parameters in a path hierarchy such as `/service/env/name` for configuration, and a SecureString for each API key. IAM policies can restrict each service to its own path. Secrets Manager's per-secret cost and rotation features are not needed here."
   ],
   [
    "A global application runs in two Regions, and its database credentials must rotate every 60 days and be readable locally in both Regions with the same value. Which service and features fit?",
    "Secrets Manager, with automatic rotation on a 60-day schedule and cross-Region replication of the secret, so each Region reads a local replica that stays in sync with the primary."
   ]
  ],
  "tip": "Automatic rotation is the keyword for Secrets Manager. Cheapest way to store configuration and some encrypted values, organized in a hierarchy: Parameter Store with SecureString. In Lambda, read once at initialization and cache.",
  "check": [
   [
    "Which service rotates RDS credentials automatically?",
    "AWS Secrets Manager, using a rotation Lambda function."
   ],
   [
    "What is needed to read a SecureString in plaintext?",
    "Call GetParameter with WithDecryption set to true and have kms:Decrypt permission on the key used."
   ],
   [
    "Name one feature of Advanced parameters that Standard parameters lack.",
    "Parameter policies such as expiration, or larger value sizes (8 KB instead of 4 KB)."
   ],
   [
    "Which staging label should applications request to get the working secret?",
    "AWSCURRENT."
   ]
  ]
 },
 {
  "t": "Keeping sensitive data out of code and logs: default credential chain, no hardcoded keys, CloudWatch Logs data protection masking",
  "hook": "At 2 a.m. Lucia, on call for Pinecrest Payments, gets two alerts within ten minutes. The first is from a secret-scanning tool: an AWS access key appeared in a commit to a public repository that a contractor created for a demo. The second comes from a teammate debugging a refund issue, who pastes a CloudWatch log line into the team chat, and Lucia notices it contains a customer's full card number. Neither problem was an attack on AWS itself; both were sensitive data in the wrong place. What should Lucia do first, and how could both have been prevented?",
  "simple": "Two common ways secrets leak are through code and through logs. Code gets copied, shared and posted online, so a password written in it can travel anywhere. Logs are records your program writes about what it is doing, and if it writes down card numbers or passwords, everyone who can read the logs can see them. The safe habits are simple: programs running in AWS get temporary permissions automatically instead of carrying a permanent key, real secrets live in a secrets service, and logs only record what you need to fix problems. AWS can also blur out sensitive things like card numbers in logs, the way a receipt shows only the last four digits.",
  "body": [
   "Many real breaches start with a secret in the wrong place: an access key committed to a public repository, a database password baked into a container image, or a customer's card number printed in a debug log. None of these needs a sophisticated attacker, only someone who finds what was left lying around. The DVA-C02 exam checks that you know where sensitive data should and should not go, and which AWS features help you keep it there.",
   "Never hardcode AWS access keys in source code, configuration files, container images or plain environment variables. Code running on AWS should rely on the default credential provider chain built into every AWS SDK. The chain checks a defined sequence of sources, such as environment variables, shared configuration and credentials files, and then container and instance credential endpoints, and on AWS compute it automatically finds temporary credentials from the Lambda execution role, the ECS task role or the EC2 instance profile and refreshes them before they expire. Because the chain does this work, the correct code is simply to create the client with no credentials argument at all, such as `boto3.client('s3')`.",
   "Developers and pipelines need the same discipline. On a developer laptop, use named profiles with AWS IAM Identity Center (single sign-on) or other short-lived credentials rather than long-lived IAM user keys. In continuous integration and continuous delivery (CI/CD) systems outside AWS, use OpenID Connect (OIDC) federation with `AssumeRoleWithWebIdentity` instead of storing access keys as pipeline secrets. If a key is ever exposed, act in this order: deactivate and delete it immediately, then investigate its use in AWS CloudTrail, looking for unfamiliar API calls, new IAM users or roles, and resources launched in unused Regions. Assume an exposed key was used, even if it was public for only minutes, because automated scanners search public repositories continuously.",
   "Application secrets such as database passwords and third-party API keys belong in AWS Secrets Manager or in Systems Manager Parameter Store as a SecureString, retrieved at runtime by a role that has permission to read only that secret. Keep them out of source control, using `.gitignore` for local environment files, out of AWS CloudFormation templates, using dynamic references and `NoEcho` parameters, and out of build logs, where a command that echoes its arguments can print a secret. Secret-scanning tools in repositories and CI pipelines can flag secrets that slip into code before they are merged.",
   "Logs are the other common leak. Log what you need to troubleshoot, such as request IDs, operation names, error codes, durations and non-sensitive identifiers, but not passwords, tokens, full card numbers or personal data. Avoid logging entire incoming events or request headers by default; an API Gateway event passed to Lambda can include an `Authorization` header, and a request body can include personal information. Log a sanitized subset instead. Structured JSON logging with explicit fields, for example a log line with `requestId`, `orderId`, `status` and `latencyMs`, makes this easier to control than printing whole objects, and it also makes CloudWatch Logs Insights queries simpler.",
   "Amazon CloudWatch Logs data protection adds a safety net for the mistakes that still happen. You attach a data protection policy to a log group, or account-wide, that uses managed data identifiers for common sensitive types, such as email addresses, credit card numbers, AWS secret access keys and various national identifiers, and you can add custom data identifiers defined with regular expressions for your own formats, such as internal account numbers. Matching data is masked when viewed in the console, in Logs Insights, and in subscriptions and exports; only principals with the `logs:Unmask` permission can see the original values.",
   "The data protection policy can also produce audit findings, sent to CloudWatch Logs, Amazon S3 or Amazon Data Firehose, so you learn that sensitive data is being logged and can fix the code rather than relying on masking forever. Keep two limits in mind: masking only applies to log events ingested after the policy is in place, so older events are not retroactively masked, and masking protects readers of the logs but does not remove the need to stop logging the data in the first place.",
   "Other layers complete the picture. Encrypt log groups with a KMS key if your requirements call for customer-controlled keys, set log retention periods instead of keeping logs forever, and restrict who can read log groups with IAM. For data in S3, Amazon Macie can discover and report sensitive data, such as personal information, in buckets. Together these practices mean a leaked repository contains no working keys, and a leaked log line contains no usable secrets."
  ],
  "analogy": "Keeping secrets out of code and logs is like running a hotel front desk. Staff do not write the safe combination on a sticky note by the register (hardcoded keys); they use their own badge, which the hotel issues and expires automatically (the credential chain and roles). The guest register records who checked in and when, not their full card number (careful logging). CloudWatch Logs data protection is like a receipt printer that only ever prints the last four digits, while the manager's key (logs:Unmask) can see more. The analogy stops working in one place: masking applies only to entries written after the policy exists.",
  "terms": [
   [
    "Default credential provider chain",
    "The ordered sequence of credential sources the AWS SDKs check automatically, including role credentials on AWS compute."
   ],
   [
    "Hardcoded credentials",
    "Access keys or passwords written directly into code or artifacts, easily leaked and hard to rotate."
   ],
   [
    "Structured logging",
    "Writing log events as consistent fields, often JSON, so content is controlled and easy to query."
   ],
   [
    "Data protection policy",
    "A CloudWatch Logs policy that detects and masks sensitive data in log events using data identifiers."
   ],
   [
    "Managed data identifier",
    "A predefined pattern for a sensitive data type, such as credit card numbers, used by CloudWatch Logs data protection."
   ],
   [
    "Custom data identifier",
    "A regular expression you define so CloudWatch Logs data protection can detect your own sensitive formats."
   ],
   [
    "logs:Unmask",
    "The IAM permission that lets a principal view masked sensitive values in CloudWatch Logs."
   ]
  ],
  "example": "A payments team discovers a debug statement logging full request bodies, including card numbers. They remove it and switch to structured logs with an explicit list of safe fields. They also attach a data protection policy to the service's log groups with the credit card managed identifier. Future accidental leaks appear masked, only the security team holds logs:Unmask, and audit findings sent to an S3 bucket alert them if card data shows up again.",
  "mistakes": [
   [
    "Putting access keys in Lambda environment variables because they are 'encrypted at rest'.",
    "The function already has an execution role; the SDK credential chain uses its temporary credentials. Long-term keys anywhere in a deployment are unnecessary and risky."
   ],
   [
    "Deleting an exposed key from the repository history and considering the incident closed.",
    "The key must be deactivated and deleted in IAM, and CloudTrail reviewed for misuse. Removing it from history does not stop copies already taken."
   ],
   [
    "Expecting a new data protection policy to mask sensitive data already stored in the log group.",
    "Masking applies only to log events ingested after the policy is created."
   ],
   [
    "Relying on masking instead of fixing the logging code.",
    "Masking is a safety net. Audit findings should drive code fixes so sensitive data is not logged at all."
   ]
  ],
  "tryit": [
   [
    "A team runs nightly deployments from a CI service hosted outside AWS. Today the pipeline uses an IAM user's access key stored as a pipeline secret, and the security team wants it removed. The CI service can issue OIDC identity tokens for each job. What should the team set up?",
    "Create an IAM OIDC identity provider for the CI service and a deployment role whose trust policy allows `sts:AssumeRoleWithWebIdentity` from that provider, with conditions limiting it to the specific repository and branch. The pipeline exchanges its job token for temporary credentials, and the IAM user and its keys are deleted."
   ],
   [
    "Support engineers need to read application logs to troubleshoot, but logs sometimes contain customer email addresses. Compliance says support must not see email addresses, while the security team must be able to investigate them. What should the developers configure?",
    "Attach a CloudWatch Logs data protection policy with the email address managed data identifier to the log groups. Support sees masked values; grant `logs:Unmask` only to the security team. Also fix the code paths that log email addresses, using the audit findings to find them."
   ]
  ],
  "tip": "For code on AWS, the right answer is a role picked up through the default credential chain, not access keys anywhere. For sensitive data in logs, the AWS-native answer is a CloudWatch Logs data protection policy, with logs:Unmask controlling who sees originals.",
  "check": [
   [
    "What should a developer do with an access key accidentally pushed to a public repository?",
    "Deactivate and delete it immediately, review CloudTrail for its use, and switch the code to role-based or federated temporary credentials."
   ],
   [
    "Who can see the original value of data masked by CloudWatch Logs data protection?",
    "Only principals granted the logs:Unmask permission."
   ],
   [
    "Does a data protection policy mask events already stored before it was created?",
    "No; it applies to log events ingested after the policy is in place."
   ],
   [
    "How should a Lambda function's code obtain AWS credentials?",
    "By creating SDK clients without explicit credentials, so the default credential chain uses the execution role's temporary credentials."
   ]
  ]
 },
 {
  "t": "Presigned URLs for temporary S3 access; IAM Access Analyzer for least privilege",
  "hook": "Grace builds the customer portal for Alder Valley Utilities. Customers want to download their monthly bill PDFs and upload photos of their meters. The bills sit in a private S3 bucket, and a colleague suggests the quickest fix: make the bucket public and rely on hard-to-guess file names. Grace pictures a reporter discovering thousands of customers' bills open to anyone. At the same time, the security lead asks her to prove that the portal's backend role can do only what it needs. How can strangers on the internet reach exactly one file, briefly, while everything else stays locked?",
  "simple": "A presigned URL is a temporary link to one file in a private S3 bucket. Your server, which has permission, creates the link and signs it. Anyone with the link can download (or upload) that one file until the link expires, but nothing else in the bucket opens up. It is like a valet ticket: it works for one car, for a limited time, and only because the parking company issued it. IAM Access Analyzer is a different helper that reviews your permissions, warns you when something is shared with outsiders, spots permissions nobody uses, and can write a tighter permission policy based on what your program actually did.",
  "body": [
   "Sometimes a user without AWS credentials needs to download or upload one specific S3 object: a customer fetching an invoice PDF, or a mobile app uploading a profile photo. Making the bucket public would expose everything in it, and proxying every file through your own servers adds cost and latency. A presigned URL solves this by granting temporary access to exactly one object operation, while the bucket and object stay private.",
   "Your backend, running with credentials that have permission for the operation, generates the URL with the SDK or the AWS Command Line Interface (CLI). The URL contains the bucket, key, operation and expiration, plus an AWS Signature Version 4 (SigV4) signature computed with the generator's credentials, visible as query string parameters such as `X-Amz-Expires` and `X-Amz-Signature`. Generating the URL is a local computation; no call to S3 is made at that moment. Anyone holding the URL can perform that operation until it expires, and when they use it, S3 verifies the signature and checks whether the signing identity still has permission at request time.",
   "```python\nurl = s3.generate_presigned_url(\n    'get_object',\n    Params={'Bucket': 'invoices', 'Key': 'cust-42/inv-1001.pdf'},\n    ExpiresIn=300)  # seconds\n```",
   "From the CLI, `aws s3 presign s3://invoices/cust-42/inv-1001.pdf --expires-in 300` creates a download URL valid for five minutes. For uploads, generate a presigned `put_object` URL, or a presigned POST, which also lets you set conditions such as a maximum file size, an allowed content type and a required key prefix for browser form uploads. Uploading directly to S3 this way means large files never pass through your API or Lambda function, which avoids payload limits and saves compute time.",
   "Several details decide whether a presigned URL works, and they appear in exam questions. The URL can never grant more than the signer's permissions, because S3 evaluates the signer's identity. It stops working early if the signing credentials expire, which is why a URL generated by a Lambda function with role credentials cannot outlive that role session, even if `ExpiresIn` is longer; for long-lived links, sign with credentials that last at least as long. With SigV4, the maximum expiry is seven days. If the signer's permission is removed, existing URLs stop working. And a presigned URL is a bearer token: anyone who obtains it can use it, so share it only over HTTPS and keep expirations short. For content served through Amazon CloudFront, CloudFront signed URLs or signed cookies are the equivalent mechanism.",
   "IAM Access Analyzer helps with the other half of the job: making sure policies grant only what is needed and that nothing is shared unintentionally. External access analysis examines resource-based policies on S3 buckets, AWS Key Management Service (KMS) keys, IAM roles, Lambda functions, Amazon Simple Queue Service (SQS) queues, AWS Secrets Manager secrets and other supported resources. It produces findings when a resource is shared with a principal outside your zone of trust, which is your account or your organization, such as a public bucket or a role trusted by an unknown account. You can archive findings for intended sharing, so the remaining active findings highlight real problems.",
   "Access Analyzer has further capabilities aimed at developers. Unused access analysis finds unused roles, access keys, passwords and unused permissions within roles and users, so you can remove them. Policy generation reviews AWS CloudTrail activity for a role or user over a period you choose and generates a policy containing only the actions actually used, which is an excellent starting point for least privilege. Policy validation checks policies as you write them, reporting errors, security warnings and suggestions for overly broad grants. Custom policy checks can run in a CI/CD pipeline to block risky changes, such as a new policy that grants more access than the current one, before deployment.",
   "A practical least-privilege workflow for an application role ties these together. Start with broader permissions only in development, run the application through realistic tests, use Access Analyzer policy generation from the resulting CloudTrail activity, refine the generated policy with specific resource Amazon Resource Names (ARNs), validate it, and deploy it. Then review unused access findings over time and trim permissions the application no longer uses. For Grace's portal, that means a backend role that can call `s3:GetObject` on the bills prefix and `s3:PutObject` on the meter photo prefix, used to sign short-lived presigned URLs, with no public bucket at all."
  ],
  "analogy": "A presigned URL is like a valet parking ticket. The valet company (your backend with permissions) issues it, it works for exactly one car, and it expires at closing time. Whoever holds the ticket can collect the car, which is why you keep it safe. If the valet company loses its license (the signer's credentials expire or lose permission), every ticket it issued stops working. IAM Access Analyzer is the company's auditor, checking which keys were handed to outsiders and which keys nobody has used in months.",
  "terms": [
   [
    "Presigned URL",
    "A URL signed with an identity's credentials that grants temporary access to a specific S3 operation on one object."
   ],
   [
    "Presigned POST",
    "A signed form policy allowing browser uploads to S3 with conditions such as size limits and key prefixes."
   ],
   [
    "Bearer token",
    "A credential that grants access to whoever holds it, without further proof of identity."
   ],
   [
    "IAM Access Analyzer",
    "A service that finds externally shared and unused access, validates policies, and generates least-privilege policies from activity."
   ],
   [
    "Zone of trust",
    "The account or organization that Access Analyzer treats as internal when reporting external access."
   ],
   [
    "Policy generation",
    "An Access Analyzer feature that builds a policy from the actions a role or user actually used, based on CloudTrail activity."
   ]
  ],
  "example": "A photo app's backend Lambda function generates a presigned PUT URL that expires in five minutes for the key uploads/user-123/avatar.jpg. The phone uploads directly to S3 with that URL, so large files never pass through the API, and the bucket remains fully private. Later, the team runs Access Analyzer policy generation on the function's role and replaces its broad S3 policy with one allowing only s3:PutObject on the uploads prefix.",
  "mistakes": [
   [
    "Making a bucket public so customers can download their own files.",
    "A public bucket exposes everything. Generate a presigned URL for the one object each customer needs, keeping the bucket private."
   ],
   [
    "Expecting a presigned URL to work for its full ExpiresIn period no matter how it was signed.",
    "The URL also expires when the signing credentials do. A URL signed with a Lambda role's temporary credentials stops working when that session ends."
   ],
   [
    "Believing a presigned URL can grant access the signer lacks.",
    "S3 checks the signer's permissions at request time; the URL can only allow what the signer could do."
   ],
   [
    "Thinking Access Analyzer external access findings cover identity-based policies like 'this user has s3:*'.",
    "External access analysis examines resource-based policies for sharing outside the zone of trust. Overly broad identity permissions are addressed by unused access analysis, policy validation and policy generation."
   ]
  ],
  "tryit": [
   [
    "A video platform lets creators upload files of up to several gigabytes from a browser. Today uploads go through API Gateway and Lambda, which fails for large files. The team wants direct uploads to S3 while restricting each creator to their own prefix and limiting file size and type. What should they use?",
    "Have the backend generate a presigned POST for each upload with conditions on the key prefix (the creator's folder), content-length range and content type. The browser posts the file straight to S3, bypassing API Gateway and Lambda payload limits, and S3 enforces the conditions."
   ],
   [
    "Security asks a team to tighten a Lambda function's role, which currently allows dynamodb:* on all tables. The function has run in production for a month with CloudTrail enabled. What is the fastest reliable way to produce a least-privilege policy?",
    "Use IAM Access Analyzer policy generation on the role over the past month's CloudTrail activity, then refine the generated policy with the specific table ARNs, validate it with Access Analyzer policy validation, and replace the broad policy."
   ]
  ],
  "tip": "Temporary access to a private S3 object for someone without AWS credentials: presigned URL. Remember the URL is limited by both its expiry and the lifetime and permissions of the credentials that signed it. Least privilege from real usage: Access Analyzer policy generation.",
  "check": [
   [
    "Why might a presigned URL created in Lambda stop working before its ExpiresIn time?",
    "It was signed with the execution role's temporary credentials, and the URL becomes invalid when those credentials expire."
   ],
   [
    "Can a presigned URL grant access the signer does not have?",
    "No; S3 evaluates the signer's permissions, so the URL can only allow what the signer is allowed to do."
   ],
   [
    "Which Access Analyzer feature builds a policy based on what a role actually did?",
    "Policy generation, which analyzes CloudTrail activity for the role."
   ],
   [
    "What is the maximum expiry for a presigned URL signed with SigV4?",
    "Seven days."
   ]
  ]
 },
 {
  "t": "Preparing artifacts: .zip packages vs container images in ECR, Lambda layers, dependency packaging, CodeArtifact",
  "hook": "It is Thursday afternoon at Lantern Analytics, and Priya has just added a forecasting library to the team's Lambda function. The deploy script fails with a message that the unzipped package is too large. She trims the tests folder and tries again. This time the upload works, but the first invocation dies with an import error about a missing shared object file, a library she built on her laptop. Her manager asks whether they should split the code into layers, move to a container image, or set up a private package repository. Three different tools, one broken release, and a demo tomorrow morning. Which packaging choice actually fixes her problem, and why?",
  "simple": "Before AWS can run your code, you have to hand it over in a box. Lambda accepts two kinds of box. The first is a .zip file: your code plus the libraries it needs, run on a language environment that AWS keeps patched. The second is a container image, a bigger, self-contained box you build yourself and store in Amazon's image library, ECR. Layers are like shared toolkits that many functions can borrow so each box stays small. CodeArtifact is a private, managed shelf for software libraries, so your builds always get the same trusted versions. Think of moving house: small items go in standard boxes, a piano needs a crate, and the tools everyone shares live in the garage.",
  "body": [
   "Every Lambda function starts life as a deployment artifact, the packaged form of your code that the service stores and runs. The AWS Certified Developer Associate exam expects you to know the two Lambda packaging formats, the size limits that push you from one to the other, how dependencies must be built, how layers share code, and how AWS CodeArtifact keeps package sources under control. Most questions describe a symptom, such as a size error or an import failure, and ask which packaging change fixes it.",
   "The first format is the .zip file archive. It contains your handler code and every library it needs that the runtime does not already provide. You can upload a .zip directly through the console, CLI or API when it is up to 50 MB zipped; for larger archives you upload to Amazon Simple Storage Service (S3) first and point the function at the object. Regardless of how it is uploaded, the unzipped size of the function code plus all of its layers must be no more than 250 MB. A .zip function runs on a managed runtime such as Python, Node.js or Java, and AWS applies security patches to that runtime for you, which is a real operational benefit: you deploy code, not an operating system.",
   "The second format is a container image. You write a Dockerfile, usually starting from an AWS-provided base image for your language, which already includes the Lambda Runtime Interface Client that lets the container talk to the Lambda service. You build the image, push it to Amazon Elastic Container Registry (ECR), and create the function from the image URI. Images can be up to 10 GB, which makes them the answer when dependencies are large, such as machine learning libraries or bundled binaries, and they let teams reuse familiar container tooling, scanning and build pipelines. The trade-offs are worth memorizing. Because the runtime is baked into your image, you must rebuild and redeploy to pick up runtime patches. The image must live in an ECR repository in the same Region as the function, although a repository in another account can be used if its repository policy grants access. Finally, the package type is fixed at creation: you cannot convert an existing function from .zip to image or back; you create a new function instead.",
   "Dependencies deserve their own attention because they cause the most confusing failures. Lambda runs on Amazon Linux on either the x86_64 or arm64 architecture. For interpreted languages, you install libraries into the folder you will zip, for example `pip install -r requirements.txt -t package/`, then zip that folder together with your handler. Pure-Python or pure-JavaScript libraries usually work wherever you install them. Libraries with native compiled code are different: if you build them on a Mac or Windows laptop, the compiled binaries target the wrong operating system or processor, and the function fails at import time with errors about missing modules or invalid ELF headers. The fix is to build in an environment that matches Lambda, such as `sam build --use-container`, which runs the build inside a Lambda-like container, or to download platform-specific wheels for the target architecture.",
   "Keeping packages lean matters for both the size limits and deployment speed. Exclude tests, documentation and development-only dependencies. Do not bundle the AWS SDK if the runtime already includes it, unless you deliberately need to pin a specific SDK version for consistent behavior. Smaller packages upload faster and are easier to inspect, and a .zip under the console's editing limit can still be edited in the browser for quick experiments.",
   "Lambda layers solve the problem of shared dependencies. A layer is a separate .zip archive of libraries, common code or data that many functions can attach. Each function's own package then contains only its handler, which keeps it small and makes it editable in the console. At runtime, layer contents are extracted to `/opt` in the execution environment, and each runtime looks in specific subfolders: Python libraries go under `python/` (so they appear at `/opt/python`), and Node.js modules go under `nodejs/node_modules/`. If a layer is built with the wrong folder structure, the function cannot find the library even though the layer is attached, which is a common exam scenario. A function can use up to five layers, and their combined unzipped size counts toward the 250 MB limit. Layers are also how Lambda extensions, such as monitoring or configuration agents, are delivered. Note that layers apply to .zip functions; container image functions include everything inside the image instead.",
   "AWS CodeArtifact addresses a different question: where do your builds get packages from in the first place? CodeArtifact is a managed artifact repository that supports package formats such as npm, PyPI, Maven and NuGet. A domain groups related repositories and handles shared storage and permissions. A repository can have upstream repositories, so a team repository can pull from a shared company repository, and an external connection to a public registry such as the public npm registry or PyPI. Builds then fetch public packages through CodeArtifact, which caches copies, while your team also publishes private internal packages to the same place. If a public package version is removed or a registry has an outage, the cached copy keeps builds working.",
   "Authentication to CodeArtifact uses short-lived authorization tokens rather than stored passwords. A developer or an AWS CodeBuild project runs a command such as `aws codeartifact login --tool pip --domain my-domain --repository my-repo`, which obtains a token and configures the package manager to use the repository endpoint. Access is controlled with IAM permissions and resource policies on domains and repositories. The benefits the exam highlights are consistent, repeatable builds, an auditable record of which packages and versions are in use, and resilience against changes in public registries.",
   "Putting it together: choose .zip when dependencies fit within 250 MB unzipped and you want AWS to patch the runtime; choose a container image when you need up to 10 GB or container tooling; use layers to share libraries across .zip functions; build native dependencies in a Lambda-compatible environment; and use CodeArtifact to give builds a controlled, cached source of packages."
  ],
  "analogy": "Packaging a Lambda function is like shipping goods. A .zip is a standard parcel: cheap and easy, but the carrier has a strict size limit, and the carrier maintains the truck. A container image is a shipping container: it holds far more, and you control everything inside, but you also have to maintain its contents yourself. Layers are a shared toolbox delivered alongside many parcels. CodeArtifact is your company warehouse that stocks approved parts. The analogy breaks on one point: you cannot repack an existing function from parcel to container; you create a new function.",
  "terms": [
   [
    ".zip deployment package",
    "An archive of function code and dependencies deployed to a managed Lambda runtime; up to 50 MB zipped for direct upload and 250 MB unzipped including layers."
   ],
   [
    "Container image function",
    "A Lambda function packaged as an OCI image up to 10 GB, stored in Amazon ECR in the same Region as the function."
   ],
   [
    "Amazon ECR",
    "Elastic Container Registry, AWS's managed registry for container images."
   ],
   [
    "Lambda layer",
    "A separately versioned archive of libraries or code, extracted to /opt, that many functions can share; a function can use up to five layers."
   ],
   [
    "Lambda Runtime Interface Client",
    "The component in AWS base images that lets a container image communicate with the Lambda service."
   ],
   [
    "AWS CodeArtifact",
    "A managed package repository that proxies public registries and hosts private packages for build tools."
   ],
   [
    "External connection",
    "A CodeArtifact link from a repository to a public registry so public packages are fetched and cached through it."
   ]
  ],
  "example": "A data science team's function needs 3 GB of Python libraries, far above the 250 MB unzipped limit for .zip packages. They build a container image from the AWS Python base image, push it to ECR and create the function from the image URI.",
  "mistakes": [
   [
    "Raising the function's memory or timeout fixes a package-too-large error.",
    "Memory and timeout do not change package limits. Dependencies over 250 MB unzipped (function plus layers) call for a container image, which allows up to 10 GB."
   ],
   [
    "Layers let you exceed the 250 MB limit because they are stored separately.",
    "Layer contents count toward the same 250 MB unzipped total. Layers reduce duplication and keep function packages small, but they do not add capacity."
   ],
   [
    "An import error for a native library means the library is missing from the package.",
    "It often means the library is present but was compiled for the wrong OS or architecture. Build with sam build --use-container or platform-specific wheels for Amazon Linux on the right architecture."
   ],
   [
    "You can switch an existing function from a .zip package to a container image in its configuration.",
    "The package type is fixed when the function is created. To move to an image, create a new function from the ECR image URI."
   ]
  ],
  "tryit": [
   [
    "Ten Lambda functions at Harbor Logistics each bundle the same 40 MB internal data-validation library, and every bug fix to it means redeploying all ten. The functions are .zip packages and well under the size limits. What should the team do?",
    "Put the shared library in a Lambda layer with the correct runtime folder structure (for example python/ for Python) and attach it to all ten functions. Updates then mean publishing a new layer version and updating the functions' layer references, and each function package shrinks to just its handler code."
   ],
   [
    "A security review at Northwind Credit asks that CodeBuild never download packages straight from the public internet, but developers still need public open-source libraries plus a few private ones. Which service and setup fit?",
    "AWS CodeArtifact with a repository that has an external connection to the public registry and holds the private packages. CodeBuild authenticates with aws codeartifact login, fetches everything through the managed, cached repository, and the team gains an audit trail of package versions."
   ]
  ],
  "tip": "Dependencies larger than 250 MB unzipped point to container images (up to 10 GB). Import errors for native libraries usually mean the package was built on a different OS or architecture than Lambda's. A layer that is attached but whose library is not found usually has the wrong folder structure.",
  "check": [
   [
    "What is the maximum size of a Lambda container image?",
    "10 GB."
   ],
   [
    "Where are layer contents made available inside the execution environment?",
    "Under /opt, in runtime-specific subdirectories such as /opt/python."
   ],
   [
    "Why use CodeArtifact external connections?",
    "To fetch public packages through a managed, cached repository so builds are consistent, auditable and resilient to public registry changes."
   ],
   [
    "What is the maximum unzipped size of a .zip function including its layers?",
    "250 MB; beyond that, use a container image."
   ],
   [
    "Can an existing .zip function be converted to a container image function?",
    "No. The package type is set at creation, so you create a new function from the image."
   ]
  ]
 },
 {
  "t": "AWS SAM: template structure, sam build, sam deploy --guided, sam local invoke / start-api, samconfig.toml",
  "hook": "Marcus joins the platform team at Juniper Health Services on a Monday. His first ticket: add a new GET route to the appointments API and prove it works before lunch. The previous developer left a folder with a template.yaml, a src directory and a file called samconfig.toml, but no notes. Marcus does not want to click through the console, and he certainly does not want to deploy straight to the shared account to find out whether his handler parses the path parameter correctly. He opens the template and sees a Transform line at the top and an Events block under the function. What do these pieces do, and how can he test locally and then deploy with a single command?",
  "simple": "AWS SAM is a shortcut for describing and shipping serverless apps. Instead of writing hundreds of lines to set up a function, its trigger and its permissions, you write a short recipe file called a template, and SAM expands it into the full instructions AWS needs. SAM also comes with a command-line tool. One command gathers your code and libraries, another runs your function on your own computer inside a small container so you can test it, and another sends everything to AWS. The first time you deploy, SAM asks you a few questions and remembers your answers in a settings file. It is like a meal kit: a short card of instructions, the ingredients prepared for you, and a note of how you liked it last time.",
  "body": [
   "The AWS Serverless Application Model (SAM) is an open-source framework for building serverless applications on AWS. It has two parts that the exam treats separately. The first is a template format: an extension of AWS CloudFormation that adds concise resource types for serverless building blocks. The second is the SAM command line interface (CLI), which builds your code, runs it locally for testing, and deploys it. Knowing which part does what, and which CLI command answers which need, is the core of most SAM questions.",
   "A SAM template is a CloudFormation template with one essential line: `Transform: AWS::Serverless-2016-10-31`. That transform tells CloudFormation to expand the SAM resource types into full CloudFormation resources during deployment, so a single `AWS::Serverless::Function` might become a Lambda function, an IAM execution role, an API Gateway method and a Lambda permission. If you see that line, you are looking at a SAM template; without it, the SAM types would be rejected. The main SAM resource types are `AWS::Serverless::Function`, `AWS::Serverless::Api` for REST APIs and `AWS::Serverless::HttpApi` for HTTP APIs, `AWS::Serverless::SimpleTable` for a basic Amazon DynamoDB table with a single primary key, `AWS::Serverless::LayerVersion`, `AWS::Serverless::StateMachine` for AWS Step Functions and `AWS::Serverless::Application` for nested applications.",
   "Two other template features save a lot of repetition. The `Globals` section sets properties shared by all functions, or all APIs, such as runtime, timeout, memory size, tracing and environment variables, so each function definition only lists what is different. And because a SAM template is still CloudFormation, you can include any ordinary CloudFormation resource alongside the SAM types, plus `Parameters`, `Conditions`, `Mappings` and `Outputs`. Here is a compact example.",
   "```yaml\nTransform: AWS::Serverless-2016-10-31\nGlobals:\n  Function:\n    Runtime: python3.12\n    Timeout: 10\nResources:\n  GetOrder:\n    Type: AWS::Serverless::Function\n    Properties:\n      Handler: app.handler\n      CodeUri: src/\n      Policies:\n        - DynamoDBReadPolicy:\n            TableName: !Ref Orders\n      Events:\n        Api:\n          Type: Api\n          Properties: { Path: /orders/{id}, Method: get }\n  Orders:\n    Type: AWS::Serverless::SimpleTable\n```",
   "Notice how much the function definition does. The `Events` property creates the trigger, here an API Gateway route for `GET /orders/{id}`, along with the resource-based permission that lets API Gateway invoke the function. Other event types include S3, SQS, SNS, DynamoDB streams, Kinesis, EventBridge schedules and rules. The `Policies` property accepts SAM policy templates such as `DynamoDBReadPolicy`, `DynamoDBCrudPolicy`, `S3ReadPolicy` or `SQSPollerPolicy`, which take a parameter like a table or bucket name and expand into least-privilege IAM statements scoped to that resource. You can also attach managed policy ARNs or inline policy documents. Functions can define `AutoPublishAlias` to publish a new version and move an alias on each deployment, and `DeploymentPreference` to have AWS CodeDeploy shift traffic gradually using canary or linear patterns with alarms for rollback.",
   "The typical CLI workflow follows a clear sequence. `sam init` creates a new project from a starter template, choosing a runtime and example application. `sam build` resolves dependencies, for example installing packages from `requirements.txt` or `package.json`, and prepares deployment artifacts in the `.aws-sam/build` folder along with a copy of the template that points at them. Adding `--use-container` performs the build inside a Lambda-like Docker container, which matters when dependencies include native compiled code. `sam validate` checks the template for errors before you deploy.",
   "`sam deploy --guided` is the interactive first deployment. It prompts for the stack name, AWS Region, values for template parameters, whether to confirm changes before deploying, and whether SAM may create IAM roles, and then saves your answers to `samconfig.toml` in the project directory. After that, plain `sam deploy` reads those saved settings, so repeat deployments are one short command. Under the hood, deploy uploads the built artifacts to an S3 bucket (SAM can create and manage one for you), rewrites the template with the S3 locations, and creates or updates a CloudFormation stack through a change set. `samconfig.toml` can hold several environments, for example a `[default]` section and a `[prod]` section, selected with `--config-env prod`, which keeps per-environment stack names and parameters out of your shell history.",
   "Local testing is where SAM saves the most time, and it requires Docker on your machine because SAM runs your function in a container that emulates the Lambda execution environment. `sam local invoke GetOrder -e events/get.json` runs one function once with a test event file and prints the result and logs. `sam local generate-event` produces realistic sample events for sources such as S3, SQS, SNS or API Gateway, so you do not have to handcraft JSON. `sam local start-api` starts a local HTTP server that emulates your API Gateway routes, so you can call endpoints with a browser or curl and see changes after rebuilding. `sam local start-lambda` emulates the Lambda invoke endpoint, which lets automated tests or the AWS SDK call your functions locally. Remember that local emulation does not enforce IAM permissions or real service limits, so it complements rather than replaces testing in a deployed environment.",
   "For faster iteration in the cloud, `sam sync --watch` watches your files and pushes code changes directly to a development stack, skipping a full CloudFormation update when only code changed; it is meant for development, not production. `sam logs` fetches or tails a function's Amazon CloudWatch Logs from the command line, and `sam delete` removes the stack. For the exam, anchor on the essentials: the Transform line identifies SAM, `sam build` prepares artifacts, `sam deploy --guided` writes `samconfig.toml`, `sam local invoke` runs a single event, and `sam local start-api` tests an API locally."
  ],
  "analogy": "A SAM template is like a short order at a sandwich shop: you say 'the usual club', and the kitchen expands that into bread, fillings, toasting and wrapping. The Transform line is telling the kitchen to read the shorthand menu. sam local is tasting the sandwich in the kitchen before it leaves, and samconfig.toml is the loyalty card that remembers your order. Where it stops: tasting in the kitchen cannot tell you whether the delivery driver has the right key to the building, just as local runs do not check real IAM permissions.",
  "mnemonic": "Init, Build, Local, Deploy: 'I Bake, Look, Deliver.' Create the project, build artifacts into .aws-sam/build, test with sam local, then deploy (guided the first time, saving samconfig.toml).",
  "terms": [
   [
    "Transform: AWS::Serverless-2016-10-31",
    "The template declaration that makes CloudFormation process SAM resource types."
   ],
   [
    "sam build",
    "The SAM CLI command that installs dependencies and prepares deployment artifacts."
   ],
   [
    "sam deploy --guided",
    "An interactive deployment that prompts for settings and saves them to samconfig.toml."
   ],
   [
    "sam local start-api",
    "Runs a local emulation of API Gateway routes backed by functions running in Docker."
   ],
   [
    "SAM policy template",
    "A named, parameterized IAM policy, such as DynamoDBReadPolicy, used in a function's Policies property."
   ],
   [
    "Globals",
    "A SAM template section that sets shared properties, such as runtime and timeout, for all functions or APIs."
   ],
   [
    "samconfig.toml",
    "The SAM CLI configuration file that stores deployment settings, optionally per environment."
   ]
  ],
  "example": "A developer changes a handler, runs sam build, then sam local start-api and calls the endpoint with curl to confirm the new response. Satisfied, they run sam deploy, which reads the stack name and Region saved in samconfig.toml from the first guided deployment.",
  "mistakes": [
   [
    "sam local start-api deploys a test API Gateway stage in your account.",
    "It runs entirely on your machine, emulating API Gateway routes with functions in Docker containers. Nothing is created in AWS."
   ],
   [
    "SAM is a separate deployment service that replaces CloudFormation.",
    "SAM templates are transformed into CloudFormation, and sam deploy creates or updates a CloudFormation stack through a change set. Ordinary CloudFormation resources can sit in the same template."
   ],
   [
    "You must pass the stack name and Region on every sam deploy.",
    "After sam deploy --guided, those answers are saved in samconfig.toml, so plain sam deploy reuses them. Use --config-env to select another environment's saved settings."
   ],
   [
    "Passing local SAM tests proves the function's permissions are correct.",
    "Local emulation does not enforce real IAM authorization or service integrations. Permissions must be verified against a deployed stack."
   ]
  ],
  "tryit": [
   [
    "At Juniper Health, Marcus wants a teammate to reproduce a bug that only occurs when an SQS message has an empty body. He does not want to deploy anything. What should he give the teammate, and which command do they run?",
    "Generate a sample SQS event with sam local generate-event sqs receive-message, edit the body to be empty, save it to a file, and have the teammate run sam local invoke with -e pointing to that file. Docker must be installed because the function runs in a local Lambda-like container."
   ],
   [
    "A team's function needs read access to one DynamoDB table. A developer proposes attaching the AmazonDynamoDBFullAccess managed policy in the SAM template. What is a better SAM-native option?",
    "Use the SAM policy template DynamoDBReadPolicy with the TableName parameter in the function's Policies property. It expands into least-privilege read statements scoped to that single table."
   ]
  ],
  "tip": "The Transform line is what identifies a SAM template. For testing an API locally, the command is sam local start-api; for a single event, sam local invoke. sam deploy --guided writes samconfig.toml.",
  "check": [
   [
    "Which line must a SAM template include?",
    "Transform: AWS::Serverless-2016-10-31."
   ],
   [
    "Where are the answers from sam deploy --guided stored?",
    "In samconfig.toml in the project directory."
   ],
   [
    "What does sam local invoke require on your machine?",
    "Docker, because it runs the function in a container that emulates Lambda."
   ],
   [
    "Which command emulates API Gateway on your machine so you can call routes with curl?",
    "sam local start-api."
   ]
  ]
 },
 {
  "t": "CloudFormation: templates, parameters, outputs and exports, Fn::ImportValue, change sets, packaging local artifacts to S3",
  "hook": "Late on a Friday at Cedar Ridge Insurance, Dana pushes a small template change: she renames the partition key on the claims table to fix a typo. The pipeline shows a green check on the build, and the deploy stage starts. Ten minutes later a teammate messages: the claims table is empty. CloudFormation did exactly what the template asked, which was to replace the table with a new one. Meanwhile, another team cannot delete an old network stack because something called an export is still in use. Dana wonders how she could have seen the replacement coming, and how stacks are supposed to share values safely. What tools would have warned her before it was too late?",
  "simple": "CloudFormation lets you describe your AWS setup in a text file, called a template, and AWS builds everything in that file for you as one group, called a stack. You can leave blanks in the template, called parameters, to fill in when you deploy. After building, a stack can hand back useful results, called outputs, and can even share them with other stacks. Before changing a running stack, you can ask for a preview, called a change set, that lists exactly what will be added, changed or replaced. If your template points to code on your own computer, a packaging command uploads that code to S3 first. It is like a building blueprint, with a foreman who shows you a list of planned demolitions before starting work.",
  "body": [
   "AWS CloudFormation is AWS's infrastructure as code (IaC) service. You describe resources in a template written in YAML or JSON, and CloudFormation creates, updates and deletes them together as a stack. It works out the order from dependencies, creates resources in parallel where it can, and rolls back if something fails, so you never end up half-built. AWS SAM and the AWS Cloud Development Kit (CDK) both produce CloudFormation templates in the end, which is why CloudFormation concepts appear throughout the Developer Associate exam.",
   "A template has a predictable set of sections. `AWSTemplateFormatVersion` and `Description` are informational. `Parameters` are inputs supplied at deploy time, with types such as `String`, `Number`, `AWS::EC2::KeyPair::KeyName` and Systems Manager (SSM) parameter types that read a value from Parameter Store, plus constraints like `AllowedValues`, `MinLength` and `AllowedPattern`, and `NoEcho` to mask sensitive values in the console and API output. `Mappings` are static lookup tables, for example an Amazon Machine Image (AMI) ID per Region, read with `Fn::FindInMap`. `Conditions` let you create resources or set properties only in some cases, such as production. `Transform` declares SAM or macros. `Resources` is the only required section. `Outputs` returns values after deployment.",
   "Intrinsic functions connect these sections. `Ref` returns a parameter's value or a resource's primary identifier, such as a bucket name or a queue URL depending on the resource type. `Fn::GetAtt` returns a specific attribute, such as a function's ARN or a table's stream ARN. `Fn::Sub` substitutes variables into strings, for example building an ARN with `${AWS::Region}`. `Fn::Join`, `Fn::Select`, `Fn::Split` and `Fn::If` help build values. Pseudo parameters such as `AWS::Region`, `AWS::AccountId` and `AWS::StackName` let one template work in any account and Region without hardcoding.",
   "Outputs make results visible, such as an API endpoint URL or a bucket name. When an output also has an `Export` name, the value becomes available to other stacks in the same account and Region, which read it with `Fn::ImportValue`. This is the standard way for a shared network stack to publish VPC and subnet IDs for application stacks to consume. Export names must be unique within the account and Region. Once another stack imports an export, CloudFormation refuses to delete the exporting stack or change the exported value until every importing stack stops using it, which protects consumers from having infrastructure pulled out from under them. Nested stacks, declared as `AWS::CloudFormation::Stack` resources, are the alternative when you want a reusable component deployed and managed as part of a parent stack rather than shared between independent stacks.",
   "```yaml\n# network stack\nOutputs:\n  VpcId:\n    Value: !Ref Vpc\n    Export:\n      Name: !Sub '${AWS::StackName}-VpcId'\n# app stack\n  VpcId: !ImportValue network-VpcId\n```",
   "Updates are where care matters most. Depending on the property being changed, CloudFormation updates a resource with no interruption, with some interruption, or by replacement, which means creating a new physical resource and deleting the old one. Changing a DynamoDB table's key schema or a resource's name property typically requires replacement, and replacing a table means a new, empty table. A change set lets you preview an update before applying it: CloudFormation compares the new template and parameters with the current stack and lists each resource as Add, Modify or Remove, with a Replacement column of True, False or Conditional. You review the change set and then execute it, or delete it if it is not what you expected. Change sets are the exam answer whenever a question says 'preview' or 'see what will change before updating'.",
   "Several features protect data and keep stacks honest. `DeletionPolicy: Retain` keeps a resource when it is removed from the template or the stack is deleted, and `DeletionPolicy: Snapshot` takes a final snapshot for resources that support it, such as Amazon RDS databases and EBS volumes. `UpdateReplacePolicy` does the same for the old resource during a replacement. Stack policies can deny updates to critical resources, and termination protection prevents accidental stack deletion. Drift detection reports resources whose actual configuration differs from the template because someone changed them outside CloudFormation. When stack creation fails, the default behavior is to roll back and delete what was created; to troubleshoot, open the stack's Events tab and look for the first event with a FAILED status, since later failures are usually consequences of that first one.",
   "Templates often reference local files, such as `CodeUri: ./src` for a Lambda function or a nested template on disk. CloudFormation itself cannot read your laptop, so those artifacts must be uploaded first. `aws cloudformation package --template-file template.yaml --s3-bucket my-artifacts --output-template-file packaged.yaml` zips and uploads the local artifacts to Amazon S3 and writes a new template with S3 URIs in place of the local paths. Then `aws cloudformation deploy --template-file packaged.yaml --stack-name my-app --capabilities CAPABILITY_IAM` creates a change set and executes it in one step. `sam package` and `sam deploy` do the same work for SAM projects.",
   "Capabilities are an explicit acknowledgment that a template does something sensitive. If the template creates or modifies IAM resources, you must pass `CAPABILITY_IAM`, or `CAPABILITY_NAMED_IAM` when those resources have custom names; otherwise the deployment fails with an InsufficientCapabilities error. `CAPABILITY_AUTO_EXPAND` is required when the template uses macros or transforms that expand it, and pipelines deploying such templates must include these capabilities in their deploy action configuration. For exam scenarios, remember the pattern: share between independent stacks with Export and `Fn::ImportValue`, preview risky updates with a change set, protect data with `DeletionPolicy`, and run `package` before deploying templates with local code paths."
  ],
  "analogy": "A CloudFormation stack is like a general contractor building from a blueprint. Parameters are the options the client picks, such as paint color. Outputs are the keys and addresses handed over at the end, and an export is posting the address on a public noticeboard so other contractors can connect to it; you cannot demolish a building others are wired into. A change set is the contractor's written list of planned work, including anything to be torn down and rebuilt, which you sign before work starts.",
  "terms": [
   [
    "Stack",
    "A set of AWS resources created and managed together from one CloudFormation template."
   ],
   [
    "Export",
    "An output value made available to other stacks in the same Region, read with Fn::ImportValue."
   ],
   [
    "Change set",
    "A preview of the changes CloudFormation will make to a stack, which you review and then execute."
   ],
   [
    "aws cloudformation package",
    "Uploads local artifacts referenced by a template to S3 and outputs a template with S3 locations."
   ],
   [
    "CAPABILITY_IAM",
    "An acknowledgment required when deploying a template that creates or modifies IAM resources."
   ],
   [
    "Fn::GetAtt",
    "An intrinsic function that returns an attribute of a resource, such as its ARN."
   ],
   [
    "DeletionPolicy",
    "A resource attribute (Retain, Snapshot or Delete) that controls what happens to the resource when it is removed or its stack is deleted."
   ],
   [
    "Drift detection",
    "A CloudFormation feature that reports resources changed outside of CloudFormation."
   ]
  ],
  "example": "A platform team's network stack exports its private subnet IDs. The orders service template uses Fn::ImportValue to place its Lambda functions in those subnets. Later the platform team tries to delete the network stack and CloudFormation refuses, because the orders stack still imports the export.",
  "mistakes": [
   [
    "Use Fn::ImportValue to read an output from a stack in another Region.",
    "Exports are scoped to one account and Region. Cross-Region sharing needs another mechanism, such as writing the value to Parameter Store in the consuming Region or using a custom resource."
   ],
   [
    "Ref always returns a resource's ARN.",
    "Ref returns the primary identifier, which differs by type (a bucket name, a queue URL, a function name). Use Fn::GetAtt with Arn when you need the ARN."
   ],
   [
    "A successful template validation means an update is safe for data.",
    "Validation checks syntax only. Only a change set shows whether a resource will be replaced, which for a table or database can mean losing data."
   ],
   [
    "The last FAILED event in the stack's history shows the root cause.",
    "Look for the first failure; later events are usually rollback steps or knock-on failures caused by it."
   ]
  ],
  "tryit": [
   [
    "At Cedar Ridge, Dana needs to change a DynamoDB table's sort key in production next week. The team cannot afford surprises. What should she do before executing the update, and what should she look for?",
    "Create a change set for the update and review it. The table will show Replacement: True, signaling a new empty table. She should plan a data migration (for example a new table and copy) and make sure DeletionPolicy or UpdateReplacePolicy is set to Retain or that a backup exists before executing."
   ],
   [
    "A developer runs aws cloudformation deploy on a template whose Lambda function uses CodeUri: ./src and gets an error that the code location is invalid. What step is missing?",
    "The local artifact was never uploaded. Run aws cloudformation package with an S3 bucket to upload the code and produce a packaged template with S3 URIs, then deploy that packaged template."
   ]
  ],
  "tip": "Share values between independent stacks with Outputs Export plus Fn::ImportValue. Preview risky updates with a change set. Deploy templates with local code paths by running cloudformation package first. Replacement: True in a change set is your warning that a stateful resource will be recreated.",
  "check": [
   [
    "Which section of a template is required?",
    "Resources."
   ],
   [
    "Why can't a stack be deleted when its export is imported elsewhere?",
    "CloudFormation blocks deleting or changing an export that another stack depends on until the importing stack stops using it."
   ],
   [
    "What error do you get when deploying a template that creates IAM roles without acknowledging it, and how do you fix it?",
    "An InsufficientCapabilities error; add --capabilities CAPABILITY_IAM or CAPABILITY_NAMED_IAM."
   ],
   [
    "What does a change set's Replacement column tell you?",
    "Whether CloudFormation will create a new physical resource and delete the old one, which for stateful resources can mean data loss."
   ]
  ]
 },
 {
  "t": "AWS CDK basics: constructs, cdk bootstrap, cdk synth, cdk deploy",
  "hook": "At Bright Harbor Media, Leo maintains a 1,400-line YAML template for the photo-processing service. Every new environment means copying blocks, renaming them by hand and hoping nothing was missed. His lead suggests the team move to the AWS CDK so they can write infrastructure in Python, the same language as the application. Leo writes his first stack in an afternoon, types cdk deploy in a fresh account, and gets an error about a missing bootstrap stack and an assets bucket that does not exist. He did not create any bucket, so where is it supposed to come from, and what is the CDK actually deploying behind the scenes?",
  "simple": "The AWS CDK lets you describe your cloud setup by writing normal code, in languages like Python or TypeScript, instead of long configuration files. You build your setup from ready-made pieces called constructs, such as 'a storage bucket' or 'a function', and many pieces come with safe defaults. When you run the CDK, it turns your code into a CloudFormation template, the same kind of file AWS uses to build stacks, and then deploys it. Before the first deployment in an account and Region, you run a one-time setup command that creates a storage bucket and roles the CDK needs. It is like using a LEGO kit with instructions: you snap together labeled bricks, and the kit produces the full building plan for you.",
  "body": [
   "The AWS Cloud Development Kit (CDK) is an open-source framework for defining cloud infrastructure in general-purpose programming languages, including TypeScript, JavaScript, Python, Java, C# and Go. You write code that describes resources, and the CDK synthesizes that code into AWS CloudFormation templates, which CloudFormation then deploys. The appeal is that you gain the tools of programming, such as loops, conditions, functions, classes, package management, IDE autocompletion and unit tests, while keeping CloudFormation's safe, transactional stack management with rollback on failure.",
   "Everything in the CDK is a construct: a building block that represents one or more AWS resources along with their configuration. Constructs form a tree. At the root is an `App`. The app contains one or more `Stack` constructs, and each stack becomes one CloudFormation stack when deployed. Stacks contain resource constructs, which may contain other constructs. Each construct receives a scope (its parent) and an ID that is unique among its siblings, and the CDK uses the path through the tree to generate stable logical IDs in the template, which is why renaming a construct's ID can cause CloudFormation to replace the resource.",
   "Constructs come in three levels, and the exam expects you to tell them apart. L1 constructs map one-to-one to CloudFormation resource types and are named with a `Cfn` prefix, such as `CfnBucket` or `CfnFunction`. They are generated from the CloudFormation specification, have no defaults beyond CloudFormation's own, and you set every property yourself. L2 constructs, such as `s3.Bucket`, `lambda.Function` or `dynamodb.Table`, are curated, higher-level classes with sensible defaults, convenient types and helper methods. L3 constructs, also called patterns, combine several resources into a common architecture, for example a REST API backed by a Lambda function or a load-balanced AWS Fargate service, so one line of code can create a dozen resources.",
   "```python\nfrom aws_cdk import App, Stack, aws_s3 as s3, aws_lambda as _lambda\n\nclass ImageStack(Stack):\n    def __init__(self, scope, id, **kw):\n        super().__init__(scope, id, **kw)\n        bucket = s3.Bucket(self, 'Uploads', versioned=True)\n        fn = _lambda.Function(self, 'Resize',\n            runtime=_lambda.Runtime.PYTHON_3_12,\n            handler='app.handler',\n            code=_lambda.Code.from_asset('src'))\n        bucket.grant_read(fn)  # adds a least-privilege IAM policy\n\napp = App()\nImageStack(app, 'ImageStack')\napp.synth()\n```",
   "The `grant_read` call shows a key strength of L2 constructs. Instead of writing a JSON policy and attaching it to a role, you state intent, 'this function may read this bucket', and the CDK generates an IAM policy scoped to that bucket's ARN and attaches it to the function's execution role. Similar helpers exist across services, such as `grant_read_write_data` on a DynamoDB table or `grant_send_messages` on a queue, and they encourage least privilege by default. `Code.from_asset('src')` is an asset: a local folder that the CDK will zip and upload during deployment, much like `CodeUri` in SAM.",
   "The CDK command line interface (CLI) workflow has a few commands worth memorizing. `cdk init app --language python` creates a new project skeleton. `cdk bootstrap` prepares an AWS environment, meaning an account and Region pair, for CDK deployments. It must run once per account and Region before the first deployment there. Bootstrapping deploys a CloudFormation stack named `CDKToolkit` by default that contains an Amazon S3 bucket for file assets such as Lambda code, an Amazon Elastic Container Registry (ECR) repository for Docker image assets, and IAM roles that the CDK assumes to publish assets and deploy stacks. If a deployment fails with a message that the environment is not bootstrapped, that a bootstrap stack version is too old, or that the staging bucket does not exist, the fix is `cdk bootstrap aws://ACCOUNT-ID/REGION`, run again if the bootstrap template needs upgrading.",
   "`cdk synth` runs your app and emits the CloudFormation template for each stack into the `cdk.out` directory, printing it to the terminal as well. This is useful for reviewing exactly what will be deployed, for policy checks in a pipeline and for debugging. `cdk diff` compares your current code with the deployed stack and shows what would change, similar in spirit to a change set. `cdk deploy` synthesizes, uploads assets to the bootstrap bucket and repository, and deploys the stacks through CloudFormation. By default it pauses and asks for confirmation when the change broadens security, such as new IAM permissions or security group rules. `cdk destroy` deletes a stack, and `cdk ls` lists the stacks in the app.",
   "Because the output is ordinary CloudFormation, all of CloudFormation's behavior still applies. Failed deployments roll back. Resources changed outside the stack drift. Outputs are declared with `CfnOutput`. Retention is controlled with `removal_policy` in the CDK: many stateful L2 resources, such as S3 buckets and DynamoDB tables, are retained by default when removed from the stack, so you must set a destroy removal policy explicitly if you want them deleted, and a bucket must also be emptied before it can be deleted. Errors seen during `cdk deploy` are CloudFormation stack events, so the troubleshooting approach is the same: find the first failed resource.",
   "Finally, the CDK makes infrastructure testable. The assertions module lets you write unit tests against the synthesized template, for example checking that every bucket has encryption and versioning enabled, or that exactly one Lambda function exists with a given runtime. These tests run in seconds in CI, before anything is deployed. For the exam, anchor on four facts: CDK apps synthesize to CloudFormation, constructs come in L1, L2 and L3 levels, `cdk bootstrap` runs once per account and Region to create the CDKToolkit stack, and `cdk synth` shows the generated template."
  ],
  "analogy": "Writing CDK code is like using a recipe app that turns 'make lasagna for six' into a full shopping list and step-by-step instructions. L1 constructs are raw ingredients you measure yourself, L2 are prepared items like ready-made pasta sheets, and L3 is a meal kit. cdk synth prints the full recipe, and cdk deploy cooks it. Bootstrapping is stocking the kitchen with a pantry and utensils once per kitchen. The analogy stops at the oven: the CDK never cooks directly, because CloudFormation does every deployment.",
  "mnemonic": "Init, Bootstrap, Synth, Deploy: 'I Build Something Deployable.' Create the project, prepare each account and Region once, generate the CloudFormation template, then deploy it.",
  "terms": [
   [
    "Construct",
    "The basic CDK building block representing one or more AWS resources, arranged in a tree under an App."
   ],
   [
    "L2 construct",
    "A higher-level CDK class with sensible defaults and helper methods, such as s3.Bucket."
   ],
   [
    "cdk bootstrap",
    "Creates the CDKToolkit stack with an asset bucket, ECR repository and deployment roles in an account and Region."
   ],
   [
    "cdk synth",
    "Runs the CDK app and produces CloudFormation templates in the cdk.out directory."
   ],
   [
    "L1 construct",
    "A low-level CDK construct with a Cfn prefix that maps directly to a single CloudFormation resource type."
   ],
   [
    "L3 construct (pattern)",
    "A CDK construct that combines several resources into a common architecture."
   ],
   [
    "cdk diff",
    "Compares the CDK app's synthesized output with the deployed stack and shows the differences."
   ],
   [
    "Asset",
    "A local file, folder or Docker image that the CDK packages and uploads to the bootstrap resources during deployment."
   ]
  ],
  "example": "A developer runs cdk deploy in a new Region and gets an error that the stack requires bootstrapping because an assets bucket is missing. They run cdk bootstrap for that account and Region once, and the next cdk deploy uploads the Lambda code asset and creates the stack.",
  "mistakes": [
   [
    "The CDK calls AWS service APIs directly to create resources, bypassing CloudFormation.",
    "The CDK synthesizes CloudFormation templates and deploys them as CloudFormation stacks, so rollbacks, events and drift all work as in CloudFormation."
   ],
   [
    "cdk bootstrap must be run before every deployment.",
    "It runs once per account and Region combination, and again only when the bootstrap template needs upgrading."
   ],
   [
    "cdk synth deploys a test copy of the stack.",
    "cdk synth only produces the CloudFormation template in cdk.out. Nothing is deployed until cdk deploy."
   ],
   [
    "Removing an S3 bucket construct from a CDK app always deletes the bucket and its data.",
    "Many stateful L2 resources default to a retain removal policy, so the bucket is orphaned rather than deleted unless you set a destroy policy, and it must be empty to delete."
   ]
  ],
  "tryit": [
   [
    "A security reviewer at Bright Harbor wants to inspect the exact IAM policies the photo service will create before anything reaches AWS. Leo's infrastructure is a CDK app in Python. What should Leo give the reviewer?",
    "Run cdk synth and hand over the generated CloudFormation templates from cdk.out. They contain the IAM policies produced by helper methods such as grant_read, so the reviewer sees exactly what will be deployed. cdk diff can also show policy changes against the currently deployed stack."
   ],
   [
    "A team writes an S3 bucket using CfnBucket and must hand-write every policy, while another team uses s3.Bucket and calls bucket.grant_read(fn). Which construct level is each team using, and which approach better supports least privilege with less effort?",
    "CfnBucket is an L1 construct and s3.Bucket is an L2 construct. The L2 approach is better here because grant_read generates a policy scoped to that bucket and attaches it to the function's role automatically."
   ]
  ],
  "tip": "If a first CDK deployment fails because the staging bucket or bootstrap stack is missing, the answer is cdk bootstrap. To see the CloudFormation template the CDK will produce, use cdk synth.",
  "check": [
   [
    "What do CDK apps ultimately deploy with?",
    "AWS CloudFormation, using templates produced by synthesis."
   ],
   [
    "What is the difference between an L1 and an L2 construct?",
    "L1 constructs (Cfn prefix) map directly to CloudFormation resources with all properties set by you; L2 constructs add defaults and helper methods such as grant functions."
   ],
   [
    "How often must cdk bootstrap be run?",
    "Once per account and Region combination (and again if the bootstrap template needs upgrading)."
   ]
  ]
 },
 {
  "t": "Lambda versions and aliases; weighted aliases; CodeDeploy canary, linear and all-at-once traffic shifting with alarm rollback",
  "hook": "It is 9:40 on a Tuesday at Fernwood Pay, and Aisha has just shipped a new version of the payment-authorization function. By 9:43 the support queue lights up: a small share of card payments are failing with a parsing error. Last quarter, a similar release meant editing the API Gateway integration under pressure, redeploying it and hoping the old code was still around. This time the release went out as a gradual traffic shift with an alarm on the function's errors. Aisha watches the console as the alarm turns red. Before she can even open the integration settings, the traffic has already moved back. What made that automatic rollback possible?",
  "simple": "When you update a Lambda function, you can save a frozen copy of that exact code, called a version. Versions never change, so you always know what is running. An alias is a nickname, like 'prod', that points at one version. Your apps call the nickname, and to release new code you just move the nickname to a new version; to undo, you move it back. An alias can also split calls between two versions, for example 90 percent old and 10 percent new. AWS CodeDeploy can do that splitting for you step by step, watching alarms, and moving everything back on its own if something goes wrong. It is like a restaurant trying a new recipe on a few tables before changing the whole menu.",
  "body": [
   "Deploying new Lambda code safely depends on three abilities: pointing callers at a known, unchanging piece of code, shifting traffic gradually so a bad release affects only a few requests, and rolling back quickly without touching every caller. Lambda versions and aliases provide the building blocks, and AWS CodeDeploy automates the traffic shifting and rollback. The Developer Associate exam tests each piece and how they fit together, often through SAM templates.",
   "Start with `$LATEST`. When you edit a function's code or configuration, you are changing `$LATEST`, the mutable working copy. Publishing a version, for example with `aws lambda publish-version` or by enabling publish on an update, takes an immutable snapshot of the code and most configuration settings, such as runtime, memory, timeout and environment variables, and numbers it sequentially: 1, 2, 3 and so on. After publishing, that version's code and settings cannot change, which makes a version a reliable deployment unit you can test and refer to with confidence. Each version has its own Amazon Resource Name (ARN). A qualified ARN ends with a suffix such as `:3` for version 3. An unqualified ARN, with no suffix, refers to `$LATEST`.",
   "An alias is a named pointer to a specific version, such as `prod`, `staging` or `live`, with its own ARN ending in a suffix like `:prod`. The best practice is for callers and triggers, including API Gateway integrations, event source mappings for Amazon SQS or Kinesis, and Amazon S3 notifications, to reference the alias rather than a version number or `$LATEST`. To release, you update the alias so it points to the new version. To roll back, you point it back to the previous version. The caller's configuration never changes, so a rollback takes seconds and needs no redeployment of the API or event source. Aliases also carry their own settings: you can configure provisioned concurrency on an alias, and resource-based policy permissions can be granted per alias, which is why an API Gateway stage invoking an alias needs permission on that alias specifically.",
   "A weighted alias splits traffic between two versions. For example, the `prod` alias can send 90 percent of invocations to version 3 and 10 percent to version 4 using a routing configuration such as `--routing-config AdditionalVersionWeights={\"4\"=0.1}`. Each invocation is routed independently according to the weights, so you can watch metrics for the new version, then increase the weight step by step until it receives all traffic, at which point you point the alias fully at version 4. Weighted routing requires both targets to be published versions: an alias cannot use weights with `$LATEST`. CloudWatch metrics can be viewed by version and alias, so you can compare the new version's errors and duration with the old one during the split.",
   "Doing that by hand is tedious and error-prone, so AWS CodeDeploy automates it for Lambda. A CodeDeploy deployment configuration defines the traffic-shifting pattern. Canary shifts a small percentage first, waits, then shifts the remainder in one step; for example `CodeDeployDefault.LambdaCanary10Percent5Minutes` sends 10 percent of traffic to the new version for five minutes, then 100 percent. Linear shifts equal increments at fixed intervals; for example `CodeDeployDefault.LambdaLinear10PercentEvery1Minute` adds 10 percent every minute until all traffic has moved. All-at-once, `CodeDeployDefault.LambdaAllAtOnce`, shifts everything immediately. You can also create custom configurations with your own percentages and intervals.",
   "Rollback is what makes these patterns safe. During a deployment, CodeDeploy monitors the Amazon CloudWatch alarms you attach to the deployment group, typically alarms on the function's `Errors` metric, on throttles, or on latency for the new version or alias. If any alarm enters the ALARM state during the shift, CodeDeploy stops the deployment and automatically moves the alias back to the original version. Lifecycle hook functions add validation. A `BeforeAllowTraffic` hook runs before any traffic shifts, for example to run smoke tests against the new version directly. An `AfterAllowTraffic` hook runs after all traffic has shifted, for example to run end-to-end checks. Each hook is a Lambda function that reports success or failure back to CodeDeploy, and a failing hook also triggers rollback.",
   "In AWS SAM this whole setup takes a few lines on the function resource. `AutoPublishAlias: live` tells SAM to publish a new version whenever the function's code or configuration changes and to point the `live` alias at it. `DeploymentPreference` with `Type: Canary10Percent5Minutes`, or another type such as `Linear10PercentEvery1Minute` or `AllAtOnce`, plus a list of `Alarms` and optional `Hooks` with `PreTraffic` and `PostTraffic` functions, makes SAM create the CodeDeploy application, deployment group and service role for you. Each `sam deploy` then becomes a controlled, monitored traffic shift instead of an instant cutover.",
   "For the exam, keep the distinctions crisp. Versions are immutable, `$LATEST` is mutable, and aliases are movable pointers. Canary is two steps, a small percentage and then everything, while linear is many equal steps. Automatic rollback comes from CloudWatch alarms or failing hooks, not from CodeDeploy guessing that something is wrong. And production triggers should reference aliases, never `$LATEST`, so that releases and rollbacks are a pointer move."
  ],
  "analogy": "Versions are like printed editions of a book: once edition 3 is printed, its pages never change. $LATEST is the author's working draft. An alias is the 'current edition' sign on the bookstore shelf; moving the sign changes what readers pick up without reprinting anything. A weighted alias is putting edition 4 on a few shelves while most still hold edition 3. CodeDeploy is the store manager who moves more copies over each hour and pulls them all back the moment complaints, the alarms, start arriving.",
  "terms": [
   [
    "$LATEST",
    "The mutable, unpublished version of a Lambda function that reflects the most recent code and configuration edits."
   ],
   [
    "Version",
    "An immutable, numbered snapshot of a Lambda function's code and configuration."
   ],
   [
    "Alias",
    "A named pointer to a function version, optionally weighted between two versions, with its own ARN."
   ],
   [
    "Canary deployment",
    "A traffic shift that sends a small percentage to the new version first, then the rest after a wait."
   ],
   [
    "Linear deployment",
    "A traffic shift that moves equal percentages to the new version at regular intervals."
   ],
   [
    "Qualified ARN",
    "A function ARN with a version or alias suffix, such as :3 or :prod; an unqualified ARN refers to $LATEST."
   ],
   [
    "Weighted alias",
    "An alias with a routing configuration that splits invocations between two published versions by percentage."
   ],
   [
    "BeforeAllowTraffic / AfterAllowTraffic",
    "CodeDeploy hooks for Lambda that run validation functions before and after traffic shifts; a failure triggers rollback."
   ]
  ],
  "example": "A team uses SAM with AutoPublishAlias: live and DeploymentPreference Type Linear10PercentEvery1Minute plus an alarm on the function's Errors metric. Four minutes into a release, errors spike, the alarm fires, and CodeDeploy moves the live alias back to the previous version without anyone changing API Gateway.",
  "mistakes": [
   [
    "Canary and linear are the same thing with different names.",
    "Canary shifts a small percentage, waits, then shifts the rest in one step. Linear shifts equal increments repeatedly at fixed intervals until 100 percent."
   ],
   [
    "CodeDeploy rolls back automatically whenever the new version is slower or has errors.",
    "It rolls back only when an attached CloudWatch alarm enters ALARM or a lifecycle hook reports failure. Without alarms or hooks, a bad version keeps receiving traffic."
   ],
   [
    "You can create a weighted alias between $LATEST and version 5.",
    "Weighted routing works only between published versions. Publish the new code as a version first."
   ],
   [
    "Pointing API Gateway at a specific version number makes rollbacks easy.",
    "Rolling back would then require changing and redeploying the API integration. Point it at an alias and move the alias instead."
   ]
  ],
  "tryit": [
   [
    "Fernwood Pay's team wants each release to send a small slice of traffic to the new version, wait to confirm it is healthy, and only then send everything, with automatic rollback if errors rise. They use SAM. What should the function definition include?",
    "AutoPublishAlias (for example live) and a DeploymentPreference with a canary type such as Canary10Percent5Minutes and an Alarms list containing a CloudWatch alarm on the function's errors. Optionally add PreTraffic and PostTraffic hooks for validation. Triggers should reference the live alias."
   ],
   [
    "A team wants a release to move traffic gradually and evenly over ten minutes, so that a problem is spotted at low exposure whatever moment it starts. Which CodeDeploy configuration fits better, LambdaCanary10Percent10Minutes or LambdaLinear10PercentEvery1Minute?",
    "LambdaLinear10PercentEvery1Minute, because it increases traffic in equal steps every minute over ten minutes. The canary option holds at 10 percent for ten minutes and then jumps straight to 100 percent."
   ]
  ],
  "tip": "Canary is two steps (small percent, then all); linear is many equal steps. Automatic rollback in CodeDeploy is driven by CloudWatch alarms or failing hooks. Point triggers at aliases, never at $LATEST, in production.",
  "check": [
   [
    "Why should API Gateway call an alias rather than a version number?",
    "So releases and rollbacks only require moving the alias, without changing API Gateway's integration."
   ],
   [
    "What does LambdaCanary10Percent5Minutes do?",
    "Shifts 10% of traffic to the new version, waits five minutes, then shifts the remaining 90%."
   ],
   [
    "What triggers an automatic rollback in a CodeDeploy Lambda deployment?",
    "A configured CloudWatch alarm entering ALARM state, or a failing BeforeAllowTraffic or AfterAllowTraffic hook."
   ],
   [
    "Can a published Lambda version's code be changed?",
    "No. Versions are immutable; changes go to $LATEST and are captured by publishing a new version."
   ]
  ]
 },
 {
  "t": "API Gateway stages, stage variables, deployments, mock integrations, canary releases",
  "hook": "At Riverbend Outfitters, Tomas fixes a bug in the inventory API's request validation, saves the method in the API Gateway console and messages the mobile team: try it now. Twenty minutes later they reply that nothing has changed. He checks again: the method looks right in the console. Meanwhile, the front-end team is blocked because the new returns endpoint has no backend yet, and the release manager wants the next version tested on a slice of real traffic before everyone gets it. Three problems, and all of them come down to how API Gateway separates what you edit from what callers actually reach. What is Tomas missing?",
  "simple": "In API Gateway, editing your API is like editing a draft. Callers do not see your changes until you publish a snapshot, called a deployment, to a stage. A stage is a named address such as dev or prod, each with its own settings. Stage variables are small settings stored on each stage, so the same API can call a test backend from dev and a real backend from prod. A mock integration lets API Gateway answer requests by itself with a fixed reply, which is handy before the real backend exists. A canary release sends a small share of a stage's traffic to the new snapshot first. It is like a newspaper: editors change the draft all day, but readers only see what goes to print.",
  "body": [
   "Amazon API Gateway separates the API you are editing from the API your callers reach. In a REST API, editing resources, methods, integrations or mapping templates in the console or through the API changes only the working definition. Changes go live only when you create a deployment, which is a point-in-time snapshot of the API's configuration. A deployment is associated with a stage, a named, callable reference to that snapshot such as `dev`, `test` or `prod`, reachable at an invoke URL of the form `{api-id}.execute-api.{region}.amazonaws.com/prod`. Forgetting to deploy after an edit is a classic reason a change 'does not work', and on the exam the phrase 'changes are not visible to clients' points straight to creating a new deployment to the stage. HTTP APIs, the simpler and lower-cost API type, can enable automatic deployment for a stage so changes go live without a separate step.",
   "Each stage carries its own settings, independent of the others. These include throttling limits for the stage and per method, response caching with a time to live, Amazon CloudWatch execution and access logging, detailed CloudWatch metrics, AWS X-Ray tracing, a client certificate that the backend can use to verify calls came from API Gateway, and association with an AWS WAF web access control list (web ACL). This lets the `prod` stage have caching, detailed logging and a web ACL while `dev` stays cheap and simple, all from the same API definition. Usage plans and API keys can also be tied to specific stages.",
   "Stage variables are name-value pairs defined on a stage that behave much like environment variables for the API. You reference them in integration settings and mapping templates with the syntax `${stageVariables.name}`. The most common exam use is pointing each stage at a different Lambda alias. You set the integration's Lambda function to `my-function:${stageVariables.lambdaAlias}`, then set `lambdaAlias` to `dev` on the dev stage and `prod` on the prod stage. One API definition now serves every environment, and promoting a version is a matter of moving aliases rather than editing the API. There is one catch the exam likes: because the function ARN is resolved at runtime, API Gateway cannot add invoke permissions automatically for every alias. Each alias needs a resource-based policy statement allowing API Gateway to invoke it, typically added with `aws lambda add-permission` using the qualified ARN for each alias. A missing permission shows up as a 500 error with an internal server error message when the stage is called. Stage variables can also hold an HTTP backend URL, so dev calls a test server and prod calls the real one, or values passed to a Lambda authorizer or into mapping templates.",
   "Integrations connect a method to a backend, and there are four families. Lambda integrations come as proxy, which passes the whole request to the function and expects a specifically shaped response, or custom (non-proxy), where you control the mapping. HTTP integrations also come in proxy and custom forms. AWS service integrations call an AWS API directly, for example sending a message to Amazon SQS with `SendMessage` or putting an item into DynamoDB without any Lambda code. Mock integrations return a response generated by API Gateway itself.",
   "A mock integration never calls a backend. You configure an integration response with a mapping template that produces the body, and API Gateway returns it with the status code you choose. Mock integrations are useful in three situations the exam describes: letting front-end or partner teams develop against an agreed API contract before the backend exists, returning fixed responses for testing, and answering cross-origin resource sharing (CORS) preflight `OPTIONS` requests with the right headers, which is what the console's Enable CORS action sets up. With non-proxy integrations, mapping templates written in Velocity Template Language (VTL) transform request and response bodies, and you define method responses and integration responses to map backend results to HTTP status codes.",
   "A canary release on a REST API stage lets you test a new deployment on a slice of real traffic. You configure the stage's canary settings with a percentage, and API Gateway sends that share of requests to the new deployment while the rest continues to use the stage's current deployment. The canary can override stage variables, which is how you point canary traffic at a new Lambda alias such as `prod-next` while normal traffic still uses `prod`. Canary requests produce separate CloudWatch logs and metrics, so you can compare error rates and latency side by side. When you are satisfied, you promote the canary, which makes the canary deployment the stage's main deployment and can apply its stage variable overrides. If not, you delete the canary settings, and all traffic returns to the existing deployment immediately.",
   "Callers do not have to see stage names at all. A custom domain name with base path mappings lets `api.example.com/v1` map to one API stage and `api.example.com/v2` to another, with a certificate from AWS Certificate Manager. API Gateway also offers three endpoint types: edge-optimized, which routes requests through the Amazon CloudFront network for geographically distributed clients; Regional, for clients in the same Region or when you put your own CloudFront distribution in front; and private, reachable only from inside a virtual private cloud (VPC) through an interface VPC endpoint and controlled by a resource policy.",
   "For exam scenarios, map the symptom to the feature. Edits not visible means deploy to the stage. One API calling different aliases per environment means stage variables plus a Lambda permission for each alias. A backend that does not exist yet, or a CORS preflight, means a mock integration. Testing a new deployment on a percentage of production traffic, with easy promotion or rollback, means a stage canary."
  ],
  "analogy": "API Gateway is like a theater. Rehearsals change the script all week, but the audience only sees what opens on a stage, and opening night is the deployment. Each stage has its own lighting and ticket rules, the stage settings, and a notecard telling the cast which understudy plays tonight, the stage variables. A mock integration is a recorded announcement that plays without any actor. A canary is a preview performance for part of the audience. The analogy stops on permissions: each understudy, the Lambda alias, must separately allow the theater to call them.",
  "terms": [
   [
    "Deployment",
    "A snapshot of a REST API's configuration that must be created for changes to go live on a stage."
   ],
   [
    "Stage",
    "A named reference to a deployment, with its own URL and settings such as caching, throttling and logging."
   ],
   [
    "Stage variable",
    "A name-value pair on a stage, referenced as ${stageVariables.name} in integrations and mapping templates."
   ],
   [
    "Mock integration",
    "An integration where API Gateway returns a response from a mapping template without calling a backend."
   ],
   [
    "Canary release",
    "A stage setting that routes a percentage of traffic to a new deployment before promotion."
   ],
   [
    "Mapping template",
    "A Velocity Template Language (VTL) script that transforms request or response bodies in non-proxy integrations."
   ],
   [
    "Lambda proxy integration",
    "An integration that passes the full HTTP request to a Lambda function and expects a response with statusCode, headers and body."
   ],
   [
    "Base path mapping",
    "A custom domain setting that maps a path such as /v1 to a specific API and stage."
   ]
  ],
  "example": "A team's API integration uses the function ARN orders-fn:${stageVariables.alias}. The dev stage sets alias to dev and the prod stage sets it to prod. After they add a prod canary with 10% of traffic and an alias override of prod-next, they monitor the canary's metrics for an hour and then promote it.",
  "mistakes": [
   [
    "Saving a method in the console updates the live API.",
    "For REST APIs, changes reach callers only after you create a new deployment to the stage. HTTP APIs can enable automatic deployment, but REST APIs need an explicit deployment."
   ],
   [
    "Using a stage variable in the Lambda ARN is all that is needed for each stage to invoke its alias.",
    "Each alias also needs a resource-based permission allowing API Gateway to invoke it. Without it, calls fail with a 500 internal server error."
   ],
   [
    "A mock integration forwards requests to a test backend.",
    "A mock integration calls no backend at all; API Gateway builds the response from a mapping template and the configured status code."
   ],
   [
    "A stage canary requires a separate stage and URL for the new version.",
    "The canary lives inside the existing stage and receives a configured percentage of that stage's traffic, with optional stage variable overrides, until promoted or removed."
   ]
  ],
  "tryit": [
   [
    "At Riverbend, the partner team needs to start building against GET /returns/{id} today, but the returns service will not exist for two weeks. They need a realistic response with a 200 status and a sample JSON body. What should Tomas set up?",
    "A mock integration on that method, with an integration response mapping template that returns the agreed sample JSON and a 200 status. Deploy it to a dev stage so the partner team has a callable URL; later, switch the integration to the real backend without changing the contract."
   ],
   [
    "Tomas adds a prod canary at 10 percent with a stage variable override lambdaAlias=prod-next. All canary requests fail with 500 errors while normal traffic is fine. The prod-next alias exists and works when invoked directly. What is the most likely cause?",
    "API Gateway lacks a resource-based permission to invoke the prod-next alias. Add a Lambda permission for that qualified alias ARN with API Gateway as the principal."
   ]
  ],
  "tip": "Changes not visible to clients means you forgot to deploy to the stage. Different stages calling different Lambda aliases from one API means stage variables, plus a Lambda permission for each alias.",
  "check": [
   [
    "Why might an API change made in the console not be seen by clients?",
    "REST API changes only go live after a new deployment is created to the stage."
   ],
   [
    "How do you make the prod stage invoke the prod alias and the dev stage the dev alias using one integration?",
    "Reference a stage variable in the function ARN, such as my-function:${stageVariables.lambdaAlias}, set per stage, and grant API Gateway permission on each alias."
   ],
   [
    "When is a mock integration useful?",
    "For returning fixed responses without a backend, such as early front-end development, testing, or CORS preflight responses."
   ],
   [
    "What do you do to make a successful canary the stage's main deployment?",
    "Promote the canary; to abandon it, delete the canary settings and traffic returns to the current deployment."
   ]
  ]
 },
 {
  "t": "Elastic Beanstalk deployment policies: all at once, rolling, rolling with additional batch, immutable, traffic splitting, blue/green URL swap",
  "hook": "The Black Friday code freeze at Maplewood Books lifts on Monday, and Rosa has a release ready for the store's Elastic Beanstalk environment. The last deployment used the default settings and took the site down for four minutes while every instance restarted at once. The one before that left half the fleet on a broken version, and it took an hour to sort out. Her director's instructions are short: no downtime, full capacity the whole time, and if anything goes wrong, undo it in minutes, not hours. The environment's configuration page offers a menu of deployment policies. Which one meets all three requirements, and what does it cost?",
  "simple": "Elastic Beanstalk runs your web app on servers for you. When you upload a new version, it has to swap the old code for the new code on those servers, and you choose how. You can update every server at once, which is fast but takes the site down. You can update a few servers at a time, which keeps the site up but with fewer servers working. You can add extra servers first so you never lose capacity. You can build a completely fresh set of servers and switch only when they are healthy, which is the safest. Or you can run a whole second copy of the site and swap the web address over. It is like renovating a restaurant: close for a day, redo one section at a time, or open a new location and move the sign.",
  "body": [
   "AWS Elastic Beanstalk is a platform as a service for web applications and workers. You upload an application version, usually a source bundle such as a .zip file or a WAR file for Java, and Beanstalk provisions and manages the environment around it: an Elastic Load Balancing load balancer, an Auto Scaling group, Amazon EC2 instances running the platform (for example Node.js, Python, Java or Docker), health monitoring and logging. When you deploy a new version, the deployment policy controls how Beanstalk rolls it onto the running instances. The Developer Associate exam expects you to weigh four factors for each policy: deployment speed, downtime, extra cost, and how rollback works.",
   "All at once deploys the new version to every instance in the environment simultaneously. It is the fastest policy and needs no additional instances, so it costs nothing extra. The price is availability: the application is unavailable for a short time while every instance installs the new version and restarts, and if the new version is broken, every instance is broken at once. Rollback means deploying the previous version again, with the same downtime. All at once is suitable for development and test environments where speed matters more than uptime.",
   "Rolling deploys the new version to one batch of instances at a time. You set the batch size as a fixed number of instances or a percentage of the fleet. Beanstalk takes the instances in the current batch out of service at the load balancer, deploys the new version, waits for them to pass health checks, returns them to service and moves on to the next batch. There is no additional cost because no new instances are launched, but the environment runs at reduced capacity during the deployment, which can hurt under heavy load. For a period, some instances run the old version and some run the new one, so both versions serve traffic at the same time. If the deployment fails partway, some instances are left on each version, and you must redeploy to recover.",
   "Rolling with additional batch fixes the capacity problem. Before touching existing instances, Beanstalk launches a new batch of instances running the new version, then proceeds with a rolling deployment across the original instances, and finally terminates the extra batch at the end. Full capacity is maintained throughout, which is the point of choosing it. The cost is a little extra for the duration of the deployment, and as with rolling, both versions serve traffic during the process and a failure leaves mixed versions that require a manual redeploy. This policy fits production environments that must keep full capacity but do not need the stronger isolation of immutable.",
   "Immutable launches a complete set of new instances running the new version in a temporary Auto Scaling group, alongside the existing instances. Once the new instances pass health checks, Beanstalk moves them into the original Auto Scaling group and terminates the old instances and the temporary group. This is the safest of the in-place-environment policies, because the old instances are never modified: if the new instances fail health checks, Beanstalk simply terminates them, and the original fleet keeps serving traffic as if nothing happened. Rollback is therefore fast and clean. The trade-offs are that deployment is slower and capacity cost temporarily doubles. Immutable also avoids problems caused by partially applied configuration on long-lived instances, since every instance after the deployment is freshly launched.",
   "Traffic splitting is a canary-style variant of immutable deployment. Beanstalk launches a full set of new instances, just as in immutable, but then the load balancer sends only a configured percentage of client traffic to them for an evaluation period you set, while Beanstalk monitors their health. If the new instances stay healthy, Beanstalk shifts all traffic to them and terminates the old ones. If health deteriorates, Beanstalk moves traffic back to the original instances and terminates the new ones. Use it when you want to test a release on a share of real production traffic before committing. It relies on an Application Load Balancer for the weighted routing.",
   "Blue/green is not one of the deployment policy settings; it is a technique that uses two environments. You clone the production environment, or create a new one, deploy the new version to it, and test it at its own URL. When you are satisfied, you use the Swap Environment URLs action, which swaps the CNAME records of the two environments so the new, green environment receives production traffic and the old, blue environment becomes idle. Rollback is swapping the URLs back. Because the switch happens through DNS, some clients may continue reaching the old environment until cached DNS records expire. Blue/green is also the approach when a change cannot be made in place, such as moving to a different platform version family.",
   "One more design point often appears with blue/green: anything created inside a Beanstalk environment is tied to that environment's lifecycle. If you create an Amazon RDS database as part of the environment, terminating or replacing the environment can delete the database. For production, create the database outside Beanstalk and pass its connection details to the environment through environment properties or a secret, so both blue and green environments can use the same data.",
   "For the exam, read the requirement words carefully. Fastest, cheapest, downtime acceptable means all at once. No extra cost but reduced capacity is acceptable means rolling. Must keep full capacity means rolling with additional batch. Safest deployment with quickest rollback on failure means immutable. Test the release on a percentage of live traffic first means traffic splitting. Separate environment, full testing before cutover, and a DNS-based switch means blue/green with Swap Environment URLs."
  ],
  "analogy": "Think of updating the tires on a fleet of delivery vans. All at once parks every van at the same time: quick, but no deliveries happen. Rolling takes a few vans off the road at a time, so fewer deliveries. Rolling with additional batch rents a few extra vans first, so deliveries never slow. Immutable buys a whole new fleet with new tires, tests it, then retires the old one. Traffic splitting gives a few routes to the new fleet first. Blue/green builds a second depot and changes the address on the sign.",
  "terms": [
   [
    "Deployment policy",
    "The Elastic Beanstalk setting that controls how a new application version is rolled onto an environment's instances."
   ],
   [
    "Rolling with additional batch",
    "A policy that launches an extra batch of instances first so capacity never drops during a rolling deployment."
   ],
   [
    "Immutable deployment",
    "A policy that deploys to a fresh set of instances and swaps them in only after they are healthy."
   ],
   [
    "Swap environment URLs",
    "A blue/green technique that exchanges the CNAMEs of two Beanstalk environments to move production traffic."
   ],
   [
    "All at once",
    "A Beanstalk policy that deploys to every instance simultaneously; fastest and cheapest, but causes downtime."
   ],
   [
    "Rolling",
    "A Beanstalk policy that updates instances in batches with no extra instances, reducing capacity during deployment."
   ],
   [
    "Traffic splitting",
    "A Beanstalk policy that launches new instances and sends a percentage of traffic to them for an evaluation period before shifting fully."
   ]
  ],
  "example": "An online retailer's production Beanstalk environment must never drop below full capacity and must roll back fast if a release misbehaves. They choose immutable deployments, so the new version runs on new instances that are only moved into service once they pass health checks.",
  "mistakes": [
   [
    "Blue/green is selected from the deployment policy list in the environment's settings.",
    "Blue/green is a technique using two separate environments and the Swap Environment URLs action, not a deployment policy setting."
   ],
   [
    "Rolling deployments keep full capacity because only one batch is updated at a time.",
    "The batch being updated is out of service, so capacity drops. Rolling with additional batch launches extra instances to keep full capacity."
   ],
   [
    "If an immutable deployment fails, the old instances must be redeployed with the previous version.",
    "The old instances were never modified. Beanstalk terminates the failed new instances, and the original fleet continues serving."
   ],
   [
    "Creating the production database inside the Beanstalk environment is the simplest safe option.",
    "An RDS instance created within the environment shares its lifecycle and can be deleted with it, which breaks blue/green. Create production databases separately and connect through configuration."
   ]
  ],
  "tryit": [
   [
    "Maplewood Books also has a staging environment used only by the internal QA team between 9 and 5. Deployments happen several times a day and the team wants them as fast and cheap as possible; a minute of downtime is fine. Which policy should they use?",
    "All at once. It is the fastest and needs no extra instances, and the brief downtime and simultaneous impact are acceptable in a staging environment used only by QA."
   ],
   [
    "Rosa wants to upgrade the production environment to a new platform branch and run a full regression suite against it for a day before any customer sees it, with the ability to switch back instantly. Which approach fits?",
    "Blue/green: create a separate environment with the new platform and version, test it at its own URL, then Swap Environment URLs. Rollback is swapping back, noting that DNS caching can delay the switch for some clients."
   ]
  ],
  "tip": "Look for the requirement words: minimal cost with downtime acceptable means all at once; keep full capacity means rolling with additional batch; quickest safe rollback means immutable; separate environment and DNS switch means blue/green. Percentage of live traffic to new instances before full shift means traffic splitting.",
  "check": [
   [
    "Which policy keeps full capacity while updating in batches?",
    "Rolling with additional batch."
   ],
   [
    "How does rollback work for a failed immutable deployment?",
    "The new instances are terminated; the original instances were never changed, so they keep serving."
   ],
   [
    "How is blue/green performed in Elastic Beanstalk?",
    "Deploy the new version to a separate environment, test it, then swap environment URLs (CNAMEs) with production."
   ],
   [
    "Which policy is fastest but causes downtime?",
    "All at once."
   ]
  ]
 },
 {
  "t": "CodePipeline stages and actions, manual approvals; CodeBuild buildspec phases and artifacts",
  "hook": "On Wednesday morning at Silverline Transit, Kenji is reviewing why last night's release of the trip-planner service broke production. The developer who deployed it ran the build on his laptop, skipped the unit tests to save time and uploaded a package that still contained a hardcoded test database password. Nobody reviewed staging first. The engineering manager wants a pipeline where every commit is built and tested the same way, secrets never appear in build files, the same package moves from staging to production, and a human signs off before customers are affected. Kenji has CodePipeline and CodeBuild available. How should the stages, actions and build file fit together?",
  "simple": "CodePipeline is like a conveyor belt for software. Each time someone changes the code, the belt moves it through a series of stations: fetch the code, build it, test it, wait for a person to approve, and release it. Each station is a stage, and the jobs at a station are actions. Files are passed along the belt in labeled boxes called artifacts. CodeBuild is the worker at the build station. It follows a written checklist called buildspec.yml, which says what to install, what to test, what to build and which finished files to put in the box. Secrets are fetched from a safe at build time instead of being written on the checklist. It is like an assembly line where a supervisor must sign off before products ship.",
  "body": [
   "Continuous integration and continuous delivery (CI/CD) automate the path from a code change to a running release, so every change is built, tested and deployed the same way. On AWS, AWS CodePipeline orchestrates the overall flow, and AWS CodeBuild does the work of compiling, testing and packaging. The Developer Associate exam tests how pipelines are structured, how files move between steps, how manual approvals work, and what goes in a CodeBuild buildspec file.",
   "A CodePipeline pipeline is made of stages that run in order, such as Source, Build, Test, Approval and Deploy. Each stage contains one or more actions. Actions within a stage can run sequentially or in parallel, controlled by a run order number: actions with the same run order run in parallel, and higher numbers run afterward. Action categories are source, build, test, deploy, approval and invoke. Source actions include AWS CodeCommit, Amazon S3, Amazon Elastic Container Registry (ECR) and third-party repositories such as GitHub, GitHub Enterprise or Bitbucket through a connection. Build and test actions typically use CodeBuild. Deploy actions include AWS CodeDeploy, AWS CloudFormation, AWS Elastic Beanstalk, Amazon Elastic Container Service (ECS) and Amazon S3. Invoke actions can call an AWS Lambda function or start an AWS Step Functions state machine for custom logic, such as sending a notification or running a database migration.",
   "Actions pass files to one another as artifacts. Each pipeline has an S3 artifact bucket. An action declares output artifacts with names, for example `SourceOutput` or `BuildOutput`, and a later action names them as input artifacts. The source action's output is a snapshot of the repository; the build action reads it and writes a new artifact containing the packaged application; the deploy action reads that. This is how the exact same build output moves from staging to production, which is an important CI/CD principle: build once, deploy many times. A pipeline starts automatically on source changes through events or webhooks, can also start on a schedule or manually, and each run is called an execution. If any action fails, its stage fails and the execution stops there, so a failed test prevents deployment.",
   "A manual approval action pauses the pipeline at that point until someone with the right IAM permissions approves or rejects it. It is typically placed before deploying to production. The action can publish a notification to an Amazon Simple Notification Service (SNS) topic, so reviewers receive an email or message, and can include a URL for them to review, such as the staging site, plus comments explaining what to check. Approving lets the execution continue; rejecting fails the action and stops the execution. If nobody responds within seven days, the approval action fails. Permission to approve is granted with IAM, for example allowing `codepipeline:PutApprovalResult` on the specific pipeline, so only authorized reviewers can sign off.",
   "AWS CodeBuild is a fully managed build service. Each build runs in a fresh container created from a build image, either an AWS-managed image with common runtimes or your own image from ECR. The container downloads the source, runs your commands, uploads outputs, and is discarded, so builds are isolated and repeatable and you pay only for build time. You describe the build in a file named `buildspec.yml` at the root of the source, or you can specify a different file name or an inline buildspec in the project settings. Here is a typical example for a serverless application.",
   "```yaml\nversion: 0.2\nenv:\n  variables:\n    STAGE: test\n  parameter-store:\n    DB_URL: /myapp/test/db-url\nphases:\n  install:\n    runtime-versions:\n      python: 3.12\n    commands:\n      - pip install -r requirements.txt\n  pre_build:\n    commands:\n      - pytest tests/unit\n  build:\n    commands:\n      - sam build\n  post_build:\n    commands:\n      - sam package --s3-bucket my-artifacts --output-template-file packaged.yaml\nartifacts:\n  files:\n    - packaged.yaml\ncache:\n  paths:\n    - /root/.cache/pip/**/*\n```",
   "The phases run in a fixed order: `install`, `pre_build`, `build` and `post_build`. The install phase installs runtimes and tools; `runtime-versions` selects language versions on managed images. The pre_build phase prepares for the build, for example logging in to ECR, running unit tests or fetching dependencies. The build phase compiles, packages or builds container images. The post_build phase finishes up, for example pushing images, packaging templates or sending notifications. If a command fails in install, pre_build or build, the build fails; if the build phase itself fails, post_build is still attempted, which lets you report results, so check the `CODEBUILD_BUILD_SUCCEEDING` environment variable if your post_build commands should only run on success.",
   "The other sections matter as much as the phases. The `env` section supplies plain environment variables and values read at build time from AWS Systems Manager Parameter Store (`parameter-store`) or AWS Secrets Manager (`secrets-manager`), so secrets never appear in the buildspec or the repository. The `artifacts` section lists the files to upload as the build output, which CodePipeline stores and passes to the next stage; anything not listed is lost when the container is discarded. The `reports` section publishes test results, such as JUnit XML, as CodeBuild test reports. The `cache` section saves dependencies to S3 or keeps a local cache to speed up later builds. Build logs go to Amazon CloudWatch Logs, Amazon S3 or both.",
   "Permissions and networking complete the picture. The CodeBuild service role must allow everything the build does: reading the source, writing logs, pushing to ECR, reading parameters or secrets, and uploading artifacts. A build that fails with an access denied message usually needs a permission on this role. CodeBuild can run inside your virtual private cloud (VPC) to reach private resources such as a database for integration tests, and you can run builds locally with the CodeBuild local agent to debug a buildspec. For the exam, remember the phase order, that next-stage files must be listed under artifacts, that secrets belong in env parameter-store or secrets-manager, and that manual approvals fail after seven days without a response."
  ],
  "analogy": "A pipeline is a car factory line. Each station is a stage, and the workers at a station are actions, some working side by side. The car body moving between stations is the artifact, stored on the line's conveyor, the S3 bucket. CodeBuild is the paint shop following a checklist: prepare materials, prime, paint, inspect, in that order. Paint codes come from a locked cabinet, not written on the checklist. A manual approval is the quality inspector who must sign before cars leave the plant, and an unsigned car is turned away after a week.",
  "mnemonic": "Buildspec phase order: 'I Prepare, Build, Polish' for install, pre_build, build, post_build.",
  "terms": [
   [
    "Stage",
    "A sequential step in a CodePipeline pipeline containing one or more actions."
   ],
   [
    "Action",
    "A task within a stage, such as a source fetch, CodeBuild build, deployment or manual approval."
   ],
   [
    "Artifact",
    "Files produced by one pipeline action and consumed by another, stored in the pipeline's S3 bucket."
   ],
   [
    "buildspec.yml",
    "The YAML file defining CodeBuild's environment, phases, artifacts, reports and cache."
   ],
   [
    "Manual approval",
    "A pipeline action that pauses execution until an authorized person approves or rejects it."
   ],
   [
    "Run order",
    "A number on actions within a stage; equal numbers run in parallel and higher numbers run afterward."
   ],
   [
    "Execution",
    "A single run of a pipeline, usually triggered by a source change."
   ],
   [
    "CodeBuild service role",
    "The IAM role CodeBuild assumes during a build, which must allow every AWS action the build performs."
   ]
  ],
  "example": "A pipeline has Source (GitHub connection), Build (CodeBuild runs unit tests and sam package), DeployStaging (CloudFormation), an Approval action that emails the QA lead through SNS with the staging URL, and DeployProd. The QA lead approves after checking staging, and the same packaged artifact is deployed to production.",
  "mistakes": [
   [
    "Files written during a CodeBuild build are automatically available to the deploy stage.",
    "Only files listed in the buildspec artifacts section are uploaded as output artifacts. Everything else disappears with the container."
   ],
   [
    "It is fine to put database passwords in buildspec env variables because the repository is private.",
    "Plain env values are visible in the file and build configuration. Use the parameter-store or secrets-manager subsections so secrets are fetched securely at build time."
   ],
   [
    "A manual approval waits forever until someone acts.",
    "If not approved or rejected within seven days, the approval action fails and the execution stops."
   ],
   [
    "The buildspec phases can run in any order you list them.",
    "CodeBuild always runs install, pre_build, build and post_build in that order."
   ]
  ],
  "tryit": [
   [
    "At Silverline, Kenji's build pushes a Docker image to ECR, but it fails during pre_build with an access denied error on ecr:GetAuthorizationToken. The buildspec commands are correct. What should he change?",
    "Add the required ECR permissions, including ecr:GetAuthorizationToken and the push actions on the repository, to the CodeBuild service role. The build runs with that role's permissions, so missing IAM permissions there cause access denied errors."
   ],
   [
    "The manager wants unit tests and a security scan to run at the same time after the build, and both must pass before deploying to staging. How should Kenji structure the pipeline?",
    "Add a Test stage after Build with two actions that share the same run order so they run in parallel, both using the build output artifact as input. If either fails, the stage fails and the execution stops before the staging deploy stage."
   ]
  ],
  "tip": "Buildspec phase order is install, pre_build, build, post_build. Files needed by the next pipeline stage must be listed under artifacts. Keep secrets in env parameter-store or secrets-manager, never in the buildspec.",
  "check": [
   [
    "How does a deploy stage get the files produced by the build stage?",
    "The build action declares an output artifact and the deploy action uses it as an input artifact, stored in the pipeline's S3 artifact bucket."
   ],
   [
    "In which buildspec phase would you typically run unit tests or log in to ECR?",
    "pre_build (though tests can also be run in build)."
   ],
   [
    "What happens if a manual approval is not acted on?",
    "It waits, and fails if not approved or rejected within seven days, stopping the execution."
   ],
   [
    "Where do you reference a Secrets Manager secret in a buildspec?",
    "In the env section under secrets-manager, so the value is retrieved at build time instead of being stored in the file."
   ]
  ]
 },
 {
  "t": "CodeDeploy appspec.yml lifecycle hooks for EC2, Lambda and ECS; the CodeDeploy agent",
  "hook": "It is 11 p.m. at Oakridge Learning, and Nadia's CodeDeploy deployment to twelve EC2 web servers has been stuck at 'In progress' for twenty minutes. Eleven instances finished; one shows no lifecycle events at all. A second deployment, to the team's ECS service, passed every test in staging, yet the team lead wants to know where they could run tests against the new tasks before real students reach them. And a third team asks why their Lambda AppSpec rejects the AfterInstall hook they copied from the EC2 example. Three platforms, one service, three different sets of rules. What does CodeDeploy actually do on each, and why is that one server silent?",
  "simple": "CodeDeploy is an AWS service that installs new versions of your application for you. It reads an instruction file called appspec.yml that says what to copy and which of your scripts to run at each step, such as stop the old app, install, start the new app and check it is healthy. Those steps are called lifecycle hooks. On regular servers, a small helper program called the CodeDeploy agent must be running on each machine to do the work. For Lambda and container services, there are no servers to visit, so the steps are shorter and your checks run as small functions. It is like a moving company with a checklist: on some jobs a crew member must be on site, on others the move happens remotely.",
  "body": [
   "AWS CodeDeploy automates deploying application revisions to three compute platforms: Amazon EC2 instances and on-premises servers, AWS Lambda functions, and Amazon Elastic Container Service (ECS) services. For every deployment it reads an application specification file, `appspec.yml`, which may also be JSON for Lambda and ECS. The AppSpec describes what to deploy and which lifecycle event hooks to run. The Developer Associate exam tests the hook order, which hooks exist on which platform, and how to troubleshoot the EC2 agent.",
   "For EC2 and on-premises servers, CodeDeploy depends on the CodeDeploy agent, a program that must be installed and running on each instance. The agent polls the CodeDeploy service for work rather than CodeDeploy pushing to the instance. When it gets a deployment, it downloads the revision bundle from Amazon S3 or GitHub, copies files according to the AppSpec `files` section, applies the `permissions` section, and runs your hook scripts as the configured user. The instance also needs an IAM instance profile that allows it to read the revision from S3, and outbound network access to the CodeDeploy and S3 endpoints. If a deployment never starts on an instance, or an instance shows no lifecycle events, first check that the agent is installed and running, then read the agent's log files and the deployment logs on the instance for permission or connectivity errors.",
   "The EC2 in-place lifecycle runs in this order: `ApplicationStop`, `DownloadBundle`, `BeforeInstall`, `Install`, `AfterInstall`, `ApplicationStart`, `ValidateService`. When the deployment group uses a load balancer, `BeforeBlockTraffic`, `BlockTraffic` and `AfterBlockTraffic` happen first to drain the instance, and `BeforeAllowTraffic`, `AllowTraffic` and `AfterAllowTraffic` happen at the end to return it to service. You can attach scripts to the hook events but not to the events CodeDeploy performs itself, which are `DownloadBundle`, `Install`, `BlockTraffic` and `AllowTraffic`. Typical uses: stop the web server in `ApplicationStop`, back up or clean old files in `BeforeInstall`, install dependencies or set configuration in `AfterInstall`, start services in `ApplicationStart`, and run a health check in `ValidateService`, which is the hook to verify the application is working after it starts.",
   "One behavior of `ApplicationStop` surprises people. It runs the script from the previously deployed revision, not the new one, because at that point the new revision has not been downloaded yet. If the old revision's stop script is broken or was deleted from disk, every new deployment can fail at `ApplicationStop` on that instance. The fixes are to correct the instance or redeploy with the option to ignore `ApplicationStop` failures, and then ship a working stop script so the next deployment succeeds. Each hook entry also has a `timeout` in seconds, and a script that runs too long fails the hook.",
   "```yaml\nversion: 0.0\nos: linux\nfiles:\n  - source: /\n    destination: /var/www/app\nhooks:\n  ApplicationStop:\n    - location: scripts/stop.sh\n      timeout: 60\n  AfterInstall:\n    - location: scripts/install_deps.sh\n  ApplicationStart:\n    - location: scripts/start.sh\n  ValidateService:\n    - location: scripts/health_check.sh\n```",
   "For Lambda, there are no instances, agents or files. The AppSpec names the function, the alias to shift, the current version and the target version. CodeDeploy then shifts the alias's traffic from the current version to the target version according to the deployment configuration: canary, linear or all at once. The only hooks are `BeforeAllowTraffic` and `AfterAllowTraffic`. Each names a Lambda function that runs validation, for example invoking the new version with test input, and reports the result back to CodeDeploy with the `PutLifecycleEventHookExecutionStatus` API call, passing Succeeded or Failed. A failure, or a hook that never reports, stops the deployment and rolls back. EC2 hooks such as `AfterInstall` are not valid in a Lambda AppSpec.",
   "For ECS, CodeDeploy performs blue/green deployments. The current tasks are the blue task set. CodeDeploy starts a replacement green task set using the new task definition and registers it with a second target group behind the load balancer. A test listener, on a separate port, can route traffic to the green tasks while production traffic still flows to blue. CodeDeploy then shifts the production listener to green, either all at once or using canary or linear patterns, and terminates the blue tasks after a configured wait. The AppSpec names the task definition, the container name and the container port. The hooks, each a Lambda function, are `BeforeInstall`, `AfterInstall`, `AfterAllowTestTraffic`, `BeforeAllowTraffic` and `AfterAllowTraffic`. `AfterAllowTestTraffic` is the key one for exam scenarios: it runs after the test listener sends traffic to the green task set, so you can run tests against the new version before any real user reaches it.",
   "A few deployment settings round out the topic. For EC2, deployment configurations control how many instances update at once: `CodeDeployDefault.OneAtATime`, `CodeDeployDefault.HalfAtATime` and `CodeDeployDefault.AllAtOnce`, plus custom configurations that set a minimum number of healthy hosts. EC2 deployments can be in-place, updating existing instances, or blue/green, provisioning new instances and moving load balancer traffic to them. Deployment groups identify targets by EC2 tags or Auto Scaling groups. Automatic rollback can be enabled for when a deployment fails or when a configured Amazon CloudWatch alarm enters ALARM, and it works by redeploying the last known good revision as a new deployment.",
   "For the exam, keep three lists distinct. EC2 in-place: ApplicationStop, DownloadBundle, BeforeInstall, Install, AfterInstall, ApplicationStart, ValidateService. Lambda: BeforeAllowTraffic and AfterAllowTraffic only. ECS: BeforeInstall, AfterInstall, AfterAllowTestTraffic, BeforeAllowTraffic, AfterAllowTraffic. And when an EC2 deployment never starts on an instance, suspect the agent or the instance profile first."
  ],
  "analogy": "CodeDeploy on EC2 is like a restaurant chain sending a new menu to each branch. Every branch needs a manager on site, the agent, who checks headquarters for updates and follows the checklist: close the kitchen, receive supplies, prep, cook, open, taste-test. Closing the kitchen uses the old procedure card, which is why a lost old card breaks the next change. For Lambda and ECS there is no on-site manager; headquarters switches customers over remotely and sends an inspector, the hook function, to taste the food.",
  "mnemonic": "EC2 in-place hook order: 'Silly Dogs Bark In Alleys, Scaring Visitors' for ApplicationStop, DownloadBundle, BeforeInstall, Install, AfterInstall, ApplicationStart, ValidateService.",
  "terms": [
   [
    "appspec.yml",
    "The CodeDeploy application specification file describing files to deploy and lifecycle hook scripts or functions."
   ],
   [
    "CodeDeploy agent",
    "Software on EC2 or on-premises instances that pulls revisions from CodeDeploy and runs lifecycle hooks."
   ],
   [
    "Lifecycle event hook",
    "A point in a deployment where CodeDeploy runs your script or Lambda function, such as AfterInstall."
   ],
   [
    "AfterAllowTestTraffic",
    "An ECS deployment hook that runs after the test listener sends traffic to the new task set, before production traffic shifts."
   ],
   [
    "ValidateService",
    "The last EC2 in-place hook, used to verify the application is healthy after it starts."
   ],
   [
    "PutLifecycleEventHookExecutionStatus",
    "The CodeDeploy API a Lambda or ECS hook function calls to report Succeeded or Failed."
   ],
   [
    "Deployment configuration",
    "Settings that control deployment pace, such as OneAtATime for EC2 or a canary pattern for Lambda and ECS."
   ]
  ],
  "example": "Deployments to a group of EC2 instances fail at ApplicationStop on one host only. The deployment log shows the script from the previous revision is missing. The developer reruns the deployment with the option to ignore ApplicationStop failures, and then fixes the stop script in the new revision so future deployments succeed.",
  "mistakes": [
   [
    "You can attach a script to the Install or DownloadBundle events.",
    "Those events are performed by CodeDeploy itself. Scripts go on hooks such as BeforeInstall, AfterInstall and ApplicationStart."
   ],
   [
    "Lambda deployments support the same hooks as EC2, such as AfterInstall and ValidateService.",
    "Lambda AppSpecs support only BeforeAllowTraffic and AfterAllowTraffic, each pointing to a Lambda validation function."
   ],
   [
    "ApplicationStop runs the stop script included in the new revision.",
    "It runs the script from the previously deployed revision, because the new bundle has not been downloaded yet."
   ],
   [
    "CodeDeploy connects to EC2 instances over SSH to deploy.",
    "The CodeDeploy agent on each instance polls the service and pulls the revision; without a running agent and a suitable instance profile, nothing happens."
   ]
  ],
  "tryit": [
   [
    "At Oakridge, one of twelve EC2 instances shows no lifecycle events while the others completed. The instance is running and passes load balancer health checks. What should Nadia check first?",
    "Whether the CodeDeploy agent is installed and running on that instance, and whether its instance profile allows reading the revision from S3. The agent polls for work, so if it is stopped or cannot authenticate, CodeDeploy never starts lifecycle events there. The agent logs on the instance will show the error."
   ],
   [
    "The ECS team wants automated API tests to run against the new task set through the load balancer's test port before any production traffic shifts. Which hook should they use, and what form does the hook take?",
    "AfterAllowTestTraffic, implemented as a Lambda function that runs the tests through the test listener and reports Succeeded or Failed with PutLifecycleEventHookExecutionStatus. A failure stops the deployment before production traffic moves."
   ]
  ],
  "tip": "Memorize the EC2 order: ApplicationStop, DownloadBundle, BeforeInstall, Install, AfterInstall, ApplicationStart, ValidateService. Lambda has only BeforeAllowTraffic and AfterAllowTraffic. EC2 deployments that never start usually mean the agent is not running. For ECS, tests before real users arrive go in AfterAllowTestTraffic.",
  "check": [
   [
    "Which hook would you use to verify an EC2 application is healthy after it starts?",
    "ValidateService."
   ],
   [
    "Which lifecycle hooks can a Lambda deployment use?",
    "BeforeAllowTraffic and AfterAllowTraffic."
   ],
   [
    "What must be installed on EC2 instances for CodeDeploy to work?",
    "The CodeDeploy agent, plus an instance profile that allows access to the revision location."
   ],
   [
    "Which ECS hook runs after the test listener routes traffic to the new task set?",
    "AfterAllowTestTraffic."
   ]
  ]
 },
 {
  "t": "Testing in development environments: unit tests in CI, integration tests against deployed stages, AppConfig feature flags and gradual configuration rollout",
  "hook": "At Pinecrest Grocers, the mobile team's new 'smart substitutions' feature passed all 400 unit tests on Monday. On Tuesday it reached production and every substitution request failed with an access denied error, because the function's role could not read the new inventory table. The mocks had happily returned data. Rolling back meant a full redeploy during the lunch rush. Now Ines, the tech lead, is asked to design a better approach: catch problems like that before production, and next time ship risky features in a way that can be switched off in seconds without deploying code. Where should each kind of test run, and how can a feature be turned off without a release?",
  "simple": "Testing cloud apps works best in layers. Unit tests check small pieces of code on their own, quickly, using fake stand-ins for AWS. They run on every code change. Integration tests run against a real copy of your app deployed in a test environment, so they catch problems fakes cannot, like missing permissions. AWS AppConfig lets you change how your app behaves without changing its code. A feature flag is an on and off switch for a feature. You can ship code with the switch off, turn it on slowly for more and more users, and AppConfig will flip it back if alarms go off. It is like a new dish at a restaurant: tasted in the kitchen, tried at a staff meal, then offered to a few tables first.",
  "body": [
   "A good testing strategy for cloud applications layers several kinds of tests, each catching different problems at a different cost and speed. Fast, cheap tests run constantly; slower, more realistic tests run less often but catch problems the fast ones cannot. The Developer Associate exam expects you to know where each layer fits in a CI/CD pipeline, what it can and cannot detect, and which AWS features support safe testing and gradual release.",
   "Unit tests check individual functions and classes in isolation, quickly, with no calls to AWS. For an AWS Lambda function, structure the code so business logic lives in plain functions that the handler calls, and keep the handler thin, mostly parsing the event and returning a response. Then test the logic directly with ordinary inputs. Where code calls AWS, replace the SDK client with a mock or stub: in Python, the moto library emulates many AWS services in memory and the botocore Stubber queues expected responses; JavaScript and other languages have equivalent mocking clients. Run unit tests on every commit in CI, typically in the AWS CodeBuild `pre_build` or `build` phase, and make the build fail on any failure so broken code never reaches an environment. CodeBuild test reports, from the buildspec `reports` section, show pass and fail counts and trends.",
   "The limit of unit tests is important and appears directly on the exam. Because mocks never call AWS, they never check authorization, resource names, network access or service behavior. A unit test cannot tell you that the function's execution role lacks `dynamodb:GetItem`, that an event source mapping points at the wrong queue, or that a timeout is too short for a real downstream call.",
   "Local emulation sits between unit and integration tests. `sam local invoke` and `sam local start-api` run functions in Docker containers with sample events, which is useful for quick checks of event parsing, handler wiring and response formats without deploying. However, local emulation cannot fully reproduce IAM permissions, service quotas, managed integrations or real network paths, so it complements rather than replaces tests against deployed resources.",
   "Integration tests exercise real deployed resources, which is the only way to catch wrong IAM permissions, misconfigured triggers, API Gateway mapping mistakes or real timeouts. The common pattern is to deploy the whole stack to a dedicated development or test stage, as a separate CloudFormation stack and often in a separate AWS account, then run tests that call its API endpoint, send messages to its queues or write to its tables, and assert the results, such as checking that an order record appears in DynamoDB after an API call. Stack outputs, such as the API URL or queue name, feed the test configuration so tests do not hardcode resource names. In AWS CodePipeline, a test stage placed after a deploy-to-test action runs these tests, often as a CodeBuild action, and a failure stops the pipeline before promotion to production.",
   "Several features covered elsewhere in the exam support this approach. API Gateway stages with stage variables and Lambda aliases let the same code and API definition be tested in dev and test before prod. Mock integrations can stand in for backends that are not built yet, so front-end and contract tests can start early. And temporary test stacks should be cleaned up after test runs, for example by deleting the stack at the end of the pipeline stage, to avoid paying for idle resources.",
   "Some risks are best managed not by more testing but by separating configuration changes from code deployments. AWS AppConfig, a capability of AWS Systems Manager, does exactly that. You create an application, one or more environments such as beta and prod, and configuration profiles. A profile is either freeform configuration, such as JSON, YAML or text stored in AppConfig's hosted store, Amazon S3, Parameter Store and other sources, or a feature flag profile. Feature flags let you ship code with a feature turned off, then turn it on for testing or for users without redeploying, and turn it off instantly if problems appear. Flags can carry attributes, such as a limit or a list of allowed regions, with constraints on their values. Validators, either a JSON Schema or a Lambda function, check a configuration before deployment so a malformed value never reaches applications.",
   "AppConfig deploys configuration gradually using a deployment strategy. The strategy sets the growth type, linear or exponential, the growth factor that controls how much of the audience receives the new configuration at each step, the total deployment time and a final bake time during which AppConfig keeps watching before marking the deployment complete. You associate Amazon CloudWatch alarms with the environment, and if any alarm enters ALARM during the rollout or bake time, AppConfig automatically rolls the configuration back to the previous version. That is what makes feature flags safe to use in production: a bad configuration is reversed in minutes without anyone deploying code.",
   "Applications retrieve configuration through the AppConfig data API by calling `StartConfigurationSession` once and then `GetLatestConfiguration` periodically, which returns new data only when the configuration has changed. Lambda functions usually use the AppConfig Lambda extension, added as a layer, which caches configuration locally and refreshes it in the background, so the function reads it from a local endpoint with low latency and fewer API calls. For the exam: mocked unit tests in CI on every commit, integration tests against a deployed test stage to verify permissions and integrations, and AppConfig feature flags with a deployment strategy and alarm-based rollback to change behavior safely without redeploying."
  ],
  "analogy": "Testing in layers is like preparing a theater production. Unit tests are actors rehearsing lines alone, fast and cheap but blind to the set. Integration tests are a full dress rehearsal on the real stage, where you discover the door that does not open, much as you discover a missing permission. AppConfig feature flags are the stage manager's light switches: a new scene can be lit gradually and blacked out instantly if something goes wrong, without rebuilding the set. The analogy stops at automation: AppConfig flips the switch back on its own when an alarm fires.",
  "terms": [
   [
    "Unit test",
    "A fast, isolated test of a single piece of logic with external dependencies mocked."
   ],
   [
    "Integration test",
    "A test against deployed resources to verify real permissions, triggers and service interactions."
   ],
   [
    "Feature flag",
    "A configuration switch that turns functionality on or off at runtime without redeploying code."
   ],
   [
    "AppConfig deployment strategy",
    "Settings controlling how quickly a configuration change rolls out and how long it bakes before completing."
   ],
   [
    "Mock or stub",
    "A test double that replaces a real dependency, such as an AWS SDK client, with predictable fake responses."
   ],
   [
    "Bake time",
    "The period after an AppConfig deployment reaches all targets during which alarms are still monitored before completion."
   ],
   [
    "AppConfig Lambda extension",
    "A layer that caches AppConfig configuration for a Lambda function and refreshes it in the background."
   ],
   [
    "Validator",
    "A JSON Schema or Lambda function that AppConfig uses to check a configuration before deploying it."
   ]
  ],
  "example": "A team ships a new recommendation engine behind an AppConfig feature flag that is off. After deployment, they enable it with a linear strategy over 30 minutes and an alarm on the API's 5xx rate. Error rates climb at 40% rollout, the alarm fires, and AppConfig rolls the flag back without any code change.",
  "mistakes": [
   [
    "Comprehensive unit tests with mocks prove the function will work once deployed.",
    "Mocks never call AWS, so permissions, resource configuration and real integrations are untested. Integration tests against a deployed stage are needed."
   ],
   [
    "Turning a feature on or off requires a new code deployment.",
    "With AppConfig feature flags, behavior changes through a configuration deployment, which can be gradual and rolled back automatically without touching code."
   ],
   [
    "AppConfig rolls back a configuration whenever error rates rise.",
    "It rolls back only when a CloudWatch alarm associated with the environment enters ALARM during the deployment or bake time. Without alarms, there is no automatic rollback."
   ],
   [
    "Lambda functions should call the AppConfig API on every invocation for the freshest value.",
    "The recommended approach is the AppConfig Lambda extension, which caches configuration and refreshes it in the background, reducing latency and API calls."
   ]
  ],
  "tryit": [
   [
    "Pinecrest's pipeline runs unit tests in CodeBuild and then deploys straight to production. Ines wants to catch missing IAM permissions and wrong queue names before production. What pipeline change should she make?",
    "Add a deploy-to-test stage that creates the stack in a separate test environment, followed by a test stage, for example a CodeBuild action, that runs integration tests against the deployed endpoints using stack outputs. Only if those pass does the pipeline continue to production."
   ],
   [
    "The team wants to release smart substitutions to all users over an hour, watching the API's 5xx error rate, and reverse it automatically if errors spike, without redeploying code. What should they configure?",
    "An AppConfig feature flag for the feature, deployed with a deployment strategy such as linear growth over 60 minutes with a bake time, and a CloudWatch alarm on the API 5xx rate associated with the environment. AppConfig rolls the flag back automatically if the alarm fires."
   ]
  ],
  "tip": "Changing application behaviour safely without redeploying code points to AppConfig feature flags with a deployment strategy and alarm-based rollback. Tests that must verify IAM permissions or real integrations need a deployed test stage, not mocks.",
  "check": [
   [
    "Why can't unit tests with mocks catch a missing IAM permission?",
    "Mocks never call AWS, so authorization is never checked; only integration tests against deployed resources exercise real permissions."
   ],
   [
    "What triggers an automatic AppConfig rollback?",
    "A CloudWatch alarm associated with the environment going into ALARM during the deployment or bake time."
   ],
   [
    "How do Lambda functions typically read AppConfig configuration efficiently?",
    "Through the AppConfig Lambda extension, which caches configuration locally and refreshes it in the background."
   ],
   [
    "What does an AppConfig validator do?",
    "It checks a configuration against a JSON Schema or a Lambda function before deployment, so invalid configuration never reaches applications."
   ]
  ]
 },
 {
  "t": "Root cause analysis with CloudWatch Logs, Logs Insights queries, metrics and dashboards",
  "hook": "At 2:10 p.m. at Bluewater Travel, the support lead pings the on-call channel: customers say checkout has been slow for about an hour, and a few bookings failed. Sam is on call. There are fourteen Lambda functions, an API Gateway REST API, an SQS queue and two DynamoDB tables behind that checkout button, and the log groups hold millions of lines. Scrolling through logs at random will not find anything before the next escalation. Sam needs to know when the slowdown started, which component is responsible and what the error actually says. Where should Sam look first, and how do the different CloudWatch tools narrow the search?",
  "simple": "When something breaks, you need clues. Amazon CloudWatch collects three kinds. Metrics are numbers over time, like how many requests failed each minute; they tell you what is wrong and when it started. Logs are the detailed messages your code and AWS services write; they tell you why. Dashboards put the most important graphs on one screen so you can see everything at a glance. CloudWatch Logs Insights lets you search and summarize huge amounts of logs by typing short queries, like 'show me the 50 newest errors'. It is like a doctor: first check temperature and pulse (metrics), then ask detailed questions and run tests (logs) to find the cause.",
  "body": [
   "Root cause analysis means going from a symptom, such as 'checkout is slow', to a specific cause, such as 'the payment function times out calling a third-party API'. Amazon CloudWatch provides the raw material: logs, metrics, alarms and dashboards. Domain 4 of the Developer Associate exam, Troubleshooting and Optimization, often presents a symptom and asks which tool or data source to use, or what a particular metric or log line reveals. Knowing what each tool is good at is what makes an investigation fast.",
   "CloudWatch Logs organizes log data into log groups and log streams. A log group usually represents one application or function, such as `/aws/lambda/checkout`, and holds settings shared by its streams: retention, encryption with an AWS Key Management Service (KMS) key and access permissions. Log streams are sequences of events from one source, such as one Lambda execution environment or one container. Lambda automatically sends everything your code writes to standard output and standard error, plus its own platform lines: `START` when an invocation begins, `END` when it ends, and `REPORT`, which shows the request ID, duration, billed duration, memory size, max memory used, and init duration when the invocation was a cold start. The REPORT line is the first place to look for timeouts and memory pressure.",
   "Retention deserves attention because the default is to keep logs forever, which quietly grows cost. Set a retention period on each log group that matches your operational and compliance needs. Beyond reading logs, you can search them with filter patterns, watch them in near real time with Live Tail, and forward them in real time with subscription filters to a Lambda function, Amazon Kinesis Data Streams or Amazon Data Firehose for processing or archiving elsewhere.",
   "CloudWatch Logs Insights is an interactive query service for log groups. You select one or more log groups and a time range, write a query, and get results in seconds even across large volumes. Queries chain commands with pipes: `fields` chooses fields to display, `filter` keeps matching events, `stats` aggregates with functions such as `count`, `avg`, `max` and `pct`, often grouped by a time bin, `sort` and `limit` order and trim results, and `parse` extracts fields from unstructured text. Logs Insights automatically discovers fields in JSON-formatted log events, which is a strong reason to write structured JSON logs with fields like `requestId`, `orderId` and `level`. Lambda's REPORT lines expose system fields such as `@duration` and `@maxMemoryUsed`. Query results can be visualized and added to a dashboard.",
   "```\nfields @timestamp, @requestId, @message\n| filter @message like /ERROR/\n| sort @timestamp desc\n| limit 50\n\nfilter @type = \"REPORT\"\n| stats avg(@duration), max(@duration), max(@maxMemoryUsed) by bin(5m)\n```",
   "The first query finds the 50 most recent error messages; the second summarizes Lambda performance in five-minute buckets, showing at a glance whether duration or memory use spiked and when. Including `@requestId` lets you jump from an error to every log line for that invocation.",
   "Metrics are numerical time series, and AWS services publish many automatically. Lambda publishes `Invocations`, `Errors`, `Throttles`, `Duration`, `ConcurrentExecutions` and, for stream sources, `IteratorAge`. API Gateway publishes `Count`, `4XXError`, `5XXError`, `Latency` and `IntegrationLatency`. Amazon SQS publishes `ApproximateNumberOfMessagesVisible` and `ApproximateAgeOfOldestMessage`, which reveal a backlog. Amazon DynamoDB publishes consumed read and write capacity and `ThrottledRequests`. Every metric belongs to a namespace, such as `AWS/Lambda`, and is identified by dimensions, name-value pairs such as `FunctionName=checkout`. You view a metric with a statistic, such as Average, Sum, Maximum or a percentile like p99, over a period such as one minute. Percentiles matter for latency because an average can hide a slow tail. Metric filters bridge logs and metrics: a filter on a log group can count lines matching a pattern, such as `PaymentDeclined`, and publish the count as a custom metric you can graph and alarm on.",
   "A practical root cause process uses these tools in order. Start with metrics to find when the problem began and which component is affected. For an API, compare API Gateway `Latency`, the total time, with `IntegrationLatency`, the time spent in the backend: if both rise together, the backend is slow; if only `Latency` rises, the time is being spent in API Gateway itself, for example in an authorizer or mapping. Narrow the time window to the start of the problem. Then use Logs Insights to find errors and slow requests in that window, and follow a request ID or a correlation ID that you pass between services to trace one transaction across functions. AWS X-Ray traces complement this by showing the call path and which downstream call consumed the time.",
   "CloudWatch dashboards place the key graphs for an application side by side, such as request count, error rates, latency percentiles, queue depth and throttles. Dashboards can include metrics from multiple Regions and accounts, can show Logs Insights results and alarm states, and can be shared, which makes them the natural first stop during an incident. Contributor Insights analyzes log data to show top contributors, such as the most throttled DynamoDB partition keys or the clients sending the most requests. For the exam, remember the division of labor: metrics tell you what and when, logs through Logs Insights tell you why, traces tell you where in the call chain, and turning a log pattern into something you can alarm on means a metric filter."
  ],
  "analogy": "Investigating with CloudWatch is like investigating a delayed train network. Metrics are the departure board showing which lines are late and since when. A dashboard is the control room wall with every line's board side by side. Logs are the drivers' detailed reports, and Logs Insights is the search tool that finds every report mentioning a signal fault in the last hour. A metric filter is a counter that rings an alarm each time 'signal fault' is reported. Traces would be following one train's entire journey.",
  "mnemonic": "Metrics tell When and What, Logs tell Why, Traces tell Where.",
  "terms": [
   [
    "Log group",
    "A CloudWatch Logs container for log streams that share retention, encryption and access settings."
   ],
   [
    "CloudWatch Logs Insights",
    "An interactive query service for searching and aggregating log data with a pipe-based query language."
   ],
   [
    "Metric filter",
    "A rule that extracts metric values from matching log events so they can be graphed and alarmed on."
   ],
   [
    "Dimension",
    "A name-value pair that identifies a specific metric series, such as FunctionName=checkout."
   ],
   [
    "Log stream",
    "A sequence of log events from one source, such as one Lambda execution environment, within a log group."
   ],
   [
    "REPORT line",
    "The Lambda log line written after each invocation with duration, billed duration, memory size, max memory used and init duration for cold starts."
   ],
   [
    "IntegrationLatency",
    "The API Gateway metric for time spent waiting on the backend, compared with Latency to locate delays."
   ],
   [
    "Subscription filter",
    "A rule that streams matching log events in real time to Lambda, Kinesis Data Streams or Data Firehose."
   ]
  ],
  "example": "Users report slow checkout since 14:00. The dashboard shows API Gateway Latency rising while IntegrationLatency rises by the same amount, so the backend is slow. A Logs Insights query on the checkout function's REPORT lines shows max duration near the timeout, and filtering for ERROR reveals timeouts calling the payment provider.",
  "mistakes": [
   [
    "Logs Insights queries can trigger alarms directly when an error appears.",
    "To alarm on a log pattern, create a metric filter that turns matches into a metric, then create a CloudWatch alarm on that metric."
   ],
   [
    "CloudWatch Logs deletes old logs automatically after a default period.",
    "The default retention is to keep logs indefinitely. You must set a retention period on each log group to control cost."
   ],
   [
    "High API Gateway Latency always means the Lambda backend is slow.",
    "Compare Latency with IntegrationLatency. If IntegrationLatency rises by the same amount, the backend is slow; if not, the time is spent in API Gateway, for example in an authorizer."
   ],
   [
    "Average duration is the best statistic for spotting slow requests.",
    "Averages hide outliers. Percentiles such as p95 or p99, or Maximum, reveal the slow tail that users notice."
   ]
  ],
  "tryit": [
   [
    "At Bluewater, Sam sees the checkout function's Duration p99 near its configured timeout since 13:05, while Invocations are normal and Throttles are zero. What should Sam do next, and what query would help?",
    "Narrow the time window to around 13:05 and query the function's log group with Logs Insights: filter for ERROR or timeout messages and sort by timestamp, and run stats on REPORT lines for max @duration by bin(5m). Then follow the request IDs of slow invocations, and use X-Ray if available, to see which downstream call is slow."
   ],
   [
    "Product managers want an alarm whenever more than 20 payment-declined messages appear in five minutes. The messages appear only in the function's logs. What should the developer build?",
    "A metric filter on the function's log group matching the PaymentDeclined pattern, publishing a custom metric, and a CloudWatch alarm on that metric's Sum over five minutes with a threshold of 20."
   ]
  ],
  "tip": "Know which tool answers which question: metrics tell you what and when, logs (via Logs Insights) tell you why, and traces tell you where in the call chain. Turning a log pattern into something you can alarm on means a metric filter.",
  "check": [
   [
    "How can you count occurrences of a specific error message in logs and alarm on it?",
    "Create a metric filter on the log group that matches the message, then create a CloudWatch alarm on the resulting metric."
   ],
   [
    "Which Lambda log line shows memory used and duration?",
    "The REPORT line written at the end of each invocation."
   ],
   [
    "Why set a log group retention period?",
    "By default logs are kept indefinitely, which grows cost; retention deletes logs after the chosen period."
   ],
   [
    "API Gateway Latency rose but IntegrationLatency did not. Where is the delay?",
    "Inside API Gateway itself, for example in an authorizer or request processing, rather than in the backend integration."
   ]
  ]
 },
 {
  "t": "Common Lambda errors: throttling (429), timeouts, AccessDenied from the execution role, malformed proxy responses (502), API Gateway 504 integration timeouts",
  "hook": "It is 2 a.m. and your phone buzzes. The mobile app for Harbor Credit Union is showing \"Something went wrong\" to members trying to check balances. Priya, the on-call support lead, pastes three screenshots into the incident channel: one says 502 Bad Gateway, one says 504 Gateway Timeout, and one says 429 Too Many Requests. All three come from the same API, and all three point at Lambda functions you deployed last week. Priya asks the obvious question: is this one problem or three? You open CloudWatch and realize that each of those numbers is a different clue, pointing at a different fix. Which one do you chase first?",
  "simple": "When a Lambda function sits behind an API, things can go wrong in a few typical ways, and each one shows up as its own error number. Think of a busy sandwich shop. A 429 means \"too many customers, please wait\": there are not enough workers free, so new orders are turned away. A timeout means a worker took longer than the time limit allowed. AccessDenied means the worker tried to open a cupboard they do not have the key for. A 502 means the sandwich came out wrapped wrong, so the counter could not hand it over. A 504 means the counter waited 29 seconds for the sandwich and then gave up on the customer, even though the kitchen kept cooking. Knowing which number means what tells you exactly where to look.",
  "body": [
   "Many troubleshooting questions on the exam describe a symptom and an error code, then ask for the fix. If you can map each common AWS Lambda and Amazon API Gateway error to its cause, these become some of the easiest points available. The five errors to know are throttling (HTTP 429), function timeouts, AccessDenied from the execution role, malformed proxy responses (HTTP 502) and API Gateway integration timeouts (HTTP 504).",
   "Start with throttling. Throttling happens when invocations exceed the concurrency available to a function: either the account's Regional concurrency quota, which all functions in that Region share, or a function's own reserved concurrency, which acts as a cap. Synchronous callers receive `TooManyRequestsException` with HTTP status 429 (API Gateway may return 429 or a 5xx code to clients depending on the setup), and the function's `Throttles` metric in Amazon CloudWatch rises. Asynchronous invocations are handled differently: Lambda keeps the event and retries it automatically for up to six hours by default, and event source mappings such as those reading from Amazon Simple Queue Service (SQS) or Kinesis slow their polling. The fixes are to request a higher account concurrency quota, set or raise reserved concurrency for the function, reduce the concurrency needed by making the function faster, check that another function is not consuming the shared pool (and reserve concurrency for critical functions so they are protected), and have clients retry with exponential backoff and jitter.",
   "Be careful not to blame Lambda for every 429. API Gateway also returns 429 when its own stage, method or usage plan throttling limits are exceeded, which is completely separate from Lambda concurrency. If the Lambda `Throttles` metric is flat but clients still see 429, look at the API's throttling settings or the usage plan attached to the caller's API key. Reading the metric before acting is what separates the right answer from a plausible distractor.",
   "Next, timeouts. A timeout occurs when a function runs longer than its configured timeout, and the log shows `Task timed out after N seconds`. The default timeout is only 3 seconds, which surprises many developers the first time a function calls a slow service. To diagnose, look at what the function is waiting on: a slow downstream API, a database connection that cannot be established (often a function attached to a virtual private cloud (VPC) without a route to the database or to the internet), or too little memory, which also means too little CPU because Lambda allocates CPU in proportion to memory. Fixes include raising the timeout (up to 15 minutes), raising memory, setting shorter timeouts on the function's own outbound clients so it fails fast with a clear error instead of hanging, reusing connections across invocations, and moving long work to asynchronous processing.",
   "AccessDenied errors are about AWS Identity and Access Management (IAM). An `AccessDeniedException`, or a message like 'User: arn:aws:sts::...:assumed-role/my-fn-role/my-fn is not authorized to perform: dynamodb:PutItem on resource ...', means the execution role lacks a permission. The good news is that the message tells you exactly which action and which resource Amazon Resource Name (ARN) to add to the role's policy. If the role policy already looks right, check the other places that can deny access: resource policies such as an S3 bucket policy or an AWS Key Management Service (KMS) key policy, explicit denies from permission boundaries or service control policies (SCPs), and whether the function needs KMS permissions such as `kms:Decrypt` to read an encrypted resource. A special case: if the function runs but nothing appears in CloudWatch Logs at all, the role is probably missing the basic logging permissions (`logs:CreateLogGroup`, `logs:CreateLogStream` and `logs:PutLogEvents`, found in the `AWSLambdaBasicExecutionRole` managed policy).",
   "Now the 502. A 502 Bad Gateway from a Lambda proxy integration most often means a malformed proxy response. With proxy integration, API Gateway expects the function to return an object with a numeric `statusCode`, optional `headers`, and a `body` that is a string. If the function returns a raw object as the body, returns nothing, or throws an unhandled error, API Gateway cannot build an HTTP response and returns 502. When API Gateway execution logging is enabled on the stage, the logs show 'Malformed Lambda proxy response'. Fix the return shape by serializing the body with `JSON.stringify` or `json.dumps`, and wrap the handler logic so errors are caught and turned into proper 4xx or 5xx responses. A related but different symptom is a 500 with an invalid permissions message, which means API Gateway itself is not allowed to invoke the function; that is fixed in the function's resource-based policy, not the execution role.",
   "```python\nimport json\n\ndef handler(event, context):\n    try:\n        result = {\"balance\": 1250}\n        return {\"statusCode\": 200, \"headers\": {\"Content-Type\": \"application/json\"}, \"body\": json.dumps(result)}\n    except Exception:\n        return {\"statusCode\": 500, \"body\": json.dumps({\"message\": \"internal error\"})}\n```",
   "Finally, the 504. A 504 Gateway Timeout from API Gateway is an integration timeout: the backend did not respond within API Gateway's integration timeout, which is 29 seconds by default. This is independent of the Lambda timeout. Even if the function's timeout is 5 minutes, the client gets 504 once the API's limit is reached while the function keeps running in the background, still consuming concurrency and money. Raising the Lambda timeout therefore does nothing. The fixes are to make the backend faster, or to change the design to be asynchronous: accept the request, queue the work in SQS or start an AWS Step Functions execution, return 202 Accepted with a job ID, and let the client poll a status endpoint or receive a callback. Regional and private REST APIs can request a longer integration timeout, but the asynchronous design is the answer the exam usually wants.",
   "Putting it together, read the code, then read the matching evidence. A 429 sends you to the `Throttles` metric and the API's throttling settings. A timeout sends you to the function's duration and what it waits on. AccessDenied tells you the missing action in plain text. A 502 sends you to the return shape and unhandled exceptions. A 504 sends you to the 29-second integration limit and an asynchronous redesign."
  ],
  "analogy": "Picture a restaurant pass-through window. The waiter (API Gateway) takes an order and waits at the window for the kitchen (Lambda). If every cook is busy, the order is refused (429). If the cook ignores the plating rules and hands over food in a bag, the waiter cannot serve it (502). If the waiter waits 29 seconds and walks away, the customer is told it failed (504), even though the cook may still finish the dish. The analogy stops working for asynchronous calls: there, Lambda quietly holds the order and retries it later instead of refusing.",
  "mnemonic": "Four-two-nine: too many in line. Five-oh-two: the reply was askew. Five-oh-four: waited, no more. Throttled, badly shaped, too slow.",
  "terms": [
   [
    "TooManyRequestsException (429)",
    "The error returned when a Lambda invocation is throttled because no concurrency is available."
   ],
   [
    "Task timed out",
    "The log message Lambda writes when an invocation exceeds its configured timeout (default 3 seconds, maximum 15 minutes)."
   ],
   [
    "Execution role",
    "The IAM role Lambda assumes to run a function; its policies decide which AWS actions the function code may call."
   ],
   [
    "Malformed Lambda proxy response",
    "An API Gateway error (returned to clients as 502) when a proxy integration's function output has the wrong format."
   ],
   [
    "Integration timeout",
    "The maximum time API Gateway waits for a backend response, 29 seconds by default, after which it returns 504."
   ]
  ],
  "example": "A report endpoint returns 504 errors after about 30 seconds, although the Lambda function eventually finishes after 90 seconds. The team changes the API to put a request on an SQS queue and return 202 with a report ID; a worker function builds the report, and the client polls a status endpoint.",
  "mistakes": [
   [
    "Raising the Lambda timeout to fix a 504 from API Gateway.",
    "The 504 comes from API Gateway's integration timeout (29 seconds by default), which is reached first. Make the backend faster or switch to an asynchronous pattern that returns 202 and lets the client poll."
   ],
   [
    "Assuming every 429 means Lambda concurrency is exhausted.",
    "API Gateway has its own stage, method and usage plan throttling that also returns 429. Check the Lambda Throttles metric: if it is flat, the limit is in API Gateway."
   ],
   [
    "Treating a 502 as a networking or infrastructure outage.",
    "With proxy integration, a 502 usually means the function returned the wrong shape (body not a string, missing statusCode) or threw an unhandled error. Fix the response format and catch exceptions."
   ],
   [
    "Adding permissions to the execution role when API Gateway cannot invoke the function.",
    "The execution role controls what the function can call. Permission for API Gateway to invoke the function lives in the function's resource-based policy."
   ]
  ],
  "tryit": [
   [
    "Diego's order-lookup function writes to an Amazon DynamoDB table. After a deployment, every call fails, and the logs show 'assumed-role/order-lookup-role/order-lookup is not authorized to perform: dynamodb:PutItem on resource arn:aws:dynamodb:...:table/Orders'. A teammate suggests increasing the function's memory and timeout. What should Diego do instead?",
    "Add `dynamodb:PutItem` on the Orders table ARN to the function's execution role policy. The error names the assumed role, the action and the resource, so it is a missing IAM permission; memory and timeout have nothing to do with it. If the policy already allows it, check for an explicit deny in a permission boundary or SCP."
   ],
   [
    "A checkout API's clients receive 429 responses during a sale. The Lambda function's Throttles metric is zero, and its concurrency is far below the account quota. The API uses a usage plan for partner API keys. Where is the throttling coming from?",
    "From API Gateway, not Lambda. The usage plan or stage and method throttling limits are being exceeded. Raise those limits for the affected plan or stage, and have clients retry with exponential backoff."
   ]
  ],
  "tip": "Map codes to causes: 429 is throttling (Lambda concurrency or API Gateway limits), 502 is a bad proxy response or unhandled function error, 504 is the backend exceeding API Gateway's 29-second integration timeout, and AccessDenied naming the assumed role is a missing execution role permission.",
  "check": [
   [
    "An API returns 502 and the logs show 'Malformed Lambda proxy response'. What is the likely fix?",
    "Return an object with a numeric statusCode, optional headers, and body as a string, and handle exceptions so the function always returns that shape."
   ],
   [
    "Why does raising the Lambda timeout not fix a 504 from API Gateway?",
    "API Gateway's integration timeout (29 seconds by default) is reached first, regardless of the function's own timeout."
   ],
   [
    "Name two ways to resolve Lambda throttling.",
    "Request a higher account concurrency quota, set or raise reserved concurrency, speed up the function, or have clients retry with backoff."
   ],
   [
    "A function runs but nothing appears in CloudWatch Logs. What is the most likely cause?",
    "The execution role lacks the basic logging permissions (CreateLogGroup, CreateLogStream, PutLogEvents), such as those in AWSLambdaBasicExecutionRole."
   ]
  ]
 },
 {
  "t": "AWS X-Ray: segments, subsegments, annotations vs metadata, sampling, active tracing, the X-Ray daemon/CloudWatch agent",
  "hook": "Lantern Outfitters' checkout is slow, but only sometimes. Customers in the support queue say the \"Place order\" button spins for eight or nine seconds, then works. Sam, the product manager, forwards you a ticket from a loyal gold-tier customer and asks a simple question: where is the time going? You have logs from API Gateway, three Lambda functions, a DynamoDB table and a payment partner, each in its own log group with its own timestamps. Stitching them together by hand would take hours, and the slowness has usually vanished by the time you look. What you need is one picture of a single request, from the first click to the last database write. How do you get it?",
  "simple": "Imagine following one package as it travels through a delivery network. At each stop, a worker scans it and notes when it arrived and when it left. Afterward you can see the whole trip and spot the stop where it sat for hours. AWS X-Ray does this for requests moving through your application. Each service writes a \"scan\" (called a segment) with start and end times. Smaller steps inside a service, like one database call, get their own mini-scans (subsegments). You can stick labels on a scan: some labels are searchable (annotations), and some are just notes you can read later (metadata). To save money, X-Ray usually records only some of the requests, which is called sampling.",
  "body": [
   "Logs tell you what one component did, but a modern application spreads a single request across many components. Distributed tracing shows the whole request as it travels through Amazon API Gateway, AWS Lambda, Amazon DynamoDB, Amazon Simple Queue Service (SQS) and external APIs. AWS X-Ray collects that trace data, draws a service map of your application, and lets you find exactly which call made a request slow or caused it to fail. For the exam, you need the vocabulary (traces, segments, subsegments), the annotations versus metadata distinction, how sampling works, and how tracing is switched on for Lambda versus Amazon EC2 and Amazon ECS.",
   "Begin with the building blocks. A trace is the full journey of one request, identified by a trace ID that is passed between services in the `X-Amzn-Trace-Id` HTTP header. Each service that handles the request sends a segment: a JSON document describing the work that service did, with start and end times, the resource name, HTTP request and response details, and any error or fault. Inside a segment, subsegments break the work down further, such as each downstream AWS SDK call, each outbound HTTP call or SQL query, or a block of your own code that you want to time. Calls to services that do not send their own segments, such as a third-party payment API, appear as inferred nodes built from your subsegments.",
   "The service map is where these pieces come together visually. X-Ray groups segments into nodes, one per service, and draws the connections between them. Nodes are colored by their error (4xx), fault (5xx) and throttle (429) rates, so a problem area stands out at a glance. Clicking a node shows its latency distribution, and opening an individual trace shows a timeline where each subsegment is a bar. A long bar for a DynamoDB call with a throttle flag, or a long bar for an outbound HTTP call to a partner, tells you immediately where the time went.",
   "You can attach extra data to segments in two ways, and the difference is tested often. Annotations are simple key-value pairs whose values are strings, numbers or Booleans, and X-Ray indexes them. That means you can search and filter traces with filter expressions such as `annotation.customer_tier = \"gold\"`, and create groups from them. Metadata is key-value data of any type, including whole objects and lists, that is stored with the trace but not indexed, so you can view it when you open a trace but you cannot search on it. The practical rule is simple: put IDs and categories you will filter by in annotations, and put larger debugging payloads in metadata.",
   "```python\nfrom aws_xray_sdk.core import xray_recorder\n\n@xray_recorder.capture('charge_card')   # creates a subsegment\ndef charge_card(order):\n    sub = xray_recorder.current_subsegment()\n    sub.put_annotation('order_id', order['id'])\n    sub.put_metadata('order', order)\n```",
   "Sampling controls how many requests are traced, which keeps cost and overhead low. Tracing every request in a high-traffic service would be expensive and rarely necessary, because a representative sample reveals the same patterns. The default rule records the first request each second (called the reservoir) and five percent of any additional requests. You can create custom sampling rules in the X-Ray console, matched by service name, URL path, HTTP method, host and similar attributes, each with its own reservoir and fixed rate. The SDKs fetch these rules from X-Ray and apply them without code changes or redeployments. If a question asks how to trace more requests for one important path, or fewer for a noisy health check, the answer is a sampling rule.",
   "Turning tracing on for Lambda takes two configuration steps and, optionally, a code step. First, enable active tracing on the function (`TracingConfig: Mode: Active` in AWS CloudFormation, or `Tracing: Active` in AWS Serverless Application Model (SAM) Globals). Lambda then creates segments for each sampled invocation. Second, the execution role needs permission to send the data: `xray:PutTraceSegments` and `xray:PutTelemetryRecords`, which are included in the `AWSXRayDaemonWriteAccess` managed policy. API Gateway has a separate per-stage X-Ray tracing setting so that the trace starts at the API. To see downstream calls inside the function as subsegments, instrument your code with the X-Ray SDK, or with AWS Distro for OpenTelemetry (ADOT), which AWS now recommends for new instrumentation, so that AWS SDK clients and HTTP libraries are patched and each call is recorded.",
   "Outside Lambda, the data path is different. On EC2, ECS and on-premises servers, the SDK does not send data directly to the X-Ray API. Instead it sends segments over UDP port 2000 to a local collector, either the X-Ray daemon or the Amazon CloudWatch agent (which can act as that collector), and the collector buffers them and uploads them in batches. On ECS you run the collector as a sidecar container in the same task, and the SDK finds it through the `AWS_XRAY_DAEMON_ADDRESS` environment variable. The EC2 instance profile role or the ECS task role needs the same X-Ray write permissions. In Lambda the collector is provided for you, and in AWS Elastic Beanstalk you can enable it with an option setting.",
   "When traces are missing, work through that path. From Lambda, confirm active tracing is on and the execution role has the write permissions. From EC2 or ECS, confirm the daemon or agent is actually running, the SDK is pointed at the right address on UDP 2000, and the instance or task role can call `PutTraceSegments`. If traces appear but show no downstream detail, the code has not been instrumented to patch the SDK and HTTP clients. And if only a fraction of requests appear, that is usually sampling working as designed."
  ],
  "analogy": "Annotations are like the labels on the spines of files in a filing cabinet: you can scan the shelf and pull every file labeled \"gold customer\". Metadata is like the papers inside a file: full of detail once you open it, but you cannot find a file by searching for a sentence on page six. The analogy stops working in one place: you choose annotations at write time, so a value you only put in metadata can never be searched later, even if you wish it could.",
  "mnemonic": "A for Annotation, A for Ask: you can search it. M for Metadata, M for Museum: look, but do not search.",
  "terms": [
   [
    "Trace",
    "The end-to-end record of one request, made of segments from every service it passed through and linked by a trace ID."
   ],
   [
    "Segment",
    "The record of work done by one service for a traced request, including timing, request details and errors."
   ],
   [
    "Subsegment",
    "A finer-grained part of a segment, such as one downstream call or a timed block of code."
   ],
   [
    "Annotation",
    "An indexed key-value pair (string, number or Boolean) on a segment that can be used in filter expressions to search traces."
   ],
   [
    "Metadata",
    "Non-indexed key-value data of any type stored with a segment for viewing but not searching."
   ],
   [
    "Sampling rule",
    "A rule that sets how many requests of a given kind are traced, using a reservoir and a fixed rate."
   ],
   [
    "X-Ray daemon",
    "A local process that receives segments from the SDK on UDP port 2000 and uploads them to X-Ray in batches; the CloudWatch agent can fill the same role."
   ]
  ],
  "example": "Support needs to find traces for a specific customer's failed orders. The developer adds put_annotation('customer_id', id) in the order function. Now the team can run the filter expression annotation.customer_id = \"C-1042\" in the X-Ray console and open the exact slow traces, where a subsegment shows a DynamoDB call being throttled.",
  "mistakes": [
   [
    "Storing a customer ID in metadata and expecting to filter traces by it.",
    "Metadata is not indexed, so filter expressions cannot use it. Values you need to search on must be annotations."
   ],
   [
    "Thinking active tracing alone shows every DynamoDB and HTTP call inside a Lambda function.",
    "Active tracing creates the function's segments. To get subsegments for downstream calls, instrument the code with the X-Ray SDK or ADOT so clients are patched."
   ],
   [
    "Having the SDK on EC2 send traces straight to the X-Ray API.",
    "On EC2, ECS and on-premises, the SDK sends segments over UDP 2000 to the X-Ray daemon or CloudWatch agent, which uploads them. No running daemon means no traces."
   ],
   [
    "Changing application code to trace more requests for one URL.",
    "Sampling is controlled by sampling rules defined in X-Ray; the SDKs pick them up without code changes."
   ]
  ],
  "tryit": [
   [
    "Ana's team runs an order service on ECS. The code uses the X-Ray SDK, the task role has AWSXRayDaemonWriteAccess, and the developers see traces locally, but no traces appear from production. The production task definition has a single application container. What is most likely missing?",
    "The collector. On ECS, the SDK sends segments over UDP 2000 to an X-Ray daemon or CloudWatch agent sidecar. Add that sidecar container to the task definition and set AWS_XRAY_DAEMON_ADDRESS so the SDK can reach it."
   ],
   [
    "A health-check endpoint is called every few seconds and fills the X-Ray console with uninteresting traces, while the rarely called refund endpoint is hard to find. What should the team change?",
    "Create custom sampling rules: one for the health-check path with a low or zero rate, and one for the refund path with a higher reservoir and rate. No code change or redeployment is needed."
   ]
  ],
  "tip": "Need to search or filter traces by a value: annotation. Need to store extra detail for viewing only: metadata. No traces from EC2 or ECS: check the daemon or agent on UDP 2000 and the role's X-Ray write permissions. No traces from Lambda: enable active tracing and grant PutTraceSegments.",
  "check": [
   [
    "Can you filter traces by a metadata value?",
    "No; metadata is not indexed. Use an annotation for values you need to search on."
   ],
   [
    "What does the default X-Ray sampling rule record?",
    "The first request each second, plus five percent of any additional requests."
   ],
   [
    "What must be done to trace a Lambda function besides code instrumentation?",
    "Enable active tracing on the function and give its execution role X-Ray write permissions such as PutTraceSegments."
   ],
   [
    "Which header carries the trace ID between services?",
    "X-Amzn-Trace-Id."
   ]
  ]
 },
 {
  "t": "Custom metrics: PutMetricData, CloudWatch embedded metric format, high-resolution metrics",
  "hook": "The finance team at Cedar Lane Books wants a dashboard by Friday showing orders placed per minute and how long the payment partner takes to answer. You open CloudWatch and find hundreds of metrics: Lambda invocations, DynamoDB consumed capacity, API Gateway latency. None of them say \"orders\". A teammate, Jonah, has already tried calling the metrics API on every order, and the checkout function got noticeably slower during last weekend's sale. Meanwhile the operations lead wants an alarm that reacts within seconds, not minutes, when payment failures spike. How do you get your own numbers into CloudWatch without slowing checkout down?",
  "simple": "AWS automatically measures things about its own services, like how many times a function ran. But it does not know about your business, such as how many books you sold. Custom metrics let you send your own numbers to Amazon CloudWatch, the AWS monitoring service, so you can draw graphs and set alarms on them. There are two main ways. You can call an API that says \"here is a number\", which is direct but adds a little waiting time to your code. Or you can write a specially formatted line into your logs, and CloudWatch reads the number out of it for you later. Think of it like either phoning in your sales count or writing it in a logbook that someone collects. You can also ask for second-by-second detail instead of minute-by-minute when speed matters.",
  "body": [
   "AWS services publish many metrics automatically, but none of them describe your business events: orders placed, payments declined, items in a cart, or time spent calling a partner API. Custom metrics let you publish those numbers to Amazon CloudWatch so you can graph them, put them on dashboards and alarm on them exactly like built-in metrics. The exam expects you to know how a metric is identified, the two ways to publish (the `PutMetricData` API and the embedded metric format), and when high-resolution metrics are worth it.",
   "First, understand what identifies a metric. Every metric lives in a namespace, a container you name such as `MyShop/Checkout`; the `AWS/` prefix is reserved for AWS services. Inside the namespace it has a metric name, such as `OrdersPlaced`, and up to 30 dimensions, the name-value pairs that identify a particular series, such as `Environment=prod` or `PaymentProvider=acme`. Each unique combination of namespace, name and dimensions is a separate metric that you pay for and that CloudWatch tracks independently. That is why you should avoid dimensions with unbounded values like user IDs or request IDs: they create huge numbers of metrics and cost. Each data point then has a value, an optional unit (`Count`, `Milliseconds`, `Bytes` and so on) and a timestamp.",
   "The direct way to publish is the `PutMetricData` API, available in every AWS SDK and the AWS Command Line Interface (CLI). You can send single values, arrays of values with counts, or statistic sets (Sum, Minimum, Maximum and SampleCount) that summarize many observations in one data point. Statistic sets and batching matter because calling the API for every single event adds a network round trip to your code path and can be throttled at high volume. Batch multiple values in each call, or aggregate in memory and publish periodically. The calling identity, such as a Lambda execution role or an EC2 instance role, needs the `cloudwatch:PutMetricData` permission, and you can restrict it to specific namespaces with the `cloudwatch:namespace` condition key, which is a nice least-privilege detail.",
   "```bash\naws cloudwatch put-metric-data --namespace MyShop/Checkout \\\n  --metric-name OrdersPlaced --dimensions Environment=prod \\\n  --unit Count --value 1 --storage-resolution 1\n```",
   "Resolution is the next decision. Standard-resolution metrics have one-minute granularity, which is fine for most business dashboards. High-resolution metrics, published with `StorageResolution` set to 1, keep data at one-second granularity so you can see short spikes that a one-minute average would smooth away. Alarms on high-resolution metrics can use periods of 10 or 30 seconds, as well as any multiple of 60 seconds, so they can react much faster. The trade-offs are that one-second detail is kept only for a short time before CloudWatch aggregates it to coarser intervals, and alarms on high-resolution metrics cost more. Use high resolution only when seconds really matter, such as real-time trading signals or fast autoscaling decisions.",
   "The CloudWatch embedded metric format (EMF) is often the best choice from AWS Lambda and containers. Instead of calling an API, your code writes a structured JSON log line that includes an `_aws` object describing which fields are metrics and which are dimensions. CloudWatch Logs extracts the metrics automatically and asynchronously after the log line arrives. The benefits are significant: there is no API call in the request path, so no added latency and no throttling risk, and the full log line, including high-cardinality details like the order ID that you would never use as a dimension, stays searchable in CloudWatch Logs Insights. You get the metric for dashboards and alarms and the rich context for investigations from a single line.",
   "```json\n{\"_aws\": {\"Timestamp\": 1735689600000, \"CloudWatchMetrics\": [{\"Namespace\": \"MyShop/Checkout\", \"Dimensions\": [[\"Environment\"]], \"Metrics\": [{\"Name\": \"OrderValue\", \"Unit\": \"None\"}]}]}, \"Environment\": \"prod\", \"OrderValue\": 42.5, \"orderId\": \"o-981\"}\n```",
   "In that example, `OrderValue` becomes a metric with the `Environment` dimension, while `orderId` is just a log field. You rarely hand-write this JSON. The open-source EMF client libraries and the metrics utility in Powertools for AWS Lambda generate the format for you, handle flushing at the end of each invocation, and validate the structure. Because the log group receives the line, the function only needs permission to write logs, which Lambda functions already have through their basic execution permissions.",
   "One more scenario appears often. On Amazon EC2 instances, memory utilization and disk space usage are not built-in metrics, because the hypervisor cannot see inside the guest operating system. The CloudWatch agent, installed on the instance, collects them and publishes them as custom metrics, typically in the `CWAgent` namespace. If a question asks how to alarm on EC2 memory, the answer is the CloudWatch agent, not a built-in metric."
  ],
  "analogy": "PutMetricData is like phoning the head office every time you make a sale: accurate, but you are stuck on the phone while the next customer waits, and the line gets busy when everyone calls at once. EMF is like writing each sale in a logbook with the amount circled; a clerk collects the logbook and tallies the circled numbers later. You never wait, and the full sale details stay in the book. The analogy stops at timing: EMF metrics still arrive within moments, not at the end of the day.",
  "terms": [
   [
    "Namespace",
    "A container for CloudWatch metrics, such as MyShop/Checkout; the AWS/ prefix is reserved for AWS services."
   ],
   [
    "Dimension",
    "A name-value pair that identifies a specific metric series; each unique combination of dimensions is a separate metric."
   ],
   [
    "PutMetricData",
    "The CloudWatch API for publishing custom metric data points or statistic sets."
   ],
   [
    "Statistic set",
    "A single data point that summarizes many observations with Sum, Minimum, Maximum and SampleCount."
   ],
   [
    "Embedded metric format (EMF)",
    "A structured JSON log format from which CloudWatch Logs automatically extracts metrics."
   ],
   [
    "High-resolution metric",
    "A custom metric stored at one-second granularity by setting StorageResolution to 1."
   ]
  ],
  "example": "A checkout Lambda function called PutMetricData on every order, adding latency and occasionally hitting throttling. The team switches to printing EMF log lines with OrderValue and PaymentLatency metrics and an Environment dimension. The metrics still appear in CloudWatch, the function is faster, and each log line still carries the order ID for investigation.",
  "mistakes": [
   [
    "Using a user ID or request ID as a dimension so you can see per-user metrics.",
    "Each unique dimension combination is a separate metric, so unbounded values explode metric count and cost. Keep dimensions low-cardinality and put IDs in log fields (for example in EMF lines) instead."
   ],
   [
    "Calling PutMetricData once per event in a busy Lambda function.",
    "That adds a synchronous call to every request and risks throttling. Use EMF, or batch values and statistic sets."
   ],
   [
    "Expecting built-in EC2 metrics to include memory utilization.",
    "Memory and disk usage come from inside the guest operating system; install the CloudWatch agent to publish them as custom metrics."
   ],
   [
    "Choosing high-resolution metrics for every metric just in case.",
    "High resolution costs more when alarmed on and keeps one-second detail only briefly. Use it only where sub-minute visibility or 10- or 30-second alarms are needed."
   ]
  ],
  "tryit": [
   [
    "Mei's team runs a ticket-booking API on Lambda. They want a metric for seats sold, broken down by venue (about 40 venues), and they also want to look up the exact booking ID behind any odd spike. The function's p99 latency budget is tight. How should they publish the metric?",
    "Write EMF log lines with SeatsSold as the metric and Venue as a dimension, including bookingId as an ordinary field. Venue is low cardinality, so it is a safe dimension; bookingId stays searchable in Logs Insights without becoming a dimension; and there is no API call in the request path."
   ],
   [
    "A trading desk needs an alarm that fires within about 10 seconds when order rejections spike. Their current custom metric is published every minute with default settings. What must change?",
    "Publish the metric as high resolution (StorageResolution 1) at sub-minute intervals and create an alarm with a 10-second period. Standard-resolution metrics only support periods of 60 seconds or more."
   ]
  ],
  "tip": "Publishing metrics from Lambda without API calls or added latency points to the embedded metric format. Need sub-minute granularity or 10-second alarms: high-resolution metrics with StorageResolution 1. Memory usage on EC2: the CloudWatch agent.",
  "check": [
   [
    "Why avoid using a user ID as a metric dimension?",
    "Every distinct dimension combination is a separate metric, so unbounded values create huge numbers of metrics and cost."
   ],
   [
    "What is the benefit of EMF over PutMetricData in Lambda?",
    "Metrics are extracted asynchronously from logs, so there is no synchronous API call, latency or throttling, and detailed context stays in the log line."
   ],
   [
    "How do you publish a high-resolution metric?",
    "Set StorageResolution to 1 in PutMetricData (or the equivalent in EMF), giving one-second granularity."
   ],
   [
    "Which IAM permission does code need to call PutMetricData, and how can you limit it?",
    "cloudwatch:PutMetricData, optionally restricted to specific namespaces with the cloudwatch:namespace condition key."
   ]
  ]
 },
 {
  "t": "CloudWatch alarms with SNS notifications; structured logging and correlation IDs",
  "hook": "Monday morning at Willow Street Pharmacy's online refill service, Rosa from customer care walks over with a printout. A customer says her refill order vanished on Saturday night. You check: the fulfillment function had been failing for three hours on Saturday. There was an alarm. It went to ALARM state. Nobody received the email. And when you open the logs, you find thousands of free-text lines like \"processing...\" and \"error occurred\" across four log groups, with nothing tying any of them to Rosa's customer. Two problems, one bad weekend. Why did the alert never arrive, and how could you have found that one order in seconds?",
  "simple": "An alarm is like a smoke detector for your application. It keeps checking a number, such as how many errors happened in the last minute, and when the number crosses a line you set, it goes off. On AWS, the usual way an alarm \"rings\" is by sending a message to an Amazon SNS topic, which is a broadcast channel that forwards the message to email, text messages or other programs. Good logs are the second half: when the alarm rings, you need to find out what happened. Writing logs in a tidy, consistent format (like filling in the same form every time) makes them easy to search. Giving each customer request its own tracking number, called a correlation ID, lets you follow that one request through every part of the system, like a parcel tracking number.",
  "body": [
   "Monitoring only helps if someone finds out when something goes wrong, and only if they can then work out why. Amazon CloudWatch alarms watch metrics and act when they cross a threshold, Amazon Simple Notification Service (SNS) delivers the alert to people and systems, and good logging practices, structured logs plus correlation IDs, make the follow-up investigation fast. The exam tests the moving parts of an alarm, the reasons notifications fail, and how to trace one request through many services.",
   "Start with how a metric alarm is built. A metric alarm watches one metric, or a metric math expression that combines several, and it has three states: `OK`, `ALARM` and `INSUFFICIENT_DATA`. You configure the statistic (such as Average, Sum or a percentile like p99), the period, the threshold and the comparison operator. You also decide how many periods must breach before the alarm changes state. Evaluation periods and datapoints to alarm let you require, for example, 3 of 5 one-minute periods above the threshold, which avoids waking someone up for a single blip while still catching sustained problems.",
   "Missing data deserves careful thought. You choose whether missing data points are treated as breaching, not breaching, ignored (the alarm keeps its current state), or missing. This matters for metrics like AWS Lambda `Errors`, which simply have no data points when nothing goes wrong. Treating missing data as not breaching is usually right for error counts, so the alarm returns to OK instead of sitting in INSUFFICIENT_DATA. For a heartbeat metric that should always report, treating missing data as breaching turns silence into an alert.",
   "Beyond fixed thresholds, CloudWatch offers two more alarm styles. Anomaly detection alarms use a band learned from the metric's history, including daily and weekly patterns, instead of a fixed number, which suits metrics like traffic that naturally rise and fall. Composite alarms combine the states of several other alarms with AND, OR and NOT rules to reduce noise, for example alerting the on-call engineer only when both the error rate alarm and the latency alarm are in ALARM.",
   "Alarms do their work through actions, which run on state changes. The most common action is publishing to an SNS topic, which then delivers to its subscribers: email, SMS text messages, a Lambda function, an HTTPS endpoint, an Amazon SQS queue or chat integrations. Two details explain many 'missing alert' tickets. First, email subscribers must confirm the subscription by clicking the link in the confirmation email before they receive anything; an unconfirmed subscription silently receives nothing. Second, if the SNS topic is encrypted with a customer managed AWS Key Management Service (KMS) key, the key policy must allow CloudWatch to use the key, or publishing fails. Other alarm actions include Amazon EC2 actions (stop, terminate, reboot, recover), Auto Scaling policies, and AWS Systems Manager OpsItems or incidents. Alarms also drive automated rollbacks in AWS CodeDeploy and AWS AppConfig, a link between monitoring and deployment that the exam likes.",
   "```bash\naws cloudwatch put-metric-alarm --alarm-name checkout-errors \\\n  --namespace AWS/Lambda --metric-name Errors \\\n  --dimensions Name=FunctionName,Value=checkout \\\n  --statistic Sum --period 60 --evaluation-periods 5 --datapoints-to-alarm 3 \\\n  --threshold 5 --comparison-operator GreaterThanThreshold \\\n  --treat-missing-data notBreaching \\\n  --alarm-actions arn:aws:sns:us-east-1:111122223333:oncall\n```",
   "Once the alert arrives, logging takes over. Structured logging means writing each log entry as a JSON object with consistent fields (timestamp, level, service, message, request ID and relevant business IDs such as order ID) instead of free-form text. JSON logs can be queried by field in CloudWatch Logs Insights, for example `filter level = \"ERROR\" and orderId = \"o-552\"`, filtered precisely with metric filters, and parsed by other tools without fragile text matching. Lambda can emit its own system logs in JSON and filter application logs by log level through its logging configuration, and libraries such as the Logger in Powertools for AWS Lambda add context like the request ID and a cold start flag automatically.",
   "A correlation ID ties together all log entries for one business request across services. Generate it at the edge, or reuse an incoming one such as a request header or the API Gateway request ID, include it in every log line, and pass it downstream on every hop: in HTTP headers, SQS or SNS message attributes, Amazon EventBridge event detail, and AWS Step Functions input. Each consumer reads the ID from the incoming message and logs it in turn. Then one Logs Insights query, filtering on that ID across several log groups at once, shows the whole story in time order.",
   "Correlation IDs and tracing complement each other. AWS X-Ray trace IDs serve a similar purpose for traces, and logging the trace ID in each structured log line connects the logs to the trace timeline. Put together, the workflow looks like this: an alarm on errors notifies the on-call engineer through SNS, the engineer opens Logs Insights, filters for errors in the alarm window, picks a correlation ID from one failing entry, and follows that request through every service to the root cause."
  ],
  "analogy": "A correlation ID works like the claim tag on checked luggage. The tag number is printed once at check-in, then every handler who touches the bag scans the same tag, at the belt, the sorting room and the plane. If the bag goes missing, one search on the tag number shows every place it was. The analogy stops where systems differ from airports: nothing scans the tag automatically, so your code must copy the ID into every message and log line, or the trail breaks.",
  "terms": [
   [
    "Metric alarm",
    "A CloudWatch alarm that changes state when a metric or expression crosses a threshold for a set number of periods."
   ],
   [
    "Datapoints to alarm",
    "The number of breaching data points within the evaluation periods required to trigger ALARM (M out of N)."
   ],
   [
    "Treat missing data",
    "The alarm setting that decides whether missing data points count as breaching, not breaching, ignored or missing."
   ],
   [
    "Composite alarm",
    "An alarm whose state is computed from a rule combining other alarms' states."
   ],
   [
    "SNS topic",
    "A publish-subscribe channel that fans out alarm messages to subscribers such as email, SMS, Lambda, HTTPS or SQS."
   ],
   [
    "Structured logging",
    "Writing log entries as consistent machine-readable fields, usually JSON."
   ],
   [
    "Correlation ID",
    "A unique identifier propagated through all services handling a request so their logs can be linked."
   ]
  ],
  "example": "An order passes from API Gateway to a Lambda function, then through SQS to a fulfillment function. The first function logs JSON with correlationId set to the API request ID and adds it as an SQS message attribute; the second logs the same ID. When a customer complains, one Logs Insights query across both log groups for that ID shows exactly where the order stalled.",
  "mistakes": [
   [
    "Assuming an alarm in ALARM state means the email was delivered.",
    "SNS email subscriptions must be confirmed first, and an encrypted topic needs a KMS key policy allowing CloudWatch. Check the subscription status and key policy."
   ],
   [
    "Alarming on a single one-minute breach to catch problems faster.",
    "That pages people for momentary blips. Use M out of N datapoints to alarm, or a composite alarm, to require a sustained or combined signal."
   ],
   [
    "Leaving missing data at the default for a Lambda Errors alarm.",
    "Errors has no data points when nothing fails, so the alarm can sit in INSUFFICIENT_DATA. Treat missing data as not breaching for error counts."
   ],
   [
    "Thinking a correlation ID flows through SQS automatically.",
    "Your code must add it as a message attribute (or in the body) when sending, and the consumer must read and log it."
   ]
  ],
  "tryit": [
   [
    "Kofi wants to be paged only when the checkout service is truly unhealthy. He already has two alarms: one on 5xx error rate and one on p99 latency. Each alone fires several times a day on harmless spikes. What should he build?",
    "A composite alarm with a rule like ALARM(error-rate) AND ALARM(latency), with only the composite alarm sending to the on-call SNS topic. The individual alarms can stay without notification actions, which reduces noise while still alerting on combined failure."
   ],
   [
    "A team's logs are plain text like 'Order failed for user'. An order moves through an API function, an EventBridge rule and a Step Functions workflow. Support wants to find everything about one order in under a minute. What two changes should the team make?",
    "Switch to structured JSON logs with consistent fields, and generate a correlation ID at the API (or reuse the request ID), passing it in the EventBridge event detail and Step Functions input and logging it everywhere. Then one Logs Insights query across the log groups filtered on that ID returns the full story."
   ]
  ],
  "tip": "An alarm that should notify people publishes to an SNS topic; if emails never arrive, check the subscription is confirmed and, for encrypted topics, the KMS key policy. To avoid alerts on one-off spikes, use M out of N datapoints to alarm rather than a single period.",
  "check": [
   [
    "What are the three states of a CloudWatch alarm?",
    "OK, ALARM and INSUFFICIENT_DATA."
   ],
   [
    "How should an alarm on Lambda Errors usually treat missing data, and why?",
    "As not breaching, because no data simply means no errors (or no invocations) in that period."
   ],
   [
    "How do you carry a correlation ID through an SQS queue?",
    "Put it in a message attribute (or the body) when sending, and have the consumer read and log it."
   ],
   [
    "What kind of alarm reduces noise by alerting only when two other alarms are both in ALARM?",
    "A composite alarm with an AND rule."
   ]
  ]
 },
 {
  "t": "Lambda performance: memory/CPU tuning, cold starts, provisioned concurrency, reserved concurrency",
  "hook": "Every weekday at 9:00, the help desk at Northgate Savings lights up. Customers opening the banking app see the login spinner hang for two or three seconds before their balance appears, and then everything is fine for the rest of the day. Leah, the engineering manager, shows you a latency graph with a sharp spike at 9:00 and asks for a fix by the next board meeting. At the same time, the database team is complaining that a nightly reporting function opened so many connections last week that the database refused logins from everything else. Two complaints, both about Lambda, and both with different settings that sound almost the same. Which knob fixes which problem?",
  "simple": "AWS Lambda runs your code in small temporary workspaces. Three things decide how it performs. First, memory: when you give a function more memory, AWS also gives it more processing power, so heavy work finishes faster. Second, cold starts: when Lambda needs a brand new workspace, it has to set it up first, like a cook arriving at a closed kitchen who must turn on the ovens before making the first dish. That first request is slower. You can pay to keep some workspaces warmed up and ready, called provisioned concurrency. Third, reserved concurrency: a free setting that saves a certain number of workspaces for one function and also stops it from using more than that, which protects things like a database from being overwhelmed.",
  "body": [
   "Lambda performance tuning comes down to three questions: how fast each invocation runs, how long new execution environments take to start, and how concurrency is shared among your functions. Each question has its own lever, memory, cold start techniques and provisioned concurrency, and reserved concurrency, and the exam regularly offers the wrong lever as a distractor. Learning which symptom maps to which setting is the core skill.",
   "Begin with memory, because it is the only compute size setting Lambda gives you. Lambda allocates CPU power, and network bandwidth, in proportion to the memory you configure, so doubling memory roughly doubles the available CPU. For CPU-bound code such as image processing, compression, encryption or parsing large JSON documents, raising memory often cuts duration so much that cost stays the same or even drops, because you pay for configured memory multiplied by duration. At higher memory settings a function gets more than one virtual CPU, but that extra core only helps if the code actually uses multiple threads or processes. For code that mostly waits on network calls, more memory helps less.",
   "To size memory well, measure rather than guess. Every invocation ends with a `REPORT` line in Amazon CloudWatch Logs showing `Duration`, `Billed Duration`, `Memory Size` and `Max Memory Used`. A function configured with 1,024 MB that never uses more than 120 MB may be over-provisioned, unless the extra CPU is shortening its duration. Test different settings empirically, for example with the open-source AWS Lambda Power Tuning tool, which runs your function at several memory sizes and charts cost against speed, or follow AWS Compute Optimizer recommendations. Choosing the Arm-based AWS Graviton (`arm64`) architecture often gives better price performance as well.",
   "Next, cold starts. A cold start happens when Lambda must create a new execution environment: download your code, start the language runtime, and run your initialization code outside the handler before the handler itself runs. It appears as an `Init Duration` field in the `REPORT` line and as an initialization segment in AWS X-Ray. Cold starts occur on the first request to a function, whenever traffic rises and Lambda scales out with new environments, after you deploy new code, and after an environment has been idle long enough to be reclaimed. Once an environment exists, later invocations reuse it, which is why everything is fast after the 9:00 spike.",
   "You can shrink cold starts with code and packaging choices. Keep deployment packages small and import only the modules you need. Initialize AWS SDK clients and database connections once, outside the handler, so warm invocations reuse them, but avoid heavy work at initialization that is not needed on every code path. Choose runtimes and frameworks with fast startup. For supported runtimes such as Java, consider Lambda SnapStart, which takes a snapshot of an initialized environment when you publish a version and resumes new environments from that snapshot. One outdated belief to drop: connecting a function to a virtual private cloud (VPC) no longer adds significant cold start time the way it once did.",
   "When code changes are not enough, provisioned concurrency removes cold starts outright for a set number of environments. Lambda pre-initializes that many execution environments so they are ready to respond immediately, eliminating cold starts for traffic up to that number. It is configured on a published version or an alias, never on `$LATEST`. It costs money for as long as it is provisioned, whether used or not, so teams usually scale it with Application Auto Scaling, either on a schedule (raise it before business hours, lower it at night) or with target tracking on provisioned concurrency utilization. Use it for latency-sensitive, synchronous workloads such as interactive APIs with strict response-time goals. Requests above the provisioned amount are still served, by normal on-demand environments with ordinary cold starts.",
   "Reserved concurrency is a different tool, about capacity rather than speed. It sets aside a number of concurrent executions from the account's Regional concurrency pool for one function, guaranteeing that function can always scale to that level even when other functions are busy. It also acts as a hard maximum: invocations beyond the reserved amount are throttled. That cap is valuable in two situations: protecting a downstream resource, for example limiting a function to 50 concurrent executions so it cannot open more connections than a relational database allows, and stopping one runaway function from starving the others. Reserved concurrency has no extra charge. Setting it to zero stops a function from being invoked at all, which some teams use as an emergency off switch.",
   "Keep the distinction straight, because the names sound alike. Provisioned concurrency eliminates cold starts and costs extra. Reserved concurrency guarantees and limits scaling and is free. A function can have both, as long as provisioned concurrency does not exceed reserved concurrency. For database connection pressure specifically, pair reserved concurrency with Amazon RDS Proxy, which pools and shares database connections among many Lambda environments so the database sees far fewer connections than there are concurrent invocations."
  ],
  "analogy": "Think of a taxi company. Memory is the engine size: a bigger engine gets each passenger there faster, and because you pay by the minute, a faster trip can cost no more. Provisioned concurrency is paying drivers to wait at the rank with engines running, so the first passengers never wait for a car to warm up. Reserved concurrency is a contract that sets aside ten cars for the hospital, guaranteed, but also never more than ten. The analogy stops at billing: reserved cars cost nothing extra, while waiting drivers bill you every hour.",
  "terms": [
   [
    "Memory setting",
    "The single Lambda compute size control; CPU and network bandwidth are allocated in proportion to configured memory."
   ],
   [
    "Cold start",
    "The added latency when Lambda creates and initializes a new execution environment before running the handler."
   ],
   [
    "Init Duration",
    "The REPORT log field showing how long initialization took for an invocation that had a cold start."
   ],
   [
    "Provisioned concurrency",
    "Pre-initialized execution environments on a version or alias that remove cold starts, billed while configured."
   ],
   [
    "Reserved concurrency",
    "A free setting that guarantees and caps a function's concurrent executions."
   ],
   [
    "Lambda SnapStart",
    "A feature for supported runtimes that resumes new environments from a snapshot of an initialized one to shorten cold starts."
   ]
  ],
  "example": "A banking API's p99 latency spikes every morning at 9:00 when traffic ramps up and new environments cold start. The team adds provisioned concurrency to the live alias with a scheduled Application Auto Scaling action that raises it before 9:00 and lowers it in the evening, and sets reserved concurrency on a reporting function so it cannot exhaust the database's connections.",
  "mistakes": [
   [
    "Using reserved concurrency to fix cold start latency.",
    "Reserved concurrency only guarantees and caps capacity; environments still cold start. Provisioned concurrency (or SnapStart for supported runtimes) addresses cold starts."
   ],
   [
    "Configuring provisioned concurrency on $LATEST.",
    "Provisioned concurrency must be set on a published version or an alias that points to one."
   ],
   [
    "Assuming more memory always costs more.",
    "Cost is memory times duration. For CPU-bound code, more memory brings more CPU, which can shorten duration enough that the total cost stays the same or falls."
   ],
   [
    "Believing VPC-attached functions always suffer long cold starts.",
    "That was true of older networking. Today VPC attachment no longer adds significant cold start time, so it is not the usual cause of slow starts."
   ]
  ],
  "tryit": [
   [
    "Tomas runs an image-thumbnail function at 512 MB. Each invocation takes about 6 seconds, and the REPORT line shows Max Memory Used of 180 MB. His manager says to lower memory to 256 MB to save money because the function barely uses its memory. Is that a good idea?",
    "Probably not. Thumbnail generation is CPU-bound, and lowering memory also lowers CPU, so duration would likely grow and cost could rise. A better move is to test higher memory settings (for example with Lambda Power Tuning); more CPU may cut duration enough to lower total cost and latency."
   ],
   [
    "An order-export function is invoked by an EventBridge schedule and sometimes scales to hundreds of concurrent executions, each opening a connection to an Amazon RDS database that allows a limited number of connections. Customers' checkout function then fails to connect. What should the team configure?",
    "Set reserved concurrency on the export function to cap its concurrent executions below what the database can handle, and consider RDS Proxy to pool connections. Optionally reserve concurrency for the checkout function so it is never starved of capacity."
   ]
  ],
  "tip": "Latency from cold starts: provisioned concurrency (or SnapStart for supported runtimes). Protect a downstream system or guarantee capacity: reserved concurrency. Slow CPU-heavy function: increase memory.",
  "check": [
   [
    "Which setting removes cold starts, and what does it require?",
    "Provisioned concurrency, configured on a published version or alias, billed while provisioned."
   ],
   [
    "How can you stop a Lambda function from overwhelming an RDS database with connections?",
    "Set reserved concurrency to cap concurrent executions, and consider RDS Proxy to pool connections."
   ],
   [
    "Why might increasing memory reduce cost?",
    "More memory gives more CPU, so the function finishes faster; since cost is memory times duration, the total can stay the same or drop."
   ],
   [
    "Where in the logs can you see that an invocation had a cold start?",
    "The REPORT line includes an Init Duration field only for invocations that initialized a new environment."
   ]
  ]
 },
 {
  "t": "Stream and queue troubleshooting: Kinesis IteratorAge, parallelization factor, SQS dead-letter queues and redrive",
  "hook": "At Riverbend Transit, the live bus-tracking map is supposed to update every few seconds. This afternoon, Omar from the dispatch office calls: the map shows buses where they were forty minutes ago, and the gap is growing. You open CloudWatch and find a Lambda function reading GPS pings from a Kinesis data stream, and one metric climbing in a straight line. In another account, the fare-refund queue has gone quiet, but a separate queue nobody watches now holds two thousand messages. Both systems look fine at a glance. Both are quietly falling behind. Which metric tells you how late you are, and how do you catch up without losing data?",
  "simple": "Streams and queues are waiting lines for data. A stream is like a conveyor belt that keeps items in order and keeps them only for a limited time before they fall off the end. A queue is like a pile of job tickets that workers take, finish and throw away. When workers fall behind, data piles up. For a stream, the key number is \"iterator age\": how old the item a worker is handling right now is. If it keeps growing, workers are falling further behind and old items could fall off the belt. For a queue, a ticket that keeps failing can be moved to a separate \"problem pile\", called a dead-letter queue, so it does not block everything else. After you fix the bug, you can move those tickets back to try again. That move back is called redrive.",
  "body": [
   "When a stream or queue consumer falls behind or keeps failing, messages pile up and data arrives late, or is lost. The exam describes these situations through specific metrics and settings, and you need to know what each metric means and which setting fixes the underlying cause. This lesson covers stream consumers on Amazon Kinesis Data Streams and Amazon DynamoDB Streams, and queue consumers on Amazon Simple Queue Service (SQS), including dead-letter queues (DLQs) and redrive.",
   "For Kinesis Data Streams and DynamoDB Streams consumed by AWS Lambda, the key metric is `IteratorAge`: the age of the last record in the batch when Lambda processed it. In plain terms, it is how far behind real time the consumer is. Kinesis itself reports a similar stream-level metric, `GetRecords.IteratorAgeMilliseconds`. A small and flat iterator age means the consumer is keeping up. A steadily growing iterator age means records are arriving faster than they are processed, or processing is blocked. This is urgent, not cosmetic: records that stay unprocessed beyond the stream's retention period expire and are lost for good.",
   "The first cause to check is a failing batch. Stream processing is ordered per shard, so when the function throws an error on a batch, Lambda retries that same batch, and by default it can keep retrying until the records expire, while every newer record in that shard waits behind it. The shard stalls and the iterator age climbs. Check the function's `Errors` metric and its logs. Then configure the event source mapping so one bad record cannot block a shard indefinitely: set maximum retry attempts and maximum record age, enable bisect batch on function error (which splits a failing batch in half to isolate the bad record), return partial batch responses so only failed records are retried, and set an on-failure destination such as an SQS queue or Amazon SNS topic to capture details of records that are finally skipped.",
   "The second cause is a slow or under-parallelized consumer. If the function simply takes too long, optimize the code or raise its memory, which also raises its CPU. If there is not enough parallelism, raise the parallelization factor on the event source mapping, from the default of 1 up to 10. This lets Lambda process up to that many batches from each shard concurrently, while still keeping order for records that share the same partition key, because records with one key always go to the same concurrent processor. Larger batch sizes and a batching window reduce per-invocation overhead. Adding shards increases throughput for both producers and consumers. And when several applications read the same stream and compete for its shared read throughput, enhanced fan-out gives each registered consumer its own dedicated read throughput per shard.",
   "Problems can also start on the producer side. A `ProvisionedThroughputExceededException` on writes, visible in the `WriteProvisionedThroughputExceeded` metric, means a shard's write capacity was exceeded. Often the cause is a poorly chosen partition key that sends most records to one hot shard, for example using a region code when one region dominates traffic. Use a higher-cardinality partition key, add shards or switch the stream to on-demand capacity mode, and retry failed writes with exponential backoff.",
   "For SQS, the equivalent warning signs are `ApproximateNumberOfMessagesVisible`, which is the backlog waiting to be received, and `ApproximateAgeOfOldestMessage`, which is how long the oldest message has waited. Rising values mean consumers are too slow, failing or not running at all. For Lambda consumers, check the function's errors and throttles and the maximum concurrency setting on the event source mapping, which may be limiting how many invocations the queue can drive. Also make sure the queue's visibility timeout is comfortably longer than the function's timeout; AWS recommends at least six times the function timeout for Lambda event sources. If the visibility timeout is too short, a message becomes visible again while the first attempt is still running, and it is processed twice.",
   "A dead-letter queue catches messages that fail repeatedly so they stop clogging the main queue. The source queue's redrive policy names the DLQ and a `maxReceiveCount`; when a message has been received more than that many times without being deleted, SQS moves it to the DLQ. The DLQ must be the same type as the source (a FIFO queue needs a FIFO DLQ) and in the same AWS account and Region. Its retention period should be longer than the source queue's, because for standard queues a message keeps its original enqueue timestamp when it moves, so it could expire soon after arriving in a DLQ with the same retention. A redrive allow policy on the DLQ controls which source queues may use it.",
   "```json\n{\"deadLetterTargetArn\": \"arn:aws:sqs:us-east-1:111122223333:refunds-dlq\", \"maxReceiveCount\": \"5\"}\n```",
   "Finally, recovery. Once you have found and fixed the bug, DLQ redrive moves messages back to the source queue, or to another queue you choose, for reprocessing. You can start it from the SQS console or with the `StartMessageMoveTask` API, and control the move rate. Just as important, always create a CloudWatch alarm on the DLQ's `ApproximateNumberOfMessagesVisible`. A DLQ nobody watches turns loud failures into silent data loss."
  ],
  "analogy": "A Kinesis shard is a single-file checkout lane where order matters. If one customer's card keeps declining, the whole lane stops, and the clock on the oldest waiting customer, the iterator age, keeps climbing. Bisect batch and retry limits are the manager who steps in and moves the problem customer aside. The parallelization factor opens extra registers for the same lane, with one rule: all items from the same family (partition key) must go through the same register so they stay in order.",
  "terms": [
   [
    "IteratorAge",
    "The metric showing how old the records being processed from a stream are, indicating how far behind a consumer is."
   ],
   [
    "Parallelization factor",
    "An event source mapping setting (1 to 10) for concurrent batches per shard, preserving order per partition key."
   ],
   [
    "Bisect batch on function error",
    "An event source mapping option that splits a failing batch in two and retries each half to isolate a bad record."
   ],
   [
    "Enhanced fan-out",
    "A Kinesis feature that gives each registered consumer dedicated read throughput per shard."
   ],
   [
    "maxReceiveCount",
    "The number of times an SQS message can be received before the redrive policy moves it to the DLQ."
   ],
   [
    "DLQ redrive",
    "Moving messages from a dead-letter queue back to a source queue for reprocessing after a fix."
   ]
  ],
  "example": "A clickstream function's IteratorAge climbs from seconds to hours. Logs show no errors, but duration is high and the stream has only four shards. The team sets the parallelization factor to 5, so each shard is processed by up to five concurrent invocations, and the iterator age falls back to near zero.",
  "mistakes": [
   [
    "Thinking a rising IteratorAge is harmless because the data is still in the stream.",
    "Records expire after the stream's retention period. A consumer that stays behind long enough loses data permanently."
   ],
   [
    "Believing a higher parallelization factor breaks ordering.",
    "Order is still preserved for records with the same partition key; only records with different keys in a shard are processed concurrently."
   ],
   [
    "Setting the SQS visibility timeout equal to or shorter than the Lambda timeout.",
    "Messages reappear while still being processed and are handled twice. Make the visibility timeout well above the function timeout; AWS recommends at least six times for Lambda event sources."
   ],
   [
    "Giving the DLQ the same or shorter retention than the source queue.",
    "For standard queues the original enqueue timestamp is kept, so messages can expire soon after moving. Set a longer retention on the DLQ."
   ]
  ],
  "tryit": [
   [
    "Grace's payment-events function reads a Kinesis stream. IteratorAge on one shard is rising steadily while other shards are fine. The function's Errors metric shows a constant stream of failures, all on the same record ID. What should she configure?",
    "The shard is blocked by a poison record being retried. Configure the event source mapping with bisect batch on function error, a maximum retry attempts value, partial batch responses and an on-failure destination. The bad record is isolated and sent to the destination, and the shard moves on. Raising the parallelization factor would not help a blocked shard."
   ],
   [
    "A refund queue's consumer had a bug for two hours, and 1,800 messages landed in the DLQ. The bug is fixed and deployed. How should the team reprocess the messages, and what should they add so this is noticed sooner next time?",
    "Start a DLQ redrive (console or StartMessageMoveTask) to move the messages back to the source queue. Add a CloudWatch alarm on the DLQ's ApproximateNumberOfMessagesVisible greater than zero, notifying the team through SNS."
   ]
  ],
  "tip": "Rising IteratorAge: look for errors blocking a shard (fix with bisect, retry limits, partial batch responses) or too little parallelism (raise the parallelization factor or add shards). Messages processed twice from SQS: visibility timeout shorter than processing time.",
  "check": [
   [
    "What does a steadily increasing IteratorAge indicate?",
    "The consumer is falling behind the stream, because it is too slow or blocked by failing batches, risking data loss when records expire."
   ],
   [
    "How does raising the parallelization factor keep ordering?",
    "Records with the same partition key are still processed in order; only different keys within a shard are processed concurrently."
   ],
   [
    "After fixing a bug, how do you reprocess messages sitting in an SQS DLQ?",
    "Use DLQ redrive (console or StartMessageMoveTask) to move them back to the source queue."
   ],
   [
    "What must be true of the DLQ for a FIFO source queue?",
    "It must also be a FIFO queue, in the same account and Region."
   ]
  ]
 },
 {
  "t": "DynamoDB optimization: hot partitions, key design, on-demand vs provisioned capacity, adaptive capacity",
  "hook": "Bluepine Sensors has 40,000 soil-moisture devices reporting to a DynamoDB table every minute. Every day around noon, when most farms water their fields, writes start failing with throttling errors, and the irrigation dashboard goes stale. Hana, the operations lead, sends you a CloudWatch screenshot: the table is provisioned for far more writes than it uses, and consumed capacity barely reaches a third of it. \"We are paying for capacity we never use, and we are still being throttled. How is that possible?\" You look at the table design and notice the partition key is the date. Is the problem how much capacity you bought, or where the traffic lands?",
  "simple": "Amazon DynamoDB stores your data in many separate storage pieces called partitions. It decides which piece each item goes into by looking at the item's partition key, a bit like sorting mail into pigeonholes by the first letter of a surname. Each pigeonhole can only be filled so fast. If almost everyone's surname starts with the same letter, one pigeonhole is overwhelmed while the rest sit empty, even though the mail room as a whole has plenty of room. That overloaded pigeonhole is a \"hot partition\". The fix is choosing a key with lots of different, evenly used values. DynamoDB also lets you pick how you pay: per request, which adjusts automatically, or by reserving a set capacity, which is cheaper when traffic is steady.",
  "body": [
   "Amazon DynamoDB performance depends heavily on how your data and traffic spread across partitions. A table's data and throughput are divided among partitions by the hash of the partition key, and each partition has its own throughput limit: up to 3,000 read capacity units (RCUs) and 1,000 write capacity units (WCUs) per second. The consequence surprises many developers: a table can have plenty of total capacity and still throttle if requests concentrate on a few keys. The exam tests whether you can recognize this, fix it with key design, and choose the right capacity mode.",
   "First, learn to recognize a hot partition, also called a hot key: a partition receiving a disproportionate share of traffic. The symptoms are `ProvisionedThroughputExceededException` or `ThrottlingException` errors in your application, rising `ThrottledRequests` and read or write throttle event metrics in Amazon CloudWatch, all while the consumed capacity for the whole table looks well below what is provisioned. That combination, throttling plus low overall utilization, is the signature. To find the culprit, enable CloudWatch Contributor Insights for DynamoDB, which shows the most accessed and most throttled partition keys, so hot keys are easy to identify instead of guessed at.",
   "Key design is the real fix. Choose a partition key with high cardinality, meaning many distinct values, that is accessed fairly evenly, such as user ID, order ID or device ID. Poor choices include status values such as `active` or `inactive` (only two values for the whole table), dates for time-series writes (all of today's writes hit one key), or a tenant ID when one tenant is much larger than all the others. Composite keys often help: a partition key of `deviceId` with a sort key of the timestamp spreads writes across devices while still letting you query one device's history in time order.",
   "Sometimes the access pattern is unavoidably hot, for example when you truly need to write every event for a given day under a key you can query by day. Then use write sharding: add a suffix to the key so writes spread across several partitions. The suffix can be random, for example `2026-09-25#7` with a suffix from 0 to 9, or calculated from another attribute, such as a hash of the device ID modulo 10, so that you can compute the suffix again and find a specific item directly. When reading, you query all the suffixes, often in parallel, and merge the results in your code. Write sharding trades a little read complexity for much higher write throughput.",
   "Other design choices also reduce pressure. For read-heavy hot items, such as a popular product page or a configuration record everyone reads, put a cache such as DynamoDB Accelerator (DAX) or Amazon ElastiCache in front of the table so most reads never reach the partition. Avoid large items: read and write units scale with item size, so store big blobs such as images or documents in Amazon S3 and keep only a pointer in the item. And use `Query`, which reads only the items under one partition key, instead of `Scan`, which reads the entire table and consumes capacity across every partition.",
   "Next, capacity modes. On-demand mode charges per request and scales automatically to your traffic with no capacity planning, which suits new applications with unknown traffic, unpredictable or spiky traffic, and workloads with long idle periods. Provisioned mode has you set RCUs and WCUs, usually with auto scaling, which adjusts capacity between a minimum and maximum to track a target utilization percentage. Provisioned mode is cheaper for steady, predictable traffic, but auto scaling reacts over minutes, so a sudden spike can throttle before capacity catches up. Reserved capacity can lower provisioned costs further for long-term steady workloads. Remember global secondary indexes (GSIs) as well: each GSI has its own capacity in provisioned mode, and a GSI with too little write capacity throttles writes to the base table, because every base table write that affects the index must also be written to it.",
   "DynamoDB also has built-in protections against moderate imbalance. Burst capacity lets a partition temporarily use unused capacity saved from the recent past to absorb short spikes. Adaptive capacity automatically and instantly gives more of the table's throughput to partitions receiving more traffic, so uneven access works as long as the total stays within the table's capacity and each partition stays within its per-partition limits. Adaptive capacity can also split a partition to isolate frequently accessed items onto their own partition. These features reduce throttling from moderate imbalance, but they cannot fix a single key whose traffic exceeds one partition's maximum throughput. That still requires better key design, write sharding or caching.",
   "On the client side, the AWS SDKs retry throttled requests automatically with exponential backoff. That smooths over brief throttling and is worth keeping, but it is not a substitute for good design: retries add latency, and sustained throttling on a hot key will still surface as errors. When an exam answer offers only 'add retries' or only 'buy more capacity' for a hot key problem, look for the option that changes the key or adds a cache."
  ],
  "analogy": "A DynamoDB table is like a supermarket with many checkout lanes, each able to serve only so many customers per minute. If everyone queues at lane 3 because it is nearest the door, lane 3 overflows while the other lanes are idle, and opening more lanes elsewhere does not help. Adaptive capacity is the manager moving a spare cashier to lane 3, which helps up to a point. Write sharding is putting up signs that send shoppers to lanes 3a through 3j. The analogy stops at billing: in on-demand mode you pay per customer, not per lane.",
  "terms": [
   [
    "Partition key",
    "The attribute DynamoDB hashes to decide which partition stores an item; it should have high cardinality and even access."
   ],
   [
    "Hot partition",
    "A partition receiving a disproportionate share of requests, causing throttling despite unused table capacity."
   ],
   [
    "Write sharding",
    "Adding a random or calculated suffix to partition keys to spread writes across more partitions."
   ],
   [
    "On-demand capacity",
    "A DynamoDB mode billed per request that scales automatically without capacity planning."
   ],
   [
    "Provisioned capacity",
    "A DynamoDB mode where you set RCUs and WCUs, usually with auto scaling; cheaper for steady traffic."
   ],
   [
    "Adaptive capacity",
    "DynamoDB's automatic reallocation of throughput to busier partitions and isolation of frequently accessed items."
   ],
   [
    "Burst capacity",
    "Unused capacity DynamoDB briefly retains to absorb short traffic spikes."
   ]
  ],
  "example": "An IoT table uses the date as its partition key, so every write for the day lands on one key and throttles at peak. The team changes the key to deviceId#date for per-device queries, and for a daily roll-up adds a GSI whose partition key is date plus a suffix from 0 to 9, querying all ten shards to build the report.",
  "mistakes": [
   [
    "Raising the table's provisioned capacity to fix throttling when consumed capacity is low.",
    "Low overall consumption with throttling means a hot partition. Each partition has its own limit, so more table capacity does not help one hot key; fix the key design or cache reads."
   ],
   [
    "Assuming adaptive capacity removes any need for good key design.",
    "Adaptive capacity shifts throughput to busy partitions, but it cannot let a single key exceed one partition's maximum throughput."
   ],
   [
    "Choosing a low-cardinality attribute like status or date as the partition key.",
    "Few distinct values concentrate traffic on few partitions. Prefer high-cardinality keys such as user, order or device IDs, and shard if a pattern is unavoidably hot."
   ],
   [
    "Forgetting the GSI when diagnosing write throttling on the base table.",
    "In provisioned mode, a GSI with insufficient write capacity throttles writes to the base table. Check the index's capacity and metrics too."
   ]
  ],
  "tryit": [
   [
    "A ticketing startup is launching next month. They have no idea whether they will see 100 or 100,000 requests per minute, and traffic will spike sharply when popular events go on sale. Which capacity mode should they start with?",
    "On-demand mode. It scales automatically per request with no capacity planning, which suits unknown and spiky traffic. Once traffic becomes steady and predictable, they can evaluate provisioned mode with auto scaling to lower cost."
   ],
   [
    "A leaderboard table uses gameId as the partition key. During a tournament, one game receives most of the reads, and the app throttles, while consumed capacity for the table stays low. Contributor Insights shows one gameId at the top of the throttled keys. The data changes only every few seconds. What is the best fix?",
    "Put a cache in front of the reads, such as DAX for eventually consistent reads (or ElastiCache), so repeated reads of the hot item are served from memory. This is a read-heavy hot key, so caching relieves the partition without redesigning the table; raising table capacity would not help."
   ]
  ],
  "tip": "Throttling while total consumed capacity is low means a hot partition: fix the partition key (higher cardinality, write sharding) or cache hot reads. Unpredictable or spiky traffic with no capacity planning points to on-demand mode.",
  "check": [
   [
    "Why can a table throttle even though its provisioned capacity is barely used?",
    "Throughput limits apply per partition, so traffic concentrated on one partition key can exceed that partition's limit."
   ],
   [
    "When is provisioned capacity with auto scaling a better choice than on-demand?",
    "For steady, predictable traffic, where it is usually cheaper."
   ],
   [
    "What does write sharding do?",
    "It adds a suffix to the partition key so writes that would hit one key are spread across several partitions."
   ],
   [
    "Which tool helps identify the most throttled keys in a DynamoDB table?",
    "CloudWatch Contributor Insights for DynamoDB."
   ]
  ]
 },
 {
  "t": "Caching for performance: API Gateway stage caching, CloudFront, ElastiCache, DAX",
  "hook": "Maple Grove Market's product catalog API gets hammered every Saturday morning. The same GET request for \"fresh produce\" arrives thousands of times a minute, each one waking a Lambda function that reads the same DynamoDB items and returns the same answer. Customers in other countries complain that product photos load slowly. Meanwhile the analytics team wants faster results from a heavy SQL report that runs against the relational database dozens of times an hour. Eli, the finance analyst, asks why the AWS bill rises every weekend when the catalog barely changes. You know caching is the answer, but AWS offers caches at four different layers. Which one belongs where?",
  "simple": "A cache is a place to keep a copy of an answer you have already worked out, so the next time someone asks the same question you can reply instantly instead of doing all the work again. It is like a librarian who keeps the most requested books on the front desk instead of fetching them from the basement every time. AWS has caches at different points. API Gateway can remember responses to repeated API calls. CloudFront keeps copies of files and pages in locations around the world, close to users. ElastiCache is a fast memory store your own code can put anything into. DAX is a cache made just for DynamoDB. The trade-off is always the same: a cached copy might be a little out of date.",
  "body": [
   "Caching stores the result of expensive work so repeated requests are answered faster and backends do less work. AWS offers caches at several layers of an application, and exam questions give clues about where the repeated work happens and what kind of data is involved. This lesson compares four: Amazon API Gateway stage caching, Amazon CloudFront, Amazon ElastiCache and DynamoDB Accelerator (DAX).",
   "Start at the API layer. API Gateway caching is enabled per stage on REST APIs. API Gateway keeps responses from the integration for a time to live (TTL), 300 seconds by default and configurable up to 3,600 seconds (setting it to 0 disables caching), and returns cached responses without calling AWS Lambda or your backend at all. You choose a cache capacity, meaning its size, for the stage, and you can override caching settings per method, for example disabling caching for POST methods that change data. Caching is charged per hour according to the cache size you choose, whether or not it is busy.",
   "The cache key is the detail most likely to cause bugs and exam questions. By default the cache key is the method and resource path. If a response depends on a query string parameter or a header, such as `?category=produce` or an `Accept-Language` header, you must add that parameter or header to the cache key; otherwise users receive each other's results, because API Gateway treats different requests as the same one. Clients can request a fresh response by sending `Cache-Control: max-age=0`, but only if they are authorized with the `execute-api:InvalidateCache` permission, or if the stage allows unauthorized invalidation, which is risky because anyone could then bypass the cache and load your backend. You can also flush the entire stage cache from the console or API after a data change. The `CacheHitCount` and `CacheMissCount` metrics in Amazon CloudWatch show how effective the cache is.",
   "Move outward to the edge with CloudFront. Amazon CloudFront is a content delivery network (CDN) that caches content at edge locations close to users worldwide. It serves static assets such as images, JavaScript and CSS from Amazon S3, with origin access control (OAC) keeping the bucket private so users can reach the files only through CloudFront. It can also cache dynamic or API responses from any HTTP origin. Cache policies control TTLs and which headers, cookies and query strings form part of the cache key; including fewer values raises the cache hit ratio, because more requests match the same cached object.",
   "When content changes before its TTL expires, you have two options with CloudFront. You can create an invalidation, which removes objects from edge caches, or, better for frequently deployed files, use versioned file names such as `app.3f9c.js`, so each new build has a new URL and old cached copies are simply never requested again. Choose CloudFront when users are geographically spread and the problem is the distance, and therefore latency, between users and the origin.",
   "Inside your application, Amazon ElastiCache (for Redis OSS, Valkey or Memcached) is an in-memory cache that your application code controls directly, typically placed in front of relational databases or slow services. Your code decides what to store and when, using strategies such as lazy loading (fill the cache on a miss), write-through (update the cache whenever you write to the database) and TTLs to limit staleness. ElastiCache works for any data you can compute or query: session state, rendered page fragments, results of expensive SQL joins, or leaderboards. The cost of that flexibility is that it requires code changes and runs inside your virtual private cloud (VPC), so functions that use it need network access to it.",
   "For DynamoDB specifically, DynamoDB Accelerator (DAX) is a managed, in-memory cache built only for Amazon DynamoDB. It is API-compatible with DynamoDB, so you switch to the DAX client with minimal code change, and it reduces eventually consistent read latency from milliseconds to microseconds. DAX keeps an item cache for `GetItem` and `BatchGetItem` results and a query cache for `Query` and `Scan` results. Writes go through DAX to DynamoDB and update the item cache. The important limitation: strongly consistent reads pass straight through to DynamoDB and are not cached, so DAX does not help workloads that need them, and it offers little for write-heavy workloads.",
   "Choosing comes down to reading the clues. Repeated identical API requests reaching your backend suggest API Gateway caching. Global users and static or cacheable content suggest CloudFront. Hot results from a relational database or a custom computation suggest ElastiCache. Read-heavy DynamoDB traffic, hot keys being read, or a need for microsecond reads with minimal code change suggest DAX. Layers can combine, too: CloudFront in front of API Gateway, with DAX behind Lambda, is a normal design. Every cache trades freshness for speed, so decide how stale each kind of data may be and set TTLs accordingly."
  ],
  "analogy": "Think of a popular bakery. CloudFront is opening small shops in every neighborhood stocked with yesterday's bread, so nobody travels across town. API Gateway caching is the counter clerk who keeps the most-ordered loaf on the counter and hands it over without asking the kitchen. ElastiCache is a prep shelf where the bakers keep anything they like half-made. DAX is a shelf that only fits one supplier's flour. The analogy stops at freshness rules: each cache has its own TTL and invalidation method, so you must set them separately.",
  "terms": [
   [
    "API Gateway stage cache",
    "A per-stage REST API cache that returns stored integration responses for a TTL of 300 seconds by default and up to 3,600 seconds."
   ],
   [
    "Cache key",
    "The request attributes used to decide whether a cached response matches a new request."
   ],
   [
    "Time to live (TTL)",
    "How long a cached item is considered fresh before the cache fetches a new copy."
   ],
   [
    "CloudFront invalidation",
    "A request that removes objects from CloudFront edge caches before their TTL expires."
   ],
   [
    "Amazon ElastiCache",
    "A managed in-memory data store (Redis OSS, Valkey or Memcached) that application code uses as a general-purpose cache."
   ],
   [
    "DynamoDB Accelerator (DAX)",
    "An API-compatible in-memory cache for DynamoDB offering microsecond eventually consistent reads."
   ]
  ],
  "example": "A product catalog API backed by Lambda and DynamoDB gets the same GET requests thousands of times a minute. The team enables API Gateway caching on the prod stage with a 600-second TTL and the category query string parameter as a cache key, cutting Lambda invocations sharply, and adds DAX for the remaining item lookups.",
  "mistakes": [
   [
    "Adding DAX to speed up an application that relies on strongly consistent reads.",
    "Strongly consistent reads pass through DAX to DynamoDB and are not cached. DAX accelerates only eventually consistent reads."
   ],
   [
    "Enabling API Gateway caching without adding query strings that change the response to the cache key.",
    "By default the key is method and path, so different queries return the same cached response. Add every parameter or header that changes the response."
   ],
   [
    "Using CloudFront to fix a slow SQL query that every user triggers with different parameters.",
    "CloudFront helps when the same content is requested from far away. Expensive, varied database results are a job for ElastiCache inside the application."
   ],
   [
    "Allowing unauthorized cache invalidation so clients can always get fresh data.",
    "That lets anyone bypass the cache with Cache-Control: max-age=0 and load the backend. Require the execute-api:InvalidateCache permission instead."
   ]
  ],
  "tryit": [
   [
    "Ivy's company sells concert tickets worldwide. The event pages include large images and JavaScript bundles that change with each release, and users in Asia and Europe report slow page loads from an origin in one US Region. Which caching layer should she add, and how should she handle new releases?",
    "Add CloudFront in front of the S3 origin (with origin access control) to cache assets at edge locations near users. Use versioned file names for each release so new files get new URLs, rather than relying on frequent invalidations."
   ],
   [
    "A reporting service runs the same expensive multi-table join against Amazon RDS dozens of times an hour, with identical parameters, and results only need to be accurate to within five minutes. The service runs on Lambda inside a VPC. Which cache fits best?",
    "ElastiCache, using lazy loading with a TTL of about five minutes. The data comes from a relational database and a custom query, which is ElastiCache's role; DAX works only with DynamoDB, and the repeated work is inside the application rather than at the edge."
   ]
  ],
  "tip": "DAX only accelerates eventually consistent reads; strongly consistent reads bypass it. API Gateway caching is per stage with a default TTL of 300 seconds and a maximum of 3,600; include parameters that change the response in the cache key.",
  "check": [
   [
    "What happens if a query string that changes the response is not part of the API Gateway cache key?",
    "Different requests may receive the same cached response, returning wrong data to users."
   ],
   [
    "Why would DAX not help an application that uses strongly consistent reads?",
    "Strongly consistent reads are passed through to DynamoDB and not served from the DAX cache."
   ],
   [
    "How can an authorized client bypass an API Gateway cache for one request?",
    "Send the Cache-Control: max-age=0 header, which requires the execute-api:InvalidateCache permission unless the stage allows unauthorized invalidation."
   ],
   [
    "What is a better alternative to frequent CloudFront invalidations for deployed JavaScript files?",
    "Versioned file names, so each release has a new URL and old cached copies are never requested."
   ]
  ]
 }
], {"reviewed":"2026-10-06"});
