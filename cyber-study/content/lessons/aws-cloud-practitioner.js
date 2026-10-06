/* Lessons for AWS Certified Cloud Practitioner (CLF-C02): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("aws-cloud-practitioner", [
 {
  "t": "Benefits of the AWS Cloud: pay-as-you-go pricing, economies of scale, agility, elasticity and global reach",
  "hook": "It is Monday morning at Lantern Lane Books, a small online bookstore, and Priya from finance has two documents on her desk. One is a quote for six new servers, sized for the holiday rush, that would sit mostly idle for ten months of the year. The other is a note from the marketing team: they want to test a new recommendations feature next week and launch in Canada by spring. The server vendor says delivery takes five weeks. Priya's manager asks her a simple question before the budget meeting: why would moving to the cloud solve all three problems at once, and which benefit is which?",
  "simple": "The cloud means renting computers, storage and software from a company like Amazon Web Services (AWS) over the internet instead of buying your own machines. Think of it like using electricity from the power company instead of building your own generator. You pay only for what you use (pay-as-you-go). The power company can sell it cheaply because it serves millions of homes (economies of scale). You can switch on a new appliance instantly (agility). Your usage goes up when you turn on the heater and down when you turn it off, and the bill follows (elasticity). And if you open a shop in another country, the same kind of service is already available there (global reach).",
  "body": [
   "Cloud computing is the on-demand delivery of IT resources, such as servers, storage, databases, networking and software, over the internet with pay-as-you-go pricing. Instead of buying and running your own data center, you rent exactly the capacity you need from a provider like Amazon Web Services (AWS) and stop paying when you no longer need it. The AWS Certified Cloud Practitioner exam (CLF-C02) expects you to explain why a business would want that, in business terms as much as technical ones, so this lesson focuses on five benefits: pay-as-you-go pricing, economies of scale, agility, elasticity and global reach. Each one answers a different business complaint, and learning which complaint goes with which benefit is most of the work.",
   "Start with how you pay. Pay-as-you-go pricing means you pay for what you actually consume, usually measured per second, per hour, per request or per gigabyte, with no large up-front purchase and no long-term contract required. A project that fails costs you only what it used while it ran, and when you delete the resources the charges stop. In the Billing and Cost Management console you see this as line items per service, such as compute hours or gigabytes stored, rather than a single invoice for hardware. This lowers the financial risk of trying something new, because there is no stranded investment in equipment you no longer need.",
   "Next, ask why the unit price can be low. Economies of scale describe how AWS buys hardware, power and network capacity for a very large number of customers, and that aggregated usage lowers its cost per unit. A single company buying a few servers cannot negotiate the same prices or run facilities as efficiently. AWS has passed many of those savings on as price reductions over the years, which is why the exam links economies of scale to lower variable costs for you. Note the direction of the idea: economies of scale explain the price, while pay-as-you-go describes the billing model. They are related but not the same answer.",
   "Agility is about speed. In a traditional data center, getting a new server might take weeks of purchasing, shipping, racking and cabling. In AWS you can launch one in minutes from the AWS Management Console (EC2 > Instances > Launch instances) or with a single command such as `aws ec2 run-instances --image-id <ami-id> --instance-type t3.micro`. Because experiments are cheap and fast, teams can try ideas, measure them and throw away the ones that do not work. That lowers the cost and risk of innovation, which is how AWS usually frames agility. If a scenario complains that developers wait too long for environments, agility is the benefit being described.",
   "Elasticity is about capacity following demand. It is the ability to add resources when demand rises and remove them when it falls, ideally automatically. A retailer can run ten web servers on an ordinary day and sixty during a holiday sale, then shrink back, using Amazon EC2 Auto Scaling or serverless services such as AWS Lambda that scale on their own. You do not pay for idle capacity sitting around waiting for the peak, and you do not run out of capacity when the peak arrives. In the console, an Auto Scaling group's Activity tab shows each instance launched or terminated and the reason, which is elasticity made visible.",
   "Global reach is about geography. You can deploy to AWS Regions around the world in minutes, putting your application close to your users for lower latency and meeting local data residency rules without building a data center in each country. A Region is a separate geographic area that contains multiple isolated Availability Zones. Services such as Amazon CloudFront extend that reach further by caching content at edge locations near users. Importantly, your data stays in the Region you choose unless you copy or replicate it yourself, which is exactly what makes data residency possible.",
   "The exam tests the distinctions between these benefits, because the answer options are usually all real benefits and only one fits the scenario. Agility is about how quickly you can get resources and try things; elasticity is about capacity following demand up and down. Pay-as-you-go describes the billing model; economies of scale explain why the price per unit is low. Global reach is about geography and latency, not about scaling within one Region. Keep asking what the scenario is really complaining about: slow provisioning, wasted idle capacity, high unit cost or distant users.",
   "Consider a worked example. A start-up launches a photo-sharing app. It has no money for servers, so it uses pay-as-you-go services and pays only for the handful of instances and storage it uses in month one. When a celebrity shares the app, traffic jumps twentyfold for a weekend; Auto Scaling adds instances and removes them on Monday, so the bill rises only for those two days (elasticity). The team tests a new filter feature by launching a copy of the stack in minutes and deleting it after a day (agility). A year later it opens to users in Asia by deploying to a Region there (global reach), and throughout, its per-unit prices reflect AWS's economies of scale.",
   "Finally, learn the clue words. 'Pay only for what you use' or 'no up-front investment' points to pay-as-you-go. 'Lower prices because of aggregated usage across many customers' is economies of scale. 'Launch resources in minutes' or 'experiment quickly at low cost' is agility. 'Scale in and out automatically with demand' is elasticity. 'Deploy to users worldwide in minutes' or 'reduce latency for international customers' is global reach. Remember too that the cloud is not automatically cheaper: idle, oversized resources still cost money, and discounts such as Savings Plans and Reserved Instances exist for steady workloads, so pay-as-you-go is the default model rather than the only one."
  ],
  "analogy": "Using the AWS Cloud is like using a ride-hailing app instead of owning a fleet of cars. You pay per trip (pay-as-you-go), trips are cheap because the company serves huge numbers of riders (economies of scale), a car arrives in minutes (agility), you can order one car or ten depending on the size of your group (elasticity), and the same app works in many cities (global reach). The analogy stops working on data: your data does not follow you between Regions the way you carry your phone between cities. It stays where you put it unless you copy it.",
  "terms": [
   [
    "Cloud computing",
    "On-demand delivery of IT resources over the internet with pay-as-you-go pricing."
   ],
   [
    "Pay-as-you-go pricing",
    "A billing model where you pay only for the resources you consume, with no large up-front purchase."
   ],
   [
    "Economies of scale",
    "Lower cost per unit that AWS achieves by aggregating the usage of many customers, passed on as lower prices."
   ],
   [
    "Agility",
    "The ability to provision resources and experiment quickly, cutting the time from idea to working system."
   ],
   [
    "Elasticity",
    "Automatically adding and removing capacity so resources match current demand."
   ],
   [
    "Global reach",
    "The ability to deploy workloads in AWS Regions around the world in minutes to serve users with low latency."
   ],
   [
    "AWS Region",
    "A separate geographic area containing multiple isolated Availability Zones where you choose to run resources."
   ],
   [
    "Edge location",
    "A site used by services such as Amazon CloudFront to cache content close to users."
   ]
  ],
  "example": "An online ticket seller used to buy servers sized for the one day a year a major concert goes on sale, leaving them almost idle the rest of the year. After moving to AWS it runs a small fleet most days and lets Auto Scaling add capacity when a big sale opens, paying only for those extra hours. It also deployed a copy of the site in a European Region so fans there get faster page loads and their data stays in Europe.",
  "mistakes": [
   [
    "Agility and elasticity are the same thing.",
    "Agility is how fast you can provision and experiment; elasticity is capacity automatically growing and shrinking with demand. Check whether the scenario complains about slow setup or fluctuating load."
   ],
   [
    "Economies of scale is the answer whenever a question mentions paying only for what you use.",
    "Paying for consumption is pay-as-you-go. Economies of scale explains why AWS's per-unit prices are low: aggregated usage across many customers."
   ],
   [
    "The cloud is always cheaper, however you use it.",
    "Idle or oversized resources still cost money every hour. Savings come from turning things off, rightsizing and using commitment discounts for steady workloads."
   ],
   [
    "Global reach means data automatically moves between Regions.",
    "Data stays in the Region you choose unless you copy or replicate it, which is what lets you meet data residency rules."
   ]
  ],
  "tryit": [
   [
    "A charity runs a donation site that is quiet most of the year but receives a flood of visitors during one televised fundraising night. Its servers crash every year at the peak, yet sit nearly idle the other 364 days. The board asks which AWS Cloud benefit most directly addresses this. Which do you choose?",
    "Elasticity. The problem is capacity that does not follow demand: too little at the peak and too much the rest of the year. Auto Scaling or serverless services add capacity for the event and remove it afterward. Agility would fit if the complaint were slow provisioning, and global reach if visitors were far away."
   ],
   [
    "A software team says new test servers take a month to arrive, so they only try one new idea per quarter. Which benefit would change that, and why is it not elasticity?",
    "Agility. Resources can be launched in minutes and deleted when the experiment ends, so the team can try many ideas cheaply. Elasticity is about automatically matching capacity to changing load, which is not the complaint here."
   ]
  ],
  "tip": "Agility is about how fast you can provision and experiment; elasticity is about capacity automatically following demand. Look at whether the scenario complains about slow setup or about fluctuating load before choosing.",
  "check": [
   [
    "A company wants to avoid a large up-front hardware purchase and pay only for what it uses. Which benefit is this?",
    "Pay-as-you-go pricing, because costs follow actual consumption with no up-front investment."
   ],
   [
    "Why can AWS offer lower unit prices than most companies could achieve on their own?",
    "Economies of scale: aggregating usage from many customers lowers AWS's cost per unit, and it passes savings on as lower prices."
   ],
   [
    "A developer can launch a test environment in minutes and delete it the same day. Which benefit does this show?",
    "Agility, the ability to provision and experiment quickly and cheaply."
   ],
   [
    "An application needs to serve users in several continents with low latency. Which benefit applies?",
    "Global reach, because you can deploy to Regions close to those users in minutes."
   ]
  ]
 },
 {
  "t": "The six advantages of cloud computing, including trading fixed expense for variable expense and no longer guessing capacity",
  "hook": "Daniel is the new IT manager at Cedar Ridge Credit Union, and the chief financial officer has just forwarded him an invoice: a storage array bought three years ago for a growth spurt that never came, now half empty and due for a costly maintenance renewal. In the same email she asks why the team spent last weekend replacing failed disks instead of finishing the mobile app. She wants a one-page answer by Friday: what exactly would change if Cedar Ridge moved to the cloud? Daniel knows AWS has a well-known list for this. The question is whether he can name each advantage precisely enough to match it to her complaints.",
  "simple": "AWS sums up why companies move to the cloud with six short reasons. In plain words: you stop buying expensive machines up front and pay monthly for what you use instead. Prices are low because AWS buys in bulk for many customers. You no longer have to guess how much equipment you will need next year. New servers arrive in minutes instead of weeks. You stop spending time and money on the boring work of running a server room. And you can serve customers in other countries quickly. It is like switching from owning a delivery van to using a courier service: no big purchase, no repairs, and you pay per package.",
  "body": [
   "AWS summarizes the business case for the cloud as six advantages of cloud computing. They appear in AWS whitepapers and training material, and the exam often quotes them almost word for word, so it pays to know the exact phrases and what each one means in practice. Think of them as the answer to a manager who asks, 'Why should we stop running our own data center?' Each advantage answers a different part of that question, from accounting to geography.",
   "The first advantage is to trade fixed expense for variable expense. Instead of investing heavily in data centers and servers before you know how you will use them, a capital expense (CapEx), you pay only when you consume computing resources, an operational expense (OpEx). The money that would have been locked into equipment stays available for the business, and a project that is canceled leaves no stranded hardware behind. The second advantage is to benefit from massive economies of scale. Because usage from many customers is aggregated, AWS can achieve lower variable costs than you could on your own, and it passes savings on as lower pay-as-you-go prices.",
   "The third advantage is to stop guessing capacity. On premises you must predict demand months or years ahead, and you either overbuy and waste money on idle equipment or underbuy and suffer slowdowns and outages when demand exceeds your forecast. In the cloud you can scale up and down within minutes as demand actually arrives, so the forecast stops being a high-stakes bet. The fourth advantage is to increase speed and agility. New resources are a click or an application programming interface (API) call away, so the time to make them available to developers drops from weeks to minutes, and teams can experiment far more often.",
   "The fifth advantage is to stop spending money running and maintaining data centers. Racking, stacking, powering and cooling servers is undifferentiated heavy lifting: work every company must do but that does not make its product better than a competitor's. Moving it to AWS lets you focus on your customers and your own applications. The sixth advantage is to go global in minutes. You can deploy to multiple Regions around the world with a few clicks and give users lower latency at minimal cost, without building or leasing a facility in each country.",
   "It helps to see how these connect to real tools. Stopping capacity guessing is delivered by Auto Scaling groups, which keep a desired number of instances and adjust it based on a metric such as average CPU. Variable expense shows up in the Billing and Cost Management console, where charges appear per service and per hour of use rather than as a single purchase order. Going global is simply choosing another Region in the console's Region selector or passing `--region eu-west-1` to an AWS Command Line Interface (CLI) command. None of these steps involve signing a purchase order or waiting for a delivery, which is the practical difference you will feel in labs.",
   "The distinctions the exam tests are subtle because several advantages overlap, and two of them mention cost. 'Trade fixed expense for variable expense' is about the accounting model: CapEx becomes OpEx. 'Economies of scale' is about why the price per unit is low. 'Stop guessing capacity' is about forecasting and wasted or insufficient capacity. 'Increase speed and agility' is about time to provision. 'Stop spending money running data centers' is about the physical work you no longer do. 'Go global in minutes' is about geography. When two seem to fit, find the noun the scenario complains about: the purchase, the price, the forecast, the wait, the hardware chores or the distance.",
   "Consider a worked example. A regional bank plans a new mobile banking service. On premises it would need to buy servers for the projected peak three years out, sign a data center lease and hire staff for hardware maintenance. On AWS it starts small and pays monthly (fixed to variable expense), lets Auto Scaling handle payday peaks (stop guessing capacity), has developers launch test environments the same afternoon (speed and agility), leaves hardware refresh to AWS (stop running data centers) and later adds a Region for customers abroad (go global). Its per-hour prices reflect AWS's aggregated purchasing (economies of scale).",
   "Watch for distractors and overstatements. Plausible-sounding advantages that are not on the list include 'eliminate all security responsibility' and 'guarantee zero downtime'. The cloud reduces infrastructure work, but it never removes the customer's security responsibilities, and no design guarantees perfect uptime. Also, the cloud does not make every cost variable: commitments such as Reserved Instances and Savings Plans trade some flexibility for a discount, which you will study in the billing domain, but the default model is variable, usage-based spending.",
   "Exam questions usually describe a situation and ask which advantage it illustrates. 'Tired of buying servers for a peak that never comes' or 'over-provisioned hardware sits idle' means stop guessing capacity. 'Avoid large up-front hardware purchases' or 'convert capital expense to operating expense' means trade fixed expense for variable expense. 'Engineers should work on features rather than replacing failed disks' means stop spending money running and maintaining data centers. 'Lower pay-as-you-go prices due to aggregated usage' is economies of scale."
  ],
  "analogy": "Moving to the cloud is like a restaurant switching from owning its own farm to buying from a large wholesale market. It stops paying for land up front (fixed to variable expense), gets lower prices because the market buys for thousands of restaurants (economies of scale), orders more on busy nights instead of planting for a guess (stop guessing capacity), gets new ingredients the same day (speed), stops repairing tractors (no data center upkeep) and can open a branch in another city that has its own market (go global). The analogy stops at responsibility: the restaurant still has to cook safely, just as you still secure your own workloads.",
  "mnemonic": "The six advantages in AWS's usual order: Trade fixed for variable, Economies of scale, stop Guessing capacity, Speed and agility, stop running Data centers, Go global. 'Tom Eats Grapes So Dan Grins.'",
  "terms": [
   [
    "Capital expense (CapEx)",
    "Money spent up front on long-lived physical assets such as servers and data centers."
   ],
   [
    "Operational expense (OpEx)",
    "Ongoing spending on services as they are consumed, such as a monthly cloud bill."
   ],
   [
    "Variable expense",
    "A cost that rises and falls with actual usage instead of being fixed in advance."
   ],
   [
    "Undifferentiated heavy lifting",
    "Necessary infrastructure work, such as racking and powering servers, that does not set a business apart from competitors."
   ],
   [
    "Capacity planning",
    "Forecasting how much computing capacity will be needed; in the cloud, scaling on demand replaces much of the guesswork."
   ],
   [
    "Auto Scaling group",
    "A set of EC2 instances that AWS grows or shrinks automatically to match a target such as average CPU utilization."
   ]
  ],
  "example": "A university runs course registration twice a year, when load is fifty times normal. It used to keep enough servers for that peak all year, most of them idle. On AWS it runs a small baseline and lets Auto Scaling add instances during registration week, turning a large hardware purchase every few years into a modest monthly bill that rises only when students are actually registering.",
  "mistakes": [
   [
    "Choosing 'benefit from massive economies of scale' whenever a scenario mentions saving money.",
    "If the saving comes from no longer buying for a forecast peak, the answer is stop guessing capacity. Economies of scale is specifically about lower unit prices from AWS aggregating many customers' usage."
   ],
   [
    "Picking an advantage such as 'eliminate security responsibilities' or 'guarantee 100 percent uptime'.",
    "Neither is one of the six advantages. Customers always keep security responsibilities, and no architecture guarantees perfect uptime."
   ],
   [
    "Believing the cloud makes every cost variable.",
    "Variable, usage-based spending is the default, but commitment options such as Savings Plans and Reserved Instances exist and trade flexibility for a discount."
   ],
   [
    "Treating 'trade fixed expense for variable expense' as a pricing discount.",
    "It describes an accounting shift from up-front capital expense to operational expense paid as you consume, not a lower price."
   ]
  ],
  "tryit": [
   [
    "A hospital's IT team spends two days each month swapping failed drives, updating firmware and fixing air conditioning in its server room. The director wants that team building patient-facing apps instead. Which of the six advantages does moving to AWS address most directly?",
    "Stop spending money running and maintaining data centers. The complaint is about undifferentiated heavy lifting, the physical upkeep that does not improve the hospital's services. AWS takes over that work so the team can focus on applications."
   ],
   [
    "A retailer bought servers for projected growth that did not happen, and 70 percent of the capacity sits idle. The finance team also dislikes the large up-front purchase. Two advantages seem to apply. Which one targets the idle capacity specifically?",
    "Stop guessing capacity. The idle equipment is the result of a forecast that was wrong; in the cloud capacity is added as demand arrives. Trade fixed for variable expense addresses the up-front purchase, which is a separate complaint."
   ]
  ],
  "tip": "Memorize the six phrases exactly. Distractors that sound plausible, such as 'eliminate security responsibilities' or 'guarantee 100 percent uptime', are not advantages of cloud computing.",
  "check": [
   [
    "A company over-provisioned servers for a traffic peak that never arrived. Which advantage addresses this?",
    "Stop guessing capacity, because you can scale up and down as real demand arrives."
   ],
   [
    "What does 'trade fixed expense for variable expense' mean in accounting terms?",
    "Moving from up-front capital expense on hardware to operational expense paid as resources are consumed."
   ],
   [
    "Which advantage explains why AWS can charge lower variable costs than a company achieves on its own?",
    "Benefit from massive economies of scale, because AWS aggregates usage from many customers."
   ],
   [
    "A team wants engineers to stop replacing failed disks and focus on product features. Which advantage is this?",
    "Stop spending money running and maintaining data centers, removing undifferentiated heavy lifting."
   ]
  ]
 },
 {
  "t": "High availability, fault tolerance, scalability and elasticity: what each term means and how AWS delivers it",
  "hook": "At 2:10 a.m. Maya, on call for Brightpath Tutoring, gets a page: the student portal is down during final exam week. The cause is almost embarrassing. Every web server and the database live in a single Availability Zone, and that zone has a power problem. By morning the director wants a redesign, and the proposal lands on Maya's desk with four words circled: highly available, fault tolerant, scalable, elastic. A vendor promised all four. Maya suspects they do not mean the same thing, and that the difference will decide how much the fix costs. Which one does Brightpath actually need?",
  "simple": "These four words describe how well a system copes with problems and with crowds. High availability means it stays usable almost all the time, even if it hiccups for a moment when something breaks. Fault tolerance is stronger: something breaks and users notice nothing at all, because a spare was already running. Scalability means the system can grow to handle more users. Elasticity means it grows and shrinks by itself as the crowd comes and goes. Picture a store: high availability is having a second checkout you can open quickly, fault tolerance is two cashiers always working so one can step away without a pause, scalability is being able to add checkouts, and elasticity is opening and closing them automatically as lines change.",
  "body": [
   "High availability, fault tolerance, scalability and elasticity sound similar, and the exam deliberately uses them as distractors for each other. Learning a precise definition and the AWS feature behind each one earns easy points. Before starting, recall the building blocks: an AWS Region is a geographic area, and each Region contains multiple Availability Zones (AZs), which are one or more discrete data centers with independent power, cooling and networking, connected to each other with low-latency links. Because AZs are isolated from each other's failures, spreading resources across them is the foundation of most resilient designs on AWS.",
   "High availability means a system stays up and usable most of the time, with minimal downtime, even when individual components fail. It usually tolerates a brief interruption while traffic moves to healthy resources. In AWS you achieve it by running resources in more than one AZ and placing an Elastic Load Balancing (ELB) load balancer in front of them, so health checks send traffic only to healthy targets. Amazon Relational Database Service (Amazon RDS) with a Multi-AZ deployment keeps a standby in another AZ and fails over to it automatically, typically within a minute or two. During that window, connections drop and applications reconnect, which is why it is described as high availability rather than fault tolerance.",
   "Fault tolerance is a stricter idea. The system keeps operating with no interruption and no loss of data when a component fails, because redundant components are already doing the work. Think of an aircraft with multiple engines: losing one does not make the plane stop flying. Fault tolerance usually costs more because you pay for fully redundant capacity all the time, not just a standby waiting to take over. Many AWS managed services are built this way internally. For example, Amazon Simple Storage Service (Amazon S3) stores objects redundantly across multiple AZs in a Region, so the loss of a device or even a facility does not lose your data.",
   "Scalability is the ability of a system to handle more load by adding resources. You can scale vertically (scale up) by moving to a bigger instance with more CPU and memory, or horizontally (scale out) by adding more instances. Horizontal scaling is generally preferred in the cloud because there is no ceiling set by a single machine, and spreading work across several instances also improves availability. Vertical scaling is simple but limited, and resizing an Amazon Elastic Compute Cloud (Amazon EC2) instance generally requires stopping and starting it.",
   "Elasticity is scalability that happens automatically in both directions, growing and shrinking with demand, so you pay only for what the current load needs. Amazon EC2 Auto Scaling, AWS Lambda and Amazon DynamoDB on-demand capacity are all elastic. The key words are automatic and two-way: a system that can grow only when an engineer manually adds servers is scalable but not elastic, and a system that grows but never shrinks wastes money once the peak has passed.",
   "Here is how the pieces fit in a typical web tier. An Auto Scaling group spans two or three AZs with a minimum, desired and maximum instance count, and a target tracking policy keeps average CPU near a value you choose. The load balancer registers new instances as they launch and stops sending traffic to any that fail health checks, and the group replaces failed instances automatically. That one design delivers high availability (multiple AZs), elasticity (automatic scale out and in) and a measure of self-healing. You can watch it happen in the console under EC2 > Auto Scaling groups > Activity, where each launch and termination is listed with its reason, such as a health check failure or an alarm crossing its threshold.",
   "Consider a worked example. A news site runs four instances in one AZ. When that AZ has a power problem, the site goes down, so it is neither highly available nor fault tolerant. The team moves to an Auto Scaling group across three AZs behind an Application Load Balancer and switches the database to RDS Multi-AZ. Now an AZ failure causes at most a short blip while the database fails over (high availability), and breaking news traffic triggers extra instances that are removed at night (elasticity). If the business later decides even that blip is unacceptable for a particular component, it would need fully redundant, always-active capacity, which is the more expensive path to fault tolerance.",
   "Several misunderstandings appear again and again. Calling Multi-AZ RDS fault tolerant is a common slip, since it involves a short failover; it is usually described as high availability. Assuming vertical scaling is elastic is another, because resizing an instance is neither automatic nor two-way by default. Treating scalability and elasticity as identical misses the automatic part. And thinking a single large instance is highly available because it is powerful ignores the fact that one instance in one AZ is a single point of failure however big it is.",
   "Exam wording gives the answer away. 'No downtime at all' or 'continues operating without interruption when a component fails' points to fault tolerance. 'Minimal downtime' or 'remains accessible if an AZ fails' points to high availability, usually multiple AZs plus a load balancer. 'Can handle growth by adding resources' is scalability. 'Automatically adds and removes capacity based on demand' is elasticity. 'Upgrade to a larger instance' is vertical scaling, and 'add more instances' is horizontal scaling."
  ],
  "analogy": "Think of a two-lane bridge. High availability is having a second bridge nearby: if one closes, traffic is redirected after a short delay. Fault tolerance is a bridge with extra lanes always open, so a blocked lane causes no slowdown at all. Scalability is the ability to add lanes, and elasticity is lanes that open and close automatically as rush hour comes and goes. The analogy weakens on cost: in AWS, elastic capacity you are not using is simply not billed, while a real bridge's unused lanes still cost money to maintain.",
  "terms": [
   [
    "Availability Zone (AZ)",
    "One or more discrete data centers in a Region with independent power, cooling and networking."
   ],
   [
    "High availability",
    "Design that keeps a system accessible with minimal downtime when components fail, often with a brief failover."
   ],
   [
    "Fault tolerance",
    "Design that keeps a system running with no interruption or data loss when a component fails, using fully redundant components."
   ],
   [
    "Scalability",
    "The ability to handle more load by adding resources, vertically (bigger) or horizontally (more)."
   ],
   [
    "Elasticity",
    "Scaling that happens automatically in both directions so capacity matches demand."
   ],
   [
    "Elastic Load Balancing (ELB)",
    "A service that spreads incoming traffic across healthy targets in multiple AZs."
   ],
   [
    "Multi-AZ deployment",
    "An Amazon RDS option that keeps a synchronous standby in another AZ and fails over automatically."
   ],
   [
    "Single point of failure",
    "A component whose failure takes down the whole system because nothing else can take over."
   ]
  ],
  "example": "An online learning platform ran its application and database on one EC2 instance. After an outage during exam week, it moved the web tier into an Auto Scaling group across three AZs behind a load balancer and migrated the database to Amazon RDS with Multi-AZ. The next AZ disruption caused a short database failover that most students never noticed, and the fleet now grows during exam weeks and shrinks during holidays.",
  "mistakes": [
   [
    "RDS Multi-AZ is fault tolerant.",
    "Multi-AZ fails over to a standby, which causes a brief interruption, so it is normally described as high availability. Fault tolerance means no interruption at all."
   ],
   [
    "Moving to a bigger instance makes the system elastic.",
    "That is vertical scaling. It is usually manual and requires a stop and start. Elasticity means capacity is added and removed automatically as demand changes."
   ],
   [
    "A very powerful single instance is highly available.",
    "One instance in one AZ is a single point of failure regardless of size. High availability needs redundancy across AZs, typically behind a load balancer."
   ],
   [
    "Scalability and elasticity are interchangeable.",
    "Scalability is the ability to grow; elasticity adds automatic growth and shrinkage. All elastic systems are scalable, but not all scalable systems are elastic."
   ]
  ],
  "tryit": [
   [
    "A payroll company's web application runs on three EC2 instances, all in one Availability Zone, behind a load balancer. Management says brief interruptions are acceptable, but the site must stay reachable if a whole AZ fails. What single change best meets the requirement?",
    "Spread the instances across at least two AZs, for example with an Auto Scaling group that spans multiple AZs behind the load balancer. That provides high availability. Bigger instances would not help, because the AZ remains a single point of failure, and full fault tolerance is more than the stated requirement."
   ],
   [
    "A team says its system is elastic because an engineer can log in and add servers within ten minutes when traffic spikes. Is that correct?",
    "No. That system is scalable, but elasticity requires capacity to be added and removed automatically in response to demand, for example with EC2 Auto Scaling and a target tracking policy."
   ]
  ],
  "tip": "'No interruption at all' means fault tolerance; 'minimal downtime' or 'survives an AZ failure' means high availability. 'Automatically adds and removes capacity' is elasticity, which is more specific than scalability.",
  "check": [
   [
    "What is the difference between high availability and fault tolerance?",
    "High availability minimizes downtime and may allow a short failover; fault tolerance keeps operating with no interruption because redundant components are already running."
   ],
   [
    "Is moving to a larger EC2 instance type horizontal or vertical scaling?",
    "Vertical scaling (scaling up), because you give one instance more CPU and memory rather than adding instances."
   ],
   [
    "Which AWS design makes a web tier highly available?",
    "Running instances in multiple Availability Zones behind an Elastic Load Balancing load balancer with health checks."
   ],
   [
    "What makes elasticity different from plain scalability?",
    "Elasticity adjusts capacity automatically in both directions, adding and removing resources as demand changes."
   ]
  ]
 },
 {
  "t": "AWS Well-Architected Framework: the six pillars and what each one is responsible for",
  "hook": "Rosa has just joined Fernwood Outfitters as a cloud engineer, and her first meeting is a list of complaints about the online store. The site went down when one data center had trouble. Nobody can tell which team owns half the bill. Product pages load slowly on old instance types. A shared administrator password is taped inside a drawer. And the sustainability committee wants to know how much energy the test servers burn overnight. Her manager slides over a printout titled 'Well-Architected Framework' and says, 'Sort these into the right pillars and tell me where to start.' Can you sort them?",
  "simple": "The AWS Well-Architected Framework is a checklist of good habits for building things in the cloud, grouped into six areas called pillars. Each pillar asks a different question. Operational excellence: do we run and improve the system well? Security: is it protected? Reliability: does it keep working and recover when something breaks? Performance efficiency: are we using the right kind and size of resources so it runs fast? Cost optimization: are we wasting money? Sustainability: are we wasting energy and resources? It is like inspecting a house: one inspector checks the locks, another the foundation, another the plumbing's efficiency, another the energy bills. Each looks at the same house from a different angle.",
  "body": [
   "The AWS Well-Architected Framework is a set of design principles, best practices and review questions that help you build and evaluate workloads in the cloud. A workload is a collection of resources and code that delivers business value, such as a customer-facing website or a data pipeline. The framework is organized into six pillars: operational excellence, security, reliability, performance efficiency, cost optimization and sustainability. On the exam you will be given a goal or practice and asked which pillar it belongs to, so learn each pillar's focus and a few typical practices, and pay special attention to where neighboring pillars overlap.",
   "Operational excellence is about running and monitoring systems to deliver business value and continually improving processes and procedures. Its practices include performing operations as code, making frequent, small, reversible changes, refining operations procedures often, anticipating failure and learning from operational events. In practice that looks like deployment pipelines instead of manual changes, runbooks stored alongside code, dashboards that show the health of the business process, and post-incident reviews that focus on fixing the process rather than blaming a person.",
   "Security is about protecting data, systems and assets. Its practices include implementing a strong identity foundation with least privilege, enabling traceability through logging and monitoring, applying security at all layers, automating security best practices, protecting data in transit and at rest, keeping people away from data and preparing for security events. On AWS that means things like individual identities instead of shared logins, AWS CloudTrail recording API activity, encryption of stored data and an incident response plan that has actually been rehearsed.",
   "Reliability is about a workload performing its intended function correctly and consistently, including recovering from failures and meeting demand. Practices include automatically recovering from failure, testing recovery procedures, scaling horizontally to increase aggregate workload availability, stopping guessing capacity and managing change through automation. Running across multiple Availability Zones (AZs), restoring backups as a regular test and letting Auto Scaling replace failed instances are all reliability practices.",
   "Performance efficiency is about using computing resources efficiently to meet requirements as demand changes and technology evolves. Its practices include democratizing advanced technologies by using managed services, going global in minutes, using serverless architectures, experimenting more often and choosing the right resource type for the job, sometimes described as mechanical sympathy. Switching a compute-heavy job to a newer instance family, or moving image resizing to AWS Lambda so it scales with uploads, are typical examples.",
   "Cost optimization is about delivering business value at the lowest price point. Its practices include implementing cloud financial management, adopting a consumption model, measuring overall efficiency, stopping spending money on undifferentiated heavy lifting, and analyzing and attributing expenditure, for example with cost allocation tags. Sustainability, the most recently added pillar, is about minimizing the environmental impact of running cloud workloads: understanding your impact, establishing sustainability goals, maximizing utilization, anticipating and adopting new, more efficient hardware and software offerings, using managed services and reducing the downstream impact of your cloud workloads.",
   "The distinctions the exam cares about come from pillars that overlap. Reliability is about recovering from failure and meeting demand; performance efficiency is about picking the right resources so the workload is fast and efficient. Cost optimization is about money; sustainability is about energy and resource use, even though the same actions, such as removing idle resources and rightsizing, often help both. Operational excellence is about how you run and improve the workload, such as runbooks, deployments and learning from incidents, while security covers identity, detection, data protection and incident response. When a practice could fit two pillars, look at the stated goal: faster, cheaper, greener, safer, more resilient or better run.",
   "Consider a worked example. An online store asks you to classify six improvements. Enabling AWS CloudTrail in every account and alerting on root sign-ins is security (traceability). Adding a second AZ and testing database failover is reliability. Moving image resizing to AWS Lambda so it scales with uploads and switching to a newer instance family is performance efficiency. Tagging resources by team and reviewing a monthly cost report is cost optimization. Deploying through a pipeline with small changes that can be rolled back is operational excellence, and scheduling development instances to stop overnight to cut energy use is sustainability.",
   "A few more points round out the picture. The framework is guidance, not a certification or a compliance standard. AWS also publishes lenses that extend it for specific technologies or industries, and you review workloads against it with the AWS Well-Architected Tool. The pillars involve trade-offs: adding a third AZ improves reliability but raises cost, and the framework asks you to make those trade-offs deliberately rather than by accident. On exam questions, 'recover automatically from an AZ failure' is reliability, 'choose the right instance type to meet performance needs' is performance efficiency, 'choose the right size to stop paying for unused capacity' is cost optimization, and 'minimize environmental impact' is sustainability."
  ],
  "analogy": "The six pillars are like the six people who would inspect a new restaurant. The manager checks how smoothly shifts run and improve (operational excellence), the security guard checks locks and cameras (security), the engineer checks the backup generator (reliability), the chef checks that the kitchen has the right equipment for the menu (performance efficiency), the accountant checks for waste (cost optimization) and the environmental officer checks energy and food waste (sustainability). Where it breaks down: in the cloud, one change, such as turning off idle servers, can satisfy the accountant and the environmental officer at once.",
  "mnemonic": "The six pillars, in any order: SPORCS. Security, Performance efficiency, Operational excellence, Reliability, Cost optimization, Sustainability. If you can only recall five, the forgotten one is usually the final S, sustainability.",
  "terms": [
   [
    "AWS Well-Architected Framework",
    "AWS guidance of design principles, best practices and questions for building and reviewing cloud workloads."
   ],
   [
    "Workload",
    "A set of components that together deliver business value, such as an application and its data stores."
   ],
   [
    "Operational excellence pillar",
    "Running and monitoring systems and continually improving processes and procedures."
   ],
   [
    "Security pillar",
    "Protecting data, systems and assets through identity, traceability, data protection and incident response."
   ],
   [
    "Reliability pillar",
    "Ensuring a workload performs correctly and consistently and recovers from failures."
   ],
   [
    "Performance efficiency pillar",
    "Using the right resources efficiently as demand changes and technology evolves."
   ],
   [
    "Cost optimization pillar",
    "Delivering business value at the lowest price point."
   ],
   [
    "Sustainability pillar",
    "Minimizing the environmental impact of running cloud workloads."
   ]
  ],
  "example": "A media company reviewing its video platform finds it runs in one AZ, has no tested backups and uses instance types chosen five years ago. It adds a second AZ and practices restores (reliability), moves transcoding to a managed service sized per job (performance efficiency), and tags every resource by product so finance can see who spends what (cost optimization). Turning off idle test clusters at night reduces both the bill and energy use (cost optimization and sustainability).",
  "mistakes": [
   [
    "There are five pillars.",
    "There are six. Sustainability was added more recently, and older study material that lists five is out of date for CLF-C02."
   ],
   [
    "'Test recovery procedures' belongs to operational excellence.",
    "It is a reliability practice, because reliability covers recovering from failure. Operational excellence focuses on how you run, change and improve operations."
   ],
   [
    "Choosing a newer, faster instance type is cost optimization.",
    "When the goal is speed and efficient use of resources, it is performance efficiency. It becomes cost optimization when the stated goal is to stop paying for unused capacity."
   ],
   [
    "The Well-Architected Framework is a compliance certification.",
    "It is guidance and a set of best-practice questions. No one is certified against it, and following it does not by itself make a workload compliant with any regulation."
   ]
  ],
  "tryit": [
   [
    "A streaming company finds that its development environments run 24 hours a day although engineers use them only during business hours. Leadership has announced a goal to reduce the company's carbon footprint and asks which pillar this improvement supports. The finance team says it is theirs. Who is right?",
    "Both pillars benefit, but the stated goal, reducing environmental impact, points to sustainability. Stopping idle resources also lowers cost, which is why it appears under cost optimization too. On the exam, follow the goal named in the question."
   ],
   [
    "After an outage, a team writes a blameless post-incident review and updates its runbook so the same mistake is caught automatically next time. Which pillar does this practice belong to?",
    "Operational excellence. Learning from operational events and refining procedures are core operational excellence practices. The outage itself might reveal reliability gaps, but the practice described is improving how the team operates."
   ]
  ],
  "tip": "There are six pillars; sustainability is the one people forget. Separate reliability (recover and meet demand) from performance efficiency (right resources for speed), and cost optimization (money) from sustainability (environmental impact).",
  "check": [
   [
    "Which pillar includes the practice 'test recovery procedures'?",
    "Reliability, because it is about recovering from failures and performing consistently."
   ],
   [
    "Which pillar focuses on least privilege and traceability?",
    "Security, which covers identity, logging and monitoring, and data protection."
   ],
   [
    "A company wants to minimize the energy its workloads consume. Which pillar is this?",
    "Sustainability, which targets the environmental impact of cloud workloads."
   ],
   [
    "Selecting a newer instance family to run a compute-heavy job faster fits which pillar?",
    "Performance efficiency, which is about choosing the right resources for the job as technology evolves."
   ]
  ]
 },
 {
  "t": "Cloud design principles: loose coupling, designing for failure, automation and operations as code",
  "hook": "It is the evening of the spring sale at Thistle and Pine, a home goods shop, and Omar on the platform team watches the order page spin. The web servers are fine, but they wait on the payment and inventory service, and that service is drowning. Every slow call makes the web tier slower, until customers see errors. Meanwhile his colleague is trying to build an emergency copy of the environment by hand from a wiki page that was last updated a year ago. Two weeks later, in the post-incident review, someone asks the question that matters: how should this have been designed so that one slow part could not take everything else down?",
  "simple": "Cloud design principles are rules of thumb for building systems that keep working when things go wrong. Loose coupling means parts of a system pass work through a middle step, like a mailbox, instead of waiting on each other directly, so one slow part does not freeze the rest. Designing for failure means assuming things will break and planning automatic recovery. Automation means letting the system do routine fixes and scaling itself. Operations as code means writing your setup down as files a computer can follow exactly, so you can rebuild it the same way every time. Think of a restaurant: orders go on a ticket rail (loose coupling), there is a backup oven (design for failure), and the recipes are written down so any cook gets the same result (operations as code).",
  "body": [
   "Beyond the six Well-Architected pillars, AWS teaches a handful of general design principles for cloud architectures. They explain why cloud designs look different from traditional data center designs: in the cloud, resources are cheap to create and destroy, failures are expected, and almost everything can be controlled through an application programming interface (API). The Cloud Practitioner exam checks that you recognize these principles and can pick the architecture that follows them, so focus on the problem each principle solves.",
   "Loose coupling means components interact through well-defined interfaces and do not depend directly on each other's availability or timing. If a web tier calls an order-processing tier directly and the processing tier slows down, the web tier slows down or fails too; that is tight coupling. If instead the web tier puts orders on an Amazon Simple Queue Service (Amazon SQS) queue and the processing tier reads from it, either side can scale, fail or be replaced without breaking the other, and the queue absorbs sudden spikes. Load balancers, queues, notifications through Amazon Simple Notification Service (Amazon SNS) and events through Amazon EventBridge are the typical tools for decoupling. The commands below show the shape of the pattern: the producer hands off work and moves on, and the consumer pulls work when it is ready.",
   "```\n# Producer (web tier) drops an order on the queue and returns immediately\naws sqs send-message --queue-url <queue-url> --message-body '{\"orderId\": 1042}'\n\n# Consumer (worker tier) pulls work when it is ready\naws sqs receive-message --queue-url <queue-url>\n```",
   "It is worth being precise about SQS and SNS, because the exam pairs them as distractors. SQS is a queue: messages wait until a consumer polls for them and processes them, which makes it ideal for buffering work between tiers. SNS is publish and subscribe: a message published to a topic is pushed to every subscriber at once, such as an email address, an SQS queue or a Lambda function, which makes it ideal for fan-out. Loose coupling does not mean components stop talking to each other; they still communicate, just through a buffer or interface instead of a direct, blocking call.",
   "Designing for failure starts from the assumption that everything fails eventually: disks, instances, network links, even whole data centers. Rather than hoping nothing breaks, you build in redundancy and automatic recovery. Run across multiple Availability Zones (AZs), avoid single points of failure, keep backups and test that you can restore them, and use health checks so failed resources are replaced automatically. A related idea is to treat servers as disposable resources rather than fixed ones: if an instance misbehaves, terminate it and let automation launch a fresh, identical one instead of repairing it by hand. Designing for failure is not about buying more reliable hardware; it is about expecting failure and recovering without human heroics.",
   "Automation removes slow, error-prone manual steps. EC2 Auto Scaling adds and removes capacity, health checks replace failed instances, and Amazon CloudWatch alarms trigger actions when a metric crosses a threshold. Operations as code, closely related to infrastructure as code (IaC), means defining your infrastructure and operational procedures in files that can be version-controlled, reviewed and run repeatedly. AWS CloudFormation is the main AWS example: you describe the resources you want in a template written in JSON or YAML, then run something like `aws cloudformation deploy --template-file network.yaml --stack-name prod-network`, and CloudFormation creates the same resources the same way every time as a stack. The AWS Cloud Development Kit (AWS CDK) lets you define the same thing in a familiar programming language. A manually built environment is not repeatable just because someone wrote down the steps; a template is.",
   "Consider a worked example. A photo site processes uploads on the same servers that serve web pages, so a burst of uploads makes the site slow for everyone. The redesign stores uploads in Amazon S3, sends a message to an SQS queue for each one, and runs a separate Auto Scaling group of workers that scales on the queue's length. The web tier stays fast because it only enqueues work (loose coupling), the worker fleet can lose an instance without losing messages because unprocessed messages stay in the queue (design for failure), and the whole stack is defined in a CloudFormation template so a test copy can be created in minutes (operations as code).",
   "Other principles you may see alongside these include using managed services instead of running software yourself, thinking in parallel, and making frequent, small, reversible changes. They share a theme: let AWS and automation carry the repetitive work, and keep each change small enough that a failure is easy to undo.",
   "Exam questions usually ask which architecture is most resilient or easiest to scale, and the right answer is typically the one that is decoupled, spread across AZs and automated. 'Decouple components' or 'buffer requests between tiers' points to Amazon SQS. 'Fan out a message to multiple subscribers' points to Amazon SNS. 'Provision identical environments repeatedly' or 'infrastructure as code' points to AWS CloudFormation. 'Replace unhealthy instances automatically' points to Auto Scaling with health checks. 'Single point of failure' in the question means the current design violates designing for failure."
  ],
  "analogy": "A loosely coupled system works like a busy diner's ticket rail. Servers clip orders to the rail and go back to customers; cooks take tickets when they are ready. If the kitchen falls behind, tickets pile up on the rail, but the dining room keeps taking orders. In a tightly coupled diner, the server would stand at the stove waiting for each dish. The analogy has a limit: a real rail can overflow, while an SQS queue is a managed service built to hold large backlogs, though messages are kept only for a limited retention period you can configure.",
  "terms": [
   [
    "Loose coupling",
    "Designing components to interact through interfaces or buffers so a failure or slowdown in one does not break the others."
   ],
   [
    "Amazon SQS",
    "A managed message queue that stores messages until a consumer retrieves and processes them."
   ],
   [
    "Amazon SNS",
    "A managed publish and subscribe service that pushes messages to many subscribers at once."
   ],
   [
    "Design for failure",
    "Assuming components will fail and building in redundancy and automatic recovery."
   ],
   [
    "Disposable resources",
    "Treating servers as replaceable units that are terminated and relaunched instead of repaired by hand."
   ],
   [
    "Infrastructure as code (IaC)",
    "Defining infrastructure in version-controlled template or code files that can be deployed repeatedly."
   ],
   [
    "AWS CloudFormation",
    "An AWS service that creates and manages resources from JSON or YAML templates as stacks."
   ]
  ],
  "example": "A payments start-up built its staging environment by hand, and it never quite matched production, so bugs slipped through. It rewrote both environments as CloudFormation templates stored in Git. Now every change is reviewed as a code change, staging and production are created from the same template, and a broken environment can be deleted and recreated in minutes instead of being patched by hand.",
  "mistakes": [
   [
    "Loose coupling means components do not communicate.",
    "They still communicate, but through a buffer or well-defined interface such as a queue, topic or load balancer, so neither side depends on the other's timing or availability."
   ],
   [
    "SQS and SNS do the same job.",
    "SQS holds messages in a queue until a consumer pulls them; SNS pushes each published message to many subscribers at once. Buffering points to SQS, fan-out points to SNS."
   ],
   [
    "Designing for failure means buying more reliable hardware.",
    "It means assuming failure will happen and building redundancy across AZs, health checks and automatic replacement so the system recovers on its own."
   ],
   [
    "A documented manual build process is infrastructure as code.",
    "Written instructions still depend on people following them exactly. IaC uses templates or code, such as CloudFormation, that a service executes the same way every time."
   ]
  ],
  "tryit": [
   [
    "A ticketing site's checkout page calls a fraud-checking service directly. When the fraud service slows down during a big on-sale event, checkout pages time out even though the web servers are healthy. The architect wants the web tier to accept orders quickly and let fraud checks catch up. Which AWS service and principle fit best?",
    "Amazon SQS, applying loose coupling. The web tier places each order on a queue and returns immediately, and the fraud-checking workers process messages at their own pace, scaling on queue length. SNS would push messages to subscribers but is not designed to buffer work for a slower consumer."
   ],
   [
    "An operations team fixes misbehaving web servers by logging in and editing configuration files by hand, and each server has slowly become slightly different. Which principle would you recommend, and what would change?",
    "Treat servers as disposable resources and use automation and operations as code. Define the server configuration in a template or launch configuration, let Auto Scaling replace unhealthy instances with fresh identical ones, and stop hand-editing live servers."
   ]
  ],
  "tip": "Decouple tiers or absorb spikes between them with Amazon SQS; provision identical environments repeatedly with AWS CloudFormation. Do not confuse SQS (queue, consumers pull) with SNS (push to many subscribers).",
  "check": [
   [
    "A web tier fails whenever the processing tier slows down. Which principle is missing, and what service helps?",
    "Loose coupling; placing an Amazon SQS queue between the tiers lets each side work and scale independently."
   ],
   [
    "What does treating servers as disposable resources mean?",
    "Replacing a misbehaving server with a fresh one launched by automation instead of repairing it by hand."
   ],
   [
    "Which service lets you define infrastructure in templates and deploy it repeatedly?",
    "AWS CloudFormation, the main AWS infrastructure as code service."
   ],
   [
    "Name two design choices that follow 'design for failure'.",
    "Running across multiple Availability Zones and using health checks with Auto Scaling to replace failed instances automatically (also backups that are tested)."
   ]
  ]
 },
 {
  "t": "The AWS Well-Architected Tool and running a Well-Architected review",
  "hook": "Kenji leads the claims platform at Bluewater Mutual Insurance, and the launch of the new quoting service is six weeks away. The engineering director wants evidence, not reassurance, that the design follows AWS best practices, and she wants to see it again in three months to know whether things improved. One teammate suggests turning on a scanner that inspects every resource. Another says the review is a conversation, not a scan. A third is sure the right answer is AWS Config. Kenji has one afternoon to set up a review that will satisfy the director. Which tool is built for exactly this, and what does it actually produce?",
  "simple": "The AWS Well-Architected Tool is a free questionnaire in the AWS console. You describe one of your systems, then answer questions about how you build and run it, such as how you back up data or who can log in. Based on your answers, the tool shows where you are at high or medium risk and suggests improvements. You can save a snapshot, called a milestone, and compare later answers to see progress. It does not look inside your account or change anything; it only knows what you tell it. Think of it like a health questionnaire at the doctor's office: honest answers lead to useful advice, and next year's visit shows whether you improved.",
  "body": [
   "The AWS Well-Architected Tool is a service in the AWS Management Console that helps you review a workload against the AWS Well-Architected Framework. It turns the framework's best practices into a structured questionnaire, records your answers and shows the risks that remain, so you can track improvement over time. The tool is available in the console at no additional charge, which makes it a good first hands-on exercise. You find it by searching for 'Well-Architected Tool' in the console search bar. The rest of this lesson walks through a review from start to finish and then separates the tool from the services it is often confused with.",
   "A review starts by defining a workload: a set of components that together deliver business value, such as an e-commerce application with its web servers, database and storage. In the console you choose Workloads > Define workload, then give it a name, a description, the environment (production or pre-production), the Regions or accounts it uses and optionally a review owner. You then choose the lenses to apply; the AWS Well-Architected Framework lens is applied by default. Getting the workload boundary right matters, because every answer you give applies to everything inside it.",
   "Next you answer questions pillar by pillar, for example 'How do you manage identities for people and machines?', 'How do you back up data?' or 'How do you monitor workload resources?'. For each question you tick the best practices you already follow, mark a question as not applicable if it truly is, and add notes. The tool is honest only if your answers are, so reviews work best when the people who build and run the workload answer together. A full review of all six pillars can take several hours, so many teams split it across sessions, starting with the pillars they consider riskiest, and record who answered each section so follow-up questions go to the right person.",
   "Based on your answers, the tool identifies high-risk issues (HRIs) and medium-risk issues (MRIs) and links each one to improvement guidance. The result is an improvement plan: a prioritized list of changes that would bring the workload closer to best practice. You can save a milestone, a snapshot of the review at a point in time, and later compare new answers against it to show progress. Reports can be generated as PDF files to share with stakeholders, and the same data is available through the API, for example with `aws wellarchitected list-workloads`. A team that accepts a risk on purpose can record why in the notes, which keeps the decision visible instead of silent.",
   "The framework also offers lenses, which add questions for a particular technology or industry, such as the Serverless Lens or the SaaS Lens, and organizations can write custom lenses for their own internal standards. You can share a workload or a custom lens with other AWS accounts or users so several teams can work on the same review. A Well-Architected review is not an audit and does not change any resources. It is a structured conversation, often run by the workload team, sometimes with help from an AWS Solutions Architect or an AWS Partner, aimed at finding risks early rather than assigning blame.",
   "Consider a worked example. A retail team defines its checkout service as a workload and answers the questions. The tool flags an HRI under reliability because backups have never been restored as a test, and another under security because developers share one administrator login. The team saves a milestone, fixes both issues over two sprints by scheduling restore tests and moving people to individual single sign-on access, then answers the questions again. Comparing with the milestone shows the HRIs resolved, and the PDF report goes to the engineering director.",
   "The most important exam distinction is between three services that all sound like 'check my setup'. The Well-Architected Tool records answers people give about a workload's design; it does not inspect resources. AWS Trusted Advisor automatically checks your actual resources and recommends improvements in categories such as cost optimization, security, performance, fault tolerance and service quotas. AWS Config records resource configurations over time and evaluates them against rules you define. If a question says the review is based on answers, it is the Well-Architected Tool; if it says the checks run automatically against what is deployed, it is Trusted Advisor or Config.",
   "Two more misconceptions are worth heading off. First, a review is not a one-time event. Workloads change, so teams repeat reviews regularly and after major changes, using milestones to measure the difference. Second, finishing a review does not fix anything by itself. The value comes from working through the improvement plan, which is why many teams turn high-risk issues into tickets in their normal backlog.",
   "Exam questions tend to say 'review its architecture against AWS best practices', 'identify high-risk issues in a workload' or 'measure architecture improvements over time'; all three point to the AWS Well-Architected Tool. 'Automated recommendations about idle resources or open security groups in the account' is Trusted Advisor. 'Track configuration changes and compliance with rules' is AWS Config. 'Additional questions for serverless applications' means a lens, and 'a saved snapshot of a review' is a milestone."
  ],
  "analogy": "A Well-Architected review is like a home energy audit questionnaire you fill out with the auditor. You answer questions about insulation, windows and heating, and the auditor gives you a prioritized list of improvements. Next year you fill it out again and compare. Where the analogy fails for the exam: a real auditor might also walk around with a thermal camera. The Well-Architected Tool never does; it relies entirely on your answers. The thermal camera in this picture would be Trusted Advisor, which inspects what is actually deployed.",
  "terms": [
   [
    "AWS Well-Architected Tool",
    "A console service that reviews a workload against the Well-Architected Framework through a questionnaire."
   ],
   [
    "High-risk issue (HRI)",
    "A finding in a review where missing best practices could significantly harm the workload."
   ],
   [
    "Medium-risk issue (MRI)",
    "A finding where missing best practices pose a moderate risk to the workload."
   ],
   [
    "Improvement plan",
    "A prioritized list of recommended changes produced from a Well-Architected review."
   ],
   [
    "Milestone",
    "A saved snapshot of a workload review used to compare progress over time."
   ],
   [
    "Lens",
    "An extension that adds best practices and questions for a specific technology, industry or internal standard."
   ],
   [
    "AWS Trusted Advisor",
    "A service that automatically inspects account resources and recommends improvements."
   ]
  ],
  "example": "Before a major product launch, an insurance company's platform team runs a Well-Architected review of its quoting service with an AWS Partner. The tool reports seven high-risk issues, mostly around untested recovery and broad permissions. The team saves a milestone, works through the improvement plan over a quarter, and shows leadership a second report with the high-risk count reduced to one, which they accept with a documented reason.",
  "mistakes": [
   [
    "The Well-Architected Tool scans your AWS account automatically.",
    "It records answers your team gives and does not inspect or modify resources. Automated checks of deployed resources come from Trusted Advisor or AWS Config."
   ],
   [
    "Trusted Advisor and the Well-Architected Tool are the same thing.",
    "Trusted Advisor automatically checks real resources for cost, security, performance, fault tolerance and quota issues. The Well-Architected Tool reviews a workload's design through a questionnaire."
   ],
   [
    "A Well-Architected review is a compliance audit.",
    "It is a structured, blameless conversation that finds risks early. It does not certify compliance with any standard."
   ],
   [
    "One review is enough.",
    "Workloads change, so teams repeat reviews regularly and after major changes, comparing against saved milestones to show progress."
   ]
  ],
  "tryit": [
   [
    "A company's security lead wants an automatic weekly list of security groups that allow unrestricted access and of resources that are sitting idle. A colleague suggests running a Well-Architected review instead. Is that the right tool?",
    "No. The request is for automated checks of actual deployed resources, which is what AWS Trusted Advisor provides. The Well-Architected Tool relies on answers from people and would not discover an open security group on its own."
   ],
   [
    "A team completed a Well-Architected review in January and fixed several issues by June. The director asks for proof of improvement. What feature should the team have used, and how does it help?",
    "A milestone. Saving a milestone in January captures the review at that point; answering the questions again in June and comparing against the milestone shows which high-risk issues were resolved."
   ]
  ],
  "tip": "The Well-Architected Tool reviews a workload's design from your answers; Trusted Advisor inspects your real account resources automatically; AWS Config tracks resource configurations against rules.",
  "check": [
   [
    "What does the AWS Well-Architected Tool produce after you answer its questions?",
    "A list of high-risk and medium-risk issues with an improvement plan linked to guidance."
   ],
   [
    "What is a milestone in the Well-Architected Tool?",
    "A saved snapshot of a review that you can compare later answers against to show progress."
   ],
   [
    "Does the Well-Architected Tool change or scan your resources?",
    "No. It records answers from the team; it does not inspect or modify resources."
   ],
   [
    "A company wants additional review questions specific to serverless applications. What should it use?",
    "A lens, such as the Serverless Lens, applied to the workload in the Well-Architected Tool."
   ]
  ]
 },
 {
  "t": "AWS Cloud Adoption Framework (AWS CAF): the six perspectives and the business benefits of adoption",
  "hook": "Halfway through its move to AWS, Riverbend Regional Health has stalled. The architects built a solid landing zone, but the help desk does not know how to support it, nobody owns the cloud budget, and the security team keeps blocking launches because no one agreed on identity standards. At the steering committee, the chief information officer asks Leah, the program lead, a pointed question: 'Our technology is fine. Why is the adoption failing?' Leah suspects the answer is that Riverbend treated the cloud as only a technical project. AWS has a framework for exactly this. Which parts of the organization has Riverbend forgotten?",
  "simple": "Moving to the cloud is not just about computers; people, money and rules have to change too. The AWS Cloud Adoption Framework (AWS CAF) is AWS's advice for managing that whole change. It looks at the move from six angles, called perspectives. Three are about the business: Business (does this help our goals?), People (do staff have the skills and the right culture?) and Governance (are we managing projects, money and risk?). Three are technical: Platform (are we building the cloud environment well?), Security (is it protected?) and Operations (is it running smoothly every day?). It is like moving a family to a new country: you need the right home, but also new schools, a budget, local rules and someone to keep the household running.",
  "body": [
   "Moving to the cloud is as much an organizational change as a technical one. People need new skills, finance needs new ways to budget, and security teams need new controls. The AWS Cloud Adoption Framework (AWS CAF) collects AWS's guidance for planning and carrying out that change. It groups the capabilities an organization needs into six perspectives, each associated with the stakeholders who usually own them. The exam asks you to match a concern or a stakeholder to the right perspective and to recognize the business benefits of adoption, so learn both the perspective names and who typically cares about each.",
   "Three perspectives are business-focused. The Business perspective makes sure cloud investments accelerate business outcomes and support the digital strategy; stakeholders include the chief executive officer (CEO), chief financial officer (CFO) and chief strategy officer. The People perspective bridges technology and business, covering culture, organizational structure, leadership, training and workforce transformation; its stakeholders include human resources (HR) and people leaders. The Governance perspective helps orchestrate cloud initiatives while maximizing benefits and minimizing risk, covering program and portfolio management, benefits management, risk management, cloud financial management and data governance; stakeholders include the chief information officer (CIO), program managers and enterprise architects.",
   "Three perspectives are technical. The Platform perspective helps build an enterprise-grade, scalable hybrid cloud platform, modernize existing workloads and implement new cloud-native solutions; stakeholders include the chief technology officer (CTO), architects and engineers. The Security perspective covers the confidentiality, integrity and availability of data and workloads, including identity and access management, threat detection, infrastructure protection, data protection and incident response; stakeholders include the chief information security officer (CISO) and security engineers. The Operations perspective makes sure cloud services are delivered at a level that meets business needs, covering observability, event and incident management, change and release management, and patch management; stakeholders include IT operations and site reliability teams.",
   "Why does the CAF bother with the business side at all? Because many cloud programs that struggle do so for non-technical reasons: staff are not trained, nobody is accountable for spending, or decisions are made without a clear business goal. By naming People and Governance as perspectives on equal footing with Platform and Security, the CAF forces a plan to account for skills, culture, budgets and risk from the start, rather than discovering the gaps halfway through.",
   "The CAF links these capabilities to four transformation domains (technology, process, organization and product) and to business outcomes. The outcomes it describes are reduced business risk, improved environmental, social and governance (ESG) performance, increased revenue and increased operational efficiency. These are the business benefits of adoption the exam refers to. The CAF also describes an iterative cloud transformation journey in four phases: envision (identify and prioritize transformation opportunities), align (identify capability gaps and cross-organizational dependencies), launch (deliver pilot initiatives in production that show value) and scale (expand successful pilots to the desired scale and keep realizing benefits). Because the journey is iterative, organizations go around it more than once as they take on new opportunities.",
   "The distinctions that trip people up are Governance versus Operations and Platform versus Operations. Governance manages the program: which projects run, what they cost, what risks are accepted and who owns the data. Operations keeps running services healthy day to day: monitoring, alerting, incidents, changes and patches. Platform designs and builds the cloud environment and architectures; Operations runs them once they exist. Security is its own perspective, even though security work touches all the others. A practical way to decide is to ask who would own the task in your company: if it is a finance or program office, think Governance; if it is the on-call team, think Operations; if it is the architecture group, think Platform.",
   "Consider a worked example. A manufacturer plans its move to AWS. The CFO wants a clear business case and wants cloud spending tied to outcomes (Business). HR plans training because most engineers have only on-premises experience (People). The CIO sets up a cloud program office to prioritize projects and track spending against budget (Governance). Architects design a multi-account landing zone (Platform). The CISO defines identity federation and logging standards (Security). The operations team builds dashboards and an incident runbook for the new environment (Operations). The first pilot, moving one internal application, is the launch phase; rolling the approach out to the other plants is scale.",
   "Several mistakes recur. People confuse the CAF with the Well-Architected Framework, but the CAF is about organizational adoption, while Well-Architected is about workload design. Learners invent perspectives such as 'Architecture' or 'Finance' when the actual names are Business, People, Governance, Platform, Security and Operations. Training gets placed under Business instead of People, and cloud financial management gets placed under Business when the CAF puts it in Governance. And the journey phases are envision, align, launch and scale, not plan, build, run.",
   "Exam wording follows the stakeholders and capabilities. 'Staff skills, training, culture or organizational change' is People. 'Budget, cost management, risk or portfolio of projects' is Governance. 'Business strategy, business case or aligning investments with outcomes' is Business. 'Designing the cloud environment or modernizing workloads' is Platform. 'Identity, threat detection or data protection' is Security. 'Monitoring, incident management or patching' is Operations. 'Deliver pilot projects' is the launch phase, and 'expand pilots to production' is scale."
  ],
  "analogy": "The CAF is like planning a school's move to a new campus. The principal makes sure the move supports the school's mission (Business), the staff get training on the new building (People), the board manages the budget and risks (Governance), the architects design the building (Platform), the security team plans locks and badges (Security), and the facilities crew keeps lights and heating running after move-in (Operations). The analogy is weakest on timing: a campus move happens once, while the CAF journey of envision, align, launch and scale repeats as new opportunities appear.",
  "mnemonic": "Perspectives, business three then technical three: 'Big People Govern; Platforms Secure Operations' (Business, People, Governance; Platform, Security, Operations). Journey phases in order: 'Every Ant Lifts Steadily' (Envision, Align, Launch, Scale).",
  "terms": [
   [
    "AWS Cloud Adoption Framework (AWS CAF)",
    "AWS guidance that organizes the capabilities needed for cloud adoption into six perspectives."
   ],
   [
    "Business perspective",
    "Ensures cloud investments accelerate business outcomes and digital strategy."
   ],
   [
    "People perspective",
    "Covers culture, organizational structure, leadership and workforce skills for the cloud."
   ],
   [
    "Governance perspective",
    "Orchestrates cloud initiatives and manages benefits, risk, portfolio and cloud financial management."
   ],
   [
    "Platform perspective",
    "Builds a scalable hybrid cloud platform and modernizes or builds cloud-native workloads."
   ],
   [
    "Security perspective",
    "Protects the confidentiality, integrity and availability of data and workloads."
   ],
   [
    "Operations perspective",
    "Delivers cloud services at agreed levels through observability, incident, change and patch management."
   ],
   [
    "Envision, align, launch, scale",
    "The four phases of the iterative cloud transformation journey described by the AWS CAF."
   ]
  ],
  "example": "A hospital group stalled halfway through its cloud move because its IT staff had never worked with AWS and there was no owner for cloud spending. Using the CAF, it set up a training program and new team structures (People), created a cloud program office that approves projects and reviews monthly costs (Governance), and ran a pilot moving its appointment system first (launch) before scaling to other systems.",
  "mistakes": [
   [
    "The CAF and the Well-Architected Framework are the same kind of guidance.",
    "The CAF guides organizational cloud adoption across six perspectives; the Well-Architected Framework guides the design of individual workloads across six pillars."
   ],
   [
    "Cloud financial management belongs to the Business perspective.",
    "The CAF places cloud financial management in the Governance perspective, alongside portfolio, risk and benefits management."
   ],
   [
    "Staff training belongs to Business or Operations.",
    "Training, culture, leadership and organizational structure belong to the People perspective."
   ],
   [
    "The journey phases are plan, build and run.",
    "The CAF journey phases are envision, align, launch and scale."
   ]
  ],
  "tryit": [
   [
    "A retail company has migrated several applications, but its finance team complains that nobody can say which projects are worth the money, and spending regularly exceeds budget without anyone being accountable. The CIO asks which CAF perspective needs attention. What do you answer?",
    "Governance. It covers program and portfolio management, benefits management, risk management and cloud financial management, which together address prioritizing projects and owning spending. Business would focus on strategy and outcomes, and Operations on running services day to day."
   ],
   [
    "A company has identified its most promising cloud opportunities and mapped the skills and dependencies it lacks. It is now moving one customer-facing application into production as a pilot to demonstrate value. Which phase of the CAF journey is this?",
    "Launch, which delivers pilot initiatives in production. Envision and align came before it; scale would follow by expanding successful pilots."
   ]
  ],
  "tip": "Governance manages the program, risk and money; Operations runs services day to day (monitoring, incidents, patching). Training and culture belong to People.",
  "check": [
   [
    "Which CAF perspective covers staff training and organizational culture?",
    "The People perspective."
   ],
   [
    "A CFO wants cloud spending tracked and risk managed across a portfolio of projects. Which perspective?",
    "Governance, which includes program and portfolio management, risk management and cloud financial management."
   ],
   [
    "What are the four phases of the CAF cloud transformation journey?",
    "Envision, align, launch and scale."
   ],
   [
    "Which perspective includes incident management and patching?",
    "Operations, which keeps cloud services running at the level the business needs."
   ]
  ]
 },
 {
  "t": "Migration strategies (the 7 Rs): rehost, replatform, refactor, repurchase, retire, retain and relocate",
  "hook": "The lease on Northgate Logistics' data center ends in nine months, and Sofia, the migration lead, is looking at a spreadsheet with 300 rows, one per server. Some run the core tracking system, some run a reporting tool nobody has opened in years, and one runs a warehouse controller wired to equipment on the floor. The CTO wants everything 'modernized'. The CFO wants it 'done by the deadline'. Both cannot be fully true for every row. Sofia needs to label each application with a strategy before Monday's planning meeting. How do you decide what to move as is, what to improve, what to replace and what to switch off?",
  "simple": "When a company moves its software to the cloud, it decides for each application how much to change it. AWS lists seven choices, all starting with R. Rehost: move it exactly as it is. Replatform: move it with a few small upgrades. Refactor: rebuild it to take full advantage of the cloud. Repurchase: replace it with a ready-made online product. Retire: switch it off because nobody needs it. Retain: leave it where it is for now. Relocate: move a whole group of virtual machines over without changing how they run. It is like moving house: some furniture goes on the truck as is, some gets new legs first, some gets replaced, some goes to the dump, and some stays in storage.",
  "body": [
   "When an organization moves its applications to AWS, it rarely treats them all the same way. Some are moved as they are, some are improved on the way, and some are switched off. AWS describes seven common migration strategies, known as the 7 Rs. During migration planning, each application in the portfolio is assigned one of them based on its business value, technical complexity, licensing and the time available. The exam gives you a scenario and asks which strategy it describes, so the skill to build is reading how much the application changes and where it ends up.",
   "Rehost, often called lift and shift, moves an application to AWS without changing it, for example copying a server as is onto Amazon Elastic Compute Cloud (Amazon EC2). It is fast, lets you migrate large numbers of servers quickly and can often be automated with AWS Application Migration Service. You can optimize later once the servers are running in the cloud. Replatform, sometimes called lift, tinker and shift, makes a few cloud optimizations without changing the core architecture. Moving a self-managed database to Amazon Relational Database Service (Amazon RDS) so AWS handles patching and backups is the classic example; the application code stays essentially the same, but an operational burden moves to a managed service.",
   "Refactor, also called re-architect, reimagines how the application is built, typically using cloud-native features such as serverless functions, containers, managed queues or purpose-built databases. It takes the most time and effort but can bring the most benefit in scalability, agility and cost, and it is usually driven by a strong business need the current architecture cannot meet, such as handling unpredictable peaks or releasing features much faster. Repurchase, sometimes called drop and shop, means moving to a different product, usually replacing a self-hosted application with a software as a service (SaaS) offering, such as dropping an on-premises customer relationship management (CRM) system for a SaaS one.",
   "Three strategies involve little or no change to where the application runs. Retire means decommissioning applications that are no longer useful; portfolio discovery often finds a surprising number of servers nobody uses, and turning them off saves money immediately. Retain, sometimes called revisit, means keeping an application where it is for now, perhaps because it was recently upgraded, depends on hardware or licenses that cannot move, has compliance constraints, or simply is not worth migrating yet. Relocate means moving infrastructure to the cloud without buying new hardware, rewriting applications or changing operations, for example moving VMware vSphere-based workloads to VMware Cloud on AWS.",
   "The key distinctions are about how much the application changes. Rehost changes nothing about the application. Relocate moves an entire virtualization platform with it, again without changing the applications. Replatform changes a component or two, such as the database hosting or the operating system, while the architecture stays the same. Refactor changes the architecture itself. Repurchase replaces the application with a different product. Retire and retain do not migrate the application at all. Effort and potential benefit generally rise from rehost toward refactor.",
   "That spectrum explains a common sequencing choice. Many organizations rehost first to meet a deadline, then replatform or refactor the most valuable applications once they are running in AWS, an approach sometimes described as migrate first, then modernize. Rehosting quickly gets them out of the data center and stops the hardware costs; modernizing afterward lets them invest effort only where the business benefit justifies it.",
   "Consider a worked example. A company assesses 300 servers. Forty turn out to be unused and are switched off (retire). Its email and HR systems are replaced with SaaS products (repurchase). A mainframe billing system stays in the data center until a separate project replaces it (retain). Two hundred application servers are copied to EC2 with Application Migration Service to meet a data center exit deadline (rehost). The main customer database moves to Amazon RDS (replatform). The order system, which struggles at peak, is rebuilt with containers, AWS Lambda and Amazon DynamoDB (refactor).",
   "Watch for the classic mix-ups. A move to RDS is often mislabeled a refactor even though the application itself is unchanged; it is replatform. A SaaS switch is sometimes called a rehost, but the application is replaced, so it is repurchase. Retain (keep it for now) and retire (turn it off) sound alike but mean opposite things. Relocate and rehost both avoid changing applications, but relocate moves at the hypervisor level, keeping the same virtualization platform and operations, while rehost moves individual servers onto EC2. Also note that older AWS material described six Rs; relocate is the seventh and is on the current exam.",
   "Exam questions hinge on key phrases. 'No code changes, as quickly as possible' or 'lift and shift' is rehost. 'Minor optimizations such as moving to a managed database' is replatform. 'Rebuild using cloud-native services' or 'break a monolith into microservices' is refactor. 'Switch to a SaaS product' is repurchase. 'Decommission' or 'turn it off' is retire. 'Keep on premises for now' is retain. 'Move VMware workloads without changing operations' is relocate."
  ],
  "analogy": "Think of moving to a new home. Rehost is putting the sofa on the truck as is. Replatform is reupholstering it before it goes. Refactor is replacing it with built-in seating designed for the new room. Repurchase is selling the sofa and renting furniture instead. Retire is taking it to the dump, retain is leaving it in your old place for now, and relocate is moving the entire furnished room in a shipping container without unpacking. The analogy stretches on relocate: it moves a whole virtualization platform, not just one application.",
  "terms": [
   [
    "Rehost (lift and shift)",
    "Moving an application to AWS without changes, typically onto Amazon EC2."
   ],
   [
    "Replatform (lift, tinker and shift)",
    "Moving with a few cloud optimizations, such as a managed database, while keeping the core architecture."
   ],
   [
    "Refactor (re-architect)",
    "Redesigning an application to use cloud-native features such as serverless or containers."
   ],
   [
    "Repurchase (drop and shop)",
    "Replacing an application with a different product, usually a SaaS offering."
   ],
   [
    "Retire",
    "Decommissioning an application that is no longer needed."
   ],
   [
    "Retain (revisit)",
    "Keeping an application in its current environment for now."
   ],
   [
    "Relocate",
    "Moving infrastructure, such as VMware-based workloads, to the cloud without changing applications or operations."
   ]
  ],
  "example": "A logistics firm must leave its leased data center within nine months. It rehosts most application servers to EC2 to meet the deadline, replatforms its PostgreSQL databases onto Amazon RDS, retires a dozen unused reporting servers, and keeps a warehouse control system that depends on local hardware on premises (retain). A year later, with the deadline behind it, it refactors its tracking service into serverless functions to handle holiday peaks.",
  "mistakes": [
   [
    "Moving a database to Amazon RDS is refactoring.",
    "If the application is otherwise unchanged, it is replatform: a few optimizations without changing the core architecture. Refactor redesigns the application itself."
   ],
   [
    "Switching to a SaaS product is rehosting.",
    "Rehost moves the same application unchanged. Replacing it with a different product, such as a SaaS offering, is repurchase."
   ],
   [
    "Retain and retire mean roughly the same thing.",
    "Retain keeps the application where it is for now; retire switches it off permanently."
   ],
   [
    "Relocate is just another name for rehost.",
    "Relocate moves an entire virtualization platform, such as VMware vSphere workloads to VMware Cloud on AWS, without changing operations. Rehost moves individual servers onto EC2."
   ]
  ],
  "tryit": [
   [
    "A university runs an on-premises learning system on a self-managed MySQL server. It wants to move to AWS within a semester and stop patching the database itself, but it has no time to change the application code. Which strategy fits, and why not rehost or refactor?",
    "Replatform, by moving the application to AWS and the database to Amazon RDS for MySQL. That adds one cloud optimization, managed patching and backups, without changing the architecture. Rehost would keep the self-managed database, and refactor would require redesigning the application, which there is no time for."
   ],
   [
    "During discovery, a company finds a reporting server that has had no logins for 14 months and whose reports nobody receives. Which strategy applies?",
    "Retire. The application provides no value, so decommissioning it saves cost immediately and removes it from the migration effort."
   ]
  ],
  "tip": "Moving a database onto Amazon RDS without redesigning the application is replatform; rewriting a monolith into microservices or serverless functions is refactor. Retain keeps an application; retire removes it.",
  "check": [
   [
    "An application is moved to EC2 with no code changes to meet a deadline. Which strategy?",
    "Rehost, also called lift and shift."
   ],
   [
    "A company replaces its on-premises CRM with a SaaS product. Which strategy?",
    "Repurchase, moving to a different product."
   ],
   [
    "What distinguishes replatform from refactor?",
    "Replatform makes a few optimizations such as a managed database without changing the architecture; refactor redesigns the application using cloud-native features."
   ],
   [
    "Which strategy moves VMware-based workloads to AWS without changing applications or operations?",
    "Relocate, for example to VMware Cloud on AWS."
   ]
  ]
 },
 {
  "t": "Migration tools: AWS Application Migration Service, AWS DMS with the Schema Conversion Tool, and AWS DataSync",
  "hook": "The migration plan at Juniper Valley Labs is signed off: 120 application servers will be rehosted, an Oracle reporting database will move to a different engine, and decades of instrument data sitting on a file share must land in Amazon S3. Ahmed, the infrastructure lead, has a whiteboard with three columns labeled servers, databases and files, and a list of AWS service names his team keeps mixing up. Someone suggests using the database service to copy the file share. Someone else asks whether the Oracle database has to be shut down for a week. Before the first migration wave, Ahmed needs the right tool in each column. Which ones go where?",
  "simple": "Once you decide how to move each application, you need the right moving truck for each kind of cargo. AWS has three main ones. For whole servers, AWS Application Migration Service copies them to AWS while they keep running, then switches over quickly. For databases, AWS Database Migration Service (AWS DMS) copies the data while the old database stays in use; if the new database is a different type, the AWS Schema Conversion Tool first translates the database's structure. For files, AWS DataSync copies folders and file shares to AWS storage over the network. Think of a household move: a piano mover for the big pieces (servers), a translator plus a careful packer for the filing cabinet in another language (databases), and boxes for everything else (files).",
  "body": [
   "Once you have decided how each application will move (the 7 Rs), you need tools to actually move it. AWS offers dedicated services for the three things most migrations carry: whole servers, databases and files. The exam expects you to pick the right one from a short description of what is being moved, so the most important skill here is matching the payload to the service. Read each scenario for the noun first: server, database or file share.",
   "AWS Application Migration Service (often shortened to AWS MGN) is the primary AWS service for rehosting (lift and shift). You install a replication agent on each source server, which can be physical, virtual or running in another cloud. The service continuously replicates the servers' disks at the block level to a low-cost staging area in your AWS account, so the source keeps running normally. At any time you can launch test instances from the replicated data without disrupting the source, which lets teams check licenses, network paths and application behavior weeks before the real move. When testing passes, you perform a cutover: replication catches up, you stop the application on the source, and the servers are launched as Amazon Elastic Compute Cloud (Amazon EC2) instances. Continuous replication keeps that cutover window short, often minutes.",
   "AWS Database Migration Service (AWS DMS) migrates databases to AWS. You create a replication instance, define source and target endpoints, and run a migration task that performs a full load and can then keep applying ongoing changes, known as change data capture (CDC), until you switch applications to the target. The source database remains fully operational during the migration, which minimizes downtime. DMS supports homogeneous migrations, where source and target use the same engine (for example Oracle to Oracle on Amazon RDS), and heterogeneous migrations, where they differ (for example Oracle to Amazon Aurora PostgreSQL).",
   "Heterogeneous migrations add a step. The schema, meaning tables, views, stored procedures, functions and other code objects, must first be converted to the target engine's dialect. That is the job of the AWS Schema Conversion Tool (AWS SCT), a downloadable application that also produces an assessment report of what converts automatically and what needs manual work. DMS now also offers built-in schema conversion in the console. The division of labor is simple: SCT (or DMS Schema Conversion) converts the structure, and DMS moves the data. For a homogeneous migration, such as SQL Server to Amazon RDS for SQL Server, no schema conversion is needed.",
   "AWS DataSync is an online data transfer service for files and objects. You deploy a DataSync agent near your on-premises storage, create locations for the source (such as a Network File System (NFS) or Server Message Block (SMB) share) and the destination (such as Amazon S3, Amazon Elastic File System (Amazon EFS) or Amazon FSx), then create and run a task. DataSync handles scheduling, encryption in transit, data integrity verification and incremental transfers, so it suits both one-time migrations and recurring synchronization of large file sets. It can also copy between AWS storage services.",
   "Sometimes the network is the bottleneck. For datasets too large to send over the network in the time available, AWS offers offline transfer devices in the AWS Snow Family, such as AWS Snowball Edge, which you load locally and ship back to AWS. Two supporting services round out the toolkit: AWS Application Discovery Service collects data about on-premises servers to help plan migrations, and AWS Migration Hub provides a single place to track the progress of migrations across these tools.",
   "Consider a worked example. A company is leaving its data center. Its 120 Windows and Linux application servers are replicated with Application Migration Service and cut over in waves over several weekends. Its on-premises Microsoft SQL Server database moves to Amazon RDS for SQL Server with DMS, a homogeneous migration that needs no schema conversion. A separate Oracle reporting database is being moved to Aurora PostgreSQL, so the team first runs SCT to convert the schema and review the assessment report, then uses DMS with ongoing replication. Finally, 40 terabytes of scanned documents on an SMB file share are copied to Amazon S3 with DataSync, running nightly until the final cutover.",
   "A few mistakes cost easy points. Choosing DMS to move files, or DataSync to move a live database, mismatches the payload. Forgetting SCT when the engines differ leaves the schema untranslated. Thinking DMS requires the source database to be taken offline for the whole migration is wrong: it stays online, and CDC keeps the target in sync. And picking AWS Server Migration Service or other older names is a trap, because AWS now points customers to Application Migration Service for rehosting.",
   "Exam questions usually name the payload and a constraint. 'Lift and shift servers with minimal downtime' or 'replicate physical or virtual servers to EC2' is AWS Application Migration Service. 'Migrate a database while it stays operational' is AWS DMS. 'Source and target database engines differ' or 'convert stored procedures' adds the AWS Schema Conversion Tool. 'Move or synchronize file shares to Amazon S3, EFS or FSx over the network' is AWS DataSync. 'Petabytes with limited bandwidth' points to an offline Snow Family device."
  ],
  "analogy": "Migrating a database across engines is like moving a library to a country that uses a different language. First a translator rewrites the catalog and shelf labels (SCT converts the schema), then movers carry the books while the old library stays open, bringing over any new arrivals until the day you switch the sign (DMS with change data capture). Where the analogy stops: SCT cannot always translate everything automatically, so its assessment report flags objects that need a person to rewrite them.",
  "terms": [
   [
    "AWS Application Migration Service (AWS MGN)",
    "The primary AWS rehosting service that continuously replicates source servers and launches them as EC2 instances at cutover."
   ],
   [
    "Cutover",
    "The final switch from the source system to the migrated system in AWS."
   ],
   [
    "AWS Database Migration Service (AWS DMS)",
    "A service that migrates data between databases while the source stays operational."
   ],
   [
    "Change data capture (CDC)",
    "Continuously replicating ongoing changes from the source database to the target after the initial load."
   ],
   [
    "AWS Schema Conversion Tool (AWS SCT)",
    "A tool that converts database schema and code objects from one engine to another for heterogeneous migrations."
   ],
   [
    "Heterogeneous migration",
    "A database migration between different engines, such as Oracle to Aurora PostgreSQL."
   ],
   [
    "AWS DataSync",
    "An online service that moves and synchronizes files and objects between on-premises storage and AWS storage services."
   ],
   [
    "AWS Snow Family",
    "Physical devices, such as Snowball Edge, used to transfer large datasets offline when network transfer is too slow."
   ]
  ],
  "example": "A research lab moves its analysis servers to EC2 with Application Migration Service, launching test copies weeks before cutover to check that software licenses and network paths work. Its MySQL database moves to Amazon Aurora MySQL with DMS using ongoing replication, so the cutover takes only a few minutes of downtime. Years of instrument data on an NFS share are copied to Amazon S3 with a nightly DataSync task until the lab switches over.",
  "mistakes": [
   [
    "AWS DMS can move a file share to Amazon S3.",
    "DMS migrates databases. File shares over NFS or SMB move with AWS DataSync, or with a Snow Family device if the network is too slow."
   ],
   [
    "DMS alone handles an Oracle to PostgreSQL migration.",
    "When engines differ, the schema and code objects must first be converted with the AWS Schema Conversion Tool or DMS Schema Conversion; DMS then moves the data."
   ],
   [
    "The source database must be offline during a DMS migration.",
    "The source stays operational. After the full load, change data capture keeps the target in sync until cutover, which minimizes downtime."
   ],
   [
    "AWS Server Migration Service is the recommended rehosting tool.",
    "AWS now points customers to AWS Application Migration Service for lift-and-shift server migrations."
   ]
  ],
  "tryit": [
   [
    "A media company must move a SQL Server database to Amazon RDS for SQL Server with only a few minutes of downtime. The application team asks whether they need the Schema Conversion Tool and whether the database must be frozen for the copy. What do you tell them?",
    "Use AWS DMS with a full load followed by change data capture. This is a homogeneous migration, so no schema conversion is needed, and the source stays online while CDC keeps the target in sync until a short cutover."
   ],
   [
    "An architecture firm needs to copy 30 terabytes of project files from an on-premises SMB share to Amazon FSx and keep them synchronized nightly for a month before switching over. It has a reliable network connection. Which service fits?",
    "AWS DataSync. It transfers files from SMB or NFS shares to AWS storage such as Amazon FSx, supports scheduled incremental transfers and verifies data integrity. A Snow Family device would only be needed if the network could not move the data in time."
   ]
  ],
  "tip": "Servers go with Application Migration Service, databases with DMS (plus SCT when engines differ), and file shares with DataSync. DMS moves data; SCT converts the schema.",
  "check": [
   [
    "Which service is the primary AWS tool for lift-and-shift migration of servers?",
    "AWS Application Migration Service, which replicates servers continuously and launches them as EC2 instances at cutover."
   ],
   [
    "A company migrates from Oracle to Aurora PostgreSQL. Which two tools does it need?",
    "The AWS Schema Conversion Tool (or DMS Schema Conversion) to convert the schema, and AWS DMS to move the data."
   ],
   [
    "Does the source database have to be offline during a DMS migration?",
    "No. It remains operational, and change data capture keeps the target in sync until cutover."
   ],
   [
    "Which service should copy an on-premises SMB file share to Amazon S3 on a schedule?",
    "AWS DataSync, which transfers and synchronizes files over the network."
   ]
  ]
 },
 {
  "t": "Cloud economics: fixed vs variable costs, total cost of ownership and the costs that move to AWS",
  "hook": "Marcus, IT director at Oakfield Home Goods, is certain the cloud will cost more. He has done the math: an EC2 instance costs more per year than a server's purchase price divided by five. Then Grace from finance asks a few questions. Who pays the colocation fee? The power and cooling? The maintenance contract on the storage array? The two weekends a year his team spends replacing parts? Marcus realizes those costs live in other budgets he never looks at. The board wants a fair comparison by next month. What does a complete cost picture include, and which costs truly go away?",
  "simple": "Cloud economics is about comparing what IT really costs on your own equipment versus in the cloud. On your own, most costs are fixed: you buy servers and pay rent and electricity whether you use them or not. In the cloud, most costs are variable: they go up and down with how much you use. A fair comparison counts everything over the years, not just the price of the machines. That full number is called total cost of ownership. When you move to AWS, costs like buying hardware, renting server rooms, power and cooling largely go away, but you still pay your staff and for the services you use. It is like comparing owning a car (purchase, insurance, repairs, parking) with using taxis.",
  "body": [
   "Cloud economics is about understanding what running IT really costs and how that changes when you move to AWS. The exam focuses on a few ideas: the shift from fixed to variable costs, total cost of ownership, the difference between direct and indirect costs, and which costs you stop paying and which you still carry. These are the arguments a business case for migration is built on, and the exam expects you to reason about them like a finance-minded manager rather than a hardware buyer.",
   "Start with fixed and variable costs. On premises, most IT costs are fixed. You buy servers, storage, network gear and data center space up front or on long contracts, and you pay for them whether they are busy or idle. Capacity is usually sized for the peak plus a safety margin, so much of it sits unused most of the time. In AWS, most costs are variable: they rise and fall with usage. That improves cash flow and removes the penalty for over-provisioning, although it also means an unmonitored account can grow expensive, which is why cost tools such as AWS Budgets and AWS Cost Explorer matter from day one.",
   "Total cost of ownership (TCO) is the full cost of owning and running a system over its life, not just the purchase price. For an on-premises server that includes the hardware, software licenses, data center space, power and cooling, network connectivity, physical security, hardware maintenance contracts, and the staff time to rack, patch and replace equipment. A fair comparison with AWS weighs all of these against the AWS bill plus whatever work remains on your side. Many on-premises costs are hidden in other budgets, like the power bill paid by facilities, so TCO analyses often surprise people.",
   "When you move to AWS, several cost categories largely move to AWS: buying and refreshing physical hardware, data center real estate, power and cooling, physical security and hardware maintenance. You still pay for the services you use, and you still carry the cost of staff who design, secure, operate and optimize your workloads, application licenses you bring, and data transfer out of AWS. Managed services shift even more work to AWS: with Amazon Relational Database Service (Amazon RDS), AWS handles database patching and backups, which lowers your operational labor.",
   "Two AWS tools support this analysis. AWS Migration Evaluator can build a data-driven business case from your actual on-premises utilization, which is often far lower than the hardware's capacity. The AWS Pricing Calculator estimates the cost of a planned architecture before you build it, letting you compare options such as different instance sizes or storage classes. One is about the case for moving; the other is about pricing what you intend to run.",
   "The exam also expects you to know the difference between direct costs and indirect costs. Direct costs are clearly attributable to a system: the price of a server, a license or an AWS service line on the bill. Indirect costs are real but harder to see: people's time, downtime, delays in delivering features and the opportunity cost of engineers doing maintenance instead of product work. Much of the cloud's financial value comes from reducing indirect costs, for example faster delivery of new features and fewer hardware-related outages.",
   "Consider a worked example. A company compares keeping 50 servers on premises for five years against running the same workloads in AWS. The on-premises side includes a hardware refresh, a colocation contract, power, a maintenance contract and a share of two administrators' time. The AWS side includes compute, storage, data transfer, a support plan and the same administrators, now spending time on automation instead of hardware. The TCO comparison favors AWS mainly because of rightsized instances, no hardware refresh and no colocation, while the administrators' salaries appear on both sides.",
   "Several mistakes recur in cost questions. Comparing only server purchase prices against the monthly AWS bill ignores power, space and staff. Assuming all staff costs disappear in the cloud is wrong, because customers still design, secure and operate their workloads. Forgetting data transfer and support charges understates the AWS side. And assuming 'variable' means 'always lower' overlooks that idle or oversized resources in AWS still cost money every hour, so the savings depend on rightsizing, turning things off and using commitment discounts for steady workloads.",
   "Exam questions about 'costs that are eliminated or reduced when moving to AWS' want physical items: hardware purchases and refresh, data center space, power, cooling and physical security. 'Costs the customer still pays' include application development, staff who manage workloads, security configuration and software licenses they bring. 'Full lifetime cost including hidden costs' means total cost of ownership. 'Estimate the cost of a planned AWS architecture' points to the AWS Pricing Calculator, and 'build a business case from on-premises utilization' points to Migration Evaluator."
  ],
  "analogy": "Comparing on-premises IT with AWS is like comparing owning a car with using a car service. Owning means a purchase price plus insurance, parking, repairs and the time you spend at the garage, much of it paid whether you drive or not. The car service charges per trip, and the company handles the vehicle. A fair comparison counts all of owning, not just the sticker price. The analogy has a limit: with AWS you are still the driver for your workloads, so the staff who design, secure and operate them remain your cost.",
  "terms": [
   [
    "Fixed cost",
    "A cost paid regardless of usage, such as purchased servers or a data center lease."
   ],
   [
    "Variable cost",
    "A cost that changes with usage, such as hourly compute charges."
   ],
   [
    "Total cost of ownership (TCO)",
    "The full lifetime cost of owning and operating a system, including hidden costs such as power and staff time."
   ],
   [
    "Direct cost",
    "A cost clearly attributable to a system, such as a server purchase or a service charge."
   ],
   [
    "Indirect cost",
    "A real but less visible cost such as staff time, downtime or delayed delivery."
   ],
   [
    "AWS Pricing Calculator",
    "A tool for estimating the cost of a planned set of AWS services."
   ],
   [
    "AWS Migration Evaluator",
    "A service that analyzes on-premises utilization to build a data-driven business case for migrating to AWS."
   ]
  ],
  "example": "A retailer's IT director claims the cloud is more expensive because an EC2 instance costs more per year than a server's purchase price divided by five. A TCO analysis adds the colocation fee, power and cooling, hardware maintenance, the storage array refresh and the hours staff spend replacing parts. With those included and instances rightsized from real utilization data, the AWS option comes out lower, and the director's team can spend its time on the e-commerce platform instead of hardware.",
  "mistakes": [
   [
    "Comparing a server's purchase price with the monthly AWS bill is a fair comparison.",
    "TCO includes power, cooling, space, maintenance, licenses and staff time over the system's life. Leaving those out makes on premises look cheaper than it is."
   ],
   [
    "Moving to AWS eliminates staff costs.",
    "AWS takes over physical work, but customers still pay people to design, secure, operate and optimize their workloads."
   ],
   [
    "Variable costs are always lower.",
    "Variable costs follow usage, so idle or oversized resources keep costing money. Savings depend on rightsizing, shutting down unused resources and commitment discounts for steady workloads."
   ],
   [
    "The AWS Pricing Calculator builds the business case from current on-premises usage.",
    "The Pricing Calculator estimates the cost of a planned AWS architecture. Migration Evaluator analyzes on-premises utilization to build a business case."
   ]
  ],
  "tryit": [
   [
    "A school district is listing which of its costs will shrink after moving its student information system to AWS. The list includes server replacement every five years, electricity for the server room, the salary of the developer who customizes the system, and the license for the third-party application it will bring. Which items largely move to AWS?",
    "Server replacement and server room electricity, which are physical infrastructure costs AWS takes over. The developer's salary and the brought license stay with the district, because customers still build and operate their applications and pay for licenses they bring."
   ],
   [
    "A CFO wants a business case for migration based on how heavily the company's 400 on-premises servers are actually used, not on their hardware specifications. Which AWS service fits, and how does it differ from the Pricing Calculator?",
    "AWS Migration Evaluator, which analyzes actual on-premises utilization to build a data-driven business case. The Pricing Calculator estimates the cost of a specific AWS architecture you plan to run, but it does not study current usage."
   ]
  ],
  "tip": "Costs that move to AWS are physical: hardware, data center space, power, cooling and physical security. Staff who build and run your workloads, application licenses and data transfer stay with you.",
  "check": [
   [
    "Name three costs that are largely eliminated when a workload moves from on premises to AWS.",
    "Hardware purchase and refresh, data center space, and power and cooling (also physical security and hardware maintenance)."
   ],
   [
    "What does total cost of ownership include beyond the purchase price?",
    "All lifetime costs, such as power, cooling, space, maintenance contracts, licenses and staff time."
   ],
   [
    "Is staff time spent managing applications a direct or indirect cost, and does it disappear in AWS?",
    "It is generally an indirect cost, and it does not disappear; the customer still operates and secures its workloads."
   ],
   [
    "Which tool estimates the monthly cost of a planned AWS architecture?",
    "The AWS Pricing Calculator."
   ]
  ]
 },
 {
  "t": "Licensing strategies (bring your own license vs license included) and rightsizing to cut waste",
  "hook": "Three months after migrating, the cloud bill at Granite Peak Engineering is higher than anyone promised, and Nadia from the cost team is asked to explain why. She finds two stories. The company paid for Windows and SQL Server licenses in its hourly rates while also renewing an enterprise agreement for licenses it already owned. And most of the servers, copied size for size from old hardware, run at a fraction of their CPU all day. Then the legal team adds a twist: the CAD software vendor's license is counted per physical core. Before the finance review, Nadia must recommend a licensing model for each system and a plan to stop paying for idle capacity. Where does she start?",
  "simple": "Two things often waste money in the cloud: paying for software licenses the wrong way, and renting servers bigger than you need. For licenses, you have two choices. License included means the software cost is built into the hourly price, so you have nothing to track, and you stop paying when you stop using it. Bring your own license means you use licenses you already bought and pay AWS only for the machine. Some licenses are tied to physical hardware, so you may need a server dedicated to you. Rightsizing means checking how much of a server you actually use and switching to the right size. It is like choosing between a phone plan that includes everything and bringing your own phone, then noticing you pay for far more data than you use.",
  "body": [
   "Software licenses can be a big part of a cloud bill, especially for commercial operating systems and databases, and waste from oversized resources can be even bigger. This lesson covers the two broad licensing models AWS offers, the special case of licenses tied to physical hardware, and rightsizing, the continuous process of matching resources to what a workload actually needs. The exam expects you to know when each licensing model makes sense and which tools recommend rightsizing changes.",
   "With license included, the software license cost is built into the hourly price of the AWS resource. For example, you can launch an Amazon Elastic Compute Cloud (Amazon EC2) instance from a Windows Server Amazon Machine Image (AMI), or create an Amazon RDS for SQL Server database, and the license is part of what you pay AWS. You do not have to buy, track or true-up licenses yourself, and you stop paying for the license as soon as you stop using the resource. This model is simple and fits variable, short-lived or new workloads where you have no existing licenses.",
   "With bring your own license (BYOL), you use licenses you already own and pay AWS only for the infrastructure. This can save money if your organization has already invested in licenses, for example through an enterprise agreement with the software vendor. However, some licenses are counted per physical socket or per physical core, or require that software runs on hardware dedicated to you. That is why AWS offers Amazon EC2 Dedicated Hosts: physical servers fully dedicated to your use, with visibility into sockets and cores so you can meet those license terms. Always check the vendor's license terms before bringing a license to the cloud; the vendor decides what is allowed, not AWS.",
   "Two related points complete the licensing picture. AWS License Manager helps track license usage and enforce limits across accounts so you do not accidentally exceed what you own, which matters because overuse can lead to costly true-ups during a vendor audit. And Dedicated Hosts are not the same as Dedicated Instances: Dedicated Instances run on single-tenant hardware, but without the socket and core visibility or control over placement that per-core licenses typically require. Some license-included options also exist for software you might otherwise bring, so compare both prices over the expected life of the workload before deciding.",
   "Rightsizing is the process of matching instance types and sizes to the actual workload so you are not paying for capacity you do not use. Teams moving from on premises often choose instance sizes that mirror old hardware, which was usually oversized for peak demand. By looking at real utilization data, such as CPU, memory and network use collected by Amazon CloudWatch, you can move to a smaller size or a different instance family. AWS Compute Optimizer analyzes usage and recommends better instance types, Auto Scaling group settings, Amazon Elastic Block Store (Amazon EBS) volumes and AWS Lambda memory sizes, and Cost Explorer offers rightsizing recommendations for EC2. Both can be queried from the command line:",
   "```\n# Ask Compute Optimizer for EC2 recommendations\naws compute-optimizer get-ec2-instance-recommendations\n\n# Ask Cost Explorer for rightsizing recommendations\naws ce get-rightsizing-recommendation --service AmazonEC2\n```",
   "Rightsizing is not a one-time task during migration. Workloads change and new instance generations appear, so the best size and type change over time, and many teams review recommendations on a regular schedule. Look at more than CPU, too: a server with low CPU might be constrained by memory, and shrinking it on CPU data alone could hurt performance. Other ways to cut waste include stopping non-production resources outside working hours and deleting unattached EBS volumes and old snapshots that keep generating charges.",
   "Consider a worked example. A company migrates twenty SQL Server databases. It already owns SQL Server licenses covered by an agreement that allows use on dedicated hardware, so for its large, steady production databases it uses BYOL on Dedicated Hosts and tracks usage in License Manager. For a handful of small, short-lived project databases it uses license-included Amazon RDS so it can create and delete them freely. After three months, Compute Optimizer shows most application servers averaging under 15 percent CPU, so the team moves them to smaller sizes and a newer instance generation.",
   "Exam wording is usually direct. 'Existing licenses tied to sockets or physical cores' or 'software that must run on dedicated physical servers' points to Dedicated Hosts with BYOL. 'Avoid managing licenses' or 'pay for the license by the hour' points to license-included instances. 'Track license usage and enforce limits' is AWS License Manager. 'Instances are consistently underutilized' or 'recommend optimal instance types based on usage' is rightsizing with AWS Compute Optimizer or Cost Explorer."
  ],
  "analogy": "Choosing a licensing model is like choosing between a furnished and an unfurnished apartment. Furnished (license included) costs more per month but you own nothing and can leave anytime. Unfurnished (BYOL) is cheaper if you already own furniture, but some pieces only fit certain rooms, just as some licenses only work on dedicated hardware. Rightsizing is noticing you rented a four-bedroom place for one person and moving to a better fit. The analogy breaks on timing: in AWS you can resize in minutes, so there is no reason to wait for a lease to end.",
  "terms": [
   [
    "License included",
    "A model where the software license cost is built into the price of the AWS resource."
   ],
   [
    "Bring your own license (BYOL)",
    "Using licenses you already own on AWS and paying AWS only for infrastructure."
   ],
   [
    "Amazon EC2 Dedicated Host",
    "A physical server dedicated to one customer, with socket and core visibility for license compliance."
   ],
   [
    "Dedicated Instance",
    "An EC2 instance on single-tenant hardware, without the socket and core visibility or placement control of a Dedicated Host."
   ],
   [
    "AWS License Manager",
    "A service that tracks software license usage and enforces licensing rules across accounts."
   ],
   [
    "Rightsizing",
    "Matching instance types and sizes to actual workload needs to eliminate paid but unused capacity."
   ],
   [
    "AWS Compute Optimizer",
    "A service that analyzes utilization and recommends better-sized compute resources."
   ]
  ],
  "example": "An engineering firm moved its CAD license servers to AWS and assumed it could reuse its perpetual licenses anywhere. The vendor's terms required dedicated physical hardware counted by cores, so the firm placed those servers on an EC2 Dedicated Host and recorded the rules in License Manager. For its general Windows file servers it chose license-included instances, then used Compute Optimizer data to shrink them by two sizes after a month of monitoring.",
  "mistakes": [
   [
    "Any license you own can be used on AWS.",
    "The vendor's license terms decide whether and how software can run in the cloud. Some require dedicated hardware or count physical cores, which points to Dedicated Hosts."
   ],
   [
    "Dedicated Instances and Dedicated Hosts are interchangeable for licensing.",
    "Both use single-tenant hardware, but only Dedicated Hosts give visibility into sockets and cores and control over placement, which per-core or per-socket licenses usually need."
   ],
   [
    "Rightsizing is a one-time task during migration.",
    "Workloads change and new instance generations appear, so rightsizing should be repeated regularly using tools such as Compute Optimizer and Cost Explorer."
   ],
   [
    "Low CPU always means you can shrink the instance.",
    "Memory, network or storage may be the real constraint. Rightsizing should consider all relevant utilization metrics, not CPU alone."
   ]
  ],
  "tryit": [
   [
    "A marketing team needs a Windows-based SQL Server database for a six-week campaign and then will delete it. The company owns no spare SQL Server licenses. Which licensing model makes more sense, and why?",
    "License included, for example Amazon RDS for SQL Server with the license in the hourly price. The workload is short-lived and there are no existing licenses, so paying only while the database runs avoids buying and tracking licenses."
   ],
   [
    "A finance company plans to bring its existing database licenses, which its vendor counts per physical core, to AWS. A teammate proposes regular shared-tenancy EC2 instances to save money. What should you recommend?",
    "Amazon EC2 Dedicated Hosts with BYOL, after confirming the vendor's terms. Dedicated Hosts provide the physical core and socket visibility needed to stay compliant, and License Manager can track usage against what the company owns."
   ]
  ],
  "tip": "Licenses bound to sockets or physical cores point to Dedicated Hosts with BYOL; avoiding license management points to license included. Rightsizing recommendations come from Compute Optimizer and Cost Explorer.",
  "check": [
   [
    "When is license included usually the better choice?",
    "When you have no existing licenses or the workload is short-lived or variable, because you pay only while the resource runs and have nothing to track."
   ],
   [
    "Why might a company need an EC2 Dedicated Host for BYOL?",
    "Because some licenses are counted per physical socket or core or require dedicated hardware, and Dedicated Hosts provide that visibility and control."
   ],
   [
    "Which service recommends smaller or different instance types based on actual utilization?",
    "AWS Compute Optimizer (Cost Explorer also provides EC2 rightsizing recommendations)."
   ],
   [
    "Why is rightsizing a continuous process?",
    "Workloads change and new instance generations appear, so the best size and type change over time."
   ]
  ]
 },
 {
  "t": "The AWS shared responsibility model: security of the cloud vs security in the cloud",
  "hook": "It is your second week as the only cloud engineer at Harbor Credit Union, and the board's risk committee has sent you a one-line email: \"Since our member data now lives with AWS, AWS is responsible for securing it, correct?\" Your manager, Dana, forwards it with a note that says only \"Please answer carefully.\" You know the honest answer is \"partly,\" but partly is not something a risk committee can act on. They want to know exactly which locks are AWS's to hold and which keys sit in your own pocket. Where, precisely, is that line?",
  "simple": "When you rent an apartment, the landlord keeps the building safe: the roof, the front door lock, the wiring inside the walls. You are still the one who has to lock your own apartment door and decide who gets a spare key. AWS works the same way. AWS protects the buildings, the computers and the cables that make up its cloud. You protect what you put there and how you set it up: your files, who is allowed to log in, and the settings you choose. If you leave your door wide open, the landlord did not fail you. AWS sums this up as AWS handling security \"of\" the cloud and you handling security \"in\" the cloud.",
  "body": [
   "Security in AWS is a shared job. The AWS shared responsibility model spells out which parts AWS takes care of and which parts remain yours. It is one of the most tested ideas on the Cloud Practitioner exam, and almost every security question becomes easier once you have it straight. The short version AWS uses is that AWS is responsible for security of the cloud, and the customer is responsible for security in the cloud. Getting it right also matters outside the exam, because people who misread the model tend to assume someone else is watching a setting that nobody is watching.",
   "AWS is responsible for security of the cloud. That means protecting the infrastructure that runs all AWS services: the physical data centers with their guards, access controls and environmental protections; the hardware, including secure disposal of failed storage devices; the global network; and the virtualization layer (the hypervisor) that separates customers' instances from each other. AWS also operates and patches the software of its managed services. You cannot visit an AWS data center, and you do not need to worry about someone stealing a disk from a rack; that is AWS's job. Customers never see most of this work directly, but they benefit from it every day, and AWS backs it up with independent audits whose reports you can download and hand to your own auditors.",
   "You, the customer, are responsible for security in the cloud. That covers what you put in AWS and how you configure it: your data and whether it is encrypted, AWS Identity and Access Management (IAM), meaning who can do what, the guest operating systems and applications on your Amazon EC2 instances including their patches, network settings such as security groups and network access control lists (network ACLs), and client-side and server-side encryption choices. If you leave an Amazon S3 bucket open to the public or grant an IAM user administrator access it does not need, that is a customer configuration problem, not an AWS failure. Notice that every item on this list is something you can open in the console and change. That is the defining feature of security in the cloud: AWS gives you the controls, and how you set them is up to you.",
   "Some controls are shared, with each party handling its own layer. Patch management is shared: AWS patches the infrastructure and managed services, and you patch your guest operating systems and applications. Configuration management is shared: AWS configures its infrastructure devices, and you configure your guest operating systems, databases and applications. Awareness and training is shared: AWS trains its employees, and you train yours. Controls that are fully AWS's are called inherited controls, because you inherit them from AWS, for example the physical and environmental controls you can point auditors to in AWS's compliance reports. Shared controls are where many exam distractors live, because both parties really do have a part. The trick is to name which layer each party owns rather than picking one side.",
   "A simple way to place any item: if you can see it in the console or API and choose its settings, you are probably responsible for it. If it is physical, or below the hypervisor, it belongs to AWS. The line moves with the type of service, which the next lesson covers in detail. With infrastructure services such as EC2 you manage more; with managed and serverless services AWS manages more. But customer data, identities and access permissions are always the customer's responsibility, whatever the service.",
   "Consider a worked example. A company's customer records leak from an S3 bucket. The investigation finds that a developer attached a bucket policy allowing public read access for a quick test and never removed it. Although the data was stored on AWS infrastructure, AWS was not at fault: the storage, hardware and network worked as designed, and the bucket was configured to be public by the customer. The fix is on the customer side: turn on S3 Block Public Access at the account level, review policies with IAM Access Analyzer and alert on policy changes. Notice the language an investigator would use: the service behaved as configured. The weakness was a setting, and settings belong to the customer.",
   "Common mistakes: believing that because a service is managed, the customer has no security duties; assuming AWS patches the operating system on your EC2 instances; assuming AWS is responsible for encrypting your data by default in every case (many services now encrypt by default, but choosing, configuring and controlling access to encryption remains your responsibility); and thinking AWS will fix an insecure configuration on your behalf. AWS offers tools that warn you, such as AWS Trusted Advisor and AWS Security Hub, but acting on them is your job.",
   "Exam questions typically list a task and ask who owns it. 'Physical security of data centers', 'hardware disposal', 'the hypervisor' or 'the global network infrastructure' is AWS. 'Patching the guest operating system on EC2', 'configuring security groups', 'managing IAM users and permissions', 'encrypting customer data' or 'classifying data' is the customer. 'Patch management' or 'configuration management' in general is shared. 'Security of the cloud' means AWS; 'security in the cloud' means the customer."
  ],
  "analogy": "Think of AWS as the owner of a secure storage facility. The owner runs the fences, gates, cameras, guards and the walls between units. You rent a unit, and you choose the padlock, decide who gets a copy of the key and decide what goes inside. If thieves cut through the outer fence, that is the owner's failure. If you hand your key to a stranger or leave the unit unlocked, it is yours. The analogy stops working at one point: in AWS the dividing line moves depending on the service, with managed services taking more of the layers off your hands, while a storage unit always splits the same way.",
  "terms": [
   [
    "Shared responsibility model",
    "The division of security duties between AWS (security of the cloud) and the customer (security in the cloud)."
   ],
   [
    "Security of the cloud",
    "AWS's responsibility for the physical facilities, hardware, network and virtualization layer that run AWS services."
   ],
   [
    "Security in the cloud",
    "The customer's responsibility for data, identities, configurations, guest operating systems and applications."
   ],
   [
    "Hypervisor",
    "The virtualization layer that isolates instances on shared hardware; AWS secures it."
   ],
   [
    "Shared control",
    "A control where AWS and the customer each handle their own layer, such as patch or configuration management."
   ],
   [
    "Inherited control",
    "A control fully provided by AWS that the customer inherits, such as physical and environmental security."
   ],
   [
    "Guest operating system",
    "The operating system running inside your EC2 instance, which you install, configure and patch."
   ]
  ],
  "example": "An auditor asks a fintech company how it protects its servers against physical theft. The company downloads AWS's third-party audit reports to show that data center physical security is AWS's responsibility and is independently audited. For the controls in its own scope, it shows its IAM policies, encryption settings, patching records for its EC2 operating systems and security group rules, because those are security in the cloud.",
  "mistakes": [
   [
    "\"The service is managed, so the customer has no security duties.\"",
    "Managed services shift the infrastructure and software layers to AWS, but your data, IAM permissions and configuration choices are always yours, whatever the service."
   ],
   [
    "\"AWS patches the operating system on my EC2 instances.\"",
    "AWS patches the host and hypervisor. The guest operating system inside your instance is yours to patch, even if you automate it with an AWS tool."
   ],
   [
    "\"Patch management is AWS's job\" (or \"the customer's job\").",
    "Patch management is a shared control: AWS patches its infrastructure and managed services, and you patch your guest operating systems and applications. Pick \"shared\" when the question names the control in general."
   ],
   [
    "\"If AWS's tools warn me about a risky setting, AWS will fix it.\"",
    "Trusted Advisor and Security Hub point out problems, but acting on them is the customer's job. AWS does not change your configuration for you."
   ]
  ],
  "tryit": [
   [
    "Night operator Priya at Lakeside Logistics notices a former contractor's IAM user still has administrator access eight months after the contract ended. Her colleague says AWS should have disabled it automatically, since AWS is responsible for security. Who owns this problem, and what should Priya do?",
    "The customer owns it. Managing IAM users and permissions is security in the cloud. Priya should disable or delete the user's credentials, review CloudTrail for any recent activity by that user, and add an offboarding step so access is removed when contracts end."
   ],
   [
    "An auditor asks Seaside Clinics to prove that failed hard drives holding patient data are destroyed securely. Seaside runs everything on Amazon EC2 and Amazon S3. Where does the evidence come from?",
    "From AWS. Secure disposal of storage hardware is part of security of the cloud, an inherited control. Seaside can download AWS's third-party audit reports (for example through AWS Artifact) as evidence for that control."
   ]
  ],
  "tip": "Customer data, IAM permissions, security group rules and guest operating system patching are always the customer's job. Physical security, hardware disposal, the global network and the hypervisor are always AWS's.",
  "check": [
   [
    "Who is responsible for patching the guest operating system on an EC2 instance?",
    "The customer, because the guest OS is part of security in the cloud."
   ],
   [
    "Who is responsible for the physical security of AWS data centers?",
    "AWS, as part of security of the cloud."
   ],
   [
    "Give an example of a shared control.",
    "Patch management: AWS patches its infrastructure and managed services, while the customer patches its guest operating systems and applications (configuration management and training are also shared)."
   ],
   [
    "A customer's S3 bucket is accidentally made public. Whose responsibility was the misconfiguration?",
    "The customer's, because configuring access to its own data is security in the cloud."
   ],
   [
    "What is an inherited control?",
    "A control fully provided by AWS that the customer inherits and can point auditors to, such as physical and environmental security of data centers."
   ]
  ]
 },
 {
  "t": "How responsibilities shift across Amazon EC2, Amazon RDS, AWS Lambda and Amazon S3",
  "hook": "At Pinecrest Outfitters, Marco has just inherited four workloads: a web app on Amazon EC2, an order database on Amazon RDS, image resizing on AWS Lambda and product photos in Amazon S3. A vulnerability bulletin lands in his inbox at 8 a.m.: a critical flaw in a popular operating system package and a common database engine. His manager asks a simple question before the stand-up: \"Which of these do we have to patch ourselves, and which will AWS handle?\" Marco realizes the answer is different for every service. How does he tell them apart quickly?",
  "simple": "Think of the different ways you can get dinner. If you buy groceries and cook, you do everything: shopping, cooking, cleaning. If you order from a meal kit service, some work is done for you, but you still cook. If you go to a restaurant, the kitchen does almost everything, but you still choose what to order and who sits at your table. AWS services work like this. With Amazon EC2 (rented virtual computers) you look after almost everything yourself. With Amazon RDS (a managed database) AWS handles more. With AWS Lambda (run code without servers) and Amazon S3 (file storage) AWS handles even more. In every case, though, your data and who can reach it stay your job.",
  "body": [
   "The shared responsibility model is not one fixed line. The more AWS manages for you, the more responsibility moves to AWS and the less remains with you. Comparing four common services makes the shift clear, and the exam often asks 'who does what' for exactly these: Amazon Elastic Compute Cloud (Amazon EC2), Amazon Relational Database Service (Amazon RDS), AWS Lambda and Amazon Simple Storage Service (Amazon S3). The useful mental picture is a layered stack, with physical facilities at the bottom and your data at the top, and each service drawing the line between AWS and you at a different height.",
   "Amazon EC2 is infrastructure as a service (IaaS). AWS secures the physical host, the network and the hypervisor. You are responsible for almost everything above that: choosing and patching the guest operating system, installing and updating applications, configuring any host-based firewall and your security groups, managing AWS Identity and Access Management (IAM) permissions and key pairs, and protecting, encrypting and backing up your data. EC2 gives you the most control and therefore the most responsibility. AWS Systems Manager Patch Manager can automate operating system patching, but deciding to use it and configuring it is still your job. In practice that means a Monday morning vulnerability bulletin for an operating system package is your ticket to work on if the affected server is an EC2 instance.",
   "Amazon RDS is a managed database service. AWS takes on the database host's operating system, installing the database engine, applying engine and OS patches during a maintenance window you choose, running automated backups and handling Multi-AZ failover when you enable it. You still manage who can connect (security groups, database users and IAM database authentication where supported), whether storage is encrypted, which parameter settings and backup retention period you choose, whether the instance is publicly accessible, and the data and queries themselves. You cannot log in to the operating system of a standard RDS instance, which is a clue that the OS is AWS's job. In the console, the RDS maintenance settings show the weekly window you picked and any pending engine upgrades, which is a visible reminder of where AWS's work begins.",
   "AWS Lambda is serverless compute. You upload your function code and AWS runs it when an event arrives, so AWS handles the servers, operating system, runtime patching for managed runtimes, scaling and availability across Availability Zones. Your responsibility shrinks to your function code and its third-party dependencies, the IAM execution role and its permissions, configuration such as environment variables and network access, secrets handling, and the data your code processes. If your code includes a vulnerable library, patching that library is your responsibility, not AWS's. In other words, AWS keeps the kitchen running, but the recipe and the ingredients you bring are yours.",
   "Amazon S3 is an abstracted storage service. AWS manages the storage infrastructure, durability and availability. You are responsible for your objects and their classification, bucket policies and access control, S3 Block Public Access settings, encryption choices beyond the default, versioning, Object Lock and lifecycle rules, and logging of access. A quick way to check one of your settings from the command line is `aws s3api get-public-access-block --bucket my-bucket`, which shows whether public access is blocked for that bucket. The pattern across all four is a sliding line. From EC2 to RDS to Lambda and S3, AWS owns more layers: first the hardware, then the operating system and database engine, then the runtime and scaling. What never moves is at the top of the stack: your data, your identities and permissions, and your configuration choices. A useful habit is to draw the stack for any service, from facilities at the bottom to data at the top, and mark where AWS stops.",
   "Consider a worked example. A team runs its website on EC2 with a MySQL database on the same instance. A security review finds the OS unpatched for months and backups untested. The team moves the database to RDS so AWS patches the engine and runs automated backups, and moves image processing to Lambda so there is no server to patch. Their remaining duties are IAM roles, security group rules, encryption settings, their code and their data. Notice what moved and what did not. The team's patching and backup burden shrank dramatically, but none of the work on identities, data or access went away.",
   "Common mistakes: assuming AWS patches the guest OS on EC2 because AWS 'owns the server'; assuming RDS means you no longer control network access or encryption; assuming Lambda removes all security work, when function code, dependencies and the execution role are still yours; and assuming S3 buckets are secured by AWS automatically. S3 blocks public access by default for new buckets and encrypts new objects by default, but anyone with permission can change those settings, and managing them is your responsibility.",
   "Exam questions usually name a service and a task. 'Who patches the operating system of an EC2 instance?' is the customer. 'Who patches the database engine on RDS?' is AWS, within the maintenance window you set. 'Who manages the underlying servers for Lambda?' is AWS. 'Who configures S3 bucket policies or encryption?' is the customer. When the options include a data or access task for any service, the answer is the customer; when they include hardware, facilities or the hypervisor, the answer is AWS."
  ],
  "analogy": "Picture housing options. Owning a house (EC2) means you fix the roof, the plumbing and the locks. Renting a managed apartment (RDS) means the building staff handles the boiler and repairs, but you still lock your door and choose who gets a key. Staying in a hotel (Lambda or S3) means nearly everything is handled, but you still guard your belongings and your room key. The analogy breaks down slightly with S3: there is no room to clean at all, yet bucket policies and Block Public Access are entirely your settings, which is why public buckets are a customer failure.",
  "terms": [
   [
    "Infrastructure as a service (IaaS)",
    "A model where the provider supplies virtual compute, storage and networking and the customer manages the operating system and above."
   ],
   [
    "Managed service",
    "A service where AWS operates the underlying infrastructure and software, such as the OS and database engine for Amazon RDS."
   ],
   [
    "Serverless",
    "A model such as AWS Lambda where AWS manages servers, runtime and scaling and you provide code and configuration."
   ],
   [
    "Maintenance window",
    "A weekly time period you choose during which AWS applies patches to managed resources such as RDS instances."
   ],
   [
    "Execution role",
    "The IAM role a Lambda function assumes to get permissions to other AWS services."
   ],
   [
    "S3 Block Public Access",
    "Account- and bucket-level settings that prevent S3 data from being made public, which the customer controls."
   ]
  ],
  "example": "A startup is asked by an investor who is responsible for patching. For its EC2 application servers, the startup patches the OS with Systems Manager Patch Manager every week. For its Amazon RDS for PostgreSQL database, AWS patches the engine during a Sunday maintenance window the startup chose. For its Lambda functions, AWS handles the runtime while the startup scans and updates its code dependencies. For S3, the startup owns bucket policies and Block Public Access settings.",
  "mistakes": [
   [
    "\"AWS owns the server, so AWS patches the EC2 operating system.\"",
    "EC2 is IaaS. AWS secures the host and hypervisor; the guest OS and everything above it are the customer's to patch."
   ],
   [
    "\"With RDS I no longer control network access or encryption.\"",
    "AWS runs the OS and engine, but security groups, database users, public accessibility and storage encryption remain customer settings."
   ],
   [
    "\"Lambda is serverless, so there is no security work left.\"",
    "Function code, third-party libraries, the execution role, environment variables and secrets handling are still the customer's responsibility."
   ],
   [
    "\"S3 buckets are secured by AWS automatically.\"",
    "New buckets block public access and encrypt new objects by default, but anyone with permission can change those settings, and managing them is the customer's job."
   ]
  ],
  "tryit": [
   [
    "Tess at Ridgeway Insurance learns that a library her team bundles inside several AWS Lambda functions has a critical vulnerability. A teammate says there is nothing to do because Lambda is serverless and AWS patches everything. Is the teammate right?",
    "No. AWS patches the servers, operating system and managed runtime, but third-party dependencies packaged with the function code are the customer's responsibility. Tess's team must update the library and redeploy the functions."
   ],
   [
    "Ridgeway's database team wants to stop patching the operating system of the EC2 instance that runs their PostgreSQL database, but they still need full control over who can connect. Which service fits, and what remains their job?",
    "Amazon RDS for PostgreSQL. AWS takes over the host OS, engine installation, patching in the chosen maintenance window and automated backups. The team still manages security groups, database users, encryption settings, public accessibility, backup retention and the data itself."
   ]
  ],
  "tip": "The operating system is the key signal: on EC2 you patch it; on RDS and Lambda AWS does. In every service, you configure access and protect your data.",
  "check": [
   [
    "On Amazon RDS, who patches the database engine?",
    "AWS, during the maintenance window the customer selects."
   ],
   [
    "On AWS Lambda, what security responsibilities remain with the customer?",
    "The function code and its dependencies, the IAM execution role and its permissions, configuration, and the data the function processes."
   ],
   [
    "Which of EC2, RDS, Lambda and S3 leaves the customer the most responsibility, and why?",
    "EC2, because it is infrastructure as a service and the customer manages the guest OS, applications and network configuration."
   ],
   [
    "Who is responsible for the S3 bucket policy on a bucket holding customer data?",
    "The customer, because access configuration and data protection are always customer responsibilities."
   ]
  ]
 },
 {
  "t": "Compliance and governance: AWS Artifact, AWS Audit Manager, AWS Config and where to find compliance information",
  "hook": "Eleanor, the compliance officer at Bayview Family Clinics, slides a checklist across the table to you. The annual audit is in six weeks, the clinic now runs its patient portal on AWS, and the auditor wants three things: proof that AWS's data centers meet recognized standards, a signed agreement covering health data, and evidence that your own cloud resources are configured to policy all year, not just this week. Last year the team spent a month collecting screenshots. You suspect AWS has tools for each of these. Which one answers which request?",
  "simple": "Imagine renting a commercial kitchen for a bakery. The health inspector wants to know two things: is the building itself safe, and are you following food safety rules in your own work? The building owner can hand you their inspection certificates. You still have to show your own fridge temperatures and cleaning logs. In AWS, AWS Artifact is where you download AWS's certificates and sign agreements with AWS. AWS Config keeps a running record of how your own cloud settings look and checks them against rules, like a fridge thermometer that logs every reading. AWS Audit Manager gathers your evidence into one folder so the inspection goes quickly.",
  "body": [
   "Regulated organizations must prove that their systems meet standards such as the Payment Card Industry Data Security Standard (PCI DSS) for card payments, the Health Insurance Portability and Accountability Act (HIPAA) for United States health data, or ISO/IEC 27001 for information security management. In the cloud, compliance is shared just like security: AWS proves its infrastructure meets these standards, and you prove your own workloads do. Several AWS services help with each side, and the exam tests which one fits which need. Keeping the two sides separate in your head is the key to this topic: some tools give you AWS's evidence, and others help you produce your own.",
   "AWS Artifact is the self-service portal in the AWS Management Console for AWS's own compliance documents, available at no cost. It has two parts. Artifact Reports gives you on-demand access to AWS security and compliance reports produced by third-party auditors, such as System and Organization Controls (SOC) reports, PCI DSS attestations and ISO certifications, which you can hand to your own auditors as evidence that AWS's side is covered. Artifact Agreements lets you review, accept and manage agreements with AWS, such as the Business Associate Addendum (BAA) needed when you handle protected health information under HIPAA, for one account or for all accounts in an organization. Think of Artifact as a filing cabinet that AWS keeps stocked; you take documents out of it, but it never looks at your resources.",
   "AWS Audit Manager helps you audit your own AWS usage. You choose a framework, either a prebuilt one mapped to a standard or regulation, or a custom one, and create an assessment. Audit Manager then continuously collects evidence from your accounts, such as configuration snapshots, AWS CloudTrail activity, AWS Config rule results and AWS Security Hub checks, and organizes it by control. When the audit arrives, you generate an assessment report instead of spending weeks gathering screenshots and spreadsheets. Some controls, such as a documented training policy, cannot be collected automatically, so you can upload manual evidence alongside the automated items and delegate review of individual controls to their owners. Audit Manager helps you prepare; it does not certify you as compliant. In the console, an assessment shows each control with a count of evidence items collected, so you can see at a glance which controls still need attention.",
   "AWS Config records the configuration of your AWS resources and how it changes over time. You can see what a security group looked like last Tuesday and, combined with CloudTrail, who changed it. Config rules evaluate resources against desired settings, for example 's3-bucket-public-read-prohibited' or 'encrypted-volumes', and flag noncompliant resources; conformance packs bundle many rules into one deployable set. Config can also trigger automatic remediation through Systems Manager Automation. From the CLI, `aws configservice describe-compliance-by-config-rule` shows which rules are passing and failing. Each evaluation produces a clear result, compliant or noncompliant, and the configuration timeline lets you scroll back to see exactly when a resource drifted out of policy.",
   "For general information, the AWS Compliance Programs pages list the standards AWS participates in, and the Services in Scope pages show which AWS services are covered by which program, which matters because not every service is in scope for every standard. The AWS Customer Compliance Center, whitepapers and quick start guides explain how to meet requirements. For governance at scale, AWS Organizations with service control policies (SCPs) and AWS Control Tower with its preventive and detective controls help keep many accounts inside the rules. Checking scope before you build saves painful redesigns later, because using a service that is not in scope for your standard can leave a gap that no amount of configuration will close.",
   "Consider a worked example. A clinic group is moving a patient portal to AWS. Its compliance officer accepts the BAA in AWS Artifact Agreements and downloads the latest SOC 2 report from Artifact Reports for the auditors. Engineers check the Services in Scope page to confirm each service they plan to use is HIPAA eligible. They deploy an AWS Config conformance pack that flags unencrypted volumes and public buckets, and set up an Audit Manager assessment so evidence is collected continuously for the annual audit.",
   "Common mistakes: thinking AWS Artifact checks your own resources (it only holds AWS's documents and agreements); thinking AWS Config is a threat detection service (it evaluates configurations, while Amazon GuardDuty detects threats); assuming that because AWS is certified for a standard, your workload is automatically compliant (you must still configure your part correctly); and confusing Config, which records and evaluates resource settings, with CloudTrail, which records API calls. Config tells you what the resource looks like; CloudTrail tells you who called which API.",
   "Exam wording is usually a clear hint. 'Download AWS's SOC or PCI reports' or 'accept a BAA' is AWS Artifact. 'Continuously collect evidence for an audit' or 'map AWS usage to a compliance framework' is AWS Audit Manager. 'Track configuration changes over time', 'evaluate resources against rules' or 'is this resource compliant with our policy?' is AWS Config. 'Which services are covered by a compliance program?' is the AWS Services in Scope information."
  ],
  "analogy": "Think of renting office space in an accredited building. The landlord's fire inspection certificate is like AWS Artifact: proof about the building, which you show visitors but which says nothing about how you run your office. A smoke detector that records every reading in your own office is AWS Config: it watches your space and alerts when something is out of line. A paralegal who keeps a binder of all your safety records, sorted by regulation, is Audit Manager. The analogy stops at one point: Audit Manager prepares the binder, but neither it nor AWS can declare you compliant; only your auditor can.",
  "terms": [
   [
    "AWS Artifact",
    "A self-service portal for AWS's third-party audit reports and agreements such as the BAA."
   ],
   [
    "Business Associate Addendum (BAA)",
    "An agreement required under HIPAA before handling protected health information on AWS, accepted through Artifact Agreements."
   ],
   [
    "AWS Audit Manager",
    "A service that continuously collects evidence from your AWS usage and maps it to compliance frameworks."
   ],
   [
    "AWS Config",
    "A service that records resource configurations over time and evaluates them against rules."
   ],
   [
    "Config rule",
    "A check that marks resources compliant or noncompliant with a desired configuration."
   ],
   [
    "Conformance pack",
    "A deployable collection of AWS Config rules and remediation actions."
   ],
   [
    "Services in Scope",
    "AWS information listing which services are covered by each compliance program."
   ]
  ],
  "example": "An online payment processor preparing for its PCI DSS assessment downloads AWS's PCI attestation from Artifact to cover the infrastructure layer. It runs an Audit Manager assessment against a PCI framework that has been gathering evidence all year, and its AWS Config rules show two security groups that allowed unrestricted inbound access. Config's history shows when they changed, CloudTrail shows who changed them, and the team fixes them before the assessor arrives.",
  "mistakes": [
   [
    "\"AWS Artifact will check whether my resources are compliant.\"",
    "Artifact only holds AWS's own reports and agreements. To evaluate your resources, use AWS Config; to collect audit evidence, use Audit Manager."
   ],
   [
    "\"AWS Config detects attackers.\"",
    "Config records and evaluates configurations. Detecting malicious activity is Amazon GuardDuty's job."
   ],
   [
    "\"AWS is PCI DSS certified, so my application is compliant.\"",
    "AWS's attestation covers its infrastructure. Your workload must still be configured and operated to meet the standard."
   ],
   [
    "\"Config and CloudTrail do the same thing.\"",
    "Config shows what a resource looked like and whether it meets your rules; CloudTrail shows who called which API and when. They are often used together."
   ]
  ],
  "tryit": [
   [
    "Raj at Northgate Pharmacy is told by the security lead that every Amazon EBS volume must be encrypted, and that the team must be alerted when an unencrypted one appears. A colleague suggests downloading a report from AWS Artifact each week. Is that the right tool?",
    "No. Artifact contains AWS's documents, not information about Northgate's resources. Raj should use AWS Config with a rule that checks EBS volumes for encryption, optionally deployed as part of a conformance pack, and can add automatic remediation through Systems Manager Automation."
   ],
   [
    "Northgate plans to start processing protected health information on AWS. Before uploading any records, what should the compliance team do in AWS, and where?",
    "Accept the Business Associate Addendum in AWS Artifact Agreements, and check the Services in Scope information to confirm each planned service is HIPAA eligible. Then configure those services appropriately, because AWS's agreement does not make the workload compliant on its own."
   ]
  ],
  "tip": "Artifact holds AWS's compliance reports and agreements; it does not assess your resources. To check whether your own resources meet a configuration standard, use AWS Config; to gather audit evidence, use Audit Manager.",
  "check": [
   [
    "Where do you download AWS's SOC reports to give to your auditors?",
    "AWS Artifact, in Artifact Reports."
   ],
   [
    "A company must flag any EBS volume that is not encrypted. Which service?",
    "AWS Config, using a rule that evaluates volumes for encryption."
   ],
   [
    "What does AWS Audit Manager do?",
    "It continuously collects evidence from your AWS accounts and organizes it against a compliance framework to prepare for audits."
   ],
   [
    "Does AWS holding a PCI DSS attestation make your application PCI compliant?",
    "No. It covers AWS's infrastructure; you must still configure and operate your own workload to meet the standard."
   ],
   [
    "How do you find out whether a particular AWS service is covered by a compliance program?",
    "Check the AWS Services in Scope information for that program."
   ]
  ]
 },
 {
  "t": "Encryption at rest and in transit: AWS KMS, AWS CloudHSM and AWS Certificate Manager",
  "hook": "It is 11:40 p.m. on a holiday Friday at Juniper Books, and the online store is down. Customers see a browser warning that the connection is not private. Sam, on call, digs in and finds the cause: the site's TLS certificate expired an hour ago, and the person who renewed it last year has left. On Monday, the CTO wants a plan so this never happens again, along with an answer from the auditors about whether order data on disk is encrypted and who can read it. Which AWS services solve each of these problems?",
  "simple": "Encryption scrambles information so only someone with the right key can unscramble it. You need it in two situations. When data is sitting still, like files saved on a disk, that is \"at rest.\" When data is traveling, like your credit card number going from your phone to a website, that is \"in transit,\" and the padlock icon in your browser means it is protected. AWS Key Management Service (KMS) creates and guards the keys used to lock stored data. AWS CloudHSM gives you your own dedicated key-safe hardware if rules require it. AWS Certificate Manager (ACM) hands out and renews the certificates that make the browser padlock work.",
  "body": [
   "Encryption protects data so that only someone with the right key can read it. You need it in two places. Encryption at rest protects stored data, such as objects in Amazon Simple Storage Service (Amazon S3), volumes in Amazon Elastic Block Store (Amazon EBS) or rows in a database. Encryption in transit protects data moving across a network, usually with Transport Layer Security (TLS), which is what HTTPS uses. The Cloud Practitioner exam asks you to choose among three services that support these: AWS Key Management Service, AWS CloudHSM and AWS Certificate Manager. Keeping \"at rest\" and \"in transit\" straight is half the battle on these questions, because ACM helps only with data in transit, while KMS and CloudHSM handle the keys that protect data wherever it is stored.",
   "AWS Key Management Service (AWS KMS) is the managed service for creating and controlling encryption keys. Most AWS services that store data integrate with KMS, so encrypting an EBS volume or an S3 bucket is often a single setting. KMS keys never leave the service unencrypted; they are protected by hardware security modules that AWS operates and that are validated under the FIPS 140 standard. You control who can use each key through key policies and IAM policies, and every use of a key is logged in AWS CloudTrail, which gives you an audit trail of who decrypted what. That logging is valuable during an investigation, because you can show exactly which role used the key and when, rather than guessing who might have read the data.",
   "KMS has three kinds of keys worth knowing. AWS owned keys are used by AWS services internally and are invisible to you. AWS managed keys are created in your account by a service, with aliases such as `aws/s3` or `aws/ebs`, and AWS manages their rotation. Customer managed keys are keys you create and control, including their key policy, automatic rotation and scheduled deletion; for example `aws kms create-key --description \"payroll data\"`. Choose customer managed keys when you need to control access to the key itself, separate duties or audit use in detail.",
   "AWS CloudHSM provides dedicated hardware security modules (HSMs) in the AWS Cloud. An HSM is a tamper-resistant device that stores keys and performs cryptographic operations. With CloudHSM, the HSMs in your cluster are single-tenant and you manage the keys and HSM users yourself; AWS manages the hardware but cannot access your keys. Organizations choose CloudHSM when a regulation or contract requires dedicated hardware under their exclusive control, or when an application needs standard interfaces such as PKCS#11, Java Cryptography Extension (JCE) or Microsoft CryptoAPI. KMS is simpler and integrated with more services; CloudHSM gives more control but more operational work. In shared responsibility terms, CloudHSM moves more work to you: you manage users, keys and high availability planning for your cluster, in exchange for exclusive control.",
   "AWS Certificate Manager (ACM) provisions, manages and deploys TLS certificates for encryption in transit. You request a public certificate for a domain, for example with `aws acm request-certificate --domain-name www.example.com --validation-method DNS`, prove you control the domain through DNS or email validation, and attach the certificate to integrated services such as Elastic Load Balancing, Amazon CloudFront or Amazon API Gateway. Public certificates from ACM for these integrated services are provided at no additional charge, and ACM renews them automatically, removing the classic outage caused by a forgotten expiry date. Behind the scenes, ACM validates that you control the domain and then handles the renewal cycle, which is exactly the kind of repetitive task people forget.",
   "Consider a worked example. A health startup must encrypt patient records at rest and in transit and show auditors who accessed the keys. It creates a customer managed KMS key with a key policy that lets only the application role use it, enables automatic rotation, and sets its S3 bucket and RDS database to use that key. CloudTrail logs every decrypt call. It requests an ACM certificate for its domain and attaches it to its Application Load Balancer, so browsers connect over HTTPS. A partner bank with a contractual requirement for dedicated HSMs uses CloudHSM instead.",
   "Common mistakes: thinking ACM encrypts data at rest (it provides certificates for data in transit); thinking KMS keys can be exported in plaintext (they cannot); choosing CloudHSM when the question only asks for easy, integrated encryption (KMS is the answer); and assuming default encryption removes all your duties. Many services now encrypt by default, for example new objects in S3 are encrypted automatically, but deciding what else to encrypt, which keys to use and who can use them remains a customer responsibility under the shared responsibility model.",
   "Exam questions hinge on keywords. 'Create and manage encryption keys integrated with AWS services' or 'audit key usage with CloudTrail' is KMS. 'Dedicated, single-tenant HSM', 'FIPS-validated hardware under the customer's exclusive control' or 'AWS must not have access to the keys' is CloudHSM. 'SSL/TLS certificates', 'HTTPS for a load balancer' or 'automatic certificate renewal' is ACM. 'Protect data stored on disk' means at rest; 'protect data moving between client and server' means in transit."
  ],
  "analogy": "Think of a bank. KMS is like the bank's safe deposit service: the bank runs the vault and the hardware, you decide who is on the access list, and every visit is signed in a logbook (CloudTrail). CloudHSM is like buying your own private vault installed inside the bank: the bank keeps the building secure, but only you have the combination. ACM is like the armored truck's official papers that prove to everyone the truck carrying money between branches is genuine. The analogy has a limit: unlike a safe deposit box, you never take a KMS key home; keys do not leave KMS unencrypted.",
  "terms": [
   [
    "Encryption at rest",
    "Encrypting stored data such as S3 objects, EBS volumes and database storage."
   ],
   [
    "Encryption in transit",
    "Encrypting data as it moves across a network, usually with TLS."
   ],
   [
    "AWS Key Management Service (AWS KMS)",
    "A managed service for creating and controlling encryption keys, integrated with most AWS services."
   ],
   [
    "Customer managed key",
    "A KMS key you create and control, including its key policy, rotation and deletion."
   ],
   [
    "Hardware security module (HSM)",
    "A tamper-resistant device that stores keys and performs cryptographic operations."
   ],
   [
    "AWS CloudHSM",
    "A service providing dedicated, single-tenant HSMs whose keys the customer exclusively manages."
   ],
   [
    "AWS Certificate Manager (ACM)",
    "A service that provisions, deploys and automatically renews TLS certificates for AWS services."
   ],
   [
    "Transport Layer Security (TLS)",
    "The protocol that encrypts data in transit, used by HTTPS."
   ]
  ],
  "example": "An online retailer's certificate expired on a holiday weekend, taking the site offline for hours. After moving to AWS, it issues its certificates through ACM and attaches them to its load balancer and CloudFront distribution, and ACM renews them automatically. Order data in S3 and Amazon RDS is encrypted with a customer managed KMS key, and the security team reviews CloudTrail logs of key usage every month.",
  "mistakes": [
   [
    "\"ACM encrypts my data at rest.\"",
    "ACM provides TLS certificates for data in transit. Encryption of stored data uses keys from KMS or CloudHSM."
   ],
   [
    "\"I can export my KMS keys in plaintext for backup.\"",
    "KMS keys never leave the service unencrypted. You use them through KMS API calls."
   ],
   [
    "Choosing CloudHSM whenever encryption is mentioned.",
    "CloudHSM is for requirements of dedicated, single-tenant hardware under exclusive customer control. For easy, integrated encryption across AWS services, KMS is the answer."
   ],
   [
    "\"Default encryption means I have no encryption duties.\"",
    "Many services encrypt by default, but deciding what else to encrypt, which keys to use and who may use them stays with the customer."
   ]
  ],
  "tryit": [
   [
    "Ana at Cobalt Payroll must encrypt employee records in Amazon S3 and Amazon RDS. The auditors want to see who used the key and want to restrict use to a single application role. A regulation does not require dedicated hardware. Which option fits best?",
    "A customer managed key in AWS KMS. Ana can write a key policy that allows only the application role, enable automatic rotation and use CloudTrail logs to show every use of the key. CloudHSM would add operational work without a requirement for it."
   ],
   [
    "Cobalt's partner bank says its contract requires keys to live in single-tenant hardware that AWS cannot access, managed by the bank's own staff. What should the bank use?",
    "AWS CloudHSM, which provides dedicated, single-tenant HSMs where the customer manages keys and HSM users and AWS cannot access the keys."
   ]
  ],
  "tip": "'Managed keys integrated with AWS services' is KMS; 'dedicated, single-tenant HSM' or 'exclusive control of the hardware' is CloudHSM; 'SSL/TLS certificates' is ACM. ACM is for data in transit, not at rest.",
  "check": [
   [
    "What is the difference between encryption at rest and in transit?",
    "At rest protects stored data such as disks and objects; in transit protects data moving over a network, usually with TLS."
   ],
   [
    "A regulation requires single-tenant HSMs under the company's exclusive control. Which service?",
    "AWS CloudHSM."
   ],
   [
    "Which service issues and automatically renews TLS certificates for a load balancer?",
    "AWS Certificate Manager (ACM)."
   ],
   [
    "How can you see who used a KMS key to decrypt data?",
    "Every KMS key use is logged in AWS CloudTrail, so you review the CloudTrail events for that key."
   ],
   [
    "What is the difference between an AWS managed key and a customer managed key in KMS?",
    "An AWS managed key is created and managed by an AWS service in your account; a customer managed key is one you create and control, including its key policy, rotation and deletion."
   ]
  ]
 },
 {
  "t": "Protecting the root user: MFA, no access keys, and the tasks that require root credentials",
  "hook": "Monday, 7:15 a.m. at Willow Creek Animal Rescue. Jordan, the volunteer who looks after the rescue's small AWS account, opens an email titled \"Unusual sign-in to your AWS account\". The sign-in was to the root user, from a city nobody on the team has visited. The root password is the same one the founder has used for years, there is no second factor, and an old deployment script on a shared laptop holds root access keys. Jordan's stomach drops: whoever this is can do anything, including close the account. What should have been in place, and what does Jordan do first?",
  "simple": "When you open an AWS account, the email and password you sign up with become the \"root user.\" Root is like the master key to a whole building: it opens every door, including the office where the bills are paid, and nobody can take its powers away. Because it is so powerful, you protect it carefully and use it rarely. Turn on multi-factor authentication (MFA), which means needing a second proof, like a code on your phone or a small security key, as well as the password. Never create access keys for root, because those are like a copy of the master key that a program can use. For daily work, sign in with a less powerful identity, and keep root for the handful of jobs only it can do.",
  "body": [
   "When you create an AWS account, you sign in with the email address and password you used to sign up. That identity is the root user, and it has complete, unrestricted access to every resource and setting in the account, including billing and the ability to close the account. Permissions policies cannot limit the root user of a standalone account. Because it is so powerful, protecting it is one of the first things AWS asks you to do, and questions about it appear regularly on the Cloud Practitioner exam. The reason it matters so much is simple: anyone who controls root controls everything, and there is no policy you can write to take that power back in a standalone account.",
   "Enable multi-factor authentication (MFA) on the root user straight away. MFA requires a second factor in addition to the password, such as a passkey or FIDO security key, a virtual authenticator app that generates time-based codes, or a hardware token, so a stolen password alone is not enough. In the console you do this from the account menu under Security credentials > Multi-factor authentication (MFA) > Assign MFA device. Use a strong, unique password and keep the root email mailbox itself secure, since password resets go there. Registering more than one MFA device gives you a backup if one is lost. Phishing-resistant options such as passkeys and FIDO security keys are especially strong, because a fake sign-in page cannot capture a code that the key never displays.",
   "Do not create access keys for the root user. Access keys are long-term credentials, an access key ID and a secret access key, used for programmatic access through the AWS Command Line Interface (CLI) or software development kits (SDKs). Root access keys would give a script, or anyone who found them in a code repository, full control of the account. If root access keys exist, delete them. You can check quickly with `aws iam get-account-summary`, which reports `AccountMFAEnabled` and `AccountAccessKeysPresent` for the root user; you want 1 and 0 respectively. Leaked keys are one of the most common ways accounts are taken over, often within minutes of being pushed to a public repository, which is why the safest number of root access keys is zero.",
   "For everyday work, including administrative work, do not use the root user at all. Create administrative access through AWS IAM Identity Center or IAM roles with only the permissions needed, and sign in with those. Lock the root credentials away and monitor their use: an Amazon CloudWatch alarm or Amazon EventBridge rule on root sign-in events recorded by AWS CloudTrail tells you immediately if someone uses them. In AWS Organizations, administrators can also centrally manage root access for member accounts, removing root credentials from member accounts and performing the few privileged root tasks centrally when needed. Day to day, this means the root password and MFA device should be close to forgotten, kept in a safe or a company password vault with a documented process for the rare time they are needed.",
   "A small set of tasks can only be performed by the root user. Examples include changing account settings such as the account name, root email address and root password; closing the AWS account; restoring IAM permissions when the only IAM administrator has accidentally been locked out; viewing certain tax invoices; registering as a seller in the Reserved Instance Marketplace; enabling MFA delete on an S3 bucket; and editing or deleting an S3 bucket policy that denies all principals, including the account's administrators. AWS publishes the full list, and it has changed over time, so learn the pattern: account-level ownership and recovery actions need root. A good way to remember the pattern is that root-only tasks are about the account itself rather than the resources in it: who owns it, how it is reached, and whether it continues to exist.",
   "Consider a worked example. A small company's founder created the AWS account years ago and still signs in as root every day, and a root access key is stored in a deployment script. A security review flags both. The founder enables MFA with two security keys, deletes the root access key and replaces the script's credentials with an IAM role, creates an administrator permission set in IAM Identity Center for daily work, and sets an alarm on root sign-ins. The root password and MFA keys go into a safe, used only when a root-only task comes up.",
   "Common mistakes: believing the root user can be restricted by IAM policies in a standalone account (it cannot, though service control policies in AWS Organizations can restrict member accounts); thinking you need root to create IAM users, launch instances or view billing (IAM users and roles with the right permissions can do these); sharing root credentials among a team; and keeping root access keys 'for emergencies'. An emergency that truly needs root is handled by signing in to the console with the password and MFA, not with keys.",
   "Exam questions usually ask either how to protect the root user or which task requires it. 'Best practice for the root user' is enable MFA, do not create access keys, and use it only for tasks that require it. 'Which task requires root user credentials?' has answers like changing the root email or account name, closing the account, or restoring locked-out IAM permissions. Distractors such as 'create an IAM user', 'launch an EC2 instance' or 'view Cost Explorer' do not require root."
  ],
  "analogy": "The root user is like the original deed and master key to a building. You would not carry the master key on your daily key ring or make copies for contractors; you lock it in a safe and give each person a key that opens only the rooms they need. You take the master key out only for owner-level business, like selling the building or changing the locks after losing every other key. The analogy stops where AWS adds a twist: in AWS Organizations, the management account can apply service control policies that limit a member account's root user, something a building deed cannot do.",
  "terms": [
   [
    "Root user",
    "The identity created with a new AWS account that has unrestricted access to every resource and setting."
   ],
   [
    "Multi-factor authentication (MFA)",
    "Requiring a second factor, such as a security key or authenticator code, in addition to a password."
   ],
   [
    "Access keys",
    "Long-term credentials made of an access key ID and secret access key for programmatic access."
   ],
   [
    "Root-only task",
    "An account-level action, such as closing the account or changing the root email, that only the root user can perform."
   ],
   [
    "Centralized root access",
    "An AWS Organizations capability that lets administrators remove and manage root credentials for member accounts centrally."
   ],
   [
    "AWS CloudTrail",
    "The service that records API activity, including root user sign-ins, in an account."
   ]
  ],
  "example": "A nonprofit discovers that its AWS bill tripled overnight because an old root access key was committed to a public code repository and used to launch instances. After containing the incident with AWS Support, it deletes all root access keys, enables MFA on the root user, moves staff to IAM Identity Center with least-privilege permission sets and adds an alert on any root sign-in. The root credentials are now used only for rare account-level tasks.",
  "mistakes": [
   [
    "\"I can limit the root user with an IAM policy.\"",
    "IAM policies cannot restrict the root user of a standalone account. Only service control policies in AWS Organizations can restrict root in member accounts."
   ],
   [
    "\"You need root to create IAM users, launch instances or view billing.\"",
    "IAM identities with the right permissions can do all of these. Root is needed only for a short list of account-level tasks."
   ],
   [
    "\"Keep a root access key for emergencies.\"",
    "Root access keys are long-term credentials with unlimited power. A genuine root emergency is handled by signing in to the console with the password and MFA."
   ],
   [
    "\"Sharing the root password among the team is fine if it is strong.\"",
    "Shared root credentials remove accountability and widen exposure. Give each person their own identity with least privilege and keep root locked away."
   ]
  ],
  "tryit": [
   [
    "At Granite Valley Schools, the only IAM user with administrator permissions accidentally attached a policy that denies all IAM actions to itself, and now nobody can manage permissions. The IT lead asks whether they need to open a ticket with AWS or whether they can fix it themselves. What should they do?",
    "Sign in as the root user with its password and MFA and restore the IAM permissions. Restoring permissions when the only administrator is locked out is one of the tasks that requires root credentials. Afterwards, return the root credentials to safe storage."
   ],
   [
    "A developer at Granite Valley wants a root access key so a nightly backup script can run without permission problems. How should you respond?",
    "Decline. Instead, create an IAM role with only the permissions the script needs and let the script use its temporary credentials. Root access keys should never exist."
   ]
  ],
  "tip": "Protect root with MFA, delete any root access keys and use it only for root-only tasks. Changing the root email or account name, closing the account and restoring locked-out IAM permissions need root; creating IAM users or launching instances do not.",
  "check": [
   [
    "What two actions does AWS recommend first to protect the root user?",
    "Enable MFA on the root user and make sure it has no access keys (delete any that exist)."
   ],
   [
    "Which of these requires the root user: closing the account, creating an IAM user, or viewing Cost Explorer?",
    "Closing the account; the other two can be done by IAM identities with the right permissions."
   ],
   [
    "Why should the root user never have access keys?",
    "They are long-term credentials with unrestricted access, so if leaked they give an attacker full control of the account."
   ],
   [
    "What should administrators use for daily administrative work instead of root?",
    "Administrative access through IAM Identity Center or IAM roles with only the permissions they need."
   ]
  ]
 },
 {
  "t": "IAM users, groups, roles and policies, and the principle of least privilege",
  "hook": "A message pops up in the team chat at Maplewood Analytics: \"Who deleted the staging-reports bucket?\" Nobody admits to it, and it turns out nobody needed to. Every developer was given full administrator access on day one \"to keep things moving,\" and an automation script running under a developer's access keys removed the bucket during a cleanup run. Your manager, Lin, asks you to redesign access so this cannot happen again without slowing the team down. Where do you start, and which IAM building blocks do you reach for?",
  "simple": "AWS Identity and Access Management (IAM) answers two questions: who are you, and what are you allowed to do? A user is one person or program with its own login. A group is a bundle of users who share the same permissions, like a team badge. A role is a temporary badge that a person or an AWS service can put on for a while, so there is no permanent password to lose. A policy is the written list of what a badge allows. The guiding rule is least privilege: give everyone only the permissions they need for their job, like giving a cleaner a key to the lobby but not to the safe.",
  "body": [
   "AWS Identity and Access Management (IAM) controls who can sign in to your AWS account (authentication) and what they are allowed to do (authorization). IAM is a global service, not tied to a Region, and it is available at no additional charge. It is the heart of the customer's security responsibility, because nearly every security failure in AWS comes down to someone having access they should not have. IAM has four building blocks. An IAM user is an identity for one person or application, with long-term credentials: a password for the console and optionally access keys for the command line interface (CLI) and software development kits (SDKs). An IAM group is a collection of users; you attach permissions to the group, and every member inherits them. Groups cannot contain other groups, and a group is not an identity that can sign in. An IAM role is an identity with permissions but no long-term credentials. Instead, a trusted entity assumes the role and receives temporary credentials from AWS Security Token Service (AWS STS). Policies define the permissions themselves. Keeping these four straight, and knowing which one an exam scenario is pointing at, unlocks most IAM questions on the Cloud Practitioner exam.",
   "Roles are used by AWS services (for example an EC2 instance that needs to read from S3 uses an instance profile with a role), by users from another AWS account, and by people signing in through a central identity provider such as IAM Identity Center. AWS now recommends roles and temporary credentials over IAM users wherever possible, because temporary credentials expire on their own and there are no long-term keys to leak. Running `aws sts get-caller-identity` shows which user or role your current credentials belong to, which is handy when permissions behave unexpectedly. For an EC2 instance, the SDK on the server finds those temporary credentials automatically through the instance metadata, so your code never needs a key written into it.",
   "Permissions are defined in policies, which are JavaScript Object Notation (JSON) documents. Each statement has an Effect (Allow or Deny), one or more Actions (such as `s3:GetObject`), Resources identified by Amazon Resource Names (ARNs), and optional Conditions. By default everything is denied; an explicit Allow grants access, and an explicit Deny always overrides any Allow. Identity-based policies attach to users, groups and roles; resource-based policies, such as S3 bucket policies, attach to resources. AWS managed policies are prebuilt by AWS, and customer managed policies are ones you write and maintain. When a request arrives, AWS gathers every policy that applies, checks for any explicit Deny first, then looks for an Allow; if there is none, the default deny stands.",
   "```json\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": \"s3:GetObject\",\n    \"Resource\": \"arn:aws:s3:::example-reports/*\"\n  }]\n}\n```",
   "The principle of least privilege means granting only the permissions required to perform a task and nothing more. In practice: start with minimal permissions and add as needed, attach permissions to groups and roles rather than individual users, use conditions to narrow access (for example to a specific IP range or requiring MFA), and review access regularly. IAM Access Analyzer helps by finding resources shared outside your account, flagging unused access and generating policies based on actual CloudTrail activity. Requiring MFA for human users and avoiding or rotating long-term access keys round out IAM best practice. Least privilege is not a one-time setup. Teams change, projects end and permissions pile up, so a regular review that removes unused access is as important as the original design.",
   "Consider a worked example. Five analysts need read access to one reporting bucket. Instead of attaching the policy above to five users, you create an `Analysts` group, attach the policy to it and add the users, so a new analyst gets access by joining the group. A nightly job on an EC2 instance also needs to read the bucket; rather than storing access keys on the server, you attach a role to the instance, and the SDK picks up temporary credentials automatically.",
   "Common mistakes: storing access keys on EC2 instances or in code instead of using roles; attaching `AdministratorAccess` because it is quicker; thinking groups can be nested or can sign in; and forgetting that an explicit Deny anywhere wins over any Allow. People also confuse authentication (proving who you are, with a password, MFA or a role) with authorization (what a policy lets you do once you are known), and assume a new IAM user can do something simply because it can sign in. A new user with no policies can sign in to the console but cannot act on any resource.",
   "Exam questions usually test which building block fits. 'An AWS service such as EC2 or Lambda needs to access another AWS service' is an IAM role. 'Several people need the same permissions' is an IAM group. 'Define what actions are allowed on which resources' is a policy. 'Temporary credentials' or 'cross-account access' points to roles. 'Grant only the permissions needed' is least privilege, and 'find resources shared with external accounts' is IAM Access Analyzer."
  ],
  "analogy": "Think of an office building. An IAM user is an employee with a permanent ID badge. A group is a department, and badge permissions are set once for the whole department. A role is a visitor badge from the front desk: you sign for it, it works for a limited time, then it expires. A policy is the printed access list on the badge reader that says which doors open. The analogy stops working for groups in one respect: a department badge suggests a group can walk through doors on its own, but an IAM group cannot sign in; it only passes permissions to its members.",
  "terms": [
   [
    "IAM user",
    "An identity with long-term credentials representing one person or application."
   ],
   [
    "IAM group",
    "A collection of IAM users that share the permissions attached to the group."
   ],
   [
    "IAM role",
    "An identity with permissions that trusted entities assume to receive temporary credentials."
   ],
   [
    "IAM policy",
    "A JSON document that allows or denies actions on resources, optionally under conditions."
   ],
   [
    "Amazon Resource Name (ARN)",
    "A unique identifier for an AWS resource used in policies."
   ],
   [
    "Least privilege",
    "Granting only the minimum permissions required to perform a task."
   ],
   [
    "IAM Access Analyzer",
    "A tool that identifies external or unused access and helps generate least-privilege policies."
   ],
   [
    "AWS Security Token Service (AWS STS)",
    "The service that issues temporary credentials when a role is assumed."
   ]
  ],
  "example": "A development team gave every developer AdministratorAccess to move fast. After one developer accidentally deleted a production database, the company created groups for developers and operators with scoped policies, moved production changes behind a role that requires MFA to assume, and used IAM Access Analyzer's policy generation to build a least-privilege policy from what each team actually used over 90 days.",
  "mistakes": [
   [
    "Storing access keys on an EC2 instance or in code so the application can call S3.",
    "Attach an IAM role to the instance. It receives temporary credentials automatically, and there are no long-term keys to leak."
   ],
   [
    "\"IAM groups can be nested, and a group can sign in.\"",
    "Groups only hold users and pass their permissions to members. They cannot contain other groups and are not identities."
   ],
   [
    "\"If any policy allows the action, it is allowed.\"",
    "An explicit Deny in any applicable policy overrides every Allow. Without any Allow, the default is deny."
   ],
   [
    "\"A new IAM user who can sign in can use resources.\"",
    "Signing in is authentication. Without attached permissions, a new user cannot act on any resource; authorization comes from policies."
   ]
  ],
  "tryit": [
   [
    "Kendra at Brightwater Labs has six data scientists who all need the same read access to three S3 buckets, and new hires arrive monthly. She is about to attach the same policy to each of the six users. What would you suggest, and why?",
    "Create an IAM group such as DataScience, attach the policy to the group and add the users. New hires get access by joining the group, permissions stay consistent and removing a person is one change. This also makes least-privilege reviews simpler."
   ],
   [
    "A Lambda function at Brightwater needs to write items to one DynamoDB table. A teammate proposes giving the function an access key from an admin user. What is the better design?",
    "Give the function an execution role with a policy allowing only the needed write actions on that one table's ARN. The role supplies temporary credentials, and the narrow policy follows least privilege."
   ]
  ],
  "tip": "An AWS service that needs to call another AWS service should use an IAM role, never stored access keys. Several people needing the same permissions means an IAM group. An explicit Deny always overrides an Allow.",
  "check": [
   [
    "An application on EC2 needs to read from S3. What is the recommended way to give it permissions?",
    "Attach an IAM role to the instance so it receives temporary credentials; do not store access keys on the server."
   ],
   [
    "Can an IAM group sign in or contain other groups?",
    "No. A group is only a way to attach permissions to many users; it cannot sign in and cannot be nested."
   ],
   [
    "If one policy allows s3:DeleteObject and another explicitly denies it, what happens?",
    "The action is denied, because an explicit Deny always overrides an Allow."
   ],
   [
    "What is the principle of least privilege?",
    "Granting only the permissions needed to perform a task and nothing more."
   ],
   [
    "Is IAM tied to a specific AWS Region?",
    "No. IAM is a global service, and it is available at no additional charge."
   ]
  ]
 },
 {
  "t": "Workforce single sign-on with AWS IAM Identity Center and customer sign-in with Amazon Cognito",
  "hook": "At Saltmarsh Games, Wednesday brings two very different requests to your desk. HR says 40 new contractors start next week and each needs access to three of the studio's 25 AWS accounts, and they are tired of creating separate passwords that nobody remembers to remove. Meanwhile, the product team wants players of the new mobile game to sign up in seconds with their Apple or Google accounts, and expects millions of them. A colleague suggests solving both with IAM users. You are fairly sure that is wrong. Which service fits which audience?",
  "simple": "Two kinds of people need to sign in. Your staff need to get into the company's AWS accounts and work tools. Your customers need to log in to the app you built. AWS has a different service for each. AWS IAM Identity Center is for staff: they sign in once with their normal work login and can reach every AWS account they are allowed to use, like a staff ID card that opens the right doors. Amazon Cognito is for your app's customers: it handles sign-up, passwords and \"Sign in with Google\" style buttons, like the membership desk at a gym that handles thousands of members.",
  "body": [
   "Two very different groups of people need to sign in to things you build on AWS. Your workforce, meaning employees and contractors, needs to access AWS accounts and business applications. Your customers, the end users of your web and mobile apps, need to sign up and sign in to those apps. AWS has a separate service for each audience, and the exam tests whether you can tell which is which. Mixing them up is one of the most common exam traps, so it helps to ask one question first: is this person working for us, or using what we built?",
   "AWS IAM Identity Center (the successor to AWS Single Sign-On) is the recommended way to give your workforce access to AWS. Single sign-on (SSO) means people sign in once and reach many accounts and applications without separate passwords. Identity Center connects to one identity source: its own built-in directory, Microsoft Active Directory, or an external identity provider (IdP) such as Microsoft Entra ID or Okta, typically using Security Assertion Markup Language (SAML) 2.0 and automatic user provisioning. Users sign in to an AWS access portal and see every AWS account and role they are allowed to use, plus integrated business applications. The practical win is that people have one set of corporate credentials, protected by the company's existing MFA, instead of a separate AWS password per account.",
   "Access in Identity Center is defined with permission sets, which are collections of IAM policies, for example 'ReadOnly' or 'DatabaseAdmin'. You assign a user or group a permission set in one or more accounts, and Identity Center creates the matching IAM role in each account. Users get temporary credentials, so there are no long-lived IAM user passwords or access keys to manage, and removing someone from the corporate directory removes their AWS access. It works especially well with AWS Organizations, where you assign access across many accounts from one place. Developers can use the same sign-in on the command line with `aws configure sso` followed by `aws sso login`. For security teams, this is the main attraction: access is granted and removed in one place, and nobody holds long-term AWS keys that could be forgotten on a laptop.",
   "Amazon Cognito provides sign-up, sign-in and access control for your own web and mobile applications, and it scales to very large numbers of users. A Cognito user pool is a user directory for your app: it handles registration, sign-in, email or phone verification, password reset, MFA and federated sign-in through social providers (such as Google, Apple, Facebook or Amazon) or enterprise SAML and OpenID Connect (OIDC) providers. After sign-in it returns JSON Web Tokens (JWTs) your application and APIs can trust. A Cognito identity pool exchanges those tokens, or even guest access, for temporary AWS credentials, so a mobile app can, for example, upload a photo directly to S3 with tightly limited permissions. Because Cognito is built for customer scale, you do not create anything in IAM per customer; your app's users live in the user pool, separate from your staff directory.",
   "The key distinction is who is signing in and to what. Employees signing in to the AWS console, CLI or many AWS accounts use IAM Identity Center. End users signing in to your product use Cognito. Neither replaces IAM itself; both ultimately rely on IAM roles and policies to grant AWS permissions. Both also support federation, which means trusting identities managed by an external identity provider rather than creating separate accounts, but for different audiences: corporate directories for Identity Center, social and customer identity providers for Cognito.",
   "Consider a worked example. A game studio has 200 staff and 30 AWS accounts. It connects IAM Identity Center to its existing Okta directory and creates permission sets for developers, testers and finance, so staff sign in once with their corporate credentials and pick the account they need. Its new mobile game needs player accounts with 'Sign in with Apple' and Google options; the studio uses a Cognito user pool for player sign-in and an identity pool so the game can save screenshots to a player-specific folder in S3.",
   "Common mistakes: using Cognito for employee access to the AWS console; creating IAM users for millions of app customers (IAM is for managing access to AWS, not app users); thinking permission sets are a separate permission system rather than a way to create IAM roles; and confusing a user pool (who you are, sign-in and tokens) with an identity pool (temporary AWS credentials). Another trap is assuming Identity Center requires Active Directory; it can use its own directory or any supported external IdP.",
   "Exam wording makes the choice clear. 'Employees need single sign-on to multiple AWS accounts' or 'use existing corporate credentials to access AWS' is IAM Identity Center. 'Customers of our mobile app need to create accounts and sign in with their social media identity' or 'add sign-up and sign-in to a web app' is Amazon Cognito. 'Millions of users' or 'social identity providers' strongly suggests Cognito. 'Central access management across AWS Organizations accounts' suggests Identity Center."
  ],
  "analogy": "Think of a large hotel. Staff swipe one employee badge at the staff entrance, and the badge opens only the floors and rooms their job needs; when they leave the company, HR deactivates the badge and every door closes at once. That is IAM Identity Center. Guests check in at the front desk, which can accept a passport or a loyalty card from a partner program, and receive a room key for their stay. That is Amazon Cognito. The analogy is imperfect in one way: in AWS both systems ultimately rely on IAM roles and policies to grant AWS permissions, as if the staff badges and room keys were cut by the same locksmith.",
  "terms": [
   [
    "AWS IAM Identity Center",
    "The recommended AWS service for workforce single sign-on to multiple AWS accounts and business applications."
   ],
   [
    "Single sign-on (SSO)",
    "Signing in once to access many accounts or applications without separate credentials."
   ],
   [
    "Permission set",
    "A collection of policies in IAM Identity Center that becomes an IAM role in each assigned account."
   ],
   [
    "Identity provider (IdP)",
    "A system that authenticates users and vouches for them to other services, such as Okta or Microsoft Entra ID."
   ],
   [
    "Amazon Cognito",
    "A service that adds sign-up, sign-in and access control to web and mobile applications."
   ],
   [
    "Cognito user pool",
    "A user directory for an application that handles sign-up, sign-in and token issuance."
   ],
   [
    "Cognito identity pool",
    "A Cognito feature that exchanges tokens for temporary AWS credentials."
   ],
   [
    "Federation",
    "Trusting identities managed by an external identity provider instead of creating separate accounts."
   ]
  ],
  "example": "A retail bank gives its engineers access to 60 AWS accounts through IAM Identity Center connected to Microsoft Entra ID, so when someone leaves the bank and their directory account is disabled, their AWS access ends immediately. Its customer-facing budgeting app uses an Amazon Cognito user pool with MFA for millions of customers, completely separate from the employee directory.",
  "mistakes": [
   [
    "Using Amazon Cognito to give employees access to the AWS console.",
    "Workforce access to AWS accounts is IAM Identity Center. Cognito is for end users of your own applications."
   ],
   [
    "Creating IAM users for each customer of an app.",
    "IAM manages access to AWS itself and is not designed for app customers. Use a Cognito user pool for customer sign-up and sign-in."
   ],
   [
    "\"Permission sets are a separate permission system.\"",
    "A permission set is a template that Identity Center provisions as an IAM role in each assigned account, so permissions are still IAM policies."
   ],
   [
    "\"A Cognito user pool gives the app AWS credentials.\"",
    "A user pool signs users in and issues tokens. An identity pool exchanges identities for temporary AWS credentials."
   ]
  ],
  "tryit": [
   [
    "Halcyon Travel already manages its 300 employees in Microsoft Entra ID and is moving to a multi-account setup with AWS Organizations. The security lead wants employees to use their existing work credentials and wants access to end automatically when someone leaves. What should Halcyon use?",
    "AWS IAM Identity Center connected to Entra ID as the external identity provider, with permission sets assigned to groups across accounts. Disabling a person in Entra ID removes their AWS access, and users receive only temporary credentials."
   ],
   [
    "Halcyon's booking app needs travelers to create accounts, sign in with Facebook or Google, and upload passport photos directly to a private folder in S3. Which pieces of Cognito are involved?",
    "A Cognito user pool handles sign-up and sign-in, including the social identity providers, and returns tokens. A Cognito identity pool exchanges those tokens for temporary, tightly scoped AWS credentials so the app can upload to the traveler's folder in S3."
   ]
  ],
  "tip": "Workforce access to AWS accounts means IAM Identity Center; end users of your app mean Amazon Cognito. 'Millions of app users' or 'social identity providers' points to Cognito.",
  "check": [
   [
    "Employees need single sign-on to many AWS accounts using their corporate directory credentials. Which service?",
    "AWS IAM Identity Center."
   ],
   [
    "A mobile app needs customer sign-up and sign-in with Google and Apple accounts. Which service?",
    "Amazon Cognito, using a user pool with social identity providers."
   ],
   [
    "What is a permission set in IAM Identity Center?",
    "A collection of policies that Identity Center provisions as an IAM role in each account where it is assigned."
   ],
   [
    "What is the difference between a Cognito user pool and an identity pool?",
    "A user pool is a directory that signs users in and issues tokens; an identity pool exchanges identities for temporary AWS credentials."
   ]
  ]
 },
 {
  "t": "Storing credentials safely: AWS Secrets Manager and AWS Systems Manager Parameter Store",
  "hook": "Friday afternoon at Cedar Lane Credit, a developer named Felix makes a repository public so a partner can read the documentation. Ten minutes later a scanner bot has found what the repository also contained: the production database password, sitting in a configuration file since the project began. The password has never been changed because nobody knows which servers would break. Now you have to change it everywhere, today, and make sure it never lives in code again. What should hold that password instead?",
  "simple": "Apps need passwords too, for example to talk to a database. Writing those passwords directly into the app's code is like taping your house key to the front door: anyone who sees the code sees the password, and changing it means hunting down every copy. AWS gives you two locked boxes to keep them in. AWS Secrets Manager stores secrets and can change them on a schedule for you, a bit like a building that changes its door code every month and tells only the right people. AWS Systems Manager Parameter Store keeps settings and simple secrets organized in folders, at no extra cost for basic use. Your app asks the box for the value when it needs it.",
  "body": [
   "Applications need secrets: database passwords, API keys for third-party services, tokens and certificates. The worst place to keep them is in source code or in plain text configuration files on a server, where they get copied into code repositories, backups, container images and logs, and are hard to change once leaked. AWS offers two services for storing such values centrally and retrieving them at runtime with access controlled by AWS Identity and Access Management (IAM): AWS Secrets Manager and AWS Systems Manager Parameter Store. Both services follow the same idea: the secret lives in one protected place, and code asks for it at runtime instead of carrying a copy around.",
   "AWS Secrets Manager is purpose-built for secrets. You store a secret, such as a database username and password in JSON form, and your application retrieves it with an API call when it needs it, for example `aws secretsmanager get-secret-value --secret-id prod/orders/db`. Access is controlled with IAM policies and resource policies on the secret, secrets are encrypted with AWS Key Management Service (AWS KMS), and every retrieval is logged in AWS CloudTrail. Secrets can be replicated to other Regions for multi-Region applications. Secrets Manager is charged per secret per month and per API call. Because the secret is fetched rather than copied, changing it in one place changes it for every application that reads it, and the CloudTrail record shows exactly which role read it and when.",
   "Its standout feature is automatic rotation. Secrets Manager can change a password on a schedule you set and update the database at the same time, so the old password stops working and applications fetch the new one on their next call. It has built-in rotation support for Amazon RDS, Amazon Aurora, Amazon Redshift and Amazon DocumentDB, and uses AWS Lambda rotation functions for other secret types such as third-party API keys. Some AWS services, including Amazon RDS, can also create and manage the master user password in Secrets Manager for you. Rotation turns a leaked password from a permanent risk into a temporary one, because any copy that escapes stops working at the next rotation.",
   "AWS Systems Manager Parameter Store is a capability of AWS Systems Manager that stores configuration data and secrets as parameters in a hierarchy, such as `/prod/app/db-host`. Parameters can be String, StringList or SecureString; SecureString values are encrypted with KMS. You retrieve them with a call such as `aws ssm get-parameter --name /prod/app/db-password --with-decryption`, or fetch a whole branch of the hierarchy at once. Standard parameters have no additional charge, while advanced parameters, which allow larger values and parameter policies, are charged. Parameter Store does not provide built-in automatic rotation the way Secrets Manager does. The hierarchy is handy for organizing values by environment and application, and IAM policies can grant access to a whole path such as `/prod/app/` while denying everything else.",
   "Choosing between them is a frequent exam question. If the requirement is automatic rotation of database credentials, pick Secrets Manager. If the requirement is storing configuration values such as feature flags, endpoints or simple secrets centrally at low or no cost, Parameter Store is a good fit. Both remove secrets from code, both can use KMS encryption, both log access through CloudTrail and both rely on IAM to control who can read each value. Whichever you use, grant the application's IAM role permission to read only the specific secrets or parameters it needs, which is least privilege applied to secrets.",
   "Consider a worked example. An order service has its database password in a configuration file checked into Git. After the repository is accidentally made public, the team rotates the password, stores it in Secrets Manager with automatic rotation every 30 days, and changes the application to call `GetSecretValue` at startup with a short cache. The database hostname, timeout settings and feature flags go into Parameter Store under `/prod/orders/`. The service's IAM role is allowed to read only that one secret and that parameter path.",
   "Common mistakes: storing secrets as plain environment variables or in code 'just for now'; choosing Parameter Store when the question explicitly requires automatic rotation; thinking Secrets Manager is free (it is charged per secret and per API call); thinking the services replace IAM (they depend on it); and granting an application `secretsmanager:GetSecretValue` on all secrets instead of the one it needs. Another trap is confusing these services with AWS KMS: KMS manages encryption keys, while Secrets Manager and Parameter Store store the secret values those keys protect. Finally, remember that rotation only helps if applications fetch the current value rather than caching it forever.",
   "Exam wording is usually decisive. 'Rotate' or 'rotation' of database credentials is a strong signal for AWS Secrets Manager. 'Store configuration data and secrets at no additional cost' or 'hierarchical parameters' points to Parameter Store. 'Remove hard-coded credentials from application code' can be either, so look for the rotation or cost clue. 'Manage encryption keys' is KMS, not a secrets store."
  ],
  "analogy": "Imagine a hotel. Hard-coding a password is like writing the safe combination on a sticky note inside every room. Secrets Manager is the front desk that holds the master safe codes, gives them only to staff with the right badge, logs every request and changes the codes on a schedule. Parameter Store is the labeled filing cabinet in the back office: tidy folders for settings and some locked drawers for sensitive items, at no extra cost for the basic cabinet, but nobody comes around to change the combinations automatically. The analogy stops at encryption: both services rely on AWS KMS keys, which are kept separately from the values they protect.",
  "terms": [
   [
    "Secret",
    "A sensitive value such as a password, API key or token that must be protected from disclosure."
   ],
   [
    "AWS Secrets Manager",
    "A service that stores, retrieves and automatically rotates secrets such as database credentials."
   ],
   [
    "Secret rotation",
    "Changing a credential on a schedule and updating both the store and the target system."
   ],
   [
    "AWS Systems Manager Parameter Store",
    "A capability of Systems Manager that stores configuration data and secrets as hierarchical parameters."
   ],
   [
    "SecureString",
    "A Parameter Store parameter type whose value is encrypted with AWS KMS."
   ],
   [
    "Hard-coded credentials",
    "Secrets written directly into source code or configuration files, a practice to avoid."
   ]
  ],
  "example": "A media company's security audit finds database passwords in plain text in dozens of container images. The company moves every database credential into Secrets Manager with 30-day automatic rotation, stores non-sensitive configuration such as API endpoints in Parameter Store, and gives each service's IAM role access only to its own secret. Rebuilding an image no longer copies a password, and a leaked old password stops working within a month at most.",
  "mistakes": [
   [
    "Choosing Parameter Store when the question requires automatic rotation.",
    "Parameter Store has no built-in automatic rotation. Automatic rotation of database credentials points to Secrets Manager."
   ],
   [
    "\"Secrets Manager is free.\"",
    "Secrets Manager is charged per secret per month and per API call. Parameter Store standard parameters have no additional charge."
   ],
   [
    "Confusing these services with AWS KMS.",
    "KMS manages encryption keys. Secrets Manager and Parameter Store store the secret values those keys protect."
   ],
   [
    "Granting an application read access to every secret.",
    "Least privilege applies to secrets: allow the application's role to read only the specific secrets or parameter paths it needs."
   ]
  ],
  "tryit": [
   [
    "Ivy at Orchard Health needs to store the hostname, port and feature flags for 12 microservices, plus a few low-sensitivity API tokens. There is no rotation requirement, and the budget is tight. Which service fits best?",
    "AWS Systems Manager Parameter Store, using a hierarchy such as `/prod/<service>/` with standard parameters, which have no additional charge, and SecureString parameters for the tokens so they are encrypted with KMS."
   ],
   [
    "Orchard's auditors now require that the production database password change every 30 days without application downtime. What should Ivy use, and what must the applications do?",
    "AWS Secrets Manager with automatic rotation, which has built-in support for Amazon RDS. The applications must fetch the current secret value (with only a short cache) instead of storing it permanently, or rotation will break them."
   ]
  ],
  "tip": "'Rotate' or 'rotation' points to AWS Secrets Manager. 'Store configuration data or simple secrets at no additional cost' points to Parameter Store. KMS manages keys, not secret values.",
  "check": [
   [
    "A company needs database passwords rotated automatically every 30 days. Which service?",
    "AWS Secrets Manager, which has built-in rotation for databases such as Amazon RDS."
   ],
   [
    "Which service can store configuration values in a hierarchy with standard parameters at no additional charge?",
    "AWS Systems Manager Parameter Store."
   ],
   [
    "How is a SecureString parameter protected?",
    "Its value is encrypted with an AWS KMS key, and access is controlled with IAM."
   ],
   [
    "Why should secrets not be hard-coded in application source code?",
    "They get copied into repositories, images and backups where they can leak, and they are hard to rotate once exposed."
   ]
  ]
 },
 {
  "t": "Network protection: security groups vs network ACLs, AWS WAF, AWS Shield Standard and Advanced, AWS Firewall Manager",
  "hook": "It is the night before the big spring sale at Fernhill Garden Supply, and Omar's pager will not stop. One address range is probing every server in the public subnet. The site's search box is receiving strange requests stuffed with database commands. And the traffic graph for the load balancer is climbing far faster than any real crowd of shoppers could explain. Omar has access to security groups, network ACLs, AWS WAF and AWS Shield, but each one guards a different door. Which tool stops which problem, and which ones cannot help at all?",
  "simple": "Protecting a network is like protecting a large event. Each guest's wristband decides which rooms they can enter; that is a security group, and it works on individual servers. The guards at the gate of each area check a list that can include \"never let these people in\"; that is a network ACL, which protects whole sections of the network. A trained inspector who reads every letter delivered to the office, looking for tricks hidden in the words, is AWS WAF, which reads web requests. Crowd control for a stampede of fake visitors is AWS Shield, which handles floods of traffic. AWS Firewall Manager is the head of security who makes sure every venue in the company uses the same rules.",
  "body": [
   "AWS gives you several layers of network protection, each working at a different level: the network interface, the subnet, the web request and the whole organization. Using them together is called defense in depth. The exam tests both the differences between them and which one to use for a given threat, so learn each by where it sits and what it can and cannot do. A useful habit is to picture traffic arriving from the internet and passing each checkpoint in turn: Shield against floods at the edge, WAF reading web requests, the network ACL at the subnet boundary and finally the security group at the resource itself.",
   "Security groups are virtual firewalls for resources such as Amazon EC2 instances, more precisely for their elastic network interfaces. They support allow rules only; anything not allowed is denied. They are stateful: if an inbound request is allowed, the response is automatically allowed back out, and vice versa. All rules are evaluated together, and a rule can reference another security group, for example allowing the database group to accept traffic only from the web server group. A typical command is `aws ec2 authorize-security-group-ingress --group-id <sg-id> --protocol tcp --port 443 --cidr 0.0.0.0/0` to allow HTTPS from anywhere. Because security groups are stateful and allow-only, a rule list reads like a guest list: everyone named gets in, replies flow back automatically, and everyone else is turned away without a rule saying so.",
   "Network access control lists (network ACLs) protect whole subnets in an Amazon Virtual Private Cloud (Amazon VPC). They support both allow and deny rules, are evaluated in rule-number order with the first match winning, and are stateless: return traffic must be explicitly allowed by a separate rule, which usually means allowing the ephemeral port range for responses. The default network ACL allows all traffic in and out. A typical design uses security groups for most control and network ACLs as a coarse subnet-level backstop, for example to block a specific address range that is attacking you. The ordering matters in practice: if rule 100 allows all traffic and rule 200 denies a bad range, the deny never takes effect, because the first match wins.",
   "AWS WAF is a web application firewall. It inspects HTTP and HTTPS requests at layer 7 for resources such as Amazon CloudFront distributions, Application Load Balancers and Amazon API Gateway APIs. You create a web access control list (web ACL) with rules, or use managed rule groups from AWS and AWS Marketplace sellers, to block common attacks like SQL injection and cross-site scripting, filter by IP address or country, and rate-limit clients that send too many requests. Security groups and network ACLs cannot see inside HTTP requests; WAF can. That ability to read the content of a request is what separates WAF from the lower-level filters, which see only addresses, ports and protocols.",
   "AWS Shield protects against distributed denial of service (DDoS) attacks. Shield Standard is automatically enabled for all AWS customers at no additional cost and defends against the most common network and transport layer attacks. Shield Advanced is a paid subscription that adds enhanced detection and mitigation for resources such as EC2, Elastic Load Balancing, CloudFront, Amazon Route 53 and AWS Global Accelerator, access to the AWS Shield Response Team (SRT) during attacks, detailed attack reporting, AWS WAF included for protected resources, and cost protection against scaling charges caused by a DDoS attack. AWS Firewall Manager centrally configures and manages firewall rules across all accounts in AWS Organizations: you define policies once, such as a WAF rule set, Shield Advanced protection or required security groups, and Firewall Manager applies them to existing and new accounts and resources automatically. Together, these let a large organization keep a consistent baseline even as new accounts and resources appear every week.",
   "Consider a worked example. An online store sees three problems: a single IP range probing every server, bots attempting SQL injection through the search box, and a large traffic flood before a sale. The team adds a deny rule for the probing range in the network ACL of the public subnets (security groups cannot deny), attaches an AWS WAF web ACL with a SQL injection managed rule group and a rate-based rule to its Application Load Balancer, and subscribes to Shield Advanced for the load balancer and CloudFront distribution to get SRT help and cost protection. Firewall Manager then pushes the same WAF policy to the company's other 15 accounts.",
   "Common mistakes: trying to block a specific IP address with a security group (it has no deny rules); forgetting that network ACLs are stateless, so allowing inbound port 443 without allowing outbound return traffic breaks connections; expecting WAF to stop network-layer floods (that is Shield); thinking Shield Standard must be purchased or enabled (it is automatic and free); and confusing Firewall Manager, which manages rules across accounts, with a firewall that inspects traffic itself. AWS Network Firewall, a separate managed firewall for VPC traffic, may also appear as a distractor.",
   "Exam wording maps cleanly. 'Stateful', 'allow rules only' or 'instance level' means security group. 'Stateless', 'allow and deny rules', 'subnet level' or 'block an IP range' means network ACL. 'SQL injection', 'cross-site scripting', 'HTTP headers' or 'rate limiting web requests' means AWS WAF. 'DDoS protection at no additional cost' is Shield Standard; '24/7 DDoS response team' or 'cost protection' is Shield Advanced. 'Centrally manage firewall rules across accounts in AWS Organizations' is AWS Firewall Manager."
  ],
  "analogy": "Think of an apartment building. The network ACL is the doorman at the building entrance with a list of who may enter and who is banned; he checks people going in and coming out separately, with no memory of who entered. The security group is the lock on each apartment, which only has a list of allowed keys, and anyone let in can walk back out freely. AWS WAF is the mailroom clerk who opens packages and refuses ones with suspicious contents. Shield is crowd control when a mob blocks the street. The analogy has a limit: real doormen recognize faces, but a network ACL truly has no memory, which is why return traffic needs its own rule.",
  "terms": [
   [
    "Security group",
    "A stateful, allow-only virtual firewall attached to network interfaces of resources such as EC2 instances."
   ],
   [
    "Network ACL",
    "A stateless subnet-level firewall with numbered allow and deny rules evaluated in order."
   ],
   [
    "Stateful",
    "Automatically allowing return traffic for a permitted connection."
   ],
   [
    "Stateless",
    "Evaluating each packet on its own, so return traffic must be allowed by a separate rule."
   ],
   [
    "AWS WAF",
    "A web application firewall that filters HTTP and HTTPS requests to CloudFront, load balancers and APIs."
   ],
   [
    "Distributed denial of service (DDoS)",
    "An attack that floods a target with traffic from many sources to make it unavailable."
   ],
   [
    "AWS Shield",
    "DDoS protection, with Standard included for all customers and Advanced as a paid tier with response team access."
   ],
   [
    "AWS Firewall Manager",
    "A service that centrally applies WAF, Shield Advanced and security group policies across AWS Organizations accounts."
   ]
  ],
  "example": "A ticketing company's site slows down every time a popular event goes on sale because bots hammer the checkout page. It attaches an AWS WAF web ACL with a rate-based rule and bot control rules to its CloudFront distribution, keeps security groups on its instances allowing only traffic from the load balancer, and subscribes to Shield Advanced so the Shield Response Team can help during large attacks and unexpected scaling costs are covered.",
  "mistakes": [
   [
    "Blocking a specific IP address with a security group.",
    "Security groups have allow rules only. Use a deny rule in a network ACL, or a WAF rule for web requests."
   ],
   [
    "Allowing inbound port 443 in a network ACL and nothing else.",
    "Network ACLs are stateless, so outbound return traffic (usually the ephemeral port range) must also be allowed or connections fail."
   ],
   [
    "Expecting AWS WAF to absorb network-layer floods.",
    "WAF inspects HTTP and HTTPS requests at layer 7. Protection against DDoS floods is AWS Shield."
   ],
   [
    "\"Shield Standard must be purchased or turned on.\"",
    "Shield Standard is automatically enabled for all AWS customers at no additional cost. Shield Advanced is the paid tier."
   ]
  ],
  "tryit": [
   [
    "Lena at Copperline Media sees thousands of login requests per minute from a handful of IP addresses against the site's API Gateway endpoint, while normal users are getting slow responses. She wants to limit how many requests any single client can make. Which service and feature fit?",
    "AWS WAF with a rate-based rule in a web ACL attached to the API Gateway stage. WAF works on HTTP requests and can limit clients that exceed a request rate, which security groups and network ACLs cannot do."
   ],
   [
    "Copperline has 20 AWS accounts in AWS Organizations, and the security team wants every Application Load Balancer, including ones created next month, to use the same WAF rule set. What should they use?",
    "AWS Firewall Manager, which applies the WAF policy centrally to existing and new accounts and resources in the organization."
   ]
  ],
  "tip": "Stateful and allow-only means security group; stateless with allow and deny means network ACL. To block one IP address at the network level you need a network ACL (or WAF for web requests), because security groups cannot deny.",
  "check": [
   [
    "Which is stateful: a security group or a network ACL?",
    "A security group; return traffic is automatically allowed. Network ACLs are stateless."
   ],
   [
    "How would you block a specific malicious IP range from reaching a subnet?",
    "Add a deny rule for that range in the subnet's network ACL, because security groups have no deny rules."
   ],
   [
    "Which service protects a web application from SQL injection and cross-site scripting?",
    "AWS WAF, attached to CloudFront, an Application Load Balancer or API Gateway."
   ],
   [
    "What does Shield Advanced add over Shield Standard?",
    "Enhanced detection and mitigation, access to the Shield Response Team, detailed attack reporting and cost protection for DDoS-related scaling."
   ],
   [
    "What does AWS Firewall Manager do?",
    "It centrally configures and applies firewall policies, such as WAF rules, Shield Advanced protection and security groups, across accounts in AWS Organizations."
   ]
  ]
 },
 {
  "t": "Threat detection and posture: Amazon GuardDuty, Amazon Inspector, Amazon Macie, Amazon Detective and AWS Security Hub",
  "hook": "It is 3:10 a.m., and Nadia on the security rota at Riverbend Insurance has five browser tabs open, each from a different AWS security service, and each telling her something. One says an instance is talking to a known cryptocurrency mining domain. Another lists a critical vulnerability in a container image. A third reports an S3 bucket full of what looks like customer records. She needs to know whether these are connected, where it started and how bad it is, before the 8 a.m. briefing. Which service answers which of her questions?",
  "simple": "Think of a hospital. A security guard watches the cameras for anyone acting suspiciously right now; that is Amazon GuardDuty, which spots signs of attackers in your account. A building inspector checks for broken locks and weak walls before anything happens; that is Amazon Inspector, which looks for known weaknesses in your software. A records officer knows which filing cabinets hold private patient files; that is Amazon Macie, which finds sensitive data in Amazon S3. A detective pieces together what happened after an incident; that is Amazon Detective. And the security office wall, where every report is pinned up and checked against the rulebook, is AWS Security Hub.",
  "body": [
   "AWS has a family of security services whose names are easy to mix up. Each has a distinct job, and exam questions usually describe the job and ask for the name. The easiest way to learn them is by the question each one answers: is something bad happening, what is vulnerable, where is my sensitive data, what exactly happened, and what is my overall security posture. None of these services blocks traffic by itself; they are your eyes and ears, and they work best when you turn them on together and route their findings to one place.",
   "Amazon GuardDuty answers 'is something malicious happening in my account right now?' It is a threat detection service that continuously analyzes foundational data sources, AWS CloudTrail management events, Amazon VPC Flow Logs and DNS query logs, using threat intelligence, anomaly detection and machine learning. Optional protection plans extend it to S3 data events, Amazon EKS, runtime monitoring, malware scanning and database sign-in activity. It raises findings for things like an EC2 instance communicating with a known malicious address, API calls from an unusual location, credentials used from outside AWS or signs of cryptocurrency mining. You enable it with a click or `aws guardduty create-detector --enable`, and there is nothing to install for its foundational sources. Each finding includes a type, a severity, the affected resource and details such as the remote IP address, which gives responders a head start.",
   "Amazon Inspector answers 'what vulnerabilities do my workloads have?' It automatically and continuously scans EC2 instances, container images in Amazon Elastic Container Registry (Amazon ECR) and Lambda functions for known software vulnerabilities, listed as Common Vulnerabilities and Exposures (CVEs), and for unintended network exposure, then prioritizes findings with a risk score that considers your environment. Amazon Macie answers 'where is my sensitive data?' It uses machine learning and pattern matching to discover sensitive data such as personally identifiable information (PII), financial data and credentials in Amazon S3, and also reports on bucket security such as public access or missing encryption. Inspector is about weaknesses before they are used, while Macie is about knowing where your most sensitive information lives, which tells you how serious any exposure would be.",
   "Amazon Detective answers 'what happened and why?' When you have a finding, for example from GuardDuty, Detective automatically collects and links log data and builds visualizations of the resources, users and IP addresses involved over time, helping you investigate scope and root cause without writing queries. AWS Security Hub answers 'what is my overall security posture?' It aggregates findings from GuardDuty, Inspector, Macie, Firewall Manager, IAM Access Analyzer and partner tools into one place in a standard format, and runs automated checks against security standards such as the AWS Foundational Security Best Practices and the Center for Internet Security (CIS) AWS Foundations Benchmark. This is often called cloud security posture management (CSPM), and it can span all accounts in an organization. In newer consoles, the posture-checking part of Security Hub may be labeled Security Hub CSPM, but the exam idea is the same: one place for findings and best-practice checks.",
   "The distinctions are about detection versus assessment versus investigation. GuardDuty detects active threats from logs; it does not scan software for vulnerabilities. Inspector assesses software vulnerabilities and exposure; it does not watch for attackers. Macie is only about sensitive data, mainly in S3. Detective does not generate primary threat findings; it helps you investigate them. Security Hub collects, normalizes and scores; it relies on the other services for much of its detail.",
   "Consider a worked example. GuardDuty raises a finding that an EC2 instance is making DNS requests to a domain linked to cryptocurrency mining. The security engineer opens the finding in Detective and sees that the instance began the traffic an hour after a new container was deployed, and that the same IAM role was used from an unfamiliar IP address. Inspector shows the container image contains a web framework with a critical CVE, the likely entry point. Macie confirms the S3 bucket the role could read contains customer PII. Security Hub shows all these findings together, and the team isolates the instance and patches the image.",
   "Common mistakes: choosing GuardDuty for vulnerability scanning (that is Inspector); choosing Inspector for detecting compromised credentials (that is GuardDuty); using Macie for data in databases or on EC2 disks, when it focuses on S3; expecting Detective to prevent attacks; and thinking Security Hub replaces the individual services. Also remember none of these are firewalls; they detect, assess and report, and blocking is done with tools such as security groups, network ACLs and AWS WAF.",
   "Exam wording maps to one service each. 'Vulnerabilities', 'CVEs', 'software packages' or 'network reachability of EC2' means Inspector. 'Sensitive data', 'PII' or 'discover credit card numbers in S3' means Macie. 'Malicious activity', 'unusual API calls', 'compromised instance' or 'analyze VPC Flow Logs and CloudTrail for threats' means GuardDuty. 'Investigate root cause' or 'visualize relationships in a security finding' means Detective. 'Single dashboard of findings', 'aggregate security alerts' or 'check against security best practice standards' means Security Hub. A memory aid: GuardDuty guards, Inspector inspects, Macie finds data, Detective investigates, Security Hub is the hub."
  ],
  "analogy": "Imagine a museum. GuardDuty is the night guard watching cameras and alarms for intruders. Inspector is the facilities engineer who walks the building listing worn locks and faulty windows. Macie is the curator who knows which rooms hold the most valuable pieces. Detective is the investigator who, after an alarm, replays the footage to see who came in, when and through which door. Security Hub is the control room wall where every report appears side by side and is checked against the insurer's checklist. The analogy stops in one place: none of these people physically stop a thief; in AWS, blocking is done by tools such as security groups, network ACLs and AWS WAF.",
  "mnemonic": "GuardDuty guards (active threats), Inspector inspects (vulnerabilities), Macie finds data (sensitive data in S3), Detective investigates (root cause), Security Hub is the hub (findings and standards in one place).",
  "terms": [
   [
    "Amazon GuardDuty",
    "A threat detection service that analyzes CloudTrail, VPC Flow Logs, DNS logs and more for malicious activity."
   ],
   [
    "Amazon Inspector",
    "An automated vulnerability management service that scans EC2, ECR images and Lambda functions for CVEs and exposure."
   ],
   [
    "Common Vulnerabilities and Exposures (CVE)",
    "A public catalog of identifiers for known software vulnerabilities."
   ],
   [
    "Amazon Macie",
    "A service that discovers sensitive data such as PII in Amazon S3 and reports bucket security issues."
   ],
   [
    "Amazon Detective",
    "A service that links and visualizes log data to investigate the root cause of security findings."
   ],
   [
    "AWS Security Hub",
    "A service that aggregates security findings and checks accounts against security standards."
   ],
   [
    "Finding",
    "A record produced by a security service describing a detected threat, vulnerability or misconfiguration."
   ],
   [
    "Cloud security posture management (CSPM)",
    "Continuously checking cloud accounts against security best practices and standards."
   ]
  ],
  "example": "A healthcare startup enables GuardDuty, Inspector, Macie and Security Hub across its AWS Organizations accounts in one afternoon. Within a week Macie flags an S3 bucket holding exported patient records that nobody knew about, Inspector reports a critical CVE in an old container image, and GuardDuty alerts on API calls from an access key used in another country. Security Hub ranks all three so the team fixes the leaked key first.",
  "mistakes": [
   [
    "Choosing GuardDuty for vulnerability scanning.",
    "GuardDuty detects active threats from logs. Scanning software for CVEs and network exposure is Amazon Inspector."
   ],
   [
    "Choosing Inspector to detect compromised credentials.",
    "Unusual API calls and credentials used from unexpected places are GuardDuty findings."
   ],
   [
    "Using Macie to find sensitive data in databases or on EC2 disks.",
    "Macie focuses on discovering sensitive data in Amazon S3."
   ],
   [
    "\"Security Hub replaces the other services\" or \"Detective prevents attacks.\"",
    "Security Hub aggregates findings and runs standards checks but relies on the other services for detail. Detective helps investigate findings; it does not prevent anything."
   ]
  ],
  "tryit": [
   [
    "Tomás at Silverleaf Retail is told to find out, before a merger, whether any S3 buckets across 12 accounts contain payment card numbers or personal information, and whether any of those buckets are public. Which service should he enable?",
    "Amazon Macie. It discovers sensitive data such as PII and financial data in S3 using machine learning and pattern matching, and it also reports bucket security issues such as public access or missing encryption."
   ],
   [
    "GuardDuty alerts Silverleaf that an IAM role was used from an unfamiliar IP address. The security lead wants to understand which resources that role touched over the past week and how the activity relates, without writing log queries. Which service helps most?",
    "Amazon Detective, which automatically links log data and visualizes the users, roles, resources and IP addresses involved over time to show scope and root cause."
   ]
  ],
  "tip": "Vulnerabilities and CVEs mean Inspector; sensitive data or PII in S3 means Macie; malicious activity from logs means GuardDuty; investigating root cause means Detective; a single view of findings and compliance checks means Security Hub.",
  "check": [
   [
    "Which service scans EC2 instances and container images for known software vulnerabilities?",
    "Amazon Inspector."
   ],
   [
    "Which service detects an EC2 instance communicating with a known malicious IP address?",
    "Amazon GuardDuty, which analyzes VPC Flow Logs, DNS logs and CloudTrail events for threats."
   ],
   [
    "A company needs to find S3 objects containing credit card numbers. Which service?",
    "Amazon Macie."
   ],
   [
    "What does AWS Security Hub add on top of GuardDuty, Inspector and Macie?",
    "A single place that aggregates their findings across accounts and runs automated checks against security standards."
   ],
   [
    "Which service helps investigate the root cause and scope of a GuardDuty finding?",
    "Amazon Detective."
   ]
  ]
 },
 {
  "t": "Logging and monitoring for security: AWS CloudTrail, Amazon CloudWatch and AWS Trusted Advisor security checks",
  "hook": "Monday, 9:05 a.m. at Thornbury Tutoring. The production database server is suddenly reachable by SSH from anywhere on the internet, and nobody remembers changing anything. Your manager, Grace, wants three answers by lunch: who made the change and when, how the team will be alerted the next time something like this happens, and whether there are any other risky settings hiding in the account. You have three AWS services that sound almost alike. Which one answers each of Grace's questions?",
  "simple": "Imagine running a shop. A visitor logbook at the door records who came in, when and what they did; that is AWS CloudTrail, which records every action taken in your AWS account. A dashboard of gauges, like a thermostat and a cash register total, with an alarm that rings when something goes out of range, is Amazon CloudWatch, which watches how your systems are performing. A consultant who walks through the shop once in a while and hands you a list of improvements, like \"this back door is unlocked\" or \"you are paying for lights nobody uses,\" is AWS Trusted Advisor. The consultant gives advice, but you still have to lock the door.",
  "body": [
   "You cannot secure what you cannot see. Three services give you visibility into what is happening in your AWS account, each from a different angle: AWS CloudTrail records who did what, Amazon CloudWatch measures how things are performing and raises alarms, and AWS Trusted Advisor checks your account against best practices. The exam expects you to know which one records what, and it frequently puts them side by side as options. Thinking of each as answering a different question, who did it, how is it running and what should I improve, makes them much easier to separate under exam pressure.",
   "AWS CloudTrail records API activity in your account: who did what, when, from which IP address and to which resource. Every action in AWS, whether through the console, the command line interface (CLI), a software development kit (SDK) or another AWS service, is an API call, so CloudTrail answers questions like 'who deleted this S3 bucket?' or 'who changed this security group?'. CloudTrail Event history shows the last 90 days of management events in a Region at no charge; you can search it in the console under CloudTrail > Event history or with `aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=DeleteBucket`. Each event record includes fields such as the event name, the event time, the identity that made the call, the source IP address and the request parameters, which together tell the story of a change.",
   "For longer retention and more detail, you create a trail that delivers log files to an S3 bucket you choose. Trails can include data events, such as individual S3 object reads or Lambda invocations, which are not recorded by default because of their volume. Enable log file integrity validation so you can prove logs were not altered, and restrict access to the log bucket. An organization trail logs every account in AWS Organizations to one place, and CloudTrail Lake lets you store and query events with SQL. A good security baseline is an organization trail delivering to a dedicated, tightly restricted bucket, so that even an administrator in a workload account cannot quietly erase the record.",
   "Amazon CloudWatch monitors the performance and health of your resources and applications. It collects metrics, such as EC2 CPU utilization or load balancer request counts, stores and searches logs in CloudWatch Logs, and lets you build dashboards and set alarms that notify you through Amazon Simple Notification Service (Amazon SNS) or take automatic action, such as scaling or recovering an instance, when a metric crosses a threshold. For security, you can send CloudTrail logs to CloudWatch Logs and create metric filters and alarms for events such as root user sign-ins, IAM policy changes or repeated failed console logins. In short: CloudTrail tells you who did something; CloudWatch tells you how things are performing and alerts you. CloudWatch alarms can also feed incident tools and chat channels through SNS, so the right person hears about a problem within minutes instead of discovering it on Monday morning.",
   "AWS Trusted Advisor inspects your account and gives recommendations across categories including cost optimization, performance, security, fault tolerance, service limits (service quotas) and operational excellence. Security checks include S3 buckets with open access permissions, security groups allowing unrestricted access to specific ports, whether MFA is enabled on the root user, IAM use and exposed access keys. All customers get a core set of security checks and the service quota checks, while the full set of checks, plus programmatic access through the AWS Support API, requires a Business, Enterprise On-Ramp or Enterprise support plan. Trusted Advisor results appear as color-coded statuses, such as action recommended or investigation recommended, with the affected resources listed so you know where to look.",
   "Consider a worked example. On Monday morning a production security group allows SSH from the whole internet. Trusted Advisor's weekly check had already flagged it as unrestricted access. The team searches CloudTrail Event history for `AuthorizeSecurityGroupIngress` and finds that a contractor's role added the rule on Friday night from an unfamiliar IP address. They remove the rule, then create a CloudWatch metric filter on the CloudTrail log group for security group changes, with an alarm that emails the security team through SNS. GuardDuty, which analyzes the same CloudTrail and network logs for threats, confirms no further suspicious activity.",
   "Common mistakes: choosing CloudWatch to find who made a change (that is CloudTrail); choosing CloudTrail to monitor CPU utilization or set a threshold alarm (that is CloudWatch); assuming CloudTrail keeps events forever without a trail (Event history covers 90 days of management events); assuming data events such as S3 object reads are logged by default; and thinking Trusted Advisor fixes problems for you. It recommends; you act. Also avoid confusing Trusted Advisor with AWS Config, which records configuration history and evaluates your own rules.",
   "Exam wording usually gives it away. 'Who made this change?', 'audit API calls' or 'track user activity' is CloudTrail. 'CPU utilization', 'set an alarm', 'collect application logs' or 'dashboard of metrics' is CloudWatch. 'Recommendations to reduce cost, improve security and check service limits' or 'identify security groups with unrestricted access' is Trusted Advisor. 'Full set of Trusted Advisor checks' implies Business support or higher. Mixing up CloudTrail and CloudWatch is one of the most common Cloud Practitioner mistakes, so slow down on those questions."
  ],
  "analogy": "Think of a car. CloudTrail is the trip log that records who drove, where and when, so you can find out who left the doors unlocked. CloudWatch is the dashboard with its speedometer, fuel gauge and warning lights, telling you how the car is running right now and lighting up when something crosses a limit. Trusted Advisor is the mechanic's inspection report recommending new tires and pointing out a broken lock. The analogy stops in one place: a mechanic may fix the problem for you, but Trusted Advisor never changes your account; it only recommends.",
  "terms": [
   [
    "AWS CloudTrail",
    "A service that records API calls and account activity, showing who did what, when and from where."
   ],
   [
    "Event history",
    "The CloudTrail console view of the last 90 days of management events in a Region, available at no charge."
   ],
   [
    "Trail",
    "A CloudTrail configuration that delivers log files to an S3 bucket for long-term retention and analysis."
   ],
   [
    "Data events",
    "High-volume CloudTrail events such as S3 object reads or Lambda invocations, which are not logged by default."
   ],
   [
    "Amazon CloudWatch",
    "A monitoring service for metrics, logs, dashboards and alarms."
   ],
   [
    "CloudWatch alarm",
    "A watch on a metric that notifies or takes action when a threshold is crossed."
   ],
   [
    "Metric filter",
    "A CloudWatch Logs pattern that turns matching log events into a metric you can alarm on."
   ],
   [
    "AWS Trusted Advisor",
    "A service that checks your account against best practices for cost, performance, security, fault tolerance, service limits and operational excellence."
   ]
  ],
  "example": "An e-commerce company's database was deleted over a weekend, and nobody knew how. Its organization trail showed the DeleteDBInstance call came from a developer's role during an automation test gone wrong. The company then added deletion protection, created a CloudWatch alarm on CloudTrail events for database deletions, and reviewed Trusted Advisor's security checks, which also revealed two security groups open to the internet.",
  "mistakes": [
   [
    "Choosing CloudWatch to find out who made a change.",
    "Who did what and when is recorded by CloudTrail. CloudWatch is for metrics, logs, dashboards and alarms."
   ],
   [
    "Choosing CloudTrail to set a CPU threshold alarm.",
    "Metric thresholds and alarms are CloudWatch features."
   ],
   [
    "\"CloudTrail keeps every event forever, including S3 object reads.\"",
    "Event history covers 90 days of management events. Long-term retention needs a trail, and data events must be enabled explicitly."
   ],
   [
    "\"Trusted Advisor fixes the problems it finds.\"",
    "Trusted Advisor only recommends; you act. Also, do not confuse it with AWS Config, which records configuration history and evaluates your own rules."
   ]
  ],
  "tryit": [
   [
    "Ruth at Oakmont Library Services is asked by an auditor to prove who read specific objects in a sensitive S3 bucket over the last six months. The team has only ever used CloudTrail Event history. Can they answer, and what should they change?",
    "Not from Event history alone: it covers only 90 days of management events, and S3 object reads are data events that are not logged by default. Going forward, Oakmont should create a trail that delivers to an S3 bucket with data events enabled for that bucket, and turn on log file integrity validation."
   ],
   [
    "Oakmont's IT lead wants an email whenever anyone signs in as the root user. Which services work together to do this?",
    "CloudTrail records the root sign-in event. Sending CloudTrail logs to CloudWatch Logs with a metric filter and a CloudWatch alarm that notifies through Amazon SNS will send the email (an Amazon EventBridge rule is another option)."
   ]
  ],
  "tip": "'Who made this change?' or 'audit API calls' is CloudTrail. 'CPU utilization', 'set an alarm' or 'collect application logs' is CloudWatch. 'Best practice recommendations including open security groups and root MFA' is Trusted Advisor.",
  "check": [
   [
    "Which service tells you which IAM identity deleted an S3 bucket?",
    "AWS CloudTrail, which records API calls with the caller identity, time and source IP."
   ],
   [
    "How can you be alerted when the root user signs in?",
    "Send CloudTrail logs to CloudWatch Logs, create a metric filter for root sign-in events and set a CloudWatch alarm that notifies through SNS (an EventBridge rule also works)."
   ],
   [
    "How far back does CloudTrail Event history go without creating a trail?",
    "90 days of management events in the Region."
   ],
   [
    "What is needed to get the full set of Trusted Advisor checks?",
    "A Business, Enterprise On-Ramp or Enterprise support plan; other customers get the core security and service quota checks."
   ]
  ]
 },
 {
  "t": "Where to get security help: AWS security documentation, AWS Knowledge Center, AWS Marketplace security products and AWS Partners",
  "hook": "It is Monday morning at Harbor Credit Union, and you have four messages waiting. A developer cannot open an Amazon S3 bucket and keeps seeing Access Denied. The risk manager wants the firewall brand the credit union has trusted for ten years, but running in AWS. The chief information officer wants an outside firm to review the new account design before launch. And an auditor has emailed asking for proof that AWS's own data centers are independently assessed. Four questions, four different places to look. If you send each one to the wrong place, you lose days. Where does each request belong?",
  "simple": "When you need help keeping your AWS setup safe, there are a few different places to go, and each is good for a different kind of help. Think of fixing up a house. The instruction manual tells you how each appliance works safely; that is the AWS documentation. A neighborhood help forum full of people who have had the same problem is like AWS re:Post and the Knowledge Center. A hardware store where you can buy ready-made locks and alarms from many brands is like AWS Marketplace. And a licensed contractor you hire to do the work is like an AWS Partner. Pick the place that matches the kind of help you need: reading, quick answers, buying a product, or hiring people.",
  "body": [
   "No one secures a cloud environment alone. Even a skilled team needs official guidance on how each service works, quick answers to common problems, security products it does not want to build itself and, sometimes, outside experts. The Cloud Practitioner exam expects you to know where to turn for each of these needs and to tell the resources apart, because several of them sound similar. A useful mental model is four shelves: official documentation to read, self-service answers to search, products to buy, and people to hire. A few special-purpose contacts, such as AWS Artifact and the AWS Trust & Safety team, sit beside those shelves and are tested too.",
   "AWS security documentation is the first shelf and the starting point for most questions. Every service's documentation has a Security chapter that explains how the shared responsibility model applies to that service, which encryption and access controls it offers, how to log its activity and which compliance programs cover it. For example, the Security chapter for Amazon Simple Storage Service (Amazon S3) explains bucket policies, Block Public Access and server-side encryption options. The AWS Security Blog publishes practical guidance and walk-throughs of new features, and AWS Security Bulletins announce security issues that affect AWS services, together with any action customers need to take. When a widely reported vulnerability appears, the bulletin is where AWS states whether its services are affected and what you should do.",
   "For deeper best practice, read the Security Pillar of the AWS Well-Architected Framework and the AWS security whitepapers. These explain design principles rather than buttons: implement a strong identity foundation with least privilege, enable traceability by logging and monitoring actions, apply security at all layers, automate security best practices, protect data in transit and at rest, and prepare for security events. The AWS Prescriptive Guidance library adds step-by-step patterns and strategies written by AWS experts, which is useful when you know what you want to achieve but not the exact steps.",
   "The AWS Knowledge Center is the second shelf. It is a collection of articles and videos that answer the questions AWS Support receives most often, such as how to troubleshoot an Access Denied error on an S3 bucket or how to rotate access keys for an AWS Identity and Access Management (IAM) user. The Knowledge Center is now hosted on AWS re:Post, AWS's community question-and-answer site, where anyone can post a question and get answers from other customers, community experts and AWS employees. Neither requires a paid Support plan. When your question is common and practical, these are faster than opening a support case. When it concerns your specific account, such as a billing anomaly or a production outage, a support case is the right path because only AWS Support can look at your account.",
   "AWS Marketplace is the third shelf. It is a curated digital catalog of third-party software, data and services that run on AWS. For security you can find next-generation firewalls, endpoint protection, vulnerability scanners, identity tools and security information and event management (SIEM) products. Many listings offer free trials and pay-as-you-go or annual pricing, and the charges appear on your AWS bill, which simplifies procurement because finance teams do not need a separate contract and invoice for every vendor. Marketplace is the answer when an organization wants to keep using a security vendor it already knows, or wants a ready product rather than building a control from AWS services such as AWS WAF (web application firewall) or Amazon GuardDuty.",
   "When you need people rather than products, look to the fourth shelf, the AWS Partner Network (APN). Consulting, or services, partners can design and implement security controls, run assessments, or provide managed detection and response. Partners with an AWS Security Competency have had their expertise and customer success validated by AWS, which gives you a shortcut when choosing a firm. Technology partners, by contrast, build the software products you often find in Marketplace. AWS Professional Services, AWS's own consulting team made up of AWS employees, works on large engagements, often alongside partners.",
   "Two more contacts matter and appear often as distractors. AWS Artifact is the self-service portal where you download AWS's own compliance reports, such as System and Organization Controls (SOC) reports and International Organization for Standardization (ISO) certifications, and accept agreements such as the Business Associate Addendum. The AWS Trust & Safety team is where you report AWS resources being used for abuse, such as spam, port scanning, denial-of-service attacks or phishing sites hosted on AWS Internet Protocol (IP) addresses. If you receive an abuse notice from AWS about your own account, you respond to Trust & Safety and fix the issue.",
   "Consider a worked example. A small retailer moving to AWS wants three things: to understand how encryption works in Amazon Relational Database Service (Amazon RDS), a familiar firewall product it already licenses on premises, and help designing a secure multi-account setup. The security team reads the Security chapter of the RDS documentation for encryption options. It subscribes to the vendor's firewall appliance through AWS Marketplace, with charges added to its AWS bill. It hires an APN consulting partner with a Security Competency to design the account structure. When an engineer hits an Access Denied error, a Knowledge Center article on re:Post solves it in minutes, and when the auditor asks about AWS data centers, the team downloads the SOC report from AWS Artifact.",
   "Common mistakes follow predictable patterns: thinking AWS Marketplace sells only AWS products, when it is mostly third-party; looking for compliance reports in Marketplace or the Knowledge Center instead of AWS Artifact; sending abuse reports to AWS Support or expecting GuardDuty to handle them, when the Trust & Safety team is the contact; and assuming re:Post or the Knowledge Center need a paid Support plan. Another trap is confusing APN partners, which are outside companies, with AWS Professional Services, which is staffed by AWS employees. Both provide expertise, but the question wording usually tells you which one is meant.",
   "Exam questions are usually short scenarios with a clue word. 'Official guidance on how a service handles security' points to AWS documentation or the Security Pillar. 'Answers to frequently asked technical questions' points to the Knowledge Center, and 'community forum' or 'ask the community' points to re:Post. 'Purchase a third-party security tool billed through AWS' points to AWS Marketplace. 'Hire experts to help design or run security' points to AWS Partners or AWS Professional Services. 'Download compliance reports' points to AWS Artifact, and 'report spam or an attack coming from an AWS IP address' points to AWS Trust & Safety."
  ],
  "analogy": "Securing AWS is like renovating a house. The appliance manuals are the AWS documentation, the neighborhood help forum is re:Post and the Knowledge Center, the hardware store stocking many brands of locks and alarms is AWS Marketplace, and the licensed contractor you hire is an AWS Partner. The building inspector's certificate for the house's foundation is AWS Artifact. The analogy stops where billing is concerned: unlike a hardware store, Marketplace purchases land on the same AWS bill you already pay.",
  "terms": [
   [
    "AWS Knowledge Center",
    "A collection of articles and videos, hosted on re:Post, answering the questions AWS Support receives most often."
   ],
   [
    "AWS re:Post",
    "AWS's community question-and-answer site where customers, community experts and AWS employees answer technical questions."
   ],
   [
    "AWS Marketplace",
    "A curated catalog of mostly third-party software, data and services that run on AWS and can be billed through your AWS account."
   ],
   [
    "AWS Partner Network (APN)",
    "The global community of consulting (services) and technology companies that build services and solutions on AWS."
   ],
   [
    "AWS Security Bulletins",
    "Official notices of security issues affecting AWS services and any action customers need to take."
   ],
   [
    "AWS Artifact",
    "The self-service portal for downloading AWS compliance reports and accepting agreements."
   ],
   [
    "AWS Trust & Safety team",
    "The AWS team that receives reports of AWS resources being used for abuse such as spam or attacks."
   ],
   [
    "Security Competency",
    "An AWS validation showing a partner has proven expertise and customer success in security."
   ]
  ],
  "example": "A healthcare startup needs an intrusion detection product it already trusts, but its on-premises license does not transfer. The team finds the vendor's listing in AWS Marketplace, subscribes with hourly pricing that appears on the AWS bill, and deploys it in a day. To review the overall design before going live, it engages an APN consulting partner with a Security Competency, and it uses AWS Artifact to download the reports its auditors request.",
  "mistakes": [
   [
    "AWS Marketplace is where you buy AWS's own security services such as GuardDuty.",
    "Marketplace is mostly third-party software, data and services. AWS services like GuardDuty are enabled directly in your account."
   ],
   [
    "Compliance reports such as SOC reports are found in the Knowledge Center or Marketplace.",
    "AWS's own compliance reports and agreements are downloaded from AWS Artifact."
   ],
   [
    "You need a paid Support plan to use re:Post or the Knowledge Center.",
    "Both are available to everyone. A paid plan matters for opening technical support cases about your account."
   ],
   [
    "Abuse coming from an AWS IP address should be reported to AWS Support or detected by GuardDuty.",
    "Abuse reports go to the AWS Trust & Safety team. GuardDuty detects threats against your own account, not abuse you see from others."
   ]
  ],
  "tryit": [
   [
    "Priya, the only security engineer at a small logistics firm, has three tasks this week. She needs to know which encryption options Amazon DynamoDB supports, she wants a vulnerability scanner her old employer used, and she keeps getting the same IAM policy error that many people online seem to have hit. Which resource should she use for each task?",
    "Read the Security chapter of the DynamoDB documentation for encryption options, because that is official service-level guidance. Subscribe to the scanner through AWS Marketplace, where third-party tools are sold and billed through AWS. Search the Knowledge Center or ask on re:Post for the common IAM error, since it is a frequent, non-account-specific question."
   ],
   [
    "A web host notices repeated login attempts against its servers coming from an IP address that belongs to AWS. The owner asks whether to open an AWS Support case or turn on GuardDuty. What is the better action?",
    "Report it to the AWS Trust & Safety team, which handles abuse originating from AWS resources. GuardDuty protects your own AWS account and would not act on another customer's resources, and a Support case is for problems with your own account."
   ]
  ],
  "tip": "Marketplace sells mostly third-party products. Compliance reports come from AWS Artifact, common answers from the Knowledge Center or re:Post, hired experts from APN partners or Professional Services, and abuse reports go to Trust & Safety.",
  "check": [
   [
    "A company wants to buy a familiar vendor's firewall and pay for it through its AWS bill. Where should it look?",
    "AWS Marketplace, the curated catalog of third-party software that can be billed through the AWS account."
   ],
   [
    "Where do you find step-by-step answers to common problems such as troubleshooting Access Denied errors?",
    "The AWS Knowledge Center (hosted on re:Post), which collects answers to the questions AWS Support gets most often."
   ],
   [
    "An organization wants outside experts with validated security expertise to design its controls. What should it use?",
    "An AWS Partner Network consulting partner, ideally one with an AWS Security Competency."
   ],
   [
    "Is AWS Marketplace the place to download AWS's SOC reports?",
    "No. AWS's own compliance reports and agreements are downloaded from AWS Artifact."
   ],
   [
    "Where does AWS announce security issues affecting its services and the actions customers should take?",
    "AWS Security Bulletins."
   ]
  ]
 },
 {
  "t": "Ways to use AWS: AWS Management Console, AWS CLI, SDKs, APIs and infrastructure as code with AWS CloudFormation",
  "hook": "It is Thursday afternoon at Lantern Health, and Marco has just finished building the new test environment by hand in the AWS console: a network, two servers, a database and a load balancer. It took him most of the day. Then his manager stops by. The auditors liked it, she says, so now we need the exact same thing for development and production, in two Regions, by next Friday. Marco does the math: six more days of clicking, and no guarantee that every copy will match. Somewhere in his notes he has missed a setting, and he knows it. Is there a better way to build the same thing again and again?",
  "simple": "Every action in AWS, like making a storage folder or starting a server, is really a request sent to AWS behind the scenes. There are several ways to send those requests. You can click buttons on a website (the console), type short commands into a text window (the command line), let your own app send them (software kits for programmers), or write down your whole setup in a file and let AWS build it for you (infrastructure as code). Think of ordering at a restaurant: you can point at the menu, call in your order, have an app order for you, or hand over a written recipe the kitchen follows exactly every time. The written recipe is the best way to get the same meal again and again.",
  "body": [
   "Everything you do in AWS, whether creating a bucket, launching a server or reading a bill, is ultimately an application programming interface (API) call to an AWS service. Each request is authenticated with your credentials, checked against your permissions and usually recorded by AWS CloudTrail, so an audit log shows who did what and when. The different ways of using AWS are simply different front ends for those same APIs. The exam asks you to match each front end to the kind of work it suits: exploring, scripting, writing applications or building repeatable infrastructure.",
   "The AWS Management Console is the web-based graphical interface. You sign in through a browser, pick a Region from the menu at the top right, and use wizards, forms and dashboards. It is ideal for learning, exploring a new service, one-off tasks and visual monitoring, and the AWS Console Mobile Application lets you check resources and alarms on the go. The console is easy but not repeatable: if you must build the same environment ten times, clicking through it ten times is slow, error-prone and hard to audit, because nothing records your intent, only the individual calls. Console sign-in should use a user from AWS IAM Identity Center (IAM stands for Identity and Access Management) or an IAM user with multi-factor authentication (MFA), never the root user for daily work. Every click still becomes an API call recorded in CloudTrail.",
   "The AWS Command Line Interface (AWS CLI) lets you control services by typing commands in a terminal, which makes tasks scriptable. You set it up with `aws configure`, or better, with single sign-on through `aws configure sso`, so you use short-lived credentials instead of long-term access keys. Then you run commands such as `aws s3 ls` or `aws ec2 describe-instances --region eu-west-1`. AWS CloudShell is a browser-based shell launched from the console that is already authenticated as your console identity and has the CLI installed, so you need no local setup or stored keys. The CLI prints results as JavaScript Object Notation (JSON), text or tables, and the `--query` option filters output, which makes it easy to feed results into other scripts. The example below creates an Amazon Simple Storage Service (Amazon S3) bucket, uploads a file and lists the contents.",
   "```bash\naws s3 mb s3://example-lesson-bucket-12345\naws s3 cp report.csv s3://example-lesson-bucket-12345/\naws s3 ls s3://example-lesson-bucket-12345/\n```",
   "Software development kits (SDKs) let application code call AWS services in languages such as Python (Boto3), JavaScript, Java, Go and .NET. The SDK signs each request, handles retries when a service is briefly busy and turns responses into native objects, so a photo-sharing app can upload a picture to S3 with one function call instead of building raw web requests. You could call the Hypertext Transfer Protocol Secure (HTTPS) APIs directly, but the SDKs and CLI are far more convenient and less error-prone. The rule of thumb is simple: the CLI is for people and scripts operating AWS, while SDKs are for applications that use AWS as part of what they do.",
   "Infrastructure as code (IaC) goes further and describes the desired end state rather than a series of steps. With AWS CloudFormation you describe resources such as a virtual private cloud (VPC), subnets, instances and a database in a JSON or YAML (a human-readable data format) template, and CloudFormation creates them together as a stack, in the right order, handling dependencies such as creating the network before the servers inside it. It can update the stack when you change the template and delete the whole stack consistently. Templates can be stored in version control, reviewed in pull requests and reused across accounts and Regions, so every environment matches. The AWS Cloud Development Kit (CDK) lets developers write the same infrastructure in a familiar programming language and generates CloudFormation templates for them.",
   "Consider a worked example. A team builds its first test environment by clicking through the console, which is fine for learning. When it needs identical development, test and production environments in two Regions, it writes a CloudFormation template and deploys it with `aws cloudformation deploy --template-file app.yaml --stack-name shop-dev`, changing only a few parameters for each environment. An operations engineer uses the CLI in a nightly script to copy logs to S3, and the web application itself uses the Python SDK to store customer uploads. Each tool is used where it fits best, and they all call the same underlying APIs.",
   "Common mistakes: believing the console and CLI reach different features, when they call the same APIs, though a brand-new feature may appear in one first; thinking CloudFormation is only for large companies; forgetting that deleting a stack deletes the resources it created; storing long-term access keys on laptops when CloudShell or temporary credentials would do; and confusing CloudFormation, which provisions infrastructure, with AWS Elastic Beanstalk, which deploys an application onto infrastructure it manages for you. Another trap is assuming the CLI makes things repeatable on its own; only scripts or templates kept in version control do.",
   "On the exam, 'explore a service' or 'one-time task through a graphical interface' points to the Management Console. 'Automate tasks with scripts' or 'terminal' points to the AWS CLI, and 'without installing anything on the laptop' suggests CloudShell. 'Call AWS from application code' points to an SDK. 'Deploy the same infrastructure repeatedly and consistently', 'across accounts or Regions', 'templates' or 'infrastructure as code' point to AWS CloudFormation, with the CDK as the answer when developers want a familiar programming language."
  ],
  "analogy": "Using AWS is like getting a house built. The console is standing on site and pointing at where each wall goes, which works once but is hard to repeat exactly. The CLI is phoning instructions to the crew, quicker and scriptable. An SDK is a smart home app that talks to the house on its own. CloudFormation is handing over a full set of blueprints that any crew can follow to build identical houses anywhere. The analogy stops at demolition: deleting a CloudFormation stack really does tear down everything it built.",
  "terms": [
   [
    "API",
    "Application programming interface: the defined set of requests every AWS service accepts; all tools ultimately call it."
   ],
   [
    "AWS Management Console",
    "The browser-based graphical interface for managing AWS services."
   ],
   [
    "AWS CLI",
    "The command line tool for calling AWS service APIs from a terminal or script."
   ],
   [
    "AWS CloudShell",
    "A browser-based, pre-authenticated shell with the AWS CLI installed, launched from the console."
   ],
   [
    "SDK",
    "A software development kit: language-specific libraries that let application code call AWS APIs."
   ],
   [
    "Infrastructure as code (IaC)",
    "Defining and provisioning infrastructure through machine-readable templates or code rather than manual steps."
   ],
   [
    "AWS CloudFormation",
    "The AWS service that creates, updates and deletes resources as a stack from a JSON or YAML template."
   ],
   [
    "AWS CDK",
    "The Cloud Development Kit, which defines infrastructure in a programming language and synthesizes CloudFormation templates."
   ]
  ],
  "example": "A software company onboards a new customer every week, and each customer gets an isolated environment with a VPC, load balancer, database and monitoring. Building each by hand in the console took a day and produced small differences that caused outages. The team captured the design in a CloudFormation template stored in Git, and now a pipeline creates each environment as a stack in under an hour, identical every time, and removes it cleanly when a customer leaves.",
  "mistakes": [
   [
    "The AWS CLI is the infrastructure as code answer because it automates things.",
    "The CLI runs commands; IaC means a declarative template or code describing resources, which on AWS is CloudFormation (or the CDK generating CloudFormation)."
   ],
   [
    "The console and the CLI can do different things.",
    "Both call the same service APIs. A new feature may appear in one slightly earlier, but they are front ends to the same capabilities."
   ],
   [
    "CloudFormation and Elastic Beanstalk are the same kind of service.",
    "CloudFormation provisions whatever resources a template defines; Elastic Beanstalk deploys an application and manages the environment it runs on."
   ],
   [
    "Deleting a CloudFormation stack leaves the resources in place.",
    "Deleting a stack deletes the resources it created, unless they were set to be retained."
   ]
  ],
  "tryit": [
   [
    "Amara is a contractor working from a library computer for one afternoon. She needs to run a few AWS CLI commands to list instances in a client account, but she must not install software or store any access keys on the machine. What should she use?",
    "AWS CloudShell. It runs in the browser from the console, is already authenticated as her console identity and has the CLI installed, so nothing is installed locally and no keys are stored."
   ],
   [
    "A games studio must create the same network, servers and database in three accounts for development, testing and production, and auditors want every change reviewed before it goes live. The lead developers prefer TypeScript over YAML. Which approach fits best?",
    "Infrastructure as code with the AWS CDK written in TypeScript, which synthesizes CloudFormation templates. The code can live in version control and be reviewed, and CloudFormation deploys identical stacks in each account."
   ]
  ],
  "tip": "Repeatable, consistent deployment across accounts or Regions, or 'infrastructure as code', means CloudFormation. The CLI scripts tasks and SDKs are for application code; neither is the IaC answer.",
  "check": [
   [
    "A developer's application must upload files to S3 from Python code. Which access method fits?",
    "An AWS SDK (Boto3 for Python), which lets application code call AWS APIs with signing and retries handled."
   ],
   [
    "Which service lets you define a VPC, instances and database in a YAML file and create them together?",
    "AWS CloudFormation, which provisions the resources as a stack from the template."
   ],
   [
    "How can an administrator run CLI commands without installing or configuring anything locally?",
    "Use AWS CloudShell, a pre-authenticated browser shell with the CLI installed."
   ],
   [
    "Why is the console a poor choice for building identical production environments in three Regions?",
    "Manual clicks are not repeatable or auditable, so environments drift; a template-based approach like CloudFormation is consistent."
   ]
  ]
 },
 {
  "t": "Deployment models (cloud, hybrid and on-premises) and one-time vs repeatable provisioning",
  "hook": "You are sitting in a planning meeting at Ridgeway Manufacturing. The plant manager insists the robot-control software stays on the factory floor, because a delay of even a fraction of a second could stop the assembly line. The marketing director wants the new online store running on AWS by spring. The finance lead asks whether this means the company is 'in the cloud' or not. Then the IT director adds a worry of his own: the prototype store was built by hand last month, and nobody is sure exactly how. What do you call this mix, and how do you make sure the store can be rebuilt if something goes wrong?",
  "simple": "A deployment model is simply where your computer systems live. Cloud means everything runs on a provider's computers, like AWS. On-premises means everything runs on computers in your own building. Hybrid means some of each, connected so they work together. Think of where you keep your belongings: all in a rented storage unit (cloud), all at home (on-premises), or some at home and some in storage with a car trip connecting them (hybrid). Provisioning is how you set things up. You can set something up once by hand, which is fine for trying things out, or write down the exact steps so you can set it up the same way again any time, which is what you want for anything important.",
  "body": [
   "A deployment model describes where your applications and their infrastructure run. AWS describes three: cloud, hybrid and on-premises. The exam gives you a scenario and asks which model it is, or why an organization might choose it, so focus on the location clues in the wording. This topic also covers how you create resources, either once by hand or repeatably through code, because that choice affects reliability, security and your ability to recover from mistakes or disasters.",
   "In a cloud deployment, sometimes called cloud-native or all-in, every part of the application runs in the cloud. It may have been built there from the start or fully migrated from an old data center. It can use low-level infrastructure such as Amazon Elastic Compute Cloud (Amazon EC2) instances, or higher-level managed and serverless services such as AWS Lambda and Amazon DynamoDB. A company with no data center of its own that runs everything on AWS uses the cloud model, even if it spreads workloads across several Regions or many accounts. The defining feature is that nothing important runs on hardware the company owns.",
   "A hybrid deployment connects cloud resources to infrastructure that stays on premises. Organizations choose hybrid when some systems cannot move yet because of regulations, very low latency needs, dependence on local hardware such as factory equipment or medical devices, or a gradual migration plan, while still wanting cloud benefits elsewhere. A company might keep its legacy enterprise resource planning (ERP) system in its own data center and run new customer-facing web apps on AWS, linked by AWS Site-to-Site VPN (virtual private network) or AWS Direct Connect. Services such as AWS Outposts, AWS Storage Gateway and AWS Systems Manager, which can manage on-premises servers alongside cloud instances, support hybrid setups.",
   "The key idea in hybrid is that the two environments work together as one system. Users, data and management tools span both locations, for example a single identity directory for staff, data flowing from the plant to analytics in AWS, and one patching tool for every server. Two environments that merely exist side by side with no connection are not a meaningful hybrid design. Hybrid is also not always temporary: for some regulated or latency-sensitive workloads it is a deliberate long-term choice.",
   "An on-premises deployment, sometimes called a private cloud, runs resources in the organization's own data center using virtualization and resource management tools to get some cloud-like agility, such as self-service creation of virtual machines. It gives maximum physical control but not the scale, global reach or pay-as-you-go economics of the public cloud. The organization buys the hardware up front, a capital expense (CapEx), and must plan capacity in advance, guessing how much it will need years ahead. The cloud turns this into a variable operating expense (OpEx) that rises and falls with actual use.",
   "Provisioning is how you create resources, and it can be one-time or repeatable. One-time provisioning, such as launching a test instance in the console, is fine for experiments, demos and learning. Repeatable provisioning uses code or templates, such as AWS CloudFormation, the AWS Cloud Development Kit (CDK) or AWS Command Line Interface (CLI) scripts kept in version control, so the same configuration can be recreated in another environment, account or Region. Production should be provisioned repeatably because manual steps are easy to forget, hard to audit and nearly impossible to reproduce exactly after a disaster. Templates also make reviews possible: a colleague can spot an overly open security group rule in a pull request before it reaches production, and the version history shows exactly who changed what.",
   "Consider a worked example. A manufacturer runs machine-control software that must respond within milliseconds on the factory floor, while its online store and analytics can run anywhere. It keeps the control systems in the plant, deploys the store on AWS, and connects the two with Direct Connect, which makes it a hybrid model. The store's environment is defined in a CloudFormation template, so the team can stand up a staging copy for testing and rebuild production in another Region during a disaster recovery drill. The first prototype, built by hand in the console, was one-time provisioning and was deleted once the template existed.",
   "Common mistakes: calling a multi-Region or multi-account AWS design 'hybrid', when it is still cloud because nothing runs on premises; assuming hybrid is always a temporary state; thinking private cloud means a dedicated AWS account; and treating repeatable provisioning as optional for production. Another trap is assuming Outposts makes a workload 'cloud only'. Outposts hardware sits in your own facility, so it supports hybrid designs even though it runs AWS services.",
   "On the exam, look for location clues. 'Everything runs on AWS' or 'no data center' means cloud. 'Keeps some systems in its own data center and connects them to AWS' means hybrid. 'Virtualization in the company's own data center' means on-premises or private cloud. For provisioning, 'consistent', 'repeatable', 'multiple environments' or 'recover quickly by recreating infrastructure' point to repeatable provisioning with infrastructure as code, while 'quick experiment' or 'one-off test' is where one-time console provisioning is acceptable."
  ],
  "analogy": "Deployment models are like where a family keeps its things. Cloud is renting a fully serviced storage unit for everything. On-premises is keeping it all in your own house, where you control every shelf but must buy every shelf. Hybrid is some of each, with a regular car trip linking them so the family treats both as one collection. Repeatable provisioning is keeping a packing list, so you can set up an identical room anywhere. The analogy weakens on cost: AWS bills you only for what you use, while a storage unit is a fixed rent.",
  "terms": [
   [
    "Cloud deployment",
    "A model where all parts of an application run in the cloud."
   ],
   [
    "Hybrid deployment",
    "A model that connects cloud resources with infrastructure that remains on premises so they operate together."
   ],
   [
    "On-premises (private cloud)",
    "A model where resources run in the organization's own data center using virtualization and management tools."
   ],
   [
    "One-time provisioning",
    "Creating resources manually for a single use, typically through the console."
   ],
   [
    "Repeatable provisioning",
    "Creating resources from code or templates so the same configuration can be recreated consistently."
   ],
   [
    "CapEx and OpEx",
    "Capital expense is money spent up front on owned assets; operating expense is ongoing spending that varies with use."
   ],
   [
    "AWS Outposts",
    "AWS-managed hardware installed in a customer's facility to run AWS services on premises."
   ]
  ],
  "example": "A bank must keep its core ledger on hardware in its own data centers for regulatory reasons, but wants to use AWS for a new mobile banking front end and fraud analytics. It links the data center to a VPC with AWS Direct Connect and a backup Site-to-Site VPN, creating a hybrid deployment. All the AWS pieces are defined in CloudFormation so auditors can review changes and the bank can rebuild them in a second Region.",
  "mistakes": [
   [
    "A company running in three AWS Regions with many accounts has a hybrid deployment.",
    "It is still a cloud deployment. Hybrid requires on-premises infrastructure connected to the cloud."
   ],
   [
    "Hybrid is just a stage on the way to moving everything to the cloud.",
    "It can be, but for regulated, latency-sensitive or hardware-dependent workloads hybrid is often a deliberate long-term model."
   ],
   [
    "Using AWS Outposts means the workload is fully in the cloud.",
    "Outposts racks sit in your own facility, so they support hybrid and on-premises needs while using AWS services and APIs."
   ],
   [
    "Building production by hand in the console is fine if you take good notes.",
    "Notes drift and steps get missed. Repeatable provisioning with templates gives consistent, reviewable, rebuildable environments."
   ]
  ],
  "tryit": [
   [
    "Northfield Clinic runs its patient records system on servers in its own building because of a local regulation. It wants to move appointment booking and email reminders to AWS, and both systems must share the same patient identifiers and staff logins. Which deployment model is this, and what makes it that model?",
    "Hybrid. Some systems remain on premises while others run on AWS, and they are connected to work as one system through shared identity and data, typically over a Site-to-Site VPN or Direct Connect."
   ],
   [
    "A developer launched three EC2 instances by hand to test a new idea. The test went well, and now the team wants the same setup in development, staging and production. Should they keep using the console?",
    "No. The console was fine for a one-time experiment, but three matching environments call for repeatable provisioning with a CloudFormation template or CDK code, so every environment is identical, reviewable and easy to rebuild."
   ]
  ],
  "tip": "Hybrid needs both on-premises infrastructure and cloud resources connected together. Multi-Region or multi-account designs that run entirely on AWS are still the cloud model.",
  "check": [
   [
    "A startup with no servers of its own runs all workloads on AWS in two Regions. Which deployment model is this?",
    "Cloud (all-in), because nothing runs on premises; multiple Regions does not make it hybrid."
   ],
   [
    "Name two reasons an organization might choose a hybrid model.",
    "Regulations or data that must stay on premises, very low latency to local equipment, or a gradual migration of legacy systems."
   ],
   [
    "Why should production infrastructure be provisioned repeatably?",
    "Templates or code recreate the same configuration consistently, can be reviewed and audited, and allow fast rebuilding after a disaster."
   ],
   [
    "Which AWS offering places AWS hardware and services inside a customer's own data center?",
    "AWS Outposts."
   ]
  ]
 },
 {
  "t": "AWS global infrastructure: Regions, Availability Zones, edge locations, Local Zones, Wavelength Zones and AWS Outposts",
  "hook": "At 9:40 on a Saturday night, Juniper Tickets' phones start ringing. The concert sale opened twenty minutes ago and the website is down. Theo, the on-call engineer, opens the dashboard and sees the cause at once: every server and the database sit in a single data center, and that data center has lost power. Competitors with the same cloud provider are still selling tickets. Tomorrow the chief executive will ask Theo two questions: why did this happen to us and not to them, and what would it take to survive not just a data center outage but a whole Region going dark?",
  "simple": "AWS has computers all over the world, organized in layers. A Region is a big area, like a country or a large city region, where AWS has several separate groups of data centers. Each separate group is an Availability Zone, built far enough apart that a fire or flood in one should not hit the others. Edge locations are smaller sites in many more cities that keep copies of popular content close to people, like a local branch library holding popular books. Local Zones, Wavelength Zones and Outposts bring AWS even closer: near a big city, inside a phone company's 5G network, or right inside your own building. Spreading your app across several zones keeps it running when one place has a problem.",
  "body": [
   "AWS runs its services on a worldwide network of facilities, and each building block serves a different purpose. Understanding them lets you design for high availability, low latency and compliance, and the exam frequently asks which building block solves a given problem. Work from the largest unit to the most specialized: Regions, Availability Zones, edge locations, then Local Zones, Wavelength Zones and Outposts. For each one, ask two questions: what failure does it protect against, and how close does it put computing to the user?",
   "A Region is a separate geographic area, such as a metropolitan area in a particular country, that contains multiple isolated Availability Zones. Regions are independent of each other, and your data does not leave a Region unless you move or replicate it, which is why Regions matter for data residency laws. Most services are Regional, so you choose the Region when you create a resource, and resources in one Region are not visible in another; if you switch the console to a different Region, your instances seem to vanish because they live elsewhere. A few services, such as AWS Identity and Access Management (IAM), Amazon Route 53 and Amazon CloudFront, are global. Region codes look like `us-east-1` or `eu-central-1`.",
   "An Availability Zone (AZ) is one or more discrete data centers with redundant power, networking and connectivity within a Region. AZs are physically separated by a meaningful distance, so a flood, fire or power failure is unlikely to affect more than one, but they are linked by high-bandwidth, low-latency networking so you can replicate data synchronously between them. AZ names look like `us-east-1a` and `us-east-1b`. Deploying across multiple AZs, for example Amazon Elastic Compute Cloud (Amazon EC2) instances in two AZs behind a load balancer and an Amazon Relational Database Service (Amazon RDS) Multi-AZ database, is the standard way to achieve high availability. AWS builds Regions with multiple AZs, typically three or more.",
   "Edge locations are sites in many more cities than there are Regions. Amazon CloudFront, the content delivery network (CDN), caches content at them close to viewers, and Route 53, AWS Global Accelerator and AWS WAF (web application firewall) also operate there to cut latency and filter attacks near the source. You do not launch EC2 instances in edge locations; they serve and protect content rather than host your servers. Because a cached copy is served from a nearby edge location, the origin in the Region receives fewer requests, which improves both speed for viewers and resilience for your application. AWS Shield Standard protection against common distributed denial-of-service (DDoS) attacks is also applied at the edge.",
   "Some workloads need lower latency than a distant Region provides. AWS Local Zones extend a parent Region by placing compute, storage and database services close to large population and industry centers, giving single-digit-millisecond latency for work such as real-time gaming, media production or live video. AWS Wavelength Zones embed compute and storage inside telecommunications providers' 5G networks, so mobile devices reach applications without traffic leaving the carrier network, which helps connected vehicles or augmented reality apps. AWS Outposts brings AWS-designed racks or servers into your own data center, running AWS services on premises with the same application programming interfaces (APIs), console and tools, for workloads that need local data processing, data residency or very low latency to on-premises systems.",
   "Consider a worked example. A streaming company serves viewers worldwide from `eu-west-1`. It runs its web tier on instances in three AZs behind a load balancer, so the loss of one data center does not interrupt service. CloudFront caches video segments at edge locations near viewers. Its live-production studio in a large city uses a Local Zone for editing workstations, a mobile game feature uses Wavelength for 5G users, and a partner broadcaster that must keep raw footage on site runs an Outposts rack. For disaster recovery, backups are copied to a second Region, because three AZs protect against a data center failure but not against a Region-wide event.",
   "Common mistakes: thinking an AZ is a single building, when it can be several data centers; using multiple AZs when the requirement is surviving the loss of an entire Region, which needs multiple Regions; expecting to run EC2 instances at edge locations; confusing Local Zones, which sit near a city, with Wavelength, which sits inside a 5G network; and assuming Outposts is a Region you pick from a list. Another trap is believing data automatically replicates between Regions; it does not unless you configure replication.",
   "On the exam, 'high availability' or 'survive a data center failure' points to multiple AZs. 'Disaster recovery from a Region-wide event' or 'data must stay in a country' points to Regions. 'Cache content close to global users' points to edge locations with CloudFront. 'Single-digit millisecond latency for users in a specific metropolitan area' points to Local Zones, '5G mobile devices' points to Wavelength, and 'AWS services running in the customer's own data center' is always Outposts."
  ],
  "analogy": "Think of a national grocery chain. A Region is one country's operation. Availability Zones are separate warehouses in that country, far enough apart that a flood at one leaves the others stocked, connected by fast trucks. Edge locations are corner shops in many towns stocking only the most popular items. A Local Zone is a big store placed right in a major city, Wavelength is a kiosk inside the phone company's network, and Outposts is a stocked pantry installed in your own kitchen. The analogy stops at stock: corner shops cannot run your servers.",
  "terms": [
   [
    "Region",
    "A separate geographic area containing multiple isolated Availability Zones."
   ],
   [
    "Availability Zone (AZ)",
    "One or more discrete data centers with redundant power and networking, isolated from others in the same Region."
   ],
   [
    "Edge location",
    "A site used by CloudFront and other edge services to cache content and serve users with low latency."
   ],
   [
    "AWS Local Zone",
    "An extension of a Region that places AWS services close to a large city for single-digit-millisecond latency."
   ],
   [
    "AWS Wavelength Zone",
    "AWS compute and storage embedded in a telecom provider's 5G network for ultra-low-latency mobile applications."
   ],
   [
    "AWS Outposts",
    "AWS-designed hardware installed on premises that runs AWS services with the same APIs and tools."
   ],
   [
    "High availability",
    "Designing a system to keep running when a component or location fails, typically by using multiple AZs."
   ]
  ],
  "example": "An online retailer deployed its application in a single AZ to save effort. When that data center lost power, the site went offline for hours. The team redesigned: instances in three AZs behind an Application Load Balancer, an RDS Multi-AZ database, and CloudFront at edge locations for product images. A later AZ outage caused no visible downtime, and nightly backups copied to another Region protect against a Region-wide disaster.",
  "mistakes": [
   [
    "Deploying in two Availability Zones protects against a Region-wide outage.",
    "Multiple AZs protect against a data center failure. Surviving the loss of a whole Region requires resources or backups in another Region."
   ],
   [
    "You can launch EC2 instances in edge locations to get closer to users.",
    "Edge locations run CloudFront and other edge services. Instances run in Regions, Local Zones, Wavelength Zones or on Outposts."
   ],
   [
    "Local Zones and Wavelength Zones are the same thing.",
    "Local Zones place services near large cities; Wavelength Zones sit inside telecom 5G networks for mobile devices."
   ],
   [
    "Data in one Region is automatically copied to another for safety.",
    "Data stays in its Region unless you configure replication or copy it yourself."
   ]
  ],
  "tryit": [
   [
    "Copperline Media wants its video editors in one large city to work on cloud workstations with single-digit-millisecond latency. Separately, a regulator requires that raw footage from one partner never leaves that partner's own building, though the partner wants to use the same AWS tools. Which infrastructure option fits each need?",
    "A Local Zone near the city for the editors, because it extends a Region with low-latency compute close to users. AWS Outposts for the partner, because it runs AWS services on hardware inside the partner's own facility."
   ],
   [
    "An online learning platform runs in one Region across three AZs. Students on other continents complain that course videos load slowly, but the application itself is fine. What is the simplest improvement?",
    "Use Amazon CloudFront so video content is cached at edge locations near students. The problem is distance for static content, not availability, so adding AZs would not help."
   ]
  ],
  "tip": "High availability questions want multiple Availability Zones; surviving a whole-Region event wants multiple Regions. 'AWS services in the customer's own data center' is Outposts, and '5G' is Wavelength.",
  "check": [
   [
    "What is the standard way to make an application highly available within a Region?",
    "Deploy it across multiple Availability Zones, for example behind a load balancer with a Multi-AZ database."
   ],
   [
    "Can you launch EC2 instances in an edge location?",
    "No. Edge locations serve CloudFront and other edge services; instances run in Regions, Local Zones, Wavelength Zones or Outposts."
   ],
   [
    "A game studio needs single-digit-millisecond latency for players in one large city. Which option fits?",
    "An AWS Local Zone in or near that city, extending the parent Region."
   ],
   [
    "Does data stored in one Region automatically copy to another?",
    "No. Data stays in its Region unless you explicitly move or replicate it."
   ]
  ]
 },
 {
  "t": "Choosing a Region: compliance and data residency, latency to users, service availability and price",
  "hook": "Elena, the new cloud lead at Bluewater Pharmacy, has a spreadsheet open and a deadline on Friday. Finance has circled the cheapest Region in red and written 'use this one'. The legal team has sent a two-line email reminding her that patient prescriptions must stay in the country. The developers want a new machine learning service that, she now realizes, she has never checked the availability of. And customer support says shoppers already complain the current site feels slow. Four voices, four different answers. Which one should decide where Bluewater's systems live, and in what order should she weigh the rest?",
  "simple": "When you put something on AWS, you usually pick which part of the world it lives in, called a Region. Four things help you choose. First, the rules: some laws say certain data must stay in a certain country. Second, distance: the closer the Region is to your users, the faster your app feels. Third, the menu: not every AWS service is offered in every Region. Fourth, price: the same thing can cost a bit more or less in different places. It is like picking an apartment: first rule out places you are not allowed to live, then pick one close to work, then check it has what you need, and only then compare rent.",
  "body": [
   "Every time you create most AWS resources, you choose a Region, and that decision is hard to reverse once data and users depend on it. AWS teaches four factors to weigh: compliance and data residency, proximity to users (latency), service availability, and price. The exam often describes a situation and asks which factor should drive the decision, so you need to know each one and the order in which they usually apply. The order matters because the first factor can rule out Regions entirely, while the later ones only rank the Regions that remain.",
   "Compliance and data residency usually come first. Laws, regulations or contracts may require that certain data stays in a specific country or jurisdiction, for example personal data under a national privacy law, health records or government records. Because data you store in a Region stays there unless you explicitly move or replicate it, choosing a Region in the required country satisfies many residency requirements. If a regulation says customer records must remain in a particular country, only Regions in that country are candidates, whatever the price or latency elsewhere. You can reinforce the choice with a service control policy (SCP) in AWS Organizations that denies actions in unapproved Regions, so even an administrator in a member account cannot create resources there by mistake.",
   "Proximity to your users is next. Data takes time to travel, and every round trip between a user's browser and a distant Region adds delay, known as latency. Running an application in a Region close to its customers makes pages load and buttons respond faster. A company whose customers are mostly on one continent should normally choose a Region there. For global audiences you can run in several Regions, or use one Region plus Amazon CloudFront edge locations to cache content near users, and Amazon Route 53 latency-based routing to send each user to the Region that responds fastest for them.",
   "Service availability matters because not every AWS service, feature or instance type is offered in every Region. New services often launch in a few Regions first and expand later. If your design depends on a specific service, such as a particular machine learning service or a newer instance family, confirm it is available in the Region you plan to use; the AWS Regional Services list shows this. Newer Regions may also have fewer Availability Zones. Checking early avoids a painful redesign later, because moving an application and its data to another Region after launch means migrating data, updating Domain Name System (DNS) records and retesting everything.",
   "Pricing varies by Region. The same instance type or gigabyte of storage can cost different amounts in different Regions because of local costs such as power, land and taxes. When compliance and latency allow several choices, price can be the tie-breaker, and the AWS Pricing Calculator lets you compare Regions side by side using your own expected usage rather than list prices alone. Remember data transfer too: moving data between Regions is charged, so splitting a chatty application across Regions to save on compute can cost more overall than keeping its parts together.",
   "Consider a worked example. A healthcare company in Germany must keep patient data in Germany, most of its users are in Central Europe, and it plans to use a managed database service and a specific analytics service. Compliance rules out every Region outside Germany, leaving the Frankfurt Region (`eu-central-1`). The team confirms both services are available there, checks that latency to its users is good, and prices the design in the Pricing Calculator. Price never became the deciding factor because compliance had already narrowed the options to one. An SCP now blocks resource creation in other Regions, so a test bucket cannot accidentally appear in another country.",
   "Common mistakes: choosing the cheapest Region first and discovering later that it breaks a residency law; assuming every service exists in every Region; believing that choosing a Region automatically backs up data elsewhere; and forgetting that some services, such as AWS Identity and Access Management (IAM), are global, so Region choice does not affect them. Another trap is treating latency as irrelevant for internal tools; a Region far from staff can make daily work sluggish. Finally, a lower hourly price can be outweighed by cross-Region data transfer if components talk constantly.",
   "Exam questions tend to include one strong clue. 'Laws require data to stay in the country' or 'data sovereignty' means compliance decides, overriding price and latency. 'Users complain the application is slow from their location' points to proximity. 'The service is not offered in the chosen Region' points to service availability. 'Lowest cost among Regions that meet the requirements' points to pricing as the final filter. A good order of thinking is compliance, then latency, then service availability, then price, although availability can rise to first place when a required service exists in only a few Regions."
  ],
  "analogy": "Choosing a Region is like choosing where to open a pharmacy. First, you can only open where you hold a license, which is compliance. Then you want to be near your customers, which is latency. Next, the location must have the utilities and suppliers you need, which is service availability. Finally, among the spots that pass, you compare rent, which is price. The analogy holds well, except that moving an AWS workload later is usually harder than it looks, because data, DNS and testing all move with it.",
  "mnemonic": "Can Lawyers Stop Prices: Compliance, Latency, Service availability, Price. Rule out non-compliant Regions first, then rank the rest by distance to users, the services they offer and finally cost.",
  "terms": [
   [
    "Data residency",
    "A requirement that data be stored in a specific geographic location or jurisdiction."
   ],
   [
    "Data sovereignty",
    "The principle that data is subject to the laws of the country in which it is stored."
   ],
   [
    "Latency",
    "The delay between a request and its response, which grows with distance to the Region."
   ],
   [
    "Service availability",
    "Whether a given AWS service, feature or instance type is offered in a particular Region."
   ],
   [
    "AWS Pricing Calculator",
    "A free tool for estimating and comparing the cost of an architecture, including across Regions."
   ],
   [
    "Service control policy (SCP)",
    "An AWS Organizations policy that sets the maximum permissions in accounts, for example blocking unapproved Regions."
   ]
  ],
  "example": "An Australian online bank must keep customer financial data in Australia under its regulator's guidance. It selects the Sydney Region, which also gives low latency to its customers, confirms the managed database and fraud-detection services it needs are available there, and uses the Pricing Calculator to size the budget. An SCP denies any resource creation in other Regions so a developer cannot accidentally store data overseas.",
  "mistakes": [
   [
    "Pick the cheapest Region, then fix compliance later.",
    "Compliance and data residency come first because they can rule Regions out entirely. Price only breaks ties among compliant options."
   ],
   [
    "Every AWS service is available in every Region.",
    "Services and features roll out over time; check the AWS Regional Services list before committing."
   ],
   [
    "Splitting an application across Regions always saves money if one Region is cheaper.",
    "Cross-Region data transfer is charged, so chatty components split across Regions can cost more overall."
   ],
   [
    "Choosing a Region also backs your data up somewhere else.",
    "Data stays in the chosen Region unless you configure replication or copy it."
   ]
  ],
  "tryit": [
   [
    "Tamsin's company sells mainly to customers in Brazil. There is no law restricting where its product catalog is stored, but the team wants pages to load quickly for those customers. A Region in another continent is slightly cheaper. Which factor should lead, and what would you choose?",
    "With no compliance constraint, proximity to users leads. A Region in South America near the customers gives lower latency, and the small price difference does not outweigh a slower site. CloudFront could further speed up static content."
   ],
   [
    "A research team has chosen a Region that meets its national data law and is close to its scientists. When it starts building, it finds that a managed machine learning service it planned to use is not offered there. What should the team do?",
    "Re-evaluate using service availability: look for another compliant Region that offers the service, or change the design to use services available in the chosen Region. It must not pick a non-compliant Region just to get the service."
   ]
  ],
  "tip": "If a scenario mentions a legal or regulatory requirement about where data lives, that factor wins over price and latency. Rule out non-compliant Regions first, then weigh latency, services and price.",
  "check": [
   [
    "A law requires customer data to stay in Canada, but a US Region is cheaper. Which should you choose?",
    "A Region in Canada, because compliance and data residency override price."
   ],
   [
    "Users in Asia report slow response from an application hosted in Europe. Which Region factor is involved?",
    "Proximity to users (latency); a closer Region or CloudFront caching would help."
   ],
   [
    "A team's design depends on a service that launched recently. What should it check before choosing a Region?",
    "That the service and needed features are available in that Region, using the AWS Regional Services list."
   ],
   [
    "When is price the right deciding factor for Region selection?",
    "When several Regions already meet compliance, latency and service availability needs; then price can break the tie."
   ]
  ]
 },
 {
  "t": "Amazon EC2 instance families, AMIs, Elastic Load Balancing and Amazon EC2 Auto Scaling",
  "hook": "Registration opens at 8:00 a.m. at Cedar Valley College, and by 8:03 the help desk is flooded. Students see spinning wheels and error pages. Dev, the systems administrator, logs in and finds the two web servers pinned at full CPU while a third, newly added by hand last night, sits idle because nothing sends traffic to it. Next week the summer term opens, and the dean wants to know: can the site grow by itself when thousands of students arrive at once, spread the load evenly, and shrink again afterward so the college is not paying for idle servers all year?",
  "simple": "Amazon EC2 lets you rent computers in the cloud, called instances, by the hour or second. They come in different shapes for different jobs: some balanced, some with extra processing power, some with extra memory, some with special chips for graphics or artificial intelligence, and some with lots of fast local disk. An AMI is a saved starting picture of a computer so every new one starts the same. A load balancer is like a host at a busy restaurant who seats each guest at a table that is free. Auto Scaling is like a manager who brings in more staff when the restaurant fills up and sends them home when it is quiet.",
  "body": [
   "Amazon Elastic Compute Cloud (Amazon EC2) provides resizable virtual servers called instances. You choose the operating system, size and configuration, and you get full control, including administrator or root access. Under the shared responsibility model that control means you are responsible for patching and securing the guest operating system, configuring security groups and managing the software you install. EC2 is infrastructure as a service (IaaS): AWS runs the physical hardware, the facilities and the virtualization layer, and you run everything above it. That trade of control for responsibility is the theme of this lesson.",
   "Instance types are grouped into families optimized for different workloads, so the first decision is what the workload needs most. General purpose instances balance compute, memory and networking and suit web servers, small databases and code repositories. Compute optimized instances have high-performance processors for batch processing, game servers, media transcoding, high-performance computing (HPC) and scientific modeling. Memory optimized instances provide a large amount of memory relative to processing power and suit in-memory databases and real-time big data analytics. Accelerated computing instances use hardware accelerators such as graphics processing units (GPUs) for machine learning, graphics rendering and other parallel work. Storage optimized instances provide high, low-latency local storage throughput for data warehousing and large transactional databases.",
   "Instance type names follow a pattern. A name such as `m7g.large` encodes the family letter (`m` for a general purpose family), the generation (`7`), optional attributes (`g` for an AWS Graviton processor) and the size (`large`). Within a family, moving from `large` to `xlarge` to `2xlarge` roughly doubles the processing power and memory each time. You do not need to memorize every letter for the exam, but you should recognize that the family reflects the workload and the size reflects capacity.",
   "An Amazon Machine Image (AMI) is the template used to launch an instance. It contains the operating system, preinstalled software and configuration. You can use AMIs provided by AWS, subscribe to AMIs in AWS Marketplace, or create your own from a configured instance, often called a golden AMI, so every new server starts identical. That consistency is a building block for automation and Auto Scaling, because a new instance needs no manual setup before it can serve traffic. AMIs are Regional, but you can copy them to other Regions.",
   "Elastic Load Balancing (ELB) automatically distributes incoming traffic across targets such as EC2 instances in multiple Availability Zones (AZs) and sends traffic only to targets that pass health checks. The Application Load Balancer (ALB) works at layer 7 for Hypertext Transfer Protocol (HTTP) and HTTP Secure (HTTPS) traffic and can route by uniform resource locator (URL) path or host name, for example sending `/api/*` to one target group and `/images/*` to another. The Network Load Balancer (NLB) works at layer 4 for Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) traffic, handling very high throughput with low latency and supporting static Internet Protocol (IP) addresses. The Gateway Load Balancer (GWLB) deploys and scales third-party virtual appliances such as firewalls.",
   "Amazon EC2 Auto Scaling automatically adds or removes instances in an Auto Scaling group to match demand. You set a minimum, maximum and desired capacity, point the group at a launch template that names the AMI and instance type, and add scaling policies such as target tracking to keep average central processing unit (CPU) use near 50 percent, or scheduled scaling for known busy periods. Auto Scaling also replaces instances that fail health checks. Together, ELB and Auto Scaling give you an elastic, highly available web tier: capacity grows during peaks, shrinks when idle so you stop paying for it, and heals itself when an instance fails. The load balancer automatically starts sending traffic to new instances as they register.",
   "Consider a worked example. An online ticket seller has quiet weeks and sudden spikes when concerts go on sale. It builds a golden AMI with its application, creates a launch template using general purpose instances, and defines an Auto Scaling group across three AZs with a minimum of two instances and a maximum of twenty. An ALB routes `/checkout` and `/search` to separate target groups. When sales open, CPU rises, target tracking adds instances, and the ALB spreads traffic across them. Overnight the group shrinks back to two, and an instance that crashes is replaced automatically.",
   "Common mistakes: forgetting that the customer patches the guest operating system on EC2; picking a family by name rather than workload, since in-memory databases need memory optimized, not compute optimized; assuming a load balancer alone adds capacity, when Auto Scaling adds instances and ELB spreads traffic; choosing the NLB when path-based HTTP routing is needed; and running everything in one AZ, which defeats the purpose of load balancing. Another trap is thinking Auto Scaling only scales out; it also scales in to save money.",
   "On the exam, match clue words. 'In-memory database' or 'large datasets in memory' means memory optimized. 'Batch processing', 'high-performance computing' or 'gaming servers' means compute optimized. 'Machine learning training' or 'graphics' means accelerated computing. 'High sequential read and write to local storage' means storage optimized. 'Template to launch identical instances' is an AMI. 'Distribute traffic across healthy instances' is ELB, with ALB for 'HTTP path or host routing' and NLB for 'extreme performance' or 'static IP'. 'Automatically add or remove instances with demand' is EC2 Auto Scaling."
  ],
  "analogy": "Picture a busy restaurant. Instance families are kinds of staff: all-rounders, fast line cooks, staff with huge prep counters, specialist pastry chefs and staff with big storerooms. The AMI is the training manual, so every new hire works the same way from day one. The load balancer is the host who seats each party at an available table and skips any table that is out of service. Auto Scaling is the manager who calls in extra staff when the line grows and sends them home when it shrinks. Unlike real staff, instances bill only while running.",
  "mnemonic": "Good Cooks Make Amazing Soup: General purpose, Compute optimized, Memory optimized, Accelerated computing, Storage optimized, the five EC2 instance family categories.",
  "terms": [
   [
    "Amazon EC2",
    "The AWS service that provides resizable virtual servers called instances."
   ],
   [
    "Instance family",
    "A group of instance types optimized for a workload type, such as compute, memory or storage."
   ],
   [
    "AMI",
    "An Amazon Machine Image: the template of OS, software and configuration used to launch an instance."
   ],
   [
    "Elastic Load Balancing (ELB)",
    "A service that distributes traffic across healthy targets in multiple Availability Zones."
   ],
   [
    "Application Load Balancer (ALB)",
    "A layer 7 load balancer for HTTP and HTTPS that can route by path or host name."
   ],
   [
    "Network Load Balancer (NLB)",
    "A layer 4 load balancer for TCP and UDP with very high performance and static IP support."
   ],
   [
    "EC2 Auto Scaling",
    "A service that adds or removes EC2 instances automatically to match demand and replaces unhealthy ones."
   ],
   [
    "Launch template",
    "A saved configuration naming the AMI, instance type and settings that Auto Scaling uses to launch instances."
   ]
  ],
  "example": "A university's enrollment site runs on two instances most of the year but collapses on the first day of registration. The IT team creates an AMI of the configured server, an Auto Scaling group across two AZs with scheduled scaling to twelve instances on registration morning plus target tracking on CPU, and an Application Load Balancer in front. Registration day now runs smoothly and the group shrinks automatically afterward.",
  "mistakes": [
   [
    "A load balancer adds servers when traffic increases.",
    "ELB only distributes traffic among existing healthy targets. EC2 Auto Scaling changes the number of instances."
   ],
   [
    "An in-memory database should run on compute optimized instances because it needs to be fast.",
    "In-memory databases need a high ratio of memory to compute, so memory optimized instances are the fit."
   ],
   [
    "The Network Load Balancer is the right choice for routing /api and /images to different servers.",
    "Path-based routing is a layer 7 feature of the Application Load Balancer. The NLB works at layer 4."
   ],
   [
    "AWS patches the operating system on my EC2 instances.",
    "With EC2 as IaaS, the customer is responsible for patching and securing the guest operating system and installed software."
   ]
  ],
  "tryit": [
   [
    "Ravi's analytics team runs a nightly job that crunches millions of records using heavy processor calculations but modest memory. A colleague suggests memory optimized instances because 'bigger is better'. Which instance family should Ravi choose and why?",
    "Compute optimized. The workload is bound by processor speed rather than memory, and compute optimized instances provide high-performance processors for batch processing at a better price for that need."
   ],
   [
    "A news site gets steady traffic all day but triples every weekday at 7 a.m. when the morning newsletter goes out, and occasionally spikes unpredictably on big stories. Instances sometimes crash and must be replaced. How should the team configure EC2 Auto Scaling?",
    "Use an Auto Scaling group behind a load balancer with scheduled scaling for the known 7 a.m. peak, target tracking (for example on average CPU) for unpredictable spikes, and health checks so failed instances are replaced automatically."
   ]
  ],
  "tip": "Match the workload to the family: in-memory databases are memory optimized, batch or HPC is compute optimized, ML training or graphics is accelerated computing. HTTP path-based routing means an Application Load Balancer.",
  "check": [
   [
    "Which EC2 instance family suits a large in-memory database?",
    "Memory optimized, because it provides a high ratio of memory to compute."
   ],
   [
    "What is the difference between Elastic Load Balancing and EC2 Auto Scaling?",
    "ELB distributes traffic across healthy targets; Auto Scaling changes the number of instances to match demand."
   ],
   [
    "Which load balancer can send requests for /api to one set of servers and /images to another?",
    "The Application Load Balancer, which routes at layer 7 by path or host."
   ],
   [
    "What does an AMI provide?",
    "A template with the OS, software and configuration used to launch identical instances."
   ]
  ]
 },
 {
  "t": "Containers and serverless compute: Amazon ECS, Amazon EKS, AWS Fargate, AWS Lambda and AWS Elastic Beanstalk",
  "hook": "At Pinecrest Insurance, three teams walk into your office on the same morning. The platform team runs Kubernetes in the old data center and refuses to learn a new tool. The new claims team wants to ship containers but says, firmly, that it will not patch a single server. And the two-person marketing team has a small Node.js website and no idea what a load balancer is. Meanwhile, a manager asks whether the overnight thumbnail job could stop costing money when nobody is uploading anything. Five services sound similar on paper. Which one does each team actually need?",
  "simple": "There are easier ways to run code on AWS than renting and looking after whole servers. A container is like a lunchbox that packs an app with everything it needs, so it works the same anywhere. ECS and EKS are like kitchen managers who decide where each lunchbox goes and replace any that spoil; EKS uses a popular open-source tool called Kubernetes. Fargate is a kitchen you never have to clean or maintain: you just say how much space each lunchbox needs. Lambda runs a small piece of code only when something happens, like a doorbell that rings only when someone presses it, and you pay only for the rings. Elastic Beanstalk takes your finished website and sets up everything around it for you.",
  "body": [
   "Amazon Elastic Compute Cloud (Amazon EC2) is not the only way to run code on AWS. Containers and serverless services remove progressively more server management from your plate, which shifts more of the shared responsibility model to AWS. The exam checks that you can choose among Amazon Elastic Container Service (Amazon ECS), Amazon Elastic Kubernetes Service (Amazon EKS), AWS Fargate, AWS Lambda and AWS Elastic Beanstalk from a short description of what a team wants. The question to ask each time is how much of the underlying infrastructure the team wants to see and manage.",
   "A container packages an application with its libraries and dependencies so it runs the same way on a laptop, a test server or production, which ends the classic complaint that something works on one machine but not another. Containers start in seconds and share the host's operating system kernel, so they are lighter than virtual machines, which each carry a full operating system. Running many containers across many hosts needs an orchestrator that places containers, restarts failed ones, scales them and connects them to load balancers. Container images are usually stored in Amazon Elastic Container Registry (Amazon ECR), a managed image registry that stores images but does not run them.",
   "Amazon ECS is AWS's own fully managed container orchestration service. It is simple to adopt and deeply integrated with AWS features such as AWS Identity and Access Management (IAM) roles, load balancers and Amazon CloudWatch monitoring. You describe your containers, their image, CPU (central processing unit) and memory in a task definition, and run them either as one-off tasks or as long-running services that ECS keeps at the desired count. Amazon EKS runs Kubernetes, the popular open-source orchestrator, with AWS managing the Kubernetes control plane for you. Choose EKS when a team already uses Kubernetes, wants its ecosystem of tools, or needs portability to other environments; choose ECS when you want the simplest AWS-native option.",
   "Both ECS and EKS need compute capacity to run containers. You can supply EC2 instances that you manage and patch, or use AWS Fargate, a serverless compute engine for containers. With Fargate you do not provision, scale or patch servers; you declare the CPU and memory each task or pod needs and pay for those resources while it runs. The key distinction is easy to remember once you see it: ECS and EKS are orchestrators that decide what runs where, while Fargate is a place for their containers to run without managing servers. Fargate is never an alternative to ECS or EKS; it is used with them.",
   "AWS Lambda runs code without provisioning servers at all, in response to events such as an object uploaded to Amazon Simple Storage Service (Amazon S3), a message arriving in an Amazon Simple Queue Service (Amazon SQS) queue, a web request through Amazon API Gateway, or a schedule from Amazon EventBridge. You upload a function, choose the memory size, and Lambda runs as many copies as events require, scaling automatically. You pay per request and for compute time measured in small increments, with nothing charged when the function is idle. Lambda suits short, event-driven tasks; a single invocation can run for at most 15 minutes, so long-running processes belong on containers or EC2.",
   "AWS Elastic Beanstalk is a platform as a service (PaaS) for web applications. You upload code such as a Java, .NET, Python, Node.js or Docker application, and Beanstalk provisions and manages EC2 instances, a load balancer, Auto Scaling and health monitoring for you, while leaving those resources visible and adjustable if you want to tune them. It suits teams that want to focus on code rather than infrastructure but still run on familiar EC2 underneath. There is no extra charge for Beanstalk itself; you pay for the resources it creates.",
   "Consider a worked example. A media company has four needs. Its platform team already runs Kubernetes on premises and wants the same tools in AWS, so it uses EKS. A new microservice team wants containers without patching servers, so it runs ECS services on Fargate. When a user uploads a photo to S3, a Lambda function creates thumbnails in a second or two and costs nothing between uploads. A small marketing team with a Node.js web app and no infrastructure expertise deploys it with Elastic Beanstalk, which builds the load balancer and scaling for them.",
   "Common mistakes: thinking Fargate is an alternative to ECS or EKS, when it is a launch type or compute option they use; choosing Lambda for a job that runs for hours; assuming serverless means there are no servers, when AWS manages them for you; confusing Elastic Beanstalk with AWS CloudFormation, since Beanstalk deploys an application onto an environment it builds while CloudFormation provisions whatever resources your template defines; and assuming ECR runs containers when it only stores images. Also remember that with Lambda and Fargate you still own your code, its permissions and its data.",
   "On the exam, follow the clue words. 'Kubernetes' means EKS. 'Run Docker containers with a simple AWS-native orchestrator' means ECS. 'Run containers without managing servers or clusters of instances' means Fargate. 'Run code in response to events, no servers, pay only when it runs' means Lambda. 'Upload code and AWS handles capacity, load balancing, scaling and monitoring' means Elastic Beanstalk. 'Store container images' means ECR. If an option describes a long-running process of several hours, eliminate Lambda."
  ],
  "analogy": "Think of shipping freight. Containers are standard shipping boxes that fit on any ship or truck. ECS and EKS are port managers deciding which box goes where, with EKS following an international rulebook (Kubernetes) other ports also use. Fargate is hiring a shipping line so you never own a ship. Lambda is a courier who appears only when you ring and charges per delivery. Elastic Beanstalk is a full-service mover who handles trucks and crew once you hand over your boxes. The analogy breaks on timing: a Lambda courier cannot work a trip longer than 15 minutes.",
  "terms": [
   [
    "Container",
    "A package of an application and its dependencies that runs consistently across environments and shares the host OS kernel."
   ],
   [
    "Amazon ECS",
    "AWS's fully managed container orchestration service."
   ],
   [
    "Amazon EKS",
    "A managed service for running Kubernetes on AWS, with AWS operating the control plane."
   ],
   [
    "AWS Fargate",
    "A serverless compute engine that runs ECS or EKS containers without you managing servers."
   ],
   [
    "AWS Lambda",
    "A serverless service that runs code in response to events and bills per request and compute time."
   ],
   [
    "AWS Elastic Beanstalk",
    "A platform as a service that deploys and manages web applications, handling capacity, load balancing and scaling."
   ],
   [
    "Amazon ECR",
    "A managed registry for storing and sharing container images."
   ]
  ],
  "example": "An insurance company receives scanned claim forms throughout the day. Each upload to an S3 bucket triggers a Lambda function that validates the file and places a message in a queue. A claims-processing service, packaged as containers and run by ECS on Fargate, reads the queue and processes each claim. No one on the team patches servers, the Lambda function costs nothing overnight when no claims arrive, and Fargate tasks scale with the queue length.",
  "mistakes": [
   [
    "Fargate is a competitor to ECS and EKS, so you pick one of the three.",
    "Fargate is a serverless compute option that ECS and EKS use to run containers. You pick an orchestrator and then choose Fargate or EC2 capacity."
   ],
   [
    "Lambda is fine for a three-hour batch job because it is serverless.",
    "A Lambda invocation can run for at most 15 minutes. Long jobs belong on containers (for example ECS on Fargate) or EC2."
   ],
   [
    "Elastic Beanstalk is the same as CloudFormation.",
    "Beanstalk deploys and manages an application environment for your code; CloudFormation provisions any resources described in a template."
   ],
   [
    "Amazon ECR runs my containers.",
    "ECR only stores container images. ECS or EKS run them, on Fargate or EC2."
   ]
  ],
  "tryit": [
   [
    "Halden Labs wants to resize every image that customers upload to an S3 bucket. Uploads come in bursts during the day and stop completely at night. Each resize takes about two seconds, and the team wants to pay nothing when there are no uploads. Which service fits best?",
    "AWS Lambda triggered by S3 upload events. It runs only when an image arrives, scales with bursts, finishes well within the 15-minute limit and costs nothing while idle."
   ],
   [
    "A company's developers already package their microservices as Docker containers and manage them with Kubernetes manifests on premises. They want to move to AWS but do not want to manage any EC2 instances. What combination should they use?",
    "Amazon EKS with AWS Fargate. EKS keeps their Kubernetes tools and manifests with an AWS-managed control plane, and Fargate runs the pods without them provisioning or patching servers."
   ]
  ],
  "tip": "'Kubernetes' means EKS; 'containers without managing servers' means Fargate; 'event-driven code, pay only when it runs' means Lambda; 'upload code and AWS handles the rest' means Elastic Beanstalk.",
  "check": [
   [
    "A team uses Kubernetes on premises and wants a managed equivalent on AWS. Which service fits?",
    "Amazon EKS, which runs Kubernetes with an AWS-managed control plane."
   ],
   [
    "What is the relationship between ECS and Fargate?",
    "ECS orchestrates containers; Fargate is a serverless compute option where those containers run without you managing EC2 instances."
   ],
   [
    "Why is Lambda a poor fit for a video-encoding job that runs for three hours?",
    "A Lambda invocation can run for at most 15 minutes, so long jobs belong on containers or EC2."
   ],
   [
    "A developer wants to deploy a Python web app without configuring load balancers or scaling. Which service?",
    "AWS Elastic Beanstalk, which provisions and manages that infrastructure automatically."
   ]
  ]
 },
 {
  "t": "Databases: Amazon RDS and Aurora, Amazon DynamoDB, Amazon ElastiCache, Amazon Redshift and other purpose-built databases",
  "hook": "Friday evening at Maplestone Outfitters, the big seasonal sale has just started, and Ana in operations watches the dashboard turn red. One database is doing everything: processing orders, storing every shopper's cart, serving product pages and running the finance team's giant quarterly report, which someone kicked off at exactly the wrong moment. Checkout slows to a crawl. On Monday the chief technology officer asks a pointed question: why are we forcing every kind of data through one engine, and what would it look like to give each job the database built for it?",
  "simple": "A database is an organized place to store information so apps can find it quickly. Different jobs need different kinds. Some data fits neatly in tables with rows and columns, like a spreadsheet of orders; that is a relational database such as Amazon RDS or Aurora. Some data is simpler and huge in volume, like millions of shopping carts, and fits a fast key-and-value store such as DynamoDB. A cache like ElastiCache keeps popular answers in quick memory, like keeping your most used spices on the counter instead of in the basement. A data warehouse like Redshift is for big reports that look back over years of data. AWS runs these for you so you do not have to install or patch them.",
  "body": [
   "AWS encourages you to choose a purpose-built database for each job rather than forcing every kind of data into one engine. You can run any database yourself on Amazon Elastic Compute Cloud (Amazon EC2), but then you install, patch, back up and replicate it, and you can log in to the operating system because it is yours to manage. Managed database services take on that undifferentiated heavy lifting, so under the shared responsibility model AWS handles the database software, patching and underlying infrastructure, while you remain responsible for your data, schema design, user access control and settings such as encryption.",
   "Amazon Relational Database Service (Amazon RDS) runs relational databases, which store data in tables with defined schemas, use Structured Query Language (SQL) and support joins and transactions, so an order and its payment either both save or neither does. RDS supports engines such as MySQL, PostgreSQL, MariaDB, Oracle and Microsoft SQL Server, and handles provisioning, patching and automated backups with point-in-time restore. You cannot log in to the underlying operating system of an RDS instance; that layer belongs to AWS.",
   "Two RDS features are tested often and easily confused. A Multi-AZ deployment keeps a synchronous standby copy in another Availability Zone (AZ) and fails over to it automatically if the primary fails, which is for availability; the standby does not serve your read traffic in the classic setup. Read replicas copy data asynchronously so they can serve read traffic, such as reports or product browsing, which is for performance. Amazon Aurora is AWS's own relational engine, compatible with MySQL and PostgreSQL, designed for higher performance and availability, with storage automatically replicated across multiple AZs. Aurora Serverless adjusts capacity automatically for variable workloads.",
   "Amazon DynamoDB is a fully managed, serverless NoSQL (non-relational) key-value and document database. It delivers consistent single-digit-millisecond performance at virtually any scale with no servers to manage, and suits applications with simple, high-volume access patterns such as shopping carts, gaming leaderboards, user profiles and session data. Rather than joining tables, you look items up by a key, such as a customer ID. You choose on-demand capacity, which scales automatically and bills per request, or provisioned capacity with optional auto scaling. DynamoDB Accelerator (DAX) adds an in-memory cache, and global tables replicate data across Regions.",
   "Amazon ElastiCache provides managed in-memory caches compatible with Valkey, Redis OSS and Memcached. Putting a cache in front of a database keeps frequently read data in memory, cutting response times to sub-millisecond and reducing load on the database, but a cache is not where the authoritative copy of your data lives. Amazon Redshift is a data warehouse for analytics: it runs complex SQL queries over very large amounts of structured data for reporting and business intelligence, using columnar storage and parallel processing. It serves online analytical processing (OLAP), not an application's day-to-day online transaction processing (OLTP).",
   "Other purpose-built databases fill specific niches. Amazon Neptune is a graph database for highly connected data such as social networks, recommendation engines and fraud detection, where the relationships matter as much as the records. Amazon DocumentDB (with MongoDB compatibility) stores documents in a JavaScript Object Notation (JSON)-like format. Amazon Keyspaces is compatible with Apache Cassandra. Amazon Timestream handles time series data such as Internet of Things (IoT) sensor readings. Amazon MemoryDB is a durable in-memory database for when you need in-memory speed as the primary store. To move existing databases into these services, AWS Database Migration Service (AWS DMS) migrates data with minimal downtime, and the AWS Schema Conversion Tool helps when changing engines, for example from Oracle to Aurora PostgreSQL.",
   "Consider a worked example. An online store keeps orders, payments and inventory in Aurora PostgreSQL because it needs transactions across related tables, and runs it across multiple AZs. Its shopping carts and session data go into DynamoDB, which scales effortlessly during sales. Product pages are cached in ElastiCache so the database is not hit for every view. Nightly, order data is loaded into Redshift, where analysts run large reports without slowing the live store, and a Neptune graph powers 'customers who bought this also bought' recommendations.",
   "Common mistakes: confusing Multi-AZ, a standby for failover, with read replicas, extra copies for read scaling; picking Redshift for an application's transactions or RDS for petabyte-scale analytics; describing DynamoDB as relational; thinking ElastiCache is a primary database that keeps data durably; and forgetting that on RDS you cannot log in to the underlying operating system, whereas running a database on EC2 gives full control but full responsibility. Another trap is assuming managed means AWS configures your user permissions and encryption choices; those remain yours.",
   "On the exam, map keywords to services. 'Relational', 'SQL', 'joins' or 'transactions' means RDS or Aurora, with Aurora favored for 'MySQL or PostgreSQL compatible with higher performance'. 'NoSQL', 'key-value', 'serverless database' or 'millisecond latency at any scale' means DynamoDB. 'Caching' or 'in-memory to reduce database load' means ElastiCache. 'Data warehouse', 'business intelligence' or 'analytics over petabytes' means Redshift. 'Graph' or 'relationships between entities' means Neptune, 'MongoDB' means DocumentDB, and 'time series' means Timestream. 'High availability for RDS' means Multi-AZ."
  ],
  "analogy": "Think of a well-run kitchen. The relational database is the recipe binder, organized and cross-referenced, where changes are recorded carefully. DynamoDB is a wall of labeled cubbies: give the label, get the item instantly, at any volume. ElastiCache is the spice rack on the counter, quick to reach but not where the main stock lives. Redshift is the accountant's office reviewing years of receipts. Multi-AZ is a backup kitchen ready to take over, while read replicas are extra windows serving the same menu. The analogy stops at scale: no kitchen grows like DynamoDB.",
  "terms": [
   [
    "Amazon RDS",
    "A managed service for relational database engines such as MySQL, PostgreSQL, MariaDB, Oracle and SQL Server."
   ],
   [
    "Amazon Aurora",
    "AWS's MySQL- and PostgreSQL-compatible relational engine with storage replicated across multiple AZs."
   ],
   [
    "Multi-AZ deployment",
    "An RDS configuration with a synchronous standby in another AZ for automatic failover."
   ],
   [
    "Read replica",
    "An asynchronously updated copy of a database used to offload read traffic."
   ],
   [
    "Amazon DynamoDB",
    "A serverless NoSQL key-value and document database with consistent single-digit-millisecond performance."
   ],
   [
    "Amazon ElastiCache",
    "A managed in-memory cache compatible with Valkey, Redis OSS and Memcached."
   ],
   [
    "Amazon Redshift",
    "A managed data warehouse for SQL analytics over large volumes of structured data."
   ],
   [
    "Amazon Neptune",
    "A managed graph database for highly connected data."
   ],
   [
    "AWS DMS",
    "Database Migration Service, which migrates databases to AWS with minimal downtime."
   ]
  ],
  "example": "A mobile game stores player profiles and leaderboards in DynamoDB, which handles millions of reads per minute at launch without capacity planning. Billing and purchase history live in RDS for MySQL with Multi-AZ, because they need transactions and must survive an AZ failure. The studio's analysts load gameplay events into Redshift weekly to study which levels players abandon, and ElastiCache holds the daily top-100 list so it loads instantly.",
  "mistakes": [
   [
    "A Multi-AZ deployment improves read performance.",
    "Multi-AZ provides a standby for automatic failover, which is availability. Read replicas are the feature for scaling reads."
   ],
   [
    "Redshift is a good database for an online store's checkout transactions.",
    "Redshift is a data warehouse for analytics (OLAP). Transactions (OLTP) belong in RDS, Aurora or, for simple key-value patterns, DynamoDB."
   ],
   [
    "DynamoDB is a relational database because it stores tables.",
    "DynamoDB is NoSQL: it stores key-value and document items looked up by key, without SQL joins across tables."
   ],
   [
    "ElastiCache can replace the main database because it is so fast.",
    "ElastiCache is an in-memory cache that reduces load on a database; the durable primary copy stays in the database."
   ]
  ],
  "tryit": [
   [
    "Wren, a developer at a ride-sharing startup, needs to store the live location and status of each driver, looked up by driver ID thousands of times per second. Traffic swings wildly between rush hour and the middle of the night, and the team has no database administrators. Which database should Wren choose?",
    "Amazon DynamoDB with on-demand capacity. The access pattern is a simple key lookup at very high volume, DynamoDB delivers single-digit-millisecond performance at any scale, and it is serverless with no servers or patching to manage."
   ],
   [
    "An accounting firm runs its client billing system on RDS for PostgreSQL. Month-end reports slow down the live system, and the firm also worries about an AZ failure taking billing offline. Which two RDS features address these two problems?",
    "Read replicas to offload the reporting queries, which addresses performance, and a Multi-AZ deployment for automatic failover to a standby in another AZ, which addresses availability. For very large historical analysis, loading data into Redshift would be another option."
   ]
  ],
  "tip": "Multi-AZ is for availability (automatic failover); read replicas are for read performance. Redshift is analytics (OLAP), not transactions; DynamoDB is NoSQL, not relational.",
  "check": [
   [
    "A company needs a relational database but does not want to patch or back it up manually. Which service?",
    "Amazon RDS (or Aurora), which manages patching, backups and failover."
   ],
   [
    "Which service fits a serverless key-value store with single-digit-millisecond performance at any scale?",
    "Amazon DynamoDB."
   ],
   [
    "What does an RDS Multi-AZ deployment provide?",
    "A standby in another Availability Zone with automatic failover, improving availability rather than read performance."
   ],
   [
    "Analysts need to run complex SQL reports over years of sales data. Which service fits best?",
    "Amazon Redshift, the data warehouse built for large-scale analytics."
   ],
   [
    "Which database fits a social network's 'friends of friends' queries?",
    "Amazon Neptune, a graph database for highly connected data."
   ]
  ]
 },
 {
  "t": "Networking: Amazon VPC, subnets, internet and NAT gateways, Route 53, CloudFront, Site-to-Site VPN and Direct Connect",
  "hook": "It is patch Tuesday at Oakridge Library Services, and Sam, the junior cloud engineer, has a problem. The database servers sit safely in a private part of the network where nothing on the internet can reach them, exactly as the security team wanted. But now they cannot reach the internet either, and the monthly security patches will not download. A colleague suggests just opening them up to the internet for an hour. The security lead's reply arrives within seconds: absolutely not. How do you let private servers reach out for updates without letting anyone reach in?",
  "simple": "A VPC is your own private section of the AWS network, like a fenced-off office floor in a big shared building. Inside, you divide it into rooms called subnets. A public room has a door to the street, called an internet gateway. A private room has no street door at all. If people in a private room need to send letters out but never receive visitors, they use a mail slot that only works outward, which is what a NAT gateway does. Route 53 is the building directory that turns names into addresses. CloudFront keeps copies of popular content close to visitors. A VPN is a locked tunnel over public roads, and Direct Connect is your own private road.",
  "body": [
   "Networking in AWS starts with Amazon Virtual Private Cloud (Amazon VPC), which lets you launch resources into a logically isolated virtual network that you define. You choose its Internet Protocol (IP) address range in Classless Inter-Domain Routing (CIDR) notation, such as `10.0.0.0/16`, create subnets, configure route tables, and control traffic with security groups and network access control lists (network ACLs). Each Region gives you a default VPC to start with, but production designs usually use custom VPCs so the team controls every address range and route.",
   "A subnet is a range of IP addresses within a VPC, and each subnet lives in exactly one Availability Zone (AZ). To be highly available you therefore create matching subnets in at least two AZs. What makes a subnet public or private is its route table, not its name. A public subnet has a route such as `0.0.0.0/0 -> igw-...` to an internet gateway, so resources in it with public IP addresses can reach and be reached from the internet; load balancers often live here. A private subnet has no such route; application servers and databases usually live here, out of direct reach.",
   "Two gateways control internet access. An internet gateway is the horizontally scaled, highly available VPC component that allows two-way communication between the VPC and the internet. A NAT (network address translation) gateway, placed in a public subnet, lets instances in private subnets start outbound connections, for example to download patches or call an external service, while preventing the internet from starting connections to them. The private subnet's route table sends `0.0.0.0/0` to the NAT gateway, which forwards the traffic out through the internet gateway and returns only the replies.",
   "Two kinds of virtual firewall protect resources, and the exam likes to compare them. Security groups act at the instance (or network interface) level, are stateful, so return traffic for an allowed request is automatically allowed, and support only allow rules. Network ACLs act at the subnet level, are stateless, so return traffic must be allowed explicitly, and support both allow and deny rules evaluated in number order. Many designs use security groups as the main control and network ACLs as an extra layer, for example to block a known bad address range.",
   "Amazon Route 53 is AWS's highly available Domain Name System (DNS) service. It translates names such as `www.example.com` into IP addresses, lets you register domain names, performs health checks, and offers routing policies including simple, weighted (split traffic by percentage), latency-based (send users to the fastest Region), failover (switch to a standby when health checks fail) and geolocation (route by the user's location). Amazon CloudFront is a content delivery network (CDN) that caches static and dynamic content at edge locations worldwide, reducing latency for viewers and load on your origin, and integrating with AWS WAF (web application firewall) and AWS Shield for protection.",
   "Two services connect on-premises networks to AWS. AWS Site-to-Site VPN (virtual private network) creates encrypted Internet Protocol Security (IPsec) tunnels between your on-premises network and your VPC over the public internet. It is quick to set up and relatively inexpensive, but performance varies with internet conditions. AWS Direct Connect provides a dedicated private connection from your premises or a colocation facility to AWS that does not traverse the public internet, giving more consistent bandwidth and latency and potentially lower data transfer costs for large volumes, but it takes longer to provision. Many organizations use a VPN as a backup for Direct Connect. For individual remote users, AWS Client VPN provides VPN access from laptops.",
   "Consider a worked example. A company builds a VPC with public and private subnets in two AZs. An Application Load Balancer sits in the public subnets, and web servers and an Amazon Relational Database Service (Amazon RDS) database sit in the private subnets. The web servers download updates through a NAT gateway but cannot be reached directly from the internet. Route 53 hosts the company domain with a failover record pointing to a backup site, and CloudFront caches images near customers. The head office connects over Direct Connect for payroll data transfers, with a Site-to-Site VPN as backup.",
   "Common mistakes: putting a NAT gateway in a private subnet, when it belongs in a public subnet; thinking a NAT gateway allows inbound connections from the internet; assuming a subnet can span AZs; believing Direct Connect is encrypted by default just because it is private, when you add encryption yourself, for example with a VPN over it or MACsec (Media Access Control security) where supported; and confusing Route 53, which answers DNS queries and routes users, with CloudFront, which caches and serves content. Another trap is treating security groups and network ACLs as the same thing.",
   "Exam shortcuts: 'logically isolated network' is VPC. 'Private instances need outbound internet access only' is a NAT gateway, and 'allow internet traffic to a public subnet' is an internet gateway. 'DNS', 'domain registration' or 'route users to the healthiest or closest endpoint' is Route 53. 'Cache content globally' or 'reduce latency for static content' is CloudFront. 'Encrypted connection over the internet, quick to set up' is Site-to-Site VPN. 'Dedicated private connection with consistent performance' is Direct Connect. 'Subnet-level stateless firewall' is a network ACL, and 'instance-level stateful firewall' is a security group."
  ],
  "analogy": "A VPC is a gated office campus. Subnets are buildings, each on one plot of land (an AZ). The internet gateway is the main gate that lets visitors in and staff out. A NAT gateway is a courier desk at the gate: staff in back buildings can send requests out and get replies, but no stranger can walk in through it. Security groups are door guards who remember who left and let them back in; network ACLs are checkpoint staff who check every person both ways. The analogy stops at scale: AWS gateways grow automatically.",
  "terms": [
   [
    "Amazon VPC",
    "A logically isolated virtual network in AWS whose IP ranges, subnets and routing you control."
   ],
   [
    "Subnet",
    "A range of IP addresses within a VPC, located in a single Availability Zone."
   ],
   [
    "Internet gateway",
    "The VPC component that allows two-way communication between resources in public subnets and the internet."
   ],
   [
    "NAT gateway",
    "A managed service in a public subnet that lets private-subnet instances make outbound-only internet connections."
   ],
   [
    "Security group vs network ACL",
    "Security groups are stateful, instance-level and allow-only; network ACLs are stateless, subnet-level and support allow and deny."
   ],
   [
    "Amazon Route 53",
    "AWS's DNS service, providing domain registration, health checks and routing policies."
   ],
   [
    "Amazon CloudFront",
    "AWS's content delivery network that caches content at edge locations close to viewers."
   ],
   [
    "AWS Site-to-Site VPN",
    "Encrypted IPsec tunnels between an on-premises network and a VPC over the internet."
   ],
   [
    "AWS Direct Connect",
    "A dedicated private network connection between on premises and AWS that bypasses the public internet."
   ]
  ],
  "example": "A retailer's database servers in a private subnet need monthly security patches from the internet but must never accept inbound connections. The network team adds a NAT gateway in a public subnet and a route `0.0.0.0/0` from the private route table to it. Patches download successfully, and a port scan from outside finds nothing reachable. Customers reach the store through Route 53 and CloudFront, and the warehouse connects over a Site-to-Site VPN.",
  "mistakes": [
   [
    "A NAT gateway goes in the private subnet next to the servers that use it.",
    "The NAT gateway lives in a public subnet with a route to the internet gateway; private subnets route outbound traffic to it."
   ],
   [
    "A NAT gateway lets people on the internet connect to private instances.",
    "It allows only outbound-initiated connections and their replies. Inbound connections from the internet are not allowed through it."
   ],
   [
    "Direct Connect is automatically encrypted because it is private.",
    "Direct Connect is a private dedicated link but is not encrypted by default; add encryption such as a VPN over it or MACsec where supported."
   ],
   [
    "Route 53 and CloudFront both speed up websites, so they are interchangeable.",
    "Route 53 resolves names and routes users with DNS policies; CloudFront caches and delivers content from edge locations."
   ]
  ],
  "tryit": [
   [
    "Bayview Logistics needs to connect its head office to AWS this week for a pilot project. Traffic will be light, the budget is small, and data must be encrypted in transit. Next year it expects heavy, steady transfers and wants predictable performance. What should it use now, and what later?",
    "Use AWS Site-to-Site VPN now, because it is quick to set up, inexpensive and encrypts traffic over the internet. Later, add AWS Direct Connect for consistent high bandwidth, keeping the VPN as a backup and adding encryption over Direct Connect if required."
   ],
   [
    "A company runs its website in two Regions and wants users automatically sent to the Region that responds fastest for them, with traffic moved away from a Region if its health checks fail. Which service and features fit?",
    "Amazon Route 53 with latency-based routing combined with health checks, so users go to the lowest-latency healthy Region and unhealthy endpoints are skipped."
   ]
  ],
  "tip": "An internet gateway allows two-way internet access for public subnets; a NAT gateway allows outbound-only access for private subnets. VPN runs encrypted over the internet; Direct Connect is a dedicated private line.",
  "check": [
   [
    "What makes a subnet public?",
    "Its route table has a route to an internet gateway."
   ],
   [
    "Instances in a private subnet must download updates but not accept inbound connections from the internet. What do you add?",
    "A NAT gateway in a public subnet with a route to it from the private subnet's route table."
   ],
   [
    "A company needs consistent, high-bandwidth connectivity to AWS that does not traverse the internet. Which service?",
    "AWS Direct Connect."
   ],
   [
    "Which service routes users to the Region with the lowest latency using DNS?",
    "Amazon Route 53 with a latency-based routing policy."
   ],
   [
    "Which firewall is stateful and applies at the instance level?",
    "A security group."
   ]
  ]
 },
 {
  "t": "Storage: Amazon S3 and its storage classes, Amazon EBS, instance store, Amazon EFS, Amazon FSx, AWS Storage Gateway and AWS Backup",
  "hook": "On Wednesday morning, Noor at Silverline Studios opens a ticket she was dreading. An editor stopped an EC2 instance overnight to save money, and when it started again, two days of rendered scenes had vanished. Meanwhile, the Windows design team wants a shared drive that works with their company logins, the finance office keeps paying for a tape library nobody likes, and the auditor wants proof that backups follow policy. Every one of these problems has a different AWS storage answer. Why did the render files disappear, and where should each kind of data really live?",
  "simple": "AWS has three basic kinds of storage. Object storage, like Amazon S3, keeps whole files with labels, like a huge warehouse where you hand over a box and get a claim ticket. Block storage, like Amazon EBS, is a virtual hard drive plugged into one server. File storage, like Amazon EFS or FSx, is a shared drive many computers open at once, like a shared network folder at the office. Some fast storage, called instance store, is temporary and is wiped when the server stops, like a whiteboard cleaned every night. S3 also has cheaper classes for files you rarely open, the way you might move old boxes to the attic.",
  "body": [
   "AWS offers three kinds of storage: object, block and file. Object storage keeps whole files with metadata and is reached over Hypertext Transfer Protocol Secure (HTTPS) by a key; block storage presents raw volumes that an operating system formats, like a hard drive; file storage presents a shared file system that many machines mount over a network protocol. Choosing correctly depends on how the data is accessed, how many machines need it at once and how long it must last, and the exam frequently asks you to make that match.",
   "Amazon Simple Storage Service (Amazon S3) is object storage. You store objects in buckets and access them by key, for example with `aws s3 cp backup.zip s3://my-bucket/2025/`. It scales virtually without limit and is designed for 99.999999999 percent (eleven nines) durability by storing data redundantly across multiple Availability Zones (AZs). It suits backups, data lakes, static website content and media. Versioning keeps previous versions of an object so an accidental overwrite or deletion can be undone, and lifecycle rules move or expire objects automatically as they age, for example moving logs to a cheaper class after 30 days and deleting them after a year.",
   "S3 storage classes trade price against access patterns and retrieval speed. S3 Standard is for frequently accessed data. S3 Intelligent-Tiering moves objects between access tiers automatically when patterns are unknown or change. S3 Standard-Infrequent Access (Standard-IA) is for data read rarely but needed quickly when it is. S3 One Zone-IA is cheaper but stores data in a single AZ, so it suits easily re-created data. The archive classes are S3 Glacier Instant Retrieval, for rarely accessed data that still needs millisecond access; S3 Glacier Flexible Retrieval, with retrieval in minutes to hours; and S3 Glacier Deep Archive, the lowest-cost class, with retrieval in hours. The colder the class, the lower the storage price and the higher the cost or wait to get data back.",
   "Amazon Elastic Block Store (Amazon EBS) provides block storage volumes that attach to Amazon Elastic Compute Cloud (Amazon EC2) instances like virtual hard drives, used for boot volumes and databases. A volume lives in one AZ and persists independently of the instance, so data survives a stop, and survives termination if the volume is set not to delete. You can take point-in-time snapshots, which AWS stores durably and which can be copied across Regions or used to create a new volume in another AZ. Instance store is temporary block storage physically attached to the host computer. It is very fast, but its data is lost when the instance stops or terminates, so use it only for caches, buffers and scratch data you can recreate.",
   "Amazon Elastic File System (Amazon EFS) is a managed, elastic file system using the Network File System (NFS) protocol that many Linux instances, containers and AWS Lambda functions can mount at once, across multiple AZs, growing and shrinking automatically as files are added and removed, so there is no capacity to provision. Amazon FSx provides fully managed third-party file systems: FSx for Windows File Server, which uses the Server Message Block (SMB) protocol with Active Directory integration; FSx for Lustre, built for high-performance computing; FSx for NetApp ONTAP; and FSx for OpenZFS.",
   "AWS Storage Gateway is a hybrid storage service that gives on-premises applications access to cloud storage. S3 File Gateway presents S3 as a file share, Volume Gateway presents block volumes backed up to AWS, and Tape Gateway replaces physical backup tapes with virtual tapes stored in AWS, so existing backup software keeps working. AWS Backup centrally manages and automates backups across services such as EBS, Amazon Relational Database Service (Amazon RDS), Amazon DynamoDB, EFS, FSx and S3, using backup plans that define schedules, retention periods and copies to other Regions or accounts. It helps prove to auditors that backups follow policy, because reports show what was protected and when.",
   "Consider a worked example. A design agency runs Linux render servers that all need the same project files, so it mounts EFS on every server. Each server's boot volume is EBS, and the render scratch space uses fast instance store because it can be recreated. Finished videos go to S3 Standard, and a lifecycle rule moves them to Glacier Flexible Retrieval after 90 days and to Glacier Deep Archive after a year. The office's old tape library is replaced by Tape Gateway, and AWS Backup takes daily EBS and EFS backups with a 35-day retention.",
   "Common mistakes: storing important data on instance store; expecting an EBS volume to attach to an instance in another AZ, when you restore a snapshot there instead; choosing EFS for Windows file shares, when FSx for Windows File Server is the fit; assuming One Zone-IA survives the loss of an AZ; and picking Glacier Deep Archive for data needed within minutes. Another trap is thinking S3 is a file system you mount like EFS; it is object storage reached through an API (application programming interface), even though tools can make it look like a folder.",
   "On the exam, match access patterns. 'Shared file storage for many Linux instances' is EFS; 'Windows file shares' or 'SMB with Active Directory' is FSx for Windows File Server; 'high-performance computing file system' is FSx for Lustre. 'Boot or database disk for one instance' is EBS. 'Temporary, fastest local storage' is instance store. 'Unlimited object storage', 'static website' or 'data lake' is S3. 'Lowest-cost long-term archive, retrieval in hours' is Glacier Deep Archive; 'unknown access patterns' is Intelligent-Tiering. 'On-premises access to cloud storage' or 'virtual tapes' is Storage Gateway, and 'centrally manage backups across services' is AWS Backup."
  ],
  "analogy": "Think of storage as places in a home. S3 is a vast self-storage warehouse: you hand over labeled boxes and get them back by label, and older boxes can move to cheaper back rooms (Glacier) that take longer to reach. EBS is the hard drive inside one computer. EFS and FSx are a shared family drive everyone opens at once. Instance store is a whiteboard, fast to use but wiped each night. The analogy stops at durability: S3 keeps redundant copies across multiple AZs, which no real warehouse does with your one box.",
  "terms": [
   [
    "Amazon S3",
    "Object storage that keeps data as objects in buckets, designed for eleven nines of durability."
   ],
   [
    "S3 storage classes",
    "Price tiers for S3 objects based on access frequency and retrieval needs, from Standard to Glacier Deep Archive."
   ],
   [
    "Lifecycle rule",
    "An S3 policy that transitions objects to cheaper classes or deletes them as they age."
   ],
   [
    "Amazon EBS",
    "Persistent block storage volumes that attach to EC2 instances within one Availability Zone."
   ],
   [
    "Instance store",
    "Temporary block storage on the host whose data is lost when the instance stops or terminates."
   ],
   [
    "Amazon EFS",
    "A managed, elastic NFS file system that many Linux clients can mount at once across AZs."
   ],
   [
    "Amazon FSx",
    "Fully managed third-party file systems such as Windows File Server and Lustre."
   ],
   [
    "AWS Storage Gateway",
    "A hybrid service giving on-premises applications access to AWS storage as files, volumes or virtual tapes."
   ],
   [
    "AWS Backup",
    "A service that centrally manages and automates backups across AWS services using backup plans."
   ]
  ],
  "example": "A hospital must keep medical images for many years but rarely reopens them after the first month. It stores new images in S3 Standard, and a lifecycle rule moves them to S3 Glacier Instant Retrieval after 30 days, because a doctor occasionally needs an old scan within milliseconds. Records older than the legal minimum for active use move to Glacier Deep Archive, and AWS Backup protects the EBS volumes of the imaging servers.",
  "mistakes": [
   [
    "Instance store is fine for a database because it is the fastest storage.",
    "Instance store data is lost when the instance stops or terminates. Use EBS for data that must persist."
   ],
   [
    "An EBS volume can be attached to an instance in any AZ.",
    "An EBS volume lives in one AZ. To use the data elsewhere, create a snapshot and restore it as a new volume in the other AZ."
   ],
   [
    "EFS is the right choice for Windows file shares with Active Directory.",
    "EFS uses NFS for Linux clients. Windows SMB shares with Active Directory call for FSx for Windows File Server."
   ],
   [
    "Glacier Deep Archive is the best class for any rarely used data.",
    "Deep Archive retrieval takes hours. Data that must be read within milliseconds belongs in Standard-IA or Glacier Instant Retrieval."
   ]
  ],
  "tryit": [
   [
    "Marisol runs a law firm's document system. Case files are opened often for the first few months, rarely for the next few years, and must be kept for a decade, but old files almost never need to come back quickly. How should she store them in S3 to control cost?",
    "Store new files in S3 Standard and add a lifecycle rule that transitions them to Standard-IA (or Glacier Instant Retrieval) after a few months and to Glacier Deep Archive after a few years, then expires them after the retention period. Versioning can protect against accidental deletion."
   ],
   [
    "A company has a fleet of Windows file servers on premises and a separate fleet of Linux web servers in AWS. The Windows users need a managed SMB file share integrated with Active Directory, and the Linux servers need one shared folder they can all read and write. Which two services fit?",
    "FSx for Windows File Server for the Windows users, because it provides SMB with Active Directory integration, and Amazon EFS for the Linux servers, because it is a shared NFS file system many instances mount at once."
   ]
  ],
  "tip": "Shared Linux file storage is EFS; Windows file shares are FSx for Windows File Server; a single instance's disk is EBS. Never keep data that must survive a stop on instance store.",
  "check": [
   [
    "Several Linux EC2 instances in different AZs need to read and write the same files. Which service fits?",
    "Amazon EFS, a shared NFS file system mountable across AZs."
   ],
   [
    "What happens to instance store data when the instance is stopped?",
    "It is lost, because instance store is temporary storage tied to the physical host."
   ],
   [
    "Which S3 storage class suits data with unpredictable access patterns?",
    "S3 Intelligent-Tiering, which moves objects between tiers automatically."
   ],
   [
    "A company wants to replace physical backup tapes with cloud storage while keeping its backup software. What should it use?",
    "AWS Storage Gateway in Tape Gateway mode, which presents virtual tapes stored in AWS."
   ]
  ]
 },
 {
  "t": "AI and machine learning services: Amazon SageMaker AI, Amazon Bedrock, Amazon Q, and task-specific AI services such as Rekognition, Textract, Comprehend, Transcribe, Polly and Lex",
  "hook": "The innovation committee at Fernhill Mutual has given you one week and a long wish list. Customer service wants call recordings turned into searchable text. Claims wants scanned forms read automatically. Marketing wants to know whether customers sound happy or angry in emails. The chief executive wants a chat assistant that can answer staff questions from the policy manuals. And the data science team, two people with a lot of ambition, wants to predict fraud from fifteen years of claims history. The committee asks a simple question: do we need to hire a team of machine learning experts for all of this, or not?",
  "simple": "Machine learning is teaching computers to spot patterns from examples, and artificial intelligence is the broader idea of computers doing tasks that seem to need human thinking. AWS offers this at three levels. At the top are ready-made tools that each do one job, like turning speech into text or reading a scanned form, and you just send them data. In the middle is Amazon Bedrock, which lets you use big pretrained models that can write and summarize, plus Amazon Q, a ready-made assistant. At the bottom is SageMaker AI, a workshop for experts building their own models. It is like food: buy a ready meal, use a meal kit, or cook from scratch.",
  "body": [
   "AWS offers artificial intelligence (AI) and machine learning (ML) at three levels. At the bottom is a platform for building, training and deploying your own models. In the middle are services that give you access to generative AI foundation models, which are large models pretrained on vast amounts of data that can write, summarize, answer questions and more. At the top are ready-made services that solve one task through a simple application programming interface (API) with no ML expertise. The Cloud Practitioner exam checks that you can match a use case to the right level and the right service, so the first question is always whether a ready-made service already does the job.",
   "Amazon SageMaker AI (formerly Amazon SageMaker) is the platform for data scientists and ML engineers to build, train and deploy their own models. It provides managed notebooks, data labeling, training jobs on managed infrastructure, automatic model tuning, deployment to endpoints that applications can call, and monitoring for model drift, which is when a model's accuracy falls as real-world data changes. Choose it when you need a custom model trained on your own data, such as predicting equipment failures from sensor history or scoring loan applications with your own features. SageMaker AI removes infrastructure work, but you still own the data, the model design and its evaluation.",
   "Amazon Bedrock is a fully managed service that gives you access to foundation models from Amazon and leading AI companies through a single API, so you can build generative AI applications such as chat assistants, summarization and content generation without managing infrastructure. You can customize models with your own data, use knowledge bases for retrieval augmented generation (RAG), which grounds answers in your own documents so they are more accurate and relevant, and apply guardrails to filter harmful content or block topics. Your prompts and data are not used to train the underlying public models. Bedrock is about using and adapting existing foundation models, not training one from scratch.",
   "Amazon Q is a generative AI-powered assistant you use rather than build. Amazon Q Business answers questions, summarizes content and completes tasks using a company's own data and systems, respecting the permissions users already have, so an employee only sees answers drawn from documents they are allowed to read. Amazon Q Developer helps developers write, explain, test and transform code and work with AWS resources, for example by suggesting code in an editor or answering questions about an AWS account.",
   "Task-specific AI services need no ML expertise; you send data and get results. Amazon Rekognition analyzes images and video to detect objects, scenes, text, unsafe content and faces. Amazon Textract extracts printed and handwritten text, forms and tables from scanned documents, keeping track of which value belongs to which field. Amazon Comprehend uses natural language processing (NLP) to find sentiment, key phrases, entities and language in text. Amazon Transcribe converts speech to text. Amazon Polly converts text to lifelike speech. Amazon Lex builds conversational interfaces (chatbots) using voice and text, the same technology behind many contact center bots. Amazon Translate translates between languages, Amazon Kendra provides intelligent enterprise search, and Amazon Personalize builds recommendations.",
   "Consider a worked example. An insurance company wants to automate claims. Customers phone in, and an Amazon Lex bot collects the policy number. Call recordings go through Transcribe to become text, and Comprehend flags angry or urgent calls by sentiment. Uploaded claim forms go through Textract to pull out fields, and photos of vehicle damage go through Rekognition. A Bedrock-based assistant drafts a summary letter for the adjuster, grounded in the company's policy documents. Finally, data scientists use SageMaker AI to train a custom fraud-scoring model on years of historical claims, because no ready-made service knows this company's fraud patterns.",
   "Common mistakes: reversing Transcribe and Polly; using Comprehend to read text from an image, when Textract or Rekognition extracts it and Comprehend analyzes text you already have; choosing SageMaker AI when a pretrained API already solves the task; assuming Bedrock is for training models from scratch, when it provides and customizes existing foundation models; and confusing Lex, which builds the conversation, with Polly, which only speaks. Remember too that responsibility for how AI output is used, including checking it for accuracy and bias, stays with you.",
   "A simple decision path helps. Is there a ready-made service for the exact task, such as reading forms, detecting objects or converting speech? Use the task-specific service. Do you want to generate text, summarize or build a chat assistant with foundation models? Use Bedrock, or Amazon Q if you want a ready assistant for employees or developers. Do you need a model trained on your own unique data for a prediction nobody sells? Use SageMaker AI.",
   "On the exam, 'speech to text' or 'transcripts of calls' is Transcribe, and 'text to speech' or 'lifelike voice' is Polly. 'Extract text and tables from scanned documents' is Textract, and 'sentiment' or 'key phrases' is Comprehend. 'Detect objects or faces in images' is Rekognition. 'Chatbot' is Lex. 'Build, train and deploy custom ML models' is SageMaker AI. 'Foundation models through an API' or 'generative AI application' is Bedrock. 'AI assistant for employees using company data' is Amazon Q Business, and 'coding assistant' is Amazon Q Developer."
  ],
  "analogy": "Choosing an AWS AI service is like deciding what to eat. Task-specific services are ready meals: open the box and each one does a single dish well. Bedrock is a meal kit with excellent pre-made components you can season with your own ingredients. Amazon Q is a personal chef who already knows your kitchen. SageMaker AI is a fully equipped professional kitchen for cooking your own recipe from scratch. The analogy stops at responsibility: whichever option you choose, you still have to taste the result, because checking AI output for accuracy and bias stays with you.",
  "terms": [
   [
    "Amazon SageMaker AI",
    "A platform for building, training and deploying custom machine learning models."
   ],
   [
    "Amazon Bedrock",
    "A managed service providing API access to foundation models for building generative AI applications."
   ],
   [
    "Foundation model",
    "A large model pretrained on broad data that can be adapted to many tasks such as writing and summarizing."
   ],
   [
    "Retrieval augmented generation (RAG)",
    "A technique that grounds a model's answers in your own documents retrieved at question time."
   ],
   [
    "Amazon Q",
    "A generative AI assistant for businesses (Q Business) and developers (Q Developer)."
   ],
   [
    "Amazon Rekognition",
    "A service that analyzes images and video to detect objects, text, scenes and faces."
   ],
   [
    "Amazon Textract",
    "A service that extracts printed and handwritten text, forms and tables from documents."
   ],
   [
    "Amazon Comprehend",
    "An NLP service that finds sentiment, entities, key phrases and language in text."
   ],
   [
    "Amazon Transcribe and Amazon Polly",
    "Transcribe converts speech to text; Polly converts text to lifelike speech."
   ],
   [
    "Amazon Lex",
    "A service for building conversational chatbots with voice and text."
   ]
  ],
  "example": "A city council wants its website accessible to visually impaired residents and its phone line to handle simple requests. It uses Amazon Polly to read news articles aloud, an Amazon Lex bot on the phone line to book bulk rubbish collections, Amazon Transcribe to create searchable transcripts of council meetings, and Amazon Translate to publish notices in several languages. No one on the team needed to train a machine learning model.",
  "mistakes": [
   [
    "Polly turns recorded calls into text.",
    "Polly is text to speech. Transcribe converts speech to text."
   ],
   [
    "Comprehend can read the text out of a scanned invoice.",
    "Textract extracts text, forms and tables from documents. Comprehend analyzes the meaning of text you already have, such as sentiment."
   ],
   [
    "Every AI use case needs SageMaker AI.",
    "If a task-specific service or a foundation model already solves the problem, use it. SageMaker AI is for custom models trained on your own data."
   ],
   [
    "Bedrock is where you train a brand-new foundation model from scratch.",
    "Bedrock provides access to existing foundation models that you can customize and ground with your data; it is not a from-scratch training platform."
   ]
  ],
  "tryit": [
   [
    "Jonah runs support for an online travel agency. He wants a phone bot that understands callers asking to change bookings, speaks responses aloud in a natural voice, and afterward produces text transcripts so supervisors can review calls. Which three services should he combine?",
    "Amazon Lex to build the conversational bot, Amazon Polly to speak responses in a lifelike voice (Lex can use it for voice output), and Amazon Transcribe to convert call recordings to text for review."
   ],
   [
    "A manufacturer wants employees to ask questions in plain language and get answers drawn from internal manuals and wikis, with each employee only seeing content they already have permission to access. The company does not want to build its own application. Which service fits?",
    "Amazon Q Business, a ready generative AI assistant that connects to company data sources and respects existing user permissions. Bedrock would suit a team wanting to build its own custom application instead."
   ]
  ],
  "tip": "Transcribe is speech to text; Polly is text to speech. Textract extracts text from documents; Comprehend understands text you already have. Custom models mean SageMaker AI; foundation models mean Bedrock.",
  "check": [
   [
    "A company wants to convert recorded customer calls into text. Which service?",
    "Amazon Transcribe, which converts speech to text."
   ],
   [
    "Which service extracts fields and tables from scanned invoices?",
    "Amazon Textract."
   ],
   [
    "A startup wants to build a generative AI writing assistant using existing foundation models without managing infrastructure. Which service?",
    "Amazon Bedrock."
   ],
   [
    "When is SageMaker AI a better fit than a task-specific AI service?",
    "When you need a custom model trained on your own data for a problem no pretrained service solves."
   ],
   [
    "Which service detects objects and unsafe content in images?",
    "Amazon Rekognition."
   ]
  ]
 },
 {
  "t": "Analytics services: Amazon Athena, AWS Glue, Amazon Kinesis, Amazon EMR and Amazon OpenSearch Service",
  "hook": "It is Monday morning at Lakeview Outfitters, and the marketing director, Priya, wants three things by Friday: a live 'trending now' list on the home page, a report of which products mobile shoppers abandon in their carts, and a search box that actually finds 'waterproof hiking boots' when someone types 'rain boots'. Your team has terabytes of clickstream logs sitting in Amazon S3 and no data warehouse. A colleague suggests standing up a big cluster for everything. Another says just write some SQL. Someone mentions Kinesis, Glue and OpenSearch in the same breath. Five services, three requests and one week. Which tool belongs to which job?",
  "simple": "Companies collect huge piles of data, like every click on a website. To get answers from that pile, you need a few different kinds of tools. One tool lets you ask questions of files where they already sit, the way you might search a folder of spreadsheets without copying them anywhere. Another tool tidies and labels the data so it is easy to find, like a librarian making a card catalog. Another handles data that arrives nonstop, like a conveyor belt that never stops moving. Another crunches enormous jobs using many computers at once. And another powers a search box. AWS has a service for each job, and the exam asks you to match the job to the service.",
  "body": [
   "Companies collect huge volumes of data, from website clicks to sensor readings to application logs, and want to turn it into insight. AWS analytics services cover four jobs: querying data where it already sits, preparing and cataloging it, processing it in real time or in big batches, and searching and visualizing it. Each service has a clear niche, and the Cloud Practitioner exam tests whether you can pick the right one from a short description of the job rather than how to configure it.",
   "Start with querying data in place. Amazon Athena is a serverless, interactive query service that analyzes data directly in Amazon Simple Storage Service (Amazon S3) using standard Structured Query Language (SQL). There are no servers or clusters to manage and no data to load: you define a table over files such as CSV, JSON or Parquet and run a query such as `SELECT status, COUNT(*) FROM weblogs GROUP BY status;`. Results come back in the console within seconds to minutes and are saved to an S3 location you choose. You pay based on the amount of data each query scans, so storing data in compressed, columnar formats such as Parquet and partitioning it by date reduces both cost and time, because Athena reads only the columns and folders the query needs. Athena is ideal for ad hoc analysis of logs and data lakes.",
   "Next comes preparing and cataloging. AWS Glue is a serverless data integration service for extract, transform and load (ETL). Glue crawlers scan data sources, infer their structure, and record the schemas as tables in the AWS Glue Data Catalog, a central metadata repository that Athena, Amazon EMR and Amazon Redshift can all use. Think of the Data Catalog as the shared table of contents: the data stays in S3, but every analytics service can look up what columns a dataset has and where its files live. Glue jobs then clean, transform and move data between stores, for example converting raw CSV files into partitioned Parquet for efficient querying. AWS Glue DataBrew offers visual data preparation without code, aimed at analysts who would rather click than script.",
   "For data that arrives continuously, Amazon Kinesis handles streaming in real time. Amazon Kinesis Data Streams captures and stores streams of records, such as clickstreams, application logs or Internet of Things (IoT) telemetry, so multiple consumer applications can read and process them within seconds. Amazon Data Firehose (formerly Kinesis Data Firehose) is the simpler option: it loads streaming data into destinations such as S3, Redshift or Amazon OpenSearch Service with no code, optionally batching and compressing it first. Kinesis Video Streams ingests video from connected cameras. The key idea is timing: Kinesis is about seconds, not about a report that runs overnight.",
   "For very large processing jobs, Amazon EMR is a managed big data platform for running open-source frameworks such as Apache Spark, Apache Hadoop, Hive and Presto on scalable clusters, or in a serverless mode, for large-scale work like log analysis, machine learning (ML) data preparation and financial simulations. AWS handles provisioning and configuring the cluster, while your team writes Spark or Hadoop jobs as it already knows how. Choose EMR when a team already uses these frameworks or needs fine control over big data processing; it is more work than Athena, so it is not the answer for a quick one-off query.",
   "Searching and visualizing round out the set. Amazon OpenSearch Service is a managed service for OpenSearch (and legacy Elasticsearch), used for full-text search, log analytics and operational dashboards; it powers search boxes that tolerate typos and rank results by relevance. Amazon QuickSight provides business intelligence (BI) dashboards and visualizations for business users. Amazon Managed Streaming for Apache Kafka (Amazon MSK) runs Apache Kafka for teams that prefer it to Kinesis. Amazon Redshift, the data warehouse, is the place to load data for heavy, repeated reporting.",
   "Consider a worked example of these services together. A news website wants to understand reader behavior. Page-view events stream into Kinesis Data Streams, and a consumer updates a 'trending now' list within seconds. Data Firehose also delivers the same events to S3 every few minutes. A Glue crawler catalogs the files and a nightly Glue job converts them to Parquet. Analysts run ad hoc Athena queries such as 'which articles did mobile readers finish?', while a data engineering team uses EMR with Spark to build reader-interest models. Editors watch QuickSight dashboards, and the site's search box is powered by OpenSearch Service.",
   "Several mistakes come up again and again. Learners confuse Athena and Redshift: both run SQL, but Athena queries files in S3 on demand, while Redshift is a warehouse you load data into for heavy, repeated analytics. Others think Glue queries data, when it catalogs and transforms and Athena does the querying. Some choose EMR when a no-code Firehose delivery or a simple Athena query would do, or treat Kinesis as batch processing when its purpose is real time. Another trap is using OpenSearch Service as a data warehouse; it excels at search and log analytics rather than complex relational reporting.",
   "Exam keywords map neatly to services. 'SQL queries on data in S3 without servers' or 'pay per query' means Athena. 'ETL', 'data catalog', 'crawler' or 'discover schema' means Glue. 'Real-time streaming', 'clickstream' or 'ingest data within seconds' means Kinesis, with Data Firehose for 'load streaming data into S3 or Redshift with no code'. 'Hadoop', 'Spark' or 'big data clusters' means EMR. 'Full-text search' or 'log analytics dashboards' means OpenSearch Service. 'Business intelligence dashboards' means QuickSight. 'Data warehouse' means Redshift."
  ],
  "analogy": "Picture a busy restaurant. Kinesis is the order printer that spits out tickets the moment customers order. Glue is the prep cook who labels every container in the walk-in fridge and keeps the inventory list current. Athena is the manager who walks into the fridge with a clipboard and answers a question without moving anything. EMR is a hired catering crew brought in for a massive banquet. OpenSearch is the menu search on the tablet. The analogy stops at cost: Athena charges by how much it reads, so a messy fridge literally costs more to search.",
  "terms": [
   [
    "Amazon Athena",
    "A serverless service for querying data in S3 with standard SQL, billed by data scanned."
   ],
   [
    "AWS Glue",
    "A serverless data integration service for ETL, with crawlers and a central Data Catalog."
   ],
   [
    "ETL",
    "Extract, transform and load: moving data from sources, reshaping it and loading it into a target store."
   ],
   [
    "AWS Glue Data Catalog",
    "A central metadata repository of table definitions used by Athena, EMR and Redshift."
   ],
   [
    "Amazon Kinesis Data Streams",
    "A service for capturing and processing streaming data records in real time."
   ],
   [
    "Amazon Data Firehose",
    "A service that loads streaming data into destinations like S3 and Redshift without custom code."
   ],
   [
    "Amazon EMR",
    "A managed platform for big data frameworks such as Apache Spark and Hadoop."
   ],
   [
    "Amazon OpenSearch Service",
    "A managed service for search, log analytics and operational dashboards."
   ],
   [
    "Amazon QuickSight",
    "A business intelligence service for interactive dashboards and visualizations."
   ]
  ],
  "example": "A security team keeps months of VPC Flow Logs and CloudTrail logs in S3. Instead of building a database, it runs a Glue crawler to create tables and uses Athena to answer questions like 'which IP addresses were rejected most often last week?', paying only for the data each query scans. After converting the logs to Parquet with a Glue job, the same queries scan far less data and cost much less.",
  "mistakes": [
   [
    "Athena and Redshift are interchangeable because both use SQL.",
    "Athena queries files in S3 on demand with nothing to load and no cluster. Redshift is a data warehouse you load data into for heavy, repeated analytics. 'Occasional queries on S3 files' means Athena; 'enterprise data warehouse' means Redshift."
   ],
   [
    "AWS Glue is the service that answers SQL questions about the data.",
    "Glue discovers schemas, maintains the Data Catalog and runs ETL jobs. The querying is done by Athena, Redshift or EMR using that catalog."
   ],
   [
    "Kinesis is a good fit for a nightly batch report.",
    "Kinesis is built for streaming data processed within seconds. A nightly report over stored files is a job for Athena, Glue, EMR or Redshift."
   ],
   [
    "EMR is the default answer for any analytics question.",
    "EMR suits teams running Spark, Hadoop or similar frameworks at scale. For a simple query or a no-code delivery pipeline, Athena or Data Firehose is simpler and cheaper."
   ]
  ],
  "tryit": [
   [
    "Riverside Transit has GPS pings from 800 buses arriving every few seconds. Dispatchers want a live map that updates within seconds, and planners also want the raw pings saved to S3 so they can query them later with SQL. The team has no streaming expertise and wants as little code as possible for the saving part. Which services fit each need?",
    "Kinesis Data Streams captures the pings so a consumer can update the live map within seconds. Amazon Data Firehose delivers the same stream to S3 with no custom code. Later, a Glue crawler can catalog the files and Athena can query them with SQL, paying per data scanned."
   ]
  ],
  "tip": "Athena and Redshift both run SQL. Athena queries files in S3 on demand with nothing to load; Redshift is a data warehouse you load data into for heavy, repeated analytics. Glue catalogs and transforms, it does not query.",
  "check": [
   [
    "A team wants to run occasional SQL queries on log files in S3 without managing any servers. Which service?",
    "Amazon Athena, which queries S3 data in place and bills per data scanned."
   ],
   [
    "Which service discovers the schema of data in S3 and stores it in a central catalog?",
    "AWS Glue, using crawlers and the Glue Data Catalog."
   ],
   [
    "A website must process clickstream events within seconds. Which service family fits?",
    "Amazon Kinesis (Kinesis Data Streams for real-time processing)."
   ],
   [
    "A data team already uses Apache Spark and Hadoop. Which managed service lets them run these on AWS?",
    "Amazon EMR."
   ],
   [
    "How can you cut both the cost and run time of Athena queries?",
    "Store data in compressed, columnar formats such as Parquet and partition it, so each query scans less data."
   ]
  ]
 },
 {
  "t": "Application integration, monitoring and other services: Amazon SQS, Amazon SNS, Amazon EventBridge, Amazon CloudWatch, AWS Systems Manager and AWS IoT Core",
  "hook": "It is the first evening of the holiday sale at Copperleaf Prints, and Marcus, the only engineer on call, is watching checkout errors climb. The website calls the printing system directly, and the printers are slow tonight, so every slow print job turns into a customer staring at a spinning wheel. Meanwhile the warehouse team wants to know about every order, finance wants every order, and the email system wants every order, each through its own fragile connection. And Marcus still has to patch forty servers on Sunday without opening SSH to the internet. How do you stop one slow part from dragging the whole shop down?",
  "simple": "Imagine a busy sandwich shop. If the cashier had to wait for each sandwich to be made before taking the next order, the line would stall. Instead, the cashier pins each ticket on a rail, and cooks take tickets when they are ready. That rail is a queue. Now imagine a loudspeaker that announces each order to the kitchen, the drinks station and the dessert counter at once. That is a broadcast. AWS has services for both: a queue that holds work until a worker is free, and a broadcaster that tells many listeners at once. It also has tools that route events by rules, watch how everything is running, help you manage many servers, and connect small devices like sensors.",
  "body": [
   "Modern applications are built from many components that must communicate reliably and be monitored and managed at scale. If every component calls the next one directly, a slow or failed piece drags down everything upstream; this is called tight coupling. Application integration services loosen that coupling, and management services let a small team watch and operate large fleets. The exam tests whether you can pick the right service for decoupling, notifications, event routing, monitoring, fleet management and device connectivity.",
   "The first tool is the queue. Amazon Simple Queue Service (Amazon SQS) is a fully managed message queue. A producer sends messages to a queue, and consumers poll the queue, process messages at their own pace and delete each one once handled. While a consumer works on a message it is hidden from others for a visibility timeout, and messages that repeatedly fail can move to a dead-letter queue for investigation. The queue buffers bursts of work and decouples components, so a slow or failed consumer does not break the producer; work simply waits in the queue until someone is ready. Standard queues offer very high throughput with at-least-once delivery, which means a message can occasionally arrive twice and best-effort ordering; first-in, first-out (FIFO) queues preserve order and process each message exactly once.",
   "The second tool is the broadcaster. Amazon Simple Notification Service (Amazon SNS) is a publish/subscribe (pub/sub) service. A publisher sends a message to a topic, and SNS pushes it immediately to every subscriber: SQS queues, AWS Lambda functions, HTTPS endpoints, email addresses, or mobile push and SMS text messages. The key difference is direction and audience. SQS is a queue that consumers pull from, with one consumer processing each message; SNS pushes each message to many subscribers at once. Combining them, SNS fan-out to several SQS queues, lets each downstream system process the same event independently and at its own speed.",
   "Routing by rules is the job of Amazon EventBridge, a serverless event bus. It receives events from AWS services, your own applications and software as a service (SaaS) partners, and routes them to targets based on rules that match event content, for example 'when an EC2 instance changes to stopped, invoke this Lambda function' or 'when a GuardDuty finding has high severity, notify the security team'. A rule is essentially a pattern, such as a JSON match on the event's source and detail type, plus a list of targets. EventBridge Scheduler runs tasks on a schedule, but scheduling is only one part of what EventBridge does.",
   "Watching everything is the job of Amazon CloudWatch, the core operational monitoring service. It collects metrics such as CPU utilization, stores and searches logs in CloudWatch Logs, displays dashboards, and raises alarms that can notify an SNS topic or trigger Auto Scaling. An alarm might read 'average CPUUtilization above 80 percent for 3 consecutive 5-minute periods', and when it changes to the ALARM state it can page the on-call engineer through SNS. Keep CloudWatch separate from AWS CloudTrail: CloudWatch answers 'how is it performing?', while CloudTrail answers 'who called which API, and when?'.",
   "Managing fleets is the job of AWS Systems Manager, a collection of capabilities for managing EC2 instances and on-premises servers at scale. Session Manager gives secure shell access through the console or command line interface (CLI) without opening inbound ports or managing Secure Shell (SSH) keys, and logs sessions for auditing. Patch Manager automates operating system patching on a schedule. Run Command executes scripts across fleets, Inventory records installed software, and Parameter Store holds configuration values and secrets. Connecting devices is the job of AWS IoT Core, which securely connects Internet of Things (IoT) devices to the cloud, receiving their messages, often over the lightweight MQTT protocol, and routing them with rules to services such as Lambda, Amazon DynamoDB or Kinesis.",
   "Consider a worked example. An online shop publishes an 'order placed' message to an SNS topic. Three SQS queues subscribe: one for payment, one for the warehouse and one for email receipts, so each team's service processes orders at its own speed, and a warehouse outage simply lets its queue grow until it recovers. EventBridge watches for EC2 state changes and notifies operations. CloudWatch alarms on error rates page the on-call engineer, Systems Manager Patch Manager patches the fleet every Sunday, and engineers use Session Manager instead of opening port 22. Smart shelf sensors in the warehouse report stock levels through IoT Core.",
   "Common mistakes follow predictable lines. Learners choose SQS when one message must reach several systems at once (that is SNS, often with queues behind it), or choose SNS when work must be buffered and processed reliably by a worker (that is SQS). They confuse CloudWatch, which monitors performance and operations, with AWS CloudTrail, which records API activity for auditing. They open SSH to the internet when Session Manager would avoid it, and they think EventBridge is only a scheduler rather than a rule-based event router.",
   "On the exam, cue words decide. 'Decouple', 'buffer' or 'queue' means SQS, and 'process in order, exactly once' means an SQS FIFO queue. 'Notify multiple subscribers', 'pub/sub', 'fan-out' or 'send an SMS or email alert' means SNS. 'React to events with rules' or 'route events from SaaS applications' means EventBridge. 'Metrics, logs, alarms, dashboards' means CloudWatch. 'Patch a fleet', 'run commands on many instances' or 'connect to instances without SSH keys or open ports' means Systems Manager. 'Connect sensors and devices' means IoT Core."
  ],
  "analogy": "SQS is a ticket rail in a kitchen: each ticket is taken by exactly one cook, whenever a cook is free, and tickets wait safely during a rush. SNS is the restaurant's intercom: one announcement reaches every station at the same moment. EventBridge is a smart mail room that reads each envelope and forwards it according to rules. The analogy breaks slightly for standard SQS queues, which can occasionally hand the same ticket out twice, so consumers should be able to handle duplicates.",
  "terms": [
   [
    "Amazon SQS",
    "A fully managed message queue that decouples producers and consumers, with consumers pulling messages."
   ],
   [
    "Dead-letter queue",
    "A queue that holds messages that could not be processed successfully after several attempts, for later investigation."
   ],
   [
    "Amazon SNS",
    "A pub/sub service that pushes each message published to a topic to all its subscribers."
   ],
   [
    "Fan-out",
    "A pattern where one SNS message is delivered to several SQS queues or other subscribers for parallel processing."
   ],
   [
    "Amazon EventBridge",
    "A serverless event bus that routes events to targets based on matching rules."
   ],
   [
    "Amazon CloudWatch",
    "The AWS service for metrics, logs, dashboards and alarms."
   ],
   [
    "AWS Systems Manager",
    "A set of tools for managing, patching and accessing EC2 and on-premises servers at scale."
   ],
   [
    "Session Manager",
    "A Systems Manager capability that provides audited shell access without inbound ports or SSH keys."
   ],
   [
    "AWS IoT Core",
    "A managed service that securely connects IoT devices and routes their messages to AWS services."
   ]
  ],
  "example": "A photo-printing service used to call its printing system directly from the web tier, so when printers were slow, customers saw checkout errors. The team placed an SQS queue between them: the website now drops a message in the queue and responds instantly, and print workers take jobs as fast as they can. During the holiday rush the queue grows for a few hours, but no orders are lost and customers never notice.",
  "mistakes": [
   [
    "SQS is the right choice when one event must reach billing, shipping and email at the same time.",
    "An SQS message is processed by one consumer. Delivering one event to many systems is SNS, usually fanning out to one SQS queue per system."
   ],
   [
    "CloudWatch tells you which user deleted a resource.",
    "CloudWatch handles metrics, logs, dashboards and alarms. The record of who made which API call is AWS CloudTrail."
   ],
   [
    "EventBridge is just a cron scheduler.",
    "EventBridge Scheduler is one feature, but EventBridge is mainly a rule-based event bus that routes events from AWS services, your apps and SaaS partners to targets."
   ],
   [
    "To reach private instances, you must open port 22 and distribute SSH keys.",
    "Systems Manager Session Manager provides audited shell access with no inbound ports and no SSH keys to manage."
   ]
  ],
  "tryit": [
   [
    "Fernwood Clinic's appointment app must send a text reminder, update a reporting database and notify the billing system whenever an appointment is booked. Last month the reporting database was offline for an hour and bookings failed with it. The team wants each system to work independently and none to lose events. What design fits?",
    "Publish each booking to an SNS topic and subscribe an SQS queue for reporting and one for billing, plus SMS for the reminder. This is SNS fan-out: every system gets every event, and if reporting goes offline its queue simply holds messages until it recovers, so bookings no longer fail."
   ],
   [
    "An operations lead wants a Lambda function to run automatically whenever any EC2 instance in the account enters the stopped state. Which service connects the event to the function?",
    "Amazon EventBridge, with a rule matching the EC2 instance state-change event for the stopped state and the Lambda function as its target."
   ]
  ],
  "tip": "SQS is pull-based and each message is processed by one consumer; SNS is push-based and delivers every message to all subscribers. One event that must reach several systems means SNS, often with SQS queues behind it.",
  "check": [
   [
    "A web tier must hand work to a slower back-end without losing requests during spikes. Which service?",
    "Amazon SQS, which buffers messages so the back-end can process them at its own pace."
   ],
   [
    "One order event must reach the billing, shipping and email systems simultaneously. Which pattern?",
    "SNS fan-out: publish to an SNS topic with each system subscribed, often through its own SQS queue."
   ],
   [
    "How can administrators reach EC2 instances without opening SSH ports or managing keys?",
    "AWS Systems Manager Session Manager."
   ],
   [
    "Which service would trigger a Lambda function whenever an EC2 instance stops?",
    "Amazon EventBridge, using a rule that matches the instance state-change event."
   ],
   [
    "Which SQS queue type should you choose when messages must be processed in order and exactly once?",
    "A FIFO queue."
   ]
  ]
 },
 {
  "t": "EC2 purchase options: On-Demand, Reserved Instances, Savings Plans, Spot Instances, Dedicated Hosts and Dedicated Instances",
  "hook": "The finance lead at Bramble Health, Joanne, slides a printout across your desk. Last quarter the company spent most of its AWS budget on EC2, and almost every instance ran at On-Demand rates, including the web servers that have run day and night for two years and the nightly analytics jobs that could easily restart if something went wrong. A software vendor has also asked whether the company's old per-core database licenses can move to AWS. Joanne asks a simple question: are we paying full price for things we could buy more cheaply? You suspect the answer is yes, but which option fits which workload?",
  "simple": "Think about how you might pay for a car. You can rent one by the day with no promise to keep it, which is flexible but costly per day. You can lease one for a few years at a lower monthly price, because you promised to keep paying. You can grab a cheap leftover rental car from the lot, knowing the company might ask for it back on short notice. Or you can have a car reserved just for you, which costs the most. AWS sells server time in the same ways: pay as you go, commit for one or three years for a discount, use spare capacity cheaply but with the risk of being interrupted, or pay extra for hardware dedicated to you.",
  "body": [
   "The same EC2 instance can cost very different amounts depending on how you buy it. Picking the right purchase option for each workload is one of the biggest cost levers in AWS, and a guaranteed exam topic. The skill being tested is matching: read what the workload needs (how long it runs, whether it can be interrupted, whether it has licensing or isolation requirements) and pick the option that is cheapest without breaking those needs.",
   "On-Demand Instances are the default. You pay for compute by the second or hour with no commitment and no up-front payment, and you can stop at any time. They suit short-term, spiky or unpredictable workloads, development and testing, and applications you are running for the first time and cannot yet forecast. They are the most flexible option and the most expensive per hour of the standard choices. On a bill, this is simply the list price multiplied by the hours or seconds you ran.",
   "Reserved Instances (RIs) give a significant discount compared with On-Demand in exchange for a one-year or three-year commitment to a specific instance configuration, such as instance type, Region and operating system. You can pay all up front, partially up front or nothing up front; paying more up front and committing longer gives bigger discounts. Standard RIs offer the largest discount, and unneeded ones can be sold in the Reserved Instance Marketplace. Convertible RIs let you exchange for different instance attributes during the term, with a smaller discount. A zonal RI also reserves capacity in a specific Availability Zone (AZ), while a regional RI gives the discount across AZs in its Region without a capacity reservation.",
   "Savings Plans are a more flexible commitment model. You commit to a consistent amount of compute usage, measured in dollars per hour, for one or three years, and any matching usage up to that amount gets the discounted rate automatically; usage beyond the commitment is billed at On-Demand rates. Compute Savings Plans apply to EC2 regardless of family, size, Region or operating system, and also to AWS Fargate and AWS Lambda. EC2 Instance Savings Plans give a larger discount but are tied to an instance family in a chosen Region. For steady, predictable workloads, RIs and Savings Plans are the answer, and AWS now generally recommends Savings Plans for their flexibility. Remember that a Savings Plan is a billing construct, not something you launch.",
   "Spot Instances use spare EC2 capacity at steep discounts, but AWS can reclaim them with a two-minute warning when it needs the capacity back. They suit fault-tolerant, flexible and stateless work such as batch processing, big data, continuous integration and continuous delivery (CI/CD) builds, image rendering and containerized workers that can be interrupted and resumed. Good Spot designs save progress with checkpoints, spread requests across several instance types and AZs, and treat an interruption as a delay rather than a failure.",
   "Some workloads need dedicated hardware. Dedicated Hosts are physical servers fully dedicated to you, with visibility into sockets and cores, which helps with bring-your-own-license (BYOL) software licensed per socket or core and some compliance requirements; they are the most expensive option. Dedicated Instances run on hardware dedicated to your account but without host-level visibility or placement control, so they provide isolation but do not help with per-core licensing. On-Demand Capacity Reservations reserve capacity in an AZ without a term commitment, which is useful when you must be sure instances can launch, for example during a planned event, and they can be combined with Savings Plans or regional RIs for a discount.",
   "Consider a worked example. A company runs a web application whose baseline of ten instances runs all year, with spikes to thirty during promotions. It covers the baseline with a three-year Compute Savings Plan, handles spikes with On-Demand instances through Auto Scaling, and runs its nightly analytics on Spot Instances with checkpointing so an interruption only delays the job. A legacy database licensed per physical core runs on a Dedicated Host so the company can use its existing licenses. The development team uses On-Demand and stops instances at night. Most real accounts blend several options like this rather than choosing just one.",
   "Common mistakes include running a workload that cannot tolerate interruption on Spot; buying three-year RIs for a project with an uncertain future; confusing Dedicated Hosts (you see and control the physical server, for licensing) with Dedicated Instances (isolation only); thinking a Savings Plan is a specific instance you launch (it is a billing discount applied automatically to matching usage); and assuming RIs are always the cheapest overall even when the workload stops after three months. Rightsize first, then commit, or you lock in a discount on capacity you do not need.",
   "On the exam, match the clue to the option. 'Steady state', 'predictable usage for one to three years' means Reserved Instances or Savings Plans, and 'flexible across instance families, Regions, Fargate and Lambda' means Compute Savings Plans. 'Can be interrupted', 'fault tolerant', 'lowest cost for flexible batch jobs' means Spot. 'Short-term, unpredictable and cannot be interrupted' means On-Demand. 'Existing per-socket or per-core licenses' or 'visibility into physical cores' means Dedicated Hosts. 'Reserve capacity in an AZ without a long-term commitment' means On-Demand Capacity Reservations."
  ],
  "analogy": "Buying EC2 is like booking hotel rooms. On-Demand is the walk-in nightly rate. Reserved Instances are a corporate contract for a specific room type at one hotel. A Compute Savings Plan is a prepaid spending commitment that works at any hotel in the chain. Spot is a deeply discounted standby room you must vacate when a full-price guest arrives, though AWS gives two minutes' notice. A Dedicated Host is renting the whole building so you can see every floor. The analogy weakens in one place: Savings Plans apply automatically to matching usage, with no booking step.",
  "terms": [
   [
    "On-Demand Instances",
    "EC2 capacity billed per second or hour with no commitment."
   ],
   [
    "Reserved Instances (RIs)",
    "A one- or three-year commitment to an instance configuration in exchange for a significant discount."
   ],
   [
    "Convertible RI",
    "A Reserved Instance that can be exchanged for different instance attributes during its term, at a smaller discount than a Standard RI."
   ],
   [
    "Savings Plans",
    "A commitment to a dollar-per-hour amount of compute usage for one or three years in exchange for discounted rates."
   ],
   [
    "Compute Savings Plans",
    "The most flexible Savings Plan, applying across EC2 families, sizes and Regions plus Fargate and Lambda."
   ],
   [
    "Spot Instances",
    "Spare EC2 capacity at a steep discount that AWS can reclaim with a two-minute warning."
   ],
   [
    "Dedicated Hosts",
    "Physical servers dedicated to one customer with visibility into sockets and cores, useful for BYOL licensing."
   ],
   [
    "Dedicated Instances",
    "Instances running on hardware dedicated to one account, without host-level control."
   ],
   [
    "On-Demand Capacity Reservation",
    "A reservation of EC2 capacity in a specific AZ with no term commitment."
   ]
  ],
  "example": "A visual effects studio renders thousands of film frames each week. Each frame is independent, so if an instance disappears the frame is simply re-queued. The studio moves rendering from On-Demand to Spot Instances across several instance types, cutting the rendering bill dramatically, while its always-on asset database stays on instances covered by a Savings Plan because it must never be interrupted.",
  "mistakes": [
   [
    "Spot is the cheapest, so use it for the production database.",
    "Spot capacity can be reclaimed with a two-minute warning. Workloads that cannot tolerate interruption belong on On-Demand or on capacity covered by RIs or Savings Plans."
   ],
   [
    "Dedicated Instances solve per-core licensing.",
    "Only Dedicated Hosts give visibility into sockets and cores for BYOL licensing. Dedicated Instances provide hardware isolation without host-level control."
   ],
   [
    "A Savings Plan is a type of instance you launch.",
    "A Savings Plan is a billing commitment. You launch normal instances, and the discount applies automatically to matching usage up to the hourly commitment."
   ],
   [
    "Three-year RIs are always the cheapest choice.",
    "Commitments only save money if the workload actually runs for the term. For a short or uncertain project, On-Demand may cost less overall. Rightsize before committing."
   ]
  ],
  "tryit": [
   [
    "Juniper Analytics runs a reporting service that must stay up all day, every day, and expects to keep it for at least three years. The team also plans to move parts of it to AWS Lambda and Fargate next year and may change Regions. Which purchase option gives a commitment discount without locking them to EC2 instance families or a Region?",
    "A Compute Savings Plan. It discounts steady usage for one or three years and applies across EC2 families, sizes and Regions as well as Fargate and Lambda, so the planned changes stay covered. A Standard RI or EC2 Instance Savings Plan would be tied to specific instance attributes or a family and Region."
   ],
   [
    "A university research group runs genome processing jobs that take hours, save progress every ten minutes and can resume after a restart. They want the lowest possible compute price. What should they use?",
    "Spot Instances. The jobs are fault tolerant and checkpointed, so a two-minute reclaim only delays them, and Spot offers the steepest discount."
   ]
  ],
  "tip": "'Steady for one to three years' means RIs or Savings Plans; 'can be interrupted' means Spot; 'short-term and cannot be interrupted' means On-Demand; 'existing per-core licenses' means Dedicated Hosts.",
  "check": [
   [
    "Which option is cheapest for a batch job that can restart if interrupted?",
    "Spot Instances, which use spare capacity at a steep discount but can be reclaimed with two minutes' notice."
   ],
   [
    "A company wants a commitment discount that also applies to Lambda and Fargate. What should it buy?",
    "A Compute Savings Plan."
   ],
   [
    "Why would a company choose Dedicated Hosts?",
    "To use existing server-bound licenses (per socket or per core) or meet compliance needs that require a dedicated physical server with visibility into it."
   ],
   [
    "Which option fits a new application whose usage cannot yet be predicted and must not be interrupted?",
    "On-Demand Instances, which require no commitment."
   ],
   [
    "Which option reserves capacity in an Availability Zone without a one- or three-year term?",
    "On-Demand Capacity Reservations."
   ]
  ]
 },
 {
  "t": "Data transfer and storage pricing: inbound vs outbound traffic, cross-Region traffic and S3 storage class costs",
  "hook": "Tomás runs the small platform team at Northgate Video, and this month's AWS bill is nearly double what he forecast. The EC2 line looks normal. The surprise is a long list of entries he has never paid attention to: data transfer out, data transfer between Regions, NAT gateway bytes processed, S3 retrieval fees for an archive class someone picked to 'save money', and a stack of EBS volumes attached to nothing. His director wants an explanation by Thursday and a plan to stop it happening again. Which of these charges were avoidable, and how should the architecture change?",
  "simple": "Storing things in AWS and moving things around in AWS are priced differently. Bringing data into AWS from the internet is usually free, like a store that does not charge you to drop off packages. Sending data out to the internet costs money for each gigabyte, like paying postage on every parcel you ship. Moving data between AWS locations far apart also costs money. Storage has its own rule: the cheaper a storage option is per month, the more it usually costs to read your data back. So a cheap archive is great for things you almost never open, but costly for things you open every day. And some storage, like a virtual hard disk, is charged for its full size even if it is mostly empty.",
  "body": [
   "Compute is only part of an AWS bill. Data transfer and storage charges can be significant and are a common source of surprise costs, so the exam expects you to understand the basic pricing patterns. You do not need to memorize prices, which change and vary by Region, but you do need to know which movements of data cost money, which are usually free, and how storage classes trade storage price against access price.",
   "The most important rule concerns direction. Data transfer into AWS from the internet (inbound, or ingress) is generally free. Data transfer out of AWS to the internet (outbound, or egress) is charged per gigabyte with tiered rates that fall as volume grows. That is why serving a lot of content directly from Amazon EC2 or Amazon Simple Storage Service (Amazon S3) to users can become expensive, and why putting Amazon CloudFront, the AWS content delivery network (CDN), in front is a common optimization: transfer from AWS origins to CloudFront is not charged, CloudFront's delivery rates are often lower, and cached content reduces load on the origin. In Cost Explorer this shows up as usage types containing 'DataTransfer-Out', and it is often the line that grows fastest as a product succeeds.",
   "Traffic between AWS locations also matters. Data transferred between AWS Regions is charged, so cross-Region replication and multi-Region architectures carry a transfer cost as well as duplicate storage. Within a Region, traffic between Availability Zones (AZs) is generally charged in each direction, while traffic between resources in the same AZ using private IP addresses is generally free. That does not mean you should abandon multi-AZ designs, which provide resilience; it means you should know that the resilience has a transfer cost and keep very chatty components close together where it is safe to do so.",
   "Network devices add their own charges. A NAT gateway charges by the hour and for each gigabyte it processes, so private instances pulling large amounts of data from S3 through it pay extra. A virtual private cloud (VPC) gateway endpoint for S3 lets them reach S3 privately without that processing charge, and gateway endpoints for S3 and Amazon DynamoDB carry no additional charge themselves. AWS Direct Connect, a dedicated private network connection from your premises to AWS, can lower outbound transfer rates for large, steady volumes.",
   "Storage pricing depends on the service and the class. For Amazon S3 you pay for the amount of data stored per month, for requests such as PUT and GET, for data transfer out, and in some classes for data retrieval. The cheaper the storage class per gigabyte, the more you tend to pay to access data. Standard-Infrequent Access (Standard-IA) and One Zone-IA add per-gigabyte retrieval fees and minimum storage durations, and the Glacier classes have the lowest storage prices but higher retrieval costs, longer retrieval times for Flexible Retrieval and Deep Archive, and longer minimum durations. S3 Intelligent-Tiering charges a small monitoring fee per object but no retrieval fees, moving objects between tiers automatically. Lifecycle rules can move objects to colder classes as they age, so you do not have to do it by hand.",
   "Block and file storage are billed differently. For Amazon Elastic Block Store (Amazon EBS) you pay for the provisioned size of each volume whether or not it is full, plus any provisioned performance, plus snapshot storage. An unattached volume still costs money every month, and so does the EBS volume behind a stopped instance. Amazon Elastic File System (Amazon EFS), by contrast, bills for the storage you actually use, and offers an infrequent access class for colder files. Deleting unattached EBS volumes and old snapshots, and releasing unused Elastic IP addresses, are quick cost wins.",
   "Consider a worked example. A video site stores files in S3 Standard in one Region and serves them directly to viewers worldwide, and its bill is dominated by data transfer out. The team puts CloudFront in front, so popular videos are served from edge caches and the origin transfer to CloudFront is not charged. It adds a lifecycle rule moving videos older than six months to Standard-IA, since they are rarely watched, and it replaces a NAT gateway path to S3 with a gateway endpoint for its transcoding servers. It also finds and deletes forty unattached EBS volumes from old experiments.",
   "Common mistakes include assuming all data transfer is free inside AWS (cross-AZ and cross-Region traffic is charged); moving frequently read data to IA or Glacier classes to save money and then paying more in retrieval fees; forgetting minimum storage duration charges when deleting objects early from IA or Glacier classes; paying for large EBS volumes that are mostly empty; and overlooking NAT gateway data processing charges. Another trap is thinking uploading data to S3 is expensive; inbound transfer is free, although request charges still apply.",
   "On the exam, remember 'in is free, out costs money'. 'Reduce data transfer costs for global content delivery' points to CloudFront. 'Unexpected charges for traffic between AZs or Regions' points to data transfer pricing. 'Data rarely accessed but needed quickly' points to Standard-IA, 'long-term archive at the lowest cost' to Glacier Deep Archive, and 'unknown access patterns' to Intelligent-Tiering. 'Charged for storage even when unused' points to provisioned EBS volumes."
  ],
  "analogy": "S3 storage classes work like places to keep your belongings. S3 Standard is your bedroom closet: higher rent per shelf, but you can grab anything instantly for free. Standard-IA is a self-storage unit across town: cheaper rent, but a fee each time you drive over, and a minimum contract. Glacier Deep Archive is a warehouse in another state: rock-bottom rent, a big fee and a long wait to get a box back. The analogy stops for Intelligent-Tiering, which is like a mover who shifts boxes for you for a small per-box fee, with no retrieval charges.",
  "terms": [
   [
    "Inbound data transfer (ingress)",
    "Data moving into AWS from the internet, generally not charged."
   ],
   [
    "Outbound data transfer (egress)",
    "Data moving from AWS to the internet, charged per gigabyte with tiered rates."
   ],
   [
    "Cross-Region data transfer",
    "Data moved between AWS Regions, which is charged."
   ],
   [
    "Retrieval fee",
    "A per-gigabyte charge for reading data from infrequent access or archive S3 storage classes."
   ],
   [
    "Minimum storage duration",
    "A minimum period an object is billed for in certain S3 classes, even if deleted sooner."
   ],
   [
    "VPC gateway endpoint",
    "A private route from a VPC to S3 or DynamoDB that avoids the internet and NAT gateway charges."
   ],
   [
    "Provisioned storage",
    "Storage billed by the size you allocate, such as an EBS volume, regardless of how much data it holds."
   ]
  ],
  "example": "A research lab replicated every dataset to a second Region for safety and was surprised by a large transfer line on its bill. After reviewing, it kept cross-Region replication only for irreplaceable raw data, moved processed results older than 90 days to S3 Glacier Flexible Retrieval, and co-located its compute cluster in the same AZ as its scratch storage, cutting transfer and storage costs while keeping the protection it needed.",
  "mistakes": [
   [
    "All traffic inside AWS is free.",
    "Traffic between Regions is charged, and traffic between AZs in a Region is generally charged in each direction. Only same-AZ traffic over private IP addresses is generally free."
   ],
   [
    "Moving data to a colder S3 class always saves money.",
    "Colder classes charge retrieval fees and minimum storage durations. Frequently read data can cost more in IA or Glacier than in Standard."
   ],
   [
    "Uploading large datasets to S3 is expensive because of data transfer.",
    "Inbound transfer from the internet is generally free. You still pay S3 request charges and monthly storage."
   ],
   [
    "An EBS volume only costs what it stores.",
    "EBS bills for the provisioned size of the volume, so a 500 GB volume holding 20 GB is billed for 500 GB, even when unattached."
   ]
  ],
  "tryit": [
   [
    "Elm Street Press keeps 40 TB of scanned newspaper archives in S3 Standard. Analytics show that most files are never opened after the first year, but researchers occasionally need one within minutes. A junior engineer proposes moving everything to Glacier Deep Archive to minimize cost. What would you recommend?",
    "Deep Archive has the lowest storage price but long retrieval times, so it would fail the 'within minutes' need. A lifecycle rule moving files older than a year to Standard-IA (or Glacier Instant Retrieval) keeps millisecond access with lower storage cost. If access patterns are unpredictable, S3 Intelligent-Tiering avoids retrieval fees entirely."
   ],
   [
    "Private EC2 instances in a VPC download several terabytes a month from S3 through a NAT gateway. What change reduces cost without exposing the instances to the internet?",
    "Add a VPC gateway endpoint for S3. Traffic reaches S3 privately, avoiding the NAT gateway's per-gigabyte processing charge."
   ]
  ],
  "tip": "Remember 'in is free, out costs money', and cross-AZ and cross-Region traffic is charged. Cheaper S3 classes are not always cheaper overall: frequent reads from IA or Glacier classes can cost more in retrieval fees than Standard.",
  "check": [
   [
    "Is uploading data from the internet into S3 charged for data transfer?",
    "No, inbound data transfer is generally free, although S3 request charges still apply."
   ],
   [
    "How can a company reduce the cost of serving large files from S3 to users worldwide?",
    "Use Amazon CloudFront to cache content at edge locations; transfer from AWS origins to CloudFront is not charged and delivery rates are often lower."
   ],
   [
    "Why might moving frequently accessed data to S3 Standard-IA increase costs?",
    "Standard-IA charges per-gigabyte retrieval fees, so frequent reads can outweigh the lower storage price."
   ],
   [
    "You pay for a 500 GB EBS volume that holds 20 GB of data. Why?",
    "EBS bills for the provisioned size of the volume, not the data actually stored."
   ],
   [
    "Which S3 option suits data with unknown or changing access patterns?",
    "S3 Intelligent-Tiering, which moves objects between tiers automatically for a small monitoring fee and charges no retrieval fees."
   ]
  ]
 },
 {
  "t": "AWS Free Tier offers and how to avoid unexpected charges",
  "hook": "Devon is studying for the Cloud Practitioner exam in his apartment. Three weeks ago he followed a tutorial that built a VPC, an EC2 instance and a small database, finished the lab, and closed the browser feeling proud. Tonight an email arrives from AWS billing with a number that makes his stomach drop. He was sure everything he used was free. The tutorial said 'Free Tier eligible', after all. Now he is scrolling through the console, switching Regions, trying to find what is still running and wondering whether AWS will simply forgive it. What does the Free Tier actually promise, and what should he have done on day one?",
  "simple": "The AWS Free Tier is like a free sample counter at a grocery store. You can try a certain amount of certain things without paying. But if you take more than the sample, or pick up something that was never part of the sample, you pay the normal price at the register. Nobody stops you at the door. On a standard AWS account, going over the free amount does not switch anything off; the extra just shows up on your bill. So the safe habit is to set an alarm that emails you as soon as any money is spent, keep track of what you build, and delete it when you are done.",
  "body": [
   "The AWS Free Tier lets you explore and learn many AWS services without paying, within set limits. It is how most people do their first labs, and understanding its rules is the best protection against a surprise bill. The single most important idea for the exam is that the Free Tier is an allowance, not a spending cap: usage outside it is billed at normal rates unless you have specifically chosen an account plan that stops at the free limit.",
   "Free Tier offers have come in a few forms. Always Free offers do not expire and are available to all customers within monthly limits; for example, AWS Lambda includes a monthly allowance of requests and compute time, and Amazon DynamoDB includes an amount of storage and capacity. Short-term free trials start when you first use a particular service and last for a limited period. Historically, new accounts also received twelve months of free usage for services such as Amazon EC2, Amazon S3 and Amazon Relational Database Service (Amazon RDS) within limits. In 2025 AWS changed the offer for new accounts to a credit-based model with a time-limited free plan and a paid plan, so always check the current Free Tier page for what applies to your account rather than relying on older guides.",
   "Free Tier limits are specific: a particular instance size, a number of hours per month, a number of gigabytes or requests. Anything above the limit, or any service, size or feature not covered, is billed at normal rates. Common surprises include launching a larger instance than the eligible one, leaving resources running after a lab, a NAT gateway (which bills hourly and per gigabyte processed), public IPv4 addresses and Elastic IP addresses, unattached Amazon Elastic Block Store (Amazon EBS) volumes and snapshots, load balancers left behind, and data transfer out. Tutorials often create several of these quietly, so the label 'Free Tier eligible' on one resource says nothing about the others.",
   "Protect yourself with a few habits from the first hour. As soon as you open an account, create a budget in AWS Budgets, for example a monthly cost budget of a few dollars with an email alert at 80 percent of actual and 100 percent of forecasted spend; AWS offers a zero-spend budget template for exactly this, which alerts you as soon as any spending occurs. Turn on Free Tier usage alerts in the Billing and Cost Management preferences, and check the Free Tier page in the billing console, which shows your usage against each limit and a forecast for the month. Use the AWS Pricing Calculator before trying something new. Where possible, turn on Cost Anomaly Detection so unusual spikes are flagged.",
   "Clean-up is the other half of the habit. Tag lab resources, for example `Project=lab`, so you can find them later, and delete them as soon as you finish, ideally by deleting the AWS CloudFormation stack that created them so nothing is forgotten. Check every Region you used, because resources in another Region do not appear on the dashboard of the one you are viewing; Tag Editor and the Billing console's charges by Region help here. Remember that stopping an EC2 instance stops compute charges but not the charges for its EBS storage or any Elastic IP address.",
   "Account security is part of cost control too. Enable multi-factor authentication (MFA) on the root user, use an IAM user or IAM Identity Center for daily work, and never publish access keys in code repositories or screenshots. Stolen credentials used to launch many resources are one of the most expensive surprises possible, and AWS may not forgive the charges.",
   "Consider a worked example. A student follows a tutorial that creates a virtual private cloud (VPC) with a NAT gateway, an EC2 instance and an RDS database, then closes the browser. The EC2 instance was within the free allowance, but the NAT gateway and a larger database size were not. Because the student had set a small budget with an email alert, the alert arrived after three days instead of a bill weeks later. The student deleted the CloudFormation stack, confirmed the charges stopped in Cost Explorer, and now sets alerts and tags before every lab.",
   "Common mistakes include believing AWS stops your resources when the free allowance runs out; assuming every instance size or every service is included; forgetting that stopped EC2 instances still incur EBS storage charges; deleting an instance but leaving its volumes, snapshots or Elastic IP; and ignoring account security, which turns a leaked key into a large bill.",
   "On the exam, 'notify me before my costs exceed a small amount' points to AWS Budgets with alerts. 'Free offers that never expire' points to Always Free. 'Track usage against Free Tier limits' points to Free Tier usage alerts and the Free Tier page in the Billing and Cost Management console. If an option claims the Free Tier automatically prevents all charges, treat it as wrong unless the question clearly describes a plan that does so."
  ],
  "analogy": "The Free Tier is like a prepaid phone plan's included minutes, except on a standard account the phone never cuts off when the minutes run out; it just keeps billing at the normal rate. A budget alert is the text message that warns you you are close to the limit. The analogy fails in one direction: unlike a phone plan, resources you forgot about keep running and billing even when you are not using them at all.",
  "terms": [
   [
    "AWS Free Tier",
    "AWS's program of free usage allowances, trials and credits for exploring services within set limits."
   ],
   [
    "Always Free",
    "Free Tier offers that do not expire and apply to all customers within monthly limits."
   ],
   [
    "Free trial",
    "A short-term free offer that starts when you first use a particular service."
   ],
   [
    "Free Tier usage alert",
    "A billing preference that emails you when usage approaches or exceeds Free Tier limits."
   ],
   [
    "AWS Budgets",
    "A service that alerts you when actual or forecasted cost or usage crosses thresholds you set."
   ],
   [
    "Zero-spend budget",
    "A Budgets template that alerts you as soon as any spending occurs."
   ],
   [
    "Tag Editor",
    "A console tool for finding and tagging resources across Regions and services."
   ]
  ],
  "example": "A study group creates a shared sandbox account for exam labs. On day one they enable MFA on the root user, create a zero-spend budget and a small monthly cost budget with alerts to everyone's email, and agree that every lab is deployed with CloudFormation and tagged with the student's name. At the end of each session they delete their stacks. Months later their total spend is a few cents, and the one forgotten load balancer was caught by an alert within a day.",
  "mistakes": [
   [
    "AWS automatically stops resources when the Free Tier allowance runs out.",
    "On a standard paid account, usage beyond the allowance is billed at normal rates and nothing is stopped. Budgets and alerts are how you find out early."
   ],
   [
    "If the instance is Free Tier eligible, the whole lab is free.",
    "Eligibility applies to specific sizes and amounts. NAT gateways, larger instances, public IPv4 addresses, load balancers and data transfer out can all bill separately."
   ],
   [
    "Stopping an EC2 instance ends all of its charges.",
    "Compute stops, but the attached EBS volumes, snapshots and any Elastic IP address continue to cost money until deleted or released."
   ],
   [
    "Cost Explorer will email me when I start spending.",
    "Threshold alerts come from AWS Budgets (and Free Tier usage alerts). Cost Explorer is for analyzing spending after it happens."
   ]
  ],
  "tryit": [
   [
    "Aisha opens a new AWS account to practice for the exam. She plans to try EC2, S3 and Lambda over the next month and has no budget for mistakes. Before launching anything, what three steps should she take?",
    "Enable MFA on the root user; create a zero-spend or very small cost budget in AWS Budgets with email alerts; and turn on Free Tier usage alerts. During labs she should tag resources and use CloudFormation so she can delete everything at the end, checking each Region she used."
   ],
   [
    "A learner deletes a lab's EC2 instance but still sees small daily charges. What should they look for?",
    "Leftover resources outside the instance itself: unattached EBS volumes or snapshots, Elastic IP or public IPv4 addresses, a NAT gateway or load balancer, possibly in another Region. Tag Editor and charges by Region in the billing console help find them."
   ]
  ],
  "tip": "The Free Tier does not cap spending automatically on a standard paid account. Usage beyond the limits is billed at normal rates, so budgets, Free Tier alerts and clean-up are how you stay safe.",
  "check": [
   [
    "What happens when you exceed a Free Tier limit on a standard account?",
    "The extra usage is billed at normal on-demand rates; AWS does not stop your resources."
   ],
   [
    "Which service would email you as soon as spending in a new account goes above zero?",
    "AWS Budgets, using a zero-spend budget or a low cost budget with alerts."
   ],
   [
    "Name two resources that commonly cause charges after a lab even when the instance is deleted.",
    "Examples include NAT gateways, unattached EBS volumes or snapshots, Elastic IP or public IPv4 addresses, and load balancers."
   ],
   [
    "Why is enabling MFA on the root user part of avoiding unexpected charges?",
    "Stolen credentials can be used to launch expensive resources, so strong account security prevents costly abuse."
   ],
   [
    "Which kind of Free Tier offer does not expire?",
    "Always Free offers, such as monthly allowances for AWS Lambda and Amazon DynamoDB."
   ]
  ]
 },
 {
  "t": "Estimating and tracking cost: AWS Pricing Calculator, AWS Cost Explorer and AWS Budgets",
  "hook": "Three people at Sunfield Logistics have three different cost questions on the same afternoon. Rosa, the architect, needs a monthly estimate for a new tracking platform that does not exist yet, and finance wants it tomorrow. Ben, the operations manager, wants to know why last month's bill jumped by a third. And Karen, the CFO, wants an email the moment the new project looks like it will overspend, not after the invoice arrives. Each of them asks you which AWS tool to open. The names sound alike and the exam knows it. Which tool answers which question?",
  "simple": "There are three moments when you care about money: before you buy, after you buy, and while you are spending. Before you build anything in AWS, a calculator lets you guess the price, like pricing a kitchen remodel before calling a contractor. After you have been running for a while, a reporting tool shows charts of what you actually spent and where, like a bank statement with graphs. And while you are spending, a budget tool watches a limit you set and emails you if you are about to go over it, like a bank text that warns you before your account runs low.",
  "body": [
   "Three tools cover the life cycle of AWS costs: estimating before you build, analyzing what you have spent, and alerting when spending goes off course. The AWS Pricing Calculator, AWS Cost Explorer and AWS Budgets can sound interchangeable, and the exam deliberately offers them as distractors for each other. The way to keep them apart is to ask when the question is set in time: before deployment, after spending, or continuously watching for a threshold.",
   "Estimating comes first. The AWS Pricing Calculator is a free web-based tool for estimating the cost of an architecture before you deploy it. You add services, choose Regions and configurations such as instance types, purchase options, storage amounts and expected data transfer, and it produces monthly and annual estimates that you can group, export and share by link. The public calculator does not need an AWS account and does not look at your actual usage. Use it for planning, budgeting a new project, comparing Regions or purchase options, and building a business case for migration. An estimate is only as good as its assumptions, so it is common to model a low, expected and high case.",
   "Analyzing comes after spending. AWS Cost Explorer analyzes the costs and usage you have already incurred. It shows interactive graphs of spending by service, linked account, Region, cost allocation tag, usage type and more, over daily or monthly periods, with historical data and a forecast of future spend. You use it to answer questions like 'which service caused last month's increase?' or 'what does the marketing team's workload cost?'. A typical investigation sets the date range to the last two months, groups by service to find the jump, then filters on that service and groups by usage type to see whether it was compute hours, storage or data transfer. Cost Explorer also reports Reserved Instance (RI) and Savings Plans utilization and coverage, and offers purchase and rightsizing recommendations.",
   "Alerting watches continuously. AWS Budgets lets you set custom budgets and alerts you when actual or forecasted costs or usage exceed them. You can create cost budgets, usage budgets, and RI or Savings Plans utilization and coverage budgets, with alerts by email or to an Amazon Simple Notification Service (Amazon SNS) topic that can feed chat tools. Budget actions can go further and respond automatically when a threshold is crossed, for example by applying an AWS Identity and Access Management (IAM) policy or a service control policy (SCP) that blocks new resources, or stopping specific Amazon EC2 or Amazon Relational Database Service (Amazon RDS) instances. Actions are optional and must be configured; by default a budget only notifies.",
   "A related tool, AWS Cost Anomaly Detection, found alongside these in the Billing and Cost Management console, uses machine learning to learn your normal spending pattern and alert you to unusual spikes, even ones that stay under a budget. A simple way to remember the set: the Pricing Calculator looks forward before anything exists, Cost Explorer looks backward (and a little forward with forecasts) at what you have spent, Budgets watches spending against a line you draw, and Anomaly Detection watches for anything out of character.",
   "All of these tools live in or alongside the Billing and Cost Management console, and access to them is controlled with IAM permissions, so you can give finance staff cost visibility without infrastructure rights. For filtering by team or project to work in Cost Explorer and Budgets, the relevant tags must be activated as cost allocation tags first.",
   "Consider a worked example. A company plans a new analytics platform, and each tool plays its part in turn. The architect models it in the Pricing Calculator, comparing On-Demand with Savings Plans, and presents the estimate to finance. After launch, a monthly budget with alerts at 80 and 100 percent is created for the project, with an SNS notification to the team channel. In the second month an alert fires on forecasted spend; the team opens Cost Explorer, filters by the project's tag and groups by usage type, and finds that data transfer between Availability Zones is far higher than estimated. It moves the chatty components into one Availability Zone and the forecast returns to normal.",
   "Common mistakes include expecting Cost Explorer to send threshold alerts (Budgets does that); using the Pricing Calculator to understand last month's bill (it only estimates hypothetical configurations); thinking Budgets stops spending automatically by default (alerts are the default; actions must be configured); and forgetting to activate cost allocation tags, without which filtering by team or project in Cost Explorer and Budgets does not work. Another trap is assuming the Pricing Calculator estimate is a guaranteed price; real bills depend on actual usage.",
   "Exam questions usually signal the timeline. 'Estimate the cost of a planned workload', 'before migrating' or 'compare the cost of architectures' is the Pricing Calculator. 'Visualize and analyze past spending', 'identify which service drove costs up' or 'forecast spend based on history' is Cost Explorer. 'Alert me when costs exceed a threshold' or 'notify when forecasted spend will pass a limit' is AWS Budgets. 'Detect unusual spending automatically using machine learning' is Cost Anomaly Detection."
  ],
  "analogy": "Planning a road trip is a good comparison. The Pricing Calculator is the trip planner you use at home to estimate fuel, tolls and hotels before you leave. Cost Explorer is reviewing your card statement afterward to see where the money actually went. AWS Budgets is the fuel gauge warning light that comes on when you cross a level you care about. The analogy stops at budget actions: a warning light cannot take the keys away, but a configured budget action can block new resources or stop instances.",
  "terms": [
   [
    "AWS Pricing Calculator",
    "A free tool for estimating the cost of a planned architecture before deployment."
   ],
   [
    "AWS Cost Explorer",
    "A tool for visualizing and analyzing historical cost and usage, with forecasts and recommendations."
   ],
   [
    "AWS Budgets",
    "A service that tracks cost or usage against thresholds and sends alerts or runs actions."
   ],
   [
    "Budget action",
    "An automatic response, such as applying a restrictive policy or stopping instances, when a budget threshold is crossed."
   ],
   [
    "Forecasted spend",
    "A projection of future costs based on historical usage patterns."
   ],
   [
    "AWS Cost Anomaly Detection",
    "A service that uses machine learning to find unusual spending and alert you."
   ],
   [
    "Usage type",
    "A Cost Explorer dimension that breaks charges into specific kinds of usage, such as instance hours or data transfer."
   ]
  ],
  "example": "A nonprofit has a fixed yearly cloud grant. Before migrating, it estimates its website and donor database in the Pricing Calculator. After moving, it sets a monthly AWS Budget matching the grant with alerts at 50, 80 and 100 percent, and reviews Cost Explorer each month grouped by service. When an alert shows forecasted spend rising, Cost Explorer reveals a forgotten test database, which the team deletes the same day.",
  "mistakes": [
   [
    "Cost Explorer can email me when spending crosses a threshold.",
    "Cost Explorer analyzes and forecasts, but threshold alerts come from AWS Budgets."
   ],
   [
    "The Pricing Calculator explains last month's bill.",
    "The Pricing Calculator estimates hypothetical configurations and does not read your actual usage. Use Cost Explorer for past spending."
   ],
   [
    "AWS Budgets automatically stops spending when you hit the limit.",
    "By default Budgets only sends alerts. Budget actions, such as applying a restrictive policy or stopping instances, must be configured explicitly."
   ],
   [
    "A Pricing Calculator estimate is a guaranteed price.",
    "It is an estimate based on your assumptions. The real bill depends on actual usage, so set a budget to track reality after launch."
   ]
  ],
  "tryit": [
   [
    "Halden Bakery's IT lead has just migrated the ordering website. The owner wants to be warned by email if the month is on track to cost more than the planned amount, ideally before the money is spent, and wants to understand afterward which services cost the most. Which tools should the IT lead set up?",
    "AWS Budgets with an alert on forecasted cost at the planned amount gives the early warning. Cost Explorer, grouped by service, shows afterward which services cost the most. The Pricing Calculator would have been the tool before migration, not now."
   ],
   [
    "An engineer notices costs rose sharply overnight even though they are still well under the monthly budget. Which tool is designed to catch this kind of unusual spike?",
    "AWS Cost Anomaly Detection, which learns normal spending patterns with machine learning and alerts on unusual changes even below budget thresholds."
   ]
  ],
  "tip": "'Estimate cost of a planned workload' is the Pricing Calculator. 'Analyze past spending' is Cost Explorer. 'Alert when costs exceed a threshold' is AWS Budgets. Cost Explorer does not send threshold alerts; Budgets does.",
  "check": [
   [
    "A company wants to estimate monthly costs for an architecture it has not built yet. Which tool?",
    "The AWS Pricing Calculator."
   ],
   [
    "Which tool shows which service caused last month's cost increase?",
    "AWS Cost Explorer, which analyzes historical cost and usage by service and other dimensions."
   ],
   [
    "A manager wants an email when forecasted monthly spend will exceed a set amount. Which service?",
    "AWS Budgets, with an alert on forecasted cost."
   ],
   [
    "Can AWS Budgets do more than send notifications?",
    "Yes. Budget actions can apply IAM or service control policies or stop specific EC2 and RDS instances when a threshold is crossed."
   ],
   [
    "Does the public Pricing Calculator require an AWS account or read your usage?",
    "No. It is a free estimating tool that works on the configurations you enter, not your actual usage."
   ]
  ]
 },
 {
  "t": "Detailed billing data: the Billing and Cost Management console, Cost and Usage Reports and data exports, and cost allocation tags",
  "hook": "The quarterly review at Maplecrest Insurance is two weeks away, and the finance controller, Gloria, has a pointed request: she wants the exact AWS cost of each product team, down to the resource, so she can charge each department's budget. The engineers swear they tag everything with `Project`. Yet when you open the cost reports, the `Project` column is nowhere to be found, and the charts show one big undivided number. Gloria also wants raw line items she can load into her own spreadsheets and dashboards, not just pretty graphs. Where does that level of detail live, and why are the tags invisible?",
  "simple": "Imagine a family that shares one credit card. The monthly statement shows every purchase, but it does not say who bought what. If everyone writes their name on each receipt, someone can later sort the purchases by person. In AWS, tags are those names on the receipts: little labels like 'Project equals Checkout' that you attach to things you create. But AWS only puts a tag on the billing statement after you switch it on in the billing settings. And when you want every single line of the statement, not just a summary chart, AWS can deliver a very detailed file to your own storage so you can sort and add it up however you like.",
  "body": [
   "Summary charts answer many questions, but large organizations need detailed, line-by-line billing data to allocate costs to teams, feed their own reporting tools and reconcile invoices. This topic covers where billing information lives, how to get the most granular data, and how tags turn a long list of charges into something a finance team can understand. The exam focuses on picking the right source of billing data and on the activation step for cost allocation tags.",
   "The AWS Billing and Cost Management console is the central place for billing tasks. There you view current and past bills and invoices, see month-to-date charges by service and Region, manage payment methods, tax settings and billing contacts, open Cost Explorer and Budgets, see Free Tier usage, and set billing preferences such as alerts. Access is controlled with AWS Identity and Access Management (IAM), so you can let a finance user see bills and download invoices without granting access to infrastructure. In AWS Organizations, the management account sees the consolidated bill for all member accounts. The AWS Billing Conductor service can produce customized billing views, for example for resellers who need to present their own rates to customers.",
   "For the most detailed data, AWS Cost and Usage Reports (CUR) deliver comprehensive billing data, down to individual resource IDs, hourly or daily usage, pricing and discounts, as files in an Amazon Simple Storage Service (Amazon S3) bucket you choose. AWS has evolved this into Data Exports, which lets you create exports of cost and usage data, including the CUR 2.0 format, to S3. From there you can query the data with Amazon Athena, load it into Amazon Redshift, or visualize it with Amazon QuickSight or third-party tools. Each row is essentially one charge: which account, which service, which usage type, which resource, how much was used, at what rate, and with which tags. If a question asks for the most granular billing data for custom analysis, the answer is the Cost and Usage Report or data exports, not Cost Explorer, which shows summaries and graphs.",
   "Cost allocation tags make that data meaningful. A tag is a key-value label, such as `Project=Checkout` or `CostCenter=1234`, attached to resources. There are user-defined tags that you create and AWS-generated tags such as `aws:createdBy`. A tag becomes a cost allocation tag only after you activate it in the Billing and Cost Management console, and after activation it appears as a column in cost reports and as a filter and grouping dimension in Cost Explorer and Budgets. It can take some time after activation before the tag shows up in reports. By default tags apply to cost data from activation onward; AWS allows a backfill request for a limited period of earlier months, but you should not rely on tags appearing retroactively, so activate them early.",
   "A consistent tagging strategy is what makes this work. A typical scheme tags every resource with `CostCenter`, `Environment` (for example `production` or `dev`) and `Owner`. Decide a small set of required keys, their exact spelling and allowed values, enforce them with tag policies in AWS Organizations, and use AWS Config rules or infrastructure as code to catch untagged resources. Then finance can see exactly what each team, project or environment costs, a practice called showback (reporting costs to teams) or chargeback (actually billing teams). AWS Cost Categories can group costs into business-friendly buckets using tags and accounts, for example combining several accounts and tags into a single 'Mobile Apps' category.",
   "Consider a worked example. A company asks why its billing reports show no costs for the tag `Project`, even though engineers tag everything. The billing administrator finds the tag was never activated as a cost allocation tag, activates it, and the next reports include it. Finance wants resource-level detail for a quarterly review, so the administrator creates a data export in CUR 2.0 format to S3 and gives analysts Athena access to query it. Meanwhile inconsistent spellings such as `project` and `Project` are fixed with a tag policy, because tag keys are case sensitive and would otherwise split the costs.",
   "Common mistakes include expecting tags to appear in billing reports without activation; confusing Cost Explorer (summaries and graphs) with CUR or data exports (the most detailed line items); inconsistent tag keys that split costs across several spellings; and assuming member accounts in an organization pay separately. Another trap is tagging only some resources: untagged items such as shared NAT gateways or data transfer end up in an unallocated bucket, so decide how shared costs will be split.",
   "On the exam, 'most detailed billing data' or 'line items for custom analysis' means Cost and Usage Reports or data exports; 'view invoices or update the payment method' means the Billing and Cost Management console; 'track costs by department or project' means cost allocation tags; and 'tagged costs missing from reports' means the tags were not activated."
  ],
  "analogy": "A Cost and Usage Report is like a grocery store's itemized receipt that lists every product, price and discount, while Cost Explorer is the pie chart your budgeting app draws from it. Cost allocation tags are the names you write next to each item so the household can split the bill. The analogy stops at activation: in AWS, writing the name is not enough; you must also tell the billing system to read that name, by activating the tag key in the billing console.",
  "terms": [
   [
    "Billing and Cost Management console",
    "The central console for bills, invoices, payments, billing preferences and cost tools."
   ],
   [
    "Cost and Usage Report (CUR)",
    "The most detailed AWS billing data, delivered as files to S3, down to individual resources."
   ],
   [
    "Data Exports",
    "The AWS feature for exporting cost and usage data, including CUR 2.0, to Amazon S3."
   ],
   [
    "Tag",
    "A key-value label attached to an AWS resource for organization, automation or cost tracking."
   ],
   [
    "Cost allocation tag",
    "A tag activated in the billing console so it appears in cost reports and can filter and group costs."
   ],
   [
    "Showback and chargeback",
    "Reporting cloud costs to the teams that caused them (showback) or billing those teams internally (chargeback)."
   ],
   [
    "Tag policy",
    "An AWS Organizations policy that standardizes tag keys and values across accounts."
   ],
   [
    "AWS Cost Categories",
    "A feature that groups costs into business-defined categories using rules based on accounts, tags and other dimensions."
   ]
  ],
  "example": "A university's central IT pays one AWS bill for dozens of research groups. It requires every resource to carry `Grant` and `PI` tags, activates both as cost allocation tags, and enforces spelling with a tag policy. Each month an Athena query over the Cost and Usage Report data export produces a cost statement per grant, which the finance office uses to charge each research grant for exactly what it used.",
  "mistakes": [
   [
    "Tags show up in billing reports as soon as resources are tagged.",
    "A tag key must be activated as a cost allocation tag in the Billing and Cost Management console before it appears in cost reports, Cost Explorer and Budgets."
   ],
   [
    "Cost Explorer is the most detailed source of billing data.",
    "Cost Explorer provides summaries and graphs. Resource-level, hourly line items come from the Cost and Usage Report delivered through Data Exports to S3."
   ],
   [
    "Tags are applied to all past billing data once activated.",
    "By default tags apply from activation onward. A limited backfill can be requested, but you should activate tags early rather than rely on it."
   ],
   [
    "`project` and `Project` will be grouped together automatically.",
    "Tag keys are case sensitive, so inconsistent spellings split costs. Tag policies in AWS Organizations standardize keys and values."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Media's CFO wants each of its five departments charged monthly for its exact AWS usage, and the analytics team wants raw billing rows to load into its own dashboards. Resources are already tagged with `Department`, but the tag does not appear in any cost report. What two steps should the billing administrator take?",
    "First, activate `Department` as a cost allocation tag in the Billing and Cost Management console so it appears in cost data. Second, create a data export (CUR 2.0) to an S3 bucket so analysts can query resource-level line items with Athena or load them into their dashboards. A tag policy would also help keep the key spelled consistently."
   ]
  ],
  "tip": "Tags don't appear in billing reports until they are activated as cost allocation tags in the billing console. For the most granular billing data, choose Cost and Usage Reports or data exports, not Cost Explorer.",
  "check": [
   [
    "Engineers tag resources with Department, but the tag is missing from Cost Explorer. Why?",
    "The tag has not been activated as a cost allocation tag in the Billing and Cost Management console."
   ],
   [
    "Which billing data source provides resource-level line items for custom analysis?",
    "AWS Cost and Usage Reports, now delivered through Data Exports to Amazon S3."
   ],
   [
    "Where would a finance user download an invoice or update the payment method?",
    "In the AWS Billing and Cost Management console."
   ],
   [
    "How can an organization make sure teams use the same tag keys and values?",
    "Use tag policies in AWS Organizations, backed by checks such as AWS Config rules or infrastructure as code."
   ],
   [
    "What is the difference between showback and chargeback?",
    "Showback reports costs to the teams that caused them; chargeback actually bills those teams internally."
   ]
  ]
 },
 {
  "t": "AWS Organizations: consolidated billing, combined volume discounts and shared Reserved Instance and Savings Plans discounts",
  "hook": "Owen has just joined Redwood Craft Group as its first cloud finance analyst, and his inbox holds twelve separate AWS invoices, one per account, paid on four different company credit cards. Two brands each bought Savings Plans that sit half unused at night, while a third brand pays full On-Demand rates for the same kind of compute. Each account's S3 usage is too small to reach the cheaper pricing tiers, even though together they store a lot. And last month a developer in a sandbox account launched expensive instances in a Region nobody uses. Owen suspects one change could fix most of this. What is it, and what does it really combine?",
  "simple": "Picture a big family where each person has their own phone plan and pays their own bill. If they join one family plan, they get one bill, the shared data adds up so the family gets a better rate, and unused minutes from one person can cover another. Each person still has their own phone and their own settings. AWS Organizations is that family plan for AWS accounts. Many accounts are grouped under one main account that pays a single bill. Their usage is added together for volume discounts, and some prepaid discounts can be shared. The main account can also set house rules, like 'nobody uses these expensive services', that every account must follow.",
  "body": [
   "Most organizations end up with many AWS accounts: separate accounts for production and development, for different teams, or for different business units. An account is a strong boundary for security, quotas and billing, so a mistake or breach in one does not automatically spread to others. But dozens of accounts need central management, or each one becomes its own island with its own bill. AWS Organizations provides that central management at no additional charge, and consolidated billing is one of its headline features.",
   "The structure is a simple hierarchy. An organization has one management account (formerly called the master account) that creates the organization, invites existing accounts or creates new member accounts, and pays the bill. Accounts can be grouped into organizational units (OUs), such as Production, Development or Security, forming a tree under the organization root. Policies attached higher in the tree apply to everything beneath it, so you can treat all development accounts the same way with one attachment.",
   "Service control policies (SCPs) are the guardrails. Attached to the root, an OU or an account, they set the maximum permissions available in those accounts. For example, an SCP can stop anyone in development accounts, even administrators, from using Regions outside an approved list or from turning off AWS CloudTrail. SCPs do not grant permissions; they only limit them. A user still needs an AWS Identity and Access Management (IAM) policy that allows an action, and the action must not be denied by any SCP above the account. SCPs also do not restrict the management account itself, which is one reason best practice keeps workloads out of it.",
   "Consolidated billing brings all member accounts' charges into the management account, so the organization receives one bill and makes one payment, while still seeing a breakdown per account in the Billing and Cost Management console, Cost Explorer and the Cost and Usage Report. There is no extra charge for it. Each member account keeps its own resources and permissions; only billing is combined. The management account does not automatically gain access to the data inside member accounts.",
   "Consolidated billing also saves money in two ways. First, some AWS prices are tiered, getting cheaper per unit as usage grows, for example Amazon Simple Storage Service (Amazon S3) storage and data transfer out. The organization is treated as one customer for these volume pricing tiers, so the combined usage of all accounts reaches lower price tiers sooner than each account would alone. Second, Reserved Instance (RI) and Savings Plans discounts can be shared: if one account buys a Savings Plan but does not use all of it in an hour, the unused benefit applies to eligible usage in other accounts. The discount applies first to the account that bought it, sharing is on by default, and the management account can turn off sharing for specific accounts if, for example, a business unit must keep its own discounts.",
   "Organizations works with other services to govern many accounts at once. Tag policies standardize tags, backup policies apply AWS Backup plans, and services such as AWS CloudTrail, AWS Config, Amazon GuardDuty and AWS Security Hub can be enabled organization-wide with a delegated administrator account. AWS Control Tower builds on Organizations to set up a governed multi-account environment, called a landing zone, automatically, with preconfigured guardrails (controls), centralized logging and an account factory for creating new accounts consistently. AWS IAM Identity Center gives people single sign-on access to the accounts they need.",
   "Consider a worked example. A company has twelve AWS accounts, each paying its own bill with its own credit card. Finance struggles to reconcile them, and several accounts pay higher per-gigabyte S3 rates because none alone reaches the lower tiers. The company creates an organization, invites the twelve accounts, and groups them into Production, Development and Sandbox OUs. Consolidated billing produces one invoice, combined S3 usage moves into cheaper tiers, and a Savings Plan bought by the platform account also covers idle hours in other accounts. An SCP on the Sandbox OU denies use of expensive instance families and all Regions except one.",
   "Common mistakes include believing SCPs grant permissions (a user needs both an IAM policy that allows an action and no SCP that denies it); thinking consolidated billing costs extra; assuming it merges resources or gives the management account access to members' data (it combines billing, not resources); forgetting that RI and Savings Plans sharing is on by default and can be turned off; and running workloads in the management account, which best practice keeps for billing and governance only because SCPs cannot restrict it.",
   "On the exam, 'one bill for multiple accounts' and 'combine usage for volume pricing discounts' point to consolidated billing in AWS Organizations. 'Share Reserved Instance or Savings Plans discounts across accounts' also points to Organizations. 'Restrict which services or Regions member accounts can use, even for administrators' points to SCPs. 'Group accounts by function' points to organizational units. 'Automatically set up a secure multi-account environment with guardrails' points to AWS Control Tower."
  ],
  "analogy": "AWS Organizations is like a family mobile plan. One person pays a single bill, the family's combined data reaches cheaper rates, and unused prepaid minutes from one line can cover another. The parent can set restrictions on a child's line, like blocking international calls, much as an SCP blocks Regions. Where the analogy breaks: an SCP restriction applies even to a member account's administrator, and it never grants anything; each line still needs its own IAM permissions to do anything at all.",
  "terms": [
   [
    "AWS Organizations",
    "A free service for centrally managing and governing multiple AWS accounts."
   ],
   [
    "Management account",
    "The account that creates the organization, manages member accounts and pays the consolidated bill."
   ],
   [
    "Organizational unit (OU)",
    "A group of accounts within an organization, used to apply policies together."
   ],
   [
    "Service control policy (SCP)",
    "A policy that sets the maximum permissions for accounts in an organization; it never grants permissions."
   ],
   [
    "Consolidated billing",
    "An Organizations feature that combines all member accounts' charges into one bill paid by the management account."
   ],
   [
    "Volume pricing tiers",
    "Price levels that drop per unit as usage grows, reached sooner when an organization's usage is combined."
   ],
   [
    "Discount sharing",
    "The default behavior in which unused RI and Savings Plans benefits apply to eligible usage in other accounts in the organization."
   ],
   [
    "AWS Control Tower",
    "A service that sets up and governs a multi-account landing zone with guardrails on top of Organizations."
   ]
  ],
  "example": "A retail group owns three brands, each with its own AWS accounts. After joining them into one organization, the group receives a single monthly bill, its combined data transfer reaches cheaper pricing tiers, and a Compute Savings Plan bought centrally is applied wherever instances run. An SCP on every brand's OU prevents anyone from disabling CloudTrail, so the security team keeps a complete audit trail across all accounts.",
  "mistakes": [
   [
    "An SCP that allows EC2 gives users in the account permission to use EC2.",
    "SCPs never grant permissions; they set the maximum. Users also need an IAM policy that allows the action, and no SCP may deny it."
   ],
   [
    "Consolidated billing is a paid add-on.",
    "Consolidated billing is included with AWS Organizations at no additional charge."
   ],
   [
    "Consolidated billing merges the accounts' resources and gives the management account access to their data.",
    "Only billing is combined. Each member account keeps its own resources, permissions and data boundaries."
   ],
   [
    "SCPs can be used to lock down the management account.",
    "SCPs do not affect the management account, which is why best practice keeps workloads out of it and uses it only for billing and governance."
   ]
  ],
  "tryit": [
   [
    "Bluefin Software has three accounts: Production bought a Savings Plan that is only partly used overnight, while Analytics runs nightly batch jobs at On-Demand rates in a separate account. All three accounts pay separate bills. The CFO asks how to use the idle discount without buying more. What should the company do?",
    "Create an AWS Organization, invite the three accounts and use consolidated billing. Savings Plans discounts are shared across accounts by default, so unused hourly benefit from Production applies to eligible usage in Analytics, and the company receives one bill with combined volume pricing."
   ],
   [
    "A security lead wants to guarantee that no one in any development account, including administrators, can disable CloudTrail. What should be used?",
    "A service control policy attached to the Development OU that denies the CloudTrail actions that stop or delete trails. SCPs limit permissions even for administrators in member accounts."
   ]
  ],
  "tip": "SCPs never grant permissions; they only set guardrails. A user needs both an IAM policy allowing the action and no SCP blocking it. 'One bill' and 'shared volume discounts' mean consolidated billing.",
  "check": [
   [
    "How does consolidated billing lower costs beyond simplifying payment?",
    "Usage across accounts is combined for volume pricing tiers, and RI and Savings Plans discounts can be shared across accounts."
   ],
   [
    "An administrator in a member account has full IAM permissions but cannot launch resources in a certain Region. What is the likely cause?",
    "A service control policy denies that Region; SCPs limit permissions even for administrators."
   ],
   [
    "Does consolidated billing cost extra?",
    "No. Consolidated billing is included with AWS Organizations at no additional charge."
   ],
   [
    "Which service automatically sets up a governed multi-account landing zone?",
    "AWS Control Tower, which builds on AWS Organizations."
   ],
   [
    "Can the management account stop a business unit's account from receiving shared RI and Savings Plans discounts?",
    "Yes. Sharing is on by default, but the management account can turn it off for specific accounts."
   ]
  ]
 },
 {
  "t": "Cost optimization tools: AWS Trusted Advisor, AWS Compute Optimizer and rightsizing recommendations",
  "hook": "At Willowbank Software, the EC2 line on the bill has crept up every month for a year, and the CTO, Nadia, has asked you to cut it by a fifth without slowing anything down. Nobody remembers why the staging servers are the same size as production, or who launched the load balancers named 'test-old'. A colleague wants to buy a three-year Savings Plan right away to lock in a discount. Another says to just shrink everything by half. You know AWS has tools that look at real usage and suggest changes, but which tool says what, and in what order should you act?",
  "simple": "Imagine you are paying for a huge moving truck every day, but you only ever carry a few boxes. A smaller van would do the job for much less. AWS has tools that watch how hard your computers actually work and tell you when something is too big, sitting idle, or forgotten. One tool runs a broad checkup of your whole account, like a doctor's annual physical, covering costs, security and more. Another studies the past usage of your servers in detail and suggests a better size, like a tailor measuring you for a suit. The tools only make suggestions; a person decides what to change. And it is smart to resize first before signing any long-term discount deal.",
  "body": [
   "Knowing what you spend is only the start; the next step is spending less without hurting performance. Most waste in AWS comes from resources that are bigger than they need to be, resources nobody uses any more, and steady workloads still paying On-Demand rates. AWS provides tools that analyze your account and point to specific savings. The exam tests which tool gives which kind of advice, and the idea of rightsizing: matching resource types and sizes to actual workload needs at the lowest cost.",
   "The broadest tool is AWS Trusted Advisor. It inspects your AWS environment and makes recommendations in several categories: cost optimization, performance, security, fault tolerance, service limits (quotas) and operational excellence. Cost optimization checks look for low-utilization EC2 instances, idle load balancers, underutilized Amazon Elastic Block Store (Amazon EBS) volumes, unassociated Elastic IP addresses, idle Amazon Relational Database Service (Amazon RDS) instances, and opportunities to buy Reserved Instances (RIs) or Savings Plans. Each check is shown as green (no problem detected), yellow (investigation recommended) or red (action recommended), along with the affected resources and estimated monthly savings. All customers get a core set of checks, mainly security checks such as S3 bucket permissions and multi-factor authentication (MFA) on the root account, plus service quotas; the full set, including cost optimization, requires a Business Support plan or higher.",
   "The most detailed sizing advice comes from AWS Compute Optimizer, which uses machine learning (ML) to analyze the historical utilization metrics of your resources and recommend optimal configurations. It covers EC2 instances, EC2 Auto Scaling groups, EBS volumes, AWS Lambda functions, Amazon Elastic Container Service (Amazon ECS) services on AWS Fargate, and some Amazon RDS databases and commercial software licenses. For each resource it reports whether it is over-provisioned, under-provisioned or optimized, and suggests better instance types or sizes with estimated savings and a performance risk rating. You opt in first, and it needs some history of metrics before it can recommend changes; memory-based recommendations are more accurate when memory metrics are collected by an agent, because EC2 does not report memory use by default.",
   "Rightsizing recommendations are also available in AWS Cost Explorer, which identifies idle and underused EC2 instances and suggests downsizing or terminating them, showing estimated monthly savings. Cost Explorer also recommends Savings Plans and Reserved Instance purchases based on your usage history. AWS Cost Optimization Hub brings recommendations from several of these sources together in one place, deduplicates them and ranks them by estimated savings, which helps a team decide where to start. None of these tools changes your resources on its own; they report findings, and you decide which to apply after checking the application's real requirements, such as peak season load or memory needs that metrics may not fully capture.",
   "Tools only suggest; people act, and the order matters. A good routine is to review recommendations monthly, stop or delete idle resources, rightsize next so you do not commit to capacity you do not need, then cover the remaining steady usage with Savings Plans or Reserved Instances, and finally schedule non-production resources to stop outside working hours, for example with AWS Systems Manager or the Instance Scheduler solution. Changing an instance type usually needs a brief stop and start, so rightsizing is scheduled like any other change. Measure again afterward: if performance suffers, move one size up, which is easy in the cloud because you are never locked into hardware you bought.",
   "Consider a worked example. A company's monthly EC2 bill keeps rising. Trusted Advisor, available in full because the company has Business Support, flags twenty low-utilization instances and fifteen unassociated Elastic IP addresses. Compute Optimizer shows that the main application servers average under ten percent CPU and memory and recommends a smaller size in a newer generation with low performance risk. The team releases the Elastic IPs, deletes idle test servers, rightsizes the application tier in the next maintenance window, and then buys a Savings Plan sized to the new, smaller baseline instead of the old oversized one.",
   "Common mistakes include buying Savings Plans or RIs before rightsizing, locking in a discount on waste; expecting Compute Optimizer to cover every service or to change resources automatically; assuming Basic Support customers see all Trusted Advisor cost checks; and confusing Trusted Advisor, which checks many categories across the account, with AWS Config, which records configuration changes and evaluates compliance rules. Another trap is thinking a yellow check is an error; it means investigation is recommended.",
   "On the exam, 'best practice checks across cost, security, performance, fault tolerance and service quotas' points to Trusted Advisor. 'Machine learning recommendations for the optimal EC2 instance type or size based on utilization' points to Compute Optimizer. 'Identify idle or underused instances in the billing tools' points to Cost Explorer rightsizing recommendations. 'Single place to view and prioritize cost-saving recommendations' points to Cost Optimization Hub. 'Full Trusted Advisor checks' requires at least Business Support."
  ],
  "analogy": "Trusted Advisor is like a home inspector who walks through the whole house and flags a leaky faucet, an unlocked window, a fuse box near capacity and a room you heat but never use. Compute Optimizer is like an energy auditor who studies a year of your utility data and tells you exactly which appliance is oversized for what you actually use. Neither one fixes anything; you still call the plumber. The analogy stops at access: the home inspector's full report on costs is only available on the Business Support plan or higher.",
  "terms": [
   [
    "AWS Trusted Advisor",
    "A service that checks your account against best practices in cost, performance, security, fault tolerance, quotas and operational excellence."
   ],
   [
    "AWS Compute Optimizer",
    "A service that uses ML on utilization history to recommend optimal sizes for EC2, EBS, Lambda and other resources."
   ],
   [
    "Rightsizing",
    "Matching resource types and sizes to actual workload requirements at the lowest cost."
   ],
   [
    "Over-provisioned",
    "A resource larger than its workload needs, wasting money."
   ],
   [
    "Under-provisioned",
    "A resource too small for its workload, risking poor performance."
   ],
   [
    "AWS Cost Optimization Hub",
    "A console feature that consolidates and ranks cost-saving recommendations from several AWS tools."
   ],
   [
    "Performance risk",
    "A Compute Optimizer rating of how likely a recommended configuration is to fall short of the workload's needs."
   ]
  ],
  "example": "A software company's staging environment runs 24 hours a day on large instances copied from production. Compute Optimizer shows the staging servers are heavily over-provisioned, and Trusted Advisor lists several idle load balancers from finished projects. The team deletes the idle load balancers, moves staging to smaller instances, and uses a scheduler to stop staging at night and on weekends, cutting its staging cost by more than half without affecting developers.",
  "mistakes": [
   [
    "Buy Savings Plans first, then rightsize.",
    "Rightsize first. Committing before rightsizing locks a discount onto oversized capacity you then keep paying for."
   ],
   [
    "Compute Optimizer automatically resizes instances for you.",
    "Compute Optimizer only recommends. People review the findings and apply changes, usually in a maintenance window."
   ],
   [
    "Every Support plan gets all Trusted Advisor cost optimization checks.",
    "Basic and Developer get core security checks and service quotas. The full set, including cost optimization checks, requires Business Support or higher."
   ],
   [
    "Trusted Advisor and AWS Config do the same job.",
    "Trusted Advisor checks the account against best practices in several categories. AWS Config records resource configuration history and evaluates compliance rules."
   ]
  ],
  "tryit": [
   [
    "Granite Freight is on Business Support. Its operations lead wants one broad report of idle resources, security gaps and quota limits across the account, and its platform engineer wants instance-by-instance size recommendations based on the last few weeks of CPU and memory use. Which tool fits each person?",
    "The operations lead should use Trusted Advisor, which checks cost, security, performance, fault tolerance, service quotas and operational excellence, with full checks available on Business Support. The platform engineer should use Compute Optimizer, which applies ML to utilization history to recommend instance types and sizes with a performance risk rating."
   ],
   [
    "A team's application servers average 8 percent CPU all year, and finance wants to buy a three-year commitment for them next week. What should happen first?",
    "Rightsize the servers based on Compute Optimizer or Cost Explorer recommendations, verify performance, and only then size the Savings Plan or RIs to the new, smaller baseline."
   ]
  ],
  "tip": "Trusted Advisor covers many categories across the account; Compute Optimizer focuses on rightsizing compute and related resources using ML. The full set of Trusted Advisor checks needs Business Support or higher.",
  "check": [
   [
    "Which service uses machine learning to recommend a better EC2 instance size based on past utilization?",
    "AWS Compute Optimizer."
   ],
   [
    "What categories does Trusted Advisor check?",
    "Cost optimization, performance, security, fault tolerance, service limits (quotas) and operational excellence."
   ],
   [
    "Why should you rightsize before buying Savings Plans?",
    "So the commitment matches the capacity you actually need rather than locking in a discount on oversized resources."
   ],
   [
    "A Basic Support customer cannot see Trusted Advisor's cost optimization checks. Why?",
    "The full set of checks requires a Business Support plan or higher; Basic gets only core checks."
   ],
   [
    "What does a yellow Trusted Advisor check mean?",
    "Investigation is recommended; it is a warning, not necessarily an error. Red means action is recommended."
   ]
  ]
 },
 {
  "t": "AWS Support plans and what each includes, including Technical Account Managers and AWS Health",
  "hook": "It is 9:40 on a Saturday night when the production database at Tidewater Tickets starts timing out, and concert sales open in two hours. Leila, the lead engineer, opens the AWS console to call for help and discovers the company is still on the Support plan it picked during early testing: technical help by email, during business hours. There is no phone number to call tonight. The next morning the CEO asks two questions: which plan would have helped, and what is the least the company can pay to never be in this spot again? Which plan answers both?",
  "simple": "AWS Support plans are like levels of roadside assistance for a car. The free level gives you the manual and a help line for billing questions, but no mechanic. A low-cost level lets you email a mechanic during office hours, which is fine while you are just testing. The middle level gives you a mechanic by phone any time of day or night, and a full checkup of your car. The top levels add a dedicated advisor who knows your car and helps you plan long trips. Separately, AWS has a free dashboard that tells you when something on AWS's side is affecting the specific things you run, like a road closure notice for your exact route.",
  "body": [
   "AWS offers tiered Support plans, from free to enterprise-grade. What changes as you move up is who you can contact, how fast they respond, and how much proactive guidance you get. The plan lineup has been evolving, so confirm current names, features and prices on the AWS Support plans page before the exam (paid plans are generally priced as a percentage of monthly AWS spend with a minimum), but the concepts below reflect the plans the exam guide was written against: Basic, Developer, Business, Enterprise On-Ramp and Enterprise.",
   "Basic Support is included free for all accounts. It provides customer service for account and billing questions, access to documentation, whitepapers, AWS re:Post and the Knowledge Center, the core AWS Trusted Advisor checks and the AWS Health Dashboard. It does not include technical support cases, so if a server misbehaves you are relying on documentation and the community. Developer Support adds business-hours email access to technical support engineers, typically for one primary contact, with general guidance response times measured in business hours, suited to experimenting and testing rather than production. Developer Support also gives general architectural guidance on best practices, but not a person who knows your environment or phone access at weekends.",
   "Business Support is the first plan aimed at production workloads. It adds 24/7 phone, email and chat access to technical support for multiple contacts, response within an hour for a production system that is down, the full set of Trusted Advisor checks, programmatic access to AWS Health and Support through application programming interfaces (APIs), and help with common third-party software running on AWS. For many exam questions, Business is 'the minimum plan' that provides round-the-clock technical support and full Trusted Advisor. If a question describes a production workload, a need for phone support at any hour, and asks for the lowest-cost option, Business is usually the answer.",
   "The enterprise tiers add proactive guidance. Enterprise On-Ramp is for customers starting their business-critical journey: it adds access to a pool of Technical Account Managers (TAMs), faster response for business-critical outages (within 30 minutes) and some proactive reviews. Enterprise Support provides a designated TAM, a named technical point of contact who knows your environment, gives proactive architecture and operational guidance, and coordinates access to AWS experts. It has the fastest response target for business-critical outages (within 15 minutes), a Concierge Support team for billing and account questions, and programs such as Infrastructure Event Management for planned launches and migrations.",
   "AWS Health provides information about events that can affect your AWS resources. The AWS Health Dashboard shows general service health for everyone and a personalized account view: scheduled maintenance, service issues affecting your resources, and account notifications such as expiring certificates, with guidance for remediation. It is available to all customers, and you can send its events to Amazon EventBridge to automate responses, for example notifying a team channel or starting a runbook. Because it is personalized to the resources you actually use, it is more useful than a generic public status page. Organizations can also see a combined view of Health events across all member accounts.",
   "It helps to keep Health and Trusted Advisor apart, since both appear in every plan in some form. Trusted Advisor looks at your configuration and says what you could improve. AWS Health looks at AWS's side and tells you what is happening that affects you, such as an instance scheduled for retirement on underlying hardware.",
   "Consider a worked example. A startup on Developer Support launches its product and soon has paying customers. One Saturday its production database misbehaves, but Developer only offers business-hours email support. After this, it upgrades to Business Support for 24/7 phone and chat and fast production-down response, and starts acting on the full Trusted Advisor checks. Two years later, as a major bank's supplier, it moves to Enterprise Support for a designated TAM who reviews its architecture before each big launch. Throughout, the team routes AWS Health events to EventBridge so it hears about scheduled maintenance early.",
   "Common mistakes include thinking Basic Support includes technical cases; assuming Developer Support offers 24/7 phone support; mixing up 'pool of TAMs' (Enterprise On-Ramp) with 'designated TAM' (Enterprise); thinking AWS Health is a paid feature; and confusing Trusted Advisor, which checks your configuration against best practices, with AWS Health, which reports AWS events that affect you. Another trap is choosing Enterprise when the question asks for the lowest-cost plan meeting a simpler need such as 24/7 technical support.",
   "On the exam, 'designated Technical Account Manager' means Enterprise Support, and 'pool of TAMs' means Enterprise On-Ramp. 'Fastest response for business-critical systems' or 'concierge billing support' points to Enterprise. 'Minimum plan with 24/7 phone support and all Trusted Advisor checks' is Business. 'Business-hours email technical support for testing' is Developer. 'Free, no technical support cases' is Basic. 'Personalized view of AWS events affecting my resources' is the AWS Health Dashboard."
  ],
  "analogy": "Support plans resemble levels of medical care. Basic is a health information website and the billing office. Developer is emailing a nurse line during office hours. Business is an urgent care clinic open day and night. Enterprise On-Ramp is a clinic where any doctor in a small team can see you, and Enterprise is having your own family doctor who knows your history and plans checkups ahead of big events. The analogy falls short on AWS Health, which is free for everyone, like a public alert service tailored to your own address.",
  "mnemonic": "Plans from lowest to highest: 'Big Dogs Bark Every Evening' for Basic, Developer, Business, Enterprise On-Ramp, Enterprise. Business, the third dog, is the first to bark all night: 24/7 phone support.",
  "terms": [
   [
    "Basic Support",
    "The free plan with billing and account support, documentation, core Trusted Advisor checks and AWS Health, but no technical cases."
   ],
   [
    "Developer Support",
    "A plan with business-hours email access to technical support for testing and early development."
   ],
   [
    "Business Support",
    "A plan with 24/7 technical support by phone, email and chat, fast production response and full Trusted Advisor checks."
   ],
   [
    "Enterprise On-Ramp",
    "A plan with a pool of Technical Account Managers and faster response for business-critical workloads."
   ],
   [
    "Enterprise Support",
    "The top plan with a designated TAM, the fastest critical response, concierge support and proactive programs."
   ],
   [
    "Technical Account Manager (TAM)",
    "An AWS technical contact who provides proactive guidance and advocacy for a customer."
   ],
   [
    "AWS Health Dashboard",
    "A personalized view of AWS events, maintenance and issues affecting your resources, free for all customers."
   ],
   [
    "Infrastructure Event Management",
    "An Enterprise program in which AWS helps plan and support major launches, migrations and events."
   ]
  ],
  "example": "An online retailer plans a major sales event and worries about capacity. Because it has Enterprise Support, its designated TAM arranges Infrastructure Event Management: AWS engineers review the architecture, confirm service quotas are raised in advance, and stand by during the event. When a brief issue affects one Availability Zone during the sale, the AWS Health Dashboard shows exactly which resources are affected, and an EventBridge rule alerts the operations channel immediately.",
  "mistakes": [
   [
    "Basic Support lets you open technical support cases.",
    "Basic covers account and billing support, documentation, re:Post, core Trusted Advisor checks and AWS Health. Technical cases start with Developer."
   ],
   [
    "Developer Support includes 24/7 phone support.",
    "Developer offers business-hours email access to technical support. 24/7 phone, email and chat starts with Business."
   ],
   [
    "Enterprise On-Ramp includes a designated TAM.",
    "Enterprise On-Ramp provides access to a pool of TAMs. A designated, named TAM is an Enterprise Support feature."
   ],
   [
    "AWS Health and Trusted Advisor are the same thing.",
    "AWS Health reports AWS events affecting your resources. Trusted Advisor checks your configuration against best practices."
   ]
  ],
  "tryit": [
   [
    "Saltmarsh Games runs a production multiplayer service and needs to reach AWS technical support by phone at any hour. It also wants the full Trusted Advisor checks. Budget is tight, and it has no need for a dedicated technical contact. Which plan should it choose?",
    "Business Support. It is the lowest-cost plan with 24/7 phone, email and chat technical support and the full set of Trusted Advisor checks. Enterprise On-Ramp and Enterprise add TAM access and faster critical response that the company does not need."
   ],
   [
    "A company wants to be alerted automatically in its team chat whenever AWS schedules maintenance on hardware hosting its instances. What should it use?",
    "AWS Health, which shows scheduled maintenance affecting its resources, with an EventBridge rule that sends Health events to a notification target such as an SNS topic connected to chat."
   ]
  ],
  "tip": "'Designated Technical Account Manager' means Enterprise Support; 'pool of TAMs' means Enterprise On-Ramp. The minimum plan with 24/7 phone support and all Trusted Advisor checks is Business.",
  "check": [
   [
    "Which is the least expensive Support plan offering 24/7 phone access to technical support?",
    "Business Support."
   ],
   [
    "A company wants a named AWS technical contact who proactively reviews its architecture. Which plan?",
    "Enterprise Support, which includes a designated Technical Account Manager."
   ],
   [
    "Does Basic Support include opening technical support cases?",
    "No. Basic covers account and billing support, documentation, core Trusted Advisor checks and AWS Health only."
   ],
   [
    "What does the AWS Health Dashboard show that a public status page does not?",
    "A personalized view of events, maintenance and issues affecting your own AWS resources, with remediation guidance."
   ],
   [
    "Which plan includes Concierge Support for billing and account questions?",
    "Enterprise Support."
   ]
  ]
 },
 {
  "t": "Help and partner resources: AWS re:Post, Knowledge Center, AWS Marketplace, AWS Partner Network, AWS Professional Services and the AWS Trust & Safety team",
  "hook": "It is Wednesday at Brightwater Dental Group, and Sam, the one-person IT team, has a crowded to-do list. A database migration step keeps failing with an error he cannot find in the documentation. The office manager wants a backup product that can be paid for on the existing AWS bill instead of signing yet another vendor contract. The owners are asking whether they should hire outside experts for the bigger move to the cloud. And this morning the firewall logs show repeated login attempts coming from an IP address that belongs to AWS. Four different problems, all of them some kind of 'help'. Where should each one go?",
  "simple": "AWS has several places to get help, and each is for a different kind of problem. There is a free public forum where anyone can ask questions and other people, including AWS experts, answer, like a community help board. There is a library of short articles answering the questions people ask most often. There is an online store for software made by other companies, which you can pay for on your AWS bill. There is a directory of outside companies that are trained to help with AWS projects, and AWS also has its own team of consultants for big projects. Finally, if something running on AWS is attacking you or sending spam, there is a special team you report it to.",
  "body": [
   "Beyond Support plans, AWS has a set of resources for learning, buying software, getting expert help and reporting problems. They are easy to confuse because several involve 'help', but each fits a different need: community answers, curated troubleshooting articles, third-party products, outside consultants, AWS's own consultants, and a team that handles abuse. The exam checks that you can pick the right one from a short scenario.",
   "Self-service help starts with the community. AWS re:Post is a community-driven question-and-answer service. You can ask technical questions, browse answers from the community and AWS experts, and read curated articles; accepted answers from AWS-verified experts are marked. It is available to everyone with no Support plan required. The AWS Knowledge Center, now hosted on re:Post, contains articles and videos answering the questions AWS Support receives most often, such as how to recover access to an instance or why a bucket policy denies access. Documentation, whitepapers, AWS Prescriptive Guidance and training through AWS Skill Builder round out the self-service resources. None of these is a place to open a support case; cases go through AWS Support under your plan.",
   "Buying software is the job of AWS Marketplace, a curated digital catalog where you find, buy, deploy and manage third-party software, data and services that run on AWS: security tools, databases, business applications, machine learning models and more. Listings may be Amazon Machine Images (AMIs), containers, software as a service (SaaS) subscriptions or professional services. Many offer free trials, hourly or annual pricing and bring-your-own-license options, and charges appear on your AWS bill, which simplifies procurement because the organization does not need a new vendor contract for each tool. Private offers let a buyer negotiate custom terms with a seller.",
   "Outside expertise comes from the AWS Partner Network (APN), a global community of companies that build solutions and services on AWS. Consulting partners (services partners) help customers design, migrate, build and manage workloads; technology partners (software partners) offer products that integrate with AWS, often sold through Marketplace. Partners earn AWS competencies and specializations to show validated expertise in areas such as migration, security or data analytics, which helps customers choose a qualified firm.",
   "AWS's own experts are a separate option. AWS Professional Services is AWS's own global team of experts who work with customers, often alongside partners, on large projects to achieve specific business outcomes. AWS Solutions Architects also give customers architectural guidance, and AWS Training and Certification helps teams build their own skills. The exam distinction is ownership: APN partners are independent companies, while Professional Services is part of AWS.",
   "Reporting abuse goes to the AWS Trust & Safety team, which handles reports of abuse involving AWS resources, such as spam, port scanning, denial of service (DoS) attacks, intrusion attempts, malware distribution, phishing websites and hosting objectionable content. If you believe an AWS resource is being used for abuse, you report it to Trust & Safety through the abuse reporting form, including evidence such as logs with timestamps and source IP addresses. AWS may also contact you through Trust & Safety if your own resources appear to be involved, for example an instance compromised and sending spam, and you are expected to respond and fix the issue. It is not a support channel for problems with your own account; those go to AWS Support.",
   "Consider a worked example. A mid-sized company's migration team starts by reading AWS Prescriptive Guidance and asking a question on re:Post about a database migration error, which a Knowledge Center article resolves. It buys a backup product through AWS Marketplace so the cost lands on the AWS bill. Because it lacks in-house experience, it hires an APN consulting partner with the migration competency, and AWS Professional Services joins for the largest application. Months later, its web server logs show repeated attacks from an EC2 IP address, so the security team reports it to AWS Trust & Safety with the relevant log excerpts.",
   "Common mistakes include sending abuse reports to AWS Support, AWS Shield or Amazon GuardDuty instead of Trust & Safety; assuming re:Post requires a paid plan; thinking Marketplace sells only AWS services; confusing APN partners, which are independent companies, with AWS Professional Services, which is part of AWS; and treating the Knowledge Center as a place to open cases. Another trap is looking for AWS compliance reports in Marketplace; those come from AWS Artifact.",
   "On the exam, clue words map directly. 'Community answers' or 'ask a question publicly' means re:Post. 'Articles on the most common support questions' means the Knowledge Center. 'Buy third-party software billed through AWS' means Marketplace. 'Outside experts' or 'certified consulting firm' means APN partners. 'AWS's own consultants for a large engagement' means AWS Professional Services. 'Report spam, phishing or attacks coming from AWS resources' means the AWS Trust & Safety team."
  ],
  "analogy": "Think of a large shopping mall. re:Post is the community bulletin board where shoppers and staff answer each other's questions, and the Knowledge Center is the stack of FAQ leaflets at the information desk. Marketplace is the mall's stores run by other companies, all paid through one mall card. APN partners are certified contractors listed in the mall directory, while Professional Services is the mall's own renovation crew. Trust & Safety is mall security: you report a troublemaker to them, not to the information desk.",
  "terms": [
   [
    "AWS re:Post",
    "AWS's free community question-and-answer site with answers from customers and AWS experts."
   ],
   [
    "AWS Knowledge Center",
    "Articles and videos, hosted on re:Post, answering the most common AWS Support questions."
   ],
   [
    "AWS Marketplace",
    "A curated catalog of third-party software, data and services that can be purchased and billed through AWS."
   ],
   [
    "AWS Partner Network (APN)",
    "The global program of consulting and technology partners that build on AWS."
   ],
   [
    "AWS competency",
    "A designation showing an APN partner has validated expertise in an area such as migration or security."
   ],
   [
    "AWS Professional Services",
    "AWS's own team of consultants that helps customers with large projects and business outcomes."
   ],
   [
    "AWS Trust & Safety team",
    "The AWS team that investigates reports of abuse involving AWS resources."
   ],
   [
    "AWS Prescriptive Guidance",
    "AWS-published strategies, guides and patterns for migrating and running workloads."
   ]
  ],
  "example": "A small online shop notices thousands of phishing emails linking to a fake login page, and the page's IP address belongs to AWS. Rather than opening a support case about its own account, the shop reports the page to the AWS Trust & Safety team through the abuse form with copies of the emails and timestamps. Trust & Safety investigates and works with the resource owner to have the page removed.",
  "mistakes": [
   [
    "Report attacks coming from an AWS IP address to AWS Support or GuardDuty.",
    "Abuse involving AWS resources, such as spam, phishing or attacks, is reported to the AWS Trust & Safety team through the abuse form. GuardDuty detects threats in your own account; it does not take reports."
   ],
   [
    "re:Post is only for customers with a paid Support plan.",
    "re:Post is free and open to everyone, with no Support plan required."
   ],
   [
    "APN partners and AWS Professional Services are the same thing.",
    "APN partners are independent companies. AWS Professional Services is AWS's own consulting team, which often works alongside partners."
   ],
   [
    "AWS Marketplace sells AWS's own services.",
    "Marketplace is a catalog of third-party software, data and services that run on AWS, with charges appearing on your AWS bill."
   ]
  ],
  "tryit": [
   [
    "Oakridge Library's small IT team wants to buy a third-party web application firewall rule set and a log analysis tool, but procurement rules make signing new vendor contracts slow. The team also wants an outside firm with proven AWS security expertise to review its setup. Which AWS resources should it use?",
    "Buy the tools through AWS Marketplace so the charges appear on the existing AWS bill and avoid separate vendor contracts. For the review, look for an AWS Partner Network consulting partner with a security competency."
   ],
   [
    "An engineer at a hospital sees a phishing website hosted at an IP address owned by AWS that imitates the hospital's patient portal. Whom should the hospital contact, and what should it include?",
    "The AWS Trust & Safety team, through the abuse reporting form, including evidence such as the URL, the phishing emails, timestamps and IP addresses."
   ]
  ],
  "tip": "Reporting abuse coming from AWS resources, such as spam, phishing or attacks, always goes to the AWS Trust & Safety team, not to AWS Support, AWS Shield or GuardDuty.",
  "check": [
   [
    "Where can anyone ask a technical AWS question and get answers from the community without a Support plan?",
    "AWS re:Post."
   ],
   [
    "A company wants to hire an outside firm with validated AWS migration expertise. What should it look for?",
    "An AWS Partner Network consulting partner with the relevant competency, such as migration."
   ],
   [
    "You receive attack traffic from an IP address owned by AWS. Whom do you contact?",
    "The AWS Trust & Safety team, through the abuse reporting form."
   ],
   [
    "What is the difference between APN partners and AWS Professional Services?",
    "APN partners are independent companies; AWS Professional Services is AWS's own team of consultants."
   ],
   [
    "Why might an organization buy third-party software through AWS Marketplace?",
    "Charges appear on the AWS bill, which simplifies procurement and avoids a separate vendor contract for each tool."
   ]
  ]
 }
], {"reviewed":"2026-10-06"});
