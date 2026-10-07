/* Lessons for Fortinet NSE 4 - FortiOS 7.6 Administrator (NSE4_FGT_AD-7.6): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("fortinet-fortigate", [
 {
  "t": "Initial setup: default management IP 192.168.1.99, admin account, forced password change, interface roles and access (HTTPS, SSH, ping)",
  "hook": "It is Monday morning at Cedar Valley Clinic, and a sealed FortiGate box sits on your desk next to a laptop and a single patch cable. The clinic's old router died over the weekend, the front desk cannot reach the scheduling system, and the practice manager keeps glancing at the clock. There is no printed password in the box and no setup wizard on a sticker. You know the unit can be managed through a browser, but which address do you type, which account do you use, and what will stop you from locking yourself out the moment you start changing interfaces?",
  "simple": "A new FortiGate comes out of the box with the same starting settings every time, a bit like a new phone that always starts on the same welcome screen. It listens on one fixed address, 192.168.1.99, on its management port. You plug a laptop into that port, give the laptop an address close to that one, open a web browser and go to the secure (HTTPS) page at 192.168.1.99. You log in with the username admin and no password, and the FortiGate immediately makes you pick a real password. After that, each network port has a short list of ways it is allowed to be managed, such as the secure web page, a remote text console called SSH, or answering ping. If you take the web page off the port you are using, you lock yourself out.",
  "body": [
   "Every FortiGate you unbox starts from the same known state, and the NSE 4 exam expects you to know that state cold. A hardware FortiGate ships with the address 192.168.1.99 on its management interface. Depending on the model, that port may be labelled MGMT, or it may be the internal switch ports or port1 on smaller desktop units. The default subnet mask is /24, so the unit owns 192.168.1.99 in the 192.168.1.0/24 network and many small models also run a DHCP (Dynamic Host Configuration Protocol) server on that internal segment.",
   "To make the first connection, you cable a laptop to that interface and give the laptop an address in the same subnet, for example 192.168.1.50 with a 255.255.255.0 mask, unless the laptop already received one by DHCP. You then open a web browser and go to 192.168.1.99 over HTTPS (Hypertext Transfer Protocol Secure). HTTPS is the default protocol for the graphical user interface (GUI), and a plain HTTP request is redirected to HTTPS. Expect a certificate warning on that first visit, because the unit presents a self-signed certificate; that warning is normal on a factory unit and is not a sign of a fault.",
   "The default administrator account is named admin and has a blank (empty) password. FortiOS does not let you keep it that way: the first time you log in, the unit forces you to set a new password before it lets you do anything else. This forced change closes the most obvious hole on a new device. There is no root account and no serial-number login on a FortiGate, which makes both of those favorite distractors on the exam. Registering the unit with FortiCloud is useful for support and licensing, but it is optional for local management and is not required just to log in.",
   "Once you are in, interfaces carry a role that describes their place in the network. The built-in roles are LAN, WAN and DMZ (demilitarized zone), plus Undefined. The role is mostly a convenience that shows or hides fields that make sense for that kind of port. A WAN interface, for example, exposes settings such as estimated bandwidth, while a LAN interface makes it easy to enable a DHCP server and create an address object for the subnet. The role does not by itself change how traffic is filtered. Firewall policies still decide what passes, so a port labelled WAN is not automatically protected and a port labelled LAN is not automatically trusted.",
   "Each interface also has an Administrative Access setting that lists which management services the FortiGate itself will answer on that interface. HTTPS opens the GUI, SSH (Secure Shell) opens the command-line interface (CLI) remotely, and PING makes the interface reply to ICMP (Internet Control Message Protocol) echo requests. Other options include HTTP, SNMP (Simple Network Management Protocol), FMG-Access for FortiManager, and Security Fabric Connection, which was formerly called FortiTelemetry. These settings control traffic destined to the FortiGate, not traffic passing through it.",
   "Administrative access is a common source of lockouts. If you remove HTTPS from the interface you are managing over, the GUI stops responding the moment you click Apply. The same happens if you change the interface IP and forget that your laptop is still on the old subnet. When that happens, you recover through another interface that still allows management, through SSH if it is still allowed, or through the physical console port. On a WAN interface that faces the internet, good practice is to allow little or nothing, and to rely on trusted hosts and a VPN (virtual private network) for remote management instead of exposing the GUI to the world.",
   "In a lab you will set a static IP on an interface in the GUI under Network and Interfaces, or with the CLI. The CLI equivalent is short, and knowing both the GUI path and the `allowaccess` keyword helps you answer questions phrased either way:",
   "```\nconfig system interface\n    edit port1\n        set ip 10.0.0.1/24\n        set allowaccess ping https ssh\n    next\nend\n```",
   "Notice that `set allowaccess` replaces the whole list rather than adding to it. If you type `set allowaccess ping` on the interface you are using for HTTPS, you have just removed HTTPS and SSH. To add a single service to an existing list, FortiOS offers `append allowaccess`, and `show system interface port1` lets you confirm the result before you disconnect. Treat that habit, check the list before and after, as part of every interface change."
  ],
  "analogy": "Think of the FortiGate as a new office building and each interface as an entrance. The Administrative Access list is the sign on each door that says who may come in to talk to building management: the web visitors, the console technicians, or people just knocking to see if anyone is home (ping). Take the web visitors off the sign at the door you are standing in, and you are locked outside. The analogy stops at traffic passing through the building: the door signs do not decide that, firewall policies do.",
  "terms": [
   [
    "Management IP (192.168.1.99)",
    "The default address on a factory FortiGate's management or internal interface, reached over HTTPS for first login."
   ],
   [
    "Default admin account",
    "The built-in account named admin with a blank password; FortiOS forces a new password at the first login."
   ],
   [
    "Administrative access",
    "The per-interface list of management services (HTTPS, SSH, PING, SNMP and others) that the FortiGate will answer on that interface."
   ],
   [
    "Interface role",
    "A label (LAN, WAN, DMZ or Undefined) that tailors which configuration fields are shown for an interface; it does not filter traffic on its own."
   ],
   [
    "allowaccess",
    "The CLI keyword under a system interface that sets which management protocols the interface accepts; `set` replaces the list, `append` adds to it."
   ]
  ],
  "example": "A technician cables a laptop to a new FortiGate's MGMT port, sets the laptop to 192.168.1.50/24, browses over HTTPS to 192.168.1.99, accepts the self-signed certificate warning, logs in as admin with a blank password, and is immediately forced to create a new admin password.",
  "mistakes": [
   [
    "The default login is admin with the password 'admin', or the serial number is the password.",
    "The default admin password is blank. There is no serial-number or root login; FortiOS forces you to set a new password at first login."
   ],
   [
    "Setting an interface role to WAN blocks inbound traffic on that port.",
    "The role only changes which settings are shown. Firewall policies, including the implicit deny, decide what traffic passes."
   ],
   [
    "Administrative access controls which traffic can pass through an interface.",
    "It controls only management traffic addressed to the FortiGate itself, such as HTTPS, SSH and ping to the interface IP. Transit traffic is governed by firewall policies."
   ],
   [
    "`set allowaccess ssh` adds SSH to the existing list.",
    "`set` replaces the entire list, which can silently remove HTTPS. Use `append allowaccess` to add a service, and check the result with `show`."
   ]
  ],
  "tryit": [
   [
    "You are managing a branch FortiGate over HTTPS on port1. A colleague asks you to stop the interface from answering ping, so you plan to type `set allowaccess https` under port1. SSH is also enabled today and the remote team uses it for scripts. What happens if you run that command, and what should you do instead?",
    "The command replaces the entire list, so HTTPS stays but both PING and SSH are removed, breaking the remote team's scripts. Run `set allowaccess https ssh` (listing every service you want to keep, minus ping), then confirm with `show system interface port1` before you end the session."
   ],
   [
    "A new FortiGate does not respond when you browse to 192.168.1.99 from your laptop. The cable is plugged into the MGMT port and the link light is on. Your laptop shows an address of 10.20.30.15. What is the most likely cause?",
    "The laptop is in a different subnet, so it cannot reach 192.168.1.99 directly. Give the laptop an address such as 192.168.1.50/24 (or let it get one by DHCP if the model offers it) and try again over HTTPS."
   ]
  ],
  "tip": "Losing GUI access after an interface change is almost always a missing HTTPS entry in that interface's Administrative Access, or an IP change that moved the interface away from your laptop's subnet. Confirm allowaccess before you disconnect.",
  "check": [
   [
    "What address and credentials do you use for the very first login to a factory-default hardware FortiGate?",
    "Browse over HTTPS to 192.168.1.99 and log in as admin with a blank password; FortiOS then forces you to set a new password."
   ],
   [
    "You removed HTTPS from the interface you manage over and lost the GUI. What setting caused it?",
    "The interface's Administrative Access (allowaccess) list no longer includes HTTPS, so the FortiGate stops answering GUI requests there."
   ],
   [
    "Does an interface role of WAN block traffic by itself?",
    "No. The role only tailors the shown settings; firewall policies decide what traffic passes."
   ],
   [
    "Which administrative access option lets other Fortinet devices connect to this interface to join the Security Fabric?",
    "Security Fabric Connection, formerly called FortiTelemetry."
   ]
  ]
 },
 {
  "t": "Administrator accounts: admin profiles, trusted hosts, MFA for admins, password policy",
  "hook": "At Lakeshore Freight, an external auditor named Priya arrives with a checklist and a polite smile. Her first question is simple: who can change the firewall, from where, and how do you know the person typing is really them? The IT lead, Marcus, opens the FortiGate and finds three people sharing the admin account, logins allowed from any address on the internet, and no second factor. Priya also needs her own access to read logs for the week, but she must not be able to change anything. Which FortiGate controls answer each of her questions, and how do you set them up without giving her too much power?",
  "simple": "Protecting the firewall's own login comes down to four separate locks. The first decides what an administrator is allowed to touch, like a building key card that opens some rooms and not others. The second decides where they can log in from, like a rule that you may only enter through the staff door. The third asks for a second proof of identity, such as a code from a phone or a small token, so a stolen password alone is not enough. The fourth sets rules for passwords themselves, such as how long they must be and when they expire. Each lock does one job. A question about where someone logs in from is answered by the second lock, not by the code or the password rules.",
  "body": [
   "Protecting the FortiGate itself is a core skill in the deployment and system configuration domain, and it rests on four independent controls: administrator profiles, trusted hosts, multi-factor authentication and a password policy. Each control answers a different question. The exam often gives you a scenario and asks which one applies, so the most useful thing you can do is attach each control to its question: what may this admin do, where may they log in from, how do we prove it is them, and how strong must their password be.",
   "An administrator profile, also called an access profile, controls what an admin may do. It grants None, Read or Read/Write access per feature area, such as System, Network, Firewall, Log and Report, Security Profile, VPN (virtual private network) and User and Authentication. The built-in super_admin profile grants full read-write access everywhere and cannot be edited or deleted. FortiOS also ships a prof_admin profile with broad rights, and you can build as many custom profiles as you need. For an auditor who must see logs but change nothing, you create a custom profile with Read access to Log and Report, None elsewhere, and assign it to the auditor's own account. Profiles control what, not where.",
   "Trusted hosts control where an admin may log in from. Each administrator account can list a small number of trusted source addresses or subnets, for example 10.10.99.0/24 for the management network. Once any trusted host is configured on an account, login attempts for that account from any other source are refused, even when the password is correct. Because the check is on the source address, a stolen password is useless from outside the trusted range, which also blunts password guessing from the internet. This is the most direct way to enforce a rule like 'admins may manage only from the management subnet'. If the entries are left at 0.0.0.0/0, the account can log in from anywhere, which is the risky default an auditor will flag.",
   "Trusted hosts are configured per account, which has an important side effect. If one admin account has trusted hosts and another does not, the second account can still be used from anywhere. For the control to be meaningful, every administrator account needs consistent trusted hosts. In the command-line interface (CLI) you will see this under `config system admin` as `set trusthost1 10.10.99.0 255.255.255.0`, with additional entries named trusthost2, trusthost3 and so on.",
   "Multi-factor authentication (MFA), sometimes called two-factor authentication, adds a second proof beyond the password. On a FortiGate this is typically a FortiToken one-time code, from either a hardware token or the FortiToken Mobile app, or a code sent by email or SMS (Short Message Service). MFA defends against stolen, phished or guessed passwords, because the attacker would also need the token. It does not restrict source networks, so it is never the answer to a 'from which subnet' question. Administrators can also be authenticated against remote servers such as RADIUS (Remote Authentication Dial-In User Service) or LDAP (Lightweight Directory Access Protocol), which is how many organizations tie admin access to central identities.",
   "The password policy sets complexity and lifetime rules: minimum length, required character classes such as uppercase, lowercase, numbers and special characters, and an expiry period that forces periodic changes. It applies to local administrator passwords and can optionally apply to IPsec pre-shared keys. A password policy raises the cost of guessing, but it says nothing about who is authorized to do what or where they log in from. In the CLI it lives under `config system password-policy`.",
   "Account hygiene ties these controls together. Each person should have a named account rather than sharing admin, because named accounts make the event log meaningful: you can see that jlee changed policy 12 at 14:05, rather than that someone using admin did. Shared accounts also make it impossible to revoke one person's access without changing everyone's password. Many teams keep the built-in admin account for emergencies only, with a strong password stored securely.",
   "A strong build combines all four controls: least-privilege profiles, trusted hosts locking management to a jump network or management subnet, MFA on every admin, and a password policy that enforces length and expiry. In a lab you will create a read-only Log and Report profile, assign it to a new account, add a trusted host to your own account and try logging in from another address, then enable a token and confirm each control does exactly what its name says and nothing more."
  ],
  "analogy": "Picture a bank vault room. The admin profile is the list of drawers a key opens. Trusted hosts are the rule that staff may enter only through the back corridor, so a valid key used at the front door still fails. MFA is the guard who checks your badge photo as well as your key. The password policy is the rule about how complex the key's cut must be. Where the analogy stops: on a FortiGate, trusted hosts are set per account, so one account without them is an unlocked corridor.",
  "mnemonic": "What, Where, Who, How strong: Profile decides What, Trusted hosts decide Where, MFA proves Who, Password policy decides How strong.",
  "terms": [
   [
    "Admin profile (access profile)",
    "Per-feature None, Read or Read/Write permissions that define what an administrator can do; super_admin is the full built-in profile and cannot be edited."
   ],
   [
    "Trusted hosts",
    "A per-account list of allowed source addresses or subnets; once set, logins for that account from any other address are refused."
   ],
   [
    "MFA / two-factor for admins",
    "A second login factor, such as a FortiToken code, that protects against stolen passwords but does not limit source networks."
   ],
   [
    "Password policy",
    "Rules for admin password length, character complexity and expiry, optionally applied to IPsec pre-shared keys."
   ],
   [
    "Least privilege",
    "Giving each account only the permissions it needs, for example read-only log access for an auditor."
   ]
  ],
  "example": "An auditor needs to read logs but must not change anything, so the admin creates a named account with a custom profile that has Read access to Log and Report and None elsewhere, adds a trusted host for the audit subnet, and requires a FortiToken code at login.",
  "mistakes": [
   [
    "Enabling MFA is the way to limit admins to the management subnet.",
    "MFA proves identity but does not restrict source addresses. Trusted hosts on each account limit where logins can come from."
   ],
   [
    "Setting trusted hosts on the main admin account protects the whole FortiGate.",
    "Trusted hosts are per account. Any other admin account without trusted hosts can still log in from anywhere, so configure them on every account."
   ],
   [
    "Giving the auditor the super_admin profile but asking them not to change anything is acceptable.",
    "That violates least privilege and the profile cannot be trimmed. Create a custom profile with Read access only to the areas the auditor needs."
   ],
   [
    "A strict password policy stops admins from logging in from the internet.",
    "Password policy only controls password strength and expiry. Source restrictions come from trusted hosts and from limiting administrative access on WAN interfaces."
   ]
  ],
  "tryit": [
   [
    "A security manager says: 'After a phishing campaign, I am worried that a stolen admin password could be used from the attacker's home network. Our admins always work from 10.50.0.0/24 or over the corporate VPN, which assigns 10.60.0.0/24.' Which two controls address this best, and how would you configure them?",
    "Configure trusted hosts on every admin account for 10.50.0.0/24 and 10.60.0.0/24 so logins from any other source are refused, and enable MFA (for example FortiToken) so a stolen password alone is not enough even from an allowed subnet. Password policy and profiles do not address this specific threat."
   ]
  ],
  "tip": "When a question asks how to restrict where an admin logs in from, the answer is trusted hosts, not MFA or password policy. Profiles answer what they can change, not where.",
  "check": [
   [
    "Which control lets you require that admins log in only from 10.10.99.0/24?",
    "Trusted hosts on each admin account; other source addresses are then refused regardless of the password."
   ],
   [
    "An admin must view reports but change nothing. What do you create?",
    "A custom admin profile with Read access to Log and Report (and None elsewhere), assigned to that person's own account."
   ],
   [
    "Does MFA restrict which network an admin can log in from?",
    "No. MFA adds a second authentication factor but does not limit source addresses; trusted hosts do that."
   ],
   [
    "Can you edit the built-in super_admin profile to remove VPN rights?",
    "No. super_admin cannot be edited; create a custom profile with the permissions you want instead."
   ]
  ]
 },
 {
  "t": "Firmware management: the upgrade path, config backups and restore",
  "hook": "It is 11 p.m. at Northgate Library District, and Sam has a maintenance window until 1 a.m. to bring the main FortiGate up to the current FortiOS release. The unit is running a build from a few years ago, and the newest image is already sitting in Sam's downloads folder. It would take one click to upload it and reboot. But the library's catalog, public Wi-Fi and staff VPN all depend on this box, and the nearest spare is forty minutes away. If something goes wrong halfway, how does Sam get back to a working configuration before patrons arrive in the morning?",
  "simple": "Firmware is the operating software inside the firewall. Updating it is like moving house: you pack carefully before you leave, and you follow a route that the roads actually allow. The packing is a backup, a saved copy of all your settings, so you can put everything back if something breaks. The route is the upgrade path, a list from Fortinet of which in-between versions you must install, in order, when you are jumping a long way from an old version to a new one. Skipping stops can scramble your settings, much like trying to drive straight through a river. If the move goes badly, a restore puts the saved settings back.",
  "body": [
   "Firmware upgrades are routine, and doing them carelessly can corrupt a configuration or leave a remote unit unreachable, so Fortinet defines a disciplined procedure that the exam expects you to follow. The two ideas that matter most are the supported upgrade path and the configuration backup. Everything else, from reading release notes to verifying health between steps, supports those two ideas.",
   "FortiOS does not always let you jump straight from an old build to the newest one. When the internal configuration format changes between releases, Fortinet publishes an upgrade path: an ordered list of intermediate builds you install in sequence so that each step can convert the configuration cleanly. Moving a unit from an older 7.0 build to 7.6, for example, may require stepping through specific 7.2 and 7.4 builds first. Skipping steps can silently drop or mangle settings, and the damage may not be obvious until a policy or VPN (virtual private network) quietly stops working. You look up the path for your exact model and starting build in Fortinet's upgrade path tool or in the release notes before you begin.",
   "Release notes are part of the plan, not an afterthought. For each build they list the supported upgrade path, resolved issues, known issues, and any behavior changes, such as a feature that has been renamed or a default that has changed. Reading them tells you whether a step will affect something you rely on, and whether any special preparation is required before you upgrade.",
   "Always take a configuration backup before upgrading. A backup is a text file containing the whole configuration. You can save it in the clear or, better, encrypt it with a password. An encrypted backup can only be restored to a FortiGate, and only with that password, so store the password safely, because a lost password means an unusable backup. In the GUI (graphical user interface) you find backup under the admin menu in the top right corner; from the CLI (command-line interface) you use `execute backup config` followed by a destination such as a TFTP (Trivial File Transfer Protocol) or FTP (File Transfer Protocol) server or a USB drive.",
   "Backups are tied to the device and firmware they came from. Restoring a backup taken on one model, or on very different firmware, to another unit may fail or produce an incomplete configuration. That makes backups the right tool for rollback and for cloning identical units, not for migrating between models. A clean, verified backup taken just before the change, with the build number noted in the file name, is the one you want in your hand at midnight.",
   "The restore operation loads a saved configuration and reboots the unit. Because restoring replaces the running configuration entirely, it is your rollback plan: if an upgrade misbehaves, you reinstall the previous firmware and restore the backup that matches it. Restoring a configuration taken on the same model and the same firmware is the safe case. Restoring an older configuration onto newer firmware may work, because the unit tries to convert it, but it is exactly the kind of jump the upgrade path exists to manage.",
   "Where the firmware comes from matters as well. You download images from the Fortinet support portal for your exact model, or, when the unit is registered and licensed, the GUI firmware page can list the builds available for that model directly from FortiGuard. Whatever the source, keep console or out-of-band access available for remote sites, because an upgrade that fails to come back up is far easier to recover when someone can reach the console port. Schedule the work in a maintenance window and tell users in advance, since every step in the path ends with a reboot.",
   "The workflow to memorize is short. Check the upgrade path for your model and build. Read the release notes for known issues. Back up the configuration and verify that the file is complete. Upgrade one step at a time following the path. After each step, confirm the unit is healthy, for example with `get system status` to see the running build and serial number, and by testing key traffic, before moving to the next step.",
   "High availability changes how the upgrade runs but not the discipline. In an FGCP (FortiGate Clustering Protocol) cluster, FortiOS normally performs an uninterrupted, rolling upgrade: it upgrades the secondary units first, fails traffic over, and then upgrades the former primary, so the cluster keeps forwarding traffic. You still follow the same upgrade path and backup routine, and you still verify cluster health after each step."
  ],
  "analogy": "An upgrade path is like a flight itinerary with required connections. You cannot fly a small regional plane directly across an ocean; you connect through hubs that can handle the next leg. Each FortiOS step is a hub where the configuration is repacked for the next leg. The backup is your travel insurance. Where the analogy stops: missing a connection usually just delays you, but skipping a firmware step can quietly lose settings that you only discover later.",
  "mnemonic": "Path, Notes, Backup, Step, Verify: check the Path, read the Notes, take a Backup, upgrade one Step at a time, Verify before the next.",
  "terms": [
   [
    "Upgrade path",
    "The ordered sequence of intermediate FortiOS builds Fortinet requires between two versions so the configuration converts correctly."
   ],
   [
    "Configuration backup",
    "A saved copy of the whole FortiGate configuration, optionally encrypted with a password, used for rollback or cloning identical units."
   ],
   [
    "Encrypted backup",
    "A backup protected with a password; it can only be restored to a FortiGate and only with that password."
   ],
   [
    "Restore",
    "Loading a saved configuration file, which replaces the running configuration and reboots the unit."
   ],
   [
    "Release notes",
    "Fortinet's per-build document listing the supported upgrade path, resolved issues, known issues and behavior changes."
   ]
  ],
  "example": "Before moving a FortiGate from a 7.0 build to 7.6, an admin takes an encrypted backup, records the password in the team vault, looks up the supported upgrade path, and installs the required 7.2 and 7.4 builds in order, checking `get system status` and test traffic after each reboot, rather than flashing 7.6 directly.",
  "mistakes": [
   [
    "You can always upload the newest firmware directly, because FortiOS converts any old configuration automatically.",
    "Conversion is only guaranteed along the published upgrade path. Large jumps can drop or corrupt settings, so install the listed intermediate builds in order."
   ],
   [
    "A backup from one FortiGate model is a good way to migrate to a different, larger model.",
    "Backups are model and often firmware specific. They are meant for rollback and for cloning identical units, not cross-model migration."
   ],
   [
    "An encrypted backup can be opened by Fortinet support if you forget the password.",
    "The password is required to restore an encrypted backup. A lost password makes the backup unusable, so store it securely."
   ],
   [
    "Restore merges the saved settings into the current configuration.",
    "Restore replaces the entire running configuration and reboots the unit."
   ]
  ],
  "tryit": [
   [
    "Your manager wants a FortiGate upgraded tonight from an old 7.0 build to 7.6. The release notes for 7.6 show that your starting build is not on the direct upgrade list, and the path tool lists two intermediate builds. Your window is two hours, and each reboot takes about ten minutes. What do you do?",
    "Follow the path. Take and verify an encrypted backup, then install the first intermediate build, verify health, install the second, verify again, and only then install 7.6. Two hours is enough for three reboots plus checks. Flashing 7.6 directly to save time risks configuration loss that would cost far more than the extra reboots."
   ]
  ],
  "tip": "Never flash the newest image straight over a much older build. Follow the published upgrade path step by step, and take an encrypted backup first so you can roll back.",
  "check": [
   [
    "Why not install the newest firmware directly over a very old build?",
    "The configuration format may have changed; the published upgrade path steps through intermediate builds so the configuration converts cleanly instead of being lost or corrupted."
   ],
   [
    "What should you do before any upgrade?",
    "Check the upgrade path and release notes, then back up the configuration (ideally encrypted) so you can roll back if the upgrade misbehaves."
   ],
   [
    "Can you restore an encrypted backup without its password?",
    "No. An encrypted backup requires the password to restore, so a lost password makes the backup unusable."
   ],
   [
    "What happens to the running configuration when you restore a backup?",
    "It is replaced entirely by the backup and the FortiGate reboots."
   ]
  ]
 },
 {
  "t": "VDOMs: what they separate, root VDOM, when to use multi-VDOM",
  "hook": "Bluewater Managed Services has just signed two new clients: a dental group and a small accounting firm. Both use 10.0.0.0/8 internally, both want their own firewall rules, and both want their own administrator who can log in and see only their network. Your manager, Elena, does not want to buy and rack two more appliances; there is already a capable FortiGate in the data center with spare capacity. She asks you whether one box can really act as two separate firewalls, with overlapping addresses that never collide and admins who cannot see each other's rules. Can it, and what is the catch?",
  "simple": "A virtual domain, or VDOM, lets one physical FortiGate pretend to be several separate firewalls. Think of an apartment building: one building, but each apartment has its own front door, its own keys and its own furniture, and neighbors cannot walk into each other's rooms. Each VDOM gets its own network ports, its own rules about what traffic is allowed, its own map of where to send traffic, and its own administrators. By default the FortiGate has just one VDOM, called root, and you do not notice it. You turn on multiple VDOMs only when you truly need that separation, for example when hosting different customers on the same box.",
  "body": [
   "A virtual domain, or VDOM, lets one physical FortiGate behave like several independent firewalls. Each VDOM has its own interfaces, firewall policies, routing table, security profiles, objects and administrators, and traffic in one VDOM is isolated from the others unless you deliberately connect them. This is how a single appliance can serve two separate customers, or a production network and a lab, without their rules or routes leaking into each other.",
   "By default a FortiGate runs with a single VDOM called root, and multi-VDOM mode is off. In this state you do not see the word VDOM much in the GUI (graphical user interface); you simply configure the box. When you enable multi-VDOM mode, either in the GUI or in the CLI (command-line interface) with `config system global` and `set vdom-mode multi-vdom`, the root VDOM remains and you can create more. Enabling the mode logs you out, and when you log back in the GUI shows a Global context and a selector for each VDOM.",
   "The root VDOM is special. By default it is the management VDOM, which carries the FortiGate's own management traffic, such as FortiGuard updates, logging to FortiAnalyzer, NTP (Network Time Protocol) and DNS (Domain Name System) queries made by the system itself. The root VDOM always exists and cannot be deleted. The management role can be moved to another VDOM if your design requires it, but the exam's default answer is that root handles management.",
   "Settings fall into two scopes. Global settings apply to the whole appliance regardless of VDOMs: the firmware, high availability, the hostname, physical interface properties, FortiGuard settings and the administrator accounts and profiles defined at the global level. Per-VDOM settings are everything that makes a VDOM its own firewall: the interfaces assigned to it, its static and dynamic routes, its firewall policies, address objects and security profiles, and its VPN (virtual private network) tunnels. An administrator who has global access can see everything; an administrator assigned to one VDOM sees and manages only that VDOM.",
   "Interfaces are assigned one at a time. An interface, including a VLAN (virtual local area network) subinterface, belongs to exactly one VDOM at any moment. Because each VDOM has its own routing table, two VDOMs can use the same IP ranges without conflict, which is why VDOMs solve the overlapping address problem that a single routing table cannot.",
   "Isolation is broken only where you allow it. To pass traffic between VDOMs you create an inter-VDOM link, which is a virtual back-to-back pair of interfaces, with one end in each VDOM. You then add routes and firewall policies in both VDOMs to permit the traffic. Without that link, plus matching policies and routes, there is no path between VDOMs at all, which is exactly the property a multi-tenant design needs.",
   "Administrators can be scoped precisely. When you create an admin account in multi-VDOM mode, you choose which VDOMs it can manage and combine that with an admin profile. A tenant admin assigned only to a customer VDOM logs in and sees only that VDOM's interfaces, policies and logs, with no view of global settings or other tenants. This is what makes VDOMs suitable for managed services, where each customer may want hands-on control of its own rules while the provider keeps control of the appliance.",
   "When should you use multi-VDOM? Use it when you need true administrative and traffic separation on one box: a managed service provider hosting several tenants, an organization that must keep two regulated environments apart, or a need for separate routing tables, for example overlapping IP ranges for different customers. If you only need network segmentation inside one organization, VLANs and zones with well-written policies are usually simpler. VDOMs add management overhead, and they share one pool of CPU (central processing unit), memory and session capacity, so a busy VDOM can affect its neighbors unless you set resource limits.",
   "FortiOS offers two VDOM modes. Split-task VDOM mode gives you exactly two VDOMs: root for management and a traffic VDOM (named FG-traffic) for user traffic, which is a simple way to keep management cleanly separate. Multi-VDOM mode lets you create many VDOMs for real multi-tenancy. For the exam, focus on the core idea: VDOMs separate policies, routing and administration; the root VDOM exists by default and handles management; and you reach for multi-VDOM when isolation is a requirement rather than a convenience."
  ],
  "analogy": "A FortiGate with VDOMs is like an office building with several leased suites. Each tenant has its own locks, its own floor plan and its own receptionist, and the building's elevator rules keep visitors on the right floor. The building manager (global settings) controls the power, the elevators and the lease agreements. An inter-VDOM link is a deliberately installed internal door between two suites. Where it stops: tenants in a real building have separate utilities, while VDOMs share the same CPU and memory pool.",
  "terms": [
   [
    "VDOM (virtual domain)",
    "An isolated instance on one FortiGate with its own interfaces, routing table, policies, profiles and administrators."
   ],
   [
    "Root VDOM",
    "The default VDOM that always exists, cannot be deleted, and by default is the management VDOM for box-wide traffic such as FortiGuard updates and logging."
   ],
   [
    "Global vs per-VDOM settings",
    "Global settings (firmware, HA, hostname, global admins) apply to the whole unit; per-VDOM settings (interfaces, routes, policies, profiles) belong to one VDOM."
   ],
   [
    "Inter-VDOM link",
    "A virtual pair of interfaces that connects two VDOMs so traffic can pass between them under routes and policy control."
   ],
   [
    "Split-task VDOM mode",
    "A mode with exactly two VDOMs, root for management and FG-traffic for user traffic."
   ]
  ],
  "example": "A managed service provider hosts two customers with overlapping 10.0.0.0/8 addressing on one FortiGate by giving each its own VDOM with a separate routing table, policy set and VDOM-scoped administrator, so their traffic never mixes and neither admin can see the other's rules.",
  "mistakes": [
   [
    "VLANs give the same isolation as VDOMs, including separate routing tables.",
    "VLANs segment traffic within one VDOM, which still has one routing table and one policy set. Only VDOMs give separate routing and administration."
   ],
   [
    "You can delete the root VDOM once you have created other VDOMs.",
    "The root VDOM always exists and cannot be deleted; by default it also carries management traffic."
   ],
   [
    "Traffic flows between VDOMs automatically if routes exist.",
    "There is no path until you create an inter-VDOM link and add policies and routes in both VDOMs."
   ],
   [
    "An interface can be shared by two VDOMs.",
    "Each interface, including each VLAN subinterface, belongs to exactly one VDOM at a time."
   ]
  ],
  "tryit": [
   [
    "A school district wants to separate its student Wi-Fi from its staff network on one FortiGate. Both networks are run by the same IT team, use different subnets, and should share the same internet connection and web filtering approach. A junior admin suggests enabling multi-VDOM. Is that the best choice?",
    "Probably not. The requirement is segmentation within one organization with one admin team and no overlapping addresses. Separate VLANs or interfaces, possibly grouped into zones, with distinct firewall policies and profiles, meet the need with less overhead. Multi-VDOM is justified when you need separate routing tables or separate administration."
   ],
   [
    "The same FortiGate later hosts a partner organization whose network overlaps with the district's 10.0.0.0/16 and whose own admin must manage their rules without seeing the district's. What changes?",
    "Now multi-VDOM is appropriate: overlapping addresses need a separate routing table, and the partner's admin can be assigned only to the partner VDOM. Connect the VDOMs with an inter-VDOM link only if a specific shared service needs to be reached."
   ]
  ],
  "tip": "VDOMs give separate routing tables, policy sets and administrators; VLANs and zones only segment within one routing and policy context. Choose VDOMs when you need real isolation, not just separate subnets.",
  "check": [
   [
    "What does each VDOM have that makes it act like a separate firewall?",
    "Its own interfaces, routing table, firewall policies, security profiles and administrators, isolated from other VDOMs."
   ],
   [
    "Which VDOM always exists and, by default, handles management traffic?",
    "The root VDOM; it remains when you enable multi-VDOM, cannot be deleted, and is the management VDOM by default."
   ],
   [
    "When is multi-VDOM the right choice over VLANs?",
    "When you need true isolation of routing and administration, such as separate tenants or overlapping IP ranges, rather than simple segmentation."
   ],
   [
    "How do you let two VDOMs exchange traffic?",
    "Create an inter-VDOM link and add routes and firewall policies in both VDOMs to permit the traffic."
   ]
  ]
 },
 {
  "t": "FGCP HA: active-passive vs active-active, heartbeat links, primary election (monitored ports, uptime, priority, serial, override)",
  "hook": "At Riverbend Medical Center, two FortiGates sit side by side in a rack, cabled as a high-availability cluster. Last Tuesday the primary rebooted after a power supply failure, the secondary took over, and nobody noticed, which is exactly what HA is for. But now that the original unit is back and healthy, Jordan on the network team has raised its priority to 200, expecting it to take back the primary role. Nothing happens. The other unit keeps leading, and Jordan's manager wants to know why the setting is being ignored. Which rule in the election is Jordan missing?",
  "simple": "High availability, or HA, means having two firewalls that act like one, so if one breaks the other carries on. They constantly send each other small 'I am alive' messages over dedicated cables called heartbeat links. One unit is the leader, called the primary. The cluster picks the leader with a fixed list of tests, like a tie-break order in a sports league: first, who has the most working watched cables; then, who has been running the longest; then, who has the higher priority number; and finally, the serial number. A setting called override moves priority ahead of running time, so a favorite unit can take back the lead after it recovers.",
  "body": [
   "FGCP (FortiGate Clustering Protocol) joins two or more FortiGates into one high-availability (HA) cluster that survives the failure of a single unit. To form a cluster, the members must match on hardware model and firmware version, and they must share the same HA group ID, group name and password. Hostnames and per-unit management settings can stay unique. The cluster presents shared virtual MAC (media access control) addresses and the configured interface IP addresses, so the rest of the network sees a single device and does not need to change anything when the primary role moves.",
   "There are two operating modes. In active-passive mode, only the primary processes traffic, while the secondary keeps a synchronized copy of the configuration and stands ready to take over on failure. In active-active mode, the primary still receives all traffic, because it owns the virtual MAC addresses, but it distributes sessions that need security profile inspection to the secondaries to spread the CPU (central processing unit) load. Both modes fail over in the same way; the difference is whether the secondary does useful work during normal operation. Active-active does not double throughput for simple firewall traffic, because the primary still handles every packet first.",
   "Heartbeat links carry the cluster's health signals and its configuration and session synchronization between members. You dedicate one or, better, two interfaces to heartbeat and connect them either directly or over a dedicated switch or VLAN (virtual local area network). Heartbeat interfaces have their own priority, and the cluster uses the highest-priority working heartbeat link. Two heartbeat links remove a single point of failure: if a lone heartbeat cable fails, each unit believes the other is dead and both become primary. That condition is called split brain, and it causes duplicate addresses and unpredictable traffic forwarding.",
   "Monitored interfaces, sometimes called link monitoring or port monitoring, are the ports you tell HA to watch, typically the important traffic interfaces such as the WAN and core LAN uplinks. If a monitored interface on the primary goes down, that unit has fewer working monitored ports than its peer, and the cluster fails over to the unit with more. You should not monitor heartbeat interfaces, and you should only monitor ports that are actually connected on every member, or the cluster will see a permanent difference.",
   "Primary election decides which unit leads, and the order of tie-breakers depends on the override setting. With override disabled, which is the default, FGCP compares the following criteria in order. First, the number of connected monitored interfaces, where more is better. Second, HA uptime, where longer is better, as long as the difference is larger than a small margin (five minutes by default). Third, device priority, where higher is better. Fourth, serial number, where the higher serial wins as the final tie-break. Because uptime is checked before priority here, raising a returning unit's priority does not make it take back the primary role.",
   "With override enabled, the order changes so that device priority is compared before uptime: monitored interfaces, then priority, then uptime, then serial number. This makes a specific preferred unit reclaim the primary role as soon as it recovers, at the cost of an extra failover when it comes back. That extra failover briefly interrupts traffic that is not protected by session pickup, which is why override is off by default. Override must be enabled on the unit you want to win, and in practice administrators enable it on all members with different priorities so the behavior is predictable.",
   "HA uptime is not the same as system uptime. It measures how long a unit has been part of the cluster in its current state, and it resets on certain events, such as a monitored interface failure. You can reset it deliberately with an HA command to force a new election, which is a common way to move the primary role during maintenance without enabling override.",
   "In a lab with two licensed units you would set the same group ID, group name and password, choose a mode, connect two heartbeat links, set priorities, and watch the election. With one unit, study the election order until you can recite both sequences, and practice reasoning through scenarios: which unit wins if one has a failed WAN link but a higher priority, or if both have equal ports and uptime but different serial numbers."
  ],
  "analogy": "Picture two co-pilots. The heartbeat links are the intercom; if the only intercom wire is cut, each thinks the other has passed out and grabs the controls, which is split brain. Choosing the captain follows rules: whoever has more working instruments wins; if tied, whoever has been flying longer; then the seniority badge (priority). Override is a standing order that seniority beats time in the seat. Where it stops: real pilots talk it out, while FGCP applies the order mechanically.",
  "mnemonic": "Override off: 'Most Up Prefers Serial' (Monitored ports, Uptime, Priority, Serial). Override on: 'Most Pilots Use Seats' (Monitored ports, Priority, Uptime, Serial).",
  "terms": [
   [
    "FGCP",
    "FortiGate Clustering Protocol, which binds matching FortiGates into one HA cluster with shared virtual MAC addresses."
   ],
   [
    "Active-passive vs active-active",
    "Active-passive: only the primary forwards traffic. Active-active: the primary also distributes security-profile inspection sessions to secondaries."
   ],
   [
    "Heartbeat link",
    "A dedicated interface carrying HA health, configuration sync and session sync; two are used to avoid split brain."
   ],
   [
    "Monitored interface",
    "A port HA watches; the unit with more connected monitored ports wins the election, so a failed monitored link triggers failover."
   ],
   [
    "Override",
    "An HA setting that moves device priority ahead of uptime in the election, so a preferred unit reclaims the primary role after recovery."
   ],
   [
    "Split brain",
    "A failure in which members lose all heartbeat contact and each acts as primary at the same time."
   ]
  ],
  "example": "An admin raises the secondary's HA priority to 250 hoping it becomes primary, but with override disabled the current primary keeps leading because its longer HA uptime is compared before priority. Enabling override on both units, or resetting HA uptime during maintenance, changes the outcome.",
  "mistakes": [
   [
    "Raising device priority always makes a unit become primary.",
    "With override disabled, monitored interfaces and HA uptime are compared before priority. Priority wins early only when override is enabled."
   ],
   [
    "Active-active doubles the cluster's throughput for all traffic.",
    "The primary still receives every packet; only sessions needing security profile inspection are distributed to secondaries."
   ],
   [
    "One heartbeat link is enough because it is a direct cable.",
    "A single heartbeat link is a single point of failure that can cause split brain. Use two heartbeat links."
   ],
   [
    "Members can run different firmware or models as long as the group ID matches.",
    "FGCP members must match on model and firmware, as well as group ID, group name and password."
   ]
  ],
  "tryit": [
   [
    "A cluster has override disabled. Unit A has 3 of 3 monitored ports up, HA uptime of 40 days and priority 100. Unit B has 3 of 3 monitored ports up, HA uptime of 2 hours and priority 200. Then Unit A's WAN cable is unplugged. Which unit is primary before and after the cable is pulled?",
    "Before: Unit A, because monitored ports are tied and A has much longer HA uptime, which is compared before priority. After: Unit B, because it now has more connected monitored ports (3 versus 2), and monitored ports are the first criterion in either election order."
   ]
  ],
  "tip": "Memorize both election orders. Override disabled: monitored ports, uptime, priority, serial. Override enabled: monitored ports, priority, uptime, serial. Monitored ports always come first.",
  "check": [
   [
    "With override disabled, which criteria decide the primary before priority?",
    "The number of connected monitored interfaces, then HA uptime; priority is only checked after uptime."
   ],
   [
    "How does active-active differ from active-passive?",
    "In active-active the primary distributes inspection sessions to secondaries so they process traffic too; in active-passive only the primary forwards traffic."
   ],
   [
    "Why use two heartbeat links?",
    "To avoid split brain: if the only heartbeat fails, each unit thinks the other is down and both become primary."
   ],
   [
    "What must match for FortiGates to form an FGCP cluster?",
    "Hardware model, firmware version, HA group ID, group name and HA password."
   ]
  ]
 },
 {
  "t": "HA operations: session pickup, config sync, checksums, `get system ha status`, `execute ha manage`",
  "hook": "It is 3:15 a.m. at Harbor Credit Union, and Maya on the night shift gets a page: the primary FortiGate failed over after a firmware fault. The cluster did its job and traffic kept flowing, but the morning batch team reports that a long database replication job died halfway, and two admins lost their SSH sessions. To make things more confusing, the GUI now shows the two cluster members as out of sync. Maya needs to know why the sessions dropped, which part of the configuration differs, and how to look at the other unit without walking to the data center. Where does she start?",
  "simple": "Once two firewalls are working as a pair, a few tools keep them in step. Session pickup is like a relay runner passing the baton: the backup firewall keeps a copy of who is talking to whom, so ongoing conversations, like a big file download, carry on after a switch. It is off at first, because copying every conversation costs effort. Config sync automatically copies every settings change from the leader to the backup. A checksum is a short fingerprint of the settings; if the fingerprints on the two units differ, something is out of step. One command shows the health of the pair, and another lets you hop from one unit's console to the other.",
  "body": [
   "Once a cluster is running, day-to-day HA (high availability) work is about keeping members in sync and knowing what happens during a failover. Three features and a handful of commands cover most of the exam's operational questions: session pickup, configuration synchronization, checksums, `get system ha status`, `diagnose sys ha checksum cluster` and `execute ha manage`.",
   "Session pickup, also called session synchronization, copies the session table from the primary to the secondaries so that established sessions survive a failover. Without it, the new primary has no record of existing connections, so long-lived TCP (Transmission Control Protocol) sessions such as file transfers, SSH (Secure Shell) sessions and database connections are reset and must reconnect. Session pickup is disabled by default because synchronizing every session adds CPU (central processing unit) load and heartbeat traffic. You turn it on when session continuity matters for the applications behind the cluster.",
   "Session pickup has refinements you should recognize. By default only TCP sessions are synchronized; UDP (User Datagram Protocol) and ICMP (Internet Control Message Protocol) sessions require the additional `session-pickup-connectionless` option. You can enable `session-pickup-delay` so that only sessions older than 30 seconds are synchronized, which saves resources by ignoring short web requests that would finish anyway. Even with session pickup, some sessions that use proxy-based inspection may still be reset after a failover, so do not promise that every session will survive.",
   "It helps to picture a failover in sequence. The secondary stops receiving heartbeat packets, or the primary loses a monitored interface, and a new election chooses the next primary. The new primary takes over the virtual MAC (media access control) addresses and sends gratuitous ARP (Address Resolution Protocol) packets so switches update their tables and send traffic to it. If session pickup is on, the new primary already holds the session table and keeps forwarding existing sessions; if not, clients must reconnect. The event log records the failover, which is also why HA failover is a popular automation stitch trigger.",
   "Configuration synchronization keeps every member's configuration identical automatically. You make changes on the primary, through the GUI (graphical user interface) or CLI (command-line interface), and FGCP (FortiGate Clustering Protocol) pushes them to the secondaries over the heartbeat link. You never edit the secondary directly for synchronized settings. A small set of settings is intentionally not synchronized, such as the hostname, HA priority and override setting, and reserved management interface settings, which is why each unit can keep its own identity.",
   "To verify sync, FGCP computes checksums of the configuration on every member and compares them. A checksum is a short hash value calculated from a block of configuration; if two members compute the same value, that block is identical. When the GUI shows members as out of sync, comparing checksums tells you which area differs. The command `diagnose sys ha checksum cluster` prints the checksums for each member side by side, broken down by area, so you can pinpoint the mismatch rather than guessing. If a mismatch persists, a forced recalculation with `diagnose sys ha checksum recalculate` is a common next step.",
   "The command `get system ha status` is your first stop for cluster health from the CLI. Its output shows the HA mode, the cluster members with their serial numbers and hostnames, which unit is primary, each unit's HA uptime and priority, the state of monitored interfaces, the heartbeat interfaces in use, and whether the configuration is in sync. You run it after every change, after any failover, and whenever someone reports odd behavior, because it answers the most basic question quickly: who is leading, and does everyone agree?",
   "The command `execute ha manage` lets you jump from the unit you are logged into over to another cluster member's CLI, so you can inspect or troubleshoot the secondary without cabling to it or giving it its own reachable management address. You give it the member index, which you can list with `execute ha manage ?`, and an administrator username, then authenticate; you are dropped into that unit's console over the heartbeat link. Typing `exit` returns you to the original unit.",
   "A healthy operational routine ties this together. Check `get system ha status` after changes and after any failover. Confirm the checksums match, and use `diagnose sys ha checksum cluster` when they do not. Keep session pickup aligned with your continuity needs. Use `execute ha manage` to reach the other member when you need to see its state directly."
  ],
  "analogy": "A cluster is like two chefs sharing one kitchen. Config sync is the shared recipe book: when the head chef edits a recipe, the copy at the second station updates. Checksums are like comparing page counts to spot a missing page quickly. Session pickup is the order tickets: if the head chef leaves, the second chef can finish dishes already in progress only if the tickets were shared. Where it stops: some proxy-inspected sessions can still be lost even with tickets shared.",
  "terms": [
   [
    "Session pickup",
    "HA session synchronization that lets established sessions survive a failover; disabled by default because of its CPU and heartbeat cost; TCP only unless connectionless pickup is enabled."
   ],
   [
    "Configuration sync",
    "The automatic replication of the primary's configuration to secondaries so all members stay identical, apart from a few per-unit settings such as hostname and HA priority."
   ],
   [
    "HA checksum",
    "A hash of configuration areas compared across members to confirm they are in sync; a mismatch reveals which area differs."
   ],
   [
    "get system ha status",
    "A CLI command that shows HA mode, members, the primary, HA uptime, monitored interfaces and sync state."
   ],
   [
    "execute ha manage",
    "A CLI command that connects you from one cluster member to another member's console over the heartbeat link."
   ]
  ],
  "example": "After a failover, users report dropped SSH sessions and failed large file transfers, so the admin enables session pickup (and connectionless pickup for a UDP-based voice service) so the next failover preserves those sessions on the new primary.",
  "mistakes": [
   [
    "Sessions dropping after failover means you need a second heartbeat link or override.",
    "Dropped sessions after a failover point to session pickup being disabled. Heartbeat links prevent split brain, and override changes which unit becomes primary."
   ],
   [
    "Session pickup protects UDP and ICMP sessions by default.",
    "By default only TCP sessions are synchronized; `session-pickup-connectionless` adds UDP and ICMP."
   ],
   [
    "To fix an out-of-sync secondary, log in to it and edit the configuration to match.",
    "Synchronized settings are managed on the primary. Use checksums to find the differing area and let FGCP resynchronize, recalculating checksums if needed."
   ],
   [
    "`get system status` shows which cluster member is primary.",
    "`get system status` shows firmware, serial and mode for the local unit. `get system ha status` shows cluster members, the primary and sync state."
   ]
  ],
  "tryit": [
   [
    "A hospital's FortiGate cluster carries both long-lived database replication over TCP and a UDP-based nurse-call voice system. During last month's failover, both broke. The team wants to enable session pickup but is worried about CPU load from the large volume of short web sessions. What would you configure?",
    "Enable session pickup for the TCP database sessions, enable `session-pickup-connectionless` so the UDP voice sessions are synchronized too, and enable `session-pickup-delay` so only sessions older than 30 seconds are synchronized, which skips most short web requests and reduces load. Then confirm with `get system ha status` that the cluster is healthy and in sync."
   ]
  ],
  "tip": "Session pickup is disabled by default. If a question mentions sessions dropping across a failover, the fix is to enable session pickup, not to add heartbeat links or override.",
  "check": [
   [
    "What does session pickup do and why is it off by default?",
    "It synchronizes the session table so established sessions survive failover; it is off by default because it adds CPU and heartbeat load."
   ],
   [
    "Two members show as out of sync. Which command finds the differing area?",
    "`diagnose sys ha checksum cluster` compares per-area checksums across members to reveal which configuration area differs."
   ],
   [
    "How do you reach the secondary's CLI without cabling to it?",
    "Use `execute ha manage` with the member index to connect to another member's console over the heartbeat link."
   ],
   [
    "Which command shows which unit is primary, the HA uptime of each member and whether they are in sync?",
    "`get system ha status`."
   ]
  ]
 },
 {
  "t": "Security Fabric: root and downstream FortiGates, authorization, FortiAnalyzer/cloud logging requirement, Security Rating",
  "hook": "Summit Outdoor Supply has a FortiGate at headquarters and three more at its retail stores, each managed on its own. When a store reported strange outbound traffic last month, Andre in IT spent an afternoon logging in to four separate boxes and stitching screenshots together to see the path. Now leadership wants a single view of all four sites and a quick score of how well each firewall follows best practice. Andre turns on the Security Fabric at headquarters, but the option to add the stores keeps failing. What is HQ missing, and how should each store be allowed in safely?",
  "simple": "The Security Fabric connects several Fortinet devices so they work as one team and share what they see. One FortiGate is the boss, called the root, and the others connect to it, called downstream units. Before the root can run the team, it needs somewhere to store and compare everyone's records, either a FortiAnalyzer log server or a Fortinet cloud logging service. A new member does not just walk in: it asks to join, and an administrator on the root approves it by its serial number, like a club checking an ID before handing over a membership card. Once joined, a feature called Security Rating checks everyone's settings against a best-practice list and gives a score with suggested fixes.",
  "body": [
   "The Security Fabric ties multiple Fortinet devices into one coordinated system with shared visibility, topology views and automation. At its center is one FortiGate acting as the Fabric root; other FortiGates connect to it as downstream units, and those can have their own downstream units, forming a tree. Other Fabric devices, such as FortiSwitch, FortiAP (access point), FortiAnalyzer, FortiManager and FortiClient EMS (Endpoint Management Server), can also participate. The root aggregates information from the whole Fabric and is where you see end-to-end topology, run Fabric-wide checks and build Fabric-wide automation.",
   "Before the root can run the Fabric, it needs a logging destination that can store and correlate Fabric data: FortiAnalyzer, or a cloud logging service such as FortiGate Cloud (FortiAnalyzer Cloud also fills this role). This prerequisite is a favorite exam point. The Fabric's topology views, reports and many of its correlation features build on logs from every member, so without a supported log store the root cannot fully form the Fabric. In the GUI (graphical user interface) you configure this under Security Fabric, Fabric Connectors, in the logging and analytics connector, and downstream units then send their logs to the same destination.",
   "Joining a downstream FortiGate follows a two-sided handshake. On the downstream unit, you enable the Security Fabric connection and point it at the upstream unit's IP address, usually the root's. The connection uses the Security Fabric protocol, which was formerly called FortiTelemetry and listens on TCP (Transmission Control Protocol) port 8013 by default, so the upstream interface that faces the downstream unit must allow Security Fabric Connection in its administrative access. Without that setting, the downstream unit's requests are never answered.",
   "The join does not complete until the root authorizes the downstream device. The administrator approves the pending device on the root, which identifies it by serial number, or pre-authorizes a known serial number in advance so the device is accepted when it connects. This authorization step is what prevents an unknown device from silently joining the Fabric and pulling topology or configuration information. Simply sharing a FortiCare account, managing two units from the same FortiManager, or building a VPN (virtual private network) tunnel between them does not create a Fabric.",
   "Once devices are joined, the root's topology views show each FortiGate, its connected switches and access points, and the endpoints behind them. You can drill into a downstream unit from the root, see which sites are generating threats, and follow a host across devices. This is what turns four separately managed firewalls into one picture, and it is the foundation for coordinated responses such as automation stitches that act on several devices at once.",
   "Joining a Fabric does not merge the firewalls into one device. Each FortiGate keeps its own configuration and its own firewall policies; the Fabric shares visibility, telemetry and coordination, and certain shared objects, such as some address objects, can be synchronized from the root. When an organization needs full central configuration management, with policy packages pushed to many devices, that is the job of FortiManager, a separate product that can also participate in the Fabric.",
   "Security Rating runs a set of best-practice and security checks across the Fabric devices, comparing your configuration against Fortinet's recommendations. It produces a score and a prioritized list of findings, each with a severity, an explanation and, for many items, a suggested fix you can apply. Findings typically include weak administrator settings such as missing trusted hosts or default passwords, missing firmware updates, unused or overly permissive policies, interfaces exposing management on the WAN, and missing HA (high availability) or logging. It is a posture assessment and hardening tool, not a website reputation score or a bandwidth meter.",
   "For the exam, hold onto three facts. The root needs FortiAnalyzer or a cloud logging service before the Fabric can form. Downstream units connect to the upstream IP, which must allow Security Fabric Connection, and are authorized by serial number on the root. Security Rating scores your configuration against best practices and recommends fixes.",
   "In a lab you enable the Fabric on a root FortiGate-VM (virtual machine), pointing it at FortiGate Cloud or a FortiAnalyzer for logging. If you have a second unit, you join it by pointing it at the root's IP, then authorize it on the root and watch it appear in the topology. Finally, you run a Security Rating, read the recommendations, and apply one or two fixes to see the score change."
  ],
  "analogy": "The Security Fabric is like a hospital network of clinics reporting to a central hospital. The central records office (FortiAnalyzer or cloud logging) must exist before any combined patient view is possible. A new clinic applies to join and the hospital approves it by its license number (serial). Security Rating is the accreditation inspector's checklist with a score and a list of fixes. Where it stops: a clinic might join on paperwork alone, but a FortiGate also needs the network path and the administrative access setting to talk to the root.",
  "terms": [
   [
    "Fabric root",
    "The top FortiGate in a Security Fabric that aggregates topology and data; it requires FortiAnalyzer or a cloud logging service."
   ],
   [
    "Downstream FortiGate",
    "A FortiGate that joins the Fabric by connecting to the upstream (usually root) IP and being authorized by the root."
   ],
   [
    "Fabric authorization",
    "The root's approval of a downstream unit by serial number, which completes the join and blocks unknown devices."
   ],
   [
    "Security Fabric Connection",
    "The administrative access option (formerly FortiTelemetry) that must be enabled on the upstream interface so downstream devices can connect."
   ],
   [
    "Security Rating",
    "A Fabric feature that checks devices against Fortinet best practices and returns a score with prioritized findings and suggested fixes."
   ]
  ],
  "example": "A branch FortiGate joins HQ's Fabric by enabling the Security Fabric connection and pointing at HQ's IP. HQ's internal interface allows Security Fabric Connection, and HQ already logs to FortiGate Cloud, which the root requires. The HQ admin then authorizes the branch by its serial number, and the branch appears in the topology.",
  "mistakes": [
   [
    "Two FortiGates on the same FortiCare account or connected by a VPN are automatically in the same Fabric.",
    "A Fabric forms only when the downstream unit connects to the upstream IP and the root authorizes it by serial number."
   ],
   [
    "The Fabric root can form the Fabric without any logging destination.",
    "The root needs FortiAnalyzer or a cloud logging service such as FortiGate Cloud as a prerequisite."
   ],
   [
    "Security Rating measures website reputation or bandwidth use.",
    "It checks device configuration against Fortinet best practices and returns a score with recommended fixes."
   ],
   [
    "The downstream unit authorizes itself once it knows the root's IP.",
    "Authorization happens on the root, which approves the downstream device's serial number."
   ]
  ],
  "tryit": [
   [
    "A new store FortiGate is configured with the Fabric enabled and the HQ root's IP address, but it never appears as a pending device on the root. HQ already logs to FortiAnalyzer, and the store can ping the HQ interface. What setting would you check first on HQ?",
    "Check that the HQ interface facing the store allows Security Fabric Connection in its administrative access. Ping working only proves ICMP reachability; the Fabric protocol needs that access option. Once requests arrive, the device will appear for authorization by serial number."
   ]
  ],
  "tip": "Two Fabric facts recur on the exam: the root must have FortiAnalyzer or cloud logging, and downstream units are authorized by serial number on the root. A shared account or VPN does not make a Fabric.",
  "check": [
   [
    "What must the root FortiGate have before the Security Fabric can form?",
    "A logging destination that can store Fabric data: FortiAnalyzer or a cloud logging service such as FortiGate Cloud."
   ],
   [
    "How does a downstream FortiGate join the Fabric?",
    "It enables the Fabric connection and points at the upstream (root) IP; the root then authorizes it by serial number."
   ],
   [
    "What does Security Rating provide?",
    "Best-practice checks across Fabric devices with a score and prioritized recommendations, not a website or bandwidth rating."
   ],
   [
    "Which administrative access option must the upstream interface allow?",
    "Security Fabric Connection, formerly called FortiTelemetry."
   ]
  ]
 },
 {
  "t": "Automation stitches: triggers and actions (email, webhook, CLI script, quarantine)",
  "hook": "At Pinecrest School District, a contractor changed a firewall policy on a Friday evening, and nobody noticed until Monday when a teacher could not reach the grading portal. The director, Ms. Okafor, now has two requests. First, she wants an email the moment anyone changes the FortiGate configuration, not a report the next morning. Second, after a recent malware scare, she wants any laptop the firewall flags as compromised to be cut off automatically, even at 2 a.m. when nobody is watching. You suspect FortiOS can do both without buying another tool. What do you build?",
  "simple": "An automation stitch is an 'if this happens, then do that' rule built into the FortiGate. The 'if' part is called the trigger, such as someone changing a setting, a virus being found, or a certain time of day. The 'then' part is one or more actions, such as sending an email, sending a message to another computer system, running a list of firewall commands, or cutting a suspicious computer off the network. It works like a smoke detector that also calls the fire department and closes the fire doors on its own, without waiting for a person to see the smoke.",
  "body": [
   "Automation stitches are FortiOS's built-in way to react to events without a human watching a screen. A stitch pairs a trigger, which is something that happens, with one or more actions, which are things to do, so the FortiGate can notify people, run commands or contain a threat the moment a condition is met. Stitches are configured under Security Fabric, Automation in the GUI (graphical user interface), and in a Security Fabric they can be defined on the root and act on Fabric devices as well as locally.",
   "A trigger is the event that starts the stitch. Triggers include FortiOS event-log conditions, such as a configuration change, an administrator login failure, an HA (high availability) failover, the unit entering conserve mode, a reboot, or a license that is about to expire. Security-related triggers include an IPS (intrusion prevention system) or antivirus detection and a compromised host indicator reported by FortiAnalyzer. There are also scheduled triggers that fire at a set time, and incoming webhook triggers that let an outside system start the stitch by sending a request to the FortiGate. You choose the trigger that matches the situation; for 'email me whenever any admin changes the configuration', the trigger is the configuration change event.",
   "An action is what the stitch does when the trigger fires. The email action sends a message to the addresses you list, and it can include details from the triggering log. The outbound webhook action sends an HTTP (Hypertext Transfer Protocol) request to another system, which is how stitches integrate with chat platforms, ticketing tools and SOAR (security orchestration, automation and response) platforms. The CLI (command-line interface) script action runs a set of FortiOS commands on the FortiGate to change configuration automatically, for example disabling an interface or adding an address to a block group. Other actions include notifications to the FortiExplorer mobile app and calls to public cloud functions.",
   "The quarantine action deserves special attention because it turns detection into containment. When a security profile or the Fabric flags a host as compromised, a stitch with a quarantine action can automatically isolate that host so it cannot spread malware or exfiltrate data. Depending on the setup, quarantine may ban the host's IP address on the FortiGate, or, where FortiSwitch and FortiAP devices are managed by the FortiGate, block the device's MAC (media access control) address at the switch port or wireless access point. FortiClient endpoints can also be quarantined through FortiClient EMS (Endpoint Management Server). Containment buys the security operations team time to investigate without the threat spreading overnight.",
   "You can chain several actions to one trigger and control their order. A typical incident stitch might first quarantine the host, then send an email to the on-call engineer, then post to the ticketing system through a webhook. Actions can run in parallel or in sequence with delays between them, so you can, for example, wait for a quarantine to complete before notifying people that it has happened.",
   "Compared with the alternatives, stitches are the simplest path to immediate, event-driven behavior. A scheduled report is not immediate; it only runs on its schedule. Forwarding syslog to another tool can work, but that tool must then do the reacting, which adds infrastructure and delay. So when a scenario asks for the simplest way to get an instant email on a specific event, or to automatically isolate a compromised host, the answer is an automation stitch with the matching trigger and action.",
   "Testing matters, because a stitch that has never fired is an assumption. FortiOS lets you test a stitch manually from the GUI, and every time a stitch runs it records an event log entry, so you can confirm both that the trigger matched and that each action succeeded. An email action also depends on a working email server configuration on the FortiGate, which is a common reason a correctly built stitch appears to do nothing.",
   "In a lab you will create a stitch with a configuration change trigger and an email action, then change a harmless setting and confirm the email arrives. Then add a second action, such as a webhook to a test receiver, and read the event log to see both actions run. Building one stitch end to end is enough to answer most exam questions about triggers versus actions."
  ],
  "analogy": "A stitch works like a home security system. The trigger is the sensor: a door opening, smoke in the kitchen, or a timer at 11 p.m. The actions are what the system does: text your phone (email), notify the monitoring company (webhook), lock the doors (CLI script), or shut the door to one room so a fire cannot spread (quarantine). Where it stops: a home alarm usually has fixed responses, while a stitch can chain any mix of actions in an order you choose.",
  "terms": [
   [
    "Automation stitch",
    "A rule that pairs a trigger with one or more actions so the FortiGate responds to an event automatically."
   ],
   [
    "Trigger",
    "The event that starts a stitch, such as a configuration change, an HA failover, a security detection, a schedule or an incoming webhook."
   ],
   [
    "Action",
    "What a stitch does when triggered: email, outbound webhook, CLI script or quarantine, among others."
   ],
   [
    "Webhook",
    "An HTTP request sent to (or received from) another system to integrate with chat, ticketing or orchestration tools."
   ],
   [
    "Quarantine action",
    "An action that isolates a compromised host, for example by banning its IP on the FortiGate or blocking its MAC on a managed switch or access point."
   ]
  ],
  "example": "To alert on any admin change, an admin builds a stitch with a configuration change trigger and an email action. A second stitch uses a compromised host trigger with a quarantine action followed by an email. The next time a setting is saved, the security team receives an immediate email, and an infected laptop is isolated within seconds of detection.",
  "mistakes": [
   [
    "A daily scheduled report is the simplest way to be alerted immediately when the configuration changes.",
    "Reports only run on schedule. An automation stitch with a configuration change trigger and an email action alerts immediately."
   ],
   [
    "Email, webhook and quarantine are types of triggers.",
    "Those are actions. Triggers are the events, such as a configuration change, a failover, a detection or a schedule."
   ],
   [
    "Each stitch can have only one action.",
    "A stitch can chain multiple actions, in parallel or in sequence with delays."
   ],
   [
    "Quarantine permanently deletes the compromised host's data.",
    "Quarantine isolates the host's network access so it cannot spread; it does not touch the host's files."
   ]
  ],
  "tryit": [
   [
    "A hospital wants the following: when FortiAnalyzer reports a compromised host, isolate it immediately, open a ticket in the help desk system, and email the on-call engineer. The help desk system accepts incoming HTTP requests. How would you build this?",
    "Create one automation stitch with the compromised host trigger and three actions in sequence: quarantine first to contain the threat, then an outbound webhook to create the ticket, then an email to the on-call engineer. Test the stitch and confirm the event log shows each action succeeded, and make sure the FortiGate's email server settings work."
   ]
  ],
  "tip": "When the question asks for the simplest way to react instantly to an event, pick an automation stitch. Scheduled reports and syslog forwarding are not immediate and need extra tooling.",
  "check": [
   [
    "What two parts make up an automation stitch?",
    "A trigger (the event) and one or more actions (the responses, such as email, webhook, CLI script or quarantine)."
   ],
   [
    "Which stitch action can contain a compromised host automatically?",
    "The quarantine action, which isolates or bans the host so it cannot spread."
   ],
   [
    "Why is a stitch better than a daily report for alerting on admin changes?",
    "A stitch fires immediately when the trigger occurs, while a scheduled report only runs on its schedule."
   ],
   [
    "Which action would you use to post an alert into a chat or ticketing system?",
    "An outbound webhook action, which sends an HTTP request to that system."
   ]
  ]
 },
 {
  "t": "Logging: log types (traffic, event, security), severity, memory/disk/FortiAnalyzer/FortiGate Cloud/syslog, log allowed traffic",
  "hook": "On Wednesday morning, the compliance officer at Meadowbrook Insurance asks Tara for proof of every connection a former employee's laptop made through the firewall last Friday. Tara opens the FortiGate's log viewer and finds nothing from before Tuesday. The small branch unit has no disk, logs only to memory, and it rebooted for a firmware upgrade on Monday night. Worse, the policy that laptop used was set to log only security events, so ordinary connections were never recorded at all. How should the logging have been set up, and which log would have answered the question?",
  "simple": "Logs are the firewall's diary. There are three main kinds of diary entries: traffic logs (who connected to what), event logs (what the firewall itself did, such as an administrator logging in), and security logs (when a protection feature like antivirus or web filtering stepped in). Each entry has an importance level, from emergency down to debug. Logs can be kept in short-term memory, which is wiped when the device restarts, on a local disk, or sent to a separate log server or cloud service that keeps them safely. Each firewall rule also has a switch for how much traffic to record, from nothing at all to every allowed connection.",
  "body": [
   "Logs are how you prove what a FortiGate did, and the exam tests both the categories of logs and where they can be stored. Get the vocabulary right, and most questions fall into place. A useful habit is to ask two questions about any logging scenario: what kind of event am I looking for, and where would that record still exist today?",
   "FortiOS produces three broad log types. Traffic logs record sessions passing through firewall policies, including source and destination addresses, service, bytes sent and received, the policy ID that matched, and whether the session was allowed or denied; the forward traffic log is the one you check most often. Event logs record what the system itself does: administrator logins and configuration changes, HA (high availability) events, VPN (virtual private network) negotiation, routing changes and system health. Security logs, sometimes called UTM (unified threat management) logs, record the actions of security profiles: antivirus detections, web filter blocks, IPS (intrusion prevention system) hits, application control and DNS (Domain Name System) filtering.",
   "Matching a question to a log type is mostly a matter of asking who acted. If the question is 'where would I see that a policy blocked a virus', the antivirus profile acted, so that is a security log. If the question is 'who logged in and changed a setting', the system acted, so that is an event log. If the question is 'did this laptop connect to that server at 3 p.m.', the firewall policy acted, so that is a traffic log.",
   "Every log entry carries a severity level. From most to least severe, the levels are emergency, alert, critical, error, warning, notification, information and debug. You can set a minimum severity for a destination to control volume, for example sending warning and above to a remote server while keeping information-level entries locally. Severity filtering reduces noise and storage cost, but setting the threshold too high can hide routine entries that you later need for an investigation.",
   "Storage destinations are the second axis. Logs can go to memory, to local disk, to FortiAnalyzer, to FortiGate Cloud, or to a syslog server, and you can send to several destinations at once. Memory logging uses a small buffer and is cleared on reboot, so it is fine for a quick look at recent events but useless for history; after a firmware upgrade and reboot, the memory logs are gone. Disk logging survives reboots but is limited by the disk size and is not available on diskless models. For durable, searchable history and reporting across devices, you send logs to FortiAnalyzer, FortiGate Cloud or a syslog collector, which also keeps a copy off the device in case it is compromised or fails.",
   "The 'Log allowed traffic' setting on a firewall policy controls how much traffic logging that policy generates. The choices are disabled (no log), Security Events, which logs only sessions that a security profile acted on, and All Sessions, which logs every accepted session. If an analyst needs a record of every accepted connection through a policy, set it to All Sessions; Security Events alone will miss ordinary allowed traffic. In the CLI (command-line interface), these map to `set logtraffic disable`, `set logtraffic utm` and `set logtraffic all` under the policy.",
   "Denied traffic needs its own attention. The implicit deny policy at the bottom of the policy list, shown as policy 0, does not log denied traffic by default. To capture drops that no configured policy matched, you enable logging on the implicit deny, either in the GUI (graphical user interface) on the implicit policy or in the CLI with `set fwpolicy-implicit-log enable` under `config log setting`. Explicit deny policies have their own log violation traffic option.",
   "Where you read logs depends on where they are stored. The Log and Report pages in the GUI show entries from the source you select, such as memory, disk or FortiAnalyzer, and you can add filters on fields like source address, policy ID or action, then open any entry to see every field. From the CLI, `execute log filter` and `execute log display` let you read stored logs directly, which is handy during a remote command-line session when the GUI is slow or unavailable.",
   "In a lab you will set a policy to log All Sessions, generate some traffic, and read the forward traffic log to find the policy ID and bytes for each session. Then trigger a web filter block and find the matching security log, log in as a second admin to create an event log, and configure FortiGate Cloud as a remote destination so the records survive a reboot."
  ],
  "analogy": "FortiGate logging is like a building's records. Traffic logs are the visitor sign-in sheet at the front desk, event logs are the maintenance team's notebook, and security logs are the guard's incident reports. Memory logging is a whiteboard that is wiped every time the power goes out. Disk logging is a filing cabinet in the building, and FortiAnalyzer, FortiGate Cloud or syslog is an offsite records center. Where it stops: the sign-in sheet only records visitors when the policy's logging switch tells it to.",
  "terms": [
   [
    "Traffic log",
    "A record of sessions passing through firewall policies, including the policy ID and allow or deny result."
   ],
   [
    "Event log",
    "A record of the FortiGate's own activity: admin logins and changes, HA, VPN, routing and system health."
   ],
   [
    "Security (UTM) log",
    "A record of security profile actions such as antivirus, web filter, IPS, application control and DNS filter events."
   ],
   [
    "Log allowed traffic",
    "A per-policy setting (disabled, Security Events, All Sessions) that controls which accepted sessions are logged."
   ],
   [
    "Severity level",
    "The importance of a log entry, from emergency, alert and critical down to warning, notification, information and debug."
   ]
  ],
  "example": "A diskless FortiGate logs to memory, and after a reboot for a firmware upgrade yesterday's logs are gone. The admin configures FortiGate Cloud (or FortiAnalyzer or syslog) to keep durable history and sets the user policy's Log allowed traffic to All Sessions so every accepted connection is recorded.",
  "mistakes": [
   [
    "Increasing the memory log buffer keeps logs across reboots.",
    "Memory logs are cleared on every reboot regardless of size. Use disk, FortiAnalyzer, FortiGate Cloud or syslog for history."
   ],
   [
    "Security Events logging records every allowed session.",
    "Security Events logs only sessions a security profile acted on. Use All Sessions to record every accepted connection."
   ],
   [
    "An admin login appears in the traffic log.",
    "Admin logins and configuration changes are event logs. Traffic logs record sessions through firewall policies."
   ],
   [
    "The implicit deny policy logs all dropped traffic by default.",
    "Implicit deny logging is disabled by default; you must enable it to see those drops."
   ]
  ],
  "tryit": [
   [
    "An investigator asks whether a workstation reached an external file-sharing site last week. The FortiGate logs to FortiAnalyzer, the matching policy has Log allowed traffic set to Security Events, and no security profile acted on the connection. Will the record exist, and what should change for the future?",
    "Probably not. With Security Events, an allowed session that no profile acted on is not logged, so there is no traffic log entry to find. Set Log allowed traffic to All Sessions on that policy so future accepted sessions are logged to FortiAnalyzer. (If a web filter or application control profile had logged the site, a security log might exist.)"
   ]
  ],
  "tip": "Memory logs are wiped on reboot. For any question about keeping log history, the answer is a persistent destination: disk, FortiAnalyzer, FortiGate Cloud or syslog, not a bigger memory buffer.",
  "check": [
   [
    "Which log type shows that a policy blocked a virus, and which shows an admin login?",
    "The security (UTM) log shows the antivirus block; the event log shows the admin login."
   ],
   [
    "A policy logs only security events but you need every accepted session recorded. What do you change?",
    "Set Log allowed traffic to All Sessions on that policy; Security Events only logs sessions a security profile acted on."
   ],
   [
    "Why do memory logs disappear after a reboot?",
    "Memory logging is not persistent; it is cleared on restart, so history needs disk, FortiAnalyzer, FortiGate Cloud or syslog."
   ],
   [
    "Does the implicit deny policy log dropped traffic by default?",
    "No. You must enable logging on the implicit deny (policy 0) to record those drops."
   ]
  ]
 },
 {
  "t": "FortiGate-VM and cloud deployments: VM licensing, public cloud images, cloud-native firewall concepts",
  "hook": "Granite Ridge Logistics is moving its order-tracking application into a public cloud, and the security team wants the same FortiGate policies it trusts on premises. Devon builds a FortiGate-VM, gives it eight vCPUs to be safe, and is puzzled when throughput tests look no better than with two. Meanwhile, finance wants to know whether to buy a license up front or pay by the hour, and the cloud team says traffic will not even pass through the firewall unless someone changes the route tables. Devon is used to racking a box and plugging in cables. What changes when the firewall lives in a virtual network?",
  "simple": "FortiGate does not have to be a physical box. The same software can run as a virtual machine, which is a computer made of software that runs on someone else's hardware, either in your own data center or in a public cloud. A virtual FortiGate needs a license that tells it how big it is allowed to be, mainly how many processor cores it may use; giving it extra cores beyond its license does not make it faster. In the cloud you can bring a license you already bought, or rent one by the hour. Because there are no real cables in the cloud, you steer traffic to the firewall with the cloud's own routing settings.",
  "body": [
   "FortiGate is not only an appliance. The same FortiOS runs as a virtual machine, called FortiGate-VM, on hypervisors such as VMware ESXi, Microsoft Hyper-V and KVM (Kernel-based Virtual Machine), and in public clouds. The exam expects you to understand how licensing and deployment differ from hardware, and a few cloud-native ideas that change how a firewall fits into the network.",
   "A FortiGate-VM needs a software license rather than coming pre-licensed like an appliance. The license is tied to a virtual model, and the model sets limits, most importantly the number of vCPUs (virtual central processing units) the VM can use. Adding more vCPUs to the virtual machine than the license allows does not increase throughput, because FortiOS uses only the licensed number; the extra cores simply sit idle. Licenses come in perpetual and subscription forms, and the VM is registered to your FortiCloud account so it can receive FortiGuard updates and support.",
   "Fortinet also offers a free permanent evaluation license for FortiGate-VM, which is what you use to practice without buying anything. It is deliberately limited: a single vCPU, a small amount of memory, a handful of interfaces, firewall policies and routes, only low-encryption ciphers, and no FortiGuard updates. Do not memorize exact numbers, which can change between releases; know the shape of the limits, and expect the evaluation to be fine for learning the GUI (graphical user interface) and CLI (command-line interface) but not for production.",
   "In public clouds such as AWS (Amazon Web Services), Microsoft Azure, Google Cloud and Oracle Cloud, Fortinet publishes ready-made FortiGate-VM images in each cloud's marketplace. You can deploy them in two licensing models. With BYOL (bring your own license), you supply a license you bought from Fortinet or a partner. With PAYG (pay as you go), also called on-demand, the license cost is folded into the hourly cloud compute charge, so you pay only while the instance runs. BYOL tends to suit steady, long-running deployments, while PAYG suits short projects, testing and bursts.",
   "Deployment uses the cloud's own networking rather than physical cabling. Each FortiGate interface maps to a cloud virtual NIC (network interface card) attached to a subnet. Traffic does not pass through the FortiGate just because it exists; cloud route tables, also called user-defined routes in some clouds, must send traffic to the FortiGate's interface as the next hop. Cloud security groups or network security groups also filter traffic before it ever reaches the VM, so they must allow the flows the FortiGate is meant to inspect. Cloud platforms also usually require you to disable source and destination checks on the VM's interfaces so it can forward traffic that is not addressed to itself.",
   "Cloud-native firewall concepts differ from an on-premises box in several ways. High availability cannot rely on the shared virtual MAC (media access control) addresses and gratuitous ARP (Address Resolution Protocol) that FGCP (FortiGate Clustering Protocol) uses on a LAN, because public clouds do not allow that. Instead, cloud HA (high availability) designs use cloud constructs: on failover, the FortiGate calls the cloud's API (application programming interface) through an SDN (software-defined networking) connector to update route tables or move an elastic or public IP address to the new primary. Other designs place FortiGates behind cloud load balancers so several instances share the work.",
   "SDN connectors also solve a problem that static address objects cannot. Cloud workloads scale up and down, and their IP addresses change. A FortiOS SDN connector lets you create dynamic address objects that reference cloud attributes, such as instance tags, resource groups or security groups. When a new instance with a matching tag starts, the FortiGate learns its address automatically and existing policies cover it, without anyone editing the firewall.",
   "Bootstrapping is another cloud habit worth knowing. Rather than configuring each new instance by hand through its console, cloud deployment templates can pass an initial configuration and license to the FortiGate-VM when it first boots, so new firewalls come up consistent and ready to be managed. This matters most when instances are created by automation, for example when an autoscaling group adds firewall capacity during a traffic peak and removes it afterward.",
   "Fortinet also offers FortiFlex, a points-based consumption licensing program for elastic deployments, and FortiGate CNF (cloud-native firewall), a separate managed firewall service that runs inside the cloud provider rather than as a VM you manage. For the exam, the durable points are these: FortiGate-VM is licensed in software with a vCPU-bound model; clouds offer marketplace images as BYOL or PAYG; traffic reaches the firewall through cloud route tables; and cloud HA and dynamic object references rely on cloud and SDN mechanisms rather than the appliance's shared addresses."
  ],
  "analogy": "A FortiGate-VM license is like a gym membership tier that grants access to a certain number of machines. You can walk into a bigger room with more treadmills, but your card still opens only the number your tier allows, which is why extra vCPUs do not help. Cloud route tables are the signposts that send visitors to the front desk; without them, people walk straight past. Where it stops: a gym upgrade is instant at the desk, while a VM license change means applying a new license file.",
  "terms": [
   [
    "FortiGate-VM",
    "FortiOS running as a virtual machine on a hypervisor or public cloud, licensed in software."
   ],
   [
    "VM licensing (vCPU-bound)",
    "A license tied to a virtual model that caps usable vCPUs; extra vCPUs beyond the license do not add capacity."
   ],
   [
    "BYOL vs PAYG",
    "Cloud licensing models: bring your own license uses a license you purchased; pay as you go bills the license hourly through the cloud provider."
   ],
   [
    "SDN connector",
    "A FortiOS integration with a cloud or virtualization platform that enables dynamic address objects (tags, groups) and API calls for cloud HA."
   ],
   [
    "Cloud route table",
    "The cloud network's routing configuration that must point traffic at the FortiGate interface as next hop so it is inspected."
   ]
  ],
  "example": "A team deploys a FortiGate-VM from the Azure marketplace as PAYG, updates the application subnet's route table to use the FortiGate's internal interface as the next hop, and uses an SDN connector so a policy referencing an application tag automatically covers new VMs as the app scales out.",
  "mistakes": [
   [
    "Giving a FortiGate-VM more vCPUs than its license allows will increase throughput.",
    "FortiOS uses only the licensed vCPU count. Upgrade the license to a larger virtual model to use more vCPUs."
   ],
   [
    "Once a FortiGate-VM is deployed in the cloud, all traffic in the virtual network flows through it automatically.",
    "Cloud route tables must direct traffic to the FortiGate, and security groups must allow it."
   ],
   [
    "Cloud FortiGate HA works the same as an appliance cluster using shared virtual MACs.",
    "Public clouds do not support that. Cloud HA uses SDN connectors to update routes or move public IPs, or uses load balancers."
   ],
   [
    "PAYG means the FortiGate runs without any license.",
    "The license is still there; its cost is included in the hourly cloud charge."
   ]
  ],
  "tryit": [
   [
    "A company needs a cloud firewall for a six-week data migration project, after which the environment will be deleted. Finance does not want a long-term commitment, and the workload's servers will be added and removed frequently during the project. Which licensing model and which FortiOS feature would you recommend?",
    "Use a PAYG marketplace image, because the license cost is billed hourly and stops when the instance is deleted, with no up-front purchase. Use an SDN connector with dynamic address objects based on instance tags so policies automatically cover servers as they are added and removed."
   ]
  ],
  "tip": "Adding vCPUs beyond what the VM license permits does not increase throughput. In the cloud, remember traffic reaches the FortiGate through cloud route tables, and HA uses SDN mechanisms, not shared MACs.",
  "check": [
   [
    "How is a FortiGate-VM licensed compared with an appliance?",
    "It needs a separate software license tied to a virtual model that caps usable vCPUs, rather than shipping pre-licensed like hardware."
   ],
   [
    "What is the difference between BYOL and PAYG in a public cloud?",
    "BYOL uses a license you bought; PAYG bills the license hourly through the cloud provider."
   ],
   [
    "Why does cloud HA not use shared MAC addresses like a hardware cluster?",
    "Public cloud networks do not allow that; HA instead uses cloud constructs such as route table updates and moving elastic IPs via SDN connectors."
   ],
   [
    "What makes traffic in a cloud virtual network pass through the FortiGate-VM?",
    "Cloud route tables that set the FortiGate's interface as the next hop, plus security groups that allow the traffic."
   ]
  ]
 },
 {
  "t": "Diagnostics: `get system performance status`, `diagnose sys top`, conserve mode and av-failopen, `diagnose debug flow`, `diagnose sniffer packet`",
  "hook": "It is 2 a.m. at Copperfield Hotel Group, and Luis on call gets two pages within minutes. The FortiGate dashboard shows memory near full and a banner warning about conserve mode, and the front desk at one property says guests cannot reach the booking site. Luis opens an SSH session and stares at a blinking prompt. He knows dozens of diagnose commands exist, but which one shows overall load, which one finds the process eating memory, which one explains why a specific connection is dropped, and which one shows whether packets are arriving at all? And while memory is tight, is antivirus scanning still protecting guests or being skipped?",
  "simple": "When a firewall acts up, you need to know whether it is overworked, whether a rule is blocking something, or whether traffic is even arriving. FortiGate has a few command-line tools for this. One gives a quick health check of processor, memory and connections. Another lists which programs are using the most power right now, like a phone's battery usage screen. If memory gets too full, the firewall enters a self-protection state called conserve mode, and a setting called av-failopen decides whether traffic that needs virus scanning is let through unscanned or held back. A tracing tool follows one connection step by step to show why it was allowed or blocked, and a capture tool shows the raw traffic on a port.",
  "body": [
   "When a FortiGate misbehaves, the CLI (command-line interface) diagnostic tools tell you whether the problem is resources, policy, routing or the network itself. Knowing which command to reach for is a heavily tested skill, and each command answers one specific question. Getting into the habit of naming the question first, then choosing the command, keeps you from running random diagnostics at 2 a.m.",
   "For a quick health snapshot, `get system performance status` summarizes CPU (central processing unit) usage, memory usage, average session counts and setup rates, network throughput and uptime in one screen. Contrast it with `get system status`, which shows the firmware version, serial number, operating mode and HA (high availability) state but not live load. If the question asks for current CPU and memory load, the answer is performance status, not system status.",
   "To see which processes are consuming CPU and memory right now, `diagnose sys top` lists the busiest processes, much like the Unix top command, refreshing every few seconds. Each line shows the process name, process ID, state, CPU percentage and memory percentage. This is how you spot a runaway process, such as the IPS (intrusion prevention system) engine `ipsengine`, the scanning daemon `scanunit`, or the proxy daemon `wad`, which handles proxy-based inspection. Pressing q exits the display.",
   "Memory pressure has a specific protective mechanism called conserve mode. When used memory crosses a high threshold, called the red threshold, the FortiGate enters conserve mode to protect itself. In this state it stops accepting new sessions that need proxy-based inspection and may stop or limit some work until memory falls below a lower threshold, called the green threshold, at which point it exits conserve mode. Conserve mode is reported in the event log and the GUI (graphical user interface), and `diagnose hardware sysinfo conserve` shows the current state and thresholds.",
   "The `av-failopen` global setting decides what happens to traffic that needs proxy-based antivirus scanning while the unit is in conserve mode. The value pass, which is the default, lets that traffic through uninspected, favoring availability over security. The value off stops accepting new sessions that need antivirus scanning, favoring security over availability. The value one-shot bypasses antivirus scanning from the moment conserve mode starts and keeps bypassing it until an administrator changes the setting, even after memory recovers. This is distinct from IPS fail-open, which governs what happens when the IPS engine itself is overloaded, so read the question carefully to see which engine it describes.",
   "To understand why a specific session is allowed or dropped, `diagnose debug flow` traces packets through the FortiGate's decision logic: route lookup, policy match, NAT (network address translation) and any deny reason. The usual sequence is shown below. A missing `diagnose debug enable` is the classic reason no output appears, because the trace is collected but nothing is printed to your session.",
   "```\ndiagnose debug reset\ndiagnose debug flow filter addr 10.1.1.25\ndiagnose debug flow filter port 443\ndiagnose debug flow show function-name enable\ndiagnose debug flow trace start 10\ndiagnose debug enable\n(reproduce the traffic, read the output)\ndiagnose debug disable\n```",
   "Reading the output is a skill worth practicing. Lines such as 'find a route' show the route lookup and outgoing interface, 'Allowed by Policy-5' shows the matching policy, and 'SNAT' lines show source NAT. A key line to recognize is 'Denied by forward policy check (policy 0)', which means no configured policy matched and the implicit deny dropped the traffic. Other messages point to reverse path check failures, which indicate a routing problem rather than a policy problem.",
   "When you need to see the raw packets on the wire, `diagnose sniffer packet <interface> '<filter>' <verbosity> <count>` captures traffic much like tcpdump, letting you confirm whether packets even arrive on an interface and how they leave. The filter uses familiar syntax, such as 'host 10.1.1.25 and port 443'. Verbosity 1 shows basic headers, higher levels add packet data and interface names, and verbosity 4 is popular because it shows which interface each packet used. You can capture on the interface name any to see traffic on all interfaces. Press Ctrl+C to stop a capture without a count.",
   "A good troubleshooting order ties the tools together. Check resources with performance status and sys top, and rule out conserve mode. Then use the sniffer to confirm whether packets arrive and leave, and debug flow to see exactly why the FortiGate made its decision. Disable debugging when you finish, because leaving debug output running adds load."
  ],
  "analogy": "Diagnosing a FortiGate is like a doctor's visit. Performance status is the quick check of pulse and temperature. sys top is asking which part hurts most. Conserve mode is the body going into shock to protect vital organs, and av-failopen is the triage rule for whether patients wait or skip a test. Debug flow is following one patient through every department to see where they were turned away. The sniffer is the security camera at the door. Where it stops: debug flow shows decisions, not packet contents.",
  "terms": [
   [
    "get system performance status",
    "A CLI summary of live CPU, memory, session and throughput load plus uptime."
   ],
   [
    "diagnose sys top",
    "A live list of the processes using the most CPU and memory, used to find runaway processes."
   ],
   [
    "Conserve mode",
    "A protective state entered when memory use crosses the red threshold, stopping new proxy-based inspection sessions until memory recovers below the green threshold."
   ],
   [
    "av-failopen",
    "The global setting deciding whether traffic needing proxy antivirus passes uninspected (pass, the default), is blocked (off), or bypasses AV until an admin changes the setting (one-shot) during conserve mode."
   ],
   [
    "diagnose debug flow",
    "A trace of how the FortiGate handles a packet, showing route lookup, policy match, NAT and any deny reason."
   ],
   [
    "diagnose sniffer packet",
    "A packet capture tool that shows traffic on an interface, similar to tcpdump."
   ]
  ],
  "example": "No output appears during a flow trace even though the host is sending traffic. The admin realizes they set the filter and started the trace but forgot `diagnose debug enable`, which is required to print the trace. After enabling it, the output shows 'Denied by forward policy check (policy 0)', revealing that no policy matched.",
  "mistakes": [
   [
    "`get system status` shows current CPU and memory usage.",
    "`get system status` shows firmware, serial and mode. `get system performance status` shows live CPU, memory and session load."
   ],
   [
    "av-failopen controls what happens when the IPS engine is overloaded.",
    "av-failopen governs proxy antivirus during conserve mode. IPS fail-open is a separate setting for the IPS engine."
   ],
   [
    "With av-failopen set to one-shot, AV scanning resumes automatically when memory recovers.",
    "One-shot keeps bypassing AV until an administrator changes the setting, even after conserve mode ends."
   ],
   [
    "If debug flow prints nothing, the traffic is not reaching the FortiGate.",
    "The most common cause is forgetting `diagnose debug enable`. Check that and the filter before concluding traffic is absent; use the sniffer to confirm arrival."
   ]
  ],
  "tryit": [
   [
    "Users at a branch cannot reach an internal web server at 10.20.0.80 on port 443. `get system performance status` shows normal load. You want to know whether packets arrive from the user's PC at 10.1.1.25 and why the FortiGate drops them. Which two tools would you use, in what order, and what output would confirm a missing policy?",
    "First, run `diagnose sniffer packet any 'host 10.1.1.25 and port 443' 4` to confirm packets arrive on the expected interface. Then run a debug flow filtered on 10.1.1.25 and port 443, with `diagnose debug enable`, and reproduce the traffic. 'Denied by forward policy check (policy 0)' confirms no configured policy matched, so the implicit deny dropped it."
   ],
   [
    "A FortiGate frequently enters conserve mode during business hours, and the security team insists that no file may ever pass without antivirus scanning, even if users see errors. What av-failopen value matches that requirement, and what is the trade-off?",
    "Set av-failopen to off, so new sessions that need antivirus scanning are not accepted during conserve mode. The trade-off is availability: some users will see failed connections until memory recovers. The root cause, memory pressure, should still be investigated with `diagnose sys top`."
   ]
  ],
  "tip": "av-failopen governs proxy antivirus in conserve mode; IPS fail-open governs the IPS engine. Do not confuse them. And a flow trace prints nothing until you run `diagnose debug enable`.",
  "check": [
   [
    "Which command gives a one-screen summary of CPU, memory, sessions and uptime?",
    "`get system performance status`; `get system status` shows firmware and serial instead of live load."
   ],
   [
    "During conserve mode, which setting decides whether proxy AV traffic passes uninspected?",
    "av-failopen (pass, off or one-shot), which is separate from IPS fail-open."
   ],
   [
    "What does 'Denied by forward policy check (policy 0)' in a debug flow mean?",
    "No configured policy matched, so the implicit deny (policy 0) dropped the traffic."
   ],
   [
    "Which command lists the processes using the most CPU and memory right now?",
    "`diagnose sys top`."
   ]
  ]
 },
 {
  "t": "Firewall policy matching: incoming/outgoing interface, source (address, user, ISDB), destination, service, schedule; top-down first match; implicit deny (policy 0)",
  "hook": "At Willow Creek Credit Union, the HR team cannot reach the new payroll server, and the help desk ticket is getting heated. Kim, the firewall admin, points to policy 25, which clearly allows the HR group to reach the payroll server on HTTPS. It is enabled, the addresses look right, and the schedule is always. Yet every connection fails, and the forward traffic log shows the sessions being denied. Kim's manager asks the obvious question: if the allow rule exists, why is the FortiGate ignoring it? The answer is not in policy 25 at all. Where should Kim look?",
  "simple": "A firewall policy is a rule that says which traffic is allowed or blocked. The FortiGate checks each new connection against its list of rules from top to bottom and uses the first rule that fits completely, then stops looking. It is like a bouncer reading a guest list from the top: the first line that matches you decides whether you get in. To match, the connection must fit every part of the rule: which port it came in on, which port it leaves by, who sent it, where it is going, what kind of traffic it is, and the time of day. If no rule fits at all, a hidden last rule blocks it.",
  "body": [
   "Firewall policies are the heart of a FortiGate, and understanding exactly how a session is matched to a policy is the single most tested concept in the firewall policies domain. A policy is an ordered rule that says: for traffic entering on this interface and leaving on that interface, from these sources to these destinations, using these services during this schedule, take this action, accept or deny, and apply these settings, such as NAT (network address translation), security profiles and logging.",
   "The matching criteria are precise. FortiGate matches on the incoming interface and the outgoing interface; the source, which can be an address object, a user or user group, or an ISDB (Internet Service Database) entry; the destination, which can be an address object, a VIP (virtual IP) or an ISDB entry; the service, meaning the protocol and port; and the schedule, which defines when the policy is active. A session must satisfy every criterion in a policy to match it. If the source fits but the service does not, that policy is skipped and evaluation moves to the next one.",
   "Some details about the criteria often appear in questions. The incoming and outgoing interfaces are part of the match, so a policy written from port1 to port2 will never match traffic from port3, even if the addresses fit; zones and the any interface can broaden this. The ISDB lets a policy match well-known internet services, such as a cloud provider's published address ranges and ports, without maintaining long address lists by hand. Users and groups add identity to the source, so a policy can apply only to authenticated members of a group, on top of the source address.",
   "It is just as important to know what does not affect matching. Security profiles attached to a policy, such as antivirus or web filter, are applied after a match is found, so they never decide which policy matches. Likewise, the policy ID is only a label assigned when the policy is created; it does not affect order. Policy 25 can sit above policy 3 in the list, and the list position, not the number, is what counts.",
   "Evaluation is top-down, first match wins. The FortiGate reads the policy list from the top and uses the first policy whose criteria all match the session. It does not keep looking for a more specific rule, and it does not combine policies. This has a critical consequence: policy order matters. If a broad deny sits above a specific allow, the deny matches first and the allow never runs. The same happens if a broad allow without security profiles sits above a specific policy with them, which silently skips inspection. The fix is to move the specific policy above the broader one, not to renumber IDs.",
   "At the very bottom of the list sits the implicit deny, shown as policy 0. It matches anything no configured policy matched and drops it, which is why a FortiGate is deny-by-default: traffic you did not explicitly allow is blocked. You cannot delete or move the implicit deny. It does not log by default, so to see what it drops you enable logging on it. In a debug flow, the phrase 'Denied by forward policy check (policy 0)' is the signature of traffic hitting this implicit deny, and in the forward traffic log, a denied session with policy ID 0 tells the same story.",
   "Troubleshooting follows from these rules. When 'the allow rule exists but users still cannot connect', check the policies above it for a broader match, including deny policies and policies with a narrower purpose that happen to overlap. Verify that the incoming and outgoing interfaces, source, destination, service and schedule all line up with the real traffic. Then confirm whether the traffic is being caught by policy 0, which means none of the configured policies matched at all.",
   "FortiOS gives you tools to prove which policy a session will hit. The Policy Lookup feature in the policy list lets you enter an incoming interface, protocol, source, destination and port, and it highlights the policy that would match. The forward traffic log shows the policy ID each session actually used, and `diagnose debug flow` shows the decision step by step.",
   "In a lab you build LAN-to-WAN, DMZ (demilitarized zone)-to-WAN and WAN-to-DMZ policies. Then you use the forward traffic logs and the Policy Lookup tool to confirm which policy each test connection hits. Finally, you deliberately place a broad deny above a specific allow, watch the allow stop working, and move it back to prove the first-match behavior."
  ],
  "analogy": "Policy matching is like a mail sorter reading a list of routing rules from the top. The first rule that fits every detail on the envelope (where it came in, where it is going, who sent it, what kind of package, and the time) decides where it goes, and the sorter never reads further. If a rule at the top says 'all packages from Building A go to returns', a later special rule for Building A's payroll envelopes never gets a chance. Where it stops: a human sorter might notice the special rule, but FortiGate never does.",
  "terms": [
   [
    "Matching criteria",
    "The fields FortiGate compares to place a session: incoming and outgoing interface, source (address, user, ISDB), destination, service and schedule."
   ],
   [
    "Top-down first match",
    "Policies are evaluated in list order and the first one that fully matches is used; list position, not policy ID, decides."
   ],
   [
    "Implicit deny (policy 0)",
    "The final rule that drops any traffic no policy matched, making the FortiGate deny-by-default; it does not log by default."
   ],
   [
    "ISDB (Internet Service Database)",
    "A FortiGuard-maintained database of internet services' addresses and ports that policies can use as source or destination."
   ],
   [
    "Security profile timing",
    "Profiles are applied after a policy matches, so they never influence which policy is selected."
   ]
  ],
  "example": "An allow rule for HR to reach payroll fails because a broad 'deny LAN to server subnet' policy sits above it. The forward traffic log shows the sessions denied by that broad policy's ID. Moving the specific HR allow above the broad deny fixes it, since the first matching policy wins.",
  "mistakes": [
   [
    "The FortiGate picks the most specific matching policy, wherever it is in the list.",
    "FortiGate uses the first policy in list order whose criteria all match; it does not look for a more specific rule further down."
   ],
   [
    "Policies are evaluated in order of their policy ID numbers.",
    "The ID is only a label. List position determines evaluation order."
   ],
   [
    "Attaching a web filter profile to a policy changes which traffic matches it.",
    "Security profiles are applied after a match; they do not affect policy selection."
   ],
   [
    "If no policy matches, the traffic is allowed and logged by default.",
    "Unmatched traffic is dropped by the implicit deny (policy 0), and it is not logged unless you enable logging on it."
   ]
  ],
  "tryit": [
   [
    "The policy list, from top to bottom, is: policy 8 (LAN to WAN, source all, destination all, service ALL, accept, no security profiles), policy 3 (LAN to WAN, source Staff group, destination all, service HTTP and HTTPS, accept, web filter applied), then the implicit deny. The security team says staff browsing is not being web filtered. Why, and what is the fix?",
    "Policy 8 is above policy 3 and matches all LAN-to-WAN traffic, including staff web browsing, so policy 3 never runs and no web filter is applied. Move policy 3 above policy 8, or narrow policy 8, so staff web traffic hits the filtered policy first."
   ],
   [
    "A user on port3 (Guest) cannot reach the internet. There is a policy from port1 (LAN) to port2 (WAN) with source all and service ALL, and nothing else except policy 0. The debug flow shows 'Denied by forward policy check (policy 0)'. What is wrong?",
    "The only configured policy uses port1 as its incoming interface, so traffic entering on port3 cannot match it, and the implicit deny drops it. Create a policy from port3 to port2 (or include port3 in a zone used by the policy)."
   ]
  ],
  "tip": "Policy ID is only a label. When a specific rule is not taking effect, look at its position in the list, not its number, and check whether a broader rule above it matches first.",
  "check": [
   [
    "In what order are firewall policies evaluated and which one applies?",
    "Top-down; the first policy whose criteria all match the session is applied, and evaluation stops there."
   ],
   [
    "What is policy 0 and what does it do?",
    "The implicit deny at the bottom of the list; it drops any traffic no configured policy matched and does not log by default."
   ],
   [
    "A specific allow policy is below a broad deny and never takes effect. What is the fix?",
    "Move the specific allow above the broad deny, because the first match wins; renumbering the ID would not help."
   ],
   [
    "Do security profiles affect which policy a session matches?",
    "No. They are applied after the policy is matched."
   ]
  ]
 },
 {
  "t": "Address objects and groups, FQDN and geography objects, Internet Service Database (ISDB) entries",
  "hook": "It is Monday morning at Lakeview Dental Group, and the help desk queue is full of the same complaint: Outlook keeps disconnecting and Teams calls drop. You open the outbound policy and find that last year someone allowed Microsoft 365 by typing in a dozen IP addresses by hand. Half of them are stale now. Your colleague Priya suggests adding an FQDN object for outlook.office365.com, while your manager asks whether you could just allow all traffic to the United States. Three different objects, three very different results. Which one actually keeps a large cloud service working without you chasing its addresses every month?",
  "simple": "A firewall rule needs to say where traffic is coming from and going to. Instead of typing raw addresses into every rule, you give them names, like saving a phone number as a contact. An address object is a named address or block of addresses. A group is a bundle of those names. An FQDN object is a website name that the firewall looks up for you, so it keeps working if the address changes. A geography object means every address in a country. The Internet Service Database is a list that Fortinet keeps up to date for big online services, so you can say Microsoft 365 and the firewall knows all of its current addresses. It is like using a contact that updates itself when your friend changes phones.",
  "body": [
   "Firewall policies on a FortiGate rarely contain raw IP addresses. Instead they reference reusable, named objects, which keeps rules readable and lets you change a definition once and have every policy that uses it follow along. If a server moves to a new address, you edit one object rather than hunting through forty rules. Knowing which object type fits which job is a steady source of exam points, because scenario questions often offer several object types that all sound plausible.",
   "The basic building block is the address object. It represents an IP host, a subnet or a range. A single host is written with a /32 mask, such as 10.10.5.20/32, a subnet looks like 10.10.5.0/24, and a range might be 10.10.5.100 to 10.10.5.150. You name it something meaningful, such as `DMZ-WebServer` or `LAN-Finance`, and then reuse it as the source or destination in as many policies as you like. An address group bundles several address objects under one name, so a policy can reference the whole set at once. Editing the group, for example adding a new branch subnet, immediately changes every policy that uses it. Groups are how you keep policy counts low and intent clear.",
   "An FQDN (fully qualified domain name) address object references a name such as update.example.com instead of a number. The FortiGate resolves that name through the Domain Name System (DNS) and keeps the resulting IP addresses current, refreshing them as the DNS answers change. That means a policy can follow a service even when its hosting provider moves it to new addresses. The catch is scope. One FQDN object only covers the addresses that particular name resolves to. A large cloud service published under dozens or hundreds of hostnames will not be fully covered by a single FQDN, so some connections will slip past the allow rule and be dropped. Wildcard FQDN objects such as *.example.com exist, but they are broad and depend on the FortiGate actually seeing the DNS lookups for the names involved.",
   "A geography (geo) address object represents all IP ranges assigned to a country, based on FortiGuard's IP-to-country data. You pick a country from a list and the object stands for every address registered there. Geo objects are useful for coarse rules, such as blocking inbound connections from countries where your organization has no customers, staff or partners. They are far too broad to identify one specific service, though. Allowing an entire country to reach your network, or trying to permit a cloud application by allowing the country where you assume its data centers live, both cast a huge net. Cloud content is also hosted in many regions, so a geo rule can catch traffic in places you did not expect.",
   "The Internet Service Database (ISDB) solves the problem that the other objects cannot. It is a catalog that Fortinet maintains through FortiGuard, listing well-known internet services and bundling each one's current IP addresses, protocols and ports. Entries exist for services such as Microsoft 365, the major cloud providers and many popular applications, as well as broader categories. Because FortiGuard keeps the entries updated, setting an ISDB entry as the destination of a policy is the clean way to allow or control a service whose address list is long and constantly changing. You do not maintain anything by hand. ISDB entries can be used as a policy source as well, which is handy for inbound rules that should only accept connections from a known service.",
   "This is why, when an exam scenario asks how to permit Microsoft 365 without tracking its shifting IP addresses, the answer is the ISDB entry. One FQDN misses most of the service's endpoints, a list of address objects goes stale, and a country object is wildly too broad. In the policy editor you switch the destination from Address to Internet Service and choose the entry from the list. In the forward-traffic log, matching sessions then show the internet service name, which also makes reports easier to read.",
   "In practice you pick the narrowest object that accurately describes the endpoint. Use address objects and groups for your own subnets and servers, FQDN objects for a single named host whose address may change, geography objects for country-level rules, and ISDB entries for named public services. A common lab exercise is to create address objects for the LAN and DMZ, combine them into a group, use that group as the source of an outbound policy, and set an ISDB entry as the destination. Then you watch the log to confirm which entry each session matched."
  ],
  "analogy": "Think of address objects as contacts in your phone. A contact with one number is an address object, a family group chat is an address group, and a contact saved by a business name that looks itself up is an FQDN object. A geography object is like calling everyone with a certain country code. The ISDB is like a company directory that the company keeps current for you. The analogy stops at accuracy: an FQDN only knows the one name you gave it, while the ISDB covers the whole service.",
  "terms": [
   [
    "Address object",
    "A named IP host, subnet or range that can be reused as a source or destination in many policies."
   ],
   [
    "Address group",
    "A named bundle of address objects; editing it updates every policy that references it."
   ],
   [
    "FQDN object",
    "An address object based on a domain name that the FortiGate resolves through DNS and keeps current."
   ],
   [
    "Geography object",
    "An address object covering all IP ranges assigned to a country, based on FortiGuard geolocation data."
   ],
   [
    "Internet Service Database (ISDB)",
    "A FortiGuard-maintained catalog of public services with their current addresses, protocols and ports, usable as a policy source or destination."
   ]
  ],
  "example": "To allow Microsoft 365 without maintaining its long, changing IP list, an admin sets the policy destination to the Microsoft 365 ISDB entry, which FortiGuard keeps updated automatically. The old hand-typed address objects are removed, and the Outlook disconnects stop.",
  "mistakes": [
   [
    "One FQDN object for the service's main hostname is enough to allow a large cloud service.",
    "An FQDN covers only the addresses that one name resolves to. Big services use many hostnames and endpoints, so use the ISDB entry instead."
   ],
   [
    "A geography object is a good way to allow a specific cloud application.",
    "A country object covers every address in that country, so it is far too broad, and the service may be hosted elsewhere anyway. Geo objects suit coarse country-level blocking."
   ],
   [
    "You must maintain ISDB entries yourself as the service's addresses change.",
    "FortiGuard updates ISDB entries automatically; that is the main reason to use them."
   ],
   [
    "Editing an address group only affects new policies.",
    "Every policy that references the group picks up the change immediately."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union wants to block all inbound connections from countries where it has no members or vendors, and separately wants its staff to reach a large, well-known video conferencing service whose addresses change often. A junior admin proposes FQDN objects for both. Which object types should you use for each rule?",
    "Use geography objects for the inbound country block, because the requirement is defined by country and precision is not needed. Use the conferencing service's ISDB entry for the outbound allow, because FortiGuard keeps its many addresses and ports current. FQDN objects fit neither: they cannot represent a country, and one name would miss most of the service's endpoints."
   ]
  ],
  "tip": "For a big, changing cloud service, choose the ISDB entry. A single FQDN misses many endpoints and a geography object is far too broad to identify one service.",
  "check": [
   [
    "Which object type best allows a large cloud service with constantly changing IPs?",
    "An ISDB entry, because FortiGuard keeps its addresses and ports up to date automatically."
   ],
   [
    "What is the limitation of using one FQDN object for a big service?",
    "It only covers the addresses that single name resolves to, so it misses the service's many other hostnames and endpoints."
   ],
   [
    "What does a geography address object represent?",
    "All IP ranges assigned to a country per FortiGuard geolocation, useful for country-level rules but too broad to identify a specific service."
   ],
   [
    "How would you write a single host as an address object?",
    "As a subnet with a /32 mask, for example 10.10.5.20/32."
   ]
  ]
 },
 {
  "t": "Policy logging, policy lookup tool, policy ID vs sequence, schedules",
  "hook": "At Northgate Logistics, a manager forwards you an angry note: a warehouse PC reached a file-sharing site that policy 7 was supposed to block. You check the logs and find nothing at all for that PC. Your teammate Marcus insists policy 7 must run first because it has a lower number than policy 22. Meanwhile HR wants streaming sites allowed only at lunchtime, starting next week. You need to prove which rule caught the traffic, explain why there were no logs, and make a rule that switches itself on and off. Where do you even start?",
  "simple": "Firewall rules are checked from the top of the list down, and the first one that fits wins. Each rule also has a number, its ID, which it keeps forever like a name tag, even if you move it. Its place in the list is what really matters. Logging decides whether the firewall writes down what happened, and you can choose to record everything or only security problems. The policy lookup tool lets you ask, if this computer tried to reach that site, which rule would catch it, without actually sending traffic. Schedules make a rule active only at certain times, like a store sign that says open from noon to one on weekdays.",
  "body": [
   "Writing a firewall policy is only half the job. You also need to operate it: confirm which policy traffic actually hits, capture the right logs, understand how policies are identified, and control when they apply. These operational details appear often in scenario questions because they are exactly what goes wrong in real networks.",
   "Logging is set per policy through the Log Allowed Traffic option, which offers three choices. Turning it off records nothing for accepted sessions. Security Events logs only sessions where a security profile, such as antivirus or web filter, took action. All Sessions logs every accepted session. If you need a complete record of the connections a policy allowed, choose All Sessions, because Security Events alone will never show ordinary allowed traffic. That explains a common puzzle: a user reached a site, but the log is empty, because the policy that allowed it only logs security events. Denied traffic is handled separately. The implicit deny policy at the bottom of the list does not log by default, so if you want to record drops you must enable logging of violation traffic on it. Once logging is enabled, entries appear under the forward traffic log with the matching policy ID, the source and destination, the action and the byte counts.",
   "The policy lookup tool answers the question of which rule catches a given session, without generating live traffic. You enter the parameters of a hypothetical session, including the source interface, the protocol, the source address, the destination address and the destination port, and the FortiGate evaluates its real policy list from the top down. It then highlights the policy that would win. This is an excellent way to prove that ordering is correct before a change window, or to settle a dispute about why traffic is being allowed. Combined with forward traffic logs, it lets you move from guessing to evidence.",
   "Policy ID versus sequence is the distinction that trips up the most people. Each policy receives a policy ID when it is created, and that number never changes, even if you move the policy. It is simply a stable label used in logs, in the command line interface (CLI) and in references. The sequence is the policy's position in the list, and that is what actually determines matching order. When you drag a policy higher in the GUI, its sequence changes but its ID does not. So a policy with ID 22 can sit at the top of the list and match before policy 7. In the GUI you can show both the ID column and the sequence number; in the CLI, the `move` command, such as `move 22 before 7`, changes position while leaving IDs alone. Always reason about matching by sequence, never by ID.",
   "Schedules control when a policy is active. A recurring schedule repeats on chosen days of the week within a time range, for example Monday to Friday from 12:00 to 13:00, so it fits requirements like allowing streaming only during weekday lunch. A one-time schedule is active once, across a single start and end date and time, and then expires. It suits temporary access, such as a contractor who needs remote access for one week. The built-in schedule named always keeps a policy permanently active. Attaching a schedule to a policy enforces time-based access without anyone having to enable and disable the rule by hand. Schedules can also be grouped so several windows apply to one policy.",
   "Logging choices are also a trade-off between visibility and resources. Logging All Sessions on a busy outbound policy can generate a very large volume of entries, filling local storage or a remote log server faster and making searches slower. Many administrators therefore log All Sessions on sensitive or newly created policies, or temporarily during troubleshooting, and use Security Events on high-volume general browsing policies. Whatever you decide, the key exam point stays the same: if a question asks why ordinary allowed traffic is missing from the log, the policy is not set to All Sessions.",
   "Putting it together, a typical troubleshooting flow looks like this. First, use the policy lookup tool to find which policy a session should match by sequence. Next, set that policy to log All Sessions while you investigate, so you can see whether the traffic actually arrives. Then check whether a schedule is limiting when the policy applies, since a policy outside its schedule is skipped and the next matching rule wins. In a lab, set a policy to log All Sessions, run the lookup tool against a test session, move a policy and confirm that its ID stays the same, and attach a recurring schedule to see time-based control in action."
  ],
  "analogy": "Policy IDs are like jersey numbers on a sports team, and sequence is the batting order. Player number 22 can bat first if the coach puts them there, and moving them in the order does not change their jersey. Who gets to bat first depends entirely on the order, not the number on the back. Schedules are like shift times on the roster: a player who is off shift is skipped, and the next one in order steps up.",
  "terms": [
   [
    "Log Allowed Traffic",
    "A per-policy setting with choices of off, Security Events (only sessions a profile acted on) or All Sessions (every accepted session)."
   ],
   [
    "Policy lookup tool",
    "A GUI tool that takes hypothetical session parameters and reports which policy they would match, using the real list order."
   ],
   [
    "Policy ID",
    "A stable label assigned at creation that does not change when the policy is moved; it identifies a policy in logs and CLI but does not set matching order."
   ],
   [
    "Sequence",
    "A policy's position in the list, which is what actually determines top-down matching order."
   ],
   [
    "Recurring vs one-time schedule",
    "Recurring schedules repeat on chosen days and times; one-time schedules are active once over a single window and then expire."
   ]
  ],
  "example": "To allow streaming sites only at lunch, an admin attaches a recurring schedule for weekdays 12:00 to 13:00 to the allow policy, so the rule is active only in that window. Outside it, the policy is skipped and the deny rule below applies.",
  "mistakes": [
   [
    "A lower policy ID always matches before a higher one.",
    "Matching follows sequence, the position in the list. IDs are fixed labels and do not change when policies are moved."
   ],
   [
    "Security Events logging records all allowed traffic.",
    "It logs only sessions a security profile acted on. Choose All Sessions for a complete record."
   ],
   [
    "The implicit deny logs dropped traffic automatically.",
    "Logging on the implicit deny is off by default; you must enable it to see drops."
   ],
   [
    "A one-time schedule can enforce a weekly lunch window.",
    "One-time schedules run once and expire. Repeating windows need a recurring schedule."
   ]
  ],
  "tryit": [
   [
    "At Pinecrest Clinic, a contractor needs VPN access from Monday 8:00 to Friday 17:00 next week only. The admin also notices policy 30 is first in the list and policy 4 is second, and a colleague says policy 4 will be checked first. What schedule should be used, and who is right about the order?",
    "Use a one-time schedule covering that single window, because the access should expire on its own. The colleague is wrong about order: policy 30 sits first in the sequence, so it is evaluated before policy 4 regardless of the ID numbers."
   ],
   [
    "A user says they reached a gambling site, but you see no log entries for their PC on the allow policy. The policy is set to log Security Events, and no security profile blocked anything. Why is the log empty and what should you change?",
    "Security Events only logs sessions where a profile took action, so ordinary allowed sessions are not recorded. Change the policy to log All Sessions, and confirm with the policy lookup tool which policy the session matched."
   ]
  ],
  "tip": "Policy ID is fixed and does not set order; sequence (list position) does. Reordering changes sequence, not IDs, so never reason about matching from the ID number.",
  "check": [
   [
    "What does the policy lookup tool tell you?",
    "Which policy a hypothetical session would match, based on the real top-down policy order."
   ],
   [
    "Does changing a policy's position change its policy ID?",
    "No. Reordering changes the sequence (position and matching order); the policy ID stays the same."
   ],
   [
    "Which schedule type fits 'allow only weekdays 12:00 to 13:00'?",
    "A recurring schedule, which repeats on chosen days and times; a one-time schedule runs only once."
   ],
   [
    "Which logging option gives a full record of accepted sessions on a policy?",
    "All Sessions; Security Events records only sessions a security profile acted on."
   ]
  ]
 },
 {
  "t": "Source NAT: outgoing interface address, IP pools (overload, one-to-one, fixed port range, port block allocation)",
  "hook": "Riverside Community College just got four public IP addresses from its provider, and on the first day of term 800 students hit the Wi-Fi at once. You configured a one-to-one IP pool over the weekend because it looked tidy, and now the help desk phone will not stop ringing: a few students browse fine, everyone else times out. Meanwhile the compliance officer, Dana, wants to know how you would identify which student was behind a public address and port at a given time. Was the pool type the wrong choice, and which one would satisfy both problems?",
  "simple": "Computers inside a network use private addresses that cannot travel on the internet. Source NAT swaps that private address for a public one as traffic leaves, then swaps it back for the replies. Usually many computers share one public address, and the firewall tells their conversations apart by giving each one a different port number, like apartment numbers in one building. IP pools let you use a set of public addresses instead of just the firewall's own. Some pool types share addresses among many users, one type gives each computer its own address, and others hand out port numbers in neat, predictable blocks so you can later tell who was who.",
  "body": [
   "Source NAT (SNAT) rewrites the source address of outbound traffic so that internal private addresses leave the network as a routable public address. On a FortiGate the simplest form is built directly into a firewall policy, and larger or more regulated deployments use IP pools. The exam expects you to pick the right SNAT option for a scenario, which mostly comes down to how many public addresses you have, how many users need them, and whether you must be able to trace a session back to an internal host.",
   "The default approach is to enable NAT on the policy and translate using the outgoing interface address. Every internal host that leaves through that policy appears to come from the FortiGate's wide area network (WAN) interface IP. Port address translation (PAT) lets many hosts share that single address by giving each session a unique source port. The FortiGate keeps a session table entry that remembers which internal address and port each translated port belongs to, so replies are delivered to the right host. This is the simplest choice when you have one public IP, and it is the right answer to the classic scenario of many users behind one public address.",
   "IP pools give more control by translating to a defined set of public addresses instead of the interface IP. You create the pool as an object and then select it in the policy in place of the outgoing interface address. The most common type is the overload pool. It works like the interface-address method but spreads sessions across a range of public IPs. Many internal hosts share the pool's addresses using port translation, so a handful of public IPs can serve hundreds or thousands of users. When a question describes lots of users sharing a few public addresses, overload is the pool type it wants.",
   "A one-to-one pool maps each internal host to its own public address with no port translation. Because there is no PAT, the number of hosts that can be translated at the same time is capped by the number of addresses in the pool. A pool of four addresses means only four internal hosts can be translated at once, and the fifth host's new sessions fail until an address is released. You use one-to-one when a host must always present a dedicated, unshared public IP, for example when a partner allows connections only from a known address, and you accept the user cap that comes with it.",
   "Two more pool types exist for predictable, auditable mapping. A fixed port range pool maps an internal address range to an external address range and gives each internal host a fixed, calculated range of source ports on a specific external IP. Because the mapping is deterministic, you can tell which internal host used a given external IP and port without logging every session, which helps with compliance and carrier-grade tracking. Port block allocation (PBA) assigns each internal host a block of ports on a public IP when it starts sending traffic. The host uses ports from its block, receiving additional blocks if needed, and the FortiGate logs the block assignment rather than every individual session. Both approaches keep address sharing while making logs far smaller and easier to search than pure overload.",
   "You can see translation in action in the forward traffic log, which shows the original source address alongside the translated source address and port, and on the CLI with `diagnose sys session list`, where each session lists its original and translated (NAT) addresses. If translation seems wrong, those two views tell you which policy and which pool were used.",
   "Choosing among the options comes down to a short decision. Use the outgoing interface address when you have one public IP and many users. Use an overload pool to share several public IPs among many users. Use one-to-one when each host needs a dedicated public IP and you can live with the concurrent-user limit. Use fixed port range or port block allocation when you need predictable, auditable mapping between internal hosts and external ports. In a lab, enable NAT with the interface address, then create an overload pool and select it, and compare the translated source in the traffic log before and after."
  ],
  "analogy": "Overload NAT is like an office building with one street address where every employee shares the address and the mailroom uses desk numbers to route replies. One-to-one is like giving each employee their own house: clean, but you can only house as many people as you have houses. Port block allocation is like assigning each team a fixed row of mailboxes, so the mailroom only has to remember which row belongs to which team. The analogy stops working in one place: real NAT tracks sessions, not people, so one host may use many ports at once.",
  "mnemonic": "Four pool types, in the order FortiOS lists them: Overload, One-to-one, Fixed port range, Port block allocation. Remember 'Only One Fixed Port' to recall the order.",
  "terms": [
   [
    "Source NAT (SNAT)",
    "Rewriting the source address of outbound traffic so private hosts appear as a public address."
   ],
   [
    "Port address translation (PAT)",
    "Letting many hosts share one public IP by assigning each session a unique source port."
   ],
   [
    "Overload IP pool",
    "A pool where many internal hosts share the pool's public addresses using port translation."
   ],
   [
    "One-to-one IP pool",
    "A pool mapping each host to its own public address with no port translation, capping concurrent hosts at the pool size."
   ],
   [
    "Fixed port range / port block allocation",
    "Pool types that map internal hosts to external IPs and predictable port ranges or blocks, reducing log volume and allowing traceability."
   ]
  ],
  "example": "A college with four public IPs needs 800 users online for outbound browsing, so it uses an overload pool that shares the four addresses through port translation. A one-to-one pool would allow only four hosts at once. If regulators require traceability with small logs, port block allocation is a strong alternative.",
  "mistakes": [
   [
    "A one-to-one pool is fine for many users if you have a few public IPs.",
    "One-to-one uses no port translation, so only as many hosts as pool addresses can be translated at once. Use overload for many users."
   ],
   [
    "IP pools are used for destination NAT to publish servers.",
    "IP pools change the source address of outbound traffic. Publishing servers uses VIPs."
   ],
   [
    "You need an IP pool to do any SNAT.",
    "Enabling NAT with the outgoing interface address works without a pool and is the simplest option for one public IP."
   ],
   [
    "Port block allocation means no address sharing.",
    "PBA still shares public IPs; it just assigns each host a block of ports so mapping is predictable and logs are smaller."
   ]
  ],
  "tryit": [
   [
    "Bayside Freight has one public IP and 60 office staff who need web access. A partner later requires that the company's ERP server always connect from its own unique public address, and the provider supplies one extra IP. How should SNAT be configured?",
    "Keep the staff policy using NAT with the outgoing interface address, since many users share one IP with PAT. For the ERP server, create a one-to-one IP pool containing the extra address and apply it on a separate, more specific policy for that server placed above the general policy, so it always presents its dedicated address."
   ]
  ],
  "tip": "One-to-one caps concurrent users at the number of pool addresses because it does not use port translation. For many users on few IPs, choose overload.",
  "check": [
   [
    "What is the simplest SNAT for many users behind a single public IP?",
    "Enable NAT on the policy using the outgoing interface address, which hides all hosts behind the WAN IP through port translation."
   ],
   [
    "Why does a one-to-one IP pool limit how many hosts can connect?",
    "It maps each host to its own public address with no port translation, so only as many hosts as pool addresses can be translated at once."
   ],
   [
    "Which pool type shares several public IPs among many users?",
    "An overload pool, which uses port translation across the pool's addresses."
   ],
   [
    "Why would a provider choose port block allocation?",
    "It shares public IPs while assigning each host a predictable port block, so logs record block assignments instead of every session."
   ]
  ]
 },
 {
  "t": "Central SNAT table and when to use it",
  "hook": "Summit Health Partners has grown from one office to six, with two internet links and a partner network that only accepts connections from one specific public address. You inherit a FortiGate with 140 policies, and source NAT is configured differently on almost every one of them. Some use the interface address, some use pools, and nobody remembers why. Your lead, Tomas, suggests turning on central SNAT over the weekend to clean it up. It sounds like a simple switch. What actually changes when you flip it, and what breaks on Monday if you do not plan for it?",
  "simple": "Normally a FortiGate decides how to disguise outgoing traffic's address inside each firewall rule, rule by rule. Central SNAT moves all of those decisions into one separate list. The firewall rules then only decide whether traffic is allowed, and the separate list decides which public address it leaves with. The list is read from the top, and the first line that fits is used. It is like a company moving from every department mailing its own letters with its own return address to one central mailroom that applies the return address for everyone. The catch is that once you switch, the old per-rule settings stop being used, so you have to set up the mailroom before the switch.",
  "body": [
   "FortiGate offers two ways to define source NAT (SNAT). The default is per-policy NAT, where you enable NAT on each firewall policy and choose either the outgoing interface address or an IP pool. The alternative is central SNAT, which moves source-NAT decisions out of the individual policies and into one dedicated, ordered table. The exam focuses on what changes when you make that switch, why an organization would want it, and what can go wrong.",
   "With central NAT enabled, the per-policy NAT settings are no longer what decides translation. Instead you build entries in the central SNAT table, found under the Policy and Objects menu. Each entry specifies match criteria, namely the incoming and outgoing interfaces and the source and destination addresses (and optionally the protocol), plus the translation to apply, which is either the outgoing interface address or an IP pool. The table is evaluated top-down, like firewall policies, and the first matching entry decides how the source is translated. If no entry matches, the traffic is not source-translated, which matters when you forget to create an entry for a path that needs it.",
   "Destination NAT (DNAT) still uses virtual IP (VIP) objects in central NAT mode, but the way you use them changes. VIPs are listed and applied centrally from the DNAT and Virtual IPs table, and the destination translation happens automatically when traffic matches. A firewall policy no longer selects the VIP as its destination. Instead the policy references the internal, mapped address of the server, because by the time the policy is checked, the destination has already been translated. This detail is a frequent exam trap: in central NAT mode, the inbound policy's destination is the real server address, while in the default per-policy mode it is the VIP itself.",
   "The advantage of central SNAT is centralized, granular control. Because SNAT is defined independently of the security policies, you can apply different translations based on both source and destination without duplicating firewall policies. For example, traffic from the finance subnet to a partner network can leave through a dedicated IP pool, while the same subnet's general web browsing leaves with the interface address, and the firewall policy that allows finance traffic stays a single rule. You can also see all NAT behavior in one place instead of opening dozens of policies. This suits complex environments with several outbound links, many IP pools, or destination-specific translations, where per-policy NAT would become unwieldy or inconsistent.",
   "The trade-off is that the two models are mutually exclusive, and switching has consequences. When you enable central NAT, the per-policy NAT configuration is no longer used, so you must recreate the needed translations as central SNAT entries. Traffic that depended on the old per-policy settings will otherwise leave untranslated, with a private source address that the internet cannot route back, and connections will fail. Existing VIP references in policies must also be adjusted to the mapped addresses. It changes where every administrator looks for NAT, so it is a deliberate architectural choice planned in a change window, not a per-rule tweak. On the CLI, the mode is controlled under `config system settings` with `set central-nat enable`.",
   "Ordering inside the table deserves the same care as ordering firewall policies. Because the first match wins, specific entries, such as finance traffic to a partner subnet that must use a dedicated pool, belong above general entries, such as all LAN traffic to the internet using the interface address. If the general entry sits on top, it catches the finance traffic first and the partner sees the wrong source address, so the partner rejects the connection. A good habit is to read the table from the top and ask, for each entry, whether anything above it already matches the same traffic.",
   "Verification looks much the same as with per-policy NAT. The forward traffic log shows the original and translated source addresses, and `diagnose sys session list` shows each session's NAT details. In central mode you also check which central SNAT entry matched, and if translation is missing, the first suspect is a missing or misordered entry in the table.",
   "For the exam, hold on to these points. Central SNAT relocates source NAT from individual policies into a separate ordered table. It is chosen for centralized, destination-aware SNAT control in complex setups. DNAT still uses VIPs, applied centrally, with policies referencing the mapped address. Per-policy NAT and central SNAT cannot both be in effect at once. If a question says that central SNAT was enabled and outbound traffic stopped working, the answer is almost always that the required SNAT entries were not created. In a lab, enable central NAT, observe that outbound traffic stops translating, then add an SNAT entry and watch it recover."
  ],
  "analogy": "Per-policy NAT is like every department in a company printing its own return address on outgoing mail. Central SNAT is a single mailroom with an ordered rulebook: mail from finance to the bank gets one return address, everything else gets the main address, and the first matching rule wins. The departments now only decide whether mail may go out. Where the analogy breaks: if the mailroom has no rule for a letter, it does not guess a return address, it simply sends it without one, and replies never come back.",
  "terms": [
   [
    "Central SNAT",
    "A mode where source-NAT rules live in one ordered table instead of on individual firewall policies."
   ],
   [
    "Per-policy NAT",
    "The default mode where each firewall policy carries its own NAT setting and translation choice."
   ],
   [
    "Central SNAT table order",
    "The top-down evaluation of central SNAT entries, where the first matching entry decides the translation."
   ],
   [
    "DNAT and Virtual IPs table",
    "In central NAT mode, the place VIPs are applied centrally; policies then reference the internal mapped address."
   ]
  ],
  "example": "An enterprise with two outbound links and a partner that requires a specific public source address enables central SNAT. One table entry translates finance-to-partner traffic with a dedicated IP pool, and a lower entry translates all other outbound traffic with the interface address, without duplicating any firewall policies.",
  "mistakes": [
   [
    "Central SNAT and per-policy NAT can be mixed, using whichever is more convenient per rule.",
    "They are mutually exclusive. Once central NAT is enabled, per-policy NAT settings are no longer used."
   ],
   [
    "Enabling central SNAT automatically converts existing policy NAT into table entries.",
    "You must create the needed SNAT entries yourself, or traffic leaves untranslated and fails."
   ],
   [
    "In central NAT mode, the inbound policy's destination is still the VIP.",
    "VIPs are applied centrally, and the policy references the internal mapped address instead."
   ],
   [
    "Central SNAT replaces VIPs for destination NAT.",
    "Central SNAT handles source translation only. DNAT still uses VIPs."
   ]
  ],
  "tryit": [
   [
    "After a weekend change at Granite Bank, central NAT was enabled. On Monday, users cannot reach any internet sites, but the firewall policies are unchanged and still show traffic being accepted. The central SNAT table is empty. What is the most likely cause and fix?",
    "With central NAT enabled, per-policy NAT is no longer used, and with no SNAT entries, outbound traffic leaves with private source addresses that cannot be routed back. Create a central SNAT entry for the LAN to WAN path that translates to the outgoing interface address or a pool."
   ]
  ],
  "tip": "Central SNAT and per-policy NAT are mutually exclusive. After enabling central SNAT, policies no longer translate on their own; you must recreate translations as table entries or traffic leaves untranslated.",
  "check": [
   [
    "What changes when central SNAT is enabled?",
    "Source NAT moves out of individual policies into a separate, top-down SNAT table; destination NAT still uses VIPs, applied centrally."
   ],
   [
    "Why choose central SNAT?",
    "For centralized, destination-aware source-NAT control in complex environments, with all NAT rules visible in one place."
   ],
   [
    "Can you use per-policy NAT and central SNAT at the same time?",
    "No; they are mutually exclusive, and after enabling central SNAT the per-policy NAT settings are no longer used."
   ],
   [
    "In central NAT mode, what does an inbound policy use as its destination for a published server?",
    "The internal mapped address, because the VIP is applied centrally before the policy is checked."
   ]
  ]
 },
 {
  "t": "Destination NAT with VIPs: static NAT, port forwarding, VIP groups",
  "hook": "Willow Creek Library is launching an online catalog, and the web server sits on 10.20.30.15 in the DMZ. The director, Angela, wants patrons to reach it at the library's public address on port 8443, because port 443 on that address is already used by the staff portal on another server. You have a public IP, two internal servers, and a firewall that drops everything inbound by default. A colleague suggests a service object that maps 8443 to 443. Another suggests a static route to the server. Which of these actually lets the outside world in, and how?",
  "simple": "Destination NAT is how people on the internet reach a server hidden inside your network. The firewall listens on a public address, and when traffic arrives it quietly changes the destination to the server's private address, then changes it back on the way out. On a FortiGate this mapping is called a virtual IP, or VIP. Static NAT sends everything for one public address to one inside server. Port forwarding sends only a chosen port, and can even change the port number, so one public address can serve several inside servers. Think of a receptionist who takes calls to the main number and transfers them to the right extension.",
  "body": [
   "Destination NAT (DNAT) lets outside users reach an internal server by translating a public destination address, and optionally a port, to a private one. On a FortiGate, DNAT is done with a virtual IP (VIP) object. Publishing a server is one of the most common practical tasks an administrator performs, and the exam tests both the mechanics and the traps around it.",
   "A VIP maps an external IP address and optional port to an internal, or mapped, IP address and port. You create it under the Policy and Objects menu, choosing the external interface, the external IP, and the mapped IP. Once created, the VIP is used as the destination of an inbound firewall policy, typically from the wide area network (WAN) interface to the interface where the server lives, such as the DMZ. That policy also needs the correct service, should be scoped to only the ports the server actually uses, and should carry appropriate security profiles such as intrusion prevention. The FortiGate rewrites the destination on inbound packets and reverses the translation on replies, so from the client's point of view it is talking to the public address the whole time. Note the key distinction: DNAT is configured with the VIP, not with an IP pool or source NAT, which change the source address instead.",
   "There are two main VIP styles. Static NAT, sometimes called a one-to-one VIP, maps the whole external address to the whole internal address for all ports. The internal host is reachable on the same ports as the external address, and the inbound policy's service setting decides which of those ports are actually allowed. A static NAT VIP also affects the server's outbound traffic, which by default leaves with the VIP's external address when NAT is enabled on the outbound policy, keeping the server's public identity consistent.",
   "Port forwarding maps a specific external port to a specific internal port. For example, external TCP 8443 can map to the server's TCP 443. This lets you publish a service on a nonstandard external port, or share one public IP across several internal servers by giving each its own external port. Port forwarding rewrites both the address and the port. A firewall service object, by contrast, only matches traffic by protocol and port and never rewrites anything, which is a frequent distractor in exam questions. If a scenario needs the port to change, only a port-forwarding VIP will do it.",
   "VIP groups bundle several VIPs under one name so a single policy can reference many published services at once. If you publish a web server, a mail server and a remote access gateway, a VIP group lets one inbound policy cover all three, keeping the policy list tidy. A VIP group is used exactly like a single VIP: as the destination of an inbound policy. All members of a group must share the same external interface.",
   "Publishing a server also exposes it, so scope the inbound policy carefully. Restrict the source to known partner ranges or a geography object where that makes sense, allow only the exact services the server listens on, and attach security profiles such as intrusion prevention (IPS) to inspect what arrives. Logging All Sessions on inbound VIP policies is common, because these are the rules most likely to be probed from the internet and the records are valuable during an investigation.",
   "Two facts are worth internalizing. First, in the default per-policy NAT mode, the inbound policy's destination is the VIP, not the internal IP. Choosing the server's private address as the destination will not match, because the policy sees the VIP. Second, the FortiGate is DNAT-aware and tracks the translation in its session table, so you do not add a separate static route to the internal host for the return path; the normal connected or static routes for the server's subnet are enough. On the CLI, `diagnose sys session list` shows the original destination and the translated destination for each session, which is the quickest way to confirm a VIP is working. When a scenario says 'make internal server X reachable on public IP Y', the answer is a VIP referenced by a WAN-to-internal policy. When it adds 'on a different external port', the answer is a port-forwarding VIP.",
   "In a lab you publish a small web server through a port-forwarding VIP from external port 8443 to internal port 8080, create a WAN-to-DMZ policy with the VIP as the destination, and test from the WAN side with a browser or `curl <public-ip>:8443`. Then watch the forward traffic log, which shows the translated destination and the matching policy."
  ],
  "analogy": "A VIP is like a receptionist at a company's main phone number. Static NAT is a receptionist who forwards every call for one number straight to one person, whatever extension the caller asks for. Port forwarding is a receptionist who says calls to extension 8443 go to the web team at their desk number 443, and calls to extension 25 go to the mail team. A service object is just the caller ID screen: it can decide whether to answer, but it cannot transfer the call anywhere.",
  "terms": [
   [
    "Destination NAT (DNAT)",
    "Translating the destination address, and optionally port, of inbound traffic so outside users can reach an internal server."
   ],
   [
    "Virtual IP (VIP)",
    "A FortiGate object that performs destination NAT by mapping an external IP and port to an internal one."
   ],
   [
    "Static NAT VIP",
    "A VIP that maps the entire external address to the internal address for all ports (one-to-one)."
   ],
   [
    "Port forwarding VIP",
    "A VIP that maps a specific external port to a specific internal port, rewriting both address and port."
   ],
   [
    "VIP group",
    "A bundle of VIPs referenced together as the destination of a single inbound policy."
   ]
  ],
  "example": "To publish an internal app that listens on 443 to external users on port 8443, an admin creates a port-forwarding VIP mapping external 8443 to mapped 443 and references it as the destination of a WAN-to-DMZ policy that allows only that service.",
  "mistakes": [
   [
    "A service object can translate external port 8443 to internal port 443.",
    "Service objects only match traffic. Only a port-forwarding VIP rewrites the port."
   ],
   [
    "The inbound policy's destination should be the server's private IP.",
    "In the default per-policy NAT mode, the destination is the VIP itself."
   ],
   [
    "You need a static route to the internal server so replies can return.",
    "The FortiGate tracks the translation in its session table and reverses it automatically; normal routes to the server subnet are enough."
   ],
   [
    "IP pools are used to publish internal servers.",
    "IP pools change the source address of outbound traffic. Publishing uses VIPs."
   ]
  ],
  "tryit": [
   [
    "Elm Street Credit Union has one public IP. It wants its mail server reachable on TCP 25 and its web server on TCP 443, both on that single public address, and each server is on a different internal IP. How do you publish both with one policy?",
    "Create two port-forwarding VIPs on the same external IP, one mapping port 25 to the mail server and one mapping port 443 to the web server, then add both to a VIP group. Use the VIP group as the destination of one WAN-to-DMZ policy with the matching services allowed."
   ]
  ],
  "tip": "The inbound policy's destination is the VIP itself, not the internal IP. Only a port-forwarding VIP rewrites the port; a service object merely matches traffic and never translates ports.",
  "check": [
   [
    "What object performs destination NAT on a FortiGate, and how is it used?",
    "A VIP; it maps an external address and port to an internal one and is referenced as the destination of an inbound firewall policy."
   ],
   [
    "How do you publish a server that listens on 443 to external port 8443?",
    "Create a port-forwarding VIP mapping external 8443 to mapped 443; a service object cannot rewrite the port."
   ],
   [
    "What is a VIP group for?",
    "Bundling several VIPs so one inbound policy can publish multiple internal servers at once."
   ],
   [
    "Do you need a static route to the internal server for replies to a VIP?",
    "No; the FortiGate reverses the translation from its session table using normal routing to the server subnet."
   ]
  ]
 },
 {
  "t": "Firewall authentication: local users, LDAP (regular bind), RADIUS and TACACS+ servers, user groups",
  "hook": "At Cedar Valley Schools, the district wants only Finance staff to reach the payroll system, no matter which desk or laptop they use. Right now the rule allows a subnet, and a substitute teacher sitting at a finance office computer can reach payroll too. You have Active Directory, a RADIUS server the network team uses for Wi-Fi, and a handful of local accounts on the FortiGate. Your colleague Ruth adds the LDAP server, sets it to anonymous bind, and points the policy straight at it. Nothing works. What went wrong, and what is the right way to tie a firewall rule to a person?",
  "simple": "Normally a firewall rule decides based on which computer is talking, using its address. Firewall authentication lets the rule decide based on who the person is. The FortiGate needs a place to check names and passwords. That can be accounts kept on the firewall itself, or a company directory such as Active Directory, or a separate login server. To read who belongs to which team in Active Directory, the firewall logs in to the directory with its own service account. Then you make a user group on the firewall, such as Finance, and put that group in the rule. It is like a guest list at a door: the rule checks the list, and the list knows where to look people up.",
  "body": [
   "Firewall authentication lets policies allow or deny traffic based on who the user is, not just the IP address of the device they happen to be using. That matters because people move between desks, use laptops on different networks, and share computers. FortiGate can check identities against several kinds of stores, and the way you connect those stores to policies through user groups is a reliable exam topic.",
   "The simplest store is local users, defined directly on the FortiGate with a username and password. Local accounts are fine for a handful of users, emergency access or lab work, but they do not scale. Every account is created, changed and removed by hand on the device, passwords are not synchronized with the rest of the organization, and when someone leaves you must remember to delete them on every FortiGate separately.",
   "For enterprise directories, LDAP (Lightweight Directory Access Protocol) integrates the FortiGate with Microsoft Active Directory (AD) or other directory servers. You define the LDAP server with its address, port, the common name identifier (such as sAMAccountName for AD), and the distinguished name (DN) of the part of the directory to search. To search for users and read their group memberships, the FortiGate must first bind, meaning log in, to the directory. Regular bind uses a dedicated service account, given as a user DN and password, so the FortiGate can search the directory. That is what Active Directory normally requires, because AD rejects anonymous searches by default. Anonymous bind stores no credentials but usually cannot read AD group memberships. Simple bind authenticates a single known DN pattern and cannot search for groups. So for AD group-based policies, regular bind is the expected choice. The GUI's Test Connectivity and Test User Credentials buttons let you confirm the bind and a user lookup before using the server in a policy.",
   "RADIUS (Remote Authentication Dial-In User Service) and TACACS+ (Terminal Access Controller Access-Control System Plus) are protocols for talking to external AAA (authentication, authorization and accounting) servers. RADIUS is widely used for user authentication, for example for Wi-Fi and VPN users, and can return attributes such as group or role information. TACACS+ is common for network device administration and separates authentication, authorization and accounting into distinct functions. The FortiGate can use either one as a remote authentication server for firewall users and for administrators. You define the server with its address and a shared secret, which must match on both sides, and then reference it from a user group.",
   "User groups are the glue between an identity source and a policy. A firewall user group can contain local users, remote servers, or both. For a remote server you can add a group match, for example members of the AD group CN=Finance,OU=Groups,DC=cedar,DC=local on a particular LDAP server. Without a group match, any user who can authenticate against that server becomes a member. Policies accept user groups in the source field, alongside an address object, so to require that only Finance can use a policy you create a user group tied to the LDAP server and the Finance group DN, then add that group to the policy's source. Policies take user groups, not raw LDAP or RADIUS server entries, which is a common trap.",
   "It also helps to picture what the user experiences. When a policy includes a user group in its source and an unidentified user sends matching traffic, the FortiGate needs to learn who that user is. It can prompt them actively with a login page, or it can already know them through a passive method such as single sign-on, both covered in the next lessons. Once identified, the user is listed under the firewall user monitor with their username, group and IP address, and their traffic is matched against policies using that identity until the authentication times out.",
   "When authentication does not behave as expected, check the pieces in order. Confirm the server object can bind and look up a user. Confirm the user group's group match uses the exact DN. Confirm the policy's source includes the user group as well as an address. On the CLI, `diagnose test authserver ldap <server> <user> <password>` tests a lookup and shows the groups returned, which quickly reveals a wrong DN or bind problem.",
   "In a lab, add a Windows or Samba AD as a regular-bind LDAP server, test the connection, create a user group matching an AD group, and require that group on a policy. Then log in as a member and as a nonmember to confirm that only members pass."
  ],
  "analogy": "Think of a building with a guest list at the door. Local users are names written directly on the door list. LDAP is like the security guard phoning HR to check whether someone works in Finance, but the guard needs an employee badge of their own, a service account, before HR will answer, which is regular bind. The user group is the door list entry that says 'anyone HR confirms is in Finance'. The policy only reads the door list; it never calls HR directly.",
  "terms": [
   [
    "Local user",
    "An account defined directly on the FortiGate with its own username and password; simple but does not scale."
   ],
   [
    "LDAP regular bind",
    "Using a service-account DN and password so the FortiGate can search the directory and read group memberships, as Active Directory requires."
   ],
   [
    "RADIUS",
    "An AAA protocol widely used for user authentication that can return group or role attributes; uses a shared secret with the FortiGate."
   ],
   [
    "TACACS+",
    "An AAA protocol common for device administration that separates authentication, authorization and accounting."
   ],
   [
    "User group",
    "A FortiGate object combining local users and/or a remote server with an optional group match, referenced in a policy's source to require authentication."
   ]
  ],
  "example": "To let only Active Directory Finance members use the payroll policy, an admin defines the AD as a regular-bind LDAP server with a service account, creates a user group matching the Finance group DN, and adds that group to the policy source.",
  "mistakes": [
   [
    "Anonymous bind is fine for Active Directory group lookups.",
    "AD rejects anonymous searches by default. Use regular bind with a service account."
   ],
   [
    "You can reference the LDAP server object directly in a firewall policy.",
    "Policies take user groups. The user group references the server and the group match."
   ],
   [
    "Adding a remote server to a user group without a group match restricts it to one AD group.",
    "Without a group match, any user who authenticates against that server is a member."
   ],
   [
    "TACACS+ and RADIUS are interchangeable names for the same protocol.",
    "They are different AAA protocols; TACACS+ separates the three AAA functions and is common for device administration."
   ]
  ],
  "tryit": [
   [
    "Oakridge Insurance has about 900 staff in Active Directory and wants only the Claims group to reach a claims database. A junior admin proposes creating 120 local users on the FortiGate for the claims team. What would you recommend instead?",
    "Define AD as an LDAP server using regular bind with a service account, create a user group with a group match for the Claims group DN, and add that user group to the policy source. This scales, stays in sync with AD, and avoids maintaining 120 local passwords by hand."
   ]
  ],
  "tip": "Policies reference user groups, not LDAP or RADIUS server entries directly. For Active Directory group lookups, choose regular bind, since anonymous and simple bind cannot search group memberships.",
  "check": [
   [
    "Which LDAP bind type lets FortiGate search Active Directory for group memberships?",
    "Regular bind, using a service-account DN and password; anonymous and simple bind cannot search groups."
   ],
   [
    "What do you attach to a policy to require a specific AD group?",
    "A firewall user group that references the LDAP server and the group DN; policies take user groups, not server entries."
   ],
   [
    "Which protocol is commonly used for device administration with separated authentication, authorization and accounting?",
    "TACACS+; RADIUS is more common for general user authentication."
   ],
   [
    "Why do local users not scale well?",
    "Each account is maintained by hand on each FortiGate, with no synchronization to the organization's directory."
   ]
  ]
 },
 {
  "t": "Active (captive portal) vs passive authentication, authentication timeouts, allowing DNS before login",
  "hook": "It is the first morning of a new guest network at Brookside Medical Center. You set the outbound policy to require a login, expecting visitors to see a friendly portal page. Instead the front desk calls: every visitor's phone just spins, and no login page ever appears. Down the hall, staff laptops on the corporate network browse normally without anyone typing a password, and nurse Jordan asks why she was logged out of a web app halfway through a long chart review. Three puzzles, one morning. Why does the portal never appear, and how does the firewall know who the staff are without asking?",
  "simple": "A firewall can find out who you are in two ways. Active means it asks you: a login page pops up and you type your name and password. Passive means it already knows, because another system, such as the Windows login on your work laptop, told it who signed in at that computer. Timeouts decide how long the firewall remembers you before you must log in again. There is one classic trap. Before a web browser can show any page, it must look up the website's name, like checking a phone book. If the firewall blocks that lookup until you log in, the login page can never appear. So you must let name lookups through first.",
  "body": [
   "FortiGate identifies users in two broad ways, active and passive, and the difference decides both what the user experiences and what you must configure. This distinction, plus a classic captive-portal mistake involving the Domain Name System (DNS), appears frequently on the exam because it is also one of the most common real-world support calls.",
   "Active authentication prompts the user for credentials. The usual mechanism is a captive portal. When a user's traffic hits a policy that requires a user group and the FortiGate does not yet know who the user is, it intercepts the session and presents a login page. The user types a username and password, which the FortiGate checks against a local, LDAP (Lightweight Directory Access Protocol), RADIUS or TACACS+ source. Once authenticated, the user's IP address is associated with their identity and their traffic is allowed according to the policy. Active authentication is explicit and works for any device with a browser, including guests and unmanaged devices, but it interrupts the user with a prompt.",
   "Passive authentication identifies users without any prompt by learning who is logged on from another source. The main example is FSSO (Fortinet Single Sign-On), which learns Windows domain logon events so the FortiGate already knows which user is behind an IP address when their traffic arrives. Other passive sources include RADIUS single sign-on, which reads RADIUS accounting messages, and Fortinet's own endpoint and identity products. Passive methods are seamless for the user, which is why corporate staff often never see a login page, but they depend on that external identity feed being accurate and current. Many deployments use both: passive for managed corporate devices and active as a fallback for anyone the passive source does not know.",
   "Authentication timeouts control how long an authenticated session stays valid. The FortiGate supports an idle timeout, which logs a user out after a period with no traffic from their address, and a hard timeout, which logs them out a fixed time after login regardless of activity. A third option, new session, requires each new session to fall within the timeout window after authentication. Shorter timeouts mean users re-authenticate more often, which limits the window in which an unattended or reassigned device carries someone else's identity. Longer timeouts reduce interruptions. The nurse logged out mid-task is usually experiencing a hard timeout, because idle timeouts reset with activity.",
   "Now the captive-portal trap. The login page can only be presented for protocols where the FortiGate can intercept and redirect the session, primarily HTTP and HTTPS, and in some cases FTP and Telnet. But before a browser can even connect to a website to be redirected, it must resolve the site's name through DNS, and DNS itself cannot trigger the login page. If the only policy allowing outbound traffic requires authentication, DNS queries are blocked until login, yet login can never happen because name resolution fails first. The result is a deadlock: browsers spin and no portal appears.",
   "The fix is simple once you see it. Create a policy that allows DNS from the user network to your DNS servers, or to the internet if users use public resolvers, with no user group requirement, and place it above the authentication policy. Browsers can then resolve names, attempt the HTTP or HTTPS connection, and hit the authentication policy, where the captive portal appears. Some designs also allow traffic needed for the device's own captive-portal detection, but the core exam answer is always to allow DNS before the authentication policy.",
   "You can watch authentication working in the firewall user monitor, which lists each authenticated user, their IP address, the method used and the time remaining. On the CLI, `diagnose firewall auth list` shows the same information. When the portal never appears, check whether DNS is allowed above the authentication policy. When users are unexpectedly logged out, check the timeout type and value.",
   "For the exam, remember the pattern: active means a prompt through a captive portal, passive means identity learned from elsewhere such as FSSO, idle and hard timeouts govern how long authentication lasts, and you must permit DNS before a captive-portal policy. In a lab, require an AD group on a policy using a captive portal, test without a DNS policy to see the failure, then add a DNS-allow policy above it and watch the login page appear once names resolve."
  ],
  "analogy": "Active authentication is like a doorman who asks every visitor for ID at the door. Passive authentication is like a building where the front desk already scanned your badge downstairs and phoned up your name, so the doorman just waves you in. The DNS trap is like a visitor who cannot find the building's address because the map booth is behind the ID check. They never reach the doorman at all. Put the map booth outside the door.",
  "terms": [
   [
    "Active authentication (captive portal)",
    "Explicitly prompting the user for credentials through a login page before allowing their traffic."
   ],
   [
    "Passive authentication",
    "Identifying users without a prompt by learning logons from another source, typically FSSO."
   ],
   [
    "Idle vs hard timeout",
    "Idle timeout logs a user out after inactivity; hard timeout logs them out a fixed time after login regardless of activity."
   ],
   [
    "DNS-before-login rule",
    "A policy allowing DNS without authentication, placed above the captive-portal policy, so browsers can resolve names and reach the login page."
   ]
  ],
  "example": "Users behind a captive-portal policy never see a login page and browsing fails because DNS is only allowed by that same policy. Adding a DNS-allow policy above it, with no user requirement, lets names resolve and the portal appears.",
  "mistakes": [
   [
    "DNS traffic will trigger the captive portal, so no separate DNS policy is needed.",
    "DNS cannot trigger the login page. Without a DNS-allow policy above the authentication policy, browsers cannot resolve names and the portal never appears."
   ],
   [
    "Passive authentication shows users a login page in the background.",
    "Passive methods such as FSSO never prompt; they learn identity from another source."
   ],
   [
    "An idle timeout logs users out even while they are active.",
    "That describes a hard timeout. An idle timeout resets with activity."
   ],
   [
    "Placing the DNS policy below the authentication policy works the same.",
    "Policies match top-down. If the authentication policy matches DNS first, the deadlock remains."
   ]
  ],
  "tryit": [
   [
    "Maple Grove Hotel requires guests to accept terms and log in through a captive portal. Staff report that guest phones connect to Wi-Fi but browsers show only an error after a long wait. The policy list contains a single outbound policy requiring the guest user group for all services. What should you change?",
    "Add a policy above the guest authentication policy that allows DNS from the guest network without a user requirement. Browsers can then resolve names, attempt HTTP or HTTPS, and be redirected to the captive portal by the authentication policy."
   ]
  ],
  "tip": "Captive portals trigger only on HTTP and HTTPS (and in some cases FTP and Telnet), and DNS cannot trigger them. Always allow DNS in a policy above the authentication policy or login is impossible.",
  "check": [
   [
    "What is the difference between active and passive authentication?",
    "Active prompts the user for credentials (captive portal); passive identifies them from another source such as FSSO without a prompt."
   ],
   [
    "Why must DNS be allowed before a captive-portal policy?",
    "Browsers must resolve names before reaching a site, and DNS cannot trigger the login page, so without a DNS-allow policy above it login never happens."
   ],
   [
    "What is the difference between an idle and a hard authentication timeout?",
    "Idle logs a user out after inactivity; hard logs them out a fixed time after login regardless of activity."
   ]
  ]
 },
 {
  "t": "FSSO: collector agent, DC agent mode vs polling mode, group filters, `diagnose debug authd fsso list`",
  "hook": "Fairview County's IT team just created a new Active Directory group called Grants-Team and added six staff to it. You built a FortiGate policy that lets only Grants-Team reach a federal reporting portal, and users already sign in to Windows every morning without ever seeing a firewall login. Yet the six staff are denied, while everyone in older groups works fine. The Windows administrator, Leon, has also made it clear that nothing new is getting installed on his domain controllers. How does the FortiGate learn who is logged on, and why would a brand-new group be invisible to it?",
  "simple": "Fortinet Single Sign-On, or FSSO, lets the firewall know who is using each computer without asking them to log in again. When someone signs in to Windows at work, the domain controller, the server that checks Windows logins, writes that down. A small Windows program called the collector agent gathers those logins and tells the firewall, this user with these groups is at this address. It can learn about logins instantly from helper programs on each domain controller, or by checking the domain controllers' logs every so often. The firewall is only told about the groups you pick in a filter, so a new group must be added there. It is like a building's front desk calling up only the departments on its list.",
  "body": [
   "Fortinet Single Sign-On (FSSO) is the main passive authentication method for Windows Active Directory (AD) environments. It lets the FortiGate apply user- and group-based policies without prompting anyone, by learning who has logged on to the domain and mapping each username and its groups to the IP address of the computer they logged on from. Understanding its components, its two collection modes and how to verify it is a core exam objective.",
   "At the center is the collector agent, a service installed on a Windows server in the domain. It gathers domain logon information, maintains the current list of logged-on users with their IP addresses and groups, and forwards those user-to-IP-to-group mappings to the FortiGate over a dedicated connection. On the FortiGate you define the collector agent as a Fortinet Single Sign-On Agent connector under the Security Fabric external connectors, giving its address and password. When traffic later arrives from an IP address, the FortiGate already knows the user and their groups, so FSSO user groups in policies match immediately.",
   "There are two ways the collector learns about logons. In DC agent mode, a small DC agent is installed on each domain controller (DC). It captures logon events as they happen and pushes them to the collector agent in real time. This mode is accurate and low-latency, and it scales well in large domains, but it requires installing software on every DC and keeping it updated. In polling mode, no agent runs on the DCs. Instead the collector agent periodically reads logon information from each domain controller remotely, for example by checking the DC security event logs. The FortiGate itself can also do this without any collector, a variant called agentless polling, which suits smaller environments. Polling needs no software on the DCs, which pleases Windows teams that forbid extra agents, but it adds delay and load because logons are discovered on a poll interval rather than instantly, and a very busy DC may produce events faster than polling can comfortably read them.",
   "Choosing between the modes is a common scenario question. If the requirement says no software is allowed on domain controllers, the answer is polling mode, either through the collector agent or agentless polling on the FortiGate. If the requirement emphasizes near-instant, accurate user mapping in a large domain, and installing agents is acceptable, DC agent mode fits better.",
   "Group filters decide which AD groups FSSO actually reports to the FortiGate. A directory can contain thousands of groups, and sending all of them for every user would be wasteful, so FSSO only sends the groups you select in the group filter, which can be configured on the collector agent or, depending on the design, on the FortiGate. Users who belong to no selected group may not be reported with useful groups at all. When a newly created group's members never match policies, the usual cause is that the group was not added to the group filter, so its membership is never sent. After adding the group to the filter, it also has to be included in the FortiGate's FSSO user group used by the policy, and users typically need a fresh logon event for their new membership to be picked up.",
   "To verify what the FortiGate has learned, `diagnose debug authd fsso list` prints the FSSO logon entries the FortiGate currently holds, showing each user, their source IP address and the groups reported for them. It is your first check when user-based policies are not matching. If the user is missing entirely, the problem lies in collection, such as the connection to the collector, the polling setup, or the DC agent. If the user appears but without the expected group, the group filter is the likely cause. If the user and group both appear correctly, look instead at the policy order and the FSSO user group configuration.",
   "A few practical points round this out. FSSO identifies users by IP address, so shared addresses, such as terminal servers where many users log on from one IP, need special handling with a terminal services agent. Logoff detection is imperfect, which is why FSSO relies on workstation checks and timeouts to age out stale entries. Neither detail changes the core exam answers, but both explain real-world surprises.",
   "In a lab you install the collector agent, choose DC agent or polling mode, add the groups you need to the group filter, connect the FortiGate to the collector, and confirm the mappings with `diagnose debug authd fsso list` before requiring an FSSO group on a policy."
  ],
  "analogy": "FSSO is like a hotel front desk that calls the security office every time a guest checks in, saying which room and which tour group they belong to. DC agent mode is a clerk at each desk who phones security the moment a guest checks in. Polling mode is a security guard who walks around every few minutes reading the guest books. The group filter is the list of tour groups security cares about; a new tour group not on the list is never mentioned, however many members check in.",
  "terms": [
   [
    "Collector agent",
    "A Windows service that gathers logon data and sends user-to-IP-to-group mappings to the FortiGate."
   ],
   [
    "DC agent mode",
    "An agent on each domain controller that pushes logon events to the collector in real time."
   ],
   [
    "Polling mode",
    "The collector, or the FortiGate in agentless polling, periodically reads logon information from the DCs remotely, with no software on the DCs but more delay."
   ],
   [
    "Group filter",
    "The selection of AD groups FSSO reports to the FortiGate; groups not selected are never sent."
   ],
   [
    "diagnose debug authd fsso list",
    "A FortiGate CLI command that shows the current FSSO logon entries: user, IP address and groups."
   ]
  ],
  "example": "A Windows team forbids installing anything on domain controllers, so the admin uses FSSO polling mode, which reads logon events from the DCs remotely instead of running a DC agent. When a new group's members are not matched, the admin adds the group to the collector's group filter and confirms it with `diagnose debug authd fsso list`.",
  "mistakes": [
   [
    "DC agent mode needs no software on domain controllers.",
    "DC agent mode installs an agent on every DC. Polling mode is the choice when DC software is not allowed."
   ],
   [
    "FSSO sends all AD groups to the FortiGate automatically.",
    "Only groups selected in the group filter are sent. A missing group is a classic cause of failed matches."
   ],
   [
    "FSSO shows users a login page if it cannot identify them.",
    "FSSO is passive and never prompts. A captive portal fallback must be configured separately if desired."
   ],
   [
    "Polling mode is always faster than DC agent mode because it reads logs directly.",
    "Polling discovers logons on an interval, so it adds delay; DC agent mode pushes events in real time."
   ]
  ],
  "tryit": [
   [
    "At Ironwood Engineering, user Kim logs on to Windows but cannot reach a site that requires the CAD-Users FSSO group. Running `diagnose debug authd fsso list` shows Kim with her correct IP address but only the Domain Users group. What is the most likely cause and the next step?",
    "Collection is working because Kim appears with the right IP, but CAD-Users is not being reported, so it is most likely missing from the group filter. Add CAD-Users to the filter, make sure the FortiGate's FSSO user group includes it, and have Kim log on again so her new membership is reported."
   ]
  ],
  "tip": "If a new AD group's members never match policies, check the FSSO group filter first. That group is probably not selected, so its membership is never sent to the FortiGate.",
  "check": [
   [
    "What does the collector agent do in FSSO?",
    "It gathers domain logon information and forwards user-to-IP-to-group mappings to the FortiGate."
   ],
   [
    "When would you choose polling mode over DC agent mode?",
    "When you cannot install software on the domain controllers; polling reads logon information remotely, at the cost of some delay."
   ],
   [
    "FSSO users from a new group never match policies. What is the likely cause?",
    "The group is not in the FSSO group filter, so its membership is never sent; verify with diagnose debug authd fsso list."
   ],
   [
    "What does `diagnose debug authd fsso list` show?",
    "The FSSO logon entries the FortiGate currently holds, with each user, source IP address and groups."
   ]
  ]
 },
 {
  "t": "Two-factor authentication with FortiToken",
  "hook": "On a Friday evening at Silver Lake Credit Union, the security team notices a burst of failed VPN logins for an accountant named Elena, followed by a successful one from an unfamiliar location. Her password was apparently reused on a site that suffered a breach. The VPN accepted it because a password was all it asked for. On Monday, the CIO, Raymond, wants a second factor on every VPN and administrator account before the end of the month, using what the FortiGate already supports. Where do you turn it on, and what exactly makes a stolen password useless?",
  "simple": "Two-factor authentication means you need two different kinds of proof to log in: something you know, like a password, and something you have, like a phone or small keyfob. FortiToken is Fortinet's version of the something-you-have part. It shows a short number that changes every 30 or 60 seconds. You type your password and then the current number. A thief who steals only the password cannot log in, because they do not have the token. On a FortiGate you turn this on for each person's account and link that person's token to it. It is like a bank card: knowing the PIN is not enough without the card.",
  "body": [
   "Two-factor authentication (2FA) strengthens login by requiring two different kinds of evidence: something the user knows, such as a password, and something the user has, such as a device that produces a one-time code. On FortiGate, Fortinet's own token system is FortiToken. Knowing how tokens are assigned and where they apply is a small but reliable exam topic, and it is one of the most effective controls an administrator can deploy.",
   "A FortiToken generates a time-based one-time password (TOTP), a short numeric code that changes on a fixed interval of 30 or 60 seconds. Both the token and the FortiGate know a shared secret seed and the current time, so each can calculate the same code independently, and the FortiGate accepts the code only within its brief validity window. FortiToken comes in two forms. FortiToken hardware is a physical keyfob with a small screen that displays the code. FortiToken Mobile is a smartphone app that shows the code and can also support push notifications where the user simply approves a login prompt on their phone. Each token is a distinct second factor bound to one account. The FortiGate also supports email- and SMS-delivered codes as alternative second factors, but FortiToken is Fortinet's dedicated method and the one the exam focuses on.",
   "The key operational fact is that FortiToken is assigned per user. First you register the token on the FortiGate. Hardware tokens are added by serial number, and mobile tokens are added as licenses and activated through FortiGuard, after which the user receives an activation code to load into the app. Then you edit the individual user account, enable two-factor authentication, and assign that specific token to it. From then on, when the user authenticates, they enter their password and then the current code from their token. The token list in the GUI shows each token's status, such as available, assigned or pending activation, which helps track a rollout.",
   "Assigning tokens per account is what the exam expects. Distractors often suggest things like enabling a setting only on an administrator profile, or enforcing longer passwords. Neither adds a second factor for firewall users. A longer password is still a single factor that can be phished or reused, and an admin profile controls what an administrator may do, not how a firewall user proves who they are.",
   "Two-factor protection applies wherever the account is used. Firewall users authenticating through a captive portal or a virtual private network (VPN), such as SSL VPN or IPsec with user authentication, can be required to present a token code. Administrators can be required to present one at management login, through the GUI or the CLI. Remote users from LDAP or RADIUS can also be given tokens, by creating a matching user entry on the FortiGate that points to the remote server for the password and carries the token for the second factor. So the same mechanism hardens both user access and administrator access, assigned account by account.",
   "Why it matters is straightforward. Passwords alone fall to phishing, reuse across sites and guessing. A stolen password is useless without the current token code, and because the code changes every interval, a code captured once quickly expires. Two-factor authentication therefore sharply reduces the risk of account takeover, which is why it is recommended for every administrator account and for any sensitive user access such as VPN. It does not stop every attack, for example a user tricked into approving a fraudulent push prompt, so user awareness still matters.",
   "Operationally, plan for lost and replaced tokens. A user who loses a phone or keyfob cannot log in, so the help desk needs a process to verify identity, unassign the old token and assign a new one. Clocks matter too: TOTP depends on time, so the FortiGate should keep accurate time, typically through the Network Time Protocol (NTP). If a token's codes are consistently rejected even though the user types them correctly, a clock that has drifted on either side is a likely cause. It is also wise to keep at least one break-glass administrator path documented and tested, so that a token problem never locks every administrator out of the FortiGate at once.",
   "For the exam, remember: FortiToken, hardware or mobile, provides a TOTP second factor; you assign it per user account and enable two-factor on that account; and it protects both firewall users and administrators. In a lab, assign a FortiToken Mobile to a test account, enable two-factor, and confirm the login now asks for the code after the password."
  ],
  "analogy": "Two-factor authentication works like a bank card and PIN. Knowing the PIN alone is not enough, and holding the card alone is not enough; you need both. A FortiToken is a card that prints a new PIN every 30 or 60 seconds, so even someone who watched you type one code cannot reuse it later. The analogy stops at assignment: a bank mails one card to one customer, and likewise each FortiToken is bound to exactly one user account.",
  "terms": [
   [
    "Two-factor authentication (2FA)",
    "Requiring a password plus a second proof, such as a token code, so a stolen password alone cannot log in."
   ],
   [
    "FortiToken",
    "Fortinet's one-time-password token, available as a hardware keyfob or the FortiToken Mobile app, providing a TOTP second factor."
   ],
   [
    "TOTP",
    "A time-based one-time password that changes on a short interval, the code a FortiToken displays."
   ],
   [
    "Per-user assignment",
    "Enabling two-factor on an individual account and binding a specific token to it, rather than using a global toggle."
   ]
  ],
  "example": "To add Fortinet 2FA for VPN users, an admin registers a FortiToken Mobile for each user, enables two-factor on each user account and assigns the token, so each VPN login requires the password plus the current app code.",
  "mistakes": [
   [
    "Enforcing longer, complex passwords provides two-factor authentication.",
    "A longer password is still one factor. 2FA needs a second proof such as a FortiToken code."
   ],
   [
    "Two-factor for firewall users is enabled on an administrator profile.",
    "Admin profiles control administrator permissions. FortiToken is enabled and assigned on each user account."
   ],
   [
    "One FortiToken can be shared by a team.",
    "Each token is bound to one account, so each user needs their own token."
   ],
   [
    "FortiToken can protect only VPN users, not administrators.",
    "It can be required for administrator logins as well as firewall users."
   ]
  ],
  "tryit": [
   [
    "Bluewater Logistics wants a second factor for its three FortiGate administrators and 40 VPN users. A consultant suggests enabling a global password complexity policy and calling it 2FA. What should the company actually do?",
    "Register FortiTokens (hardware or mobile), then enable two-factor authentication on each administrator account and each VPN user account and assign one token per account. Password complexity remains a single factor and does not stop a stolen password from working."
   ]
  ],
  "tip": "FortiToken is assigned per user account, not via an admin profile toggle or a password rule. Enabling two-factor on the account and binding the token is the configured answer.",
  "check": [
   [
    "How do you add Fortinet two-factor authentication for a firewall user?",
    "Enable two-factor on that user account and assign a FortiToken (hardware or mobile) to it."
   ],
   [
    "What kind of code does a FortiToken produce?",
    "A time-based one-time password (TOTP) that changes every 30 or 60 seconds."
   ],
   [
    "Can the same FortiToken mechanism protect administrator logins?",
    "Yes; two-factor with FortiToken can be required for administrators as well as firewall users, assigned per account."
   ]
  ]
 },
 {
  "t": "SSL/SSH inspection: certificate inspection vs deep inspection, CA trust, exemptions, certificate pinning, untrusted certificate handling",
  "hook": "Your test at Crescent Valley Hospital looked simple: download the harmless EICAR antivirus test file from a website. Over HTTP, the FortiGate blocks it instantly. Over HTTPS, the same file downloads without a whisper. Your colleague Nadia flips the policy to deep inspection, and within ten minutes the help desk is flooded with certificate warnings, the patient-portal mobile app stops connecting, and the privacy officer asks whether you are now reading staff banking sessions. Encryption hides threats from the firewall, but opening it up has real costs. How do you see inside safely, and what do you leave alone?",
  "simple": "Most websites today scramble their traffic so nobody in between can read it. That protects people, but it also hides viruses from the firewall. Certificate inspection only reads the outside of the envelope: which website you are visiting. It does not open anything. Deep inspection actually opens the envelope, checks what is inside, then seals it again in a new envelope signed by the firewall. For that to work without warnings, every computer must trust the firewall's signature. Some apps only trust their own envelope and refuse the resealed one, and some sites, like banking, you should choose not to open at all. It is like a mailroom that scans packages but skips private medical letters.",
  "body": [
   "Most traffic today is encrypted with Transport Layer Security (TLS), the protocol behind HTTPS, so a firewall that cannot look inside encrypted sessions is blind to much of what it is supposed to filter. FortiGate handles this with SSL/SSH (Secure Sockets Layer and Secure Shell) inspection profiles, which are attached to firewall policies alongside security profiles. There are two levels of inspection, and choosing between them, plus dealing with the certificate side effects, is one of the most important content-inspection concepts on the exam.",
   "Certificate inspection is the light-touch level. It does not decrypt the session. It reads only the parts of the TLS handshake that are visible without decryption, chiefly the Server Name Indication (SNI), the hostname the client asks for, and the server's certificate, which carries the hostname and issuer. From that, the FortiGate can apply web filtering by FortiGuard category and identify many applications. Because it never sees the encrypted payload, it cannot scan downloaded files for viruses, cannot see the full URL path, and cannot enforce fine-grained actions inside an application, such as blocking uploads while allowing browsing. It is fast, and it causes no certificate warnings because the client still sees the real server certificate.",
   "Deep inspection, also called full SSL inspection, actually decrypts the traffic. The FortiGate acts as a trusted man-in-the-middle. It terminates the client's TLS session, opens its own TLS session to the real server, decrypts and inspects the content, then re-encrypts it toward the client. To do that, it presents the client with a certificate for the site that it has re-signed using its own certificate authority (CA). With the payload visible, everything becomes available: files for antivirus, full URLs for URL-path filtering, application actions, and data for data loss prevention. Deep inspection is therefore required for antivirus scanning, content disarm and reconstruction, detailed application control and URL-path filtering on encrypted traffic. When antivirus catches malware over HTTP but misses it over HTTPS, the fix is to change that policy's SSL inspection profile to deep inspection.",
   "The cost of deep inspection is trust. The client now receives a certificate signed by the FortiGate's CA rather than by the real site's public CA, so browsers show warnings unless they already trust the FortiGate CA. The proper rollout is to distribute the FortiGate's signing CA certificate, or an enterprise subordinate CA that you load onto the FortiGate, to all managed clients through Group Policy Objects (GPO) or mobile device management (MDM). Then the re-signed certificates are trusted silently. Importing each website's certificate is not the fix, and neither is telling users to click through warnings, which trains them to ignore real attacks. Unmanaged guest devices will not trust the CA, which is one reason guest networks often use certificate inspection instead.",
   "Exemptions let you skip decryption for selected traffic while still deep-inspecting everything else. You can exempt by FortiGuard category, by address, or by other criteria. A common choice is never to decrypt online banking, finance or health sites, for privacy, legal or regulatory reasons, and because these sites are generally lower risk. Exempted traffic still passes through the policy and can still be filtered by category using the handshake information, it is just not decrypted.",
   "Certificate pinning is the other big edge case. Some applications, especially mobile apps and software updaters, are hard-coded to accept only a specific expected certificate or public key for their servers. Such an app rejects the FortiGate's re-signed certificate, even though the device trusts the FortiGate CA, and simply stops working under deep inspection. The fix is to exempt that application's destinations from decryption, often using an Internet Service Database entry or address objects for the service.",
   "The profile also controls how the FortiGate handles untrusted server certificates, meaning the real server's certificate is itself invalid, expired, self-signed or issued by an unknown CA. Because the client only sees the FortiGate's re-signed certificate under deep inspection, it cannot judge the real one, so the FortiGate must decide. The options are allow, block or ignore. Blocking is the safer default for most environments, since an invalid server certificate can signal an interception attempt. The same profile can also apply inspection to SSH traffic, letting the FortiGate see and control SSH sessions, which is where the SSH part of the name comes from.",
   "In a lab, attach the built-in certificate-inspection profile to a policy and try the EICAR test over HTTPS, then switch to a deep-inspection profile, import the FortiGate CA into a browser, and compare the site's certificate issuer before and after to see the re-signing in action. Add an exemption for a banking category and confirm its certificate remains the original."
  ],
  "analogy": "Certificate inspection is a mailroom clerk reading only the address on the envelope: they know where it is going, but not what is inside. Deep inspection is the clerk opening the envelope, checking the contents, and resealing it in a new envelope stamped with the company seal. Employees accept it only if they recognize the company seal, which is CA trust. Some recipients insist on the original sender's seal and reject anything resealed, which is certificate pinning. Exemptions are letters the clerk is told never to open.",
  "terms": [
   [
    "Certificate inspection",
    "SSL inspection that reads only the handshake (SNI and certificate) without decrypting, enabling category and app identification but not payload scanning."
   ],
   [
    "Deep inspection",
    "Full SSL inspection that decrypts, inspects and re-encrypts traffic using a certificate re-signed by the FortiGate CA; required for antivirus and detailed inspection."
   ],
   [
    "CA trust distribution",
    "Pushing the FortiGate's signing CA to clients through GPO or MDM so re-signed certificates are trusted and warnings stop."
   ],
   [
    "Inspection exemption",
    "A rule that skips decryption for chosen categories or addresses, such as banking or health sites, while deep-inspecting other traffic."
   ],
   [
    "Certificate pinning",
    "An app accepting only its own expected certificate, which rejects the FortiGate's re-signed one and requires an exemption."
   ]
  ],
  "example": "Antivirus flags the EICAR test file over HTTP but not HTTPS because the policy uses certificate inspection. Switching to deep inspection lets the FortiGate decrypt the payload so the antivirus scan catches the file over HTTPS too, after the FortiGate CA has been pushed to all managed laptops.",
  "mistakes": [
   [
    "Certificate inspection can scan HTTPS downloads for viruses.",
    "It never decrypts the payload, so antivirus cannot see files. Deep inspection is required."
   ],
   [
    "To stop certificate warnings, import each website's certificate on the clients.",
    "Distribute the FortiGate's signing CA to clients so all re-signed certificates are trusted."
   ],
   [
    "A pinned app will work under deep inspection once the device trusts the FortiGate CA.",
    "Pinned apps accept only their own expected certificate, so they reject the re-signed one regardless. Exempt their destinations."
   ],
   [
    "Exempting a category means its traffic bypasses the firewall policy entirely.",
    "Exempt traffic still matches the policy and can be filtered by category; it is just not decrypted."
   ]
  ],
  "tryit": [
   [
    "Juniper Ridge Accounting enables deep inspection for staff. Afterward, managed laptops browse fine, but a popular banking app on company phones and a third-party software updater both fail to connect, and the privacy officer objects to decrypting personal banking. What should you configure?",
    "Add exemptions to the SSL inspection profile for the Finance and Banking category, which addresses privacy, and for the updater's and banking app's destinations, because pinned apps reject the re-signed certificate. Keep deep inspection for other traffic so antivirus still sees encrypted downloads."
   ]
  ],
  "tip": "Only deep inspection can scan payloads (antivirus, full URLs, in-app actions). Certificate inspection sees only SNI and the certificate. Clients must trust the FortiGate CA, or every site throws a warning.",
  "check": [
   [
    "What can certificate inspection do, and what does it miss?",
    "It reads SNI and the certificate for category and app identification but cannot decrypt the payload, so it cannot scan files or see full URLs and in-app actions."
   ],
   [
    "After enabling deep inspection every user sees certificate warnings. What is the fix?",
    "Distribute the FortiGate's signing CA to all clients (GPO or MDM) so the re-signed certificates are trusted."
   ],
   [
    "Why does a certificate-pinned mobile app break under deep inspection?",
    "It accepts only its own expected certificate and rejects the FortiGate's re-signed one; exempt the app's destinations from decryption."
   ],
   [
    "What are the options for handling an untrusted server certificate?",
    "Allow, block or ignore; blocking is generally safer because an invalid certificate may signal an attack."
   ]
  ]
 },
 {
  "t": "Inspection modes: flow-based vs proxy-based, set per policy; profile-based vs policy-based NGFW mode",
  "hook": "At Stonebridge Law, the guest Wi-Fi is sluggish during a busy client event, while the finance team wants every emailed attachment stripped of active content before it lands in an inbox. You are told to make the guests fast and finance thorough, on the same FortiGate. A vendor engineer, Grace, adds that her other customers write rules like 'allow these applications for this group' instead of attaching profiles to policies, and asks if the FortiGate can do that. Two different questions are hiding here, and people routinely mix them up. Which setting controls speed versus depth, and which controls the style of your rules?",
  "simple": "A FortiGate can check traffic in two ways. Flow-based checks it as it streams past, like a security guard glancing at people walking through a door. It is fast but cannot do every kind of check. Proxy-based holds the whole thing, such as an entire file, checks it carefully, then passes it on, like a guard who stops each bag and opens it. It is slower but can do more, such as cleaning risky parts out of documents. In the normal setup you choose flow or proxy separately on each rule. A different question is how you write rules: attach security profiles to each rule, or name applications and website categories directly in the rule. Those are two separate choices.",
  "body": [
   "FortiGate can inspect content with two engines, flow-based and proxy-based, and it can organize security rules in two next-generation firewall (NGFW) styles, profile-based and policy-based. The exam tests both distinctions, and the most common mistake is treating them as the same choice. They are independent: one is about how content is inspected, the other is about how you express security rules.",
   "Flow-based inspection examines traffic as packets stream through, without holding the whole object. It scans on the fly and buffers as little as possible. For antivirus, for example, the FortiGate typically holds back only the final packet of a file until the scan verdict is ready, then either releases it or blocks the transfer. Because data is not buffered in full, flow-based inspection has lower latency, higher throughput and lower memory use, which makes it a good fit for high-volume or latency-sensitive traffic such as guest browsing. The trade-off is that some features that need the complete object are limited or unavailable in flow mode.",
   "Proxy-based inspection buffers the entire object, for example a whole file or the full HTTP transaction, before scanning it, then forwards it to the destination. The FortiGate effectively acts as a proxy between client and server. Because it holds the complete content, proxy mode supports richer features, notably content disarm and reconstruction (CDR), which removes active content such as macros from documents and passes along a cleaned version, and customizable replacement messages and block pages that tell the user what happened. It also handles some protocols more thoroughly. The cost is more memory, more latency and lower throughput. When a question requires CDR or full replacement messages, that points to proxy mode.",
   "In profile-based NGFW mode, which is the traditional and default style, the inspection mode is chosen per firewall policy. In the policy editor you see an Inspection Mode setting with Flow-based and Proxy-based options. One policy can be flow-based and another proxy-based, so you can mix them as each workload requires on the same FortiGate. The answer to the question of where you pick flow or proxy in profile-based mode is: in each firewall policy, not globally and not per interface. The security profiles you attach must suit the mode; some profile options only appear when the policy uses proxy mode.",
   "The second, separate distinction is how security features are attached. In profile-based NGFW mode you build security profiles, such as antivirus, web filter, application control and intrusion prevention, and attach them to firewall policies. Each policy both allows the traffic and carries the profiles that inspect it. To block a social media application, you edit an application control profile and attach it to the relevant policy.",
   "In policy-based NGFW mode, which is selected per virtual domain (VDOM), you instead reference applications and URL categories directly inside security policies. A security policy might say: users in the Marketing group may use these named applications and these web categories, and everything else is denied. SSL inspection and source and destination network address translation (NAT) are handled in separate, dedicated policies rather than inside each security rule. Policy-based mode can feel more like some other NGFW vendors, expressing intent as allow these applications or categories, but routing, authentication and the rest of the FortiGate still work as usual. Switching modes is a significant change, so it is planned rather than toggled casually.",
   "In day-to-day operation, a good pattern is to default to flow-based inspection for most policies and reserve proxy-based inspection for the policies where its extra features justify the cost. A busy guest or general browsing policy gains little from buffering every object, while a policy carrying email or downloads for a sensitive department may genuinely need CDR or detailed replacement messages. Reviewing the policy list with the inspection mode visible helps confirm that each policy uses the engine you intended, rather than whatever a previous administrator happened to choose.",
   "Keep the two axes straight with a simple test. If the question is about speed versus depth, or about features such as CDR and replacement messages, it is asking about flow versus proxy. If the question is about whether applications are referenced inside security policies or through profiles attached to firewall policies, it is asking about profile-based versus policy-based. In profile-based mode the flow or proxy choice lives on each policy.",
   "In a lab, create two policies, set one to flow-based and one to proxy-based, attach an antivirus profile to each, and observe which options, such as CDR or certain replacement messages, appear only for the proxy-based policy. Then compare throughput or page load behavior for large downloads through each policy."
  ],
  "analogy": "Flow-based inspection is an airport scanner belt: bags roll through continuously and are checked on the move, so lines stay short. Proxy-based is the secondary search table, where a bag is opened, everything is examined, and some items are removed before the bag is handed back. Profile-based versus policy-based is a different matter entirely: it is whether the rules are written as 'this checkpoint uses scanner settings X' or 'travelers in group Y may carry items Z'. Where the analogy stops: the FortiGate chooses scanner or table per policy, not per traveler.",
  "terms": [
   [
    "Flow-based inspection",
    "Scanning traffic as packets pass with minimal buffering; lower latency and higher throughput but fewer full-object features."
   ],
   [
    "Proxy-based inspection",
    "Buffering the whole object before scanning; supports CDR and replacement messages at higher memory and latency cost."
   ],
   [
    "Content disarm and reconstruction (CDR)",
    "Removing active content such as macros from files and forwarding a cleaned version; requires proxy-based inspection."
   ],
   [
    "Profile-based NGFW mode",
    "The default style where security profiles are attached to firewall policies, and inspection mode is set per policy."
   ],
   [
    "Policy-based NGFW mode",
    "A style where applications and URL categories are referenced directly in security policies, with SSL inspection and NAT in separate policies."
   ]
  ],
  "example": "A firm sets its guest Wi-Fi policy to flow-based for speed but keeps the finance policy proxy-based so it can use content disarm and reconstruction on email attachments. Both live on the same FortiGate in profile-based mode, each choice made on its own policy.",
  "mistakes": [
   [
    "Flow or proxy inspection is a single global setting for the whole FortiGate.",
    "In profile-based mode it is chosen per firewall policy, so different policies can use different modes."
   ],
   [
    "Policy-based NGFW mode is the same thing as proxy-based inspection.",
    "They are separate axes: NGFW mode is the rule style; flow versus proxy is the inspection engine."
   ],
   [
    "Flow-based inspection supports CDR because it is faster.",
    "CDR needs the complete object, which only proxy-based inspection buffers."
   ],
   [
    "In policy-based mode, routing and authentication stop working.",
    "They still exist; what changes is that applications and categories are referenced directly in security policies, with SSL inspection and NAT in separate policies."
   ]
  ],
  "tryit": [
   [
    "Halcyon Architects wants maximum speed for a policy carrying large video conferencing traffic, and wants users who hit a blocked file download on the office policy to see a detailed custom replacement page. The FortiGate uses profile-based NGFW mode. How should each policy be set?",
    "Set the conferencing policy to flow-based inspection for lower latency and higher throughput. Set the office policy to proxy-based inspection, which supports full custom replacement messages. Both are set individually on each policy because profile-based mode chooses inspection mode per policy."
   ]
  ],
  "tip": "Two separate choices: flow vs proxy (engine) and profile-based vs policy-based (rule style). In profile-based mode the inspection mode is chosen per policy, not globally or per interface.",
  "check": [
   [
    "Where is the inspection mode chosen in profile-based NGFW mode?",
    "In each firewall policy, so different policies can use flow or proxy independently."
   ],
   [
    "What can proxy-based inspection do that flow-based cannot?",
    "Buffer the whole object to support features like content disarm and reconstruction and full replacement messages, at higher resource cost."
   ],
   [
    "What changes in policy-based NGFW mode?",
    "Security policies reference applications and URL categories directly, while SSL inspection and NAT are handled in separate policies; routing and authentication still exist."
   ]
  ]
 },
 {
  "t": "Web filtering: FortiGuard categories and actions (allow, monitor, warning, authenticate, block), static URL filter (exempt vs allow), rating errors, overrides",
  "hook": "At Hollow Pine Public Schools, social networking is blocked for students and staff. Then the communications director, Maria, needs the district's own page on a blocked social site to load for the weekly newsletter. You add the page to the static URL filter with Allow, and it is still blocked. The next morning, FortiGuard is briefly unreachable from the district and every website stops loading, including the learning platform, until connectivity returns. Two puzzles, two settings. Why did Allow not work, and why did a brief outage take down all browsing?",
  "simple": "Web filtering decides which websites people can visit. Fortinet sorts millions of sites into categories, such as news, gaming or banking, and you choose what happens for each category: let it through, let it through but write it down, show a warning the person can click past, ask them to log in first, or block it. You can also keep your own list of specific web addresses that is checked before the categories. On that list, Exempt means let it through and skip the other checks, while Allow only passes this first check, so the category can still block it. If the firewall cannot reach Fortinet to look up a category, a setting decides whether to let sites load anyway.",
  "body": [
   "Web filtering controls which websites users may reach. FortiGate does it mainly through FortiGuard category ratings, plus a static URL filter that you maintain yourself, all configured in a web filter profile attached to a firewall policy. Knowing the available actions, the order in which the pieces are checked, and two key settings answers most web-filter questions on the exam. Remember that for HTTPS sites, category filtering works with certificate inspection, while seeing full URL paths requires deep inspection.",
   "FortiGuard rates websites into categories, such as Social Networking, Finance and Banking, Games or Malicious Websites, grouped under broader headings. When a user requests a site, the FortiGate queries FortiGuard for the rating, caching results to avoid repeated lookups. In the web filter profile you assign an action to each category. Allow permits the site silently. Monitor permits it but writes a log entry, which is useful for learning how a category is used before deciding to block it. Warning shows an interstitial page explaining the policy, and the user can choose to proceed. Authenticate requires the user to log in, typically as a member of a selected user group, before they can proceed. Block denies the request and shows a block page with no way through. The distinction most often tested is that Warning lets users continue while Block does not.",
   "The static URL filter is a list you build of specific URLs, simple patterns, wildcards or regular expressions, each with its own action. It is checked before the FortiGuard category action. Its actions include Block, Allow, Monitor and Exempt, and the difference between Exempt and Allow is a classic exam point. Exempt lets the URL through and skips all remaining web filter checks, including the FortiGuard category check, and can also bypass other inspection such as antivirus, depending on the options selected. Allow permits the URL at the static URL filter stage but still passes it on to later checks, such as the FortiGuard category, which can then block it. So to guarantee that one page on an otherwise blocked category loads, you use Exempt, not Allow.",
   "Rating errors happen when the FortiGate cannot get a category for a site, for example during a FortiGuard outage or when the FortiGate loses connectivity to FortiGuard servers. If the profile does not allow websites on a rating error, those lookups fail closed and the sites are blocked, which can take down all browsing during an outage, as the school district discovered. The profile option to allow websites when a rating error occurs lets sites load when a rating cannot be obtained, trading strictness for availability. Organizations with strict compliance needs might accept the outage risk, while most choose availability. You can check FortiGuard connectivity on the dashboard license and FortiGuard status, and with CLI commands such as `diagnose debug rating`, which shows the rating servers the FortiGate is using.",
   "Overrides provide controlled exceptions without editing the profile for everyone. A web filter user override lets an authorized user, after authenticating, temporarily switch to a different, less restrictive profile for a set time, for example a teacher who needs a blocked video category for one lesson. Overrides can apply to the user, their group or their IP address and expire automatically. Separately, a web rating override lets an administrator assign a specific URL to a different category locally, which is helpful when you believe a site is miscategorized or want it handled like a different category throughout the organization.",
   "The Warning and Authenticate actions deserve a closer look because their behavior is easy to confuse. With Warning, the user sees the policy explanation and a button to proceed, and after proceeding they can reach sites in that category for a configurable duration before being warned again. With Authenticate, the user must enter credentials that belong to a user group you selected for that category, so the decision depends on who they are rather than on a click. Authenticate suits categories that some staff legitimately need, such as a research team that must reach sites other employees should not.",
   "The web filter log records each decision with the URL, category, action and the profile and policy involved. When a site is unexpectedly blocked, the log tells you whether the static URL filter or the category made the decision, and whether a rating error occurred. That turns guesswork into a quick fix.",
   "The evaluation order to remember is: static URL filter first, where Exempt short-circuits everything that follows, then the FortiGuard category action. In a lab, block a category, add a page from that category to the static URL filter as Allow, and see it still blocked; then change the entry to Exempt and watch it load, while reading the web filter log for each attempt."
  ],
  "analogy": "Think of a nightclub. The static URL filter is the owner's personal list at the door, checked first. Someone marked Exempt is a VIP waved straight past every other check. Someone marked Allow merely passes the owner's list and still has to get past the dress code, which is the category check. Warning is the bouncer saying 'are you sure, it is loud in there' and letting you choose. Block is a firm no. A rating error is when the dress code book goes missing and the bouncer must decide whether to let everyone in or no one.",
  "mnemonic": "The five FortiGuard category actions in the order they are usually listed: Allow, Monitor, Warning, Authenticate, Block. Remember 'All Members Wait At Bouncers'.",
  "terms": [
   [
    "FortiGuard category action",
    "The per-category behavior in a web filter profile: Allow, Monitor, Warning, Authenticate or Block."
   ],
   [
    "Warning action",
    "Shows an interstitial page that lets the user choose to continue, unlike Block, which gives no option."
   ],
   [
    "Static URL filter (Exempt vs Allow)",
    "A URL list checked before categories; Exempt skips all remaining checks, while Allow still passes the URL to the category check."
   ],
   [
    "Rating error handling",
    "The setting that allows websites when FortiGuard cannot be reached to rate them, instead of blocking them."
   ],
   [
    "Web filter override",
    "A controlled, temporary exception that lets an authenticated user use a less restrictive profile; a web rating override re-categorizes a URL locally."
   ]
  ],
  "example": "Social Networking is blocked, but the communications team needs the district's page on a blocked social site to load, so the admin adds that URL to the static URL filter with Exempt, which skips the category check. Allow would still be blocked by the category.",
  "mistakes": [
   [
    "Adding a URL to the static URL filter with Allow guarantees it loads even if its category is blocked.",
    "Allow still passes the URL to the FortiGuard category check, which can block it. Use Exempt."
   ],
   [
    "Warning and Block both prevent access.",
    "Warning lets the user click through and continue; Block gives no way through."
   ],
   [
    "The FortiGuard category is checked before the static URL filter.",
    "The static URL filter is checked first, then the category action."
   ],
   [
    "Rating errors only affect unknown sites.",
    "If FortiGuard is unreachable, every lookup can fail, and without the allow-on-rating-error option all browsing can be blocked."
   ]
  ],
  "tryit": [
   [
    "Copperfield Bank blocks the Games category. HR wants employees to see a warning but still be able to reach a corporate wellness site rated as Games, and the security team wants to learn how much Streaming Media is used before deciding on a policy. Which settings meet both needs?",
    "Add the wellness site's URL to the static URL filter with Exempt so it loads despite the Games block; if HR specifically wants a click-through, a web rating override could move it to a category set to Warning. Set Streaming Media to Monitor, which permits the traffic but logs it, so the team can measure usage first."
   ],
   [
    "During a regional internet issue, a FortiGate cannot reach FortiGuard and users report that no websites load. The web filter profile has the allow-on-rating-error option disabled. What is happening and what is the trade-off of changing it?",
    "Rating lookups are failing, and with the option disabled the FortiGate blocks sites it cannot rate. Enabling allow websites when a rating error occurs keeps browsing available during outages, at the cost of letting unrated sites through without category filtering for that period."
   ]
  ],
  "tip": "Exempt short-circuits all remaining checks; Allow only passes the static URL filter stage and can still be blocked by the FortiGuard category. Use Exempt to guarantee a page loads.",
  "check": [
   [
    "What does a user see when a category action is set to Warning?",
    "An interstitial warning page that lets them choose to continue, unlike Block, which gives no way through."
   ],
   [
    "What is the difference between Exempt and Allow in the static URL filter?",
    "Exempt skips all remaining web filter checks; Allow permits the URL there but still sends it to the FortiGuard category check, which can block it."
   ],
   [
    "How do you keep browsing working during a FortiGuard outage?",
    "Enable the option to allow websites when a rating error occurs, so unreachable lookups load instead of being blocked."
   ],
   [
    "Which is checked first, the static URL filter or the FortiGuard category?",
    "The static URL filter, then the FortiGuard category action."
   ]
  ]
 },
 {
  "t": "DNS filtering and safe search",
  "hook": "It is 7:40 a.m. at Pinewood Middle School, and Ms. Okafor from the library is at your door. A student searched for a science project image and the results were anything but school-appropriate. Worse, the district's security team emailed overnight: two lab laptops tried to reach a domain flagged as malware command-and-control. The district has no budget to roll out a trusted certificate to every student device, so decrypting all HTTPS traffic is off the table for now. You have one FortiGate between the school and the Internet. Can you still stop bad domains and keep search results clean without breaking into encrypted traffic?",
  "simple": "Before your computer can visit any website, it has to ask a phone book called DNS (the Domain Name System) for the site's number, its IP address. DNS filtering means the FortiGate listens to those phone book questions. If someone asks for the number of a known bad or banned site, the FortiGate refuses to answer, or points the device to a warning page instead. The device never gets the number, so it never connects. This works for every app, not just web browsers, and the FortiGate never needs to read the encrypted conversation itself. Safe search is a related rule: it forces search sites like Google or Bing into their family-friendly mode so users cannot switch it off. Think of a school librarian who checks the call slip before fetching any book.",
  "body": [
   "DNS filtering acts at the very first step of almost every Internet connection: the moment a client looks up a domain name. Instead of waiting to see a web request or a file, the FortiGate makes its decision on the name being resolved, before any connection to the destination exists. It is a lightweight complement to web filtering, and its independence from TLS (Transport Layer Security) decryption is exactly why the NSE 4 exam likes it.",
   "The mechanism is straightforward. A DNS filter profile is attached to a firewall policy that carries the clients' DNS traffic. When a client sends a DNS query through that policy, the FortiGate reads the requested domain and asks FortiGuard for its rating, using the same category system that web filtering uses (categories such as Malicious Websites, Phishing, Gambling or Newly Registered Domains). It then applies the action configured for that category. Typical actions are allow, monitor (allow but log), block, or redirect to a block portal, where the FortiGate answers the query with the address of its own block page so a browser user sees an explanation instead of a silent failure. In the DNS filter log you would see the queried domain, the category, the client address and the action taken.",
   "Because the decision is made on the domain in the query, DNS filtering is protocol independent. It does not matter whether the client is a browser, a mail client, an update agent or a piece of malware; if the name does not resolve, the connection never starts. It also needs no SSL inspection and no CA (certificate authority) certificate installed on clients, because DNS queries carry the domain name before any encrypted session is built. That is the headline advantage over web filtering: unwanted domains are caught at lookup time without decrypting anything.",
   "That early position also makes DNS filtering a useful threat control. Blocking a known malicious domain, a phishing domain or a newly registered domain at the DNS stage stops the client before it can download anything or reach its controller. This is especially valuable against malware command-and-control (C&C) traffic, which typically relies on name resolution to find its servers. FortiGate DNS filter profiles can also block DNS requests to known botnet C&C domains using FortiGuard data, which fits the same idea of cutting an infected host off from its controller.",
   "DNS filtering does have clear limits, and the exam expects you to know them. It acts only on domain names, not on full URL paths, so it cannot allow one page on a site while blocking another page on the same domain; that requires web filtering. It does not inspect file contents, so it does not replace antivirus. And it only sees queries that actually pass through the FortiGate, or are sent to it as a DNS server. A device using a hard-coded IP address, or an outside resolver reached in a way the FortiGate does not inspect, can avoid it. The usual design answer is to force client DNS through the FortiGate (for example, allow DNS only to approved resolvers in firewall policy) so the filter cannot be sidestepped easily.",
   "Safe search is a related control that compels search engines, and some video sites such as YouTube, into their family-safe mode so explicit results are filtered. The key word is enforce: users cannot simply turn safe search off in their own browser settings, because the FortiGate applies it on the network side. There are two broad ways to achieve this. The DNS-based method answers lookups for the search provider with the provider's restricted or safe-search address, so every query goes to the filtered service. The web-filter-based method rewrites search requests to add the provider's safe-search parameters, which only works if the FortiGate can see inside the HTTPS request, meaning deep inspection.",
   "That difference matters in scenarios like the school above. Since modern search runs over HTTPS, enforcing safe search through URL rewriting requires SSL deep inspection, while the DNS-based enforcement in a DNS filter profile works without decryption. The concept the exam wants is simple: safe search forces the filtered version of search results regardless of user settings, and the method you choose depends on whether you are decrypting traffic.",
   "When should you choose which tool? Use DNS filtering for broad, protocol-independent domain blocking without decryption, and pair it with web filtering, which sees full URLs and, with deep inspection, page content, when you need depth. Add antivirus and IPS (intrusion prevention system) for files and exploits that DNS never sees. Enforce safe search whenever policy says search and video results must stay family-safe no matter what users choose.",
   "In a lab, you can create a DNS filter profile that blocks a category such as Gambling, enable safe search enforcement, and attach the profile to the outbound policy. From a client, a lookup with `nslookup` for a blocked domain then fails or returns the block portal address, a search engine returns filtered results, and the DNS filter log shows each decision with its category and action."
  ],
  "analogy": "DNS filtering is like a receptionist who controls the building directory. If a visitor asks for the office of a banned company, the receptionist simply says there is no such listing, so the visitor never reaches the elevator. The receptionist never needs to open anyone's briefcase. The analogy breaks down in two places the exam cares about: a visitor who already knows the room number (a hard-coded IP) walks right past, and the receptionist cannot check what is inside the briefcase, which is the job of web filtering and antivirus.",
  "terms": [
   [
    "DNS filtering",
    "Rating and acting on the domain in a DNS query so unwanted domains are blocked at lookup time for any protocol, without TLS decryption."
   ],
   [
    "Block at lookup",
    "Preventing name resolution for an unwanted domain so the client never connects to it."
   ],
   [
    "Redirect to block portal",
    "A DNS filter action that answers the query with the FortiGate block page address so users see an explanation."
   ],
   [
    "Safe search enforcement",
    "Forcing search engines and some video sites into their family-safe mode so explicit results are filtered regardless of user settings."
   ],
   [
    "Protocol independence",
    "DNS filtering works for any application because it acts on the query, not on decrypted payloads."
   ]
  ],
  "example": "An admin enables a DNS filter that blocks the Malicious Websites category, so when any application on a client tries to resolve a flagged domain the lookup fails and no connection is ever made, all without SSL inspection.",
  "mistakes": [
   [
    "DNS filtering needs deep inspection and a CA certificate on clients, just like full web filtering.",
    "DNS queries expose the domain name before any encrypted session exists, so DNS filtering works without SSL inspection or a client certificate. That is its main advantage."
   ],
   [
    "DNS filtering can block a single page on an otherwise allowed site.",
    "DNS filtering sees only the domain, not the URL path. Blocking one page while allowing the rest of the site needs web filtering, usually with deep inspection for HTTPS."
   ],
   [
    "Once DNS filtering is on, users cannot reach blocked sites by any means.",
    "Clients using hard-coded IP addresses or resolvers the FortiGate does not inspect can bypass it. Force DNS through approved paths in firewall policy to close the gap."
   ],
   [
    "Safe search is just a browser setting, so a firewall cannot enforce it.",
    "The FortiGate enforces safe search on the network side, through DNS answers or request rewriting, so users cannot turn it off in their browser."
   ]
  ],
  "tryit": [
   [
    "A clinic wants to stop staff devices, including IoT tablets with no way to install certificates, from reaching phishing and newly registered domains. Management also refuses to decrypt any traffic for privacy reasons. A colleague proposes a web filter profile with deep inspection. What do you recommend?",
    "A DNS filter profile blocking the Phishing and Newly Registered Domains categories, attached to the policy that carries DNS. It works for every app on every device without decryption or certificates. Web filtering with deep inspection would violate the no-decryption requirement and needs a CA certificate on each device."
   ],
   [
    "A school enforces safe search through its web filter profile, but students still get unfiltered results. The policy uses certificate inspection only. What is the likely cause and a fix that avoids decryption?",
    "Rewriting search requests to add safe-search parameters requires seeing inside HTTPS, which certificate inspection cannot do. Use the DNS-based safe search enforcement in a DNS filter profile, which steers lookups to the providers' safe-search service without decryption."
   ]
  ],
  "tip": "DNS filtering's exam-key advantage is that it blocks bad domains at lookup time for any protocol without decryption. It does not see URL paths or scan files, so pair it with web filtering and antivirus for depth, and remember that DNS-based safe search avoids the need for deep inspection.",
  "check": [
   [
    "What is one advantage of DNS filtering over web filtering?",
    "It blocks bad domains at lookup time for any application without needing TLS decryption or a CA certificate."
   ],
   [
    "What does DNS filtering not do?",
    "It does not scan file contents or URL paths; it acts only on the domain in the query."
   ],
   [
    "What does enforcing safe search accomplish?",
    "It forces search engines and some video sites into family-safe mode so explicit results are filtered regardless of the user's own settings."
   ],
   [
    "How can a client bypass DNS filtering, and how do you reduce that risk?",
    "By using a hard-coded IP or an uninspected outside resolver; force DNS through approved resolvers with firewall policy so queries pass the filter."
   ]
  ]
 },
 {
  "t": "Application control: sensors, categories, application overrides, filter overrides, need for deep inspection",
  "hook": "Thursday afternoon at Lakeshore Logistics, the help desk forwards you two tickets that seem to contradict each other. The first, from the CFO: the office Internet crawls every evening, and a quick look at the traffic shows BitTorrent sessions jumping from port to port. The second, from Marketing: they must keep using Facebook for campaigns, but the team lead wants the games blocked because people are losing whole afternoons to them. Your existing policy only blocks a handful of ports and a few web categories, and neither request is solved. How do you block an app that will not stay on one port, and allow one part of a platform while blocking another?",
  "simple": "Application control lets the FortiGate recognize which program is sending traffic, not just which door (port) it uses. Many apps move between ports or hide inside normal web traffic, so blocking a port is like locking one door of a building with fifty doors. Instead, the FortiGate compares traffic to a big library of fingerprints, called signatures, that describe how each app behaves. You can then allow or block whole groups of apps, such as file-sharing programs, or make exceptions for single apps. One catch: if the app's traffic is encrypted, the FortiGate can usually tell which app it is, but it cannot see what you are doing inside the app, like uploading versus downloading, unless it is allowed to decrypt the traffic. It is like knowing who is on the phone without hearing the words.",
  "body": [
   "Application control identifies and manages traffic by the application that generates it rather than by port number. It relies on FortiGuard application signatures, which describe the traffic patterns of thousands of applications. This matters because modern applications hop ports, tunnel over HTTP and HTTPS, and encrypt their traffic, so a port-based rule cannot reliably catch them. When an exam scenario asks how to stop something like BitTorrent, or how to manage a specific cloud application, application control is usually the answer.",
   "You configure application control with a sensor, which is the application control profile, and attach it to a firewall policy. The policy decides which traffic is inspected; the sensor decides what happens to the applications found in that traffic. Inside the sensor, you set actions against application categories, such as Peer-to-Peer, Video/Audio, Social Media, Proxy, Game or Cloud.IT. Typical actions are allow, monitor (allow and log), block, and in some cases traffic shaping or quarantine. Blocking the entire P2P category is a single setting, and it immediately applies to every signature in that category.",
   "Signatures are the reason category actions work regardless of port. The FortiGate recognizes an application from the shape of its traffic, such as protocol handshakes, message patterns and server names, so BitTorrent is identified whether it uses its usual ports, a random high port or port 443. Blocking the P2P category therefore stops BitTorrent even as it changes ports, whereas blocking a single port would miss most of it, and a web filter category would not see non-web P2P traffic at all. In the application control log, you would see the application name, its category, the policy and the action.",
   "Two override mechanisms give you finer control than categories alone. An application override is a per-application entry that sets an action for one specific signature, different from what its category says. The classic example is keeping Facebook allowed while blocking only the Facebook games signature: the Social Media category stays allowed, and an override blocks the single signature. Overrides are evaluated before category actions, so the exception wins for that one application.",
   "A filter override takes a different approach. Instead of naming applications, you build a rule that selects applications by their attributes, such as category, popularity, technology (for example browser-based, client-server or peer-to-peer), risk level, protocol or vendor, and apply an action to the whole filtered set. This lets you write broad, intention-based rules, for example blocking every application rated with the highest risk level, without listing each one and without needing to update the rule when FortiGuard adds new signatures that match the same attributes. Together, application overrides handle named exceptions and filter overrides handle attribute-based selection.",
   "A crucial dependency is the SSL inspection mode on the same policy. With only certificate inspection, the FortiGate reads the unencrypted parts of the TLS handshake, such as the Server Name Indication (SNI) and the server certificate. That is often enough to identify which application or service is in use, and therefore enough to allow or block the application as a whole. But actions inside an encrypted application, such as uploading a file to a cloud storage service, posting to a social network, or a particular feature within a collaboration tool, live in the encrypted payload. They are invisible without decryption.",
   "So, to enforce in-app actions, you must enable deep inspection on the policy so the application signatures can see inside the session. A common exam pattern is a scenario where application control correctly detects an app but fails to block one action within it, such as file uploads, while the policy uses certificate inspection. The fix is deep inspection, not a new category, not a web filter, and not a port block. Remember that deep inspection brings its own requirements, such as clients trusting the FortiGate CA certificate and exemptions for sensitive categories.",
   "It also helps to know where application control sits relative to other profiles. Web filtering works on URLs and web categories, while application control works on application identity, including non-web protocols. They complement each other, and a single policy can carry both. If a question asks about a non-browser application or traffic that hops ports, think application control; if it asks about a URL or website category, think web filtering.",
   "The exam wants three takeaways: application control identifies applications by signature regardless of port; application overrides and filter overrides handle exceptions and attribute-based selection; and fine-grained, in-app control needs deep inspection. In a lab, you can build a sensor that blocks the P2P category, add an application override that blocks one signature within an otherwise allowed application, and then observe in the logs that an in-app action is only blocked once deep inspection is enabled."
  ],
  "analogy": "Application control is like a security guard who recognizes people by face rather than by which door they use. A known troublemaker is turned away at any entrance. With certificate inspection, the guard sees faces through a frosted glass door: enough to recognize who is coming in, but not what is in their bag. To stop someone carrying out a specific item, the uploaded file, the guard needs to open the door and look inside, which is deep inspection.",
  "terms": [
   [
    "Application control sensor",
    "A profile of application and category actions attached to a firewall policy that identifies apps by FortiGuard signatures."
   ],
   [
    "Category action",
    "The action applied to a whole application category, such as blocking Peer-to-Peer, effective regardless of port."
   ],
   [
    "Application override",
    "A per-signature rule that sets a different action for one specific application than its category's action."
   ],
   [
    "Filter override",
    "A rule that selects applications by attributes (category, popularity, technology, risk, vendor) and applies an action to that set."
   ],
   [
    "In-app control",
    "Acting on specific behaviors inside an application, such as uploads, which requires deep inspection for encrypted apps."
   ]
  ],
  "example": "Facebook must stay allowed but Facebook games must be blocked, so the admin adds an application override that blocks only the Facebook games signature while the Social Media category stays allowed.",
  "mistakes": [
   [
    "Blocking the ports BitTorrent normally uses will stop it.",
    "P2P applications move to other ports, including 443. Signature-based application control with the P2P category blocked catches them wherever they run."
   ],
   [
    "A web filter category block is the best way to stop P2P traffic.",
    "Much P2P traffic is not web browsing, so web filtering never sees it. Application control identifies the application itself."
   ],
   [
    "If application control can identify an encrypted app, it can also block actions inside it.",
    "Identification often works from the SNI under certificate inspection, but in-app actions such as uploads are in the encrypted payload and need deep inspection."
   ],
   [
    "To allow a platform but block one feature, you must allow the whole category and accept the feature.",
    "An application override blocks the one signature, such as Facebook games, while the category stays allowed."
   ]
  ],
  "tryit": [
   [
    "Rivergate Design allows a cloud storage service so staff can download client briefs, but leadership wants uploads blocked to prevent data leaks. The admin adds the upload signature with a block action, yet uploads still succeed. The policy uses the certificate-inspection profile. What should the admin change?",
    "Enable deep inspection on that policy. Under certificate inspection, the FortiGate can identify the service from the SNI but cannot see the upload action inside the encrypted session. With deep inspection, the upload signature can match and be blocked while downloads stay allowed."
   ],
   [
    "A security lead wants to block every application FortiGuard rates as the highest risk, including ones added in future signature updates, without maintaining a long list. Which application control feature fits best?",
    "A filter override that selects applications by risk level and applies a block action. Because it selects by attribute, new signatures with the same rating are covered automatically, unlike a list of individual application overrides."
   ]
  ],
  "tip": "Application control identifies apps by signature, so use categories and overrides, not port or web-category rules, to stop things like BitTorrent. Application overrides target one named app; filter overrides target a set by attributes. Controlling actions inside an encrypted app requires deep inspection.",
  "check": [
   [
    "Why is application control better than a port rule for blocking BitTorrent?",
    "P2P apps change ports and encrypt, so signature-based application control catches them where a single-port or web-category rule would not."
   ],
   [
    "How do you block only one behavior of an app while keeping the app allowed?",
    "Use an application override on that specific signature (for example block Facebook games) while leaving the category allowed."
   ],
   [
    "Why can't application control block file uploads inside a cloud app under certificate inspection?",
    "In-app actions are in the encrypted payload; deep inspection is needed to decrypt so the signatures can see and act on them."
   ],
   [
    "What is the difference between an application override and a filter override?",
    "An application override sets an action for one named signature; a filter override selects a group of applications by attributes such as risk or category."
   ]
  ]
 },
 {
  "t": "Antivirus: flow vs proxy scanning, signature databases, FortiSandbox/cloud sandbox, content disarm and reconstruction (proxy), grayware",
  "hook": "At Brightwater Insurance, Dana in accounts payable opens what looks like an overdue invoice from a vendor. The attachment is a spreadsheet that asks her to enable editing and content. She hesitates and calls you instead. You check the FortiGate logs: the file passed antivirus scanning with no detection, which means its signature is not known yet. Meanwhile, the network team is pushing back on any change that slows down the busy branch links. You need a way to catch malware nobody has seen before and to neutralize risky macros, without crippling performance. Which antivirus features and inspection mode get you there?",
  "simple": "Antivirus on a FortiGate checks files as they travel through the network, looking for known bad programs. It can work in two ways. In flow mode, it checks the file as the pieces stream past, which is quick. In proxy mode, it collects the whole file first, checks it, and only then passes it on, which is slower but allows extra tricks. Known malware is spotted by matching it against a list of fingerprints, called signatures. Brand-new malware has no fingerprint yet, so suspicious files can be sent to a sandbox, a safe test room where the file is opened and watched. Proxy mode can also strip risky parts out of documents, such as macros, and hand over a clean copy. It is like airport security that can either scan bags on the moving belt or open each bag fully.",
  "body": [
   "Antivirus (AV) scanning inspects files crossing the FortiGate for malware. Three things about it show up repeatedly on the NSE 4 exam: how it scans (flow or proxy inspection mode), what it scans against (signature databases and sandboxing), and the extra features that only proxy mode enables, such as content disarm and reconstruction. An AV profile is attached to a firewall policy, and for encrypted protocols such as HTTPS, the policy must also use deep inspection for AV to see the files at all.",
   "AV runs in either flow-based or proxy-based inspection mode, chosen per policy (or per profile, depending on how the FortiGate is configured). Flow-based AV scans the file as its packets pass through, holding only the final packet until it reaches a verdict. If the file is clean, the last packet is released and the transfer completes; if it is infected, the last packet is dropped so the client receives an incomplete, unusable file, and the session is reset. This keeps latency low and throughput high, which is why flow mode is the default and the better fit for busy links.",
   "Proxy-based AV works differently. The FortiGate acts as a proxy between client and server, buffers the whole file, scans the complete object, and only then forwards it. This uses more memory and adds latency, especially for large files, but it lets the FortiGate reliably block or replace the file. Because the file is never delivered until the verdict, the FortiGate can send a replacement message to the user explaining that the file was blocked. Proxy mode also unlocks extra features that need the whole object. When a scenario needs those features, or guaranteed blocking of a fully assembled file with a user notification, that points to proxy mode.",
   "The core detection method is signature-based. The FortiGate compares files against FortiGuard antivirus signature databases, which are updated regularly over the FortiGuard connection. There are different database levels, such as a normal set and an extended set, trading coverage of older or rarer threats against memory use and performance. Signatures catch known malware quickly and with very few false positives, but by definition they cannot recognize brand-new, never-seen threats. If signatures are out of date, for example because FortiGuard is unreachable or the license has expired, detection weakens quietly.",
   "To catch unknown malware, the AV profile can send files to a sandbox: FortiSandbox on premises, or a cloud sandbox service such as FortiSandbox Cloud. The sandbox executes the suspicious file in an isolated environment and observes its behavior, such as attempts to change system files, contact suspicious servers or encrypt data. This lets it flag zero-day and evasive malware that signatures miss. Verdicts from the sandbox can feed back to the FortiGate so later copies of the same file are blocked. Sandboxing adds behavior analysis; it does not decrypt traffic, filter spam or replace web filtering, which are common distractors in exam answers.",
   "Content disarm and reconstruction (CDR) takes a different, proactive approach. Instead of deciding whether a macro or embedded script is malicious, CDR removes active content, such as macros, embedded scripts, links and other executable elements, from supported documents and rebuilds a clean, flat version before delivery. The user still receives a readable document, and the original can be quarantined if needed. This is ideal for email attachments and downloads from untrusted sources, because it neutralizes the risk even when the threat is unknown. Because CDR must take apart and rebuild the entire file, it requires proxy-based inspection.",
   "Grayware is software that is unwanted but not clearly malicious, such as adware, some spyware, browser toolbars and riskware. It may slow devices, track users or create security gaps without being outright malware. FortiGate can detect grayware as a separate option in the AV profile, so you choose whether to block nuisance software alongside true malware. In logs, a grayware detection is labeled distinctly so you can tell it apart from a virus.",
   "So the summary is: flow mode for speed, proxy mode for full-object features, replacement messages and CDR; signatures for known threats, sandboxing for unknown ones; CDR strips active content and needs proxy mode; grayware covers nuisance software. In a lab, you can download the harmless EICAR test file over HTTP and then over HTTPS, first under certificate inspection and then under deep inspection, and compare the AV log results. The HTTPS download is only detected once deep inspection lets the FortiGate see the file."
  ],
  "analogy": "Flow-based AV is like a customs officer who inspects boxes as they roll down a conveyor belt, holding back only the last box until the decision; it is fast, but the officer never sees the whole shipment at once. Proxy-based AV is like unloading the entire shipment into a warehouse, inspecting it, repackaging anything risky and only then sending it on. CDR is the warehouse removing every battery from the toys before delivery, without testing which batteries are faulty.",
  "terms": [
   [
    "Flow vs proxy AV",
    "Flow scans as packets pass with minimal buffering (fast); proxy buffers the whole file before forwarding (more features, more cost)."
   ],
   [
    "Signature database",
    "FortiGuard-updated malware signatures the FortiGate matches files against; catches known threats but not brand-new ones."
   ],
   [
    "Sandbox (FortiSandbox / cloud)",
    "An isolated environment that runs unknown files to detect malware by behavior, catching zero-days signatures miss."
   ],
   [
    "Content disarm and reconstruction (CDR)",
    "A proxy-only feature that strips active content from documents and rebuilds a clean file before delivery."
   ],
   [
    "Grayware",
    "Unwanted but not clearly malicious software, such as adware or riskware, which an AV profile can detect as a separate option."
   ]
  ],
  "example": "Office documents in inbound email should arrive without macros, so the admin enables content disarm and reconstruction in a proxy-based antivirus profile, which strips active content and rebuilds each file before delivery.",
  "mistakes": [
   [
    "CDR works in flow mode like other AV features.",
    "CDR must take apart and rebuild the whole file, so it requires proxy-based inspection."
   ],
   [
    "Sending files to FortiSandbox also decrypts HTTPS traffic.",
    "Sandboxing only analyzes behavior of files it receives. The FortiGate still needs deep inspection to extract files from encrypted sessions."
   ],
   [
    "Up-to-date signatures will catch any malware.",
    "Signatures only match known threats. Zero-day malware needs behavior analysis in a sandbox, or CDR to remove active content proactively."
   ],
   [
    "AV will detect infected files over HTTPS with certificate inspection.",
    "Certificate inspection does not decrypt the payload, so AV cannot see the file. Deep inspection is required for encrypted protocols."
   ]
  ],
  "tryit": [
   [
    "Harborview Legal receives many document attachments from new clients. The security lead wants macros removed from every Office file before it reaches staff, even if the macro is not recognized as malicious. The current AV profile runs in flow mode with sandboxing enabled. What change meets the requirement?",
    "Switch the policy to proxy-based inspection and enable content disarm and reconstruction in the AV profile. Sandboxing only flags files that behave maliciously; CDR proactively strips all active content, and it only works in proxy mode."
   ],
   [
    "A branch with a slow, busy Internet link needs malware protection with minimal added latency, and there is no requirement for CDR or custom replacement pages. Which AV inspection mode fits best, and why?",
    "Flow-based inspection. It scans as packets pass and holds only the last packet until the verdict, keeping latency and memory use low, while still blocking detected malware."
   ]
  ],
  "tip": "CDR and reliable full-file blocking with replacement messages need proxy mode; flow mode is faster but more limited. Signatures catch known malware, and a sandbox is what adds behavior analysis for unknown files. For HTTPS, AV needs deep inspection to see the file at all.",
  "check": [
   [
    "How does proxy-based antivirus handle a downloaded file compared with flow-based?",
    "Proxy buffers the whole file, scans it, then forwards it; flow scans as packets pass and holds only the last packet until the verdict."
   ],
   [
    "What does sending files to a sandbox add?",
    "Behavior analysis of unknown files in an isolated environment, catching new malware that signatures miss."
   ],
   [
    "Which feature strips macros from documents, and what mode does it need?",
    "Content disarm and reconstruction (CDR); it requires proxy-based inspection."
   ],
   [
    "What is grayware?",
    "Unwanted but not clearly malicious software, such as adware or riskware, which the AV profile can block as a separate option."
   ]
  ]
 },
 {
  "t": "IPS: sensors and signature filters, rate-based signatures, botnet C&C blocking, IP exemptions, fail-open",
  "hook": "Monday, 9:15 a.m. at Northfield Credit Union. The payroll team cannot upload this week's file to the processing server, and the deadline is noon. You check the FortiGate and find an IPS sensor blocking the transfer with a signature match. A colleague suggests setting the whole sensor to monitor until it is sorted out. At the same time, last night's IPS log shows a teller workstation repeatedly trying to reach a known botnet controller, and the DMZ web servers are behind a sensor with every signature enabled, which is using more CPU than you would like. How do you fix the payroll problem without dropping protection for everyone else?",
  "simple": "An IPS, an intrusion prevention system, watches network traffic for the known patterns of attacks, a bit like a guard who knows the tricks burglars use. When it sees one, it can block it or just write it down. The FortiGate has thousands of these attack patterns, called signatures. Turning them all on wastes effort, so you pick only the ones that matter, for example attacks against Windows servers if that is what you are protecting. Some signatures count events over time, like many failed logins in a minute. The IPS can also stop infected computers from calling home to criminal servers. If one signature wrongly blocks a normal program between two machines, you can excuse just those two machines from that one signature. And you decide what happens if the IPS gets overloaded: let traffic through, or stop it.",
  "body": [
   "An intrusion prevention system (IPS) inspects traffic for attack patterns, such as exploit attempts against known vulnerabilities in servers, clients and applications, and blocks or logs what it finds. FortiGate IPS is signature driven, backed by FortiGuard updates, and highly tunable. The exam expects you to configure it precisely rather than turning everything on, and to know the specific features that handle false positives, outbound botnet traffic and engine overload.",
   "You apply IPS through an IPS sensor attached to a firewall policy. The policy decides which traffic is inspected; the sensor decides which signatures are used and what happens when one matches. For encrypted traffic, the policy also needs deep inspection, because exploit patterns are usually inside the payload. Rather than enabling every signature, which wastes CPU and memory and produces noisy logs, you use signature filters inside the sensor to select the signatures that matter for the assets behind that policy.",
   "Signature filters select signatures by attributes. The main ones are target (server or client), operating system, application or protocol, and severity (from informational up to critical). To protect Windows servers in a DMZ, for example, you filter for server-target, Windows-OS signatures at the relevant severities, perhaps medium and above. Signatures for client-side browser attacks or Linux services are skipped, so inspection stays focused and efficient. Each selected group has an action, typically block, monitor (pass and log), or default (use the signature's own recommended action). You can also add individual signatures with their own action when one needs special handling.",
   "Rate-based signatures act on the frequency of an event rather than a single packet. They trigger when a threshold is exceeded within a time window, for example a large number of login attempts against a service within a short period. This catches behaviors such as brute-force password guessing or certain floods that look harmless one packet at a time. Rate-based signatures complement per-packet signatures for repetitive attacks; DoS policies, covered separately, are the dedicated tool for high-volume floods at the interface.",
   "Botnet command-and-control (C&C) blocking uses a FortiGuard-maintained database of known C&C destinations. Enabling botnet scanning in the IPS sensor, with a block action, stops outbound connections from your hosts to those known malicious servers. This helps contain an already infected host by cutting its link to its controller, preventing it from receiving instructions or sending stolen data. It is an outbound-focused protection, distinct from inbound exploit signatures, and its log entries name the botnet and the internal source address, which also tells you which host needs cleanup.",
   "IP exemptions let you exclude specific source and destination address pairs from a particular signature. When a legitimate application between two known hosts trips a signature, a false positive, the targeted fix is to add an IP exemption on that signature for just those hosts. The signature keeps protecting every other host and every other traffic flow. This is far better than disabling the signature everywhere, removing the sensor from the policy, or setting the whole sensor to monitor, each of which removes protection broadly to fix a narrow problem. On the exam, when a question describes a false positive between two specific hosts, look for the IP exemption answer.",
   "IPS fail-open governs what happens when the IPS engine is overloaded, for example when the FortiGate is short of resources, or the engine fails. With fail-open enabled, new traffic that cannot be inspected passes without IPS scanning, favoring availability. With fail-open disabled, that traffic is dropped, favoring security. The setting is global, under `config ips global`. It is separate from `av-failopen`, which controls what proxy-based antivirus does when the FortiGate enters conserve mode because of low memory. The exam tests that distinction directly, so keep the two names paired with their engines: IPS fail-open for the IPS engine, av-failopen for proxy AV under memory pressure.",
   "Reading IPS logs ties all of this together. An IPS log entry shows the attack or signature name, its severity, the source and destination addresses, the policy and sensor, and the action. Those fields tell you whether a block was a real attack, a false positive that needs an exemption, or a botnet connection from an infected internal host. Monitoring new signature groups before switching them to block is a common way to tune without disrupting users.",
   "In a lab, you can build a sensor filtered to server targets and a specific operating system, enable botnet C&C blocking, apply it to a policy, and read the IPS log fields to see which signatures matched and why. Then add an IP exemption for a test signature and confirm that the exempted pair passes while other hosts are still blocked."
  ],
  "analogy": "Think of an IPS sensor as a building's security checklist. A guard at a bank vault does not need the checklist for shoplifting at a clothing store, so you hand them only the relevant pages, which is the signature filter. An IP exemption is a signed note saying that the courier and the accountant are allowed to carry that particular bag between their two offices; everyone else still gets searched. The analogy stops at fail-open: that is a building rule about whether doors unlock or lock when the guard is overwhelmed.",
  "mnemonic": "Filter signatures with T-O-A-S: Target, OS, Application or protocol, Severity. These are the four attributes you pick from when building an IPS sensor for specific assets.",
  "terms": [
   [
    "IPS sensor",
    "A profile of selected signatures and actions attached to a firewall policy to detect and block attacks."
   ],
   [
    "Signature filter",
    "A rule that selects signatures by target, OS, application or protocol, and severity so inspection stays focused."
   ],
   [
    "Rate-based signature",
    "A signature that triggers when an event exceeds a threshold over time, such as repeated login attempts."
   ],
   [
    "Botnet C&C blocking",
    "An IPS option using FortiGuard's database to block outbound connections to known command-and-control servers."
   ],
   [
    "IP exemption",
    "An exclusion of specific source and destination addresses from one signature, used to fix a false positive narrowly."
   ],
   [
    "IPS fail-open",
    "The setting that lets traffic pass uninspected when the IPS engine is overloaded (availability) versus dropping it (security)."
   ]
  ],
  "example": "A legitimate app between two internal hosts keeps tripping one IPS signature, so the admin adds an IP exemption for just those two hosts on that signature, keeping it active for everyone else instead of disabling the sensor.",
  "mistakes": [
   [
    "The safest IPS sensor enables every signature.",
    "Enabling everything wastes resources and creates noise without protecting irrelevant assets. Filter by target, OS, application and severity to match what is behind the policy."
   ],
   [
    "To fix a false positive, set the sensor to monitor or remove it from the policy.",
    "That removes protection for all traffic. An IP exemption on the single signature for the two affected hosts is the targeted fix."
   ],
   [
    "IPS fail-open and av-failopen are the same setting.",
    "IPS fail-open covers the IPS engine when overloaded; av-failopen covers proxy-based antivirus when the FortiGate is in conserve mode."
   ],
   [
    "Botnet C&C blocking protects servers from inbound exploits.",
    "It blocks outbound connections from internal hosts to known C&C servers, containing infected machines. Inbound exploits are handled by regular signatures."
   ]
  ],
  "tryit": [
   [
    "At Oakridge Hospital, a medical imaging system sends studies from a modality at 10.4.1.20 to an archive at 10.4.2.15, and one IPS signature blocks every transfer. The same signature has caught real attacks elsewhere on the network this month. The clinical team asks for the sensor to be turned off on that policy. What do you do instead?",
    "Add an IP exemption on that one signature for source 10.4.1.20 and destination 10.4.2.15. The imaging transfers will pass, while the signature continues to protect all other hosts and the rest of the sensor stays in block mode."
   ],
   [
    "A retail company's security policy says that if inspection cannot be performed, traffic must not pass. During a sale, the FortiGate's IPS engine becomes overloaded and the team notices traffic is still flowing uninspected. Which setting should they review?",
    "IPS fail-open in `config ips global`. It is enabled, so overloaded IPS lets traffic pass. Disabling it makes the FortiGate drop traffic it cannot inspect, matching the security-first policy at the cost of availability."
   ]
  ],
  "tip": "Tune IPS with signature filters (target, OS, application, severity) rather than enabling everything, use IP exemptions for false positives between specific hosts, and enable botnet C&C blocking to contain infected hosts. Do not confuse IPS fail-open with av-failopen.",
  "check": [
   [
    "How should you tune an IPS sensor for DMZ Windows servers?",
    "Filter signatures by server target and Windows OS (and relevant severities) so inspection is focused, instead of enabling every signature."
   ],
   [
    "What is the most targeted fix for a signature causing a false positive between two known hosts?",
    "Add an IP exemption for those hosts on that signature, keeping it protecting everyone else."
   ],
   [
    "What does IPS fail-open do when enabled?",
    "It lets traffic pass uninspected if the IPS engine is overloaded, favoring availability; disabled, it drops that traffic."
   ],
   [
    "What does botnet C&C blocking in an IPS sensor protect against?",
    "Outbound connections from infected internal hosts to known command-and-control servers."
   ]
  ]
 },
 {
  "t": "DoS policies and anomaly thresholds",
  "hook": "It is 11:52 p.m. and the online ordering site for Silver Birch Outfitters has slowed to a crawl. Customers in another time zone are trying to check out during a flash sale, and the operations manager is calling every five minutes. On the FortiGate dashboard, the session count on the public web server is climbing, and a capture shows a torrent of TCP SYN packets from addresses that never complete a handshake. Your firewall policies, web filtering and IPS all look fine, but the box is spending its effort on half-open connections before any policy even runs. What can stop this flood at the front door, before it eats the resources you need for real customers?",
  "simple": "A denial-of-service (DoS) attack tries to knock a service offline by burying it in junk traffic, like thousands of people ringing a shop's doorbell and running away so real customers cannot get in. A FortiGate DoS policy counts certain kinds of traffic as it arrives on an interface, such as new connection requests per second. You set a limit, called a threshold, for each kind. If the count goes over the limit, the FortiGate blocks the extra traffic or just records it. The important part is that this check happens very early, before the FortiGate does its normal rule checking, so junk is thrown out cheaply. The tricky part is choosing limits: too low and you turn away real customers on a busy day, too high and the attack gets through.",
  "body": [
   "Denial-of-service (DoS) attacks try to overwhelm a target with traffic or connection attempts until it cannot serve legitimate users. Some floods aim at bandwidth, others at resources such as session tables or CPU. FortiGate DoS policies defend against this by watching for traffic anomalies and enforcing thresholds very early in packet processing, before the normal firewall policy lookup, so a flood can be dropped before it consumes the resources that real traffic needs.",
   "A DoS policy is defined on an incoming interface, usually the Internet-facing WAN, and specifies source addresses, destination addresses and services to narrow its scope, for example the public IP address of a web server and HTTP and HTTPS. It then lists anomaly sensors, each with a status, an action, a threshold and a logging option. There are separate DoS policies for IPv4 and IPv6 traffic, and you can have several policies on one interface to protect different servers with different thresholds.",
   "Each anomaly type watches a particular pattern. Flood anomalies count new packets or sessions per second: `tcp_syn_flood` for new TCP SYN packets, `udp_flood` for UDP traffic and `icmp_flood` for ICMP. Scan and sweep anomalies, such as `tcp_port_scan`, `udp_scan` and `icmp_sweep`, look for one source probing many ports or addresses. Session anomalies, such as `tcp_src_session` and `tcp_dst_session`, count concurrent sessions from one source or to one destination, catching connection exhaustion. For each anomaly, you set the threshold, a rate or a count, and the action, typically block or monitor, plus whether to log. When traffic crosses the threshold, the DoS policy acts on the traffic above it and writes an anomaly log entry with the anomaly name, the source and destination, and the action.",
   "The defining characteristic for the exam is timing. DoS policies are evaluated at the ingress of the interface, before firewall policies and before most security inspection such as IPS signatures, application control or web filtering. That early position is what lets them shed a SYN flood or a scan cheaply. The FortiGate does not need to create full sessions, look up policies or run profiles for packets it has already decided to drop, which protects both the FortiGate itself and the servers behind it.",
   "This shapes how you answer scenario questions. When a public web server is hit by a SYN flood and the question asks which feature limits it before policy lookup, the answer is a DoS policy with an appropriate `tcp_syn_flood` threshold. Application control, web filtering and IPS profiles run later, after policy matching, and an IP pool is a NAT feature that has nothing to do with floods. Rate-based IPS signatures overlap conceptually with DoS anomalies, since both act on frequency, but the DoS policy is the dedicated, early, threshold-based tool for volumetric and connection-exhaustion attacks.",
   "Setting good thresholds is the practical challenge. Too low, and legitimate bursts, such as a marketing campaign, a software update or a sale, exceed the threshold and get dropped, which is a self-inflicted outage. Too high, and an attack slips through before the threshold is reached. The standard approach is to baseline normal traffic first and set thresholds comfortably above typical peaks. Many administrators start new anomalies in monitor mode, with logging enabled, to observe real rates for a period, then switch them to block once they know what normal looks like. Revisiting thresholds after major business changes keeps them realistic.",
   "Know the limits of an on-box control as well. A DoS policy protects against floods from many sources or from one, but it cannot create bandwidth that does not exist. If a distributed denial-of-service (DDoS) attack saturates the Internet link itself, traffic is lost upstream before it ever reaches the FortiGate, so upstream or cloud-based DDoS protection from a provider is still needed for very large attacks. For the exam, though, the FortiGate DoS policy is the on-box control to know: defined per ingress interface, built from anomaly sensors with thresholds and actions, and evaluated before firewall policy lookup.",
   "In a lab, you can add a DoS policy on the WAN interface with a deliberately low `tcp_syn_flood` threshold in monitor mode, generate connection load from a test client, and watch the anomaly logs to see exactly when the threshold triggers. Switching the action to block then shows how excess SYN packets are dropped while normal connections below the threshold continue."
  ],
  "analogy": "A DoS policy is like a doorman at a nightclub with a clicker counter. Before anyone reaches the coat check or the ID check inside, the doorman counts how many people arrive per minute and turns away the surge once it passes a set number. Because the doorman stands outside, the staff inside never get swamped. The analogy also shows the threshold problem: set the limit too low on a busy Saturday and paying guests are turned away. It breaks down for huge DDoS attacks, where the crowd jams the street before reaching the door.",
  "terms": [
   [
    "DoS policy",
    "A rule evaluated early at an interface ingress that enforces anomaly thresholds to drop or log flood and scan traffic before firewall policy lookup."
   ],
   [
    "Anomaly sensor",
    "A detector for a specific pattern (SYN flood, port scan, UDP or ICMP flood, session count) with a configurable threshold and action."
   ],
   [
    "Threshold",
    "The rate or count at which an anomaly triggers its action; set above normal peaks to avoid false positives."
   ],
   [
    "Early evaluation",
    "DoS policies run before firewall policies and most inspection, letting them shed floods cheaply."
   ],
   [
    "Monitor mode",
    "An anomaly action that logs threshold breaches without blocking, used to baseline traffic before enforcing."
   ]
  ],
  "example": "A public web server is hit by a SYN flood, so the admin adds a DoS policy on the WAN interface with a tcp_syn_flood threshold, which drops the excess SYN packets before they reach firewall policy lookup.",
  "mistakes": [
   [
    "Application control or IPS is the best way to stop a SYN flood early.",
    "Those profiles run after firewall policy matching. A DoS policy is evaluated at the interface ingress, before policy lookup, so it drops floods more cheaply."
   ],
   [
    "An IP pool can limit incoming connection floods.",
    "An IP pool is a source NAT feature. It does not count or limit anomalous traffic."
   ],
   [
    "Lower thresholds are always safer.",
    "Thresholds below normal peaks drop legitimate traffic. Baseline first, start in monitor mode, then set thresholds above typical peaks."
   ],
   [
    "A FortiGate DoS policy can stop any DDoS attack.",
    "If the attack saturates the Internet link, traffic is lost before reaching the FortiGate. Very large attacks need upstream or cloud DDoS protection."
   ]
  ],
  "tryit": [
   [
    "Juniper Peak Ticketing is launching sales for a popular event tomorrow and expects five times its normal connection rate. Last month a SYN flood took the site down, so the team wants a DoS policy in place today, but they have no data on peak rates. How should they deploy it?",
    "Create a DoS policy on the WAN interface scoped to the web server, enable tcp_syn_flood and the session anomalies in monitor mode with logging, and observe real rates. Set block thresholds comfortably above the observed peaks (and the expected sale surge) before switching to block, so legitimate buyers are not dropped."
   ],
   [
    "During an attack, the FortiGate CPU is high and the session table is full of half-open connections to a public server. A junior admin proposes adding an IPS sensor with more signatures to the server's firewall policy. Why is a DoS policy the better first move?",
    "The DoS policy acts at ingress before session creation and policy lookup, so it discards excess SYN packets cheaply. Adding IPS signatures would add processing after policy matching, increasing load rather than relieving it."
   ]
  ],
  "tip": "DoS policies act at the ingress interface before firewall policy lookup, which is why they, not application control, IPS or IP pools, are the answer to stopping a SYN flood early. Baseline traffic and start in monitor mode before setting block thresholds.",
  "check": [
   [
    "Which feature limits a SYN flood before firewall policy lookup?",
    "A DoS policy with a tcp_syn_flood anomaly threshold, evaluated early at the interface ingress."
   ],
   [
    "Why are DoS policies effective against floods?",
    "They are evaluated before firewall policies and most inspection, so they can drop flood traffic cheaply before it consumes resources."
   ],
   [
    "What is the risk of setting a DoS threshold too low?",
    "Legitimate traffic bursts can exceed it and be dropped, causing false positives; thresholds should sit above normal peaks."
   ],
   [
    "Which anomaly would detect a single source probing many ports on a server?",
    "A port scan anomaly, such as tcp_port_scan."
   ]
  ]
 },
 {
  "t": "Security profile logs and troubleshooting (FortiGuard connectivity, `diagnose autoupdate versions`)",
  "hook": "Wednesday morning at Fairhaven Public Library, three tickets land at once. A patron says a homework site is blocked with a rating error. The branch manager says a known phishing link slipped through yesterday. And the regional office wants proof that the antivirus is actually catching anything. You log in to the FortiGate and everything looks configured: web filter, antivirus and IPS are all attached to the outbound policy. Yet something is clearly off. Before you change a single setting, where do you look to find out what the profiles really did, and how do you tell whether the FortiGate is even getting the updates those profiles depend on?",
  "simple": "Security profiles on a FortiGate, such as antivirus or web filtering, are like guards who rely on two things: an up-to-date list of what to watch for, and a notebook where they write down what they did. The up-to-date lists come from Fortinet's online service, FortiGuard. If the FortiGate cannot reach FortiGuard, its lists go stale and it cannot look up website categories, so you see errors or missed threats. The notebook is the security log, which records every block or warning with who, what and why. When something goes wrong, you read the log first, then run one command, `diagnose autoupdate versions`, which shows how fresh each list is. It is like checking both a guard's notebook and the date on the guard's wanted posters.",
  "body": [
   "Security profiles are only as good as their signatures and their logs. Much content-inspection troubleshooting comes down to two questions: is the FortiGate receiving current FortiGuard updates, and what do the security logs actually say happened? The exam expects you to know where to look for each answer, and in what order, rather than guessing and changing settings at random.",
   "Start with the security profile logs, often called security logs or UTM (unified threat management) logs. They record every action a profile takes: antivirus detections, web filter category blocks and warnings, application control matches, IPS signature hits, DNS filter actions and more, each in its own log subtype. A typical entry shows the source and destination addresses, the user if known, the policy ID, the profile and the specific signature, URL or category involved, and the action taken, such as blocked, passthrough or monitored. When a user reports that something was wrongly blocked, or a manager says a threat got through, the security log is where you confirm which profile acted, which rule matched, and why.",
   "The logs also explain silences, provided you know the preconditions. A policy only generates security events when the relevant profile is attached to it and logging is enabled, usually by setting the policy to log security events or all sessions. And an AV or web filter event for encrypted traffic requires that the traffic was actually inspected: under certificate inspection, the FortiGate cannot see a file inside an HTTPS download, so no AV event appears even if the file is infected. So if the log shows nothing for a session you expected to be blocked, check the policy match in the forward traffic log, the attached profiles, the logging setting and the SSL inspection mode before blaming the profile itself.",
   "Next, consider FortiGuard connectivity, which underpins almost every profile. Antivirus and IPS signatures, application control signatures, and the web and DNS filter category ratings all come from FortiGuard. Signature databases are downloaded and installed locally on a schedule, while web filter and DNS filter ratings are typically looked up in real time and cached. If the FortiGate cannot reach FortiGuard, two different symptoms appear. Locally stored signatures go stale, so new malware and new exploits are missed while the profile still appears to work. Real-time category lookups fail, which shows up as rating errors in web filtering, and the FortiGuard status in the GUI shows a warning or unreachable state.",
   "Licensing is the other half. FortiGuard services require a valid contract for each service, so an expired antivirus or web filtering license can produce the same stale-signature or rating-failure symptoms as a network problem. On an evaluation or trial virtual machine, FortiGuard updates are not available, so limited detection and rating errors are expected in that kind of lab and are not a configuration fault.",
   "The command `diagnose autoupdate versions` is the go-to check for whether signatures are current. It lists each FortiGuard-served database and engine on the FortiGate, such as the antivirus engine and definitions, IPS engine and attack definitions, and others, with the installed version, the date and time it was last updated, and the contract expiry or entitlement status. If versions are old, the last update time is far in the past, or the contract shows as expired, you know detection is weakened. You then investigate connectivity, such as DNS resolution of the FortiGuard servers, a route and policy to reach them, and any upstream filtering, and you check licensing and the update schedule.",
   "Related tools help confirm the diagnosis. The FortiGuard page in the GUI shows license status and connection state for each service. The command `execute update-now` triggers an immediate update attempt, which is useful after fixing connectivity. For rating lookups, `diagnose debug rating` shows the rating servers the FortiGate knows about and how they are responding. You do not need to memorize every option, but you should recognize these as the FortiGuard troubleshooting toolkit.",
   "A sensible troubleshooting flow ties these together. First, read the security logs to see what a profile did or did not do, and check the preconditions if the log is silent. Second, if detection seems stale or web ratings fail, run `diagnose autoupdate versions` to check signature currency and update status. Third, verify the license and the path to FortiGuard, fix what is broken, and force an update. Keeping signatures fresh and logging enabled is the difference between a profile that protects and one that only appears to.",
   "In a lab, you can generate an event that a profile should log, for example downloading the EICAR test file or visiting a blocked category, then read the entry in the security log and identify each field. Next, run `diagnose autoupdate versions` and note the database versions, last update times and contract status, which shows you how this evidence fits together."
  ],
  "analogy": "Troubleshooting security profiles is like checking on a night watchman. First you read the logbook to see what he recorded: who he stopped and why. If the book is blank, you check whether he was assigned to that door and told to write things down. Then you check the date on his wanted posters, because a guard with last year's posters will wave today's suspects through. `diagnose autoupdate versions` is reading the date on the posters; the security log is the logbook.",
  "terms": [
   [
    "Security (UTM) log",
    "The log recording security-profile actions (AV, web filter, application control, IPS, DNS) with source, destination, signature and action."
   ],
   [
    "FortiGuard connectivity",
    "The FortiGate's ability to reach FortiGuard for signature and rating updates, which most security profiles depend on."
   ],
   [
    "diagnose autoupdate versions",
    "A CLI command showing each FortiGuard database's version, last update time and entitlement status."
   ],
   [
    "Rating error",
    "A web-filter symptom that appears when FortiGuard cannot be reached to categorize a site."
   ],
   [
    "execute update-now",
    "A CLI command that triggers an immediate FortiGuard update attempt."
   ]
  ],
  "example": "Detection seems stale and web filtering throws rating errors, so the admin runs diagnose autoupdate versions, sees the antivirus and IPS databases have not updated in weeks, and traces the cause to blocked FortiGuard connectivity and an expired contract.",
  "mistakes": [
   [
    "If no security log entry appears, the profile must be broken.",
    "Check the preconditions first: the policy must match, the profile must be attached, logging must be enabled, and encrypted traffic must be deeply inspected for AV and similar events."
   ],
   [
    "Rating errors mean the web filter profile is misconfigured.",
    "Rating errors usually mean the FortiGate cannot reach FortiGuard or lacks a valid license to categorize sites. Check connectivity and licensing."
   ],
   [
    "Profiles keep full protection when FortiGuard is unreachable because signatures are stored locally.",
    "Local signatures still work but go stale, missing new threats, and real-time rating lookups fail. Confirm currency with diagnose autoupdate versions."
   ],
   [
    "A trial VM in the lab with stale signatures indicates a fault.",
    "Evaluation or trial VMs do not receive FortiGuard updates, so limited detection there is expected."
   ]
  ],
  "tryit": [
   [
    "At Granite Ridge Dental, users report rating errors on many websites starting this morning, and a malware sample that other sites caught yesterday was not detected. The web filter and AV profiles have not changed in months. What is your first CLI check, and what would you look for?",
    "Run diagnose autoupdate versions. Look at the last update times and contract status for the AV and IPS databases. Old timestamps or an expired contract point to FortiGuard connectivity or licensing, which also explains the rating errors. Then check DNS, routing and policies to FortiGuard, the license, and run execute update-now."
   ],
   [
    "A manager says a test virus downloaded over HTTPS was not blocked, and there is no entry in the AV log. The outbound policy has an AV profile attached and logs security events, and diagnose autoupdate versions shows current signatures. What is the most likely cause?",
    "The policy is using certificate inspection, so the FortiGate cannot see the file inside the HTTPS session and AV never scans it. Deep inspection is needed for AV to inspect encrypted downloads."
   ]
  ],
  "tip": "When signatures seem out of date or ratings fail, run diagnose autoupdate versions to check database currency and entitlement, then check FortiGuard reachability and licensing. When a log is silent, confirm the profile is attached, logging is on, and the traffic was actually inspected.",
  "check": [
   [
    "Which command shows whether FortiGuard signature databases are current?",
    "diagnose autoupdate versions, which lists each database's version, last update time and entitlement status."
   ],
   [
    "Where do you confirm which security profile blocked or allowed a given session?",
    "In the security (UTM) log, which records each profile's action with source, destination, signature and result."
   ],
   [
    "What often causes web-filter rating errors?",
    "The FortiGate cannot reach FortiGuard to categorize sites, so lookups fail; check FortiGuard connectivity and licensing."
   ],
   [
    "Name two reasons an expected AV event might be missing from the logs.",
    "The policy does not log security events, or the encrypted traffic was not deeply inspected (also possible: no AV profile on the matching policy)."
   ]
  ]
 },
 {
  "t": "Route lookup order: policy routes, then the routing table (longest match, distance, priority)",
  "hook": "Friday, 4:30 p.m. at Copperline Engineering's branch office. The network has two links: a private MPLS circuit to headquarters and a cheap broadband line for guests. The guest Wi-Fi is supposed to leave through broadband, but the HQ team calls to say guest streaming is clogging the MPLS circuit. You check the routing table: the default route points to MPLS, exactly as designed. A colleague added a policy route for guests last week, and someone else added a more specific static route for a cloud service yesterday. Three mechanisms now have an opinion about where each packet goes. Which one does the FortiGate actually listen to first, and in what order does it break ties?",
  "simple": "Before a FortiGate can decide whether to allow traffic, it has to decide which way the traffic should go, like a mail sorter deciding which truck gets each letter. It checks in a fixed order. First come special instructions called policy routes, such as 'all letters from the guest room go on the blue truck'. If one matches, that is the answer. If none match, the sorter uses the normal address book, the routing table. There, the most specific address wins: a route for one street beats a route for the whole city. If two routes are equally specific, the one from the more trusted source (lower distance) wins. If they are still tied, the lower priority number wins. If everything is equal, the traffic is shared across the routes.",
  "body": [
   "Before a FortiGate can apply a firewall policy to new traffic, it must decide where the packet should go, because the outgoing interface is part of what the policy lookup matches. That routing decision follows a strict, predictable order. Knowing the order explains many 'why did traffic take that path?' questions on the exam and in real troubleshooting. The lookup is done when a session is created, and the result is stored with the session, so later packets of the same session follow the same path.",
   "The first thing checked is the list of policy routes, also called policy-based routes (PBR). A policy route matches on criteria such as the incoming interface, source and destination addresses, protocol, port numbers and, in some cases, type of service bits. If a policy route matches, it forces the packet out a specified interface and gateway, regardless of what the destination-based routing table says. Policy routes are evaluated from the top down, and the first match wins, so their order matters just like firewall policy order.",
   "Because they come first, policy routes override the routing table for the traffic they match. That is how you steer specific traffic independently of destination, for example sending a guest subnet's web traffic out a broadband link while everything else follows the default route over MPLS. A policy route can also have the action 'stop policy routing', which tells the FortiGate to skip the remaining policy routes for matching traffic and use the routing table instead. That is useful for carving exceptions, such as sending guest traffic to an internal captive portal through the normal routes. On FortiOS, SD-WAN rules are implemented in a similar way, as routing decisions checked before the regular routing table, which is one reason SD-WAN steering can override plain static routes.",
   "If no policy route matches, the FortiGate consults the routing table, meaning the active routes in the forwarding information. Here, selection follows tie-breakers in a fixed order. First is longest prefix match: the most specific route that contains the destination address wins. A /24 route beats a /16 route that also covers the address, and a /32 host route beats both. This rule is fundamental: specificity always beats the other factors, so a more specific route with a worse distance still wins over a less specific route with a better distance. Distance only compares routes to the same prefix.",
   "Second, among routes with exactly the same prefix and prefix length, the route with the lowest administrative distance wins. Administrative distance expresses how much the FortiGate trusts the source of a route. A directly connected route is the most trusted, a static route by default is more trusted than routes learned from dynamic protocols such as OSPF, and different protocols have different default distances. Only the lowest-distance route for a given prefix is installed as active in the routing table; higher-distance routes wait in the routing database as backups and are promoted if the active route disappears.",
   "Third, when routes have the same prefix and the same distance, priority breaks the tie for static routes. The route with the lower priority value is preferred for forwarding, but, unlike the distance case, both routes remain installed in the routing table. That matters because a route that is still in the table can be used immediately if the preferred one fails, and it still counts for the reverse path forwarding check. For dynamic routing protocols, each protocol's own metric selects the best path before the route reaches the table.",
   "Finally, if prefix, distance and priority are all equal, the result is equal-cost multipath (ECMP). The FortiGate installs all the tied routes as active and shares new sessions across them using the configured ECMP load-balancing method, which by default is based on source IP address so that each client's sessions stay on one path.",
   "So the full order is: policy routes first, top down, first match wins; then the routing table by longest prefix match, then lowest administrative distance, then lowest priority, and finally ECMP across whatever is still tied. Keeping this sequence straight lets you predict the chosen path and diagnose surprises. In the scenario above, the guest policy route should win over the default route, unless an earlier policy route or a 'stop policy routing' entry catches the traffic first.",
   "In a lab, the FortiGate debug flow makes the lookup visible. Commands such as `diagnose debug flow filter` to select the traffic, followed by `diagnose debug flow trace start` and `diagnose debug enable`, print a trace in which you can see whether a policy route matched or which gateway and interface the routing table returned. Comparing the trace with `get router info routing-table all` and the policy route list shows exactly which route the FortiGate picked and why."
  ],
  "analogy": "Routing on a FortiGate is like a mail sorting room. Special handling stickers on an envelope, such as 'send by courier', are checked first and override everything; those are policy routes. Unstickered mail goes by the address book, where the most precise entry wins: a specific street address beats a city-wide forwarding rule. When two entries are equally precise, the sorter trusts the more official source, then the one marked as preferred, and if nothing separates them, splits the mail between trucks. The analogy stops working at sessions: a FortiGate decides once per session, not per letter.",
  "mnemonic": "Please Leave Directions Promptly: Policy routes first, then Longest prefix match, then administrative Distance, then Priority. Anything still tied becomes ECMP.",
  "terms": [
   [
    "Policy route (PBR)",
    "A rule matched before the routing table that forces matching traffic out a specified interface or gateway, overriding destination-based routing."
   ],
   [
    "Longest prefix match",
    "The routing rule that the most specific (longest mask) route to a destination is preferred over less specific ones."
   ],
   [
    "Administrative distance",
    "A measure of trust in a route's source; among equal-prefix routes the lowest distance is installed as active."
   ],
   [
    "Priority (static)",
    "A tie-breaker among equal-prefix, equal-distance routes; the lower value is preferred while both stay in the table."
   ],
   [
    "ECMP",
    "Equal-cost multipath: routes tied on prefix, distance and priority are all active and share sessions."
   ]
  ],
  "example": "A branch steers all guest-subnet web traffic out the broadband link with a policy route, so even though the routing table's default points to MPLS, the matching guest traffic follows the policy route because policy routes are checked first.",
  "mistakes": [
   [
    "A route with a lower administrative distance always wins.",
    "Distance only compares routes to the same prefix. Longest prefix match comes first, so a more specific route wins even with a higher distance."
   ],
   [
    "Policy routes are checked after the routing table as an exception list.",
    "Policy routes are checked first. If one matches, the routing table is not consulted for that traffic."
   ],
   [
    "When two routes have the same distance but different priorities, only the preferred one is in the table.",
    "Both stay installed in the routing table; priority only decides which is preferred. With different distances, only the lowest is installed."
   ],
   [
    "Policy routes are evaluated by best match, like routes.",
    "Policy routes are evaluated top down and the first match wins, so their order matters."
   ]
  ],
  "tryit": [
   [
    "A FortiGate has a static route 10.20.0.0/16 via port2 with distance 5, and an OSPF-learned route 10.20.30.0/24 via port3 with distance 110. No policy routes exist. Which interface does traffic to 10.20.30.40 leave from, and why?",
    "Port3. Longest prefix match comes first: the /24 is more specific than the /16 for that address, so it wins regardless of the OSPF route's higher distance. Distance would only matter between routes to the same prefix."
   ],
   [
    "Guest traffic at a branch should leave through broadband via a policy route, but traffic to the internal captive portal on 10.0.0.5 must follow the normal routing table. The admin adds a second policy route below the guest route for 10.0.0.5. Guests still cannot reach the portal. What is wrong?",
    "Policy routes use first match. The broader guest route above catches the portal traffic first. Move a 'stop policy routing' entry for destination 10.0.0.5 above the guest policy route so portal traffic falls back to the routing table."
   ]
  ],
  "tip": "Policy routes are evaluated before the routing table, top down, first match wins. Within the table the order is longest prefix match, then distance, then priority, then ECMP. Specificity (prefix length) always wins before distance.",
  "check": [
   [
    "In what order does a FortiGate make its routing decision?",
    "Policy routes first; if none match, the routing table by longest prefix match, then lowest administrative distance, then lowest priority, then ECMP."
   ],
   [
    "Which wins: a more specific route with a higher distance or a less specific route with a lower distance?",
    "The more specific route; longest prefix match is applied before administrative distance."
   ],
   [
    "What happens when routes have equal prefix, distance and priority?",
    "They form equal-cost multipath (ECMP) and traffic is shared across them."
   ],
   [
    "What does the 'stop policy routing' action do?",
    "It makes matching traffic skip the remaining policy routes and use the routing table instead."
   ]
  ]
 },
 {
  "t": "Static routes: administrative distance, priority, ECMP and load-balancing methods",
  "hook": "Sunday night at Meadowbrook Veterinary Group, the primary fiber link goes down for planned maintenance. You configured a second default route over a cellular modem last month, so the clinic should keep working. Instead, the on-call vet cannot reach the records system, and when you log in remotely you find that both default routes were set up with the same settings. Half the sessions were trying the dead link before it was even marked down, and nobody knows which route the FortiGate considered primary. Two numbers on each route, distance and priority, decide all of this. Which one should you change to build a clean backup, and what happens if you change the other?",
  "simple": "A static route is a direction you type in by hand, such as 'to reach the Internet, go to this gateway'. When you have two directions to the same place, the FortiGate uses two numbers to choose. Distance decides which direction is used at all: the lower distance goes in the active list, and the higher one waits on the bench until the first one disappears. Priority only matters when the distances are the same: both directions stay in the active list, but the lower priority number is preferred. If both numbers are equal, the FortiGate shares traffic across the routes, normally keeping each computer's traffic on one path. Think of distance as who is on the team roster and priority as who starts the game.",
  "body": [
   "Static routes are manually configured paths, and on a FortiGate their behavior is governed by two settings: administrative distance and priority. Together they decide which routes are active in the routing table and which of the active routes are preferred. Mastering how they interact is essential for the routing domain of the exam and for designing failover with multiple Internet links or VPN (virtual private network) tunnels.",
   "Administrative distance (AD) determines whether a route is installed in the active routing table at all. For two routes to the same destination prefix with different distances, only the lower-distance route becomes active. The higher-distance route is kept in the routing database as a standby and is promoted only if the active route disappears, for example because its interface goes down or a link health monitor withdraws it. On a FortiGate, static routes have a default distance of 10, and you raise the value on routes you want to keep in reserve.",
   "This is exactly how you build a floating static route. You configure the primary route with the normal distance and give the backup route a higher distance, so the backup stays out of the table until the primary fails. With two default routes at distances 10 and 20, only the distance-10 route forwards traffic. Running `get router info routing-table all` shows only that route, while `get router info routing-table database` shows both, with the distance-20 route marked as inactive. The backup costs nothing while idle, but it also cannot be used for anything else, including reverse path forwarding checks, until it is promoted.",
   "Priority, by contrast, applies among routes that already have the same distance. Routes with equal distance to the same prefix are all installed in the active table, and the one with the lower priority value is preferred for forwarding new sessions, while the others remain active and available. Because the less preferred route is still in the table, it can satisfy reverse path forwarding checks for traffic arriving on its interface, and it can be used immediately if the preferred route is removed. So two default routes, both at distance 10, with priorities 0 and 5 are both active, and the priority-0 route carries new outbound sessions.",
   "The distinction the exam loves is this: distance decides presence in the table, with one route active and the others on standby; priority decides preference among routes that are all present and active. Change distance when you want a route to be a cold backup that is invisible until needed. Change priority when you want both routes hot, with one preferred, for example so that return traffic or inbound sessions arriving on the secondary link still pass the reverse path check, or so SD-WAN and policy routes can still use the secondary path.",
   "When routes to the same destination share both the same distance and the same priority, they form equal-cost multipath (ECMP), and the FortiGate load-balances sessions across them. The method is set globally with `set v4-ecmp-mode` under `config system settings`. The options are source IP based, which is the default and sends all sessions from the same source address over the same path; source-destination IP based, which hashes on both addresses; weighted, which shares sessions according to weights assigned to each route; and usage based, also called spillover, which fills one link up to a configured threshold before using the next.",
   "The default source-IP method has a practical reason. ECMP on a FortiGate balances sessions, not individual packets, and keeping each client's sessions on one link preserves session affinity. That matters for services that tie a login to the client's public IP address, and it avoids the problems that per-packet balancing would cause, such as reordered packets and broken stateful sessions. Weighted and usage-based methods are useful when links have different capacities or costs, for example sending most traffic over fiber and only overflow over a metered link.",
   "Remember also that a static route stays active as long as its outgoing interface is up and, if a gateway is configured, the route is valid. If the path beyond the gateway fails while the interface stays up, the route remains in the table. That is why floating static routes are usually paired with a link health monitor, which detects the dead path and withdraws the primary so the backup can be promoted.",
   "In a lab, you can add two default routes with distances 10 and 20, confirm that only one appears in the active routing table and that the other is inactive in the database, then set both to the same distance with different priorities and confirm that both appear in the table with one preferred. Finally, set equal priorities and observe sessions from different clients spread across the two links."
  ],
  "analogy": "Distance and priority work like a sports team. Distance decides who is on the active roster: players with a worse number sit in the stands and only join if a rostered player leaves. Priority decides who starts among players already on the roster: the substitutes are on the bench, in uniform, ready to go in instantly. ECMP is when two players are rated identically and the coach rotates them. The analogy stops at session affinity: the coach rotates by fan, keeping each fan's view on the same player.",
  "terms": [
   [
    "Administrative distance",
    "Controls whether a static route is installed as active; among equal-prefix routes only the lowest distance is active, others wait as standby."
   ],
   [
    "Priority",
    "Among equal-distance routes (all active), the lower priority value is preferred for forwarding while the others stay usable."
   ],
   [
    "Floating static route",
    "A backup static route given a higher distance so it stays out of the table until the primary route fails."
   ],
   [
    "ECMP load-balancing method",
    "How sessions are shared across equal-distance, equal-priority routes: source IP (default), source-destination IP, weighted or usage based."
   ],
   [
    "Session affinity",
    "Keeping all sessions from one client on the same path, which the default source-IP ECMP method provides."
   ]
  ],
  "example": "A branch sets its MPLS default route to distance 10 and its broadband default route to distance 20, so broadband stays out of the routing table entirely until the MPLS route drops, giving clean primary and backup failover.",
  "mistakes": [
   [
    "Priority decides which route is installed in the routing table.",
    "Distance decides installation. Priority only chooses a preferred route among routes with the same distance, which are all installed."
   ],
   [
    "A floating static route is built by giving the backup a higher priority value.",
    "That keeps both routes active with one preferred. A cold backup that stays out of the table needs a higher distance."
   ],
   [
    "ECMP on a FortiGate balances individual packets across links.",
    "It balances sessions. The default source-IP method keeps each client's sessions on one path to preserve affinity."
   ],
   [
    "A higher-distance backup route can satisfy reverse path forwarding checks while it waits.",
    "Only routes in the active table count. Use equal distance with a higher priority value if the secondary path must pass RPF while idle."
   ]
  ],
  "tryit": [
   [
    "Ashford Freight has two ISPs. Inbound connections to a server published on both ISP addresses must work at all times, but outbound traffic should prefer ISP1. Currently ISP2's default route has distance 20, and inbound sessions on ISP2 are dropped. What change fixes this while keeping ISP1 preferred?",
    "Set both default routes to the same distance and give ISP2 a higher priority value than ISP1. Both routes are then active, so traffic arriving on ISP2 passes the reverse path check and replies can use that path, while new outbound sessions still prefer ISP1 because of its lower priority."
   ],
   [
    "A company has a fiber link and a slower, metered LTE link with equal-cost default routes. They want LTE used only when fiber is busy, not for half of all sessions. Which ECMP method fits?",
    "Usage-based (spillover) ECMP, which fills the fiber link up to a configured threshold before sending new sessions to LTE. Source-IP balancing would spread clients across both links regardless of load."
   ]
  ],
  "tip": "Distance decides which routes are in the table (one active); priority decides preference among routes already in the table (all active). Use distance for a cold backup, priority for a hot standby. ECMP balances sessions, by source IP unless configured otherwise.",
  "check": [
   [
    "Two default routes have distances 10 and 20. Which forwards traffic and where is the other?",
    "The distance-10 route forwards; the distance-20 route stays inactive in the routing database until the first is removed."
   ],
   [
    "Two default routes share distance 10 with priorities 0 and 5. What happens?",
    "Both are installed in the active table and the priority-0 route is preferred; the other remains usable."
   ],
   [
    "What is the default ECMP load-balancing method and why?",
    "Source-IP based, so all sessions from one source use the same path, preserving session affinity that per-packet balancing would break."
   ],
   [
    "What is the default administrative distance of a FortiGate static route?",
    "10."
   ]
  ]
 },
 {
  "t": "Routing table vs routing database: `get router info routing-table all` and `database`",
  "hook": "Tuesday at Redwood Community College, you are asked to sign off on the new backup Internet link before the semester starts. The contractor swears the backup default route is configured. You run `get router info routing-table all` and see only one default route, the primary. The contractor shrugs and says it must be there somewhere. The dean wants a yes or no by lunch: if the main link fails during registration week, will the college stay online? You know there is a second view of routing that shows what the FortiGate knows but is not using. Which command shows it, and what should a healthy backup look like there?",
  "simple": "A FortiGate keeps two lists of routes. The first, the routing table, is the short list of routes it is actually using right now to send traffic, the winners. The second, the routing database, is the long list of every route it knows about, including the ones waiting on the sidelines, like a backup route that only takes over if the main one fails. If you only look at the short list, a backup route seems to be missing, even though it is ready. One command shows the short list, `get router info routing-table all`, and a slightly different command, ending in `database`, shows the long list with markings that tell you which routes are winners. It is like a school sports team: the starting lineup on the scoreboard versus the full roster on the coach's clipboard.",
  "body": [
   "A FortiGate keeps two related but distinct views of routing: the routing table, which holds what is actively used to forward traffic, and the routing database, which holds everything the FortiGate knows about, active or not. The exam tests the difference and the commands that show each, because so much troubleshooting depends on seeing routes that are configured or learned but not currently in use.",
   "The routing table, often called the routing information base (RIB) or simply the active routing table, holds only the routes that won the selection process: the longest-prefix, lowest-distance routes, with priority and ECMP (equal-cost multipath) applied among the ties. These active routes are what the FortiGate programs into its forwarding table and uses for new sessions. If a route is not the best for its prefix, it does not appear here at all. The command `get router info routing-table all` displays this active table, with a code letter for the source of each route, such as S for static, C for connected and O for OSPF, along with the distance and metric in brackets, the gateway and the interface. This is what you check to answer 'how is traffic to this destination being forwarded right now?'.",
   "The routing database holds all candidate routes, whether or not they are active. That includes routes that lost selection, such as a higher-distance floating static default route, a static route whose interface is down, or a dynamically learned route that is less preferred than another source for the same prefix. The command `get router info routing-table database` shows this fuller list. In its output, codes at the top explain the markings: a `>` marks the selected route for a prefix and a `*` marks a route installed in the forwarding table, so a route without those markings is known but inactive. Inactive routes can also be labeled as such next to the entry.",
   "The practical value of the database view is diagnosing standby and backup routes. If you configured a backup default route with a higher distance and want to confirm it exists and is ready, it will not show in `routing-table all`, because it is not active, but it will show in the `database` view as an inactive route with its higher distance. Likewise, when troubleshooting failover, you confirm that the intended backup is present in the database so it can be promoted when the primary is removed. Seeing a route in the database but not in the active table is normal and expected for floating static routes.",
   "The database also explains surprising absences. Suppose you add a static route and it does not appear in the active table. The database may show that it lost to a more trusted route for the same prefix, for example a connected route, or that its outgoing interface is down, or that it has a higher distance than another static route. Each case tells you something different: the first is a design overlap, the second a physical or link problem, and the third may be exactly what you intended.",
   "It helps to tie this back to route selection. Longest prefix match is applied at forwarding time across the active routes, but the decision about which route represents each prefix in the active table, based on distance and then priority, is what separates the routing table from the database. Routes with the same distance but different priorities are all active, so they appear in `routing-table all`; routes with a higher distance for the same prefix do not. That is why the routing table versus database distinction and the distance versus priority distinction are usually tested together.",
   "When you need to know how one specific destination is handled, a related command narrows the view. `get router info routing-table details` followed by an IP address shows which route in the active table matches that destination, which saves scanning a large table by eye. For a full trace of an actual session, including policy routes, the debug flow remains the tool of choice.",
   "A simple rule summarizes the topic: use `get router info routing-table all` to see what is being used, and `get router info routing-table database` to see everything the FortiGate could use. When a question asks which command reveals inactive or backup routes as well as active ones, the answer is the routing-table database. In the college scenario, a healthy backup appears in the database as an inactive default route with the higher distance, ready for promotion.",
   "In a lab, you can add two default routes with distances 10 and 20, run `get router info routing-table all` to see only the active one, and then run the `database` version to confirm the standby is present and marked inactive. Bringing down the primary interface, or removing the primary route, and running both commands again shows the backup promoted into the active table, which makes the two-view model concrete."
  ],
  "analogy": "The routing table is the starting lineup posted on the scoreboard, and the routing database is the full roster on the coach's clipboard. Fans looking at the scoreboard might think the team has no backup goalie, but the clipboard shows one, suited up and waiting. When the starter is injured, the backup moves from the clipboard onto the scoreboard. The analogy stops at timing: on a FortiGate, promotion happens automatically as soon as the active route is removed.",
  "terms": [
   [
    "Routing table (RIB)",
    "The active routes currently used to forward traffic; shown by get router info routing-table all."
   ],
   [
    "Routing database",
    "All candidate routes the FortiGate knows, active and inactive; shown by get router info routing-table database."
   ],
   [
    "Active vs inactive route",
    "An active route is installed and forwarding; an inactive route (for example a higher-distance backup) waits in the database."
   ],
   [
    "Standby or backup route",
    "A route (often a floating static route) that stays in the database until the active route is removed."
   ],
   [
    "Selected and FIB markers",
    "In the database output, a > marks the selected route and a * marks a route installed in the forwarding table."
   ]
  ],
  "example": "An admin configures a distance-20 backup default route but does not see it in get router info routing-table all; checking get router info routing-table database confirms it is present as an inactive route, ready to take over.",
  "mistakes": [
   [
    "If a route is missing from get router info routing-table all, it was never configured.",
    "It may be configured but inactive, for example a higher-distance backup or a route whose interface is down. Check the database view."
   ],
   [
    "The routing database shows only dynamic routing protocol data.",
    "It includes all candidate routes, including static and connected routes, active and inactive."
   ],
   [
    "Routes with equal distance but a higher priority value appear only in the database.",
    "Equal-distance routes are all active, so they appear in the routing table; only higher-distance routes for the same prefix are left out."
   ],
   [
    "A backup route that appears in the database is guaranteed to work when promoted.",
    "The database confirms the route exists. Its path still needs testing, and a link health monitor is needed if the primary can fail beyond its gateway."
   ]
  ],
  "tryit": [
   [
    "At Lindenwood Bank's branch, a new static route to 10.50.0.0/16 via port4 does not appear in the active routing table. The database shows the route marked inactive, and port4 shows as down in the interface list. What is the cause and what should you check next?",
    "The static route is inactive because its outgoing interface is down, so it cannot be selected. Check the port4 cabling, the switch port and the link status; once the interface is up, the route should become active if nothing better exists for that prefix."
   ],
   [
    "During a failover test, the primary ISP link is unplugged, but Internet access does not recover. Before the test, `get router info routing-table database` showed only one default route. What does that tell you?",
    "No backup default route exists at all, active or inactive, so there is nothing to promote. Add a backup default route with a higher distance (and ideally a link health monitor on the primary) and confirm it appears as inactive in the database."
   ]
  ],
  "tip": "Backup and higher-distance routes appear only in the database view, not the active routing table. Use routing-table all for active routes and the database keyword for everything known, where > marks the selected route and * marks the forwarding table entry.",
  "check": [
   [
    "Which command shows only the routes currently used to forward traffic?",
    "get router info routing-table all, which displays the active routing table."
   ],
   [
    "Where do you look to confirm an inactive backup route exists?",
    "get router info routing-table database, which lists all known routes including inactive or standby ones."
   ],
   [
    "Why might a configured route not appear in routing-table all?",
    "Because it lost route selection (for example a higher-distance backup) or its interface is down; it will still show in the database view."
   ],
   [
    "Two static routes to the same prefix have the same distance but different priorities. Which view shows them?",
    "Both views; equal-distance routes are all active, so they appear in the routing table as well as the database."
   ]
  ]
 },
 {
  "t": "Reverse path forwarding (RPF) check",
  "hook": "Thursday afternoon at Bayview Shipping, the warehouse team has just been moved to a new subnet, 172.20.5.0/24, behind an internal router connected to the FortiGate's port3. The firewall policy from port3 to the Internet looks perfect: correct source, correct destination, action accept. Yet every connection from the warehouse fails, and the forward traffic log shows nothing for those users at all. The warehouse supervisor is waiting on a shipping portal to print labels before the trucks leave at five. You start a debug flow, and one line stands out: reverse path check fail. The policy allows the traffic, so why is the FortiGate throwing it away before the policy is even consulted?",
  "simple": "Reverse path forwarding, or RPF, is a simple honesty check. When a new conversation arrives on one of the FortiGate's ports, the FortiGate looks at who it claims to be from and asks: if I had to reply to this address, would I send the reply back out through this same port? If the answer is no, because the FortiGate has no route back to that address through that port, the traffic looks suspicious, possibly faked, so it is dropped. This stops people from pretending to be addresses they are not. The catch is that it also drops real traffic when someone forgets to add a route back, for example after creating a new subnet. It is like a receptionist who only accepts a parcel if the return address is somewhere they could actually send a reply.",
  "body": [
   "Reverse path forwarding (RPF), also called the anti-spoofing check or source check, verifies that traffic arriving on an interface has a plausible return path through that same interface. It is a security control built into FortiGate packet processing, it happens before the firewall policy lookup, and it is a common and sometimes surprising cause of dropped traffic that the exam expects you to recognize from a debug flow.",
   "The idea is straightforward. When the first packet of a new session arrives, the FortiGate looks at its source address and asks whether it has a route back to that source through the interface the packet came in on. If the FortiGate has no such route, the packet is dropped as a potential spoof. This stops an attacker on one segment from forging a source address that belongs to a different part of the network, or to somewhere the firewall could not legitimately reach through that interface, and it keeps traffic flows consistent with the routing design.",
   "Two details clarify when the check applies. First, RPF is evaluated when a session is created, on the originating packet, not on every packet of an established session, and not on the reply direction of a session the FortiGate already knows about. Second, any active route that points back out the ingress interface can satisfy the check, including a default route. That is why traffic arriving on a WAN interface from Internet addresses passes RPF: the default route points out that WAN interface, so a return path exists. Problems appear on internal interfaces, where there is usually no default route, and on secondary WAN links whose routes are not active.",
   "FortiGate supports two RPF modes. Feasible-path RPF is the default, sometimes described as loose mode. It accepts the packet if any active route back to the source exists through the ingress interface, even if that route is not the best route to the source. This is helpful in designs with multiple paths, such as two links that both have active routes. Strict RPF, enabled globally with `set strict-src-check enable` under `config system settings`, requires that the best route back to the source uses the same interface the packet arrived on, which is more restrictive and can drop legitimate traffic in asymmetric designs. RPF can also be turned off for a specific interface with `set src-check disable` under that interface's configuration, which removes the anti-spoofing protection there and should be a deliberate, documented choice rather than a quick fix.",
   "The classic symptom looks like this. Traffic from a subnet is dropped, the forward traffic log shows no matching policy activity, and a debug flow, started with `diagnose debug flow filter`, `diagnose debug flow trace start` and `diagnose debug enable`, prints a message stating that the reverse path check failed and the packet was dropped. The firewall policy would allow the traffic, but the packet never reaches the policy lookup. The cause is that the FortiGate has no route back to that source subnet through the interface where the traffic arrived.",
   "Common triggers are network changes. A new subnet is created behind an internal router, but nobody adds a static route on the FortiGate pointing to it through that router. A routing change makes traffic arrive asymmetrically, through an interface the FortiGate would not use to reply. Or a backup link's route is a higher-distance floating route, which is inactive and therefore does not count, so sessions that arrive on the backup link fail RPF. In each case, the fix is to add or adjust the return route: for the warehouse example, a static route for 172.20.5.0/24 via the internal router's address on port3.",
   "The backup-link case links this topic to route design. Because only active routes count for RPF, a higher-distance route on a secondary link does not help inbound sessions on that link. If inbound traffic must be accepted on both links, give both routes the same distance and use priority to prefer one for outbound traffic, so both stay in the active table and both satisfy RPF.",
   "This is why RPF failures frequently appear right after network changes: a new inbound path exists, but the corresponding return route was never added or is not active. Recognizing the reverse path message in the debug flow and knowing the fix, adding the missing return route via the ingress interface, is the exam-ready takeaway. Disabling the check is possible, but it trades away spoofing protection and is rarely the best answer.",
   "In a lab, you can trigger an RPF drop by sending traffic from a subnet the FortiGate has no route back to, read the reverse path failure in the debug flow output, then add the route via the incoming interface and watch the next session pass the check and reach the policy lookup."
  ],
  "analogy": "RPF is like a receptionist who only accepts a delivery if the return address is somewhere the company actually ships to through that same loading dock. A parcel arriving at the north dock claiming to be from a supplier the company only reaches through the south dock looks forged, so it is refused. The default route is like a note saying 'we ship anywhere in the world from the north dock', so international parcels arriving there pass. The analogy stops at timing: the check is done once per new session, not on every parcel in an ongoing delivery.",
  "terms": [
   [
    "Reverse path forwarding (RPF)",
    "An anti-spoofing check that drops new sessions whose source has no valid return route via the interface they arrived on."
   ],
   [
    "Strict RPF",
    "A mode requiring the best return route to the source to use the same interface the packet arrived on."
   ],
   [
    "Feasible-path (loose) RPF",
    "The default, more permissive mode that accepts the packet if any active return route to the source exists via the ingress interface, even if it is not the best route."
   ],
   [
    "Asymmetric routing",
    "A situation where traffic takes different paths each way, a common trigger for RPF drops when the return route is missing."
   ],
   [
    "src-check",
    "The interface setting that can disable RPF on a specific interface, removing anti-spoofing protection there."
   ]
  ],
  "example": "Traffic from 172.20.5.0/24 arriving on port3 is dropped and the debug flow shows a reverse path check failure; the FortiGate has no route back to that subnet via port3, so adding one fixes it.",
  "mistakes": [
   [
    "If a firewall policy allows the traffic, RPF cannot drop it.",
    "RPF is checked before the policy lookup. A packet that fails RPF is dropped even if a policy would allow it."
   ],
   [
    "The best fix for an RPF failure is to disable the source check on the interface.",
    "That removes spoofing protection. The usual correct fix is to add the missing return route via the ingress interface."
   ],
   [
    "A higher-distance backup route satisfies RPF for traffic arriving on the backup link.",
    "Only active routes count. Inactive floating routes do not help; use equal distance with priority if both links must accept inbound sessions."
   ],
   [
    "Strict RPF is the FortiGate default.",
    "The default is feasible-path (loose) RPF; strict mode must be enabled with strict-src-check."
   ]
  ],
  "tryit": [
   [
    "At Elmstead Clinic, a new VoIP subnet 10.30.8.0/24 sits behind a core switch at 10.30.0.2, connected to the FortiGate's port2. Phones cannot reach the cloud phone provider, and the debug flow shows a reverse path check failure. The FortiGate's routing table has only connected routes on port2 and a default route on wan1. What do you add?",
    "A static route for 10.30.8.0/24 with gateway 10.30.0.2 on port2. The FortiGate currently has no route back to the phones' subnet via port2, because the default route points out wan1, so the new sessions fail RPF. With the return route, they pass the check and reach the policy lookup."
   ],
   [
    "A company publishes a server on two ISP links. Inbound connections arriving on ISP2 fail, and the debug flow shows reverse path failures. ISP2's default route has distance 20 and ISP1's has distance 10. How do you fix this without disabling RPF?",
    "Set both default routes to the same distance and give ISP2 a higher priority value. Both routes become active, so the default route via ISP2 satisfies RPF for sessions arriving there, while outbound traffic still prefers ISP1."
   ]
  ],
  "tip": "An RPF (reverse path) failure in a debug flow almost always means a missing or inactive return route for the source subnet via the ingress interface, common after new subnets or asymmetric routing changes. Add the route rather than disabling the check, and remember that only active routes count.",
  "check": [
   [
    "What does the reverse path forwarding check do?",
    "It drops new sessions whose source address has no valid return route via the interface they arrived on, blocking spoofed traffic."
   ],
   [
    "Traffic is dropped with a reverse path check failure though a policy allows it. What is the likely cause and fix?",
    "The FortiGate lacks a route back to the source subnet via the incoming interface; add that return route."
   ],
   [
    "What is the difference between strict and loose RPF?",
    "Strict requires the best return route to use the ingress interface; the default feasible-path (loose) mode only requires that some active return route to the source exists via the ingress interface."
   ],
   [
    "Why does traffic from Internet addresses usually pass RPF on a WAN interface?",
    "The active default route points out that WAN interface, providing a return path for any source address."
   ]
  ]
 },
 {
  "t": "Link health monitors and blackhole routes",
  "hook": "At 6:10 a.m., the first shift at Kestrel Manufacturing cannot reach anything on the Internet. You check the FortiGate remotely: wan1 is up, the cable is fine, and the default route to the primary ISP is sitting in the routing table looking perfectly healthy. The backup ISP on wan2 is configured with a higher distance, waiting to help, but it never takes over. The ISP's modem is answering at layer 2, yet everything beyond it is dead. Then a second worry: when the site-to-site VPN to headquarters dropped last month, internal payroll traffic briefly tried to leave through the Internet link instead. How do you make the FortiGate notice a dead path, and make sure private traffic never wanders out in the clear?",
  "simple": "A static route is like a road sign. The FortiGate only takes the sign down if the road right in front of it is closed, meaning its own port goes down. If the road is broken further along, the sign stays up and traffic keeps driving into a dead end. A link health monitor fixes this by regularly sending a test message, such as a ping, to a place beyond the gateway. If the replies stop, the FortiGate takes the sign down so the backup route can take over. A blackhole route is different: it is a sign that says 'stop here and throw this away'. It sits quietly behind the real route and only takes effect if the real route disappears, so private traffic is dropped instead of being sent somewhere unsafe.",
  "body": [
   "A static route on its own is only removed from the routing table when its outgoing interface goes down. As long as the interface is up, the route stays active, even if the path beyond the next-hop gateway is completely broken. That creates two gaps in resilient design: the FortiGate does not notice a dead upstream path, and when a route does disappear, traffic may fall through to a route you did not intend. Link health monitors close the first gap by detecting dead paths and withdrawing routes, and blackhole routes close the second by safely dropping traffic that would otherwise leak. Both are staples of FortiGate design and appear regularly on the exam.",
   "A link health monitor, often called a link monitor, actively probes a target through a specific interface and watches for responses. It is configured in the CLI under `config system link-monitor`, where you set the source interface, the gateway, one or more target servers, the probe protocol (ping by default, with other options such as TCP echo or HTTP), the probe interval, and how many failed probes mark the link as dead and how many successful probes bring it back. The key choice is the target: it should be something beyond the gateway, such as a reliable public server, so the probe tests the whole path rather than just the first hop.",
   "When probes fail beyond the configured threshold, the FortiGate marks the link as dead and, with the option to update static routes enabled, withdraws the static routes that use that interface and gateway from the routing table. This solves the core problem that a next-hop gateway, such as an ISP modem, can be reachable while the path beyond it is broken. Without a health monitor, the route lingers and traffic is silently lost. With one, the primary route is removed, and a higher-distance floating route on the backup link is promoted automatically. So to remove a primary default route when the ISP path stops answering, you attach a link health monitor to that WAN interface with a target beyond the gateway.",
   "The link monitor's decision is tied to the routes that use the monitored interface and gateway, so only the affected routes are pulled when the probe fails, and they are restored automatically when probes succeed again for the configured recovery count. Failover and failback happen without operator action. This is the mechanism behind dual-ISP failover with plain static routing, and SD-WAN performance SLAs extend the same idea by measuring latency, jitter and packet loss to steer traffic between members rather than only withdrawing routes.",
   "A blackhole route is a static route whose action is to silently discard matching traffic instead of forwarding it. In the CLI, it is a static route with `set blackhole enable`, and in the GUI the destination interface is set to Blackhole. You normally give a blackhole route a high administrative distance so that it is inactive while the real route is present, sitting behind it in the routing database. Its job is to catch traffic only when the real route disappears.",
   "The classic use is with IPsec VPNs. Routes to remote private subnets point to the tunnel interface, and the FortiGate also has a default route to the Internet. If the tunnel goes down, its routes are removed, and traffic to those private subnets would match the next best route, usually the default route, and leave through the Internet interface unencrypted. That leaks internal traffic, can be dropped by the ISP anyway, and can create sessions that keep using the wrong path after the tunnel recovers. Adding a blackhole route for the remote private subnets, at a higher distance than the tunnel route, prevents this: while the tunnel is up, the tunnel route wins; when the tunnel drops, the blackhole route becomes active and the traffic is discarded.",
   "Blackhole routes are also commonly configured for the RFC 1918 private address ranges as a whole. That way, any traffic to a private address that has no more specific route is dropped locally rather than sent to the ISP. The FortiOS IPsec VPN wizard creates blackhole routes for the remote subnets automatically, which is a hint at how standard the practice is.",
   "Together, these two features give you detection and safe disposal. Link health monitors detect a dead path and automatically withdraw the affected routes so backups can take over. Blackhole routes ensure that when a route is gone, traffic is dropped rather than leaking to the wrong place. A useful mental check for any design is to ask two questions: what removes the primary route when the path fails, and where does traffic go when it is gone?",
   "In a lab, you can add a link health monitor to the primary WAN with a target beyond the gateway, then block the probe target with a policy or a filter upstream and watch the primary route disappear from `get router info routing-table all` while the backup route takes over. Then bring down a test IPsec tunnel and confirm with a debug flow or a ping that traffic to the remote subnet is dropped by the blackhole route rather than routed to the Internet."
  ],
  "analogy": "A link health monitor is like a scout who walks the whole road every few minutes, not just to the end of the driveway. When the bridge two miles away is out, the scout reports back and the road sign is taken down so drivers use the detour. A blackhole route is a gate at the edge of town that only closes when the secure tunnel road is closed, so sensitive cargo is stopped instead of taking the public highway. The analogy stops there: a blackhole silently drops traffic, it does not send it back with a message.",
  "terms": [
   [
    "Link health monitor",
    "An active probe (ping by default, or other types such as TCP echo or HTTP) through an interface that withdraws the associated routes when the path fails."
   ],
   [
    "Route withdrawal on failure",
    "Removing a static route from the table when its health monitor detects a dead path, letting a backup take over."
   ],
   [
    "Blackhole route",
    "A route that silently discards matching traffic, usually given a high distance so it activates only when the real route is gone."
   ],
   [
    "Traffic leak prevention",
    "Using a blackhole route so that when a tunnel or route drops, sensitive traffic is dropped instead of following the default route out."
   ],
   [
    "Probe target",
    "The address a link monitor tests, ideally beyond the gateway so the full path is checked."
   ]
  ],
  "example": "A branch adds a link health monitor pinging a target beyond its primary ISP gateway; when the ISP path fails the probes stop, the FortiGate withdraws the primary default route, and the backup ISP route takes over automatically.",
  "mistakes": [
   [
    "A static route is removed whenever the path beyond the gateway fails.",
    "It is only removed when its interface goes down. A link health monitor is needed to detect upstream failures and withdraw the route."
   ],
   [
    "The link monitor should probe the ISP gateway address.",
    "The gateway may still answer while the path beyond it is broken. Probe a target beyond the gateway to test the full path."
   ],
   [
    "A blackhole route should have a lower distance than the tunnel route to be safe.",
    "A lower distance would make it active and drop traffic all the time. It needs a higher distance so it only activates when the tunnel route is removed."
   ],
   [
    "When an IPsec tunnel drops, traffic to the remote subnet is automatically dropped.",
    "Without a blackhole route, it follows the next best route, often the default route, and leaves the Internet interface unencrypted."
   ]
  ],
  "tryit": [
   [
    "Thornbury Library has two ISPs. wan1's default route has distance 10, and wan2's has distance 20. When ISP1 had an upstream outage, wan1 stayed up and no failover happened. The link monitor was set to ping ISP1's gateway, which kept replying. What should change?",
    "Point the link health monitor's target at a reliable address beyond ISP1's gateway, and confirm the update-static-route behavior is enabled. Then an upstream failure stops the probes, the wan1 default route is withdrawn, and the wan2 route with distance 20 is promoted."
   ],
   [
    "A branch has an IPsec tunnel to headquarters for 10.0.0.0/8 and a default route to the Internet. Security wants to guarantee that if the tunnel drops, traffic to 10.0.0.0/8 never leaves through the Internet link. What do you configure?",
    "A blackhole static route for 10.0.0.0/8 with a higher distance than the tunnel route. While the tunnel is up, the tunnel route is active; when it drops, the blackhole route becomes active and the traffic is silently discarded instead of matching the default route."
   ]
  ],
  "tip": "A link monitor is what detects a dead path and removes the route, since a route otherwise stays up while its interface is up; probe a target beyond the gateway. Blackhole routes with a high distance stop traffic leaking when a tunnel drops.",
  "check": [
   [
    "Why add a link health monitor instead of relying on the static route alone?",
    "A static route stays in the table while its interface is up even if the path beyond the gateway is broken; a health monitor probes the path and withdraws the route on failure so a backup takes over."
   ],
   [
    "Why add a blackhole route for private subnets on a site with IPsec tunnels?",
    "So that if a tunnel route disappears, the traffic is silently dropped instead of following the default route out to the Internet in the clear."
   ],
   [
    "What distance should a blackhole backup route have relative to the real route?",
    "A higher distance, so it stays inactive while the real route is present and only activates when that route is removed."
   ],
   [
    "What makes a good link monitor probe target?",
    "A reliable address beyond the gateway, so the probe tests the whole path rather than just the first hop."
   ]
  ]
 },
 {
  "t": "SD-WAN members and zones, and routes that point to the zone",
  "hook": "Monday morning at Alder Street Accounting, you are finishing an SD-WAN rollout that was started by a contractor who has since moved on. The two broadband links, wan1 and wan2, are now SD-WAN members, a performance SLA is pinging a public server, and a rule steers video calls to the link with lower latency. It all looks impressive on the dashboard. But nobody in the office can browse the web, and when you try to edit the old outbound firewall policy, wan1 is no longer in the interface list. The contractor's notes say he deleted the old default routes to 'let SD-WAN handle it'. What did he miss, and why does a carefully built SD-WAN carry no traffic at all?",
  "simple": "SD-WAN lets a FortiGate treat several Internet connections as one smart team, choosing the best one for each kind of traffic. Each connection that joins the team is a member. Members are grouped into zones, which are like team names. Once a connection joins, you write your firewall rules using the zone name instead of the individual connection. The part people forget: SD-WAN only chooses between members for traffic that the normal routing has already sent its way. So you still need a route, usually a default route, that says 'send Internet traffic to the SD-WAN zone'. Without that route, the team never gets the ball. It is like a dispatch office with great drivers that never receives any delivery orders.",
  "body": [
   "Software-defined WAN (SD-WAN) on a FortiGate lets you treat several WAN links as one intelligent bundle that steers traffic based on link quality, cost and business rules rather than on static routing alone. The building blocks are members and zones, and there is a routing detail that trips up many administrators and exam candidates alike: SD-WAN still needs a route that points to it before it can steer anything.",
   "An SD-WAN member is an interface that participates in SD-WAN, for example wan1, wan2, or an IPsec tunnel interface used as an overlay. When you add a member, you set per-member values such as its gateway, which is the next hop SD-WAN uses for that link, and its cost, which some steering strategies use to prefer cheaper links. Members are the physical or logical paths SD-WAN can choose among, and each one can be measured by performance SLAs (service level agreements) that probe latency, jitter and packet loss. You add each WAN link you want SD-WAN to use as a member.",
   "There is a configuration prerequisite worth knowing. An interface generally cannot be added as an SD-WAN member while other configuration objects still reference it, such as firewall policies or static routes that name that interface directly. You must first remove or change those references. This is often the first surprise in a migration from plain dual-WAN routing: the old per-interface policies and routes have to go before the interface can join SD-WAN.",
   "An SD-WAN zone groups members together. FortiOS includes a default zone, named `virtual-wan-link`, and you can create your own, for example an 'internet' zone with two broadband links and an 'overlay' zone with VPN tunnels to headquarters. Zones are important because they are what firewall policies and static routes reference. Once an interface becomes an SD-WAN member, you no longer select that individual interface in a firewall policy; you select the SD-WAN zone that contains it. This is a frequent exam point: after adding wan1 to SD-WAN, you cannot pick wan1 as the outgoing interface in a policy anymore, you pick the zone. Grouping members into zones also lets you write different policies for Internet traffic and for overlay traffic.",
   "The routing piece is the one people forget. SD-WAN rules do not inject routes by themselves. They only steer traffic that the routing table has already decided to send toward SD-WAN, and then choose which member carries it. So you must add a static route, typically a default route for 0.0.0.0/0, whose destination is the SD-WAN zone rather than an individual interface. In the CLI, that is a static route that references the zone, for example with `set sdwan-zone` followed by the zone name. The FortiGate then installs routes through each member using that member's gateway, so each member needs its gateway set, unless the gateway is learned dynamically, for example from DHCP.",
   "Without that route, even a perfectly configured set of members, SLAs and rules carries no traffic, because nothing tells the routing table to hand the traffic to SD-WAN. When someone deletes the old per-interface default routes, which they must do to add the interfaces as members, and forgets to add a default route to the zone, Internet access fails despite SD-WAN appearing fully configured. That is exactly what happened in the scenario above. Checking `get router info routing-table all` quickly reveals the problem: there is no default route at all.",
   "Once the route is in place, the rest of SD-WAN builds on it. Performance SLAs measure each member's health. SD-WAN rules match traffic by source, destination, application or Internet service and choose a member using a strategy, such as best quality, lowest cost or maximize bandwidth. If no rule matches, the implicit rule load-balances across members. All of that only happens for traffic that has already been routed to the zone and allowed by a policy that uses the zone.",
   "So the minimum working set is: interfaces freed of old references and added as members, members grouped in a zone, a static default route pointing to the zone with member gateways set, and firewall policies using the zone as the outgoing interface. Performance SLAs and rules then go on top. The route makes traffic eligible for SD-WAN, the policy allows it, and the rules and SLAs choose among the members.",
   "In a lab, you can put two WAN interfaces into an SD-WAN zone, add a default route pointing at the zone, and reference the zone in an outbound firewall policy, confirming that traffic flows and that the routing table shows the default route through both members. Only then add a performance SLA and a rule, so that you can see clearly which piece does which job."
  ],
  "analogy": "SD-WAN is like a taxi dispatch office. The members are the taxis, the zone is the dispatch office that groups them, and the SD-WAN rules and SLAs are the dispatcher choosing the best taxi for each trip based on traffic reports. But the dispatcher only works on calls that reach the office. The static route to the zone is the phone number customers use to call it. Without that number, the best fleet in town sits idle. The analogy stops at policies: the firewall policy is a separate gatekeeper that must also approve every trip.",
  "terms": [
   [
    "SD-WAN member",
    "A WAN interface or tunnel added to SD-WAN as a selectable path, with per-member settings like gateway and cost."
   ],
   [
    "SD-WAN zone",
    "A group of members that firewall policies and routes reference instead of the individual interfaces; virtual-wan-link is the default zone."
   ],
   [
    "Zone reference in policy",
    "After an interface becomes a member, policies select the SD-WAN zone, not the interface directly."
   ],
   [
    "Route to the zone",
    "A static (usually default) route pointing at the SD-WAN zone, required so the routing table hands traffic to SD-WAN."
   ],
   [
    "Performance SLA",
    "A health check that measures latency, jitter and packet loss on members, used by SD-WAN rules to choose a path."
   ]
  ],
  "example": "After adding wan1 and wan2 to an SD-WAN zone, an admin cannot select wan1 in a firewall policy and Internet access fails; referencing the SD-WAN zone in the policy and adding a default route to the zone restores it.",
  "mistakes": [
   [
    "SD-WAN rules create the routes they need automatically.",
    "SD-WAN rules only steer traffic that the routing table already sends to SD-WAN. You must add a static route, usually a default route, pointing to the zone."
   ],
   [
    "After adding wan1 to SD-WAN, you can keep using wan1 in firewall policies.",
    "Policies must reference the SD-WAN zone that contains the member; the member interface is no longer selectable directly."
   ],
   [
    "You can add an interface as a member while old policies and routes still reference it.",
    "References to the interface must be removed first, which is why old per-interface routes and policies disappear during migration."
   ],
   [
    "Performance SLAs are required before any traffic can flow through SD-WAN.",
    "Traffic flows once members, a zone, a route to the zone and a policy exist; SLAs and rules refine path choice on top."
   ]
  ],
  "tryit": [
   [
    "At Quarry Lane Veterinary, the admin added wan1 and wan2 to a new zone called internet, created a best-quality rule for video calls, and built a policy from the LAN to the internet zone. Users still cannot reach any website, and the routing table shows only connected routes. What is missing?",
    "A static default route whose destination is the internet SD-WAN zone (with gateways set on each member). Without it, the routing table has nothing sending Internet traffic to SD-WAN, so the policy and rules never come into play."
   ],
   [
    "A network engineer wants to add wan2 to SD-WAN, but the FortiGate refuses because wan2 is in use. wan2 currently has a backup default route and appears in one outbound policy. What should the engineer do?",
    "Remove the static route and the policy that reference wan2 (or change them), then add wan2 as a member, put it in a zone, and recreate the routing and policy using the zone instead of the interface."
   ]
  ],
  "tip": "Two SD-WAN gotchas: policies must reference the zone, not the member interface, and you must add a static default route pointing to the zone, or SD-WAN rules have no traffic to steer. Remember that interfaces must be free of references before they can become members.",
  "check": [
   [
    "After adding an interface to SD-WAN, what must a firewall policy reference?",
    "The SD-WAN zone that contains the member, not the individual interface, which can no longer be selected directly."
   ],
   [
    "Why does SD-WAN still need a static route to the zone?",
    "SD-WAN rules only steer traffic the routing table already sends to SD-WAN; a route pointing at the zone is what makes traffic eligible."
   ],
   [
    "What is the minimum set of pieces for working SD-WAN?",
    "Members in a zone, a static route to the zone, policies using the zone, plus performance SLAs and rules on top."
   ],
   [
    "What is the name of the default SD-WAN zone on FortiOS?",
    "virtual-wan-link."
   ]
  ]
 },
 {
  "t": "Performance SLAs: probes, latency, jitter, packet loss, SLA targets",
  "hook": "It is Monday morning at Cedar Valley Clinics, and the help desk queue is filling with the same complaint: telehealth calls keep freezing and voices sound robotic. You open the FortiGate dashboard. Both WAN links are green. Nothing is down, the broadband circuit is up, the MPLS circuit is up, and the interface counters look normal. Yet doctors are hanging up on patients. Priya from the network team leans over and asks, \"If both links are up, why is the voice traffic still on the bad one?\" The firewall clearly knows each link is alive. What it does not seem to know is whether each link is any good. How do you teach a FortiGate the difference?",
  "simple": "A performance SLA is a health check for each internet connection. The FortiGate keeps sending small test messages, called probes, over every link to a server it trusts, and it times the answers. From that it learns three things: how long a round trip takes (latency), how much that time jumps around (jitter), and how many test messages never come back (packet loss). You then write down what \"good enough\" means, for example \"under 150 milliseconds and almost no loss\". A link that meets all your limits passes; a link that breaks any one of them fails. It is like checking the bus times every few minutes before deciding which bus to take to work.",
  "body": [
   "Performance SLAs (service-level agreements) are how Software-Defined WAN (SD-WAN) on a FortiGate measures each link so it can make quality-based decisions. Instead of assuming that a link which is up is also healthy, the FortiGate continuously probes every SD-WAN member and compares the results against targets you define. In the FortiOS GUI you find them under Network, SD-WAN, Performance SLAs, and in the CLI under `config system sdwan` and then `config health-check`. Understanding what is measured, and how targets turn measurements into decisions, is central to the SD-WAN part of the NSE 4 exam.",
   "Start with the probe itself. A performance SLA sends probes through each selected SD-WAN member to a probe server, which is any reachable target that will answer reliably: a public DNS server, a server in your own data center, or a host on the far side of a VPN overlay. You choose the probe protocol to suit the target. Ping uses Internet Control Message Protocol (ICMP) echo, and other options include HTTP, DNS and TCP-based probes, which are useful when a target blocks ICMP or when you want the check to look more like real application traffic. Probes are sent on a regular check interval, and each member is tested independently, so the FortiGate builds a separate picture of every path.",
   "From the probe replies the FortiGate computes three quality metrics per member. Latency is the round-trip delay between sending a probe and receiving its reply, measured in milliseconds. Jitter is the variation in that delay from one probe to the next; a link can have acceptable average latency but terrible jitter, which is exactly what breaks voice and video. Packet loss is the percentage of probes that received no reply within the expected time. These three numbers describe how good each path is right now, and they are the raw data that SD-WAN rules consult when choosing a member.",
   "The same probes also decide whether a member is alive at all. If a set number of consecutive probes fail, the member is declared dead, and after a number of consecutive successes it is declared alive again. This dead or alive state is separate from SLA pass or fail: a link can be alive yet out of SLA because its jitter is too high. When a member is declared dead, FortiOS can also remove the static routes that use it, so a dead link behaves like a failed interface in the routing table. Keep the two ideas distinct, because exam questions often hinge on whether a link has failed completely or is merely performing badly.",
   "SLA targets turn raw measurements into a pass or fail judgment. Inside a performance SLA you define one or more SLA targets, each with thresholds, for example latency under 150 ms, jitter under 30 ms and packet loss under 2 percent. A member meets a target only when all of its measurements are within every threshold in that target, and it fails as soon as any single threshold is exceeded. Several targets in one SLA let you describe different needs against the same probe data, such as a strict target for voice and a looser one for general browsing. In diagnostic output you will see this pass or fail state recorded per member, often as an SLA map value showing which targets the member currently meets.",
   "Rules that reference an SLA, such as lowest cost (SLA) or maximize bandwidth (SLA), act only on members that currently meet the chosen target. The moment a member falls out of SLA it stops being eligible for those rules, and new sessions move to members that still meet the target, without anyone touching a static route. This is what makes performance SLAs more responsive than a simple link monitor: they react to quality degradation, not only to total failure. A broadband link that is up but losing five percent of its packets is invisible to an up or down check, but a performance SLA catches it.",
   "Good design starts with the probe target. The target must represent the path your traffic actually takes. Probing the ISP's local gateway only tells you the first hop is reachable; it will not reveal congestion or loss further into the provider's network or across the Internet. Choose a target close to the real destination, such as a data center server for traffic that goes there, or a stable public service for Internet-bound traffic. It is also wise to use more than one server where the feature allows, so that a single target going offline does not make a healthy link look dead.",
   "Next, set targets to match the application. Voice and video tolerate very little jitter and loss, so their targets should be tight. Bulk transfers, backups and software updates tolerate much more, so a looser target avoids moving them needlessly. Finally, remember the division of labor: the performance SLA only measures and judges. It never moves traffic by itself. SD-WAN rules decide what to do with the results, and a performance SLA that no rule references simply collects data.",
   "To see this in practice, a common lab is to add a ping performance SLA toward a probe server on each member, then run `diagnose sys sdwan health-check` in the CLI. The output lists every member with its state, packet loss, latency and jitter, and shows whether it meets each target. If you then block the probe server on one link, you can watch that member's loss climb until it fails the SLA, and later be declared dead."
  ],
  "analogy": "A performance SLA is like a commuter who checks live travel times for two routes every few minutes. The app reports how long each route takes (latency), how unpredictable it is (jitter) and how often it is blocked outright (packet loss). The commuter has personal limits: under 30 minutes and no closures. The analogy stops at decisions: the travel app never drives the car. In SD-WAN the SLA only measures, and a separate SD-WAN rule decides which route traffic takes.",
  "terms": [
   [
    "Performance SLA",
    "An SD-WAN health check that probes each member and measures latency, jitter and packet loss against targets."
   ],
   [
    "Probe / probe server",
    "The periodic test (ping, HTTP, DNS, TCP and others) sent through a member to a reachable target to measure that member's quality."
   ],
   [
    "Latency, jitter, packet loss",
    "The three measured metrics: round-trip delay, variation in delay between probes, and percentage of probes with no reply."
   ],
   [
    "SLA target",
    "Threshold values (for example maximum latency, jitter and loss) that decide whether a member currently meets the SLA; exceeding any one means failing it."
   ],
   [
    "Dead versus out of SLA",
    "Dead means consecutive probes failed and the member is treated as down; out of SLA means it is alive but its quality misses a target."
   ]
  ],
  "example": "For voice traffic, an admin at a clinic group sets a performance SLA target of latency under 150 ms, jitter under 30 ms and loss under 1 percent, probing a server at the data center. When the broadband link's jitter spikes past 30 ms it fails the SLA, even though it is still up, and the voice rule shifts new calls to the MPLS member that still meets the target.",
  "mistakes": [
   [
    "Probing the ISP's local gateway is good enough because it is always reachable.",
    "The local gateway only proves the first hop works. Loss and delay further along the provider network or Internet go unseen, so pick a target that represents the real destination."
   ],
   [
    "A member meets the SLA if most of its metrics are within the thresholds.",
    "A member must be within every threshold in the target. Exceeding any single one, for example jitter, means it fails that SLA target."
   ],
   [
    "The performance SLA itself moves traffic off a bad link.",
    "The SLA only measures and judges. SD-WAN rules that reference the SLA decide which member carries traffic."
   ],
   [
    "A link that is out of SLA is the same as a dead link.",
    "Out of SLA means alive but poor quality; dead means consecutive probes failed. Dead members can also have their routes removed, which is a different effect."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union probes 8.8.8.8 with ping on both WAN links. The security team then starts blocking outbound ICMP to external hosts for policy reasons, and soon both members show 100 percent packet loss even though users browse normally. What should the admin change?",
    "The probe, not the links, is broken. Switch the performance SLA to a probe protocol the target still answers through the new policy (for example an HTTP or DNS probe to a suitable server), or permit the probe traffic. A health check must use a protocol and target that reliably reply, or it will report healthy links as dead."
   ]
  ],
  "tip": "Probe a target that represents the real destination, not the local gateway, or the SLA will miss Internet-side loss. A member must meet every threshold in a target. The SLA only measures; SD-WAN rules act on which members meet the target.",
  "check": [
   [
    "What three metrics does a performance SLA measure?",
    "Latency (round-trip delay), jitter (variation in delay) and packet loss (percentage of unanswered probes)."
   ],
   [
    "What does an SLA target do?",
    "It sets threshold values a member's measurements must stay within to meet the SLA; exceeding any threshold means the member fails the SLA."
   ],
   [
    "Why probe a target beyond the local gateway?",
    "So the SLA reflects the true path quality to the destination; probing only the local gateway would miss loss and latency further along."
   ],
   [
    "Can a member be alive but fail its SLA?",
    "Yes. Alive means probes are being answered; failing the SLA means latency, jitter or loss exceeds a target threshold."
   ]
  ]
 },
 {
  "t": "SD-WAN rules: manual, best quality, lowest cost (SLA), maximize bandwidth (SLA); implicit rule",
  "hook": "The finance director at Northgate Logistics forwards you the monthly bill with one line highlighted: the MPLS circuit usage has tripled. You check the FortiGate. Last week a colleague created an SD-WAN rule for all Internet traffic and chose the strategy that always picks the link with the lowest latency. MPLS happens to be a few milliseconds faster than the cheap broadband line, so nearly everything now rides the expensive circuit, even though broadband is perfectly healthy. The director wants the bill down by next month without anyone noticing slower service. Which SD-WAN strategy keeps traffic on cheap broadband while it is good enough, and only spends on MPLS when it has to?",
  "simple": "SD-WAN rules are the instructions that tell the FortiGate which internet connection each kind of traffic should use. Each rule says \"traffic like this\" and then picks a style of choosing. Manual means you list the links in a fixed order. Best quality means always grab the link that is measuring best right now. Lowest cost means use the cheapest link as long as it is good enough. Maximize bandwidth means share the traffic across every link that is good enough. Anything that matches no rule falls to a default catch-all rule at the bottom. Think of choosing a delivery service: always the same one, always the fastest, the cheapest that still arrives on time, or splitting parcels between several.",
  "body": [
   "SD-WAN rules, also called SD-WAN services in the CLI (`config system sdwan` then `config service`), decide which member carries a given class of traffic. Each rule has two halves. The first half matches traffic, using source address, destination address, protocol and port, an application from the application control database, or an Internet Service Database (ISDB) entry such as a well-known SaaS service. The second half applies a strategy for choosing among the members you list in the rule. Rules are checked from the top down and the first match wins, so a specific voice rule must sit above a broad rule for all Internet traffic. Knowing the four strategies, and what happens to traffic that matches nothing, is core exam material.",
   "Manual mode assigns matching traffic to the members you specify, in the order you specify, and ignores performance SLA measurements. You use it when you want deterministic control, for example always sending a particular application out MPLS first and using broadband only if MPLS is unavailable. It is simple to predict, but it does not react to link degradation on its own: if the preferred member is up but suffering heavy loss, manual mode keeps using it. Members that are completely dead are skipped, but merely poor quality is not a reason for manual mode to move.",
   "Best quality selects the member with the best measured value of one chosen metric: latency, jitter, packet loss, or bandwidth. The rule references a performance SLA for its measurements and continuously steers new sessions toward whichever link currently scores best on that metric. This suits traffic that should always take the objectively best path, such as voice that must use the lowest-jitter link. The downside is that it chases small differences. If two links are close in quality, traffic can move back and forth between them, and it will abandon a link that is perfectly adequate just because another is slightly better. FortiOS includes a quality threshold setting that damps this flapping by requiring a meaningful difference before switching, but the behavior of always chasing the top score remains.",
   "Lowest cost (SLA) picks the cheapest member among those that currently meet the SLA target. Cost here is the cost value you configure on each SD-WAN member, not a figure the FortiGate discovers; if costs are equal, the order of members in the rule breaks the tie. Traffic stays on the cheapest in-SLA member and only moves when that member fails the SLA, at which point the rule chooses the next cheapest member that still meets it. This is the strategy for the classic intent of using inexpensive broadband while it is good enough and moving to expensive MPLS only when broadband falls out of SLA. Unlike best quality, it does not chase marginal improvements, so it maximizes cost efficiency while guaranteeing a quality floor.",
   "Maximize bandwidth (SLA), often described as load balancing, spreads sessions across all members that currently meet the SLA target, using them in parallel to increase aggregate throughput. It suits bulk or high-volume traffic where using every acceptable link at once is better than picking a single winner. Members that fall out of SLA are removed from the pool until they recover, so the load balancing still respects a quality floor. Note that distribution is per session, so a single large download still uses one link.",
   "At the bottom of the rule list sits the implicit rule. Any SD-WAN traffic that matches no explicit rule is handled here, using a configurable default load-balancing method across all members. Source IP is the default, which keeps each internal host on a consistent link; other methods include session-based, source and destination IP, volume-based, and spillover, which fills one link up to a threshold before using the next. The implicit rule guarantees that all traffic routed to the SD-WAN zone gets a path even if you have written no rules at all. It does not consult SLA targets for member selection, so traffic that needs quality awareness should be matched by an explicit rule above it.",
   "Two practical details often appear in troubleshooting questions. First, a member can only be selected for a destination if it has a valid route to that destination, which is why the SD-WAN default route pointing to the zone matters. Second, if every member listed in a rule is unavailable, that rule is skipped and evaluation continues to the next rule down, and eventually to the implicit rule. A rule that seems to be ignored is often a rule whose members are all dead or that a higher rule matches first.",
   "When choosing a strategy, read the intent in the question carefully. Fixed preference regardless of measurements points to manual. Always the best path on one metric points to best quality. Cheapest path that is still good enough points to lowest cost (SLA). Use every good link at once points to maximize bandwidth (SLA). Traffic with no rule at all is the implicit rule's job.",
   "In a lab you can add a lowest cost (SLA) rule for general Internet traffic and a best quality rule for voice above it, give the MPLS member a higher cost than broadband, and then verify with `diagnose sys sdwan service` which member each rule selects. Degrading broadband until it fails the SLA shows the lowest cost rule move to MPLS while the voice rule follows the best metric."
  ],
  "analogy": "Picture four ways to choose a delivery company. Manual is always using the same courier from a fixed list. Best quality is checking every morning which courier was fastest yesterday and switching to it, even for a one-minute gain. Lowest cost is using the cheapest courier that still delivers on time, and switching only when it starts arriving late. Maximize bandwidth is splitting parcels among every courier that is on time. The implicit rule is the mailroom default for parcels with no instructions.",
  "mnemonic": "My Bike Lasts Miles: Manual, Best quality, Lowest cost (SLA), Maximize bandwidth (SLA), the four SD-WAN rule strategies, with the implicit rule as the catch-all underneath.",
  "terms": [
   [
    "Manual rule",
    "Assigns matching traffic to specified members in a fixed order, ignoring SLA measurements."
   ],
   [
    "Best quality",
    "Selects the member with the best measured metric (latency, jitter, loss or bandwidth), always chasing the top score."
   ],
   [
    "Lowest cost (SLA)",
    "Selects the cheapest member, by configured member cost, that currently meets the SLA target, moving off it only when it fails the SLA."
   ],
   [
    "Maximize bandwidth (SLA)",
    "Spreads sessions across all members that currently meet the SLA target to increase aggregate throughput."
   ],
   [
    "Implicit rule",
    "The catch-all at the bottom of the SD-WAN rule list for traffic matching no explicit rule, using a default load-balancing method such as source IP."
   ]
  ],
  "example": "An admin wants cheap broadband used while it meets quality and MPLS used only as a fallback, so they set a higher cost on the MPLS member and choose lowest cost (SLA). Best quality would have moved traffic to MPLS whenever it scored even slightly better on latency, driving up the bill.",
  "mistakes": [
   [
    "Best quality is the right choice whenever you want to save money but keep quality.",
    "Best quality ignores cost and chases the top metric. Lowest cost (SLA) is the strategy that keeps traffic on the cheap link until it fails the SLA."
   ],
   [
    "Manual mode moves traffic away from a link that is performing badly.",
    "Manual mode ignores SLA measurements. It only skips members that are completely dead, not ones with poor quality."
   ],
   [
    "The implicit rule load balances only across members that meet the SLA.",
    "The implicit rule uses a default load-balancing method such as source IP across members and does not use SLA targets for selection; put quality-sensitive traffic in an explicit rule."
   ],
   [
    "Rule order does not matter because the FortiGate picks the best rule.",
    "Rules are evaluated top-down and the first match wins, so a broad rule above a specific one will capture its traffic."
   ]
  ],
  "tryit": [
   [
    "Bayside Dental has two broadband links from different ISPs with equal cost. The owner wants large nightly backups to the cloud to finish faster by using both links at once, but never over a link that is dropping packets. Which strategy fits, and why not the implicit rule?",
    "Maximize bandwidth (SLA). It spreads sessions across every member that meets the SLA target and drops a member that falls out of SLA. The implicit rule would also spread traffic, but it does not check SLA targets, so it could keep using a lossy link."
   ],
   [
    "A rule matching Microsoft 365 traffic lists only the MPLS member, but users report that this traffic leaves through broadband. The MPLS member shows as dead in the health check. What is happening?",
    "Because every member in that rule is unavailable, the FortiGate skips the rule and evaluates the rules below it, ending at the implicit rule, which sends traffic over broadband. Adding broadband as a second member in the rule would make the fallback explicit."
   ]
  ],
  "tip": "Best quality always chases the top metric even when the current link is fine; lowest cost (SLA) only switches when the cheap link fails the SLA. Match the strategy to the intent the question states, and remember rules are first match, top-down, above the implicit rule.",
  "check": [
   [
    "Which strategy keeps traffic on the lowest-cost link until it fails the SLA?",
    "Lowest cost (SLA), which uses the cheapest in-SLA member and only moves when that member falls out of SLA."
   ],
   [
    "Which strategy always uses the link with the best measured metric?",
    "Best quality, which selects the member with the best latency, jitter, loss or bandwidth value."
   ],
   [
    "What handles SD-WAN traffic that matches no explicit rule?",
    "The implicit rule, a catch-all using a configurable default load-balancing method (source IP by default) across the members."
   ],
   [
    "Which strategy ignores SLA measurements entirely?",
    "Manual, which uses the members in the configured order regardless of measured quality."
   ]
  ]
 },
 {
  "t": "SD-WAN monitoring and troubleshooting: `diagnose sys sdwan health-check`, `diagnose sys sdwan service`",
  "hook": "It is 9:40 p.m. and Marcus, the only engineer on call at Riverside Housing Trust, gets a message from the branch manager in the east office: the payroll application is crawling, and it has been sending traffic over the expensive MPLS line all afternoon. The SD-WAN design says payroll should prefer broadband. Marcus logs in to the branch FortiGate over SSH. He has a dozen possible causes in his head: a bad link, a broken probe, a rule in the wrong order, a missing route. He has time for maybe two commands before the manager calls back. Which two commands answer the questions that actually matter?",
  "simple": "When SD-WAN sends traffic down the wrong link, you need to answer two questions in order. First: what does the FortiGate think of each link right now? The command `diagnose sys sdwan health-check` shows the test results for every link, how slow, how jumpy, how much is lost, and whether each link passes its quality target. Second: given those results, which link did each rule pick? The command `diagnose sys sdwan service` shows every rule and the link it is using. It is like a doctor who first reads the lab results, then checks what the treatment plan decided based on them.",
  "body": [
   "When SD-WAN does not behave as expected, two command-line interface (CLI) commands answer the two questions that matter most. Are the links measuring healthy? And which member is each rule actually using? The first question is about the measurement layer, the data SD-WAN collects from performance service-level agreements (SLAs). The second is about the decision layer, how SD-WAN rules turned that data into a choice. Knowing which command reveals which layer is the practical, exam-tested skill for SD-WAN troubleshooting.",
   "The command `diagnose sys sdwan health-check` shows the live results of the performance SLAs. For each health check and each member it lists the member's sequence number and interface, its state (alive or dead), and the measured packet loss, latency and jitter. It also shows whether the member currently meets each SLA target, typically as an SLA map value in which each bit represents one target, so a member meeting the first target but not the second shows a different map from one meeting both. You can add the name of a specific health check to narrow the output when several exist.",
   "Reading this output answers several common questions. If a member shows high loss or high jitter and is failing its target, that explains why SLA-based rules avoid it. If a member shows as dead, its probes are failing completely, either because the link is down or because the probe server is unreachable through that link. If a health check shows no useful measurements at all, suspect the configuration: the probe server may be wrong, the protocol may be blocked, or the member may not be included in the health check. In each case, this command tells you whether the raw data that SD-WAN decisions rest on is trustworthy.",
   "The command `diagnose sys sdwan service` shows the decision layer. For every SD-WAN rule, which the CLI calls a service, it lists the rule's ID, its mode or strategy (for example manual, priority-based modes such as lowest cost, or load balancing), the traffic it matches, and its members in their current order of preference. Each member line shows whether it is alive, its SLA status for the rule's target, and which member is currently selected. This is where you confirm that a rule is steering traffic to the member you expect, and where you see whether a member was pushed down the list because it failed the SLA.",
   "Used together, the two commands form a clear diagnostic flow that moves from measurement to decision. First run the health check to confirm each member's measurements and SLA state, because rules act on that state. Then run the service command to see how the rules translated the state into member selection. If the health check shows failing or missing measurements, fix the probe or SLA configuration first, because no rule can make good decisions from bad data. If the health check is fine but traffic still goes the wrong way, the problem is in rule logic: the wrong strategy, wrong member costs, wrong SLA target referenced, or a broader rule higher in the list matching the traffic first.",
   "Apply this to the payroll case. The health check shows the broadband member alive but with 4 percent loss against a 2 percent target, so it is out of SLA. The service command then shows the payroll rule, set to lowest cost (SLA), with broadband marked as failing the SLA and MPLS selected. The firewall is behaving exactly as designed; the real fault is the broadband circuit, and the next call goes to the ISP. Had the health check been clean while the service output still showed MPLS selected, Marcus would look at member costs or rule order instead.",
   "Several supporting tools round out the picture. `diagnose sys sdwan member` lists the members with their interfaces, gateways and configured costs, which helps when lowest cost decisions look wrong. `diagnose sys sdwan intf-sla-log` followed by an interface name shows recent SLA history for that member, which is useful for intermittent problems that have cleared by the time you log in. The session table, viewed with `diagnose sys session list` and suitable filters, shows which interface an existing session is actually using. Remember that SD-WAN rules mainly affect new sessions, so an old session may stay on a link after a rule's choice changes.",
   "The GUI shows the same information graphically. The SD-WAN monitor and the Performance SLAs page chart latency, jitter and loss per member over time and show which members meet each target, and the SD-WAN rules page shows the currently selected member for each rule. The routing table still matters as well: SD-WAN can only use a member that has a valid route to the destination, so a missing default route to the SD-WAN zone produces confusing results that neither command alone explains. For a CLI-based exam question, though, the distinction is simple: health-check is the measurements, service is the rule-to-member mapping.",
   "A good lab exercise is to degrade one link on purpose, for example by blocking its probe server, and watch the member's loss rise until it fails the target in `diagnose sys sdwan health-check`. Then run `diagnose sys sdwan service` and confirm that the affected SLA-based rule moved to another member, while a manual rule did not."
  ],
  "analogy": "Think of a flight dispatcher. The weather board shows conditions at every airport, wind, visibility and storms; that is the health check. The dispatch log shows which airport each flight was assigned to after reading the board; that is the service command. If flights are going to the wrong airport, first check whether the weather board is accurate, then check the dispatch rules. The analogy breaks slightly because SD-WAN usually changes paths only for new sessions, while existing ones may stay put.",
  "terms": [
   [
    "diagnose sys sdwan health-check",
    "Shows per-member state, latency, jitter and packet loss for each performance SLA, and whether each member meets each SLA target."
   ],
   [
    "diagnose sys sdwan service",
    "Shows each SD-WAN rule, its strategy and its members in current preference order, including which member is selected and why others were demoted."
   ],
   [
    "SLA state / SLA map",
    "Whether a member currently meets its SLA targets, shown in output as a map of which targets it passes; rules use it to decide eligibility."
   ],
   [
    "Measurement-then-decision flow",
    "Troubleshooting by first checking health-check (data) and then service (how rules used the data)."
   ]
  ],
  "example": "Traffic is unexpectedly using MPLS instead of broadband, so the admin runs `diagnose sys sdwan health-check` and sees broadband alive but failing its loss target. Running `diagnose sys sdwan service` then shows the lowest cost (SLA) rule with broadband out of SLA and MPLS selected, which confirms the firewall is working as designed and the ISP circuit needs attention.",
  "mistakes": [
   [
    "`diagnose sys sdwan service` is where you see latency and jitter numbers.",
    "Live latency, jitter and loss per member come from `diagnose sys sdwan health-check`. The service command shows which member each rule selects."
   ],
   [
    "If traffic takes the wrong link, start by rewriting the SD-WAN rules.",
    "Check the measurements first. Rules act on SLA state, so a broken probe or genuinely bad link must be ruled out before blaming rule logic."
   ],
   [
    "A member showing dead always means the physical link is down.",
    "Dead means the probes failed. The link may be up while the probe server is unreachable or the probe protocol is blocked."
   ],
   [
    "Changing a rule immediately moves every existing session.",
    "SD-WAN selection mainly applies to new sessions; existing sessions can stay on their original link, which the session table reveals."
   ]
  ],
  "tryit": [
   [
    "At Oakline Library, `diagnose sys sdwan health-check` shows both members alive with low loss and both meeting the SLA. But `diagnose sys sdwan service` shows the video rule selecting the more expensive member, even though the rule is lowest cost (SLA). What do you check next?",
    "Because the measurements are healthy, the fault is in the decision layer. Check the configured member costs (with `diagnose sys sdwan member` or the config), confirm the rule references the intended SLA target, and confirm no higher rule is catching the video traffic first."
   ]
  ],
  "tip": "Health-check shows the measurements and SLA pass or fail; service shows which member each rule picked. Check measurements first, since rules act on SLA state, then check how the rule used them.",
  "check": [
   [
    "Which command shows the live latency, jitter and packet loss for each SD-WAN member?",
    "`diagnose sys sdwan health-check`, which also shows whether each member is alive and meets its SLA targets."
   ],
   [
    "Which command shows which member an SD-WAN rule is currently using?",
    "`diagnose sys sdwan service`, which maps each rule to its selected member or members based on strategy and SLA state."
   ],
   [
    "If health-check is healthy but traffic takes the wrong path, where is the problem?",
    "In the rule logic or ordering, such as costs, the referenced SLA or a higher rule matching first; the service command reveals how members were selected."
   ]
  ]
 },
 {
  "t": "IPsec basics: IKEv1 vs IKEv2, phase 1 and phase 2, proposals, DH groups, PFS, UDP 500/4500 and NAT-T",
  "hook": "Lena at Pinecrest Outfitters has spent the afternoon on the phone with an engineer at a partner company, trying to bring up a site-to-site tunnel between their FortiGates. Every few minutes one of them says, \"Try it now.\" The VPN monitor shows phase 1 green. Phase 2 stays stubbornly down. Then the partner mentions that their FortiGate sits behind a separate router doing NAT, and nobody is sure whether that matters. Lena has the configuration in front of her: version, proposals, DH groups, PFS, subnets. Some of these must match exactly and some only on one phase. Which ones, and why would one phase succeed while the other fails?",
  "simple": "IPsec is a way to build a private, locked tunnel between two networks across the public internet. The two firewalls set it up in two steps. In step one, they prove who they are to each other and create a safe channel just for talking. In step two, they use that safe channel to agree on how to lock up the real data, and which networks the tunnel will carry. Both sides must agree on the same settings, like two people agreeing on a language and then on a secret code. The setup messages use a network door numbered UDP 500, and if a home-style router changes addresses in between, they switch to door UDP 4500.",
  "body": [
   "Internet Protocol Security (IPsec) builds encrypted tunnels between sites over the untrusted Internet. A FortiGate negotiates these tunnels with the Internet Key Exchange (IKE) protocol in two phases, and the encrypted user data then travels as Encapsulating Security Payload (ESP) packets. The NSE 4 exam tests the two phases, the parameters that must match in each, and the ports involved, because nearly every tunnel failure traces back to one of those three things.",
   "IKE comes in two versions. IKEv1 is the older protocol. Its phase 1 uses either main mode, which takes six messages and protects the peers' identities, or aggressive mode, which takes three messages and is faster but exposes identity information and is considered less secure. Its phase 2 is called quick mode. IKEv2 is the modern successor. It negotiates in fewer messages, has built-in support for features such as NAT traversal and Extensible Authentication Protocol (EAP) user authentication, handles liveness and rekeying more cleanly, and is generally preferred for new deployments. Both peers must use the same IKE version, so a version mismatch prevents negotiation entirely, and in that case even phase 1 never comes up.",
   "Phase 1 establishes the IKE security association (SA). During phase 1 the peers authenticate each other, using either a pre-shared key or digital certificates, and build a secure, encrypted channel for the rest of the negotiation. For phase 1 to succeed, both sides must agree on the IKE version, the authentication method and the credentials themselves, at least one matching encryption and hash proposal, and the Diffie-Hellman (DH) group. If phase 1 comes up, you have learned a lot: the peers can reach each other, the key or certificates are correct, and the IKE version and phase 1 proposals line up.",
   "Phase 2 establishes the IPsec SA that actually protects user data. The peers negotiate it inside the secure phase 1 channel. Here they must match their phase 2 proposals (the encryption and authentication algorithms used for ESP), the perfect forward secrecy (PFS) setting and its DH group if PFS is used, and the selectors, also called quick-mode selectors or traffic selectors, which describe the local and remote subnets the tunnel will carry. Each side's local selector must correspond to the other side's remote selector. Selector or proposal mismatches are the most common reason phase 1 succeeds but phase 2 fails, which is exactly Lena's situation.",
   "A proposal is a set of algorithms offered during negotiation, for example AES-256 encryption with SHA-256 for integrity. A FortiGate can offer several combinations, and the peers settle on one that both support; if no combination overlaps, negotiation fails with a no-proposal-chosen style error in the IKE debug. Phase 1 and phase 2 have separate proposal lists, so matching phase 1 proposals says nothing about phase 2.",
   "The Diffie-Hellman group determines the strength of the key exchange, the mathematical step that lets two peers agree on a shared secret without ever sending it across the network. Larger modular exponential (MODP) groups such as group 14 and elliptic-curve groups such as 19 and 20 are much stronger than the legacy groups 1, 2 and 5, which should be avoided. The group number alone does not rank strength; you need to know what each group represents. Both peers must have at least one DH group in common for phase 1, and for phase 2 as well when PFS is enabled.",
   "Perfect forward secrecy, configured in phase 2, runs a fresh DH exchange each time a new phase 2 key is created. As a result, compromising one key does not expose past or future keys, because each was derived from independent key material. Without PFS, phase 2 keys are derived from the phase 1 key material, so a single compromise has wider consequences. The trade-off is a little extra processing at every rekey, which modern hardware handles easily. PFS must be set the same way on both peers, and a mismatch is another classic cause of phase 2 failure.",
   "Finally, the ports. IKE negotiation uses User Datagram Protocol (UDP) port 500. ESP itself is IP protocol 50, which has no port numbers, and that is a problem for NAT devices that track connections by port. NAT traversal (NAT-T) solves it. During the first IKE messages the peers detect whether a NAT device sits between them, and if so they move the rest of the IKE exchange to UDP 4500 and encapsulate ESP inside UDP 4500 so it can cross the NAT. NAT-T also sends periodic keepalives so the NAT device keeps its mapping open. When NAT is involved, both UDP 500 and UDP 4500 must be allowed between the peers; opening only UDP 500 lets negotiation start but blocks the tunnel from working.",
   "In a lab you can build a route-based tunnel between two FortiGates and then, to learn the failure modes, deliberately mismatch a phase 2 selector or the PFS setting. Read the IKE debug output until you can recognize each error, and you will be able to tell at a glance whether a problem lives in phase 1 or phase 2."
  ],
  "analogy": "IPsec negotiation is like two diplomats meeting. First they check each other's credentials and agree to talk in a private room with a common language; that is phase 1. Inside the room they negotiate the actual treaty, including which territories it covers; that is phase 2, with selectors as the territories. PFS is like using a fresh secret code for each new treaty instead of reusing one. The analogy stops at NAT-T, which is simply moving the meeting to a different door when a guard in between would otherwise block it.",
  "mnemonic": "Phase 1 checks VAPD: Version, Authentication, Proposals, DH group. Phase 2 checks PPS: Proposals, PFS, Selectors.",
  "terms": [
   [
    "IKEv1 vs IKEv2",
    "IKE versions for negotiating IPsec; IKEv2 is newer, uses fewer messages, builds in NAT-T and EAP support and is generally preferred. Both peers must use the same version."
   ],
   [
    "Phase 1 vs phase 2",
    "Phase 1 builds the authenticated IKE SA (secure channel); phase 2 builds the IPsec SA that encrypts user data with ESP."
   ],
   [
    "Proposal",
    "The offered set of encryption and integrity algorithms; the peers must share at least one combination in each phase."
   ],
   [
    "DH group / PFS",
    "The DH group sets key-exchange strength; PFS runs a fresh DH exchange for each phase 2 key so one key's compromise does not expose others."
   ],
   [
    "Selectors",
    "The local and remote subnets a phase 2 SA carries; each side's local must match the other side's remote."
   ],
   [
    "UDP 500 / 4500 (NAT-T)",
    "IKE uses UDP 500; when NAT is detected, NAT traversal moves IKE and encapsulated ESP to UDP 4500."
   ]
  ],
  "example": "Two branch FortiGates form an IKEv2 tunnel. Phase 1 authenticates them with a pre-shared key over UDP 500 using AES-256, SHA-256 and DH group 14. Because one branch is behind an ISP router that performs NAT, NAT-T detects it and shifts the rest of the exchange and the encrypted traffic to UDP 4500. Phase 2 then negotiates matching selectors for 10.1.0.0/16 and 10.2.0.0/16 with PFS enabled on both sides.",
  "mistakes": [
   [
    "If phase 1 is up, the pre-shared key and all proposals must be correct, so phase 2 cannot be a proposal problem.",
    "Phase 1 and phase 2 have separate proposal lists. Phase 1 success proves the phase 1 settings only; phase 2 proposals, PFS and selectors can still mismatch."
   ],
   [
    "A higher DH group number is always stronger.",
    "Group numbers are identifiers, not a ranking. Know that groups such as 14, 19 and 20 are strong and 1, 2 and 5 are legacy."
   ],
   [
    "Opening UDP 500 is enough for any IPsec tunnel.",
    "When a NAT device sits between the peers, NAT-T moves traffic to UDP 4500, so both UDP 500 and 4500 must be allowed."
   ],
   [
    "PFS is a phase 1 setting.",
    "PFS is configured in phase 2. It adds a fresh DH exchange for each phase 2 key and must match on both peers."
   ]
  ],
  "tryit": [
   [
    "A tunnel between Granite Bank's HQ and a new branch shows phase 1 up in the VPN monitor, but phase 2 never establishes. HQ's phase 2 lists local 10.10.0.0/16 and remote 10.20.0.0/24, while the branch lists local 10.20.0.0/16 and remote 10.10.0.0/16. Both use the same proposals and PFS settings. What is wrong?",
    "The selectors do not mirror each other. HQ expects the branch subnet to be 10.20.0.0/24, but the branch offers 10.20.0.0/16. Make each side's local selector match the other side's remote selector, then phase 2 can establish."
   ]
  ],
  "tip": "Phase 1 up but phase 2 down almost always means mismatched phase 2 proposals, PFS or DH group, or selectors. And when a peer is behind NAT, remember UDP 4500 (NAT-T), not just UDP 500.",
  "check": [
   [
    "What does each IPsec phase establish and what must match?",
    "Phase 1 builds the IKE SA (IKE version, authentication, proposals and DH group must match); phase 2 builds the IPsec SA (proposals, PFS and DH group, and selectors must match)."
   ],
   [
    "Which ports are needed when an IPsec peer is behind NAT?",
    "UDP 500 for IKE and UDP 4500 for NAT traversal (NAT-T), which also carries ESP encapsulated in UDP."
   ],
   [
    "What does enabling PFS in phase 2 do?",
    "It runs a fresh Diffie-Hellman exchange for each phase 2 key so compromising one key does not expose others."
   ],
   [
    "Why is IKEv1 aggressive mode considered less secure than main mode?",
    "It completes in three messages and exposes identity information that main mode protects."
   ]
  ]
 },
 {
  "t": "Route-based (interface-mode) vs policy-based IPsec",
  "hook": "You inherit the firewall at Lakeshore Veterinary Group after the previous admin moves on. The plan for next quarter is ambitious: add a second ISP at every branch, put both links into SD-WAN, and have the VPN fail over automatically. You open the IPsec configuration and find that the existing branch tunnels were built years ago as policy-based VPNs. There are no tunnel interfaces anywhere, just firewall policies with an IPsec action. Your manager asks a simple question in the planning meeting: \"Can we just add the existing tunnels to SD-WAN?\" Before you answer, you need to know what a policy-based tunnel can and cannot do. What is the honest answer?",
  "simple": "A FortiGate can build a VPN tunnel in two styles. In the route-based style, the tunnel appears as a new virtual network port on the firewall. Because it behaves like a port, you can send traffic to it with routes, use it in normal security rules, add it to SD-WAN and have backup paths. In the policy-based style, there is no port. Instead, one special security rule says \"encrypt anything that matches me\". That is simple for one tunnel but hard to grow. It is like the difference between building a real road with its own exit sign, which any map can use, and a private shuttle that only leaves when someone shows a specific ticket.",
  "body": [
   "A FortiGate can build Internet Protocol Security (IPsec) VPNs in two styles: route-based, which FortiOS calls interface mode, and policy-based. Both use the same Internet Key Exchange (IKE) negotiation and the same encryption, but they connect the tunnel to the rest of the firewall in very different ways. That difference shapes how flexible and scalable the VPN can be. Modern designs almost always use route-based tunnels, and the NSE 4 exam wants you to know exactly why.",
   "In a route-based (interface-mode) VPN, creating the phase 1 produces a virtual tunnel interface, named after the phase 1, that appears in the interface list alongside the physical ports. This interface behaves like any other interface. You can point static routes or dynamic routes at it, reference it as the incoming or outgoing interface in ordinary firewall policies, add it to an SD-WAN zone as a member, and use it as part of an Auto-Discovery VPN (ADVPN) design. The VPN wizard in the GUI and the CLI command set `config vpn ipsec phase1-interface` both create tunnels of this type.",
   "Because the tunnel is a routable interface, the routing table decides which traffic enters it. That single fact unlocks most of what large networks need. You can add a backup route through a second tunnel with a higher administrative distance, so that traffic shifts automatically when the primary tunnel's route is withdrawn. You can run dynamic routing protocols such as Border Gateway Protocol (BGP) or Open Shortest Path First (OSPF) across the tunnel so that sites learn each other's subnets without manual routes. You can let SD-WAN choose between several tunnels based on performance measurements. All of this works because, from the FortiGate's point of view, the tunnel is just another path.",
   "In a policy-based VPN, the tunnel is not an interface. It is tied directly to a special firewall policy whose action is IPsec rather than accept or deny, and the policy names the phase 1 tunnel to use. Traffic is encrypted when it matches that policy, and the same policy usually handles traffic in both directions. On FortiOS, policy-based VPN is hidden by default and must be enabled under feature visibility before the IPsec action appears, which is itself a hint about how Fortinet views it. The CLI equivalent is `config vpn ipsec phase1` without the interface suffix.",
   "Policy-based mode is simpler to reason about for one tunnel, but it is far less flexible. You cannot route arbitrary traffic into the tunnel because there is no interface for a route to point at. Backup routing and dynamic routing are awkward or impossible. A policy-based tunnel cannot be an SD-WAN member and does not support ADVPN short-cuts. Every new subnet or design change means editing IPsec policies by hand, and the policy table becomes harder to read as tunnels multiply. Policy-based mode is largely legacy today, kept for simple setups and occasional interoperability cases with devices that expect it.",
   "The practical consequences are what the exam tests. Route-based VPNs support backup routes and route-based failover (two tunnels with different route distances, plus dead peer detection to withdraw a dead tunnel's route), dynamic routing, SD-WAN membership and ADVPN short-cuts, all because the tunnel is an interface that routes and policies can use. Policy-based VPNs tie the tunnel to a policy and do not scale. If a question describes failover between tunnels, SD-WAN over VPN or dynamic routing across a tunnel, the answer requires route-based mode.",
   "A troubleshooting point follows directly from the route-based design. An interface-mode tunnel can show as up while no traffic passes, because negotiation being complete is not enough. You also need a route that sends the remote subnet's traffic into the tunnel interface, and firewall policies that allow the traffic between the local LAN interface and the tunnel interface in both directions. A policy-based tunnel bundles the encryption decision into the policy, so this specific gap looks different there. When a route-based tunnel is up but silent, look at routes and policies first.",
   "One distinction prevents a common wrong answer: encryption strength is identical between the two modes. Both use the same phase 1 and phase 2 proposals, the same algorithms and the same Diffie-Hellman groups. Route-based is preferred for flexibility and scalability, not because it encrypts more strongly. Returning to the planning meeting, the honest answer is that the existing policy-based tunnels cannot join SD-WAN; they need to be rebuilt as route-based tunnels, along with routes and interface-based policies.",
   "For almost every FortiGate deployment, choose route-based. In a lab, build a route-based tunnel and notice that traffic does not flow until you add a static route via the tunnel interface and policies between the LAN and the tunnel. Then look at a policy-based example with feature visibility enabled and compare how the policy carries the whole configuration."
  ],
  "analogy": "A route-based tunnel is like a new highway with its own on-ramp and exit signs: any map (routing table) can send traffic onto it, and you can mark a second highway as a detour. A policy-based tunnel is like a private shuttle that only departs when a passenger shows a specific ticket (the matching policy); there is no ramp for maps to point to. The analogy stops at security: the shuttle and the highway are equally safe, because both modes use the same encryption.",
  "terms": [
   [
    "Route-based (interface-mode) VPN",
    "An IPsec VPN that creates a virtual tunnel interface usable by routes, firewall policies, SD-WAN and ADVPN."
   ],
   [
    "Policy-based VPN",
    "An IPsec VPN tied to a firewall policy with the IPsec action rather than to an interface; simpler for one tunnel but not scalable."
   ],
   [
    "Tunnel interface",
    "The virtual interface a route-based VPN produces, through which you route traffic and to which you apply policies."
   ],
   [
    "Feature visibility",
    "The FortiOS setting that shows or hides features in the GUI; policy-based IPsec must be enabled there before the IPsec policy action appears."
   ],
   [
    "Scalability and flexibility",
    "Route-based VPNs support backup routes, dynamic routing, SD-WAN and ADVPN; policy-based VPNs do not."
   ]
  ],
  "example": "An enterprise builds route-based tunnels so each tunnel is an interface it can add to an SD-WAN zone and give backup routes with different distances. When the primary ISP fails, dead peer detection takes the first tunnel down, its route disappears, and traffic moves to the second tunnel automatically, something the old policy-based tunnels could not do.",
  "mistakes": [
   [
    "Route-based VPNs are preferred because they use stronger encryption.",
    "Encryption strength is identical in both modes. Route-based is chosen for flexibility: routing, failover, SD-WAN and ADVPN."
   ],
   [
    "A policy-based tunnel can be added to an SD-WAN zone.",
    "SD-WAN members must be interfaces. Policy-based tunnels have no interface, so they must be rebuilt as route-based to join SD-WAN."
   ],
   [
    "Once a route-based tunnel shows up, traffic will pass.",
    "You also need a route via the tunnel interface for the remote subnet and firewall policies allowing traffic in both directions."
   ]
  ],
  "tryit": [
   [
    "Copperfield Schools wants each campus to learn the others' subnets automatically with BGP over the VPN, so new subnets do not require manual routes. The current tunnels are policy-based. What must change before BGP can run, and why?",
    "The tunnels must be rebuilt as route-based (interface-mode) tunnels. BGP needs an interface to form neighbor sessions over and to install routes pointing at; a policy-based tunnel has no interface, so dynamic routing across it is not practical."
   ]
  ],
  "tip": "Prefer route-based (interface-mode) VPNs: the tunnel interface lets routes, policies, SD-WAN and ADVPN use it. Encryption strength is the same as policy-based, so the reason is flexibility, not stronger crypto.",
  "check": [
   [
    "Why is a route-based IPsec VPN usually preferred?",
    "It creates a tunnel interface that routes (including backup and dynamic routes), firewall policies, SD-WAN and ADVPN can use, making it scalable and flexible."
   ],
   [
    "What is a policy-based VPN tied to instead of an interface?",
    "A firewall policy with the IPsec action that names the tunnel; traffic matching the policy is encrypted."
   ],
   [
    "Is encryption stronger in route-based than policy-based mode?",
    "No; encryption strength is the same. Route-based is chosen for flexibility, not stronger cryptography."
   ]
  ]
 },
 {
  "t": "Site-to-site with static peers and dial-up (dynamic) peers",
  "hook": "Silverline Coffee Roasters is opening a kiosk in a shopping mall, and the mall only offers a residential-style internet service whose public address changes every few days. The owner wants the kiosk's point-of-sale terminals connected to the head office over a VPN, just like the other cafes, which all have static addresses. Tomás, who manages the network part time, copies the existing tunnel configuration, types in today's kiosk address as the remote gateway at head office, and everything works. Four days later the kiosk goes dark at lunchtime. Nothing in the configuration changed, yet the tunnel will not come back. What did the design get wrong, and which side should have been in charge of starting the tunnel?",
  "simple": "To build a tunnel, one firewall has to call the other first, and to make a call you need the other side's number. If both sites have fixed public addresses (static), either one can call. If one site's address keeps changing, the other side cannot know where to call. So the side with the changing address must always place the call, and the side with the fixed address is set up to accept calls from anyone who can prove who they are. That accepting setup is called dial-up. It is like a shop with a fixed phone number: customers on prepaid mobiles call the shop, but the shop cannot call them back on a number it has never seen.",
  "body": [
   "Site-to-site Internet Protocol Security (IPsec) connects two networks over a tunnel, and the way you configure phase 1 depends on whether each peer has a fixed, known public IP address or a dynamic one. On a FortiGate this choice appears as the remote gateway type in phase 1: a static IP address, a dial-up user, or a dynamic DNS name. The static-versus-dial-up distinction is a reliable NSE 4 topic because it determines which side is able to start the tunnel, and getting it wrong produces tunnels that work for a while and then mysteriously stop.",
   "With static peers, both ends have known, fixed public IP addresses. Each side's phase 1 is configured with the other side's specific remote gateway IP, so each knows exactly where to send Internet Key Exchange (IKE) messages. Either peer can initiate the tunnel, and if the tunnel drops, whichever side has traffic first can bring it back up. This is the straightforward case for two data centers, or for head office and a branch that both have static addresses from their providers.",
   "Dial-up peers handle the common situation where one side's address is unknown or changes. Examples include a branch that receives a dynamic public IP from its internet service provider (ISP), a small site behind a carrier's NAT, or many remote sites and clients connecting to one hub. On the side that accepts these connections, typically head office or the hub, you configure phase 1 with the remote gateway type set to dial-up user. This phase 1 does not specify a remote gateway address, because the hub cannot know the callers' addresses in advance. Instead it accepts incoming IKE negotiations from any address, and only those peers that authenticate correctly, with the right pre-shared key or certificate, and any required peer ID, can build a tunnel.",
   "The side with the unknown address is configured as an ordinary static-type peer pointing at the hub's fixed public IP, and it initiates the tunnel. When the caller's address changes, nothing needs to be edited at the hub; the caller simply connects again from its new address and the hub accepts it. Each connecting peer gets its own dynamically created tunnel instance on the hub, derived from the single dial-up phase 1 template. On a dial-up phase 1, FortiOS can also add routes to the connected peer's subnets automatically, based on the negotiated phase 2 selectors, which reduces the static routing work at the hub.",
   "This leads to the rule the exam tests: the peer with the dynamic or unknown address must be the initiator, and the peer with the static address responds as the dial-up server. For a branch on a dynamic IP connecting to head office on a static IP, head office is configured with a dial-up peer and the branch points to head office's static IP and starts the tunnel. Two dial-up peers can never connect to each other, because neither knows the other's address and so neither can send the first message. Equally, a static-to-static configuration fails as soon as one side's address actually changes, which is exactly what happened at the coffee kiosk.",
   "A related option is dynamic DNS. If the site with the changing address registers a hostname with a dynamic DNS service, the other side can be configured with the dynamic DNS remote gateway type and resolve that name to find the current address. This lets both sides initiate, at the cost of depending on the dynamic DNS service updating promptly. For a single small site it is a reasonable alternative, but dial-up remains the standard way to scale.",
   "Dial-up is also how one hub serves many spokes or remote-access clients. A single dial-up phase 1 on the hub can accept tunnels from dozens or hundreds of peers, and features such as IKE mode-config can assign IP addresses and settings to the callers, which is how remote-access clients like FortiClient receive their addresses. When a hub has several dial-up phase 1 configurations, for example one for branches and one for remote users, it needs a way to decide which configuration applies to an incoming caller. Authentication and identifiers do this: a peer ID sent by the caller, or certificate details, steer the negotiation to the right phase 1 and authorize the caller.",
   "Security deserves a thought here too. Because a dial-up phase 1 accepts negotiations from any source address, its protection rests entirely on authentication. Strong pre-shared keys, or better, certificates, and peer IDs that narrow who can match each phase 1, are what keep unauthorized devices from building tunnels to the hub.",
   "In a lab you can simulate this by configuring the head office FortiGate as a dial-up server and a branch virtual machine pointing to head office's address as the initiator. Confirm that the tunnel comes up from the branch side even though head office has no remote gateway set, then change the branch's WAN address and watch the tunnel recover without touching the head office configuration."
  ],
  "analogy": "A dial-up hub is like a help line with a fixed public phone number. Callers can phone from any mobile, even one with a new number each week, and the agent checks their account details before helping. The help line cannot phone a caller first, because it never knew the number. Two people who only have unlisted, changing numbers can never reach each other. The analogy stops at dynamic DNS, which is more like a directory that always lists someone's latest number.",
  "terms": [
   [
    "Static peer",
    "An IPsec peer with a known fixed public IP; each side configures the other's specific gateway address and either can initiate."
   ],
   [
    "Dial-up (dynamic) peer",
    "A phase 1 with remote gateway type dial-up user that accepts incoming tunnels from callers whose addresses are unknown in advance."
   ],
   [
    "Initiator vs responder",
    "The peer with the unknown or dynamic address must initiate; the peer with the static address accepts (responds) as the dial-up server."
   ],
   [
    "Dynamic DNS remote gateway",
    "A phase 1 that resolves a hostname to find a peer whose address changes, letting both sides initiate as long as the name stays current."
   ],
   [
    "Peer ID / authentication",
    "Identifiers and credentials (pre-shared key or certificate) that let a dial-up server match callers to the right phase 1 and authorize them."
   ]
  ],
  "example": "A branch with a dynamic ISP address connects to HQ, which has a static IP. HQ is configured with a dial-up phase 1 and no fixed remote gateway, using a strong pre-shared key and a peer ID. The branch points to HQ's static IP and initiates the tunnel, and when its ISP assigns a new address the branch simply reconnects with no change at HQ.",
  "mistakes": [
   [
    "Configure the branch's current dynamic IP as a static remote gateway at HQ; it will work.",
    "It works only until the address changes. The side with the changing address must initiate to a dial-up phase 1 at HQ, or use dynamic DNS."
   ],
   [
    "Making both sides dial-up gives the most flexibility.",
    "Two dial-up peers can never connect because neither knows the other's address to send the first message."
   ],
   [
    "A dial-up phase 1 is less secure because it ignores who is connecting.",
    "It accepts negotiations from any address, but only peers that authenticate with the correct key or certificate, and matching peer ID if required, can build a tunnel."
   ],
   [
    "The hub with the static address should initiate because it is the more important site.",
    "Importance does not matter; the side that knows the other's address can initiate. The dynamic-address side must start the tunnel."
   ]
  ],
  "tryit": [
   [
    "Maple Health has a hub with a static IP and twenty clinics that all get dynamic addresses from various ISPs. The admin plans to create twenty separate static phase 1 entries at the hub, one per clinic. What would you recommend instead?",
    "Create one dial-up phase 1 on the hub that accepts all clinic tunnels, authenticated with a strong key or certificates and peer IDs. Each clinic points to the hub's static IP and initiates. Static entries would break whenever a clinic's address changed, and one dial-up template scales far better."
   ]
  ],
  "tip": "The side with the unknown or dynamic address must initiate; the static side accepts it as a dial-up peer. Two dial-up peers can never connect because neither has an address to dial.",
  "check": [
   [
    "How should phase 1 be set up when a branch has a dynamic IP and HQ has a static IP?",
    "HQ is configured as a dial-up (dynamic) peer that accepts incoming tunnels; the branch points to HQ's static IP and initiates the tunnel."
   ],
   [
    "Why can't two dial-up peers form a tunnel?",
    "Neither knows the other's address to initiate, so no side can start the negotiation."
   ],
   [
    "What is one advantage of a dial-up server configuration?",
    "A single dial-up phase 1 on a hub can accept many incoming tunnels from spokes or remote clients whose addresses are not known in advance."
   ],
   [
    "What protects a dial-up phase 1 that accepts negotiations from any address?",
    "Authentication: the correct pre-shared key or certificate, plus peer IDs where used, decides who can build a tunnel."
   ]
  ]
 },
 {
  "t": "Routes and firewall policies needed for tunnel traffic",
  "hook": "Friday, 4:15 p.m. at Elmwood Legal. You have just finished building a new route-based tunnel to the firm's second office, and the VPN monitor shows both phases up with a reassuring green arrow. You ask Dana at the other office to open the shared document server. She cannot. You try to ping her printer. Nothing. The tunnel is up, the keys are right, the proposals match, and yet not a single packet seems to reach the other side. Dana's partner meeting starts at five and the documents are on your server. What does a FortiGate still need after the tunnel comes up before traffic will actually use it?",
  "simple": "Bringing a VPN tunnel up is like building a bridge. The bridge exists, but cars will not use it until two things happen: road signs must point drivers onto the bridge, and the guards at each end must agree to let cars through. On a FortiGate, the road sign is a route that says \"traffic for the other office's network goes into the tunnel\". The guards are firewall policies, one allowing traffic out of your network into the tunnel and one allowing traffic from the tunnel into your network. Without the sign, traffic heads to the internet instead. Without the policies, the firewall blocks it. The other office needs its own matching sign and guards.",
  "body": [
   "A common surprise with route-based Internet Protocol Security (IPsec) is that the tunnel can show up while no traffic passes between the sites. Bringing the tunnel up is only half the job. You must also tell the FortiGate to route the remote subnets into the tunnel and permit that traffic with firewall policies. The NSE 4 exam tests this heavily because it separates people who clicked through a wizard from people who understand the data path. The VPN wizard in the GUI creates these objects for you, which is why manually built tunnels so often miss them.",
   "Start with routing. A route-based tunnel creates a virtual tunnel interface, but the routing table has no idea which destinations belong on the far side of that interface until you add routes. For each remote subnet reachable over the tunnel, add a static route whose destination is that subnet and whose device, or outgoing interface, is the tunnel interface. A route-based tunnel normally needs no next-hop gateway address on that route, because the tunnel is a point-to-point path to the peer. Without this route, traffic to the remote LAN follows the default route out to the Internet instead of entering the tunnel, so nothing works even though the tunnel is up. You can confirm the route is active with `get router info routing-table all`, where it appears as a static route pointing at the tunnel interface.",
   "A good companion is a blackhole route. If the tunnel goes down, its route is removed and traffic for the remote subnet would fall back to the default route and leak out to the Internet unencrypted toward private addresses. Fortinet's recommended practice is to add a blackhole route for the remote subnet with a higher administrative distance than the tunnel route. While the tunnel is up, the tunnel route wins; when it goes down, the blackhole route takes over and silently drops the traffic instead of sending it the wrong way. This also helps tunnels re-establish cleanly, because sessions are not stuck on the Internet path.",
   "Next come firewall policies, which must allow the traffic in both directions. Create one policy from the local LAN interface to the tunnel interface for traffic heading to the remote site, and another from the tunnel interface to the local LAN interface for traffic arriving from the remote site. Both use address objects for the local and remote subnets and the services you want to allow. The FortiGate is stateful, so reply packets for a session are permitted by the policy that created that session. The second policy is therefore not needed for replies; it is needed so that hosts at the remote site can start their own connections. Missing it is a frequent cause of connectivity that works only one way: your users can reach the remote office, but nobody there can reach you.",
   "There is one important difference from Internet policies. For tunnel traffic you normally do not enable source NAT. The two LANs should see each other's real private addresses, which keeps logs meaningful and lets the phase 2 selectors and remote routes match. Leaving NAT enabled on a LAN-to-tunnel policy, often because it was copied from an Internet policy, can make traffic arrive at the far side from an unexpected address that the remote policies or selectors do not allow.",
   "Putting it together, the minimum for working route-based tunnel traffic is a negotiated tunnel (phase 1 and phase 2 up), a route for each remote subnet pointing at the tunnel interface, and firewall policies in both directions between the local LAN and the tunnel interface, without source NAT. If any piece is missing, the tunnel may be up while traffic fails. When troubleshooting a tunnel that is up with no traffic, check the route to the remote subnet and both policies first. The packet counters in `diagnose vpn tunnel list` help here: if the encrypt counter stays at zero, traffic is not entering the tunnel, which points to routing or the outbound policy.",
   "The remote FortiGate needs the mirror image. It requires a route for your local subnet via its own tunnel interface, plus policies in both directions between its LAN and its tunnel interface. Both ends must agree, and the phase 2 selectors on each side should encompass the subnets that your routes and policies use. If the selectors only cover part of a subnet, traffic for the rest will not match the IPsec SA even if routes and policies are perfect.",
   "In the Elmwood scenario, the fix is to add a static route for the second office's subnet via the tunnel interface, a blackhole route for the same subnet with a higher distance, and two policies without NAT, then confirm that the second office has done the same for your subnet. Within minutes Dana can open the document server.",
   "In a lab, bring up a route-based tunnel and deliberately omit the route. Observe traffic failing while the tunnel shows up, then add the route and only the outbound policy, and notice that one direction works. Finally add the inbound policy and watch connectivity succeed both ways."
  ],
  "analogy": "A new tunnel is like a new bridge between two towns. The route is the road sign telling drivers that the other town is across the bridge; without it they follow the main highway elsewhere. The two firewall policies are the gate guards at each end, one letting your residents cross out, one letting visitors in. The analogy has a limit: replies are like return trips already approved at the first gate, which is why the second policy is only for visitors who start the trip.",
  "terms": [
   [
    "Route via tunnel interface",
    "A static route whose destination is the remote subnet and whose device is the IPsec tunnel interface, directing traffic into the tunnel."
   ],
   [
    "Blackhole route",
    "A higher-distance route for the remote subnet that drops traffic when the tunnel route disappears, preventing leaks to the Internet."
   ],
   [
    "Bidirectional policies",
    "Firewall policies from LAN to tunnel and from tunnel to LAN, so that either site can start connections (replies are allowed statefully)."
   ],
   [
    "No SNAT for tunnel traffic",
    "Tunnel policies normally do not apply source NAT so both LANs see each other's real addresses."
   ],
   [
    "Up but no traffic",
    "The symptom when a tunnel negotiates successfully but the route or policies are missing, so no data crosses it."
   ]
  ],
  "example": "A new route-based tunnel shows as up but the two LANs cannot reach each other. The admin adds a static route for 10.20.0.0/16 via the tunnel interface, a blackhole route for the same subnet with a higher distance, and policies from LAN to tunnel and tunnel to LAN with NAT disabled. After the remote admin adds the mirror configuration, traffic flows in both directions.",
  "mistakes": [
   [
    "A tunnel showing up in the VPN monitor means traffic will pass.",
    "Up only means negotiation succeeded. You still need a route via the tunnel interface and firewall policies before traffic uses it."
   ],
   [
    "One policy from LAN to tunnel is enough because the firewall is stateful.",
    "Statefulness covers replies only. Without a tunnel-to-LAN policy, remote hosts cannot start connections and access works one way."
   ],
   [
    "Copy the Internet policy for the tunnel, NAT included.",
    "Tunnel policies normally have source NAT disabled so each LAN sees real addresses that match routes, policies and selectors."
   ],
   [
    "The tunnel route needs the ISP gateway as its next hop.",
    "A route-based tunnel route uses the tunnel interface as the device and normally needs no gateway address."
   ]
  ],
  "tryit": [
   [
    "At Willow Bay Hospital, users at HQ can reach the radiology server at the clinic over a new tunnel, but clinic staff cannot open the HQ scheduling system. The tunnel is up and the HQ routes look correct. What is the most likely missing piece, and where?",
    "A policy allowing traffic from the tunnel interface to the LAN on HQ (or from the LAN to the tunnel on the clinic side). HQ-initiated sessions work because replies are allowed statefully, but clinic-initiated sessions need their own policy on each FortiGate in that direction."
   ]
  ],
  "tip": "A tunnel showing up is not enough. You still need a route for the remote subnet via the tunnel interface and policies in both directions, and tunnel policies usually should not apply SNAT. Add a higher-distance blackhole route so traffic never leaks out when the tunnel drops.",
  "check": [
   [
    "A route-based tunnel is up but no traffic passes. What is most likely missing?",
    "A route directing the remote subnet into the tunnel interface, and/or firewall policies allowing the traffic in both directions."
   ],
   [
    "Why do you need policies in both directions for tunnel traffic?",
    "Each policy only allows sessions started on its ingress side (replies are handled statefully), so without the tunnel-to-LAN policy the remote site cannot start connections and access works only one way."
   ],
   [
    "Should tunnel traffic policies apply source NAT?",
    "Normally no; the two LANs should see each other's real addresses, unlike Internet-bound policies."
   ],
   [
    "What is the purpose of a blackhole route for the remote subnet?",
    "With a higher distance than the tunnel route, it drops traffic when the tunnel is down instead of letting it leak out the default route."
   ]
  ]
 },
 {
  "t": "Redundant VPNs: two tunnels, route distance/priority, DPD, tunnel monitoring",
  "hook": "At 2:10 a.m. your phone buzzes: the overnight order-picking system at Redwood Supply's warehouse has lost contact with the data center. You remember, with some relief, that the warehouse has two ISPs and two VPN tunnels, built precisely for this. You log in expecting to see traffic on the backup tunnel. Instead, the primary tunnel still shows as up, its route is still in the routing table, and every packet for the data center is disappearing into it. The backup tunnel sits idle, healthy and unused. The primary ISP's fiber was cut twenty minutes ago. Two tunnels, two routes, and still an outage. What piece of the redundancy design is missing?",
  "simple": "A redundant VPN means building two tunnels over two different internet connections so the office stays connected if one fails. Two things make this work. First, you mark one tunnel as the main one and the other as the spare by giving their routes different preference numbers. Second, the firewall must notice when the main tunnel has really died. That job belongs to dead peer detection, which keeps asking the other side \"are you still there?\" and takes the tunnel down when there is no answer. Only then does the spare take over. It is like a backup generator that needs a sensor to notice the power is out; without the sensor, it never starts.",
  "body": [
   "Branches that depend on a VPN need it to survive the failure of a single link or tunnel. A FortiGate builds VPN redundancy by running two or more tunnels and combining routing with liveness detection so that it fails over between them automatically. The NSE 4 exam focuses on the mechanics: how route distance or priority sets the preferred tunnel, and how dead peer detection provides the trigger to change it.",
   "The design starts with one tunnel per path. For example, a branch with two internet service providers (ISPs) builds one route-based tunnel over each ISP to the data center, each with its own tunnel interface. Route-based mode is essential, because failover works through the routing table and a policy-based tunnel has no interface for routes to point at. Ideally the two tunnels also terminate on different public addresses at the far end, or on two different hubs, so that a single failure anywhere does not take down both.",
   "Next, add a route to the remote subnet through each tunnel, with different administrative distances. A lower distance on the primary tunnel's route means only that route is active in the routing table while both tunnels are healthy. The backup tunnel's route, with a higher distance, waits in the routing database and becomes active only if the primary route is withdrawn. Alternatively, you can give both routes the same distance but different priorities. With equal distance, both routes stay in the routing table, and the one with the lower priority value is preferred for new traffic. The priority approach can be useful when other features, such as reply traffic handling or policy routing, need both routes present.",
   "Routing alone does not detect failure, which is the gap in the warehouse story. For failover to happen, the FortiGate must notice that the primary tunnel is dead and remove its route. That is the job of dead peer detection (DPD). DPD sends periodic liveness messages to the peer, and if the peer stops answering after a set number of retries, the FortiGate declares the peer dead and brings the tunnel down. When the tunnel goes down, its route is withdrawn and the backup tunnel's route takes over. Without DPD, an IPsec tunnel can keep appearing up after the path has failed, because its security associations have not expired. Its route stays in the table, traffic keeps being sent into a tunnel that is not passing data, and failover never triggers. This condition is often called a black hole.",
   "FortiOS offers DPD in a few modes. On-idle, the usual default, sends probes when the tunnel has been idle, which keeps overhead low. On-demand sends probes when traffic is being sent but no replies are coming back. DPD can also be disabled, which is exactly what breaks redundant designs. The retry count and interval control how quickly a dead peer is detected; shorter values mean faster failover but more sensitivity to brief packet loss.",
   "Tunnel monitoring offers additional ways to detect a broken path. A link monitor can send probes through a tunnel to a server at the far end and remove routes when the probes fail, which catches problems DPD might not, such as the peer answering while the network behind it is unreachable. FortiOS also allows one phase 1 to monitor another, so that the backup tunnel is brought up only when the primary is down. In SD-WAN designs, performance SLAs over tunnel members serve the same purpose with richer quality measurements.",
   "Firewall policies complete the picture. Traffic must be allowed over both tunnel interfaces, so the backup works the moment it activates. A convenient approach is to put both tunnel interfaces into a zone, or into SD-WAN, and write policies once for that group. A blackhole route for the remote subnet with an even higher distance than both tunnel routes is also good practice, so traffic is dropped rather than leaked to the Internet if both tunnels fail.",
   "So the recipe for redundant branch VPNs is two route-based tunnels over different paths, routes with different distances or priorities making one primary and one backup, DPD enabled so a dead tunnel is detected and its route removed, and policies allowing traffic over both tunnels. Enabling DPD is the piece people forget, which is why two tunnels with DPD disabled is a classic wrong answer. The exam-level point is the interplay: routing decides preference, and DPD or monitoring provides the trigger to change it. This same pattern underlies dual-hub and dual-ISP designs and complements SD-WAN, which can steer across multiple tunnel members by SLA.",
   "In a lab with two tunnels, disable the primary path, for example by shutting the primary WAN port on an upstream device. With DPD enabled, watch the primary tunnel go down in the VPN monitor, its route disappear from `get router info routing-table all`, and traffic move to the backup. Then repeat with DPD disabled and see the tunnel linger while traffic is lost."
  ],
  "analogy": "Redundant tunnels are like a hospital with mains power and a backup generator. The wiring that prefers mains over the generator is the route distance. The sensor that detects mains power has failed and switches over is DPD. Without the sensor, the generator sits ready but the building stays dark, because the system still believes mains power is fine. The analogy stops at speed: DPD needs a few missed replies before deciding, so failover takes some seconds rather than being instant.",
  "terms": [
   [
    "Redundant tunnels",
    "Two or more route-based tunnels over different paths so the VPN survives a single link or tunnel failure."
   ],
   [
    "Route distance/priority for failover",
    "A lower distance makes one tunnel route active and the other standby; equal distance with different priorities keeps both in the table with one preferred."
   ],
   [
    "Dead peer detection (DPD)",
    "Periodic liveness messages that detect an unresponsive peer, bring the tunnel down and let its route be withdrawn."
   ],
   [
    "Tunnel monitoring",
    "Link monitoring through a tunnel, or one phase 1 monitoring another, that detects a broken path and drives route or tunnel changes for failover."
   ],
   [
    "Black hole",
    "A failed tunnel that still appears up, so its route stays active and traffic sent into it is lost."
   ]
  ],
  "example": "A branch builds two route-based tunnels to HQ, one per ISP, gives the primary tunnel's static route a distance of 10 and the backup's a distance of 20, adds both tunnels to a zone used in its policies, and enables DPD. When the primary ISP fails, DPD stops getting replies, brings that tunnel down, its route is removed, and traffic shifts to the backup tunnel within seconds.",
  "mistakes": [
   [
    "Two tunnels with routes of different distances are enough for automatic failover.",
    "Without DPD or tunnel monitoring, a dead tunnel can stay up, its route stays active and traffic black-holes. Detection is required to withdraw the route."
   ],
   [
    "Giving both routes the same distance and same priority creates a clean primary and backup.",
    "Equal distance and priority makes the routes equal-cost, sharing traffic. Use different distances, or equal distance with different priorities, to set a preferred tunnel."
   ],
   [
    "Only the primary tunnel needs firewall policies; the backup inherits them.",
    "Policies are per interface. Allow traffic on both tunnel interfaces, for example by grouping them in a zone, or the backup will drop traffic when it activates."
   ],
   [
    "Policy-based tunnels can provide the same route-based failover.",
    "Route-based failover needs tunnel interfaces for routes to point at, so redundant designs use route-based tunnels."
   ]
  ],
  "tryit": [
   [
    "Juniper Ridge Credit Union's branch has primary and backup tunnels with routes at distances 10 and 20. During an ISP outage, the backup route never activates, and the primary tunnel still shows up in the VPN monitor. Phase 1 settings show DPD disabled. What should the admin change, and what will happen after?",
    "Enable DPD on the tunnels (for example on-idle with suitable retry settings). When the primary path fails, DPD stops receiving replies, declares the peer dead and brings the tunnel down, its distance 10 route is withdrawn, and the distance 20 route via the backup tunnel becomes active."
   ]
  ],
  "tip": "Redundant VPN failover needs both parts: different route distances or priorities to set primary versus backup, and DPD (or tunnel monitoring) to detect a dead tunnel so its route is withdrawn. DPD off breaks failover.",
  "check": [
   [
    "How do you make branch VPNs fail over between two ISPs?",
    "Build one route-based tunnel per ISP, give the primary a lower route distance (or priority), enable DPD so a dead tunnel is detected, and allow traffic on both tunnels in policies."
   ],
   [
    "What does dead peer detection do?",
    "It sends liveness messages and, when the peer stops responding, brings the tunnel down so its route can be withdrawn and a backup takes over."
   ],
   [
    "Why is 'two tunnels with DPD off' a poor design?",
    "Without DPD a dead tunnel can appear up, its route stays active, traffic black-holes into it, and failover never triggers."
   ],
   [
    "What is the difference between using distance and using priority for tunnel routes?",
    "Different distances keep only the lower-distance route in the routing table; equal distances with different priorities keep both routes in the table and prefer the lower priority."
   ]
  ]
 },
 {
  "t": "Topologies: hub and spoke, full mesh, partial mesh, ADVPN short-cuts",
  "hook": "Bluewater Insurance has grown from three offices to twelve in two years, and the network team still links them the way they did at the start: every branch has a tunnel to headquarters, and that is all. Now the branches have started using desk-to-desk video calls, and the call quality between the two coastal offices is poor because every packet travels to headquarters and back. One engineer proposes building a direct tunnel between every pair of offices. Another engineer pulls out a calculator and goes quiet. Twelve offices, every pair connected: how many tunnels is that, and is there a way to get direct paths between branches without building and maintaining all of them by hand?",
  "simple": "When many offices need to connect over VPN, you have to decide who builds a tunnel to whom. In hub and spoke, every office connects only to headquarters, which is simple but means branch-to-branch traffic travels through headquarters. In full mesh, every office connects directly to every other office, which is fast but needs a huge number of tunnels. Partial mesh adds direct tunnels only where they are really needed. ADVPN is a clever mix: you only build the branch-to-headquarters tunnels, and when two branches start talking, they automatically create a temporary direct tunnel. It is like an airline network with one main hub that can add a direct flight when enough passengers want one.",
  "body": [
   "As the number of VPN sites grows, the topology you choose decides how many tunnels you must build and maintain and how efficiently spoke-to-spoke traffic flows. The four designs to know are hub and spoke, full mesh, partial mesh, and Auto-Discovery VPN (ADVPN). The NSE 4 exam expects you to compare them, to calculate tunnel counts, and to know exactly what ADVPN adds to a hub-and-spoke design.",
   "In a hub-and-spoke topology, every spoke builds one tunnel to a central hub, and there are no direct spoke-to-spoke tunnels. For n sites, counting the hub as one of them, this needs only n minus 1 tunnels, which is easy to build and manage. Adding a new branch means adding one tunnel, and the hub is often configured with a single dial-up phase 1 that accepts all spokes. The drawback is that traffic between two spokes must traverse the hub, going spoke to hub to spoke. That adds latency, doubles the load on the hub's bandwidth, and makes the hub a critical point that everything depends on. For occasional branch-to-branch traffic this is acceptable; for real-time flows such as voice and video between branches, it often is not.",
   "In a full mesh, every site has a direct tunnel to every other site. This gives the shortest path between any two sites with no hub in the middle and no single site that every flow depends on. The cost is scale. A full mesh needs n times (n minus 1) divided by 2 tunnels. Five sites need 10 tunnels; twelve sites, as in the Bluewater story, need 66, and each tunnel must be configured on both ends with its own routes and policies. The count grows roughly with the square of the number of sites, so a large full mesh is hard to build and maintain by hand.",
   "A partial mesh is the middle ground. You add direct tunnels only between the site pairs that need them, such as the busiest branches or two offices that share an application, while other sites still communicate through the hub. This balances efficiency against tunnel count, but someone has to decide which pairs deserve direct tunnels and revisit that decision as traffic patterns change.",
   "ADVPN gives the best of both approaches. It starts as a hub-and-spoke design, so you only configure and maintain the spoke-to-hub tunnels, but it lets spokes build direct short-cut tunnels to each other on demand when they have traffic to exchange. The first packets between two spokes go through the hub as usual. The hub notices that it is forwarding traffic from one spoke tunnel to another and sends a short-cut offer to the originating spoke over the existing Internet Key Exchange (IKE) channel. The spokes then negotiate a dynamic direct tunnel with each other, routes update so traffic prefers the short-cut, and subsequent packets bypass the hub. When the traffic stops and the short-cut sits idle, it is torn down. The result is full-mesh-like direct paths without manually building n times (n minus 1) divided by 2 tunnels.",
   "On a FortiGate, ADVPN is enabled in phase 1. The hub's phase 1 has auto-discovery sending enabled, which lets it send short-cut messages, and the spokes' phase 1 configurations have auto-discovery receiving enabled. The hub typically uses a dial-up phase 1 so new spokes can join without hub changes. Because short-cuts are created dynamically, ADVPN relies on route-based tunnels and a dynamic routing protocol so spokes learn how to reach each other's subnets. Border Gateway Protocol (BGP) is the most common choice, often internal BGP with the hub acting as a route reflector, so that each spoke learns the other spokes' routes with the right next hop. Short-cuts can also become SD-WAN members, letting performance measurements steer traffic across them.",
   "The trade-offs are worth stating plainly. Hub and spoke is simple and scales easily, but spoke-to-spoke traffic is indirect. Full mesh is direct and has no central dependency, but the tunnel count explodes. Partial mesh is a manual compromise. ADVPN keeps the configuration effort of hub and spoke while giving direct paths where traffic actually flows, at the cost of a more involved routing design and the requirement that spokes can reach each other's public addresses.",
   "Choosing comes down to traffic patterns and scale: hub and spoke for simplicity when inter-spoke traffic is light; full or partial mesh when direct paths matter and the number of sites is small; ADVPN when you need direct spoke-to-spoke paths across many sites without the burden of maintaining a mesh. In a lab, sketch hub-and-spoke, full-mesh and ADVPN designs for five sites and count the tunnels each needs: 4, 10, and 4 configured tunnels plus dynamic short-cuts. Then list the routes and dead peer detection settings each design needs for failover."
  ],
  "analogy": "Think of an airline. Hub and spoke is flying every passenger through one big airport, simple to run but every trip has a layover. Full mesh is a direct flight between every pair of cities, convenient but enormously expensive to schedule. Partial mesh adds direct flights only on busy routes. ADVPN is an airline that notices passengers going between two cities and adds a direct flight automatically, then cancels it when demand ends. Unlike real flights, the first few packets still take the layover.",
  "terms": [
   [
    "Hub and spoke",
    "Each spoke tunnels only to a central hub (n minus 1 tunnels); spoke-to-spoke traffic passes through the hub."
   ],
   [
    "Full mesh",
    "Every site has a direct tunnel to every other (n times (n minus 1) divided by 2 tunnels); shortest paths but many tunnels."
   ],
   [
    "Partial mesh",
    "Direct tunnels only between selected site pairs, with the rest via the hub, balancing efficiency and tunnel count."
   ],
   [
    "ADVPN (Auto-Discovery VPN)",
    "A hub-and-spoke design where the hub triggers spokes to build direct short-cut tunnels on demand, giving mesh-like paths without manual full-mesh tunnels."
   ],
   [
    "Short-cut tunnel",
    "A dynamic spoke-to-spoke tunnel created by ADVPN when traffic flows between spokes and removed when idle."
   ]
  ],
  "example": "Five branches need efficient direct voice paths but the team will not maintain a 10-tunnel full mesh, so they deploy ADVPN. Only the four spoke-to-hub tunnels are configured, with auto-discovery enabled and BGP across the overlay. When two branches start a call, the first packets cross the hub, then a short-cut tunnel forms and the call continues directly.",
  "mistakes": [
   [
    "ADVPN means every spoke has a permanently configured tunnel to every other spoke.",
    "Only spoke-to-hub tunnels are configured. Spoke-to-spoke short-cuts are created dynamically on demand and removed when idle."
   ],
   [
    "A full mesh of n sites needs n times (n minus 1) tunnels.",
    "Each tunnel connects two sites, so the count is n times (n minus 1) divided by 2; five sites need 10, not 20."
   ],
   [
    "In ADVPN, the very first spoke-to-spoke packets already use a direct tunnel.",
    "The first packets go through the hub, which then triggers the short-cut; later traffic uses the direct path."
   ],
   [
    "ADVPN can be built with policy-based tunnels.",
    "ADVPN relies on route-based tunnels and dynamic routing so short-cuts and their routes can be created on the fly."
   ]
  ],
  "tryit": [
   [
    "Granite Peak Schools has eight campuses connected hub and spoke to the district office. Teachers at two campuses now co-teach classes over video and complain of lag, while the other campuses rarely talk to each other. The team has limited time to maintain tunnels. What topology change fits best?",
    "ADVPN on the existing hub-and-spoke design, or at minimum a partial mesh with one direct tunnel between the two campuses. ADVPN scales better because any pair of campuses gets a direct short-cut when needed without extra manual tunnels; a full mesh (28 tunnels) would be excessive."
   ]
  ],
  "tip": "Hub-and-spoke needs n minus 1 tunnels; full mesh needs n(n-1)/2. ADVPN keeps hub-and-spoke's low configuration while giving on-demand direct spoke-to-spoke paths, so it scales without the mesh maintenance.",
  "check": [
   [
    "How many tunnels does a full mesh of five sites need, and a hub-and-spoke of five sites?",
    "Full mesh needs n(n-1)/2 = 10; hub-and-spoke needs n minus 1 = 4."
   ],
   [
    "What problem does ADVPN solve compared with plain hub-and-spoke?",
    "It avoids sending all spoke-to-spoke traffic through the hub by building direct short-cut tunnels between spokes on demand."
   ],
   [
    "What does ADVPN keep from the hub-and-spoke model?",
    "You only configure and maintain the spoke-to-hub tunnels; the direct spoke-to-spoke tunnels are created dynamically."
   ],
   [
    "Which routing approach commonly supports ADVPN?",
    "A dynamic routing protocol over route-based tunnels, most often BGP with the hub acting as a route reflector."
   ]
  ]
 },
 {
  "t": "Troubleshooting: `diagnose vpn ike gateway list`, `diagnose vpn tunnel list`, `diagnose debug application ike -1`",
  "hook": "The ticket from Hollow Creek Manufacturing's new plant is short: \"VPN to HQ not working.\" No screenshots, no detail. You SSH into the plant's FortiGate and stare at the prompt. The problem could be a wrong pre-shared key, a proposal mismatch, a NAT device blocking UDP 4500, mismatched subnets in phase 2, a missing route or a missing policy. Clicking through the GUI could take an hour, and the plant manager wants an answer before the shift change. You know three commands that, used in the right order, can narrow this down in minutes. Which do you run first, and what does each one tell you that the others cannot?",
  "simple": "When a VPN tunnel will not work, three commands help you find out why. The first, `diagnose vpn ike gateway list`, answers \"did step one succeed, did the two firewalls recognize and trust each other?\" The second, `diagnose vpn tunnel list`, answers \"did step two succeed, and is data actually going through?\" by showing counters of packets sent and received. The third, `diagnose debug application ike -1`, is a live play-by-play of the two firewalls negotiating, which shows the exact reason they disagree. It is like fixing a car that will not move: check whether the engine starts, then whether the wheels turn, and if needed, listen to the engine while someone turns the key.",
  "body": [
   "When an Internet Protocol Security (IPsec) tunnel will not come up or passes no traffic, three command-line interface (CLI) tools cover almost every case. One shows phase 1 status, one shows phase 2 and tunnel status, and one shows the live negotiation as it happens. Knowing which to use for which symptom, and in what order, is the practical VPN troubleshooting skill the NSE 4 exam rewards.",
   "The command `diagnose vpn ike gateway list` shows the phase 1 gateways, that is, the Internet Key Exchange (IKE) security associations. For each configured gateway it shows the name, the local and remote addresses and ports, whether the IKE SA is established, the negotiated IKE version, the chosen proposal and Diffie-Hellman (DH) group, how long the SA has been up, and whether NAT traversal (NAT-T) is in use. This is your first check for whether phase 1 is up. If a gateway is missing or not established, the problem is in phase 1: mismatched IKE version, wrong pre-shared key or certificate, no matching proposal or DH group, or the peers cannot reach each other on UDP 500 and 4500. If the port shown is 4500, you also know a NAT device was detected in the path.",
   "The command `diagnose vpn tunnel list` shows the phase 2 side, the IPsec SAs and their tunnels. For each tunnel it lists the selectors in use (the local and remote subnets), the negotiated phase 2 proposal, whether SAs are installed in each direction, their remaining lifetimes, and counters for encrypted and decrypted packets and bytes. This is where you confirm phase 2 succeeded and whether data is actually crossing. If phase 1 is up but this command shows no phase 2 SA for the tunnel, the problem is in phase 2 negotiation, typically selectors, proposals or perfect forward secrecy (PFS) settings. If the SAs exist but counters do not increase, look at the routes and policies that feed the tunnel. The counters are especially telling: an encrypt counter stuck at zero means local traffic is not entering the tunnel, while encrypt rising with decrypt stuck at zero means traffic leaves but nothing comes back, which points to the remote side.",
   "The command `diagnose debug application ike -1` turns on verbose, real-time logging of IKE negotiation. The value `-1` sets maximum verbosity. It prints each message exchanged and, crucially, the reason a negotiation fails, for example that no proposal was chosen, that authentication failed, or that the peer's traffic selectors did not match the local policy. Because it shows the exchange as it happens, it is the definitive tool for seeing why a tunnel will not negotiate. As with every FortiGate debug, nothing appears until you also run `diagnose debug enable`, and you should stop it afterward with `diagnose debug disable`, optionally followed by `diagnose debug reset` to clear debug settings.",
   "On a busy FortiGate with many tunnels, unfiltered IKE debug output scrolls past too quickly to read. Before enabling it, apply an IKE log filter for the remote peer's address, using the `diagnose vpn ike log filter` command with the remote address option, so that only the relevant negotiation appears. Then reproduce the problem, for example by bringing the tunnel down and up from the VPN monitor or by sending traffic that triggers negotiation, and read the error near the point where the exchange stops. Debug output is detailed and consumes some resources, which is another reason to filter it and turn it off when you are done.",
   "These three tools fit into a clean workflow. Start with `diagnose vpn ike gateway list`. If phase 1 is down, run the filtered IKE debug and read the phase 1 error, then fix the key, version, proposal, DH group or reachability. If phase 1 is up, move to `diagnose vpn tunnel list`. A missing phase 2 SA sends you back to the IKE debug, this time looking for a selector, proposal or PFS mismatch. An established phase 2 with counters that do not move sends you away from IPsec altogether, toward routes and firewall policies. This measurement-to-cause path resolves the vast majority of tunnel problems.",
   "A few related commands are worth recognizing. `get vpn ipsec tunnel summary` gives a short one-line-per-tunnel overview with selectors up and traffic counts. `diagnose vpn ike gateway clear` resets IKE SAs, which forces renegotiation after you correct a setting. The VPN monitor in the GUI shows similar status at a glance and lets you bring individual tunnels up or down. The packet sniffer, `diagnose sniffer packet`, can confirm whether IKE or ESP packets are arriving at all, which helps when the IKE debug shows messages sent but never answered.",
   "In the Hollow Creek case, the gateway list shows the phase 1 to HQ established on port 4500, so the key, version and NAT-T are fine. The tunnel list shows no phase 2 SA. The filtered IKE debug, run while bringing the tunnel up, reports that the proposed traffic selectors do not match: the plant offers 10.50.0.0/24 while HQ expects 10.50.0.0/16. Aligning the selectors brings phase 2 up and the counters start climbing.",
   "In a lab, deliberately mismatch a phase 2 selector, run `diagnose debug application ike -1` with debug enabled and a peer filter set, bring the tunnel up, and locate the exact error message in the output. Then repeat with a wrong pre-shared key and compare how the phase 1 failure looks."
  ],
  "analogy": "Troubleshooting a tunnel is like diagnosing a car that will not drive. The gateway list is turning the key to see whether the engine starts (phase 1). The tunnel list is checking whether the wheels turn and the odometer moves (phase 2 and packet counters). The IKE debug is a mechanic listening to the engine while someone turns the key, hearing exactly where it stalls. The analogy stops at the last step: if the engine and wheels are fine, the problem is the map and road, meaning routes and policies.",
  "terms": [
   [
    "diagnose vpn ike gateway list",
    "Shows phase 1 (IKE) gateways: state, local and remote addresses and ports, negotiated version, proposal and DH group, and NAT-T status."
   ],
   [
    "diagnose vpn tunnel list",
    "Shows phase 2 (IPsec) SAs, selectors, proposals, lifetimes and encrypted and decrypted packet counters."
   ],
   [
    "diagnose debug application ike -1",
    "Verbose real-time logging of IKE negotiation that reveals the exact reason a tunnel fails to establish."
   ],
   [
    "IKE log filter",
    "A filter, such as the remote peer address, applied before debugging so only the relevant negotiation is shown."
   ],
   [
    "Debug enable/disable",
    "`diagnose debug enable` is required for debug output to print; `diagnose debug disable` turns it off afterward."
   ]
  ],
  "example": "A tunnel's phase 1 shows established in `diagnose vpn ike gateway list`, but `diagnose vpn tunnel list` shows no phase 2 SA. The admin sets an IKE log filter for the peer, runs `diagnose debug application ike -1` and `diagnose debug enable`, brings the tunnel up, and finds a phase 2 selector mismatch in the output. After the selectors are aligned, the tunnel list shows SAs installed and rising encrypt and decrypt counters.",
  "mistakes": [
   [
    "Running `diagnose debug application ike -1` by itself will start printing output.",
    "Debug output appears only after `diagnose debug enable`. Turn it off with `diagnose debug disable` when finished."
   ],
   [
    "`diagnose vpn ike gateway list` shows the phase 2 selectors and packet counters.",
    "The gateway list covers phase 1. Selectors, phase 2 SAs and encrypt and decrypt counters are in `diagnose vpn tunnel list`."
   ],
   [
    "If phase 2 is up and counters stay at zero, keep debugging IKE.",
    "Once phase 2 SAs are installed, IKE negotiation has succeeded. Zero counters point to routes and firewall policies feeding the tunnel."
   ],
   [
    "Run the IKE debug unfiltered on a busy firewall to see everything.",
    "With many tunnels the output is unreadable and adds load. Filter on the peer address first, then reproduce the problem."
   ]
  ],
  "tryit": [
   [
    "At Sunfield Credit Union, `diagnose vpn tunnel list` shows a branch tunnel with SAs installed in both directions. The encrypt counter increases every time a user pings the branch, but the decrypt counter stays at zero. What does this tell you, and where do you look next?",
    "Phase 1 and phase 2 are fine and local traffic is entering the tunnel, but nothing is coming back. Look at the remote side: its route back to your subnet via its tunnel interface, its firewall policy from tunnel to LAN, or the remote host itself. IKE debugging will not help because negotiation already succeeded."
   ]
  ],
  "tip": "Use the gateway list for phase 1, the tunnel list for phase 2 and packet counters, and the IKE debug to see why negotiation fails. Filter the debug to the peer, and remember nothing prints until you run `diagnose debug enable`.",
  "check": [
   [
    "Which command shows phase 1 gateway status?",
    "`diagnose vpn ike gateway list`, which lists each IKE gateway, its state and negotiated settings."
   ],
   [
    "Phase 1 is up but no traffic passes and there is no phase 2 SA. What tool shows why?",
    "`diagnose debug application ike -1` (with debug enabled) reveals the phase 2 negotiation error, commonly a selector or proposal mismatch."
   ],
   [
    "What must you run for IKE debug output to appear?",
    "`diagnose debug enable`; without it the debug prints nothing, and you run `diagnose debug disable` when done."
   ],
   [
    "What do non-increasing counters in `diagnose vpn tunnel list` suggest when SAs are installed?",
    "Traffic is not reaching or crossing the tunnel, so check routes and firewall policies rather than IKE settings."
   ]
  ]
 },
 {
  "t": "Remote access VPN on FortiOS 7.6: FortiClient dial-up IPsec, and the SSL VPN changes in later 7.6 builds (tunnel mode removed, web mode renamed agentless VPN)",
  "hook": "Monday after a weekend maintenance window at Aspen Grove Architects. You upgraded the FortiGate to a later FortiOS 7.6 build on Saturday, everything tested fine on site, and you went home happy. By 8:30 a.m. the help desk has fourteen tickets from remote designers: their VPN client cannot connect. Then you open the firewall's VPN settings and notice that the SSL VPN tunnel mode configuration you relied on is no longer there, and the old web portal now has a different name. A partner asks whether the upgrade broke something. Did it, or did the platform change direction, and how do you get fourteen designers working again today?",
  "simple": "A remote access VPN lets one person, working from home or a hotel, connect safely to the office network. On FortiOS 7.6 the main way to do this is FortiClient using IPsec: the person runs the FortiClient app, which builds a protected tunnel to the office FortiGate, signs the person in, and gives their laptop an office network address. Fortinet used to offer an SSL VPN full tunnel as well, but later 7.6 releases removed it. The old browser-only portal, which lets you open a few office web apps without installing anything, still exists under a new name: agentless VPN. It is like a building replacing an old side entrance with a better main door, while keeping a visitor desk for quick, limited visits.",
  "body": [
   "A remote access VPN lets individual users, rather than whole sites, connect securely to internal resources from anywhere. On FortiOS 7.6 the recommended approach shifted noticeably, and both the exam and real deployments expect you to understand the FortiClient IPsec method as well as the significant Secure Sockets Layer (SSL) VPN changes introduced in later 7.6 builds. Whether remote access VPN appears on your specific exam version can vary, so confirm the current exam description, but the concepts are valuable either way.",
   "The primary full remote-access method on 7.6 is FortiClient dial-up Internet Protocol Security (IPsec). The FortiGate is configured as a dial-up IPsec server: a single phase 1 with the remote gateway type set to dial-up user accepts incoming tunnels from many remote clients whose public addresses are unknown in advance. Remote users run FortiClient, Fortinet's endpoint agent, which initiates the tunnel to the FortiGate's public address. This is exactly the dial-up model from site-to-site VPNs, applied to individual laptops instead of branch firewalls. The VPN wizard includes a remote access template for FortiClient that builds the phase 1, phase 2, address range and policies together.",
   "User authentication is layered on top of the device-level IPsec negotiation. With Internet Key Exchange version 2 (IKEv2), the FortiGate typically authenticates users with Extensible Authentication Protocol (EAP); with IKEv1, the older Extended Authentication (XAUTH) mechanism fills the same role. The user's credentials can be checked against local user accounts or against remote servers such as Lightweight Directory Access Protocol (LDAP) or Remote Authentication Dial-In User Service (RADIUS) servers, and two-factor authentication with FortiToken is common. User groups then control who may connect and which policies apply to them.",
   "Once the tunnel is up, the client needs an address and network settings. IKE mode-config provides them: the FortiGate assigns each client an IP address from a configured range, along with DNS servers and, where configured, split-tunnel routes that tell the client which networks to send through the tunnel. With split tunneling enabled, only traffic for internal subnets uses the VPN and the rest goes directly to the Internet; with it disabled, all client traffic goes through the FortiGate, where it can be inspected. You then add firewall policies from the tunnel interface to the internal networks, using the client address range and user groups as sources, so remote users can reach the resources they need and nothing more.",
   "The big change concerns SSL VPN. Historically, FortiGate SSL VPN offered two modes. Tunnel mode provided a full network-level VPN through the FortiClient software over HTTPS. Web mode provided a clientless portal reached in a browser, with bookmarks to internal web applications and other services. In later FortiOS 7.6 builds, Fortinet removed SSL VPN tunnel mode, steering customers toward IPsec with FortiClient for full-tunnel remote access. This is a deliberate direction rather than a defect. If a scenario says an organization upgraded to a recent 7.6 build and SSL VPN tunnel mode is gone, that is expected behavior, and the fix is to move remote-access users to FortiClient dial-up IPsec, which is precisely the situation at Aspen Grove.",
   "SSL VPN web mode was retained but renamed. In later 7.6 builds it is called agentless VPN, reflecting that it is the browser-based, no-client way to reach a limited set of internal web and application resources through a portal. The rename keeps the clientless capability while making clear that it is not a full tunnel: the user's laptop does not join the internal network or receive an internal address. It is suited to contractors or occasional users who need one or two internal web applications without installing software.",
   "Planning a migration follows naturally. Inventory the users who relied on SSL VPN tunnel mode, deploy or update FortiClient on their devices, build the dial-up IPsec configuration with the same authentication sources and user groups, assign a client address range with mode-config, replicate the access policies, and make sure the FortiGate's IPsec ports are reachable from the Internet: User Datagram Protocol (UDP) 500, and UDP 4500 for clients behind NAT, which is nearly every home and hotel network. Users who only needed browser access can move to agentless VPN.",
   "For the exam, keep the durable facts in mind. FortiClient dial-up IPsec is the full remote-access method. SSL VPN tunnel mode was removed in later 7.6 builds. SSL VPN web mode was renamed agentless VPN and provides browser-based access to specific resources. Do not rely on exact build numbers, which are easy to misremember; the removal of tunnel mode and the web-mode rename are what matter.",
   "In a lab, configure a dial-up IPsec phase 1 for FortiClient, assign a client IP range with mode-config, add policies for that range to an internal server, and connect with FortiClient from a test machine. Then compare what an agentless portal user can reach, only the published bookmarks, with what the IPsec client can reach."
  ],
  "analogy": "Think of an office building. FortiClient IPsec is a staff badge: after signing in, you walk into the building, get a desk (an internal address) and can reach the rooms your role allows. Agentless VPN is the visitor reception window: you can be handed specific documents through the window, but you never enter the building. Later 7.6 builds closed an older side entrance (SSL VPN tunnel mode), so staff now use the main badge door. The analogy stops at security details such as split tunneling.",
  "terms": [
   [
    "FortiClient dial-up IPsec",
    "Remote-access VPN where FortiClient initiates an IPsec tunnel to a FortiGate dial-up phase 1, which authenticates the user and assigns settings via mode-config."
   ],
   [
    "Mode-config",
    "The IKE mechanism that assigns an IP address, DNS servers and optional split-tunnel routes to a remote client when the tunnel comes up."
   ],
   [
    "EAP / XAUTH",
    "User authentication methods layered on IPsec: EAP with IKEv2, XAUTH with IKEv1, checked against local, LDAP or RADIUS users."
   ],
   [
    "SSL VPN tunnel mode removal",
    "In later FortiOS 7.6 builds, full-tunnel SSL VPN was removed, with IPsec (FortiClient) as the supported full remote-access path."
   ],
   [
    "Agentless VPN",
    "The renamed SSL VPN web mode: browser-based, clientless access to specific internal web and application resources through a portal."
   ],
   [
    "Split tunneling",
    "Sending only traffic for internal networks through the VPN while other traffic goes directly to the Internet."
   ]
  ],
  "example": "After upgrading to a recent FortiOS 7.6 build, remote workers find SSL VPN tunnel mode gone. The admin builds a FortiClient dial-up IPsec configuration with IKEv2 and EAP authentication against LDAP plus FortiToken, assigns addresses from 10.212.134.0/24 with mode-config and split tunneling, and adds policies to the file and design servers. Two contractors who only use the internal timesheet web app are given agentless VPN (formerly SSL VPN web mode) access instead.",
  "mistakes": [
   [
    "SSL VPN tunnel mode disappearing after an upgrade to a later 7.6 build is a bug; roll back.",
    "Its removal is an intentional platform change. Migrate full-tunnel users to FortiClient dial-up IPsec."
   ],
   [
    "Agentless VPN is a new name for SSL VPN tunnel mode.",
    "Agentless VPN is the renamed web mode: browser-based, clientless access to specific resources, not a full tunnel."
   ],
   [
    "FortiClient IPsec users only need UDP 500 open on the FortiGate.",
    "Most remote users are behind NAT, so NAT-T on UDP 4500 is also needed."
   ],
   [
    "Remote clients need a separate phase 1 entry for each user.",
    "One dial-up phase 1 accepts many clients; user authentication and groups distinguish them."
   ]
  ],
  "tryit": [
   [
    "Cobalt Ridge Clinic has 40 remote staff who need full access to the records system and file shares, and three auditors who only need a single internal web reporting tool for one week. The FortiGate runs a later 7.6 build. What remote access methods would you assign to each group, and why?",
    "Give the 40 staff FortiClient dial-up IPsec, since it is the full remote-access method and SSL VPN tunnel mode is no longer available. Give the auditors agentless VPN (the former SSL VPN web mode), which provides browser-only access to the specific web tool without installing a client or placing their devices on the internal network."
   ]
  ],
  "tip": "On later 7.6 builds, SSL VPN tunnel mode is removed and web mode is renamed agentless VPN; FortiClient dial-up IPsec is the full remote-access method. Confirm remote-access coverage on your exam version, and remember UDP 4500 for clients behind NAT.",
  "check": [
   [
    "What is the primary full remote-access VPN method on FortiOS 7.6?",
    "FortiClient dial-up IPsec: FortiClient initiates an IPsec tunnel to a FortiGate dial-up server that authenticates the user and assigns settings via mode-config."
   ],
   [
    "What happened to SSL VPN tunnel mode in later 7.6 builds?",
    "It was removed, with IPsec (FortiClient) as the supported path for full-tunnel remote access."
   ],
   [
    "What was SSL VPN web mode renamed to, and what is it?",
    "Agentless VPN: browser-based, clientless access to specific internal web and application resources through a portal."
   ],
   [
    "What does mode-config provide to a FortiClient IPsec user?",
    "An IP address from a configured range, DNS settings and optional split-tunnel routes."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
