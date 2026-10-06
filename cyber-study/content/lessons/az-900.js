/* Lessons for Microsoft Certified: Azure Fundamentals (AZ-900): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("az-900", [
 {
  "t": "What cloud computing is, and the shared responsibility model across on-premises, IaaS, PaaS and SaaS",
  "hook": "It is 2 a.m. and your phone buzzes. Tomas, the night administrator at Juniper Valley Clinic, has spotted ransomware alerts on the scheduling server you moved to an Azure virtual machine last spring. Half asleep, he asks the question everyone in the building will ask by morning: 'Isn't Microsoft supposed to handle security now?' You open the update history and see that the server's operating system has not been patched in five months, and two staff accounts still have no second sign-in factor. Before the clinic director calls, you need a clear answer. Which parts of this mess belonged to Microsoft, and which were always yours?",
  "simple": "Cloud computing means renting computers, storage and software from a big provider over the internet instead of buying your own. You pay for what you use, and the provider looks after the buildings and the physical machines. But renting does not mean the provider does everything. Think of housing. If you own a house, you fix everything yourself. If you rent an empty apartment (IaaS, renting basic infrastructure), the landlord maintains the building, but your furniture is yours to look after. In a furnished apartment (PaaS, renting a ready platform), even the furniture is handled. In a hotel (SaaS, renting finished software), you just bring your suitcase. In every case, though, you lock your own door and guard your own valuables: your data, your devices and your sign-in accounts.",
  "body": [
   "Cloud computing is the delivery of computing services, such as servers, storage, databases, networking, analytics and software, over the internet from a provider's datacenters. Instead of buying and running your own hardware, you rent capacity from a provider like Microsoft Azure, create it in minutes, and pay only for what you use. The provider owns the buildings, power, cooling and physical machines; you get virtual resources on top of them. For the Microsoft Azure Fundamentals exam (AZ-900), this is the starting point for everything else: the benefits of the cloud, the service types and the pricing all follow from the idea that someone else runs the physical layer.",
   "Moving to the cloud does not mean handing over all responsibility. The shared responsibility model describes which tasks belong to the cloud provider and which stay with you, the customer. The split depends on the service type you choose. Picture a stack of layers from the bottom up: physical datacenter, physical network, physical hosts, operating system, network controls, applications, identity and directory infrastructure, accounts and identities, devices, and finally information and data. In an on-premises datacenter you own every layer, from the locks on the doors to the backups of your data.",
   "With infrastructure as a service (IaaS), such as Azure virtual machines (VMs), Microsoft takes over the physical layers: the datacenter, the physical network and the physical hosts, including the hypervisor that runs your virtual machines. You still manage the guest operating system (OS) and its patches, the applications, network controls such as the firewall and network security group rules you configure, identities and data. With platform as a service (PaaS), such as Azure App Service or Azure SQL Database, Microsoft also runs the operating system and runtime, so you focus on your application code, its configuration and your data. With software as a service (SaaS), such as Microsoft 365, Microsoft runs the whole application, and you mainly configure its settings and manage who uses it.",
   "Some responsibilities never move to the provider, whichever service type you pick. You always own your information and data, the devices (laptops and phones) that connect to the service, and the accounts and identities that sign in. If an employee's password is stolen, or someone shares sensitive files publicly, that is the customer's problem in every model. Likewise, some responsibilities always belong to the provider once you are in the cloud: the physical hosts, the physical network and the physical datacenter. The layers in between, such as the operating system, network controls, applications and identity infrastructure, shift from you toward Microsoft as you move from IaaS to PaaS to SaaS, and in PaaS several of them are shared, because Microsoft provides the controls and you configure them.",
   "Why does the split fall where it does? The rule of thumb is that responsibility follows control. In IaaS, Microsoft does not sign in to your VM to install updates, because the machine is yours to configure and only you know which applications might break after a patch. In PaaS, you never see the operating system of the servers that run your code, so it would make no sense to expect you to patch it. This is also why some layers are labeled shared. In PaaS, Microsoft supplies network and identity controls, such as access restrictions on a web app or firewall rules on a database server, but only you know which addresses and which users should be allowed, so you set them. Microsoft's own shared responsibility diagram shows this as a grid: the layers run down the side, the columns are SaaS, PaaS, IaaS and on-premises, and each cell is marked as the customer's, Microsoft's or shared. If a question describes a setting that the customer chooses, the customer is responsible for choosing it well.",
   "A helpful way to remember the model is that the line between 'provider manages' and 'you manage' moves up the stack as you go from on-premises to IaaS to PaaS to SaaS. The more the provider manages, the less control you have and the less operational work you do. That is a trade-off rather than a ranking: a team that needs a custom kernel setting wants IaaS, while a team that just wants email wants SaaS.",
   "Consider a worked example. A retailer runs three workloads: a legacy inventory application on an Azure VM, a new ordering website on App Service, and staff email in Microsoft 365. A critical Windows security update is released. For the VM, the retailer's own administrators must apply it to the guest OS, for example with Azure Update Manager or inside the machine. For App Service, Microsoft patches the underlying OS and the retailer does nothing at that layer. For Microsoft 365, Microsoft patches everything. The next week, a sales manager falls for a phishing email and gives away a password. In all three workloads, protecting that account, for instance by requiring multifactor authentication, is the retailer's job.",
   "Common mistakes: believing that moving to the cloud makes the provider responsible for data breaches caused by weak passwords or oversharing; assuming Microsoft patches the operating system inside an IaaS virtual machine; and thinking SaaS means you have no responsibilities at all. Another trap is treating 'the cloud' as a single model, when the split is different for every service you use.",
   "Exam questions are usually worded as 'who is responsible for' a named task in a named service type. 'Physical security of the datacenter', 'physical hosts' or 'the hypervisor' is always Microsoft. 'Patching the operating system of a virtual machine' is the customer in IaaS. 'Information and data', 'devices', 'accounts and identities' is always the customer. If the scenario says the customer wants the least management effort, look for SaaS; if it says the most control, look for IaaS or on-premises."
  ],
  "analogy": "Think of getting dinner. Cooking at home is on-premises: you buy the oven and the ingredients and you wash the dishes. Take-and-bake pizza is IaaS: someone else makes the base, but you run the oven. Delivery is PaaS: the pizza arrives ready and you only set the table. Eating out is SaaS. In every case you still decide who sits at your table and you guard your own wallet; those are your accounts and your data. The analogy stops working in one place: eating out needs no effort, but SaaS still needs you to configure settings such as sharing and sign-in rules.",
  "mnemonic": "Always yours, think DAD: Devices, Accounts (and identities), Data. Always Microsoft's in the cloud, think the physical three: datacenter, network, hosts.",
  "terms": [
   [
    "Cloud computing",
    "Delivering computing services such as servers, storage, databases and software over the internet on demand."
   ],
   [
    "Shared responsibility model",
    "The division of security and management tasks between the cloud provider and the customer, which depends on the service type."
   ],
   [
    "Infrastructure as a service (IaaS)",
    "A service type where the provider runs the physical infrastructure and you manage the operating system and everything above it."
   ],
   [
    "Platform as a service (PaaS)",
    "A service type where the provider also manages the operating system and runtime, and you manage your application and data."
   ],
   [
    "Software as a service (SaaS)",
    "A complete application run by the provider that you configure and use, such as Microsoft 365."
   ],
   [
    "On-premises",
    "Infrastructure you own and run in your own datacenter, where you are responsible for every layer."
   ],
   [
    "Hypervisor",
    "The software on a physical host that runs virtual machines; in Azure it is always Microsoft's responsibility."
   ],
   [
    "Guest operating system",
    "The operating system running inside a virtual machine, which the customer manages in IaaS."
   ],
   [
    "Shared layer",
    "A layer where Microsoft provides the controls and the customer configures them, such as network controls in PaaS."
   ]
  ],
  "example": "A clinic moves its scheduling server to an Azure VM and assumes Microsoft now handles security. Months later an audit finds the guest OS unpatched and several staff accounts without multifactor authentication. The auditor explains the shared responsibility model: Microsoft secures the physical hosts and datacenter, but in IaaS the clinic still patches the operating system, and in every model it protects its own accounts and patient data.",
  "mistakes": [
   [
    "Moving to Azure makes Microsoft responsible for any breach.",
    "Microsoft secures the physical layers and, depending on the service type, more of the stack. A breach caused by a stolen password or an overshared file is the customer's responsibility in every model."
   ],
   [
    "Microsoft patches the operating system inside my Azure VM.",
    "In IaaS the guest OS belongs to the customer. Azure offers tools such as Azure Update Manager, but you must configure them and make sure patches are applied."
   ],
   [
    "SaaS means the customer has no responsibilities.",
    "You still own your data, devices, accounts and identities, plus settings such as external sharing and multifactor authentication."
   ],
   [
    "Physical datacenter security is a shared responsibility.",
    "Once you are in the cloud, physical datacenter, physical network and physical hosts are always Microsoft's. Shared applies to middle layers such as network controls and identity infrastructure in PaaS."
   ]
  ],
  "tryit": [
   [
    "Brightwater Logistics stores its reporting data in Azure SQL Database, a PaaS service. An auditor asks three questions: who applies operating system patches to the servers running the database, who decides which IP addresses may connect through the server firewall, and who reviews which staff accounts can read the data. How do you answer each one?",
    "Microsoft patches the operating system, because in PaaS the provider manages the OS and runtime. The firewall rules are configured by Brightwater on controls Microsoft provides, which is a shared layer where the customer makes the choices. Reviewing account access is always the customer's job, because accounts, identities and data stay with the customer in every model."
   ]
  ],
  "tip": "Physical hosts, physical network, the datacenter and the hypervisor are always Microsoft's. Data, devices, accounts and identities are always yours. The guest OS is yours in IaaS and Microsoft's in PaaS and SaaS.",
  "check": [
   [
    "In IaaS, who applies security patches to the virtual machine's operating system?",
    "The customer, because in IaaS Microsoft manages only the physical layers and the hypervisor, not the guest OS."
   ],
   [
    "Name the responsibilities that stay with the customer in every service type.",
    "Information and data, devices (endpoints), and accounts and identities, because only the customer controls what is stored and who signs in."
   ],
   [
    "Which service type gives the customer the least management responsibility?",
    "SaaS, because the provider runs the infrastructure, platform and application; the customer mainly configures it and manages users and data."
   ],
   [
    "Why does moving from IaaS to PaaS reduce patching work?",
    "In PaaS Microsoft manages the operating system and runtime, so the customer no longer patches them and focuses on the application and data."
   ],
   [
    "Who is responsible for the hypervisor that runs Azure virtual machines?",
    "Microsoft, because the hypervisor runs on the physical hosts, which are always the provider's responsibility in the cloud."
   ]
  ]
 },
 {
  "t": "Cloud models: public, private and hybrid cloud, plus multicloud and where Azure Arc fits",
  "hook": "You are the new cloud lead at Redstone Manufacturing, and your first leadership meeting goes sideways fast. The plant manager insists the factory control servers stay in the building because the machines need instant responses. The marketing director already runs the website in Azure. Finance mentions a dozen Linux servers that came with last year's acquisition and still live with a different cloud provider. Then the CEO asks you for one sentence for the board describing the company's cloud strategy, and the security manager asks how she can check every server against the same rules. Is Redstone public, private, hybrid or something else, and how do you govern all of it from one place?",
  "simple": "A cloud model answers two questions: where do the computers live, and who shares them? A public cloud is like a city bus: a company such as Microsoft owns it, many customers ride it, and you pay for each trip. A private cloud is like a company shuttle: only your organization uses it, which gives you control but means you pay for the whole vehicle. Hybrid means using both and letting them work together, like taking the shuttle to the station and then the train into the city. Multicloud means using more than one public provider, like riding buses from two different companies. Azure Arc is a tool that lets you see and manage servers that live outside Azure from the Azure website, without moving them.",
  "body": [
   "A cloud model, sometimes called a deployment model, describes where cloud resources run and who uses them. The Microsoft Azure Fundamentals exam (AZ-900) expects you to recognize three main models, public, private and hybrid, and the related term multicloud. You also need to know where Azure Arc fits, because it is Microsoft's answer to managing resources that live outside Azure. These models are about location and ownership; they are separate from the service types infrastructure as a service (IaaS), platform as a service (PaaS) and software as a service (SaaS), and any model can host any service type.",
   "A public cloud is built, owned and run by a third-party provider such as Microsoft, and its services are offered to anyone over the internet. Many customers, called tenants, share the same physical infrastructure, although each tenant's resources are logically isolated. Public cloud has no upfront hardware cost, you can provision resources in minutes, you can scale quickly, and you pay for what you use. The trade-off is that you do not control the physical hardware or exactly where every component lives beyond choosing a region, and you work within the provider's security and compliance options.",
   "A private cloud is used by a single organization. It can run in the organization's own datacenter or be hosted by a third party, but the resources are dedicated to that one organization. Private cloud gives the most control over hardware, security and configuration, which can help with strict compliance or legacy needs. However, the organization must buy, maintain and eventually replace the hardware, so it keeps the capital expenditure (CapEx) and loses much of the cost and speed advantage of public cloud. What makes it a cloud rather than just a datacenter is self-service provisioning and automation for internal users.",
   "A hybrid cloud combines public and private clouds and lets data and applications work together between them. A common reason is regulation or latency: a hospital might keep patient records on hardware it owns while running its public website and analytics in Azure, connected by a secure link such as a site-to-site virtual private network (VPN) or ExpressRoute, a private connection that does not travel over the public internet. Hybrid also helps companies migrate gradually, or burst into the public cloud when on-premises capacity runs out. Hybrid gives the most flexibility, because the organization decides where each workload runs, but it also brings the most complexity to operate. Multicloud means using services from more than one public cloud provider, for example Azure together with another provider, perhaps because different teams chose different platforms, a company was acquired, or one provider offers a feature the others do not. Multicloud is about several providers; hybrid is about mixing private and public. An organization can be both at once, for example with its own datacenter, Azure and a second public cloud.",
   "A side-by-side comparison makes the trade-offs easier to remember. Public cloud has the lowest upfront cost and the fastest start, and the provider handles the hardware, but you have the least control over the physical layer. Private cloud gives the most control and can satisfy unusual compliance or legacy needs, but you pay for and maintain all of the hardware and you can only scale as far as the equipment you bought. Hybrid gives the most flexibility, because each workload can run where it fits best, but it also brings the most operational complexity, since you now run two environments and the network between them. Multicloud can help avoid depending on one provider and lets teams use each provider's strengths, but every additional provider adds its own portal, billing, identity system and skills to learn. None of these is the right answer in general; the exam wants you to match the description to the model.",
   "Managing resources spread across on-premises and several clouds is hard, because each place has its own tools. Azure Arc addresses this. It projects servers, Kubernetes clusters, SQL Server instances and some data services that run outside Azure into Azure Resource Manager, so they appear in the Azure portal as resources and can be governed with the same tools you use for Azure: Azure Policy, role-based access control (RBAC), tags and monitoring. Arc does not move the workload; it stays where it is. For a server, you install the Connected Machine agent, and the machine then shows up in a resource group like any Azure virtual machine (VM).",
   "What does Arc look like in practice? After a server is onboarded, it appears in the Azure portal as an Azure Arc-enabled server in the resource group you chose, with a connection status. You can tag it, assign Azure Policy to it and grant RBAC roles on it in the same way as an Azure virtual machine, and you can extend some Azure management services, such as monitoring and security posture checks, to it. What does not change is ownership of the machine: the server still runs on its own hardware in its own location, so its hardware, power and network remain the responsibility of whoever owns them. Arc gives you one control plane, not a new place to run the workload.",
   "Consider a worked example. A manufacturer keeps its factory control systems in its own datacenter because they need very low latency to the machines, runs its customer portal in Azure, and inherited a set of Linux servers in another public cloud after buying a smaller company. That is hybrid and multicloud at the same time. The security team wants every server, wherever it runs, to meet one baseline and report compliance in one place. They onboard the on-premises and other-cloud servers to Azure Arc and assign an Azure Policy initiative at the management group, so all servers are evaluated together.",
   "Common mistakes: calling any use of two clouds 'hybrid'; thinking a private cloud must be in your own building; and confusing Azure Arc with Azure Migrate. Migrate helps you move workloads into Azure; Arc manages them where they already are.",
   "Exam questions give clue words: 'shared by many customers' or 'no upfront cost' means public; 'single organization' or 'full control of hardware' means private; 'keep some data on-premises while using Azure' means hybrid; 'two or more cloud providers' means multicloud; 'manage non-Azure servers from the Azure portal without moving them' means Azure Arc."
  ],
  "analogy": "Azure Arc is like a universal TV remote. Your living room has televisions from several brands, and each came with its own remote. A universal remote lets you control them all from one device without moving or replacing any television. Arc does that for servers and Kubernetes clusters in your datacenter or another cloud: Azure Policy, RBAC and tags work on them from one portal. The analogy stops in two places: a remote just sends signals, while Arc needs an agent installed on each machine, and neither one moves the television, which is why Arc is not a migration tool.",
  "terms": [
   [
    "Public cloud",
    "Cloud services owned and run by a provider and offered to many customers over the internet."
   ],
   [
    "Private cloud",
    "Cloud resources dedicated to a single organization, whether in its own datacenter or hosted by a third party."
   ],
   [
    "Hybrid cloud",
    "A combination of private and public cloud that lets data and applications work across both."
   ],
   [
    "Multicloud",
    "Using services from two or more public cloud providers."
   ],
   [
    "Azure Arc",
    "A service that projects servers, Kubernetes clusters and data services outside Azure into Azure Resource Manager so they can be managed and governed from Azure."
   ],
   [
    "Tenant",
    "A customer's isolated slice of a shared cloud, with its own resources and identities."
   ],
   [
    "Azure Migrate",
    "A service that discovers, assesses and moves on-premises workloads into Azure, unlike Arc, which manages them where they are."
   ],
   [
    "Connected Machine agent",
    "The software installed on a non-Azure server so Azure Arc can project it into Azure Resource Manager."
   ]
  ],
  "example": "A bank must keep certain transaction records on hardware it owns for regulatory reasons, but wants to use Azure for its mobile app back end and reporting. It connects its datacenter to Azure with a private link, which makes it a hybrid cloud. To apply one set of security policies to both its on-premises servers and its Azure VMs, it onboards the on-premises servers to Azure Arc and manages them in the Azure portal alongside everything else.",
  "mistakes": [
   [
    "Any use of two clouds is hybrid.",
    "Hybrid means private plus public cloud working together. Two or more public providers with no private cloud is multicloud. An organization can be both at once."
   ],
   [
    "A private cloud must be in your own building.",
    "A private cloud is dedicated to one organization, but it can be hosted by a third party. Dedication and self-service, not location, make it private cloud."
   ],
   [
    "Azure Arc moves on-premises servers into Azure.",
    "Arc projects resources into Azure Resource Manager so they can be managed from Azure while staying where they are. Azure Migrate is the tool that moves workloads."
   ],
   [
    "Public cloud means your data is visible to other customers.",
    "Tenants share physical infrastructure, but each tenant's resources and data are logically isolated from the others."
   ]
  ],
  "tryit": [
   [
    "Silverline Health has no datacenter of its own. It runs its patient portal in Azure and its analytics on another public cloud provider. The compliance officer wants every Linux server, wherever it runs, to be evaluated against one security baseline and reported in one place. Which cloud model is Silverline using, and which Azure service would meet the compliance officer's request?",
    "Silverline is multicloud, because it uses two public providers and has no private cloud, so it is not hybrid. Azure Arc fits the request: the servers in the other cloud are onboarded with the Connected Machine agent, appear in Azure Resource Manager, and can be evaluated by the same Azure Policy assignment as the Azure servers, without being moved."
   ]
  ],
  "tip": "Hybrid means private plus public; multicloud means more than one public provider. Managing non-Azure resources from Azure without moving them is Azure Arc, not Azure Migrate.",
  "check": [
   [
    "Which cloud model gives the most control over the physical hardware?",
    "Private cloud, because the resources are dedicated to one organization, which chooses and manages the hardware."
   ],
   [
    "A company uses Azure and a second public cloud provider but has no datacenter of its own. Which model is this?",
    "Multicloud, because it uses more than one public provider; there is no private cloud involved, so it is not hybrid."
   ],
   [
    "What does Azure Arc do with an on-premises server?",
    "It projects the server into Azure Resource Manager so it can be managed with Azure tools such as Policy, RBAC and tags; the server itself stays on-premises."
   ],
   [
    "Why might an organization choose hybrid cloud?",
    "To keep some workloads or data on-premises for regulation, latency or legacy reasons while using public cloud for others, or to migrate gradually."
   ],
   [
    "Which cloud model brings the most flexibility but also the most operational complexity?",
    "Hybrid cloud, because the organization chooses where each workload runs but must operate both environments and the connection between them."
   ]
  ]
 },
 {
  "t": "The consumption-based model and pay-as-you-go pricing compared with buying hardware",
  "hook": "It is the first Monday of the month at Pinecrest Ticketing, and Alana from finance forwards you the Azure invoice with one line: 'Why are we paying for a server nobody used?' You dig in and find a test virtual machine that someone shut down from inside Windows three weeks ago. The portal shows it as Stopped, not Stopped (deallocated), and the compute meter never stopped running. In the same email thread, the CEO asks whether you need to buy more servers before the big festival sale next month. How does cloud billing actually work, when does it stop, and do you ever need to buy hardware again?",
  "simple": "With the cloud, you pay for computing the way you pay for water or electricity: by how much you use, not by buying the equipment first. Azure measures things like how many hours a virtual computer ran or how much data you stored, and sends a bill each month. When you delete something, the charges for it stop. Compare buying a car with taking rides only when you need them. Buying means a big payment up front, and you keep paying for the car even when it sits in the driveway. Rides cost money only when you take one. That is the consumption-based model, and the usual name for this kind of billing is pay-as-you-go.",
  "body": [
   "When you run your own datacenter, you buy servers, storage and network equipment before you can use them. You have to guess how much capacity you will need for the next several years. If you guess too low, applications slow down and you wait weeks for new hardware. If you guess too high, you have paid for machines that sit idle. You also pay for power, cooling, floor space, maintenance contracts and staff whether the machines are busy or not. This is the cost model the cloud was designed to replace.",
   "The cloud uses a consumption-based model: you pay for the resources you actually use, and nothing up front. Azure meters usage, such as how many seconds or hours a virtual machine (VM) ran, how many gigabytes are stored, how much data left the region, or how many times a function executed, and bills you for it, typically monthly. When you delete a resource, its charges stop. This pricing approach is usually called pay-as-you-go, and it is how a new Azure subscription is billed by default.",
   "Here is how it works in practice. You create a resource, for example with `az vm create --resource-group rg-lab --name vm1 --image Ubuntu2204`. From that moment the meter runs for compute, the disk and the public Internet Protocol (IP) address. If you run `az vm deallocate --resource-group rg-lab --name vm1`, compute billing stops but the disk is still stored and still billed. If you run `az group delete --name rg-lab`, every resource in the group is removed and all of its meters stop. Each resource type has its own meters, which is why the details of pricing differ from service to service even though the model is the same.",
   "It helps to know what you will actually see on a bill. In the Cost analysis view of Microsoft Cost Management, charges can be grouped by service, resource, resource group, region or tag, and each line traces back to a meter, such as compute hours for a particular VM size or gigabytes per month for a storage tier. Some resources cost money simply by existing, such as a managed disk, a static public IP address or stored data. Others cost money only when they do work, such as a function execution or data leaving an Azure region. Data coming into Azure is generally not charged, while data going out usually is. Knowing which kind of meter a resource has tells you what to do to stop its cost: stop using it, deallocate it, or delete it.",
   "Consumption-based pricing brings several benefits the exam lists. There are no upfront costs, so a small team can start a project without a hardware budget. You do not need to buy and manage costly infrastructure you might not use. You can add resources when you need them and remove them when you do not, so you stop paying for capacity during quiet periods. It becomes easy to experiment: you can try an idea for a day and delete it. And because the provider buys hardware at enormous scale, you benefit from economies of scale in the price.",
   "Why can a provider offer this, when your own datacenter cannot? The provider spreads the cost of buildings and hardware across a very large number of customers whose busy periods differ, so its capacity is used much more evenly than any single company's would be. The risk of guessing capacity wrong moves from you to the provider. You no longer pay for the spare servers that sit idle waiting for a peak, because the provider keeps a large shared pool and you draw from it only when you need it.",
   "Pay-as-you-go is not the only purchase option. For steady, predictable workloads you can commit in advance, for example with Azure Reservations for a one-year or three-year term, in exchange for a lower price, and spare capacity can be bought at a deep discount as Azure Spot Virtual Machines, which Azure can evict when it needs the capacity back. You will meet these in the cost management lessons. The exam focus here is the basic idea: in the cloud, cost follows usage, while on-premises cost follows what you bought.",
   "Consider a worked example. An online ticket seller has quiet traffic most of the year and a huge spike for two days when a festival goes on sale. On-premises, it would have to buy enough servers for the spike and leave most of them idle for the other 363 days. In Azure it runs a small number of web instances normally, scales out for the two peak days, then scales back in. It pays for the extra instances only for the hours they ran, and the bill for the rest of the year reflects the small baseline.",
   "Common mistakes: assuming that a stopped VM costs nothing (a VM stopped from inside the guest operating system (OS) is still allocated and still billed for compute; only deallocating stops compute charges, and disks are billed either way); assuming that consumption pricing is always cheaper (an always-on, steady workload may cost less with a reservation); and forgetting that easy creation means costs can grow quietly when test resources are left running. That is why Azure provides budgets and cost analysis, and why labs in this course remind you to delete resource groups when you finish. A related trap is deleting a VM and assuming everything is gone: depending on the options chosen, its disk, network interface and public IP address can be left behind and keep billing, which is another reason to delete the whole resource group when a lab is finished.",
   "Exam questions about this topic tend to use clue words. 'No upfront cost', 'pay only for what you use', 'stop paying when you stop using a service' and 'pay for additional resources only when needed' all point to the consumption-based model. 'Buying servers in advance' and 'estimating capacity for years ahead' describe the traditional model the cloud replaces. If a question asks which benefit lets a startup begin without a hardware budget, the answer is the consumption-based model."
  ],
  "analogy": "Running a VM is like holding a hotel room. Turning off the lights and the television does not stop the room charge, because the room is still reserved for you; that is a VM shut down from inside the operating system. Checking out stops the room charge; that is deallocating. If you leave your luggage in the hotel's storage room, you pay a small fee for it; that is the disk, which is billed until you delete it. Where the analogy stops: a hotel bills by the night, while Azure meters many resources by the second or hour.",
  "terms": [
   [
    "Consumption-based model",
    "A pricing approach where you pay for the resources you actually use rather than buying capacity in advance."
   ],
   [
    "Pay-as-you-go",
    "Azure's default billing option, where usage is metered and billed after the fact with no upfront commitment."
   ],
   [
    "Meter",
    "The measurement Azure uses to bill a resource, such as compute hours or gigabytes stored."
   ],
   [
    "Deallocate",
    "Stopping a VM so that its compute resources are released and compute billing stops, while its disks remain."
   ],
   [
    "Azure Reservations",
    "A one-year or three-year commitment to a resource type in exchange for a discounted price."
   ],
   [
    "Economies of scale",
    "Lower unit costs a provider achieves by operating at very large scale, which can be passed on to customers."
   ],
   [
    "Azure Spot Virtual Machines",
    "Unused Azure capacity offered at a deep discount that Azure can evict when it needs the capacity back."
   ],
   [
    "Cost analysis",
    "The view in Microsoft Cost Management that breaks down charges by service, resource, resource group or tag."
   ]
  ],
  "example": "A university research group needs 50 powerful VMs for a two-week simulation once a semester. Buying the servers would cost a large sum and leave them idle most of the year. Instead, the group creates the VMs in Azure for the two weeks, runs the job, deletes the resource group, and pays only for the hours used. The finance office sees a single spike on that month's bill and nothing in the months between.",
  "mistakes": [
   [
    "A VM that shows as Stopped costs nothing.",
    "A VM stopped from inside the guest OS is still allocated and still billed for compute. Only Stopped (deallocated) ends compute charges, and disks are billed in either state."
   ],
   [
    "Pay-as-you-go is always the cheapest option.",
    "For a steady workload that runs all the time, a one-year or three-year reservation usually costs less. Consumption pricing shines for variable or short-lived workloads."
   ],
   [
    "Deleting a VM removes everything it used.",
    "Depending on the options chosen, a VM's disk, network interface and public IP address can remain and keep billing. Deleting the resource group removes everything in it."
   ],
   [
    "Consumption-based means there is no way to commit or plan.",
    "You can still commit to reservations for discounts and set budgets and alerts. Pay-as-you-go is the default, not the only option."
   ]
  ],
  "tryit": [
   [
    "Coral Bay Analytics runs a nightly batch job that needs 20 VMs for about three hours, plus a small database server that runs 24 hours a day all year. The manager wants the cheapest sensible approach for each without buying hardware. What would you recommend?",
    "For the batch job, use pay-as-you-go and create or start the VMs only for the job, then deallocate or delete them, so the company pays for about three hours a night; if the job can tolerate interruption, Spot Virtual Machines could lower the price further. For the always-on database server, a reservation is worth considering, because a steady workload running for years usually costs less with a one-year or three-year commitment."
   ],
   [
    "A developer creates a test environment on Friday afternoon and forgets about it until Monday. Which three resources in it are most likely to have kept billing over the weekend even if the VM had been stopped from inside Windows?",
    "Compute for the VM, because it was still allocated; the managed disk, because disks are billed whenever they exist; and the public IP address if it was a static one. Deallocating would have stopped compute, but only deleting the resources stops the disk and IP charges."
   ]
  ],
  "tip": "No upfront cost, pay for what you use and stop paying when you stop using: that is the consumption-based model. A VM stopped from inside the OS is still billed; deallocate it to stop compute charges.",
  "check": [
   [
    "What does the consumption-based model mean for upfront costs?",
    "There are none; you pay only for the resources you use, as you use them."
   ],
   [
    "A VM is shut down from inside Windows but still shows as Stopped, not Stopped (deallocated). Is compute still billed?",
    "Yes, because the VM is still allocated on a host; you must deallocate it to stop compute charges, and its disks are billed in either state."
   ],
   [
    "Why is the consumption-based model good for experiments?",
    "You can create resources for a short test and delete them afterward, paying only for the time they existed, with no hardware purchase."
   ],
   [
    "For a workload that runs at the same level 24 hours a day for years, what option might cost less than pay-as-you-go?",
    "A reservation, which commits you for one or three years in exchange for a lower price."
   ],
   [
    "Name two benefits of the consumption-based model listed in the AZ-900 objectives.",
    "Any two of: no upfront costs, no need to buy and manage infrastructure you might not use, the ability to add resources only when needed and remove them when not, and easy experimentation."
   ]
  ]
 },
 {
  "t": "Capital expenditure (CapEx) vs operational expenditure (OpEx) and how the cloud shifts spending",
  "hook": "The board meeting at Lakeshore Design Group is in two days, and Devon, the finance director, has the hardware refresh quote open on his screen: one large payment for new servers and storage that would sit on the books for five years. Next to it is your Azure proposal, which shows no purchase at all, just a monthly figure that rises and falls with usage. 'Where did the asset go?' he asks. 'And who approves spending when there is no purchase order to sign?' You need an answer that a finance director and an auditor will both accept. What exactly changes when spending moves from buying to renting?",
  "simple": "Businesses spend money in two broad ways. Capital expenditure, or CapEx, is buying something big up front that you own and use for years, like a server or a delivery van. Operational expenditure, or OpEx, is paying as you go for things you use, like a phone plan or the electricity bill. Buying a washing machine is CapEx; paying for each load at the laundromat is OpEx. Running your own datacenter is mostly CapEx, because you buy the servers before you use them. Using the cloud is mostly OpEx, because you pay a monthly bill for what you used and own no hardware. Neither is always cheaper; they are simply different ways to spend.",
  "body": [
   "Finance teams group spending into two kinds, and the Microsoft Azure Fundamentals exam (AZ-900) expects you to recognize both. Capital expenditure (CapEx) is money spent up front on physical assets that the organization owns and uses for years, such as servers, storage arrays, network equipment or a building. Because the asset lasts several years, its cost is usually spread over its useful life on the books through depreciation, which gradually reduces the recorded value of the asset.",
   "Operational expenditure (OpEx) is money spent on services or products as they are used, such as a monthly cloud bill, software subscriptions, leased equipment or electricity. OpEx is usually recorded in the same period it is spent, and there is no asset to depreciate. You can generally increase or decrease OpEx as your needs change, and you can stop it when you stop using the service. The cloud's consumption-based, pay-as-you-go model is the textbook example of OpEx.",
   "A traditional datacenter is mostly CapEx. To add capacity you go through a purchase cycle: estimate demand, get quotes, win budget approval, order hardware, wait for delivery, rack and cable it, and then use it for years whether you need all of it or not. Datacenter costs such as the building, power backup, cooling and network links are also typically bought up front. Staff salaries and electricity are ongoing, but the big decisions are large purchases made in advance, often on a refresh cycle every few years.",
   "Cloud computing is mostly OpEx. You rent compute, storage and services from the provider and pay each month for what you consumed, with no hardware purchase. This means you do not need to find a large sum at the start of a project, and your spending can follow your actual demand. If a project is cancelled, you delete the resources and stop paying, rather than owning equipment you no longer need. Microsoft carries the CapEx of building datacenters and recovers it through the prices of its services.",
   "Why does this distinction matter to a business and not just to its accountants? Three reasons come up again and again. The first is cash flow: a large CapEx purchase ties up money at the start that could be spent elsewhere, while OpEx spreads the cost across the months in which the service is used. The second is risk: with CapEx the organization carries the risk of buying the wrong amount or the wrong technology, and it is stuck with that choice until the next refresh, while with OpEx much of that risk moves to the provider and a wrong guess can be fixed by scaling or deleting. The third is speed: capital purchases usually need a business case, quotes and formal approval, while cloud resources can be created as soon as someone has permission. That last point cuts both ways, because spending can now begin without a purchase order, which is why the governance tools later in the course matter.",
   "It helps to line the two up side by side. CapEx: large upfront cost, you own the asset, value depreciates, capacity is fixed until the next purchase, and a wrong guess is expensive. OpEx: no upfront cost, you own nothing physical, the cost is recognized as it is incurred, capacity follows demand, and a wrong guess is corrected by scaling or deleting. Neither is automatically better. Some organizations prefer the predictability of owned assets; others value the flexibility of paying as they go. The exam simply wants you to classify each spend correctly and explain why the cloud shifts the balance toward OpEx.",
   "Consider a worked example. A design agency needs a file and render server. Option one: buy a server and storage for a large one-time sum, install it in a rented rack and plan to replace it in five years. That purchase is CapEx, and the accountant will depreciate it. Option two: run a virtual machine (VM) and storage in Azure for a monthly amount that rises in busy months and falls in quiet ones. That monthly bill is OpEx. Six months in, the agency loses its biggest client and cuts its render work in half. With option two, it scales down and the bill drops the next month; with option one, it still owns the full server.",
   "Common mistakes: thinking OpEx means 'always cheaper' (it means pay as you use, and a steady workload may cost more over years than owned hardware unless you use reservations); classifying a cloud reservation as CapEx (it is a prepaid or committed purchase of a service, not ownership of a physical asset, so it is still generally treated as operational spending); and forgetting that on-premises environments also have OpEx such as power and staff. The shift to the cloud also changes governance: instead of approving one large purchase, organizations watch a bill that can rise quietly, which is why budgets and cost alerts matter.",
   "Exam questions use predictable wording. 'Buying servers', 'building a datacenter', 'upfront investment', 'depreciated over time' and 'owning physical infrastructure' all mean CapEx. 'Monthly bill', 'pay for what you use', 'subscription', 'no upfront cost' and 'deducted in the same year' mean OpEx. If a question asks which expenditure model the cloud uses, or which model lets you stop spending when you stop using a service, answer OpEx."
  ],
  "analogy": "Owning a house is CapEx: a large down payment, an asset you own whose value is tracked over the years, and you are stuck with the size you bought until you sell. Renting an apartment is OpEx: a monthly payment, no asset, and you can move somewhere bigger or smaller as your needs change. Where the analogy stops: an apartment lease usually ties you in for a year, while pay-as-you-go cloud can be scaled down within the hour. A cloud reservation is closer to a lease, but it is still a commitment to a service, not ownership of property.",
  "terms": [
   [
    "Capital expenditure (CapEx)",
    "Upfront spending on physical assets that the organization owns and uses over several years."
   ],
   [
    "Operational expenditure (OpEx)",
    "Ongoing spending on services or products as they are used, recorded in the period it is incurred."
   ],
   [
    "Depreciation",
    "Spreading the cost of an owned asset over its useful life as its value declines."
   ],
   [
    "Refresh cycle",
    "The regular replacement of owned hardware every few years as it ages."
   ],
   [
    "Consumption-based model",
    "Paying for cloud resources according to actual usage, which is an OpEx model."
   ],
   [
    "Budget",
    "A spending limit in Azure Cost Management that sends alerts as costs approach or exceed thresholds."
   ],
   [
    "Purchase cycle",
    "The steps needed to buy hardware, from estimating demand and approval to delivery and installation."
   ]
  ],
  "example": "A retailer's server room is due for a hardware refresh, which would require a large capital budget approved by the board. Instead, the IT manager proposes moving the workloads to Azure. The finance team notes that the spending would shift from CapEx, a one-time purchase depreciated over five years, to OpEx, a monthly bill that tracks usage. They set up a monthly budget with alerts so the variable cost stays visible.",
  "mistakes": [
   [
    "OpEx is always cheaper than CapEx.",
    "OpEx means you pay as you use. A steady workload can cost more over several years on pay-as-you-go than on owned hardware, unless you use options such as reservations."
   ],
   [
    "A one-year or three-year Azure reservation is CapEx.",
    "A reservation is a committed purchase of a service, not ownership of a physical asset, so it is still generally treated as operational spending."
   ],
   [
    "On-premises environments have no OpEx.",
    "On-premises still has ongoing costs such as electricity, cooling, maintenance contracts and staff. Its big decisions are CapEx, but not all of its spending."
   ],
   [
    "Moving to the cloud removes the need for budgeting.",
    "Variable OpEx can rise quietly without a purchase approval step, so budgets and cost alerts become more important, not less."
   ]
  ],
  "tryit": [
   [
    "The IT manager at Tidewater Schools lists four costs for next year: new network switches for the main office, the monthly Azure invoice, the electricity bill for the remaining server room, and a three-year Azure reservation for the virtual machines that run the student information system. How would you classify each for an AZ-900 style question?",
    "The network switches are CapEx, because they are physical assets the district buys, owns and depreciates. The monthly Azure invoice is OpEx, because it pays for services as they are used. The electricity bill is OpEx, because it is an ongoing operating cost. The reservation is generally treated as OpEx, because it is a commitment to a cloud service rather than ownership of hardware, even though it is agreed in advance."
   ]
  ],
  "tip": "Anything bought, owned and depreciated over years is CapEx. A monthly bill for cloud services you consume is OpEx. The cloud's consumption-based model is an OpEx model.",
  "check": [
   [
    "Is buying a new storage array for your datacenter CapEx or OpEx?",
    "CapEx, because it is an upfront purchase of a physical asset the organization owns and depreciates over time."
   ],
   [
    "Which expenditure model does Azure pay-as-you-go pricing represent?",
    "OpEx, because you pay for services as you use them, with no upfront asset purchase."
   ],
   [
    "Give one business benefit of moving from CapEx to OpEx.",
    "No large upfront investment is needed, so projects can start quickly, and spending can follow actual demand instead of a multi-year guess."
   ],
   [
    "Why do budgets and cost alerts become more important after moving to OpEx?",
    "Because spending varies with usage, costs can grow without a purchase approval step, so alerts are needed to keep them visible and controlled."
   ],
   [
    "What is depreciation, and which type of expenditure does it apply to?",
    "Spreading the cost of an owned asset over its useful life as its value declines; it applies to CapEx."
   ]
  ]
 },
 {
  "t": "High availability, service-level agreements (SLAs) and composite availability",
  "hook": "At 6:40 on a Monday morning, the claims portal at Northgate Mutual stops answering. The front end is fine, but the database behind it is unreachable for nearly half an hour. By nine, the operations director, Ruth, wants two things: to know whether Microsoft owes the company anything, and why the architects promised 99.95% uptime when the app clearly depends on more than one service. You open the service-level agreements and a calculator. What did that promise really mean, how much downtime did it actually allow, and what should the design look like so the next failure does not take the whole portal down?",
  "simple": "Availability is how much of the time something works. A shop that is open 99 out of 100 days has 99% availability. High availability means building things so that one broken part does not close the shop, usually by having spares, such as two cash registers instead of one. Microsoft publishes a service-level agreement, or SLA, for each paid Azure service. It is a written promise, such as 99.9% uptime in a month, and if Microsoft misses it you can ask for a partial refund called a service credit. When your app needs several services all working at once, you multiply their percentages, and the result is lower than any one of them, because any one failing breaks the app.",
  "body": [
   "Availability is the proportion of time a service is up and usable. High availability means designing a system so it stays available even when some part of it fails, usually by removing single points of failure: running more than one instance so that another can take over, storing more than one copy of data, and spreading those copies across separate hardware or locations. In Azure you build high availability from features such as multiple virtual machines (VMs) behind a load balancer, availability zones and redundant storage. High availability is related to, but not the same as, disaster recovery: high availability keeps a service running through everyday failures, while disaster recovery restores it after a large event such as the loss of a region.",
   "Microsoft describes its commitment for each Azure service in a service-level agreement (SLA). An SLA is a formal agreement that states the uptime or connectivity Microsoft commits to for a service, usually as a percentage over a billing month, such as 99.9% or 99.99%. It also states what happens if Microsoft misses that target, typically a service credit, which is a percentage discount on that service's bill that you must claim. SLAs apply to paid, generally available services; free services and preview features usually have no financially backed SLA. An SLA is a promise about compensation, not a guarantee that outages cannot happen.",
   "Small differences in the percentage matter a lot. In a 30-day month there are 43,200 minutes. To find allowed downtime, multiply the minutes in the month by the unavailable fraction. 99% allows 432 minutes, about 7.2 hours. 99.9% allows 43.2 minutes. 99.95% allows 21.6 minutes. 99.99% allows about 4.3 minutes. 99.999% allows well under a minute. Each extra nine divides the allowed downtime by ten.",
   "Where do these numbers come from, and what happens when they are missed? Microsoft publishes the SLAs for its online services in a document that lists each service, its uptime or connectivity commitment, how downtime is measured and the credit amounts. Credits are typically tiered: the further availability falls below the target in a month, the larger the percentage of that service's monthly charge that is credited. You normally have to claim the credit yourself, through a support request, within a set period after the incident. The credit covers only the affected service's charges, not your lost sales or overtime, which is why an SLA is a planning figure and a measure of the provider's commitment, not insurance for your business.",
   "The SLA a service gets can depend on how you deploy it. A single virtual machine has a lower SLA than two or more VMs in an availability set, which is lower again than VMs spread across availability zones, because each redundant design survives a larger failure: a single host, a rack, or a whole datacenter. Some services also offer higher SLAs on premium tiers. Check the current SLA document for the exact figures rather than memorizing them, because they change.",
   "An application usually depends on several services, such as a web app, a database and a storage account. If the application needs every one of them working, its overall availability, called the composite SLA, is found by multiplying the individual SLAs as decimals. Two services at 99.95% and 99.99% give 0.9995 x 0.9999 = 0.9994, about 99.94%, which is lower than either one alone. Adding dependencies in a chain always lowers availability. Adding redundancy raises it: if two independent copies each have 99.9%, the chance both are down at once is 0.001 x 0.001, so the pair gives about 99.9999%.",
   "The redundancy calculation is worth practicing, because the exam may ask you to reason about it. If failures are independent, the availability of two redundant copies is one minus the product of their unavailabilities. For two regions that each run the whole application at about 99.94%, each region is unavailable 0.0006 of the time, so both are down together 0.0006 x 0.0006 = 0.00000036 of the time, giving roughly 99.99996%. In practice the real figure is a little lower, because copies rarely fail completely independently and the component that routes traffic between them has its own SLA, which sits in series with the pair.",
   "Consider a worked example. A team runs a web front end on App Service with a 99.95% SLA, backed by a database with a 99.99% SLA. Their composite SLA is roughly 99.94%, which allows about 26 minutes of downtime in a 30-day month. The business asks for no more than about 5 minutes. The team cannot reach that by tuning one service, so they deploy the whole application into a second region with traffic routing that fails over automatically. Because either region can serve users, the combined availability rises well above the single-region figure.",
   "Common mistakes: adding SLAs instead of multiplying them; expecting the composite to be at least as good as the weakest link (it is always lower when all parts are required); thinking a higher percentage means more downtime; assuming preview features have the same SLA as released ones; and believing Microsoft automatically makes your application highly available. The platform provides the building blocks and publishes the SLA, but you choose whether to deploy one instance or several.",
   "Exam questions often ask you to compare numbers or pick a design. 'Which SLA allows the least downtime' is the one with the most nines. 'What do you receive if Microsoft fails to meet an SLA' is a service credit. 'Does a preview feature have an SLA' is generally no. 'How do you calculate the SLA of an app using two services' is multiplication, giving a lower value. 'How do you increase the SLA of a VM workload' is to add instances across an availability set or availability zones."
  ],
  "analogy": "Think of a string of old holiday lights wired in series: if any one bulb fails, the whole string goes dark, so the more bulbs you add, the more often the string is dark. That is a composite SLA: every required service is a bulb, and you multiply. Redundancy is like running two complete strings side by side: the room stays lit unless both fail at once. Where it stops: Azure services are not perfectly independent, and the switch that chooses between strings, such as a traffic router, is itself another bulb in series.",
  "mnemonic": "Downtime in a 30-day month: three nines, forty-three (minutes); four nines, about four; five nines, under one. Each extra nine divides the allowed downtime by ten.",
  "terms": [
   [
    "Availability",
    "The percentage of time a service is running and usable."
   ],
   [
    "High availability",
    "A design that keeps a service running when individual components fail, usually through redundancy."
   ],
   [
    "Service-level agreement (SLA)",
    "Microsoft's formal commitment to a service's uptime or connectivity, with credits if the target is missed."
   ],
   [
    "Service credit",
    "A discount on the affected service's bill that you can claim when an SLA is not met."
   ],
   [
    "Composite SLA",
    "The overall availability of an application that depends on several services, found by multiplying their SLAs."
   ],
   [
    "Single point of failure",
    "Any component whose failure stops the whole system because there is no redundant copy."
   ],
   [
    "Redundancy",
    "Running extra copies of a component so that one can take over if another fails."
   ],
   [
    "Availability zone",
    "A physically separate location within an Azure region with independent power, cooling and networking."
   ],
   [
    "Availability set",
    "A grouping of VMs that spreads them across separate hardware racks in a datacenter so one rack failure does not stop them all."
   ]
  ],
  "example": "An insurance company's claims app uses App Service at 99.95% and a database at 99.99%, giving a composite of about 99.94%. After a regional incident causes a long outage, the architect deploys a second copy in another region with automatic failover. The CFO asks whether they can claim anything for the outage; the answer is that they can request a service credit if the SLA was missed, but the credit is small compared with the lost business, which is why they invested in redundancy.",
  "mistakes": [
   [
    "Add the SLAs of the services an app depends on.",
    "Multiply them as decimals. Two required services at 99.95% and 99.99% give about 99.94%, which is lower than either one."
   ],
   [
    "The composite SLA equals the weakest service's SLA.",
    "When every service is required, the composite is always lower than the lowest individual SLA, because any one of them failing takes the app down."
   ],
   [
    "Preview features have the same SLA as released services.",
    "Preview features and free services generally have no financially backed SLA. SLAs apply to paid, generally available services."
   ],
   [
    "Microsoft automatically makes my application highly available.",
    "Microsoft provides building blocks and publishes SLAs, but you choose whether to deploy one instance or several across zones or regions."
   ]
  ],
  "tryit": [
   [
    "Fernwood Retail's checkout service runs on a web app, calls a database and writes receipts to a storage account. Assume the SLAs are 99.95%, 99.99% and 99.9%. The product owner says, 'Our weakest piece is 99.9%, so we are at 99.9%.' Is she right, roughly what is the composite, and what kind of change would raise it most?",
    "She is not right. All three are required, so you multiply: 0.9995 x 0.9999 x 0.999 is about 0.9984, or roughly 99.84%, which is lower than 99.9%. Tuning one service only raises the composite slightly; the biggest improvement comes from redundancy, such as deploying the whole application in a second region with automatic failover, because the app then fails only when both copies fail at once."
   ]
  ],
  "tip": "Composite SLAs are found by multiplying and are always lower than the lowest individual SLA in the chain. More nines means less allowed downtime. Missing an SLA earns a service credit, not a guarantee.",
  "check": [
   [
    "About how much downtime does a 99.9% SLA allow in a 30-day month?",
    "About 43 minutes, because 43,200 minutes x 0.001 = 43.2 minutes."
   ],
   [
    "An app needs a web app (99.95%) and a database (99.99%). Is the composite higher or lower than 99.95%?",
    "Lower, about 99.94%, because the SLAs are multiplied and both services must be up."
   ],
   [
    "What does Microsoft usually provide if it fails to meet an SLA?",
    "A service credit, a percentage discount on the bill for the affected service."
   ],
   [
    "How can you raise the SLA of a workload that runs on one VM?",
    "Run two or more VMs across an availability set or, better, across availability zones, so a single failure does not stop the service."
   ],
   [
    "Does a preview feature in Azure normally come with a financially backed SLA?",
    "No, preview features and free services generally have no SLA; SLAs apply to paid, generally available services."
   ]
  ]
 },
 {
  "t": "Scalability and elasticity: scaling up vs scaling out, manual vs automatic",
  "hook": "It is 9:05 on a Tuesday night when a well-known commentator shares a link to the Brookfield Gazette's investigation. Kenji, the only engineer on call, watches page load times climb from one second to twelve as traffic jumps tenfold. He has two options in front of him: resize the single large web server to an even bigger size, which means a restart in the middle of the rush, or add more servers behind the load balancer. Tomorrow, the editor will also want to know why the site cannot simply handle this by itself. Which option should Kenji choose, and could he have avoided making the choice at all?",
  "simple": "Scaling means changing how much computing power you have so it matches how busy you are. There are two ways to do it. Scaling up means making one machine bigger, like swapping a small delivery van for a large truck. Scaling out means adding more machines, like adding more vans to the fleet. Going the other way is scaling down (smaller) or scaling in (fewer). You can make these changes yourself, which is manual scaling, or set rules so Azure does it for you, which is called autoscale. When resources grow and shrink automatically as demand changes, that is elasticity, and it means you pay for the extra power only while you actually need it.",
  "body": [
   "Scalability is the ability to adjust resources to meet demand. If more people use your application, a scalable system can add capacity so it stays responsive; if fewer people use it, you can remove capacity so you stop paying for it. On-premises, scaling means buying and installing hardware, which takes weeks. In the cloud, scaling is a configuration change, a command or a rule, and it takes minutes. Scalability matters in both directions: adding capacity protects performance, and removing it protects your budget, because in a consumption-based model idle capacity is still billed. There are two directions of scaling. Vertical scaling, also called scaling up, gives an existing resource more power, such as moving a virtual machine (VM) to a size with more central processing unit (CPU) cores or memory, or moving a database to a higher performance tier. Scaling down is the reverse. Vertical scaling is simple, because the application still runs on one machine and needs no redesign, but there is a ceiling on how large a single machine can be, and resizing a VM usually requires a restart, which means a short interruption.",
   "Horizontal scaling, also called scaling out, adds more instances of a resource, such as going from two web servers to six behind a load balancer. Scaling in removes instances. Horizontal scaling can grow much further than vertical scaling and improves availability, because the loss of one instance does not stop the service. The trade-off is that the application must be designed so several copies can share the work, typically by keeping session data outside the individual server so any instance can answer any request.",
   "Scaling can be manual or automatic. Manual scaling means an administrator decides when to change the size or number of instances, for example by running `az vm resize --resource-group rg-app --name vm1 --size Standard_D4s_v5` or by moving a slider in the portal. Automatic scaling, usually called autoscale, uses rules or schedules. A metric rule might add an instance when average CPU stays above 70% for ten minutes and remove one when it stays below 30%. A schedule rule might set five instances every weekday morning and two at night. You also set a minimum and maximum instance count, so autoscale cannot shrink to nothing or grow without limit. Virtual machine scale sets, App Service plans, Azure Functions and Azure Container Apps all support automatic scaling.",
   "```bash\naz monitor autoscale create --resource-group rg-app --resource web-vmss --resource-type Microsoft.Compute/virtualMachineScaleSets --name web-autoscale --min-count 2 --max-count 10 --count 2\naz monitor autoscale rule create --resource-group rg-app --autoscale-name web-autoscale --condition \"Percentage CPU > 70 avg 10m\" --scale out 2\n```",
   "A few details make autoscale behave well in practice. After each scale action, autoscale waits for a cool-down period before it evaluates the rules again, so that a new instance has time to start and take load before another decision is made; without it, the system could add and remove instances in a rapid loop. Scale-in rules are usually set more cautiously than scale-out rules, because removing capacity too early hurts users, while adding a little too much only costs a little money for a short time. Instances in a scale set are created from the same image and configuration, so each one is interchangeable. And the minimum instance count matters for availability as well as performance: a minimum of two means that even at the quietest hour, one instance can fail without taking the service down.",
   "Elasticity is the term for scaling automatically in both directions as demand changes. An elastic system grows when a surge arrives and shrinks when it passes, without anyone clicking a button, so you only pay for extra capacity while you need it. On the exam, scalability is the general ability to add or remove resources, manually or automatically; elasticity specifically implies that this happens automatically and dynamically in response to demand. Elasticity is one of the main reasons the cloud suits unpredictable workloads, such as a retail sale or a viral post.",
   "Consider a worked example. A news site normally needs three web servers. When a major story breaks, traffic jumps tenfold within minutes. With manual scaling, an on-call engineer might notice slow pages and add servers twenty minutes later, after readers have left. With a scale set and an autoscale rule on CPU, new instances start as soon as the threshold is crossed, and they are removed an hour after traffic settles. The site stays fast, and the extra cost covers only the busy hour. Scaling one server up to a giant size would have hit the size ceiling and needed a restart in the middle of the surge.",
   "Common mistakes: mixing up the directions (up and down change the size of one resource; out and in change the number of resources); assuming every application can scale out without changes; and treating scalability and elasticity as identical. A further trap is believing that resizing a VM happens with no interruption; changing the size of a running VM usually restarts it, which is one more reason scale-out designs suit services that must stay up.",
   "Exam wording is the clue: 'add more memory to a VM' or 'move to a larger size' is scaling up; 'add more VMs' or 'more instances' is scaling out; 'automatically adjusts to changes in demand' or 'grows and shrinks on its own' is elasticity or autoscale; 'ability to handle increased load' in general is scalability."
  ],
  "analogy": "Picture a restaurant on a busy night. Scaling up is giving the one chef a bigger stove: there is a limit to how big it can be, and you must pause service to install it. Scaling out is calling in more chefs, each at a station: you can keep adding, and if one goes home ill the kitchen keeps cooking, but every chef needs the same shared recipes, just as a stateless app keeps session data outside each server. Elasticity is a manager who calls staff in when orders pile up and sends them home when it is quiet. Where it stops: new instances take minutes to start, so autoscale reacts slightly behind a sudden spike.",
  "terms": [
   [
    "Scalability",
    "The ability to add or remove resources to match demand."
   ],
   [
    "Vertical scaling (scale up/down)",
    "Changing the size or power of an existing resource, such as more CPU or memory."
   ],
   [
    "Horizontal scaling (scale out/in)",
    "Changing the number of instances of a resource, such as adding VMs."
   ],
   [
    "Autoscale",
    "Automatic scaling driven by metric rules or schedules within a minimum and maximum instance count."
   ],
   [
    "Elasticity",
    "The ability to scale automatically in both directions as demand rises and falls."
   ],
   [
    "Virtual machine scale set",
    "A group of identical, load-balanced VMs that can scale out and in automatically."
   ],
   [
    "Cool-down period",
    "The time autoscale waits after a scale action before evaluating its rules again, which prevents rapid back-and-forth scaling."
   ],
   [
    "Load balancer",
    "A service that spreads incoming requests across several instances so no single one is overwhelmed."
   ]
  ],
  "example": "A tax preparation website sees ten times its normal traffic in the weeks before the filing deadline. Its web tier runs in a VM scale set with an autoscale rule: add two instances when average CPU exceeds 70% for ten minutes, remove one when it stays under 30%, with a minimum of two and a maximum of twenty. In deadline week the set grows to eighteen instances on its own, then shrinks back to two in May.",
  "mistakes": [
   [
    "Scaling up means adding more servers.",
    "Scaling up and down changes the size of one resource. Scaling out and in changes the number of resources."
   ],
   [
    "Any application can scale out without changes.",
    "The application must be able to run as several copies sharing the work, usually by keeping session data outside the individual server."
   ],
   [
    "Scalability and elasticity mean the same thing.",
    "Scalability is the general ability to add or remove capacity, including manually. Elasticity specifically means it happens automatically as demand rises and falls."
   ],
   [
    "An autoscale setting does not need a maximum.",
    "The maximum caps cost and protects against runaway scaling caused by a fault or an unexpected spike, and the minimum keeps enough instances for availability."
   ]
  ],
  "tryit": [
   [
    "Maplewood Payroll runs a reporting tool on a single VM. The tool is old, keeps user sessions in local memory and cannot be split across servers. At every month-end it runs out of memory for two days, and the rest of the month it is lightly used. What scaling approach fits, and what trade-off should the team plan for?",
    "Vertical scaling fits, because the application cannot share work across several copies, so scaling out would not help. The team can resize the VM to a larger size before month-end and back down afterward, so it pays for the bigger size only for those days. The trade-off is that resizing usually restarts the VM, so the change should be scheduled in a quiet window, and there is a ceiling on how large one VM can be."
   ],
   [
    "The marketing site at Larkspur Travel is stateless and runs on three instances in a scale set. Traffic doubles every Monday morning and during unpredictable flash sales. The team is tired of adding instances by hand. What would you configure?",
    "Configure autoscale on the scale set: a schedule rule to raise the count before Monday mornings, plus a metric rule on CPU for the unpredictable flash sales, with a sensible minimum such as two for availability and a maximum to cap cost. Because the site is stateless, scaling out works well, and the result is elastic behavior."
   ]
  ],
  "tip": "Up and down change the size of one resource; out and in change the number of resources. If the question says capacity changes automatically in response to demand, the answer is elasticity or autoscale.",
  "check": [
   [
    "Moving a VM from 4 to 16 GB of memory is which kind of scaling?",
    "Vertical scaling (scaling up), because it increases the size of one existing resource."
   ],
   [
    "Why does scaling out usually improve availability as well as capacity?",
    "Because there are several instances, so the loss of one does not stop the service."
   ],
   [
    "What distinguishes elasticity from scalability?",
    "Elasticity means resources are added and removed automatically in response to demand; scalability is the general ability to change capacity, including manually."
   ],
   [
    "Why does an autoscale setting have a maximum instance count?",
    "To cap how far it can grow, which limits cost and protects against runaway scaling from an unexpected spike or fault."
   ],
   [
    "A team sets an autoscale minimum of two instances even though one could handle the quiet hours. Why?",
    "So that if one instance fails during a quiet period, the other keeps the service running; the minimum supports availability as well as performance."
   ]
  ]
 },
 {
  "t": "Reliability and predictability of performance and cost in the cloud",
  "hook": "Three weeks before the annual giving appeal, Grace, the director of the Open Harbor Foundation, asks you two questions in the same breath. Last year the donation site crawled during the televised broadcast and lost donors at the worst possible moment. And last spring an unexpected cloud bill nearly swallowed part of the program budget. 'Can you promise me the site stays up and fast on the night,' she asks, 'and that the bill will not surprise us?' You know nobody can promise zero outages. But what can you design, configure and measure so that both answers are as close to yes as possible?",
  "simple": "Reliability means a system can bounce back when something breaks and keep working. Azure helps by having many datacenters around the world, so you can keep copies of your app and your data in more than one place. Predictability means you can plan with confidence, and it comes in two kinds. Performance predictability means your app stays fast for users even when more people arrive, because Azure can add capacity automatically and spread the work. Cost predictability means you can estimate, track and control your bill. It is like planning a road trip: a spare tire and a backup route are reliability, cruise control keeps your speed steady, and a fuel budget with a low-fuel warning keeps costs from surprising you.",
  "body": [
   "Reliability is the ability of a system to recover from failures and continue to function. In the cloud, reliability comes from two places: the provider's global scale and the way you design your solution. Azure runs datacenters in many regions around the world, and many regions contain several availability zones, each with independent power, cooling and networking. If you spread a workload across zones or regions, a failure in one place does not have to take your application down. The Microsoft Azure Fundamentals exam (AZ-900) lists reliability and predictability as core benefits of the cloud, alongside high availability and scalability.",
   "Reliability also covers recovery. Geo-redundant storage keeps copies of data in a second region; Azure Backup keeps restorable copies of virtual machines (VMs), files and databases; and Azure Site Recovery replicates machines so you can fail over to another region if the primary one is lost. The cloud makes these designs affordable because you do not have to build, staff and pay for a second datacenter yourself. Some reliability features are built in, such as the multiple copies Azure Storage always keeps within a datacenter; others, such as zone redundancy or cross-region replication, you must choose and configure.",
   "It helps to separate two scales of failure, because the exam does. A failure inside one region, such as a datacenter losing power, is handled by spreading instances across availability zones in that region, so the surviving zones keep serving users without any failover to another part of the world. A failure of a whole region, which is rare but possible, is handled by keeping a copy of the workload and its data in a second region and being able to switch to it. The first is about staying available through everyday faults; the second is disaster recovery. Both are part of reliability, and both cost more than a single instance in a single place, so the right level depends on how much an outage would cost the business.",
   "Predictability is about being able to plan with confidence. The exam splits it into two parts. Performance predictability means you can count on your application having the resources it needs to give users a consistent experience. Autoscaling adds capacity when demand grows, load balancing spreads requests so no single instance is overwhelmed, and high availability designs keep the service running through failures. Because you can scale quickly, you are less likely to be caught by a sudden rush of users.",
   "Cost predictability means you can forecast and control what you will spend. The Azure Pricing Calculator estimates the cost of resources before you deploy them. The Total Cost of Ownership (TCO) Calculator compares the cost of running workloads on-premises with running them in Azure. Microsoft Cost Management tracks actual spending, breaks it down by resource, tag or subscription, and forecasts where the month will end. Budgets send alerts when spending approaches or passes a threshold, and reservations fix the price of steady workloads for a term. Tags such as `costCenter=finance` let you see which team is spending what.",
   "The three cost tools answer three different questions, so it is worth being precise. The Pricing Calculator answers 'what will this planned deployment cost?': you add products, choose a region, tier, size, hours of use and options such as reservations, and it produces an estimate you can save and share. The TCO Calculator answers 'what would we save by moving?': you describe your current servers, databases, storage and networking, adjust assumptions such as electricity and labor costs, and it compares the on-premises total with Azure over several years. Microsoft Cost Management answers 'what are we actually spending, and where is the month heading?', using real billing data. Budgets in Cost Management turn that data into alerts at the thresholds you choose.",
   "The steps to make costs predictable follow a simple pattern: estimate before you build, tag as you build, watch while it runs, and alert before it surprises you. A command such as `az consumption budget list` shows the budgets on a subscription, and the Cost analysis blade in the portal shows spending grouped by service or tag. The Microsoft Azure Well-Architected Framework, a free body of guidance, includes reliability, performance efficiency and cost optimization among its pillars. You do not need to know the framework in depth for AZ-900, but it is a reminder that these benefits are not automatic: you get them by choosing the right redundancy, scaling rules and cost controls.",
   "Consider a worked example. An online learning company plans to move its course platform to Azure. Before migrating, it uses the TCO Calculator to compare three years of on-premises costs with Azure, and the Pricing Calculator to price the exact VM sizes, database tier and storage. After launch, it deploys the web tier across three availability zones with autoscale, replicates backups to a paired region, sets a monthly budget with alerts at 80% and 100%, and tags every resource with a cost center. When exam season doubles traffic, autoscale keeps pages fast, and the budget alert warns finance a week before the month's spending passes the plan.",
   "Common mistakes: assuming reliability is automatic simply because a workload is in the cloud (a single VM in a single zone is still a single point of failure); mixing up the two kinds of predictability; and confusing the calculators. The Pricing Calculator estimates the cost of Azure resources you plan to deploy; the TCO Calculator compares on-premises costs with Azure costs; Cost Management reports what you are actually spending. Another trap is thinking a budget stops resources when it is reached. Budgets alert; they do not shut anything down unless you add automation.",
   "Exam questions tend to name a tool and ask which benefit it supports, or describe a need and ask for the tool. 'Consistent user experience under changing load' points to performance predictability, via autoscaling and load balancing. 'Forecast or track cloud spending' points to cost predictability, via Cost Management. 'Estimate the cost of a planned deployment' is the Pricing Calculator. 'Compare our datacenter costs with Azure' is the TCO Calculator. 'Recover from the loss of a region' is reliability, via replication to another region and tools such as Azure Site Recovery."
  ],
  "analogy": "Think of a kitchen remodel. The contractor's quote for the new design is the Pricing Calculator. A spreadsheet comparing ten more years in your old kitchen with remodeling is the TCO Calculator. Your bank statement, with a text alert when spending passes a limit, is Cost Management with a budget. The analogy also explains the most common trap: a bank alert does not block your card, and an Azure budget alert does not stop your resources. Where it stops: a contractor's quote is fixed, while a Pricing Calculator estimate changes if your real usage differs from your assumptions.",
  "terms": [
   [
    "Reliability",
    "The ability of a system to recover from failures and keep functioning."
   ],
   [
    "Performance predictability",
    "Confidence that an application will have the resources it needs for a consistent user experience."
   ],
   [
    "Cost predictability",
    "The ability to forecast and control cloud spending."
   ],
   [
    "Pricing Calculator",
    "A tool that estimates the cost of Azure resources before you deploy them."
   ],
   [
    "Total Cost of Ownership (TCO) Calculator",
    "A tool that compares the cost of running workloads on-premises with running them in Azure."
   ],
   [
    "Microsoft Cost Management",
    "The Azure service for analysing, forecasting and budgeting actual cloud spending."
   ],
   [
    "Azure Site Recovery",
    "A service that replicates workloads to another location so they can fail over during an outage."
   ],
   [
    "Budget",
    "A spending threshold in Cost Management that sends alerts when actual or forecast costs reach set percentages."
   ],
   [
    "Geo-redundant storage (GRS)",
    "A storage option that keeps copies of data in a second region to protect against a regional outage."
   ]
  ],
  "example": "A charity runs its donation site in one Azure region. Before its annual appeal, it adds a second region with replicated data and automatic failover for reliability, enables autoscale so the site stays fast during the televised appeal, and creates a budget with alerts at 80% of the expected monthly cost. When a regional incident hits during the appeal, traffic fails over, and the finance team is warned when spending passes 80%, so it is never surprised by the bill.",
  "mistakes": [
   [
    "A workload is reliable simply because it runs in the cloud.",
    "A single VM in a single zone is still a single point of failure. Reliability comes from choosing redundancy across zones or regions and configuring backup and replication."
   ],
   [
    "The TCO Calculator estimates the cost of new Azure resources.",
    "The Pricing Calculator estimates planned Azure resources. The TCO Calculator compares on-premises costs with Azure. Cost Management reports actual spending."
   ],
   [
    "Reaching a budget automatically stops resources.",
    "Budgets send alerts. Stopping or scaling down resources when a budget is reached requires separate automation that you set up."
   ],
   [
    "Performance predictability means the bill is predictable.",
    "Performance predictability is about a consistent user experience through autoscaling and load balancing. Cost predictability is about forecasting and controlling spending."
   ]
  ],
  "tryit": [
   [
    "Owl Creek Bakery plans to move its point-of-sale reporting to Azure. The finance lead asks for three things: a comparison of the current server room costs with Azure over three years, a monthly estimate for the specific VM size and database tier the team has chosen, and an email when actual spending reaches 90% of the monthly plan. Which tool meets each request?",
    "The comparison with the current server room is the TCO Calculator, because it compares on-premises costs with Azure over time. The estimate for specific resources is the Pricing Calculator, because it prices planned deployments. The 90% email is a budget with an alert threshold in Microsoft Cost Management, which tracks actual spending; it will alert but will not stop anything on its own."
   ]
  ],
  "tip": "Performance predictability comes from autoscaling and load balancing. Cost predictability comes from the Pricing Calculator, TCO Calculator, Cost Management and budgets. Budgets alert; they do not stop resources.",
  "check": [
   [
    "Which tool would you use to estimate the monthly cost of a planned set of Azure resources?",
    "The Pricing Calculator, which prices resources before they are deployed."
   ],
   [
    "Which two features mainly support performance predictability?",
    "Autoscaling, which adds capacity as demand grows, and load balancing, which spreads requests across instances."
   ],
   [
    "Does reaching a budget in Cost Management automatically stop your resources?",
    "No, a budget sends alerts; stopping resources requires separate automation."
   ],
   [
    "How does the cloud make disaster recovery more affordable?",
    "You can replicate data and workloads to another region without building and running your own second datacenter."
   ],
   [
    "Which tool compares the cost of running workloads in your own datacenter with running them in Azure?",
    "The Total Cost of Ownership (TCO) Calculator."
   ]
  ]
 },
 {
  "t": "Security, governance and manageability benefits of the cloud (management of the cloud vs in the cloud)",
  "hook": "The auditor at Westfield Health Partners slides a list across the table: fourteen servers whose owners nobody can name, three storage accounts in a country your contracts do not allow, and a production database that a contractor deleted by accident last quarter. 'Your move to Azure was supposed to fix this,' she says. Your manager, Luis, turns to you and asks whether the cloud has made things better or worse. Azure gives you new tools for security, rules and day-to-day management, but only if you use them. Which tool answers which finding, and how will you prove it at the next audit?",
  "simple": "The cloud can make it easier to stay secure, follow rules and manage lots of resources. For security, Microsoft protects the buildings and the network, and for some services it installs updates for you. Governance means setting rules, such as 'only create resources in Europe' or 'every resource needs a cost label', and having Azure check them automatically. Manageability has two halves that the exam names. Management of the cloud is what you can do to your resources, like scaling them automatically or getting alerts. Management in the cloud is how you reach them: the website called the portal, command-line tools, or code. In a smart home, the automatic thermostat schedule is management of the home; the phone app you use to change it is how you reach it.",
  "body": [
   "Moving to the cloud can strengthen security and governance, not only lower costs. Microsoft invests heavily in the physical security of its datacenters, in protecting its network against attacks such as large-scale distributed denial-of-service (DDoS) floods, and in keeping the underlying platform patched. Depending on the service type, you can also hand over operating system (OS) patching to Microsoft, which removes a common source of vulnerabilities. You still decide who has access and how your data is protected, as the shared responsibility model says. The Microsoft Azure Fundamentals exam (AZ-900) groups these benefits as security, governance and manageability. On the security side, the cloud gives you a choice of how much to manage. With infrastructure as a service (IaaS) you keep maximum control and can install any security software you like; with platform as a service (PaaS) and software as a service (SaaS), Microsoft handles more of the patching and maintenance for you. Azure also offers built-in services you would otherwise have to buy and operate, such as Azure DDoS Protection, Microsoft Defender for Cloud for security posture and threat protection, and Azure Key Vault for storing secrets and keys.",
   "Governance means setting rules and making sure resources follow them, for example allowing resources only in approved regions, requiring certain tags or limiting virtual machine (VM) sizes. In Azure you can deploy templates that already meet corporate standards, audit and enforce rules with Azure Policy, prevent accidental deletion with resource locks, and view compliance reports across every subscription. Because these controls are applied centrally and inherited down the hierarchy, it is easier to keep hundreds of resources consistent than it would be with manual checks on physical servers. Microsoft also publishes audit reports and certifications for its services, through the Service Trust Portal, so you can see which standards the platform meets.",
   "Governance in Azure works through a hierarchy, which is what makes central control practical. Management groups sit at the top and can contain subscriptions or other management groups; subscriptions contain resource groups; resource groups contain resources. A policy or a role assignment made at a higher level is inherited by everything below it. So a single policy assigned to a management group that holds every production subscription will evaluate every resource in all of them, including resources created next year. It also helps to keep two tools apart. Role-based access control (RBAC) decides who can perform actions, such as who may create a VM. Azure Policy decides which resource configurations are allowed, such as which regions or VM sizes, whoever is doing the creating. Resource locks add a final safety net that blocks deletion or changes even for people who have permission.",
   "Manageability is split into two ideas that the exam names directly. Management of the cloud means managing your cloud resources: automatically scaling them, deploying them from templates, monitoring their health and automatically replacing failing resources, and receiving alerts based on configured metrics so you know about problems in real time. It is about what the cloud lets you do to your resources. On-premises, adding a server to a web farm meant ordering hardware and configuring it by hand; in Azure, a scale set adds an identical instance from a template in minutes, and Azure Monitor can raise an alert or trigger an action when a metric such as central processing unit (CPU) usage or response time crosses a threshold you set.",
   "Management in the cloud means the ways you interact with and manage your environment: through the web-based Azure portal, a command-line interface (CLI) such as Azure CLI or Azure PowerShell, application programming interfaces (APIs), and Azure Cloud Shell in the browser. It is about the tools and interfaces you use to reach your resources. For example, all three of these create the same resource group:",
   "```bash\n# Azure CLI\naz group create --name rg-demo --location westeurope\n# Azure PowerShell\nNew-AzResourceGroup -Name rg-demo -Location westeurope\n# Portal: Resource groups > Create > name and region > Review + create\n```",
   "Consider a worked example. A company's audit found servers in unapproved countries and dozens of untagged resources nobody could account for. After moving to Azure, it assigns a policy at the top of its hierarchy that allows only two European regions and requires a `costCenter` tag, and adds a delete lock to production databases. Administrators build environments from approved templates, and autoscale plus monitoring alerts keep the web tier healthy. Engineers use the portal for one-off checks and Azure CLI scripts for repeatable tasks. The next audit shows every resource compliant, with reports generated from Azure Policy rather than spreadsheets.",
   "Common mistakes: assuming Microsoft becomes responsible for your access control in the cloud; confusing governance (rules and compliance) with security tooling; and sorting examples into the wrong 'management' bucket. Another trap is thinking governance only restricts people; well-chosen policies also speed teams up, because approved templates remove guesswork.",
   "Exam questions often list examples and ask which category they belong to. Autoscale, templates, monitoring, alerts and self-healing are management of the cloud. The portal, Azure CLI, Azure PowerShell, Cloud Shell and APIs are management in the cloud. 'Ensure resources are only created in approved regions' is governance, usually through Azure Policy. 'Microsoft patches the OS for you' is a security benefit of PaaS and SaaS."
  ],
  "analogy": "Picture an apartment building. Management of the building is what happens to the building itself: heating on a schedule, sensors that alert the superintendent about a leak, a broken light replaced automatically by a service contract. Management in the building is how the superintendent gets things done: the master key, the office computer, the phone line to contractors. Governance is the house rules, such as no grills on balconies, with regular inspections. Where it stops: in Azure, policy can block a forbidden configuration before it exists, which a building inspection cannot do.",
  "terms": [
   [
    "Governance",
    "Setting rules for how resources may be created and used, and checking that they comply."
   ],
   [
    "Azure Policy",
    "A service that evaluates resources against rules and can audit or block non-compliant ones."
   ],
   [
    "Resource lock",
    "A setting that prevents a resource from being deleted or modified by accident."
   ],
   [
    "Management of the cloud",
    "Managing cloud resources themselves, for example with autoscale, templates, monitoring and alerts."
   ],
   [
    "Management in the cloud",
    "The tools used to reach and manage the environment, such as the portal, CLI, PowerShell and APIs."
   ],
   [
    "Distributed denial-of-service (DDoS)",
    "An attack that floods a service with traffic from many sources to make it unavailable."
   ],
   [
    "Azure Cloud Shell",
    "A browser-based shell with Azure CLI and Azure PowerShell already installed and signed in."
   ],
   [
    "Management group",
    "A container above subscriptions used to apply policies and access to many subscriptions at once."
   ],
   [
    "Role-based access control (RBAC)",
    "The Azure system that decides who can perform which actions on which resources."
   ],
   [
    "Service Trust Portal",
    "Microsoft's site for published audit reports and compliance documentation about its cloud services."
   ]
  ],
  "example": "A hospital group adopting Azure worries about consistency across dozens of teams. It uses Azure Policy to require encryption settings and approved regions, locks its production databases against deletion, and builds new environments only from approved templates. Administrators manage resources through the portal and scripted Azure CLI, while autoscale and alerts watch the patient portal. Auditors review Microsoft's published compliance reports for the platform and the hospital's own policy compliance dashboard.",
  "mistakes": [
   [
    "Moving to the cloud makes Microsoft responsible for who can access my resources.",
    "Access control stays with the customer in every service type. Microsoft provides tools such as RBAC and Microsoft Entra ID, but you decide who gets access."
   ],
   [
    "Azure Policy and RBAC do the same job.",
    "RBAC controls who can perform actions. Azure Policy controls which resource configurations are allowed, regardless of who creates them."
   ],
   [
    "Azure CLI is management of the cloud because it manages resources.",
    "The CLI is a tool for reaching the environment, so it is management in the cloud. Features acting on resources, such as autoscale and alerts, are management of the cloud."
   ],
   [
    "Governance only slows teams down.",
    "Approved templates and clear policies remove guesswork and rework, so well-designed governance often speeds teams up."
   ]
  ],
  "tryit": [
   [
    "During a review at Kestrel Energy, you are asked to classify four items: an engineer running a script in Azure Cloud Shell, an email alert sent when a VM's CPU passes 80%, a rule that blocks VMs larger than an approved size, and a deployment pipeline calling Azure's REST API. How would you classify each?",
    "Cloud Shell is management in the cloud, because it is a way to access and work with the environment. The CPU alert is management of the cloud, because it is a capability acting on and watching resources. Blocking oversized VMs is governance, usually done with Azure Policy. The pipeline calling the REST API is management in the cloud, because an API is an interface for reaching the environment."
   ]
  ],
  "tip": "A feature acting on resources (autoscale, templates, monitoring, alerts) is management of the cloud. A way to access Azure (portal, CLI, PowerShell, Cloud Shell, APIs) is management in the cloud.",
  "check": [
   [
    "Is using Azure CLI to deploy a VM an example of management of the cloud or management in the cloud?",
    "Management in the cloud, because the CLI is a tool for interacting with and managing the environment."
   ],
   [
    "Is configuring autoscale for a web app management of the cloud or in the cloud?",
    "Management of the cloud, because it is a capability acting on the resources themselves."
   ],
   [
    "Which Azure service enforces rules such as allowed regions or required tags?",
    "Azure Policy, which audits or denies resources that do not comply."
   ],
   [
    "Name one way the cloud can improve security compared with on-premises.",
    "Microsoft handles physical security, DDoS protection and, in PaaS and SaaS, operating system patching, removing work and common vulnerabilities."
   ],
   [
    "What does a resource lock protect against?",
    "Accidental deletion or modification of a resource, even by users who otherwise have permission."
   ]
  ]
 },
 {
  "t": "Infrastructure as a service (IaaS): what you manage and typical use cases such as lift-and-shift",
  "hook": "The landlord's letter arrives on a Friday: the lease on Ridgeway Freight's datacenter ends in six months and will not be renewed. Your route-planning application runs on Windows Server with a third-party component that must be installed with administrator rights and an unusual registry setting. The developers estimate a full rewrite at a year. The CFO has already said no to buying hardware for a new building. Sam, your lead administrator, asks the obvious question: 'Can we just pick these servers up and put them in Azure?' What would that look like, and what would still be your team's job once they got there?",
  "simple": "Infrastructure as a service, or IaaS, means renting virtual computers, storage and networks from a cloud provider instead of buying physical ones. The provider owns and runs the real hardware in its buildings. You get a virtual machine, which behaves like a normal computer: you choose the operating system, install whatever software you like and look after it, including updates and backups. It is like renting an empty workshop: the landlord fixes the roof and the power, but the tools, the work and the locks on your cabinets are yours. A common use is lift-and-shift: moving existing servers into the cloud nearly unchanged, because rewriting the software would take too long.",
  "body": [
   "Infrastructure as a service (IaaS) is the cloud service type that gives you the most control. The provider supplies the physical building blocks, the datacenter, physical servers, storage hardware and physical network, and you rent virtual versions of them. The best-known IaaS service in Azure is virtual machines (VMs), together with virtual networks, managed disks and load balancers. IaaS is the closest thing in the cloud to running your own server room, without owning the room.",
   "Under the shared responsibility model, IaaS leaves you with the most work among cloud service types. Microsoft keeps the hardware running, secures the physical datacenter and manages the hypervisor. You choose and manage the operating system (OS), apply its updates, install and configure middleware and runtimes, deploy applications, configure network controls such as network security group rules, set up backups and protect your data and identities. You can install almost any software you like, just as on your own server, and you can sign in with Remote Desktop Protocol (RDP) or Secure Shell (SSH) as an administrator. Creating an IaaS VM shows what you are responsible for: you pick the image, the size, the disks, the network and the credentials.",
   "```bash\naz group create --name rg-iaas --location eastus\naz vm create --resource-group rg-iaas --name app01 --image Win2022Datacenter --size Standard_D2s_v5 --admin-username azureuser\naz vm open-port --resource-group rg-iaas --name app01 --port 3389\n```",
   "Everything after that command, from Windows updates to antivirus to the application install, is up to you. Opening port 3389 to the internet, as in the last line, is exactly the kind of network control decision that stays with the customer, and a real deployment would restrict it to known addresses or use Azure Bastion, which gives browser-based RDP and SSH access without exposing the port at all. It helps to compare IaaS with the next service type up. In platform as a service (PaaS) you could not choose the Windows Server image, sign in as administrator or install a custom driver, but you also would not patch anything below your application. IaaS trades convenience for control, and that is the distinction the exam cares about. IaaS is also billed on a consumption basis: you pay for the VM while it is allocated, for its disks while they exist, and for outbound data, so shutting down and deallocating unused VMs is part of running IaaS well.",
   "IaaS in Azure is a set of building blocks rather than a single product. Virtual networks give your VMs a private address space divided into subnets. Network security groups filter traffic to and from those subnets and network interfaces, using rules you write. Managed disks provide the block storage behind each VM, and load balancers spread traffic across several VMs. You assemble these pieces much as you would cable servers and switches in a server room, and each piece is created, configured and billed separately. Microsoft also offers services that help you run IaaS well, such as Azure Update Manager for patching, Azure Backup for restore points and Microsoft Defender for Cloud for security recommendations, but you must turn them on and act on what they find, because the work they support remains yours.",
   "The most common IaaS scenario is lift-and-shift migration, also called rehosting. An organization takes existing servers from its datacenter and recreates them as Azure VMs with minimal changes. This is fast, because the application does not need to be redesigned, and it lets the company close a datacenter or avoid replacing ageing hardware. Later, it may modernize parts of the application to use PaaS services. Other typical IaaS uses include testing and development, where teams create and delete environments quickly; applications that need a specific operating system version, configuration or legacy software that no PaaS service supports; workloads that need administrator-level control; and high-performance computing where you want fine control over the virtual hardware.",
   "Consider a worked example. A logistics company runs a route-planning application on Windows Server with a third-party component that must be installed with administrator rights and a specific registry setting. Its datacenter lease ends in six months. Rewriting the application for PaaS would take a year, so the team uses Azure Migrate to assess the servers and rehost them as Azure VMs. The cutover takes a weekend. Afterward, the team schedules OS patches with Azure Update Manager, configures Azure Backup and tightens network security group rules, because those remain its responsibilities in IaaS.",
   "Common mistakes: assuming Microsoft patches the guest OS of an IaaS VM; choosing IaaS for a new web app that has no special OS needs, when PaaS would remove most of the operational work; and forgetting that a running VM is billed even when idle. Another is treating lift-and-shift as the end state; it is often the first step before modernizing.",
   "Exam wording gives the answer away: 'maximum control', 'full control of the operating system', 'install custom software', 'legacy application' or 'migrate servers with no code changes' points to IaaS, usually Azure Virtual Machines. 'Developers only want to deploy code' points away from IaaS, toward PaaS. A question that asks who is responsible for the physical server hosting a VM expects the answer Microsoft, while one that asks who installs security updates inside the VM expects the customer."
  ],
  "analogy": "IaaS is like leasing a car. The leasing company owns it, and if the frame or engine fails at the factory level it is their problem; that is Microsoft and the physical hosts. But you choose where to drive, you buy the fuel, you book the oil changes, you clean the interior and you lock the doors; that is the guest OS, patches, applications and access. Where the analogy stops: a leased car is yours alone, while Azure hosts are shared by many customers' VMs, each isolated by the hypervisor that Microsoft manages.",
  "terms": [
   [
    "Infrastructure as a service (IaaS)",
    "A service type where you rent virtual compute, storage and networking and manage the OS and everything above it."
   ],
   [
    "Virtual machine (VM)",
    "A software-based computer running an operating system on shared physical hardware."
   ],
   [
    "Lift-and-shift (rehost)",
    "Moving existing servers to cloud VMs with little or no change to the application."
   ],
   [
    "Image",
    "A template containing an operating system, and sometimes software, used to create a VM."
   ],
   [
    "VM size",
    "The combination of virtual CPUs, memory and other capacity allocated to a VM."
   ],
   [
    "Azure Migrate",
    "A service that discovers and assesses on-premises servers and helps move them to Azure."
   ],
   [
    "Network security group",
    "A set of rules that allows or denies network traffic to Azure resources, configured by the customer."
   ],
   [
    "Azure Bastion",
    "A managed service that provides browser-based RDP and SSH access to VMs without exposing their ports to the internet."
   ]
  ],
  "example": "An engineering firm has an old document management system that only runs on a specific Windows Server version with a custom driver. Its hardware is failing. The firm creates matching Azure VMs, copies the servers over with Azure Migrate, and switches users across in a weekend. The firm's administrators continue to patch Windows, run antivirus and manage backups on the VMs, because in IaaS those tasks remain theirs.",
  "mistakes": [
   [
    "Microsoft patches the guest operating system of an IaaS VM.",
    "In IaaS the customer patches the guest OS. Microsoft manages the physical hosts and the hypervisor."
   ],
   [
    "IaaS is the safe default choice for any new application.",
    "For a new web app with no special OS needs, PaaS removes most of the operational work. IaaS fits when you need OS-level control or must move servers as they are."
   ],
   [
    "An idle VM costs nothing.",
    "A VM is billed for compute while it is allocated, whether or not it is busy, and its disks are billed while they exist. Deallocate or delete unused VMs."
   ],
   [
    "Lift-and-shift is the end goal of a migration.",
    "Rehosting is often a fast first step. Many organizations later modernize parts of the application onto PaaS services."
   ]
  ],
  "tryit": [
   [
    "Quarry Hill Labs needs a test environment of six servers for a two-week software trial. The vendor's software requires an exact Linux distribution version, custom kernel modules and root access to install. The team has no spare hardware. Which service type fits, and what should the team do when the trial ends?",
    "IaaS, using Azure VMs, fits because the software needs a specific OS version, kernel modules and administrator-level installation, which PaaS does not allow. When the trial ends, the team should delete the resource group so the VMs, disks and IP addresses all stop billing; deallocating alone would stop compute charges but leave the disks billed."
   ]
  ],
  "tip": "If a scenario stresses maximum control, a custom or legacy OS configuration, or moving servers without changing them, the answer is IaaS. In IaaS, patching the guest OS is always the customer's job.",
  "check": [
   [
    "Who manages the operating system on an Azure VM?",
    "The customer, because IaaS leaves the OS and everything above it to the customer."
   ],
   [
    "What is lift-and-shift migration, and which service type does it use?",
    "Moving existing servers to the cloud with minimal changes, which uses IaaS virtual machines."
   ],
   [
    "Why might a team choose PaaS over IaaS for a new web application?",
    "PaaS removes OS patching and server management, so the team can focus on code and spend less on operations."
   ],
   [
    "Give two customer responsibilities that remain in IaaS.",
    "Any two of: patching the guest OS, installing and updating applications, configuring network security rules, backups, and protecting data and identities."
   ],
   [
    "Which Azure service helps you assess on-premises servers and rehost them as Azure VMs?",
    "Azure Migrate."
   ]
  ]
 },
 {
  "t": "Platform as a service (PaaS) and serverless: what the provider manages and typical use cases",
  "hook": "Nadia leads a four-person development team at Cedar Lane Bookings, and she is tired. Last month two of her developers spent a full week patching servers, renewing certificates and clearing a disk that filled up overnight, instead of building the booking features the business keeps asking for. Now the product manager wants the new site live by spring, plus confirmation emails that go out the moment someone books, even at 3 a.m. Nadia's question to you is simple: is there a way to run our code in Azure without looking after servers, and to pay almost nothing for work that only happens now and then?",
  "simple": "Platform as a service, or PaaS, means the cloud provider runs the computers and the software underneath your app, such as the operating system, and keeps them updated. You bring your app's code and your data. It is like renting a fully equipped commercial kitchen: the ovens, cleaning and repairs are handled, and you just cook. Serverless goes a step further: your code runs only when something happens, such as a new order arriving, and you pay only for those moments, like a food stall that opens only when a customer walks up. Servers still exist, but you never see or manage them. In Azure, App Service and Azure SQL Database are PaaS; Azure Functions and Logic Apps are serverless.",
  "body": [
   "Platform as a service (PaaS) is a middle ground between infrastructure as a service (IaaS) and software as a service (SaaS). The provider manages the physical infrastructure and also the operating system (OS), middleware, runtime and development tools. You bring your application code and data, and configure how the service runs. You do not sign in to servers or install updates on them. The point of PaaS is to let developers spend their time on the application rather than on the machines underneath it.",
   "Examples of PaaS in Azure include Azure App Service for hosting web apps and application programming interfaces (APIs), Azure SQL Database for managed relational databases, and Azure Cosmos DB for globally distributed NoSQL data. With Azure SQL Database, for example, Microsoft handles the database engine upgrades, operating system patches, high availability and automated backups; you design tables, write queries, choose a performance tier and control who can connect. Deploying a web app to App Service looks like this:",
   "```bash\naz appservice plan create --resource-group rg-web --name plan-web --sku S1 --is-linux\naz webapp create --resource-group rg-web --plan plan-web --name contoso-orders-web --runtime \"NODE:20-lts\"\naz webapp deploy --resource-group rg-web --name contoso-orders-web --src-path app.zip\n```",
   "Under the shared responsibility model, PaaS moves the line up the stack. Microsoft is responsible for the OS and runtime, which removes patching work and reduces the attack surface you have to maintain. Responsibility for applications, network controls and identity infrastructure is often shared, because Microsoft provides the controls and you configure them, for example firewall rules on a SQL server or access restrictions on a web app. As always, you remain responsible for your data, devices and accounts. Typical PaaS use cases are building and deploying applications quickly, especially when developers want to concentrate on code. PaaS services usually include built-in scaling, load balancing, high availability options and deployment directly from source control. The trade-off is less control: you cannot pick every OS setting or install arbitrary software on the underlying machines.",
   "Serverless computing is often grouped with PaaS. With serverless, you do not manage servers at all, the platform scales automatically, including down to zero when nothing is happening, and on consumption-style plans you pay only when your code runs. Azure Functions runs small pieces of code in response to events, such as a Hypertext Transfer Protocol (HTTP) request, a message on a queue, a new file in storage or a timer. Azure Logic Apps builds workflows that connect services with little or no code, using a visual designer and ready-made connectors. Servers still exist, but the provider handles them completely, and the application is designed around events rather than always-running processes. The distinction the exam draws is that PaaS such as App Service runs your app continuously on capacity you have chosen, while serverless runs code only when triggered and bills per execution.",
   "The billing difference is what usually decides between them. An App Service plan is billed for the instances in the plan for as long as the plan exists, whether the site receives one request an hour or thousands a second; you are paying for capacity that is always ready. Azure Functions on a consumption-style plan is billed for executions and the resources used while the code runs, so a function that runs a few hundred times a day costs very little and one that never runs costs close to nothing. The trade-off is that a function which has been idle may take a moment to start on its next call, often called a cold start, which matters for user-facing pages but rarely for background tasks such as sending an email. Functions can also run on other hosting plans that keep instances ready, at a steadier cost.",
   "Consider a worked example. A small team is building an online booking system. The customer-facing site runs all day and needs custom domains, deployment slots for testing and steady performance, so they host it on App Service. Bookings are stored in Azure SQL Database, which spares them from managing a database server. Each time a booking is saved, a message goes onto a queue, and an Azure Function picks it up and sends the confirmation email. The function runs only when a booking arrives, so at night it costs almost nothing. A Logic App posts a daily summary to the team's chat channel without any code.",
   "Common mistakes: believing PaaS means the customer has no security responsibilities (you still configure access, protect data and manage identities); thinking 'serverless' means there are literally no servers; choosing Functions for a long-running web application that needs to be always on; and forgetting that PaaS limits control, so an application needing a custom OS component may have to stay on IaaS. Another trap is treating Logic Apps and Functions as the same: Logic Apps is a designer-first workflow tool, and Functions is code-first.",
   "Exam questions use clear clue words. 'Developers want to focus on code', 'no need to manage the operating system', 'managed database' or 'host a web app without managing servers' points to PaaS, often App Service or Azure SQL Database. 'Run code in response to an event', 'pay only when the code executes' or 'scale automatically to zero' points to serverless, usually Azure Functions. 'Automate a workflow between services with little or no code' points to Logic Apps. If the scenario needs full OS control, it is not PaaS."
  ],
  "analogy": "PaaS is like renting a market stall for the season: it is yours every day, set up and maintained by the market, and you pay the monthly fee whether customers come or not. Serverless is like a pop-up stand that appears, and charges you, only when a customer rings the bell. Both spare you from building the stall yourself. Where it stops: a pop-up may take a moment to set up after a quiet spell, which is the cold start, so serverless suits bursts of events better than a busy, always-open storefront.",
  "terms": [
   [
    "Platform as a service (PaaS)",
    "A service type where the provider manages the infrastructure, OS and runtime, and you manage your application and data."
   ],
   [
    "Azure App Service",
    "A PaaS service for hosting web apps, REST APIs and mobile back ends without managing servers."
   ],
   [
    "Azure SQL Database",
    "A fully managed relational database service where Microsoft handles patching, backups and high availability."
   ],
   [
    "Serverless computing",
    "A model where the provider fully manages servers, scales automatically and bills only for execution."
   ],
   [
    "Azure Functions",
    "Event-driven serverless compute that runs code in response to triggers such as HTTP requests, queue messages or timers."
   ],
   [
    "Azure Logic Apps",
    "A low-code service for building automated workflows that connect apps and services."
   ],
   [
    "Trigger",
    "The event that causes a serverless function or workflow to run."
   ],
   [
    "Cold start",
    "The short delay when a serverless function that has been idle starts again to handle a new event."
   ],
   [
    "App Service plan",
    "The set of compute resources that hosts App Service apps and is billed for as long as it exists."
   ]
  ],
  "example": "A news startup's developers want to release features daily without worrying about servers. They host the site on App Service with deployment from their source control, store articles in Azure Cosmos DB, and use an Azure Function triggered by new image uploads to create thumbnails. Microsoft patches the operating systems and runtimes underneath, while the team manages code, access settings and data.",
  "mistakes": [
   [
    "In PaaS the customer has no security responsibilities.",
    "Microsoft runs the OS and runtime, but you still configure access, protect your data and manage identities; network and identity controls are often shared."
   ],
   [
    "Serverless means there are no servers.",
    "Servers still run the code. The provider manages them completely, scales them automatically and bills per execution on consumption-style plans."
   ],
   [
    "Azure Functions is the best host for an always-on public website.",
    "A website that runs continuously and needs features such as custom domains and deployment slots usually suits App Service. Functions fits event-driven tasks."
   ],
   [
    "Logic Apps and Functions are the same service.",
    "Logic Apps is a designer-first, low-code workflow tool with ready-made connectors. Functions is code-first, running your own code in response to triggers."
   ]
  ],
  "tryit": [
   [
    "Marigold Insurance needs three things: a public quote website used all day, every day; code that resizes each claim photo as soon as it is uploaded to storage; and a workflow that posts a message to the team chat whenever a new row is added to a shared spreadsheet, built by an analyst who does not write code. Which Azure service fits each one?",
    "The quote website fits App Service, a PaaS host for always-on web apps. Resizing photos on upload fits Azure Functions, triggered by the new file in storage and billed per execution. The no-code workflow fits Azure Logic Apps, which uses a visual designer and connectors to link services without code."
   ]
  ],
  "tip": "If developers want to focus on code and not manage the OS, choose PaaS. If code should run only when an event happens and be billed per execution, think serverless, usually Azure Functions; low-code workflows point to Logic Apps.",
  "check": [
   [
    "In PaaS, who patches the operating system that runs your web app?",
    "Microsoft, because in PaaS the provider manages the OS and runtime."
   ],
   [
    "Which Azure service runs small pieces of code in response to events and bills per execution?",
    "Azure Functions, a serverless compute service."
   ],
   [
    "Name one thing the customer is still responsible for in PaaS.",
    "Their application code, their data, and managing accounts and access; configuring network and identity controls is shared."
   ],
   [
    "Why might a team choose App Service instead of Azure Functions for a public website?",
    "The website runs continuously and needs web-hosting features such as custom domains and deployment slots, which suits App Service better than event-triggered functions."
   ],
   [
    "What is a trigger in serverless computing?",
    "The event that causes a function or workflow to run, such as an HTTP request, a queue message, a new file or a timer."
   ]
  ]
 },
 {
  "t": "Software as a service (SaaS) and choosing between IaaS, PaaS and SaaS for a scenario",
  "hook": "Three requests land in your inbox before lunch at Birchwood Partners. Sales wants a customer relationship system by next month. The developers want somewhere to run their new customer portal without ever patching a server again. And finance reminds you that its fifteen-year-old accounting package, which needs a specific Windows Server version and administrator-level installs, has to leave the datacenter before the building closes in the autumn. Your manager, Imani, wants one recommendation per request by Friday, with a sentence on who will be responsible for what. Do all three belong in the same kind of cloud service?",
  "simple": "Software as a service, or SaaS, is finished software you use over the internet, usually paying a monthly fee for each person. Email in Microsoft 365 is a good example: you sign in and use it, and Microsoft runs everything behind it, including updates. It is like streaming a film instead of buying a projector, a screen and a disc: you just press play, but you can only watch what is in the catalog. Choosing between the three cloud service types comes down to two questions: how much control do you need, and how much of the work do you want to do yourself? Whatever you choose, your data and your users' sign-ins are still yours to protect.",
  "body": [
   "Software as a service (SaaS) is a complete application that the provider runs and delivers over the internet, usually for a subscription fee per user. Familiar examples are Microsoft 365 for email and office apps, Microsoft Teams, Dynamics 365 for customer relationship management (CRM) and business processes, and many third-party products used through a browser. You use the software through a web browser or a client app; you do not deploy servers, write the application or manage its platform.",
   "SaaS is the service type with the least customer responsibility. The provider manages the infrastructure, operating system, runtime and the application itself, including updates and new features. You still manage what never leaves the customer: your data, the devices that connect, and user accounts and identities. That includes configuring settings such as who can share files outside the organization, how long data is retained and whether multifactor authentication is required. Many SaaS data losses come not from the provider but from customer settings, such as a document library shared with 'anyone with the link'.",
   "The benefit of SaaS is speed and simplicity: you can start using a mature application almost immediately, with predictable per-user pricing, automatic updates and no maintenance. The trade-off is the least control. You can configure the application within the options it offers, but you cannot change how it is built, choose its operating system, or decide exactly when updates arrive beyond what the provider allows.",
   "Choosing between the three types is a common exam scenario. Work through two questions: how much control does the scenario need, and who should do the operational work? If you need full control over the operating system (OS), must install custom or legacy software, or must move existing servers as they are, choose infrastructure as a service (IaaS). If developers want to build and deploy their own application without managing servers or patching, choose platform as a service (PaaS). If the business simply needs a finished application such as email, a CRM or file sharing, and has no reason to build its own, choose SaaS.",
   "What does the customer's part of SaaS look like day to day? In a service such as Microsoft 365, administrators work in an admin center rather than on servers. They create and remove user accounts and assign licenses, require multifactor authentication (MFA) through Microsoft Entra ID, decide whether files can be shared with people outside the organization, set how long email and documents are kept, and review sign-in and audit logs. None of these tasks involve installing software, but all of them affect security. A tenant where MFA is off and sharing with 'anyone with the link' is allowed can leak data even though the provider has done everything right.",
   "It helps to line the three up by responsibility. In IaaS you manage the OS, runtime, applications and data, and Microsoft manages the physical layers. In PaaS you manage applications and data, and Microsoft also runs the OS and runtime. In SaaS you manage your data, devices, accounts and settings, and Microsoft runs everything else. Moving from IaaS to SaaS, flexibility decreases, and so does the amount of work and the specialist skill you need in-house. None of them is best in general; each fits a different need.",
   "Consider a worked example. A company has three requests on the same day. First, the sales team wants a CRM system next month; building one would take a year, so the answer is a SaaS product such as Dynamics 365. Second, developers want to launch a new customer portal written in .NET and do not want to patch servers, so the answer is PaaS on App Service with Azure SQL Database. Third, the finance team runs a 15-year-old accounting package that needs a particular Windows Server version and a hardware dongle emulator installed as administrator, and the datacenter is closing; the answer is IaaS, rehosting it on Azure VMs. The same company now uses all three types, each with a different shared responsibility split.",
   "Common mistakes: thinking SaaS means the customer has no security duties; picking IaaS 'to be safe' when a PaaS or SaaS option meets the need with far less work; and assuming the choice is all or nothing. Organizations often use all three at once, and security teams need to know which type each workload uses, because the split of responsibility is different for each. A final trap is confusing the service type with the deployment model: SaaS, PaaS and IaaS describe what you rent, while public, private and hybrid describe where it runs and who shares it.",
   "Exam questions often describe a need and list services. 'Ready-to-use application', 'subscription per user', 'no development or infrastructure management' points to SaaS. 'Developers deploy their own code without managing servers' points to PaaS. 'Full control over the OS', 'custom software' or 'lift-and-shift' points to IaaS. A question asking which model requires the most customer management expects IaaS, and the least expects SaaS. Data and identities are the customer's in all three."
  ],
  "analogy": "Getting dinner shows the trade-off. Buying groceries and cooking from scratch is IaaS: you control every ingredient but do all the work. A meal kit is PaaS: the shopping and preparation are done, and you assemble and cook your own dish. A restaurant is SaaS: no cooking at all, but you choose from the menu and cannot change the recipe. In all three you still decide who joins you at the table and you keep hold of your wallet, which are your accounts and your data. Where it stops: a restaurant needs no setup, while SaaS still needs settings configured securely.",
  "mnemonic": "From the least handed over to the most: I-P-S, 'I Pay Someone'. IaaS, then PaaS, then SaaS; the further along, the more you pay someone else to run for you.",
  "terms": [
   [
    "Software as a service (SaaS)",
    "A complete application run by the provider and used over the internet, usually by subscription."
   ],
   [
    "Microsoft 365",
    "Microsoft's SaaS suite of email, office apps, file storage and collaboration tools."
   ],
   [
    "Customer relationship management (CRM)",
    "Software for managing interactions with customers and sales prospects."
   ],
   [
    "Per-user licensing",
    "A pricing model where you pay a recurring fee for each person who uses the application."
   ],
   [
    "Service type",
    "The category of cloud service, IaaS, PaaS or SaaS, which determines how responsibility is shared."
   ],
   [
    "Configuration responsibility",
    "The customer's duty to set a SaaS application's options, such as sharing and sign-in rules, securely."
   ],
   [
    "Multifactor authentication (MFA)",
    "Sign-in that requires a second proof of identity, such as an app prompt, in addition to a password."
   ],
   [
    "Admin center",
    "The web console where SaaS administrators manage users, licenses and settings."
   ]
  ],
  "example": "A law firm needs email, calendars and document collaboration for 80 staff and has no IT developers. It subscribes to Microsoft 365, pays per user each month and is productive within days. Microsoft runs and updates the service. The firm's IT contractor still configures multifactor authentication, blocks external sharing of client folders and removes accounts when staff leave, because accounts, devices and data remain the firm's responsibility in SaaS.",
  "mistakes": [
   [
    "SaaS means the customer has no security duties.",
    "The customer still owns data, devices, accounts and identities, and must configure settings such as MFA, sharing and retention securely."
   ],
   [
    "Choose IaaS to be safe, because it can run anything.",
    "IaaS brings the most management work. If a PaaS or SaaS option meets the need, it usually costs less effort and needs fewer specialist skills."
   ],
   [
    "An organization must pick one service type for everything.",
    "Most organizations use all three at once, choosing per workload, and each workload has its own shared responsibility split."
   ],
   [
    "SaaS, PaaS and IaaS are the same thing as public, private and hybrid.",
    "Service types describe what you rent and how responsibility is split. Cloud models describe where resources run and who shares them."
   ]
  ],
  "tryit": [
   [
    "Harbor Lights, a 40-person nonprofit, needs shared calendars, email and file storage. It has no developers and one part-time IT volunteer. Which service type fits, and which responsibilities will the volunteer still have?",
    "SaaS, such as Microsoft 365, fits because the nonprofit needs finished applications and has no one to build or run servers. The volunteer still manages user accounts and licenses, turns on MFA, sets external sharing rules, removes accounts when people leave, and protects the organization's data and devices."
   ],
   [
    "A research group wants to run a vendor's analysis tool that must be installed with root access on a specific Linux distribution version, and the vendor offers no hosted version. Which service type fits, and why not the others?",
    "IaaS, using Azure VMs, because the tool needs control of the operating system and administrator-level installation. PaaS does not let you choose the OS or install arbitrary software underneath, and SaaS is not an option because the vendor offers no hosted service."
   ]
  ],
  "tip": "Match the scenario to the control needed: full OS control or lift-and-shift is IaaS, build-your-own-app without managing servers is PaaS, ready-to-use application is SaaS. Data, devices and identities are the customer's in all three.",
  "check": [
   [
    "A company wants email for its staff without deploying or maintaining anything. Which service type fits?",
    "SaaS, such as Microsoft 365, because the provider runs the whole application."
   ],
   [
    "Which service type requires the most management by the customer?",
    "IaaS, because the customer manages the OS, runtime, applications and data."
   ],
   [
    "In SaaS, who is responsible for deciding whether files can be shared outside the organization?",
    "The customer, because configuring the application and protecting its data and accounts stay with the customer."
   ],
   [
    "Developers want to deploy a custom web API without patching servers. Which service type fits?",
    "PaaS, for example Azure App Service, because it runs their code while Microsoft manages the OS and runtime."
   ],
   [
    "Which service type gives the customer the most flexibility and also the most management work?",
    "IaaS, because the customer controls and manages the OS, runtime, applications and data."
   ]
  ]
 },
 {
  "t": "Azure regions, region pairs and sovereign regions (Azure Government, Azure operated by 21Vianet in China)",
  "hook": "Elke, the compliance officer at Rheinwerk Outdoor, a fictional online retailer in Germany, stops by your desk with a printed contract clause: customer data must stay in Germany. Ten minutes later, the head of e-commerce asks why the new shop pages load slowly for shoppers, and you discover the test environment was built in a region on another continent. Then a sales lead mentions a possible partnership with a US state agency that requires a government-only cloud. You open the region list in the portal and see dozens of names. How do you choose where to run things, and what happens if an entire region goes dark?",
  "simple": "Azure has datacenters all over the world, grouped into regions. A region is an area, like West Europe or East US, with one or more datacenters close together. When you create something in Azure, you usually pick a region, which decides where it physically runs and where its data is kept. Picking a region near your users makes things faster, like shopping at a store in your town instead of one across the country. Many regions have a partner region in the same part of the world, called a region pair, which helps with backup and recovery. Some special regions, called sovereign regions, are kept separate for legal reasons, such as Azure Government for US government agencies and Azure in China, which a local company called 21Vianet runs.",
  "body": [
   "An Azure region is a geographical area that contains at least one, and usually several, Azure datacenters connected by a low-latency network. When you create most resources, you choose a region, such as East US or West Europe. The region decides where your resource physically runs and where its data is stored, which affects latency for your users, which services and VM sizes are available, the price, and whether you meet data-residency requirements. In the Azure command-line interface (CLI), the region is the `--location` parameter, and `az account list-locations --output table` lists the regions available to your subscription.",
   "Not every service or feature is offered in every region, and prices can differ between regions. Some services are global and do not ask you to pick a region at all, such as Microsoft Entra ID, Azure Front Door and Azure DNS, which hosts Domain Name System (DNS) zones. Regions are grouped into geographies, which are markets such as the United States or Europe that share data-residency and compliance boundaries. Choosing a region inside the right geography is how many organizations keep customer data within a country or economic area.",
   "How do you find out what a region offers? Microsoft publishes a list of products available by region, and the portal only offers the regions where a service or VM size can be deployed for your subscription. It is worth checking early, because a design built around a feature that is missing in your required region has to change. Prices also vary, so the Pricing Calculator lets you compare the same resource in different regions. Inside many regions you will also see availability zones, which are separate datacenters within the region. Zones and regions solve different problems: zones protect against the failure of a datacenter, and a second region protects against the failure of the whole region.",
   "Many Azure regions are paired with another region in the same geography, typically hundreds of kilometres apart, so that a regional disaster such as a flood or major power failure is unlikely to affect both. Region pairs bring several benefits. If there is a broad outage affecting multiple regions, Microsoft prioritizes recovering one region of each pair. Planned platform updates are rolled out to one region of a pair at a time, reducing the chance that both are affected by a bad update. Data generally stays within the same geography as its pair, which helps with residency rules. And some services, such as geo-redundant storage (GRS), replicate data to the paired region automatically. Most pairs are two-way, but a few are one-way, and some newer regions have no pair and rely on availability zones and your own choice of a second region for resilience. A region pair does not, however, fail your application over by itself. Apart from services that replicate to the pair as a built-in option, such as GRS, you decide what to replicate and how to switch over.",
   "Sovereign regions are instances of Azure that are physically and logically isolated from the main public Azure cloud for legal or compliance reasons. Azure Government serves US government agencies at federal, state and local level, and their partners, with datacenters operated by screened US personnel and additional compliance certifications. Azure in China is operated by 21Vianet, a separate Chinese company, rather than directly by Microsoft; Microsoft does not operate the datacenters there, which lets the service comply with Chinese regulations. Sovereign clouds have their own portals, endpoints and sign-in, and not every public Azure service is available in them. In Azure CLI you switch between them with commands such as `az cloud set --name AzureUSGovernment` or `az cloud set --name AzureChinaCloud`.",
   "When choosing a region, weigh four things: closeness to users for low latency, availability of the services and sizes you need, cost, and compliance or data-residency rules. For resilience, design across availability zones within one region to survive a datacenter failure, and across two regions, often a pair, to survive a regional disaster.",
   "Consider a worked example. A German online retailer must keep customer data in Germany, and most of its customers are in Germany. It deploys its production environment to Germany West Central, spreading VMs across availability zones there. For disaster recovery it replicates data to Germany North, the paired region in the same geography, using geo-redundant storage and Azure Site Recovery. When Microsoft rolls out a platform update, it reaches one region before the other, so the retailer's standby copy is not updated at the same moment as production.",
   "Common mistakes: thinking every region offers every service; confusing a region (a geographic area of datacenters) with an availability zone (a separate location inside a region); assuming Microsoft runs Azure in China; and assuming Azure Government is open to any company that wants extra security. A general commercial customer cannot simply sign up for Azure Government; it is for government bodies and eligible partners.",
   "Exam questions often give a requirement and ask for the feature. 'Keep a copy of data in another region for disaster recovery' or 'staggered updates' points to region pairs. 'US federal agency with compliance needs' points to Azure Government. 'Operated by 21Vianet' identifies Azure in China. 'Reduce latency for users in Asia' points to deploying in a region near them. 'Survive a datacenter failure within a region' is a zone question, not a region-pair question."
  ],
  "analogy": "Region pairs are like a company with two branch offices in the same country, placed far enough apart that one storm will not close both. Head office never renovates both branches in the same week, which is the staggered update rollout, and after a widespread disaster the repair crews make sure at least one branch of each pair reopens first. Sovereign regions are like an embassy with its own staff and its own entrance. Where it stops: having a second branch does not move your files there; apart from features such as GRS, you must set up replication yourself.",
  "terms": [
   [
    "Region",
    "A geographical area containing one or more Azure datacenters connected by a low-latency network."
   ],
   [
    "Geography",
    "A market, such as Europe or the United States, containing regions that share data-residency and compliance boundaries."
   ],
   [
    "Region pair",
    "Two regions in the same geography linked for disaster recovery, prioritized recovery and staggered updates."
   ],
   [
    "Sovereign region",
    "An Azure instance isolated from public Azure for legal or compliance reasons."
   ],
   [
    "Azure Government",
    "A sovereign cloud for US government agencies and their partners, run by screened US personnel."
   ],
   [
    "Azure operated by 21Vianet",
    "Azure in China, operated by a separate local company rather than directly by Microsoft."
   ],
   [
    "Geo-redundant storage (GRS)",
    "A storage option that replicates data to the paired region for protection against regional outages."
   ],
   [
    "Availability zone",
    "A physically separate datacenter location within a region, with independent power, cooling and networking."
   ],
   [
    "Data residency",
    "A requirement that data be stored within a particular country or area."
   ]
  ],
  "example": "A European insurer chooses West Europe as its main region because its customers are there and data must stay in the EU. It uses geo-redundant storage so policy documents are copied to North Europe, the paired region. Later, when it opens a US subsidiary that works on government contracts, the subsidiary's regulated workloads go to Azure Government, which has its own portal and endpoints separate from the insurer's main Azure tenant.",
  "mistakes": [
   [
    "Every Azure region offers every service.",
    "Service and VM size availability varies by region, and prices differ. Check availability for the regions you need before designing."
   ],
   [
    "A region and an availability zone are the same thing.",
    "A region is a geographic area containing datacenters. An availability zone is a separate location inside a region. Zones protect against a datacenter failure; a second region protects against a regional disaster."
   ],
   [
    "Microsoft operates Azure in China.",
    "Azure in China is operated by 21Vianet, a separate company, so that the service complies with Chinese regulations."
   ],
   [
    "Any company can sign up for Azure Government for extra security.",
    "Azure Government is limited to US government bodies and eligible partners. General commercial customers use public Azure."
   ]
  ],
  "tryit": [
   [
    "Maple Grove Clinics in Canada must keep patient data in Canada and wants its booking system to survive both a datacenter failure and the loss of an entire region. Most patients are in Ontario and Quebec. How would you design the region choices?",
    "Deploy production in a Canadian region close to the patients, such as Canada Central, spreading instances across availability zones to survive a datacenter failure. For regional disaster recovery, replicate to Canada East, its paired region in the same geography, using options such as geo-redundant storage and Azure Site Recovery. Both regions are in Canada, so data residency is met, and staggered updates mean the standby is not updated at the same moment as production."
   ]
  ],
  "tip": "Region pairs help with disaster recovery, prioritized recovery and staggered updates; availability zones help within one region. Azure in China is operated by 21Vianet, not Microsoft, and Azure Government is for US government use.",
  "check": [
   [
    "Give two benefits of region pairs.",
    "Any two of: one region in each pair is prioritized for recovery in a broad outage, platform updates roll out to one region at a time, and services such as GRS replicate data to the pair within the same geography."
   ],
   [
    "Who operates Azure in China?",
    "21Vianet, a separate company, rather than Microsoft directly."
   ],
   [
    "Name three factors to consider when choosing a region.",
    "Any three of: latency to users, service and feature availability, price, and compliance or data-residency requirements."
   ],
   [
    "Why can a sovereign cloud not simply be used by any business?",
    "Sovereign clouds such as Azure Government are isolated for specific legal or compliance needs and are limited to eligible customers such as government agencies and their partners."
   ],
   [
    "Which kind of failure do availability zones protect against, and which do region pairs help with?",
    "Availability zones protect against the failure of a datacenter within a region; region pairs help with recovery from the loss of a whole region."
   ]
  ]
 },
 {
  "t": "Availability zones and datacenters: zonal vs zone-redundant services",
  "hook": "It is 2:40 a.m. and your phone buzzes: the checkout page for Lantern Ticketing is returning errors. You are on call. The monitoring dashboard shows the three web servers are healthy, one in each availability zone, yet every order fails. Then you spot it. The single database virtual machine lives in zone 1, and Azure Service Health reports a cooling problem in one datacenter in that zone. Your web tier survived because it was spread out; your database did not, because it was pinned to one place. As customers refresh in frustration, the question in your head is simple: which parts of this design were truly protected, and which only looked protected?",
  "simple": "Azure runs on huge buildings full of computers called datacenters. Azure groups nearby datacenters into availability zones, and groups zones into a region, like a city. Each zone has its own power, cooling and network, so trouble in one zone should not spread to the others. Some things you create, such as a single virtual machine, live in one zone you pick. If that zone has a problem, that thing goes down. Other services copy themselves across zones automatically, so they keep working if one zone fails. Think of keeping your house keys: one set in your pocket can be lost in one mishap, but sets left with three different neighbors on different streets are much harder to lose all at once.",
  "body": [
   "Everything in Azure ultimately runs in a datacenter: a building full of servers, storage and networking equipment with its own power, cooling and physical security. You never choose an individual datacenter when you deploy a resource. Instead, Azure groups datacenters into availability zones, and zones into regions. Understanding that hierarchy, datacenter inside zone inside region, is the key to answering resilience questions on the Microsoft Azure Fundamentals exam (AZ-900). An availability zone is a physically separate location within an Azure region, made up of one or more datacenters with independent power, cooling and networking. Zones are far enough apart that a local failure, such as a fire, flood or power failure in one building, should not affect the others, yet close enough to be connected by a high-speed, low-latency private network, so data can be replicated between them quickly. Regions that support availability zones have a minimum of three zones. Not every region supports zones, and not every service supports them, so check the region and the service documentation before you design around them.",
   "Why does this matter so much? Availability zones are the main way to protect an application from a datacenter-level failure inside one region. If you run copies of your application in each of three zones behind a zone-redundant load balancer, the loss of one zone leaves the other two serving users. Using zones can increase cost, for example because you run more instances and may pay for data transferred between zones, but it improves resilience and usually earns a higher service-level agreement (SLA) than a single-zone design. An SLA is Microsoft's formal commitment to a level of uptime, and spreading a workload across zones is one of the clearest ways to qualify for a stronger one.",
   "Azure services that support availability zones fall into two categories, and the exam tests the difference directly. Zonal services are pinned to a specific zone that you choose, for example a virtual machine (VM), a managed disk or a public IP address deployed to zone 1. In the portal you see this as an Availability zone drop-down with the values 1, 2 and 3 on the create page. The platform does not move a zonal resource if its zone fails, so to make a zonal design resilient you deploy several resources in different zones yourself. Zone-redundant services are replicated or spread across zones automatically by the platform, such as zone-redundant storage (ZRS), a zone-redundant Azure SQL Database or a zone-redundant load balancer. If one zone fails, the service keeps running without you doing anything. Here is the difference in commands:",
   "```bash\n# Zonal: you pick the zone, one VM per command\naz vm create --resource-group rg-app --name web1 --image Ubuntu2204 --zone 1\naz vm create --resource-group rg-app --name web2 --image Ubuntu2204 --zone 2\n# Zone-redundant: the platform spreads the copies\naz storage account create --resource-group rg-app --name contosozrs01 --sku Standard_ZRS\n```",
   "Notice what each command says about responsibility. With the VMs, you decide where each copy lives and you must create one per zone. With the storage account, the single word in the SKU, `Standard_ZRS`, tells Azure to keep the copies in three zones for you. There is also a third group: non-regional or always-available services, which are resilient to both zone and region outages because they run globally. Examples include Microsoft Entra ID, Azure DNS and Azure Front Door. You do not pick a zone or even a single region for these.",
   "It helps to see zones as one layer in a ladder of protection. Availability sets protect against rack-level hardware failure and planned maintenance inside a single datacenter. Availability zones protect against the loss of a whole datacenter within a region. Region pairs or multi-region designs protect against the loss of an entire region, such as a widespread natural disaster. Each step up covers a larger failure and usually costs more, so the right choice depends on how much downtime the business can tolerate.",
   "Consider a worked example. A payment gateway runs in a zone-enabled region. The team deploys web VMs as a scale set spread across zones 1, 2 and 3, uses a zone-redundant load balancer, stores files in ZRS storage and uses a zone-redundant Azure SQL Database. During a cooling failure, zone 2 goes offline. The load balancer's health probes stop getting answers from the zone 2 VMs, so it stops sending traffic to them, while the storage and database keep serving from the remaining zones. Customers notice nothing. Because every layer was zone-aware, no single datacenter was a single point of failure.",
   "Several mistakes come up again and again. People think a single VM placed in zone 2 is protected against a zone failure, but it is zonal, so it goes down with its zone. They assume every region has zones, or believe zones protect against a whole-region disaster. They confuse locally redundant storage (LRS), which keeps copies in one datacenter, with ZRS, which spreads them across zones. It is also easy to forget that zone redundancy has to exist at every layer: a zone-redundant web tier still fails if the single database behind it is zonal, which is exactly what happened in the opening scene.",
   "Exam questions give clear clues, and it helps to read the verbs carefully. 'You choose the zone' or 'pinned to a zone' means zonal. 'Replicated automatically across zones' means zone-redundant. 'Protect against a datacenter failure' means availability zones. 'Protect against a regional outage' means a second region. If a question lists storage options, LRS stays in one datacenter, ZRS spans zones, and geo-redundant storage (GRS) reaches the paired region."
  ],
  "analogy": "Think of a region as a city and its availability zones as three separate fire stations across town, each with its own power and water supply. A zonal resource is a fire truck parked at one station: if that station floods, the truck is stuck. A zone-redundant service is a dispatch system that already has trucks at all three stations and reroutes calls automatically. The analogy stops where the city does: if a disaster hits the whole city, every station is affected, which is why regional outages need a second region.",
  "terms": [
   [
    "Datacenter",
    "A physical facility of servers, storage and networking with its own power, cooling and security."
   ],
   [
    "Availability zone",
    "A physically separate location within a region, made up of one or more datacenters with independent power, cooling and networking."
   ],
   [
    "Zonal service",
    "A resource pinned to a single zone that you choose, such as a VM in zone 1; it does not move if that zone fails."
   ],
   [
    "Zone-redundant service",
    "A service the platform replicates across zones automatically, such as ZRS storage or a zone-redundant load balancer."
   ],
   [
    "Zone-redundant storage (ZRS)",
    "A storage redundancy option that keeps copies of data in three zones in the region."
   ],
   [
    "Non-regional service",
    "A global service, such as Microsoft Entra ID or Azure Front Door, that is not tied to a single region."
   ],
   [
    "Service-level agreement (SLA)",
    "Microsoft's formal uptime commitment for a service, often higher for designs that span zones."
   ]
  ],
  "example": "A ticketing company learns that its database VM in zone 1 went offline during a zone outage, taking the site down, even though its web servers in zones 1, 2 and 3 were fine. The review explains that the database VM was zonal and had no copy elsewhere. The team moves to a zone-redundant Azure SQL Database and ZRS storage so the platform keeps data available across all three zones.",
  "mistakes": [
   [
    "A VM deployed to zone 2 is protected against a zone outage.",
    "A VM in a chosen zone is zonal and fails with that zone. Protection comes from running copies in several zones or using a zone-redundant service."
   ],
   [
    "Availability zones protect against a disaster that takes out the whole region.",
    "All zones sit inside one region. Surviving a regional outage requires a second region, such as the paired region or a multi-region design."
   ],
   [
    "Every Azure region has availability zones.",
    "Only some regions support zones, and not every service supports them. Zone-enabled regions have at least three."
   ],
   [
    "LRS and ZRS give the same protection.",
    "LRS keeps three copies in one datacenter; ZRS spreads three copies across three zones, so only ZRS survives a datacenter or zone loss."
   ]
  ],
  "tryit": [
   [
    "Marlow Clinics runs a patient portal in a zone-enabled region. The web tier is a scale set across zones 1, 2 and 3, but the appointment database is a single SQL Server VM in zone 3, and files sit in an LRS storage account. Leadership wants the portal to survive the loss of any one datacenter. What should change?",
    "Move the database to a zone-redundant Azure SQL Database (or run database VMs in multiple zones with replication) and change the storage to ZRS. The web tier is already spread across zones, but the zonal database VM and the LRS account are each single points of failure at the datacenter level."
   ],
   [
    "A manager reads that availability zones improve resilience and asks you to deploy the company's only file server VM 'into an availability zone' to make it highly available. Is that enough?",
    "No. Placing one VM in a zone only makes it zonal; it still fails with that zone. High availability needs at least two instances in different zones, or a zone-redundant service such as Azure Files on ZRS."
   ]
  ],
  "tip": "A VM placed in 'zone 2' is zonal; ZRS storage is zone-redundant. Zone-enabled regions have at least three zones. Zones protect against datacenter failures, not whole-region failures.",
  "check": [
   [
    "What is the minimum number of availability zones in a zone-enabled region?",
    "Three, so the loss of one zone still leaves at least two."
   ],
   [
    "Is a VM deployed to a specific zone zonal or zone-redundant?",
    "Zonal, because it is pinned to the zone you chose and will not move if that zone fails."
   ],
   [
    "What does an availability zone protect against that a single datacenter design does not?",
    "The failure of an entire datacenter, such as a power or cooling outage in one building."
   ],
   [
    "A company needs protection against a regional disaster. Are availability zones enough?",
    "No, zones are all inside one region; protecting against a regional disaster needs a second region, for example the paired region."
   ],
   [
    "Name one service that is non-regional.",
    "Microsoft Entra ID, Azure DNS or Azure Front Door, which run globally rather than in one region."
   ]
  ]
 },
 {
  "t": "Azure resources, resource groups, subscriptions and management groups: the hierarchy and what each is for",
  "hook": "Priya, the new cloud lead at Ridgeway University, opens the monthly Azure bill and finds one long, tangled list. Chemistry's research VMs sit beside the admissions website and a forgotten lab from last spring that is still running. The finance office wants a separate bill for every faculty, the security office wants one rule that blocks unapproved regions everywhere, and a professor wants to delete a finished project without touching anyone else's work. Three groups, three different needs, and one messy subscription. How should Priya organize everything so each request is easy to meet and stays easy as the university grows?",
  "simple": "Azure gives you four boxes that fit inside each other. The smallest things are resources, like one virtual computer or one storage space. Resources go into resource groups, which hold things that belong together and get deleted together. Resource groups go into subscriptions, which are how Azure sends you a bill and controls who has access. Subscriptions can be grouped into management groups so you can set rules for many at once. Rules set on a bigger box apply to every smaller box inside it. It is like a school: a rule from the district applies to every school, every classroom and every desk, while one teacher's classroom rule applies only to that room.",
  "body": [
   "Azure organizes everything you create into a four-level hierarchy: management groups, subscriptions, resource groups and resources. Knowing what each level is for, and how settings flow from top to bottom, is one of the most tested areas of the Microsoft Azure Fundamentals exam (AZ-900). The best way to learn it is from the bottom up, because each level exists to solve a problem the level below cannot solve alone.",
   "At the bottom are resources: individual things you create and pay for, such as a virtual machine, a virtual network, a storage account or a database. Every resource is created and managed through Azure Resource Manager (ARM), the deployment and management layer behind the portal, the command line and templates. Whether you click Create in the portal or run a script, the request goes to ARM, which checks your permissions and policies before anything is built. That single front door is why permissions and policies apply consistently no matter which tool you use.",
   "Every resource must belong to exactly one resource group. A resource group is a logical container for resources that share a lifecycle, such as all the parts of one application or one environment. Resource groups cannot be nested. Deleting a resource group deletes every resource inside it, which makes them handy for labs and temporary environments. You can apply role-based access control (RBAC) permissions, policies, locks and tags to a resource group, and resources inside inherit the permissions and policies. A resource group has a location that stores its metadata, but it can contain resources in other regions, so a group created in West Europe can hold a VM in East US. Most resources can be moved between resource groups and subscriptions if your needs change.",
   "Resource groups live inside a subscription. A subscription is a unit of management, billing and scale, and it trusts one Microsoft Entra tenant for identities. It is a billing boundary, because each subscription gets its own invoice and cost reports, and an access-control boundary, because permissions can be assigned per subscription. Organizations create several subscriptions to separate environments such as production and development, to separate departments or projects for billing, to isolate workloads with different compliance needs, or to work within per-subscription limits on how many of certain resources can exist. One account can own or access several subscriptions, which is why the portal has a subscription filter at the top of many pages.",
   "Management groups sit above subscriptions. They let you group subscriptions and apply governance, such as Azure Policy and RBAC assignments, to all of them at once. Management groups can be nested to reflect your organization, for example Corp, then Production and Non-production beneath it, and every directory has a single root management group at the top. A subscription can be in only one management group at a time, and a management group has only one parent. Here is how that looks from the command line:",
   "```bash\naz account management-group create --name corp-prod --parent corp\naz account management-group subscription add --name corp-prod --subscription \"Prod-Sales\"\naz group create --name rg-sales-web --location westeurope --subscription \"Prod-Sales\"\n```",
   "The key idea tying the levels together is inheritance. A policy or role assigned at a management group flows down to every subscription, resource group and resource beneath it. For example, a policy at the root that allows only European regions applies everywhere, and granting a team the Reader role at a subscription lets it read every resource group in that subscription. Place governance as high as it makes sense, and keep exceptions lower down. Tags are the exception to automatic inheritance: a tag on a resource group is not copied to its resources unless you use a policy to do so. This detail matters for cost reporting, because teams often expect a department tag on a group to show up on every resource and are surprised when it does not.",
   "Consider a worked example. A company has Finance and Sales departments, each with production and development work. It creates a root-level policy restricting regions, a Production management group with stricter policies such as required backups, and a Non-production group with looser ones. Each department gets a production and a development subscription placed under the right group, so bills are separated per department and environment. Inside Sales-Prod, the web app, its database and its storage sit in one resource group, `rg-sales-web`, because they are deployed and deleted together. When the web app is retired, deleting that group removes everything at once and the charges stop.",
   "Learners commonly slip in a few places. They think resource groups can be nested, or that a resource can sit in two resource groups. They assume a resource group's region limits where its resources can be. They mix up the billing boundary, which is the subscription, with the grouping-for-governance level, which is the management group. Another is expecting tags to flow down automatically, as policies and roles do.",
   "Exam questions test the order and the purpose of each level. 'Apply a policy to many subscriptions at once' is a management group. 'Separate billing for departments' is separate subscriptions. 'Delete all resources of an application together' is a resource group. 'Give a team access to everything in one environment' is often an RBAC assignment at the subscription or resource group level. 'Isolate a workload with different compliance rules' can mean a separate subscription. From top to bottom the order is management groups, subscriptions, resource groups, resources."
  ],
  "analogy": "Picture a company's filing system. Resources are individual documents. A resource group is a folder holding the documents for one project; shred the folder and every document in it goes too. A subscription is a filing cabinet with its own lock and its own budget code. Management groups are the rooms that hold several cabinets, where a sign on the door ('no documents leave this room') applies to every cabinet inside. The analogy breaks in one spot: unlike real folders, resource groups can never sit inside other folders.",
  "mnemonic": "My Sister Reads Romances: Management groups, Subscriptions, Resource groups, Resources, from top to bottom. Rules flow down the sentence, never up.",
  "terms": [
   [
    "Resource",
    "A single manageable item in Azure, such as a VM, storage account or virtual network."
   ],
   [
    "Resource group",
    "A logical container for resources that share a lifecycle; it cannot be nested, and each resource belongs to exactly one."
   ],
   [
    "Subscription",
    "A unit of billing, access control and scale that contains resource groups and trusts one Entra tenant."
   ],
   [
    "Management group",
    "A container above subscriptions used to apply policy and access to many subscriptions at once; it can be nested."
   ],
   [
    "Root management group",
    "The single top-level management group in a directory, above all other management groups and subscriptions."
   ],
   [
    "Inheritance",
    "The flow of policies and role assignments from a higher level of the hierarchy to everything below it."
   ],
   [
    "Azure Resource Manager (ARM)",
    "The deployment and management service through which all Azure resources are created and managed."
   ]
  ],
  "example": "A university IT team gives each faculty its own subscription so each faculty receives a separate bill. All faculty subscriptions sit under a Faculties management group with a policy that allows only approved VM sizes and regions. Within the Physics subscription, each research project gets its own resource group, and when a grant ends, the team deletes that project's resource group to remove all its resources and stop the charges.",
  "mistakes": [
   [
    "Resource groups can be nested inside other resource groups.",
    "Resource groups cannot be nested. Management groups are the level that can be nested."
   ],
   [
    "A resource group in West Europe can only hold resources in West Europe.",
    "The group's location stores only its metadata; its resources can be in any region."
   ],
   [
    "Management groups are how you split the bill between departments.",
    "The subscription is the billing boundary. Management groups organize subscriptions for governance."
   ],
   [
    "A tag on a resource group automatically appears on every resource inside it.",
    "Policies and role assignments inherit; tags do not, unless you apply a policy that copies them."
   ]
  ],
  "tryit": [
   [
    "Fernhill Logistics has 30 subscriptions. The security team must ensure that no one in any of them can create resources outside two approved regions, and new subscriptions should get the rule automatically. Where should the policy be assigned?",
    "At a management group that contains all 30 subscriptions, or the root management group. Policies assigned there are inherited by every subscription beneath it, including new subscriptions placed in that group, so no one has to remember to assign it again."
   ],
   [
    "A developer built a test environment with a VM, a disk, a network and a public IP, all in a resource group named rg-test-jan. The test is over and the company wants every charge from it to stop. What is the simplest action?",
    "Delete the resource group rg-test-jan. Deleting a resource group deletes every resource inside it, which is why grouping by shared lifecycle is recommended."
   ]
  ],
  "tip": "Order from top to bottom: management groups, subscriptions, resource groups, resources. Resource groups cannot be nested; management groups can. A resource belongs to exactly one resource group; policies and RBAC inherit downward, tags do not.",
  "check": [
   [
    "What happens to resources when you delete their resource group?",
    "They are all deleted, because the resource group is their container and lifecycle boundary."
   ],
   [
    "Which level would you use to apply one policy to 20 subscriptions?",
    "A management group containing those subscriptions, because policies assigned there are inherited by all of them."
   ],
   [
    "Which level acts as the main billing boundary?",
    "The subscription, because each subscription is invoiced and reported separately."
   ],
   [
    "Can a resource group in West Europe contain a VM in East US?",
    "Yes, the resource group's location only stores its metadata; its resources can be in other regions."
   ]
  ]
 },
 {
  "t": "Compute: virtual machines, VM scale sets, availability sets and Azure Virtual Desktop",
  "hook": "It is the first week of January at Oakline Tax Partners, and forty seasonal preparers start Monday. Each one plans to bring a personal laptop. Meanwhile the firm's client portal slows to a crawl every evening when people log in after work, and the two old licensing servers in the back room rebooted together during last month's maintenance, locking everyone out of the tax software for an hour. Dana, the firm's only IT person, has a budget for Azure and a single question: which Azure compute options solve which of these three problems without creating new ones?",
  "simple": "A virtual machine is a computer that lives in Microsoft's building instead of yours. You pick how big it is and which operating system it runs, and you take care of it like your own PC. When many people visit a website at once, a scale set can create extra identical machines automatically and remove them later. An availability set spreads a few machines across different racks of hardware so one broken rack or one round of updates does not take them all down. Azure Virtual Desktop lets people use a full Windows desktop from their own laptop or phone while all the files stay safely in Azure. It is like streaming a movie instead of buying the disc: you watch on your device, but the movie never lives there.",
  "body": [
   "Azure virtual machines (VMs) are the infrastructure as a service (IaaS) compute option. A VM is a virtualized computer that runs Windows or Linux on Microsoft's hardware. You pick an image (the operating system, sometimes with software preinstalled), a size (the number of virtual CPUs and amount of memory), disks and networking. You have full control of the operating system (OS), so VMs suit lift-and-shift migrations, custom software, and test and development. With that control comes responsibility: you handle patching, antivirus and configuration, just as you would on a server in your own building.",
   "Billing for VMs has a detail that appears on the exam and in real bills. A running VM is billed for compute even when idle. Shutting it down from inside the operating system leaves it in a Stopped state, and compute charges continue because the hardware is still reserved. Stopping it from the portal or command line so that its status reads Stopped (deallocated) releases the hardware and stops compute charges, though its disks are still billed. The Microsoft Azure Fundamentals exam (AZ-900) expects you to know VMs and three related services: scale sets, availability sets and Azure Virtual Desktop.",
   "Virtual machine scale sets let you create and manage a group of identical, load-balanced VMs. Instead of building each VM by hand, you define the configuration once, and the scale set creates the instances. Scale sets support autoscale, adding VMs when demand grows, for example when average CPU stays above a threshold, and removing them when it falls. They can spread instances across availability zones, and updates can be rolled out across the instances in batches so the service stays up. They are used for large, stateless workloads such as web front ends, batch processing and big compute jobs. Stateless matters: because any instance can be removed at any moment, the application must not store anything important only on one VM. Creating one is a single command:",
   "```bash\naz vmss create --resource-group rg-web --name web-vmss --image Ubuntu2204 --instance-count 3 --zones 1 2 3 --admin-username azureuser --generate-ssh-keys\n```",
   "Availability sets are an older way to keep a group of VMs available within a single datacenter. You place two or more VMs that do the same job in an availability set, and Azure spreads them across fault domains and update domains. A fault domain is a group of hardware that shares a power source and network switch, like a rack, so a hardware failure affects only the VMs in that fault domain. An update domain is a group of VMs that Azure may reboot at the same time during planned maintenance, so not all your VMs restart together. Availability sets cost nothing extra; you pay only for the VMs. They protect against rack and maintenance failures. Availability zones protect against a larger failure, the loss of a whole datacenter, and for new designs zones are generally preferred where the region supports them.",
   "Azure Virtual Desktop is a desktop and application virtualization service. Users connect from almost any device, whether Windows, macOS, iOS, Android or a web browser, to a full Windows desktop or to individual apps that run in Azure. Because the desktop runs in the cloud, company data does not have to be stored on the user's device, and access can be protected with Microsoft Entra ID and multifactor authentication (MFA). Azure Virtual Desktop supports Windows multi-session editions, where several users share one VM, which lowers cost compared with one VM per person. The VMs that serve users are grouped into a host pool that you can scale up for busy periods and down afterwards. It fits remote and hybrid workers, contractors, call centers and staff who need a secure desktop from personal devices.",
   "Consider a worked example. A retailer needs four things. Its point-of-sale reporting server runs custom Windows software, so it goes on a standard VM. Its online shop has sharp daily peaks, so the web tier runs in a scale set across three zones with autoscale. A pair of legacy application servers must stay in one datacenter for licensing reasons, so they share an availability set, ensuring a rack failure or maintenance reboot never takes both down. Finally, seasonal staff hired for the holidays use their own laptops, so the retailer gives them Azure Virtual Desktop, and when a contract ends, their access is removed without any company data left on the laptop.",
   "Common mistakes follow a pattern. Learners think a scale set and an availability set are the same thing, when one is about many identical instances and scaling and the other is about spreading a few VMs across hardware. They assume availability sets protect against a datacenter outage. They believe that shutting down a VM from inside the OS stops compute billing, when only deallocating does. They treat Azure Virtual Desktop as a way to host web servers rather than user desktops. Another trap is forgetting that scale sets need an application that can run as many identical copies.",
   "Exam wording points to the right answer. 'Group of identical VMs that scales automatically' is a VM scale set. 'Protect VMs from a rack or hardware failure and planned maintenance within a datacenter' is an availability set, using fault and update domains. 'Protect against a datacenter failure' is availability zones. 'Give users a secure Windows desktop from any device' or 'multi-session Windows' is Azure Virtual Desktop. 'Full control of the operating system' is a VM."
  ],
  "analogy": "Think of an availability set as seating a team of security guards across different floors and shift rotations of one building: a power cut on one floor or one guard's break never leaves the building unguarded. A scale set is a staffing agency that sends more identical guards when crowds grow and sends them home when it is quiet. Neither helps if the whole building is closed, which is the job of availability zones.",
  "terms": [
   [
    "Virtual machine (VM)",
    "An IaaS compute resource that runs a full Windows or Linux operating system you manage."
   ],
   [
    "Virtual machine scale set",
    "A set of identical, load-balanced VMs that can scale automatically and span zones."
   ],
   [
    "Availability set",
    "A grouping of VMs spread across fault and update domains to survive hardware failures and maintenance in one datacenter."
   ],
   [
    "Fault domain",
    "A group of hardware sharing power and network, so a single hardware failure affects only that group."
   ],
   [
    "Update domain",
    "A group of VMs that may be rebooted together during planned maintenance."
   ],
   [
    "Deallocated",
    "A VM state in which the hardware is released and compute billing stops; disks are still billed."
   ],
   [
    "Azure Virtual Desktop",
    "A service that delivers Windows desktops and apps running in Azure to users on almost any device."
   ],
   [
    "Multi-session",
    "A Windows edition that lets several users share one VM in Azure Virtual Desktop."
   ]
  ],
  "example": "An accounting firm hires 40 temporary staff for tax season who work from their own laptops. Rather than buying and securing 40 company laptops, it deploys Azure Virtual Desktop with a Windows multi-session host pool. Staff sign in with multifactor authentication and get a full desktop with the firm's accounting software, while client files stay in Azure and never land on personal devices. After the season, the firm removes their access and scales the host pool down.",
  "mistakes": [
   [
    "A scale set and an availability set are two names for the same thing.",
    "A scale set creates and scales many identical VMs; an availability set spreads a few existing VMs across fault and update domains in one datacenter."
   ],
   [
    "An availability set protects VMs if the whole datacenter fails.",
    "Availability sets work inside one datacenter. Datacenter loss needs availability zones."
   ],
   [
    "Shutting down Windows inside the VM stops the compute charges.",
    "Compute billing stops only when the VM is stopped and deallocated from Azure; disks are billed either way."
   ],
   [
    "Azure Virtual Desktop is a good way to host a company website.",
    "It delivers desktops and apps to users. Websites belong on VMs, scale sets or App Service."
   ]
  ],
  "tryit": [
   [
    "Bluewater Insurance runs a quoting website that gets ten times its normal traffic every Monday morning. The app is stateless, and the team is tired of adding VMs by hand. Which compute option should they choose, and what feature solves the Monday problem?",
    "A virtual machine scale set with autoscale. It creates identical, load-balanced instances from one configuration and adds or removes them based on demand, which suits a stateless web tier."
   ],
   [
    "A developer leaves a large test VM running all weekend after shutting down the operating system from inside the VM. On Monday, the finance team asks why compute charges continued. What happened, and what should the developer do next time?",
    "Shutting down from inside the OS leaves the VM stopped but still allocated, so compute billing continued. Next time, stop the VM from the portal or CLI so it is deallocated; only disk charges will remain."
   ]
  ],
  "tip": "Scale sets are about many identical VMs and autoscale; availability sets spread VMs across fault and update domains inside one datacenter; zones protect against a datacenter loss; Azure Virtual Desktop delivers desktops to users.",
  "check": [
   [
    "What is the difference between a fault domain and an update domain?",
    "A fault domain groups hardware that shares power and network, protecting against hardware failure; an update domain groups VMs rebooted together during planned maintenance."
   ],
   [
    "Which service would you use to run many identical web VMs that scale automatically?",
    "A virtual machine scale set, which creates identical load-balanced instances and supports autoscale."
   ],
   [
    "Does a stopped (not deallocated) VM still incur compute charges?",
    "Yes, compute billing stops only when the VM is deallocated; disks are billed in either case."
   ],
   [
    "Why is Azure Virtual Desktop a good fit for contractors using personal devices?",
    "The desktop and data stay in Azure, so nothing sensitive is stored on the device, and access can be removed centrally."
   ]
  ]
 },
 {
  "t": "Containers and serverless compute: Container Instances, Container Apps, AKS, Azure Functions and App Service",
  "hook": "Monday stand-up at Tidewater Freight, and the whiteboard holds four sticky notes. Omar wants to run a container that converts shipping manifests for twenty minutes each night. Lena's team has eight new microservices but nobody who knows Kubernetes. The customer tracking site needs a home that no one has to patch. And someone has to send a text message every time a parcel scan lands in a queue, ideally for almost nothing when nothing ships. Your manager points at you: 'Pick the Azure service for each, and be ready to explain why.' Four needs, five candidate services. Where do you start?",
  "simple": "A container is a neat package holding an app and everything it needs, so it runs the same way anywhere. It is lighter than a whole virtual computer because it borrows the main computer's core instead of bringing its own. Azure has several ways to run containers. The simplest just runs one container for you. Others manage many containers that work together, either hiding the hard parts or giving you full control. Serverless options run your code only when something happens, like a file arriving, and charge you only for that work. App Service hosts websites without you looking after servers. It is like choosing transport: a taxi for one quick trip, a bus company you hire for a big group, or running your own fleet of buses.",
  "body": [
   "A container packages an application together with everything it needs to run, such as libraries, runtime and settings, but shares the host's operating system (OS) kernel instead of including a whole operating system. Containers are therefore smaller and start faster than virtual machines (VMs), and the same container image runs the same way on a laptop and in Azure. Docker is the best-known container format and engine, and images are usually stored in a registry such as Azure Container Registry. Where a VM virtualizes the hardware, a container virtualizes the operating system. Azure offers several ways to run containers, from simplest to most controllable, plus serverless and web-hosting options, and the Microsoft Azure Fundamentals exam (AZ-900) asks you to pick the right one for a scenario.",
   "Start with the simplest option. Azure Container Instances (ACI) is the fastest and simplest way to run a container in Azure. You give it an image and it runs it, with no VMs or orchestration to manage, and you are billed while the container runs. It suits simple applications, task automation, build jobs and short-lived batch work. It does not provide the rich scaling, service discovery and rolling upgrades of an orchestrator, so once you have many containers that need to find and replace each other, you outgrow it. One command is enough to get a container running with a public address:",
   "```bash\naz container create --resource-group rg-demo --name hello --image mcr.microsoft.com/azuredocs/aci-helloworld --ports 80 --ip-address Public\n```",
   "When one container becomes many, you need orchestration: automated deployment, scaling, networking and healing across a cluster of machines. Azure gives you two levels. Azure Container Apps is a serverless platform for running containerized applications and microservices. It builds on Kubernetes but hides it from you, adding features such as automatic scaling based on HTTP traffic or events (including scaling to zero), traffic splitting between revisions, and managed HTTPS ingress. It is a good middle ground when you want more than single containers but do not want to operate Kubernetes. Azure Kubernetes Service (AKS) is a managed Kubernetes service. Kubernetes is an open-source orchestrator that deploys, scales and heals large numbers of containers across a cluster of machines. In AKS, Azure manages the Kubernetes control plane, the brain of the cluster, and you manage the worker nodes, their upgrades and your workloads. AKS gives the most control and suits complex microservice applications and teams that already know Kubernetes.",
   "Serverless compute goes one step further and removes even the idea of a running app waiting for work. Azure Functions is event-driven serverless compute. You write a small function, choose a trigger, such as an HTTP request, a message on a queue, a new blob in storage or a timer, and Azure runs it when the event happens. On consumption-based hosting it scales automatically and you pay only for executions and the resources they use; other plans keep instances warm for faster starts or run on dedicated capacity. Functions are usually stateless, meaning each run starts fresh, but Durable Functions add state for longer workflows such as an approval process that waits for a human.",
   "For websites and APIs, there is a dedicated platform. Azure App Service is a platform as a service (PaaS) offering for hosting web apps, REST APIs and mobile back ends in many languages, on Windows or Linux, and it can also run containers. It includes built-in load balancing, autoscale, deployment slots for testing a release before swapping it into production, custom domains and integration with source control. In the portal, a deployment slot appears as a second copy of your app with its own address, and a single Swap button exchanges it with production. Choose App Service for long-running web applications, and Functions for short pieces of code reacting to events.",
   "Consider a worked example. A media company has four needs. A nightly script that converts files, packaged as a container, runs for twenty minutes and stops: Azure Container Instances. Its public website, built in Node.js by a small team that wants no servers to manage: App Service. A new set of containerized microservices that must scale to zero overnight, but the team has no Kubernetes experts: Container Apps. A resize step that should run every time a photo is uploaded to storage and cost nothing when idle: Azure Functions with a blob trigger. A separate platform team with deep Kubernetes skills later moves a large, complex service mesh onto AKS because it needs control over node pools and networking.",
   "Several mistakes recur. Learners think containers include a full operating system like VMs. They choose AKS for a single simple container, which adds needless complexity. They assume AKS means Microsoft manages everything, when you still manage node pools and workloads. They choose Functions for an always-on website. Another trap is forgetting that App Service can run containers too, so 'container' in a question does not automatically mean ACI or AKS.",
   "Exam questions use clue words. 'Run a single container quickly with no orchestration' is Azure Container Instances. 'Orchestrate many containers', 'Kubernetes' or 'full control over the cluster' is AKS. 'Serverless containers' or 'microservices without managing Kubernetes' is Azure Container Apps. 'Run code when an event occurs, billed per execution' is Azure Functions. 'Host a web app or API without managing servers' or 'deployment slots' is App Service. 'Lightweight, fast to start, shares the host kernel' describes containers compared with VMs."
  ],
  "analogy": "Think of feeding people. ACI is ordering one takeaway meal: quick, no kitchen to run. Container Apps is hiring a catering company that brings more staff as guests arrive and leaves when the party ends, while you never see the kitchen. AKS is running your own restaurant kitchen with a manager provided: you control the menu and the cooks, but you also handle their schedules. Functions is a vending machine that only does work when someone presses a button. The analogy is loose on cost: on the exam, remember Functions on consumption bills per execution, while ACI bills while the container runs.",
  "terms": [
   [
    "Container",
    "A lightweight package of an application and its dependencies that shares the host OS kernel."
   ],
   [
    "Azure Container Instances (ACI)",
    "The simplest way to run a single container in Azure, with no VMs or orchestrator to manage."
   ],
   [
    "Azure Container Apps",
    "A serverless platform for containerized apps and microservices that hides Kubernetes and can scale to zero."
   ],
   [
    "Azure Kubernetes Service (AKS)",
    "A managed Kubernetes service where Azure runs the control plane and you manage nodes and workloads."
   ],
   [
    "Orchestration",
    "Automated deployment, scaling, networking and healing of many containers across a cluster."
   ],
   [
    "Azure Functions",
    "Event-driven serverless compute that runs code on triggers and bills per execution on consumption plans."
   ],
   [
    "Azure App Service",
    "A PaaS offering for hosting web apps, REST APIs and mobile back ends without managing servers."
   ],
   [
    "Deployment slot",
    "A separate staging instance of an App Service app that can be swapped into production."
   ]
  ],
  "example": "A logistics company packages its route optimizer as a container. The data team runs one-off experiments in Azure Container Instances; the production system, made of a dozen microservices managed by an experienced platform team, runs on AKS. The customer tracking website runs on App Service with a staging slot, and an Azure Function triggered by queue messages sends delivery notifications, costing almost nothing when no parcels move.",
  "mistakes": [
   [
    "Containers are just small VMs, each with its own operating system.",
    "Containers share the host OS kernel and package only the app and its dependencies, which is why they are smaller and start faster."
   ],
   [
    "With AKS, Microsoft manages the whole cluster.",
    "Azure manages the control plane; you still manage worker nodes, their upgrades and your workloads."
   ],
   [
    "Any scenario mentioning containers needs ACI or AKS.",
    "App Service and Container Apps run containers too. Match the clue: single simple container is ACI, microservices without Kubernetes is Container Apps, full Kubernetes control is AKS."
   ],
   [
    "Azure Functions is a good home for an always-on website.",
    "Functions is for short, event-driven code. Long-running web apps belong on App Service."
   ]
  ],
  "tryit": [
   [
    "Kestrel Health's small developer team has built six containerized microservices for a patient reminder system. Traffic is busy during the day and near zero overnight, and nobody on the team knows Kubernetes. They want automatic scaling, including down to zero. Which service fits best?",
    "Azure Container Apps. It runs containerized microservices on a serverless platform, scales on traffic or events including to zero, and hides Kubernetes so the team does not have to operate a cluster. AKS would give more control but requires Kubernetes skills; ACI lacks orchestration features."
   ],
   [
    "A school's IT team wants a thumbnail generated automatically every time a teacher uploads a photo to a storage account. Uploads happen in bursts a few times a week, and the budget is tiny. What would you suggest?",
    "Azure Functions with a blob trigger on a consumption-based plan. The function runs only when a blob is uploaded, scales for bursts and bills per execution, so idle time costs almost nothing."
   ]
  ],
  "tip": "Single container, simplest: ACI. Microservices without managing Kubernetes: Container Apps. Orchestrating many containers with full control: AKS. Code on events billed per execution: Functions. Web app hosting without managing servers: App Service.",
  "check": [
   [
    "Why do containers start faster than VMs?",
    "They share the host OS kernel instead of booting a full operating system, so they are smaller and lighter."
   ],
   [
    "Which service should you use to run a single container quickly without managing servers or an orchestrator?",
    "Azure Container Instances, the simplest container option in Azure."
   ],
   [
    "In AKS, what does Azure manage and what do you manage?",
    "Azure manages the Kubernetes control plane; you manage the worker nodes and your workloads."
   ],
   [
    "A function should run each time a file is uploaded to storage. Which service fits?",
    "Azure Functions with a blob trigger, which runs the code on each upload and bills per execution on a consumption plan."
   ],
   [
    "Which App Service feature lets you test a release before it goes live and then swap it in?",
    "Deployment slots."
   ]
  ]
 },
 {
  "t": "Virtual networks, subnets, peering, Azure DNS, and public vs private endpoints",
  "hook": "The audit report lands on Sam's desk at Brightwater Pediatrics with one finding circled in red: the storage account holding scanned patient forms is reachable from the internet. Nobody has broken in, but the auditor wants it fixed within thirty days. At the same time, the analytics team's virtual network needs to reach the main application network, and a new appointment website needs its name to point at Azure. Sam knows the application VMs already sit in a private network. What Sam does not yet know is how to pull a platform service like storage into that private space, and what can go wrong along the way.",
  "simple": "A virtual network is your own private network inside Azure, like a fenced yard where your machines can talk to each other. You split it into smaller sections called subnets, like rooms in a house, and add rules that say who may come in. Peering is a private hallway between two yards so they can talk without going out to the street. Azure DNS is the address book that turns a website name into a number computers use. A private endpoint brings an Azure service, such as storage, into your yard with a private address, so you can lock the front gate to the internet entirely. Think of having groceries delivered to your locked back door instead of picking them up at a busy public market.",
  "body": [
   "An Azure virtual network (VNet) is your own private network in Azure. It lets Azure resources such as virtual machines (VMs) communicate with each other, with the internet, and with your on-premises networks. When you create a VNet you give it an address space in private IP ranges, such as 10.1.0.0/16, written in Classless Inter-Domain Routing (CIDR) notation, and it lives in one region and one subscription. VNets provide isolation: resources in one VNet cannot reach resources in another until you connect them. That default isolation is a security feature, because a mistake in one team's network does not automatically expose another team's servers.",
   "Inside a VNet you divide the address space into subnets, smaller address ranges such as 10.1.1.0/24, to organize and secure resources. For example, you might put web servers in one subnet and database servers in another. Resources in different subnets of the same VNet can talk to each other by default. You filter traffic with network security groups (NSGs), which contain prioritized allow and deny rules based on source, destination, port and protocol, and can be attached to a subnet or a network interface. A typical NSG rule reads like a sentence: allow traffic from the web subnet to the database subnet on port 1433, priority 100, and deny everything else with a lower-priority rule. The commands below build a VNet with two subnets and then peer it with another VNet:",
   "```bash\naz network vnet create --resource-group rg-net --name vnet-hub --address-prefixes 10.1.0.0/16 --subnet-name web --subnet-prefixes 10.1.1.0/24\naz network vnet subnet create --resource-group rg-net --vnet-name vnet-hub --name db --address-prefixes 10.1.2.0/24\naz network vnet peering create --resource-group rg-net --name hub-to-spoke --vnet-name vnet-hub --remote-vnet vnet-spoke --allow-vnet-access\n```",
   "When two VNets need to talk, you use peering. Virtual network peering links two VNets so resources in each can communicate using private IP addresses, as if on one network. Peering can connect VNets in the same region or in different regions, which is called global peering, and traffic between peered VNets travels over Microsoft's backbone network, not the public internet. Address spaces of peered VNets must not overlap, because a router could not tell which network an address such as 10.1.1.5 belongs to. Peering must also be set up in both directions for traffic to flow both ways. Peering is not transitive by default: if A peers with B and B peers with C, A cannot reach C without its own link or a routing device in the middle.",
   "Names matter as much as addresses. Azure DNS hosts Domain Name System (DNS) zones on Microsoft's global network. DNS translates names such as www.example.com into IP addresses. With Azure DNS you manage your records with the same credentials, role-based access control (RBAC) permissions, tools and billing as your other Azure resources, for example with `az network dns record-set a add-record`. Azure DNS hosts your records, but you still buy the domain name itself from a registrar and point it at Azure's name servers, a step called delegation. Private DNS zones provide name resolution inside your VNets, so VMs can find each other by name without exposing those names publicly.",
   "Finally, consider how resources are reached. A public endpoint is an address reachable from the internet, such as a public IP address on a VM or the default public address of a storage account. A private endpoint is a network interface with a private IP address from your VNet that connects privately to an Azure platform as a service (PaaS) offering, such as a storage account or SQL database, using Azure Private Link. Traffic to a private endpoint stays on the Microsoft network. Creating the private endpoint is only half the job: you can then turn off public network access to the service entirely, and only then is its internet exposure removed. Private DNS is usually updated so the service's normal name resolves to the new private IP, which lets applications keep using the same name.",
   "Consider a worked example. A company runs a web tier and a database tier in one VNet, `10.1.0.0/16`, with separate subnets and an NSG that allows only the web subnet to reach port 1433 on the database subnet. A second team's VNet, `10.2.0.0/16`, hosts shared tools, so the two VNets are peered; this works because their address spaces do not overlap. The public website's name is hosted in Azure DNS. Its storage account holds customer documents, so the team creates a private endpoint in the database subnet and disables public access. The web servers reach the storage account by a private IP, and requests from the internet are refused.",
   "Common mistakes include peering VNets with overlapping address spaces, assuming peering is transitive, believing Azure DNS sells domain names, and thinking a private endpoint encrypts data, when its purpose is private network access. Another trap is leaving a service's public endpoint open after adding a private endpoint; the exposure is only removed when public network access is disabled.",
   "Exam questions use recognizable clues. 'Connect two VNets so they communicate privately' is peering, and 'in different regions' is global peering. 'Filter traffic by port and IP' is a network security group. 'Host DNS records with Azure credentials and billing' is Azure DNS. 'Access a PaaS service over a private IP from your VNet' or 'remove public internet exposure' is a private endpoint. 'Segment resources within a VNet' is subnets."
  ],
  "analogy": "A VNet is an office building with a private internal phone system. Subnets are floors, and NSGs are the security desks that decide who may go between floors. Peering is a private tunnel to the building next door; it does not let you walk through that building into a third one. A private endpoint is like giving an outside supplier a desk and an internal extension inside your building, so you can stop taking their calls on the public line. The analogy stops at encryption: a private endpoint changes the path, not whether data is encrypted.",
  "terms": [
   [
    "Virtual network (VNet)",
    "An isolated private network in Azure, in one region and subscription, with its own address space."
   ],
   [
    "Subnet",
    "A range of addresses within a VNet used to group and secure resources."
   ],
   [
    "Network security group (NSG)",
    "A set of prioritized allow and deny rules that filters traffic to subnets or network interfaces."
   ],
   [
    "VNet peering",
    "A private connection between two VNets over Microsoft's backbone; global peering links VNets in different regions."
   ],
   [
    "Azure DNS",
    "A service that hosts DNS zones and records on Azure infrastructure; it does not register domain names."
   ],
   [
    "Private endpoint",
    "A network interface with a private IP in your VNet that connects privately to an Azure PaaS service through Private Link."
   ],
   [
    "Public endpoint",
    "An address reachable from the internet, such as a public IP or a service's default public URL."
   ]
  ],
  "example": "A healthcare startup stores patient files in Azure Storage. An audit flags that the storage account is reachable from the internet. The team creates a private endpoint in its application VNet, updates private DNS so the storage name resolves to the private IP, and disables public network access. The application keeps working over the private address, while connection attempts from the internet now fail.",
  "mistakes": [
   [
    "Two VNets can be peered even if both use 10.0.0.0/16.",
    "Peered VNets must have non-overlapping address spaces, so one would need to be readdressed first."
   ],
   [
    "If A is peered with B and B with C, then A can reach C.",
    "Peering is not transitive by default. A needs its own peering with C or a routing device in the hub."
   ],
   [
    "You can buy your company's domain name in Azure DNS.",
    "Azure DNS hosts zones and records. The domain is bought from a registrar and delegated to Azure's name servers."
   ],
   [
    "Adding a private endpoint automatically removes internet exposure.",
    "The public endpoint stays open until you disable public network access on the service."
   ]
  ],
  "tryit": [
   [
    "Copperfield Bank has a hub VNet peered with two spoke VNets, Spoke A and Spoke B. Developers in Spoke A report they cannot reach a test server in Spoke B, even though both spokes can reach the hub. Nothing is misconfigured on the servers. What explains this, and what are two ways to fix it?",
    "Peering is not transitive, so traffic cannot pass from Spoke A through the hub to Spoke B by default. Fix it by peering Spoke A directly with Spoke B, or by routing spoke traffic through a routing device such as a firewall in the hub."
   ],
   [
    "A developer is told to make an Azure SQL database reachable only from the company's VNet. She creates a private endpoint, tests the app, and closes the ticket. A week later a scan still shows the database's public address responding. What step was missed?",
    "Public network access was never disabled on the database. A private endpoint adds a private path, but the public endpoint remains until it is turned off."
   ]
  ],
  "tip": "Peering connects VNets and requires non-overlapping address spaces; it is not transitive. A private endpoint gives a PaaS service a private IP in your VNet. Azure DNS hosts records but does not sell domain names.",
  "check": [
   [
    "What requirement must two VNets meet before they can be peered?",
    "Their address spaces must not overlap."
   ],
   [
    "Does traffic between peered VNets cross the public internet?",
    "No, it travels privately over Microsoft's backbone network."
   ],
   [
    "Can you buy a domain name through Azure DNS?",
    "No, Azure DNS hosts the zone and records; the domain is bought from a registrar and delegated to Azure's name servers."
   ],
   [
    "What is the security benefit of a private endpoint for a storage account?",
    "The service is reached through a private IP in your VNet, so you can disable public access and remove internet exposure."
   ],
   [
    "Which Azure feature filters traffic by source, destination, port and protocol at a subnet?",
    "A network security group (NSG)."
   ]
  ]
 },
 {
  "t": "Hybrid connectivity: VPN Gateway (site-to-site, point-to-site) vs ExpressRoute",
  "hook": "At Granite Valley Manufacturing, the ERP system just moved to Azure, and the phone at the help desk will not stop ringing. Twenty engineers at head office need to reach it all day, three field engineers need it from hotel rooms, and the design team wants to push large CAD files to Azure every night. The CFO asks Jordan, the network lead, a pointed question: 'Our traffic will cross the public internet? Is that safe, and will it be fast enough when the design team is uploading?' Jordan has two Azure options on the whiteboard and needs to explain the difference clearly before lunch.",
  "simple": "Companies often need their office network and their Azure network to act like one network. There are two main ways. A VPN is like a locked, armored van driving on public roads: everything inside is protected, but the van shares the road with everyone else, so traffic jams can slow it down. One kind of VPN connects a whole office; another connects just one laptop. ExpressRoute is like having your own private road built from your office to Microsoft, rented from a phone or network company. It does not use the public internet, so speed is steadier and more reliable, but it costs more and takes longer to set up. Private road does not automatically mean the van is locked, though.",
  "body": [
   "Many organizations need their on-premises networks and Azure virtual networks (VNets) to work as one, for example so office users can reach an application running on Azure virtual machines (VMs), or so Azure servers can query a database still in the datacenter. Azure offers two main hybrid connectivity options, VPN Gateway and ExpressRoute, and the Microsoft Azure Fundamentals exam (AZ-900) expects you to know when to choose each. The decision usually comes down to three questions: does the traffic need to avoid the public internet, how much bandwidth and consistency do you need, and how much time and money can you spend?",
   "A virtual private network (VPN) creates an encrypted tunnel between two networks over an untrusted network, usually the public internet. Azure VPN Gateway is a type of virtual network gateway deployed into a dedicated subnet of your VNet, which must be named `GatewaySubnet`. It uses Internet Protocol Security (IPsec) and Internet Key Exchange (IKE) to encrypt traffic between the VNet and other locations over the internet. Gateways can be policy-based, using static rules, or route-based, using routing tables; route-based is the more flexible and common choice. Building one takes two steps, creating the special subnet and then the gateway:",
   "```bash\naz network vnet subnet create --resource-group rg-net --vnet-name vnet-hub --name GatewaySubnet --address-prefixes 10.1.255.0/27\naz network vnet-gateway create --resource-group rg-net --name vpngw --vnet vnet-hub --gateway-type Vpn --vpn-type RouteBased --sku VpnGw1 --public-ip-addresses vpngw-pip\n```",
   "VPN Gateway supports several connection types, and the exam focuses on two. Site-to-site (S2S) connects an entire on-premises network to Azure through a VPN device at the office, such as a firewall or router, so every machine in the office can reach the VNet without installing anything. Point-to-site (P2S) connects an individual computer, such as a remote worker's laptop, to the VNet using VPN client software, with no office VPN device needed. A third type, VNet-to-VNet, connects two Azure VNets through gateways. For higher availability you can run gateways in active-standby mode, the default, where a standby instance takes over if the active one fails, or in active-active mode, where both instances carry tunnels. Some organizations also use ExpressRoute with a site-to-site VPN as a failover path.",
   "Azure ExpressRoute takes a different approach. It extends your on-premises network into the Microsoft cloud over a private connection provided by a connectivity partner, such as a telecommunications provider. The traffic does not travel over the public internet. This gives more reliability, higher speeds, consistent latency and stronger isolation than internet-based connections, which suits large data transfers, critical workloads and organizations with strict compliance needs. Connections can be made at a co-location facility, through a point-to-point Ethernet link, through an any-to-any network from a provider, or with ExpressRoute Direct straight into Microsoft's network. ExpressRoute can reach Azure services and other Microsoft cloud services such as Microsoft 365, and ExpressRoute Global Reach can link on-premises sites to each other through Microsoft's backbone.",
   "One detail trips up many learners: private does not automatically mean encrypted. ExpressRoute keeps traffic off the internet, but it does not encrypt it by default. Organizations with encryption requirements can add encryption over ExpressRoute, for example with MACsec, which encrypts at the link layer, or an IPsec tunnel running across the circuit. VPN traffic, by contrast, is always encrypted, but it crosses the internet, so its speed and latency depend on internet conditions you do not control.",
   "The trade-off is cost and setup. VPN Gateway is quicker to set up and cheaper, because it uses the internet connection you already have. ExpressRoute requires working with a provider, may take weeks to provision, and costs more, but offers predictable performance. For a single remote user, point-to-site is the right choice; for connecting a whole office cheaply, site-to-site; for a large, critical, high-bandwidth connection that must avoid the internet, ExpressRoute.",
   "Consider a worked example. A bank runs trading systems in its own datacenter and moves analytics to Azure. Nightly it copies several terabytes of market data to Azure, and regulators require that this traffic not traverse the public internet. It orders an ExpressRoute circuit through a connectivity partner and adds a site-to-site VPN as a backup path. Its fifty branch offices are small and connect to Azure with site-to-site VPNs, and its IT administrators who work from home use point-to-site VPN from their laptops.",
   "Watch for these common mistakes. People think VPN traffic is unencrypted, when it is encrypted but crosses the internet. They think ExpressRoute traffic is encrypted by default, when it is private but not automatically encrypted. They choose site-to-site for one remote user. Other traps are forgetting that the gateway needs its own subnet named `GatewaySubnet`, and assuming ExpressRoute is only for Azure, when it can also reach other Microsoft cloud services. Remember too that a VPN gateway takes time to deploy and is billed while it exists, so in labs you should delete it when you finish.",
   "Exam questions use clear clue words. 'Must not traverse the public internet', 'dedicated private connection', 'predictable latency' or 'connectivity provider' is ExpressRoute. 'Encrypted tunnel over the internet' is VPN Gateway. 'One laptop' or 'individual remote worker' is point-to-site. 'Connect the whole office' or 'on-premises VPN device' is site-to-site. 'Connect two Azure VNets through gateways' is VNet-to-VNet, though peering is usually the simpler choice for that."
  ],
  "analogy": "A site-to-site VPN is an armored bus service that carries everyone from your office to Azure on public highways; point-to-site is an armored taxi for one person. Both are locked, but both sit in public traffic. ExpressRoute is a private rail line leased from a rail company: no public traffic and a steady schedule, but costly and slow to build. Where the analogy matters for the exam: the private rail cars are not locked by default, so add encryption if you need it.",
  "terms": [
   [
    "Virtual private network (VPN)",
    "An encrypted tunnel that connects networks or devices across an untrusted network such as the internet."
   ],
   [
    "Azure VPN Gateway",
    "A virtual network gateway that sends encrypted traffic between a VNet and other locations over the internet."
   ],
   [
    "Site-to-site (S2S) VPN",
    "A VPN connecting an entire on-premises network to Azure through a VPN device."
   ],
   [
    "Point-to-site (P2S) VPN",
    "A VPN connecting an individual computer to an Azure VNet using client software."
   ],
   [
    "Azure ExpressRoute",
    "A private connection from on-premises to Microsoft's cloud through a connectivity partner that does not use the public internet."
   ],
   [
    "GatewaySubnet",
    "The dedicated subnet, with that exact name, where a VNet's gateway is deployed."
   ],
   [
    "ExpressRoute Global Reach",
    "A feature that links on-premises sites to each other through their ExpressRoute circuits."
   ]
  ],
  "example": "A manufacturer with one head office and a handful of remote engineers needs access to an ERP system on Azure VMs. It creates a VPN gateway, connects the head office's firewall with a site-to-site VPN, and gives the engineers point-to-site VPN profiles on their laptops. Two years later, when it moves large design files to Azure every day and needs steady latency, it adds an ExpressRoute circuit and keeps the site-to-site VPN as a failover path.",
  "mistakes": [
   [
    "VPN Gateway traffic is unencrypted because it uses the internet.",
    "VPN Gateway encrypts traffic with IPsec and IKE. The limitation is that it crosses the internet, so performance varies."
   ],
   [
    "ExpressRoute traffic is encrypted by default.",
    "ExpressRoute is private, not automatically encrypted. Add MACsec or an IPsec tunnel if encryption is required."
   ],
   [
    "A single remote worker should use a site-to-site VPN.",
    "Site-to-site connects a whole network through a VPN device. One computer uses point-to-site with client software."
   ],
   [
    "ExpressRoute can reach only Azure.",
    "ExpressRoute can also reach other Microsoft cloud services such as Microsoft 365."
   ]
  ],
  "tryit": [
   [
    "Silverline Pharmacy has 12 small stores, each with a basic firewall that supports IPsec, and a modest budget. The stores need to reach an inventory app on Azure VMs. There is no rule against using the internet. Which connectivity option should they choose?",
    "Site-to-site VPNs through Azure VPN Gateway. Each store's firewall acts as the on-premises VPN device, traffic is encrypted, and it is cheaper and faster to set up than ExpressRoute. Nothing in the scenario requires avoiding the internet or guaranteed latency."
   ],
   [
    "A hospital's compliance officer states that patient imaging transfers to Azure must not cross the public internet and must also be encrypted in transit. The network team proposes ExpressRoute alone. Is that sufficient?",
    "Not by itself. ExpressRoute meets the 'not over the internet' requirement, but it is not encrypted by default. The team should add encryption, for example MACsec on the link or an IPsec tunnel over the circuit."
   ]
  ],
  "tip": "If traffic must not cross the public internet, the answer is ExpressRoute. VPN Gateway traffic is encrypted but travels over the internet. One laptop means point-to-site; a whole office means site-to-site.",
  "check": [
   [
    "A company requires that its hybrid traffic never cross the public internet. Which option fits?",
    "ExpressRoute, which uses a private connection through a connectivity partner."
   ],
   [
    "A single employee needs to reach an Azure VNet from home. Which VPN connection type fits?",
    "Point-to-site, which connects one computer using VPN client software."
   ],
   [
    "Is ExpressRoute traffic encrypted by default?",
    "No, it is private but not automatically encrypted; you can add encryption such as MACsec or IPsec if required."
   ],
   [
    "Give one advantage of VPN Gateway over ExpressRoute.",
    "It is quicker to set up and cheaper, because it uses the existing internet connection instead of a provider circuit."
   ],
   [
    "What must the subnet that holds a VPN gateway be named?",
    "GatewaySubnet."
   ]
  ]
 },
 {
  "t": "Azure Storage services (Blob, Files, Queue, Table, Disks), storage account types and access tiers (Hot, Cool, Cold, Archive)",
  "hook": "The storage bill at Northgate Veterinary Group has tripled in a year, and Elena from finance wants answers. You open the storage account and find seven years of X-ray images, all sitting in the Hot tier, though vets rarely open anything older than a month. Then a vet emails: she needs a 2019 X-ray for a follow-up appointment in twenty minutes. You realize two things at once. Moving old images to the cheapest tier would cut the bill dramatically, but if you had already done that, the vet would be waiting hours, not minutes. How do you choose the right place for each kind of data?",
  "simple": "Azure Storage is a giant online locker for data. Inside one storage account you can keep different kinds of things: big files like photos and videos (Blob), shared folders many computers can open (Files), small notes passed between parts of an app (Queue), simple lists of facts (Table), and hard drives for virtual computers (Disks). Photos and similar files can be placed on shelves with different prices. The Hot shelf costs the most to keep things on but is cheapest to grab from. Cooler shelves cost less to keep but more to grab from. The Archive shelf is like a warehouse across town: very cheap, but you must request your box and wait hours for it to come back.",
  "body": [
   "Azure Storage is Microsoft's cloud storage platform for almost every kind of data an application produces: documents, images, backups, messages, structured records and the virtual hard disks behind virtual machines (VMs). It is durable (several copies are always kept), highly available, secure by default (data is encrypted at rest automatically) and massively scalable, and you pay only for the capacity and operations you use. Most storage services live inside a storage account, which gives your data a unique namespace reachable over HTTP or HTTPS. Because the account name forms part of public endpoint addresses such as `mystorage.blob.core.windows.net`, it must be unique across all of Azure, between 3 and 24 characters long, and use only lowercase letters and numbers. If the portal rejects a name, that global uniqueness rule is usually the reason.",
   "Azure Storage offers several data services, and the Microsoft Azure Fundamentals exam (AZ-900) expects you to match each one to a need. Blob storage holds unstructured data such as images, video, backups and log files, organized into containers; it is object storage optimized for very large amounts of data, and each blob has its own URL. Azure Files provides fully managed file shares that you mount using the Server Message Block (SMB) protocol, and on premium shares Network File System (NFS), just like a mapped network drive, which suits lift-and-shift of applications that already use file shares. Queue storage holds large numbers of small messages so that parts of an application can communicate asynchronously: a web front end drops an order message on a queue and a background worker processes it later, so a slow worker never makes the website slow. Table storage stores structured, non-relational (NoSQL) key-value data with a flexible schema. Azure Disks are block-level volumes attached to Azure VMs, offered as managed disks so Azure handles the underlying storage for you.",
   "The storage account type decides which services, performance levels and redundancy options you can use. Standard general-purpose v2 is the recommended type for most scenarios; it supports blobs (including Azure Data Lake Storage), files, queues and tables and runs on standard hard-disk-based hardware. Premium account types use solid-state drives (SSDs) for consistently low latency and are specialized: premium block blobs for high transaction rates or small objects, premium file shares for enterprise file workloads, and premium page blobs for page-blob scenarios. You can create an account in the portal under Storage accounts, then Create, or with a command such as `az storage account create --name stdemo01 --resource-group rg-demo --sku Standard_LRS --kind StorageV2`.",
   "Blob data can be stored in access tiers that trade storage cost against access cost. The idea is that you should pay less to store data you rarely touch, in exchange for paying more when you do touch it. The Hot tier is for data accessed frequently; it has the highest storage cost and the lowest access cost. The Cool tier is for data accessed infrequently and kept for at least 30 days. The Cold tier is for data accessed rarely and kept for at least 90 days. The Archive tier is for data almost never accessed and kept for at least 180 days, with the lowest storage cost and the highest retrieval cost. Moving or deleting data from a cooler tier before its minimum period incurs an early-deletion charge, so tiers only save money if the data really stays put.",
   "Archive is different in one important way: it is offline. You cannot read an archived blob directly; first you must rehydrate it by changing its tier to an online tier (Hot, Cool or Cold) or copying it to one, and that can take hours. Hot, Cool and Cold are all online, so data in any of them can be read immediately; they differ in price, not in speed of first access. The storage account has a default access tier that new blobs inherit, while Archive can be set only on individual blobs. Lifecycle management rules can move blobs between tiers automatically as they age, for example moving log files to Cool after 30 days, to Archive after 180 days, and deleting them after several years. In the portal these rules appear under Lifecycle management as simple if-then statements based on days since creation or last modification.",
   "Consider a worked example. A clinic stores patient-uploaded photos that doctors view often in the first month, then rarely. Seven years of retention is required by regulation. You put the photos in Blob storage in a general-purpose v2 account with the Hot default tier and add a lifecycle rule: move blobs to Cool after 30 days without access and to Archive after a year. The scheduling app uses Queue storage to hand appointment reminders to a background process, and a legacy reporting tool that expects a mapped drive reads from an Azure Files share. Each need maps to a different service in the same account.",
   "Several mistakes are common. Learners choose Archive for data they might need in minutes, forgetting it needs rehydration first. They think the account can default to Archive, which it cannot. They confuse Table storage with a relational database, but Table storage has no joins or fixed schema. They mix up Azure Files, which is a share many machines can mount, with Azure Disks, which is a volume attached to a VM. And they assume Premium accounts support every service and redundancy option, when Premium accounts are specialized.",
   "Exam questions are usually scenario based. 'Unstructured data such as images or video' points to Blob storage. 'Replace an on-premises file server share' or 'mount via SMB' points to Azure Files. 'Decouple application components with messages' points to Queue storage. 'NoSQL key-value data' points to Table storage. 'Rarely accessed, can wait hours, cheapest storage' points to Archive, while 'accessed infrequently but must be available immediately' points to Cool or Cold. 'Recommended account type for most scenarios' is Standard general-purpose v2."
  ],
  "analogy": "Access tiers work like where you keep your clothes. Hot is the chair by your bed: costly in space, but you grab things instantly. Cool and Cold are the closet and the attic: cheaper space, a little more effort each time, and you are expected to leave things there a while. Archive is a paid storage unit across town: very cheap per month, but you must book a trip and wait hours. Where it differs: in Azure, moving things out of a cooler tier too soon also costs an early-deletion fee.",
  "mnemonic": "Colder means longer commitments: Hot has no minimum, then Cool 30, Cold 90, Archive 180 days. Each step down costs less to store, more to read, and only Archive goes offline.",
  "terms": [
   [
    "Storage account",
    "A container for Azure Storage data services that provides a globally unique namespace and endpoints."
   ],
   [
    "Blob storage",
    "Object storage for large amounts of unstructured data, organized into containers."
   ],
   [
    "Azure Files",
    "Fully managed cloud file shares that can be mounted over SMB or NFS."
   ],
   [
    "Queue storage",
    "A service for storing messages so application components can communicate asynchronously."
   ],
   [
    "Table storage",
    "A NoSQL store for structured, schema-less key-value data."
   ],
   [
    "Azure Disks",
    "Managed block-level volumes attached to Azure virtual machines."
   ],
   [
    "Access tier",
    "A Hot, Cool, Cold or Archive setting on blob data that trades storage cost against access cost."
   ],
   [
    "Rehydration",
    "Changing an archived blob to an online tier so it can be read, which can take hours."
   ],
   [
    "Lifecycle management",
    "Rules that move blobs between tiers or delete them automatically based on age or access."
   ]
  ],
  "example": "A media company keeps finished video projects in Blob storage. Active projects stay in the Hot tier for fast editing. A lifecycle management rule moves projects untouched for 90 days to Cold, and after a year to Archive, cutting storage cost sharply. When a client asks for an old project, an engineer rehydrates it to Hot and plans for it to be available later that day rather than immediately.",
  "mistakes": [
   [
    "Archive is just a cheaper tier you can read from like any other.",
    "Archive is offline. A blob must be rehydrated to Hot, Cool or Cold before it can be read, which can take hours."
   ],
   [
    "You can set Archive as the storage account's default tier.",
    "The account default can be Hot or Cool (or Cold); Archive can be set only on individual blobs."
   ],
   [
    "Table storage is a relational database for structured data.",
    "Table storage is NoSQL key-value storage with no joins or fixed schema. Relational needs point to a database service such as Azure SQL Database."
   ],
   [
    "Azure Files and Azure Disks are interchangeable.",
    "Azure Files is a share many machines mount over SMB or NFS; a disk is a block volume attached to a VM."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Law Firm must keep closed case files for ten years. They are almost never opened, but if a court requests one, the firm has two business days to produce it. Cost is the main concern. Which tier should hold files older than two years, and how would you move them there automatically?",
    "Archive. The files are rarely read, the firm can tolerate a rehydration delay of hours, and Archive has the lowest storage cost. A lifecycle management rule can move blobs to Archive automatically once they reach the chosen age."
   ],
   [
    "A web app's front end must hand customer orders to a slower billing process without making shoppers wait. The developer is considering Table storage. Is that the best fit?",
    "No. Queue storage is designed for passing messages between components asynchronously, so the front end can drop an order message and return immediately while the billing worker processes messages at its own pace."
   ]
  ],
  "tip": "Archive is offline and needs rehydration that can take hours, and it can be set only per blob. Minimum retention periods are Cool 30 days, Cold 90 days and Archive 180 days. Queue is for messages, Table is NoSQL key-value data, Files is SMB/NFS shares.",
  "check": [
   [
    "An application needs to read a blob within seconds, but it is accessed only a few times a year. Is Archive suitable?",
    "No. Archive is offline and must be rehydrated, which can take hours; Cool or Cold keeps it online at lower cost than Hot."
   ],
   [
    "Which storage service lets many servers mount the same share using SMB?",
    "Azure Files, which provides fully managed file shares mountable like a network drive."
   ],
   [
    "Which storage account type does Microsoft recommend for most scenarios?",
    "Standard general-purpose v2, which supports blobs, files, queues and tables."
   ],
   [
    "What happens if you delete a blob from the Cool tier after ten days?",
    "You pay an early-deletion charge, because Cool has a 30-day minimum retention period."
   ]
  ]
 },
 {
  "t": "Storage redundancy: LRS, ZRS, GRS, GZRS and read-access secondary options",
  "hook": "A storm knocks out power across a whole region, and at Cedar County Records the public lookup portal goes dark. Residents cannot download birth certificates, and the county clerk is fielding angry calls. Yesterday you would have said the data was safe because Azure keeps three copies. Now you check the storage account settings and see the word LRS. All three copies are in one datacenter in the affected region. Your director asks two questions you cannot yet answer with confidence: 'Which setting would have kept the portal readable today, and would we have lost anything?'",
  "simple": "Azure always keeps several copies of your data, but you choose how far apart those copies are. Keeping all copies in one building is cheapest, but one fire could reach them all. Spreading them across three buildings in the same city, called zones, protects you if one building fails. Sending copies to a second city far away protects you even if the whole first city has a disaster. Some options also let you read the far-away copy at any time, not just after switching over. It is like keeping spare house keys: in your desk drawer, with three neighbors on different streets, or also with a relative in another state who will read you the code over the phone whenever you call.",
  "body": [
   "Azure Storage always keeps multiple copies of your data so it survives hardware failures, and you decide how widely those copies are spread. Redundancy is a trade-off between cost and the size of failure your data can survive: a failed disk, a lost datacenter or zone, or an entire region going offline. You set the redundancy option on the storage account when you create it, as part of the SKU, for example `Standard_LRS` or `Standard_GZRS`, and it applies to all the data in that account. In the portal it appears on the Basics tab of the create page as a Redundancy drop-down, and later on the account's Redundancy page.",
   "Redundancy in the primary region comes in two forms. Locally redundant storage (LRS) keeps three copies of your data within a single datacenter in the primary region. It is the lowest-cost option and protects against a failed disk, server or rack, but not against a fire, flood or outage affecting that whole datacenter. Zone-redundant storage (ZRS) writes three copies synchronously across three availability zones in the primary region. Synchronously means a write is confirmed only after all three copies are saved, so no zone falls behind. Each zone is one or more datacenters with independent power, cooling and networking, so data stays available for reads and writes even if one zone becomes unavailable. ZRS needs a region that supports availability zones.",
   "For protection against a whole-region outage, you add a secondary region, which is the primary region's pair, typically hundreds of kilometers away. Geo-redundant storage (GRS) stores data with LRS in the primary region, then replicates it asynchronously to the secondary region, where it is again stored with LRS: six copies in total. Geo-zone-redundant storage (GZRS) uses ZRS in the primary region and LRS in the secondary region, combining protection against a zone failure with protection against a regional disaster. GZRS is the most resilient option and also the most expensive.",
   "An important detail separates the geo options. With GRS and GZRS, the copy in the secondary region is not readable during normal operation; it becomes available only after a failover to the secondary region. If you need to read the secondary copy at any time, for example so an application can keep serving reads while the primary region has problems, choose the read-access versions: read-access geo-redundant storage (RA-GRS) or read-access geo-zone-redundant storage (RA-GZRS). The secondary is reached through a separate endpoint, such as `mystorage-secondary.blob.core.windows.net`, which the application must be written to use.",
   "Because replication to the secondary is asynchronous, the secondary may lag slightly behind the primary, so the most recent writes might not be there yet. The time of the last replicated write is reported as the last sync time. This is why a geo-failover can lose a small amount of recent data: anything written after the last sync time may never have reached the secondary. Applications reading from an RA- secondary should also expect that the data could be slightly out of date.",
   "A simple way to remember the names: L means local (one datacenter), Z means zones (several datacenters in one region), G means geo (a second region), and RA means you can read from that second region without a failover. Not every option is available for every account type or region; for example, Azure managed disks support LRS and ZRS but not geo-redundancy, and premium accounts are limited to the primary-region options. Changing redundancy later is possible for many combinations, sometimes through a conversion and sometimes through a migration.",
   "Consider a worked example. An online retailer stores product images in a storage account in a region with availability zones. The business says the site must survive a zone outage without any action from staff, and product images must still be viewable if the whole region fails, even if new uploads pause. LRS fails the first requirement. ZRS meets the zone requirement but not the region one. GZRS covers both zone and region failure, and because the website must read images from the secondary without waiting for a failover, the correct answer is RA-GZRS.",
   "Several mistakes appear often. Learners believe LRS survives a datacenter outage, but all three copies are in one datacenter. They think GRS lets you read the secondary copy at any time, but only RA-GRS or RA-GZRS do that. They assume geo-replication is synchronous and therefore loses no data, but it is asynchronous, so recent writes can be lost in a disaster. And they confuse redundancy with backup. Redundancy copies every change, including accidental deletions and overwrites, so you still need features such as soft delete, versioning or Azure Backup to recover from mistakes.",
   "Exam questions usually describe the failure to survive or the cost goal. 'Lowest cost' or 'single datacenter' points to LRS. 'Remain available if a datacenter or zone fails' points to ZRS. 'Protect against a regional outage' points to GRS or GZRS, and 'both zone and region protection' points to GZRS. 'Read data from the secondary region at any time' or 'without initiating a failover' points to the RA- versions. If the question counts copies, LRS and ZRS keep three, and the geo options keep six."
  ],
  "analogy": "Imagine important papers. LRS is three photocopies in one filing cabinet: a coffee spill is fine, a building fire is not. ZRS puts one copy in each of three branch offices in the same city. GRS also mails copies to a sister office in another state, but that office keeps them sealed until headquarters is declared lost. RA-GRS lets you phone the sister office and have them read a copy any time. The mail takes a while, which is the asynchronous lag: the newest papers may not have arrived yet.",
  "mnemonic": "Read the letters: L is Local (one datacenter), Z is Zones (one region), G is Geo (adds a second region), GZ is both, and RA means Read-Access, letting you read from the secondary region at any time.",
  "terms": [
   [
    "Locally redundant storage (LRS)",
    "Three copies of data within a single datacenter in the primary region; the lowest-cost option."
   ],
   [
    "Zone-redundant storage (ZRS)",
    "Three copies written synchronously across three availability zones in the primary region."
   ],
   [
    "Geo-redundant storage (GRS)",
    "LRS in the primary region plus asynchronous replication to LRS in the paired secondary region."
   ],
   [
    "Geo-zone-redundant storage (GZRS)",
    "ZRS in the primary region plus asynchronous replication to LRS in the secondary region."
   ],
   [
    "Read-access (RA-GRS, RA-GZRS)",
    "Variants of the geo options that let you read the secondary copy at any time through a secondary endpoint."
   ],
   [
    "Failover",
    "Switching a storage account so the secondary region becomes the primary after a regional outage."
   ],
   [
    "Last sync time",
    "The point up to which data is guaranteed to have been replicated to the secondary region."
   ]
  ],
  "example": "A government agency keeps scanned records in a storage account. An audit finds the account uses LRS, so a datacenter fire could destroy every copy. Because the records must remain readable during a regional outage while the agency decides whether to fail over, the team changes the account to RA-GZRS. They also enable soft delete, since redundancy alone would faithfully replicate an accidental deletion to every copy.",
  "mistakes": [
   [
    "LRS keeps three copies, so it survives a datacenter fire.",
    "All three LRS copies are in one datacenter. Datacenter or zone loss needs ZRS or a geo option."
   ],
   [
    "With GRS you can read the secondary region whenever you like.",
    "Plain GRS and GZRS secondaries are readable only after failover. Read-anytime access needs RA-GRS or RA-GZRS."
   ],
   [
    "Geo-replication is synchronous, so failover never loses data.",
    "Replication to the secondary is asynchronous; writes after the last sync time can be lost."
   ],
   [
    "Redundancy means you do not need backups.",
    "Redundancy copies deletions and corruption too. Use soft delete, versioning or Azure Backup to recover from mistakes."
   ]
  ],
  "tryit": [
   [
    "Harborview Dental stores appointment attachments in a region with availability zones. The owner wants the lowest-cost option that keeps the app working, for both reads and writes, if one datacenter in the region fails. Protection against a whole-region disaster is not required. Which redundancy option should they choose?",
    "ZRS. It keeps three synchronous copies across three zones in the region, so reads and writes continue through a zone failure. LRS would not survive a datacenter loss, and the geo options add cost for regional protection the owner did not ask for."
   ],
   [
    "A news site uses GRS for its article images. During a regional outage, editors are surprised that the site cannot display images from the secondary region while the team is still deciding whether to fail over. What setting would have allowed it?",
    "RA-GRS (or RA-GZRS). The read-access versions expose a secondary endpoint that can be read at any time, without a failover. Plain GRS keeps the secondary unreadable until failover."
   ]
  ],
  "tip": "Match the failure to the option: disk or rack failure, LRS; datacenter or zone failure, ZRS; region failure, GRS or GZRS. Need to read the secondary without a failover? Pick the RA- version. Redundancy is not backup.",
  "check": [
   [
    "How many copies of data does GRS keep, and where?",
    "Six: three with LRS in the primary region and three with LRS in the paired secondary region."
   ],
   [
    "An app must read from the secondary region during a primary outage without waiting for failover. Which options qualify?",
    "RA-GRS or RA-GZRS, because only read-access options expose a readable secondary endpoint."
   ],
   [
    "Why can a geo-failover lose a few recent writes?",
    "Replication to the secondary region is asynchronous, so writes made after the last sync time may not have reached it."
   ],
   [
    "Which option protects against a zone failure but not a regional outage?",
    "ZRS, which spreads copies across availability zones in only the primary region."
   ]
  ]
 },
 {
  "t": "Moving data and migrating: AzCopy, Storage Explorer, Azure File Sync, Azure Migrate and Azure Data Box",
  "hook": "Willowbrook Architects has decided to move to Azure, and the project kickoff is today. Ben, the office manager, lists the pieces: five branch file servers everyone depends on, a 300-terabyte archive of old drawings in the server closet, fifteen on-premises virtual machines and a developer who wants to upload build files every night. The office internet link is ordinary. Someone suggests simply uploading everything over the weekend. You do the math in your head and wince. Different pieces clearly need different tools, but which tool fits which job?",
  "simple": "Moving to Azure is a bit like moving house. You do not move everything the same way. Small boxes you carry yourself, either by typing commands (AzCopy) or by dragging and dropping in a friendly app (Storage Explorer). For shared office folders you want a setup that keeps a copy in the cloud and a copy of the most-used files in the office, always kept in step (Azure File Sync). For whole computers and servers you use a planning service that checks what you have, estimates costs and then moves them (Azure Migrate). And when you have far too much stuff for the road, you rent a moving truck: Microsoft mails you a big secure drive, you fill it and send it back (Azure Data Box).",
  "body": [
   "Getting data and workloads into Azure is often the first real project an organization runs in the cloud. Azure offers different tools depending on how much data there is, how often it moves, whether you want a command line or a graphical tool, and whether you are moving files or whole servers. The Microsoft Azure Fundamentals exam (AZ-900) gives you a short scenario and expects you to pick the tool that fits, so it helps to know the one clue that points to each.",
   "AzCopy is a command-line utility for copying blobs or files to or from a storage account, and between storage accounts. It runs on Windows, macOS and Linux, can be scripted for repeated jobs, and authenticates with Microsoft Entra ID or a shared access signature (SAS), a signed URL that grants limited, time-bound access. `azcopy copy` performs copies, while `azcopy sync` synchronizes in one direction only, making the destination match the source. It does not keep two locations in continuous two-way sync. Because it is a single executable, it is easy to drop into a scheduled task or a build pipeline. For example:",
   "```bash\nazcopy login\nazcopy copy \"./logs\" \"<container URL>/logs\" --recursive\nazcopy sync \"./reports\" \"<container URL>/reports\"\n```",
   "Azure Storage Explorer is a free desktop application for Windows, macOS and Linux with a graphical interface for managing storage accounts. You can browse containers and shares, upload and download files, manage access policies and change properties by clicking rather than typing commands. Behind the scenes it uses AzCopy for transfers, so you get the same speed with a friendlier interface. It suits administrators and developers who move data occasionally or want to inspect what is in an account, such as checking that last night's upload actually arrived.",
   "Azure File Sync solves a different problem: keeping file servers and the cloud in step over time. It centralizes an organization's file shares in Azure Files while keeping the flexibility and performance of an on-premises Windows file server. You install the File Sync agent on a Windows Server, register it with a Storage Sync Service in Azure, and link local folders to an Azure file share. Changes then synchronize continuously and in both directions, and several servers, such as branch offices, can sync with the same share. With cloud tiering, frequently used files stay cached on the local server while rarely used files live only in Azure and are fetched on demand. To users, a tiered file still appears in its folder; it simply downloads when opened.",
   "Azure Migrate is different again: it is a central hub for moving whole workloads rather than just files. It helps you discover and assess on-premises servers, databases, web apps and virtual desktops, reports their readiness and estimated Azure cost, and then migrates them, with integrated Microsoft and partner tools such as the Azure Database Migration Service. The assessment step is valuable on its own, because it tells you which servers will run in Azure as they are, which need changes, and roughly what they will cost before you commit.",
   "Azure Data Box is a physical transfer service for large amounts of data when uploading over the network would take too long, cost too much or is not possible. You order a device in the portal, Microsoft ships you a rugged, encrypted storage appliance, you copy your data onto it locally and ship it back, and Microsoft uploads the data into your storage account. There are several Data Box products for different volumes, from disks to large appliances. Data Box can also export data out of Azure, for example for disaster recovery or to meet a regulation. After the upload the device's disks are securely erased in line with standards for media sanitization. It suits one-time bulk migrations and sites with limited or no connectivity.",
   "Consider a worked example. A law firm has five branch offices, each with its own Windows file server, plus a head-office archive of several hundred terabytes and twenty on-premises VMs. It wants one central copy of the branch shares while keeping fast local access, so it uses Azure File Sync with cloud tiering. The archive would take months to upload over the office internet link, so it orders Azure Data Box. For the VMs it runs Azure Migrate to assess readiness and cost and then migrate them. A developer who needs to upload build artifacts nightly writes an AzCopy script, and the office manager uses Storage Explorer to check what was uploaded.",
   "Common mistakes include choosing AzCopy when the scenario needs ongoing two-way sync with an on-premises server, which is File Sync; thinking Storage Explorer is a separate transfer engine, when it uses AzCopy; picking Azure Migrate for a pure bulk data move with no servers involved; and forgetting Data Box exists when the network is the bottleneck.",
   "Exam wording gives the tool away: 'command line' or 'script' points to AzCopy; 'graphical interface' or 'desktop app' points to Storage Explorer; 'keep a local cache of files on a Windows file server' or 'cloud tiering' points to Azure File Sync; 'discover, assess and migrate servers' points to Azure Migrate; 'terabytes of data with limited bandwidth' or 'offline transfer' points to Azure Data Box."
  ],
  "analogy": "Moving to Azure is like moving house. AzCopy is carrying boxes yourself on a schedule; Storage Explorer is the same carrying with a helpful checklist app. Azure File Sync is keeping a small apartment in the old town stocked with the things you use daily while everything else stays at the new house, with deliveries both ways. Azure Migrate is the moving company's surveyor who inventories your furniture and quotes the move before doing it. Data Box is renting a truck because the load is too big for your car.",
  "terms": [
   [
    "AzCopy",
    "A command-line tool for copying data to, from and between Azure storage accounts, with one-way sync."
   ],
   [
    "Azure Storage Explorer",
    "A free graphical desktop app for managing storage accounts that uses AzCopy for transfers."
   ],
   [
    "Azure File Sync",
    "A service that synchronizes Windows file servers with Azure Files in both directions and can tier cold files to the cloud."
   ],
   [
    "Cloud tiering",
    "A File Sync feature that keeps frequently used files locally and stores rarely used files only in Azure."
   ],
   [
    "Azure Migrate",
    "A hub for discovering, assessing and migrating on-premises servers, databases and apps to Azure."
   ],
   [
    "Azure Data Box",
    "A physical device service for moving large volumes of data into or out of Azure offline."
   ],
   [
    "Shared access signature (SAS)",
    "A signed token appended to a storage URL that grants limited, time-bound access."
   ]
  ],
  "example": "A research lab has several hundred terabytes of genome sequencing data on local arrays and only a modest internet connection. Uploading would take months, so it orders Azure Data Box, copies the data locally, and ships the device back for upload into Blob storage. From then on, new daily results are small, so a scheduled AzCopy job uploads each night's output to the same container.",
  "mistakes": [
   [
    "`azcopy sync` keeps an on-premises folder and Azure in two-way sync.",
    "AzCopy sync is one-way: it makes the destination match the source. Continuous two-way sync with Windows file servers is Azure File Sync."
   ],
   [
    "Storage Explorer is a different, faster transfer engine than AzCopy.",
    "Storage Explorer is a graphical front end that uses AzCopy for its transfers."
   ],
   [
    "Azure Migrate is the tool for any large data move.",
    "Azure Migrate is for discovering, assessing and migrating servers, databases and apps. Bulk data with limited bandwidth points to Data Box."
   ],
   [
    "Huge datasets must always be uploaded over the network.",
    "Azure Data Box ships a physical device so large datasets can be transferred offline."
   ]
  ],
  "tryit": [
   [
    "Maple Grove Schools has a Windows file server in each of eight schools. The district wants one master copy of shared teaching materials in Azure, but teachers complain whenever files open slowly, and local disks are nearly full. Which service fits, and which feature addresses the full disks?",
    "Azure File Sync. It syncs each school's Windows file server with an Azure file share in both directions, and cloud tiering keeps frequently used files local while rarely used files live only in Azure, freeing local disk space."
   ],
   [
    "Before committing to a move, a CIO wants to know which of 40 on-premises servers can run in Azure unchanged and roughly what they would cost each month. Which tool should the team run first?",
    "Azure Migrate. Its discovery and assessment features report readiness and estimated Azure cost for each server before any migration happens."
   ]
  ],
  "tip": "Scriptable command line: AzCopy. Graphical tool: Storage Explorer. Keep on-premises Windows file servers synced with the cloud: Azure File Sync. Assess and migrate servers: Azure Migrate. Too much data for the network: Data Box.",
  "check": [
   [
    "An organization wants branch file servers to keep a local cache while the master copy lives in Azure. Which service fits?",
    "Azure File Sync, which syncs Windows file servers with Azure Files and supports cloud tiering."
   ],
   [
    "Which tool would you choose to assess on-premises VMs for Azure readiness and estimate their cost?",
    "Azure Migrate, the central hub for discovery, assessment and migration."
   ],
   [
    "Does azcopy sync keep two locations synchronized in both directions?",
    "No. It makes the destination match the source in one direction only."
   ],
   [
    "A company must move a very large dataset from a site with poor connectivity. Which service fits?",
    "Azure Data Box, which ships a physical device so data can be transferred offline."
   ],
   [
    "What does Azure Storage Explorer use behind the scenes to transfer data?",
    "AzCopy."
   ]
  ]
 },
 {
  "t": "Microsoft Entra ID and Entra Domain Services; authentication methods: SSO, MFA and passwordless",
  "hook": "It is Monday morning at Cedar Valley Clinics and the help-desk queue already holds forty tickets. Most say the same thing: forgot my password, locked out again. Priya, the only identity administrator, is also staring at a note from the security lead. Over the weekend, someone typed a nurse's real password into a fake sign-in page, then tried to open the scheduling system from another country. On top of that, an old billing application has to move to Azure, and it only understands a protocol from the domain-controller era. Priya needs fewer passwords, stronger sign-ins, and a home for the old app, without hiring more staff. Which Microsoft identity pieces solve which of these problems?",
  "simple": "Before a website or app lets you in, it needs to know who you are. In Azure, the service that keeps the list of people and checks their sign-ins is called Microsoft Entra ID. It is the cloud's front desk. Single sign-on means you show your badge once in the morning and every door you are allowed through opens without asking again. Multifactor authentication means the front desk asks for two different kinds of proof, such as your password plus a tap on your phone, so a stolen password alone is useless. Passwordless means no password at all: you use your phone, a small security key, or your face or fingerprint instead. Entra Domain Services is a separate add-on that speaks the older office-network language some old programs still need, so they can run in Azure.",
  "body": [
   "Microsoft Entra ID is Microsoft's cloud-based identity and access management (IAM) service, and it was formerly called Azure Active Directory (Azure AD). You will still see the old name in older documentation and exam questions, so treat the two names as the same service. Entra ID stores users, groups and applications, and it handles sign-in to Azure, Microsoft 365 and thousands of other software-as-a-service (SaaS) applications. Each organization gets its own Entra tenant, which is a dedicated instance of the directory, and every Azure subscription trusts exactly one tenant for its identities. A subscription can only trust one tenant at a time, while a single tenant can be trusted by many subscriptions.",
   "Entra ID does more than store accounts. It provides authentication, single sign-on, application management, device registration and identity protection features such as detecting risky sign-ins, for example an attempt from an unfamiliar location or a known malicious Internet Protocol (IP) address. Because almost every action in the cloud starts with a sign-in, identity has become the control plane for the cloud, and it is often called the new security perimeter. In the old model, a firewall around the office was the main boundary. In the cloud, the question that matters most is whether the person or app asking for access really is who it claims to be.",
   "Many organizations also run on-premises Active Directory Domain Services (AD DS) on their own domain controllers. Microsoft Entra Connect, or the lighter Microsoft Entra Cloud Sync, synchronizes users and groups from on-premises AD to Entra ID, so people use one identity for both worlds. This is called hybrid identity. It is important to understand that Entra ID is not simply AD DS moved to the cloud. Entra ID uses web-based protocols such as OAuth 2.0, OpenID Connect and Security Assertion Markup Language (SAML). It does not offer Kerberos, NT LAN Manager (NTLM), Lightweight Directory Access Protocol (LDAP), organizational units or Group Policy the way a domain controller does. That difference is a favorite exam distinction.",
   "Microsoft Entra Domain Services fills that gap. It provides a managed domain with domain join, Group Policy, LDAP and Kerberos or NTLM authentication, without you deploying, patching or monitoring domain controllers; Microsoft runs two domain controllers for you. This lets older applications that depend on those protocols move to Azure virtual machines (VMs) unchanged. The managed domain synchronizes one way from Entra ID, so users sign in with the same credentials, but changes made inside the managed domain do not flow back to Entra ID. You create it in the Azure portal by searching for Microsoft Entra Domain Services, choosing a Domain Name System (DNS) domain name and selecting the virtual network where it will live. Keep the two tools straight: Entra Connect synchronizes identities from on-premises into the cloud, while Entra Domain Services provides a managed domain in Azure.",
   "With the directory in place, the next topic is how people prove who they are. Authentication is proving who you are; authorization, covered later with role-based access control, is deciding what you may do. Entra ID offers several ways to make authentication both stronger and simpler. Single sign-on (SSO) lets a user sign in once and then open many applications without signing in again. The benefits are fewer passwords to remember, less password reuse, fewer help-desk resets, and one place to disable access when someone leaves the company. Note what SSO is not: it does not add proof of identity. It is about convenience and central control, so it pairs best with a strong sign-in method.",
   "Multifactor authentication (MFA) is the strong method. It requires two or more different kinds of evidence: something you know (a password or personal identification number, PIN), something you have (a phone or hardware key) and something you are (a fingerprint or face). A stolen password alone is then not enough to sign in. Microsoft Entra multifactor authentication can use a push notification or code in the Microsoft Authenticator app, a hardware token, or a text message or voice call, though the phone-based text and voice options are weaker. The factors must be different kinds; a password plus a security question is still one factor, because both are something you know. Security defaults, available free in every tenant, turn on MFA registration and basic protections with one switch, which makes them a sensible starting point for small organizations.",
   "Passwordless authentication goes a step further and removes the password entirely, combining something you have with something you are or know. Options include Windows Hello for Business, which uses biometrics or a PIN tied to one specific device, passwordless sign-in with the Microsoft Authenticator app, and Fast Identity Online 2 (FIDO2) security keys or passkeys, which use public-key cryptography. Passwordless methods are more convenient for users and resist phishing far better, because there is no password to steal or type into a fake page. A passkey or FIDO2 key is bound to the real website, so a look-alike sign-in page cannot use it.",
   "Consider a worked example that ties the pieces together. A manufacturer syncs its on-premises AD to Entra ID with Entra Connect so staff use one account for Microsoft 365 and on-premises apps. It enables SSO so employees reach the human resources (HR) portal, the expense system and the Azure portal after one sign-in. It requires MFA through the Authenticator app, and gives engineers FIDO2 keys for passwordless sign-in. An old inventory application that needs LDAP and domain join moves to an Azure VM joined to an Entra Domain Services managed domain, so nobody has to maintain domain controllers in Azure.",
   "Exam wording is usually direct, so learn the trigger phrases. A cloud-based identity and access management service is Entra ID. Domain join, LDAP, Kerberos or Group Policy without managing domain controllers is Entra Domain Services. Sign in once to access many applications is SSO. Require a second form of verification is MFA. Eliminate passwords or phishing-resistant points to passwordless methods such as Windows Hello for Business or FIDO2 keys. Synchronize on-premises users to the cloud is Entra Connect."
  ],
  "analogy": "Think of a large office building. Entra ID is the security desk that issues and checks badges. SSO is a badge that opens every door you are allowed through after you check in once. MFA is the guard asking for your badge and also checking your face against the photo. Passwordless is a badge that only works in your hand and cannot be photocopied. Entra Domain Services is an old-style key cabinet the building keeps for a few rooms with old locks. The analogy stops short in one way: in Entra ID, the badge check happens on every app sign-in over the internet, not at one front door.",
  "mnemonic": "Know, Have, Are: the three MFA factor types are something you Know (password or PIN), something you Have (phone or key) and something you Are (fingerprint or face). Two answers from the same group are still one factor.",
  "terms": [
   [
    "Microsoft Entra ID",
    "Microsoft's cloud identity and access management service, formerly Azure Active Directory."
   ],
   [
    "Tenant",
    "A dedicated instance of Entra ID that represents one organization; each subscription trusts exactly one tenant."
   ],
   [
    "Microsoft Entra Domain Services",
    "A managed domain providing domain join, Group Policy, LDAP and Kerberos or NTLM without managing domain controllers."
   ],
   [
    "Microsoft Entra Connect",
    "A tool that synchronizes on-premises Active Directory identities to Entra ID for hybrid identity; Entra Cloud Sync is a lighter alternative."
   ],
   [
    "Hybrid identity",
    "One identity per person that works both on-premises and in the cloud, created by synchronizing AD DS to Entra ID."
   ],
   [
    "Single sign-on (SSO)",
    "Signing in once to access many applications without re-entering credentials."
   ],
   [
    "Multifactor authentication (MFA)",
    "Requiring two or more different kinds of evidence (know, have, are) to sign in."
   ],
   [
    "Passwordless authentication",
    "Signing in without a password, using a device-bound credential plus biometrics or a PIN."
   ],
   [
    "FIDO2 security key",
    "A hardware key or passkey that uses public-key cryptography for phishing-resistant sign-in."
   ],
   [
    "Security defaults",
    "A free, one-switch setting in every tenant that turns on MFA registration and basic identity protections."
   ]
  ],
  "example": "A school district has thousands of students and staff who kept forgetting passwords across a dozen learning apps. It connects those apps to Entra ID for single sign-on, so one sign-in opens everything, and requires MFA with the Authenticator app for staff who can see student records. Help-desk password resets drop sharply, and when a teacher leaves, disabling one Entra account removes access to every connected app at once.",
  "mistakes": [
   [
    "Entra ID supports Kerberos, LDAP and Group Policy, so legacy apps can use it directly.",
    "Entra ID uses web protocols such as OAuth 2.0, OpenID Connect and SAML. Kerberos, LDAP, NTLM, domain join and Group Policy come from AD DS or from the managed domain in Entra Domain Services."
   ],
   [
    "Entra Connect and Entra Domain Services are the same thing.",
    "Entra Connect synchronizes identities from on-premises AD into Entra ID. Entra Domain Services provides a managed domain in Azure. One moves accounts; the other hosts domain features."
   ],
   [
    "SSO is a security factor that makes sign-in stronger.",
    "SSO reduces how many times you sign in and centralizes control. It adds no extra proof, so it should be combined with MFA or passwordless sign-in."
   ],
   [
    "A password plus a security question counts as MFA.",
    "Both are something you know, so it is still a single factor. MFA needs evidence from at least two different categories."
   ]
  ],
  "tryit": [
   [
    "A 60-person accounting firm has no identity specialist and a free Entra tenant. Staff use only passwords, and the owner wants MFA turned on quickly with the least effort and cost. What should the firm do first?",
    "Turn on security defaults. They are free in every tenant and enable MFA registration and basic protections with one switch, which suits a small organization without advanced licensing or staff to build custom policies."
   ],
   [
    "A logistics company must move a 15-year-old warehouse application to Azure. It needs servers joined to a domain and uses LDAP lookups. The IT team is small and does not want to patch domain controllers. What should they choose?",
    "Microsoft Entra Domain Services. It provides a managed domain with domain join, LDAP and Kerberos or NTLM, and Microsoft runs the domain controllers, so the app moves to Azure VMs unchanged."
   ]
  ],
  "tip": "Entra ID is the cloud identity service using modern protocols. Entra Domain Services is for legacy apps needing domain join, LDAP or Kerberos without managing domain controllers. Entra Connect synchronizes on-premises users. MFA adds a factor; passwordless removes the password; SSO reduces the number of sign-ins.",
  "check": [
   [
    "A legacy app needs LDAP and Kerberos in Azure, and the team does not want to manage domain controllers. What should they use?",
    "Microsoft Entra Domain Services, which provides a managed domain with those protocols."
   ],
   [
    "A user signs in with a password and then approves a prompt in the Authenticator app. What is this?",
    "Multifactor authentication: something you know plus something you have."
   ],
   [
    "Why is passwordless authentication more resistant to phishing than a password?",
    "There is no password to steal or type into a fake site; sign-in relies on a device-bound credential plus biometrics or a PIN."
   ],
   [
    "Which tool synchronizes on-premises Active Directory users to Entra ID?",
    "Microsoft Entra Connect (or Entra Cloud Sync), which creates a hybrid identity."
   ],
   [
    "How many Entra tenants can one Azure subscription trust for its identities?",
    "Exactly one, although one tenant can be trusted by many subscriptions."
   ]
  ]
 },
 {
  "t": "External identities (B2B and customer identity) and Conditional Access",
  "hook": "You manage identity for Northwind Bicycles, a fictional manufacturer, and three requests land on your desk in one afternoon. The marketing team wants an outside design agency to edit files in one SharePoint site starting tomorrow. The e-commerce team is launching a store where riders can sign up with an email or a social account. And the security lead, Omar, forwards an alert: a sales manager's account just signed in from a country where Northwind has no staff, using the correct password. Creating employee accounts for agency designers feels wrong, mixing public shoppers into the staff directory feels worse, and the stolen password worries you most. How do you handle all three without building three separate identity systems?",
  "simple": "Not everyone who uses your apps works for you. Some are partners, like a supplier or an agency, and some are customers from the public. Microsoft Entra External ID lets these outsiders sign in with an account they already have, so you do not hand out new passwords. Partners are invited in as guests, a bit like a visitor badge at an office. Customers get their own separate sign-up system, like a store's loyalty program, kept apart from the employee list. Conditional Access is a set of rules that looks at each sign-in and decides: let it through, ask for extra proof, or say no. For example: if someone signs in from home, ask for a phone code; if they sign in from a country where you do no business, block them.",
  "body": [
   "Organizations rarely work alone. Suppliers, contractors, auditors and partners need access to some of your apps and files, and many businesses also run apps used by the public. Creating and managing ordinary employee accounts for all of these people would be insecure and exhausting, because you would be storing extra passwords and remembering to clean them up. Microsoft Entra External ID is the name for the set of capabilities that let people outside your organization use your apps with identities they already have. The two scenarios the AZ-900 exam cares about are collaborating with partners, called business-to-business (B2B), and serving customers.",
   "Business-to-business (B2B) collaboration lets you invite external users, such as a supplier's staff, into your own workforce tenant as guest users. They sign in with credentials they already own, such as their work account in their own Entra organization, a Microsoft account, a social identity, or a one-time passcode sent by email, so you never create or store passwords for them. In the Azure portal you go to Microsoft Entra ID, then Users, then Invite external user, or you can let partners self-register through a sign-up flow. In the user list, a guest shows a user type of Guest rather than Member. Once a guest accepts the invitation, you grant access to specific apps, Teams, SharePoint sites or Azure resources like any other user, and you can run access reviews to remove access that is no longer needed. B2B direct connect is a related option that creates mutual trust between two Entra organizations, used for scenarios such as Teams shared channels, without adding guest objects to your directory.",
   "Customer identity is a different scenario with different needs. The users are members of the public who sign up for your app, such as shoppers on a retail site or patients using a booking app. There may be very large numbers of them, they choose their own sign-in method, and they must be kept completely separate from employees. Microsoft's customer identity offerings are Azure Active Directory B2C, the older service, and Microsoft Entra External ID for customers, its successor, which uses a separate external tenant. Both provide customizable, branded sign-up and sign-in pages, self-service password reset, support for social identity providers such as Google or Facebook, and a separate directory for customer accounts. The key exam distinction is simple: B2B brings known partners into your workforce tenant, while customer identity keeps the public in a directory of its own.",
   "Once you know who is signing in, the next question is under what conditions you should let them in. Conditional Access is a Microsoft Entra ID feature, included with Microsoft Entra ID P1 licenses and above, that decides whether to allow a sign-in, block it or require extra steps, based on signals. Signals include the user and their group membership, the location or Internet Protocol (IP) address, the device and whether it is marked compliant, the application being accessed, and the calculated sign-in or user risk; risk-based conditions need Entra ID P2. Decisions include allowing access, requiring multifactor authentication (MFA), requiring a compliant or hybrid-joined device, requiring a password change, or blocking access entirely.",
   "Conditional Access policies follow an if-then pattern: if these conditions are true, then enforce these controls. For example, if a user in the Finance group signs in from outside the trusted office network to the payroll app, then require MFA. If anyone signs in from a country where the company does not operate, then block. You build these in the portal under Microsoft Entra ID, then Protection, then Conditional Access. A new policy can start in report-only mode, which logs what the policy would have done in the sign-in logs without enforcing it, so you can check that it will not lock out the wrong people before you turn it on.",
   "Why does this matter so much? Conditional Access lets you apply strong controls only when the risk warrants them, keeping everyday sign-ins simple for people at their usual desk on a managed laptop while challenging unusual ones. It is a core tool for Zero Trust, because every access request is evaluated using all available signals rather than trusted because it came from inside a network. Keep two details in mind. Conditional Access does not replace MFA; it decides when to require MFA and other controls. And it runs after the first factor of authentication has been completed, so it is not a firewall in front of the sign-in page.",
   "Consider a worked example. An engineering firm works with an outside design agency. It invites the agency's designers as B2B guests, who sign in with their own agency accounts and get access to one SharePoint site and one Azure storage account. The firm also launches a customer portal where the public can track orders; customers sign up with an email address or a social account through the customer identity service, kept in a separate external tenant. Finally, a Conditional Access policy requires MFA for all guest users and blocks sign-ins to the admin portal from unmanaged devices.",
   "Watch for the common traps. Using B2B for public customers is wrong, because B2B is for known partners you invite into your workforce tenant. Guests do not need new passwords created by you, because they bring their own identity. Conditional Access is not available on the free tier; it needs Entra ID P1 or higher, and the free tier offers security defaults instead.",
   "Exam questions hint through the kind of user. Partner, vendor, supplier or invite a guest points to B2B collaboration. Customers sign up with social accounts, consumer-facing app or branded sign-in pages for the public points to customer identity, meaning Azure AD B2C or External ID for customers. Require MFA only when signing in from outside the office, block access from certain countries, or allow only compliant devices points to Conditional Access. The words signals and if-then policies are also Conditional Access vocabulary."
  ],
  "analogy": "Picture a concert venue. B2B guests are the visiting crew who show their own company ID at the stage door and get a wristband for specific areas. Customers are ticket buyers who register through the box office, kept on a separate list from staff. Conditional Access is the door supervisor who checks each person against rules: a known face at the usual door walks in, someone at the loading dock at 3 a.m. gets questioned, and anyone on the banned list is turned away. Unlike a door supervisor, Conditional Access acts only after the person has presented a first credential.",
  "terms": [
   [
    "Microsoft Entra External ID",
    "The set of capabilities that let external users, partners or customers, access your apps with their own identities."
   ],
   [
    "B2B collaboration",
    "Inviting external partners into your workforce tenant as guest users who sign in with their own credentials."
   ],
   [
    "Guest user",
    "An external identity represented in your directory with user type Guest and granted access to specific resources."
   ],
   [
    "B2B direct connect",
    "A mutual trust between two Entra organizations, used for scenarios such as Teams shared channels, without guest objects."
   ],
   [
    "Customer identity (B2C)",
    "A service for consumer-facing apps providing branded sign-up and sign-in with local or social accounts in a separate directory."
   ],
   [
    "Conditional Access",
    "An Entra ID P1 feature that uses signals in if-then policies to allow, block or require extra controls at sign-in."
   ],
   [
    "Signal",
    "Information such as user, location, device, app or risk that Conditional Access evaluates."
   ],
   [
    "Report-only mode",
    "A Conditional Access setting that logs what a policy would do without enforcing it."
   ]
  ],
  "example": "A hospital lets visiting consultants from partner clinics use its scheduling system. Rather than creating hospital accounts, it invites them as B2B guests who sign in with their clinic accounts. A Conditional Access policy requires MFA and a compliant device for any guest opening the scheduling app, and blocks guests entirely from the patient records system. When a consultant's contract ends, an access review flags the unused guest account for removal.",
  "mistakes": [
   [
    "Use B2B collaboration for a public shopping app.",
    "B2B invites known partners into your workforce tenant as guests. Public sign-up at scale with branded pages and social logins is customer identity: Azure AD B2C or External ID for customers."
   ],
   [
    "You must create a username and password for each guest.",
    "Guests sign in with an identity they already have, such as their own work account, a Microsoft account, a social account or an email one-time passcode. You never store their passwords."
   ],
   [
    "Conditional Access replaces MFA.",
    "Conditional Access is the decision engine. MFA is one of the controls it can require. You use them together."
   ],
   [
    "Conditional Access is included with the free Entra tier.",
    "It requires Entra ID P1 or higher, and risk-based conditions need P2. The free tier offers security defaults instead."
   ]
  ],
  "tryit": [
   [
    "A regional bank wants staff to sign in normally from branch offices but be asked for MFA when working from home. It also wants to make sure a new rule will not lock out tellers before it goes live. What should the bank configure, and how should it roll it out?",
    "A Conditional Access policy with a location condition that treats branch IP ranges as trusted and requires MFA elsewhere. Start it in report-only mode, review the sign-in logs for its effect, then switch it to enforced. This needs Entra ID P1 or higher."
   ],
   [
    "An accounting firm hires an outside audit company for six weeks. Ten auditors need to read files in one SharePoint site and must stop having access when the engagement ends. Should the firm create employee accounts, use B2B collaboration, or use customer identity?",
    "B2B collaboration. Invite the auditors as guests who use their own work accounts, grant access to the one site, and use an access review or an expiring assignment to remove access at the end. Customer identity is for the public, and employee accounts would mean managing extra passwords."
   ]
  ],
  "tip": "Partners and suppliers who need access to your apps: B2B collaboration. Public customers signing up for your app: customer identity (Azure AD B2C or External ID for customers). Require MFA only when signing in from outside the office: Conditional Access, which needs Entra ID P1.",
  "check": [
   [
    "A retailer wants shoppers to create accounts with their Google or Facebook identities. Which capability fits?",
    "Customer identity (Azure AD B2C or Entra External ID for customers), designed for consumer-facing apps."
   ],
   [
    "A supplier's employees need access to one SharePoint site using their own work accounts. Which capability fits?",
    "B2B collaboration, which invites them as guest users with their existing identities."
   ],
   [
    "Name three signals Conditional Access can evaluate.",
    "Any three of: user or group, location or IP address, device state, application, and sign-in or user risk."
   ],
   [
    "Which license level is needed for Conditional Access?",
    "Microsoft Entra ID P1 or higher; the free tier offers security defaults instead."
   ],
   [
    "What does report-only mode do for a new Conditional Access policy?",
    "It records what the policy would have done in the sign-in logs without enforcing it, so you can test its effect safely."
   ]
  ]
 },
 {
  "t": "Azure role-based access control (RBAC), Zero Trust, defense in depth and Microsoft Defender for Cloud",
  "hook": "It is the first week of an audit at Bluefin Payments, a fictional card processor, and the auditor, Daniel, asks a polite but uncomfortable question: who can delete the production database, and why? You open the subscription's access page and your stomach drops. Fourteen individual people hold Owner, including two interns from last summer. Meanwhile, the security dashboard shows a virtual machine with a remote desktop port open to the whole internet. Nobody did anything malicious; access simply piled up and nobody checked. Daniel wants to know how you will make sure people have only the access they need, and how you will notice the next open door before an attacker does. Where do you start?",
  "simple": "Signing in proves who you are. Azure role-based access control, or RBAC, decides what you are allowed to do once you are in. Instead of giving each person a custom list of permissions, you give them a role, such as Reader (look but do not touch) or Contributor (build and change things), and you choose where that role applies, such as one project folder or a whole account. Zero Trust is a mindset: never assume someone is safe just because they are on the office network, always check. Defense in depth means using several layers of protection, like a house with a fence, a locked door and a safe. Microsoft Defender for Cloud is a tool that checks your setup, gives you a score, and suggests fixes.",
  "body": [
   "Authentication proves who someone is; authorization decides what they can do. Azure role-based access control (RBAC) is the authorization system for Azure resources. Instead of granting individual permissions to individual people, you create a role assignment made of three parts. The first is a security principal, meaning a user, group, service principal or managed identity. The second is a role definition, which is a collection of allowed actions, such as reading or restarting virtual machines (VMs). The third is a scope, which is where the permissions apply. In the portal you open any resource, choose Access control (IAM), then Add role assignment. From the command line you might run `az role assignment create --assignee alice@contoso.com --role Reader --resource-group rg-sales`.",
   "Azure includes many built-in roles, and four fundamental ones appear constantly on the exam. Owner has full access, including assigning roles to others. Contributor can create and manage all resources but cannot grant access to anyone. Reader can view resources but not change them. User Access Administrator can manage user access but not the resources themselves. There are also service-specific roles, such as Virtual Machine Contributor, and you can create custom roles when no built-in role fits. Note that Azure RBAC roles govern Azure resources, while Microsoft Entra roles, such as Global Administrator, govern the directory itself, meaning users, groups and tenant settings.",
   "Scope is what makes RBAC powerful. Scopes follow the resource hierarchy: management group, subscription, resource group or single resource. Assignments are inherited by child scopes, so Reader on a subscription lets someone view every resource group and resource inside it. Permissions from multiple assignments add together, so a person who is Reader on the subscription and Contributor on one resource group can change things only in that resource group. Follow the principle of least privilege: give only the access needed, at the narrowest scope, preferably to groups rather than individuals, so that adding or removing a person from a group updates their access everywhere at once. When you open the Role assignments tab, you can see whether each assignment was made directly or inherited from a parent scope.",
   "Zero Trust is the security model that shapes how those tools are used. It assumes the network is not a safe place and that a breach may already have happened. Its three guiding principles are verify explicitly, use least privilege access, and assume breach. Verify explicitly means always authenticating and authorizing using all available data points, such as identity, location and device health. Least privilege access means just-in-time and just-enough access. Assume breach means segmenting access to limit how far an attacker can move, encrypting end to end, and using analytics to detect threats. Zero Trust replaces the older idea that everything inside the corporate network can be trusted. Multifactor authentication (MFA), Conditional Access and RBAC are the tools that put these principles into practice.",
   "Defense in depth is a related but distinct idea. It protects information with several layers of security, so that if one layer is breached, the next can slow or stop the attack. Microsoft's model lists seven layers from the outside in. Physical security covers datacenter buildings and access to hardware. Identity and access covers MFA, single sign-on (SSO) and RBAC. Perimeter covers distributed denial-of-service (DDoS) protection and perimeter firewalls. Network covers segmenting resources and limiting traffic, for example with network security groups. Compute covers securing and patching VMs and closing unneeded ports. Application covers secure code and keeping secrets out of code. Data, at the center, covers encryption and access controls on the data itself. Zero Trust is a mindset about trust; defense in depth is a layered architecture. They work together.",
   "Microsoft Defender for Cloud is the service that helps you check whether all of this is actually in place. It is a cloud-native application protection platform that combines cloud security posture management (CSPM) with cloud workload protection. It continuously assesses your resources against security best practices and a benchmark, shows a secure score, and gives prioritized recommendations such as enabling MFA, applying system updates or closing open management ports. As you complete recommendations, the secure score rises. Foundational posture features are available at no extra cost; paid Defender plans add threat protection and security alerts for specific resource types, such as servers, storage, databases and containers. Defender for Cloud also covers workloads in other clouds, such as Amazon Web Services and Google Cloud, and on-premises machines connected through Azure Arc.",
   "Consider a worked example. A payments team has one subscription with separate resource groups for web, database and monitoring. You add the developers' group as Contributor on the web resource group only, the database administrators' group as Contributor on the database resource group, and the auditors' group as Reader on the subscription. Nobody except two platform engineers holds Owner. Defender for Cloud then shows a low secure score because a VM exposes port 3389, used for remote desktop, to the internet. You follow the recommendation to close it and use just-in-time VM access instead, applying least privilege at the network layer as well.",
   "Several mistakes come up again and again. People assign Contributor when someone must also grant access to others, which needs Owner or User Access Administrator. They assign roles to individuals at subscription scope when a group at resource-group scope would do. They confuse RBAC, which controls who can act, with Azure Policy, which controls what configurations are allowed. They think Zero Trust means trusting everything inside the firewall, when it means the opposite. And they believe Defender for Cloud protects only Azure resources, when it also covers other clouds and on-premises machines.",
   "Exam questions use role and scope clues. Manage resources but not assign permissions is Contributor. View only is Reader. Full control including granting access is Owner. Permissions apply to all resources in the subscription points to inheritance from a higher scope. Never trust, always verify, or assume breach, is Zero Trust. Multiple layers so a single failure does not expose data is defense in depth. Secure score, security posture or hardening recommendations points to Microsoft Defender for Cloud."
  ],
  "analogy": "Think of a hotel. A role is the type of key card: housekeeping cards open guest rooms, a guest card opens one room, and the manager's master card opens everything and can program new cards, like Owner. Scope is which floors the card works on, and a card programmed for the whole building works on every floor below that level, which is inheritance. Defense in depth is the hotel's layers: front desk, elevator card reader, room lock and in-room safe. Defender for Cloud is the night inspector who walks the halls and lists every door left propped open. The analogy breaks slightly because RBAC permissions add together across assignments, while a person usually carries one hotel card.",
  "mnemonic": "People In Power Never Compromise Any Data: Physical, Identity and access, Perimeter, Network, Compute, Application, Data, the seven defense-in-depth layers from the outside in.",
  "terms": [
   [
    "Azure RBAC",
    "The authorization system that grants access to Azure resources through role assignments."
   ],
   [
    "Role assignment",
    "The combination of a security principal, a role definition and a scope."
   ],
   [
    "Security principal",
    "The identity receiving access: a user, group, service principal or managed identity."
   ],
   [
    "Scope",
    "The level where a role applies: management group, subscription, resource group or resource; child scopes inherit it."
   ],
   [
    "Owner, Contributor, Reader",
    "Full access including granting access; manage resources but not access; view only."
   ],
   [
    "Least privilege",
    "Granting only the minimum access needed, for the minimum scope and time."
   ],
   [
    "Zero Trust",
    "A security model built on verify explicitly, least privilege access and assume breach."
   ],
   [
    "Defense in depth",
    "Layering multiple security controls so that one failure does not expose the data."
   ],
   [
    "Microsoft Defender for Cloud",
    "A service for security posture management and threat protection across Azure, other clouds and on-premises."
   ],
   [
    "Secure score",
    "A Defender for Cloud measure of security posture that rises as you apply recommendations."
   ]
  ],
  "example": "An auditor needs to review a company's Azure configuration for two weeks. Instead of sharing an admin account, the team adds the auditor as a B2B guest, assigns the Reader role at the subscription scope, and sets the assignment to end after two weeks. The auditor can see every resource but cannot change anything, and a Conditional Access policy requires MFA for the sign-in, applying verify explicitly and least privilege together.",
  "mistakes": [
   [
    "Give Contributor to a team lead who needs to add colleagues to a resource group.",
    "Contributor cannot assign roles. Granting access needs Owner or User Access Administrator; choose User Access Administrator if the lead should manage access without managing resources."
   ],
   [
    "RBAC and Azure Policy do the same job.",
    "RBAC controls who can perform actions. Azure Policy controls which resource configurations are allowed, such as permitted regions, no matter who deploys them."
   ],
   [
    "Zero Trust means trusting users once they are inside the corporate network.",
    "It means the opposite: no network location is trusted by default, and every request is verified explicitly using identity, device, location and other signals."
   ],
   [
    "Defender for Cloud only protects resources running in Azure.",
    "It also assesses and protects workloads in other clouds such as Amazon Web Services and Google Cloud, and on-premises machines connected through Azure Arc."
   ]
  ],
  "tryit": [
   [
    "A data team of eight analysts needs to view, but not change, every resource in three resource groups inside one subscription that also holds unrelated finance resources. People join and leave the team often. How should you grant access?",
    "Create a group for the analysts and assign it the Reader role on each of the three resource groups. Using a group handles joiners and leavers, Reader gives view-only access, and resource-group scope avoids exposing the finance resources that subscription scope would include through inheritance."
   ],
   [
    "Defender for Cloud lists three recommendations for a web VM: management ports open to the internet, missing system updates, and no encryption on a storage account holding customer exports. Which defense-in-depth layer does each fix strengthen?",
    "Closing internet-exposed management ports strengthens the network layer (and supports least privilege through just-in-time access). Applying system updates strengthens the compute layer. Encrypting the storage account strengthens the data layer."
   ]
  ],
  "tip": "Contributor can manage resources but cannot assign access; Owner can do both; User Access Administrator manages access only. Assignments inherit downward. RBAC controls who can do what; Azure Policy controls what configurations are allowed. Zero Trust is verify explicitly, least privilege and assume breach. Secure score means Defender for Cloud.",
  "check": [
   [
    "What three parts make up an Azure role assignment?",
    "A security principal, a role definition and a scope."
   ],
   [
    "A user is given Reader on a subscription. Can they view a VM in a resource group in that subscription?",
    "Yes. Assignments are inherited by all child scopes, including resource groups and resources."
   ],
   [
    "Which defense-in-depth layer do network security groups belong to?",
    "The network layer, which limits communication between resources."
   ],
   [
    "Which service gives a secure score and hardening recommendations?",
    "Microsoft Defender for Cloud, through its cloud security posture management features."
   ],
   [
    "Name the three principles of Zero Trust.",
    "Verify explicitly, use least privilege access, and assume breach."
   ]
  ]
 },
 {
  "t": "Factors that affect cost in Azure: resource type, consumption, region, bandwidth, reservations and Azure Hybrid Benefit",
  "hook": "It is the first Monday of the month, and Priya, the only cloud administrator at Lakeside Veterinary Group, opens an email from the finance director with the subject line 'Why did Azure double?' Nothing new was deployed. The clinics still run the same booking app, the same database and the same file shares. Priya opens the invoice and sees dozens of meters she barely recognizes: compute hours, managed disks, outbound data transfer, storage transactions. The finance director wants a one-paragraph answer by lunch and a plan to bring the number down. Where would you even start looking, and which of these levers actually move the bill?",
  "simple": "Azure works like a utility bill rather than a fixed rent. You pay for what you switch on and how much you use it, much like electricity and water at home. Bigger or fancier services cost more, the same service can cost more in one part of the world than another, and sending data out of Azure costs money while sending it in usually does not. If you know you will keep something running for years, you can promise to use it and get a discount, the way a yearly gym membership is cheaper per visit than paying at the door. If you already own Windows Server or SQL Server licenses, you can bring them along and stop paying for the license twice.",
  "body": [
   "Azure bills most services by consumption, so your monthly bill is the sum of many small meters rather than one fixed fee. A single virtual machine (VM) alone can produce separate lines for compute time, disks, public IP addresses and outbound data. Understanding what drives those meters is what lets you estimate cost before you deploy and control it afterwards. The AZ-900 exam expects you to name the main cost factors, explain how each one raises or lowers what you pay, and recognize the purchase options that reduce cost for steady workloads.",
   "Resource type is the first factor. Every service has its own pricing meters. A VM is billed by its size and by the time it runs, plus its disks and any licensed software such as Windows Server. A storage account is billed by the amount of data stored, its redundancy option and access tier, and the number of read and write operations. A serverless function is billed by executions and the resources each execution uses. Settings inside a resource matter too: a larger VM size, premium solid-state drive (SSD) disks or geo-redundant storage all cost more than their smaller or simpler alternatives. That is why right-sizing, choosing the smallest size that still meets the workload's needs, is one of the most effective savings available.",
   "Consumption is the amount you actually use, and it comes with several purchase models. Pay-as-you-go charges for what you use with no commitment, which suits variable, unpredictable or short-lived workloads. For predictable workloads you can commit in advance. Azure Reservations commit you to a specific resource type, such as a VM size in a region, for a one-year or three-year term in return for a significant discount compared with pay-as-you-go. Azure savings plans for compute commit you to a fixed hourly spend across eligible compute services, which gives more flexibility across sizes and regions than a reservation. Spot virtual machines use Azure's spare capacity at a much lower price but can be evicted when Azure needs that capacity back, so they suit interruptible batch jobs, not production web servers.",
   "How you stop a VM also affects consumption. Shutting down the operating system from inside the VM leaves its compute allocated, so compute billing can continue. Stopping it from the portal, CLI or PowerShell so that its status shows Stopped (deallocated) releases the compute and stops compute charges. Even then, you still pay for its managed disks, and for any static public IP address, because those resources still exist and still occupy storage or address space.",
   "Region is the next factor. The same service can cost different amounts in different Azure regions, because of local power, land, taxes, and supply and demand. Choosing a cheaper region can lower cost, provided latency for your users, data-residency rules and compliance requirements are still met. Bandwidth, or network traffic, is often overlooked. Data coming into Azure, called ingress, is generally free. Data leaving Azure, called egress, such as users downloading files or a backup copied to another provider, is billed. Data moving between Azure regions is generally billed as well. Pricing depends on the amount transferred and on geographic billing zones, so keeping chatty components in the same region is a simple design-time saving.",
   "Azure Hybrid Benefit lets you use existing on-premises licenses for Windows Server and SQL Server that have active Software Assurance or qualifying subscriptions. You then pay a lower rate for the VM or database, because the license portion of the price is removed and you pay roughly the base compute rate. It also applies to some Linux subscriptions, such as Red Hat Enterprise Linux and SUSE Linux Enterprise. You turn it on when creating a VM by selecting the licensing option that confirms you own an eligible license, or later on the VM's Configuration page. Reservations and Hybrid Benefit are different mechanisms and can be combined: one rewards a time commitment, the other reuses licenses you already paid for.",
   "Other factors round out the picture. Products bought from Azure Marketplace may add a third-party vendor's software charges on top of the Azure infrastructure cost. Support plans add a monthly fee. Simple housekeeping makes a real difference too: deleting orphaned disks left behind after a VM is removed, unused public IP addresses, idle gateways and forgotten test environments. Azure Advisor and Microsoft Cost Management, covered in later lessons, help you find these leftovers.",
   "Consider a worked example. A company runs a customer database on a VM around the clock, a nightly rendering job that can be restarted if interrupted, and a test environment used only during office hours. It already owns Windows Server licenses with Software Assurance. The database VM gets a three-year reservation and Azure Hybrid Benefit, cutting both the compute rate and the license cost. The rendering job moves to Spot VMs, since an eviction only delays it. The test environment is scheduled to shut down and deallocate each evening. The team also places the database in the same region as the web app to avoid cross-region transfer charges.",
   "Exam questions use clear clue words. 'Commit for one or three years for a discount' points to Reservations. 'Reuse existing Windows Server or SQL Server licenses with Software Assurance' points to Azure Hybrid Benefit. 'Interruptible workload at the lowest price' points to Spot VMs. 'Data uploaded to Azure' is generally free, while 'data downloaded by users' incurs egress charges. 'Same service, different price' points to region. 'Larger size or premium tier' points to resource type. If a question says a VM is 'stopped' but still costs money, look for the answer about deallocation and disks."
  ],
  "analogy": "Think of Azure costs like running a rental car fleet. The type of car (economy or luxury) sets the base rate, the miles you drive are consumption, and renting at the airport costs more than renting downtown, which is region. Driving across a border adds a fee, much like egress. Signing a three-year lease is a reservation, and bringing your own insurance policy so you do not pay for it twice is Azure Hybrid Benefit. The analogy stops at bandwidth direction: in Azure, data coming in is generally free, and only data going out is billed.",
  "terms": [
   [
    "Pay-as-you-go",
    "Paying only for the resources you consume, with no upfront commitment."
   ],
   [
    "Azure Reservations",
    "A one-year or three-year commitment to a specific resource in return for a discounted rate."
   ],
   [
    "Azure savings plan for compute",
    "A commitment to a fixed hourly spend across eligible compute services in exchange for lower prices."
   ],
   [
    "Spot virtual machine",
    "A VM using spare capacity at a low price that can be evicted when Azure needs the capacity."
   ],
   [
    "Ingress and egress",
    "Data entering Azure (generally free) and data leaving Azure (billed)."
   ],
   [
    "Azure Hybrid Benefit",
    "Using existing Windows Server, SQL Server or some Linux licenses on Azure to reduce cost."
   ],
   [
    "Deallocate",
    "Stopping a VM so its compute resources are released and compute billing stops; disks still bill."
   ],
   [
    "Right-sizing",
    "Choosing the smallest resource size or tier that still meets the workload's needs."
   ]
  ],
  "example": "A video platform's Azure bill jumps unexpectedly. Investigation shows most of the increase is egress, because a popular video is being downloaded millions of times directly from Blob storage. Uploads cost nothing, but every download adds outbound bandwidth charges. The team serves the video through a content delivery network with caching and reviews its pricing, and it right-sizes several oversized VMs that were running at low CPU all month.",
  "mistakes": [
   [
    "A VM that is shut down from inside the operating system costs nothing.",
    "Compute stays allocated until the VM is stopped and deallocated from Azure. Even a deallocated VM still bills for its disks and any static public IP."
   ],
   [
    "All network traffic in Azure is charged.",
    "Inbound data (ingress) is generally free. Outbound data (egress) is billed, and so, generally, is traffic between Azure regions."
   ],
   [
    "Reservations and Azure Hybrid Benefit are the same discount.",
    "A reservation is a one-year or three-year commitment to a resource. Hybrid Benefit reuses licenses you already own. They are separate and can be combined on the same VM."
   ],
   [
    "Spot VMs are a cheap choice for any workload.",
    "Spot VMs can be evicted when Azure needs the capacity, so they suit interruptible batch jobs, not production web servers or databases."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union runs a reporting VM that is only needed from 8 a.m. to 6 p.m. on weekdays, and a core banking database VM that runs all day, every day, and will for at least three years. The bank owns SQL Server licenses with active Software Assurance. Which cost options should it apply to each VM?",
    "Schedule the reporting VM to stop and deallocate outside office hours, since it is needed only part of the time and a reservation would pay for idle hours. For the database VM, buy a three-year reservation for its steady compute and apply Azure Hybrid Benefit to reuse the SQL Server licenses. Both discounts can apply together."
   ],
   [
    "A team wants to move a web app to the cheapest Azure region, which is on another continent from its customers, and the company must keep customer data inside its own country. Is the cheapest region a good choice?",
    "No. Region affects price, but data-residency rules come first, and a distant region also adds latency for users. The team should choose the cheapest region that still satisfies residency and performance needs."
   ]
  ],
  "tip": "Inbound data transfer is generally free; outbound is billed. Reservations reward a long-term commitment; Hybrid Benefit reuses licenses you already own. The same service can cost different amounts in different regions, and a stopped VM must be deallocated to stop compute charges.",
  "check": [
   [
    "A company has Windows Server licenses with Software Assurance. How can it lower VM costs in Azure?",
    "Apply Azure Hybrid Benefit so the license portion of the VM price is removed."
   ],
   [
    "Which purchase option suits a VM that must run continuously for the next three years?",
    "An Azure Reservation, which gives a discount for a one-year or three-year commitment."
   ],
   [
    "Is uploading data into Azure usually billed?",
    "No. Ingress is generally free; egress (data leaving Azure) is billed."
   ],
   [
    "Why are Spot VMs unsuitable for a production web server?",
    "They can be evicted at short notice when Azure needs the capacity back."
   ],
   [
    "A deallocated VM still appears on the bill. Why?",
    "Deallocation stops compute charges, but the VM's managed disks and any static public IP address continue to bill."
   ]
  ]
 },
 {
  "t": "The Pricing Calculator vs the Total Cost of Ownership (TCO) Calculator",
  "hook": "Daniel runs IT for Copperfield Plastics, and the lease on the company's server room ends in eighteen months. At Tuesday's leadership meeting the chief financial officer slides a single question across the table: 'If we move to Azure, do we save money or not?' Ten minutes later a developer stops Daniel in the hallway with a different question: 'What would two VMs and a database cost per month for our new customer portal?' Both people want a number. Both numbers come from free Microsoft tools. But they are not the same tool, and handing the wrong report to the wrong person would make Daniel look unprepared. Which calculator answers which question?",
  "simple": "Microsoft offers two free cost calculators on the web, and each answers a different question. The Pricing Calculator is like a shopping cart: you add the Azure services you plan to use, choose sizes and options, and it shows an estimated monthly price. The Total Cost of Ownership (TCO) Calculator is like comparing the cost of owning a car with the cost of using taxis: you describe the servers you already run in your own building, and it estimates how much you would spend running them yourself versus in Azure over several years. Neither tool needs an Azure account, neither builds anything, and both give estimates, not real bills.",
  "body": [
   "Before anyone approves a cloud project, someone asks what it will cost. Microsoft provides two free web-based calculators for answering that question, and the AZ-900 exam often describes a situation and asks which one fits. Neither calculator requires an Azure subscription, neither deploys anything, and both produce estimates rather than binding prices. The difference is the question each one answers, so learning that question is the whole trick.",
   "The Azure Pricing Calculator estimates the cost of Azure services you plan to deploy. You add products, such as a virtual machine (VM), a storage account and an Azure SQL database, and configure each one: the region, size or tier, number of instances, hours of use per month, redundancy, support plan and purchase option, such as pay-as-you-go, a one-year or three-year reservation, or Azure Hybrid Benefit. The calculator then shows an estimated monthly cost and any upfront cost for each item, and a total at the bottom. You can save the estimate, share a link with colleagues, or export it to a spreadsheet for a budget request.",
   "Because each setting changes the estimate immediately, the Pricing Calculator is also a good way to compare options. You can clone an estimate and change only one thing, such as the region, the VM size, or the storage redundancy from locally redundant storage (LRS) to geo-redundant storage (GRS), and see exactly how much that choice adds. It is the tool to use when you are designing a new Azure solution, sizing a proof of concept, or deciding between pay-as-you-go and a reservation. It knows nothing about your existing datacenter; it only prices Azure.",
   "The Total Cost of Ownership (TCO) Calculator compares the cost of running your current on-premises infrastructure with the cost of running the same workloads in Azure. Using it takes three steps. First, you define your workloads: the number of servers and their cores and memory, databases, storage capacity and type, and network bandwidth. Second, you adjust assumptions, such as the cost of electricity, IT labor hourly rates, datacenter space, hardware and software costs, and whether you already own licenses. Third, you view the report, which shows estimated costs and savings over a period of several years, including the on-premises costs you would avoid, such as power, cooling, hardware replacement and maintenance staff time.",
   "Those assumptions deserve attention because they drive the result. The TCO Calculator fills in industry-average defaults, but your organization's electricity rate, labor cost or hardware refresh cycle may be very different. If you leave the defaults in place, the savings figure may look better or worse than reality. A good practice is to replace defaults with figures from your own utility bills and staffing costs before presenting the report.",
   "The key difference is the question each tool answers. The Pricing Calculator answers 'How much will these Azure resources cost per month?' The TCO Calculator answers 'How much could I save by moving my existing datacenter workloads to Azure?' The TCO Calculator is therefore most useful when building a business case for migration and speaking to finance, while the Pricing Calculator is the day-to-day design tool for architects and engineers. Neither tool shows your actual spending. For the real costs of deployed resources you use Microsoft Cost Management, which reports what you have spent and forecasts future spending.",
   "Consider a worked example. A manufacturing company runs forty servers in a leased datacenter whose contract ends in eighteen months. The chief financial officer wants to know whether moving to Azure would save money over the next few years. The infrastructure team enters the servers, storage and bandwidth into the TCO Calculator, adjusts the electricity and labor assumptions to match their real bills, and presents the savings report. Once the migration is approved, the architects use the Pricing Calculator to price the exact VM sizes, storage accounts and backup they will deploy, and to compare reservations against pay-as-you-go. After go-live, the finance team tracks real spending in Cost Management. Three tools, three stages, three different questions.",
   "Common mistakes follow a pattern. People use the TCO Calculator to price a brand-new cloud-only application, but there is no on-premises environment to compare, so the Pricing Calculator is the right choice. Others think either calculator shows their actual bill, when only Cost Management does. Some treat calculator output as a quote, but it is an estimate, and real usage, taxes and agreements change the final figure. And many forget that you do not need a subscription to use either calculator.",
   "Exam questions are usually easy to decode once you look for the comparison. 'Compare on-premises costs with Azure', 'business case for migration' or 'estimate savings from moving the datacenter' points to the TCO Calculator. 'Estimate the monthly cost of a VM and storage account', 'price a new solution' or 'compare the cost of two regions' points to the Pricing Calculator. 'What did we actually spend last month' or 'forecast this month's bill' points to Cost Management."
  ],
  "analogy": "Planning a cloud move is like deciding whether to sell your car. The TCO Calculator is the spreadsheet where you add up everything owning the car really costs, including insurance, repairs, parking and fuel, and compare it with using rideshares for the next few years. The Pricing Calculator is the rideshare app's fare estimate for a specific trip you plan to take. One helps you decide whether to switch at all; the other prices the exact journey once you have. Neither one is the receipt you get after the ride, which in Azure is Cost Management.",
  "mnemonic": "TCO steps in order: Define, Adjust, View. Remember 'Don't Assume Values': define your workloads, adjust the assumptions, then view the report.",
  "terms": [
   [
    "Azure Pricing Calculator",
    "A free web tool that estimates the cost of specific Azure services you plan to deploy."
   ],
   [
    "Total Cost of Ownership (TCO) Calculator",
    "A free web tool that compares on-premises infrastructure costs with running the same workloads in Azure."
   ],
   [
    "Estimate",
    "A projected cost based on your inputs, not a binding price or actual bill."
   ],
   [
    "Assumptions",
    "TCO inputs such as electricity cost, labor rates and datacenter space that shape the savings report."
   ],
   [
    "Business case",
    "A justification for a project, often built with the TCO Calculator for migrations."
   ],
   [
    "Microsoft Cost Management",
    "The service that reports actual and forecast Azure spending, unlike the calculators."
   ]
  ],
  "example": "A startup is building a new cloud-only web app and has no servers of its own. The founder opens the Pricing Calculator, adds an App Service plan, an Azure SQL database and a storage account in the region nearest its customers, and compares pay-as-you-go against a one-year reservation for the database. She exports the estimate to share with an investor. The TCO Calculator would not help here, because there is no on-premises environment to compare against.",
  "mistakes": [
   [
    "Using the TCO Calculator to price a new cloud-only app.",
    "TCO compares an existing on-premises environment with Azure. With nothing on premises, use the Pricing Calculator."
   ],
   [
    "Either calculator shows what you actually spent.",
    "Both produce estimates. Actual and forecast spending for deployed resources comes from Microsoft Cost Management."
   ],
   [
    "You need an Azure subscription to use the calculators.",
    "Both calculators are free web tools that anyone can use without signing in to a subscription."
   ],
   [
    "The TCO savings figure is reliable as long as you enter your servers correctly.",
    "The report also depends on assumptions such as power and labor costs. Default values may not match your organization and can skew the result."
   ]
  ],
  "tryit": [
   [
    "Bluewater Logistics wants to know whether running its new route-planning app on a D-series VM in one region or another would be cheaper, and whether a one-year reservation is worth it. It has no plans to move any existing servers. Which tool should the architect open, and what would she do in it?",
    "The Pricing Calculator. She would add the VM, configure it once for each region, compare the monthly totals, then switch the purchase option between pay-as-you-go and a one-year reservation. The TCO Calculator does not fit because nothing is moving from on premises."
   ],
   [
    "A hospital's board asks whether closing its two server rooms and moving to Azure would reduce costs over five years, including power, cooling and staff time. Which tool should the IT team use, and what should they check before presenting the result?",
    "The TCO Calculator, because the question compares on-premises costs with Azure. Before presenting, they should replace default assumptions such as electricity rates and labor costs with the hospital's real figures so the savings estimate is credible."
   ]
  ],
  "tip": "Comparing on-premises with Azure, or building a migration business case: TCO Calculator. Estimating the cost of specific Azure resources: Pricing Calculator. Seeing what you actually spent: Cost Management. Neither calculator needs a subscription.",
  "check": [
   [
    "An IT director wants to show leadership how much the company could save by closing its datacenter and moving to Azure. Which tool fits?",
    "The TCO Calculator, which compares on-premises costs with Azure costs over several years."
   ],
   [
    "A developer wants to know the monthly cost of two VMs and a storage account in a particular region. Which tool fits?",
    "The Azure Pricing Calculator, which estimates the cost of specific Azure services."
   ],
   [
    "Do you need an Azure subscription to use the Pricing Calculator?",
    "No. Both calculators are free web tools that do not require a subscription."
   ],
   [
    "Which tool shows what your deployed resources actually cost last month?",
    "Microsoft Cost Management, because the calculators only produce estimates."
   ]
  ]
 },
 {
  "t": "Microsoft Cost Management: cost analysis, budgets and alerts, and using tags to track spending",
  "hook": "On the twelfth of the month, Rosa, finance lead at Meridian Community College, gets a message from the dean: 'The research department says it is under budget. Marketing says the same. So why is our Azure bill already past what we planned for the whole month?' Both departments share one subscription, and the invoice lists hundreds of resources with names like vm-gpu-02 and stlogs7731. Nobody can say which belongs to whom, and nobody was warned until the money was spent. Rosa needs to see who is spending what, and she never wants to be surprised like this again. What would let her answer both problems?",
  "simple": "Microsoft Cost Management is the place in Azure where you see what you are really spending, not just guesses. Think of it as the banking app for your cloud account. Cost analysis shows your spending in charts, broken down by service, project or location. Budgets let you set a spending limit for a month and get an email when you get close, like a text from your bank when your balance drops. Tags are labels you stick on resources, such as 'Department: Marketing', so you can later sort the bill by who used what. A budget only warns you; it does not lock the account unless you set up automation to act on the warning.",
  "body": [
   "Microsoft Cost Management is the built-in service for monitoring, allocating and optimizing what you spend in Azure. It appears in the Azure portal as Cost Management + Billing and works at several scopes, including billing accounts, management groups, subscriptions and resource groups. Its core features come at no extra cost for Azure resources. Where the Pricing and TCO calculators estimate, Cost Management reports actual spending and forecasts future spending, which makes it the place you go after resources are deployed. Access follows role-based access control (RBAC): roles such as Cost Management Reader or Cost Management Contributor let finance staff view costs and create budgets without being able to change the resources themselves.",
   "Cost analysis is where you explore your costs visually. You pick a scope, then view accumulated costs for a period, see a forecast for the rest of the month, and group or filter costs by service, resource group, resource, location or tag. Built-in views show daily costs, costs by service and costs by resource, and you can save your own views, share them and pin them to dashboards. A typical chart shows a solid line for spending so far and a dotted line projecting where the month will end. This quickly answers questions such as 'Which resource group cost the most last month?' or 'Why did our bill jump on Tuesday?' because you can switch to the daily view and see exactly which service spiked.",
   "Budgets let you set a spending amount for a scope, such as a subscription or resource group, over a period such as a month, quarter or year. You then define alert conditions, for example at 50%, 80% and 100% of the budget, based on either actual cost or forecast cost. Forecast-based alerts are valuable because they warn you early in the month that you are on track to overspend, before the money is gone. When a threshold is reached, Cost Management sends email notifications to the recipients you list and can trigger an Azure Monitor action group, which can run automation such as a runbook that shuts down development VMs. You can also create a budget from the command line, for example with `az consumption budget create`.",
   "The single most important exam point about budgets is that a budget on its own does not stop resources or cap spending. It warns you. If you want resources to stop when a budget is reached, you must deliberately build that automation with an action group, and you must choose carefully which resources it is safe to stop. This design is intentional: automatically shutting down a production database because a budget was hit could cause far more damage than the overspend.",
   "Cost Management has other alert types too. Budget alerts fire when spending crosses a budget threshold. Credit alerts warn when prepaid Azure credit is being used up. Department spending quota alerts apply to some enterprise agreements. Anomaly alerts can flag unusual changes in daily spending, such as a sudden spike from a misconfigured resource. Cost Management also surfaces Azure Advisor cost recommendations, such as resizing underused VMs, and can export cost data on a schedule to a storage account for reporting in other tools such as spreadsheets or business intelligence dashboards.",
   "Tags help you track spending by business meaning rather than by technical structure. A tag is a name-value pair, such as `CostCenter: Marketing` or `Environment: Production`, applied to subscriptions, resource groups or resources. In cost analysis you then group by tag to see what each department, project or environment costs, even when a project's resources are spread across several resource groups or subscriptions. This supports chargeback, billing each department for its own usage, and showback, simply showing departments what they use. You can add a tag in the portal on the resource's Tags page or with `az tag create --resource-id <id> --tags CostCenter=Marketing`. Tags also help operations, such as marking which VMs can be shut down at night.",
   "Tags have one behavior that trips up many learners: they are not inherited automatically by resources from their resource group or subscription. If you tag a resource group `CostCenter: Research`, the VMs inside it do not receive that tag. If you want every resource to carry a tag, use Azure Policy to require a tag, add a default one, or inherit it from the resource group. Separately, Cost Management offers a tag inheritance setting that applies resource-group and subscription tags to cost records for reporting purposes, without changing the tags on the resources themselves.",
   "Consider a worked example. A company's marketing and research teams share one subscription. Finance wants each team's cost and an early warning before spending runs away. You apply a `CostCenter` tag to every resource, enforced by an Azure Policy that denies resources without it. In cost analysis you group by the `CostCenter` tag to produce a monthly report per team. You then create a monthly budget on the subscription with alerts at 80% of forecast cost and 100% of actual cost, emailing the finance lead and triggering an action group that stops development VMs outside office hours.",
   "Exam wording follows predictable patterns. 'Notify when spending reaches a threshold' points to budgets and alerts. 'See which service or resource group costs the most' points to cost analysis. 'Track costs by department or project' points to tags. 'Ensure every resource has a tag' points to Azure Policy. 'Forecast spending' points to Cost Management. Watch for distractors that claim a budget will 'prevent' or 'block' spending; that is not what budgets do by themselves."
  ],
  "analogy": "Cost Management works like a household finance app linked to a shared family credit card. Cost analysis is the spending chart by category, budgets are the alerts that text you at 80% of your monthly limit, and tags are the labels you put on each purchase, such as 'kids' or 'car', so you can split the bill later. The analogy breaks in one useful way: a credit card has a hard limit that declines purchases, but an Azure budget has no hard limit. It only alerts unless you add automation.",
  "terms": [
   [
    "Microsoft Cost Management",
    "The Azure service for analyzing, monitoring, allocating and optimizing actual cloud spending."
   ],
   [
    "Cost analysis",
    "The Cost Management view for exploring, grouping and filtering costs and forecasts."
   ],
   [
    "Budget",
    "A spending amount for a scope and period that triggers alerts at chosen thresholds."
   ],
   [
    "Budget alert",
    "A notification sent when actual or forecast cost crosses a budget threshold."
   ],
   [
    "Action group",
    "An Azure Monitor collection of notifications and automated actions triggered by alerts."
   ],
   [
    "Tag",
    "A name-value pair applied to resources, resource groups or subscriptions to organize and report on them."
   ],
   [
    "Chargeback",
    "Allocating cloud costs back to the departments or projects that incurred them."
   ]
  ],
  "example": "A university gives each research lab its own resource group and a monthly budget with alerts at 75% and 100%. One lab accidentally leaves a large GPU VM running over a holiday. On day eight the forecast alert fires and emails the lab manager, who deallocates the VM. Because the budget only alerts, the university later adds an action group that automatically stops VMs tagged `AutoShutdown: Yes` when the budget hits 100%.",
  "mistakes": [
   [
    "A budget stops resources when it is exceeded.",
    "Budgets only send alerts. To stop resources you must add automation, such as an action group that runs a runbook."
   ],
   [
    "Tags applied to a resource group flow down to its resources.",
    "Tags are not inherited by default. Use Azure Policy to require, add or inherit tags, or the Cost Management tag inheritance setting for cost reporting only."
   ],
   [
    "Cost Management and the Pricing Calculator do the same job.",
    "The Pricing Calculator estimates future costs before deployment. Cost Management reports actual and forecast spending for deployed resources."
   ],
   [
    "Resource groups are enough for chargeback.",
    "A project often spans several resource groups or subscriptions. Tags let you group costs by department or project regardless of structure."
   ]
  ],
  "tryit": [
   [
    "Northgate Clinics wants each of its three clinics to see its own monthly Azure cost, but resources for each clinic are spread across shared resource groups for networking, databases and web apps. The finance team also wants a warning early in the month if spending is on track to exceed the plan. What should the administrator set up?",
    "Apply a tag such as `Clinic: East` to every resource, enforce it with Azure Policy, and group by that tag in cost analysis. Then create a monthly budget with an alert based on forecast cost, so finance is warned before the overspend actually happens."
   ],
   [
    "A manager says, 'Set a budget of 5,000 on the dev subscription so nobody can spend more than that.' What should you tell the manager?",
    "A budget alone will not prevent spending; it only sends alerts. If the manager wants enforcement, you can add an action group that runs automation to stop development VMs when the threshold is reached, after confirming which resources are safe to stop."
   ]
  ],
  "tip": "Budgets alert; they do not stop spending by themselves. Tags are not inherited by default; use Azure Policy to require or inherit them. Cost Management shows actual and forecast spending, unlike the calculators, which only estimate.",
  "check": [
   [
    "A manager wants an email when a subscription reaches 90% of its monthly spending target. What should you configure?",
    "A budget in Cost Management with an alert condition at 90%."
   ],
   [
    "Will a budget automatically stop resources when it is exceeded?",
    "No. Budgets send alerts; stopping resources requires automation such as an action group."
   ],
   [
    "How can you report costs per project when a project's resources are spread across several resource groups?",
    "Apply a project tag to the resources and group by that tag in cost analysis."
   ],
   [
    "A tag is applied to a resource group. Do the resources inside automatically receive it?",
    "No. Tags are not inherited by default; use Azure Policy to add or inherit them."
   ]
  ]
 },
 {
  "t": "Microsoft Purview for data governance, and the Service Trust Portal for compliance reports",
  "hook": "The external auditor arrives at Silverline Health Partners at nine on a Thursday, and Kenji from the compliance team has two questions waiting on his desk. The first: 'Show me independent proof that your cloud provider's datacenters meet ISO 27001 and have a current SOC 2 report.' The second: 'Show me every place patient identifiers are stored across your systems, and how that data gets into your monthly dashboards.' Kenji realizes these are very different requests. One is about Microsoft's side of the cloud. The other is about Silverline's own data, scattered across Azure, an on-premises file server and a data lake. Where does he find each answer?",
  "simple": "There are two different kinds of proof a company may need. The first is proof that Microsoft runs its cloud safely. Microsoft keeps independent audit reports about its datacenters in a library called the Service Trust Portal, and customers can download them. The second is knowing your own data: what you have, where it is stored, how sensitive it is and where it travels. Microsoft Purview helps with that. It scans your systems, finds sensitive items like card numbers, labels them and draws a map of where data flows. Think of a landlord's building safety certificate versus your own inventory of what is in your apartment. The landlord's certificate does not tell you where your jewelry is.",
  "body": [
   "Governance and compliance are related but different needs. Data governance is knowing what data you have, where it lives, who uses it and how sensitive it is, and then applying rules to it. Compliance is proving that you meet laws, regulations and industry standards, such as data protection laws or payment card rules. The AZ-900 exam covers one Microsoft offering for each area: Microsoft Purview for governing and protecting your own data, and the Service Trust Portal for evidence about how Microsoft's cloud meets standards.",
   "Microsoft Purview is a family of data governance, risk and compliance solutions that gives you a single, unified view of your data. Purview connects to data sources across on-premises systems, multiple clouds and software-as-a-service (SaaS) applications, such as Azure SQL Database, Azure Data Lake Storage, on-premises SQL Server and Amazon S3. It automatically discovers and scans those sources, builds a map of your data estate, and classifies sensitive data, such as credit card numbers or national identity numbers, using built-in and custom classifiers. It also tracks data lineage, which shows where data came from and how it moved and was transformed on its way to a report.",
   "Lineage is worth understanding because it answers questions auditors and analysts both ask. If a dashboard shows revenue by region, lineage shows that the figure came from a sales database, was copied into a data lake by a pipeline, was joined with a customer table, and was then loaded into the reporting model. If a source column contains sensitive data, lineage shows every downstream place that data ended up, which is exactly what you need to protect it or respond to a privacy request.",
   "Purview is often described in two broad areas. The risk and compliance side, closely tied to Microsoft 365, protects sensitive data across Teams, OneDrive, SharePoint, Exchange and devices. It includes sensitivity labels, data loss prevention (DLP) policies that stop sensitive data from leaving the organization, data lifecycle and retention management, insider risk management, eDiscovery and audit. The unified data governance side helps you manage data across on-premises, multicloud and SaaS sources, with a data catalog so analysts can search for trustworthy data by business term, and insights into where sensitive data is stored.",
   "The Service Trust Portal is a Microsoft site that provides information, tools and documents about how Microsoft cloud services handle security, privacy and compliance. Its most important use for AZ-900 is access to audit reports: independent third-party reports on Microsoft cloud services against standards such as ISO/IEC 27001 (information security management), System and Organization Controls (SOC) 1, 2 and 3, and the Payment Card Industry Data Security Standard (PCI DSS). It also offers whitepapers, penetration test summaries, data protection resources and regional and industry compliance documents. Some content is public; to download many reports you sign in with your organization's work account and accept the terms of use.",
   "The two tools answer different questions, and they reflect the shared responsibility model. Microsoft's audits prove that Microsoft's part of the cloud, such as its physical datacenters, hardware and platform services, meets a standard. You still have to configure your own resources and handle your own data compliantly. Purview helps with your side of that line; the Service Trust Portal documents Microsoft's side. A related tool, Microsoft Purview Compliance Manager, helps you track your own compliance tasks against regulations with a compliance score. That is useful context, but it is separate from the Service Trust Portal's downloadable reports.",
   "Consider a worked example. A healthcare company is preparing for an external audit. The auditor asks for proof that the cloud provider hosting its patient data is certified against ISO/IEC 27001 and has a current SOC 2 report. A compliance officer signs in to the Service Trust Portal, downloads both reports and hands them over. The auditor then asks where patient data lives across the company's systems. The data team uses Microsoft Purview to scan its Azure SQL databases, data lake and on-premises file shares, classify records containing health identifiers, and show lineage from the source systems to the analytics dashboards.",
   "Several mistakes come up again and again. Going to the Service Trust Portal to find your own sensitive data does not work, because it holds Microsoft's documents, not yours. Expecting Purview to provide Microsoft's certification reports is the reverse error. Assuming that Microsoft's compliance certificates make your workload automatically compliant ignores shared responsibility, since they cover Microsoft's responsibilities only. And confusing Purview with Azure Policy mixes up two layers: Azure Policy governs resource configurations, such as allowed regions or required tags, while Purview governs the data itself.",
   "Exam questions are usually worded around who owns the evidence. 'Discover, classify and map data across on-premises, multicloud and SaaS', 'data lineage', 'data catalog' or 'sensitive data such as credit card numbers' points to Microsoft Purview. 'Download Microsoft's audit reports', 'ISO or SOC reports for Azure' or 'how Microsoft protects customer data' points to the Service Trust Portal. If the question is about restricting resource settings, the answer is Azure Policy instead."
  ],
  "analogy": "Picture renting space in a secure storage facility. The facility's owner shows you inspection certificates for its fences, cameras and fire systems; that is the Service Trust Portal, proof about the building you do not control. Inside your own unit, you keep an inventory listing every box, what is valuable and where each item came from; that is Purview, governance of your own belongings. The building passing inspection does not mean your unit is organized or that you locked your door, which is the shared responsibility model in a nutshell.",
  "terms": [
   [
    "Data governance",
    "Knowing what data you have, where it is and how it is used, and applying rules to it."
   ],
   [
    "Microsoft Purview",
    "A family of solutions for data governance, risk and compliance across on-premises, multicloud and SaaS data."
   ],
   [
    "Data lineage",
    "A record of where data originated and how it moved and changed across systems."
   ],
   [
    "Data classification",
    "Automatically identifying and labeling data by type or sensitivity, such as credit card numbers."
   ],
   [
    "Data loss prevention (DLP)",
    "Policies that detect and prevent sensitive data from leaving the organization."
   ],
   [
    "Service Trust Portal",
    "Microsoft's site for audit reports, compliance documents and information about how Microsoft cloud services protect data."
   ],
   [
    "Audit report",
    "An independent assessment showing that a service meets a standard such as ISO/IEC 27001 or SOC 2."
   ]
  ],
  "example": "A bank's risk team must show regulators where customer account numbers are stored and how they reach monthly reports. They register their data warehouse, data lake and on-premises databases in Microsoft Purview, which scans them, classifies columns containing account numbers and displays lineage from source to report. Separately, the regulator requests Microsoft's latest SOC reports for Azure, which the compliance team downloads from the Service Trust Portal.",
  "mistakes": [
   [
    "Using the Service Trust Portal to find where your own sensitive data is stored.",
    "The Service Trust Portal holds Microsoft's audit reports and compliance documents. Discovering and classifying your own data is a job for Microsoft Purview."
   ],
   [
    "Azure's ISO or SOC certifications make your application compliant.",
    "Those audits cover Microsoft's responsibilities. You must still configure your resources and handle your data compliantly."
   ],
   [
    "Purview and Azure Policy are interchangeable governance tools.",
    "Azure Policy governs resource configurations such as regions and SKUs. Purview governs data: discovery, classification, lineage and protection."
   ],
   [
    "Purview only works with data stored in Azure.",
    "Purview can scan on-premises, multicloud and SaaS sources, such as on-premises SQL Server and Amazon S3."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Insurance is migrating analytics to Azure but keeps some customer records in on-premises SQL Server and in another cloud's object storage. A new privacy officer wants one searchable view of where customer national identity numbers appear and which reports use them. Which Microsoft offering fits, and which capabilities would she rely on?",
    "Microsoft Purview. She would register and scan all three sources, rely on classification to find national identity numbers, and use lineage to see which pipelines and reports consume them. The Service Trust Portal would not help, because it only documents Microsoft's own compliance."
   ],
   [
    "A procurement officer evaluating Azure asks for evidence that Microsoft's cloud has been independently audited for payment card security before her company signs a contract. Where should the sales engineer send her, and what should she expect to do there?",
    "To the Service Trust Portal, where Microsoft publishes third-party audit reports such as PCI DSS. Some documents are public, but for many reports she will sign in with a work account and accept the terms before downloading."
   ]
  ],
  "tip": "Finding, classifying and tracing lineage of your own data across locations: Microsoft Purview. Downloading Microsoft's compliance and audit reports such as ISO or SOC: Service Trust Portal. Microsoft's certifications cover only Microsoft's side of shared responsibility.",
  "check": [
   [
    "An auditor needs Microsoft's SOC 2 report for Azure. Where do you get it?",
    "The Service Trust Portal, which provides Microsoft's audit reports and compliance documents."
   ],
   [
    "Which service can scan data sources across Azure, on-premises and other clouds and show data lineage?",
    "Microsoft Purview."
   ],
   [
    "Does Azure's ISO/IEC 27001 certification make your application compliant automatically?",
    "No. It covers Microsoft's responsibilities; you must still configure and manage your own resources and data compliantly."
   ],
   [
    "How does Purview differ from Azure Policy?",
    "Purview governs data (discovery, classification, lineage, protection); Azure Policy governs resource configurations."
   ]
  ]
 },
 {
  "t": "Azure Policy: definitions, initiatives, assignments and compliance",
  "hook": "Elena, the cloud lead at Ridgeway Outfitters, a European retailer, gets a message from the data protection officer: 'Why is there a storage account full of customer exports in a US region?' Elena checks the activity log. The account was created by a senior engineer who holds the Owner role, so no permission check stopped him. He was in a hurry and picked the first region in the list. Elena now has to move the data, and she has a sinking feeling there are other resources out there that break the company's rules, such as untagged VMs and oversized GPU machines. Permissions clearly were not enough. What could stop this from happening again, even for an Owner?",
  "simple": "Azure Policy is a rulebook for what is allowed to exist in your Azure environment. Permissions decide who may build things; policies decide what may be built and how. A rule might say 'only build in these two regions' or 'every resource must have a cost center label'. When someone tries to break a rule, Azure can refuse the request, or allow it but flag it so you can fix it later. You can bundle many rules into one package and apply that package to a whole department at once. Think of a building code: anyone with a permit can build, but the code still says where the fire exits must go.",
  "body": [
   "Azure Policy is a service that helps you enforce organizational standards and assess compliance at scale. Where role-based access control (RBAC) controls who can do something, Azure Policy controls what can be created and how resources must be configured, no matter who is doing it, even a user with the Owner role. For example, a policy can allow resources only in certain regions to meet data-residency rules, require a tag on every resource group, allow only specific virtual machine (VM) sizes to control cost, or require that storage accounts accept only HTTPS traffic. It is one of the core governance tools on the AZ-900 exam, alongside management groups, resource locks and tags.",
   "A policy definition describes a rule: a condition to evaluate and an effect to apply when a resource matches that condition. Definitions are written in JavaScript Object Notation (JSON) with an `if` block and a `then` block, and Azure provides hundreds of built-in definitions, such as 'Allowed locations', 'Allowed virtual machine size SKUs' and 'Require a tag on resources'. You can also write custom definitions. Definitions often use parameters, so one definition can be reused with different values, such as a different list of allowed regions for each assignment.",
   "The effect decides what happens when a resource matches. Deny blocks a create or update request that breaks the rule, and the requester sees a policy error naming the policy. Audit allows the request but marks the resource as non-compliant so it shows up in reports. Append and Modify add or change properties, such as adding a missing tag. AuditIfNotExists and DeployIfNotExists check for a related resource or setting, such as a diagnostic setting or an extension, and either report or deploy it when it is missing. Disabled turns the rule off without deleting it, which is useful for testing. A simplified rule that denies any location outside an allowed list looks like this:",
   "```json\n\"if\": { \"not\": { \"field\": \"location\", \"in\": \"[parameters('allowedLocations')]\" } },\n\"then\": { \"effect\": \"deny\" }\n```",
   "An initiative, also called a policy set, groups several related policy definitions so you can manage and assign them as one unit toward a single goal. For example, an initiative for a security benchmark might contain dozens of definitions covering encryption, logging and network rules, and there are built-in initiatives for regulatory standards. Microsoft Defender for Cloud uses a built-in initiative, the Microsoft cloud security benchmark, to drive many of its recommendations. Grouping rules into an initiative also gives you one compliance percentage for the whole goal, rather than dozens of separate ones.",
   "A definition or initiative does nothing until you create an assignment, which applies it to a scope: a management group, subscription or resource group. Assignments are inherited by all child scopes, so assigning a policy at a management group covers every subscription, resource group and resource beneath it, including ones created later. You can exclude specific child scopes, such as a sandbox resource group, and you set parameter values, such as the list of allowed regions, at assignment time. In the portal you open Policy, choose Definitions, pick one and select Assign; from the command line you can run `az policy assignment create`.",
   "Azure Policy evaluates resources when they are created or updated, when an assignment changes, and periodically for existing resources. The Compliance page shows the percentage of compliant resources for each assignment and lists each non-compliant resource with the reason. Existing resources are not deleted or blocked when you assign a Deny policy; they are reported as non-compliant, and the Deny applies to future creates and updates. For policies using Modify or DeployIfNotExists, you can create remediation tasks that fix existing non-compliant resources, for example adding a missing tag to hundreds of resources at once.",
   "Consider a worked example. A European company must keep all data in two European regions and wants every resource tagged with a cost center. You create an initiative containing 'Allowed locations' with Deny, set to the two regions, and 'Require a tag on resources' with Deny for the `CostCenter` tag. You assign the initiative to the company's top management group. A developer then tries to create a VM in a US region, and the request fails with a policy error. The compliance view shows a few older resources without the tag, so you add an inherit-tag policy with Modify and run a remediation task.",
   "Common mistakes are predictable. People confuse Policy with RBAC, forgetting that an Owner can still be blocked by a Deny policy. They expect a new Deny policy to delete existing non-compliant resources, when it only reports them. They forget that a definition has no effect until it is assigned. And they mix up Policy with resource locks, which protect specific resources from deletion or change rather than enforcing configuration rules across many resources.",
   "Exam wording is consistent. 'Ensure resources are created only in certain regions', 'enforce standards', 'only allow certain VM sizes' or 'report non-compliant resources' points to Azure Policy. 'Group several policies' points to an initiative. 'Apply a policy to a scope' points to an assignment. 'Block' is the Deny effect; 'allow but flag' is Audit. 'Fix existing resources' points to a remediation task."
  ],
  "analogy": "Azure Policy works like a city's building code. Each code rule is a policy definition, a chapter of related rules such as the fire safety chapter is an initiative, and the city council adopting that chapter for a specific district is an assignment, which then covers every lot in the district. Inspectors either refuse to approve a non-compliant plan (Deny) or approve it and write it up for later (Audit). Where the analogy stops: Azure Policy never tears down existing buildings, so old non-compliant resources are reported, not removed.",
  "terms": [
   [
    "Azure Policy",
    "A service that enforces rules on resource configurations and reports compliance across scopes."
   ],
   [
    "Policy definition",
    "A JSON rule describing a condition and the effect to apply when a resource matches."
   ],
   [
    "Effect",
    "The action a policy takes, such as Deny, Audit, Modify or DeployIfNotExists."
   ],
   [
    "Initiative (policy set)",
    "A group of related policy definitions managed and assigned as one unit."
   ],
   [
    "Assignment",
    "The application of a definition or initiative to a scope, with parameters and optional exclusions."
   ],
   [
    "Compliance state",
    "Whether a resource meets the assigned policies, shown on the Compliance page."
   ],
   [
    "Remediation task",
    "A job that brings existing non-compliant resources into compliance using Modify or DeployIfNotExists."
   ]
  ],
  "example": "A retail company discovered staff creating expensive GPU VMs for experiments. The cloud team assigns the built-in 'Allowed virtual machine size SKUs' policy with a list of approved sizes to the subscription. From then on, any attempt to deploy a GPU size is denied with a clear policy message, while existing VMs are shown as non-compliant so the team can review and resize them.",
  "mistakes": [
   [
    "An Owner cannot be blocked by Azure Policy.",
    "Policy evaluates the resource configuration, not the user's role. A Deny policy blocks a non-compliant request from anyone, including an Owner."
   ],
   [
    "Assigning a Deny policy deletes or shuts down existing non-compliant resources.",
    "Existing resources are only reported as non-compliant. Deny applies to new creates and updates, and remediation tasks can fix some existing resources."
   ],
   [
    "Creating a policy definition is enough to enforce it.",
    "A definition or initiative has no effect until it is assigned to a scope."
   ],
   [
    "Azure Policy and resource locks do the same thing.",
    "Policy controls which configurations are allowed across many resources. Locks protect specific existing resources from deletion or modification."
   ]
  ],
  "tryit": [
   [
    "Oakridge Bank wants every new storage account to accept only HTTPS traffic and every resource to carry a `DataOwner` tag. It has twelve subscriptions under one management group, and it wants a single compliance score for this goal. How should the cloud team structure this in Azure Policy?",
    "Create an initiative containing the two definitions (secure transfer required for storage accounts, and require a tag), then assign that initiative once at the management group. The assignment is inherited by all twelve subscriptions, and the initiative gives one compliance percentage for the whole goal."
   ],
   [
    "After assigning 'Require a tag on resources' with Deny, an administrator sees 340 existing resources marked non-compliant. Her manager asks whether those resources are now broken or will be deleted. What should she say, and how can she fix them at scale?",
    "They are not broken or deleted; the Deny only affects new creates and updates, and existing resources are simply reported. To fix them, she can assign a tag policy with the Modify effect, such as inheriting the tag from the resource group, and run a remediation task."
   ]
  ],
  "tip": "Policy is about what is allowed (configuration); RBAC is about who can act. An initiative groups definitions; an assignment applies them to a scope. Deny blocks non-compliant changes; Audit only reports them. Policies apply even to Owners.",
  "check": [
   [
    "A company wants to prevent anyone from creating resources outside two approved regions. What should it use?",
    "Azure Policy with the Allowed locations definition and the Deny effect, assigned at a suitable scope."
   ],
   [
    "What is an initiative in Azure Policy?",
    "A group of related policy definitions managed and assigned together toward one goal."
   ],
   [
    "A Deny policy for a required tag is assigned. What happens to existing resources without the tag?",
    "They are reported as non-compliant but are not deleted; the Deny applies to new creates and updates."
   ],
   [
    "A user has the Owner role. Can Azure Policy still block their deployment?",
    "Yes. Policy evaluates the resource configuration regardless of the user's role."
   ]
  ]
 },
 {
  "t": "Resource locks: CanNotDelete vs ReadOnly and how they inherit",
  "hook": "It is late on a Friday at Tidewater Freight, and Marcus is cleaning up old test environments before the weekend. He has the Owner role, a list of resource group names, and a script that deletes them one by one. One name on his list, rg-orders, is not the test copy. It is production, holding the order database and the network that every warehouse depends on. He presses Enter. In a few seconds, either the deletion goes through and the weekend becomes a disaster recovery exercise, or something in Azure stops him and makes him look again. What could make that difference, even for an Owner?",
  "simple": "A resource lock is a safety catch you put on something important in Azure so nobody removes or changes it by accident. There are two kinds. A delete lock means people can still use and adjust the thing, but nobody can throw it away. A read-only lock means people can look at it, but nobody can change it or throw it away. Locks apply to everyone, even the most powerful administrators, and a lock on a folder also protects everything inside it. To delete something that is locked, someone with the right permission must remove the lock first, which forces them to stop and think. It is like the child-safety cap on a medicine bottle.",
  "body": [
   "Even with careful role-based access control (RBAC), a person with the right role can accidentally delete or change an important resource, for example by removing the wrong resource group while cleaning up test environments. Resource locks add a safety net: they prevent resources from being deleted or modified, regardless of the user's role, until the lock is removed. Locks are one of the governance features in Azure, alongside Azure Policy and tags, and they are especially valuable for production databases, networking resources and anything that would take a long time to rebuild.",
   "There are two lock levels, and the exam expects you to know exactly what each one blocks. CanNotDelete, shown in the portal as Delete, means authorized users can still read and modify the resource, but they cannot delete it. ReadOnly, shown as Read-only, means authorized users can read the resource but cannot update or delete it; the effect is similar to limiting every user to the permissions of the Reader role for that resource. So CanNotDelete stops one thing, deletion, while ReadOnly stops two, changes and deletion.",
   "You add a lock in the portal on the Locks page of a resource, resource group or subscription, giving it a name, a lock type and an optional note explaining why it exists. You can also add one from the command line, for example `az lock create --name keep-db --lock-type CanNotDelete --resource-group rg-prod` with the Azure CLI, or `New-AzResourceLock -LockName keep-db -LockLevel CanNotDelete -ResourceGroupName rg-prod` in Azure PowerShell. When someone tries a blocked action, the request fails with an error that mentions the scope is locked, which tells them exactly why.",
   "You can apply a lock at the subscription, resource group or resource level, and locks are inherited. A lock on a resource group applies to every resource in that group, including resources added later. When several locks apply, the most restrictive one wins, so a ReadOnly lock on a resource group overrides a CanNotDelete lock on a resource inside it, and that resource becomes read-only. A lock on a resource group also stops the resource group itself from being deleted, which protects everything in it from a single careless delete like the one in the opening scenario.",
   "Locks apply to everyone, including Owners. To delete a locked resource you must first remove the lock, which requires permission to manage locks, specifically the `Microsoft.Authorization/locks/*` actions. Among built-in roles, only Owner and User Access Administrator have them. This extra step is deliberate: it forces a conscious decision before destructive changes and prevents mistakes made in a hurry. It also means you can let a team manage resources as Contributors, who can change and scale things freely, while ensuring they cannot remove the locks that protect production.",
   "Locks apply to management operations sent through Azure Resource Manager, known as the control plane, not to operations on the data inside a resource, known as the data plane. A ReadOnly lock on a storage account does not stop someone with data access from uploading or deleting blobs, but it does block changes to the account's settings. A ReadOnly lock on a SQL server blocks changing the server's configuration but still allows reading and writing database data. So locks protect the resource, not the contents; protecting the data itself needs backups, soft delete and data-level permissions.",
   "ReadOnly locks can also have surprising side effects, because some actions that look like reads are actually management operations that use POST requests. For example, listing a storage account's access keys is blocked by a ReadOnly lock, which can break tools and portal views that rely on those keys. Similarly, a ReadOnly lock on a resource group can stop routine operations such as starting or restarting VMs inside it. For that reason, CanNotDelete is the more common choice for production, and ReadOnly is best tested before you use it widely.",
   "Consider a worked example. A company's production resource group holds a virtual network, a SQL database and several VMs. The operations team wants to scale VMs and change settings freely but never delete anything by accident. You apply a CanNotDelete lock to the resource group. Months later, an engineer running a cleanup script tries to delete the whole group, and the request fails with a lock error, so nothing is lost. For a network configuration that must not change at all during an audit period, you apply a ReadOnly lock to the virtual network for the duration of the audit, then remove it afterwards.",
   "Common mistakes include thinking CanNotDelete blocks changes, when it only blocks deletion; believing Owners can ignore locks, when they must remove the lock first; expecting locks to protect the data inside a resource, such as blobs or table rows; and confusing locks with Azure Policy. Policy controls which configurations are allowed across many resources; locks protect specific existing resources from deletion or change.",
   "Exam questions are usually short. 'Prevent accidental deletion but allow changes' points to CanNotDelete. 'Prevent any changes and deletion' points to ReadOnly. 'A resource group has a ReadOnly lock and a resource inside has CanNotDelete; what can you do?' points to inheritance and the most restrictive lock, so you can only read. 'An Owner cannot delete a resource' usually means there is a lock that must be removed first."
  ],
  "analogy": "Think of a museum. A CanNotDelete lock is like a painting bolted to the wall: staff can clean it, adjust the lighting and move the label, but nobody can carry it out of the building. A ReadOnly lock is like a painting behind sealed glass: visitors can look, but nobody can touch or remove it. Bolting the whole gallery room protects every painting hung there later. The analogy stops at the data plane: a ReadOnly lock on a storage account seals the frame, not the picture, so data inside can still change.",
  "terms": [
   [
    "Resource lock",
    "A setting that prevents a resource from being deleted or modified regardless of the user's role."
   ],
   [
    "CanNotDelete",
    "A lock level (Delete in the portal) that allows reading and modifying a resource but blocks deletion."
   ],
   [
    "ReadOnly",
    "A lock level (Read-only in the portal) that allows reading a resource but blocks updates and deletion."
   ],
   [
    "Lock inheritance",
    "A lock at a subscription or resource group applies to all resources within it, including new ones."
   ],
   [
    "Control plane",
    "Management operations on resources handled by Azure Resource Manager, which locks affect."
   ],
   [
    "Data plane",
    "Operations on the data inside a resource, such as reading or writing blobs, which locks do not block."
   ]
  ],
  "example": "A startup's lead engineer deletes what she thinks is a test resource group, but it holds the production database. After restoring from backup, the company applies CanNotDelete locks to all production resource groups and gives developers the Contributor role, which cannot remove locks. Now any deletion requires an Owner to remove the lock first, a step that makes people stop and check what they are deleting.",
  "mistakes": [
   [
    "CanNotDelete prevents any changes to the resource.",
    "CanNotDelete only blocks deletion. Users can still modify the resource. To block changes as well, use ReadOnly."
   ],
   [
    "An Owner can delete a locked resource directly.",
    "Locks apply to everyone. The Owner must remove the lock first, which requires lock-management permission held by Owner and User Access Administrator."
   ],
   [
    "A ReadOnly lock on a storage account protects the blobs inside it.",
    "Locks affect control plane operations through Azure Resource Manager, not data plane operations such as uploading or deleting blobs."
   ],
   [
    "A CanNotDelete lock on a resource overrides a ReadOnly lock on its resource group.",
    "When locks are inherited, the most restrictive one wins, so the resource is effectively read-only."
   ]
  ],
  "tryit": [
   [
    "Summit Labs has a production resource group where engineers regularly resize VMs, add disks and change app settings. The CTO wants to make sure nothing in that group can be deleted by accident, including resources added next quarter. Developers have the Contributor role. Which lock should be applied, and where?",
    "A CanNotDelete lock on the resource group. It allows the routine changes, blocks deletion of the group and every resource in it, and is inherited by resources added later. Contributors cannot remove the lock, so only an Owner or User Access Administrator could deliberately lift it."
   ],
   [
    "During a two-week audit, a team applies a ReadOnly lock to a resource group containing VMs and a storage account. The next morning, the help desk reports that an operator cannot restart a VM and a reporting tool can no longer read the storage account keys. Is something broken?",
    "No. Restarting a VM and listing storage keys are management operations that a ReadOnly lock blocks. That is a known side effect. The team should either accept it for the audit period, narrow the ReadOnly lock to only the resources that must not change, or use CanNotDelete instead."
   ]
  ],
  "tip": "CanNotDelete still allows changes; ReadOnly blocks changes and deletion. Locks apply even to Owners and are inherited by child resources, with the most restrictive lock winning. To delete a locked resource, remove the lock first.",
  "check": [
   [
    "Which lock allows an administrator to resize a VM but not delete it?",
    "CanNotDelete, which blocks deletion but allows modification."
   ],
   [
    "A resource group has a CanNotDelete lock. Is a VM added to the group next week protected?",
    "Yes. Locks are inherited by all resources in the scope, including ones added later."
   ],
   [
    "An Owner tries to delete a resource with a ReadOnly lock. What happens?",
    "The request fails; the Owner must remove the lock before deleting the resource."
   ],
   [
    "Does a ReadOnly lock on a storage account stop users from uploading blobs?",
    "No. Locks affect management (control plane) operations, not data plane operations such as writing blobs."
   ]
  ]
 },
 {
  "t": "Tools for interacting with Azure: the portal, Azure Cloud Shell, Azure CLI and Azure PowerShell",
  "hook": "Aisha starts her first week as a junior administrator at Brookfield Public Library. On Monday she clicks through the Azure portal to create a storage account and enjoys seeing every option laid out. On Wednesday her manager asks for the same network, resource group and three VMs in each of five branch regions by Friday, and her library laptop will not let her install anything. Meanwhile a colleague emails her a snippet that starts with `Get-AzVM`, and another sends one that starts with `az vm list`. Are those the same tool? Can she do this without installing software? And which approach will not leave her clicking the same forms fifteen times?",
  "simple": "There are several ways to tell Azure what to do, and they all talk to the same control center behind the scenes. The Azure portal is a website with buttons and forms, good for learning and one-off jobs. The Azure CLI and Azure PowerShell are two command languages where you type instructions; they are great when you need to repeat a job, because you can save the commands as a script and run them again. Azure CLI commands start with 'az', while Azure PowerShell commands look like 'Get-AzVM'. Azure Cloud Shell is a command window that opens inside your web browser with both tools already installed and signed in, so you do not need to install anything. It is like ordering food in person, by app, or by phone: different ways, same kitchen.",
  "body": [
   "You can manage Azure through several tools. They all send requests to the same place, Azure Resource Manager, so whatever you create with one tool can be viewed and managed with any other, and the same role-based access control (RBAC) permissions, policies and locks apply. The choice depends on the task, on whether you need to repeat it, and on which language you and your team are comfortable with. The AZ-900 exam expects you to know what each tool is, when it fits, and to recognize a command from each.",
   "The Azure portal is a web-based, unified console. You sign in from a browser and create, configure and monitor resources through menus, forms and panes, often called blades; build and share custom dashboards; and view costs, alerts and health. When you create a resource, the portal walks you through tabs such as Basics, Networking and Tags, with a final Review + create step that validates your choices. It is ideal for learning, exploring, one-off tasks and seeing things visually, and it has good accessibility features. It is less suited to repeating a task many times, because clicking through forms by hand is slow and easy to get slightly wrong each time. Microsoft also offers the Azure mobile app for monitoring resources, checking alerts and running quick actions from a phone.",
   "Azure Cloud Shell is a browser-based shell that you open from the Cloud Shell icon in the portal toolbar or directly in a browser. It gives you a choice of Bash or PowerShell, is already authenticated with your Azure account, and has the Azure CLI, Azure PowerShell, text editors, Git and other common tools preinstalled and kept up to date by Microsoft. There is nothing to install or update on your own computer. Cloud Shell can mount an Azure Files share to keep your scripts and files between sessions, or run as an ephemeral session without storage, in which case files are lost when the session ends. It suits administrators who work from different computers or from locked-down machines where they cannot install software.",
   "The Azure command-line interface (CLI) is a cross-platform command-line tool that runs on Windows, macOS and Linux. Its commands start with `az`, followed by a command group and an action, such as `az vm list` or `az group create`, with options written as `--name` or `--location`. It is popular with people who use Bash and for scripting, and it can format output as a table, JSON or plain text. Azure PowerShell is a set of modules, known as the Az module, that adds cmdlets for managing Azure to PowerShell. Cmdlets follow a Verb-Noun pattern with `Az` at the start of the noun, such as `Get-AzVM` or `New-AzResourceGroup`, with parameters written as `-Name` or `-Location`. It is popular with Windows administrators, although PowerShell also runs on macOS and Linux. The same tasks look like this in each tool:",
   "```bash\n# Azure CLI\naz login\naz group create --name rg-demo --location eastus\naz vm list --output table\n\n# Azure PowerShell\nConnect-AzAccount\nNew-AzResourceGroup -Name rg-demo -Location eastus\nGet-AzVM\n```",
   "Azure CLI and Azure PowerShell can do broadly the same things; the choice is mostly about the language and skills of your team. Both can be used interactively, typing one command at a time and seeing results immediately, or in scripts that automate a sequence of steps. Both are available inside Cloud Shell and can be installed locally. A script turns a task into something repeatable and reviewable: you can run it in five regions, share it with a colleague or keep it in source control. For repeatable deployments of whole environments you would go further to infrastructure as code with ARM templates or Bicep, covered in a later lesson. A useful rule of thumb: use the portal to learn and explore, then capture anything you will do more than once as a CLI or PowerShell script.",
   "Consider a worked example. A new administrator explores Azure by creating a storage account in the portal, which helps her see all the options. The next week she must create the same resource group, network and three VMs in each of five regions. Doing that by hand would take hours and invite typos, so she writes an Azure CLI script and runs it from Cloud Shell on a borrowed laptop where she cannot install anything. Her colleague, who has years of PowerShell experience, writes the equivalent with `New-AzVM` cmdlets. Both approaches produce the same resources because both go through Resource Manager, and either administrator can later open the portal to check the result.",
   "Common mistakes are worth naming. Cloud Shell is not a separate language; it is a hosted environment where you run Bash with the Azure CLI or PowerShell with the Az module. The Azure CLI does not run only on Linux, and PowerShell does not run only on Windows; both are cross-platform. The portal does not bypass Resource Manager or offer different permissions. And while the portal can help you get started with automation, scripting is the better fit when a task must be repeated consistently.",
   "Exam wording gives strong clues. A command starting with `az` is Azure CLI; a Verb-AzNoun cmdlet such as `Get-AzVM` is Azure PowerShell. 'Graphical interface' or 'dashboards' points to the portal. 'No local installation' or 'browser-based command line' points to Cloud Shell. 'Automate repetitive tasks' points to CLI or PowerShell scripts. 'Monitor from a phone' points to the Azure mobile app."
  ],
  "analogy": "Managing Azure is like ordering at a restaurant. The portal is sitting down with a menu and pointing at pictures, which is easy and visual but slow for a big order. The Azure CLI and Azure PowerShell are like phoning in a written order in two different languages; once written down, you can repeat the same order every week. Cloud Shell is a phone already in your hand at the table, dialed and ready, so you do not need your own. Every method reaches the same kitchen, Azure Resource Manager, and the same rules apply whichever way you order.",
  "terms": [
   [
    "Azure portal",
    "A web-based graphical console for creating, managing and monitoring Azure resources."
   ],
   [
    "Azure Cloud Shell",
    "A browser-based, pre-authenticated shell offering Bash or PowerShell with Azure tools preinstalled."
   ],
   [
    "Azure CLI",
    "A cross-platform command-line tool for Azure whose commands begin with az."
   ],
   [
    "Azure PowerShell",
    "The Az PowerShell module providing Verb-AzNoun cmdlets for managing Azure."
   ],
   [
    "Cmdlet",
    "A PowerShell command following a Verb-Noun pattern, such as Get-AzVM."
   ],
   [
    "Azure mobile app",
    "A phone app for monitoring Azure resources and running quick actions."
   ],
   [
    "Azure Resource Manager",
    "The management layer that every Azure tool sends its requests through."
   ]
  ],
  "example": "A consultant visits a client whose laptops block software installation. She needs to list all VMs and restart two of them. From the client's browser she opens Azure Cloud Shell, which is already signed in, chooses Bash and runs `az vm list --output table` followed by `az vm restart`. Nothing was installed locally, and her scripts saved in the Cloud Shell file share will be there next time.",
  "mistakes": [
   [
    "Cloud Shell is a third scripting language alongside CLI and PowerShell.",
    "Cloud Shell is a browser-hosted environment. Inside it you choose Bash, with the Azure CLI, or PowerShell, with the Az module."
   ],
   [
    "Azure CLI only runs on Linux and Azure PowerShell only on Windows.",
    "Both are cross-platform and run on Windows, macOS and Linux, as well as in Cloud Shell."
   ],
   [
    "Resources created in the portal can only be managed in the portal.",
    "Every tool goes through Azure Resource Manager, so a resource created in one tool can be managed with any other."
   ],
   [
    "Get-AzVM is an Azure CLI command.",
    "Verb-AzNoun cmdlets belong to Azure PowerShell. Azure CLI commands start with az, such as az vm list."
   ]
  ],
  "tryit": [
   [
    "Fairview Water District's administrator must create the same set of 20 storage accounts with identical settings every quarter for a reporting project. He is comfortable in Bash and works on a managed laptop where he can install software. Which tool should he use for the recurring job, and why not the portal?",
    "A script using the Azure CLI, which fits his Bash skills, run locally or from Cloud Shell. A script creates all 20 accounts consistently each quarter. The portal would require clicking through the same forms 20 times, which is slow and error-prone."
   ],
   [
    "An on-call engineer is at a family event when an alert arrives. She has only her phone and wants to check whether a VM is running and restart it if needed. Which tools could she use?",
    "The Azure mobile app, which supports monitoring resources and quick actions such as restarting a VM. Cloud Shell is also available from the mobile app or a browser if she needs to run commands."
   ]
  ],
  "tip": "Commands starting with az are Azure CLI; Verb-AzNoun cmdlets such as Get-AzVM are Azure PowerShell. Cloud Shell needs no local installation and supports both Bash and PowerShell. Every tool goes through Azure Resource Manager.",
  "check": [
   [
    "Which tool does the command New-AzResourceGroup belong to?",
    "Azure PowerShell, because it is a Verb-AzNoun cmdlet from the Az module."
   ],
   [
    "An administrator must manage Azure from a computer where she cannot install software. Which tool fits?",
    "Azure Cloud Shell, which runs in the browser with the CLI and PowerShell preinstalled."
   ],
   [
    "Can resources created in the portal be managed later with the Azure CLI?",
    "Yes. All tools go through Azure Resource Manager, so resources are the same regardless of the tool."
   ],
   [
    "Which shells can you choose in Azure Cloud Shell?",
    "Bash or PowerShell."
   ]
  ]
 },
 {
  "t": "Azure Arc for managing on-premises and multicloud resources",
  "hook": "Tomas is the security lead at Granite Valley Grocers, and the auditors want one report by the end of the month: every server, its patch level and whether a required security setting is applied. The trouble is where those servers live. Two hundred small Linux machines sit in store back rooms, a cluster of Windows servers runs in the company's own datacenter, a few Azure VMs host the website, and a Kubernetes cluster runs in another cloud provider that a previous team chose. Each place has its own console, its own scripts and its own blind spots. Moving everything into Azure is not an option this year. Is there a way to govern all of it from one place without moving any of it?",
  "simple": "Many companies keep computers in several places: their own server room, shops or factories, and more than one cloud provider. Managing each place with different tools is messy, and things get missed. Azure Arc lets you register those outside computers with Azure so they show up in the Azure portal next to your Azure resources. Then you can apply the same rules, security checks, monitoring and updates to all of them from one screen. The computers do not move; they stay exactly where they are. It is like adding all your family's devices to one parental-controls app, even though the devices are in different houses.",
  "body": [
   "Most organizations do not run everything in Azure. They have servers in their own datacenters, branch offices and edge locations such as factories or shops, and sometimes workloads in other public clouds. Managing each environment with separate tools makes it hard to apply consistent security, compliance and monitoring, and it leaves gaps nobody notices until an audit or an incident. Azure Arc extends Azure's management and governance to resources outside Azure, so you can use the same tools and rules everywhere.",
   "Azure Arc works by projecting non-Azure resources into Azure Resource Manager. For a server, you install the lightweight Azure Connected Machine agent, usually by generating an onboarding script in the portal under Azure Arc, then Machines, then Add, and running it on the server. For a Kubernetes cluster, you connect it with a command such as `az connectedk8s connect --name my-cluster --resource-group rg-arc`. The resource then appears in the Azure portal as an Azure resource with its own resource ID, placed in a subscription and resource group like any other. The workload itself keeps running exactly where it is; Arc does not migrate it, copy it or change where its data lives.",
   "The connection is light. The agent communicates outbound to Azure over HTTPS to report status and receive configuration, so you do not need to build a site-to-site virtual private network (VPN) just to use Arc, although your network must allow that outbound traffic. If the server loses connectivity for a while, it keeps running normally; it simply shows as disconnected in the portal until it reconnects.",
   "Once a resource is Arc-enabled, you can manage it with familiar Azure tools. You can organize it with resource groups and tags, control who can manage it with Azure role-based access control (RBAC), apply and audit Azure Policy (including machine configuration settings inside the operating system, formerly called guest configuration), monitor it with Azure Monitor, protect it with Microsoft Defender for Cloud, and keep it patched with Azure Update Manager. This gives you a single pane of glass across on-premises, edge and multicloud environments, with one inventory, one set of compliance reports and one permission model.",
   "Azure Arc can manage several resource types. Arc-enabled servers covers physical and virtual Windows and Linux servers running outside Azure, whether in your datacenter or in another cloud. Arc-enabled Kubernetes covers Kubernetes clusters hosted anywhere, and lets you deploy configurations to them from Git repositories, an approach often called GitOps. Arc-enabled SQL Server extends Azure management to SQL Server instances outside Azure, and Arc-enabled data services let you run some Azure data services, such as Azure SQL Managed Instance, on your own infrastructure. Arc can also connect virtualization platforms such as VMware vSphere and System Center Virtual Machine Manager (SCVMM) so their VMs can be managed and even created from Azure.",
   "Arc fits naturally with the cloud models from earlier lessons: it is Microsoft's answer to managing hybrid and multicloud environments consistently. It is important to separate it from services that move workloads. Azure Migrate discovers, assesses and moves servers into Azure; Azure Arc leaves them where they are and manages them. Azure Arc also differs from Azure Stack products, which bring Azure infrastructure and services to run on hardware in your own location, whereas Arc brings Azure's management plane to infrastructure you already have. Some organizations use both: Arc to govern servers today and Azure Migrate to move some of them later.",
   "Consider a worked example. A retail chain has two hundred Linux servers in its stores, a set of Windows servers in its own datacenter and a Kubernetes cluster in another cloud provider. Auditors want proof that all servers have a specific security setting and current patches. The team onboards the servers with the Connected Machine agent and connects the cluster with Arc-enabled Kubernetes. It then assigns an Azure Policy initiative to the resource group holding the Arc resources, views compliance in one dashboard, enables Defender for Cloud across all of them, and schedules updates with Azure Update Manager. None of the workloads moved, yet the auditors receive a single report.",
   "Common mistakes include thinking Azure Arc migrates servers into Azure, which is Azure Migrate's job; believing Arc resources must run on Azure hardware, when they run anywhere, including other clouds; assuming Arc works only for Windows, when it supports Windows and Linux servers and Kubernetes; and confusing Arc with a VPN or network connection. Arc is about management and governance, and the agent needs outbound connectivity to Azure, not a site-to-site network link.",
   "Exam questions usually include a location clue. 'Manage on-premises servers from the Azure portal', 'apply Azure Policy to servers in another cloud', 'single pane of glass for hybrid and multicloud' or 'govern Kubernetes clusters running anywhere' points to Azure Arc. If the scenario says 'move', 'migrate' or 'assess for migration', the answer is Azure Migrate instead. If it says 'run Azure services on hardware in our own datacenter', think of Azure Stack or Arc-enabled data services depending on the wording."
  ],
  "analogy": "Azure Arc is like a property management company that takes on houses you already own in different towns. The houses stay where they are, and nobody moves in or out, but now one office handles the locks, the inspections, the maintenance schedule and the rules for every property, using the same checklist. The management company does not build or relocate houses; that would be a construction or moving company, which is the role Azure Migrate plays when you actually want to move workloads into Azure.",
  "terms": [
   [
    "Azure Arc",
    "A service that extends Azure management and governance to resources running outside Azure."
   ],
   [
    "Arc-enabled servers",
    "Windows or Linux machines outside Azure that are projected into Azure Resource Manager for management."
   ],
   [
    "Connected Machine agent",
    "The lightweight agent installed on a server to connect it to Azure Arc."
   ],
   [
    "Arc-enabled Kubernetes",
    "Kubernetes clusters running anywhere that are connected to Azure for management and configuration."
   ],
   [
    "Hybrid cloud",
    "An environment that combines on-premises infrastructure with public cloud services."
   ],
   [
    "Multicloud",
    "Using services from more than one public cloud provider."
   ],
   [
    "Single pane of glass",
    "One console and toolset for managing resources across many environments."
   ]
  ],
  "example": "A bank must keep some servers on premises for regulatory reasons but wants the same security baseline as its Azure VMs. It onboards those servers to Azure Arc, assigns the same Azure Policy initiative used for Azure VMs, and enables Defender for Cloud. The security team now sees on-premises and Azure servers side by side in one compliance report, while the servers themselves never leave the bank's datacenter.",
  "mistakes": [
   [
    "Azure Arc migrates on-premises servers into Azure.",
    "Arc manages resources where they are. Moving servers into Azure is the job of Azure Migrate."
   ],
   [
    "Arc only works with resources on Azure hardware or in Microsoft datacenters.",
    "Arc-enabled resources can run anywhere: your datacenter, edge locations or another public cloud."
   ],
   [
    "Arc requires a site-to-site VPN or ExpressRoute connection.",
    "The Connected Machine agent needs outbound connectivity to Azure. Arc is a management service, not a network link."
   ],
   [
    "Arc supports only Windows servers.",
    "Arc supports Windows and Linux servers, Kubernetes clusters, SQL Server and some data services."
   ]
  ],
  "tryit": [
   [
    "Coastal Energy runs SCADA support servers in substations that must stay on site, plus Linux servers in another cloud provider. The CISO wants Microsoft Defender for Cloud and the same Azure Policy security baseline applied to all of them, and one compliance dashboard. Nothing may be relocated. What should the team use, and what is the first technical step for each server?",
    "Azure Arc. The first step is to install the Azure Connected Machine agent on each server, using an onboarding script generated in the portal, so the servers appear in Azure Resource Manager. The team can then assign the Policy initiative, enable Defender for Cloud and view compliance in one place."
   ],
   [
    "A manager reads that a project will 'bring the datacenter servers into Azure' and asks whether the team should start with Azure Arc or Azure Migrate. The goal is to shut down the datacenter by next year. Which service matches the goal?",
    "Azure Migrate, because the goal is to move the workloads into Azure and retire the datacenter. Azure Arc could govern the servers in the meantime, but it does not move them."
   ]
  ],
  "tip": "Arc manages resources where they are; it does not move them. If the scenario says 'apply Azure Policy to on-premises or other-cloud servers' or 'manage hybrid and multicloud from one place', the answer is Azure Arc. Moving workloads into Azure is Azure Migrate.",
  "check": [
   [
    "A company wants to use Azure Policy on servers running in another public cloud. Which service enables this?",
    "Azure Arc, which projects those servers into Azure Resource Manager so Azure Policy can apply."
   ],
   [
    "Does onboarding a server to Azure Arc migrate it into Azure?",
    "No. The server keeps running where it is; Arc only adds Azure management and governance."
   ],
   [
    "What must be installed on an on-premises server to connect it to Azure Arc?",
    "The Azure Connected Machine agent."
   ],
   [
    "Name two Azure services you can use on an Arc-enabled server.",
    "Any two of Azure Policy, RBAC, tags, Azure Monitor, Microsoft Defender for Cloud and Azure Update Manager."
   ]
  ]
 },
 {
  "t": "Azure Resource Manager and infrastructure as code with ARM templates and Bicep",
  "hook": "At Westbrook Insurance, the disaster recovery test was supposed to take an afternoon. Instead, Lin and two colleagues spent two full days rebuilding the claims system in a secondary region by hand, comparing portal screenshots against a wiki page nobody had updated in a year. At the end, the test environment still did not match production: a firewall rule was missing and a database was on the wrong tier. The chief technology officer asks a simple question in the review meeting: 'If this were a real outage, how would we know we rebuilt it correctly?' Lin knows the answer is not 'click more carefully'. What is it?",
  "simple": "Every request you make to Azure, whether you click a button or type a command, goes through one front desk called Azure Resource Manager. It checks who you are, whether you are allowed, and then passes the job to the right service. Infrastructure as code means writing down the setup you want in a file, like a recipe, instead of clicking through screens. Azure then reads the file and builds exactly what it describes. You can run the same file again and again and get the same result each time, and you can keep the file to show exactly what you built. ARM templates are these recipe files written in JSON; Bicep is a shorter, easier way to write the same thing.",
  "body": [
   "Azure Resource Manager (ARM) is the deployment and management service for Azure. Every request to create, update or delete a resource goes through Resource Manager, whether it comes from the portal, the Azure command-line interface (CLI), Azure PowerShell, the REST APIs or a software development kit (SDK). Resource Manager authenticates the caller with Microsoft Entra ID, checks authorization with role-based access control (RBAC), evaluates Azure Policy and resource locks, and then sends the request to the right Azure service, called a resource provider, such as `Microsoft.Compute` for virtual machines or `Microsoft.Storage` for storage accounts. Because all tools go through the same layer, you get consistent results and consistent features such as RBAC, tags, locks and policies no matter which tool you use.",
   "Resource Manager brings several benefits. You can manage your infrastructure through declarative templates rather than scripts. You can deploy, manage and monitor all the resources for a solution as a group, typically a resource group, rather than one by one. You can redeploy consistently throughout the development lifecycle, from development to test to production. Resource Manager handles dependencies, so resources are created in the right order, such as a virtual network before the virtual machine (VM) that uses it, and it deploys independent resources in parallel to save time. You can also apply tags and access control once to a whole group and see the combined cost of a solution.",
   "Infrastructure as code (IaC) means describing the infrastructure you need in code files, then using those files to create it. Instead of clicking through the portal, you keep definitions in source control such as Git, review changes like any other code, and deploy the same environment repeatedly with a pipeline. IaC reduces human error, documents exactly what exists, makes it easy to rebuild an environment after a disaster, and prevents configuration drift, where environments that should be identical slowly become different through untracked manual changes.",
   "Azure Resource Manager templates (ARM templates) are JavaScript Object Notation (JSON) files that define the resources to deploy. They are declarative: you state what you want to exist, not the steps to create it, and Resource Manager works out how to get there. This is different from an imperative script, which lists commands to run in order. Deployments are idempotent, meaning you can deploy the same template many times and get the same result; resources that already match the template are left alone rather than duplicated. Templates have sections for parameters (values supplied at deployment, such as the environment name), variables, resources and outputs, so one template can serve many environments, and larger solutions can be split into linked or nested templates. You deploy with a command such as `az deployment group create --resource-group rg-demo --template-file main.json`.",
   "Bicep is a domain-specific language from Microsoft for deploying Azure resources declaratively. It uses a simpler, more concise syntax than JSON, has better type checking and editor support, and supports modules for reuse. A Bicep file is transpiled into a standard ARM JSON template before deployment, so it can do everything ARM templates can, uses the same Resource Manager engine, and supports new Azure resource types and API versions straight away. You deploy it with the same command, pointing `--template-file` at `main.bicep`. For example, a storage account can be declared in a few lines:",
   "```bicep\nresource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: 'stdemo${uniqueString(resourceGroup().id)}'\n  location: resourceGroup().location\n  sku: { name: 'Standard_LRS' }\n  kind: 'StorageV2'\n}\n```",
   "Reading that snippet shows the declarative style. The first line names the resource type and API version. The properties say what the storage account should look like: a unique name, the same location as its resource group, the Standard LRS redundancy option and the StorageV2 kind. There are no instructions about checking whether it exists or what to do if it does; Resource Manager handles that, which is why redeploying is safe.",
   "Consider a worked example. A software company needs identical development, test and production environments, each with a virtual network, an App Service web app, a SQL database and a storage account. Instead of building each one by hand, the team writes one Bicep file with a parameter for the environment name and SKU sizes, stores it in Git, and deploys it from a pipeline. When production needs an extra storage container, the change is reviewed in a pull request and redeployed; because deployments are idempotent, only the new container is created. A missing firewall rule in test is fixed by redeploying the file.",
   "Common mistakes include thinking the portal bypasses Resource Manager, which it does not; confusing declarative templates with imperative scripts that list steps; believing Bicep deploys through a different engine, when it compiles to ARM JSON; and assuming redeploying a template duplicates resources, which idempotency prevents.",
   "Exam questions use a few recurring phrases. 'Deployment and management service for Azure' or 'consistent management layer' points to Azure Resource Manager. 'Deploy the same environment repeatedly and consistently' or 'define infrastructure in code' points to infrastructure as code. 'JSON file that defines resources declaratively' points to an ARM template. 'Simpler syntax that compiles to ARM templates' points to Bicep. 'Describe the desired end state, not the steps' means declarative, and 'same result every time you deploy' means idempotent."
  ],
  "analogy": "Infrastructure as code is like giving a builder an architect's blueprint instead of standing beside them giving directions. A blueprint describes the finished house, not each hammer stroke, which is the declarative idea. Hand the same blueprint to the builder twice and you do not get two houses; the builder checks what is already built and finishes only what is missing, which is idempotency. Resource Manager is the general contractor every request passes through. ARM templates and Bicep are the same blueprint drawn in two notations, one verbose and one concise.",
  "terms": [
   [
    "Azure Resource Manager (ARM)",
    "The deployment and management layer that processes every request to create, change or delete Azure resources."
   ],
   [
    "Resource provider",
    "An Azure service, such as Microsoft.Compute, that supplies a type of resource through Resource Manager."
   ],
   [
    "Infrastructure as code (IaC)",
    "Defining and deploying infrastructure from code files kept in source control."
   ],
   [
    "ARM template",
    "A JSON file that declaratively defines Azure resources to deploy."
   ],
   [
    "Bicep",
    "A concise Microsoft language for declarative Azure deployments that transpiles to ARM JSON."
   ],
   [
    "Declarative",
    "Describing the desired end state and letting the platform work out the steps."
   ],
   [
    "Idempotent",
    "Producing the same result no matter how many times a deployment is run."
   ],
   [
    "Configuration drift",
    "Environments that should match gradually becoming different through manual changes."
   ]
  ],
  "example": "After a disaster-recovery test, a company discovers its secondary region took two days to rebuild by hand, and several settings were missed. The team rewrites the environment as Bicep modules stored in Git. In the next test, a single pipeline run deploys the full environment to the secondary region in under an hour, identical to production, and the files double as accurate documentation of what exists.",
  "mistakes": [
   [
    "The portal sends requests directly to services and bypasses Resource Manager.",
    "Every tool, including the portal, goes through Azure Resource Manager, which is why RBAC, Policy and locks apply consistently."
   ],
   [
    "Redeploying an ARM template creates duplicate resources.",
    "Deployments are idempotent. Resources that already match are left alone, and only differences are applied."
   ],
   [
    "Bicep uses a separate deployment engine from ARM templates.",
    "Bicep is transpiled into ARM JSON and deployed by the same Resource Manager engine."
   ],
   [
    "A declarative template is a list of steps, like a script.",
    "Declarative means describing the desired end state. Listing steps in order is the imperative style used by scripts."
   ]
  ],
  "tryit": [
   [
    "Maple Grove Schools needs identical Azure environments for each of its four regional campuses, and auditors want a record of every infrastructure change. Today, an administrator builds each campus by hand in the portal, and the campuses have slowly drifted apart. What approach should the team adopt, and which features of it address the auditors and the drift?",
    "Adopt infrastructure as code with a parameterized Bicep file or ARM template kept in Git. Source control and pull requests give auditors a reviewable history of every change, and redeploying the same declarative, idempotent file to each campus brings them back into line and keeps them consistent."
   ],
   [
    "A developer worries that running the team's Bicep deployment a second time, after adding one new storage container, will create a second copy of the whole environment. Is the worry justified?",
    "No. Deployments are idempotent and declarative. Resource Manager compares the desired state with what exists, leaves matching resources alone and creates only the new container."
   ]
  ],
  "tip": "Every tool, including the portal, goes through Azure Resource Manager. ARM templates are JSON and declarative; Bicep is a simpler language that compiles to ARM JSON. Declarative means you describe the end state; idempotent means redeploying gives the same result.",
  "check": [
   [
    "Which service processes a VM creation request made in the Azure portal?",
    "Azure Resource Manager, which handles every create, update and delete request regardless of the tool."
   ],
   [
    "What does it mean that ARM template deployments are idempotent?",
    "Deploying the same template repeatedly produces the same result without duplicating resources."
   ],
   [
    "How does Bicep relate to ARM templates?",
    "Bicep is a simpler language that is transpiled into ARM JSON templates before deployment."
   ],
   [
    "What is the main benefit of infrastructure as code?",
    "Consistent, repeatable, reviewable deployments that reduce human error and configuration drift."
   ]
  ]
 },
 {
  "t": "Azure Advisor recommendations and Azure Service Health (Azure status, Service Health, Resource Health)",
  "hook": "At 7:40 on a Monday morning, the phones at Pinewood Dental Partners start ringing. Patients cannot book appointments online, and the front desk staff cannot open the scheduling app. Jordan, the clinic group's only cloud administrator, opens the public Azure status page on his phone and sees a wall of green. So is it Azure, or is it something his own team changed over the weekend? His manager wants an answer in ten minutes, and the vendor that built the app wants proof before it looks at its code. Later, once things are calm, the finance office will ask why the bill keeps creeping up. Where should Jordan look for each answer?",
  "simple": "Azure gives you two kinds of helpers once your systems are running. Azure Advisor is like a mechanic who looks over your car and hands you a list of suggestions: this tire is wearing thin, you are paying for a bigger engine than you need, this lock is not very safe. It suggests; it does not fix anything on its own. Azure Service Health is like the traffic and road-works report. It tells you whether the road itself, meaning Azure, is having problems. It comes in three sizes: a public page for big problems everywhere, a personal view for the parts of Azure you use, and a check on one single item, such as one server. Together they tell you whether a problem is yours or Azure's.",
  "body": [
   "Once your workloads are running in Azure, two questions come up again and again. The first is 'How could we run this better?' and the second is 'Is Azure itself causing our problem?' Azure provides separate tools for each. Azure Advisor answers the first with personalized recommendations for improving your own resources. Azure Service Health answers the second by telling you about Azure platform issues, from worldwide outages down to the health of a single virtual machine (VM). The AZ-900 exam expects you to know which tool gives which kind of information, and to pick the right one from a short scenario.",
   "Azure Advisor evaluates your deployed resources, their configuration and their usage, and makes personalized recommendations based on Microsoft best practices. Recommendations are grouped into five categories, which line up with the pillars of the Azure Well-Architected Framework. Reliability recommendations help ensure business continuity, for example adding redundancy, using availability zones or enabling backup. Security recommendations, which come from Microsoft Defender for Cloud, help you find threats and vulnerabilities, such as a VM with a management port open to the internet. Performance recommendations help improve speed and responsiveness. Operational excellence recommendations help with process efficiency, resource management and deployment best practices, such as creating Service Health alerts. Cost recommendations help reduce spending, for example by right-sizing or shutting down underused VMs, deleting idle resources such as unattached disks, or buying reservations for steady workloads.",
   "Working with Advisor is straightforward. You open it in the portal by searching for Advisor, or from the command line with `az advisor recommendation list --category Cost --output table`. Each recommendation shows the affected resources, the expected impact (high, medium or low) and the action to take, often with a quick-fix button that applies the change for you once you choose to. Advisor also gives an overall Advisor score, a percentage showing how closely your resources follow its recommendations, broken down by category. You can postpone or dismiss recommendations that do not apply, configure alerts when new recommendations appear, and download reports to share with your team. Advisor itself is free, and it never changes your resources unless you decide to act.",
   "Azure Service Health keeps you informed about the health of Azure services and your own resources. It is made of three views that move from broad to specific, and the exam often tests exactly where one ends and the next begins. Azure status is a public web page that shows service outages across all Azure regions worldwide. Anyone can see it without signing in, and it is a global view, not personalized to you. It lists only widespread incidents, so a green page does not prove that nothing is affecting you.",
   "Service Health, the second view, lives in the Azure portal and focuses on the Azure services and regions you actually use. It reports four kinds of events: service issues, which are active problems happening now; planned maintenance, such as host updates that may restart VMs; health advisories, such as a feature being retired or an action you must take before a deadline; and security advisories. You can create Service Health alerts that use an action group to notify you by email, text message (SMS), push notification or webhook, filtered to the subscriptions, services, regions and event types you care about. Service Health also keeps a history of past incidents, including post-incident reviews that explain root cause, which helps when you report to management.",
   "Resource Health, the third view, is the narrowest. It shows the current and past health of your individual resources, such as a specific VM, web app or database, with statuses such as Available, Unavailable, Degraded or Unknown. Crucially, it tells you whether a problem was caused by an Azure platform event or by something user-initiated, such as a VM that you or a colleague stopped. You find it on the Resource health page of the resource itself, or within Service Health. That history is valuable when you open a support case or need to show whether a service-level agreement (SLA) commitment was missed.",
   "Consider a worked example. Users report that an order-processing app is slow in one region. The engineer first checks the public Azure status page and sees nothing, which only means there is no widespread outage. In the portal, Service Health shows an active service issue affecting storage in that region for a subset of customers, including theirs. Resource Health for the app's VM shows Degraded because of a platform event, confirming the cause is not their own change. After the incident, the engineer reviews Advisor, which recommends zone-redundant storage and a second VM in another availability zone to improve reliability, and suggests right-sizing two idle VMs to save cost. The engineer also creates a Service Health alert so the team hears about the next issue before users do.",
   "Several mistakes come up often. People expect the Azure status page to show issues that affect only a few customers, when it shows only widespread incidents; Service Health is the personalized view. People confuse Advisor, which recommends improvements, with Service Health, which reports Azure incidents. People think Resource Health covers all services in a region, when it covers individual resources. And people assume Advisor changes resources automatically, when you always choose whether to act. It also helps to place these tools next to Azure Monitor: Advisor tells you how to improve, Service Health tells you whether Azure is affecting you, and Monitor collects detailed metrics and logs from your own resources.",
   "Exam questions separate these tools with a few clue words. 'Recommendations', 'best practices', 'reduce cost', 'improve reliability' or 'five categories' points to Azure Advisor. 'Global view of all Azure regions' or 'public page, no sign-in' points to Azure status. 'Planned maintenance', 'outages affecting the services and regions you use', 'health advisories' or 'set up alerts for Azure incidents' points to Service Health. 'Why is my specific VM unavailable' or 'was it a platform problem or something we did' points to Resource Health."
  ],
  "analogy": "Think of driving to work. Azure Advisor is your mechanic's inspection report: it suggests new tires, a smaller engine to save fuel and a better lock, but it does not touch the car unless you say yes. Service Health is the traffic report, with three zoom levels: the national news (Azure status), the report for the roads you actually drive (Service Health), and the warning light on your own dashboard (Resource Health). The analogy stops at one point: a dashboard light rarely says who caused the fault, but Resource Health tells you whether it was a platform event or a user action.",
  "mnemonic": "Advisor's five categories spell CROPS: Cost, Reliability, Operational excellence, Performance, Security. Advisor helps your resources grow healthy crops.",
  "terms": [
   [
    "Azure Advisor",
    "A free service that gives personalized best-practice recommendations for your Azure resources."
   ],
   [
    "Advisor categories",
    "Reliability, security, performance, operational excellence and cost, aligned with the Azure Well-Architected Framework."
   ],
   [
    "Advisor score",
    "A percentage showing how well your resources follow Advisor's recommendations, overall and by category."
   ],
   [
    "Azure status",
    "A public page, viewable without signing in, showing widespread Azure outages across all regions."
   ],
   [
    "Service Health",
    "A personalized portal view of service issues, planned maintenance and health and security advisories for the services and regions you use."
   ],
   [
    "Resource Health",
    "A view of the current and past health of an individual resource, including whether a platform event or a user action caused a problem."
   ],
   [
    "Health advisory",
    "A Service Health notice about changes that may require action, such as a feature retirement."
   ],
   [
    "Service Health alert",
    "An alert rule that notifies you through an action group when a Service Health event affects your subscriptions."
   ]
  ],
  "example": "An operations team receives a Service Health alert that planned maintenance will restart hosts in one region next week. They review which of their VMs are affected, schedule a maintenance window with the business, and confirm afterwards in Resource Health that each VM returned to Available. Separately, the monthly Advisor review finds three unattached disks and an oversized database, and acting on those cost recommendations trims their bill.",
  "mistakes": [
   [
    "A green Azure status page proves Azure is not affecting my resources.",
    "Azure status shows only widespread incidents and is not personalized. Check Service Health for issues in the services and regions you use, and Resource Health for a specific resource."
   ],
   [
    "Azure Advisor automatically fixes the problems it finds.",
    "Advisor only recommends. You decide whether to act, sometimes using a quick-fix button, and you can postpone or dismiss recommendations."
   ],
   [
    "Service Health and Advisor do the same job.",
    "Advisor suggests improvements to your own resources. Service Health reports Azure platform incidents, maintenance and advisories that affect you."
   ],
   [
    "Resource Health shows the status of every service in a region.",
    "Resource Health covers individual resources, such as one VM or database. Regional service issues appear in Service Health."
   ]
  ],
  "tryit": [
   [
    "Birchwood Library's catalog web app stops responding at 9 a.m. The administrator checks the public Azure status page and everything looks normal. She needs to tell her director, within minutes, whether the outage is Azure's fault or caused by last night's configuration change. Which view should she open next, and what would it tell her?",
    "Resource Health for the web app, and Service Health for the region. Resource Health shows whether the app is Unavailable or Degraded and whether a platform event or a user-initiated action caused it, which answers the director's question directly. Service Health would show any active issue in the services and region the library uses, even if it is too small for the public status page."
   ],
   [
    "A company's leadership asks for a quarterly list of ways to cut Azure spending and improve resilience, with an easy way to track progress over time. Nobody wants a new paid tool. What should the cloud team use?",
    "Azure Advisor. Its cost and reliability recommendations list concrete actions, such as right-sizing VMs or adding redundancy, and the Advisor score tracks progress over time. Advisor is free and includes downloadable reports for leadership."
   ]
  ],
  "tip": "Recommendations to improve your resources: Advisor (five categories, CROPS). Global outage page for everyone: Azure status. Outages, maintenance and advisories affecting your services and regions: Service Health. Health of one specific resource, and whether the platform caused a problem: Resource Health.",
  "check": [
   [
    "Which tool gives recommendations in five categories, including cost and reliability?",
    "Azure Advisor."
   ],
   [
    "A company wants an email when Azure schedules maintenance in the regions it uses. Which tool should it configure?",
    "Service Health, with a Service Health alert and an action group."
   ],
   [
    "A single VM became unavailable. Which view shows whether a platform event caused it?",
    "Resource Health, which reports the health of individual resources and the cause of problems."
   ],
   [
    "Why might the Azure status page show nothing during an issue affecting your resources?",
    "It lists only widespread incidents and is not personalized; Service Health shows issues affecting your specific services and regions."
   ],
   [
    "Does Azure Advisor change your resources on its own?",
    "No. It makes recommendations, and you choose whether to act on them."
   ]
  ]
 },
 {
  "t": "Azure Monitor: metrics, Log Analytics, alerts and Application Insights",
  "hook": "It is 2:10 a.m., and Sam, on call for Lantern Books' online store, is woken by a customer email forwarded from the support inbox: 'Checkout has been spinning for twenty minutes.' Sam opens a laptop. The servers are running. Nobody deployed anything tonight. Azure's own health pages show no incidents. Somewhere between the web front end, the database and a payment service run by another company, something is slow, and every minute of a stalled checkout is a lost order. Sam wonders why a customer noticed before any system did. What should have told the team first, and where can Sam look to find the slow piece right now?",
  "simple": "Azure Monitor is the set of gauges, record books and alarms for the systems you run. Some data is just numbers checked every minute or so, like a car's speedometer and fuel gauge; these are called metrics. Other data is a detailed diary of events, like a ship's log that says what happened and when; these are called logs, and you search them by typing questions in a special query language. Alerts are the alarms: you say 'tell me if the engine gets too hot', and Azure sends a text or email, or even starts a fix, when it happens. Application Insights watches your website or app from the inside, like a coach timing every step a runner takes, so you can see which step is slow or failing.",
  "body": [
   "Azure Monitor is the platform for collecting, analyzing and acting on monitoring data, often called telemetry, from your Azure resources, on-premises machines and other clouds. It gathers data from applications, operating systems, Azure resources, subscriptions and your Microsoft Entra tenant, so you can see how your systems are performing, spot problems early and respond automatically. It is the tool for watching your own workloads, as opposed to Service Health, which reports problems with Azure itself. On the AZ-900 exam you need to recognize its main parts: metrics, logs and Log Analytics, alerts with action groups, and Application Insights.",
   "Azure Monitor works with two main kinds of data, and telling them apart is the first exam skill. Metrics are numeric values collected at regular intervals, such as CPU percentage, available memory, disk operations or requests per second. They are lightweight and near real-time, which makes them ideal for charts and fast alerts. Many Azure resources send platform metrics automatically with no setup at all, and you explore them in Metrics explorer, where you pick a resource, a metric and an aggregation such as average or maximum, then pin the chart to a dashboard.",
   "Logs are records of events and data with rich properties. Examples include application traces, performance counters, Windows event logs, security events and the activity log, which records management operations in your subscription, showing who created, changed or deleted a resource and when. Log data is stored in a Log Analytics workspace. To collect data from inside a virtual machine's (VM's) operating system, you install the Azure Monitor Agent and define data collection rules that say what to collect and where to send it. Most Azure resources can also send their detailed resource logs to a workspace when you add a diagnostic setting. Because logs carry many fields, they answer questions that a single number cannot, such as which user, which computer or which error code.",
   "Log Analytics is the tool in the Azure portal for writing and running log queries against that data using Kusto Query Language (KQL). A query starts with a table name and pipes the results through operators that filter, summarize and sort. With a few lines you can count failed sign-ins per hour, find which VMs logged the most errors, or show when each machine last reported in. Queries can be saved, pinned to dashboards, used in workbooks, which are interactive reports, or used as the basis for alerts. A simple query that shows when each connected computer last sent a heartbeat looks like this:",
   "```kusto\nHeartbeat\n| where TimeGenerated > ago(1h)\n| summarize LastSeen = max(TimeGenerated) by Computer\n```",
   "Reading that query from top to bottom shows the pattern. `Heartbeat` is the table of regular check-ins from monitored machines. The `where` line keeps only the last hour of records. The `summarize` line groups the rows by computer and keeps the most recent time for each one. A machine missing from the result, or with an old LastSeen value, has stopped reporting and deserves a look.",
   "Azure Monitor alerts notify you proactively when something in your monitoring data needs attention, so a customer is not the first to notice. An alert rule defines the scope (which resources to watch), the condition (a metric threshold such as CPU above 80% for ten minutes, the result of a log query, or an activity log event such as a resource being deleted) and the severity. When the condition is met, the alert fires and runs one or more action groups. An action group can send email, text message (SMS), voice or push notifications, call a webhook, open an IT service management ticket, or start automation such as an Azure Function, a Logic App or an Azure Automation runbook. Action groups are reusable, and the same groups are used by Service Health alerts and Cost Management budget alerts.",
   "Application Insights is a feature of Azure Monitor for application performance monitoring (APM). It monitors live web applications, whether they run in Azure, on premises or in another cloud, once you add its software development kit (SDK) to the code or turn on auto-instrumentation for supported services. It tracks request rates, response times and failure rates; dependency calls to databases and external APIs; exceptions with stack traces; and page views and user sessions. It draws an application map showing how components connect and where failures cluster, and it can run availability tests that check your site at regular intervals from several locations around the world. It reveals problems inside the code and its dependencies, which infrastructure metrics alone would not show.",
   "Consider a worked example. An online store's checkout page slows every evening. Metrics show the web server's CPU is fine, so the problem is not capacity. Application Insights reveals that the slow requests all call one payment API dependency that takes several seconds to respond. The team adds a metric alert on server response time and a log alert using a KQL query that counts failed payments, both sending to an action group that pages the on-call engineer and posts to the team's ticketing system.",
   "Common mistakes and exam clues go together. Do not confuse metrics, which are numbers sampled over time, with logs, which are detailed records queried with KQL. Azure Monitor is not limited to Azure resources; it can monitor on-premises and other-cloud machines, for example through Azure Arc. Service Health is not for troubleshooting your own app's errors; that is Azure Monitor and Application Insights. And an alert rule needs an action group to notify anyone or run automation. On the exam, 'numeric values at regular intervals' or 'near real-time' points to metrics; 'query logs', 'KQL' or 'workspace' points to Log Analytics; 'notify when CPU exceeds a threshold' points to alerts; 'send SMS or trigger automation' points to action groups; 'monitor a web app's performance, exceptions or dependencies' or 'APM' points to Application Insights; and 'who deleted a resource' points to the activity log."
  ],
  "analogy": "Azure Monitor is like the instrument panel and black box of an airplane. Metrics are the dials, such as speed and fuel, updated constantly and easy to glance at. Logs are the flight recorder, full of detail you search after the fact, and Log Analytics with KQL is how you ask it questions. Alerts are the cockpit warning lights and the crew members they summon, which is the action group. Application Insights is a separate camera on the passengers' journey, from boarding to landing. The analogy stops in one place: Azure Monitor can also start automation to fix a problem, not just warn about it.",
  "terms": [
   [
    "Azure Monitor",
    "The platform for collecting, analyzing and acting on telemetry from Azure, on-premises and other clouds."
   ],
   [
    "Metrics",
    "Numeric values sampled at regular intervals, ideal for near real-time charts and fast alerts."
   ],
   [
    "Logs",
    "Detailed event records with rich properties, stored in a Log Analytics workspace."
   ],
   [
    "Log Analytics",
    "The portal tool for querying log data with Kusto Query Language (KQL)."
   ],
   [
    "Log Analytics workspace",
    "The storage location where Azure Monitor collects log data for querying."
   ],
   [
    "Alert rule",
    "A definition of the scope, condition and severity that triggers an alert."
   ],
   [
    "Action group",
    "A reusable set of notifications and automated actions run when an alert fires."
   ],
   [
    "Application Insights",
    "An Azure Monitor feature for application performance monitoring of live web apps."
   ],
   [
    "Activity log",
    "A subscription-level log of management operations, showing who did what and when."
   ]
  ],
  "example": "A logistics company's VMs occasionally run out of disk space overnight, crashing a nightly job. The team installs the Azure Monitor Agent, uses a data collection rule to send performance counters to a Log Analytics workspace, and creates a log alert with a KQL query that fires when free disk space drops below 10%. The alert's action group emails the operations team and starts a runbook that clears temporary files, so the job now finishes reliably.",
  "mistakes": [
   [
    "Metrics and logs are the same data shown in different screens.",
    "Metrics are lightweight numbers sampled over time, best for charts and fast alerts. Logs are detailed records with many fields, stored in a workspace and queried with KQL."
   ],
   [
    "Azure Monitor can only watch resources that run in Azure.",
    "It can also collect data from on-premises and other-cloud machines, for example through the Azure Monitor Agent on Arc-enabled servers, and Application Insights can monitor apps hosted anywhere."
   ],
   [
    "Service Health is the place to troubleshoot my application's errors.",
    "Service Health reports Azure platform issues. Errors in your own app and its dependencies are found with Azure Monitor and Application Insights."
   ],
   [
    "Creating an alert rule is enough for someone to be notified.",
    "The alert rule needs an action group that defines who is notified and what automation runs."
   ]
  ],
  "tryit": [
   [
    "Ferris Wheel Tickets, a small events company, learns about website errors only when customers complain. The developers want to see which pages throw exceptions, how long calls to their database take, and to be told if the home page stops responding from different parts of the country. Which Azure Monitor feature fits, and which of its capabilities cover each need?",
    "Application Insights. Exception tracking shows which pages throw errors and their stack traces, dependency tracking shows how long database calls take, and availability tests check the home page at regular intervals from several locations, which can feed an alert so the team hears before customers do."
   ],
   [
    "An auditor asks a cloud administrator who deleted a production storage account last Tuesday, and the security team wants to be paged if it ever happens again. Where should the administrator look, and what should she set up?",
    "She should look in the activity log, which records management operations with the caller and time. To be paged next time, she creates an alert rule on the activity log event for deleting a storage account, with an action group that sends SMS or push notifications to the security team."
   ]
  ],
  "tip": "Metrics are numbers over time; logs are detailed records queried with KQL in Log Analytics. Application Insights monitors applications (requests, exceptions, dependencies), not just infrastructure. Alerts use action groups to notify or automate. Azure Monitor watches your workloads; Service Health watches Azure.",
  "check": [
   [
    "Which Azure Monitor data type suits a near real-time alert on CPU percentage?",
    "Metrics, which are lightweight numeric values collected at regular intervals."
   ],
   [
    "Which language do you use to query data in Log Analytics?",
    "Kusto Query Language (KQL)."
   ],
   [
    "A developer needs to see which dependency makes a web app's requests slow. Which feature helps?",
    "Application Insights, which tracks requests, dependencies and exceptions."
   ],
   [
    "What does an action group do?",
    "It defines who is notified and what automation runs, such as email, SMS, webhook or a Logic App, when an alert fires."
   ],
   [
    "Where would you find who deleted a resource in your subscription?",
    "The activity log, which records management operations, the caller and the time."
   ]
  ]
 }
], {"reviewed":"2026-10-06"});
