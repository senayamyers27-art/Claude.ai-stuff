/* Lessons for Microsoft Certified: Security Operations Analyst Associate (SC-200): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("sc-200", [
 {
  "t": "Defender XDR settings: incident and alert email notifications, alert tuning (suppression) rules, portal RBAC and device groups",
  "hook": "It is Monday morning at Harbor Credit Union, and you open the Microsoft Defender portal to find 212 new alerts from the weekend. Almost all of them are the same credential-access detection on the two backup servers, the one everyone already knows is harmless. Somewhere in that pile, a contractor in the Lisbon office could see devices he should never touch, and your manager says she never got an email about Saturday's high-severity incident. Nothing here is a detection problem. The sensors worked. The settings did not. Which four switches in the portal decide whether the right person sees the right incident, and which one should you never use to make the noise go away?",
  "simple": "Think of the Defender portal as the front desk of a busy building. Before it can run smoothly, someone has to set the house rules. First, who gets a phone call when something serious happens (email notifications). Second, which false alarms everyone agrees to ignore, like a smoke detector that always beeps when someone makes toast, while keeping the real fire alarm working (alert tuning). Third, who holds which keys, so a new guard can watch the cameras but cannot change the locks (role-based access control, meaning permissions given by job role). Fourth, how the rooms are grouped into wings, so each team looks after its own wing (device groups). None of these rules catch intruders. They make sure the people who do catch them can work without chaos.",
  "body": [
   "Microsoft Defender XDR (extended detection and response) is the suite that joins Defender for Endpoint, Defender for Office 365, Defender for Identity, Defender for Cloud Apps and more into one place, the Microsoft Defender portal. Before a security operations center (SOC) can use it well, someone has to configure a few tenant-wide settings: who gets told about incidents, which known-benign alerts are quieted, who can see and do what, and how devices are grouped. None of these settings detect anything by themselves. Together, though, they decide whether the right analyst sees the right incident quickly and without drowning in noise, which is why the exam treats them as the foundation of a working SOC.",
   "Start with email notifications, which live under Settings, Microsoft Defender XDR, Email notifications. There are separate rule types for incidents, for response actions and for threat analytics. An incident notification rule has a name, a list of recipients and filters, such as minimum severity, the source product (for example only Defender for Identity) or the device group involved. You can also choose whether one email is sent per incident or per new alert added to it, and whether the email includes organization details such as the tenant name. A common design is to email the on-call lead for every high-severity incident and nobody for low ones, so the inbox stays meaningful. Remember that email is a supplement, not the queue. Analysts still work incidents in the portal, and a notification rule never changes an incident's status, assignment or severity.",
   "Next comes alert tuning, previously called suppression rules. It handles alerts you have already investigated and judged benign, such as a legitimate admin tool that always triggers the same detection. You find it under Settings, Microsoft Defender XDR, Alert tuning, or you create a rule directly from an alert's page with the Tune alert option, which pre-fills conditions from that alert. A rule is built from conditions on the alert and its evidence, such as the file name or hash, the process command line, an IP address, a user or a device, and it has a scope: every device or only selected ones. The action is either to hide the alert or to resolve it automatically. The key idea is that tuning changes only alerting. Protection and data collection keep running, so the activity is still recorded in advanced hunting. That is why tuning is safer than an allow indicator or an antivirus exclusion, both of which change what the product blocks or scans.",
   "Access in the portal is controlled in two complementary ways. Microsoft Entra ID roles such as Global Administrator, Security Administrator, Security Operator and Security Reader apply across the whole tenant and every workload, so they are broad by design. Microsoft Defender XDR Unified role-based access control (RBAC) lets you build custom roles from permission groups, namely security operations, security posture, and authorization and settings, and assign them to users or groups for chosen data sources, such as endpoints only or email and collaboration only. You activate unified RBAC per workload under Settings, Microsoft Defender XDR, Permissions. Least privilege is the guiding rule: Tier-1 analysts get read and triage rights, while only a small group can change settings or run live response on a device.",
   "Device groups are defined under Settings, Endpoints, Device groups. Each group has a rank, matching rules (device name, domain, tag or operating system), an automation level and a list of Microsoft Entra user groups that may access it. Automation levels run from no automated response, through semi-automated options that require approval, to full remediation. A device joins only the highest-ranked group whose rules it matches, and anything that matches nothing lands in the default ungrouped devices group. Device groups do three jobs: they scope who can see and act on devices, they set how much automated investigation and remediation (AIR) happens, and they can scope notifications, indicators and tuning rules. Tags, set manually in the portal, through a registry value or through Intune, are the usual way to steer a device into a group.",
   "Consider a worked example. A hospital's backup software triggers a credential-access alert every night on two backup servers. The SOC lead confirms the behavior is expected by checking the process path and the file signer, then chooses Tune alert from the alert page. She sets conditions on the process file path and command line, scopes the rule to a device group containing only those two servers, and sets the action to resolve the alert. She also creates an EU-Servers device group, ranked above the general servers group, with semi-automated remediation and access granted to the EU analysts' Entra group only. Finally, an incident notification rule emails the on-call lead for high-severity incidents from any source. The detection still fires on every other server, so a real attacker using the same technique elsewhere would still be caught.",
   "Several mistakes come up again and again. Teams use a tenant-wide allow indicator or exclusion to silence one noisy alert, which weakens protection everywhere. They scope a tuning rule to all devices when only two need it. They assume a lower-ranked device group wins because its rule is more specific, when in fact rank decides, not specificity. They give analysts Security Administrator when a custom unified RBAC role would do, and they forget that devices in no group still need an owner and an automation level. Another trap is expecting an email rule to page someone reliably at night. If that matters, integrate the incident queue with your on-call tooling instead of relying on an inbox.",
   "Exam questions are usually short scenarios with a clear clue. 'Stop a known-benign alert without reducing protection' points to alert tuning with a narrow scope. 'Analysts in one region must only see their region's devices' points to device groups with Entra user group access. 'Grant a custom set of permissions only for email data' points to Defender XDR unified RBAC. 'Notify a manager only for high-severity incidents' points to an incident email notification rule with a severity filter. 'A device matches two groups' is answered by rank. If you can name which of the four settings each clue maps to, this part of the exam becomes quick points."
  ],
  "analogy": "Alert tuning is like telling a building's front desk, 'When the bakery's smoke detector beeps at 6 a.m., note it and do not call me.' The detector still works and still logs every beep, and a beep from any other room still reaches you. An allow indicator or exclusion is more like unplugging the detector. The analogy stops at scope: a tuning rule can be limited to specific devices, so on the exam always pick the narrowest scope that covers the known-benign case.",
  "terms": [
   [
    "Alert tuning rule",
    "A rule, formerly called a suppression rule, that hides or auto-resolves alerts matching chosen conditions without changing protection or data collection."
   ],
   [
    "Unified RBAC",
    "Defender XDR's role-based access control model, where custom roles combine permission groups and are assigned per data source."
   ],
   [
    "Device group",
    "A ranked set of devices, defined by matching rules, that controls access, automation level and scope for other settings."
   ],
   [
    "Device group rank",
    "The order that decides which group a device joins when it matches several; the highest-ranked match wins."
   ],
   [
    "Incident notification rule",
    "A setting that emails chosen recipients when incidents matching filters such as severity, source or device group are created or updated."
   ],
   [
    "Automation level",
    "The per-device-group setting that decides whether automated investigation remediates on its own or waits for approval."
   ],
   [
    "Ungrouped devices",
    "The default group that holds any device not matching the rules of a defined device group."
   ]
  ],
  "example": "A hospital's backup software triggers a suspicious credential access alert every night on two backup servers. After confirming the behavior is expected, the SOC lead creates an alert tuning rule for that process path, scoped to those two servers, set to resolve the alert. The same detection still fires on any other device, and a new incident notification rule emails her only for high-severity incidents.",
  "mistakes": [
   [
    "Using an allow indicator or antivirus exclusion to silence a noisy but benign alert.",
    "That changes what Defender blocks or scans, often tenant-wide. Alert tuning only hides or resolves the alert, so protection and telemetry stay intact."
   ],
   [
    "Thinking the most specific device group rule wins when a device matches two groups.",
    "Rank decides. The device joins the highest-ranked group whose rules it matches, regardless of how specific the lower group's rule is."
   ],
   [
    "Giving every analyst the Entra Security Administrator role so they can triage.",
    "That role is tenant-wide and allows settings changes. A custom unified RBAC role with security operations permissions, scoped to the needed data sources, is the least-privilege answer."
   ],
   [
    "Assuming an email notification rule resolves or assigns incidents.",
    "Notification rules only send email. Status, assignment and severity are changed in the incident queue or by automation."
   ]
  ],
  "tryit": [
   [
    "At Northwind Clinics, analysts in the Canada office must see and act only on Canadian devices, and those devices should remediate automatically only after approval. All Canadian laptops carry the tag CA. What do you configure?",
    "Create a device group with a matching rule on the CA tag, give it a semi-automated (approval required) automation level, and grant access to the Canadian analysts' Entra user group. Rank it above any broader group those devices might also match, because rank decides membership."
   ],
   [
    "A vulnerability scanner at Pine Ridge Schools triggers a port-scan alert on every run, always from the same host and command line. Your colleague proposes adding the scanner's IP as an allow indicator. What do you suggest instead?",
    "Create an alert tuning rule with conditions on that host and command line, scoped as narrowly as possible, set to resolve the alert. Tuning silences the known-benign alert while leaving detection and protection in place for everything else."
   ]
  ],
  "tip": "To silence one known-benign alert while keeping protection, pick alert tuning scoped narrowly. To limit which devices an analyst can see, pick a device group with Entra group access, not a tenant-wide Entra role. When two device groups match, the higher rank wins.",
  "check": [
   [
    "Why is an alert tuning rule usually safer than a tenant-wide allow indicator for a noisy admin tool?",
    "Tuning only hides or resolves the alert; the tool is still monitored and protection is unchanged. An allow indicator changes prevention for every device in scope."
   ],
   [
    "A device matches the rules of two device groups. Which one does it join?",
    "The one with the higher rank. Devices join only the highest-ranked group whose matching rules they meet."
   ],
   [
    "What filters can an incident email notification rule use?",
    "Filters such as minimum severity, the source product and device groups, along with the list of recipients."
   ],
   [
    "You need a role that lets a team triage only email alerts. Which feature do you use?",
    "A custom Defender XDR unified RBAC role with security operations permissions, assigned for the email and collaboration data source only."
   ]
  ]
 },
 {
  "t": "Defender for Endpoint configuration: onboarding, device groups, tamper protection, attack surface reduction rules (audit, warn, block), indicators and network protection, device discovery",
  "hook": "Priya, the only security admin at Lakeside Accounting, gets a call at 7:40 a.m. A partner opened a 'tax update' spreadsheet, a macro ran, and now the help desk says Microsoft Defender Antivirus is switched off on her laptop. Priya checks the portal and sees three more laptops she does not recognize on the office network, with no sensor at all. She had a URL block indicator for the attacker's domain, but the partner browsed with Chrome and it never fired. Each of these gaps maps to one Defender for Endpoint setting. Which ones would have stopped this morning from happening, and in what order should she turn them on without breaking the firm's own spreadsheets?",
  "simple": "Defender for Endpoint is the security guard software that lives on each computer. First you have to sign each computer up so it reports to your team, like registering a phone with the company (onboarding). Then you lock the guard's own settings so nobody, not even a sneaky program with admin rights, can tell the guard to take the day off (tamper protection). You can also give the guard house rules such as 'spreadsheets may not start other programs' (attack surface reduction rules), first just writing down rule breaks, then blocking them. You add your own blocklists of bad files and websites (indicators), and a filter that checks every website visit, not just in one browser (network protection). Finally, the guards can spot computers in the building that were never signed up (device discovery).",
  "body": [
   "Microsoft Defender for Endpoint (MDE) is the endpoint detection and response (EDR) and protection product in Defender XDR. It uses sensors built into Windows and agents for macOS, Linux, iOS and Android to send telemetry to the cloud, where detections become alerts and incidents. It also manages Microsoft Defender Antivirus and a set of hardening features. Configuring it well decides two things: whether your SOC sees attacks at all, and whether common attack techniques are blocked before they start. This lesson follows the order you would actually work in, from getting devices connected to tightening what they allow.",
   "Onboarding connects a device to your tenant. Methods include a local script (good for a handful of test machines), Group Policy, Microsoft Intune, Configuration Manager, dedicated scripts for non-persistent virtual desktops, and Defender for Cloud for servers. Each method uses an onboarding package downloaded from Settings, Endpoints, Onboarding, where you pick the operating system and the deployment method. After onboarding, the same page offers a harmless detection test command that produces a test alert, which is how you confirm the device reports. You can also check the device's health state, sensor status and last-seen time in the device inventory. Offboarding uses a separate package and is how you retire a device cleanly so it stops counting as active.",
   "Device discovery uses onboarded devices to find unmanaged devices on the same networks. Standard discovery, the default, actively probes found devices to learn more about them, such as their operating system and device type. Basic discovery only listens passively to network traffic the onboarded device already sees, so it collects less detail. Discovered devices appear in the device inventory with an onboarding status such as can be onboarded or unsupported, so you can close the gaps attackers love. Discovery finds devices. It does not onboard them, so someone still has to deploy a package or policy.",
   "Device groups, covered in the previous lesson, control who can see and act on each device and the automated remediation level it gets. Tamper protection stops people, including local administrators and malware running with admin rights, from turning off real-time protection, cloud-delivered protection, behavior monitoring and other security settings. Attackers commonly try to disable antivirus before running ransomware, so tamper protection should be on everywhere. You turn it on tenant-wide under Settings, Endpoints, Advanced features, or manage it per device through Intune. Once it is on, changes made locally, for example with `Set-MpPreference -DisableRealtimeMonitoring $true`, are ignored, and the attempt itself can be surfaced as an alert.",
   "Attack surface reduction (ASR) rules block behaviors that attackers use and normal users rarely need: Office apps creating child processes, credential stealing from the Local Security Authority Subsystem Service (LSASS), obfuscated scripts, executable content from email and others. Each rule has a mode. Audit logs what would have been blocked without blocking it. Warn blocks the action but lets the user click through a notice, and not every rule supports it. Block enforces the rule. The safe rollout is audit first, review the events in the ASR report or in advanced hunting, add narrow exclusions for legitimate line-of-business apps, then move to block in stages, starting with a pilot group. Intune endpoint security profiles are the usual place to set modes, and a quick hunting query to review results looks like `DeviceEvents | where ActionType startswith \"Asr\"`, which returns both audited and blocked events.",
   "Indicators of compromise (IoCs) are your own allow or block entries, created under Settings, Endpoints, Indicators. File hash indicators can allow, audit, warn, block execution, or block and remediate. IP address, URL and domain indicators and certificate indicators work in a similar way and can be scoped to device groups. Here is the dependency the exam loves: for IP and URL indicators to block traffic from browsers other than Microsoft Edge and from other processes, network protection must be turned on in block mode, and the custom network indicators advanced feature must be enabled. Network protection extends SmartScreen-style reputation blocking to the whole operating system, so it also stops connections to known malicious or command-and-control sites. Like ASR, it has an audit mode for testing before you enforce it.",
   "Consider a worked example. An accounting firm wants to block Office macros from launching child processes. The admin sets that ASR rule to audit for two weeks, finds in the ASR report that a reporting add-in triggers it, adds a path exclusion for that add-in, then switches the rule to block for a pilot device group before rolling it out everywhere. She turns on tamper protection tenant-wide, enables network protection in block mode and custom network indicators, and recreates her domain block indicator, which now applies in every browser. Meanwhile device discovery shows three unmanaged laptops, which are onboarded through Intune and confirmed with the detection test.",
   "Common mistakes are predictable. Admins jump straight to block and break business apps. They create a URL block indicator and wonder why Chrome ignores it, because network protection is off. They turn tamper protection on through Intune for some devices but leave others unmanaged. They assume audit mode protects anything, when it only logs. They add a broad folder exclusion that attackers can abuse by dropping malware into that folder. And they think device discovery onboards devices automatically, when it only finds them.",
   "Exam wording is usually direct. 'Test the impact of a rule without affecting users' means audit mode. 'Let users bypass with a warning' means warn mode. 'A local administrator or malware disabled antivirus' means tamper protection. 'Block a malicious domain for all browsers and processes' means an indicator plus network protection in block mode. 'Find devices that are not onboarded' means device discovery and the device inventory. 'Confirm onboarding works' means the detection test. Read each scenario for the one verb that matters, such as test, bypass, prevent or find, and the matching feature usually follows."
  ],
  "analogy": "Rolling out an ASR rule is like introducing a new rule at a school. For two weeks the hall monitor only writes down who would have broken it (audit), which shows you that the art club has a good reason to need an exception. Then the monitor stops people but lets them explain and pass (warn), and finally enforces it (block). The analogy stops at warn: not every ASR rule offers warn mode, so some go straight from audit to block.",
  "terms": [
   [
    "Onboarding package",
    "The script or configuration downloaded from the Defender portal that connects a device to your tenant through a chosen deployment method."
   ],
   [
    "Detection test",
    "A harmless command offered on the onboarding page that generates a test alert to prove a device is reporting."
   ],
   [
    "Tamper protection",
    "A setting that prevents local changes to Defender security settings, even by administrators or malware with admin rights."
   ],
   [
    "ASR rule modes",
    "Audit logs only, Warn blocks but allows a user bypass, and Block enforces the rule."
   ],
   [
    "Indicator",
    "A custom allow, audit, warn or block entry for a file hash, IP address, URL, domain or certificate."
   ],
   [
    "Network protection",
    "An operating-system-wide filter that blocks connections to malicious domains and IPs and enforces custom IP and URL indicators outside Edge."
   ],
   [
    "Device discovery",
    "The feature that uses onboarded devices to find unmanaged devices on the network, in basic (passive) or standard (active) mode."
   ]
  ],
  "example": "An accounting firm wants to block Office macros from launching child processes. The admin sets that ASR rule to audit for two weeks, finds that a reporting add-in triggers it, adds an exclusion for that add-in's path, then switches the rule to block for a pilot group before rolling it out to all device groups. The same week, device discovery finds three unmanaged laptops, which the team onboards through Intune.",
  "mistakes": [
   [
    "Setting a new ASR rule straight to block because audit 'does nothing'.",
    "Audit is how you find legitimate apps the rule would break. Run audit, review the ASR report or hunting data, add narrow exclusions, then block in stages."
   ],
   [
    "Expecting a URL or IP block indicator to work in every browser by itself.",
    "Outside Microsoft Edge, IP and URL indicators are enforced only when network protection is in block mode and custom network indicators are enabled."
   ],
   [
    "Believing device discovery onboards the unmanaged devices it finds.",
    "Discovery only finds and lists them in the device inventory. You still onboard them with a package, Intune or another method."
   ],
   [
    "Thinking a local administrator can always turn Defender off.",
    "With tamper protection on, local changes to real-time protection and other security settings are ignored, even from admin accounts or malware with admin rights."
   ]
  ],
  "tryit": [
   [
    "At Maple Freight, a new ASR rule blocking obfuscated scripts has been in audit mode for ten days. The report shows 40 events, 38 of them from a single signed inventory script on warehouse PCs. Management wants protection turned on this week. What do you do?",
    "Add a narrow exclusion for the inventory script's path (not its whole folder tree), switch the rule to block for a pilot device group, watch for new events, then expand to all groups. That gives protection quickly without breaking the warehouse workflow."
   ],
   [
    "A Riverside Library analyst reports that a domain block indicator stops access in Edge but staff using Firefox reach the site. What two settings do you check?",
    "Check that network protection is enabled in block mode on those devices and that the custom network indicators advanced feature is turned on. Both are required for IP and URL indicators to apply outside Edge."
   ]
  ],
  "tip": "Expect questions on the order of ASR rollout (audit before block) and on the dependency between custom IP or URL indicators and network protection. Tamper protection is the answer whenever someone with admin rights tries to switch off Defender. Device discovery finds devices but never onboards them.",
  "check": [
   [
    "A custom URL block indicator works in Edge but not in Chrome. What is missing?",
    "Network protection in block mode (with custom network indicators enabled). It enforces IP and URL indicators for other browsers and processes."
   ],
   [
    "What does warn mode do in an ASR rule?",
    "It blocks the action but shows the user a notice that lets them unblock it and continue, for rules that support warn."
   ],
   [
    "How can you find devices on your network that are not onboarded to Defender for Endpoint?",
    "Use device discovery; the unmanaged devices it finds appear in the device inventory for onboarding."
   ],
   [
    "How do you confirm a newly onboarded device is reporting?",
    "Run the detection test command from the onboarding page and check that a test alert appears and the device shows in the inventory."
   ]
  ]
 },
 {
  "t": "Defender for Cloud: foundational CSPM vs paid workload protection plans (Servers, Storage, Databases), connecting AWS and GCP accounts, Defender for Endpoint integration for servers",
  "hook": "Marco runs cloud security for Bluefin Outfitters, a retailer with web servers in Azure and in an AWS account the e-commerce team set up last year. His dashboard shows a healthy secure score and a tidy list of recommendations for both clouds. Then a penetration tester on contract mentions, almost casually, that she ran a suspicious tool on one of the EC2 instances an hour ago. Marco checks Defender for Cloud. No alert. No incident in the Defender portal either. The AWS account is connected, the posture data is flowing, so why is nobody watching the actual servers?",
  "simple": "Defender for Cloud does two different jobs. The first is like a home inspector who walks around and says, 'Your back door lock is weak and a window is open.' That is posture management: it checks how things are set up and gives you a score and a to-do list. The basic version is free and on by default. The second job is like a burglar alarm that goes off when someone is actually inside. That is workload protection, and you pay for it per type of thing you protect, such as servers, storage or databases. Having the inspector does not mean you have the alarm. Defender for Cloud can also inspect and guard servers in other clouds, such as Amazon's and Google's, once you connect them.",
  "body": [
   "Microsoft Defender for Cloud protects cloud resources in Azure, Amazon Web Services (AWS), Google Cloud Platform (GCP) and on-premises servers. It does two different jobs, and the exam expects you to keep them apart. Cloud security posture management (CSPM) looks for weaknesses in how resources are configured, such as a storage account open to the internet or a virtual machine (VM) missing updates. Cloud workload protection, delivered through the Defender plans, detects active threats against running workloads and raises security alerts. Posture is prevention and hygiene; workload protection is detection. Almost every Defender for Cloud question becomes easier once you decide which of the two the scenario is really about.",
   "Foundational CSPM is on by default at no extra charge. It gives you a secure score, security recommendations based on the Microsoft cloud security benchmark, an asset inventory and regulatory compliance views for some standards. A recommendation looks like 'Storage accounts should restrict network access', with affected resources, a severity and remediation steps. The paid Defender CSPM plan adds deeper posture features such as attack path analysis, the cloud security explorer, agentless scanning, data-aware posture and governance rules that assign owners and due dates to recommendations. Neither CSPM plan produces threat alerts about an attacker on a VM. That is the job of workload protection.",
   "Workload protection is enabled per plan and per scope, meaning per Azure subscription, AWS account or GCP project, under Environment settings, then Defender plans. Defender for Servers protects Windows and Linux machines and comes in Plan 1 and Plan 2. Plan 2 adds more features, such as agentless vulnerability scanning, file integrity monitoring and just-in-time (JIT) VM access, which opens management ports only when an approved user requests them. Defender for Storage detects threats against storage accounts, such as unusual access patterns and malware uploads, with optional malware scanning of new blobs. The databases plans cover Azure SQL, SQL servers on machines, open-source relational databases and Azure Cosmos DB, and alert on things like SQL injection attempts and brute-force logins. There are also plans for containers, App Service, Key Vault, Resource Manager and APIs. Turning on a plan for one subscription does not cover the others.",
   "To protect AWS and GCP, you add an environment in Defender for Cloud's Environment settings. For AWS, you create a connector, choose plans, and deploy the provided CloudFormation template, which creates the roles Defender for Cloud assumes to read the account. For GCP, you run a provided script, typically in Cloud Shell, to create the workload identity federation, service accounts and permissions. You then choose which plans to turn on for that connector, such as Defender CSPM and Defender for Servers. If you later add plans, the connector may ask you to update the template or script, because new plans can need new permissions. Servers outside Azure, including on-premises machines, can be connected through Azure Arc so that Azure extensions can be deployed to them, and multicloud connectors can auto-provision Arc for EC2 and Compute Engine instances.",
   "Defender for Servers includes a Defender for Endpoint license and integrates the two automatically. When the endpoint protection integration is on, in the plan's settings, Defender for Cloud deploys the Defender for Endpoint sensor to supported machines, onboards them to your Defender for Endpoint tenant, and shows Defender for Endpoint alerts in Defender for Cloud. The same machines appear in the Defender portal device inventory, so your endpoint analysts and cloud team see one set of detections rather than two competing views. The integration also feeds vulnerability data from Microsoft Defender Vulnerability Management into Defender for Cloud recommendations, so a missing patch found by the sensor shows up as a posture item too.",
   "Consider a worked example. A retailer runs web servers on Azure VMs and AWS EC2. Secure score shows recommendations for both, but no alerts appear when a test detection runs on an EC2 instance. Checking Environment settings, the team sees the AWS connector has only foundational CSPM. They enable Defender for Servers Plan 2 on the connector, update the CloudFormation stack as prompted, and confirm Azure Arc onboards the instances. Within a few hours the Defender for Endpoint sensor is present, the machines appear in the device inventory, and a repeat test produces an alert in both Defender for Cloud and the Defender portal.",
   "Common mistakes follow from blurring the two jobs. People expect foundational CSPM to raise alerts. They confuse secure score, which is a posture measure, with an alert count. They enable a plan on one subscription and assume it covers the whole tenant. They forget to update the AWS CloudFormation stack after adding plans, so new permissions are missing and features silently fail. They buy a separate Defender for Endpoint license for servers already covered by Defender for Servers. Another trap is thinking attack path analysis is free, when it belongs to the paid Defender CSPM plan.",
   "A simple way to remember the split: posture tells you where the doors are unlocked, and workload protection tells you someone is walking through one. On the exam, 'secure score', 'recommendation' and 'compliance' point to CSPM, while 'attack path' and 'cloud security explorer' point to Defender CSPM. 'Suspicious process on a VM', 'malware uploaded to a blob' and 'SQL injection' point to a paid workload plan. 'Connect AWS' means a connector with a CloudFormation template, and 'connect GCP' means a connector with a Cloud Shell script. 'Servers need EDR without a separate license' means the Defender for Endpoint integration in Defender for Servers."
  ],
  "analogy": "Foundational CSPM is a home inspection report: it lists the unlocked windows and gives your house a score, for free. Defender CSPM is a premium inspector who also traces how a burglar could chain those weaknesses together (attack paths). The workload plans are the alarm system on each room, sold room by room: servers, storage, databases. The analogy stops at installation: with Defender for Servers, the 'alarm' (the Defender for Endpoint sensor) can be installed for you automatically, even on servers in AWS or GCP.",
  "terms": [
   [
    "Foundational CSPM",
    "The free Defender for Cloud tier that provides secure score, recommendations and asset inventory."
   ],
   [
    "Defender CSPM",
    "The paid posture plan that adds attack path analysis, cloud security explorer, agentless scanning and governance."
   ],
   [
    "Cloud workload protection",
    "The paid Defender plans (Servers, Storage, Databases and others) that detect threats and raise security alerts."
   ],
   [
    "Secure score",
    "A posture measure based on how many security recommendations you have addressed; it is not an alert count."
   ],
   [
    "Multicloud connector",
    "The Defender for Cloud connection to an AWS account or GCP project, created with a CloudFormation template or a GCP script."
   ],
   [
    "Azure Arc",
    "The service that projects non-Azure servers into Azure so extensions and Defender plans can be applied to them."
   ],
   [
    "Defender for Endpoint integration",
    "The Defender for Servers feature that deploys and licenses the Defender for Endpoint sensor on protected servers."
   ]
  ],
  "example": "A retailer runs web servers on Azure VMs and AWS EC2. Secure score shows recommendations for both, but no alerts appear when a test detection runs on EC2. The team realizes they only have foundational CSPM on the AWS connector, so they enable Defender for Servers on it; the Defender for Endpoint sensor is then deployed and alerts start arriving in Defender for Cloud and in the Defender portal.",
  "mistakes": [
   [
    "Expecting foundational CSPM to alert on an attacker running tools on a VM.",
    "CSPM only assesses configuration. Threat alerts come from a workload protection plan such as Defender for Servers."
   ],
   [
    "Treating a high secure score as proof that no attacks are happening.",
    "Secure score measures posture, how well recommendations are addressed. It says nothing about active threats; alerts do."
   ],
   [
    "Assuming attack path analysis is part of the free tier.",
    "Attack path analysis and the cloud security explorer are paid Defender CSPM features."
   ],
   [
    "Buying separate Defender for Endpoint licenses for servers already on Defender for Servers.",
    "Defender for Servers includes the Defender for Endpoint license and can deploy the sensor automatically through the integration."
   ]
  ],
  "tryit": [
   [
    "Oakmont Health keeps patient files in Azure Blob Storage. Auditors ask how the team would know if someone uploaded malware to a container. The subscription currently has only foundational CSPM. What do you enable?",
    "Enable Defender for Storage on that subscription, with malware scanning turned on. CSPM can flag risky storage configuration, but only the workload plan raises alerts about malware uploads and unusual access."
   ],
   [
    "Cedar Logistics just connected a GCP project with only Defender CSPM selected. A week later, the team adds Defender for Servers to the connector, but servers never get the Defender for Endpoint sensor. What should they check first?",
    "Check whether the connector asked for the GCP setup script to be rerun or updated after adding the plan, since new plans can require new permissions, and confirm Azure Arc provisioning and the endpoint protection integration setting are on."
   ]
  ],
  "tip": "If an option says foundational CSPM will produce threat alerts, it is wrong. Threat alerts need a Defender workload plan; attack path analysis needs the paid Defender CSPM plan. Plans are turned on per subscription, AWS account or GCP project.",
  "check": [
   [
    "Which tier gives secure score at no extra charge?",
    "Foundational CSPM, which is enabled by default."
   ],
   [
    "How do you connect an AWS account to Defender for Cloud?",
    "Create an AWS connector in Environment settings and deploy the CloudFormation template it generates, then choose the plans to enable."
   ],
   [
    "What does the Defender for Endpoint integration in Defender for Servers do?",
    "It deploys and onboards the Defender for Endpoint sensor on supported servers and brings its EDR detections into Defender for Cloud and the Defender portal."
   ],
   [
    "Which plan do you need for alerts about malware uploaded to blob storage?",
    "Defender for Storage, ideally with malware scanning enabled; CSPM plans do not raise threat alerts."
   ]
  ]
 },
 {
  "t": "Defender for Identity sensors on domain controllers and AD FS/AD CS servers; Defender for Office 365 Safe Links and Safe Attachments",
  "hook": "At Granite & Ross, a mid-sized law firm, you are reviewing a strange week. An attacker moved from a paralegal's laptop to a file server using stolen Kerberos tickets, yet Defender for Identity raised nothing. You open the Sensors page and count: four domain controllers have healthy sensors, and the fifth, a DC built during an office move, has none. On the same day, a partner clicked a link in a client's email that was clean when it arrived and pointed to a credential-harvesting page two hours later. That click was blocked. Why did one control work and the other fail, and what exactly needs to be installed where?",
  "simple": "This lesson covers two guards. The first, Defender for Identity, watches the servers that check passwords and hand out access passes in a company network. Every one of those servers needs its own small watcher program, because an attacker can choose which one to ask. Skip one, and that is the unwatched door. The second guard, Defender for Office 365, protects email. Safe Links checks a web link again at the moment you click it, because a link can be safe on Monday and dangerous on Tuesday. Safe Attachments opens email attachments in a sealed test room first, like a bomb squad opening a suspicious package, so hidden malware shows itself before the file reaches you.",
  "body": [
   "Microsoft Defender for Identity (MDI) watches on-premises Active Directory (AD) for attacks such as reconnaissance, credential theft, lateral movement and domain dominance. It needs to see authentication and directory traffic, so it relies on sensors installed on the servers that handle identity: every domain controller, plus Active Directory Federation Services (AD FS) servers, Active Directory Certificate Services (AD CS) servers and Microsoft Entra Connect servers. Missing even one domain controller creates a blind spot, because a client's Kerberos and NTLM requests can go to any domain controller, including the unmonitored one. Federation, certificate and sync servers matter too, because attackers target them to forge tokens, issue rogue certificates or abuse synchronization.",
   "The sensor reads network traffic, Windows events and Event Tracing for Windows (ETW) data locally and sends parsed data to the cloud service. A few setup steps are worth knowing. You create the MDI workspace in the Defender portal and configure a Directory Service account that the sensor uses to query AD; a group managed service account (gMSA) is recommended. You configure the required Windows advanced audit policies so the right events are logged, check network and firewall requirements, and install the sensor with the access key shown under Settings, Identities, Sensors. On domain controllers already onboarded to Defender for Endpoint, newer Windows Server versions can activate the identity sensor capability from the Defender portal without a separate installer.",
   "Sensor health matters as much as installation. Issues such as a stopped service, a sensor that cannot reach the cloud, or missing audit settings appear as health issues on the Sensors page, and you can have them emailed to the team. A sensor that is installed but unhealthy is close to having no sensor at all. The PowerShell module for Defender for Identity includes cmdlets such as `Get-MDIConfiguration` and `Set-MDIConfiguration` that check and apply the required audit policies, which is faster and more reliable than hunting through Group Policy by hand.",
   "Microsoft Defender for Office 365 (MDO) protects email and collaboration tools, and two of its policies appear on the exam constantly. Safe Links checks URLs at the time of click rather than only on delivery. That matters because attackers often send a link that points to a clean page and weaponize it hours later, after filters have waved the message through. Safe Links can rewrite URLs in email, check links in Microsoft Teams and Office apps, track clicks for investigation in the UrlClickEvents table in advanced hunting, and optionally stop users from clicking through the warning page. You can also list URLs that should not be rewritten, for trusted internal sites.",
   "Safe Attachments opens attachments in a sandbox, a process called detonation, to detect unknown malware that signature scanning misses. Its actions include Monitor (deliver the message and track scan results), Block (hold the message and quarantine it if malicious) and Dynamic Delivery (deliver the message body right away with a placeholder, then attach the file once it is scanned clean). A separate global setting turns on Safe Attachments for SharePoint, OneDrive and Teams, which blocks malicious files stored there. Both policies can be applied through preset security policies, Standard and Strict, which Microsoft maintains, or through custom policies scoped to users, groups or domains. Built-in protection gives baseline coverage to licensed users who are not covered by any other policy, and presets take precedence over custom policies when both apply to the same user.",
   "Consider a worked example. A law firm installed Defender for Identity sensors on four of its five domain controllers. A pass-the-ticket attack goes undetected because the attacker's requests hit the fifth. The SOC notices the gap on the Sensors page, installs the missing sensor, runs `Set-MDIConfiguration` to fix the audit policy health issue, and similar activity then raises alerts within minutes. The same month, a partner's shared link turns malicious two hours after delivery. Safe Links blocks the click with a warning page, and the analyst queries UrlClickEvents to see who else clicked. The firm also switches its Safe Attachments policy to Dynamic Delivery after lawyers complain about delayed mail.",
   "Common mistakes cluster around coverage and precedence. Teams install sensors only on domain controllers and forget AD FS, AD CS and Entra Connect. They use a regular user account with an expiring password for the Directory Service account instead of a gMSA, so the sensor breaks months later. They ignore health issues. They mix up Safe Links (URLs, time of click) and Safe Attachments (files, sandbox). They build a custom policy for a user who is already in a Strict preset, then wonder why the custom settings do not apply. Another trap is assuming Safe Attachments for email also covers SharePoint and OneDrive; that is a separate global setting.",
   "Exam questions use strong clue words. 'Every domain controller', 'certificate services' or 'federation server' point to MDI sensor placement. 'Account the sensor uses to query AD' points to the Directory Service account, preferably a gMSA. 'Clean at delivery, malicious later' or 'time of click' means Safe Links. 'Unknown malware in attachments', 'sandbox' or 'detonation' means Safe Attachments. 'Users complain about delayed attachments' means Dynamic Delivery. 'Custom policy seems ignored' often means a preset security policy applies first. 'Malicious file uploaded to a Teams channel' means the global Safe Attachments setting for SharePoint, OneDrive and Teams."
  ],
  "analogy": "Safe Links is like a building receptionist who checks a visitor's badge when they arrive at the door, not when the invitation was mailed weeks earlier, because things change in between. Safe Attachments is the mailroom that X-rays and opens packages in a blast-proof room before delivery. Dynamic Delivery is the mailroom handing you the letter now and the package later. The analogy stops at Teams and SharePoint: files stored there need a separate global switch, not the email policy.",
  "terms": [
   [
    "Defender for Identity sensor",
    "Software installed on domain controllers and AD FS, AD CS and Entra Connect servers that collects identity traffic and events for detection."
   ],
   [
    "Directory Service account",
    "The account, ideally a gMSA, that Defender for Identity uses to query Active Directory."
   ],
   [
    "Group managed service account (gMSA)",
    "An AD account whose password is managed and rotated automatically by domain controllers, suited to services."
   ],
   [
    "Safe Links",
    "An MDO feature that checks URLs when they are clicked in email, Teams and Office apps."
   ],
   [
    "Safe Attachments",
    "An MDO feature that detonates attachments in a sandbox to find unknown malware before or during delivery."
   ],
   [
    "Dynamic Delivery",
    "A Safe Attachments action that delivers the email body immediately and adds the attachment after sandbox scanning."
   ],
   [
    "Preset security policies",
    "Microsoft-maintained Standard and Strict policy bundles that take precedence over custom policies."
   ]
  ],
  "example": "A law firm installed Defender for Identity sensors on four of its five domain controllers. A pass-the-ticket attack goes undetected because the attacker's requests hit the fifth. After installing the missing sensor and fixing the audit policies flagged in sensor health, similar activity raises alerts within minutes. The firm also enables Dynamic Delivery so lawyers get message bodies immediately while attachments are scanned.",
  "mistakes": [
   [
    "Installing Defender for Identity sensors only on domain controllers.",
    "AD FS, AD CS and Entra Connect servers also need sensors, because attackers abuse federation, certificates and sync to gain or forge access."
   ],
   [
    "Using a normal user account with an expiring password as the Directory Service account.",
    "A gMSA is recommended; its password rotates automatically and it cannot be used for interactive logon, so the sensor keeps working."
   ],
   [
    "Picking Safe Attachments for a link that turned malicious after delivery.",
    "Links are Safe Links territory, which rechecks the URL at the time of click. Safe Attachments sandboxes files."
   ],
   [
    "Expecting a custom policy to override a Strict preset for the same user.",
    "Preset security policies take precedence over custom policies, so the preset settings win."
   ]
  ],
  "tryit": [
   [
    "Pelican Bay Credit Union has six domain controllers, two AD FS servers, one AD CS server and one Entra Connect server. The team has Defender for Identity sensors on the six domain controllers and says coverage is complete. Is it?",
    "No. Sensors are also needed on both AD FS servers, the AD CS server and the Entra Connect server. Without them, attacks against federation, certificate issuance or synchronization could go unseen."
   ],
   [
    "At Summit Architects, staff complain that emails with drawings arrive several minutes late. Leadership refuses to weaken malware protection. Which Safe Attachments setting balances both needs?",
    "Dynamic Delivery. The message body is delivered immediately with a placeholder, and the attachment is added once the sandbox finds it clean, so protection stays on while delays shrink."
   ]
  ],
  "tip": "Know the server list for MDI sensors: all domain controllers plus AD FS, AD CS and Entra Connect. For MDO, time-of-click checking means Safe Links; sandbox detonation means Safe Attachments. Presets beat custom policies.",
  "check": [
   [
    "Why must every domain controller have a Defender for Identity sensor?",
    "Authentication can go to any domain controller; one without a sensor is a blind spot where attacks are missed."
   ],
   [
    "A user receives a link that was clean on delivery but turned malicious later. Which feature protects them?",
    "Safe Links, because it checks the URL again at the time of click."
   ],
   [
    "Users complain that attachments delay their mail. Which Safe Attachments action helps?",
    "Dynamic Delivery, which delivers the message body at once and attaches the file after scanning."
   ],
   [
    "Which account type is recommended for the Defender for Identity Directory Service account, and why?",
    "A group managed service account, because its password is rotated automatically and it cannot be used for interactive logon."
   ]
  ]
 },
 {
  "t": "Sentinel workspace design: Log Analytics workspace, Sentinel roles (Reader, Responder, Contributor, Automation Contributor), onboarding to the Defender portal",
  "hook": "You have just joined Nordlicht Insurance as SOC lead, and your first meeting is with the legal team. Their message is blunt: German customer logs must never leave the European Union, but the Canadian office's logs live under different rules. Afterward, a Tier-1 analyst admits he accidentally disabled an analytics rule last week while trying to close an incident, because everyone on the team was given Contributor 'to keep things simple'. Then the automation engineer says her playbook will not show up in the automation rule's list. Three problems, one root cause: nobody designed the workspace and its permissions. Where do you start?",
  "simple": "Microsoft Sentinel is the security team's central log book and alarm system, but it does not keep its own shelves. It stores everything in a Log Analytics workspace, which is like a big filing cabinet in the cloud. Usually one cabinet is best, because it is easier to search everything at once. You only add a second cabinet when there is a real reason, such as a law that says some files must stay in a certain country. Then you decide who gets which keys: some people can only read, some can also handle cases, and some can change the rules. Finally, Microsoft is moving Sentinel into the Defender portal, so security alerts from many tools land in one shared to-do list.",
  "body": [
   "Microsoft Sentinel is a cloud-native security information and event management (SIEM) and security orchestration, automation and response (SOAR) service. It does not have its own storage. Instead, you enable Sentinel on an Azure Monitor Log Analytics workspace, and all ingested data lands in tables in that workspace, such as SigninLogs, SecurityEvent and CommonSecurityLog. So the first design decision is how many workspaces you need, where they live and who can see them. Everything else, from detection rules to hunting queries, sits on top of that choice.",
   "Microsoft's general advice is to use as few workspaces as possible, ideally one, because a single workspace makes correlation, rules and hunting simpler. Reasons to split include data residency laws that require data to stay in a region, separate billing or ownership for business units, and managed security service providers (MSSPs) that keep customers apart. When you have several workspaces you can still query across them with the Kusto Query Language (KQL) `workspace()` function, and Azure Lighthouse lets providers manage many tenants from one place. Access to data inside one workspace can be narrowed with resource-context role-based access control (RBAC), where users see only logs from resources they can access, or with table-level RBAC.",
   "Sentinel has built-in Azure roles you assign at the resource group or workspace level. Microsoft Sentinel Reader can view data, incidents, workbooks and other content. Microsoft Sentinel Responder can do everything a Reader can plus manage incidents: assign them, change status and severity, comment and close. Microsoft Sentinel Contributor can additionally create and edit content such as analytics rules, workbooks and watchlists. Microsoft Sentinel Automation Contributor is not for people at all. It is the role you grant to the Sentinel service on a resource group so automation rules can run playbooks stored there. Creating or editing playbooks also needs Logic App Contributor, and Microsoft Sentinel Playbook Operator lets someone list and run playbooks manually.",
   "The rule of thumb is to pick the least role that does the job. A Tier-1 analyst who triages and closes incidents needs Responder, not Contributor. A detection engineer who writes rules needs Contributor. Someone who installs Content hub solutions also needs Contributor on the resource group. If an automation rule cannot select a playbook in another resource group, the usual fix is to open Settings, Playbook permissions in Sentinel, which grants the Sentinel service account the Automation Contributor role there. Assign roles to Entra groups rather than individuals, so onboarding a new analyst is a group membership change and an access review is a glance at a few groups.",
   "Microsoft is moving Sentinel into the Microsoft Defender portal, often called the unified security operations platform. You connect a workspace from the Defender portal under Settings, Microsoft Sentinel, and one workspace is marked as primary. After onboarding, Sentinel incidents and Defender XDR incidents share one queue, and the Defender XDR correlation engine groups alerts from both. Some things change. Microsoft incident creation rules are no longer needed because Defender XDR creates incidents. Fusion's role is taken over by Defender XDR correlation. Advanced hunting can query Sentinel tables alongside Defender tables. Most Sentinel configuration pages appear in the Defender portal under Microsoft Sentinel. Microsoft has announced that Sentinel in the Azure portal will be retired in favor of the Defender portal, so new deployments should plan for the unified experience.",
   "Consider a worked example. A European insurer with offices in Germany and Canada must keep German logs in the EU. It creates two workspaces, one in an EU region and one in a Canadian region, and enables Sentinel on both. It onboards both to the Defender portal, marking the EU workspace as primary. Tier-1 analysts receive Responder on both through an Entra group, the detection engineering team receives Contributor, and the SOC lead uses Playbook permissions to grant Sentinel Automation Contributor on the playbooks resource group. Cross-workspace hunting uses `union workspace(\"ws-canada\").SigninLogs, SigninLogs`, so analysts can still search both regions in one query without copying data between them.",
   "Common mistakes are mostly about doing too much. Teams create a workspace per data source, which fragments correlation for no benefit. They grant Contributor to everyone for convenience, so analysts can accidentally change or disable rules. They give Automation Contributor to a person instead of the Sentinel service. They forget that playbook authors need Logic App permissions too. They also assume onboarding to the Defender portal moves or copies data. It does not. The data stays in the Log Analytics workspace, and the portal simply works on top of it.",
   "Exam wording points to the answer. 'Data must stay in a country or region' means more than one workspace. 'Close and assign incidents but not change rules' means Responder. 'Create analytics rules, workbooks or watchlists' means Contributor. 'View only' means Reader. 'Automation rule cannot run a playbook in another resource group' means Automation Contributor for Sentinel. 'One queue for SIEM and XDR incidents' means onboarding to the Defender portal. 'Query two workspaces together' means the `workspace()` function or a cross-workspace union."
  ],
  "analogy": "Think of the workspace as a library building and the Sentinel roles as library cards. A Reader card lets you read any book. A Responder card also lets you check books in and out and add notes to the loan record. A Contributor card lets you buy new books and rearrange the shelves. Automation Contributor is the key you give to the library's own book-sorting robot, not to a person. The analogy stops at the building: you can still search two libraries at once with a cross-workspace query.",
  "mnemonic": "Read, Respond, Contribute: each Sentinel role adds one verb to the role before it. Reader reads, Responder also responds to incidents, Contributor also contributes content such as rules and workbooks.",
  "terms": [
   [
    "Log Analytics workspace",
    "The Azure Monitor data store that Sentinel is enabled on and where all its tables live."
   ],
   [
    "Microsoft Sentinel Reader",
    "The role that allows viewing data, incidents and content without changing anything."
   ],
   [
    "Microsoft Sentinel Responder",
    "The role that allows viewing data and managing incidents but not creating or editing content."
   ],
   [
    "Microsoft Sentinel Contributor",
    "The role that adds creating and editing content such as analytics rules, workbooks and watchlists."
   ],
   [
    "Microsoft Sentinel Automation Contributor",
    "A role granted to the Sentinel service on a resource group so automation rules can run playbooks there."
   ],
   [
    "Unified security operations platform",
    "Sentinel and Defender XDR working together in the Microsoft Defender portal with one incident queue."
   ],
   [
    "Primary workspace",
    "The Sentinel workspace designated in the Defender portal whose alerts are correlated with Defender XDR data."
   ]
  ],
  "example": "A European insurer with offices in Germany and Canada must keep German logs in the EU. It creates two workspaces, one per region, onboards both to the Defender portal, and gives Tier-1 analysts the Responder role on both. The detection engineering team receives Contributor, and Sentinel receives Automation Contributor on the playbooks resource group so automation rules can run the enrichment playbooks.",
  "mistakes": [
   [
    "Creating one workspace per data source to keep things tidy.",
    "Separate workspaces fragment correlation and hunting. Use as few as possible, splitting only for residency, billing or tenant isolation."
   ],
   [
    "Giving Tier-1 analysts Contributor so they can close incidents.",
    "Responder is enough to assign, change and close incidents. Contributor also allows editing rules and watchlists, which breaks least privilege."
   ],
   [
    "Assigning Automation Contributor to the automation engineer.",
    "Automation Contributor is granted to the Sentinel service on the playbooks' resource group. People who build playbooks need Logic App Contributor."
   ],
   [
    "Believing onboarding to the Defender portal moves data out of the workspace.",
    "Data stays in the Log Analytics workspace; the Defender portal works on top of it and adds a unified incident queue and correlation."
   ]
  ],
  "tryit": [
   [
    "Tidewater Hospitals has one tenant, all data in one Azure region, and no legal residency constraints. A new manager wants separate workspaces for firewall, identity and endpoint data 'for organization'. What do you recommend?",
    "Keep a single workspace. Nothing in the scenario requires a split, and one workspace keeps correlation, analytics rules and hunting simple. Use table-level or resource-context RBAC if some data needs narrower access."
   ],
   [
    "At Ironwood Bank, an analyst needs to run the 'Block IP on firewall' playbook manually on incidents but must not edit it or change any analytics rules. Which roles fit?",
    "Microsoft Sentinel Responder to work the incidents, plus Microsoft Sentinel Playbook Operator to list and run playbooks. Neither allows editing rules or the playbook itself."
   ]
  ],
  "tip": "Responder versus Contributor is a favorite question: managing incidents only means Responder; editing rules, watchlists or workbooks means Contributor. Automation Contributor is granted to Sentinel, not to a user. Split workspaces only for a real reason such as data residency.",
  "check": [
   [
    "What is the most common valid reason to create more than one Sentinel workspace?",
    "Data residency or sovereignty requirements that force data to stay in specific regions; other reasons include separate billing or tenant isolation."
   ],
   [
    "Which role lets an analyst close incidents but not edit analytics rules?",
    "Microsoft Sentinel Responder."
   ],
   [
    "What happens to Microsoft incident creation rules when a workspace is onboarded to the Defender portal?",
    "They are no longer used, because Defender XDR creates and correlates incidents for the unified queue."
   ],
   [
    "An automation rule cannot run a playbook stored in another resource group. What is the fix?",
    "Grant the Sentinel service the Automation Contributor role on that resource group, usually through Settings, Playbook permissions."
   ]
  ]
 },
 {
  "t": "Data retention and cost: analytics tier vs Sentinel data lake tier, table plans, summary rules, SOC optimization recommendations",
  "hook": "The finance director at Westbrook University forwards you the cloud bill with one line highlighted: Microsoft Sentinel ingestion, up sharply again. Most of it is network flow logs from the campus firewalls, hundreds of gigabytes a day. You know exactly one workbook uses them. You also know the compliance office wants a year of those logs kept, and last month an investigation needed flows from eight months back. Delete the data and you lose the investigation trail. Keep it all in the premium tier and the bill keeps climbing. Is there a way to keep the logs, keep the detection, and stop paying premium prices for data nobody queries?",
  "simple": "Sentinel charges mostly for how much log data you bring in and how long you keep it in fast storage. Think of a kitchen. The fridge is close and quick to reach, but small and expensive to run, so you keep what you cook with every day there. The basement freezer is cheap and huge, but slow to reach, so you store bulk food there for later. Sentinel has a similar choice: the analytics tier is the fridge, for logs your alarms and dashboards use all the time, and the data lake tier is the freezer, for big piles of logs you might need someday. A summary rule is like making a shopping list from the freezer: a small, useful summary you keep in the fridge.",
  "body": [
   "Sentinel is billed mainly on the data you ingest and how long you keep it, so a security operations analyst has to think about cost as well as coverage. Not every log deserves the same treatment. High-value security signals that feed detections, such as sign-in logs, endpoint alerts and identity events, should be fast to query. High-volume, low-value logs, such as verbose firewall, proxy or network flow traffic, are often kept mainly for investigations and compliance. Good design puts each kind of data in the tier that matches how you use it, and the exam tests whether you can make that match from a short scenario.",
   "The analytics tier is the premium, interactive store. Data there supports analytics rules, near-real-time (NRT) detections, workbooks, hunting and fast Kusto Query Language (KQL) queries. Sentinel includes a period of analytics retention at no extra charge, and you can extend interactive retention for longer at a cost. The Sentinel data lake tier is a lower-cost store for long-term and high-volume data. Data in the lake is kept in an open format and can be retained for years. You query it with KQL in data lake exploration, with KQL jobs, or with notebooks, and it is not meant for real-time detection. Exact retention limits and prices change, so check current documentation rather than memorizing numbers.",
   "Each Log Analytics table has a table plan, set on the workspace's Tables page or in the Sentinel table management view. The Analytics plan gives full features. The Basic plan is cheaper to ingest, with limited query features and a charge per query. The Auxiliary plan is cheapest and intended for verbose, rarely queried logs. With the data lake enabled, analytics tier data is also mirrored into the lake, and tables can be set to go to the data lake tier only. The key exam distinction is the trade-off: lower ingestion cost comes with fewer features, slower or billed queries, and no standard analytics rules. Before you move a table, check which rules, workbooks and hunting queries depend on it.",
   "Summary rules bridge the tiers. A summary rule runs a KQL query on a schedule, aggregates detailed data from any table, including tables on cheaper tiers, and writes the smaller results into an analytics-tier table. For example, you could keep raw firewall connections in a low-cost tier but summarize connection counts per source IP per hour into an analytics table that detections and workbooks can use. You lose the individual rows in the summary but keep the signal, and the raw data is still there for deep investigation. A summary query might look like this:",
   "```kusto\nCommonSecurityLog\n| where DeviceAction == \"deny\"\n| summarize Denies = count(), Ports = dcount(DestinationPort) by SourceIP, bin(TimeGenerated, 1h)\n```",
   "SOC optimization is a page in the Defender portal, and in Sentinel, that gives tailored recommendations. Data value recommendations point out tables you pay for that no rule or hunt uses, and suggest moving them to a cheaper plan or reducing ingestion. Coverage recommendations compare your detections with common attack scenarios mapped to MITRE ATT&CK and suggest rules or data sources to close gaps. Recommendations based on similar organizations suggest data sources that peers find useful. Each recommendation shows its expected effect and can be marked as completed or dismissed. Other cost levers include collecting only needed events with data collection rules (DCRs), using ingestion-time transformations to drop unneeded columns or rows before storage, and commitment tiers for predictable volumes.",
   "Consider a worked example. A university ingests several hundred gigabytes a day of network flow logs, but only one workbook uses them. SOC optimization flags the table as low value. The team moves raw flow logs to the data lake tier and adds a summary rule that writes hourly per-host connection counts to an analytics table, where a scheduled rule looks for sudden spikes. They also update the workbook to read the summary table. When an incident needs the raw flows from eight months ago, an analyst runs a KQL job against the lake and promotes just the matching rows for investigation.",
   "Common mistakes include putting everything in the analytics tier by default; moving a table that an active analytics rule depends on to a cheaper plan and silently breaking the rule; expecting summary rows to contain every original field; and ignoring SOC optimization because the recommendations look like sales advice rather than tuning data. Another trap is cutting cost by dropping a data source entirely when a cheaper tier plus a summary would keep both the evidence and the signal.",
   "Exam questions tend to describe a data type and a use. 'Real-time detection', 'analytics rule' or 'workbook' means the analytics tier. 'Keep for years cheaply', 'compliance' or 'rarely queried' means the data lake tier or a low-cost plan. 'Detect on aggregates of cheap data' means a summary rule. 'Which tables are we paying for but not using' or 'which ATT&CK techniques lack detections' means SOC optimization. 'Drop columns before they are stored' means a DCR transformation."
  ],
  "analogy": "The analytics tier is the kitchen fridge: close, fast, expensive per shelf, and the only place the cook (your analytics rules) reaches into while cooking. The data lake tier is the basement freezer: huge, cheap and slow to reach. A summary rule is a daily inventory note you pin to the fridge, so the cook can react to 'freezer running low' without going downstairs. The analogy stops at speed: lake data is not just slower, it cannot feed standard analytics rules at all.",
  "terms": [
   [
    "Analytics tier",
    "The interactive, higher-cost storage tier that supports analytics rules, workbooks and fast hunting queries."
   ],
   [
    "Sentinel data lake tier",
    "Low-cost long-term storage for high-volume data, queried with KQL jobs, exploration queries or notebooks."
   ],
   [
    "Table plan",
    "The per-table setting (Analytics, Basic or Auxiliary) that trades ingestion cost against query features."
   ],
   [
    "Summary rule",
    "A scheduled KQL query that aggregates detailed data and writes the results into an analytics-tier table."
   ],
   [
    "SOC optimization",
    "A page of recommendations on data value, detection coverage and peer-based data sources."
   ],
   [
    "Ingestion-time transformation",
    "A KQL statement in a DCR that filters or reshapes data before it is stored, reducing cost."
   ],
   [
    "KQL job",
    "A query run against data lake tier data, often used to pull older data back for investigation."
   ]
  ],
  "example": "A university ingests several hundred gigabytes a day of network flow logs, but only one workbook uses them. SOC optimization flags the table as low value. The team moves raw flow logs to the data lake tier and adds a summary rule that writes hourly per-host connection counts to an analytics table, where a scheduled rule looks for sudden spikes, while the raw flows stay available for investigations.",
  "mistakes": [
   [
    "Moving a high-volume table to a cheaper plan without checking what uses it.",
    "If a scheduled analytics rule queries that table, the rule stops working. Check dependencies first, and use a summary rule if detection still needs the data."
   ],
   [
    "Expecting summary rule output to include every original column.",
    "Summary rules write aggregates, such as counts per IP per hour. The detailed rows stay in the source table for investigation."
   ],
   [
    "Thinking the data lake tier is just a slower analytics tier that rules can still use.",
    "Lake data is for long-term queries, KQL jobs and notebooks; standard analytics rules run on analytics-tier data."
   ],
   [
    "Dismissing SOC optimization recommendations as marketing.",
    "They are based on your own workspace usage and coverage, such as unused tables and ATT&CK gaps, and are a practical tuning tool."
   ]
  ],
  "tryit": [
   [
    "Copperline Manufacturing ingests verbose proxy logs that no rule uses but that auditors require be kept for several years. The SOC still wants a daily alert if any single host suddenly contacts far more domains than usual. What design do you propose?",
    "Send the raw proxy logs to the data lake tier (or a low-cost plan) for long retention, and create a summary rule that writes per-host daily domain counts to an analytics table. Build the scheduled spike-detection rule on that summary table."
   ],
   [
    "At Bellhaven Bank, the SOC optimization page shows a data value recommendation for a large table, and a coverage recommendation for credential access techniques. Your manager wants to know which one saves money and which one improves security. What do you tell her?",
    "The data value recommendation is about cost: the table is ingested but little used, so it could move to a cheaper plan or be reduced. The coverage recommendation is about security: it shows missing detections for credential access and suggests rules or data sources to close the gap."
   ]
  ],
  "tip": "When a scenario says 'keep verbose logs cheaply for years but still detect on aggregates', the answer combines a low-cost tier with a summary rule. Standard analytics rules need data in the analytics tier.",
  "check": [
   [
    "Why can't you point a standard scheduled analytics rule at raw data that lives only in the data lake tier?",
    "Scheduled rules run on analytics-tier data; lake data is for long-term queries, KQL jobs and notebooks, so you summarize or promote it first."
   ],
   [
    "What does a summary rule write, and where?",
    "Aggregated query results, written on a schedule into an analytics-tier table."
   ],
   [
    "Name two kinds of SOC optimization recommendations.",
    "Data value recommendations about unused or costly tables, and coverage recommendations about detection gaps against attack techniques."
   ],
   [
    "What is the main trade-off of the Basic and Auxiliary table plans?",
    "Cheaper ingestion in exchange for limited query features, billed or slower queries, and no standard analytics rules."
   ]
  ]
 },
 {
  "t": "Data connectors and Content hub solutions; Windows Security Events and CEF/Syslog through the Azure Monitor Agent and data collection rules (DCRs); the Logs Ingestion API for custom sources",
  "hook": "Dev, a new detection engineer at Stonebridge Manufacturing, installed the firewall vendor's solution from Content hub on Friday and enabled its analytics rules. On Monday, the rules show green, yet not one alert has fired and the CommonSecurityLog table is empty. Meanwhile the domain controllers are sending every Windows event they can, and the cost report has doubled. And the plant's in-house badge system, which knows who walked into the server room, has no connector at all. Three data problems, three different fixes. How do logs actually travel from a firewall, a server and a homegrown app into Sentinel, and where do you control what gets through?",
  "simple": "Sentinel can only spot trouble in logs it actually receives. Getting logs in is like setting up mail delivery. Microsoft's own services are next door, so their mail arrives with a few clicks. Servers need a mail carrier installed on them, the Azure Monitor Agent, and a delivery instruction card, the data collection rule, that says which letters to pick up, what to cross out, and which mailbox to drop them in. Some devices, like firewalls, cannot host a carrier, so they hand their mail to a nearby post office, a small Linux computer that forwards it. And if you built your own app, you can post letters straight to Sentinel's mail slot through an ingestion API, as long as you have the right stamp, meaning permission.",
  "body": [
   "A security information and event management (SIEM) system is only as good as the data it receives. In Sentinel, data connectors bring logs from Microsoft services, other clouds, firewalls, servers and software-as-a-service (SaaS) apps into workspace tables. Connectors are delivered through Content hub, a catalog of solutions. A solution is a package that can include connectors, analytics rule templates, workbooks, hunting queries, parsers and playbooks for one product or scenario. You install the solution, then open its connector page under Configuration, Data connectors and follow the steps it lists. Installing the solution does not configure the connector; that is a separate step. Microsoft first-party sources, such as Microsoft Entra ID, Microsoft 365 and Defender XDR, usually connect with a few clicks because they are service-to-service.",
   "Servers need an agent. The Azure Monitor Agent (AMA) is the current agent for Windows and Linux; it replaced the older Log Analytics agent, which is retired. AMA is driven by data collection rules (DCRs), which define three things: the data sources to collect, an optional Kusto Query Language (KQL) transformation applied at ingestion time, and the destination workspace and table. One DCR can apply to many machines, and one machine can have several DCRs, which makes it easy to give domain controllers a richer event set than ordinary member servers. Machines outside Azure are connected through Azure Arc so that AMA can be deployed to them.",
   "For Windows servers, the Windows Security Events via AMA connector writes to the SecurityEvent table. You choose an event set: All, Common, Minimal, or Custom using XPath queries to collect specific event IDs, for example 4624 (successful logon), 4625 (failed logon) and 4688 (process creation). Choosing a narrow set is the most effective way to control cost without losing the events your detections need. Windows Forwarded Events is a related connector for events collected by Windows Event Forwarding, landing in the WindowsEvent table. A custom XPath query looks like this:",
   "```xml\nSecurity!*[System[(EventID=4624 or EventID=4625 or EventID=4688)]]\n```",
   "Many network devices send logs as Syslog or Common Event Format (CEF), a structured key-value format carried over Syslog. They usually cannot run an agent, so you build a Linux log forwarder: a Linux machine running rsyslog or syslog-ng plus AMA. Devices send to the forwarder on the usual Syslog port, and DCRs tell AMA which facilities and severities to collect. Syslog goes to the Syslog table; CEF goes to the CommonSecurityLog table, already parsed into columns such as DeviceVendor, SourceIP and DeviceAction. The CEF via AMA and Syslog via AMA connectors walk you through creating these DCRs, and a transformation such as `source | where SeverityLevel != \"info\"` can drop noise before storage.",
   "For custom sources, such as an in-house app or a product with no connector, use the Logs Ingestion API. You create a custom table, whose name ends in `_CL`, a DCR that describes the incoming data shape and any transformation, and a Microsoft Entra app registration or managed identity. The identity gets the Monitoring Metrics Publisher role on the DCR, and your code sends JavaScript Object Notation (JSON) records to the DCR's ingestion endpoint; some setups also use a data collection endpoint (DCE). Microsoft also offers a codeless connector framework for building API-polling connectors without code. Whatever the source, always check that data arrives: run `SecurityEvent | take 10`, or look at the connector's status and the table's last-received time.",
   "Consider a worked example. A manufacturer's firewalls can only send CEF over Syslog. The SOC deploys a small Linux virtual machine (VM) with rsyslog and AMA, installs the vendor's Content hub solution, creates a DCR for the CEF via AMA connector, and points the firewalls at the VM. Within minutes, CommonSecurityLog fills and the solution's rule templates can be enabled. The same team switches its domain controllers from the All event set to Common, and its badge app posts entry records to a `BadgeAccess_CL` table through the Logs Ingestion API using a managed identity.",
   "Common mistakes recur. Teams install a solution and assume its connector is configured, when it still has to be set up. They try to send CEF from the firewall straight to Sentinel with no forwarder. They choose the All event set on hundreds of servers and pay for noise. They forget the Monitoring Metrics Publisher role, which makes Logs Ingestion API calls fail with an authorization error. And they expect a custom table to work without the `_CL` suffix.",
   "Exam questions often ask you to map a format to a table or pick the component that does a job. Windows events go to SecurityEvent, Syslog to Syslog, CEF to CommonSecurityLog, and custom API data to a `_CL` table. 'Filter or transform before storage' means the DCR. 'Collect from an appliance that cannot run an agent' means a Linux forwarder with AMA. 'Package of connector, rules and workbooks' means a Content hub solution. 'Send data from our own app' means the Logs Ingestion API."
  ],
  "analogy": "A data collection rule is like a delivery instruction card handed to a courier (the Azure Monitor Agent). It says which parcels to collect (event set or Syslog facilities), what to remove before the trip (the transformation), and which mailbox to deliver to (workspace and table). A Linux forwarder is the local post office that accepts parcels from shops that have no courier of their own. The analogy stops at timing: transformations happen before storage, so anything dropped there is gone for good.",
  "terms": [
   [
    "Content hub",
    "Sentinel's catalog of solutions that package connectors, rules, workbooks, parsers and playbooks."
   ],
   [
    "Azure Monitor Agent (AMA)",
    "The current agent for Windows and Linux that collects data according to data collection rules."
   ],
   [
    "Data collection rule (DCR)",
    "A configuration that defines sources, an optional ingestion-time transformation and the destination table."
   ],
   [
    "Common Event Format (CEF)",
    "A structured, key-value log format carried over Syslog that lands in the CommonSecurityLog table."
   ],
   [
    "Linux log forwarder",
    "A Linux machine running a Syslog daemon and AMA that receives logs from devices and sends them to the workspace."
   ],
   [
    "Logs Ingestion API",
    "An API for sending custom data into a workspace table through a DCR."
   ],
   [
    "Monitoring Metrics Publisher",
    "The role an app's identity needs on the DCR to send data through the Logs Ingestion API."
   ]
  ],
  "example": "A manufacturer's firewalls can only send CEF over Syslog. The SOC deploys a small Linux VM with rsyslog and AMA, installs the vendor's Content hub solution, creates a DCR for the CEF via AMA connector, and points the firewalls at the VM. Within minutes, CommonSecurityLog fills and the solution's analytics rules begin to run, while a DCR transformation drops informational messages to save cost.",
  "mistakes": [
   [
    "Assuming that installing a Content hub solution starts data flowing.",
    "Installing the solution adds its content. You still open the connector page and complete the setup, such as creating the DCR."
   ],
   [
    "Pointing a firewall's CEF output directly at Sentinel.",
    "Appliances that cannot run an agent send Syslog or CEF to a Linux forwarder running rsyslog or syslog-ng with AMA, which then sends to the workspace."
   ],
   [
    "Collecting the All event set on every Windows server to be safe.",
    "That multiplies cost with noise. Use Common, Minimal or a Custom XPath set that covers the event IDs your detections need."
   ],
   [
    "Expecting CEF data in the Syslog table.",
    "CEF lands parsed in CommonSecurityLog. Plain Syslog lands in Syslog."
   ]
  ],
  "tryit": [
   [
    "Fairhaven Water runs an in-house plant monitoring app that writes JSON alerts. There is no Content hub solution for it. The team's test script gets an authorization error when posting to the DCR endpoint. What is most likely missing, and what else must exist?",
    "The app's Entra identity probably lacks the Monitoring Metrics Publisher role on the DCR. The setup also needs a custom table ending in _CL and a DCR describing the data shape, used through the Logs Ingestion API."
   ],
   [
    "At Orchard Retail, the SOC only needs successful logons, failed logons and process creation from 300 member servers, and the bill for SecurityEvent is too high. What do you change?",
    "Edit the Windows Security Events via AMA DCR to use a Custom event set with an XPath query for event IDs 4624, 4625 and 4688. That keeps the needed events and drops the rest before ingestion."
   ]
  ],
  "tip": "Map formats to tables: Windows events to SecurityEvent, Syslog to Syslog, CEF to CommonSecurityLog, custom API data to a _CL table. Filtering and transformation happen in the DCR.",
  "check": [
   [
    "Which table receives CEF logs collected by AMA?",
    "CommonSecurityLog."
   ],
   [
    "How do you collect only event IDs 4624, 4625 and 4688 from Windows servers?",
    "Use the Windows Security Events via AMA connector with a custom XPath event set in the DCR."
   ],
   [
    "What does an app need to send data through the Logs Ingestion API?",
    "A custom table, a DCR describing the data, and an Entra identity with the Monitoring Metrics Publisher role on the DCR."
   ],
   [
    "How do you connect a firewall that cannot run an agent?",
    "Send its Syslog or CEF to a Linux forwarder running rsyslog or syslog-ng with AMA, controlled by a DCR."
   ]
  ]
 },
 {
  "t": "Analytics rules: scheduled, near-real-time (NRT), Microsoft incident creation, anomaly and Fusion; entity mapping, alert grouping, custom details",
  "hook": "It is 3:15 a.m. at Cobalt Ridge Energy, and Sam on the night shift watches the incident queue climb past sixty. Every one of them is the same brute-force rule firing against the same service account, each incident a separate line with a title that just says 'Multiple failed logons'. None of them name the account or the server in a way Sam can click on, so every investigation starts by rerunning the query by hand. Meanwhile, the break-glass admin account's sign-in rule runs once an hour, which feels slow for an account that should never be used. The detection logic is fine. What settings turn a raw query into alerts an analyst can actually work?",
  "simple": "An analytics rule is a standing question Sentinel asks your logs over and over, such as 'Did anyone fail to log in five times in the last fifteen minutes?' When the answer is yes, Sentinel raises an alert, and alerts are bundled into incidents, the cases an analyst works on. Some rules run on a timetable you choose. Some run almost every minute for urgent things. Some are built by Microsoft using machine learning, which means software that learns what normal looks like. The extra settings matter too: labeling which user or computer is involved so analysts can click on it, showing key details right in the alert, and bundling repeat alerts into one case instead of sixty.",
  "body": [
   "Analytics rules are how Sentinel turns data into alerts and incidents. An alert is a single detection, while an incident groups one or more alerts into the unit of work an analyst investigates. The exam expects you to know each rule type, when to use it, and the settings that make its alerts useful to analysts. You create rules under Configuration, Analytics, often starting from a template installed by a Content hub solution, which saves writing the query from scratch and gives you sensible defaults to tune.",
   "Scheduled rules are the workhorse. You write a Kusto Query Language (KQL) query, choose how often it runs (the query frequency) and how far back it looks (the lookback), and set a threshold, such as generate an alert when the query returns more than zero results. The lookback should usually be at least as long as the frequency so events are not missed, and a little overlap covers ingestion delay, since logs can arrive minutes after the event. You also choose event grouping: one alert for all results, or one alert per result row. Near-real-time (NRT) rules run about every minute over a very short lookback, for high-priority detections where minutes matter, such as a break-glass account signing in. NRT rules have more limits on query complexity than scheduled rules, so keep their queries simple.",
   "Microsoft security rules, also called Microsoft incident creation rules, create Sentinel incidents from alerts produced by other Microsoft products, such as Defender for Cloud. When your workspace is onboarded to the Defender portal they are not used, because Defender XDR creates incidents. Anomaly rules use built-in machine learning to flag unusual behavior. You cannot edit their logic, but you can duplicate one, tune its parameters, and run the copy in flighting mode to compare results with the original. Anomalies go to the Anomalies table and are often used in hunting rather than as incidents. Fusion is Sentinel's multistage attack detection: it correlates low-fidelity alerts and anomalies from several products into high-fidelity incidents, such as a suspicious sign-in followed by mass file download. In the Defender portal, Defender XDR's correlation engine takes over this role.",
   "Entity mapping is what makes alerts useful. You map query columns to entity types such as Account, Host, IP, URL, File, Process and Mailbox, choosing identifiers like account name, user principal name (UPN) suffix or Microsoft Entra object ID. Mapped entities feed the investigation graph, entity pages, user and entity behavior analytics (UEBA) and correlation. Without them, analysts see text but have nothing to pivot on. Custom details surface specific event fields, such as a command line or a count, directly in the alert, so analysts do not need to rerun the query. Alert details let you set the alert name, description and severity dynamically from columns, for example `Failed logons for {{TargetAccount}}`, so the queue itself tells the story.",
   "Alert grouping controls how alerts become incidents. By default each alert creates its own incident. You can group all alerts from the rule within a time window into one incident, group only alerts whose mapped entities all match, or group by selected entities and details. You can also choose whether a new alert reopens a closed incident. Good grouping prevents a brute-force rule from producing fifty separate incidents for the same account, which wastes analyst time and hides the bigger picture. A typical scheduled rule query looks like this:",
   "```kusto\nSecurityEvent\n| where EventID == 4625\n| summarize Failures = count() by TargetAccount, Computer\n| where Failures >= 5\n```",
   "Consider a worked example. A detection engineer turns that query into a scheduled rule that runs every 10 minutes with a 15-minute lookback, so each run overlaps the last by five minutes. She maps TargetAccount to the Account entity and Computer to Host, adds Failures as a custom detail, sets the alert name to include the account, and groups alerts into one incident per account for 24 hours. A burst of attacks now produces one incident per victim account instead of dozens. She also builds a separate NRT rule for any sign-in by the break-glass account, because that detection cannot wait ten minutes.",
   "Common mistakes are easy to spot once you know them. A lookback shorter than the frequency leaves gaps where events are never evaluated. Skipping entity mapping strands analysts with plain text. Using NRT for a heavy query it cannot run leads to errors. Expecting to edit an anomaly rule's model wastes time, since only parameters in a duplicate can change. Keeping Microsoft incident creation rules after moving to the Defender portal duplicates incidents.",
   "Exam clue words map neatly to answers. 'Within about a minute' or 'as soon as possible' points to NRT. 'Multistage attack across products' points to Fusion, or Defender XDR correlation in the unified portal. 'Create incidents from Defender for Cloud alerts in Sentinel' points to a Microsoft security rule. 'Machine learning baseline, cannot change the logic' points to anomaly rules. 'Too many incidents for the same user' points to alert grouping. 'Show the command line in the alert' points to custom details. 'Pivot on the user in the investigation graph' points to entity mapping."
  ],
  "analogy": "A scheduled rule is like a security guard who walks the building every 10 minutes and checks the last 15 minutes of camera footage, so nothing slips between rounds. An NRT rule is a guard stationed at one critical door, watching constantly but only able to do simple checks. Entity mapping is writing names and room numbers on the guard's report instead of 'someone, somewhere'. Alert grouping is stapling every report about the same person into one folder. The analogy stops at Fusion, which is less a guard than an analyst reading many guards' notes for a pattern.",
  "terms": [
   [
    "Scheduled rule",
    "A KQL-based analytics rule that runs on a set frequency over a set lookback and alerts when a threshold is met."
   ],
   [
    "NRT rule",
    "A near-real-time rule that runs about every minute for urgent detections, with tighter query limits."
   ],
   [
    "Microsoft security rule",
    "A rule that creates Sentinel incidents from alerts raised by other Microsoft security products."
   ],
   [
    "Anomaly rule",
    "A built-in machine learning rule whose parameters, but not logic, can be tuned in a duplicate."
   ],
   [
    "Fusion",
    "Sentinel's machine-learning correlation that combines alerts and anomalies into multistage attack incidents."
   ],
   [
    "Entity mapping",
    "Mapping query columns to entity types such as Account, Host and IP so alerts carry structured evidence."
   ],
   [
    "Custom details",
    "Event fields surfaced directly in an alert so analysts see key values without rerunning the query."
   ],
   [
    "Alert grouping",
    "Settings that decide which alerts are combined into one incident and for how long."
   ]
  ],
  "example": "A detection engineer writes a scheduled rule that runs every 10 minutes with a 15-minute lookback, alerting when one account has 5 or more failed logons. She maps Account and Host entities, adds the failure count as a custom detail, and groups alerts into one incident per account for 24 hours. A burst of attacks now produces one incident per victim account instead of dozens.",
  "mistakes": [
   [
    "Setting a 1-hour frequency with a 30-minute lookback to save cost.",
    "Events in the uncovered half hour are never evaluated. The lookback should be at least as long as the frequency, ideally with a little overlap for ingestion delay."
   ],
   [
    "Choosing an NRT rule for a complex, multi-join query because it is urgent.",
    "NRT rules have tighter query limits. Simplify the query for NRT or use a short-frequency scheduled rule."
   ],
   [
    "Trying to edit the logic of a built-in anomaly rule.",
    "Anomaly logic is fixed. Duplicate the rule, adjust its parameters, and compare in flighting mode."
   ],
   [
    "Fixing 'too many incidents' by raising the alert threshold.",
    "That can hide real attacks. Alert grouping combines related alerts into one incident without losing detections."
   ]
  ],
  "tryit": [
   [
    "At Greystone Pharma, a rule detecting mass file deletion produces an incident every time it fires, and analysts open each one only to rerun the query to learn which user and how many files. What two settings fix this without changing the detection logic?",
    "Map the user column to the Account entity (and host to Host) so analysts can pivot, and add the deleted-file count as a custom detail so it appears in the alert. Consider alert grouping by account so repeated firings join one incident."
   ],
   [
    "Harborview Port's workspace is onboarded to the Defender portal. An engineer wants to enable a Microsoft incident creation rule for Defender for Cloud alerts so they appear as incidents. What do you tell him?",
    "It is not needed and would risk duplicates. In the unified portal, Defender XDR creates and correlates incidents, including from Defender for Cloud alerts, so Microsoft incident creation rules are no longer used."
   ]
  ],
  "tip": "Words like 'within about a minute' point to NRT. 'Multistage attack across products' points to Fusion (or Defender XDR correlation in the unified portal). 'Too many incidents for the same user' points to alert grouping. Keep lookback at least as long as frequency.",
  "check": [
   [
    "Why should a scheduled rule's lookback usually be at least as long as its frequency?",
    "Otherwise events that occur between runs fall outside every lookback window and are never evaluated."
   ],
   [
    "What do you gain by mapping entities in an analytics rule?",
    "Structured evidence that powers the investigation graph, entity pages, UEBA, alert grouping and correlation."
   ],
   [
    "Can you edit an anomaly rule's logic?",
    "No. You can duplicate it and adjust its parameters, and compare versions in flighting mode, but the underlying model is built in."
   ],
   [
    "How do you show a process command line directly in the alert without rerunning the query?",
    "Add the command line column as a custom detail in the analytics rule."
   ]
  ]
 },
 {
  "t": "Custom detection rules in Defender XDR advanced hunting; MITRE ATT&CK coverage of your rules",
  "hook": "Lena, a threat hunter at Silverleaf Credit Union, has just found something ugly in advanced hunting: a Word document on a teller's PC launched PowerShell with an encoded command. She cleaned it up, but her manager asks the obvious question, 'What happens next time, at 2 a.m., when you are asleep?' Lena tries to save her query as a detection rule and the wizard refuses. Then the CISO asks a second question for the board report: 'Which attacker techniques can we actually detect, and which are we blind to?' How do you turn a one-off hunt into a standing detection, and how do you prove what your rules cover?",
  "simple": "Advanced hunting is like a search box over all the security records from your computers, email and accounts. When you write a search that finds something bad, you can save it as a custom detection rule, so the system reruns the search on a timetable and raises an alarm whenever it finds a match. It can even take an action automatically, like cutting a computer off the network. To be accepted, the search must say exactly which record and which computer it found, using a few required ID columns. MITRE ATT&CK is a public catalog of the tricks attackers use. Labeling each rule with the trick it catches lets you see, on one chart, which tricks you watch for and which you do not.",
  "body": [
   "Advanced hunting in the Defender portal lets you query up to 30 days of raw Defender XDR data with Kusto Query Language (KQL), and, when Sentinel is onboarded, Sentinel tables as well. A custom detection rule is a saved advanced hunting query that runs on a schedule and raises alerts, and optionally takes response actions, whenever it returns results. It is the Defender XDR counterpart of a Sentinel scheduled analytics rule, and its alerts join incidents in the same queue as built-in detections, so analysts work them exactly like any other alert.",
   "To create one, you write and test a query under Investigation and response, Hunting, Advanced hunting, then choose Create detection rule. The query must return columns that let Defender identify the event and the affected asset. For most device tables that means Timestamp, DeviceId and ReportId; email and identity tables have their own identifier columns, such as NetworkMessageId and RecipientEmailAddress for email or AccountObjectId for identity. Rows need a Timestamp in the lookback window. If these columns are missing, the wizard will not let you save the rule, so it is common to project them explicitly at the end of the query:",
   "```kusto\nDeviceProcessEvents\n| where InitiatingProcessFileName in~ (\"winword.exe\", \"excel.exe\")\n| where FileName =~ \"powershell.exe\" and ProcessCommandLine has \"-enc\"\n| project Timestamp, DeviceId, ReportId, DeviceName, AccountName, ProcessCommandLine\n```",
   "The wizard then asks for alert details: name, frequency, severity, category, a description, recommended actions and MITRE ATT&CK techniques. Frequency options range from continuous (near-real-time, for supported queries) through every hour, every few hours and once a day, and the lookback is tied to the frequency. Next you choose impacted entities, the columns that identify the device, mailbox or user. Finally, you can select automatic actions on those entities, such as isolate device, collect investigation package, run antivirus scan, restrict app execution, quarantine a file, soft-delete an email, or mark a user as compromised or disable the user. Use automatic actions only for high-confidence rules, because a false positive that isolates a server can cause an outage. Lighter actions, such as collecting an investigation package, are a safer starting point.",
   "MITRE ATT&CK is a public knowledge base of adversary tactics, techniques and common knowledge. A tactic is the goal, such as persistence or credential access. A technique is the method, such as T1003 OS credential dumping, with sub-techniques beneath it. Tagging every rule with its techniques lets you measure coverage: which techniques you detect and which you do not. In Sentinel, the MITRE ATT&CK page shows a matrix colored by the number of active rules, and can also show rules you could enable from templates, called simulated coverage. SOC optimization coverage recommendations compare your rules against common attack scenarios. Coverage is about detections, not about blocking. A technique can be well prevented by attack surface reduction rules and still have no detection, and the reverse is also true.",
   "Consider a worked example. An analyst writes the query above for encoded PowerShell launched by Office apps, confirms it returns Timestamp, DeviceId and ReportId, and runs it over the last 30 days to see how many alerts it would have produced: four, all from one test lab. She adds a filter excluding the lab devices, saves it as an hourly custom detection tagged with the command and scripting interpreter technique (T1059), sets DeviceId as the impacted device, and chooses collect investigation package as the automatic action. The Sentinel MITRE page now shows that technique covered, and the next time the pattern appears at 2 a.m., an alert and an investigation package are waiting for the morning shift.",
   "Common mistakes are mostly about skipping steps. Analysts forget ReportId, so the rule cannot be saved. They choose isolate device on a noisy rule. They do not test the query over the full lookback period first, so the alert volume surprises them. They tag a rule with a tactic but no technique, which gives nothing useful in the matrix. And they treat a colored MITRE cell as proof they are safe, when one weak rule can color a cell. Review rules regularly from the Detection rules page, where you can edit, turn off or run a rule on demand, and read the status and error of each run if a query times out or a table changes.",
   "Exam questions often hinge on a few phrases. 'The rule cannot be saved' points to missing required columns. 'Automatically isolate the device when the query matches' points to a custom detection with a response action. 'Which ATT&CK techniques lack detections' points to the MITRE ATT&CK coverage page or SOC optimization. 'Goal versus method' is tactic versus technique. 'Defender data plus Sentinel data in one detection' points to advanced hunting in the unified portal."
  ],
  "analogy": "A MITRE ATT&CK coverage matrix is like a map of a city's streets where you color each street that has at least one security camera. It quickly shows the dark streets with no camera at all, which is very useful. But a colored street might have one blurry camera pointed at a wall, so color is not the same as good coverage. And a street with a locked gate (prevention) but no camera still looks dark on this map, because the map only counts detections.",
  "terms": [
   [
    "Custom detection rule",
    "A scheduled advanced hunting query in Defender XDR that creates alerts and can trigger automated response actions."
   ],
   [
    "Required columns",
    "Identifier columns, such as Timestamp, DeviceId and ReportId, that a custom detection query must return."
   ],
   [
    "Impacted entity",
    "The device, user or mailbox column the rule marks as affected and targets for actions."
   ],
   [
    "MITRE ATT&CK",
    "A public framework of adversary tactics and techniques used to label detections and measure coverage."
   ],
   [
    "Tactic",
    "In MITRE ATT&CK, the adversary's goal at a stage of an attack, such as credential access or persistence."
   ],
   [
    "Technique",
    "In MITRE ATT&CK, the method used to achieve a tactic, identified by an ID such as T1003."
   ],
   [
    "Simulated coverage",
    "A view on the Sentinel MITRE ATT&CK page showing coverage you would gain by enabling available rule templates."
   ]
  ],
  "example": "An analyst writes a query for encoded PowerShell launched by Office apps in DeviceProcessEvents, confirms it returns Timestamp, DeviceId and ReportId, and saves it as an hourly custom detection tagged with the command and scripting interpreter technique. The Sentinel MITRE page now shows that technique covered, and the rule collects an investigation package automatically when it fires.",
  "mistakes": [
   [
    "Thinking any query that returns results can be saved as a custom detection.",
    "The query must return required identifier columns, such as Timestamp, DeviceId and ReportId for device tables, or the wizard will not save it."
   ],
   [
    "Enabling isolate device on a newly written, untested rule.",
    "Automatic actions run on every match. Test over the full lookback first, and reserve disruptive actions for high-confidence rules."
   ],
   [
    "Tagging a rule only with a tactic, such as Execution.",
    "Coverage is measured by technique. Tag the specific technique, such as T1059, so the matrix reflects what the rule detects."
   ],
   [
    "Reading a colored ATT&CK cell as 'this technique is prevented'.",
    "The matrix counts detection rules. Prevention comes from controls such as ASR rules, and one weak rule can color a cell."
   ]
  ],
  "tryit": [
   [
    "At Brightwater Schools, a hunter's query on DeviceNetworkEvents finds connections to a suspicious domain and returns DeviceName, RemoteUrl and Timestamp. The Create detection rule wizard rejects it. What should she change?",
    "Add the required identifier columns, typically DeviceId and ReportId alongside Timestamp, by projecting them at the end of the query. Then the rule can be saved and DeviceId set as the impacted entity."
   ],
   [
    "The CISO at Juniper Logistics wants a slide showing which attacker techniques the SOC cannot currently detect, plus quick wins to improve. Where do you get this?",
    "Use the Sentinel MITRE ATT&CK page, which colors techniques by active rules and can show simulated coverage from available templates, and the SOC optimization coverage recommendations, which suggest rules or data sources to close gaps."
   ]
  ],
  "tip": "If a question says the rule cannot be saved, check for missing required columns. If it asks how to see which ATT&CK techniques lack detections, choose the MITRE ATT&CK coverage view or SOC optimization coverage recommendations.",
  "check": [
   [
    "What columns must a custom detection query on DeviceProcessEvents return?",
    "Timestamp, DeviceId and ReportId, so Defender can identify the event and the device."
   ],
   [
    "Why be careful with automatic actions in custom detections?",
    "They act on every match; a false positive could isolate or disable critical devices or users."
   ],
   [
    "What is the difference between a tactic and a technique in MITRE ATT&CK?",
    "A tactic is the attacker's goal, such as credential access; a technique is how they achieve it, such as dumping LSASS memory."
   ],
   [
    "Does a well-colored MITRE ATT&CK matrix mean a technique is prevented?",
    "No. It shows detection rules mapped to techniques; prevention comes from controls such as ASR rules, and a single weak rule can still color a cell."
   ]
  ]
 },
 {
  "t": "Automation: automation rules vs Logic Apps playbooks, triggers, incident tasks; watchlists, workbooks, UEBA and threat intelligence connectors",
  "hook": "Every morning at Redwood Mutual, Aisha spends her first hour doing the same chores: assigning phishing incidents to the email team, looking up each suspicious URL on a reputation site, pasting summaries into a Teams channel, and bumping the severity whenever an executive is involved. Last week she missed that the CFO was the target of one phishing incident, because it sat at Medium in a queue of forty. Her manager asks whether Sentinel can do this itself. It can, but there are several tools that sound alike: automation rules, playbooks, tasks, watchlists, workbooks, UEBA. Which one does which job, and how do they fit together?",
  "simple": "Sentinel has helpers that do repetitive work for the security team. Automation rules are simple 'if this, then that' instructions inside Sentinel, such as 'if an incident is about phishing, give it to the email team.' Playbooks are bigger workflows that can reach outside Sentinel, such as looking up a website's reputation or posting a message in Teams. Incident tasks are checklists inside a case so everyone follows the same steps. Watchlists are lists you upload, like a list of company executives. Workbooks are dashboards with charts. UEBA learns what normal looks like for each person and computer and points out odd behavior. Threat intelligence connectors bring in lists of known bad websites and addresses from outside sources.",
  "body": [
   "Sentinel has two automation layers, and knowing where one ends and the other begins is a core exam skill. Automation rules are lightweight, built-in rules that run when incidents are created or updated, or when alerts are created. They can change status, severity or owner, add tags, add incident tasks and run playbooks. Rules have an order number, where lower runs first, an optional expiration date, and conditions such as analytics rule name, severity, tag or entity values. They are ideal for triage: assign all phishing incidents to the email team, raise severity when a VIP account is involved, or close known-benign incidents automatically, perhaps for a limited time while a noisy rule is being fixed.",
   "Playbooks are Azure Logic Apps workflows. They handle anything that needs outside systems or multi-step logic: enriching an IP address from a reputation service, posting to Microsoft Teams, opening a ticket, disabling a user through Microsoft Graph, or asking an analyst for approval before acting. Playbooks use the Microsoft Sentinel trigger, which comes in three kinds: incident, alert and entity. Incident-trigger playbooks can be run from automation rules and are the recommended type, because they receive the whole incident with its alerts and entities. Alert-trigger playbooks can also be run from automation rules that fire when an alert is created. Entity-trigger playbooks are run manually from an entity, such as a user or IP, during an investigation. Playbooks authenticate to Sentinel and other services, ideally with a managed identity, and Sentinel needs the Automation Contributor role on the playbook's resource group so automation rules can run them.",
   "Incident tasks are checklists inside an incident, such as Reset password or Check inbox rules. Automation rules or playbooks add them, so every analyst follows the same steps for a given incident type, and completing them is tracked in the incident. Watchlists are reference lists you upload, usually as comma-separated values (CSV) files: VIP users, known admin hosts, terminated employees or approved IP ranges. Each has an alias and a search key column. In Kusto Query Language (KQL), `_GetWatchlist('VIPUsers')` returns the list, which you join or filter against in rules and hunts. Watchlists help both to raise priority, such as alerting or raising severity when a VIP is involved, and to reduce noise, such as excluding known scanners. For example:",
   "```kusto\nlet vips = _GetWatchlist('VIPUsers') | project SearchKey;\nSigninLogs\n| where ResultType != \"0\" and UserPrincipalName in (vips)\n```",
   "Workbooks are interactive dashboards built on Azure Monitor workbooks. Many come with Content hub solutions, and you can build your own with KQL-driven charts, grids and parameters such as a time range picker. They are for visualization and reporting, not for alerting; nothing in a workbook raises an incident. User and entity behavior analytics (UEBA) builds baselines of normal behavior for users, hosts and other entities from sources such as sign-in logs, audit logs and Windows security events. It writes to tables such as BehaviorAnalytics, IdentityInfo and UserPeerAnalytics, and enriches entity pages with insights like first time this user accessed this resource or unusual compared to peers. You enable UEBA in Sentinel settings, choose its data sources and sync it with Microsoft Entra ID.",
   "Threat intelligence connectors bring indicators of compromise into the workspace. Examples are the Threat Intelligence TAXII connector for Structured Threat Information Expression (STIX) data delivered over Trusted Automated Exchange of Intelligence Information (TAXII) feeds, the upload API connector for threat intelligence platforms, and the Microsoft Defender Threat Intelligence connector. STIX is the format and TAXII is the transport. Indicators are then used by threat intelligence matching analytics rules, which compare them with your logs, and in hunting queries.",
   "Consider a worked example. A SOC creates an automation rule that fires on incidents from its phishing rules: it assigns them to the email team, adds three incident tasks, and runs an incident-trigger playbook that looks up each URL's reputation and posts a summary to a Teams channel. The phishing analytics rule also checks the VIPUsers watchlist and uses dynamic alert details to set severity to High when a mapped account is on it, so executive targets rise to the top of the queue. A workbook shows phishing volume per week for the monthly report, and UEBA insights on the user's entity page show whether the targeted executive's sign-ins look unusual after the click.",
   "Common mistakes include building a playbook for something an automation rule does natively, such as changing owner; attaching an alert-trigger playbook and expecting incident fields; forgetting Automation Contributor, so the playbook does not appear; misordering automation rules so a later rule undoes an earlier one; and using a workbook where a detection is needed. On the exam, choose an automation rule for in-Sentinel changes (owner, status, severity, tags, tasks) and a playbook when the scenario mentions an external system, enrichment API, email, Teams or ticketing. 'Consistent checklist for analysts' means incident tasks. 'List of VIPs or approved IPs used in queries' means a watchlist. 'Dashboard' means a workbook. 'First time this user did X' or 'peer baseline' means UEBA. 'STIX/TAXII feed' means the TAXII connector."
  ],
  "analogy": "Think of a restaurant. Automation rules are the host's seating rules: party of six goes to the big table, regulars get the window. Playbooks are the errands that need someone to leave the building, like calling the supplier. Incident tasks are the kitchen's prep checklist, watchlists are the reservation list of VIP guests, workbooks are the sales charts on the manager's wall, and UEBA is the waiter who notices a regular ordering something very unusual. The analogy stops at ordering: in Sentinel, automation rules run in a set order, so a later rule can undo an earlier one.",
  "terms": [
   [
    "Automation rule",
    "A built-in Sentinel rule that acts on incidents or alerts when they are created or updated, including running playbooks."
   ],
   [
    "Playbook",
    "An Azure Logic Apps workflow triggered by a Sentinel incident, alert or entity for enrichment or response."
   ],
   [
    "Incident task",
    "A checklist item inside an incident that standardizes and tracks investigation steps."
   ],
   [
    "Watchlist",
    "A reference list, queried with _GetWatchlist(), used to enrich or filter rules and hunts."
   ],
   [
    "Workbook",
    "An interactive KQL-driven dashboard for visualization and reporting."
   ],
   [
    "UEBA",
    "User and entity behavior analytics, which baselines normal activity and highlights anomalies on entity pages."
   ],
   [
    "STIX/TAXII",
    "A standard format (STIX) and transport protocol (TAXII) for sharing threat intelligence indicators."
   ]
  ],
  "example": "A SOC creates an automation rule that fires on incidents from its phishing rules: it assigns them to the email team, adds three incident tasks, and runs a playbook that looks up each URL's reputation and posts a summary to a Teams channel. Because the rule checks a watchlist of executives, severity is set to High whenever one of them is a mapped entity.",
  "mistakes": [
   [
    "Building a Logic Apps playbook just to change an incident's owner or severity.",
    "Automation rules do that natively and instantly. Use a playbook only when you need external systems or multi-step logic."
   ],
   [
    "Attaching an alert-trigger playbook and expecting incident details like the incident number.",
    "Alert-trigger playbooks receive the alert. Use the incident trigger, the recommended type, when you need incident fields."
   ],
   [
    "Wondering why a playbook does not appear in an automation rule's list.",
    "Sentinel needs the Automation Contributor role on the playbook's resource group, usually granted through Settings, Playbook permissions."
   ],
   [
    "Using a workbook to 'alert' on a condition.",
    "Workbooks only visualize data. Detections need an analytics rule or custom detection."
   ]
  ],
  "tryit": [
   [
    "At Lantern Health, every incident involving a terminated employee's account must jump to High severity, and the HR team keeps an up-to-date list of departures. What combination do you build?",
    "Upload the departures as a watchlist and reference it with _GetWatchlist() in the relevant analytics rules, using dynamic alert details to set severity to High when a mapped account is on the list (or adding a tag that an automation rule then acts on). No external system is needed, so no playbook is required."
   ],
   [
    "The SOC at Quarry Point wants every high-severity incident to open a ticket in its IT service management tool and post to a Teams channel, with the ticket number written back as an incident comment. Automation rule, playbook, or both?",
    "Both. An automation rule with a severity condition runs an incident-trigger playbook. The playbook handles the external work (creating the ticket, posting to Teams, adding the comment) because automation rules cannot call outside systems."
   ]
  ],
  "tip": "Choose an automation rule for in-Sentinel changes (owner, status, severity, tags, tasks). Choose a playbook when the scenario mentions an external system, enrichment API, email, Teams or ticketing. Automation rules are often what runs the playbook.",
  "check": [
   [
    "Which playbook trigger type is recommended so the playbook can be run from automation rules?",
    "The Microsoft Sentinel incident trigger."
   ],
   [
    "How do you use a watchlist named VIPUsers in a query?",
    "Call _GetWatchlist('VIPUsers') and join or filter on its search key column."
   ],
   [
    "What does enabling UEBA add to investigations?",
    "Behavioral baselines, anomaly insights on entity pages and tables such as BehaviorAnalytics and IdentityInfo."
   ],
   [
    "You need every new phishing incident assigned to the email team. Automation rule or playbook?",
    "An automation rule, because changing the owner is a native in-Sentinel action and needs no external system."
   ]
  ]
 },
 {
  "t": "Defender portal incident queue: triage, assignment, attack story, alert correlation, linking alerts and merging incidents, classification and determination",
  "hook": "You start the morning shift at Harbor Credit Union and the Defender portal shows fourteen new incidents. Two of them mention the same teller, Rosa, ten minutes apart: one is a phishing email, the other is odd PowerShell on her laptop. A third incident, marked high severity, involves a test server nobody seems to own. Your Tier-2 colleague Ben is already clicking around, and you are not sure whether he has picked up Rosa's incidents or the server. If you both chase the same attack, something else waits. If you treat Rosa's two incidents as separate events, you might miss that one caused the other. Where do you start, and how do you make the queue tell the true story?",
  "simple": "Security tools raise alerts, which are single warnings, like one smoke detector beeping. An incident is a folder that groups all the warnings that belong to the same problem, like a fire department file that collects every detector that went off in one building. Microsoft Defender builds these folders for you by noticing that warnings share the same person, computer or file and happened close together in time. Your job is to pick the most urgent folder, put your name on it so nobody else duplicates the work, fix the folder if a warning landed in the wrong one, and when you finish, label what really happened: a real attack, harmless expected activity such as an approved test, or a mistake by the detector.",
  "body": [
   "An alert is a single detection. An incident is a collection of related alerts and the evidence behind them that together tell the story of one attack. Defender XDR (extended detection and response) automatically correlates alerts from endpoint, identity, email, cloud apps and, with Sentinel onboarded, security information and event management (SIEM) sources into incidents, based on shared entities such as the same user, device, file or Internet Protocol (IP) address, and on timing. Working at the incident level saves time and shows the whole attack instead of fragments, which is why the security operations center (SOC) queue is built around incidents rather than alerts.",
   "The incident queue, under Investigation and response, Incidents and alerts, is your starting point. You filter and sort by severity, status, service source, detection source, tags, assigned to, device group or time, and you can save filters for your shift. Triage means deciding quickly which incidents need attention first: high severity, multiple sources, sensitive assets such as domain controllers or executives, or a tag such as Attack Disruption. Assign the incident to yourself or a colleague so work is not duplicated, and set the status to In progress. Incidents with many alerts from several products are usually more urgent than a single low-severity alert.",
   "Opening an incident shows the attack story: a timeline of the alerts, an incident graph of how users, devices, files and IP addresses connect, and details of each alert with its process tree. Other tabs list the assets (devices, users, mailboxes, apps), the automated investigations, and the evidence and response items with their verdicts. A summary panel shows the incident's scope and, where licensed, a Security Copilot summary. You can add comments and tags so later analysts see your reasoning, and the activity log records every change.",
   "Status, severity and ownership tell the rest of the team where each incident stands. An incident moves from Active to In progress when someone picks it up and to Resolved when the work is finished, and its severity generally reflects the most serious alert it contains. The incident name is generated from what the alerts describe, for example a multistage incident involving initial access and execution on one endpoint, and it can change as new alerts join. Because new alerts can be correlated into an open incident at any time, check the alert count and the most recent activity before you assume you have the whole picture. Tags are free text, so many teams agree on a small set, such as a campaign name or a tag for incidents escalated to Tier 2, and saved filters on those tags keep each shift focused on the work that is theirs.",
   "Correlation is not always perfect. If an alert clearly belongs to another incident, you can link it to that incident from the alert page (Link alert to another incident), either an existing one or a new one. You can also merge incidents that turn out to be the same attack: select them in the queue and choose Merge, which moves their alerts into one incident and closes the others as merged. Conversely, you can move an unrelated alert out into a new incident. Keeping one incident per attack keeps metrics and response coherent and stops two analysts working the same attack in parallel.",
   "When you resolve an incident, set a classification and a determination. The classifications are True positive, Informational expected activity, and False positive. Determinations give the detail. For true positives, examples include multistage attack, malware, phishing, compromised account and malicious user activity. For informational expected activity, examples are security testing, line-of-business application and confirmed activity. For false positives, examples are not malicious and not enough data to validate. Sentinel in the Azure portal uses similar terms: true positive, benign positive (suspicious but expected), false positive and undetermined. Correct classification feeds tuning: many false positives from one rule means the rule needs work, while an authorized penetration test should not be marked false positive, because the detection worked correctly.",
   "Consider a worked example. Two incidents appear ten minutes apart: one for a phishing email delivered to a finance user, one for suspicious PowerShell on the same user's laptop. The Tier-1 analyst filters the queue by that user, sees the shared user and device, merges the two into one incident, assigns it to herself and sets it to In progress. The attack story shows the email, a click, a downloaded script and an outbound connection. She isolates the laptop, removes the email from all mailboxes, and after cleanup resolves the incident as True positive with a phishing determination, adding a comment summarizing the evidence.",
   "Common mistakes: working alerts one by one and missing that they are the same attack; leaving incidents unassigned so two people duplicate effort; marking a red-team exercise as false positive, which hides a working detection and pushes someone to weaken it; merging incidents that merely share a common server but are unrelated, which muddles scope; and closing without a determination or comment, which leaves nothing for metrics or the next analyst. Another trap is assuming severity alone sets priority; asset value and breadth matter too.",
   "Exam questions use the portal's own words. 'Alert belongs to a different incident' points to linking the alert. 'Two incidents are the same attack' points to merging. 'Approved penetration test detected' points to Informational expected activity with a security testing determination (benign positive in Sentinel). 'Detection logic was wrong' points to False positive. 'See how entities connect' points to the incident graph in the attack story. 'Avoid duplicate work' points to assignment."
  ],
  "analogy": "Think of a detective's case file. Each alert is a witness statement, and the incident is the case file that holds every statement about one crime. Assigning the incident is writing your name on the folder so two detectives do not interview the same witnesses. Linking an alert is moving one misfiled statement into the right folder; merging is realizing two folders describe the same crime and combining them. The analogy stops at the closing label: the exam expects the exact portal words, such as Informational expected activity with a security testing determination, not a general verdict like case closed.",
  "terms": [
   [
    "Incident",
    "A group of correlated alerts and evidence that represents one attack or related activity."
   ],
   [
    "Alert correlation",
    "Automatic grouping of alerts into incidents based on shared entities and timing."
   ],
   [
    "Attack story",
    "The incident view that shows the alert timeline, an incident graph and alert details."
   ],
   [
    "Merge incidents",
    "Combining incidents that represent the same attack so their alerts sit in one incident."
   ],
   [
    "Classification",
    "The resolution verdict: true positive, informational expected activity or false positive."
   ],
   [
    "Determination",
    "The detailed reason under a classification, such as phishing, security testing or not malicious."
   ],
   [
    "Link alert to another incident",
    "Moving a single alert into an existing or new incident when correlation placed it in the wrong one."
   ]
  ],
  "example": "Two incidents appear ten minutes apart: one for a phishing email, one for suspicious PowerShell on the same user's laptop. The Tier-1 analyst sees the shared user and device, merges them into one incident, assigns it to herself, isolates the laptop, and after cleanup resolves it as a true positive with a phishing determination and a comment explaining the chain of events.",
  "mistakes": [
   [
    "An approved penetration test that triggered alerts should be closed as False positive.",
    "False positive means the detection logic or data was wrong. A correctly detected authorized test is Informational expected activity with a security testing determination (benign positive in Sentinel), which keeps the working detection from being weakened."
   ],
   [
    "Linking an alert and merging incidents are the same action.",
    "Linking moves one alert into another incident (existing or new). Merging combines whole incidents that represent the same attack and closes the others as merged."
   ],
   [
    "Any two incidents that share an entity should be merged.",
    "A shared entity such as a busy file server or a common admin account does not prove one attack. Merge only when the evidence shows the same attack, or scope and metrics become muddled."
   ],
   [
    "Severity alone decides which incident to work first.",
    "Triage also weighs breadth (alerts from several products), asset value such as domain controllers or executives, and tags such as Attack Disruption."
   ]
  ],
  "tryit": [
   [
    "Incident 4120 contains five alerts about Jordan's account: a risky sign-in, a new inbox forwarding rule and three suspicious file downloads, all from the same external IP address. It also contains a sixth alert about a printer driver installed on an unrelated print server, which joined because the same helpdesk admin account touched both. Nothing else connects the print server to Jordan. What should you do with the sixth alert?",
    "Move it out by linking it to a new incident. It does not belong to the attack on Jordan's account, so leaving it inflates the scope and could send responders to the wrong server. Merging would be wrong because the problem is one misplaced alert, not two incidents describing the same attack."
   ],
   [
    "An alert fires because the IT team's approved remote support tool opened a session on a workstation. You confirm with the IT manager that the session was a scheduled support call. How do you resolve it?",
    "Resolve it as Informational expected activity with a determination such as line-of-business application or confirmed activity, and add a comment naming who confirmed it. It is not a false positive, because the detection correctly saw a remote session."
   ]
  ],
  "tip": "An authorized penetration test or red-team exercise is informational expected activity with a security testing determination (benign positive in Sentinel), not a false positive. False positive means the detection logic or data was wrong.",
  "check": [
   [
    "What do you do when an alert in one incident clearly belongs to another incident?",
    "Link it to the correct incident from the alert page, or merge the incidents if they are the same attack."
   ],
   [
    "How should a detection of an approved admin tool be classified?",
    "Informational expected activity with a determination such as line-of-business application or confirmed activity."
   ],
   [
    "Why does Defender XDR group alerts into incidents?",
    "So analysts see a whole attack in one place, based on shared entities and timing, instead of chasing separate alerts."
   ],
   [
    "Why assign an incident and set it to In progress when you start work?",
    "It shows colleagues who owns it, prevents duplicate investigation and keeps queue metrics accurate."
   ]
  ]
 },
 {
  "t": "Defender for Endpoint response: isolate device, restrict app execution, run antivirus scan, collect investigation package, live response, stop and quarantine file, file indicators, device timeline",
  "hook": "It is 1:40 a.m. at Lakeside Medical Group and Devon, the on-call analyst, gets paged: a laptop at a nurses' station is renaming hundreds of files with a strange extension. The same laptop has an open connection to an IP address nobody recognizes. The charge nurse needs the medication schedule that lives on a shared drive, and the device owner is asleep. Devon has a menu of buttons on the device page in Microsoft Defender for Endpoint. Some will stop the spread in seconds, some will keep the nurse working, and one wrong choice could destroy the evidence the incident team will need tomorrow. Which button comes first?",
  "simple": "When a computer in your company is infected, Defender for Endpoint gives you remote controls. Isolate cuts the computer off from the network, like closing the door to a sick patient's room, while still letting the security team look in through a special window. Restrict app execution leaves the computer on the network but lets only programs signed by Microsoft run. A scan checks for known bad files. The investigation package is a quick photo album of everything running on the computer before it gets wiped. Live response is a remote command window. Stop and quarantine locks away a bad file, and an indicator blocks that file on every computer. The timeline is the computer's diary of what happened, minute by minute.",
  "body": [
   "When an endpoint is involved in an incident, Microsoft Defender for Endpoint (MDE) gives you response actions on the device page and on file pages. Knowing which one fits the situation is a core SC-200 skill, because each action trades containment against disruption to the user. Device actions appear in the top-right menu of the device page; file actions appear on the file page you reach from an alert, the device timeline or a search.",
   "Isolate device cuts the machine off from the network while keeping its connection to the Defender service, so you can still investigate and run actions. Full isolation blocks everything else; selective isolation allows Outlook, Teams and similar apps to keep working on supported platforms. Isolation stops lateral movement, data theft and command-and-control (C2) traffic. Restrict app execution is different: the device stays on the network, but only code signed by Microsoft can run. It suits a case where the user must keep working and the threat is an unsigned tool. Both actions are reversible from the device page and require a comment explaining why.",
   "Every one of these actions is recorded and many are reversible, which is why the portal asks for a comment when you start them. Your comment appears in the Action center and in the device's history, so a colleague on the next shift can see that you isolated the laptop because it was beaconing to a suspicious domain, not on a whim. If a device is offline when you start an action, the action waits until the device reconnects to the service, so check the action status rather than assuming it has taken effect. Whether you can see a button at all depends on your role and on the device groups you are scoped to, which is how organizations let Tier-1 analysts run antivirus scans while reserving isolation and live response for senior responders.",
   "Run antivirus scan starts a quick or full Microsoft Defender Antivirus scan remotely. Collect investigation package gathers forensic data into a zip file: running processes, network connections, scheduled tasks, services, autoruns, installed programs, prefetch files, security event logs and more. It is a fast way to capture a snapshot before the device is reimaged. Live response opens a remote shell session on the device from the portal. It must be turned on under Settings, Endpoints, Advanced features (servers have a separate toggle). Basic commands, which are read-only, let you list processes, view files and collect files with `getfile`. Advanced commands, which need the advanced live response permission in your role, let you upload files and scripts to the library with `putfile`, run library scripts with `run`, and remediate files; running unsigned scripts needs a separate setting. All commands are logged.",
   "```text\nprocesses\ngetfile \"C:\\Users\\Public\\invoice.js\"\nrun collect-logs.ps1\nremediate file \"C:\\Users\\Public\\invoice.js\"\n```",
   "For a malicious file, stop and quarantine file kills the running processes and moves the file to quarantine on the devices where it was seen. Add indicator creates a file hash indicator with an action such as block execution or block and remediate, so the file cannot run anywhere in the tenant or in the device groups you choose. You can also download the file for analysis or submit it for deep analysis in a sandbox. For Internet Protocol (IP) address and uniform resource locator (URL) indicators, remember that network protection must be on. The device timeline shows the device's events in time order: process starts, network connections, file changes, logons and registry changes, with alerts marked. You can filter, search, flag events of interest and export. The same data lives in advanced hunting tables such as DeviceProcessEvents, which helps when you need to search across many devices. Every action you take appears in the Action center, where it can be reviewed and undone.",
   "Consider a worked example. A laptop shows ransomware-like file renames. The analyst isolates it immediately with full isolation, then collects an investigation package. The device timeline shows the encryptor arrived as an email attachment ten minutes before the alert and was launched by the user. She uses stop and quarantine file on the encryptor, which also finds and quarantines copies on two other laptops, and adds a block and remediate hash indicator so the file cannot run on any other device. Through live response she collects the ransom note with `getfile` for the incident record, then hands the laptop to desktop support for reimaging.",
   "Common mistakes: choosing restrict app execution when C2 traffic is active (the device can still talk out); isolating a critical server without coordinating with its owners; relying on quarantine on one device when the file is spreading (use an indicator); expecting live response to work when it is disabled or your role lacks advanced permissions; and reimaging before collecting an investigation package, which destroys evidence. Remember too that access to actions depends on your role and the device group, so a Tier-1 analyst may be able to run scans but not live response.",
   "Exam scenarios hinge on clue words. 'Stop lateral movement' or 'communicating with a C2 server' means isolate. 'User must keep working, block untrusted tools' means restrict app execution. 'Forensic snapshot before reimage' means collect investigation package. 'Run a custom script or retrieve a specific file' means live response. 'Block this file everywhere' means a file indicator. 'What happened on this machine before the alert' means the device timeline."
  ],
  "analogy": "Think of a hospital ward. Isolating a device is moving a patient into an isolation room: nobody else on the ward can catch the illness, but doctors (the Defender service) can still enter. Restricting app execution is letting the patient stay on the ward but only take medicine from the hospital pharmacy (Microsoft-signed code). Quarantining a file treats one patient, while a file indicator is a ward-wide ban on a contaminated batch of medicine. The analogy breaks on one point the exam tests: a restricted device can still talk to the outside, so it does not stop command-and-control traffic.",
  "terms": [
   [
    "Isolate device",
    "Disconnects a device from the network except for the Defender service connection."
   ],
   [
    "Restrict app execution",
    "Allows only Microsoft-signed code to run on a device while it stays connected."
   ],
   [
    "Investigation package",
    "A zip of forensic data (processes, connections, autoruns, logs) collected remotely from a device."
   ],
   [
    "Live response",
    "A remote shell session into a device for collecting files and running approved scripts."
   ],
   [
    "Stop and quarantine file",
    "An action that kills a file's processes and quarantines it on the devices where it was seen."
   ],
   [
    "Device timeline",
    "A chronological view of a device's process, network, file, logon and registry events with alerts marked."
   ],
   [
    "File indicator",
    "A tenant-wide or device-group rule on a file hash with an action such as block execution or block and remediate."
   ]
  ],
  "example": "A laptop shows ransomware-like file renames. The analyst isolates it immediately, collects an investigation package, uses stop and quarantine file on the encryptor, and adds a block and remediate hash indicator so the file cannot run on other devices. The device timeline shows the file arrived from an email attachment ten minutes before the alert, which leads her to purge the email from other mailboxes.",
  "mistakes": [
   [
    "Restrict app execution is the right choice when the device is talking to a command-and-control server.",
    "Restrict app execution leaves the device on the network, so existing malicious connections and traffic from signed tools can continue. Active C2 or lateral movement calls for isolation."
   ],
   [
    "Stop and quarantine file blocks the file across the whole tenant.",
    "Quarantine acts on devices where the file was seen. To stop it running anywhere, including devices it has not reached yet, create a file hash indicator with block execution or block and remediate."
   ],
   [
    "Live response is always available to any analyst.",
    "It must be turned on under Advanced features (servers have a separate toggle), uploading and running scripts needs advanced live response permissions, and unsigned scripts need a separate setting."
   ],
   [
    "Reimage first, investigate later.",
    "Reimaging destroys volatile evidence. Collect an investigation package first so processes, connections, persistence and logs are preserved."
   ]
  ],
  "tryit": [
   [
    "A finance analyst's laptop runs an unsigned remote-control tool that an attacker installed. Defender shows no network connections from the tool in the last day, and the analyst must finish quarter-end reports on that laptop tonight. The incident lead wants the tool stopped without cutting the analyst off from the network. Which action fits best?",
    "Restrict app execution. It keeps the laptop on the network so the analyst can work, while blocking the unsigned tool because only Microsoft-signed code can run. If the tool were actively beaconing to a C2 server or spreading, isolation would be the safer choice despite the disruption."
   ],
   [
    "A malicious script was found on one workstation. Advanced hunting shows the same file hash was downloaded on six other devices, but it has not executed on them yet. How do you prevent it from running anywhere?",
    "Create a file hash indicator with block execution or block and remediate, scoped to all devices or the relevant device groups. Quarantine on the first workstation alone would not protect the other six or devices the file reaches later."
   ]
  ],
  "tip": "Isolation versus restrict app execution is a classic pair: active spread or command-and-control means isolate; user must keep working and the tool is unsigned means restrict app execution. A tenant-wide block is a file indicator, not quarantine on one device.",
  "check": [
   [
    "Which action keeps a device on the network but allows only Microsoft-signed code to run?",
    "Restrict app execution."
   ],
   [
    "What must be enabled to run your own uploaded scripts in live response?",
    "Live response turned on in settings, a role with advanced live response permissions to upload (putfile) and run scripts, plus the unsigned script execution setting if the scripts are unsigned."
   ],
   [
    "How do you stop a malicious file from running on every device in the tenant?",
    "Create a file hash indicator with block execution or block and remediate."
   ],
   [
    "Why collect an investigation package before reimaging a device?",
    "Reimaging destroys evidence; the package preserves processes, connections, persistence and logs for later analysis."
   ],
   [
    "Which action should you take when a device is actively communicating with a command-and-control server?",
    "Isolate the device; it blocks all network traffic except the Defender service connection, cutting off C2 and lateral movement."
   ]
  ]
 },
 {
  "t": "Action center: pending and completed remediation actions; automatic attack disruption of compromised users and devices",
  "hook": "At 6:55 a.m. Priya logs in to the Riverbend Logistics SOC and finds an incident tagged Attack Disruption. Overnight, Defender XDR disabled a domain admin account and contained the server it was used from. The operations manager is already messaging: shipping labels will not print because that server runs the label service. Meanwhile, the incident shows an automated investigation that found the same suspicious binary on two more servers, but nothing says it was removed. Was the threat contained or not? What did the machines do on their own, what is still waiting for a human, and when is it safe to undo the containment?",
  "simple": "Defender can fix some problems on its own, but sometimes it needs a person to say yes first. The Action center is the place that shows both lists: actions waiting for your approval (Pending) and actions already done, rejected or undone (History). Think of an in-tray and an out-tray on a desk. Separately, automatic attack disruption is Defender's emergency brake: when it is very sure an attack like ransomware is happening right now, it locks the attacker out by cutting off a computer or disabling an account without waiting for anyone. That buys time, but a person still has to investigate, clean up and then unlock things.",
  "body": [
   "The Action center in the Defender portal (Investigation and response, Actions and submissions, Action center) is one place to see remediation actions across Defender XDR (extended detection and response), whether an analyst took them manually or automated investigation and response (AIR) proposed them. It has two tabs. Pending lists actions that are waiting for approval. History lists actions that were completed, failed, rejected or undone, with who approved them and when. It is the single answer to the question of what has been done, or is waiting to be done, to contain this attack.",
   "Why do actions wait? Each device group has an automation level. Full remediation means automated investigations fix threats automatically. Semi-automated levels require approval for some or all remediation, for example approval for any folders or approval only for core folders. No automated response means investigations do not run at all on those devices. In Defender for Office 365, email remediation found by automated investigations, such as soft-deleting a phishing message from many mailboxes, also waits in the Pending tab for approval. Reviewing Pending regularly matters because a threat is not contained until someone approves.",
   "From an action you can approve or reject it, open the related investigation to see the evidence graph and verdicts, and in History undo actions that can be undone, such as releasing a quarantined file or ending device isolation. Action types include quarantine file, remove persistence (for example a registry run key), stop process, isolate device, collect investigation package and soft delete email. The History tab also serves as an audit trail for who did what during an incident, and you can export it for a post-incident review.",
   "It helps to know where automation levels live and what they control. Device groups and their automation levels are set under Settings, Endpoints, Device groups, and a device's group decides how much an automated investigation may do without a person. Many organizations choose full remediation for ordinary workstations, where speed matters more than caution, and a semi-automated level for servers or executive devices, where an unexpected quarantine could interrupt a critical service. Neither choice is wrong, but each has a consequence the security operations center (SOC) must own: semi-automated groups produce a Pending queue that someone has to watch on every shift. The Action center lets you filter by action type, status, source and investigation, so a shift lead can quickly answer how many approvals are waiting and how old the oldest one is.",
   "Automatic attack disruption is a Defender XDR capability for high-confidence, in-progress attacks such as human-operated ransomware, business email compromise (BEC) and adversary-in-the-middle (AiTM) phishing. It correlates signals across products, and when it is confident an attack is happening it contains assets automatically: containing a device so other onboarded devices stop talking to it, disabling a compromised user account in Active Directory through Defender for Identity, or containing a user so the account cannot be used for lateral movement. Suspending the user in Microsoft Entra ID and revoking sessions in cloud apps are other possible actions. The incident is tagged Attack Disruption so analysts spot it immediately.",
   "Attack disruption depends on the products being deployed and configured: for example, Defender for Endpoint onboarding with automated response allowed, and Defender for Identity for on-premises account disable. You can exclude specific users or devices, such as critical service accounts or core infrastructure, under the automated response exclusions settings. After the analyst has investigated and remediated, they release the contained device or re-enable the user from the Action center or the asset page. The value is speed: ransomware can spread in minutes, faster than any human SOC can respond. Attack disruption buys time; the analyst still investigates, removes the root cause and resets credentials.",
   "Consider a worked example. At 2 a.m., Defender XDR sees a compromised admin account pushing a suspicious binary to many servers. Attack disruption contains the source device and disables the account in Active Directory. When the on-call analyst logs in, the incident is tagged Attack Disruption. She reviews the attack story, finds two further servers where the binary landed, and sees in the Pending tab that an automated investigation wants to quarantine it on those servers because their device group is semi-automated. She approves both actions, works with the identity team to reset the admin password and revoke its sessions, removes the persistence the attacker created, and releases containment from the Action center.",
   "Common mistakes: assuming remediation happened when it is still sitting in Pending; setting sensitive device groups to no automated response and then wondering why investigations never remediate; forgetting to release containment after cleanup, which leaves users unable to work; not excluding break-glass or critical service accounts from automatic containment; and treating attack disruption as the end of the response rather than the start of the investigation.",
   "Exam wording is consistent. 'Remediation was proposed but not applied' or 'waiting for approval' points to the Pending tab and the device group's automation level. 'Who approved this action' or 'undo a quarantine' points to the History tab. 'Automatically contain a device and disable a user during ransomware without analyst action' points to automatic attack disruption. 'Stop a service account from being disabled automatically' points to an exclusion."
  ],
  "analogy": "Picture a building's security desk. The Pending tab is the stack of door-lock requests waiting for the supervisor's signature; nothing is locked until someone signs. The History tab is the logbook of every door locked or unlocked, with names and times. Automatic attack disruption is the fire alarm system that closes the fire doors on its own when it detects smoke, without asking. The analogy has a limit: fire doors close for any smoke, while attack disruption acts only on high-confidence, correlated signals of an attack in progress, and you can exclude specific accounts and devices.",
  "terms": [
   [
    "Action center",
    "The Defender portal page listing pending and completed remediation actions across Defender XDR."
   ],
   [
    "Automated investigation and response (AIR)",
    "Defender's automatic investigation of alerts that produces verdicts and proposed remediation actions."
   ],
   [
    "Automation level",
    "A device group setting that decides whether remediation runs automatically or waits for approval."
   ],
   [
    "Automatic attack disruption",
    "High-confidence automatic containment of compromised devices and users during an active attack."
   ],
   [
    "Contain device",
    "An attack disruption action that stops other onboarded devices from communicating with a compromised device."
   ],
   [
    "Contain user",
    "An attack disruption action that stops a compromised account from being used to move laterally."
   ],
   [
    "Pending tab",
    "The Action center list of remediation actions waiting for approval."
   ],
   [
    "History tab",
    "The Action center list of completed, failed, rejected or undone actions with who approved them and when."
   ]
  ],
  "example": "At 2 a.m., Defender XDR sees a compromised admin account pushing a suspicious binary to many servers. Attack disruption contains the source device and disables the account in Active Directory. When the on-call analyst logs in, the incident is tagged Attack Disruption; after investigating, she approves pending quarantine actions, resets the account, removes the binary and releases containment from the Action center.",
  "mistakes": [
   [
    "If an automated investigation found a threat, it has already been remediated.",
    "On devices in semi-automated groups, remediation waits in the Pending tab until someone approves it. Check Pending before reporting containment."
   ],
   [
    "Attack disruption actions wait for analyst approval like other automated actions.",
    "Attack disruption is automatic and high-confidence; it acts immediately to contain devices and users. Analysts review afterward and release containment when safe."
   ],
   [
    "Attack disruption finishes the response.",
    "It only buys time. The analyst still investigates scope, removes the root cause and persistence, resets credentials and then releases containment."
   ],
   [
    "Critical service accounts are automatically safe from containment.",
    "You must add them to the automated response exclusions if disabling them would cause unacceptable disruption."
   ]
  ],
  "tryit": [
   [
    "Your company's database servers sit in a device group whose automation level requires approval for all folders. An automated investigation on one server identified a malicious scheduled task and a dropped executable two hours ago, but the alert is still active and the files are still on disk. The server owner asks why Defender did nothing. What do you check and do?",
    "Open the Action center Pending tab, where the proposed actions (remove persistence and quarantine file) are waiting because of the device group's semi-automated level. Review the investigation evidence, approve the actions, and confirm they appear in History as completed. Then discuss with the team whether the group's automation level and the shift's Pending checks are right."
   ],
   [
    "Attack disruption disabled the account svc-print, which runs printing for the whole warehouse, during a ransomware incident. After investigation you confirm the account was not used by the attacker; a different admin account was. What should happen now and to prevent this next time?",
    "Re-enable or release the account from the Action center or the user page once you are confident it is clean, and record the reasoning. If the business cannot tolerate that account being contained, consider adding it to the automated response exclusions, accepting the risk that it would not be contained if it is ever compromised."
   ]
  ],
  "tip": "If remediation 'did not happen', check the Pending tab: the device group's automation level probably required approval. Attack disruption is automatic and high-confidence; it does not wait for approval.",
  "check": [
   [
    "Where do you approve an automated investigation's pending remediation?",
    "In the Action center's Pending tab."
   ],
   [
    "Name two containment actions automatic attack disruption can take.",
    "Contain a device, and disable or contain a compromised user account."
   ],
   [
    "How do you prevent a critical service account from being disabled by attack disruption?",
    "Add it to the automated response exclusions for attack disruption."
   ],
   [
    "Where do you undo a quarantine or see who approved an action?",
    "In the Action center's History tab, which lists completed actions with approvers and allows undo where supported."
   ]
  ]
 },
 {
  "t": "Defender for Office 365: Threat Explorer, removing delivered phishing, user-reported messages and Submissions",
  "hook": "On Monday at 8:15 a.m., Jamal on the Cedar Valley School District security team sees three reports from teachers: an email titled Payroll update requires your confirmation. It looks like it came from the district's payroll provider, but the domain is slightly wrong. The district has two thousand mailboxes, and staff are opening email as they arrive for the day. Jamal knows three people reported it, but how many actually received it, how many clicked, and how can he pull every copy out before the first bell, without deleting evidence he might need later?",
  "simple": "When a fake email reaches many people, you need to find every copy, see who clicked the link, and pull the emails back out. Threat Explorer is a search tool for all the email your company received; it shows where each copy is now and lets you move or delete them in one go, like a librarian recalling every copy of a misprinted book. Soft delete puts the email somewhere the person can still recover it; hard delete removes it. When staff press the Report button in Outlook, their report lands on a page called Submissions, where the security team reviews it. You can also send samples to Microsoft so it learns that a message was bad or that a good message was wrongly blocked.",
  "body": [
   "When a phishing campaign lands, the first questions are who received it, who clicked, and how to get it out of mailboxes. Microsoft Defender for Office 365 (MDO) answers these in the Defender portal. Speed matters, because every minute a phishing email sits in inboxes is another chance for someone to click, and a single credential entered can turn an email incident into an identity compromise.",
   "Threat Explorer (in MDO Plan 2) is an interactive tool, under Email and collaboration, Explorer, to search and act on email. Views include All email, Malware, Phish and Content malware, and you can filter by sender, sender domain, recipient, subject, uniform resource locator (URL), file hash, Network Message ID, delivery action and latest delivery location (inbox, junk, quarantine, deleted). A related Campaigns view groups messages that belong to the same coordinated attack. MDO Plan 1 has a simpler tool called Real-time detections that lacks some actions. Threat Explorer also shows URL click data from Safe Links, so you can see who clicked a malicious link and whether it was blocked.",
   "To remove delivered phishing, select the messages in Threat Explorer and choose Take action. Options include move to junk, move to deleted items, soft delete (the user can still recover it from Recoverable Items), hard delete (removed from the mailbox), move to inbox for false positives, and submit to Microsoft. You can also start an automated investigation. Remediation actions from Threat Explorer are recorded in the Action center, where they can be tracked and, where required, approved. Zero-hour auto purge (ZAP) does something similar automatically: when a message already delivered is later judged malicious, ZAP moves it to junk or quarantine, depending on policy. The same data is in advanced hunting, for example:",
   "```kusto\nEmailEvents\n| where Subject has \"payroll update\" and SenderFromDomain == \"contoso-pay.example\"\n| project Timestamp, RecipientEmailAddress, DeliveryLocation, NetworkMessageId\n```",
   "Each message also has an email entity page, which you reach by selecting it in Threat Explorer or from an alert. It brings together what you need to judge one message: the headers, the authentication results for Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM) and Domain-based Message Authentication, Reporting and Conformance (DMARC), the URLs and attachments with their verdicts, and the delivery and latest location history. The Network Message ID is the most reliable way to follow one message across tools, because subjects and senders can be shared by legitimate mail, while the Network Message ID identifies that specific message. Deleting or moving mail from Threat Explorer also requires an appropriate role, so if the Take action button is missing or unavailable, check permissions before assuming the feature is absent.",
   "Users are an important sensor. With the built-in Report button in Outlook, users report messages as phishing, junk or not junk. The user reported settings decide where reports go: to Microsoft, to a reporting mailbox you choose, or both. Reported messages appear on the Submissions page under the User reported tab, where analysts review them, mark them, and optionally notify the user of the result. User reports can also trigger automated investigations. The Submissions page is also where admins submit items to Microsoft for analysis: emails, attachments, URLs, files and Teams messages. You submit a false negative (malicious mail that got through) or a false positive (good mail that was blocked), and Microsoft returns a verdict. For false positives you can create allow entries in the Tenant Allow/Block List, and for false negatives you can add block entries for senders, URLs or files.",
   "Consider a worked example. Forty employees receive a fake payroll email, and three report it with the Report button. The analyst opens the report on the Submissions page, pivots to Threat Explorer by subject and sender, and finds all forty copies, thirty-eight in inboxes. She soft deletes them, checks URL clicks and sees two users clicked through, blocks the sender domain and URL in the Tenant Allow/Block List, submits a sample to Microsoft as a false negative, and opens an identity investigation for the two users, starting with their sign-in logs after the click time.",
   "Common mistakes: deleting only the reported copies instead of every copy in the tenant; hard deleting when you might need the message as evidence or it could be a false positive; forgetting the click data, so a user who entered credentials is missed; assuming Plan 1 has Threat Explorer; and relying on ZAP alone, which depends on a later verdict and may not act on every message. Another trap is blocking a sender but not the URL, so a new sender with the same link gets through.",
   "Exam questions name the tool by its job. 'Find every copy and remove it' means Threat Explorer and Take action. 'Plan 1 equivalent' means Real-time detections. 'Recoverable by the user' means soft delete. 'Already-delivered mail later found malicious, removed automatically' means ZAP. 'Where do user reports appear' means Submissions, User reported. 'Tell Microsoft a verdict was wrong' means an admin submission. 'Block this sender or URL tenant-wide' means the Tenant Allow/Block List."
  ],
  "analogy": "Imagine a store that discovers a batch of contaminated cereal. Threat Explorer is the shipping database that shows every store and shelf where that batch landed, so you can pull every box at once instead of only the three that customers complained about. Soft delete is moving boxes to the back room, where they can be returned to the shelf; hard delete is destroying them. User reports are customer complaints at the counter. The limit: unlike cereal, email click data tells you who already opened the box, and those people need a follow-up identity investigation.",
  "terms": [
   [
    "Threat Explorer",
    "An MDO Plan 2 tool for searching, analyzing and remediating email across the tenant."
   ],
   [
    "Real-time detections",
    "The simpler MDO Plan 1 email search tool, with fewer remediation actions than Threat Explorer."
   ],
   [
    "Soft delete",
    "Removing a message from the mailbox into Recoverable Items, where it can still be restored."
   ],
   [
    "Submissions",
    "The Defender portal page for user-reported messages and admin submissions of email, files and URLs to Microsoft."
   ],
   [
    "Zero-hour auto purge (ZAP)",
    "Automatic removal of already delivered messages later found to be malicious."
   ],
   [
    "Tenant Allow/Block List",
    "A tenant-wide list of allow and block entries for senders, URLs and files."
   ],
   [
    "Network Message ID",
    "A unique identifier for one email message, used to track it across Threat Explorer, alerts and advanced hunting."
   ]
  ],
  "example": "Forty employees receive a fake payroll email, and three report it with the Report button. The analyst opens the report on the Submissions page, pivots to Threat Explorer by subject and sender, finds all forty copies, soft deletes them, sees two users clicked the link, blocks the sender domain in the Tenant Allow/Block List, and opens an identity investigation for the two users.",
  "mistakes": [
   [
    "Removing only the copies users reported is enough.",
    "Reported copies are usually a fraction of the campaign. Use Threat Explorer to find every copy by sender, subject, URL or Network Message ID and act on all of them."
   ],
   [
    "Defender for Office 365 Plan 1 includes Threat Explorer.",
    "Threat Explorer is Plan 2. Plan 1 has the simpler Real-time detections tool with fewer remediation actions."
   ],
   [
    "Hard delete is always the safest choice.",
    "Hard delete removes the message permanently, losing evidence and preventing recovery if it was a false positive. Soft delete is usually the safer first step."
   ],
   [
    "Zero-hour auto purge will clean up every malicious message, so no action is needed.",
    "ZAP depends on a later verdict and policy settings and may not act on every copy. Analysts still search, remediate and check click data."
   ]
  ],
  "tryit": [
   [
    "For a week, invoices from a long-time supplier have been going to quarantine as phishing. The finance team confirms the messages are genuine, and the supplier's sending setup has not changed. Finance asks you to make it stop. What do you do?",
    "Submit a sample on the Submissions page to Microsoft as a false positive (should not have been blocked), and if needed create a time-limited allow entry in the Tenant Allow/Block List for that sender. Release the legitimate quarantined messages. Avoid broad allows that could let real phishing from a spoofed lookalike through."
   ],
   [
    "Threat Explorer shows a phishing message was delivered to 60 inboxes. URL click data shows four users clicked and one click was allowed through. What are your next two steps beyond removing the messages?",
    "Block the URL and sender domain in the Tenant Allow/Block List so new variants are stopped, and open an identity investigation for the user whose click was allowed, checking sign-in logs after the click time for signs of credential theft and resetting the password and revoking sessions if needed."
   ]
  ],
  "tip": "Threat Explorer is Plan 2; Real-time detections is Plan 1. The remediation you take from Threat Explorer shows up in the Action center. Soft delete is recoverable; hard delete is not.",
  "check": [
   [
    "Where do messages users report with the Report button appear for analysts?",
    "On the Submissions page, under the User reported tab, and in the reporting mailbox if configured."
   ],
   [
    "How do you find which users clicked a malicious URL?",
    "Use Threat Explorer's URL click data (from Safe Links) filtered on that URL, or the UrlClickEvents table in advanced hunting."
   ],
   [
    "What is the difference between soft delete and hard delete?",
    "Soft delete moves the message to Recoverable Items, where the user can restore it; hard delete removes it completely."
   ],
   [
    "What does zero-hour auto purge do?",
    "It automatically moves already delivered messages to junk or quarantine when they are later judged malicious."
   ]
  ]
 },
 {
  "t": "Defender for Identity alerts: DCSync, Golden Ticket, pass-the-hash; lateral movement paths; KRBTGT reset",
  "hook": "At 3:10 a.m., Elena on the Pinecrest Manufacturing night shift sees a high-severity alert from Defender for Identity: Suspected DCSync attack, from a workstation in the engineering subnet, using a service account she has never heard of. The workstation is not a domain controller. Her lead texts back one line: if they got the KRBTGT hash, we have a much bigger problem. Elena knows the incident will not end with a single password reset. What did the attacker actually gain, what can they do with it, and what is the right order of steps to take the domain back?",
  "simple": "In a Windows company network, Active Directory is the system that checks who you are and hands out digital passes. Some attacks steal those passes or the secrets behind them. DCSync is when an attacker pretends to be a directory server and asks for everyone's password secrets. A Golden Ticket is a fake master pass made with the secret of a special account called KRBTGT, the one that stamps every pass. Pass-the-hash uses a stolen scrambled password to log in without knowing the real password. Defender for Identity spots these and warns you. Fixing a Golden Ticket means changing the KRBTGT secret twice, because the system still accepts passes stamped with the previous secret.",
  "body": [
   "Microsoft Defender for Identity (MDI) raises alerts for classic Active Directory (AD) attacks. You do not need to know how to perform them, but you must recognize them, understand what the attacker gained, and know the correct response. These alerts matter because they usually mean the attacker is already inside and working toward control of the whole domain, so they deserve high priority in the queue.",
   "Defender for Identity sees these attacks because it runs sensors on domain controllers, and it can also run them on Active Directory Federation Services (AD FS), Active Directory Certificate Services (AD CS) and Microsoft Entra Connect servers. The sensors read network traffic and Windows events such as authentication and replication requests. Each alert names the source computer, the account involved and the target domain controller, and the user and device pages show an identity timeline of activity before and after the alert. If a domain controller has no sensor, activity against it goes unseen, so coverage of every domain controller is a prerequisite for trusting the absence of alerts. Alerts from MDI flow into Defender XDR (extended detection and response) incidents, where they are correlated with endpoint evidence from the same devices, which is often how you find the machine where credentials were stolen.",
   "DCSync abuses directory replication. Domain controllers legitimately replicate with each other using the Directory Replication Service (DRS) protocol. An attacker with an account holding replication rights (such as Domain Admins, or an account given the Replicating Directory Changes All permission) asks a domain controller to replicate password data from a machine that is not a domain controller. MDI raises Suspected DCSync attack (replication of directory services) because replication requests from a non-domain-controller are abnormal. The response is to find how the attacker got the privileged account, remove any unexpected replication permissions, reset affected credentials and treat any obtained hashes, possibly including KRBTGT, as compromised.",
   "A Golden Ticket is a forged Kerberos ticket-granting ticket (TGT). If an attacker steals the hash of the KRBTGT account, the account that signs all TGTs in the domain, they can create TGTs for any user, with any group memberships and long lifetimes, without ever touching a password. MDI detects signs of forged tickets, such as encryption downgrades, tickets for nonexistent accounts, time anomalies and forged authorization data. A Golden Ticket means the domain is fully compromised, and the response must be planned as a recovery, not a quick fix.",
   "Pass-the-hash uses a stolen NT LAN Manager (NTLM) password hash to authenticate as a user without knowing the password. Pass-the-ticket does the same with a stolen Kerberos ticket. MDI flags Suspected identity theft (pass-the-hash) or pass-the-ticket when a user's credentials appear on a device where that user is not logged on. Response: isolate the source device, reset the user's password, and investigate how the hash was stolen, often through credential dumping from the Local Security Authority Subsystem Service (LSASS) process. In advanced hunting, IdentityLogonEvents and DeviceLogonEvents help trace where the account was used.",
   "Lateral movement paths (LMPs) show how an attacker could get from a non-sensitive account to a sensitive one by chaining sessions and local admin rights. For example, a helpdesk user is local admin on a workstation where a domain admin has logged on, so compromising the helpdesk user could expose the domain admin's credentials. MDI shows LMPs on user and device pages and in reports. You reduce them by removing unnecessary local admin rights, using a tiered admin model and Windows Local Administrator Password Solution (LAPS), and stopping privileged accounts from signing in to ordinary workstations. Recovering from a Golden Ticket requires resetting the KRBTGT password twice. Active Directory keeps the current and previous KRBTGT password, and tickets signed with either remain valid, so one reset is not enough. Wait for replication across all domain controllers between the two resets, plan for the disruption to existing sessions, and first remove the attacker's access, or they will steal the new hash too.",
   "Consider a worked example. MDI raises Suspected DCSync attack from a workstation using a service account that someone granted replication rights years ago. The security operations center (SOC) isolates the workstation through Defender for Endpoint, removes the replication permissions from the service account, and resets it and all privileged passwords. Because the attacker could have replicated the KRBTGT hash, the identity team performs two KRBTGT resets separated by full replication, watches for Kerberos errors, and then reviews the lateral movement path report to remove the local admin rights that let the attacker reach that workstation.",
   "Common mistakes: resetting KRBTGT only once; resetting it twice in quick succession before replication, which can break authentication across the domain; resetting passwords while the attacker still has a foothold; treating pass-the-hash as solved by a password reset alone without finding the device where the hash was stolen; and ignoring lateral movement paths because no alert has fired yet. Another trap is thinking MDI detects these attacks without sensors on every domain controller.",
   "Exam questions give you the signature and expect the attack name or the fix. 'Replication request from a non-domain-controller' means DCSync. 'Forged TGT' or 'stolen KRBTGT hash' means Golden Ticket, fixed by a double KRBTGT reset with replication in between. 'Credentials used on a device where the user is not logged on' means pass-the-hash or pass-the-ticket. 'How could an attacker reach a domain admin from this user' means lateral movement paths, reduced with LAPS, tiering and fewer local admin rights."
  ],
  "analogy": "Think of KRBTGT as the official stamp at a theme park entrance that marks every day pass. Steal the stamp and you can print passes for anyone, valid for as long as you like. Changing the stamp once is not enough, because the gate still accepts passes from the current stamp and the one before it. You change it, wait until every gate has the new stamp, then change it again. The analogy stops at timing: in Active Directory, resetting twice too quickly, before replication, can break legitimate sign-ins across the domain.",
  "mnemonic": "Golden Ticket recovery order: Remove, Reset, Replicate, Reset. Remove the attacker's access first, reset KRBTGT once, wait for replication to every domain controller, then reset KRBTGT a second time.",
  "terms": [
   [
    "DCSync",
    "An attack that impersonates a domain controller to request password data via directory replication."
   ],
   [
    "KRBTGT account",
    "The AD account whose key signs every Kerberos ticket-granting ticket in the domain."
   ],
   [
    "Golden Ticket",
    "A forged Kerberos TGT created with the stolen KRBTGT hash, granting access as any user."
   ],
   [
    "Pass-the-hash",
    "Authenticating with a stolen NTLM hash instead of the password."
   ],
   [
    "Lateral movement path",
    "A chain of sessions and admin rights that lets an attacker move from a low-value account to a sensitive one."
   ],
   [
    "LAPS",
    "Local Administrator Password Solution, which gives each device a unique, rotated local admin password."
   ],
   [
    "Pass-the-ticket",
    "Reusing a stolen Kerberos ticket to authenticate as a user without the password."
   ]
  ],
  "example": "MDI raises 'Suspected DCSync attack' from a workstation using a service account that someone granted replication rights years ago. The SOC isolates the workstation, removes the replication permissions, resets the service account and all privileged passwords, and, because the KRBTGT hash may have been taken, performs two KRBTGT resets separated by full replication.",
  "mistakes": [
   [
    "A single KRBTGT reset invalidates Golden Tickets.",
    "Active Directory accepts tickets signed with the current or previous KRBTGT password. Reset twice, with full replication in between."
   ],
   [
    "Reset KRBTGT twice back to back to finish faster.",
    "Resetting before replication completes can break authentication across the domain. Wait for replication to all domain controllers between resets."
   ],
   [
    "A password reset alone resolves a pass-the-hash alert.",
    "You must also isolate the source device and find how the hash was stolen, often credential dumping from LSASS, or the attacker can take the new hash."
   ],
   [
    "Lateral movement paths only matter after an alert fires.",
    "LMPs show risk before an attack. Reducing them with LAPS, tiered administration and fewer local admin rights prevents escalation in the first place."
   ]
  ],
  "tryit": [
   [
    "MDI shows a lateral movement path: the helpdesk group has local admin rights on twenty workstations, and a domain admin regularly signs in to one of them to check email. No alert has fired. Your manager asks what single change would most reduce the risk. What do you recommend?",
    "Stop the domain admin from signing in to ordinary workstations by using a separate privileged access workstation or tiered admin model. That breaks the path because the domain admin's credentials are no longer exposed on a machine the helpdesk can control. Removing unnecessary local admin rights and deploying LAPS further reduce the path."
   ],
   [
    "During a Golden Ticket investigation, the identity team wants to reset KRBTGT immediately, but the SOC still sees the attacker's remote access tool beaconing from two servers. Should they reset now?",
    "No. First remove the attacker's access by isolating the servers and removing the tool and persistence, then reset KRBTGT twice with replication in between. Resetting while the attacker still has a foothold lets them steal the new hash, wasting the disruptive reset."
   ]
  ],
  "tip": "KRBTGT is reset twice because AD accepts tickets signed with the current or the previous password. DCSync is recognized by replication requests coming from a machine that is not a domain controller.",
  "check": [
   [
    "Why is a single KRBTGT reset not enough after a Golden Ticket attack?",
    "Tickets signed with the previous KRBTGT password remain valid, so you reset twice, allowing replication in between."
   ],
   [
    "What makes replication traffic suspicious enough for a DCSync alert?",
    "It comes from a device that is not a domain controller using an account with replication rights."
   ],
   [
    "How do you reduce lateral movement paths?",
    "Remove unnecessary local admin rights, use LAPS and tiered administration, and keep privileged accounts off ordinary workstations."
   ],
   [
    "What does a pass-the-hash alert tell you, and what is the first containment step?",
    "A user's NTLM hash was stolen and reused from another device; isolate the source device, then reset the password and find how the hash was taken."
   ]
  ]
 },
 {
  "t": "Microsoft Entra ID Protection: risky users and sign-ins, confirm user compromised, revoking sessions; MFA fatigue response",
  "hook": "At 12:20 a.m., Sam at Brightwater Insurance takes a call from a claims adjuster, Lena. Her phone has buzzed with sign-in approval requests over and over for twenty minutes. She denied most of them, but she is not sure she did not tap Approve once while half asleep. Sam opens Microsoft Entra ID Protection and sees her account flagged as high risk. Changing her password feels like the obvious fix. But if an attacker already got in, is a new password enough, or could they still be inside her mailbox right now?",
  "simple": "Microsoft watches every sign-in and asks two questions. Was this particular sign-in really you? That is sign-in risk, for example a login from a hidden network or a strange country. Is your whole account in trouble? That is user risk, for example if your password showed up in a leaked list online. If an account is compromised, changing the password is only half the job, because the attacker may already hold a sign-in pass that still works, like a wristband at a concert. Revoking sessions cuts all wristbands so everyone must sign in again. MFA fatigue is when an attacker who knows your password sends approval requests until you tap yes just to make them stop.",
  "body": [
   "Microsoft Entra ID Protection uses signals from Microsoft's identity systems to judge how likely it is that a sign-in or an account is compromised. It has two kinds of risk. Sign-in risk is the probability that a particular sign-in was not made by the account owner, for example from an anonymous Internet Protocol (IP) address, an unfamiliar location, or a token that looks replayed. User risk is the probability that the account itself is compromised, for example because its credentials were found leaked, or because of a pattern of risky sign-ins. Risk levels are low, medium and high. Some detections are real-time, calculated during sign-in, and others are offline, calculated afterward.",
   "Analysts work from the Risky users, Risky sign-ins and Risk detections reports in the Microsoft Entra admin center (Protection, Identity Protection), and ID Protection alerts also flow into Defender XDR (extended detection and response) incidents. For a risky user you can see the detections behind the risk, their sign-in history and their risk state (at risk, confirmed compromised, remediated, dismissed). Full ID Protection features, including risk-based policies and the detailed reports, require Microsoft Entra ID P2 licensing. The same data can be sent to Sentinel in tables such as AADUserRiskEvents and AADRiskyUsers.",
   "Your actions give feedback to the system. Confirm user compromised sets the user risk to high, which triggers any risk-based policies and tells the model this pattern was real. Confirm sign-in compromised does the same for one sign-in. Confirm user safe or confirm sign-in safe tells the system it was a false positive. Dismiss user risk clears the risk without saying whether it was real, which is appropriate after remediation that happened outside the normal flow. A secure password reset by the user through a risk-based policy remediates user risk automatically.",
   "Resetting a password is not enough if the attacker holds a session token. Refresh tokens and session cookies can stay valid, so you must also revoke sessions. In the Entra admin center you choose Revoke sessions on the user; with Microsoft Graph PowerShell you run `Revoke-MgUserSignInSession -UserId user@contoso.com`. This forces the user, and the attacker, to authenticate again. In Defender XDR, marking a user as compromised or disabling the account are also available actions. Risk-based Conditional Access policies automate the response: for example, require multifactor authentication (MFA) when sign-in risk is medium or high, and require a secure password change or block access when user risk is high.",
   "Risk-based responses are configured as Conditional Access policies that use user risk or sign-in risk as a condition, which lets you combine risk with other conditions such as which apps, users and locations the policy covers. Always exclude emergency access (break-glass) accounts from these policies so a mistake cannot lock every administrator out. When a user satisfies a policy, for example by completing MFA on a risky sign-in or performing a secure password change, ID Protection records that the risk was remediated, and the risk state changes without an analyst touching it. That self-remediation is what makes risk-based policies scale, and it is why the reports show many users as remediated rather than dismissed. The analyst's attention is best spent on the cases the policies cannot handle: high risk that stays unremediated, accounts excluded from policies, and patterns across many users that suggest a campaign.",
   "MFA fatigue (also called MFA bombing or push spam) is when an attacker who already has a user's password sends repeated push approval requests, hoping the user taps Approve to make them stop. Defenses include number matching, where the user must type a number shown on the sign-in screen, and showing application name and location in the notification. When users receive unexpected prompts, they should deny and use Report suspicious activity, which marks the user as high risk in ID Protection. The security operations center (SOC) response is to treat the password as compromised: reset it, revoke sessions, review sign-ins and any MFA method changes, and move the user to phishing-resistant methods such as passkeys or FIDO2 security keys.",
   "Consider a worked example. A user reports twenty MFA prompts at midnight. ID Protection shows the account as high risk after the user chose Report suspicious activity, and the sign-in logs show the attempts came from an unfamiliar country with the correct password. The analyst confirms the user compromised, resets the password, revokes sessions, and finds in the audit logs that an hour earlier an MFA method was registered from the same IP address, so the attacker did get in once. She removes that method, checks the mailbox for new inbox rules and forwarding, and enrolls the user in a passkey before closing the incident.",
   "Common mistakes: resetting the password but not revoking sessions, leaving a stolen token alive; dismissing risk when the account really was compromised, which teaches the model nothing and hides the event; confirming a user safe without investigating; forgetting to check for MFA methods or app consents the attacker added; and blaming the user for approving a push rather than fixing the control with number matching and phishing-resistant MFA. Another trap is mixing up the risk types: an anonymous IP sign-in is sign-in risk, while leaked credentials are user risk.",
   "Exam questions test the vocabulary closely. 'Credentials found on the dark web' means leaked credentials, a user risk detection. 'Sign-in from an anonymizing network' is sign-in risk. 'Tell the system this was real and raise risk to high' is Confirm user compromised. 'Clear the risk after remediation' is Dismiss. 'Stolen token still works after reset' means revoke sessions. 'Repeated push notifications' means MFA fatigue, answered by number matching and phishing-resistant methods. 'Automatically require password change for high user risk' means a risk-based Conditional Access policy."
  ],
  "analogy": "Think of a hotel. Changing a guest's password is like re-coding the front desk's record for that guest, but any key cards already handed out keep opening the room. Revoking sessions is re-keying the door so every old card stops working, including the one the intruder has. MFA fatigue is someone knocking on the guest's door at 2 a.m. again and again, hoping a groggy guest opens it. Number matching is a peephole plus a password through the door. The analogy stops at risk scoring: unlike a hotel desk, ID Protection learns from your Confirm compromised or Confirm safe feedback.",
  "terms": [
   [
    "Sign-in risk",
    "The likelihood that a specific sign-in was not performed by the legitimate user."
   ],
   [
    "User risk",
    "The likelihood that the account itself is compromised, such as from leaked credentials."
   ],
   [
    "Confirm user compromised",
    "An analyst action that sets user risk to high, triggers policies and feeds back to the risk model."
   ],
   [
    "Revoke sessions",
    "Invalidating a user's refresh tokens and session cookies so all sessions must re-authenticate."
   ],
   [
    "MFA fatigue",
    "An attack that floods a user with push approval prompts hoping they approve one."
   ],
   [
    "Number matching",
    "An MFA push setting that requires typing a displayed number, defeating blind approvals in MFA fatigue attacks."
   ],
   [
    "Report suspicious activity",
    "An option that lets a user report an unexpected MFA prompt, which marks the user as high risk in ID Protection."
   ]
  ],
  "example": "A user reports twenty MFA prompts at midnight. ID Protection shows the account as high risk after the user chose Report suspicious activity. The analyst confirms the user compromised, resets the password, revokes sessions, removes an MFA method the attacker had added, and checks the mailbox for new inbox rules before closing the incident and moving the user to a passkey.",
  "mistakes": [
   [
    "Resetting the password is enough to lock out an attacker.",
    "Refresh tokens and session cookies can remain valid after a reset. Revoke sessions too, so every session, including the attacker's, must re-authenticate."
   ],
   [
    "Leaked credentials are a sign-in risk detection.",
    "Leaked credentials indicate the account itself is likely compromised, so they are a user risk detection. Anonymous IP or unfamiliar location sign-ins are sign-in risk."
   ],
   [
    "Dismiss user risk after confirming an account was really compromised.",
    "Dismiss clears risk without telling the model it was real. Use Confirm user compromised, which sets risk to high, triggers policies and improves detection."
   ],
   [
    "MFA fatigue is a user training problem only.",
    "Training helps, but the control fix is number matching, additional context in notifications and phishing-resistant methods such as passkeys or FIDO2 security keys."
   ]
  ],
  "tryit": [
   [
    "ID Protection flags a sign-in from an unfamiliar location for Marco, a sales manager. You call Marco and he confirms he is at a trade show in that city this week, signing in from the hotel network with his own laptop. The sign-in passed MFA. What do you do with the risky sign-in?",
    "Choose Confirm sign-in safe. It was a legitimate sign-in, and telling the system so clears the risk and helps the model. Confirming compromised would trigger needless remediation, and simply ignoring it leaves the risk in place."
   ],
   [
    "A user's account shows high user risk from leaked credentials. The user changed their password yesterday through an ordinary self-service reset that happened outside the risk-based policy flow, and you find no suspicious sign-ins since. The risk is still shown as high. What is appropriate?",
    "Investigate the sign-in history first. If nothing suspicious appears and the password is new, dismissing user risk is appropriate, since remediation already happened outside the automatic flow. If you find attacker activity, confirm the user compromised, revoke sessions and continue the investigation."
   ]
  ],
  "tip": "Password reset plus revoke sessions is the usual correct answer for token theft. Confirm compromised raises risk to high and trains the model; dismiss only clears risk.",
  "check": [
   [
    "Why revoke sessions after resetting a compromised user's password?",
    "Existing refresh tokens and session cookies may still be valid; revoking forces re-authentication."
   ],
   [
    "What does Confirm user compromised do?",
    "It sets user risk to high, triggers risk-based policies and feeds back to the detection model."
   ],
   [
    "What control most directly defeats MFA fatigue?",
    "Number matching in the authenticator push, along with moving users to phishing-resistant MFA."
   ],
   [
    "Is a leaked credentials detection sign-in risk or user risk?",
    "User risk, because it indicates the account itself is likely compromised rather than one specific sign-in."
   ]
  ]
 },
 {
  "t": "Defender for Cloud Apps: impossible travel and other anomaly alerts, OAuth app risk and revoking app consent",
  "hook": "On Tuesday afternoon, Aisha at Summit Ridge Engineering opens Defender for Cloud Apps and sees two alerts for the same project manager, Tom: an impossible travel alert showing sign-ins from two continents forty minutes apart, and a new app named Doc Viewer Pro that he granted access to his mailbox yesterday. Tom insists he has not left the office and has already changed his password. Half the impossible travel alerts last month were caused by the company VPN. Is this another false alarm, or does Doc Viewer Pro still have the keys to Tom's mail even after his password changed?",
  "simple": "Defender for Cloud Apps watches how people use online services like Microsoft 365 and learns what is normal for each person. If someone suddenly signs in from two countries an hour apart, downloads thousands of files, or sets up email forwarding to an outside address, it raises an alert. It also watches apps that people have given permission to read their data. That permission, called OAuth consent, is like giving a valet your car key: the valet does not need your house key, and changing your house locks does nothing about the car key. Attackers trick people into handing over that kind of permission. To fix it, you take the key back by banning the app or revoking its consent.",
  "body": [
   "Microsoft Defender for Cloud Apps is Microsoft's cloud access security broker (CASB). It connects to cloud services such as Microsoft 365 and other software-as-a-service (SaaS) apps through application programming interfaces (APIs), known as app connectors, discovers shadow IT from network logs, and applies policies to user activity. For the security operations center (SOC), its most important outputs are anomaly detection alerts and visibility into OAuth apps, both of which feed Defender XDR (extended detection and response) incidents.",
   "Anomaly detection policies are built in and turned on by default. They learn each user's normal behavior over an initial learning period, then alert on deviations. Impossible travel fires when the same user signs in from two locations so far apart that nobody could travel between them in the time elapsed, which suggests a stolen credential used from another country. It has known sources of false positives, such as virtual private networks (VPNs) and corporate proxies, so the policy's sensitivity can be tuned and known Internet Protocol (IP) address ranges can be tagged as corporate or VPN under the IP address range settings. Other anomaly alerts include activity from infrequent country, activity from anonymous IP addresses, activity from suspicious IP addresses, mass download, mass deletion, ransomware activity (many file uploads with unusual extensions), unusual file sharing, and suspicious inbox manipulation rules such as forwarding mail to an outside address or moving messages to hidden folders.",
   "Investigating means checking the user's activity log, sign-in details, IP address reputation, and what happened after the anomaly: new inbox rules, downloads, sharing links or app consents. In advanced hunting, the CloudAppEvents table holds this activity. Response options include suspending the user, requiring the user to sign in again, and confirming the user compromised in Microsoft Entra ID Protection. Policies you create yourself, such as activity policies and OAuth app policies, complement the built-in anomaly detections.",
   "OAuth is the protocol that lets an app access data on a user's behalf after the user (or an admin) grants consent. Attackers exploit this with consent phishing: they send a link that asks the user to grant a malicious app permissions such as reading mail or files. No password is stolen, so password resets do not remove the access; the app holds its own tokens. Defender for Cloud Apps, together with app governance, shows OAuth apps with their permission level, publisher, how many users consented and how common the app is in other organizations. Apps with high privileges, unverified publishers and few users are suspicious.",
   "When you review an OAuth app, a few fields carry most of the signal. The permission level summarizes how powerful the requested permissions are, from low to high, and a high level usually means the app can read or change mail, files or directory data. The publisher shows whether the app comes from a verified publisher. The number of users who consented, and community use, which shows how common the app is across other organizations, help you separate a widely used business tool from a rare app that appeared last week. An unfamiliar app with a high permission level, an unverified publisher, rare community use and a name that imitates a well-known product deserves immediate attention, even if only one person consented, because a single mailbox with read access can expose an executive's entire email history.",
   "To respond, you can ban the app in Defender for Cloud Apps (Cloud apps, OAuth apps), which revokes its permissions and prevents future consent, or revoke the consent and delete the service principal or enterprise application in Microsoft Entra ID. Also review what the app accessed using audit logs. To prevent recurrence, restrict user consent in Entra ID so users can only consent to apps from verified publishers requesting low-risk permissions, and use the admin consent workflow for everything else. A quick hunt for consent events looks like this:",
   "```kusto\nCloudAppEvents\n| where ActionType == \"Consent to application.\"\n| project Timestamp, AccountDisplayName, IPAddress, RawEventData\n```",
   "Consider a worked example. Defender for Cloud Apps shows that 12 users consented to an unverified app requesting full mailbox access, and one of them also has a suspicious inbox forwarding rule. The analyst bans the app, which revokes its permissions for all 12 users, removes the enterprise application in Entra ID, deletes the forwarding rule, and searches the audit log for what the app read. Finally she changes the tenant's user consent settings to verified publishers only.",
   "Common mistakes: resetting passwords and assuming the app is gone; closing every impossible travel alert as a VPN false positive without tagging the VPN ranges, so the noise never ends; ignoring apps with broad permissions because only one user consented; and forgetting to check what data the app already took.",
   "Exam questions tie clues to responses. 'Two sign-ins from distant countries minutes apart' means impossible travel. 'Alerts caused by our VPN' means tagging IP ranges or tuning the policy. 'Mail forwarded to an external address' means suspicious inbox manipulation rule. 'User granted a malicious app access to mail' means consent phishing. 'Remove the app's access for everyone and prevent new consent' means ban the app. 'Stop users consenting to risky apps' means restrict user consent and use the admin consent workflow."
  ],
  "analogy": "OAuth consent is like giving a cleaning company a spare key to your office. Changing your own password is changing your personal locker combination; the cleaning company's key still opens the office. To remove their access, you take back the spare key (revoke consent or ban the app) and, to prevent repeats, set a rule that only approved, vetted companies get keys (restrict user consent and use the admin consent workflow). The analogy stops at scale: one ban in Defender for Cloud Apps takes the key back from every user who consented, all at once.",
  "terms": [
   [
    "Cloud access security broker (CASB)",
    "A service that gives visibility and control over the use of cloud apps; Defender for Cloud Apps is Microsoft's."
   ],
   [
    "Impossible travel",
    "An anomaly alert for sign-ins from distant locations within a time that makes physical travel impossible."
   ],
   [
    "OAuth app consent",
    "Permission a user or admin grants an app to access data on their behalf."
   ],
   [
    "Consent phishing",
    "Tricking users into granting a malicious app OAuth permissions, bypassing password controls."
   ],
   [
    "Ban app",
    "A Defender for Cloud Apps action that revokes an OAuth app's permissions and blocks new consent."
   ],
   [
    "Admin consent workflow",
    "An Entra ID feature that lets users request admin approval for apps they are not allowed to consent to."
   ],
   [
    "Anomaly detection policy",
    "A built-in Defender for Cloud Apps policy that learns normal user behavior and alerts on deviations such as impossible travel or mass download."
   ]
  ],
  "example": "Defender for Cloud Apps shows that 12 users consented to an unverified app requesting full mailbox access, and one of them has a suspicious inbox forwarding rule. The analyst bans the app, removes the enterprise application in Entra ID, deletes the forwarding rule, and changes the tenant's user consent settings to verified publishers only.",
  "mistakes": [
   [
    "Resetting the user's password removes a malicious OAuth app's access.",
    "The app holds its own consented tokens. Revoke consent or ban the app, then review what it accessed."
   ],
   [
    "Impossible travel alerts caused by the VPN should simply be closed each time.",
    "Tag the VPN and corporate IP ranges in the IP address range settings and tune the policy's sensitivity, so the noise stops without disabling the detection."
   ],
   [
    "An app only one user consented to is low risk.",
    "A single consent to an app with high permissions, an unverified publisher and rare community use can expose a whole mailbox. Judge by permissions and publisher, not just user count."
   ],
   [
    "Banning the app is the end of the response.",
    "Also check what data the app accessed in audit logs, remove any inbox rules or other changes linked to it, and restrict user consent to prevent recurrence."
   ]
  ],
  "tryit": [
   [
    "Every weekday, Defender for Cloud Apps raises impossible travel alerts for your sales team. Investigation shows the second sign-in each time comes from your company's VPN gateway, which egresses in another region. The team lead wants the policy turned off. What do you recommend?",
    "Do not disable the anomaly policy. Add the VPN gateway's IP range under IP address range settings, tagged as VPN or corporate, and tune the impossible travel sensitivity if needed. That removes the known false positives while keeping detection for real credential theft."
   ],
   [
    "You find an OAuth app with high permissions to read all mail, an unverified publisher and consents from 15 users across finance. Which action removes its access for all of them and blocks new consents, and what else do you change in the tenant?",
    "Ban the app in Defender for Cloud Apps, which revokes its permissions for all users and prevents future consent, or revoke consent and delete the enterprise application in Microsoft Entra ID. Then restrict user consent to verified publishers and low-risk permissions and require the admin consent workflow for everything else."
   ]
  ],
  "tip": "Resetting a password does not remove a malicious OAuth grant. The answer is to revoke consent or ban the app, then restrict user consent.",
  "check": [
   [
    "What is a common false-positive cause for impossible travel?",
    "VPNs or corporate proxies that make sign-ins appear from distant locations; tag those IP ranges to reduce noise."
   ],
   [
    "Why doesn't a password reset stop a malicious OAuth app?",
    "The app holds its own consented tokens, which remain valid until consent is revoked."
   ],
   [
    "How can you reduce future consent phishing?",
    "Restrict user consent to verified publishers and low-risk permissions and require admin consent for others."
   ],
   [
    "Which advanced hunting table holds Defender for Cloud Apps activity such as consents and inbox rule changes?",
    "CloudAppEvents."
   ]
  ]
 },
 {
  "t": "Microsoft Purview: DLP and insider risk alerts in the Defender portal; Purview Audit (unified audit log) searches",
  "hook": "Two weeks after Carlos, a senior account manager at Bluewater Outfitters, hands in his resignation, the SOC sees two alerts within an hour: an insider risk alert showing an alias, User 4471, with unusually large SharePoint downloads, and a DLP alert for a customer list uploaded to a personal cloud drive. Your analyst, Grace, can see that a policy matched but cannot see the file contents or the real name behind the alias. HR and legal are asking what exactly left the company and when. Who is allowed to see what, and where does the definitive record of who did what live?",
  "simple": "Microsoft Purview is a set of tools for protecting company data. Data loss prevention (DLP) is a rule-checker that notices when sensitive information, like credit card numbers or files marked confidential, is being sent or uploaded somewhere it should not go. Insider risk management watches for risky behavior by people inside the company, such as an employee who is leaving and suddenly downloads lots of files; it hides their name behind a nickname until someone authorized needs to know. Purview Audit is the company's security camera recording for Microsoft 365: it records who opened, shared, changed or deleted things, and when. When you need proof of exactly what happened, you search that recording.",
  "body": [
   "Microsoft Purview is Microsoft's data security and compliance family. Two of its products produce alerts that security operations center (SOC) analysts handle in the Defender portal, and one of its tools, Audit, is a key source of evidence in almost every Microsoft 365 investigation. Knowing where each alert comes from and who is allowed to see its contents matters, because these alerts often involve sensitive data and people inside the organization.",
   "Data loss prevention (DLP) policies detect sensitive information, such as credit card numbers or files with a sensitivity label, being shared, emailed, uploaded or copied in ways the policy forbids. They can apply to Exchange, SharePoint, OneDrive, Teams, endpoints and more. When a policy match generates an alert, the alert appears on the Purview DLP alerts page and also in the Defender XDR (extended detection and response) incident queue, where it can be correlated with other alerts. For example, a DLP alert for mass upload of customer data can join an incident with an impossible travel alert for the same user. Analysts need the right Purview roles to view DLP alert content, because it may contain the sensitive data itself.",
   "Insider risk management detects risky activity by users inside the organization, such as a departing employee downloading large amounts of data or a user exfiltrating to personal cloud storage. It uses policy templates (for example data theft by departing users) and indicators, and it can use human resources (HR) connector data such as resignation dates. Because insider cases are sensitive, user names are pseudonymized by default so investigators see an alias until authorized to reveal identity. Insider risk alerts can be shown in the Defender portal and correlated into incidents, and cases are managed with human resources and legal involvement.",
   "When you open a DLP alert in the Defender portal, the details show which policy and rule matched, the sensitive information types or labels detected, the user, the location such as a SharePoint site, an email or an endpoint, and the action the policy took, such as blocking the share or allowing it with a user justification. That context is what separates an honest mistake from a pattern. One user emailing a single spreadsheet with a few account numbers to a partner is different from the same user uploading hundreds of labeled files to a personal storage site at midnight after giving notice. Insider risk alerts add a sequence view of risky activity over time and a risk score, so investigators can see whether activity escalated. Whatever the alert, the unified audit log is where you confirm exactly what happened and when.",
   "Purview Audit records user and admin activity across Microsoft 365 in the unified audit log: file access and sharing, mailbox actions, Entra ID changes, Teams events, admin configuration changes and more. Auditing is on by default for most organizations. Audit (Standard) keeps records for a standard retention period; Audit (Premium) adds longer retention, custom audit log retention policies and extra high-value events. MailItemsAccessed, which shows which mail items were read and matters in email compromise investigations, was once Premium-only but is now available with Audit (Standard) as well.",
   "You search the audit log in the Purview portal's Audit page by date range, activities, users, record types and workloads, then export the results. Searches run as jobs and can take some time to complete, so start them early in an investigation. Filter tightly by user, activity and date, because a broad search can return far more records than you can review, and note the record type so you know which workload produced each event. Administrators and scripts can also use Exchange Online PowerShell. Sentinel and Defender XDR receive much of this data through the Microsoft 365 connectors (the OfficeActivity and CloudAppEvents tables), but the unified audit log remains the broad, authoritative source.",
   "```powershell\nSearch-UnifiedAuditLog -StartDate 2026-09-01 -EndDate 2026-09-08 -UserIds user@contoso.com -Operations New-InboxRule,Set-InboxRule\n```",
   "Consider a worked example. A salesperson gives notice, and a week later an insider risk alert shows large downloads from SharePoint alongside a DLP alert for customer lists uploaded to a personal cloud drive. The analyst sees both correlated into one Defender incident, runs an audit log search on the user's FileDownloaded and FileUploaded events, exports the results, and hands the evidence to HR and legal under the insider risk case.",
   "Common mistakes: expecting every SOC analyst to see DLP content or real insider names without the right Purview roles; forgetting that audit searches take time; assuming audit data is kept forever (retention depends on licensing and policies); and searching mail activity without MailItemsAccessed, so you cannot say which messages an attacker read. Another trap is treating every DLP alert as proof of malice: many matches are honest mistakes, such as a user emailing a spreadsheet to a partner, and the right response may be education and a policy tip rather than an escalation.",
   "Exam questions separate the three tools. 'Sensitive data shared or uploaded against policy' means DLP. 'Departing employee taking data' or 'pseudonymized user' means insider risk management. 'Who did what, when' in Microsoft 365, such as who created an inbox rule or shared a file externally, means a Purview Audit search. 'Which emails did the attacker read' means the MailItemsAccessed event. 'Longer retention and extra events' means Audit (Premium). 'See DLP alerts next to other security alerts' means the Defender portal incident queue."
  ],
  "analogy": "Picture a museum. DLP is the guard at the exit who stops anyone carrying an item tagged as a valuable artwork. Insider risk management is the analyst who notices that a staff member who just resigned has been visiting the vault every night, and who refers to them by badge number until management approves revealing the name. Purview Audit is the camera footage covering every room, which you review to prove who did what and when. The analogy stops at retention: unlike unlimited footage, audit records are kept for a period that depends on licensing and retention policies.",
  "terms": [
   [
    "Data loss prevention (DLP)",
    "Purview policies that detect and control sharing of sensitive information across services and endpoints."
   ],
   [
    "Insider risk management",
    "Purview capability that detects risky user activity such as data theft by departing employees."
   ],
   [
    "Pseudonymization",
    "Showing an alias instead of a user's real name in insider risk alerts until identity reveal is authorized."
   ],
   [
    "Unified audit log",
    "Purview Audit's record of user and admin activities across Microsoft 365 services."
   ],
   [
    "Audit (Premium)",
    "The Purview Audit tier that adds longer retention, custom retention policies and extra high-value events."
   ],
   [
    "MailItemsAccessed",
    "A mailbox audit event, now available in Audit (Standard) as well as Premium, that shows which mailbox items were accessed."
   ]
  ],
  "example": "A salesperson gives notice, and a week later an insider risk alert shows large downloads from SharePoint alongside a DLP alert for customer lists uploaded to a personal cloud drive. The analyst sees both correlated into one Defender incident, runs an audit log search on the user's FileDownloaded and FileUploaded events, and hands the evidence to HR and legal under the insider risk case.",
  "mistakes": [
   [
    "Every SOC analyst can see DLP alert contents and insider risk names.",
    "Viewing DLP content and revealing pseudonymized insider identities requires the appropriate Purview roles, because the alerts may include sensitive data and personal information."
   ],
   [
    "Audit records are kept forever.",
    "Retention depends on licensing and audit retention policies; Audit (Premium) adds longer retention and custom retention policies."
   ],
   [
    "Audit searches return results instantly, so you can start them whenever.",
    "Audit searches run as jobs and can take time, so start them early in an investigation and filter tightly."
   ],
   [
    "Every DLP alert means someone is stealing data.",
    "Many matches are honest mistakes. Context such as volume, destination, timing and the user's situation decides whether education, a policy tip or escalation is the right response."
   ]
  ],
  "tryit": [
   [
    "After a business email compromise, legal asks exactly which messages the attacker read in the chief financial officer's mailbox during a three-day window. Sign-in logs show the attacker's IP address and session times. Where do you get the answer?",
    "Run a Purview Audit search on the chief financial officer's mailbox for the MailItemsAccessed event over those three days, filtered or correlated by the attacker's IP address and session. MailItemsAccessed records which mail items were accessed, which is what legal needs. Sign-in logs alone show that the attacker got in, not what they read."
   ],
   [
    "A DLP alert shows a user emailed one spreadsheet containing a handful of customer account numbers to a partner company the user works with every day. The policy allowed the email with a business justification. There are no other alerts for this user. How should the SOC respond?",
    "Treat it as a likely honest mistake rather than theft: confirm the context with the user's manager if needed, resolve the alert with notes, and recommend education or a policy tip. Escalating to an insider risk case would be disproportionate without other indicators."
   ]
  ],
  "tip": "Questions asking 'who did what, when' in Microsoft 365 point to a Purview Audit search. 'Which emails did the attacker read' points to the MailItemsAccessed audit event.",
  "check": [
   [
    "Why are users pseudonymized in insider risk alerts?",
    "To protect privacy until an authorized investigator needs to reveal identity."
   ],
   [
    "How do you find who created a malicious inbox rule?",
    "Search the unified audit log in Purview Audit (or with Search-UnifiedAuditLog) for inbox rule activities for that mailbox."
   ],
   [
    "Where can a SOC analyst see DLP alerts next to other security alerts?",
    "In the Defender portal incident queue, where DLP alerts are correlated into incidents."
   ],
   [
    "What does Audit (Premium) add over Audit (Standard)?",
    "Longer retention, custom audit log retention policies and additional high-value events."
   ]
  ]
 },
 {
  "t": "Defender for Cloud security alerts: alert details, the Take action tab, triggering automation",
  "hook": "It is Friday evening at Copperline Analytics, and Nadia gets a Defender for Cloud alert: a storage account holding customer reports was accessed from a Tor exit node. The storage owner is on a flight. Nadia opens the alert and sees a tab called Take action with five sections. One promises recommendations, one offers a Logic App, one offers to make similar alerts go away. Her manager also wants to know why this keeps landing on Nadia instead of automatically reaching the storage team. Which part of the alert does she need right now, and what should run on its own next time?",
  "simple": "Defender for Cloud watches cloud resources like virtual machines, storage and databases. When it spots something suspicious, such as someone reading files from an unusual internet address, it raises a security alert. Each alert has a Take action tab, which is like the instruction card on a fire extinguisher: look around to see what is going on, put out this fire, stop the next fire, call for automatic help, or silence the alarm if it is a known drill. If you want something to happen automatically every time a certain kind of alert appears, like emailing the owner, you set up workflow automation, which runs a Logic App, a small automated workflow, each time.",
  "body": [
   "When a Microsoft Defender for Cloud workload plan detects a threat, such as suspicious process execution on a virtual machine (VM), access to a storage account from a suspicious Internet Protocol (IP) address, a Structured Query Language (SQL) injection attempt or a suspicious Azure Resource Manager operation, it raises a security alert. Alerts appear on Defender for Cloud's Security alerts page and, through the integration with Defender XDR (extended detection and response), in the Defender portal incident queue. They can also flow to Microsoft Sentinel through its Defender for Cloud connector. Remember that alerts come only from paid workload plans, not from posture management.",
   "Each alert has a severity (high, medium, low or informational), a status (active, in progress, resolved or dismissed), the affected resource, the MITRE ATT&CK tactics, the time, and a description. The alert details tab explains what was detected and shows related entities: the host, account, process command line, IP address, file or storage blob. Where alerts are linked, Defender for Cloud may group them as a security incident, and in the Defender portal they are correlated with endpoint, identity and email alerts.",
   "The Take action tab is the exam's favorite part. It is split into sections. Inspect resource context opens the resource's logs and activity around the time of the alert. Mitigate the threat gives manual remediation steps for this specific alert. Prevent future attacks lists security recommendations for the resource that would reduce the chance of recurrence, such as enabling endpoint protection or restricting network access. Trigger automated response lets you run a Logic App on this alert right now. Suppress similar alerts creates a suppression rule for alerts that are expected in your environment, with conditions and an expiration date.",
   "For automation at scale, Defender for Cloud has workflow automation (under Management, Workflow automation). You create a workflow automation that runs a Logic App when an alert, recommendation or regulatory compliance change matches conditions you set, such as alert severity or name, within a chosen scope. Typical uses are opening a ticket, emailing a resource owner, or isolating a VM. The Logic App needs a Defender for Cloud trigger (when an alert or recommendation is created or triggered). Alternatively, you continuously export alerts to Azure Event Hubs or a Log Analytics workspace and act on them from there, or let Sentinel automation handle them.",
   "Before you rely on automation, test it. The Security alerts page can create sample alerts for the Defender plans enabled on a subscription, which lets you confirm that a workflow automation fires, that the Logic App receives the alert fields it expects, and that the email or ticket arrives where it should, all without waiting for a real attack. When you build the automation, scope it carefully: the workflow automation belongs to a resource group and applies to the subscriptions and conditions you choose, so an automation meant for production storage alerts should not quietly fire for every low-severity alert in a test subscription. Logic Apps that change resources, such as isolating a VM by updating its network security group, need permissions on those resources, usually granted to the Logic App's managed identity.",
   "Alert suppression rules in Defender for Cloud work like alert tuning in Defender XDR: they hide or auto-dismiss alerts that match conditions, and they should be narrow and time-limited. Dismissing an alert changes its status only; it does not fix the underlying problem. A good workflow is to read the alert details, inspect resource context, follow the mitigation steps, apply the prevention recommendations, and set the status to resolved with notes. If the alert was an authorized test, suppress narrowly rather than disabling the plan.",
   "Consider a worked example. Defender for Storage alerts on access to a storage account from a Tor exit node. The analyst reads the alert details, which list the blob container and the operations performed, then opens Take action. Inspect resource context shows the storage logs around the time, confirming several blobs were read using a shared access signature. She follows Mitigate the threat to rotate the account keys and revoke the signature, and under Prevent future attacks applies the recommendation to disable public network access. She then builds a workflow automation that runs a Logic App to email the storage owners for all high-severity storage alerts.",
   "Common mistakes: dismissing an alert and considering the job done; creating a broad suppression rule with no expiration that hides real attacks for months; using Trigger automated response when the requirement is to run automatically every time (that is workflow automation); disabling a whole Defender plan to stop noise from one test; and expecting foundational cloud security posture management (CSPM) to raise these alerts. Another trap is forgetting that the Logic App needs permissions on the resources it changes, usually through a managed identity.",
   "Exam questions usually point to one Take action section or one automation feature. 'Recommendations to stop this recurring' means Prevent future attacks. 'Remediation steps for this alert' means Mitigate the threat. 'Look at logs around the alert time' means Inspect resource context. 'Run a Logic App on this one alert now' means Trigger automated response. 'Run it automatically for every matching alert' means workflow automation. 'Stream alerts to Event Hubs or a workspace' means continuous export. 'Expected alert from a scanner' means a suppression rule."
  ],
  "analogy": "Think of a car's dashboard warning light and the manual next to it. Inspect resource context is opening the hood to look around at the time the light came on. Mitigate the threat is the fix for this warning. Prevent future attacks is the maintenance schedule that stops it recurring. Trigger automated response is calling roadside assistance once, right now. Workflow automation is a service plan that calls them every time that light comes on. Suppression is taping over a light you know is faulty, which is fine only if you remember to remove the tape.",
  "mnemonic": "Take action sections in order: I Might Prevent The Spread. Inspect resource context, Mitigate the threat, Prevent future attacks, Trigger automated response, Suppress similar alerts.",
  "terms": [
   [
    "Security alert",
    "A Defender for Cloud detection of a threat against a protected workload, raised by a paid Defender plan."
   ],
   [
    "Take action tab",
    "The alert tab with sections to inspect context, mitigate, prevent recurrence, trigger automation and suppress similar alerts."
   ],
   [
    "Workflow automation",
    "A Defender for Cloud feature that runs a Logic App automatically when alerts or recommendations match conditions."
   ],
   [
    "Suppression rule",
    "A rule that hides or dismisses expected alerts matching conditions, with an optional expiration."
   ],
   [
    "Continuous export",
    "Streaming Defender for Cloud alerts and recommendations to Event Hubs or a Log Analytics workspace."
   ],
   [
    "Dismiss",
    "An alert status change that hides the alert without remediating anything."
   ],
   [
    "Sample alerts",
    "Test alerts generated from the Security alerts page to verify automation and integrations without a real attack."
   ]
  ],
  "example": "Defender for Storage alerts on access to a storage account from a Tor exit node. The analyst opens Take action, inspects the storage logs around the time, follows the mitigation to regenerate the account keys, and under Prevent future attacks applies the recommendation to disable public network access. She then builds a workflow automation that emails the storage owners for all high-severity storage alerts.",
  "mistakes": [
   [
    "Dismissing an alert resolves the threat.",
    "Dismiss only changes the status. You still inspect, mitigate, apply prevention recommendations and resolve with notes."
   ],
   [
    "Trigger automated response runs a Logic App for every future matching alert.",
    "Trigger automated response runs a Logic App on one alert now. Running it automatically for every matching alert is workflow automation."
   ],
   [
    "Turn off the Defender plan to stop noisy alerts from an authorized test or scanner.",
    "Create a narrow, time-limited suppression rule instead, keeping protection for real threats."
   ],
   [
    "Foundational posture management raises threat alerts.",
    "Security alerts come from the paid Defender workload plans, not from foundational CSPM."
   ]
  ],
  "tryit": [
   [
    "The vulnerability management team runs an authorized scanner against a set of VMs every Wednesday, and each run raises the same medium-severity alerts. Analysts close them by hand every week. The team lead suggests disabling Defender for Servers on those VMs. What do you propose instead?",
    "Create a suppression rule from the Take action tab that matches the specific alert name, the scanner's source and the affected resources, with an expiration date to review it. That removes the expected noise without losing threat detection on the VMs, which disabling the plan would do."
   ],
   [
    "Your security lead wants the database team emailed automatically whenever Defender for SQL raises a high-severity alert in production, and wants the alerts also sent to a third-party SIEM through Event Hubs. Which two features do you configure?",
    "A workflow automation scoped to the production subscriptions with conditions for high severity and the SQL alert types, running a Logic App that sends the email, and continuous export of security alerts to an Event Hubs namespace for the SIEM. Trigger automated response would only work alert by alert."
   ]
  ],
  "tip": "Run a Logic App on one alert now: Trigger automated response on the Take action tab. Run it every time automatically: workflow automation. Stop expected alerts: suppression rule.",
  "check": [
   [
    "Which Take action section lists recommendations to stop the alert recurring?",
    "Prevent future attacks."
   ],
   [
    "How do you automatically run a Logic App for every high-severity Defender for Cloud alert?",
    "Create a workflow automation with a severity condition that triggers the Logic App."
   ],
   [
    "Does dismissing an alert remediate the threat?",
    "No. It only changes the status; you must still mitigate and fix the underlying issue."
   ],
   [
    "How do you send all Defender for Cloud alerts to Event Hubs for a third-party SIEM?",
    "Configure continuous export of security alerts to an Event Hubs namespace."
   ]
  ]
 },
 {
  "t": "Sentinel incidents: investigation graph, entity pages and UEBA insights, running playbooks on demand, incident tasks, closing with the right classification",
  "hook": "On Wednesday morning, Leo at Granite Peak Credit Union picks up a Sentinel incident: the service account svc-backup logged on interactively to ten servers overnight. The backup team says the account only runs scheduled jobs. Leo opens the investigation graph and sees the account and the servers, but no external IP address and no other alerts. He wants to disable the account, but the Run playbook list is empty for him. And if this turns out to be the red team's approved exercise, he is not sure which closing label is right. How does he widen the picture, act quickly and close the incident correctly?",
  "simple": "A Sentinel incident is a case built from alerts, and it lists the things involved, called entities: user accounts, computers, internet addresses and files. The investigation graph draws these as a map with lines between them, and you can click on any item to pull in related things, like following threads on a corkboard. Each entity has its own page that shows its history and whether its behavior is unusual compared with its own past and with similar people, which is what UEBA (user and entity behavior analytics) does. Playbooks are automated workflows you can run from the incident, an entity or an alert, for example to disable an account. When you finish, you choose a closing label that says whether the activity was real, expected or a mistake.",
  "body": [
   "A Microsoft Sentinel incident groups alerts from analytics rules together with their mapped entities. In the Azure portal you work incidents from the Incidents page; in the Defender portal, Sentinel incidents appear in the same unified queue as Defender XDR (extended detection and response) incidents. The steps are the same idea in both: assign, investigate, respond, document and close. The incident page shows a summary, the alerts, the entities, a timeline of alerts and bookmarks, similar incidents, and top insights from user and entity behavior analytics (UEBA). Comments and the activity log keep a record of everything done, and you can change severity, status and owner, and add tags.",
   "The investigation graph (in the Azure portal experience) is a visual map of the incident's entities: accounts, hosts, Internet Protocol (IP) addresses, uniform resource locators (URLs), files and alerts. From any entity you can run exploration queries, such as related alerts or processes on this host, that add new nodes to the graph. The timeline shows the order of events. This is how you expand scope and find other affected assets. In the Defender portal, the incident graph and attack story serve the same purpose. The investigation graph only works well when analytics rules map entities; unmapped data does not appear at all.",
   "Entity pages show everything Sentinel knows about one entity: a timeline of alerts and activities, related entities, and UEBA insights. Insights include whether the user's activity is unusual compared to their own history or their peers, first-time actions, and sign-in patterns. If UEBA is enabled, the BehaviorAnalytics table scores each activity with an investigation priority, which helps you decide what to look at first. You can query it directly:",
   "```kusto\nBehaviorAnalytics\n| where UserPrincipalName == \"svc-backup@contoso.com\"\n| where InvestigationPriority > 5\n| project TimeGenerated, ActivityType, ActionType, ActivityInsights\n```",
   "UEBA has to be turned on in Sentinel and pointed at data sources, such as Microsoft Entra ID sign-in and audit logs and Windows security events, before entity pages and the BehaviorAnalytics table fill with insights. It then builds a baseline for each user and for their peer group, so it can say not only that an activity is new for this user, but also that nobody in their department does it. That peer comparison is what turns a raw event, such as a service account signing in interactively, into a clear signal. Entity pages are not only reachable from incidents: you can open them from hunting results, from bookmarks and from the entity search, which makes them a natural place to begin when a colleague asks whether a particular account or host has done anything strange lately.",
   "You can run playbooks on demand. On the incident, choose Run playbook to launch any incident-trigger playbook, for example to enrich all IPs or to post the incident to a ticketing system. From an entity, you can run entity-trigger playbooks, such as disabling a user or blocking an IP on the firewall. From an alert, you can run alert-trigger playbooks. The analyst needs the Microsoft Sentinel Playbook Operator role, and Sentinel needs Automation Contributor on the playbook's resource group. Incident tasks show the checklist added by automation rules or playbooks, or you can add tasks manually; mark each complete as you go so others see progress. Close the incident with the right classification: true positive (suspicious activity), benign positive (suspicious but expected), false positive (incorrect alert logic or incorrect data) or undetermined, plus a comment.",
   "Consider a worked example. A Sentinel incident flags a service account logging on interactively to ten servers. The analyst assigns it to herself and opens the account's entity page, where UEBA shows this is the first time the account has logged on interactively and that its peers never do. In the investigation graph she runs the related alerts exploration on the account and finds a password spray alert from the same external IP address the day before. She runs an entity-trigger playbook to disable the account in Microsoft Entra ID, works through the incident tasks added by automation (reset credentials, check for new scheduled tasks, review firewall logs), and closes the incident as a true positive with a comment.",
   "Common mistakes: expecting hosts or IPs in the investigation graph when the analytics rule never mapped them; running a playbook and finding it missing from the list because Sentinel lacks Automation Contributor or the analyst lacks Playbook Operator; ignoring UEBA insights, which are often the fastest way to separate normal from abnormal; closing an authorized red-team test as false positive, which hides a working detection; and closing without a comment, which leaves nothing for tuning or reporting.",
   "Exam questions tend to test the fix or the right label. 'Graph shows no hosts' means add Host entity mapping to the rule. 'Disable one user from its page' means an entity-trigger playbook run on demand. 'Run a playbook for this whole incident now' means Run playbook with an incident trigger. 'Analyst can run but not edit playbooks' means Playbook Operator. 'Is this unusual for this user or their peers' means UEBA insights on the entity page. 'Correct detection of an approved test' means benign positive; 'rule logic or data was wrong' means false positive."
  ],
  "analogy": "The investigation graph is a detective's corkboard with photos connected by string. Each exploration query is asking a records clerk for everything linked to one photo, and new photos and strings appear. An entity page is the full file on one suspect, including notes on whether their behavior is normal for them and for people like them. The analogy stops at missing photos: if the analytics rule never mapped an entity, Sentinel cannot pin it to the board at all, no matter how hard you look.",
  "terms": [
   [
    "Investigation graph",
    "A visual map of an incident's entities where exploration queries add related entities and alerts."
   ],
   [
    "Entity page",
    "A page that shows an entity's alerts, activity timeline, related entities and UEBA insights."
   ],
   [
    "Investigation priority",
    "A UEBA score in BehaviorAnalytics that ranks how unusual an activity is, to guide triage."
   ],
   [
    "Playbook Operator",
    "A Sentinel role that allows listing and running playbooks manually."
   ],
   [
    "Benign positive",
    "A Sentinel classification for activity that was correctly detected but expected, such as an approved test."
   ],
   [
    "Incident task",
    "A checklist item in an incident, added manually or by automation, that tracks investigation steps."
   ],
   [
    "UEBA",
    "User and entity behavior analytics, which baselines users and entities against their own history and peers to highlight unusual activity."
   ]
  ],
  "example": "A Sentinel incident flags a service account logging on interactively to ten servers. The analyst opens the account's entity page, where UEBA shows this is the first time the account has done so. In the investigation graph she explores 'related alerts' and finds a password spray alert from the same IP. She runs a playbook to disable the account, completes the incident tasks and closes it as a true positive.",
  "mistakes": [
   [
    "Missing hosts in the investigation graph mean the attacker did not touch any hosts.",
    "The graph shows only mapped entities. If the analytics rule did not map Host entities, add entity mapping to the rule."
   ],
   [
    "Any analyst with Sentinel access can see and run every playbook.",
    "The analyst needs the Microsoft Sentinel Playbook Operator role, and Sentinel needs Automation Contributor on the playbook's resource group, or playbooks will not appear or run."
   ],
   [
    "An approved red-team test should be closed as false positive.",
    "The rule detected real activity correctly, so it is benign positive. False positive means incorrect alert logic or incorrect data."
   ],
   [
    "UEBA insights work automatically in every workspace.",
    "UEBA must be enabled and connected to data sources before entity pages and BehaviorAnalytics show insights."
   ]
  ],
  "tryit": [
   [
    "An analytics rule detects suspicious PowerShell from Windows security events. Incidents from it show the account entity, but the investigation graph never shows the computer or the remote IP, even though both appear in the raw events. Analysts keep copying names by hand. What do you change?",
    "Edit the analytics rule and add entity mapping for Host (from the computer field) and IP (from the remote address field). Once mapped, the entities appear in incidents and the investigation graph, and exploration queries and entity pages work for them. The data was there; it was simply not mapped."
   ],
   [
    "During an investigation you need to disable one compromised account right away from its entity page, and later post the whole incident to the ticketing system. Which playbook triggers do you use?",
    "Run an entity-trigger playbook on demand from the account entity to disable the user, and run an incident-trigger playbook from Run playbook on the incident to post it to the ticketing system. You need Playbook Operator, and Sentinel needs Automation Contributor on the playbooks' resource group."
   ]
  ],
  "tip": "If entities are missing from the investigation graph, the fix is entity mapping in the analytics rule. For an authorized test, close as benign positive; false positive means the rule or data was wrong.",
  "check": [
   [
    "Why might an incident's investigation graph show no hosts?",
    "The analytics rule did not map any Host entities."
   ],
   [
    "Which playbook trigger lets you disable one user from its entity page?",
    "An entity trigger playbook run on demand."
   ],
   [
    "What Sentinel classification fits a red team exercise that the rule correctly detected?",
    "Benign positive."
   ],
   [
    "Which role lets an analyst run playbooks manually without editing them?",
    "Microsoft Sentinel Playbook Operator, with Sentinel holding Automation Contributor on the playbook's resource group."
   ]
  ]
 },
 {
  "t": "Microsoft Security Copilot embedded in the Defender portal: incident summaries, guided response, script analysis",
  "hook": "It is 6:40 a.m. at Harbor Credit Union, twenty minutes before shift change, and Maya on the night shift has an incident with nine alerts, a sales laptop, a mailbox and a line of PowerShell that looks like a cat walked across the keyboard. She is not a malware specialist, and the day analyst will want a clean handoff. In the Defender portal a Copilot panel sits beside the incident, offering a summary, next steps and an explanation of that unreadable command. How much of that help can she trust, and which parts still need her own judgment before anyone isolates a laptop?",
  "simple": "Security Copilot is an AI helper built into the Microsoft Defender portal. When an analyst opens an incident, it can write a short story of what happened, suggest what to do next, and explain confusing scripts in plain words. Think of a new employee reading a messy police report: a helpful colleague says, here is what happened, here is what I would check, and this note in code means the burglar copied the keys. The colleague can be wrong, so you still check the evidence yourself. Copilot also only sees what you are allowed to see, and it uses capacity your company pays for, measured in security compute units.",
  "body": [
   "Start with what Security Copilot is and where it lives. Microsoft Security Copilot is a generative artificial intelligence (AI) assistant for security teams. Besides its standalone portal, it is embedded directly into the Microsoft Defender portal, where it appears in a side panel on incidents, alerts, devices, users and hunting pages. It runs on capacity your organization provisions, measured in security compute units (SCUs), and users need appropriate access to both Copilot and the underlying Defender data. Copilot only sees data the signed-in user is allowed to see, so it cannot be used to get around role-based access control. Its value is speed: it turns a pile of alerts and raw evidence into readable language so an analyst can decide faster. For the SC-200 exam, the embedded experience matters most, because it is where a security operations center (SOC) analyst works every day: inside the incident queue, the alert story and advanced hunting, rather than in a separate tool.",
   "Incident summaries are the most visible feature. When you open an incident, Copilot can produce a short narrative: what happened, in what order, which users, devices and mailboxes are involved, what attack stages (mapped to MITRE ATT&CK) were seen, and what has already been remediated. This saves a Tier-1 analyst the time of reading every alert and helps with handoffs between shifts. The summary is generated from the incident's current data, so after new alerts arrive you can regenerate it. A good summary reads like a short paragraph a senior analyst would write on a whiteboard: initial access through a phishing email, execution of a downloader, a connection to an external address, and the user's password already reset. That narrative is a starting point for triage, not a replacement for opening the alerts that matter.",
   "Guided response gives recommended actions for the incident, grouped into categories such as triage, containment, investigation and remediation. Examples are classifying the incident, isolating a device, resetting a user's password, soft-deleting emails or reviewing similar incidents. Many recommendations have buttons that run the action directly, with the usual permissions. The analyst still decides; guided response suggests, it does not act on its own. That makes it different from automatic attack disruption, which does act without waiting. In practice, guided response appears as a set of cards. Each card names the action and a short reason, for example that the device showed signs of a second-stage download, and you choose whether to apply it.",
   "Script analysis explains suspicious command lines and scripts, such as obfuscated PowerShell, batch files or bash, found in alert evidence. It decodes and describes what the script tries to do, for example download a file, create persistence or disable security tools, and highlights indicators such as URLs and IP addresses. File analysis similarly summarizes a suspicious file's characteristics, such as its imports, signatures and detections. These features help analysts who are not malware specialists understand evidence quickly without running anything themselves, which is safer than pasting samples into an unknown tool. What you see in the panel is a plain-language breakdown, step by step: the decoded content, the commands it calls, and the network indicators it contains. You can then copy those indicators into a hunting query or an indicator list.",
   "Other embedded capabilities include generating Kusto Query Language (KQL) queries from natural-language questions in advanced hunting, creating an incident report that documents the timeline and actions taken, and summarizing device or identity information on entity pages. Microsoft is also adding Security Copilot agents that do specific tasks under defined permissions, such as triaging user-reported phishing and explaining their verdicts. Because these capabilities change quickly, focus on what each one is for rather than on exact button names.",
   "Access and capacity deserve a closer look, because exam scenarios like to test them. Two things must be true for an analyst to use the embedded experience: the organization has provisioned Security Copilot capacity in security compute units (SCUs), and the analyst has a Copilot role plus the normal Defender permissions for the data in question. If an analyst cannot open a device page because of role-based access control (RBAC), Copilot cannot summarize that device for them either. Every prompt and every automatic summary draws on the provisioned capacity, which is why a team planning heavy use, such as summarizing every incident automatically, needs to size capacity and watch usage.",
   "Consider a worked example. A new analyst opens an incident with nine alerts and an obfuscated PowerShell command on a sales laptop. The Copilot pane summarizes the attack as a phishing email that led to a downloader, then an outbound connection. She selects the command in the evidence and runs script analysis, which decodes a base64 string and explains that it downloads a second-stage payload from a listed URL and runs it in memory. Guided response suggests isolating the device, blocking the URL and resetting the user's password. She verifies each point against the process tree and the email in Threat Explorer before taking the actions, then generates an incident report for the shift handoff.",
   "Common mistakes: trusting a summary without checking the evidence, when AI output can be wrong or incomplete; assuming guided response has already contained anything; pasting generated KQL straight into a detection rule without testing it; expecting Copilot to reveal data outside the user's permissions; and forgetting that usage consumes provisioned capacity, so heavy automated use needs planning. Treat Copilot as a capable assistant whose work you review, not as the decision maker; the analyst remains accountable for the verdict and every action.",
   "Exam questions map a need to a feature. 'Explain this obfuscated command' is script analysis. 'What should I do next' is guided response. 'Brief the next shift' or 'what happened in this incident' is the incident summary or incident report. 'Write a hunting query from a plain-language question' is natural-language to KQL. 'Analyst lacks permission to see data' means Copilot cannot see it either. 'Capacity for Copilot' refers to security compute units. If a question offers automatic attack disruption as the answer to 'suggest actions for the analyst', it is a distractor: disruption acts on its own, while guided response waits for a human."
  ],
  "analogy": "Copilot in the Defender portal is like a skilled interpreter at a hospital. The interpreter can translate a patient's words, summarize the chart and suggest questions to ask, which saves the doctor a lot of time. But the interpreter does not diagnose or operate, and can mishear a word. The doctor still examines the patient and signs every decision. The analogy stops working on access: Copilot cannot see any record the analyst is not already allowed to open.",
  "terms": [
   [
    "Security Copilot",
    "Microsoft's generative AI assistant for security operations, embedded in the Defender portal."
   ],
   [
    "Incident summary",
    "A Copilot-generated narrative of an incident's timeline, entities, attack stages and status."
   ],
   [
    "Guided response",
    "Copilot's recommended triage, containment, investigation and remediation actions for an incident."
   ],
   [
    "Script analysis",
    "A Copilot feature that decodes and explains suspicious scripts and command lines found in evidence."
   ],
   [
    "Incident report",
    "A Copilot-generated document of an incident's timeline, findings and actions taken."
   ],
   [
    "Security compute unit (SCU)",
    "The unit of capacity an organization provisions to run Security Copilot."
   ],
   [
    "Role-based access control (RBAC)",
    "Permissions assigned by role; Copilot can only use data the signed-in user is allowed to access."
   ]
  ],
  "example": "A new analyst opens an incident with nine alerts and an obfuscated PowerShell command. The Copilot pane summarizes the attack as a phishing email leading to a downloader, script analysis decodes the command as a download of a second-stage payload from a listed URL, and guided response suggests isolating the device and blocking the URL. She verifies each point in the evidence and takes the actions.",
  "mistakes": [
   [
    "Guided response has already contained the threat because it lists isolation as a recommendation.",
    "Guided response only recommends. Nothing happens until the analyst selects an action. Automatic attack disruption is the feature that acts on its own."
   ],
   [
    "Copilot can help a Tier-1 analyst see mailbox data their role does not allow.",
    "Copilot works within the signed-in user's permissions. If the analyst cannot see the data directly, Copilot cannot see it for them."
   ],
   [
    "A Copilot incident summary is accurate enough to close the incident without opening alerts.",
    "Generative AI output can be wrong or incomplete. Use the summary to orient yourself, then verify key facts in the alerts, process tree and email evidence."
   ],
   [
    "Generated KQL can go straight into a custom detection rule.",
    "Review and test generated queries first: check the tables, columns, filters and time range, and run them to inspect results."
   ]
  ],
  "tryit": [
   [
    "Devon at Pinecrest Logistics finds a long base64 string inside a scheduled task command line on a file server. He has no malware analysis background and must decide quickly whether the task is harmful. His manager suggests pasting the string into a free online decoder. Which Defender portal feature should Devon use instead, and why?",
    "Script analysis in the embedded Copilot panel. It decodes and explains the command inside the portal, highlights indicators such as URLs and IP addresses, and avoids sending evidence to an unknown outside tool. Devon should still confirm the findings against the device timeline before acting."
   ],
   [
    "At the end of a long incident, the night lead needs a document that records the timeline, the evidence and every action taken, so the day shift and the compliance team can review it. Which Copilot capability fits best?",
    "The Copilot incident report. It documents the timeline, findings and actions taken, which suits handoffs and records. The incident summary is shorter and aimed at quickly understanding the incident."
   ]
  ],
  "tip": "Map the need to the feature: 'explain this obfuscated command' is script analysis, 'what should I do next' is guided response, 'brief the next shift' is the incident summary or incident report.",
  "check": [
   [
    "Which embedded Copilot feature decodes an obfuscated PowerShell command?",
    "Script analysis."
   ],
   [
    "Does guided response take actions automatically?",
    "No. It recommends actions; the analyst chooses whether to run them."
   ],
   [
    "Can Copilot show a user data they are not permitted to see?",
    "No. It works within the signed-in user's permissions."
   ],
   [
    "Why should you verify Copilot output before acting?",
    "Generative AI can be wrong or incomplete, and the analyst remains accountable for decisions and actions."
   ],
   [
    "What does Security Copilot capacity consist of?",
    "Security compute units (SCUs) that the organization provisions; prompts and summaries consume that capacity."
   ]
  ]
 },
 {
  "t": "KQL basics: where, project, extend, summarize, count, bin, ago(), order by, take, render",
  "hook": "Your phone buzzes at 2:10 a.m. The on-call note from Ridgeway Health says only: lots of failed logons, maybe a spray, please check. You open Log Analytics and stare at a table with millions of rows and dozens of columns. Somewhere in there is the answer to three questions your manager will ask in the morning: which accounts were targeted, from where, and when did it start. You do not need a programming degree to find out. You need about ten small KQL operators, used in the right order. Which ones, and in what order?",
  "simple": "KQL is a way of asking questions of a huge log table. You start with the table name, then add steps, one per line, each joined by a pipe symbol. Each step takes the rows from the step before and does one thing: keep only some rows, keep only some columns, add a new column, count things in groups, sort, or draw a chart. It is like sorting a big pile of mail: first throw out anything older than a week, then keep only letters from the bank, then count them by day, then put the biggest days on top. KQL can only read data, never change it, so experimenting is safe.",
  "body": [
   "Begin with the shape of a query. Kusto Query Language (KQL) is the read-only query language used in Microsoft Sentinel, Azure Monitor Log Analytics and Defender XDR advanced hunting. A query starts with a table name and passes rows through a pipeline of operators separated by the pipe character. Each operator takes the rows from the previous one and returns a new set. Reading top to bottom is reading the order of processing, which makes KQL easy to build one step at a time. Because it cannot change data, you can experiment freely. For SC-200 this matters because the same language appears in Microsoft Sentinel analytics rules, workbooks, hunting queries and Microsoft Defender XDR custom detections, so time spent on the basics pays off across the whole exam.",
   "Filtering comes first, both in the query and in this lesson. `where` filters rows. Put time filters and the most selective filters first so less data flows down the pipeline. `ago()` returns a time relative to now, so `where TimeGenerated > ago(1d)` keeps the last day; units include `m`, `h` and `d`. Sentinel tables usually use `TimeGenerated`; Defender XDR advanced hunting tables use `Timestamp`. Comparison operators include `==` (case-sensitive equality), `=~` (case-insensitive equality) and `!=`, and you combine conditions with `and` and `or`. Text operators such as `has` and `startswith` are covered in the next lesson. A useful habit is to write the time filter on the second line of every query before you write anything else, so you never accidentally scan months of data.",
   "Shaping columns is the next step. `project` chooses and orders columns and can rename them, for example `project TimeGenerated, User = Account, Computer`; everything not listed is dropped. `extend` adds calculated columns while keeping all existing ones, for example `extend Hour = hourofday(TimeGenerated)`. `take` (or `limit`) returns an arbitrary set of rows and is useful for a quick look at a table's shape; it is not sorted and not the newest rows. `order by` (or `sort by`) sorts, descending by default, and `top 10 by Failures` sorts and limits in one step. `project-away` does the opposite of `project`: it drops the named columns and keeps the rest, which is handy when a table has one bulky column you do not need.",
   "Aggregation is where questions get answered. `summarize` aggregates. It groups rows by the columns after `by` and computes functions such as `count()`, `dcount()` (distinct count), `min()`, `max()`, `make_set()` and `arg_max()`. The `count` operator on its own just returns the number of rows in the input. `bin()` rounds values into buckets, most often times, so `summarize count() by bin(TimeGenerated, 1h)` gives an hourly count. `render` draws a chart from the results, such as `render timechart` or `render barchart`, which is handy for spotting spikes and for workbooks. You can name aggregate columns, as in `Failures = count()`, and group by several columns at once; each unique combination of the `by` values becomes one output row. Rows removed earlier never reach summarize, which is another reason to filter first.",
   "```kusto\nSecurityEvent\n| where TimeGenerated > ago(1d)\n| where EventID == 4625\n| summarize Failures = count() by Account, bin(TimeGenerated, 1h)\n| where Failures >= 10\n| order by Failures desc\n```",
   "Read the sample query line by line to see the pipeline in action. The first line names the SecurityEvent table, which holds Windows security events collected from servers and workstations. The second keeps the last day. The third keeps event ID 4625, a failed logon. The fourth groups the remaining rows by account and by one-hour bucket and counts them into a column called Failures. The fifth keeps only groups with ten or more failures, and the last sorts the busiest groups to the top. Each line narrows or reshapes the data, and you can run the query after any line to see the intermediate result.",
   "Consider a worked example. The query above finds accounts with ten or more failed Windows logons in any hour of the last day. Notice the pattern: filter by time, filter by event, aggregate, filter the aggregate, sort. Most detection queries follow it. An analyst suspecting password spraying applies the same pattern to SigninLogs: `where ResultType != \"0\"`, then `summarize Users = dcount(UserPrincipalName) by IPAddress, bin(TimeGenerated, 1h)`, then `where Users > 50`. One IP address has failed sign-ins against 300 different users in an hour. To see the shape over time, she removes the IP grouping and ends with `render timechart`, which shows a sharp spike at 03:00.",
   "Common mistakes: filtering on `Timestamp` in a Sentinel table or `TimeGenerated` in a Defender table (the column does not exist or is not what you expect); using `take 10` and assuming you saw the newest events; using `project` when you meant `extend` and losing columns later steps need; forgetting that `==` is case-sensitive, so `Account == \"admin\"` misses `ADMIN`; placing the time filter at the end so the query scans everything; and confusing `count()` (an aggregation inside summarize) with the `count` operator (total rows). Finally, `order by` without `asc` sorts descending, which surprises people who expect oldest-first. Practice by starting with `TableName | take 10` to see the columns, then add one line at a time.",
   "Exam questions often show a query with a blank or ask what a query returns. 'Keep only some columns' is `project`; 'add a calculated column' is `extend`; 'group and aggregate' is `summarize`; 'hourly buckets' is `bin(TimeGenerated, 1h)`; 'last seven days' is `ago(7d)`; 'draw a chart over time' is `render timechart`; 'highest N' is `top`; 'unsorted sample' is `take`. 'Distinct number of users' is `dcount()`. When a question shows two nearly identical queries, look for these small differences: which time column is used, whether `project` drops a column a later line needs, whether results are sorted, and whether the time filter comes before or after the aggregation."
  ],
  "analogy": "A KQL query is like an assembly line in a factory. Raw material (the table) enters at one end, and each station (operator) does one job: one removes defective parts (where), one trims pieces to size (project), one adds a label (extend), one boxes items by type and counts them (summarize). The order of stations matters, and removing waste early makes every later station faster. Unlike a real factory, nothing is ever destroyed: the original table is untouched.",
  "terms": [
   [
    "where",
    "An operator that keeps only rows matching a condition."
   ],
   [
    "project",
    "An operator that keeps, orders and optionally renames only the listed columns."
   ],
   [
    "extend",
    "An operator that adds calculated columns while keeping the existing ones."
   ],
   [
    "summarize",
    "An operator that groups rows and computes aggregates such as count() or dcount()."
   ],
   [
    "bin()",
    "A function that rounds values, usually timestamps, into fixed-size buckets for grouping."
   ],
   [
    "ago()",
    "A function that returns a time relative to now, such as ago(1d) for one day ago."
   ],
   [
    "render",
    "An operator that draws the query results as a chart, such as a timechart."
   ],
   [
    "take",
    "An operator that returns an arbitrary, unsorted set of rows, useful for previewing a table."
   ],
   [
    "top",
    "An operator that sorts by a column and returns the first N rows in one step."
   ]
  ],
  "example": "An analyst suspects password spraying. She queries SigninLogs for the last day, filters failed results, summarizes distinct users per source IP per hour with dcount and bin, and sorts descending. One IP address has failed sign-ins against 300 different users in an hour, which she adds to an incident and blocks, then charts the attempts with render timechart for the report.",
  "mistakes": [
   [
    "`take 10` shows the ten most recent events.",
    "`take` returns an arbitrary set of rows with no ordering. Use `top 10 by TimeGenerated` or `order by` followed by `take` for the newest rows."
   ],
   [
    "`project` and `extend` both add a column, so they are interchangeable.",
    "`project` keeps only the listed columns and drops the rest; `extend` adds a calculated column and keeps everything. Using `project` too early can remove columns a later line needs."
   ],
   [
    "Every table uses `TimeGenerated` for time.",
    "Sentinel and Log Analytics tables use `TimeGenerated`, while Defender XDR advanced hunting tables use `Timestamp`."
   ],
   [
    "`Account == \"admin\"` matches any capitalization.",
    "`==` is case-sensitive. Use `=~` for case-insensitive equality."
   ]
  ],
  "tryit": [
   [
    "Priya at Lakeside Schools wants a chart of failed sign-ins per hour over the past week to show the board when a spray began. She has written `SigninLogs | where ResultType != \"0\" | take 1000 | summarize count() by bin(TimeGenerated, 1h) | render timechart`. The chart looks oddly flat. What is wrong, and how should she fix it?",
    "Two problems. There is no time filter, so add `where TimeGenerated > ago(7d)` near the top. More seriously, `take 1000` keeps an arbitrary 1,000 rows before counting, so the chart reflects a random sample rather than all failures. Remove `take`, keep the time and result filters, then summarize by `bin(TimeGenerated, 1h)` and render the timechart."
   ]
  ],
  "tip": "Know the difference between project (keep only listed columns) and extend (add columns, keep all), and between take (unsorted sample) and top (sorted and limited). Remember Timestamp in Defender tables and TimeGenerated in Sentinel tables.",
  "check": [
   [
    "How do you count events per hour for the last seven days?",
    "Filter with where TimeGenerated > ago(7d), then summarize count() by bin(TimeGenerated, 1h)."
   ],
   [
    "Does take return the newest rows?",
    "No. It returns an arbitrary set of rows; use top or order by for sorted results."
   ],
   [
    "What is the difference between == and =~?",
    "== is case-sensitive equality; =~ is case-insensitive equality."
   ],
   [
    "Why put the time filter near the top of a query?",
    "It reduces the data every later operator must process, making the query faster and cheaper."
   ],
   [
    "Which operator draws query results as a chart over time?",
    "render, for example render timechart."
   ]
  ]
 },
 {
  "t": "KQL for hunting: has vs contains, in and has_any, let statements and dynamic lists, join kinds, union, parse_json and mv-expand, make-series with anomaly functions",
  "hook": "Friday afternoon at Northgate Engineering, Sam has a list of twenty remote-access tool names from a threat briefing and a hunch that one of them is running somewhere it should not. The first draft of the hunt uses `contains` twenty times, runs for minutes, and still misses the devices that matter because it cannot tell approved admin servers from everything else. The data is all there: process events, network events, a watchlist of approved hosts, and a JSON column full of details. What turns this slow, sprawling search into a short, fast query that returns only the devices worth a closer look?",
  "simple": "Hunting queries ask bigger questions than simple searches, so they need a few extra tools. Some tools search text quickly for whole words instead of slowly checking every letter. Some let you check a long list of names at once, and give that list a short nickname so you can reuse it. Others combine tables: either placing rows from several tables in one pile, or matching rows from two tables side by side, or showing only what is missing from the second table. Finally, some tools unpack bundled data and spot unusual spikes over time. Picture a librarian: the card catalog finds whole words fast, while reading every page for a fragment of a word is slow.",
  "body": [
   "This lesson builds on the basics with the operators hunters reach for most. Hunting queries need more than the basics. This lesson covers the Kusto Query Language (KQL) operators that make searches fast, reusable and able to combine data from several tables. String matching comes first. `has` looks for a whole term using the index that Kusto builds from words in text, so it is fast. `contains` looks for any substring and has to scan the text, so it is slower. `ProcessCommandLine has \"mimikatz\"` matches the word mimikatz; `contains \"katz\"` would match inside a longer word. Both are case-insensitive; `has_cs` and `contains_cs` are the case-sensitive forms. Use `has` whenever you are searching for a complete term, and `startswith` or `endswith` when position matters. The reason `has` is faster comes down to how Kusto stores text: it breaks strings into terms of letters and numbers and indexes them, so asking whether a term exists is a lookup, while a substring search has to read every character.",
   "Matching against a list of values is the next tool. For lists, `in` checks exact equality against a set of values, for example `FileName in (\"psexec.exe\", \"wmic.exe\")`, and `in~` does so case-insensitively. `has_any` checks whether a text column contains any of a list of terms, which suits command lines. A quick way to remember the split: `in` compares the whole value of a column, which fits a column like FileName, while `has_any` looks for terms anywhere inside the text, which fits a column like ProcessCommandLine.",
   "Naming things makes long hunts readable. `let` statements name a value, list or even a whole query so you can reuse it. A dynamic list looks like `let SuspiciousTools = dynamic([\"procdump\", \"rclone\"]);` and is then used in `where ProcessCommandLine has_any (SuspiciousTools)`. Let statements end with a semicolon and make queries easier to read and maintain. A `let` can also hold a time window, such as `let lookback = 7d;`, or a whole tabular expression, such as the list of approved hosts from a watchlist, which you then use like a table later in the query.",
   "Combining tables is where hunts become powerful. `join` combines two tables on matching columns. The default kind is innerunique, which removes duplicate left-side keys before matching and can surprise you. `inner` keeps all matching combinations, `leftouter` keeps every left row even without a match, `leftanti` keeps left rows with no match (useful for accounts that signed in but never completed multifactor authentication (MFA), or devices not on an approved list), and `leftsemi` keeps left rows that do have a match without adding right columns. Put the smaller table on the left for performance, and filter both sides by time first. `union` is different: it stacks rows from several tables, for example `union DeviceProcessEvents, DeviceNetworkEvents`, which is useful when the same indicator might appear in different sources.",
   "Some data arrives packed inside a single column. Many columns hold JavaScript Object Notation (JSON), such as `AdditionalFields` or `RawEventData`. `parse_json()` (also called `todynamic()`) turns a JSON string into a dynamic object whose properties you access with dot or bracket notation, such as `RawEventData.Parameters`. When a property is an array, `mv-expand` creates one row per array element, so you can filter or summarize individual items, such as each permission granted to an app or each parameter of an inbox rule.",
   "```kusto\nlet lookback = 14d;\nSigninLogs\n| where TimeGenerated > ago(lookback)\n| make-series Signins = count() default = 0 on TimeGenerated from ago(lookback) to now() step 1h by UserPrincipalName\n| extend (Anomalies, Score, Baseline) = series_decompose_anomalies(Signins)\n| mv-expand TimeGenerated to typeof(datetime), Signins to typeof(long), Anomalies to typeof(double)\n| where Anomalies > 0\n```",
   "`make-series` builds a time series per group, filling empty buckets with a default so the series is regular. Series functions then analyze it: `series_decompose_anomalies()` flags points that deviate from the expected pattern, taking seasonality and trend into account, and returns anomaly flags, scores and a baseline. The `mv-expand` line turns the arrays back into rows so you can see which hours were anomalous. This is how you find a user whose sign-in volume suddenly spikes.",
   "Consider a worked example. A hunter defines a let list of remote-access tool names, uses `has_any` against ProcessCommandLine in DeviceProcessEvents, and `leftanti` joins the results against a watchlist of approved admin hosts. Twelve devices remain. She then unions in DeviceNetworkEvents for those devices and finds two also connecting to a rare domain, which she bookmarks for an incident.",
   "Common mistakes: using `contains` for whole words and paying for slow scans; using `in` against a command line (it tests exact equality, so use `has_any`); forgetting the semicolon after a `let`; relying on the default innerunique join and silently losing duplicate left rows; joining two huge unfiltered tables; confusing `union` (more rows) with `join` (more columns); and reading `RawEventData.Parameters` without `parse_json()` when the column is a string. Another trap is expecting `make-series` output to be ordinary rows; it produces arrays until you expand them.",
   "Exam questions give a goal and ask for the operator. 'Records with no match in the other table' means `leftanti`. 'Fast search for a whole word' means `has`. 'Any of these terms in a command line' means `has_any`. 'Exact value in a list' means `in`. 'Reusable list or value' means `let` with `dynamic()`. 'Rows from several tables together' means `union`. 'One row per array element' means `mv-expand`. 'Spot unusual spikes over time' means `make-series` with `series_decompose_anomalies()`. 'Default join kind' is innerunique."
  ],
  "analogy": "Think of join kinds as ways of comparing a party guest list (left table) with the names at the door (right table). inner gives every pairing of guest and door record. leftouter keeps every invited guest, filling blanks for people who never arrived. leftanti lists invited guests who never showed up, and leftsemi lists guests who did arrive, without copying door details. union is different: it simply tapes two guest lists together into one longer list. The analogy breaks on innerunique, which quietly removes duplicate names from the guest list before matching.",
  "terms": [
   [
    "has vs contains",
    "has matches whole indexed terms quickly; contains matches any substring and is slower."
   ],
   [
    "has_any",
    "An operator that checks whether a text column contains any term from a list."
   ],
   [
    "let",
    "A statement that names a value, list or query for reuse later in the query."
   ],
   [
    "leftanti join",
    "A join that returns left-side rows with no match on the right."
   ],
   [
    "union",
    "An operator that stacks rows from several tables into one result."
   ],
   [
    "mv-expand",
    "An operator that turns each element of an array into its own row."
   ],
   [
    "make-series",
    "An operator that builds regular time series for analysis with functions such as series_decompose_anomalies()."
   ],
   [
    "innerunique",
    "The default join kind, which removes duplicate keys on the left side before matching."
   ],
   [
    "parse_json()",
    "A function that converts a JSON string into a dynamic object whose properties you can reference."
   ]
  ],
  "example": "A hunter defines a let list of remote-access tool names, uses has_any against ProcessCommandLine in DeviceProcessEvents, and leftanti joins the results against a watchlist of approved admin hosts. Twelve devices remain, and two of them also show outbound connections to a rare domain when she unions in DeviceNetworkEvents, so she bookmarks them and opens an incident.",
  "mistakes": [
   [
    "`contains` is the safer choice for every text search.",
    "`contains` scans every character and is slower. Use `has` for whole terms, and reserve `contains` for true substring needs."
   ],
   [
    "`in` works for finding tool names inside a command line.",
    "`in` tests exact equality of the whole value. For terms inside text, use `has_any` with a list."
   ],
   [
    "A plain `join` keeps every matching row from both tables.",
    "The default kind is innerunique, which removes duplicate left keys first. Specify `kind=inner` when you need every combination."
   ],
   [
    "`union` and `join` both add columns from a second table.",
    "`union` stacks rows from several tables; `join` combines columns where key values match."
   ]
  ],
  "tryit": [
   [
    "Elena at Bayview Insurance has a watchlist of devices that completed a security baseline. She needs every device that sent process events this week but is NOT on that watchlist, without pulling any watchlist columns into the result. Which join kind should she use, and which table goes on the left?",
    "Put the process events (summarized to distinct devices) on the left and the watchlist on the right, and use `kind=leftanti`. It returns left rows with no match on the right, which are exactly the devices missing the baseline. leftsemi would return the opposite set."
   ],
   [
    "An inbox rule event in CloudAppEvents stores its parameters as a JSON array inside a string column. Jordan wants one row per parameter so he can filter for rules that forward mail outside the company. What two steps does he need?",
    "Convert the column with `parse_json()` (or `todynamic()`) so its properties can be addressed, then use `mv-expand` on the parameter array to produce one row per element before filtering."
   ]
  ],
  "tip": "The exam likes asking which join kind finds records without a match (leftanti) and why has is preferred over contains (performance on whole terms). Remember the default join kind is innerunique.",
  "check": [
   [
    "Which operator turns each element of an array column into its own row?",
    "mv-expand."
   ],
   [
    "What is the difference between union and join?",
    "union stacks rows from several tables; join combines columns from two tables where key values match."
   ],
   [
    "Which function flags unusual points in a time series built with make-series?",
    "series_decompose_anomalies()."
   ],
   [
    "Why use has_any rather than in to search command lines for tool names?",
    "in tests exact equality of the whole value, while has_any matches any listed term within the text."
   ],
   [
    "What does a leftanti join return?",
    "Rows from the left table that have no match in the right table."
   ]
  ]
 },
 {
  "t": "Advanced hunting schema: DeviceProcessEvents, DeviceNetworkEvents, DeviceLogonEvents, EmailEvents, EmailUrlInfo, IdentityLogonEvents, CloudAppEvents, AlertInfo and AlertEvidence",
  "hook": "At Copperline Foods, a user named Tasha reported a strange invoice email an hour ago, and now your lead wants three answers before lunch: who else received it, who clicked the link, and whether anything ran on their laptops afterward. You open advanced hunting in the Defender portal and see a long list of tables with similar names. Pick the wrong one and you will spend twenty minutes searching for command lines in a table that only records network connections. Which tables hold each piece of this story, and how do you stitch them together?",
  "simple": "Advanced hunting stores security data in many tables, a bit like a filing cabinet with labeled drawers. One drawer holds every program that started on a computer, another holds every network connection, another holds every sign-in to a computer, and others hold emails, links inside emails, cloud app activity and alerts. Each drawer has its own columns. To answer a real question you often open two drawers and match records using a shared number, the way you might match a receipt to a bank statement by its transaction number. Knowing which drawer to open first saves a lot of time.",
  "body": [
   "Start with how the schema is organized. Advanced hunting in the Defender portal exposes Defender XDR data as tables grouped by source. Knowing which table holds which kind of event, and how tables link, is the difference between a quick hunt and a frustrating one. The schema reference in the portal, on the left side of the advanced hunting page, lists every table and column with descriptions and sample queries. The time column in these tables is `Timestamp`, and advanced hunting keeps about 30 days of Defender data; for longer history, the data must be in Sentinel or the data lake. The schema pane also shows each table's columns and their types, which is the quickest way to check whether the column you remember actually exists before you write a query.",
   "Endpoint data is the largest group. Device tables come from Defender for Endpoint. DeviceProcessEvents records process creation: FileName, FolderPath, ProcessCommandLine, the SHA256 hash, the account, and the parent through the InitiatingProcess columns such as InitiatingProcessFileName and InitiatingProcessCommandLine. It is where you hunt for encoded PowerShell, living-off-the-land binaries or Office apps spawning shells. A classic hunt is an Office application such as WINWORD.EXE appearing in InitiatingProcessFileName with powershell.exe or cmd.exe as FileName.",
   "DeviceNetworkEvents records network connections: RemoteIP, RemotePort, RemoteUrl, the ActionType (for example ConnectionSuccess or ConnectionFailed) and the initiating process. DeviceLogonEvents records logons to devices, with AccountName, LogonType (such as Interactive, Network or RemoteInteractive) and ActionType showing success or failure. Other device tables cover files (DeviceFileEvents), registry (DeviceRegistryEvents), images loaded and general events (DeviceEvents). The ActionType column appears in most tables and describes what kind of event each row is, so running `summarize count() by ActionType` is a good first step with any unfamiliar table.",
   "Email data tells the delivery side of a phishing story. Email tables come from Defender for Office 365. EmailEvents has one row per message delivery, including SenderFromAddress, RecipientEmailAddress, Subject, DeliveryAction, DeliveryLocation and ThreatTypes. EmailUrlInfo lists URLs found in messages, and EmailAttachmentInfo lists attachments. They all share NetworkMessageId, the key you join on to connect a message to its URLs or files. UrlClickEvents records Safe Links clicks, and EmailPostDeliveryEvents records actions taken after delivery, such as zero-hour auto purge (ZAP) or admin remediation. DeliveryAction shows outcomes such as Delivered or Blocked, and DeliveryLocation shows where the message landed, such as the inbox, junk folder or quarantine.",
   "Identity and cloud app data fill in who signed in where and what they did in Microsoft 365. IdentityLogonEvents records authentication activity seen by Defender for Identity on Active Directory and by Microsoft Entra ID, with the protocol (for example Kerberos or NTLM), the account, device and failure reason. It suits hunting for password spraying against on-premises accounts or legacy protocol use. Identity tables also include IdentityQueryEvents (such as Lightweight Directory Access Protocol (LDAP) and Domain Name System (DNS) queries) and IdentityDirectoryEvents (such as group membership changes). CloudAppEvents comes from Defender for Cloud Apps and records activity in cloud apps such as Exchange Online, SharePoint and Teams: ActionType, Application, account, IP address and a RawEventData column in JavaScript Object Notation (JSON), which you parse for details such as inbox rule parameters.",
   "Alerts can be queried too. AlertInfo has one row per alert from any Defender product (and Sentinel when onboarded): AlertId, Title, Severity, Category, ServiceSource and DetectionSource. AlertEvidence has one row per entity attached to an alert: EntityType, EvidenceRole and entity columns such as DeviceId, AccountName, FileName or RemoteIP. Join them on AlertId to ask questions like which devices appeared in high-severity alerts this week. Because these two tables cover alerts from every product in one place, a single query can ask which users appeared in both an identity alert and an email alert on the same day. The email join pattern looks like this:",
   "```kusto\nEmailEvents\n| where Timestamp > ago(7d) and ThreatTypes has \"Phish\"\n| join kind=inner EmailUrlInfo on NetworkMessageId\n| project Timestamp, RecipientEmailAddress, Subject, Url\n```",
   "Consider a worked example. After a phishing incident, an analyst joins EmailEvents to EmailUrlInfo on NetworkMessageId to list every recipient of the malicious URL, then checks UrlClickEvents for that URL to see who clicked. For the two users who clicked, she queries DeviceProcessEvents on their devices for processes whose InitiatingProcessFileName is the browser in the hour after the click, and DeviceNetworkEvents for connections to the payload domain. One device shows a downloaded script running. She isolates the device and records each query in the incident so the next analyst can repeat the steps.",
   "Common mistakes: looking for command lines in DeviceNetworkEvents; hunting on-premises Kerberos logons in DeviceLogonEvents instead of IdentityLogonEvents; joining email tables on Subject instead of NetworkMessageId; forgetting that alert details and alert entities live in two tables; and querying for a year of data when advanced hunting holds about 30 days.",
   "Exam questions describe the evidence and expect a table. Process and command line means DeviceProcessEvents; parent process means its InitiatingProcess columns. Connection, remote IP or port means DeviceNetworkEvents. Logon to a device means DeviceLogonEvents. On-premises Kerberos or NTLM authentication means IdentityLogonEvents. Message delivery means EmailEvents; URLs in mail means EmailUrlInfo joined on NetworkMessageId. Mailbox rules or SharePoint activity means CloudAppEvents. Alert metadata means AlertInfo; alert entities means AlertEvidence, joined on AlertId."
  ],
  "analogy": "The advanced hunting schema is like a hospital's records system. Admissions (DeviceLogonEvents) shows who came in, the pharmacy log (DeviceProcessEvents) shows what was administered and who ordered it, the phone log (DeviceNetworkEvents) shows who called whom, and the incident register (AlertInfo and AlertEvidence) lists problems and the people involved. A patient number links them all, the way NetworkMessageId links email tables and AlertId links alert tables. The analogy breaks on retention: advanced hunting keeps only about 30 days.",
  "terms": [
   [
    "DeviceProcessEvents",
    "The table of process creation events, including command lines and parent process details."
   ],
   [
    "DeviceNetworkEvents",
    "The table of network connections from devices, with remote IP, port, URL and initiating process."
   ],
   [
    "NetworkMessageId",
    "The email identifier that links EmailEvents with EmailUrlInfo, EmailAttachmentInfo and related tables."
   ],
   [
    "IdentityLogonEvents",
    "Authentication events from Defender for Identity (on-premises AD) and Microsoft Entra ID."
   ],
   [
    "CloudAppEvents",
    "Activity from cloud apps such as Exchange Online and SharePoint, with details in RawEventData."
   ],
   [
    "AlertEvidence",
    "One row per entity attached to an alert, joined to AlertInfo on AlertId."
   ],
   [
    "AlertInfo",
    "One row per alert from Defender products, with title, severity, category and source; joined to AlertEvidence on AlertId."
   ],
   [
    "ActionType",
    "A column in most advanced hunting tables that describes the kind of event each row records."
   ]
  ],
  "example": "After a phishing incident, an analyst joins EmailEvents to EmailUrlInfo on NetworkMessageId to list every recipient of the malicious URL, then checks UrlClickEvents to see who clicked, then queries DeviceProcessEvents on those users' devices for processes launched by the browser in the next hour. One device shows a downloaded script running, so she isolates it.",
  "mistakes": [
   [
    "Command lines for a suspicious connection are in DeviceNetworkEvents.",
    "DeviceNetworkEvents records connections and the initiating process. Full process creation details and command lines are in DeviceProcessEvents."
   ],
   [
    "On-premises Kerberos and NTLM logons are in DeviceLogonEvents.",
    "DeviceLogonEvents covers logons to devices onboarded to Defender for Endpoint. Authentication against domain controllers seen by Defender for Identity is in IdentityLogonEvents."
   ],
   [
    "Email tables can be joined on Subject.",
    "Subjects repeat and change. Join EmailEvents, EmailUrlInfo and EmailAttachmentInfo on NetworkMessageId."
   ],
   [
    "Advanced hunting can query a full year of Defender data.",
    "Advanced hunting keeps about 30 days of Defender data. Longer history must come from Sentinel or the data lake."
   ]
  ],
  "tryit": [
   [
    "Marcus at Silverleaf Bank suspects someone created a forwarding inbox rule in Exchange Online on a finance mailbox after a successful phishing sign-in. He has the user's name and the approximate time. Which table should he query for the rule creation, and what will he need to do to read the rule's details?",
    "CloudAppEvents, filtered on the account and an ActionType for inbox rule creation. The rule's parameters sit in the RawEventData JSON column, so he parses it with parse_json() and may need mv-expand to see each parameter."
   ],
   [
    "A manager asks for every device that appeared in a high-severity alert in the past week. Which two tables are needed and how are they connected?",
    "AlertInfo, filtered on Severity, joined to AlertEvidence on AlertId, then filtered to device entities and summarized by DeviceId or DeviceName."
   ]
  ],
  "tip": "Match question wording to tables: process and command line means DeviceProcessEvents; connection or remote IP means DeviceNetworkEvents; on-premises Kerberos or NTLM logons means IdentityLogonEvents; mailbox rules in Exchange Online usually means CloudAppEvents.",
  "check": [
   [
    "Which column joins EmailEvents to EmailUrlInfo?",
    "NetworkMessageId."
   ],
   [
    "Where would you look for the parent process of a suspicious PowerShell launch?",
    "In DeviceProcessEvents, using the InitiatingProcess columns such as InitiatingProcessFileName."
   ],
   [
    "How do you list the entities in high-severity alerts?",
    "Join AlertInfo (filtered on Severity) with AlertEvidence on AlertId."
   ],
   [
    "Which table would show NTLM authentication against an on-premises domain controller?",
    "IdentityLogonEvents, populated by Defender for Identity."
   ],
   [
    "Which time column do advanced hunting tables use?",
    "Timestamp."
   ]
  ]
 },
 {
  "t": "Turning a hunting query into a custom detection rule; Security Copilot help with writing KQL",
  "hook": "Last Tuesday, Ana at Meadowbrook Utilities spent three hours hunting and found a scheduled task launching an encoded PowerShell command on one engineering workstation. She cleaned it up and wrote a note. This morning the same trick appeared on a different machine, and nobody noticed for six hours, because her query only runs when she remembers to run it. Her manager asks a simple question: why did we learn this lesson once and then forget it? What does it take to turn a one-time hunt into a rule that watches every hour, without burying the queue in false alarms?",
  "simple": "Hunting is like searching a house for something that might be hidden. When you find a trick worth watching for, you do not want to search by hand every day, so you set up a motion sensor: a detection rule that runs your search on a schedule and raises an alert when it finds a match. Before you install the sensor, you make sure it points at the right thing, includes the details a responder needs, and does not go off every time the cat walks by. Security Copilot can help write the search from a plain-English request, but you still check its work before trusting it.",
  "body": [
   "The move from hunt to detection starts with purpose. Hunting is exploratory: you form a hypothesis, query, and learn. When a hunt finds something worth watching for continuously, you promote it into a detection so the next occurrence raises an alert without a human remembering to look. In Defender XDR that means a custom detection rule; in Sentinel, a scheduled or near-real-time (NRT) analytics rule. The move from hunt to detection is how a security operations center (SOC) turns one analyst's insight into permanent coverage. Without that step, the knowledge stays in one person's notes and disappears when they go on leave.",
   "Shaping the query is the first practical task. Start by making the query detection-ready. Hunting queries often return aggregates or broad lists, while a detection should return specific events that an analyst can act on. Make sure it returns the required identifier columns, such as Timestamp, DeviceId and ReportId for device tables, and the columns for the impacted entity (device, user or mailbox). If you summarize, keep these columns with a function like `arg_max(Timestamp, *)` so each row still points to a real event. Remove `take` or `limit` statements, which would silently drop results, and remove `render`, which has no meaning in a rule. Defender uses these identifier columns to link each alert back to the exact event and entity, which is why the rule editor checks for them before it lets you save.",
   "```kusto\nDeviceProcessEvents\n| where FileName =~ \"schtasks.exe\" and ProcessCommandLine has \"/create\"\n| where ProcessCommandLine has_any (\"-enc\", \"-encodedcommand\")\n| where DeviceName !startswith \"deploy-\"\n| summarize arg_max(Timestamp, *) by DeviceId\n| project Timestamp, DeviceId, ReportId, DeviceName, AccountName, ProcessCommandLine\n```",
   "The sample query shows the finished shape. It looks for schtasks.exe creating a task whose command line contains an encoded PowerShell switch, excludes the deployment servers whose names start with deploy-, keeps the most recent matching event per device with `arg_max(Timestamp, *)`, and projects the identifier columns plus the details an analyst will want to see first. Every line has a job, and nothing in it depends on a person reading a chart.",
   "Tuning and saving come next. Next, tune for noise. Run the query over the full lookback period you plan to use and count the results. If it returns hundreds of hits a day, add filters for known-good activity, perhaps using a watchlist in Sentinel or a let list of approved tools. A detection that fires constantly teaches analysts to ignore it. Then choose a frequency that matches the risk: continuous or hourly for active attack techniques, daily for slower signals. In advanced hunting, select Create detection rule. Give it a clear name and description, a severity, a category, MITRE ATT&CK techniques and recommended actions for analysts. Choose impacted entities and, only for high-confidence logic, automated actions such as isolating a device. After saving, monitor the rule's runs and alerts on the Detection rules page, and revisit it when it produces false positives.",
   "Generative AI can speed up the writing. Security Copilot can help at several points. In advanced hunting, you can describe what you want in plain language, such as show devices where PowerShell ran with an encoded command in the last 7 days, and Copilot generates a Kusto Query Language (KQL) query using the right tables and columns. You can ask it to explain an existing query, fix an error, or adjust a query, for example to exclude certain hosts. This lowers the barrier for analysts who are still learning KQL and speeds up experienced hunters. Always review generated KQL before relying on it: check that it queries the right table, that filters match your intent, that time ranges are sensible, and that it returns the columns a detection needs. Then run it and inspect the results. A practical review checklist: does the query use `Timestamp` for Defender tables, does it filter on the right ActionType or FileName, does it accidentally use `contains` where `has` would be faster, and would a known-good example from your environment be excluded or included as you intend.",
   "Consider a worked example. A hunter asks Copilot for processes that created scheduled tasks with encoded commands in the last 7 days. She reviews the generated query, corrects a column name it guessed wrong, adds DeviceId and ReportId to the output, and excludes the known deployment servers whose names start with deploy-. Over 30 days the query returns about three hits a week, all worth a look. She saves it as a custom detection rule running every 3 hours, tagged with the scheduled task technique, with DeviceId as the impacted entity and no automatic action until it has proved reliable.",
   "Common mistakes: saving a query that returns only aggregates, so alerts have no entity to act on; leaving `take 100` in and missing events; skipping the noise test and flooding the queue; attaching isolate device to an untested rule; and trusting generated KQL that uses a wrong column or misses a condition. A subtle mistake in a detection means either silence during an attack or a flood of false alerts, and both erode trust in the SOC's rules.",
   "Exam questions usually describe a failure or a goal. 'The rule cannot be saved' or 'alerts lack entities' means missing required or entity columns. 'Rule misses events' may point to a leftover `take` or a too-short lookback. 'Keep one real event per device after summarizing' means `arg_max(Timestamp, *)`. 'Write KQL from a plain-language question' means Security Copilot's natural-language to KQL, and 'what must the analyst do with it' is validate and test before use. Remember also the difference between the two products: in Defender XDR the output is a custom detection rule created from advanced hunting, while in Microsoft Sentinel the equivalent is a scheduled or NRT analytics rule."
  ],
  "analogy": "Turning a hunt into a detection is like turning a one-time recipe experiment into a printed recipe card for a restaurant kitchen. The experiment can be messy and use guesses, but the card must list exact ingredients (identifier and entity columns), quantities that work every time (filters tuned for noise), and what to do if something goes wrong (recommended actions). An assistant can draft the card, but the head chef tastes it before it goes on the menu.",
  "terms": [
   [
    "Hypothesis-driven hunting",
    "Hunting that starts from a specific idea about attacker behavior and tests it with queries."
   ],
   [
    "Detection-ready query",
    "A query that returns specific events with required identifier and entity columns and acceptable noise."
   ],
   [
    "arg_max()",
    "An aggregation that returns the row with the maximum value of a column, keeping other columns."
   ],
   [
    "Noise testing",
    "Running a candidate detection over its full lookback to measure how often it would fire before saving it."
   ],
   [
    "Natural-language to KQL",
    "Security Copilot's ability to generate a KQL query from a plain-language request."
   ],
   [
    "Detection rules page",
    "The Defender portal page where custom detections are listed, edited, run and monitored."
   ],
   [
    "Custom detection rule",
    "A Defender XDR rule built from an advanced hunting query that runs on a schedule and raises alerts, optionally with automated actions."
   ]
  ],
  "example": "A hunter asks Copilot for 'processes that created scheduled tasks with encoded commands in the last 7 days'. She reviews the generated query, corrects a column name, adds DeviceId and ReportId to the output, and excludes a known deployment server. The query returns three hits a week, so she saves it as a custom detection rule running every 3 hours, tagged with the scheduled task technique.",
  "mistakes": [
   [
    "A query that returns counts per device is ready to save as a detection.",
    "Alerts need real events. Keep the required identifier columns such as Timestamp, DeviceId and ReportId, for example with arg_max(Timestamp, *), plus an entity column."
   ],
   [
    "Leaving `take 100` in the query keeps the rule fast and harmless.",
    "`take` silently drops matching events, so the rule can miss attacks. Remove `take`, `limit` and `render` before saving."
   ],
   [
    "Every new rule should isolate devices automatically to stop attacks faster.",
    "Automated actions belong only on high-confidence, tested logic. An untested rule with isolation can disrupt the business with false positives."
   ],
   [
    "Copilot-generated KQL is correct because it comes from the product.",
    "Generated queries can guess wrong columns or miss conditions. Review tables, columns, filters and time range, then run and inspect results."
   ]
  ],
  "tryit": [
   [
    "Rafael at Clearwater Transit tries to save a hunting query as a custom detection rule, but the portal will not accept it. His query ends with `summarize Count = count() by DeviceName`. What is the most likely cause, and how should he fix it?",
    "The summarized output lacks the required identifier columns, such as Timestamp, DeviceId and ReportId, so the rule cannot link alerts to events. He should keep a real event per device, for example `summarize arg_max(Timestamp, *) by DeviceId`, and project the identifier and entity columns."
   ],
   [
    "A candidate rule returns about 400 hits a day during testing, almost all from a software deployment tool the IT team uses. What should the analyst do before saving it?",
    "Tune it by excluding the known-good activity, for example with a let list or watchlist of deployment hosts or a filter on the tool's process, then re-run it over the full lookback to confirm the volume is manageable."
   ]
  ],
  "tip": "If a scenario says the rule can't be saved or alerts lack entities, the query is missing required or entity columns. Generated KQL is a starting point that the analyst must validate.",
  "check": [
   [
    "Why remove take from a query before turning it into a detection?",
    "take limits results arbitrarily, so the rule could miss matching events."
   ],
   [
    "How can a summarized query still work as a detection?",
    "Keep event identifiers and entity columns, for example with arg_max(Timestamp, *)."
   ],
   [
    "What should you check in KQL that Copilot generates?",
    "The tables, columns, filters, time range and output columns, then run it and inspect results."
   ],
   [
    "Why test a candidate detection over its full lookback before saving?",
    "To see how often it would fire and add filters for known-good activity, so the rule does not flood the queue."
   ],
   [
    "What is the Sentinel equivalent of a Defender XDR custom detection rule?",
    "A scheduled or near-real-time (NRT) analytics rule."
   ]
  ]
 },
 {
  "t": "Sentinel hunting: hunting queries, hunts, bookmarks, livestream, notebooks with MSTICPy",
  "hook": "No alert has fired at Willow Creek Hospital all week, and that is exactly what worries Priya. A threat briefing says attackers in the health sector have been dumping credentials from server memory with tools that slip past default rules. Her manager has given her two days to look. She opens the Hunting page in Microsoft Sentinel and finds hundreds of queries, a button to create a hunt, something called livestream, and a link to notebooks. She knows what she is looking for, roughly. How does she search, keep what she finds, keep watching while she investigates, and hand the results to the incident team?",
  "simple": "Threat hunting means looking for attackers on purpose, before any alarm goes off. Microsoft Sentinel gives hunters a set of tools. Hunting queries are ready-made searches you run by hand. A hunt is a folder for one investigation, with your theory, your searches and your notes. Bookmarks are like sticky notes on interesting results, so the evidence stays saved even if the data changes. Livestream keeps a search running and taps you on the shoulder when something new matches. Notebooks let you use Python for heavier analysis. It is like a detective who keeps a case file, flags key clues, leaves a lookout posted, and calls in a lab when needed.",
  "body": [
   "Hunting starts from a different mindset than alert triage. Proactive threat hunting assumes attackers may already be inside and undetected, and searches for them rather than waiting for an alert. Microsoft Sentinel provides a set of tools that support each step: finding ideas, running queries, saving evidence, watching for new activity, and doing advanced analysis. The overall flow is to pick a hypothesis, run hunting queries or write new Kusto Query Language (KQL), bookmark evidence, use livestream to watch for more, go deeper in a notebook if needed, then turn findings into incidents and new detections. A hypothesis is a testable statement, such as an attacker is using scheduled tasks for persistence on file servers, which tells you which data and queries to start with. Hunting is a core duty of a mature security operations center (SOC).",
   "The Hunting page is where ideas become queries. The Hunting page (Threat management, Hunting) lists hunting queries. Many come from Content hub solutions and are mapped to MITRE ATT&CK tactics and techniques; you can also write your own. Each query shows how many results it returns and whether that number changed recently. You can run all queries at once, sort by result count or change, and filter by tactic or data source. A query that suddenly returns results it did not before deserves a look. Hunting queries do not create alerts on their own; they run when you run them.",
   "Hunts are a way to organize a hunting project end to end. You create a hunt with a hypothesis (for example, an attacker is using a remote management tool for persistence), add relevant queries, track status and findings, and collaborate with colleagues. When the hunt ends, you record the outcome and can create analytics rules or incidents from what you found. Hunts give managers a record of proactive work that did not come from an alert, which matters for measuring a SOC's maturity.",
   "Bookmarks are how evidence survives. Bookmarks save interesting rows from a query result with notes, tags and mapped entities. They keep evidence even after the underlying query or data changes. Bookmarks appear in the investigation graph and can be added to an existing incident or used to create a new incident; this is how a hunting finding enters the incident process. Bookmarks are stored in the HuntingBookmark table, so you can query them too. Mapping entities, such as the account, host and IP address, when you create a bookmark is what lets the investigation graph connect it to other evidence.",
   "Livestream keeps a temporary watch. Livestream lets you run a hunting query continuously against new incoming data and get notified when results appear, without creating a full analytics rule. It suits watching for a specific indicator during an active investigation, such as a suspicious IP address reappearing. If a livestream session proves valuable, you can promote the query to an analytics rule.",
   "Notebooks handle what KQL alone cannot. Notebooks give you the full power of Python. Sentinel integrates with Jupyter notebooks running in Azure Machine Learning, and with notebooks against the Sentinel data lake. MSTICPy (Microsoft Threat Intelligence Center Python security tools) is an open-source library built for this. It has query providers for Sentinel and Defender data, enrichment such as threat intelligence lookups and IP geolocation, data decoding (for example base64), and visualizations such as timelines, process trees and maps. Notebooks are ideal for machine learning, complex analysis, and repeatable investigation procedures that combine many sources. The compute used to run notebooks is billed separately from Sentinel. A typical notebook pulls data with a query provider, enriches indicators, and draws a timeline or process tree, all in one repeatable document that another analyst can rerun later. A minimal threat intelligence lookup in MSTICPy looks like this:",
   "```python\nfrom msticpy.context import TILookup\nti = TILookup()\nresult = ti.lookup_ioc(\"203.0.113.50\")\nti.result_to_df(result)\n```",
   "Consider a worked example. During a hunt for credential dumping, an analyst creates a hunt with the hypothesis that an attacker is reading Local Security Authority Subsystem Service (LSASS) memory on servers. She runs the relevant hunting queries, finds three suspicious rows showing an unusual process opening LSASS, and bookmarks them with the host and account mapped. She creates an incident from the bookmarks, starts a livestream on the suspicious process hash so she hears about any new occurrence, and uses an MSTICPy notebook to build a process tree for each server and look up the hash in threat intelligence. At the end she records the outcome in the hunt and asks the detection engineer to turn the query into an analytics rule.",
   "Common mistakes: expecting hunting queries to alert on a schedule (that needs an analytics rule); keeping findings only in a query result that will change, instead of bookmarking them; leaving a livestream as a permanent substitute for a proper rule; forgetting that notebook compute costs extra; and hunting without a hypothesis, which turns into aimless browsing. Each tool has a place in the flow: queries to search, hunts to organize, bookmarks to keep, livestream to watch, notebooks to go deeper, and analytics rules to make the coverage permanent.",
   "On the exam, 'save evidence from a hunt' means a bookmark, 'watch for new matches without writing a rule' means livestream, 'Python, machine learning or complex enrichment' means a notebook with MSTICPy, 'organize a hunting project with a hypothesis' means a hunt, and 'turn a finding into an incident' means creating an incident from a bookmark."
  ],
  "analogy": "Sentinel hunting tools are like a detective's kit. Hunting queries are the standard questions the detective asks at every scene. A hunt is the case file with the theory written on the cover. Bookmarks are evidence bags: once something is bagged and labeled, it is preserved even if the scene changes. Livestream is an officer posted outside the building who radios in when the suspect returns. Notebooks are the forensics lab. The analogy stops at alerts: the officer leaves when you end the session, while a permanent watch needs an analytics rule.",
  "terms": [
   [
    "Threat hunting",
    "Proactively searching for attackers who have evaded existing detections, usually starting from a hypothesis."
   ],
   [
    "Hunting query",
    "A saved KQL query for proactive searching, often mapped to MITRE ATT&CK, that does not create alerts."
   ],
   [
    "Hunt",
    "A Sentinel object that organizes a hunting project with a hypothesis, queries, status and findings."
   ],
   [
    "Bookmark",
    "Saved query results with notes, tags and entities that can be added to or create an incident."
   ],
   [
    "Livestream",
    "A session that runs a hunting query continuously on new data and notifies you of matches."
   ],
   [
    "MSTICPy",
    "An open-source Python library for security investigations in notebooks, with data queries, enrichment and visualization."
   ],
   [
    "HuntingBookmark",
    "The workspace table where Sentinel stores bookmarks, so they can be queried with KQL."
   ]
  ],
  "example": "During a hunt for credential dumping, an analyst runs the relevant hunting queries, finds three suspicious rows, and bookmarks them with the host and account mapped. She creates an incident from the bookmarks, starts a livestream on the suspicious process hash, and uses an MSTICPy notebook to build a process tree and look up the hash in threat intelligence.",
  "mistakes": [
   [
    "Hunting queries alert automatically once they are enabled.",
    "Hunting queries run only when someone runs them. To alert on a schedule, create an analytics rule."
   ],
   [
    "Query results are evidence enough; you can come back to them later.",
    "Results change as data ages or queries change. Bookmark interesting rows with notes and mapped entities to preserve them."
   ],
   [
    "A livestream can replace an analytics rule permanently.",
    "Livestream suits a temporary watch during an investigation. If it proves valuable, promote the query to an analytics rule."
   ],
   [
    "Notebooks are included in the Sentinel price.",
    "Notebook compute, such as Azure Machine Learning, is billed separately from Sentinel."
   ]
  ],
  "tryit": [
   [
    "During an active investigation at Granite Ridge Credit Union, Leo has identified a suspicious IP address that connected to one server yesterday. He wants to know immediately if it shows up anywhere else over the next few hours, but he does not want to build and tune a full rule for a single indicator that may be gone tomorrow. What should he use?",
    "A livestream session running a hunting query for that IP address against new data. It notifies him of new matches without creating an analytics rule. If the indicator keeps appearing, he can promote the query to an analytics rule."
   ],
   [
    "Leo's hunt found four rows that show the IP address and the account involved. The incident team needs them in the incident process. What are the steps?",
    "Bookmark the rows with notes and mapped entities (account, host, IP address), then create a new incident from the bookmarks or add them to an existing incident."
   ]
  ],
  "tip": "Save evidence from a hunt: bookmark. Watch for new matches without writing a rule: livestream. Python, machine learning or complex enrichment: notebook with MSTICPy.",
  "check": [
   [
    "How does a hunting finding become an incident?",
    "Bookmark the results, then create a new incident from the bookmark or add it to an existing one."
   ],
   [
    "Do hunting queries generate alerts on a schedule?",
    "No. They are run manually; to alert on schedule you create an analytics rule."
   ],
   [
    "What is MSTICPy used for?",
    "Querying security data, enriching it with threat intelligence and geolocation, and visualizing it in notebooks."
   ],
   [
    "When is livestream a better choice than an analytics rule?",
    "During an active investigation, to watch new data for a specific indicator temporarily without building and tuning a full rule."
   ],
   [
    "What is a hunt in Sentinel?",
    "An object that organizes a hunting project end to end, with a hypothesis, queries, status, collaboration and recorded findings."
   ]
  ]
 },
 {
  "t": "Long-term data: search jobs, restore, Sentinel data lake KQL jobs",
  "hook": "On Monday morning, Omar at Fairhaven Mutual reads a partner advisory: a threat actor used a particular domain against insurers eleven months ago. His Sentinel workspace keeps 90 days of interactive data, but the DNS and sign-in logs from last year are sitting in cheaper long-term storage where analytics rules cannot reach. His director wants to know by Wednesday whether Fairhaven was touched, and the finance team wants to know what the search will cost. Should Omar pull back a whole year of data, search for a single string, or schedule something that keeps checking? Which tool answers which question?",
  "simple": "Security logs are expensive to keep in fast, searchable storage, so older logs move to a cheaper archive. You cannot browse the archive directly the way you browse recent logs. Sentinel gives you three ways to reach it. A search job looks through the archive for specific records and copies just those into a new table. A restore brings a whole period, such as one week, back into fast storage so you can analyze it fully, but you pay while it stays there. A KQL job runs a query over the data lake, once or on a schedule, and saves the results where your alerts can use them. Picture a library warehouse: request specific pages, borrow a whole shelf, or set up a standing order.",
  "body": [
   "Older data is where many investigations end up. Investigations often need data older than your interactive retention: a breach discovered months after the first intrusion, a new threat intelligence report about activity last year, or a legal request. Microsoft Sentinel keeps older data cheaply in long-term retention or the Sentinel data lake tier, but that data cannot be queried like interactive analytics data, and analytics rules cannot run on it. Three tools bring it back into reach, and the exam expects you to pick the right one for the job. Interactive retention, the analytics tier, is where full KQL, analytics rules and workbooks operate; everything beyond it is kept for lower cost and needs one of these tools to be useful. For a security operations center (SOC), knowing which tool to reach for saves both time and money.",
   "Search jobs are for finding specific records. A search job scans a table, including its long-term retained data, for records that match a query, and writes the matching records into a new table in the analytics tier. The results table name ends in `_SRCH`. Search jobs run asynchronously, so you can search very large volumes and come back later. They work on analytics tables and on lower-cost plans, and use a restricted set of Kusto Query Language (KQL) operators, essentially filters rather than joins. You pay for the data scanned and for the results stored. Use a search job when you need specific records, such as every event mentioning an IP address across the past year. Think of the results table as a filtered copy: once it exists, you can query it with full KQL like any other analytics table.",
   "Restore is for working through a whole period. Restore brings a whole time slice of a table's long-term data back into the analytics tier, into a table whose name ends in `_RST`. You can then run full KQL against it, including joins, hunting queries and workbooks, as if it were fresh data. Restore is for deep investigation of a period, such as all sign-in logs for the week a breach started. Restored data is billed for as long as it stays restored, so delete the restore when you finish. Because a restore can involve a large volume, narrow it to the tables and the time slice you actually need.",
   "The data lake adds a third option. The Sentinel data lake changes the long-term story. Data in the lake tier can be queried directly with KQL in data lake exploration for interactive investigation. KQL jobs run a KQL query over data lake data, once or on a schedule, and write the results into an analytics-tier table. A scheduled KQL job can, for example, extract indicator matches from months of network logs every day, so detections and workbooks in the analytics tier can use them. KQL jobs can use richer KQL than search jobs, including joins across lake tables, within the limits the service sets. Notebooks can also query the lake with Python for larger analyses. Data lake exploration is good for ad hoc questions, while KQL jobs are good for results you need repeatedly in the analytics tier.",
   "Choosing between them comes down to the question. Need specific matching records from long-term data: use a search job. Need to work interactively on a full time range with every KQL feature: use restore. Data lives in the Sentinel data lake and you want results routinely promoted to the analytics tier: use a KQL job. Summary rules, covered earlier, are for regular aggregation into the analytics tier. Cost awareness is essential, because all these tools bill by data scanned or stored. Narrow the time range and filter as early as possible, test on small ranges first, and remove results tables you no longer need. A search job result is then queried like any table:",
   "```kusto\nDnsEvents_SRCH\n| summarize Lookups = count(), FirstSeen = min(TimeGenerated) by Computer, Name\n| order by FirstSeen asc\n```",
   "Consider a worked example. A threat report says an actor used a specific domain eleven months ago. The SOC runs a search job for that domain across DNS logs held in long-term storage, and the `DnsEvents_SRCH` table shows two hosts that resolved it. They then restore the full week of process and sign-in data around those dates, investigate with joins across the restored `_RST` tables, confirm one host ran a malicious installer, and delete the restore afterward. Finally, because the network logs now live in the data lake, they schedule a KQL job that checks new threat intelligence domains against the lake daily and writes matches to an analytics table where a rule alerts.",
   "Common mistakes: restoring a whole year when you only need a handful of records (use a search job); leaving a restore in place for weeks and paying for it; expecting to run joins inside a search job; pointing an analytics rule at raw data lake tables instead of at KQL job output; and starting a huge search without narrowing the time range.",
   "On the exam, 'find records matching X from last year' means search job; 'investigate everything in that week with full KQL' means restore; 'query the data lake on a schedule and send results to the analytics tier' means KQL job; and the suffixes `_SRCH` and `_RST` identify search and restore results. If a question mentions a results table, the suffix tells you how it was produced, and the clue words 'specific records', 'full investigation of a period' and 'scheduled from the data lake' point to search job, restore and KQL job respectively."
  ],
  "analogy": "Long-term data tools work like a library's off-site warehouse. A search job is asking the librarian to photocopy every page that mentions one name: you get only what matches, delivered later. A restore is borrowing an entire shelf of books to your desk so you can read and cross-reference freely, but you pay a fee for each day you keep it. A KQL job is a standing order that sends you a fresh summary every morning. The analogy breaks on cost detail: search jobs also charge for data scanned.",
  "terms": [
   [
    "Long-term retention",
    "Low-cost storage of data beyond interactive retention, not directly usable by analytics rules."
   ],
   [
    "Search job",
    "An asynchronous search of long-term data whose matching records are written to a _SRCH table."
   ],
   [
    "Restore",
    "Bringing a time range of long-term data back to the analytics tier in a _RST table for full querying."
   ],
   [
    "KQL job",
    "A one-time or scheduled KQL query over the Sentinel data lake that writes results to an analytics-tier table."
   ],
   [
    "Data lake exploration",
    "Interactive KQL querying of data held in the Sentinel data lake tier."
   ],
   [
    "Results table",
    "The analytics-tier table created by a search job, restore or KQL job, which can be queried with normal KQL."
   ],
   [
    "Analytics tier",
    "The interactive tier where full KQL, analytics rules, workbooks and hunting run against recent data."
   ]
  ],
  "example": "A threat report says an actor used a specific domain eleven months ago. The SOC runs a search job for that domain across DNS logs held in long-term storage, and the _SRCH table shows two hosts that resolved it. They then restore the full week of process and sign-in data around those dates to investigate with joins, and delete the restore afterward.",
  "mistakes": [
   [
    "To find a handful of records from last year, restore the whole year.",
    "Use a search job for specific matching records. Restore is for full investigation of a time slice and is billed while it stays restored."
   ],
   [
    "Search jobs support joins across tables.",
    "Search jobs use a restricted set of KQL operators, essentially filters. Joins belong in a restore or in queries against the results table."
   ],
   [
    "Analytics rules can run directly on long-term or data lake data.",
    "Analytics rules run on the analytics tier. Bring results there with a search job, restore or KQL job first."
   ],
   [
    "Once an investigation ends, a restore can be left in place at no cost.",
    "Restored data keeps billing until you delete the restore."
   ]
  ],
  "tryit": [
   [
    "Kira at Oakmont Retail needs to examine every process, sign-in and network event from the week a breach began, nine months ago, using joins and existing hunting queries. The data is in long-term retention. Which tool fits, and what should she do when she is finished?",
    "Restore that week of the relevant tables into the analytics tier (_RST tables), investigate with full KQL including joins, and delete the restore afterward because restored data is billed while it remains."
   ],
   [
    "The same team wants every new threat intelligence domain checked daily against months of DNS logs held in the Sentinel data lake, with matches available to an analytics rule. Which tool fits?",
    "A scheduled KQL job over the data lake that writes matches to an analytics-tier table, where an analytics rule can alert on them."
   ]
  ],
  "tip": "Look for these clues: 'find records matching X from last year' means search job; 'investigate everything in that week with full KQL' means restore; 'query the data lake on a schedule and send results to the analytics tier' means KQL job.",
  "check": [
   [
    "What table name suffix identifies search job results?",
    "_SRCH."
   ],
   [
    "Why delete a restore when the investigation ends?",
    "Restored data is billed for as long as it remains restored."
   ],
   [
    "Where do KQL job results go?",
    "Into a table in the analytics tier, where detections, workbooks and hunting can use them."
   ],
   [
    "You need every event mentioning one IP address over the past year. Search job or restore?",
    "A search job, because it finds specific matching records without restoring whole time ranges."
   ],
   [
    "What table name suffix identifies restored data?",
    "_RST."
   ]
  ]
 },
 {
  "t": "Normalized hunting with ASIM parsers across vendors",
  "hook": "Six months after Lakeshore Bank merged with Prairie Savings, the security team at the combined company still runs two firewall brands, two DNS platforms and two proxies. Every hunt exists in two versions, and last week Grace discovered that a lateral movement hunt had been missing traffic from the Prairie side for months because nobody updated the second copy. Now a third firewall is arriving for a new branch. Her manager asks whether the team really has to write every query three times. Is there a way to write a hunt once and have it cover every vendor, including ones not yet installed?",
  "simple": "Different security products describe the same event in different words. One firewall writes src_ip and accept, another writes SourceAddress and permit. ASIM is a translator built into Microsoft Sentinel. It defines one common set of column names and values for each kind of event, such as network connections, DNS lookups or sign-ins. Small translation functions, called parsers, convert each product's logs into that common format when you run a query. You then write one query against the common format, and it works for every product that has a parser. It is like a universal travel adapter: one plug shape for you, no matter which country's socket is in the wall.",
  "body": [
   "The problem ASIM solves is easy to see in any mixed environment. Most organizations have several firewalls, proxies, DNS servers and identity systems from different vendors. Each logs the same kind of event with different table names, column names and values. One firewall calls the source address SrcIP, another src_ip, a third puts it inside a Syslog message. One says allow, another accept, a third permit. Writing every detection and hunt once per vendor does not scale, and a new product would silently fall outside all of them. For a security operations center (SOC), that means duplicated effort and, worse, gaps that nobody notices until an incident review.",
   "The Advanced Security Information Model (ASIM) solves this by normalizing data, usually at query time. ASIM defines schemas for common event types, including network session, DNS, web session, authentication, process event, file event, registry event, audit event, user management and Dynamic Host Configuration Protocol (DHCP). Each schema has standard column names and value formats, for example SrcIpAddr, DstIpAddr, DstPortNumber and EventResult with values such as Success or Failure, so a query written once means the same thing for every source. The schemas also define standard entity fields, such as user names, host names and IP addresses, so that analytics rules and workbooks can map entities consistently regardless of the source.",
   "Parsers do the translation. Parsers are Kusto Query Language (KQL) functions that read vendor-specific data and output rows in the ASIM schema. There are source-specific parsers, one per product, and unifying parsers that call all the source-specific parsers for a schema and union the results. When you query the unifying parser `_Im_NetworkSession`, you get network sessions from every supported source in one normalized result, without knowing which tables they came from. New sources are added by adding their parser; queries built on the unifying parser pick them up automatically.",
   "Parsers come in two flavors, and the difference affects performance. There are two flavors of unifying parser. Filtering parsers, named with the `_Im_` prefix, accept parameters such as `starttime`, `endtime`, and schema-specific filters like source IP address prefixes or domain names. The filters are pushed down into each source parser, so less data is processed and queries run faster. Parameter-less parsers, named with `_ASim_`, return everything and are handy for exploration. Built-in parsers are deployed with Sentinel and start with an underscore; workspace-deployed versions without the underscore exist for customization. The trade-off is that query-time parsing costs some performance and you rely on parsers existing for your products; for heavy use, ingestion-time normalization into ASIM tables is also possible.",
   "```kusto\n_Im_NetworkSession(starttime = ago(1d), endtime = now())\n| where DstPortNumber == 3389 and EventResult == \"Success\"\n| summarize Sessions = count() by SrcIpAddr, DstIpAddr\n```",
   "This single query finds Remote Desktop Protocol (RDP) sessions across every normalized firewall and network source. The same idea applies to detections: many Sentinel analytics rule templates are built on ASIM so they work across vendors, and Content hub solutions for third-party products often include the matching source-specific parsers. When hunting across vendors, reach for the ASIM unifying parser for the schema first, pass filters as parameters, and only drop to a raw vendor table when you need a field ASIM does not map. Because ASIM columns are consistent, you can also combine schemas: for example, join `_Im_Authentication` results with `_Im_NetworkSession` on the source IP address to see whether an address that failed many sign-ins also opened RDP sessions, whichever identity provider or firewall recorded each event.",
   "Consider a worked example. A company runs two different firewall brands after a merger. Instead of maintaining two versions of each hunt, the SOC rewrites its lateral movement hunts to use `_Im_NetworkSession` with time and port filters, and its DNS tunneling hunt to use `_Im_Dns`. When a third firewall is added and its ASIM parser installed from Content hub, the existing hunts and rules cover it with no changes.",
   "Common mistakes: querying `_ASim_` parsers over long ranges without filters and waiting for slow results; filtering after the parser call when a parameter would push the filter down; editing a built-in underscore parser instead of using a workspace copy; assuming every vendor has a parser; and comparing EventResult to a vendor value like accept instead of the normalized Success. When results look incomplete, a good troubleshooting step is to call a source-specific parser directly to confirm that the product's data is arriving and being normalized as expected.",
   "Exam questions usually describe many vendors and one question. 'One query across different firewalls or DNS servers' means ASIM. 'Improve performance of a normalized query' means passing parameters to an `_Im_` filtering parser. 'Parser with no parameters' is `_ASim_`. 'Normalizes one product' is a source-specific parser; 'combines all sources for a schema' is a unifying parser. 'New source automatically included in existing hunts' is the benefit of building on the unifying parser."
  ],
  "analogy": "ASIM is like a universal travel adapter. Each country (vendor) has its own socket shape (table and column names), but your laptop (query) has one plug. Source-specific parsers are individual adapters for each country, and the unifying parser is a single multi-adapter that accepts every supported socket. Filtering parsers are adapters with a switch that cuts unneeded power early. The analogy breaks for countries without an adapter: a product without an ASIM parser is simply not included.",
  "terms": [
   [
    "ASIM",
    "The Advanced Security Information Model, which normalizes events from different sources into common schemas."
   ],
   [
    "ASIM schema",
    "A standard set of column names and values for one event type, such as network session or DNS."
   ],
   [
    "Source-specific parser",
    "An ASIM function that normalizes data from one product into a schema."
   ],
   [
    "Unifying parser",
    "An ASIM function that combines all source-specific parsers for a schema into one normalized result."
   ],
   [
    "Filtering parser",
    "An _Im_ parser that accepts parameters such as time and IP filters to improve performance."
   ],
   [
    "Query-time normalization",
    "Converting vendor data to a common schema when the query runs, rather than when data is ingested."
   ],
   [
    "_ASim_ parser",
    "A parameter-less unifying parser that returns all normalized data for a schema, useful for exploration."
   ],
   [
    "Ingestion-time normalization",
    "Converting data to an ASIM schema as it is ingested and storing it in normalized tables, trading flexibility for query performance."
   ]
  ],
  "example": "A company runs two different firewall brands after a merger. Instead of maintaining two versions of each hunt, the SOC rewrites its lateral movement hunts to use _Im_NetworkSession with time filters. When a third firewall is added and its ASIM parser installed, the existing hunts cover it with no changes, and the SOC spends its time on new detections instead of rewrites.",
  "mistakes": [
   [
    "Filtering after calling `_ASim_NetworkSession` is just as fast as passing parameters.",
    "Parameters to an `_Im_` filtering parser are pushed down into every source parser, so far less data is processed. Filtering afterward processes everything first."
   ],
   [
    "You can compare EventResult to a vendor value such as accept or permit.",
    "ASIM normalizes values. Compare to the schema values, such as Success or Failure."
   ],
   [
    "It is fine to edit a built-in parser (one whose name starts with an underscore).",
    "Built-in parsers are managed with Sentinel. Customize a workspace-deployed copy (without the underscore) instead."
   ],
   [
    "Every product in the environment is automatically covered by ASIM.",
    "Only sources with an ASIM parser are included. Install parsers, often from Content hub, for new products."
   ]
  ],
  "tryit": [
   [
    "Theo at Summit Freight has three DNS platforms and wants one hunt for very long subdomain queries that might indicate DNS tunneling over the last 24 hours. His first draft calls `_ASim_Dns` with no parameters and filters afterward, and it is slow. What should he change?",
    "Use the filtering unifying parser `_Im_Dns` and pass `starttime` and `endtime` (and any supported filters, such as domain names) as parameters, so filtering happens inside each source parser. Keep normalized column names in the rest of the query so it covers all three platforms."
   ],
   [
    "A new firewall brand is added next month. What must happen for Theo's existing network session hunts, built on `_Im_NetworkSession`, to cover it?",
    "Install or deploy the ASIM source-specific parser for that firewall. The unifying parser then includes it automatically, with no change to the hunts."
   ]
  ],
  "tip": "One query across many vendors for the same event type means ASIM. Use the _Im_ filtering parsers with parameters for performance; _ASim_ parsers take no parameters.",
  "check": [
   [
    "What is the benefit of querying _Im_NetworkSession instead of each firewall's table?",
    "One normalized query covers every supported source, and new sources are included automatically."
   ],
   [
    "Why pass starttime and endtime to a filtering parser?",
    "The filters are applied inside each source parser, reducing processed data and speeding up the query."
   ],
   [
    "Name three ASIM schemas.",
    "Examples: network session, DNS, authentication, process event, web session, file event."
   ],
   [
    "What is the difference between a source-specific and a unifying parser?",
    "A source-specific parser normalizes one product; a unifying parser calls all source-specific parsers for a schema and unions the results."
   ],
   [
    "Which parser prefix takes no parameters?",
    "_ASim_."
   ]
  ]
 },
 {
  "t": "Threat intelligence: TI indicators, TAXII feeds, threat analytics reports in Defender XDR",
  "hook": "A message lands in the shared inbox at Riverbend Water Authority from a regional sharing group: a list of domains and IP addresses tied to a campaign against utilities, plus a note that the feed is also available by automated subscription. Jonah, the only analyst on duty, wonders three things at once. How do these indicators get into Sentinel without someone typing them in? Once they are there, what actually raises an alert when one appears in the logs? And how does he know whether Riverbend is even exposed to the weakness this actor exploits? Which pieces of Microsoft's tooling answer each question?",
  "simple": "Threat intelligence is information about attackers. Some of it is a list of clues, like suspicious web addresses or file fingerprints, called indicators. Some of it is written reports that explain who the attackers are and how they work. Sentinel can automatically pull in indicator lists from sharing services using a standard delivery method called TAXII, which carries data written in a standard format called STIX. Rules then compare those clues with your logs and alert on a match. The Defender portal's threat analytics reports are the written side: they explain a threat and show whether your own devices are affected. It is like a neighborhood watch sharing license plates (indicators) and a newsletter explaining recent burglaries (reports).",
  "body": [
   "Threat intelligence comes in two forms that serve different purposes. Threat intelligence (TI) is information about attackers: who they are, how they operate, and the traces they leave. For a security operations center (SOC) it comes in two main forms. Indicators of compromise (IoCs) are concrete observables such as IP addresses, domains, URLs, file hashes and email addresses associated with malicious activity. Finished intelligence is written analysis of threat actors, campaigns, vulnerabilities and techniques, which tells you what to look for and how to defend. Indicators are easy to match automatically but go stale quickly; finished intelligence lasts longer and shapes priorities. A useful way to think about it: indicators answer 'have we seen this exact thing', while finished intelligence answers 'what should we be worried about and why'.",
   "Indicators need a home and some housekeeping. In Microsoft Sentinel, indicators are stored as Structured Threat Information Expression (STIX) objects and managed on the threat intelligence page, where you can view, search, tag, add and expire them. They are stored in workspace tables so you can query them, and Microsoft has moved to newer STIX-based tables alongside the older ThreatIntelligenceIndicator table. Indicators have properties such as confidence, valid-from and valid-until dates, threat types and source. Expiring old indicators matters: IP addresses change owners, and stale indicators cause false positives. Confidence matters when you triage a match: a low-confidence indicator from a broad feed deserves more checking than a high-confidence one tied to a confirmed campaign.",
   "Getting indicators in is the job of connectors. Indicators get into Sentinel through connectors. Trusted Automated Exchange of Intelligence Information (TAXII) is a standard protocol for sharing STIX data. The Threat Intelligence TAXII connector pulls indicators from a TAXII server; you provide the application programming interface (API) root, collection ID and credentials from the feed provider, and choose a polling frequency. Other routes are the upload API for threat intelligence platforms (TIPs), the Microsoft Defender Threat Intelligence connector for Microsoft's own indicators, and manual entry or file import. Remember the pairing: STIX is the format, TAXII is the transport.",
   "Indicators only help when something compares them with your data. Using indicators is the point. Threat intelligence matching analytics rule templates, often called TI map rules, compare indicators with logs such as DNS, sign-in, firewall and email events and alert on matches. You can also join indicator tables in hunting queries. Defender XDR has its own custom indicators for endpoints (file, IP, URL, certificate), which block or alert on devices, as covered in the Defender for Endpoint lesson. A simple hunting join looks like this:",
   "```kusto\nlet iocs = ThreatIntelligenceIndicator\n| where ExpirationDateTime > now() and isnotempty(DomainName)\n| distinct DomainName;\nDnsEvents\n| where Name in (iocs)\n```",
   "Finished intelligence lives in threat analytics. Threat analytics in the Defender portal delivers finished intelligence from Microsoft security researchers. Each report covers an active threat actor, campaign, attack technique or vulnerability. Its tabs include an overview, the full analyst report with detection and hunting guidance, related incidents and alerts in your tenant, impacted assets, and exposure and mitigations, which shows whether your devices have the relevant patches and secure configurations. The dashboard highlights reports with the most impact on your organization, and you can set up email notifications for new or updated reports. Use it to prioritize: if a report shows ransomware-linked incidents in your tenant and unpatched devices, that is where to spend effort today, and the report's hunting queries check for undetected activity.",
   "Consider a worked example. An information sharing and analysis center (ISAC) shares indicators through a TAXII server. The SOC connects it with the Threat Intelligence TAXII connector and enables TI map rules for DNS and firewall logs. A week later a rule alerts that a server resolved a listed domain. Threat analytics shows the domain belongs to a campaign report, whose exposure and mitigations tab reveals four servers missing the patch the actor exploits. The team patches them, runs the report's hunting queries, and finds no further activity.",
   "Common mistakes: importing indicators with no expiration, so old IP addresses keep firing; confusing STIX and TAXII; ingesting indicators but never enabling a matching rule; treating every indicator match as confirmed compromise without checking confidence and context; and reading threat analytics only for news instead of acting on its exposure data.",
   "Exam questions separate the pieces. 'Pull indicators from a feed provider's server' means the TAXII connector with API root and collection ID. 'Push indicators from a TIP' means the upload API. 'Alert when logs contain a known malicious domain' means a TI map analytics rule. 'Report on an actor with related incidents, impacted assets and patch status in my tenant' means threat analytics. 'Block a hash on endpoints' means a Defender for Endpoint indicator. 'Stale indicators causing false positives' means set expiration dates."
  ],
  "analogy": "STIX and TAXII work like a letter and the postal service. STIX is the standard letter format, with fixed fields for sender, subject and contents, so anyone can read it. TAXII is the mail route that delivers those letters between servers and clients on a schedule. Threat analytics is more like a detailed newspaper investigation that also checks your own house for the unlocked window it describes. The analogy stops at expiry: unlike letters, indicators should be thrown away when they go stale.",
  "terms": [
   [
    "Indicator of compromise (IoC)",
    "An observable such as an IP, domain, URL or hash associated with malicious activity."
   ],
   [
    "STIX",
    "Structured Threat Information Expression, a standard format for describing threat intelligence."
   ],
   [
    "TAXII",
    "Trusted Automated Exchange of Intelligence Information, a protocol for sharing STIX data between servers and clients."
   ],
   [
    "TI map rule",
    "A threat intelligence matching analytics rule that alerts when indicators appear in logs."
   ],
   [
    "Threat analytics",
    "Defender portal reports on active threats, showing related incidents, impacted assets and mitigation status."
   ],
   [
    "Exposure and mitigations",
    "The threat analytics section showing whether your devices have the patches and settings that defend against a threat."
   ],
   [
    "Finished intelligence",
    "Written analysis of threat actors, campaigns and techniques that guides priorities and defenses."
   ],
   [
    "Threat intelligence platform (TIP)",
    "A system that collects and manages indicators and can push them to Sentinel through the upload API."
   ]
  ],
  "example": "An ISAC shares indicators through a TAXII server. The SOC connects it with the Threat Intelligence TAXII connector and enables TI map rules for DNS and firewall logs. A week later a rule alerts that a server resolved a listed domain. Threat analytics shows the domain belongs to a campaign report, whose exposure tab reveals four servers missing the patch the actor exploits.",
  "mistakes": [
   [
    "TAXII is the format of threat intelligence data.",
    "STIX is the format; TAXII is the protocol that transports STIX data between servers and clients."
   ],
   [
    "Ingesting indicators into Sentinel is enough to get alerts.",
    "Indicators produce alerts only when matching analytics rules, such as TI map rules, compare them with logs."
   ],
   [
    "Indicators can be imported with no expiration so nothing is missed.",
    "Stale indicators, especially IP addresses, cause false positives. Set valid-until dates and expire old indicators."
   ],
   [
    "Every indicator match is a confirmed compromise.",
    "Check confidence, source and context. A match is a lead to investigate, not a verdict."
   ]
  ],
  "tryit": [
   [
    "Ingrid at Cedar Valley College receives credentials, an API root and a collection ID from a sector sharing group. She wants indicators to arrive in Sentinel automatically every few hours and to alert when a listed domain appears in DNS logs. What two things must she configure?",
    "First, the Threat Intelligence TAXII connector with the API root, collection ID, credentials and a polling frequency. Second, a threat intelligence matching (TI map) analytics rule for DNS data, so indicator matches create alerts."
   ],
   [
    "Ingrid's director asks whether the college's devices are vulnerable to the technique a new ransomware group is using. Where should she look?",
    "The threat analytics report for that actor or technique in the Defender portal, specifically the exposure and mitigations section, which shows missing patches and secure configurations, along with related incidents and impacted assets."
   ]
  ],
  "tip": "TAXII is the transport and STIX the format. Written reports on actors with exposure and mitigation status in your tenant means threat analytics; matching indicators against logs means TI map analytics rules.",
  "check": [
   [
    "What do you need from a provider to configure the TAXII connector?",
    "The TAXII API root URL, the collection ID, and credentials if required."
   ],
   [
    "Why set expiration dates on indicators?",
    "Indicators, especially IPs, go stale, and expired ones would cause false positives."
   ],
   [
    "Which threat analytics tab shows whether your devices have the relevant patches?",
    "The exposure and mitigations section."
   ],
   [
    "How do imported indicators actually produce alerts in Sentinel?",
    "Through threat intelligence matching (TI map) analytics rules that compare indicators with log data."
   ],
   [
    "How does a threat intelligence platform send indicators to Sentinel?",
    "Through the upload API."
   ]
  ]
 },
 {
  "t": "Graph-based hunting: Sentinel graph and hunting graphs with blast radius",
  "hook": "At 4:15 p.m. on a Thursday, an alert fires at Brightwater Software: credential-stealing behavior on a developer's laptop. Your instinct is to isolate the laptop and move on. But Felix, the senior analyst, asks a different question: what could someone holding this developer's identity reach right now? The developer belongs to groups you have never looked at, has signed in to a build server this week, and might have access to production secrets. Answering that with table joins could take an afternoon. Is there a faster way to see every path from this one laptop to the things that really matter?",
  "simple": "Some security questions are about connections rather than single events. Who can reach this database? If this laptop is hacked, where could the attacker go next? A graph answers these by drawing things (people, computers, apps, cloud resources) as dots and their relationships (member of, has access to, signed in to) as lines between the dots. Following the lines shows possible paths. Blast radius is the set of important things an attacker could reach from one compromised dot. It is like looking at a subway map: from your station, you can see every stop you could reach and which transfers get you there, without riding every line.",
  "body": [
   "Some questions are about events, and others are about relationships. Tables and Kusto Query Language (KQL) are great for asking which events match a condition, but many security questions are about relationships: which users can reach this storage account, how could a compromised laptop lead to a domain admin, or what would an attacker holding this identity be able to touch. Graphs model data as nodes (users, devices, groups, cloud resources, applications) and edges (relationships such as member of, has permission to, logged on to or can authenticate as). Attackers think in graphs, moving from one foothold to the next, so defenders benefit from doing the same. The phrase often used is that defenders think in lists while attackers think in graphs, and graph tools help close that gap.",
   "Sentinel graph provides the relationship model. Microsoft Sentinel graph builds a relationship model of your environment from data in the Sentinel data lake and Microsoft security products, covering identities, devices, cloud resources, permissions and activity. It powers several experiences in the Defender portal and is also available to tools and AI agents that need to reason about connections. Several of these features are recent and their exact names and capabilities may still change, so focus on the concepts: nodes, edges, paths and what can be reached from where.",
   "Hunting graphs put the model to work during a hunt. Hunting graphs let you explore these relationships visually during a hunt in the Defender portal. Instead of writing many joins, you start from an entity, such as a user or a device, and expand its connections to see paths toward sensitive assets. Predefined scenarios answer common questions, such as paths from a user to critical resources, and you can open nodes to see their details and pivot back into advanced hunting queries or incidents. The graph complements KQL rather than replacing it: you use the graph to find the path, and queries to check what actually happened along it. A typical session starts from a suspicious account, expands its group memberships and permissions, and highlights which paths end at assets marked as critical.",
   "Blast radius focuses the graph on a compromise. Blast radius analysis answers the question: if this node is compromised, what can the attacker reach from here? From an incident or an entity, it shows the paths from the compromised user or device to critical targets, for example key vaults, databases, privileged accounts or domain controllers, based on permissions, sessions and network exposure. This helps you prioritize containment: an infected kiosk that reaches nothing sensitive is less urgent than a laptop whose logged-on user administers production. It also helps scope an investigation, because the targets on those paths are where you should look for follow-on activity. In a busy security operations center (SOC), that ranking turns a long queue of compromised entities into an ordered list of what to contain first.",
   "Graph thinking also appears elsewhere in this course. Defender for Identity lateral movement paths are a graph of sessions and admin rights; Microsoft Security Exposure Management attack paths show chains of weaknesses toward critical assets, and its critical asset management marks which targets matter most; the incident graph shows how an incident's entities connect. Sentinel graph brings these ideas into hunting with your own data. Use graph findings on both sides. Operationally, contain the nodes on the most dangerous paths first and hunt along them. Preventively, break paths by removing unnecessary permissions and admin rights, fixing misconfigurations, and protecting critical assets, so that the next compromise has a smaller blast radius.",
   "Edges can come from very different evidence, and knowing which kinds exist helps you read a path. A permission edge might come from an Azure role assignment or a group membership in Microsoft Entra ID. A session edge might come from a recent interactive logon recorded by Defender for Endpoint, which means credentials could be cached on that device. A network edge might come from exposure between a device and a server. Each type of edge suggests different follow-up: check access logs for permission edges, logon events for session edges, and connection logs for network edges.",
   "Consider a worked example. A developer's laptop is flagged with a credential-stealing alert. Blast radius analysis from the incident shows the developer's account has a path through a group membership to a production key vault holding database secrets, and a second path through a cached session to a build server. The SOC contains the device, revokes the user's sessions, and rotates the key vault secrets. They then hunt along both paths with KQL, checking key vault access logs and build server logons for the last week, and find no access. Afterward the identity team removes the developer group's standing access to production and replaces it with just-in-time elevation, shrinking the blast radius for the next incident.",
   "Common mistakes: treating a path in the graph as proof that the attacker used it (it shows what is possible; logs show what happened); containing only the first device and ignoring the more dangerous identity attached to it; relying on graphs when the underlying data is missing, which leaves hidden edges; forgetting to mark critical assets, so blast radius cannot highlight what matters; and using the graph for questions that a simple KQL filter answers faster.",
   "Exam questions separate relationship questions from event questions. 'What could an attacker reach from this compromised identity or device' means blast radius or an attack path view. 'Explore connections from a user to sensitive resources during a hunt' means hunting graphs. 'How could a helpdesk account reach a domain admin' in Active Directory means Defender for Identity lateral movement paths. 'Which events match this condition' means a KQL query. 'Reduce future blast radius' means removing excess permissions and admin rights."
  ],
  "analogy": "A hunting graph is like a subway map for your environment. Stations are users, devices and resources, and lines are relationships such as group membership, permissions and recent sessions. Blast radius is asking which important stations you can reach from the one where the attacker boarded, and which transfers lead there. The map shows routes that exist, not trips anyone took: to know whether the attacker actually traveled a route, you still check the ticket logs with KQL.",
  "terms": [
   [
    "Graph",
    "A data model of nodes (entities) and edges (relationships) used to analyze connections."
   ],
   [
    "Node and edge",
    "A node is an entity such as a user or device; an edge is a relationship between two nodes, such as member of."
   ],
   [
    "Sentinel graph",
    "A relationship model of identities, devices, resources and activity built on Sentinel data lake and Microsoft security data."
   ],
   [
    "Hunting graph",
    "A visual, interactive exploration of entity relationships during a hunt in the Defender portal."
   ],
   [
    "Blast radius",
    "The set of assets an attacker could reach from a compromised user or device, shown as paths to critical targets."
   ],
   [
    "Attack path",
    "A chain of relationships and weaknesses that could lead an attacker from an entry point to a critical asset."
   ],
   [
    "Critical asset",
    "A resource marked as highly important, such as a domain controller or key vault, which blast radius and attack path views highlight as targets."
   ]
  ],
  "example": "A developer's laptop is flagged with a credential-stealing alert. Blast radius analysis shows the developer's account has a path through a group membership to a production key vault holding database secrets. The SOC contains the device, revokes the user's sessions, rotates the key vault secrets, and hunts along that path for any access in the last week.",
  "mistakes": [
   [
    "A path in the graph proves the attacker used it.",
    "A path shows what is possible. Confirm actual use by querying logs along the path with KQL."
   ],
   [
    "Containing the compromised device is enough.",
    "The identity attached to the device may reach far more. Revoke sessions, reset credentials and protect the critical assets on the dangerous paths."
   ],
   [
    "Graphs replace KQL for hunting.",
    "Graphs find relationships and paths; KQL checks what actually happened. For simple 'which events match' questions, a KQL filter is faster."
   ],
   [
    "Blast radius works well even if critical assets are not marked.",
    "Without critical asset definitions, blast radius cannot highlight what matters most. Mark critical assets so paths to them stand out."
   ]
  ],
  "tryit": [
   [
    "Two devices at Orchard Health are flagged within minutes of each other. One is a lobby kiosk with no signed-in privileged users. The other is a laptop whose user is a member of a group that administers the production database servers. The team can contain only one immediately. Which should they contain first, and what tool supports that decision?",
    "The laptop. Blast radius analysis would show paths from its user to production database servers, while the kiosk reaches nothing sensitive. Contain the laptop and revoke the user's sessions first, then handle the kiosk."
   ],
   [
    "After the incident, the identity team asks how to make the next compromise of a developer account less damaging. What should they change?",
    "Break paths by removing standing permissions and unnecessary admin rights, for example replacing permanent production access with just-in-time elevation, fixing misconfigurations, and protecting critical assets. This shrinks the blast radius."
   ]
  ],
  "tip": "When a question asks what an attacker could reach from a compromised identity or device, the answer is blast radius or an attack path view; when it asks which events match a condition, it is a KQL query.",
  "check": [
   [
    "What question does blast radius analysis answer?",
    "Which critical assets an attacker could reach from a compromised user or device, and by what paths."
   ],
   [
    "Why are graphs useful for hunting compared with tables alone?",
    "They show multi-step relationships such as permissions and sessions directly, instead of requiring many joins."
   ],
   [
    "How do graph findings improve prevention?",
    "They reveal paths you can break by removing excess permissions and admin rights and fixing misconfigurations."
   ],
   [
    "Does a path in a hunting graph prove the attacker used it?",
    "No. It shows what is possible; you confirm actual use by querying logs along the path."
   ],
   [
    "Which Defender for Identity feature shows how an attacker could move through Active Directory using sessions and admin rights?",
    "Lateral movement paths."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
