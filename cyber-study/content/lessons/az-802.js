/* Lessons for Microsoft Certified: Windows Server Administrator Associate (exam AZ-802: Administering Windows Server) (AZ-802): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("az-802", [
 {
  "t": "Deploying domain controllers: Install-ADDSForest / Install-ADDSDomainController, install from media (IFM), read-only DCs, DCs on Azure VMs (static private IP on the NIC, NTDS on a data disk with host caching off)",
  "hook": "It is Monday morning at Harbor Credit Union, and Priya, the only systems administrator, has three requests on her desk. The new branch in a coastal town has a link so slow that a full directory replication would take most of a day. The branch manager wants a domain controller in the back office, but the server will sit in an unlocked closet next to the mop bucket. And the CIO wants a domain controller in Azure by Friday so cloud workloads stop authenticating across the VPN. Each request sounds like the same job: build a domain controller. Each one goes wrong in a different way if Priya treats them the same. Which tool, which DC type and which Azure settings does each situation need?",
  "simple": "A domain controller is the server that checks everyone's username and password on a Windows network and keeps the master list of users and computers. Setting one up has two steps: install the software, then promote the server, which means telling it to start a new directory or join an existing one. Sometimes you copy the directory onto a USB drive first so the new server does not have to download it all over a slow connection. In risky places you can use a read-only version that cannot be changed locally and remembers only a few people's passwords. Think of a bank: the head office keeps the full ledger, while a small kiosk keeps a read-only copy and only the details of its regular customers.",
  "body": [
   "A domain controller (DC) is a Windows Server that holds a writable or read-only copy of the Active Directory Domain Services (AD DS) database, authenticates users and computers with Kerberos, and replicates changes with other DCs. Almost everything else in a Windows environment depends on DCs being healthy, so how you deploy them matters. Group Policy, file share permissions, service accounts and even many line-of-business apps quietly assume a DC is reachable and correct.",
   "Deployment is always a two-step process. First you install the role binaries with `Install-WindowsFeature AD-Domain-Services -IncludeManagementTools`. That only copies files and adds the management tools; the server is not yet a DC. Second, you promote the server, which creates or joins a domain, builds the database, sets up SYSVOL and registers DNS records. In Server Manager you see this as the yellow notification flag offering Promote this server to a domain controller after the role installs.",
   "Promotion uses one of three PowerShell cmdlets from the ADDSDeployment module. `Install-ADDSForest` creates a brand-new forest and its first (root) domain; you supply `-DomainName`, `-DomainNetbiosName`, forest and domain modes, and a Directory Services Restore Mode (DSRM) password. `Install-ADDSDomainController` adds another DC to an existing domain, which is how you get redundancy, and it is the cmdlet you will run most often in real life. `Install-ADDSDomain` creates a new child or tree domain in an existing forest. Each cmdlet has a `Test-` twin (for example `Test-ADDSDomainControllerInstallation`) that runs the prerequisite checks without changing anything, and Server Manager's wizard can export the exact PowerShell it would run, which is a good way to learn the parameters.",
   "Install from media (IFM) solves a bandwidth problem. A new DC normally pulls the whole database over the network during its first replication, which can saturate a slow wide area network (WAN) link for hours. With IFM you run `ntdsutil` on an existing DC (`activate instance ntds`, `ifm`, `create sysvol full C:\\IFM`) to produce a copy of the database and SYSVOL, carry it to the remote site, and promote with `-InstallationMediaPath`. Only changes made since the media was created then replicate across the WAN. Media from a writable DC can build a writable DC or a read-only DC; media created as RODC media can only build an RODC. Treat IFM media as highly sensitive, because it contains password hashes for every account in the domain; encrypt the drive and destroy the copy after use.",
   "A read-only domain controller (RODC) is designed for branch offices with weak physical security. It holds a read-only copy of the directory, so nobody can make changes on it that replicate back to the rest of the domain. It does not cache passwords by default, and it only caches credentials for accounts you allow in its Password Replication Policy, which is built from the Allowed RODC Password Replication Group, the Denied RODC Password Replication Group and per-RODC lists. If the server is stolen, you reset only the passwords that were cached on it, and the RODC properties page can show you exactly which accounts those are.",
   "RODCs also support administrator role separation. You can delegate local administration of an RODC, such as installing drivers or updates, to a branch technician without making them a Domain Admin. Before you can add the first RODC, the forest must have a writable DC running a supported operating system, and historically you needed `adprep /rodcprep`; modern promotion runs the required preparation automatically. On the exam, an unsecured branch plus a need to limit which passwords are stored almost always points to an RODC.",
   "Running DCs as Azure virtual machines extends your domain into the cloud, but Azure has specific rules. Give the VM a static private IP address on its network interface (NIC) in Azure, not inside the guest operating system. The guest keeps using DHCP, and Azure always hands it the same address. Setting a static IP inside Windows can cut the VM off from the Azure fabric. Then point the virtual network's DNS servers at your DCs so other VMs can find the domain.",
   "Disk layout is the other Azure rule. Put the AD database (NTDS.dit), logs and SYSVOL on a separate managed data disk with host caching set to None. The OS disk uses write caching by default, which can let AD believe data is safely written when it is not, and that risks database corruption after an unexpected restart. Finally, spread DCs across availability zones or an availability set so one hardware failure does not take out every DC, and define an AD site and subnet for the Azure virtual network so clients and replication behave sensibly.",
   "Here is what a typical additional DC promotion looks like, with the database and SYSVOL placed on a data disk mounted as F:.",
   "```powershell\nInstall-WindowsFeature AD-Domain-Services -IncludeManagementTools\nInstall-ADDSDomainController -DomainName corp.contoso.com -InstallDns `\n  -DatabasePath F:\\NTDS -LogPath F:\\NTDS -SysvolPath F:\\SYSVOL `\n  -Credential (Get-Credential)\n```"
  ],
  "analogy": "Think of the directory as a bank's master ledger. A writable DC is a full branch that can both read and update the ledger. An RODC is a self-service kiosk in a shopping mall: it can look things up and serve its regular local customers, but it cannot change the ledger, and if someone carries it away they get only the handful of customer details it held. IFM is like mailing a printed copy of the ledger to a new branch so it only needs to phone in today's changes. The analogy stops at authentication: an RODC can still forward a logon for an uncached user to a writable DC over the WAN.",
  "terms": [
   [
    "DSRM",
    "Directory Services Restore Mode: a special boot mode for offline AD maintenance, protected by a local password set during promotion."
   ],
   [
    "IFM",
    "Install from media: promoting a DC from an ntdsutil-created copy of the database so initial replication does not cross the WAN."
   ],
   [
    "RODC",
    "Read-only domain controller: holds a read-only directory copy and caches only passwords allowed by its Password Replication Policy."
   ],
   [
    "Password Replication Policy",
    "The allow and deny lists that decide which accounts' credentials an RODC may cache."
   ],
   [
    "Host caching",
    "An Azure disk setting (None, ReadOnly, ReadWrite); DC data disks holding NTDS should use None."
   ],
   [
    "Install-ADDSDomainController",
    "The ADDSDeployment cmdlet that promotes a server as an additional DC in an existing domain."
   ]
  ],
  "example": "A retailer adds a DC at a store with a slow link. The admin runs ntdsutil IFM on a hub DC, ships the encrypted media on a USB drive, and promotes an RODC with -InstallationMediaPath. Only a few megabytes of recent changes replicate, and only the store staff's passwords are cached locally.",
  "mistakes": [
   [
    "Setting a static IP address inside Windows on an Azure DC.",
    "In Azure the address is made static on the NIC resource. The guest stays on DHCP and always receives that reserved address; a manual guest setting can break connectivity."
   ],
   [
    "Keeping NTDS.dit on the OS disk of an Azure VM because it is simpler.",
    "The OS disk uses write caching, which can corrupt AD after an unexpected restart. Use a separate data disk with host caching set to None."
   ],
   [
    "Believing an RODC caches every user's password so branch logons work offline.",
    "By default an RODC caches no passwords. Only accounts allowed by the Password Replication Policy are cached, which limits exposure if the server is stolen."
   ],
   [
    "Thinking Install-WindowsFeature alone makes a server a DC.",
    "It installs only the role binaries. You must still promote with Install-ADDSForest, Install-ADDSDomainController or Install-ADDSDomain."
   ]
  ],
  "tryit": [
   [
    "Fernhill Logistics is opening a warehouse office connected by a slow, often congested link. The server will sit in a shared storage room, and only the twelve warehouse staff should be able to log on if the link fails. Leadership wants to avoid saturating the link during setup. What do you deploy and how?",
    "Deploy an RODC promoted from IFM media. Create the media on a writable hub DC with ntdsutil, transport it encrypted, and promote with -InstallationMediaPath so only recent changes cross the link. Add the twelve staff (ideally a group containing them) to the RODC's allowed password replication list so their credentials can be cached and the rest of the domain stays off the box."
   ]
  ],
  "tip": "For Azure DCs, the static IP is set on the Azure NIC, not in the guest, and NTDS goes on a data disk with caching None. Answers that suggest setting a static IP inside Windows or keeping NTDS on the OS disk are the traps.",
  "check": [
   [
    "Which cmdlet creates the first DC of a new forest, and which adds a DC to an existing domain?",
    "Install-ADDSForest creates a new forest; Install-ADDSDomainController adds a DC to an existing domain."
   ],
   [
    "Why should NTDS.dit on an Azure VM live on a data disk with host caching set to None?",
    "The OS disk uses write caching, which can break AD's assumption that writes are durable and risks database corruption; a data disk with caching None avoids that."
   ],
   [
    "What limits which user passwords an RODC stores?",
    "Its Password Replication Policy, managed through the Allowed and Denied RODC Password Replication Groups and per-RODC settings."
   ],
   [
    "Can IFM media created as RODC media be used to promote a writable DC?",
    "No. RODC media can only build an RODC; media from a writable DC (full media) can build either type."
   ]
  ]
 },
 {
  "t": "FSMO roles (schema master, domain naming master, RID master, PDC emulator, infrastructure master): placement, transfer vs seize",
  "hook": "At 2:10 a.m. your phone buzzes. You are on call for Northwind Veterinary Group, and the monitoring dashboard shows DC1, the oldest domain controller, is down hard with a failed system board. By 7 a.m. the clinics open. Most logons still work because other DCs answer them, but the help desk will soon get calls about clocks drifting, locked-out staff who cannot be unlocked and password changes that seem to vanish. DC1 held every special role in the domain. Do you wait for the replacement board, or do you force another DC to take over, and what happens if DC1 comes back to life later?",
  "simple": "Most of the time, any domain controller can make changes to the directory, and they all share those changes. But a few jobs would cause chaos if two servers did them at once, like handing out ID numbers or setting the official time. So Active Directory gives each of those jobs to exactly one server. There are five such jobs. If you plan ahead, you can politely hand a job to another server while both are running. If the server holding a job dies for good, you can grab the job by force, but the dead server must never return as it was. It is like a classroom where only one student holds the attendance sheet; if they move away, the teacher gives it to someone else.",
  "body": [
   "Active Directory is multi-master: any writable DC can accept most changes, such as creating a user or resetting a password, and replication spreads those changes everywhere. A few operations cannot safely happen in two places at once, because conflicting results would be impossible to merge. AD assigns those to single DCs called Flexible Single Master Operations (FSMO) role holders, also called operations masters. There are five roles. Two are forest-wide (one per forest) and three are domain-wide (one per domain).",
   "The forest-wide roles come first. The schema master is the only DC that can modify the schema, the blueprint of object classes and attributes. You touch it when installing schema-extending products such as Exchange, or when new DC versions extend the schema. The domain naming master controls adding and removing domains and application partitions in the forest, so it matters when you create a child domain or remove one.",
   "The domain-wide roles are busier. The RID master hands out pools of relative identifiers (RIDs) to each DC so every new security principal gets a unique security identifier (SID). A DC that cannot get a new pool eventually cannot create users, groups or computers. The infrastructure master updates references to objects in other domains, such as a group in one domain containing a user from another, so names stay correct when the remote object is renamed or moved.",
   "The PDC emulator is the role you notice most quickly. It is the authoritative time source for the domain, and the PDC emulator in the forest root domain should sync with a reliable external time source while every other DC follows the domain hierarchy. Accurate time matters because Kerberos rejects tickets when clocks are too far apart. The PDC emulator also receives urgent replication of password changes, processes account lockouts, and is the default target for Group Policy editing, so admins usually edit GPOs on it.",
   "Placement guidance follows from what each role does. In a small environment it is fine to keep all five on one well-connected, well-protected DC. The PDC emulator should sit on a powerful DC in a central site because clients and other DCs contact it often. The RID master is usually placed with the PDC emulator. The classic rule says not to put the infrastructure master on a global catalog server unless every DC in the domain is a global catalog or the AD Recycle Bin is enabled, because a global catalog (GC) already holds a partial copy of all objects and the infrastructure master would never notice stale references. The schema and domain naming masters are rarely used and usually sit with the forest root PDC emulator.",
   "To see where roles live, run `netdom query fsmo`, which lists all five in one shot, or use `Get-ADDomain` (RIDMaster, PDCEmulator, InfrastructureMaster properties) and `Get-ADForest` (SchemaMaster, DomainNamingMaster). Knowing these commands is useful both before maintenance and during an outage.",
   "Moving a role has two forms. A transfer is a graceful move while both the current and new holder are online: the two DCs replicate, the old holder hands over, and nothing is lost. You do this before planned maintenance, an OS upgrade or decommissioning. A seizure forces the new DC to take the role when the old holder is permanently gone and cannot hand anything over. After a seizure, the old DC must never come back online as it was; you clean up its metadata and, if you ever recover the hardware, rebuild it from scratch as a new DC. Seizing the RID master in particular risks duplicate RID pools, and therefore duplicate SIDs, if the old holder reappears.",
   "```powershell\n# Transfer (both DCs online)\nMove-ADDirectoryServerOperationMasterRole -Identity DC2 -OperationMasterRole PDCEmulator,RIDMaster\n# Seize (old holder is dead)\nMove-ADDirectoryServerOperationMasterRole -Identity DC2 -OperationMasterRole SchemaMaster -Force\n```",
   "The same cmdlet does both jobs: without `-Force` it attempts a transfer; with `-Force` it seizes if a transfer fails. The older `ntdsutil` tool also offers `transfer` and `seize` commands under `roles`, and you will still see it in documentation and on exams. Brief outages of most role holders go unnoticed for hours or days, since normal logons and changes do not need them. Losing the PDC emulator, though, quickly shows up as time drift, lockout problems and password-change delays, so it is usually the first role you restore."
  ],
  "analogy": "Picture a hospital ward where any nurse can update a patient chart, but only one person holds the keys to the medicine cabinet, only one sets the ward clock, and only one issues patient wristband numbers. Before going on leave, the key holder hands the keys over in person: that is a transfer. If the key holder vanishes, the supervisor cuts a new set and changes the locks: that is a seizure, and the old keys must never be used again. The analogy weakens on timing: unlike a medicine cabinet, most FSMO roles can be offline for a while without anyone noticing.",
  "mnemonic": "Some Doctors Run Pretty Intense clinics: Schema master, Domain naming master (forest-wide, the first two), then RID master, PDC emulator, Infrastructure master (domain-wide, the last three).",
  "terms": [
   [
    "FSMO role",
    "A single-master operation in AD assigned to one DC per forest or domain."
   ],
   [
    "Schema master",
    "Forest-wide role; the only DC that can write changes to the AD schema."
   ],
   [
    "Domain naming master",
    "Forest-wide role that controls adding and removing domains and application partitions."
   ],
   [
    "RID master",
    "Allocates pools of relative IDs to DCs so each new user, group or computer gets a unique SID."
   ],
   [
    "PDC emulator",
    "Domain-wide role handling time synchronization, urgent password changes, lockouts and GPO editing by default."
   ],
   [
    "Transfer",
    "A graceful role move while both the old and new holders are online."
   ],
   [
    "Seize",
    "A forced role takeover when the old holder is permanently unavailable; the old DC must not return."
   ]
  ],
  "example": "DC1, holding all five roles, suffers a failed motherboard and will be rebuilt from scratch. The admin seizes all roles to DC2 with Move-ADDirectoryServerOperationMasterRole -Force, runs metadata cleanup for DC1, and later promotes the rebuilt hardware as a new DC with a new name.",
  "mistakes": [
   [
    "Seizing a role during planned maintenance because it is faster.",
    "If the current holder is online, always transfer. A seizure skips the handover and requires the old DC to be rebuilt before it returns."
   ],
   [
    "Assuming the RID master is the time source.",
    "The PDC emulator is the domain's authoritative time source and handles lockouts and urgent password changes."
   ],
   [
    "Counting five FSMO roles in every forest regardless of domains.",
    "Only schema and domain naming are per forest. Each domain adds its own RID, PDC emulator and infrastructure master, so a three-domain forest has 11 roles."
   ],
   [
    "Bringing a seized-from DC back online after repairing it.",
    "After a seizure the old holder must not return as it was; clean up its metadata and promote it again as a fresh DC."
   ]
  ],
  "tryit": [
   [
    "Bayview Schools plans to retire DC-OLD this weekend. It holds the PDC emulator and RID master roles and is healthy. A junior admin suggests shutting it down first and then running Move-ADDirectoryServerOperationMasterRole with -Force on DC-NEW to save time. What should you do instead?",
    "Transfer the roles while DC-OLD is still online, by running the cmdlet without -Force (or with -Force only as a fallback if the transfer fails). A transfer lets the two DCs hand over cleanly. Shutting it down first and seizing would create unnecessary risk and mean DC-OLD must never return as it was. After the transfer, confirm with netdom query fsmo and then demote DC-OLD normally."
   ]
  ],
  "tip": "Know which roles are per forest (schema, domain naming) and which are per domain (RID, PDC emulator, infrastructure). A forest with three domains therefore has 2 + (3 x 3) = 11 FSMO roles in total.",
  "check": [
   [
    "Which FSMO role is the authoritative time source for a domain and handles account lockouts?",
    "The PDC emulator."
   ],
   [
    "When should you seize rather than transfer a role?",
    "Only when the current holder is permanently offline and cannot be recovered; otherwise transfer so both DCs hand over cleanly."
   ],
   [
    "How many FSMO roles exist in a single-domain forest?",
    "Five: schema master and domain naming master (forest-wide) plus RID master, PDC emulator and infrastructure master (domain-wide)."
   ],
   [
    "Which single command lists all five role holders?",
    "netdom query fsmo."
   ]
  ]
 },
 {
  "t": "Sites, subnets, site links, link cost and bridging; replication health with repadmin and dcdiag",
  "hook": "Tomas runs IT for Cedar Ridge Engineering, and the new Lakeside office opened last week. Today the ticket queue is full of the same complaint: logons at Lakeside take two minutes, mapped drives appear late, and a password reset done at headquarters is still not recognized at the branch an hour later. The Lakeside DC is up, its services are running, and nothing in Event Viewer looks alarming at first glance. Somewhere between the way the network is drawn on a whiteboard and the way Active Directory thinks it is drawn, there is a gap. Where do you look first, and which tools will prove the fix worked?",
  "simple": "Active Directory needs a map of your offices so it knows which servers are close together. You tell it which network address ranges belong to which office. Then a computer in an office knows to sign in at the server in its own building instead of one across the country. You also tell AD how the offices are connected and which connections are cheap or expensive to use, so it copies changes between offices sensibly. Two command-line tools act like a health check, showing whether servers are sharing changes properly. It is like a delivery company: each driver serves their own neighborhood, and routes between cities are planned on the cheapest roads.",
  "body": [
   "Active Directory sites describe your physical network so AD can make sensible decisions about traffic. A site is a set of well-connected IP subnets, typically one office or datacenter with fast local networking. Sites control two things. First, they decide which DC a client talks to: clients prefer DCs in their own site for logon, through a process called the DC locator, and site coverage lets a DC advertise for a nearby site that has no DC of its own. Second, sites shape how replication flows between DCs.",
   "Replication behaves very differently inside and between sites. Inside a site, DCs replicate quickly and uncompressed, triggered by change notification within seconds of a change, because local bandwidth is assumed to be plentiful. Between sites, replication is compressed and runs on a schedule to save WAN bandwidth. That is why a change at headquarters can take a while to reach a branch, and why that delay is often normal rather than a fault.",
   "To make site awareness work, you create subnet objects (for example 10.20.0.0/16) and associate each with a site in Active Directory Sites and Services or with `New-ADReplicationSubnet -Name 10.20.0.0/16 -Site Lakeside`. A client's IP address is matched to the most specific subnet, which tells it its site. A subnet that is missing from AD means clients in that range cannot be mapped to a site and may authenticate against a distant DC, which is one of the most common causes of slow logons. DCs log events about clients from unmapped subnets, and the `netlogon.log` file records them too, so you can spot the gap.",
   "Site links connect sites and carry three important settings. The cost is a relative number with no units: when there are multiple paths, AD chooses the path with the lowest total cost, so give fast links low costs and slow or backup links high costs. The replication interval (default 180 minutes, minimum 15) sets how often replication happens across the link when the schedule allows it. The schedule restricts when replication may happen at all, for example only overnight on a metered link. The default site link, DEFAULTIPSITELINK, contains every site until you design your own, so a new site joins it automatically unless you change that.",
   "Site link bridging controls transitivity. By default, Bridge all site links is enabled, meaning that if Site A links to B and B links to C, AD can calculate a path from A to C by adding the costs of the two links. On networks that are not fully routed, for example where a firewall prevents A from reaching C directly, you disable that setting on the IP transport and create explicit site link bridges only where they reflect real connectivity. Otherwise AD may try to build replication connections that the network will never allow.",
   "You rarely build replication connections by hand. The Knowledge Consistency Checker (KCC) runs on every DC and builds the replication topology automatically, creating connection objects you can see under each server's NTDS Settings. In each site, one DC acts as the Inter-Site Topology Generator (ISTG) and picks bridgehead servers, the DCs that actually carry inter-site replication. You can designate preferred bridgeheads, but if those fail and no other is allowed, replication stops, so use that option carefully.",
   "Two tools check replication health. `repadmin` inspects and drives replication: `repadmin /replsummary` shows failures and the largest delta (time since last successful replication) per DC, `repadmin /showrepl` lists inbound partners and their last results with error codes, `repadmin /syncall /AdeP` forces a push across all partitions and sites, and `repadmin /queue` shows pending work. `dcdiag` runs a battery of tests on a DC, covering connectivity, advertising, services, SYSVOL, FSMO checks and more; `dcdiag /test:dns` focuses on DNS registration, which underlies most replication problems. PowerShell equivalents include `Get-ADReplicationFailure` and `Get-ADReplicationPartnerMetadata`, which are handy for reports across many DCs.",
   "When repadmin reports errors, work through a short checklist. Check Domain Name System (DNS) first: can each DC resolve its partner's GUID-based CNAME record in the _msdcs zone? Then check network ports between sites and time skew between DCs, since Kerberos fails when clocks drift too far. Finally, consider how long a DC has been out of touch. A DC that has not replicated for longer than the tombstone lifetime is at risk of reintroducing lingering objects, deleted items that the rest of the forest has already purged, and should usually be demoted and rebuilt rather than forced back into replication."
  ],
  "analogy": "Think of sites as towns and site links as the roads between them, with tolls as the cost. Inside a town, couriers run constantly and never pack boxes tightly. Between towns, a truck leaves on a timetable with tightly packed boxes, and the dispatcher picks the route with the lowest total toll. Bridge all site links means the dispatcher assumes any road connects to any other; if a bridge is actually closed, you must tell the dispatcher which connections really exist. The analogy stops at cost: AD cost is just a relative number you choose, not real money or speed.",
  "terms": [
   [
    "Site",
    "An AD object representing a set of well-connected subnets, used for client DC selection and replication scheduling."
   ],
   [
    "Subnet object",
    "An AD object mapping an IP range to a site so clients and DCs know where they are."
   ],
   [
    "Site link cost",
    "A relative value AD sums along paths; the lowest total cost path is preferred."
   ],
   [
    "Site link bridge",
    "A way to make site links transitive; the default Bridge all site links setting makes all links transitive."
   ],
   [
    "KCC",
    "Knowledge Consistency Checker: the process on each DC that builds the replication topology automatically."
   ],
   [
    "ISTG",
    "Inter-Site Topology Generator: the DC in each site that chooses bridgehead servers for inter-site replication."
   ],
   [
    "repadmin /replsummary",
    "A command that summarizes replication status, failures and largest deltas for all DCs."
   ]
  ],
  "example": "Users in a new branch report slow logons. dcdiag passes, but the branch subnet 10.44.0.0/16 was never added in Sites and Services, so clients use a DC across the WAN. Creating the subnet and linking it to the Branch site fixes DC selection immediately.",
  "mistakes": [
   [
    "Thinking a higher site link cost means a preferred, faster link.",
    "Lower cost wins. Assign low costs to fast links and high costs to slow or backup links, then sum the costs along each path."
   ],
   [
    "Expecting inter-site changes to appear within seconds like intra-site changes.",
    "Between sites, replication follows the site link schedule and interval (default 180 minutes). Only intra-site replication uses change notification by default."
   ],
   [
    "Assuming a working DC in the branch guarantees local logons.",
    "Clients must map to the branch site through a subnet object. A missing subnet sends them to any DC, often one across the WAN."
   ],
   [
    "Forcing a DC back into replication after it has been offline longer than the tombstone lifetime.",
    "That risks lingering objects. Demote and rebuild it, or follow the documented cleanup, instead."
   ]
  ],
  "tryit": [
   [
    "Granite Health has three sites: HQ, North and South. Links are HQ-North cost 100, HQ-South cost 100 and a backup North-South link cost 300. A firewall blocks direct traffic between North and South except over the backup link. Which path will AD prefer for North-to-South replication if Bridge all site links is on, and is that what you want?",
    "With bridging on, AD can add HQ-North and HQ-South for a total of 200, which beats the direct 300 link, so it prefers routing through HQ. That works because HQ can talk to both sites. If you wanted North and South to use their direct link, you would lower its cost below 200. You would disable Bridge all site links only if the network could not actually carry the transitive path, which is not the case here."
   ],
   [
    "After adding a new site, you run repadmin /replsummary and see one DC with a largest delta of several days and DNS lookup errors. What do you check first?",
    "Check DNS first: confirm the DC can resolve its partners' GUID-based CNAME records in _msdcs and that it registered its own records (dcdiag /test:dns). Then check ports and time skew. Most replication failures trace back to DNS."
   ]
  ],
  "tip": "Lower cost wins. If a question gives two paths between sites, add the site link costs along each and pick the smaller. Remember inter-site replication follows the schedule and interval, while intra-site replication uses change notification.",
  "check": [
   [
    "What happens to clients whose IP address is not in any AD subnet?",
    "They cannot be mapped to a site and may use any DC, often a distant one, causing slow logons."
   ],
   [
    "When would you disable Bridge all site links?",
    "When the network is not fully routed, so AD should not assume every site can replicate to every other site transitively."
   ],
   [
    "Which command gives a quick summary of replication failures across all DCs?",
    "repadmin /replsummary."
   ],
   [
    "What are the default and minimum replication intervals on a site link?",
    "Default 180 minutes; minimum 15 minutes."
   ]
  ]
 },
 {
  "t": "Forest, external, shortcut and realm trusts; transitivity and direction; selective authentication; SID filtering",
  "hook": "Bluewater Insurance has just bought a smaller agency, Pinecrest Brokers, and the integration lead, Danielle, needs Pinecrest underwriters reaching three Bluewater claims servers by Monday. Pinecrest has its own forest, and its research group also runs a Linux-based Kerberos realm. The security team adds two warnings: Pinecrest staff must not be able to reach anything else at Bluewater, and nobody trusts that every Pinecrest administrator account is clean. Danielle sketches arrows on the whiteboard and immediately second-guesses which way they should point. Which trust types does she need, which way do they run, and how does she stop the acquisition from becoming a back door?",
  "simple": "A trust is an agreement between two separate user directories that says, in effect, I will believe you when you vouch for your users. One side owns the resources, like file servers, and trusts the other side, which owns the user accounts. People from the trusted side can then be given permission to use things on the trusting side. Some trusts pass along through a chain of directories and some stop at one hop. You can also limit trust so outside users reach only the specific computers you pick, and strip out any suspicious extra permissions they carry. It is like a building that accepts a partner company's badges, but only on certain floors.",
  "body": [
   "A trust is a relationship that lets users in one domain authenticate to resources in another. Trust vocabulary is directional and easy to mix up, so learn it precisely. The trusting domain holds the resources; the trusted domain holds the accounts. Access flows opposite to the trust direction: if Domain A trusts Domain B, users in B can be granted access to resources in A. In diagrams the arrow points from the trusting domain toward the trusted domain, while users travel the other way. A two-way trust is simply two one-way trusts, one in each direction.",
   "Inside a single forest you rarely create trusts yourself. Every domain automatically has two-way transitive parent-child trusts with its parent and tree-root trusts between tree roots, so any user in the forest can be granted access to resources in any domain of that forest. You only create trusts manually for other forests, for domains outside the forest, for non-Windows Kerberos realms, or to optimize authentication paths within a large forest.",
   "Transitivity means trust extends through chains. If A trusts B and B trusts C transitively, A effectively trusts C, so users in C can be granted access in A without a direct trust. Non-transitive trusts stop at the two domains that created them. There are four manual trust types, and the exam expects you to know the transitivity of each.",
   "A forest trust links the root domains of two forests and is transitive across all domains in both forests, but not onward to a third forest; if Forest 1 trusts Forest 2 and Forest 2 trusts Forest 3, Forest 1 does not trust Forest 3. A forest trust requires both forests at a Windows Server 2003 forest functional level or higher and working DNS resolution in both directions, usually via conditional forwarders. An external trust links two specific domains in different forests, or connects to a legacy Windows NT style domain; it is non-transitive and historically relies on NTLM-era mechanics. Choose an external trust when you need just one domain in each forest connected, or when a forest trust is not possible.",
   "The other two types solve narrower problems. A shortcut trust is created between two domains in the same forest to shorten the Kerberos referral path in deep trees. Without it, authentication from one deep child domain to another walks up to the forest root and back down; the shortcut lets the request jump across directly. It is transitive. A realm trust links a Windows domain to a non-Windows Kerberos version 5 realm, such as a UNIX MIT Kerberos realm, and can be configured as transitive or non-transitive.",
   "Selective authentication narrows who can cross a forest or external trust. With forest-wide (or domain-wide) authentication, the default, any user in the trusted forest can authenticate to any computer in the trusting forest, and then normal permissions decide what they can open. With selective authentication, users from the trusted side are denied by default, and you must grant the Allowed to authenticate permission on each specific computer object they may reach, found on the computer object's Security tab in Active Directory Users and Computers. This is the choice for partner and acquisition scenarios where you only want a few servers exposed.",
   "SID filtering protects the trusting side from SID history abuse. A user's access token can carry extra security identifiers (SIDs) from its sIDHistory attribute, a feature used during migrations so moved users keep old access. A malicious admin in a trusted forest could inject a privileged SID, such as your Domain Admins SID, into an account's history and gain your highest rights. SID filtering, also called quarantine, strips SIDs that do not belong to the trusted domain from tokens crossing the trust. It is on by default for external and forest trusts.",
   "You may temporarily relax SID filtering during a migration so migrated users keep access through SID history, using `netdom trust ... /quarantine:no` for external trusts or `/enablesidhistory:yes` for forest trusts. Re-enable it as soon as migration and security translation are complete, because a relaxed trust is only as safe as the least careful administrator on the other side.",
   "You create trusts in Active Directory Domains and Trusts or with `netdom trust`, and you validate them with the same tools or `Get-ADTrust -Filter *`, which shows direction, type and attributes such as selective authentication. Most trust failures come down to DNS: each side must be able to find the other's DCs, so set up conditional forwarders or stub zones first, test name resolution in both directions, and only then run the New Trust Wizard."
  ],
  "analogy": "Imagine two office buildings. Building A agrees to accept Building B's employee badges: A is trusting, B is trusted, and B's people walk into A. A forest trust is like honoring badges for every floor of every tower on the other campus, but not for a third campus they happen to partner with. Selective authentication is a lobby guard who checks a list of which specific rooms each visitor may enter. SID filtering is the guard ignoring hand-written stickers on badges that claim the visitor is a manager in Building A. The analogy stops at permissions: entering the building is authentication; each door still has its own lock.",
  "terms": [
   [
    "Trusting domain",
    "The domain holding resources that accepts authentication from another domain."
   ],
   [
    "Trusted domain",
    "The domain holding the user accounts whose authentication is accepted."
   ],
   [
    "Forest trust",
    "A transitive trust between two forest root domains covering every domain in both forests."
   ],
   [
    "External trust",
    "A non-transitive trust between two specific domains in different forests or with a legacy domain."
   ],
   [
    "Shortcut trust",
    "A manual transitive trust inside one forest that shortens Kerberos referral paths between distant domains."
   ],
   [
    "Realm trust",
    "A trust between a Windows domain and a non-Windows Kerberos v5 realm; transitive or non-transitive."
   ],
   [
    "Selective authentication",
    "A trust setting requiring the Allowed to authenticate permission on each computer before trusted users can reach it."
   ],
   [
    "SID filtering",
    "Removing foreign SIDs, including sIDHistory values, from tokens crossing a trust to block privilege escalation."
   ]
  ],
  "example": "Contoso acquires Fabrikam. They build conditional forwarders, create a two-way forest trust, and enable selective authentication on the Contoso side so Fabrikam staff can reach only the three file servers granted Allowed to authenticate, while migrations with ADMT proceed in the background.",
  "mistakes": [
   [
    "Reading 'A trusts B' as A's users can use B's resources.",
    "Access flows opposite the trust. If A trusts B, B's users can be granted access to A's resources."
   ],
   [
    "Assuming forest trusts chain to a third forest.",
    "A forest trust is transitive within the two forests only. Forest 1 trusting Forest 2 and Forest 2 trusting Forest 3 does not make Forest 1 trust Forest 3."
   ],
   [
    "Picking an external trust when every domain in two forests must interoperate.",
    "External trusts are non-transitive and connect only two domains. A forest trust covers all domains in both forests."
   ],
   [
    "Disabling SID filtering permanently to fix migration access problems.",
    "Relax it only during migration, then re-enable it after security translation; leaving it off lets a trusted-side admin escalate privileges."
   ]
  ],
  "tryit": [
   [
    "Harborview Clinic's forest has a deep domain tree, and users in east.clinical.harborview.local constantly authenticate to servers in west.admin.harborview.local. Logons to those servers are slow because referrals walk through the forest root. What trust, if any, should you create?",
    "Create a shortcut trust between the two child domains. Both are in the same forest, so they already trust each other transitively; the shortcut only shortens the Kerberos referral path, reducing logon delay. A forest or external trust would be wrong because both domains are in one forest."
   ],
   [
    "A partner company needs its forest's users to reach two web servers in your forest and nothing else. You also do not control the partner's administrators. Which trust settings do you choose?",
    "A one-way forest trust (your forest trusts the partner forest) with selective authentication, granting Allowed to authenticate only on the two server computer objects, and keeping SID filtering enabled so injected SIDs are stripped."
   ]
  ],
  "tip": "Access flows opposite the trust arrow: 'A trusts B' means B's users can use A's resources. Forest and shortcut trusts are transitive; external trusts are not; realm trusts can be either.",
  "check": [
   [
    "Domain A trusts Domain B one-way. Whose users can access whose resources?",
    "Users in B (trusted) can be granted access to resources in A (trusting)."
   ],
   [
    "Which trust type would you use to connect to a UNIX MIT Kerberos realm?",
    "A realm trust."
   ],
   [
    "What does SID filtering protect against?",
    "A trusted domain injecting privileged SIDs, for example through sIDHistory, into tokens used in the trusting domain."
   ],
   [
    "What permission must be granted on a computer object when selective authentication is enabled?",
    "Allowed to authenticate, for the trusted users or groups that need to reach that computer."
   ]
  ]
 },
 {
  "t": "Users, groups (domain local, global, universal), OUs and delegation of control; group managed service accounts and the KDS root key",
  "hook": "Your first week at Maple Grove County IT, you inherit a mess. The finance share has forty individual user accounts listed on its permissions, the help desk staff are all Domain Admins because someone needed them to reset passwords years ago, and the payroll service runs under an account named svc_payroll whose password, written on a sticky note, has not changed since 2017. An auditor arrives next month. You cannot rebuild everything, but you can fix the patterns. How do you organize objects, nest groups, hand out just enough rights, and make that service password rotate itself?",
  "simple": "Active Directory stores users, computers and groups. You put them in folders called organizational units so you can manage them together and let certain helpers manage certain folders. Groups come in three kinds that differ in who can join and where they can be used. A simple rule keeps things tidy: put people in role groups, put role groups into resource groups, and give permissions only to the resource groups. For programs that run in the background, a special kind of account changes its own long password automatically, and only approved servers can learn it. It is like a school where students join classes, classes get assigned rooms, and the lock codes change automatically each month.",
  "body": [
   "Users, computers and groups are the everyday objects of AD. Organizational units (OUs) are containers you create to organize those objects, and they matter for two reasons. You link Group Policy Objects (GPOs) to them, so the OU structure decides which settings reach which users and machines. You also delegate administrative control over them, so the structure decides who can manage what. The built-in Users and Computers containers are not OUs, so you cannot link GPOs to them or delegate as cleanly; most organizations build an OU structure by location, department or object type and move objects into it, and many redirect new objects into a proper OU with `redirusr` and `redircmp`.",
   "Groups have a type and a scope. Security groups can be used in permissions and also as email distribution lists if mail-enabled; distribution groups are only for email and cannot secure anything. Scope decides what a group can contain and where it can be used, and choosing the wrong scope is a classic exam distractor.",
   "There are three scopes to learn. A domain local group can contain accounts and groups from any trusted domain but can only be assigned permissions in its own domain, so it is ideal for resource permissions such as a file share or printer. A global group can contain only members from its own domain but can be used anywhere in the forest or in trusting domains, so it is ideal for grouping people by role, such as Accounts Payable Clerks. A universal group can contain members from any domain in the forest and be used anywhere in the forest. Its membership is stored in the global catalog, so changes replicate forest-wide; keep universal membership stable by placing global groups in it rather than individual users.",
   "Microsoft's recommended nesting strategy is AGDLP: put Accounts in Global groups, put global groups in Domain Local groups, and assign Permissions to the domain local groups. In multi-domain forests, AGUDLP adds universal groups in the middle to gather global groups from several domains. The payoff is maintainability. Permissions on resources stay short and rarely change, and you change who has access by changing global group membership, which is easy to audit and to delegate to a manager or help desk.",
   "Delegation of control lets you give limited rights without making someone a Domain Admin. Right-click an OU in Active Directory Users and Computers, choose Delegate Control, pick a group (for example Helpdesk) and a task such as Reset user passwords and force password change at next logon. The wizard writes access control entries (ACEs) on the OU, and child objects inherit them. Always delegate to groups, not individuals, so you can add and remove staff without touching ACLs, and review the result on the OU's Security tab under Advanced, where you will see the specific permissions granted. Delegation is also a way to clean up over-privileged help desk staff: delegate what they need, then remove them from Domain Admins.",
   "Services often run under ordinary user accounts with passwords that never change, which is a security risk because those passwords end up in scripts, documentation and attackers' hands. A group managed service account (gMSA) fixes this. AD generates and rotates a complex password automatically (every 30 days by default), and only the computers you list may retrieve it. No human ever needs to know the password, and a gMSA can be used by several servers at once, such as all nodes of a web farm.",
   "Before creating the first gMSA, the domain needs a Key Distribution Services (KDS) root key, which DCs use to derive gMSA passwords. Running `Add-KdsRootKey -EffectiveImmediately` still waits up to 10 hours before the key can be used, so that it replicates to all DCs. In a single-DC lab you can backdate it with `-EffectiveTime ((Get-Date).AddHours(-10))`, but do not do that in production, because a DC that has not yet received the key could fail to provide passwords. You create the key once, and it serves every gMSA you create afterward; you never repeat it per account.",
   "The workflow for a gMSA is short: create it, authorize the hosts, install it on each host, and configure the service.",
   "```powershell\nNew-ADServiceAccount -Name svcWeb -DNSHostName svcWeb.corp.contoso.com `\n  -PrincipalsAllowedToRetrieveManagedPassword WebServers\n# On a member of WebServers:\nInstall-ADServiceAccount svcWeb\nTest-ADServiceAccount svcWeb\n```\nThen set the service to log on as `CORP\\svcWeb$` with a blank password.",
   "Note the trailing dollar sign: a gMSA is a special computer-like object, so its account name ends in $. If `Test-ADServiceAccount` returns False, check that the server's computer account is in the WebServers group and that the server has been restarted or has refreshed its Kerberos tickets since being added, because group membership is read at logon."
  ],
  "analogy": "AGDLP works like a school. Students (accounts) join a class (global group). Classes are assigned to rooms (domain local groups), and each room's door lists which classes may enter (permissions). When a new student arrives, you add them to a class and never touch the door list. A gMSA is like a door code that changes itself every month and is only sent to approved staff badges. The analogy stops at scope: unlike classes, a global group can only contain members from its own domain.",
  "mnemonic": "AGDLP: Accounts go into Global groups, which go into Domain Local groups, which receive Permissions. Add a U for Universal in the middle (AGUDLP) in multi-domain forests.",
  "terms": [
   [
    "Organizational unit (OU)",
    "A container you create to organize objects, link GPOs and delegate administration."
   ],
   [
    "Domain local group",
    "A group whose permissions apply only in its own domain but which can contain members from any trusted domain."
   ],
   [
    "Global group",
    "A group containing members only from its own domain that can be used for permissions across the forest."
   ],
   [
    "Universal group",
    "A group with members from any domain in the forest, usable anywhere, with membership replicated to the global catalog."
   ],
   [
    "Delegation of control",
    "Granting specific permissions on an OU to a group, without full administrative rights."
   ],
   [
    "gMSA",
    "Group managed service account: a service identity whose password AD rotates and releases only to authorized hosts."
   ],
   [
    "KDS root key",
    "The domain key that Key Distribution Services uses to generate gMSA passwords; required once before the first gMSA."
   ]
  ],
  "example": "The helpdesk needs to unlock accounts and reset passwords for the Sales OU only. The admin runs Delegate Control on OU=Sales, grants the Helpdesk-Sales group Reset user passwords, and confirms that helpdesk staff cannot modify group memberships or other OUs.",
  "mistakes": [
   [
    "Assigning file share permissions directly to user accounts or global groups.",
    "In AGDLP, permissions go to domain local groups. Users go into global groups, which are nested into the domain local group."
   ],
   [
    "Choosing a global group to collect users from several domains.",
    "A global group can only contain members from its own domain. Use a universal group (AGUDLP) to gather global groups from multiple domains."
   ],
   [
    "Linking a GPO to the default Users or Computers container.",
    "Those are containers, not OUs. GPOs link only to sites, domains and OUs, so move objects into an OU."
   ],
   [
    "Creating the KDS root key for every new gMSA.",
    "The KDS root key is created once. If New-ADServiceAccount fails, the key is usually missing or not yet effective."
   ]
  ],
  "tryit": [
   [
    "Willow Creek Library's IT team must let branch supervisors reset passwords only for users in their own branch OU. Today supervisors are members of Account Operators, which lets them change far more. What do you change?",
    "Create a global group per branch for supervisors, run Delegate Control on each branch OU, and grant that group only Reset user passwords and force password change at next logon. Then remove supervisors from Account Operators. Delegating to groups on specific OUs gives least privilege and is easy to maintain."
   ],
   [
    "A new IIS web farm of three servers needs a shared service identity whose password rotates automatically. New-ADServiceAccount fails with an error about the key. What is wrong, and what is the full fix?",
    "The domain has no effective KDS root key. Run Add-KdsRootKey -EffectiveImmediately, wait for it to become usable (up to 10 hours in production), then create the gMSA with -PrincipalsAllowedToRetrieveManagedPassword set to a group containing the three servers, run Install-ADServiceAccount on each, and configure the app pool or service as DOMAIN\\name$ with a blank password."
   ]
  ],
  "tip": "If New-ADServiceAccount fails with a key-related error, the answer is almost always that the KDS root key is missing or not yet effective. For group scope questions, remember AGDLP.",
  "check": [
   [
    "Which group scope should receive NTFS permissions on a file share in the AGDLP model?",
    "A domain local group."
   ],
   [
    "What must exist in the domain before you can create a gMSA?",
    "A KDS root key created with Add-KdsRootKey and effective (normally after replication)."
   ],
   [
    "Why can you not link a GPO to the default Users container?",
    "It is a container, not an OU; GPOs can only link to sites, domains and OUs."
   ],
   [
    "Where is universal group membership stored, and why does that matter?",
    "In the global catalog, so membership changes replicate forest-wide; keep membership stable by nesting global groups."
   ]
  ]
 },
 {
  "t": "Default Domain Policy vs fine-grained password policies (PSOs); AD Recycle Bin",
  "hook": "Two messages arrive at Silverline Credit Union before lunch. The first, from the security officer, says administrators must use 16-character passwords while tellers keep their current 12, and she wants it done today. The second, from a panicked help desk technician named Omar, says he just deleted the entire Tellers OU while tidying up, along with sixty user accounts and all their group memberships. The branch opens tomorrow at 8 a.m. One request is about giving different people different rules in a domain that seems to allow only one; the other is about undoing a mistake without restoring a backup. Can you solve both before the end of the day?",
  "simple": "Every Windows domain has a rule about how long and complex passwords must be. Normally there is just one rule for everybody, set in the main domain policy. Fine-grained password policies let you make extra rules for specific groups of people, like stricter ones for administrators, and when several rules could apply, the one with the lowest priority number wins. The AD Recycle Bin is like the recycle bin on your desktop: if someone deletes a user or folder by mistake, you can bring it back with everything intact, as long as the feature was turned on before the deletion happened. Once you turn it on, you cannot turn it off.",
  "body": [
   "Every domain needs a password and account lockout policy for its user accounts. For domain accounts, that policy comes from Group Policy settings under Computer Configuration, Policies, Windows Settings, Security Settings, Account Policies, and it only takes effect when the GPO is linked at the domain level. By convention it lives in the Default Domain Policy, and DCs enforce it for every domain user. If you link a GPO with password settings to an OU, it affects only the local accounts on computers in that OU, not domain users. That is the classic limitation: one domain password policy per domain.",
   "Fine-grained password policies remove that limitation. A Password Settings Object (PSO) holds the same settings as the domain policy: minimum length, complexity, history, maximum and minimum age, reversible encryption, lockout threshold, lockout duration and the lockout observation window. Instead of being linked through Group Policy, a PSO is applied directly to users or to global security groups. PSOs live in the Password Settings Container under the System container and require a domain functional level of Windows Server 2008 or higher. Because they are stored as directory objects rather than GPO settings, they replicate with the domain partition and are enforced by every DC without any client-side refresh.",
   "You create PSOs most easily in Active Directory Administrative Center (ADAC), under System, Password Settings Container, New, Password Settings, where a form shows every field. In PowerShell you use `New-ADFineGrainedPasswordPolicy` and then link it with `Add-ADFineGrainedPasswordPolicySubject`. A typical command sets `-Name AdminPSO -Precedence 10 -MinPasswordLength 16 -ComplexityEnabled $true`, then links the policy to a group such as Tier0-Admins.",
   "When more than one PSO could apply, precedence decides. Each PSO has a precedence number, and the lowest number wins. A PSO linked directly to a user always beats PSOs that reach the user through group membership, regardless of the numbers. If no PSO applies at all, the domain policy from Group Policy applies. To see what a user actually gets, run `Get-ADUserResultantPasswordPolicy -Identity alice`; if it returns nothing, the user falls back to the domain policy. ADAC also shows the resultant policy on the user's properties.",
   "PSOs cannot be linked to OUs. A PSO linked to an OU does nothing, because PSOs apply to users and global security groups only. The workaround is a shadow group, a global group that contains the OU's users and is kept in sync, often by a scheduled script. Exam questions like to test this by describing a PSO that appears to have no effect.",
   "Deleted objects are the other half of this topic. Without the AD Recycle Bin, deleting an object strips most of its attributes, such as group memberships, and turns it into a tombstone. You can reanimate a tombstone, but it comes back missing most of its data; getting it back fully means an authoritative restore from backup with the DC booted into Directory Services Restore Mode (DSRM), which is slow and disruptive. The AD Recycle Bin, available at the Windows Server 2008 R2 forest functional level and higher, keeps deleted objects with all their attributes for the deleted object lifetime (by default the same as the tombstone lifetime, 180 days in modern forests), so you can restore them online in seconds.",
   "Enabling the Recycle Bin is a one-way change: once on, it cannot be turned off. You enable it in ADAC by right-clicking the domain and choosing Enable Recycle Bin, or with PowerShell. The change must replicate to all DCs before objects deleted afterwards are protected, and objects deleted before you enabled it are not recoverable this way. That is why many organizations enable it on day one of a new forest.",
   "```powershell\nEnable-ADOptionalFeature 'Recycle Bin Feature' -Scope ForestOrConfigurationSet -Target corp.contoso.com\nGet-ADObject -Filter 'samaccountname -eq \"jdoe\"' -IncludeDeletedObjects | Restore-ADObject\n```",
   "If a whole OU was deleted, restore the OU first and then its children, because a child cannot be restored into a parent that is still deleted. In PowerShell you filter deleted objects by their `lastKnownParent` attribute to find the children after the OU is back. ADAC shows a Deleted Objects container where you can choose Restore or Restore To, and it can display deleted children under a restored parent, which is often easier than PowerShell in a lab. Afterward, consider enabling Protect object from accidental deletion on important OUs so the next slip is blocked outright."
  ],
  "analogy": "The domain password policy is like a building's single dress code posted at the front door. PSOs are name badges with special rules: the security team's badge says suits required, and when someone holds two badges, the one with the lower number on it wins, while a badge issued to them personally beats any team badge. The AD Recycle Bin is like a desk recycle bin that keeps the whole document, staples and sticky notes included, instead of a shredder that leaves only the title page. The analogy stops at the off switch: unlike a desk bin, you can never remove the AD Recycle Bin once installed.",
  "terms": [
   [
    "Default Domain Policy",
    "The domain-linked GPO that by convention holds the domain-wide password and lockout policy for domain accounts."
   ],
   [
    "PSO",
    "Password Settings Object: a fine-grained password and lockout policy applied to users or global security groups."
   ],
   [
    "Precedence",
    "The PSO attribute that resolves conflicts; the lowest value wins, and a directly linked PSO beats group-linked ones."
   ],
   [
    "Resultant password policy",
    "The single policy that actually applies to a user, shown by Get-ADUserResultantPasswordPolicy."
   ],
   [
    "Shadow group",
    "A global group kept in sync with an OU's users so a PSO can effectively target that OU."
   ],
   [
    "AD Recycle Bin",
    "An optional forest feature that preserves all attributes of deleted objects so they can be restored online."
   ],
   [
    "Tombstone",
    "A deleted object stripped of most attributes, kept only so the deletion can replicate before garbage collection."
   ]
  ],
  "example": "Security requires 16-character passwords for administrators while everyone else keeps 12. The admin creates a PSO with precedence 10 and minimum length 16, links it to the Tier0-Admins global group, and confirms with Get-ADUserResultantPasswordPolicy that admins get the PSO and regular users still get the Default Domain Policy.",
  "mistakes": [
   [
    "Linking a GPO with stricter password settings to the Admins OU.",
    "Password policy in a GPO linked to an OU affects only local accounts on computers in that OU. For domain users, use a PSO linked to a group or user."
   ],
   [
    "Choosing the PSO with the higher precedence number as the winner.",
    "The lowest precedence value wins. A PSO linked directly to the user beats any group-linked PSO."
   ],
   [
    "Expecting the Recycle Bin to restore objects deleted before it was enabled.",
    "Only objects deleted after the feature is enabled and replicated keep their attributes. Earlier deletions need an authoritative restore."
   ],
   [
    "Restoring the users from a deleted OU before the OU itself.",
    "Children cannot be restored into a deleted parent. Restore the OU first, then its child objects."
   ]
  ],
  "tryit": [
   [
    "At Redwood Transit, user Lena is in two groups: Ops-Staff (PSO precedence 30, 10 characters) and Finance (PSO precedence 20, 14 characters). An admin also linked a PSO with precedence 50 and 8 characters directly to Lena's account for testing and forgot it. Which policy applies to Lena?",
    "The precedence 50 PSO, because a PSO linked directly to a user always beats PSOs applied through groups, regardless of the numbers. Remove the test link and Lena would get the Finance PSO (precedence 20, lowest among her groups). Confirm with Get-ADUserResultantPasswordPolicy."
   ],
   [
    "A technician deleted the Warehouse OU containing 25 users. The forest functional level is Windows Server 2016 and the Recycle Bin was enabled last year. What is the fastest correct recovery?",
    "Restore online from the Recycle Bin: first restore the Warehouse OU (in ADAC Deleted Objects or with Get-ADObject -IncludeDeletedObjects | Restore-ADObject), then restore the users whose lastKnownParent is that OU. No DSRM boot or backup is needed, and group memberships return with the users."
   ]
  ],
  "tip": "Password policy linked to an OU does not affect domain users, and PSOs cannot be linked to OUs. Also remember the Recycle Bin needs the 2008 R2 forest functional level and cannot be disabled once enabled.",
  "check": [
   [
    "Two PSOs with precedence 5 and 20 apply to a user through groups. Which wins?",
    "The PSO with precedence 5, because the lowest number wins (unless another PSO is linked directly to the user)."
   ],
   [
    "A PSO is linked to the Sales OU but has no effect. Why?",
    "PSOs apply only to users and global security groups, not OUs; use a shadow group containing the OU's users."
   ],
   [
    "What must you restore first when an entire OU and its users were deleted?",
    "The OU itself, then the child objects inside it."
   ],
   [
    "What is the minimum forest functional level for the AD Recycle Bin, and can it be disabled later?",
    "Windows Server 2008 R2; no, enabling it is irreversible."
   ]
  ]
 },
 {
  "t": "Hybrid identity: Entra Connect Sync (including staging mode) vs Entra Cloud Sync; password hash sync, pass-through authentication, seamless SSO",
  "hook": "At Juniper Valley Health, a nurse was let go on Friday afternoon. Her on-premises account was disabled within minutes, yet on Saturday morning the compliance officer, Grace, finds sign-ins to the cloud email portal under that account. The CIO wants to know how this happened, and the board wants assurance it cannot happen again. Meanwhile, the hospital is absorbing a small clinic with its own separate Active Directory forest, and the sync server in the basement is the only one of its kind. Which sync tool, which sign-in method and which backup plan would have closed these gaps?",
  "simple": "Many companies keep their user accounts in their own building and also use cloud services. Hybrid identity means one account works in both places. A sync tool copies accounts up to the cloud directory, called Microsoft Entra ID. Then you choose where passwords are checked. You can send a scrambled version of the password to the cloud so the cloud checks it itself, which keeps working even if the office servers are down. Or you can have the cloud ask the office servers each time, which respects things like a disabled account instantly. A seamless sign-in feature lets office computers log in to cloud apps without retyping the password. It is like a gym chain that either keeps a copy of your membership card at every branch or calls your home gym each time you visit.",
  "body": [
   "Hybrid identity means one set of user identities used both on-premises, in Active Directory Domain Services (AD DS), and in the cloud, in Microsoft Entra ID (formerly Azure Active Directory). Two decisions shape every hybrid design. A synchronization engine copies users, groups and optionally devices from AD DS to Entra ID, and a sign-in method decides where passwords are checked. Microsoft offers two sync tools and several sign-in methods, and the exam expects you to know when to choose each.",
   "Microsoft Entra Connect Sync is the traditional tool. It is a full application installed on a domain-joined Windows Server, with a local SQL database and a sync engine you configure through a wizard and the Synchronization Service Manager, where you can watch import, synchronization and export run profiles and their errors. It supports the widest feature set, including pass-through authentication, federation with Active Directory Federation Services (AD FS), device writeback, Exchange hybrid writeback and complex attribute filtering and custom synchronization rules.",
   "Only one Connect Sync server can actively export to a tenant at a time. For resilience you install a second server in staging mode. A staging server imports from AD DS and Entra ID and synchronizes, building a full copy of the data and rules, but it does not export changes to either directory. If the active server fails, you run the wizard on the staging server, turn off staging mode and it becomes active. Staging mode is also how you safely preview a configuration change or an upgrade: make the change on the staging server, review the pending exports, and only then swap roles. It is not a load-balancing partner; it simply waits, fully prepared.",
   "Microsoft Entra Cloud Sync moves the configuration and engine to the cloud. On-premises you install only lightweight provisioning agents, and you manage scoping (for example, one OU or one group) and attribute mapping in the Microsoft Entra admin center. Installing multiple agents gives high availability automatically, with no staging server to manage. It handles disconnected forests, such as those from a merger with no trust between them, well because each forest just needs an agent that can reach its own DCs. It supports password hash sync and password writeback but does not offer the full list of Connect Sync features, so check requirements such as pass-through authentication, device writeback or complex custom rules before choosing it.",
   "The two tools can coexist in one tenant. A common pattern is Cloud Sync for a newly acquired, disconnected forest while Connect Sync continues to serve the main forest, as long as the same objects are not synchronized by both. Over time Microsoft has been adding features to Cloud Sync, so in practice you compare the current feature lists; on the exam, rich features point to Connect Sync and a light footprint or disconnected forests point to Cloud Sync.",
   "Sign-in methods are the second decision. Password hash synchronization (PHS) syncs a hash of the AD password hash to Entra ID, never the clear-text password, so Entra ID validates sign-ins itself. It is the simplest option, keeps working if every on-premises server is down, and enables leaked credential detection, where Microsoft compares hashes against known leaked credentials. Its trade-off is timing: a disabled on-premises account is only blocked in the cloud after the next sync cycle.",
   "Pass-through authentication (PTA) keeps validation on-premises. Lightweight agents installed on servers make outbound connections to Entra ID and check each password against AD DS in real time. That enforces on-premises account states such as lockout, disabled accounts, expired passwords and logon hours immediately at sign-in, which is exactly what the Friday-afternoon scenario needed. Deploy several PTA agents for availability, because if none can be reached, PTA sign-ins fail. Federation with AD FS hands authentication entirely to an on-premises federation farm and is chosen only for requirements the other methods cannot meet, such as certain third-party smart card or multifactor setups.",
   "Seamless single sign-on (Seamless SSO) is an add-on that works with PHS or PTA, not a sign-in method by itself. It creates a computer account named AZUREADSSOACC in AD, and domain-joined devices on the corporate network get a Kerberos ticket for Entra ID so users are signed in to cloud apps without typing a password. Protect that computer account like a privileged object and rotate its Kerberos decryption key periodically.",
   "A common design recommendation is to enable PHS even when you use PTA or federation, as a backup sign-in method you can switch to during an outage and for leaked credential reports. Pairing a primary Connect Sync server with a staging server, PTA with multiple agents and PHS as a fallback is a pattern you will see in many exam scenarios."
  ],
  "analogy": "Think of a gym chain. Password hash sync is like each branch keeping a secure copy of your membership card: the branch can check you in even if head office is closed, but if head office cancels your membership, branches find out only at the next update. Pass-through authentication is like the branch phoning head office every time you arrive: cancellations take effect instantly, but if the phone lines are down, nobody gets in. Staging mode is a fully trained deputy manager who shadows the manager but does not sign anything until promoted. The analogy stops at security: PHS stores a hash of a hash, not a readable card.",
  "terms": [
   [
    "Entra Connect Sync",
    "An on-premises sync server with the full hybrid feature set; one active server per tenant."
   ],
   [
    "Staging mode",
    "A Connect Sync server that imports and syncs but does not export, used for failover and testing changes."
   ],
   [
    "Entra Cloud Sync",
    "Sync configured in the cloud using lightweight on-premises provisioning agents; suits multiple or disconnected forests."
   ],
   [
    "Password hash synchronization",
    "Sign-in method that syncs a hash of the AD password hash so Entra ID validates passwords itself."
   ],
   [
    "Pass-through authentication",
    "Sign-in method where on-premises agents validate passwords against AD DS in real time."
   ],
   [
    "Seamless SSO",
    "Kerberos-based automatic sign-in to Entra ID for domain-joined devices on the corporate network, using the AZUREADSSOACC account."
   ]
  ],
  "example": "A company must block cloud sign-in the moment an account is disabled on-premises and must honor logon hours. They choose pass-through authentication with three agents, keep password hash sync enabled as a fallback, and run a second Connect Sync server in staging mode for disaster recovery.",
  "mistakes": [
   [
    "Treating a staging mode server as an active second sync server that shares the load.",
    "Only one Connect Sync server exports at a time. The staging server imports and syncs but never exports until you switch it to active."
   ],
   [
    "Choosing PHS when on-premises lockout, disabled state and logon hours must apply instantly at sign-in.",
    "PHS validates in the cloud and learns of state changes only on sync. PTA checks AD DS in real time."
   ],
   [
    "Thinking Seamless SSO is a sign-in method on its own.",
    "Seamless SSO is an add-on to PHS or PTA that provides automatic Kerberos-based sign-in on the corporate network."
   ],
   [
    "Assuming PHS sends user passwords to the cloud.",
    "PHS sends a hash of the password hash, not the password, and Entra ID compares hashes."
   ]
  ],
  "tryit": [
   [
    "Osprey Freight runs one Entra Connect Sync server and is acquiring a company whose forest has no network connectivity or trust to Osprey's forest. Leadership wants the new users in the same tenant quickly with minimal new infrastructure, while Osprey's own sync must keep its device writeback. What do you deploy?",
    "Keep Entra Connect Sync for Osprey's forest (it provides device writeback) and deploy Entra Cloud Sync agents in the acquired forest. Cloud Sync handles disconnected forests with lightweight agents and coexists with Connect Sync, provided the same objects are not synced by both. Also add a staging mode Connect Sync server for Osprey's main forest so the single server is no longer a point of failure."
   ],
   [
    "A school district uses PTA with a single agent on one server. That server is patched and rebooted during the school day, and nobody can sign in to cloud apps for twenty minutes. What two changes fix this?",
    "Install additional PTA agents on other servers so sign-in requests always reach an available agent, and enable PHS as a backup sign-in method that can be switched to if all PTA agents become unavailable."
   ]
  ],
  "tip": "If a scenario needs on-premises lockout, logon hours or disabled state enforced instantly at sign-in, the answer is PTA. If it needs sign-in to survive an on-premises outage with the least infrastructure, the answer is PHS. Disconnected forests with minimal footprint points to Cloud Sync.",
  "check": [
   [
    "What does a Connect Sync server in staging mode do?",
    "It imports and synchronizes data but does not export to Entra ID or AD, so it can take over on failure or be used to test changes."
   ],
   [
    "Which sign-in method keeps working if every on-premises server is offline?",
    "Password hash synchronization, because Entra ID validates the password itself."
   ],
   [
    "Which AD object does Seamless SSO create?",
    "A computer account named AZUREADSSOACC."
   ],
   [
    "How do you make Entra Cloud Sync highly available?",
    "Install more than one provisioning agent; the service uses whichever agents are available."
   ]
  ]
 },
 {
  "t": "Group Policy processing (LSDOU), Enforced and Block Inheritance, security filtering, loopback processing, Central Store, backup and restore",
  "hook": "It is Thursday at Elmwood College, and three tickets land at once. The library kiosks are showing students their personal desktops instead of the locked-down kiosk layout. A new screen-lock policy aimed at the Finance group stopped applying to everyone the moment Jordan narrowed its filter. And the admin who tried to configure a new Windows setting found it missing from the Group Policy editor on her laptop, though it shows on a colleague's. All three problems live in Group Policy, and all three come down to understanding how it decides what applies, to whom and from where. Can you predict the result before you click Apply?",
  "simple": "Group Policy is how Windows administrators push settings, like screen-lock timers or desktop restrictions, to many computers and users at once. Settings come from several layers: the computer itself, the office location, the whole company domain, and then each department folder down to the one holding the user or computer. Later layers override earlier ones, so the closest folder usually wins. You can block settings from above or force them through anyway. You can aim a policy at a specific group. For shared computers like kiosks, you can make the computer's location decide the user settings. It is like house rules: city law, then building rules, then your apartment's rules, with the most specific usually winning.",
  "body": [
   "Group Policy delivers settings to computers and users from Group Policy Objects (GPOs) linked to sites, domains and OUs. Each GPO has a computer half, applied at startup and on background refresh, and a user half, applied at sign-in and on refresh. Understanding the order in which GPOs apply is the key to predicting results, and most exam questions here are really puzzles about order.",
   "The order is LSDOU: Local policy first, then Site, then Domain, then OUs from the top of the tree down to the OU that contains the object. Later GPOs overwrite earlier ones when settings conflict, so the GPO linked closest to the object normally wins. Settings that do not conflict simply accumulate. When several GPOs link to the same container, the one with link order 1 has the highest precedence and applies last, so it wins conflicts at that level. The Group Policy Management Console (GPMC) shows this on each container's Linked Group Policy Objects tab and its Group Policy Inheritance tab.",
   "Two switches change normal inheritance. Block Inheritance is set on a domain or OU and stops GPOs linked higher up from flowing down to it, which a department might use to keep its own settings isolated. Enforced (formerly No Override) is set on a GPO link and does two things: that GPO cannot be blocked by Block Inheritance, and its settings win over conflicting settings from GPOs linked lower down. Enforced beats Block Inheritance every time. In GPMC, a blocked OU shows a blue exclamation icon and an enforced link shows a padlock. Use both sparingly, because they break the simple closest-wins rule and make troubleshooting harder.",
   "Security filtering controls who a GPO applies to within its scope. By default a GPO applies to Authenticated Users, which includes all users and computers. To target a group, remove Authenticated Users from the Security Filtering list and add the group. Since a security update in 2016, computers read GPOs in the computer's own security context, so if you remove Authenticated Users you must still grant Read (not Apply) to Authenticated Users or Domain Computers on the Delegation tab, or the GPO silently fails for everyone. Windows Management Instrumentation (WMI) filters add conditions such as operating system version or hardware type, evaluated on the client at processing time, so use them carefully because complex queries slow sign-in.",
   "Loopback processing handles a special case. Normally user settings come from GPOs linked to the user's OU, wherever they sign in. On kiosks, lab PCs or Remote Desktop Session Hosts you want user settings based on the computer's location instead. Enabling the computer setting Configure user Group Policy loopback processing mode in a GPO linked to the computers' OU does this. Replace mode uses only the user settings from the computer's GPOs and ignores the user's normal ones. Merge mode applies the user's normal settings and then the computer's user settings on top, so the computer's side wins conflicts.",
   "The Central Store solves the problem of mismatched templates. It is a folder, `\\\\corp.contoso.com\\SYSVOL\\corp.contoso.com\\Policies\\PolicyDefinitions`, holding ADMX and ADML administrative template files. Once it exists, every admin's Group Policy Management Editor uses the same templates instead of each workstation's local copy, and it replicates to all DCs with SYSVOL. Copy newer ADMX files there when you add templates for a new Windows or Office release. If one admin sees a setting another cannot, the Central Store is usually missing or out of date.",
   "Back up GPOs in GPMC or with `Backup-GPO -All -Path D:\\GPOBackup`. `Restore-GPO` returns an existing GPO to a backed-up state, keeping its globally unique identifier (GUID), which is how you undo a bad change. `Import-GPO` copies settings from a backup into a different or new GPO, which is how you move GPOs between domains or forests, optionally with a migration table to translate paths and security principals that differ in the target. Backups contain the GPO settings and its permissions, but not the GPO's links to sites, domains and OUs, so record links separately.",
   "On clients, verification closes the loop. `gpupdate /force` refreshes policy immediately rather than waiting for the background interval. `gpresult /r` summarizes which GPOs applied and which were filtered out and why, and `gpresult /h report.html` produces a detailed report showing the winning GPO for each setting. In GPMC, Group Policy Results and Group Policy Modeling give the same view remotely, the latter for what-if planning."
  ],
  "analogy": "Think of rules in an apartment building. City law (local), the neighborhood association (site), the building's rules (domain) and your floor's rules (OU) all apply, and the most local rule usually wins. Block Inheritance is a floor that ignores the building's rules; Enforced is a building rule stamped mandatory that no floor can ignore. Loopback is a hotel room: guests follow the room's rules, not the rules from home. The analogy stops at the local layer: in Group Policy the local policy applies first and is the weakest, the opposite of how some people think about local rules.",
  "mnemonic": "LSDOU is applied in order: Local, Site, Domain, OU. Last applied wins, so think of it as Least to most Specific.",
  "terms": [
   [
    "LSDOU",
    "Group Policy application order: Local, Site, Domain, OU; later GPOs win conflicts."
   ],
   [
    "Link order",
    "The ranking of multiple GPOs on one container; link order 1 applies last and wins."
   ],
   [
    "Enforced",
    "A GPO link option that prevents blocking and makes the GPO win over lower-level GPOs."
   ],
   [
    "Block Inheritance",
    "An OU or domain setting that stops non-enforced GPOs from parent containers applying."
   ],
   [
    "Security filtering",
    "Limiting a GPO to specific users, groups or computers through Read and Apply permissions."
   ],
   [
    "Loopback processing",
    "Applying user settings based on the computer's GPOs, in Replace or Merge mode."
   ],
   [
    "Central Store",
    "The PolicyDefinitions folder in SYSVOL that provides shared ADMX templates to all admins."
   ]
  ],
  "example": "Kiosk PCs in the Kiosks OU must give any user the same locked-down desktop. The admin links a GPO with lockdown user settings to the Kiosks OU and enables loopback processing in Replace mode, so users' normal OU policies are ignored when they sign in to a kiosk.",
  "mistakes": [
   [
    "Believing Block Inheritance stops every parent GPO.",
    "Enforced links cannot be blocked. Block Inheritance stops only non-enforced GPOs from above."
   ],
   [
    "Removing Authenticated Users and adding only the target group to security filtering.",
    "Computers also need to read the GPO. Grant Read to Authenticated Users or Domain Computers on the Delegation tab, or the GPO fails silently."
   ],
   [
    "Linking a GPO with user settings to a computer OU and expecting it to apply.",
    "User settings apply from the user's OU unless loopback processing is enabled in a GPO that applies to the computer."
   ],
   [
    "Using Restore-GPO to copy a GPO into another domain.",
    "Restore-GPO returns an existing GPO to a backed-up state. Import-GPO copies settings into another GPO, often with a migration table."
   ]
  ],
  "tryit": [
   [
    "At Rivermouth Bank, a domain-level GPO sets the screen saver timeout to 10 minutes and is Enforced. The Tellers OU has Block Inheritance and a linked GPO setting the timeout to 30 minutes. What timeout do tellers get, and why?",
    "Ten minutes. Enforced links cannot be blocked, and an enforced GPO also wins conflicts over GPOs linked lower down, so the domain GPO's 10-minute setting beats the OU's 30-minute setting despite Block Inheritance."
   ],
   [
    "Lab PCs at a community college should give every student a standard desktop, but students should keep their own mapped drive from their normal policy. Which loopback mode do you choose?",
    "Merge mode. The student's normal user settings apply first, keeping their mapped drive, then the lab computer's user settings apply on top and win any conflicts, giving the standard desktop. Replace mode would drop the student's own settings entirely."
   ]
  ],
  "tip": "Enforced wins over Block Inheritance every time. If a filtered GPO stopped applying after removing Authenticated Users, the fix is to give Authenticated Users or Domain Computers Read permission.",
  "check": [
   [
    "A domain GPO is Enforced and an OU has Block Inheritance. Does the domain GPO apply to objects in the OU?",
    "Yes. Enforced links cannot be blocked."
   ],
   [
    "What is the difference between loopback Replace and Merge?",
    "Replace uses only user settings from GPOs linked to the computer; Merge applies the user's normal settings then the computer's user settings, which win conflicts."
   ],
   [
    "Which cmdlet copies settings from a GPO backup into a GPO in another domain?",
    "Import-GPO (optionally with a migration table)."
   ],
   [
    "Two GPOs are linked to the same OU with link order 1 and 2. Which wins a conflict?",
    "Link order 1, because it applies last."
   ]
  ]
 },
 {
  "t": "Migrating AD objects between domains and forests with ADMT and SID history; domain and forest functional levels when upgrading DCs",
  "hook": "Six months after Copperfield Manufacturing bought a rival, Alder Tooling, the CFO asks a simple question in the steering meeting: why do Alder staff still sign in to a separate domain, and why do we still pay to run its aging domain controllers? Rafael, the infrastructure lead, knows the answer is a migration, but he also knows the risk. If he moves 900 users and their access to Alder's file servers breaks on day one, the plant floor stops. And Copperfield's own forest still has an old DC that blocks the newer features security keeps asking for. How do you move people without breaking access, and how do you modernize the forest underneath them?",
  "simple": "When two companies merge, you often need to move user accounts from one directory into another. The catch is that every account has a hidden ID number, and files and folders remember people by that number. A moved account gets a new number, so old folders would no longer recognize it. A migration tool solves this by attaching the old number to the new account, so old folders still let the person in, until the folders are updated to recognize the new number. Separately, every domain has a functional level, a setting that unlocks newer features but only once all the older servers are gone. It is like updating everyone's building badge while the old badge keeps working until all the door readers are reprogrammed.",
  "body": [
   "Mergers, acquisitions and cleanups often require moving users, groups and computers from one domain or forest to another. This is called a restructuring migration, as opposed to an in-place upgrade. The Active Directory Migration Tool (ADMT) is Microsoft's free tool for this. It is an older tool that has not been actively developed for years, but it remains the reference answer for restructuring migrations on the exam. ADMT runs on a member server in the target domain, needs a SQL Server instance for its database, and requires a trust between source and target so it can read the source and write to the target with appropriate administrative rights in both.",
   "The central problem is access. A migrated user gets a new security identifier (SID) in the target domain, but files, shares and access control lists (ACLs) in the source still reference the old SID. Without help, a migrated user would lose access to everything the moment they started using the new account. SID history solves this: ADMT copies the old SID into the new account's sIDHistory attribute, so the user's access token contains both SIDs and old permissions keep working during the transition.",
   "SID history migration has specific prerequisites. Auditing must be enabled in both domains so the migration is recorded. A local group named after the source domain with three dollar signs (for example `SOURCE$$$`) must exist in the source domain; ADMT can create it for you. And SID filtering must be relaxed on the trust, because by default the trusting side strips foreign SIDs from tokens, which would make SID history useless. Remove SID history and restore SID filtering when the migration is done, because leftover SID history widens your attack surface.",
   "Passwords do not migrate by default. To keep users' existing passwords, you install the Password Export Server (PES) service on a DC in the source domain with an encryption key generated by ADMT, then start the service for the duration of the migration. Otherwise ADMT sets new complex passwords and writes them to a file, and you must distribute them, which is painful for hundreds of users.",
   "Order matters in a migration. A typical order is: migrate groups first (with SID history), then users, so ADMT can update group memberships as each user arrives in the target domain. Then migrate service accounts, then computers, and finally run security translation, which rewrites ACLs, local profiles and group memberships on member servers to reference the new SIDs instead of the old ones. Migrating computers requires a reboot to join the target domain, so schedule it outside working hours. Only after security translation is complete is it safe to clear SID history.",
   "Functional levels are the other half of this topic. The domain functional level (DFL) and forest functional level (FFL) set which AD features are available and which DC operating systems are allowed. A level can only be as high as the oldest DC in scope, so you raise it after all older DCs are gone. For example, fine-grained password policies need at least the 2008 DFL and the Recycle Bin needs the 2008 R2 FFL. Windows Server 2025 introduced a new functional level for the first time in years, while several recent releases reused the Windows Server 2016 level. Newer DC versions also require the existing forest to be at a minimum level before they can be promoted, so check that before you start.",
   "Raising a level is normally one-way in practice. Once raised, you cannot add DCs running older operating systems, so confirm that no application or branch still needs one. You can see current levels with `Get-ADDomain | Select DomainMode` and `Get-ADForest | Select ForestMode`.",
   "The usual upgrade path is not an in-place OS upgrade of DCs. Instead, add new DCs running the new version; promotion runs adprep schema and domain preparation automatically if you use an account in Schema Admins and Enterprise Admins. Next, move FSMO roles to the new DCs, update DNS and DHCP settings that point clients at old DCs, demote the old DCs, and then raise the DFL and FFL with `Set-ADDomainMode` and `Set-ADForestMode`. Before adding modern DCs, SYSVOL must already replicate with DFS Replication (DFSR) rather than the old File Replication Service (FRS); `dfsrmig /getglobalstate` shows where a domain stands in that migration."
  ],
  "analogy": "Imagine moving employees to a new building with new badges. Door readers in the old building only know old badge numbers. SID history is like printing the old number on the back of each new badge so old doors still open. Security translation is reprogramming every old door to recognize the new numbers, after which you can scrape the old number off. Functional levels are like a building upgrade that only works once every old-style door reader is gone. The analogy stops at timing: SID history works instantly, but it only helps if SID filtering on the trust lets those old numbers through.",
  "mnemonic": "Good Users Seldom Cause Trouble: Groups, Users, Service accounts, Computers, then security Translation.",
  "terms": [
   [
    "ADMT",
    "Active Directory Migration Tool: migrates users, groups, computers and service accounts between domains or forests."
   ],
   [
    "SID history",
    "The sIDHistory attribute holding an account's previous SIDs so old resource permissions keep working after migration."
   ],
   [
    "Security translation",
    "ADMT step that replaces old SIDs with new ones in ACLs, profiles and group memberships on resources."
   ],
   [
    "Password Export Server",
    "A service installed on a source DC that lets ADMT migrate user passwords."
   ],
   [
    "Functional level",
    "Domain- or forest-wide setting that unlocks AD features and limits which DC OS versions may be present."
   ],
   [
    "DFSR migration",
    "Moving SYSVOL replication from the legacy File Replication Service to DFS Replication, required before adding modern DCs."
   ]
  ],
  "example": "After acquiring Fabrikam, Contoso creates a forest trust, relaxes SID filtering, installs PES on a Fabrikam DC and uses ADMT to migrate groups, then users with SID history and passwords. Users keep access to Fabrikam file servers until security translation updates the ACLs, after which SID history is cleared and filtering is re-enabled.",
  "mistakes": [
   [
    "Migrating users before groups.",
    "Migrate groups first so ADMT can place each migrated user into the already migrated target groups and preserve membership."
   ],
   [
    "Assuming passwords move automatically with ADMT.",
    "Passwords migrate only if the Password Export Server service is installed and running on a source DC; otherwise ADMT generates new passwords."
   ],
   [
    "Raising the domain functional level while an older DC remains.",
    "The level cannot exceed the oldest DC's version. Demote or replace older DCs first."
   ],
   [
    "Upgrading DCs in place as the standard path.",
    "The recommended path is to add new DCs, move FSMO roles, demote old DCs and then raise functional levels."
   ]
  ],
  "tryit": [
   [
    "Larkspur Media migrated 300 users with ADMT and SID history last week. Users can sign in to the target domain, but they get access denied on the source file servers. Auditing is on and the SOURCE$$$ group exists. What is the most likely cause?",
    "SID filtering is still enabled on the trust. It strips the old SIDs carried in sIDHistory from tokens crossing the trust, so the old ACLs no longer match. Relax SID filtering for the migration period (or run security translation on the file servers), then re-enable filtering once translation is complete."
   ],
   [
    "A forest has DCs running Windows Server 2016, 2019 and one 2012 R2 DC at a remote site. Security wants to raise the domain functional level to Windows Server 2016. What must happen first?",
    "Replace or demote the Windows Server 2012 R2 DC, for example by promoting a newer DC at that site and moving any roles. A functional level cannot exceed the version of the oldest DC in the domain."
   ]
  ],
  "tip": "SID history keeps access working; security translation makes it permanent. Functional levels depend on the oldest DC, and raising them is normally one-way, so questions about 'can we still add a Server 2012 R2 DC' turn on the current level.",
  "check": [
   [
    "Why migrate groups before users with ADMT?",
    "So that when users move, ADMT can add them to the already migrated target groups and preserve membership."
   ],
   [
    "What three prerequisites support SID history migration?",
    "Auditing enabled in both domains, the SOURCE$$$ local group in the source domain, and SID filtering relaxed on the trust (plus admin rights in both)."
   ],
   [
    "You still have one Windows Server 2012 R2 DC. Can you raise the domain functional level to Windows Server 2016?",
    "No. The level cannot exceed the version of the oldest DC in the domain; demote or upgrade that DC first."
   ],
   [
    "What must SYSVOL use for replication before you add modern DCs?",
    "DFS Replication (DFSR), not the legacy File Replication Service (FRS)."
   ]
  ]
 },
 {
  "t": "Windows Admin Center: desktop vs gateway mode, extensions, Kerberos constrained delegation, Windows Admin Center for Azure VMs and Arc-enabled servers",
  "hook": "The infrastructure team at Stonebridge Logistics has a new rule: no more remote desktop sessions into servers just to check a disk or restart a service. Instead everyone will use a shared Windows Admin Center installation. On the first day, Keisha's inbox fills with complaints. Admins get a credential prompt for every single server they open. The night shift wants to manage the Azure VMs from the portal without opening another port to the internet. And the warehouse servers in another state, which are not in Azure at all, need the same tools. Is the tool broken, or is it just set up for the wrong situation?",
  "simple": "Windows Admin Center is a website-style tool for managing Windows servers from your browser instead of logging into each one. You can install it on your own PC just for yourself, or on a server so a whole team shares it. Extra features come as add-ons called extensions. When the shared version tries to connect to other servers using your identity, Windows needs to be told that the shared server is allowed to pass your identity along; otherwise it keeps asking for your password. You can also open the same tool from the Azure website to manage cloud servers and even servers in your own building that are linked to Azure. It is like a universal remote that needs to be paired with each TV once.",
  "body": [
   "Windows Admin Center (WAC) is Microsoft's browser-based management tool for Windows Server, failover clusters, hyperconverged clusters and Windows clients. It replaces many classic Microsoft Management Console (MMC) snap-ins and Server Manager tasks with one web interface. Under the hood it talks to managed nodes over PowerShell remoting and Windows Management Instrumentation (WMI) over Windows Remote Management (WinRM), so the managed servers need no extra agent. It is included with Windows Server licensing at no extra cost.",
   "WAC has two deployment shapes, and choosing the right one is a common exam question. In desktop mode you install it on a Windows client and only the local user uses it, typically by browsing to localhost on a port you choose. It suits a single administrator or a lab. In gateway mode you install it on a Windows Server, and many administrators connect to it from their browsers over HTTPS; the gateway then connects on to managed servers. Gateway mode is what you use in production, often with a trusted Transport Layer Security (TLS) certificate instead of the self-signed one, high availability on a failover cluster, and access control that restricts who may use the gateway and who is a gateway administrator.",
   "Gateway access control deserves a moment. Gateway users can connect through the gateway to servers they already have rights on, while gateway administrators can also change gateway settings and install extensions. You can require Microsoft Entra ID authentication for the gateway instead of only Windows authentication, which adds conditional access and multifactor options. Remember that gateway access does not grant rights on managed servers; the user still needs appropriate permissions on each node.",
   "Functionality is delivered by extensions. Core tools such as Overview, Hyper-V virtual machines, Storage, Certificates, Firewall, Events, Services and PowerShell ship as built-in extensions, and Microsoft and partners publish more to a feed. A gateway administrator installs and updates them under Settings, Extensions, and can add private feeds. Hardware vendors often publish extensions for firmware updates and health monitoring, so a server vendor's tools can appear right inside WAC.",
   "Authentication creates the classic double-hop problem. When you sign in to a gateway and it tries to use your credentials to reach a managed server, Kerberos does not by default let the gateway pass your identity on to a second machine. The symptom is a credential prompt for every server, or tools that fail to load. You can type credentials for each server using Manage as, but the better fix is resource-based Kerberos constrained delegation: on each managed node, allow the gateway computer account to delegate to it. After that, single sign-on flows from the browser through the gateway to the node.",
   "```powershell\n$gw = Get-ADComputer WAC01\nGet-ADComputer SRV01 | Set-ADComputer -PrincipalsAllowedToDelegateToAccount $gw\n```",
   "Note where the setting lives: it is configured on the target computer (SRV01), naming the gateway as allowed to delegate to it, which is why it is called resource-based. You repeat it for every managed server, usually with a script that loops through an OU. Kerberos tickets are cached, so a change may take effect only after tickets refresh, or you can clear them with `klist purge`.",
   "Windows Admin Center is also available from the Azure portal. For Azure VMs running Windows Server, you enable Windows Admin Center on the VM's page in the portal, which deploys a VM extension. You then open it in the portal, signing in with Microsoft Entra ID, and access is controlled by Azure role-based access control (RBAC), using a role such as Windows Admin Center Administrator Login. The VM needs a network path for the connection, typically an inbound rule for the WAC port from the portal's service. For Azure Arc-enabled servers, the same portal experience works for on-premises or other-cloud machines through the Arc Connected Machine agent, with no need to open inbound ports to the internet, because the connection is brokered through Azure Arc.",
   "In a lab you will see the connection list, add servers by name, choose Manage as to supply credentials, and open tools from the left pane. If connections fail, work from the network up: check WinRM with `Test-WSMan SRV01`, check firewall rules for WinRM over HTTP (5985), confirm the server name resolves in DNS, and then review the delegation settings."
  ],
  "analogy": "Think of a hotel concierge. In desktop mode you run your own errands. In gateway mode, guests ask the concierge, who then goes to shops on their behalf. Shops will not accept the concierge saying a guest sent me unless each shop has put that concierge on its approved list: that is resource-based constrained delegation, configured at each shop rather than at the concierge desk. The analogy stops at permissions: being approved to act on behalf of a guest does not give the concierge any rights the guest lacks.",
  "terms": [
   [
    "Gateway mode",
    "WAC installed on Windows Server and shared by multiple administrators through their browsers."
   ],
   [
    "Desktop mode",
    "WAC installed on a Windows client for a single local user."
   ],
   [
    "Gateway administrator",
    "A WAC role that can change gateway settings, manage access and install extensions."
   ],
   [
    "Extension",
    "A plug-in that adds a tool or solution to Windows Admin Center, managed from the extension feed."
   ],
   [
    "Resource-based constrained delegation",
    "Kerberos setting on a target computer allowing a named account, such as the WAC gateway, to delegate to it."
   ],
   [
    "WAC in the Azure portal",
    "Managing Azure VMs or Arc-enabled servers through Windows Admin Center from the portal, with Entra ID sign-in and Azure RBAC."
   ]
  ],
  "example": "Admins complain they are prompted for credentials for every server when using the WAC gateway. The team runs Set-ADComputer -PrincipalsAllowedToDelegateToAccount on each managed server, naming the gateway's computer account, and single sign-on now flows through the gateway.",
  "mistakes": [
   [
    "Configuring delegation on the gateway's computer object to fix double-hop prompts.",
    "Resource-based constrained delegation is set on each managed server, naming the gateway account in PrincipalsAllowedToDelegateToAccount."
   ],
   [
    "Choosing desktop mode for a team of administrators.",
    "Desktop mode serves a single local user. A shared team installation uses gateway mode on Windows Server."
   ],
   [
    "Opening inbound internet ports to manage on-premises servers from the Azure portal.",
    "Arc-enabled servers use the Connected Machine agent, which connects outbound, so WAC through Arc needs no inbound internet ports."
   ],
   [
    "Assuming gateway access grants admin rights on managed servers.",
    "Gateway access only lets users connect through WAC. They still need appropriate permissions on each managed node."
   ]
  ],
  "tryit": [
   [
    "Briarwood Hospital installs WAC in gateway mode on WAC-GW01. Admins can open the gateway but are asked for credentials every time they select a server, and the Files tool fails on SRV-FILE02 even after entering credentials once. What do you configure?",
    "Configure resource-based Kerberos constrained delegation on each managed server, including SRV-FILE02, so WAC-GW01's computer account is allowed to delegate to it (Set-ADComputer with -PrincipalsAllowedToDelegateToAccount). Then purge or wait for Kerberos tickets to refresh. If a server still fails, check WinRM with Test-WSMan and the 5985 firewall rule."
   ],
   [
    "A company wants to manage 50 servers in a colocation facility from the Azure portal with WAC. Security forbids opening any inbound ports from the internet. What do you recommend?",
    "Onboard the servers to Azure Arc with the Connected Machine agent, which connects outbound only, then enable Windows Admin Center on the Arc-enabled servers and control access with Azure RBAC roles such as Windows Admin Center Administrator Login."
   ]
  ],
  "tip": "Repeated credential prompts through a WAC gateway point to Kerberos constrained delegation. For on-premises servers you want to manage from the Azure portal without opening inbound internet ports, the answer is Azure Arc plus Windows Admin Center.",
  "check": [
   [
    "Which WAC mode should you choose so a team of admins can share one installation?",
    "Gateway mode on Windows Server."
   ],
   [
    "How do you prevent double-hop credential prompts through a WAC gateway?",
    "Configure resource-based Kerberos constrained delegation on managed nodes so the gateway computer account may delegate to them."
   ],
   [
    "What controls who can use Windows Admin Center for an Azure VM from the portal?",
    "Azure RBAC role assignments, such as Windows Admin Center Administrator Login, with Entra ID sign-in."
   ],
   [
    "What protocol does WAC use to reach managed servers, and what quick test checks it?",
    "PowerShell remoting and WMI over WinRM; Test-WSMan checks that WinRM responds."
   ]
  ]
 },
 {
  "t": "PowerShell remoting: Enter-PSSession vs Invoke-Command, Just Enough Administration (JEA) role capability and session configuration files",
  "hook": "At Thornbury Water Authority, the help desk restarts the print spooler on file servers several times a week, and every technician is a local administrator on those servers to make that possible. Last month a technician, trying to free disk space, deleted a folder that turned out to hold billing exports. Now the security manager, Ines, wants two things: the help desk must keep fixing the spooler without being administrators, and every command they run must be recorded. Meanwhile, Ines's own team needs to check a service on 180 servers before a patch window tonight. How can one technology handle both a precise, restricted task and a sweeping, many-server one?",
  "simple": "PowerShell remoting lets you type commands on your computer that run on other computers over the network. You can either step into one remote computer and work there interactively, or send the same command to many computers at once and collect the answers. Just Enough Administration builds on this to give people a limited toolbox. Instead of handing someone the master keys, you create a special connection where they can only run the few commands you allow, and everything they do is recorded. It is like giving a cleaner a key that opens only the supply closet, not the whole building, and keeping a log of when it was used.",
  "body": [
   "PowerShell remoting lets you run commands on other computers over Windows Remote Management (WinRM), which listens on TCP 5985 for HTTP and 5986 for HTTPS. On Windows Server it is enabled by default; on clients you run `Enable-PSRemoting`. In a domain, Kerberos authenticates the connection and the WinRM traffic is encrypted even over HTTP, which surprises many learners. Outside a domain you typically use HTTPS with a certificate or add hosts to the TrustedHosts list, accepting that this weakens server authentication.",
   "There are two main ways to use remoting. `Enter-PSSession -ComputerName SRV01` opens an interactive one-to-one session: your prompt changes to `[SRV01]: PS>` and everything you type runs remotely until `Exit-PSSession`. It is ideal for hands-on troubleshooting of one server, much like a remote desktop session without the desktop.",
   "`Invoke-Command -ComputerName SRV01,SRV02,SRV03 -ScriptBlock { Get-Service Spooler }` is one-to-many. It runs a script block on many machines in parallel (32 at a time by default, adjustable with `-ThrottleLimit`) and returns deserialized objects tagged with a PSComputerName property, so you can sort and filter results by server. It suits automation and fan-out tasks, and you can pass a list of names from a file with `-ComputerName (Get-Content servers.txt)`. `New-PSSession` creates persistent sessions you can reuse with either cmdlet, keeping variables and loaded modules alive between commands, which is faster when you will run several commands against the same servers.",
   "It also helps to know that every remoting connection lands on a named endpoint, called a session configuration. The default endpoint, Microsoft.PowerShell, accepts members of the local Administrators group and the Remote Management Users group, which is why a standard user often gets access denied when trying to connect. `Get-PSSessionConfiguration` lists the endpoints registered on a server, and the `-ConfigurationName` parameter on Enter-PSSession, Invoke-Command and New-PSSession chooses which one to use. JEA, covered next, is simply a carefully restricted endpoint of this kind.",
   "Two behaviors catch people out. First, returned objects are deserialized snapshots: you get property values but not live methods, so calling `.Stop()` on a returned service object will not work; do the work inside the script block instead. Second, remoting has the second-hop problem: from inside a remote session you cannot use your Kerberos credentials to reach a third machine, such as a file share, unless you configure resource-based Kerberos constrained delegation or the Credential Security Support Provider (CredSSP). CredSSP works but sends reusable credentials to the remote host, where an attacker who controls it could steal them, so prefer delegation.",
   "Just Enough Administration (JEA) uses remoting to enforce least privilege. Instead of making help desk staff local administrators, you publish a constrained endpoint where they can run only the commands you allow, and those commands execute under a privileged temporary virtual account or a group managed service account. The user never holds administrative rights themselves; they only borrow them through the endpoint. JEA has two files, and the exam expects you to know which does what.",
   "The role capability file (`.psrc`, created with `New-PSRoleCapabilityFile`) defines what a role can do: `VisibleCmdlets` (optionally with allowed parameters and values, such as Restart-Service only with `-Name Spooler`), `VisibleFunctions`, `VisibleExternalCommands` and `VisibleProviders`. It must sit in a `RoleCapabilities` folder inside a PowerShell module in a module path on the target server, and its file name becomes the role name.",
   "The session configuration file (`.pssc`, created with `New-PSSessionConfigurationFile`) defines the endpoint itself: `SessionType = 'RestrictedRemoteServer'`, `RunAsVirtualAccount = $true` or `GroupManagedServiceAccount`, `TranscriptDirectory` for auditing every session, and `RoleDefinitions`, which map AD groups to role capabilities. You register it on each target server, which creates the named endpoint users connect to.",
   "```powershell\nNew-PSSessionConfigurationFile -Path .\\Helpdesk.pssc -SessionType RestrictedRemoteServer `\n  -RunAsVirtualAccount -TranscriptDirectory C:\\JEA\\Transcripts `\n  -RoleDefinitions @{ 'CORP\\Helpdesk' = @{ RoleCapabilities = 'ServiceOperator' } }\nRegister-PSSessionConfiguration -Name Helpdesk -Path .\\Helpdesk.pssc\n# User connects with:\nEnter-PSSession -ComputerName SRV01 -ConfigurationName Helpdesk\n```",
   "Connected users run in NoLanguage mode and see only the allowed commands, plus a handful of default ones needed for the session to work. `Get-PSSessionCapability -ConfigurationName Helpdesk -Username CORP\\alice` shows exactly what a given user will get, which is useful when someone reports a missing command. Test the file with `Test-PSSessionConfigurationFile` before registering, and review transcripts regularly. Be careful what you allow: exposing a cmdlet that can run arbitrary code or edit permissions can turn a restricted endpoint into a full administrator session."
  ],
  "analogy": "Enter-PSSession is like walking into one shop and talking to the clerk yourself. Invoke-Command is like sending the same order form to two hundred shops at once and getting a stack of receipts back. JEA is a staffed service window with a printed menu: the role capability file is the menu of allowed items, and the session configuration file decides which customers may use which window, who works behind it, and who keeps the receipt log. The analogy stops at receipts: returned objects are snapshots, so you cannot ask a receipt to do anything further.",
  "terms": [
   [
    "WinRM",
    "Windows Remote Management: the service and protocol that carries PowerShell remoting on ports 5985 and 5986."
   ],
   [
    "Enter-PSSession",
    "Opens an interactive one-to-one remote session on a single computer."
   ],
   [
    "Invoke-Command",
    "Runs a script block on one or many remote computers in parallel and returns the results."
   ],
   [
    "Role capability file",
    "A .psrc file defining the cmdlets, functions and commands a JEA role may use."
   ],
   [
    "Session configuration file",
    "A .pssc file defining a JEA endpoint: session type, run-as identity, transcripts and group-to-role mappings."
   ],
   [
    "Virtual account",
    "A temporary local administrator identity created for a JEA session and discarded when it ends."
   ]
  ],
  "example": "Helpdesk staff need to restart the print spooler on file servers but must not be admins. The admin creates a ServiceOperator.psrc allowing Restart-Service only with -Name Spooler, maps CORP\\Helpdesk to it in a .pssc, and registers the endpoint on each server with Invoke-Command.",
  "mistakes": [
   [
    "Putting group-to-role mappings in the .psrc file.",
    "The .psrc lists allowed commands. Group mappings (RoleDefinitions), run-as identity and transcripts belong in the .pssc."
   ],
   [
    "Using Enter-PSSession to run a command on hundreds of servers.",
    "Enter-PSSession is interactive with one computer. Invoke-Command fans out in parallel to many."
   ],
   [
    "Saving the .psrc anywhere on the server and expecting JEA to find it.",
    "It must be in a RoleCapabilities folder inside a PowerShell module located in a module path."
   ],
   [
    "Enabling CredSSP as the preferred second-hop fix.",
    "CredSSP exposes reusable credentials on the remote host. Prefer resource-based Kerberos constrained delegation."
   ]
  ],
  "tryit": [
   [
    "At Quarry Hill Schools, a technician uses Invoke-Command to collect service objects from 40 servers, then tries to call .Restart() on the returned objects in a loop, but it fails. Why, and what should they do instead?",
    "Objects returned by remoting are deserialized snapshots with properties but no live methods. Put the action inside the script block, for example Invoke-Command -ComputerName (list) -ScriptBlock { Restart-Service -Name Spooler }, so it runs on each server."
   ],
   [
    "Help desk staff connect to a JEA endpoint but cannot see Restart-Service, though it is listed in ServiceOperator.psrc. The .pssc maps CORP\\Helpdesk to ServiceOperator. What two things do you check?",
    "Check that ServiceOperator.psrc is in a RoleCapabilities folder of a module in a module path on that server (its file name must match the role name), and run Get-PSSessionCapability for an affected user to confirm group membership and the resulting command list. Also confirm the users are actually in CORP\\Helpdesk and that the endpoint was re-registered after changes."
   ]
  ],
  "tip": "Interactive with one server means Enter-PSSession; many servers at once means Invoke-Command. For JEA, the .psrc says what (commands) and the .pssc says who and how (groups, run-as account, transcripts).",
  "check": [
   [
    "Which JEA file maps an AD group to a role?",
    "The session configuration file (.pssc), in its RoleDefinitions entry."
   ],
   [
    "Where must a role capability file be placed for JEA to find it?",
    "In a RoleCapabilities subfolder of a PowerShell module in a module path on the target server."
   ],
   [
    "You need to run the same command on 200 servers. Which cmdlet fits?",
    "Invoke-Command, which fans out in parallel with a throttle limit."
   ],
   [
    "Which ports does WinRM use for HTTP and HTTPS?",
    "TCP 5985 for HTTP and TCP 5986 for HTTPS."
   ]
  ]
 },
 {
  "t": "Azure Arc-enabled servers: Connected Machine agent (azcmagent), at-scale onboarding with a service principal, extensions, tags and RBAC",
  "hook": "Halcyon Grocers runs 400 Windows servers: some in two datacenters, some in store back rooms, a few in another cloud provider from an old acquisition. Its Azure VMs already get policy checks, monitoring and update reports from one portal, but everything else is a patchwork of spreadsheets and scripts. Mei, the cloud lead, is asked to bring all of it under the same management in one quarter. The network team has one firm condition: no new inbound firewall rules at any store. And security has another: no one types a global admin password into 400 servers. How do you bring machines that will never live in Azure under Azure's control?",
  "simple": "Azure Arc lets you manage servers that are not in Microsoft's cloud, like servers in your own building or in another cloud, as if they were. You install a small helper program on each server. It reaches out to Azure over the normal secure web connection, so you do not need to open any doors in your firewall. Each server then shows up in the Azure website, where you can label it, control who manages it, apply rules and add tools. For hundreds of servers, you use a special robot account with only the permission to sign servers up, so no person has to log in on each one. It is like registering your personal car with a fleet-management service: the car stays in your garage, but it now reports to the fleet dashboard.",
  "body": [
   "Azure Arc extends Azure's management plane, the layer that handles resources, permissions and policy, to machines that are not Azure VMs: physical servers and VMs on-premises, in branch offices or in other clouds. Once a server is Arc-enabled, it appears in the Azure portal as a resource of type `Microsoft.HybridCompute/machines`, in a subscription and resource group you choose. You can then apply the same tools you use for Azure VMs: tags, Azure role-based access control (RBAC), Azure Policy, Azure Update Manager, Azure Monitor, Microsoft Defender for Cloud and VM extensions. The server itself does not move; only its management does.",
   "The bridge is the Azure Connected Machine agent, installed on each server. It includes the Hybrid Instance Metadata Service (HIMDS), which manages the connection and identity, the guest configuration (machine configuration) agent, which evaluates policy inside the operating system, and the extension manager, which installs and updates extensions. It communicates only outbound over HTTPS (TCP 443) to Azure, optionally through a proxy server or a private endpoint, so you do not open inbound ports. Each Arc server gets a system-assigned managed identity that it can use to authenticate to Azure services such as Key Vault without stored secrets.",
   "A little preparation saves pain. The subscription needs resource providers such as Microsoft.HybridCompute, Microsoft.GuestConfiguration and Microsoft.HybridConnectivity registered before onboarding. Network teams need the list of required Azure endpoints allowed outbound, and if a proxy is in the path, the agent must be configured to use it.",
   "The command-line tool is `azcmagent`. `azcmagent connect` links the machine to Azure, `azcmagent show` displays status, resource ID and agent version, `azcmagent check` tests network connectivity to the required endpoints, `azcmagent disconnect` removes the connection and deletes the Azure resource, and `azcmagent config` controls local settings such as a proxy URL or which extensions are allowed, letting a local administrator restrict what Azure can deploy. For one or two servers, the portal generates a script that installs the agent and signs you in interactively with a device code.",
   "For many servers you onboard at scale with a service principal, a Microsoft Entra ID identity for automation. Create one (the portal's Arc onboarding page can do it) and grant it the Azure Connected Machine Onboarding role, which allows it to onboard machines but not to manage them afterward. That least-privilege design means a leaked secret lets someone register machines but not run extensions on your fleet.",
   "Then run the generated script through Configuration Manager, Group Policy, Ansible or your own tooling. It installs the agent and calls `azcmagent connect --service-principal-id <id> --service-principal-secret <secret> --resource-group ... --tenant-id ... --location ... --subscription-id ...`. Protect the secret, scope the role assignment to one resource group, and give the secret a short expiry so it stops working once the rollout ends. Check progress in the portal's Azure Arc machines list, where a status of Connected confirms success and Disconnected or Expired flags servers to investigate.",
   "Extensions add capabilities after onboarding, just as on Azure VMs. Common ones are the Azure Monitor Agent for logs and metrics, the Custom Script Extension for running scripts, Microsoft Defender for Endpoint integration and the Key Vault extension for certificate sync. You can deploy extensions manually from the machine's Extensions page, or automatically with Azure Policy, which also remediates new servers as they are onboarded.",
   "Plan for the full life cycle as well. The agent sends regular heartbeats, and a server that stops checking in shows as Disconnected in the portal; extensions and policy evaluation resume when it reconnects. When you decommission a server, run `azcmagent disconnect` before wiping it, or delete the resource in the portal afterward, so you do not leave orphaned Arc resources that clutter compliance reports. Keep the agent itself updated, through Microsoft Update or your normal patching tool, so it supports current extensions and features.",
   "Tags are name/value pairs you apply to the Arc resource (for example `Environment=Prod`, `Owner=Finance`) to filter views, report costs and target policy assignments. Many teams tag during onboarding by adding tags to the connect command, so every server arrives already labeled by site or owner.",
   "RBAC controls who may manage the Arc resource. Azure Connected Machine Resource Administrator can manage machines and extensions, Reader can view them, and the Virtual Machine User Login and Virtual Machine Administrator Login roles can govern Entra ID sign-in where supported. Remember the boundary: Azure RBAC governs actions in Azure, such as deploying an extension, while local Windows accounts and AD still govern who can sign in to the server itself."
  ],
  "analogy": "Arc is like enrolling privately owned cars in a company fleet program. Each car gets a tracking box (the Connected Machine agent) that phones home over the cell network, so nobody has to open the garage door. The fleet dashboard can label cars, decide which managers may send instructions, and push add-ons such as a dashcam (extensions). A temporary enrollment clerk can register cars but cannot drive them (the onboarding role). The analogy stops at the keys: fleet permissions do not change who holds the car's physical keys, just as Azure RBAC does not change local server sign-in.",
  "terms": [
   [
    "Azure Arc-enabled server",
    "A non-Azure machine represented in Azure as a Microsoft.HybridCompute/machines resource for management."
   ],
   [
    "Connected Machine agent",
    "The agent installed on non-Azure servers that connects them to Azure Arc over outbound HTTPS."
   ],
   [
    "azcmagent",
    "The command-line tool for connecting, checking and configuring the Arc agent."
   ],
   [
    "Service principal",
    "An Entra ID application identity used by scripts to onboard servers without interactive sign-in."
   ],
   [
    "Azure Connected Machine Onboarding",
    "A built-in role that allows onboarding Arc machines but not managing them."
   ],
   [
    "VM extension",
    "A small add-on application Azure deploys and manages on a VM or Arc-enabled server."
   ],
   [
    "Tag",
    "A name/value label on an Azure resource used for filtering, cost reporting and policy targeting."
   ]
  ],
  "example": "A company with 400 on-premises Windows servers creates a service principal with the Azure Connected Machine Onboarding role scoped to the rg-arc-onprem resource group, pushes the onboarding script through Configuration Manager, tags each server by site, and uses Azure Policy to deploy the Azure Monitor Agent to all of them.",
  "mistakes": [
   [
    "Opening inbound ports so Azure can reach Arc servers.",
    "The Connected Machine agent connects outbound over HTTPS 443 only. No inbound ports are required."
   ],
   [
    "Granting the onboarding service principal Contributor or Owner on the subscription.",
    "Use the Azure Connected Machine Onboarding role scoped to the target resource group; it can onboard but not manage machines."
   ],
   [
    "Assuming Azure RBAC roles control who can sign in to the server's desktop.",
    "Azure RBAC controls actions on the Azure resource. Local accounts and AD still control sign-in, except where Entra ID login roles are supported and configured."
   ],
   [
    "Using azcmagent show to troubleshoot blocked network endpoints.",
    "azcmagent show displays status; azcmagent check tests connectivity to the required endpoints."
   ]
  ],
  "tryit": [
   [
    "Sable Point Credit Union pushes the Arc onboarding script to 60 branch servers. Fifty-two connect; eight show errors, and all eight are at branches that route internet traffic through a proxy server. What do you do first on one of the failing servers?",
    "Run azcmagent check to test connectivity to the required endpoints. If it fails through the proxy, configure the agent's proxy setting with azcmagent config (or the onboarding script's proxy parameter) and make sure the proxy allows the required Azure endpoints, then run the connect again."
   ],
   [
    "After onboarding, an auditor asks who can deploy the Custom Script Extension to Arc servers. Several engineers have the Azure Connected Machine Onboarding role, and two have Azure Connected Machine Resource Administrator. Who can deploy it?",
    "Only the two engineers with Azure Connected Machine Resource Administrator (or broader roles such as Contributor). The onboarding role can register machines but cannot manage extensions afterward. A local administrator can also limit which extensions are allowed on a server with azcmagent config."
   ]
  ],
  "tip": "Onboarding many servers without interactive sign-in points to a service principal with the Azure Connected Machine Onboarding role. Arc needs only outbound 443; if a question suggests opening inbound ports for Arc, it is wrong.",
  "check": [
   [
    "Which azcmagent command verifies that a server can reach the required Azure endpoints?",
    "azcmagent check."
   ],
   [
    "What least-privilege role should an onboarding service principal have?",
    "Azure Connected Machine Onboarding, scoped to the target resource group."
   ],
   [
    "Which network direction does the Connected Machine agent require?",
    "Outbound HTTPS (443) only; no inbound ports."
   ],
   [
    "How can you automatically deploy the Azure Monitor Agent to every Arc-enabled server, including future ones?",
    "Assign an Azure Policy that deploys the extension, with remediation for existing machines."
   ]
  ]
 },
 {
  "t": "Azure Policy and machine configuration for Arc-enabled and Azure servers; audit vs deploy effects",
  "hook": "It is Tuesday morning at Lakeshore Regional Health, and Omar from the compliance office has a simple request: prove that every Windows server, the forty Azure VMs and the ninety on-premises machines you connected with Azure Arc last month, runs the Azure Monitor Agent and enforces the corporate password policy. You assigned a built-in policy last week, and the dashboard says new servers are compliant. Yet the compliance chart still shows a wall of red for the older ones, and the password check does not seem to look inside Windows at all. Did the policy fail, or did you pick the wrong tool and the wrong effect?",
  "simple": "Azure Policy is a rule checker for your Azure resources. You write or pick a rule, such as 'every server must have the monitoring add-on', and point it at a group of resources. Each rule says what to do when something breaks it: just report it, block it, or fix it automatically. Servers in your own building that you connect to Azure through a tool called Azure Arc get checked the same way. A related feature, machine configuration, looks inside Windows itself, at things like password rules and installed programs. Think of a building inspector: some inspectors only write a report, some stop construction, and some send a crew to fix the problem. Fixing old buildings still needs a separate work order, called a remediation task.",
  "body": [
   "Azure Policy evaluates Azure resources against rules and reports or enforces compliance. A policy definition is a JSON (JavaScript Object Notation) rule with two parts: a condition that describes which resources it cares about and what counts as a violation, and an effect that decides what happens when a resource matches. An initiative, also called a policy set, groups related definitions so you can assign and track them together, such as a security baseline or a set of monitoring requirements. An assignment applies a definition or initiative to a scope: a management group, a subscription or a resource group, with optional exclusions for resources you deliberately leave out and parameters such as an allowed list of regions. Because Azure Arc-enabled servers are represented as Azure resources of type Microsoft.HybridCompute/machines, the same assignments cover them alongside Azure virtual machines (VMs). That is the main reason hybrid administrators care about Policy: one rule, one compliance report, every server.",
   "The effect is the most tested part of this topic. Audit logs non-compliance in the activity log and the compliance view but changes nothing. AuditIfNotExists flags a resource when a related resource, such as a VM extension, is missing. Deny blocks create or update requests that violate the rule, so a noncompliant deployment fails with a policy error before anything is built. Modify adds, changes or removes tags and certain properties. Append adds fields to a request. DeployIfNotExists (DINE) deploys a related resource when it is missing, for example installing the Azure Monitor Agent extension on a server that lacks it. Disabled turns the policy off without removing the assignment, which is useful for testing or for temporarily silencing a rule.",
   "DeployIfNotExists and Modify are the deploy effects, and they behave in a specific way that the exam likes to probe. They act automatically on resources that are created or updated after the assignment exists. Resources that already existed and were noncompliant when you assigned the policy are only reported; they are not fixed until you create a remediation task, which runs the deployment against them. Because the policy itself makes changes, the assignment needs a managed identity with the right role-based access control (RBAC) roles, for example a role that can write VM extensions. The portal creates a system-assigned identity and grants the roles listed in the definition when you assign it, and you can choose a user-assigned identity instead. If remediation fails with an authorization error, the identity is the first thing to check.",
   "A sensible rollout follows a pattern. Assign the policy with an Audit or AuditIfNotExists effect first to measure the impact without changing anything. Review the compliance results and talk to the owners of the failing resources. Then switch the effect, often through a parameter, to DeployIfNotExists, and run remediation in batches. Rolling out Deny directly can break automated deployments that nobody knew were noncompliant, so it usually comes last and after communication.",
   "Azure Policy by itself checks Azure Resource Manager properties, the outside of the machine: its size, its location, its tags, whether an extension resource exists. It cannot see whether the Guest account is disabled or whether a registry value is set. Machine configuration, formerly called Azure Policy guest configuration, looks inside the operating system: installed applications, registry settings, password policy, certificates and services. It relies on a small agent that is built into the Azure Connected Machine agent on Arc-enabled servers and is installed on Azure VMs as the machine configuration extension (Microsoft.GuestConfiguration). It also needs a system-assigned managed identity on the machine so it can authenticate to the service. Built-in policies, often grouped in a prerequisites initiative, can deploy both the extension and the identity to Azure VMs for you.",
   "Machine configuration assignments have their own modes, separate from the policy effects. Audit only reports whether the operating system matches the configuration. ApplyAndMonitor applies the configuration once and then reports drift without correcting it. ApplyAndAutoCorrect applies it and corrects drift whenever it is detected, so a setting someone changes by hand is put back. Configurations are authored with PowerShell Desired State Configuration (DSC), packaged and published to storage for policy to reference, and Microsoft supplies built-in ones such as the Windows security baseline audit, which compares a server's settings against Microsoft's recommended baseline.",
   "You read the results on the Policy Compliance blade, which shows a percentage per assignment and lets you drill down to each resource and the specific reason it failed. For machine configuration you can drill further to see which individual settings inside the guest did not match. Evaluation runs on a regular cycle and also when resources are created or changed, so a brand-new assignment may take a while to show results. If you do not want to wait, you can trigger an on-demand evaluation with `Start-AzPolicyComplianceScan`, optionally scoped to a resource group.",
   "For the exam, keep three ideas straight. Choose the effect by the verb in the question: report means Audit or AuditIfNotExists, prevent means Deny, fix means DeployIfNotExists or Modify. When new resources become compliant but old ones stay red, the missing step is a remediation task. And any requirement about settings inside Windows, rather than properties of the Azure resource, points to machine configuration."
  ],
  "analogy": "Think of Azure Policy as a city's building department. An inspector with an Audit effect writes a report. One with Deny refuses to issue a permit, so the building is never started. One with DeployIfNotExists sends a crew to add a missing fire extinguisher to every new building. Old buildings get a crew only when someone files a work order, which is the remediation task. Machine configuration is the inspector who goes inside to check the wiring. The analogy stops at timing: real policy evaluation is periodic and on change, not a single visit.",
  "terms": [
   [
    "Policy definition",
    "A JSON rule with a condition and an effect that Azure Policy evaluates against resources."
   ],
   [
    "Policy assignment",
    "The binding of a policy definition or initiative to a scope with parameters and exclusions."
   ],
   [
    "Initiative",
    "A group of policy definitions assigned and tracked together, also called a policy set."
   ],
   [
    "DeployIfNotExists",
    "A policy effect that deploys a related resource when it is missing; needs a managed identity and remediation for existing resources."
   ],
   [
    "Remediation task",
    "A job that applies DeployIfNotExists or Modify changes to resources that already existed when the policy was assigned."
   ],
   [
    "Machine configuration",
    "Azure Policy's in-guest auditing and configuration of operating system settings on Azure VMs and Arc-enabled servers."
   ],
   [
    "ApplyAndAutoCorrect",
    "A machine configuration mode that applies a configuration and corrects drift every time it is detected."
   ]
  ],
  "example": "Compliance requires the Azure Monitor Agent on every server. The admin assigns a built-in DeployIfNotExists initiative at the subscription, which installs the agent on new Azure VMs and Arc-enabled servers automatically, then creates a remediation task to fix the 120 existing servers. For the password rule, she assigns a machine configuration policy in Audit mode and reviews which servers fail the in-guest check.",
  "mistakes": [
   [
    "Assigning a DeployIfNotExists policy fixes every existing noncompliant server right away.",
    "DINE and Modify act automatically only on new or updated resources. Existing resources stay noncompliant until you run a remediation task."
   ],
   [
    "Azure Policy alone can check a Windows password policy or registry value.",
    "Plain Azure Policy sees Azure Resource Manager properties. Settings inside the operating system need machine configuration, with its agent and a managed identity."
   ],
   [
    "Audit and Deny are interchangeable because both flag the problem.",
    "Audit only reports and lets the resource exist. Deny blocks the create or update request, which can break deployments if rolled out without testing."
   ],
   [
    "Arc-enabled servers need a separate on-premises compliance tool.",
    "Arc-enabled servers are Azure resources, so the same policy assignments and the same compliance view cover them alongside Azure VMs."
   ]
  ],
  "tryit": [
   [
    "Pacific Freight wants to stop anyone from creating VMs outside two approved regions, and separately wants a report of which existing servers lack a backup tag, without changing anything yet. An engineer proposes one DeployIfNotExists policy for both. What should you assign instead?",
    "Use the Deny effect with an allowed-locations rule for the region requirement, because the goal is to prevent creation. Use Audit for the missing tag, because the goal is only to report for now. DINE is wrong for both: it deploys related resources and is not designed to block requests or simply report."
   ],
   [
    "After assigning a DINE policy that installs a monitoring extension, the remediation task fails on every server with an authorization error. Newly created VMs also fail to get the extension. What is the likely cause?",
    "The assignment's managed identity lacks the RBAC role needed to write extensions, or the identity was removed. Grant the roles listed in the policy definition to the assignment's identity, then rerun remediation."
   ]
  ],
  "tip": "Audit reports, Deny blocks, DINE and Modify change things. If a question says new resources are compliant but old ones are not, the missing step is a remediation task. Anything about settings inside Windows needs machine configuration.",
  "check": [
   [
    "Which effect should you use to install a missing extension automatically?",
    "DeployIfNotExists, because it deploys a related resource when the condition finds it missing."
   ],
   [
    "Why does a DINE assignment need a managed identity?",
    "The policy deploys resources on your behalf and needs RBAC permissions to do so."
   ],
   [
    "Which machine configuration mode fixes drift every time it is detected?",
    "ApplyAndAutoCorrect. ApplyAndMonitor applies once and only reports later drift."
   ],
   [
    "What does machine configuration need on an Azure VM before it can evaluate settings?",
    "The machine configuration extension (Microsoft.GuestConfiguration) and a system-assigned managed identity."
   ]
  ]
 },
 {
  "t": "Azure Update Manager: assessments, one-time updates, maintenance configurations; hotpatching for Windows Server",
  "hook": "At 4:15 p.m. on a Thursday, Grace, the security lead at Juniper Valley Schools, forwards you a vendor advisory: a critical Windows Server vulnerability, patch available, apply as soon as possible. You manage sixty servers, half of them Azure VMs and half on-premises machines connected through Azure Arc. Your monthly patch window is not until the second Saturday, and the payroll servers cannot reboot during business hours. Last month, two Azure VMs ignored the schedule entirely and patched themselves at random times. Tonight you need to know which servers are missing the fix, push it to the urgent ones now, and make sure the regular schedule actually works. Where do you start?",
  "simple": "Servers need regular software fixes, called updates or patches, to close security holes. Azure Update Manager is one place in Azure where you can see which servers are missing updates and install them, whether the server lives in Azure or in your own building. First it checks each server and makes a list of what is missing. Then you either install fixes right now, for an emergency, or set up a regular schedule, like 'every second Saturday from 1 a.m. to 4 a.m.'. Hotpatching is a special way of applying security fixes while programs keep running, so the server rarely needs a restart. It is like fixing a car's engine while it idles, except for a few planned stops each year.",
  "body": [
   "Azure Update Manager is Azure's unified service for Windows and Linux updates on Azure VMs and Azure Arc-enabled servers. It replaced the older Azure Automation Update Management solution, which depended on an Automation account, a Log Analytics workspace and the now-retired Log Analytics agent. Update Manager is built into Azure, needs no Automation account or Log Analytics workspace, and works through a VM extension that it installs when needed. In the portal you see all machines in one view, with counts of pending updates by classification, the last assessment time and whether each machine is compliant. Because Arc-enabled servers are Azure resources, an on-premises server shows up in the same list as an Azure VM.",
   "Assessment is the first job, because you cannot patch what you have not measured. An assessment checks each machine for missing updates and reports them by classification: critical updates, security updates, update rollups, definition updates, feature packs and so on, along with the Knowledge Base (KB) article number for each. You can run Check for updates on demand on one or many machines, which is what you would do the evening an advisory lands. You can also enable periodic assessment, which rechecks automatically about every 24 hours so the dashboard stays current. A built-in Azure Policy can turn on periodic assessment across a subscription, which means new machines are covered without anyone remembering to tick a box.",
   "Installing updates happens in two ways. A one-time update, shown in the portal as Update now or a one-time install, lets you pick machines, classifications, specific KB numbers to include or exclude, a maximum duration and the reboot behavior (reboot if required, never reboot or always reboot), and run it immediately. It is ideal for an urgent patch such as the advisory in the opening scene. For routine patching you create a maintenance configuration: a schedule with a start time, recurrence and time zone, a maintenance window length, the classifications or KBs to include, and the reboot setting. Update Manager stops starting new installs when the window is nearly over, so a long window matters on servers with many pending updates.",
   "Machines join a maintenance configuration in two ways. You can attach them statically, by picking specific VMs and servers. Or you can use dynamic scopes, which select machines by rules on subscription, resource group, location, operating system type or tags. Dynamic scopes are powerful because a newly built server tagged PatchGroup=Web is automatically included the next time the schedule runs. Maintenance configurations also support pre- and post-maintenance events, which can trigger scripts or automation, for example draining a node from a load balancer before patching and adding it back afterward.",
   "Azure VMs have a setting that trips people up. For scheduled patching to take effect, the VM's patch orchestration mode must be Customer Managed Schedules. This sets the patch mode to AutomaticByPlatform with a flag that lets your schedule take control instead of Azure's own automatic guest patching. If you leave Windows Update's own automatic settings in charge, or the VM is set to a different orchestration mode, the machine may patch on its own timetable and your maintenance configuration may not apply as expected. That is the likely explanation for VMs that ignore a schedule.",
   "Hotpatching changes how often servers reboot for security updates. It installs fixes by patching the code of running processes in memory, so the change takes effect without restarting. It works on a cycle. A baseline month installs a full cumulative update and requires a restart. It is followed by hotpatch months that deliver security fixes without restarting. Baselines come quarterly, so a hotpatch-enabled server typically reboots about four times a year for planned updates, plus any unplanned baseline Microsoft releases when a fix cannot be delivered as a hotpatch. Non-security fixes and new features generally wait for the next baseline.",
   "Availability is specific and worth learning precisely. Hotpatching is available for Windows Server Datacenter: Azure Edition on Azure, including Azure Local. For Windows Server 2025 machines on-premises, it is available when they are connected through Azure Arc, as a paid subscription option, and it requires virtualization-based security (VBS) to be enabled on the server. You enroll machines and see which months are baselines and which are hotpatch months in Update Manager, so planned restart windows can be aligned with baseline months.",
   "When troubleshooting, start with each machine's update history in Update Manager, which shows each run, its result and any failed KBs. Then check the extension status on the machine's Extensions blade, because a failed or missing extension stops both assessment and installation. On the server itself, the Windows event logs for Windows Update show download and install errors. Arc-enabled servers must be connected, with the Connected Machine agent showing a healthy status, and must have outbound access to the required Azure endpoints for the extension to work."
  ],
  "analogy": "Update Manager is like a fleet maintenance office for company vehicles. Assessment is the inspection that lists what each vehicle needs. A one-time update is sending a car to the garage today because of a safety recall. A maintenance configuration is the standing booking every second Saturday for every vehicle with a certain fleet sticker, which is the dynamic scope. Hotpatching is a mechanic who can swap parts while the engine runs, but every quarter the car still goes into the shop for a full service, the baseline restart.",
  "terms": [
   [
    "Assessment",
    "A scan that lists the updates missing on a machine, grouped by classification and KB number."
   ],
   [
    "Periodic assessment",
    "Automatic recurring check, about every 24 hours, for missing updates on a machine."
   ],
   [
    "One-time update",
    "An immediate, ad hoc update installation on selected machines."
   ],
   [
    "Maintenance configuration",
    "A scheduled update policy with window, recurrence, update selection and reboot settings, applied to machines or dynamic scopes."
   ],
   [
    "Dynamic scope",
    "Rule-based machine selection for a maintenance configuration using subscription, resource group, location, OS type or tags."
   ],
   [
    "Customer Managed Schedules",
    "The Azure VM patch orchestration mode required for maintenance configurations to control patching."
   ],
   [
    "Hotpatching",
    "Applying security updates in memory without a reboot, between quarterly baseline cumulative updates."
   ]
  ],
  "example": "An admin creates a maintenance configuration for the second Saturday of every month, 01:00 to 04:00, with a dynamic scope on the tag PatchGroup=Web. Every Azure VM and Arc-enabled server with that tag is patched in that window, and a new web server is picked up automatically once it is tagged. When an urgent advisory arrives midweek, she runs Check for updates and then a one-time update for that KB only on the affected servers.",
  "mistakes": [
   [
    "Update Manager needs a Log Analytics workspace and an Automation account, like the old solution.",
    "That was Automation Update Management. Update Manager is built into Azure and uses a VM extension, with no workspace or Automation account required."
   ],
   [
    "Creating a maintenance configuration is enough for any Azure VM to follow it.",
    "The VM's patch orchestration must be Customer Managed Schedules. Otherwise the VM may patch on another timetable and ignore your schedule."
   ],
   [
    "Hotpatching means a server never reboots for updates.",
    "Baseline months, roughly quarterly, install a full cumulative update and require a restart, and Microsoft can release an unplanned baseline."
   ],
   [
    "Hotpatching works on any Windows Server edition anywhere.",
    "It applies to Windows Server Datacenter: Azure Edition on Azure (including Azure Local) and to Windows Server 2025 on-premises through Azure Arc as a paid option with virtualization-based security."
   ]
  ],
  "tryit": [
   [
    "Copperline Retail adds ten new web servers every month and keeps forgetting to attach them to the patch schedule. All web servers carry the tag Role=Web. The team wants new servers patched in the existing Saturday window with no manual step. What should you configure?",
    "Add a dynamic scope to the existing maintenance configuration that selects machines with the tag Role=Web. New servers are included automatically once tagged. For new Azure VMs, also make sure their patch orchestration is Customer Managed Schedules so the schedule can take control."
   ],
   [
    "A zero-day fix must be installed tonight on twelve servers, but the next maintenance window is in nine days. Which Update Manager feature fits?",
    "A one-time update targeting those twelve machines with the specific KB included and an appropriate reboot setting. Maintenance configurations are for recurring windows, not emergencies."
   ]
  ],
  "tip": "Scheduled patching on an Azure VM will not work unless the patch orchestration is Customer Managed Schedules. Urgent single fixes point to one-time update; recurring windows point to a maintenance configuration. Hotpatch servers still reboot in baseline months.",
  "check": [
   [
    "What must you set on an Azure VM before a maintenance configuration can patch it on your schedule?",
    "Patch orchestration set to Customer Managed Schedules (patch mode AutomaticByPlatform with schedule bypass)."
   ],
   [
    "In a hotpatch cycle, which months require a reboot?",
    "Baseline months, when the full cumulative update is installed (roughly quarterly), plus any unplanned baseline."
   ],
   [
    "How can new machines be included in a patch schedule automatically?",
    "Use a dynamic scope on the maintenance configuration, for example based on tags."
   ],
   [
    "How often does periodic assessment check for missing updates?",
    "About every 24 hours."
   ]
  ]
 },
 {
  "t": "Azure Automation runbooks and hybrid runbook workers",
  "hook": "Every Friday at Maple Hollow Bank, Theo on the infrastructure team spends two hours on the same chore: finding Active Directory accounts nobody has used in 90 days and disabling them, then cleaning old log files off three file servers. He wrote a PowerShell script for it, uploaded it to Azure Automation, scheduled it, and went home proud. Monday morning, the job history shows red: the script could not find a domain controller and could not reach the file servers at all. The same script works perfectly on his own workstation. Nothing is wrong with the code. So why does Azure fail where his laptop succeeds?",
  "simple": "Azure Automation is a service that runs your scripts for you, on a timer or when something happens, so you do not have to click through the same chores every week. Each script is called a runbook. Normally Azure runs it on its own computers in the cloud, which cannot see the servers inside your office network. A hybrid runbook worker fixes that: you pick one of your own servers, and it asks Azure for jobs and runs them locally, where it can reach everything nearby. It is like a cleaning company that sends instructions to someone who already works inside your building, because the outside crew cannot get past the locked door.",
  "body": [
   "Azure Automation is a cloud service for running scripts, called runbooks, on a schedule or on demand. Everything lives in an Automation account, the Azure resource that holds runbooks, schedules, modules and shared assets. Runbooks let you automate repetitive administration: shutting down test VMs at night to save money, rotating keys, cleaning up old files, disabling stale accounts or responding to monitoring alerts. Each run is a job, and the job history records its status, output, warnings and errors, which is the first place to look when something fails.",
   "Several runbook types exist, and you choose one when you create the runbook. PowerShell runbooks run standard PowerShell scripts and are the most common choice for Windows administrators. Python runbooks run Python scripts. Graphical runbooks are built by dragging activities onto a canvas and linking them, which suits people who prefer not to write code. PowerShell Workflow runbooks are an older type based on Windows Workflow Foundation and are rarely chosen for new work. Every runbook has a draft version that you edit and test in the test pane, and a published version that schedules, webhooks and alerts actually run. Publish after every change, or your fix will sit in the draft and the old code will keep running.",
   "Runbooks can start in several ways. You can start them manually in the portal. You can link a schedule to the runbook for recurring runs. You can create a webhook, an HTTPS URL that starts the runbook when an external system or alert calls it; the URL contains a token and is shown only once when created, so store it securely, for example in a secret store. Azure Monitor alerts can start runbooks through action groups, and PowerShell can start one with `Start-AzAutomationRunbook`. Parameters can be passed in each case.",
   "Shared assets keep secrets and settings out of code. Credentials store a username and password, variables store values that can optionally be encrypted, certificates store certificates for authentication, and connections store connection details for services. A runbook reads them with cmdlets such as `Get-AutomationPSCredential` or `Get-AutomationVariable`, so a password change happens in one place. To reach Azure resources, runbooks authenticate with the Automation account's managed identity by running `Connect-AzAccount -Identity`. Managed identities replaced the retired Run As accounts, which relied on certificates that expired. Grant the identity only the role-based access control (RBAC) roles it needs on the resources it must manage.",
   "By default runbooks run in an Azure sandbox, a Microsoft-hosted environment that cannot see your on-premises network. That explains the opening scene: the script could not reach a domain controller because the sandbox has no route to it. A hybrid runbook worker solves this. It is a Windows or Linux machine you designate, on-premises, in another cloud or in Azure, that pulls runbook jobs from Azure Automation over outbound HTTPS and runs them locally. No inbound firewall port needs to be opened, because the worker initiates the connection. A runbook running on a worker can manage Active Directory Domain Services (AD DS), file servers, local databases or anything else reachable from that machine.",
   "Workers belong to hybrid worker groups. When you start or schedule a runbook, you choose where it runs: Azure, meaning the sandbox, or a specific hybrid worker group. Any available worker in the group picks up the job, so placing two or more workers in a group gives you resilience if one is down for patching.",
   "The current deployment model is extension-based hybrid workers, installed as a VM extension on Azure VMs or Azure Arc-enabled servers. The older agent-based model relied on the Log Analytics agent, which is retired, so existing agent-based workers should be migrated to the extension-based model. Azure Arc is therefore the usual path for on-premises workers: Arc-enable the server so it appears as an Azure resource, then add it to a hybrid worker group, and the extension is deployed for you.",
   "Two practical details cause many failures. First, identity on the worker: jobs run as Local System by default, which has no rights in the domain. For tasks needing domain permissions, set hybrid worker credentials on the group from a credential asset, so every job on that group runs as that account, or have the runbook read a credential asset and use it explicitly. Second, modules: PowerShell modules a runbook needs, such as the ActiveDirectory module, must be installed on the worker machine itself, not only imported into the Automation account. Modules in the account are used by the sandbox; the worker uses what is installed locally."
  ],
  "analogy": "Think of the Automation account as a dispatch office and runbooks as written work orders. The sandbox is a crew from the dispatch office that can only work outside your building. A hybrid runbook worker is an employee who already works inside, phones dispatch every so often to ask for new work orders, and carries them out on site. The analogy stops in one place: that inside employee only has the tools (modules) and keys (credentials) you give them locally, not whatever the dispatch office owns.",
  "terms": [
   [
    "Automation account",
    "The Azure resource that holds runbooks, schedules, modules and shared assets."
   ],
   [
    "Runbook",
    "A PowerShell, Python or graphical script run by Azure Automation; only the published version runs in production."
   ],
   [
    "Webhook",
    "An HTTPS URL that starts a specific runbook when called, shown only once at creation."
   ],
   [
    "Shared assets",
    "Credentials, variables, certificates and connections stored in the Automation account for runbooks to use."
   ],
   [
    "Hybrid runbook worker",
    "A machine you manage that runs Automation jobs locally so runbooks can reach on-premises resources."
   ],
   [
    "Hybrid worker group",
    "A set of hybrid workers; jobs targeted to the group run on any available member."
   ],
   [
    "Hybrid worker credentials",
    "A credential asset set on a worker group so jobs run as that account instead of Local System."
   ]
  ],
  "example": "Every night a runbook must disable AD accounts inactive for 90 days. The sandbox cannot reach the domain, so the admin Arc-enables two member servers, adds them to a hybrid worker group with hybrid worker credentials that have delegated rights, installs the ActiveDirectory module on both and schedules the runbook to run on that group.",
  "mistakes": [
   [
    "Editing a runbook and saving it means the schedule will run the new code.",
    "Schedules and webhooks run the published version. Until you publish, the draft is ignored."
   ],
   [
    "A runbook in the Azure sandbox can reach on-premises servers over the company VPN.",
    "The sandbox is Microsoft-hosted and has no connectivity to your network. Use a hybrid runbook worker."
   ],
   [
    "Run As accounts are the way runbooks authenticate to Azure.",
    "Run As accounts are retired. Use the Automation account's managed identity with Connect-AzAccount -Identity and grant it RBAC roles."
   ],
   [
    "Importing a module into the Automation account makes it available on hybrid workers.",
    "Workers use modules installed locally on the machine. Install required modules on every worker in the group."
   ]
  ],
  "tryit": [
   [
    "Birchwood Dental's runbook works when tested in the sandbox against Azure VMs, but after you change it to run on a hybrid worker group to reach an on-premises file server, it fails with 'The term Get-ADUser is not recognized'. The worker is online and picks up the job. What is wrong?",
    "The ActiveDirectory module is not installed on the worker machine. Modules imported into the Automation account serve the sandbox; hybrid workers use their local modules. Install the module, for example via RSAT, on each worker in the group."
   ],
   [
    "A runbook on a hybrid worker can read files but gets access denied when it tries to disable domain accounts. Jobs are running with default settings. What should you change?",
    "Jobs run as Local System by default, which has no domain rights. Configure hybrid worker credentials on the group from a credential asset with delegated permissions, or have the runbook use a credential asset explicitly."
   ]
  ],
  "tip": "If a runbook must touch on-premises resources, the answer is a hybrid runbook worker. If a runbook change seems ignored, it was probably never published. For authenticating to Azure, choose the managed identity, not Run As.",
  "check": [
   [
    "Why can a runbook running in Azure not reach an on-premises file server?",
    "It runs in a Microsoft-hosted sandbox with no connectivity to your network; use a hybrid runbook worker."
   ],
   [
    "What is the recommended way to deploy a hybrid runbook worker on an on-premises server today?",
    "Arc-enable the server and deploy the extension-based hybrid worker to it."
   ],
   [
    "Which identity should a runbook use to manage Azure resources?",
    "The Automation account's managed identity, granted the needed RBAC roles."
   ],
   [
    "Why should you save a webhook URL immediately when you create it?",
    "It is shown only once at creation and cannot be retrieved later."
   ]
  ]
 },
 {
  "t": "Storage Migration Service: inventory, transfer and cut over of file servers, including identity takeover",
  "hook": "The file server at Cedar Point Engineering, FS01, has been running since before most of the staff were hired. It holds twelve years of drawings, forty shares with carefully tuned permissions, a few local groups nobody remembers creating, and a name that is baked into hundreds of mapped drives, shortcuts and old scripts. Its hardware warranty ended last spring, and Rosa, the office manager, has one request: replace it over a weekend and make sure nobody notices on Monday. Copying the files is the easy part. Keeping the name, the address, the shares and the permissions is the hard part. How do you swap the server out from under everyone without breaking a single drive letter?",
  "simple": "When an old file server is replaced, people expect their shared folders and drive letters to keep working. Storage Migration Service is a built-in Windows Server tool that does the move in three steps. First it takes stock of what the old server has: folders, shares and who may open them. Then it copies everything to the new server, and it can copy again later to pick up only what changed. Finally, it can give the new server the old server's name and network address, so every computer that was talking to the old one now talks to the new one without being told. It is like moving a shop to a new building and also moving the street address sign, so customers still arrive at the right door.",
  "body": [
   "Old file servers are among the hardest workloads to retire. They hold years of data, share permissions and NTFS (New Technology File System) permissions, local users and groups and, most troublesome of all, a server name and IP address that users, scripts, Distributed File System (DFS) links and mapped drives depend on. Storage Migration Service (SMS) is a Windows Server feature that moves all of that to a new server in a guided, repeatable way, and it can make the new server take over the old one's identity so clients do not notice.",
   "SMS has three parts. The orchestrator is a server running Windows Server 2019 or later with the Storage Migration Service feature installed; it coordinates the job and stores its state, and you drive it from the Storage Migration Service tool in Windows Admin Center (WAC) or with PowerShell. The source is the old server, which can be a much older Windows Server release or even a Samba-based Linux server or network attached storage (NAS) device. The destination is the new Windows Server, on-premises or an Azure VM. Installing the Storage Migration Service Proxy on a destination running Windows Server 2019 or later speeds up transfers because data can flow more directly. In smaller environments the orchestrator role can live on the destination itself.",
   "A few prerequisites save a lot of grief. The account you use needs administrator rights on the source, the destination and the orchestrator. Firewalls must allow Server Message Block (SMB), Remote Procedure Call (RPC) and Windows Management Instrumentation (WMI) traffic, which in practice means enabling the File and Printer Sharing, Netlogon and WMI rule groups on the machines involved. If these are missing, inventory usually fails right away with a connection or access error, which is a helpful early signal.",
   "A migration job runs in three phases. Inventory connects to the source and records its shares, share settings, files and folders, security settings, local users and groups, and network configuration. You review the results in WAC before moving anything, which is a chance to notice an unexpected share or a huge folder of old backups that should not be migrated at all.",
   "Transfer copies data, shares and permissions to the destination volumes you map. You choose which source volume goes to which destination volume and can exclude shares. Transfer also migrates local users and groups, with options for how passwords are handled. A validation option can check the destination before transfer starts. The key operational feature is that you can run a transfer again later and SMS copies only the files that changed since the last pass. That lets you do the large initial copy days ahead, then a short final delta pass just before cutover, which keeps the outage small even for servers with terabytes of data.",
   "Cut over is the phase that makes SMS special. It moves the source's computer name and its IP addresses to the destination. The destination is renamed to the source's name, takes over its Active Directory computer account identity and IP configuration, and the source is renamed to a new random or chosen name and given a different IP address so it no longer conflicts. Both servers restart during this phase, so it belongs in a maintenance window. Afterward, clients, DFS links and mapped drives that reference the old name or address simply start using the new server, because from their point of view nothing changed. Cut over is optional: you can stop after transfer if you prefer to repoint clients yourself or to give the new server a new name on purpose.",
   "Plan the cutover carefully. Confirm that you have local administrator credentials for both servers, because renames and domain account changes can briefly break domain trust and leave you unable to sign in with a domain account. Keep the old server offline but intact until users confirm everything works; it is your rollback. After every transfer, review the reports in WAC, which list per-file errors. The usual culprits are files that were open and locked during the copy and paths that are too long or contain unsupported characters, and a later delta pass often clears locked files.",
   "SMS can also migrate to Azure. During the job, WAC can create an Azure VM as the destination for you, sized for the source. You can combine SMS with Azure File Sync afterward if you want a cloud-tiered file server, with cold files kept in Azure Files and hot files cached locally. On the exam, SMS is the answer when the goal is to replace a file server while keeping its name, shares and permissions, and especially when the scenario stresses minimal changes on client computers."
  ],
  "analogy": "Storage Migration Service is like moving a shop to a new building. Inventory is walking through the old shop with a clipboard. Transfer is the moving truck, and you can send a second, smaller truck later for anything that arrived after the first trip. Cut over is moving the street address and the phone number to the new building, so customers arrive at the right place without being told. The analogy stops where the old shop is concerned: SMS does not demolish it, it renames it and gives it a new address, so you keep it as a fallback.",
  "mnemonic": "I Take Control: Inventory, Transfer, Cut over, the three SMS phases in order.",
  "terms": [
   [
    "Orchestrator",
    "The Windows Server 2019 or later machine running Storage Migration Service that coordinates inventory, transfer and cutover."
   ],
   [
    "Inventory",
    "The SMS phase that collects shares, files, security, local accounts and network configuration from the source server."
   ],
   [
    "Transfer",
    "The SMS phase that copies data, shares, permissions and local accounts to the destination, repeatable for deltas."
   ],
   [
    "Cut over",
    "The SMS phase that moves the source's name and IP addresses to the destination and renames the source."
   ],
   [
    "SMS Proxy",
    "An optional service on a Windows Server 2019 or later destination that improves transfer performance."
   ],
   [
    "Delta transfer",
    "A repeated transfer that copies only files changed since the previous pass, shortening the final outage."
   ]
  ],
  "example": "A Windows Server 2012 R2 file server, FS01, must be replaced by a Windows Server 2025 VM. The admin runs inventory from WAC, does a first transfer on Monday and a delta transfer on Friday night, then runs cut over: the new VM becomes FS01 with the old IP, the old server is renamed and readdressed, and users' mapped drives keep working on Monday.",
  "mistakes": [
   [
    "Robocopy or a file copy is enough to replace a file server with no client changes.",
    "A copy moves data but not the server's name, IP address, share definitions or local groups. SMS cut over moves the identity so clients need no changes."
   ],
   [
    "The orchestrator can be any Windows Server version.",
    "The orchestrator must run Windows Server 2019 or later, even though the source can be much older or a Samba-based server."
   ],
   [
    "Cut over deletes or wipes the old server.",
    "The source is renamed and given a new IP address. It stays intact and should be kept offline as a rollback until users confirm success."
   ],
   [
    "You must do the whole copy during the outage window.",
    "Run the large initial transfer early and a short delta transfer just before cut over."
   ]
  ],
  "tryit": [
   [
    "Willow Creek Library must move a 6 TB file server to an Azure VM. Users map drives by the name LIBFILES, and a dozen scripts use its IP address. Data changes every day, and the outage window is two hours on Sunday. How would you plan this with SMS?",
    "Install SMS on a Windows Server 2019 or later orchestrator (or use WAC to create the Azure VM destination), run inventory, then do the initial transfer days ahead. On Sunday, run a final delta transfer, then cut over so the Azure VM takes the LIBFILES name and IP. Keep the renamed old server offline as rollback."
   ],
   [
    "Inventory against an old source server fails immediately with an access or connection error, though the account is a domain admin. What should you check first?",
    "Firewall rules on the source and destination: File and Printer Sharing (SMB), Netlogon and WMI rule groups must be allowed, and the account must have administrator rights on the source."
   ]
  ],
  "tip": "If a scenario wants a new file server to keep the old server's name and IP with minimal client changes, the answer is Storage Migration Service with cut over. Remember the orchestrator must be Windows Server 2019 or later.",
  "check": [
   [
    "Name the three phases of a Storage Migration Service job.",
    "Inventory, transfer and cut over."
   ],
   [
    "What happens to the source server during cut over?",
    "It is renamed and given a different IP address so the destination can take over its original name and IP."
   ],
   [
    "How do you keep the final downtime short when data changes constantly?",
    "Run an initial transfer early and a final delta transfer just before cut over."
   ],
   [
    "Which firewall rule groups must be allowed for SMS?",
    "File and Printer Sharing, Netlogon and WMI."
   ]
  ]
 },
 {
  "t": "Azure Migrate: discovery and assessment, server migration of Hyper-V, VMware and physical servers to Azure",
  "hook": "The board at Harborview Logistics has decided: the company's aging data center lease ends in nine months, and the servers are moving to Azure. Your inventory spreadsheet lists 180 machines, VMware VMs, a Hyper-V cluster, and a few physical boxes under a desk in the warehouse office. Nobody is sure which servers talk to which, the finance director, Kwame, wants a monthly cost estimate by Friday, and the operations team is terrified of a cutover weekend that leaves the order system half in one place and half in the other. Guessing will not do. How do you find out what you have, what it will cost in Azure, and how to move it without breaking it?",
  "simple": "Moving servers from your own building into Azure is like moving house. First you list everything you own and measure it, so you know what size truck and what size rooms you need. Azure Migrate is the Azure tool for that whole job. A small helper machine, called an appliance, quietly looks at your servers and records how big they are and how busy they really are. Azure then suggests the right size of cloud server for each and estimates the monthly bill. When you are ready, Azure Migrate copies each server's disks into Azure, lets you test the copy safely, and then switches over for real. It even shows which servers talk to each other, so you move them together.",
  "body": [
   "Azure Migrate is a hub in the Azure portal for planning and carrying out moves to Azure. You start by creating an Azure Migrate project, which stores the discovered inventory, assessments and migration state, and which you place in a chosen Azure geography. Inside the project are two main tools. Discovery and assessment tells you what you have and what it would take to run it in Azure. Migration and modernization, formerly called Server Migration, actually moves the servers. Keeping both in one project means an assessment group can flow straight into a replication job.",
   "Discovery uses the Azure Migrate appliance, a lightweight VM or server you deploy on-premises from a downloaded template or an installer script. You register it with the project and give it credentials suited to the environment: vCenter credentials for VMware, Hyper-V host or cluster credentials for Hyper-V, and server credentials for physical servers or VMs in other clouds. The appliance discovers servers agentlessly, meaning nothing is installed on the servers themselves, and collects configuration and performance data continuously, such as CPU, memory, disk input/output and network use.",
   "The appliance can do more than count servers. It can inventory installed software, SQL Server instances and web apps, which feeds the other assessment types. It can also run agentless dependency analysis, which shows which servers talk to which, over which ports, so you can group servers that must move together, such as a web tier, an application tier and a database. If you cannot deploy an appliance at all, for example early in planning, you can import a CSV inventory file listing servers and their sizes for a rough assessment, though without real performance data.",
   "An assessment evaluates a group of servers against Azure. For Azure VM assessments it reports readiness for each server: ready, ready with conditions, not ready or unknown, with reasons such as an unsupported operating system or a disk larger than Azure supports. It recommends VM sizes and disk types and estimates monthly compute and storage cost. Two sizing criteria matter. Performance-based sizing uses the collected utilization data, plus a comfort factor for headroom, to right-size VMs, which is how you avoid paying for 16 cores on a server that never uses more than two. As on-premises sizing matches the currently allocated cores and memory, which is safer if data is thin but often more expensive. Assessment settings also include target region, reserved instances, Azure Hybrid Benefit for existing Windows Server and SQL Server licenses, and VM series. Separate assessment types cover Azure SQL, Azure App Service and Azure VMware Solution.",
   "Migration works differently depending on the source, and the exam tests these differences. For VMware, the agentless method uses the same appliance to replicate VM disks using vSphere snapshots; an agent-based method is also available when agentless does not fit. For Hyper-V, migration is agentless from the VM's point of view: you install the Azure Site Recovery provider and the Recovery Services agent on the Hyper-V hosts or cluster nodes, and they replicate VM disks to Azure. Nothing is installed inside the guests. For physical servers and VMs in other clouds, you deploy a replication appliance and install the Mobility service agent on each server, which is the agent-based method.",
   "The migration workflow is the same for all sources. First, enable replication and let the initial replication and then the ongoing delta replication run. Second, do a test migration into an isolated Azure virtual network, which creates a copy of the VM without affecting the source or the replication, so you can confirm the VM boots and the application works. Clean up the test when done. Third, migrate, which optionally shuts down the source to avoid data loss, performs a final sync and creates the Azure VM. Finally, choose Complete migration to stop replication and clean up replication resources.",
   "After migration, a few tasks remain. Install the Azure VM agent if it is not already present, adjust networking such as IP addresses, network security groups and DNS records, enable backup and monitoring, and decommission the source server once the application owners sign off. Azure Migrate itself is included with Azure; you pay for the resources you create, such as VMs, disks and storage used during replication. Check current documentation for details such as dependency analysis limits rather than memorizing numbers."
  ],
  "analogy": "Azure Migrate is a professional moving company. The appliance is the surveyor who walks through your house, measures every piece of furniture and notes which items belong together. The assessment is the quote: truck size, rooms needed in the new house and the price. Test migration is setting up one room in the new house to check that everything fits before moving day. The analogy stops at the end: unlike a real move, the original server keeps running until you migrate, so you can cancel at any time before cutover.",
  "terms": [
   [
    "Azure Migrate project",
    "The container in Azure that holds discovered servers, assessments and migration status."
   ],
   [
    "Azure Migrate appliance",
    "An on-premises VM or server that discovers servers agentlessly and collects performance and dependency data."
   ],
   [
    "Performance-based sizing",
    "Assessment sizing from measured utilization, with a comfort factor, rather than allocated resources."
   ],
   [
    "Dependency analysis",
    "Discovery of network connections between servers so groups that must move together can be identified."
   ],
   [
    "Mobility service",
    "The agent installed on physical or other-cloud servers for agent-based replication."
   ],
   [
    "Test migration",
    "Creating a copy of the migrated VM in an isolated network to validate before the real cutover."
   ]
  ],
  "example": "A company runs 150 Hyper-V VMs. They deploy the Azure Migrate appliance, run a month of performance collection, use dependency analysis to group a three-tier app, and create a performance-based assessment with Azure Hybrid Benefit. They then install the replication provider on the Hyper-V hosts, replicate the group, test-migrate it into an isolated VNet and cut over on a weekend, finishing with Complete migration.",
  "mistakes": [
   [
    "Hyper-V VMs need the Mobility service installed inside each guest.",
    "Hyper-V migration installs the Azure Site Recovery provider and Recovery Services agent on the hosts. The Mobility service is for physical servers and other clouds."
   ],
   [
    "As on-premises sizing gives the cheapest accurate result.",
    "It copies allocated cores and memory, which often overprovisions. Performance-based sizing uses real utilization to right-size."
   ],
   [
    "Test migration affects the source or interrupts replication.",
    "It creates a copy in an isolated virtual network while the source and replication keep running."
   ],
   [
    "Migrating the VM is the last step.",
    "Choose Complete migration to stop replication, then finish networking, DNS, agent and decommissioning tasks."
   ]
  ],
  "tryit": [
   [
    "Stonebridge Mills has 20 physical Windows servers in a branch office and wants them in Azure. The appliance has discovered them and an assessment is ready. Which migration method and components are needed?",
    "Agent-based migration: deploy a replication appliance and install the Mobility service on each physical server. Agentless methods apply to VMware (via the appliance) and Hyper-V (via host provider), not physical servers."
   ],
   [
    "Your assessment recommends large, expensive VM sizes for every server, and you notice performance data has only been collected for two hours. What should you do before trusting the cost estimate?",
    "Let the appliance collect performance data longer, ideally covering normal business cycles, then recalculate a performance-based assessment. Short collection gives low-confidence sizing."
   ]
  ],
  "tip": "Physical servers and other-cloud VMs need the agent-based method with the Mobility service. Hyper-V uses a provider installed on the hosts, not agents in guests. Always do a test migration before the real one.",
  "check": [
   [
    "Which sizing option right-sizes Azure VMs using actual utilization?",
    "Performance-based sizing."
   ],
   [
    "What must you install on Hyper-V hosts to migrate their VMs with Azure Migrate?",
    "The replication provider and Recovery Services agent (the Azure Site Recovery provider)."
   ],
   [
    "Which migration approach is used for physical servers?",
    "Agent-based migration through a replication appliance and the Mobility service installed on each server."
   ],
   [
    "How can you find which servers must migrate together?",
    "Use dependency analysis in Azure Migrate to see server-to-server connections and build groups."
   ]
  ]
 },
 {
  "t": "Upgrading and migrating server roles (in-place upgrade paths, migrating DHCP, print and IIS workloads)",
  "hook": "Three servers at Silverlake Community College are about to fall out of support, and Dana, the IT director, wants a plan on her desk by Monday. One runs DHCP for the whole campus, and if it stops handing out addresses, nobody gets online. One runs the print server that every lab and office uses. The third hosts the student portal on IIS, with a TLS certificate that took a week of paperwork to obtain. A colleague suggests just running Setup on each one and upgrading in place over the weekend. It sounds quick. But what happens if the upgrade fails halfway, and is there a cleaner way to move each role without students noticing?",
  "simple": "When an old server needs a newer version of Windows Server, you have two choices. You can upgrade it in place, like renovating a house while living in it: everything stays, including old clutter. Or you can build a brand-new server and move the jobs over, like moving to a new house: it takes more effort, but it is cleaner and you can always go back to the old house if something goes wrong. Each job, called a role, has its own moving method. DHCP, which hands out network addresses, is exported and imported with two commands. Print queues are backed up and restored with a tool. Websites are copied with a tool called Web Deploy.",
  "body": [
   "When a Windows Server release approaches end of support, you either upgrade in place or migrate. An in-place upgrade runs Setup on the existing server and keeps its name, roles, settings and data. A migration builds a new server, usually with a clean install of the newer release, and moves roles and data to it. Microsoft generally recommends migration for important workloads, because it avoids carrying old configuration, leftover software and years of drift forward, and it gives you an easy rollback: the old server still exists and can be turned back on.",
   "In-place upgrades follow rules. Historically you could jump at most two releases at a time, and recent releases support longer jumps, so always check the official upgrade matrix for your exact source and target. You cannot switch installation options during an upgrade, meaning Server Core cannot become Desktop Experience or the reverse. You cannot move from Datacenter to Standard edition. You can, however, convert an evaluation edition to a licensed retail edition with `DISM /Online /Set-Edition`, supplying the target edition and a product key. Before upgrading, take a full backup, check application and driver support with the vendors, remove roles or software the new release does not support, and gather system information such as installed roles and network settings so you can compare afterward.",
   "Some servers deserve special treatment. Domain controllers have extra considerations around schema updates and replication, which is why adding new domain controllers running the new release and then demoting the old ones is the usual path. Azure VMs running Windows Server can also be upgraded in place, using upgrade media attached to the VM as a data disk, but the same advice applies: snapshot or back up first.",
   "DHCP is one of the easiest roles to migrate with PowerShell. On the old server, `Export-DhcpServer -File C:\\dhcp.xml -Leases` exports scopes, options, reservations and, because of the `-Leases` switch, active leases. On the new server, install the DHCP Server role, then run `Import-DhcpServer -File C:\\dhcp.xml -BackupPath C:\\dhcpbak -Leases`; the backup path holds a copy of the new server's existing configuration in case you need to undo. Next, authorize the new server in Active Directory with `Add-DhcpServerInDC`, because in a domain an unauthorized Windows DHCP server will not hand out leases. Stop the service on the old server and unauthorize it so two servers do not compete. Finally, update any DHCP relay (IP helper) addresses on routers and layer 3 switches so client broadcasts from other subnets reach the new server. If you use DHCP failover, reconfigure the failover relationship on the new servers.",
   "Print servers migrate with the Printer Migration Wizard in Print Management or the command-line tool `printbrm`. Running `printbrm -b -s \\\\OLDPRINT -f C:\\print.printerExport` backs up queues, ports, drivers and settings from the old server into a single file, and `printbrm -r -s \\\\NEWPRINT -f C:\\print.printerExport` restores them on the new one. Drivers must suit the new operating system's architecture, which for modern Windows Server means 64-bit drivers, so missing or 32-bit-only drivers are the usual source of errors. You then redeploy printers to users through Group Policy, or create a DNS alias so the old print server name points at the new server.",
   "Internet Information Services (IIS) web workloads move with Web Deploy (`msdeploy`), which can synchronize sites, application pools, configuration and content from one server to another, or package them into a file that you deploy later. Web Deploy does not solve everything. Export and import Transport Layer Security (TLS) certificates with their private keys, typically as a PFX file, or the site will fail to bind HTTPS. Recreate any service accounts that application pools use, ideally as group managed service accounts (gMSAs) so passwords rotate automatically. Install the same IIS role services and features on the new server, such as ASP.NET or URL authorization, before syncing. For web farms, IIS shared configuration and a load balancer let you add new servers to the pool and drain old ones without downtime.",
   "Whatever the role, the pattern is the same: inventory what the old server does, build the new server, move configuration and data, test, switch clients by updating DNS, DHCP relay or Group Policy Objects (GPOs), keep the old server as a rollback, and finally decommission it. Some roles have their own dedicated tools that you should recognize on the exam: file servers use Storage Migration Service, and Active Directory uses new domain controllers plus moving the flexible single master operation (FSMO) roles."
  ],
  "analogy": "An in-place upgrade is renovating a house while you live in it: quick, but you keep the old wiring and clutter, and if the renovation goes wrong you have nowhere else to sleep. Migration is building a new house next door and carrying each room over with the right tool, a moving box for DHCP, a specialist mover for printers, a crate for the website. You keep the keys to the old house until the new one is proven. The analogy stops at speed: role migrations are often faster than real moves when scripted.",
  "terms": [
   [
    "In-place upgrade",
    "Upgrading the OS on the existing server while keeping roles, settings and data."
   ],
   [
    "Export-DhcpServer",
    "PowerShell cmdlet that exports DHCP configuration, and with -Leases active leases, to an XML file."
   ],
   [
    "Add-DhcpServerInDC",
    "Authorizes a DHCP server in AD so it may hand out leases in the domain."
   ],
   [
    "DHCP relay (IP helper)",
    "A router or layer 3 switch setting that forwards DHCP broadcasts from other subnets to a DHCP server's address."
   ],
   [
    "printbrm",
    "Command-line printer backup and restore tool used for print server migration."
   ],
   [
    "Web Deploy",
    "Microsoft tool (msdeploy) that syncs or packages IIS sites, configuration and content between servers."
   ]
  ],
  "example": "An admin replaces an old DHCP server with a new VM: Export-DhcpServer with -Leases on the old box, Import-DhcpServer with -Leases on the new one, Add-DhcpServerInDC for the new server, then updates the IP helper addresses on the core switches, stops the old DHCP service and unauthorizes the old server.",
  "mistakes": [
   [
    "An in-place upgrade can also switch Server Core to Desktop Experience.",
    "The installation option cannot change during an upgrade. Changing it requires a clean install."
   ],
   [
    "After importing the DHCP configuration, the new server will start handing out leases immediately.",
    "In a domain, it must be authorized in AD with Add-DhcpServerInDC. Also update DHCP relay addresses on routers."
   ],
   [
    "Web Deploy moves everything an IIS site needs.",
    "It syncs sites, pools, configuration and content, but you must still move TLS certificates with private keys, recreate service accounts and install matching role services."
   ],
   [
    "In-place upgrade is Microsoft's preferred path for critical servers.",
    "Microsoft generally recommends migration to a clean install for important workloads because it avoids carrying old configuration and keeps a rollback."
   ]
  ],
  "tryit": [
   [
    "Oakridge Clinic migrated DHCP to a new server and clients on the main subnet get addresses, but clients on the second-floor subnet, which sits behind a router, get APIPA 169.254 addresses. The new server is authorized. What is wrong?",
    "The router's DHCP relay (IP helper) address still points to the old server, so broadcasts from that subnet never reach the new one. Update the IP helper address."
   ],
   [
    "A company wants to move a Datacenter edition server running Desktop Experience to a newer release with Standard edition and Server Core, keeping it as quick as possible. Can an in-place upgrade do this?",
    "No. In-place upgrade cannot change from Datacenter to Standard or switch installation options. Build a new Server Core Standard server and migrate the roles."
   ]
  ],
  "tip": "A new DHCP server that will not hand out leases in a domain usually has not been authorized in AD. For in-place upgrades, watch for edition changes and Server Core to Desktop Experience switches, which are not allowed.",
  "check": [
   [
    "Which switch makes Export-DhcpServer include active leases?",
    "-Leases."
   ],
   [
    "Can an in-place upgrade change a server from Server Core to Desktop Experience?",
    "No. The installation option cannot change during upgrade; you would need a clean install."
   ],
   [
    "Which tool backs up and restores print queues, ports and drivers?",
    "printbrm (or the Printer Migration Wizard in Print Management)."
   ],
   [
    "Which command converts an evaluation edition to a retail edition?",
    "DISM /Online /Set-Edition with the target edition and a product key."
   ]
  ]
 },
 {
  "t": "Hyper-V VM configuration: generation 1 vs 2, dynamic memory, integration services, enhanced session mode, Secure Boot and virtual TPM",
  "hook": "Your queue at Brightwater Insurance has three Hyper-V tickets before lunch. Sam from the dev team built a new Ubuntu VM and it stops at a Secure Boot violation screen. The security team wants BitLocker turned on inside a Windows Server VM that a contractor created last year, and the option is simply not there. And a VM running a reporting app keeps reporting less memory than you gave it. Three different symptoms, but each one traces back to a choice made in the first few screens of the New Virtual Machine Wizard. Which choices were they, and can any of them be fixed after the fact?",
  "simple": "A virtual machine is a pretend computer running inside a real one. When you create one in Hyper-V, you pick its generation, which is like choosing between an older style of computer and a modern one. The modern style, generation 2, supports security features such as Secure Boot, which checks that the startup software has not been tampered with, and a virtual security chip (TPM) that disk encryption needs. You cannot switch generations later. You can also let the VM's memory grow and shrink as needed, called dynamic memory. Small helper programs inside the VM, called integration services, let it cooperate with the host, for example shutting down cleanly. It is like choosing a phone model: some features only exist on the newer model.",
  "body": [
   "When you create a Hyper-V virtual machine, the first and permanent choice is its generation. Generation 1 VMs emulate a traditional BIOS (Basic Input/Output System) PC: they boot from an IDE (Integrated Drive Electronics) controller, can use legacy network adapters for PXE (Preboot Execution Environment) network boot, and support 32-bit guest operating systems. Generation 2 VMs use UEFI (Unified Extensible Firmware Interface) firmware, boot from SCSI (Small Computer System Interface) virtual disks, PXE boot with the standard synthetic network adapter, and support Secure Boot and a virtual Trusted Platform Module (TPM). Generation 2 has no IDE controller or legacy devices at all. You cannot change a VM's generation after creation, so choose generation 2 for any modern 64-bit Windows or Linux guest, and generation 1 only for old or 32-bit guests or if you must reuse an old VHD boot disk built for BIOS.",
   "Dynamic memory lets Hyper-V adjust a VM's RAM while it runs, which increases how many VMs a host can run. You configure several values. Startup memory is what the VM receives at boot. Minimum memory is how low Hyper-V may reclaim memory once the VM is running. Maximum memory is the ceiling. The memory buffer is the percentage of extra memory Hyper-V tries to keep available above current demand, so the VM can absorb a sudden spike. Memory weight sets the VM's priority when the host runs short and must decide who gets memory. Startup memory can be higher than minimum because many operating systems need more to boot than to idle. The guest needs integration services to cooperate, through a memory ballooning driver that hands memory back to the host. Some workloads, such as certain database servers, should use static memory according to vendor guidance because they size their caches at startup.",
   "Integration services are drivers and services in the guest that talk to the host over the VMBus, a high-speed channel between the parent partition and its VMs. There are several, each with a clear job. Operating system shutdown lets the host shut the guest down cleanly. Time synchronization keeps the guest clock aligned with the host. Data exchange, also called key-value pair exchange, shares small pieces of information such as the guest's hostname between host and guest. Heartbeat lets the host see whether the guest is responding. Backup, also called Volume Shadow Copy integration, enables application-consistent host-level backups and production checkpoints. Guest service interface lets `Copy-VMFile` push files from the host into the guest. Modern Windows guests receive integration components through Windows Update. You enable or disable each service per VM with `Enable-VMIntegrationService` and `Disable-VMIntegrationService`, and you can view their state with `Get-VMIntegrationService`. Time synchronization is usually disabled, or limited, for domain controllers so they follow the domain time hierarchy instead of the host.",
   "Enhanced session mode makes Virtual Machine Connection (VMConnect) use a Remote Desktop Protocol (RDP) session carried over the VMBus rather than a basic console view. You get clipboard sharing, resizable displays, audio, and redirection of local drives, printers and USB devices, even when the VM has no network connection at all, because the traffic never touches the virtual network. It must be allowed in the host's Hyper-V settings, both in the server policy and in the user settings, and the guest must support it, which current Windows releases do.",
   "Secure Boot, available only on generation 2 VMs, verifies that the boot loader and early boot components are signed by trusted keys, which blocks bootkits and rootkits that try to load before the operating system. The template matters. Use the Microsoft Windows template for Windows guests and the Microsoft UEFI Certificate Authority template for most Linux distributions, whose boot loaders are signed through that authority. A Linux VM that stops with a Secure Boot violation usually has the wrong template, not a broken image.",
   "A virtual TPM (vTPM) gives a generation 2 guest a TPM 2.0 device. That device is what BitLocker uses to protect its keys, what Windows 11 requires, and what Credential Guard and measured boot rely on. Enabling it requires a key protector, which protects the VM's TPM state so the VM cannot simply be copied to another host and read. In a lab you create a local key protector; the VM must be off when you enable the vTPM.",
   "```powershell\nSet-VMKeyProtector -VMName APP01 -NewLocalKeyProtector\nEnable-VMTPM -VMName APP01\nSet-VMFirmware -VMName LNX01 -SecureBootTemplate MicrosoftUEFICertificateAuthority\n```\nIn production, shielded VMs protected by a Host Guardian Service store keys centrally so VMs run only on approved, healthy hosts.",
   "Put together, the three tickets in the opening scene resolve neatly. The Ubuntu VM needs the Microsoft UEFI Certificate Authority template. The contractor's VM is generation 1, so it can never have a vTPM; the fix is a new generation 2 VM with the workload moved over. And the reporting VM is using dynamic memory with a low minimum, so the guest sees memory being reclaimed; raise the minimum or switch to static memory if the vendor requires it."
  ],
  "analogy": "Choosing a VM generation is like choosing between a classic car and a modern one. The classic car (generation 1) runs old parts and fuel the modern car cannot, such as 32-bit guests and legacy network boot. The modern car (generation 2) has an alarm and immobilizer, which are Secure Boot and the vTPM. You cannot retrofit the modern electronics into the classic car or turn one into the other; you buy a different car. The analogy stops at cost: building a new VM is cheap, but migrating the workload still takes effort.",
  "terms": [
   [
    "Generation 2 VM",
    "A UEFI-based Hyper-V VM with SCSI boot, Secure Boot and vTPM support; generation cannot be changed later."
   ],
   [
    "Dynamic memory",
    "Hyper-V feature that adjusts VM RAM between minimum and maximum based on demand, with startup memory, buffer and weight settings."
   ],
   [
    "Integration services",
    "Guest components such as shutdown, time sync, heartbeat, data exchange, backup and guest service interface that communicate over VMBus."
   ],
   [
    "Enhanced session mode",
    "VMConnect sessions over RDP through the VMBus, adding clipboard, drives and device redirection without network access."
   ],
   [
    "Secure Boot template",
    "The set of trusted keys used to verify the boot loader: Microsoft Windows or Microsoft UEFI Certificate Authority."
   ],
   [
    "Virtual TPM",
    "An emulated TPM 2.0 device for a generation 2 VM, protected by a key protector."
   ]
  ],
  "example": "A new Ubuntu generation 2 VM stops at a Secure Boot violation message. The admin shuts it down, changes the Secure Boot template to Microsoft UEFI Certificate Authority with Set-VMFirmware, and the VM boots normally. For a Windows Server VM that needs BitLocker, she sets a local key protector and runs Enable-VMTPM while the VM is off.",
  "mistakes": [
   [
    "You can convert a generation 1 VM to generation 2 in its settings.",
    "Generation is fixed at creation. To gain Secure Boot or vTPM you build a new generation 2 VM and move the workload."
   ],
   [
    "A Secure Boot failure on Linux means the image is corrupt.",
    "Usually the template is Microsoft Windows instead of Microsoft UEFI Certificate Authority. Change the template, or disable Secure Boot for an unsigned distribution."
   ],
   [
    "Startup memory must equal minimum memory.",
    "Startup can be higher than minimum because many operating systems need more memory to boot than to idle."
   ],
   [
    "Enhanced session mode needs the VM to be on the network.",
    "It runs RDP over the VMBus, so it works with no network connection, provided the host allows it and the guest supports it."
   ]
  ],
  "tryit": [
   [
    "Fernhill Credit Union must run a legacy 32-bit Windows application server and, on the same host, a new Windows Server VM that must use BitLocker with a TPM. Which generation should each VM use?",
    "The 32-bit server must be generation 1, because generation 2 does not support 32-bit guests. The BitLocker server must be generation 2 with a vTPM enabled through a key protector."
   ],
   [
    "A domain controller VM keeps drifting a few minutes from the rest of the domain because it follows the host clock, which is itself wrong. Which setting should you change?",
    "Disable or limit the time synchronization integration service on the DC VM so it follows the domain time hierarchy instead of the host."
   ]
  ],
  "tip": "32-bit guest or legacy PXE means generation 1. BitLocker in the guest, Secure Boot or Windows 11 means generation 2 with vTPM. Generation cannot be converted after creation.",
  "check": [
   [
    "Which dynamic memory value controls how much RAM a VM has at boot?",
    "Startup memory."
   ],
   [
    "Which integration service is needed for Copy-VMFile?",
    "Guest service interface."
   ],
   [
    "A Linux generation 2 VM fails Secure Boot. What is the likely fix?",
    "Change the Secure Boot template to Microsoft UEFI Certificate Authority (or disable Secure Boot if the distro is unsigned)."
   ],
   [
    "What must exist before you can enable a vTPM on a VM?",
    "A key protector, for example created locally with Set-VMKeyProtector -NewLocalKeyProtector."
   ]
  ]
 },
 {
  "t": "Nested virtualization requirements; PowerShell Direct",
  "hook": "Elena teaches the evening Windows Server course for Northgate Technical Institute, and next week's lab is failover clustering. She has one powerful laptop, no spare servers and no budget. Her plan is to build two Hyper-V hosts as virtual machines on the laptop and run small VMs inside them. On her first try, the Hyper-V role refuses to install inside the VM, complaining about missing virtualization support. When she finally gets past that, the inner VMs cannot reach the network at all. Then she realizes one of her outer VMs has a broken network configuration and she cannot even remote into it to fix it. Is there a way in without touching the network at all?",
  "simple": "Nested virtualization means running a pretend computer inside another pretend computer: you turn on Hyper-V inside a virtual machine so it can run its own virtual machines. It is mostly used for training labs and testing, because it is slower than the real thing. To make it work, you have to pass the processor's special virtualization features through to the outer VM, give it a fixed amount of memory, and allow network traffic from the inner VMs. PowerShell Direct is a separate trick: from the Hyper-V host, you can type commands straight into a VM through a private internal channel, even if the VM's network is broken. It is like a building manager using an internal intercom instead of the street phone line.",
  "body": [
   "Nested virtualization means running Hyper-V inside a Hyper-V virtual machine, so that VM can host its own VMs. It is used for labs and training, testing Hyper-V clusters without extra hardware, running Windows containers with Hyper-V isolation inside a VM, and building virtualization environments in Azure. Performance is lower than on bare metal, because every layer adds overhead, so it is generally used for development, test and training rather than heavy production workloads.",
   "Requirements come on both levels. The physical host needs a processor with hardware virtualization and second-level address translation (SLAT): Intel VT-x with Extended Page Tables (EPT), or AMD-V with Rapid Virtualization Indexing (RVI) on processors and Windows versions that support nested virtualization on AMD; support arrived later for AMD than for Intel. The host and the VM that will run Hyper-V must be recent Windows Server or Windows versions, and the VM should use a recent configuration version. The VM must be turned off when you enable the feature, because processor settings cannot change while it runs.",
   "```powershell\nSet-VMProcessor -VMName HV-NESTED -ExposeVirtualizationExtensions $true\nSet-VMMemory -VMName HV-NESTED -DynamicMemoryEnabled $false -StartupBytes 8GB\nGet-VMNetworkAdapter -VMName HV-NESTED | Set-VMNetworkAdapter -MacAddressSpoofing On\n```",
   "Each line solves a known problem. Exposing virtualization extensions passes the CPU's virtualization features into the VM, so Hyper-V can install there; without it, the role installation inside the VM fails with a message about missing hardware support, which is exactly what happened in the opening scene. Dynamic memory is not supported for a VM running nested Hyper-V, so give it static memory with enough RAM for its own operating system plus all the inner VMs it will host. Networking for the inner VMs needs one of two approaches. Either enable MAC (media access control) address spoofing on the outer VM's network adapter, so frames from inner VMs, which carry their own MAC addresses, are allowed out through the outer VM's port, or create a NAT (network address translation) virtual switch inside the outer VM so the inner VMs share its address.",
   "There are limits to watch. Some features, such as checkpoints or live migration of a VM that is itself running nested Hyper-V, have been restricted in some versions, so check the documentation for your release before you design a lab that depends on them. In Azure, only VM sizes that support nested virtualization can run Hyper-V inside, and many current general-purpose and memory-optimized sizes do; check the size documentation rather than assuming.",
   "When something goes wrong in a nested lab, work from the outside in. Confirm the physical host meets the processor requirements and has virtualization enabled in its firmware. Check the outer VM with `Get-VMProcessor -VMName HV-NESTED | Select-Object ExposeVirtualizationExtensions` and `Get-VMMemory` to verify the extensions and static memory. Then check the outer VM adapter for MAC address spoofing with `Get-VMNetworkAdapter`. Only after those three are correct is it worth troubleshooting inside the outer VM, such as its own virtual switch configuration.",
   "PowerShell Direct is a different feature that also uses the host-to-guest channel. It lets you run PowerShell inside a VM from its Hyper-V host over the VMBus, the internal channel between the host and its guests, without any network connectivity, remote management configuration or firewall rules in the guest. That is invaluable when a VM's network is misconfigured, when it sits on an isolated or private virtual switch, or when you are automating the first configuration of a freshly deployed VM before it has an IP address at all.",
   "You use the familiar remoting cmdlets but target a VM instead of a computer name. `Enter-PSSession -VMName DC01` opens an interactive session, `Invoke-Command -VMName DC01 -ScriptBlock { ... }` runs a script block, and `-VMId` with the VM's GUID works when names are ambiguous. You can also create a reusable session with `New-PSSession -VMName` and copy files into the guest with `Copy-Item -ToSession`, which is handy for pushing a configuration script into a new VM.",
   "PowerShell Direct has firm requirements, and exam questions test them. You must run the command on the Hyper-V host that runs the VM, as a member of the Hyper-V Administrators group or a local administrator; it does not work from a remote workstation directly, although you can remote to the host first and run it there. The VM must be running, and the guest operating system must be Windows 10 or Windows Server 2016 or later. You must supply credentials valid inside the guest, such as a local administrator or a domain account the guest accepts, because PowerShell Direct does not pass your host credentials into the VM."
  ],
  "analogy": "Nested virtualization is like a hotel that lets a guest sublet rooms inside their suite. The hotel must hand over the master electrical controls (expose virtualization extensions), reserve a fixed number of rooms for the suite (static memory), and tell the front desk to accept visitors who are not on the original guest's name (MAC spoofing). PowerShell Direct is the hotel's internal phone: staff in the building can call any room even when its outside line is cut, but you must be inside the building and the guest still has to let you in with their own password.",
  "terms": [
   [
    "Nested virtualization",
    "Running Hyper-V inside a VM so that VM can host its own VMs."
   ],
   [
    "ExposeVirtualizationExtensions",
    "Set-VMProcessor parameter that passes hardware virtualization features into a VM; the VM must be off."
   ],
   [
    "SLAT",
    "Second-level address translation (Intel EPT or AMD RVI), a processor feature nested virtualization requires."
   ],
   [
    "MAC address spoofing",
    "Allowing a VM adapter to send frames with MAC addresses other than its own, needed for inner VM networking."
   ],
   [
    "PowerShell Direct",
    "Running PowerShell in a VM from its Hyper-V host over VMBus with no network required."
   ],
   [
    "VMBus",
    "The high-speed channel between a Hyper-V host and its guests used by integration services and PowerShell Direct."
   ]
  ],
  "example": "A trainer builds a two-node failover cluster lab on a single laptop. She creates two VMs, turns them off, exposes virtualization extensions, gives each 8 GB of static memory, enables MAC spoofing, installs Hyper-V inside both and configures them with Invoke-Command -VMName before their networking is even set up.",
  "mistakes": [
   [
    "You can enable nested virtualization on a running VM.",
    "ExposeVirtualizationExtensions can only be set while the VM is turned off."
   ],
   [
    "Dynamic memory is fine for a nested Hyper-V host.",
    "Dynamic memory is not supported for a VM running nested Hyper-V. Use static memory sized for the inner VMs."
   ],
   [
    "PowerShell Direct uses your host login inside the VM.",
    "It requires credentials valid inside the guest; host credentials are not passed through."
   ],
   [
    "PowerShell Direct works from any admin workstation.",
    "It runs only on the Hyper-V host that runs the VM. Remote to the host first if needed."
   ]
  ],
  "tryit": [
   [
    "At Riverstone Analytics, a nested Hyper-V lab VM installed Hyper-V successfully, and its inner VMs start, but they cannot get IP addresses from the network DHCP server. The outer VM itself has network access. What is the most likely fix?",
    "Enable MAC address spoofing on the outer VM's network adapter so frames from the inner VMs' own MAC addresses are allowed out, or use a NAT switch inside the outer VM."
   ],
   [
    "A newly deployed VM on host HV03 has no IP address and its firewall blocks remote management. You are signed in to your laptop. How can you configure it with PowerShell?",
    "Connect to HV03 (for example over RDP or remoting), then use PowerShell Direct with Enter-PSSession -VMName and credentials for the guest. PowerShell Direct needs no network or firewall rules inside the guest but must run on the host."
   ]
  ],
  "tip": "Nested Hyper-V fails to install inside a VM when ExposeVirtualizationExtensions is not set (and the VM must be off to set it). Inner VMs with no network usually point to missing MAC address spoofing. PowerShell Direct needs guest credentials and must run on the same host.",
  "check": [
   [
    "What must be true of the VM before you run Set-VMProcessor -ExposeVirtualizationExtensions $true?",
    "It must be turned off."
   ],
   [
    "Why enable MAC address spoofing on a VM that hosts nested VMs?",
    "So network frames from the inner VMs, which use their own MAC addresses, are allowed through the outer VM's adapter."
   ],
   [
    "Can you use PowerShell Direct from your admin workstation to a VM on a remote host?",
    "No. It works only from the Hyper-V host running the VM (though you could remote to the host first)."
   ],
   [
    "What minimum guest operating systems support PowerShell Direct?",
    "Windows 10 or Windows Server 2016 and later."
   ]
  ]
 },
 {
  "t": "Virtual disks: VHD vs VHDX, fixed, dynamic and differencing disks; shared VHDX / VHD Set",
  "hook": "At 2:10 a.m., Jordan on the night shift at Kestrel Manufacturing gets a page: a dozen VMs on Hyper-V host HV02 have paused. The host's D: drive is at 100 percent. Nobody added data, but every VM uses a dynamically expanding disk, and over months they quietly grew past the space the volume could hold. While Jordan frees space, a second ticket arrives: the lab team modified a base image disk last week, and now every lab VM built from it refuses to start. And tomorrow, the database team wants shared storage for a two-node guest cluster that they can resize without downtime. Three different problems, all about virtual disk files. What should have been chosen differently?",
  "simple": "A virtual machine's hard drive is really just a big file on the host computer. There are two file formats: the old one, VHD, and the newer one, VHDX, which holds much more and is better protected against damage. You also choose how the file uses space. A fixed disk grabs all its space at the start, like booking a whole room. A dynamic disk starts small and grows as you add things, like a suitcase that expands, which saves space but can fill your closet unexpectedly. A differencing disk only stores changes on top of a shared original, like tracing paper over a master drawing. For clusters of VMs that need one shared disk, there is a special shared format called a VHD Set.",
  "body": [
   "A Hyper-V virtual hard disk is a file on the host that the VM sees as a physical disk. There are two formats. VHD is the original format, limited to about 2 TB (2,040 GB) and to 512-byte sectors; it survives mainly for compatibility with older systems and some tools. VHDX, introduced with Windows Server 2012, supports disks up to 64 TB, 4 KB logical sectors that match modern physical disks, an internal metadata log that protects the disk structure against corruption after a power failure, and TRIM/UNMAP support so space freed inside the guest can be returned to the underlying storage. Generation 2 VMs boot only from VHDX. Use VHDX unless you have a specific reason not to, such as moving a disk to an older system that only reads VHD.",
   "Each disk also has a type, which controls how it consumes space on the host. A fixed-size disk allocates all its space up front: a 100 GB fixed disk is a 100 GB file immediately. It gives predictable performance, because blocks never need to be allocated during writes, and it cannot run the host out of space later. That is why it is often preferred for production databases and other write-heavy workloads.",
   "A dynamically expanding disk starts small and grows as data is written, up to its configured maximum size. It saves space, and with VHDX its performance is close to that of a fixed disk for most workloads. The catch is overcommitment. If ten VMs each have a 500 GB dynamic disk on a 2 TB volume, everything is fine until they collectively write more than the volume holds. When the host volume fills, Hyper-V pauses the affected VMs to protect their data, which is exactly the 2 a.m. page in the opening scene. If you use dynamic disks, monitor free space on host volumes and set alerts well before they fill.",
   "A differencing disk is a child disk that records only the changes relative to a read-only parent disk. Many VMs can share one parent, for example a generalized base image prepared with Sysprep, each with its own small child, which saves a great deal of storage in labs and virtual desktop pools. There are firm rules. Never modify the parent, or every child breaks, because each child stores changes relative to the parent's exact original blocks. Keep parent and child reachable at the paths the child expects. And understand that a long chain of differencing disks slows input/output, because reads may have to walk several files. You can merge a child into its parent with `Merge-VHD` when you no longer need the separation. Checkpoints use the same mechanism with AVHDX files, which is why deleting checkpoints triggers merges.",
   "Several cmdlets cover day-to-day disk work. `New-VHD -Path D:\\VMs\\data.vhdx -SizeBytes 200GB -Dynamic` creates a dynamic disk; use `-Fixed` for a fixed disk, or `-ParentPath` for a differencing disk. `Convert-VHD` changes the format or type, for example VHD to VHDX or dynamic to fixed, and writes a new file; the VM must be off, or at least that disk detached. `Resize-VHD` grows or shrinks a disk; a VHDX attached to a SCSI controller can be resized while the VM runs, which avoids downtime for a full data volume, though you still extend the partition inside the guest afterward. `Optimize-VHD` compacts a dynamic disk to reclaim unused space, and `Mount-VHD` attaches a disk to the host for offline servicing such as injecting files.",
   "Guest clustering, in which two or more VMs form a failover cluster, needs a disk that all nodes can use at the same time. Shared VHDX, introduced in Windows Server 2012 R2, allowed one VHDX to be attached to several VMs. It had real limits: no online resize, no host-level backup and no Hyper-V Replica. Windows Server 2016 introduced the VHD Set as its replacement. A VHD Set consists of a `.vhds` file, which holds metadata, plus a backing `.avhdx` file with the data. VHD Sets support online resizing, host-based backup and Hyper-V Replica, and they are the choice for new guest clusters.",
   "To use a VHD Set, store it on Cluster Shared Volumes (CSV) or on a Scale-Out File Server SMB share, so all hosts can reach it. Attach it to each guest node's SCSI controller and enable persistent reservations, which the cluster inside the guests uses to arbitrate ownership of the disk. You can convert an existing shared VHDX to a VHD Set with `Convert-VHD` while the VMs are off, which lets older guest clusters gain the newer capabilities."
  ],
  "analogy": "Think of disk types as ways to store clothes. A fixed disk is renting a full storage unit on day one: expensive in space but you never run out. A dynamic disk is a vacuum bag that expands as you add clothes, but if every bag in the closet expands at once, the closet door will not close, and that is a full host volume. A differencing disk is tracing paper laid over a master drawing: each sheet holds only its changes. Change the master drawing and every tracing stops lining up.",
  "terms": [
   [
    "VHDX",
    "Hyper-V disk format supporting up to 64 TB, 4 KB sectors, corruption-resistant metadata and TRIM/UNMAP."
   ],
   [
    "Fixed-size disk",
    "A virtual disk that allocates its full size at creation for predictable performance."
   ],
   [
    "Dynamically expanding disk",
    "A virtual disk that grows as data is written, up to its configured maximum."
   ],
   [
    "Differencing disk",
    "A child disk storing only changes relative to a read-only parent."
   ],
   [
    "VHD Set",
    "A .vhds shared disk format for guest clusters supporting online resize, host backup and Hyper-V Replica."
   ],
   [
    "Persistent reservations",
    "SCSI reservations a guest cluster uses to arbitrate ownership of a shared disk such as a VHD Set."
   ]
  ],
  "example": "A training lab needs 20 identical Windows Server VMs on limited storage. The admin generalizes one VM with Sysprep, marks its VHDX read-only as a parent and creates 20 small differencing disks from it, saving hundreds of gigabytes. For a separate two-node guest SQL Server cluster, he creates a VHD Set on a Cluster Shared Volume and attaches it to both VMs' SCSI controllers with persistent reservations.",
  "mistakes": [
   [
    "A shared VHDX is the best choice for a new guest cluster.",
    "Shared VHDX cannot be resized online, backed up at host level or replicated. Use a VHD Set on Windows Server 2016 and later."
   ],
   [
    "Updating the parent disk will roll the update into all differencing children.",
    "Modifying a parent breaks every child, because each child stores changes relative to the parent's original blocks."
   ],
   [
    "Dynamic disks are risk-free because they only use the space they need.",
    "Overcommitted dynamic disks can fill the host volume, which pauses VMs. Monitor free space or use fixed disks for critical workloads."
   ],
   [
    "A generation 2 VM can boot from a VHD file.",
    "Generation 2 VMs boot only from VHDX."
   ]
  ],
  "tryit": [
   [
    "Granite Health needs a 6 TB data disk for a file server VM, must avoid any chance of the host volume filling unexpectedly, and wants predictable performance. Which format and type should you choose?",
    "A fixed-size VHDX. VHD is limited to about 2 TB, and a fixed disk allocates its space up front so it cannot overcommit the host volume and gives predictable performance."
   ],
   [
    "A data volume inside a running VM is almost full. The disk is a VHDX attached to the VM's SCSI controller. Can you grow it without downtime, and what else must you do?",
    "Yes. Use Resize-VHD while the VM runs, because a VHDX on a SCSI controller supports online resize. Then extend the partition inside the guest with Disk Management or Resize-Partition."
   ]
  ],
  "tip": "Guest cluster shared storage that must support online resize, host backup or replica is a VHD Set, not shared VHDX. Disks over 2 TB or for generation 2 boot must be VHDX.",
  "check": [
   [
    "What is the maximum size of a VHDX disk?",
    "64 TB (VHD is limited to about 2 TB)."
   ],
   [
    "What happens to differencing children if their parent disk is modified?",
    "They become invalid, because each child records changes relative to the parent's exact original state."
   ],
   [
    "Which shared disk option should you use for a new guest cluster on Windows Server 2016 or later?",
    "A VHD Set (.vhds)."
   ],
   [
    "Which cmdlet changes a disk from VHD to VHDX or from dynamic to fixed?",
    "Convert-VHD, with the disk not in use by a running VM."
   ]
  ]
 },
 {
  "t": "Checkpoints: production vs standard; why checkpoints are not backups",
  "hook": "During a storage audit at Pinewood County Records, Aisha notices something odd: the APP01 VM folder on host HV04 holds a 200 GB VHDX and a chain of eleven AVHDX files, the oldest dated fourteen months ago. A colleague explains proudly that they never bothered with backup software for APP01 because they take a checkpoint before every change, so they can always go back. Aisha looks at the single storage volume all of those files sit on, then at the host's aging RAID controller, and feels a chill. If that volume failed tonight, what exactly would they go back to? And why does APP01 feel slower every month?",
  "simple": "A checkpoint is a saved moment in a virtual machine's life that you can return to, like a save point in a video game. Before you try something risky, such as installing an update, you take a checkpoint, and if things go wrong you jump back. There are two kinds. A standard checkpoint saves everything, even what was open in memory. A production checkpoint asks the programs inside to tidy up first, so data is saved in a clean state, and returns to a fresh start. But a checkpoint is not a backup. It lives on the same disk as the VM and depends on the original disk, so if that disk dies, the checkpoints die with it. It is like keeping your spare house key inside the house.",
  "body": [
   "A Hyper-V checkpoint, called a snapshot in older versions, captures a VM's state at a point in time so you can return to it later. It is an excellent short-term safety net: before installing an update, before testing a configuration change, or during a lab exercise where students may break things. Understanding how it works explains both its strengths and its dangers. When you take a checkpoint, Hyper-V stops writing to the current virtual disk and creates a differencing disk, an `.avhdx` file, that receives all new writes from then on. The original disk becomes a read-only parent. Each further checkpoint adds another AVHDX to the chain.",
   "There are two types. A standard checkpoint captures the disk plus the full memory and device state of a running VM, similar to pausing and saving it. Applying it returns the VM exactly where it was, even with applications open and windows on screen. The downside is that applications inside the VM, such as databases or domain controllers, did not know a checkpoint happened. Returning to one is like the server waking up having lost a stretch of time, which can confuse replication partners or break transactions that other systems believe were completed.",
   "A production checkpoint takes a different approach. It uses the Volume Shadow Copy Service (VSS) inside Windows guests, or a file system freeze in Linux guests, to create an application-consistent point in time: applications are told to flush their data to disk and pause writes for a moment. It does not include memory, so applying a production checkpoint starts the VM from a clean boot, as if it had been restored from backup. Production checkpoints need the backup integration service enabled in the guest, because that service is how the host coordinates with VSS.",
   "Production is the default checkpoint type for new VMs, with automatic fallback to standard if a production checkpoint cannot be taken, for example because the guest lacks integration services. You change the behavior per VM in its settings or with `Set-VM -CheckpointType`, choosing `Production`, `ProductionOnly` (fail rather than fall back to standard), `Standard` or `Disabled`. You manage checkpoints with `Checkpoint-VM -Name APP01 -SnapshotName BeforePatch`, return to one with `Restore-VMCheckpoint`, and delete one with `Remove-VMCheckpoint`. Deleting a checkpoint does not discard the changes made since; Hyper-V merges the AVHDX contents back into the parent in the background. Never delete AVHDX files manually in File Explorer. That breaks the chain, and the VM may refuse to start or lose data.",
   "Checkpoints are not backups, and exam questions frequently test why. First, they live on the same storage as the VM, so a failed volume, a corrupted file system or ransomware on the host destroys the VM and its checkpoints together. Second, they depend on the parent disk chain; if the base VHDX is lost or corrupted, every checkpoint built on it is useless. Third, they cannot be moved off-host independently or kept on a retention schedule such as 30 daily copies. Fourth, they hurt performance and consume more space as the chain grows, because reads may walk through many AVHDX files. They are meant to be temporary, measured in hours or days, not months, which explains the slowdown in the opening scene. A good habit is to name each checkpoint after the change it protects and remove it as soon as the change is confirmed.",
   "Real backups copy data to separate storage, ideally off-site or in another region, with retention policies and restores that someone has actually tested. Options include Windows Server Backup, Azure Backup with the Microsoft Azure Recovery Services (MARS) agent, Microsoft Azure Backup Server, and third-party products. Many of these products use production checkpoints internally to capture a consistent point in time, then copy the data elsewhere and remove the checkpoint. So checkpoints are a building block of backup, not a replacement for it.",
   "Domain controllers deserve a note. Since Windows Server 2012, virtualization-aware domain controllers use the VM-GenerationID, a value the hypervisor changes when a VM is reverted, to detect that they have been rolled back. When the DC sees a changed value, it resets its replication identity and discards its RID (relative identifier) pool to protect against update sequence number (USN) rollback, which would otherwise corrupt replication. Even so, reverting domain controllers with checkpoints is discouraged; use proper Active Directory backups and restore methods."
  ],
  "analogy": "A checkpoint is like a bookmark plus tracing paper. When you take one, you lay a fresh sheet over the page and write only on that sheet, so you can lift it off to go back. A pile of sheets gets slower to read through. But if someone spills coffee on the book, the bookmarks and tracing sheets are ruined too, because they live in the same book. A backup is a photocopy kept in another building. The analogy stops for standard checkpoints, which also remember what was in memory, something paper cannot do.",
  "terms": [
   [
    "Standard checkpoint",
    "Captures disk plus memory and device state; restores the VM exactly as it was, but not application-consistent."
   ],
   [
    "Production checkpoint",
    "Uses VSS or a file system freeze for an application-consistent point in time without memory; restores to a clean boot."
   ],
   [
    "ProductionOnly",
    "Checkpoint setting that fails instead of falling back to a standard checkpoint."
   ],
   [
    "AVHDX",
    "The differencing disk file created for each checkpoint to hold new writes."
   ],
   [
    "Checkpoint merge",
    "Background process that folds AVHDX changes into the parent when a checkpoint is deleted."
   ],
   [
    "VM-GenerationID",
    "A value that lets a virtualized DC detect it has been rolled back and protect AD replication."
   ]
  ],
  "example": "Before a risky application update, an admin takes a production checkpoint of APP01. The update fails, so she applies the checkpoint and the VM boots cleanly with a consistent database. After a week of stability she deletes the checkpoint so the AVHDX merges back, relying on nightly Azure Backup for real protection.",
  "mistakes": [
   [
    "Checkpoints taken regularly are a good substitute for backups.",
    "They share storage with the VM and depend on its parent disk, so a storage failure destroys both. They also lack retention and off-host copies."
   ],
   [
    "Deleting a checkpoint throws away the changes made since it was taken.",
    "Deleting merges the AVHDX changes into the parent, so the current state is kept. Applying a checkpoint is what returns to the old state."
   ],
   [
    "A production checkpoint restores the VM with its applications still open.",
    "Production checkpoints exclude memory, so the VM starts from a clean boot. Standard checkpoints include memory."
   ],
   [
    "Old AVHDX files can be cleaned up in File Explorer to save space.",
    "Manually deleting AVHDX files breaks the differencing chain. Remove checkpoints in Hyper-V so they merge properly."
   ]
  ],
  "tryit": [
   [
    "Marlow Freight's SQL Server VM must have a restore point before a schema change tonight, and the DBA insists the database must be consistent when restored. The team also must never silently get a non-consistent checkpoint. Which checkpoint setting should you use?",
    "Set the VM's checkpoint type to ProductionOnly. It takes a VSS-based application-consistent checkpoint and fails rather than falling back to a standard checkpoint."
   ],
   [
    "An auditor asks how you would recover a file server if its host's storage array failed and also requires 30 days of restore points. A colleague proposes daily checkpoints kept for 30 days. How do you respond?",
    "Checkpoints sit on the same storage and depend on the parent disk, so an array failure destroys them, and long chains degrade performance. Use a real backup product, such as Azure Backup, storing copies on separate storage with 30-day retention."
   ]
  ],
  "tip": "If the question needs an application-consistent restore point, choose a production checkpoint. If it asks how to protect against host storage failure or keep 30 days of history, the answer is a backup, never a checkpoint.",
  "check": [
   [
    "Which checkpoint type includes the VM's memory state?",
    "Standard checkpoint."
   ],
   [
    "Why should you not delete AVHDX files manually?",
    "They are part of a differencing chain; removing one without a merge breaks the chain and can lose data."
   ],
   [
    "Give two reasons checkpoints are not backups.",
    "They live on the same storage as the VM and depend on the parent disk chain, so a storage failure destroys both; they also lack retention and off-host copies and degrade performance over time."
   ],
   [
    "Which integration service do production checkpoints require?",
    "The backup (Volume Shadow Copy) integration service."
   ]
  ]
 },
 {
  "t": "Hyper-V virtual switches (external, internal, private) and Switch Embedded Teaming",
  "hook": "Monday at Bayside Medical Group, two networking requests land on your desk. Priya on the security team needs an isolated segment where three VMs can test suspicious attachments without any chance of touching the host or the corporate network. Meanwhile the new Hyper-V hosts arrived with two fast network adapters each, and the vendor's checklist says to team them. A colleague starts building an LBFO team in Server Manager the way he did years ago, and the virtual switch creation fails with a message about the configuration not being supported. Which kind of switch keeps Priya's VMs truly isolated, and what should the hosts use instead of the old teaming method?",
  "simple": "Inside a Hyper-V host, virtual machines connect to a pretend network switch made of software, called a virtual switch. There are three kinds. An external switch connects VMs to the real network, so they can reach the office and the internet. An internal switch lets VMs talk to each other and to the host computer, but not to the outside network. A private switch lets VMs talk only to each other; even the host is left out. Teaming means combining several real network cards so traffic keeps flowing if one fails and more traffic fits through. Switch Embedded Teaming builds that teaming right into the Hyper-V switch. It is like several lanes merging into one highway that keeps moving if one lane closes.",
  "body": [
   "A Hyper-V virtual switch is a software layer 2 switch inside the host that connects VMs' virtual network adapters to each other and, optionally, to the outside world. Like a physical switch, it forwards frames by MAC (media access control) address and can carry VLAN (virtual local area network) tags. You create switches in Hyper-V Manager's Virtual Switch Manager or with `New-VMSwitch`. There are three types, and choosing the right one is a common exam question.",
   "An external switch is bound to a physical network adapter, so VMs can reach the physical network and beyond. When you create it, the option Allow management operating system to share this network adapter creates a host virtual NIC (network interface card) on the switch, so the host keeps its own network access through the same physical port. If you clear that option, the physical NIC is dedicated to VM traffic and the host needs another adapter for management. Clearing it by accident on a host's only adapter is a classic way to lose remote access to the host.",
   "An internal switch connects VMs to each other and to the host, but not to the physical network. The host gets a virtual NIC on the switch and can talk to the VMs directly. It is useful for host-to-VM communication, test environments, and, combined with `New-NetNat` on the host, for giving VMs outbound access through the host using network address translation (NAT). A private switch connects VMs only to each other; even the host cannot communicate on it. It suits isolated labs and test networks, such as a malware analysis segment or an isolated network for testing disaster recovery failovers, because nothing on it can reach the host or the corporate network.",
   "VM network adapters carry their own settings, configured per VM. You can assign a VLAN ID, for example `Set-VMNetworkAdapterVlan -VMName APP01 -Access -VlanId 20`, so the VM's traffic is tagged for a particular network segment on the physical trunk. Bandwidth management sets minimum and maximum bandwidth. DHCP guard drops DHCP server messages from a VM that should not be acting as a DHCP server, and router guard drops router advertisement and redirection messages from a VM that should not be a router; both protect the network from rogue or misconfigured VMs. MAC address spoofing allows a VM to send frames from other MAC addresses, which nested virtualization and some load balancers need. Port mirroring copies traffic to another VM for monitoring. On generation 2 VMs, the standard network adapter also supports PXE boot.",
   "Hosts need redundancy and bandwidth for their VMs. Traditionally that came from NIC teaming, also called LBFO (load balancing and failover), configured in Windows, with a virtual switch built on top of the team interface. Switch Embedded Teaming (SET), introduced in Windows Server 2016, builds teaming directly into the Hyper-V virtual switch instead. SET is the recommended approach for Hyper-V hosts. It is required for software-defined networking features and for converged designs that use RDMA (Remote Direct Memory Access) on the same adapters for storage and live migration traffic. Building a new virtual switch on an LBFO team is deprecated and blocked by default on recent Windows Server versions, which explains the error in the opening scene, so use SET.",
   "SET has specific rules worth memorizing. It supports up to eight physical adapters in one team, and they should be identical: same manufacturer, model, firmware and driver. It works only in switch-independent mode, so the physical switches need no special configuration such as LACP (Link Aggregation Control Protocol) or static teaming; each adapter simply connects to a switch port. SET offers two load-balancing algorithms. Hyper-V Port ties each VM's traffic to one team member, which is simple and predictable. Dynamic balances outbound traffic by flows, spreading a single VM's connections across adapters.",
   "```powershell\nNew-VMSwitch -Name SETswitch -NetAdapterName 'NIC1','NIC2' -EnableEmbeddedTeaming $true -AllowManagementOS $true\nSet-VMSwitchTeam -Name SETswitch -LoadBalancingAlgorithm HyperVPort\nAdd-VMNetworkAdapter -ManagementOS -Name LiveMigration -SwitchName SETswitch\n```\nThe first line creates the SET switch over two adapters and keeps a host virtual NIC for management. The second sets the load-balancing algorithm. The last line adds another host virtual NIC for live migration traffic on the same converged team, and you would typically add more host vNICs for storage or cluster traffic, each with its own VLAN and quality of service settings."
  ],
  "analogy": "Think of the three switch types as rooms in an office. An external switch is a meeting room with a door to the street: visitors from outside can come and go. An internal switch is a staff room connected to the manager's office (the host) but with no street door. A private switch is a sealed room where people inside can only talk to each other; even the manager cannot listen in. SET is like widening the street door into several doors that act as one, so traffic keeps flowing if one jams.",
  "terms": [
   [
    "External switch",
    "A virtual switch bound to a physical NIC so VMs can reach the physical network."
   ],
   [
    "Internal switch",
    "A virtual switch connecting VMs and the host, with no physical network access."
   ],
   [
    "Private switch",
    "A virtual switch connecting only VMs to each other; the host is excluded."
   ],
   [
    "Switch Embedded Teaming",
    "NIC teaming built into the Hyper-V virtual switch, up to eight identical adapters, switch-independent."
   ],
   [
    "DHCP guard",
    "A VM adapter setting that blocks DHCP server messages from unauthorized VMs."
   ],
   [
    "Router guard",
    "A VM adapter setting that drops router advertisement and redirection messages from VMs that should not act as routers."
   ]
  ],
  "example": "A lab needs three VMs that can talk to each other but must never reach the host or corporate network. The admin creates a private switch and connects all three to it. Later, for production hosts with two 25 GbE RDMA NICs, the team builds a SET switch with host vNICs for management, storage and live migration.",
  "mistakes": [
   [
    "An internal switch isolates VMs from the host.",
    "An internal switch includes the host. Only a private switch excludes the host."
   ],
   [
    "SET requires LACP configured on the physical switches.",
    "SET supports only switch-independent mode. No LACP or static teaming is configured on the physical switches."
   ],
   [
    "Any mix of network adapters can join a SET team.",
    "SET adapters should be identical in manufacturer, model, firmware and driver, with up to eight per team."
   ],
   [
    "An LBFO team is still the recommended base for a new Hyper-V switch.",
    "Creating a new virtual switch on LBFO is deprecated and blocked by default on recent versions. Use SET."
   ]
  ],
  "tryit": [
   [
    "Tidewater College wants VMs on a Hyper-V host to reach the internet for updates, but the host has only one physical NIC that must stay dedicated to management, and the VMs must not appear on the campus network directly. What switch design fits?",
    "Create an internal switch and configure NAT on the host with New-NetNat, so VMs reach outside through the host's address without being bridged onto the campus network. An external switch would put the VMs directly on the physical network."
   ],
   [
    "A rogue test VM on a production Hyper-V host starts handing out IP addresses, and clients on the VLAN receive wrong gateways. Which VM adapter settings would prevent this in future?",
    "Enable DHCP guard on VMs that should not be DHCP servers, and router guard to block rogue router advertisements. These drop the unauthorized messages at the virtual switch port."
   ]
  ],
  "tip": "Host access but no physical network means internal; VMs only means private. For teaming on modern Hyper-V hosts, choose SET, which uses switch-independent mode and needs identical NICs, not LBFO.",
  "check": [
   [
    "Which virtual switch type lets VMs talk to the host but not the physical network?",
    "Internal."
   ],
   [
    "What teaming mode does SET support?",
    "Switch-independent only; no LACP or static teaming."
   ],
   [
    "What is the maximum number of physical adapters in a SET team?",
    "Eight, and they should be identical."
   ],
   [
    "What does the Allow management operating system to share this network adapter option do on an external switch?",
    "It creates a host virtual NIC on the switch so the host keeps network access through the same physical adapter."
   ]
  ]
 },
 {
  "t": "Live migration and storage migration between Hyper-V hosts; Kerberos vs CredSSP authentication",
  "hook": "It is Saturday evening at Alder Ridge Credit Union, and Marcus needs to patch Hyper-V host HV01 before the Sunday batch run. The plan is simple: live-migrate its six VMs to HV02, patch, reboot and move them back, with members noticing nothing. He opens Hyper-V Manager on his laptop at home, connects to both hosts, right-clicks the first VM and chooses Move. Seconds later an error appears: the operation failed because of an authentication problem, something about credentials not being delegated. Both hosts are healthy, the network is fine, and he is a domain admin. Why would Hyper-V refuse him, and what has to change so he can move VMs from anywhere?",
  "simple": "Live migration moves a running virtual machine from one physical server to another without switching it off, so people using it barely notice. Hyper-V copies the VM's memory across while it keeps working, then makes a very quick final switch. You can also move just the VM's disk files to new storage while it runs, called storage migration. To move VMs between servers that are not in a cluster, the servers must trust you to act on your behalf. With the default method, CredSSP, you must be signed in directly on the source server. With Kerberos, you can start moves from any computer, but an administrator must first tell Active Directory which servers may pass your identity along. It is like needing a signed permission slip.",
  "body": [
   "Live migration moves a running VM from one Hyper-V host to another with no noticeable downtime. The process has stages. Hyper-V sets up the VM on the destination, then copies the VM's memory pages across the network while the VM keeps running on the source. Because the VM keeps changing memory, Hyper-V repeatedly sends the pages that changed since the last pass, with each pass smaller than the one before. When the remaining changes are small, it briefly pauses the VM, transfers the final memory and device state, and resumes the VM on the destination. Users typically lose at most a packet or two, and network connections survive. This is how you patch, maintain or replace hosts without outages.",
   "There are three forms. Live migration within a failover cluster moves the VM's memory and state while its disks stay on shared storage, such as a Cluster Shared Volume (CSV), so only memory crosses the network; you start it in Failover Cluster Manager or with `Move-ClusterVirtualMachineRole`. Shared-nothing live migration moves a running VM between stand-alone hosts, or between clusters, including its storage, over the network, with no shared storage required; you use `Move-VM` with `-DestinationStoragePath` or per-disk paths. Storage migration moves only a running VM's virtual disks and configuration files to a different location, such as a new volume or an SMB share, without changing hosts: `Move-VMStorage -VMName APP01 -DestinationStoragePath E:\\VMs\\APP01`.",
   "For non-clustered live migration, several prerequisites must be met. Both hosts must have live migration enabled, with `Enable-VMMigration` or in Hyper-V Settings. They must be members of the same domain or of domains that trust each other. They must use the same processor manufacturer, Intel to Intel or AMD to AMD; a VM cannot live-migrate between vendors. Networks must be configured for migration traffic, ideally a dedicated network. If processor generations differ within the same vendor, enable processor compatibility mode on the VM while it is off, which hides newer CPU features so the VM can run on older processors.",
   "You can also tune how migrations travel. The performance options are TCP/IP, which sends memory directly over a TCP connection; Compression, the default, which uses spare CPU to compress the memory and reduce the data sent; and SMB, which can use SMB Direct (RDMA) and SMB Multichannel for the fastest transfers on capable networks. You also set how many simultaneous live migrations and storage migrations a host allows, which prevents a maintenance task from saturating the network.",
   "Authentication is the heart of this topic and the source of the opening scene. With CredSSP (Credential Security Support Provider), the default, no extra configuration is needed, but you must be signed in locally, or through Remote Desktop, to the source host when you start the migration, because your credentials are delegated from that interactive session to the destination. Starting a migration from Hyper-V Manager on your workstation fails, because your credentials would need to hop twice, from the workstation to the source host and on to the destination, and without an interactive session on the source host there is nothing for CredSSP to delegate from.",
   "With Kerberos, you can start migrations remotely from any management computer, but you must first configure constrained delegation on each host's computer account in Active Directory. Constrained delegation allows a host to present delegated credentials to specific services on the other hosts, and only those. Two services are needed: `cifs`, used for moving storage, and `Microsoft Virtual System Migration Service`, used for moving the VM. Each host must be allowed to delegate to the other, so the configuration goes both ways.",
   "```powershell\nSet-VMHost -VirtualMachineMigrationAuthenticationType Kerberos `\n  -VirtualMachineMigrationPerformanceOption SMB\n```\nIn Active Directory Users and Computers, on HV01's Delegation tab, choose Trust this computer for delegation to specified services only, select Use Kerberos only, and add the cifs and Microsoft Virtual System Migration Service entries for HV02, then do the same on HV02's account for HV01. Once the change has replicated in Active Directory, remote migrations succeed.",
   "Inside a failover cluster, the cluster service handles authentication for clustered live migration, so this delegation question applies mainly to stand-alone hosts and shared-nothing migrations. For the exam, link the symptoms to causes: a migration that works when you are signed in on the host but fails from a remote console points to CredSSP; the fix is either to sign in to the source host or to switch to Kerberos with constrained delegation."
  ],
  "analogy": "CredSSP is like a building where you must hand your ID badge to the receptionist in person before they will call the building next door for you. You cannot phone it in from home. Kerberos constrained delegation is a signed letter on file at reception that says: this receptionist may vouch for you to the building next door, but only for the mailroom and the moving department. With the letter on file, you can make the request from anywhere. The analogy stops at direction: the letter must exist at both buildings for moves both ways.",
  "terms": [
   [
    "Live migration",
    "Moving a running VM between Hyper-V hosts with no noticeable downtime."
   ],
   [
    "Shared-nothing live migration",
    "Live migration of a VM and its storage between hosts without shared storage."
   ],
   [
    "Storage migration",
    "Moving a running VM's disks and files to new storage on the same host."
   ],
   [
    "Processor compatibility mode",
    "A VM setting that hides newer CPU features so the VM can migrate between hosts with different processor generations of the same vendor."
   ],
   [
    "CredSSP",
    "Default live migration authentication; requires signing in to the source host to start the move."
   ],
   [
    "Kerberos constrained delegation",
    "AD setting allowing hosts to delegate for cifs and Microsoft Virtual System Migration Service, enabling remote migration starts."
   ]
  ],
  "example": "An admin tries to live-migrate a VM from HV01 to HV02 using Hyper-V Manager on his laptop and gets an authentication error. The hosts use CredSSP. He configures constrained delegation for cifs and Microsoft Virtual System Migration Service between the hosts in both directions, switches both to Kerberos with Set-VMHost, and remote migrations now succeed.",
  "mistakes": [
   [
    "Being a domain admin is enough to start a CredSSP migration from any computer.",
    "CredSSP requires you to be signed in to the source host when you start the migration, regardless of group membership."
   ],
   [
    "Kerberos live migration needs delegation for only the migration service.",
    "Constrained delegation must include both cifs and Microsoft Virtual System Migration Service, configured on each host for the other."
   ],
   [
    "Processor compatibility mode lets a VM move between Intel and AMD hosts.",
    "It only bridges processor generations from the same vendor. Live migration between Intel and AMD is not supported."
   ],
   [
    "Moving a VM's disks to a new volume on the same host requires shutting the VM down.",
    "Storage migration with Move-VMStorage moves disks and files while the VM keeps running."
   ]
  ],
  "tryit": [
   [
    "Hollowbrook Clinic has two stand-alone Hyper-V hosts. The admins work only from a jump server and want to start live migrations from there without signing in to the hosts. What must be configured?",
    "Switch both hosts to Kerberos authentication with Set-VMHost, and configure Kerberos constrained delegation on each host's computer account for the other host's cifs and Microsoft Virtual System Migration Service. Live migration must also be enabled on both hosts."
   ],
   [
    "A live migration between two Intel hosts fails because the destination has an older processor generation. The VM is currently running. What should you do?",
    "Shut down the VM, enable processor compatibility mode in its processor settings, start it again, and retry the migration. The setting cannot be changed while the VM runs."
   ]
  ],
  "tip": "Migration fails when started from a remote console: CredSSP is in use; either sign in to the source host or switch to Kerberos with constrained delegation. Moving only disks on the same host is storage migration.",
  "check": [
   [
    "Which two services must be added to constrained delegation for Kerberos live migration?",
    "cifs and Microsoft Virtual System Migration Service."
   ],
   [
    "What limitation does CredSSP authentication impose?",
    "You must start the migration while signed in to the source host."
   ],
   [
    "How do you move a running VM's VHDX files to a new volume without moving the VM to another host?",
    "Use storage migration, for example Move-VMStorage."
   ],
   [
    "What is the default live migration performance option?",
    "Compression."
   ]
  ]
 },
 {
  "t": "Hyper-V Replica: primary and replica servers, replication frequency, recovery points, planned and unplanned failover, test failover",
  "hook": "It is 6:40 on a Monday morning when Priya, the only systems administrator at Lakeview Dental Group, gets a text from the building manager: a pipe burst over the branch server closet overnight. The Hyper-V host that runs the scheduling and billing VM is sitting in an inch of water. Patients start arriving at eight. Priya set up Hyper-V Replica to headquarters last spring, and the replica VM is sitting there, switched off, waiting. But which button does she press, on which server, and how much of Sunday night's data will be there when the VM boots? The answer depends on choices she made months ago.",
  "simple": "Hyper-V Replica keeps a spare copy of a virtual machine on a second Hyper-V host, usually in another building. Every few seconds or minutes, the main host sends the changes it has made to the spare host, which saves them but leaves the spare VM turned off. If the main building has a disaster, you turn on the spare and carry on, losing at most the changes that had not been sent yet. Think of it like a shared notebook where you text a photo of each new page to a friend across town: if your notebook is lost in a fire, your friend has every page up to the last photo you sent. Tests let you practice opening the friend's copy without disturbing the photos that keep arriving.",
  "body": [
   "Hyper-V Replica is a disaster recovery feature built into the Hyper-V role at no extra cost. It asynchronously copies a virtual machine (VM) from one Hyper-V host, called the primary server, to another, called the replica server, which is often in a different site. Asynchronous means the primary does not wait for the replica to confirm each write, so the VM runs at full speed and a slow link only delays replication instead of slowing users. The replica VM stays powered off and keeps receiving changes; if the primary site fails, you start it. No shared storage, special hardware or failover cluster is required, and the two hosts can even be in different domains or workgroups when you use certificate authentication.",
   "Setup has two sides, and the replica side comes first. On the replica server, open Hyper-V Settings, select Replication Configuration and enable the computer as a replica server. Next choose authentication. Kerberos over HTTP uses port 80, works only between hosts in the same or trusted Active Directory domains, and does not encrypt the replicated data in transit. Certificate-based authentication over HTTPS uses port 443, encrypts the traffic, and works across untrusted domains or workgroup hosts, which is why it is the answer whenever an exam question mentions different forests or non-domain hosts. Then decide whether to accept replication from any authenticated server, with a single default storage location, or only from the specific servers you list, each with its own storage path and trust group.",
   "One step is easy to forget: Windows Defender Firewall does not open the listener automatically. You must enable the inbound rule named Hyper-V Replica HTTP Listener (TCP-In) or Hyper-V Replica HTTPS Listener (TCP-In), depending on the authentication you chose. If the replica server is a failover cluster rather than a single host, you do not configure each node; you add the Hyper-V Replica Broker cluster role, give it a client access point name, and point the primary at that name. On the primary server, you right-click the VM and choose Enable Replication, or run `Enable-VMReplication` and then `Start-VMInitialReplication` in PowerShell.",
   "Replication frequency is how often the primary sends accumulated changes, and Hyper-V offers exactly three choices: 30 seconds, 5 minutes or 15 minutes. A shorter frequency means less possible data loss if the primary fails, but it needs more consistent bandwidth and a better link. If the link cannot keep up, replication falls behind and health turns to a warning. Initial replication, the first full copy of the virtual disks, can be sent over the network immediately or at a scheduled off-peak time, exported to external media and physically shipped to the replica site, or seeded from an existing VM already restored at the replica site from backup. You can also exclude virtual disks that do not need protection, such as a dedicated page file disk, to save bandwidth.",
   "Recovery points decide what you can fail over to. By default the replica keeps only the latest recovery point, which is the most recent set of changes received. You can choose to keep additional hourly recovery points, up to 24 hours of history, so that if corruption or ransomware reached the replica you can step back to an earlier hour. Optionally, some of those points can be application-consistent: the primary uses the Volume Shadow Copy Service (VSS) inside the guest at an interval you set, so applications such as databases flush their data and the point is safe to restore, not merely crash-consistent. More recovery points and more frequent VSS snapshots cost storage on the replica. Extended replication lets the replica server forward the VM onward to a third server, for example a branch to headquarters to a remote vault site.",
   "Failover comes in three kinds, and the exam tests where each one runs and whether it can lose data. A test failover runs on the replica server. It creates a temporary copy of the replica VM, with Test appended to its name, connected to a virtual switch you choose, ideally an isolated one so it cannot clash with the production VM on the network. Replication continues without interruption the whole time. When you finish checking that the VM boots and the application works, you choose Stop Test Failover and the copy is deleted.",
   "A planned failover starts on the primary server when you have warning, such as a scheduled datacenter power outage or a hardware migration. You shut down the primary VM first, then run Planned Failover from its Replication menu. Hyper-V sends any remaining changes, so no data is lost, then starts the replica VM and can reverse the replication direction so the old primary becomes the new replica. An unplanned failover runs on the replica server after the primary is lost. You choose a recovery point, accept that changes made after the last replicated cycle are gone, and start the VM; in PowerShell this is `Start-VMFailover` followed by `Complete-VMFailover` once you are satisfied, which commits the choice and discards the other recovery points. When the original site is repaired, you use Reverse Replication, or `Set-VMReplication -Reverse`, to protect the VM back toward it.",
   "Finally, monitor health so you find problems before a disaster does. In Hyper-V Manager, right-click the VM and choose Replication, then View Replication Health, to see the state, the last successful replication time, the number of errors and the pending replication size. The `Measure-VMReplication` cmdlet shows the same data for many VMs at once, and the Hyper-V-VMMS event log records replication errors. A health of Warning or Critical usually points to a link that cannot keep up with the chosen frequency, a firewall change or a certificate that has expired."
  ],
  "analogy": "Hyper-V Replica is like a photocopier that sends each new page of a ledger to a safe in another town every few minutes. A test failover is photocopying the safe's copy to check it is readable while new pages keep arriving. A planned failover is walking the original ledger to the safe yourself before closing the office, so nothing is missing. An unplanned failover is opening the safe after a fire and accepting that the last few minutes of entries never made it. The analogy stops at recovery points: the safe can also hold hourly snapshots you can choose from.",
  "terms": [
   [
    "Primary server",
    "The Hyper-V host that runs the production VM and sends its changes to the replica server."
   ],
   [
    "Replica server",
    "The Hyper-V host that receives replicated VM changes and can run the VM after failover."
   ],
   [
    "Replication frequency",
    "How often changes are sent: every 30 seconds, 5 minutes or 15 minutes."
   ],
   [
    "Recovery point",
    "A saved point in time on the replica that you can fail over to; up to 24 hours of additional hourly points can be kept."
   ],
   [
    "Application-consistent recovery point",
    "A recovery point created using VSS inside the guest so applications have flushed their data, making it safe to restore."
   ],
   [
    "Planned failover",
    "Failover initiated from the primary with the VM shut down, sending all changes so no data is lost."
   ],
   [
    "Unplanned failover",
    "Failover started on the replica server after the primary is lost, using a chosen recovery point and accepting possible data loss."
   ],
   [
    "Hyper-V Replica Broker",
    "Failover cluster role that allows a cluster to act as a replica server."
   ]
  ],
  "example": "A branch office replicates its file server VM to headquarters every 5 minutes with certificate authentication, because the branch host is in a workgroup. Each quarter, the admin runs a test failover at headquarters on an isolated virtual switch to prove the VM boots, then stops the test. When the branch loses power for several days, she performs an unplanned failover at headquarters to the latest recovery point, and after the branch is repaired she reverses replication back to it.",
  "mistakes": [
   [
    "Planned failover is started on the replica server.",
    "Planned failover starts on the primary, after you shut the primary VM down, so the last changes can be sent. Unplanned failover is the one started on the replica server."
   ],
   [
    "A test failover pauses replication, so you should schedule it after hours.",
    "Test failover creates a separate test copy on the replica server and replication keeps running. You only need an isolated network so the test copy does not conflict with production."
   ],
   [
    "Kerberos authentication encrypts replication traffic.",
    "Kerberos over HTTP authenticates the hosts but sends data unencrypted on port 80. For encryption in transit, or for hosts in untrusted domains or workgroups, use certificate-based authentication over HTTPS on port 443."
   ],
   [
    "Enabling a host as a replica server opens the firewall automatically.",
    "The Hyper-V Replica HTTP or HTTPS listener inbound rule must be enabled manually, or replication fails to connect."
   ]
  ],
  "tryit": [
   [
    "Your company plans a full power shutdown of its main server room this Saturday for electrical work. Twenty VMs replicate to a second building every 5 minutes. Management says no transaction data may be lost. What do you do on Saturday morning, and where?",
    "Perform planned failovers. On each primary host, shut down the VM, then run Planned Failover from the primary. Hyper-V sends the remaining changes before starting the replica, so nothing is lost, and you can reverse replication so the main room becomes the replica when it powers back on. An unplanned failover would risk losing up to the last replication interval."
   ],
   [
    "An auditor asks you to prove the disaster recovery copy of your ERP server actually boots, but you are not allowed any production downtime. Which action do you take, and what network setting matters?",
    "Run a test failover on the replica server and connect the test VM to an isolated virtual switch. Replication keeps running, the production VM is untouched, and the isolated network prevents duplicate names or IP addresses from clashing with production. Stop the test afterward to delete the copy."
   ]
  ],
  "tip": "Test failover never interrupts replication. Planned failover starts on the primary and loses no data; unplanned failover starts on the replica and can lose data. Cross-domain or workgroup hosts need certificate-based authentication over HTTPS. A cluster as replica target needs the Hyper-V Replica Broker role.",
  "check": [
   [
    "Which authentication method should you use if the primary and replica hosts are in untrusted domains?",
    "Certificate-based authentication over HTTPS, because Kerberos requires the hosts to be in the same or trusted domains."
   ],
   [
    "Where do you start a planned failover, and what must you do first?",
    "On the primary server, after shutting down the primary VM, so remaining changes can be replicated before the replica starts."
   ],
   [
    "What are the three replication frequency options?",
    "30 seconds, 5 minutes and 15 minutes."
   ],
   [
    "What must you configure on a failover cluster so it can receive replicas?",
    "The Hyper-V Replica Broker cluster role, which the primary uses as its replica server name."
   ]
  ]
 },
 {
  "t": "Azure Site Recovery for Hyper-V and Azure VMs: recovery plans, test failover, RPO and failback",
  "hook": "The board of Tidewater Freight has a new rule after a competitor's warehouse fire made the local news: if the main datacenter is lost, the shipping portal must be back within two hours, and no more than fifteen minutes of orders may be lost. Marcus, the infrastructure lead, has no second datacenter and no budget to build one. He does have an Azure subscription. On Thursday the CFO asks him a pointed question in the hallway: how will we prove this works without actually burning anything down, and how do we get back home afterward?",
  "simple": "Azure Site Recovery is a service that keeps a copy of your servers in Azure, updated every few minutes, so that if your building or Azure region has a disaster you can switch to the copy. Two numbers describe the goal. One is how much recent work you can afford to lose, such as 15 minutes. The other is how long you can afford to be offline, such as 2 hours. A recovery plan is a written checklist the service follows automatically, such as start the database first, then the app, then the website. A test failover lets you rehearse in a sealed-off practice network. Think of a fire drill held in an empty copy of the building: everyone practices, and the real office keeps working.",
  "body": [
   "Azure Site Recovery (ASR) is Azure's disaster recovery as a service. It continuously replicates machines to a secondary location and orchestrates failover when disaster strikes, so you do not need to own a second datacenter. For this exam, two scenarios matter: on-premises Hyper-V virtual machines (VMs) replicating to Azure, and Azure VMs replicating from one Azure region to another. Both are managed from a Recovery Services vault, the same resource type that hosts Azure Backup, which stores replication settings, recovery points metadata and recovery plans.",
   "Two terms frame every disaster recovery (DR) design, and the exam expects you to keep them apart. The recovery point objective (RPO) is the maximum acceptable data loss, measured in time: an RPO of 15 minutes means you can lose at most the last 15 minutes of changes. The recovery time objective (RTO) is the maximum acceptable downtime until service is restored. Replication frequency and recovery point retention drive RPO, because they decide how recent your newest copy is. Automation such as recovery plans drives RTO, because it decides how quickly a working service comes back after you press failover. A design can meet one objective and miss the other.",
   "For Hyper-V to Azure, you first create a vault and choose the protection goal. If the hosts are not managed by System Center Virtual Machine Manager (VMM), you define a Hyper-V site and add hosts to it; if VMM manages them, you use VMM clouds instead and install the provider on the VMM server. On each Hyper-V host you install the Azure Site Recovery Provider and the Microsoft Azure Recovery Services (MARS) agent, and register the host with the vault using a downloaded registration key. Both components connect outbound over HTTPS port 443, so no inbound firewall ports are opened on-premises. You then create a replication policy that sets copy frequency, recovery point retention and the app-consistent snapshot frequency, associate the policy with the site, and enable replication for chosen VMs, picking the target subscription, resource group, storage and virtual network. Changes flow into managed disks in Azure, and no Azure VM exists or is billed for compute until a failover happens.",
   "For Azure to Azure, no on-premises components are needed at all. When you enable replication for a VM, ASR installs the Site Recovery Mobility service extension automatically and creates target resources such as a resource group, virtual network and availability settings in the target region, which is often the paired region but can be any supported region you choose. It also creates a cache storage account in the source region, which stages changes before they are sent across. Crash-consistent recovery points are created frequently, and app-consistent recovery points, which use the Volume Shadow Copy Service inside Windows, are created on the schedule in the replication policy.",
   "Recovery plans turn individual VM failovers into an orchestrated runbook, and they are the main tool for meeting an RTO. You add machines to a plan and arrange them into groups that fail over in order: for example, database servers in group 1, application servers in group 2 and web servers in group 3, so each tier starts only after the tier it depends on. Between or around groups you can insert Azure Automation runbooks as scripted pre-actions or post-actions, such as updating a DNS record, attaching VMs to a load balancer or changing connection strings, and manual actions that pause the plan until a person confirms a step. One click then fails over the whole application the same way every time.",
   "Test failover is how you prove DR without disrupting production. You choose a recovery plan or VM, pick a recovery point (latest processed, latest app-consistent or a specific point), and fail over into an isolated virtual network that has no route to production. You check that applications work, then run Cleanup test failover, record notes and let ASR delete the test resources. Replication continues throughout, so your RPO is never put at risk by testing. Auditors usually want to see the notes from these drills.",
   "A real failover, planned when you have warning or unplanned during an outage, creates the VMs in the target. After you confirm they work, you Commit the failover, which locks in the chosen recovery point. When the primary site is repaired, you Reprotect, which reverses replication so changes made in the recovery site flow back toward the original site. Only then do you fail back with another failover in the reverse direction, to the original location or an alternate one, followed by another commit and reprotect to restore the normal direction. For Hyper-V, failback to on-premises is a planned failover from Azure, and you can choose to synchronize only the changes before shutting down the Azure VM to keep the final downtime short.",
   "The key difference from Hyper-V Replica is the target and the orchestration. Hyper-V Replica needs a second site with your own Hyper-V hosts and fails over one VM at a time. ASR uses Azure as the second site, adds recovery plans with ordered groups and scripts, and also protects Azure VMs across regions."
  ],
  "analogy": "Think of ASR as a theater company's understudy system. The understudies (replicated disks) learn every line as the main cast performs, but they do not go on stage, or cost a full salary, until needed. The recovery plan is the stage manager's cue sheet: lights first, then the orchestra, then the actors. A test failover is a dress rehearsal in a second, empty theater. The analogy stops at failback: in ASR you must formally reprotect, reversing who learns from whom, before the original cast can return.",
  "terms": [
   [
    "RPO",
    "Recovery point objective: the maximum tolerable data loss, measured as time."
   ],
   [
    "RTO",
    "Recovery time objective: the maximum tolerable time to restore service."
   ],
   [
    "Recovery Services vault",
    "The Azure resource that stores Site Recovery and Backup configuration and data."
   ],
   [
    "Replication policy",
    "Settings for copy frequency, recovery point retention and app-consistent snapshot frequency, applied to protected machines."
   ],
   [
    "Recovery plan",
    "An ordered set of machine groups with scripts and manual steps that fail over together."
   ],
   [
    "Commit",
    "The step after failover that confirms the chosen recovery point and finalizes the failed-over VMs."
   ],
   [
    "Reprotect",
    "Reversing replication after failover so the VM is protected back toward the original site before failback."
   ]
  ],
  "example": "A company protects a three-tier app on Hyper-V with ASR to Azure. A recovery plan fails over the SQL Server VM in group 1, the app servers in group 2 and the web servers in group 3, with an Azure Automation runbook that updates public DNS at the end. Twice a year they run a test failover into an isolated virtual network, verify the app, record notes and clean up. After a real outage they commit, reprotect once the datacenter is back, and fail back during a maintenance window.",
  "mistakes": [
   [
    "RPO is how long the business can be down.",
    "That is RTO. RPO is how much data, measured in time, you can afford to lose. Replication frequency drives RPO; recovery plans and automation drive RTO."
   ],
   [
    "You can fail back immediately after a failover.",
    "You must first commit and then reprotect so replication runs from the recovery site toward the original site. Failback is a failover in the reverse direction that only works once that reverse replication is in place."
   ],
   [
    "Test failover stops replication, so it should be rare.",
    "Test failover runs in an isolated network while replication continues. Cleanup test failover removes the test VMs afterward."
   ],
   [
    "Hyper-V hosts need inbound firewall ports opened from Azure.",
    "The ASR Provider and the Recovery Services agent connect outbound over HTTPS, so no inbound ports are required on-premises."
   ]
  ],
  "tryit": [
   [
    "A retailer's order system has a web tier, an app tier and a SQL Server tier on Hyper-V. During last year's manual DR drill, the web servers started before the database and threw errors for 40 minutes, and someone forgot to update DNS. The RTO is one hour. What ASR feature fixes both problems, and how would you set it up?",
    "A recovery plan. Put the SQL Server VM in group 1, app servers in group 2 and web servers in group 3 so tiers start in dependency order, and add an Azure Automation runbook as a post-action to update DNS. Test it with a test failover into an isolated network to confirm the timing meets the one-hour RTO."
   ],
   [
    "Your Azure VMs in one region were failed over to a second region after a regional outage, and the failover was committed. The original region is now healthy and management wants to move back this weekend. What steps do you take, in order?",
    "First reprotect the VMs so they replicate from the second region back to the original region, and wait for replication to finish. Then run a failover in the reverse direction to the original region, commit it, and reprotect again so the VMs are once more protected toward the second region."
   ]
  ],
  "tip": "Test failover uses an isolated network and does not stop replication. Order of operations after a real failover: commit, reprotect, then fail back. Hyper-V hosts without VMM need the ASR Provider and the Recovery Services agent. RPO is data loss; RTO is downtime.",
  "check": [
   [
    "What components are installed on Hyper-V hosts for Hyper-V to Azure replication without VMM?",
    "The Azure Site Recovery Provider and the Microsoft Azure Recovery Services agent."
   ],
   [
    "Which ASR feature orders VMs into groups and runs scripts during failover?",
    "A recovery plan."
   ],
   [
    "What must you do before failing back to the original site?",
    "Commit the failover, then reprotect the VMs so replication runs from the recovery site back to the original site."
   ],
   [
    "Which Azure resource stores ASR replication settings and recovery plans?",
    "A Recovery Services vault."
   ]
  ]
 },
 {
  "t": "Azure VMs running Windows Server: Azure Hybrid Benefit, Sysprep and Azure Compute Gallery, extensions, Azure Edition hotpatching",
  "hook": "Three months after Northgate Insurance moved forty Windows Server VMs to Azure, the finance team flags the cloud bill: the company is paying for Windows Server licenses in Azure while it still owns Datacenter licenses with Software Assurance sitting unused. The same week, a new web server built by copying an existing VM disk refuses to join the domain because it has the same security identifier as the original. And the security team wants monthly patches without the 2 a.m. reboot window. Dev, the lead admin, has one meeting to explain how all three get fixed. Where does he start?",
  "simple": "Running Windows Server in Azure comes with a few special tools. First, if you already bought Windows Server licenses, you can tell Azure so and stop paying for the license a second time; you only pay for the computer itself. Second, to make many identical servers, you set one up the way you like, then run a cleanup tool called Sysprep that removes its unique identity, and save it as a template image in a library called Azure Compute Gallery. Third, extensions are small add-ons Azure can install into a running VM, such as a script runner or a monitoring agent. Finally, a special Azure-only edition of Windows Server can install most security updates without restarting. It is like a car you already own: you only rent the parking space, not a second car.",
  "body": [
   "Running Windows Server in Azure virtual machines (VMs) is a core hybrid skill, and several features exist only for Windows Server on Azure. This lesson covers four of them: licensing with Azure Hybrid Benefit, building reusable images with Sysprep and Azure Compute Gallery, extending VMs with extensions and Run Command, and Windows Server Datacenter: Azure Edition with hotpatching. Each one answers a different exam question pattern: cost, consistency, automation and patching without downtime.",
   "Start with licensing, because it is the most common money question. By default, the hourly price of an Azure Windows VM includes the Windows Server license. Azure Hybrid Benefit lets you bring eligible on-premises Windows Server licenses, meaning Standard or Datacenter core licenses with active Software Assurance or qualifying subscription licenses, and pay only the base compute rate, the same rate as a Linux VM of that size. You enable it when creating the VM by confirming you have an eligible license, later on the VM's Configuration blade, or by setting the license type to `Windows_Server` with PowerShell (`Update-AzVM` after setting `LicenseType`) or the Azure CLI. Licensing rules decide how many cores you must cover for each VM, and those rules vary by agreement, so check them rather than guessing; you are responsible for compliance, and Azure does not verify your licenses. Azure Hybrid Benefit also extends to some services on Azure Arc-enabled servers.",
   "Next, building a standard image. You deploy a VM, install roles, updates and agents, and harden it. Then you generalize it with the System Preparation tool (Sysprep), which removes machine-specific information such as the computer security identifier (SID), the computer name and driver caches, so each VM deployed from the image is unique and can join a domain without identity conflicts. Run `C:\\Windows\\System32\\Sysprep\\sysprep.exe /generalize /oobe /shutdown`. The /oobe switch makes the next boot run the out-of-box experience, which Azure automates with the name and administrator account you supply at deployment. Wait for the VM to show Stopped in the portal, then capture it. After generalizing, the source VM cannot be started and used normally again, so build images from a dedicated build VM, not a production server.",
   "Captures go into an Azure Compute Gallery, formerly called Shared Image Gallery. A gallery holds image definitions and image versions. An image definition is the logical image, such as Win2025-Web, and records the publisher, offer and SKU names you choose, the OS type, the VM generation and whether the image is generalized or specialized. Image versions are the actual deployable images under that definition, numbered in a major.minor.patch format such as 1.0.0 and 1.1.0. You can replicate each version to multiple regions so deployments are local, keep several replicas per region for large scale-outs, mark a version as excluded from latest, and share the gallery with role-based access control (RBAC), with other tenants or through community galleries. A specialized image skips Sysprep and keeps the original machine identity, computer name and accounts, which suits cloning a single VM for troubleshooting rather than mass deployment.",
   "Extensions add capabilities after deployment. They are small applications that Azure installs and manages through the Azure VM agent running inside the VM, so the agent must be installed and healthy. Common Windows examples are the Custom Script Extension, which downloads and runs a script after deployment; the PowerShell Desired State Configuration (DSC) extension; the Azure Monitor Agent for logs and metrics; Microsoft Antimalware; the Key Vault extension, which keeps certificates on the VM up to date as they rotate; and the machine configuration extension used by Azure Policy guest configuration. You can deploy extensions in the portal under Extensions + applications, in Azure Resource Manager templates or Bicep, with `Set-AzVMExtension`, or automatically at scale with Azure Policy. If an extension fails, its status on that blade and the logs under `C:\\WindowsAzure\\Logs` are the first places to look.",
   "Run Command is related but different. It lets you run a one-off PowerShell script inside a Windows VM through the VM agent, from the portal or `Invoke-AzVMRunCommand`, without any network access to the VM. That makes it a recovery tool, for example to reset a firewall rule or fix a misconfigured network adapter that locked you out of Remote Desktop.",
   "Finally, Windows Server Datacenter: Azure Edition is a special edition available only on Azure and on Azure Local. Its signature feature is hotpatching: monthly security updates are applied in memory to running processes without restarting the VM, so most months need no reboot. Every quarter a baseline update arrives that does require a restart, after which the hotpatch cycle continues. Hotpatching needs a supported Azure Edition image and is orchestrated with Azure Update Manager. Azure Edition has also introduced features ahead of other editions, such as SMB over QUIC in its early releases. You cannot convert a normal Datacenter VM in place into Azure Edition to gain hotpatching; you deploy from an Azure Edition image from the start.",
   "Put together, a well-run Azure Windows estate looks like this: licenses applied through Azure Hybrid Benefit where eligible, every new server deployed from a versioned gallery image, extensions or policy finishing configuration and installing agents, and hotpatch-capable Azure Edition images used wherever reboot windows are hard to schedule."
  ],
  "analogy": "Sysprep and the gallery work like a cookie cutter and a recipe binder. Sysprep scrapes your name off the cookie dough so every cookie cut from it is a fresh, anonymous cookie rather than a copy of yours. The gallery is the binder: each recipe card (image definition) describes the cookie, and each dated batch (image version) is what you actually bake from, copied to every kitchen (region) that needs it. The analogy breaks for specialized images, which keep their original identity on purpose.",
  "terms": [
   [
    "Azure Hybrid Benefit",
    "Using eligible on-premises Windows Server licenses in Azure to pay only the base compute rate."
   ],
   [
    "Sysprep /generalize",
    "Removes machine-specific data such as the SID so an image can be deployed many times."
   ],
   [
    "Azure Compute Gallery",
    "A service that stores image definitions and versions, replicates them across regions and shares them."
   ],
   [
    "Image definition",
    "The logical grouping in a gallery that describes an image (OS, generation, generalized or specialized)."
   ],
   [
    "Image version",
    "A deployable image under a definition, numbered major.minor.patch, replicated to chosen regions."
   ],
   [
    "VM extension",
    "A small application installed and managed by Azure through the VM agent, such as the Custom Script Extension."
   ],
   [
    "Azure Edition",
    "Windows Server Datacenter: Azure Edition, available on Azure and Azure Local, supporting hotpatching."
   ]
  ],
  "example": "An organization with Datacenter licenses and Software Assurance migrates 50 VMs and enables Azure Hybrid Benefit on each. It builds a hardened web server image, runs Sysprep with /generalize /oobe /shutdown, captures it as version 1.0.0 of a gallery image definition replicated to two regions, and deploys new servers from it with the Custom Script Extension finishing app setup. Its public web tier uses Azure Edition images with hotpatching so monthly security updates do not need a reboot.",
  "mistakes": [
   [
    "Copying a VM's disk is a fine way to make many domain-joined servers.",
    "Cloned disks keep the same SID and computer identity. For mass deployment, generalize with Sysprep and capture a generalized image; use specialized images only to clone a single machine."
   ],
   [
    "Azure Hybrid Benefit is automatic if you own licenses.",
    "You must enable it per VM (or at scale), and you remain responsible for license compliance. Without it, you pay for the Windows license in the VM price."
   ],
   [
    "Hotpatching can be turned on for any Windows Server Datacenter VM.",
    "Hotpatching on Azure VMs requires Windows Server Datacenter: Azure Edition deployed from a supported image. An existing standard Datacenter VM cannot be converted in place."
   ],
   [
    "An image definition is the image you deploy.",
    "The definition is the logical description; you deploy from an image version under it."
   ]
  ],
  "tryit": [
   [
    "You need to deploy 30 identical Windows Server VMs across two Azure regions, each with a different name and domain-joined. A colleague suggests copying the managed disk of a configured VM 30 times. What do you do instead, and why?",
    "Generalize the configured build VM with Sysprep /generalize /oobe /shutdown, capture it into an Azure Compute Gallery as a generalized image definition with version 1.0.0 replicated to both regions, and deploy from it. Sysprep removes the SID and computer name so each VM is unique, and regional replicas make deployment fast in both regions."
   ],
   [
    "After a firewall change, nobody can reach an Azure VM over RDP or any other network path, but the VM agent is reporting healthy. How can you fix the rule without network access?",
    "Use Run Command from the portal or Invoke-AzVMRunCommand to run a PowerShell command inside the VM through the VM agent, such as re-enabling the Remote Desktop firewall rule. Run Command does not need network connectivity to the VM."
   ]
  ],
  "tip": "Paying for Windows licenses twice is the Azure Hybrid Benefit trap. A captured VM that will be deployed many times must be generalized with Sysprep. No-reboot monthly security patching on Azure VMs points to Azure Edition with hotpatching, deployed from an Azure Edition image.",
  "check": [
   [
    "What does Sysprep /generalize remove, and why?",
    "Machine-specific information such as the SID and computer name, so every VM deployed from the image is unique."
   ],
   [
    "In Azure Compute Gallery, what is the difference between an image definition and an image version?",
    "The definition describes the image logically (OS, generation, generalized or specialized); versions are the actual deployable images."
   ],
   [
    "Which Windows Server edition provides hotpatching on Azure VMs?",
    "Windows Server Datacenter: Azure Edition."
   ],
   [
    "What must be running inside a VM for extensions and Run Command to work?",
    "The Azure VM agent."
   ]
  ]
 },
 {
  "t": "DNS zones: primary, secondary, stub and AD-integrated; replication scope; secure dynamic updates",
  "hook": "On Tuesday morning the help desk at Riverbend County Schools logs fourteen tickets in an hour: teachers cannot reach the grade book server. Elena, on the infrastructure team, opens DNS Manager and finds the server's A record now points to a student's laptop, which registered itself with the same name over the weekend. The zone is a standard primary zone that accepts nonsecure updates, copied from a guide written years ago. Her manager asks two questions: how did a laptop overwrite a server's record, and what zone settings make sure it never happens again?",
  "simple": "DNS is the internet's phone book: it turns names like grades.school.local into addresses computers can use. A zone is one section of that phone book that a particular server is in charge of. Some copies are the main editable copy (primary), some are read-only copies kept for backup (secondary), and some only list who to call for another section (stub). In a Windows domain, you can store the zone inside Active Directory, the directory that already holds user accounts, so every domain controller has an editable copy and only signed-in domain computers are allowed to update their own entries. That last part, called secure updates, stops a stranger's laptop from replacing a server's phone number with its own.",
  "body": [
   "A Domain Name System (DNS) zone is the portion of the namespace a DNS server is responsible for answering, such as corp.contoso.com. Windows Server DNS supports several zone types, and the type you choose determines three things: where the zone data is stored, which servers may change it, and how the copies stay in sync. You can create forward lookup zones, which map names to IP addresses, and reverse lookup zones, which map IP addresses back to names using the in-addr.arpa domain for IPv4 (for example 20.1.10.in-addr.arpa for the 10.1.20.0/24 network) and ip6.arpa for IPv6.",
   "A primary zone holds the writable master copy of the zone. A standard, file-based primary zone stores its data in a text file named after the zone, such as corp.contoso.com.dns, under `%windir%\\System32\\dns`, and only that one server can accept changes. Every other copy must come from it, which makes the primary server a single point of failure for updates even if other servers can still answer queries.",
   "A secondary zone is a read-only copy obtained from a master server by zone transfer. A full zone transfer (AXFR) copies the whole zone, while an incremental zone transfer (IXFR) copies only the changes since the secondary's last serial number. The master must allow the transfer on the zone's Zone Transfers tab, and the safest choice is Only to the following servers, listing the secondaries by IP address, rather than To any server, which would let anyone download your whole zone. The master can also notify secondaries when the zone changes so they request a transfer promptly instead of waiting for the refresh interval in the start of authority (SOA) record. Secondaries add redundancy and spread query load, and they work with non-Windows DNS servers too. Create one in PowerShell with `Add-DnsServerSecondaryZone -Name corp.contoso.com -ZoneFile corp.contoso.com.dns -MasterServers 10.1.0.10`.",
   "A stub zone contains only the records needed to find the authoritative servers for another zone: the SOA record, the name server (NS) records and the glue A records that give those name servers' IP addresses. The stub zone refreshes itself from the other zone's servers, so it stays current automatically as that zone adds or removes name servers. That makes it useful for pointing to a partner's or child domain's DNS servers. Compared with a conditional forwarder, the difference the exam tests is maintenance: a stub zone learns the authoritative servers dynamically, while a conditional forwarder uses a list of IP addresses you maintain by hand.",
   "An Active Directory-integrated zone stores its data in Active Directory Domain Services (AD DS) rather than a file, and it can be created only on a DNS server that is also a domain controller (DC). AD replication carries zone changes, so every DC hosting the zone has a writable copy (multi-master), no separate zone transfer configuration is needed between those DCs, and zone data is protected by AD permissions. A primary zone or a stub zone can be AD-integrated; a secondary zone cannot, because by definition it is a read-only copy obtained by zone transfer. You can still offer AD-integrated zones to non-DC or third-party DNS servers as secondaries through zone transfers.",
   "The replication scope decides which DCs receive an AD-integrated zone, and there are four options. To all DNS servers running on domain controllers in this forest stores the zone in the ForestDnsZones application partition, which is typical for the _msdcs.forestroot zone that every DC in the forest needs to locate others. To all DNS servers running on domain controllers in this domain stores it in DomainDnsZones, and this is the default. To all domain controllers in this domain stores it in the domain partition, which replicates to every DC even if it is not a DNS server and exists for compatibility with very old DCs. Finally, To all domain controllers in the scope of this directory partition uses a custom application directory partition you create, to target only specific DCs. With PowerShell you write `Add-DnsServerPrimaryZone -Name corp.contoso.com -ReplicationScope Domain`, where the scope values are Forest, Domain, Legacy and Custom.",
   "Dynamic updates let clients and Dynamic Host Configuration Protocol (DHCP) servers register and update their own A and PTR records, so you do not maintain records by hand. The options are None, Nonsecure and secure, and Secure only. Secure only, available only on AD-integrated zones, accepts updates only from authenticated domain members and records an owner on each record through its access control list (ACL), so only the computer that created a record, or an administrator, can change it later. A rogue or unmanaged device therefore cannot overwrite a server's record. It is the recommended setting. Nonsecure and secure accepts updates from anyone, which is how a laptop can hijack a name.",
   "Pair dynamic updates with aging and scavenging so stale records from retired or moved computers are removed automatically. Aging uses timestamps on dynamically registered records plus no-refresh and refresh intervals (seven days each by default), and scavenging must be enabled on both the zone and at least one server. Static records you create manually have no timestamp and are never scavenged."
  ],
  "analogy": "Picture a company's paper phone directory. The primary zone is the master copy in the office manager's desk that only she can edit. Secondary zones are photocopies sent to each floor, refreshed when she announces changes. A stub zone is a sticky note saying 'for the Fabrikam office, call their receptionists at these numbers', which updates itself when Fabrikam hires new receptionists. An AD-integrated zone is a shared digital directory every manager can edit, where each entry remembers who created it. The analogy stops at secure updates: real phone directories rarely check identity.",
  "terms": [
   [
    "Primary zone",
    "A zone holding the writable copy of DNS data, in a file or in AD."
   ],
   [
    "Secondary zone",
    "A read-only copy of a zone kept current by zone transfers from a master server."
   ],
   [
    "Stub zone",
    "A zone holding only SOA, NS and glue A records to locate another zone's authoritative servers."
   ],
   [
    "AD-integrated zone",
    "A zone stored in Active Directory on DCs, replicated by AD and writable on every DC that hosts it."
   ],
   [
    "Zone transfer",
    "Copying zone data from a master to a secondary, either fully (AXFR) or incrementally (IXFR)."
   ],
   [
    "Replication scope",
    "The set of DCs that receive an AD-integrated zone: forest, domain, domain partition or a custom partition."
   ],
   [
    "Secure dynamic updates",
    "Dynamic registration allowed only by authenticated domain members, available only on AD-integrated zones."
   ]
  ],
  "example": "Contoso needs its DNS servers to always know Fabrikam's current name servers after a merger, even as Fabrikam adds DCs. The admin creates an AD-integrated stub zone for fabrikam.com with forest-wide replication scope, so every Contoso DC learns Fabrikam's NS records automatically. Contoso's own corp.contoso.com zone is converted from a file-based primary to AD-integrated with Secure only updates and scavenging enabled.",
  "mistakes": [
   [
    "A secondary zone can be stored in Active Directory.",
    "Only primary and stub zones can be AD-integrated. A secondary zone is a read-only copy received by zone transfer and is always file-based."
   ],
   [
    "Stub zones and conditional forwarders are the same thing.",
    "Both send queries toward another domain's servers, but a stub zone updates its list of name servers automatically, while a conditional forwarder uses a static list you maintain."
   ],
   [
    "Secure only updates can be enabled on any primary zone.",
    "Secure only requires an AD-integrated zone, because it depends on AD authentication and record ACLs."
   ],
   [
    "The default replication scope sends the zone to every DC in the forest.",
    "The default is all DNS servers on DCs in this domain (DomainDnsZones). Forest-wide scope must be chosen explicitly."
   ]
  ],
  "tryit": [
   [
    "A branch DNS server runs on a member server, not a DC, and must answer queries for corp.contoso.com locally even when the WAN is down. The zone is AD-integrated on the DCs at headquarters. What zone type do you create on the branch server, and what must you configure at headquarters?",
    "Create a secondary zone on the branch member server, because it is not a DC and cannot host an AD-integrated copy. At headquarters, allow zone transfers on the zone's Zone Transfers tab only to the branch server's IP address, and optionally add it to the notify list."
   ],
   [
    "After a merger, your DCs must resolve names in partner.example, whose administrators add and retire DNS servers every few months without telling you. Which option keeps resolution working with the least maintenance?",
    "A stub zone for partner.example, ideally AD-integrated so it replicates to all your DCs. It refreshes the partner's NS and glue records automatically, whereas a conditional forwarder would need you to update IP addresses by hand."
   ]
  ],
  "tip": "Secure only dynamic updates require an AD-integrated zone. Secondary zones can never be AD-integrated. A stub zone tracks name server changes automatically; a conditional forwarder does not. The default replication scope is DomainDnsZones.",
  "check": [
   [
    "Which zone type contains only SOA, NS and glue A records?",
    "A stub zone."
   ],
   [
    "Which replication scope is the default for a new AD-integrated zone?",
    "All DNS servers running on domain controllers in this domain (DomainDnsZones)."
   ],
   [
    "Why can you not select Secure only updates on a standard primary zone?",
    "Secure updates rely on AD authentication and record ACLs, so they are available only on AD-integrated zones."
   ],
   [
    "What is the difference between AXFR and IXFR?",
    "AXFR transfers the entire zone; IXFR transfers only the changes since the secondary's last serial number."
   ]
  ]
 },
 {
  "t": "Forwarders, conditional forwarders and root hints; DNS policies and zone scopes",
  "hook": "Halfway through a merger, Jonah at Cedar Valley Credit Union gets two requests on the same afternoon. First, staff must reach intranet sites at the newly acquired Pinecrest Savings, whose DNS servers sit across a new VPN link. Second, the marketing team wants the public site to send European visitors to a server in Frankfurt and everyone else to the main datacenter, using the same name. Meanwhile, the branch DNS servers keep timing out on internet lookups because they try to reach the root servers directly through a locked-down firewall. Three problems, one DNS console. Which tool solves which?",
  "simple": "When your company's DNS server is asked about a name it does not know, it has to ask someone else. It can pass every unknown question to one trusted helper (a forwarder), pass only questions about one particular company to that company's own servers (a conditional forwarder), or look the answer up itself starting from the internet's top-level directory servers (root hints). DNS policies add rules like 'if the person asking is in Europe, give them this answer instead.' A zone scope is the alternate set of answers those rules pick from. It is like a receptionist who forwards general calls to the main office, sends calls about the partner company straight to that company, and gives callers from different cities different local phone numbers.",
  "body": [
   "When a Windows Domain Name System (DNS) server receives a query for a name it is not authoritative for and has not cached, it must find the answer somewhere else. It has three tools for that: forwarders, conditional forwarders and root hints. Choosing among them controls how your internal DNS reaches the internet, partner organizations and Azure, and it affects security, performance and firewall design.",
   "Forwarders are server-wide. You list one or more upstream DNS servers, for example a central datacenter DNS server, an internet service provider resolver or a security filtering service, and the server sends every query it cannot answer locally to them. This centralizes internet resolution and caching in a few places, lets you apply filtering consistently, and lets branch DNS servers resolve internet names without direct outbound DNS access to the whole internet. You configure forwarders on the Forwarders tab of the server's properties in DNS Manager or with `Set-DnsServerForwarder -IPAddress 10.0.0.53`.",
   "Conditional forwarders apply only to a specific domain name. Queries for fabrikam.com go to Fabrikam's DNS servers, while everything else follows the normal path. Conditional forwarders are the standard way to support forest trusts and partner connectivity, and to resolve Azure private endpoint names by forwarding privatelink zones, such as privatelink.database.windows.net, to an Azure DNS Private Resolver inbound endpoint. On a domain controller (DC) you can store a conditional forwarder in Active Directory (AD) and replicate it to all DNS servers in the domain or the forest, instead of configuring each server by hand. In PowerShell: `Add-DnsServerConditionalForwarderZone -Name fabrikam.com -MasterServers 172.16.0.10 -ReplicationScope Forest`.",
   "Root hints are a list of the internet's root name servers. If no forwarder is configured, or forwarders do not respond and the Use root hints if no forwarders are available option is selected, the server performs iterative resolution itself: it asks a root server, follows the referral to the top-level domain servers for .com, then follows the next referral to the domain's authoritative servers, caching each answer along the way. Root hints ship with Windows and rarely change. Separately, if you disable recursion on a server, with the Disable recursion option or `Set-DnsServerRecursion -Enable $false`, it answers only for its own zones and never looks anything up for clients, which is appropriate for internet-facing authoritative servers and helps prevent them from being abused in amplification attacks.",
   "The resolution order ties these together: local authoritative zones first, then the cache, then a matching conditional forwarder, then server-level forwarders, then root hints. The most specific conditional forwarder wins over general forwarders, so a query for app.fabrikam.com uses the fabrikam.com conditional forwarder even when server forwarders are configured.",
   "DNS policies, introduced in Windows Server 2016, let the server answer differently depending on who is asking and how. A policy matches criteria such as client subnet, transport protocol (UDP or TCP), the server interface the query arrived on, the fully qualified domain name (FQDN) being asked for, the query type and the time of day. It then takes an action: allow the query, deny it with an error, ignore it silently, or direct it to a zone scope. There are three policy types. Query resolution policies control which answers are given. Recursion policies, together with recursion scopes, control which clients may use recursion, for example allowing it for internal subnets only. Zone transfer policies control which servers may transfer a zone. Policies are configured with PowerShell on each DNS server; they are not stored in AD, so you repeat them on every server that needs them.",
   "A zone scope is an additional set of records within one zone. Every zone has a default scope, and you can add scopes such as Europe or Internal, each holding different records for the same name. Combined with client subnet objects and query resolution policies, zone scopes enable geo-location based routing, split-brain DNS, where internal clients get private addresses and internet clients get public addresses from the same zone, and time-of-day load distribution, where a policy sends a share of traffic to a secondary datacenter during peak hours. The example below defines a European client subnet, creates a zone scope, adds a record to that scope and creates a policy that answers European clients from it.",
   "```powershell\nAdd-DnsServerClientSubnet -Name EUSubnet -IPv4Subnet 10.50.0.0/16\nAdd-DnsServerZoneScope -ZoneName contoso.com -Name EUScope\nAdd-DnsServerResourceRecord -ZoneName contoso.com -A -Name www -IPv4Address 10.50.1.10 -ZoneScope EUScope\nAdd-DnsServerQueryResolutionPolicy -Name EUPolicy -Action ALLOW -ClientSubnet 'eq,EUSubnet' -ZoneScope 'EUScope,1' -ZoneName contoso.com\n```",
   "To check your work, run `Get-DnsServerQueryResolutionPolicy -ZoneName contoso.com` to list policies in processing order, and query from a client in each subnet with `Resolve-DnsName` to confirm each one receives the expected address."
  ],
  "analogy": "Think of a hotel concierge. A forwarder is the concierge sending every question they cannot answer to the head office. A conditional forwarder is a rule: questions about the partner hotel go straight to that hotel's front desk. Root hints are the concierge looking it up personally, starting from the national directory and working down. DNS policies with zone scopes are the concierge handing guests from different countries different maps of the same city. The analogy stops at caching: a real concierge rarely remembers every answer as reliably as a DNS server does.",
  "terms": [
   [
    "Forwarder",
    "An upstream DNS server that receives all queries the local server cannot resolve itself."
   ],
   [
    "Conditional forwarder",
    "A rule sending queries for one specific domain to designated DNS servers."
   ],
   [
    "Root hints",
    "The list of root name servers used for iterative resolution when forwarders are absent or unavailable."
   ],
   [
    "Recursion",
    "A DNS server resolving a name fully on behalf of a client by querying other servers."
   ],
   [
    "DNS policy",
    "A rule that allows, denies, ignores or redirects queries based on criteria such as client subnet or time of day."
   ],
   [
    "Client subnet",
    "A named set of IPv4 or IPv6 subnets used as a matching criterion in DNS policies."
   ],
   [
    "Zone scope",
    "An alternate set of records within a zone, selected by DNS policies."
   ]
  ],
  "example": "Contoso's DCs must resolve private endpoint names for Azure SQL. The admin creates an AD-stored conditional forwarder for the Azure privatelink zone pointing to the DNS Private Resolver inbound endpoint IP, replicated to all DNS servers in the forest, and leaves internet names going to the corporate forwarders. For the public website, an internet-facing DNS server uses a zone scope and query resolution policy so European client subnets receive the Frankfurt server's address.",
  "mistakes": [
   [
    "Forwarders apply only to the domains you list.",
    "Server-level forwarders handle every query the server cannot answer locally. Applying a rule to one domain is what a conditional forwarder does."
   ],
   [
    "Root hints are used before forwarders.",
    "Forwarders are tried first; root hints are used only when no forwarders are configured, or when forwarders fail and the option to use root hints is enabled."
   ],
   [
    "DNS policies are stored in AD and replicate to every DC.",
    "DNS policies are configured per server with PowerShell and must be created on each server that needs them. AD-stored replication applies to zones and conditional forwarders, not policies."
   ],
   [
    "Split-brain DNS requires two separate zones with the same name on different servers.",
    "With DNS policies and zone scopes, one Windows DNS server can host one zone with different record sets for internal and external clients."
   ]
  ],
  "tryit": [
   [
    "Your forest has 40 DCs running DNS across many sites. After a merger, all of them must resolve names in partner.example using the partner's two DNS servers. You do not want to configure 40 servers by hand. What do you create?",
    "An AD-integrated conditional forwarder for partner.example pointing to the partner's two DNS server IP addresses, with replication scope set to all DNS servers in the forest. AD replication delivers it to every DC running DNS."
   ],
   [
    "An internet-facing DNS server hosts your public zone. A security scan reports it answers recursive queries for any domain from anyone on the internet. Internal clients never use this server. What should you change?",
    "Disable recursion on the server (or use a recursion policy that denies it for all clients). An authoritative-only internet server should answer only for its own zones, which prevents it being abused as an open resolver."
   ]
  ],
  "tip": "One partner domain means conditional forwarder; everything else means forwarder. Root hints are the fallback. Returning different answers to different client subnets from the same zone means DNS policies with zone scopes, configured per server with PowerShell.",
  "check": [
   [
    "When does a Windows DNS server use root hints?",
    "When no forwarder is configured, or forwarders are unavailable and the option to use root hints is enabled."
   ],
   [
    "How can a conditional forwarder be made available on every DC's DNS server without configuring each one?",
    "Store it in Active Directory and choose a forest or domain replication scope."
   ],
   [
    "Which feature lets one zone give internal clients private IPs and external clients public IPs?",
    "DNS policies with zone scopes (split-brain DNS)."
   ],
   [
    "What is the order in which a Windows DNS server tries to resolve a query?",
    "Local zones, cache, matching conditional forwarder, server forwarders, then root hints."
   ]
  ]
 },
 {
  "t": "DNSSEC signing, trust anchors and the Name Resolution Policy Table (NRPT)",
  "hook": "During an incident review at Brightwater Health, the security analyst shows a packet capture: for twenty minutes last week, some workstations resolved payroll.corp.brightwater.example to an address nobody recognizes. The DNS server's cache had been fed a forged answer. Nothing in plain DNS lets a client tell a real answer from a fake one. The CISO turns to Amara, who runs the domain controllers, and asks: can we make our clients reject answers that are not genuine, and can we do it without breaking name resolution for three thousand staff on day one?",
  "simple": "Normal DNS answers are like unsigned notes: anyone who slips a fake note into the pile can send you to the wrong place. DNSSEC adds a tamper-proof signature to every DNS answer, so a server that checks signatures can tell whether an answer really came from the people who own that name and was not changed on the way. To check signatures, the server needs one key it already trusts, called a trust anchor, much like trusting a bank's official stamp. Windows computers do not check signatures themselves; a list of rules called the NRPT tells them to insist their DNS server confirm the answer was checked. DNSSEC proves answers are genuine, but it does not hide them from eavesdroppers.",
  "body": [
   "Classic Domain Name System (DNS) has no built-in way to prove that an answer is genuine. Attackers who can inject forged responses, through cache poisoning or spoofing, can redirect users to malicious servers that look legitimate. DNS Security Extensions (DNSSEC) address this by adding digital signatures to zone data. A resolver that validates DNSSEC can confirm that an answer really came from the zone's owner and was not altered in transit, and it can also prove that a name does not exist, so an attacker cannot forge a fake 'no such name' answer either. Keep the boundary clear for the exam: DNSSEC does not encrypt queries or answers. It provides authenticity and integrity, not confidentiality.",
   "Signing a zone adds new record types, and you should recognize each one in DNS Manager. Resource record signature (RRSIG) records hold the signature for each set of records of the same name and type. DNSKEY records publish the zone's public keys so resolvers can check those signatures. Next Secure (NSEC) or NSEC3 records provide authenticated denial of existence by proving which names lie between two existing names; NSEC3 hashes the names, so attackers cannot simply walk the chain to list every name in the zone. Delegation signer (DS) records live in the parent zone and hold a hash of the child zone's key, linking the chain of trust from parent to child.",
   "Two kinds of keys are normally used. The key signing key (KSK) signs only the DNSKEY record set, and it is the key the parent's DS record points to. The zone signing key (ZSK) signs all the other record sets in the zone. Keeping them separate lets you roll over the frequently changed ZSK without involving the parent zone or updating trust anchors, while the KSK changes rarely. Windows Server supports automatic rollover for both, with configurable intervals.",
   "In Windows Server DNS you sign a zone with DNS Manager, by right-clicking the zone and choosing DNSSEC, then Sign the Zone, or with `Invoke-DnsServerZoneSign -ZoneName corp.contoso.com -SignWithDefault`. The wizard lets you customize key settings, choose NSEC or NSEC3, and pick a Key Master. The Key Master is the one DNS server responsible for generating and managing the zone's keys and performing automatic key rollover; if it is lost, you transfer the role to another authoritative server. For AD-integrated zones, signed data and keys replicate through Active Directory (AD), and dynamic updates continue to work because the authoritative servers sign new and changed records online as they arrive. Check the result with `Resolve-DnsName www.corp.contoso.com -DnssecOk`, which returns the RRSIG records alongside the answer.",
   "Validation needs a starting point the resolver already trusts, called a trust anchor. It is typically a DNSKEY or DS record for a zone, configured on the validating DNS server; from there the server follows the chain of signatures downward. On the public internet, the root zone's key serves as the anchor and DS records chain down through each top-level domain. For internal zones that have no signed public parent, you add trust anchors for your own signed zones to your resolvers. Windows can distribute trust anchors for a signed AD-integrated zone to all DNS servers in the forest automatically, an option in the signing wizard, and they appear in the Trust Points folder of DNS Manager. You can also add them manually with `Add-DnsServerTrustAnchor`. A trust anchor that is out of date after a KSK rollover causes validation failures, which is why automatic distribution matters.",
   "Windows clients are non-validating stub resolvers. They do not check signatures themselves; they rely on their DNS server to validate and to report the result by setting the Authenticated Data flag in its response. The Name Resolution Policy Table (NRPT) tells clients how to treat specific namespaces. It is configured through Group Policy at Computer Configuration, Policies, Windows Settings, Name Resolution Policy. An NRPT rule for a suffix such as `.corp.contoso.com` can require DNSSEC validation: the client sends its query, checks that the server indicates successful validation, and accepts the answer only then. Otherwise the client treats the name as unresolved, so a forged answer leads to a failure rather than a malicious site.",
   "NRPT rules can also direct queries for a namespace to specific DNS servers, which DirectAccess and some virtual private network (VPN) designs use to send internal names to internal servers. To see which rules a client has actually received, run `Get-DnsClientNrptPolicy` on it, and use `gpresult` to confirm the Group Policy Object (GPO) that delivers them applied.",
   "Roll out in stages, because the failure mode is loud. First sign the zone, then distribute trust anchors, then confirm validation on the DNS servers with test queries and event logs, and only then enforce validation with NRPT on clients, starting with a pilot group. If you enforce on clients before servers can validate, every lookup in that namespace fails and users lose access to internal resources."
  ],
  "analogy": "DNSSEC works like sealed, signed envelopes from a government office. Each office signs its own letters (RRSIG), posts its signature sample publicly (DNSKEY), and the office above it vouches for that signature sample (DS). Your mail clerk (the DNS server) holds one sample they trust absolutely (the trust anchor) and checks everything against it. The NRPT is your instruction to the clerk: 'for letters from corp.contoso.com, deliver only ones you verified.' The analogy stops at privacy: anyone can still read the envelope's contents.",
  "mnemonic": "For the main DNSSEC record types, remember 'Really Dependable Names Deliver': RRSIG (signatures), DNSKEY (public keys), NSEC or NSEC3 (proof a name does not exist), DS (link from parent to child).",
  "terms": [
   [
    "DNSSEC",
    "Extensions that add digital signatures to DNS data so resolvers can verify authenticity and integrity."
   ],
   [
    "RRSIG",
    "A record containing the signature over a set of DNS records."
   ],
   [
    "DNSKEY",
    "A record that publishes a zone's public key used to verify signatures."
   ],
   [
    "DS record",
    "A record in the parent zone holding a hash of the child zone's key, linking the chain of trust."
   ],
   [
    "KSK and ZSK",
    "The key signing key signs the DNSKEY set; the zone signing key signs the rest of the zone."
   ],
   [
    "Trust anchor",
    "A preconfigured public key or DS record a resolver trusts as the start of a DNSSEC validation chain."
   ],
   [
    "Key Master",
    "The DNS server responsible for generating and rolling over keys for a signed zone."
   ],
   [
    "NRPT",
    "Name Resolution Policy Table: client rules, delivered by Group Policy, that require DNSSEC validation or direct queries for specific namespaces."
   ]
  ],
  "example": "After a phishing incident, Contoso signs corp.contoso.com with NSEC3, chooses DC1 as Key Master, and distributes trust anchors to all forest DNS servers. The team verifies with Resolve-DnsName -DnssecOk from several sites and watches the DNS Server event log for validation errors. Once validation is confirmed on the servers, a GPO adds an NRPT rule requiring DNSSEC for .corp.contoso.com, first to a pilot OU and then to all clients.",
  "mistakes": [
   [
    "DNSSEC encrypts DNS traffic so eavesdroppers cannot see queries.",
    "DNSSEC signs data for authenticity and integrity only. Queries and answers remain readable."
   ],
   [
    "Windows clients validate DNSSEC signatures themselves once the zone is signed.",
    "Windows clients are non-validating stub resolvers. The DNS server validates using trust anchors, and an NRPT rule makes the client require that the server reported successful validation."
   ],
   [
    "The ZSK signs the DNSKEY records and the KSK signs everything else.",
    "It is the reverse: the KSK signs the DNSKEY record set and the ZSK signs all other record sets."
   ],
   [
    "Enforce NRPT validation first so you find problems quickly.",
    "Enforcing validation on clients before servers have working trust anchors breaks name resolution. Sign, distribute anchors, verify on servers, then enforce on clients."
   ]
  ],
  "tryit": [
   [
    "Your team signed corp.contoso.com yesterday. Today a pilot group of laptops with a new NRPT rule requiring DNSSEC cannot resolve any corp.contoso.com names, but laptops without the rule work fine. Resolve-DnsName -DnssecOk from a DNS server at the pilot's site shows no RRSIG data and the server has nothing in Trust Points. What is the likely cause and fix?",
    "The DNS server the pilot uses has no trust anchor for the zone (and may not host the signed zone yet), so it cannot validate and never reports success, and the NRPT rule makes clients reject the answers. Distribute trust anchors to all DNS servers (the signing wizard option or Add-DnsServerTrustAnchor), confirm validation on the server, then re-test the pilot."
   ]
  ],
  "tip": "Signing is done on the authoritative zone; validation is done by resolvers using trust anchors; the NRPT is what makes Windows clients require validation. DNSSEC gives integrity, not confidentiality. KSK signs DNSKEY; ZSK signs the rest.",
  "check": [
   [
    "What does the KSK sign, and what does the ZSK sign?",
    "The KSK signs the DNSKEY record set; the ZSK signs the other records in the zone."
   ],
   [
    "How do Windows clients enforce DNSSEC validation for a namespace?",
    "Through an NRPT rule, usually deployed by Group Policy, requiring DNSSEC validation for that suffix."
   ],
   [
    "Which record type provides authenticated denial of existence while hindering zone walking?",
    "NSEC3."
   ],
   [
    "Which DNS server role generates keys and handles automatic rollover for a signed zone?",
    "The Key Master."
   ]
  ]
 },
 {
  "t": "Azure DNS private zones, virtual network links and auto-registration; Azure DNS Private Resolver",
  "hook": "Sofia at Granite Peak Outfitters has just moved the inventory app's servers into an Azure virtual network. The app works from inside Azure, but the warehouse scanners on-premises cannot find inv-app01 by name, and the new Azure VMs cannot find the on-premises SQL cluster at sql.gpo.local either. A consultant's old diagram shows two forwarder VMs she would have to patch forever. Her manager wants a design with nothing extra to maintain by Friday. Which Azure DNS pieces carry queries in each direction, and why can't the on-premises DNS servers just ask Azure's resolver directly?",
  "simple": "Inside Azure, every network has a built-in name service at a special address, but it only knows about Azure's own names and only answers computers that are inside Azure. A private DNS zone is your own private list of names, like a staff phone list, that only the Azure networks you connect to it can read. Turning on auto-registration makes Azure add each new server to that list automatically. Azure DNS Private Resolver is a managed relay with two doors: an inbound door that lets your office's DNS servers ask questions about Azure names, and an outbound door that lets Azure servers ask your office about office names. It is like two buildings with an internal phone system each, connected by a switchboard operator who passes calls both ways.",
  "body": [
   "When you move Windows Servers into Azure, name resolution has to work in three directions: between Azure virtual machines (VMs), from Azure to on-premises, and from on-premises into Azure. Azure gives every virtual network (VNet) a built-in resolver, called Azure-provided DNS, at the special virtual address `168.63.129.16`. It resolves public internet names and names Azure itself manages, but it does not know your on-premises names. Azure DNS private zones and Azure DNS Private Resolver are the two managed services that extend it cleanly without running your own DNS forwarder VMs.",
   "An Azure DNS private zone is a Domain Name System (DNS) zone, such as `corp.contoso.internal`, that is resolvable only from VNets you choose and never from the internet. You connect a zone to a VNet with a virtual network link. Any VM in a linked VNet that uses Azure-provided DNS can then resolve records in the zone. You manage records in the zone just as in any DNS zone, adding A, CNAME, PTR, TXT and other records in the portal, with PowerShell or with the Azure command-line interface (CLI). A single zone can be linked to many VNets, including VNets in other regions and subscriptions, which makes it a natural fit for hub and spoke designs.",
   "A virtual network link can optionally have auto-registration turned on. Azure then creates and maintains A records for the VMs in that VNet automatically, updating them when VMs are created, change IP address or are deleted, so you never edit those records by hand. There is a firm limit the exam likes: a VNet can be linked to many private zones for resolution, but auto-registration can be enabled for only one private zone per VNet. Records created by auto-registration are tagged as such in the portal, and you cannot edit them manually.",
   "Private zones are also how private endpoints work. When you create a private endpoint for a storage account, Azure SQL or another platform service, a zone such as `privatelink.file.core.windows.net` holds the private IP of that endpoint, and the normal public name resolves through a CNAME to the privatelink name. Clients that can see the private zone receive a private address inside your network, while clients elsewhere still get the public address. If on-premises clients cannot see that private zone, they will connect to the public endpoint or fail, which is the most common private endpoint support ticket.",
   "The catch for hybrid designs is that on-premises servers cannot send queries to `168.63.129.16`; that address is reachable only from inside Azure. Before Private Resolver existed, administrators deployed Windows DNS forwarder VMs in Azure for this, which needed patching, scaling and high availability planning. Azure DNS Private Resolver replaces those VMs with a managed service deployed into your VNet. It has two kinds of endpoints, each placed in its own dedicated subnet delegated to the service (`Microsoft.Network/dnsResolvers`), and those subnets cannot host anything else.",
   "An inbound endpoint receives a private IP address in the VNet. On-premises DNS servers create a conditional forwarder for your Azure private zones, for example `corp.contoso.internal` and the privatelink zones, pointing at that IP, and the queries arrive over site-to-site VPN or ExpressRoute. The resolver then answers them using Azure-provided DNS and the private zones linked to its VNet. An outbound endpoint, combined with a DNS forwarding ruleset, sends queries from Azure to other DNS servers. Each rule in the ruleset names a domain and target DNS server IPs, for example forwarding `contoso.local` to the on-premises domain controllers. You link the ruleset to the VNets that should use those rules, and VMs in those VNets keep using Azure-provided DNS while the rules take effect for them.",
   "The exam likes to ask which piece solves which direction. On-premises clients resolving Azure private names need the inbound endpoint plus a conditional forwarder on the on-premises DNS servers. Azure VMs resolving on-premises Active Directory (AD) names need the outbound endpoint and a forwarding rule, with the ruleset linked to the VNets that should use it. VMs that must register their own names automatically need a private zone link with auto-registration enabled. One more case is common: domain-joined VMs that use your domain controllers as their DNS servers through a custom DNS setting on the VNet bypass Azure-provided DNS, so those domain controllers must themselves forward Azure private zone queries to `168.63.129.16` (if the DCs run in Azure) or to the inbound endpoint (if they run on-premises).",
   "In a lab you will see these as separate resources in the portal: the private DNS zone with its Virtual network links blade and an Enable auto registration checkbox; and the DNS private resolver with Inbound endpoints and Outbound endpoints blades, plus a separate DNS forwarding ruleset resource with Rules and Virtual network links. Test from a VM with `Resolve-DnsName vm1.corp.contoso.internal`, and from on-premises with `Resolve-DnsName vm1.corp.contoso.internal -Server <on-premises DNS server>` to confirm the conditional forwarder path."
  ],
  "analogy": "Imagine two office buildings, each with its own internal phone directory. Azure's built-in resolver is the receptionist in the Azure building, who only takes calls from inside. The Private Resolver inbound endpoint is a public reception desk number that the other building's receptionist can call to ask about Azure staff. The outbound endpoint and ruleset are the Azure receptionist's speed-dial list: 'questions about contoso.local, call the other building.' The analogy stops at auto-registration, where new Azure staff are added to the directory automatically on their first day.",
  "terms": [
   [
    "Azure-provided DNS",
    "The built-in resolver at 168.63.129.16 that VMs use by default; reachable only from inside Azure."
   ],
   [
    "Private DNS zone",
    "An Azure DNS zone that resolves only from virtual networks linked to it, not from the internet."
   ],
   [
    "Virtual network link",
    "The connection between a private zone and a VNet that lets the VNet resolve the zone and optionally auto-register VM records."
   ],
   [
    "Auto-registration",
    "A link setting that makes Azure create and maintain A records for VMs in the linked VNet; allowed for only one private zone per VNet."
   ],
   [
    "Inbound endpoint",
    "A Private Resolver IP address in the VNet that on-premises DNS servers forward queries to for Azure private names."
   ],
   [
    "Outbound endpoint and forwarding ruleset",
    "The Private Resolver components that forward queries for chosen domains from Azure to other DNS servers, such as on-premises DCs."
   ]
  ],
  "example": "Contoso moves an app tier into Azure. The VMs auto-register in the private zone azure.contoso.internal. On-premises DNS servers get a conditional forwarder for that zone, and for the privatelink zone of its storage account, to the Private Resolver inbound endpoint, and a forwarding ruleset linked to the app VNet sends contoso.local queries from Azure back to the on-premises DCs over the site-to-site VPN. No forwarder VMs are needed.",
  "mistakes": [
   [
    "On-premises DNS servers can forward Azure queries straight to 168.63.129.16 over the VPN.",
    "That address is reachable only from inside Azure. On-premises servers must forward to a reachable private IP, such as a Private Resolver inbound endpoint."
   ],
   [
    "You can enable auto-registration on several private zones for one VNet.",
    "A VNet can be linked to many zones for resolution, but only one link per VNet may have auto-registration enabled."
   ],
   [
    "The inbound endpoint lets Azure VMs resolve on-premises names.",
    "Direction matters. Inbound handles queries arriving from on-premises into Azure. Azure to on-premises uses the outbound endpoint with a forwarding ruleset."
   ],
   [
    "Linking a private zone to a VNet helps VMs that use custom DNS servers.",
    "VMs configured with custom DNS servers such as domain controllers do not query Azure-provided DNS directly, so those DNS servers must forward the private zone queries to 168.63.129.16 or the inbound endpoint."
   ]
  ],
  "tryit": [
   [
    "Your on-premises file servers must reach an Azure Files storage account through its private endpoint, but from on-premises the storage name still resolves to a public IP. The privatelink.file.core.windows.net zone is linked to the hub VNet, where a Private Resolver is deployed. What do you configure?",
    "On the on-premises DNS servers, create a conditional forwarder for file.core.windows.net (or the privatelink zone) pointing to the Private Resolver inbound endpoint IP. Queries then reach Azure over the VPN or ExpressRoute, the resolver uses the linked private zone, and the name resolves to the private endpoint address."
   ],
   [
    "Azure VMs in a spoke VNet use Azure-provided DNS and must resolve fabrikam.local, hosted on on-premises DCs. A Private Resolver with an outbound endpoint already exists in the hub. What is missing if resolution still fails from the spoke?",
    "A forwarding ruleset rule for fabrikam.local pointing to the on-premises DNS server IPs, and a link from the ruleset to the spoke VNet. Rulesets apply only to VNets they are linked to."
   ]
  ],
  "tip": "Match direction to component: on-premises to Azure uses the inbound endpoint and a conditional forwarder; Azure to on-premises uses the outbound endpoint and a forwarding ruleset linked to the VNet. Only one auto-registration zone per VNet. 168.63.129.16 is reachable only from inside Azure.",
  "check": [
   [
    "Why can't an on-premises DNS server simply forward queries to 168.63.129.16?",
    "That address is only reachable from inside Azure. On-premises servers need a reachable private IP, which the Private Resolver inbound endpoint (or a forwarder VM) provides."
   ],
   [
    "A VNet already auto-registers in zone A. Can you enable auto-registration for zone B on the same VNet?",
    "No. A VNet can be linked to multiple zones for resolution, but auto-registration is allowed for only one private zone per VNet."
   ],
   [
    "Which resource lets Azure VMs resolve contoso.local names hosted on on-premises DCs without custom DNS servers?",
    "An Azure DNS Private Resolver outbound endpoint with a forwarding ruleset containing a rule for contoso.local that points to the on-premises DNS servers, linked to the VNet."
   ],
   [
    "What special requirement do Private Resolver endpoints have for their subnets?",
    "Each endpoint needs its own dedicated subnet delegated to the Private Resolver service, with no other resources in it."
   ]
  ]
 },
 {
  "t": "DHCP scopes, reservations, options and relay; authorization in AD",
  "hook": "It is the first day of the school term at Maple Ridge Academy and the new science wing has just opened. Kwame, the network administrator, gets a radio call from the facilities manager: none of the forty new classroom computers in the wing can get on the network. Their adapters show addresses starting with 169.254. The DHCP server in the main building has a brand-new scope for the wing's subnet, and it is hours before classes start. Is the problem the scope, the router between the buildings, or something in Active Directory that nobody remembered?",
  "simple": "DHCP is the service that hands each computer an address and basic network settings automatically when it connects, like a hotel front desk handing out room keys. A scope is the range of room numbers available for one floor. A reservation saves one specific room for one specific guest every time. Options are the extra information given with the key, such as where the exit (the default gateway) and the information desk (DNS server) are. Computers ask for an address by shouting to everyone nearby, so a helper on the router, called a relay, has to carry the shout to a DHCP server in another part of the building. In a Windows domain, a DHCP server must also be officially approved, called authorization, before it hands out anything.",
  "body": [
   "The Dynamic Host Configuration Protocol (DHCP) hands out IP addresses and network settings automatically so you do not configure each client by hand. A client gets a lease through four messages, often remembered as DORA: Discover, a broadcast asking for any DHCP server; Offer, in which a server proposes an address; Request, in which the client asks for the offered address; and Acknowledge, in which the server confirms the lease. Because Discover is a broadcast, it normally stays on the local subnet, which matters when you decide where DHCP servers live. Clients renew at about half the lease time, so a short outage of the server does not immediately cut anyone off. A client that hears no answer at all falls back to an Automatic Private IP Addressing (APIPA) address in 169.254.0.0/16, which is the classic sign of a DHCP problem.",
   "A scope is a range of addresses for one subnet, such as 10.1.20.10 to 10.1.20.250 with mask 255.255.255.0, plus a lease duration (eight days by default on Windows Server). Inside a scope you add exclusion ranges for addresses you assign statically, such as printers, switches and servers, so DHCP never hands them out. You also add reservations. A reservation ties a specific address to a client's MAC address for IPv4 so the device always receives the same IP while still getting its options from DHCP. Reservations are handy for devices that should not have their settings typed in by hand but must keep a predictable address. In PowerShell you use `Add-DhcpServerv4Scope`, `Add-DhcpServerv4ExclusionRange` and `Add-DhcpServerv4Reservation`, and a scope must be active before it leases anything.",
   "Options carry settings beyond the address itself. The ones you will see most are 003 Router (the default gateway), 006 DNS Servers and 015 DNS Domain Name. Options can be set at the server level, which applies to all scopes; at the scope level; and at the reservation level. The more specific level wins, so a reservation option overrides a scope option, which overrides a server option. DHCP policies can also assign options or address ranges based on criteria such as vendor class, user class or MAC address prefix, for example giving IP phones a different DNS server. Policy options fit into the same precedence idea: a scope-level policy option overrides a plain scope option, and a server-level policy option overrides a plain server option, while a reservation still has the final word. Set options with `Set-DhcpServerv4OptionValue`, adding `-ScopeId` or `-ReservedIP` to target a level.",
   "Because clients broadcast, a DHCP server can only hear clients on its own subnet unless something forwards the request. A DHCP relay agent does that. It is usually configured on the router interface for the client subnet, often called an IP helper address, or provided by the Routing and Remote Access Service (RRAS) DHCP relay agent on a Windows server in that subnet. The relay converts the broadcast into a unicast to the DHCP server and fills in the gateway address field (giaddr) with the IP address of the interface that received the request. The server uses giaddr to pick the scope whose subnet contains that address and replies through the relay.",
   "That gives you a clear troubleshooting order when clients in a remote subnet get no address. First check the relay: is an IP helper configured on that router interface and pointing to the right DHCP server address? Then check the scope: does one exist for exactly that subnet, is it active, and does it have free addresses? Finally check the server itself, including authorization, which is next.",
   "In an Active Directory (AD) domain, a Windows DHCP server that is a domain member must be authorized in AD before it will lease addresses. Authorization stops a rogue or forgotten test server from handing out wrong gateways or DNS servers to production clients. Authorizing requires membership in Enterprise Admins by default, or delegated rights, because the list of authorized servers lives in the forest-wide configuration partition rather than in one domain. You authorize in the DHCP console by right-clicking the server and choosing Authorize, or with `Add-DhcpServerInDC -DnsName dhcp1.contoso.com -IPAddress 10.1.0.5`, and list authorized servers with `Get-DhcpServerInDC`. A standalone, non-domain DHCP server checks whether an authorized server exists on its subnet and stops leasing if it finds one.",
   "In your lab, after installing the role with `Install-WindowsFeature DHCP -IncludeManagementTools`, the console still shows a red down arrow on the server until you authorize it. Also complete the post-install configuration that creates the DHCP Administrators and DHCP Users local security groups, either through the notification in Server Manager or with `Add-DhcpServerSecurityGroup`, then restart the DHCP Server service so the groups take effect. Finally, check the audit logs under `%windir%\\System32\\dhcp`, which record every lease, renewal and conflict and are the first place to look when you need to know which device had an address."
  ],
  "analogy": "DHCP works like a hotel front desk. The scope is the block of rooms for one floor, exclusions are rooms kept for staff, and a reservation is the suite always held for a regular guest. Options are the welcome card telling you where breakfast and the exits are, with the suite's card overriding the floor's card. The relay agent is the bellhop who carries a guest's request from a distant wing to the front desk, writing down which wing it came from. Authorization is the hotel's license to open. The analogy stops at lease renewal: hotel guests rarely renew halfway through their stay.",
  "mnemonic": "DORA gives the lease exchange in order: Discover, Offer, Request, Acknowledge.",
  "terms": [
   [
    "Scope",
    "A range of IP addresses for one subnet, with a subnet mask, lease duration and options, from which DHCP leases addresses."
   ],
   [
    "Reservation",
    "A scope entry that always gives the same IP address to a client identified by its MAC address."
   ],
   [
    "Exclusion range",
    "Addresses inside a scope that DHCP will never lease, used for statically configured devices."
   ],
   [
    "DHCP option",
    "A setting delivered with a lease, such as 003 Router, 006 DNS Servers or 015 DNS Domain Name."
   ],
   [
    "DHCP relay agent",
    "A router feature or service that forwards broadcast DHCP requests from a remote subnet to a DHCP server as unicast."
   ],
   [
    "giaddr",
    "The gateway address field the relay fills in so the server can select the scope for the client's subnet."
   ],
   [
    "Authorization",
    "Registering a domain-member DHCP server in AD so it is allowed to lease addresses; requires Enterprise Admins rights by default."
   ]
  ],
  "example": "A branch VLAN 10.3.40.0/24 gets no addresses after a new scope is created on the central DHCP server, and clients show 169.254 addresses. The admin finds the scope is active but the branch router has no IP helper configured. After adding the relay pointing to the DHCP server, clients receive leases from the right scope because the router stamps giaddr 10.3.40.1, and a reservation gives the branch printer a fixed 10.3.40.20 with its own DNS option.",
  "mistakes": [
   [
    "Server-level options override scope and reservation options because they are set by the server.",
    "Precedence runs from most specific to least: reservation over scope over server. Server options are the defaults that more specific levels can override."
   ],
   [
    "Any domain admin can authorize a DHCP server.",
    "By default authorization needs Enterprise Admins membership, because authorized servers are stored in the forest configuration partition, unless rights have been delegated."
   ],
   [
    "Putting a scope for a remote subnet on the DHCP server is enough.",
    "Clients broadcast, so without a relay agent (IP helper) on the remote subnet's router or an RRAS relay, the request never reaches the server."
   ],
   [
    "A reservation means the device is configured with a static IP.",
    "A reserved client still uses DHCP and receives options from the server; the server simply always gives it the same address."
   ]
  ],
  "tryit": [
   [
    "You install the DHCP role on a new domain-member server, create and activate a scope for the local subnet, and set options 003 and 006. Clients on that subnet still get 169.254 addresses, and the server icon in the console has a red down arrow. You are a member of Domain Admins in a child domain. What is wrong, and what do you need?",
    "The server is not authorized in AD. Authorization is stored forest-wide, so you need Enterprise Admins rights (or delegated rights) to authorize it with the console or Add-DhcpServerInDC. Ask an Enterprise Admin or have rights delegated, then authorize and confirm with Get-DhcpServerInDC."
   ],
   [
    "A scope sets option 006 to 10.0.0.10. A DHCP policy at the scope level matching the IP phones' vendor class sets 006 to 10.0.0.30. One phone also has a reservation with 006 set to 10.0.0.40. What DNS server does that phone receive, and what do the other phones receive?",
    "The reserved phone receives 10.0.0.40 because reservation options have the highest precedence. The other phones match the scope-level policy and receive 10.0.0.30, which overrides the plain scope option."
   ]
  ],
  "tip": "Know the option precedence (reservation over scope over server, with policies sitting just above the level they are defined at) and that authorization needs Enterprise Admins by default. If a server is installed but hands out nothing, suspect authorization. If only a remote subnet fails, suspect the relay.",
  "check": [
   [
    "A scope sets DNS option 006 to 10.0.0.10, but one reservation sets 006 to 10.0.0.20. Which does the reserved client get?",
    "10.0.0.20, because reservation-level options override scope-level and server-level options."
   ],
   [
    "How does a DHCP server know which scope to use for a request that came through a relay agent?",
    "It reads the giaddr field the relay filled in with its receiving interface address and picks the scope whose subnet contains that address."
   ],
   [
    "A new domain-member DHCP server is installed and has an active scope but leases no addresses. What is the likely cause?",
    "It hasn't been authorized in Active Directory; authorize it with the console or Add-DhcpServerInDC using an account with Enterprise Admins rights."
   ],
   [
    "What are the four DHCP messages in a new lease, in order?",
    "Discover, Offer, Request, Acknowledge (DORA)."
   ]
  ]
 },
 {
  "t": "DHCP high availability: failover in load balance and hot standby modes; IPAM",
  "hook": "At Copperline Logistics, the only DHCP server for the main warehouse fails on a Friday evening. Nobody notices until Monday morning, when leases start expiring and handheld scanners drop off the network one by one. Shipping stops for three hours while Rosa rebuilds the server from backup and guesses which addresses were already in use. Her director asks for a plan so this never happens again, and also wants to know, for an audit, which device had 10.20.5.77 last Tuesday at 2 p.m. Rosa has two DHCP servers available and a member server to spare. How should she use them?",
  "simple": "If the only machine handing out network addresses breaks, devices keep working for a while, then lose their connection when their address 'lease' runs out. DHCP failover pairs two DHCP servers that share the same list of who has which address, so either can take over. In load balance mode both servers work at once and share the job. In hot standby mode one works and the other waits, keeping a few spare addresses ready for emergencies. IPAM is a separate management tool, like a control room, that lets you see and manage all your DHCP and DNS servers and look up who had an address at a certain time. It helps you watch and organize, but it does not keep anything running by itself.",
  "body": [
   "If your only Dynamic Host Configuration Protocol (DHCP) server goes down, clients keep working until their leases reach the renewal and rebinding points and finally expire, then they fail to renew and lose connectivity. Older designs split each scope between two servers, the 80/20 split scope, where one server leased 80 percent of the range and the other 20 percent. That gave some redundancy, but each server only knew about its own part of the range, and the backup's small slice could run out quickly. DHCP failover, built into Windows Server, is the modern answer: two servers share full lease information for the same scopes and keep it synchronized.",
   "A failover relationship links exactly two DHCP servers for one or more IPv4 scopes. Failover does not cover IPv6 scopes, so for IPv6 you still rely on other approaches. The two servers replicate lease data to each other as leases are granted and renewed, and you can protect that traffic with a shared secret used for message authentication. You create a relationship in the DHCP console by right-clicking a scope and choosing Configure Failover, or with `Add-DhcpServerv4Failover`, and check it with `Get-DhcpServerv4Failover`. A server can take part in several relationships with different partners, but a given scope belongs to only one relationship.",
   "Be clear about what replicates automatically. Lease data is synchronized continuously. Scope configuration, such as options, exclusions, reservations and policies, is copied to the partner when the relationship is created, but later changes are not synchronized automatically. After you change them on one server, you replicate with Replicate Scope or Replicate Relationship in the console, or with `Invoke-DhcpServerv4FailoverReplication`. Forgetting this step is a classic exam distractor and a classic real-world outage: one partner hands out the old DNS server option after the active server fails.",
   "There are two modes. Load balance mode is the default: both servers actively serve clients at the same time, splitting requests by a percentage, 50/50 unless you change it. Each server answers a share of clients based on a hash of the client's identifier, and if one server is down the other serves everyone. This fits two servers in the same site. Hot standby mode has one active server and one standby server. The standby keeps a reserve percentage of addresses, 5 percent by default, that it can hand out immediately if the active server stops responding, and it takes over the whole pool after the partner is declared down. Hot standby fits a hub and branch design where a central datacenter server backs up several branch servers, because one server can be the standby partner in several relationships.",
   "Two timers explain why takeover is not instant. The Maximum Client Lead Time (MCLT) is how far a server may extend a lease beyond what its partner knows about; it limits the risk of both servers handing out the same address. After a partner is marked down, the surviving server must wait for the MCLT before it can take over the entire address pool. The state switchover interval, if you set it, moves a server automatically from the communication interrupted state to the partner down state after that time. If it is not set, an administrator must declare partner down manually. During communication interrupted, each server can lease only from the addresses it already controls, which is why the hot standby reserve matters.",
   "IP Address Management (IPAM) is a Windows Server feature that centrally discovers, monitors and manages DHCP servers, Domain Name System (DNS) servers and your IP address space. From one console you can see scope utilization and free address blocks, track subnets and ranges, manage DHCP scopes, reservations and failover relationships across many servers, manage DNS zones and records, and audit configuration changes. Its IP address tracking search can tell you which user or device had an address at a given time by correlating DHCP lease events with logon events from domain controllers, which answers exactly the kind of question auditors ask.",
   "IPAM needs permission to read from and manage the servers it watches. You provision managed servers either by Group Policy, where `Invoke-IpamGpoProvisioning` creates Group Policy Objects (GPOs) that grant the IPAM server access and open the needed firewall rules on DHCP servers, DNS servers and domain controllers, or by configuring the same permissions, group memberships and firewall rules manually on each server. After provisioning, you set each discovered server's manageability status to Managed. Install the IPAM server feature on a domain member server; installing it on a domain controller is not supported. IPAM stores its data in the Windows Internal Database or in a SQL Server database.",
   "For the exam, keep the boundaries crisp. Failover is IPv4 only, with exactly two servers per relationship. Load balance is active-active, usually in one site. Hot standby is active-passive, ideal for a central server backing up branches. Scope configuration changes need manual replication. IPAM provides central visibility, management and auditing, but it does not itself provide redundancy; failover does."
  ],
  "analogy": "DHCP failover in load balance mode is like two cashiers at the same store sharing one sales ledger: both serve customers, and if one goes on break the other keeps the line moving. Hot standby is a head office cashier who keeps a small cash float for each branch and steps in when a branch cashier is out sick, taking over fully only after a waiting period. IPAM is the regional manager's office with cameras and records, which sees everything but does not ring up sales. The analogy stops at the ledger: price changes (scope settings) are not copied automatically.",
  "terms": [
   [
    "DHCP failover",
    "A relationship between two DHCP servers that replicate IPv4 lease information so either can serve the same scopes."
   ],
   [
    "Load balance mode",
    "The default failover mode in which both servers actively lease addresses, split by a configurable percentage."
   ],
   [
    "Hot standby mode",
    "A failover mode with one active and one standby server; the standby holds a reserve percentage of addresses for immediate use."
   ],
   [
    "MCLT",
    "Maximum Client Lead Time: the period a server can extend leases beyond its partner's knowledge, and the wait before full takeover after partner down."
   ],
   [
    "State switchover interval",
    "An optional timer that moves a server from communication interrupted to partner down automatically."
   ],
   [
    "IPAM",
    "IP Address Management: a Windows Server feature that centrally discovers, monitors, manages and audits DHCP, DNS and IP address space."
   ]
  ],
  "example": "A company has DHCP servers in five branches and one in the datacenter. Each branch server is the active server in a hot standby relationship with the datacenter server, which holds a 5 percent reserve for each scope. When a branch server fails, clients renewing over the WAN get addresses from the reserve immediately, and after the partner is marked down and the MCLT passes, the datacenter server can use the full pool. An IPAM server on a member server shows utilization for all six servers and answers audit questions about who held an address.",
  "mistakes": [
   [
    "DHCP failover can protect IPv6 scopes too.",
    "Windows Server DHCP failover supports IPv4 scopes only."
   ],
   [
    "Changing an option on one failover partner updates the other automatically.",
    "Only lease data synchronizes continuously. Configuration changes must be replicated with Replicate Scope, Replicate Relationship or Invoke-DhcpServerv4FailoverReplication."
   ],
   [
    "Hot standby is the default mode.",
    "Load balance is the default, with a 50/50 split. Hot standby must be chosen, and its default reserve is 5 percent."
   ],
   [
    "IPAM provides DHCP redundancy.",
    "IPAM is for visibility, management and auditing. Redundancy comes from DHCP failover."
   ]
  ],
  "tryit": [
   [
    "Two DHCP servers sit in the same datacenter and serve the same 20 IPv4 scopes. Management wants both servers busy all the time, and either must be able to serve every client if the other fails. Which configuration do you choose, and what will you remember to do after changing scope options later?",
    "Create a failover relationship in load balance mode (the default 50/50 split works) for all 20 scopes. After any later change to options, reservations or exclusions, replicate the scopes to the partner with Replicate Scope or Invoke-DhcpServerv4FailoverReplication, because configuration changes do not synchronize automatically."
   ],
   [
    "An auditor asks which device and user had 10.20.5.77 last Tuesday at 2 p.m. You have IPAM installed and provisioned. Where do you look, and why does IPAM have this data?",
    "Use IPAM's IP address tracking (audit) search for that address and time. IPAM collects DHCP lease events from managed DHCP servers and logon events from domain controllers and correlates them to show the device and user."
   ]
  ],
  "tip": "Load balance equals active-active in the same site; hot standby equals active-passive, typical for a central server backing up branches. Failover never covers IPv6 and never more than two servers per relationship. IPAM goes on a member server, never a domain controller.",
  "check": [
   [
    "You change the DNS server option on a scope that is in a failover relationship. What else must you do?",
    "Replicate the scope to the partner (Replicate Scope or Invoke-DhcpServerv4FailoverReplication), because configuration changes are not synchronized automatically."
   ],
   [
    "Which failover mode suits one datacenter server backing up several branch DHCP servers?",
    "Hot standby, with each branch server active and the datacenter server as standby holding a reserve of addresses."
   ],
   [
    "Can you install IPAM on a domain controller?",
    "No. Installing the IPAM server feature on a domain controller is not supported; use a member server."
   ],
   [
    "Why does a surviving partner not take over the whole pool immediately after the other fails?",
    "It must wait for the partner down state (set manually or by the state switchover interval) and then for the MCLT to pass, to avoid duplicate leases."
   ]
  ]
 },
 {
  "t": "Azure VNet addressing and static private IPs set on the NIC",
  "hook": "Late on a Thursday, Hannah at Silverleaf Accounting promotes a new domain controller in Azure. Following the habit of fifteen years on-premises, she opens the network adapter inside Windows and types a static IP address. The RDP session freezes. The VM still shows Running in the portal, but nothing can reach it, and the app servers that were about to use it for DNS cannot resolve anything. On top of that, the planning sheet says the new subnet holds 254 servers, and the network team says that number is wrong. What did Hannah miss about how addressing works in an Azure virtual network?",
  "simple": "An Azure virtual network is your own private network inside Azure. You choose a block of private addresses for it, then slice that block into smaller groups called subnets. Azure keeps five addresses in every subnet for its own use, so you get slightly fewer than you might expect. Each server's network card gets an address from its subnet. If a server must always keep the same address, like a domain controller, you set that fixed address on the network card in the Azure portal, not inside Windows. Windows keeps asking for an address automatically, and Azure always gives it the one you chose. It is like a mailroom that assigns mailbox numbers: you ask the mailroom for a permanent box rather than painting a number on a box yourself.",
  "body": [
   "An Azure virtual network (VNet) is your private network in Azure. When you create it, you give it one or more address spaces written in Classless Inter-Domain Routing (CIDR) notation, such as `10.20.0.0/16`, normally drawn from the private ranges defined in RFC 1918: 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. You then carve that space into subnets, such as `10.20.1.0/24` for servers and `10.20.2.0/24` for management. Every VM network interface card (NIC) lives in exactly one subnet, and subnets are where you attach network security groups and route tables. You can add address spaces to a VNet later, but resizing a subnet that already has resources in it is restrictive, so plan up front.",
   "Plan address space before you build, because overlaps are painful to fix. VNets that you will connect by peering, or connect to on-premises by virtual private network (VPN) or ExpressRoute, must not overlap with each other or with your on-premises ranges, because routing cannot tell two identical prefixes apart. If headquarters uses 10.0.0.0/16, do not give the Azure hub the same range. Leave room to grow, both more subnets in each VNet and more VNets in the future. Some services also need dedicated subnets with specific names or delegations, such as a subnet named exactly `GatewaySubnet` for a VPN or ExpressRoute gateway, or delegated subnets for Azure DNS Private Resolver endpoints, so reserve space for them.",
   "Azure reserves five addresses in every subnet, and the exam frequently tests the arithmetic. In `10.20.1.0/24`, the reserved addresses are 10.20.1.0 (the network address), 10.20.1.1 (the default gateway), 10.20.1.2 and 10.20.1.3 (used to map Azure DNS into the VNet) and 10.20.1.255 (the broadcast address, even though Azure VNets do not use broadcast). So a /24 gives you 251 usable addresses, not 254, and the first address you can assign is `10.20.1.4`. A /27 has 32 addresses and 27 usable; a /28 has 16 and 11 usable. The smallest subnet you can create is a /29, which has eight addresses and leaves only three usable. When a question asks how many VMs fit in a subnet, subtract five from the total.",
   "Each NIC IP configuration has a private IP that is either dynamic or static. With dynamic allocation, Azure picks the next free address in the subnet when the NIC is created, and the address normally stays with the NIC while it exists, but you have not reserved it, so it can be lost when the NIC is recreated or moved to another subnet. With static allocation, you choose a specific address from the subnet, or promote the current one, and Azure guarantees it stays with that NIC until you change it or delete the NIC. Servers that other machines point to by IP address, above all domain controllers and Domain Name System (DNS) servers, should use static assignment.",
   "You set a static address in the portal on the NIC's IP configurations blade by selecting the configuration, changing Allocation to Static and entering the address. With PowerShell you retrieve the NIC with `Get-AzNetworkInterface`, set `PrivateIpAllocationMethod` to Static and `PrivateIpAddress` to the chosen address on its IP configuration, then run `Set-AzNetworkInterface`. Changing the address of a running VM's NIC can cause the VM to restart its networking, so do it in a maintenance window.",
   "The key rule is that in Azure you set the static IP on the NIC, not inside Windows. The guest operating system should stay on DHCP, with Obtain an IP address automatically selected, and Azure's DHCP service will always hand it the address you configured on the NIC. If you type a static address in the Windows adapter settings and it does not match the NIC, or the NIC's address is later changed, the VM can lose network connectivity entirely. Recovery then requires tools that do not depend on the network, such as Run Command through the VM agent or the Serial Console, to set the adapter back to DHCP.",
   "The same idea applies to DNS server settings. Set custom DNS servers on the VNet's DNS servers blade, or on an individual NIC to override the VNet, rather than inside the guest, so that every VM picks them up through DHCP. VMs receive a changed DNS setting when they renew their lease or restart, so after changing it you typically restart the VMs or run `ipconfig /renew`.",
   "A typical hybrid pattern puts these pieces together: deploy two domain controller VMs with static private IPs on their NICs, keep their Windows adapters on DHCP, set the VNet's DNS servers to those two addresses (often with an on-premises DNS server as a further entry), and then restart the other VMs so they receive the new DNS settings and can join the domain."
  ],
  "analogy": "Think of an apartment building's mailroom. The VNet is the building's block of mailbox numbers, subnets are the floors, and the mailroom keeps a few boxes on each floor for its own use. A static private IP is asking the mailroom to permanently assign box 4 to you; the mailroom always puts your mail there. Typing a static IP in Windows is like painting your own number on a box without telling the mailroom: if the numbers do not match, your mail goes nowhere. The analogy stops at broadcast, which Azure reserves an address for but does not use.",
  "terms": [
   [
    "Address space",
    "The CIDR range or ranges assigned to a VNet, from which its subnets are allocated."
   ],
   [
    "Subnet",
    "A range within a VNet's address space where NICs are placed and network security groups and route tables are attached."
   ],
   [
    "Reserved addresses",
    "The five addresses Azure keeps in every subnet: the network address, the first three host addresses and the broadcast address."
   ],
   [
    "Static private IP",
    "A NIC IP configuration setting that pins a chosen private address to the NIC so it never changes until you change it."
   ],
   [
    "Dynamic private IP",
    "A private address Azure picks automatically from the subnet when the NIC is created."
   ],
   [
    "Custom DNS servers",
    "DNS server addresses configured on a VNet or NIC that Azure's DHCP gives to VMs instead of Azure-provided DNS."
   ]
  ],
  "example": "An admin builds DC1 in subnet 10.50.1.0/24 and sets its NIC to static 10.50.1.4, the first usable address. Inside Windows the adapter stays on DHCP. A second DC gets static 10.50.1.5. The VNet's DNS servers are changed to 10.50.1.4 and 10.50.1.5, and after restarting the app servers they resolve contoso.com through the DCs and can join the domain.",
  "mistakes": [
   [
    "Configure the static IP in the Windows network adapter of an Azure VM, as you would on-premises.",
    "Set the static IP on the NIC's IP configuration in Azure and keep the guest on DHCP. A mismatched guest setting can cut the VM off the network."
   ],
   [
    "A /24 subnet in Azure holds 254 hosts.",
    "Azure reserves five addresses per subnet, so a /24 gives 251 usable addresses, and the first assignable one is .4."
   ],
   [
    "Overlapping address spaces are fine as long as the VNets are in different regions.",
    "Any VNets you peer or connect to on-premises must not overlap, regardless of region, because routing cannot distinguish identical prefixes."
   ],
   [
    "Changing the VNet DNS servers takes effect on running VMs immediately.",
    "VMs pick up the new DNS servers when they renew DHCP or restart, so restart them or renew the lease."
   ]
  ],
  "tryit": [
   [
    "You must plan a subnet for 50 application VMs in Azure, and the team wants the smallest subnet that fits with a little headroom. Would a /26 work? Show your arithmetic.",
    "A /26 has 64 addresses. Azure reserves 5, leaving 59 usable, which fits 50 VMs with 9 spare. A /27 would give only 27 usable, so /26 is the smallest that fits."
   ],
   [
    "A colleague set a static IP inside Windows on an Azure DC VM, and now it is unreachable over the network, though the VM agent shows Ready. How do you recover it and prevent a repeat?",
    "Use Run Command (or the Serial Console) to set the Windows adapter back to obtain an address automatically, restoring connectivity. Then set the desired address as a static private IP on the NIC's IP configuration in Azure, so Azure's DHCP always delivers it to the guest."
   ]
  ],
  "tip": "If an answer choice says to configure a static IP in the guest OS network adapter of an Azure VM, it's the trap. Set static on the NIC in Azure; keep the guest on DHCP. Remember 5 reserved addresses per subnet, first usable is .4, and /29 is the smallest subnet.",
  "check": [
   [
    "How many usable addresses does a /27 subnet in Azure provide?",
    "27 usable. A /27 has 32 addresses and Azure reserves 5."
   ],
   [
    "You need a DC VM in Azure to keep 10.0.1.10 permanently. Where do you set it?",
    "On the VM NIC's IP configuration in Azure as a static private IP; leave the Windows adapter set to obtain an address automatically."
   ],
   [
    "Why must a VNet's address space not overlap your on-premises network if you plan a site-to-site VPN?",
    "Routing cannot distinguish two identical prefixes, so traffic to overlapping addresses would not reach the correct side."
   ],
   [
    "What is the first address you can assign to a VM in 10.20.1.0/24?",
    "10.20.1.4, because .0 through .3 are reserved."
   ]
  ]
 },
 {
  "t": "Hybrid connectivity: site-to-site and point-to-site VPN, ExpressRoute, Azure Network Adapter",
  "hook": "The steering committee at Bayside Regional Hospital has approved moving its patient portal's middle tier into Azure, but three people want three different things. The compliance officer insists that patient traffic must never travel across the public internet. The infrastructure manager needs the main campus network connected to Azure by next month on a modest budget. And Theo, the lone admin at the hospital's research annex, just needs one Windows Server to reach an Azure file share without touching the annex's firewall. Each request has a different right answer. Which connection fits which person, and what is the catch in the compliance officer's request?",
  "simple": "To link your office network to your private network in Azure, you have a few choices. A site-to-site VPN connects your whole office to Azure through a locked, encrypted tunnel over the ordinary internet. A point-to-site VPN connects one computer at a time, handy for a person working from home. ExpressRoute is a private line rented from a telecom provider straight into Microsoft, so traffic never touches the public internet; it is private, but not automatically scrambled (encrypted). Azure Network Adapter is a shortcut in Windows Admin Center that connects a single Windows Server to Azure with a few clicks. It is like choosing between a shared tunnel for a whole town, a private driveway for one house, a toll road owned by a private company, and a quick footbridge for one person.",
  "body": [
   "Hybrid Windows Server designs need a private path between your datacenter and Azure virtual networks (VNets) so domain controllers can replicate, clients can reach applications and administrators can manage servers without exposing management ports to the internet. Azure offers four options you must be able to compare: site-to-site virtual private network (VPN), point-to-site VPN, ExpressRoute and the Azure Network Adapter feature in Windows Admin Center. The exam usually describes a requirement, such as a whole site, one laptop, no internet path or one server, and asks which option fits.",
   "A site-to-site (S2S) VPN connects a whole on-premises network to a VNet through an encrypted IPsec tunnel negotiated with Internet Key Exchange (IKE) over the internet. On the Azure side you deploy a VPN gateway into a subnet that must be named exactly `GatewaySubnet`, and the gateway gets a public IP address. You create a local network gateway resource that represents your site: the public IP address of your on-premises VPN device and the on-premises address prefixes that should be reachable through the tunnel. A connection resource then ties the virtual network gateway and the local network gateway together using a shared key that must match on your on-premises device. Finally you configure the on-premises VPN device, often using a configuration script downloaded from the portal for supported device models.",
   "Gateways come in two VPN types. Route-based gateways use routing to decide which traffic enters the tunnel, support dynamic routing with Border Gateway Protocol (BGP), multiple site connections and point-to-site connections at the same time, and are the choice for almost every new design. Policy-based gateways use static traffic selectors and exist for older devices that support only that style, with significant limitations. Two practical facts appear in labs and questions: deploying a gateway takes a long time, often half an hour or more, and the gateway is billed per hour whether or not traffic flows. Overlapping address ranges between the VNet and the on-premises prefixes will prevent correct routing, so plan addresses first.",
   "A point-to-site (P2S) VPN connects individual computers, not networks. Each client runs a VPN client and authenticates with a certificate, Microsoft Entra ID or Remote Authentication Dial-In User Service (RADIUS), using tunnel protocols such as OpenVPN, IKEv2 or Secure Socket Tunneling Protocol (SSTP). You configure P2S on a route-based VPN gateway by defining a client address pool, which must not overlap the VNet or on-premises ranges, choosing the tunnel and authentication types, and distributing the VPN client profile. P2S suits remote administrators, contractors or a handful of servers that need to reach a VNet without any change to the corporate edge router.",
   "ExpressRoute is a private, dedicated connection from your network to Microsoft through a connectivity provider, such as a carrier or exchange provider. Traffic does not cross the public internet, so you get more predictable latency, higher bandwidth options and a service level agreement (SLA) on the connection. An ExpressRoute circuit supports private peering, which connects to your VNets through an ExpressRoute gateway deployed in `GatewaySubnet`, and Microsoft peering, which reaches Microsoft public services such as Microsoft 365. Understand a frequent exam trap: ExpressRoute is private but not encrypted by default. If a requirement says encrypted, you add encryption, for example an IPsec VPN tunnel over the ExpressRoute private peering or MACsec on ExpressRoute Direct ports. A common resilient design keeps a site-to-site VPN as a failover path for ExpressRoute, with both gateways in the same `GatewaySubnet`.",
   "Azure Network Adapter is a Windows Admin Center feature for connecting one Windows Server to a VNet quickly. From the server's Networking tool in Windows Admin Center you choose Add Azure Network Adapter, sign in to Azure, pick a subscription and VNet, and Windows Admin Center deploys a new VPN gateway or reuses an existing one, then configures a point-to-site connection with certificate authentication on that server. It handles certificate creation and client configuration for you. It is ideal when a single on-premises server needs to reach Azure resources, such as a file share or a database, and you do not want to reconfigure the edge firewall or involve the network team. It is not a way to connect a whole site, and because it may create a gateway, the same deployment time and hourly cost apply.",
   "When choosing, match the scope and the requirement. Many users or servers at a site with an internet connection and a VPN device point to a site-to-site VPN. Highest reliability, high bandwidth, predictable latency or a rule that traffic must not cross the internet point to ExpressRoute, with encryption added if required. Individual laptops or administrators point to point-to-site. One server managed in Windows Admin Center points to Azure Network Adapter. Several of these can share one gateway subnet, so designs often combine them.",
   "To verify a connection, check the connection resource's status (Connected) and data in and out counters in the portal, view the effective routes on a VM's network interface to confirm on-premises prefixes appear, and test from a server with `Test-NetConnection` to a VM's private IP on a known port."
  ],
  "analogy": "Think of getting from your town to a business park. A site-to-site VPN is an armored bus line on the public highway that carries everyone from your town. A point-to-site VPN is a private car for one person on the same highway. ExpressRoute is a private rail line owned by a rail company that never touches the highway, but its carriages are not locked unless you add locks. Azure Network Adapter is a valet who sets up that private car for one resident in minutes. The analogy stops at cost: the bus depot (the gateway) is billed hourly even when empty.",
  "terms": [
   [
    "Site-to-site VPN",
    "An IPsec/IKE tunnel over the internet between an on-premises VPN device and an Azure VPN gateway, connecting entire networks."
   ],
   [
    "GatewaySubnet",
    "The subnet name required for VPN and ExpressRoute gateways in a VNet."
   ],
   [
    "Local network gateway",
    "An Azure resource describing the on-premises VPN device's public IP and the on-premises address prefixes."
   ],
   [
    "Route-based gateway",
    "A VPN gateway type that uses routing, supports BGP, multiple sites and point-to-site; the standard choice."
   ],
   [
    "Point-to-site VPN",
    "A VPN from an individual computer to a VNet, authenticated by certificate, Entra ID or RADIUS."
   ],
   [
    "ExpressRoute",
    "A private connection to Microsoft through a connectivity provider that bypasses the public internet; not encrypted by default."
   ],
   [
    "Azure Network Adapter",
    "A Windows Admin Center feature that connects a single Windows Server to a VNet using a point-to-site VPN it sets up for you."
   ]
  ],
  "example": "Fabrikam runs its main site over ExpressRoute private peering to a hub VNet, with a site-to-site VPN on the same gateway subnet as backup. Because its policy requires encryption, it also runs an IPsec tunnel over the private peering. A small lab server that must reach an Azure file share is connected separately by Azure Network Adapter from Windows Admin Center, avoiding changes to the lab's firewall, and remote admins use point-to-site VPN with Entra ID authentication.",
  "mistakes": [
   [
    "ExpressRoute traffic is encrypted because it is private.",
    "ExpressRoute keeps traffic off the public internet but does not encrypt it by default. Add IPsec over private peering or MACsec on ExpressRoute Direct when encryption is required."
   ],
   [
    "The gateway subnet can have any name as long as it is large enough.",
    "VPN and ExpressRoute gateways must be deployed in a subnet named exactly GatewaySubnet."
   ],
   [
    "Azure Network Adapter connects a whole branch office.",
    "Azure Network Adapter configures a point-to-site connection for one Windows Server. Use a site-to-site VPN to connect a site."
   ],
   [
    "The virtual network gateway resource stores the on-premises device's public IP.",
    "That information goes in the local network gateway resource; the connection resource links the two gateways with a shared key."
   ]
  ],
  "tryit": [
   [
    "A regional office with 200 users and an existing firewall that supports IPsec needs access to domain controllers and app servers in an Azure VNet within two weeks. Budget is limited and there is no requirement to avoid the internet. What do you deploy, and which Azure resources are involved?",
    "A site-to-site VPN. Deploy a route-based VPN gateway in GatewaySubnet, create a local network gateway with the office firewall's public IP and the office address prefixes, create a connection with a shared key, and configure the firewall with matching settings. ExpressRoute would take longer and cost more, and P2S does not scale to a whole site."
   ],
   [
    "A security policy says hybrid traffic must not cross the internet and must be encrypted end to end. The team proposes ExpressRoute private peering alone. Is that enough?",
    "No. ExpressRoute meets the no-internet requirement but is not encrypted by default. Add encryption, such as an IPsec VPN tunnel over ExpressRoute private peering (or MACsec on ExpressRoute Direct ports), to meet both requirements."
   ]
  ],
  "tip": "Watch for the word 'encrypted': ExpressRoute alone is private, not encrypted. The gateway subnet must be named GatewaySubnet. The on-premises side is described by the local network gateway. Azure Network Adapter is always one server, point-to-site.",
  "check": [
   [
    "Which Azure resource stores the public IP of your on-premises VPN device and your on-premises address ranges?",
    "The local network gateway."
   ],
   [
    "A compliance team requires that hybrid traffic never crosses the public internet. Which option meets this?",
    "ExpressRoute, because it uses a private connection through a connectivity provider rather than the internet; add encryption if also required."
   ],
   [
    "What does Azure Network Adapter configure under the hood?",
    "A point-to-site VPN connection from the single Windows Server to an Azure VPN gateway on the chosen VNet, using certificate authentication."
   ],
   [
    "Which VPN gateway type supports point-to-site and multiple site-to-site connections together?",
    "A route-based VPN gateway."
   ]
  ]
 },
 {
  "t": "Azure File Sync: sync groups, cloud and server endpoints, cloud tiering policies",
  "hook": "Willow & Finch Architects has four small offices, each with a file server whose data drive is 92 percent full of drawings going back fifteen years. Users at the coast office keep emailing files to the city office because the shares are separate, and the last restore test from tape took two days. Grace, the IT generalist, has been told to fix storage, collaboration and recovery without asking users to change how they open files from mapped drives. A vendor mentions Azure File Sync and something called cloud tiering. How can a small branch server seem to hold fifteen years of drawings on a half-empty disk?",
  "simple": "Azure File Sync keeps a master copy of your shared files in Azure and turns each office file server into a fast local copy that stays in sync with it. A change saved at one office travels to Azure and then to the other offices. With cloud tiering turned on, each office server keeps only the files people actually use on its own disk; older files are replaced by tiny placeholders that look exactly like the real file. When someone opens a placeholder, the server quietly downloads the full file from Azure. It is like a home bookshelf connected to a big library: you keep the books you read often at home, and the rest show up within moments when you reach for them.",
  "body": [
   "Azure File Sync lets you keep using the Windows file servers your users already know, with the same mapped drives, Server Message Block (SMB) shares and NTFS permissions, while Azure Files becomes the central, authoritative copy of the data. Each file server acts like a fast local cache of an Azure file share. That combination gives you branch-office performance, multi-site sync without building replication yourself, simpler disaster recovery, because a replacement server can re-sync from the cloud, and with cloud tiering far less local disk.",
   "The pieces fit together in a fixed hierarchy, and the exam tests the limits at each level. In Azure you create a Storage Sync Service resource, the top-level container. On each Windows Server you install the Azure File Sync agent and register the server with that Storage Sync Service, which creates a trust relationship; the registered server then appears under Registered servers in the portal. A server can be registered with only one Storage Sync Service at a time, so servers that must sync with each other belong to the same service. Inside the service you create sync groups. A sync group defines one set of data that stays in sync, and it contains exactly one cloud endpoint and one or more server endpoints.",
   "The cloud endpoint is an Azure file share in a storage account. You create the share first and then reference it when creating the sync group. A server endpoint is a path on a registered server, such as `D:\\Shares\\Sales`, which can be a folder or the root of a volume. Every endpoint in the group syncs with every other endpoint through the cloud endpoint, so a change made on a branch server flows up to Azure and then down to the other branches. When two offices edit the same file at the same time, sync keeps both: the latest change keeps the original name and the other is saved as a conflict copy with the server name added.",
   "Several placement rules prevent loops and overlaps. One registered server can host server endpoints for several different sync groups, for example Sales and Engineering, but it cannot have two server endpoints in the same sync group. Server endpoints on the same volume must not overlap, meaning one cannot be nested inside another's path. The cloud endpoint, as one Azure file share, can belong to only one sync group.",
   "Cloud tiering is an optional setting on each server endpoint, and it is what lets a small disk front a large share. When it is on, the agent keeps frequently used files fully on the local disk and replaces rarely used ones with tiered files: stubs, implemented as reparse points, that keep the name, size shown in Explorer, timestamps, attributes and access control list (ACL), but whose content lives only in Azure. Tiered files carry the offline attribute, shown in Explorer with a gray X or cloud overlay. When a user opens a tiered file, the agent recalls the content transparently, streaming the needed parts first so large files can open before the whole download finishes.",
   "Two policies control what gets tiered. The volume free space policy tells the agent to keep a percentage of the whole volume free, for example 20 percent, tiering the coldest files first, based on last access, until that much space is available. Because it applies to the volume, all server endpoints on the same volume share the strictest setting. The date policy tiers files that have not been accessed within a set number of days, such as 60, regardless of how much free space remains. When both are set, the agent applies both, and if space is tight the volume free space policy wins even for files newer than the date threshold. You can recall files manually with `Invoke-StorageSyncFileRecall -Path D:\\Shares\\Sales`, which helps before taking a server offline, moving data or disabling tiering.",
   "Some rules the exam checks repeatedly. Cloud tiering is not supported on the system volume, so place server endpoints that need tiering on a data volume. Changes made directly in the Azure file share, through the portal, a mounted share or an application writing straight to Azure Files, are not seen instantly; a scheduled change detection job runs about once every 24 hours to find them, so they appear on servers with a delay, whereas changes made on a server endpoint sync up promptly. Backups should target the Azure file share, for example with Azure Backup share snapshots, rather than the tiered server copies, which do not hold all the content. Antivirus, backup and indexing software on the server must respect the offline attribute and skip tiered files, or they will trigger mass recalls that fill the disk and consume bandwidth.",
   "In the lab you will create a storage account and file share, create a Storage Sync Service, install the agent and register a server, then create a sync group with the share as its cloud endpoint. You add a server endpoint, set the Cloud Tiering toggle with a free space percentage and an optional date policy, and later watch files in Explorer show the offline attribute once they tier. The server endpoint's blade in the portal shows sync health and tiering statistics, and the agent writes events to the Telemetry and Operational logs under Applications and Services Logs, Microsoft, FileSync, Agent."
  ],
  "analogy": "Azure File Sync with cloud tiering is like a home bookshelf linked to a central library. The library (the Azure file share) owns every book. Each home (server endpoint) keeps the books read recently on its shelf and leaves an index card for the rest; reach for a card and the book arrives almost at once. The free space rule is 'always keep one shelf empty'; the date rule is 'return anything unread for 60 days'. The analogy stops at sync: when you write in a book at home, every other home's copy updates too.",
  "terms": [
   [
    "Storage Sync Service",
    "The top-level Azure resource that registered servers join and that holds sync groups."
   ],
   [
    "Registered server",
    "A Windows Server with the Azure File Sync agent installed and a trust relationship to one Storage Sync Service."
   ],
   [
    "Sync group",
    "A definition of one synchronized data set, made of one cloud endpoint and one or more server endpoints."
   ],
   [
    "Cloud endpoint",
    "The Azure file share that acts as the central copy in a sync group; each group has exactly one."
   ],
   [
    "Server endpoint",
    "A path on a registered Windows Server that participates in a sync group."
   ],
   [
    "Cloud tiering",
    "A server endpoint feature that keeps hot files local and replaces cold files with stubs that recall content from Azure on access."
   ],
   [
    "Volume free space policy",
    "The cloud tiering setting that keeps a percentage of the volume free, tiering the coldest files first; it takes precedence over the date policy."
   ]
  ],
  "example": "A firm with three branch offices creates one sync group per department share, with a cloud endpoint in Azure Files and server endpoints on each branch server's D: volume. Cloud tiering keeps 20 percent of each branch's data volume free and tiers files untouched for 60 days, so small branch disks hold only current projects while every file stays available. Azure Backup protects the file shares with snapshots, and when one branch server fails, a new server is registered and quickly shows the full namespace again.",
  "mistakes": [
   [
    "A sync group can include several Azure file shares for redundancy.",
    "A sync group has exactly one cloud endpoint. Redundancy for the share comes from the storage account's redundancy setting, and the group can have many server endpoints."
   ],
   [
    "Cloud tiering can be turned on for the C: drive.",
    "Cloud tiering is not supported on the system volume. Put tiered server endpoints on a data volume."
   ],
   [
    "Files copied directly into the Azure file share appear on servers immediately.",
    "Direct changes in the Azure share are found by a change detection job that runs about every 24 hours, so servers see them later."
   ],
   [
    "The date policy always wins because it is more specific.",
    "When both policies are set, the volume free space policy takes precedence if space is needed, and files newer than the date threshold can still be tiered."
   ]
  ],
  "tryit": [
   [
    "A branch server's 2 TB data volume is nearly full, but most of the data has not been opened in a year. Users must still see every file in the same share and folders. The share is already in a sync group. What do you change, and what will users notice?",
    "Enable cloud tiering on that server endpoint with a volume free space policy (for example 20 percent) and optionally a date policy. Cold files become tiered stubs with the offline attribute; users still see every file and open them normally, with a short delay when a tiered file is recalled from Azure the first time."
   ],
   [
    "You plan to decommission a branch server and want its data available on a replacement server at the same office. The old server uses cloud tiering. Do you need to copy files from the old server first?",
    "No full copy is needed: the Azure file share is the authoritative copy. Register the new server with the same Storage Sync Service and add a server endpoint to the same sync group; it downloads the namespace and recalls content as needed. Before removing the old endpoint, confirm sync health shows no pending uploads so no recent changes are lost."
   ]
  ],
  "tip": "Exactly one cloud endpoint per sync group; one Storage Sync Service per registered server; no two server endpoints from the same server in one sync group; no cloud tiering on the system volume. If free space and date policies disagree, free space wins. Direct Azure share changes appear after the roughly daily change detection.",
  "check": [
   [
    "Can a sync group contain two Azure file shares?",
    "No. A sync group has exactly one cloud endpoint, which is one Azure file share; it can have multiple server endpoints."
   ],
   [
    "A user opens a file that shows the offline attribute on a cloud-tiering server. What happens?",
    "The Azure File Sync agent transparently recalls the file content from the Azure file share, and the file opens after the download."
   ],
   [
    "You copy files directly into the Azure file share through the portal. Why don't they appear on the servers immediately?",
    "Direct changes to the Azure share are found by a change detection job that runs roughly every 24 hours, not in real time."
   ],
   [
    "How many Storage Sync Services can one server be registered with at a time?",
    "One."
   ]
  ]
 },
 {
  "t": "Azure Files with AD DS authentication; share-level RBAC vs NTFS permissions",
  "hook": "It is Monday morning at Larkspur Logistics, and the finance team has just been moved from an aging on-premises file server to an Azure file share. By 9:15 your queue has three tickets. Priya can see the share but cannot save her spreadsheet. Devon, who has Full Control on the Reports folder, cannot connect at all. And the storage account key, which the migration contractor used to mount everything, is pasted in a shared notes file. Your manager wants to know two things before lunch: how do people sign in with their own domain accounts, and why are the permissions behaving so strangely?",
  "simple": "Think of an Azure file share as a shared folder that lives in Microsoft's cloud instead of in your server room. Out of the box, you open it with one master password called the storage account key, which is like giving everyone the building's master key. A better setup lets each person sign in with their normal work account. Then there are two locks on the door. The first lock, set in Azure, decides who may enter the shared folder at all and the most they could ever do there. The second lock, the familiar Windows folder permissions, decides what each person can do in each folder and file. You need to pass both locks, and the stricter one wins. It is like a gym membership: you need a valid card to get in the front door and the right booking to use a particular room.",
  "body": [
   "Azure Files offers fully managed file shares that clients reach over the Server Message Block (SMB) protocol, the same protocol Windows file servers use. By default you mount a share with the storage account key, which works like a single all-powerful password: anyone holding it has full control of every share in the account, and nothing in the logs ties actions to a person. For real file server use you want users to connect with their normal domain identity and receive per-user permissions. Azure Files supports identity-based access over SMB with on-premises Active Directory Domain Services (AD DS), Microsoft Entra Domain Services, or Microsoft Entra Kerberos for hybrid identities. This lesson focuses on AD DS, which is the option most often tested when the scenario describes an existing on-premises domain.",
   "Enabling AD DS authentication means creating an identity for the storage account inside your domain, so that domain controllers can issue Kerberos tickets for it just as they would for a file server. You typically download the AzFilesHybrid PowerShell module and run `Join-AzStorageAccount` from a domain-joined machine, signed in with an account that can create objects in AD and can manage the storage account in Azure. The cmdlet creates a computer account (or, if you choose, a service logon account) that represents the storage account in an organizational unit (OU) you specify, and it writes your domain information, such as the domain name, forest name and domain globally unique identifier (GUID), into the storage account's configuration. If you see the storage account listed in Active Directory Users and Computers, that is expected; treat that object like any other service identity and keep its password rotation in mind.",
   "Two prerequisites trip people up. First, the users who will access the share must be synced to Microsoft Entra ID by Microsoft Entra Connect (or Entra Cloud Sync), because share permissions are assigned in Azure to Entra identities. A cloud-only account, or an AD account that is filtered out of sync, cannot be given a share-level role in a way that matches its Kerberos ticket. Second, the network path must work. Clients need to reach the storage account on TCP port 445, which many internet service providers and home routers block, so production designs often use a virtual private network (VPN), ExpressRoute or a private endpoint. Clients also need line of sight to a domain controller to obtain Kerberos tickets in the first place.",
   "Once identity is in place, access is checked in two layers, just like a traditional Windows share with share permissions and NTFS permissions. The first layer is share-level permissions, set with Azure role-based access control (RBAC). The three built-in roles you must know are Storage File Data SMB Share Reader, which allows read access; Storage File Data SMB Share Contributor, which allows read, write and delete; and Storage File Data SMB Share Elevated Contributor, which adds the ability to change NTFS permissions on files and folders. You assign these roles to users or groups at the scope of the share (or higher). Alternatively, you can configure a default share-level permission that applies to all authenticated identities, which is handy when you want every domain user to pass the first gate and let NTFS do all the fine-grained work.",
   "The second layer is directory and file-level permissions: ordinary Windows NTFS access control lists (ACLs). You set them by mounting the share on a domain-joined Windows machine and using File Explorer's Security tab or the `icacls` command, exactly as you would on a Windows server. Initial configuration is often done by mounting once with the storage account key, which acts as a superuser and bypasses ACL checks, or by a user holding the Elevated Contributor role. After the ACLs are set, the key should go back in the vault and be rotated if it has been shared. When you use Azure File Sync to cache the share on an on-premises server, these NTFS ACLs are preserved in both directions, so the same permissions apply whether users hit the cloud share or the local cache.",
   "Effective access is the most restrictive combination of the two layers. A user with Share Contributor but only Read in NTFS can only read, because NTFS is stricter. A user with Full Control in NTFS but no share role and no default share-level permission cannot connect at all, because the first gate is closed. A user with Share Reader and Full Control in NTFS can still only read. This is the same mental model as classic Windows share plus NTFS permissions, and exam questions use it the same way: find the tighter of the two layers.",
   "There is one more distinction that produces many wrong answers. Azure separates the management plane from the data plane. Management-plane roles such as Owner, Contributor or Storage Account Contributor let you configure the storage account, create shares and even read the account keys, but they do not grant SMB data access through identity-based authentication by themselves. In the same way, Storage Blob Data roles apply to blob containers, not to file shares. If a scenario says an administrator is Owner of the subscription yet gets access denied when mapping the share with their domain account, the missing piece is a Storage File Data SMB Share role or a default share-level permission.",
   "When troubleshooting, work in order from the network up. Confirm that TCP port 445 to the storage account endpoint is reachable, for example with `Test-NetConnection <account>.file.core.windows.net -Port 445`. Confirm the storage account is joined to AD with the correct domain and that its AD object still exists. Confirm the user is synced to Entra ID. Confirm a share-level role or default permission applies. Finally, check the NTFS ACL on the folder. The `Debug-AzStorageAccountAuth` cmdlet in AzFilesHybrid runs many of these checks for you and reports which one fails, which is far faster than guessing."
  ],
  "analogy": "Picture an office building with a security desk in the lobby and locked doors on each floor. Your badge (the share-level RBAC role) gets you past the lobby desk and says the most you are allowed to do in the building. The individual door locks (NTFS ACLs) decide which rooms you can actually enter. You need both, and the stricter one wins. The analogy stops working in one place: in Azure Files, the building manager who owns the whole building (Owner on the storage account) still does not get a lobby badge automatically.",
  "mnemonic": "To troubleshoot identity access in order, think Please Join Sync Share Now: Port 445 reachable, storage account Joined to AD, user Synced to Entra ID, Share-level role or default permission, then NTFS ACL.",
  "terms": [
   [
    "AD DS authentication for Azure Files",
    "A configuration that represents the storage account as an AD object so domain users can access SMB shares with Kerberos."
   ],
   [
    "Share-level permissions",
    "Azure RBAC roles assigned on a file share that control whether an identity can connect and with what maximum access."
   ],
   [
    "Default share-level permission",
    "A setting that grants a chosen share-level role to all authenticated identities, so NTFS ACLs can do the fine-grained control."
   ],
   [
    "Storage File Data SMB Share Elevated Contributor",
    "The share role that allows read, write, delete and modifying NTFS permissions."
   ],
   [
    "NTFS permissions",
    "Directory and file ACLs enforced inside the share, set with Explorer or icacls just as on a Windows file server."
   ],
   [
    "Join-AzStorageAccount",
    "The AzFilesHybrid cmdlet that creates the storage account's identity in AD and configures the account for AD DS authentication."
   ]
  ],
  "example": "An admin joins a storage account to contoso.com with Join-AzStorageAccount, gives the synced group Finance-Users the Storage File Data SMB Share Contributor role on the finance share, then mounts it and uses icacls so Finance-Users can modify only the Reports folder and read the rest. A finance user maps the share with their own sign-in and no key.",
  "mistakes": [
   [
    "Giving a user Owner or Contributor on the storage account so they can open files on the share.",
    "Those are management-plane roles. For identity-based SMB access the user needs a Storage File Data SMB Share role (or a default share-level permission) plus suitable NTFS permissions."
   ],
   [
    "Assuming Full Control in NTFS is enough to reach the share.",
    "Both layers are checked. With no share-level role and no default permission, the user cannot connect, regardless of NTFS."
   ],
   [
    "Thinking cloud-only Entra accounts work with AD DS authentication.",
    "With AD DS as the source, users must exist in AD and be synced to Entra ID, because the Kerberos ticket comes from AD and the share role is assigned to the synced Entra identity."
   ],
   [
    "Continuing to give users the storage account key so they can map the drive.",
    "The key is a superuser credential with no per-user auditing. Use it only for initial ACL setup or break-glass, then rotate it."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union wants every domain user to be able to reach a new Azure file share, but the file server team insists that all real permissions be managed with NTFS groups, just as before. They do not want to maintain dozens of Azure role assignments. What should you configure at the share level?",
    "Configure a default share-level permission (for example Storage File Data SMB Share Contributor) for all authenticated identities, then use NTFS ACLs for the fine-grained rules. Every authenticated user passes the first gate, and NTFS decides what each group can actually do."
   ],
   [
    "A help desk technician reports that a user gets access denied when mapping the HR share. The user is in the HR group that has Share Contributor, and the NTFS ACL grants HR Modify. You discover the user's account was created last week in an OU that is excluded from Entra Connect sync. What is the cause?",
    "The user is not synced to Entra ID, so the share-level role assigned to the HR group in Azure does not apply to them. Bring the OU into sync scope (or move the account), wait for sync, and test again."
   ]
  ],
  "tip": "Both layers apply and the most restrictive wins. Share access is Azure RBAC on synced Entra identities; fine-grained control is NTFS. Owner or Contributor on the storage account does not give SMB data access.",
  "check": [
   [
    "Why must users be synced to Microsoft Entra ID when Azure Files uses AD DS authentication?",
    "Share-level permissions are Azure RBAC role assignments, which are granted to Entra identities; Kerberos then validates the matching AD account."
   ],
   [
    "A user has Full Control in NTFS on a folder but no share-level role and no default share permission. What access do they get?",
    "None; without share-level permission they cannot access the share, because both layers must allow access."
   ],
   [
    "Which share role lets a user change NTFS permissions on files?",
    "Storage File Data SMB Share Elevated Contributor."
   ],
   [
    "A user has Storage File Data SMB Share Reader and Modify in NTFS. What can they do?",
    "Only read, because the share-level role is the more restrictive layer."
   ]
  ]
 },
 {
  "t": "SMB security: encryption, signing, SMB over QUIC, removing SMBv1",
  "hook": "You are three weeks into your job at Cedar Ridge Law, and the managing partner forwards you a penetration test summary. It lists four findings against the file servers: file traffic readable on the guest Wi-Fi segment that shares a switch with the branch office, an authentication relay that worked because messages were not signed, attorneys who cannot reach the document share from hotels because port 445 is blocked, and one server that still answers SMB version 1. The partner's note is short: fix these without buying new hardware and without breaking the old copier in the mailroom. Where do you start?",
  "simple": "SMB is the language Windows computers speak when they open files on a shared folder across the network. Because it carries documents and sign-in information, it needs protection. Encryption scrambles the traffic so anyone listening sees nonsense. Signing adds a tamper-proof seal to every message, so the receiver knows it really came from the sender and was not changed, but the content is still readable. SMB over QUIC is a newer way to reach shares safely across the internet without a VPN, using the same port as secure websites. SMBv1 is the very old version of the language, with known weaknesses, and should be switched off. Think of mailing a letter: signing is a wax seal, encryption is a locked box, and SMBv1 is an envelope that anyone can steam open.",
  "body": [
   "Server Message Block (SMB) is the protocol behind Windows file shares, and it carries sensitive data as well as authentication traffic. Attackers target it to read traffic on the wire, tamper with it in transit, relay authentication to another server and exploit old protocol versions. Windows Server gives you four main controls that map neatly onto those threats: encryption for confidentiality, signing for integrity and anti-relay, SMB over QUIC for safe access across untrusted networks, and removing SMB version 1 to close an outdated and exploited code path.",
   "SMB encryption, available in SMB 3.0 and later, encrypts data end to end between client and server using AES (Advanced Encryption Standard) modes such as AES-128-GCM and, on newer versions, AES-256. You can enable it per share with `Set-SmbShare -Name Finance -EncryptData $true`, or for every share on the server with `Set-SmbServerConfiguration -EncryptData $true`. In Windows Admin Center and Server Manager you will also see an Encrypt data access check box on the share properties. By default, an encrypted share rejects clients that cannot encrypt, such as older SMB 2 clients; the `RejectUnencryptedAccess` server setting controls that behavior. Encryption protects confidentiality on untrusted networks without deploying Internet Protocol Security (IPsec) or special hardware, and because the encrypted messages are also integrity-protected, an attacker cannot silently modify them.",
   "SMB signing adds a cryptographic signature to each message so the receiver can detect tampering and so a man-in-the-middle cannot relay a session to another server. Signing does not hide the data. It proves integrity and authenticity, which is exactly what defeats relay attacks, where an attacker captures an authentication exchange and forwards it to a different server to act as the victim. You require signing with Group Policy settings such as Microsoft network server: Digitally sign communications (always) and its client counterpart, or with `Set-SmbServerConfiguration -RequireSecuritySignature $true`. Domain controllers have long required signing for SYSVOL and NETLOGON, and recent Windows versions, including Windows Server 2025, require signing more broadly by default. If a connection is encrypted, signing is not also needed, since encryption already provides integrity.",
   "Keeping these two straight is a classic exam distinction. Signing equals integrity and authenticity: a sniffer can still read the file contents. Encryption equals confidentiality plus integrity: a sniffer sees only ciphertext. If a question asks how to stop someone on the network from reading payroll files, signing is the wrong answer even though it sounds secure. If a question asks how to block NT LAN Manager (NTLM) relay against file servers without changing clients' ability to read traffic, requiring signing is the expected answer.",
   "SMB over QUIC lets clients reach file shares over the internet without a virtual private network (VPN). QUIC is a transport protocol that runs over UDP port 443 and always uses TLS 1.3 (Transport Layer Security), so the whole SMB session, including authentication, is encrypted inside the tunnel. The server needs a certificate that clients trust, mapped to the server's name with `New-SmbServerCertificateMapping`, and you can restrict which clients may connect with SMB over QUIC client access control. In Windows Server 2022 this capability was limited to the Azure Edition; Windows Server 2025 brings it to its regular editions. It is a good fit for mobile users and branch devices where TCP port 445 is blocked, which it often is on public and hotel networks. Remember the trio for the exam: UDP 443, TLS 1.3 and a certificate.",
   "SMB version 1 is decades old, lacks modern protections such as pre-authentication integrity and encryption, and was abused by worms such as WannaCry. It is not installed by default on current Windows Server versions, but upgraded servers or older images may still have it. Do not just rip it out: first audit who uses it with `Set-SmbServerConfiguration -AuditSmb1Access $true` and read the Microsoft-Windows-SMBServer/Audit event log, which records the client address of each SMBv1 connection. After an audit period long enough to catch monthly jobs, disable the protocol with `Set-SmbServerConfiguration -EnableSMB1Protocol $false` and remove the feature completely with `Uninstall-WindowsFeature FS-SMB1`. Anything that still needs SMBv1, such as an old scanner or copier, should be upgraded or isolated on its own network segment.",
   "Finally, verify what is actually negotiated. Use `Get-SmbConnection` on a client to see the dialect in use for each connection, for example 3.1.1, and whether it is encrypted or signed. Use `Get-SmbSession` on a server to see connected clients and their dialects, and `Get-SmbServerConfiguration` to confirm the encryption, signing and SMB1 settings. A sound hardening sequence is audit SMBv1, require signing broadly, enable encryption on sensitive shares or servers, offer SMB over QUIC for remote users, then remove SMBv1 once the audit log is quiet."
  ],
  "analogy": "Think of sending documents through an office courier. Signing is a tamper-evident seal on a clear plastic folder: the recipient knows nobody swapped pages, but anyone along the way can read them. Encryption is a locked case: nobody can read or change the contents. SMB over QUIC is sending that locked case through the public mail on the route secure websites use, so it is not stopped at the door. SMBv1 is a courier who leaves folders unattended in the lobby.",
  "terms": [
   [
    "SMB encryption",
    "An SMB 3.x feature that encrypts file traffic end to end, enabled per share or server-wide."
   ],
   [
    "SMB signing",
    "Cryptographic signing of SMB messages that detects tampering and blocks relay attacks, without hiding content."
   ],
   [
    "SMB over QUIC",
    "SMB carried over QUIC on UDP 443 with TLS 1.3, allowing secure file access over the internet without a VPN."
   ],
   [
    "SMBv1",
    "The original SMB dialect, insecure and deprecated, which should be audited, disabled and removed."
   ],
   [
    "RejectUnencryptedAccess",
    "An SMB server setting that, when on, refuses clients that cannot encrypt when they connect to an encrypted share."
   ]
  ],
  "example": "A legal firm enables encryption on its Contracts share so traffic crossing a shared branch link is unreadable, requires signing domain-wide via Group Policy, and turns on SMBv1 auditing for two weeks. The audit log shows one old copier using SMBv1; after replacing it, the admin runs Uninstall-WindowsFeature FS-SMB1 on every file server.",
  "mistakes": [
   [
    "Choosing SMB signing to stop eavesdroppers from reading files.",
    "Signing only proves integrity and authenticity. To keep content confidential, enable SMB encryption."
   ],
   [
    "Thinking SMB over QUIC uses TCP 445 like normal SMB.",
    "SMB over QUIC uses UDP 443 with TLS 1.3 and needs a trusted server certificate; that is why it works where 445 is blocked."
   ],
   [
    "Disabling SMBv1 immediately on every server without auditing.",
    "Audit first with AuditSmb1Access and the SMBServer/Audit log so you find legacy devices before they break, then disable and remove."
   ],
   [
    "Requiring both signing and encryption on the same connection for extra safety.",
    "An encrypted connection already has integrity protection, so signing is not also needed there."
   ]
  ],
  "tryit": [
   [
    "Maple Health's clinicians work from home and coffee shops, and the security team refuses to deploy a VPN for file access. Outbound TCP 445 is blocked on most of those networks. The file servers run Windows Server 2025. What do you recommend, and what does the server need?",
    "Enable SMB over QUIC. It carries SMB over UDP 443 with TLS 1.3, so it passes networks that block 445 and encrypts the whole session. The server needs a certificate trusted by the clients, mapped with New-SmbServerCertificateMapping, and you can add client access control to limit which devices connect."
   ],
   [
    "After enabling encryption on a share, a team using an old line-of-business app on a legacy client reports they can no longer open files there. Other users are fine. What is the likely cause, and what are your options?",
    "The legacy client does not support SMB 3 encryption, and the encrypted share rejects unencrypted access by default. The secure fix is to upgrade the client; a temporary option is to allow unencrypted access with the RejectUnencryptedAccess setting, accepting the risk, or to move that app's data to a separate share."
   ]
  ],
  "tip": "Signing equals integrity and anti-relay; encryption equals confidentiality plus integrity. SMB over QUIC means UDP 443, TLS 1.3 and a certificate. Audit SMBv1 before removing it.",
  "check": [
   [
    "What port and protocol does SMB over QUIC use?",
    "UDP port 443, using QUIC with TLS 1.3 encryption."
   ],
   [
    "Does SMB signing prevent someone sniffing the network from reading file contents?",
    "No. Signing only proves integrity and authenticity; you need SMB encryption to hide the content."
   ],
   [
    "How can you find out which clients still use SMBv1 before disabling it?",
    "Enable SMB1 access auditing with Set-SmbServerConfiguration -AuditSmb1Access $true and review the Microsoft-Windows-SMBServer/Audit event log."
   ],
   [
    "Which command enables encryption for only one share named Finance?",
    "Set-SmbShare -Name Finance -EncryptData $true."
   ]
  ]
 },
 {
  "t": "File Server Resource Manager quotas and file screens; DFS Namespaces and DFS Replication",
  "hook": "At Northfield Community College, the student home drive volume hit 98 percent full overnight, and backups failed. When you look, one student folder holds 40 GB of movies. Meanwhile, the dean's office in the east campus complains that opening the shared Policies folder takes ages, because every file comes across the slow link from the main campus server. The IT director asks for a plan by Friday: keep any one user from filling the disk, stop video files from landing on the home drives, and give both campuses fast local access to the same shared folders without changing the paths people already use. Which Windows Server tools do that?",
  "simple": "File Server Resource Manager is a set of tools for keeping a file server tidy. A quota is a size limit on a folder, like a storage locker that only holds so much. A hard quota stops you from adding more when it is full; a soft quota just sends a warning. A file screen is a rule that blocks certain kinds of files, such as videos, by looking at their names. DFS Namespaces give everyone one simple address for shared folders, even if the folders really live on different servers, a bit like a phone number that rings whichever office is closest. DFS Replication copies changes between servers so each office has its own up-to-date copy.",
  "body": [
   "File Server Resource Manager (FSRM) is a role service of the File and Storage Services role that helps you control what gets stored on file servers and how much. Two of its features appear most on the exam: quotas and file screens. Distributed File System (DFS) is a separate pair of role services, DFS Namespaces and DFS Replication, which give users one path to shares spread across servers and keep copies of those shares in sync. They solve different problems, but they are often deployed together on the same file servers, so it pays to learn them side by side.",
   "FSRM quotas limit space on a folder or volume, which is different from the older NTFS disk quotas that work per user per volume. A hard quota blocks writes once the limit is reached; the user sees a disk-full style error. A soft quota never blocks, it only notifies, which is useful for monitoring growth or for departments where blocking would cause more harm than the space used. Quota templates let you define a limit plus notification thresholds, for example at 85 and 100 percent, with actions at each threshold: send an email to the user or admin, write an event to the Application log, run a command or script, or generate a storage report. Changes to a template can be pushed to every quota derived from it.",
   "An auto apply quota applies a template to every existing and new subfolder of a path, which is ideal for home folders. If you set an auto apply quota on `D:\\Home` with a 2 GB hard template, every user folder already there gets its own 2 GB limit, and every new folder created for a new hire gets one too, with no extra work. That subtle point, a separate quota per subfolder rather than one shared limit on the parent, is what exam scenarios usually hinge on.",
   "File screens block or monitor file types by name pattern. Patterns are grouped into file groups, such as Audio and Video Files, Executable Files or Image Files, which you can edit or extend. An active screen blocks the save and can notify; a passive screen allows the save but notifies, which is useful to measure a problem before enforcing. File screen exceptions allow specific file groups inside a screened folder, for example permitting video files in a Marketing subfolder under a screened parent. Remember that screens match file names and extensions, not content, so a renamed file bypasses them. FSRM also offers file classification and storage reports, such as Large Files and Duplicate Files. Manage it with the FSRM console or cmdlets such as `New-FsrmQuotaTemplate`, `New-FsrmQuota`, `New-FsrmAutoQuota` and `New-FsrmFileScreen`.",
   "DFS Namespaces (DFS-N) create a virtual folder tree, such as `\\\\contoso.com\\Files\\Sales`, whose folders point to real shares called folder targets. A domain-based namespace is stored in Active Directory, is reachable by the domain name and can have several namespace servers for availability, so losing one server does not break the path. A stand-alone namespace lives on one server and is reached by that server's name, such as `\\\\FS01\\Public`; it is the choice when there is no domain, or when you want to host the namespace on a failover cluster for availability instead.",
   "The magic of DFS-N is the referral. When a client opens a folder with multiple targets, the namespace server returns a referral listing those targets, ordered with targets in the client's own AD site first and the rest by site link cost, so users automatically use the nearest server. Clients cache referrals for a period, which keeps lookups cheap. Because users only ever type the namespace path, you can add a new server, move a share or retire old hardware by changing folder targets, without touching mapped drives, shortcuts or scripts.",
   "DFS Replication (DFSR) keeps folders synchronized between servers using a multi-master model: changes on any member replicate to the others. You create a replication group made up of member servers, replicated folders and connections that define the topology, such as hub and spoke for branch offices or full mesh for a few well-connected servers. DFSR uses remote differential compression (RDC) to send only the changed blocks of a file, a staging folder to prepare files before sending, and a bandwidth schedule so replication can be throttled during business hours. During initial replication, the primary member's copy is authoritative, so choose the server with the most complete data as primary.",
   "DFSR's limits are just as testable as its features. Conflicts are resolved by last writer wins, and losing versions are moved to the ConflictAndDeleted folder, where an admin can recover them. DFSR does not lock files across servers, so it suits read-mostly data or data written at a single site, not files edited by many users in different places at the same time; two people editing the same spreadsheet in two campuses means one person's changes end up in ConflictAndDeleted. Monitor health with the DFS Replication event log, health reports in the DFS Management console and `Get-DfsrBacklog` to see how many files are waiting.",
   "The usual design combines them: a namespace folder with targets on two servers, kept in sync by DFSR, so users reach the local copy through one path and survive the loss of a server. Add FSRM quotas and screens on each server to keep the data itself under control."
  ],
  "analogy": "A DFS namespace is like a company's main phone number. Callers dial one number, and the switchboard connects them to the nearest office that can help, so offices can move without anyone learning a new number. DFS Replication is the nightly courier who keeps each office's binder of policies identical. The analogy breaks in one important place: there is no lock on the binders, so if two offices edit the same page on the same day, only the last edit survives in the binder and the other is set aside.",
  "terms": [
   [
    "Hard vs soft quota",
    "A hard quota blocks writes at the limit; a soft quota only sends notifications."
   ],
   [
    "Auto apply quota",
    "An FSRM quota that applies a template to every existing and future subfolder of a path, each with its own limit."
   ],
   [
    "Active vs passive file screen",
    "An active screen blocks saving matching files; a passive screen allows it but notifies or logs."
   ],
   [
    "Domain-based namespace",
    "A DFS namespace stored in AD, accessed via the domain name and hosted on one or more namespace servers."
   ],
   [
    "Referral",
    "The list of folder targets a DFS namespace returns to a client, ordered by site cost so the closest target is tried first."
   ],
   [
    "DFS Replication",
    "A multi-master engine that replicates folders between servers using remote differential compression and a staging area."
   ]
  ],
  "example": "A university applies an auto apply quota template of 5 GB with email alerts to the Students home folder root, and an active file screen blocking video files there. Departmental shares are published as \\\\uni.edu\\Dept with targets in two campuses kept in sync by DFSR, so each campus reads its local copy.",
  "mistakes": [
   [
    "Using a regular quota on the home folder root to give each user a limit.",
    "A regular quota on the parent sets one shared limit for all users. An auto apply quota gives every existing and new subfolder its own limit."
   ],
   [
    "Believing a file screen inspects file contents.",
    "Screens match names and extensions only. A renamed file gets through, so screens are a hygiene control, not a security boundary."
   ],
   [
    "Using DFSR to keep a heavily co-edited file in sync between two sites.",
    "DFSR has no distributed locking; simultaneous edits conflict and the loser goes to ConflictAndDeleted. Use it for read-mostly or single-writer data."
   ],
   [
    "Thinking a stand-alone namespace is reached by the domain name.",
    "A stand-alone namespace is reached by its server name; only a domain-based namespace uses the domain name and can have several namespace servers."
   ]
  ],
  "tryit": [
   [
    "Bayview Engineering's marketing team must be allowed to store videos, but every other department folder under D:\\Shares should block audio and video files. The admin wants to avoid creating dozens of separate screens. What do you configure?",
    "Create one active file screen on D:\\Shares using the Audio and Video Files group, then create a file screen exception on the Marketing subfolder that allows that file group. The parent screen covers every department, and the exception carves out Marketing."
   ],
   [
    "Two branch offices each have a file server. Users in both branches must use the path \\\\bayview.local\\Docs\\Manuals, should read from their local server, and manuals are only updated by the head office. A server failure in one branch should not stop access. What design fits?",
    "A domain-based DFS namespace with the Manuals folder having folder targets on both branch servers (and optionally head office), replicated with DFSR in a hub and spoke topology from head office. Referrals send users to their own site's target, and the single-writer pattern avoids DFSR conflicts."
   ]
  ],
  "tip": "Hard blocks, soft warns; active blocks, passive warns. DFSR has no distributed file locking, so beware answers that use it for files edited simultaneously at multiple sites.",
  "check": [
   [
    "You want every new user home folder under D:\\Home to get a 2 GB limit automatically. What do you configure?",
    "An FSRM auto apply quota on D:\\Home using a 2 GB hard quota template."
   ],
   [
    "How does a DFS namespace send a user to the nearest copy of a share?",
    "It returns a referral that orders folder targets by AD site cost, with targets in the client's site first."
   ],
   [
    "During initial DFSR replication, which copy wins if files differ?",
    "The primary member's copy is authoritative for the initial sync."
   ],
   [
    "Where does DFSR put the losing version of a file after a conflict?",
    "In the ConflictAndDeleted folder, from which it can be recovered."
   ]
  ]
 },
 {
  "t": "Storage Spaces resiliency and provisioning; ReFS vs NTFS; Data Deduplication",
  "hook": "Willow Creek Dental is replacing a file server whose hardware RAID controller died last month, taking the practice's imaging archive offline for a day. The new server arrives with eight plain drives and no RAID card. The owner, Dr. Okafor, asks you three questions over coffee: if a drive fails, will we lose anything; can we start with less storage and grow later; and why is the old server full when half the files look like copies of each other? You have Windows Server and an afternoon. How do you build storage that survives a disk failure, grows on demand and stops storing the same bytes twice?",
  "simple": "Storage Spaces lets Windows combine several ordinary hard drives into one big pool, then carve that pool into virtual drives. You choose how safe each virtual drive is. A mirror keeps extra copies of everything on different disks, so one disk can die without losing data. Parity saves space by storing clever math that can rebuild a lost disk, but writing is slower. Thin provisioning lets you promise more space than you have and add disks later, like a phone plan you top up. ReFS and NTFS are two ways of organizing files on a drive; ReFS is tougher for huge volumes and virtual machines, while NTFS does more everyday tricks. Deduplication spots identical pieces of files and keeps only one copy.",
  "body": [
   "Storage Spaces is software-defined storage built into Windows Server. It lets you group ordinary disks, whether SATA, SAS or NVMe (Non-Volatile Memory Express), into a storage pool, then create virtual disks, called storage spaces, from the pool with the resiliency you choose. Windows then sees each virtual disk as a normal disk that you initialize, partition and format. Storage Spaces replaces the need for a hardware RAID (redundant array of independent disks) controller on a single server, and it is the foundation for Storage Spaces Direct in clusters, so the vocabulary you learn here carries forward.",
   "Resiliency types trade capacity for protection. Simple stripes data across disks with no redundancy; it is fast, but any disk failure loses the data, so use it only for scratch or easily re-created data. Mirror keeps full copies on different disks. A two-way mirror stores two copies, survives one disk failure and needs at least two disks; you get 50 percent of raw capacity. A three-way mirror stores three copies, survives two failures and needs at least five disks on a single server; you get about a third of raw capacity. Parity stores data plus parity information, similar in idea to RAID 5 or RAID 6. It uses capacity more efficiently but writes are slower, because every write must also calculate and update parity, so parity suits archival, backup or sequential data rather than busy databases or virtual machines.",
   "Columns are a less obvious setting with real consequences. The number of columns sets how many disks a virtual disk stripes across at once. More columns generally means more throughput, but it also means that when you expand the pool you must add disks in multiples that let the space keep its column layout. If an exam scenario mentions adding a single disk and the virtual disk will not extend, a column count larger than the new free disks is the likely reason.",
   "Provisioning can be fixed or thin. Fixed provisioning allocates all the space up front, so the pool's free space drops immediately and you cannot oversubscribe. Thin provisioning lets you create a virtual disk larger than the pool's current free space, allocating only as data is actually written. That is convenient for growth, but it carries a real risk: if the pool runs out of physical space, writes fail and volumes can go offline. You must monitor pool capacity and add disks before it fills. For failures, you can mark disks as hot spares, but Storage Spaces can also rebuild into free pool space without a dedicated spare, which is usually preferred because every disk contributes to performance.",
   "In PowerShell the core commands are short. `Get-PhysicalDisk -CanPool $true` lists disks eligible for pooling (no partitions, not already pooled). `New-StoragePool -FriendlyName Pool1 -StorageSubSystemFriendlyName \"Windows Storage*\" -PhysicalDisks (Get-PhysicalDisk -CanPool $true)` builds the pool. `New-VirtualDisk -StoragePoolFriendlyName Pool1 -FriendlyName Data -ResiliencySettingName Mirror -ProvisioningType Thin -Size 4TB` creates a thin mirror space. When a disk fails, Server Manager and `Get-StoragePool` show the pool and virtual disk as degraded, while the data stays online; you retire the failed disk, add a replacement and let the repair run, which you can watch with `Get-StorageJob`.",
   "Resilient File System (ReFS) and NTFS are the two main file systems on Windows Server. ReFS is designed for large volumes and data integrity. It checksums metadata, and file data too when integrity streams are enabled, so it can detect corruption. On a mirror or parity Storage Space, ReFS can automatically repair corrupted data using the good copy. ReFS also offers block cloning, which makes Hyper-V checkpoint merges and similar copy operations very fast because blocks are remapped rather than copied, and sparse valid data length (VDL), which makes creating or expanding fixed VHDX (virtual hard disk) files nearly instant. That is why ReFS is recommended for Hyper-V hosts and Storage Spaces Direct volumes.",
   "NTFS remains the general-purpose choice and supports features ReFS lacks. You cannot boot Windows from ReFS, so the system volume is always NTFS. NTFS also supports file-level compression, Encrypting File System (EFS) and per-user NTFS disk quotas, none of which ReFS offers. If a scenario requires any of those, NTFS is the answer. You cannot convert between the two file systems in place; to change, you create a new volume, format it and copy the data across.",
   "Data Deduplication finds repeated chunks of data across files on a volume and stores each chunk once, which can save a great deal of space on general file shares, VDI (virtual desktop infrastructure) VHDX files and backup targets. It works post-process: files are written normally, and a scheduled optimization job later splits them into variable-size chunks, moves unique chunks into a chunk store and replaces the original file with a reparse point that points to its chunks. Users and apps see ordinary files. Two other background jobs matter: garbage collection reclaims chunks no longer referenced after files are deleted, and integrity scrubbing verifies the chunk store and repairs from redundant copies where possible.",
   "You enable deduplication per volume with `Enable-DedupVolume -Volume E: -UsageType Default`, choosing the usage type that matches the workload: Default for general-purpose file servers, HyperV for VDI, or Backup for virtualized backup applications. Check savings with `Get-DedupStatus` and `Get-DedupVolume`. Deduplication is not supported on system or boot volumes, and by default it skips files newer than a configurable minimum file age, so hot files being written all day are left alone. It works on NTFS and, on current Windows Server versions, on ReFS as well."
  ],
  "analogy": "A storage pool is like a shared pantry, and storage spaces are labeled shelves cut from it. A mirror shelf keeps two or three identical jars of everything in different spots, so dropping one jar loses nothing. Parity is keeping a recipe card that lets you remake a lost jar: cheaper on space, slower to restock. Thin provisioning is promising guests more jars than the pantry holds today, which works only if you keep shopping. Deduplication is noticing ten jars of the same salt and keeping one, with labels pointing to it.",
  "terms": [
   [
    "Storage pool",
    "A group of physical disks from which Storage Spaces virtual disks are created."
   ],
   [
    "Two-way vs three-way mirror",
    "Mirror resiliency keeping two copies (tolerates one disk failure) or three copies (tolerates two)."
   ],
   [
    "Parity",
    "Resiliency that stores data plus parity information, giving better capacity efficiency but slower writes."
   ],
   [
    "Thin provisioning",
    "Creating a virtual disk larger than available space and allocating capacity only as data is written."
   ],
   [
    "ReFS",
    "Resilient File System, which checksums metadata (and data with integrity streams), self-repairs with Storage Spaces mirrors and supports fast block cloning."
   ],
   [
    "Data Deduplication",
    "A post-process feature that stores duplicate data chunks once per volume, with usage types Default, HyperV and Backup."
   ]
  ],
  "example": "An admin building a VDI host pools six SSDs, creates a thin-provisioned two-way mirror space formatted ReFS for the virtual desktop VHDX files, and enables deduplication with the HyperV usage type. The many near-identical desktop images shrink dramatically, and a disk failure leaves the pool degraded but online until the disk is replaced.",
  "mistakes": [
   [
    "Choosing ReFS for a volume that must use EFS, NTFS compression or per-user disk quotas.",
    "ReFS does not support those features or booting Windows. Choose NTFS when any of them is required."
   ],
   [
    "Picking parity for a busy virtual machine or database volume because it saves space.",
    "Parity writes are slower. Mirror is the better fit for random-write, performance-sensitive workloads; parity suits archives and backups."
   ],
   [
    "Assuming thin provisioning creates free space.",
    "Thin provisioning only delays allocation. If the pool's physical disks fill, writes fail, so you must monitor and add disks."
   ],
   [
    "Enabling deduplication on the C: system volume.",
    "Deduplication is not supported on system or boot volumes; use it on data volumes."
   ]
  ],
  "tryit": [
   [
    "Pinecrest Archives has a standalone server with five equal HDDs and needs a volume for scanned records that are written once and rarely read. Capacity matters more than write speed, and the volume must survive a disk failure. Which resiliency do you choose, and why not a three-way mirror?",
    "Parity. It protects against a disk failure while using far more of the raw capacity than mirroring, and its slower writes do not matter for write-once archival data. A three-way mirror would also work with five disks but would give only about a third of the raw capacity."
   ],
   [
    "A Hyper-V host's data volume is formatted NTFS. Checkpoint merges take a long time and creating new fixed-size VHDX files ties up the disk for minutes. The admin asks what change would help most. What do you recommend?",
    "Move the VM files to a new volume formatted ReFS. Block cloning speeds checkpoint merges, and sparse valid data length makes fixed VHDX creation nearly instant. The volume cannot be converted in place, so create the ReFS volume and migrate the VMs."
   ]
  ],
  "tip": "Know what NTFS has that ReFS doesn't (boot, compression, EFS, disk quotas), and never pick dedup for the system volume. Thin provisioning can run out of real space, so it needs monitoring.",
  "check": [
   [
    "Which resiliency type gives the best capacity efficiency with protection, and what is its downside?",
    "Parity; it uses capacity efficiently but has slower random writes, so it suits archival or sequential workloads."
   ],
   [
    "Why is ReFS recommended for Hyper-V VHDX storage?",
    "Block cloning makes checkpoint merges fast, sparse valid data length makes fixed VHDX creation fast, and checksums with automatic repair protect large volumes."
   ],
   [
    "Which deduplication usage type fits a volume storing virtual desktop VHDX files?",
    "HyperV, the usage type designed for VDI workloads."
   ],
   [
    "How many disks does a three-way mirror need on a single server, and how many failures can it survive?",
    "At least five disks, and it survives two disk failures."
   ]
  ]
 },
 {
  "t": "Failover clustering: validation, cluster networks, quorum models and witnesses (disk, file share, cloud), Cluster-Aware Updating",
  "hook": "It is 2:10 a.m. at Riverbend Medical Center when Sam, the on-call engineer, gets paged: the network link between the two server rooms has dropped. The patient records system runs on a two-node Hyper-V cluster, one node in each room. Sam's first fear is the nightmare scenario where both nodes decide they are in charge and both write to the same virtual disks. His second fear is the opposite, where both nodes politely shut everything down. Which node should keep running the virtual machines, and what decides it? And next Tuesday, how do you patch both nodes without a maintenance window?",
  "simple": "A failover cluster is a team of servers that watch each other. If one server breaks, another one takes over its jobs, such as running a virtual machine or a file share, usually within moments. Before building the team, you run a checkup called validation to make sure the servers and their connections are set up correctly. To avoid confusion when the team gets split, the cluster holds a vote, and only the side with more than half the votes keeps working. A witness is an extra tie-breaking voter, such as a small disk, a shared folder or a file in Azure. Cluster-Aware Updating patches the servers one at a time, like a restaurant changing one table's tablecloth while the others keep serving.",
  "body": [
   "A failover cluster is a group of Windows Servers, called nodes, that together keep clustered roles running. Roles can be a file server, Hyper-V virtual machines, SQL Server instances or other cluster-aware applications. The nodes constantly exchange heartbeats; if a node stops responding, the cluster restarts its roles on a surviving node. Clustering handles hardware failures, operating system crashes and planned maintenance, such as draining a node to patch it. It is not a backup and does not protect against data corruption or accidental deletion, because every node sees the same data.",
   "Before creating a cluster you run validation, either with the Validate a Configuration wizard in Failover Cluster Manager or with `Test-Cluster -Node N1,N2`. Validation runs groups of tests on inventory, network, storage and system configuration, such as whether nodes have matching updates, whether each node can see the shared disks and whether there are redundant network paths, and produces an HTML report. Microsoft supports a cluster only if its configuration passes validation, and you should rerun it after significant changes such as adding a node or new storage. Warnings, such as a single network path between nodes, deserve attention; failures must be fixed before you continue.",
   "You then create the cluster with `New-Cluster -Name CLU1 -Node N1,N2 -StaticAddress 10.0.0.50`. This creates a cluster name object (CNO), a computer account in Active Directory that represents the cluster itself, and a cluster IP address. Clustered roles you add later get their own virtual computer objects, which the CNO creates on their behalf, so the CNO needs permission to create computer objects in its organizational unit. Missing permissions there are a common reason a new clustered role fails to come online.",
   "Cluster networks are the networks the cluster detects on node adapters, one per subnet. Each gets a role. Cluster communication only carries heartbeats and internal traffic such as Cluster Shared Volume redirection. Cluster and client also carries client traffic and is used for the cluster's and roles' IP addresses. None means the cluster ignores the network completely, which is typical for iSCSI (Internet Small Computer Systems Interface) storage networks you want kept clean. Having at least two networks between nodes avoids a single point of failure for heartbeats, and live migration can be given preferred networks so it does not saturate client traffic. View and set roles with `Get-ClusterNetwork` and the Role property.",
   "Quorum is how a cluster avoids split brain, where two halves both think they are in charge and corrupt shared data. Each node gets a vote, and a witness can add one more. The cluster keeps running only while more than half of the total votes can communicate; the minority side stops its roles. The models you should know are node majority (no witness, best with an odd number of nodes), node and disk majority, node and file share majority, and node majority with a cloud witness. In a two-node cluster without a witness, losing either node or the link leaves one vote of two, which is not more than half, so a witness is essential.",
   "Windows Server also manages votes dynamically. Dynamic quorum adjusts votes as nodes leave in an orderly way, so in sequential failures the cluster can survive down to the last node standing. Dynamic witness gives the witness a vote only when that makes the total number of votes odd, and removes it when it would make the total even. Because the cluster tunes this itself, Microsoft's guidance is simple: always configure a witness, and let the cluster decide when to count it.",
   "Witness types differ in where they live and what they store. A disk witness is a small shared clustered disk that also stores a copy of the cluster database, so it requires shared storage that all nodes can see. A file share witness is a Server Message Block (SMB) share on another server, ideally in a third location; it stores no cluster database, just a small log of which node has the latest copy, and suits multi-site clusters or clusters without shared disks. A cloud witness uses a blob in an Azure Storage account as the tie-breaker. It needs only outbound HTTPS (TCP port 443) from the nodes and is ideal when you lack a third site. Configure it with `Set-ClusterQuorum -CloudWitness -AccountName <name> -AccessKey <key>`, or with `Set-ClusterQuorum -FileShareWitness \\\\FS3\\Witness` and `Set-ClusterQuorum -DiskWitness \"Cluster Disk 1\"` for the others.",
   "Cluster-Aware Updating (CAU) patches nodes one at a time without taking clustered services offline. For each node in turn, it drains the roles to other nodes, installs updates, restarts the node if needed, brings roles back and moves on. In self-updating mode, a CAU clustered role runs on the cluster itself and performs updating runs on a schedule you set. In remote-updating mode, you trigger an updating run on demand from a separate computer that has the CAU tools, which suits teams that want a person watching each run. Before enabling CAU, make sure the cluster can tolerate one node being down, both in capacity and in quorum, and review the updating run reports afterward."
  ],
  "analogy": "Quorum is like a committee that can only make decisions with more than half its members present. If the committee splits into two rooms that cannot talk, only the room with the majority may vote, so you never get two conflicting decisions. With two members, a split always leaves a tie, so you invite a neutral tie-breaker, the witness, who sits somewhere both rooms can phone. A cloud witness is that tie-breaker sitting in a third city reachable by phone from both rooms.",
  "mnemonic": "Witness types: Disk is Database, File and Cloud are just votes. Only the disk witness holds a copy of the cluster database.",
  "terms": [
   [
    "Validation",
    "The Test-Cluster checks of hardware and configuration; a passing report is required for a supported cluster."
   ],
   [
    "Cluster name object",
    "The AD computer account created for the cluster, which also creates computer objects for clustered roles."
   ],
   [
    "Quorum",
    "The majority of votes (nodes plus witness) a cluster needs to stay running, preventing split brain."
   ],
   [
    "Disk witness",
    "A small shared clustered disk that holds a vote and a copy of the cluster database."
   ],
   [
    "File share witness",
    "An SMB share on another server that holds a vote and a small log but no cluster database."
   ],
   [
    "Cloud witness",
    "An Azure Storage blob used as the quorum tie-breaker, needing only a storage account and outbound HTTPS."
   ],
   [
    "Cluster-Aware Updating",
    "A feature that updates cluster nodes one at a time while roles move, in self-updating or remote-updating mode."
   ]
  ],
  "example": "A two-node Hyper-V cluster spans two server rooms with no third site. Using a disk witness would put the tie-breaker in one room, so the admin configures a cloud witness. When the network link between rooms fails, the node that can still reach the Azure storage account keeps quorum and runs the VMs, while the other stops its roles.",
  "mistakes": [
   [
    "Thinking a failover cluster replaces backups.",
    "All nodes share the same data, so corruption or deletion affects every node. Clustering provides availability, not recovery of lost data."
   ],
   [
    "Picking a disk witness for a multi-site cluster with no shared storage between sites.",
    "A disk witness requires shared storage seen by all nodes. Use a file share witness in a third site or a cloud witness."
   ],
   [
    "Believing the file share or cloud witness stores the cluster database.",
    "Only the disk witness keeps a copy of the cluster database; file share and cloud witnesses hold just a vote and minimal data."
   ],
   [
    "Setting an iSCSI storage network to Cluster and client.",
    "Storage networks are usually set to None so the cluster does not send heartbeats or client traffic over them."
   ]
  ],
  "tryit": [
   [
    "Elm Street Credit Union runs a four-node cluster split two and two between headquarters and a disaster recovery site. They have no third site but do have an Azure subscription and outbound internet access from both sites. A link failure between sites must not stop both halves. What quorum configuration do you choose?",
    "Node majority with a cloud witness. Four nodes plus the cloud witness give five votes, so whichever site can still reach Azure keeps three votes and stays online, while the other side stops its roles to avoid split brain."
   ],
   [
    "A small team wants cluster patching to run every second Saturday at 3 a.m. without anyone logging on, and they do not have a spare management server. Which CAU mode fits, and what must they check first?",
    "Self-updating mode, which adds a CAU clustered role that runs updating runs on a schedule from the cluster itself. First confirm the cluster can run all roles with one node down and that quorum holds during each node's restart."
   ]
  ],
  "tip": "Two-node or even-node clusters need a witness. No shared storage or multi-site means file share or cloud witness; only the disk witness stores the cluster database. CAU self-updating runs on the cluster, remote-updating from another machine.",
  "check": [
   [
    "Why is a witness important in a two-node cluster?",
    "With two votes, losing one node or the link leaves exactly half, which isn't a majority; the witness provides the tie-breaking third vote."
   ],
   [
    "Which witness type stores a copy of the cluster database?",
    "The disk witness. File share and cloud witnesses store no copy of the cluster database."
   ],
   [
    "What is the difference between CAU self-updating and remote-updating mode?",
    "Self-updating adds a CAU clustered role that updates the cluster on a schedule by itself; remote-updating is started on demand from a separate management computer."
   ],
   [
    "What must a cluster configuration pass to be supported by Microsoft?",
    "Cluster validation (the Validate a Configuration wizard or Test-Cluster)."
   ]
  ]
 },
 {
  "t": "Storage Spaces Direct: minimum nodes, cache, resiliency; Scale-Out File Server for application data",
  "hook": "Granite Peak Manufacturing's storage area network is out of support, and the renewal quote made the CFO wince. Your infrastructure lead, Lena, has a proposal on the whiteboard: four servers full of local NVMe and SSD drives, clustered, running both the virtual machines and the storage. The CFO has questions. Is two servers enough to start? What happens to the fast drives, do we pay for capacity we cannot use? If one server dies during month-end close, do the ERP database VMs keep running? And the file server team wants to know whether they can put everyone's home drives on the same thing. Lena hands you the marker.",
  "simple": "Storage Spaces Direct lets a group of clustered servers pool the drives inside each of them into one shared, protected storage system, with no expensive separate storage box. Data is copied across servers, so if one server goes down, the others still have the data. The fastest drives in each server are used as a cache, a quick-access holding area that speeds up the slower drives, a bit like a desk where you keep today's papers before filing them in the cabinet. A Scale-Out File Server shares that storage over the network for applications, such as virtual machine disks and databases, and stays online even when a server fails. It is built for a few big, always-open files, not thousands of small office documents.",
  "body": [
   "Storage Spaces Direct (S2D) builds highly available storage from the local drives inside each failover cluster node, with no shared SAN (storage area network) or external JBOD (just a bunch of disks) enclosure. The nodes pool their drives over the network, usually with RDMA (remote direct memory access) network adapters for low latency and low CPU use, and present Cluster Shared Volumes (CSVs) that every node can read and write at the same time. S2D is a Windows Server Datacenter edition feature, so a scenario that specifies Standard edition cannot use it.",
   "An S2D cluster needs at least two nodes and supports up to sixteen. Each node needs a supported set of local drives in addition to the boot drive, and all servers should be similar in drive types, counts and network adapters. The hardware should come from validated solutions, because S2D depends on drives and adapters behaving predictably. You enable it after creating and validating the cluster with `Enable-ClusterStorageSpacesDirect`, which claims all eligible drives into one storage pool automatically and configures the cache. Validation for S2D includes extra storage tests, which you can run with `Test-Cluster -Include \"Storage Spaces Direct\",Inventory,Network,\"System Configuration\"`.",
   "S2D can be deployed in two models. In the hyper-converged model, the same nodes run Hyper-V virtual machines and provide the storage, which reduces the number of servers and is common for smaller and branch deployments. In the converged, also called disaggregated, model, the S2D cluster serves storage over Server Message Block (SMB) through a Scale-Out File Server to separate compute hosts, so you can scale storage and compute independently. Exam questions often describe the need to grow compute without buying storage, or the reverse, as the clue for the converged model.",
   "The cache is built automatically from the fastest drive type present. With NVMe (Non-Volatile Memory Express) plus SSD, or SSD plus HDD, the faster drives become cache and the slower ones capacity; each cache drive is bound to a set of capacity drives, and bindings are rebalanced if drives are added or fail. For hybrid systems with HDD capacity, the cache handles both reads and writes, because spinning disks are slow at random reads too. When capacity is SSD, the cache handles writes only, because reading from SSD is already fast and caching writes protects the endurance of the capacity drives. A system with only one drive type, such as all NVMe, can run with no cache. Cache drives do not add usable capacity, which is an important sizing point when someone adds up raw terabytes.",
   "Resiliency is decided when you create each volume, so one cluster can mix volume types. A two-way mirror keeps two copies of data on different servers, gives 50 percent capacity efficiency and needs at least two nodes. A three-way mirror keeps three copies, tolerates two simultaneous failures of drives or servers, gives about 33 percent efficiency and needs at least three nodes; it is the recommended choice for performance-sensitive workloads such as databases and busy VMs. Dual parity, which is similar in idea to RAID 6, needs at least four nodes and gives better efficiency that improves as you add nodes, at the cost of slower writes. Mirror-accelerated parity combines a mirror tier that absorbs writes with a parity tier for capacity, a middle ground for mixed workloads such as backup targets.",
   "Two-node clusters have a special option. With only two copies, a two-way mirror cannot survive a drive failure on one node while the other node is down for patching. Nested resiliency keeps extra copies inside each node, either as a nested two-way mirror or nested mirror-accelerated parity, so a two-node cluster can survive a node failure and a drive failure at the same time, at a lower capacity efficiency. Create volumes with `New-Volume -FriendlyName VM01 -FileSystem CSVFS_ReFS -StoragePoolFriendlyName S2D* -Size 2TB`, adding `-ResiliencySettingName` or a storage tier to choose mirror or parity. Volumes on S2D normally use ReFS for its integrity checks and fast VHDX operations.",
   "Scale-Out File Server (SOFS) is a clustered file server role designed for application data such as Hyper-V VHDX files and SQL Server databases. Its shares live on CSVs and are active on all nodes simultaneously, so clients connect to any node and both capacity and bandwidth scale out as you add nodes. SOFS shares use continuous availability, so SMB transparent failover keeps open file handles alive when a node fails and the application simply pauses briefly instead of crashing. SOFS also works with SMB Multichannel and SMB Direct over RDMA for high throughput. It is paired with S2D in the converged model, but it can also sit on traditional shared storage.",
   "SOFS is not recommended for general user file shares. Office documents and home drives create many metadata operations, such as opening, closing, renaming and listing small files, and the continuous availability machinery adds overhead to each of those. For user shares on a cluster, use the File Server for general use role, which runs active on one node at a time and supports features such as DFS Replication and File Server Resource Manager that SOFS shares do not. When exam questions describe VM or database files on SMB with no downtime during node failure, think SOFS; when they describe user home drives and departmental shares on a cluster, think File Server for general use."
  ],
  "analogy": "An S2D cluster is like a group of neighbors who each keep part of a shared library on their own shelves, with every important book copied onto two or three different neighbors' shelves. If one house loses power, the book is still available next door. Each neighbor's small desk, the cache, holds today's books for quick access. SOFS is the librarian who lends long reference volumes to a few researchers at once, not the busy front desk handling hundreds of quick returns.",
  "mnemonic": "Minimum nodes count up two, three, four: two-way mirror needs 2, three-way mirror needs 3, dual parity needs 4.",
  "terms": [
   [
    "Storage Spaces Direct",
    "Software-defined storage that pools local drives across 2 to 16 cluster nodes into highly available volumes."
   ],
   [
    "Cache tier",
    "The fastest drives in an S2D node, automatically used to cache writes (and reads too when capacity drives are HDDs) for the slower capacity drives."
   ],
   [
    "Cluster Shared Volume",
    "A clustered volume that all nodes can read and write at the same time, used by Hyper-V and SOFS."
   ],
   [
    "Hyper-converged vs converged",
    "Hyper-converged runs compute and S2D storage on the same nodes; converged serves S2D storage to separate compute hosts through SOFS."
   ],
   [
    "Nested resiliency",
    "A two-node S2D option that survives a node failure and a drive failure simultaneously."
   ],
   [
    "Scale-Out File Server",
    "An active-active clustered file server role on CSVs for application data, using continuously available SMB shares."
   ]
  ],
  "example": "A company builds a four-node hyper-converged S2D cluster with NVMe cache and SSD capacity. Critical SQL VMs go on a three-way mirror volume; a large archive volume uses dual parity. Later, a separate compute cluster is attached through a Scale-Out File Server so its Hyper-V hosts store VHDX files on continuously available shares.",
  "mistakes": [
   [
    "Counting cache drives toward usable capacity.",
    "Cache drives only accelerate the capacity drives; they add no usable space."
   ],
   [
    "Choosing dual parity on a three-node cluster.",
    "Dual parity needs at least four nodes. Three nodes support up to a three-way mirror."
   ],
   [
    "Placing user home folders on a Scale-Out File Server for high availability.",
    "SOFS is optimized for large, long-open application files. Use the File Server for general use role for user shares."
   ],
   [
    "Expecting the cache to handle reads when capacity drives are SSDs.",
    "With SSD capacity the cache handles writes only; it caches reads too only when capacity drives are HDDs."
   ]
  ],
  "tryit": [
   [
    "Juniper Clinics has two branch servers to run a handful of VMs on S2D. The branch admin worries that during monthly patching, while one node is rebooting, a drive failure on the other node could take the VMs down. What resiliency option addresses this?",
    "Nested resiliency (for example a nested two-way mirror). It keeps extra copies within each node so the two-node cluster survives a node being down and a drive failure on the remaining node at the same time, trading some capacity efficiency."
   ],
   [
    "A data center team runs out of CPU on its hyper-converged cluster long before it runs out of storage, and keeps buying servers with drives it does not need. What deployment change would let it scale compute separately, and which role connects the two?",
    "Move to the converged (disaggregated) model: keep the S2D cluster for storage and add separate Hyper-V compute hosts that store VHDX files on Scale-Out File Server shares over SMB, so compute and storage scale independently."
   ]
  ],
  "tip": "Minimums: 2 nodes for S2D and two-way mirror, 3 for three-way mirror, 4 for dual parity. SOFS is for application data, never the default answer for user home folders.",
  "check": [
   [
    "What is the minimum number of nodes for a three-way mirror volume in S2D?",
    "Three nodes."
   ],
   [
    "In an S2D node with NVMe and HDD drives, which drives become the cache?",
    "The NVMe drives, because S2D automatically uses the fastest drive type as cache for the slower capacity drives."
   ],
   [
    "Why isn't Scale-Out File Server recommended for user home folders?",
    "User workloads generate many metadata operations on small files, which SOFS handles poorly; it is optimized for large, long-open application files like VHDX and databases."
   ],
   [
    "Which Windows Server edition is required for Storage Spaces Direct?",
    "Datacenter edition."
   ]
  ]
 },
 {
  "t": "Storage Replica: synchronous vs asynchronous, server-to-server and stretch cluster; guest clustering with shared VHDX",
  "hook": "Silverlake Regional Hospital has two data centers twelve kilometers apart and a records archive in another state. During the annual disaster recovery review, the compliance officer, Rosa, asks a pointed question: if the primary data center lost power at 10:42:17, how many patient record updates would be gone? The application team has a second worry. Their scheduling app runs in a single VM, so every guest OS patch means downtime, even though the Hyper-V hosts underneath are clustered. You need answers for both: how to copy volumes between sites with a known data loss, and how to make an application itself survive a VM going down.",
  "simple": "Storage Replica copies a whole disk volume from one server to another, piece by piece, so a second site has a ready copy if the first site fails. In synchronous mode, every change is saved in both places before the app is told it is done, so nothing is lost, but the two sites must be close and connected by a fast link. In asynchronous mode, the change is saved locally first and sent shortly after, so the sites can be far apart, but the newest few changes could be lost in a disaster. A stretch cluster is one cluster split across two buildings that can fail over on its own. Guest clustering builds a cluster out of virtual machines that share one virtual disk, so an app survives one VM failing.",
  "body": [
   "Storage Replica is a Windows Server feature that replicates volumes at the block level to another server or cluster, mainly for disaster recovery. Because it works below the file system, it replicates every changed block on the volume, including blocks belonging to open files, and it is unaware of which application wrote them. That makes it application-agnostic: a SQL database, a file share or VM files are all just blocks. Storage Replica uses SMB 3 (Server Message Block version 3) as its transport, so it benefits from features such as SMB Multichannel and, where available, SMB Direct.",
   "Each replicated data volume needs a matching log volume on both sides; writes go to the log first and then to the data volume. Logs should sit on fast storage, such as SSD or NVMe, because every write passes through them. The source and destination data partitions must be the same size, and the destination volume is dismounted and not accessible to users or applications while it is a replication target; you cannot read the copy at the same time as replicating to it. Before configuring anything, run `Test-SRTopology` against the proposed source and destination for a period that includes normal workload. It measures network bandwidth and latency and disk performance, then produces an HTML report on whether your link and disks can keep up with the change rate.",
   "You create a partnership with `New-SRPartnership`, naming the source and destination computers, the replication group names on each side, and the data and log volumes, for example `New-SRPartnership -SourceComputerName SR-SRV01 -SourceRGName RG01 -SourceVolumeName D: -SourceLogVolumeName L: -DestinationComputerName SR-SRV02 -DestinationRGName RG02 -DestinationVolumeName D: -DestinationLogVolumeName L:`. Initial synchronization then copies the whole volume, after which only changes flow. Check status with `Get-SRGroup` and `Get-SRPartnership`, and watch the Storage Replica event logs for progress.",
   "Storage Replica runs in two modes, and the difference is all about when the application hears that a write is done. In synchronous mode, a write is acknowledged to the application only after it has been written to the log on both the source and the destination. This gives a recovery point objective (RPO), the amount of data you can lose measured in time, of zero: no committed write is lost if the source fails. The price is that every write waits for the network round trip, so synchronous replication needs a fast, low-latency link, typically a metropolitan distance with a round trip of a few milliseconds. On a slow or distant link, applications would feel every write slow down.",
   "In asynchronous mode, the write is acknowledged as soon as it hits the source log, and the data is sent to the destination afterward. Applications run at local speed, and the link can have higher latency and span longer distances, even across a country. The tradeoff is that the RPO is not zero; if the source fails, writes that were acknowledged but not yet transmitted are lost. Exam questions usually give you a distance or latency and a tolerance for data loss, and you match zero data loss with synchronous and long distance with asynchronous.",
   "There are three scenarios. Server-to-server replicates between two standalone servers, each with its own storage. Cluster-to-cluster replicates between two separate failover clusters, often in different sites. A stretch cluster is one failover cluster whose nodes are split across two sites, each site with its own storage, and Storage Replica keeps the two sets of storage in sync so the cluster can fail over automatically between sites. Stretch clusters are the only scenario with automatic failover; for server-to-server and cluster-to-cluster you switch direction manually, for example with `Set-SRPartnership`, making the destination the new source. Windows Server Standard edition includes Storage Replica with limits on the number and size of replicated volumes, while Datacenter edition has no such limits.",
   "Guest clustering is a different high availability idea. Instead of clustering the Hyper-V hosts, you build a failover cluster from virtual machines, so an application is protected even if a VM's guest operating system crashes or needs patching. Host clustering alone restarts a failed VM on another host, but it cannot keep the application running while the guest OS reboots. Guest clusters need shared storage, and on Hyper-V the preferred way is a shared virtual hard disk using the VHD Set format, a `.vhds` file. You attach it to each guest VM on a SCSI (Small Computer System Interface) controller with virtual hard disk sharing enabled, and the guests see it as a shared disk they can cluster.",
   "The VHD Set must live on a Cluster Shared Volume or a Scale-Out File Server share, so that every host running one of the guest nodes can access it. Compared with the older shared `.vhdx` approach, VHD Sets support online resizing, host-level backup and Hyper-V Replica, which is why they are the recommended format. Alternatives for guest shared storage are in-guest iSCSI (Internet Small Computer Systems Interface), where the VMs connect directly to an iSCSI target, and virtual Fibre Channel, where VMs get virtual host bus adapters connected to a Fibre Channel SAN. You can combine these ideas too: a guest cluster on hosts whose storage is itself replicated with Storage Replica."
  ],
  "analogy": "Synchronous replication is like two accountants who must both write each entry in their ledgers before the cashier hands over the receipt; nothing is ever missing from either ledger, but the accountants have to sit close together or every sale crawls. Asynchronous replication is like faxing the day's entries to a remote office every few moments; sales are fast, but if the shop burns down, the last few entries never reached the fax. The analogy stops at the data level: Storage Replica copies disk blocks, not individual transactions.",
  "terms": [
   [
    "Storage Replica",
    "Block-level volume replication over SMB 3 between servers or clusters, requiring data and log volumes on both sides."
   ],
   [
    "Synchronous replication",
    "Writes are acknowledged only after reaching both sites, giving zero RPO but requiring low latency."
   ],
   [
    "Asynchronous replication",
    "Writes are acknowledged at the source and sent later, allowing long distances with a non-zero RPO."
   ],
   [
    "Recovery point objective",
    "The maximum amount of data, measured in time, that an organization can accept losing in a failure."
   ],
   [
    "Stretch cluster",
    "One failover cluster split across two sites with replicated storage, supporting automatic failover between sites."
   ],
   [
    "VHD Set",
    "The .vhds shared virtual disk format for guest clusters, stored on CSV or SOFS and supporting online resize and host backup."
   ]
  ],
  "example": "A hospital with two datacenters 10 km apart builds a stretch cluster with Storage Replica in synchronous mode so no patient record write is lost. It also replicates to a third site 800 km away using a separate cluster-to-cluster partnership in asynchronous mode, accepting a few seconds of possible data loss for regional disasters.",
  "mistakes": [
   [
    "Choosing synchronous replication between sites hundreds of kilometers apart.",
    "Every write would wait for the long round trip, hurting application performance. Use asynchronous replication over long distances and accept a non-zero RPO."
   ],
   [
    "Expecting users to read reports from the destination volume while it replicates.",
    "The destination volume is dismounted while it is a replication target. You need to fail over, or use a different technology, to read it."
   ],
   [
    "Assuming server-to-server Storage Replica fails over automatically.",
    "Only a stretch cluster provides automatic failover. Server-to-server and cluster-to-cluster require you to reverse replication manually, for example with Set-SRPartnership."
   ],
   [
    "Storing a VHD Set for a guest cluster on a host's local disk.",
    "The VHD Set must be on a Cluster Shared Volume or a Scale-Out File Server share so all hosts running guest nodes can reach it."
   ]
  ],
  "tryit": [
   [
    "Copperfield Insurance wants a second copy of its claims file server volume in a data center 1,200 km away. The business accepts losing up to a minute of changes in a regional disaster, but users must not notice any slowdown. The servers are standalone. Which Storage Replica scenario and mode fit?",
    "Server-to-server Storage Replica in asynchronous mode. Asynchronous acknowledges writes locally so users see no added latency across the long link, and the non-zero RPO fits the one-minute tolerance. Failover will be manual."
   ],
   [
    "An application team needs its two-VM app to stay available while each guest OS is patched. The Hyper-V hosts are clustered with a CSV. They ask how to give both VMs a shared disk with support for host-level backup. What do you recommend?",
    "Build a guest cluster and use a shared VHD Set (.vhds) stored on the CSV, attached to both VMs on a SCSI controller with sharing enabled. VHD Sets support host-level backup and online resize, unlike the older shared .vhdx."
   ]
  ],
  "tip": "Zero data loss equals synchronous and short distance; long distance equals asynchronous. Automatic failover only in a stretch cluster. Shared VHDX for guest clusters goes on CSV or SOFS, attached via SCSI.",
  "check": [
   [
    "What is the RPO of synchronous Storage Replica and why?",
    "Zero, because the application gets an acknowledgment only after the write is logged on both source and destination."
   ],
   [
    "Can users read the destination volume while Storage Replica is replicating to it?",
    "No, the destination volume is dismounted and inaccessible while it is a replication target."
   ],
   [
    "Where must a VHD Set used for a Hyper-V guest cluster be stored?",
    "On a Cluster Shared Volume or on a Scale-Out File Server SMB share."
   ],
   [
    "Which cmdlet should you run before configuring Storage Replica to see whether your network and disks can keep up?",
    "Test-SRTopology."
   ]
  ]
 },
 {
  "t": "Security baselines: OSConfig on Windows Server 2025, Microsoft Security Compliance Toolkit baselines, drift control",
  "hook": "The external auditor at Oakhaven Mutual sets down her coffee and turns her laptop toward you. Forty Windows Servers, she says, and I can find six different password policies and three servers where someone turned off a hardening setting last spring and never turned it back on. Can you show me the standard these servers are supposed to meet, prove they meet it today, and tell me what stops them from drifting again next month? Half the servers are domain-joined, a few are in a workgroup in the lab, and the newest ones run Windows Server 2025. What do you show her?",
  "simple": "A security baseline is a ready-made list of safe settings that Microsoft recommends for a computer, such as how strong passwords must be, which old protocols to turn off and what to record in the logs. Applying a baseline is like following a trusted checklist when you set up a new house: lock these doors, turn on these alarms. The Security Compliance Toolkit gives you those checklists as files you can load into Group Policy, plus tools to compare your settings with Microsoft's. OSConfig, built into Windows Server 2025, applies the checklist with one command and then keeps checking it. If someone changes a setting, OSConfig quietly puts it back, which is called drift control.",
  "body": [
   "A security baseline is a group of recommended configuration settings, such as password and account lockout rules, audit policy, user rights assignments, service startup types and protocol hardening, that Microsoft has tested to balance security with compatibility. Applying a baseline gives every server a known, hardened starting point instead of whatever each admin happened to click. Checking servers against the same baseline later shows exactly where they have drifted. For this exam you need to know two ways to apply Microsoft baselines: the Security Compliance Toolkit, which works through Group Policy, and OSConfig, which is new in Windows Server 2025.",
   "The Microsoft Security Compliance Toolkit (SCT) is a free download containing baselines for Windows Server, Windows client, Microsoft Edge, Microsoft 365 Apps and other products. Each baseline package includes Group Policy object (GPO) backups, documentation spreadsheets listing every setting and its recommended value, and scripts that install the baseline into local policy on a test machine. The GPO backups are usually split by role, for example separate GPOs for member servers and domain controllers, plus supporting GPOs such as one for Microsoft Defender Antivirus settings.",
   "The toolkit also includes two important tools. Policy Analyzer compares sets of GPOs, and the local effective policy of a machine, against a baseline, and highlights settings that conflict or differ, which is how you find out where your existing policies already deviate from Microsoft's recommendations. LGPO.exe is a command-line tool that imports settings into the local Group Policy of a machine, which is how you apply a baseline to non-domain servers, and it can also export local policy for review. In a domain, you import the baseline GPO backups into new GPOs with the Group Policy Management Console (or `Import-GPO`) and link them to the organizational units (OUs) holding your member servers and domain controllers, usually after testing on a pilot OU.",
   "OSConfig is a security configuration platform built into Windows Server 2025 and managed with the Microsoft.OSConfig PowerShell module, which you install from the PowerShell Gallery with `Install-Module -Name Microsoft.OSConfig`. It ships baseline scenarios matched to the server's role: domain controller, member server and workgroup member, plus scenarios such as Secured-core. You apply one with a single command, for example `Set-OSConfigDesiredConfiguration -Scenario SecurityBaseline/WS2025/MemberServer -Default`, and a restart may be needed for some settings to take effect. Picking the wrong role scenario is a real mistake: domain controller settings on a member server, or the reverse, can break authentication or management.",
   "Checking compliance is just as simple. `Get-OSConfigDesiredConfiguration -Scenario SecurityBaseline/WS2025/MemberServer` returns each setting in the scenario, its desired value and whether the server is compliant, which you can filter or export as evidence for an auditor. The same baselines can be applied and reported at scale to Azure Arc-enabled servers through Azure machine configuration and Azure Policy, so on-premises and hybrid servers show their compliance in the Azure portal. Windows Admin Center can also show the security baseline status of a server.",
   "Drift control is what makes OSConfig more than a one-time script. Once a baseline is applied, OSConfig periodically checks the managed settings and automatically returns any that have changed to the desired value. That means an admin who weakens a setting locally while troubleshooting, or a tool or installer that changes it, does not leave the server permanently out of compliance. You can customize individual settings, for example to allow a legacy protocol that a line-of-business app genuinely needs, and the customized value becomes your desired value, so drift control protects your exception too. To stop managing a scenario, remove it with `Remove-OSConfigDesiredConfiguration` for that scenario.",
   "Group Policy offers a partial version of the same idea, because domain GPOs reapply on a background refresh cycle, but it only covers domain-joined machines and only settings delivered by GPOs. Local policy applied with LGPO.exe has no refresh source at all, so a local change simply sticks until someone reapplies the baseline. That difference is why the exam pairs OSConfig with the phrase drift control.",
   "Choosing between them comes down to the version, the management model and whether you need built-in remediation. Group Policy with SCT baselines suits domain environments with existing GPO management and older Windows Server versions such as 2019 and 2022, and Policy Analyzer helps you audit them. OSConfig suits Windows Server 2025, including non-domain servers and hybrid servers managed through Azure Arc, and adds drift remediation out of the box. Avoid managing the same setting with both a GPO and OSConfig, since competing tools that keep reverting each other make troubleshooting confusing; pick one owner per setting.",
   "Before applying any baseline in production, test it on a lab or pilot server that runs the real workload. Baselines disable older protocols, tighten user rights and change authentication behavior, which can break line-of-business applications, backup agents or monitoring tools. Document every exception you make and why, so the next auditor sees a deliberate decision rather than drift."
  ],
  "analogy": "Applying an SCT baseline through local policy is like a landlord handing a tenant a list of house rules once. OSConfig with drift control is like a smart thermostat set to 68 degrees: anyone can nudge it, but it quietly returns to the set point on its next check. The analogy has a limit for the exam: you can deliberately change the set point, a customized setting, and drift control will then defend your new value rather than Microsoft's default.",
  "terms": [
   [
    "Security baseline",
    "A Microsoft-recommended set of security configuration settings for a product and role."
   ],
   [
    "Security Compliance Toolkit",
    "A free set of baselines as GPO backups plus tools such as Policy Analyzer and LGPO.exe."
   ],
   [
    "OSConfig",
    "A Windows Server 2025 security configuration platform, managed with PowerShell, that applies role-based baselines."
   ],
   [
    "Drift control",
    "OSConfig's periodic check that automatically resets changed baseline settings to their desired values."
   ],
   [
    "Policy Analyzer",
    "An SCT tool that compares GPOs or local policy against baselines and flags differences and conflicts."
   ],
   [
    "LGPO.exe",
    "An SCT command-line tool that imports or exports local Group Policy, used to apply baselines to non-domain machines."
   ]
  ],
  "example": "A team deploying new Windows Server 2025 member servers applies the OSConfig MemberServer baseline during build. Weeks later a technician disables a hardening setting while troubleshooting and forgets to revert it; drift control resets it at the next check, and the compliance report stays clean.",
  "mistakes": [
   [
    "Applying the OSConfig member server scenario to a domain controller because it is a server.",
    "Scenarios are role-specific. Use the DomainController scenario on DCs, MemberServer on domain members and WorkgroupMember on non-domain servers."
   ],
   [
    "Expecting OSConfig to be available on Windows Server 2019 or 2022.",
    "OSConfig security baselines target Windows Server 2025. For older versions, use SCT baselines through Group Policy or LGPO.exe."
   ],
   [
    "Using Policy Analyzer to apply a baseline.",
    "Policy Analyzer compares and reports differences. To apply, import the GPO backups or use LGPO.exe."
   ],
   [
    "Managing the same setting with both a GPO and OSConfig.",
    "The two tools can keep reverting each other, which makes troubleshooting confusing. Choose one tool to own each setting."
   ]
  ],
  "tryit": [
   [
    "Fernwood Labs has ten Windows Server 2025 machines in a workgroup that are not managed by Group Policy. The security team wants Microsoft's baseline on them and wants any local changes automatically reversed. What do you use, and which scenario?",
    "Install the Microsoft.OSConfig module and apply the SecurityBaseline/WS2025/WorkgroupMember scenario with Set-OSConfigDesiredConfiguration. Drift control will automatically revert changed settings, and Get-OSConfigDesiredConfiguration provides compliance evidence."
   ],
   [
    "A company has years of accumulated GPOs on Windows Server 2022 domain members. Before deploying the Microsoft baseline, the security lead wants to know which current settings conflict with it. Which tool helps, and what is the next step?",
    "Use Policy Analyzer from the Security Compliance Toolkit to compare the existing GPOs with the baseline and list conflicts and differences. Then import the baseline GPO backups into new GPOs, resolve the conflicts, and link them to a pilot OU before wider rollout."
   ]
  ],
  "tip": "OSConfig is Windows Server 2025 with drift control; SCT is GPO backups plus Policy Analyzer and LGPO for any supported version. Choose the scenario matching the server's role (DC, member or workgroup).",
  "check": [
   [
    "What does drift control do in OSConfig?",
    "It periodically checks the applied baseline settings and automatically reverts any that were changed back to the desired values."
   ],
   [
    "Which SCT tool compares your current GPOs against a Microsoft baseline?",
    "Policy Analyzer."
   ],
   [
    "How would you apply a baseline to a non-domain Windows Server 2019 machine using the SCT?",
    "Use LGPO.exe (or the baseline's local install script) to import the baseline settings into local Group Policy."
   ],
   [
    "Which cmdlet shows whether a Windows Server 2025 machine complies with an applied OSConfig scenario?",
    "Get-OSConfigDesiredConfiguration with the scenario name."
   ]
  ]
 },
 {
  "t": "Credential Guard and virtualization-based security; LSA protection",
  "hook": "The incident report from Blue Heron Logistics lands in your inbox on a Thursday afternoon. An attacker phished a contractor, gained local administrator rights on one application server, and within an hour was signed in to a dozen other servers. No passwords were cracked. Instead, the investigators found that the attacker read credentials straight out of the memory of a Windows process and reused them. The CISO, Marcus, has one question for the server team: which protections would have left that attacker holding nothing useful, and can you turn them on everywhere, including the domain controllers?",
  "simple": "When you sign in to Windows, a background process called LSASS keeps your sign-in secrets in memory so you do not have to type your password again for every network resource. Attackers who become administrators try to copy those secrets from memory and reuse them on other computers. Credential Guard moves the most valuable secrets into a sealed-off area that even the rest of Windows cannot read, created with the help of the virtualization technology Hyper-V. LSA protection is a different shield: it marks LSASS as a protected process, so ordinary programs, even ones run by an administrator, cannot peek inside it. Picture a bank: LSA protection puts a guard at the vault door, and Credential Guard moves the gold to a separate, sealed vault.",
  "body": [
   "Attackers who get administrator rights on a server often dump credentials from the memory of the Local Security Authority Subsystem Service (LSASS), the process that handles sign-ins and holds credential material for logged-on users. They then reuse NT LAN Manager (NTLM) password hashes or Kerberos tickets to authenticate to other machines without ever knowing the plaintext password, techniques known as pass-the-hash and pass-the-ticket. This is how a single compromised server becomes many. Windows Server has two complementary defenses that protect LSASS: Credential Guard, which is built on virtualization-based security, and LSA protection.",
   "Virtualization-based security (VBS) uses the Hyper-V hypervisor to create an isolated region of memory, called Virtual Secure Mode (VSM), that even the normal Windows kernel cannot read or modify. The idea is that if malware gains kernel-level control of the normal operating system, it still cannot reach what runs inside VSM. Security-critical code runs there. Features built on VBS include Credential Guard and memory integrity, also called hypervisor-protected code integrity (HVCI), which checks that kernel-mode code is properly signed before it is allowed to run, making it much harder to load malicious drivers.",
   "VBS has platform requirements that appear on the exam. It needs a 64-bit CPU with virtualization extensions (Intel VT-x or AMD-V) and second-level address translation (SLAT), UEFI (Unified Extensible Firmware Interface) firmware with Secure Boot enabled, and ideally a TPM (Trusted Platform Module) to protect VBS keys. Virtual machines can use VBS too when nested virtualization and a virtual TPM are available, such as Generation 2 Hyper-V VMs. Check the status in `msinfo32` under the Virtualization-based security entries, which list whether VBS is running and which services, such as Credential Guard and HVCI, are configured and running.",
   "Credential Guard moves the secrets LSASS protects, such as NTLM password hashes and Kerberos ticket-granting tickets (TGTs), into an isolated process called LSAIso (LSA Isolated) that runs inside Virtual Secure Mode. LSASS still handles sign-ins and talks to LSAIso through remote procedure calls, but it never holds the raw secrets in its own memory. Tools that dump LSASS memory therefore get nothing reusable, which breaks the pass-the-hash chain described in the opening. When Credential Guard is running, you will see a process named LsaIso.exe in Task Manager alongside lsass.exe.",
   "You enable Credential Guard with Group Policy, under Computer Configuration, Administrative Templates, System, Device Guard, Turn On Virtualization Based Security, setting Credential Guard Configuration to enabled, or through registry settings and management tools such as Intune. You choose whether to enable it with UEFI lock, which stores the setting in firmware so it cannot be turned off remotely by changing the registry or policy, or without lock, which allows remote disabling later. UEFI lock is more secure but makes removal a manual, physical process.",
   "Credential Guard has limitations that the exam likes to test. It is not supported on domain controllers, because a DC must keep its secrets in the AD database and LSASS for authentication, and Credential Guard cannot protect that database; it provides no added protection there. When enabled, it blocks NTLMv1, unconstrained Kerberos delegation, DES encryption for Kerberos and saved credentials delegation for protected accounts, so older applications that depend on those can break and must be tested. It also does not stop keyloggers, phishing or attacks on credentials typed into other applications, and it does not protect local account password hashes stored in the SAM database the way it protects domain credentials.",
   "LSA protection takes a different approach. It runs LSASS itself as a Protected Process Light (PPL). Only code signed appropriately can then load into LSASS or open its memory, so non-protected processes, even running as administrator, cannot inject code or read its memory. You enable it by setting the registry value `RunAsPPL` under `HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa` (1 to enable with a UEFI variable lock, 2 to enable without it), or with Group Policy on newer versions, then restarting. Before enforcing, you can enable audit mode to find which LSA plug-ins and drivers would fail to load; related events appear in the CodeIntegrity log, so you can contact vendors or remove incompatible add-ons first.",
   "Unlike Credential Guard, LSA protection does not need VBS and can be used on domain controllers, which makes it the answer when a question asks how to harden LSASS on a DC. The two features stack well: LSA protection hardens the LSASS process against tampering and memory reading, and Credential Guard removes the most valuable secrets from LSASS altogether on member servers. Neither replaces good privileged access practices such as tiered administration, separate admin accounts and not logging on to ordinary servers with domain admin credentials, because a credential that is never present on a server cannot be stolen from it."
  ],
  "analogy": "Think of LSASS as a bank teller's drawer. LSA protection puts a guard beside the teller who refuses to let anyone without the right badge reach into the drawer, even a manager. Credential Guard goes further: the cash moves to a separate vault, LSAIso, and the teller only passes requests through a slot. A thief who gets past the guard finds an empty drawer. The analogy breaks at the domain controller, where the vault cannot be used, so only the guard (LSA protection) applies there.",
  "terms": [
   [
    "Virtualization-based security",
    "Hyper-V-backed isolation that creates a secure memory region the normal OS kernel cannot access."
   ],
   [
    "Credential Guard",
    "A VBS feature that stores NTLM hashes and Kerberos TGTs in the isolated LSAIso process to defeat credential dumping."
   ],
   [
    "LSAIso",
    "The isolated LSA process running in Virtual Secure Mode that holds protected secrets when Credential Guard is enabled."
   ],
   [
    "LSA protection",
    "Running LSASS as a Protected Process Light so unsigned or non-protected code cannot read its memory or inject into it."
   ],
   [
    "HVCI (memory integrity)",
    "A VBS feature that validates kernel-mode code integrity inside the secure environment before it runs."
   ],
   [
    "UEFI lock",
    "An option that stores a security setting in firmware so it cannot be disabled remotely through registry or policy changes."
   ]
  ],
  "example": "After a phishing incident, a security team enables Credential Guard on all member servers and LSA protection on all servers including domain controllers. In a later red team exercise, an attacker with local admin on an app server dumps LSASS memory but finds no reusable NTLM hashes or TGTs, so lateral movement fails.",
  "mistakes": [
   [
    "Enabling Credential Guard on domain controllers to protect them from credential dumping.",
    "Credential Guard is not supported on DCs and adds no protection there. Use LSA protection (RunAsPPL) on DCs."
   ],
   [
    "Thinking LSA protection requires VBS, UEFI virtualization extensions and a TPM.",
    "LSA protection runs LSASS as a Protected Process Light and does not depend on VBS; Credential Guard is the feature that needs VBS."
   ],
   [
    "Believing Credential Guard stops keyloggers or phishing.",
    "It protects stored derived credentials in memory. Credentials typed into a compromised session or phishing page can still be captured."
   ],
   [
    "Enabling Credential Guard everywhere without testing legacy apps.",
    "It blocks NTLMv1, unconstrained delegation and DES for Kerberos, which can break older applications. Pilot first."
   ]
  ],
  "tryit": [
   [
    "Lakeside Utilities wants to protect LSASS on all servers. Its domain controllers are older hardware without a TPM, and its member servers are new hosts with UEFI, Secure Boot and virtualization extensions. The security team wants the strongest protection possible on each group. What do you enable where?",
    "Enable LSA protection (RunAsPPL) on all servers, including the DCs, since it does not need VBS and is supported on DCs. On the member servers, also enable Credential Guard, which uses VBS to move NTLM hashes and TGTs into LSAIso. Credential Guard is not supported on DCs regardless of hardware."
   ],
   [
    "After enabling LSA protection in audit mode on a file server, the admin sees CodeIntegrity events showing that a third-party password filter DLL would fail to load. What should happen before enforcement?",
    "Contact the vendor for a properly signed version or remove the plug-in, and confirm the audit events stop. Enforcing first would block the DLL from loading into LSASS and could break whatever depends on it."
   ]
  ],
  "tip": "Credential Guard needs VBS (UEFI, Secure Boot, virtualization extensions) and is not supported on DCs; LSA protection (RunAsPPL) works on DCs and doesn't need VBS.",
  "check": [
   [
    "Where do NTLM hashes and Kerberos TGTs live when Credential Guard is enabled?",
    "In the LSAIso process inside Virtual Secure Mode, isolated from the normal OS and LSASS."
   ],
   [
    "You want to protect LSASS on domain controllers. Which feature can you use?",
    "LSA protection (RunAsPPL), because Credential Guard is not supported on domain controllers."
   ],
   [
    "Name two platform requirements for VBS.",
    "Any two of: 64-bit CPU with virtualization extensions and SLAT, UEFI with Secure Boot, and ideally a TPM."
   ],
   [
    "What does enabling Credential Guard with UEFI lock change?",
    "The setting is stored in firmware, so it cannot be disabled remotely by changing the registry or Group Policy."
   ]
  ]
 },
 {
  "t": "App Control for Business (WDAC) policies and audit mode; AppLocker differences",
  "hook": "On Saturday morning, Tess on the weekend shift at Driftwood Freight notices something odd on a file server: an unfamiliar executable named after a printer driver, copied into a temp folder at 3 a.m. Antivirus did not flag it. Nothing has encrypted yet, but the security lead, Omar, is blunt in the call: we keep trying to spot every bad program, and we keep missing new ones. Why not flip it around and only let approved software run on servers? The infrastructure team pushes back, worried about blocking the backup agent and bricking a server at boot. How do you get to allow-only without breaking production?",
  "simple": "Application control means a computer only runs programs that are on an approved list, instead of trying to recognize every bad program. It is like a guest list at a private party: if your name is not on it, you do not get in, even if you look harmless. Windows has two tools for this. App Control for Business is the modern, stronger one; it checks everything that runs on the machine, including the deep system pieces called drivers, and applies the same rules to everyone. AppLocker is the older tool; it can give different lists to different users, but it does not cover drivers. Either way, you first run the list in a watch-only mode, called audit mode, to see what would have been blocked before you start blocking.",
  "body": [
   "Application control means allowing only approved code to run, instead of trying to detect every piece of bad code. Detection-based tools such as antivirus have to recognize something as malicious, which fails for brand-new or custom tools. An allow list fails closed instead: unknown code simply does not run. On a server, where the set of needed software is small and stable, application control is one of the strongest defenses against ransomware and attacker tools. Windows offers two technologies: App Control for Business, formerly called Windows Defender Application Control (WDAC), and the older AppLocker.",
   "App Control for Business works through the Windows code integrity engine, the same part of the kernel that verifies driver signatures. A policy, written in XML and compiled to a binary file, lists rules that allow or deny code, and Windows checks every driver, executable, DLL (dynamic-link library) and script host interaction against it, including kernel-mode drivers. Because enforcement happens in the kernel and applies to every user, including administrators and SYSTEM, App Control is treated as a security boundary rather than a convenience control.",
   "Rules can be based on several file attributes. A signer rule trusts code signed by a publisher certificate, optionally narrowed to a product name, file name and minimum version, which survives updates well. A hash rule trusts one exact file and must be updated whenever the file changes. A path rule trusts files in a location, which is convenient but weaker unless the folder is writable only by administrators. A managed installer rule automatically allows software deployed by a trusted deployment tool such as Configuration Manager. The Intelligent Security Graph option allows files with good reputation in Microsoft's cloud service. Policy rule options control overall behavior, such as whether audit mode is on, whether script enforcement applies and whether the policy allows supplemental policies.",
   "You build a policy from one of the example templates, such as the Default Windows mode template that allows Windows itself and Microsoft-signed code, or the Allow Microsoft mode, using the App Control Policy Wizard or cmdlets like `New-CIPolicy`, `Set-RuleOption` and `ConvertFrom-CIPolicy`, which compiles the XML into the binary policy file. Current Windows versions support multiple active policies at once: base policies and supplemental policies that expand a base, which lets different teams add their own applications without editing the core policy. You deploy with Group Policy, Intune, Configuration Manager, or the `CiTool.exe` command on supported versions, for example to add or refresh a policy without a restart.",
   "Always start in audit mode. In audit mode nothing is blocked; instead, every time code would have been blocked, Windows logs an event, event ID 3076, in the Microsoft-Windows-CodeIntegrity/Operational log, and script or MSI (Windows Installer package) events in the AppLocker logs. You run the server's normal workload for a while, long enough to catch monthly jobs and patch cycles, review the events, add rules for legitimate software such as backup and monitoring agents, and only then switch to enforced mode by removing the audit rule option. In enforced mode, blocks are logged as event ID 3077. Keep a rollback path, like a VM checkpoint in a lab or a tested procedure to remove the policy, because an overly strict policy that blocks boot-critical drivers can stop a server from starting.",
   "AppLocker is the older feature. Its rules are also publisher, path or hash based, but it only controls user-mode code, it applies rules to specific users or groups, and it requires the Application Identity service (AppIDSvc) to be running; if that service is stopped, rules are not enforced. It is configured in Group Policy under Computer Configuration, Windows Settings, Security Settings, Application Control Policies, with rule collections for executables, Windows Installer files, scripts, packaged apps and DLLs. It also has an audit only mode, with events like 8003 (would have been blocked) and 8004 (blocked) in the AppLocker EXE and DLL log.",
   "The key differences for the exam come down to scope, strength and future. App Control applies to the whole device, including kernel drivers, enforces in the kernel for every user, and is the application control technology Microsoft recommends and keeps improving. AppLocker covers only user-mode code, depends on a service, and is considered defense in depth; it is still supported but receives no new features. Choose AppLocker, possibly alongside App Control, only when you need different rules for different users on the same machine, such as a Remote Desktop Session Host where finance users and call center users should run different apps.",
   "In practice, a mature server design uses App Control as the base layer on every server, with signer rules for vendors, a managed installer for software deployment and supplemental policies for team-specific apps. AppLocker is layered on top only on multi-user hosts that need per-group rules. Whichever you deploy, the audit-first workflow and careful review of 3076 or 8003 events is what keeps production running."
  ],
  "analogy": "App Control for Business is the building's front-door guest list checked by security for everyone, including the building manager and the delivery crews that work in the basement (drivers). AppLocker is a list posted on specific office doors that says which teams may enter which rooms, but it only works while the receptionist (the Application Identity service) is on duty and it never covers the basement. Audit mode is a week where the guard writes down who would have been turned away without stopping anyone.",
  "terms": [
   [
    "App Control for Business",
    "The Windows code integrity based application control feature, formerly WDAC, that governs drivers and user-mode code device-wide."
   ],
   [
    "Audit mode",
    "A policy mode that logs what would be blocked (event 3076) without blocking, used to test policies before enforcing."
   ],
   [
    "Signer rule",
    "A rule that trusts code signed by a specific publisher certificate, optionally narrowed by product, file name and version."
   ],
   [
    "Supplemental policy",
    "An App Control policy that extends a base policy to allow additional applications."
   ],
   [
    "Managed installer",
    "A trusted deployment tool whose installed software App Control automatically allows."
   ],
   [
    "AppLocker",
    "An older user-mode application control feature with per-user or per-group rules, requiring the Application Identity service."
   ]
  ],
  "example": "An admin creates an App Control policy from the default Windows template in audit mode and deploys it to a pilot file server. After a week, the CodeIntegrity log shows event 3076 for the backup agent and a monitoring tool; the admin adds signer rules for both vendors, removes the audit option, redeploys, and now unapproved executables such as a copied-in admin tool are blocked with event 3077.",
  "mistakes": [
   [
    "Choosing AppLocker to block an untrusted kernel driver.",
    "AppLocker controls only user-mode code. App Control for Business covers kernel-mode drivers."
   ],
   [
    "Deploying an App Control policy straight to enforced mode on production servers.",
    "Start in audit mode, review 3076 events, add rules for legitimate software, then enforce; an overly strict policy can even stop a server from booting."
   ],
   [
    "Mixing up the event IDs and treating 3077 as the audit event.",
    "3076 means would have been blocked (audit); 3077 means actually blocked (enforced). For AppLocker, 8003 is audit and 8004 is blocked."
   ],
   [
    "Assuming AppLocker rules still work after the Application Identity service is disabled.",
    "AppLocker relies on AppIDSvc; if it is stopped, rules are not enforced."
   ]
  ],
  "tryit": [
   [
    "Saltmarsh Bank's file servers run only Windows components, a backup agent and a monitoring agent, both signed by their vendors. The security team wants to block everything else, including unknown drivers, for all accounts including administrators. Which technology and rule types do you use, and how do you roll it out?",
    "App Control for Business, starting from the Default Windows template with signer rules for the backup and monitoring vendors. Deploy in audit mode, review event 3076 in the CodeIntegrity log for a full business cycle, add any missing rules, then remove the audit option to enforce. It covers kernel drivers and applies to every account."
   ],
   [
    "A Remote Desktop Session Host serves two departments. Accounting must run a tax application that call center staff must not be able to start, and both share the same server. What do you add, and why is App Control alone not enough?",
    "Add AppLocker rules that allow the tax application only for the Accounting group. App Control policies apply to the whole device, not per user, so per-group differences require AppLocker, which can run alongside an App Control base policy."
   ]
  ],
  "tip": "Need to block drivers or apply to everyone on the device: App Control. Need rules per user or group: AppLocker. Always audit first, reading event 3076 before enforcing.",
  "check": [
   [
    "Which event ID in the CodeIntegrity log shows code that would have been blocked by an App Control policy in audit mode?",
    "Event ID 3076; event ID 3077 indicates an actual block in enforced mode."
   ],
   [
    "What service must be running for AppLocker rules to be enforced?",
    "The Application Identity service (AppIDSvc)."
   ],
   [
    "A Remote Desktop server needs different allowed apps for two user groups. Which technology fits?",
    "AppLocker, because it can apply rules to specific users or groups, whereas App Control policies apply to the whole device."
   ],
   [
    "Why are signer rules usually preferred over hash rules for vendor software?",
    "Signer rules keep trusting new versions signed by the same publisher, while hash rules break every time the file is updated."
   ]
  ]
 },
 {
  "t": "Windows LAPS: backing up local admin passwords to AD DS or Entra ID, rotation and retrieval permissions",
  "hook": "During a tabletop exercise at Bramblewood County Schools, the consultant asks a simple question: what is the local Administrator password on your file servers? Three people answer at once, with the same password, which was set in a server image years ago. The room goes quiet as everyone realizes what that means. Anyone who learns it on one server can sign in to all of them. Later that week, a server loses its domain trust and the only way in is a local account, so the help desk needs a password, fast. How do you give every server its own password, rotate it automatically and still let the right people retrieve it when they need it?",
  "simple": "Every Windows computer has a built-in local administrator account that works even when the network or domain is broken. If all computers share the same password for that account, stealing it once unlocks everything. Windows LAPS fixes this by giving each computer its own random password, changing it on a schedule, and saving a copy in a safe central place: your company's Active Directory or Microsoft Entra ID in the cloud. Only people you approve can look the password up. It is like a hotel where every room has its own key code that changes regularly, and only the front desk manager can look up a code when a guest is locked out.",
  "body": [
   "If every server shares the same local Administrator password, one compromised server gives an attacker the key to all of them, a classic path for lateral movement. Windows Local Administrator Password Solution (Windows LAPS) fixes this by giving every device a unique, random, regularly rotated local admin password and storing it securely in a directory where authorized people can retrieve it. Windows LAPS is built into supported Windows and Windows Server versions through updates; you do not install a separate agent or client-side extension. It replaces the older, separately installed legacy Microsoft LAPS, and it uses different Active Directory attributes, so the two can coexist during migration but should not manage the same account.",
   "Each device backs up its password to one directory, chosen by policy: Active Directory Domain Services (AD DS) or Microsoft Entra ID, not both at once. Entra ID backup suits Microsoft Entra joined and hybrid joined devices and is typically configured with Intune. AD DS backup suits domain-joined servers and is typically configured with Group Policy under Computer Configuration, Administrative Templates, System, LAPS, where you will find settings such as Configure password backup directory, Password Settings and Name of administrator account to manage. On domain controllers, Windows LAPS can also back up the Directory Services Restore Mode (DSRM) password, the local recovery password used to boot a DC into restore mode, but only to AD DS.",
   "Setting up AD DS backup takes a few steps, and their order matters. First, extend the schema with `Update-LapsADSchema`, which adds the new msLAPS attributes, such as msLAPS-Password and msLAPS-PasswordExpirationTime, to computer objects; you run this once per forest with schema admin rights. Second, give computers permission to write their own password to their computer object with `Set-LapsADComputerSelfPermission -Identity \"OU=Servers,DC=contoso,DC=com\"`. Third, configure the policy: the backup directory, the managed account name if it is not the built-in Administrator, password complexity and length, and the password age after which it rotates.",
   "You can also enable password encryption for AD DS backup. With encryption on, the password is encrypted before it is stored in AD, and only a chosen group, Domain Admins by default, can decrypt it, so simply having read access to the attribute is not enough. Encryption requires a domain functional level of Windows Server 2016 or higher. It also enables password history, so you can retrieve a previous password, which helps when restoring a server from an older backup whose local password has since rotated.",
   "Retrieval permissions are separate from write permissions, which is easy to overlook. In AD, you grant a group the right to read passwords for computers in an OU with `Set-LapsADReadPasswordPermission -Identity \"OU=Servers,DC=contoso,DC=com\" -AllowedPrincipals CONTOSO\\HelpDesk`, and if encryption is on, that group must also be configured as an authorized decryptor in policy. Authorized users retrieve the password with `Get-LapsADPassword -Identity SRV01 -AsPlainText`, or from the LAPS tab on the computer object in Active Directory Users and Computers. In Entra ID, retrieval is governed by Entra roles, such as Cloud Device Administrator, or custom roles that include the local credential read permission, and passwords appear on the device's page in the Entra admin center or Intune. Keep the list of people who can read passwords short, and review it as regularly as you review membership of admin groups, because a LAPS password is a full local administrator credential for that machine.",
   "Rotation happens automatically when the password reaches its maximum age. You can force it early in two ways: run `Reset-LapsPassword` on the device itself, or set the expiration time in AD with `Set-LapsADPasswordExpirationTime -Identity SRV01` so the device rotates at its next policy processing. To trigger processing immediately, run `Invoke-LapsPolicyProcessing` on the device. Every rotation writes the new password to the directory before changing it locally, so you never end up with a password nobody knows.",
   "Post-authentication actions reduce the window in which a retrieved password is useful. When the managed account is used to sign in, Windows LAPS waits for a configurable grace period and then performs the configured action: reset the password, reset and sign out the managed account, or reset and restart the device. That means a technician who looked up the password for an emergency fix cannot quietly reuse it a week later. Troubleshoot Windows LAPS with the Microsoft-Windows-LAPS/Operational event log, which records policy processing, backups and errors such as missing permissions, and with `Get-LapsDiagnostics` to collect a full diagnostic bundle."
  ],
  "analogy": "Windows LAPS works like a hotel's key system. Each room (server) gets its own code that changes on a schedule, and the code is written into the front desk's locked ledger (AD DS or Entra ID) before the room lock changes. Housekeeping must be allowed to write each room's code into the ledger (computer self permission), and only certain managers may read it (read permission). After a guest uses an emergency code, the lock resets itself soon after (post-authentication actions).",
  "mnemonic": "AD setup order is Schema, Self, Staff: Update-LapsADSchema, then Set-LapsADComputerSelfPermission, then Set-LapsADReadPasswordPermission for the staff who retrieve passwords.",
  "terms": [
   [
    "Windows LAPS",
    "A built-in Windows feature that sets unique, rotated local admin passwords and backs them up to AD DS or Entra ID."
   ],
   [
    "Update-LapsADSchema",
    "The cmdlet that extends the AD schema with the Windows LAPS attributes."
   ],
   [
    "Set-LapsADComputerSelfPermission",
    "Grants computers in an OU permission to write their own LAPS password to AD."
   ],
   [
    "Set-LapsADReadPasswordPermission",
    "Grants a user or group permission to read LAPS passwords for computers in an OU."
   ],
   [
    "Password encryption",
    "An AD backup option that encrypts stored passwords so only authorized decryptors can read them; needs Windows Server 2016 DFL."
   ],
   [
    "Post-authentication actions",
    "Automatic reset, sign-out or restart after the managed account is used and a grace period passes."
   ]
  ],
  "example": "A help desk technician needs local admin on a server that lost its domain trust. Because the HelpDesk group was granted read permission on the Servers OU, the technician runs Get-LapsADPassword -Identity SRV07 -AsPlainText, signs in locally and repairs the trust. Two hours later, the post-authentication action resets the password automatically.",
  "mistakes": [
   [
    "Configuring a device to back up its LAPS password to both AD DS and Entra ID for redundancy.",
    "A device backs up to one directory only, chosen by policy."
   ],
   [
    "Granting read permission and forgetting the computer self permission.",
    "Computers need Set-LapsADComputerSelfPermission on their OU to write their own password; without it, backups fail and the LAPS event log shows permission errors."
   ],
   [
    "Expecting the DSRM password of a domain controller to be stored in Entra ID.",
    "DSRM password backup is supported only to AD DS."
   ],
   [
    "Thinking Windows LAPS needs the legacy LAPS client-side extension installed.",
    "Windows LAPS is built into supported Windows versions; legacy LAPS was the separately installed product and uses different attributes."
   ]
  ],
  "tryit": [
   [
    "Thornbury Credit Union enabled Windows LAPS on its Servers OU with AD DS backup. The schema was extended and the policy is applied, but the Microsoft-Windows-LAPS/Operational log on each server shows errors when it tries to update the password in AD. Help desk staff also cannot see any passwords. What is most likely missing, and what else will the help desk need?",
    "The computers likely lack permission to write their own password; run Set-LapsADComputerSelfPermission on the Servers OU. Once backups succeed, grant the help desk group read access with Set-LapsADReadPasswordPermission (and, if encryption is enabled, make them authorized decryptors)."
   ],
   [
    "A security audit flags that help desk technicians can retrieve a server's local admin password and might reuse it days later. The servers run Windows LAPS with AD DS backup. What feature reduces this risk without removing their retrieval rights?",
    "Configure post-authentication actions, so after the managed account is used and the grace period expires, Windows LAPS resets the password (optionally signing out or restarting). A retrieved password then stops working soon after use."
   ]
  ],
  "tip": "A device backs up to AD DS or Entra ID, never both. Remember the three AD setup cmdlets in order: schema, computer self permission, read permission. DSRM password backup is AD only.",
  "check": [
   [
    "Which cmdlet lets the help desk group read LAPS passwords for computers in an OU?",
    "Set-LapsADReadPasswordPermission with the OU as -Identity and the group as -AllowedPrincipals."
   ],
   [
    "Can Windows LAPS back up a DC's DSRM password to Microsoft Entra ID?",
    "No. DSRM password backup is supported only to AD DS."
   ],
   [
    "How can you make a server rotate its LAPS password right away?",
    "Run Reset-LapsPassword on the server, or set its expiration time in AD with Set-LapsADPasswordExpirationTime and trigger policy processing."
   ],
   [
    "What domain functional level is required for LAPS password encryption in AD DS?",
    "Windows Server 2016 or higher."
   ]
  ]
 },
 {
  "t": "Hardening domain controllers: tiered administration, Protected Users, privileged access workstations, restricting who can log on to DCs",
  "hook": "The new security director at Hollowbrook Insurance, Nadia, pulls up a report from a weekend review of sign-in logs. The same Domain Admins account signed in interactively to a print server, two file servers, a help desk laptop and a domain controller, all in one afternoon. That account belongs to Kevin, a well-meaning senior admin who uses it for everything because it is convenient. Nadia asks the room: if any one of those machines had malware on it, who would own the domain right now? Everyone knows the answer. Your task is to design the controls that make Kevin's afternoon impossible.",
  "simple": "Domain controllers are the servers that check everyone's passwords in a Windows company network, so whoever controls them controls everything. Protecting them is mostly about keeping powerful sign-ins away from risky computers. Tiered administration sorts computers and admin accounts into levels: the most powerful accounts may only sign in to the most protected machines. Protected Users is a special group that makes its members' sign-ins harder to steal or reuse. A privileged access workstation is a locked-down computer used only for admin work, never for email or web browsing. Logon restrictions are rules that stop powerful accounts from signing in to ordinary computers. Think of a bank's vault key: it is never carried into the coffee shop next door.",
  "body": [
   "Domain controllers (DCs) hold the password hashes of every account in the domain, so whoever controls a DC controls the domain, and through it every server and workstation joined to it. Hardening DCs is therefore less about one magic setting and more about keeping powerful credentials away from places where they can be stolen. Attackers rarely break into a DC directly; they compromise an ordinary machine, wait for a privileged admin to sign in there, and reuse that credential. The exam expects you to know four ideas that break that chain: tiered administration, the Protected Users group, privileged access workstations and logon restrictions.",
   "Tiered administration separates systems and admin accounts by how much control they have. Tier 0 is identity: domain controllers, Active Directory itself, and anything that controls them, such as Microsoft Entra Connect servers, certificate authorities (CAs), and the management and backup tools that have rights over DCs. Tier 1 is servers and enterprise applications. Tier 2 is user workstations and devices. The rule is that a higher-tier credential must never be used on a lower-tier system, because a compromised lower-tier machine could capture it from memory. A domain admin should never sign in to a file server or a help desk laptop, even once. Microsoft's newer enterprise access model describes the same idea as a control plane, management plane and data or workload plane, but the principle is identical.",
   "In practice, tiering means each admin has separate accounts for each tier they manage, distinct from their everyday user account used for email and browsing. Kevin from the opening would have a normal account for email, a Tier 1 account for servers and, only if he truly needs it, a Tier 0 account for DCs. Each account is allowed to sign in only to systems of its own tier, which the logon restrictions below enforce.",
   "Protected Users is a built-in global security group that applies extra, non-configurable protections to its members when they sign in on supported versions of Windows. Members cannot authenticate with NT LAN Manager (NTLM), only Kerberos. Kerberos cannot use weak DES or RC4 encryption for preauthentication. Their credentials are not cached, so offline sign-in to a disconnected laptop does not work. Their accounts cannot be delegated with constrained or unconstrained delegation. And their Kerberos ticket-granting tickets (TGTs) have a short, non-renewable lifetime of four hours by default, so a stolen ticket expires quickly. Some of these protections depend on a domain functional level of Windows Server 2012 R2 or higher.",
   "Add human admin accounts to Protected Users, not service accounts or computer accounts, which would break when they lose NTLM, delegation or cached credentials. Test first by adding one admin and trying their normal tasks, because apps that need NTLM or delegation will fail for members, and a member who signs in to a laptop that is offline will be refused. Failures are recorded in the Microsoft-Windows-Authentication event logs, such as ProtectedUserFailures-DomainController on DCs, and in the members' failed sign-in events, which makes testing straightforward.",
   "A privileged access workstation (PAW) is a dedicated, hardened device used only for administrative tasks. It has no email, no general web browsing, strong application control, current security features such as Credential Guard, and tight network restrictions that allow it to reach only the systems it administers. Tier 0 admins manage DCs from a Tier 0 PAW, often through Remote Server Administration Tools (RSAT) or Windows Admin Center, so their credentials are never typed on an internet-facing workstation where a phishing email or malicious website could capture them. A jump server can extend this model, but the jump server must itself be treated as Tier 0.",
   "Restricting logons enforces the tiers technically rather than by trust. On DCs, the default Allow log on locally and Allow log on through Remote Desktop Services rights should be limited to Tier 0 admins, removing broader groups such as Account Operators or Print Operators where they are not needed. On Tier 1 and Tier 2 machines, a Group Policy object (GPO) linked to those OUs should add Domain Admins, Enterprise Admins and other Tier 0 groups to Deny log on locally, Deny log on through Remote Desktop Services, Deny access to this computer from the network, Deny log on as a batch job and Deny log on as a service. Deny rights override allow rights, so this works even if someone adds a domain admin to a server's local Administrators group.",
   "Authentication policies and silos, available at domain functional level Windows Server 2012 R2 and above, can go further. You place Tier 0 accounts in an authentication policy silo whose policy allows them to obtain Kerberos tickets only from specified hosts, such as Tier 0 PAWs and DCs, and can shorten their TGT lifetime. Also mark admin accounts Account is sensitive and cannot be delegated, so no service can impersonate them, and keep the membership of Domain Admins, Enterprise Admins and Schema Admins as small as possible, ideally empty for Schema Admins until needed.",
   "Round this out with basic DC hygiene. Install no extra roles or applications on DCs, do not browse the web from them, disable the Print Spooler service where it is not needed because it has been abused for attacks against DCs, keep DCs fully patched, and apply the domain controller security baseline. In branch offices with weak physical security, use read-only domain controllers (RODCs), which hold no writable copy of AD and cache passwords only for accounts you allow."
  ],
  "analogy": "Tiered administration is like the keys at a bank. The vault key (Tier 0) is used only inside the vault room, never carried to the teller windows (Tier 1) or the lobby kiosks (Tier 2), because a pickpocket in the lobby could take it. A PAW is the guarded corridor that leads only to the vault. Protected Users is like a key that stops working after a few hours and cannot be copied. Deny logon rights are the lobby guards who turn away anyone carrying the vault key.",
  "mnemonic": "Tiers count down from the crown: 0 is identity (DCs and AD), 1 is servers and apps, 2 is workstations and devices. Tier 0 credentials never travel down.",
  "terms": [
   [
    "Tier 0",
    "The identity tier: domain controllers, AD and systems that control them; its credentials must never be exposed on lower tiers."
   ],
   [
    "Protected Users",
    "A global group whose members cannot use NTLM, DES or RC4, cached credentials or delegation, and get short-lived TGTs."
   ],
   [
    "Privileged access workstation",
    "A dedicated hardened device used only for administration of sensitive systems."
   ],
   [
    "Deny logon rights",
    "User rights such as Deny log on locally that override allow rights and keep specified groups off a machine."
   ],
   [
    "Authentication policy silo",
    "An AD object that limits where members of a silo can obtain Kerberos tickets, restricting privileged accounts to specified hosts."
   ],
   [
    "Read-only domain controller",
    "A DC with a read-only copy of AD that caches passwords only for allowed accounts, used where physical security is weak."
   ]
  ],
  "example": "After an audit finds Domain Admins signing in to file servers, the company creates separate Tier 0 accounts added to Protected Users, issues Tier 0 PAWs to three admins, and links a GPO to the server and workstation OUs that denies local, RDP, network, batch and service logon to Domain Admins and Enterprise Admins.",
  "mistakes": [
   [
    "Adding service accounts to Protected Users to harden them.",
    "Service and computer accounts break when they lose NTLM, delegation and cached credentials. Protected Users is for human admin accounts; use group managed service accounts for services."
   ],
   [
    "Linking the deny-logon GPO for Domain Admins to the Domain Controllers OU.",
    "Deny rights for Tier 0 groups go on lower-tier machines. On DCs you restrict the allow rights to Tier 0 admins instead."
   ],
   [
    "Treating Entra Connect servers or certificate authorities as ordinary Tier 1 servers.",
    "Anything that can control identity is Tier 0 and must be protected and administered like a DC."
   ],
   [
    "Using one admin account for everything as long as it has MFA.",
    "Multifactor sign-in does not stop a credential or ticket being stolen from a compromised machine's memory. Use separate accounts per tier and keep Tier 0 accounts off lower tiers."
   ]
  ],
  "tryit": [
   [
    "Fairhaven Logistics wants to make sure that even if a junior admin adds the Domain Admins group to a file server's local Administrators group, no domain admin can sign in to that server interactively, over RDP, over the network or through scheduled tasks. What do you configure, and where?",
    "A GPO linked to the member server OUs (and workstation OUs) that adds Domain Admins and other Tier 0 groups to Deny log on locally, Deny log on through Remote Desktop Services, Deny access to this computer from the network, Deny log on as a batch job and Deny log on as a service. Deny rights override allow rights and local group membership."
   ],
   [
    "A senior admin added to Protected Users reports she can no longer sign in to her laptop on a flight, and a legacy reporting app that uses NTLM rejects her. She asks to be removed from the group. What do you explain and recommend?",
    "These are expected effects: Protected Users blocks cached credentials and NTLM. Keep her Tier 0 admin account in Protected Users and use it only from a PAW; her everyday user account, which is not a member, handles offline laptop use and the legacy app."
   ]
  ],
  "tip": "Protected Users is for human admin accounts only; never add service or computer accounts. Deny-logon rights for Tier 0 groups go on lower-tier machines, not on DCs.",
  "check": [
   [
    "Why shouldn't a domain admin sign in interactively to a member file server?",
    "If that server is compromised, the admin's credentials could be captured from its memory, giving the attacker Tier 0 control; higher-tier credentials must not touch lower tiers."
   ],
   [
    "Name three effects of adding a user to Protected Users.",
    "Any three: no NTLM, no DES or RC4 Kerberos preauthentication, no cached credentials, no delegation, short non-renewable TGTs."
   ],
   [
    "Which user rights would you configure with a GPO on member servers to keep Domain Admins off them?",
    "Deny log on locally, Deny log on through Remote Desktop Services, Deny access to this computer from the network, and Deny log on as a batch job and as a service."
   ],
   [
    "Which tier does an Entra Connect server belong to, and why?",
    "Tier 0, because it can change identities in AD and Entra ID, so controlling it is equivalent to controlling identity."
   ]
  ]
 },
 {
  "t": "Windows Defender Firewall profiles, rules and connection security (IPsec) rules",
  "hook": "It is Tuesday afternoon at Cedar Valley Health, and Priya from the audit team is standing at your desk. She has a laptop she brought from home, plugged into a spare wall jack in the finance wing, and she is looking at the login page of the payroll application server. \"This laptop is not in the domain,\" she says. \"Why can it reach payroll at all?\" You realize the server trusts anything on the same subnet. Every Windows Server already ships with a firewall that could stop this, and with IPsec rules that could insist on knowing exactly which computer is knocking. So why is the door open, and how do you lock it without breaking the finance team's morning?",
  "simple": "Every Windows Server has a built-in guard at its own front door, called Windows Defender Firewall. The guard checks each piece of network traffic against a list of rules: let this in, block that. The guard also changes how strict it is depending on where the server thinks it is: at work on the company network, on a trusted private network, or somewhere public. On top of that, Windows can ask computers to prove who they are before talking, a bit like showing a staff badge before entering a secure room. That badge check is called IPsec (Internet Protocol security). It can also scramble the conversation so nobody listening can read it. Together, these let you say: only company computers from the finance group may talk to the payroll server.",
  "body": [
   "Windows Defender Firewall with Advanced Security is a host-based, stateful firewall that runs on every Windows Server. Host-based means it filters traffic on the server itself rather than at the network edge, and stateful means it remembers outbound connections so the matching return traffic is allowed automatically. Because each server filters its own inbound and outbound traffic, an attacker who gets a foothold on one machine in the trusted network cannot simply connect to every other server, which limits lateral movement. The same console also hosts connection security rules, which use IPsec (Internet Protocol security) to authenticate and optionally encrypt traffic between computers. You manage both in `wf.msc`, with the `NetSecurity` PowerShell module, or centrally by Group Policy.",
   "The firewall starts by deciding which profile applies. There are three profiles, and each network adapter uses one of them based on the network it detects through the Network Location Awareness (NLA) service. The Domain profile applies when the computer can authenticate to a domain controller (DC) on that network. The Private profile applies to networks an administrator has marked as private. The Public profile applies to everything else and should be the most restrictive. Each profile has its own on or off state and its own default actions, which out of the box are block inbound unless a rule allows it, and allow outbound. You can see all three with `Get-NetFirewallProfile`, and `Get-NetConnectionProfile` shows which profile each adapter is using right now. A classic troubleshooting clue is a domain-joined server whose adapter is stuck on Public: it could not reach or authenticate to a DC when NLA checked, often because of a Domain Name System (DNS) setting or because the network was not ready at startup, so the Domain rules you carefully built never apply.",
   "Firewall rules describe the traffic to match and what to do with it. A rule can match a program, a port and protocol, a predefined group such as File and Printer Sharing or Remote Desktop, or a custom combination. You then narrow its scope by local and remote IP addresses, by profile and by interface type. Each rule has one of three actions: allow the connection, block the connection, or allow the connection if it is secure, which only lets traffic through when it is protected by IPsec. When several rules match, block rules take precedence over allow rules, so an explicit block wins even if another rule allows the same traffic. The one exception is an allow-if-secure rule with the override block rules option set, which exists for cases such as an authorized vulnerability scanner that must reach every port. A scoped rule from PowerShell looks like this: `New-NetFirewallRule -DisplayName \"SQL 1433\" -Direction Inbound -Protocol TCP -LocalPort 1433 -RemoteAddress 10.0.5.0/24 -Action Allow -Profile Domain`. It opens SQL Server only to one subnet and only while the server is on the Domain profile.",
   "In a domain you rarely configure servers one at a time. Firewall rules and profile settings are deployed by Group Policy Object (GPO) under Computer Configuration, Windows Settings, Security Settings, Windows Defender Firewall with Advanced Security. The rule merging setting in each profile decides whether rules that local administrators create on the server also apply, or whether only GPO rules count. Turning local merging off is a common hardening step because it stops someone from quietly opening a port on one server. When traffic is mysteriously blocked, enable logging of dropped packets for the relevant profile. The log, `pfirewall.log` under `%systemroot%\\System32\\LogFiles\\Firewall` by default, records the time, action, protocol, source and destination addresses and ports, so you can see exactly what was dropped.",
   "Connection security rules answer a different question: not whether to allow traffic, but when to require IPsec and how peers prove their identity. There are five rule types. An isolation rule requires authentication for traffic based on criteria such as domain membership or health. An authentication exemption rule lists hosts that should skip IPsec, typically infrastructure that must answer before a computer can authenticate, such as DCs, DNS servers and DHCP (Dynamic Host Configuration Protocol) servers. A server-to-server rule protects traffic between specific endpoints. A tunnel rule protects traffic between gateway computers, and a custom rule covers anything else. For each rule you choose whether to request or require authentication for inbound and outbound connections. Request means use IPsec when the other side can, but fall back to clear traffic; require means no authentication, no connection.",
   "You also choose an authentication method. For domain members the natural choice is Kerberos version 5 computer authentication, optionally adding user authentication as a second step. For non-domain hosts, hosts in a perimeter network, or hosts in another forest, use computer certificates issued by a certification authority both sides trust. A preshared key is weak, because the same secret sits in plain view in policy, and is meant only for testing. Under the hood, IPsec negotiates security associations in two phases: main mode authenticates the two computers and sets up a protected channel, and quick mode then negotiates protection for the actual data. When you need to confirm that IPsec is really working, look under Monitoring, Security Associations in `wf.msc`, or run `Get-NetIPsecMainModeSA` and `Get-NetIPsecQuickModeSA`.",
   "Putting the pieces together gives the typical domain isolation design. First, a GPO deploys an isolation rule set to request authentication inbound and outbound while you pilot, so nothing breaks and you can watch security associations form. Second, an authentication exemption rule covers infrastructure servers that non-authenticated clients still need. Third, once the pilot looks clean, you change the isolation rule to require authentication inbound. Finally, sensitive servers get firewall rules with the allow-if-secure action, with authorized computers or users limited to a specific group. The result is that only authenticated domain computers, or only members of that group, can connect, while a stray laptop on the same subnet is refused.",
   "For the exam, keep three distinctions clear. Firewall rules decide allow or block, and block wins. Connection security rules decide when IPsec is used and how peers authenticate, with Kerberos for domain members, certificates for everything else and preshared keys only in a lab. Profiles depend on what NLA detects, and the Domain profile needs a successful DC authentication on that network."
  ],
  "analogy": "Think of a server as an office building. The firewall is the front desk: it has a list saying which visitors may go to which floors, and a do-not-admit list that always wins over the guest list. Connection security rules are the badge readers: before the desk even considers you, you must tap a badge that proves which company you work for. The analogy stops at encryption: a badge reader does not hide your conversation, but IPsec can encrypt the traffic after it authenticates.",
  "terms": [
   [
    "Firewall profile",
    "Domain, Private or Public: a set of firewall settings chosen per network adapter based on the network that Network Location Awareness detects."
   ],
   [
    "Network Location Awareness (NLA)",
    "The Windows service that identifies the connected network and decides whether the Domain profile applies by checking for DC authentication."
   ],
   [
    "Allow the connection if it is secure",
    "A rule action that allows traffic only when it is protected by IPsec authentication and optionally encryption."
   ],
   [
    "Override block rules",
    "An option on an allow-if-secure rule that lets authenticated traffic pass even when a block rule matches, used for authorized scanners."
   ],
   [
    "Connection security rule",
    "A rule telling Windows when and how to use IPsec between computers, such as isolation, server-to-server or tunnel."
   ],
   [
    "Authentication exemption",
    "A connection security rule that exempts listed hosts, such as DCs or DHCP servers, from IPsec requirements."
   ],
   [
    "Main mode and quick mode",
    "The IPsec negotiation phases: main mode authenticates the peers, quick mode sets up protection for the data."
   ]
  ],
  "example": "A finance app server should accept connections only from domain computers in the Finance-PCs group. The admin creates a domain isolation rule requiring Kerberos computer authentication inbound, then an inbound firewall rule on the app port with the action allow if secure and authorized computers set to Finance-PCs. A non-domain laptop on the same subnet can no longer connect, and Monitoring, Security Associations on the server shows main mode and quick mode associations only for finance workstations.",
  "mistakes": [
   [
    "An allow rule that is more specific beats a broader block rule.",
    "Windows Firewall does not use most-specific-wins for allow versus block. Any matching block rule wins over allow rules; the only exception is an allow-if-secure rule with override block rules."
   ],
   [
    "A preshared key is fine for production IPsec between non-domain servers.",
    "Preshared keys are weak and intended only for testing. Non-domain or cross-forest hosts should use computer certificates; domain members use Kerberos V5."
   ],
   [
    "Setting an isolation rule to require authentication on day one is the safe choice.",
    "Requiring authentication before you pilot can cut off hosts that cannot do IPsec. Start with request, add exemptions for infrastructure, then move to require inbound."
   ],
   [
    "Connection security rules allow or block traffic by themselves.",
    "Connection security rules only decide when IPsec authentication and encryption are used. Allowing or blocking is still done by firewall rules, such as an allow-if-secure rule."
   ]
  ],
  "tryit": [
   [
    "You manage a web server farm in a perimeter network. The servers are not domain members, and the security team wants all traffic between the web servers and the back-end database server authenticated and encrypted. A colleague proposes a server-to-server rule using a preshared key because it is quick to set up. What do you recommend?",
    "Use a server-to-server connection security rule, but authenticate with computer certificates from a trusted certification authority. Kerberos is not available because the hosts are not domain members, and a preshared key is weak and meant only for testing. Then use allow-if-secure firewall rules on the database server so only IPsec-protected traffic from the web servers is accepted."
   ],
   [
    "After a planned power outage, a domain-joined file server comes back up and users suddenly cannot reach its shares. `Get-NetConnectionProfile` shows the adapter on the Public profile. The File and Printer Sharing rules are enabled only for the Domain profile. What is going on and what do you check?",
    "The server's adapter is on Public because Network Location Awareness could not authenticate to a DC when it checked, probably because the DC or DNS was not yet available after the outage. The Domain-only rules therefore do not apply. Check DNS settings and DC reachability, then restart the Network Location Awareness service or the adapter so the Domain profile is detected again, rather than opening the rules on Public."
   ]
  ],
  "tip": "Block rules beat allow rules, except allow-if-secure with override block rules. Kerberos for domain members, certificates for everything else, preshared key only for testing. The Domain profile needs the machine to authenticate to a DC on that network.",
  "check": [
   [
    "An inbound allow rule and an inbound block rule both match the same traffic. What happens?",
    "The traffic is blocked, because block rules take precedence over allow rules (unless an allow-if-secure rule has override block rules set)."
   ],
   [
    "Which IPsec authentication method suits two non-domain servers in a production DMZ?",
    "Computer certificates, because Kerberos requires domain membership and preshared keys are weak and meant only for testing."
   ],
   [
    "A domain server's adapter shows the Public profile. What should you check?",
    "Whether the server could reach and authenticate to a domain controller on that network, for example DNS settings or connectivity at startup."
   ],
   [
    "Which connection security rule type would you use so DHCP and DNS servers do not need IPsec?",
    "An authentication exemption rule listing those infrastructure servers."
   ]
  ]
 },
 {
  "t": "Microsoft Defender for Servers via Defender for Cloud: onboarding Arc and Azure servers, recommendations, just-in-time VM access",
  "hook": "Monday, 7:40 a.m., at Northwind Ridge Logistics. Daniel, the new security lead, forwards you a screenshot from Defender for Cloud with one line: why are two of our Azure VMs listening for RDP from the whole internet? Below it, the inventory page shows 40 on-premises servers in the warehouse datacenter that do not appear at all. You know the engineers need RDP to those Azure VMs a few times a week, and you know closing the port outright will start a flood of tickets. How do you get every server, in Azure and in the warehouse, under one security view, and keep management ports shut except for the minutes someone actually needs them?",
  "simple": "Defender for Cloud is a security checkup service in Azure. It looks over your servers, writes a to-do list of weak spots, such as missing updates or a remote login door left open to the whole internet, and warns you about attacks. Servers in Azure can be added with a switch. Servers in your own building first get a small helper program called the Azure Arc agent, which makes them show up in Azure like any other resource. One handy feature, just-in-time access, keeps the remote login door locked all the time and only unlocks it for one person, from one location, for a short time when they ask. Think of a hotel key card that works for your room only during your stay.",
  "body": [
   "Microsoft Defender for Cloud is Azure's cloud security posture management (CSPM) and cloud workload protection service. Posture management answers the question of what is misconfigured and how to fix it; workload protection answers the question of whether something is attacking you right now. For Windows Server, whether the machine runs in Azure, in your own datacenter or in another cloud, Defender for Cloud lists weaknesses, gives remediation steps and raises security alerts. The free foundational CSPM tier gives you recommendations and a secure score, and the paid Microsoft Defender for Servers plan adds workload protection features on top of it.",
   "Defender for Servers comes in two plans, and exam questions often hinge on which one you need. Plan 1 focuses on endpoint protection through its integration with Microsoft Defender for Endpoint, which provides antivirus, endpoint detection and response (EDR) and vulnerability findings for the server. Plan 2 includes everything in Plan 1 and adds features such as just-in-time (JIT) VM access, file integrity monitoring, agentless machine scanning and other advanced server protections. A good rule to carry into the exam is simple: if a scenario mentions JIT or file integrity monitoring, the answer requires Plan 2. If the scenario only needs EDR and antivirus, Plan 1 is enough.",
   "Onboarding Azure VMs is mostly a matter of turning the plan on. In Defender for Cloud you open Environment settings, select the subscription, and enable the Servers plan. Every VM in that subscription is then covered, and the needed components, such as the Defender for Endpoint integration, are deployed automatically as VM extensions. You do not visit each VM. Because the plan is enabled at the subscription level, a new VM created next month is protected as soon as it appears.",
   "On-premises and other-cloud servers are onboarded through Azure Arc, and this is the standard answer whenever a question asks how to bring hybrid servers under Defender for Cloud. You install the Azure Connected Machine agent on the server, either interactively with a generated script or at scale with a service principal, and the server appears as an Arc-enabled server resource in a resource group. If that subscription has Defender for Servers enabled, Defender for Cloud treats the Arc server much like an Azure VM: it provisions the Defender for Endpoint integration, assesses the operating system and shows the server in the Inventory page with its recommendations. Without Arc, the on-premises server simply is not an Azure resource, so Defender for Cloud has nothing to attach the plan to.",
   "Recommendations are the heart of posture management. Defender for Cloud continuously assesses resources against its security benchmark and lists findings such as system updates should be installed, endpoint protection should be installed, management ports should be closed on your virtual machines, or vulnerabilities in your machines should be remediated. Each recommendation shows a severity, the affected resources and step-by-step remediation; some offer a Fix button that remediates automatically, for example by deploying an extension. Recommendations roll up into a secure score, so remediating the high-impact ones raises the score the most. When a recommendation genuinely does not apply, such as a lab server that is intentionally isolated, you can create an exemption so it stops counting against the score, rather than ignoring it forever.",
   "Just-in-time VM access reduces the exposure of management ports such as RDP (Remote Desktop Protocol) on Transmission Control Protocol (TCP) port 3389 and SSH (Secure Shell) on TCP 22 for Azure VMs. When you enable JIT on a VM, Defender for Cloud adds deny rules for the selected ports to the VM's network security group (NSG), or to Azure Firewall. The port is now closed to everyone. When an administrator needs access, they request it in the portal, from the VM's Connect page, or through the API, specifying the port, their source IP address and a time window up to the maximum configured for that port. If their Azure role-based access control (RBAC) permissions allow the request, Defender for Cloud temporarily adds an allow rule for that source IP above the deny rule, then removes it when the window ends. Every request is recorded in the Azure activity log, which gives auditors a clear trail of who opened what and when.",
   "Know the limits of JIT. It works for Azure VMs protected by an NSG or Azure Firewall, because it works by editing those rules. It does not apply to on-premises Arc-enabled servers, which sit behind your own firewalls that Defender for Cloud cannot edit; for those you rely on your own perimeter controls and on Windows Defender Firewall. JIT also does not replace authentication: the person still needs valid credentials to sign in once the port is open. It simply shrinks the window in which the port is reachable at all.",
   "In day-to-day practice you start on the Inventory page to spot servers that are not covered or that lack the Defender for Endpoint integration, then work through the Recommendations page from the highest severity down, and use the Workload protections page, under Just-in-time VM access, to see which VMs are configured, which are recommended and which are not supported. Pull these together and you get the full story the exam expects: Arc brings hybrid servers in, the plan decides which protections you get, recommendations and secure score drive hardening, and JIT keeps management ports closed until they are needed."
  ],
  "analogy": "JIT access works like a hotel key card. The door is always locked, and the front desk programs a card that opens only your room, only for the nights you booked, and keeps a record of who received it. Arc is like registering a guest who arrived from a different hotel so the front desk knows they exist. The analogy breaks for on-premises servers: the Azure front desk cannot program locks in a building it does not control, which is why JIT applies only to Azure VMs.",
  "terms": [
   [
    "Defender for Cloud",
    "Azure's security posture management and workload protection service for Azure, hybrid and multicloud resources."
   ],
   [
    "Defender for Servers Plan 1",
    "The server plan focused on endpoint protection through Microsoft Defender for Endpoint integration."
   ],
   [
    "Defender for Servers Plan 2",
    "The server plan that adds features such as JIT VM access, file integrity monitoring and agentless scanning to Plan 1."
   ],
   [
    "Azure Arc-enabled server",
    "An on-premises or other-cloud machine running the Connected Machine agent so it appears as a resource in Azure."
   ],
   [
    "Recommendation",
    "A Defender for Cloud finding describing a security weakness on a resource and how to remediate it."
   ],
   [
    "Secure score",
    "A measure of security posture that rises as you remediate recommendations."
   ],
   [
    "Just-in-time VM access",
    "A feature that blocks management ports by default and opens them only for approved requests, source IPs and time windows."
   ]
  ],
  "example": "An organization enables Defender for Servers Plan 2 on its production subscription and onboards 40 on-premises servers through Azure Arc. The recommendations list shows RDP open to the internet on two Azure VMs; the admin enables JIT, and from then on engineers request three-hour RDP access from their office IP, which closes automatically. The activity log shows each request, and the secure score rises after the management ports recommendation is resolved.",
  "mistakes": [
   [
    "Plan 1 is enough for just-in-time VM access.",
    "JIT, like file integrity monitoring, is a Plan 2 feature. Plan 1 covers Defender for Endpoint integration."
   ],
   [
    "You can onboard an on-premises server to Defender for Servers by installing Defender for Endpoint alone.",
    "The standard route into Defender for Cloud is Azure Arc: install the Connected Machine agent so the server becomes an Azure resource in a subscription with the plan enabled."
   ],
   [
    "JIT protects on-premises Arc servers as well as Azure VMs.",
    "JIT works by editing NSG or Azure Firewall rules, so it applies to Azure VMs. On-premises servers rely on your own firewalls."
   ],
   [
    "Exempting a recommendation fixes the weakness.",
    "An exemption only stops a recommendation from counting for a resource where it does not apply. It does not change the resource's configuration."
   ]
  ],
  "tryit": [
   [
    "A company has 25 Azure VMs and 30 on-premises Windows Servers. Leadership wants EDR on all of them and wants file integrity monitoring on the 10 servers that host payment software. The on-premises servers have never been connected to Azure. What do you need to do?",
    "Onboard the 30 on-premises servers to Azure Arc with the Connected Machine agent, then enable Defender for Servers on the subscriptions. File integrity monitoring requires Plan 2, so the subscription holding the payment servers needs Plan 2; Plan 1 would cover EDR alone but not file integrity monitoring."
   ],
   [
    "An engineer complains that since JIT was enabled on a jump-box VM, RDP times out. She checks and sees no approved request in the portal. What should she do, and what will happen on the NSG?",
    "She should submit a JIT access request for TCP 3389 from her source IP for the time she needs. If her RBAC permissions allow it, Defender for Cloud adds a temporary allow rule for her IP above the deny rule, then removes it when the window ends."
   ]
  ],
  "tip": "On-premises servers reach Defender for Cloud through Azure Arc. JIT and file integrity monitoring mean Plan 2, and JIT applies to Azure VMs via NSG or Azure Firewall rules.",
  "check": [
   [
    "How do you bring an on-premises Windows Server under Defender for Servers?",
    "Onboard it to Azure Arc with the Connected Machine agent in a subscription where Defender for Servers is enabled."
   ],
   [
    "What does JIT change on the VM's network security group?",
    "It adds deny rules for the protected management ports and, on approved requests, temporarily adds allow rules for the requester's IP and time window."
   ],
   [
    "Which Defender for Servers plan is needed for just-in-time VM access?",
    "Plan 2."
   ],
   [
    "What raises the secure score most effectively?",
    "Remediating the recommendations with the highest impact on the affected resources."
   ]
  ]
 },
 {
  "t": "Encryption: BitLocker on servers and Azure VM disk encryption options; SMB signing and encryption",
  "hook": "A courier van carrying a branch office server for Lakeshore Insurance was broken into overnight, and the server is gone. At 9 a.m. the compliance officer, Grace, calls you: is customer data on that disk readable? Before you can answer, she adds a second question from the regulator's checklist. The company's new file servers in Azure must use keys the company controls, and file traffic between offices must not be readable on the wire. You know Windows Server and Azure offer several kinds of encryption, and they protect different things in different places. Which ones would have saved the stolen server, and which ones satisfy the regulator?",
  "simple": "Encryption scrambles data so that only someone with the right key can read it. There are two moments when data needs that protection. At rest means data sitting on a disk, which matters if the disk is stolen. In transit means data moving across the network, which matters if someone is listening. On a Windows Server in your building, BitLocker scrambles whole disks. In Azure, virtual machine disks are scrambled automatically, and you can choose who holds the key and how much of the machine is covered. For files moving between computers, SMB (the file sharing language Windows uses) can sign messages so nobody can alter them, or fully encrypt them so nobody can read them. It is like locking a filing cabinet versus using a sealed, tamper-proof envelope in the mail.",
  "body": [
   "Encryption protects data in two states: at rest on disks and in transit across the network. For the Windows Server exam you need three groups of tools. BitLocker protects on-premises disks. Azure offers several layers of encryption for virtual machine (VM) disks, and the questions turn on which layer does what. SMB (Server Message Block) signing and encryption protect file traffic between Windows machines. The skill being tested is matching the requirement, such as a stolen disk, customer control of keys or unreadable file traffic, to the right tool.",
   "BitLocker Drive Encryption encrypts whole volumes so that a stolen disk or server is unreadable without the key. On Windows Server it is an optional feature, so you add it first with `Install-WindowsFeature BitLocker -IncludeAllSubFeature -IncludeManagementTools` and restart. The operating system volume is normally protected by the TPM (Trusted Platform Module), a chip that releases the key only if the boot components are unchanged, which defeats someone booting the disk in another machine or tampering with the boot process. Data volumes can then use auto-unlock so they open automatically once the OS volume is unlocked. Always add a recovery password protector and back it up, for example to AD DS (Active Directory Domain Services) by Group Policy, because a firmware update or hardware change can alter the TPM measurements and leave the server asking for the recovery key at boot.",
   "A few commands are worth recognizing. `Enable-BitLocker -MountPoint C: -TpmProtector` turns on encryption with the TPM, `Add-BitLockerKeyProtector -MountPoint C: -RecoveryPasswordProtector` adds the recovery password, and `manage-bde -status` reports encryption percentage and protectors for each volume. Datacenter servers that use a TPM plus PIN for stronger protection but must restart unattended can use BitLocker Network Unlock, which releases the key automatically when the server boots on the trusted wired corporate network; off that network, the PIN is still required. BitLocker also supports Cluster Shared Volumes, and it is especially valuable for branch office servers, which often sit in a closet with weak physical security and are exactly the servers that get stolen.",
   "Azure VM disks are encrypted in several layers, and it helps to picture where each one sits. Server-side encryption (SSE) is always on for managed disks: data is encrypted at rest in Azure Storage, with platform-managed keys by default, and you do nothing to get it. When policy says the company must control and rotate the key, you switch SSE to customer-managed keys stored in Azure Key Vault, linked to disks through a disk encryption set. Encryption at host goes further: the VM's temporary disk and the OS and data disk caches on the physical host are encrypted too, and data is encrypted on the host before it flows to storage. Azure Disk Encryption (ADE) is the older option that runs BitLocker inside the Windows guest, with keys kept in Key Vault; Microsoft has announced its retirement and recommends encryption at host for new deployments. Confidential VMs add confidential disk encryption that binds disk keys to the VM's virtual TPM.",
   "The easiest way to answer Azure encryption questions is to ask where the encryption happens. SSE encrypts in the storage service. Encryption at host encrypts on the Hyper-V host before the data reaches storage. ADE encrypts inside the guest operating system. From that, the scenarios sort themselves. If a question asks whether disks are encrypted when you configure nothing, the answer is yes, SSE with platform-managed keys. If it asks how to control your own keys, think customer-managed keys in Key Vault through a disk encryption set. If it mentions the temporary disk or caches, think encryption at host. If it describes BitLocker running inside the VM, that is ADE, the legacy option.",
   "For data in transit between Windows machines, SMB offers two protections you met in the SMB security lesson, and they solve different problems. SMB signing adds a cryptographic signature to each message. That protects integrity and prevents relay and tampering attacks, but the traffic is still readable by anyone capturing it. SMB encryption, available in SMB 3.x, encrypts the payload end to end, giving both confidentiality and integrity. You can require it on one share with `Set-SmbShare -Name Finance -EncryptData $true` or for the whole server with `Set-SmbServerConfiguration -EncryptData $true`, and clients that do not support SMB 3 encryption are refused access to encrypted shares by default. Newer Windows versions require signing by default in more cases, and signing is unnecessary on a connection that is already encrypted, because encryption already provides integrity.",
   "In a packet capture or audit, the difference is visible. With signing only, you can still read file names and contents in a network trace; with encryption, you see encrypted SMB3 transform headers and no readable data. That is why a requirement that file contents must not be readable on the network points to SMB encryption, while a requirement to stop relay or man-in-the-middle tampering can be met with signing.",
   "A complete design for a sensitive file server pulls these together: BitLocker with a TPM and an escrowed recovery password on the server's volumes, SMB encryption on its shares, and, if it runs in Azure, customer-managed keys plus encryption at host on its disks. Each layer covers a different threat: theft of the disk, interception on the wire and control of the keys in the cloud."
  ],
  "analogy": "Picture valuables moving between banks. BitLocker is the locked safe in the branch office: if thieves carry it away, they still cannot open it. SSE is the bank's own vault where everything is stored locked by default; customer-managed keys mean you hold the vault key instead of the bank. SMB signing is a tamper-evident seal on the delivery bag, while SMB encryption is an opaque, locked bag. The analogy is imperfect because a seal on a real bag hides nothing, and neither does signing.",
  "terms": [
   [
    "BitLocker",
    "Windows full-volume encryption, usually protected by a TPM, with recovery passwords that should be backed up to AD DS."
   ],
   [
    "TPM",
    "Trusted Platform Module: a hardware or virtual chip that stores keys and releases the BitLocker key only if boot components are unchanged."
   ],
   [
    "BitLocker Network Unlock",
    "A feature that automatically unlocks BitLocker-protected servers at boot when they are on the trusted wired corporate network."
   ],
   [
    "Server-side encryption",
    "Always-on encryption of Azure managed disks at rest, with platform-managed or customer-managed keys."
   ],
   [
    "Disk encryption set",
    "An Azure resource that links managed disks to a customer-managed key in Azure Key Vault."
   ],
   [
    "Encryption at host",
    "Azure encryption performed on the VM's host, covering temp disks and disk caches as well as data flowing to storage."
   ],
   [
    "Azure Disk Encryption",
    "The older option using BitLocker inside the guest with keys in Key Vault, announced for retirement."
   ],
   [
    "SMB encryption",
    "SMB 3.x protection that encrypts file traffic, giving confidentiality and integrity; signing alone gives integrity only."
   ]
  ],
  "example": "A regulated company requires control of its own encryption keys and encryption of every byte on the VM host. For its Azure file servers it creates a disk encryption set pointing to a key in Key Vault for customer-managed SSE, enables encryption at host on the VMs, and requires SMB encryption on the shares. On-premises branch servers use BitLocker with TPM protectors and recovery passwords backed up to AD DS, so a stolen branch server reveals nothing.",
  "mistakes": [
   [
    "Azure managed disks are unencrypted until you enable Azure Disk Encryption.",
    "Server-side encryption with platform-managed keys is always on for managed disks. ADE is an optional, legacy in-guest layer."
   ],
   [
    "SMB signing keeps file contents confidential.",
    "Signing protects integrity and blocks relay attacks, but traffic remains readable. Confidentiality requires SMB encryption."
   ],
   [
    "Customer-managed keys encrypt the temporary disk and caches.",
    "Customer-managed keys change who controls the SSE key in storage. Covering the temp disk and host caches requires encryption at host."
   ],
   [
    "Once BitLocker uses the TPM, a recovery password is unnecessary.",
    "TPM measurements can change after firmware or hardware changes, and then the volume needs the recovery password. Always create one and back it up."
   ]
  ],
  "tryit": [
   [
    "You are designing a new Azure VM that will hold medical records. The security policy says: the company must be able to rotate and revoke the disk encryption key, and no unencrypted data may exist on the physical host, including temporary files. Your colleague suggests Azure Disk Encryption. What do you recommend instead?",
    "Use server-side encryption with customer-managed keys through a disk encryption set and Key Vault, so the company controls and rotates the key, and enable encryption at host so the temp disk and caches are encrypted on the host. ADE is the legacy in-guest option that Microsoft has announced for retirement and recommends replacing with encryption at host."
   ],
   [
    "A branch file server sits in an unlocked closet, and users at headquarters open its shares over a link the network team says might be monitored by a contractor's equipment. Which two controls address these risks?",
    "BitLocker on the server's volumes, with a TPM protector and a backed-up recovery password, protects against theft of the server. Requiring SMB encryption on the shares protects the file contents in transit over the link."
   ]
  ],
  "tip": "Where the encryption happens is the key: SSE in storage (always on), encryption at host on the host (covers temp disk and cache), ADE inside the guest via BitLocker. Customer control of keys means customer-managed keys in Key Vault. Signing is integrity; encryption is confidentiality plus integrity.",
  "check": [
   [
    "Which Azure option encrypts a VM's temporary disk and disk caches without running anything inside the guest?",
    "Encryption at host."
   ],
   [
    "What should you always do after enabling BitLocker on a server's OS volume?",
    "Create a recovery password protector and back it up, for example to AD DS, so the volume can be recovered if TPM validation fails."
   ],
   [
    "Are Azure managed disks encrypted if you configure nothing?",
    "Yes. Server-side encryption with platform-managed keys is always on for managed disks."
   ],
   [
    "A requirement says file contents must not be readable on the network. Is SMB signing enough?",
    "No. Signing protects integrity only; SMB encryption is needed for confidentiality."
   ]
  ]
 },
 {
  "t": "Performance Monitor counters and data collector sets; baselines; Resource Monitor",
  "hook": "Every morning at 8:15, the help desk at Bluewater Manufacturing gets the same ticket: the reporting server is slow again. By 10 a.m. it is fine, and by the time anyone logs in to look, there is nothing to see. Marcus, the operations manager, wants an answer by Friday and asks whether you should just add more memory. You could guess. Or you could have the server record its own vital signs every morning and compare them with a normal day. Which resource is actually running out at 8:15, and how will you prove it?",
  "simple": "When a computer feels slow, one of four things is usually overworked: the processor (the brain), memory (the short-term workspace), the disk (long-term storage) or the network (the connection to others). Windows has two tools to find which one. Performance Monitor is like a fitness tracker: it records measurements over hours or days so you can look back later. Resource Monitor is like looking at someone right now to see what they are doing: it shows which program is using what at this moment. A baseline is a recording made on a normal, healthy day, like knowing your usual resting heart rate. When something feels wrong, you compare today's numbers with the normal ones, and the difference points to the problem.",
  "body": [
   "When users say a server is slow, you need data, not guesses. Adding memory to a server that is actually waiting on its disk costs money and fixes nothing. Windows Server includes Performance Monitor for measuring and recording performance over time, and Resource Monitor for a live, per-process view of what is happening now. Used together with a baseline, they let you find the real bottleneck among the four usual suspects: processor, memory, disk or network.",
   "Performance Monitor, started with `perfmon`, reads performance counters. Every counter is named as object, instance and counter, written like `Processor(_Total)\\% Processor Time`. The object is the thing being measured (Processor), the instance is which one (here, the total across all cores, or a single core such as 0), and the counter is the measurement. You can add counters to a live graph to watch them, but the real value comes from recording them over time, because many problems, like the 8:15 slowdown, happen when nobody is watching.",
   "There is a short list of counters you should recognize. For the processor, `Processor\\% Processor Time` shows how busy the central processing units (CPUs) are; sustained high values suggest a CPU bottleneck. `System\\Processor Queue Length` shows threads waiting for a processor, and a queue that stays long confirms that work is backing up. For memory, `Memory\\Available MBytes` shows free memory, and low values mean memory pressure; `Memory\\Pages/sec` shows paging to and from disk, and consistently high values mean the server is short of random access memory (RAM). For disks, `PhysicalDisk\\Avg. Disk sec/Read` and `Avg. Disk sec/Write` show latency per operation in seconds, the clearest signal of a slow disk, while `Avg. Disk Queue Length` shows requests waiting. For the network, compare `Network Interface\\Bytes Total/sec` with the adapter's bandwidth. Rules of thumb for what counts as high exist, but a value that is alarming on one server is normal on another, which is exactly why baselines matter.",
   "To record data, you use data collector sets (DCS). A DCS saves its data to log files, usually binary `.blg` files that you can reopen later in Performance Monitor and scroll through like a recording. A DCS can combine performance counters, event trace data and system configuration information, such as registry keys. Windows includes system data collector sets, such as System Performance and System Diagnostics, which run for a short time and produce a ready-made report with warnings about resources that look overloaded. A user-defined DCS lets you choose your own counters, sample interval, duration, schedule and stop conditions, so you can record every weekday from 7:45 to 9:30, for example. You can also create a performance counter alert, which takes an action, such as writing an event to the Application log or starting another data collector set, when a counter crosses a threshold you set.",
   "Everything in the console can also be done from the command line, which helps when you manage many servers or work on Server Core. `logman` creates, starts, stops and queries data collector sets, and `relog` converts logs between formats such as `.blg` and `.csv`, or trims them to a time range or to a subset of counters. Reports from completed collections appear in Performance Monitor under Reports, System or Reports, User Defined.",
   "A baseline is a recording of normal performance, and it turns raw numbers into meaning. Capture it when the server is healthy, at typical and at peak times, such as month-end processing, and repeat it after major changes like a new application version or a hardware upgrade. Later, when there is a complaint, you compare current data with the baseline. If disk latency doubled while CPU and memory stayed where they always are, you know where to look. Baselines also support capacity planning: comparing baselines from several months shows trends, such as memory use creeping up, before they turn into outages.",
   "Resource Monitor, started with `resmon`, answers a different question: which process is doing it right now. It shows real-time CPU, memory, disk and network usage broken down by process and service, and it goes further than Task Manager. The Disk tab lists the files each process is reading and writing, and the Network tab lists Transmission Control Protocol (TCP) connections and listening ports with the owning process. On the CPU tab, Associated Handles has a search box: type part of a file name to find which process has that file locked, which is invaluable when a file cannot be deleted or replaced. Right-clicking a process and choosing Analyze Wait Chain shows what a hung process is waiting on, such as another process or a network call. The limitation is that Resource Monitor only shows the present; it keeps no history, so it complements Performance Monitor rather than replacing it.",
   "The practical workflow combines them. Use a scheduled data collector set to capture the problem period and compare it with the baseline to identify which resource is saturated. Then, during the next occurrence, open Resource Monitor to see which process is responsible. In your lab, create a user-defined DCS with CPU, memory, disk and network counters, generate a load, stop the collection and open the report under Reports, User Defined. Look for the resource that is saturated while the others are idle; that is your bottleneck."
  ],
  "analogy": "Performance Monitor with data collector sets is a home security camera that records all night, so in the morning you can rewind to 3 a.m. and see when the window opened. Resource Monitor is looking out the window right now: you see exactly who is in the yard, but only while you are looking. A baseline is the footage from an ordinary night that tells you what normal looks like. The camera tells you what happened and when; the window tells you who is doing it now.",
  "terms": [
   [
    "Performance counter",
    "A named measurement (object, instance, counter) such as Processor(_Total)\\% Processor Time."
   ],
   [
    "Data collector set",
    "A saved configuration that records counters, traces and configuration data to log files on demand or on a schedule."
   ],
   [
    "Baseline",
    "A recording of normal performance used as a reference for troubleshooting and capacity planning."
   ],
   [
    "Performance counter alert",
    "A DCS type that takes an action when a counter crosses a defined threshold."
   ],
   [
    "Avg. Disk sec/Read",
    "A PhysicalDisk counter showing average latency per read; high values relative to baseline indicate a disk bottleneck."
   ],
   [
    "Resource Monitor",
    "A real-time tool showing CPU, memory, disk and network usage per process, with handle search and wait chain analysis."
   ],
   [
    "logman and relog",
    "Command-line tools to manage data collector sets and to convert or trim performance logs."
   ]
  ],
  "example": "Users report slow reports from a SQL server every morning. The admin schedules a data collector set for 7:45 to 9:30 and compares it with the baseline: CPU and memory are normal, but Avg. Disk sec/Read on the data volume is several times higher than baseline. Resource Monitor's Disk tab during the slow period shows a backup job reading the same volume, so the backup is moved to the evening and the next morning's recording matches the baseline.",
  "mistakes": [
   [
    "High % Processor Time alone proves the server needs more CPUs.",
    "Confirm with Processor Queue Length and compare with the baseline. Short spikes are normal; a sustained high value with a long queue suggests a real CPU bottleneck."
   ],
   [
    "Resource Monitor is the tool for finding what happened overnight.",
    "Resource Monitor shows only the present. For history, record with a data collector set and review it in Performance Monitor."
   ],
   [
    "Avg. Disk Queue Length is the best single disk counter.",
    "Latency counters, Avg. Disk sec/Read and Avg. Disk sec/Write, are the clearest disk bottleneck signal, especially on modern storage where queue length is hard to interpret."
   ],
   [
    "A baseline is only needed when a problem starts.",
    "A baseline must be captured while the server is healthy; once the problem has started, you no longer know what normal looks like."
   ]
  ],
  "tryit": [
   [
    "An application team says their server slows down every afternoon. You record a data collector set and find `Memory\\Available MBytes` drops close to zero around 2 p.m., while `Memory\\Pages/sec` climbs and stays high. CPU and disk latency are near baseline except for the paging disk. What is the bottleneck and what do you do next?",
    "The bottleneck is memory: low available memory with sustained high paging means the server is short of RAM, and the disk activity is a symptom of paging. Next, use Resource Monitor's Memory tab during the afternoon to see which process is growing, then decide between fixing that process and adding memory."
   ],
   [
    "An administrator cannot replace a log file because Windows says it is in use by another process. Which tool and feature do you use, and why not Performance Monitor?",
    "Use Resource Monitor, CPU tab, Associated Handles, and search for the file name to find the process holding it. Performance Monitor measures counters over time and cannot show which process has a file handle open."
   ]
  ],
  "tip": "For history and trends use Performance Monitor with data collector sets; for which process is doing it right now use Resource Monitor. Disk latency counters (Avg. Disk sec/Read or Write) are the clearest disk bottleneck signal, and every value means more next to a baseline.",
  "check": [
   [
    "Which two counters best indicate memory pressure?",
    "Memory\\Available MBytes being low and Memory\\Pages/sec being consistently high."
   ],
   [
    "Why capture a baseline when the server is healthy?",
    "So you have normal values to compare against during problems and can spot trends for capacity planning."
   ],
   [
    "Which tool helps you find which process has a file locked?",
    "Resource Monitor, using Associated Handles search on the CPU tab."
   ],
   [
    "What can a performance counter alert do when a threshold is crossed?",
    "Take an action such as logging an event or starting another data collector set."
   ]
  ]
 },
 {
  "t": "Event logs, custom views and event subscriptions (Windows Event Forwarding)",
  "hook": "It is 11:20 p.m. at Pinecrest County Schools, and Lena on the security team messages you: an account in the business office has locked out four times tonight. Which server is the attempts coming from? You have 120 member servers. Opening Event Viewer on each one, one at a time, would take until morning, and by then some of the evidence may have rolled out of the logs. What you want is a single screen where every failed logon from every server is already waiting, filtered and sorted. Windows can do that with nothing extra to buy. How do you set it up, and why does the choice of subscription type matter at this scale?",
  "simple": "Windows keeps a diary of what happens on each computer, called the event log. Every entry says when something happened, what kind of thing it was (an error, a warning or just information) and a number that identifies the type of event. Because there are thousands of entries, you can save filters, called custom views, that show only what you care about, such as failed sign-ins. When you look after many servers, Windows Event Forwarding copies chosen diary entries from all of them to one collecting computer. It is like each classroom teacher sending their attendance slips to the main office, so the principal can see the whole school's absences on one sheet instead of visiting every room.",
  "body": [
   "Windows records what happens on a server in event logs, and they are often the first place to look when something breaks or when you investigate a security incident. As a server administrator you need three skills: navigate logs quickly, filter them into custom views, and collect events from many servers in one place with Windows Event Forwarding (WEF). Each builds on the one before.",
   "Event Viewer, opened with `eventvwr.msc`, groups logs into two main folders. Windows Logs contains Application (events from applications), Security (audit events such as logons and object access, controlled by audit policy), Setup, System (drivers and Windows components) and Forwarded Events (events collected from other computers). Applications and Services Logs holds per-component logs such as Directory Service, DNS (Domain Name System) Server and DFS (Distributed File System) Replication on servers with those roles, plus many operational logs under Microsoft, Windows. Every event has a level (Critical, Error, Warning, Information, or Audit Success and Audit Failure in the Security log), a source, an event ID, a timestamp, and usually a user and computer. A handful of Security IDs come up constantly: 4624 is a successful logon, 4625 a failed logon and 4740 an account lockout. On a domain controller, the 4740 event also records the caller computer name, which tells you where the lockout attempts came from.",
   "Custom views are saved filters, and unlike a simple filter on one log, they can span multiple logs. You build one with Create Custom View, filtering by level, time range, log or source, event ID, keywords, user or computer. For more control, the XML tab lets you write an XPath query directly, for example selecting only 4625 events for a particular account. Server Manager creates Server Roles custom views automatically for installed roles, so a DNS server has a DNS Server view ready to use. Custom views can be exported and imported as XML files, which is a convenient way to give every administrator the same troubleshooting views.",
   "PowerShell does the same filtering and is better for searching many events. `Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625}` returns failed logons efficiently because the filter is applied by the event log service rather than after loading every event. You can add `StartTime`, use `-ComputerName` for a remote server, or pass an XPath query with `-FilterXPath`. Event Viewer can also attach a scheduled task to an event, through Attach Task To This Event, so that a specific ID appearing triggers a script or notification. That is useful for a single important event on a single server, but it does not scale to a whole fleet.",
   "Windows Event Forwarding solves the fleet problem. It sends selected events from source computers to a collector, where they land in the Forwarded Events log by default. WEF is built into Windows and uses Windows Remote Management (WinRM), which is based on the WS-Management protocol, for transport, plus the Windows Event Collector service on the collector. To prepare the collector, run `wecutil qc`, which configures and starts the Windows Event Collector service. On sources, WinRM must be enabled, either with `winrm quickconfig` or by Group Policy. A subscription, created in the Subscriptions node of Event Viewer on the collector or with `wecutil cs`, defines which events to collect, from which computers and how they are delivered.",
   "There are two subscription types, and choosing between them is a frequent exam question. In a collector-initiated subscription, you list the source computers in the subscription itself, and the collector pulls events from them. It suits a small, fixed set of servers. The account the collector uses must be able to read the logs on each source, which typically means adding that account, or the collector's computer account, to the built-in Event Log Readers group on every source. In a source-initiated subscription, the sources push events to the collector. You configure sources with the Group Policy setting Configure target Subscription Manager, which points to the collector's subscription manager address, and in the subscription you allow source computers by Active Directory group, such as Domain Computers or a group of member servers. Any computer that receives the policy and belongs to the group starts forwarding automatically, so it scales well to many computers or to computers that come and go.",
   "One permission trips people up. On sources, the forwarding is done by the Network Service account, which by default cannot read the Security log. To forward Security events, grant Network Service read access to that log, for example by adding it to Event Log Readers or by adjusting the log's channel access through Group Policy. If Security events never arrive while System events do, this is usually why.",
   "Finally, delivery options control how fast events arrive and how much bandwidth they use. Normal batches events for reliable delivery, Minimize Bandwidth sends less often to save network traffic, and Minimize Latency delivers events as quickly as possible, which suits security monitoring. To check whether a subscription is working, run `wecutil gr <subscription name>` on the collector, or open Runtime Status for the subscription in Event Viewer; both list each source with its state and last error. Once events arrive, a custom view on the collector, such as only 4625 events, turns Forwarded Events into a usable investigation screen."
  ],
  "analogy": "Collector-initiated is like a teacher who walks to each of five classrooms on a list and collects attendance slips, which works when there are only a few rooms and they never change. Source-initiated is like a school rule that says every classroom sends its slips to the main office each morning; new classrooms follow the rule automatically. The analogy misses one detail: the classrooms still need permission to read the slips they send, which is why the Network Service account needs access to the Security log.",
  "terms": [
   [
    "Event ID",
    "A number identifying the type of event, such as 4625 for a failed logon or 4740 for an account lockout."
   ],
   [
    "Custom view",
    "A saved Event Viewer filter across one or more logs, exportable as XML."
   ],
   [
    "Windows Event Forwarding",
    "A built-in feature that forwards selected events from source computers to a collector over WinRM."
   ],
   [
    "Collector-initiated subscription",
    "A subscription in which the collector pulls events from computers listed in the subscription."
   ],
   [
    "Source-initiated subscription",
    "A subscription in which sources, configured by Group Policy, push events to the collector; best for many computers."
   ],
   [
    "Event Log Readers",
    "A built-in local group whose members can read event logs, used to grant a collector access."
   ],
   [
    "Forwarded Events",
    "The Windows log on the collector where subscribed events arrive by default."
   ]
  ],
  "example": "A security team wants every failed logon from 200 member servers in one place. They configure a source-initiated subscription on a collector for Security event 4625 with Minimize Latency delivery, deploy a GPO that sets the target subscription manager and grants Network Service read access to the Security log, and create a custom view on the collector that shows only 4625 events sorted by account name. When a new server joins the member servers group, its events start arriving without any change to the subscription.",
  "mistakes": [
   [
    "Collector-initiated subscriptions are best for large, changing environments.",
    "Collector-initiated requires listing each source in the subscription. Large or changing fleets suit source-initiated subscriptions configured by Group Policy."
   ],
   [
    "Forwarded events land in the Application or Security log on the collector.",
    "By default they go to the Forwarded Events log under Windows Logs."
   ],
   [
    "WEF uses SMB or RPC to copy log files.",
    "WEF uses WinRM, based on WS-Management, and forwards individual events rather than copying log files."
   ],
   [
    "If System events forward, Security events will too.",
    "The Network Service account on sources needs read access to the Security log; without it, Security events are not forwarded."
   ]
  ],
  "tryit": [
   [
    "You are asked to collect System log errors from three file servers that never change. You have no rights to edit Group Policy. Which subscription type do you use, and what permission must you set on the file servers?",
    "Use a collector-initiated subscription listing the three servers, since it needs no Group Policy and suits a small, fixed set. Add the collector's account, or its computer account, to the Event Log Readers group on each file server, and make sure WinRM is enabled on them."
   ],
   [
    "After setting up a source-initiated subscription for Security events 4624 and 4625, the collector shows all 150 servers as active, but only System test events arrive; no Security events appear. What is the most likely cause?",
    "The Network Service account on the sources lacks read access to the Security log. Grant it access, for example through Group Policy by adding it to Event Log Readers or adjusting the Security log channel access, then check Runtime Status again."
   ]
  ],
  "tip": "Collector-initiated equals pull from a listed set; source-initiated equals push configured by Group Policy, better for many computers. WEF rides on WinRM, and forwarded events arrive in the Forwarded Events log. Security log forwarding needs Network Service read access on sources.",
  "check": [
   [
    "Which subscription type suits hundreds of servers that are added and removed regularly?",
    "Source-initiated, because sources are configured by Group Policy to push events and new computers join automatically."
   ],
   [
    "Where do forwarded events appear on the collector by default?",
    "In the Forwarded Events log under Windows Logs."
   ],
   [
    "What protocol does Windows Event Forwarding use?",
    "Windows Remote Management (WinRM), which is based on WS-Management."
   ],
   [
    "What command prepares a collector for Windows Event Forwarding?",
    "wecutil qc, which configures and starts the Windows Event Collector service."
   ]
  ]
 },
 {
  "t": "Windows Admin Center alerts and System Insights predictive capacity",
  "hook": "On a Saturday morning, the archive file server at Redwood Legal Services runs out of disk space, and Monday's scanned court filings have nowhere to go. Looking back, the warning signs were obvious: the volume had been filling a little faster every week for two months. Nobody saw it because nobody had Windows Admin Center open on a weekend, and nothing was watching the trend. Samir, the office manager, asks a fair question: if the server knew it was filling up, why did it not say so? What would it take for the server to forecast its own shortage, and for someone to be told before the weekend?",
  "simple": "Windows Admin Center is a website-style control panel you open in your browser to look after servers. It shows charts and health warnings, but only while you are looking at it. To get warnings sent to you when nobody is watching, you connect it to Azure Monitor, a cloud service that watches around the clock and emails you. System Insights is a feature that lives on the server itself and studies its own history, like how fast the disk has been filling up, to predict when it will run out. It is like a car that notices you have been using more fuel every week and warns you that, at this rate, you will run out on Thursday. It does all this on the server, without sending data anywhere.",
  "body": [
   "Monitoring should warn you before a problem hurts users, not after. This lesson covers two tools that help. Windows Admin Center (WAC) gives you a browser-based dashboard for servers and clusters, with health information and the ability to connect servers to Azure alerting. System Insights adds on-box predictive analytics that forecast when capacity will run out. They solve different problems, and the exam expects you to keep their roles straight.",
   "Windows Admin Center is a free, locally deployed management tool that you open in a web browser. You install it on a gateway server or a management workstation, add connections to servers and clusters, and then manage them without Remote Desktop. For a single server, the Overview page shows CPU (central processing unit), memory and network charts, and the left-hand tools cover events, performance monitoring, storage, updates, roles and features, certificates, firewall and more. For failover clusters and Azure Local (hyper-converged) clusters, the dashboard surfaces Health Service faults, such as a failed drive, a node that is down or a volume running low, as alerts you can click into for details and recommended actions.",
   "The important limitation is that WAC is a console, not a monitoring service. When nobody has it open in a browser, it is not continuously watching servers or sending notifications. For real, always-on alerting you integrate with Azure Monitor. From a server's Azure hybrid services or Azure Monitor tool, WAC walks you through connecting the server to Azure, typically by onboarding it to Azure Arc, installing the Azure Monitor agent and setting up alert rules with email notifications. Common starter rules cover high CPU, low free disk space and a server that stops sending heartbeats. After that, the alerts fire whether or not anyone has WAC open.",
   "System Insights is a Windows Server feature, available in Windows Server 2019 and later, that runs machine learning models locally on the server. It uses performance and event data the server already collects, analyzes the history and forecasts future usage. No data is sent to the cloud, which matters for organizations with strict data residency rules or servers without internet access. Install it with `Install-WindowsFeature System-Insights -IncludeManagementTools`. For a graphical view, add the System Insights extension in Windows Admin Center, which lists each capability, its latest result and a chart of the forecast.",
   "System Insights ships with four default capabilities, each forecasting one resource: CPU capacity forecasting, networking capacity forecasting, total storage consumption forecasting, and volume consumption forecasting. Each capability runs on a schedule and returns one of five statuses. OK means the forecast does not predict a problem within the forecast horizon. Warning and Critical mean the model predicts the resource will exceed its capacity within the forecast horizon, with Critical meaning sooner. Error means the capability failed to run, and None usually means there is not yet enough history to make a prediction. A newly installed server therefore often shows None for a while, and the right response is to give it time to gather data rather than to reinstall the feature.",
   "You manage System Insights mainly with PowerShell. `Get-InsightsCapability` lists capabilities and whether each is enabled. `Invoke-InsightsCapability -Name \"CPU capacity forecasting\"` runs a prediction on demand instead of waiting for the schedule. `Get-InsightsCapabilityResult -Name \"Volume consumption forecasting\"` shows the latest result, and adding `-History` shows earlier ones. `Set-InsightsCapabilitySchedule` changes when a capability runs, and `Enable-InsightsCapability` or `Disable-InsightsCapability` turn capabilities on or off.",
   "The most useful automation is the capability action. With `Set-InsightsCapabilityAction` you attach a PowerShell script that runs automatically when a capability returns a particular status, and you supply the credentials the script runs under. For example, you might attach a disk cleanup script to volume consumption forecasting for the Warning status, and a script that opens a ticket for the Critical status. System Insights also writes its results to the event log, under the Microsoft, Windows, System-Insights logs, so you can forward those events or collect them with Azure Monitor and alert on them centrally.",
   "Keep the three roles clear, because exam distractors mix them up. Windows Admin Center is the console, and it can wire servers into Azure Monitor alerts. System Insights is a local prediction engine that forecasts capacity and can run scripts when its status changes. Azure Monitor is where centralized, always-on alerting happens, with notifications to people through action groups. In the Redwood scenario, System Insights would have turned volume consumption forecasting to Warning weeks earlier, a capability action could have run a cleanup, and Azure Monitor could have emailed the storage team on a Friday afternoon."
  ],
  "analogy": "System Insights is like a car's range estimate: it looks at your recent driving and predicts how far you can go before the tank is empty, all inside the car with no outside help. Windows Admin Center is the dashboard display, useful only while you are looking at it. Azure Monitor is a service that texts you when the range drops too low, even when you are not in the car. The comparison stops at accuracy: a range estimate updates constantly, while System Insights runs on a schedule and needs enough history first.",
  "terms": [
   [
    "Windows Admin Center",
    "A browser-based, locally deployed tool for managing servers, clusters and hybrid services."
   ],
   [
    "System Insights",
    "A Windows Server feature that runs local machine learning models to forecast resource capacity."
   ],
   [
    "Capability",
    "A System Insights prediction module, such as CPU capacity forecasting or volume consumption forecasting."
   ],
   [
    "Capability status",
    "The result of a capability run: OK, Warning, Critical, Error or None."
   ],
   [
    "Capability action",
    "A script attached with Set-InsightsCapabilityAction that runs automatically when a capability returns a given status."
   ],
   [
    "Health Service fault",
    "A cluster health alert, such as a failed drive or a node down, surfaced in the Windows Admin Center cluster dashboard."
   ]
  ],
  "example": "An admin installs System Insights on a busy file server and attaches a cleanup script to volume consumption forecasting for the Warning status. Three weeks later the forecast turns Warning for volume E:, the script deletes old temp exports automatically, and the event is also collected by Azure Monitor, which emails the storage team to order more disk before the volume fills.",
  "mistakes": [
   [
    "Windows Admin Center continuously monitors servers and emails you about problems.",
    "WAC is a console that shows data while it is open. For always-on alerting, connect servers to Azure Monitor and create alert rules."
   ],
   [
    "System Insights sends performance data to Azure to make its predictions.",
    "Its machine learning models run locally on the server; no data is sent to the cloud."
   ],
   [
    "A None status means the server has no problems.",
    "None usually means there is not yet enough data to predict. OK is the status that means no problem is forecast."
   ],
   [
    "Capability actions are configured with Set-InsightsCapabilitySchedule.",
    "The schedule cmdlet controls when a capability runs. Set-InsightsCapabilityAction attaches a script to a status."
   ]
  ],
  "tryit": [
   [
    "A government agency runs Windows Server 2022 file servers on an isolated network with no internet access. They want warnings weeks before volumes fill, and they want an automatic cleanup to run when the warning appears. What do you implement?",
    "Install System Insights, which forecasts locally without sending data to the cloud, and use volume consumption forecasting. Attach a cleanup script with Set-InsightsCapabilityAction for the Warning status. Azure Monitor is not an option without connectivity, but the System Insights events in the event log can feed local monitoring."
   ],
   [
    "A newly built server shows None for every System Insights capability two days after installation. Your colleague wants to reinstall the feature. What do you advise?",
    "Wait. None usually means the capability does not have enough history to make a forecast. Check again after the server has collected more data, and use Get-InsightsCapabilityResult or the event log if a capability returns Error instead."
   ]
  ],
  "tip": "System Insights predicts locally and returns OK, Warning, Critical, Error or None; None or Error often just means not enough data yet. WAC alone is not a 24x7 alerting system; pair it with Azure Monitor.",
  "check": [
   [
    "Does System Insights send server data to Azure for analysis?",
    "No. Its machine learning models run locally on the server using data the server already collects."
   ],
   [
    "Which cmdlet makes a script run automatically when a System Insights forecast becomes Critical?",
    "Set-InsightsCapabilityAction."
   ],
   [
    "Name the four default System Insights capabilities.",
    "CPU capacity forecasting, networking capacity forecasting, total storage consumption forecasting and volume consumption forecasting."
   ],
   [
    "How do you get email alerts for a server you manage in Windows Admin Center?",
    "Connect the server to Azure Monitor (typically through Azure Arc with the Azure Monitor agent) and create alert rules with notifications."
   ]
  ]
 },
 {
  "t": "Azure Monitor agent, data collection rules, VM insights and Log Analytics queries for hybrid servers",
  "hook": "Your phone buzzes at 6:05 a.m. It is Teresa, the operations lead at Granite Peak Credit Union: a branch server went silent overnight, and nobody noticed until tellers arrived and could not open the loan system. You have 30 Azure VMs and 60 servers in branch offices, and right now each one keeps its own logs. Meanwhile the security team wants failed logons from every server in one place, and finance has warned that last quarter's monitoring bill was too high. How do you collect exactly the right data from every server, Azure or not, query it in one place, and get woken up the moment a server stops reporting?",
  "simple": "Azure Monitor is a cloud service that gathers health information from many servers into one searchable place. A small program called the Azure Monitor agent sits on each server and sends the information. A set of instructions called a data collection rule tells the agent what to send, such as only error messages and a few performance numbers, and where to send it. The place it goes is a Log Analytics workspace, a big searchable database. You search it with a simple query language called KQL. Servers in your own building first need Azure Arc, which registers them in Azure. It is like a weather service: stations everywhere report readings, rules decide which readings matter, and forecasters search them all in one place.",
  "body": [
   "Azure Monitor gives you one place to collect logs and metrics from Azure VMs (virtual machines) and on-premises servers, query them and alert on them. For Windows Server the pieces are the Azure Monitor agent, data collection rules, a Log Analytics workspace, VM insights and Kusto Query Language (KQL) queries. Each piece has a specific job, and exam questions usually test whether you know which piece decides what.",
   "The Azure Monitor agent (AMA) is the current agent for collecting guest operating system data such as Windows event logs and performance counters. It replaced the legacy Log Analytics agent, also called the Microsoft Monitoring Agent (MMA), which is retired, so any migration question points to AMA and any answer that installs MMA for new work is wrong. On Azure VMs, AMA is installed as a VM extension. On-premises and other-cloud servers must first be connected to Azure Arc, because AMA is installed as an extension on the Arc-enabled server resource; you cannot simply install AMA on a non-Arc on-premises machine for this purpose. Deployment at scale is typically done with Azure Policy, which can install the agent and associate data collection rules automatically on every new VM or Arc server in a scope.",
   "What AMA collects is defined by data collection rules (DCRs), and this is the most important idea in the lesson. A DCR is an Azure resource that states the data sources and the destinations. Sources include specific Windows event logs and levels, optionally filtered with XPath queries, for example a query that selects only `EventID=4625` from the Security log to collect failed logons alone; performance counters with their sample rates; and text logs. Destinations are usually a Log Analytics workspace and optionally Azure Monitor Metrics. You associate a DCR with machines, and one machine can have several DCRs, so a security team and an operations team can each collect what they need without stepping on each other. Filtering in the DCR also saves money, because Log Analytics bills mainly by the volume of data ingested. Collecting the entire Security log from every server when the security team only needs a few event IDs is the most common cause of a surprise bill.",
   "VM insights is a ready-made monitoring experience built on the same pieces. When you enable it for a VM or Arc server, it uses a DCR that collects a standard set of performance counters into the `InsightsMetrics` table, and its workbooks show CPU, memory, disk and network trends across all your machines, with top-N charts that make the busiest servers easy to spot. Its optional Map feature uses the Dependency agent to show processes and network connections between machines, which helps you plan migrations, find unexpected dependencies and troubleshoot why one server cannot reach another.",
   "Data in a Log Analytics workspace is queried with KQL. A few tables come up constantly for servers. `Event` holds Windows event log entries, `Perf` holds performance counter samples, `Heartbeat` records a check-in from each agent roughly every minute, and `InsightsMetrics` holds VM insights data. A KQL query starts with a table and passes the results through operators separated by pipes, each one filtering, summarizing or shaping the data:",
   "```kusto\nPerf\n| where ObjectName == \"Processor\" and CounterName == \"% Processor Time\"\n| summarize avg(CounterValue) by Computer, bin(TimeGenerated, 15m)\n| render timechart\n\nHeartbeat\n| summarize LastSeen = max(TimeGenerated) by Computer\n| where LastSeen < ago(15m)\n```",
   "The first query averages CPU use per computer in 15-minute buckets and draws a chart. The second finds servers that stopped reporting: it takes the latest heartbeat for each computer and keeps only those whose last check-in is older than 15 minutes. A few operators cover most needs: `where` filters rows, `summarize` aggregates with functions such as `count()`, `avg()` and `max()`, `bin()` groups time into buckets, `project` chooses columns, `sort by` orders results, and `ago()` expresses relative time.",
   "Queries become alerts. You turn a query such as the heartbeat check into a log search alert rule that runs on a schedule and fires when results meet a condition, such as more than zero rows. Alerts trigger action groups, which are reusable sets of notifications and actions, such as email, SMS text message, a webhook, an Azure Automation runbook or a Logic App. Metric alerts on platform metrics, such as Azure VM Percentage CPU, react faster and need no agent at all, but they only cover Azure resources and the host-level view; guest details like a specific event ID or a Windows service need AMA data and a log search alert.",
   "Putting it together for a hybrid estate: onboard on-premises servers to Arc, deploy AMA everywhere with Azure Policy, write targeted DCRs for each team, enable VM insights for performance trends, and build log search alerts with action groups for the conditions that matter. The design gives one view across Azure and on-premises, with cost controlled by what the DCRs collect."
  ],
  "analogy": "A data collection rule is like a shopping list you give to a personal shopper, the agent. The list says exactly which items to buy and which store to deliver them to; several family members can each hand the same shopper their own list. A vague list that says buy everything in the Security aisle produces a huge bill. Where the comparison stops: the shopper keeps shopping continuously, sending new items as they appear, rather than making one trip.",
  "terms": [
   [
    "Azure Monitor agent",
    "The current agent that collects guest OS logs and performance data, deployed as an extension on Azure VMs and Arc servers."
   ],
   [
    "Data collection rule",
    "An Azure resource defining what data to collect from associated machines and where to send it."
   ],
   [
    "Log Analytics workspace",
    "The Azure Monitor data store for logs, queried with KQL and billed mainly by ingestion."
   ],
   [
    "KQL",
    "Kusto Query Language: the pipe-based query language used to search Log Analytics data."
   ],
   [
    "Heartbeat table",
    "The table where each agent records periodic check-ins, used to detect servers that stop reporting."
   ],
   [
    "VM insights",
    "A prebuilt Azure Monitor solution showing VM and Arc server performance, with an optional dependency map."
   ],
   [
    "Action group",
    "A reusable set of notifications and actions triggered by Azure Monitor alerts."
   ]
  ],
  "example": "A company onboards 60 on-premises servers to Azure Arc, uses Azure Policy to install AMA, and creates one DCR sending System and Application errors plus key performance counters to a workspace, and a second DCR collecting only Security events 4625 and 4740 for the SOC. A log alert on the Heartbeat query emails the on-call admin through an action group when any server stops reporting for 15 minutes.",
  "mistakes": [
   [
    "Install the Log Analytics agent (MMA) on new servers to send data to a workspace.",
    "MMA is legacy and retired. New deployments use the Azure Monitor agent with data collection rules."
   ],
   [
    "The Azure Monitor agent can be installed directly on any on-premises server without other setup.",
    "On-premises and other-cloud servers must be onboarded to Azure Arc first, because AMA is deployed as an extension on the Arc resource."
   ],
   [
    "The agent decides what to collect from its local configuration.",
    "Data collection rules, which are Azure resources associated with machines, define what AMA collects and where it sends it."
   ],
   [
    "A metric alert can detect a specific Windows event ID inside the guest.",
    "Metric alerts use platform metrics. Guest events need AMA collecting into a workspace and a log search alert."
   ]
  ],
  "tryit": [
   [
    "The security team asks for every Security log event from all 90 servers so they never miss anything. Finance says the monitoring budget cannot grow. The team's actual detections use event IDs 4625, 4740 and 4672. What do you propose?",
    "Create a dedicated DCR for the security team with an XPath filter collecting only those event IDs from the Security log, and associate it with all servers. Because Log Analytics bills mainly by ingestion, filtering at the DCR keeps cost down while meeting the detection needs, and it does not interfere with the operations team's own DCR."
   ],
   [
    "You need an alert when any server, Azure or on-premises, stops communicating. Should you use a metric alert on Percentage CPU or a log search alert, and on which table?",
    "Use a log search alert on the Heartbeat table, for example finding computers whose latest heartbeat is older than 15 minutes, with an action group to notify on-call staff. A Percentage CPU metric alert covers only Azure VMs and does not detect a missing agent check-in from on-premises servers."
   ]
  ],
  "tip": "Hybrid servers need Azure Arc before AMA. DCRs decide what is collected; filter there to control cost. MMA is legacy; any answer that installs it for new work is wrong. Heartbeat finds silent servers.",
  "check": [
   [
    "What must you do before installing the Azure Monitor agent on an on-premises Windows Server?",
    "Connect it to Azure Arc, because AMA is deployed as an extension on the Arc-enabled server resource."
   ],
   [
    "How do you collect only failed logon events instead of the whole Security log?",
    "Create a data collection rule with an XPath filter for Security event ID 4625 and associate it with the servers."
   ],
   [
    "Which Log Analytics table shows when each agent last checked in?",
    "The Heartbeat table."
   ],
   [
    "Can one server be associated with more than one data collection rule?",
    "Yes. Multiple DCRs can target the same machine, for example one for operations and one for security."
   ]
  ]
 },
 {
  "t": "Troubleshooting connectivity and name resolution (Test-NetConnection, Resolve-DnsName, ipconfig /flushdns)",
  "hook": "The ticket at Maplewood Veterinary Group says only: FILES01 IS DOWN, urgent. Over the weekend, Jordan from the infrastructure team moved the file server to a new IP address. Now half the clinics cannot open their shared folders, and the other half can. You ping the server and get no reply, and someone suggests restarting it. But the server looks perfectly healthy on its own console. Is it really down, is something blocking the way, or are some computers simply looking for it at the old address? You have a few commands and about ten minutes before the morning appointments start. Where do you begin?",
  "simple": "When one computer cannot reach another, there are a few simple questions to ask in order. Does my computer have a sensible address and know where to send traffic? Can I reach the other computer's address at all? Is the specific service, like file sharing, answering on its door? And is the name I typed being turned into the right address? That last step is DNS, the internet's phone book, which translates names into number addresses. Computers also keep a short-term memory of recent lookups, so after an address changes, a computer may keep dialing the old number until its memory expires or you clear it. It is like calling a friend from your saved contacts after they changed phone numbers.",
  "body": [
   "Most the-server-is-down tickets are really network or name resolution problems. A disciplined approach saves time: start with the local configuration, then test reachability, then the specific port, then name resolution, and change one thing at a time so you know what fixed it. Windows Server gives you PowerShell cmdlets and classic commands for each step, and knowing what each one actually tests is what lets you read the results correctly.",
   "Start with the local IP (Internet Protocol) configuration. `ipconfig /all` or `Get-NetIPConfiguration` shows the address, subnet mask, default gateway and DNS (Domain Name System) servers for each adapter. A few red flags explain many problems on their own. An address starting with 169.254 is an APIPA (Automatic Private IP Addressing) address, which Windows assigns when it cannot reach a DHCP (Dynamic Host Configuration Protocol) server. A missing default gateway means the computer can reach only its own subnet. DNS servers pointing to a public resolver on a domain member break Active Directory name lookups, because public resolvers know nothing about your internal zones and the SRV records that locate domain controllers. On Azure VMs, remember that the guest should be left on DHCP; the IP and DNS settings come from the network interface and virtual network configuration in Azure, and setting a static IP inside the guest can cut the VM off.",
   "Next, test reachability. `Test-NetConnection` combines several tools in one cmdlet. With just a name, `Test-NetConnection srv01` resolves the name and pings it, reporting `PingSucceeded`. With a port, `Test-NetConnection srv01 -Port 445` tells you whether a TCP (Transmission Control Protocol) connection succeeds, shown as `TcpTestSucceeded : True`. That is far more useful than ping, because many servers and firewalls block ICMP (Internet Control Message Protocol), the protocol ping uses, while the service port is wide open. `-TraceRoute` shows the path hop by hop, and `-CommonTCPPort RDP` or `-CommonTCPPort SMB` saves you remembering port numbers. Read the combination of results: if ping fails but the TCP test succeeds, ICMP is simply blocked and the service is fine. If both fail, look at routing, Windows Defender Firewall, network firewalls and, in Azure, network security groups.",
   "Two more classic tools complete the reachability picture. `tracert` and `pathping` show the route and, in the case of pathping, packet loss per hop over a longer sample. On the server side, `Get-NetTCPConnection -State Listen` or `netstat -ano` show which ports the server is actually listening on and which process ID owns each one, which answers the question of whether the service is running at all.",
   "For name resolution, `Resolve-DnsName` is the preferred cmdlet. `Resolve-DnsName srv01.contoso.com` uses the normal client resolution path, including the cache and hosts file, so it shows what applications see. `-Server 10.0.0.10` queries one specific DNS server, which lets you compare answers from different servers and spot one with a stale record. `-Type SRV` or `-Type MX` looks up other record types; for example, `Resolve-DnsName _ldap._tcp.dc._msdcs.contoso.com -Type SRV` lists the domain controllers clients can find. `-DnsOnly` skips other methods such as LLMNR (Link-Local Multicast Name Resolution) and NetBIOS, and `-NoHostsFile` ignores the hosts file. Remember that `nslookup` always queries a DNS server directly, bypassing the client cache and the hosts file, so it can disagree with what applications actually experience. That difference is itself a clue.",
   "The DNS client cache stores recent answers, including negative answers that say a name was not found, for the record's time to live (TTL). After you fix a record, a client may keep using the old address or the cached not-found answer until it expires. `ipconfig /displaydns` or `Get-DnsClientCache` shows the cache, and `ipconfig /flushdns` or `Clear-DnsClientCache` empties it so the next lookup goes to the DNS server. On the server side, `ipconfig /registerdns` makes a computer re-register its own A and PTR records with dynamic DNS, which is useful when a server's record is missing.",
   "Two local overrides deserve a check when results make no sense. The hosts file in `C:\\Windows\\System32\\drivers\\etc` maps names to addresses and takes priority over DNS queries, so a forgotten entry can silently send one computer to an old address. Name resolution policy table (NRPT) rules, listed with `Get-DnsClientNrptPolicy`, can send certain namespaces to specific DNS servers, for example through DirectAccess or a VPN (virtual private network) client, so a name may resolve differently depending on which rules apply.",
   "A good order to remember is configuration, then a ping or TCP test by IP, then a TCP test by name, then Resolve-DnsName against each DNS server. The interpretation follows directly. If it works by IP but not by name, the problem is name resolution. If it fails by IP too, the problem is the network path, a firewall or the service itself. In the Maplewood case, a TCP test to the new IP on port 445 succeeds, so the server is fine; the failing clinics are getting the old address from a cache, a hosts file or a DNS server that has not received the updated record."
  ],
  "analogy": "Troubleshooting connectivity is like delivering a parcel. First check your own van has fuel and a map (local configuration). Then check you can drive to the street (ping or route). Then check someone answers the specific door (the TCP port test). Finally check the address book gave you the right street number (DNS). The DNS cache is the old address you scribbled on your hand; until you wash it off, you keep driving to the old house. Ping is only a wave from the street, and some houses never wave back even when someone is home.",
  "mnemonic": "Check in this order: Config, IP, Name, DNS. Remember it as Can I Name DNS: Config (ipconfig), IP test (Test-NetConnection to the address), Name test (Test-NetConnection to the name), DNS servers (Resolve-DnsName -Server against each one).",
  "terms": [
   [
    "Test-NetConnection",
    "A PowerShell cmdlet that tests ping, TCP port connectivity and route tracing to a host."
   ],
   [
    "Resolve-DnsName",
    "A PowerShell cmdlet for DNS lookups that can target a specific server, record type or DNS-only resolution."
   ],
   [
    "DNS client cache",
    "Locally stored DNS answers, including negative ones, kept until their TTL expires; cleared with ipconfig /flushdns."
   ],
   [
    "APIPA",
    "Automatic Private IP Addressing: a 169.254.x.x address Windows assigns when DHCP fails."
   ],
   [
    "Hosts file",
    "A local file mapping names to IPs that takes priority over DNS queries in the client resolution path."
   ],
   [
    "NRPT",
    "Name Resolution Policy Table: client rules that send specific namespaces to specific DNS servers."
   ]
  ],
  "example": "Users can't open \\\\files01\\share after the server was moved to a new IP. Test-NetConnection to the new IP on port 445 succeeds, but Resolve-DnsName files01 on a client returns the old IP. Resolve-DnsName -Server against each DC shows one DNS server still has the old record; after fixing replication and running ipconfig /flushdns on clients, access returns.",
  "mistakes": [
   [
    "If ping fails, the server or service is down.",
    "Many servers block ICMP. Test the actual service port with Test-NetConnection -Port; if TcpTestSucceeded is True, the service is reachable."
   ],
   [
    "nslookup shows exactly what applications will resolve.",
    "nslookup queries a DNS server directly and ignores the client cache and hosts file. Resolve-DnsName follows the normal client path."
   ],
   [
    "After fixing a DNS record, all clients pick up the change immediately.",
    "Clients cache answers, including negative ones, until the TTL expires. Clear the cache with ipconfig /flushdns or Clear-DnsClientCache."
   ],
   [
    "Pointing a domain member's DNS to a public resolver improves reliability.",
    "Public resolvers cannot answer for internal AD zones or DC SRV records, so domain functions break. Domain members should use internal DNS servers."
   ]
  ],
  "tryit": [
   [
    "A user reports that `\\\\app02` cannot be reached. From her PC, `Test-NetConnection 10.1.4.22 -Port 445` succeeds, but `Test-NetConnection app02 -Port 445` fails with a name resolution error. `nslookup app02` returns the correct address 10.1.4.22. What is the likely cause and what do you check next?",
    "The server and port are fine, so it is a name resolution problem on the client path. Because nslookup bypasses the cache and hosts file and returns the right answer, check the client's DNS cache for a negative or stale entry with Get-DnsClientCache and clear it with ipconfig /flushdns, and look for a wrong entry in the hosts file or an NRPT rule."
   ],
   [
    "A newly built Windows Server shows the address 169.254.12.7 and cannot reach anything beyond itself. What does this tell you and where do you look?",
    "It is an APIPA address, meaning the server did not get a lease from a DHCP server. Check the network connection and VLAN, whether a DHCP server or relay is reachable for that subnet, or assign the intended static configuration if the server should not use DHCP."
   ]
  ],
  "tip": "Works by IP but not by name means DNS. Ping failing does not prove a service is down; test the port. nslookup bypasses the client cache and hosts file, so use Resolve-DnsName to see what apps see.",
  "check": [
   [
    "How do you check whether a remote server accepts connections on TCP 3389?",
    "Run Test-NetConnection <server> -Port 3389 and check TcpTestSucceeded."
   ],
   [
    "A DNS record was corrected, but one client still gets 'name not found'. Why and how do you fix it?",
    "The client cached the negative answer; run ipconfig /flushdns (or Clear-DnsClientCache) to clear it."
   ],
   [
    "How can you ask a specific DNS server for SRV records that locate domain controllers?",
    "Resolve-DnsName _ldap._tcp.dc._msdcs.contoso.com -Type SRV -Server <DNS server IP>."
   ],
   [
    "What does a 169.254.x.x address on an adapter indicate?",
    "APIPA: the computer could not obtain an address from a DHCP server."
   ]
  ]
 },
 {
  "t": "Windows Update, time service (w32tm) and Kerberos troubleshooting; Arc agent and extension troubleshooting (azcmagent check)",
  "hook": "It is the Monday after patch weekend at Silverline Freight, and three tickets land at once. A file server failed its updates with an error code nobody recognizes. Staff at the Eastgate depot cannot open file shares and see authentication errors, though their passwords work fine. And in the Azure portal, a dozen warehouse servers that were onboarded to Azure Arc last month now say Disconnected. Hannah, your manager, asks whether these are three separate problems or one big one. Some of them, it turns out, are connected by something as small as a clock that drifted seven minutes. Where do you look first for each?",
  "simple": "This lesson covers four everyday fixes. First, when Windows updates fail, you read the error and the update log to see why. Second, every computer in a Windows domain needs to agree on the time, because the sign-in system, called Kerberos, uses timestamps on its tickets, like a concert ticket that is only valid on the right day. If a clock is more than a few minutes off, sign-ins fail even with the right password. Third, Kerberos also needs to find the right servers by name and know which service is which. Fourth, servers connected to Azure through Azure Arc run a small helper program; when it stops reporting, a built-in check command tells you whether a firewall or proxy is blocking it.",
  "body": [
   "This lesson groups four common troubleshooting areas that often show up together in real incidents and in exam scenarios: updates that fail, clocks that drift, Kerberos authentication failures, which are often caused by those clocks, and Azure Arc agents that stop reporting. For each, the skill is knowing which log or command gives you the answer quickly.",
   "When Windows Update fails, first read the error code, either in Settings or in Azure Update Manager if you manage updates from Azure, then look at the logs. `Get-WindowsUpdateLog` merges the update trace files into a readable `WindowsUpdate.log` on your desktop, where you can search for the error code and see which step failed. The System log and the WindowsUpdateClient operational log under Applications and Services Logs also record installs and failures. Confirm that the Windows Update service (wuauserv) and the Background Intelligent Transfer Service (BITS) can start, and that the server can reach its update source, whether that is Microsoft Update or a WSUS (Windows Server Update Services) server set by Group Policy; a wrong WSUS address in policy is a common cause. If component store corruption is suspected, run `DISM /Online /Cleanup-Image /RestoreHealth` followed by `sfc /scannow`. As a last resort, stop the update services and rename the `SoftwareDistribution` folder so Windows rebuilds its download cache.",
   "Time matters because Kerberos rejects requests when client and server clocks differ by more than the maximum tolerance, which is five minutes by default. The tolerance exists to stop old, captured tickets from being replayed. In an Active Directory (AD) forest, time flows down a hierarchy. Members sync from a domain controller (DC) in their domain, DCs sync from the PDC (primary domain controller) emulator of their domain, and the PDC emulator of the forest root domain is the authoritative source for the whole forest. That one DC is configured to sync with a reliable external source, for example `w32tm /config /manualpeerlist:\"time.example.org\" /syncfromflags:manual /reliable:yes /update`. Every other machine should simply follow the domain hierarchy.",
   "A few `w32tm` commands answer most time questions. `w32tm /query /status` shows the stratum, last successful sync and source, `w32tm /query /source` shows just where this computer gets its time, `w32tm /resync` forces a sync now, and `w32tm /stripchart /computer:dc01` displays the offset between this computer and another one over several samples. A classic mistake is a virtualized DC that syncs time from its Hyper-V host through the time synchronization integration service instead of from the domain hierarchy. If `w32tm /query /source` on a DC shows `VM IC Time Synchronization Provider`, the host is overriding domain time; fix it by disabling that integration service for the DC VM, or at least the time provider inside the guest, and resyncing.",
   "For Kerberos problems, check in a fixed order: time first, then DNS (Domain Name System), then service principal names (SPNs). Clients must find DCs through DNS SRV records, so a client using the wrong DNS server cannot even request a ticket. `klist` shows the tickets a user currently holds, and `klist purge` clears them so you can retest after a change, such as a new group membership, without logging off. An SPN ties a service, such as `HTTP/web01.contoso.com` or `MSSQLSvc/sql01.contoso.com:1433`, to the account that runs it. Duplicate SPNs on two accounts cause authentication failures, and missing SPNs cause silent fallback to NTLM (NT LAN Manager); find duplicates with `setspn -X` and query a specific SPN with `setspn -Q`. On DCs, Security events 4768 (a TGT, or ticket-granting ticket, was requested), 4769 (a service ticket was requested) and 4771 (Kerberos pre-authentication failed) include failure codes that point to the cause, such as clock skew or a bad password.",
   "Azure Arc-enabled servers run the Azure Connected Machine agent, whose command-line tool is `azcmagent`. `azcmagent show` reports the agent version, the resource ID and whether the agent status is Connected or Disconnected. `azcmagent check` tests network connectivity to the Azure endpoints the agent and its extensions need, which quickly exposes a firewall or proxy that is blocking traffic, often the real reason a server shows Disconnected. `azcmagent logs` collects the agent logs into a zip file you can analyze or send to support. Agent logs live under `C:\\ProgramData\\AzureConnectedMachineAgent\\Log`, for example `himds.log` and `azcmagent.log`, and extension logs under `C:\\ProgramData\\GuestConfig\\extension_logs`.",
   "Also check that the agent's services are running: Azure Hybrid Instance Metadata Service (himds), Guest Configuration Arc Service and Guest Configuration Extension Service. If the server reaches the internet through a proxy, configure it for the agent with `azcmagent config set proxy.url` followed by your proxy address, then rerun `azcmagent check`. A failed extension, such as the Azure Monitor agent, often just needs to be removed and reinstalled from the portal after the underlying network or permission issue is fixed; reinstalling before fixing the cause simply fails again.",
   "Notice how the areas connect. A DC syncing from the wrong source drifts, Kerberos then fails for clients near it, and a server whose clock is far off can also fail TLS (Transport Layer Security) connections to Azure because certificates appear not yet valid or expired. Checking time early often clears several symptoms at once."
  ],
  "analogy": "Kerberos tickets are like timed parking permits. A permit stamped for 9:00 to 17:00 is rejected by an attendant whose watch says 17:10, even if the permit is genuine. The forest time hierarchy is like every attendant setting their watch from the head office clock, which in turn sets itself from an atomic clock. The analogy stops at tolerance: Kerberos allows a small skew, five minutes by default, so watches only need to be close, not perfect.",
  "mnemonic": "For Kerberos failures, check Time, DNS, SPN in that order: Time Determines Success. Time skew over the tolerance, DNS that cannot find DCs, then duplicate or missing SPNs.",
  "terms": [
   [
    "Get-WindowsUpdateLog",
    "A cmdlet that converts Windows Update trace files into a readable WindowsUpdate.log."
   ],
   [
    "PDC emulator (forest root)",
    "The authoritative time source for an AD forest, which should sync with a reliable external time source."
   ],
   [
    "w32tm",
    "The command-line tool for configuring, querying and resyncing the Windows Time service."
   ],
   [
    "klist",
    "A command that lists or purges the Kerberos tickets cached for the current logon session."
   ],
   [
    "SPN",
    "Service principal name: an identifier that maps a service instance to the account running it, used by Kerberos."
   ],
   [
    "azcmagent check",
    "An Arc agent command that tests connectivity to the Azure endpoints required by the agent and its extensions."
   ],
   [
    "himds",
    "Azure Hybrid Instance Metadata Service: the core Arc agent service that maintains the server's connection and identity."
   ]
  ],
  "example": "Users on one site can't access file shares and see Kerberos errors. On their DC, w32tm /query /source shows 'VM IC Time Synchronization Provider' and the clock is seven minutes off. The admin turns off the Hyper-V time synchronization integration service for that DC VM, resyncs to the domain hierarchy with w32tm /resync, and after klist purge on a client, access works.",
  "mistakes": [
   [
    "Every DC should sync with an external internet time source.",
    "Only the forest root PDC emulator should use an external source. Other DCs follow their domain's PDC emulator, and members follow DCs."
   ],
   [
    "A virtualized DC should take its time from the Hyper-V host.",
    "A DC should follow the domain hierarchy. If w32tm shows the VM IC provider as the source, disable host time sync for that DC."
   ],
   [
    "Kerberos failures with a correct password must be account lockouts.",
    "Clock skew beyond the tolerance, DNS problems and duplicate or missing SPNs all cause Kerberos failures with valid passwords."
   ],
   [
    "An Arc server showing Disconnected needs the agent reinstalled.",
    "Start with azcmagent show and azcmagent check; a blocked endpoint or missing proxy setting is a common cause that reinstalling will not fix."
   ]
  ],
  "tryit": [
   [
    "An Arc-enabled warehouse server shows Disconnected. On the server, `azcmagent show` confirms the status, and `azcmagent check` reports that several Azure endpoints are unreachable. The network team says all internet traffic from that site must go through a proxy. What do you do?",
    "Configure the agent to use the proxy with azcmagent config set proxy.url and the proxy address, make sure the proxy allows the required Azure endpoints, then rerun azcmagent check and confirm the status returns to Connected with azcmagent show."
   ],
   [
    "A web application that uses Kerberos started falling back to NTLM after an admin created a second service account and configured it with the same HTTP SPN as the original. Users can still sign in, but some get failures. What is the cause and how do you confirm it?",
    "Duplicate SPNs: the same SPN on two accounts makes the KDC unable to issue a correct service ticket. Confirm with setspn -X (and setspn -Q for that SPN), remove the SPN from the wrong account, then have users run klist purge and retest."
   ]
  ],
  "tip": "Kerberos failure plus clock skew over 5 minutes is a classic exam scenario; the fix is the time hierarchy anchored on the forest root PDC emulator. For Arc disconnected status, run azcmagent show and azcmagent check first.",
  "check": [
   [
    "Which DC should sync time from an external source in an AD forest?",
    "The PDC emulator of the forest root domain."
   ],
   [
    "An Arc server shows Disconnected in the portal. Which command tests whether it can reach the required Azure endpoints?",
    "azcmagent check."
   ],
   [
    "A user was added to a group but still can't access a resource. What quick Kerberos step helps without logging off?",
    "Run klist purge to clear cached tickets so new tickets with the updated group membership are requested."
   ],
   [
    "Which command turns Windows Update trace files into a readable log?",
    "Get-WindowsUpdateLog."
   ]
  ]
 },
 {
  "t": "Azure VM troubleshooting: boot diagnostics, Serial Console, Run Command, redeploy",
  "hook": "At 11:40 p.m. your phone buzzes. Northgate Dental Group's appointment system lives on a Windows Server VM in Azure, and the overnight report job just failed because nobody can reach the server. Priya, the only other admin, says she changed some firewall rules on that VM an hour ago and then lost her Remote Desktop session. The Azure portal says the VM is Running. There is no server room to drive to and no keyboard to plug in. The clinics open at 7 a.m. You have the portal, a few built-in tools and a growing suspicion about those firewall rules. How do you get inside a machine you cannot connect to?",
  "simple": "When a computer in your office breaks, you can walk over, look at the screen and type on its keyboard. An Azure virtual machine (a computer that lives in Microsoft's datacenter) has no screen you can walk up to. Azure gives you stand-ins. Boot diagnostics is like a photo of the screen, so you can see if Windows is stuck or crashed. Serial Console is like a backup keyboard plugged into the machine through a side door that does not need the network. Run Command lets you hand the machine a script through a small helper program already running inside it. Redeploy is like moving the machine to a different desk in the datacenter and turning it back on, which helps when the desk itself is the problem.",
  "body": [
   "With a physical server you can walk up to the console. With an Azure virtual machine (VM) you cannot, so Azure gives you remote equivalents. When a Windows Server VM will not start properly or you cannot connect with RDP (Remote Desktop Protocol), the AZ-802 exam expects you to know which tool to reach for and what each one needs: boot diagnostics, Serial Console, Run Command or redeploy. The skill is picking the least disruptive tool that answers the question in front of you.",
   "Start with boot diagnostics, because it splits the problem in two. Boot diagnostics captures a screenshot of the VM's screen and the serial log output during boot, stored in a storage account; a Microsoft-managed storage account is the simple default, and you can also use your own. In the portal, the VM's Boot diagnostics blade shows the screenshot, so you might see a blue stop error, a Windows update stuck at a percentage, a CHKDSK disk check running, a 'Preparing Windows' screen or a normal sign-in screen. A crash or a stuck update means the operating system is the problem. A normal sign-in screen means Windows booted, so the fault is more likely in the network path, the firewall inside the guest or the RDP service. Boot diagnostics is the first thing to look at when a VM shows Running but is unreachable, and it must be enabled for Serial Console to work.",
   "Serial Console is your keyboard when the network is gone. It gives you a text console connected to the VM's serial port, independent of the VM's network configuration. On Windows it connects to the Special Administration Console (SAC), a text-mode management console built into Windows. At the `SAC>` prompt you type `cmd` to create a command channel, then `ch -si 1` to switch to it, and sign in with a local or domain account that has a password. From there you can run `ipconfig`, fix firewall rules with `netsh advfirewall`, re-enable RDP through the registry, reset network settings or start a stopped service. Serial Console needs boot diagnostics enabled and appropriate Azure permissions, at least the Virtual Machine Contributor role on the VM. Because it does not depend on the guest network or the VM agent, Serial Console is ideal when you cannot get in over the network at all and the agent is not responding either.",
   "Run Command is the easier path when the VM agent is healthy. It executes scripts inside the VM through the Azure VM agent, with no network access or RDP required from your side. The portal offers built-in commands for Windows such as `RunPowerShellScript`, `EnableRemotePS`, `ResetRDPCert`, `IPConfig` and `EnableAdminAccount`, or you can paste your own PowerShell script; from the command line you can use `Invoke-AzVMRunCommand` or `az vm run-command invoke`. Two limits matter: the VM agent must be installed and reporting as Ready, and only one command can run at a time on a VM. If the agent status shows Not Ready, Run Command will not work and Serial Console becomes the better choice.",
   "The VM's Help section also has two targeted RDP repairs that use the VMAccess extension. Reset password changes or creates a local administrator account's password, which helps when nobody remembers the credentials. Reset configuration only puts the RDP settings back to defaults, for example re-enabling the RDP service and setting the default port, without touching accounts. These are quick fixes when the problem is clearly RDP configuration rather than the operating system.",
   "Redeploy addresses problems with the host rather than the guest. It moves the VM to a new Hyper-V host in the Azure infrastructure and powers it on again, keeping its OS and data disks and its configuration. Use it when you suspect an issue with the underlying host, such as a VM that will not start or cannot be reached even though boot diagnostics shows the OS looks fine and you have ruled out firewall and RDP settings. Know the side effects, because the exam tests them: data on the temporary disk, usually the D: drive, is lost, and dynamic IP addresses associated with the network interface may be updated. Reapply is a gentler option that re-runs the VM's provisioning state to fix a VM stuck in a failed state without moving it to another host.",
   "When none of these work, the fallback is offline repair. You take a snapshot or copy of the OS disk, attach it to a rescue VM, fix files or the registry there and swap the disk back; the `az vm repair` commands automate creating the rescue VM and swapping the disk. Do not forget the network side either. If the guest looks healthy, Network Watcher's IP flow verify and the effective security rules on the network interface show whether a network security group (NSG) is blocking TCP port 3389 before the traffic ever reaches Windows.",
   "A sensible order therefore looks like this: check boot diagnostics to see whether Windows booted, use Run Command if the agent is Ready, fall back to Serial Console if it is not, use the RDP reset options for configuration problems, redeploy if you suspect the host and repair the disk offline as a last resort. In the hook's scenario, a normal sign-in screen plus a recent firewall change points straight at the guest firewall, and Run Command or Serial Console can add the missing rule without a restart."
  ],
  "analogy": "Troubleshooting an Azure VM is like helping a relative whose computer is in another city. Boot diagnostics is them texting you a photo of the screen. Run Command is asking them to run a script you send, which only works if they are awake to receive it, just as Run Command needs the VM agent. Serial Console is a direct phone line to the machine itself. Redeploy is moving the computer to a different room. The analogy stops at the temporary disk: moving rooms here quietly empties one drawer, the D: drive.",
  "terms": [
   [
    "Boot diagnostics",
    "A feature that captures the VM's screenshot and serial log during boot for troubleshooting, stored in a managed or custom storage account."
   ],
   [
    "Serial Console",
    "A text console to the VM's serial port that reaches the Windows Special Administration Console without using the VM's network."
   ],
   [
    "SAC",
    "Special Administration Console: the Windows text-mode console reachable through Serial Console, where cmd and ch -si 1 open a command prompt."
   ],
   [
    "Run Command",
    "A feature that runs scripts inside the VM through the Azure VM agent, without network access; one command at a time."
   ],
   [
    "VMAccess extension",
    "The extension behind Reset password and Reset configuration only, used to repair local admin credentials and RDP settings."
   ],
   [
    "Redeploy",
    "Moving a VM to a new Azure host while keeping its OS and data disks; temporary disk data is lost and dynamic IPs may change."
   ],
   [
    "Reapply",
    "Re-running a VM's provisioning state to fix a failed state without moving it to another host."
   ]
  ],
  "example": "After an admin tightened Windows Defender Firewall rules, nobody can RDP to an Azure DC VM. Boot diagnostics shows a normal sign-in screen, so the OS is fine, and the VM agent status shows Ready. The admin uses Run Command with RunPowerShellScript to add an inbound rule allowing TCP 3389 from the management subnet, and RDP works again without a restart.",
  "mistakes": [
   [
    "Redeploy is a safe first step because it keeps everything.",
    "Redeploy keeps the OS and data disks but loses temporary disk data and may change dynamic IP addresses. Check boot diagnostics and try in-guest fixes first."
   ],
   [
    "Run Command works even when the VM is unreachable for any reason.",
    "Run Command depends on the Azure VM agent being installed and Ready. If the agent is down, use Serial Console, which uses the serial port instead."
   ],
   [
    "Serial Console works on any VM out of the box.",
    "Serial Console requires boot diagnostics to be enabled, a suitable Azure role such as Virtual Machine Contributor and an account with a password inside the guest."
   ],
   [
    "If the portal shows Running, the problem must be inside Windows.",
    "Running only describes the platform state. An NSG blocking 3389 can also cause the outage; IP flow verify and effective security rules check that."
   ]
  ],
  "tryit": [
   [
    "An Azure file server VM shows Running, but RDP times out. Boot diagnostics shows a normal sign-in screen. The VM's agent status shows Not Ready, and Network Watcher confirms the NSG allows TCP 3389 from your subnet. Which tool do you use to get a command prompt, and what must already be in place?",
    "Use Serial Console. The OS booted and the NSG is fine, so the problem is inside the guest, and with the agent Not Ready, Run Command will not work. Serial Console needs boot diagnostics enabled (it is, since you saw the screenshot), the Virtual Machine Contributor role or higher and a guest account with a password. At SAC, type cmd, then ch -si 1, sign in and check the firewall and RDP service."
   ],
   [
    "A VM fails to start after a planned maintenance notice, and boot diagnostics shows nothing unusual from the last boot. You have ruled out guest firewall and RDP settings. A colleague suggests redeploy, but the application writes its working cache to the D: drive. What should you tell them before redeploying?",
    "Redeploy moves the VM to a new host and should help if the host is the problem, but the D: temporary disk is wiped and dynamic IPs may change. Confirm nothing irreplaceable is on D:, and that clients do not depend on a dynamic IP, before you redeploy."
   ]
  ],
  "tip": "Look at boot diagnostics first to split OS problems from network problems. Serial Console needs boot diagnostics and a password-based account; Run Command needs a Ready VM agent and runs one command at a time; redeploy loses the temp disk and may change dynamic IPs.",
  "check": [
   [
    "What must be enabled before you can use Serial Console on an Azure VM?",
    "Boot diagnostics, along with an appropriate Azure role such as Virtual Machine Contributor."
   ],
   [
    "What data do you lose when you redeploy an Azure VM?",
    "Data on the temporary disk; dynamic IP addresses on the network interface may also change, while OS and data disks are kept."
   ],
   [
    "The VM agent is not running on a VM. Which tool can still get you a command prompt?",
    "Serial Console, because it uses the serial port and SAC instead of the VM agent."
   ],
   [
    "Boot diagnostics shows a Windows update stuck at a percentage for an hour. Is this a network problem or an OS problem?",
    "An OS problem: Windows has not finished booting, so RDP will not be available until the update completes or the disk is repaired."
   ]
  ]
 },
 {
  "t": "AD DS recovery: Directory Services Restore Mode, authoritative vs non-authoritative restore, authoritative SYSVOL (DFSR) restore",
  "hook": "It is Thursday afternoon at Bramble County Library District, and Marcus from the help desk is pale. He was cleaning up old accounts and deleted the Branches organizational unit, with all 140 staff accounts inside it. Within minutes, the deletion has replicated to every domain controller. The Active Directory Recycle Bin was never turned on. You do have last night's system state backup of DC2. Your manager asks the obvious question: if you restore DC2 from backup, will the other domain controllers simply delete those accounts again the moment it comes back online? And while you are at it, the Group Policy folder on one DC has been acting strangely for days. What exactly do you restore, and how?",
  "simple": "Active Directory is the directory of users and computers that domain controllers (the servers that handle sign-ins) keep in sync by copying changes to each other. If you restore an old copy on one server, the others will update it with newer changes, including deletions, so deleted users vanish again. A normal restore is fine for fixing one broken server; it just catches up. To bring back something that was deleted, you restore it and then stamp it as the newest version so the other servers accept it instead of overwriting it. You do this from a special startup mode where the directory is switched off. Group Policy files live in a separate shared folder, SYSVOL, with its own copying system and its own recovery steps.",
  "body": [
   "Sooner or later someone deletes an organizational unit (OU) full of users, or a domain controller's (DC's) database becomes corrupted. To recover, you need a good system state backup and an understanding of how Active Directory Domain Services (AD DS) replication treats restored data. The central question for every AD restore is whether you want the restored data to be overwritten by replication partners, or to overwrite them.",
   "The tool for offline restores is Directory Services Restore Mode (DSRM). The AD database file, `ntds.dit`, cannot be restored while AD DS is running on that DC. DSRM is a special boot mode in which the DC starts without AD DS, and you sign in with the DSRM administrator account, a local account whose password was set when the server was promoted. If nobody remembers it, reset it with `ntdsutil`, using the `set dsrm password` command and then `reset password on server null`. You enter DSRM by setting the boot option with `bcdedit /set safeboot dsrepair` and restarting, then remove it afterwards with `bcdedit /deletevalue safeboot` so the DC boots normally, or by choosing it from the advanced startup options. For offline maintenance such as defragmenting or checking the database, you can instead simply stop the Active Directory Domain Services service, a feature known as restartable AD DS, without a reboot.",
   "A non-authoritative restore repairs one DC. You restore the system state backup in DSRM, for example with `wbadmin start systemstaterecovery`, and when the DC restarts normally, its replication partners send it every change made since the backup, including deletions. This is the right choice when a single DC's database is damaged but the rest of the domain is healthy; the restored DC simply catches up. It will not bring back deleted objects, because the partners hold the newer deletion and replicate it again, removing the restored copies.",
   "An authoritative restore is how you recover deleted objects from backup. After the non-authoritative restore, and before restarting normally, you run `ntdsutil`, activate the instance with `activate instance ntds`, enter `authoritative restore` and run `restore subtree \"OU=Sales,DC=contoso,DC=com\"` for an OU and everything in it, or `restore object` for a single object. Ntdsutil raises the version numbers of those objects' attributes by a large amount, by default 100,000 for each day since the backup, so after reboot they win replication conflicts and are copied back to all DCs. You mark only what you need; everything else on that DC is still non-authoritative and catches up normally.",
   "Group memberships need one extra step. Membership is stored on the group as a linked attribute, and groups outside the restored subtree did not get higher version numbers, so their links to the restored users would not come back on their own. Ntdsutil therefore writes LDIF (LDAP Data Interchange Format) files listing those back-links, and you import them with `ldifde -i -f` followed by the file name after the restored objects have replicated. Two more rules matter. Backups older than the tombstone lifetime, commonly 180 days, must not be restored, because deleted objects' tombstones have been purged and old objects could reappear inconsistently. And if the AD Recycle Bin is enabled, prefer `Restore-ADObject` or the Active Directory Administrative Center, which recovers deleted objects with all attributes, including group memberships, with no DSRM reboot at all.",
   "SYSVOL needs its own procedure. SYSVOL is the shared folder that holds Group Policy templates and logon scripts, and it is replicated by DFS Replication (DFSR), not by AD replication, so restoring the AD database does not fix it. For a single broken DC, a non-authoritative SYSVOL sync is enough. In ADSI Edit or with PowerShell, set `msDFSR-Enabled` to FALSE on that DC's SYSVOL subscription object, force AD replication, wait for DFSR event 4114 confirming SYSVOL is no longer replicated, then set it back to TRUE and replicate again. The DC then pulls a fresh copy from a healthy partner.",
   "If SYSVOL is damaged everywhere, or you need to roll back to a known good copy, you perform an authoritative SYSVOL restore. On the DC with the good copy, often the PDC emulator, set `msDFSR-Enabled` to FALSE and `msDFSR-Options` to 1 on its SYSVOL subscription object, found under CN=SYSVOL Subscription in that DC's DFSR-LocalSettings. Set `msDFSR-Enabled` to FALSE on all other DCs. Force AD replication with `repadmin /syncall /AdeP`, restart the DFSR service on the authoritative DC, then set its `msDFSR-Enabled` back to TRUE and watch for event 4602, which shows SYSVOL was initialized as authoritative. Finally, set `msDFSR-Enabled` back to TRUE on the other DCs, which perform a non-authoritative sync from it.",
   "In short, DSRM is the tool, non-authoritative restore repairs one DC, authoritative restore wins against the others, LDIF files fix back-links, the Recycle Bin avoids the whole process when enabled, and SYSVOL has its own DFSR procedure driven by the subscription object attributes."
  ],
  "analogy": "Think of AD replication as a group chat where everyone keeps the latest version of a shared document. If you restore last week's copy on your phone, the group sends you this week's edits and your old version is replaced, which is a non-authoritative restore. An authoritative restore is like editing the restored paragraphs so they carry a newer timestamp than anything in the chat, so everyone accepts yours. The analogy stops at timestamps: AD compares attribute version numbers, not clock times, which is why ntdsutil raises versions.",
  "terms": [
   [
    "DSRM",
    "Directory Services Restore Mode: a DC boot mode without AD DS running, used for database restores, signed in with the local DSRM administrator password."
   ],
   [
    "Non-authoritative restore",
    "Restoring a DC's AD database that then receives newer changes, including deletions, from replication partners."
   ],
   [
    "Authoritative restore",
    "Marking restored objects with higher attribute version numbers via ntdsutil so they replicate out and overwrite partners' copies."
   ],
   [
    "Tombstone lifetime",
    "How long deleted objects are kept as tombstones, commonly 180 days; backups older than this must not be restored."
   ],
   [
    "LDIF file",
    "A text file ntdsutil generates during authoritative restore listing back-linked attributes, such as group memberships, to import with ldifde."
   ],
   [
    "msDFSR-Enabled",
    "The SYSVOL subscription attribute that turns DFSR replication of SYSVOL off (FALSE) or on (TRUE) for a DC."
   ],
   [
    "msDFSR-Options",
    "The SYSVOL subscription attribute set to 1 on the DC chosen as authoritative in a DFSR SYSVOL restore."
   ]
  ],
  "example": "An admin accidentally deletes the Sales OU, and the AD Recycle Bin is not enabled. On DC2 they restart into DSRM, restore last night's system state with wbadmin, run ntdsutil authoritative restore on the Sales subtree and restart normally. After the OU replicates, they import the generated LDIF file with ldifde to restore the users' memberships in groups in other OUs.",
  "mistakes": [
   [
    "A normal (non-authoritative) restore will bring back deleted users.",
    "Replication partners hold the newer deletion and send it to the restored DC, deleting the objects again. Deleted objects need an authoritative restore or the Recycle Bin."
   ],
   [
    "Authoritative restore should be done on the whole database to be safe.",
    "Mark only the subtree or objects you need. Marking everything authoritative would roll back every legitimate change made since the backup across the domain."
   ],
   [
    "Restoring AD also fixes SYSVOL and Group Policy files.",
    "SYSVOL is replicated by DFSR, separately from AD. It is repaired with the msDFSR-Enabled and msDFSR-Options steps on the subscription objects."
   ],
   [
    "Any backup will do, no matter how old.",
    "A backup older than the tombstone lifetime must not be restored, because it can reintroduce objects whose deletions are no longer tracked."
   ]
  ],
  "tryit": [
   [
    "A single DC at a branch office has a corrupted ntds.dit after a storage failure. The other three DCs are healthy, and nothing was deleted. You have a system state backup of the branch DC from two days ago. Which kind of restore do you perform, and do you need ntdsutil authoritative restore?",
    "Perform a non-authoritative restore in DSRM. The rest of the domain is correct, so you want the restored DC to catch up from its partners. No authoritative restore is needed, because nothing deleted needs to win replication."
   ],
   [
    "After a bad script, Group Policy files are corrupted on every DC, while user accounts are fine. You have a good copy of SYSVOL restored on DC1. What do you set on DC1 and on the other DCs to recover?",
    "Run an authoritative SYSVOL restore. On DC1 set msDFSR-Enabled to FALSE and msDFSR-Options to 1 on its SYSVOL subscription object; on all other DCs set msDFSR-Enabled to FALSE. Force AD replication, restart DFSR on DC1, set its msDFSR-Enabled to TRUE and look for event 4602, then set the others to TRUE so they sync from DC1."
   ]
  ],
  "tip": "Deleted objects need authoritative restore (or the Recycle Bin, if enabled); a corrupt DC needs non-authoritative. Remember the LDIF step for group memberships. SYSVOL is DFSR, restored separately with msDFSR-Enabled and msDFSR-Options on the subscription objects.",
  "check": [
   [
    "Why will a non-authoritative restore not bring back a deleted OU?",
    "When the DC restarts, replication partners send the more recent deletion, which removes the restored objects again."
   ],
   [
    "What does ntdsutil do to objects during an authoritative restore?",
    "It increases their attribute version numbers so the restored versions win replication and overwrite the copies on other DCs."
   ],
   [
    "In an authoritative SYSVOL restore, which attributes do you set on the authoritative DC?",
    "msDFSR-Enabled to FALSE and msDFSR-Options to 1 on its SYSVOL subscription object, then later msDFSR-Enabled back to TRUE."
   ],
   [
    "Which commands set and then clear booting into DSRM?",
    "bcdedit /set safeboot dsrepair to enter DSRM on restart, and bcdedit /deletevalue safeboot to return to normal boot."
   ]
  ]
 },
 {
  "t": "Backup: Windows Server Backup, bare-metal and system state backup, Azure Backup with the MARS agent and MABS",
  "hook": "On a quiet Sunday, the file server at Cedar Ridge Veterinary Clinics starts renaming every document with a strange extension. By the time Luis, the office manager, calls you, the shares are unreadable. Your two domain controllers, the SQL Server that runs the scheduling app and the file server all need a way back. The owner asks you three things over the phone. Can we restore the files? Could we rebuild the whole server on new hardware if we had to? And could whoever did this have deleted the backups too? The answers depend entirely on which backup tools you set up months ago, and what each one actually protects. Which tool would have covered which server?",
  "simple": "A backup is a saved copy you can go back to if something is deleted, broken or locked by an attacker. Windows Server has a built-in backup tool that can save files, the core settings a server needs to start (called system state) or everything needed to rebuild the server on a blank disk (called bare-metal recovery). Microsoft Azure also offers two ways to send backups to the cloud. The MARS agent is a small program you install on one server to send its files and settings straight to Azure. MABS is a separate backup server you run on site that protects many servers and applications, like databases, keeps recent copies nearby for quick restores and sends older copies to Azure. It is like keeping recent photos on your phone and older ones in cloud storage.",
  "body": [
   "Backups are your last line of defense against accidental deletion, corruption, ransomware and the loss of a whole site. High availability features such as failover clustering and replication copy mistakes instantly to every node, so they are not backups. For the AZ-802 exam you need to know the built-in Windows Server Backup and the two Azure Backup options for on-premises servers: the Microsoft Azure Recovery Services (MARS) agent and Microsoft Azure Backup Server (MABS). The common thread is matching the tool to what you need to protect and how fast you need it back.",
   "Windows Server Backup is the built-in starting point. It is a feature you add with `Install-WindowsFeature Windows-Server-Backup`, and it uses the Volume Shadow Copy Service (VSS) to take consistent block-level backups while the server keeps running. You can back up the full server, selected volumes, individual files and folders, system state or bare-metal recovery (BMR). Targets are a dedicated disk, which is formatted and used exclusively by backup and keeps multiple versions, a regular volume, or a network share, which keeps only the latest backup because each run overwrites the previous one. You can create one scheduled backup per server, and run additional one-time backups as needed. Manage it in the Windows Server Backup console or with `wbadmin`, for example `wbadmin start systemstatebackup -backupTarget:E:` to back up system state and `wbadmin get versions` to list available recovery points.",
   "The backup types differ in scope, and the exam tests the boundaries. A system state backup includes the registry, boot files, COM+ class registration and, depending on the server's roles, the AD DS database, SYSVOL, the certificate services database and the cluster database. It is what you restore in Directory Services Restore Mode (DSRM) to recover Active Directory, and it is small and quick. A bare-metal recovery backup includes system state plus all volumes needed to boot the operating system, so you can rebuild a server onto new hardware or a blank disk. To use it, you boot the Windows Recovery Environment (WinRE) from installation media, choose Repair your computer, then System Image Recovery. A full server backup includes BMR plus all data volumes.",
   "The MARS agent sends one server's data straight to Azure. It backs up a Windows machine directly to a Recovery Services vault in Azure, with no extra on-premises server. It protects files and folders, volumes and system state, can run up to three times a day, and transfers only changed data after the first backup. To set it up, you create a Recovery Services vault, download vault credentials from the portal, install the agent and register it with those credentials. During registration you set an encryption passphrase, which Microsoft never sees. If you lose it, you cannot restore, so store it securely somewhere other than the protected server. MARS is not application-aware, so it does not back up SQL Server or Exchange databases in an application-consistent way, and it is not the tool for protecting whole VMs.",
   "MABS covers many workloads with local and cloud copies. Microsoft Azure Backup Server is a free-to-download server application based on System Center Data Protection Manager (DPM) that you install on a dedicated on-premises Windows Server. It protects workloads across your datacenter, including Hyper-V and VMware VMs, SQL Server, Exchange, SharePoint, file servers, and system state or BMR, by installing protection agents on the servers it protects. It stores recent recovery points on local disk for fast restores, a pattern called disk-to-disk, and sends longer-term copies to a Recovery Services vault, called disk-to-disk-to-cloud. Unlike DPM, MABS does not support tape and does not need a System Center license. Under the hood, MABS uses the MARS agent itself to talk to the vault, which is why both appear in Azure Backup setup.",
   "Restores look different for each tool. In Windows Server Backup you run the Recover wizard or `wbadmin start recovery` for files and volumes, and `wbadmin start systemstaterecovery` in DSRM for AD. With MARS, the agent's Recover Data wizard mounts a recovery point as a volume so you can browse and copy files back, or restore to an alternate location. With MABS, you restore from the console, choosing a local recovery point for speed or an Azure one for older data, and you can recover individual databases or whole VMs.",
   "Choose by scope. One server's files, folders or system state going straight to Azure means MARS. Application-consistent backups of many workloads, with fast local restores plus Azure retention, means MABS. A quick local system state or BMR backup, such as before a risky change on a DC or before a hardware replacement, means Windows Server Backup.",
   "Finally, protect the backups themselves. Attackers increasingly try to delete backups before encrypting data. Azure Backup's soft delete keeps deleted backup data recoverable for a period after deletion, and critical operations such as changing the passphrase or stopping protection with data deletion can require a security PIN generated in the portal. Keeping at least one copy outside the reach of the domain, such as in a Recovery Services vault, is a key ransomware defense."
  ],
  "analogy": "Think of backups as ways to protect a house. A system state backup is a copy of the keys, alarm codes and blueprints, enough to get the house working again but not the furniture. Bare-metal recovery is a full set of blueprints and materials to rebuild the house on an empty lot. MARS is a storage unit across town for one household's boxes. MABS is a building manager with a basement storeroom for recent items and an offsite warehouse for older ones. The analogy stops at application awareness: only MABS knows how to pack a running database consistently.",
  "mnemonic": "MARS backs up FVS: Files and folders, Volumes, System state. Anything application-aware, such as SQL Server, Exchange or whole VMs, is a job for MABS.",
  "terms": [
   [
    "Windows Server Backup",
    "The built-in VSS-based backup feature for full server, volumes, files and folders, system state and bare-metal recovery, managed with the console or wbadmin."
   ],
   [
    "VSS",
    "Volume Shadow Copy Service: the Windows service that creates consistent point-in-time snapshots so backups can run while the server is in use."
   ],
   [
    "System state backup",
    "A backup of the registry, boot files, COM+ registration and role databases such as AD DS and SYSVOL, used to recover AD in DSRM."
   ],
   [
    "Bare-metal recovery",
    "A backup containing system state and all volumes required to boot, used to rebuild a server on new hardware through WinRE."
   ],
   [
    "MARS agent",
    "The Microsoft Azure Recovery Services agent that backs up files, folders, volumes and system state from a Windows machine directly to a Recovery Services vault."
   ],
   [
    "MABS",
    "Microsoft Azure Backup Server: a DPM-based on-premises backup server that protects application workloads and VMs with local disk storage and Azure retention, without tape."
   ],
   [
    "Recovery Services vault",
    "The Azure resource that stores backup data from MARS and MABS and holds settings such as soft delete."
   ]
  ],
  "example": "A company's two DCs get nightly system state backups with Windows Server Backup to a dedicated disk. File servers use the MARS agent to send their data volumes to a Recovery Services vault twice a day. Their SQL Server and Hyper-V hosts are protected by MABS, which keeps two weeks of recovery points on local disk for fast restores and a year of monthly copies in Azure.",
  "mistakes": [
   [
    "A failover cluster or replication means you do not need backups.",
    "Clustering and replication copy deletions and encryption instantly. Only backups with older recovery points let you go back in time."
   ],
   [
    "The MARS agent is the right way to back up a SQL Server database to Azure.",
    "MARS is not application-aware. For application-consistent SQL Server, Exchange or VM backups from on-premises, use MABS."
   ],
   [
    "A network share is the best Windows Server Backup target because it keeps lots of versions.",
    "A network share target keeps only the latest backup, because each run overwrites it. A dedicated disk keeps multiple versions."
   ],
   [
    "Microsoft can reset a lost MARS passphrase.",
    "The passphrase is never sent to Microsoft. Without it, the data cannot be restored, so store it securely away from the protected server."
   ]
  ],
  "tryit": [
   [
    "A small branch has one Windows Server file server and no spare hardware. Management wants its shared folders and system state backed up offsite to Azure twice a day, with as little new infrastructure as possible. There are no databases on the server. Which tool do you choose and what must you keep safe after setup?",
    "Use the MARS agent registered to a Recovery Services vault. It backs up files, folders and system state directly to Azure with no extra server and can run up to three times a day. Keep the encryption passphrase somewhere secure outside the server, because restores are impossible without it."
   ],
   [
    "A server's motherboard and system disk fail. You have new hardware and a Windows Server Backup made last night that included bare-metal recovery to an external dedicated disk. How do you bring the server back?",
    "Boot the new hardware from Windows Server installation media into the Windows Recovery Environment, choose Repair your computer, then System Image Recovery, and point it at the BMR backup on the dedicated disk. BMR contains system state and all volumes needed to boot, so the server is rebuilt as it was."
   ]
  ],
  "tip": "MARS means files, folders, volumes and system state direct to Azure, not app-aware, up to three backups a day. MABS means app-aware workloads and VMs plus local disk, no tape. In Windows Server Backup, a network share target keeps only one version, and BMR is what rebuilds a server on new hardware.",
  "check": [
   [
    "Which backup type do you need to restore a failed server onto new hardware?",
    "A bare-metal recovery backup, restored by booting into Windows Recovery Environment and using System Image Recovery."
   ],
   [
    "You need application-consistent backups of SQL Server with fast local restores and long-term Azure retention. MARS or MABS?",
    "MABS, because it is application-aware and stores recovery points on local disk before sending them to Azure; MARS is not app-aware."
   ],
   [
    "What happens if you lose the MARS agent encryption passphrase?",
    "You cannot restore the data, because Microsoft does not store the passphrase; keep it somewhere secure outside the protected server."
   ],
   [
    "Which backup do you restore in DSRM to recover Active Directory?",
    "A system state backup, which includes the AD DS database and SYSVOL on a domain controller."
   ]
  ]
 }
], {"reviewed":"2026-10-06"});
