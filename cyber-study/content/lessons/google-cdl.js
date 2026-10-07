/* Lessons for Google Cloud Certified Cloud Digital Leader: one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("google-cdl", [
 {
  "t": "What cloud computing is and why it drives digital transformation",
  "hook": "Monday morning at Larkspur Outfitters, a regional chain of outdoor stores, the chief executive opens the leadership meeting with a slide that says only: 'We are moving to the cloud.' Priya from merchandising leans over and whispers, 'So the servers go somewhere else. How does that help me sell more tents?' Across the table, the finance director wants to know whether this is a cost project or a growth project, and the head of IT is already worried about a two-year migration plan. Everyone is using the same word and imagining something different. What actually is cloud computing, and when does it change the business rather than just the address of the servers?",
  "simple": "Cloud computing means renting computing power, storage and software from a large provider over the internet instead of buying and running your own machines. You switch things on when you need them and pay only for what you use, a bit like paying for electricity by the meter instead of building your own power plant. Digital transformation is something bigger: it is when a business uses technology like this to work in a new way. For example, a pizza shop that moves its order book onto a rented computer has only changed where the book is kept. A pizza shop that uses the cloud to launch online ordering, track deliveries live and learn which toppings sell best on rainy days has transformed how it serves customers.",
  "body": [
   "Cloud computing is the on-demand delivery of computing resources, such as servers, storage, databases, networking, analytics and artificial intelligence (AI), over the internet, with pay-as-you-go pricing. Instead of buying and running hardware in your own building, you rent capacity from a provider such as Google Cloud and use it through a web console, a command-line tool or an application programming interface (API). The provider owns the data centers; you decide what to run and how much of it. In everyday terms, the cloud turns computing into something closer to a utility: you connect, use what you need and pay for what flows through the meter, rather than building and maintaining the power station yourself.",
   "The widely used definition from the US National Institute of Standards and Technology (NIST) lists five characteristics. On-demand self-service means you can create resources yourself in minutes without asking anyone. Broad network access means you reach them over the network from many kinds of device. Resource pooling means the provider shares large pools of hardware across many customers. Rapid elasticity means capacity can grow and shrink quickly with demand. Measured service means usage is metered, so you pay for what you use. Each characteristic has a business consequence. Self-service removes the procurement queue. Broad network access supports remote staff, mobile apps and partners. Pooling gives the provider economies of scale that lower unit prices. Elasticity lets capacity follow demand instead of a forecast. Metering turns IT into a variable cost that can be traced to a product, team or customer.",
   "To see what this looks like in practice, picture a developer at a retailer who needs a test database. In a traditional setup she files a ticket, waits for a purchase order, then waits again while hardware arrives and is racked, cabled and configured. With Google Cloud she opens the console, picks a managed database, chooses a region and a size, and has a working instance in minutes. The cost of that database appears in the billing reports, broken down by project, and when the test is over she deletes it and the charges stop. Nothing about her idea changed, but the time and cost of trying it dropped sharply.",
   "Digital transformation is a broader idea. It means an organization uses new digital technology to change how it works, how it serves customers and how it creates value. Moving servers to someone else's data center is not transformation by itself. Transformation is when a bank launches a new mobile feature in weeks instead of a year, a retailer personalizes offers from real-time data, or a hospital uses AI to reduce paperwork for nurses. A useful test is to ask what is different for customers or employees after the change. If the honest answer is nothing except the location of the servers, the organization has migrated but has not yet transformed.",
   "The cloud drives this change because it removes many of the old limits. Teams no longer wait months for hardware, so they can experiment cheaply and drop ideas that fail. Managed services for data, AI and security give small teams capabilities that used to need large specialist groups. Global infrastructure lets a company reach customers in new countries without building data centers there. Google describes this combination of infrastructure, data, AI and collaboration tools as helping organizations become more agile and data-driven.",
   "Google Cloud frames its value around a few themes that recur throughout the exam. Modern infrastructure that is secure, reliable and global lets applications run close to users. Data and analytics turn scattered information into insight. AI and machine learning automate routine work and make predictions. Collaboration tools such as Google Workspace help people work together in real time. Running through all of these are openness, so customers can use open source and work across more than one environment, and sustainability, because large, efficient data centers can lower the energy footprint compared with many small server rooms.",
   "Transformation also changes risk and responsibility. Moving to the cloud does not hand every duty to the provider, it changes the skills teams need, and it requires cost discipline because pay-as-you-go spending can grow quietly if nobody watches it. Later lessons cover the shared responsibility model, cloud financial management and the cultural side of change. For now, hold on to the central idea: the cloud is an enabler, and the transformation is what the organization chooses to do with it.",
   "For the Cloud Digital Leader exam, keep the business view in mind. Questions are usually framed around an organization's goal, such as speed, cost, innovation or reliability, and ask which cloud idea or product helps. Be ready to explain the difference between simply using cloud technology and actually transforming how the business operates."
  ],
  "analogy": "Cloud computing is like switching from owning a car to using a mix of car sharing, taxis and rentals. You stop paying for a vehicle that sits in the driveway most of the day and pay only for trips you take, in whatever size of vehicle the trip needs. Transformation is the next step: once transport is on demand, you might redesign your whole week, such as living somewhere new or starting a delivery business. The analogy stops short in one way: a cloud provider also offers ready-made services, like data analytics and AI, that have no simple equivalent in a taxi ride.",
  "mnemonic": "The five NIST characteristics, in NIST order: 'On Broad Roads, Rapid Meters' = On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, Measured service.",
  "terms": [
   [
    "Cloud computing",
    "On-demand access to shared computing resources over a network, paid for by use."
   ],
   [
    "Digital transformation",
    "Using digital technology to change how an organization operates, serves customers and creates value."
   ],
   [
    "On-demand self-service",
    "Users provision resources themselves, when needed, without human interaction with the provider."
   ],
   [
    "Measured service",
    "Resource use is metered and reported, which enables pay-as-you-go billing."
   ],
   [
    "Rapid elasticity",
    "Capacity that can grow and shrink quickly, often automatically, to match demand."
   ],
   [
    "Resource pooling",
    "The provider serves many customers from shared pools of hardware, logically isolated from one another."
   ]
  ],
  "example": "A regional insurer used to wait three months for new servers before starting any project. After moving to Google Cloud it builds a claims-photo analysis prototype in two weeks using managed storage and a pre-trained image API, shows it to customers, and only then decides to invest further.",
  "mistakes": [
   [
    "Moving every server to the cloud unchanged is digital transformation.",
    "That is a migration. Transformation means changing how the organization works, serves customers or creates value, for example faster releases or data-driven products."
   ],
   [
    "The main reason to adopt the cloud is always to cut costs.",
    "Cost can matter, but the exam usually emphasizes agility, innovation, scale, reliability and access to data and AI. Cost savings are one benefit among several and are not guaranteed."
   ],
   [
    "Rapid elasticity and measured service mean the same thing.",
    "Elasticity is about capacity growing and shrinking with demand; measured service is about metering usage so it can be billed and reported."
   ]
  ],
  "tryit": [
   [
    "A city library moves its catalog server to a cloud virtual machine. Six months later, nothing about how patrons find or borrow books has changed, but the IT manager reports the project as 'digital transformation complete.' The library director asks you whether that label is accurate. What do you tell her?",
    "Not yet. The library has migrated infrastructure, which may bring benefits such as less hardware upkeep, but it has not changed how it serves patrons or works internally. Transformation would be, for example, a mobile app with real-time availability, data-driven decisions about which books to buy, or automated holds and reminders built on cloud services."
   ]
  ],
  "tip": "If an answer only changes where servers run but not how the business works, it is migration, not transformation. Look for answers about speed, experimentation, data-driven decisions and new customer value.",
  "check": [
   [
    "Name the five NIST characteristics of cloud computing.",
    "On-demand self-service, broad network access, resource pooling, rapid elasticity and measured service."
   ],
   [
    "Why is moving servers to the cloud not the same as digital transformation?",
    "Transformation changes how the organization works and creates value; a move with no change to processes, culture or products only changes the location of the servers."
   ],
   [
    "Which NIST characteristic lets a developer create a database in minutes without contacting the provider?",
    "On-demand self-service."
   ]
  ]
 },
 {
  "t": "Business benefits of the cloud: scalability, elasticity, agility, reliability and strategic value",
  "hook": "The ticket arrives at 9:15 on the last Friday before the national filing deadline. Ridgeline Tax Help's website, which handles a few hundred visitors on a normal day, is now timing out for thousands. Marcus, the only engineer on call, can see the two web servers in the company's closet running at full capacity. The owner calls from her car: 'Can we just buy more servers today?' Marcus knows new hardware takes weeks to arrive, and after the deadline those machines would sit idle for ten months. Somewhere in this mess are the words the exam loves to test: scalability, elasticity, agility and reliability. Which one would actually have saved this Friday?",
  "simple": "When a business uses the cloud, it gains a few big advantages. It can grow when it needs more capacity, which is called scalability. It can grow and shrink automatically as customers come and go, so it does not pay for empty capacity, which is called elasticity. It can try new ideas quickly and cheaply, which is called agility. And it can keep working even when some equipment breaks, which is called reliability. Think of a bakery: scalability is moving to a bigger shop as the business grows; elasticity is calling in extra staff only for the holiday rush; agility is testing a new cake for one weekend; reliability is having a second oven ready in case one fails.",
  "body": [
   "Organizations adopt the cloud for business reasons, and the exam expects you to match each benefit to a situation. Most questions describe a problem, such as a traffic spike, slow projects or outages, and ask which benefit or approach solves it. The trick is to read the scenario for clues. Words such as 'sudden spike', 'seasonal' or 'unpredictable' point one way; 'years to launch' or 'slow to experiment' point another; 'outage' or 'single server room' point a third way.",
   "Scalability is the ability to handle more work by adding resources. You can scale up (vertically) by moving to a bigger machine, or scale out (horizontally) by adding more machines. Elasticity is scalability that happens automatically and in both directions: resources are added when demand rises and removed when it falls, so you do not pay for idle capacity. A shop with a holiday peak benefits from elasticity; a company growing steadily year after year benefits from scalability. On Google Cloud, elasticity often comes from autoscaling: a managed instance group can add virtual machines when average central processing unit (CPU) use crosses a target and remove them when it drops, and serverless services such as Cloud Run scale the number of running containers with incoming requests, down to zero when nobody is using the service. In a console you would see the instance count line rise and fall alongside the traffic graph.",
   "The difference between the two matters because it changes the business outcome. Scalability without elasticity still requires someone to decide when to add capacity, and it may leave the company paying for peak capacity all year. Elasticity ties cost to demand, which is especially valuable for unpredictable or seasonal workloads. Vertical scaling also has a ceiling, since even the largest machine has limits, and resizing a single machine may require a restart. Horizontal scaling is usually preferred for cloud applications because it has no practical ceiling and adds redundancy at the same time.",
   "Agility is the speed at which a business can try new ideas and respond to change. In the cloud a team can create an environment in minutes, test an idea and delete everything if it fails. That lowers the cost of failure and encourages experimentation. Managed services add to agility because teams spend less time on patching, backups and hardware, and more on features customers see. Agility also shows up in how fast a company can reach new markets. Launching in a new country once meant finding a data center partner and shipping hardware; in the cloud it can mean deploying the same application in another region.",
   "Reliability means a service keeps working when parts fail. Cloud providers offer many data centers grouped into zones and regions, and managed services that replicate data automatically. Designing across zones and regions lets an application survive failures that would take down a single on-premises server room. Flexibility is related: you can choose from many types of compute, storage and pricing to match each workload. For example, a managed database configured for high availability keeps a standby copy in another zone and fails over automatically if the primary zone has a problem, so the application keeps serving customers with only a brief interruption.",
   "Reliability is usually expressed in business terms. A service level agreement (SLA) is a provider's commitment to a level of availability for a service, often with financial credits if it is missed. Customers still have to design their applications well to benefit, because an application running on a single virtual machine in one zone cannot be more reliable than that one machine, no matter what the provider guarantees for its infrastructure.",
   "Strategic value is the bigger picture. By moving undifferentiated work, such as running data centers, to a provider, a company can focus its people and money on what makes it different. It also gains access to capabilities it could not easily build, such as large-scale analytics, artificial intelligence (AI) and global networks. Cost matters too, but the exam often treats cost savings as one benefit among several rather than the main reason. Many organizations describe this as moving from 'keeping the lights on' to innovating: the time and budget once spent maintaining infrastructure shift toward building products and improving customer experience.",
   "Put together, these benefits reinforce one another. Elastic infrastructure makes experiments cheap, which supports agility. Managed, replicated services improve reliability without a large operations team. Freed-up people and budget deliver strategic value. When you meet a scenario on the exam, identify the problem first, then pick the benefit that addresses that specific problem rather than the one that sounds most impressive."
  ],
  "analogy": "Think of a restaurant. Scalability is being able to add more tables or open a bigger dining room as the business grows. Elasticity is a dining room with folding walls that expands automatically when a crowd arrives and shrinks when it leaves, so you only heat and staff the space in use. Agility is trying a new dish as a weekend special instead of reprinting the whole menu. The analogy has a limit: in the cloud, elastic capacity can appear in seconds or minutes, much faster than any building could change.",
  "terms": [
   [
    "Scalability",
    "The ability to increase capacity to handle more load, by scaling up or out."
   ],
   [
    "Elasticity",
    "Automatically adding and removing resources as demand changes, so capacity follows load."
   ],
   [
    "Agility",
    "The ability to move quickly: provision, experiment and change direction with little delay or cost."
   ],
   [
    "Reliability",
    "The ability of a service to keep working correctly when components fail."
   ],
   [
    "Autoscaling",
    "Automatically adjusting the number of running resources, such as VMs or containers, based on load."
   ],
   [
    "Service level agreement (SLA)",
    "A provider's formal commitment to a level of service, such as availability, often with credits if it is not met."
   ]
  ],
  "example": "A tax-preparation website is quiet for ten months and extremely busy before the filing deadline. With autoscaling on Google Cloud it runs a few instances most of the year and hundreds in the final weeks, paying for the peak only while it lasts.",
  "mistakes": [
   [
    "Scalability and elasticity are interchangeable words.",
    "Scalability is the ability to grow capacity. Elasticity is automatic growth and shrinkage that tracks demand. Short spikes followed by quiet periods point to elasticity."
   ],
   [
    "Scaling up is the normal way to handle more cloud traffic.",
    "Scaling up has limits and can require restarts. Cloud applications usually scale out by adding more instances, which also improves reliability."
   ],
   [
    "Because the provider is reliable, any application in the cloud is automatically highly available.",
    "Customers must design for it, for example by running across multiple zones. A single VM in one zone fails if that zone or machine fails."
   ],
   [
    "Cost savings are always the top business benefit of the cloud.",
    "The exam often treats agility, innovation and strategic focus as the bigger drivers, with cost as one benefit among several."
   ]
  ],
  "tryit": [
   [
    "Cedar Lane Ticketing sells concert tickets. Traffic is near zero most days, but when a popular show goes on sale, requests jump a hundredfold for about an hour. Leadership wants to avoid paying for peak capacity all month. Which benefit should you highlight, and what kind of Google Cloud feature delivers it?",
    "Elasticity. Autoscaling, for example a managed instance group or a serverless service such as Cloud Run, adds capacity automatically during the on-sale spike and removes it afterward, so the company pays for the peak only while it lasts."
   ],
   [
    "A manufacturer's single on-premises server room loses power twice in a year, stopping order processing each time. Which benefit is the priority?",
    "Reliability. Running the application across multiple zones, with replicated managed services, lets it keep working when one location fails."
   ]
  ],
  "tip": "Scalability is about being able to grow; elasticity is growing and shrinking automatically with demand. A question that mentions short spikes followed by quiet periods is pointing at elasticity.",
  "check": [
   [
    "A startup wants to test a new product cheaply and drop it quickly if it fails. Which benefit is this?",
    "Agility: resources can be created and removed quickly with no up-front purchase."
   ],
   [
    "What is the difference between scaling up and scaling out?",
    "Scaling up moves to a larger machine; scaling out adds more machines that share the load."
   ],
   [
    "A company's order system goes down whenever its one server room loses power. Which cloud benefit addresses this most directly?",
    "Reliability, by deploying across multiple zones or regions so a single failure does not stop the service."
   ]
  ]
 },
 {
  "t": "CapEx vs OpEx and total cost of ownership (TCO) when moving to the cloud",
  "hook": "The finance committee at Bramblewood Manufacturing has a spreadsheet on the projector. On the left: the price of replacing twelve aging servers, a single tidy number. On the right: a cloud estimate that, per month, looks small but over five years looks bigger than the hardware. Diane, the controller, frowns. 'So staying on-premises is cheaper. Why are we even discussing this?' Jun from IT raises his hand. He knows the server room lease, the cooling bill, the maintenance contracts and two engineers' time are buried in other budgets, missing from the slide entirely. Before the committee votes, someone needs to explain what is really being compared. What does a fair comparison look like?",
  "simple": "Companies pay for technology in two main ways. One is buying big things up front, like servers, which accountants call capital expenditure (CapEx). The other is paying as you go, like a monthly bill, which is called operating expenditure (OpEx). The cloud mostly turns big up-front purchases into monthly bills based on how much you use. Total cost of ownership (TCO) means adding up everything something really costs over its life, not just the price tag. Owning a car is a good example: the purchase price is only the start. You also pay for fuel, insurance, repairs, parking and the time you spend at the garage. Comparing a car purchase with a rideshare budget is only fair if you count all of those costs.",
  "body": [
   "Capital expenditure (CapEx) is money spent up front on long-lived assets, such as servers, storage arrays, network gear and buildings. The asset is recorded on the balance sheet and depreciated over several years. Operating expenditure (OpEx) is ongoing spending on day-to-day costs, such as rent, electricity, salaries and subscriptions, recorded as an expense in the period it is used. The distinction matters to finance teams because the two types of spending are planned, approved and reported differently. A large CapEx purchase often needs board approval and ties up cash immediately, while OpEx flows through regular operating budgets.",
   "Traditional IT is CapEx-heavy. A company forecasts what it will need for the next three to five years, buys it, and hopes the forecast was right. If demand is lower, hardware sits idle; if higher, customers wait while more is bought. The cloud turns most of this into OpEx: you pay monthly for what you use, you can stop paying when you stop using it, and fixed costs become variable costs that follow the business. This flexibility has a strategic side. Cash that is not locked into hardware can be spent on products, hiring or marketing, and a new project can start small without a large up-front bet.",
   "Forecasting is the hidden weakness of the CapEx model. Buying for the expected peak over a hardware cycle almost guarantees waste, because capacity sits unused for most of that time, while buying too little causes slowdowns and emergency purchases. In the cloud, the forecast matters far less: you can start small, watch real usage, and adjust. That shift from guessing to measuring is one of the most practical financial benefits of cloud adoption.",
   "Total cost of ownership (TCO) is the full cost of running something over its life, not just the purchase price. For an on-premises data center it includes hardware and its refresh cycle, software licenses, facilities and floor space, power and cooling, network connections, physical security, maintenance contracts, and the staff time to install, patch, monitor and repair everything. Many of these costs are hidden in other budgets, so comparisons that look only at server prices make on-premises look cheaper than it is. A realistic on-premises TCO usually comes from several departments: facilities knows the lease and power costs, procurement knows the maintenance contracts, and IT knows how much staff time goes to routine tasks such as patching and hardware replacement.",
   "A fair cloud TCO also includes the costs of the move: migration work, training, running old and new systems in parallel for a time, and possible changes to licensing. On the cloud side, you should include ongoing usage, support plans and the time teams still spend on management. The benefit side includes things that are hard to price, such as faster delivery of new features. Google Cloud provides tools that help build the cloud side of the comparison, such as a pricing calculator for estimating the cost of planned resources and assessment tools that analyze existing workloads before a migration. The estimates are only as good as the inputs, so teams should base them on measured usage where possible.",
   "OpEx is not automatically cheaper. A cloud bill can grow quickly if resources are left running or sized too large, which is why cost management and FinOps practices matter. Predictable, steady workloads can use commitments to get lower prices, blending the flexibility of OpEx with some of the savings of planning ahead. On Google Cloud, committed use discounts give lower prices in exchange for committing to a level of usage for a set term, and Compute Engine applies sustained use discounts automatically to some machine types that run for a large part of the month.",
   "Cost visibility is part of good financial practice in the cloud. Billing reports in the console break spending down by project, service and label, budgets can send alerts when spending reaches a threshold, and billing data can be exported to BigQuery for detailed analysis. FinOps, short for cloud financial operations, is the practice of bringing finance, technology and business teams together so that everyone sees what they spend and makes cost-aware decisions. The exam does not expect you to calculate a TCO, but it does expect you to know which costs belong in one and why OpEx needs active management.",
   "When you meet a CapEx and OpEx question, keep three ideas in mind. The cloud shifts spending toward OpEx and turns fixed costs into variable ones. A fair TCO includes hidden on-premises costs and the one-time costs of migration. And OpEx brings flexibility, but it needs monitoring, rightsizing and commitments for steady workloads to deliver its value."
  ],
  "analogy": "Owning servers is like buying a house; using the cloud is like renting an apartment. Buying means a large down payment, years of property tax, insurance and repairs, and you are stuck with the size you chose. Renting means a monthly payment that covers maintenance, and you can move when your needs change. The analogy breaks down in one important way: cloud rent is metered by the hour or second of use, so leaving lights on in empty rooms (idle resources) keeps costing money, which is why cloud spending needs active management.",
  "terms": [
   [
    "Capital expenditure (CapEx)",
    "Up-front spending on long-lived assets that are depreciated over time."
   ],
   [
    "Operating expenditure (OpEx)",
    "Ongoing spending on services and running costs, expensed as it is used."
   ],
   [
    "Total cost of ownership (TCO)",
    "All direct and indirect costs of a system over its life, including facilities, power, staff and refresh."
   ],
   [
    "Depreciation",
    "Spreading the cost of an asset over its useful life for accounting."
   ],
   [
    "Committed use discount",
    "A lower price in return for committing to a level of resource use for a set term."
   ],
   [
    "FinOps",
    "A practice that brings finance, technology and business teams together to manage cloud spending."
   ]
  ],
  "example": "A manufacturer compares the hardware price of a server refresh with a cloud estimate and at first finds the cloud more expensive. After adding its data center lease, electricity, cooling, maintenance contracts and two engineers' time, the on-premises TCO over five years turns out to be much higher than the cloud estimate.",
  "mistakes": [
   [
    "Moving to the cloud converts OpEx into CapEx.",
    "It is the reverse. The cloud replaces up-front hardware purchases (CapEx) with ongoing usage-based spending (OpEx)."
   ],
   [
    "Comparing server purchase prices with a cloud estimate is a fair TCO comparison.",
    "TCO must include power, cooling, floor space, maintenance, hardware refresh, staff time and migration costs. Leaving these out makes on-premises look cheaper than it is."
   ],
   [
    "OpEx in the cloud is always cheaper than owning hardware.",
    "Idle or oversized resources can make cloud bills grow. Savings depend on rightsizing, turning off unused resources and using commitments for steady workloads."
   ]
  ],
  "tryit": [
   [
    "Sunfield Logistics runs a reporting system that uses the same amount of compute every hour of every day and will for at least three years. The cloud team proposes running it on demand. The finance lead asks whether there is a cheaper option that still avoids buying hardware. What do you suggest?",
    "Use a committed use discount. Steady, predictable workloads are ideal for committing to a level of usage over a term in exchange for a lower price, which keeps the OpEx model while capturing savings that planning ahead allows."
   ]
  ],
  "tip": "The cloud moves spending from CapEx to OpEx, not the reverse. When a question mentions hidden costs such as power, cooling or staff, it is testing TCO.",
  "check": [
   [
    "Is a monthly cloud bill CapEx or OpEx?",
    "OpEx: it is an ongoing operating cost paid for what is used."
   ],
   [
    "List three on-premises costs that are often missed in a TCO comparison.",
    "Any three of: power, cooling, floor space, hardware refresh, maintenance contracts, physical security, and staff time for operations."
   ],
   [
    "Why can a cloud bill become higher than expected, even though OpEx is flexible?",
    "Resources left running when not needed, or sized larger than necessary, keep incurring charges. Cost monitoring, budgets and rightsizing are needed."
   ]
  ]
 },
 {
  "t": "Deployment options: on-premises, private cloud, public cloud, hybrid cloud and multicloud",
  "hook": "The board of Westbrook Regional Health has just approved a cloud strategy, and you are in the follow-up meeting where it turns into decisions. The radiology archive sits on storage bought eighteen months ago. A new AI tool the clinicians want runs only in a public cloud. The billing team already uses a software-as-a-service product from another provider, and an acquisition next year will bring in a clinic group that runs everything on yet another cloud. The chief information officer turns to you: 'So which are we, hybrid or multicloud?' The honest answer may be both. How do you tell the models apart, and why would anyone choose one?",
  "simple": "There are several places a company can run its computer systems. It can run them in its own building, called on-premises. It can build its own cloud-like setup used only by itself, called a private cloud. It can rent from a big shared provider like Google Cloud, called the public cloud. It can mix its own equipment with a public cloud, called hybrid cloud. Or it can use two or more public cloud providers, called multicloud. Think of storing your belongings: in your own garage (on-premises), in a storage unit rented just for you (private), in a big shared warehouse service (public), in your garage plus the warehouse (hybrid), or with two different warehouse companies (multicloud).",
  "body": [
   "Organizations can run IT in several places, and many use more than one. The exam expects you to recognize each model from a short description and to know why a company might choose it. In practice, very few large organizations use only one model. The question is less 'which one' and more 'which mix, and why.'",
   "On-premises means the organization owns or leases the facility and hardware and runs everything itself. It has full control but also full responsibility for capacity, maintenance and security. A private cloud offers cloud-style self-service and automation, but the infrastructure is dedicated to one organization, usually in its own data center. It gives control and isolation but still requires buying and running the hardware. A private cloud is not the same thing as simply having servers on-premises. What makes it a cloud is the self-service, automation and pooling, so internal teams can request resources through a portal or an application programming interface (API) instead of filing tickets for each machine.",
   "A public cloud, such as Google Cloud, is run by a provider that shares large pools of infrastructure among many customers, who are isolated from one another logically. Customers get on-demand resources, global reach and managed services without owning hardware. Isolation between customers in a public cloud is enforced by software, identity controls and the virtualization layer, so one customer cannot see another's resources even though they share physical hardware. Public cloud is usually the fastest way to reach new regions and to use advanced services such as large-scale analytics and artificial intelligence (AI). It also shifts hardware maintenance, capacity planning and much of the physical security work to the provider.",
   "Hybrid cloud combines on-premises or private cloud infrastructure with a public cloud, connected so that workloads and data can work together. Common reasons are regulations that keep some data on-premises, recent investments in hardware that still has useful life, low-latency needs at a factory or store, or a gradual migration. A retailer might keep point-of-sale systems in stores and run analytics in Google Cloud. The connection between the environments is what makes it hybrid rather than just two separate systems. Organizations link them with private connections or encrypted tunnels, shared identity and consistent management, so an application on-premises can call a service in the cloud or move to it later. Google Distributed Cloud extends Google Cloud infrastructure and services into customer data centers and edge locations for cases where data or processing must stay local.",
   "Multicloud means using more than one public cloud provider. Reasons include choosing the best service for each job, meeting regulator expectations about concentration risk, a merger with a company that uses another provider, or avoiding dependence on one vendor. An organization can be hybrid and multicloud at the same time. Google Cloud supports these strategies with open technologies such as Kubernetes and with Google Kubernetes Engine (GKE) Enterprise, which manages clusters across environments, and with BigQuery Omni, which can analyze data stored in other clouds. Multicloud also brings challenges: different consoles, security models and skills for each provider, and data transfer costs between them. That is why consistent, open tools that work across environments are central to any multicloud strategy.",
   "Choosing among these models is a business decision. Leaders weigh control, cost, speed, compliance and existing investments. A startup with no legacy systems might go entirely public cloud. A bank with strict data rules and a recently renewed data center contract might choose hybrid. A global company formed by mergers might be multicloud simply because of history, and then decide whether to consolidate or manage several providers deliberately.",
   "When you read an exam scenario, look for the clues that reveal the model. Phrases such as 'our own data center', 'must remain on-site' or 'existing hardware' suggest on-premises infrastructure is part of the picture. Mentions of two named public providers suggest multicloud. A requirement to manage applications consistently across all of these environments usually points to Kubernetes-based tools such as GKE Enterprise, and a need to analyze data where it already sits in another cloud points to BigQuery Omni.",
   "Remember the key distinction: hybrid always involves private or on-premises infrastructure plus a public cloud; multicloud involves two or more public clouds. A private cloud plus a public cloud is still hybrid, and a company with on-premises servers that uses two public clouds is both hybrid and multicloud."
  ],
  "analogy": "Think of how a family handles transport. Owning a car is on-premises: full control, full maintenance. A car leased exclusively to the family is like a private cloud. Using the city bus network is public cloud: shared, no maintenance, goes nearly everywhere. Driving to the train station and taking the train is hybrid, with the two working together. Using two different rideshare apps is multicloud. Where the analogy weakens: in IT, making the pieces work together requires deliberate networking, identity and management tools, not just a parking lot.",
  "terms": [
   [
    "On-premises",
    "Infrastructure the organization runs in its own or leased facilities."
   ],
   [
    "Private cloud",
    "Cloud-style infrastructure dedicated to a single organization."
   ],
   [
    "Hybrid cloud",
    "A combination of on-premises or private cloud with a public cloud, working together."
   ],
   [
    "Multicloud",
    "Using services from two or more public cloud providers."
   ],
   [
    "Public cloud",
    "Cloud infrastructure run by a provider and shared among many logically isolated customers."
   ],
   [
    "Google Distributed Cloud",
    "Google Cloud infrastructure and services extended into customer data centers and edge locations."
   ]
  ],
  "example": "A hospital keeps its imaging archive in its own data center because of an existing contract, sends new scans to Google Cloud for AI-assisted analysis, and uses another provider's email service. It is running a hybrid and multicloud strategy at once.",
  "mistakes": [
   [
    "Using Google Cloud plus another public cloud is hybrid cloud.",
    "That is multicloud. Hybrid requires on-premises or private cloud infrastructure working together with a public cloud."
   ],
   [
    "Any company with servers in its own building has a private cloud.",
    "A private cloud needs cloud characteristics such as self-service, automation and pooling. Traditional on-premises servers without those are just on-premises."
   ],
   [
    "An organization must choose exactly one deployment model.",
    "Many organizations are hybrid and multicloud at the same time, mixing models to suit each workload."
   ],
   [
    "Multicloud is always the safest choice because it avoids lock-in.",
    "It reduces dependence on one provider but adds complexity, skill needs and data transfer costs. Open tools help, but it is a trade-off."
   ]
  ],
  "tryit": [
   [
    "Ashford Foods runs factory control systems on servers at each plant because machines need responses in milliseconds. It wants to send production data to Google Cloud for analytics and forecasting. It has no other cloud provider. Which deployment model describes the target design, and why is it a good fit?",
    "Hybrid cloud. Latency-sensitive control stays on-premises at each plant, while analytics runs in Google Cloud, connected so data flows between them. There is only one public cloud, so it is not multicloud."
   ]
  ],
  "tip": "Look for the words 'on-premises' or 'our own data center' in the scenario. If they appear alongside a public cloud, the answer is hybrid; if only several public clouds appear, it is multicloud.",
  "check": [
   [
    "A company uses Google Cloud and another public provider and has no data center. Which model?",
    "Multicloud, because it uses more than one public cloud and no private infrastructure."
   ],
   [
    "Give two reasons a company might keep part of its IT on-premises in a hybrid design.",
    "Regulatory or contractual requirements, recent hardware investment, low latency at a local site, or a gradual migration."
   ],
   [
    "Which Google Cloud capability lets an organization analyze data stored in another cloud without first moving it?",
    "BigQuery Omni."
   ]
  ]
 },
 {
  "t": "Cloud service models: IaaS, PaaS, SaaS and serverless, and what the customer manages in each",
  "hook": "Three requests land on your desk at Kestrel Insurance in the same afternoon. The claims team needs to keep an old inventory application alive, and it only runs on one specific operating system version. The digital team wants to launch a customer portal in six weeks with two developers and no one to manage servers. And human resources simply wants everyone on shared email and documents by next month. Your manager asks for a recommendation by tomorrow: one platform for all three, or something different for each? The answer depends on a question every cloud leader must ask: how much of the technology stack do you want to manage yourself?",
  "simple": "Cloud services come in different levels of 'done for you.' With infrastructure as a service, you rent basic building blocks like virtual computers and storage, and you set up everything on top. With platform as a service, the provider runs the computers and the system software, and you just bring your own program. With software as a service, you use a finished application, like web-based email, and the provider runs all of it. Serverless means you never think about servers at all: things grow and shrink by themselves and you pay only when your code runs. Think of food: cooking at home from groceries, using a meal kit, ordering takeout, or a buffet where you pay only for what you put on your plate.",
  "body": [
   "Cloud services are grouped by how much of the stack the provider manages for you. Think of the stack from the bottom up: facilities, physical hardware, networking, virtualization, operating system, runtime and middleware, application, and finally data and access. The further up the provider manages, the less work you have, and the less control you have. Every service model is a different answer to one question: where is the line between what the provider runs and what you run? Knowing that line is essential for choosing a service and for understanding who is responsible for security.",
   "Infrastructure as a service (IaaS) gives you virtual machines, disks and networks. The provider runs the physical layers and virtualization; you install and patch the operating system, runtimes and applications. Compute Engine is Google Cloud's IaaS offering. Choose IaaS when you need full control, such as for a legacy application that expects a particular operating system. With Compute Engine you pick a machine type, an operating system image, disks and a network, and you get a virtual machine (VM) you can sign in to and configure as you like. That freedom is the point, and also the cost: someone on your team must patch the operating system, harden it, monitor it and replace it when it fails.",
   "Platform as a service (PaaS) gives you a managed platform where you bring your code and data. The provider runs the operating system and runtime, handles scaling and applies patches. App Engine is a classic Google Cloud PaaS. Developers get speed because they focus on code, not servers. On a PaaS, a developer typically deploys code with a single command or from a source repository, and the platform handles the servers underneath. The trade-off is that you accept the platform's supported languages, configuration options and ways of working.",
   "Software as a service (SaaS) is a complete application used over the internet, such as Google Workspace (Gmail, Docs, Drive). The provider runs everything; you manage your users, settings and data. Customers of SaaS still make important decisions: who gets an account, which sharing settings are allowed, whether multi-factor sign-in is required, and how data is retained. Those choices remain the customer's job.",
   "Serverless is a way of using cloud services where you do not provision or manage servers at all, capacity scales automatically (often to zero), and you pay for actual use such as requests or compute time. Cloud Run (containers), Cloud Run functions (event-driven code) and BigQuery (analytics) are serverless. Serverless services are often described as a form of PaaS, and some managed data services behave like SaaS for developers. Serverless changes the cost conversation as well. Because there is no idle server to pay for, a service that receives few requests can cost very little, while a sudden surge is absorbed automatically. In a billing report you would see charges tied to requests, compute time or data processed rather than to machines running around the clock.",
   "Some services sit between the classic categories. Google Kubernetes Engine (GKE) runs containers on a managed Kubernetes platform: Google manages the control plane, and in its Autopilot mode also manages the nodes, while the customer manages the containers and their configuration. Managed databases such as Cloud SQL take over installation, patching, backups and replication of the database software, leaving the customer to manage schemas, queries, users and data. On the exam, focus on how much the customer still manages rather than forcing every product into a single label.",
   "Choosing a model is a trade-off between control and convenience. IaaS gives the most control and the most responsibility. SaaS gives the least of both. Many organizations mix them: SaaS for email, PaaS or serverless for new applications, and IaaS for workloads that cannot yet change. When a question asks which option needs the least operational effort, look toward serverless and SaaS. When it asks for maximum control or compatibility with an existing system, look toward IaaS.",
   "A common modernization path follows this ladder. A company first moves existing applications to virtual machines with few changes, because that is fastest. Over time it moves databases to managed services, packages applications in containers, and builds new features on serverless platforms. Each step hands more routine work to Google so the team can spend more time on what customers notice. Understanding the models lets a leader plan that path and explain to stakeholders what changes for their teams at each step."
  ],
  "analogy": "Service models are like ways of getting a pizza. IaaS is renting a kitchen: the oven is provided, but you buy ingredients, cook and clean. PaaS is a take-and-bake shop that provides the dough and oven; you add toppings and decide when it is done. SaaS is ordering delivery: you just eat. Serverless is a pizza bar that charges per slice you actually take. The analogy stops working on one point the exam cares about: in every model, the customer still owns its data and decides who gets access.",
  "terms": [
   [
    "IaaS",
    "Infrastructure as a service: virtual machines, storage and networks, with the customer managing the OS and above."
   ],
   [
    "PaaS",
    "Platform as a service: a managed runtime where the customer brings code and data."
   ],
   [
    "SaaS",
    "Software as a service: a complete application delivered over the internet."
   ],
   [
    "Serverless",
    "Services with no servers to manage, automatic scaling and pay-per-use billing."
   ],
   [
    "Compute Engine",
    "Google Cloud's IaaS service for creating and running virtual machines."
   ],
   [
    "Cloud Run",
    "A serverless Google Cloud service that runs containers and scales automatically, including to zero."
   ],
   [
    "Google Kubernetes Engine (GKE)",
    "A managed Kubernetes service for running containerized applications."
   ]
  ],
  "example": "A company runs an old inventory system on Compute Engine because it needs a specific OS version, builds its new customer portal on Cloud Run, and gives staff Google Workspace for email. It uses IaaS, serverless and SaaS side by side.",
  "mistakes": [
   [
    "SaaS means the customer has no responsibilities at all.",
    "The provider runs the application, but the customer still manages users, access, settings and its data."
   ],
   [
    "Serverless means there are no servers anywhere.",
    "Servers still exist; the provider manages them. 'Serverless' means the customer does not provision or manage them, scaling is automatic and billing is by use."
   ],
   [
    "IaaS is always the best choice because it gives the most control.",
    "More control also means more work and responsibility. For new applications, PaaS or serverless often delivers faster with less operational effort."
   ],
   [
    "App Engine is IaaS because it runs on virtual machines.",
    "App Engine is PaaS: Google manages the servers, operating system and runtime, and the customer brings code."
   ]
  ],
  "tryit": [
   [
    "Marlow Events has two developers and needs a ticket-booking API that is busy only during event launches. They do not want to patch operating systems or pay for idle machines. Which service model and Google Cloud product fit best?",
    "Serverless, for example Cloud Run. It runs their containerized code without servers to manage, scales up for launches and down to zero when quiet, and bills only for actual use."
   ],
   [
    "A legacy accounting package must run on a specific operating system version with a custom driver. Which model fits?",
    "IaaS with Compute Engine, because the team needs control over the operating system and installed software."
   ]
  ],
  "tip": "Map products to models: Compute Engine is IaaS, App Engine is PaaS, Cloud Run and Cloud Run functions are serverless, Google Workspace is SaaS. The customer always manages its data and access, in every model.",
  "check": [
   [
    "Which service model gives the customer the most control over the operating system?",
    "IaaS, such as Compute Engine, where the customer installs and manages the OS."
   ],
   [
    "What three traits define serverless?",
    "No servers to provision or manage, automatic scaling (often to zero), and paying only for actual use."
   ],
   [
    "In which service model does the customer manage only users, settings and data?",
    "SaaS, such as Google Workspace."
   ]
  ]
 },
 {
  "t": "The shared responsibility model and how it changes with the service model",
  "hook": "It is 7:40 on a Saturday morning when Aisha, the security lead at Pinecrest Learning, gets a message from a journalist: student records from the company's storage bucket are viewable by anyone with the link. Her stomach drops. Within the hour the chief executive is on the phone asking the question that will shape the whole incident report: 'Isn't Google responsible for keeping our cloud secure?' Aisha pulls up the bucket's permissions and sees that a contractor granted public access to it months ago to share a test file. Google's data centers were never breached. So who was responsible for this exposure, and what should change on Monday?",
  "simple": "When you use the cloud, keeping things safe is a shared job. The provider, Google, protects the buildings, the machines and the network underneath everything. You, the customer, are always responsible for your own information, for deciding who is allowed to see or change it, and for setting up the services correctly. How much else you must handle depends on the type of service. Renting an apartment is a good comparison: the landlord secures the building's front door, walls and wiring, but if you leave your own apartment door open or give a key to a stranger, that is on you. The more 'done for you' the service, the fewer tasks you have, but you never hand over everything.",
  "body": [
   "In the cloud, security and operations are shared between the provider and the customer. The shared responsibility model describes who does what. Misunderstanding it is a common cause of incidents: customers sometimes assume the provider protects things that are actually the customer's job. Many cloud security incidents involve customer-side mistakes such as overly broad permissions or publicly exposed data, not failures of the provider's infrastructure. Knowing where the line sits is the first step to closing those gaps.",
   "Google is always responsible for the security of the underlying infrastructure: the physical data centers, the hardware, the global network, and the virtualization layer that isolates customers. Google designs its own servers and network equipment and runs them with strict physical and operational controls. Customers cannot inspect these layers directly, which is why providers publish independent audit reports and certifications that describe their controls. Google Cloud also encrypts customer data at rest by default, an infrastructure-level protection the customer does not have to switch on.",
   "The customer is always responsible for its own data, for deciding who can access it (identities and permissions), and for how it configures the services it uses. If a customer makes a storage bucket public by mistake, or gives an employee far more access than needed, that is on the customer side of the line, even though the service itself is secure. In Google Cloud, access is controlled with Identity and Access Management (IAM), where the customer decides which people and service accounts get which roles on which resources. Good practice is least privilege: grant only the access each person needs, and review it regularly.",
   "Between those two fixed ends, the split moves with the service model. With infrastructure as a service (IaaS), such as Compute Engine, the customer also manages the guest operating system, patches, installed software, and network firewall rules. With platform as a service (PaaS) and serverless, such as App Engine or Cloud Run, Google also manages the operating system and runtime, so the customer focuses on application code, configuration and data. With software as a service (SaaS), such as Google Workspace, Google runs the whole application, and the customer manages users, settings and data.",
   "It helps to picture the stack as a set of layers with a moving line. At the bottom are facilities, hardware, network and virtualization, always on Google's side. At the top are data, identities, access and configuration, always on the customer's side. In the middle sit the operating system, runtime and application, and these slide from the customer toward Google as you move from IaaS to PaaS to SaaS. A quick way to answer any shared responsibility question is to locate the layer in the scenario and ask which model the service belongs to.",
   "Configuration deserves special attention because it is where many real problems start. A firewall rule that allows traffic from anywhere, a storage bucket made public to share one file, a service account key left in a code repository, or an administrator role granted to everyone in a project are all customer-side configuration choices. Google Cloud provides tools to help find these, such as Security Command Center, which surfaces misconfigurations and vulnerabilities, and organization policies that can block risky settings across all projects. Using the tools, however, remains the customer's decision.",
   "Google Cloud describes its approach as shared fate: beyond drawing a line, it provides secure defaults, blueprints, guidance and tools to help customers do their part well. For the exam, remember two things. First, moving up from IaaS to SaaS shrinks the customer's responsibility but never removes it. Second, data, access and configuration always stay with the customer. In practice, shared fate shows up as security foundations blueprints that set up a well-designed environment, recommendations in the console that flag risky settings, and programs that help customers in regulated industries meet their obligations.",
   "For leaders, the practical message is that adopting the cloud changes security work rather than eliminating it. Teams spend less time on physical security and hardware, and more on identity, configuration, data protection and monitoring. Budget, training and clear ownership should follow that shift so that nothing falls into the gap between what the provider does and what the customer assumes it does. A simple responsibility matrix, agreed before migration, is one of the most useful documents a cloud program can produce."
  ],
  "analogy": "Shared responsibility is like a bank's safe deposit boxes. The bank secures the building, the vault, the guards and the cameras. What you put in the box, who you give a key to, and whether you lock it after use are your decisions. If you hand a copy of your key to a stranger, the vault's strength does not help. The analogy is imperfect in one way the exam tests: in the cloud, the bank's share grows as you choose more managed services, while a vault's duties never change.",
  "terms": [
   [
    "Shared responsibility model",
    "The division of security and operational duties between the cloud provider and the customer."
   ],
   [
    "Shared fate",
    "Google Cloud's approach of actively helping customers secure their part through defaults, tools and guidance."
   ],
   [
    "Security of the cloud",
    "The provider's duty: physical facilities, hardware, network and virtualization."
   ],
   [
    "Security in the cloud",
    "The customer's duty: data, identities, access and configuration."
   ],
   [
    "Identity and Access Management (IAM)",
    "The Google Cloud service for controlling which identities have which roles on which resources."
   ],
   [
    "Least privilege",
    "Granting each identity only the access it needs to do its job."
   ]
  ],
  "example": "A company runs a web app on Compute Engine and does not patch the operating system for a year. An attacker exploits an old vulnerability. Because the OS is the customer's responsibility in IaaS, the fix is the company's job. Moving the app to Cloud Run would shift OS patching to Google.",
  "mistakes": [
   [
    "In SaaS, the provider is responsible for everything, including who can access the data.",
    "The provider runs the application, but the customer always controls its users, access, settings and data."
   ],
   [
    "If data is exposed through a public bucket, the cloud provider failed.",
    "Bucket permissions are customer configuration. The provider secured the service; the customer chose the setting."
   ],
   [
    "Moving from Compute Engine to Cloud Run makes the provider responsible for the application code.",
    "Cloud Run shifts operating system and runtime management to Google. Application code, configuration and data remain the customer's."
   ],
   [
    "Shared fate means Google takes over the customer's responsibilities.",
    "Shared fate means Google actively helps with secure defaults, blueprints and tools. The customer's duties still exist."
   ]
  ],
  "tryit": [
   [
    "Harborview Credit Union runs a loan application on Compute Engine. An audit finds the guest operating system is missing a year of security patches and a firewall rule allows remote administration from any address. The chief risk officer asks whose job it is to fix these. What do you answer, and what longer-term option could reduce this burden?",
    "Both are the credit union's responsibility, because in IaaS the customer manages the guest operating system, patches and firewall rules. Moving the application to a managed or serverless platform such as Cloud Run would shift operating system patching to Google, though configuration and access would remain the credit union's job."
   ]
  ],
  "tip": "Any answer that says the provider becomes responsible for customer data or access decisions is wrong. The question usually tests which layer moves to the provider as you go from IaaS to PaaS to SaaS.",
  "check": [
   [
    "Who patches the guest operating system on a Compute Engine VM?",
    "The customer, because Compute Engine is IaaS."
   ],
   [
    "Which responsibilities stay with the customer even in SaaS?",
    "Its data, its users and their access, and the settings it chooses."
   ],
   [
    "Who is responsible for the physical security of Google Cloud data centers?",
    "Google, in every service model."
   ]
  ]
 },
 {
  "t": "Google Cloud global infrastructure: regions, zones, edge points of presence and Google's private network",
  "hook": "At 3:10 a.m. your phone lights up with an alert from Northwind Learning's monitoring: the video platform in one zone has stopped responding. Leo, the night operator, messages: 'Students in Europe are already complaining. Do we need to wake everyone up?' You open the console and see the other zone in the same region still serving traffic, its instance count climbing as the load balancer shifts users over. Your heart rate slows. Six months ago the team argued about whether running in two zones was worth the cost. Tonight, you understand why. But what exactly are zones and regions, and what would have happened if the whole region had gone dark?",
  "simple": "Google Cloud runs in data centers all over the world. A region is a geographic area, such as a part of the United States or Europe, where Google has a group of data centers. Each region is split into zones, which are separate sections with their own power and networking, so a problem in one zone usually does not affect the others. Google also has many smaller connection points near cities, called points of presence, where your internet traffic joins Google's own private network. Think of a supermarket chain: a region is a city where the chain operates, zones are separate stores in that city, and points of presence are the many delivery lockers around town that feed into the chain's own trucks.",
  "body": [
   "Google Cloud runs on the same global infrastructure that serves Google's own products. Understanding its building blocks helps you design for performance, reliability and data location, and it appears in many exam questions. That infrastructure includes data centers on several continents, a private fiber network that links them, and edge locations in many more cities.",
   "A region is an independent geographic area, such as `us-central1` (Iowa) or `europe-west1` (Belgium). Each region contains several zones. A zone, such as `us-central1-a`, is an isolated deployment area within a region, with its own power, cooling and networking, so a failure in one zone should not affect the others. Zones in a region are connected by high-bandwidth, low-latency links. Some services are zonal, such as a virtual machine (VM) that lives in one zone; some are regional (replicated across zones in a region), and some are multi-regional or global. For example, a Compute Engine VM is zonal, a regional managed instance group spreads VMs across zones in one region, Cloud Storage offers buckets in a single region, a dual-region or a multi-region location, and some services, such as the global load balancers, are global. Knowing the scope of a service tells you what kind of failure it can survive without extra design.",
   "Designing across locations gives different levels of protection. Running in two or more zones protects against a zone failure. Running in two or more regions protects against a regional disaster and lets you serve users on different continents with lower latency. Region choice also matters for data residency rules, price (which varies by region) and carbon footprint. These benefits come with trade-offs. Running in more locations usually costs more and adds complexity, such as keeping data in sync, so designs should match the business need. An internal reporting tool might accept running in one zone, while a payment service would justify multiple regions.",
   "Data residency deserves extra attention. Some laws and contracts require certain data to be stored in a particular country or economic area. Because you choose the region or multi-region when you create many resources, Google Cloud lets you keep data in a chosen geography, and organization policies can restrict which locations teams are allowed to use. On the exam, a scenario that mentions where data must legally reside is usually testing region selection.",
   "Google's network edge is made up of points of presence (PoPs), locations around the world where Google's network connects with internet service providers and other networks. User traffic enters Google's private network at a nearby PoP and travels most of the way on Google's own fiber, including subsea cables, rather than across the public internet. Services such as Cloud CDN, Google Cloud's content delivery network (CDN), cache content at the edge, closer to users. This is different from where your workloads run. Points of presence are entry and exit points for traffic and caches for content; your VMs and databases still run in the regions and zones you choose.",
   "Google's private network is a key part of the performance story. Because traffic can travel most of its journey on Google's backbone instead of many separate internet providers, it tends to have fewer hops and more consistent performance. Google Cloud offers a choice of network service tiers: the Premium Tier uses Google's network for as much of the route as possible, while the Standard Tier hands traffic to the public internet closer to the region at a lower price. Global load balancing builds on this network, letting one address serve users worldwide and route each request to a healthy backend near them.",
   "When you open the console you can see regions and zones in location drop-downs, and in Cloud Shell `gcloud compute regions list` and `gcloud compute zones list` list them. The exact number of regions grows every year, so the exam focuses on concepts rather than counts. What does stay constant is the pattern: regions contain zones, zones are failure domains, and edge locations bring users onto Google's network close to where they are.",
   "To summarize for exam scenarios, match the requirement to the right scope. To survive a single data center failure, use multiple zones. To survive a regional disaster or serve users on different continents, use multiple regions. To meet data residency rules, choose the region or multi-region carefully. To speed up delivery of static content to users far away, use Cloud CDN at the edge."
  ],
  "analogy": "Think of an airline. A region is a hub city, zones are separate terminals at that hub with their own power and staff, and points of presence are the many check-in desks in other cities that feed passengers onto the airline's own planes. If one terminal closes, flights move to another terminal. If the whole hub closes because of a storm, you need a second hub. The analogy stops short in one way: cloud zones are designed and wired to fail independently, which real terminals rarely are.",
  "terms": [
   [
    "Region",
    "An independent geographic area containing multiple zones, such as us-central1."
   ],
   [
    "Zone",
    "An isolated deployment area within a region; a failure domain for zonal resources."
   ],
   [
    "Point of presence (PoP)",
    "An edge location where Google's network connects to other networks near users."
   ],
   [
    "Multi-region",
    "A large geographic area, such as US or EU, containing several regions, used by some storage and database services."
   ],
   [
    "Data residency",
    "A requirement that data be stored in a particular geographic location, often for legal reasons."
   ],
   [
    "Network Service Tiers",
    "Google Cloud's choice between Premium Tier (traffic on Google's network as far as possible) and Standard Tier (lower cost, more public internet routing)."
   ]
  ],
  "example": "An online learning company serves students in Europe and Asia. It runs its app in europe-west1 and asia-southeast1, each across two zones, and uses Cloud CDN for video so content is cached at edge locations near students.",
  "mistakes": [
   [
    "Running in two zones protects against a regional disaster.",
    "Zones are in the same region. Surviving a regional outage requires deploying in at least two regions."
   ],
   [
    "Points of presence are where you run your virtual machines.",
    "PoPs are edge locations where traffic enters Google's network and content can be cached. VMs run in the zones you choose."
   ],
   [
    "Region choice only affects performance.",
    "It also affects data residency, price and carbon footprint."
   ],
   [
    "You need to memorize how many regions Google Cloud has.",
    "The number grows over time. The exam focuses on concepts: regions contain zones, and each scope protects against a different failure."
   ]
  ],
  "tryit": [
   [
    "Fjord Payments, a fictional European payments startup, must keep customer data within the European Union, and its service must keep running even if an entire region fails. Its customers are all in Europe. How should it lay out its deployment?",
    "Deploy in at least two European Union regions, each across multiple zones, and restrict resource locations to the European Union with organization policies. This meets data residency, survives a zone or regional failure, and keeps latency low for European customers."
   ]
  ],
  "tip": "Zones protect against a data center failure; regions protect against a larger regional disaster and help with latency and data location. Edge PoPs are about getting traffic onto Google's network close to users, not about running your VMs.",
  "check": [
   [
    "An app must survive one zone failing. What is the minimum design?",
    "Run instances in at least two zones in the same region, for example with a regional managed instance group."
   ],
   [
    "Name three things region choice affects.",
    "Latency to users, data residency, price and carbon footprint (any three)."
   ],
   [
    "Which kind of location protects against an entire geographic area going offline: a zone or a region?",
    "A second region, because all zones in a region share the same geographic area."
   ]
  ]
 },
 {
  "t": "Network performance basics: bandwidth, latency and choosing locations close to users",
  "hook": "Hana, the support lead at Lumen Games, forwards you a stack of tickets from players in Japan and Australia: 'Lag makes the game unplayable.' The servers are barely busy, sitting at fifteen percent CPU in a single United States region. The players insist their home internet is fast, and speed tests agree. Meanwhile, the data team complains that copying last year's telemetry archive into the cloud is taking weeks over the office connection. Two complaints, both about 'slow network,' and your manager wants one fix by Friday. But are these the same problem at all, and what would actually make each one faster?",
  "simple": "Two ideas explain most network speed problems. Bandwidth is how much data can flow at once, like how wide a water pipe is. Latency is how long it takes for data to make the trip, like how long the pipe is. A wide pipe helps when you send a lot of water, such as copying huge files. A short pipe helps when you send many small sips back and forth, such as clicking around a website or playing an online game. Because distance adds delay, putting your computers closer to the people who use them makes things feel faster. It is like a pizza shop: a bigger oven (bandwidth) lets you make more pizzas at once, but only a shop near your house (low latency) gets one to you quickly.",
  "body": [
   "Two measurements describe most network performance questions. Bandwidth is how much data can be sent per second, like the width of a pipe. Latency is how long it takes a piece of data to travel from one point to another and back, like the length of the pipe. Throughput is the amount of data actually transferred in practice, which depends on both. Latency is usually measured in milliseconds as a round-trip time, the time for a request to reach a server and a reply to come back. A simple `ping` to a server shows this number, while a large file copy reveals the bandwidth available.",
   "Bandwidth matters for large transfers, such as uploading backups, streaming video or moving a data warehouse into the cloud. If a company has a slow internet link, even a small data migration can take weeks. Latency matters for interactive work: every click in a web app, every database query from a distant server, every video call. A page that makes twenty small requests to a server on another continent feels slow even on a fast connection, because each round trip adds delay. The two problems call for different fixes. Buying a faster internet connection helps a slow bulk transfer but does little for a user on another continent, and moving servers closer helps that user but does not speed up a backup over a narrow link.",
   "Very large data moves are a special case. When the volume is so large that even a good connection would take too long, organizations can use an offline option such as Transfer Appliance, a storage device that is shipped to the customer, filled with data and shipped back to Google for upload. For ongoing transfers between storage systems, Storage Transfer Service moves data over the network on a schedule. On the exam, a scenario with huge data and limited bandwidth often points toward these options or toward a higher-bandwidth connection.",
   "Distance is the main driver of latency, because signals in fiber can only travel so fast. That is why the location of your resources matters. Placing an application in a region near most users reduces latency. For global audiences, you can deploy in several regions and use a global load balancer to send users to the nearest healthy backend, and use Cloud CDN, Google Cloud's content delivery network (CDN), to cache static content such as images and videos at Google's edge locations. The global external load balancer in Google Cloud can present a single Internet Protocol (IP) address to users worldwide and route each one to the closest backend that has capacity, so the application's address stays the same while users are served from different regions.",
   "Google's private network also helps. Traffic that enters Google's network at a nearby point of presence travels over Google's backbone rather than hopping between many internet providers, which generally gives more consistent performance. Google Cloud's Premium network tier keeps traffic on this backbone for as much of the route as possible, while the lower-cost Standard tier hands it to the public internet nearer the region.",
   "Connecting an on-premises site to Google Cloud has options too. Cloud VPN, Google Cloud's virtual private network (VPN) service, sends encrypted traffic over the public internet and is quick to set up. Cloud Interconnect provides a private, dedicated or partner-provided connection with higher bandwidth and more predictable latency, suited to heavy hybrid workloads. Within Cloud Interconnect, Dedicated Interconnect is a direct physical connection between the customer's network and Google's, while Partner Interconnect reaches Google through a supported service provider, which suits organizations that are not near a Google connection point or need less capacity.",
   "Choosing locations is therefore a balance of several needs. Latency favors regions near users. Data residency rules may require a particular country or area. Price differs between regions, and some services or machine types are available only in certain regions. For many organizations, the right answer is a primary region close to most users, a second region for resilience, and the edge network and caching to serve everyone else well.",
   "When you read an exam scenario about slowness, look for the clue that separates the two cases. If servers are lightly loaded, users are far away and each action feels sluggish, the problem is latency, and the answer is closer regions, a global load balancer or Cloud CDN. If large transfers crawl while interactive work is fine, the problem is bandwidth, and the answer is a bigger connection, Cloud Interconnect or an offline transfer option."
  ],
  "analogy": "Picture a highway between two cities. Bandwidth is the number of lanes: more lanes let more cars travel at once, which helps when moving a large convoy. Latency is the distance between the cities: even an empty ten-lane highway takes hours if the cities are far apart. To get each car there faster you must move the cities closer, which in the cloud means picking a nearer region or caching at the edge. The analogy simplifies one thing: on networks, congestion and the number of hops between providers also add delay.",
  "terms": [
   [
    "Bandwidth",
    "The maximum amount of data that can be carried per second on a connection."
   ],
   [
    "Latency",
    "The delay for data to travel between two points, usually measured in milliseconds."
   ],
   [
    "Cloud CDN",
    "Google Cloud's content delivery network, which caches content at edge locations near users."
   ],
   [
    "Cloud Interconnect",
    "Private, high-bandwidth connectivity between an on-premises network and Google Cloud."
   ],
   [
    "Throughput",
    "The amount of data actually transferred per second in practice, limited by bandwidth, latency and congestion."
   ],
   [
    "Round-trip time",
    "The time for a request to travel to a destination and for the reply to return."
   ],
   [
    "Transfer Appliance",
    "A physical storage device Google ships to customers to move very large data sets offline."
   ]
  ],
  "example": "A game studio hosts its matchmaking servers in a US region. Players in Japan see delays even though their home connections are fast. The studio deploys servers in an Asian region and routes each player to the closest one, cutting round-trip time sharply.",
  "mistakes": [
   [
    "A faster internet connection will fix slow page loads for users on another continent.",
    "That problem is latency from distance. Deploy closer to users, use a global load balancer or cache with Cloud CDN."
   ],
   [
    "Bandwidth and latency are the same thing measured differently.",
    "Bandwidth is how much data per second; latency is how long each piece takes to arrive. A connection can have high bandwidth and high latency at the same time."
   ],
   [
    "Cloud VPN is the best choice for a heavy hybrid workload needing predictable performance.",
    "Cloud VPN runs over the public internet. Cloud Interconnect provides private connectivity with higher bandwidth and more predictable latency."
   ]
  ],
  "tryit": [
   [
    "Silverline Media must move a very large video archive from its studio to Cloud Storage. Its office internet link is modest, and an estimate shows the network copy would take months. Interactive work in the office is fine. What is the bottleneck and what option fits?",
    "The bottleneck is bandwidth, not latency. An offline option such as Transfer Appliance, or a higher-bandwidth connection such as Cloud Interconnect if transfers will be ongoing, would move the archive much faster."
   ],
   [
    "A retailer's online store runs in one US region. Customers in Southeast Asia report slow page loads, but servers are lightly loaded. What do you recommend?",
    "This is latency. Cache static content with Cloud CDN and consider deploying the application in an Asian region behind a global load balancer so users reach the nearest backend."
   ]
  ],
  "tip": "Slow response with low server load usually points to latency from distance, fixed by choosing closer regions or a CDN. Slow bulk transfers point to limited bandwidth.",
  "check": [
   [
    "What is the difference between bandwidth and latency?",
    "Bandwidth is how much data can move per second; latency is how long each piece takes to arrive."
   ],
   [
    "Name two ways to lower latency for users far from your region.",
    "Deploy in a region closer to them, and cache content at the edge with Cloud CDN (or use a global load balancer to reach the nearest backend)."
   ],
   [
    "What is the difference between Cloud VPN and Cloud Interconnect?",
    "Cloud VPN sends encrypted traffic over the public internet and is quick to set up; Cloud Interconnect is a private, higher-bandwidth connection with more predictable latency."
   ]
  ]
 },
 {
  "t": "Open source, open standards and avoiding vendor lock-in",
  "hook": "The regulator's letter arrives at Tidewater Mutual on a Tuesday, and the chief risk officer forwards it to you with one line: 'Can we answer this?' The letter asks every insurer to show a credible exit plan: if their main cloud provider became unavailable or too expensive, how would they move critical systems elsewhere, and how long would it take? You think about the claims application built on containers, the analytics stored in open file formats, and the one reporting tool that relies on a provider-specific feature nobody else offers. Some of this would move easily. Some would not. What makes the difference, and how should a leader plan for it from the start?",
  "simple": "Vendor lock-in means getting so tied to one company's products that leaving would be very hard or very expensive. Open source software is software whose recipe, the code, is shared publicly so anyone can use it, change it and run it anywhere. Open standards are shared rules that many companies follow, so their products work together. Building on open source and open standards makes it easier to move your systems and data later if you need to. Think of phone chargers: if every phone used a different, special plug, switching phones would mean replacing every cable in your house. When phones share a standard plug, you can switch brands and keep your cables.",
  "body": [
   "Vendor lock-in happens when moving away from a provider becomes so costly or difficult that you are effectively stuck. It can come from proprietary data formats, application programming interfaces (APIs) that exist only on one platform, skills that do not transfer, or contracts. Leaders worry about lock-in because it weakens their negotiating position and makes it harder to adopt better technology later. Lock-in is not always bad in itself. Every technology choice creates some dependence, and a unique service can be worth it. The leadership question is whether the dependence is a deliberate trade-off or an accident discovered later.",
   "Open source software is software whose source code is publicly available to use, change and share under a license. Open standards are published specifications, such as Structured Query Language (SQL) or Hypertext Transfer Protocol (HTTP), that many vendors implement. Building on them means your applications, data and skills can move between environments with less rework. Open source also brings a community: many organizations find and fix bugs, add features and build tools around popular projects, and people with those skills can be hired from a wide market. Open source does not always mean free of cost to run, since organizations still pay for infrastructure, support or staff time.",
   "Google has a long history of creating and contributing to open source projects that are now widely used. Kubernetes, the container orchestration system, began at Google and is now run by the Cloud Native Computing Foundation and available on every major cloud and on-premises. TensorFlow is an open source machine learning framework. Apache Beam, the programming model behind Dataflow, lets the same pipeline run on several engines. Google Cloud also offers managed versions of popular open source systems, such as Cloud SQL for MySQL and PostgreSQL, Dataproc for Apache Spark and Hadoop, and Memorystore for Redis. These managed services matter for portability because the application talks to a familiar engine. An application written for PostgreSQL on-premises can usually move to Cloud SQL for PostgreSQL with modest changes, and back again if needed, because the database engine and its query language are the same.",
   "Containers are a good example of how openness creates portability. A container packages an application with everything it needs to run, using widely adopted open formats, so the same image can run on a laptop, in an on-premises cluster or in any major cloud. Kubernetes then provides a common way to deploy, scale and manage those containers. Together they let organizations write once and run in many places, which is why they appear so often in exam answers about portability.",
   "Openness is a deliberate part of Google Cloud's strategy. It supports hybrid and multicloud designs, lets customers bring existing tools and people, and lowers the risk of adopting the platform. Products such as Google Kubernetes Engine (GKE) Enterprise build on Kubernetes so the same practices apply in Google Cloud, in your own data center and on other clouds. BigQuery Omni follows the same idea for data, allowing analysis of data stored in other clouds without first copying it into Google Cloud.",
   "Openness also affects data. Being able to export data in standard formats, query it with standard SQL and reach services through documented APIs all reduce the cost of change. Leaders should also consider data transfer costs and contract terms when thinking about exit, because moving large volumes of data out of any provider takes time and can incur charges.",
   "Open source is not the only way to reduce lock-in. Clear data export paths, standard file formats such as Parquet or comma-separated values (CSV), and designs that separate business logic from provider-specific services also help. But the exam typically links 'avoid lock-in' and 'portability' with open source and Kubernetes. A sensible approach is to use open technologies by default, adopt provider-specific services where they deliver clear value, and document how each critical system could be moved if needed.",
   "There is a balance to strike. Avoiding every managed or provider-specific service to stay perfectly portable can throw away the agility and reduced operational burden that drew the organization to the cloud. Managed versions of open source software often offer the best of both: the provider runs the infrastructure, while the application still uses an engine that runs elsewhere. On the exam, the answer that pairs managed services with open standards is usually stronger than one that rejects managed services entirely."
  ],
  "analogy": "Open standards are like standard shipping containers. Because every port, ship, train and truck is built to handle the same box, a company can switch shipping lines without repacking its goods. Proprietary formats are like custom crates that only one shipping line can lift. The analogy has a limit: in IT, even with standard containers, the 'goods' may still depend on provider-specific services, so true portability also requires watching which services your applications call.",
  "terms": [
   [
    "Vendor lock-in",
    "Dependence on one provider that makes switching costly or difficult."
   ],
   [
    "Open source",
    "Software whose code is openly available to use, modify and share under a license."
   ],
   [
    "Open standard",
    "A publicly available specification that anyone can implement, such as SQL."
   ],
   [
    "Portability",
    "The ability to move applications and data between environments with little change."
   ],
   [
    "Kubernetes",
    "An open source system, started at Google, for deploying, scaling and managing containerized applications."
   ],
   [
    "Container",
    "A lightweight package of an application and its dependencies that runs the same way in different environments."
   ]
  ],
  "example": "A media company worried about lock-in builds its services as containers on Kubernetes and stores analytics data in open formats. When a regulator later asks for an exit plan, the company can show that the same containers already run in a test cluster in its own data center.",
  "mistakes": [
   [
    "Open source means software that is completely free to run, with no costs.",
    "The code is openly licensed, but organizations still pay for infrastructure, support and staff. The main benefits are transparency, community and portability."
   ],
   [
    "Using any managed cloud service guarantees lock-in.",
    "Managed versions of open source software, such as Cloud SQL for PostgreSQL or GKE for Kubernetes, keep applications portable while the provider runs the infrastructure."
   ],
   [
    "Avoiding lock-in means never using provider-specific services.",
    "It is a trade-off. Use open technologies by default and accept provider-specific services where the value is clear, with a documented exit path."
   ],
   [
    "Kubernetes is a proprietary Google product that only runs on Google Cloud.",
    "Kubernetes started at Google but is open source, governed by the Cloud Native Computing Foundation, and runs on every major cloud and on-premises."
   ]
  ],
  "tryit": [
   [
    "Granite Rail, a fictional rail operator, is choosing a platform for a new scheduling system. Its board insists the system must be able to move to another environment within a year if needed, but the team also wants to avoid running servers. What approach would you recommend?",
    "Build the system as containers on a managed Kubernetes service such as GKE, use a managed open source database such as Cloud SQL for PostgreSQL, and store data in open formats. This keeps operational burden low while the containers, Kubernetes manifests and database engine can run in another environment."
   ]
  ],
  "tip": "When a question mentions portability, flexibility across environments or avoiding lock-in, look for open source, open standards or Kubernetes in the answers.",
  "check": [
   [
    "Which widely used open source project for containers started at Google?",
    "Kubernetes."
   ],
   [
    "Name two Google Cloud services that are managed versions of open source software.",
    "For example Cloud SQL (MySQL, PostgreSQL), Dataproc (Spark, Hadoop), GKE (Kubernetes) or Memorystore (Redis)."
   ],
   [
    "Which Google Cloud service lets the same pipeline code, written with Apache Beam, run as a managed service?",
    "Dataflow."
   ]
  ]
 },
 {
  "t": "Leading digital transformation: culture, skills and change management in a cloud adoption",
  "hook": "Six months into the cloud program at Copperleaf Bank, the dashboards look impressive: forty applications migrated, two data centers scheduled to close. Yet in the quarterly review, the head of retail banking is blunt. 'We still need six weeks of approvals to change a button in the mobile app. What did we actually get?' Nadia, who leads the cloud team, knows the platform can deploy changes in minutes. The bottleneck is the change board, the hand-offs between teams and the fear of being blamed if anything goes wrong. The technology arrived. The way of working did not. What does it take to lead the human side of a cloud transformation?",
  "simple": "Moving to the cloud is not only about new technology. It also means people working in new ways. Teams need new skills, so they need training. Old habits, like long chains of approvals and separate teams that rarely talk, can slow everything down, so the way teams are organized often has to change. People also need to feel safe trying new things without being punished when an experiment fails. Leaders help by explaining why the change matters, paying for training and measuring results that customers notice. It is like a sports team getting a new stadium: the stadium alone does not win games. The players need new training, new plays and a coach who leads them.",
  "body": [
   "Technology is usually the easy part of a cloud adoption. The harder part is people: how teams are organized, how decisions are made, which skills people have and how willing they are to work differently. The Cloud Digital Leader exam is aimed at people who help lead this change, so it expects you to understand the human side. In surveys and case studies, organizations that struggle with cloud adoption often point to skills gaps, unclear ownership and resistance to change rather than technical limits. Leaders who plan for the people side from the start avoid many of these problems.",
   "Traditional IT often works in silos. Developers write code, a separate operations team runs it, security reviews happen at the end, and every change needs several approvals. The cloud makes it possible to work in smaller, cross-functional teams that own a product end to end, automate testing and releases, and ship small changes often. If the old processes stay, the new platform delivers little benefit. This new way of working is often called DevOps, a set of practices that brings development and operations together so that teams build, test, release and run software as one continuous flow. Automation in the cloud makes it practical, but only if approval processes and team boundaries change to match.",
   "Culture matters as much as structure. Organizations that transform well encourage experimentation and treat failed experiments as learning, not blame. They make decisions with data rather than opinion, share information openly and give teams autonomy within clear guardrails. Google's own practices, such as blameless postmortems in Site Reliability Engineering, are examples of this culture. In a blameless postmortem, a team writes up what happened during an incident, why the system allowed it and what will change, without naming a person as the cause. The goal is to fix the system, so people report problems early instead of hiding them.",
   "Skills are a common barrier. Teams need training in cloud concepts, security, data and new ways of working. Many organizations create a cloud center of excellence, a small group of experts who set standards, build shared foundations and help other teams adopt the cloud. Certifications and hands-on labs are part of building that capability across the business, not only in IT. Training plans work best when they are tied to real projects. A team that learns about managed databases while migrating its own application retains far more than one that sits through a course with no follow-up. Business staff also benefit from cloud literacy, since product managers, finance and legal teams make decisions that depend on how the cloud works.",
   "Google Cloud offers a structured way to think about this journey, the Google Cloud Adoption Framework. It looks at cloud maturity across four themes: Learn, which is about building skills; Lead, which is about sponsorship, team structure and how change is driven; Scale, which is about automating and standardizing operations; and Secure, which is about protecting the organization. For each theme, an organization can assess whether it is at a tactical phase, where individual workloads move with little long-term plan, a strategic phase, with a broader vision and governance, or a transformational phase, where the cloud is part of how the business innovates every day.",
   "Resistance to change is normal and deserves respect rather than frustration. People may worry about job security, losing expertise they spent years building, or extra work during the transition. Good change management addresses these concerns directly: it explains what will change and why, involves people early, offers reskilling paths, celebrates early wins and gives teams time to learn. Communication should be frequent and two-way, so leaders hear where the real obstacles are.",
   "Leadership support and change management tie it together. Leaders set a clear vision of why the change matters for customers, sponsor the effort, fund training, and measure outcomes such as release frequency, customer satisfaction or time to insight, not just servers migrated. Collaboration tools such as Google Workspace also support the change by making it easier for distributed teams to work together in real time. Useful measures for software delivery include how often a team deploys, how long a change takes to reach production, how often changes cause failures and how quickly service is restored after a problem. Improving these numbers shows that the organization is changing how it works, not only where its servers run.",
   "For the exam, remember the pattern behind most culture questions. If a scenario describes modern technology but slow results, the answer is usually about people, process or structure: training, cross-functional teams, automation of approvals, a cloud center of excellence or executive sponsorship. Answers that propose buying more resources or switching providers rarely fix a cultural problem."
  ],
  "analogy": "A cloud transformation is like a hospital moving into a modern new building. The new building has better equipment, but if doctors still fill in paper forms, departments still refuse to share information, and every decision waits for one administrator, patients see little benefit. The move pays off only when routines, training and teamwork change too. The analogy differs in one way: cloud environments can be rebuilt and improved continuously, so the cultural change is ongoing rather than a one-time move-in day.",
  "mnemonic": "The four themes of the Google Cloud Adoption Framework: 'Learn to Lead, then Scale Securely' = Learn, Lead, Scale, Secure.",
  "terms": [
   [
    "Cloud center of excellence",
    "A cross-functional team that sets cloud standards, builds shared foundations and helps other teams adopt the cloud."
   ],
   [
    "Silo",
    "A team or department that works in isolation from others, slowing hand-offs and decisions."
   ],
   [
    "Change management",
    "A structured approach to helping people and organizations adopt new ways of working."
   ],
   [
    "Blameless culture",
    "Reviewing failures to learn and improve systems rather than to punish individuals."
   ],
   [
    "DevOps",
    "Practices that bring development and operations together to build, release and run software continuously, supported by automation."
   ],
   [
    "Google Cloud Adoption Framework",
    "A Google Cloud model for assessing cloud maturity across the themes Learn, Lead, Scale and Secure, and the phases tactical, strategic and transformational."
   ]
  ],
  "example": "A bank moves several apps to Google Cloud but still needs six weeks of approvals for every release. After creating product teams with developers, operations and security together, automating deployments and forming a cloud center of excellence, it moves to weekly releases.",
  "mistakes": [
   [
    "If a cloud migration is not delivering results, the fix is more or bigger cloud resources.",
    "When technology is in place but outcomes are poor, the cause is usually culture, skills, team structure or processes."
   ],
   [
    "A blameless culture means nobody is accountable.",
    "Teams remain accountable for improving systems. Blameless reviews focus on how the system allowed the failure, so people share information openly."
   ],
   [
    "Cloud skills only matter for the IT department.",
    "Business, finance, legal and product teams make decisions that depend on the cloud, so cloud literacy across the organization supports transformation."
   ],
   [
    "Success is measured by the number of servers migrated.",
    "Better measures are business outcomes such as release frequency, time to insight and customer satisfaction."
   ]
  ],
  "tryit": [
   [
    "Birchfield Retail has moved its e-commerce site to Google Cloud. Developers can deploy automatically, but every release still waits for a monthly change board, and operations staff, who were not trained, often roll changes back because they do not understand the new platform. The CIO asks for two actions with the biggest impact. What do you suggest?",
    "First, train operations staff on the new platform and form cross-functional product teams that own releases end to end. Second, replace the monthly change board with automated testing and smaller, frequent releases within clear guardrails. Both address process and skills, which are the real bottlenecks."
   ]
  ],
  "tip": "When the technology is in place but results are poor, the answer is usually about culture, skills, team structure or processes, not about buying more cloud resources.",
  "check": [
   [
    "What does a cloud center of excellence do?",
    "It sets standards and best practices, builds shared foundations such as the resource hierarchy and security guardrails, and helps other teams adopt the cloud."
   ],
   [
    "Why does a blameless culture help transformation?",
    "People report and learn from failures openly, which encourages experimentation and improves systems instead of hiding problems."
   ],
   [
    "What are the four themes of the Google Cloud Adoption Framework?",
    "Learn, Lead, Scale and Secure."
   ]
  ]
 },
 {
  "t": "Why data matters: using data to drive decisions, products and innovation",
  "hook": "Ellis, the operations director at Meadowbrook Grocers, slides a printout across the table. It is a list of twelve systems: the tills, the loyalty app, the warehouse database, supplier spreadsheets, a weather feed someone subscribed to years ago. 'We have more data than ever,' he says, 'and I still find out a store ran out of charcoal on a sunny Saturday from an angry customer on social media.' Each system belongs to a different team, uses its own format and answers questions only for its owner. The data exists. The insight does not. Why does data so often fail to turn into better decisions, and what changes when it does?",
  "simple": "Every business collects information, such as sales, website visits, customer messages and readings from machines. On its own, this information just takes up space. It becomes valuable when people use it to make better choices, improve what they sell or create something new. The trouble is that data is often scattered across different teams and systems that do not talk to each other, a bit like puzzle pieces kept in different boxes in different rooms. The cloud helps by giving one place with plenty of room and powerful tools to bring the pieces together, clean them up and see the picture. For example, a café that combines its sales records with the weather forecast can bake more iced drinks on hot days and waste less.",
  "body": [
   "Every organization generates data: sales transactions, website clicks, sensor readings, support tickets, documents and more. On its own this data is just a cost to store. It becomes valuable when it is turned into insight that changes a decision, improves a product or creates something new. The Cloud Digital Leader exam treats data as a strategic asset and asks how Google Cloud helps unlock its value. Thinking of data as an asset changes how leaders treat it. Like any asset, it needs investment, care and clear ownership, and its value depends on how well it is used rather than how much of it is stored.",
   "Data creates value in a few broad ways. It improves decisions: a retailer that sees sales by store and hour can plan staffing and stock better than one relying on intuition. It improves customer experiences: recommendations, personalized offers and faster support all depend on data. It improves operations: predictive maintenance uses sensor data to fix machines before they break. And it enables new products and business models, such as selling insights or building artificial intelligence (AI) features. Notice that each example connects data to an action. A dashboard nobody acts on creates little value; a forecast that changes how many trucks leave the warehouse each morning creates a lot.",
   "Getting there is harder than it sounds. Data is often scattered across silos, in different formats, owned by different teams and of uneven quality. Older on-premises systems may not be able to store or process it at the scale needed, or may take hours to answer a question. Much of the most useful data is unstructured, such as images and text, which traditional tools handle poorly. Timing is another obstacle. A report that arrives the following week cannot help a store manager restock today. Many modern uses, such as fraud detection or live inventory, need data processed in seconds or minutes, which batch-oriented legacy systems were not built to do.",
   "Data comes in different shapes, and that affects which tools fit. Structured data fits neatly into rows and columns, such as transactions in a sales table. Semi-structured data has some organization but a flexible layout, such as JavaScript Object Notation (JSON) messages from an app. Unstructured data, such as photos, audio, video, emails and documents, has no fixed format. Traditionally most analysis focused on structured data, but much of an organization's information is unstructured, and modern cloud and AI services make it possible to extract value from all three.",
   "The cloud helps by removing limits on storage and processing, and by offering managed services along the whole data journey. Data is ingested from many sources, stored in a suitable system, processed and cleaned, analyzed and visualized, and increasingly used to train and run machine learning (ML) models. Google Cloud offers services for each step, which later lessons cover: Cloud Storage and databases, Pub/Sub and Dataflow, BigQuery, Looker and Vertex AI. BigQuery, for example, is a serverless data warehouse, so teams can analyze very large data sets with familiar SQL without managing any servers, and Looker turns the results into dashboards and shared business definitions that everyone can use.",
   "Bringing data together is what unlocks the biggest gains. When sales, inventory, weather and customer data sit in the same analytics platform, questions that once needed weeks of manual work across teams become a single query. Combining internal data with external sources, such as public data sets or partner data, can reveal patterns no single system could show. This is why exam scenarios that ask how to get more value from data so often point toward breaking down silos and centralizing analytics.",
   "A data-driven culture matters too. Tools are only useful if people trust the data, can find it, and are encouraged to use it. That is why governance and accessibility are part of the exam's data section, not only technology. Governance means knowing what data exists, who owns it, how good it is and who may use it, and applying rules for privacy and security. Accessibility means the right people can find and use trusted data without waiting for a specialist. Balancing the two lets an organization move fast without losing control.",
   "When you see a data question on the exam, think in terms of the business outcome first. Ask what decision, product or experience the organization wants to improve, what data it needs, where that data currently lives, and which step of the data journey is the bottleneck. The best answer usually removes silos, makes data accessible to the people who need it, and uses managed cloud services so the organization can focus on insight rather than infrastructure."
  ],
  "analogy": "Raw data is like crude oil. It has potential value, but nobody can drive a car on it until it has been extracted, transported, refined and delivered to a pump. Data pipelines, warehouses and analytics tools are the refinery and distribution network that turn raw data into something people can use. The analogy stops working in one important way: unlike oil, data is not used up when you use it, so the same data can fuel many decisions and products at once.",
  "terms": [
   [
    "Data-driven decision",
    "A choice based on analysis of data rather than intuition or habit alone."
   ],
   [
    "Data silo",
    "Data held by one team or system that others cannot easily access or combine."
   ],
   [
    "Data pipeline",
    "The automated flow that moves data from sources through processing to where it is used."
   ],
   [
    "Insight",
    "An understanding gained from data that can guide an action."
   ],
   [
    "Structured data",
    "Data organized in a fixed format of rows and columns, such as a sales table."
   ],
   [
    "Unstructured data",
    "Data without a fixed format, such as images, audio, video and free text."
   ],
   [
    "BigQuery",
    "Google Cloud's serverless data warehouse for analyzing large data sets with SQL."
   ]
  ],
  "example": "A grocery chain combines till data, weather forecasts and local events in BigQuery. It learns that barbecue products sell three times faster on sunny weekends near parks, and it adjusts deliveries to those stores, cutting both waste and empty shelves.",
  "mistakes": [
   [
    "Collecting more data automatically creates more value.",
    "Data creates value only when it is turned into insight that changes an action. Storing more without using it mainly adds cost."
   ],
   [
    "The main obstacle to using data is a lack of storage.",
    "The bigger obstacles are silos, inconsistent formats, poor quality, slow processing and a culture that does not trust or use data."
   ],
   [
    "Only structured data in databases is useful for analysis.",
    "Unstructured data such as images, text and audio holds much of an organization's information, and cloud and AI services can extract value from it."
   ],
   [
    "Data governance slows organizations down, so it should be minimized.",
    "Good governance builds trust in data and protects privacy, which makes people willing to use it. The goal is balance with accessibility."
   ]
  ],
  "tryit": [
   [
    "Oakridge Clinics keeps appointment data in one system, patient feedback in a survey tool and staffing rosters in spreadsheets. Leaders want to understand why some clinics have long waits, but each team can only see its own data, and combining it by hand takes weeks. What is the core problem, and what approach would you recommend?",
    "The core problem is data silos. Bringing the data together in a cloud analytics platform such as BigQuery, with appropriate governance and access controls for sensitive health data, would let leaders analyze waits against staffing and feedback in one place and act on the results quickly."
   ]
  ],
  "tip": "Exam scenarios about 'unlocking value from data' usually point to breaking down silos, bringing data together in the cloud and making it accessible, not simply storing more of it.",
  "check": [
   [
    "Give three ways data creates business value.",
    "Better decisions, better customer experiences, more efficient operations, and new products or business models (any three)."
   ],
   [
    "Why do data silos reduce value?",
    "Data that cannot be combined or accessed across teams cannot give a complete picture, so insights are missed or inconsistent."
   ],
   [
    "Give an example of unstructured data a business might analyze.",
    "Customer emails, call recordings, product photos, social media posts or scanned documents."
   ]
  ]
 },
 {
  "t": "Structured, semi-structured and unstructured data",
  "hook": "It is your second week as a data analyst at Bluewater Home Insurance, and your manager, Dev, forwards you a request from the claims director: 'Find out why claims in coastal towns take twice as long to settle.' You open the shared drive and find three very different things. There is a neat policy table with the same columns on every row. There is a folder of app event logs where every line looks slightly different. And there are forty thousand photos of water-damaged kitchens. Dev asks which of these you can query this afternoon and which will need more work first. You realize the answer depends on what shape each kind of data is in. So how do you tell them apart, and where should each one live?",
  "simple": "Data comes in three rough shapes. Structured data is like a tidy spreadsheet: every row has the same columns, such as name, date and amount, so it is easy to sort and search. Semi-structured data has labels but no fixed layout, like a stack of order slips where each slip lists its own items with labels, and some slips have extra notes the others do not. Unstructured data has no labels at all: photos, videos, voice recordings and free-written letters. A person can understand them, but a computer needs extra help, often from artificial intelligence, to pull facts out of them. Knowing the shape helps you pick the right place to store the data and the right tool to study it.",
  "body": [
   "Data comes in different shapes, and the shape decides where it is best stored and how it is analyzed. The Cloud Digital Leader exam expects you to recognize the three main types, structured, semi-structured and unstructured, and to match each one to suitable Google Cloud services. This matters for business leaders because the wrong match wastes money and slows down every project that depends on the data.",
   "Structured data fits a fixed schema of rows and columns, where every record has the same fields with defined types. A schema is simply the agreed layout: which fields exist, what type each one is and how tables relate. Customer tables, orders, bank transactions and inventory records are structured. If you looked at an orders table you would see columns such as `order_id`, `customer_id`, `order_date` and `total`, and every row would fill them in the same way. Because the layout is predictable, structured data is easy to query with Structured Query Language (SQL), the standard language for asking questions of tables. It is typically stored in relational databases such as Cloud SQL, AlloyDB or Spanner when an application uses it day to day, or in a data warehouse such as BigQuery for analysis.",
   "Semi-structured data has some organization, such as tags or keys, but not a rigid schema. Different records can have different fields, and fields can be nested inside other fields. JavaScript Object Notation (JSON) documents, Extensible Markup Language (XML) files, application logs and many event messages are semi-structured. Picture two JSON order records: one has a `gift_message` field and a list of three items, while the next has no gift message, one item and a `coupon_code`. Both are clearly orders, and both carry labels that say what each value means, but they do not share an identical layout. Document databases such as Firestore store this kind of data naturally, and BigQuery can store and query nested and repeated fields and JSON as well, so semi-structured data can still be analyzed with SQL.",
   "Unstructured data has no predefined model: images, video, audio, emails, Portable Document Format (PDF) files, scanned documents and free text. It makes up most of the data organizations create, which is why it is such a large opportunity. A photo of a damaged car carries a great deal of information, but nothing in the file says 'front bumper, moderate damage' in a field you can filter on. Unstructured data is usually stored as objects in Cloud Storage, which can hold files of any type and size cheaply.",
   "To analyze unstructured data you often need artificial intelligence (AI), usually reached through an application programming interface (API), which is a way for one program to call a service offered by another. The Vision API can label images or read text in them, Speech-to-Text can transcribe recorded calls, and the Natural Language API can find sentiment or entities, such as people, places and products, in text. Once processed, the results become structured data you can query: a column for the detected damage type, a column for call sentiment, a column for the product named in a complaint. This step, turning unstructured content into structured insight, is one of the main ways AI creates business value from data that used to sit unused.",
   "The line between the types is not always sharp, and one project often uses all three. A customer support system might hold structured ticket records, semi-structured JSON event logs and unstructured call recordings. A log file is a good borderline example: each line may have a timestamp and severity in fixed positions, followed by a free-text message. Rather than arguing over labels, ask the practical question: does every record follow one fixed layout, do records carry their own labels but vary, or is there no labeling at all?",
   "Choosing the right storage for each type, and connecting them for analysis, is a core part of data transformation on Google Cloud. A common pattern is to land raw files of every kind in Cloud Storage, keep application records in a relational or document database, and bring cleaned results together in BigQuery, where analysts can join the structured tables with the structured output of AI models. For the exam, focus on recognizing the type from a description and picking the matching service, rather than on technical details of file formats."
  ],
  "analogy": "Think of a household's paperwork. Structured data is the bank statement: every line has a date, a description and an amount in the same columns. Semi-structured data is a pile of receipts: each one has labeled items and totals, but different stores print different fields. Unstructured data is the box of family photos and handwritten letters: full of meaning, but nothing is labeled. The analogy stops short in one way: in the cloud, AI services can 'read' the photo box and produce labeled facts, which no filing cabinet can do.",
  "terms": [
   [
    "Structured data",
    "Data organized in a fixed schema of rows and columns, easily queried with SQL."
   ],
   [
    "Semi-structured data",
    "Data with tags or keys but a flexible schema, such as JSON, XML or logs."
   ],
   [
    "Unstructured data",
    "Data with no predefined model, such as images, video, audio, PDFs and free text."
   ],
   [
    "Schema",
    "The definition of the fields, types and relationships in a data set."
   ],
   [
    "Nested field",
    "A field that contains other fields or a list, common in JSON and supported by BigQuery."
   ]
  ],
  "example": "An insurer stores policy records in Cloud SQL (structured), mobile app events as JSON in BigQuery (semi-structured) and photos of car damage in Cloud Storage (unstructured). It runs the photos through an image model and saves the results as structured fields, such as damage type and severity, for claims analysis.",
  "mistakes": [
   [
    "JSON is unstructured because it is not a table.",
    "JSON is semi-structured: it carries keys that label each value, even though records can differ. Unstructured data has no labels at all, like images or audio."
   ],
   [
    "Unstructured data cannot be analyzed, so it is not worth keeping.",
    "It can be analyzed once AI services such as Vision, Speech-to-Text or Natural Language extract structured facts from it. It is often the largest untapped source of insight."
   ],
   [
    "Each type of data needs its own completely separate system that cannot be combined.",
    "Projects routinely combine all three. BigQuery can query structured tables, nested JSON fields and the structured output of AI models together."
   ]
  ],
  "tryit": [
   [
    "A retail chain collects three things: daily sales totals per store with fixed columns, customer reviews typed as free text on its website, and clickstream events in JSON where different events carry different fields. The chief marketing officer wants to know which of these needs AI processing before it can be counted in a dashboard. What do you tell her?",
    "The free-text reviews. They are unstructured, so a service such as the Natural Language API is needed to extract sentiment or topics into structured fields. The sales totals are structured and ready for SQL, and the JSON clickstream is semi-structured, which BigQuery can query directly using its JSON and nested-field support."
   ]
  ],
  "tip": "Images, video, audio and documents are unstructured and usually go in Cloud Storage. JSON and logs are semi-structured. Tables with fixed columns are structured. If an answer mentions extracting insight from photos, calls or free text, look for an AI API in the answer choices.",
  "check": [
   [
    "Is a JSON order record with optional fields structured, semi-structured or unstructured?",
    "Semi-structured: it has keys but not a rigid schema."
   ],
   [
    "Where is unstructured data such as video usually stored in Google Cloud?",
    "In Cloud Storage, as objects in a bucket."
   ],
   [
    "How does AI help with unstructured data?",
    "AI services such as Vision, Speech-to-Text and Natural Language extract labels, text or sentiment, turning the content into structured data that can be queried."
   ]
  ]
 },
 {
  "t": "Databases, data warehouses and data lakes: what each is for",
  "hook": "At Northgate Regional Airlines, the chief data officer, Amara, has three requests on her desk by 9 a.m. The booking team says the reservation system slows down every time finance runs its quarterly revenue report against it. Finance says the report takes four hours and still misses the cargo data. And the engineering team wants somewhere to keep years of raw engine-sensor files 'just in case' a machine learning project needs them. Someone in the hallway suggests buying one bigger database to fix everything. Amara suspects the real problem is that one kind of store is being asked to do three different jobs. Which store fits which job, and why does mixing them cause trouble?",
  "simple": "Organizations keep data in three main kinds of places, each built for a different job. A database is like a shop's cash register: it handles lots of small, quick actions all day, such as recording a sale or updating an address. A data warehouse is like the accountant's office: it gathers cleaned-up records from every register and branch so people can ask big questions, such as how sales changed over five years. A data lake is like a large, cheap storage unit: you put everything in it, in its original form, from receipts to photos to sensor readings, and sort it out later when you need it. Most companies use all three, because each does its own job best.",
  "body": [
   "Three kinds of data store appear again and again in the Cloud Digital Leader exam: databases, data warehouses and data lakes. They are not rivals. Most organizations use all three for different jobs, and many exam questions are really asking you to recognize which job a scenario describes. Getting this right matters because a store tuned for one job performs poorly, or costs too much, when forced to do another.",
   "A database is built to support applications with many small, fast reads and writes of current data. This is called online transaction processing (OLTP): placing an order, updating an account balance, saving a user profile, reserving a seat. Each operation touches only a few rows, but there may be thousands of them per second, and every one must be correct. Relational databases such as Cloud SQL, AlloyDB and Spanner use tables and Structured Query Language (SQL) and enforce consistency with transactions, so a payment is either fully recorded or not recorded at all. Non-relational or NoSQL databases such as Firestore and Bigtable use other models, such as documents or wide columns, for flexibility or massive scale.",
   "A data warehouse is built for analysis. It collects cleaned, structured data from many sources, often including years of history, and is optimized for complex queries that scan large amounts of data. This is known as online analytical processing (OLAP). Questions like 'What were sales by region and product for the last five years?' or 'Which routes lose money in winter?' belong in a warehouse. Running such queries directly against an application's database competes with customers for the same resources, which is exactly why the airline's booking system slowed down. BigQuery is Google Cloud's serverless data warehouse: there is no infrastructure to manage, and it scales to very large data sets.",
   "A data lake stores large volumes of raw data in its original format, whether structured, semi-structured or unstructured, cheaply and at scale. Data is kept first and given structure later, when it is used. This is called schema on read, in contrast to a warehouse, where data is shaped to a schema as it is loaded (schema on write). Data lakes support data science, machine learning (ML) and future uses that are not yet known. Because nothing is thrown away, a team can return to old raw data and analyze it in a new way. In Google Cloud, Cloud Storage is the usual foundation for a data lake. The risk is that, without cataloging and governance, a lake can become a 'data swamp' where nobody can find or trust anything.",
   "It helps to compare the three side by side. A database holds current operational data and answers small, precise questions very quickly, such as 'What is this customer's balance right now?' A warehouse holds cleaned, integrated history and answers broad analytical questions across the business. A lake holds raw data of every type and supports exploration, data science and ML. Data often flows between them: transactions are written to a database, copied into a lake in raw form, and then cleaned and loaded into a warehouse for reporting.",
   "Cost and speed also differ in ways that matter to business leaders. Operational databases are sized to stay responsive at peak load, so storing many years of history in them is expensive and slows them down. A warehouse such as BigQuery stores data in a columnar format and separates storage from compute, so large historical data sets stay affordable and analysts pay mainly for the queries they run. A lake on Cloud Storage is cheaper still per gigabyte, and colder storage classes reduce the price further for data that is rarely touched, which is why raw archives and future ML training data usually live there.",
   "The approaches increasingly overlap. A lakehouse combines the low-cost, open storage of a lake with the governance and SQL performance of a warehouse. In Google Cloud, BigQuery can query data stored in Cloud Storage in open formats, and governance tools such as Dataplex can manage both together. For the exam, you do not need deep technical detail on lakehouses; recognize the idea that organizations want the flexibility of a lake and the trusted analytics of a warehouse without copying data back and forth.",
   "To choose, ask what the data is for. Running an application's day-to-day transactions: database. Analyzing clean data from many sources for reports and dashboards: warehouse. Keeping large amounts of raw data of many types for later processing and ML: lake. When a scenario mentions a slow application during reporting, the usual answer is to move analytics out of the operational database and into a warehouse such as BigQuery."
  ],
  "analogy": "Think of a restaurant. The database is the order pad at the counter: fast, precise, always current, handling one order at a time. The data warehouse is the owner's monthly ledger: cleaned and organized so she can compare months and branches. The data lake is the walk-in storeroom where every delivery is kept as it arrived, to be prepared later in whatever dish is needed. The analogy weakens in one place: in Google Cloud, BigQuery can query the storeroom directly, so the lake and warehouse are not always separate rooms.",
  "terms": [
   [
    "Database (OLTP)",
    "A store optimized for many small, fast transactions that run an application."
   ],
   [
    "Data warehouse (OLAP)",
    "A store optimized for analytical queries over large amounts of structured, historical data."
   ],
   [
    "Data lake",
    "A repository of raw data of any type, stored in its original format for later processing."
   ],
   [
    "Schema on read",
    "Applying structure to data only when it is read and processed, as in a data lake."
   ],
   [
    "Lakehouse",
    "An approach combining data lake storage with warehouse-style management and SQL analytics."
   ]
  ],
  "example": "An airline's booking app writes every reservation to a relational database. Each night the bookings are loaded into BigQuery, where analysts study routes and pricing without slowing the booking app. Raw flight-sensor files and maintenance photos are kept in a Cloud Storage data lake for engineers to use in machine learning projects.",
  "mistakes": [
   [
    "A data warehouse is just a bigger database, so you can run reports on the application database instead.",
    "Warehouses are optimized for large analytical scans across many sources; databases are optimized for small, fast transactions. Running heavy reports on an OLTP database slows the application for customers."
   ],
   [
    "A data lake only holds unstructured data.",
    "A lake holds raw data of every type, structured, semi-structured and unstructured, in its original format."
   ],
   [
    "You must pick one of the three stores for the whole organization.",
    "Most organizations use all three for different jobs, and data often flows from database to lake to warehouse."
   ]
  ],
  "tryit": [
   [
    "A hospital network's patient scheduling app becomes slow every Monday morning, when managers run reports on last week's appointments across all clinics directly against the scheduling database. The IT director proposes upgrading the database server. What would you recommend instead, and why?",
    "Move the reporting workload to a data warehouse such as BigQuery, loading appointment data from the scheduling database on a schedule. The database is built for OLTP and should serve the app; the warehouse is built for analytical queries across clinics. A bigger server only postpones the conflict."
   ]
  ],
  "tip": "If the scenario is about an application's day-to-day transactions, choose a database. If it is about analysis and reporting across sources, choose a warehouse (BigQuery). If it is about storing raw data of mixed types cheaply for future use or ML, choose a lake (Cloud Storage).",
  "check": [
   [
    "Which store is best for analyzing five years of sales from many systems?",
    "A data warehouse such as BigQuery."
   ],
   [
    "What does 'schema on read' mean in a data lake?",
    "Data is stored raw, and structure is applied only when someone reads and processes it."
   ],
   [
    "Which Google Cloud service is the usual foundation for a data lake?",
    "Cloud Storage."
   ]
  ]
 },
 {
  "t": "Cloud Storage and its storage classes: Standard, Nearline, Coldline and Archive",
  "hook": "The monthly cloud bill lands in the inbox of Teresa, finance lead at Cedar & Pine Law Group, and one line has tripled. She walks over to Jonah in IT, who explains proudly that he moved all the firm's documents to the cheapest storage option to save money. Teresa frowns. 'Then why are we paying more?' Jonah pulls up the report and sees thousands of retrieval charges: paralegals open active case files dozens of times a day, and every open costs extra in the class he chose. Meanwhile, decades of closed cases still sit in the most expensive tier. Both of them are now wondering the same thing: how do you match each file to the right storage class?",
  "simple": "Cloud Storage is a place to keep files of any kind in Google's data centers, organized into containers called buckets. You choose a storage class for your files based on how often you will open them. Standard is for files you use all the time: it costs the most to keep but nothing extra to open. Nearline, Coldline and Archive are for files you open less and less often: they are cheaper to keep, but you pay a fee each time you read them, and you are charged for a minimum period even if you delete them early. It is like a gym locker versus a storage unit across town: the locker costs more each month, but you can grab things for free any time.",
  "body": [
   "Cloud Storage is Google Cloud's object storage service. It stores any kind of file, called an object, in containers called buckets. An object can be a photo, a video, a backup file, a log export or a data set for machine learning (ML), and it is stored together with metadata such as its name, size and content type. Cloud Storage is designed for very high durability, scales without capacity limits you need to plan for, and is used for website content, backups, data lakes, media, and data for analytics and ML. Objects are reached through the Google Cloud console, the `gcloud storage` command-line tool, client libraries or the JSON and XML application programming interfaces (APIs) over HTTPS (Hypertext Transfer Protocol Secure).",
   "When you create a bucket you choose a location type, and this decision affects availability, performance and price. A regional bucket keeps data in one region, which suits data used by compute in that same region, such as files processed by virtual machines or analytics jobs nearby. A dual-region or multi-region bucket stores data redundantly across a larger geographic area, giving higher availability and geographic redundancy for content served widely, such as images on a global website. Location choices can also matter for data residency rules that require data to stay in a particular country or area.",
   "You also choose a default storage class for the bucket, which trades storage price against access cost. Individual objects can have their own class, but most designs start from the bucket default. There are four classes, and each one is aimed at a different access pattern. Thinking in terms of how often data is read, not how important it is, is the key to choosing correctly.",
   "Standard is for frequently accessed, or hot, data such as website images, files being actively edited or data being processed by analytics jobs. It has the highest storage price but no minimum storage duration and no retrieval fees, so you can read it as often as you like without extra charges. Nearline is for data accessed about once a month or less, such as recent backups, with a 30-day minimum storage duration. Coldline is for data accessed about once a quarter, such as disaster recovery copies, with a 90-day minimum. Archive is for data accessed less than once a year, such as long-term backups and regulatory records, with a 365-day minimum and the lowest storage price.",
   "Two points are often tested. First, all four classes give the same fast access to data when you read it. Unlike tape-based archives that may take hours to restore, Archive data in Cloud Storage is available in milliseconds; the trade-off is cost, not speed. Second, colder classes charge retrieval fees each time data is read and early-deletion charges if you delete data before the minimum duration. If you delete a Coldline object after 30 days, you are still billed as if it had been stored for 90. So putting frequently read data in a cold class can cost more, not less, which is exactly what happened to the law firm in the opening scene.",
   "Managing classes by hand does not scale, so Cloud Storage offers automation. Object Lifecycle Management rules can change an object's class or delete it automatically based on conditions such as age, for example move logs to Coldline after 90 days and delete them after five years. In the console, a lifecycle rule reads like a simple sentence: an action, such as 'Set storage class to Archive' or 'Delete object', and a condition, such as 'Age is greater than 365 days'. Autoclass is a bucket setting that moves objects between classes automatically based on how they are actually accessed, which helps when access patterns are unpredictable.",
   "Cloud Storage also includes protection features that support governance and compliance. Object versioning can keep older copies when files are overwritten or deleted, and retention policies can prevent objects from being deleted before a set time, which helps with legal and regulatory record keeping. Access is controlled with Identity and Access Management (IAM) at the bucket level, and data is encrypted at rest by default.",
   "For the exam, think like an advisor. Identify how often the data will be read, how long it must be kept and whether access is predictable. Daily use points to Standard, monthly to Nearline, quarterly to Coldline and less than yearly to Archive, with lifecycle rules or Autoclass to move data as it cools."
  ],
  "analogy": "Storage classes work like places to keep belongings. Standard is your bedroom closet: the rent per square foot is high, but grabbing a shirt is free. Nearline and Coldline are a garage and a basement storage unit. Archive is a cheap storage unit with a one-year contract and a fee every time you visit. Where the analogy breaks: unlike a distant storage unit, Archive in Cloud Storage hands you your item instantly. The difference is the fee, not the travel time.",
  "mnemonic": "From hot to cold, 'Students Need Coffee Always' = Standard, Nearline, Coldline, Archive. The minimum storage durations climb in the same order: none, 30, 90 and 365 days.",
  "terms": [
   [
    "Bucket",
    "A container for objects in Cloud Storage, with a name, location and default storage class."
   ],
   [
    "Object",
    "A file stored in Cloud Storage together with its metadata."
   ],
   [
    "Storage class",
    "A setting that trades storage price against access cost: Standard, Nearline, Coldline or Archive."
   ],
   [
    "Minimum storage duration",
    "The period you are billed for even if you delete an object earlier: 30, 90 and 365 days for Nearline, Coldline and Archive."
   ],
   [
    "Object Lifecycle Management",
    "Rules that automatically change the storage class of objects or delete them based on conditions such as age."
   ],
   [
    "Autoclass",
    "A bucket setting that automatically moves objects between storage classes based on actual access."
   ]
  ],
  "example": "A law firm keeps active case files in Standard, moves closed cases to Coldline after six months with a lifecycle rule, and moves them to Archive after two years, where they stay for the legally required retention period at the lowest storage cost. A retention policy prevents early deletion.",
  "mistakes": [
   [
    "Archive is slow, like tape, and takes hours to restore.",
    "Archive in Cloud Storage returns data in milliseconds, just like Standard. The trade-off is higher retrieval cost and a 365-day minimum, not speed."
   ],
   [
    "The coldest class is always the cheapest choice.",
    "Colder classes charge retrieval fees and early-deletion charges. Frequently read data costs more in a cold class than in Standard."
   ],
   [
    "You must move objects between classes manually.",
    "Object Lifecycle Management rules and Autoclass can change classes automatically based on age or actual access."
   ]
  ],
  "tryit": [
   [
    "A video studio keeps raw footage that editors use heavily for about two weeks after a shoot. After that, footage is reopened maybe once or twice a quarter for re-edits, and it must be kept for seven years. The studio wants the lowest total cost with the least manual work. What storage approach do you recommend?",
    "Upload new footage to Standard, then use an Object Lifecycle Management rule to move it to Coldline after the active period (quarterly access fits Coldline) and perhaps to Archive later, deleting it after seven years. Standard avoids retrieval fees during heavy editing, and the lifecycle rule removes manual work. If access patterns are unpredictable, Autoclass is an alternative."
   ]
  ],
  "tip": "Match access frequency: daily use is Standard, monthly is Nearline, quarterly is Coldline, less than yearly is Archive. Remember that Archive still returns data in milliseconds; the trade-off is cost, not speed.",
  "check": [
   [
    "What is the minimum storage duration for Coldline?",
    "90 days."
   ],
   [
    "Why might storing frequently read data in Archive cost more than Standard?",
    "Archive has retrieval fees on every read and a 365-day minimum, so frequent reads outweigh the lower storage price."
   ],
   [
    "Which feature moves objects to a colder class automatically after a set age?",
    "Object Lifecycle Management rules."
   ]
  ]
 },
 {
  "t": "Relational databases on Google Cloud: Cloud SQL, AlloyDB and Spanner",
  "hook": "Rohan runs technology for Saffron Lane, an online spice shop that started in one country and now ships to three continents. Every Sunday night he patches the MySQL server himself, checks the backups and hopes nothing breaks. Lately, orders from Asia time out during European peak hours, and his only fix has been buying a bigger server, which is now the biggest one available. His board asks two questions in the same meeting: how can the team stop babysitting the database, and how can the shop keep growing worldwide without the order system falling over? Google Cloud offers three managed relational databases. Which one answers which question?",
  "simple": "A relational database keeps information in linked tables, like a set of spreadsheets where a customer sheet connects to an orders sheet. It makes sure every change is complete: money leaves one account and arrives in another, or nothing happens at all. Google Cloud offers three managed versions, which means Google does the routine upkeep such as updates and backups. Cloud SQL is the familiar option for ordinary business apps that already use MySQL, PostgreSQL or SQL Server. AlloyDB is a faster, PostgreSQL-compatible option for heavy workloads. Spanner is built for apps that must grow huge or serve users around the world while every user still sees the same correct data. Think of them as a family car, a sports car and a fleet of trucks.",
  "body": [
   "Relational databases store data in tables of rows and columns with defined relationships, use Structured Query Language (SQL), and support transactions that keep data consistent: either all of a change happens or none of it does. If a customer pays for an order, the payment record and the order status update together, or neither is saved. They run most business applications, from online shops to banking and payroll. Google Cloud offers three main managed relational services, and the Cloud Digital Leader exam asks you to choose between them based on the scenario's needs.",
   "Managed is the first important word. With a self-managed database on your own server or a virtual machine, your team installs the software, applies patches, configures backups, sets up replication and handles failover when hardware fails. With a managed service, Google handles that undifferentiated work. The team still designs the schema, writes queries and controls who has access, but it no longer spends Sunday nights patching. This frees skilled people to work on features that customers notice, which is a recurring business theme in the exam.",
   "Cloud SQL is a fully managed service for MySQL, PostgreSQL and SQL Server. Google handles provisioning, patching, backups, replication and failover, and you can turn on a high-availability configuration that keeps a standby ready in another zone. It is the natural target when you move an existing application's database to the cloud with few changes, an approach often called a replatform or move and improve. Because the engines are the same ones the application already uses, code and tools usually keep working. Cloud SQL scales well for most regional workloads, mainly by moving to larger machines (vertical scaling) and adding read replicas that take read-only traffic such as reports and searches off the primary.",
   "AlloyDB for PostgreSQL is a fully managed, PostgreSQL-compatible database designed for demanding workloads. It targets high performance for transactional work and fast analytical queries on the same data, so a business can, for example, run its order system and near-real-time reporting on the same database without the reports dragging down orders. It suits organizations that want PostgreSQL compatibility, and the large open source ecosystem around it, but need more performance than a standard managed PostgreSQL instance provides. It is also an option for organizations moving away from expensive commercial databases toward an open, PostgreSQL-based platform. In exam scenarios, the clue for AlloyDB is usually a combination of three things: the application already uses or wants PostgreSQL, performance requirements are higher than usual, and the business wants transactional and analytical work on the same fresh data.",
   "Spanner is a fully managed relational database that scales horizontally, adding capacity by adding nodes or compute units, while keeping strong consistency. Strong consistency means that once a write is committed, every reader everywhere sees it, so two customers on different continents cannot both buy the last item in stock. Spanner can span multiple regions and is built for very high availability. It supports SQL and transactions like a traditional database, but at a global scale that normally requires splitting data across many servers by hand, a painful process called sharding. Typical uses are global financial systems, inventory, gaming, supply chains and any application that has outgrown a single database server.",
   "The difference between vertical and horizontal scaling is worth holding onto. Vertical scaling means a bigger machine, which is simple but eventually hits a ceiling, as Rohan found. Horizontal scaling means more machines sharing the work, which can keep growing, but is hard to do for relational data while keeping transactions correct. Spanner's value is that it does horizontal scaling for you without giving up SQL or consistency.",
   "A simple way to choose: an existing MySQL, PostgreSQL or SQL Server application with normal scale, choose Cloud SQL. PostgreSQL applications that need higher performance or mixed transactional and analytical work, consider AlloyDB. Relational data that must scale horizontally or serve users worldwide with strong consistency, choose Spanner. Database Migration Service helps move existing databases into Cloud SQL and AlloyDB with minimal downtime, using continuous replication before a planned cutover.",
   "Finally, remember what these services are not. They are operational databases for running applications, known as online transaction processing (OLTP). For analytics across the whole business, the answer is still a data warehouse such as BigQuery, and for flexible document data or massive key-based workloads, the non-relational options Firestore and Bigtable may fit better."
  ],
  "analogy": "Choosing a relational database is like choosing a vehicle for deliveries. Cloud SQL is a reliable van that the mechanic services for you: perfect for normal routes. AlloyDB is a high-performance van with the same controls, for heavier loads. Spanner is a coordinated fleet that grows as you add trucks, while a central dispatcher guarantees every driver sees the same up-to-date order list. The analogy stops working on cost: Spanner is not automatically the expensive option for every case, and the right choice is about scale and consistency needs.",
  "terms": [
   [
    "Relational database",
    "A database that stores data in related tables and uses SQL and transactions."
   ],
   [
    "Transaction",
    "A group of changes that either all succeed or all fail, keeping data consistent."
   ],
   [
    "Cloud SQL",
    "Managed MySQL, PostgreSQL and SQL Server databases."
   ],
   [
    "AlloyDB",
    "A managed, high-performance PostgreSQL-compatible database."
   ],
   [
    "Spanner",
    "A horizontally scalable, strongly consistent relational database that can span regions."
   ],
   [
    "Horizontal scaling",
    "Adding more machines to share a workload, rather than moving to a bigger machine (vertical scaling)."
   ]
  ],
  "example": "A regional online shop moves its MySQL database to Cloud SQL and stops worrying about backups and patching. Years later, after expanding to three continents, it moves its order system to Spanner so orders from every region write to one consistent database without manual sharding.",
  "mistakes": [
   [
    "Spanner is the right answer whenever a question mentions SQL.",
    "Spanner is for horizontal or global scale with strong consistency. An existing MySQL, PostgreSQL or SQL Server app at normal scale fits Cloud SQL."
   ],
   [
    "Cloud SQL supports any database engine, including Oracle.",
    "Cloud SQL supports MySQL, PostgreSQL and SQL Server."
   ],
   [
    "BigQuery is a good choice for an application's order transactions.",
    "BigQuery is an analytical data warehouse. Application transactions belong in an OLTP database such as Cloud SQL, AlloyDB or Spanner."
   ],
   [
    "Managed means Google also designs your schema and controls access.",
    "Google handles infrastructure tasks such as patching, backups and failover. The customer still designs data, writes queries and manages access."
   ]
  ],
  "tryit": [
   [
    "A ticketing company sells concert seats worldwide. When a popular show goes on sale, buyers in many countries try to buy the same seats at the same moment, and the company's single PostgreSQL server cannot keep up even at the largest machine size. Double-selling a seat is unacceptable. Which database fits best, and why?",
    "Spanner. It scales horizontally beyond a single server, can span regions, and keeps strong consistency, so a seat sold in one country is immediately unavailable everywhere. Cloud SQL scales mainly vertically and would hit the same ceiling."
   ],
   [
    "A hospital wants to move its existing SQL Server scheduling database to Google Cloud quickly with minimal code changes and stop managing backups and patches. Which service?",
    "Cloud SQL for SQL Server, a managed service for the same engine, moved with minimal changes."
   ]
  ],
  "tip": "Keywords: 'existing MySQL/PostgreSQL/SQL Server, minimal changes' means Cloud SQL; 'global, horizontal scale, strong consistency' means Spanner; 'PostgreSQL-compatible, high performance, transactional plus analytical' means AlloyDB.",
  "check": [
   [
    "Which relational service fits a globally distributed application that needs strong consistency?",
    "Spanner."
   ],
   [
    "Which database engines does Cloud SQL support?",
    "MySQL, PostgreSQL and SQL Server."
   ],
   [
    "What does a managed database service take off the customer's plate?",
    "Routine administration such as provisioning, patching, backups, replication and failover."
   ]
  ]
 },
 {
  "t": "Non-relational databases on Google Cloud: Firestore and Bigtable",
  "hook": "At Stridewell, a small fitness startup, two engineers are arguing at the whiteboard. Lena is building the mobile app and wants user profiles and workout plans to update instantly on a phone and a watch, even when the user is out of signal on a mountain trail. Marcus is building the data side and has to store a heart-rate reading from every wearable every second, which will soon mean billions of rows a day. Both say 'we need a NoSQL database,' and both assume the other's choice will work for them too. The product manager asks you to settle it before lunch. Are they describing the same problem, or two very different ones?",
  "simple": "Some data does not fit neatly into linked tables. Non-relational, or NoSQL, databases store it in other ways. Firestore stores information as documents, like individual index cards that can each have different labels, which is great for apps on phones and websites. It updates every device instantly and keeps working without internet, catching up later. Bigtable is built for enormous amounts of simple data arriving very fast, such as readings from millions of sensors every second. It finds any row almost instantly if you know its key, like finding a page by its exact page number in a giant book. So: Firestore for app data and live updates, Bigtable for massive, fast-flowing data.",
  "body": [
   "Non-relational, or NoSQL, databases store data in models other than related tables. Common models include documents, key-value pairs and wide columns. They trade some relational features, such as complex joins across many tables, for flexibility or very large scale. Google Cloud's two main managed NoSQL services on the Cloud Digital Leader exam are Firestore and Bigtable. Both are called NoSQL, but they solve quite different problems, and exam questions usually give clear clues about which one fits.",
   "Firestore is a serverless document database. Data is stored as documents, which are sets of fields similar to JavaScript Object Notation (JSON), organized in collections. A `users` collection might hold one document per user, with fields such as `name`, `goal` and a nested list of `devices`. Documents in the same collection can have different fields, so the schema can evolve easily as an app changes: adding a new feature does not require changing every existing record. Serverless means there are no servers or capacity to manage; Firestore scales automatically with demand and you pay for usage. For a small team building a new app, that means no capacity planning before launch and no late-night scaling work when the app suddenly becomes popular.",
   "Firestore has features built specifically for web and mobile apps. Real-time listeners push changes to connected clients, so when a user edits a workout on a phone, the watch and the web dashboard update within moments without refreshing. Offline support lets an app keep working without a connection, storing changes locally and syncing them when the device reconnects. Client libraries work with Firebase, Google's platform for app developers, so mobile teams can build quickly. This makes Firestore a good fit for user profiles, game state, chat, shopping carts, product catalogs and other app data.",
   "Bigtable is a wide-column NoSQL database built for very large amounts of data with consistently low latency and very high read and write throughput. Latency is the delay before a response; throughput is how much work is done per second. Data is stored in tables with rows identified by a single row key, and columns grouped into column families. Rows can have many columns, and empty cells take no space, which suits sparse data. The design of the row key matters a great deal, because Bigtable stores rows sorted by key and retrieves them fastest by key or key range; a key such as device ID plus timestamp lets you read one device's recent readings quickly.",
   "Bigtable is ideal for time-series data, Internet of Things (IoT) sensor readings, financial market data, ad technology and personalization. It is the kind of system that powers large Google services, and it is compatible with the open source Apache HBase application programming interface (API), which helps organizations move existing HBase workloads. Capacity is managed by nodes, and you can add nodes to increase throughput, so it is managed but not serverless in the same way as Firestore.",
   "The key to choosing is the workload. Firestore suits application data for web and mobile, where flexibility, real-time sync, offline use and zero administration matter, and where volumes are moderate to large. Bigtable suits huge analytical and operational data sets, often terabytes to petabytes, where throughput and latency at scale matter most and access is mainly by key. If a scenario mentions phones, real-time updates across devices or offline mode, think Firestore. If it mentions billions of events, sensors, time series or the HBase API, think Bigtable.",
   "It also helps to know what neither one is for. Neither is a data warehouse. For Structured Query Language (SQL) analytics across large data sets, joining many sources for reports, you still use BigQuery, which can also query data stored in Bigtable. And if the data is strongly relational with transactions across many tables, such as orders, payments and inventory, a relational database such as Cloud SQL or Spanner is usually the better fit.",
   "Back at Stridewell, the engineers were describing two different workloads. Lena's profiles and plans belong in Firestore, which gives her live sync and offline support. Marcus's stream of heart-rate readings belongs in Bigtable, keyed by device and time. Later, aggregated results can be analyzed in BigQuery. Using more than one database for different jobs is normal in modern cloud design."
  ],
  "analogy": "Firestore is like a box of index cards for each customer: every card can have its own fields, and a copy of the box lives on every device, kept in sync automatically. Bigtable is like an enormous, perfectly sorted logbook where each line is filed by an exact code, so you can jump straight to any entry among billions. The analogy stops working for search: you cannot quickly browse Bigtable by any field you like; it is fastest when you look up by row key.",
  "terms": [
   [
    "NoSQL",
    "Databases that use models other than relational tables, such as documents, key-value or wide columns."
   ],
   [
    "Firestore",
    "A serverless NoSQL document database with real-time updates and offline support for apps."
   ],
   [
    "Document",
    "A set of fields, similar to JSON, stored in a collection in Firestore."
   ],
   [
    "Bigtable",
    "A wide-column NoSQL database for very large, low-latency, high-throughput workloads."
   ],
   [
    "Row key",
    "The single identifier used to store and retrieve rows in Bigtable, which determines how data is organized."
   ]
  ],
  "example": "A fitness company stores each user's profile and workout plans in Firestore so the mobile app updates instantly across the user's phone and watch. Heart-rate readings from millions of wearables, arriving every second, go into Bigtable keyed by device and timestamp. Weekly trends are analyzed in BigQuery.",
  "mistakes": [
   [
    "Firestore and Bigtable are interchangeable because both are NoSQL.",
    "Firestore is a document database for app data with real-time sync and offline support. Bigtable is a wide-column store for massive, high-throughput, key-based workloads."
   ],
   [
    "Bigtable is the right place to run SQL reports across the business.",
    "Bigtable is optimized for key-based access at scale. SQL analytics across large data sets is BigQuery's job."
   ],
   [
    "NoSQL means the data has no structure at all.",
    "NoSQL data has structure, such as documents with fields or rows with column families, just not fixed relational tables."
   ]
  ],
  "tryit": [
   [
    "A logistics company tracks GPS positions from 200,000 delivery vans every few seconds. Dispatchers need to pull up any van's recent route instantly, and the company already runs some workloads on Apache HBase. Which database fits, and what row key idea would help?",
    "Bigtable. It handles very high write throughput with low-latency reads, is compatible with the HBase API, and a row key combining van ID and timestamp lets dispatchers read a van's recent positions as a fast key-range scan."
   ],
   [
    "A startup is building a shared grocery-list app where family members see each other's changes immediately and can add items in a store with no signal. Which database?",
    "Firestore, for its real-time listeners and offline support with later sync."
   ]
  ],
  "tip": "Mobile or web app, real-time sync, offline: Firestore. Massive time-series or IoT data with high throughput and low latency: Bigtable. Neither is the answer for SQL analytics, which is BigQuery.",
  "check": [
   [
    "Which service suits billions of sensor readings per day with low-latency reads by device?",
    "Bigtable."
   ],
   [
    "Name two Firestore features aimed at mobile apps.",
    "Real-time listeners that push updates to clients, and offline support with later sync."
   ],
   [
    "Which open source API is Bigtable compatible with?",
    "The Apache HBase API."
   ]
  ]
 },
 {
  "t": "BigQuery: serverless data warehouse and analytics",
  "hook": "It is quarter-end at Meridian Sound, a music streaming company, and the head of growth, Keisha, needs one answer by tomorrow's board meeting: which songs are gaining listeners fastest in each country, and are those listeners less likely to cancel? Her analyst, Tomas, sighs. Last quarter the same question took the old reporting server all weekend, and it crashed twice because the play-history table had grown to billions of rows. This time the data team has moved everything into BigQuery. Tomas types a SQL query, presses run, and starts timing it. Before you see the result, think about what has to be true for a system to scan billions of rows that quickly, with nobody managing servers at all.",
  "simple": "BigQuery is Google Cloud's big analysis engine. You put huge amounts of business data into it, such as every sale or every song play, and then ask questions in SQL, a common language for asking questions of tables. You do not set up or look after any computers; Google provides the computing power each time you ask a question and takes it away afterward. Data is stored cheaply, and you mostly pay for the questions you run, based on how much data each question reads. That is why careful questions that read only the columns they need cost less. It is like a library where you pay a small fee to keep your books and a fee per page the librarian reads for you.",
  "body": [
   "BigQuery is Google Cloud's fully managed, serverless data warehouse. You load or stream data into it, or point it at data stored elsewhere, and query it with standard Structured Query Language (SQL), the language most analysts already know. There are no servers, clusters or indexes to manage, and it can scan very large data sets, terabytes and beyond, quickly. Serverless here means Google provisions and scales the infrastructure automatically; the team focuses on the data and the questions. BigQuery is one of the most important products for the data section of the Cloud Digital Leader exam, and many scenario questions about analytics end with it as the answer.",
   "Its architecture separates storage from compute, and this is the idea to understand most clearly. Data is stored in a columnar format, which means the values of each column are stored together, so a query reads only the columns it needs. If a table has 80 columns and your query uses three, BigQuery reads those three. Processing power is allocated on demand from a very large shared pool and released when the query finishes. Because storage and compute are separate, each can scale independently: you can keep years of history cheaply and pay for processing only when you run queries, instead of keeping a large cluster running all day just in case.",
   "Pricing follows the same split and has two parts. Storage is charged for the data you keep, and compute is charged for queries, either on demand by the number of bytes each query processes or through reserved capacity bought ahead for predictable workloads. In the console, before you run a query, BigQuery shows an estimate such as 'This query will process 1.2 GB when run,' which helps analysts spot an expensive query before it costs money. That is why good practice is to select only the columns you need and to use partitioned tables, which split data, for example by date, so a query for last week reads only last week's partitions, instead of writing `SELECT *` over everything.",
   "BigQuery does more than store tables. Data can arrive in batches, such as a nightly file load, or in real time through streaming, so dashboards can reflect events within seconds. It can query data that stays in Cloud Storage, or even in other clouds, through external tables, so not every byte has to be copied in first. BigQuery ML lets analysts create and use machine learning (ML) models with SQL statements, for example forecasting demand or predicting which customers might cancel, without exporting data to a separate ML platform. Built-in geospatial functions support location analysis, and a large collection of public datasets makes it easy to practice or enrich your own data.",
   "Results are only valuable when people can use them, so BigQuery connects to the tools business users already work in. Looker provides governed enterprise business intelligence (BI), Looker Studio offers free self-service dashboards, and Connected Sheets lets people analyze BigQuery data from Google Sheets. Many data sources, including Google Ads and other software as a service (SaaS) tools, can be loaded on a schedule with the BigQuery Data Transfer Service, so marketing data arrives every morning without anyone writing a pipeline.",
   "Security and governance are built in. Access is controlled with Identity and Access Management (IAM) at the project, dataset, table and even row and column level, so an analyst might see sales figures but not customers' personal details. Column-level security uses policy tags to hide sensitive fields from most users, and row-level security can limit a regional manager to rows for her own region. Data is encrypted at rest by default, and audit logs record who ran which queries.",
   "It is important to know where BigQuery fits and where it does not. It is built for online analytical processing (OLAP): large scans, aggregations and joins across many sources for reporting and analysis. It is not designed to be the transactional database behind an application, where many small reads and writes must happen per second, which is the job of Cloud SQL, AlloyDB, Spanner or Firestore. A common pattern is to run the application on an operational database and copy or stream its data into BigQuery for analysis.",
   "You can try it at no cost with the BigQuery sandbox, which offers a free monthly allowance of storage and query processing without needing a credit card or billing account. Querying a public dataset is a good first lab: open the console, pick a public dataset, check the bytes-processed estimate, and run a query that counts or groups records. Seeing that estimate change as you add or remove columns is the quickest way to understand columnar storage and on-demand pricing."
  ],
  "analogy": "BigQuery is like a huge public library with an army of librarians on call. You pay a modest fee to keep your books on the shelves (storage), and when you ask a question, as many librarians as needed run off to read only the relevant chapters and return with the answer (compute), then go back to waiting. You pay for the pages they read. The analogy stops working in one way: real librarians would read whole books, but BigQuery reads only the columns your query names.",
  "terms": [
   [
    "Data warehouse",
    "A central store of cleaned, structured data optimized for analytical queries."
   ],
   [
    "Serverless",
    "No infrastructure to provision or manage; capacity is allocated automatically."
   ],
   [
    "Columnar storage",
    "Storing data by column, so queries read only the columns they need."
   ],
   [
    "Partitioned table",
    "A table split into segments, often by date, so queries can read only the relevant segments."
   ],
   [
    "BigQuery ML",
    "A feature for creating and using machine learning models with SQL inside BigQuery."
   ],
   [
    "BigQuery sandbox",
    "A no-cost way to try BigQuery within free monthly limits, without a billing account."
   ]
  ],
  "example": "A streaming music service loads billions of play events into BigQuery each day. Analysts write SQL to find which songs are gaining listeners by country, marketing builds a Looker Studio dashboard on the results, and a data scientist trains a churn model with BigQuery ML in the same place, without moving data.",
  "mistakes": [
   [
    "BigQuery is a good database for an app's shopping cart and checkout.",
    "BigQuery is an analytical warehouse (OLAP). Application transactions belong in an operational database such as Cloud SQL, Spanner or Firestore."
   ],
   [
    "Using BigQuery means managing clusters and adding indexes for speed.",
    "BigQuery is serverless: there are no clusters or indexes to manage. Speed comes from columnar storage and on-demand compute."
   ],
   [
    "Adding a LIMIT clause to SELECT * makes an on-demand query cheap.",
    "On-demand cost depends on bytes processed. Selecting fewer columns and filtering on partitions reduces bytes; a LIMIT alone generally does not reduce the data scanned."
   ],
   [
    "You must copy all data into BigQuery before you can analyze it.",
    "External tables let BigQuery query data that stays in Cloud Storage or other locations."
   ]
  ],
  "tryit": [
   [
    "A retailer's analysts run a daily query, `SELECT *` over a three-year sales table, then filter for yesterday's rows in a spreadsheet. The finance team notices BigQuery query costs climbing every month. What two changes would you suggest, and why do they work?",
    "Select only the columns actually needed, and partition the table by date so the query filters on yesterday's partition. Because BigQuery is columnar and on-demand pricing is based on bytes processed, both changes reduce the data each query reads, cutting cost and often speeding up results."
   ]
  ],
  "tip": "For large-scale SQL analytics without managing infrastructure, the answer is BigQuery. Cloud SQL runs applications' transactions; BigQuery analyzes data across the business. Watch for clues like 'petabytes', 'serverless', 'SQL analytics' and 'ML with SQL'.",
  "check": [
   [
    "Why does BigQuery separate storage and compute?",
    "So each can scale independently: data is stored cheaply, and processing is allocated only when queries run."
   ],
   [
    "What is one simple way to reduce BigQuery query cost?",
    "Select only the needed columns (avoid SELECT *) and filter on partitioned columns so fewer bytes are processed."
   ],
   [
    "What does BigQuery ML allow analysts to do?",
    "Create, train and use machine learning models with SQL directly in BigQuery."
   ]
  ]
 },
 {
  "t": "Streaming and processing data: Pub/Sub, Dataflow and Dataproc",
  "hook": "Friday at 6 p.m., the operations room at Swiftway Rides, a ride-sharing company, lights up red. A stadium concert has just ended, and thirty thousand people open the app at once. The demand map on the big screen is twenty minutes behind, because trip data is still collected in a nightly batch, so drivers are sent to the wrong neighborhoods. Meanwhile, the fraud team's old Spark jobs from the on-premises cluster are due to move to the cloud next month, and nobody wants to rewrite them. Nadia, the data lead, has a whiteboard with three Google Cloud names on it. Which one carries the events, which one crunches them in real time, and which one runs the old jobs?",
  "simple": "Data usually has to travel and be cleaned before anyone can use it. Pub/Sub is like a post office for computer messages: apps drop messages off, and any system that signed up receives a copy, even if it was busy when the message arrived. Dataflow is a processing plant: it takes those messages or big files, cleans them, adds them up and sends the results onward, and Google runs the machinery for you. Dataproc is a rented workshop for teams that already use the popular open source tools Spark and Hadoop, so they can bring their existing work to the cloud without rebuilding it. Together they let a business react to events in seconds instead of waiting until tomorrow.",
  "body": [
   "Data rarely arrives ready to analyze. It must be collected from many sources, cleaned, joined and transformed, then delivered to where it is used, such as BigQuery or a dashboard. This can happen in batches, such as a nightly load of yesterday's sales, or as a stream, where events are processed continuously within seconds of happening. Batch is simpler and fine when decisions can wait; streaming matters when the business must react now, for example to fraud, demand surges or equipment faults. Google Cloud has managed services for both, and the Cloud Digital Leader exam expects you to know the role of each.",
   "Pub/Sub is a global, asynchronous messaging service. Publishers, such as applications, devices or other services, send messages to a topic, which is a named channel such as `trip-events`. Subscribers attached to that topic, through subscriptions, receive the messages. Asynchronous means the publisher does not wait for anyone to process the message; it sends and moves on. The publisher also does not need to know who the subscribers are, which decouples systems. If a downstream system is slow or offline, Pub/Sub holds the messages until it can process them, so a temporary outage does not lose data or slow down the app that produced it.",
   "Decoupling has real business value. With Pub/Sub, one event can feed many consumers: the same trip event can go to a fraud check, a billing system and an analytics pipeline, each with its own subscription, and new consumers can be added later without changing the publishing app. Pub/Sub scales automatically to very large message volumes. It is the usual entry point for streaming data, such as website clickstreams, Internet of Things (IoT) telemetry from devices and application events.",
   "Dataflow is a fully managed, serverless service for running data processing pipelines, both streaming and batch. A pipeline is a series of steps: read data, filter it, enrich it with other data, aggregate it, then write the results. Pipelines are written with Apache Beam, an open source programming model whose key benefit is that the same code style works for batch and streaming. Dataflow handles the machines, autoscaling and fault tolerance, so the team does not size or babysit clusters. Google provides ready-made templates for common pipelines, such as moving messages from Pub/Sub into BigQuery, which means some pipelines need little or no code.",
   "A common pattern to remember is Pub/Sub to Dataflow to BigQuery. Events are ingested by Pub/Sub, enriched and aggregated by Dataflow in real time, for example counting ride requests per neighborhood every ten seconds, and written to BigQuery for dashboards and analysis. In an exam question, phrases such as 'real-time analytics', 'streaming pipeline' and 'no infrastructure to manage' strongly suggest this pattern.",
   "Dataproc is a managed service for running Apache Spark, Apache Hadoop and related open source tools for large-scale data processing. Clusters can be created quickly, typically in a couple of minutes, and deleted when a job finishes, so you pay only while they run instead of keeping a large cluster idle between jobs. This pattern of short-lived, job-specific clusters is a big change from on-premises Hadoop, where a cluster ran all the time. Dataproc is the natural choice when an organization already has Spark or Hadoop jobs, skills and tools and wants to move them to the cloud with little change, often reading data from Cloud Storage instead of a permanent cluster file system.",
   "The difference between Dataflow and Dataproc is a classic exam distinction. Both can process large data sets, and both can do batch work. Dataflow is serverless and Beam-based, ideal for new pipelines, especially streaming, when you do not want to manage clusters. Dataproc runs existing Spark and Hadoop code with familiar tools and gives more control over the cluster environment. If the scenario stresses 'existing Spark jobs' or 'minimal code changes from Hadoop', choose Dataproc; if it stresses 'serverless', 'unified batch and streaming' or 'real-time', choose Dataflow.",
   "The choice in one line: Pub/Sub moves messages and events; Dataflow transforms data in streaming or batch pipelines with no clusters to manage; Dataproc runs existing Spark and Hadoop workloads. Together with BigQuery for analysis and Looker for presentation, they form the backbone of a modern data platform that turns raw events into decisions while they still matter."
  ],
  "analogy": "Picture a newspaper operation. Pub/Sub is the wire service: reporters file stories to a channel, and every subscribing newsroom receives them, even if it was busy at the time. Dataflow is an automated editing desk that cleans, combines and summarizes stories as they arrive and sends them to print. Dataproc is renting a fully equipped print shop for a team that already knows its own presses. The analogy stops working on storage: Pub/Sub holds messages only for delivery, not as a long-term archive or database.",
  "terms": [
   [
    "Pub/Sub",
    "A global messaging service where publishers send messages to topics and subscribers receive them asynchronously."
   ],
   [
    "Topic and subscription",
    "A topic is a named channel for messages; a subscription delivers a topic's messages to one consumer."
   ],
   [
    "Dataflow",
    "A serverless service that runs Apache Beam pipelines for streaming and batch data processing."
   ],
   [
    "Apache Beam",
    "An open source programming model for defining batch and streaming data pipelines."
   ],
   [
    "Dataproc",
    "A managed service for Apache Spark, Hadoop and related open source tools."
   ],
   [
    "Streaming data",
    "Data processed continuously as events arrive, rather than in scheduled batches."
   ]
  ],
  "example": "A ride-sharing company publishes every trip event to Pub/Sub. A Dataflow pipeline calculates demand per neighborhood every ten seconds and writes the results to BigQuery, which feeds a live operations dashboard. Its older Spark fraud-scoring jobs run nightly on a Dataproc cluster that is deleted when they finish.",
  "mistakes": [
   [
    "Pub/Sub transforms and aggregates data.",
    "Pub/Sub ingests and delivers messages. Transformation and aggregation are done by Dataflow (or another processing service)."
   ],
   [
    "Dataflow is the best way to move existing Spark jobs with minimal changes.",
    "Existing Spark or Hadoop jobs fit Dataproc. Dataflow runs Apache Beam pipelines and suits new serverless pipelines."
   ],
   [
    "Dataproc clusters must run all the time like on-premises Hadoop.",
    "Dataproc clusters start quickly and can be deleted after each job, so you pay only while they run."
   ],
   [
    "Streaming always replaces batch.",
    "Batch remains right when decisions can wait; streaming is chosen when the business needs to react within seconds. Dataflow supports both."
   ]
  ],
  "tryit": [
   [
    "A smart-thermostat maker receives readings from millions of devices every minute. It wants an alert dashboard that shows overheating devices within seconds, and it has no team to manage servers or clusters. Which services would you combine, and in what order?",
    "Pub/Sub to ingest device messages, Dataflow to process the stream in real time (for example, flag readings above a threshold and aggregate per region), and BigQuery to store results for the dashboard. Pub/Sub decouples devices from processing, and Dataflow is serverless, matching the no-cluster requirement."
   ],
   [
    "A bank has several hundred Spark jobs on an on-premises Hadoop cluster that sits idle most of the day. Leadership wants to cut cost and move quickly without rewriting code. What do you recommend?",
    "Dataproc, running the existing Spark jobs on short-lived clusters created per job and deleted afterward, with data in Cloud Storage. This avoids rewriting and stops paying for idle capacity."
   ]
  ],
  "tip": "Ingesting events: Pub/Sub. Transforming data in real time without managing servers: Dataflow. Existing Spark or Hadoop code: Dataproc. Pub/Sub to Dataflow to BigQuery is the classic streaming analytics pattern.",
  "check": [
   [
    "What does Pub/Sub decouple, and why is that useful?",
    "It decouples senders from receivers, so publishers do not wait for subscribers and messages are held if a subscriber is slow or offline."
   ],
   [
    "A company has hundreds of existing Spark jobs. Which service moves them with the least change?",
    "Dataproc."
   ],
   [
    "Which open source programming model do Dataflow pipelines use?",
    "Apache Beam."
   ]
  ]
 },
 {
  "t": "Business intelligence with Looker and Looker Studio",
  "hook": "The quarterly business review at Fernhill Software is ten minutes old when it goes off the rails. The sales vice president's slide says annual recurring revenue grew 18 percent. The finance director's slide, built from the same BigQuery data, says 11 percent. For the next half hour, nobody discusses strategy; they argue about whose spreadsheet is right. Afterward, the chief executive, Olu, stops by the data team's desks with a simple request: 'One number. Everyone sees the same one.' Down the hall, a marketing coordinator just wants a quick chart of last month's ad clicks by Friday, without filing a ticket. Can one set of tools serve both of them?",
  "simple": "Business intelligence, or BI, means turning data into charts, dashboards and answers that help people make decisions. Google offers two main tools. Looker Studio is free and easy: you connect it to a spreadsheet, BigQuery or Google Analytics and drag charts onto a page, a bit like making slides, then share the report like a Google Doc. Looker is the bigger, business-wide tool: the data team writes down once, in one place, exactly how important numbers such as 'revenue' or 'active customer' are calculated, and everyone's dashboards use that same recipe. That stops different teams showing different numbers for the same thing. Quick personal reports suit Looker Studio; trusted company-wide numbers suit Looker.",
  "body": [
   "Business intelligence (BI) is the practice of turning data into reports, dashboards and answers that people across a business can use to make decisions. Data sitting in a warehouse creates no value until someone can see it, understand it and act on it, so BI is the final step of many data journeys. A sales manager checking pipeline every morning, an operations team watching a live dashboard and an executive reviewing quarterly trends are all using BI. Google Cloud offers two related tools with different purposes, Looker and Looker Studio, and the Cloud Digital Leader exam expects you to choose between them from a business need.",
   "Looker is an enterprise BI and data platform. Its core idea is a semantic layer, a shared business definition of data that sits between the raw tables and the people asking questions. In Looker this layer is written in a modeling language called LookML, where data teams define business entities and metrics once: what 'active customer' means, how 'net revenue' is calculated, which discounts and refunds are subtracted and how tables join together. Everyone who explores data, builds a dashboard or asks a question then uses those same definitions, so different departments get consistent numbers. If the definition of a metric changes, the data team updates it in one place and every dashboard reflects the change.",
   "Two other Looker characteristics matter for the exam. First, Looker queries the database directly, such as BigQuery, instead of copying data into its own store. Results are therefore current, data is not duplicated into another system to secure, and the warehouse's power does the heavy lifting. Second, Looker is built for governance at scale: access rules control who sees which data, and models are managed like code, with version control and review. Looker also supports scheduled reports and alerts delivered by email or chat, and embedded analytics, where dashboards appear inside other applications such as a customer portal.",
   "Looker Studio, formerly called Data Studio, is a free, self-service tool for building interactive dashboards and reports. It connects to many sources through connectors, including BigQuery, Google Sheets, Google Analytics, Google Ads and many others, and is easy for business users to start with: you add a data source, drag charts, tables and filters onto a canvas, and adjust styling. Reports can be shared and edited collaboratively like Google Docs, with viewers seeing the same live data. A paid Looker Studio Pro edition adds enterprise management features, such as team workspaces and organizational ownership of content.",
   "The choice depends on scale and governance needs. A marketing analyst who needs a quick dashboard from a spreadsheet or Google Ads data can build one in Looker Studio in minutes, without help from IT. A large company that needs trusted, consistent metrics across hundreds of users and teams, with governed access and definitions maintained by a central data team, will use Looker. Many organizations use both: Looker for official, governed metrics and Looker Studio for lightweight, ad hoc reporting. In exam questions, words such as 'consistent', 'single source of truth', 'governed', 'semantic model' or 'embedded' point to Looker; 'free', 'quick', 'self-service' and 'Google Sheets' point to Looker Studio.",
   "A useful way to see the value of a semantic layer is to picture the problem it solves. Without one, every analyst writes their own Structured Query Language (SQL) queries, picks their own filters and copies results into their own spreadsheet. Two analysts can both be careful and still produce different answers, because one excluded refunds and the other did not. Meetings then turn into debates about numbers rather than decisions. With a semantic layer, the business logic is agreed once, reviewed and reused, which builds trust in data across the organization.",
   "BI connects with the rest of the platform. Data arrives through Pub/Sub, Dataflow or transfer services, is stored and processed in BigQuery, and is presented in Looker or Looker Studio. Increasingly, AI assistants, including Gemini features in Looker, let users ask questions in natural language and get charts back. These assistants rely on the same well-defined data underneath: a natural language question about 'revenue' is only as trustworthy as the definition of revenue in the model. Good BI is therefore as much about agreed definitions and data quality as about attractive charts.",
   "For a leader, the takeaway is that BI tools are where data transformation becomes visible to the business. Choosing the right tool for each audience, and investing in shared definitions, determines whether people trust and use the data the organization has worked hard to collect."
  ],
  "analogy": "Looker's semantic layer is like a restaurant chain's master recipe book. Every kitchen makes the signature dish from the same recipe, so it tastes the same in every city, and when head office improves the recipe, every kitchen updates at once. Looker Studio is like a home kitchen: quick, free and flexible, perfect for making a meal for yourself tonight. The analogy stops working in one way: Looker does not store its own copy of the ingredients; it cooks directly from the warehouse pantry, such as BigQuery.",
  "terms": [
   [
    "Business intelligence (BI)",
    "Tools and practices that turn data into reports and dashboards for decision making."
   ],
   [
    "Semantic layer",
    "A shared definition of business metrics and data relationships used by all reports."
   ],
   [
    "LookML",
    "Looker's modeling language for defining dimensions, measures and relationships."
   ],
   [
    "Looker",
    "Google Cloud's enterprise BI and data platform built around a governed semantic model."
   ],
   [
    "Looker Studio",
    "Google's free, self-service dashboard and reporting tool, formerly Data Studio."
   ],
   [
    "Embedded analytics",
    "Dashboards and reports shown inside other applications, such as a customer portal."
   ]
  ],
  "example": "Sales and finance at a software company report different 'annual recurring revenue' numbers. The data team defines the metric once in LookML on top of BigQuery, and both teams' Looker dashboards now show the same figure. Meanwhile, a marketing coordinator builds a free Looker Studio report on Google Ads data in an afternoon.",
  "mistakes": [
   [
    "Looker and Looker Studio are the same product with different names.",
    "Looker is an enterprise platform with a governed semantic layer (LookML). Looker Studio is a free, self-service dashboard tool. They serve different needs."
   ],
   [
    "Looker copies data into its own database to make dashboards fast.",
    "Looker queries the source database, such as BigQuery, directly, so results are current and data is not duplicated."
   ],
   [
    "Pretty dashboards are enough to make teams trust data.",
    "Trust depends on consistent definitions and data quality. A semantic layer makes every report use the same metric logic."
   ]
  ],
  "tryit": [
   [
    "A national retailer has 400 store managers who each receive a weekly sales dashboard. Regional teams build their own reports and often disagree on 'like-for-like sales.' Leadership wants one governed definition, controlled access so managers only see their own stores, and dashboards embedded in the store portal. Which tool fits, and why?",
    "Looker. Its LookML semantic layer defines like-for-like sales once for everyone, access controls can restrict data by store, and it supports embedded analytics in the portal. Looker Studio is better for quick, self-service reports, not centrally governed metrics at this scale."
   ]
  ],
  "tip": "Consistent, governed metrics across the enterprise point to Looker and its semantic model. A quick, free dashboard from many sources points to Looker Studio.",
  "check": [
   [
    "What problem does Looker's semantic layer solve?",
    "Inconsistent metrics: definitions are written once in LookML and reused everywhere, so reports agree."
   ],
   [
    "Name two data sources Looker Studio can connect to.",
    "For example BigQuery, Google Sheets, Google Analytics or Google Ads."
   ],
   [
    "Does Looker store its own copy of the data?",
    "No. It queries the underlying database, such as BigQuery, directly."
   ]
  ]
 },
 {
  "t": "Moving data to Google Cloud: Database Migration Service, BigQuery Data Transfer Service, Storage Transfer Service and Transfer Appliance",
  "hook": "Kalinda has just been named migration lead at Riverbend Media, and her kickoff list looks like four different problems. There are 600 terabytes of archived video on servers in the basement, and the building's internet link is modest at best. There is a PostgreSQL database behind the subscriber website that cannot go down for more than a few minutes. There is a marketing team that downloads ad reports by hand every morning. And there is a folder of files sitting in another cloud provider's storage that needs to be copied over every night. Her manager asks for a one-page plan by Thursday. Is there one tool for all of this, or a different tool for each job?",
  "simple": "Before data can be used in Google Cloud, it has to get there, and Google offers different movers for different jobs. Database Migration Service moves a working database into Google's managed databases while the old one keeps running, so the switch takes only minutes. BigQuery Data Transfer Service is like a scheduled delivery: every day it brings fresh data from places such as Google Ads or YouTube into BigQuery automatically. Storage Transfer Service copies large numbers of files over the internet from other clouds or your own servers into Cloud Storage. Transfer Appliance is a physical box Google mails to you when you have so much data that sending it over the internet would take far too long: you fill it, ship it back and Google uploads it.",
  "body": [
   "Before data can create value in the cloud, it has to get there. Moving data sounds simple, but the right method depends on what the data is, where it lives, how much there is, how fast the network is and how much downtime the business can accept. Google Cloud offers several transfer services, and the Cloud Digital Leader exam tests whether you can pick the right one from those clues. Learning the four main services as a set, each with its own job, is the easiest way to answer these questions.",
   "Database Migration Service moves databases, such as MySQL, PostgreSQL, SQL Server and Oracle, into Cloud SQL or AlloyDB. Its key feature is continuous replication. Instead of shutting the application down, exporting everything and importing it, the service first copies the existing data and then keeps copying every new change while the source database stays in use. When the target has caught up, the team schedules a short cutover: stop writes briefly, confirm the target is current and point the application at the new database. Downtime shrinks from hours or days to minutes. Database Migration Service is serverless and manages the migration process for you, which lowers the risk and effort of moving production databases.",
   "BigQuery Data Transfer Service automates loading data into BigQuery on a schedule. It has connectors for Google sources such as Google Ads, YouTube and Google Play, for many third-party software as a service (SaaS) applications, for files in Cloud Storage and in other clouds' object stores, and for migrating from other data warehouses. Once a transfer is configured, it runs on its own, for example every morning, and the data lands in BigQuery tables ready to query. Marketing and analytics teams use it to keep BigQuery up to date without writing or maintaining pipelines, which replaces the manual downloads and spreadsheet uploads many teams still rely on.",
   "Storage Transfer Service moves large amounts of file or object data over the network into Cloud Storage. Sources include other cloud providers' object storage, Hypertext Transfer Protocol (HTTP) locations listing public files, and on-premises file systems, which are reached through transfer agents installed in the customer's data center. It supports one-time, scheduled and repeated transfers, can transfer only new or changed files, and can keep buckets in sync with a source over time. It is the managed, reliable alternative to writing custom copy scripts, with monitoring and retries built in. The key distinction is the destination: Storage Transfer Service delivers files and objects into Cloud Storage buckets, not into BigQuery tables or databases.",
   "Transfer Appliance is a physical, high-capacity storage device that Google ships to your data center. You connect it to your network, copy data onto it, ship it back, and Google uploads the data to Cloud Storage. Data on the appliance is encrypted, so the device is protected while in transit. It is the right choice when the amount of data is so large, or the network so slow, that an online transfer would take too long, for example hundreds of terabytes over a modest connection, which could take many weeks or months to send online and would compete with normal business traffic the whole time.",
   "A quick calculation shows why this matters. Online transfer time depends on data volume divided by usable bandwidth. Doubling the data doubles the time; halving the bandwidth doubles it again. When the answer comes out in months rather than days, shipping a device becomes faster and simpler than the network. Exam questions usually signal this with phrases such as 'limited bandwidth', 'slow connection' or 'petabytes' alongside a deadline.",
   "These services often work together in one migration plan. In the opening scenario, Riverbend would ship its video archive on Transfer Appliance, move its subscriber database with Database Migration Service using continuous replication, set up BigQuery Data Transfer Service for daily ad reports, and use Storage Transfer Service for the nightly copy from the other cloud. Each service handles the job it was built for, and none of them needs custom code.",
   "For the exam: databases to Cloud SQL or AlloyDB with minimal downtime, Database Migration Service. Scheduled loads into BigQuery from Google products, SaaS and other sources, BigQuery Data Transfer Service. Files and objects over the network into Cloud Storage, Storage Transfer Service. Huge data sets with limited bandwidth, Transfer Appliance."
  ],
  "analogy": "Moving data is like moving house. Database Migration Service is a mover who sets up your new kitchen while you keep cooking in the old one, then switches you over in an evening. BigQuery Data Transfer Service is a standing grocery delivery that arrives every morning. Storage Transfer Service is a van service shuttling boxes along the road. Transfer Appliance is a shipping container you fill when there is too much for the road. The analogy stops working in one way: unlike a house move, these can run continuously and keep both sides in sync.",
  "terms": [
   [
    "Database Migration Service",
    "A managed service that migrates databases into Cloud SQL or AlloyDB with minimal downtime."
   ],
   [
    "Continuous replication",
    "Copying ongoing changes from a source database to a target until cutover, keeping the source in use."
   ],
   [
    "BigQuery Data Transfer Service",
    "Scheduled, managed data loads into BigQuery from Google, SaaS and other sources."
   ],
   [
    "Storage Transfer Service",
    "Online transfers of object and file data into Cloud Storage from other clouds, HTTP or on-premises."
   ],
   [
    "Transfer Appliance",
    "A physical device shipped to a customer to move very large data sets offline into Google Cloud."
   ],
   [
    "Cutover",
    "The moment an application switches from the old system to the new one."
   ]
  ],
  "example": "A media company has 600 TB of video on-premises with a slow internet link, so it uses Transfer Appliance. Its PostgreSQL database moves to Cloud SQL with Database Migration Service while staying online, and its ad performance data now lands in BigQuery every morning via BigQuery Data Transfer Service.",
  "mistakes": [
   [
    "Transfer Appliance is for any large migration, regardless of network speed.",
    "It is chosen when data volume and limited bandwidth make online transfer too slow. With a fast connection, Storage Transfer Service may be simpler."
   ],
   [
    "BigQuery Data Transfer Service moves databases into Cloud SQL.",
    "It loads data into BigQuery on a schedule. Moving databases into Cloud SQL or AlloyDB is Database Migration Service."
   ],
   [
    "Migrating a database always means long downtime.",
    "Database Migration Service uses continuous replication so the source stays in use, and downtime is limited to a short cutover."
   ],
   [
    "Storage Transfer Service loads data into BigQuery tables.",
    "Storage Transfer Service moves files and objects into Cloud Storage. Scheduled loads into BigQuery use BigQuery Data Transfer Service."
   ]
  ],
  "tryit": [
   [
    "A research lab has 400 TB of microscope images on local servers and a connection that is already busy with daily work. It must have the images in Cloud Storage before a grant deadline in six weeks. Which service do you recommend, and why?",
    "Transfer Appliance. With a busy, limited connection, sending 400 TB online would likely take too long and disrupt daily work. Shipping an encrypted appliance moves the data offline, and Google uploads it to Cloud Storage."
   ],
   [
    "A marketing team copies Google Ads and YouTube channel reports into spreadsheets by hand every morning so analysts can query them. What would you suggest?",
    "BigQuery Data Transfer Service, which loads those sources into BigQuery automatically on a schedule, removing the manual work."
   ]
  ],
  "tip": "Watch for clues about network speed and data size. 'Slow connection' and 'hundreds of terabytes' mean Transfer Appliance. 'Minimal downtime database move' means Database Migration Service. 'Scheduled loads into BigQuery from Google Ads or SaaS' means BigQuery Data Transfer Service. 'Files from another cloud into Cloud Storage' means Storage Transfer Service.",
  "check": [
   [
    "Which service keeps a source database in use while it is copied to Cloud SQL?",
    "Database Migration Service, using continuous replication before cutover."
   ],
   [
    "A company wants data from another cloud's object storage copied to Cloud Storage every night. Which service?",
    "Storage Transfer Service."
   ],
   [
    "When is Transfer Appliance the right choice?",
    "When the data volume is very large and the network too slow or limited for an online transfer to finish in time."
   ]
  ]
 },
 {
  "t": "Data governance: quality, security, access control and cataloging",
  "hook": "An auditor from the state health regulator is sitting across the table from Grace, the data director at Lakeshore Community Health. 'Show me every place patient identifiers are stored,' the auditor says, 'who can see them, and where the numbers in last year's outcomes report came from.' Grace knows the data is in BigQuery and Cloud Storage somewhere, but there are four copies of the patient table, each slightly different, and nobody is sure which one fed the report. An analyst admits she once exported one to a spreadsheet to make a chart. The meeting has forty minutes left. What would Grace need to have in place to answer all three questions calmly?",
  "simple": "Data governance is the set of rules, jobs and tools that keep an organization's data correct, safe, easy to find and used properly. Think of a public library. Books are checked for damage (quality), every book has a record in the catalog so you can find it (cataloging), some rare books can only be read by certain people (access control), and the library knows where each book came from and when it should be removed (lineage and lifecycle). Without these rules, a library becomes a pile of books nobody trusts. Good governance is not just about locking things away; it helps the right people find trustworthy data quickly while sensitive information stays protected.",
  "body": [
   "Data governance is the set of policies, roles and tools that make sure data is accurate, secure, discoverable and used appropriately. Without it, organizations collect more data but trust it less: nobody knows which table is correct, sensitive data leaks to the wrong people, analysts make their own copies, and regulators ask questions nobody can answer. Good governance is what makes data safe and useful at the same time. For the Cloud Digital Leader exam, you need to recognize the parts of governance and the Google Cloud capabilities that support them, not configure them in detail.",
   "Governance has several parts that work together. Data quality means data is accurate, complete, consistent and up to date; poor quality leads to wrong decisions and poor machine learning (ML) models, because a model trained on flawed data learns flawed patterns. Ownership and stewardship mean each data set has someone accountable for it: a data owner decides who may use it, and a data steward looks after its definitions and quality day to day. Security and privacy mean sensitive data such as personal, health or financial information is protected and handled according to law and policy.",
   "Two more parts deal with time and history. Lifecycle management decides how long data is kept and when it is deleted, which balances legal retention requirements against the cost and risk of keeping data forever. In Cloud Storage this can be enforced with lifecycle rules and retention policies. Lineage records where data came from and how it was transformed on the way: this report was built from that table, which was produced by this pipeline from these source systems. Lineage helps with trust, with audits like the one in the opening scene, and with impact analysis, because it shows which reports will be affected if a source changes.",
   "Access control is central to governance. In Google Cloud, Identity and Access Management (IAM) decides who can view or change data at the project, dataset, table or bucket level, by granting roles to users, groups and service accounts. BigQuery adds finer controls. Column-level security uses policy tags so that, for example, only the human resources (HR) team can see salary columns while everyone else can query the rest of the table. Row-level security can restrict a regional manager to rows for her own region. Following the principle of least privilege, giving people only the access they need for their work, limits damage from mistakes or compromised accounts.",
   "Protecting sensitive data also means knowing where it is. Sensitive Data Protection can discover and classify sensitive data, such as credit card numbers, government identification numbers or email addresses, across storage and BigQuery, and can mask or de-identify it, for example by replacing real values with tokens, so analysts can still work with the data without seeing the original values. Audit logs record who accessed or changed data, which supports investigations and compliance reports.",
   "Cataloging makes data discoverable. A data catalog records what data exists, where it lives, what it means, who owns it and how sensitive it is, so analysts can find trusted data instead of creating their own copies. Imagine searching a catalog for 'customer churn' and finding one dataset marked as certified, with an owner, a description of every column, a sensitivity tag and its lineage. In Google Cloud, Dataplex provides data cataloging, automated data quality checks, lineage and governance across data lakes and warehouses, so policies can be managed consistently whether data sits in Cloud Storage or BigQuery.",
   "Governance should enable, not only restrict. If rules are so strict that analysts cannot get data, they work around them with exports and shadow copies, which is less secure, not more. The goal is that the right people can quickly find and use trustworthy data, while sensitive data stays protected. Well-governed organizations publish certified datasets, make access requests simple and fast, and automate checks so that governance happens in the background rather than as a series of manual approvals.",
   "Governance is also shared work. Google secures the underlying infrastructure and provides the tools, but under the shared responsibility model the customer decides who gets access, classifies its data and sets retention rules. Business leaders play a role too, by naming owners for important data sets and agreeing on definitions. With these pieces in place, Grace could answer the auditor from the catalog, the access policies and the lineage graph in minutes."
  ],
  "analogy": "Data governance is like running a well-organized library. The catalog tells you what exists and where (cataloging), librarians check and repair books (quality), the rare-books room needs a special card (access control), each book's donation record shows where it came from (lineage), and old editions are retired on a schedule (lifecycle). The analogy stops working in one way: a library usually holds one copy of a book, while digital data copies itself easily, which is exactly why governance must track copies and lineage carefully.",
  "terms": [
   [
    "Data governance",
    "Policies, roles and tools that keep data accurate, secure, discoverable and properly used."
   ],
   [
    "Data quality",
    "How accurate, complete, consistent and up to date data is."
   ],
   [
    "Data lineage",
    "A record of where data came from and how it was transformed."
   ],
   [
    "Data catalog",
    "An inventory of data assets with descriptions, owners and classifications so people can find them."
   ],
   [
    "Column-level security",
    "Restricting access to specific columns, such as sensitive fields, in a table, using policy tags in BigQuery."
   ],
   [
    "Least privilege",
    "Granting each person only the access needed for their work."
   ]
  ],
  "example": "A healthcare provider catalogs all its datasets in Dataplex, tags patient identifiers as sensitive, restricts those columns in BigQuery to a small clinical group, and runs automatic quality checks. Sensitive Data Protection masks identifiers in research copies. Analysts can now find approved datasets in minutes instead of asking around.",
  "mistakes": [
   [
    "Data governance just means locking data down so fewer people can use it.",
    "Governance aims to make trustworthy data easy for the right people to find and use while protecting sensitive data. Over-restriction drives risky workarounds."
   ],
   [
    "Google handles all data governance because the data is in Google Cloud.",
    "Google provides secure infrastructure and tools, but the customer decides access, classification, retention and ownership under the shared responsibility model."
   ],
   [
    "IAM alone can hide a single sensitive column from analysts who need the rest of the table.",
    "IAM controls access at levels such as project, dataset and table. Hiding one column uses BigQuery column-level security with policy tags."
   ],
   [
    "A data catalog stores the data itself.",
    "A catalog stores metadata: what data exists, where it is, what it means, who owns it and how sensitive it is."
   ]
  ],
  "tryit": [
   [
    "A bank's analysts keep exporting customer tables to spreadsheets because they cannot tell which of several BigQuery tables is the official one, and the security team worries about account numbers spreading. Which governance capabilities would you put in place first, and why?",
    "A data catalog (for example in Dataplex) that marks one certified table with an owner and description, so analysts stop guessing and copying; column-level security or masking with Sensitive Data Protection so account numbers are hidden from those who do not need them; and least-privilege IAM. This reduces copies and protects sensitive fields while still giving analysts the data they need."
   ]
  ],
  "tip": "Questions about finding trusted data, knowing who owns it, tracking where it came from and limiting who sees sensitive fields are all about data governance. 'Discover and classify sensitive data' points to Sensitive Data Protection; 'catalog, lineage and quality across lakes and warehouses' points to Dataplex.",
  "check": [
   [
    "Name four parts of data governance.",
    "Any four of: data quality, ownership and stewardship, security and privacy, access control, lifecycle and retention, lineage, cataloging."
   ],
   [
    "How can BigQuery let most analysts query a table but hide one sensitive column?",
    "Use column-level security (policy tags) so only authorized users can read that column."
   ],
   [
    "What does data lineage help an organization do?",
    "Trace where data came from and how it was transformed, which supports trust, audits and impact analysis."
   ]
  ]
 },
 {
  "t": "Artificial intelligence, machine learning and generative AI: definitions and differences",
  "hook": "The innovation committee at Pinecrest Outdoor Supply has three proposals on the table, and every one of them claims to be 'AI.' The first is a script that sends orders over a set weight to freight shipping. The second predicts which customers are about to stop buying. The third writes product descriptions in the brand's voice from a few bullet points. Sam, the chief financial officer, puts down his pen. 'If all three are AI, why does one cost a weekend of a developer's time and another needs a data science team? What are we actually buying?' Everyone turns to you. How do you explain the difference in two minutes?",
  "simple": "Artificial intelligence, or AI, is the big goal: getting computers to do things that normally need human thinking, such as understanding speech or spotting a face. Machine learning is the most common way to get there: instead of writing every rule by hand, you show the computer many examples and it learns the pattern itself, the way a child learns what a dog is by seeing lots of dogs. Generative AI is a newer kind of machine learning that creates new things, such as writing an email, drawing a picture or suggesting code, when you ask it in plain words. So a fixed rule like 'if over 20 kilograms, ship by freight' is just a rule, predicting who might cancel is machine learning, and writing new text is generative AI.",
  "body": [
   "Artificial intelligence, machine learning and generative AI are often used interchangeably in news stories and sales pitches, but they are nested ideas, each one a part of the one before. The Cloud Digital Leader exam expects you to tell them apart, because the right business choice, the data you need and the Google Cloud product that fits all depend on which one a problem actually calls for.",
   "Artificial intelligence (AI) is the broad field of building computer systems that perform tasks normally requiring human intelligence, such as understanding language, recognizing images, making decisions or solving problems. Early AI often relied on hand-written rules: if the customer says 'refund', route the message to billing. Rules work well when the logic is clear and stable, and they are easy to explain. But they break down when the problem has too many cases to write down. Try writing rules that recognize every possible photo of a cat, or every way a customer might express frustration, and the list never ends.",
   "Machine learning (ML) is a subset of AI in which systems learn patterns from data instead of being programmed with explicit rules. You give a model many examples, such as thousands of emails labeled spam or not spam, and a training process adjusts the model until it can make accurate predictions on new examples it has never seen. The key shift is that people supply data and a goal, and the model works out the rules. This is why data quality matters so much: a model learns whatever patterns are in its training data, including mistakes and biases.",
   "There are three main kinds of ML to recognize. Supervised learning learns from labeled examples to predict a label or a number, such as 'spam or not' (classification) or 'next month's sales' (regression). Unsupervised learning finds structure in unlabeled data, such as grouping customers into segments with similar behavior (clustering). Reinforcement learning learns by trial and reward, improving its actions through feedback, as in game playing or some robotics. Common business uses of ML include classification, forecasting, recommendations and anomaly detection, such as flagging unusual card transactions as possible fraud.",
   "Deep learning is a type of ML that uses neural networks with many layers. Each layer learns increasingly abstract features: in an image model, early layers might detect edges, later layers shapes, and final layers whole objects. Deep learning is especially good at unstructured data such as images, audio and text, and it powers most modern AI, from speech recognition to translation. It usually needs large amounts of data and computing power to train, which is one reason organizations often use pre-trained models offered by cloud providers instead of building their own from scratch.",
   "Generative AI is a type of deep learning that creates new content, such as text, images, code, audio or video, rather than only predicting a label or number. It is built on foundation models: very large models trained on broad data that can be adapted to many tasks, from summarizing documents to answering questions to drafting marketing copy. Large language models (LLMs), such as Google's Gemini models, are foundation models for language, and some foundation models are multimodal, working with text, images and other inputs together. You interact with them through a prompt, an instruction or question written in natural language, such as 'Write a friendly product description for a waterproof hiking boot in under 50 words.'",
   "The difference between predictive ML and generative AI is a frequent exam theme. Traditional, or predictive, ML answers questions like 'Which category?' or 'How much?' from patterns in historical data: it outputs a label, a score or a forecast. Generative AI outputs new content that did not exist before. A churn model that scores each customer from 0 to 1 is predictive ML; a model that drafts a personalized retention email for each high-risk customer is generative AI. The two often work together in one solution.",
   "In short: AI is the goal, ML is the most common way to reach it, deep learning is a powerful kind of ML, and generative AI is deep learning that produces new content. When a scenario describes fixed if-then logic, it is not ML at all. When it learns from examples to predict, it is ML. When it creates new text, images or code from a prompt, it is generative AI."
  ],
  "analogy": "Think of nested kitchen skills. AI is the goal of getting a meal on the table without a human chef. A rules-based system is a recipe card followed exactly. Machine learning is a cook who tastes thousands of dishes and learns what works, then predicts whether a new dish will be popular. Generative AI is a cook who invents a brand new dish when you describe what you are in the mood for. The analogy stops working in one way: generative AI does not truly understand taste; it produces output based on learned patterns, which is why its results still need checking.",
  "terms": [
   [
    "Artificial intelligence (AI)",
    "The field of building systems that perform tasks that normally need human intelligence."
   ],
   [
    "Machine learning (ML)",
    "A subset of AI where systems learn patterns from data instead of following hand-written rules."
   ],
   [
    "Supervised learning",
    "ML that learns from labeled examples to predict a label (classification) or a number (regression)."
   ],
   [
    "Deep learning",
    "ML that uses neural networks with many layers, strong at images, audio and text."
   ],
   [
    "Generative AI",
    "AI that creates new content, such as text, images or code, from a prompt."
   ],
   [
    "Foundation model",
    "A large model trained on broad data that can be adapted to many tasks; LLMs are one kind."
   ]
  ],
  "example": "An online retailer uses a rules engine to apply shipping prices (not ML), an ML model to predict which customers may cancel their subscription (predictive ML), and a generative AI model to draft personalized product descriptions (generative AI).",
  "mistakes": [
   [
    "Any software that makes automatic decisions is machine learning.",
    "Fixed if-then rules written by people are not ML. ML learns patterns from data."
   ],
   [
    "AI, ML and generative AI are three separate, unrelated technologies.",
    "They are nested: generative AI is a type of deep learning, deep learning is a type of ML, and ML is a subset of AI."
   ],
   [
    "Generative AI is just a better version of predictive ML, so it should replace it.",
    "They do different jobs. Predictive ML outputs labels, scores or forecasts; generative AI creates new content. Many solutions use both."
   ],
   [
    "Clustering customers into groups is supervised learning.",
    "Clustering finds structure in unlabeled data, which is unsupervised learning."
   ]
  ],
  "tryit": [
   [
    "A city water utility wants three things: automatically send a warning when a reading goes above a fixed legal limit, forecast next week's water demand from five years of usage data, and draft plain-language summaries of maintenance reports for residents. Classify each as rules-based, predictive ML or generative AI.",
    "The fixed-limit warning is rules-based, because a person wrote the threshold. Demand forecasting is predictive ML (supervised learning producing a number from historical data). Drafting summaries is generative AI, because it creates new text from a prompt and source content."
   ]
  ],
  "tip": "If the system produces new content from a prompt, it is generative AI. If it predicts a category or number from past examples, it is traditional (predictive) ML. If it follows fixed if-then logic, it is not ML at all.",
  "check": [
   [
    "How does machine learning differ from traditional programming?",
    "Traditional programs follow rules written by people; ML models learn the rules or patterns from example data."
   ],
   [
    "What is a foundation model?",
    "A large model trained on broad data that can be adapted to many downstream tasks, such as an LLM."
   ],
   [
    "Grouping customers by similar behavior without predefined labels is which kind of ML?",
    "Unsupervised learning (clustering)."
   ]
  ]
 },
 {
  "t": "Business problems machine learning can solve, and when ML is not the right tool",
  "hook": "It is Monday morning at Lakeview Outfitters, and the chief operating officer, Dana, has just come back from a conference convinced that the company needs machine learning everywhere. Her list on the whiteboard reads: predict which customers will stop buying, spot fake returns, forecast jacket demand for winter, and calculate sales tax on every order. You are the person in the room who is expected to say which of these ideas are worth funding. Three of them might save real money. One of them would be an expensive way to get a worse answer than the code the company already has. Can you tell which is which, and explain why, before the budget meeting on Thursday?",
  "simple": "Machine learning, or ML, is a way of getting a computer to learn from many past examples instead of following rules a person wrote down. It is useful when the pattern is too messy to describe in rules, like guessing which shoppers are about to stop coming back. It is not useful when the rule is already known and exact. Think of a recipe: if you know a cake needs two cups of flour, you just measure two cups. You would not study a thousand cakes to guess the amount. In the same way, sales tax follows a published formula, so ordinary software does it perfectly, and ML would only approximate it.",
  "body": [
   "Machine learning (ML) is powerful, but it is a tool for specific kinds of problems, not a general upgrade for every process. The Cloud Digital Leader exam expects you to think like a business decision maker: look at a problem, decide whether ML adds real value, and recognize when a simpler approach, such as ordinary code, a report or a dashboard, would be cheaper and more reliable. Many exam questions are really asking whether you can resist using artificial intelligence (AI) just because it is fashionable.",
   "The first test is whether there is a pattern that is too complex to write as rules, together with plenty of examples of that pattern. Customer churn is a good illustration. No one can write a neat rule that says exactly which customers will cancel, but a company with years of usage records and cancellation history has thousands of examples from which a model can learn the combination of signals that tends to come before a cancellation. When both conditions hold, a complex pattern and enough relevant data, ML is a strong candidate.",
   "Classic business uses fall into a handful of families worth recognizing on sight. Prediction or forecasting estimates a future value, such as how many units a store will sell next week. Classification puts an item into a category: spam or not spam, which department should handle a support ticket, whether a card transaction looks fraudulent. Recommendation suggests products or content a person is likely to want. Anomaly detection flags readings that differ sharply from normal, such as an unusual payment or a sensor that suddenly runs hot. Understanding unstructured data means making sense of documents, images and audio: reading invoices, recognizing objects in photos, transcribing calls. Generative AI adds a newer family: summarizing, drafting, translating, answering questions and writing code.",
   "ML is also valuable where the scale or speed of the work exceeds what people can do. A claims adjuster might review a few hundred insurance claims in a day, while a model can score millions and flag the small share that look unusual for a human to examine. The point is not to remove people but to move them to the work that needs judgment, empathy and customer contact. Scenarios on the exam that mention huge volumes, real-time decisions or a backlog that staff cannot clear are often pointing toward ML for triage, with humans handling the exceptions.",
   "Now the other side. ML is not the right tool when the rules are known and exact. Calculating tax, loan interest or shipping cost from a published formula is a job for normal code, which is cheaper to build, faster to run, easy to audit and always correct. A model trained on past invoices could only approximate the formula and would sometimes be wrong. If a question describes a deterministic calculation, a fixed business rule or a lookup table, the expected answer is conventional software.",
   "ML is also a poor fit when there is little or no relevant data, or when the data does not reflect the situation the model will face. A brand-new product line has no sales history, so a demand model has nothing to learn from yet. A model trained on one country's customers may not transfer to another market. Another warning sign is a requirement that every decision be fully explainable step by step, as some regulated decisions are; if a model cannot meet that requirement, a rules-based approach or a simpler, more interpretable model may be needed. Finally, ML is unnecessary when the real question is descriptive, such as how many orders shipped late last quarter. A query and a dashboard answer that directly.",
   "Before starting an ML project, a sensible leader asks a short series of questions. What business problem are we solving, and how will we measure success, for example fewer cancellations or less fraud loss? Does suitable data exist, and is it of good enough quality? Does a pre-trained service or an existing product already solve it, so we do not need to build anything? The last question matters on Google Cloud, where ready-made application programming interfaces (APIs) for vision, language and speech can deliver results without any training.",
   "Finally, treat ML projects as experiments rather than one-off installations. The first model may not be accurate enough, so plan for iteration. Once deployed, a model needs monitoring, because the world changes: customer behavior shifts, new fraud tactics appear, prices move. When live data drifts away from the training data, accuracy falls, a problem called model drift, and the model must be retrained. Budgeting for this ongoing care is part of deciding whether ML is worth it at all."
  ],
  "analogy": "Choosing ML is like choosing between a calculator and an experienced detective. If you need to add up a receipt, the calculator is perfect every time, and hiring a detective to guess the total would be silly. If you need to figure out which of a thousand guests is likely to cause trouble, there is no formula, but a detective who has seen many similar cases can spot patterns. The analogy stops working in one way: a model, unlike a detective, cannot reason about a situation it has never seen in its data.",
  "terms": [
   [
    "Classification",
    "Predicting which category an item belongs to, such as fraud or not fraud."
   ],
   [
    "Forecasting",
    "Predicting future numeric values, such as demand next month."
   ],
   [
    "Anomaly detection",
    "Finding data points that differ significantly from normal patterns."
   ],
   [
    "Model drift",
    "A drop in model accuracy over time as real-world data changes from the training data."
   ],
   [
    "Recommendation",
    "Suggesting products or content a person is likely to want, based on patterns in behavior."
   ],
   [
    "Deterministic rule",
    "Logic that always gives the same exact output for the same input, such as a tax formula."
   ]
  ],
  "example": "A telecom company wants to predict which customers will cancel. It has five years of usage and cancellation history, so it builds a churn model and gives retention offers to high-risk customers. It does not use ML for calculating monthly bills, which follow fixed price rules.",
  "mistakes": [
   [
    "Any business process will improve if you add ML to it.",
    "ML helps only when there is a complex pattern and enough relevant data. Exact, known rules are better served by ordinary code."
   ],
   [
    "ML can be used to calculate things like tax or shipping more accurately.",
    "A model can only approximate a published formula. Normal code implements the formula exactly, more cheaply and with a clear audit trail."
   ],
   [
    "Once a model is deployed, the project is finished.",
    "Real-world data changes, so accuracy can drift. Plan for monitoring and retraining from the start."
   ],
   [
    "If you have lots of data, ML will work.",
    "The data must be relevant and representative of the situation the model will face. Huge volumes of the wrong data do not help."
   ]
  ],
  "tryit": [
   [
    "Harborview Clinic wants to reduce missed appointments. It has six years of booking records showing who attended and who did not, along with appointment time, lead time and reminder history. Separately, it wants software to compute the patient co-pay, which is set by a fixed schedule per insurance plan. Which task suits ML, and which does not?",
    "Predicting missed appointments suits ML: the pattern is complex and there are years of labeled examples, so a model can flag high-risk bookings for an extra reminder. The co-pay follows a fixed schedule, so ordinary code or a lookup table is cheaper, exact and auditable."
   ]
  ],
  "tip": "Exam distractors often suggest ML for tasks with exact rules. Choose ML when patterns are complex and data is plentiful; choose ordinary code when the logic is known.",
  "check": [
   [
    "Give three business problems suited to ML.",
    "Any three: churn prediction, demand forecasting, fraud detection, recommendations, document or image understanding, anomaly detection."
   ],
   [
    "Why is ML a poor choice for calculating sales tax?",
    "The rules are exact and known, so normal code gives correct results; a model could only approximate them."
   ],
   [
    "A startup launching its first product wants an ML demand forecast before launch. What is the main problem?",
    "There is no historical sales data for the product, so a model has nothing relevant to learn from yet; simple estimates or market research are more appropriate until data builds up."
   ]
  ]
 },
 {
  "t": "Data quality for machine learning: accuracy, completeness, representativeness and bias",
  "hook": "Priya, a product manager at Northgate Lending, gets an email from the compliance team on a Friday afternoon. The new loan pre-approval model, which tested at high accuracy, is approving applicants from two rural counties at half the rate of everyone else, even when their incomes and credit histories look similar. The data science team insists the algorithm is state of the art and there is nothing wrong with the code. The regulator's quarterly review is in three weeks. Priya needs to understand where this unfairness came from, whether a more powerful model would fix it, and what the team should check before anything like this ships again.",
  "simple": "A machine learning model learns only from the examples you give it, the way a student learns only from the textbook in front of them. If the textbook has wrong answers, missing pages or covers only one part of the subject, the student will make mistakes, no matter how clever they are. Data quality means the examples are correct, complete, consistent, up to date, related to the question, and cover all the kinds of people or situations the model will meet. When some group is missing or treated unfairly in the old data, the model can repeat that unfairness. That is called bias, and fixing it starts with the data, not a faster computer.",
  "body": [
   "A machine learning (ML) model learns only from the data it is trained on. If that data is poor, the model will be poor, however advanced the algorithm or however much computing power is behind it. People summarize this as garbage in, garbage out. It is why data quality appears in the artificial intelligence (AI) section of the Cloud Digital Leader exam: leaders who fund AI projects need to know that the biggest risks usually sit in the data, not in the choice of model.",
   "Several dimensions of quality matter, and the exam expects you to recognize them by name. Accuracy means values are correct. In supervised learning, each training example carries a label, the right answer the model should learn. If fraudulent transactions are mislabeled as normal, the model is literally taught that fraud looks acceptable. Completeness means records and fields are not missing. If a quarter of customer records have no age or region, or if an entire month of sales never made it into the table, the model has gaps in what it can learn.",
   "Consistency means the same thing is recorded the same way across sources. One system might store dates as day-month-year and another as month-day-year, or record weight in pounds in one warehouse and kilograms in another. Merged without care, these sources produce nonsense that looks perfectly valid in a table. Timeliness means the data reflects current conditions. A demand model trained only on data from before a major change in shopping habits may fail badly today, because the patterns it learned no longer hold. Relevance means the features, the input columns, actually relate to what you want to predict; adding unrelated columns adds noise and can create misleading correlations.",
   "Representativeness deserves special attention because it is so often the root cause of problems in the real world and on the exam. Training data must cover the full range of cases the model will see in real use. A model trained mostly on customers from one city, one age group or one type of device may work well for them and badly for everyone else. A speech model trained mostly on one accent will transcribe other accents poorly. A model that performs well on average can still fail a particular group, which is why teams measure accuracy for each important segment, not just overall.",
   "This leads to bias, meaning systematic errors that unfairly favor or disadvantage certain groups. Bias can enter in three main ways. Historical bias comes from past decisions recorded in the data: if human loan officers were unfair to certain neighborhoods, a model trained on their approvals learns to copy them. Collection bias comes from how data was gathered: surveying customers only through a mobile app leaves out people who do not use it. Labeling bias comes from how answers were assigned: if labelers apply categories inconsistently or bring their own assumptions, the model inherits that. Even when a sensitive attribute is removed, other columns, such as postal code, can act as proxies for it.",
   "Volume matters too, but only in combination with quality. More relevant, accurate and representative examples generally help a model learn subtle patterns and handle unusual cases. A huge quantity of biased or wrong data does not help; it simply teaches the wrong lesson more confidently. When an exam scenario describes a model that works for one group but not another, the likely answer is to improve or rebalance the training data, not to add computing power or switch to a bigger model.",
   "Improving data quality is ongoing work rather than a one-time cleanup. Teams profile data to find missing, duplicated or out-of-range values; clean and standardize formats and units; check that important groups are adequately represented; have labels reviewed by more than one person; and, after deployment, monitor model performance across groups so that new problems are caught early. Data governance practices help by recording where data came from and how it was transformed, called data lineage, and by assigning owners responsible for quality.",
   "On Google Cloud, these tasks map onto familiar services. Data can be explored, profiled and prepared in BigQuery with SQL (Structured Query Language), or cleaned and transformed at scale in Dataflow pipelines. Vertex AI, Google Cloud's ML platform, provides tools to evaluate models, including looking at performance on different slices of data, and to explain which features drove individual predictions. Dataplex can help catalog data and track its quality and lineage across the organization. The service names are useful, but the exam focus is the principle: trustworthy AI starts with trustworthy data."
  ],
  "analogy": "Training a model is like teaching a new chef using only a box of old recipe cards. If some cards have wrong measurements, the chef learns wrong measurements. If the box only holds Italian recipes, the chef will struggle the first time someone orders curry. And if the cards were written by someone who always made one group's dishes smaller, the chef will keep doing it without knowing why. A better stove does not fix any of this; better cards do.",
  "terms": [
   [
    "Training data",
    "The examples a model learns from."
   ],
   [
    "Representative data",
    "Data that covers the full range of cases and groups the model will face in real use."
   ],
   [
    "Bias (in ML)",
    "Systematic errors in a model's output that unfairly favor or disadvantage certain groups."
   ],
   [
    "Label",
    "The correct answer attached to a training example in supervised learning."
   ],
   [
    "Data lineage",
    "A record of where data came from and how it was transformed on the way to its current form."
   ],
   [
    "Proxy feature",
    "A column, such as postal code, that indirectly reveals a sensitive attribute and can carry bias into a model."
   ]
  ],
  "example": "A bank's credit model trained on ten years of approvals gives lower scores to applicants from certain neighborhoods, because past human decisions in the data were biased. The team rebalances the data, removes features that act as proxies for protected characteristics and checks accuracy for each group before release.",
  "mistakes": [
   [
    "A model that is biased against a group needs more computing power or a more advanced algorithm.",
    "Bias usually comes from unrepresentative, historical or mislabeled data. The fix is to improve and rebalance the data and test results per group."
   ],
   [
    "Removing the sensitive column, such as gender or ethnicity, guarantees a fair model.",
    "Other columns can act as proxies for the removed attribute. Teams still need to check outcomes across groups."
   ],
   [
    "More data always means a better model.",
    "More good, relevant, representative data helps. More biased or wrong data only teaches the wrong pattern more strongly."
   ],
   [
    "High overall accuracy proves the model is fine.",
    "Overall accuracy can hide poor performance for a smaller group. Measure accuracy for each important segment."
   ]
  ],
  "tryit": [
   [
    "Coastline Retail trains a product-return prediction model using last year's data. Most of that data comes from its online store; its new physical stores opened only two months ago. After launch, the model performs well online but makes many mistakes for in-store purchases. The data team suggests buying more powerful training hardware. What would you recommend instead?",
    "The problem is representativeness: the training data barely covers in-store purchases, so the model has not learned their patterns. Collect more in-store examples, check that they are labeled correctly, retrain, and measure accuracy separately for online and in-store sales. More hardware would not add the missing information."
   ]
  ],
  "tip": "When a model works well for one group but poorly for another, the most likely cause is unrepresentative training data, not a lack of computing power.",
  "check": [
   [
    "List four dimensions of data quality for ML.",
    "Accuracy, completeness, consistency, timeliness, relevance and representativeness (any four)."
   ],
   [
    "How can historical data introduce bias?",
    "If past decisions in the data were unfair, the model learns and repeats those patterns."
   ],
   [
    "A model trained on data from five years ago now performs poorly. Which quality dimension is most likely the issue?",
    "Timeliness: the data no longer reflects current conditions, so the patterns the model learned are out of date and it should be retrained on recent data."
   ]
  ]
 },
 {
  "t": "Responsible AI: Google's AI Principles, fairness, explainability, privacy and accountability",
  "hook": "At Meridian Health Partners, a pilot AI tool that ranks patients for follow-up calls has been running for a month. Then a nurse manager, Luis, notices something odd: patients who rarely visited the clinic in the past are almost never ranked as urgent, even when their symptoms sound serious. A patient advocate asks why the system made a particular decision, and nobody can say. The chief medical officer wants to know who signed off on the tool, what personal data it uses, and whether it should be paused. You have been asked to explain what responsible AI means in practice and which safeguards should have been there from the start.",
  "simple": "Responsible AI means building and using artificial intelligence in a way that is safe, fair and trustworthy. Imagine a new referee in a sports league. You would want the referee to treat both teams the same (fairness), be able to explain each call (explainability), keep players' private information private (privacy), and answer to the league if something goes wrong (accountability). You would also want them tested before refereeing a final (safety). AI systems that make decisions about people need the same qualities, because their mistakes can affect jobs, loans, health and safety. Google publishes a set of AI Principles describing how it approaches this.",
  "body": [
   "Artificial intelligence (AI) systems increasingly make or influence decisions that affect people's jobs, loans, health and safety, and generative AI can produce content that is wrong, biased or harmful. Responsible AI is the practice of designing, building and using AI in ways that are safe, fair and trustworthy. Google Cloud treats it as part of every AI project rather than an optional extra, and the Cloud Digital Leader exam expects you to know the main ideas and match them to business scenarios.",
   "Google published its AI Principles in 2018 to guide its own AI work, and it has updated them since. The original principles committed Google to developing AI that is socially beneficial, avoids creating or reinforcing unfair bias, is built and tested for safety, is accountable to people, incorporates privacy design principles, and upholds high standards of scientific excellence, while not pursuing applications likely to cause overall harm. Because the exact wording has evolved over time, focus on the recurring themes rather than memorizing a particular numbered list. Those themes are what exam questions test.",
   "Fairness means the system does not produce unjustly different outcomes for different groups of people. A hiring model that recommends one gender far more often for equally qualified candidates is unfair. Fairness work starts with checking training data for representativeness and for historical bias, then measuring model performance and outcomes separately for relevant groups, not just overall. It also means deciding, with input from the people affected, what fair should mean for a given use, since different definitions of fairness can conflict.",
   "Explainability means people can understand why a model made a particular prediction. For a credit decision, that might be a list of the factors that raised or lowered the risk score. Explainability supports trust, because users and customers can see the reasoning; debugging, because data scientists can spot a model relying on the wrong signal; and regulatory review, because many industries must justify decisions about individuals. Vertex AI, Google Cloud's machine learning (ML) platform, provides explanation features that show how much each input feature contributed to a prediction for many model types.",
   "Privacy means personal data is collected and used only as appropriate, is protected, and is kept to the minimum needed. Techniques include de-identification, which removes or masks details that identify individuals; strict access control so only authorized people and systems can reach the data; encryption; and clear retention rules. Google Cloud's Sensitive Data Protection service can help find and mask sensitive values such as names or card numbers before data is used for analysis or training.",
   "Accountability means humans remain responsible for AI systems. There should be named owners, documented decisions about data and design, reviews before launch, and ways for affected people to question or appeal a decision. Safety and security mean testing for failure modes, misuse and attacks before and after launch. For generative AI this includes safety filters that block or flag harmful output, testing prompts that try to make the model misbehave, and grounding responses in trusted data to reduce made-up answers. On the exam, watch the wording of the scenario: a question about who signs off on a system or who answers for its mistakes is about accountability, while a question about a model being tricked or producing dangerous content is about safety and security.",
   "Responsible AI is not a one-time checklist completed at launch. It runs through the whole lifecycle: choosing whether a problem is appropriate for AI at all, collecting and labeling data, training, evaluating, deploying and monitoring. A common safeguard for high-impact decisions is keeping a human in the loop, meaning a person reviews or approves the AI's output before an important action, such as denying a claim or flagging a patient. Monitoring after launch catches drift and new fairness problems that testing did not reveal.",
   "Customers also worry about what happens to their own data when they use AI services. Google Cloud states that it does not use customer data from its enterprise AI services to train its own models without the customer's permission. This commitment, together with security controls and data governance in Vertex AI, addresses a common objection from organizations considering generative AI. On the exam, a question about a company hesitant to send confidential data to an AI tool often points to this commitment and to these enterprise controls."
  ],
  "analogy": "Think of responsible AI as the rules for a new bank teller who can approve small loans. You train them on fair lending, ask them to explain each decision, require them to keep customer files locked, and make a supervisor sign off on large or unusual loans. The teller is never the final authority; the bank is. Where the analogy weakens is scale: one teller makes dozens of decisions a day, while an AI system can make millions, so a small unfairness spreads much faster.",
  "mnemonic": "For the main responsible AI themes, think FEPAS: Fairness, Explainability, Privacy, Accountability, Safety. It is a memory aid for the themes, not an official Google list or order.",
  "terms": [
   [
    "Responsible AI",
    "Designing and using AI so that it is fair, safe, private, explainable and accountable."
   ],
   [
    "Fairness",
    "Avoiding unjust differences in outcomes for different groups of people."
   ],
   [
    "Explainability",
    "The ability to describe why a model produced a given output."
   ],
   [
    "Human in the loop",
    "A design where a person reviews or approves AI outputs before important actions."
   ],
   [
    "Accountability (in AI)",
    "Humans remain responsible for an AI system, with owners, reviews, documentation and ways to challenge decisions."
   ],
   [
    "De-identification",
    "Removing or masking details that identify individuals in a dataset."
   ]
  ],
  "example": "A recruiting firm uses AI to shortlist candidates. It tests the model's results across genders and ethnic groups, shows recruiters which skills drove each recommendation, keeps a recruiter responsible for every final decision, and lets candidates request a human review.",
  "mistakes": [
   [
    "Responsible AI is a review you do once just before launch.",
    "It runs through the whole lifecycle, from choosing the problem and collecting data to monitoring after deployment."
   ],
   [
    "If a model is accurate overall, it is fair.",
    "A model can be accurate on average and still produce unjustly different outcomes for a group. Fairness requires checking results per group."
   ],
   [
    "Explainability and accountability are the same thing.",
    "Explainability is about understanding why a model produced an output. Accountability is about which humans are responsible and how decisions can be challenged."
   ],
   [
    "Using an enterprise AI service means the provider will train its models on your confidential data.",
    "Google Cloud states that customer data in its enterprise AI services is not used to train its models without permission."
   ]
  ],
  "tryit": [
   [
    "Summit Insurance uses a model to flag claims as likely fraudulent, and flagged claims are automatically denied. Customers complain that they receive denials with no reason given and no way to appeal. Which responsible AI themes are missing, and what two changes would you recommend?",
    "Explainability and accountability are missing. Show investigators and customers the main factors behind each flag, and keep a human in the loop so an investigator reviews flagged claims before any denial, with a clear appeal process. Checking fraud flags across customer groups would also address fairness."
   ]
  ],
  "tip": "Match the scenario to the principle: 'why did the model decide this' is explainability, 'different results for different groups' is fairness, 'who is responsible' is accountability, 'personal data' is privacy.",
  "check": [
   [
    "What is explainability and why does it matter?",
    "Being able to describe the factors behind a prediction; it builds trust, helps find errors and supports audits and regulation."
   ],
   [
    "Give one safeguard for high-impact AI decisions.",
    "Keep a human in the loop to review or approve decisions, and monitor outcomes across groups."
   ],
   [
    "A customer asks a bank which factors caused its AI to reject their application. Which responsible AI theme does this request relate to?",
    "Explainability: being able to describe why the model produced that output."
   ]
  ]
 },
 {
  "t": "Pre-trained AI APIs: Vision, Natural Language, Speech-to-Text, Text-to-Speech and Translation",
  "hook": "Tomás runs customer experience at Bayside Suites, a small chain of twelve hotels. Every week, guests leave hundreds of reviews in English, Spanish and Portuguese, the front desk scans stacks of paper registration cards, and the call center records dozens of hours of phone calls that nobody has time to listen to. The company has no data scientists and a tight budget. The owner asks Tomás a simple question: can we get anything useful out of all this text, paper and audio this quarter, without hiring an AI team or buying servers? What would you tell him to try first?",
  "simple": "A pre-trained AI API is a ready-made smart service that you can use over the internet. Google has already taught these models using huge amounts of data, so you do not need to teach them anything. You send in a photo, a piece of text or a sound recording, and you get an answer back in seconds: the words in a photo, whether a review is happy or angry, a typed transcript of a phone call, a spoken version of some text, or a translation. It is like hiring an expert translator by the page instead of training your own staff to speak a new language. The catch is that the expert knows common things, not your company's special products.",
  "body": [
   "The fastest way to add artificial intelligence (AI) to an application is to call a pre-trained model through an application programming interface (API). Google has already trained these models on very large datasets, so you send your data, such as an image, a document or an audio file, and receive results in seconds. You need no training data, no machine learning (ML) expertise and no infrastructure to manage. Pricing is typically pay per use, and many of these APIs include a free monthly allowance, which makes them easy to try. For the Cloud Digital Leader exam, you should know what each API does and recognize the scenarios that point to them.",
   "The Cloud Vision API analyzes images. It can detect objects and assign labels such as dog, beach or bicycle; read printed and handwritten text through optical character recognition (OCR); detect faces and attributes such as whether a face appears to be smiling; recognize well-known landmarks and company logos; and flag explicit or violent content through a feature called SafeSearch. One distinction is worth remembering: the Vision API detects that a face is present, but it does not identify who the person is. The Video Intelligence API performs similar analysis on video, such as detecting objects, scene changes and text that appears on screen, which helps media companies index large libraries.",
   "The Cloud Natural Language API analyzes the meaning of text. Sentiment analysis scores whether text is positive, negative or neutral, and how strongly. Entity extraction finds the people, places, organizations, products and other items a text mentions. Content classification sorts text into a set of general categories, and syntax analysis breaks sentences into parts of speech. Businesses use it to review customer feedback at scale, to route support tickets to the right team based on what the customer is talking about, and to organize large collections of documents by topic.",
   "Speech-to-Text converts spoken audio into written text. Common uses include transcribing customer service calls so they can be searched and analyzed, adding captions to videos, and enabling voice commands in apps. Text-to-Speech does the reverse, producing natural-sounding speech from text in many languages and voices. It powers phone menus, reads content aloud for people with visual impairments and gives voices to virtual assistants. The Cloud Translation API translates text between many languages and can detect the source language automatically, which helps companies localize websites, product descriptions and support conversations.",
   "Document AI is a related service focused on business documents. Plain OCR returns the text on a page, but Document AI goes further and extracts structured data: the invoice number, the supplier, the total and the line items in a table, or the fields on a form. It offers processors for common document types such as invoices, receipts and identity documents, which helps automate data entry and accounts payable work that people would otherwise do by hand.",
   "These APIs can be combined into simple pipelines. A call center might send recordings to Speech-to-Text, pass the transcripts to the Natural Language API to measure sentiment and pull out the products mentioned, and translate summaries for managers in another country. Each step is a single API call, and none of them requires training a model. Generative AI models available through Vertex AI can also perform many of these tasks, such as summarizing or translating, and the choice often comes down to the specific output you need and its cost.",
   "Pre-trained APIs are ideal when your problem is a common one that general models already handle well: reading text in images, translating, transcribing, detecting sentiment. Their limitation is customization. A general vision model knows what a chair looks like, but it does not know what a defect in your particular chair joint looks like. If you need to recognize things specific to your business, such as your own product defects, your own document types or industry jargon, you may need a customized model built with AutoML or custom training in Vertex AI, which requires your own labeled examples.",
   "On the exam, look for the combination of clues. When a scenario stresses speed, a common task and no ML team, the answer is usually a pre-trained API. Then match the data type to the service: images go to Vision, video to Video Intelligence, meaning in text to Natural Language, audio to Speech-to-Text, spoken output to Text-to-Speech, languages to Translation, and structured fields from forms and invoices to Document AI."
  ],
  "analogy": "Pre-trained APIs are like a set of specialist contractors on call: a translator, a transcriptionist, a photo cataloger and a document clerk. You send them work and pay for each job, with no hiring or training. They are excellent at standard work. If you need someone who recognizes the specific scratches that mean a part from your factory is faulty, a general contractor will not know, and you need to train a specialist of your own, which is where AutoML or custom training comes in.",
  "terms": [
   [
    "Pre-trained model",
    "A model already trained by the provider that you can use immediately without your own training data."
   ],
   [
    "OCR",
    "Optical character recognition: extracting text from images of printed or handwritten documents."
   ],
   [
    "Sentiment analysis",
    "Determining whether text expresses a positive, negative or neutral opinion."
   ],
   [
    "Entity extraction",
    "Identifying names of people, places, organizations and other items in text."
   ],
   [
    "Document AI",
    "A Google Cloud service that extracts structured fields and tables from documents such as invoices, receipts and forms."
   ],
   [
    "SafeSearch",
    "A Vision API feature that flags explicit or violent content in images."
   ]
  ],
  "example": "A hotel chain sends every guest review to the Natural Language API to score sentiment and pull out mentioned topics such as 'breakfast' or 'wifi'. Negative reviews about specific topics are routed to the right manager the same day, with no data science team involved.",
  "mistakes": [
   [
    "The Vision API can identify who a person in a photo is.",
    "The Vision API detects faces and some facial attributes, but it does not identify individuals."
   ],
   [
    "To analyze sentiment in customer reviews, you must first train a model on your own reviews.",
    "The Natural Language API is pre-trained and returns sentiment immediately, with no training data needed."
   ],
   [
    "The Natural Language API is the right choice to read text from a scanned image.",
    "Reading text in an image is OCR, a Vision API or Document AI task. Natural Language analyzes the meaning of text you already have."
   ],
   [
    "Pre-trained APIs can recognize anything specific to your business.",
    "They handle common tasks. Business-specific items, such as your own product defects, usually need a custom model built with AutoML or custom training."
   ]
  ],
  "tryit": [
   [
    "Greenfield Utilities receives thousands of scanned paper meter-reading forms each month. It wants the customer number, reading date and meter value typed into its billing system automatically. A team member suggests the Natural Language API because the forms contain text. Which service fits better, and why?",
    "Document AI fits best, because the goal is to extract specific structured fields from forms, not to analyze the meaning of text. The Vision API could read the raw text through OCR, but Document AI goes further and returns the fields as labeled data. The Natural Language API works on text you already have and does not read images."
   ],
   [
    "A podcast network wants every episode to have written captions in English and Spanish within an hour of upload, with no ML staff. Which two APIs would you chain?",
    "Speech-to-Text to turn the audio into English text, then the Translation API to produce the Spanish version. Both are pre-trained, so no training data or ML expertise is needed."
   ]
  ],
  "tip": "Common task plus no ML skills plus need it quickly equals a pre-trained API. The Vision API reads text in images; the Natural Language API analyzes meaning in text; Translation converts between languages.",
  "check": [
   [
    "Which API would you use to transcribe recorded customer calls?",
    "Speech-to-Text."
   ],
   [
    "When is a pre-trained API not enough?",
    "When the task is specific to your business, such as your own product defects or specialized terms, so a customized model is needed."
   ],
   [
    "Which API would help a retailer find which products are mentioned in thousands of customer emails?",
    "The Natural Language API, using entity extraction."
   ]
  ]
 },
 {
  "t": "BigQuery ML: building and using models with SQL where the data already lives",
  "hook": "Jenna leads a team of four business analysts at Riverbend Subscriptions, a meal-kit company. Every one of them writes SQL all day against the company's BigQuery warehouse, which holds three years of orders, deliveries and cancellations. The executive team wants a weekly list of customers likely to cancel so the retention team can call them. The data science team, all two of them, says they can start in four months, once data has been exported to their own tools and reviewed for security. Jenna wonders whether her analysts could build a reasonable model themselves next week, without learning Python or moving a single row of data. Could they?",
  "simple": "BigQuery is Google Cloud's data warehouse, a place where companies store and query huge tables of business data using SQL, the common language for asking questions of databases. BigQuery ML lets people who already know SQL build simple prediction models right inside BigQuery, using a few extra SQL commands. Think of it like a spreadsheet that, besides adding up columns, can also learn from past rows to guess a missing value in new rows, such as whether a customer is likely to cancel. Because the data never leaves BigQuery, there is no copying, and the same security rules still apply.",
  "body": [
   "Many organizations keep their most valuable business data in BigQuery, Google Cloud's serverless data warehouse, and many of their analysts are fluent in SQL (Structured Query Language) but not in Python or machine learning (ML) frameworks. Traditionally, building a model meant exporting data to a separate environment and handing the work to scarce data scientists. BigQuery ML closes that gap. It lets you create, train, evaluate and use ML models with SQL statements, directly inside BigQuery, where the data already lives.",
   "The workflow looks like ordinary SQL. You write a `CREATE MODEL` statement that names the model and its type, identifies the column you want to predict, called the label, and selects the training rows from a table. BigQuery then trains the model. A simple churn model might look like this:",
   "```sql\nCREATE OR REPLACE MODEL `shop.churn_model`\nOPTIONS (model_type = 'logistic_reg', input_label_cols = ['churned']) AS\nSELECT tenure_months, orders_last_90_days, support_tickets, churned\nFROM `shop.customer_history`;\n```",
   "After training, `ML.EVALUATE` reports how accurate the model is, using measures appropriate to the model type, so the team can decide whether it is good enough to use. `ML.PREDICT` applies the model to new rows, for example this week's active customers, and returns the predictions as ordinary query results. Because the output is just another table, it can be joined with other data, saved for later, scheduled to run every week, or shown in a dashboard in Looker Studio or Looker. The retention team never needs to know that a model was involved; they simply see a ranked list of customers at risk.",
   "Using the model is just as approachable. A query that calls `ML.PREDICT`, passing the model name and a `SELECT` of the active customers table, returns every active customer along with new columns, such as `predicted_churned` and the predicted probability for each outcome. An analyst can sort by that probability, keep the top few hundred customers, and save the result to a table that the retention team's dashboard reads. Scheduled queries can rerun this every Monday morning, so the list stays fresh without anyone pressing a button. Retraining is simply rerunning the `CREATE OR REPLACE MODEL` statement on newer data.",
   "BigQuery ML supports the model types behind most everyday business predictions. Linear regression predicts a number, such as next month's spend per customer. Logistic regression predicts a yes-or-no outcome, such as whether a customer will cancel or a transaction is fraudulent. K-means clustering groups similar records, such as customer segments with similar buying habits, without needing a label. Time-series forecasting, through the ARIMA_PLUS model type, predicts future values such as weekly demand per store. There are also recommendation models and more advanced types such as boosted trees and deep neural networks. BigQuery ML can also connect to models hosted in Vertex AI, including generative AI models such as Gemini, so analysts can call them from SQL, for example to summarize a column of customer comments or classify support messages.",
   "The key advantages are speed, simplicity and security. Data does not have to be exported to a separate ML system, which saves time, avoids creating extra copies of sensitive data, and keeps the existing BigQuery access controls in force. Analysts who understand the business can build useful models themselves instead of waiting in a queue for data scientists. Training uses BigQuery's scalable, serverless processing, so there are no clusters to manage, and costs follow normal BigQuery pricing, largely based on the data processed. For an organization, this widens the number of people who can apply ML, sometimes called democratizing ML.",
   "BigQuery ML is not meant for every problem. Highly customized deep learning, unusual model architectures, complex image, audio or video data, and problems where a skilled team wants full control over every detail are better handled with custom training in Vertex AI. Teams sometimes start with BigQuery ML to prove business value quickly and later move a successful model to Vertex AI for more advanced management. For many structured-data business predictions, though, BigQuery ML is the quickest path from data to results.",
   "You can explore it at no cost in the BigQuery sandbox, using one of the public datasets that Google hosts. On the exam, watch for the clues: analysts who know SQL, data already in BigQuery, and a common prediction task on structured, tabular data. That combination points to BigQuery ML."
  ],
  "analogy": "BigQuery ML is like a kitchen that comes with a built-in oven. Instead of carrying your ingredients across town to a professional bakery, waiting for a slot and trusting them with your recipes, you bake right where the ingredients are stored, using controls you already know. It works well for everyday bread and cakes. If you want an elaborate wedding cake with custom sculpture, you still go to a specialist pastry chef, which in this story is custom training in Vertex AI.",
  "terms": [
   [
    "BigQuery ML",
    "A BigQuery feature for creating, training and using ML models with SQL."
   ],
   [
    "CREATE MODEL",
    "The SQL statement that defines and trains a model in BigQuery ML."
   ],
   [
    "ML.PREDICT",
    "The BigQuery ML function that applies a trained model to data to produce predictions."
   ],
   [
    "Logistic regression",
    "A model type that predicts the probability of a yes-or-no outcome."
   ],
   [
    "ML.EVALUATE",
    "The BigQuery ML function that reports how well a trained model performs."
   ],
   [
    "Label (in BigQuery ML)",
    "The column a model learns to predict, set with the input_label_cols option."
   ],
   [
    "K-means clustering",
    "A model type that groups similar records together without a label, often used for customer segmentation."
   ]
  ],
  "example": "A subscription box company's analysts write a `CREATE MODEL` query on two years of customer data in BigQuery to predict who is likely to cancel. They run `ML.PREDICT` each week and feed the results into a Looker Studio dashboard for the retention team, all without moving any data.",
  "mistakes": [
   [
    "To use BigQuery ML, you must first export data to Vertex AI or another ML tool.",
    "BigQuery ML trains and runs models inside BigQuery, so the data stays where it is under existing access controls."
   ],
   [
    "BigQuery ML requires Python programming skills.",
    "Models are created, evaluated and used with SQL statements such as CREATE MODEL, ML.EVALUATE and ML.PREDICT."
   ],
   [
    "BigQuery ML is the best choice for any ML problem, including complex image recognition.",
    "It is aimed at structured business data and common model types. Highly customized or unstructured-data problems are better suited to Vertex AI."
   ],
   [
    "BigQuery ML cannot use generative AI models.",
    "It can connect to models hosted in Vertex AI, including generative models, and call them from SQL."
   ]
  ],
  "tryit": [
   [
    "Copperline Hardware's analysts want to group its 400,000 loyalty members into a handful of segments with similar buying patterns for targeted marketing. The purchase history is already in BigQuery, the analysts know SQL, and nobody has labeled the customers in advance. Which BigQuery ML model type fits, and why?",
    "K-means clustering. The goal is to group similar customers, and clustering does not need a label column, which matches the fact that no one has labeled the customers. The analysts can create it with CREATE MODEL in SQL and keep the data in BigQuery."
   ]
  ],
  "tip": "SQL-skilled analysts plus data already in BigQuery plus a common prediction task equals BigQuery ML. It avoids moving data and needs no Python.",
  "check": [
   [
    "What are two benefits of BigQuery ML?",
    "Analysts can use SQL instead of learning new tools, and data stays in BigQuery with no export, keeping it secure and saving time."
   ],
   [
    "Which BigQuery ML function returns predictions?",
    "ML.PREDICT."
   ],
   [
    "Which BigQuery ML model type would you use to predict next quarter's weekly sales per store?",
    "A time-series forecasting model, such as the ARIMA_PLUS model type."
   ]
  ]
 },
 {
  "t": "Vertex AI: the unified ML platform, AutoML and custom training",
  "hook": "At Pinecrest Furniture, the quality manager, Aaron, has a problem that no off-the-shelf service solves. A few chairs a week leave the factory with a hairline crack in a joint, and customers notice before inspectors do. He has 20,000 photos of joints, each labeled good or faulty by experienced inspectors, but nobody on staff has ever trained a model. Meanwhile, the company's new data scientist wants to experiment with her own neural network code and needs powerful hardware. The CIO asks you whether both of these very different needs can live on one Google Cloud platform, and which path each person should take.",
  "simple": "Vertex AI is Google Cloud's one-stop workshop for building and running machine learning models. It offers two main ways to make your own model. AutoML is like a smart kit: you bring your own labeled examples, such as photos marked good or bad, and the service figures out the best way to learn from them with little or no coding. Custom training is like a full workshop: a skilled data scientist writes their own code and chooses every tool. Vertex AI also handles the jobs that come after building, like putting the model online for apps to use and watching it so you know if it starts making more mistakes over time.",
  "body": [
   "Vertex AI is Google Cloud's unified platform for building, deploying and managing machine learning (ML) and generative artificial intelligence (AI). Before unified platforms, teams stitched together separate tools for preparing data, training models, tracking experiments, serving predictions and monitoring results, each with its own security setup and its own learning curve. Vertex AI brings these steps together, so data scientists, ML engineers and analysts work in one place with consistent identity and access controls, governance and billing. For the Cloud Digital Leader exam, think of Vertex AI as the home for the whole ML lifecycle on Google Cloud.",
   "Vertex AI offers two main ways to build your own predictive models: AutoML and custom training. Both produce a model trained on your data, which is what distinguishes them from pre-trained APIs. The difference is how much expertise and control each requires.",
   "AutoML lets you train a high-quality model on your own labeled data with little or no code. You provide the data, for example images labeled defect or no defect, or a table with a target column you want to predict, and choose the objective, such as classification or regression. AutoML then handles the technical choices that normally require an expert: trying different model architectures, tuning settings called hyperparameters, and evaluating results. It suits teams that have valuable domain data but limited ML expertise, and it supports data types such as tabular data and images. The result is a custom model that understands your business, such as your own products or document types, which a general pre-trained API would not.",
   "Custom training gives full control. Data scientists write their own training code using frameworks such as TensorFlow, PyTorch or scikit-learn, package it, and run it on Google-managed infrastructure. They choose the machine types and can attach accelerators, such as graphics processing units (GPUs) or Google's Tensor Processing Units (TPUs), and they tune every detail of the model. Custom training is the right choice when the problem is unique, when the model itself is a source of competitive advantage, or when AutoML cannot meet the accuracy, size or behavior requirements. The trade-off is that it needs more skill, more time and more ongoing effort.",
   "Training a model is only the beginning. Running ML reliably in production is a discipline often called MLOps, a blend of ML and operations practices, and Vertex AI provides tools for it. Managed datasets and data labeling help prepare training examples. Vertex AI Workbench provides managed notebooks where data scientists explore data and write code. Vertex AI Pipelines automate repeatable workflows, such as retraining a model every month on fresh data. The Model Registry tracks model versions so teams know exactly which model is in use. Endpoints serve online predictions to applications in real time, while batch prediction scores large datasets at once, such as every customer overnight.",
   "Further capabilities support quality and trust. Feature management lets teams store and reuse the input values models depend on, so training and serving use consistent data. Model evaluation compares versions and reports accuracy measures. Explanation features show which inputs most influenced a prediction, supporting responsible AI. Model monitoring watches live predictions and alerts when incoming data starts to differ from training data, a sign of drift that may require retraining. Together, these tools turn a one-off experiment into a dependable business service. Without them, a model that worked well in a notebook can quietly degrade in production, and nobody notices until a business result, such as a rise in missed defects or fraud losses, reveals the problem weeks later. Leaders should budget for this operational work from the start, not treat it as optional.",
   "Vertex AI is also where Google Cloud's generative AI tools live, including access to Gemini and other foundation models, Model Garden for discovering models, and Vertex AI Studio for prototyping prompts, which are covered in a later lesson. This matters for leaders because one platform, with one set of security and governance controls, covers both predictive ML and generative AI.",
   "For the exam, keep three ideas straight. AutoML is for building a custom model on your own labeled data with little ML expertise. Custom training is for full control when you have skilled data scientists and a unique or strategic problem. Vertex AI is the platform that unifies the ML lifecycle, from data preparation through training, deployment and monitoring, for both approaches."
  ],
  "analogy": "Vertex AI is like a well-equipped community workshop. AutoML is the guided station where you bring your own wood and measurements, and a machine cuts and assembles a sturdy table for you with little skill required. Custom training is the open bench where an expert carpenter uses their own techniques and tools to craft something unique. The workshop also provides storage, labels for every version you build, and inspections afterward. The analogy stops short in one way: an AutoML model still depends entirely on the quality of the labeled data you bring.",
  "terms": [
   [
    "Vertex AI",
    "Google Cloud's unified platform for building, deploying and managing ML and generative AI."
   ],
   [
    "AutoML",
    "Training a custom model on your own data with little or no code; the service handles model design and tuning."
   ],
   [
    "Custom training",
    "Training with your own code and framework for full control over the model."
   ],
   [
    "MLOps",
    "Practices and tools for deploying, monitoring and maintaining ML models in production."
   ],
   [
    "Endpoint",
    "A deployed model in Vertex AI that applications call for real-time predictions."
   ],
   [
    "Model Registry",
    "A Vertex AI catalog that tracks trained models and their versions."
   ],
   [
    "Hyperparameters",
    "Settings chosen before training that control how a model learns; AutoML tunes them automatically."
   ]
  ],
  "example": "A furniture maker has 20,000 photos of chair joints labeled good or faulty but no ML team. It uses AutoML image training in Vertex AI, deploys the model to an endpoint, and the factory camera system calls it for every chair. Later, a hired data scientist uses custom training to build a more specialized model.",
  "mistakes": [
   [
    "AutoML means you do not need any data of your own.",
    "AutoML trains a custom model on your own labeled data. Pre-trained APIs are the option that needs no training data."
   ],
   [
    "Custom training is always better because it gives more control.",
    "It costs more skill and time. AutoML or simpler options are better when they meet the requirements."
   ],
   [
    "Vertex AI is only for training models.",
    "It covers the whole lifecycle: data, training, registry, deployment to endpoints, batch prediction, evaluation, explanations and monitoring, plus generative AI tools."
   ],
   [
    "Once a model is deployed to an endpoint, it stays accurate.",
    "Data can drift away from the training data. Model monitoring detects this so teams can retrain."
   ]
  ],
  "tryit": [
   [
    "Oakridge Legal has 50,000 past contracts that paralegals have already tagged by contract type. It wants a model to tag new contracts automatically. The firm has no data scientists, but it has a solid IT team. Its competitor, by contrast, wants to build a proprietary contract risk-scoring engine as its main product and has hired six ML engineers. Which Vertex AI approach suits each firm?",
    "Oakridge Legal should use AutoML: it has its own labeled data but little ML expertise and needs a custom model for its own document types. The competitor should use custom training: the model is its core competitive advantage, and it has the skilled team to control every detail. Both can run on Vertex AI."
   ]
  ],
  "tip": "Own labeled data plus little ML expertise points to AutoML. Unique, differentiating problem plus skilled data scientists points to custom training. Both run on Vertex AI.",
  "check": [
   [
    "When is AutoML a better fit than custom training?",
    "When a team has its own labeled data but limited ML expertise and needs a good custom model quickly."
   ],
   [
    "Name three MLOps capabilities in Vertex AI.",
    "Any three of: pipelines, model registry, endpoints for serving, batch prediction, model monitoring, evaluation and explanations, feature management."
   ],
   [
    "Which Vertex AI capability would alert a team that live data no longer looks like the training data?",
    "Model monitoring, which detects drift so the model can be retrained."
   ]
  ]
 },
 {
  "t": "Choosing an AI approach: pre-trained API, BigQuery ML, AutoML or custom model",
  "hook": "It is the quarterly planning meeting at Fairway Grocers, and four AI proposals are on the table. Marketing wants product descriptions translated into Spanish and Vietnamese. Finance wants weekly demand forecasts from the sales tables its SQL analysts already query in BigQuery. Store operations has 30,000 shelf photos labeled with the company's own private-label products and wants a model that spots empty shelves. And the pricing team, with its three data scientists, wants to build a proprietary pricing engine that competitors cannot copy. The CFO turns to you: do these all need the same tool and the same budget, or is there a smarter way to match each request to an approach?",
  "simple": "Google Cloud gives you several ways to use AI, from ready-made to fully homemade. Think of getting dinner. You can order takeout (a pre-trained API: instant, no cooking skills needed, but you eat what is on the menu). You can use a meal kit in your own kitchen with ingredients you already have (BigQuery ML for people who know SQL, or AutoML when you bring your own labeled examples). Or a trained chef can cook from scratch (custom training: anything is possible, but it takes skill and time). The smart move is to pick the simplest option that gives you what you need, and only move to more effort when the simpler one is not good enough.",
  "body": [
   "Google Cloud offers several ways to add artificial intelligence (AI) to a business, and the Cloud Digital Leader exam frequently asks which one fits a scenario. The good news is that the choice follows a small set of clues. You balance four things: how common or unique the problem is, what data you have and where it lives, what skills the team has, and how quickly you need results. Read a scenario with those four questions in mind and the answer usually becomes clear.",
   "Pre-trained application programming interfaces (APIs), such as Vision, Natural Language, Speech-to-Text and Translation, along with ready-to-use generative models, need no training at all. You send data and receive results. Choose them when the task is common, such as reading text in images, translating, transcribing calls or detecting sentiment, and the team wants results immediately without machine learning (ML) expertise. The trade-off is limited customization: the model knows general things, not your company's specific products or terminology. Time to value is the fastest of any option.",
   "BigQuery ML suits structured business data that already lives in BigQuery, when analysts know SQL (Structured Query Language). Typical tasks are forecasting demand, classification such as predicting customer churn or fraud, and customer segmentation through clustering. Analysts create and use models with SQL statements, so no new programming skills are needed, and data never leaves BigQuery, which saves time and keeps existing access controls in force. Watch for the phrases SQL analysts and data in BigQuery in exam questions. If the same scenario instead describes photos, audio or a team of experienced data scientists who want full control, BigQuery ML is probably a distractor, and a Vertex AI option is the better match.",
   "AutoML in Vertex AI suits problems specific to your business when you have labeled data but little ML expertise. Examples include recognizing your own products in shelf photos, classifying your own document types, or predicting an outcome from a table of your own records. AutoML produces a custom model trained on your data, handling the choice of model design and tuning for you, with much less effort than writing your own training code. The key clue is own labeled data plus limited expertise.",
   "Custom training in Vertex AI suits unique, complex or strategically important problems where you need full control, and you have skilled data scientists and time. Teams write their own code in frameworks such as TensorFlow or PyTorch and choose their hardware. It offers the most flexibility and the greatest potential for competitive differentiation, at the highest cost in skill, effort and ongoing maintenance. The clues are unique problem, full control, competitive advantage and an experienced data science team.",
   "A helpful way to remember all this is a ladder of effort. Start with the simplest option that meets the need, and move up a rung only when it cannot. A company might begin with the Translation API, then improve results for its own product names with a glossary, and build a custom translation model only if the business case justifies the cost. Starting low delivers value sooner, proves whether the idea is worth pursuing, and avoids spending scarce data science time on problems that a ready-made service already solves.",
   "Generative AI has a similar ladder. First, prompt a foundation model such as Gemini, refining instructions and examples, which is called prompt engineering. Next, ground the model in company data so that answers reflect your documents and policies rather than only its training data. If that is still not enough, tune the model with additional examples so it learns a particular style or task. Only rarely does an organization train a large model from scratch, because of the enormous data, expertise and computing cost involved.",
   "Finally, remember the build versus buy question. Sometimes the best option is not to build a model at all but to adopt a finished product that already embeds AI, such as a contact center AI solution or AI features built into productivity tools like Google Workspace. Buying usually delivers value fastest, while building gives more control and differentiation. On the exam, when a scenario describes a common business function and a desire for quick results, a packaged solution or pre-trained API is usually preferred over a custom build."
  ],
  "analogy": "Choosing an AI approach is like furnishing an office. You can buy a ready-made chair from a catalog (pre-trained API), assemble a flat-pack desk using tools you already own (BigQuery ML for SQL users), order a made-to-measure cabinet by sending your own measurements (AutoML with your labeled data), or hire a cabinetmaker for a one-of-a-kind boardroom table (custom training). Most offices are furnished mostly from the catalog, with only one or two custom pieces. The analogy is imperfect because AI models need ongoing monitoring, while furniture does not drift.",
  "mnemonic": "The effort ladder from least to most effort: Pre-trained API, BigQuery ML, AutoML, Custom training. Remember it as 'Please Build Another Copy', and climb only when the rung below cannot meet the need.",
  "terms": [
   [
    "Build vs buy",
    "Deciding whether to develop a solution in-house or use an existing product or service."
   ],
   [
    "Customization",
    "How much a model can be adapted to an organization's specific data and needs."
   ],
   [
    "Time to value",
    "How quickly an approach starts delivering business results."
   ],
   [
    "Tuning",
    "Adapting a pre-trained or foundation model with additional examples for a specific task."
   ],
   [
    "Ladder of effort",
    "Starting with the simplest AI option that meets a need and moving to more effort only when required."
   ],
   [
    "Grounding",
    "Connecting a generative model's answers to trusted data sources such as company documents."
   ]
  ],
  "example": "A retailer uses the Translation API to translate its website, BigQuery ML to forecast weekly demand from sales tables, AutoML to recognize its own products in shelf photos, and a custom model built by its data science team for its core pricing engine.",
  "mistakes": [
   [
    "Custom training is always the best choice because it is the most powerful.",
    "It is the most flexible but also the most expensive in skill, time and maintenance. Use it only when simpler options cannot meet the need."
   ],
   [
    "AutoML is for teams with no data of their own.",
    "AutoML trains on your own labeled data. Pre-trained APIs are the option for teams with no training data."
   ],
   [
    "To get a generative model to answer from company policies, you must train a new model from scratch.",
    "Grounding the model in company data, and tuning if needed, is far cheaper and more common than training from scratch."
   ],
   [
    "BigQuery ML is for any team, regardless of where data lives or what skills they have.",
    "Its main advantages apply when data is already in BigQuery and analysts know SQL."
   ]
  ],
  "tryit": [
   [
    "Westbrook Insurance wants to classify incoming claim emails into twelve claim types that are specific to its own products. It has 80,000 past emails already labeled by claim handlers, a small IT team, and no data scientists. Leadership wants a working model within a couple of months. Which approach fits, and why not the others?",
    "AutoML in Vertex AI. The categories are specific to Westbrook, so a general pre-trained API would not know them; the company has its own labeled examples but no data scientists, which rules out custom training as a first step; and the data is free-text emails rather than tables of structured data in BigQuery queried by SQL analysts."
   ],
   [
    "A city library wants its website available in eight languages next month and has no technical staff beyond a web administrator. Which approach?",
    "A pre-trained API, the Translation API. The task is common, there is no ML expertise, and the timeline is short."
   ]
  ],
  "tip": "Read the clues: 'no ML expertise, common task' is a pre-trained API; 'SQL analysts, data in BigQuery' is BigQuery ML; 'own labeled data, little expertise' is AutoML; 'unique, full control, data scientists' is custom training.",
  "check": [
   [
    "A team of SQL analysts wants to segment customers using data in BigQuery. Which approach?",
    "BigQuery ML, using a clustering model created with SQL."
   ],
   [
    "Why start with the simplest AI option that meets the need?",
    "It delivers value fastest with the least cost and skill; more complex options are justified only when simpler ones cannot meet the requirement."
   ],
   [
    "A company's core product is a unique fraud engine, and it has a team of experienced data scientists. Which approach fits?",
    "Custom training in Vertex AI, because the problem is unique and strategic and the team has the skills to use full control."
   ]
  ]
 },
 {
  "t": "Generative AI on Google Cloud: Gemini models, Vertex AI Model Garden and Vertex AI Studio",
  "hook": "Rosa leads the claims operations team at Granite Mutual Insurance. Her adjusters spend the first hour of every complex claim reading hundreds of pages of photos, repair estimates and medical notes just to understand what happened. The CIO has approved a pilot using generative AI to produce a one-page summary of each claim file. Rosa is immediately flooded with questions from her team. Which model should we use, and how do we compare them? Where do we test prompts before writing any code? Can the model read photos as well as text? And will our customers' private claim data end up training someone else's AI?",
  "simple": "Generative AI is AI that creates new content, like a written summary, an image or a piece of code, when you describe what you want in plain words. Gemini is Google's family of these models. It is multimodal, which means it can understand several kinds of input at once, like reading a letter and looking at a photo together. Vertex AI Model Garden is like a catalog where you browse and compare many models, from Google and others, to pick the right one. Vertex AI Studio is like a test kitchen where you try out instructions to a model, see what it produces, and adjust before putting it into a real app.",
  "body": [
   "Generative artificial intelligence (AI) lets organizations create text, images, code and other content from natural language instructions called prompts. Instead of training a model for each narrow task, businesses can use large foundation models, which are trained on broad data and can be adapted to many tasks. Google Cloud provides access to Google's own foundation models and to many others, along with tools to test, customize and deploy them securely for business use. The Cloud Digital Leader exam expects you to know the main pieces and what each is for.",
   "Gemini is Google's family of multimodal foundation models. Multimodal means the models can understand and work with several types of input, such as text, images, audio, video and code, in the same request. A single prompt might include a photo of a damaged car and a written repair estimate, asking whether the two are consistent. Businesses use Gemini to summarize long documents, answer questions, draft emails and reports, extract information from files, write and explain code, and power chat assistants. The family comes in different sizes that trade capability against speed and cost: a larger model for complex reasoning, a smaller and faster one for high-volume, simple tasks.",
   "Google also offers specialized generative models, for example Imagen for creating and editing images. Model names and versions change frequently as new releases arrive, so for the exam focus on capabilities and fit rather than memorizing version numbers. A question is far more likely to ask which kind of model handles text and images together than which version was released when.",
   "Vertex AI Model Garden is a catalog where you can discover, compare and deploy models. It includes Google's first-party models, models from partner companies, and open models whose weights are publicly available. A team can evaluate several options for a task and choose the best balance of quality, cost, speed and control. Some organizations prefer an open model they can host and adapt themselves for reasons of control or cost; others prefer a fully managed Google model. Model Garden puts these choices side by side within the same platform and its security controls.",
   "Vertex AI Studio is an environment in the Google Cloud console for prototyping with generative models. You can write and refine prompts, adjust settings such as how creative or predictable the output should be, compare responses from different models, and then get the code needed to call the model from an application. It lets business and technical people experiment quickly before committing to a design. From there, a team can improve results through prompt design, grounding the model in its own data so answers reflect company documents, or tuning the model with examples so it learns a particular style or task.",
   "Prompt quality matters a great deal. Clear instructions, relevant context, a role for the model to play, the desired output format and a few examples usually produce better and more consistent results. Asking for a summary for an adjuster in five bullet points covering cause, damage, cost and open questions works far better than simply asking to summarize this file. Designing prompts this way is called prompt engineering, and it is the cheapest first step on the path to better results. Because it needs no new data or training, a team can iterate on prompts in minutes and measure the improvement before spending anything on grounding or tuning.",
   "Enterprises need more than a clever model, and this is a key exam theme. Vertex AI provides security controls such as identity and access management, data governance, and responsible AI features such as safety filters that block or flag harmful content. Google Cloud states that customer prompts and data used with its enterprise generative AI services are not used to train Google's models without permission. That commitment answers one of the most common concerns business leaders raise before adopting generative AI.",
   "Gemini also appears beyond Vertex AI. It is built into Google Workspace, helping people draft documents, summarize email threads and organize information, and into Gemini for Google Cloud, which helps developers and operators write code, understand their environments and troubleshoot on the platform. On the exam, keep the roles distinct: Gemini is the model family, Model Garden is where you find and choose models, and Vertex AI Studio is where you test prompts and prototype."
  ],
  "analogy": "Think of building a generative AI solution like hiring for a new role. Model Garden is the recruiting agency with candidates from many backgrounds; you compare them on skill, cost and availability. Gemini is a versatile candidate who can read documents, look at photos and listen to recordings. Vertex AI Studio is the trial day, where you give instructions, see the results and refine how you brief them. The analogy breaks down in one place: a model, unlike a new hire, does not remember your company's facts unless you ground it in your data.",
  "terms": [
   [
    "Gemini",
    "Google's family of multimodal foundation models."
   ],
   [
    "Multimodal",
    "Able to process more than one type of data, such as text, images and audio, together."
   ],
   [
    "Vertex AI Model Garden",
    "A catalog in Vertex AI for discovering, testing and deploying Google, partner and open models."
   ],
   [
    "Prompt engineering",
    "Designing inputs to a generative model to get more useful and reliable outputs."
   ],
   [
    "Foundation model",
    "A large model trained on broad data that can be adapted to many different tasks."
   ],
   [
    "Vertex AI Studio",
    "A console environment for testing prompts, comparing model responses and prototyping generative AI."
   ],
   [
    "Tuning",
    "Adapting a foundation model with additional examples so it performs better on a specific task or style."
   ]
  ],
  "example": "An insurance company uses Vertex AI Studio to test prompts that summarize long claim files into a one-page brief. After comparing two models from Model Garden on quality and cost, it deploys the chosen Gemini model behind an internal app, with safety filters and access controls in place.",
  "mistakes": [
   [
    "Model Garden is where you write and test prompts.",
    "Model Garden is the catalog for discovering, comparing and deploying models. Vertex AI Studio is where you prototype prompts."
   ],
   [
    "Multimodal means the model supports many human languages.",
    "Multimodal means it handles several data types, such as text, images, audio and video, in the same request."
   ],
   [
    "Model Garden only contains Google's own models.",
    "It includes Google's first-party models, partner models and open models."
   ],
   [
    "Customer prompts sent to Google Cloud's enterprise generative AI services are used to train Google's public models.",
    "Google Cloud states that customer data in these services is not used to train its models without permission."
   ]
  ],
  "tryit": [
   [
    "Lumen Architecture wants an internal assistant that reviews building plans (images) along with the written client brief and drafts a list of potential code issues. The team has not yet decided which model to use, and the project lead wants to try prompts before any developer writes code. Which Google Cloud tools should the team use for choosing a model and for testing prompts, and what model capability does the task require?",
    "The team should compare candidate models in Vertex AI Model Garden and test prompts in Vertex AI Studio, which can also generate the code to call the chosen model later. The task requires a multimodal model, such as Gemini, because it combines images of the plans with written text in the same request."
   ]
  ],
  "tip": "Model Garden is for finding and choosing models; Vertex AI Studio is for testing prompts and prototyping; Gemini is the model family. Multimodal means text plus images, audio or video in the same model.",
  "check": [
   [
    "What does 'multimodal' mean for a model such as Gemini?",
    "It can take in and reason over several data types, such as text, images, audio and video, in the same request."
   ],
   [
    "Where would a team compare Google, partner and open models before choosing one?",
    "Vertex AI Model Garden."
   ],
   [
    "Which tool lets a team test prompts and then copy code to call the model from an app?",
    "Vertex AI Studio."
   ]
  ]
 },
 {
  "t": "Grounding, agents and AI-powered search and conversation for business",
  "hook": "Two weeks after Skyline Regional Airways launched its new chatbot, the customer care lead, Imani, is reading complaints. One traveler was told checked bags are free on all routes, which has not been true for years. Another was promised a full cash refund for a delay that the policy covers only with a travel voucher. The chatbot sounded confident and polite every time. The vendor's suggestion is a bigger model with more computing power. Imani suspects the problem is something else entirely: the bot simply does not know the airline's current policies, and it cannot look up a booking. What should she ask for instead?",
  "simple": "A generative AI model learned from a huge pile of public text up to a certain date. It does not know your company's own rules, products or today's prices, and when it does not know something it may make up an answer that sounds right. That is called a hallucination. Grounding fixes this by letting the model look things up first. It is like an employee who checks the official handbook before answering a customer instead of guessing from memory. An AI agent goes one step further: besides answering, it can take actions, such as checking an order or booking an appointment, the way a helpful assistant would use the company's systems on your behalf.",
  "body": [
   "Foundation models are trained on huge amounts of mostly public data up to a point in time. On their own, they do not know a company's internal policies, its product catalog, a customer's order history or yesterday's prices. Worse, when they lack information they may still produce fluent, confident answers that are incorrect or invented. These are called hallucinations. For business uses of generative artificial intelligence (AI), the key is therefore connecting models to the right data and, increasingly, to the right actions. The Cloud Digital Leader exam focuses on the concepts and on matching them to scenarios.",
   "Grounding means connecting a model's responses to trusted, verifiable sources, so answers are based on real information rather than only on what the model absorbed during training. Grounding sources can include a company's documents and databases, its websites, or a public web search. When an exam scenario describes a chatbot giving made-up or outdated answers about company information, grounding in trusted company data is the expected fix. A larger model or more computing power would not help, because the missing ingredient is information, not capacity.",
   "A common grounding technique is retrieval-augmented generation (RAG). When a user asks a question, the system does not send it straight to the model. It first searches a knowledge source, such as a collection of policy documents, retrieves the most relevant passages, and passes them to the model along with the question and an instruction to answer using that content. The model then writes its response based on those passages and can cite them. In practice, a traveler asking about delay compensation would get an answer drawn from the current compensation policy, with a reference the traveler or an agent can check.",
   "RAG has several business advantages. It improves accuracy because the answer is anchored to real content. It keeps answers current without retraining the model: when a policy changes, you update the document, and the next answer reflects it. It makes responses easier to verify, because citations show where the information came from. And it lets an organization respect access controls, retrieving only documents the user is allowed to see. This is why grounding is usually a far cheaper and faster route to useful business answers than tuning or training a model.",
   "Enterprise search applies the same ideas to finding information. Traditional search matches keywords, so an employee searching for time off for a new baby might miss a document titled parental leave policy. AI-powered search understands the meaning of a question, finds relevant content across a company's websites, documents and structured data, and can return a direct, summarized answer with links to the sources. Google Cloud provides services in Vertex AI, such as Vertex AI Search, to build this kind of search and conversational experience over an organization's own content without building the retrieval system from scratch. Product names in this area evolve, so focus on what the capability does.",
   "An AI agent goes a step further than answering questions. An agent uses a model to reason about a goal, plan the steps needed, and take actions through tools and application programming interfaces (APIs), such as looking up an order, updating a support ticket, issuing a voucher or booking an appointment. It then checks the result and decides what to do next. Customer service agents that resolve requests end to end, employee help desk agents that reset access or answer HR questions, and coding assistants that write and test code are common examples.",
   "Because agents act rather than just talk, they carry more risk, and they need clear limits. Good practice includes giving an agent only the permissions it needs, requiring human approval for sensitive or irreversible actions such as large refunds, logging every action for review, and testing how the agent behaves with unusual or malicious requests. These safeguards connect directly to the responsible AI themes of accountability and safety.",
   "Conversational AI for contact centers combines all of these pieces. It understands what a customer says or types, answers from trusted, grounded content, takes simple actions through back-end systems, and hands off to a human when needed, passing along a summary so the customer does not have to repeat themselves. It also helps human agents in real time with suggested replies and relevant knowledge articles, and it can summarize calls afterward. For a business leader, the value is faster resolution, consistent answers and more time for staff to handle the conversations that truly need a person."
  ],
  "analogy": "A plain foundation model is like a well-read new employee answering customer questions from memory on day one: articulate, but likely to guess about your company's rules. Grounding hands that employee the current policy binder and asks them to quote it. An agent is the same employee also given a login to the booking system, allowed to make changes within limits, with a manager approving anything unusual. The analogy has a limit: unlike a person, the model will not realize on its own that it is guessing.",
  "terms": [
   [
    "Hallucination",
    "A confident but incorrect or made-up output from a generative model."
   ],
   [
    "Grounding",
    "Connecting model outputs to trusted sources so responses are based on real information."
   ],
   [
    "Retrieval-augmented generation (RAG)",
    "Retrieving relevant content from a knowledge source and giving it to the model with the question."
   ],
   [
    "AI agent",
    "A system that uses a model to plan and take actions through tools to achieve a goal."
   ],
   [
    "Enterprise search",
    "AI-powered search that understands the meaning of a question and returns answers from an organization's own content, with sources."
   ],
   [
    "Citation",
    "A reference showing which source document a grounded answer came from."
   ]
  ],
  "example": "An airline builds a customer assistant grounded in its current baggage and refund policies. When a traveler asks about a delayed flight, the agent retrieves the right policy, checks the booking through an API, and offers rebooking options, handing off to a human for unusual cases.",
  "mistakes": [
   [
    "Hallucinations are fixed by using a bigger model or more computing power.",
    "Hallucinations about company facts come from missing information. Grounding the model in trusted company data is the fix."
   ],
   [
    "To keep a chatbot current with changing policies, you must retrain the model each time.",
    "With RAG, you update the source documents and the next answer reflects them, with no retraining."
   ],
   [
    "An AI agent is just a chatbot with a nicer interface.",
    "An agent plans and takes actions through tools and APIs to complete tasks, not just generating text."
   ],
   [
    "Agents should be given broad permissions so they can solve any request.",
    "Agents should have only the permissions they need, with human approval for sensitive actions and logging for accountability."
   ]
  ],
  "tryit": [
   [
    "Brightwater Bank's employees spend hours searching a shared drive of 40,000 procedure documents, and keyword search often misses the right file because staff use different words than the documents do. Leadership wants employees to ask questions in plain language and get a short answer with a link to the source document, and it does not want to train its own model. What approach fits?",
    "AI-powered enterprise search grounded in the bank's own documents, using retrieval-augmented generation. It understands the meaning of questions rather than matching keywords, returns summarized answers with links to sources, and requires no model training; updating the documents keeps answers current. Access controls should ensure employees only see documents they are permitted to read."
   ]
  ],
  "tip": "When a scenario describes made-up or outdated answers from a chatbot about company information, the fix is grounding the model in trusted company data, not adding more compute.",
  "check": [
   [
    "How does retrieval-augmented generation reduce hallucinations?",
    "It retrieves relevant trusted content and gives it to the model, so the answer is based on that content rather than only on the model's training data."
   ],
   [
    "What makes an AI agent different from a chatbot that only answers questions?",
    "An agent plans and takes actions through tools and APIs to complete tasks, not just generating text."
   ],
   [
    "Why does grounding make generative AI answers easier to verify?",
    "Grounded answers are based on retrieved sources and can include citations, so people can check the original document."
   ]
  ]
 },
 {
  "t": "AI infrastructure: GPUs and Tensor Processing Units (TPUs)",
  "hook": "At Helix Genomics, a twelve-person research startup, the lead scientist, Wei, has a plan to train a large model that predicts how proteins fold. Her first test run on the office workstation is still crawling along after four days. A hardware vendor quotes a price for a rack of specialized servers that would take months to arrive and would sit idle once training is done. The founders ask you a practical question: is there a way to get serious machine learning hardware for a few weeks, pay only while using it, and pick the right kind of chip for the job? And what exactly is the difference between a GPU and a TPU?",
  "simple": "Training a big AI model means doing an enormous amount of math, mostly multiplying large grids of numbers. A normal computer processor can do it, but slowly, like one very smart person solving sums one after another. Special chips called accelerators work like a stadium full of people each doing a small sum at the same time, so the job finishes far faster. GPUs were first made for video game graphics and turned out to be great at this. TPUs are chips Google designed only for machine learning. In Google Cloud you can rent either for as long as you need, instead of buying expensive hardware that sits idle afterward.",
  "body": [
   "Training and running modern machine learning (ML) models, especially large deep learning and generative AI models, requires enormous amounts of computation. Most of it is large-scale matrix and vector math: multiplying and adding huge arrays of numbers, again and again. General-purpose central processing units (CPUs) can do this work, but they handle a relatively small number of tasks at a time, so training a large model on CPUs alone would take impractically long. Specialized hardware called accelerators speeds this work up dramatically, and access to accelerators at scale, without buying them, is one of the main reasons organizations use the cloud for AI.",
   "Graphics processing units (GPUs) were originally designed to render images for screens and games, which also involves massive amounts of parallel math: calculating the color of millions of pixels at once. Researchers discovered that the same design, with thousands of small cores working in parallel, is excellent for ML. Today GPUs are the most widely used ML accelerators, and they are broadly supported by popular frameworks such as PyTorch and TensorFlow. Google Cloud offers several types of GPU, from options suited to modest inference workloads to powerful ones for training large models. You can attach them to Compute Engine virtual machines (VMs), use them in Google Kubernetes Engine (GKE) clusters, or use them through Vertex AI training and prediction.",
   "Tensor Processing Units (TPUs) are custom chips that Google designed specifically for machine learning. A tensor is the multi-dimensional array of numbers that ML models work with, which is where the name comes from. TPUs are application-specific integrated circuits (ASICs), meaning they are built for one kind of workload rather than for general computing. By focusing only on the math ML needs, an ASIC can do that work very efficiently. Google originally developed TPUs to run its own AI-powered services, such as Search and Translate, efficiently at enormous scale, and it uses them to train its Gemini models.",
   "In Google Cloud, TPUs are available through Vertex AI, GKE and Compute Engine. A distinctive feature is that many TPU chips can be connected with fast dedicated links into large groups called pods, so a single training job can be spread across a very large amount of hardware. This matters for the largest models, which would take far too long to train on a single machine. For the exam, the key fact is simple: TPUs are Google's own custom-designed ML chips, and they are a differentiator of Google Cloud's AI infrastructure.",
   "Which accelerator to use depends on the model, the framework and the cost. GPUs are very flexible, run a wide range of software and are supported almost everywhere, which makes them a safe default for many teams. TPUs can offer strong performance and cost efficiency for large-scale training and serving of models that are well suited to them, particularly large models built with frameworks that support TPUs well. Many teams test both and choose based on speed and cost for their specific workload. The decision is usually made by ML engineers, not business leaders.",
   "For business leaders, the important points are about flexibility and cost. Google Cloud offers a range of AI infrastructure, including GPUs from other manufacturers and its own TPUs, without the need to buy, install, power and cool expensive specialized hardware that may be outdated in a few years. Teams can rent large amounts of accelerator capacity for a short training run, then release it, paying only while it is in use. They can also choose smaller, cheaper accelerators for serving a finished model to users, which often runs continuously and has different needs from training.",
   "Training and inference are worth distinguishing here. Training is the heavy, often one-time or periodic process of teaching a model from data. Inference, also called serving or prediction, is using the trained model to answer requests, which may happen millions of times a day. Each can use different hardware, and inference costs often dominate over a model's lifetime when usage is high.",
   "Finally, remember when accelerators do not matter to you. When you use pre-trained APIs, such as Vision or Translation, or call generative models such as Gemini through Vertex AI, Google runs and manages all of the underlying infrastructure, and you pay for usage. Accelerators become your concern when you train or host your own models, for example with custom training in Vertex AI or open models deployed from Model Garden."
  ],
  "analogy": "A CPU is like a brilliant chef who can cook any dish but makes one plate at a time. A GPU is like a large kitchen with hundreds of line cooks who can each repeat simple steps in parallel, good for many kinds of menus. A TPU is like a factory line built for one product, such as dumplings, producing them extremely efficiently. Where this stops working: a TPU is not limited to one model, only to the kind of math ML needs, and choosing between them depends on the specific workload.",
  "terms": [
   [
    "Accelerator",
    "Specialized hardware, such as a GPU or TPU, that speeds up ML computation."
   ],
   [
    "GPU",
    "Graphics processing unit: a processor with many parallel cores, widely used for ML."
   ],
   [
    "TPU",
    "Tensor Processing Unit: Google's custom ASIC designed for machine learning workloads."
   ],
   [
    "ASIC",
    "Application-specific integrated circuit: a chip designed for one type of task."
   ],
   [
    "CPU",
    "Central processing unit: a general-purpose processor that handles many kinds of tasks but fewer in parallel."
   ],
   [
    "TPU pod",
    "A large group of TPU chips connected by fast dedicated links to train very large models together."
   ],
   [
    "Inference",
    "Using a trained model to make predictions or generate output for new requests."
   ]
  ],
  "example": "A biotech startup needs to train a large protein model for a few weeks. Instead of buying hardware, it rents TPUs through Vertex AI for the training run, then serves the finished model on smaller GPU instances, paying only while each is in use.",
  "mistakes": [
   [
    "GPUs are Google's custom chips built for ML.",
    "GPUs are general parallel processors originally made for graphics. TPUs are the chips Google designed specifically for ML."
   ],
   [
    "You need to provision GPUs or TPUs to use the Vision API or Gemini through Vertex AI.",
    "Google manages the infrastructure for pre-trained APIs and managed generative models; you just call them."
   ],
   [
    "TPUs are always better than GPUs for every ML job.",
    "The best choice depends on the model, framework and cost. GPUs are more flexible and broadly supported; TPUs excel for suitable large-scale workloads."
   ],
   [
    "To train a large model, a company must buy its own accelerator hardware.",
    "In the cloud, teams can rent accelerators for the duration of a job and pay only while using them."
   ]
  ],
  "tryit": [
   [
    "Quarry Analytics plans two projects. In the first, its marketing team wants to tag product photos using the Vision API. In the second, its ML engineers will train a very large custom language model over several weeks and want the option of spreading training across many chips. For which project should the company think about accelerators, and what options does Google Cloud offer?",
    "Only the second project. The Vision API is pre-trained and Google manages its infrastructure. For the custom training run, the engineers can rent GPUs or TPUs, for example through Vertex AI custom training, and can use TPU pods to spread a very large job across many chips, paying only while the hardware is in use."
   ]
  ],
  "tip": "TPUs are Google's custom-designed ML chips. If a question asks what Google built specifically to accelerate machine learning, the answer is TPUs, not GPUs.",
  "check": [
   [
    "What is a TPU?",
    "A Tensor Processing Unit, Google's custom ASIC designed to accelerate machine learning training and inference."
   ],
   [
    "Why do you rarely need to think about accelerators when using a pre-trained API?",
    "Google runs and manages the underlying infrastructure; you just call the API."
   ],
   [
    "What is the difference between a GPU and a TPU?",
    "A GPU is a general parallel processor originally designed for graphics and widely used for ML; a TPU is Google's custom ASIC designed specifically for ML workloads."
   ]
  ]
 },
 {
  "t": "Why modernize: benefits of moving infrastructure and applications to the cloud",
  "hook": "It is 6 a.m. at Crestline Freight, and the on-call engineer, Marcus, is in the data center again. A disk has failed in the server that runs the route-planning system, the operating system on that server stopped receiving security patches last year, and the only person who fully understands the deployment scripts retired in the spring. Each new feature request takes about a month to release because every change needs a weekend maintenance window. The CEO has heard that moving to the cloud will fix everything. Will it? And is lifting the old server into the cloud enough, or does the company need to change how the application itself is built?",
  "simple": "Modernization means updating old computer systems so they can use what the cloud offers. There are two levels. The first is moving where your systems run, from your own server room to the cloud, so you stop buying and fixing hardware. The second is changing how your applications are built, breaking a big, tangled program into smaller pieces that can be updated quickly and safely. Think of a family restaurant. Moving into a rented, well-maintained building fixes the leaky roof. Redesigning the kitchen so each station works independently lets you change the menu every week. Both help, but the second brings the biggest gains in speed.",
  "body": [
   "Many organizations run important applications on infrastructure that is expensive to maintain, slow to change and hard to scale: aging servers, software nearing or past the end of vendor support, and manual processes that depend on a few key people. Modernization means updating infrastructure and applications so they can take advantage of what the cloud offers. It is a central theme of the infrastructure and applications section of the Cloud Digital Leader exam, and questions often ask you to identify the benefit a modernization step provides.",
   "Infrastructure modernization usually starts with moving workloads from on-premises data centers to cloud infrastructure, for example running existing servers as Compute Engine virtual machines (VMs). The benefits are those of the cloud in general. There is no hardware to buy, install or refresh every few years. Capacity is available on demand, so a company can scale up for a busy season and back down afterward. Global locations let applications run closer to customers. Built-in redundancy across zones and regions improves resilience. Pay-as-you-go pricing turns large up-front capital expenses into operating expenses that track actual use.",
   "These changes also shift how operations teams spend their time. Instead of racking servers, replacing failed disks and planning data center power and cooling, teams can focus on automation, monitoring and reliability. Moving a workload this way, often with few changes to the application, can quickly remove hardware risk, but it does not by itself make the application easier or faster to change.",
   "Application modernization goes further by changing how applications are built and run. It can mean adopting managed services, such as moving a self-managed database to Cloud SQL so Google handles patching, backups and replication. It can mean packaging applications in containers, which bundle code with everything it needs to run consistently anywhere, and running them on Google Kubernetes Engine (GKE). It can mean breaking a large monolith, a single application where every part is tightly connected, into microservices, smaller independent services that each do one job. It can mean using serverless platforms such as Cloud Run, where you deploy code or containers and Google manages the servers and scaling. And it usually means automating build, test and deployment with continuous integration and continuous delivery (CI/CD).",
   "The payoff of application modernization is speed and resilience. Teams can release small changes often and safely, sometimes many times a day, instead of bundling months of work into a risky weekend release. Parts of an application can scale independently, so a busy checkout service gets more capacity without scaling the whole system. Failures can be contained to one service, and recovery is faster because environments are defined and deployed automatically. This is why the biggest gains in business agility come from changing how applications are built and delivered, not just where they run.",
   "Modernization also reduces risk and technical debt. Technical debt is the accumulated future cost of shortcuts, outdated technology and old design decisions that make every new change harder and slower. Like financial debt, it charges interest: each workaround makes the next change more expensive. Unsupported operating systems are a clear example, because they stop receiving security patches and become a growing security and compliance risk. Moving to supported, managed platforms and modern designs pays down that debt and frees teams to work on new features.",
   "Not every workload should be modernized in the same way or at the same time. Organizations usually assess their application portfolio first, looking at each application's business value, technical fit for the cloud, dependencies on other systems, and the cost and risk of changing it. They then choose an approach per application, ranging from simply retiring applications nobody needs, through moving them largely as they are, to fully rebuilding the most valuable ones. A common pattern is to move first to remove urgent hardware risk, then modernize the parts that change most often.",
   "Google Cloud provides tools to support this planning. Migration Center helps organizations discover the servers and applications they currently run, assess them, estimate what they would cost in Google Cloud, and plan the move. The next lesson covers the common migration approaches in detail. For now, keep the core distinction in mind: infrastructure modernization changes where workloads run, and application modernization changes how they are built and delivered."
  ],
  "analogy": "Modernizing is like improving an old delivery business. Moving your trucks from a crumbling private garage into a professionally run depot with on-demand vehicles (infrastructure modernization) ends the breakdowns and repair bills. Reorganizing routes so each driver handles a small, independent zone and can adjust daily without replanning the whole fleet (application modernization) is what makes you faster than competitors. The analogy stops short in one way: a move to the depot can happen quickly, but redesigning routes for every customer takes time, so most companies do it gradually.",
  "terms": [
   [
    "Modernization",
    "Updating infrastructure and applications to use cloud capabilities such as managed services, containers and automation."
   ],
   [
    "Technical debt",
    "The future cost created by outdated technology or shortcuts that make change harder."
   ],
   [
    "CI/CD",
    "Continuous integration and continuous delivery: automating build, test and deployment of code."
   ],
   [
    "Migration Center",
    "A Google Cloud tool for discovering current infrastructure, assessing it and planning a migration."
   ],
   [
    "Monolith",
    "A single application in which all components are tightly connected and deployed together."
   ],
   [
    "Microservices",
    "An architecture that splits an application into small, independent services that can be deployed and scaled separately."
   ],
   [
    "Container",
    "A package that bundles application code with everything it needs so it runs consistently in any environment."
   ]
  ],
  "example": "A logistics company's route-planning system runs on servers whose operating system has reached end of support. It moves the system to Compute Engine to remove the hardware risk, then gradually rebuilds the most-changed parts as containers on GKE, cutting release time from a month to a day.",
  "mistakes": [
   [
    "Moving servers to the cloud as they are automatically makes applications faster to change.",
    "Moving infrastructure removes hardware burdens, but release speed improves mainly through application modernization such as microservices, managed services and CI/CD."
   ],
   [
    "Every application should be rebuilt as microservices.",
    "Organizations assess each application and choose an approach; some should be retired, some moved as they are, and only some rebuilt."
   ],
   [
    "Technical debt is just old hardware.",
    "Technical debt is the broader cost of outdated technology, shortcuts and design decisions that make change harder, including unsupported software."
   ],
   [
    "Modernization is only about reducing costs.",
    "Cost can improve, but the main benefits are agility, scalability, resilience and reduced risk."
   ]
  ],
  "tryit": [
   [
    "Ashford Publishing runs twenty internal applications. One is a customer-facing ordering system that the business changes every week; another is a reporting tool nobody has opened in two years; a third is a stable payroll system on servers whose hardware lease ends in three months. How would you prioritize modernization for these three?",
    "Retire the unused reporting tool. Move the payroll system to cloud VMs largely as it is, removing the hardware deadline with minimal change. Invest in application modernization for the ordering system, for example containers or serverless and CI/CD, because it changes most often and will gain the most agility. Start with a portfolio assessment, which tools like Migration Center support."
   ]
  ],
  "tip": "Infrastructure modernization changes where things run; application modernization changes how they are built and delivered. The biggest agility gains come from the second.",
  "check": [
   [
    "What is technical debt, and how can modernization reduce it?",
    "The cost of outdated technology and shortcuts that slow change; moving to supported, managed platforms and modern designs reduces it."
   ],
   [
    "Why assess the application portfolio before migrating?",
    "To choose the right approach for each application based on value, fit, dependencies and cost, rather than treating all of them the same way."
   ],
   [
    "What is the difference between infrastructure modernization and application modernization?",
    "Infrastructure modernization changes where workloads run, such as moving to cloud VMs; application modernization changes how they are built and delivered, such as microservices, managed services and CI/CD."
   ]
  ]
 },
 {
  "t": "Migration approaches: retire, retain, rehost (lift and shift), replatform, refactor and reimagine",
  "hook": "The lease on Northgate Insurance's data center ends in seven months, and the landlord will not extend it. Daniel, the new head of infrastructure, has a spreadsheet of 140 applications on his screen and a steering committee meeting in an hour. The chief financial officer wants the move done cheaply, the head of digital wants a modern customer portal, and the compliance lead wants nothing touched that the regulator has already approved. Every row in the spreadsheet needs a decision, and they cannot all get the same one. If everything is rewritten, the deadline is missed. If everything is copied as it is, the cloud bill may disappoint. How does Daniel decide what happens to each application?",
  "simple": "Moving to the cloud is like moving house. You do not treat every object the same way. Some things you throw away because nobody uses them (retire). Some things you leave behind for now, like a piano that is too hard to move this month (retain). Most boxes you carry over exactly as they are (rehost, or lift and shift). Some things you fix up on the way, like swapping an old lamp for a better one that fits the new rooms (replatform). A few things you rebuild from scratch to suit the new house (refactor). And sometimes you rethink the whole idea, like replacing a home office with a shared workspace subscription (reimagine). The quicker the approach, the less you gain from the new house; the more work you do, the more you gain.",
  "body": [
   "Every cloud migration is really a set of many smaller decisions, one per application. Organizations usually start with an assessment that inventories applications, their dependencies, their business value and their technical condition. Then they choose an approach for each one. The industry describes these choices as the 'Rs' of migration. Google Cloud's own training tends to use plainer phrases such as lift and shift, move and improve, and refactor or rebuild, so the exam expects you to recognize both sets of words. Above all, it expects you to match an approach to a situation and to understand the trade-off at the heart of migration: speed and low risk on one side, cloud benefits and long-term agility on the other.",
   "Start with the two approaches that involve no migration at all. Retire means shutting down an application that is no longer needed. Assessments regularly uncover reporting tools nobody opens, duplicate systems left over from mergers, or old versions kept 'just in case'. Retiring them saves licensing and support costs and makes the migration smaller, which lowers risk. Retain means keeping an application where it is for now. Typical reasons are a recent hardware investment that has not yet paid off, a regulation that requires data to stay in a particular facility, a vendor that does not support cloud deployment, or a dependency that is not ready to move. Retain is not a failure; it is a deliberate, often temporary, decision that is revisited later.",
   "Rehost, also called lift and shift, moves an application to the cloud as it is, with no changes to its code or architecture. In Google Cloud this usually means moving servers from on-premises into Compute Engine virtual machines (VMs). It is the fastest approach and carries the least change risk, so it is the natural choice when a data center must be closed on a deadline or when an application is stable and rarely changed. Rehosting delivers real benefits, such as no hardware to buy or refresh and access to the cloud's global network, but it delivers few cloud-native benefits. The application still scales the way it did before, and the team still patches and manages the operating system. Tools such as Migrate to Virtual Machines help automate the copying of VMs and reduce downtime during cutover.",
   "Replatform, often called move and improve, makes targeted changes during the move to gain specific cloud benefits without redesigning the application. The most common example is moving a self-managed database onto a managed service such as Cloud SQL, so Google handles backups, patching and replication while the application code stays the same. Another example is packaging an application in a container and running it on Google Kubernetes Engine (GKE). Replatforming sits in the middle of the trade-off: more effort than rehosting, much less than rewriting, and it removes some of the routine operational work that keeps teams busy.",
   "Refactor, also called re-architect, changes the application's code and design to take full advantage of the cloud. Typical examples are breaking a monolith into microservices, moving to serverless platforms such as Cloud Run, or redesigning the data layer to use cloud-native databases. Refactoring takes the most time, skill and money, and it carries the most change risk, but it delivers the greatest gains in agility, elastic scalability, resilience and cost efficiency. It is usually reserved for applications that differentiate the business and change often, such as a customer portal or a mobile app back end.",
   "Reimagine, or rebuild, goes a step further than refactoring. Instead of improving the existing application, the organization redesigns the business process or product itself, often replacing the old application entirely. Sometimes the best answer is not to build at all but to repurchase, which means replacing a custom system with a software as a service (SaaS) product, for example swapping a home-grown email system for a hosted collaboration suite. Reimagining is where digital transformation, rather than simple relocation, happens, but it requires business leaders to be involved, not just IT.",
   "In practice, organizations use several approaches at the same time, and they often sequence them. A common path is to rehost quickly to exit a data center and stop paying for it, then modernize the most valuable applications over the following months and years. This 'move first, improve later' path reduces the risk of trying to change everything at once, and it means teams learn the cloud on lower-risk workloads before tackling critical ones. The opposite mistake, refactoring everything before moving, often misses deadlines and runs over budget.",
   "When you read an exam scenario, look for the clue words. A hard deadline, a data center exit or 'no time for code changes' points to rehost. 'Use a managed database' or 'small changes to reduce administration' points to replatform. 'Rewrite', 'microservices', 'cloud native' or 'maximum agility' points to refactor. 'No longer used' points to retire, and 'must stay on-premises for now' points to retain. If the scenario describes replacing the whole process or buying a SaaS product, think reimagine or repurchase."
  ],
  "analogy": "Think of renovating a restaurant you are moving to a new building. Retire is dropping dishes nobody orders. Retain is keeping the old bakery oven at the original site until the lease ends. Rehost is moving the kitchen equipment exactly as it is. Replatform is moving it but swapping in a dishwasher service so staff stop washing pots. Refactor is redesigning the kitchen layout around how the new building works. Reimagine is turning the restaurant into a delivery-only kitchen. The analogy stops working on cost: in the cloud, a rehosted app may cost more than expected because it was never designed to scale down.",
  "terms": [
   [
    "Rehost (lift and shift)",
    "Moving an application to the cloud without changing it, usually onto Compute Engine VMs."
   ],
   [
    "Replatform (move and improve)",
    "Making targeted changes, such as adopting a managed database like Cloud SQL, while migrating."
   ],
   [
    "Refactor (re-architect)",
    "Changing an application's code and architecture to be cloud native, for example as microservices or serverless."
   ],
   [
    "Retire",
    "Decommissioning an application that is no longer needed instead of migrating it."
   ],
   [
    "Retain",
    "Deliberately keeping an application where it is for now, to be revisited later."
   ],
   [
    "Reimagine (rebuild)",
    "Redesigning the business process or product itself, often replacing the old application, sometimes with a SaaS product (repurchase)."
   ]
  ],
  "example": "An insurer must leave its data center in six months. It retires 15 unused applications, rehosts 60 onto Compute Engine, replatforms its policy database to Cloud SQL, retains a mainframe for now, and plans to refactor its customer portal into microservices over the next year.",
  "mistakes": [
   [
    "Rehosting gives you all the benefits of the cloud.",
    "Rehosting removes hardware management, but the application still scales and is operated as before. Cloud-native benefits such as autoscaling and managed services come from replatforming or refactoring."
   ],
   [
    "Moving a database to Cloud SQL is refactoring.",
    "If the application code is not redesigned, adopting a managed service during the move is replatforming (move and improve). Refactoring changes the application's code and architecture."
   ],
   [
    "Retain means the migration failed for that application.",
    "Retain is a deliberate choice, often temporary, made for reasons such as recent hardware investment, regulation or unready dependencies."
   ],
   [
    "The best strategy is to refactor everything before migrating.",
    "Refactoring everything first is slow and risky. Most organizations mix approaches, often rehosting first to meet a deadline and modernizing key applications later."
   ]
  ],
  "tryit": [
   [
    "A city library runs a room-booking app built ten years ago. It is used daily, works reliably and rarely changes, but its database server needs constant patching that the two-person IT team struggles with. The library is moving to Google Cloud this year with a modest budget. Which approach fits the booking app?",
    "Replatform. Moving the app to Compute Engine and its database to Cloud SQL removes the patching burden without the cost and risk of rewriting a stable application. Refactoring would be overkill for an app that rarely changes, and a pure rehost would leave the database patching problem in place."
   ],
   [
    "During an assessment, a manufacturer finds an old inventory report tool that logs show nobody has opened in 18 months, and a plant-floor control system certified by a safety regulator that cannot be changed this year. What should happen to each?",
    "Retire the unused report tool, since migrating it would only add cost and risk. Retain the control system on-premises for now and revisit it once recertification or a cloud-ready option is possible."
   ]
  ],
  "tip": "Deadline and no time for changes: rehost. Small changes to use managed services: replatform. Rewrite for cloud-native benefits: refactor. Unused: retire. Not moving yet: retain. Replace the process or buy SaaS: reimagine or repurchase.",
  "check": [
   [
    "Which approach is fastest but gives the fewest cloud-native benefits?",
    "Rehost (lift and shift), because the application moves unchanged."
   ],
   [
    "An app moves to Compute Engine and its database moves to Cloud SQL without code changes. Which approach?",
    "Replatform (move and improve), because a managed service is adopted without re-architecting."
   ],
   [
    "Why do many organizations rehost first and refactor later?",
    "Rehosting meets deadlines such as a data center exit with low risk; refactoring the most valuable applications afterward spreads effort and lets teams learn the cloud gradually."
   ]
  ]
 },
 {
  "t": "Virtual machines with Compute Engine: machine types, managed instance groups and autoscaling",
  "hook": "It is 7:58 p.m. at Brightline Tickets, and the concert sale opens at eight. Last year the single web server buckled within seconds, fans saw error pages, and the story trended for all the wrong reasons. This year Ana, the operations lead, has moved the site to Google Cloud, but she is staring at a dashboard showing four modest virtual machines. Her manager asks the obvious question: 'Four servers? Last year one wasn't enough, and we expect ten times the traffic.' Ana smiles, because she knows those four are not the whole story. What has she set up that will let the site grow to meet the rush, and heal itself if something breaks?",
  "simple": "A virtual machine, or VM, is a pretend computer that runs inside a real one. Compute Engine lets you rent these pretend computers from Google. You pick how big each one is, a bit like choosing a small, medium or large delivery van, and you can install whatever software you like. One van alone can break down or get overloaded. So instead of one, you can ask for a managed group of identical vans from the same blueprint. When lots of packages arrive, the group adds more vans automatically; when things are quiet, it sends some home so you stop paying for them. If a van breaks down, the group replaces it with a fresh one without anyone having to call a mechanic.",
  "body": [
   "Compute Engine is Google Cloud's infrastructure as a service (IaaS) offering for virtual machines (VMs). A VM behaves like a physical server: you choose an operating system image, such as a Linux distribution or Windows Server, a machine type that sets its size, and the disks it uses. You then have full administrative control over the software installed on it. This control is exactly why Compute Engine is the usual landing place for lift-and-shift migrations and for workloads that need a specific operating system, particular kernel settings or licensed software that expects a traditional server. The other side of that control is responsibility: under the shared responsibility model, you patch the guest operating system, secure it and decide how it scales.",
   "Machine types define how much virtual CPU (vCPU) and memory a VM has. Google Cloud organizes predefined machine types into families aimed at different needs. General-purpose machines give a balance of price and performance and suit most workloads, such as web servers and small databases. Compute-optimized machines offer the highest performance per core for CPU-heavy work such as batch processing or game servers. Memory-optimized machines provide very large amounts of memory for in-memory databases and analytics. Accelerator-optimized machines include graphics processing units (GPUs) for machine learning and graphics. When none of the predefined shapes fits, custom machine types let you choose the exact number of vCPUs and amount of memory, which avoids paying for resources a workload will never use.",
   "Storage is chosen separately from the machine. Persistent disks are network-attached block storage that keep their data independently of the VM, so a VM can be stopped, deleted or recreated without losing what is on the disk. They come in several performance levels, from standard disks for lower-cost capacity to faster solid-state options for databases. Separating compute from storage is a recurring cloud idea: it lets you resize or replace the machine without touching the data.",
   "A single VM, however well sized, has two weaknesses. It is a single point of failure, so if it crashes or its zone has a problem, the service is down. And it cannot grow on its own to meet a surge in demand. Managed instance groups (MIGs) address both. You first create an instance template, a reusable description of the VM configuration: machine type, image, disks, network settings and startup script. The MIG then creates and maintains a group of identical VMs from that template, so every instance is interchangeable.",
   "MIGs bring several capabilities that the exam expects you to recognize. Autoscaling adds VMs when load rises and removes them when load falls, based on signals such as average CPU utilization, load balancer requests per second or a custom metric from Cloud Monitoring. You set a minimum and maximum number of instances so costs and capacity stay within bounds. Autohealing uses a health check, for example an HTTP request to a status page, and recreates any VM that fails it, returning the group to a healthy state without a human being paged. Rolling updates deploy a new instance template gradually, replacing a few VMs at a time so the service stays up during the change and a bad version can be stopped early. Finally, a regional MIG spreads its VMs across multiple zones in a region, so the loss of one zone does not take the whole application down, whereas a zonal MIG keeps all instances in a single zone.",
   "MIGs are usually placed behind Cloud Load Balancing. The load balancer gives users a single address, spreads traffic across the healthy VMs in the group and stops sending requests to instances that fail health checks. Google Cloud's external Application Load Balancer can be global, so users around the world are directed to the nearest region with available capacity. Together, a global load balancer and regional MIGs are a classic pattern for a scalable, highly available web tier built on VMs.",
   "Cost matters as much as capacity. Compute Engine bills most VMs per second of use, so short-lived VMs created by autoscaling cost only for the time they run. There are several ways to reduce cost, including sustained use discounts that apply automatically to eligible VMs that run for a large part of the month, committed use discounts in exchange for a one- or three-year commitment, and Spot VMs, which are much cheaper but can be reclaimed by Google at short notice and so suit fault-tolerant batch work. These options are covered in more depth in the operations section. The Google Cloud free tier also includes a small e2-micro VM in some US regions, which is enough for a first hands-on lab.",
   "For exam scenarios, keep the signals simple. 'Full control of the operating system', 'specific software or licensing' or 'move the server as it is' points to Compute Engine. 'Automatically add servers when traffic grows' or 'replace failed servers automatically' points to a managed instance group with autoscaling and autohealing. 'Survive a zone failure' points to a regional MIG behind a load balancer. If a scenario wants no servers to manage at all, the answer is probably a serverless service rather than Compute Engine."
  ],
  "analogy": "A managed instance group is like a staffing agency for a busy restaurant. The instance template is the job description every hired server follows, so any of them can cover any table. When the dining room fills, the agency sends more servers (autoscaling); when one calls in sick, a replacement arrives automatically (autohealing). The maître d' who seats guests at free tables is the load balancer. Where it stops working: real staff remember regular customers, but VMs in a MIG should be treated as interchangeable, so important data must live outside any single instance.",
  "terms": [
   [
    "Compute Engine",
    "Google Cloud's IaaS service for running virtual machines."
   ],
   [
    "Machine type",
    "The vCPU and memory configuration of a VM, chosen from predefined families or set as a custom machine type."
   ],
   [
    "Managed instance group (MIG)",
    "A group of identical VMs created from a template with autoscaling, autohealing and rolling updates."
   ],
   [
    "Instance template",
    "A reusable definition of a VM's configuration used to create VMs in a MIG."
   ],
   [
    "Autohealing",
    "Automatic recreation of VMs in a MIG that fail a health check."
   ],
   [
    "Persistent disk",
    "Durable network-attached block storage whose data persists independently of the VM."
   ]
  ],
  "example": "A ticketing site runs its web servers in a regional managed instance group behind a global load balancer. During a sale, autoscaling grows the group from 4 to 40 VMs across three zones, and when one VM crashes, autohealing replaces it without anyone being paged. After the sale, the group shrinks back to its minimum and per-second billing stops for the removed VMs.",
  "mistakes": [
   [
    "Autoscaling and autohealing are the same thing.",
    "Autoscaling changes the number of VMs based on load. Autohealing replaces individual VMs that fail a health check, regardless of load."
   ],
   [
    "A bigger single VM is the best way to handle more traffic and stay available.",
    "A single VM is still a single point of failure and has an upper size limit. A MIG behind a load balancer scales out across many VMs and zones."
   ],
   [
    "Compute Engine is a fully managed, serverless option.",
    "Compute Engine is IaaS: Google manages the hardware, but you manage the guest operating system, patching and scaling configuration. Serverless options such as Cloud Run remove that work."
   ],
   [
    "Data written to a VM in a MIG is safe there long-term.",
    "MIG instances can be deleted and recreated at any time by autoscaling or autohealing. Durable data belongs in persistent storage, a database or Cloud Storage."
   ]
  ],
  "tryit": [
   [
    "A video-encoding company has a nightly job that needs 32 vCPUs and 48 GB of memory. The predefined machine types it has looked at offer either too little memory or far more than it needs, and the finance team is reviewing every line of the cloud bill. What should the team consider?",
    "A custom machine type with exactly the vCPUs and memory the job needs, so the company stops paying for unused memory. Because the job is batch work that can be restarted, Spot VMs could reduce cost further."
   ],
   [
    "An online school's course site runs on three VMs in one zone. Last month a zone issue took the site offline for an hour during exams, and two VMs had to be rebuilt by hand after crashing. What design change addresses both problems?",
    "Move the VMs into a regional managed instance group behind a load balancer. The regional MIG spreads VMs across zones so one zone's failure does not take the site down, and autohealing recreates crashed VMs automatically."
   ]
  ],
  "tip": "Automatic scaling and replacement of failed VMs points to a managed instance group. Full control of the OS points to Compute Engine rather than serverless options. Surviving a zone outage points to a regional MIG.",
  "check": [
   [
    "What does autohealing do in a managed instance group?",
    "It recreates VMs that fail their health check, so the group returns to a healthy state automatically."
   ],
   [
    "When would you use a custom machine type?",
    "When no predefined type matches the vCPU and memory a workload needs, to avoid paying for unused resources."
   ],
   [
    "What is the role of an instance template?",
    "It defines the VM configuration that a managed instance group uses to create identical VMs."
   ]
  ]
 },
 {
  "t": "Keeping existing platforms: Google Cloud VMware Engine and Bare Metal Solution",
  "hook": "At Cedarline Retail's quarterly review, the infrastructure team presents a hard truth. The company runs 2,000 virtual machines on VMware in a data center whose power contract ends next year, and the team has spent fifteen years building runbooks, backup jobs and monitoring around vCenter. Converting every VM one at a time could take years. Meanwhile, the order system runs on an Oracle database whose licensing terms worry the procurement lead every time anyone says the word 'virtualize'. The chief information officer asks: 'Can we get to Google Cloud without rebuilding everything and retraining everyone?' Is there a way to move the platform first and modernize later?",
  "simple": "Sometimes a business has built its computer systems around a particular toolset, like a workshop where every worker knows exactly where each tool hangs. Moving to the cloud usually means learning new tools. Google Cloud offers two shortcuts. Google Cloud VMware Engine lets companies that already use VMware, a popular way of running many virtual computers on one real computer, keep using the same VMware tools, just in Google's buildings instead of their own. Bare Metal Solution rents a company its own real, physical computers sitting right next to Google Cloud, for special software, like certain Oracle databases, that works best or is licensed for physical machines. Both let a company move quickly now and improve its systems later.",
  "body": [
   "Not every workload can easily move to standard cloud VMs or be rewritten. Some depend on a particular virtualization platform that the organization has invested in for years. Others need specialized hardware, or carry licensing and support terms tied to physical servers. Converting or re-architecting these systems can be slow, expensive and risky, especially when a data center exit has a fixed date. Google Cloud offers two services that let organizations move such workloads into Google Cloud while keeping the platform they already have. Both appear on the Cloud Digital Leader exam as answers to 'move quickly with minimal change' scenarios.",
   "Google Cloud VMware Engine runs a complete, native VMware environment as a managed service on dedicated infrastructure in Google Cloud regions. It includes the core VMware components: the vSphere hypervisor that runs the VMs, vSAN for storage and NSX for networking, managed through the familiar vCenter interface. A hypervisor is the software layer that creates and runs virtual machines on physical hardware. Many enterprises already run hundreds or thousands of VMs on VMware in their own data centers, with established tools, processes and staff skills built around them. With VMware Engine, they can move those VMs to Google Cloud with little or no change, using VMware's own migration tools, often far faster than converting each VM into a Compute Engine instance.",
   "The division of responsibility is important. Google manages and maintains the underlying infrastructure, including the physical hosts, the hardware lifecycle and the VMware platform itself. The customer continues to manage its own VMs, guest operating systems and applications, much as it did on-premises. That means operations teams can keep their runbooks and skills on day one, which reduces retraining and risk during the move. Once in Google Cloud, the workloads sit close to native services, so the organization can start connecting them to tools such as BigQuery for analytics or Cloud Storage for backups and archives, and then modernize applications one at a time.",
   "Bare Metal Solution takes a different approach. Instead of virtual machines, it provides dedicated physical servers, located in or near Google Cloud regions and connected to them with low-latency, high-bandwidth links. Bare metal means a physical server used directly, without a virtualization layer shared with other customers. The service is designed for specialized workloads that must run on physical hardware, most notably Oracle databases. Oracle's licensing and support policies can make running its databases on some virtualized or cloud platforms complicated or costly, so dedicated hardware is often the simplest compliant option. The customer gets its own servers and runs its own software on them, while applications elsewhere in Google Cloud can reach the database with very little delay.",
   "Both services fit migration strategies that favor speed and continuity. They are forms of rehosting, because the workload moves largely unchanged, and they support a retain-and-extend approach, where a critical system keeps its current platform but gains access to cloud services around it. They help an organization exit data centers on a deadline without rewriting its most sensitive systems, and they act as a stepping stone. First move the platform, stop paying for the old facility and its hardware refresh cycle, then modernize applications over time, for example by moving selected VMs to Compute Engine or containers, or by building new analytics in BigQuery that read from the migrated systems.",
   "It helps to contrast them with the standard options. Migrating a VMware VM to Compute Engine with a tool such as Migrate to Virtual Machines converts it into a native Google Cloud VM, which brings more cloud-native integration but requires changes to tools and processes. Choosing VMware Engine keeps the VMware platform and skills intact, trading some cloud-native benefit for speed and familiarity. Similarly, running a database on Compute Engine or a managed service like Cloud SQL suits many databases, but for Oracle workloads that need dedicated hardware, Bare Metal Solution is the purpose-built answer.",
   "For the exam, remember the triggers. An existing VMware environment, a desire to keep the same tools, processes and skills, and a need for the fastest move point to Google Cloud VMware Engine. Specialized workloads that require dedicated physical servers, such as Oracle databases with licensing constraints, point to Bare Metal Solution. If a scenario instead emphasizes full modernization or minimal operations, these services are probably distractors, and a managed or serverless option is the better answer."
  ],
  "analogy": "Think of a family moving to a new city. VMware Engine is like hiring movers who rebuild your entire kitchen in the new house exactly as it was, same cabinets, same layout, so everyone can cook on the first night; the building management maintains the house, but you still run the kitchen. Bare Metal Solution is renting a private garage next door for a vintage car that the insurer will only cover if it is kept in its own space. The analogy stops working because both services also give fast links to new cloud services, which a rebuilt kitchen does not.",
  "terms": [
   [
    "Google Cloud VMware Engine",
    "A managed service running a native VMware environment (vSphere, vSAN, NSX, vCenter) on dedicated infrastructure in Google Cloud."
   ],
   [
    "Bare Metal Solution",
    "Dedicated physical servers near Google Cloud regions for specialized workloads such as Oracle databases."
   ],
   [
    "Hypervisor",
    "Software that creates and runs virtual machines on physical hardware."
   ],
   [
    "Bare metal",
    "A physical server used directly, without a virtualization layer shared with others."
   ],
   [
    "vCenter",
    "VMware's management console for administering VMs and hosts, available in Google Cloud VMware Engine."
   ]
  ],
  "example": "A retailer with 2,000 VMware VMs moves them to Google Cloud VMware Engine in a few months, keeping its vCenter tools and runbooks. Its Oracle-based order system moves to Bare Metal Solution next to the region, and new analytics built in BigQuery read from both. Over the following year, the team moves selected web applications from VMware Engine into containers.",
  "mistakes": [
   [
    "VMware Engine means Google takes over managing your VMs.",
    "Google manages the infrastructure and VMware platform; the customer still manages its VMs, guest operating systems and applications."
   ],
   [
    "Bare Metal Solution is just a large Compute Engine VM.",
    "Bare Metal Solution provides dedicated physical servers without a shared virtualization layer, which is why it suits workloads such as Oracle databases with licensing constraints."
   ],
   [
    "Moving to VMware Engine is the same as modernizing.",
    "It is essentially a rehost that keeps the existing platform. It speeds up the move and creates a stepping stone, but modernization happens afterward."
   ],
   [
    "Every VMware VM should be converted to Compute Engine.",
    "Converting is possible with tools such as Migrate to Virtual Machines, but when speed and keeping existing tools and skills matter most, VMware Engine is the better fit."
   ]
  ],
  "tryit": [
   [
    "A hospital network runs 600 VMs on VMware, and its small operations team is expert in vCenter but new to Google Cloud. Its data center will be closed in nine months. Leadership wants the least disruption to day-to-day operations during the move. Which service fits best, and why?",
    "Google Cloud VMware Engine. It lets the hospital move its VMs with little or no change and keep its vCenter tools, runbooks and skills, which minimizes disruption and retraining under a tight deadline. Modernization can follow once the data center is closed."
   ],
   [
    "A logistics company's billing system runs on an Oracle database. The procurement team says the license terms favor dedicated physical hardware, and the application servers are moving to Compute Engine and need low-latency access to the database. What should the company use for the database?",
    "Bare Metal Solution, which provides dedicated physical servers connected to Google Cloud with low-latency links, meeting the licensing requirement while keeping the database close to the applications."
   ]
  ],
  "tip": "The words 'VMware', 'existing tools and processes' and 'fast migration' point to Google Cloud VMware Engine. 'Oracle' or 'dedicated physical hardware' point to Bare Metal Solution.",
  "check": [
   [
    "What is the main benefit of Google Cloud VMware Engine for a VMware customer?",
    "It can move existing VMs to Google Cloud quickly without converting them, keeping VMware tools, processes and skills."
   ],
   [
    "Why might an Oracle database run on Bare Metal Solution rather than a VM?",
    "Because of licensing and support requirements that favor dedicated physical servers."
   ],
   [
    "In VMware Engine, what does Google manage and what does the customer manage?",
    "Google manages the underlying infrastructure and VMware platform; the customer manages its VMs, operating systems and applications."
   ]
  ]
 },
 {
  "t": "Containers: what they are and why they make applications portable",
  "hook": "Friday afternoon at Tidewater Travel, the booking service passes every test on Leo's laptop. On Monday it fails in production with a cryptic library error. The operations team says the production server has a slightly different version of a library; Leo says it worked perfectly for him. The release is rolled back, a partner launch slips by a week, and the engineering manager writes 'works on my machine' on the whiteboard with a heavy sigh. Everyone agrees the code was fine. The environment was the problem. What if the application could carry its environment with it, so it behaved the same everywhere it ran?",
  "simple": "A container is like a lunchbox for software. Instead of handing someone a recipe and hoping their kitchen has the same ingredients, you hand them the finished meal packed with everything it needs: the food, the sauce and the fork. An application packed in a container carries its code plus all the extra pieces it depends on, so it runs the same way on a laptop, in a company's own computer room or in any cloud. Containers are also small and quick to open because many of them share the same underlying computer system instead of each bringing its own. That is why teams can start them in seconds and run many on one machine.",
  "body": [
   "A container is a lightweight, standalone package that includes an application's code together with everything it needs to run: the language runtime, libraries, system tools and configuration settings. Containers solve a long-standing problem in software, usually summed up as 'it works on my machine'. Applications often fail when they move between environments because something around them differs, such as a library version, an operating system setting or a missing tool. Because a container carries its dependencies with it, the application behaves the same way on a developer's laptop, in a test environment, in an on-premises data center or in any public cloud. That consistency is what people mean when they say containers make applications portable.",
   "Containers are often compared with virtual machines (VMs), and the comparison is a favorite exam topic. A VM virtualizes the hardware. Each VM includes a full guest operating system on top of a hypervisor, plus the application, so VM images are relatively large, often gigabytes, and a VM can take a minute or more to boot. Containers virtualize at the operating system level instead. Many containers share the host machine's operating system kernel, the core of the OS that manages hardware and processes, while each container stays isolated from the others with its own file system and processes. Because there is no guest OS to boot, containers are much smaller, start in seconds or less, and use resources more efficiently, so far more of them fit on the same hardware.",
   "That efficiency comes with a trade-off worth knowing. Because containers share a kernel, their isolation is lighter than that of VMs, which each have their own operating system. This is one reason containers are often run on VMs in the cloud, combining the hardware-level isolation of VMs with the speed and density of containers. It also explains why a container built for Linux needs a Linux kernel to run on.",
   "Two terms are easy to confuse. A container image is the read-only template, built from a set of instructions such as a Dockerfile that lists the base image, the files to copy and the commands to run. A container is a running instance of that image, in the same way that a running program is an instance of an installed application. One image can start many identical containers. Images are stored in a registry, a library of images from which systems can pull them and run them anywhere. Google Cloud's registry service is Artifact Registry, which stores container images and other build artifacts and integrates with Google Cloud's security scanning and access control.",
   "Images are also versioned and immutable. Once an image is built and tagged, for example as version 2.4.1, its contents do not change. Teams can therefore deploy to production exactly the image they tested, instead of rebuilding or reconfiguring servers by hand, and if a new version misbehaves they can roll back simply by running the previous image. This predictability reduces the 'configuration drift' that builds up when servers are patched and tweaked individually over time.",
   "These properties make containers a foundation of application modernization. They fit microservices naturally, because each service can be packaged, deployed and scaled as its own container. They support consistent continuous integration and continuous delivery (CI/CD) pipelines, where every code change produces a new image that moves unchanged through test, staging and production. And they enable hybrid and multicloud strategies, because the same image can run in an on-premises cluster, in Google Cloud or in another cloud. For a business, the result is faster, safer releases and less time lost to environment problems. Developers also spend less time setting up machines, because a new team member can pull the images and run the whole application locally in minutes.",
   "Running a handful of containers is simple. Running thousands across many machines needs orchestration: deciding which server each container runs on, restarting containers that fail, scaling the number of copies up and down, rolling out new versions and connecting containers through networking and load balancing. Kubernetes is the open source standard for container orchestration, and Google Kubernetes Engine (GKE) is Google Cloud's managed version. For teams that want to run containers without managing any cluster at all, Cloud Run is a serverless platform that takes a container image and runs it, scaling automatically. On the exam, link containers with portability, consistency, speed and efficiency, and link orchestration with Kubernetes and GKE."
  ],
  "analogy": "Containers are like standardized shipping containers. Before them, every port loaded cargo differently and goods were damaged or delayed moving between ships, trains and trucks. A standard box fits any crane, ship or truck, whatever is inside. A software container fits any machine with a compatible container runtime, whatever the app needs inside. Ships carrying many boxes are like hosts running many containers on one kernel. Where it stops working: shipping containers are physically sealed, but software containers share the host's kernel, so their isolation is lighter than separate VMs.",
  "terms": [
   [
    "Container",
    "A lightweight package of an application and its dependencies that runs consistently in any environment."
   ],
   [
    "Container image",
    "A read-only, versioned template from which containers are started."
   ],
   [
    "Artifact Registry",
    "Google Cloud's service for storing and managing container images and other build artifacts."
   ],
   [
    "Orchestration",
    "Automated scheduling, scaling, networking and healing of many containers across machines."
   ],
   [
    "Kernel",
    "The core of an operating system, shared by all containers on a host."
   ],
   [
    "Dockerfile",
    "A text file of instructions used to build a container image."
   ]
  ],
  "example": "A development team packages its booking service as a container image and stores it in Artifact Registry. The same image runs on developers' laptops, in the test environment and in production on GKE, so a bug found in testing reproduces exactly and a fix is deployed by pushing a new image version. When the new version shows an error, the team rolls back by redeploying the previous image tag.",
  "mistakes": [
   [
    "Containers include their own full operating system, like VMs.",
    "Containers share the host's kernel and package only the application and its dependencies. VMs each include a full guest operating system."
   ],
   [
    "A container image and a container are the same thing.",
    "The image is the read-only template; a container is a running instance of it, and one image can start many containers."
   ],
   [
    "Containers replace the need for orchestration.",
    "Containers package applications; orchestration with Kubernetes or GKE is still needed to schedule, scale and heal many containers across machines."
   ],
   [
    "Containers provide stronger isolation than VMs.",
    "VMs isolate at the hardware level with separate operating systems, so their isolation is stronger. Containers trade some isolation for speed and density."
   ]
  ],
  "tryit": [
   [
    "A software company sells an analytics tool that customers run in their own data centers, in Google Cloud and in other clouds. Support spends much of its time on installation problems caused by differences between customer environments. What change would most reduce these problems, and why?",
    "Package the tool as a container image. The image carries its runtime and libraries, so it behaves the same in every customer environment that can run containers, which removes most environment-related installation problems."
   ],
   [
    "A team deployed version 3.2 of its service as a container image, and an hour later error rates rise. The previous image, version 3.1, is still in Artifact Registry. What is the fastest safe fix?",
    "Redeploy the version 3.1 image. Because images are immutable and versioned, rolling back is as simple as running the earlier image, which is known to work."
   ]
  ],
  "tip": "Portability and consistency across environments are the key container benefits. Containers share the host kernel, so they are lighter and faster to start than VMs, which each carry a full guest OS.",
  "check": [
   [
    "Why do containers start faster than VMs?",
    "They share the host operating system kernel instead of booting a full guest OS."
   ],
   [
    "What is the difference between a container image and a container?",
    "The image is the read-only template; a container is a running instance of that image."
   ],
   [
    "Which Google Cloud service stores container images?",
    "Artifact Registry."
   ]
  ]
 },
 {
  "t": "Google Kubernetes Engine (GKE): managed Kubernetes in Standard and Autopilot modes",
  "hook": "Sofia leads a three-person platform team at Meridian Market, an online grocer that has just split its checkout system into 40 containerized microservices. The developers love it. Sofia does not sleep as well. Someone has to decide which servers each container runs on, restart the ones that crash at 3 a.m., add copies of the checkout service on Saturday mornings and apply security patches to the machines underneath. Her team is too small to babysit a fleet of servers, yet the business wants the flexibility of Kubernetes. At the planning meeting, the chief technology officer asks: 'Can we have Kubernetes without becoming a Kubernetes operations company?'",
  "simple": "When you have lots of containers, you need a manager to decide where each one runs, to restart any that stop and to add more when things get busy. Kubernetes is that manager, a free, open source system that started at Google. Running Kubernetes yourself is hard work, like running your own power station. Google Kubernetes Engine, or GKE, is Google running Kubernetes for you. It comes in two styles. In Standard mode, Google runs the brain of the system and you look after the worker machines, choosing their size and paying for them. In Autopilot mode, Google looks after the worker machines too, and you simply pay for what your containers ask for.",
  "body": [
   "Kubernetes is an open source platform for orchestrating containers. It decides where containers run, keeps the desired number of copies running, restarts or replaces failed ones, scales them up and down, rolls out new versions gradually and connects them with networking and load balancing. Kubernetes began as a Google project, informed by Google's long experience running containers at enormous scale internally, and Google released it as open source. It is now the industry standard for container orchestration, supported by every major cloud provider and widely run on-premises. Because it is open and standard, applications built for Kubernetes are portable between environments.",
   "The central idea in Kubernetes is desired state. Instead of issuing step-by-step commands, you declare what you want, for example 'run five copies of this container image and expose them on port 443', usually in a configuration file. Kubernetes then continuously compares that declaration with what is actually running and acts to close any gap. If a node fails and two copies disappear, Kubernetes notices that only three are running and starts two more elsewhere. This declarative, self-correcting approach is what makes Kubernetes reliable at scale and is a concept the exam may test directly.",
   "A few building blocks are worth knowing. A Kubernetes cluster has a control plane, which makes decisions such as scheduling and holds the cluster's state, and nodes, the worker machines, typically VMs, that actually run the workloads. Containers run inside pods, the smallest deployable unit in Kubernetes. A pod holds one or more tightly coupled containers that share networking and storage. Higher-level objects, such as deployments, manage sets of identical pods and handle rolling updates.",
   "Running Kubernetes yourself is complex. Someone must install the control plane, keep it highly available, upgrade it as new Kubernetes versions arrive, secure it, and manage the nodes, including patching their operating systems and adding or removing capacity. Google Kubernetes Engine (GKE) is Google Cloud's managed Kubernetes service. In every GKE cluster, Google runs and maintains the control plane, handles upgrades and integrates the cluster with Google Cloud networking, Cloud Load Balancing, Cloud Logging, Cloud Monitoring and security services. Teams still use standard Kubernetes tools and configuration, so their skills and workloads remain portable.",
   "GKE offers two modes of operation, and choosing between them is a common exam question. In Standard mode, you manage the nodes. You choose machine types, configure node pools, which are groups of nodes with the same configuration, decide how they scale and pay for the node VMs whether or not your pods fully use them. This mode gives the most control and flexibility, for example for specialized node configurations or teams that want to tune every setting, at the cost of more operational work and the risk of paying for idle capacity.",
   "In Autopilot mode, Google also manages the nodes and the underlying infrastructure. Google provisions and scales nodes based on what your workloads need, applies best-practice security settings by default and handles node upgrades and repairs. Billing is based on the CPU, memory and storage that your pods request rather than on whole node VMs, so you do not pay for unused node capacity. Autopilot reduces operational work and wasted spend, which is why it is often the recommended starting point for teams that want the power of Kubernetes without managing infrastructure. The trade-off is less low-level control over node configuration.",
   "GKE fits containerized applications that genuinely need Kubernetes: many cooperating microservices, complex networking or deployment strategies, stateful workloads, batch processing, or a desire to use the broad Kubernetes ecosystem and keep workloads portable across clouds and on-premises. For simpler stateless web services or APIs, Cloud Run may be easier, because it runs containers with no cluster concepts at all. For organizations running Kubernetes clusters in many places, GKE Enterprise extends consistent GKE management to clusters outside Google Cloud.",
   "When reading scenarios, look for clues. 'Kubernetes without managing nodes', 'minimal operations' or 'pay only for what pods use' points to GKE Autopilot. 'Fine-grained control over node configuration' points to GKE Standard. 'Open source container orchestration that started at Google' is Kubernetes. 'Run containers without any cluster' points to Cloud Run instead. Finally, remember the business framing the Cloud Digital Leader exam favors: GKE lets an organization adopt an open industry standard, avoid building deep in-house expertise in running Kubernetes itself, and redirect engineering time from maintaining infrastructure toward building features customers notice. Autopilot pushes that benefit furthest by removing node management and idle capacity from the equation."
  ],
  "analogy": "Kubernetes is like a thermostat for your applications. You set the temperature you want, the desired state, and the system keeps adjusting the heating to match, without you flipping switches. GKE Standard is like renting a building where the landlord maintains the thermostat but you choose, maintain and pay for the radiators, even in empty rooms. GKE Autopilot is like a serviced office where heating hardware is the landlord's job and you pay for the space you actually occupy. The analogy stops at billing detail: Autopilot charges for the resources your pods request, not for what they happen to use moment to moment.",
  "terms": [
   [
    "Kubernetes",
    "An open source system, started at Google, for automating deployment, scaling and management of containers."
   ],
   [
    "GKE",
    "Google Kubernetes Engine, Google Cloud's managed Kubernetes service."
   ],
   [
    "Autopilot",
    "A GKE mode where Google manages nodes and infrastructure and billing is based on pod resource requests."
   ],
   [
    "Standard mode",
    "A GKE mode where the customer manages and pays for the nodes and node pools."
   ],
   [
    "Pod",
    "The smallest deployable unit in Kubernetes, containing one or more containers."
   ],
   [
    "Desired state",
    "A declaration of what should be running, which Kubernetes continuously works to match."
   ]
  ],
  "example": "An e-commerce company runs 40 microservices on GKE. It chooses Autopilot so its small platform team does not have to size or patch nodes, and pays for the resources its pods request. During a sale, Kubernetes scales the checkout service out while leaving the rest unchanged, and when a node fails, the affected pods are rescheduled automatically.",
  "mistakes": [
   [
    "In GKE Standard, the customer manages the Kubernetes control plane.",
    "Google manages the control plane in both modes. The difference is the nodes: the customer manages them in Standard, Google manages them in Autopilot."
   ],
   [
    "Kubernetes is a proprietary Google Cloud product.",
    "Kubernetes is open source and runs in every major cloud and on-premises. It started at Google; GKE is Google Cloud's managed offering of it."
   ],
   [
    "Autopilot bills for whole node VMs, just like Standard.",
    "Autopilot bills based on the CPU, memory and storage that pods request, so you do not pay for unused node capacity."
   ],
   [
    "GKE is always the best choice for any containerized app.",
    "For simple stateless services, Cloud Run is often easier because there is no cluster to manage. GKE suits workloads that need Kubernetes features."
   ]
  ],
  "tryit": [
   [
    "A media startup with two developers and no operations staff wants to run 12 containerized services on Kubernetes so it can later move to other environments if needed. It wants to avoid paying for idle server capacity. Which GKE mode should it choose?",
    "GKE Autopilot. Google manages the nodes and security settings, which suits a team with no operations staff, and billing is based on pod resource requests, so the startup does not pay for unused node capacity. It still gets standard, portable Kubernetes."
   ],
   [
    "A research lab runs Kubernetes workloads that need nodes with a specific configuration its engineers want to tune closely, and it has an experienced platform team. Which mode fits better?",
    "GKE Standard, because it gives the team direct control over node pools and machine configuration, and the team has the skills to manage the extra operational work."
   ]
  ],
  "tip": "Want Kubernetes without managing nodes: GKE Autopilot. Want control over node configuration: GKE Standard. Remember that Kubernetes itself is open source and started at Google, and that Google manages the control plane in both modes.",
  "check": [
   [
    "What does Google manage in GKE Autopilot that the customer manages in Standard?",
    "The nodes and underlying infrastructure, including their sizing, scaling and security configuration."
   ],
   [
    "What is desired state in Kubernetes?",
    "A declaration of what should be running; Kubernetes continuously acts to make the actual state match it."
   ],
   [
    "What is a pod?",
    "The smallest deployable unit in Kubernetes, holding one or more containers that share networking and storage."
   ]
  ]
 },
 {
  "t": "Serverless computing: Cloud Run, Cloud Run functions and App Engine",
  "hook": "At 6:40 a.m. a story breaks, and traffic to the Bayside Courier's news API jumps fortyfold in ten minutes. Two years ago this would have meant Omar, the paper's only infrastructure engineer, scrambling to add servers while the site crawled. This morning Omar is still asleep. The API scales up on its own, photos uploaded by reporters are resized automatically, and by midnight, when readers drift away, the platform scales back down to nothing and the meter almost stops. The editor-in-chief, reviewing the monthly bill, asks Omar how a small newsroom gets this kind of elasticity without a large operations team. What exactly is 'serverless', and when is it the right choice?",
  "simple": "Serverless means you hand Google your code and it takes care of the computers that run it. There are still computers, of course, but you never see them, fix them or decide how many you need. When lots of people use your app, Google runs more copies; when nobody does, it can run none at all, and you pay only while your code is actually working, a bit like a taxi meter that only runs during the ride. Google Cloud has three main serverless choices: Cloud Run runs whole apps packed in containers, Cloud Run functions runs small pieces of code when something happens, such as a photo being uploaded, and App Engine is an older platform for web apps.",
  "body": [
   "Serverless computing lets developers run code without provisioning or managing servers. The platform takes care of the infrastructure, operating system patching, capacity planning, scaling and availability. Applications scale automatically with demand, often all the way down to zero instances when idle, and you pay for the resources consumed while handling requests or events rather than for servers sitting idle. Servers still exist, of course, but they are entirely the provider's concern. For a business, serverless means small teams can deliver features quickly, avoid paying for idle capacity, and absorb sudden spikes in demand without emergency capacity work.",
   "Three characteristics define serverless and appear often on the exam. First, there are no servers to manage: you deploy code or a container, not a VM. Second, scaling is automatic and fine-grained, including scale to zero, which means running no instances and paying no compute cost when there is no traffic. Third, pricing is pay per use, typically based on requests and the CPU and memory consumed while code runs. One practical side effect of scaling to zero is the cold start: the first request after a quiet period may take a little longer while a new instance starts, which some services address by keeping a minimum number of instances warm.",
   "Cloud Run is a fully managed platform for running containers. You provide a container image, or source code that Cloud Run builds into a container for you, and Cloud Run gives you a secure HTTPS endpoint. It automatically scales the number of container instances up and down with incoming requests, including to zero, and bills for the resources used. Because Cloud Run runs standard containers, you can use any programming language, library or binary that fits in a container, and the same image could run on Google Kubernetes Engine (GKE) or elsewhere, which keeps workloads portable. Cloud Run suits web applications, APIs, microservices and, through Cloud Run jobs, tasks that run to completion such as nightly data processing. It is often the default recommendation for new stateless services on Google Cloud.",
   "Cloud Run functions, formerly called Cloud Functions, runs single-purpose pieces of code, written in supported languages, in response to events. Triggers include an HTTP request, a new or changed file in a Cloud Storage bucket, a message published to a Pub/Sub topic, or a change in a database. You write just the function, a few lines or a few dozen, and the platform handles packaging, scaling and execution. This makes it ideal for glue code and lightweight automation, for example resizing an image when it is uploaded, sending a notification when an order is placed, or transforming a record as it arrives. Each function does one job well, and many functions together can stitch services into event-driven workflows.",
   "App Engine is Google Cloud's original platform as a service (PaaS) for web applications. Developers deploy code in supported languages, and App Engine manages the runtime, scaling and versions. A notable feature is built-in versioning with traffic splitting, which lets a team send a small percentage of users to a new version before rolling it out fully. Many established applications still run on App Engine, while Cloud Run is often chosen for new containerized services because it offers more flexibility in languages and libraries.",
   "To choose among them, think about the shape of the work. A complete web app, API or microservice packaged as a container, especially one with variable or spiky traffic, fits Cloud Run. A small piece of code that should run whenever something happens fits Cloud Run functions. A code-based web application on a managed platform, particularly an existing one, fits App Engine. In all three cases, the team focuses on code and business logic while Google handles the infrastructure.",
   "Serverless is not ideal for everything. Workloads that need full control of the operating system or kernel, special hardware configurations, software licensed to specific servers, long-running processes that must be always on with constant heavy load, or very specific networking setups may fit Compute Engine VMs or GKE better. Applications also need to be designed to be stateless, storing session data and files in services such as databases or Cloud Storage rather than on the instance, because instances come and go. On the exam, the phrases 'no infrastructure to manage', 'scale to zero', 'pay only when code runs' and 'event-driven' are strong signals for serverless."
  ],
  "analogy": "Serverless is like using a ride-hailing service instead of owning a car. You do not buy, insure, fuel or repair the vehicle; you request a ride when you need one and pay for the trip. More passengers means more cars appear, and when nobody needs a ride you pay nothing. Cloud Run is booking a full car for your own route; Cloud Run functions is a quick courier triggered when a package is ready. Where it stops working: the first ride after a quiet spell may take a moment to arrive, like a cold start, and you cannot modify the car's engine, just as you cannot customize the OS.",
  "terms": [
   [
    "Serverless",
    "Running code without managing servers, with automatic scaling and pay-per-use pricing."
   ],
   [
    "Cloud Run",
    "A managed serverless platform for running containers that scales automatically, including to zero."
   ],
   [
    "Cloud Run functions",
    "Event-driven serverless functions (formerly Cloud Functions) that run in response to triggers such as HTTP requests, new files or Pub/Sub messages."
   ],
   [
    "App Engine",
    "Google Cloud's original platform as a service for deploying code-based web applications with managed scaling and versioning."
   ],
   [
    "Scale to zero",
    "Running no instances, and incurring no compute cost, when there is no traffic."
   ],
   [
    "Cold start",
    "The extra delay when a new instance starts to handle a request after a period with no running instances."
   ]
  ],
  "example": "A news site runs its API on Cloud Run so it scales up when a big story breaks and down to zero overnight. When a journalist uploads a photo to Cloud Storage, a Cloud Run function automatically creates thumbnails. The site's older reader-comments app still runs on App Engine, where the team uses traffic splitting to test new versions on a small share of readers. The team never patches a server.",
  "mistakes": [
   [
    "Serverless means there are no servers at all.",
    "Servers still run the code; the provider manages them entirely, so the customer never provisions, patches or scales them."
   ],
   [
    "Cloud Run only runs code written in a few supported languages.",
    "Cloud Run runs standard containers, so any language or library that fits in a container works. Language support limits apply to Cloud Run functions and App Engine runtimes."
   ],
   [
    "Serverless is the right choice for every workload.",
    "Workloads needing full OS control, special hardware, server-bound licenses or constant always-on heavy processing may fit Compute Engine or GKE better."
   ],
   [
    "Use Cloud Run functions to host a full multi-page web application.",
    "Functions suit small, single-purpose, event-driven tasks. A full web app or API is better on Cloud Run or App Engine."
   ]
  ],
  "tryit": [
   [
    "A charity runs a donation API that is busy for a few days during its annual campaign and almost idle the rest of the year. The API is already packaged as a container, and the charity has one part-time developer and no operations staff. Which service fits best, and why?",
    "Cloud Run. It runs the existing container with no servers to manage, scales up automatically during the campaign and down to zero when idle, and bills only for resources used, which suits spiky traffic and a tiny team."
   ],
   [
    "An online store wants to send a confirmation text message every time a new order record is published to a Pub/Sub topic. The logic is about twenty lines of code. What is the simplest serverless option?",
    "Cloud Run functions triggered by the Pub/Sub message. It runs the small piece of code only when an order event arrives, with no infrastructure to manage."
   ]
  ],
  "tip": "Containerized web app or API with no infrastructure to manage and scale to zero: Cloud Run. Small piece of code triggered by an event: Cloud Run functions. Code-based web app platform with versioning and traffic splitting: App Engine.",
  "check": [
   [
    "What makes a service serverless?",
    "No servers to manage, automatic scaling (often to zero) and pay-per-use billing."
   ],
   [
    "Which serverless option would you use to run code each time a message arrives in Pub/Sub?",
    "Cloud Run functions, triggered by the Pub/Sub event."
   ],
   [
    "Why can Cloud Run run almost any language?",
    "Because it runs standard container images, so anything that can be packaged in a container can run."
   ]
  ]
 },
 {
  "t": "Choosing compute for a workload: VMs vs containers vs serverless",
  "hook": "Grace has three sticky notes on her monitor at Pinewood Logistics. The first says 'ERP: licensed per server, vendor insists on a specific OS version'. The second says 'Order platform: 30 microservices, three teams, may run in another cloud after the merger'. The third says 'Partner API: brand new, traffic unknown, team of two'. Her director wants a recommendation by Thursday, and a vendor has already suggested putting everything on Kubernetes 'to keep it simple'. Grace suspects one answer for all three would be wrong for at least two of them. How should she decide where each workload runs on Google Cloud?",
  "simple": "Choosing where to run software in the cloud is like choosing how to get a meal. You can buy groceries and cook yourself, which gives you full control but takes the most work (virtual machines). You can use a meal-kit service where ingredients arrive organized and you assemble them following a standard system (containers on Kubernetes). Or you can order from a restaurant and simply eat, with no cooking or cleaning at all (serverless). None is always best. If you need a very specific recipe, cook it yourself. If you want variety and organization at scale, use the kit. If you just want food fast with little effort, order in. A good rule is to pick the least-work option that still gives you what you need.",
  "body": [
   "Google Cloud gives you a spectrum of compute options rather than a single answer. At one end, infrastructure as a service (IaaS) virtual machines (VMs) give you control over everything and make you responsible for everything above the hardware. At the other end, serverless platforms ask you to manage almost nothing, but you accept the platform's conventions, such as stateless design and a standard runtime. Containers on Kubernetes sit in between. The Cloud Digital Leader exam frequently describes a workload and asks which option fits, so it pays to have a clear, repeatable decision process rather than memorizing product lists.",
   "Choose virtual machines on Compute Engine when you need full control over the operating system, kernel or installed software; when you are lifting and shifting an existing application without changes; when software licensing requires a traditional server; or when the workload needs specific hardware configurations, such as particular GPUs or very large memory. The trade-off is responsibility. You patch, secure and configure the guest OS, and you design how it scales, although managed instance groups (MIGs) with autoscaling and autohealing take much of the manual effort away. VMs are also the comfortable landing zone for legacy software that was never designed for the cloud.",
   "Choose containers on Google Kubernetes Engine (GKE) when you have containerized applications that benefit from Kubernetes itself. Good signals include many cooperating microservices, complex networking or deployment strategies such as gradual rollouts across services, stateful workloads or batch processing that need orchestration, and a desire for portability across clouds and on-premises using the open Kubernetes standard. GKE Autopilot removes node management and bills for what pods request, but teams still work with Kubernetes concepts such as pods, deployments and services, which requires some skill. GKE Standard gives more control over nodes for teams that need it.",
   "Choose serverless when you want the least operational work. Cloud Run is a strong default for stateless containerized web apps, APIs and jobs, especially with variable or spiky traffic, because it scales automatically and down to zero, so you pay nothing for idle time. Cloud Run functions suits small, event-driven tasks, such as reacting to a new file in Cloud Storage or a message in Pub/Sub. App Engine suits code-based web applications on a managed platform. A stateless application, one that stores no session data on the instance itself so that any instance can handle any request, is the natural fit for serverless, because instances come and go as demand changes.",
   "Remember the specialist options too, because exam scenarios sometimes hide them among the main choices. Google Cloud VMware Engine fits organizations with an existing VMware estate that want to move quickly while keeping their VMware tools and skills. Bare Metal Solution fits workloads that need dedicated physical servers, most notably Oracle databases with licensing constraints. These are usually the answer when the scenario mentions VMware, Oracle or dedicated hardware explicitly.",
   "A practical rule ties all of this together: use the most managed option that meets the requirements. The more Google manages, the less undifferentiated work your team does, meaning work such as patching and capacity planning that every company must do but that does not make any company special. More management by Google often also means lower cost for variable traffic, because you are not paying for idle servers, and it frees teams to focus on features customers value. Move toward VMs only when you need the control they give, and be ready to explain which requirement forced that choice. This idea of operational overhead, the work needed to run, patch, scale and secure infrastructure, is central to how the exam frames these decisions.",
   "It also helps to ask a short series of questions in order. Does the workload need OS-level control, special hardware or server-bound licensing? If so, use Compute Engine or a specialist option. Is it a set of containerized services that need Kubernetes features or portability across environments? If so, use GKE, preferably Autopilot unless node control is needed. Is it a stateless app, API or event handler where minimal operations matter most? If so, use Cloud Run or Cloud Run functions. Asking the questions in this order prevents choosing a platform simply because it is fashionable.",
   "Finally, real organizations rarely pick just one. Many use all three side by side: VMs for legacy systems and licensed software, GKE for complex platforms built by several teams, and Cloud Run for new services and APIs. Workloads can also move along the spectrum over time, for example starting on VMs after a lift and shift, then being containerized onto GKE, and later having individual services moved to Cloud Run as they are rewritten."
  ],
  "analogy": "Picking compute is like choosing housing. A VM is owning a house: you can renovate anything, but you fix the roof and mow the lawn. GKE is a well-run apartment complex: the building staff handle a lot, you still furnish and arrange your units, and the floor plans follow a common standard you could find in other cities. Serverless is a hotel: you just show up, use the room and pay per night, with no maintenance at all. The analogy stops working on price: a hotel is expensive for permanent living, but serverless can be cheapest for spiky traffic because it scales to zero.",
  "terms": [
   [
    "Compute spectrum",
    "The range from IaaS VMs (most control, most management) to serverless (least management, least control)."
   ],
   [
    "Stateless",
    "An application that stores no session data locally, so any instance can handle any request."
   ],
   [
    "Operational overhead",
    "The work needed to run, patch, scale and secure infrastructure."
   ],
   [
    "Portability",
    "The ability to run the same workload in different environments."
   ],
   [
    "Undifferentiated work",
    "Necessary infrastructure tasks, such as patching and capacity planning, that do not set a business apart."
   ]
  ],
  "example": "A company modernizing three systems keeps its licensed ERP on Compute Engine VMs, moves its 30-service order platform to GKE Autopilot, and builds a new partner API on Cloud Run because traffic is unpredictable and the team is small. A small function written for Cloud Run functions sends a notification whenever the partner API records a large order.",
  "mistakes": [
   [
    "Kubernetes is always the most modern and therefore the best choice.",
    "GKE adds Kubernetes concepts and some operational work. For simple stateless services, Cloud Run is usually easier and cheaper; choose GKE when Kubernetes features or portability are needed."
   ],
   [
    "VMs are outdated and should be avoided.",
    "VMs remain the right answer when you need OS control, special hardware, server-bound licensing or an unchanged lift and shift."
   ],
   [
    "Serverless is always the cheapest option.",
    "Serverless is very cost-effective for variable or spiky traffic thanks to scale to zero, but constant heavy workloads or special requirements may be better served elsewhere."
   ],
   [
    "An organization should standardize on one compute option for everything.",
    "Most organizations mix VMs, containers and serverless, matching each workload to the most managed option that meets its needs."
   ]
  ],
  "tryit": [
   [
    "A university is moving a research application that depends on a specific Linux kernel module and runs on licensed scientific software tied to named servers. Researchers do not want the code changed. Where should it run?",
    "Compute Engine VMs. The kernel module requires OS-level control, the licensing is tied to servers and the code should not change, which rules out serverless and makes Kubernetes unnecessary overhead."
   ],
   [
    "A fitness app company builds a new leaderboard API as a container. Usage spikes in the evening and drops to almost nothing overnight. The two-person team does not want to learn Kubernetes. Which option fits?",
    "Cloud Run. It runs the container with no infrastructure or Kubernetes to manage, scales up for evening peaks and down to zero overnight, and charges only for resources used."
   ]
  ],
  "tip": "Use the most managed service that meets the need. Full OS control or unchanged legacy app: Compute Engine. Kubernetes features and portability: GKE. Stateless, spiky, minimal operations: Cloud Run. VMware or Oracle on dedicated hardware: VMware Engine or Bare Metal Solution.",
  "check": [
   [
    "A stateless API gets unpredictable traffic and the team wants no infrastructure work. Which option?",
    "Cloud Run."
   ],
   [
    "Give two reasons to choose Compute Engine over serverless.",
    "Need for full OS control, an unchanged lift-and-shift, licensing requirements, or special hardware configurations (any two)."
   ],
   [
    "What is the general rule for choosing among compute options?",
    "Use the most managed option that meets the requirements, moving toward VMs only when you need the extra control."
   ]
  ]
 },
 {
  "t": "Monoliths vs microservices and application modernization",
  "hook": "At Copperfield Books, every change to the online store waits for 'release weekend'. A one-line fix to the search box must be bundled with everyone else's work, tested together for days and deployed as a single giant package at 2 a.m. on Saturday. Last month a memory leak in the recommendations feature crashed the entire site, including checkout, during a holiday promotion. Now the marketing team wants a new loyalty feature in three weeks, and Ravi, the engineering lead, knows the release calendar cannot deliver it. He has heard that breaking the application into smaller pieces could help, but also that it can create chaos. When is splitting an application worth it, and how do you do it safely?",
  "simple": "A monolith is one big application where every feature lives in a single block, like a giant all-in-one machine. If one part breaks or needs changing, you have to stop and test the whole machine. Microservices split the application into many small programs, each doing one job, such as search, shopping cart or payments, and talking to each other through clear connections. It is like a food court instead of one huge restaurant kitchen: if the noodle stall closes, the pizza stall keeps serving. Each small piece can be changed, fixed or made bigger on its own. The price is that you now have many pieces to keep track of, so it makes most sense for large, busy applications.",
  "body": [
   "A monolithic application is built and deployed as a single unit. All its features, such as user accounts, product catalog, shopping cart, payments and notifications, live in one codebase and run as one process or package. Monoliths are not bad by design. They are simple to start with, easy to test as a whole and straightforward to deploy when an application and team are small. Problems appear as the application grows. A small update requires testing and redeploying the entire application, so releases become large, slow and risky. One bug or overloaded feature can bring everything down, because all features share the same process. Scaling means copying the whole application even if only one part, such as search, is busy. And large teams working in one codebase step on one another, waiting for shared release dates.",
   "A microservices architecture splits an application into small, independent services, each responsible for one business capability, such as search, cart or payments, and typically owned by one small team. Services communicate over well-defined application programming interfaces (APIs) or asynchronously through messaging services such as Pub/Sub. Because each service is separate, it can be developed, tested, deployed and scaled independently. A team can release its service several times a day without coordinating with every other team. Each service can even use a different language or database best suited to its job. Microservices also improve fault isolation: if the recommendation service fails, customers can still search and check out, and the failure is contained.",
   "Microservices bring their own costs, and the exam expects you to recognize the trade-off. There are many more moving parts to deploy and monitor. Calls between services travel over the network, adding latency and new failure modes. Data is distributed across services, which makes consistency and reporting harder. Testing interactions across services is more complex than testing one program. For these reasons, microservices pay off for large, fast-changing applications developed by multiple teams, not necessarily for small, simple applications run by one team, where a well-structured monolith may be the better choice.",
   "Cloud services make microservices practical. Containers package each service consistently. Google Kubernetes Engine (GKE) orchestrates many services, and Cloud Run runs individual services without any infrastructure to manage. API management with Apigee secures and controls how services and partners call one another. Observability tools such as Cloud Logging, Cloud Monitoring and Cloud Trace help teams see how a request flows across many services and where it slows down or fails.",
   "Organizations rarely rewrite a monolith all at once, because a 'big bang' rewrite is slow, expensive and risky, and the business cannot pause while it happens. A common approach is the strangler pattern, named after a vine that gradually grows around a tree. The team places an API layer or load balancer in front of the monolith, then carves out one feature at a time into a new service. Requests for that feature are routed to the new service, while everything else still goes to the monolith. Over time, more features move out, the monolith shrinks, and eventually it is small enough to retire. Users see no disruption, and the team delivers value continuously instead of waiting years for a rewrite.",
   "Modernization is not only about architecture; it is also about practices. Continuous integration and continuous delivery (CI/CD) automate building, testing and deploying each service whenever code changes, so releases become small, frequent and routine. Infrastructure as code defines environments, networks and services in version-controlled configuration files, so environments can be recreated reliably and changes reviewed like code. A DevOps culture brings development and operations together with shared responsibility for reliability. Together, these let teams release small changes frequently and safely, measure the results and roll back quickly if needed.",
   "Keep the business goal in view, because the Cloud Digital Leader exam frames modernization in business terms. The point of microservices and modern practices is not technical fashion; it is speed and resilience. Organizations modernize so they can respond faster to customers and competitors, experiment with new features, scale the parts of the business that are growing and reduce the impact of failures. When a scenario emphasizes slow releases, whole-application outages caused by one feature or teams blocking one another, think microservices and modernization. When it emphasizes a small, simple app with one team, a monolith may be perfectly reasonable."
  ],
  "analogy": "A monolith is like a single long train: every car is coupled together, so to repaint one car you stop the whole train, and if one car derails, the whole train halts. Microservices are like a fleet of delivery vans: each van can be serviced, upgraded or added on its own, and one breakdown does not stop the others. The strangler pattern is retiring the train one car at a time by moving its cargo onto vans. Where it stops working: a fleet needs dispatchers, radios and route tracking, just as microservices need orchestration, APIs and monitoring, and that coordination is a real cost.",
  "terms": [
   [
    "Monolith",
    "An application built and deployed as a single unit."
   ],
   [
    "Microservices",
    "An architecture of small, independently deployable services that communicate through APIs or messaging."
   ],
   [
    "Strangler pattern",
    "Gradually replacing parts of a legacy system with new services until the old system can be retired."
   ],
   [
    "Infrastructure as code",
    "Defining and managing infrastructure through version-controlled configuration files."
   ],
   [
    "CI/CD",
    "Continuous integration and continuous delivery: automated building, testing and deployment of code changes."
   ],
   [
    "Fault isolation",
    "Containing a failure within one component so it does not bring down the whole application."
   ]
  ],
  "example": "An online retailer's monolith needs a full weekend release for any change. The team first moves the product search feature into a separate service on Cloud Run behind the same URL, then the cart, then payments. Each team now releases its own service several times a week through a CI/CD pipeline, and when the new search service has a bug, only search is affected while checkout keeps working.",
  "mistakes": [
   [
    "Microservices are always better than monoliths.",
    "Microservices add operational complexity. They pay off for large, fast-changing applications with several teams; a small, simple app may be better as a monolith."
   ],
   [
    "The best way to modernize is to rewrite the monolith all at once.",
    "Big-bang rewrites are slow and risky. The strangler pattern moves features out gradually while the old application keeps running."
   ],
   [
    "Modernization is only about changing architecture.",
    "Practices such as CI/CD, infrastructure as code and DevOps culture are equally important for releasing small changes frequently and safely."
   ],
   [
    "In a microservices app, one failing service always takes everything down.",
    "Fault isolation is a key benefit: a failing service, such as recommendations, can fail while others, such as checkout, keep running, if the system is designed for it."
   ]
  ],
  "tryit": [
   [
    "A two-person startup is building its first product, a simple appointment booking app, and wants to launch in six weeks. An advisor tells them to start with 15 microservices on Kubernetes. What would you recommend?",
    "Start with a well-structured monolith, perhaps on a managed platform such as Cloud Run. With one small team and a simple app, microservices would add operational complexity without the benefits of independent teams and scaling. They can split out services later if the app and team grow."
   ],
   [
    "A large insurer's claims system is a ten-year-old monolith. Releases take a month, and the business wants to modernize without disrupting claims processing. How should it approach this?",
    "Use the strangler pattern: put an API layer in front of the monolith and carve out features one at a time into new services, routing traffic to each new service as it is ready, until the monolith can be retired. Pair this with CI/CD so each new service can be released frequently."
   ]
  ],
  "tip": "Independent deployment, independent scaling and fault isolation are the key microservices benefits. The trade-off is more operational complexity, so they suit large, fast-changing applications. Gradual migration from a monolith is the strangler pattern.",
  "check": [
   [
    "Give two problems of large monoliths.",
    "Any change requires redeploying everything, one failure can take down the whole app, and scaling means copying the entire app (any two)."
   ],
   [
    "What is the strangler pattern?",
    "Gradually moving features from a legacy application into new services until the old application can be retired."
   ],
   [
    "Name one drawback of microservices.",
    "More moving parts to monitor, network calls between services, distributed data or more complex testing."
   ]
  ]
 },
 {
  "t": "APIs and API management with Apigee",
  "hook": "The partnerships team at Lakeshore Health Group has good news and bad news. The good news: five popular wellness apps want to show patients their upcoming appointment times. The bad news: the appointment data lives in a 20-year-old scheduling system that nobody dares to modify, and the security officer is asking pointed questions. Who will be allowed in? What stops one app from flooding the old system with requests? How will auditors see who accessed what? And next year, when the scheduling system is finally replaced, will all five partners have to rebuild their integrations? Mei, the integration architect, has a plan. How can the group open its data safely without touching the old system?",
  "simple": "An API, or application programming interface, is like a restaurant menu with a waiter. You do not walk into the kitchen; you pick from the menu and the waiter brings your order back. Software works the same way: one program asks another for information through a set list of allowed requests, without needing to know how the other program works inside. Once many outside apps start ordering, you need someone managing the front of house: checking who is allowed in, stopping any one table from ordering a thousand dishes at once, and keeping records of every order. That is API management, and Apigee is Google Cloud's tool for doing it.",
  "body": [
   "An application programming interface (API) is a defined way for one piece of software to request data or actions from another. The API specifies what requests are allowed, what information they need and what comes back. When a mobile banking app shows your balance, it calls the bank's API. When an online shop shows shipping rates at checkout, it calls a carrier's API. APIs hide the complexity of the systems behind them, so the caller does not need to know what database, language or hardware is involved, and they let those systems be reused in new ways by new applications.",
   "APIs are central to digital transformation, and the exam frames them in business terms. First, they unlock data and functions trapped in legacy systems. Instead of rewriting a decades-old back end, an organization can put an API in front of it and expose its capabilities to new mobile apps, websites, partners and channels. Second, APIs let microservices work together, since each service exposes its capability through a well-defined interface. Third, APIs create new business models and ecosystems. A company can offer its capabilities as products that partners build on, sometimes for a fee. A retailer might publish product and inventory APIs so marketplace partners list its goods automatically, and a logistics company might sell access to shipment-tracking data.",
   "Once APIs are shared beyond a single team, especially with outside developers, they need to be managed like products. API management covers several capabilities. Security includes authenticating callers, for example with API keys or OAuth tokens, and protecting back ends from abuse and malicious traffic. Traffic management includes rate limiting and quotas, which restrict how many requests a consumer can make in a period, so that one consumer cannot overload the back end or exceed what it paid for. Analytics show who uses which APIs, how often, with what errors and how quickly they respond. Versioning lets an API evolve without breaking existing consumers. A developer portal provides documentation, sample calls and self-service sign-up for API keys. And, where the business model calls for it, monetization lets the organization charge for API usage.",
   "Apigee is Google Cloud's API management platform. It works as a proxy layer that sits in front of back-end services, wherever those services run: on Google Cloud, in an on-premises data center or in another cloud. Every call from a consumer goes to the Apigee proxy first, where policies are applied before the request is passed on. These policies can verify credentials, enforce quotas and rate limits, transform requests and responses between formats, and cache frequent responses to reduce load on the back end. Apigee also provides dashboards on API traffic, performance and business metrics, and developer portals where partners can discover and sign up for APIs.",
   "One of Apigee's most important benefits is decoupling. Because consumers call the proxy rather than the back end directly, the systems behind the API can change without consumers noticing. An organization can modernize or replace a legacy system, move it to the cloud, or split it into microservices, and as long as the API contract stays the same, partner apps keep working. This makes APIs a powerful tool in the strangler pattern for gradual modernization: the API stays stable while what sits behind it is replaced piece by piece.",
   "Analytics deserve a closer look, because they turn APIs from plumbing into a measurable business channel. In Apigee dashboards, a product owner can see which partners call which APIs, traffic trends over time, error rates and response times. Those numbers answer business questions: which partner integrations are growing, which API versions can be retired, whether a back end needs more capacity and which API products might justify a paid tier.",
   "It helps to separate the idea of an API from the management of APIs. Many systems have APIs, and many teams build them. API management becomes necessary when APIs are exposed to many consumers, especially external partners and developers, and when the organization needs to control access, protect back ends, understand usage and possibly earn revenue. In a typical exam scenario, a company 'wants to share services securely with partners', 'needs to limit how many requests each partner can make', 'wants analytics on API usage' or 'plans to monetize its data through APIs'.",
   "For the Cloud Digital Leader exam, connect APIs to unlocking legacy data, enabling partner ecosystems and supporting microservices, and connect Apigee to managing APIs at scale: security, rate limiting and quotas, analytics, developer portals and monetization. When a scenario asks how to expose services to third parties safely and measurably, the answer is Apigee."
  ],
  "analogy": "Apigee is like the reception desk of a busy office building. Visitors never wander the halls; they sign in, show identification, get a badge that limits which floors they can visit, and the desk logs every visit. If one visitor keeps returning every minute, the desk can turn them away. Behind the desk, the company can renovate offices or move departments without visitors noticing, because they always go through the same reception. Where it stops working: a receptionist cannot charge visitors per visit as a business model, while Apigee can support API monetization.",
  "terms": [
   [
    "API",
    "Application programming interface: a defined way for software to request data or actions from other software."
   ],
   [
    "API management",
    "Securing, controlling, monitoring and publishing APIs as products."
   ],
   [
    "Apigee",
    "Google Cloud's API management platform, acting as a proxy layer in front of back-end services wherever they run."
   ],
   [
    "Rate limiting",
    "Restricting how many requests a consumer can make in a period to protect back-end systems."
   ],
   [
    "Developer portal",
    "A site where developers find API documentation and sign up for access."
   ],
   [
    "Monetization",
    "Charging consumers for API usage as a source of revenue."
   ]
  ],
  "example": "A hospital group wants to let approved health apps show patients their appointment times. It exposes an appointments API through Apigee, which checks each app's credentials, limits request rates, logs usage for audits and offers a developer portal, while the old scheduling system behind it stays unchanged. A year later, the group replaces the scheduling system, and because the API contract stays the same, none of the partner apps need to change.",
  "mistakes": [
   [
    "Apigee only works for back ends running on Google Cloud.",
    "Apigee can sit in front of back-end services running on Google Cloud, on-premises or in other clouds."
   ],
   [
    "To share legacy data with partners, you must first rewrite the legacy system.",
    "An API can expose the legacy system's data and functions as it is, and API management protects it. The back end can be modernized later behind the same API."
   ],
   [
    "An API and API management are the same thing.",
    "An API is the interface itself. API management adds security, quotas, analytics, versioning, developer portals and monetization across many APIs and consumers."
   ],
   [
    "Rate limiting is mainly about saving money on bandwidth.",
    "Rate limits and quotas mainly protect back-end systems from overload and enforce fair or paid usage levels per consumer."
   ]
  ],
  "tryit": [
   [
    "A weather data company wants outside developers to build apps on its forecast data. It wants developers to sign up on their own, wants free users limited to a small number of calls per day, and wants to charge for higher tiers. What should it use?",
    "Apigee. Its developer portal supports self-service sign-up, quotas enforce the free-tier limit and higher tiers, analytics show usage, and monetization supports charging for API access."
   ],
   [
    "A retailer's inventory system is fragile and was slowed down when a single marketplace partner sent thousands of requests per minute. The retailer still wants partners to access inventory data. What capability addresses the problem?",
    "Rate limiting and quotas through API management with Apigee, which cap how many requests each partner can make so no single consumer can overload the inventory system."
   ]
  ],
  "tip": "APIs unlock legacy data and enable partner ecosystems. Apigee manages them: security, quotas, analytics, developer portals and monetization, for back ends anywhere.",
  "check": [
   [
    "How can APIs help modernize a legacy system without rewriting it?",
    "An API exposes the legacy system's data and functions to new apps; the back end can later be replaced without changing the consumers."
   ],
   [
    "Name four capabilities of API management.",
    "Security, rate limiting and quotas, analytics, versioning, developer portals and monetization (any four)."
   ],
   [
    "Why does Apigee's proxy design help modernization?",
    "Consumers call the proxy, not the back end, so the back end can change or be replaced without breaking consumers as long as the API stays the same."
   ]
  ]
 },
 {
  "t": "Hybrid and multicloud with GKE Enterprise (formerly Anthos)",
  "hook": "Hannah runs the platform team at Ironbridge Manufacturing, and her environment map looks like a patchwork quilt. Each of twelve factories runs its own Kubernetes cluster for machine control, because a round trip to the cloud is too slow for the production line. Analytics runs in Google Cloud. A subsidiary acquired last spring runs everything in another public cloud. Each environment has its own dashboards, its own security settings and its own way of deploying. Last week an auditor found that three factory clusters were missing a security policy the others had. The chief information security officer asks Hannah a simple question: 'How do we make sure every cluster, everywhere, follows the same rules?'",
  "simple": "Hybrid means a company uses both its own computer rooms and a public cloud. Multicloud means it uses more than one cloud provider. Many companies end up with both, which is like owning several houses in different towns, each with its own keys, alarm system and rules. Keeping them all safe and consistent is hard. Containers help, because the same packaged app can run in any of the houses. GKE Enterprise, which used to be called Anthos, is Google Cloud's tool for managing all those places from one control room: one screen to see everything, one set of rules applied everywhere and one way to deploy apps, no matter where they actually run.",
  "body": [
   "Many organizations run applications across several environments: their own data centers, Google Cloud, other public clouds and edge locations such as retail stores, factories or hospitals. Running in more than one place is called hybrid cloud when it combines on-premises and public cloud, and multicloud when it uses more than one public cloud provider. Organizations end up this way for good reasons: regulations that require certain data to stay in a particular location, latency needs that demand computing close to machines or customers, existing investments in data centers, mergers and acquisitions that bring in another cloud, or a deliberate strategy to avoid depending on a single provider.",
   "The challenge is consistency. Each environment tends to come with its own tools, security settings, deployment methods and operating processes. Teams spend their time translating between them, and gaps appear, such as a cluster missing a security policy or an environment running an outdated configuration. Inconsistency slows delivery, increases risk and makes audits painful. The business problem is not that workloads run in many places; it is that managing them differently in each place wastes effort and creates blind spots.",
   "Containers and Kubernetes provide a common foundation, because the same container images and Kubernetes concepts work in every environment. But running many clusters in many places still needs central management. GKE Enterprise, the evolution of the product previously called Anthos, is Google Cloud's platform for managing fleets of Kubernetes clusters across Google Cloud, on-premises data centers running on VMware or bare metal servers, other public clouds and edge sites. Study materials and exam questions may still use the older name Anthos, so recognize both.",
   "GKE Enterprise gives platform teams several capabilities. They can see and manage all clusters from the Google Cloud console as a fleet, a logical group of clusters managed together, regardless of where each cluster runs. They can apply configuration and security policies consistently from a central Git repository, an approach often called policy as code or configuration as code: the desired settings are stored in version-controlled files, and every cluster in the fleet is automatically kept in line with them, so drift and missing policies are detected and corrected. They can use a service mesh to manage secure, encrypted service-to-service communication, control traffic between services and gain observability into how services interact. And they can use the same logging, monitoring and deployment tools everywhere, so operators learn one set of tools.",
   "Consider what this looks like in practice. A platform engineer opens the Google Cloud console and sees every registered cluster in the fleet, whether it runs in a Google Cloud region, a data center or a store, along with its health and whether it matches the policies in the central repository. To roll out a new security rule, such as blocking containers that run with excessive privileges, the engineer submits a change to the Git repository. After review and approval, the change is applied across the fleet, and any cluster that falls out of line is flagged or brought back into compliance automatically. The change history in Git also gives auditors a clear record of what changed, when and who approved it.",
   "Developers benefit too. They get one consistent way to build, deploy and run applications, regardless of whether the application lands in a factory, a data center or a cloud region. That consistency shortens onboarding, reduces mistakes and lets the organization move workloads between environments as needs change, rather than being locked into wherever an application was first deployed.",
   "This approach supports several business strategies. A company can modernize applications into containers on-premises first, gaining agility immediately, and move them to the cloud later with little change. It can run workloads where data must stay or where latency matters, such as on a factory floor or in a hospital, while still managing them centrally under one set of policies. It can use more than one cloud, for example after an acquisition, without doubling its operational tools and staff. And it can reduce the risk of depending on any single environment.",
   "GKE Enterprise is not the only Google Cloud capability for hybrid and multicloud. Cloud Interconnect provides private, high-bandwidth connections between on-premises networks and Google Cloud, and Cloud VPN provides encrypted connections over the public internet. BigQuery Omni lets organizations analyze data stored in other clouds using BigQuery without first moving it all. For the exam, the phrase 'consistent management of applications across on-premises and multiple clouds', or 'apply the same policies to Kubernetes clusters everywhere', points to GKE Enterprise. Connectivity questions point to Interconnect or VPN, and cross-cloud analytics points to BigQuery Omni."
  ],
  "analogy": "GKE Enterprise is like the head office of a restaurant franchise with locations in many cities. Each location has its own kitchen and staff, but head office publishes one recipe book and one safety rulebook, checks every location against them and sees all their sales on one dashboard. A location that drifts from the rules is spotted and corrected. Where the analogy stops working: franchise inspections are periodic, while policy as code in a fleet continuously checks and reconciles each cluster against the central repository.",
  "terms": [
   [
    "GKE Enterprise",
    "Google Cloud's platform for managing Kubernetes clusters across Google Cloud, on-premises, other clouds and edge (formerly Anthos)."
   ],
   [
    "Fleet",
    "A logical group of Kubernetes clusters managed together."
   ],
   [
    "Service mesh",
    "A layer that manages secure communication, traffic and observability between services."
   ],
   [
    "Policy as code",
    "Defining configuration and security policies in version-controlled files applied automatically."
   ],
   [
    "Hybrid cloud",
    "Using on-premises infrastructure together with public cloud."
   ],
   [
    "Multicloud",
    "Using services from more than one public cloud provider."
   ]
  ],
  "example": "A global manufacturer runs Kubernetes clusters in each factory for low-latency control systems, in Google Cloud for analytics and in another cloud acquired with a subsidiary. With GKE Enterprise, one platform team registers all clusters in a fleet and applies the same security policies from a single Git repository. When an auditor asks for evidence, the team shows that every cluster is checked against the same versioned policy files.",
  "mistakes": [
   [
    "GKE Enterprise only manages clusters running in Google Cloud.",
    "It manages fleets of Kubernetes clusters across Google Cloud, on-premises (VMware or bare metal), other public clouds and edge locations."
   ],
   [
    "Anthos and GKE Enterprise are competing products.",
    "GKE Enterprise is the evolution of what was previously called Anthos; study materials may use either name."
   ],
   [
    "Cloud VPN or Cloud Interconnect provides consistent management of applications across clouds.",
    "Those services provide network connectivity. Consistent management of clusters, policies and deployments across environments is GKE Enterprise."
   ],
   [
    "Hybrid and multicloud are always a sign of poor planning.",
    "Organizations often have valid reasons, such as regulation, latency, existing investments, acquisitions or avoiding dependence on one provider."
   ]
  ],
  "tryit": [
   [
    "A retail chain runs a small Kubernetes cluster in each of 300 stores to process payments locally if the internet connection drops, plus clusters in Google Cloud for its website. Security reviews keep finding stores with outdated configurations. Which Google Cloud capability addresses this, and how?",
    "GKE Enterprise. The chain can manage all store and cloud clusters as a fleet and apply configuration and security policies from a central Git repository, so every cluster is kept consistent automatically and drift is detected and corrected."
   ],
   [
    "A bank needs a private, high-bandwidth network link between its data center and Google Cloud for nightly data transfers. Is GKE Enterprise the answer?",
    "No. That is a connectivity need, best met by Cloud Interconnect (or Cloud VPN for encrypted connections over the internet). GKE Enterprise is for consistently managing clusters and applications across environments."
   ]
  ],
  "tip": "Consistent management, policy and security across on-premises, Google Cloud and other clouds is GKE Enterprise. The older name Anthos may still appear in study materials. Private connectivity is Interconnect or VPN; analytics on data in other clouds is BigQuery Omni.",
  "check": [
   [
    "What problem does GKE Enterprise solve?",
    "Inconsistent management across environments; it manages Kubernetes clusters and policies consistently across Google Cloud, on-premises, other clouds and edge."
   ],
   [
    "Why are containers a good foundation for hybrid and multicloud?",
    "The same container images and Kubernetes concepts run in every environment, making workloads portable."
   ],
   [
    "What is a fleet in GKE Enterprise?",
    "A logical group of Kubernetes clusters, wherever they run, that are managed together."
   ]
  ]
 },
 {
  "t": "Core security concepts: confidentiality, integrity, availability, privacy, control and compliance",
  "hook": "It is a quiet Tuesday at Summit Ridge Credit Union until three messages arrive within an hour. A member reports seeing someone else's statement in the mobile app. The fraud team notices a payment record whose amount changed overnight with no matching approval. And the branch staff cannot open the loan system at all. Then the board chair forwards an email from a regulator asking how the credit union controls where member data is stored, and whether it can prove compliance. Elena, the new security manager, has to brief the board by Friday. Three incidents and one regulator's letter look like four separate problems. Is there a common vocabulary that ties them together?",
  "simple": "Security comes down to a few simple ideas. Confidentiality means only the right people can see information, like a sealed envelope. Integrity means nobody has secretly changed it, like a receipt you can trust. Availability means you can get to it when you need it, like a shop that is open during its posted hours. These three are called the CIA triad. Privacy is about personal information and treating people fairly: what you collect about them, why and who you share it with. Control means the company decides where its data lives and who holds the keys. Compliance means following the laws and rules that apply, such as rules for health or payment card data. Following the rules does not automatically make you safe.",
  "body": [
   "Security discussions use a small set of core terms, and the Cloud Digital Leader exam expects you to recognize them in business scenarios rather than to configure technical controls. When an exam question describes an incident or a requirement, your first job is usually to name which property is at stake. Three of these terms form the classic CIA triad, confidentiality, integrity and availability, which has guided information security for decades. The other three, privacy, control and compliance, are especially prominent in cloud conversations because organizations are trusting a provider with their data.",
   "Confidentiality means information is accessible only to those authorized to see it. A leaked customer database, an exposed storage bucket that anyone on the internet can read, or an employee viewing records they have no business need to see are all confidentiality failures. Typical controls include identity and access management with least privilege, encryption of data at rest and in transit so stolen data is unreadable, and data classification so the most sensitive information gets the strongest protection.",
   "Integrity means information is accurate and complete and has not been altered without authorization. A tampered payment record, a changed configuration file or a modified software update are integrity failures, and they can be more dangerous than leaks because people keep trusting and acting on bad data. Controls include access control to limit who can change data, audit logs that record who changed what and when, checksums or hashes that reveal whether a file has changed, and digital signatures that prove who created data and that it has not been modified since.",
   "Availability means systems and data are accessible to authorized users when they need them. A distributed denial-of-service (DDoS) attack that floods a website, a regional outage, a misconfiguration that takes a service offline or ransomware that locks files are all availability failures. Controls include redundancy across zones and regions so one failure does not stop the service, regular backups stored separately, DDoS protection at the network edge and tested disaster recovery plans. A quick way to map incidents: data seen by the wrong people is confidentiality, data changed is integrity, service down or data unusable is availability. Some incidents touch more than one property; ransomware that also steals data, for example, affects availability and confidentiality.",
   "Privacy is related to confidentiality but focuses on personal information and the rights of the people it describes. It asks what personal data is collected, for what purpose, how it is used, who it is shared with, how long it is kept and what rights individuals have to see, correct or delete it. Privacy is governed by laws such as the European Union's General Data Protection Regulation (GDPR). A key exam distinction is that security is necessary for privacy but not sufficient: data can be perfectly protected from attackers and still be used in ways that break privacy rules, such as being collected without a valid reason or kept longer than allowed.",
   "Control refers to the customer's ability to decide how its data and systems are managed in the cloud. It covers where data is stored, who can access it, who holds the encryption keys and whether, and under what conditions, the provider's own staff can access it. These questions matter to regulated industries and to organizations concerned about data sovereignty. Google Cloud offers features to strengthen customer control, such as customer-managed encryption keys, choices about the locations where data is stored and Access Transparency, which provides logs of actions Google personnel take on customer content.",
   "Compliance means meeting the requirements of laws, regulations, industry standards and contracts that apply to an organization. Examples include GDPR for personal data of people in the EU, the Health Insurance Portability and Accountability Act (HIPAA) for health information in the United States, and the Payment Card Industry Data Security Standard (PCI DSS) for organizations handling card payments. Cloud providers are independently audited against many standards and publish reports and certifications that customers can use as evidence. However, under the shared responsibility model, customers are still responsible for using services in a compliant way, for example by configuring access correctly and handling data appropriately.",
   "Finally, remember that compliance is not the same as security. Standards set minimum requirements and are checked at points in time, while threats change daily. A compliant organization can still be breached, and a passed audit does not prove that every system is well protected. Treat compliance as a floor, not a finish line. On the exam, when an answer claims that achieving a certification guarantees security, be suspicious."
  ],
  "analogy": "Think of a bank's safe deposit boxes. Confidentiality is the lock: only the box owner can open it. Integrity is a tamper-evident seal showing nobody has altered the contents. Availability is the branch being open when you need your documents. Privacy is the bank's promise about what it records about you and who it tells. Control is who holds the keys and whether bank staff may ever open the box. Compliance is the bank passing its regulator's inspection. The analogy stops working at compliance: passing an inspection does not mean the vault cannot be broken into.",
  "mnemonic": "CIA: Confidentiality (who can see it), Integrity (has it been changed), Availability (can we use it now).",
  "terms": [
   [
    "Confidentiality",
    "Ensuring information is only accessible to authorized people."
   ],
   [
    "Integrity",
    "Ensuring information is accurate and not altered without authorization."
   ],
   [
    "Availability",
    "Ensuring systems and data are accessible when needed."
   ],
   [
    "Privacy",
    "The appropriate collection, use and sharing of personal information and the rights of the people it describes."
   ],
   [
    "Control",
    "The customer's ability to decide where data is stored, who can access it and who holds the encryption keys."
   ],
   [
    "Compliance",
    "Meeting the requirements of laws, regulations, standards and contracts."
   ]
  ],
  "example": "A payment processor encrypts card data and limits access (confidentiality), logs and signs every transaction record (integrity), runs across multiple zones with DDoS protection (availability), publishes a clear notice on how customer data is used and deletes it on schedule (privacy), manages its own encryption keys and chooses where data is stored (control), and undergoes a yearly PCI DSS assessment (compliance).",
  "mistakes": [
   [
    "Ransomware is mainly a confidentiality problem.",
    "Ransomware that encrypts files mainly affects availability, because staff cannot use the data. It also affects confidentiality only if data is stolen as well."
   ],
   [
    "Privacy and security mean the same thing.",
    "Security protects data from unauthorized access or change; privacy concerns how personal data is collected, used and shared and the rights of the people it describes. Secure data can still be misused."
   ],
   [
    "Being compliant means being secure.",
    "Compliance sets minimum requirements checked at a point in time. A compliant organization can still be breached."
   ],
   [
    "Because the cloud provider is certified, the customer is automatically compliant.",
    "Provider certifications cover the provider's responsibilities. Customers must still configure and use services in a compliant way under the shared responsibility model."
   ]
  ],
  "tryit": [
   [
    "An online clinic's appointment database is protected by strong encryption and access controls, and there have been no breaches. However, the clinic has been selling patients' appointment histories to an advertising partner without telling them. Which concept is violated, and why might security controls not catch it?",
    "Privacy. The data is secure from attackers, but it is being used and shared in ways patients did not agree to and that privacy laws may forbid. Security controls protect against unauthorized access, not against authorized misuse, which is why privacy is a separate concern."
   ],
   [
    "A bank's regulator requires that the bank, not its cloud provider, holds the encryption keys for customer data, and that the bank can see when provider staff access its content. Which concept is this requirement mainly about, and which Google Cloud features help?",
    "Control. Customer-managed encryption keys let the bank hold and manage its keys, and Access Transparency provides logs of actions Google personnel take on its content."
   ]
  ],
  "tip": "Map the incident to the property: data seen by the wrong people is confidentiality, data changed is integrity, service down is availability. Personal data use is privacy, who decides and holds keys is control, and meeting rules is compliance. Being compliant does not mean being secure.",
  "check": [
   [
    "Ransomware encrypts a company's files so staff cannot use them. Which CIA property is mainly affected?",
    "Availability (and possibly confidentiality if data was also stolen)."
   ],
   [
    "How does privacy differ from security?",
    "Privacy concerns how personal data is collected and used and people's rights over it; security protects data from unauthorized access or change."
   ],
   [
    "Why is compliance not the same as security?",
    "Compliance meets minimum requirements checked at a point in time; threats change constantly, so a compliant organization can still be breached."
   ]
  ]
 },
 {
  "t": "Cloud security vs on-premises security, and shared responsibility for security",
  "hook": "It is your second week as IT manager at Juniper Lane Home Goods, and the board's risk committee has one question before approving the move to Google Cloud. Dana, the committee chair, slides a printed list across the table: badge readers, camera footage, firmware patches, firewall changes, user accounts, backups. 'Today our team does all of this,' she says. 'After the move, who does each one? If something goes wrong in a year, I need to know whose job it was.' Your team is small, and half the list has been quietly neglected for years. Does the cloud take all of this off your plate, some of it, or none of it?",
  "simple": "When a company runs its own computers, it has to protect everything itself: the building, the machines, the network, the software, the user accounts and the data. In the cloud, the work is split. Google protects the buildings, the hardware and the big network underneath. The customer still protects its own data, decides who can log in, and sets up the services safely. Think of renting a flat in a well-guarded building. The landlord handles the front door, the guards and the cameras. You still lock your own flat, decide who gets a key and do not leave your valuables on the balcony. How much you handle depends on what you rent: an empty flat needs more of your own effort than a fully serviced apartment.",
  "body": [
   "Security on-premises means owning every layer. In a traditional data center, the organization is responsible for guarding the building, securing the hardware and its supply chain, patching firmware and operating systems, protecting the network, managing identities and protecting the data. Each of those layers needs budget, tools and specialist staff, and a gap in any one of them can undo the others. Many organizations, especially smaller ones, simply do not have the people to do all of this well, so some layers end up underfunded or forgotten.",
   "In the cloud, security becomes a shared responsibility. Google secures the infrastructure that every customer runs on: the physical data centers, the custom-designed hardware, the global network, the storage systems and the virtualization layer that separates one customer from another. This work is backed by very large investments and dedicated security teams, and by the advantage of scale, since threats seen against one part of the platform can be detected and blocked for everyone. For many organizations, the result is a foundation that is more secure than anything they could build and run themselves.",
   "The customer's share never drops to zero. In every service model, the customer is responsible for its data, its identities and access, and the configuration of the services it uses. How much more it manages depends on the model. On Compute Engine, which is infrastructure as a service (IaaS), the customer also secures the guest operating system (OS), installs patches, protects its applications and writes its own firewall rules. On platform as a service (PaaS) and serverless offerings such as Cloud Run, Google handles the OS and runtime, so the customer focuses on its code, data and access settings. On software as a service (SaaS), such as Google Workspace, the customer mainly manages users, sharing settings and the data itself. A useful exam habit is to ask: in this model, who installs the patches? That answer usually tells you where the line sits.",
   "The cloud also changes how security work gets done. Teams can create resources in minutes, often many times a day, so security cannot depend only on manual review of each change; it must be automated with policies and guardrails. Identity becomes the main perimeter, because services are reached over the internet rather than only from inside an office network, so verifying who is making each request matters more than which network it came from. Configuration errors, such as a storage bucket accidentally made public or a user granted far more permissions than needed, become one of the most common causes of incidents. These are customer-side mistakes, and the provider's strong infrastructure cannot prevent them on its own.",
   "There are real advantages on the customer side too. The cloud offers central logging across every project, consistent policies that can be applied to a whole organization from the top of the resource hierarchy, encryption that is on by default, and security tools that would be expensive or impossible to build on-premises. A security team that used to spend its time replacing failed disks and checking door logs can redirect that effort to access reviews, secure configurations, monitoring and training developers. In practice this looks different day to day: instead of walking the server room, an analyst reviews a weekly list of identity and access management (IAM) grants, checks an organization policy that blocks public buckets, and follows up on findings flagged overnight. The work becomes less about guarding equipment and more about guarding decisions, such as who may change what and whether each change follows agreed standards.",
   "Google Cloud describes its approach as shared fate, which goes beyond a simple division of duties. Under shared fate, Google actively helps customers secure their part: it ships secure-by-default settings, publishes security blueprints and best-practice recommendations, and offers tools such as Security Command Center that point out risks in a customer's own configuration, such as public buckets or open firewall ports. The responsibility split still exists, but the provider takes an active interest in whether the customer's workloads end up secure, not only in whether its own infrastructure is.",
   "For the Cloud Digital Leader exam, keep three ideas together. Moving to the cloud shifts infrastructure security to Google. Data, identities, access and configuration stay with the customer in every model. And the cloud changes the style of security work toward automation, identity and configuration management, with shared fate tools to help."
  ],
  "analogy": "Shared responsibility is like renting a unit in a secure storage facility. The facility owner builds the walls, staffs the gate, runs the cameras and maintains the alarm system. You choose the lock for your unit, decide who gets a copy of the key and choose what you store there. If you leave your unit unlocked, the guards at the gate cannot save you. The analogy stops working in one way: in the cloud, how much you handle changes with the service model, from a bare unit (IaaS) to a fully managed one (SaaS).",
  "terms": [
   [
    "Shared responsibility",
    "The division of security duties between the cloud provider and the customer, which shifts with the service model."
   ],
   [
    "Shared fate",
    "Google Cloud's approach of actively helping customers secure their workloads with secure defaults, blueprints, recommendations and tools."
   ],
   [
    "Attack surface",
    "All the points where an attacker could try to get into a system."
   ],
   [
    "Identity perimeter",
    "Treating identity and access checks, rather than the network edge, as the main security boundary."
   ],
   [
    "Guest operating system",
    "The OS running inside a customer's virtual machine, which the customer patches and secures on IaaS."
   ]
  ],
  "example": "A retailer moving from its own data center no longer manages locks, cameras and hardware firmware, because Google handles those. Its security team now focuses on IAM, secure configurations, monitoring with Security Command Center and training developers, which reduces its overall risk.",
  "mistakes": [
   [
    "Moving to the cloud makes the provider responsible for all security.",
    "Google secures the infrastructure, but the customer always remains responsible for its data, identities, access and configuration."
   ],
   [
    "The customer's responsibilities are the same in every service model.",
    "They shrink as you move from IaaS to PaaS to SaaS. On Compute Engine the customer patches the guest OS; on serverless and SaaS, Google does."
   ],
   [
    "Cloud security is weaker because the data is outside the building.",
    "Google's infrastructure security often exceeds what an organization could build itself. Most cloud incidents come from customer-side misconfiguration and stolen credentials, not from the provider's infrastructure."
   ],
   [
    "Shared fate means Google takes on the customer's responsibilities.",
    "Shared fate means Google actively helps with defaults, guidance and tools; the customer still owns its part of the split."
   ]
  ],
  "tryit": [
   [
    "Marcus runs a small online shop. Option A is to run his web app on Compute Engine VMs. Option B is to deploy it on Cloud Run. His team has no one experienced with patching operating systems. Which option reduces his security workload, and what stays his job either way?",
    "Cloud Run, because Google manages the OS and runtime, so there is no guest OS for his team to patch. In both options he still owns his code, his data, who has access and how the services are configured."
   ]
  ],
  "tip": "Moving to the cloud shifts infrastructure security to Google, but data, identities, access and configuration stay with the customer in every model.",
  "check": [
   [
    "Name two security tasks Google handles that an on-premises organization must do itself.",
    "Physical data center security, hardware and supply chain security, and securing the network and virtualization layers (any two)."
   ],
   [
    "Why does identity become more important in the cloud?",
    "Services are reached over the internet from anywhere, so verifying who is making each request becomes the main line of defense."
   ],
   [
    "On Compute Engine, who patches the guest operating system?",
    "The customer. On IaaS the customer secures the guest OS, applications and firewall rules, while Google secures the underlying infrastructure."
   ]
  ]
 },
 {
  "t": "Common cloud threats: misconfiguration, compromised credentials, phishing, malware and ransomware",
  "hook": "At 6:40 on a Saturday morning, the finance lead at Brightwater Clinics forwards you an alert: the cloud bill for the past twelve hours is already larger than last month's total. You open the console and find dozens of large virtual machines you have never seen, all running at full CPU in a region your company does not use. Nobody on the team admits to creating them. Then a developer messages you, embarrassed: on Thursday he pushed some code to a public repository, and he is not sure whether a key file went with it. Was this a sophisticated attack on the cloud provider, or something much more ordinary?",
  "simple": "Most cloud problems are not clever hackers breaking into Google. They are everyday mistakes and tricks on the customer's side. Sometimes a setting is wrong, like a storage folder left open to the whole internet. Sometimes someone steals a password or a secret key and logs in as a real user. Sometimes a fake email tricks a person into typing their password into a copycat page. And sometimes harmful software gets in; one kind, ransomware, locks up all your files and demands money to unlock them. It is like a house: burglars rarely tunnel through the foundations. They walk through an unlocked door, use a copied key, or talk their way in by pretending to be the plumber.",
  "body": [
   "Knowing the common threats helps leaders invest in the right controls. Many cloud incidents are not caused by sophisticated attacks on the provider's infrastructure but by weaknesses on the customer's side of the shared responsibility line: settings, credentials and people. That is good news in one sense, because these are areas the customer can control directly, often with inexpensive changes.",
   "Misconfiguration is one of the leading causes of cloud data exposure. Examples include storage buckets made publicly readable by mistake, databases reachable from the whole internet, firewall rules that allow traffic from all addresses, logging turned off so nobody can investigate later, and users or service accounts with far more permissions than they need. Because cloud resources are so easy to create, a mistaken setting can be copied into many projects quickly, for example through a shared template. Defenses include secure defaults, organization policies that block risky settings outright (such as preventing public access to buckets), infrastructure as code with peer review so changes are checked before they go live, and tools such as Security Command Center that continuously scan for misconfigurations and flag them.",
   "Compromised credentials occur when attackers obtain passwords, application programming interface (API) keys or service account keys. Common routes include people reusing a password that leaked from another website, and keys accidentally published in public code repositories, where automated tools search for them within minutes. With valid credentials, attackers look like legitimate users, so traditional perimeter defenses do not stop them. A typical sign is unusual activity, such as resources created in an unfamiliar region or at odd hours, often for cryptocurrency mining. Defenses include strong multi-factor authentication (MFA), avoiding long-lived keys in favor of keyless or short-lived credentials, least privilege so a stolen identity can do little, and monitoring and alerting on unusual behavior.",
   "Phishing tricks people into revealing credentials or running malicious software. It usually arrives as an email or message that impersonates a trusted person or service, such as a fake sign-in page, a bogus invoice or an urgent request from an executive. Phishing targets people rather than technology, so even a well-configured environment is at risk. Phishing-resistant two-step verification, such as physical security keys that only work with the genuine site, is one of the most effective defenses, because a stolen password alone is not enough. Awareness training helps staff recognize and report suspicious messages, and email filtering stops many attempts before they reach inboxes.",
   "Malware is malicious software, such as viruses, trojans and spyware, that damages systems, steals data or gives attackers a foothold. Ransomware is malware that encrypts an organization's data and demands payment to restore it, and attackers increasingly also threaten to publish stolen data, which is sometimes called double extortion. Ransomware often starts with phishing or stolen credentials, then spreads using excessive privileges. Defenses include patching, limiting privileges, protecting endpoints, filtering email and, crucially, keeping backups that attackers cannot alter or delete. With protected backups, the organization can restore its data without paying, which removes much of the attacker's leverage.",
   "Other threats appear on the exam too. Denial-of-service attacks try to overwhelm a service with traffic so real users cannot reach it. Insider threats come from employees or contractors who misuse the access they legitimately have, whether deliberately or carelessly. Software supply chain attacks compromise a library, tool or update that many organizations trust, so the malicious code arrives through a normal channel. Because no single control stops all of these, organizations rely on defense in depth, covered in the next lesson, so that if one layer fails, others still protect the data.",
   "Seen together, these threats share a pattern. Attackers prefer the easiest path, and in the cloud that path usually runs through people and settings rather than through the provider's hardened infrastructure. A single phishing email can yield credentials; those credentials can reach a misconfigured, over-permissioned project; and from there malware or ransomware can spread. Each control you add, such as stronger sign-in, narrower permissions or protected backups, breaks one link in that chain, which is why leaders should fund several modest controls rather than one expensive tool.",
   "When an exam scenario describes a breach, look first for the customer-side cause. A public bucket points to misconfiguration and secure defaults or organization policies. A leaked key points to credential hygiene and keyless authentication. A user tricked by an email points to phishing-resistant two-step verification (2SV) and training. Locked files and a ransom note point to protected backups."
  ],
  "analogy": "Think of cloud threats like risks to a well-built apartment tower. The building itself is solid, but residents still get hurt by leaving doors unlocked (misconfiguration), by losing a key that someone copies (compromised credentials), by letting in a stranger in a fake delivery uniform (phishing), and by a thief who changes the locks and charges to let them back in (ransomware). A spare key kept safely with a friend is the backup. The analogy stops at scale: in the cloud, one unlocked door can be found by automated scanners within minutes.",
  "terms": [
   [
    "Misconfiguration",
    "An insecure setting, such as public access or overly broad permissions, often made by mistake."
   ],
   [
    "Phishing",
    "Deceptive messages designed to trick people into revealing credentials or running malware."
   ],
   [
    "Ransomware",
    "Malware that encrypts data and demands payment to restore access, sometimes also threatening to leak it."
   ],
   [
    "Compromised credentials",
    "Passwords, keys or tokens obtained by an attacker and used to impersonate a legitimate user."
   ],
   [
    "Insider threat",
    "Risk from people with legitimate access who misuse it, deliberately or by accident."
   ]
  ],
  "example": "A developer accidentally commits a service account key to a public code repository. Within hours, attackers use it to create VMs for cryptocurrency mining. The company revokes the key, switches to keyless authentication for its pipeline, and enables alerts on unusual resource creation.",
  "mistakes": [
   [
    "Most cloud breaches come from attackers breaking the provider's infrastructure.",
    "Most trace back to customer-side issues such as misconfiguration, stolen credentials and phishing."
   ],
   [
    "A strong password is enough to stop phishing.",
    "Phishing steals the password itself. Phishing-resistant 2SV, such as security keys, means a stolen password is not enough."
   ],
   [
    "Paying the ransom is the reliable way to recover from ransomware.",
    "Payment does not guarantee recovery. Backups that attackers cannot alter or delete let you restore without paying."
   ],
   [
    "Antivirus software alone protects against ransomware.",
    "Ransomware is usually stopped by layers: patching, least privilege, email filtering, endpoint protection and protected backups."
   ]
  ],
  "tryit": [
   [
    "At Orchid Logistics, a security scan finds that a Cloud Storage bucket holding shipping manifests has been readable by anyone on the internet for three weeks. The bucket was created from a template that several teams reuse. Which threat category is this, and what organization-wide fix stops it happening again?",
    "This is misconfiguration. Beyond fixing this bucket and the template, an organization policy that prevents public access to buckets stops anyone from repeating the mistake, and Security Command Center can flag any similar settings."
   ],
   [
    "An accounts clerk receives an email that looks like it comes from the chief executive, asking her to sign in to a shared document link urgently. The sign-in page looks normal. What single control would most reduce the damage if she enters her password?",
    "Phishing-resistant two-step verification, such as a security key. A security key only works with the genuine site, so the attacker cannot use the captured password alone."
   ]
  ],
  "tip": "Most cloud breaches trace back to customer-side issues: misconfiguration and stolen credentials. The strongest defenses are secure configuration, least privilege and phishing-resistant multi-factor authentication.",
  "check": [
   [
    "What is the most effective defense against losing data to ransomware?",
    "Protected backups that attackers cannot change or delete, allowing restore without paying, along with patching and least privilege."
   ],
   [
    "Give two examples of cloud misconfiguration.",
    "A publicly readable storage bucket, a database open to the internet, firewall rules allowing all addresses, or excessive permissions (any two)."
   ],
   [
    "Why are leaked service account keys so dangerous?",
    "With valid credentials, the attacker looks like a legitimate user, so they can act with that account's permissions until the key is revoked."
   ]
  ]
 },
 {
  "t": "Zero trust and defense in depth",
  "hook": "Theo, a project manager at Westfield Engineering, clicks a link in what looks like a shipping notice and unknowingly installs malware on his laptop. He is sitting in the office, plugged into the corporate network. Under the company's old setup, that is all an attacker needs: once inside the firewall, the laptop can reach the file servers, the finance app and the HR database, because anything on the inside is trusted. The security lead, Amara, has been arguing for months that the network should stop trusting anyone by default. Tonight, as the alerts begin, the question is simple: how far can this one compromised laptop get?",
  "simple": "Old-style security worked like a castle with a moat. Once you were inside the walls, you could go almost anywhere. Zero trust says: do not trust anyone just because they are inside. Check every person, every device and every request, every time, and give them only what they need. Defense in depth adds a second idea: use several layers of protection, so if one fails, the next one still holds. Picture a hospital. Having a badge gets you into the building, but you still need a separate code for the pharmacy, a nurse checks your name before giving medicine, and cameras record who went where. No single check has to be perfect, because there are many of them.",
  "body": [
   "Traditional security used a castle-and-moat model. A strong perimeter firewall protected the corporate network, and anything inside was trusted. That model fits poorly today for three reasons. People work from home and on the move, so many users are never inside the perimeter. Applications run in the cloud and are reached over the internet, so the important resources are not inside it either. And an attacker who does get inside, for example through a phished laptop or a stolen virtual private network (VPN) password, can move around freely, a pattern called lateral movement.",
   "Zero trust is a security model that removes implicit trust based on network location. Its motto is 'never trust, always verify'. Every request to access an application or data is authenticated and authorized based on who the user is, the security state of their device and the context of the request, such as location and time. This applies whether the request comes from the office network or a coffee shop; being on the corporate network earns no special treatment. Access is granted with least privilege, only for the specific resource requested, and it is continuously evaluated, so a change such as a device falling out of date can lead to access being reduced or refused.",
   "In practice, a zero trust access decision looks something like this. A user opens an internal application. Before the request reaches the app, an access proxy checks: Is this a known user who signed in with strong two-step verification (2SV)? Is the laptop company-managed, encrypted and running a current operating system (OS)? Does the user's role allow access to this specific application? Is the request coming from an expected country? If every answer satisfies the policy, the request passes; if not, it is blocked, even if the password was correct. The decision is made per request and per application, rather than once at the network door.",
   "Google adopted this approach internally after a sophisticated attack in 2009, and called its implementation BeyondCorp. Google employees access internal applications without a traditional VPN; access decisions depend on user identity and device state rather than on which network they are connected to. Google Cloud offers these ideas to customers. Identity-Aware Proxy (IAP) checks identity and context before allowing access to applications and virtual machines (VMs), so administrators can, for example, allow Secure Shell (SSH) connections to a VM only through IAP instead of opening it to the internet. Chrome Enterprise Premium, previously called BeyondCorp Enterprise, extends zero trust access and threat protection to users working through the Chrome browser.",
   "Defense in depth is a complementary principle: use multiple layers of independent security controls so that if one fails, others still protect the asset. Layers in Google Cloud might include strong identity and 2SV, Identity and Access Management (IAM) with least privilege, organization policies that block risky settings, network firewalls and Cloud Armor at the edge, encryption at rest and in transit, VPC Service Controls around sensitive data, logging and threat detection, and backups for recovery. The key word is independent: two layers that fail for the same reason, such as two checks that both rely on the same stolen password, offer less protection than they appear to.",
   "Walking through the layers shows why they matter. An attacker who steals a password still faces 2SV. One who somehow bypasses a firewall still lacks IAM permissions to the data. One who reaches the data still finds it encrypted and cannot copy it outside a service perimeter, and their actions are recorded in audit logs where threat detection can spot them. Even if all of that fails, protected backups let the organization recover. Each layer buys time and reduces damage. Return to the phished laptop: under zero trust with layered controls, that laptop would fail the device check, its user would still need a second factor, and any unusual access attempt would appear in the logs.",
   "Together, zero trust and defense in depth replace the idea of one strong wall with continuous verification and layered protection. They are not products you buy once, but principles that guide how many controls fit together. On the exam, a scenario that describes trusting everything inside the network is describing the old perimeter model; answers that verify every request by identity, device and context point to zero trust; and answers that add several independent controls point to defense in depth."
  ],
  "analogy": "Zero trust is like a modern office building where your badge must be tapped at every door, not just the front entrance, and each tap checks whether you are allowed into that particular room right now. Defense in depth is the building also having locked cabinets, cameras and a safe, so getting past one door is not enough. Where the analogy stops: zero trust also checks the device you carry, as if the badge reader refused you because your phone was out of date.",
  "terms": [
   [
    "Zero trust",
    "A model that grants no implicit trust based on network location and verifies every request using identity, device and context."
   ],
   [
    "BeyondCorp",
    "Google's implementation of zero trust, allowing access based on user and device rather than network."
   ],
   [
    "Defense in depth",
    "Layering multiple independent security controls so one failure does not expose the system."
   ],
   [
    "Identity-Aware Proxy (IAP)",
    "A Google Cloud service that checks identity and context before granting access to applications and VMs."
   ],
   [
    "Lateral movement",
    "An attacker moving from one compromised system to others inside a network."
   ]
  ],
  "example": "A consulting firm stops requiring a VPN for its internal apps. Each request passes through Identity-Aware Proxy, which checks the employee's identity, 2SV and whether the laptop is company-managed and up to date. A contractor's personal device is refused even with a valid password.",
  "mistakes": [
   [
    "Zero trust means trusting no one, so nobody gets access.",
    "It means no implicit trust. Access is still granted, but only after verifying identity, device and context for each request, with least privilege."
   ],
   [
    "Requests from inside the office network can be trusted.",
    "That is the castle-and-moat model zero trust replaces. Network location earns no special trust."
   ],
   [
    "Defense in depth means buying the strongest single firewall.",
    "It means several independent layers, such as identity, permissions, encryption, monitoring and backups, so no single control has to stop everything."
   ],
   [
    "Zero trust is a single product you install.",
    "It is a security model. Services such as Identity-Aware Proxy and Chrome Enterprise Premium help implement it."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Media's administrators reach production VMs over SSH, and the firewall currently allows SSH from any address because staff work from many locations. The security lead wants to apply zero trust without forcing everyone onto a VPN. What should they change?",
    "Close SSH to the internet and allow it only through Identity-Aware Proxy. IAP verifies each administrator's identity and context before allowing the connection, so access no longer depends on network location."
   ]
  ],
  "tip": "Zero trust: verify every request by identity and context, not network location. Defense in depth: several layers of controls. If a question describes 'trusting everything inside the network', it describes the old perimeter model.",
  "check": [
   [
    "What is the main idea of zero trust?",
    "No implicit trust from network location; every access request is verified using identity, device and context, with least privilege."
   ],
   [
    "Why is defense in depth valuable?",
    "If one control fails or is bypassed, other independent layers still protect the data or system."
   ],
   [
    "What is BeyondCorp?",
    "Google's internal zero trust implementation, which lets employees access applications based on identity and device state without a traditional VPN."
   ]
  ]
 },
 {
  "t": "Google's secure infrastructure: data centers, custom hardware, Titan chips and the private network",
  "hook": "The external auditor at Meridian Savings Bank, a careful man named Mr. Okafor, has one more item on his checklist before signing off on the bank's cloud plan. 'You have described your own controls well,' he says. 'Now tell me about the provider's. Who can walk into the building where your customer data lives? How do you know the servers haven't been tampered with? What happens to a hard drive when it fails?' Your team has spent months on IAM and network design, but nobody has prepared an answer about concrete, steel and silicon. How can you vouch for a building you will never see?",
  "simple": "Google Cloud runs on the same computers and buildings that Google uses for its own services, and Google protects them in layers. The buildings have fences, guards, cameras and badge and fingerprint checks, and only a few approved people can enter the most sensitive rooms. Google designs much of its own equipment, including a special security chip called Titan that checks a computer has not been tampered with each time it starts, a bit like a seal on a medicine bottle that shows nobody opened it. Data traveling between Google's buildings is scrambled so outsiders cannot read it, and much of it travels on Google's own private cables. Old hard drives are wiped or physically destroyed before they leave.",
  "body": [
   "Google Cloud runs on the same infrastructure that Google uses for its own services, which serve billions of users. Google designs security into every layer of this infrastructure, from the physical buildings up to the services running on them, and publishes an overview of the design so customers and auditors can understand it. The Cloud Digital Leader exam does not expect engineering detail, but it does expect you to know the main layers at a high level and to explain why they give customers a strong starting point.",
   "Physical security is the first layer. Google's data centers use multiple overlapping protections, such as perimeter fencing, security guards, vehicle barriers, cameras, access badges and biometric checks. Access is restricted so that only a small number of approved staff can enter sensitive areas such as server floors, and that access is logged. The handling of storage media is a frequent exam point: hard drives that fail or reach the end of their life are securely erased or physically destroyed before they leave the site, so customer data does not walk out of the building on a discarded disk.",
   "Hardware and boot security come next. Google designs its own servers, network equipment and some chips rather than relying only on off-the-shelf products. This gives it control over what goes into each machine and reduces the risk of hidden components being introduced in the supply chain. Titan is a Google-designed security chip that establishes a hardware root of trust: a trusted starting point, built into the hardware, that verifies a machine boots with legitimate, unmodified firmware and software. If something in the boot chain has been altered, the check fails and the machine is not trusted to run workloads. This protects against tampering in the supply chain or at boot time, attacks that software controls alone struggle to detect.",
   "Customers can bring similar ideas to their own virtual machines (VMs). Shielded VMs on Compute Engine use features such as secure boot, which only allows signed, trusted boot software to run, and integrity monitoring, which compares each boot against a known good baseline and reports changes. This helps protect a customer's VMs against rootkits and boot-level malware, extending the hardware root-of-trust idea into the virtual world.",
   "Service and network security protect data as it moves. Services within Google's infrastructure authenticate to each other cryptographically, so one service cannot simply pretend to be another, and traffic is encrypted in transit between Google's facilities. Google operates one of the largest private networks in the world, including its own fiber and subsea cables, and customer traffic travels on this network for much of its journey rather than across the public internet. At the edge, the sheer scale of Google's network helps absorb large distributed denial-of-service (DDoS) attacks, capacity that most organizations could never afford on their own.",
   "Operational security covers the people and processes. Google employs large teams of security and privacy engineers, runs continuous threat detection across its infrastructure, and strictly limits and logs employee access to production systems, so access requires a business justification and leaves a record. It also runs a vulnerability rewards program that pays outside researchers for responsibly reporting flaws, which brings many more skilled eyes to the problem of finding weaknesses before attackers do.",
   "Storage security completes the picture: customer data is encrypted at rest by default, as covered in the next lesson. Together, these layers mean customers start from a strong, independently audited foundation that they inherit simply by using the platform. They do not remove the customer's own responsibilities, though. A perfectly protected data center does not help if a customer makes a bucket public or grants an attacker's account broad permissions.",
   "This is also where infrastructure security connects to compliance. Because customers cannot visit the data centers themselves, they rely on independent third-party audits that examine these physical, hardware and operational controls and publish reports and certifications, which a later lesson covers. When an auditor like the one in the opening scene asks who can enter the building or what happens to a failed disk, the customer answers by pointing to Google's published security design and to those audit reports, and then by explaining its own controls on top."
  ],
  "analogy": "Google's infrastructure security is like a bank vault built inside a guarded bank. Guards, cameras and badge checks control the building; the vault door is engineered in-house rather than bought from a catalog; a tamper seal on each safe-deposit box (the Titan chip) shows whether anyone has interfered; and armored cars on private roads move valuables between branches. Where it stops: you still choose who holds the key to your box, which is the customer's job in the cloud.",
  "terms": [
   [
    "Titan chip",
    "A Google-designed security chip that verifies machines boot with trusted firmware and software."
   ],
   [
    "Hardware root of trust",
    "A trusted hardware component that verifies the integrity of the system from start-up."
   ],
   [
    "Shielded VM",
    "A Compute Engine VM with secure boot and integrity monitoring against boot-level tampering."
   ],
   [
    "Defense at scale",
    "Using the size of Google's network and security operations to detect and absorb attacks."
   ],
   [
    "Vulnerability rewards program",
    "A program that pays outside researchers for responsibly reporting security flaws."
   ]
  ],
  "example": "A regulator asks a bank how its cloud provider protects hardware from tampering. The bank explains that Google designs its own servers with Titan chips that verify firmware at boot, controls data center access with several layers of physical security, and destroys retired drives on site.",
  "mistakes": [
   [
    "Titan encrypts customer data.",
    "Titan is a hardware root of trust that verifies machines boot with legitimate, unmodified firmware and software. Encryption at rest is a separate default protection."
   ],
   [
    "Failed drives are returned to the manufacturer for repair.",
    "Google securely erases or physically destroys failed and retired drives before they leave the data center."
   ],
   [
    "Because Google's infrastructure is secure, the customer's workloads are automatically secure.",
    "Customers inherit a strong foundation but must still secure their own data, access and configuration."
   ],
   [
    "Customer traffic always crosses the public internet between Google locations.",
    "Much of it travels on Google's private global network, encrypted and authenticated between facilities."
   ]
  ],
  "tryit": [
   [
    "Silvercrest Insurance runs Compute Engine VMs for claims processing. Its risk team worries about malware that hides in the boot process where antivirus tools cannot see it. Which Compute Engine feature should the team turn on, and how does it relate to Google's own hardware protections?",
    "Shielded VMs, which provide secure boot and integrity monitoring. They bring to the customer's VMs the same idea that Titan provides for Google's physical machines: verifying that the system starts with trusted, unmodified software."
   ]
  ],
  "tip": "Know the layers: physical data center security, custom hardware with Titan chips, encrypted and authenticated service communication, a private global network, and strict operational controls. Customers inherit all of these.",
  "check": [
   [
    "What does the Titan chip do?",
    "It acts as a hardware root of trust, verifying that a machine boots with legitimate, unmodified firmware and software."
   ],
   [
    "How does Google handle failed or retired storage drives?",
    "It securely erases them or physically destroys them before they leave the data center."
   ],
   [
    "How does the size of Google's network help with security?",
    "Its scale and edge capacity help absorb large denial-of-service attacks, and traffic can travel on Google's private network rather than the public internet."
   ]
  ]
 },
 {
  "t": "Encryption at rest and in transit, and key management with Cloud KMS",
  "hook": "The compliance manager at Tidewater Mutual, Rosa, has just returned from a meeting with the firm's regulator, and she has one sentence underlined in her notes: 'The firm must be able to revoke access to its data at any time, including from its service providers.' The engineering team assures her that everything in Google Cloud is already encrypted. Rosa is not satisfied. 'Encrypted with whose key?' she asks. 'If the provider holds the key, can we really say we control access?' The team realizes they have never had to think about who owns the keys. What options do they have, and what do they give up for more control?",
  "simple": "Encryption scrambles information so it looks like nonsense to anyone without the right key. Google Cloud does this automatically in two places: when data is stored (at rest) and when it travels across networks (in transit). By default, Google creates and looks after the keys for you, and you do not need to do anything. Some organizations want to hold the keys themselves, so they can switch them off if they choose. Think of a safe-deposit box. Normally the bank keeps a master key for you. If you insist on keeping your own key, nobody can open the box without you, but if you lose that key, the bank cannot help you get your things back.",
  "body": [
   "Encryption transforms readable data, called plaintext, into ciphertext that can only be read with the right key. It protects confidentiality even if storage media or network traffic are accessed by someone unauthorized: a stolen disk or an intercepted message is useless without the key. Google Cloud applies encryption by default in two states, at rest and in transit, and offers several options for who controls the keys.",
   "Encryption at rest protects stored data. All customer data stored in Google Cloud is encrypted at rest by default, with no action needed from the customer, using strong encryption based on the Advanced Encryption Standard with 256-bit keys (AES-256). There is no switch to turn on and no extra charge for this default. Under the surface, data is split into chunks, and each chunk is encrypted with its own data encryption key (DEK). Those DEKs are themselves encrypted, or wrapped, by key encryption keys (KEKs) that are stored and managed in Google's key management systems. This layered approach is called envelope encryption. It means a single compromised chunk key exposes very little, and it allows keys to be rotated without re-encrypting every byte of data.",
   "Encryption in transit protects data moving across networks. Google encrypts and authenticates data in transit between its data centers and at various layers within them. Google services use Transport Layer Security (TLS) for connections from users and applications, which is what makes a browser show a secure connection. Customers still have a role here: they should serve their own applications over HTTPS, which is the Hypertext Transfer Protocol (HTTP) protected by TLS, and use encrypted connections such as Cloud VPN, a virtual private network (VPN) service, for traffic between on-premises networks and Google Cloud. For private, high-bandwidth links such as Cloud Interconnect, customers can add their own encryption where policy requires it.",
   "Some organizations need more control over the keys, because of regulation, contracts or internal policy. Google Cloud offers a spectrum of options. Google-managed keys are the default: Google creates, stores, rotates and protects the keys, and the customer does nothing. Customer-managed encryption keys (CMEK) are keys the customer creates and manages in Cloud Key Management Service (Cloud KMS) and then tells services such as Cloud Storage, BigQuery or Compute Engine to use. With CMEK, the customer controls rotation schedules and who may use the keys through identity and access management (IAM), and can disable or destroy a key, which makes the data protected by it unreadable. Keys can be protected in hardware security modules (HSMs), tamper-resistant devices for key storage, using Cloud HSM. With Cloud External Key Manager (Cloud EKM), keys are held in a key management system outside Google, operated by the customer or a partner, so the customer can refuse a request to use the key and Google cannot decrypt the data. Customer-supplied encryption keys (CSEK), where the customer provides the key itself with each request, are supported by some services such as Cloud Storage and Compute Engine.",
   "A simple way to remember the spectrum is to ask where the key lives and who manages it. Default: Google manages a key inside Google. CMEK: the customer manages a key that lives in Cloud KMS inside Google. EKM: the customer manages a key that lives outside Google. CSEK: the customer supplies the key with each request. Control increases along that path, and so does the customer's operational work.",
   "More control brings more responsibility. If a customer destroys or loses its key, Google cannot recover the data, because the whole point is that Google cannot decrypt it without that key. An accidentally disabled external key can also make applications fail until it is restored. For these reasons most organizations use the default for most data and choose CMEK or external keys for specific datasets with compliance needs. Cloud KMS also records key use in audit logs, which helps prove to auditors when and by whom keys were used, and supports automatic rotation schedules so keys are replaced regularly.",
   "For the exam, connect the clues. A question that only asks whether data is encrypted points to the default: it already is, at rest and in transit. A question that stresses customer control over rotation, disabling or destroying keys points to CMEK in Cloud KMS. A question that requires keys to be held outside Google entirely points to Cloud EKM."
  ],
  "analogy": "Key management is like the keys to a row of storage lockers. By default the facility holds the keys and opens the lockers for you when you ask (Google-managed). With CMEK, you keep the keys in a key cabinet the facility provides, and you decide who can borrow them and when to change the locks. With EKM, the keys never enter the facility at all; they stay in your own house. Where it stops: in the cloud, destroying the key is a deliberate way to make data unreadable, which has no tidy equivalent in a real locker.",
  "terms": [
   [
    "Encryption at rest",
    "Encrypting stored data; on by default for all customer data in Google Cloud."
   ],
   [
    "Encryption in transit",
    "Encrypting data as it moves across networks, for example with TLS."
   ],
   [
    "Envelope encryption",
    "Encrypting data with data encryption keys, which are themselves encrypted by key encryption keys."
   ],
   [
    "CMEK",
    "Customer-managed encryption keys: keys the customer creates and controls in Cloud KMS."
   ],
   [
    "Cloud KMS",
    "Google Cloud's service for creating, managing, rotating and using cryptographic keys."
   ],
   [
    "Cloud External Key Manager (EKM)",
    "An option that keeps encryption keys in a key management system outside Google Cloud."
   ]
  ],
  "example": "A financial firm's policy requires that it can revoke access to its data at any time. It creates keys in Cloud KMS with a 90-day rotation schedule and uses them as CMEK for its BigQuery datasets and Cloud Storage buckets. Disabling a key would make that data unreadable, even to services processing it.",
  "mistakes": [
   [
    "Customers must enable encryption at rest in Google Cloud.",
    "All customer data is encrypted at rest by default with Google-managed keys; nothing needs to be turned on."
   ],
   [
    "CMEK means the keys are stored outside Google.",
    "CMEK keys live in Cloud KMS inside Google Cloud but are controlled by the customer. Keeping keys outside Google is Cloud External Key Manager."
   ],
   [
    "If a customer loses its own key, Google support can recover the data.",
    "With customer-controlled keys, Google cannot decrypt the data without the key, so lost or destroyed keys mean unrecoverable data."
   ],
   [
    "Encryption in transit is entirely Google's job.",
    "Google encrypts traffic within its infrastructure, but customers should serve their apps over HTTPS and use encrypted connections such as Cloud VPN from on-premises."
   ]
  ],
  "tryit": [
   [
    "Harrowgate Health must show auditors that it can make its patient records in Cloud Storage unreadable at any moment, and that keys rotate every 90 days. It does not need the keys to be held outside Google. Which key option fits, and what is the main risk?",
    "Customer-managed encryption keys in Cloud KMS. The firm controls rotation and can disable or destroy the key. The main risk is that destroying or losing the key makes the data permanently unrecoverable."
   ],
   [
    "A European defense contractor's policy says no cloud provider may ever possess its encryption keys, even in managed form. Which option meets this, and what operational duty comes with it?",
    "Cloud External Key Manager, which keeps keys in an external key management system outside Google. The contractor must keep that external system available, because if it refuses or fails, the data cannot be decrypted."
   ]
  ],
  "tip": "Encryption at rest is on by default; customers do not need to enable it. Choose CMEK in Cloud KMS when a question stresses customer control over key rotation, disabling or destroying keys.",
  "check": [
   [
    "Does a customer have to turn on encryption at rest in Google Cloud?",
    "No. All customer data is encrypted at rest by default with Google-managed keys."
   ],
   [
    "What is the risk of managing your own keys?",
    "If the key is destroyed or lost, the data it protects cannot be recovered, even by Google."
   ],
   [
    "What is envelope encryption?",
    "Data is encrypted with data encryption keys, and those keys are encrypted with key encryption keys held in a key management system."
   ]
  ]
 },
 {
  "t": "Identity and access management: principals, roles, least privilege and two-step verification",
  "hook": "It is a quiet Thursday at Cobalt Ridge Software when a junior developer, testing a cleanup script, deletes a production database instead of a test one. Nobody is hurt, and backups exist, but the post-incident review is uncomfortable. Why could a junior developer touch production at all? The answer comes out slowly: two years ago, to save time, every developer was given the Editor role on every project. It was never revisited. Now the chief technology officer, Lena, asks you to fix it without slowing the team to a crawl. How do you decide who should be able to do what, and where?",
  "simple": "Identity and access management is about answering one question: who is allowed to do what, and on which thing? In Google Cloud, the 'who' can be a person, a group of people, or an app. The 'what' is a role, which is a bundle of allowed actions, such as 'can read files' or 'can start servers'. The safest habit is least privilege: give everyone only what they need for their job, only where they need it, and only for as long as they need it. It is like a hotel key card: a guest's card opens their own room and the gym, a cleaner's card opens the rooms on one floor, and only the manager's card opens everything. Adding a second check at sign-in, such as a physical security key, stops someone who has stolen a password.",
  "body": [
   "Identity and access management (IAM) answers the question: who can do what on which resource? In the cloud, where resources are reached over the internet rather than only from inside an office, IAM is one of the most important security controls. Many incidents involve access being misused, whether by an attacker with stolen credentials or by an insider, or simply by a well-meaning person who had far more access than their job required.",
   "In Google Cloud IAM, a principal is the identity that receives access. Principals include Google accounts for individual users, Google groups, service accounts, and Cloud Identity or Google Workspace domains. Service accounts deserve special attention: they are identities used by applications, virtual machines (VMs) and automated pipelines rather than by people, so a web app can read from a database without anyone's personal password being involved. Managing access through groups rather than individuals makes life much easier, because when someone joins, changes role or leaves, you change their group membership once instead of editing many separate grants. Organizations typically manage user accounts with Cloud Identity or Google Workspace and can synchronize them from an existing directory so that the company's usual joiner and leaver processes carry over to the cloud.",
   "Permissions allow specific actions, such as starting a VM or reading a storage object. Permissions are not granted directly to principals. Instead, they are bundled into roles, and roles are granted to principals on a resource through an allow policy, sometimes called an IAM policy. Because of the resource hierarchy, a role granted on a folder or the organization is inherited by everything beneath it, which is powerful but can quietly give broad access. There are three kinds of roles. Basic roles (Owner, Editor and Viewer) are broad and apply across all services in a project; they predate the finer-grained options and are not recommended for most production use. Predefined roles are created and maintained by Google for specific jobs on specific services, such as Storage Object Viewer or Compute Instance Admin. Custom roles let an organization define exactly the set of permissions it needs when no predefined role fits.",
   "The principle of least privilege means giving each principal only the permissions needed for its task, on the smallest scope, for no longer than needed. In practice, this means preferring predefined or custom roles over basic roles, granting at the project or individual resource level rather than at the organization level whenever possible, granting to groups rather than individuals, reviewing access regularly, and acting on IAM recommendations, which point out permissions that a principal has not used and suggest removing them. Separation of duties complements least privilege: no single person should control an entire sensitive process, such as both approving and deploying a production change, so a mistake or misuse needs more than one person to go unnoticed.",
   "Least privilege is not only about people. Service accounts should also have narrowly scoped roles, and teams should avoid creating long-lived downloadable service account keys where possible, because a leaked key works anywhere until it is revoked. Workloads running on Google Cloud can use their attached service account without any key file at all, which removes that risk.",
   "Authentication, proving who you are, matters as much as authorization, deciding what you may do. Two-step verification (2SV), also called multi-factor authentication (MFA), requires a second factor in addition to a password, such as a code from an authenticator app, a prompt on a phone or, best of all, a physical security key. Security keys resist phishing because they check the identity of the site and only work with the genuine one, so a fake sign-in page cannot capture a usable second factor. Codes sent by text message or typed from an app are better than a password alone but can be tricked out of users. Administrators, who hold the most powerful roles, should always use strong 2SV, and organizations can enforce it centrally.",
   "Bringing it together, a well-run Google Cloud organization might look like this: developers belong to a group with predefined roles on development projects only; a small operations group has production access; service accounts each have one narrow purpose; IAM recommendations are reviewed monthly; and every administrator signs in with a security key. On the exam, any answer that grants a basic role broadly is almost never the least-privilege choice."
  ],
  "analogy": "IAM works like a hotel's key card system. The guest (principal) gets a card programmed for certain doors (a role), on certain floors (the resource scope), for the length of the stay (time-limited access). Housekeeping staff share a card type programmed for their floor (a group). Basic roles are like a master key: convenient, but far too powerful to hand out casually. Where it stops: in Google Cloud, access granted at a higher level, such as a folder, is inherited by everything below it.",
  "mnemonic": "Who, what, where: Principal, Role, Resource. A principal gets a role on a resource. Then shrink each one for least privilege: a group instead of many people, a predefined role instead of Editor, a project instead of the organization.",
  "terms": [
   [
    "Principal",
    "An identity that can be granted access, such as a user, group, service account or domain."
   ],
   [
    "Role",
    "A collection of permissions that can be granted to a principal on a resource."
   ],
   [
    "Allow policy",
    "The binding of roles to principals on a resource, also called an IAM policy."
   ],
   [
    "Least privilege",
    "Granting only the permissions needed, on the narrowest scope, for only as long as needed."
   ],
   [
    "Service account",
    "An identity used by applications and workloads rather than people."
   ],
   [
    "Two-step verification (2SV)",
    "Requiring a second factor, such as a security key, in addition to a password."
   ]
  ],
  "example": "A company replaces the Editor role it had given all developers with a group that has predefined roles for the specific services they use, in development projects only. Production access is granted to a small operations group, and every administrator uses a security key for 2SV.",
  "mistakes": [
   [
    "Granting the Editor role is a reasonable default for developers.",
    "Basic roles are broad across all services in a project. Least privilege points to predefined or custom roles for specific services, on the narrowest scope."
   ],
   [
    "Permissions are granted directly to users.",
    "Permissions are bundled into roles, and roles are granted to principals, preferably groups, through an allow policy."
   ],
   [
    "Granting access at the organization level is simpler and just as safe.",
    "Roles granted high in the hierarchy are inherited by every folder, project and resource below, which usually grants far more access than needed."
   ],
   [
    "Any second factor gives the same protection.",
    "SMS and app codes can be phished. Security keys resist phishing because they only work with the genuine site."
   ]
  ],
  "tryit": [
   [
    "At Quarry Bay Analytics, a data analyst needs to read files in one Cloud Storage bucket for a three-month project. Her manager suggests giving her the Viewer basic role on the whole project to keep things simple. What should you recommend instead?",
    "Grant a predefined role such as Storage Object Viewer on that one bucket, ideally through a group for the project team, and remove it when the project ends. The Viewer basic role would let her see resources across every service in the project, which is more than she needs."
   ]
  ],
  "tip": "Grant roles, not permissions, to groups rather than individuals, on the smallest scope. Basic roles (Owner, Editor, Viewer) are almost never the least-privilege answer.",
  "check": [
   [
    "What are the three kinds of IAM roles in Google Cloud?",
    "Basic (Owner, Editor, Viewer), predefined, and custom roles."
   ],
   [
    "Why are security keys better than SMS codes for 2SV?",
    "Security keys resist phishing because they only authenticate to the genuine site, while codes can be tricked out of users."
   ],
   [
    "Why manage access through groups rather than individual users?",
    "Group membership can be changed once when people join, move or leave, which keeps access accurate and easier to review."
   ]
  ]
 },
 {
  "t": "Network and perimeter security: firewall rules, Cloud Armor and VPC Service Controls",
  "hook": "It is the first morning of Saltmarsh Outfitters' biggest sale of the year, and Kofi on the operations team is watching traffic graphs climb. Then they climb far too fast: millions of requests a minute from thousands of addresses, and buried among them, odd-looking search queries that seem designed to trick the database. At the same time, the security team is still investigating last month's scare, when an analyst's laptop was stolen with a signed-in session to the customer data warehouse. Two very different problems, both involving the network. Can one control handle both, or does each need its own layer?",
  "simple": "Network security in the cloud uses several different gates, each for a different job. Firewall rules decide which traffic may reach your virtual servers, like a list of who is allowed through a door. Cloud Armor stands in front of your public website and blocks floods of fake traffic and common tricks hackers use against web forms. VPC Service Controls draws a fence around your stored data so that even someone with a valid login cannot copy it to a place outside the fence. Think of a shop: the door policy decides who can enter, a security guard outside handles crowds and troublemakers, and a locked stockroom stops even a staff member from carrying goods out the back door to a stranger's van.",
  "body": [
   "Even in a zero trust world where identity is the main perimeter, network controls remain an important layer of defense in depth. They reduce the number of ways an attacker can reach a system, absorb attacks that never should reach the application, and contain data if an identity is compromised. Google Cloud provides several network controls, and the exam expects you to match each one to the threat it addresses.",
   "A Virtual Private Cloud (VPC) is a customer's private network in Google Cloud. A single VPC network is global, spanning regions, and resources such as virtual machines (VMs) get internal Internet Protocol (IP) addresses within it. VPC firewall rules and firewall policies allow or deny traffic to and from those resources based on IP address ranges, ports, protocols, network tags or service accounts. Good practice is to deny by default and allow only what is needed. For example, a team might allow HTTPS (encrypted web traffic) on port 443 from the internet only to its load balancer, allow database traffic only from the application tier, and allow Secure Shell (SSH) only from Identity-Aware Proxy's address range rather than from anywhere. A rule allowing all ports from `0.0.0.0/0`, meaning every address on the internet, is a classic misconfiguration that Security Command Center would flag. Firewall policies can also be applied centrally at the organization or folder level, so a security team can enforce baseline rules that individual projects cannot override. Cloud Next Generation Firewall (Cloud NGFW) adds more advanced inspection features on top of basic rules.",
   "Cloud Armor protects internet-facing applications and websites that sit behind Google Cloud's external load balancers. It provides protection against distributed denial-of-service (DDoS) attacks, in which huge volumes of traffic from many sources try to overwhelm a service. Because Cloud Armor works at the edge of Google's global network, it can use that network's scale to absorb attack traffic before it reaches the application. Cloud Armor also acts as a web application firewall (WAF), with preconfigured rules for common web attacks such as SQL injection, which abuses Structured Query Language (SQL) by trying to slip database commands into input fields, and cross-site scripting, which tries to inject malicious scripts into pages that other users see. Rules can also allow or block traffic by IP address or geographic region and apply rate limiting so that no single client can send too many requests. The key point is location: attacks are stopped at the edge, so the application and its backends never see most of the bad traffic.",
   "VPC Service Controls addresses a different risk: data exfiltration from Google Cloud managed services such as Cloud Storage and BigQuery. These services are reached through Google's APIs rather than through a customer's VM, so ordinary firewall rules do not govern them. VPC Service Controls lets you draw a service perimeter around chosen projects and services. Requests to access protected data from outside the perimeter, or to copy data to resources outside it, are blocked even if the caller has valid identity and access management (IAM) credentials. That is the crucial difference from IAM: IAM asks whether this identity may do this action, while a service perimeter also asks whether the request is coming from, and going to, an allowed place. This helps contain the damage from stolen credentials or malicious insiders, because a valid token used from an unknown network, or an attempt to copy a table into a personal project, is refused.",
   "Private connectivity completes the picture. Private Google Access lets VMs without external IP addresses reach Google APIs and services. Private Service Connect lets workloads reach Google services and services published by other organizations through internal IP addresses, so traffic does not need public endpoints. For hybrid environments, Cloud VPN provides encrypted tunnels over the internet to on-premises networks, and Cloud Interconnect provides dedicated, private connections with higher bandwidth. Using these means fewer resources need public IP addresses, which shrinks the attack surface.",
   "When you see an exam question about network security, identify what is being protected and from what. Attack traffic or web exploits aimed at a public website point to Cloud Armor. Data being copied out of managed services by someone with valid credentials points to VPC Service Controls. Allowing or blocking traffic to VMs by port and address points to firewall rules. Reaching Google services without public IP addresses points to Private Google Access or Private Service Connect. Many real architectures use all of them together as layers."
  ],
  "analogy": "Picture a museum. Firewall rules are the doors: some open to the public, some only to staff, some locked entirely. Cloud Armor is the crowd control and bag check at the main entrance, turning away mobs and people carrying suspicious items before they get inside. VPC Service Controls is the rule that no artwork may leave the building, even if a curator with a valid badge tries to carry it out. Where it stops: Cloud Armor only protects applications behind Google Cloud's external load balancers, not every resource.",
  "terms": [
   [
    "VPC firewall rules",
    "Rules that allow or deny network traffic to and from resources in a VPC network."
   ],
   [
    "Cloud Armor",
    "Google Cloud's DDoS protection and web application firewall for applications behind external load balancers."
   ],
   [
    "Web application firewall (WAF)",
    "A filter that blocks common web attacks such as SQL injection and cross-site scripting."
   ],
   [
    "VPC Service Controls",
    "Service perimeters around Google Cloud services that reduce the risk of data exfiltration."
   ],
   [
    "Data exfiltration",
    "Unauthorized copying or transfer of data out of an organization."
   ],
   [
    "Private Google Access",
    "Lets resources without external IP addresses reach Google APIs and services."
   ]
  ],
  "example": "An online store puts its site behind a global load balancer with Cloud Armor, which absorbs a large DDoS attack and blocks SQL injection attempts. Its customer data in BigQuery sits inside a VPC Service Controls perimeter, so a stolen analyst credential cannot be used to copy tables to an outside project.",
  "mistakes": [
   [
    "VPC firewall rules protect BigQuery and Cloud Storage from data exfiltration.",
    "Managed services are reached through Google APIs, not through your VMs. VPC Service Controls is the control that blocks data leaving a service perimeter."
   ],
   [
    "IAM alone stops someone with stolen credentials from copying data out.",
    "Valid credentials pass IAM checks. VPC Service Controls adds a perimeter that blocks access from or copying to outside locations even with valid credentials."
   ],
   [
    "Cloud Armor is a firewall for VMs inside the VPC.",
    "Cloud Armor protects internet-facing applications behind external load balancers, at Google's edge. VM traffic within the VPC is controlled by firewall rules."
   ],
   [
    "Zero trust makes network controls unnecessary.",
    "Network controls remain a valuable layer of defense in depth alongside identity-based access."
   ]
  ],
  "tryit": [
   [
    "Fernhill Ticketing's public booking site slows to a crawl every time a big concert goes on sale, and logs show bursts of requests from a few thousand addresses plus attempts to inject database commands through the search box. Which Google Cloud service should sit in front of the site, and what features address each problem?",
    "Cloud Armor in front of the external load balancer. Its DDoS protection and rate limiting handle the floods at Google's edge, and its WAF rules block SQL injection attempts before they reach the application."
   ],
   [
    "A research lab keeps sensitive datasets in BigQuery. Its main worry is a researcher's credentials being stolen and used to export tables to a personal project. Which control addresses this?",
    "VPC Service Controls. A service perimeter around the BigQuery projects blocks copying data to resources outside the perimeter and blocks access from outside it, even with valid credentials."
   ]
  ],
  "tip": "DDoS and web attacks against a public site: Cloud Armor. Data being copied out of managed services even with valid credentials: VPC Service Controls. Allowing or denying traffic to VMs by port and address: firewall rules.",
  "check": [
   [
    "Which service protects a public web app from SQL injection and DDoS at Google's edge?",
    "Cloud Armor."
   ],
   [
    "What does VPC Service Controls protect against that IAM alone does not?",
    "Data exfiltration by someone with valid credentials, by blocking access and copying across the service perimeter."
   ],
   [
    "What is good practice when writing VPC firewall rules?",
    "Deny by default and allow only the specific traffic needed, such as HTTPS to the load balancer and SSH only through Identity-Aware Proxy."
   ]
  ]
 },
 {
  "t": "Security operations: Security Command Center, audit logs and Google Security Operations",
  "hook": "At 2:10 a.m. your phone buzzes. You are on call for the security team at Northgate Freight, and the alert says a Cloud Storage bucket named `customs-scans-archive` has just become publicly readable. A minute later, a second alert: a virtual machine in the same project is using all of its CPU, with network traffic going to an address associated with cryptocurrency mining. You are half awake, the project has forty people with access, and the morning meeting will want three answers: what happened, who did it and whether it is contained. Where do you even start looking?",
  "simple": "Security operations is the everyday work of spotting trouble, figuring out what happened and fixing it. No set of locks is perfect, so you also need alarms and a record of events. In Google Cloud, Security Command Center is like a central alarm panel: it shows risky settings, weak spots and signs of an attack across all your projects. Audit logs are like a visitor book that records who did what and when, such as who changed a setting or deleted a server. Google Security Operations is a bigger control room for large companies that collects alarms from everywhere, cloud and office alike, spots patterns and can respond automatically. Think of a shopping mall: cameras, door alarms and a sign-in desk all feed one security office.",
  "body": [
   "Security operations (SecOps) is the continuous work of detecting, investigating and responding to threats. Preventive controls such as identity and access management (IAM), firewalls and encryption are never perfect: a setting slips, a password is phished, or a new vulnerability appears. So organizations need visibility into what is happening in their environment and the ability to react quickly when something goes wrong. Google Cloud provides tools at several levels, from posture management inside Google Cloud to logging and enterprise-wide threat detection.",
   "Security Command Center is Google Cloud's built-in security and risk management platform. It gives a central view across an organization's projects of four kinds of information. Assets: an inventory of resources such as projects, VMs, buckets and service accounts. Misconfigurations: risky settings such as public buckets, firewall ports open to the internet, or logging turned off. Vulnerabilities: weaknesses such as outdated software on virtual machines (VMs) or flaws in web applications. Threats: signs of active attacks, such as a VM mining cryptocurrency, unusual IAM grants or access from known malicious addresses. Security Command Center prioritizes these findings so teams can fix the most serious first, recommends remediation steps, and can check the environment against compliance benchmarks to show how well it meets common standards. Higher service tiers add more detection capabilities. In practice, a team might open Security Command Center each morning, sort findings by severity, assign the critical ones to project owners and mark others as accepted risks with a reason, turning a scattered set of problems into a managed work queue.",
   "Cloud Audit Logs record who did what, where and when in Google Cloud. There are four types, and the exam likes to test which is which. Admin Activity audit logs record configuration changes, such as creating a VM, changing a firewall rule or modifying IAM policies. They are always on and cannot be disabled, so there is always a record of administrative changes. Data Access audit logs record reads and writes of user data, such as someone reading objects in a bucket or querying a table. They are mostly off by default because they can be very large, and organizations enable them where they need them, for example on sensitive datasets. System Event logs record changes made by Google systems rather than users, such as a VM being live-migrated. Policy Denied logs record when access is refused because of a security policy, such as a VPC Service Controls perimeter.",
   "A typical audit log entry shows the principal, such as an email address or service account, the method called, the resource affected, the time and the caller's Internet Protocol (IP) address. Logs are viewed and searched in Cloud Logging's Logs Explorer, and they can be routed to BigQuery for long-term analysis, to Cloud Storage for low-cost retention, or to other security tools. Audit logs answer the questions every investigation and auditor asks, such as 'who deleted this instance?' or 'who made this bucket public, and when?', and they provide evidence for compliance.",
   "Google Security Operations, formerly known as Chronicle, is a cloud-native security operations platform for the whole enterprise, not only Google Cloud. It combines security information and event management (SIEM), which collects and analyzes security telemetry to detect threats, with security orchestration, automation and response (SOAR), which automates investigation and response steps through playbooks. It can ingest very large volumes of logs from cloud providers, on-premises systems, endpoints and network devices, enrich them with Google threat intelligence, including intelligence from Mandiant, detect suspicious patterns, and trigger workflows such as opening a ticket, disabling an account or isolating a machine.",
   "Other services round out the toolkit. Sensitive Data Protection discovers and classifies sensitive information such as card numbers or personal details, and can mask it. Web Security Scanner checks web applications for common vulnerabilities. Mandiant, part of Google Cloud, provides incident response experts and threat intelligence for organizations that need outside help during or before a serious incident.",
   "Returning to the 2 a.m. alert, the pieces fit together. Security Command Center raises the public bucket and cryptomining findings. The Admin Activity audit logs show which account changed the bucket's permissions and created the VM, and when. The team removes public access, stops and isolates the VM, revokes the compromised credential, and, in a larger organization, Google Security Operations correlates the event with signals from elsewhere to check whether the same attacker touched other systems."
  ],
  "analogy": "Security operations in Google Cloud works like a building's safety system. Security Command Center is the fire panel in the lobby that lights up for open doors, faulty sprinklers and smoke. Cloud Audit Logs are the sign-in book and keycard records that say exactly who entered which room and when. Google Security Operations is the city-wide monitoring center that watches many buildings at once and can dispatch help automatically. Where it stops: Admin Activity logs, unlike a sign-in book, cannot be switched off.",
  "terms": [
   [
    "Security Command Center",
    "Google Cloud's central platform for security posture, vulnerabilities, misconfigurations and threat detection."
   ],
   [
    "Cloud Audit Logs",
    "Logs recording administrative actions, data access, system events and policy denials in Google Cloud."
   ],
   [
    "Admin Activity audit logs",
    "Always-on logs of configuration changes that cannot be disabled."
   ],
   [
    "Data Access audit logs",
    "Logs of reads and writes of user data, mostly off by default because of volume."
   ],
   [
    "SIEM",
    "Security information and event management: collecting and analyzing security logs to detect threats."
   ],
   [
    "SOAR",
    "Security orchestration, automation and response: automating investigation and response steps."
   ]
  ],
  "example": "Security Command Center flags that a new Cloud Storage bucket is publicly readable and that a VM shows signs of cryptomining. The security team checks the Admin Activity audit logs to see which account created the bucket and made it public, removes public access and isolates the VM.",
  "mistakes": [
   [
    "Data Access audit logs are always on.",
    "Admin Activity audit logs are always on and cannot be disabled. Data Access logs are mostly off by default and must be enabled where needed."
   ],
   [
    "Security Command Center is a SIEM for the whole enterprise.",
    "Security Command Center focuses on posture and threats within Google Cloud. Enterprise-wide SIEM and SOAR across many sources is Google Security Operations."
   ],
   [
    "Strong preventive controls make monitoring unnecessary.",
    "No preventive control is perfect, so detection, investigation and response are always needed."
   ],
   [
    "Audit logs show what data was in a file.",
    "Audit logs record who did what, on which resource, when and from where; they do not store the content of the data itself."
   ]
  ],
  "tryit": [
   [
    "At Larchmont Pharmacy Group, a regulator asks who read records in a BigQuery dataset of prescriptions over the past month. The team checks the logs and finds only configuration changes, no reads. What went wrong, and what should they change?",
    "Data Access audit logs were not enabled for BigQuery on that dataset, so reads were not recorded. Admin Activity logs only capture configuration changes. They should enable Data Access audit logs for sensitive datasets and route them to long-term storage."
   ]
  ],
  "tip": "Posture and threats across Google Cloud projects: Security Command Center. Who did what and when: Cloud Audit Logs (Admin Activity is always on). Enterprise-wide SIEM and SOAR: Google Security Operations.",
  "check": [
   [
    "Which audit logs are always on and cannot be disabled?",
    "Admin Activity audit logs."
   ],
   [
    "What does Security Command Center provide?",
    "A central view of assets, misconfigurations, vulnerabilities and threats across an organization, with prioritized findings and recommendations."
   ],
   [
    "What two capabilities does Google Security Operations combine?",
    "SIEM, for collecting and analyzing security telemetry, and SOAR, for automating investigation and response."
   ]
  ]
 },
 {
  "t": "Data residency, data sovereignty and Assured Workloads",
  "hook": "The digital services director at a fictional regional health authority, Ingrid, has a contract on her desk that will move appointment booking for two million residents to Google Cloud. The legal team has attached three conditions in red: patient data must stay inside the European Union, only support staff in approved countries may ever access the systems, and the authority must be able to prove both at any audit. 'Picking a European region is easy,' says the cloud architect. 'But how do we stop a developer next year from spinning up a database in another continent by accident? And who controls the support staff?' Is choosing a region enough, or is there more to it?",
  "simple": "Data residency means where your data physically lives, such as in data centers in Germany. Data sovereignty is a bigger idea: because data falls under the laws of the country it sits in, organizations want to know which governments could demand it and who really controls it, including who holds the keys and which people can touch the systems. In Google Cloud, you choose where data lives by picking a region, and you can set a company-wide rule that blocks anyone from creating things in other places. Assured Workloads goes further for strict rules by also limiting which products can be used and which support staff can help. It is like choosing a bank: residency is which branch holds your box; sovereignty is which country's laws and which employees can open it.",
  "body": [
   "Many organizations must meet rules about where data is stored and who can access it. This is especially common in the public sector, healthcare and finance, and it applies to companies that serve those sectors. These rules come from national laws, industry regulations and customer contracts, and they are one of the most common concerns raised when an organization considers moving to the cloud. The Cloud Digital Leader exam expects you to distinguish residency from sovereignty and to know the Google Cloud tools that address each.",
   "Data residency is the physical or geographic location where data is stored and processed. In Google Cloud, you control residency mainly by choosing regions and multi-regions when you create resources. For example, you might store a Cloud Storage bucket in `europe-west3`, which is in Frankfurt, or create a BigQuery dataset in a European Union (EU) multi-region. Choosing a location for each resource works for one careful team, but organizations need something stronger, because anyone with permission could create a resource elsewhere by mistake. To enforce residency across an organization, administrators use the resource locations organization policy constraint. Set at the organization or folder level, it restricts the locations where supported resources can be created, so an attempt to create a bucket in a non-approved region is simply refused. Because organization policies are inherited down the resource hierarchy, one setting can cover every project.",
   "Data sovereignty is a broader, legal concept. Data is subject to the laws of the country where it is located, and organizations and governments want assurance about which jurisdictions could compel access to it and who ultimately controls it. Sovereignty concerns go beyond location and usually cover several questions. Where is the data stored and processed? Who holds the encryption keys? Which personnel can access the systems, and from which countries? Could operations be affected by foreign laws or by the provider being required to hand over data? A useful way to remember the difference is that residency is about where, while sovereignty is about where plus who controls it and under which laws.",
   "Google Cloud addresses sovereignty with a combination of controls. Data location controls, such as region choice and the resource locations constraint, cover where data sits. Customer-managed encryption keys and Cloud External Key Manager let the customer control or hold the keys, so the provider cannot decrypt data without the customer's cooperation. Access controls and transparency features, such as Access Transparency and Access Approval, give visibility and control over any access by Google personnel. In some countries, Google also offers sovereign cloud solutions delivered together with local partners, for customers with the strictest requirements.",
   "Assured Workloads is a Google Cloud service that helps customers run regulated workloads by applying a bundle of controls for a chosen compliance regime, such as specific government, healthcare or regional data protection requirements. When you create an Assured Workloads folder and choose the regime, the service applies the controls that regime needs. These can include data location restrictions, so resources can only be created in approved regions; restrictions on which products can be used, so only services that support the regime are available; and limits on which Google personnel can provide support, for example only personnel located in certain countries or who have passed certain background checks. Assured Workloads also monitors the folder for violations of these controls and alerts the customer, which helps keep the environment compliant as it changes over time.",
   "The value of Assured Workloads is that it turns a long list of separate settings into one consistent, monitored configuration. Without it, a team would have to set location policies, restrict services, configure key management and arrange support restrictions individually, and then keep checking that nothing drifted. With it, projects created inside the folder inherit the controls automatically.",
   "Remember that residency and sovereignty are part of the customer's compliance responsibility. Google provides the tools and the infrastructure, but the customer must choose the right locations, select the correct regime, configure keys and access controls, and verify that its workloads meet the rules that apply to it. On the exam, a question about keeping data in a country points to region selection and the resource locations constraint; a question that adds control over keys, personnel and jurisdiction points to sovereignty controls; and a regulated workload needing location, product and personnel controls together points to Assured Workloads."
  ],
  "analogy": "Think of residency and sovereignty like storing valuables in a safe-deposit box abroad. Residency is simply which city's bank holds the box. Sovereignty asks which country's courts could order it opened, who has the key and which bank employees may handle it. Assured Workloads is like a special vault service that guarantees the box stays in that city, only certain employees may assist you, and alarms ring if any rule is broken. Where it stops: you still choose the regime and must check it matches your obligations.",
  "terms": [
   [
    "Data residency",
    "The geographic location where data is stored and processed."
   ],
   [
    "Data sovereignty",
    "The principle that data is subject to the laws of the country where it is located, including control over who can access it."
   ],
   [
    "Assured Workloads",
    "A Google Cloud service that applies controls, such as data location, product restrictions and personnel access, for regulated workloads."
   ],
   [
    "Resource locations constraint",
    "An organization policy that restricts the locations where resources can be created."
   ],
   [
    "Organization policy",
    "A centrally set rule, inherited down the resource hierarchy, that restricts how resources can be configured."
   ]
  ],
  "example": "A German public agency must keep citizen data in the EU and limit support access to EU personnel. It creates an Assured Workloads folder for the relevant EU regime, which restricts resource locations to EU regions and applies personnel access controls, and it uses external keys it holds itself.",
  "mistakes": [
   [
    "Data residency and data sovereignty mean the same thing.",
    "Residency is where data is stored. Sovereignty adds which laws apply and who controls and can access the data, including keys and personnel."
   ],
   [
    "Choosing a region when creating a resource enforces residency across the organization.",
    "It only sets that one resource's location. The resource locations organization policy constraint enforces allowed locations for everyone."
   ],
   [
    "Assured Workloads only controls data location.",
    "It can also restrict which products can be used and which Google personnel can provide support, and it monitors for violations."
   ],
   [
    "Google is responsible for making a customer's workloads meet residency laws.",
    "Google provides the tools; the customer must choose locations, regimes and controls correctly."
   ]
  ],
  "tryit": [
   [
    "Bramblewood Bank's compliance team wants to guarantee that no project in the company can ever create storage or databases outside Canada. Teams create new projects every week. What should the cloud administrator configure?",
    "Set the resource locations organization policy constraint to Canadian locations at the organization node. Because organization policies are inherited, every existing and future project is covered, and attempts to create resources elsewhere are refused."
   ],
   [
    "A defense supplier must meet a government regime that requires data to stay in the country, only approved services to be used, and support only from personnel who meet specific screening requirements. What Google Cloud service fits best?",
    "Assured Workloads. Creating an Assured Workloads folder for that regime applies data location, product and personnel controls together and monitors for violations."
   ]
  ],
  "tip": "Residency is about where data sits, set by choosing regions and enforced with the resource locations policy. Sovereignty adds who controls and can access it under which laws. Regulated workloads with location and personnel controls point to Assured Workloads.",
  "check": [
   [
    "How can an organization prevent any project from creating resources outside the EU?",
    "Set the resource locations organization policy constraint to EU locations at the organization node."
   ],
   [
    "Name two controls Assured Workloads can enforce.",
    "Data location restrictions, restrictions on available products, and limits on which Google personnel can access or support the workload (any two)."
   ],
   [
    "What does data sovereignty add beyond data residency?",
    "Concern about which laws apply and who controls and can access the data, including encryption keys and personnel."
   ]
  ]
 },
 {
  "t": "Compliance and transparency: compliance reports, Access Transparency and Google's trust principles",
  "hook": "The compliance officer at Ashgrove Children's Hospital, Dr. Patel, has been asked to approve moving patient scheduling and lab results to Google Cloud. Her questions are blunt. 'How do I know the provider meets the standards we are held to? Will they use our patients' data for anything else? And if one of their engineers looks at our records while fixing a problem, would I ever find out?' The project team has a slide deck full of features, but she wants evidence she can put in a file, not promises. Where does that evidence come from, and how can she check access instead of simply trusting it?",
  "simple": "Before a hospital or bank trusts a cloud provider with sensitive data, it needs proof. Independent auditors regularly check Google Cloud against well-known security and privacy standards, and customers can download those reports and certificates to show their own auditors. Google also publishes promises, called trust principles, such as 'your data belongs to you' and 'we do not sell it or use it for ads'. Finally, two features let customers watch and control access by Google staff: one keeps a log of any time Google staff touch your data and why, and the other makes Google ask your permission first. It is like hiring a cleaning company: you check its references, read its written promises, get a log of every visit, and for the most private rooms, require it to ask before entering.",
  "body": [
   "Moving sensitive workloads to the cloud requires trust in the provider, and in regulated industries trust must be backed by evidence. Organizations need three things: proof that the provider meets recognized standards, clear commitments about how their data will be handled, and visibility into any access by the provider's own staff. Google Cloud addresses each of these, and the Cloud Digital Leader exam expects you to know which tool or document answers which need.",
   "Independent audits provide the proof. Google Cloud is regularly audited by independent third parties against many international and industry standards and regulations. Examples include ISO/IEC 27001, an International Organization for Standardization and International Electrotechnical Commission standard for information security management systems; ISO/IEC 27017 and 27018, which cover security controls for cloud services and the protection of personal data in public clouds; and System and Organization Controls (SOC) 1, SOC 2 and SOC 3 reports, which describe how a service provider's controls were tested by auditors. SOC 3 is a general-use summary that can be shared publicly, while SOC 1 and SOC 2 are more detailed. Google Cloud is also assessed against the Payment Card Industry Data Security Standard (PCI DSS) for card payments, and supports customers with requirements such as the Health Insurance Portability and Accountability Act (HIPAA) in US healthcare and the General Data Protection Regulation (GDPR) in the European Union.",
   "Customers can download certificates and audit reports from Google's Compliance Reports Manager and use them in their own risk assessments, vendor reviews and audits. A compliance officer might attach the ISO/IEC 27001 certificate and the latest SOC 2 report to the organization's vendor risk file. There is an important limit to remember: the provider's certifications cover the provider's part of the shared responsibility model. A customer that stores card numbers in a publicly readable bucket is not compliant just because Google Cloud holds a PCI DSS attestation. The customer must still use the services in a compliant way and may need its own audits.",
   "Trust principles provide the commitments. Google Cloud has published principles that describe how it treats customer data. In summary: customers own their data, and Google does not sell customer data or use it for advertising. Google processes customer data only according to the customer's agreement and instructions. Customer data is encrypted by default. Google guards against insider access to customer data. Google does not give any government access to customer data except through a valid legal process, and it publishes transparency reports about the government requests it receives. And Google's privacy practices are audited against international standards. These principles are useful in business conversations, because they answer the 'will you use our data for something else?' question directly.",
   "Two features provide visibility and control over provider access. Access Transparency provides near real-time logs of actions taken by Google personnel on customer content, together with the justification, such as a support case the customer opened or a request to fix a service problem. These entries appear alongside the customer's other logs, so a security team can review them, alert on them and keep them as audit evidence. Access Approval goes a step further: for supported services, it requires the customer to explicitly approve a request before Google personnel can access their content. The customer receives the request with its justification and can approve or deny it, with limited exceptions, such as certain legal or emergency situations.",
   "A simple way to keep these straight is by timing. Access Transparency tells you about access after it happens, with a reason. Access Approval asks you before it happens. Compliance Reports Manager gives you evidence about the provider's controls in general, rather than about specific access events.",
   "These tools change the relationship from 'trust us' to 'verify for yourself'. A customer can read the audit reports, hold Google to its published principles, see every instance of staff access in its own logs and, where needed, decide whether that access happens at all. On the exam, certificates and audit reports point to Compliance Reports Manager, logs of Google staff access point to Access Transparency, approving access beforehand points to Access Approval, and any answer suggesting that provider certifications make the customer automatically compliant is a trap."
  ],
  "analogy": "Think of hiring a home care agency for an elderly relative. Before you sign, you check its licenses and inspection reports (Compliance Reports Manager). You read its written promises about privacy and conduct (trust principles). Each carer signs a visit log saying when they came and why (Access Transparency). For the bedroom where valuables are kept, you insist they call you for permission first (Access Approval). Where it stops: the agency's license does not make your own household safe; that remains your job.",
  "terms": [
   [
    "Compliance Reports Manager",
    "Google's portal for downloading certifications and third-party audit reports."
   ],
   [
    "Access Transparency",
    "Near real-time logs of actions Google personnel take on customer content, with justifications."
   ],
   [
    "Access Approval",
    "A feature that requires customer approval before Google personnel access customer content for supported services."
   ],
   [
    "SOC 2 report",
    "An independent audit report on a service provider's controls for security, availability, confidentiality and related criteria."
   ],
   [
    "Trust principles",
    "Google Cloud's published commitments about data ownership, use, encryption, insider access and government requests."
   ]
  ],
  "example": "Before approving a move to Google Cloud, a hospital's compliance officer downloads Google's ISO 27001 certificate and SOC 2 report from Compliance Reports Manager, reviews the trust principles and requires Access Transparency and Access Approval for the projects holding patient data.",
  "mistakes": [
   [
    "Because Google Cloud is certified, any workload running on it is automatically compliant.",
    "Provider certifications cover the provider's part. The customer must still configure and use services compliantly."
   ],
   [
    "Access Transparency lets customers block Google staff access.",
    "Access Transparency logs access after it happens. Blocking or approving access beforehand is Access Approval."
   ],
   [
    "Google uses customer data in the cloud for advertising.",
    "Google's trust principles state it does not sell customer data or use it for advertising, and processes it only according to the customer's instructions."
   ],
   [
    "Governments can obtain customer data from Google on request without legal process.",
    "Google's principles state it only provides access through a valid legal process and publishes transparency reports about such requests."
   ]
  ],
  "tryit": [
   [
    "Elmstead Credit Union's security team wants to be alerted any time a Google support engineer views data in its production project, but it does not want to slow down support by approving each case. Which feature fits, and why not the other?",
    "Access Transparency, which logs Google personnel actions with justifications so the team can review and alert on them. Access Approval would require explicit approval before each access, which is the extra step the team wants to avoid."
   ]
  ],
  "tip": "Audit reports and certificates: Compliance Reports Manager. Logs of Google staff access: Access Transparency. Approving access before it happens: Access Approval. Provider certifications do not make the customer compliant automatically.",
  "check": [
   [
    "What is the difference between Access Transparency and Access Approval?",
    "Access Transparency logs Google personnel access after the fact with a reason; Access Approval requires the customer to approve access before it happens."
   ],
   [
    "Name two of Google Cloud's trust commitments.",
    "Customers own their data; Google does not sell it or use it for ads; data is encrypted by default; government requests go through legal process (any two)."
   ],
   [
    "Where can a customer download Google Cloud's ISO certificates and SOC reports?",
    "From Compliance Reports Manager."
   ]
  ]
 },
 {
  "t": "Cloud financial governance and FinOps: shared accountability for cloud cost",
  "hook": "The quarterly business review at Kestrel Learning, an online tutoring company, takes an awkward turn. The chief financial officer, Gloria, puts up a chart: cloud spending has doubled in three months, while student numbers grew by only a fifth. She turns to the engineering leads. 'Which team spent this? On what? Was it worth it?' Nobody can answer. One lead suspects old test environments; another points to a new video feature that customers love. The finance team wants a spending freeze, and engineering fears that would kill the product roadmap. Is there a way to control cloud cost without simply saying no to everything?",
  "simple": "In the cloud, anyone with permission can switch on computers in minutes, and the bill grows every second they run. That freedom is useful, but it can lead to surprise bills and waste. FinOps is a way of working where finance people, engineers and business leaders share responsibility for cloud spending. Everyone can see what is being spent and by whom, waste gets cleaned up, and decisions about money are made together. The goal is not just to spend less, but to get good value from every dollar. Think of a shared household phone plan: if everyone can see their own usage, people notice when they are wasting data, and the family can decide together whether a bigger plan is worth it.",
  "body": [
   "Cloud spending works differently from traditional IT spending. In a traditional data center, spending is controlled up front: finance approves a hardware purchase, and afterwards the cost is largely fixed whether the servers are busy or idle. In the cloud, any engineer with permission can create resources in minutes, and costs accumulate by the second or by usage. That flexibility is valuable, because teams can experiment and scale quickly, but without new practices it can lead to surprise bills, idle resources that nobody remembers creating, and no clear idea of who spent what or why.",
   "Cloud financial governance is the set of policies, processes and tools that keep cloud spending aligned with business value. FinOps, short for cloud financial operations, is the widely used practice for doing this. Its central idea is shared accountability. It brings together finance, technology and business teams so that everyone shares responsibility for cost rather than leaving it to one department. Engineers see the cost of their design decisions, such as choosing a larger machine or keeping data in an expensive storage class. Finance learns to understand and forecast the variable nature of cloud spending instead of expecting a fixed annual number. Business leaders decide the trade-offs between speed, quality and cost, for example whether a faster launch is worth a higher bill for a few months.",
   "FinOps is often described as a cycle of three phases that repeat continuously. Inform comes first: make costs visible and allocate them to the teams, products and projects that incur them. In Google Cloud this uses the resource hierarchy, so projects and folders map to teams or products; labels, such as `team:payments` or `env:test`, attached to resources; and billing reports and dashboards that show spending broken down by those dimensions. Optimize comes next: reduce waste and get better rates. Typical actions include removing idle resources, rightsizing over-provisioned virtual machines (VMs), using autoscaling so capacity follows demand, choosing appropriate storage classes for data that is rarely read, and buying commitments for steady, predictable workloads in exchange for lower prices. Operate completes the cycle: set budgets and targets, automate controls such as alerts or scheduled shutdowns of development environments, measure results against goals, and continuously improve the process before starting the cycle again.",
   "A key idea is that the goal is not simply to spend less but to get the most value per dollar. Spending more on a service that brings in more revenue or serves more customers can be an excellent decision. Paying for forgotten test VMs that run all weekend is not. This is why FinOps teams often track unit economics, such as cost per customer, per transaction or per student, rather than only the total bill. In the opening scenario, a total bill that doubled might be fine if the popular video feature drove growth, and a problem if most of it came from abandoned test environments. Only visibility and allocation can tell the difference.",
   "Culture matters as much as tools. FinOps works when cost information reaches the people who make technical decisions, in time to act on it, and when teams are trusted to make sensible trade-offs rather than being blocked by blanket freezes. A blanket spending freeze may stop waste, but it also stops valuable innovation, which runs against the purpose of moving to the cloud in the first place. Many organizations instead publish a monthly cost review in which each team explains its largest changes, celebrates savings it found and flags upcoming growth, so that cost becomes an ordinary part of engineering conversations rather than an occasional crisis.",
   "Google Cloud supports FinOps with several tools, covered in more detail in the following lessons. The resource hierarchy organizes projects so costs roll up to the right teams. Cloud Billing reports and billing export to BigQuery provide detailed cost data for analysis and dashboards. Budgets and alerts notify owners when spending approaches a threshold. Quotas limit how much of a resource can be consumed. Labels allow costs to be grouped by any business dimension. Recommendations from Active Assist, through the Recommender, identify idle resources and rightsizing opportunities. Organizations often set up a central team to drive these practices, sometimes within the cloud center of excellence, which spreads good habits and shared tooling across the company while teams remain accountable for their own spending."
  ],
  "analogy": "FinOps is like a family managing a shared grocery budget. First, everyone keeps receipts and labels who bought what (Inform). Next, they spot waste, such as food thrown away or brand names where store brands would do, and buy staples in bulk for a discount (Optimize). Then they agree on a monthly budget and check it together each month (Operate). Where it stops: in the cloud, spending can spike in hours, so the checks need to be automated and continuous, not monthly.",
  "mnemonic": "The FinOps cycle runs In-Op-Op: Inform, Optimize, Operate. See it, then shrink it, then steer it, and repeat.",
  "terms": [
   [
    "FinOps",
    "A practice that brings finance, technology and business together to manage cloud costs and maximize value."
   ],
   [
    "Cost allocation",
    "Assigning cloud costs to the teams, products or projects that incur them."
   ],
   [
    "Rightsizing",
    "Changing resources to the size that actually matches their workload."
   ],
   [
    "Labels",
    "Key-value tags attached to resources so costs can be grouped by team, environment or product."
   ],
   [
    "Unit economics",
    "Measuring cost per unit of business value, such as per customer or per transaction."
   ],
   [
    "Active Assist recommendations",
    "Google Cloud suggestions, such as removing idle VMs or resizing machines, to reduce cost and improve security."
   ]
  ],
  "example": "A software company's cloud bill doubles in a quarter and nobody knows why. It forms a FinOps group, labels every project by team, gives each team a cost dashboard and budget, and acts on recommendations to delete idle VMs. Waste falls, and teams start considering cost when designing features.",
  "mistakes": [
   [
    "The goal of FinOps is to spend as little as possible.",
    "The goal is the most business value per dollar. Spending more can be right when it drives revenue or growth."
   ],
   [
    "Cloud cost is the finance team's job alone.",
    "FinOps is shared accountability across finance, technology and business teams, with engineers seeing the cost of their choices."
   ],
   [
    "Approving spending up front, as on-premises, is enough in the cloud.",
    "Cloud resources are created instantly and costs vary with use, so governance must be continuous, not only at purchase time."
   ],
   [
    "A blanket spending freeze is the best response to a rising bill.",
    "Freezes stop valuable work as well as waste. Visibility, allocation and targeted optimization address the real causes."
   ]
  ],
  "tryit": [
   [
    "Harbor Lane Media sees one large cloud bill each month with no breakdown by team, and every team claims its spending is small. The CFO asks for a first step that will make the next conversation productive. Which FinOps phase should they start with, and what concrete actions does it involve?",
    "Inform. They should map projects to teams in the resource hierarchy, apply labels such as team and environment, and give each team a billing report or dashboard showing its own costs. Optimization decisions only make sense once costs are visible and allocated."
   ]
  ],
  "tip": "FinOps is about shared accountability and maximizing business value, not only cutting cost. Look for answers that involve visibility and collaboration between finance and engineering.",
  "check": [
   [
    "What are the three FinOps phases?",
    "Inform (visibility and allocation), optimize (reduce waste and improve rates), and operate (set targets, automate and improve continuously)."
   ],
   [
    "Why does cloud spending need new governance compared with on-premises?",
    "Because anyone with permission can create resources instantly and costs are variable, so control must be continuous rather than only at purchase time."
   ],
   [
    "Give two Optimize actions in FinOps.",
    "Removing idle resources, rightsizing VMs, using autoscaling, choosing cheaper storage classes or buying commitments for steady workloads (any two)."
   ]
  ]
 },
 {
  "t": "The Google Cloud resource hierarchy: organization, folders, projects and resources",
  "hook": "It is your second week as the cloud lead at Tidewater Logistics, and the finance director forwards you a bill with forty-three projects on it. Some are named after employees, two belong to a contractor who left last spring, and one called \"test-final-v2\" is running a dozen virtual machines nobody recognizes. When you try to lock down production, you discover there is no single place to do it: every project has its own permissions, set by whoever created it. The auditors arrive next month and will ask who owns what and who can touch it. How should this company have organized its cloud from day one, and can you fix it now?",
  "simple": "Think of Google Cloud as a big filing cabinet for a company. The cabinet itself is the organization, and it belongs to the company, not to any one person. Inside are drawers called folders, which might be labeled Finance, Marketing, Production or Testing. Inside the drawers are file folders called projects, and each project holds the actual things you use, such as virtual computers, storage buckets and databases. Every item lives in exactly one project. Because of this layout, the company can put a rule on a whole drawer, such as \"only the finance team may open this,\" and it automatically applies to everything inside. Each project also has its own bill, so you can see exactly what each team spends.",
  "body": [
   "Google Cloud organizes everything a company uses into a hierarchy, a tree with the company at the top and individual resources at the bottom. The hierarchy is the foundation for managing access, applying policies and tracking costs, so designing it well is one of the first steps in any cloud adoption. For the Cloud Digital Leader exam, you need to know the four levels in order, what each level is for, and why a good structure saves an organization time and risk later.",
   "At the top is the organization node, which represents the company itself. It is linked to the company's Cloud Identity or Google Workspace domain, such as example.com, and it is created automatically when that domain is used with Google Cloud. Having an organization node gives central visibility and control over all projects. Just as importantly, it means projects belong to the company, not to the individual employees who created them. Without an organization node, a project created by an employee is tied to that person's account, and when the person leaves, the company can struggle to keep control. With one, administrators can see every project, recover access and apply company-wide rules.",
   "Below the organization are folders, which group projects and other folders. Folders commonly represent departments (Finance, Marketing), teams, products, or environments (Production, Development). Folders can be nested, so a company might have a Retail folder containing Production and Development subfolders. This lets you mirror the company's real structure and apply different policies to different groups. In the console you would see this as a tree on the resource manager page, with folder icons expanding to show the projects inside. Folders are optional, but almost every organization of meaningful size uses them, because they are the natural place to grant a department's access or apply an environment's guardrails once instead of project by project.",
   "Projects are the next level and the most important unit for day-to-day work. Every Google Cloud resource belongs to exactly one project. A project is where you enable application programming interfaces (APIs) and services, it is linked to a billing account that pays for its usage, and it has its own Identity and Access Management (IAM) policies and quotas. Each project has three identifiers. The project name is a friendly label you can change. The project ID is globally unique across all of Google Cloud and cannot be changed after creation, which is why teams choose it carefully, for example `tidewater-web-prod`. The project number is assigned automatically by Google. You will see the project ID appear in resource paths, command-line tools and billing reports.",
   "Separating work into projects is a design decision with real benefits. Using separate projects for different applications and environments keeps them isolated, so a mistake in a development project cannot delete a production database. It simplifies access control, because you can give developers broad rights in a development project while keeping production tightly restricted. It also makes costs easy to see, since billing reports break spending down by project. A common pattern is one project per application per environment, such as web-dev, web-test and web-prod, grouped under a folder for that product.",
   "At the bottom are the resources themselves: Compute Engine virtual machines (VMs), Cloud Storage buckets, BigQuery datasets, Pub/Sub topics, Cloud SQL instances and so on. Each resource has exactly one parent project, and through that project it sits under a folder (if any) and the organization. This single-parent rule is what makes the hierarchy predictable: for any resource, you can trace a clear path up to the organization and know exactly which policies apply to it.",
   "Policies flow downward through this path. An IAM grant or organization policy set on the organization applies to all folders, projects and resources below it, and one set on a folder applies to everything in that folder, including projects created later. The next lesson covers inheritance in detail. A common good practice is to set broad guardrails high in the hierarchy, such as which regions may be used, and to grant most day-to-day access at the folder or project level, close to the work. Granting powerful roles at the organization level should be rare and deliberate, because they reach everything.",
   "When the exam describes a company that has lost track of projects, cannot see costs by department, or worries about access when employees leave, the answer usually involves this structure: create or use the organization node, group projects into folders that reflect departments or environments, separate applications and environments into their own projects, and apply policies at the highest sensible level. Remember the order from top to bottom: organization, folders, projects, resources."
  ],
  "analogy": "The resource hierarchy works like a company's office building. The building is the organization, each floor is a folder for a department, each room on a floor is a project, and the furniture and equipment in a room are the resources. A rule posted at the building entrance, such as \"no smoking,\" applies to every floor and room. A badge that opens the third floor opens every room on it. The analogy stops working in one way that matters for the exam: in a building, a room can have its own lock that keeps out someone with a floor badge, but in Google Cloud an allow grant at a higher level cannot be taken away lower down.",
  "mnemonic": "\"Only Flexible People Rise\" gives the order from top to bottom: Organization, Folders, Projects, Resources.",
  "terms": [
   [
    "Organization node",
    "The root of the resource hierarchy, representing the company and linked to its Cloud Identity or Google Workspace domain."
   ],
   [
    "Folder",
    "A grouping of projects and other folders, often by department, team, product or environment; folders can be nested."
   ],
   [
    "Project",
    "The basic unit for enabling services, linking billing, setting IAM policies and quotas, and grouping resources; every resource belongs to exactly one."
   ],
   [
    "Project ID",
    "A globally unique, permanent identifier for a project that cannot be changed after creation."
   ],
   [
    "Project number",
    "A unique number Google assigns automatically to each project."
   ],
   [
    "Resource",
    "An individual service instance, such as a VM, bucket or dataset, that lives in one project."
   ]
  ],
  "example": "A retail company creates an organization node for example.com, folders for Stores, E-commerce and Corporate, and inside E-commerce separate projects for web-prod, web-dev and analytics. Each project links to the central billing account, and costs roll up clearly by folder. When a developer leaves, the projects stay with the company because they live under the organization node, not under the developer's personal account.",
  "mistakes": [
   [
    "Thinking a resource can belong to several projects at once so it can be shared.",
    "Every resource belongs to exactly one project. Sharing is done by granting access across projects, not by giving a resource multiple parents."
   ],
   [
    "Believing the project name is the permanent identifier.",
    "The project name is a changeable label. The project ID is the globally unique identifier that cannot be changed after creation."
   ],
   [
    "Putting folders below projects, or thinking folders hold resources directly.",
    "The order is organization, folders, projects, resources. Folders contain projects and other folders; resources always sit inside a project."
   ],
   [
    "Assuming one big project for the whole company is simplest and therefore best.",
    "One project mixes environments and teams, making access control, isolation and cost tracking harder. Separate projects per application and environment are the recommended practice."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union is starting on Google Cloud. It has three departments, each with production and development work, and the security team wants one place to forbid resources outside the United States. The finance team wants to see each department's spending. How should they structure the hierarchy?",
    "Use the organization node for the credit union's domain and set the location restriction there so it applies everywhere. Create a folder per department, optionally with Production and Development subfolders, and give each application and environment its own project. Costs can then be viewed by project and rolled up by folder, and department access can be granted once at the folder level."
   ]
  ],
  "tip": "Remember the order: organization, folders, projects, resources. Every resource lives in exactly one project, and projects are where APIs are enabled, billing is linked and quotas apply. The project ID is unique and permanent.",
  "check": [
   [
    "What is the correct order of the resource hierarchy from top to bottom?",
    "Organization, folders, projects, resources."
   ],
   [
    "Why use separate projects for production and development?",
    "To isolate them, apply different access and policies, and see their costs separately."
   ],
   [
    "What is one key benefit of having an organization node?",
    "Projects belong to the company rather than to individual employees, and administrators get central visibility and control over all projects."
   ]
  ]
 },
 {
  "t": "Policy inheritance: IAM allow policies and organization policies through the hierarchy",
  "hook": "At Juniper Health Partners, Dev, a project owner in the Research folder, messages the security team on a Friday afternoon. He removed a former contractor from his project's permissions an hour ago, yet the contractor's account still shows recent edits to a Cloud Storage bucket. Meanwhile, a junior engineer in another project is frustrated: she is a project owner, but every attempt to make a bucket public fails with a policy error she cannot override. Two puzzles, one root cause. Why can a project owner neither remove one person's access nor make one bucket public?",
  "simple": "Rules in Google Cloud trickle down, like water poured at the top of a staircase reaching every step below. If you give someone access to a whole department, they get access to every project in that department, even new ones. There are two kinds of rules. The first kind says who can do things, for example \"Sam can edit.\" These only ever add access; a lower step cannot cancel access given higher up. The second kind says what is allowed at all, for anyone, for example \"no file storage may be public.\" These are guardrails that even the boss of a project cannot break. Think of a school: the principal's rule that nobody runs in the hallway applies to every classroom, and a teacher cannot overrule it.",
  "body": [
   "One of the main benefits of the resource hierarchy is that policies are inherited. A policy set on a node applies to that node and everything beneath it. This lets administrators manage access and guardrails for thousands of resources centrally, instead of configuring each one by hand. It also means new projects and resources automatically pick up the right rules the moment they are created inside a folder, which is far more reliable than remembering to configure every new project. For the exam, you need to understand two kinds of policy that travel down the hierarchy and how they differ.",
   "Identity and Access Management (IAM) allow policies grant roles to principals. A principal is an identity such as a user, a group or a service account, and a role is a collection of permissions, such as Viewer, Editor or a more specific role like Storage Object Viewer. If you grant a group the Viewer role on a folder, the group can view every project and resource in that folder, including ones created later. A resource's effective policy is the union of the policy set on it and the policies inherited from all its ancestors: the project, any folders above it, and the organization.",
   "IAM access is additive, and this is the point the exam tests most often. A policy lower in the hierarchy can grant more access, but an allow policy cannot take away access granted higher up. For example, if a user is an Editor on a folder, removing them from a project inside the folder does nothing to stop them editing it, because the folder-level grant still flows down. To remove that access, an administrator must remove the grant where it was made, at the folder. This is why broad roles should be granted high in the hierarchy only with great care, and why the principle of least privilege applies to where you grant access as well as to what you grant.",
   "Google Cloud also offers IAM deny policies for cases where central teams need firm limits. A deny policy explicitly blocks certain permissions for certain principals, and deny rules take precedence over allow policies. If a security team wants to guarantee that nobody outside a small group can delete projects, regardless of what roles they hold, a deny policy can do that. Deny policies are the exception that lets you subtract access; ordinary allow policies only add.",
   "Organization policies are a different tool with a different purpose. Instead of controlling who can do something, they control what can be done, for everyone, regardless of IAM roles. They are set using constraints through the Organization Policy Service. Examples include restricting which regions resources can be created in, preventing public access to Cloud Storage buckets, disabling the creation of service account keys, and restricting which external domains can be granted access to resources. When a project owner tries to break one of these rules, the action fails with an error that names the violated constraint, even though the owner has every IAM permission needed.",
   "Organization policies are also inherited down the hierarchy. Depending on the constraint, a lower level can be allowed to customize the policy, merge its own values with the inherited ones, or simply inherit what is set above. In practice, central security teams usually set the strictest guardrails at the organization node and allow exceptions, where truly needed, on specific folders or projects. For example, a company might disable external sharing everywhere but allow it on one folder that holds a public dataset.",
   "It helps to see the two side by side. An IAM allow policy answers \"Who can act on this resource, and with which role?\" An organization policy answers \"What configurations are permitted here at all?\" A user with the Owner role on a project can still be blocked by an organization policy, and an organization policy never grants anyone permission to do anything. They work as layers, not substitutes.",
   "Together they form the governance model of Google Cloud. Organization policies set guardrails that even project owners cannot break, IAM allow policies decide who can act within those guardrails, and deny policies provide firm exceptions when central teams must guarantee a limit. When an exam question describes a need such as \"ensure no one in the company can create resources outside Europe,\" look for an organization policy. When it describes \"give the analytics team read access to all projects in a folder,\" look for an IAM grant on the folder."
  ],
  "analogy": "Picture a company building with keycards. An IAM allow grant is a keycard: one that opens a whole floor also opens every room on that floor, and taping a \"keep out\" note on one room's door does not stop the card from working. You must take back the floor card. A deny policy is a security guard posted at a door who turns away specific people no matter what card they carry. An organization policy is the building code: no one, not even the floor manager, may prop open a fire door. The analogy stops short in one place: building codes are fixed by law, while organization policies can be customized for specific folders when the constraint allows it.",
  "terms": [
   [
    "Policy inheritance",
    "Policies set on a node apply to that node and all of its descendants in the hierarchy."
   ],
   [
    "IAM allow policy",
    "A policy that grants roles to principals on a resource; grants are inherited and additive."
   ],
   [
    "IAM deny policy",
    "A policy that explicitly blocks specific permissions for specific principals and takes precedence over allow policies."
   ],
   [
    "Organization policy",
    "A constraint that restricts how resources can be configured, for everyone, regardless of IAM roles."
   ],
   [
    "Additive access",
    "Effective permissions are the union of all grants at a resource and its ancestors."
   ],
   [
    "Principal",
    "An identity that can be granted access, such as a user, group or service account."
   ]
  ],
  "example": "A bank sets an organization policy at the organization node that blocks public access to Cloud Storage and restricts resources to two regions. Even a project owner in a development folder cannot create a public bucket or a VM in another region, while IAM still decides who can create resources at all. The security team also grants its auditors the Viewer role once on the organization, so they can see every current and future project without per-project setup.",
  "mistakes": [
   [
    "Removing a user from a project's allow policy will stop access they were granted on the parent folder.",
    "Allow policies are additive and inherited. The folder grant still flows down, so you must remove it at the folder, or block the permission with a deny policy."
   ],
   [
    "An organization policy is a way to give a team permissions across the company.",
    "Organization policies never grant permissions; they restrict what configurations are allowed for everyone. Permissions come from IAM roles."
   ],
   [
    "A project Owner can override any restriction in their own project.",
    "Owners are still bound by organization policies and deny policies set above them. That is precisely what makes those guardrails useful."
   ],
   [
    "Policies only apply to resources that existed when the policy was set.",
    "Inherited policies apply automatically to new folders, projects and resources created beneath the node."
   ]
  ],
  "tryit": [
   [
    "Coral Bay Insurance must ensure that no service account keys are ever created anywhere in the company, because leaked keys have caused problems elsewhere. Separately, the data science team needs read access to every project in the Analytics folder, including future ones. Which mechanism fits each requirement?",
    "Use an organization policy at the organization node with the constraint that disables service account key creation; it applies to everyone regardless of role. For the data science team, grant the appropriate viewer role to their group on the Analytics folder with an IAM allow policy, so the access is inherited by every current and future project in that folder."
   ],
   [
    "A user holds Editor on the Marketing folder. The owner of one project in that folder wants to stop the user from editing just that project, but cannot change the folder's policy. What options exist?",
    "Removing the user from the project's allow policy will not work, because access is additive. Either a folder administrator removes or narrows the folder grant, or an administrator applies an IAM deny policy that blocks the relevant permissions for that user on the project."
   ]
  ],
  "tip": "IAM controls who can do what; organization policies control what can be configured, for everyone. IAM allow grants are additive, so a grant at a folder cannot be removed at a project below it; remove it where it was granted or use a deny policy.",
  "check": [
   [
    "A user has Editor on a folder. Can a project owner remove that access for one project in the folder with an allow policy?",
    "No. Allow policies are additive and inherited; access must be removed where it was granted (or blocked with a deny policy)."
   ],
   [
    "How does an organization policy differ from an IAM role?",
    "An organization policy restricts what configurations are allowed for everyone; an IAM role grants permissions to specific principals."
   ],
   [
    "Which takes precedence when a deny policy and an allow policy conflict?",
    "The deny policy. Deny rules override allow grants for the permissions and principals they cover."
   ]
  ]
 },
 {
  "t": "Controlling costs: billing accounts, budgets and alerts, quotas, labels and billing export",
  "hook": "On the first Monday of the month, Lena, the finance manager at Brightwater Media, opens the cloud invoice and stops scrolling. It is nearly three times last month's total. Her email to the engineering lead is short: \"We set a budget. Why didn't it stop this?\" The engineers find a forgotten load test still running in a sandbox project, but nobody can say which team owns half the other charges, because resources were never tagged. The chief financial officer wants answers by Friday, and a plan so this never happens again. Which Google Cloud tools would have warned them, which would have limited the damage, and which would have shown who spent what?",
  "simple": "Paying for the cloud is a bit like a family phone plan. One account pays the bill, and each family member's phone is attached to it. A budget is like setting a reminder that texts you when the bill reaches half or nearly all of what you planned, but it does not cut off anyone's phone. A quota is a hard limit on how much of something can be used, such as a cap on how many computers one project can run at once. Labels are like name stickers on each item, such as \"team: marketing,\" so you can later see who used what. Billing export copies all the detailed charges into a database where you can study them.",
  "body": [
   "Google Cloud provides several tools to see, allocate and control spending, and they work best together. The Cloud Digital Leader exam often tests what each one does and, just as importantly, what it does not do. A common trap is assuming a tool that reports or warns will also stop spending. As you read, keep asking: does this tool show cost, assign cost, warn about cost or limit usage?",
   "A Cloud Billing account pays for usage. It is linked to a payment method and to one or more projects, and each project is linked to one billing account at a time. Many organizations use a single central billing account for all projects, while others use several to separate business units or subsidiaries. Access to billing is controlled separately from access to resources, with Identity and Access Management (IAM) roles such as Billing Account Administrator, Billing Account User and Billing Account Viewer. This separation means finance staff can see costs and invoices without being able to change virtual machines, and engineers can build without seeing the company's payment details.",
   "Budgets and budget alerts let you set a planned amount and be warned as spending approaches it. A budget can cover a whole billing account or be scoped to specific projects, services, or resources with certain labels. You choose thresholds, such as 50%, 90% and 100%, and alerts can be triggered by actual spend or by forecast spend, which warns you early if the current trend will exceed the budget before the month ends. Notifications go by email to billing administrators and other chosen recipients. The crucial exam fact is that budgets do not automatically stop resources or cap spending. If you need automatic action, you can send budget notifications to Pub/Sub and trigger automation, for example a Cloud Run function that disables billing on a sandbox project or scales down noncritical resources. That automation is something you build; it is not the budget itself.",
   "Quotas limit how much of a resource a project can use, such as the number of virtual CPUs (vCPUs) in a region, the number of IP addresses, or API requests per minute. Quotas exist to protect both customers and Google Cloud from unexpected spikes, runaway scripts or abuse. Because they cap usage, they can indirectly limit spending, but that is a side effect rather than their main purpose. Some quotas can be increased by request through the console when a project legitimately needs more, and administrators can lower some quotas to set tighter limits, for example capping how much a test project can consume. When a quota is reached, requests fail with a quota-exceeded error rather than generating more charges.",
   "Labels are key-value pairs, such as `team=marketing`, `env=prod` or `cost-center=4410`, attached to resources. They appear in billing data, so costs can be grouped and filtered by team, application, environment or any other dimension the organization cares about. A consistent labeling strategy is essential for cost allocation, often called showback or chargeback when costs are reported or billed to internal teams. Labels only help if they are applied consistently, so many organizations define a required set of labels and check for them in their deployment pipelines. Separate projects also give a natural cost boundary, and labels add finer detail within a project.",
   "Visibility comes from reports and exported data. Billing reports in the console show spending trends and breakdowns by project, service, region, SKU and label, with filters and forecasts. For deeper analysis, Cloud Billing export sends detailed usage and cost data to BigQuery, where it can be queried with SQL and visualized in Looker Studio. Export is how organizations build custom dashboards, join cost data with business data, or keep long-term history. Export must be enabled to start collecting data, so it is best turned on early. Before building anything, the Google Cloud Pricing Calculator estimates the cost of a planned architecture.",
   "Putting it together, a sensible cost-control setup looks like this: a billing account with tightly controlled billing roles; projects organized so cost boundaries match teams or applications; required labels for finer allocation; budgets with actual and forecast alerts on each important project; quotas tightened on sandboxes; billing export to BigQuery for analysis; and, where appropriate, Pub/Sub-triggered automation for projects where an automatic stop is acceptable. On the exam, match the goal to the tool: warn about spending with budgets, limit usage with quotas, allocate costs with labels or projects, analyze in detail with billing export, and estimate in advance with the Pricing Calculator."
  ],
  "analogy": "Think of cloud cost controls as the tools for managing a household's electricity. The billing account is the utility account that pays. A budget alert is the utility app texting you when this month's usage passes a level you chose; it warns you, but the lights stay on. A quota is the circuit breaker on one circuit: it trips and stops further draw. Labels are like separate meters for the house and the rented-out garage, so you know who used what. Billing export is downloading every meter reading into a spreadsheet. The analogy breaks slightly because quotas exist mainly for protection and capacity planning, not to cap your bill.",
  "terms": [
   [
    "Cloud Billing account",
    "The account that pays for Google Cloud usage, linked to projects and a payment method; each project links to one billing account at a time."
   ],
   [
    "Budget alert",
    "A notification sent when actual or forecast spend reaches a threshold; it does not stop spending."
   ],
   [
    "Quota",
    "A limit on how much of a resource or API a project can use."
   ],
   [
    "Label",
    "A key-value pair attached to resources, used to organize resources and allocate costs."
   ],
   [
    "Cloud Billing export",
    "A feature that sends detailed cost and usage data to BigQuery for analysis."
   ],
   [
    "Pricing Calculator",
    "A tool that estimates the cost of Google Cloud resources before you deploy them."
   ]
  ],
  "example": "A university gives each research group its own project with a budget and alerts at 50% and 90% of actual spend, plus a forecast alert at 100%. Resources carry labels for grant number, and billing data is exported to BigQuery so the finance office can charge each grant accurately each month. A sandbox project uses a Pub/Sub-triggered function to disable billing when its budget is exceeded, and its vCPU quota is lowered so a runaway script cannot launch hundreds of machines.",
  "mistakes": [
   [
    "Setting a budget will stop resources or cap the bill when the amount is reached.",
    "Budgets only send alerts. Automatic action requires automation you build, such as a function triggered by budget notifications on Pub/Sub."
   ],
   [
    "Labels limit spending for a team.",
    "Labels only organize and allocate cost in billing data. They do not restrict usage; quotas and budgets with automation do that."
   ],
   [
    "Quotas are a billing feature mainly meant to control cost.",
    "Quotas primarily protect customers and Google Cloud from spikes and abuse by limiting resource usage. Limiting cost is an indirect effect."
   ],
   [
    "Billing reports in the console are enough for any custom analysis.",
    "For detailed queries, joins with business data or long-term history, enable Cloud Billing export to BigQuery."
   ]
  ],
  "tryit": [
   [
    "Maple Ridge Schools runs a sandbox project where students experiment. The district can tolerate the sandbox shutting down unexpectedly but must never receive a surprise bill from it. Its production project must never be shut down automatically. What should they configure for each?",
    "For the sandbox: a budget with alerts, notifications published to Pub/Sub that trigger a function to disable billing when the budget is exceeded, and lowered quotas to limit how much can be launched. For production: a budget with actual and forecast alerts sent to the right people, but no automatic shutdown, because stopping production would hurt the business more than the overspend."
   ]
  ],
  "tip": "Budgets alert, they do not cap. Quotas limit resource use. Labels allocate cost. Billing export to BigQuery enables detailed analysis. The Pricing Calculator estimates before you build. Know which tool fits each goal.",
  "check": [
   [
    "Will a budget automatically stop resources when it is exceeded?",
    "No. Budgets send alerts; automatic action requires automation, for example through Pub/Sub notifications."
   ],
   [
    "How can a company see cloud costs by team?",
    "Apply labels such as team to resources (or use separate projects), then group billing reports or exported billing data by those labels."
   ],
   [
    "Why might finance staff be given the Billing Account Viewer role rather than a project role?",
    "It lets them see costs and invoices without being able to change any cloud resources, following least privilege."
   ]
  ]
 },
 {
  "t": "Pricing models and discounts: pay-as-you-go, sustained use discounts, committed use discounts and Spot VMs",
  "hook": "Rosa runs infrastructure at Quillfeather Animation, a small studio that just moved to Google Cloud. Her monthly review lists three very different workloads: a customer database that has run around the clock for two years and will keep doing so, a rendering farm that crunches frames overnight and can restart any frame that fails, and a new streaming preview service whose traffic nobody can predict. Right now everything runs at standard on-demand prices, and the studio's owner asks a pointed question in the hallway: \"Are we paying full price for things we could get cheaper?\" Which pricing option fits each workload, and what does each discount cost the studio in flexibility?",
  "simple": "Cloud pricing is a lot like paying for rides. Pay-as-you-go is like hailing a taxi: you pay for each trip, with no promise to ride again, which is perfect when you do not know your plans. A committed use discount is like buying a yearly transit pass: much cheaper per ride, but you pay for it even on days you stay home. A sustained use discount is like a coffee shop that automatically gives regulars a lower price the more they visit in a month, with no sign-up. A Spot VM is like a standby airline seat: very cheap, but you can be bumped if a full-fare passenger needs it. Pick the option that matches how steady and how interruptible your work is.",
  "body": [
   "Google Cloud's default pricing is pay-as-you-go: you pay for the resources you use, with no up-front commitment, and most compute is billed per second after a short minimum. This model suits new, variable or unpredictable workloads, experiments and anything you might turn off soon. It is also the baseline against which every discount is measured. Google Cloud offers several ways to pay less when your usage has particular patterns, and the Cloud Digital Leader exam expects you to match each option to a scenario based on two questions: how steady is the workload, and can it tolerate interruption?",
   "Sustained use discounts are applied automatically to certain Compute Engine resources that run for a significant portion of the billing month. The longer they run in the month, the bigger the discount, which rewards workloads that stay on without requiring any planning. No commitment or sign-up is needed, and you see the discount as a credit on your bill. The limitation is scope: they apply only to some machine types, and some newer machine families do not receive them. On the exam, the key words are \"automatic\" and \"no commitment.\"",
   "Committed use discounts (CUDs) give a lower price in exchange for committing to use a certain amount of resources, or to spend a certain amount, for one or three years. Three-year commitments give larger discounts than one-year ones. Resource-based commitments cover specific amounts of virtual CPU (vCPU), memory and certain other resources in a region for Compute Engine. Spend-based commitments apply to a committed hourly spend on services such as Cloud SQL or Cloud Run. CUDs suit steady, predictable workloads that you are confident will keep running for the whole term, such as production databases or core application servers. The trade-off is that you pay for the commitment even if you use less, so committing to more than you need wastes money. A sensible approach is to commit only to the baseline you are sure of and cover peaks with pay-as-you-go and autoscaling.",
   "Spot VMs use Google Cloud's spare capacity at a large discount compared with standard VMs. The catch is that Google can stop, or preempt, them at any time when it needs the capacity back, with only a short warning so the workload can save state. There is no guarantee a Spot VM will be available when you ask for one. They suit fault-tolerant, flexible work such as batch processing, video rendering, testing and continuous integration jobs, and some data analysis or machine learning (ML) training that can checkpoint progress and resume. They are not suitable for workloads that must run without interruption, such as a primary database or a customer-facing service without redundancy. Preemptible VMs were the earlier version of this option, and you may still see the term.",
   "It helps to compare the options by what you give up. Pay-as-you-go gives up nothing and costs the most per unit. Sustained use discounts ask nothing of you but apply only to eligible resources that run much of the month. Committed use discounts ask for a long-term promise of usage or spend. Spot VMs ask you to accept that your machine can disappear. A mature organization usually combines them: commitments for the steady baseline, Spot VMs for interruptible batch work, and pay-as-you-go with autoscaling for variable demand.",
   "Discounts are only part of cost optimization. Other levers include rightsizing machines using recommendations from the Recommender service, which suggests smaller machine types when VMs are underused; autoscaling so capacity follows demand instead of sitting idle; choosing the right Cloud Storage class for how often data is accessed; using serverless services such as Cloud Run that can scale to zero when there is no traffic; deleting idle resources such as unattached disks; and choosing lower-priced regions when location does not matter for latency or compliance. Often the cheapest VM is the one you turn off.",
   "When you meet a pricing question on the exam, look for the workload's pattern. \"Runs continuously for years, predictable\" points to committed use discounts. \"Can be interrupted, batch, fault-tolerant\" points to Spot VMs. \"Runs most of the month, no commitment wanted\" points to sustained use discounts. \"New, unpredictable, short-lived\" points to pay-as-you-go. Avoid exact percentages; they vary by resource and change over time, so the exam focuses on the trade-offs."
  ],
  "analogy": "Choosing cloud pricing is like choosing how to rent a car. Pay-as-you-go is the daily rental counter: flexible, priciest per day. A committed use discount is a multi-year lease: much cheaper per month, but you keep paying even if the car sits in the driveway. A sustained use discount is a rental company that quietly lowers your daily rate the longer you keep the car this month. A Spot VM is borrowing a friend's spare car for free-ish, knowing they may ask for it back with a few minutes' notice. Where it stops: a car lease is one vehicle, while spend-based commitments cover an amount of spending across a service.",
  "terms": [
   [
    "Pay-as-you-go",
    "Paying only for resources used, with no up-front commitment; often called on-demand pricing."
   ],
   [
    "Sustained use discount",
    "An automatic discount for certain Compute Engine resources that run for a significant portion of a month."
   ],
   [
    "Committed use discount (CUD)",
    "A lower price in exchange for a one- or three-year commitment to resources or spend, paid even if usage is lower."
   ],
   [
    "Spot VM",
    "A heavily discounted VM using spare capacity that Google can stop at any time; the successor to preemptible VMs."
   ],
   [
    "Preemption",
    "Google stopping a Spot VM to reclaim capacity, with a short warning."
   ],
   [
    "Rightsizing",
    "Adjusting resource size to match actual usage, often guided by recommendations."
   ]
  ],
  "example": "A media company runs its always-on production database under a three-year committed use discount sized to its steady baseline, renders video overnight on Spot VMs that checkpoint and restart if interrupted, and runs its variable web front end on autoscaled pay-as-you-go instances. A monthly review of rightsizing recommendations trims oversized development VMs.",
  "mistakes": [
   [
    "Spot VMs are a good way to save money on a production database.",
    "Spot VMs can be preempted at any time with little warning. Use them for fault-tolerant, interruptible work, not services that must stay up."
   ],
   [
    "Committed use discounts are flexible; you only pay for what you actually use.",
    "With a CUD you pay for the committed amount for the full term even if you use less. Commit only to a baseline you are confident in."
   ],
   [
    "You must sign up or commit to receive sustained use discounts.",
    "Sustained use discounts are applied automatically to eligible resources that run much of the month. No commitment is required."
   ],
   [
    "Pay-as-you-go is always the most expensive and therefore wrong.",
    "It costs more per unit, but it is the right choice for new, unpredictable or short-lived workloads where a commitment would be wasted."
   ]
  ],
  "tryit": [
   [
    "Pine Hollow Genomics runs DNA sequence analysis jobs that take several hours each. The pipeline saves progress every ten minutes and can restart from the last checkpoint. Results are needed within a few days, not immediately. The team also has a results database that must stay online for researchers. How should each be priced?",
    "The analysis jobs are fault-tolerant and flexible, so Spot VMs fit: a preemption only loses up to ten minutes of work, and the savings are large. The results database must stay available, so it should run on standard VMs or a managed database, and if its usage is steady for years, a committed use discount reduces its cost."
   ]
  ],
  "tip": "Steady and predictable for years: committed use discounts. Fault-tolerant and interruptible: Spot VMs. Automatic, no commitment: sustained use discounts. New or unpredictable: pay-as-you-go. Combine them for the best result.",
  "check": [
   [
    "Why is a Spot VM a poor choice for a primary database?",
    "Google can stop Spot VMs at any time, which would interrupt a service that must stay available."
   ],
   [
    "What must a customer give in exchange for a committed use discount?",
    "A commitment to use a set amount of resources or spend for one or three years, paid even if usage is lower."
   ],
   [
    "Which discount requires no action at all from the customer?",
    "Sustained use discounts, which are applied automatically to eligible Compute Engine resources that run for much of the month."
   ]
  ]
 },
 {
  "t": "DevOps and Site Reliability Engineering (SRE) principles",
  "hook": "It is 2 a.m. at Fernhill Savings, and Omar on the operations team is staring at an outage page. A release went out at midnight; the developers who wrote it are asleep, and the deployment checklist shows two manual steps marked as skipped. By morning the service is back, and the meeting begins with the question everyone dreads: \"Whose fault was this?\" The developers say operations deployed it wrong. Operations says developers ship too fast. Both teams have heard this argument before. What would it take to make releases both faster and safer, and to stop asking who to blame?",
  "simple": "Imagine a restaurant where the cooks want to try new dishes every night, but the waiters want the menu to stay the same so nothing goes wrong. They argue constantly. DevOps is the idea that cooks and waiters should work as one team with the same goal: happy diners. They make small changes often, use checklists and machines to avoid mistakes, and watch how diners react. Site Reliability Engineering, or SRE, is Google's own recipe for doing this. It sets a clear target for how reliable a service must be, uses machines to handle boring repeat chores, and, when something goes wrong, asks \"what in our process failed?\" instead of \"who messed up?\"",
  "body": [
   "Traditionally, developers wanted to release new features quickly, while operations teams wanted stability and resisted change, because most outages follow changes. The result was slow, risky releases, friction between teams and a culture of blame. Large releases bundled months of changes together, so when something broke, it was hard to find the cause. DevOps and Site Reliability Engineering (SRE) are approaches that resolve this tension, and the Cloud Digital Leader exam expects you to know their main ideas and recognize their vocabulary.",
   "DevOps is a culture and set of practices that bring development and operations together with shared goals and shared responsibility for running software. Key practices include small, frequent releases, which are easier to test and to roll back; automation of building, testing and deployment through continuous integration and continuous delivery (CI/CD); infrastructure as code, which defines servers and networks in version-controlled files instead of manual console clicks; monitoring and fast feedback from production; and collaboration across teams. The aim is to deliver value to users faster and more reliably at the same time, proving that speed and stability need not be opposites. In a DevOps team, the people who build a service also share responsibility for how it behaves in production, so they see the effects of their changes directly and are motivated to make them safe. Measuring outcomes such as how often the team deploys and how quickly it recovers from failures helps show whether these practices are working.",
   "SRE is Google's way of running production systems, developed internally and shared publicly through books and practices. It is often described as a specific implementation of DevOps ideas: if DevOps describes what a healthy culture looks like, SRE prescribes concrete ways to get there. SRE treats operations as a software engineering problem. Instead of hiring more people to handle more systems by hand, site reliability engineers write software and automation to run systems reliably at scale. A common SRE practice is to cap the share of time engineers spend on manual operational work so that the rest goes into engineering improvements.",
   "Several core principles define SRE. First, reliability targets are defined with service level objectives (SLOs) based on what users actually need, rather than aiming for 100%, which is extremely expensive and slows change. Second, error budgets, the amount of unreliability an SLO allows, are used to balance feature releases against reliability: while budget remains, teams ship; when it runs out, they focus on stability. Third, toil, the repetitive, manual work that scales with the service and has no lasting value, is measured and reduced by automating it. Fourth, monitoring focuses on the signals that matter to users, such as latency, errors, traffic and saturation, so alerts point to real user pain rather than noise. The next lesson explores SLOs and error budgets in detail.",
   "SRE also emphasizes safer change. Gradual rollouts release a change to a small share of users or servers first, sometimes called a canary, and expand only if metrics stay healthy. Quick rollback means a bad change can be undone in minutes, ideally automatically when error rates rise. Because most incidents follow changes, making changes small, observable and reversible is one of the most effective ways to improve reliability.",
   "When incidents do happen, SRE teams run blameless postmortems. A postmortem is a written review of what happened, its impact, the timeline, the root causes and the actions that will prevent a repeat. Blameless means the review focuses on systems and processes, not on punishing individuals. If people fear blame, they hide mistakes and the same weaknesses remain. When they feel safe, they explain exactly what happened, and the organization can fix the underlying causes, such as a manual step that should be automated or a missing alert. Postmortems are shared widely so other teams learn too.",
   "For organizations moving to the cloud, these practices matter as much as the technology. Managed services reduce toil because Google handles patching, scaling and hardware. CI/CD tools such as Cloud Build and Cloud Deploy automate delivery. Google Cloud Observability provides the monitoring, logging and alerting that SRE depends on. Adopting DevOps and SRE also usually means cultural change: accepting that failure will happen, learning from it openly, measuring reliability from the user's point of view and sharing responsibility for reliability between developers and operators. On the exam, recognize the keywords: SLOs, error budgets, toil reduction, automation, gradual rollouts and blameless postmortems all point to SRE."
  ],
  "analogy": "SRE treats reliability the way an airline treats safety. Pilots and mechanics share one goal; checklists and automation catch routine errors; changes to procedures roll out carefully; and after any incident, investigators look for what in the system allowed it, not for someone to fire, because people who fear punishment stop reporting near misses. Where the analogy stops: airlines aim for as close to zero failures as possible, while SRE deliberately sets a reliability target below 100% and spends the remaining error budget on releasing features.",
  "terms": [
   [
    "DevOps",
    "A culture and set of practices uniting development and operations to deliver changes quickly and reliably."
   ],
   [
    "Site Reliability Engineering (SRE)",
    "Google's approach to running reliable systems by applying software engineering to operations."
   ],
   [
    "CI/CD",
    "Continuous integration and continuous delivery: automating the building, testing and deployment of code."
   ],
   [
    "Toil",
    "Manual, repetitive operational work that scales with the service, has no lasting value and can be automated."
   ],
   [
    "Blameless postmortem",
    "An incident review that focuses on causes and fixes, not on blaming individuals."
   ],
   [
    "Gradual rollout",
    "Releasing a change to a small portion of users or servers first and expanding only if it stays healthy."
   ]
  ],
  "example": "After a failed release causes an outage, an online bank holds a blameless postmortem. It finds that manual deployment steps were skipped, automates the deployment with a CI/CD pipeline, adds a canary stage and automatic rollback when error rates rise, and sets an SLO for its login service. The postmortem is shared with all engineering teams.",
  "mistakes": [
   [
    "SRE aims for 100% reliability.",
    "SRE sets SLOs based on what users need, deliberately below 100%, because perfect reliability is extremely costly and blocks change. The gap is the error budget."
   ],
   [
    "A postmortem's purpose is to identify who caused the outage.",
    "Postmortems are blameless: they find systemic causes and preventive actions so people report honestly and the organization actually improves."
   ],
   [
    "DevOps is a tool or product you install.",
    "DevOps is a culture and set of practices. Tools such as CI/CD pipelines support it, but they do not create the culture."
   ],
   [
    "Toil means any operational work, including designing systems.",
    "Toil is specifically manual, repetitive work that scales with the service and has no lasting value. Engineering work that improves the system is not toil."
   ]
  ],
  "tryit": [
   [
    "At Elmstead Retail, engineers spend hours every week manually restarting a service, copying logs and resizing disks. Releases happen once a quarter and often break things. Leadership asks for one SRE-inspired change for each problem. What would you suggest?",
    "The manual restarts, log copying and disk resizing are toil, so automate them or move to managed services that handle them, freeing engineering time. For releases, adopt CI/CD to release smaller changes more often, with gradual rollouts and automatic rollback, so each release is lower risk and easier to undo."
   ]
  ],
  "tip": "SRE is Google's implementation of DevOps principles. Keywords to recognize: SLOs, error budgets, toil reduction, automation, gradual rollouts and blameless postmortems. DevOps is a culture, not a product.",
  "check": [
   [
    "What is toil in SRE, and what should be done about it?",
    "Repetitive manual operational work that scales with the service; SRE teams automate it to free time for engineering."
   ],
   [
    "Why are postmortems blameless?",
    "So people share what really happened, allowing the organization to fix the systemic causes rather than hide problems."
   ],
   [
    "How do small, frequent releases improve reliability?",
    "Each change is smaller, easier to test and easier to roll back, and when something breaks the cause is easier to find."
   ]
  ]
 },
 {
  "t": "SLIs, SLOs, SLAs and error budgets",
  "hook": "Halfway through the month at Lantern Payments, Aiko, the engineering manager, gets two messages within an hour. The product team wants to launch a new checkout feature tomorrow. The reliability dashboard shows that a bad release last week already used most of this month's error budget for the payments API. The product lead argues that customers want the feature; the on-call lead argues that one more incident could breach the contract with Lantern's largest merchant. Both are right about something. Without shared numbers, this becomes a shouting match. How can a team turn \"is it reliable enough to ship?\" into a decision everyone accepts?",
  "simple": "Think of a pizza shop that promises delivery in 30 minutes. Measuring how long each delivery actually takes is the indicator (SLI). The shop's own internal goal, say 98 out of 100 pizzas arriving within 30 minutes, is the objective (SLO). The printed promise to customers, \"late pizza is free,\" is the agreement (SLA), and it has a real cost when broken. The shop sets its internal goal stricter than its public promise so it notices trouble before giving away pizzas. The error budget is the 2 pizzas in 100 that are allowed to be late. If the shop has already used them this month, it stops trying risky new recipes until things settle down.",
  "body": [
   "Reliability needs to be measured and agreed, not just hoped for. Site Reliability Engineering (SRE) uses a small set of terms that the Cloud Digital Leader exam tests directly. They build on one another: you measure something (the indicator), set a goal for it (the objective), may promise customers a level of it (the agreement), and use the gap between perfection and your goal as a budget for risk. Getting the order and the purpose of each term straight is most of the battle.",
   "A service level indicator (SLI) is a carefully chosen measurement of some aspect of the service that users care about. Common SLIs are availability, measured as the proportion of successful requests; latency, measured as the proportion of requests faster than a threshold, such as 300 milliseconds; and the correctness or freshness of data. Good SLIs reflect user experience rather than internal details: CPU usage is rarely a good SLI, because users do not feel CPU, but they do feel slow or failed requests. An SLI is a number you measure, usually as a ratio of good events to total events, for example: 99.95% of requests succeeded in the last 30 days. In Cloud Monitoring, you can define SLIs from metrics your services already produce.",
   "A service level objective (SLO) is the target value for an SLI over a period of time, for example: 99.9% of requests will succeed over a rolling 30 days. SLOs are internal goals chosen by the service owner, based on what users actually need, and agreed with the product and business teams. Aiming for 100% is almost never right. It is extremely expensive, because each additional \"nine\" of reliability costs far more than the last; it slows change, because every release is a risk; and users usually cannot tell the difference beyond a certain point, because their own devices, home networks and mobile connections are less reliable than the service. A well-chosen SLO is the point where users are happy and the business can still move.",
   "A service level agreement (SLA) is a formal contract with customers that states a level of service and the consequences if the provider fails to meet it, typically financial credits. Google Cloud publishes SLAs for many of its services, stating availability commitments and the credits customers can claim if they are missed. Companies building on Google Cloud often offer SLAs to their own customers. SLAs are usually looser than internal SLOs. If your SLO is 99.95% and your SLA is 99.9%, missing the SLO is an early warning that triggers action, and the team can fix problems before they become a contractual breach that costs money and trust. Not every service needs an SLA, but every important service should have SLOs.",
   "The error budget is the amount of unreliability an SLO allows: 100% minus the SLO. With a 99.9% availability SLO, the error budget is 0.1% of requests, or about 43 minutes of full downtime in 30 days. The budget is consumed by anything that hurts the SLI, such as failed releases, infrastructure problems or dependency outages. Teams track how much budget remains, and a fast rate of consumption, often called a high burn rate, is a strong signal for alerting.",
   "The error budget turns reliability into a shared decision tool. While budget remains, the team can release new features, run experiments and take reasonable risks, because the users' needs are being met. If the budget is used up, the team slows or freezes feature releases and focuses on reliability work, such as fixing the causes of recent incidents, improving tests or adding automatic rollback, until the service is back within its objective. Because developers and operators agree on this policy in advance, the conversation shifts from opinion to data. Developers gain a clear license to move fast when things are healthy, and operators gain an agreed brake when they are not. This aligns the two groups instead of pitting speed against stability.",
   "For the exam, keep the chain clear. SLI is what you measure. SLO is your internal target for that measurement. SLA is the external contract with consequences. Error budget equals 100% minus the SLO and governs how much risk you can take. When a scenario says a team keeps missing its targets but launches features anyway, the SRE answer is to use an error budget policy. When a scenario asks why an SLA is set lower than an SLO, the answer is to leave room to detect and fix problems before breaching the contract."
  ],
  "analogy": "An error budget works like a household's monthly spending allowance for fun. The SLO is the savings goal; whatever you are allowed to spend without missing that goal is the budget. Early in the month you can splurge on a new gadget, which is like releasing new features. If an unexpected car repair eats the allowance, which is like an outage, you stop buying extras until next month. The SLA is a loan agreement with a bank: missing it carries a penalty, so you keep your own goal stricter. Where it stops: an error budget is measured in failed requests or downtime, and it usually refills over a rolling window rather than on a fixed payday.",
  "mnemonic": "\"I Object Aloud\": Indicator (what you measure), Objective (your internal target), Agreement (the external contract). The order builds from measurement to promise.",
  "terms": [
   [
    "SLI",
    "Service level indicator: a measurement of service behavior users care about, such as the percentage of successful requests."
   ],
   [
    "SLO",
    "Service level objective: an internal target for an SLI over a period of time."
   ],
   [
    "SLA",
    "Service level agreement: a contract with customers stating consequences, such as credits, if a service level is not met."
   ],
   [
    "Error budget",
    "The allowed unreliability under an SLO, equal to 100% minus the SLO."
   ],
   [
    "Burn rate",
    "How quickly a service is consuming its error budget relative to the period."
   ],
   [
    "Error budget policy",
    "An agreed plan for what the team does, such as freezing releases, when the error budget is exhausted."
   ]
  ],
  "example": "A payments API has an SLO of 99.95% successful requests over 30 days and an SLA with merchants of 99.9%. Halfway through the month, a bad release uses 80% of the error budget. Following its error budget policy, the team pauses new feature launches, adds automated rollback and improves its release tests, and resumes launches once reliability is back on track, well before any SLA credits are owed.",
  "mistakes": [
   [
    "The SLA should be stricter than the SLO to show commitment to customers.",
    "The SLA is usually looser than the internal SLO so the team gets an early warning and can fix problems before breaching the contract."
   ],
   [
    "An SLI is the target, such as 99.9%.",
    "The SLI is the measurement itself. The target for it is the SLO."
   ],
   [
    "The best SLO is 100% availability.",
    "100% is extremely costly, slows change and is indistinguishable to users beyond a point. SLOs are set to what users actually need."
   ],
   [
    "Error budgets exist so operations can block developers.",
    "Error budgets are shared by both groups: they give developers freedom to ship while budget remains and give everyone an agreed signal to focus on reliability when it runs out."
   ]
  ],
  "tryit": [
   [
    "Stonebridge Tickets has an availability SLO of 99.5% over 30 days for its booking service. In week two, an outage has used about two-thirds of the error budget, and marketing wants to launch a big new feature with heavy traffic next week. What should the team do, and how would you calculate the original error budget?",
    "The error budget is 100% minus 99.5%, which is 0.5% of requests, or roughly 3.6 hours of full downtime in 30 days. With two-thirds already spent early in the month, launching a risky feature could exhaust the budget. Following an error budget policy, the team should prioritize reliability work, consider a gradual rollout with fast rollback if the launch cannot move, and agree on the decision with product using the budget data."
   ]
  ],
  "tip": "SLI is what you measure, SLO is your internal target, SLA is the external contract with penalties. Error budget = 100% minus SLO. SLAs are usually looser than SLOs. When the budget is spent, slow releases and fix reliability.",
  "check": [
   [
    "A service's SLO is 99.9% availability. What is its error budget?",
    "0.1% of requests (or time) in the measurement period, about 43 minutes of full downtime over 30 days."
   ],
   [
    "Why should an SLA usually be looser than the internal SLO?",
    "So the team detects and fixes problems when it misses its internal target, before breaching the customer contract."
   ],
   [
    "Which is a better SLI for a web store: server CPU usage or the proportion of checkout requests completed in under one second?",
    "The proportion of fast checkout requests, because it reflects what users actually experience."
   ]
  ]
 },
 {
  "t": "Reliability and disaster recovery: redundancy across zones and regions, backups, RTO and RPO",
  "hook": "At Northwind Clinics, the chief operating officer, Grace, asks the cloud team a simple question in the quarterly risk review: \"If our patient scheduling system went down tonight, how long until it is back, and how much booking data would we lose?\" The team answers with confidence about servers spread across zones. Then Grace asks what happens if an entire region is unavailable, or if someone accidentally deletes the database. The room goes quiet. Nobody has ever restored from the backups, and nobody has written down how much downtime the clinics can tolerate. What should the team have decided, built and tested before tonight?",
  "simple": "Things break, so you plan for it. Keeping a service running when one part fails is like a car carrying a spare tire: a flat does not end the trip. In the cloud, that means running copies of your app in more than one data center so another copy takes over. Recovering from a big disaster is different, like your house flooding. You need copies of important papers stored somewhere else, and a plan to move in somewhere new. Two numbers guide that plan. One is how long you can be out of action, the recovery time. The other is how much recent work you can afford to lose, the recovery point. Tighter numbers cost more.",
  "body": [
   "Failures are inevitable. Disks fail, software has bugs, people make mistakes, networks have problems, and occasionally a whole data center or region has trouble. Reliable systems are designed to keep working, or to recover quickly, when things go wrong. The cloud makes many reliability techniques easier and cheaper than building them on premises, but they are not automatic: they still must be chosen, configured, paid for and tested. The Cloud Digital Leader exam expects you to distinguish high availability from disaster recovery, to know what zones and regions protect against, and to recognize RTO and RPO.",
   "It helps to recall Google Cloud's geography. A region is a specific geographic area, such as a metropolitan area, and each region contains several zones. Zones are isolated locations within a region with independent power, cooling and networking, so a failure in one zone is unlikely to affect another. Spreading a workload across zones protects against a zone failure. Spreading it across regions protects against the much rarer failure of an entire region and also against regional disasters such as major natural events.",
   "High availability (HA) is about keeping a service running through failures of individual components, with little or no interruption. The main technique is redundancy: running more than one instance so that others take over when one fails. In Google Cloud that means running instances in multiple zones of a region, for example with a regional managed instance group behind a load balancer that sends traffic only to healthy instances. It also means using regional services, such as a Cloud SQL instance configured for high availability, which keeps a standby in another zone and fails over to it automatically. Health checks and autohealing detect failed instances and replace them automatically. Many managed services, such as Cloud Storage in regional or multi-region locations, provide this redundancy built in.",
   "Disaster recovery (DR) is about recovering from larger events, such as a regional outage, a major security incident like ransomware, or data corruption caused by a bad change or human error. Note that redundancy alone does not protect against corruption or deletion: if someone deletes a table, a replicated database faithfully deletes it in every copy. That is why backups and point-in-time recovery remain essential even for highly available systems.",
   "Two metrics guide DR planning, and the exam tests both. The recovery time objective (RTO) is the maximum acceptable time a service can be unavailable before it must be restored; it is about downtime. The recovery point objective (RPO) is the maximum acceptable amount of data loss, measured as time; it is about how far back you restore to. An RPO of 15 minutes means you must be able to restore data to within 15 minutes of the failure, so backups or replication must happen at least that often. An RTO of one hour means the service must be running again within an hour. These targets come from the business: how much does each hour of downtime cost, and how much lost data can be tolerated? Smaller RTOs and RPOs require more expensive designs.",
   "DR patterns range from cheap to expensive, trading cost for recovery speed. In backup and restore, regular backups are stored in another region, and infrastructure is rebuilt when needed, ideally from infrastructure as code; this has low cost but longer RTO and RPO, often hours. In a warm standby, a scaled-down but working copy of the environment runs in another region with data continuously replicated, ready to scale up when needed; it costs more but recovers faster. In a hot or active-active design, full capacity runs in multiple regions at once, serving traffic simultaneously, with near-zero RTO and RPO but the highest cost and complexity. Organizations often use different patterns for different systems, matching each to its business importance.",
   "Backups themselves must be protected. They should be stored in a different location from production, ideally in a separate project with restricted access so that an attacker or mistake affecting production cannot also delete the backups. They should be retained long enough to recover from problems discovered late. Most importantly, they must be tested: a backup that has never been restored might be incomplete or unusable. A DR plan that has never been tested is only a hope, so organizations should rehearse recovery regularly, measure whether they meet their RTO and RPO, and update the plan after each exercise.",
   "On the exam, remember the pairing: multiple zones protect against zone failure and support high availability; multiple regions protect against regional disasters and support disaster recovery. RPO is about data loss, RTO is about downtime, and lower values cost more."
  ],
  "analogy": "Think of RTO and RPO as saving a long document on your laptop. RPO is how often you press save: if you save every 10 minutes, a crash loses at most 10 minutes of typing. RTO is how long it takes to be typing again after the crash: rebooting, finding the file, reopening it. Autosave every few seconds plus a second laptop already open on the same file is the expensive active-active option. Where the analogy stops: in the cloud, a replicated copy also replicates mistakes, so a deleted paragraph synced everywhere still needs a separate backup to recover.",
  "terms": [
   [
    "High availability (HA)",
    "Designing a system to keep running despite component failures, usually through redundancy across zones."
   ],
   [
    "Disaster recovery (DR)",
    "Plans and systems for restoring service after a major failure, such as a regional outage or data corruption."
   ],
   [
    "RTO",
    "Recovery time objective: the maximum acceptable downtime before service is restored."
   ],
   [
    "RPO",
    "Recovery point objective: the maximum acceptable data loss, measured in time."
   ],
   [
    "Zone",
    "An isolated location within a region with independent power, cooling and networking."
   ],
   [
    "Warm standby",
    "A DR pattern with a scaled-down working copy in another region, ready to scale up."
   ]
  ],
  "example": "An online retailer runs its store across three zones in one region with a regional managed instance group and a high-availability Cloud SQL instance. For disaster recovery it replicates its database to a second region and keeps a small warm standby there, meeting its RTO of one hour and RPO of five minutes. Nightly backups are stored in a separate, locked-down project, and the team tests failover and a full restore twice a year.",
  "mistakes": [
   [
    "RTO and RPO are interchangeable terms for recovery speed.",
    "RTO measures acceptable downtime; RPO measures acceptable data loss in time. A system can have a short RTO but a long RPO, or the reverse."
   ],
   [
    "Running across multiple zones protects against a whole-region outage.",
    "Zones are within one region. Protection against a regional disaster requires resources or backups in another region."
   ],
   [
    "A highly available, replicated database does not need backups.",
    "Replication copies deletions and corruption to every replica. Backups and point-in-time recovery are still needed."
   ],
   [
    "Every system should use active-active across regions.",
    "Active-active has the lowest RTO and RPO but the highest cost. Match the pattern to each system's business importance."
   ]
  ],
  "tryit": [
   [
    "Willow Creek Library runs an online catalog that can be down for a full day without serious harm, and losing a day of edits is acceptable. Its payment system for fines must be back within 15 minutes and can lose almost no data. Which DR pattern fits each?",
    "The catalog has a long RTO and RPO, so backup and restore to another region is enough and costs least. The payment system needs a short RTO and near-zero RPO, which points to a warm standby with continuous replication or, if the business justifies the cost, an active-active design across regions."
   ],
   [
    "After a ransomware drill, Ashgrove Credit Union discovers its backups sit in the same project as production and use the same administrator accounts. What is the risk, and what should change?",
    "An attacker or mistake that compromises production could also delete or encrypt the backups. Backups should be stored in a separate project, ideally in another region, with restricted access, and restores should be tested regularly."
   ]
  ],
  "tip": "RPO is about data loss (how far back you restore to); RTO is about downtime (how long until you are running). Multiple zones protect against zone failure; multiple regions protect against regional disasters. Untested backups are not a plan.",
  "check": [
   [
    "A business can lose at most 10 minutes of data. Which metric is this?",
    "The recovery point objective (RPO)."
   ],
   [
    "Which DR pattern gives the lowest RTO and RPO, and what is its drawback?",
    "Active-active (hot) across multiple regions; it is the most expensive."
   ],
   [
    "What does deploying a managed instance group across several zones protect against?",
    "The failure of a single zone, keeping the service available through high availability."
   ]
  ]
 },
 {
  "t": "Google Cloud Observability: Cloud Monitoring, Cloud Logging, Cloud Trace and Error Reporting",
  "hook": "Tuesday at lunch, the support queue at Cobalt Grocers lights up: customers say checkout is crawling. Jonah, on call, opens the app and sees nothing obviously broken. The web servers are up, the database is up, and every individual service claims to be healthy. Yet a checkout that took one second yesterday now takes eight. The app is made of a dozen small services calling one another, and the slowdown could be hiding in any of them. Jonah needs to know three things fast: is something really wrong, where in the chain is the time going, and what exactly is failing. Which Google Cloud tools answer each of those questions?",
  "simple": "Running an app without monitoring is like driving at night with no dashboard and no headlights. Observability gives you the gauges and lights. Cloud Monitoring is the dashboard: it shows numbers over time, such as speed and fuel, and beeps when something crosses a line. Cloud Logging is the car's diary: a written record of every event, so you can read exactly what happened and when. Cloud Trace is like following one package through every stop on its delivery route to see which stop held it up. Error Reporting gathers every crash or error message into a tidy list, showing which problems are new and which happen most. Together they tell you that something is wrong, where, and why.",
  "body": [
   "You cannot run a reliable service without knowing how it behaves. Observability is the ability to understand the internal state of a system from the data it produces, mainly metrics, logs and traces. Google Cloud Observability, formerly known as Stackdriver and then as the Cloud Operations suite, is a set of integrated services for collecting and using this data. Much of it is collected automatically from Google Cloud services, with no setup, while agents installed on virtual machines and client libraries in application code collect more detail. The Cloud Digital Leader exam expects you to match each service to the job it does.",
   "Cloud Monitoring collects metrics, which are numeric measurements over time, such as CPU utilization, request count, latency and error rate. It gathers them from Google Cloud services, from applications, and even from other clouds and on-premises systems. With Monitoring you can build dashboards that show the health of a service at a glance, and create uptime checks that test whether a website or endpoint responds, probing it from locations around the world. Alerting policies notify people through channels such as email, SMS, chat tools or incident management systems when a condition is met, for example when the error rate stays above 2% for five minutes. Monitoring also supports defining service level objectives (SLOs) and tracking error budgets, which connects it directly to Site Reliability Engineering (SRE) practice.",
   "Cloud Logging collects, stores and lets you search log entries from Google Cloud services, virtual machines, containers and applications. Each entry is a record of a specific event with a timestamp, severity and details, such as a request that returned an error or an administrator who changed a firewall rule. Logging includes Cloud Audit Logs, which record administrative actions and data access, answering \"who did what, where and when\" for security and compliance. The Logs Explorer lets you filter and query logs, for example by resource, severity or text. Log-based metrics turn log patterns, such as the count of a particular error message, into metrics you can chart and alert on in Monitoring. Log sinks route copies of logs to Cloud Storage for low-cost long-term retention, to BigQuery for analysis with SQL, or to Pub/Sub for streaming to other systems, such as a security information and event management (SIEM) tool.",
   "Cloud Trace is a distributed tracing system. Modern applications are often built from microservices, where one user request may pass through a front end, an authentication service, an inventory service and a payment service. Trace follows individual requests as they travel through these services and records how long each step takes, displaying them as a timeline of spans. This makes it easy to see that, for example, seven of a checkout's eight seconds were spent waiting on the inventory service. Trace is the tool for finding the source of latency across services.",
   "Error Reporting groups and counts application errors and crashes. Instead of thousands of separate stack traces scattered through logs, developers see each distinct error once, with how often it occurs, when it first appeared and which service version produced it, and they can be notified when a new error appears. This helps teams see which problems are new or most frequent and prioritize fixes. Cloud Profiler is a related tool that continuously analyzes the CPU and memory use of running code with low overhead, showing which functions consume the most resources, so teams can find inefficient code and reduce costs.",
   "These tools are designed to work together during an investigation. A Monitoring alert tells the on-call engineer that latency has crossed a threshold. A dashboard confirms when it started. Trace shows which service in the request path is slow. Logging reveals the specific errors that service is producing, and Error Reporting shows whether they are new since the last deployment. Because they share the same resource names and timestamps, engineers can jump from a spike on a chart to the logs from that moment.",
   "Together, these tools support SRE practices: measuring service level indicators (SLIs), alerting on symptoms users feel rather than on every internal blip, investigating incidents quickly and improving performance over time. The key distinction to remember is this: metrics tell you something is wrong, logs tell you what happened, and traces show where time went in a request. On the exam, metrics, dashboards, uptime checks and alerts point to Cloud Monitoring; searching, storing, routing and auditing logs points to Cloud Logging; finding latency across microservices points to Cloud Trace; and grouping application errors points to Error Reporting."
  ],
  "analogy": "Observability is like the tools a hospital uses on a patient. Monitoring is the bedside monitor showing heart rate and blood pressure, with an alarm when numbers go out of range. Logging is the patient's chart, where every event, dose and observation is written down with a time. Tracing is like a scan that follows dye through the bloodstream to show exactly where a blockage slows the flow. Error Reporting is the summary of recurring symptoms the doctors review each morning. Where it stops: a hospital monitors one patient, while cloud observability watches many services that call one another at once.",
  "terms": [
   [
    "Observability",
    "The ability to understand a system's internal state from its metrics, logs and traces."
   ],
   [
    "Cloud Monitoring",
    "Collects metrics and provides dashboards, uptime checks, alerting policies and SLO tracking."
   ],
   [
    "Cloud Logging",
    "Collects, stores, searches and routes log data, including Cloud Audit Logs."
   ],
   [
    "Cloud Trace",
    "Distributed tracing that shows how long each step of a request takes across services."
   ],
   [
    "Error Reporting",
    "Groups and counts application errors and crashes so teams see new and frequent problems."
   ],
   [
    "Log sink",
    "A rule that routes logs to a destination such as Cloud Storage, BigQuery or Pub/Sub."
   ]
  ],
  "example": "Customers report slow checkouts. A Cloud Monitoring alert confirms latency has risen, Cloud Trace shows most of the delay is in calls to the inventory service, and Cloud Logging reveals repeated timeout errors from that service's database connection. Error Reporting shows the error first appeared after that morning's deployment. The team rolls back, fixes the connection pool and redeploys within an hour.",
  "mistakes": [
   [
    "Cloud Logging is the right tool to find which microservice slows down a request.",
    "Logs record events, but Cloud Trace is designed to follow a request across services and show where time is spent."
   ],
   [
    "Cloud Monitoring stores and searches application log messages.",
    "Monitoring handles metrics, dashboards and alerts. Log entries are stored and searched in Cloud Logging, though log-based metrics can feed Monitoring."
   ],
   [
    "Logs must be kept in Cloud Logging forever for compliance.",
    "Log sinks can route logs to Cloud Storage for low-cost long-term retention or to BigQuery for analysis."
   ],
   [
    "Observability only works for applications running on Google Cloud.",
    "Cloud Monitoring and Logging can also collect data from other clouds and on-premises systems."
   ]
  ],
  "tryit": [
   [
    "Saltmarsh Bank's security team must keep administrative audit logs for seven years at low cost, and its analysts want to run SQL queries over the last 90 days of application logs. What should be configured?",
    "Create log sinks: one routing audit logs to a Cloud Storage bucket, using a colder storage class with a retention policy for long-term low-cost storage, and one routing application logs to BigQuery so analysts can query them with SQL."
   ],
   [
    "A developer at Riverbend Apps notices thousands of similar stack traces in the logs after a release and cannot tell whether they are one problem or many. Which tool helps most, and why?",
    "Error Reporting, because it groups similar errors into distinct issues, counts how often each occurs and shows when each first appeared, so the developer can see whether the release introduced a new error."
   ]
  ],
  "tip": "Metrics, dashboards, uptime checks and alerts: Cloud Monitoring. Searching, storing and routing logs: Cloud Logging. Finding latency across microservices: Cloud Trace. Grouping application errors: Error Reporting. Code-level CPU and memory: Cloud Profiler.",
  "check": [
   [
    "Which tool would show which microservice is slowing down a request?",
    "Cloud Trace."
   ],
   [
    "How can you keep logs for years for compliance at low cost?",
    "Route them with a log sink to Cloud Storage (for example in a colder storage class) or to BigQuery for analysis."
   ],
   [
    "What does an uptime check in Cloud Monitoring do?",
    "It regularly tests whether an endpoint responds, from locations around the world, and can trigger an alert if it does not."
   ]
  ]
 },
 {
  "t": "Google Cloud Customer Care: support plans and when to use them",
  "hook": "Three weeks before the biggest product launch in its history, the platform team at Meridian Streaming realizes nobody knows what support plan the company has. Ines, the head of infrastructure, pictures launch night: millions of viewers, a database behaving strangely, and her team filing a ticket into a queue with no committed response time. The chief financial officer, meanwhile, questions why the company would pay for a higher support tier when \"the cloud is supposed to just work.\" Ines has to make the case by Thursday. What does each level of Google Cloud support actually offer, and how should a company decide what it needs?",
  "simple": "Getting help from Google Cloud is a bit like car ownership. Everyone gets the owner's manual, an online forum and a hotline for billing questions for free. If you want a mechanic to answer technical questions, you pay for a support plan. A basic paid plan is like a garage that answers during business hours. A middle plan is like a garage open day and night that responds faster when your car will not start. The top plan is like having a personal mechanic who knows your car, checks it before long trips and is on call during your big road trip. Companies pick a plan based on how much it would hurt if their systems stopped working.",
  "body": [
   "Even well-run cloud environments sometimes need help from the provider. A service might behave unexpectedly, a quota might need to be raised quickly before a launch, a billing question might need an answer, or a team might want advice on architecture. Google Cloud Customer Care offers several levels of support, and organizations choose one based on how critical their workloads are and how fast they need responses. The Cloud Digital Leader exam focuses on what kinds of support exist and which situations call for higher tiers, not on memorizing prices or exact response times.",
   "Every customer has access to basic support at no extra cost. It covers billing and account questions, such as payment problems or invoice questions, and gives access to documentation, community forums and service status information through Google Cloud's public status pages. Basic support does not include technical support cases for most problems. A team on basic support that hits a technical issue relies on documentation, community answers and its own expertise, which may be fine for experiments and personal projects but is risky for anything customers depend on.",
   "Paid support plans add technical support with committed response times, and higher tiers add faster responses and more proactive services. In broad terms, the lower paid tier suits small teams or workloads in development that need occasional technical help, typically during business hours. A middle tier is aimed at production workloads and offers faster responses for high-priority cases, around the clock. The differences between tiers usually include how quickly Google commits to respond to the most severe cases, whether coverage is available at all hours, and how much guidance is included beyond reacting to problems.",
   "The top tier, Premium Support, is for enterprises with business-critical workloads. It offers the fastest response for critical issues. It includes a Technical Account Manager (TAM), a named Google contact who learns the customer's environment and acts as a trusted adviser, coordinating with Google engineering when problems arise. It adds proactive guidance, such as architecture reviews and operational health reviews, aimed at preventing problems before they happen. It also offers help during planned events, such as major product launches or seasonal peaks, where Google works with the customer in advance to prepare. The exact names, prices and response times of all tiers change over time, so check the current Customer Care information rather than memorizing numbers.",
   "How a case is opened matters too. When opening a case, customers set a priority that reflects business impact, from general questions and low-impact issues up to critical production outages that affect a business's ability to operate. Accurate priority helps the right people respond with the right urgency; marking every case as critical makes it harder for genuine emergencies to stand out. Good cases also include clear details: the project ID, affected resources, when the problem started, error messages and what has already been tried. A clear, complete case saves time because support engineers do not have to ask basic questions before they can start investigating. For planned needs, such as a quota increase before a launch, requesting early avoids turning a routine request into an emergency.",
   "Privacy is protected during support. Support engineers access only what they need to resolve a case. With Access Transparency, customers can see near real-time logs of actions taken by Google personnel when they access customer content, including during a support case, showing who accessed what and why. Some organizations also use Access Approval, which requires the customer to explicitly approve such access before it happens. These features matter to regulated industries that must demonstrate control over who sees their data.",
   "Beyond Customer Care, organizations can get help from many directions. Google Cloud partners offer implementation, migration and managed services. Google Cloud professional services can help with large projects. Training and certification programs build in-house skills, and the large community shares knowledge through forums and events. Choosing a support plan is part of an organization's operational and risk planning. Its cost should be weighed against the impact of downtime: if an hour of outage costs far more than a year of premium support, the decision is straightforward. On the exam, words like \"business-critical,\" \"fastest response,\" \"named adviser\" and \"help with a major launch\" point to the top tier with a Technical Account Manager."
  ],
  "analogy": "Choosing a support plan is like choosing health coverage for a sports team. Every player can read health guides and call about billing for free. A basic plan gets you a clinic appointment during office hours. A better plan gets you an urgent care line at any hour. The top plan gives the team a dedicated doctor who knows every player's history, checks them before the championship and stands on the sideline during the big game. Where it stops: a team doctor treats injuries directly, while a Technical Account Manager advises and coordinates, and the customer still owns and operates its own workloads.",
  "terms": [
   [
    "Customer Care",
    "Google Cloud's support offering, with free basic support and several paid plans."
   ],
   [
    "Basic support",
    "Free support covering billing and account questions, documentation, community forums and status information."
   ],
   [
    "Technical Account Manager (TAM)",
    "A named Google adviser for Premium Support customers who knows their environment and coordinates help."
   ],
   [
    "Case priority",
    "The urgency level set on a support case, based on business impact."
   ],
   [
    "Proactive support",
    "Guidance such as architecture reviews and event planning offered before problems happen."
   ],
   [
    "Access Transparency",
    "Logs that show customers when and why Google personnel access their content."
   ]
  ],
  "example": "A streaming company preparing for a live global event on Google Cloud uses Premium Support. Its Technical Account Manager arranges an architecture review and event planning with Google engineers weeks in advance, quota increases are requested early, and on the day of the event the team has the fastest escalation path if a critical issue arises. Access Transparency logs let the security team confirm what Google staff accessed during a support case.",
  "mistakes": [
   [
    "Basic support includes technical help for production problems.",
    "Basic support covers billing and account questions, documentation, forums and status information, not technical support cases for most problems."
   ],
   [
    "You should memorize each tier's exact response times and prices for the exam.",
    "These details change over time. The exam focuses on what each level offers and which scenarios need higher tiers."
   ],
   [
    "Marking every case as the highest priority gets faster help.",
    "Priority should reflect real business impact so true emergencies get the attention they need."
   ],
   [
    "A Technical Account Manager takes over running the customer's workloads.",
    "A TAM is an adviser and coordinator; the customer still operates its own environment."
   ]
  ],
  "tryit": [
   [
    "Birchwood Analytics is a five-person startup building a prototype that has no customers yet. A large hospital network, Summit Health, runs patient-facing systems on Google Cloud and is preparing for a major system launch. Which support levels fit each organization?",
    "Birchwood can likely start with basic support or the lower paid tier for occasional technical help during business hours, since downtime would not harm customers. Summit Health runs business-critical systems and has a major launch, so the top tier fits: fastest response for critical issues, a Technical Account Manager who knows its environment, and proactive event planning."
   ]
  ],
  "tip": "Business-critical workloads that need the fastest response and a named adviser point to the top tier (Premium Support with a Technical Account Manager). Basic support is free but covers billing, documentation and community, not most technical cases. Do not memorize response times; they change.",
  "check": [
   [
    "What does basic (free) support include?",
    "Billing and account support, documentation, community forums and status information, but not technical support cases for most problems."
   ],
   [
    "Name two things the top support tier adds.",
    "Fastest response for critical issues, a Technical Account Manager, and proactive guidance such as architecture reviews and event support (any two)."
   ],
   [
    "Why should case priority match the real business impact?",
    "So the right people respond with the right urgency and genuine emergencies stand out."
   ]
  ]
 },
 {
  "t": "Sustainability: Google's carbon-free energy goals, low-carbon regions and the Carbon Footprint tool",
  "hook": "The annual report deadline is six weeks away at Evergreen Outfitters, and Tomas, the sustainability officer, has a new line item he has never had to fill in: greenhouse gas emissions from cloud services. The board has promised investors a credible plan to reduce the company's footprint, and IT is suddenly part of that story. Tomas asks the cloud team three questions. How much carbon does our cloud use produce? Where does it come from? And what can we change without hurting the business? The cloud team realizes they have been choosing regions based only on habit. What tools and choices does Google Cloud offer to answer Tomas?",
  "simple": "Computers in data centers use a lot of electricity, and making electricity can release carbon dioxide, which warms the planet. How much depends on where the power comes from: wind, solar, hydro and nuclear produce little carbon, while coal and gas produce a lot. Google aims to power its data centers with carbon-free electricity every hour of every day by 2030. For customers, Google Cloud shows which locations use cleaner power, marks the cleanest ones with a \"low CO2\" label, and offers a free report showing how much carbon your own cloud use is responsible for. It is like a home energy report that also tells you which outlets run on solar power.",
  "body": [
   "Data centers use large amounts of electricity, so IT has a real environmental impact. Many organizations now have sustainability targets, and many must report their emissions to investors, regulators or customers, including emissions from the cloud services they use. Moving from older on-premises data centers to an efficient cloud, and then choosing low-carbon options within that cloud, can reduce a company's IT footprint. The Cloud Digital Leader exam includes sustainability as part of operating in the cloud, so you should know Google's main commitments, how customers can choose lower-carbon locations and how they can measure their own emissions.",
   "Google has a long record in this area. It became carbon neutral for its operations in 2007 through a combination of efficiency, renewable energy and carbon offsets, and it has since shifted its focus away from offsets toward cutting emissions directly. Since 2017, it has purchased enough renewable energy each year to match its global annual electricity use. Annual matching, however, still means that at some hours, such as windless nights, data centers draw power from fossil-fueled grids, balanced by surplus clean power at other times.",
   "Google's goal is to run on 24/7 carbon-free energy (CFE) on every grid where it operates by 2030. That means every hour of electricity use is matched by carbon-free sources on the same grid where it is consumed. This is much more demanding than annual matching, because clean power must be available around the clock in each location, not just added up over a year. Google also has a goal to reach net-zero emissions across its operations and value chain by 2030. In addition, Google designs its data centers for high energy efficiency, including custom hardware and the use of machine learning (ML) to optimize cooling, which reduces the energy needed for each unit of computing.",
   "Google Cloud gives customers tools to make lower-carbon choices. The carbon-free energy percentage (CFE%) of each region is published, showing how much of the electricity used there comes from carbon-free sources on an hourly basis. Regions differ widely, because they sit on different electricity grids with different mixes of hydro, wind, solar, nuclear and fossil fuels. In the console, regions with the lowest grid carbon intensity are marked with a low CO2 indicator, shown next to the region name when you create resources, so teams can choose them for new workloads when other requirements allow. Location choices must still respect latency to users and data residency or compliance rules, so the lowest-carbon region is the right choice only when it also meets those needs.",
   "Timing and placement offer further savings. Batch jobs that are not time-sensitive, such as nightly analytics or model training, can be scheduled in lower-carbon regions, since their results do not need to be close to users. Some organizations also consider when to run flexible workloads, because the carbon intensity of a grid changes through the day as solar and wind output rise and fall. The principle is simple: when a workload is flexible in where or when it runs, use that flexibility to pick cleaner energy.",
   "The Carbon Footprint tool, available in the Google Cloud console at no cost, reports the estimated greenhouse gas emissions associated with a customer's Google Cloud usage. It breaks emissions down by project, region and product, such as Compute Engine or BigQuery, and shows trends over time. Organizations use it for sustainability reporting, to set reduction targets and to track the effect of their choices, such as moving a workload to a low CO2 region. The data can be exported to BigQuery for deeper analysis or to combine with other emissions data for company-wide reporting.",
   "Efficient practices reduce emissions as well as costs. Rightsizing virtual machines to match real usage, using autoscaling so capacity follows demand, deleting idle resources such as forgotten development VMs and unattached disks, and using serverless services that scale to zero when there is no traffic all cut the energy a workload consumes. The Active Assist recommendations in the console can highlight idle resources. In practice, sustainability and cost optimization point in the same direction: the greenest resource is often the one you no longer need. On the exam, remember: the Carbon Footprint tool reports customer emissions, low CO2 indicators and CFE% help choose regions, and Google's 2030 goal is 24/7 carbon-free energy."
  ],
  "analogy": "Annual renewable matching versus 24/7 carbon-free energy is like two ways of claiming you eat a healthy diet. Annual matching is eating junk food at night and enough salad at lunch that the week's total looks balanced on paper. Hourly matching is making sure every single meal is healthy, which is much harder because the salad must be on the plate at midnight too. Where the analogy stops: a person controls every meal, while a data center depends on the clean power available on its local grid, which is why Google must also add new carbon-free supply where it operates.",
  "terms": [
   [
    "24/7 carbon-free energy",
    "Matching every hour of electricity use with carbon-free sources on the same grid; Google's 2030 goal."
   ],
   [
    "Annual renewable matching",
    "Buying enough renewable energy over a year to equal total annual electricity use, which Google has done since 2017."
   ],
   [
    "Carbon-free energy percentage (CFE%)",
    "The share of a region's hourly electricity use that comes from carbon-free sources."
   ],
   [
    "Carbon Footprint tool",
    "A free console tool that reports the estimated greenhouse gas emissions of a customer's Google Cloud usage."
   ],
   [
    "Low CO2 region",
    "A region marked in the console as having low grid carbon intensity."
   ],
   [
    "Grid carbon intensity",
    "How much carbon dioxide is emitted per unit of electricity on a given power grid."
   ]
  ],
  "example": "A European retailer must report IT emissions each year. It uses the Carbon Footprint tool to see emissions by project, region and product, moves a nightly batch analytics job to a region marked low CO2 that also meets its data residency rules, and deletes idle development VMs found through recommendations. It exports the footprint data to BigQuery to include in its company-wide sustainability report, showing reductions in both its bill and its reported emissions.",
  "mistakes": [
   [
    "Google's 2030 goal is to buy enough renewable energy each year to match its usage.",
    "Google has done annual matching since 2017. The 2030 goal is 24/7 carbon-free energy: matching every hour of use with carbon-free sources on the same grid."
   ],
   [
    "Always move every workload to the lowest-carbon region.",
    "Region choice must also meet latency, data residency and compliance needs. Low CO2 regions are the right choice when those requirements allow."
   ],
   [
    "The Carbon Footprint tool shows Google's total corporate emissions.",
    "It reports the estimated emissions associated with the customer's own Google Cloud usage, broken down by project, region and product."
   ],
   [
    "Sustainability and cost reduction are competing goals.",
    "Practices like rightsizing, autoscaling, scaling to zero and deleting idle resources reduce both cost and emissions."
   ]
  ],
  "tryit": [
   [
    "Granite Peak Insurance runs a customer portal that must serve users in its home country with low latency and keep data in that country by law. It also trains a fraud model weekly on anonymized data with no residency restriction, and results are needed within two days. How can it lower emissions without breaking requirements?",
    "Keep the portal in a region that meets the residency and latency rules, choosing the lowest-carbon option among compliant regions if there is more than one, and rightsize and autoscale it. Move the weekly training job to a region marked low CO2 or with a high CFE%, since it has no location requirement, and use the Carbon Footprint tool to measure the change."
   ]
  ],
  "tip": "Know the tools: the Carbon Footprint tool reports customer emissions; low CO2 region indicators and CFE% help choose regions. Google's 2030 goal is 24/7 carbon-free energy, stricter than the annual matching it has done since 2017.",
  "check": [
   [
    "What does the Carbon Footprint tool show?",
    "Estimated greenhouse gas emissions from a customer's Google Cloud usage, broken down by project, region and product."
   ],
   [
    "How can a team reduce emissions for a batch job with no location requirement?",
    "Run it in a region marked low CO2 or with a high carbon-free energy percentage, and size it efficiently."
   ],
   [
    "Why is 24/7 carbon-free energy harder than annual renewable matching?",
    "Every hour of use must be matched by carbon-free power on the same grid, including times when wind and solar are low, rather than balancing totals over a year."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
