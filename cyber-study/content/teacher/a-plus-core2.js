/* Teacher edition for CompTIA A+ Core 2 (220-1202): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("a-plus-core2", [
 {
  "t": "OS types and purposes: Windows, macOS, Linux, ChromeOS, iOS/iPadOS, Android; vendor life cycles and end-of-life",
  "objectives": [
   "Students will be able to identify the maker, typical hardware and main purpose of Windows, macOS, Linux, ChromeOS, iOS/iPadOS and Android.",
   "Students will be able to recommend an appropriate operating system for a described user need, justifying the choice by software compatibility.",
   "Students will be able to explain the phases of a vendor life cycle and what changes at end-of-life.",
   "Students will be able to propose mitigations for an end-of-life system that cannot be upgraded immediately."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list every operating system they used in the last 24 hours, including phones, TVs and school devices. Collect answers on the whiteboard and group them into desktop and mobile."
   ],
   [
    12,
    "Teach",
    "Walk through the six operating systems with a simple table on the board: maker, hardware, typical use, update channel. Stress that apps are written for one OS. Then draw a timeline for a vendor life cycle (mainstream, extended, end-of-life) and explain that EOL stops patches, not the computer."
   ],
   [
    15,
    "Activity",
    "Run the \"Right OS for the Job\" card match described below in pairs, then have pairs compare answers with a neighboring pair."
   ],
   [
    8,
    "Discuss",
    "Review the trickiest cards as a class, especially the EOL scenario. Ask pairs to defend isolation versus replacement and draw out why isolation reduces but does not remove risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your grandparent's laptop still turns on and browses the web fine, but a pop-up says the operating system is no longer supported. Is it safe to keep using it for online banking? Why or why not?",
  "activity": {
   "title": "Right OS for the Job card match",
   "materials": "Printed cards the teacher prepares: 10 user-need cards and 6 operating system cards per pair; whiteboard for the answer key.",
   "steps": [
    "Give each pair a set of six OS cards (Windows, macOS, Linux, ChromeOS, iOS/iPadOS, Android) and ten need cards, for example \"web server for a small company,\" \"30 low-cost student devices,\" \"phone where the company wants to allow apps outside the main store,\" \"PC that must join an Active Directory domain,\" and \"reception PC whose OS vendor stopped issuing patches.\"",
    "Pairs place each need card under the best OS card and write one sentence on the back explaining the choice in terms of software, hardware or management.",
    "For the EOL card, pairs must write two actions: the long-term fix and the short-term mitigation.",
    "Pairs swap with a neighboring pair, check each other's placements and flag any disagreement.",
    "The teacher reveals the answer key on the board and the class resolves flagged disagreements."
   ]
  },
  "discussion": [
   "Why might an organization choose to run an end-of-life system anyway, and who should formally accept that risk?",
   "What are the trade-offs between Apple's single-vendor approach to updates and Android's many-manufacturer approach?",
   "When would a school be better served by Windows laptops than by Chromebooks?"
  ],
  "exit": [
   [
    "A user needs a phone that receives OS updates the same day across all supported models. Which mobile OS fits best?",
    "iOS, because Apple controls the hardware and ships updates to all supported devices at the same time."
   ],
   [
    "What stops happening when an operating system reaches end-of-life?",
    "The vendor stops releasing security patches and support; the system still runs but new vulnerabilities stay unfixed."
   ],
   [
    "An EOL PC runs software that cannot be moved yet. Name two mitigations.",
    "Any two of: isolate it on a restricted network segment, block internet access, limit who can sign in, document the accepted risk, set a replacement date."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed table (maker and hardware filled in) so they can focus on matching purposes, and let them use the lesson's terms list during the card match.",
   "Extend: Ask fast finishers to write a one-paragraph recommendation to a fictional manager explaining why an EOL PC must be replaced, including the business risk and an isolation plan for the interim."
  ]
 },
 {
  "t": "File systems: NTFS, ReFS, FAT32, exFAT, ext4, XFS, APFS and their limits",
  "objectives": [
   "Students will be able to identify the operating system and main features associated with NTFS, ReFS, FAT32, exFAT, ext4, XFS and APFS.",
   "Students will be able to explain the FAT32 4 GB file size limit and diagnose a \"file too large\" error.",
   "Students will be able to select the appropriate file system for a described storage scenario, including cross-platform sharing.",
   "Students will be able to compare journaled and non-journaled file systems in terms of crash recovery."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the empty USB drive and let students guess causes. Write guesses on the board without judging them."
   ],
   [
    12,
    "Teach",
    "Present each file system with three facts: native OS, key features, key limit. Build a comparison grid on the board with columns for Windows read/write, Mac read/write, permissions, journaling and notable limit. Explain journaling with a short story about a power cut mid-save."
   ],
   [
    15,
    "Activity",
    "Run the \"Format Decision Desk\" ticket exercise in groups of three."
   ],
   [
    8,
    "Discuss",
    "Groups share one ticket they found tricky. Return to the warm-up guesses and identify which were correct."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A brand-new, empty 64 GB USB drive refuses to accept a single 7 GB video file. What could possibly be wrong with an empty drive?",
  "activity": {
   "title": "Format Decision Desk",
   "materials": "Printed ticket cards (8 short help-desk tickets), the comparison grid on the whiteboard, sticky notes.",
   "steps": [
    "Form groups of three: one reads the ticket, one proposes a file system, one plays skeptic and must find a reason the choice might fail.",
    "Tickets include: a camera stopping recording at 4 GB, a drive shared between Windows and Mac with large files, a Windows boot drive needing EFS, a Red Hat media server, a storage pool needing automatic corruption repair, an old car stereo that plays music from USB, and a new MacBook's internal drive.",
    "For each ticket the group writes the chosen file system and one-sentence reason on a sticky note and places it on the board under that ticket number.",
    "After all groups post, the teacher reviews any ticket with mixed answers and the skeptics explain their objections.",
    "Groups note one rule of thumb they will remember, such as \"Mac plus Windows plus big files equals exFAT.\""
   ]
  },
  "discussion": [
   "Why do you think Microsoft kept NTFS for system drives instead of moving everything to ReFS?",
   "When would maximum compatibility matter more than features like permissions and journaling?",
   "What could go wrong if a technician reformats a drive without checking what is on it first?"
  ],
  "exit": [
   [
    "A 6 GB file will not copy to an empty FAT32 drive. Why, and what would you change?",
    "FAT32 has a 4 GB maximum file size; back up and reformat the drive as exFAT (or NTFS if only Windows needs it)."
   ],
   [
    "Which file system is the default for macOS and iOS?",
    "APFS."
   ],
   [
    "What does journaling provide?",
    "It logs pending changes so the file system can recover to a consistent state after a crash or power loss."
   ]
  ],
  "differentiation": [
   "Support: Provide a half-filled comparison grid and a short list of clue words (permissions, 4 GB, checksums, snapshots) mapped to file systems so students can focus on applying them to tickets.",
   "Extend: Ask fast finishers to explain why the 32 GB FAT32 figure and the 4 GB FAT32 figure are different kinds of limits, and to write a ticket that tests the difference."
  ]
 },
 {
  "t": "Installations and upgrades: boot methods (USB, PXE, ISO), clean vs in-place vs image deployment vs repair install, GPT vs MBR, third-party drivers",
  "objectives": [
   "Students will be able to distinguish USB, ISO and PXE as ways to start an operating system installation.",
   "Students will be able to select a clean install, in-place upgrade, repair install or image deployment for a described scenario and explain what each keeps or removes.",
   "Students will be able to compare MBR and GPT and diagnose a large disk that shows only about 2 TB.",
   "Students will be able to explain when and how to load a third-party storage driver during setup."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and have students vote by raising hands for clean install, upgrade or repair. Leave the result on the board."
   ],
   [
    13,
    "Teach",
    "Draw three columns on the board: Boot method, Install type, Partition style. Fill each with the options and one key fact. Use a simple table for install types with rows for 'keeps data,' 'keeps apps,' 'removes old problems.' Show the 2 TB MBR limit as a ruler drawn on the board with the rest of a 4 TB disk grayed out."
   ],
   [
    15,
    "Activity",
    "Run the \"Install Planner\" role-play in pairs."
   ],
   [
    7,
    "Discuss",
    "Revisit the warm-up vote. Ask pairs who changed their answer to explain why. Highlight backup as the step common to every plan."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "A user's laptop has corrupted Windows system files, but she has a dozen carefully configured apps she cannot lose. Would you wipe and reinstall, upgrade, or something else?",
  "activity": {
   "title": "Install Planner role-play",
   "materials": "Printed scenario cards (one per pair, 6 different scenarios), a printed planning sheet with boxes for boot method, install type, partition style, drivers and backup.",
   "steps": [
    "In each pair, one student plays a manager describing the scenario card in their own words; the other plays the technician and asks clarifying questions, such as \"Do you need to keep your apps?\" and \"How many machines?\"",
    "Scenarios include: 30 identical new PCs, a laptop with corrupted system files, a move to a newer Windows version keeping everything, a server whose setup shows no disks, a 4 TB disk showing 2 TB, and a PC with no working USB ports.",
    "The technician fills in the planning sheet, including the backup step and any driver needed.",
    "Pairs swap roles and complete a second scenario.",
    "Two pairs volunteer to present a plan; the class checks it against the exam keywords on the board."
   ]
  },
  "discussion": [
   "Why might an organization prefer image deployment even for a small batch of ten machines?",
   "What risks come with an in-place upgrade that a clean install avoids?",
   "How would you explain to a non-technical manager why the backup step cannot be skipped?"
  ],
  "exit": [
   [
    "Forty identical machines need the same OS, apps and settings. Which approach and boot method fit?",
    "Image deployment, typically booted over the network with PXE."
   ],
   [
    "A 4 TB disk shows only about 2 TB. What is the cause and fix?",
    "It was initialized as MBR; back up and convert it to GPT."
   ],
   [
    "Setup cannot see the disk on a RAID controller. What do you do?",
    "Use Load driver to provide the controller's third-party storage driver from a USB drive."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a keyword cheat card (keep files and apps, start fresh, many machines, network boot, over 2 TB) to use while filling in the planning sheet.",
   "Extend: Ask fast finishers to write a step-by-step pre-upgrade checklist for an in-place upgrade, covering requirements, compatibility, disk space, backup verification and driver availability."
  ]
 },
 {
  "t": "Windows 10/11 editions (Home, Pro, Enterprise, Education) and which features each has: BitLocker, domain join, Group Policy, Remote Desktop host",
  "objectives": [
   "Students will be able to state which Windows editions include BitLocker, domain join, the Group Policy Editor and Remote Desktop host.",
   "Students will be able to distinguish a Remote Desktop client from a Remote Desktop host and apply the distinction to troubleshooting.",
   "Students will be able to recommend an in-place edition upgrade to resolve a missing business feature without data loss.",
   "Students will be able to identify Windows 11 hardware requirements such as TPM 2.0 and Secure Boot."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to guess why the domain option is missing. Collect two or three guesses."
   ],
   [
    12,
    "Teach",
    "Draw a feature matrix on the board: rows for BitLocker, domain join, gpedit.msc, Remote Desktop host and Remote Desktop client; columns for Home, Pro, Enterprise, Education. Fill it in with the class. Demonstrate on the projector where to find the edition (Settings, System, About) and where the edition upgrade lives (System, Activation)."
   ],
   [
    15,
    "Activity",
    "Run the \"Edition Detective\" ticket sort in small groups."
   ],
   [
    8,
    "Discuss",
    "Discuss the client-versus-host trap and why reinstalling is the wrong fix. Ask groups to share any ticket where they first blamed the network."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "A brand-new laptop cannot join the company domain and cannot find gpedit.msc. Is it broken, misconfigured or something else? What is the first thing you would check?",
  "activity": {
   "title": "Edition Detective ticket sort",
   "materials": "Printed help-desk ticket cards (10 per group), four column headers on paper (Home problem: upgrade to Pro; Not an edition problem; Needs Windows 11 hardware; Enterprise or Education licensing), tape or sticky notes.",
   "steps": [
    "Groups of three or four receive the ticket cards, such as \"cannot RDP into my home PC,\" \"my Home laptop cannot connect out to the office PC with Remote Desktop,\" \"BitLocker missing from Control Panel,\" \"PC refuses Windows 11 upgrade, no TPM 2.0,\" and \"university wants Enterprise features for all labs.\"",
    "Groups sort each ticket under a column header and write a one-line fix on the card.",
    "Include two trick tickets where the edition is not the cause (for example, a Home PC that cannot connect out because the target PC is offline).",
    "Groups rotate to another table, review that group's sort and leave one sticky-note comment.",
    "The teacher reveals the intended sort and the class discusses the trick tickets."
   ]
  },
  "discussion": [
   "Why do you think Microsoft separates business features into higher editions instead of including them everywhere?",
   "When might a home user actually benefit from upgrading to Pro?",
   "How would you explain to an office manager why a retail laptop may be the wrong purchase for a business?"
  ],
  "exit": [
   [
    "Name the four features in this lesson that Windows Home lacks.",
    "BitLocker (full management), domain join, the Local Group Policy Editor and Remote Desktop host."
   ],
   [
    "A Home user can connect out to a Pro PC with Remote Desktop, but nobody can connect in to the Home PC. Why?",
    "Every edition has the Remote Desktop client, but only Pro and higher can act as a Remote Desktop host."
   ],
   [
    "What is the least disruptive way to get domain join on a Home laptop?",
    "Upgrade the edition in place to Pro with a product key; no reinstall or data loss is needed."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed feature matrix as a reference card and pair struggling students with a partner who reads tickets aloud.",
   "Extend: Ask fast finishers to research, using the lesson text, the difference between Device encryption and full BitLocker, and write a short note to a user explaining which one their Home laptop has and what upgrading would add."
  ]
 },
 {
  "t": "Windows tools: Task Manager, MMC snap-ins (Event Viewer, Disk Management, Task Scheduler, Device Manager, Certificate Manager, Local Users and Groups, Performance Monitor, Group Policy Editor), msinfo32, Resource Monitor, System Configuration, Registry Editor, Disk Cleanup",
  "objectives": [
   "Students will be able to match each listed Windows tool to its purpose and run command.",
   "Students will be able to distinguish real-time tools from historical or trend tools (Task Manager versus Event Viewer and Performance Monitor).",
   "Students will be able to select the correct tool for a described troubleshooting symptom.",
   "Students will be able to explain safe practice for the Registry Editor and identify tools missing from Home editions."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question on the projector and have students write one tool name on a sticky note before discussion."
   ],
   [
    12,
    "Teach",
    "Group the tools on the board into four families: Right now (Task Manager, Resource Monitor), History and trends (Event Viewer, Performance Monitor), Hardware and storage (Device Manager, Disk Management, msinfo32), Configuration (msconfig, regedit, gpedit, lusrmgr, Task Scheduler, Certificate Manager, Disk Cleanup). If a Windows PC is available, launch each from the Run box on the projector to show the command."
   ],
   [
    15,
    "Activity",
    "Run the \"Tool Relay\" card game in teams."
   ],
   [
    8,
    "Discuss",
    "Review cards teams disagreed on, focusing on msconfig versus msinfo32 and Task Manager versus Performance Monitor. Stress exporting registry keys."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Yesterday afternoon a PC crashed. It is fine now. If you open Task Manager this morning, will it tell you why? Where would you look instead?",
  "activity": {
   "title": "Tool Relay",
   "materials": "Two sets of printed symptom cards (12 cards each) and two sets of printed tool-name cards with run commands; whiteboard divided into two team zones.",
   "steps": [
    "Split the class into two teams lined up at the board. Each team has a pile of face-down symptom cards and its tool cards laid out on a desk.",
    "The first student flips a symptom card (for example, \"Which process has this file locked?\"), finds the matching tool card (Resource Monitor, resmon), tapes both to the team zone and tags the next teammate.",
    "Teams continue until all symptom cards are matched; include symptoms such as \"roll back a graphics driver,\" \"run a script at every sign-in,\" \"extend a partition,\" \"find the BIOS version without rebooting\" and \"import a certificate for the local computer.\"",
    "The teacher checks both boards; each incorrect match costs a point and the team must explain the correct tool.",
    "Teams finish by adding the run command beside any tool card where it is missing."
   ]
  },
  "discussion": [
   "Why might Microsoft keep tools like Local Users and Groups out of the Home edition?",
   "When would you choose Resource Monitor over Task Manager, and what extra detail does it give you?",
   "What could happen if a technician edits the registry on a production PC without a backup, and how would you recover?"
  ],
  "exit": [
   [
    "You need to know which errors occurred overnight. Which tool and which logs?",
    "Event Viewer, checking the System and Application logs."
   ],
   [
    "Which tool would you use to build a baseline of memory use over several days?",
    "Performance Monitor with a data collector set."
   ],
   [
    "What should you always do before editing the registry?",
    "Export the key you will change so it can be restored."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card listing each tool, its command and a one-line purpose, and let them use it during the relay.",
   "Extend: Ask fast finishers to design a custom MMC console for a help-desk technician, choosing four snap-ins and justifying each choice in one sentence."
  ]
 },
 {
  "t": "Command-line tools: cd, dir, md, rmdir, robocopy, xcopy, diskpart, format, chkdsk, sfc, DISM, gpupdate, gpresult, net use, net user, whoami, winver, shutdown, ipconfig, ping, tracert, pathping, nslookup, netstat, hostname",
  "objectives": [
   "Students will be able to state the purpose of each listed Windows command and identify common switches such as /all, /force, /mir, /f and /r.",
   "Students will be able to distinguish commonly confused pairs: sfc and DISM, gpupdate and gpresult, tracert and pathping, xcopy and robocopy.",
   "Students will be able to sequence commands to troubleshoot a connectivity or name resolution problem.",
   "Students will be able to identify which commands require an elevated prompt or have no undo."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question and have students write their answer silently, then compare with a neighbor."
   ],
   [
    12,
    "Teach",
    "Group commands on the board into five families: files and folders, disks, repair, policy and accounts, networking. For each family, write one example command with a common switch. If a Windows PC is available, demonstrate ipconfig /all, ping, nslookup and whoami live on the projector. Highlight the 'danger zone' commands: diskpart clean, rmdir /s, format, robocopy /mir."
   ],
   [
    15,
    "Activity",
    "Run the \"Command Line Detective\" troubleshooting exercise in pairs."
   ],
   [
    8,
    "Discuss",
    "Pairs share their command sequences for the networking scenario. Discuss why you test address, then reachability, then names."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "You can ping a website's IP address, but typing its name in the browser fails. What part of networking is probably broken, and which command could prove it?",
  "activity": {
   "title": "Command Line Detective",
   "materials": "Printed scenario sheets (6 short scenarios with simulated command output the teacher prepares), a printed command reference list, pens.",
   "steps": [
    "Give each pair a scenario sheet. Each scenario shows a user complaint and a short block of simulated command output, such as an ipconfig result with a 169.254 address, an sfc message saying corrupt files could not be repaired, or a nslookup failure.",
    "Pairs write the next command they would run and why, then turn over the sheet to see the next simulated output the teacher printed on the back.",
    "Pairs continue until they reach a fix, recording the full sequence of commands.",
    "Each pair identifies any command in their sequence that requires an elevated prompt and any that has no undo.",
    "Pairs swap sheets with another pair and check whether a different sequence would also have worked."
   ]
  },
  "discussion": [
   "Why is robocopy /mir both powerful and risky for backups?",
   "In what situations would a technician prefer the command line over graphical tools?",
   "Why should you confirm the disk number twice in diskpart, and what habit would help prevent mistakes?"
  ],
  "exit": [
   [
    "sfc /scannow cannot repair some files. What do you run next and then what?",
    "DISM /Online /Cleanup-Image /RestoreHealth, then sfc /scannow again."
   ],
   [
    "Which command shows where along a path packets are being lost?",
    "pathping."
   ],
   [
    "What is the difference between gpupdate /force and gpresult /r?",
    "gpupdate /force reapplies all Group Policy now; gpresult /r reports which policies have been applied."
   ]
  ],
  "differentiation": [
   "Support: Provide a command reference card grouped by family with one example each, and let struggling students work scenarios that have only two steps.",
   "Extend: Ask fast finishers to write a short batch-style list of commands a technician could run to collect diagnostic information (hostname, whoami, ipconfig /all, gpresult /r, netstat -an) and explain what each line reveals."
  ]
 },
 {
  "t": "Settings and Control Panel: Accounts, Privacy, Update and Security, Apps, Power Options (sleep, hibernate, fast startup), Display, Devices",
  "objectives": [
   "Students will be able to locate the Settings or Control Panel category that addresses a described user symptom.",
   "Students will be able to compare sleep, hibernate and fast startup in terms of where data is kept, power use and resume speed.",
   "Students will be able to explain why Restart can clear problems that Shut down does not when fast startup is enabled.",
   "Students will be able to resolve app permission problems using Privacy settings rather than driver changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick show of hands: sleep, hibernate or shut down. Record the counts on the board."
   ],
   [
    12,
    "Teach",
    "Project the Settings app (or screenshots) and tour Accounts, Privacy and security, Windows Update, Apps, Display and Bluetooth and devices, naming one symptom for each. Then draw a three-row table on the board for sleep, hibernate and fast startup with columns: where the session goes, power used, resume speed, what clears problems."
   ],
   [
    15,
    "Activity",
    "Run the \"Settings Scavenger Hunt\" in pairs on laptops, or with printed screenshots if laptops are not available."
   ],
   [
    8,
    "Discuss",
    "Review answers, focusing on the camera permission ticket and the fast startup ticket. Revisit the warm-up vote."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "When you close your laptop lid and open it the next morning, is your laptop asleep, hibernating or shut down? How could you tell?",
  "activity": {
   "title": "Settings Scavenger Hunt",
   "materials": "Student laptops running Windows 10 or 11 (or printed screenshots of Settings pages), a printed list of 8 help-desk tickets, pens.",
   "steps": [
    "Pairs receive eight tickets, such as \"app cannot use the microphone,\" \"change the default PDF reader,\" \"stop restarts during work hours,\" \"laptop dies in a bag overnight,\" \"second monitor duplicates instead of extending,\" \"pair a Bluetooth mouse,\" \"add a PIN sign-in\" and \"driver update does not take effect after Shut down.\"",
    "For each ticket, pairs navigate to the exact page in Settings or Control Panel and write the full path (for example, Settings, Privacy and security, Microphone).",
    "Pairs must not change any settings on shared machines; they only record the path and the setting they would change.",
    "For the power tickets, pairs write which state (sleep, hibernate, Restart) solves the problem and why.",
    "Pairs compare paths with another pair; any differences (Windows 10 versus 11 naming) are noted for discussion."
   ]
  },
  "discussion": [
   "Why do you think Microsoft is gradually moving options from Control Panel into Settings, and what problems does the transition cause for technicians?",
   "When would you recommend sleep over hibernate for a user, and when the opposite?",
   "Why is granting administrator rights a poor fix for a user who cannot change a setting?"
  ],
  "exit": [
   [
    "Which power state uses no power and survives a dead battery?",
    "Hibernate, because it saves memory to hiberfil.sys on disk and powers off."
   ],
   [
    "A driver update did not take effect after Shut down. What should the user do and why?",
    "Choose Restart, because fast startup makes Shut down hibernate the kernel session instead of fully reloading it."
   ],
   [
    "A conferencing app cannot use the webcam, but the Camera app can. Where do you look?",
    "Settings, Privacy and security, Camera permissions, including desktop app access."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed map of Settings categories with one example per category, and assign struggling pairs the first five tickets only.",
   "Extend: Ask fast finishers to write a short user-facing explanation of fast startup in plain language, suitable for a help-desk knowledge base article."
  ]
 },
 {
  "t": "Windows networking: workgroup vs domain, mapped drives and shares, firewall exceptions, static vs DHCP addressing, VPN and proxy settings, public vs private network profiles, metered connections",
  "objectives": [
   "Students will be able to compare workgroups and domains in terms of accounts, management and edition requirements.",
   "Students will be able to map a network drive using File Explorer or net use and explain how share and NTFS permissions combine.",
   "Students will be able to diagnose connectivity symptoms such as an APIPA address, a Public profile on a trusted network or a wrong proxy setting.",
   "Students will be able to choose between static and DHCP addressing, and explain the purpose of VPN, proxy and metered connection settings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and have students discuss in pairs for two minutes before sharing."
   ],
   [
    12,
    "Teach",
    "Draw two diagrams on the board: a workgroup (PCs each with their own account list) and a domain (PCs connected to a domain controller). Then build a symptom table: 169.254 address, cannot see other PCs on a trusted network, printer address keeps changing, only one PC cannot browse, cannot reach internal share from home. Fill in cause and fix with the class."
   ],
   [
    15,
    "Activity",
    "Run the \"Network Ticket Triage\" pair troubleshooting exercise."
   ],
   [
    8,
    "Discuss",
    "Discuss the difference between a VPN and a proxy, and how share and NTFS permissions combine. Ask pairs to share a ticket they solved differently."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "Your laptop connects to café Wi-Fi and Windows asks whether you want other devices on this network to discover your PC. What should you answer, and why does it matter?",
  "activity": {
   "title": "Network Ticket Triage",
   "materials": "Printed ticket cards (8 tickets, each with a short simulated ipconfig output or settings screenshot drawn by the teacher), whiteboard symptom table, sticky notes.",
   "steps": [
    "Pairs draw a ticket card. One student plays the user describing the problem; the other plays the technician and must ask at least two questions before naming a cause.",
    "Tickets include: an ipconfig output showing 169.254.33.10, a laptop on office Wi-Fi marked Public, a printer whose address changes monthly, a remote user without VPN, a PC with a manual proxy pointing to an old address, a user with share Full Control but NTFS Read, and a hotspot user worried about data use.",
    "The technician writes the cause and the fix (including the exact Settings path or command) on a sticky note.",
    "Pairs swap roles and draw a new ticket; aim for four tickets per pair.",
    "Pairs post sticky notes on the board under the matching symptom in the table for class review."
   ]
  },
  "discussion": [
   "At what point should a growing small office move from a workgroup to a domain?",
   "Why might a company require a proxy server even though it slows some troubleshooting?",
   "What are the risks of opening a firewall port for all network profiles instead of just the domain profile?"
  ],
  "exit": [
   [
    "What does an address starting with 169.254 tell you?",
    "It is an APIPA address; the PC did not receive a response from a DHCP server."
   ],
   [
    "A user on a trusted office network cannot see shared printers. What is a likely setting cause?",
    "The connection's network profile is set to Public, which turns off network discovery and file sharing."
   ],
   [
    "Share permission is Full Control but NTFS permission is Read. What can the network user do?",
    "Only read, because the more restrictive permission wins over the network."
   ]
  ],
  "differentiation": [
   "Support: Give struggling pairs a symptom-to-cause cheat sheet with five rows and have them start with the APIPA and Public profile tickets.",
   "Extend: Ask fast finishers to design the network settings for a five-person office with a printer and a file-sharing PC, specifying which devices get static addresses, which profile to use and how users will reach shared files."
  ]
 },
 {
  "t": "MacOS: installing and removing apps (.dmg, .pkg, .app, App Store), System Settings, Time Machine, FileVault, Keychain, Spotlight, Mission Control, Terminal, Disk Utility, Force Quit",
  "objectives": [
   "Students will be able to describe how to install and remove macOS applications delivered through the App Store, .dmg and .pkg files.",
   "Students will be able to identify the purpose of Time Machine, FileVault, Keychain, Spotlight, Mission Control, Terminal, Disk Utility and Force Quit.",
   "Students will be able to map common macOS tools to their Windows equivalents.",
   "Students will be able to recommend the correct macOS tool for a described user problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students call out the Windows tool first, then guess the Mac name."
   ],
   [
    12,
    "Teach",
    "Draw a two-column Windows to Mac mapping table on the board and fill it in together. Then sketch the .dmg install flow as three boxes (mount, drag to Applications, eject) and contrast with a .pkg wizard. Show screenshots of System Settings, Time Machine and FileVault on the projector if available."
   ],
   [
    15,
    "Activity",
    "Run the \"Mac Translation Desk\" role-play in pairs."
   ],
   [
    8,
    "Discuss",
    "Discuss Gatekeeper warnings and why bypassing them is risky, and why FileVault recovery keys must be stored."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "On Windows, when an app freezes you open Task Manager and choose End task. What do you think the Mac version of that is called, and how would you open it?",
  "activity": {
   "title": "Mac Translation Desk",
   "materials": "Printed ticket cards (10 Mac support requests written by a Windows-only user), printed Windows-to-Mac mapping table (one per pair), pens.",
   "steps": [
    "In each pair, one student is a user who only knows Windows terms and reads a ticket, for example \"Where is Task Manager on this thing?\" or \"How do I turn on BitLocker on my MacBook?\"",
    "The other student is the Mac technician and must answer with the correct macOS tool name, how to open it and one sentence on what it does.",
    "Include tickets about installing from a .dmg, an app that disappeared after restart (run from the mounted image), a .pkg app leaving pieces behind, repeated keychain prompts after a password change, finding a file quickly and seeing all open windows.",
    "Swap roles after five tickets.",
    "Each pair writes the one ticket they found hardest on the board for whole-class review."
   ]
  },
  "discussion": [
   "Why might Apple require apps to be signed and notarized, and what trade-offs does that create for users?",
   "How would you explain to a manager why FileVault without a stored recovery key is a risk to the business?",
   "Which Mac tools did you find most and least similar to their Windows equivalents?"
  ],
  "exit": [
   [
    "Describe the three steps to install an app from a .dmg.",
    "Mount the .dmg by opening it, drag the .app into the Applications folder, then eject the image."
   ],
   [
    "Which macOS tool provides full-disk encryption, and what must you store safely?",
    "FileVault; the recovery key."
   ],
   [
    "A Mac app is frozen. What keys open the tool to close it?",
    "Command + Option + Esc to open Force Quit."
   ]
  ],
  "differentiation": [
   "Support: Provide the completed mapping table and pictures of each tool's icon so struggling students can match visually during the role-play.",
   "Extend: Ask fast finishers to write a short onboarding checklist for a new Mac user at a company, covering FileVault with key escrow, Time Machine, Keychain and software installation rules."
  ]
 },
 {
  "t": "Linux: file and permission commands (ls, cp, mv, rm, chmod, chown, sudo, su), package managers (apt, dnf), ip, df, top, ps, grep, find, man, key files (/etc/passwd, /etc/shadow, /etc/hosts, /etc/fstab, /etc/resolv.conf)",
  "objectives": [
   "Students will be able to identify the purpose of core Linux file, process, network and search commands listed in this topic.",
   "Students will be able to read a permission string and convert between symbolic and octal notation.",
   "Students will be able to distinguish sudo from su and apt from dnf.",
   "Students will be able to state the purpose of /etc/passwd, /etc/shadow, /etc/hosts, /etc/fstab and /etc/resolv.conf."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write -rwxr-x--- on the board and ask students what they think each part means. Accept guesses."
   ],
   [
    12,
    "Teach",
    "Break the permission string into type, owner, group and others. Show r=4, w=2, x=1 and convert two examples (750, 644). Then list commands by family (files, search, processes, network, packages) and the five key files with one-line purposes. If possible, open a free browser-based Linux terminal on the projector to show ls -l and df -h."
   ],
   [
    15,
    "Activity",
    "Run the \"Permission Puzzle and File Match\" pair activity."
   ],
   [
    8,
    "Discuss",
    "Discuss why chmod 777 is dangerous and why sudo is preferred to logging in as root."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A file shows -rwxr-x--- in a listing. Who do you think can run it, and who cannot even see inside it?",
  "activity": {
   "title": "Permission Puzzle and File Match",
   "materials": "Printed puzzle sheet with 8 permission strings and 8 octal numbers to convert, printed cards for the five key files and five purpose statements, whiteboard.",
   "steps": [
    "Part 1: Pairs convert each permission string to octal (for example -rw-r--r-- to 644) and each octal number to a string (for example 750 to -rwxr-x---).",
    "Pairs check answers with a neighboring pair and resolve differences using r=4, w=2, x=1.",
    "Part 2: Pairs match the five key file cards (/etc/passwd, /etc/shadow, /etc/hosts, /etc/fstab, /etc/resolv.conf) to their purpose cards.",
    "Part 3: The teacher reads short scenarios aloud (\"show a live view of processes,\" \"install nginx on Fedora,\" \"find all .log files under /var\") and pairs write the command on a mini whiteboard or paper and hold it up.",
    "Pairs finish by writing the safest chmod value for a public web page and a private script, with one sentence of justification."
   ]
  },
  "discussion": [
   "Why do you think Linux moved password hashes out of /etc/passwd into a root-only file?",
   "What are the advantages of installing software through a package manager instead of downloading installers from websites?",
   "When might su still be useful, and why do many systems disable direct root login?"
  ],
  "exit": [
   [
    "Convert chmod 640 into a permission string and explain it.",
    "-rw-r-----: owner read and write, group read, others nothing."
   ],
   [
    "Which file contains hashed passwords, and who can read it?",
    "/etc/shadow, readable only by root."
   ],
   [
    "Which package manager would you use on Ubuntu and which on Fedora?",
    "apt on Ubuntu, dnf on Fedora."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a 4-2-1 conversion chart and let them complete the first four puzzle items with a partner before working alone.",
   "Extend: Ask fast finishers to explain what execute permission means on a directory versus a file, and to choose permissions for a shared team folder where the group can add files but others cannot see in."
  ]
 },
 {
  "t": "Installing applications: 32- vs 64-bit, RAM/CPU/GPU/storage requirements, distribution methods (ISO, download, image) and business impact",
  "objectives": [
   "Students will be able to explain the compatibility rules between 32-bit and 64-bit operating systems and applications.",
   "Students will be able to compare an application's RAM, CPU, GPU and storage requirements against a computer's specifications and identify gaps.",
   "Students will be able to choose an appropriate distribution method (download, ISO, image or management tool) and explain hash verification.",
   "Students will be able to analyze the device, network, operation and business impacts of a planned software deployment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question and have students write a guess on a sticky note."
   ],
   [
    12,
    "Teach",
    "On the board, draw the 32/64-bit compatibility grid (64-bit OS runs both; 32-bit OS runs only 32-bit) and show where each installs. List the four requirement areas with a symptom for each. Then write the four business impact headings (device, network, operation, business) and brainstorm one example under each with the class."
   ],
   [
    15,
    "Activity",
    "Run the \"Rollout Review Board\" group activity."
   ],
   [
    8,
    "Discuss",
    "Groups present their go or no-go decisions. Discuss why licensing and timing matter even when the software runs fine."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A brand-new program's installer refuses to start on an older office PC that otherwise works fine. List two things you would check before blaming the software.",
  "activity": {
   "title": "Rollout Review Board",
   "materials": "Printed software requirement sheets (3 fictional applications), printed spec cards for 6 fictional office PCs, a printed deployment-plan template with the four impact headings, whiteboard.",
   "steps": [
    "Groups of four act as a change review board. Each group receives one application requirement sheet and all six PC spec cards.",
    "Groups compare each PC against the requirements (OS architecture, RAM, CPU, GPU and VRAM, storage) and mark each PC as ready, needs upgrade or must be replaced.",
    "Groups choose a distribution method for their organization's scenario and note how they will verify the installer (hash comparison or trusted management tool).",
    "Groups complete the deployment-plan template, listing at least one device, network, operation and business impact and a mitigation for each, such as after-hours scheduling or confirming license counts.",
    "Each group gives a one-minute go or no-go recommendation to the class, which may ask one question."
   ]
  },
  "discussion": [
   "Why might an organization prefer pushing software through an image or management tool instead of letting users download installers themselves?",
   "Which business impact do you think is most often forgotten, and why?",
   "How would you explain to a manager why a vendor's minimum requirements may not be enough for real work?"
  ],
  "exit": [
   [
    "Can a 64-bit application run on a 32-bit operating system?",
    "No; a 32-bit OS cannot run 64-bit applications, although a 64-bit OS can run most 32-bit ones."
   ],
   [
    "A video editor will not start on a laptop with integrated graphics. Which requirement should you check?",
    "The GPU and VRAM requirements."
   ],
   [
    "Name the four areas of business impact.",
    "Device, network, operation and business (licensing, support and compliance)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a requirement checklist that lists each item to compare, and start them with the PCs that have the clearest gaps.",
   "Extend: Ask fast finishers to write a short change request for their rollout, including a test plan, a rollback plan if the install causes problems and a communication message to users."
  ]
 },
 {
  "t": "Cloud productivity tools: email, synced storage, collaboration suites, account setup and licensing",
  "objectives": [
   "Students will be able to explain why synced cloud storage is not a backup and identify version history and recycle bins as recovery tools.",
   "Students will be able to compare POP3, IMAP and Exchange-style synchronization for a user with several devices.",
   "Students will be able to diagnose missing-mailbox and app-activation problems as license assignment issues.",
   "Students will be able to sequence the onboarding and offboarding steps for a cloud productivity account."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard. Point out any answers that confuse sync with backup and say you will come back to them."
   ],
   [
    12,
    "Teach",
    "Walk through the four pillars: email protocols, synced storage, collaboration and sharing, and account lifecycle. Draw one user with a laptop, phone and browser all connected to a cloud icon, then show what happens when a file is deleted. Contrast POP3 with IMAP on the same drawing."
   ],
   [
    18,
    "Activity",
    "Run the help-desk ticket triage activity in pairs. Circulate and ask each pair to justify their first check for each ticket."
   ],
   [
    5,
    "Discuss",
    "Pairs report the ticket they found hardest. Use the discussion questions to draw out sharing risks and offboarding order."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "You delete a photo from your phone and it disappears from your laptop and your tablet too. Is your photo service a backup? What would you need to get the photo back?",
  "activity": {
   "title": "Cloud help-desk ticket triage",
   "materials": "Printed ticket cards (one set per pair, made by the teacher), whiteboard, markers.",
   "steps": [
    "Give each pair eight ticket cards, such as 'new hire has no mailbox', 'mail only on my laptop', 'deleted file gone from all devices', 'sync stopped with red icon', 'employee resigned today', 'link to folder appeared online', 'two people editing at once lose changes', and 'office apps say unlicensed'.",
    "For each card, pairs write the most likely cause and the first thing they would check or do, using a sticky note.",
    "Pairs then sort the cards into four columns on their desk: email, sync, collaboration and sharing, account and licensing.",
    "Each pair compares with a neighboring pair and resolves any disagreements, noting the clue word that decided each card.",
    "The teacher reveals the expected answers and highlights the clue words that exam questions use."
   ]
  },
  "discussion": [
   "Why might a company still buy a separate backup product even though its cloud provider runs the servers?",
   "What could go wrong if a technician reclaims a departing employee's license before retaining their mailbox?",
   "How would you balance easy external sharing against the risk of data leaking through open links?"
  ],
  "exit": [
   [
    "A user's deleted file vanished from every device. Where do you recover it from?",
    "The cloud service's version history or recycle bin, or a separate backup, because sync replicated the deletion."
   ],
   [
    "Which email protocol leaves mail on the server so every device sees it?",
    "IMAP, or Exchange-style synchronization; POP3 downloads to one device."
   ],
   [
    "List the offboarding steps for a cloud account in order.",
    "Disable sign-in, retain or transfer mailbox and files per policy, then reclaim the license."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page clue sheet that maps phrases such as 'no mailbox' or 'only on one device' to causes, and let them complete half the ticket cards with a partner before working alone.",
   "Extend: Ask fast finishers to write a short onboarding checklist for a new hire with a small-SSD laptop and a phone, including group membership, MFA enrollment, license choice and files-on-demand, and to explain each step."
  ]
 },
 {
  "t": "Physical security: access control vestibules, badge readers, video surveillance, alarm systems, locks, guards, bollards, fences",
  "objectives": [
   "Students will be able to explain defense in depth and place physical controls in perimeter, entrance and interior layers.",
   "Students will be able to classify physical controls as preventive, detective or deterrent.",
   "Students will be able to select the correct control for a described threat, such as vehicles, tailgating or after-hours theft.",
   "Students will be able to justify why electronic badge systems are preferred over keyed locks for sensitive rooms."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question. List the controls students name on the board without judging them yet."
   ],
   [
    12,
    "Teach",
    "Draw three concentric rectangles labeled perimeter, entrance and interior. Place each control from the topic list in a layer as you explain it. Mark each one P (preventive) or D (detective) in a second color, and stress the vestibule versus badge reader difference."
   ],
   [
    18,
    "Activity",
    "Groups run the floor-plan audit activity and present their top three fixes."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare group choices and bring out the human layer."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Think about the building we are in right now. If someone wanted to walk out with the main network switch, what would stand in their way, in order, from the parking lot to the equipment?",
  "activity": {
   "title": "Floor-plan security audit",
   "materials": "A simple office floor plan drawn on the whiteboard or printed (one per group), sticky notes in two colors, markers.",
   "steps": [
    "Show a floor plan with a parking lot, glass lobby, reception desk, open office, wiring closet and server room. Mark weaknesses: no barrier at the lobby, a single badge door, an unlocked wiring closet, laptops on open desks and no cameras.",
    "Read out an incident: a stranger tailgated in, took two laptops and unplugged a switch in the wiring closet.",
    "Groups place sticky notes for each control they would add, using one color for preventive controls and another for detective controls.",
    "Each group ranks its top three fixes for a limited budget and writes one sentence per fix naming the threat it addresses.",
    "Groups present; the teacher checks that each control matches its threat, for example bollards for vehicles and a vestibule for tailgating."
   ]
  },
  "discussion": [
   "Why do security designers prefer several modest layers over one very strong barrier?",
   "When is a human guard more useful than any technical control?",
   "How should staff be trained to challenge someone without a badge without creating conflict?"
  ],
  "exit": [
   [
    "Which control stops a vehicle from being driven into a lobby?",
    "Bollards."
   ],
   [
    "A badge door logs one entry but two people walked in. Which control fixes this?",
    "An access control vestibule, often with a guard, to stop tailgating."
   ],
   [
    "Is an alarm system preventive or detective, and why?",
    "Detective, because it notices and reports an event rather than physically stopping it."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column card sort with each control on a card, and have students sort them into preventive and detective before attempting the floor-plan audit.",
   "Extend: Ask students to design physical controls for a small branch office with no budget for guards, explaining which risks remain and how detective controls and staff training compensate."
  ]
 },
 {
  "t": "Logical security: least privilege, zero trust, MFA methods (authenticator apps, SMS, hardware tokens, email), SSO, MDM, DLP, IAM, directory services, access control lists",
  "objectives": [
   "Students will be able to explain least privilege and zero trust and give an example of each.",
   "Students will be able to classify authentication methods by factor type and rank common MFA methods from strongest to weakest.",
   "Students will be able to distinguish SSO, IAM, directory services, ACLs, MDM and DLP by their purpose.",
   "Students will be able to apply the correct logical control to a described scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally answers on the board under know, have and are."
   ],
   [
    12,
    "Teach",
    "Explain least privilege and zero trust with the hospital badge analogy. Rank MFA methods on a vertical line on the board. Finish with a quick table of SSO, IAM, directory service, ACL, MDM and DLP, each with one plain-language purpose."
   ],
   [
    18,
    "Activity",
    "Run the 'Which control?' card match in small groups, then the MFA ranking challenge."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on MFA fatigue and convenience versus security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Name every way you have ever proved who you are to a website or app. Which of them would still protect you if someone learned your password?",
  "activity": {
   "title": "Which control? Scenario match and MFA ranking",
   "materials": "Printed scenario cards and control cards (teacher-made), sticky notes, whiteboard.",
   "steps": [
    "Give each group twelve scenario cards, such as 'remotely wipe a lost tablet', 'block emails containing card numbers', 'sign in once to reach many apps', 'folder allows Sales read-only', and 'never trust a device just because it is on the office network'.",
    "Groups match each scenario to one control card: least privilege, zero trust, MFA, SSO, IAM, directory service, ACL, MDM or DLP.",
    "Next, give each group five authentication cards: password plus PIN, SMS code, email code, authenticator app, hardware security key. Groups rank them from strongest to weakest and mark which one is not MFA at all.",
    "Groups post their ranking on the board with sticky notes and the class compares.",
    "The teacher confirms answers and asks one group to explain why password plus PIN is single-factor."
   ]
  },
  "discussion": [
   "Why might an organization accept SMS codes for some users even though they are weaker than other methods?",
   "What makes an MFA fatigue attack work, and how do number matching and user training counter it?",
   "How does least privilege help even when an attacker already has a valid password?"
  ],
  "exit": [
   [
    "Which listed MFA method is strongest: SMS code, email code, authenticator app or hardware security key?",
    "Hardware security key."
   ],
   [
    "Which tool remotely wipes a lost company phone, MDM or DLP?",
    "MDM; DLP watches data leaving the organization."
   ],
   [
    "What does 'never trust, always verify' describe?",
    "Zero trust, where every request is verified regardless of network location."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with each acronym spelled out and a one-line purpose, and let students use it during the card match.",
   "Extend: Have students write a short access plan for a new remote employee that names the directory group, MFA method, SSO setup, MDM requirement and one DLP rule, justifying each with least privilege or zero trust."
  ]
 },
 {
  "t": "Windows security: Microsoft Defender Antivirus and Firewall, users and groups, NTFS vs share permissions, inheritance, UAC, BitLocker and BitLocker To Go, EFS, Windows Hello, run as administrator",
  "objectives": [
   "Students will be able to calculate effective permissions when share and NTFS permissions combine, including the effect of an explicit Deny.",
   "Students will be able to predict how NTFS permissions change when files are moved or copied.",
   "Students will be able to compare BitLocker, BitLocker To Go and EFS and choose the right one for a scenario.",
   "Students will be able to explain how UAC, Run as administrator and Windows Hello support least privilege and secure sign-in."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up and take a show of hands, then reveal that the answer depends on two permission sets."
   ],
   [
    12,
    "Teach",
    "Draw a shared folder on the board with a share gate and an NTFS lock. Work through two effective-permission examples, one with a Deny. Then cover move versus copy, the three encryption features in a comparison table, and a quick UAC demonstration on the projector if a Windows PC is available."
   ],
   [
    18,
    "Activity",
    "Pairs complete the effective permissions puzzle cards, then the encryption match."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect UAC and standard accounts to least privilege."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A folder is shared so Everyone has Full Control, but the folder's own security settings give you only Read. When you open it over the network, can you delete files?",
  "activity": {
   "title": "Effective permissions puzzle",
   "materials": "Printed puzzle cards (teacher-made), whiteboard, markers; optionally a projector showing a folder's Security tab.",
   "steps": [
    "Give each pair eight puzzle cards. Each lists a user's group memberships, the share permissions, the NTFS permissions, any Deny entries and whether the user is connecting over the network or signed in locally.",
    "Pairs calculate the effective permission for each card, writing their working: add within each set, apply Deny, then take the most restrictive across sets if both apply.",
    "Next, give three move and copy cards, such as 'copied from D:\\Finance to D:\\Public' and 'moved from D: to E:', and pairs predict the resulting permissions.",
    "Finally, pairs match five scenarios to BitLocker, BitLocker To Go or EFS.",
    "The teacher reviews answers, inviting pairs to explain any card where the local versus network detail changed the result."
   ]
  },
  "discussion": [
   "Why do administrators assign permissions to groups instead of to individual users?",
   "What would you say to a user who asks you to turn off UAC because the prompts are annoying?",
   "Why is escrowing the BitLocker recovery key as important as turning BitLocker on?"
  ],
  "exit": [
   [
    "Share: Change. NTFS: Read. What is the effective permission over the network?",
    "Read, the most restrictive of the two."
   ],
   [
    "A file is copied to a different folder on the same volume. Whose permissions does it get?",
    "The destination folder's, through inheritance."
   ],
   [
    "Which feature encrypts one user's files so other users on the same PC cannot read them?",
    "EFS (Encrypting File System)."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-step flowchart card (add within each set, apply Deny, take the most restrictive) and start them with puzzle cards that have no Deny entries.",
   "Extend: Ask students to design share and NTFS permissions for a folder that Accounting can edit, Sales can read and a contractor in Accounting cannot change, and to explain why many administrators set broad share permissions and control access with NTFS."
  ]
 },
 {
  "t": "Wireless security: WPA2 vs WPA3, AES vs TKIP, RADIUS, TACACS+, Kerberos, multifactor",
  "objectives": [
   "Students will be able to choose the strongest wireless protocol and cipher combination from a router's options.",
   "Students will be able to explain why Enterprise mode with 802.1X and RADIUS solves problems a shared passphrase cannot.",
   "Students will be able to compare RADIUS and TACACS+ by transport, encryption and typical use.",
   "Students will be able to describe how Kerberos tickets work and why clock synchronization matters."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Steer toward the idea that the problem is who knows the password, not how long it is."
   ],
   [
    12,
    "Teach",
    "Draw a timeline WEP, WPA, WPA2, WPA3 and mark broken versus current. Draw a second axis for ciphers, TKIP versus AES. Then sketch a laptop, access point, RADIUS server and directory to show 802.1X, and add a side-by-side RADIUS versus TACACS+ table. Close with a quick Kerberos ticket diagram."
   ],
   [
    18,
    "Activity",
    "Groups complete the router configuration challenge and the protocol role-play."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect Enterprise mode to offboarding."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "An office has used the same Wi-Fi password for four years and three people who know it no longer work there. Would making the password twice as long fix the problem? Why or why not?",
  "activity": {
   "title": "Router configuration challenge and AAA role-play",
   "materials": "Printed mock router settings screens (teacher-made, one per group), role cards, whiteboard.",
   "steps": [
    "Give each group four mock router screens for different clients: a home user with all-new devices, a home user with one old printer, a 40-person office with Active Directory, and a café offering guest access.",
    "Groups circle the protocol, cipher and mode they would select on each screen and write one sentence explaining why.",
    "For the office screen, groups role-play 802.1X: one student is the laptop, one the access point, one the RADIUS server and one the directory. They act out a successful sign-in and then a sign-in by a disabled former employee.",
    "Groups then receive two cards, 'engineer signing in to a core switch' and 'staff member joining Wi-Fi', and decide whether RADIUS or TACACS+ fits each.",
    "The teacher reviews choices and highlights clue words: SAE, AES, per-user, per-command, TCP and UDP."
   ]
  },
  "discussion": [
   "Why do many businesses keep WPA2/WPA3 transition mode turned on, and what risk does that accept?",
   "What does per-user Wi-Fi authentication make possible that a shared passphrase never can?",
   "Why would an organization want a log of every command an engineer types on a router?"
  ],
  "exit": [
   [
    "A router offers WPA2-TKIP, WPA2-AES and WPA3-SAE, and all devices support WPA3. Which do you choose?",
    "WPA3 with SAE, which uses AES-based encryption and resists offline guessing."
   ],
   [
    "Which AAA protocol uses UDP and encrypts only the password?",
    "RADIUS."
   ],
   [
    "What causes Kerberos authentication to fail when a PC's clock is far off?",
    "Kerberos tickets carry timestamps, so a large time difference makes them invalid."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page comparison chart of WPA2, WPA3, AES, TKIP, RADIUS and TACACS+ with one clue word each, and pair struggling students with a partner for the router screens.",
   "Extend: Ask students to write a short migration plan for an office moving from WPA2-Personal to WPA3-Enterprise, covering older devices, the RADIUS server, how MFA could protect VPN sign-ins and how they would communicate the change to staff."
  ]
 },
 {
  "t": "Malware: virus, trojan, rootkit, ransomware, keylogger, spyware, adware, cryptominer, boot sector virus, stalkerware, fileless malware; tools such as anti-malware, recovery console, EDR/MDR/XDR, email security gateways",
  "objectives": [
   "Students will be able to identify malware types from a description of their symptoms or behavior.",
   "Students will be able to explain why rootkits and boot sector viruses are removed from recovery or bootable media.",
   "Students will be able to distinguish EDR, MDR and XDR and describe the role of an email security gateway.",
   "Students will be able to recommend preventive controls that match a given malware type."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up symptoms aloud and let students call out guesses. Write the guesses on the board to revisit later."
   ],
   [
    12,
    "Teach",
    "Draw three columns on the board: how it spreads, how it hides, what it does. Place each malware type in a column as you explain it, with one symptom each. Then add a tools row: anti-malware, recovery environment, EDR, MDR, XDR and email security gateway."
   ],
   [
    18,
    "Activity",
    "Groups play the symptom diagnosis game, then match each diagnosis to a tool."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, including how to handle stalkerware sensitively."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A laptop's fan runs at full speed all night even though nobody is using it, and the battery dies by mid-morning. What could be happening, and what would you check first?",
  "activity": {
   "title": "Malware symptom diagnosis",
   "materials": "Printed symptom cards and malware type cards (teacher-made), sticky notes, whiteboard.",
   "steps": [
    "Give each group twelve symptom cards, such as 'files renamed with a note demanding payment', 'home page keeps changing and pop-ups appear', 'antivirus removes the same threat every reboot', 'my partner knows my messages', 'PowerShell launched by a spreadsheet, no files found' and 'free game came with a hidden backdoor'.",
    "Groups match each symptom to one malware type card and write the clue word that decided it.",
    "For each diagnosis, groups add a sticky note naming the best tool or action: real-time anti-malware, scan from recovery or bootable media, EDR isolation, restore from offline backup, email security gateway, or user training.",
    "Groups swap boards with a neighboring group and check each other's answers, flagging any they disagree with.",
    "The teacher resolves disagreements and emphasizes the EDR, MDR and XDR distinction."
   ]
  },
  "discussion": [
   "Why is behavior-based detection necessary for fileless malware?",
   "Why should a technician be careful about how and when stalkerware is removed?",
   "When would a small business choose an MDR service instead of buying EDR alone?"
  ],
  "exit": [
   [
    "Files are renamed and a payment note appears in each folder. Which malware type is this, and what is the best defense?",
    "Ransomware; tested offline or immutable backups, supported by patching and training."
   ],
   [
    "Why scan for a rootkit from bootable media?",
    "The rootkit hides from the running OS, so it can be seen and removed only when the infected OS is not running."
   ],
   [
    "Which of EDR, MDR and XDR is a managed service?",
    "MDR, managed detection and response."
   ]
  ],
  "differentiation": [
   "Support: Give students a reduced set of six symptom cards with one obvious clue word underlined on each, and a reference chart of malware types.",
   "Extend: Ask students to write a short incident summary for one scenario, explaining how the malware likely arrived, which tool detected it, how it was removed and which preventive control would have stopped it."
  ]
 },
 {
  "t": "Social engineering and threats: phishing, vishing, smishing, QR code phishing, whaling, impersonation, tailgating, shoulder surfing, dumpster diving, evil twin, DoS/DDoS, zero-day, on-path, brute force, insider threat, SQL injection, XSS, BEC, supply chain",
  "objectives": [
   "Students will be able to identify social engineering attacks by channel and target, including phishing, vishing, smishing, QR code phishing, whaling and BEC.",
   "Students will be able to distinguish technical threats such as evil twin, on-path, DoS/DDoS, brute force, zero-day, SQL injection and XSS.",
   "Students will be able to recommend a control that reduces each threat, such as out-of-band verification, account lockout or parameterized queries.",
   "Students will be able to respond appropriately to a simulated social engineering attempt."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up message aloud and ask students to list everything suspicious about it."
   ],
   [
    10,
    "Teach",
    "Build a board grid with rows for people-focused attacks (email, voice, text, QR, physical) and system-focused attacks (network, availability, passwords, web, vendor, insider). Fill in each term with one clue phrase and one defense."
   ],
   [
    20,
    "Activity",
    "Run the social engineering role-play stations. Groups rotate through three stations and score each response."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why urgency and authority work on people."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You receive this text: 'Your package could not be delivered. Confirm your address within 2 hours or it will be returned: [link].' What makes it suspicious, and what is this kind of attack called?",
  "activity": {
   "title": "Social engineering role-play stations",
   "materials": "Printed scripts and scenario cards for three stations (teacher-made), a desk set up as a reception area, sticky notes for scoring.",
   "steps": [
    "Station 1, Reception: one student plays a visitor in a vest asking for the network closet key, another plays the receptionist, who must verify before acting.",
    "Station 2, Help desk phone: one student plays a stressed caller claiming to be an executive needing a password reset, another plays the technician following identity verification.",
    "Station 3, Inbox: groups read five printed messages and label each as phishing, spear phishing, whaling, BEC, QR code phishing or legitimate, noting the clues.",
    "Observers at each station score the response on verification, calmness and correct terminology, using sticky notes.",
    "After rotation, groups match ten technical threat cards (evil twin, on-path, DDoS, brute force, zero-day, SQL injection, XSS, insider, supply chain, dumpster diving) to a defense card, and the teacher reviews."
   ]
  },
  "discussion": [
   "Why do urgency and authority make social engineering so effective, and how can a policy take that pressure off staff?",
   "How would you build a workplace culture where it feels safe to challenge someone without a badge?",
   "Why is BEC hard for technical email filters to stop?"
  ],
  "exit": [
   [
    "A phone caller claims to be from the help desk and asks for your password. What attack is this?",
    "Vishing, social engineering by voice call."
   ],
   [
    "A rogue Wi-Fi network uses the same name as the café's. What is it called?",
    "An evil twin."
   ],
   [
    "What is the defense against an emailed request to change a supplier's bank details?",
    "Out-of-band verification by calling the supplier on a known number already on file."
   ]
  ],
  "differentiation": [
   "Support: Provide a channel cheat sheet (email, voice, text, QR code, in person) and let students complete the inbox station with a partner before doing role-play.",
   "Extend: Ask students to write a one-page awareness tip sheet for staff covering five threats from the lesson, each with a recognition clue and a clear action, in plain language."
  ]
 },
 {
  "t": "The seven-step malware removal procedure, in order",
  "objectives": [
   "Students will be able to list the seven steps of the CompTIA malware removal procedure in order.",
   "Students will be able to explain why quarantine precedes disabling System Restore and why System Restore is re-enabled only after cleanup.",
   "Students will be able to identify the next step in a malware removal scenario.",
   "Students will be able to describe remediation techniques, including updating definitions, Safe Mode, preinstallation environments and reimaging."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record student suggestions on the board in the order given, without correcting them yet."
   ],
   [
    10,
    "Teach",
    "Present the seven steps with the mnemonic. For each step, give the reason it sits where it does, then return to the warm-up list and reorder it as a class."
   ],
   [
    20,
    "Activity",
    "Groups complete the step-card sequencing race and then the next-step scenario round."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about shortcuts and documentation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A coworker's computer is clearly infected with malware. List everything you think a technician should do to fix it, in the order you would do it.",
  "activity": {
   "title": "Step-card sequencing race and next-step scenarios",
   "materials": "Sets of seven printed step cards plus three distractor cards (teacher-made), printed scenario strips, whiteboard.",
   "steps": [
    "Give each group a shuffled set of the seven step cards plus three distractor cards, such as 'run System Restore to last week', 'reconnect to the network to download updates for all apps' and 'delete the user profile'.",
    "Groups race to put the seven real steps in order and set aside the distractors, then write one reason for each step's position.",
    "The teacher checks each group's order and awards a point for correct order and a point for each sound reason.",
    "Next, the teacher reads ten short scenario strips aloud, such as 'You updated definitions; what next?' and 'The PC is isolated; what next?', and groups hold up the step card that comes next.",
    "Close by asking groups where reimaging fits and why it does not skip the other steps."
   ]
  },
  "discussion": [
   "What could go wrong if a technician skips straight to scanning without quarantining the PC?",
   "Why might user education be the step that prevents the most future tickets?",
   "Why is documentation important throughout the procedure, not just at the end?"
  ],
  "exit": [
   [
    "You have confirmed malware symptoms. What is the next step?",
    "Quarantine the infected system by disconnecting it from the network and removable media."
   ],
   [
    "What must you do immediately before scanning?",
    "Update the anti-malware software's definitions and engine."
   ],
   [
    "Why is System Restore re-enabled only after the system is clean?",
    "So the new restore point does not capture the malware."
   ]
  ],
  "differentiation": [
   "Support: Give students the mnemonic printed on a card with the first word of each step, and let them sequence the cards with the card in view before trying from memory.",
   "Extend: Ask students to write a ticket note for a full malware removal, recording each step, what they observed and what they did, as if a supervisor were reviewing it."
  ]
 },
 {
  "t": "Workstation hardening: data-at-rest encryption, password policy, end-user best practices (screensaver locks, logging off), account management, disable AutoRun/AutoPlay, disable guest account",
  "objectives": [
   "Students will be able to match common workstation risks to the correct hardening control.",
   "Students will be able to explain why data-at-rest encryption, not a sign-in password, protects a stolen drive.",
   "Students will be able to describe the elements of a password policy and judge a sensible account lockout setting.",
   "Students will be able to apply account management practices such as least privilege, account expiration and disabling the Guest account."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers. Point out which ones are habits and which ones are settings."
   ],
   [
    12,
    "Teach",
    "Present the hardening checklist as risk and control pairs in a two-column table on the board. Demonstrate Windows key + L and, if a Windows PC is available on the projector, show where screen lock timeout and AutoPlay settings live."
   ],
   [
    18,
    "Activity",
    "Groups run the office walk-through audit and write a remediation plan."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about password policy and user habits."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your laptop is stolen from a coffee shop. It has a strong password. Can the thief read your files? What would actually stop them?",
  "activity": {
   "title": "Office walk-through audit",
   "materials": "Printed audit scenario sheet describing ten findings (teacher-made), sticky notes, whiteboard.",
   "steps": [
    "Give each group a sheet describing a walk-through of a small office with ten findings, such as an unlocked unattended PC, no disk encryption on laptops, Guest account enabled, former employees with active accounts, all users as local administrators, a password policy with no lockout, AutoPlay enabled and no UEFI password.",
    "Groups write the risk each finding creates and the hardening control that fixes it, one sticky note per finding.",
    "Groups rank the ten fixes by priority and justify their top three.",
    "Each group presents its top three, and the class compares priorities on the board.",
    "The teacher reviews any mismatched controls, such as a screensaver without a password, and confirms the exam clue words."
   ]
  },
  "discussion": [
   "Why might frequent forced password changes make security worse rather than better?",
   "How would you persuade users to lock their screens every time they step away?",
   "What is the risk of setting an account lockout threshold too low, and how would you choose a reasonable value?"
  ],
  "exit": [
   [
    "A laptop is stolen. Which control keeps the data unreadable?",
    "Data-at-rest encryption, such as BitLocker or FileVault."
   ],
   [
    "Which setting slows repeated password guessing?",
    "Account lockout after a set number of failed attempts."
   ],
   [
    "Name two account management practices from today's lesson.",
    "Any two of: standard accounts for daily use, disabling accounts of leavers, account expiration for temps, disabling Guest, renaming or disabling the built-in Administrator, changing default passwords."
   ]
  ],
  "differentiation": [
   "Support: Provide a matching sheet with the ten controls already listed so students only need to pair each finding with a control before ranking.",
   "Extend: Ask students to write a one-page hardening baseline for new laptops in the firm, listing each setting, how it is enforced (for example Group Policy) and how an auditor could verify it."
  ]
 },
 {
  "t": "Mobile device security: screen locks, remote wipe, locator apps, OS updates, device encryption, remote backup, MDM, BYOD vs corporate-owned",
  "objectives": [
   "Students will be able to explain how screen locks, device encryption and OS updates protect a mobile device.",
   "Students will be able to distinguish locator apps, remote wipe and remote backup and choose the right one for a scenario.",
   "Students will be able to compare BYOD, COPE, CYOD and corporate-owned models and the wipe options appropriate to each.",
   "Students will be able to describe how MDM enforces policy and compliance on mobile devices."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take quick answers, noting who mentions backups and who mentions erasing."
   ],
   [
    12,
    "Teach",
    "Draw a timeline of a lost phone: before loss (screen lock, encryption, enrollment, backup), at loss (locate, lock), and after (wipe, restore). Then draw a two-column table for BYOD versus corporate-owned, adding COPE and CYOD, with the wipe type each allows."
   ],
   [
    18,
    "Activity",
    "Groups work through the lost-device response cards and the ownership policy debate."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about privacy and policy."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you lost your phone today, what would you do in the first hour? What would you lose forever, and what would you get back?",
  "activity": {
   "title": "Lost-device response and ownership debate",
   "materials": "Printed incident cards (teacher-made), sticky notes, whiteboard.",
   "steps": [
    "Give each group six incident cards, each describing a lost, stolen or non-compliant device with details: owner (personal or company), MDM enrollment status, backup status and OS support status.",
    "For each card, groups write the response in order on sticky notes, such as locate, lock with message, selective or full wipe, block access, replace, or restore from backup.",
    "Groups flag any card where the response is impossible, such as a remote wipe on a device that was never enrolled, and explain what should have been done beforehand.",
    "Split the class into two sides for a short debate: one argues for BYOD, the other for COPE, for a 50-person company, covering cost, privacy and control.",
    "The teacher summarizes the debate and links each argument to the exam clue words."
   ]
  },
  "discussion": [
   "What should a BYOD policy tell employees about what the company can see and erase on their phones?",
   "Why should a phone that still works be retired when it stops receiving OS updates?",
   "How do compliance checks in MDM support a zero trust approach to company data?"
  ],
  "exit": [
   [
    "A lost BYOD phone holds company email and personal photos. What wipe should you use?",
    "A selective wipe that removes only the work profile, apps and data."
   ],
   [
    "Which tool shows where a misplaced tablet is and can make it play a sound?",
    "A locator app."
   ],
   [
    "Why must remote wipe be set up before a device is lost?",
    "The device must already be enrolled and able to receive the command."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart card for lost devices (Is it enrolled? Who owns it? Is data backed up?) to use while working through the incident cards.",
   "Extend: Ask students to draft a one-page mobile device policy for a small company that covers screen lock requirements, OS update rules, ownership model, wipe rules and what happens to jailbroken devices."
  ]
 },
 {
  "t": "Data destruction: shredding, drilling, degaussing, incineration; erasing/wiping vs low-level vs standard format; certificates of destruction",
  "objectives": [
   "Students will be able to choose between sanitizing and physically destroying media based on reuse plans and data sensitivity.",
   "Students will be able to explain why degaussing works on magnetic media but not on SSDs, flash or optical discs.",
   "Students will be able to compare standard format, full format, low-level format and wiping in terms of data recoverability.",
   "Students will be able to describe the purpose and contents of a certificate of destruction."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a quick vote. Reveal that the data is usually recoverable."
   ],
   [
    12,
    "Teach",
    "Draw a decision tree on the board: Will the device be reused? If yes, sanitize (wipe, secure erase, cryptographic erase). If no, destroy (shred, drill, incinerate, degauss for magnetic media). Add a media-type check at each branch. Then compare the format types and finish with the certificate of destruction."
   ],
   [
    18,
    "Activity",
    "Groups work through the disposal desk activity, routing each item to a method and filling out a mock certificate."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on cost, reuse and proof."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You quick-format a USB stick full of personal photos and give it to a friend. Could your friend get the photos back? Why or why not?",
  "activity": {
   "title": "The disposal desk",
   "materials": "Printed item cards describing devices (teacher-made), a blank mock certificate of destruction template on the board or on paper, sticky notes.",
   "steps": [
    "Give each group ten item cards, such as 'HDD from payroll server, not reused', 'SSD laptop going to a school', 'backup tapes with tax records', 'USB flash drives from a lab', 'leased desktop with HDD returning to lessor', 'paper personnel files' and 'self-encrypting drive being redeployed internally'.",
    "Groups decide for each item whether to sanitize or destroy, and name the specific method, writing it on a sticky note.",
    "Groups flag any card where degaussing would be wrong and explain why.",
    "Each group fills out a mock certificate of destruction for two destroyed items, listing serial number, method, date and who witnessed it.",
    "The teacher reviews answers, emphasizing media type, reuse plans and why the certificate matters for compliance."
   ]
  },
  "discussion": [
   "When might an organization destroy a drive that could safely have been wiped and reused, and is that a good decision?",
   "Why do SSDs need different sanitization methods than hard disk drives?",
   "What could happen to an organization that cannot prove its old drives were destroyed?"
  ],
  "exit": [
   [
    "Which method is ineffective on SSDs: shredding, secure erase or degaussing?",
    "Degaussing, because SSDs do not store data magnetically."
   ],
   [
    "A drive will be donated. Should you format it, wipe it or shred it?",
    "Wipe it, or use the manufacturer secure erase, so it can be reused safely; a format leaves data recoverable and shredding prevents reuse."
   ],
   [
    "What three details should a certificate of destruction include?",
    "Which devices (often by serial number), the destruction method and the date."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-question decision card (Will it be reused? Is it magnetic or flash?) for students to apply to each item card.",
   "Extend: Ask students to write a short media disposal policy for a clinic, covering each media type, who approves destruction, when a vendor is used and how certificates are stored with asset records."
  ]
 },
 {
  "t": "SOHO router hardening: default passwords, firmware updates, disabling WPS and UPnP, content filtering, port forwarding, DHCP reservations, guest networks",
  "objectives": [
   "Students will be able to list the hardening steps for a new SOHO router in a sensible order, starting with the default admin password.",
   "Students will be able to explain why WPS and UPnP should be disabled and identify the symptoms of each being abused.",
   "Students will be able to configure (on paper) a port forward paired with a DHCP reservation and explain why the reservation is needed.",
   "Students will be able to choose between a guest network, content filtering and a screened subnet for a given small-office requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question on the projector. Collect three or four answers aloud and list them on the whiteboard as 'risks we already know'."
   ],
   [
    12,
    "Teach",
    "Walk through the hardening sequence: admin credentials and remote management, firmware, WPS and UPnP, port forwarding with DHCP reservations, filtering, guest and IoT networks. For each, say what the default is, why it is risky, and what the exam clue word looks like."
   ],
   [
    18,
    "Activity",
    "Run the 'Harden the closet router' card activity in groups of three, then have each group read its final configuration aloud."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare groups' choices, especially where they disagreed about MAC filtering and hidden SSIDs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door."
   ]
  ],
  "warmup": "If you bought a new home router today and plugged it in without changing anything, what could a stranger on the internet, or a neighbor in range, do with it?",
  "activity": {
   "title": "Harden the closet router",
   "materials": "Printed 'router status page' handouts the teacher makes (one per group) showing default settings, a set of printed requirement cards, whiteboard markers, sticky notes.",
   "steps": [
    "Give each group a mock router status page listing: default admin password, remote management on, firmware two years old, WPS on, UPnP on with two unknown port mappings, one SSID shared by staff and guests, and no reservations.",
    "Hand each group three requirement cards, for example 'vendor must reach the camera recorder on one port', 'patients need Wi-Fi', 'block known malware sites'.",
    "Groups write the setting changes they would make on sticky notes, one change per note, and arrange them in the order they would perform them.",
    "Each group must show the port forward and the DHCP reservation it requires on the same note pair, including the device MAC address from the handout.",
    "Groups swap boards and look for one missing step or one weak control (such as relying on a hidden SSID) in the other group's plan.",
    "The teacher reviews the ideal order on the whiteboard and asks each group to justify one choice."
   ]
  },
  "discussion": [
   "Why might a small business owner resist disabling UPnP, and how would you explain the trade-off to them?",
   "When would you recommend replacing a router instead of continuing to harden it?",
   "Is a guest network enough for smart TVs and cameras, or should they have their own segment? What changes your answer?"
  ],
  "exit": [
   [
    "What should you change first on a newly installed SOHO router?",
    "The default administrator username and password."
   ],
   [
    "A camera's port forward stopped working after a power outage. What was missing?",
    "A DHCP reservation or static IP, so the camera got a new address and the rule points to the wrong place."
   ],
   [
    "Which feature lets malware open router ports without approval, and which has a PIN that can be brute-forced?",
    "UPnP opens ports automatically; WPS has the guessable PIN."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column card that pairs each feature (WPS, UPnP, port forwarding, guest network, content filtering) with a plain-language description, and let them match these before attempting the ordering task.",
   "Extend: Ask fast finishers to design a three-segment layout (staff, guest, IoT) for the dental office and explain which traffic is allowed between segments and why a screened subnet might replace the port forward."
  ]
 },
 {
  "t": "Browser security: trusted sources and hash checks, extensions, password managers, certificates, pop-up blockers, clearing cache, private browsing, profile sync",
  "objectives": [
   "Students will be able to verify a downloaded file by comparing a computed hash with a published value.",
   "Students will be able to evaluate a browser extension's requested permissions and decide whether to install it.",
   "Students will be able to explain what private browsing, the padlock and clearing the cache do and do not protect against.",
   "Students will be able to recommend a password manager and profile sync setup that is safe for a work device."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick show of hands, then write the common beliefs on the whiteboard to revisit later."
   ],
   [
    12,
    "Teach",
    "Explain trusted sources and hashes, extension permissions, password managers, certificates and the padlock, pop-up blockers, cache clearing, private browsing and sync. Project an example permission prompt and a certificate warning and talk through each."
   ],
   [
    18,
    "Activity",
    "Run 'Myth or fact: browser edition' with hash comparison practice, in pairs."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up beliefs on the whiteboard and ask pairs which ones they would now correct."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "True or false: if you use private browsing mode, your employer cannot see which websites you visit. Explain your answer in one sentence.",
  "activity": {
   "title": "Myth or fact: browser edition",
   "materials": "Printed statement cards (about 12), printed sheets with pairs of published and computed SHA-256 strings (some matching, some differing by one character), student laptops with a browser, projector.",
   "steps": [
    "Give each pair a stack of statement cards such as 'The padlock means the site is safe', 'Clearing cookies signs you out', 'A password manager will not fill on a look-alike domain', 'Hidden extensions cannot read pages'.",
    "Pairs sort cards into Myth and Fact piles and write a one-line correction on each myth card.",
    "Hand out the hash sheets. Pairs compare each published and computed hash and mark which downloads are safe to install, noting that one character of difference means reject.",
    "On laptops, pairs open their browser's extension page and an extension store listing (without installing), and write down the permissions one popular extension requests and whether that seems reasonable for its purpose.",
    "Pairs open their browser's certificate viewer by clicking the site information icon on any HTTPS site and record the issuer and expiration date.",
    "The teacher reveals the answers and asks pairs to explain one myth they had believed."
   ]
  },
  "discussion": [
   "Why might a legitimate extension become dangerous months after you installed it?",
   "What are the trade-offs of letting a browser's built-in password manager sync passwords across devices compared with a standalone manager?",
   "How would you explain to a non-technical user why a certificate warning on a login page should stop them?"
  ],
  "exit": [
   [
    "What does it mean if a downloaded file's hash does not match the vendor's published hash?",
    "The file was altered or corrupted, so it should not be installed."
   ],
   [
    "Name one thing private browsing does not protect against.",
    "It does not hide activity from the network, employer, ISP or websites, and does not stop malware."
   ],
   [
    "What does a valid padlock prove?",
    "That the connection is encrypted to the domain named in the certificate, not that the site is honest."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card that lists each feature with one line on what it does and one line on what it does not do, and let students use it during the myth sort.",
   "Extend: Ask fast finishers to compute a real hash of a small file on their laptop using Get-FileHash or shasum, change one character in the file, recompute, and explain the result to the class."
  ]
 },
 {
  "t": "Windows symptoms: blue screen (BSOD), degraded performance, boot problems, frequent shutdowns, services not starting, application crashes, low memory warnings, USB controller resource warnings, system instability, no OS found, slow profile load, time drift",
  "objectives": [
   "Students will be able to match each listed Windows symptom to its most common causes.",
   "Students will be able to distinguish symptoms that usually indicate hardware (sudden shutdowns, clock resets) from those that usually indicate software (driver BSODs, service failures).",
   "Students will be able to explain why time drift causes Kerberos sign-in and certificate errors.",
   "Students will be able to choose the first diagnostic step for a symptom scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud. Students write a guess, then share two or three answers."
   ],
   [
    12,
    "Teach",
    "Walk through the symptom map on the whiteboard in three columns: crashes and instability, performance and services, boot and sign-in. Add USB controller warnings and time drift as a fourth column. For each, name the top two causes and the first check."
   ],
   [
    18,
    "Activity",
    "Run 'Symptom triage desk' with ticket cards in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, focusing on cases where groups split between hardware and software."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Your computer's clock is wrong every Monday morning after the office turns off power over the weekend. What part would you bet on, and why?",
  "activity": {
   "title": "Symptom triage desk",
   "materials": "Printed ticket cards (12 to 15) each describing one symptom in user language, a printed 'cause' card deck, whiteboard divided into Hardware, Software and Either.",
   "steps": [
    "Give each group a stack of ticket cards written as users would describe them, for example 'Blue screen with a code that mentions a network file after yesterday's update' or 'PC just turns off when I render video'.",
    "Groups match each ticket to the most likely cause card and place it in the Hardware, Software or Either column on their desk.",
    "For each ticket, the group writes the first check they would perform on a sticky note (for example 'check boot order and remove USB drive').",
    "The teacher reads out two curveball tickets (time drift causing sign-in failure, temporary profile) and groups decide quickly.",
    "Groups present one ticket each and defend their column choice; the class votes on whether they agree.",
    "The teacher reveals the expected answers and highlights clue words that point to each cause."
   ]
  },
  "discussion": [
   "Why is 'what changed recently' such a powerful first question for BSODs and instability?",
   "A symptom such as slow performance has many causes. How would you decide which to test first?",
   "Why might a user report a time drift problem as 'I cannot log in' instead of 'my clock is wrong'?"
  ],
  "exit": [
   [
    "A PC shuts off suddenly under load with no blue screen. Name the two most likely causes.",
    "Overheating or a failing power supply."
   ],
   [
    "What should you check first when a PC says no OS found?",
    "The boot order and any USB drive or disc left attached."
   ],
   [
    "Why does a large clock difference break domain sign-in?",
    "Kerberos requires the client and domain controller clocks to be close, so tickets are rejected."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially filled symptom-to-cause table with one cause already filled in for each symptom, so they only need to add a second cause and a first check.",
   "Extend: Ask fast finishers to write two new ticket cards in user language that would mislead a technician (for example a sign-in failure caused by time drift) and swap them with another group."
  ]
 },
 {
  "t": "Windows fixes: reboot, restart services, uninstall/reinstall/update apps, add resources, verify requirements, sfc and DISM, repair Windows, System Restore, reimage, roll back updates, rebuild the user profile",
  "objectives": [
   "Students will be able to order common Windows fixes from least to most disruptive.",
   "Students will be able to explain the sfc, DISM, sfc sequence and what each command repairs.",
   "Students will be able to select the appropriate fix (rollback, System Restore, profile rebuild, reimage) for a described cause.",
   "Students will be able to state what System Restore does and does not change."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students vote by raising hands for each option, then record the split on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw a ladder on the whiteboard from 'Restart' at the bottom to 'Reimage' at the top. Add each fix as a rung, explaining when it fits, what it costs the user, and the exam clue word. Write the sfc, DISM, sfc commands and explain the component store."
   ],
   [
    18,
    "Activity",
    "Run 'Climb the fix ladder' in pairs using scenario cards."
   ],
   [
    5,
    "Discuss",
    "Discuss when it is reasonable to skip rungs and go straight to a drastic fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A user deleted an important spreadsheet yesterday. A coworker suggests running System Restore to get it back. Will that work? Vote yes or no.",
  "activity": {
   "title": "Climb the fix ladder",
   "materials": "Printed scenario cards (10), a printed fix ladder sheet per pair listing the fixes from restart to reimage, sticky notes, projector for the answer key.",
   "steps": [
    "Give each pair a fix ladder sheet and a stack of scenario cards, such as 'Start menu broken on one account only', 'sfc reports it could not repair some files', 'App crashes on every PC since last night's update', 'Malware keeps returning after three cleanups'.",
    "Pairs place each scenario card next to the rung they would try first and write the reason on a sticky note.",
    "For two scenarios, pairs write the exact steps in order (for example: back up data, sign in as another admin, rename the profile folder, remove the ProfileList entry, sign the user in, copy data back).",
    "Pairs identify any scenario where they must back up data before acting and mark it with a star.",
    "The teacher projects the answer key and pairs score themselves, discussing any disagreements.",
    "Each pair shares one scenario where their first instinct would have been a more drastic fix."
   ]
  },
  "discussion": [
   "What information in a ticket tells you that a problem follows the user rather than the machine?",
   "When might reimaging actually be faster and safer than careful troubleshooting?",
   "Why does it matter to pause updates after rolling one back?"
  ],
  "exit": [
   [
    "sfc says it could not fix some files. What do you run next, and then what?",
    "DISM /Online /Cleanup-Image /RestoreHealth, then sfc /scannow again."
   ],
   [
    "An app broke on all PCs right after a quality update. What is the most direct fix?",
    "Uninstall (roll back) that update and pause updates until the vendor provides a fix."
   ],
   [
    "What does System Restore leave untouched?",
    "Personal files such as documents, photos and email."
   ]
  ],
  "differentiation": [
   "Support: Provide a version of the ladder sheet with each rung's 'use when' clue already printed, so students only need to match scenarios to clues.",
   "Extend: Ask fast finishers to write a short ticket note documenting a profile rebuild, including backup, steps, verification with the user and root cause, as if handing it to the next shift."
  ]
 },
 {
  "t": "Using Event Viewer, Reliability Monitor, Task Manager and Safe Mode / Windows Recovery Environment to find root causes",
  "objectives": [
   "Students will be able to choose the right Windows diagnostic tool for a described question (now, logged, changed, will not boot).",
   "Students will be able to identify which Event Viewer log (Application, System, Security) holds a given type of event.",
   "Students will be able to interpret a short Reliability Monitor or Event Viewer excerpt to propose a root cause.",
   "Students will be able to describe how to reach Safe Mode and WinRE and what each is used for."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers aloud; write each tool students name on the whiteboard."
   ],
   [
    12,
    "Teach",
    "On student laptops or the projector, open Event Viewer, Reliability Monitor and Task Manager on a Windows PC if available and point out each log, the stability chart and the tabs. Walk through the WinRE Advanced options menu using a projected screenshot or a drawn diagram."
   ],
   [
    18,
    "Activity",
    "Run 'Log detectives' in groups of three using printed log excerpts."
   ],
   [
    5,
    "Discuss",
    "Discuss which tool each group reached for first and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If a PC crashed at 3 a.m. last Tuesday, which Windows tool could tell you about it today, and which tool definitely could not?",
  "activity": {
   "title": "Log detectives",
   "materials": "Printed case folders the teacher makes (one per group) containing a user complaint, a mock Reliability Monitor week, a short Event Viewer excerpt with levels, sources and Event IDs, and a Task Manager screenshot description; whiteboard; sticky notes.",
   "steps": [
    "Give each group a case folder, for example: random restarts with Kernel-Power Event ID 41 entries and no installs; app crashes beginning the day a plug-in was installed; a service that fails at boot with a dependency error; repeated failed sign-ins at night.",
    "Groups first write which tool they would open first for their case and why, before reading the evidence.",
    "Groups read the evidence and write a root-cause statement and the next action on a sticky note.",
    "Groups note which log (Application, System, Security) each excerpt came from.",
    "Each group presents its case in two minutes; other groups challenge any tool choice they disagree with.",
    "The teacher confirms the answers and adds the clue word for each case to the whiteboard."
   ]
  },
  "discussion": [
   "Why might a technician skip Reliability Monitor and miss an obvious cause?",
   "When is Safe Mode not enough, so you need the Windows Recovery Environment?",
   "How would you document Event Viewer findings in a ticket so that another technician can use them?"
  ],
  "exit": [
   [
    "Which log records a service that failed to start at boot?",
    "The System log in Event Viewer."
   ],
   [
    "Which tool shows crashes and software installs on the same timeline?",
    "Reliability Monitor."
   ],
   [
    "A PC will not reach the desktop. Which environment do you use, and name one tool in it.",
    "WinRE; Startup Repair, System Restore, Uninstall Updates, Startup Settings or Command Prompt."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page tool chooser with four questions (now, logged, changed, will not boot) and the matching tool, and pair them with a confident partner for the case work.",
   "Extend: Ask fast finishers to create a custom view in Event Viewer on a lab PC (or write the filter steps on paper) that shows only Critical and Error events from the System log in the last 24 hours."
  ]
 },
 {
  "t": "Mobile OS and app issues: app fails to launch, close or update; slow response; poor battery life; random reboots; Bluetooth, Wi-Fi and NFC connectivity; screen won't autorotate",
  "objectives": [
   "Students will be able to order mobile troubleshooting steps from least to most disruptive.",
   "Students will be able to identify the first check for common mobile symptoms such as autorotate failure, failed updates and battery drain.",
   "Students will be able to explain the difference between clearing cache, clearing data, offloading and reinstalling an app.",
   "Students will be able to troubleshoot Bluetooth, Wi-Fi and NFC connectivity problems and state the side effects of resetting network settings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Students share real phone problems they have had and how they solved them; list them on the whiteboard."
   ],
   [
    10,
    "Teach",
    "Draw the mobile fix ladder on the whiteboard. Walk through each symptom category (apps, performance and battery, reboots, connectivity, rotation) and map it to the ladder, naming the first check and the exam clue words."
   ],
   [
    20,
    "Activity",
    "Run 'Help desk phone role-play' in pairs, swapping roles halfway."
   ],
   [
    5,
    "Discuss",
    "Discuss which scenarios tempted students to jump to a factory reset."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Think of the last time your phone or a family member's phone misbehaved. What did you try first, and did it work?",
  "activity": {
   "title": "Help desk phone role-play",
   "materials": "Printed caller cards (one symptom each plus hidden 'true cause' details for the caller), printed technician checklists showing the fix ladder, a timer on the projector, students' own phones optional for locating settings.",
   "steps": [
    "Pair students: one is the caller, one is the technician. Give the caller a card such as 'My tablet will not turn sideways' with the hidden cause 'rotation lock is on'.",
    "The technician asks questions and suggests steps in ladder order, without seeing the card; the caller answers only from the card.",
    "After each call (about three minutes), the pair records the number of steps taken and whether the technician skipped to a drastic fix.",
    "Swap roles and use new cards (for example a Bluetooth headset still paired to a laptop, an app failing to update because of low storage, battery drain from a background app with always-on location).",
    "Optional: students locate the battery usage screen, rotation lock and reset network settings option on their own phones without changing anything.",
    "The class shares the quickest correct resolution and the teacher highlights the clue words in each card."
   ]
  },
  "discussion": [
   "Why do support desks often ask callers to restart the device before anything else, and when is that frustrating for users?",
   "What would you tell a user before clearing app data or resetting network settings?",
   "How would you decide whether random reboots are a software problem or a hardware problem?"
  ],
  "exit": [
   [
    "A screen will not autorotate. What is the first thing to check?",
    "Rotation lock in the control center or quick settings."
   ],
   [
    "What does clearing an app's data do that clearing its cache does not?",
    "It resets the app to a fresh state, removing settings and sign-in."
   ],
   [
    "What is removed when you reset network settings?",
    "Saved Wi-Fi networks, Bluetooth pairings and VPN settings."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed fix ladder with one example symptom next to each rung, and let them keep it in front of them during the role-play.",
   "Extend: Ask fast finishers to write a short knowledge base article for nurses titled 'Phone battery drains by noon' with steps in order and a note on when to bring the device to IT."
  ]
 },
 {
  "t": "Mobile security issues: unofficial app stores, jailbreaking and rooting, sideloaded APKs, high network traffic, data-limit alerts, sluggish response, fake security warnings, unexpected app behavior, leaked personal files",
  "objectives": [
   "Students will be able to classify mobile security items as causes (unofficial stores, sideloading, jailbreaking, rooting) or symptoms (high data use, sluggishness, fake warnings, unexpected app behavior, leaked files).",
   "Students will be able to explain why jailbreaking and rooting weaken a device's security model and how MDM responds.",
   "Students will be able to verify a suspected compromise using data usage, battery usage and app permission screens.",
   "Students will be able to sequence the response to a compromised phone, including restoring personal data only and changing passwords from a clean device."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up scenario on the projector and ask students to vote: busy month or malware. Ask two students to explain their vote."
   ],
   [
    12,
    "Teach",
    "Draw two columns on the whiteboard, Causes and Symptoms. Teach each item, explaining the app store and sandbox protections and how each cause weakens them. Then teach the verification screens and the response sequence."
   ],
   [
    18,
    "Activity",
    "Run 'Cause or symptom card sort and response chain' in groups of three."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, including the user-safety concern around stalkerware."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A company phone hit its monthly data limit in two weeks, and the user says nothing changed. List one innocent explanation and one security explanation.",
  "activity": {
   "title": "Cause or symptom card sort and response chain",
   "materials": "Printed cards the teacher makes: about 10 item cards (sideloaded APK, rooting, data-limit alert, fake virus pop-up, apps opening on their own, and so on), a set of shuffled response-step cards, whiteboard, tape.",
   "steps": [
    "Groups sort item cards into Causes and Symptoms and tape them under the matching whiteboard column.",
    "For each symptom card, the group writes one innocent explanation and the screen they would check to verify it (data usage, battery usage, installed apps, permissions).",
    "Give each group the shuffled response-step cards (disconnect, review apps and admin or accessibility privileges, update OS, scan, back up personal data only, factory reset, change passwords from a clean device, enable MFA, apply MDM policy).",
    "Groups arrange the response cards in a sensible order and mark the one step most often done wrong.",
    "Groups compare orders with a neighboring group and resolve any differences with a short justification.",
    "The teacher reveals a model order and discusses why personal data, not apps, is restored."
   ]
  },
  "discussion": [
   "Why do some users choose to jailbreak or root their phones, and how would you explain the trade-off without lecturing?",
   "How should a technician handle a case where a user may be the target of stalkerware installed by someone they know?",
   "What MDM policies would you recommend for a small business that allows staff to use company phones for personal apps?"
  ],
  "exit": [
   [
    "Is sideloading a cause or a symptom, and why is it risky?",
    "A cause; it installs apps from outside the official store, skipping security screening."
   ],
   [
    "After resetting a compromised phone, what should you restore?",
    "Personal data only, not apps, which could bring the malware back."
   ],
   [
    "What is the correct response to a pop-up saying the phone is infected?",
    "Close it without tapping; it is scareware, so do not install anything or call the number."
   ]
  ],
  "differentiation": [
   "Support: Give students the card sort with the first two cards already placed and a short definition printed on the back of each card.",
   "Extend: Ask fast finishers to draft three MDM compliance rules (for example block unknown sources, detect jailbreak or root, require a minimum OS version) and explain the user experience when each rule fails."
  ]
 },
 {
  "t": "PC security issues: unable to reach the network, fake antivirus alerts, altered or missing system files, unwanted OS notifications, failed OS updates",
  "objectives": [
   "Students will be able to recognize the listed PC symptoms as possible signs of malware and name everyday causes to rule out.",
   "Students will be able to explain how malware uses the hosts file, DNS settings and proxies to block security sites.",
   "Students will be able to recite the seven steps of the CompTIA malware removal procedure in order.",
   "Students will be able to distinguish a genuine security alert from rogue antivirus and browser notifications."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt. Students write their answer and compare with a neighbor."
   ],
   [
    12,
    "Teach",
    "Teach each symptom with its malware explanation and its innocent explanation. Project a sample hosts file with a few loopback entries and explain what they do. Write the seven-step procedure on the whiteboard and introduce the mnemonic."
   ],
   [
    18,
    "Activity",
    "Run 'Infected or not' evidence stations in groups of three."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, focusing on why fixing a symptom is not enough."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A PC can open news sites but not the antivirus vendor's site or Windows Update. Is the internet broken? What else could explain this?",
  "activity": {
   "title": "Infected or not: evidence stations",
   "materials": "Printed evidence cards for four stations the teacher makes (a hosts file excerpt, an ipconfig output with unusual DNS servers, a fake antivirus pop-up description, a Windows Update history showing repeated failures with low disk space), seven shuffled procedure-step cards per group, whiteboard.",
   "steps": [
    "Set up four stations around the room, each with one evidence card and a question: 'Malware, or an ordinary fault? What is your evidence?'",
    "Groups rotate every three minutes, writing their verdict and reasoning on a sticky note at each station.",
    "After rotating, groups return to their desks and put the seven procedure-step cards in order.",
    "The teacher reads out a short scenario and each group names the step they would be on at each moment (for example 'you just confirmed malware' leads to quarantine).",
    "The class reviews the station sticky notes, and the teacher highlights the station with a non-malware cause (low disk space) to stress verification.",
    "Groups write the mnemonic from memory and check it against the board."
   ]
  },
  "discussion": [
   "Why does malware so often target update services and security websites first?",
   "How would you calmly explain to a user who already called the number on a fake alert what needs to happen next?",
   "When would you stop cleaning a PC and reimage it instead?"
  ],
  "exit": [
   [
    "List the seven malware removal steps in order.",
    "Investigate and verify, quarantine, disable System Restore, remediate, schedule scans and run updates, enable System Restore and create a restore point, educate the user."
   ],
   [
    "Why would malware add entries pointing security domains to 127.0.0.1 in the hosts file?",
    "To block those sites so the PC cannot update its antivirus or download fixes."
   ],
   [
    "Where do genuine security alerts on a Windows PC come from?",
    "Windows Security or the organization's managed antivirus, not browser pop-ups with phone numbers."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed copy of the seven steps with blanks for students to fill in, and a glossary card for hosts file, DNS and proxy.",
   "Extend: Ask fast finishers to compare their own laptop's hosts file and proxy settings (read-only) with the evidence card and write a two-sentence description of what a clean configuration looks like."
  ]
 },
 {
  "t": "Browser security issues: random pop-ups, certificate warnings, redirection, degraded browser performance",
  "objectives": [
   "Students will be able to name harmless and malicious causes for each of the four browser symptoms.",
   "Students will be able to use the number of affected sites to diagnose certificate warnings, starting with the system clock.",
   "Students will be able to trace redirection to an extension, the hosts file, PC DNS settings, router DNS settings or a proxy.",
   "Students will be able to locate a resource-hungry tab or extension using the browser's task manager."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a few answers. Write 'one site' and 'every site' on the whiteboard as headings."
   ],
   [
    12,
    "Teach",
    "Walk through each symptom with its harmless and malicious causes. Project a certificate warning and show how to view the certificate details. Demonstrate the browser task manager on the projector."
   ],
   [
    18,
    "Activity",
    "Run 'Browser ER' diagnosis cards in pairs, with a hands-on browser task manager step."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, especially the difference between one PC and the whole network being affected."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If one website shows a security warning, you might blame the website. What would you suspect if every website showed the same warning?",
  "activity": {
   "title": "Browser ER",
   "materials": "Printed patient cards the teacher makes (8 browser scenarios with clues such as clock date, number of affected devices, extension list), a printed decision flow for each symptom, student laptops with a browser, projector.",
   "steps": [
    "Give each pair a set of patient cards, for example 'warnings on every site, clock shows a date years ago', 'searches go through an unknown engine, new extension installed yesterday', 'every PC in the office redirected, phones on cellular fine', 'fan loud on one site, tab using high CPU'.",
    "Pairs write a diagnosis and the first two actions for each card, using the decision flow if needed.",
    "On laptops, pairs open the browser's task manager (Shift+Esc in Chromium-based browsers, or the equivalent menu item) and record which tab or extension uses the most memory.",
    "Pairs click the site information icon on an HTTPS site and record the certificate issuer and validity dates, then discuss what a name mismatch would look like.",
    "Pairs swap two cards with another pair and check each other's diagnoses.",
    "The teacher reviews the cards and asks which clue was decisive for each."
   ]
  },
  "discussion": [
   "Why is checking the clock such a good first step for widespread certificate warnings?",
   "How would you explain to a user why they should not click through a certificate warning, even on a site they use every day?",
   "What would make you look at the router instead of the user's PC when fixing redirection?"
  ],
  "exit": [
   [
    "Certificate warnings appear on almost every site. What do you check first?",
    "The system date and time."
   ],
   [
    "Every device in an office is redirected to fake sites. Where do you look?",
    "The router's DNS settings."
   ],
   [
    "Which tool shows which tab or extension is using the most CPU in the browser?",
    "The browser's built-in task manager."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column chart with 'harmless cause' and 'security cause' already filled in for one symptom, so they can model the other three.",
   "Extend: Ask fast finishers to open certmgr.msc on a Windows laptop (read-only), find the Trusted Root Certification Authorities store, and explain why an unknown entry there would let interception happen without a warning."
  ]
 },
 {
  "t": "Checking and repairing startup items, scheduled tasks, browser extensions and proxy settings after an infection",
  "objectives": [
   "Students will be able to define persistence and list the common Windows persistence locations.",
   "Students will be able to inspect a scheduled task's triggers and actions and judge whether it is malicious.",
   "Students will be able to check browser extensions, settings, sync and policies across all installed browsers after an infection.",
   "Students will be able to verify proxy, WinHTTP proxy, DNS and hosts settings and know when to reimage instead."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario and ask students to guess where the malware is hiding; write guesses on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Walk through each location with a projected screenshot or a drawn diagram: Startup apps, Startup folders, Run keys, services, Task Scheduler, browser extensions and sync, proxy, WinHTTP, DNS, hosts. Show the code block of commands and explain what each opens or reports."
   ],
   [
    18,
    "Activity",
    "Run 'Find the roots' with printed system snapshots in groups of three."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, including when to stop cleaning and reimage."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "A technician deleted a malware file, but the pop-ups came back after a restart. Name two things that could have brought them back.",
  "activity": {
   "title": "Find the roots",
   "materials": "Printed 'system snapshot' packets the teacher makes for each group: a Startup apps list, a Run key listing, a short Task Scheduler task list with triggers and actions, an extension list for two browsers, output of netsh winhttp show proxy, and a hosts file excerpt; highlighters; sticky notes.",
   "steps": [
    "Give each group a snapshot packet with three or four planted persistence items among many legitimate ones (for example a task named like an updater running a script from AppData every 30 minutes).",
    "Groups highlight every suspicious item and write on a sticky note why it is suspicious (no publisher, random name, temp or AppData path, unknown proxy server).",
    "Groups list the removal order and the verification steps (reboot twice, full scan, check sync).",
    "Groups swap packets with another group and look for any planted item the first group missed.",
    "The teacher reveals the planted items and counts how many each group found.",
    "The class agrees on a short post-infection checklist written on the whiteboard."
   ]
  },
  "discussion": [
   "Why do attackers name scheduled tasks to resemble legitimate updaters?",
   "How does browser profile sync help and hurt during malware cleanup?",
   "At what point would you recommend reimaging instead of continuing to hunt for persistence?"
  ],
  "exit": [
   [
    "Name three places malware can use to start automatically on Windows.",
    "Any three of: Startup apps, Startup folders, Run registry keys, services, scheduled tasks, browser extensions."
   ],
   [
    "Which command shows the proxy used by Windows services?",
    "netsh winhttp show proxy."
   ],
   [
    "A removed extension reappears after sign-in on another device. What is a likely cause?",
    "Browser profile sync restoring it from the account."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist with each persistence location and one sentence describing what a suspicious entry looks like, so students can work through the packet item by item.",
   "Extend: Ask fast finishers to run Autoruns or open Task Scheduler on a lab PC (view only) and identify three legitimate scheduled tasks, explaining how they would tell those apart from a malicious one."
  ]
 },
 {
  "t": "Ticketing systems: user and device information, descriptions, categories, severity, escalation levels, clear progress notes and resolutions",
  "objectives": [
   "Students will be able to write a ticket description that includes user information, device information, exact symptoms, timing, scope and steps already tried.",
   "Students will be able to assign a category and a severity or priority based on impact and urgency.",
   "Students will be able to decide when to escalate a ticket and what to include when escalating.",
   "Students will be able to write clear, blame-free progress notes and a resolution with root cause, fix and user verification."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up ticket and ask students what is missing. List their answers on the whiteboard."
   ],
   [
    10,
    "Teach",
    "Walk through each part of a good ticket: user and device information, description, category, severity and priority, escalation tiers, progress notes, resolution. Show a weak and a strong version of the same ticket side by side."
   ],
   [
    20,
    "Activity",
    "Run 'Help desk handoff' role-play in groups of three, rotating roles."
   ],
   [
    5,
    "Discuss",
    "Discuss which handoffs went smoothly and what information was missing in the others."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Here is a real-looking ticket: 'Email broken. Please fix ASAP.' If you had to pick this up, what three questions would you have to ask before you could start?",
  "activity": {
   "title": "Help desk handoff",
   "materials": "Printed user scenario cards with hidden details (name, location, asset tag, error message, when it started, who else is affected), blank printed ticket forms with fields for user, device, description, category, priority, notes and resolution, a projector for sample answers.",
   "steps": [
    "In each group, one student plays the user (holding a scenario card), one plays the Tier 1 technician, and one plays the Tier 2 technician who must take over.",
    "The Tier 1 technician interviews the user for three minutes and fills in the ticket form, including category and priority with a reason.",
    "The Tier 1 technician writes two progress notes describing simple tests and then escalates by handing over the form only, without talking to Tier 2.",
    "The Tier 2 technician reads the form and lists any question they would still need to ask the user; each missing item counts against the ticket.",
    "The user reveals the full scenario card, and the group writes a resolution with root cause, fix and user confirmation.",
    "Rotate roles with a new scenario card, then the teacher shows a model ticket for one scenario on the projector."
   ]
  },
  "discussion": [
   "Why might a help desk technician be tempted to write short notes, and what does it cost the team later?",
   "How should a technician respond when a senior manager insists their minor issue be marked critical?",
   "Users can often read their own tickets. How should that change the way notes are written?"
  ],
  "exit": [
   [
    "List four things a good ticket description should include.",
    "Any four of: what the user was doing, what happened, exact error messages, when it started, how often, who is affected, what was tried."
   ],
   [
    "What determines a ticket's priority?",
    "Impact and urgency, such as how many people are affected and how critical the system is."
   ],
   [
    "What three things belong in a resolution?",
    "The root cause if known, the fix applied, and the user's confirmation that it is solved."
   ]
  ],
  "differentiation": [
   "Support: Give students a ticket form with prompts in each field (for example 'exact error text:' and 'started when:') so they know what to ask during the interview.",
   "Extend: Ask fast finishers to turn their group's resolution into a short knowledge base article with symptoms, cause, fix steps and when to escalate."
  ]
 },
 {
  "t": "Asset management: inventory lists, CMDB, asset tags and IDs, procurement life cycle, warranty and licensing, assigned users",
  "objectives": [
   "Students will be able to distinguish an inventory list from a CMDB and explain what configuration items and relationships add.",
   "Students will be able to list the stages of the procurement life cycle in order, including secure retirement.",
   "Students will be able to explain the purpose of asset tags, warranty records, license tracking and the assigned-user field.",
   "Students will be able to apply asset records to solve a support scenario such as a warranty repair or offboarding."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect three or four answers on the whiteboard. Point out that every answer needs a record that someone kept accurate."
   ],
   [
    12,
    "Teach",
    "Walk through an inventory record field by field on the projector, then draw a small CMDB diagram (server, application, database, payroll service) with arrows. Explain asset tag versus serial number, then the procurement life cycle from request to retirement, and finish with warranty, license and assigned-user tracking."
   ],
   [
    18,
    "Activity",
    "Run the asset audit card sort below in groups of three. Circulate and ask each group to justify which record solves each ticket."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions. Draw out why an unknown device on the network is a security concern and why stale assigned-user data hurts offboarding."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your laptop dies today. What would the IT team need to know about it, and about you, to fix or replace it quickly?",
  "activity": {
   "title": "Asset audit card sort",
   "materials": "Printed cards the teacher prepares: 8 mock inventory records (asset ID, serial, model, assigned user, warranty end, status), 6 ticket cards, and a whiteboard.",
   "steps": [
    "Give each group the inventory record cards and the ticket cards face down.",
    "Groups flip one ticket at a time (for example 'Screen cracked on asset 1042', 'Employee leaving Friday', 'Unknown device seen on network', 'Auditor counts design software', 'Server upgrade planned', 'Old PCs going to recycling').",
    "For each ticket, groups decide which record field or tool answers it (warranty date, assigned user, discovery scan, license count, CMDB relationship, retirement procedure) and write the action on a sticky note.",
    "One mock record has a mismatched serial number and asset ID; groups that spot it explain why both identifiers are kept.",
    "Each group presents one ticket and its action to the class."
   ]
  },
  "discussion": [
   "Why might an organization's security team care more about the asset inventory than the finance team does?",
   "What goes wrong when asset records are only updated once a year?"
  ],
  "exit": [
   [
    "What does a CMDB record that an inventory list does not?",
    "Relationships and dependencies between configuration items."
   ],
   [
    "Name the final stage of the procurement life cycle and one required step in it.",
    "Retirement or disposal; securely wipe or destroy data and record it, for example with a certificate of destruction."
   ],
   [
    "A department has 30 installs of software with 20 licenses. Which asset practice catches this?",
    "Tracking software licenses against installations (license compliance)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat card (inventory versus CMDB, asset ID versus serial number) and let them sort only four tickets.",
   "Extend: Ask fast finishers to sketch a CMDB map for a fictional payroll service with at least five configuration items and predict the impact of one server going offline."
  ]
 },
 {
  "t": "Documentation types: acceptable use policy, incident reports, SOPs, onboarding and offboarding checklists, SLAs, knowledge base articles",
  "objectives": [
   "Students will be able to state the purpose of an AUP, incident report, SOP, onboarding and offboarding checklist, SLA and KB article.",
   "Students will be able to select the correct document type for a described workplace scenario.",
   "Students will be able to list key offboarding steps and explain why they reduce security risk.",
   "Students will be able to draft a short KB article with title, symptoms, cause and fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. List student answers on the board and group them under rules, records, procedures, promises and fixes."
   ],
   [
    12,
    "Teach",
    "Introduce each document type with a one-line purpose and a real-world style example. Spend extra time on the SOP versus AUP distinction and on offboarding steps, using the contractor VPN story."
   ],
   [
    18,
    "Activity",
    "Run 'Which document?' in pairs: scenario matching followed by a short KB article draft."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect documentation to security and customer service."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Think of a job you or someone you know has had. What written rules, instructions or checklists did that job use, and what went wrong when they were ignored?",
  "activity": {
   "title": "Which document?",
   "materials": "Printed set of 10 scenario cards, six large labels (AUP, incident report, SOP, checklist, SLA, KB article) taped on the whiteboard, sticky notes.",
   "steps": [
    "Pairs draw scenario cards (for example 'Vendor must answer critical calls in 1 hour', 'Every laptop imaged the same way', 'Ex-employee badge still works').",
    "Pairs place each card under the matching label on the whiteboard and write one sentence on a sticky note explaining why.",
    "The class reviews the board together; the teacher moves any misplaced card and asks the pair to explain the correction.",
    "Each pair then writes a five-line KB article for a common problem of their choice: title, symptoms, cause, fix steps, and who it is for.",
    "Two pairs swap articles and check whether they could follow the fix without asking questions."
   ]
  },
  "discussion": [
   "Why might an organization require users to re-acknowledge the AUP every year rather than only once?",
   "What makes an incident report useful months later to someone who was not there?"
  ],
  "exit": [
   [
    "A rule says users may not install personal software. Which document holds it?",
    "The acceptable use policy (AUP)."
   ],
   [
    "Name two offboarding steps that reduce security risk.",
    "Any two: disable accounts at departure, revoke badges and access, collect equipment, change shared credentials, reclaim licenses."
   ],
   [
    "What four parts should a good KB article include?",
    "A searchable title, symptoms, cause and step-by-step fix."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with each document type and a single keyword (rules, record, recipe, promise, fix, join or leave) to use during the card sort.",
   "Extend: Ask fast finishers to write a one-paragraph SLA for an internal help desk with response targets for three priority levels and explain how tickets would be measured against it."
  ]
 },
 {
  "t": "Change management: request forms, purpose and scope, risk analysis, change advisory board approval, sandbox testing, rollback and backup plans, end-user acceptance",
  "objectives": [
   "Students will be able to describe the contents of a change request, including purpose, scope, owner, schedule and change type.",
   "Students will be able to put the change management steps in a logical order from request to documentation.",
   "Students will be able to distinguish a backup from a rollback plan and explain the role of the CAB.",
   "Students will be able to identify the missing step in a failed-change scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick answers. Steer toward the idea that the change itself was fine but the process around it was missing."
   ],
   [
    12,
    "Teach",
    "Walk through a blank change request on the projector, filling it in for the printer driver example. Explain standard, normal and emergency changes, risk analysis, the CAB, sandbox testing, backup versus rollback, and end-user acceptance."
   ],
   [
    18,
    "Activity",
    "Run the mock CAB meeting role-play described below."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play with the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Have you ever updated an app or a phone and had something stop working afterward? What would you have wanted to know before you clicked update?",
  "activity": {
   "title": "Mock change advisory board",
   "materials": "Printed change request templates, three printed scenario cards (firewall firmware, printer driver, email server patch), role cards (requester, security, business owner, IT manager), whiteboard.",
   "steps": [
    "Split the class into groups of four and give each group a scenario and the role cards.",
    "The requester fills in the change request template: purpose, scope, change type, risk rating, sandbox test plan, backup plan, rollback plan with a decision point, and proposed window.",
    "Groups swap requests. The receiving group acts as the CAB, with each role asking one question from their viewpoint, then votes approve, reject or request more information.",
    "The teacher reveals a 'what happened' card for each scenario (for example, the driver broke label printers) and groups check whether their plan would have caught it or allowed a clean rollback.",
    "Each group writes on the whiteboard the one step that mattered most in their scenario."
   ]
  },
  "discussion": [
   "Why might a technician be tempted to skip change management for a small change, and what is the risk?",
   "How should an organization handle an emergency change at 2 a.m. while still keeping control?"
  ],
  "exit": [
   [
    "What two things does a change request describe as purpose and scope?",
    "Purpose is the business reason for the change; scope is which systems, users, sites and services it affects."
   ],
   [
    "A failed change could not be undone. Which plan was missing or inadequate?",
    "The rollback plan."
   ],
   [
    "What step confirms after implementation that the system meets users' needs?",
    "End-user acceptance."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the change steps on separate strips of paper to arrange in order before they fill in the template.",
   "Extend: Ask fast finishers to write a rollback plan with a specific decision point and named decision-maker for the firewall scenario, and explain how they would test the rollback itself."
  ]
 },
 {
  "t": "Backup and recovery: full, incremental, differential and synthetic backups; testing restores; on-site vs off-site; 3-2-1 rule; grandfather-father-son rotation",
  "objectives": [
   "Students will be able to compare full, incremental, differential and synthetic full backups by what they copy and what a restore requires.",
   "Students will be able to determine the exact backup sets needed to restore after a failure on a given day.",
   "Students will be able to explain the 3-2-1 rule, on-site versus off-site storage and GFS rotation.",
   "Students will be able to justify why restores must be tested and why RAID and sync are not backups."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and tally answers. Introduce the idea that where and how a copy is kept matters as much as making it."
   ],
   [
    13,
    "Teach",
    "Draw a Sunday-to-Saturday timeline on the whiteboard. Shade what each backup type copies each night, then mark a Thursday failure and work out restore sets for incremental and differential. Cover synthetic fulls, RPO and RTO, 3-2-1, and GFS."
   ],
   [
    17,
    "Activity",
    "Run the restore puzzle described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, focusing on ransomware and testing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your phone was lost right now, which of your photos and files would you get back, and from where?",
  "activity": {
   "title": "Restore puzzle",
   "materials": "Printed weekly calendars, printed 'backup set' cards labeled by day and type (full, incremental, differential), a few cards marked 'damaged', and a whiteboard.",
   "steps": [
    "Give each pair a calendar and a scenario card stating the backup schedule and the failure time (for example 'Full Sunday, incrementals nightly, fails Friday 9 a.m.').",
    "Pairs pick out exactly the backup set cards needed for the restore and line them up in the order they would apply them.",
    "The teacher hands some pairs a 'damaged' card for one night and asks what data would now be lost.",
    "Pairs then redesign storage for a small office using the 3-2-1 rule and GFS, sketching where each copy lives.",
    "Two pairs present: one restore sequence and one storage design."
   ]
  },
  "discussion": [
   "Why can ransomware defeat a backup strategy that keeps everything on the same network, and what helps?",
   "How would you convince a busy manager that test restores are worth the time?"
  ],
  "exit": [
   [
    "Full Sunday, incrementals nightly, failure Wednesday morning. Which sets do you need?",
    "Sunday's full plus Monday's and Tuesday's incrementals, applied in order."
   ],
   [
    "State the 3-2-1 rule.",
    "Three copies of data, on two types of media, with one copy off-site."
   ],
   [
    "Why is RAID not a backup?",
    "It only protects against disk failure and copies deletions and corruption immediately."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a color-coded timeline where each night's changed files are a different color, so they can see what each backup type includes.",
   "Extend: Ask fast finishers to design a schedule for an office with a four-hour RPO and a two-hour RTO and explain which backup types and storage locations they would use."
  ]
 },
 {
  "t": "Safety: ESD straps and mats, grounding, power handling, lifting technique, electrical fire safety, PPE",
  "objectives": [
   "Students will be able to explain how ESD damages components and apply wrist straps, mats, antistatic bags and self-grounding correctly.",
   "Students will be able to distinguish equipment grounding from ESD protection and state when an ESD strap must not be worn.",
   "Students will be able to select the correct extinguisher and PPE for a described hazard.",
   "Students will be able to demonstrate safe lifting technique and power-handling steps before opening equipment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect answers and sort them on the board into hazards to people and hazards to equipment."
   ],
   [
    12,
    "Teach",
    "Explain ESD with the carpet-shock example, then grounding versus ESD straps, the power supply rule, lifting technique, fire classes and PPE. Show a real wrist strap or a picture of one on the projector."
   ],
   [
    18,
    "Activity",
    "Run the 'Safety stop' station walk described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce priorities: people first, equipment second."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Picture the most dangerous thing you might touch while repairing a computer. What is it, and why?",
  "activity": {
   "title": "Safety stop stations",
   "materials": "Six printed scenario cards placed around the room, a sheet of paper at each station, an empty cardboard box for lifting practice, and a whiteboard.",
   "steps": [
    "Place scenario cards at six stations (for example 'RAM install on carpet, no strap', 'PSU fan is noisy', 'Toner spilled in printer', 'Smoke from a PC', 'Move a heavy UPS', 'Cutting network cable').",
    "Groups rotate every two to three minutes and write at each station the hazard, the correct precaution or PPE, and what they must never do.",
    "At the lifting station, one student demonstrates lifting the empty box with correct posture while the others check knees, back, closeness and no twisting.",
    "After the rotation, the teacher reads each station's sheet aloud and corrects any unsafe answers.",
    "Students vote on which scenario had the most tempting wrong answer and explain why."
   ]
  },
  "discussion": [
   "Why can ESD damage be especially frustrating to troubleshoot later?",
   "If a coworker is about to break a safety rule to finish a job quickly, how should you respond?"
  ],
  "exit": [
   [
    "When should you not wear an ESD wrist strap?",
    "When working on high-voltage equipment such as power supplies or CRT monitors."
   ],
   [
    "What extinguisher is used for a fire in energized computer equipment?",
    "A Class C (US) extinguisher, such as CO2 or multipurpose ABC; never water."
   ],
   [
    "Name two parts of correct lifting technique.",
    "Any two: bend at the knees, keep back straight, hold load close, lift with legs, avoid twisting, get help for heavy items."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page picture guide showing strap placement, lifting posture and extinguisher labels to use during the stations.",
   "Extend: Ask fast finishers to write a short safety SOP for replacing RAM, listing every step from powering down to closing the case, in order."
  ]
 },
 {
  "t": "Environment: safety data sheets, battery and toner disposal, temperature and humidity, ventilation, UPS and surge suppressors",
  "objectives": [
   "Students will be able to identify the safety data sheet as the source for handling, first aid, spill response and disposal of a hazardous product.",
   "Students will be able to describe correct disposal for batteries, toner and e-waste, including the precedence of local regulations.",
   "Students will be able to explain the effects of temperature, humidity and ventilation on equipment.",
   "Students will be able to choose between a power strip, surge suppressor and UPS for a described power problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and note answers. Highlight any that mention batteries or power outages."
   ],
   [
    12,
    "Teach",
    "Show a sample SDS section list on the projector (hazards, handling, PPE, first aid, spills, disposal). Cover battery, toner and e-waste disposal, temperature and humidity, ventilation and hot/cold aisles, then compare power strip, surge suppressor and UPS."
   ],
   [
    18,
    "Activity",
    "Run the closet inspection described below in groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect environment to reliability and safety."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What do you do with a dead phone battery or an old laptop at home? Do you think that is the right way?",
  "activity": {
   "title": "Closet inspection report",
   "materials": "A projected or printed drawing of a messy equipment closet with labeled problems, printed inspection forms, whiteboard.",
   "steps": [
    "Show the closet drawing, which includes a swollen battery on a shelf, toner on the floor beside a household vacuum, a server on a plain power strip, devices stacked on each other, blocked vents, a thermometer reading high and a humidity gauge reading very low.",
    "Groups fill in an inspection form listing each hazard, the risk to people or equipment, and the fix (for example 'consult SDS', 'toner vacuum and mask', 'UPS with USB shutdown').",
    "Each group must decide which three fixes to prioritize first and justify the order, with people's safety ahead of equipment.",
    "Groups share their top three; the teacher records them on the whiteboard and resolves disagreements.",
    "Finish by asking which single document the group would consult for the battery and toner, confirming the SDS."
   ]
  },
  "discussion": [
   "Why might an organization's disposal procedure differ from city to city?",
   "A manager wants to save money by skipping UPS battery replacements. What risks would you explain?"
  ],
  "exit": [
   [
    "Which document tells you how to clean up and dispose of a chemical product?",
    "The safety data sheet (SDS)."
   ],
   [
    "A server must stay on long enough to shut down cleanly during a blackout. Which device?",
    "A UPS (uninterruptible power supply)."
   ],
   [
    "What problem does very high humidity cause?",
    "Condensation and corrosion on components."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column table (power strip, surge suppressor, UPS) with yes/no rows for 'adds outlets', 'stops spikes' and 'runs during outage' to complete before the activity.",
   "Extend: Ask fast finishers to design a small server room layout using hot aisle and cold aisle and explain where cool air enters and hot air leaves."
  ]
 },
 {
  "t": "Prohibited content and privacy: incident response and chain of custody, licensing (EULA, DRM, open source vs commercial, personal vs corporate), PII, PCI DSS, GDPR, PHI, data retention",
  "objectives": [
   "Students will be able to sequence the correct response to prohibited content: identify, report, preserve, document.",
   "Students will be able to explain chain of custody and why gaps make evidence inadmissible.",
   "Students will be able to compare EULA, DRM, open-source versus commercial, and personal versus corporate licenses.",
   "Students will be able to classify data as PII, PHI, PCI DSS cardholder data or GDPR-covered and explain retention and legal hold."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let students vote by show of hands. Do not reveal the answer yet."
   ],
   [
    12,
    "Teach",
    "Walk through the response steps with the credit card laptop story, show a sample chain-of-custody form on the projector, then cover licensing types and the four regulated data categories, ending with retention and legal hold."
   ],
   [
    18,
    "Activity",
    "Run the evidence handoff role-play and data sort described below."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up vote and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are fixing a friend's computer and see something that looks illegal. Would you delete it, ask them about it, or do something else? Why?",
  "activity": {
   "title": "Evidence handoff and data sort",
   "materials": "A sealed envelope labeled as a 'laptop', printed chain-of-custody forms, 12 printed data cards (for example 'patient blood test', 'card number and expiry', 'name and birth date', 'EU customer email list'), whiteboard.",
   "steps": [
    "Choose four students to act as technician, manager, security analyst and investigator. The 'laptop' envelope passes from each to the next, and each fills in the chain-of-custody form with time, names and purpose.",
    "Midway, the teacher secretly has one student skip signing. The class reviews the form and identifies the gap and why it weakens the evidence.",
    "In groups, students sort the data cards into PII, PHI, PCI DSS and GDPR columns on the whiteboard; some cards fit more than one, and groups must explain overlaps.",
    "Groups then answer one licensing card each (for example 'personal photo editor used at work') and state whether it is compliant.",
    "The class reviews all columns and corrects misplacements."
   ]
  },
  "discussion": [
   "Why is it tempting to delete prohibited content, and what harm can that cause?",
   "How does keeping data longer than needed increase an organization's risk?"
  ],
  "exit": [
   [
    "List the response steps for prohibited content in order.",
    "Identify, report through proper channels, preserve the data or device, document (with chain of custody if needed)."
   ],
   [
    "Which standard applies to stored credit card numbers, and is it a law?",
    "PCI DSS; it is an industry standard, not a law."
   ],
   [
    "Can data under legal hold be deleted when its retention period ends?",
    "No. Legal hold suspends normal deletion until it is lifted."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart card with the four response steps and a data-type keyword list (health, card, EU, identifies a person) to use during sorting.",
   "Extend: Ask fast finishers to write a short retention policy for three data types at a fictional company, including a legal hold exception, and justify each period without inventing legal requirements."
  ]
 },
 {
  "t": "Professionalism: punctuality, active listening, avoiding jargon, handling difficult customers, confidentiality, setting expectations and following up",
  "objectives": [
   "Students will be able to demonstrate active listening, including restating the problem and using open-ended and closed-ended questions.",
   "Students will be able to rewrite a technical explanation in plain language without jargon.",
   "Students will be able to choose the most professional response for scenarios involving lateness, difficult customers and confidential information.",
   "Students will be able to explain how setting expectations and follow-up complete a service interaction."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect good and bad customer service stories. Note the behaviors on the board."
   ],
   [
    10,
    "Teach",
    "Cover punctuality, distractions, active listening, open versus closed questions, jargon, difficult customers, confidentiality, expectations and follow-up, linking each to a behavior from the warm-up list."
   ],
   [
    20,
    "Activity",
    "Run the help desk role-play rotation described below."
   ],
   [
    5,
    "Discuss",
    "Debrief using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Describe the best or worst customer service you have ever received. What exactly did the person do or say?",
  "activity": {
   "title": "Help desk role-play rotation",
   "materials": "Printed customer role cards (angry manager, anxious student, very technical user, quiet user who will not explain), printed observer checklists, whiteboard.",
   "steps": [
    "Form groups of three: technician, customer and observer. The customer reads a role card privately.",
    "The technician handles the call for three minutes, aiming to restate the problem, ask at least one open and one closed question, avoid jargon and set expectations.",
    "The observer ticks the checklist (did not interrupt, restated, plain language, stayed calm, set a time estimate, offered follow-up) and gives one strength and one improvement.",
    "Rotate roles twice with new cards so everyone plays each part.",
    "Finish with a jargon translation round: the teacher reads a technical sentence and groups race to rewrite it in plain words on the whiteboard."
   ]
  },
  "discussion": [
   "Why might a technically perfect fix still leave a customer unhappy?",
   "When is it appropriate to escalate a difficult customer to a supervisor, and how would you say it?"
  ],
  "exit": [
   [
    "What should you do if you will be late to a customer appointment?",
    "Contact the customer before the appointment time, apologize and give a new estimate."
   ],
   [
    "Give one example of an open-ended question and one closed-ended question for a printer problem.",
    "Open: 'What happens when you try to print?' Closed: 'Does it happen with every document?' (any reasonable pair)."
   ],
   [
    "A sensitive document is open on the screen you need to use. What do you do?",
    "Do not read it; ask the user to close or save it before continuing."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students sentence starters for restating and acknowledging, such as 'So what I am hearing is...' and 'I understand this is frustrating because...'.",
   "Extend: Ask fast finishers to write a short follow-up email to a customer after a repair that explains the fix in plain language, confirms satisfaction and documents next steps."
  ]
 },
 {
  "t": "Scripting basics: .bat, .ps1, .vbs, .sh, .js, .py; use cases (automation, restarts, drive mapping, installs, backups, updates) and risks",
  "objectives": [
   "Students will be able to match the script extensions .bat, .ps1, .vbs, .sh, .js and .py to their platforms and interpreters.",
   "Students will be able to identify variables, comments, loops and conditionals in a short script excerpt.",
   "Students will be able to list common scripting use cases such as drive mapping, installs, restarts, updates and backups.",
   "Students will be able to explain scripting risks and the controls that reduce them, including testing, review and execution policy."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list repetitive tasks on the board. Circle the ones a script could do."
   ],
   [
    12,
    "Teach",
    "Show each extension with its platform on the projector, then project the batch drive-mapping script and identify the comment, command and variable. Cover use cases, deployment through Group Policy or RMM, and the three exam risks."
   ],
   [
    18,
    "Activity",
    "Run 'Read the script' in pairs as described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about trust and testing."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What is a task you do on a computer over and over that you wish would just do itself?",
  "activity": {
   "title": "Read the script",
   "materials": "Printed handouts with five short, harmless script excerpts (batch drive mapping, PowerShell service restart with an if statement, bash backup copy with a loop, Python disk-space report, a VBScript excerpt flagged as an email attachment), highlighters, whiteboard.",
   "steps": [
    "Pairs identify each excerpt's language and platform from its extension and syntax.",
    "With highlighters, they mark comments in one color, variables in another, and loops or conditionals in a third.",
    "For each excerpt, pairs write one sentence on what it does and one risk if it were deployed carelessly.",
    "For the VBScript attachment, pairs decide what a technician should do and why, focusing on detection and reporting rather than running it.",
    "Pairs compare answers with another pair, then the teacher reviews on the projector."
   ]
  },
  "discussion": [
   "Why might attackers prefer scripting languages that are already built into Windows?",
   "What would a good testing process for a new script look like in a school or small office?"
  ],
  "exit": [
   [
    "Which extensions are Windows-specific?",
    ".bat, .ps1 and .vbs."
   ],
   [
    "Name the comment character for PowerShell, bash and Python.",
    "The # character."
   ],
   [
    "Give two risks of running scripts.",
    "Any two: unintentionally introducing malware, inadvertently changing system settings, crashes from mishandling resources such as endless loops."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students an extension-to-platform reference card and a single annotated example script before they work on the handout.",
   "Extend: Ask fast finishers to write pseudocode for a script that maps a drive only if the user belongs to a certain group, using a variable, a conditional and comments."
  ]
 },
 {
  "t": "Remote access: RDP, VPN, VNC, SSH, RMM, SPICE, WinRM, screen-sharing and file-transfer tools, and their security considerations",
  "objectives": [
   "Students will be able to match RDP, VNC, SSH, SPICE, WinRM, VPN and RMM to their purposes, including default ports for RDP and SSH.",
   "Students will be able to explain why a VPN alone is not a remote control tool.",
   "Students will be able to recommend security controls for remote access, including MFA, NLA, VPN gateways, encryption and approved tools.",
   "Students will be able to recognize a remote-support scam and describe the correct user response."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather examples of remote access students have seen or used."
   ],
   [
    12,
    "Teach",
    "Build a table on the whiteboard with columns for tool, what it gives you, platform, default port and how to secure it. Fill it in for RDP, VNC, SSH, SPICE, WinRM, VPN, RMM and screen-sharing tools, then cover the exposed RDP example."
   ],
   [
    18,
    "Activity",
    "Run 'Pick the tool, lock the door' as described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about convenience versus security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you ever had someone control your screen to help you, or helped someone else remotely? How did you know it was safe?",
  "activity": {
   "title": "Pick the tool, lock the door",
   "materials": "Printed scenario cards (10 remote access needs), printed tool cards (RDP, VNC, SSH, SPICE, WinRM, VPN, RMM, screen-share, SFTP), a short printed Security log excerpt showing repeated failed logons from external addresses, sticky notes.",
   "steps": [
    "Groups match each scenario card to the best tool card (for example 'Manage a Linux router from home', 'Patch 500 client PCs', 'View a virtual machine console').",
    "For each match, groups write two security controls on a sticky note and attach it.",
    "Groups then read the log excerpt and decide what it shows, what exposure likely caused it and the remediation steps in order.",
    "The teacher reveals a scam-call script card; groups write what the user should say and do.",
    "Groups present one scenario and the log remediation; the class checks answers against the whiteboard table."
   ]
  },
  "discussion": [
   "Why do small businesses often expose RDP directly, and how would you explain the risk to an owner?",
   "What makes a compromised RMM account more dangerous than a single compromised PC?"
  ],
  "exit": [
   [
    "What are the default ports for RDP and SSH?",
    "RDP uses TCP 3389; SSH uses TCP 22."
   ],
   [
    "Can a VPN by itself let a technician control a user's desktop? Explain.",
    "No; a VPN only provides an encrypted network tunnel, and a remote control tool such as RDP runs over it."
   ],
   [
    "Name two ways to secure RDP.",
    "Any two: do not expose it to the internet, require a VPN or gateway, require NLA, add MFA, strong passwords with account lockout."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially filled tool table with the purpose column completed so they focus on matching scenarios and controls.",
   "Extend: Ask fast finishers to design a remote access plan for a 25-person office with remote staff and an outside MSP, naming each tool, who uses it and the controls applied."
  ]
 },
 {
  "t": "Artificial intelligence basics: app integration, appropriate-use policy and plagiarism, bias, hallucinations and accuracy, public vs private models and data privacy",
  "objectives": [
   "Students will be able to explain how integrated AI features inherit user permissions and why access should be reviewed before enabling them.",
   "Students will be able to define hallucination and bias and give an example of each.",
   "Students will be able to compare public and private models in terms of data privacy and identify data that must not enter public tools.",
   "Students will be able to describe what an AI appropriate-use policy contains, including plagiarism and disclosure rules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a few answers. Note both helpful and problematic uses on the board."
   ],
   [
    12,
    "Teach",
    "Explain app integration and inherited permissions with the salary spreadsheet story, then bias, hallucinations, public versus private models, DLP and the appropriate-use policy. Link each to a warm-up answer."
   ],
   [
    18,
    "Activity",
    "Run 'Policy or problem?' in groups as described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Have you used an AI tool for school or work? What is one time it helped, and one time you were not sure you could trust it?",
  "activity": {
   "title": "Policy or problem?",
   "materials": "Printed set of 8 AI scenario cards (for example 'Chatbot cites a nonexistent manual', 'Pasting patient notes into a free tool', 'Assistant summarizes HR folder for an intern', 'Essay submitted as own work'), poster paper, markers, student laptops with a browser optional.",
   "steps": [
    "Groups label each scenario card as hallucination, bias, data privacy, plagiarism or app integration and permissions, and write the correct response.",
    "Each group drafts a one-page AI appropriate-use policy on poster paper covering approved tools, data that must never be entered, human review rules and disclosure.",
    "Groups test their policy against two scenario cards: would it have prevented the problem?",
    "Optionally, with an approved tool and no personal data, students ask an AI chatbot a factual question about a Windows setting and check the answer against official documentation, noting any discrepancy.",
    "Groups do a gallery walk, leaving a sticky note on another group's policy with one gap they found."
   ]
  },
  "discussion": [
   "Who is responsible when an AI-generated answer is wrong and causes a problem: the user, the tool provider, or the organization?",
   "Why might an organization block public AI tools entirely, and what are the downsides of doing that?"
  ],
  "exit": [
   [
    "An AI tool invents a command that does not exist. What is this called?",
    "A hallucination."
   ],
   [
    "Why should customer PII not be entered into a public AI model?",
    "The provider may store, review or train on it, exposing the data and violating policy or regulations."
   ],
   [
    "An AI assistant shows a user files they should not see. What is the likely cause and fix?",
    "The assistant inherits the user's overly broad permissions; fix the file permissions and review shared folders."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a definition card for hallucination, bias, public model, private model and appropriate-use policy, each with a one-line example.",
   "Extend: Ask fast finishers to list the steps IT should take before enabling an AI assistant company-wide, including permission review, policy, training and DLP, and explain the order."
  ]
 }
]);
