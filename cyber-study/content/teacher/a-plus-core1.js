/* Teacher edition for CompTIA A+ Core 1 (220-1201): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("a-plus-core1", [
 {
  "t": "Laptop hardware replacement: battery, keyboard, RAM (SODIMM vs soldered), storage (2.5-inch, M.2 SATA vs NVMe), wireless cards and antennas",
  "objectives": [
   "Students will be able to describe the safe preparation steps before opening a laptop, including battery disconnect and ESD protection.",
   "Students will be able to distinguish SODIMM from soldered RAM and decide whether a memory upgrade is possible from a specification sheet.",
   "Students will be able to compare M.2 SATA and M.2 NVMe drives by keying and slot support and predict whether a drive will work.",
   "Students will be able to diagnose weak Wi-Fi after a laptop repair as a likely antenna lead problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a photo of two M.2 drives side by side, one with two notches and one with one. Ask: will both work in the same laptop? Collect guesses on the board without confirming."
   ],
   [
    10,
    "Teach",
    "Walk through the laptop teardown order: power down, unplug, disconnect the battery, ESD strap, service manual. Then explain SODIMM versus soldered RAM, DDR generations, 2.5-inch versus M.2, and B+M key SATA versus M key NVMe. Return to the warm-up and resolve it."
   ],
   [
    20,
    "Activity",
    "Run the Will It Fit, Will It Work card sort described below. Circulate and ask each pair to justify one decision aloud."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share the trickiest card. Highlight cases where a part fits physically but fails functionally, and the swollen battery safety card."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Here are two M.2 drives that are the same length. One has two notches and one has one. Will both work in the same laptop slot? Why or why not?",
  "activity": {
   "title": "Will It Fit, Will It Work",
   "materials": "Printed laptop specification cards (memory type, soldered or slot, M.2 slot protocol), printed part cards (SODIMMs, DIMMs, M.2 drives, batteries), whiteboard, markers.",
   "steps": [
    "Give each pair four laptop spec cards and a stack of eight part cards.",
    "For each part, pairs decide whether it physically fits the laptop and whether it will function, writing Fit yes/no and Work yes/no on the card.",
    "Pairs write one sentence of reasoning for any card marked Fit yes but Work no.",
    "Include one card describing a swollen battery and one describing weak Wi-Fi after a repair; pairs write the correct action for each.",
    "Pairs swap with a neighbor team and check each other's answers against the projected answer key."
   ]
  },
  "discussion": [
   "Why do you think manufacturers solder memory in thin laptops, and what does that mean for the customer over the life of the device?",
   "What questions should you ask a customer before ordering a replacement part for their laptop?"
  ],
  "exit": [
   [
    "A customer wants to upgrade RAM on a laptop whose memory is fully soldered. What do you tell them?",
    "Soldered memory cannot be upgraded; the only option is a different laptop or a motherboard replacement."
   ],
   [
    "An M.2 drive with B and M notches is not detected in a slot that supports only NVMe. Why?",
    "A B+M key drive is usually SATA, and an NVMe-only slot cannot use the SATA protocol."
   ],
   [
    "Wi-Fi is weak after a display replacement. What do you check first?",
    "The antenna leads at the wireless card and along the hinge and bezel, which may be loose, pinched or swapped."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference card with photos of SODIMM, DIMM, B+M key and M key edges, and let them match parts visually before reasoning about function.",
   "Extend: Have students write a short customer-facing upgrade recommendation for one laptop card, including what to check in the service manual and how to verify the upgrade in Task Manager and Disk Management."
  ]
 },
 {
  "t": "Screen parts: LCD vs OLED panels, backlight, digitizer/touch layer, webcam and microphone placement in the bezel",
  "objectives": [
   "Students will be able to describe the layers of a mobile display, from panel to digitizer to cover glass and bezel.",
   "Students will be able to compare LCD and OLED panels, including backlight needs, black levels and burn-in.",
   "Students will be able to diagnose a display symptom as backlight, panel, digitizer or hinge cable from its description."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Turn off the room lights and shine a flashlight at a dark projector screen. Ask what a technician learns if a laptop screen shows a faint image only under a flashlight."
   ],
   [
    10,
    "Teach",
    "Draw the display stack on the whiteboard: backlight, LCD panel, digitizer, cover glass, bezel with webcam, microphones and antennas, and the cable path through the hinge. Contrast LCD with OLED and mention IPS, TN, VA and mini-LED."
   ],
   [
    20,
    "Activity",
    "Run the Which Layer Failed symptom cards activity described below."
   ],
   [
    5,
    "Discuss",
    "Review the cards groups disagreed on and connect each to the Light, Picture, Touch sorting rule."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you shine a flashlight on a black laptop screen and can faintly see the desktop, what is still working and what has failed?",
  "activity": {
   "title": "Which Layer Failed",
   "materials": "Printed symptom cards, whiteboard with the display stack drawn on it, sticky notes.",
   "steps": [
    "Give each group of three a set of ten symptom cards, such as dim image visible with flashlight, taskbar ghost on screen, flicker when the lid moves, touch dead in one corner.",
    "Groups place each card on the whiteboard next to the layer they think has failed: backlight or inverter, panel, digitizer, hinge cable or settings.",
    "For each placement, a group member writes one confirming test on a sticky note, such as connecting an external monitor or running a touch test.",
    "Include two OLED cards so students must recognize that the flashlight test does not apply.",
    "The class walks the board and the teacher confirms or corrects each placement."
   ]
  },
  "discussion": [
   "Why might a manufacturer bond the digitizer to the glass, and how does that affect repair cost?",
   "When would you recommend an OLED laptop to a customer, and when might you steer them away from it?"
  ],
  "exit": [
   [
    "A laptop shows a faint image only with a flashlight. What failed?",
    "The backlight or its power circuit; on an older CCFL model, possibly the inverter."
   ],
   [
    "Why can an OLED screen not have a backlight failure?",
    "Each OLED pixel produces its own light, so there is no backlight."
   ],
   [
    "The picture is fine but one corner ignores taps. Which component do you suspect?",
    "The digitizer, the touch layer."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the display stack and let students point to the failed layer before writing their answer.",
   "Extend: Ask students to write a short troubleshooting flowchart that starts with an external monitor test and ends at a specific part to order."
  ]
 },
 {
  "t": "Physical privacy and security: biometrics, privacy screens, NFC-based security",
  "objectives": [
   "Students will be able to match physical threats such as shoulder surfing, theft and device loss to the correct control.",
   "Students will be able to explain why biometric sign-in always includes a PIN or password fallback.",
   "Students will be able to describe how NFC is used for payments, badges and security keys and why lost badges must be revoked."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list everything that could go wrong with a work laptop used in a coffee shop. Write answers on the board."
   ],
   [
    10,
    "Teach",
    "Group the warm-up answers into viewing, theft, unauthorized access and data loss. Introduce privacy screens, cable locks, biometrics with PIN fallback, NFC badges and keys, encryption and remote wipe, and map each to one group."
   ],
   [
    20,
    "Activity",
    "Run the Threat and Control matching game described below."
   ],
   [
    5,
    "Discuss",
    "Ask which pairs were tempting but wrong, such as a privacy screen for theft, and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "You are working on a laptop in a busy coffee shop. List three different things that could go wrong with the device or the data on it.",
  "activity": {
   "title": "Threat and Control Match",
   "materials": "Two sets of printed cards (threat cards and control cards), tape, whiteboard.",
   "steps": [
    "Give each group one set of eight threat cards, such as a stranger reading a screen or a laptop left on a table, and eight control cards.",
    "Groups tape each threat to the control that best addresses it on the whiteboard.",
    "For each match, groups write one sentence explaining what the control does not protect against.",
    "The teacher reveals two scenario cards with multiple threats, and groups choose a layered set of controls.",
    "Groups present one layered recommendation to the class."
   ]
  },
  "discussion": [
   "Why do you think people write passwords on sticky notes, and how can biometrics help reduce that habit?",
   "Is a biometric sign-in more or less private than a password? What tradeoffs do you see?"
  ],
  "exit": [
   [
    "Employees are working where others can read their screens. Which control fits?",
    "A privacy screen or built-in privacy mode, ideally with a short screen lock timeout."
   ],
   [
    "Why does fingerprint sign-in still require a PIN?",
    "As a fallback when the sensor fails, and because a fingerprint cannot be changed if compromised."
   ],
   [
    "Which control protects data on a stolen laptop?",
    "Full-disk encryption, ideally with remote wipe through MDM."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column reference table of threats and controls to use during the matching game.",
   "Extend: Have students design a complete physical security policy for a fictional mobile sales team, justifying each control against a named threat."
  ]
 },
 {
  "t": "Mobile ports and accessories: USB-C, Lightning, micro-USB, docking stations and port replicators",
  "objectives": [
   "Students will be able to identify USB-C, Lightning, micro-USB and mini-USB connectors from a picture or description.",
   "Students will be able to explain why two USB-C ports can offer different capabilities.",
   "Students will be able to compare a docking station with a port replicator and choose one for a scenario.",
   "Students will be able to troubleshoot a dock that provides USB but no video or insufficient power."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hold up or project several cables and ask students to name each connector and say whether it is reversible."
   ],
   [
    10,
    "Teach",
    "Explain connector shape versus capability, port icons, alternate mode, power delivery, cable ratings, Lightning, micro-USB, and the difference between docks and port replicators."
   ],
   [
    20,
    "Activity",
    "Run the Dock Detective scenarios described below."
   ],
   [
    5,
    "Discuss",
    "Ask groups which clue in each scenario pointed to the answer."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Look at these cables. Which plugs go in either way up, and which only fit one way?",
  "activity": {
   "title": "Dock Detective",
   "materials": "Printed scenario cards, printed laptop port spec sheets, a few real cables if available, whiteboard.",
   "steps": [
    "Give each pair four scenario cards describing dock problems, such as USB working but monitors blank, or a slow-charging warning.",
    "Give pairs a matching spec sheet for each laptop listing what each USB-C port supports.",
    "Pairs identify the cause for each scenario and write the fix in one sentence.",
    "Pairs then choose between a docking station and a port replicator for two customer descriptions and justify the choice.",
    "Selected pairs present one diagnosis to the class."
   ]
  },
  "discussion": [
   "Why might manufacturers put USB-C ports with different capabilities on the same laptop?",
   "How would you explain to a non-technical user that two identical-looking ports behave differently?"
  ],
  "exit": [
   [
    "A dock runs USB devices but not monitors on one laptop. What is a likely cause?",
    "That laptop's USB-C port does not support DisplayPort alternate mode or Thunderbolt video."
   ],
   [
    "What distinguishes a docking station from a port replicator?",
    "A docking station adds features such as power, network and multiple video outputs; a port replicator mainly duplicates ports."
   ],
   [
    "Which connector is non-reversible and common on older Android phones?",
    "Micro-USB."
   ]
  ],
  "differentiation": [
   "Support: Provide a picture chart of each connector with its name and key traits for students to reference.",
   "Extend: Ask students to compare the spec sheets of two real laptops in the browser and list which ports support video, charging and Thunderbolt."
  ]
 },
 {
  "t": "Accessories: touch pens/stylus, headsets, speakers, webcams, trackpads and drawing pads",
  "objectives": [
   "Students will be able to compare passive and active styluses and explain digitizer compatibility.",
   "Students will be able to resolve audio problems by selecting the correct output and input devices in the OS and in an app.",
   "Students will be able to list non-hardware causes of webcam and trackpad problems and check them in order."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to share a time an accessory seemed broken but turned out to be a setting."
   ],
   [
    10,
    "Teach",
    "Cover connection types, passive and active styluses, default audio devices and Bluetooth profiles, UVC webcams and privacy settings, trackpad toggles and palm rejection, and drawing pad drivers. Emphasize least invasive checks first."
   ],
   [
    20,
    "Activity",
    "Run the Help Desk Role-Play described below."
   ],
   [
    5,
    "Discuss",
    "Ask callers which questions helped the technician find the fix fastest."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Think of a time a headset, mouse or camera seemed broken. What turned out to be the real cause?",
  "activity": {
   "title": "Help Desk Role-Play",
   "materials": "Printed caller cards with a hidden cause, printed checklist cards, student laptops with a browser for viewing their own sound and camera settings.",
   "steps": [
    "Pair students as caller and technician. Callers receive a card describing a symptom and a hidden cause, such as the wrong default microphone or a camera privacy switch off.",
    "Technicians ask questions and give instructions, without seeing the card, following a least invasive first checklist.",
    "Technicians open their own laptop's sound or camera settings to show the caller where the fix would be.",
    "After each call, partners swap roles with a new card.",
    "Each pair records the number of questions needed to reach the fix."
   ]
  },
  "discussion": [
   "Why is it usually faster to check settings before replacing an accessory?",
   "How would you teach a user to fix the wrong audio device problem themselves next time?"
  ],
  "exit": [
   [
    "Sound still plays from laptop speakers after connecting a Bluetooth headset. What do you do?",
    "Select the headset as the output device in sound settings or in the app."
   ],
   [
    "Name the difference between a passive and active stylus.",
    "A passive stylus imitates a finger; an active stylus has electronics for pressure, palm rejection and buttons and must match the digitizer."
   ],
   [
    "Give two non-hardware reasons a built-in webcam is unavailable.",
    "A camera privacy setting, a physical shutter, a function-key disable or the device disabled in Device Manager."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed least invasive first checklist: power, pairing, toggles, settings, drivers, hardware.",
   "Extend: Ask students to write a short knowledge base article for users on switching audio devices in a meeting app and in Windows."
  ]
 },
 {
  "t": "Wireless connection methods: Bluetooth pairing, NFC, hotspot and tethering, Wi-Fi",
  "objectives": [
   "Students will be able to choose between Bluetooth, NFC, hotspot or tethering, and Wi-Fi for a given scenario.",
   "Students will be able to describe the Bluetooth pairing process and troubleshoot a failed pairing.",
   "Students will be able to compare USB, Wi-Fi and Bluetooth tethering and explain MAC randomization effects."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students which wireless technologies their phone used today and for what."
   ],
   [
    10,
    "Teach",
    "Present each radio with its range and purpose, walk through Bluetooth pairing steps, explain hotspots and the three tethering methods, and cover SSIDs, captive portals and MAC randomization."
   ],
   [
    20,
    "Activity",
    "Run the Pick the Radio scenario relay described below."
   ],
   [
    5,
    "Discuss",
    "Review scenarios where two answers seemed possible, such as hotspot versus USB tethering."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List every wireless connection your phone has used today, and what each one was for.",
  "activity": {
   "title": "Pick the Radio Relay",
   "materials": "Printed scenario cards, four wall signs labeled Bluetooth, NFC, Hotspot or Tethering, and Wi-Fi, whiteboard.",
   "steps": [
    "Post the four signs in the corners of the room.",
    "Read a scenario card aloud, such as pay at a card terminal, or share mobile data while charging the phone.",
    "Students walk to the corner they choose and one student from each corner justifies the choice.",
    "Reveal the answer and the clue word that points to it.",
    "Finish with two troubleshooting cards, such as earbuds that will not pair, which groups solve on the whiteboard in steps."
   ]
  },
  "discussion": [
   "What security risks come with leaving a phone hotspot running with a simple password?",
   "Why might a company network administrator dislike MAC randomization, and why do phone makers enable it?"
  ],
  "exit": [
   [
    "Which tethering method also charges the phone?",
    "USB tethering."
   ],
   [
    "What are the general steps to pair a Bluetooth headset?",
    "Enable Bluetooth, put the headset in pairing mode, select it on the host, confirm any code, then test."
   ],
   [
    "A user wants to pay by tapping a phone on a terminal. Which technology is used?",
    "NFC."
   ]
  ],
  "differentiation": [
   "Support: Provide a table summarizing each radio's range, purpose and setup steps for students to consult during the relay.",
   "Extend: Ask students to write a step-by-step guide for securely setting up a phone hotspot, including the network name, WPA2 or WPA3 and a strong password."
  ]
 },
 {
  "t": "Cellular connectivity: 4G/5G, enabling and disabling radios, airplane mode, eSIM vs physical SIM",
  "objectives": [
   "Students will be able to explain the differences between 4G LTE and 5G, including why high-band 5G struggles indoors.",
   "Students will be able to describe what airplane mode disables and how individual radios can be re-enabled.",
   "Students will be able to compare physical SIM and eSIM provisioning and distinguish IMEI from IMSI."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to look at their phone's status bar and say what network type is shown and whether it changes inside versus near a window."
   ],
   [
    10,
    "Teach",
    "Cover 4G LTE and 5G frequency ranges, radio toggles and data roaming, airplane mode behavior, SIM sizes, eSIM provisioning, IMEI, IMSI, SIM PIN and PUK."
   ],
   [
    20,
    "Activity",
    "Run the No Service Triage card activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss which clue in each card was decisive and how to avoid unnecessary phone replacements."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "What does your phone show at the top of the screen right now for cellular service, and do you think it would change in a basement?",
  "activity": {
   "title": "No Service Triage",
   "materials": "Printed phone screen cards showing status bar icons and settings, printed ticket descriptions, whiteboard.",
   "steps": [
    "Give each pair six ticket cards, such as no cellular but Wi-Fi works after a flight, or a stolen phone that must be blocked.",
    "Each ticket comes with a printed status bar or settings screenshot the teacher has drawn or mocked up.",
    "Pairs identify the cause and the first fix, writing one sentence each.",
    "Pairs sort the tickets into airplane mode, SIM or eSIM, roaming, coverage, and identifier categories on the whiteboard.",
    "The class reviews each category and the teacher confirms answers."
   ]
  },
  "discussion": [
   "What are the advantages and drawbacks of eSIM-only phones for travelers and for IT departments?",
   "Why might an organization require a SIM PIN on company phones?"
  ],
  "exit": [
   [
    "After a flight, a phone has Wi-Fi but no cellular. What do you check first?",
    "Whether airplane mode is still on with Wi-Fi re-enabled."
   ],
   [
    "Which identifier lets a carrier block a stolen phone regardless of SIM?",
    "The IMEI."
   ],
   [
    "How is an eSIM usually provisioned?",
    "By scanning a QR code or using the carrier's app or setup assistant."
   ]
  ],
  "differentiation": [
   "Support: Give students a comparison chart of SIM versus eSIM and IMEI versus IMSI to refer to during triage.",
   "Extend: Ask students to write the help desk steps for moving a user's line from a physical SIM phone to an eSIM-only phone."
  ]
 },
 {
  "t": "Location services: GPS and cellular location",
  "objectives": [
   "Students will be able to explain how GPS uses satellite signal timing and why it is receive-only.",
   "Students will be able to compare GPS, cellular and Wi-Fi positioning for accuracy and indoor use.",
   "Students will be able to configure per-app location permissions to balance privacy, functionality and battery life."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students whether their phone's map works inside a parking garage and why they think that is."
   ],
   [
    10,
    "Teach",
    "Explain GPS trilateration and GNSS, cellular and Wi-Fi positioning, A-GPS, sensor fusion, per-app permissions and approximate location, and photo location metadata."
   ],
   [
    20,
    "Activity",
    "Run the Human GPS and permissions audit activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss what students found in their permission audits and which settings they would change."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Does your phone's map work inside a parking garage? Why might it struggle there?",
  "activity": {
   "title": "Human GPS and Permissions Audit",
   "materials": "Sticky notes, string or tape measure, whiteboard, student phones or laptops with a browser for reviewing location settings.",
   "steps": [
    "Place three volunteers as satellites at marked spots in the room. A fourth student stands somewhere unknown.",
    "Each satellite gives the distance to the hidden student; the class uses the distances to locate them on a whiteboard floor plan, illustrating trilateration.",
    "Repeat with one satellite blocked to show why more signals give a better fix.",
    "Students open the location settings on their own device and list three apps with location access and their current setting.",
    "Students recommend a better setting for one app and explain the privacy and battery benefit."
   ]
  },
  "discussion": [
   "Why might an organization disable location access for the camera app on company phones?",
   "When is it reasonable for an app to have always location access?"
  ],
  "exit": [
   [
    "Why does GPS struggle inside large buildings?",
    "Its satellite signals are weak and blocked by roofs and walls."
   ],
   [
    "What is the advantage and drawback of cellular location?",
    "It works indoors without a sky view, but it is much less precise than GPS."
   ],
   [
    "A user wants a weather app to work without constant tracking. What setting fits?",
    "Location access only while using the app, optionally approximate."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column chart comparing GPS, cellular and Wi-Fi positioning that students fill in during the teach segment.",
   "Extend: Ask students to research how A-GPS reduces time to first fix and explain it to a partner using the Human GPS model."
  ]
 },
 {
  "t": "Mobile device management (MDM) and mobile application management: enrollment, policies, remote wipe",
  "objectives": [
   "Students will be able to differentiate MDM from MAM and recommend each for corporate and BYOD devices.",
   "Students will be able to describe automated enrollment and BYOD enrollment.",
   "Students will be able to choose between a full wipe and a selective wipe based on device ownership.",
   "Students will be able to explain how compliance policies and conditional access can block a device."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students whether they would let their employer control their personal phone, and what they would object to."
   ],
   [
    10,
    "Teach",
    "Explain MDM and MAM, automated and BYOD enrollment, common policies, compliance and conditional access, and full versus selective wipe, plus lock and locate before wipe."
   ],
   [
    20,
    "Activity",
    "Run the Console Decisions role-play described below."
   ],
   [
    5,
    "Discuss",
    "Debrief the decisions where the wrong wipe would have caused harm."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Would you let your employer manage your personal phone? What would you be comfortable with, and what would you refuse?",
  "activity": {
   "title": "Console Decisions",
   "materials": "Printed device cards (owner, ownership type, situation), printed action cards (lock, locate, full wipe, selective wipe, apply policy, require update), whiteboard.",
   "steps": [
    "Give groups of three a stack of eight device cards, such as a corporate tablet left on a bus or a BYOD phone of a departing employee.",
    "One student plays the help desk technician, one the device owner and one the security manager.",
    "For each card, the group agrees on an ordered sequence of action cards and lays them out.",
    "The owner role must object if an action would harm personal data; the group adjusts if needed.",
    "Groups post their sequences on the whiteboard and the teacher reviews them with the class."
   ]
  },
  "discussion": [
   "How should a company explain its mobile policy so employees trust a BYOD program?",
   "What are the risks of letting devices access company email without any compliance checks?"
  ],
  "exit": [
   [
    "An employee who used a personal phone resigns. Which wipe do you use?",
    "A selective or enterprise wipe that removes only corporate apps and data."
   ],
   [
    "What is the main difference between MDM and MAM?",
    "MDM manages the whole device; MAM manages only specific work apps and their data."
   ],
   [
    "What is zero-touch or automated enrollment?",
    "Company devices registered in advance that contact the MDM and configure themselves on first power-on."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision tree that starts with who owns the device and leads to the correct wipe.",
   "Extend: Ask students to draft a short BYOD mobile policy covering enrollment, required protections and what happens at offboarding."
  ]
 },
 {
  "t": "Mobile app and data sync: email, calendar and contacts, cloud sync, two-factor authenticator apps",
  "objectives": [
   "Students will be able to choose between IMAP, POP3 and Exchange-type accounts for a user's devices.",
   "Students will be able to identify common sync failures, including full quotas, paused sync and local-only contacts.",
   "Students will be able to explain why authenticator apps are stronger than SMS codes and how to migrate them safely."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students what they would lose if their phone were wiped right now, and what would come back automatically."
   ],
   [
    10,
    "Teach",
    "Explain sync, IMAP, POP3, SMTP and Exchange-type accounts with their secure ports, CalDAV and CardDAV, cloud quotas and conflicts, and TOTP apps versus SMS codes."
   ],
   [
    20,
    "Activity",
    "Run the Phone Upgrade Checklist activity described below."
   ],
   [
    5,
    "Discuss",
    "Compare checklists and agree on the order of steps."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If your phone were wiped right now, what would come back when you signed in on a new phone, and what would be gone?",
  "activity": {
   "title": "Phone Upgrade Checklist",
   "materials": "Printed user profile cards listing accounts and settings, sticky notes, whiteboard.",
   "steps": [
    "Give each pair a user profile card, for example a Microsoft 365 work account, a POP3 personal account, local contacts and an authenticator app with five services.",
    "Pairs list every risk to the user's data or access if the old phone is wiped immediately.",
    "Pairs write a numbered upgrade checklist on sticky notes, one step per note.",
    "Pairs arrange their notes on the whiteboard in order and compare with another pair.",
    "The class agrees on a final checklist, with authenticator migration before the wipe."
   ]
  },
  "discussion": [
   "Why do you think some services still offer SMS codes when authenticator apps are stronger?",
   "How should a help desk handle a user who is locked out because they wiped a phone without migrating their authenticator?"
  ],
  "exit": [
   [
    "A user reads mail on three devices. Which account type do you configure?",
    "IMAP or an Exchange-type account, so mail stays on the server and syncs everywhere."
   ],
   [
    "What must happen before a user factory-resets an old phone?",
    "Migrate authenticator accounts and confirm recovery codes, and make sure data is synced or backed up."
   ],
   [
    "Why are authenticator codes stronger than SMS codes?",
    "SMS codes can be intercepted or redirected through SIM swapping; authenticator codes are generated on the device."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed checklist with blanks for students to fill in.",
   "Extend: Ask students to compare the secure ports for IMAP, POP3 and SMTP submission and explain what changes when a provider requires modern browser sign-in."
  ]
 },
 {
  "t": "TCP vs UDP and common ports: FTP 20/21, SSH 22, Telnet 23, SMTP 25, DNS 53, DHCP 67/68, HTTP 80, POP3 110, IMAP 143, SNMP 161/162, LDAP 389, HTTPS 443, SMB 445, RDP 3389",
  "objectives": [
   "Students will be able to compare TCP and UDP, including the three-way handshake and when each is used.",
   "Students will be able to recall the standard port and transport for FTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP, POP3, IMAP, SNMP, LDAP, HTTPS, SMB and RDP.",
   "Students will be able to identify which port to open or block in a firewall scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to name any port numbers they already know and what they are for."
   ],
   [
    10,
    "Teach",
    "Contrast TCP and UDP with the handshake, then present the port table grouped by remote access, web, mail, infrastructure and file sharing, pointing out secure and insecure pairs."
   ],
   [
    20,
    "Activity",
    "Run the Firewall Rule Builder activity described below, followed by a quick port flashcard round."
   ],
   [
    5,
    "Discuss",
    "Review which ports groups chose to keep closed and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name any port number you already know and the service that uses it.",
  "activity": {
   "title": "Firewall Rule Builder",
   "materials": "Printed scenario cards, printed port flashcards (service on one side, port and transport on the other), whiteboard with a blank firewall rule table.",
   "steps": [
    "Give each group a scenario card, such as an office that needs file sharing, remote desktop to one server and network monitoring.",
    "Groups write firewall allow rules on the whiteboard table: source, destination, port and TCP or UDP.",
    "Groups list at least one port they would deliberately block, such as Telnet 23, and explain why.",
    "Groups trade scenarios and check each other's rules for wrong ports or wrong transports.",
    "Finish with a two-minute flashcard race in pairs using the port cards."
   ]
  },
  "discussion": [
   "Why do some protocols choose UDP even though it does not guarantee delivery?",
   "If you could open only the minimum ports for an office, how would you decide what that minimum is?"
  ],
  "exit": [
   [
    "Which transport uses a three-way handshake?",
    "TCP, to set up a reliable connection before sending data."
   ],
   [
    "A user can browse the web but not reach a Windows file share. Which port may be blocked?",
    "TCP 445 for SMB."
   ],
   [
    "What is the secure replacement for Telnet and its port?",
    "SSH on TCP 22."
   ]
  ],
  "differentiation": [
   "Support: Let students use a printed port table during the rule-building task, then remove it for the flashcard race.",
   "Extend: Ask students to run netstat on their own laptop, identify two listening ports and look up the service each belongs to."
  ]
 },
 {
  "t": "Networking hardware: routers, managed vs unmanaged switches, access points, patch panels, firewalls, PoE injectors and switches, cable modems, DSL and ONT",
  "objectives": [
   "Students will be able to differentiate routers, switches, access points, firewalls and patch panels by function and OSI layer.",
   "Students will be able to choose between managed and unmanaged switches based on VLAN and monitoring needs.",
   "Students will be able to select a PoE switch or PoE injector for powering network devices.",
   "Students will be able to match cable modems, DSL modems and ONTs to the provider's line type."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to describe the boxes in their home network and what each one does."
   ],
   [
    10,
    "Teach",
    "Draw a small office network on the whiteboard from the ONT or modem through the router and firewall to a managed PoE switch, patch panel, access points and cameras, explaining each device and the PoE standards."
   ],
   [
    20,
    "Activity",
    "Run the Build the Closet design activity described below."
   ],
   [
    5,
    "Discuss",
    "Groups compare designs and explain one equipment choice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think about your home internet. What boxes sit between the wall and your laptop, and what do you think each one does?",
  "activity": {
   "title": "Build the Closet",
   "materials": "Printed device cards (router, managed switch, unmanaged switch, PoE switch, PoE injector, AP, firewall, patch panel, cable modem, DSL modem, ONT), printed customer brief cards, whiteboard, markers.",
   "steps": [
    "Give each group a customer brief, such as a dental office with fiber service, two PoE cameras, an AP and a need for guest Wi-Fi separation.",
    "Groups choose device cards and arrange them on the whiteboard in order from the provider line to the end devices.",
    "Groups draw cables between devices and label which ones carry PoE.",
    "Groups write one sentence justifying each device, including why they chose managed or unmanaged and PoE switch or injector.",
    "Groups rotate to review another design and leave one sticky-note question."
   ]
  },
  "discussion": [
   "When would a single all-in-one home router be a poor choice for a small business?",
   "What problems does a patch panel solve that are hard to see on day one but matter years later?"
  ],
  "exit": [
   [
    "What is the main difference between a router and a switch?",
    "A router forwards between networks using IP addresses; a switch forwards within a network using MAC addresses."
   ],
   [
    "A company needs guest and staff traffic separated on the same switch. What type of switch is needed?",
    "A managed switch that supports VLANs."
   ],
   [
    "Which device terminates a fiber-to-the-premises connection?",
    "The ONT, or optical network terminal."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled sample network diagram for students to adapt rather than starting from a blank board.",
   "Extend: Ask students to calculate whether a PoE switch's power budget can support a given mix of APs, phones and cameras using stated per-device wattages."
  ]
 },
 {
  "t": "Wireless: 2.4, 5 and 6 GHz bands, channels and regulations, 802.11a/b/g/n/ac/ax, Bluetooth, NFC, RFID",
  "objectives": [
   "Students will be able to match each 802.11 standard (a, b, g, n, ac, ax and Wi-Fi 6E) to its frequency band or bands.",
   "Students will be able to explain the range, speed and interference trade-offs between 2.4, 5 and 6 GHz and identify the non-overlapping 2.4 GHz channels.",
   "Students will be able to explain why regulations, DFS and channel width affect access point configuration.",
   "Students will be able to choose between Wi-Fi, Bluetooth, NFC and RFID for a described use case."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to list every wireless device they carried or used today. Sort the list on the board into Wi-Fi, Bluetooth, NFC and RFID without explaining yet."
   ],
   [
    15,
    "Teach",
    "Draw the 2.4 GHz band with overlapping channel humps and circle 1, 6 and 11. Compare bands on range, speed and crowding. Build the standards timeline a, b, g, n, ac, ax, 6E with bands underneath. Explain DFS, region settings and channel bonding. Finish with Bluetooth, NFC and RFID."
   ],
   [
    15,
    "Activity",
    "Run the channel-planning activity in pairs using the printed floor plan and neighbor scan cards."
   ],
   [
    5,
    "Discuss",
    "Pairs share their plans. Ask why some chose 20 MHz on 2.4 GHz and wide channels on 5 GHz."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Name every wireless connection your phone used in the last 24 hours. Which ones needed you to be close to something, and which worked across the room?",
  "activity": {
   "title": "Plan the Wi-Fi for a crowded office",
   "materials": "Printed floor plan of a small office, printed 'neighbor scan' cards listing nearby networks with band, channel and width, colored markers, whiteboard.",
   "steps": [
    "Give each pair a floor plan and a neighbor scan card showing which 2.4 GHz and 5 GHz channels nearby networks use.",
    "Pairs choose a 2.4 GHz channel and width, a 5 GHz channel and width, and mark where one or two access points should go.",
    "Hand out a twist card: the access point log shows radar detected on its 5 GHz channel. Pairs explain what happened and whether it is a fault.",
    "Hand out a second twist: a warehouse corner needs long-range scanner coverage through shelving. Pairs decide which band serves it.",
    "Each pair writes a three-sentence justification citing 1, 6 and 11, channel width and band trade-offs."
   ]
  },
  "discussion": [
   "When would you deliberately keep 2.4 GHz enabled even though 5 GHz is faster?",
   "Why do you think regulators limit transmit power instead of letting anyone broadcast as loudly as they want?",
   "NFC is a form of RFID. What makes its very short range useful for payments?"
  ],
  "exit": [
   [
    "Which bands does 802.11ax use, and what is Wi-Fi 6E?",
    "802.11ax uses 2.4 and 5 GHz; Wi-Fi 6E is 802.11ax extended into 6 GHz."
   ],
   [
    "Why is a 40 MHz channel usually a poor choice on 2.4 GHz in a busy building?",
    "It uses most of the small band, overlapping neighbors and increasing interference; 20 MHz on 1, 6 or 11 is better."
   ],
   [
    "A gym wants members to tap a phone at the door to enter. Which technology fits?",
    "NFC, which works within a few centimeters for tap-based access and payments."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference card with a two-column table of standards and bands and a sketch of the 2.4 GHz channel overlap, and let them use it during the activity.",
   "Extend: Ask fast finishers to explain how OFDMA and MU-MIMO each help in a crowded lecture hall and which standard introduced each."
  ]
 },
 {
  "t": "Networked host services: DNS, DHCP, file and print servers, mail, syslog, web servers, AAA/RADIUS, proxy servers, spam gateways, UTM, load balancers, IoT and legacy/embedded systems",
  "objectives": [
   "Students will be able to describe the role of DNS, DHCP, file, print, mail, syslog, web and AAA servers.",
   "Students will be able to identify the failing service from a described user symptom, such as names failing or 169.254 addresses.",
   "Students will be able to distinguish a proxy server, spam gateway, UTM appliance and load balancer.",
   "Students will be able to recommend protections for IoT, legacy and embedded systems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up: a user says the internet is down but you can load a site by IP. Take quick guesses and leave them on the board."
   ],
   [
    12,
    "Teach",
    "Walk through each server role with a one-line symptom of failure. Contrast proxy versus load balancer with a sketch of arrows facing outward and inward. Explain AAA and RADIUS with a Wi-Fi Enterprise login flow. Close with IoT and legacy segmentation."
   ],
   [
    18,
    "Activity",
    "Run the symptom-to-service card match in groups of three."
   ],
   [
    5,
    "Discuss",
    "Groups explain the two cards they argued about most. Revisit the warm-up guesses."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "A user calls to say 'the internet is down', but you can open a public website by typing its IP address. What is actually broken, and how do you know?",
  "activity": {
   "title": "Symptom-to-service match",
   "materials": "Two sets of printed cards per group: symptom or requirement cards and service cards (DNS, DHCP, file server, print server, mail, syslog, web, RADIUS, proxy, spam gateway, UTM, load balancer, segmented IoT/legacy), sticky notes.",
   "steps": [
    "Groups shuffle both decks and lay the service cards face up.",
    "Draw a symptom card, for example 'new laptops show 169.254 addresses', and place it under the matching service, writing the clue word on a sticky note.",
    "After all cards are placed, swap tables with another group and check their matches, flagging any disagreement.",
    "Each group writes one new symptom card of its own for a service and challenges a neighboring group with it.",
    "The teacher reveals the answer key and groups correct their boards."
   ]
  },
  "discussion": [
   "Why might a small business choose a UTM appliance instead of separate firewall, filtering and antivirus products, and what is the downside of one box doing everything?",
   "If a syslog server cannot stop attacks, why is it still worth running?",
   "Why are IoT and legacy devices harder to secure than a normal laptop?"
  ],
  "exit": [
   [
    "New laptops show 169.254.x.x addresses. Which service should you check?",
    "DHCP, or the network path to the DHCP server."
   ],
   [
    "What is the difference between a proxy server and a load balancer?",
    "A proxy makes requests on behalf of users going out; a load balancer spreads incoming requests across several servers."
   ],
   [
    "Which protocol commonly centralizes Wi-Fi Enterprise and VPN logins?",
    "RADIUS, an AAA protocol."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference sheet listing each service with a single plain-language sentence and one symptom, and pair struggling students with a confident partner for the card match.",
   "Extend: Ask fast finishers to trace a WPA3-Enterprise login step by step, naming the client, access point, RADIUS server and directory, and to explain where accounting records are created."
  ]
 },
 {
  "t": "SOHO setup: DHCP scopes and reservations, static addressing, NAT, port forwarding, DMZ, UPnP, screened subnet, Wi-Fi security (WPA2/WPA3)",
  "objectives": [
   "Students will be able to list the secure order of SOHO router setup steps, starting with credentials and firmware.",
   "Students will be able to compare static addressing and DHCP reservations and explain why port forwarding needs a fixed address.",
   "Students will be able to distinguish NAT, port forwarding, a DMZ host, a screened subnet and UPnP.",
   "Students will be able to select appropriate SOHO wireless security settings (WPA3 or WPA2 with AES, WPS disabled)."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about what students would change first on a new router."
   ],
   [
    15,
    "Teach",
    "Project a mock router admin screen. Walk through credentials, firmware, DHCP scope, reservations, NAT and port forwarding, then contrast DMZ host with screened subnet. Finish with UPnP, WPS and WPA3 versus WPA2 with AES."
   ],
   [
    15,
    "Activity",
    "Pairs complete the paper router configuration for a fictional client."
   ],
   [
    5,
    "Discuss",
    "Review answers and ask each pair which setting they were most tempted to leave on and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You just unboxed a new home router for a small business. Before you plug in a single client, what is the very first thing you would change, and why?",
  "activity": {
   "title": "Configure the router on paper",
   "materials": "Printed mock router screens (admin password, firmware, DHCP, reservations, port forwarding, DMZ, UPnP, wireless security), a printed client brief, pencils, projector for review.",
   "steps": [
    "Hand each pair the client brief: a home bakery with a camera recorder that must be viewable remotely, a printer, staff laptops, and visiting customers who want Wi-Fi.",
    "Pairs fill in each mock screen in the order they would configure it, numbering the screens.",
    "Pairs choose a DHCP scope, write a reservation for the recorder's MAC address and create one port-forward rule.",
    "Pairs decide on the DMZ, UPnP, WPS and wireless security settings, writing one reason next to each.",
    "Pairs swap sheets with another pair and check for scope conflicts, missing reservations and insecure settings."
   ]
  },
  "discussion": [
   "UPnP and WPS exist because people wanted convenience. When, if ever, is that convenience worth the risk?",
   "Why does a business with public-facing servers need a screened subnet rather than a DMZ host?",
   "How would you explain NAT to a client who thinks their router is a firewall?"
  ],
  "exit": [
   [
    "What does a DHCP reservation do?",
    "It always gives the same IP address to a device, matched by its MAC address, while the device still uses DHCP."
   ],
   [
    "A client wants one web server reachable from the internet. Port forward or DMZ host?",
    "Port forward of the needed port to the server's fixed address; the DMZ host exposes the device to all inbound traffic."
   ],
   [
    "Which wireless settings should a new SOHO router use?",
    "WPA3, or WPA2 with AES if older devices require it, a strong passphrase, and WPS disabled."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of setup steps in the correct order with blanks for each value, so they focus on choosing values rather than remembering the sequence.",
   "Extend: Ask fast finishers to redesign the bakery network for a public web server using a screened subnet and to sketch where the firewall rules sit."
  ]
 },
 {
  "t": "IP addressing: IPv4 vs IPv6, public vs private ranges, APIPA, static vs dynamic, subnet mask and default gateway",
  "objectives": [
   "Students will be able to compare IPv4 and IPv6 formats and correctly shorten an IPv6 address.",
   "Students will be able to classify an IPv4 address as private, public, loopback or APIPA.",
   "Students will be able to explain the roles of the IP address, subnet mask, default gateway and DNS server.",
   "Students will be able to diagnose a connectivity symptom from `ipconfig` output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the warm-up `ipconfig` output with a 169.254 address and ask students what they notice."
   ],
   [
    15,
    "Teach",
    "Explain IPv4 and IPv6 formats and practice shortening two IPv6 addresses together. List the three private ranges and the 172.31 boundary. Explain APIPA, static versus dynamic, and the four parts of a configuration, linking each part to its failure symptom."
   ],
   [
    15,
    "Activity",
    "Pairs work through the printed ipconfig case cards and diagnose each one."
   ],
   [
    5,
    "Discuss",
    "Pairs present one case each and explain which line of output gave it away."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here is a PC's `ipconfig` output: address 169.254.37.112, mask 255.255.0.0, no default gateway. What do you think happened, and what would you check first?",
  "activity": {
   "title": "Read the ipconfig",
   "materials": "Printed case cards, each with a short user complaint and an `ipconfig` excerpt (APIPA, missing gateway, wrong subnet, bad DNS, public address on a LAN, valid config), whiteboard, projector.",
   "steps": [
    "Give each pair six case cards face down.",
    "For each card, pairs circle the line of output that matters most and classify the address as private, public, APIPA or loopback.",
    "Pairs write the likely cause and the first fix, such as reseating a cable, renewing the lease or correcting the gateway.",
    "For two cards, pairs also write the IPv6 link-local address format the device would show and shorten a given long IPv6 address.",
    "Pairs compare answers with another pair and resolve differences before the class review."
   ]
  },
  "discussion": [
   "Why do you think IPv6 was designed with so many more addresses, and why do private IPv4 ranges and NAT still exist?",
   "When would you choose a static address over a DHCP reservation for a device?",
   "Why is a 169.254 address actually helpful to a technician, even though it means something is broken?"
  ],
  "exit": [
   [
    "Is 172.31.200.1 private or public? What about 172.32.0.1?",
    "172.31.200.1 is private; 172.32.0.1 is public, because the private block ends at 172.31."
   ],
   [
    "Shorten fe80:0000:0000:0000:0000:0000:0000:0001.",
    "fe80::1."
   ],
   [
    "Local printing works but no websites load by name or IP. Which setting is most likely wrong?",
    "The default gateway."
   ]
  ],
  "differentiation": [
   "Support: Provide a laminated card with the three private ranges, APIPA, loopback addresses and a symptom table (APIPA means DHCP, local only means gateway, names fail means DNS) for use during the activity.",
   "Extend: Ask fast finishers to explain why 192.168.1.25/24 and 192.168.2.25/24 cannot talk without a router, and to write the network and host portions of each."
  ]
 },
 {
  "t": "DNS records: A, AAAA, CNAME, MX, TXT (SPF, DKIM, DMARC); VLANs and VPNs",
  "objectives": [
   "Students will be able to identify the purpose of A, AAAA, CNAME, MX and TXT records and read an MX priority correctly.",
   "Students will be able to explain how SPF, DKIM and DMARC work together to reduce email spoofing.",
   "Students will be able to explain how VLANs separate traffic and the difference between access ports and trunk links.",
   "Students will be able to compare site-to-site and remote-access VPNs and full versus split tunneling."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario about mail landing in spam after a provider change and collect guesses."
   ],
   [
    15,
    "Teach",
    "Project a sample DNS zone table and walk through each record type. Explain MX priority. Draw the SPF, DKIM and DMARC flow as checks a receiving server performs. Sketch one switch split into three VLANs with a trunk to the firewall, then compare VPN types."
   ],
   [
    15,
    "Activity",
    "Groups fix the broken DNS zone and design the clinic VLAN layout."
   ],
   [
    5,
    "Discuss",
    "Groups share fixes and explain why they set DMARC to report-only first."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A company switched email providers yesterday. Today its customers' replies bounce and its own messages land in spam. The mailboxes work. Where would you look first?",
  "activity": {
   "title": "Fix the zone, split the switch",
   "materials": "Printed 'broken DNS zone' handout with deliberate errors (CNAME pointing to an IP, MX priorities reversed, stale SPF, missing DKIM), printed switch diagram, colored markers, whiteboard.",
   "steps": [
    "Groups read the broken zone handout and circle every error, writing the corrected record beside it.",
    "Groups decide what DMARC policy to start with and justify it in one sentence.",
    "On the switch diagram, groups color ports for staff, phones and guest VLANs and mark which link must be a trunk.",
    "Groups add a note for remote clinicians: remote-access or site-to-site VPN, and full or split tunnel, with a reason.",
    "Two groups pair up to check each other's corrections before the teacher reveals the key."
   ]
  },
  "discussion": [
   "Why is it safer to publish DMARC in report-only mode first rather than going straight to reject?",
   "What problems might a guest network cause if it shared a VLAN with staff PCs?",
   "When would a company prefer full tunnel over split tunnel, despite the extra bandwidth?"
  ],
  "exit": [
   [
    "What does an MX record with priority 5 mean compared with one at priority 15?",
    "The priority 5 server is tried first because the lowest number is preferred."
   ],
   [
    "Which record type stores SPF, DKIM keys and DMARC policies?",
    "TXT records."
   ],
   [
    "Devices on two different VLANs need to communicate. What must sit between them?",
    "A router or firewall (layer 3 device) that routes and controls traffic between the VLANs."
   ]
  ],
  "differentiation": [
   "Support: Give students a record-type cheat sheet with one example line for each record and a three-box diagram labeled 'who may send', 'signature', 'policy' for SPF, DKIM and DMARC.",
   "Extend: Ask fast finishers to write the full set of records needed for a new domain with a website on IPv4 and IPv6, a hosted shop alias, primary and backup mail servers, and email authentication."
  ]
 },
 {
  "t": "Internet connection types: satellite, fiber, cable, DSL, cellular, fixed wireless (WISP)",
  "objectives": [
   "Students will be able to describe fiber, cable, DSL, satellite, cellular and fixed wireless connections and the main weakness of each.",
   "Students will be able to explain the difference between latency and bandwidth and why geostationary satellite has high latency.",
   "Students will be able to recommend a primary and backup connection for a described customer location and need."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the slowest internet students have experienced and why they think it was slow."
   ],
   [
    15,
    "Teach",
    "Define latency versus bandwidth using the delivery-truck analogy. Build a comparison table on the board with columns for medium, speed, latency, availability and weakness for each connection type, including geostationary versus LEO satellite."
   ],
   [
    15,
    "Activity",
    "Groups act as consultants for customer profile cards and present recommendations."
   ],
   [
    5,
    "Discuss",
    "Compare recommendations for the same card across groups and discuss trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think about the worst internet connection you have ever used, at home, on a trip or somewhere rural. Was it slow to load big things, slow to respond, or both?",
  "activity": {
   "title": "Connection consultants",
   "materials": "Printed customer profile cards (rural farm, downtown design studio, temporary film set, food truck, family in a suburb, clinic with a tower in view), whiteboard comparison table from the lesson, sticky notes.",
   "steps": [
    "Each group draws two customer profile cards describing location, users, upload needs, latency needs and available services.",
    "Groups choose a primary connection and a backup for each customer, writing each on a sticky note.",
    "Groups list one weakness of their primary choice and how the backup covers it.",
    "Each group presents one card to the class in under a minute.",
    "The class votes on whether they agree, and the teacher corrects any factual errors."
   ]
  },
  "discussion": [
   "If a customer has only satellite and DSL available, what questions would you ask before recommending one?",
   "Why might a business with fiber still pay for a cellular backup?",
   "Why do you think providers are retiring copper DSL networks?"
  ],
  "exit": [
   [
    "Which connection type is known for speed dropping as distance from the provider increases?",
    "DSL."
   ],
   [
    "A remote cabin needs video calls and has no wired service but a clear sky. What is the concern with traditional satellite, and what improves it?",
    "High latency from geostationary orbit; a low Earth orbit satellite service reduces latency."
   ],
   [
    "What is the difference between latency and bandwidth?",
    "Latency is the round-trip delay; bandwidth is how much data can move per second."
   ]
  ],
  "differentiation": [
   "Support: Give students a filled-in comparison table with one keyword per cell (for example, 'distance' for DSL, 'shared' for cable, 'line of sight' for fixed wireless) to use during the consultant activity.",
   "Extend: Ask fast finishers to design a failover plan for a clinic, choosing two connection types that do not share the same weakness and explaining why."
  ]
 },
 {
  "t": "Network types: LAN, WAN, PAN, MAN, SAN, WLAN",
  "objectives": [
   "Students will be able to define PAN, LAN, WLAN, MAN, WAN and SAN and give an example of each.",
   "Students will be able to classify a described network by its scale or purpose.",
   "Students will be able to contrast a SAN with a NAS in terms of block versus file access and who uses each."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to name every network they used today, from earbuds to the internet, and write them on the board."
   ],
   [
    12,
    "Teach",
    "Draw nested circles: PAN inside WLAN/LAN inside MAN inside WAN, with the SAN drawn off to the side in a data center box. Give an example for each and explain why SAN is defined by purpose. Contrast SAN and NAS."
   ],
   [
    18,
    "Activity",
    "Groups run the scale ladder card sort and then label a hospital group diagram."
   ],
   [
    5,
    "Discuss",
    "Discuss the cards groups disagreed on, especially city versus country links and SAN versus NAS."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List every network you connected to today, starting with the smallest. Which one covered the biggest area?",
  "activity": {
   "title": "Scale ladder card sort",
   "materials": "Printed scenario cards (earbuds and phone, one office floor, Wi-Fi in a library, city fire stations on fiber, offices in three countries, servers using a disk array, file box for staff), a printed hospital group diagram, masking tape to make a ladder on a desk or floor.",
   "steps": [
    "Groups tape a ladder with rungs labeled PAN, LAN, WLAN, MAN, WAN and a separate box labeled SAN/NAS.",
    "Groups place each scenario card on the correct rung and underline the clue word on the card.",
    "Groups label every link and area on the hospital group diagram with a network type.",
    "Groups write one sentence explaining why the disk array card belongs in the SAN box and the file box card is NAS.",
    "Groups rotate to another table, check its placements and leave one sticky-note comment."
   ]
  },
  "discussion": [
   "Why do you think WAN bandwidth costs more than LAN bandwidth?",
   "Is the internet a WAN, or something bigger? What makes it fit the definition?",
   "Why would a hospital keep patient system disks on a SAN instead of inside each server?"
  ],
  "exit": [
   [
    "Several buildings across one city linked by fiber form which network type?",
    "A MAN."
   ],
   [
    "Which network type is defined by purpose rather than area, and what does it do?",
    "A SAN; it gives servers block-level access to shared storage."
   ],
   [
    "A wireless mouse connected to a laptop is part of which network type?",
    "A PAN."
   ]
  ],
  "differentiation": [
   "Support: Provide a picture-based version of the scenario cards with a person, a building, a city skyline and a globe icon to anchor each scale.",
   "Extend: Ask fast finishers to explain the difference between Fibre Channel and iSCSI in one sentence each and why a small business might choose iSCSI."
  ]
 },
 {
  "t": "Networking tools: crimper, cable stripper, punchdown tool, toner probe, cable tester, loopback plug, Wi-Fi analyzer, network tap",
  "objectives": [
   "Students will be able to identify the purpose of a crimper, cable stripper, punchdown tool, toner probe, cable tester, loopback plug, Wi-Fi analyzer and network tap.",
   "Students will be able to select the correct tool for a described cabling or troubleshooting task.",
   "Students will be able to sequence the tools used to locate, repair and verify a cable run."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show pictures of the tools (or real tools if available) without names and ask students to guess what each does."
   ],
   [
    12,
    "Teach",
    "Group the tools: build and terminate (stripper, crimper, punchdown), find and verify (toner probe, cable tester), test devices and medium (loopback plug, Wi-Fi analyzer), and monitor (network tap). Walk through the dead-jack workflow from the lesson."
   ],
   [
    18,
    "Activity",
    "Groups run the ticket-to-toolkit role-play with printed tool cards and trouble tickets."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest tickets, especially toner versus tester and loopback versus tester."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You are handed a bag of unlabeled tools and told one wall jack in the office is dead. Which tool would you want first, and what would you want it to do?",
  "activity": {
   "title": "Ticket to toolkit",
   "materials": "Printed tool cards with a picture and name for each tool, printed trouble tickets (dead jack, unlabeled closet, new patch cable needed, slow Wi-Fi at lunchtime, suspected bad NIC, security team needs to watch traffic), a whiteboard for sequences.",
   "steps": [
    "Each group receives a full set of tool cards and four trouble tickets.",
    "For each ticket, one student reads it aloud as the 'user' and the others lay out the tool cards in the order they would use them.",
    "Groups write the sequence on a sticky note, for example toner probe, cable tester, punchdown tool, cable tester.",
    "Groups swap tickets with a neighboring group and check whether the sequences differ, discussing any differences.",
    "Each group posts its best sequence on the whiteboard for class review."
   ]
  },
  "discussion": [
   "Why is retesting after a repair just as important as testing before it?",
   "When would a team choose a hardware network tap instead of port mirroring on a switch?",
   "What problems can a missing label on a patch panel cause six months from now?"
  ],
  "exit": [
   [
    "Which tool attaches an RJ45 plug to a cable?",
    "A crimper."
   ],
   [
    "Which tool locates a cable, and which verifies its wiring?",
    "A toner probe locates it; a cable tester verifies continuity and pin mapping."
   ],
   [
    "What does a network tap do?",
    "It sits inline on a link and copies all traffic to a monitoring port without disturbing the connection."
   ]
  ],
  "differentiation": [
   "Support: Give students a tool card with a picture, the task phrase the exam uses (for example 'terminate on a patch panel') and the tool name, and let them match first before sequencing.",
   "Extend: Ask fast finishers to explain what a cable certifier measures beyond a basic tester and why a new office installation might need certification."
  ]
 },
 {
  "t": "Displays: LCD panel types (IPS, TN, VA), OLED, mini-LED, resolution, refresh rate, brightness, color gamut, touch screens",
  "objectives": [
   "Students will be able to compare TN, IPS and VA LCD panels on response time, color, viewing angle and contrast.",
   "Students will be able to explain how OLED and mini-LED differ from a standard LCD backlight, including burn-in and blooming.",
   "Students will be able to explain native resolution, scaling, refresh rate, brightness and color gamut and fix a fuzzy-text complaint.",
   "Students will be able to choose between capacitive and resistive touch for a described environment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to look at a classroom monitor or their laptop screen from a sharp side angle and describe what changes."
   ],
   [
    15,
    "Teach",
    "Build a comparison table for TN, IPS, VA, OLED and mini-LED on the board. Explain native resolution and scaling with a demonstration on the projector if possible. Cover refresh rate, response time, nits, contrast and color gamut, then capacitive versus resistive touch."
   ],
   [
    15,
    "Activity",
    "Pairs complete the monitor buyer's guide using customer request cards."
   ],
   [
    5,
    "Discuss",
    "Pairs share recommendations and explain trade-offs such as burn-in versus blooming."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Tilt your laptop screen or look at the nearest monitor from far off to the side. What happens to the colors and brightness, and why might that matter to a designer?",
  "activity": {
   "title": "Monitor buyer's guide",
   "materials": "Printed customer request cards (photo editor, esports player, video colorist, factory floor kiosk, office worker with small text complaint, budget classroom), the comparison table from the lesson on the whiteboard, student laptops to view their own display settings.",
   "steps": [
    "Each pair draws four customer request cards.",
    "For each card, pairs choose a panel type, a key specification (resolution, refresh rate, brightness or gamut) and a touch type if relevant.",
    "For the small-text complaint card, pairs open their own display settings and write down the native resolution and the scaling option they would change.",
    "Pairs write one warning for each recommendation, such as burn-in, blooming, narrow viewing angles or cable limits.",
    "Pairs present one recommendation to another pair, who must challenge it with one question."
   ]
  },
  "discussion": [
   "Why would a manufacturer still sell TN panels when IPS looks better?",
   "For a screen that shows the same dashboard all day, would you pick OLED or mini-LED, and why?",
   "Why is lowering resolution such a common fix that users try, and how would you explain scaling to them?"
  ],
  "exit": [
   [
    "Which LCD panel type has the best color accuracy and viewing angles?",
    "IPS."
   ],
   [
    "A user's text looks fuzzy after they lowered the resolution. What is the correct fix?",
    "Return to native resolution and increase the operating system's display scaling."
   ],
   [
    "What is the main risk of OLED and the main visual artifact of mini-LED?",
    "OLED risks burn-in from static images; mini-LED can show blooming halos around bright objects."
   ]
  ],
  "differentiation": [
   "Support: Provide a simplified table with only three rows (best color, fastest, best blacks) and the matching technology, and pair students so one reads the card while the other checks the table.",
   "Extend: Ask fast finishers to calculate how many pixels 1920x1080 and 3840x2160 contain and explain why a 4K monitor might need scaling on a small screen."
  ]
 },
 {
  "t": "Cables and connectors: USB-A/C, Thunderbolt, HDMI, DisplayPort, DVI, VGA, SATA, Molex, Lightning, Cat 5e/6/6a, T568A/B, plenum vs riser, coax, fiber, adapters",
  "objectives": [
   "Students will be able to identify USB-A, USB-C, Thunderbolt, Lightning, HDMI, DisplayPort, DVI, VGA, SATA, Molex, RJ45, F-type and common fiber connectors by description.",
   "Students will be able to select the correct twisted pair category for a given speed and distance.",
   "Students will be able to explain T568A versus T568B, straight-through versus crossover, and plenum versus riser.",
   "Students will be able to choose an appropriate adapter, including when an active adapter is required."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pass around any spare cables the classroom has, or project photos, and ask students to name as many as they can."
   ],
   [
    15,
    "Teach",
    "Walk through connectors in four groups: peripheral, video, internal, network. Build a category table (5e, 6, 6a with speeds and distances). Explain plenum versus riser, T568A versus T568B and active adapters. Finish with coax and single-mode versus multimode fiber."
   ],
   [
    15,
    "Activity",
    "Groups complete the cable order challenge from work order cards."
   ],
   [
    5,
    "Discuss",
    "Review each group's order and challenge any that would fail inspection or speed requirements."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Look at the ports on your laptop or phone. How many different connector shapes can you find, and do you know what each one carries?",
  "activity": {
   "title": "The cable order challenge",
   "materials": "Printed work order cards (10 Gbps run of 90 meters through a plenum ceiling, VGA projector with a USB-C laptop, two monitors daisy-chained from a PC, cable internet hookup, building-to-building link of several kilometers, internal drive install), printed connector photo sheets, whiteboard.",
   "steps": [
    "Each group receives three work order cards and a connector photo sheet.",
    "For each card, groups write a complete order: cable type or category, jacket rating, connectors on each end, wiring standard and any adapter.",
    "Groups circle the one detail on each card that drove their choice, such as distance, air-handling space or analog display.",
    "Groups trade orders with another group, which acts as the building inspector and marks anything that would fail.",
    "The teacher reviews the most common inspector findings with the class."
   ]
  },
  "discussion": [
   "Why do building codes care what jacket a cable has?",
   "Why might an organization choose Cat 6a for every new run even when current devices only need 1 Gbps?",
   "USB-C looks the same everywhere but behaves differently. What problems does that create for help desk technicians?"
  ],
  "exit": [
   [
    "A 10 Gbps run is 80 meters long. Which copper category should you use?",
    "Cat 6a."
   ],
   [
    "Which video connector is blue, 15-pin and analog only?",
    "VGA."
   ],
   [
    "What is the rule for plenum and riser cable?",
    "Plenum is required in air-handling spaces and can replace riser; riser cannot be used in plenum spaces."
   ]
  ],
  "differentiation": [
   "Support: Give students a connector photo sheet with names and a single-word purpose under each picture (for example 'analog video', 'drive data'), and a one-row category table to use during the challenge.",
   "Extend: Ask fast finishers to write out the T568B color order from pin 1 to pin 8 and explain which pairs swap to make T568A."
  ]
 },
 {
  "t": "RAM: DDR4 vs DDR5, DIMM vs SODIMM, single, dual and multichannel, ECC, virtual RAM",
  "objectives": [
   "Students will be able to compare DDR4 and DDR5 and explain why generations and DIMM versus SODIMM are not interchangeable.",
   "Students will be able to explain single, dual and multichannel memory and identify correct slot placement from a manual excerpt.",
   "Students will be able to describe ECC memory, its requirements and how it differs from DDR5 on-die ECC.",
   "Students will be able to recognize heavy virtual memory use and recommend the correct fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about what makes a computer feel slow and list student answers."
   ],
   [
    15,
    "Teach",
    "Explain RAM as workspace. Compare DDR4 and DDR5, including the notch, PMIC, subchannels and on-die ECC. Show DIMM versus SODIMM images. Draw a four-slot board and shade correct dual-channel pairs. Explain ECC and virtual memory with a Task Manager screenshot."
   ],
   [
    15,
    "Activity",
    "Pairs work through the memory upgrade cases using printed manual excerpts."
   ],
   [
    5,
    "Discuss",
    "Pairs share their purchase orders and slot choices, and the class corrects errors."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your computer gets slow when you open many browser tabs and apps at once. What part of the computer do you think is running out, and what is the computer doing to cope?",
  "activity": {
   "title": "Memory upgrade cases",
   "materials": "Printed case cards (desktop with one DDR4 stick, thin laptop with soldered RAM, gaming PC in single-channel, engineering workstation needing ECC), printed motherboard manual excerpts showing slot labels and supported memory, a projected Task Manager memory screenshot.",
   "steps": [
    "Each pair receives two case cards and the matching manual excerpts.",
    "Pairs identify the supported generation, form factor, maximum capacity and correct slot order from the excerpt.",
    "Pairs write a purchase order: number of modules, capacity each, generation, form factor and whether ECC is required.",
    "Pairs mark on a slot diagram exactly where each module goes and write how they would confirm dual or quad channel after installation.",
    "Pairs swap with another pair, who checks the order against the manual and flags any mistake."
   ]
  },
  "discussion": [
   "Why do you think manufacturers changed the notch position between DDR generations?",
   "When is ECC memory worth the extra cost, and when is it unnecessary?",
   "A user says 'just make the paging file bigger'. How would you explain why that is not a real fix?"
  ],
  "exit": [
   [
    "What memory form factor does a laptop upgrade usually need?",
    "A SODIMM of the generation the laptop supports, unless the memory is soldered."
   ],
   [
    "Two identical modules report single-channel mode. What is the most likely cause?",
    "They are installed in slots that share a channel; move them to the manual's dual-channel slots."
   ],
   [
    "High memory use with constant disk activity indicates what, and what is the fix?",
    "Heavy use of virtual memory (the paging file); add physical RAM."
   ]
  ],
  "differentiation": [
   "Support: Provide a compatibility checklist with four boxes (generation, form factor, speed, capacity) that students tick off from the manual before writing their order.",
   "Extend: Ask fast finishers to explain what registered or buffered memory adds and why servers with many modules use it."
  ]
 },
 {
  "t": "Storage: HDD speeds and form factors, SSD interfaces (SATA, NVMe, M.2 keys), flash drives and cards, RAID 0, 1, 5, 6 and 10",
  "objectives": [
   "Students will be able to compare HDDs and SSDs, including RPM, form factors and SATA versus NVMe interfaces.",
   "Students will be able to identify M.2 sizes and B and M keys and diagnose an undetected M.2 drive.",
   "Students will be able to state the minimum drives, usable capacity and fault tolerance of RAID 0, 1, 5, 6 and 10.",
   "Students will be able to explain why RAID is not a backup and recommend a RAID level for a scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about what happens to files if a drive fails and collect answers."
   ],
   [
    12,
    "Teach",
    "Compare HDD and SSD, then SATA versus NVMe. Draw M.2 keys and decode 2280. Draw each RAID level with colored boxes for data, mirrors and parity, filling in minimum drives, usable capacity and failures survived. Stress that RAID is not a backup."
   ],
   [
    18,
    "Activity",
    "Groups build RAID arrays with sticky notes and solve the client scenarios."
   ],
   [
    5,
    "Discuss",
    "Groups defend their RAID recommendations for the architecture firm scenario."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If the only copy of your school project is on a drive that suddenly starts clicking and then dies, what happens to the project? How could you have prevented the loss?",
  "activity": {
   "title": "Sticky-note RAID",
   "materials": "Sticky notes in three colors (data, mirror copy, parity), whiteboard or desks marked as 'drives', printed client scenario cards with drive counts and sizes, a printed M.2 slot excerpt from a fictional motherboard manual.",
   "steps": [
    "Groups mark four or more 'drives' on their desk or a section of the whiteboard.",
    "For RAID 0, 1, 5, 6 and 10, groups lay out sticky notes to show where data, mirrors and parity go, then remove one or two 'drives' to see whether the data survives.",
    "Groups fill in a table of minimum drives, usable capacity for four 4 TB drives and failures survived for each level.",
    "Groups solve two client scenario cards, recommending a RAID level and a backup plan.",
    "Groups read the M.2 manual excerpt and decide whether a B+M SATA 2280 drive will work in each slot."
   ]
  },
  "discussion": [
   "Why might a technician choose RAID 6 over RAID 5 even though it gives less usable space?",
   "If RAID is not a backup, what is it actually protecting against?",
   "Why do faster SSDs not completely replace HDDs in servers and NAS devices?"
  ],
  "exit": [
   [
    "Five 2 TB drives in RAID 5 give how much usable space, and how many failures can the array survive?",
    "8 TB usable (total minus one drive), surviving one failure."
   ],
   [
    "An M.2 SATA drive is not detected in a new PC. What is the likely cause?",
    "The slot supports only NVMe (PCIe), not SATA."
   ],
   [
    "Which RAID level needs at least four drives and survives any two drive failures?",
    "RAID 6."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed RAID table with the minimum drives already filled in, and a capacity formula card (RAID 1 and 10 half, RAID 5 minus one drive, RAID 6 minus two drives).",
   "Extend: Ask fast finishers to explain why rebuilding a large RAID 5 array is risky and how RAID 6 and backups reduce that risk."
  ]
 },
 {
  "t": "Motherboards: ATX, microATX, Mini-ITX; connectors, headers and expansion slots (PCIe); CPU sockets",
  "objectives": [
   "Students will be able to compare ATX, microATX and Mini-ITX form factors by size, slot count and case compatibility.",
   "Students will be able to identify PCIe slot widths, power connectors and internal headers on a motherboard diagram.",
   "Students will be able to distinguish LGA, PGA and BGA CPU mounting and explain why firmware support matters.",
   "Students will be able to select a motherboard that meets a stated customer need."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a photo of a motherboard and ask students to name as many parts as they can in two minutes. Collect answers on the whiteboard without correcting yet."
   ],
   [
    15,
    "Teach",
    "Walk through the three matches: size to case, socket to CPU, slots and connectors to parts. Draw the three form factors to scale on the board, then label a projected board diagram with PCIe x16 and x1 slots, the 24-pin and CPU power connectors, SATA, M.2 and the front-panel header. Contrast LGA, PGA and BGA."
   ],
   [
    15,
    "Activity",
    "Run the build-matching card activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Ask pairs to share one build where the obvious choice was wrong, and discuss physically x16 but electrically x4 slots and CPU support lists."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Look at this motherboard photo. Which part would you plug a graphics card into, and how do you know?",
  "activity": {
   "title": "Build-matching cards",
   "materials": "Printed customer request cards, printed part cards (three boards of different form factors, cases, CPUs with socket types, expansion cards), whiteboard, projector.",
   "steps": [
    "Give each pair four customer request cards, such as 'smallest PC with one graphics card' or 'video workstation with three cards'.",
    "Pairs choose a case, a board and a CPU from the part cards for each request, checking form factor, slot count and socket.",
    "For each build, pairs write which power connectors and headers they must attach.",
    "Swap with another pair, who checks each build for one compatibility problem and writes a correction.",
    "Review two builds on the projector as a class."
   ]
  },
  "discussion": [
   "Why might a manufacturer wire a full-length slot with only four lanes, and how would you discover it?",
   "When would you recommend a Mini-ITX build to a customer despite its single expansion slot?"
  ],
  "exit": [
   [
    "Which form factor offers the most expansion slots?",
    "ATX, with up to seven."
   ],
   [
    "A CPU has flat pads and the pins are in the socket. What socket type is this?",
    "LGA, land grid array."
   ],
   [
    "The power supply works but the case power button does nothing. What do you check?",
    "The power switch lead on the front-panel header, using the manual's pin diagram."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled motherboard diagram and a one-page table of form factors, slot counts and socket types for students to reference during the activity.",
   "Extend: Ask students to explain how M.2 NVMe drives can share PCIe lanes with other slots and how that affects slot planning in a manual."
  ]
 },
 {
  "t": "Firmware: BIOS/UEFI settings, boot order, passwords, Secure Boot, TPM and HSM, virtualization support, fan and temperature monitoring",
  "objectives": [
   "Students will be able to explain the role of BIOS and UEFI firmware and the POST in the startup process.",
   "Students will be able to match common symptoms to the firmware setting that fixes them, including boot order, VT-x/AMD-V and the CMOS battery.",
   "Students will be able to compare Secure Boot, TPM and HSM and describe what each protects.",
   "Students will be able to distinguish supervisor and user firmware passwords."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers about what happens between pressing the power button and seeing the login screen."
   ],
   [
    15,
    "Teach",
    "Draw the startup timeline on the whiteboard: power, POST, firmware settings, boot order, boot loader, operating system. Add Secure Boot at the boot loader step, TPM beside it, and VT-x/AMD-V and fan monitoring as settings. Contrast TPM and HSM and the two password types."
   ],
   [
    15,
    "Activity",
    "Run the symptom-to-setting ticket sort described below in small groups."
   ],
   [
    5,
    "Discuss",
    "Discuss the BitLocker recovery risk when clearing CMOS and why firmware passwords matter on laptops."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "What do you think the computer is doing during the few seconds between pressing the power button and seeing the Windows logo?",
  "activity": {
   "title": "Firmware ticket sort",
   "materials": "Printed help desk ticket cards (8 to 10 symptoms), printed setting cards (boot order, VT-x/AMD-V, TPM, Secure Boot, CMOS battery, supervisor password, user password, fan curve, HSM), whiteboard. Optionally, project a screenshot of a generic UEFI setup screen.",
   "steps": [
    "Groups receive the ticket cards and setting cards.",
    "Groups pair each ticket with the setting that resolves it and write one sentence explaining why.",
    "Groups flag any ticket where a change could cause a side effect, such as a BitLocker recovery prompt.",
    "Each group presents two tickets; the class challenges any pairing they disagree with.",
    "The teacher reveals the answer key on the projector."
   ]
  },
  "discussion": [
   "Why might an organization require both a supervisor password and a locked boot order on every laptop?",
   "What could go wrong if a technician disables Secure Boot to run a tool and forgets to turn it back on?"
  ],
  "exit": [
   [
    "A VM reports hardware virtualization is unavailable. Which firmware setting do you check?",
    "Intel VT-x or AMD-V (SVM) in the CPU configuration."
   ],
   [
    "Which device protects encryption keys for a single computer and is required by Windows 11?",
    "The TPM, version 2.0."
   ],
   [
    "Which firmware password is needed before the system will boot?",
    "The user or power-on password."
   ]
  ],
  "differentiation": [
   "Support: Give students a two-column cheat sheet listing each firmware setting with a plain-language description and one example symptom.",
   "Extend: Ask students to research and explain why Secure Boot requires UEFI mode and GPT, and what has to change to convert a legacy BIOS installation."
  ]
 },
 {
  "t": "CPUs: x86/x64 vs ARM, cores and threads, integrated graphics; cooling with fans, heat sinks, thermal paste/pads and liquid cooling",
  "objectives": [
   "Students will be able to compare x86, x64 and ARM architectures and explain their effect on software and driver compatibility.",
   "Students will be able to distinguish physical cores from logical threads using Task Manager figures.",
   "Students will be able to explain the role of integrated graphics and when a dedicated card is required.",
   "Students will be able to diagnose overheating symptoms and describe correct heat sink, thermal paste and liquid cooling practice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and have students check their own laptop's System type and core count if available."
   ],
   [
    15,
    "Teach",
    "Explain architectures with a two-column board: x64 versus ARM, with battery life, compatibility and emulation. Project a Task Manager Performance screenshot and decode cores versus logical processors. Sketch the CPU, paste, heat sink and fan stack and explain throttling."
   ],
   [
    15,
    "Activity",
    "Run the recommend-and-troubleshoot role-play described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Ask which scenarios were compatibility problems and which were heat problems, and how the symptoms differed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone and your laptop both run apps. Why can't you just copy an app from one to the other?",
  "activity": {
   "title": "Customer consult role-play",
   "materials": "Printed customer cards (for example, a salesperson wanting battery life, a designer with x64-only drivers, a gamer with shutdowns under load), printed Task Manager and temperature readout excerpts, student laptops with a browser optional.",
   "steps": [
    "Pair students as technician and customer; give the customer a scenario card.",
    "The technician asks questions and reads the provided Task Manager or temperature excerpt to decide on a recommendation or fix.",
    "The technician writes the recommendation and the reason in two sentences.",
    "Partners switch roles with a new card.",
    "Pairs share their most difficult case with the class."
   ]
  },
  "discussion": [
   "When would you still recommend an x64 laptop to a user who values battery life?",
   "Why does a CPU slow itself down rather than simply running until it shuts off?"
  ],
  "exit": [
   [
    "Task Manager shows 6 cores and 12 logical processors. What explains the difference?",
    "Multithreading (Hyper-Threading or SMT) lets each physical core run two threads."
   ],
   [
    "A 32-bit operating system cannot install an application. What is the likely reason?",
    "The application is 64-bit, and a 32-bit operating system cannot run 64-bit software."
   ],
   [
    "A PC shuts down only during demanding tasks after its cooler was removed. What is the first fix?",
    "Clean off the old thermal paste, apply a fresh small amount and reseat the cooler with its fan connected."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of the cooling stack and a short glossary card for architecture, core, thread and throttling.",
   "Extend: Ask students to explain why performance and efficiency cores help battery life and how the operating system decides where to run a task."
  ]
 },
 {
  "t": "Expansion cards: graphics, sound, capture, NIC",
  "objectives": [
   "Students will be able to describe the purpose of graphics, sound, capture and network interface cards.",
   "Students will be able to select the appropriate expansion card for a stated user need.",
   "Students will be able to list the safe installation steps for an expansion card, including ESD protection, power and drivers.",
   "Students will be able to troubleshoot a blank screen or instability after a graphics card upgrade."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for upgrading an existing PC."
   ],
   [
    12,
    "Teach",
    "Introduce each card type with its job, typical slot and a real use case. Emphasize in versus out for capture and graphics cards. Model the installation checklist on the whiteboard, ending with drivers and Device Manager."
   ],
   [
    18,
    "Activity",
    "Run the need-to-card matching and install sequencing activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why a faster NIC may not deliver faster transfers and why PSU wattage matters for graphics upgrades."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you could add one new ability to the computer in front of you without buying a new one, what would it be and how would it connect?",
  "activity": {
   "title": "Upgrade desk",
   "materials": "Printed user request cards, printed card type cards (graphics, sound, capture, NIC, wireless NIC, USB audio interface), printed installation step cards shuffled, sticky notes, whiteboard.",
   "steps": [
    "Groups match six user request cards to the best card type and note the slot and any extra power needed on a sticky note.",
    "Groups receive the shuffled installation step cards and arrange them in the correct order.",
    "The teacher gives each group a troubleshooting card, such as a blank screen or a yellow warning icon in Device Manager, and groups write the likely cause and fix.",
    "Groups post answers on the whiteboard and compare."
   ]
  },
  "discussion": [
   "When is an external USB device a better choice than an internal card?",
   "How would you explain to a customer why their new graphics card also requires a new power supply?"
  ],
  "exit": [
   [
    "Which card would a streamer use to bring a console's HDMI output into the PC?",
    "A capture card."
   ],
   [
    "What two things should you check if a new graphics card gives a blank screen?",
    "That the monitor is connected to the card rather than the motherboard, and that the card's PCIe power connector is attached."
   ],
   [
    "What is the last step after installing any expansion card?",
    "Install the manufacturer's driver and confirm the device in Device Manager without errors."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page chart listing each card type, what it does, its usual slot and a picture of its ports.",
   "Extend: Have students plan a full upgrade for a video production PC, estimating whether the existing PSU and slot layout can support a graphics card, a capture card and a 10-gigabit NIC together."
  ]
 },
 {
  "t": "Power supplies: 110/115 vs 220/240 V input, 3.3/5/12 V output, 24-pin, modular, redundant, wattage rating",
  "objectives": [
   "Students will be able to distinguish PSU input voltages (110/115 and 220/240 V AC) from output rails (3.3, 5 and 12 V DC).",
   "Students will be able to identify the 24-pin, CPU, PCIe, SATA and Molex power connectors and what each powers.",
   "Students will be able to compare non-modular, semi-modular, modular and redundant power supplies.",
   "Students will be able to size a PSU's wattage for a build and troubleshoot power-related symptoms safely."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and discuss what students know about travel adapters and voltage."
   ],
   [
    15,
    "Teach",
    "Draw the flow from wall AC to PSU to DC rails on the whiteboard. Label each rail with the components it feeds. Project photos of each connector. Explain modular types, redundant hot-swap units and wattage headroom. State the safety rule: never open a PSU."
   ],
   [
    15,
    "Activity",
    "Run the PSU label reading and sizing activity described below in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss the three scenarios from the hook and which clue pointed to which cause."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why do travelers sometimes need a converter, not just a plug adapter, when they take a hair dryer overseas?",
  "activity": {
   "title": "Read the label, size the supply",
   "materials": "Printed mock PSU labels (one auto-switching, one with a manual selector), printed build sheets listing component power needs, calculators or student laptops, whiteboard.",
   "steps": [
    "Pairs read each mock PSU label and record its input voltage range, whether it is auto-switching and its wattage.",
    "Pairs total the component power on two build sheets and choose a suitable PSU wattage with headroom.",
    "Pairs decide whether each build benefits from a modular PSU and explain why.",
    "Each pair gets a symptom card (will not start after moving countries, shuts down under load, amber LED on a server) and writes the likely cause and safe next step.",
    "Pairs share answers and the class compares wattage choices."
   ]
  },
  "discussion": [
   "Why might an organization pay more for redundant power supplies on a server but not on desktop PCs?",
   "How would you safely confirm that a PSU is the cause of a no-power problem without opening it?"
  ],
  "exit": [
   [
    "Which rail powers the graphics card and CPU?",
    "The 12 V rail."
   ],
   [
    "What type of PSU lets you attach only the cables you need?",
    "A modular (or semi-modular) PSU."
   ],
   [
    "What happens if a PSU set to 115 V is plugged into 230 V?",
    "It can be destroyed; the selector must match the outlet voltage."
   ]
  ],
  "differentiation": [
   "Support: Provide a connector reference sheet with photos and a simple formula card for adding component wattage and headroom.",
   "Extend: Ask students to explain why efficiency ratings matter for a business running many PCs and how an inefficient PSU affects heat in a small room."
  ]
 },
 {
  "t": "Printers and multifunction devices: setup, drivers, duplex, orientation, tray settings, network and cloud printing, secure print",
  "objectives": [
   "Students will be able to describe the steps to install and connect a printer or MFD locally and on a network.",
   "Students will be able to configure driver defaults including duplex, orientation and tray settings.",
   "Students will be able to explain network printing, cloud printing and secure print and when each is used.",
   "Students will be able to match common printer symptoms to the configuration that fixes them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect stories of printer frustration from students."
   ],
   [
    12,
    "Teach",
    "Walk through setup in order on the whiteboard: unpack, connect, address, driver, defaults, security. Project a sample printer configuration page and point out the IP address and firmware version. Explain print servers, cloud printing and secure print."
   ],
   [
    18,
    "Activity",
    "Run the four-ticket printer help desk activity described below in small groups."
   ],
   [
    5,
    "Discuss",
    "Discuss why MFDs are treated as network computers and which security settings matter most."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of the last time a printer did not work for you. What do you think actually went wrong?",
  "activity": {
   "title": "Printer help desk",
   "materials": "Printed ticket cards (garbled output, printer disappears, paper size prompt, confidential document left in tray, phone user wants to print remotely), a printed mock configuration page, sticky notes, whiteboard. Optionally, student laptops to browse their own operating system's printer settings.",
   "steps": [
    "Groups receive five ticket cards and a mock configuration page.",
    "For each ticket, groups write the likely cause and the setting or change that fixes it on a sticky note.",
    "Groups use the mock configuration page to answer one question, such as whether the printer has a duplex unit or what its IP address is.",
    "Groups post sticky notes under each ticket on the whiteboard and compare answers.",
    "The teacher confirms answers and adds the security hardening steps."
   ]
  },
  "discussion": [
   "What are the trade-offs between an on-site print server and cloud print management for a small office?",
   "Why might staff resist secure print, and how would you explain its value?"
  ],
  "exit": [
   [
    "A printer's output is full of random symbols. What is the most likely fix?",
    "Install the correct driver for the printer model and operating system."
   ],
   [
    "Which feature holds a job until the user authenticates at the device?",
    "Secure print, also called pull printing or print release."
   ],
   [
    "Why give a network printer a DHCP reservation?",
    "So its IP address never changes and computers can always find it."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed setup checklist and a symptom-to-setting reference table for students to use during the activity.",
   "Extend: Ask students to list five MFD hardening steps and explain the risk each one reduces, including stored jobs on the internal drive."
  ]
 },
 {
  "t": "Printer types and consumables: laser imaging process and maintenance kits, inkjet, thermal, impact, 3-D printers",
  "objectives": [
   "Students will be able to sequence the seven steps of the laser imaging process and explain what happens at each.",
   "Students will be able to compare laser, inkjet, thermal, impact and 3-D printers by consumables, strengths and maintenance.",
   "Students will be able to recommend a printer type for a stated business need.",
   "Students will be able to relate common print defects to the component or maintenance task that fixes them."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show three printed samples or photos (a receipt, a laser page, a carbon form) and ask the warm-up question."
   ],
   [
    15,
    "Teach",
    "Draw the laser drum on the whiteboard and walk around it step by step, adding each component. Introduce the mnemonic. Then summarize inkjet, thermal, impact and 3-D printers in a comparison table of consumables and maintenance."
   ],
   [
    15,
    "Activity",
    "Run the human laser printer and printer-match activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the defect clues: smearing, repeating marks, fading receipts, streaks."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here are a receipt, an office printout and a carbon copy form. Do you think the same kind of printer made all three? How can you tell?",
  "activity": {
   "title": "Human laser printer",
   "materials": "Seven printed step cards (processing to cleaning), printed scenario cards for printer selection, a sheet of paper as the 'page', whiteboard.",
   "steps": [
    "Shuffle the seven step cards and hand them to seven volunteers, who must line up in the correct order without help from the teacher.",
    "Each volunteer explains their step in one sentence as the 'page' is passed down the line.",
    "The rest of the class corrects any errors and names the component involved at each step.",
    "In pairs, students then receive scenario cards (durable labels, receipts, carbon forms, color photos, a replacement plastic part) and choose a printer type with its consumable.",
    "Pairs share answers and justify each choice."
   ]
  },
  "discussion": [
   "Why does a business still buy dot matrix printers when laser printers are faster and quieter?",
   "How would you decide between replacing a toner cartridge and installing a maintenance kit when print quality drops?"
  ],
  "exit": [
   [
    "Which laser step uses heat and pressure?",
    "Fusing."
   ],
   [
    "Which printer type must be used for multipart carbon forms?",
    "An impact printer, such as dot matrix."
   ],
   [
    "An inkjet prints with streaks and missing colors. What do you do first?",
    "Run the head cleaning routine."
   ]
  ],
  "differentiation": [
   "Support: Provide a drum diagram with blank labels for students to fill in, and a printed comparison table of printer types and consumables.",
   "Extend: Ask students to predict which laser step or component causes a repeating mark, ghost images and blank pages, and explain their reasoning."
  ]
 },
 {
  "t": "Virtualization purposes: sandbox, test/development, application virtualization, legacy software and operating systems",
  "objectives": [
   "Students will be able to define host, guest, hypervisor and virtual machine.",
   "Students will be able to explain the purposes of sandboxes, test/development environments, application virtualization and legacy VMs.",
   "Students will be able to match a business goal to the appropriate virtualization purpose.",
   "Students will be able to identify the security precautions each purpose requires."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect student answers to the idea of a safe practice space."
   ],
   [
    12,
    "Teach",
    "Draw a host with three VMs on the whiteboard and label host, guest and hypervisor. Add four labels around it: sandbox, test/development, application virtualization and legacy. For each, give the goal, an example and the key precaution."
   ],
   [
    18,
    "Activity",
    "Run the goal-to-purpose card sort and precaution challenge described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why snapshots are not backups and why a legacy VM still needs isolation."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you could try anything on a computer and then press a button to undo it completely, what would you use that for?",
  "activity": {
   "title": "Which virtualization fits",
   "materials": "Printed goal cards (12 short scenarios), four category cards (sandbox, test/development, application virtualization, legacy), sticky notes, whiteboard.",
   "steps": [
    "Groups sort the twelve goal cards under the four category cards.",
    "For each category, groups write one security precaution on a sticky note, such as disabling shared folders or isolating the network.",
    "Groups swap tables and check another group's sort, marking any card they would move.",
    "The class reviews disputed cards together and agrees on the best fit."
   ]
  },
  "discussion": [
   "What risks remain when a business keeps an unsupported operating system running in a VM, and how long is that acceptable?",
   "Why might an IT team prefer application virtualization over installing software on every PC?"
  ],
  "exit": [
   [
    "Which virtualization purpose fits safely opening a suspicious attachment?",
    "A sandbox."
   ],
   [
    "How does application virtualization differ from a full VM?",
    "It isolates a single application rather than running a whole guest operating system."
   ],
   [
    "What precaution should a legacy operating system VM have?",
    "It should be isolated from the internet and other systems because it receives no security updates."
   ]
  ],
  "differentiation": [
   "Support: Provide a four-box graphic organizer with each purpose, its goal, an example and its precaution partly filled in.",
   "Extend: Ask students to design a small test lab for a patch rollout, naming the VMs, the snapshot plan and how they would document the rollback step for change management."
  ]
 },
 {
  "t": "Hypervisors: Type 1 (bare metal) vs Type 2 (hosted)",
  "objectives": [
   "Students will be able to distinguish Type 1 (bare metal) and Type 2 (hosted) hypervisors by where they run.",
   "Students will be able to classify common hypervisor products, including the special case of Hyper-V.",
   "Students will be able to recommend the appropriate hypervisor type for a given scenario.",
   "Students will be able to explain why both types require VT-x or AMD-V enabled in firmware."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student answers as layers on the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw two layer diagrams side by side: hardware, hypervisor, VMs for Type 1; hardware, host operating system, hypervisor, VMs for Type 2. Place product names on each. Explain the Hyper-V partition model with a third diagram, and mention the firmware requirement."
   ],
   [
    18,
    "Activity",
    "Run the layer-stack build and scenario recommendation activity described below."
   ],
   [
    5,
    "Discuss",
    "Discuss why a Type 2 VM stops during host updates and why Hyper-V is Type 1."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you wanted to run Linux and Windows on the same laptop at the same time, what would need to sit between the hardware and the two operating systems?",
  "activity": {
   "title": "Stack it and pick it",
   "materials": "Printed layer cards (hardware, host operating system, hypervisor, VM, guest operating system), printed product cards (ESXi, Hyper-V, KVM, Xen, VirtualBox, VMware Workstation, Parallels), printed scenario cards, whiteboard.",
   "steps": [
    "Pairs build a Type 1 stack and a Type 2 stack from the layer cards on their desks.",
    "Pairs place each product card next to the stack it belongs to, then check against the teacher's projected answer.",
    "Each pair draws three scenario cards (for example, a classroom of student laptops, a hospital's server consolidation, a Mac user needing one Windows app) and writes the hypervisor type and a one-sentence reason.",
    "Pairs present one scenario each and the class votes on whether they agree."
   ]
  },
  "discussion": [
   "Why might a small business choose a Type 2 hypervisor for a server even though Type 1 is recommended, and what risks does that bring?",
   "How does a hypervisor's control over every guest make it a security priority?"
  ],
  "exit": [
   [
    "Where is a Type 1 hypervisor installed?",
    "Directly on the physical hardware, with no general-purpose host operating system underneath."
   ],
   [
    "Name one Type 2 hypervisor.",
    "Oracle VirtualBox, VMware Workstation, VMware Fusion or Parallels Desktop."
   ],
   [
    "Is Hyper-V a Type 1 or Type 2 hypervisor?",
    "Type 1, because it runs beneath Windows, which becomes a privileged partition."
   ]
  ],
  "differentiation": [
   "Support: Provide the two layer diagrams pre-drawn with blanks to fill in, plus a product list sorted by type.",
   "Extend: Ask students to compare a hypervisor with a container engine using a third layer diagram and explain where the kernel is in each."
  ]
 },
 {
  "t": "Resource requirements for VMs: CPU virtualization support, RAM, storage, network (NAT, bridged, internal)",
  "objectives": [
   "Students will be able to identify the CPU features (VT-x/AMD-V, SLAT) a host needs to run VMs.",
   "Students will be able to plan vCPU, RAM and storage allocations that leave adequate headroom for the host.",
   "Students will be able to compare fixed-size and dynamically expanding virtual disks.",
   "Students will be able to choose NAT, bridged or internal networking for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about sharing one pizza among several people and relate it to host resources."
   ],
   [
    12,
    "Teach",
    "Draw a host box with CPU, RAM, disk and network, then carve out allocations for three VMs, leaving a slice for the host. Explain overcommitment and paging. Draw the three network modes as diagrams showing which arrows are allowed."
   ],
   [
    18,
    "Activity",
    "Run the host-planning worksheet and network mode challenge described below."
   ],
   [
    5,
    "Discuss",
    "Discuss the hook scenario: why a lab DHCP server on a bridged network causes trouble for others."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If one pizza has to feed you and three friends, what happens if you promise each friend half the pizza?",
  "activity": {
   "title": "Plan the host",
   "materials": "Printed host specification cards (for example, 16 GB RAM quad-core laptop, 64 GB RAM eight-core server), printed VM request lists, printed network scenario cards, calculators or student laptops, whiteboard.",
   "steps": [
    "Pairs receive one host card and a list of VMs that must run at the same time.",
    "Pairs allocate vCPUs, RAM and disk type to each VM and show that the host keeps headroom.",
    "Pairs choose NAT, bridged or internal for each VM based on its scenario card and draw the connections.",
    "Pairs swap plans with another pair, who looks for one overcommitment or network risk.",
    "Two pairs present their plans on the projector or whiteboard."
   ]
  },
  "discussion": [
   "When is it reasonable to overcommit vCPUs but risky to overcommit RAM?",
   "Why might a technician add a NAT adapter to a lab VM only temporarily?"
  ],
  "exit": [
   [
    "Which network mode gives a VM its own IP address on the LAN?",
    "Bridged."
   ],
   [
    "What CPU feature must be enabled in firmware before VMs can run?",
    "Hardware virtualization: Intel VT-x or AMD-V."
   ],
   [
    "Why can dynamically expanding disks be risky?",
    "They grow as data is written and can fill the host drive unexpectedly."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in planning table with columns for vCPU, RAM, disk type and network mode, and a diagram card of the three network modes.",
   "Extend: Ask students to explain host-only networking and design a two-VM lab that has internet access for updates on one VM but keeps lab traffic private."
  ]
 },
 {
  "t": "Security for VMs: isolation, snapshots, patching guests",
  "objectives": [
   "Students will be able to explain how hypervisor isolation protects VMs and what a VM escape is.",
   "Students will be able to distinguish snapshots from backups and describe correct snapshot use.",
   "Students will be able to describe patching requirements for guests, templates, powered-off VMs and the hypervisor.",
   "Students will be able to recommend controls for VM sprawl and for VMs that handle untrusted content."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record answers in two columns: safe because virtual, not safe."
   ],
   [
    12,
    "Teach",
    "Draw a host with several VMs and mark the layers to protect: hypervisor, isolation settings, guest. Explain VM escape, shared features, network modes, snapshots versus backups, guest and template patching, and VM sprawl."
   ],
   [
    18,
    "Activity",
    "Run the VM inventory audit described below in small groups."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up columns and move any answers students now see differently."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "True or false, and why: if malware runs inside a virtual machine, your real computer is always safe.",
  "activity": {
   "title": "Hypervisor audit",
   "materials": "A printed mock VM inventory listing 12 VMs with owner, last patch date, network mode, power state, snapshot age and shared features; highlighters; sticky notes; whiteboard.",
   "steps": [
    "Groups receive the mock inventory and highlight every risk they find, such as an unpatched template, a year-old snapshot or a test VM bridged to production.",
    "For each risk, groups write the fix on a sticky note.",
    "Groups rank their top three risks by severity and justify the order.",
    "Each group posts its top risk on the whiteboard and the class compares rankings.",
    "The teacher summarizes with a short policy: inventory, owners, patching schedule, snapshot cleanup and backups."
   ]
  },
  "discussion": [
   "Why does a hypervisor flaw matter more than a flaw in a single guest?",
   "How would you persuade a team that likes keeping old snapshots that they need a separate backup?"
  ],
  "exit": [
   [
    "What is the difference between a snapshot and a backup?",
    "A snapshot is a short-term rollback point that depends on the original disk; a backup is an independent copy used for recovery."
   ],
   [
    "Name two VM features to disable when handling untrusted files.",
    "Shared clipboard and shared folders (also drag-and-drop)."
   ],
   [
    "What should you do when powering on a VM that has been off for months?",
    "Patch it immediately, ideally before connecting it to the production network."
   ]
  ],
  "differentiation": [
   "Support: Provide a checklist card of VM security controls for students to compare against the mock inventory.",
   "Extend: Ask students to write a one-page VM lifecycle policy covering creation, ownership, patching, snapshot retention and decommissioning."
  ]
 },
 {
  "t": "Containers vs virtual machines",
  "objectives": [
   "Students will be able to explain the architectural difference between containers and virtual machines, including the role of the kernel.",
   "Students will be able to compare containers and VMs on size, startup time, isolation and operating system flexibility.",
   "Students will be able to distinguish a container image from a running container and describe the role of orchestration.",
   "Students will be able to choose containers, VMs or both for a given workload."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the 'it works on my machine' problem."
   ],
   [
    12,
    "Teach",
    "Draw two stacks side by side: hardware, hypervisor, VMs each with guest operating system and app; and hardware, host operating system and kernel, container engine, containers with apps. Highlight the shared kernel. Explain images, registries, microservices and orchestration, and when to combine both."
   ],
   [
    18,
    "Activity",
    "Run the house or apartment workload sort described below."
   ],
   [
    5,
    "Discuss",
    "Discuss isolation trade-offs and why cloud providers run containers inside VMs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A program runs perfectly on a developer's laptop but crashes on the server. What could be different between the two computers?",
  "activity": {
   "title": "House or apartment",
   "materials": "Printed workload cards (for example, a scalable web API, a legacy Windows desktop app, a malware analysis environment, a microservice-based shop, a full Linux desktop for training), two large labels reading 'VM' and 'Container', a third label reading 'Both', sticky notes, whiteboard.",
   "steps": [
    "Groups sort the workload cards under VM, Container or Both.",
    "For each card, groups write the deciding factor on a sticky note: operating system needed, isolation, startup speed or scaling.",
    "Groups compare with a neighboring group and resolve disagreements.",
    "The class reviews the 'Both' column and the teacher explains containers running inside VMs.",
    "Each student writes one sentence completing: 'I would choose a container when...'"
   ]
  },
  "discussion": [
   "Why might an organization keep some workloads in VMs even after adopting containers?",
   "What does rebuilding an image instead of patching a running container change about how teams handle updates?"
  ],
  "exit": [
   [
    "What do all containers on a host share?",
    "The host operating system's kernel."
   ],
   [
    "Which provides stronger isolation, a container or a VM?",
    "A VM, because each has its own full operating system and kernel."
   ],
   [
    "What is the difference between a container image and a container?",
    "The image is a read-only template; a container is a running instance created from it."
   ]
  ],
  "differentiation": [
   "Support: Provide the two stack diagrams pre-drawn with labels, plus a comparison table of size, startup, isolation and operating system.",
   "Extend: Ask students to explain why Linux containers on a Windows or macOS desktop usually run inside a lightweight VM, and what that says about the kernel requirement."
  ]
 },
 {
  "t": "Virtual desktop infrastructure (VDI) and desktop as a service",
  "objectives": [
   "Students will be able to explain how VDI delivers a desktop from a data center, naming the roles of the hypervisor, connection broker and client.",
   "Students will be able to compare persistent and non-persistent virtual desktops and choose the right one for a scenario.",
   "Students will be able to distinguish on-premises VDI from DaaS and from SaaS.",
   "Students will be able to list the main benefits and drawbacks of virtual desktops, including the network dependency."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about a lost laptop. Collect three or four answers on the whiteboard and circle any that mention where the data lives."
   ],
   [
    12,
    "Teach",
    "Draw the VDI path on the board: thin client, network, connection broker, hypervisor host with desktop VMs. Explain that only input and screen images cross the network. Then contrast persistent and non-persistent desktops, and finish by redrawing the picture with the servers inside a cloud provider's box to show DaaS."
   ],
   [
    18,
    "Activity",
    "Run the 'Desktop matchmaker' card activity in small groups, then have each group defend one choice to the class."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to surface the network dependency and the shared-responsibility idea behind DaaS."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "A sales rep leaves a company laptop in a taxi. What would have to be true about how that laptop was set up for the company not to worry about its data?",
  "activity": {
   "title": "Desktop matchmaker",
   "materials": "Printed scenario cards (eight organizations, one per card), a whiteboard divided into four columns labeled 'Persistent VDI', 'Non-persistent VDI', 'Persistent DaaS', 'Non-persistent DaaS', and sticky notes.",
   "steps": [
    "Give each group of three or four students a set of scenario cards, such as a call center with shared desks, a software developer who installs tools, a seasonal tax firm with no servers, a hospital ward and a school computer lab.",
    "Groups decide two things for each card: who should host the desktops (the organization or a cloud provider) and whether desktops should be persistent or non-persistent. They write one reason on a sticky note.",
    "Groups place their cards in the matching whiteboard column with the sticky note attached.",
    "Each group picks one card it argued about and explains its choice; the class challenges or agrees.",
    "Close by adding one drawback per column, for example 'needs reliable network' and 'many users down if servers fail'."
   ]
  },
  "discussion": [
   "If a non-persistent desktop discards every change, how do users keep their documents and browser bookmarks?",
   "When would the per-user monthly cost of DaaS become more expensive than running VDI yourself, and what besides money should drive the decision?"
  ],
  "exit": [
   [
    "Which VDI component authenticates the user and sends them to the right virtual desktop?",
    "The connection broker."
   ],
   [
    "A desktop returns to a clean image at every logoff. What type of desktop is it?",
    "Non-persistent."
   ],
   [
    "A company pays a cloud provider per user per month for full Windows desktops. Is this VDI, DaaS or SaaS?",
    "DaaS, because a provider hosts entire desktops as a subscription service."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column cheat card (who runs the servers; does it keep changes) and let them sort only four scenario cards, with the hosting choice already filled in.",
   "Extend: Ask fast finishers to write a short troubleshooting script for a help desk agent whose remote user reports 'my virtual desktop is laggy', ordering checks from the user's connection to the server side."
  ]
 },
 {
  "t": "Cloud deployment models: public, private, hybrid, community",
  "objectives": [
   "Students will be able to define the public, private, hybrid and community cloud deployment models.",
   "Students will be able to identify the deployment model described in a scenario using the questions of who owns, who uses and whether models are combined.",
   "Students will be able to compare the cost, control and complexity trade-offs of each model.",
   "Students will be able to distinguish deployment models from service models."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers. Point out that some answers describe ownership and some describe what is managed, and say today's lesson is about ownership and sharing."
   ],
   [
    12,
    "Teach",
    "Draw a two-by-two grid on the board: 'one organization' versus 'many', and 'one model' versus 'combined'. Place private, public, community and hybrid in the grid while explaining each with an example. Write the three scenario questions in a corner of the board for students to reuse."
   ],
   [
    18,
    "Activity",
    "Run the 'Who shares the cloud?' scenario sort in pairs, followed by a quick whole-class check."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why a public cloud is not inherently less secure and when hybrid complexity is worth it."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "When people say 'we moved to the cloud', what are two different things they might mean?",
  "activity": {
   "title": "Who shares the cloud?",
   "materials": "Twelve printed scenario cards (three per model, plus two 'service model' distractor cards), four labeled areas on the whiteboard, and tape or sticky notes.",
   "steps": [
    "Pairs receive a shuffled deck of scenario cards, such as 'Five universities share a research cloud', 'A startup rents servers by the hour', 'A bank keeps data in-house but runs its app in Azure' and 'A provider hosts dedicated hardware for one insurer'.",
    "For each card, pairs answer the three questions in writing: who owns the hardware, who uses it, are models combined. Then they choose public, private, hybrid or community.",
    "Pairs tape their cards to the matching area of the whiteboard. Distractor cards that describe only a service model go in a 'Not a deployment model' pile.",
    "The teacher reviews any card placed in two different areas by different pairs and asks each pair to justify its choice.",
    "Pairs finish by writing one advantage and one drawback for each model on a sticky note."
   ]
  },
  "discussion": [
   "Why might a regulated organization still choose public cloud for some systems, and what would it need to check first?",
   "Hybrid cloud gives flexibility but adds complexity. What kinds of problems could a help desk technician see because a company runs two environments?"
  ],
  "exit": [
   [
    "Several government agencies share infrastructure built to the same security standard. Which model is this?",
    "Community cloud."
   ],
   [
    "A company runs workloads on premises and sends overflow to a public provider during peaks. Name the model and the practice.",
    "Hybrid cloud, using cloud bursting."
   ],
   [
    "Is SaaS a deployment model? Explain briefly.",
    "No. SaaS is a service model describing what the provider manages; deployment models describe who owns and shares the infrastructure."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with the grid from the teaching segment and let students sort only the six clearest scenarios first before attempting the rest.",
   "Extend: Ask fast finishers to design a cloud plan for a fictional hospital network that uses at least two deployment models, and justify which systems go where."
  ]
 },
 {
  "t": "Cloud service models: IaaS, PaaS, SaaS",
  "objectives": [
   "Students will be able to describe IaaS, PaaS and SaaS in terms of which layers of the stack the provider manages.",
   "Students will be able to classify real-world cloud offerings and scenarios into the correct service model.",
   "Students will be able to explain the shared responsibility model and identify customer duties in each service model.",
   "Students will be able to choose an appropriate service model for a business need and justify the trade-off between control and effort."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Take quick answers and note that the answer depends on what was rented."
   ],
   [
    12,
    "Teach",
    "Draw a stack of layers on the board from facility to data. Draw three columns beside it and shade the provider-managed layers for IaaS, PaaS and SaaS. Highlight that 'data and user access' is never shaded, then walk through one example product per column."
   ],
   [
    18,
    "Activity",
    "Run the 'Who patches this?' responsibility card sort in groups of three."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions, linking customer misconfiguration to the shared responsibility model."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If a company's cloud server gets hacked because it was never updated, whose fault is it: the cloud provider's or the company's? What would you need to know to decide?",
  "activity": {
   "title": "Who patches this?",
   "materials": "Printed responsibility cards (for example 'replace a failed disk', 'patch the operating system', 'update the web server software', 'fix a bug in the app code', 'turn on MFA for users', 'decide who can see a file'), a three-column grid drawn on paper or the whiteboard for IaaS, PaaS and SaaS, and two colors of sticky notes.",
   "steps": [
    "Give each group the deck of responsibility cards and the three-column grid.",
    "For each column, groups mark each card with a provider-colored or customer-colored sticky note to show who owns that task in that model.",
    "Groups compare their grid to the stack diagram on the board and fix any mismatches.",
    "Each group writes one sentence explaining which tasks stayed with the customer in all three columns and why.",
    "The teacher calls on groups to share, confirming that data and user access always remain with the customer."
   ]
  },
  "discussion": [
   "Why do so many cloud security incidents come from customer settings rather than provider failures?",
   "A company moves from IaaS to PaaS for its web app. What work disappears for IT, and what new limits might frustrate developers?"
  ],
  "exit": [
   [
    "Which service model requires the customer to patch the guest operating system?",
    "IaaS."
   ],
   [
    "A team wants to upload code and let the provider manage the runtime and operating system. Which model fits?",
    "PaaS."
   ],
   [
    "Name one responsibility the customer keeps even with SaaS.",
    "Managing user accounts and access, enforcing strong authentication, or protecting and controlling sharing of its data."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-shaded layer diagram and have them match only six product examples to columns before doing the full responsibility sort.",
   "Extend: Ask fast finishers to pick a fictional small business and write a one-paragraph cloud plan that uses all three models, listing the customer's responsibilities for each."
  ]
 },
 {
  "t": "Cloud characteristics: shared vs dedicated resources, metered utilization, rapid elasticity, high availability, multitenancy, file synchronization",
  "objectives": [
   "Students will be able to define shared versus dedicated resources, metered utilization, rapid elasticity, high availability, multitenancy and file synchronization.",
   "Students will be able to identify which characteristic a scenario describes from its observable behavior.",
   "Students will be able to explain why file synchronization is not a backup and why high availability requires customer design.",
   "Students will be able to recommend dedicated resources or budget controls for a given business situation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the electric bill and the restaurant. Connect the answers to metering and elasticity."
   ],
   [
    12,
    "Teach",
    "Project or draw a simple cloud dashboard: a server-count graph rising and falling, a bill broken down by hour, two availability zones and a sync folder icon. Walk through each characteristic by pointing to the part of the picture that shows it."
   ],
   [
    18,
    "Activity",
    "Run the 'Name that characteristic' relay with scenario cards in teams."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to address the sync-versus-backup misconception and the cost risk of metering."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your home electric bill goes up in a heat wave and down in spring. What is good about paying that way, and what is risky about it?",
  "activity": {
   "title": "Name that characteristic",
   "materials": "Eighteen printed scenario cards (three per characteristic), six labeled sheets of paper taped around the room, and a whiteboard for team scores.",
   "steps": [
    "Split the class into teams and stack the shuffled scenario cards face down at the front.",
    "One student per team draws a card, reads it to the team, and the team agrees on the characteristic within thirty seconds.",
    "The runner tapes the card to the matching labeled sheet and the next teammate draws. Teams earn a point per correct placement.",
    "After all cards are placed, the teacher reviews each sheet and moves any misplaced cards, asking the class to explain why.",
    "Teams finish by writing one 'trap' for each sheet, such as 'sync is not a backup', on a sticky note attached to it."
   ]
  },
  "discussion": [
   "If a cloud service promises high availability in its SLA, why might your application still go down?",
   "Metered billing lets a startup begin cheaply. What habits should an IT team build so the bill does not surprise them?"
  ],
  "exit": [
   [
    "A service automatically adds servers during a traffic spike and removes them later. Which characteristic is this?",
    "Rapid elasticity."
   ],
   [
    "Why is file synchronization not a backup?",
    "Deletions, corruption and ransomware encryption sync to every device, so there is no separate unaffected copy."
   ],
   [
    "Name one reason to choose dedicated over shared resources.",
    "Licensing tied to physical hardware, compliance requirements or extra isolation."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-line definition card for each characteristic with a key verb highlighted (scales, bills, survives, shares, reserves, syncs) to use during the relay.",
   "Extend: Ask fast finishers to sketch a highly available design for a fictional web store using two availability zones and a load balancer, and identify which characteristics their design uses."
  ]
 },
 {
  "t": "The CompTIA troubleshooting methodology: identify (question users, back up, check recent changes), theorize, test, plan, implement, verify, document",
  "objectives": [
   "Students will be able to list the six steps of the CompTIA troubleshooting methodology in order.",
   "Students will be able to identify which step a described technician action belongs to.",
   "Students will be able to explain why backups, policy checks and questioning about recent changes belong in the first step.",
   "Students will be able to apply the methodology to a help desk scenario, including escalation when a theory fails."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students what the technician did wrong. List their answers without correcting them yet."
   ],
   [
    10,
    "Teach",
    "Write the six steps vertically on the board. For each, give one sentence of what the technician says or does, emphasizing backup and recent changes in step 1, the new-theory-or-escalate loop in step 3, and documentation as the final step. Introduce the mnemonic."
   ],
   [
    20,
    "Activity",
    "Run the 'Help desk role-play' in groups of three: user, technician and observer."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up list and match each mistake to the step that was skipped. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "A technician hears 'my computer is slow' and immediately reinstalls Windows, wiping the user's unsaved files. What should have happened first?",
  "activity": {
   "title": "Help desk role-play",
   "materials": "Printed role cards: user cards with a hidden cause and the answers to likely questions, technician cards listing the six steps, and observer checklists with a box per step. Whiteboard for debrief.",
   "steps": [
    "Form groups of three and hand out one scenario set per group, such as a PC with no network after a desk move or a printer printing blank pages after a toner change.",
    "The technician questions the user and talks through each step aloud. The user answers only what is asked, using the card.",
    "The observer ticks each step on the checklist as it happens and notes any step done out of order or skipped, especially backup and verification.",
    "Rotate roles twice with new scenarios so every student plays technician once.",
    "Each group reports one step it found easy to forget, and the teacher writes them on the board for the debrief."
   ]
  },
  "discussion": [
   "Why might a technician be tempted to skip verification or documentation when the help desk queue is long, and what does that cost later?",
   "When is the right moment to escalate, and what information should you hand over so the next person does not start from zero?"
  ],
  "exit": [
   [
    "Put these in order: test the theory, document findings, identify the problem, verify functionality.",
    "Identify the problem, test the theory, verify functionality, document findings."
   ],
   [
    "Your tested theory turns out to be wrong. What are your two options?",
    "Establish a new theory and test it, or escalate."
   ],
   [
    "In which step do you ask the user about recent changes and back up their data?",
    "Step 1, identify the problem."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a step card with each step's key question (What changed? What is the obvious cause? Did the test prove it? What is the impact? Does everything work? Did I write it down?) to hold during the role-play.",
   "Extend: Ask fast finishers to write their own role-play scenario with a misleading first symptom, so the technician must reject the first theory and form a second one."
  ]
 },
 {
  "t": "Motherboard, RAM, CPU and power problems: POST beeps, no power, overheating shutdowns, blue screens, burning smell, swollen capacitors, date/time resets",
  "objectives": [
   "Students will be able to match common symptoms (beep codes, no power, shutdowns under load, blue screens, burning smell, swollen capacitors, clock resets) to their likely causes.",
   "Students will be able to choose the first troubleshooting action for each symptom, starting with the simplest likely cause.",
   "Students will be able to identify which symptoms are safety hazards requiring immediate power-off.",
   "Students will be able to explain why beep codes must be looked up in vendor documentation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect guesses and note that the PC is 'talking' through symptoms."
   ],
   [
    12,
    "Teach",
    "Draw a simple PC on the board with labels for PSU, motherboard, CPU, RAM and CMOS battery. Walk through each symptom, tapping the part it points to. Project or describe photos of normal and swollen capacitors. Stress the burning-smell rule."
   ],
   [
    18,
    "Activity",
    "Run the 'Symptom triage desk' card activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare driver-caused and hardware-caused blue screens and to rank tickets by urgency."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A computer cannot show you an error message if the screen is not working yet. How else could it tell you something is wrong?",
  "activity": {
   "title": "Symptom triage desk",
   "materials": "Printed ticket cards (ten tickets, each describing one symptom in a user's words), printed 'evidence' cards with follow-up details the teacher hands out on request, and a whiteboard with columns for 'Urgent', 'Today' and 'Can wait'.",
   "steps": [
    "Give each group a stack of ticket cards, for example 'It beeps and the screen stays black', 'It turned off while my son was gaming', 'It smelled like burning plastic', 'The clock is wrong every Monday'.",
    "Groups sort the tickets by urgency on the whiteboard, placing burning smell and swollen capacitors in 'Urgent' with a reason.",
    "For each ticket, groups write the likely cause and their first action. They may request one evidence card per ticket from the teacher, such as 'Event Viewer shows a new display driver installed yesterday'.",
    "Groups revise their answer if the evidence changes their theory.",
    "Each group presents one ticket where the evidence changed their mind, and the class discusses."
   ]
  },
  "discussion": [
   "Two PCs show the same blue screen. One started after a driver update and one has no recent changes. How would your first steps differ?",
   "Why is replacing an expensive part first usually a poor troubleshooting choice, even when it would probably fix the problem?"
  ],
  "exit": [
   [
    "A PC's clock resets to a default date whenever it is unplugged. What is the fix?",
    "Replace the CMOS battery."
   ],
   [
    "A PC turns off only during heavy workloads. Name two likely causes.",
    "Overheating (dust, failed fan, dried thermal paste, blocked vents) or a failing or undersized PSU."
   ],
   [
    "What is your first action if a PC gives off a burning smell?",
    "Power it off and unplug it immediately."
   ]
  ],
  "differentiation": [
   "Support: Provide a symptom-to-cause reference table with blanks for the first action, so struggling students focus on choosing actions rather than recalling causes.",
   "Extend: Ask fast finishers to write a step-by-step isolation plan for a PC that powers on with fans spinning but shows no display and no beeps, ordering steps from cheapest to most expensive."
  ]
 },
 {
  "t": "Storage problems: clicking or grinding noises, S.M.A.R.T. warnings, bootable device not found, slow performance, degraded or failed RAID",
  "objectives": [
   "Students will be able to explain why backing up is the first action when a drive shows signs of failure.",
   "Students will be able to interpret clicking noises, S.M.A.R.T. warnings, boot device errors and slow performance and choose the next step for each.",
   "Students will be able to distinguish a degraded RAID array from a failed one and describe the recovery for each.",
   "Students will be able to explain why RAID and SSD optimization differ from backups and defragmentation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about warning lights. Steer answers toward 'the warning is a chance to act before the breakdown'."
   ],
   [
    12,
    "Teach",
    "Sketch an HDD (platters and heads) next to an SSD (chips) on the board. Cover each symptom in turn, writing 'BACK UP FIRST' at the top of the board. Draw a RAID 5 set of four drives, cross one out to show degraded, cross a second out to show failed."
   ],
   [
    18,
    "Activity",
    "Run the 'Read the drive report' pair exercise with printed S.M.A.R.T. summaries and console messages."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about RAID versus backup and the temptation to restart."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your car's dashboard shows an engine warning light, but the car still drives fine. What should you do, and what happens if you ignore it?",
  "activity": {
   "title": "Read the drive report",
   "materials": "Printed handouts the teacher prepares: four mock S.M.A.R.T. summaries (good, caution with rising reallocated sectors, bad, and an SSD with high wear), two mock RAID console messages (degraded RAID 5, failed RAID 0) and two boot error screens. Pens and a whiteboard.",
   "steps": [
    "Pairs receive the handout set and read each item.",
    "For each item, pairs write the status in plain words, the risk to data and the first action they would take.",
    "Pairs rank the items by urgency and note which need a backup before anything else.",
    "The teacher reveals the expected answers on the board, and pairs mark their own work.",
    "Each pair writes one sentence a technician could say to a non-technical user explaining the most urgent item."
   ]
  },
  "discussion": [
   "A manager says the server has RAID, so the company does not need backups. How would you respond?",
   "Why might restarting a computer with a failing hard drive make things worse rather than better?"
  ],
  "exit": [
   [
    "A hard drive is clicking repeatedly. What do you do first?",
    "Back up the data immediately, then replace the drive."
   ],
   [
    "What is the difference between a degraded and a failed RAID array?",
    "Degraded still works without redundancy and can be rebuilt after replacing the drive; failed has lost more drives than it tolerates and must be restored from backup."
   ],
   [
    "A PC reports no boot device and a flash drive is plugged in. What is the first fix to try?",
    "Remove the flash drive or set the internal drive first in the boot order."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a symptom card with three choices of first action for each item on the handout, so they practice selection before writing answers from scratch.",
   "Extend: Ask fast finishers to compare RAID 1, 5 and 10 in a short table showing how many drive failures each tolerates and what happens during a rebuild."
  ]
 },
 {
  "t": "Video, projector and display problems: no image, dim image, dead pixels, flickering, burn-in, fuzzy image at non-native resolution, projector overheating",
  "objectives": [
   "Students will be able to isolate whether a display problem lies in the display or in the video source using known-good swaps.",
   "Students will be able to match display symptoms (no image, dim image, dead or stuck pixels, flicker, burn-in, fuzzy text) to likely causes and fixes.",
   "Students will be able to explain native resolution and why scaling is preferred to lowering resolution.",
   "Students will be able to troubleshoot projector overheating and lamp issues."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a TV on the wrong channel. Connect it to the input source setting."
   ],
   [
    12,
    "Teach",
    "Draw a chain on the board: computer, graphics output, cable, monitor input, panel, backlight. Walk through each symptom and mark where in the chain it points. Demonstrate on the projector: show the input menu, the native resolution in Display settings, and the effect of a lower resolution on text sharpness."
   ],
   [
    18,
    "Activity",
    "Run 'Display detective' pair troubleshooting on student laptops and printed symptom cards."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on isolating faults and preventing burn-in."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your TV is on but shows a blue screen saying 'No signal' even though the streaming box is plugged in. What would you check before calling for a repair?",
  "activity": {
   "title": "Display detective",
   "materials": "Student laptops with a browser and access to their own Display settings, printed symptom cards (eight cards such as 'faint image visible with flashlight', 'text blurry', 'ghost of taskbar', 'projector temperature light'), and a whiteboard.",
   "steps": [
    "In pairs, students open Display settings, note the recommended (native) resolution, then temporarily select a lower one and observe the text. They return to native and try changing scaling instead, noting the difference.",
    "Pairs draw symptom cards and write the likely cause, the first check and the fix for each.",
    "For each card, pairs mark on a copy of the board chain whether the fault is in the source, the cable or the display.",
    "The teacher calls on pairs to share one card each; the class agrees or corrects.",
    "Pairs finish by writing a two-sentence explanation of the flashlight test for a user."
   ]
  },
  "discussion": [
   "A monitor fails on one PC. What single swap gives you the most information, and why?",
   "A shop wants to show the same logo on an OLED sign all day. What advice would you give to avoid burn-in?"
  ],
  "exit": [
   [
    "Text looks soft after a resolution change. What is the fix?",
    "Set the display to its native (recommended) resolution and use scaling if text is too small."
   ],
   [
    "You can see a faint image only with a flashlight. What has failed?",
    "The backlight or its power circuit."
   ],
   [
    "A projector shows a temperature light and shuts down. Name two things to check.",
    "The air filter and the vents or fan; clean or replace the filter and ensure clear airflow."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a matching worksheet with symptoms in one column and causes in another before they write fixes on their own.",
   "Extend: Ask fast finishers to research their own laptop's refresh rate options in Display settings and explain how an unsupported refresh rate could cause flicker on an external monitor."
  ]
 },
 {
  "t": "Mobile device problems: poor battery life, swollen battery, overheating, slow charging, broken screen, cursor drift, liquid damage, no connectivity",
  "objectives": [
   "Students will be able to match common mobile device symptoms to likely software, accessory or hardware causes.",
   "Students will be able to describe the safe response to a swollen battery and to liquid damage.",
   "Students will be able to apply a software-before-hardware approach to battery drain, slow charging and no connectivity.",
   "Students will be able to explain how a swollen battery can cause cursor drift and an unresponsive touchpad."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about battery drain. List student theories and sort them into 'software' and 'hardware' on the board."
   ],
   [
    12,
    "Teach",
    "Cover each symptom with the question 'setting, accessory or hardware?'. Show students where battery usage by app lives on a phone (students may follow along on their own phones). Stress the safety steps for swollen batteries and liquid damage."
   ],
   [
    18,
    "Activity",
    "Run the 'Mobile help desk triage' role-play in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on safety and on why settings checks come first."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone used to last all day and now dies by mid-afternoon. List three possible reasons, and say which one you would check first.",
  "activity": {
   "title": "Mobile help desk triage",
   "materials": "Printed user cards (eight scenarios such as 'laptop wobbles and touchpad will not click', 'tablet fell in a sink', 'phone shows no bars after a flight', 'charges slowly with a gas station cable'), printed technician checklists, and a whiteboard with an urgency scale.",
   "steps": [
    "Pairs take turns as user and technician. The user reads a scenario in their own words without naming the cause.",
    "The technician asks up to three questions, then states the likely cause, the first action and whether it is a safety issue.",
    "The pair records the answer on the checklist and places the scenario on the whiteboard urgency scale.",
    "Swap roles and repeat with new cards until each student has handled four scenarios.",
    "The class reviews the urgency scale together, confirming that swollen batteries and liquid damage rank highest."
   ]
  },
  "discussion": [
   "Why do so many users assume a battery problem is hardware, and how would you explain battery usage by app to them?",
   "What would you say to a user who insists on charging a wet phone to see if it still works?"
  ],
  "exit": [
   [
    "A laptop's case is bulging and the screen lifts from the frame. What do you do?",
    "Stop using and charging it, do not press or puncture the battery, have it replaced by a qualified technician and recycle the old battery."
   ],
   [
    "A phone has no cellular signal and no Wi-Fi, but other phones nearby work. What do you check first?",
    "Whether airplane mode is on."
   ],
   [
    "A phone charges slowly. What should you try before repairing the port?",
    "A known-good cable and a charger rated for the device, and cleaning lint from the port."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column card (Setting, Accessory, Hardware) to classify each scenario before choosing an action.",
   "Extend: Ask fast finishers to write a short user-facing guide on extending battery life and safely handling a swollen battery, in plain language a non-technical employee would understand."
  ]
 },
 {
  "t": "Printer problems: faded or streaked prints, ghost images, toner not fused, paper jams, garbled print, stuck print queue, incorrect paper settings",
  "objectives": [
   "Students will be able to relate printer symptoms to the laser imaging process steps and components that cause them.",
   "Students will be able to choose the first fix for faded, streaked, ghosted, unfused and garbled output.",
   "Students will be able to clear a stuck print queue by restarting the Print Spooler service in the correct order.",
   "Students will be able to identify common causes of paper jams and incorrect paper settings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hold up (or project) a sample printout with a defect and ask the warm-up question. Collect guesses."
   ],
   [
    12,
    "Teach",
    "Write the seven laser imaging steps across the board with the mnemonic. Under each, add the symptom that points to it (unfused toner under fusing, ghosting under cleaning, repeating marks under rotating parts). Then cover garbled output and the spooler restart, showing `net stop spooler` and `net start spooler` on the projector."
   ],
   [
    18,
    "Activity",
    "Run the 'Printout forensics' station activity with sample printouts."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about cost-effective fixes and the paper-type setting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Here is a page that came out of a printer. Without seeing the printer, what can the page itself tell us about what went wrong?",
  "activity": {
   "title": "Printout forensics",
   "materials": "Printed sample defect pages the teacher prepares (a faded page, a page with vertical streaks, a page with a repeating dot pattern, a page with a faint ghost of the header, a page of random symbols) plus description cards for symptoms that cannot be printed (smearing toner, multiple sheets feeding, stuck queue). Sticky notes and a whiteboard.",
   "steps": [
    "Set up five or six stations around the room, each with one sample page or description card.",
    "Groups rotate every two to three minutes. At each station they write on a sticky note the symptom name, the likely component or setting, and the first fix.",
    "Groups leave their sticky note at the station; later groups may agree or add a different theory.",
    "After the final rotation, the teacher reviews each station, reading the sticky notes aloud and confirming the correct answer.",
    "Each group writes the correct order of steps for clearing a stuck print queue on the whiteboard."
   ]
  },
  "discussion": [
   "Why is checking the paper type setting a better first step than replacing the fuser when toner smears?",
   "One user's prints are garbled but everyone else's are fine. What does that tell you about where the problem lies?"
  ],
  "exit": [
   [
    "Toner smears off the page. What two things do you check?",
    "The paper type setting and the fuser assembly."
   ],
   [
    "What is the most likely cause of pages full of random symbols?",
    "An incorrect or corrupted print driver."
   ],
   [
    "In what order do you clear a stuck queue that will not cancel?",
    "Stop the Print Spooler service, delete the stuck job files, then start the service again."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a reference card listing symptom keywords (smear, repeat, ghost, symbols, stuck, multiple sheets) with the matching component, and let them use it at the stations.",
   "Extend: Ask fast finishers to write a short preventive maintenance plan for a busy office laser printer, covering paper storage, maintenance kit intervals and driver standardization."
  ]
 },
 {
  "t": "Wired and wireless network problems: intermittent or no connectivity, APIPA address, IP conflicts, slow speeds, high latency and jitter, interference, SSID not found, port flapping",
  "objectives": [
   "Students will be able to interpret an APIPA address and list the checks that follow from it.",
   "Students will be able to explain the causes of IP conflicts and how static addressing outside the DHCP pool or reservations prevent them.",
   "Students will be able to distinguish bandwidth, latency and jitter and explain their effect on voice and video.",
   "Students will be able to troubleshoot wireless interference, missing SSIDs and port flapping from described symptoms."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a 169.254 address. Have students guess what it means and write guesses on the board."
   ],
   [
    12,
    "Teach",
    "Draw a small network: PC, switch, router, DHCP server and access point. Trace what happens when DHCP is reached and when it is not. Demonstrate `ipconfig` on the projector and point out the address, gateway and DHCP lines. Then cover IP conflicts, latency and jitter, 2.4 GHz channels 1, 6 and 11, SSID visibility and port flapping."
   ],
   [
    18,
    "Activity",
    "Run 'Read the evidence' pair troubleshooting with printed command outputs and logs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions about scope and jitter versus speed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A coworker's computer says its IP address is 169.254.33.7 and nothing loads. What do you think that number is telling us?",
  "activity": {
   "title": "Read the evidence",
   "materials": "Printed evidence sheets the teacher prepares: an `ipconfig` output with a 169.254 address, a Windows duplicate-address message, `ping` output with widely varying times, a Wi-Fi analyzer screenshot drawn by hand showing crowded channels, and a switch log excerpt with repeated link up and down messages. Student laptops with a browser are optional for running `ipconfig` on their own machines.",
   "steps": [
    "Pairs receive the evidence sheets in an envelope, each sheet paired with a short user complaint.",
    "For each sheet, pairs name the problem, explain what in the evidence proves it, and write the first two actions they would take.",
    "Pairs that finish early run `ipconfig` on their own laptops (if available) and identify their address, gateway and whether it came from DHCP.",
    "The teacher reviews each sheet with the class, asking pairs to point to the exact line that gave the answer away.",
    "Pairs write one 'scope question' they would ask the user for each case, such as 'Is anyone else affected?'."
   ]
  },
  "discussion": [
   "Why does asking 'Is anyone else affected?' save so much time on network tickets?",
   "A speed test shows a fast connection, but video calls still freeze. How would you explain to a user why speed is not the whole story?"
  ],
  "exit": [
   [
    "What does a 169.254.x.x address mean?",
    "APIPA: the device could not reach a DHCP server and assigned itself an address."
   ],
   [
    "Which three 2.4 GHz channels do not overlap?",
    "Channels 1, 6 and 11."
   ],
   [
    "A switch log shows one port going up and down repeatedly. What is this called, and what do you check first?",
    "Port flapping; check or replace the cable first, then the NIC."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a 'clue word' card (169.254, duplicate, variable delay, microwave, not visible, up and down) with the matching problem name, and have them match evidence before writing actions.",
   "Extend: Ask fast finishers to draw a channel plan for three access points in a small office on the 2.4 GHz band and explain how they would also use 5 GHz to reduce congestion."
  ]
 },
 {
  "t": "Diagnostic tools: Windows Memory Diagnostic, CrystalDiskInfo, Event Viewer, Device Manager, ping, ipconfig, tracert, nslookup, cable tester and multimeter",
  "objectives": [
   "Students will be able to state the purpose of each listed diagnostic tool and the question it answers.",
   "Students will be able to select the appropriate tool for a described symptom.",
   "Students will be able to use ipconfig, ping, tracert and nslookup in a logical order to isolate a network fault.",
   "Students will be able to distinguish the uses of a cable tester and a multimeter."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about a toolbox. Steer students toward 'each tool answers one question'."
   ],
   [
    12,
    "Teach",
    "Draw three columns on the board: Hardware, Operating system, Network and cabling. Place each tool in a column with the question it answers. On the projector, briefly open Event Viewer and Device Manager, and run `ipconfig`, `ping`, `tracert` and `nslookup` against a well-known name."
   ],
   [
    18,
    "Activity",
    "Run 'Tool for the job' pair practice: scenario cards plus hands-on commands on student laptops."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions on interpreting ping failures and choosing the simplest test first."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A plumber, an electrician and a mechanic each carry a toolbox. Why don't they just use whichever tool is closest to hand?",
  "activity": {
   "title": "Tool for the job",
   "materials": "Printed scenario cards (twelve symptoms, such as 'PC restarted overnight', 'yellow triangle on network adapter', 'site loads by IP but not by name', 'is this patch cable wired right?', 'drive is clicking'), student laptops with a command prompt or terminal and a browser, and a whiteboard.",
   "steps": [
    "Pairs draw scenario cards and write the tool they would use first, the question it answers and what result would confirm their theory.",
    "On their laptops, pairs run `ipconfig /all` and record their address, gateway and DNS servers, then `ping` their gateway and a well-known public name.",
    "Pairs run `nslookup` on the same name and `tracert` to it, counting hops and noting any hop that times out.",
    "Pairs write a short ordered checklist for a 'can't reach website' ticket using the four commands.",
    "The teacher reviews scenario answers, and pairs compare their checklists with the worked example from the lesson."
   ]
  },
  "discussion": [
   "A host does not reply to ping, but its website loads in a browser. What does that teach you about relying on a single tool?",
   "Why is it usually better to ping the default gateway before running tracert to a distant site?"
  ],
  "exit": [
   [
    "Which tool shows why a PC restarted unexpectedly?",
    "Event Viewer, in the System log."
   ],
   [
    "A site loads by IP address but not by name. Which command confirms the cause?",
    "nslookup, which shows whether the name resolves; the likely cause is DNS."
   ],
   [
    "Which tool would you use to check a PSU's 12-volt output, and which to check a network cable's pair order?",
    "A multimeter for the PSU voltage; a cable tester for the cable's pair order."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a tool card for each of the ten tools with its one-line question, and let them match cards to scenarios before writing explanations.",
   "Extend: Ask fast finishers to write a full troubleshooting narrative for a fictional ticket that uses at least four different tools, explaining what each result ruled in or out."
  ]
 }
]);
