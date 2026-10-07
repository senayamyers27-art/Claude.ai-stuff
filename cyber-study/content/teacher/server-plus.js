/* Teacher edition for CompTIA Server+ (SK0-005): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("server-plus", [
 {
  "t": "Rack planning: rack units, rail kits, weight distribution (heaviest at the bottom), airflow, hot and cold aisles, cable management arms",
  "objectives": [
   "Students will be able to calculate device heights and total rack space using rack units.",
   "Students will be able to explain why heavy equipment such as UPS units belongs at the bottom of a rack.",
   "Students will be able to describe hot aisle/cold aisle airflow and the role of blanking panels.",
   "Students will be able to choose between sliding and fixed rails and explain the purpose of a cable management arm."
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
    "Walk through rack units (do two quick height calculations aloud), rail types and the CMA, weight distribution, then draw two rows of racks and shade the hot and cold aisles. Show what an open gap does to airflow with arrows."
   ],
   [
    15,
    "Activity",
    "Run the rack elevation build in pairs. Circulate and ask each pair to justify where they put the UPS and how air will move."
   ],
   [
    5,
    "Discuss",
    "Have two pairs present their elevations. Compare choices and use the discussion questions to surface trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "If you were stacking a bookcase with a microwave, a box of paper, a laptop and a heavy encyclopedia set, where would each go, and why? Now imagine the bookcase gets pulled forward on wheels.",
  "activity": {
   "title": "Build a rack elevation",
   "materials": "Printed blank 42U rack elevation sheets (a tall column numbered 1 to 42 from the bottom), printed device cards with sizes and weights (UPS 3U heavy, battery pack 2U heavy, storage array 4U heavy, servers 1U and 2U, switch 1U, patch panel 1U), sticky notes, markers.",
   "steps": [
    "Give each pair a blank elevation sheet and a set of device cards.",
    "Ask pairs to place every device on the sheet, writing the U positions it occupies, and to mark where blanking panels are needed.",
    "Pairs add arrows showing airflow front to back and label which side faces the cold aisle.",
    "Pairs note which devices get sliding rails and a CMA, and calculate how much space remains for growth.",
    "Swap sheets with another pair, who checks for weight, airflow and space errors and writes one correction on a sticky note."
   ]
  },
  "discussion": [
   "When would you accept a less-than-ideal position for a device, and what would you do to reduce the risk?",
   "Why might a data center choose to contain the hot aisle rather than the cold aisle, or the reverse?"
  ],
  "exit": [
   [
    "How many inches tall is a 3U device?",
    "5.25 inches, because one U is 1.75 inches."
   ],
   [
    "Where should a UPS go in a rack, and why?",
    "At the bottom, because it is heavy and keeps the center of gravity low so the rack does not tip."
   ],
   [
    "What problem do blanking panels solve?",
    "They stop hot exhaust air recirculating through empty spaces to the front intakes."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially filled elevation with the UPS already placed and a reference card showing 1U = 1.75 inches and the front-to-back airflow arrow.",
   "Extend: Ask fast finishers to add a second rack beside the first in a hot aisle/cold aisle layout and plan where cable managers and PDUs go without blocking airflow."
  ]
 },
 {
  "t": "Server form factors: tower, rack mount, blade enclosures",
  "objectives": [
   "Students will be able to describe the physical characteristics of tower, rack mount and blade servers.",
   "Students will be able to compare form factors on density, cabling, expansion, cost and management.",
   "Students will be able to recommend a form factor for a described business scenario and justify it.",
   "Students will be able to identify the single-point-of-failure and power-density risks of blade enclosures."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch the three housing types students mention on the board."
   ],
   [
    12,
    "Teach",
    "Present tower, rack and blade with a simple drawing of each. Fill in a comparison table on the board together: space, cables, expansion, cost, management, failure risk."
   ],
   [
    18,
    "Activity",
    "Run the scenario card sort in small groups. Give each group the full set and have them place cards under columns labeled Tower, Rack, Blade."
   ],
   [
    5,
    "Discuss",
    "Groups compare placements for the two or three cards with the most disagreement. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually on paper."
   ]
  ],
  "warmup": "Where would you rather live: a detached house, an apartment or a dorm room? What do you gain and give up with each?",
  "activity": {
   "title": "Form factor scenario sort",
   "materials": "Printed scenario cards (8 to 10 short business situations, for example 'dental office with one closet', 'web farm needing 60 identical nodes', 'database server needing 12 drives'), three column headers on the whiteboard or tables, sticky notes.",
   "steps": [
    "Split the class into groups of three or four and hand each group a set of scenario cards.",
    "Groups read each card and place it under Tower, Rack mount or Blade.",
    "For each placement, groups write one sticky note with the deciding factor (space, cabling, expansion, cost, management).",
    "Groups flag any card where they disagreed and note what extra information would settle it.",
    "Each group reports one card and its reasoning to the class."
   ]
  },
  "discussion": [
   "At what point does a growing business move from towers to rack servers, and what triggers that move?",
   "How would you reduce the risk that a single blade enclosure takes down an entire service?"
  ],
  "exit": [
   [
    "Which form factor is best for a small site with no rack that needs one server?",
    "A tower server."
   ],
   [
    "What does a blade enclosure provide to the blades inside it?",
    "Shared power, cooling, networking or storage interconnects, and management."
   ],
   [
    "Give one reason to choose rack mount over blade.",
    "Independence and flexibility, such as more drive bays and full-height cards per server, no enclosure cost and no lock-in to one vendor's chassis."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in comparison table with key words (space, cables, cost, expansion) for students to reference during the card sort.",
   "Extend: Ask fast finishers to estimate the effect of a fully loaded blade enclosure on rack power and cooling and list questions they would ask facilities before purchase."
  ]
 },
 {
  "t": "Power: voltage, redundant power supplies, PDUs, UPS sizing and runtime, generators, separate circuits, power connector types",
  "objectives": [
   "Students will be able to trace the power path from utility to server and name each component's role (ATS, generator, UPS, PDU, PSU).",
   "Students will be able to design A/B power feeds that keep dual-PSU servers running after a single circuit failure.",
   "Students will be able to explain how load affects UPS runtime and size a UPS using watts, VA and headroom.",
   "Students will be able to identify common server power connectors (C13/C14, C19/C20, NEMA locking plugs)."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list students' answers about what keeps working during a power cut."
   ],
   [
    15,
    "Teach",
    "Draw the power chain left to right: utility, ATS with generator, UPS, PDU A and B, server PSU 1 and 2. Explain watts versus VA, runtime versus load, and PDU types. Show printed photos or drawings of C13/C14 and C19/C20 ends."
   ],
   [
    15,
    "Activity",
    "Run the 'Trip the breaker' tabletop exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Ask pairs which failure surprised them most and work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on an index card."
   ]
  ],
  "warmup": "When your phone is unplugged, what decides how long the battery lasts? How might that apply to a rack of servers on battery power?",
  "activity": {
   "title": "Trip the breaker",
   "materials": "Printed rack power diagrams (two PDUs, two UPS units, six dual-PSU servers, with some cords deliberately plugged into the same PDU), red and green markers, printed failure cards ('Circuit A trips', 'UPS B fails', 'Utility outage, generator takes 30 seconds to start').",
   "steps": [
    "Give each pair a rack power diagram and ask them to trace every power cord from PSU to PDU to UPS to circuit.",
    "Draw a failure card and mark in red every server that would go down; mark in green every server that survives.",
    "Repeat with two more failure cards.",
    "Redesign the diagram so that any single failure card leaves every server running, and note any PDU that could be overloaded when the other side fails.",
    "Swap with another pair and test their redesign with a new failure card."
   ]
  },
  "discussion": [
   "What evidence would you look for in a metered PDU or UPS log to decide whether a rack can survive losing one power feed?",
   "Why might an organization choose orderly shutdown over buying a generator?"
  ],
  "exit": [
   [
    "A server's two PSUs are both plugged into PDU A. What is the problem?",
    "PDU A or its circuit is a single point of failure; the PSUs should be split across PDU A and PDU B on separate circuits."
   ],
   [
    "What happens to UPS runtime if you double the load?",
    "It drops significantly, because runtime depends on load."
   ],
   [
    "What device switches a building from utility power to the generator?",
    "An automatic transfer switch (ATS)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a color-coded diagram where side A is blue and side B is orange so they can see split feeds at a glance, plus a card with the formula watts = volts x amps.",
   "Extend: Ask fast finishers to compute the combined load of the rack from listed device wattages, pick a UPS size with 20 percent headroom, and explain why the VA rating must also be checked."
  ]
 },
 {
  "t": "Network cabling and connectors: Cat5e/Cat6/Cat6a, single-mode vs multimode fiber, SFP/SFP+/QSFP transceivers, twinax/DAC, labeling",
  "objectives": [
   "Students will be able to state the speed and distance capabilities of Cat5e, Cat6 and Cat6a.",
   "Students will be able to compare single-mode and multimode fiber and choose the right one for a given distance.",
   "Students will be able to identify SFP, SFP+, SFP28, QSFP and DAC options and match transceivers on both ends of a link.",
   "Students will be able to apply a consistent cable labeling scheme."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and write the factors students name on the board."
   ],
   [
    15,
    "Teach",
    "Build a table of copper categories (speed, distance), then draw fiber cores to compare MMF and SMF. Show the transceiver family as a size and speed ladder and explain DAC and AOC. Finish with labeling."
   ],
   [
    15,
    "Activity",
    "Run the 'Link order desk' exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Review two or three tricky orders and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you had to send a message to someone across the room, across the street and across the city, would you use the same method for each? What would change?",
  "activity": {
   "title": "Link order desk",
   "materials": "Printed 'order request' cards describing links (for example 'server to top-of-rack switch, 2 m, 10 Gbps'; 'building A to building B, 3 km, 10 Gbps'; '10 Gbps copper, 90 m'), a printed price-free parts list (Cat5e, Cat6, Cat6a, MMF, SMF, SFP, SFP+, QSFP28, DAC, AOC, LC connectors), blank label templates.",
   "steps": [
    "Hand each pair five order cards and the parts list.",
    "For each order, pairs choose the cable and, if needed, the transceiver for each end, writing a one-line reason based on speed and distance.",
    "Pairs write a label for both ends of each link using the format rack-device-port.",
    "Pairs check one order card for a hidden trap (such as mismatched optics or Cat6 at 90 meters) and explain the fix.",
    "Pairs trade sheets with another pair and mark any choice they disagree with."
   ]
  },
  "discussion": [
   "When might you choose fiber over copper even for a short run?",
   "What would happen to troubleshooting in a data center that never labels cables?"
  ],
  "exit": [
   [
    "Which copper category supports 10 Gbps at 100 meters?",
    "Cat6a."
   ],
   [
    "Which fiber type is used for multi-kilometer links?",
    "Single-mode fiber."
   ],
   [
    "What is a DAC and when is it used?",
    "A twinax copper cable with transceiver ends attached, used for short high-speed links within or between adjacent racks."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference ladder showing distance (meters to kilometers) on one axis with DAC, Cat6a, MMF and SMF placed along it.",
   "Extend: Ask fast finishers to design cabling for a small two-building campus with redundant links, listing every cable, optic and label."
  ]
 },
 {
  "t": "Drive types: HDD speeds (7.2K/10K/15K), SSD, NVMe, SAS vs SATA, hot-swap and hot-plug",
  "objectives": [
   "Students will be able to compare 7.2K, 10K and 15K HDDs, SSDs and NVMe drives on speed, capacity and cost.",
   "Students will be able to explain SAS versus SATA differences, including one-way controller compatibility and dual porting.",
   "Students will be able to distinguish hot-swap from hot-plug and describe a safe drive replacement procedure.",
   "Students will be able to select an appropriate drive type and endurance class for a described workload."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and rank student answers from slowest to fastest on the board."
   ],
   [
    15,
    "Teach",
    "Draw an HDD platter and head to explain seek and rotational latency, then contrast with SSD and NVMe. Build a SAS versus SATA table and show the one-way compatibility arrow. Define hot-swap and hot-plug with a short replacement walkthrough."
   ],
   [
    15,
    "Activity",
    "Run the 'Workload matchmaker' exercise in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups share their most debated match; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "Think about the slowest and fastest devices you have used to store files. What made one feel faster than the other?",
  "activity": {
   "title": "Workload matchmaker",
   "materials": "Printed workload cards (backup archive, busy transaction database, web content server, boot drive, video editing scratch space, log server), printed drive cards (7.2K SATA HDD, 10K SAS HDD, 15K SAS HDD, read-intensive SATA SSD, write-intensive SAS SSD, NVMe U.2 SSD, M.2 NVMe boot drive), a printed controller card ('SATA-only controller'), sticky notes.",
   "steps": [
    "Give each group the workload cards and the drive cards.",
    "Groups match each workload to the best drive and write the deciding factor (IOPS, capacity per dollar, endurance, latency) on a sticky note.",
    "Draw the 'SATA-only controller' card and have groups revise any match that used a SAS drive.",
    "Groups write a four-step safe procedure for replacing a failed hot-swap drive in a degraded array.",
    "Each group presents one match and its replacement procedure."
   ]
  },
  "discussion": [
   "Why do spinning disks still exist in data centers when SSDs are so much faster?",
   "What could go wrong if you replace a drive in a degraded array without identifying the bay first?"
  ],
  "exit": [
   [
    "Which gives more IOPS: a 15K HDD or an NVMe SSD?",
    "An NVMe SSD, by a large margin."
   ],
   [
    "Can a SAS controller run SATA drives?",
    "Yes, though a SATA controller cannot run SAS drives."
   ],
   [
    "What is the difference between hot-swap and hot-plug?",
    "Hot-swap needs no OS action; hot-plug may require notifying the OS before removal."
   ]
  ],
  "differentiation": [
   "Support: Provide a summary card listing each drive type with three ratings (speed, capacity, cost) using simple high/medium/low labels.",
   "Extend: Ask fast finishers to explain why DWPD matters for a database log volume and estimate which endurance class they would choose for a drive overwritten twice per day."
  ]
 },
 {
  "t": "RAID levels 0, 1, 5, 6, 10: fault tolerance, usable capacity, write penalty; hardware vs software RAID; JBOD",
  "objectives": [
   "Students will be able to calculate usable capacity for RAID 0, 1, 5, 6 and 10 given a drive count and size.",
   "Students will be able to state the number of drive failures each RAID level survives and its write penalty.",
   "Students will be able to compare hardware and software RAID and explain when JBOD and hot spares are used.",
   "Students will be able to recommend a RAID level for a described workload and explain why RAID is not a backup."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick hands-up votes."
   ],
   [
    15,
    "Teach",
    "Use colored sticky notes on the whiteboard as drives and data blocks to show striping, mirroring, RAID 5 parity, RAID 6 double parity and RAID 10 pairs. After each level, write capacity, failures survived and write penalty in a summary table."
   ],
   [
    15,
    "Activity",
    "Run the 'Pull a drive' simulation in groups of four."
   ],
   [
    5,
    "Discuss",
    "Debrief which arrays survived and why; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you kept your only copy of a school project on two identical USB drives that always mirror each other, and you accidentally deleted the project, how many copies would you have left?",
  "activity": {
   "title": "Pull a drive",
   "materials": "Index cards or sticky notes in four colors to represent drives, printed RAID scenario sheets (drive count, size, RAID level), a printed set of 'failure' cards naming which drive positions fail, calculators or student laptops.",
   "steps": [
    "Give each group a scenario sheet and lay out cards as drives in the stated RAID level, labeling data, mirror and parity blocks.",
    "Groups calculate usable capacity and write it on the sheet.",
    "Draw a failure card and remove those drive cards; groups decide whether the array survives and explain why.",
    "Draw a second failure card to simulate a failure during rebuild and decide again.",
    "Rotate scenario sheets so each group handles RAID 5, RAID 6 and RAID 10 at least once, then record write penalties for each."
   ]
  },
  "discussion": [
   "Why might an organization accept RAID 10's capacity cost instead of using RAID 6?",
   "If RAID is not a backup, what does a complete data protection plan for a file server include?"
  ],
  "exit": [
   [
    "What is the usable capacity of six 4 TB drives in RAID 6?",
    "16 TB, because RAID 6 gives N minus 2 drives: 4 x 4 TB."
   ],
   [
    "What is the write penalty of RAID 5?",
    "4."
   ],
   [
    "Can RAID 10 survive two drive failures?",
    "Only if the failed drives are in different mirror pairs."
   ]
  ],
  "differentiation": [
   "Support: Provide a formula card (RAID 0 = N, RAID 1/10 = N/2, RAID 5 = N-1, RAID 6 = N-2) and walk struggling students through one worked calculation before the activity.",
   "Extend: Ask fast finishers to calculate the effective write IOPS of a RAID 5 and a RAID 10 array built from the same drives, given a per-drive IOPS figure, using the write penalties."
  ]
 },
 {
  "t": "Storage architectures: DAS, NAS, SAN, iSCSI, Fibre Channel, FCoE; capacity planning and base-2 vs base-10 sizing",
  "objectives": [
   "Students will be able to distinguish DAS, NAS and SAN by connection type and by who owns the file system.",
   "Students will be able to compare Fibre Channel, iSCSI and FCoE, including which use IP.",
   "Students will be able to explain zoning and LUN masking as SAN access controls.",
   "Students will be able to convert between decimal and binary capacity units and build a simple capacity plan with headroom."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss answers briefly."
   ],
   [
    15,
    "Teach",
    "Draw three diagrams side by side: server with DAS, clients with a NAS, servers with a SAN fabric. Label protocols on each link. Then work through a decimal-to-binary conversion on the board (4 TB to TiB) and a capacity plan with RAID overhead and headroom."
   ],
   [
    15,
    "Activity",
    "Run the 'Storage consultant' exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share their design for the virtualization scenario; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You bought a phone advertised with 128 GB of storage, but the settings screen shows less. Where do you think the difference went?",
  "activity": {
   "title": "Storage consultant",
   "materials": "Printed client request cards (for example 'shared folders for 40 office staff', 'two VM hosts sharing a datastore, no FC budget', 'existing FC fabric, new database cluster', 'one server needs extra local space cheaply'), a printed protocol reference sheet, calculators or student laptops with a browser calculator.",
   "steps": [
    "Hand each pair four request cards.",
    "For each card, pairs choose DAS, NAS or SAN, name the protocol (SMB, NFS, iSCSI, FC, FCoE or SAS), and write one sentence explaining who owns the file system.",
    "For any SAN choice, pairs note how they would restrict access (zoning, LUN masking, separate VLAN).",
    "Pairs complete a capacity worksheet: given drive count, size and RAID level, calculate decimal usable capacity, convert to binary, and add 20 percent headroom.",
    "Pairs swap worksheets and check one calculation from another pair."
   ]
  },
  "discussion": [
   "When would the simplicity of DAS outweigh the flexibility of a SAN?",
   "Why do you think many organizations moved from Fibre Channel to iSCSI, and what might they give up?"
  ],
  "exit": [
   [
    "Which storage architecture uses SMB and NFS?",
    "NAS."
   ],
   [
    "Which SAN protocol carries Fibre Channel frames directly over Ethernet without IP?",
    "FCoE."
   ],
   [
    "About how much will a 4 TB drive show in an OS that reports binary units?",
    "About 3.64 TiB."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decision flowchart: 'Does a separate device own the file system?' Yes leads to NAS; No leads to 'Is it shared over a network?' Yes leads to SAN, No to DAS.",
   "Extend: Ask fast finishers to calculate the binary-unit gap at mega, giga and tera prefixes and explain why it grows with each step."
  ]
 },
 {
  "t": "Out-of-band management: iLO, iDRAC, IPMI/BMC, remote KVM, IP KVM, crash cart",
  "objectives": [
   "Students will be able to distinguish in-band from out-of-band management and explain when each is used.",
   "Students will be able to describe the functions of a BMC and identify iLO, iDRAC and IPMI as BMC-related technologies.",
   "Students will be able to compare remote KVM, IP KVM and a crash cart for console access.",
   "Students will be able to list at least four controls for securing out-of-band management interfaces."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas on the board."
   ],
   [
    15,
    "Teach",
    "Draw a server with two network paths: production NIC and BMC port on a management VLAN. Walk through BMC functions (sensors, event log, power, console, virtual media), then names (IPMI, iLO, iDRAC, Redfish), then KVM, IP KVM and crash cart. Close with the security checklist."
   ],
   [
    15,
    "Activity",
    "Run the 'Remote rescue' role-play in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups share which tool solved each incident; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your laptop is frozen and will not respond to the keyboard. What could you do if you were in another city and someone else owned the only power button?",
  "activity": {
   "title": "Remote rescue",
   "materials": "Printed incident cards (frozen OS after update, server powered off, need to reinstall OS remotely, BMC unreachable, suspicious BMC login at night), a printed mock BMC dashboard sheet showing sensors, an event log excerpt and buttons labeled Power, Console and Virtual Media, sticky notes.",
   "steps": [
    "Assign roles in each group: on-call administrator, remote site staff member, and security reviewer.",
    "The administrator draws an incident card and talks through which out-of-band tool to use and the exact steps, using the mock dashboard.",
    "The site staff member says what physical help is or is not available, forcing a crash-cart decision when remote tools fail.",
    "The security reviewer reads the event log excerpt and notes one risk and one control on a sticky note.",
    "Rotate roles and repeat with a new incident card."
   ]
  },
  "discussion": [
   "Why is a compromised BMC potentially worse than a compromised operating system account?",
   "What would you include in a policy for who may access management interfaces and how access is reviewed?"
  ],
  "exit": [
   [
    "Name the motherboard component that provides out-of-band management.",
    "The baseboard management controller (BMC)."
   ],
   [
    "What is the difference between a KVM switch and an IP KVM?",
    "An IP KVM adds network access so consoles can be viewed and controlled remotely; a basic KVM requires being at the switch."
   ],
   [
    "Give two ways to secure BMC access.",
    "Any two of: separate management network or VLAN, change default credentials, role-based directory accounts, firmware updates, disable unused protocols, use encrypted access, log and review access."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column card comparing in-band (needs working OS, uses production network) and out-of-band (works with OS down, separate port) to reference during the role-play.",
   "Extend: Ask fast finishers to draft a short standard for BMC deployment covering network placement, account management, logging and firmware updates."
  ]
 },
 {
  "t": "Firmware, BIOS and UEFI settings, Secure Boot, TPM, boot order, driver and firmware update planning",
  "objectives": [
   "Students will be able to compare BIOS and UEFI, including GPT support and Secure Boot.",
   "Students will be able to explain the different roles of Secure Boot and the TPM in protecting the boot process.",
   "Students will be able to configure a secure boot order for a production server and justify it.",
   "Students will be able to sequence a safe firmware and driver update plan using a compatibility matrix, testing and rollback."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take two or three stories."
   ],
   [
    12,
    "Teach",
    "Draw the boot chain: firmware, bootloader, OS kernel, drivers. Mark where Secure Boot checks signatures and where the TPM records measurements. Compare BIOS and UEFI in a table and explain boot order and firmware passwords."
   ],
   [
    18,
    "Activity",
    "Run the 'Update plan sequencing' card exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs compare their sequences and the risks they spotted; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Have you ever had a phone or computer update go wrong? What would you do differently if twenty important machines depended on that update?",
  "activity": {
   "title": "Update plan sequencing",
   "materials": "Printed step cards in random order (read release notes, check compatibility matrix, back up configuration, submit change request, update BMC, update BIOS, update RAID and NIC firmware, update drivers, test on one server, verify Secure Boot and versions, roll out to remaining servers, keep rollback package), a printed mini compatibility matrix with one deliberate mismatch, sticky notes.",
   "steps": [
    "Give each pair the shuffled step cards and the mini compatibility matrix.",
    "Pairs arrange the cards into a safe update sequence for twenty servers.",
    "Pairs find the mismatch in the compatibility matrix and decide which version to use instead.",
    "Pairs write on sticky notes where Secure Boot or the TPM could cause a problem during the update and how they would check it.",
    "Two pairs join to compare sequences and agree on one final order."
   ]
  },
  "discussion": [
   "How do you balance the urgency of a security firmware fix against the risk of breaking production servers?",
   "Why might an organization require firmware passwords even when the server room is locked?"
  ],
  "exit": [
   [
    "What does Secure Boot check before allowing boot code to run?",
    "Its digital signature against trusted keys stored in firmware."
   ],
   [
    "Name one feature the TPM enables.",
    "Drive encryption that unlocks only if the boot chain is unchanged (such as BitLocker), or boot attestation."
   ],
   [
    "What should you do before rolling a firmware update to all servers?",
    "Check the compatibility matrix and release notes, back up configurations, use change management, and test on one server with a rollback plan."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed update sequence with three blanks to fill, and a card stating 'Secure Boot = checks signatures; TPM = stores keys and measures.'",
   "Extend: Ask fast finishers to write a rollback procedure for a failed BIOS update, including what they would check in the BMC event log."
  ]
 },
 {
  "t": "Hardware components: CPUs and cores, memory types (ECC, registered), expansion cards, fans and hot-swappable parts",
  "objectives": [
   "Students will be able to explain sockets, cores and simultaneous multithreading and their effect on performance and licensing.",
   "Students will be able to compare ECC, registered (RDIMM), load-reduced and unbuffered memory and state population rules.",
   "Students will be able to select an expansion card that fits a server's PCIe slot lanes, size and CPU attachment.",
   "Students will be able to identify which server components are hot-swappable and describe safe replacement practice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list answers in two columns: desktop and server."
   ],
   [
    15,
    "Teach",
    "Draw a two-socket motherboard on the board, showing which memory banks and PCIe slots connect to each CPU. Explain cores and multithreading, ECC and RDIMMs, PCIe lanes and riser cards, then mark which parts are hot-swappable."
   ],
   [
    15,
    "Activity",
    "Run the 'Parts counter' troubleshooting exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share one diagnosis; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "What is one way you think a server's parts differ from the parts in a gaming PC or laptop? Why would those differences matter to a business?",
  "activity": {
   "title": "Parts counter",
   "materials": "A printed two-socket motherboard diagram with labeled memory banks (A for CPU 1, B for CPU 2) and PCIe slots, printed problem cards (half memory missing, server will not boot after memory upgrade, new card not detected, fan alarm, rising corrected memory errors), printed part cards (RDIMM, UDIMM, LRDIMM, x8 low-profile NIC, x16 full-height GPU, hot-swap fan, CPU), sticky notes.",
   "steps": [
    "Give each pair the motherboard diagram, problem cards and part cards.",
    "Pairs read each problem card and write a diagnosis on a sticky note, pointing to the relevant slot or socket on the diagram.",
    "For each problem, pairs choose the correct replacement or fix from the part cards and say whether it needs downtime.",
    "Pairs list the ESD precautions they would take for any fix that requires opening the chassis.",
    "Pairs trade diagnoses with a neighboring pair and challenge one answer."
   ]
  },
  "discussion": [
   "How would core-based licensing influence the processor you choose for a database server?",
   "When should a team act on corrected memory errors that are not yet causing crashes?"
  ],
  "exit": [
   [
    "What does registered (buffered) memory allow a server to do?",
    "Hold more memory modules and larger capacity by reducing electrical load on the memory controller."
   ],
   [
    "Why might a PCIe card in a two-socket server not be detected when only one CPU is installed?",
    "The slot may be wired to the second CPU, so it works only when that CPU is present."
   ],
   [
    "Which is usually hot-swappable: a fan or a memory module?",
    "A fan; memory normally requires shutting down."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a color-coded diagram showing CPU 1 resources in one color and CPU 2 resources in another, plus a list of the usual hot-swap parts.",
   "Extend: Ask fast finishers to compare the cost and performance implications of one 32-core CPU versus two 16-core CPUs, considering memory channels, PCIe slots and per-socket versus per-core licensing."
  ]
 },
 {
  "t": "OS installation: minimum requirements, HCL, bare metal vs virtual, GUI vs core/headless installs, partitioning and file systems (NTFS, ReFS, ext4, XFS, VMFS)",
  "objectives": [
   "Students will be able to explain the purpose of minimum requirements and the HCL and diagnose a missing-driver installation problem.",
   "Students will be able to compare bare metal and virtual installs and GUI versus core or headless installs.",
   "Students will be able to design a partition layout that separates OS and data on Windows and Linux.",
   "Students will be able to match NTFS, ReFS, ext4, XFS and VMFS to appropriate platforms and use cases."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather a few answers."
   ],
   [
    15,
    "Teach",
    "Walk through an installation checklist on the board: requirements, HCL, bare metal or virtual, GUI or core, partitions, file system. Show a sample Linux layout (/boot, /, /var, swap on LVM) and a Windows layout (C: and D:). Build a file system table with platform and best use."
   ],
   [
    15,
    "Activity",
    "Run the 'Install planner' exercise in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs present one plan; use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Before you install a new game or app, what do you check to make sure it will run? What could go wrong if you skip that step on a server?",
  "activity": {
   "title": "Install planner",
   "materials": "Printed server request cards (Windows domain controller, Linux log server, VMware host datastore, Windows backup repository, Linux database with large files), a printed blank install plan template (requirements check, HCL check, bare metal or virtual, GUI or core/headless, partition layout, file system per volume), markers.",
   "steps": [
    "Give each pair two server request cards and two blank plan templates.",
    "Pairs complete each template, writing one reason for every choice.",
    "Pairs sketch the partition layout as boxes on the template, labeling mount points or drive letters and file systems.",
    "Read out a twist card ('installer shows no disks'; 'security requires minimal attack surface'; 'volume must be shrunk next year') and have pairs revise their plans.",
    "Pairs swap plans with another pair, who checks file system choices against the platform table."
   ]
  },
  "discussion": [
   "When would you still choose a full GUI installation despite the security trade-offs?",
   "Why might a vendor refuse to support a server running on hardware not on the HCL, and is that reasonable?"
  ],
  "exit": [
   [
    "An installer cannot see any disks on a server with a RAID controller. What is the most likely cause?",
    "The installer lacks the storage controller driver; check the HCL and load the correct driver."
   ],
   [
    "Name one advantage of Server Core over Desktop Experience.",
    "Smaller attack surface, fewer patches, or lower resource use."
   ],
   [
    "Which file system lets multiple ESXi hosts share a datastore?",
    "VMFS."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each file system with its platform and one key feature, and a sample completed install plan to model.",
   "Extend: Ask fast finishers to compare ext4 and XFS for a volume that may need to shrink later and explain how LVM affects the decision."
  ]
 },
 {
  "t": "Installation methods: media, PXE/network boot, imaging and cloning, templates, answer files, P2V",
  "objectives": [
   "Students will be able to describe the PXE boot sequence and name the DHCP, TFTP and boot order requirements it depends on.",
   "Students will be able to compare media installs, answer files, imaging, templates and P2V in terms of speed, consistency and setup effort.",
   "Students will be able to explain why a Windows image must be generalized with Sysprep before deployment.",
   "Students will be able to choose an appropriate installation method for a given deployment scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four estimates on the board. Ask what could go wrong when the same person installs forty servers by hand."
   ],
   [
    12,
    "Teach",
    "Walk through each method in order from manual to automated. Draw the PXE sequence on the whiteboard as arrows: power on, DHCP request, DHCP offer with boot server and file name, TFTP download, installer starts. Then explain answer files, Sysprep and generalizing, templates, and P2V with its cleanup steps."
   ],
   [
    18,
    "Activity",
    "Run the deployment method matching activity in small groups, then have each group defend one choice to the class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect consistency and security to the choice of method."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "You need to build forty identical servers by Friday. If one manual install takes an hour, how long will it take, and how confident are you that all forty will be configured exactly the same?",
  "activity": {
   "title": "Pick the deployment method",
   "materials": "Printed scenario cards (eight short deployment scenarios), sticky notes, whiteboard with five columns labeled Media, PXE plus answer file, Image, Template, P2V.",
   "steps": [
    "Split the class into groups of three or four and give each group a stack of scenario cards, such as a single server at a remote site with no network services, two hundred lab VMs, an old physical server being consolidated, or a weekly rebuild of test servers.",
    "Groups place each card under the column that fits best and write one sentence on a sticky note explaining the requirement or risk that drove the choice.",
    "For every PXE card, groups must also list what infrastructure has to exist first (DHCP or relay, TFTP, network boot in the boot order, provisioning VLAN).",
    "Each group presents one card to the class; the teacher corrects any misplacements and highlights where Sysprep or post-P2V cleanup is needed."
   ]
  },
  "discussion": [
   "Why might an organization keep a media-based install procedure documented even after automating everything with PXE?",
   "What risks come from leaving PXE enabled on a general user network, and how would you reduce them?"
  ],
  "exit": [
   [
    "List the steps of a PXE boot in order.",
    "The NIC requests an address from DHCP, the DHCP response includes the boot server and boot file name, the client downloads the file with TFTP, and the boot file starts the installer."
   ],
   [
    "What does Sysprep do and why is it needed before imaging?",
    "It generalizes Windows by removing unique identifiers such as the SID and computer name so each deployed copy gets its own identity."
   ],
   [
    "Name the answer file used by Windows and by Red Hat-based Linux.",
    "Windows uses an unattend file such as unattend.xml; Red Hat-based Linux uses Kickstart."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed PXE flow diagram with blanks for DHCP, TFTP and boot file, and let them fill in the gaps before the card sort.",
   "Extend: Ask fast finishers to design a full deployment pipeline for a new branch office that combines PXE, an answer file and configuration management, including how they would keep the image current and secure the answer file's credentials."
  ]
 },
 {
  "t": "Network services: static vs DHCP addressing, DNS, NTP, NIC teaming/bonding, VLAN tagging, firewall ports, IPv4 and IPv6",
  "objectives": [
   "Students will be able to explain why servers use static addresses or DHCP reservations and identify the four required IP settings.",
   "Students will be able to match common DNS record types and well-known ports to their purposes.",
   "Students will be able to explain how NTP drift breaks authentication and how NIC teaming and 802.1Q trunks are configured.",
   "Students will be able to troubleshoot a server connectivity scenario by isolating the misconfigured network service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up scenario on the projector and take quick guesses. Write each guess on the board to revisit later."
   ],
   [
    13,
    "Teach",
    "Cover addressing and IPv4 versus IPv6, then DNS record types, NTP and Kerberos, teaming modes, trunk versus access ports, and the port list. Draw a hypervisor with one trunk carrying three VLANs."
   ],
   [
    17,
    "Activity",
    "Run the network ticket triage activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up guesses and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "A brand-new server answers ping and its application service is running, yet every user logon fails. What network-related settings would you check first, and why?",
  "activity": {
   "title": "Network ticket triage",
   "materials": "Printed ticket cards, each with a symptom and a short output excerpt (for example an ipconfig listing with no gateway, a clock ten minutes off, a switch port shown as access mode, a firewall rule allowing 3389 from any address); whiteboard.",
   "steps": [
    "Pairs receive six ticket cards. Each card describes a symptom and shows a short excerpt of command output or configuration.",
    "For each card, pairs identify the misconfigured service (addressing, DNS, NTP, teaming, VLAN trunk, or firewall port) and write the fix on the back.",
    "Pairs then swap cards with a neighboring pair and check each other's answers, noting any disagreement.",
    "The teacher reviews disagreements on the whiteboard and reinforces the related port numbers and record types."
   ]
  },
  "discussion": [
   "Why might an organization choose DHCP reservations for servers instead of manually configured static addresses?",
   "What are the trade-offs between connecting both team members to one switch versus two switches?"
  ],
  "exit": [
   [
    "Which DNS record type helps clients locate domain controllers?",
    "SRV records."
   ],
   [
    "A server's clock is several minutes fast and users cannot authenticate. What protocol is failing and what fixes it?",
    "Kerberos rejects the tickets due to clock skew; configuring NTP to sync with the domain's time source fixes it."
   ],
   [
    "Give the port numbers for SSH, HTTPS, SMB and LDAPS.",
    "SSH 22, HTTPS 443, SMB 445, LDAPS 636."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page reference card listing the record types and ports, and let struggling students use it during the triage activity before quizzing them without it.",
   "Extend: Ask fast finishers to design the network configuration for a hypervisor host with two NICs, three VLANs and a team connected to two switches, stating which team mode they would pick and what switch configuration it requires."
  ]
 },
 {
  "t": "Server roles: web, application, database, file and print, directory services, DNS/DHCP, mail, messaging, NTP, and how roles relate to hardware sizing",
  "objectives": [
   "Students will be able to describe the purpose of common server roles including web, application, database, file, print, directory, DNS, DHCP, mail, messaging and NTP.",
   "Students will be able to identify the primary bottleneck resource for each role.",
   "Students will be able to apply a sizing process that uses baselines, growth and headroom.",
   "Students will be able to evaluate whether two roles should share a server."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question and let students vote on which server should get the biggest share of the budget."
   ],
   [
    12,
    "Teach",
    "Go through each role, its ports and its main resource needs. Build a table on the whiteboard with columns for role, purpose and bottleneck resource as you talk."
   ],
   [
    18,
    "Activity",
    "Run the role and resource card sort followed by a short sizing exercise."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore role consolidation and risk."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You have budget for one premium server and two basic ones for a web store: web front end, application tier and database. Which tier gets the premium server, and what would you put in it?",
  "activity": {
   "title": "Role and resource card sort",
   "materials": "Printed cards with role names, printed cards with resource priorities (memory, IOPS, capacity, network throughput, CPU, redundancy), whiteboard, sticky notes.",
   "steps": [
    "In groups of three, students match each role card to one or two resource priority cards and lay them out on their desks.",
    "Each group writes one sentence per role on a sticky note explaining why that resource is the bottleneck.",
    "The teacher gives each group a short baseline description for one role (for example a file server at high storage use growing steadily each year) and asks them to propose a sizing with growth and headroom.",
    "Groups post their sizing on the whiteboard and the class compares approaches."
   ]
  },
  "discussion": [
   "When is it acceptable to combine roles on one server, and when is it a bad idea?",
   "How does virtualization change the way we think about one role per server?"
  ],
  "exit": [
   [
    "Which resources matter most for a database server?",
    "Memory for caching and fast, high-IOPS low-latency storage, plus enough CPU cores for concurrent queries."
   ],
   [
    "Why should DNS and DHCP run redundantly even though they use few resources?",
    "Nearly every system depends on them, so a single failure would stop name resolution or addressing across the network."
   ],
   [
    "List the steps of sizing a server for a role.",
    "Identify the bottleneck resource, gather a baseline or vendor guidance, add expected growth, and leave headroom."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially filled role table with the purpose column complete so they can focus on matching resources.",
   "Extend: Ask fast finishers to design a small three-tier environment on two virtualization hosts, assigning roles to VMs and explaining how they would keep the design working if one host fails."
  ]
 },
 {
  "t": "High availability: clustering (active-active vs active-passive), heartbeat, quorum, load balancing methods (round robin, least connections), failover and failback",
  "objectives": [
   "Students will be able to compare active-active and active-passive clusters, including the capacity implications of each.",
   "Students will be able to explain heartbeat, split brain and how quorum with a witness prevents it.",
   "Students will be able to distinguish failover from failback and justify manual failback.",
   "Students will be able to select round robin, weighted round robin or least connections for a given workload."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let a few students share their answers before revealing that the topic is split brain."
   ],
   [
    12,
    "Teach",
    "Draw two nodes, shared storage and a heartbeat link. Cut the link on the whiteboard and ask what each node should do. Introduce quorum, the witness and vote counting, then failover and failback, then load balancing methods."
   ],
   [
    18,
    "Activity",
    "Run the human cluster role-play."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play to real design decisions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two servers share the same set of disks. The cable between them is cut, but both stay powered on and each thinks the other has died. What could go wrong if both start writing to the disks?",
  "activity": {
   "title": "Human cluster and load balancer role-play",
   "materials": "Sticky notes labeled as client requests (some marked short, some marked long), three printed signs reading Node A, Node B and Witness, a string or tape line on the floor to represent the heartbeat link, whiteboard for vote counting.",
   "steps": [
    "Choose two students to be cluster nodes and one to be the witness. The nodes hold up a hand every few seconds as a heartbeat. The class counts votes on the whiteboard.",
    "The teacher removes the string between the nodes. Each node must decide whether it can still see the witness and therefore holds two of three votes. The node without a majority sits down and stops serving.",
    "Next, three students act as web servers and one as a load balancer. The load balancer hands out request sticky notes using round robin, then repeats with least connections. Long requests stay on the server's desk until the teacher calls them complete.",
    "The class compares how the requests piled up under each method and records observations on the board."
   ]
  },
  "discussion": [
   "When would you choose active-passive over active-active even though the standby sits idle?",
   "What are the risks of automatic failback, and when might it still make sense?"
  ],
  "exit": [
   [
    "What problem does quorum solve?",
    "Split brain, where isolated nodes both try to run the same service and write to the same data."
   ],
   [
    "Two active-active nodes each run at 70 percent load. What happens if one fails?",
    "The survivor would need 140 percent capacity, so performance degrades badly or the service fails; each node needs spare capacity."
   ],
   [
    "What is the difference between round robin and least connections?",
    "Round robin sends requests to each server in turn; least connections sends each new request to the server with the fewest active connections."
   ]
  ],
  "differentiation": [
   "Support: Provide a vote-counting worksheet showing two-node, two-node-plus-witness and three-node clusters so students can see which side holds a majority after a link failure.",
   "Extend: Ask fast finishers to calculate how many votes a four-node cluster has, what happens if it splits two and two, and how a witness changes the outcome."
  ]
 },
 {
  "t": "Redundancy: NIC teaming, multipathing (MPIO), redundant power and storage, fault tolerance vs high availability",
  "objectives": [
   "Students will be able to identify single points of failure in a described server, network and power design.",
   "Students will be able to explain how NIC teaming and MPIO provide redundant network and storage paths.",
   "Students will be able to distinguish fault tolerance from high availability with examples.",
   "Students will be able to recommend changes that remove hidden shared dependencies."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers on the board."
   ],
   [
    12,
    "Teach",
    "Draw a server with two NICs, two HBAs and two power supplies. Trace each path to switches, storage controllers, PDUs and UPS units. Explain MPIO, NIC teaming, power and storage redundancy, then contrast fault tolerance and high availability."
   ],
   [
    18,
    "Activity",
    "Run the SPOF hunt on printed rack diagrams."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions individually."
   ]
  ],
  "warmup": "A server has two power supplies and two network cards. Is it free of single points of failure? What would you need to know before answering?",
  "activity": {
   "title": "SPOF hunt",
   "materials": "Printed diagrams (teacher-drawn) of three server racks showing NICs, switches, HBAs, fabric switches, power supplies, PDUs and UPS units, with several hidden single points of failure; red and green markers or sticky notes.",
   "steps": [
    "In pairs, students trace every path from each server to its network, storage and power sources and circle any single point of failure in red.",
    "For each SPOF, pairs write a fix on a sticky note, such as moving a cable to a second switch or enabling MPIO.",
    "Pairs label each component as providing fault tolerance or high availability.",
    "The teacher projects the answer key and pairs score themselves, discussing any SPOFs they missed."
   ]
  },
  "discussion": [
   "How would you decide whether a service needs fault tolerance or whether high availability is enough?",
   "What monitoring would you put in place so that a failed redundant component does not go unnoticed?"
  ],
  "exit": [
   [
    "What technology provides redundant paths to SAN storage?",
    "MPIO (multipath I/O)."
   ],
   [
    "Give one example of fault tolerance and one of high availability.",
    "Fault tolerance: a RAID 1 mirror continuing after a disk fails. High availability: a cluster failing over a service to another node with a brief interruption."
   ],
   [
    "Why is a server with two power supplies on one PDU not fully redundant?",
    "The PDU, its circuit or its UPS is still a single point of failure for both supplies."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a checklist of questions to ask at each hop (Is there a second one? Does it share anything with the first?) while they trace the diagrams.",
   "Extend: Ask fast finishers to redesign one rack so that no single switch, PDU, UPS, HBA or storage controller failure can stop the server, and estimate which added parts cost the most."
  ]
 },
 {
  "t": "Virtualization: Type 1 vs Type 2 hypervisors, host vs guest, resource allocation and overcommitment, virtual switches and NICs, snapshots, templates, VM migration",
  "objectives": [
   "Students will be able to compare Type 1 and Type 2 hypervisors and give an example of each.",
   "Students will be able to explain CPU, memory and storage overcommitment and the symptoms when it goes too far.",
   "Students will be able to describe virtual switches, vNICs, snapshots and templates and state why a snapshot is not a backup.",
   "Students will be able to plan host maintenance using live migration."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take quick votes."
   ],
   [
    13,
    "Teach",
    "Draw a host with a hypervisor, three guests, a virtual switch and two uplinks. Explain Type 1 versus Type 2, then allocation and overcommitment with simple numbers, then snapshots and delta files, templates, and live migration requirements."
   ],
   [
    17,
    "Activity",
    "Run the overcommitted host calculation and troubleshooting activity in pairs."
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
  "warmup": "A host has 128 GB of memory, and its VMs have a combined 192 GB assigned. Is that automatically a problem? What would you want to know first?",
  "activity": {
   "title": "Overcommitted host clinic",
   "materials": "Printed host sheets showing physical cores, physical memory, datastore size and a list of VMs with their vCPU, memory, disk type and snapshot age; calculators or student laptops; whiteboard.",
   "steps": [
    "Pairs receive one host sheet each and calculate the CPU and memory overcommitment ratios and the worst-case datastore usage if all thin disks fill.",
    "Pairs identify which resource is most at risk and which VMs carry old snapshots.",
    "Pairs write a short action plan: which VMs to migrate, which snapshots to delete, and whether to change any disks or allocations.",
    "Two or three pairs present their plans, and the class discusses whether live migration is possible given the shared storage and CPU details on the sheet."
   ]
  },
  "discussion": [
   "Why might an organization still use Type 2 hypervisors even though Type 1 performs better?",
   "How would you write a policy for snapshot use that lets administrators roll back safely without hurting performance?"
  ],
  "exit": [
   [
    "Name one Type 1 and one Type 2 hypervisor.",
    "Type 1: ESXi, Hyper-V or KVM. Type 2: VirtualBox or VMware Workstation."
   ],
   [
    "Why is a snapshot not a backup?",
    "It depends on the original disk and lives on the same storage, so it is lost if that storage or base disk fails."
   ],
   [
    "What does live migration usually require?",
    "Shared storage or a storage migration, compatible CPUs on both hosts, and a fast migration network."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked example of an overcommitment ratio calculation before students tackle their own host sheet.",
   "Extend: Ask fast finishers to design a two-host cluster with enough capacity that either host can carry all VMs during maintenance, and justify the memory size they choose."
  ]
 },
 {
  "t": "Cloud models: IaaS, PaaS, SaaS; public, private, hybrid; on-premises vs cloud-hosted servers",
  "objectives": [
   "Students will be able to compare IaaS, PaaS and SaaS by identifying which layers the provider and customer manage.",
   "Students will be able to explain the shared responsibility model and name what the customer always owns.",
   "Students will be able to distinguish public, private, hybrid and community clouds.",
   "Students will be able to recommend on-premises or cloud hosting for a workload and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and have students write down who they think should have patched the server."
   ],
   [
    12,
    "Teach",
    "Draw a stack on the whiteboard from facilities and hardware at the bottom to data and users at the top. Shade the provider's layers for IaaS, PaaS and SaaS in three columns. Then cover deployment models and CapEx versus OpEx."
   ],
   [
    18,
    "Activity",
    "Run the responsibility stack card sort and the scenario round."
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
  "warmup": "A company moved its claims portal VM to the cloud, and an auditor found the OS three months behind on patches. Who was responsible for patching it? What would you need to know to answer?",
  "activity": {
   "title": "Who owns this layer",
   "materials": "Printed layer cards (physical facility, hardware, hypervisor, operating system, runtime, application, data, user accounts), three columns on the whiteboard labeled IaaS, PaaS and SaaS, two colors of sticky notes (provider and customer), printed workload scenario cards.",
   "steps": [
    "In groups of three, students place each layer card in each column and mark it with a provider or customer sticky note.",
    "Groups compare their stacks with the class answer drawn by the teacher and correct any mistakes, paying attention to data and user accounts.",
    "Each group draws a workload scenario card (for example seasonal ticket sales, a regulated records system, an internal email service) and chooses a service model and deployment model.",
    "Groups present their choice in one minute, naming one responsibility they keep and one they hand to the provider."
   ]
  },
  "discussion": [
   "Why do so many cloud security incidents come from customer misconfiguration rather than provider failures?",
   "What factors would push an organization to keep a workload on-premises even if the cloud is cheaper?"
  ],
  "exit": [
   [
    "Who patches the operating system in PaaS?",
    "The provider."
   ],
   [
    "Give one example of a hybrid cloud design.",
    "Keeping a sensitive database on-premises while running web servers in a public cloud that connect to it."
   ],
   [
    "What is the difference between CapEx and OpEx in server hosting?",
    "CapEx is buying hardware up front, typical of on-premises; OpEx is paying ongoing fees, typical of cloud services."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the meal analogy table (kitchen rental, meal kit, restaurant) next to the layer stack so they can map each layer to a familiar example.",
   "Extend: Ask fast finishers to write a short responsibility matrix for a hybrid design that uses SaaS email, PaaS web hosting and an on-premises database, listing who patches, backs up and controls access for each part."
  ]
 },
 {
  "t": "Scripting basics: Bash, PowerShell, batch, Python; variables, loops, conditionals, comparators; common uses (user setup, log checks, scheduled tasks)",
  "objectives": [
   "Students will be able to identify Bash, PowerShell, batch and Python scripts from syntax clues.",
   "Students will be able to explain what variables, conditionals, loops and comparators do in a short script.",
   "Students will be able to describe common administrative uses of scripts and how they are scheduled with cron and Task Scheduler.",
   "Students will be able to list safe scripting practices such as avoiding hard-coded credentials."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project four short unlabeled script snippets and ask students to guess the language of each."
   ],
   [
    12,
    "Teach",
    "Reveal the answers and walk through the clues for each language. Explain variables, conditionals, loops and comparators side by side in a four-column table on the whiteboard. Read the Bash disk check and the PowerShell user creation examples line by line, then cover cron fields and Task Scheduler."
   ],
   [
    18,
    "Activity",
    "Run the script detective activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about safety and automation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here are four short scripts with no file names. Which language is each one written in, and what clue gave it away?",
  "activity": {
   "title": "Script detective",
   "materials": "Printed cards each showing a short script (six to ten lines) in Bash, PowerShell, batch or Python, with a mix of loops, conditionals and comparators; a few cards contain a deliberate mistake such as > used as a comparator in PowerShell or a hard-coded password; student laptops with a browser optional.",
   "steps": [
    "Pairs receive four script cards. For each card they write the language, the clues that identified it, and a one-sentence description of what the script does.",
    "Pairs find the deliberate mistake on any card that has one and write the fix.",
    "Each pair writes a crontab line or a Task Scheduler description that would run one of their scripts at a chosen time.",
    "The teacher reviews answers aloud, asking pairs to explain the clues and the mistakes they found."
   ]
  },
  "discussion": [
   "What could go wrong if a script that creates user accounts runs twice by accident, and how would you design it to be safe?",
   "Why is version control useful even for short administrative scripts?"
  ],
  "exit": [
   [
    "What clues identify a PowerShell script?",
    "A .ps1 extension, $ variables, verb-noun cmdlets such as Get-Service, and comparators such as -eq and -gt."
   ],
   [
    "What is the difference between a for loop and a while loop?",
    "A for loop runs once per item in a list; a while loop runs as long as a condition stays true."
   ],
   [
    "Name two safe scripting practices.",
    "Any two of: test in a lab, avoid hard-coded passwords, run with least privilege, add comments, keep scripts in version control, sign scripts."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a clue sheet listing the signature features of each language to use while sorting the cards.",
   "Extend: Ask fast finishers to rewrite the Bash disk check in pseudocode for PowerShell or Python, using the correct comparator for that language."
  ]
 },
 {
  "t": "Asset management and documentation: labeling, inventory, warranty, life-cycle, baselines, diagrams, change management, SLAs, secure storage of documents",
  "objectives": [
   "Students will be able to describe what an asset inventory or CMDB records and why consistent labeling matters.",
   "Students will be able to distinguish configuration baselines from performance baselines and explain how each is used.",
   "Students will be able to outline the steps of a change management process, including a rollback plan.",
   "Students will be able to explain SLAs and how to store sensitive documentation securely."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario and have students list on sticky notes what they would want to know first."
   ],
   [
    12,
    "Teach",
    "Group the sticky notes into categories on the whiteboard (labels, inventory, warranty, diagrams, change history) and use them to teach each topic, then cover baselines, SLAs and secure storage."
   ],
   [
    18,
    "Activity",
    "Run the change advisory board role-play."
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
  "warmup": "You are called at 3 a.m. to fix a server called APP-07 in a rack full of unlabeled machines, and the documentation is on a system that is down. What information do you wish you had, and where should it have been?",
  "activity": {
   "title": "Change advisory board role-play",
   "materials": "Printed blank change request forms (fields: description, reason, risk, impact, implementation steps, test plan, rollback plan, schedule), printed scenario cards describing proposed changes, whiteboard.",
   "steps": [
    "Groups of four receive a scenario card, such as a firmware update on a database server, adding a VLAN to a hypervisor trunk, or replacing a failing power supply.",
    "Each group fills out a change request form, paying special attention to the rollback plan and maintenance window.",
    "Groups swap forms. Each group acts as the CAB for another group's request, approving, rejecting or asking for changes, and writing one reason.",
    "The teacher reviews a few decisions with the class and highlights strong rollback plans and missing risk assessments."
   ]
  },
  "discussion": [
   "How can an organization keep its CMDB and diagrams accurate when many people make changes every week?",
   "When is an emergency change justified, and what should happen after it is made?"
  ],
  "exit": [
   [
    "Name three fields an asset inventory should record.",
    "Any three of: make, model, serial number, location (rack and U), owner, purchase date, warranty, configuration, relationships."
   ],
   [
    "What is a configuration baseline used for?",
    "Comparing a server's current settings with the approved standard to detect drift or unauthorized changes."
   ],
   [
    "Why should documentation have an offline copy?",
    "So it is still available during an outage that takes down the systems where it is normally stored."
   ]
  ],
  "differentiation": [
   "Support: Provide a completed sample change request so struggling students can model their own form on it.",
   "Extend: Ask fast finishers to design a simple asset life-cycle checklist for decommissioning a server, covering monitoring, DNS, CMDB updates and storage sanitization."
  ]
 },
 {
  "t": "Licensing models: per socket, per core, per user, per device/CAL, site, subscription, open source; license compliance and version compatibility",
  "objectives": [
   "Students will be able to compare per-socket, per-core, per-user, per-device, site, subscription, perpetual and open source licensing.",
   "Students will be able to choose between user and device CALs for a given scenario.",
   "Students will be able to explain how core counts and virtualization affect license costs.",
   "Students will be able to describe compliance practices and version compatibility checks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question and let students vote before revealing that licensing, not hardware, may be the bigger cost."
   ],
   [
    12,
    "Teach",
    "Explain each licensing model with a simple drawing of a server, its sockets and cores, and the users and devices connecting to it. Cover the virtualization caveat, open source obligations, compliance tracking and version compatibility."
   ],
   [
    18,
    "Activity",
    "Run the license calculator challenge in small groups."
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
  "warmup": "You can buy a server with twice as many cores for almost the same price. Is it automatically the better deal for running a database? What else would you check?",
  "activity": {
   "title": "License calculator challenge",
   "materials": "Printed scenario cards with simple made-up licensing terms (for example a fictional per-core price with a minimum per processor, a per-socket price, user and device CAL prices), calculators or student laptops, whiteboard.",
   "steps": [
    "Groups of three receive four scenario cards, such as choosing CPUs for a core-licensed database, deciding between user and device CALs for a clinic, or comparing a subscription with a perpetual license over several years.",
    "Groups calculate the cost of each option using the fictional prices on the card and record which they would choose and why.",
    "For one card, groups must also identify a compliance or version compatibility risk, such as a VM that can live-migrate to an unlicensed host.",
    "Groups share their answers, and the teacher highlights where hardware choices changed licensing costs."
   ]
  },
  "discussion": [
   "Why might an organization choose a subscription even though a perpetual license could be cheaper over many years?",
   "How should licensing be considered during virtualization cluster design and change management?"
  ],
  "exit": [
   [
    "What is the difference between per-socket and per-core licensing?",
    "Per-socket charges for each physical processor socket regardless of cores; per-core charges for each physical core, often with minimums."
   ],
   [
    "When are device CALs a better choice than user CALs?",
    "When many people share fewer devices, such as shift workers or kiosks."
   ],
   [
    "Name one compliance practice.",
    "Any one of: record purchases and keys in the asset system, track installations with inventory tools, reconcile regularly, remove software from decommissioned servers."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a worked example comparing user and device CAL totals before they attempt the scenarios.",
   "Extend: Ask fast finishers to analyze a three-host virtualization cluster running a core-licensed database and propose a design that limits which hosts the VM can run on, explaining the trade-off with availability."
  ]
 },
 {
  "t": "Data security: encryption at rest and in transit, data retention, data storage location, UEFI/BIOS passwords, bootloader password",
  "objectives": [
   "Students will be able to distinguish encryption at rest from encryption in transit and name technologies for each.",
   "Students will be able to explain why key management determines the strength of encryption.",
   "Students will be able to describe data retention, legal holds and data sovereignty and apply them to a scenario.",
   "Students will be able to compare UEFI/BIOS setup, power-on and bootloader passwords and the threats each addresses."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the lost backup drives and collect answers."
   ],
   [
    12,
    "Teach",
    "Draw data in three places on the whiteboard: on disk, on the wire and at boot. Add the matching controls under each, then cover key management, retention, legal holds, data sovereignty and the layered boot protections."
   ],
   [
    18,
    "Activity",
    "Run the control matching and incident scenario activity."
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
  "warmup": "A box of backup drives is lost in transit. What would you need to know to decide whether this is a reportable data breach?",
  "activity": {
   "title": "Match the control to the threat",
   "materials": "Printed threat cards (stolen drive, lost backup tape, eavesdropping on file share traffic, someone booting from a USB stick, someone editing the boot menu, data stored in the wrong country, records kept for decades), printed control cards (BitLocker or LUKS, encrypted backups, SMB encryption or TLS, UEFI setup password, GRUB password, region selection, retention policy), whiteboard.",
   "steps": [
    "Pairs match each threat card to one or more control cards and write a one-sentence reason for each match.",
    "Each pair receives a short incident scenario, such as a lost laptop-sized server from a branch office, and lists which controls would have reduced the impact and which were missing.",
    "Pairs identify where the encryption keys should have been kept in their scenario.",
    "The class reviews the matches together and the teacher corrects common confusions, especially between firmware and bootloader passwords."
   ]
  },
  "discussion": [
   "How would you balance a business request to keep all data forever against privacy and breach risk?",
   "Why might an organization choose self-encrypting drives over software encryption, or the other way around?"
  ],
  "exit": [
   [
    "Name one technology for encryption at rest and one for encryption in transit.",
    "At rest: BitLocker, LUKS, self-encrypting drives or TDE. In transit: TLS, SSH, SFTP, LDAPS, SMB encryption, VPN or IPsec."
   ],
   [
    "What is data sovereignty?",
    "The principle that data is subject to the laws of the country where it is physically stored."
   ],
   [
    "What does a GRUB password protect that a firmware password does not?",
    "It prevents editing boot entries at startup, such as booting into single-user mode for a root shell."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column chart labeled At rest and In transit to sort technologies into before the matching activity.",
   "Extend: Ask fast finishers to write a short retention and encryption policy for a small medical office, covering backups, key storage, legal holds and where off-site copies may be kept."
  ]
 },
 {
  "t": "Physical security: locked racks and cages, mantraps/access vestibules, badge readers, biometrics, cameras, security guards, fire suppression",
  "objectives": [
   "Students will be able to explain defense in depth for a data center, naming controls at the perimeter, entrance, room, cage and rack layers.",
   "Students will be able to identify which physical control addresses a given threat, such as an access control vestibule for tailgating.",
   "Students will be able to compare wet-pipe, pre-action and clean agent fire suppression for a server room.",
   "Students will be able to classify physical controls as preventive, detective or deterrent."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect three or four answers on the whiteboard. Point out that almost every answer bypasses passwords entirely."
   ],
   [
    10,
    "Teach",
    "Draw concentric layers on the whiteboard (perimeter, entrance, room, cage, rack). Walk through badge readers, the vestibule and how it stops tailgating and piggybacking, biometrics as something you are, cameras and guards. Finish with fire detection and the three suppression types, stressing water damage versus clean agents."
   ],
   [
    20,
    "Activity",
    "Run the 'Secure the Server Room' design activity described below. Circulate and ask each group which threat each control addresses."
   ],
   [
    5,
    "Discuss",
    "Have two groups present their floor plans and use the discussion questions to compare choices and trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "You find an unlocked server rack in a hallway closet. List three things a stranger could do to that server in two minutes without knowing any password.",
  "activity": {
   "title": "Secure the Server Room",
   "materials": "Whiteboard or chart paper, markers, a printed one-page floor plan of a fictional small data center (entrance, lobby, server room, loading dock), and printed control cards the teacher makes (badge reader, vestibule, biometric reader, CCTV camera, guard desk, locked cage, rack locks, pre-action sprinklers, clean agent system, wet-pipe sprinklers, leak sensor, EPO switch with cover).",
   "steps": [
    "Put students in groups of three or four and give each group a floor plan and a set of control cards.",
    "Tell groups they have a budget of eight cards and must place them on the floor plan to protect a payroll server in the back corner.",
    "Each placed card needs a sticky note naming the threat it stops or detects and whether it is preventive, detective or deterrent.",
    "Read out two incidents (a visitor following an employee in; a sprinkler head cracked by a ladder) and have each group check whether its design handles them.",
    "Groups revise one card choice based on the incidents and record why."
   ]
  },
  "discussion": [
   "If you could afford only one of a guard or a vestibule, which would you choose for a small data center, and what would you lose?",
   "Why might an organization accept the risk of a wet-pipe sprinkler system in an office but not in its server room?"
  ],
  "exit": [
   [
    "Which control stops tailgating, and how?",
    "An access control vestibule (mantrap); only one door opens at a time and the inner door will not open for two people."
   ],
   [
    "Name one fire suppression type that protects electronics and explain why.",
    "A clean agent system, because it extinguishes fire without water or residue (pre-action is also acceptable because pipes stay dry until detection)."
   ],
   [
    "Is a CCTV camera a preventive or detective control?",
    "Mainly detective and deterrent; it records and discourages but does not physically stop entry."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column card (threat, control) prefilled with three threats so they only need to match controls, and let them use the lesson's terms list during the activity.",
   "Extend: Ask fast finishers to write a short policy paragraph for visitor handling in a colocation facility, covering sign-in, badges, escorts and how long camera footage is kept."
  ]
 },
 {
  "t": "Identity and access management: least privilege, role-based access, groups, MFA, SSO, account lockout, password policies, service accounts, auditing",
  "objectives": [
   "Students will be able to explain least privilege and privilege creep and apply them to user and service accounts.",
   "Students will be able to distinguish true multifactor authentication from single-factor combinations by naming the factor types.",
   "Students will be able to design group-based (RBAC) permissions for a small organization.",
   "Students will be able to recommend sensible lockout, password and auditing settings and justify them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and take quick votes. Reveal that only some combinations are true MFA and promise to explain why."
   ],
   [
    10,
    "Teach",
    "Cover authentication versus authorization, least privilege and privilege creep, RBAC with groups, MFA factor types, SSO with Kerberos and SAML, lockout trade-offs, service account practices and auditing. Use the hotel key card analogy."
   ],
   [
    20,
    "Activity",
    "Run the 'Access Review Day' card activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare how groups justified their decisions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "Which of these are true multifactor authentication: password plus PIN, fingerprint plus badge, password plus phone app code, two different passwords? Vote by raising hands.",
  "activity": {
   "title": "Access Review Day",
   "materials": "Printed cards the teacher makes, each describing a fictional account at Harbor Point Clinic (for example 'Dana, moved from billing to reception, member of Billing and Reception groups', 'svc-backup, member of Domain Admins, interactive logon allowed, password set three years ago', 'Lee, IT admin, uses one account for email and server admin'), plus whiteboard and markers.",
   "steps": [
    "Give each pair of students six account cards and explain that they are performing a quarterly access review.",
    "For each card, pairs decide what is wrong (if anything) and write a fix on the back, naming the principle (least privilege, RBAC, service account practice, MFA, separate admin account).",
    "Pairs then propose a group structure for the clinic on a sheet of paper, listing three to five groups and what each can access.",
    "Finally, each pair chooses an account lockout threshold and duration and writes one sentence on the trade-off.",
    "Collect two or three fixes per card type on the whiteboard and correct any misconceptions."
   ]
  },
  "discussion": [
   "Why do organizations so often run services under powerful accounts, and what would make doing the right thing easier?",
   "Where is the balance between strict lockout settings and keeping users productive?"
  ],
  "exit": [
   [
    "Is a password plus a PIN multifactor? Explain.",
    "No, both are something you know, so it is single-factor."
   ],
   [
    "What is privilege creep and which practice catches it?",
    "Accumulating unneeded access after role changes; regular access reviews (with group-based RBAC) catch and remove it."
   ],
   [
    "List two best practices for service accounts.",
    "Any two: one account per service, minimal rights, deny interactive logon, long random or automatically rotated passwords, documented owner, never domain admin."
   ]
  ],
  "differentiation": [
   "Support: Provide a factor-type cheat sheet (know, have, are) and pre-label three of the six account cards with the principle involved so students focus on the fix.",
   "Extend: Ask fast finishers to explain how SSO through an identity provider changes the offboarding process and why MFA becomes more important with SSO."
  ]
 },
 {
  "t": "Data security risks: data loss, unencrypted media, insider threats, malware and ransomware; mitigation with DLP, patching and segmentation",
  "objectives": [
   "Students will be able to describe the main data security risks: accidental loss, leakage, unencrypted media, insider threats, malware and ransomware.",
   "Students will be able to match each risk with an appropriate mitigation such as DLP, encryption, patching, segmentation or immutable backups.",
   "Students will be able to recognize common indicators of a ransomware attack on a file server.",
   "Students will be able to explain why layered controls are needed rather than a single product."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and let students shout out guesses. Write the four scenarios on the board without answers."
   ],
   [
    10,
    "Teach",
    "Teach each risk with a short fictional story, then introduce the matching controls. Spend extra time on ransomware entry points, warning signs and why offline or immutable backups matter."
   ],
   [
    20,
    "Activity",
    "Run the 'Risk and Control Match-Up' card sort described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore overlaps between controls."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A backup drive is lost, a contractor keeps VPN access after leaving, a file share fills with renamed files, and someone emails a client list to a personal address. Which of these worries you most, and why?",
  "activity": {
   "title": "Risk and Control Match-Up",
   "materials": "Two sets of printed cards the teacher makes: twelve risk scenario cards (for example 'unencrypted backup tape lost in transit', 'employee uploads patient list to personal cloud', 'unpatched web server exploited', 'infected laptop scans the database subnet') and ten control cards (DLP, full-disk encryption, patch management, segmentation, EDR, least privilege, offboarding checklist, immutable backup, user training, monitoring). Tables or desks for sorting.",
   "steps": [
    "Groups of three receive both card sets, shuffled.",
    "Groups match each risk card with the single best control card, and optionally one supporting control.",
    "For each match, a group member writes a one-sentence reason on a sticky note and places it on the pair.",
    "Groups swap tables and review another group's matches, marking any they disagree with.",
    "The teacher reviews disagreements with the class and confirms the best answers."
   ]
  },
  "discussion": [
   "Why can encryption not solve the problem of a trusted employee leaking data?",
   "If you had budget for only one ransomware control this year, which would you pick and what risk would remain?"
  ],
  "exit": [
   [
    "Which control is designed to stop sensitive data from being emailed outside the organization?",
    "DLP (data loss prevention)."
   ],
   [
    "Name two warning signs of ransomware on a file server.",
    "Any two: mass renames with new extensions, ransom notes in folders, spikes in disk activity, deleted backups or shadow copies, disabled security tools."
   ],
   [
    "What does network segmentation limit?",
    "Lateral movement: which systems a compromised machine can reach, reducing how far an attack spreads."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference sheet pairing each control with a one-line description and reduce the card set to six risks.",
   "Extend: Ask fast finishers to draw a simple segmented network on paper (user, server, management, backup zones) and write the allowed traffic rules between zones."
  ]
 },
 {
  "t": "Server hardening: disable unused services and ports, remove unneeded software, OS and firmware patching, host firewall, antivirus/EDR, secure admin protocols",
  "objectives": [
   "Students will be able to define attack surface and list the main steps for reducing it on a server.",
   "Students will be able to identify unnecessary services, open ports and plaintext protocols in a sample listing and propose replacements.",
   "Students will be able to explain why firmware patching and host-based firewalls are needed even with OS updates and a network firewall.",
   "Students will be able to compare signature-based antivirus with EDR."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and gather guesses about how many ways in a fresh default install might have."
   ],
   [
    10,
    "Teach",
    "Walk through the hardening sequence: services and ports, software and accounts, OS and firmware patching, host firewall with default deny, antivirus versus EDR, and secure admin protocols. Put a table of plaintext versus encrypted protocols on the board."
   ],
   [
    20,
    "Activity",
    "Run the 'Harden This Server' listing review described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to talk about the cost and risk of hardening changes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A server comes out of the box with a dozen services running and a default admin password. What is the first thing you would change, and why that one?",
  "activity": {
   "title": "Harden This Server",
   "materials": "Projector or printed handouts with a fictional server profile the teacher prepares: role (internal file server), a short list of listening ports and services (for example 21 FTP, 23 Telnet, 80 HTTP management page, 445 file sharing, 3389 RDP, print spooler running), installed software (compiler, sample web app, outdated agent), a BMC with default password and firmware two years old, and antivirus excluding the whole data drive. Sticky notes and pens.",
   "steps": [
    "In pairs, students read the profile and circle every item that increases the attack surface.",
    "For each circled item, pairs write a sticky note with the hardening action (disable, remove, patch, replace with encrypted protocol, restrict with host firewall).",
    "Pairs order their notes by priority, explaining which issue they would fix first and why.",
    "Each pair writes a short host firewall rule set in plain words (allow 445 from user subnet, allow 3389 from admin subnet only, deny all other inbound).",
    "The class builds a combined hardening checklist on the whiteboard from the pairs' notes."
   ]
  },
  "discussion": [
   "Why might an administrator hesitate to apply a firmware update right away, and how does change management help?",
   "Is a hardened server ever finished? What causes servers to drift away from their baseline?"
  ],
  "exit": [
   [
    "What is an attack surface?",
    "All the points (services, ports, software, accounts, interfaces) where an attacker could interact with a system."
   ],
   [
    "Give the secure replacement for Telnet, FTP and HTTP.",
    "SSH, SFTP, HTTPS."
   ],
   [
    "Why use a host-based firewall when a network firewall exists?",
    "It filters traffic from machines on the same segment, limiting lateral movement if a neighbor is compromised."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference table listing each common port and service with a note on whether it is plaintext, so they can focus on the hardening decision.",
   "Extend: Ask fast finishers to outline a monthly patch management process for 50 servers, including testing, scheduling, verification and reporting."
  ]
 },
 {
  "t": "Decommissioning and media destruction: wiping, degaussing, shredding, crushing, certificates of destruction, asset records",
  "objectives": [
   "Students will be able to list the steps to decommission a server, from change management to updating asset records.",
   "Students will be able to choose an appropriate sanitization method based on media type, reuse plans and data sensitivity.",
   "Students will be able to explain why formatting is not sanitization and why degaussing does not work on SSDs.",
   "Students will be able to describe what a certificate of destruction contains and why it matters for audits."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a hand vote. Reveal that formatting leaves data recoverable."
   ],
   [
    10,
    "Teach",
    "Cover the decommissioning checklist, then each sanitization method with media type and reuse implications. Draw a simple decision tree on the whiteboard: magnetic or flash, reuse or not, sensitive or not."
   ],
   [
    20,
    "Activity",
    "Run the 'Disposal Desk' scenario sort described below."
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
  "warmup": "If you format a laptop drive and sell it online, can the buyer recover your old files? Vote yes or no and give one reason.",
  "activity": {
   "title": "Disposal Desk",
   "materials": "Printed scenario cards the teacher makes (for example 'HDD from file server, reused in test lab', 'SSD from payroll server, going to recycler', 'backup tapes from 2015, sensitive', 'self-encrypting SSD redeployed to another department', 'optical discs with archived contracts'), a blank decommissioning checklist handout, whiteboard.",
   "steps": [
    "Groups of three receive eight scenario cards.",
    "For each card, the group chooses a sanitization method (wipe, secure erase, crypto-erase, degauss, shred or crush) and writes why.",
    "Groups mark which cards need a certificate of destruction and what it should list.",
    "Using the blank checklist, each group writes the six or more steps to decommission the payroll server before its drives are removed (services migrated, DNS, backups, monitoring, certificates, accounts, CMDB).",
    "Groups compare answers with another group and resolve differences, then the teacher reviews the tricky cards (SSD degaussing, reuse after degaussing)."
   ]
  },
  "discussion": [
   "When would an organization pay more for on-site shredding instead of off-site destruction?",
   "Why might skipping the decommissioning steps, such as removing DNS records and service accounts, create security problems later?"
  ],
  "exit": [
   [
    "Why is formatting not sanitization?",
    "It removes file system pointers but leaves data on the media, which recovery tools can often restore."
   ],
   [
    "Which method is ineffective on SSDs, and what should you use instead?",
    "Degaussing; use secure erase, crypto-erase or physical destruction."
   ],
   [
    "Name three items on a certificate of destruction.",
    "Any three: serial numbers, destruction method, date, responsible party or vendor."
   ]
  ],
  "differentiation": [
   "Support: Provide the decision tree from the teach segment as a handout so struggling students can follow it card by card.",
   "Extend: Ask fast finishers to write a short data disposal policy section covering method by media type, chain of custody and record keeping."
  ]
 },
 {
  "t": "Backup types: full, incremental, differential, synthetic full, snapshot; backup media and rotation (grandfather-father-son), 3-2-1 rule",
  "objectives": [
   "Students will be able to compare full, incremental and differential backups in terms of backup time, storage use and restore requirements.",
   "Students will be able to determine which backup sets are needed to restore after a failure on a given day.",
   "Students will be able to explain synthetic full backups and why snapshots alone are not backups.",
   "Students will be able to describe GFS rotation and the 3-2-1 rule."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about restoring a diary and collect ideas."
   ],
   [
    10,
    "Teach",
    "Draw a week-long timeline on the whiteboard. Use colored boxes to show what each incremental and differential captures, then show restore chains. Add synthetic full, snapshots, media types, GFS and 3-2-1."
   ],
   [
    20,
    "Activity",
    "Run the 'Restore Race' activity described below."
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
  "warmup": "Your laptop dies on Thursday. You have a copy of everything from Sunday and small copies of changes from each day since. What do you need to rebuild Thursday morning's files?",
  "activity": {
   "title": "Restore Race",
   "materials": "Printed timeline strips the teacher makes (Sunday to Saturday), sticky notes in two colors (one for full, one for incremental or differential), whiteboard, and a set of printed failure scenario cards.",
   "steps": [
    "Pairs receive a timeline strip and sticky notes.",
    "The teacher reads a schedule (for example full Sunday, incrementals daily) and pairs place notes on the strip showing what each job contains.",
    "The teacher draws a failure card (for example 'disk fails Thursday 2 p.m.') and pairs physically pull the sticky notes they need to restore, in order, then raise hands.",
    "Repeat with differentials and with a mixed schedule (weekly full, nightly differential, a synthetic full on Wednesday).",
    "End with a 'broken tape' twist: one incremental is unreadable; pairs explain what data is lost and how a differential schedule would have changed the outcome."
   ]
  },
  "discussion": [
   "When would an organization accept slower restores in exchange for faster nightly backups?",
   "Why do many organizations still use tape when disk and cloud are available?"
  ],
  "exit": [
   [
    "Full Sunday, incrementals daily, failure Wednesday afternoon. Which sets do you restore?",
    "Sunday's full, then Monday's and Tuesday's incrementals, in order (plus Wednesday's if it ran before the failure)."
   ],
   [
    "Which backup type grows larger each day until the next full?",
    "Differential."
   ],
   [
    "In GFS rotation, which generation represents monthly backups?",
    "Grandfather."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a color-coded reference card showing what each backup type captures on a sample week.",
   "Extend: Ask fast finishers to design a rotation for a small office using GFS and the 3-2-1 rule, specifying media, retention and where each copy lives."
  ]
 },
 {
  "t": "Backup operations: frequency, retention, on-site vs off-site storage, integrity checks, test restores",
  "objectives": [
   "Students will be able to explain how RPO drives backup frequency and how test restores measure RTO.",
   "Students will be able to set a tiered retention schedule and justify it with legal and business needs.",
   "Students will be able to compare on-site and off-site backup storage and explain why both are used.",
   "Students will be able to describe integrity checks and plan a test restore."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Share the warm-up prompt and take quick answers."
   ],
   [
    10,
    "Teach",
    "Explain RPO and frequency, application-aware backups, tiered retention, on-site versus off-site, integrity checks and test restores. Tell the hook story to show why green checkmarks are not proof."
   ],
   [
    20,
    "Activity",
    "Run the 'Backup Audit' log-reading activity described below."
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
  "warmup": "Your backup software has shown 'Success' every night for a year. How confident are you that you can restore today, and what would make you more confident?",
  "activity": {
   "title": "Backup Audit",
   "materials": "A printed or projected backup report the teacher creates for a fictional clinic (job names, servers, frequency, last success, warnings such as 'skipped 3 locked files', retention, storage location, last test restore date), a one-page business requirements sheet listing each system's RPO and RTO, highlighters and whiteboard.",
   "steps": [
    "Groups of three receive the backup report and the requirements sheet.",
    "Groups highlight every system where the backup frequency does not meet its RPO.",
    "Groups mark gaps in storage location (no off-site copy), retention (too short or too long for policy) and integrity (warnings ignored, no test restore in a year).",
    "Each group writes a prioritized list of five fixes and drafts a quarterly test restore plan for the most critical system, including how they will measure the RTO.",
    "Groups share their top fix with the class and the teacher compiles a master list on the whiteboard."
   ]
  },
  "discussion": [
   "Who in an organization should decide how long backups are kept, and why is it not only the IT team's decision?",
   "What makes test restores hard to schedule in real organizations, and how could you make them routine?"
  ],
  "exit": [
   [
    "What metric determines backup frequency?",
    "The RPO (recovery point objective)."
   ],
   [
    "Give one advantage each of on-site and off-site backups.",
    "On-site: fast restores for everyday problems. Off-site: survives site-wide disasters."
   ],
   [
    "What is the only true proof that a backup works?",
    "A successful test restore, with the application and data verified as complete."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a filled-in example row showing a system whose frequency misses its RPO, so they can pattern-match the rest of the report.",
   "Extend: Ask fast finishers to calculate how many restore points a GFS-style tiered retention (dailies for four weeks, monthlies for a year, yearlies for seven years) keeps and to identify the oldest point."
  ]
 },
 {
  "t": "Disaster recovery: hot, warm and cold sites, cloud DR, replication (synchronous vs asynchronous), RPO and RTO, DR plan testing (tabletop, live failover)",
  "objectives": [
   "Students will be able to define RPO and RTO and identify each from a business requirement.",
   "Students will be able to compare hot, warm, cold and cloud DR sites by recovery time and cost.",
   "Students will be able to choose between synchronous and asynchronous replication based on RPO and distance.",
   "Students will be able to order DR tests from least to most disruptive and explain when each is used."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and note answers about time and data on two sides of the whiteboard, labeling them RTO and RPO afterward."
   ],
   [
    10,
    "Teach",
    "Draw a timeline with the disaster in the middle: RPO arrow pointing back, RTO arrow pointing forward. Compare site types in a table, explain cloud DR, contrast synchronous and asynchronous replication with a latency sketch, and list test types in order of disruption."
   ],
   [
    20,
    "Activity",
    "Run the 'DR Consultant' design activity described below."
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
  "warmup": "If our school's student records system disappeared right now, how many hours of changes could we afford to lose, and how long could we wait to get it back?",
  "activity": {
   "title": "DR Consultant",
   "materials": "Printed client cards the teacher makes, each describing a fictional organization with services, RPO and RTO requirements, budget level and distance to a possible second site; a blank DR design worksheet; whiteboard.",
   "steps": [
    "Groups of three each receive one client card (for example a regional bank, a small law office, an online store, a county library).",
    "Groups choose a recovery site type (hot, warm, cold or cloud DR) and a replication method, and justify both against the RPO, RTO, distance and budget.",
    "Groups draft a test schedule using at least two test types, explaining why they start with a tabletop before any failover.",
    "Each group presents in two minutes while another group acts as the client's CIO and asks one challenging question.",
    "The teacher highlights any mismatches, such as synchronous replication over long distances or a cold site with a four-hour RTO."
   ]
  },
  "discussion": [
   "Why might a company choose a warm site for most systems but a hot site for one or two?",
   "What risks does a live failover test introduce, and how can a team reduce them?"
  ],
  "exit": [
   [
    "A service can lose 10 minutes of data and must be back in 2 hours. State the RPO and RTO.",
    "RPO is 10 minutes; RTO is 2 hours."
   ],
   [
    "Which replication method fits a DR site 800 miles away, and why?",
    "Asynchronous, because synchronous would add round-trip latency to every write over that distance."
   ],
   [
    "Rank tabletop, parallel test and live failover from least to most disruptive.",
    "Tabletop, parallel test, live failover."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference chart comparing site types and replication methods, and a client card with clear, round-number requirements.",
   "Extend: Ask fast finishers to describe the fail-back process for their client, including how data changed at the DR site returns to the primary site."
  ]
 },
 {
  "t": "Business continuity: BIA, MTBF and MTTR, prioritizing critical services, communication plans",
  "objectives": [
   "Students will be able to explain the purpose of a BIA and list what it produces, including RTO, RPO and MTD.",
   "Students will be able to interpret MTBF and MTTR and identify actions that improve each.",
   "Students will be able to place services in recovery tiers and order them by dependency.",
   "Students will be able to outline the elements of an incident communication plan."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list the departments students name on the whiteboard."
   ],
   [
    10,
    "Teach",
    "Contrast BCP with DR, walk through a BIA and its outputs, explain MTBF versus MTTR with simple numbers, show dependency-ordered tiers and list communication plan elements."
   ],
   [
    20,
    "Activity",
    "Run the 'Restore Order' role-play described below."
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
  "warmup": "If the school lost power for a full day, which activities would need to continue no matter what, and which could wait until next week?",
  "activity": {
   "title": "Restore Order",
   "materials": "Printed role cards the teacher makes for a fictional company (warehouse manager, finance lead, sales director, IT administrator, communications officer), printed system cards (shipping app, payroll, online store, email, DNS, directory service, database server, internal wiki), sticky notes, whiteboard.",
   "steps": [
    "Form groups of five and give each student a role card describing their department's needs and the cost of downtime.",
    "Each department lead argues for their system for one minute; the IT administrator records the impacts on sticky notes (a mini BIA).",
    "The group ranks systems into three tiers, then the IT administrator arranges the system cards in dependency order, placing DNS, directory and database before applications.",
    "The communications officer drafts a two-sentence status message for staff and one for customers, naming the channel used if email is down.",
    "Groups post their tier list on the whiteboard and compare with other groups."
   ]
  },
  "discussion": [
   "Why should business leaders, not only IT, sign off on recovery priorities?",
   "If two vendors offer the same equipment, one with higher MTBF and one with faster support, how would you decide?"
  ],
  "exit": [
   [
    "Is a higher or lower MTTR better, and name one way to improve it.",
    "Lower; for example keep spare parts on site, improve monitoring or buy a faster support contract."
   ],
   [
    "What three recovery values does a BIA typically produce?",
    "RTO, RPO and maximum tolerable downtime (MTD), along with process criticality."
   ],
   [
    "Why must DNS and directory services usually be restored before tier-one applications?",
    "Applications depend on them to resolve names and authenticate users, so they fail without them."
   ]
  ],
  "differentiation": [
   "Support: Provide a dependency diagram template with arrows already drawn for DNS, directory and database, so students only place the application cards.",
   "Extend: Ask fast finishers to calculate MTBF from a simple record (for example 4 failures over 20,000 operating hours) and explain why the result does not predict when one specific unit will fail."
  ]
 },
 {
  "t": "The CompTIA troubleshooting methodology: identify, theory, test, plan, implement, verify, document",
  "objectives": [
   "Students will be able to list the CompTIA troubleshooting steps in order.",
   "Students will be able to classify technician actions by step and identify a skipped step in a scenario.",
   "Students will be able to explain why testing a theory, changing one thing at a time and verifying full functionality matter on production servers.",
   "Students will be able to apply the methodology to a server problem and document it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up story and ask what the technician did wrong. Collect answers without correcting yet."
   ],
   [
    10,
    "Teach",
    "Write the seven steps down the whiteboard. For each, give two concrete server examples and the key phrases the exam uses (question the obvious, determine scope, notify impacted users, preventive measures, document throughout). Introduce the mnemonic."
   ],
   [
    20,
    "Activity",
    "Run the 'Step Sort and Mystery Ticket' activity described below."
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
  "warmup": "A technician hears 'the website is down,' immediately reinstalls the web server software, and the site comes back. Why might this still be a poor way to troubleshoot?",
  "activity": {
   "title": "Step Sort and Mystery Ticket",
   "materials": "Printed action cards the teacher makes (about 20 actions such as 'check event logs', 'ask users when it started', 'swap in a known-good cable', 'schedule maintenance window', 'update knowledge base article', 'confirm with users', 'escalate to vendor'), seven step headers on paper, and a printed mystery ticket with clues the teacher reveals one at a time.",
   "steps": [
    "Pairs sort the action cards under the seven step headers on their desks.",
    "The teacher reviews the sort, focusing on commonly confused cards (preventive measures, notifying users, backing up before changes).",
    "Pairs then receive the mystery ticket ('users at one branch cannot reach the file server') and request clues by naming the step they are on and what they want to check.",
    "The teacher reveals clues only when the pair is on the correct step; pairs record each step in a mini ticket log.",
    "Pairs finish by writing a short documentation entry with symptoms, cause, fix and preventive measure."
   ]
  },
  "discussion": [
   "When is it right to escalate instead of forming another theory?",
   "Why is 'what changed recently' such a powerful question in server troubleshooting?"
  ],
  "exit": [
   [
    "List the seven steps in order.",
    "Identify the problem, establish a theory of probable cause, test the theory, establish a plan of action, implement the solution or escalate, verify full system functionality and implement preventive measures, document findings."
   ],
   [
    "A technician confirms a fix with users and adds monitoring. Which step is this?",
    "Verify full system functionality and, if applicable, implement preventive measures."
   ],
   [
    "Why should you back up data and configurations during the identify step?",
    "Some fixes are destructive, so a backup allows recovery if the change causes data loss."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed list of the steps with two example actions each to use during the card sort.",
   "Extend: Ask fast finishers to write their own scenario in which a technician skips one step, then swap with a classmate to identify the gap."
  ]
 },
 {
  "t": "Hardware problems: POST errors and beep codes, overheating, failed fans and power supplies, memory errors, predictive failure alerts, LED indicators",
  "objectives": [
   "Students will be able to interpret POST messages, beep codes, BMC event log entries and LED colors to identify a failed component.",
   "Students will be able to distinguish environmental overheating from a single-server cooling failure.",
   "Students will be able to recommend next steps for failed redundant fans and PSUs, including checking simple power causes.",
   "Students will be able to explain correctable versus uncorrectable memory errors and how to respond to predictive failure alerts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt and ask students what the dashboard light comparison means for servers."
   ],
   [
    10,
    "Teach",
    "Cover POST and beep codes, overheating causes, redundant fans and PSUs, ECC memory errors, SMART and predictive failure, and LED conventions including the UID light. Stress that vendor documentation defines exact meanings."
   ],
   [
    20,
    "Activity",
    "Run the 'Hardware Triage Desk' log-reading activity described below."
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
  "warmup": "Your car's check-engine light comes on but the car drives normally. Do you keep driving for six months? How is that like a server with a failed redundant power supply?",
  "activity": {
   "title": "Hardware Triage Desk",
   "materials": "Printed or projected fictional BMC event log excerpts the teacher writes (for example 'PSU 2 input lost', 'Correctable memory error DIMM B2 count 412', 'Drive bay 5 predictive failure', 'Inlet temperature warning' repeated across several servers in one rack), simple drawings of server front panels with LEDs colored in, and a triage worksheet.",
   "steps": [
    "Groups of three receive six incident packets, each with a log excerpt and LED drawing.",
    "For each packet, groups identify the component, the likely cause, the urgency (emergency, schedule soon, monitor) and the next step.",
    "Groups must check at least one simple cause before recommending replacement (cord, PDU, circuit, airflow, reseat).",
    "One packet shows four servers in the same rack overheating; groups explain why this points to an environmental cause and what they would inspect.",
    "Groups compare their urgency ratings with another group and the teacher resolves disagreements."
   ]
  },
  "discussion": [
   "Why do vendors build redundant fans and PSUs if the server still needs prompt repair when one fails?",
   "How does remote monitoring through the BMC change how quickly hardware problems are found and fixed?"
  ],
  "exit": [
   [
    "Every server in one rack reports high inlet temperature. What is the most likely type of cause?",
    "An environmental cause, such as cooling failure, blocked airflow, missing blanking panels or reversed equipment, rather than individual fans."
   ],
   [
    "What does a rising count of correctable ECC errors on one DIMM indicate?",
    "The module is likely failing and should be replaced before uncorrectable errors cause crashes."
   ],
   [
    "A redundant PSU shows an amber LED. What should you check before replacing it?",
    "The power cord, the PDU outlet and whether the circuit feeding the PDU has tripped."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference of LED colors, alert types and typical next steps to use with each incident packet.",
   "Extend: Ask fast finishers to write a short runbook for responding to a predictive drive failure in a RAID 5 array, including how to locate the drive and verify the rebuild."
  ]
 },
 {
  "t": "Storage problems: degraded or failed RAID arrays, controller battery/cache issues, disk full, slow I/O, mount failures, boot device not found, corrupted file systems",
  "objectives": [
   "Students will be able to distinguish a degraded RAID array from a failed array and state the safe first actions for each.",
   "Students will be able to explain why a failed controller cache battery causes a drop from write-back to write-through and slower writes.",
   "Students will be able to diagnose disk-full, inode exhaustion and fstab mount failures from command output.",
   "Students will be able to choose a safe next step for boot device not found and corrupted file system symptoms."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question. Take three or four answers and write them on the board without judging; return to them at the end."
   ],
   [
    15,
    "Teach",
    "Walk through each storage problem in the order data risk is highest: failed and degraded arrays, cache battery, full disk and inodes, slow I/O, mount failures, boot device not found, corruption. For each, say the symptom, what the logs or console show, and the safe first step. Stress the phrase protect data first."
   ],
   [
    15,
    "Activity",
    "Run the symptom-card triage activity in groups of three."
   ],
   [
    5,
    "Discuss",
    "Ask groups which card they disagreed on and why. Use the discussion questions to draw out the backup-first principle."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door."
   ]
  ],
  "warmup": "A server says one of its disks has failed, but every user can still open their files. Is that good news or bad news, and what would you do in the next ten minutes?",
  "activity": {
   "title": "Storage triage cards",
   "materials": "Printed symptom cards (one scenario each, with a short log or command excerpt such as a controller event line, df -h and df -i output, or an fstab line), whiteboard, markers.",
   "steps": [
    "Before class, make eight cards, one per problem type: degraded RAID 5, failed RAID 5, failed cache battery, full disk, inode exhaustion, slow I/O on a shared datastore, fstab mount failure, boot device not found.",
    "Give each group a shuffled set. For each card, the group writes the problem name, the evidence on the card that proves it, and the first safe action.",
    "Groups then sort cards into two columns on the board: risk of data loss now, and performance or availability only.",
    "Reveal the answer key and have each group explain one card to the class, including what action would make it worse."
   ]
  },
  "discussion": [
   "Why might an administrator be tempted to force write-back caching, and how would you explain the risk to a manager who only sees the speed gain?",
   "When a file system is corrupted on a disk that is also throwing SMART warnings, which do you fix first, and why?"
  ],
  "exit": [
   [
    "A RAID 5 array shows one failed disk and is still online. What is its state and your first step?",
    "Degraded; confirm a current backup, then identify the failed drive with the controller utility and LEDs and replace it."
   ],
   [
    "Writes on a hardware RAID server suddenly slow sharply and the controller log mentions the battery. What happened?",
    "The cache battery failed or is charging, so the controller switched from write-back to write-through for safety; replace the battery or module."
   ],
   [
    "A Linux server has free space but cannot create files. Which command confirms the cause?",
    "df -i, to check for inode exhaustion."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page table with three columns (symptom, what you see, first safe step) partly filled in, and let them complete the triage cards using it.",
   "Extend: Ask fast finishers to write a short runbook for replacing a failed drive in a degraded array, including how they confirm the correct bay and what they check after the rebuild completes."
  ]
 },
 {
  "t": "Storage tools: disk management, fsck/chkdsk, RAID controller utilities, SMART data, partitioning tools",
  "objectives": [
   "Students will be able to match Windows and Linux storage tasks to the correct tool, including Disk Management, chkdsk, fsck, mdadm, smartctl and parted.",
   "Students will be able to explain the difference between chkdsk /f and /r and why checkers run on unmounted volumes.",
   "Students will be able to interpret SMART attributes such as reallocated and pending sectors to decide whether to replace a drive.",
   "Students will be able to sequence the steps to grow a partition or logical volume and its file system."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect quick answers aloud."
   ],
   [
    12,
    "Teach",
    "Present the five tool families with a projected cheat sheet. For each tool, show one line of sample output and say what to look for. Emphasize three safety rules: confirm the target device, back up, and repair only unmounted file systems."
   ],
   [
    18,
    "Activity",
    "Run the tool-matching relay in pairs, followed by the grow-a-volume ordering exercise."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect SMART warnings to RAID and backups."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Your phone says storage is full, so you buy a bigger memory card. What has to happen before the phone can actually use the new space? How might a server be similar?",
  "activity": {
   "title": "Tool-matching relay and grow-a-volume sequence",
   "materials": "Printed task cards (for example: read a drive's wear level, fix file system errors on ext4, blink a bay LED, see rebuild progress on software RAID, bring a SAN disk online on Windows, grow an XFS file system), printed tool cards, a second set of shuffled step cards for growing a volume, whiteboard.",
   "steps": [
    "Pairs receive task cards face down and the tool cards face up on their desk.",
    "In five minutes, pairs match each task to the tool and write the command or console they would use; the teacher circulates and asks which OS each tool belongs to.",
    "Next, pairs get shuffled step cards (lsblk to confirm size, grow partition with parted, resize2fs or xfs_growfs, df -h to verify, back up first) and put them in order.",
    "Two pairs present their order on the board; the class corrects any step that is missing or out of order, especially the file system grow step."
   ]
  },
  "discussion": [
   "If a RAID controller hides individual drives from the OS, how would you still keep an eye on drive health, and why does it matter?",
   "When would you choose to schedule chkdsk at the next restart instead of running it immediately, and what does that cost you?"
  ],
  "exit": [
   [
    "What is the difference between chkdsk /f and chkdsk /r?",
    "/f fixes file system errors; /r also locates bad sectors and recovers readable data, and includes /f."
   ],
   [
    "After lvextend grows a logical volume holding an ext4 file system, what else must you do?",
    "Grow the file system with resize2fs (or use lvextend -r), then verify with df -h."
   ],
   [
    "A drive's reallocated and pending sector counts are climbing. What tool shows this and what should you do?",
    "smartctl or the controller's SMART view; plan to replace the drive before it fails, after confirming backups."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column reference sheet listing each tool with its OS and one-line purpose, and have students use it during the relay.",
   "Extend: Challenge fast finishers to write the full command sequence for adding a new disk to an existing LVM volume group and growing an XFS logical volume online."
  ]
 },
 {
  "t": "OS and software problems: failed updates, services not starting, memory leaks, runaway processes, driver issues, boot loops, misconfigured applications",
  "objectives": [
   "Students will be able to identify the likely cause of a failed update, a service that will not start, a memory leak and a runaway process from symptoms and log entries.",
   "Students will be able to distinguish a memory leak from a runaway process using monitoring data.",
   "Students will be able to choose recovery steps for a driver problem and a boot loop, including safe mode and rollback.",
   "Students will be able to describe how to validate a configuration change before restarting a service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the board as possible causes."
   ],
   [
    15,
    "Teach",
    "Present each problem type with its symptom pattern, the tool that reveals it and the first action. Draw two quick sketches: memory climbing steadily over days (leak) and CPU jumping to a flat 100 percent (runaway). Stress asking what changed."
   ],
   [
    15,
    "Activity",
    "Run the help-desk role-play in pairs."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your laptop gets slower every day until you restart it, then it is fine again. What do you think is going on inside it?",
  "activity": {
   "title": "Help-desk role-play: the user and the admin",
   "materials": "Printed scenario cards with a hidden cause and a few log lines or monitoring readings for the user to reveal when asked (for example a System log entry naming a logon failure, a memory reading that climbs each day, a top listing with one process at 99 percent CPU, a stop code naming a driver), timer.",
   "steps": [
    "Pair students. One plays the person reporting the problem and holds the scenario card; the other plays the administrator.",
    "The administrator may ask questions and request specific evidence (which log, which tool). The reporter reveals only the evidence that matches a correct request.",
    "After four minutes, the administrator states the cause and the first fix. Partners check against the card, then swap roles with a new card.",
    "Finish with two pairs replaying their scenario for the class, with the class naming the tool that gave the key clue."
   ]
  },
  "discussion": [
   "Scheduling a nightly service restart hides a memory leak from users. When is that an acceptable decision, and what must happen alongside it?",
   "How do testing in non-production and deploying updates in waves change the risk of a bad patch?"
  ],
  "exit": [
   [
    "A service fails to start right after a forced password change. What is the likely cause?",
    "Its service account's stored password is out of date, so it cannot log on; update the credentials."
   ],
   [
    "What symptom pattern points to a memory leak?",
    "Gradual slowdown over time with one process's memory steadily climbing, cleared by a restart."
   ],
   [
    "A server is in a boot loop after a driver update. Name two steps.",
    "Boot into safe or recovery mode and roll back the driver; disable automatic restart to read the stop code."
   ]
  ],
  "differentiation": [
   "Support: Give students a symptom-to-cause chart with the six problem types and one clue each, and let them use it during the role-play.",
   "Extend: Ask fast finishers to design a monitoring alert that would catch a memory leak days before users notice, naming the counter and the threshold logic they would use."
  ]
 },
 {
  "t": "OS tools: Event Viewer, system logs and journalctl, Task Manager/top, Performance Monitor, rollback of updates, safe mode",
  "objectives": [
   "Students will be able to identify which Windows event log (Application, System or Security) records a given type of event.",
   "Students will be able to construct journalctl commands that filter by service, boot and priority.",
   "Students will be able to choose between live monitors (Task Manager, top) and recorded counters (Performance Monitor, sar) for a given problem.",
   "Students will be able to select an appropriate recovery path, such as update rollback, an older kernel or safe mode."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of logs and recordings."
   ],
   [
    12,
    "Teach",
    "Project Event Viewer and a terminal (or screenshots). Show the three Windows logs, an event's level, source and ID, and a filter. Then show journalctl with -u, -b, -b -1 and -p err. Briefly cover Task Manager, top, perfmon data collector sets and the recovery options."
   ],
   [
    18,
    "Activity",
    "Run the log detective activity in groups."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions, focusing on when to record versus watch live."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "If something strange happened in your house overnight while you slept, how would you find out what it was? What would you wish you had set up the day before?",
  "activity": {
   "title": "Log detective",
   "materials": "Printed event cards (each shows a short Windows event with log name hidden, level, source and description, or a Linux journal line), a printed list of scenarios needing a command, whiteboard, student laptops optional.",
   "steps": [
    "Groups receive ten event cards and sort each into Application, System or Security, writing one reason per card.",
    "Next, groups receive four scenarios (for example: errors only from before last night's crash, all messages from the sshd service in the last hour, kernel hardware errors, follow a service log live) and write the exact command for each.",
    "Groups then pick the right tool for three performance questions: what is using CPU right now, what happens every Thursday at 2 a.m., which process holds port 443 open.",
    "Compare answers on the board; the teacher confirms and corrects, highlighting the System versus Application distinction."
   ]
  },
  "discussion": [
   "Why is the previous boot often more useful than the current one after an unexpected reboot?",
   "VM snapshots make rollback easy. What problems arise if snapshots are left in place for weeks?"
  ],
  "exit": [
   [
    "A service failed to start on Windows. Which log do you check?",
    "The System log (Service Control Manager)."
   ],
   [
    "Write a journalctl command to see one service's entries.",
    "journalctl -u servicename, for example journalctl -u nginx."
   ],
   [
    "A Windows server will not boot after a driver install. Which startup option helps you remove it?",
    "Safe mode (or the Windows Recovery Environment), which loads only essential drivers and services."
   ]
  ],
  "differentiation": [
   "Support: Provide a card listing each journalctl option and each Windows log with one example event, and pair struggling students with a partner for the sort.",
   "Extend: Ask fast finishers to design a Performance Monitor data collector set for a suspected memory problem, listing counters, sample interval and duration, and explain how they would compare it to a baseline."
  ]
 },
 {
  "t": "Network problems: no connectivity, wrong IP/mask/gateway, DNS resolution failures, duplex mismatch, firewall rules, NIC teaming misconfiguration",
  "objectives": [
   "Students will be able to troubleshoot a network fault in a logical order from the physical layer upward.",
   "Students will be able to identify the misconfigured setting (IP address, mask, gateway or DNS) from a description of which destinations work and which fail.",
   "Students will be able to recognize the symptoms of a duplex mismatch, a blocking firewall rule and a NIC teaming mismatch.",
   "Students will be able to interpret an APIPA address and state what it implies about DHCP."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as a path from the user to the server on the board."
   ],
   [
    13,
    "Teach",
    "Walk the path in order: link, address and mask, gateway, DNS, port and firewall, then duplex and teaming. For each, give the symptom phrase students should memorize, such as works by IP not by name."
   ],
   [
    17,
    "Activity",
    "Run the whiteboard network detective activity in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce working in order and checking documentation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A friend says your website is down, but it loads fine for you. List every reason you can think of why it could work for you and not for them.",
  "activity": {
   "title": "Whiteboard network detective",
   "materials": "Whiteboard with a simple drawn network (two subnets, a router, a DNS server, a firewall, a file server with a two-port team), printed fault cards each giving a symptom and an ipconfig or interface-counter excerpt, markers.",
   "steps": [
    "Draw the network on the board and give each group a stack of six fault cards: wrong gateway, wrong mask, APIPA address, stale hosts entry, duplex mismatch with late collisions, firewall blocking port 443.",
    "For each card, the group names the fault, points to where on the diagram it lives, and writes the one check that would confirm it.",
    "Groups then rank which faults would show up first when working from the physical layer upward.",
    "Each group presents one card; the class votes on whether the confirming check is correct, and the teacher resolves disagreements."
   ]
  },
  "discussion": [
   "Why is it risky to change several network settings at once when troubleshooting, even if one of them fixes the problem?",
   "A network team blocks ICMP everywhere for security. How does that change the way server administrators test connectivity?"
  ],
  "exit": [
   [
    "A server reaches its own subnet but nothing remote. What is the most likely misconfiguration?",
    "A wrong or missing default gateway."
   ],
   [
    "Ping by IP works, ping by name fails. What area is the problem in?",
    "Name resolution: DNS servers, records, caches, suffix or the hosts file."
   ],
   [
    "An interface shows late collisions and CRC errors and the link is slow. What is the likely cause and fix?",
    "A duplex mismatch; set both ends the same way, normally both to auto-negotiate."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a symptom phrase card (local only, IP not name, slow with errors, one port blocked, 169.254) to match against the fault cards before naming the fix.",
   "Extend: Ask fast finishers to write the full test sequence they would run from a client to isolate a firewall block on port 443, including which result would rule out DNS and which would rule out the service itself."
  ]
 },
 {
  "t": "Network tools: ping, tracert/traceroute, nslookup/dig, ipconfig/ip, netstat/ss, arp, telnet or Test-NetConnection for port tests",
  "objectives": [
   "Students will be able to select the correct network tool for a given troubleshooting question on Windows and Linux.",
   "Students will be able to interpret output from ping, tracert/traceroute, nslookup/dig, netstat/ss and arp.",
   "Students will be able to explain why ping does not test application ports and choose a port-testing tool instead.",
   "Students will be able to sequence tools logically to isolate a fault from local configuration to the remote service."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers as questions on the board."
   ],
   [
    12,
    "Teach",
    "Project a sample output for each tool and narrate what to read: ipconfig /all fields, a ping sequence, a traceroute with a silent hop, nslookup with a server, netstat -ano and ss -tulpn showing a 127.0.0.1 bind, arp -a, and Test-NetConnection's TcpTestSucceeded."
   ],
   [
    18,
    "Activity",
    "Run the output-reading stations, then let students try the commands on their own laptops if available."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A web page will not load. Write down three different questions you would want answered to figure out why.",
  "activity": {
   "title": "Output-reading stations",
   "materials": "Five printed stations, each with a real-looking command output excerpt and two questions (ipconfig /all with an APIPA address; a ping sequence failing at the gateway; a traceroute stopping after hop 4; ss -tulpn showing a service on 127.0.0.1; arp -a with a duplicate IP), timer, student laptops with a terminal optional.",
   "steps": [
    "Place the five stations around the room. Groups rotate every three minutes.",
    "At each station, groups write what the output shows and the next command or action they would take.",
    "After rotations, groups with laptops run ipconfig /all (or ip a), ping 127.0.0.1, nslookup on a public name, and netstat -ano or ss -tulpn on their own machine, noting one listening port and its process.",
    "Review each station's answers as a class, emphasizing the difference between reachability and port testing."
   ]
  },
  "discussion": [
   "Why does the order in which you run network tools matter, and what can go wrong if you jump straight to blaming the firewall?",
   "Telnet is still useful as a port tester but unsafe for administration. What makes it unsafe, and what would you use instead for remote administration?"
  ],
  "exit": [
   [
    "Which tool tests whether TCP port 443 on a server is reachable from a Windows client?",
    "Test-NetConnection server -Port 443 (or telnet server 443)."
   ],
   [
    "ss -tulpn shows a service listening on 127.0.0.1:8080. Why can remote clients not connect?",
    "It is bound to the loopback address, so it accepts only local connections; bind it to the server's interface or 0.0.0.0."
   ],
   [
    "Ping by IP works but ping by name fails. Which tool do you use next?",
    "nslookup or dig, to query DNS directly."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page question-to-tool map (Am I configured? Can I reach it? Where does it stop? Is the name right? Is it listening? Is the port open?) to use at each station.",
   "Extend: Ask fast finishers to write a complete troubleshooting script, in order, for a user who cannot reach an internal web app by name, with the expected result of each command if that step is healthy."
  ]
 },
 {
  "t": "Security problems: permissions and access denied errors, expired certificates, antivirus quarantining files, firewall blocking services, compromised accounts",
  "objectives": [
   "Students will be able to calculate effective access from combined share and NTFS permissions, including explicit Deny.",
   "Students will be able to diagnose certificate problems such as expiry, name mismatch, missing intermediate and clock errors, and state the fix.",
   "Students will be able to resolve antivirus quarantine and firewall blocks with narrow, documented changes.",
   "Students will be able to recognize indicators of a compromised account and list the first incident response steps."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a few answers."
   ],
   [
    13,
    "Teach",
    "Cover permissions with a quick board drawing of share versus NTFS and an example with a Deny. Then cover certificate failure types, quarantine, firewall blocks and indicators of compromise. Repeat the rule: fix narrowly, never switch the control off."
   ],
   [
    17,
    "Activity",
    "Run the permission calculator and incident sort activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore the pressure to disable controls during an outage."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your building badge suddenly stops opening the door you use every day. List possible reasons. Which ones are a mistake, and which one would worry you?",
  "activity": {
   "title": "Permission calculator and incident sort",
   "materials": "Printed permission puzzles (each lists a user's groups, share permissions and NTFS permissions, some with an explicit Deny), printed ticket cards describing security-related failures, two sticky-note colors, whiteboard.",
   "steps": [
    "Pairs solve six permission puzzles, writing the user's effective access over the network and locally for each.",
    "Pairs then read eight ticket cards (expired certificate, missing intermediate, clock skew, quarantined DLL, blocked port, Deny inherited from a parent, 3 a.m. logon from a new location, unrequested Domain Admins membership).",
    "For each card, pairs put a yellow note for misconfiguration to fix narrowly or a pink note for possible compromise requiring incident response, and write the first action.",
    "Pairs post their notes on the board under each card; the class discusses any card with mixed colors."
   ]
  },
  "discussion": [
   "During an outage, a manager tells you to just turn the firewall off so the service comes back. How do you respond, and what do you offer instead?",
   "Why is preserving logs one of the first steps when an account looks compromised, even before the investigation is complete?"
  ],
  "exit": [
   [
    "Share permission is Full Control and NTFS is Read. What can a network user do?",
    "Only read, because the more restrictive permission applies over the network."
   ],
   [
    "A website's certificate is valid and the name matches, but some clients say the issuer is untrusted. What is likely missing?",
    "The intermediate certificate; install the complete chain on the server."
   ],
   [
    "List the first two steps when an account shows signs of compromise.",
    "Contain it by disabling the account or resetting credentials and revoking sessions, and preserve logs as evidence, following the incident response plan."
   ]
  ],
  "differentiation": [
   "Support: Give students a three-step permission rule card (combine group Allows, apply any explicit Deny, then take the stricter of share and NTFS for network access) to use on each puzzle.",
   "Extend: Ask fast finishers to design a certificate monitoring plan for a fleet of servers, covering inventory, alert timing, who is notified and how renewal is automated or tracked."
  ]
 },
 {
  "t": "Using logs, baselines and performance counters to find root cause",
  "objectives": [
   "Students will be able to explain what a performance baseline is and how to collect a useful one.",
   "Students will be able to identify the bottleneck resource from a set of performance counters, including disguised bottlenecks such as paging.",
   "Students will be able to correlate logs from multiple sources by time and explain why NTP synchronization is required.",
   "Students will be able to apply a repeated why analysis to move from a symptom to an actionable root cause."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the idea of knowing what normal looks like."
   ],
   [
    12,
    "Teach",
    "Show a baseline graph next to a problem-day graph. Walk through the key counters for CPU, memory, disk and network, and the paging disguise. Then show log entries from three systems with clock drift and ask which came first, and model the five whys on the board."
   ],
   [
    18,
    "Activity",
    "Run the root cause case file activity in groups."
   ],
   [
    5,
    "Discuss",
    "Discuss the questions about restarts, documentation and baselines."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "How do you know when you have a fever? What would you need to know about a person before a temperature reading means anything?",
  "activity": {
   "title": "Root cause case file",
   "materials": "A printed case file per group: a baseline table and a problem-day table of counters (CPU, available memory, Pages/sec, disk latency, disk queue, network), log excerpts from an OS, an application, a hypervisor and a firewall with timestamps (one server's clock five minutes off), and a short change calendar; whiteboard.",
   "steps": [
    "Groups compare the two counter tables and circle every value that deviates from the baseline, then decide which resource is the real bottleneck.",
    "Groups build a single timeline from the log excerpts, noticing and correcting for the server with the drifting clock.",
    "Using the change calendar, groups form a theory and write a five whys chain from the symptom to a root cause they could act on.",
    "Each group writes its root cause, the fix and one monitoring alert on the board; the class compares and the teacher reveals the intended answer."
   ]
  },
  "discussion": [
   "Restarting a service often makes users happy right away. How do you balance getting service back quickly with taking time to find the root cause?",
   "Who benefits from a written root cause analysis months later, and what should it include to be useful to them?"
  ],
  "exit": [
   [
    "What is a baseline and when should you capture it?",
    "A record of normal performance and configuration, captured while the system is healthy and over enough time to include daily and weekly cycles."
   ],
   [
    "Low available memory, high paging and high disk queue appear together. What is the likely bottleneck?",
    "Memory; the paging creates the disk load."
   ],
   [
    "Why must server clocks be synchronized for root cause analysis?",
    "So logs from different systems can be correlated in the correct order; NTP provides the synchronization."
   ]
  ],
  "differentiation": [
   "Support: Provide a counter cheat sheet that lists each counter, what a high or low value suggests, and the common disguise (paging looks like disk), and let struggling groups use it on the case file.",
   "Extend: Ask fast finishers to propose a monitoring dashboard and alert thresholds that would have caught the case-file problem early, explaining how each threshold relates to the baseline."
  ]
 }
]);
