/* Teacher edition for CWNP Certified Wireless Network Administrator (CWNA-109): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("cwna", [
 {
  "t": "RF wave characteristics: wavelength, frequency, amplitude and phase, and how wavelength shrinks as frequency rises",
  "objectives": [
   "Students will be able to define wavelength, frequency, amplitude and phase and identify each on a drawing of a sine wave.",
   "Students will be able to calculate approximate wavelength from frequency using wavelength = speed of light / frequency.",
   "Students will be able to explain why higher-frequency bands produce smaller coverage cells at the same transmit power.",
   "Students will be able to predict the effect of in-phase and 180-degree out-of-phase signals arriving at a receiver."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the clinic that moved to 5 GHz. Collect three or four guesses on the whiteboard without judging them; you will return to them at the end."
   ],
   [
    15,
    "Teach",
    "Draw a sine wave and label crest, wavelength and amplitude. Introduce frequency in Hz and GHz. Write wavelength = c / f, work the 2.4 GHz example aloud (0.125 m) and have students compute 5 GHz and 6 GHz. Draw two waves in phase and two 180 degrees out of phase and show the sums."
   ],
   [
    15,
    "Activity",
    "Run the rope-wave activity in pairs, then have each pair complete the band comparison table and the phase-sum sketch."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up guesses. Ask which ones the lesson supports and which it rules out. Use the discussion questions to link wavelength to AP placement."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them on the door as they leave."
   ]
  ],
  "warmup": "A clinic moves every laptop from its 2.4 GHz network to 5 GHz on the same access point at the same power. Users near the AP are happy, but people at the far end now lose connection. What do you think changed, if the power did not?",
  "activity": {
   "title": "Rope waves and the band table",
   "materials": "A length of rope or string per pair (or a long phone charging cable), whiteboard, printed band comparison table, calculators or phone calculators.",
   "steps": [
    "Pairs hold a rope between them. One student shakes it slowly to make long waves, then quickly to make short waves. Partners note that faster shaking (higher frequency) produces shorter waves.",
    "Have the shaker shake harder without changing speed and ask what property changed (amplitude) and what stayed the same (frequency and wavelength).",
    "On the printed table, pairs calculate wavelength for 2.4 GHz, 5 GHz and 6 GHz using 300,000,000 / frequency and write the result in centimeters.",
    "Pairs sketch two identical waves, first aligned and then shifted half a cycle, and draw the combined result for each case.",
    "Each pair writes one sentence explaining which band they would expect to cover the largest area at equal power and why."
   ]
  },
  "discussion": [
   "If higher bands cover less area, why would anyone design a network around 5 GHz or 6 GHz at all?",
   "Where in a building would you expect multipath phase effects to be strongest, and why?"
  ],
  "exit": [
   [
    "What happens to wavelength if frequency doubles?",
    "It halves, because wavelength equals the speed of light divided by frequency."
   ],
   [
    "Which wave property changes when you raise transmit power?",
    "Amplitude."
   ],
   [
    "Two copies of a signal arrive 180 degrees out of phase. What happens?",
    "They cancel or severely weaken each other."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-labeled sine wave diagram and a filled-in first row of the band table (2.4 GHz = 12.5 cm) so they only need to repeat the pattern.",
   "Extend: Ask fast finishers to calculate the wavelength at the center of a specific 5 GHz channel such as 5180 MHz and explain why a half-wave dipole for 5 GHz is shorter than one for 2.4 GHz."
  ]
 },
 {
  "t": "RF behaviors: reflection, refraction, diffraction, scattering, absorption, free space path loss and multipath",
  "objectives": [
   "Students will be able to define reflection, refraction, diffraction, scattering, absorption and free space path loss.",
   "Students will be able to match common building materials to the RF behavior they cause.",
   "Students will be able to explain the four effects of multipath and why MIMO radios benefit from it.",
   "Students will be able to diagnose the likely RF behavior from a described symptom such as high retries with strong signal."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario of strong signal and poor performance in a warehouse aisle. Ask students to vote on whether the cause is weak coverage or something else, and record the tally."
   ],
   [
    12,
    "Teach",
    "Walk through each behavior with a quick sketch: a mirror for reflection, a corner shadow for diffraction, a fence for scattering, a sponge for absorption and widening ripples for FSPL. Introduce the 6 dB rule. Then draw a direct path and a reflected path to the same receiver and explain upfade, downfade, nulling and intersymbol interference."
   ],
   [
    18,
    "Activity",
    "Run the material and symptom card sort in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Groups share one card they disagreed on and how they resolved it. Use the discussion questions to connect multipath to MIMO."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on an index card."
   ]
  ],
  "warmup": "Handheld scanners in a warehouse aisle lined with steel racks show strong signal but keep timing out. A break room with weaker signal works fine. What could cause strong signal and poor performance at the same time?",
  "activity": {
   "title": "Material and symptom card sort",
   "materials": "Printed cards the teacher prepares: one set of behavior cards (reflection, refraction, diffraction, scattering, absorption, FSPL, multipath), one set of material cards (steel rack, tinted window, concrete wall, fish tank, crowd of people, chain-link fence, tree line, open parking lot, building corner, warm and cool air layers over a lake) and one set of symptom cards. Whiteboard and sticky notes.",
   "steps": [
    "Give each group the behavior cards laid out as column headers on their desk.",
    "Groups place each material card under the behavior it mainly causes and must agree on a reason for each placement.",
    "Hand out symptom cards, such as strong signal with high retries, sudden drop behind an elevator core, coverage weakening evenly across an open field, and a summer-only drop on a campus bridge. Groups place each symptom under the matching behavior.",
    "Each group writes one recommended fix on a sticky note for two of the symptoms and posts it on the whiteboard.",
    "The teacher reviews placements, highlighting that FSPL needs no obstacle and that multipath is often caused by reflection."
   ]
  },
  "discussion": [
   "If MIMO radios benefit from multipath, why do we still see multipath problems in some environments today?",
   "How would you plan a survey for a space whose occupancy changes a lot, like a stadium or lecture hall?"
  ],
  "exit": [
   [
    "Which behavior causes signal loss even in a perfect vacuum?",
    "Free space path loss, caused by the wavefront spreading out with distance."
   ],
   [
    "Name a material that mainly causes reflection and one that mainly causes absorption.",
    "Metal (or coated glass) causes reflection; water, people or concrete cause absorption."
   ],
   [
    "A client shows strong signal but many retries near metal shelving. What is the likely cause?",
    "Multipath from reflections, leading to corrupted frames."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference card pairing each behavior with a simple picture (mirror, corner, gravel, sponge, ripples) to use during the card sort.",
   "Extend: Ask fast finishers to estimate the received power change when a client moves from 10 meters to 40 meters from an AP in open space using the 6 dB rule, and explain the answer in mW terms."
  ]
 },
 {
  "t": "RF math: mW and dBm conversion, the rule of 10s and 3s, dB gain and loss, dBi vs dBd",
  "objectives": [
   "Students will be able to convert between mW and dBm using the rule of 10s and 3s without a calculator.",
   "Students will be able to add dB gains and losses to a dBm starting value to find output power.",
   "Students will be able to convert antenna gain from dBd to dBi.",
   "Students will be able to compare two negative dBm readings and express the difference as a power ratio."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write -64 dBm and -67 dBm on the board and ask the warm-up question. Take a show of hands for each answer choice."
   ],
   [
    12,
    "Teach",
    "Explain dB as a ratio and dBm as a ratio to 1 mW. Build the 10s and 3s table live on the board from 0 dBm = 1 mW, saying each step aloud in both columns. Work 4 dBm and 17 dBm as examples. Show a simple chain: 20 dBm - 3 dB + 6 dBi. Introduce dBi versus dBd and the 2.14 conversion."
   ],
   [
    18,
    "Activity",
    "Run the conversion relay in teams."
   ],
   [
    5,
    "Discuss",
    "Review the hardest relay card and ask a team to explain their path aloud. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper, no calculators."
   ]
  ],
  "warmup": "One desk reads -64 dBm and another reads -67 dBm. Is the first desk getting about 5 percent more power, about 50 percent more power, or about twice the power? Commit to a guess.",
  "activity": {
   "title": "Conversion relay",
   "materials": "Printed relay cards the teacher prepares (each with a conversion or chain problem), whiteboard divided into team columns, markers. No calculators.",
   "steps": [
    "Divide the class into teams of four and line them up facing the whiteboard, or seat them in groups with a shared answer sheet.",
    "The first student draws a card, such as convert 50 mW to dBm, and writes each 10s and 3s step in both columns on the board.",
    "The next teammate checks the work, corrects it if needed, and draws the next card. Cards progress from simple (20 dBm to mW) to chained (radio 17 dBm, cable loss 2 dB, antenna 3 dBd: find radiated power).",
    "Teams earn a point for each correct card and a bonus point for catching and fixing a teammate's error.",
    "End with a lightning round where the teacher reads two negative dBm values and teams call out the power ratio between them."
   ]
  },
  "discussion": [
   "Why do you think the wireless industry prefers working in dB instead of milliwatts?",
   "When might a 3 dB difference in a survey reading actually matter to users, and when might it not?"
  ],
  "exit": [
   [
    "Convert 200 mW to dBm.",
    "About 23 dBm: 100 mW is 20 dBm and doubling adds 3 dB."
   ],
   [
    "A radio outputs 18 dBm through 3 dB of cable loss into a 5 dBi antenna. What is the radiated power?",
    "20 dBm, because 18 - 3 + 5 = 20."
   ],
   [
    "Convert a 6 dBd antenna to dBi.",
    "About 8.14 dBi, by adding 2.14."
   ]
  ],
  "differentiation": [
   "Support: Provide a blank two-column 10s and 3s ladder with 0 dBm = 1 mW filled in, so students practice filling steps before attempting chained problems.",
   "Extend: Ask fast finishers to explain why 7 dB is roughly five times the power by building it from 10s and 3s (for example +10 -3), and to estimate 14 dBm in mW."
  ]
 },
 {
  "t": "Signal metrics: RSSI, noise floor, SNR, receive sensitivity and fade margin",
  "objectives": [
   "Students will be able to calculate SNR from a received signal and noise floor value.",
   "Students will be able to explain why RSSI values cannot be compared across vendors.",
   "Students will be able to interpret a receive sensitivity table and relate it to data rates.",
   "Students will be able to justify a fade margin or design target such as -67 dBm for voice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the noisy-room warm-up: ask two volunteers to hold a conversation across the room while others hum quietly, then louder. Ask what changed."
   ],
   [
    13,
    "Teach",
    "Define each metric on the board with a vertical dBm scale: draw the noise floor near -95, a signal at -65 and mark the SNR gap. Show a sample sensitivity table with values per data rate. Explain dynamic rate switching and fade margin, and stress that RSSI is vendor-defined."
   ],
   [
    17,
    "Activity",
    "Pairs work through the troubleshooting cards using the dBm scale."
   ],
   [
    5,
    "Discuss",
    "Pairs share their verdict for one card. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two people try to talk across the room while the rest of the class hums, first quietly and then loudly. The speakers do not change their volume. Why does the conversation get harder, and what would they have to do to keep talking?",
  "activity": {
   "title": "Signal or noise? Troubleshooting cards",
   "materials": "Printed cards the teacher prepares, each with a room name, received signal, noise floor, required data rate and a short sensitivity table. Whiteboard with a drawn dBm scale from -30 to -100. Sticky notes.",
   "steps": [
    "Give each pair four cards. Each card describes a location with a received signal value and a noise floor value.",
    "Pairs calculate the SNR for each card and place a sticky note for the signal and one for the noise floor on the whiteboard scale.",
    "Using the sensitivity table on the card, pairs decide whether the location can support the required data rate and how much margin remains.",
    "For each failing location, pairs decide whether the root cause is weak signal or high noise and write a one-line recommended action.",
    "The teacher calls on pairs to defend one verdict, focusing on any card where signal looked fine but SNR was poor."
   ]
  },
  "discussion": [
   "Why might a design team set both a minimum signal target and a minimum SNR target rather than just one?",
   "What risks come from comparing signal readings collected with different client devices?"
  ],
  "exit": [
   [
    "Signal is -62 dBm and the noise floor is -90 dBm. What is the SNR?",
    "28 dB."
   ],
   [
    "Can you compare an RSSI value from one vendor's chipset directly with another's? Why?",
    "No, because the RSSI scale is defined by each vendor, not by the 802.11 standard."
   ],
   [
    "What is fade margin?",
    "Extra signal designed above the receiver's sensitivity so the link survives normal fluctuations."
   ]
  ],
  "differentiation": [
   "Support: Provide a number line from -30 to -100 dBm so students can count the gap between signal and noise instead of subtracting negative numbers mentally.",
   "Extend: Ask fast finishers to explain how SINR differs from SNR and describe a scenario where SNR looks good but SINR is poor, such as co-channel interference from a neighboring AP."
  ]
 },
 {
  "t": "Link budgets and EIRP: transmitter power, cable and connector loss, antenna gain",
  "objectives": [
   "Students will be able to identify the intentional radiator and EIRP measurement points on a diagram.",
   "Students will be able to calculate IR power and EIRP from transmitter power, losses and antenna gain.",
   "Students will be able to complete a simple end-to-end link budget and calculate fade margin.",
   "Students will be able to explain why unbalanced AP and client power causes one-way links."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up proposal on the projector and ask students what information is missing to decide whether the link will work and whether it is legal."
   ],
   [
    12,
    "Teach",
    "Draw radio, cable, connector, lightning arrestor and antenna in a line. Mark the IR point and the EIRP point. Work the 17 dBm, 4 dB, 10 dBi example aloud. Extend the drawing across a gap to a receiver and walk through FSPL, receive gain, receive cable loss, sensitivity and fade margin. Close with the balanced power idea."
   ],
   [
    18,
    "Activity",
    "Pairs complete the link budget worksheet from a mock data sheet."
   ],
   [
    5,
    "Discuss",
    "Ask pairs whether their link was legal and had enough margin. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A contractor proposes a building-to-building link with radios at a given dBm, a cable loss per meter and dish antennas rated in dBi, but no totals. What would you need to calculate before approving it?",
  "activity": {
   "title": "Build a link budget from a data sheet",
   "materials": "Printed mock data sheets the teacher prepares (radio power options, sensitivity table, cable loss per meter, antenna gains in dBi and one in dBd), a printed worksheet with blank boxes for each stage, a given FSPL value and a given EIRP limit. Whiteboard.",
   "steps": [
    "Pairs choose a radio power, cable length and antenna from the mock data sheet for a described 1 km campus link.",
    "They calculate total cable loss from the length and loss per meter, then IR power, then EIRP, writing each value in the worksheet boxes.",
    "They compare EIRP with the given limit and adjust their choices if they exceed it.",
    "Using the provided FSPL value, they calculate received signal at the far end and subtract the sensitivity for their target data rate to find fade margin.",
    "Pairs write their final design and margin on the whiteboard so the class can compare different choices that all meet the limit."
   ]
  },
  "discussion": [
   "If two designs both meet the EIRP limit, why might you prefer the one with lower radio power and a higher-gain antenna, or the reverse?",
   "How would you explain to a manager why maximum AP power is not always the best setting?"
  ],
  "exit": [
   [
    "Radio 18 dBm, cable loss 2 dB, antenna 6 dBi. What is the EIRP?",
    "22 dBm."
   ],
   [
    "In that system, what is the IR power?",
    "16 dBm."
   ],
   [
    "Received signal is -60 dBm and sensitivity is -78 dBm. What is the fade margin?",
    "18 dB."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a worksheet with the stages pre-labeled and arrows showing whether to add or subtract at each step.",
   "Extend: Ask fast finishers to determine the maximum antenna gain they could use with a 20 dBm radio and 3 dB of cable loss to stay under a given EIRP limit, and to explain the effect of converting a dBd antenna."
  ]
 },
 {
  "t": "Antenna types: omnidirectional, semi-directional (patch, panel, Yagi, sector) and highly directional (parabolic dish)",
  "objectives": [
   "Students will be able to classify antennas as omnidirectional, semi-directional or highly directional.",
   "Students will be able to describe the coverage pattern and typical use of dipole, patch, panel, Yagi, sector and dish antennas.",
   "Students will be able to explain how increasing gain changes an antenna's pattern without adding power.",
   "Students will be able to select an appropriate antenna for a described space and justify the choice."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question about the gym and field house and list student ideas on the board."
   ],
   [
    13,
    "Teach",
    "Use a flashlight and a bare bulb (or projector images) to compare omni and directional coverage. Draw the doughnut and show how higher gain flattens it. Introduce each semi-directional type with a sketch and its use case, then dishes and grids. Mention back lobes, downtilt and leaky coax."
   ],
   [
    17,
    "Activity",
    "Groups complete the floor plan antenna challenge."
   ],
   [
    5,
    "Discuss",
    "Groups present one design choice and the class critiques it. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A gym's bleachers have poor Wi-Fi while the parking lot outside gets strong signal from the gym's AP. What might be wrong with how the antenna is directing its energy?",
  "activity": {
   "title": "Floor plan antenna challenge",
   "materials": "Printed floor plans the teacher prepares (an open office, a long hallway, stadium bleachers, a tunnel and a two-building campus), colored pencils, printed antenna pattern cards (doughnut, wide fan, narrow beam, very narrow beam), sticky notes.",
   "steps": [
    "Give each group of three two floor plans and a set of antenna pattern cards.",
    "Groups choose an antenna type for each area and sketch its coverage pattern on the plan in colored pencil.",
    "For each choice, groups write on a sticky note why they chose it and what risk it carries, such as back lobes or poor coverage beneath the mount.",
    "Groups swap plans with another group, who must identify one improvement or confirm the design.",
    "The teacher reviews common choices, emphasizing patch or panel antennas for seating and dishes for bridges."
   ]
  },
  "discussion": [
   "Why might a designer choose several low-gain antennas instead of one high-gain antenna for a large space?",
   "What problems could a directional antenna's back lobe cause in a multi-tenant office building?"
  ],
  "exit": [
   [
    "Which antenna family includes Yagi and sector antennas?",
    "Semi-directional."
   ],
   [
    "What happens to vertical coverage when omni gain increases?",
    "It shrinks, because the doughnut flattens."
   ],
   [
    "Which antenna fits a long point-to-point bridge?",
    "A highly directional antenna such as a parabolic dish or grid."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-column chart with pictures of each antenna family and its pattern to reference during the floor plan challenge.",
   "Extend: Ask fast finishers to calculate how much EIRP rises when replacing a 4 dBi antenna with a 12 dBi antenna at the same radio power and to propose a power setting that keeps EIRP unchanged."
  ]
 },
 {
  "t": "Antenna characteristics: gain, beamwidth, polarization, azimuth and elevation charts",
  "objectives": [
   "Students will be able to define gain, beamwidth and polarization as listed on an antenna data sheet.",
   "Students will be able to distinguish azimuth and elevation charts and state which plane each shows.",
   "Students will be able to estimate beamwidth from a radiation chart using the -3 dB points.",
   "Students will be able to select between two antennas for a described space using their gain and beamwidth."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project the two patch antenna specs from the warm-up and ask students to pick one for a long aisle with a reason."
   ],
   [
    12,
    "Teach",
    "Explain gain as passive focusing and its link to beamwidth. Draw a main lobe and mark the -3 dB points. Show vertical and horizontal polarization with an arm gesture and explain mismatch on bridges. Project an azimuth and elevation chart for an omni and a patch; walk through reading rings, lobes and nulls, and point out logarithmic scale."
   ],
   [
    18,
    "Activity",
    "Pairs read printed radiation charts and answer the chart questions."
   ],
   [
    5,
    "Discuss",
    "Review answers to the trickiest chart and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Two patch antennas cost the same. One is 8 dBi with a 70-degree horizontal beamwidth; the other is 13 dBi with 30 degrees. Which would you choose for a long, narrow aisle, and why?",
  "activity": {
   "title": "Read the radiation chart",
   "materials": "Printed radiation charts the teacher draws or prepares (an omni azimuth and elevation pair, a patch pair and a sector pair) with labeled dB rings, protractors or printed angle overlays, a worksheet of questions, projector.",
   "steps": [
    "Give each pair one set of charts with the antenna type hidden.",
    "Pairs label which chart is azimuth and which is elevation, and justify the choice.",
    "Using the protractor or overlay, pairs find the -3 dB points and estimate horizontal and vertical beamwidth.",
    "Pairs identify any back lobes, side lobes and nulls, record the dB ring each reaches and guess the antenna type.",
    "Each pair recommends one space where their antenna would work well and one where it would not, then the teacher reveals the antenna types."
   ]
  },
  "discussion": [
   "Why do you think vendors often use a logarithmic scale on radiation charts, and how could that mislead a buyer?",
   "When would polarization be worth checking during an installation, and when could you safely ignore it?"
  ],
  "exit": [
   [
    "Which chart shows the horizontal plane viewed from above?",
    "The azimuth chart."
   ],
   [
    "At what points is beamwidth measured?",
    "At the half-power points, 3 dB below the peak on either side of the main lobe."
   ],
   [
    "What happens if two bridge antennas have mismatched polarization?",
    "Significant signal loss on the link."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a chart with the -3 dB ring highlighted and the main lobe pre-shaded so they focus on reading angles.",
   "Extend: Ask fast finishers to sketch how the elevation chart of an omni would change if its gain increased, and explain the effect on coverage beneath a ceiling mount."
  ]
 },
 {
  "t": "Point-to-point links: visual vs RF line of sight, the Fresnel zone and earth bulge",
  "objectives": [
   "Students will be able to distinguish visual line of sight from RF line of sight.",
   "Students will be able to describe the shape of the first Fresnel zone and how distance and frequency affect its size.",
   "Students will be able to apply the 40 percent and 20 percent obstruction guidelines to a described link.",
   "Students will be able to explain when and why earth bulge is added to antenna height calculations."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Tell the seasonal bridge story from the warm-up and ask students to propose causes."
   ],
   [
    12,
    "Teach",
    "Draw two buildings and a straight line between them, then draw the Fresnel ellipse around it. Show where it is widest. Explain how distance and frequency change its size, and the 40 and 20 percent guidelines. Write the radius formula, work the 2-mile, 5.8 GHz example, then introduce earth bulge with the D squared / 8 rule."
   ],
   [
    18,
    "Activity",
    "Groups complete the link profile drawing exercise."
   ],
   [
    5,
    "Discuss",
    "Groups share their antenna height recommendation. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A wireless bridge between two campus buildings works well every winter and slows down every summer. Nobody touches the antennas, and you can see one from the other. What could be changing?",
  "activity": {
   "title": "Draw the link profile",
   "materials": "Printed side-view grid paper with two building heights and a terrain line the teacher prepares (including a tree line or rooftop near the midpoint), rulers, colored pencils, calculators or phone calculators, the Fresnel formula on the board.",
   "steps": [
    "Give each group a printed profile of a link with distance, frequency, building heights and obstacle heights marked.",
    "Groups draw the visual line of sight between antennas, then calculate the 60 percent Fresnel radius at the midpoint and sketch the clearance ellipse below the line.",
    "Groups decide whether the obstacle intrudes more than 40 percent into the first Fresnel zone and mark it on the drawing.",
    "For the long-link version, groups add earth bulge using D squared / 8 and redraw.",
    "Each group recommends a minimum antenna height and writes it with their reasoning on the whiteboard."
   ]
  },
  "discussion": [
   "Why might a link that tested perfectly at installation fail several years later?",
   "What are the trade-offs between raising antennas, changing frequency and choosing a different path when Fresnel clearance is poor?"
  ],
  "exit": [
   [
    "Does clear visual line of sight guarantee a good RF link? Why?",
    "No, because the Fresnel zone around the line must also be mostly clear."
   ],
   [
    "Where is the Fresnel zone widest?",
    "At the midpoint of the link."
   ],
   [
    "Name the two factors that make the Fresnel zone larger.",
    "Longer distance and lower frequency."
   ]
  ],
  "differentiation": [
   "Support: Provide a profile with the Fresnel ellipse already drawn so struggling students focus on judging the percentage of obstruction.",
   "Extend: Ask fast finishers to compare the 60 percent clearance radius for the same 4-mile link at 2.4 GHz and 5.8 GHz and explain the result in terms of the formula."
  ]
 },
 {
  "t": "MIMO radios: radio chains, spatial streams, transmit beamforming, MU-MIMO",
  "objectives": [
   "Students will be able to interpret MIMO notation such as 4x4:4 and identify which device limits the spatial streams used.",
   "Students will be able to explain spatial multiplexing and contrast it with diversity techniques such as MRC.",
   "Students will be able to describe the explicit beamforming sounding exchange between beamformer and beamformee.",
   "Students will be able to compare SU-MIMO and MU-MIMO and state which amendments introduced downlink and uplink MU-MIMO."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the 4x4 AP and the 2x2 laptop. Ask students to write a one-sentence prediction."
   ],
   [
    13,
    "Teach",
    "Define radio chains and the TxR:S notation with several examples, including an impossible one. Explain spatial streams with a lanes drawing and the client limit. Cover MRC, STBC and CSD briefly. Walk through the NDPA, NDP and feedback exchange. Contrast SU-MIMO and MU-MIMO and note which amendment added each direction."
   ],
   [
    17,
    "Activity",
    "Run the MIMO role-play with students acting as antennas and clients."
   ],
   [
    5,
    "Discuss",
    "Debrief the role-play and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A company bought 4x4:4 access points, but a 2x2:2 laptop gets nowhere near the advertised maximum speed. Write down your prediction: is the AP faulty, or is something else limiting the link?",
  "activity": {
   "title": "MIMO role-play: lanes, listeners and many users",
   "materials": "Printed cards labeled with stream numbers and data words, sticky notes, open floor space or a cleared aisle, whiteboard.",
   "steps": [
    "Choose four students to be the AP's radio chains and two students to be a 2x2 client. AP students each hold a card with part of a message; show that only two cards can be delivered at once because the client has only two receivers.",
    "Demonstrate MRC: all four AP students listen to one client student whispering a word, and they combine what they heard to decide the word, showing improved reception.",
    "Act out beamforming sounding: the AP announces a sounding (NDPA), sends an empty card (NDP), and the client describes where it is standing (feedback) so the AP can aim.",
    "Add two more clients spread across the room. The AP sends different cards to different clients at the same moment to show MU-MIMO, then repeat with clients walking around or clustered together to show why it becomes harder.",
    "Groups write on sticky notes one condition that helps MU-MIMO and one that hurts it, and post them on the board."
   ]
  },
  "discussion": [
   "How would you explain to a manager why a more expensive AP still makes sense when most clients are 2x2?",
   "In which real environments do you think MU-MIMO would deliver the most benefit, and in which the least?"
  ],
  "exit": [
   [
    "What does 3x3:2 mean?",
    "Three transmit chains, three receive chains and two spatial streams."
   ],
   [
    "A 4x4:4 AP serves a 1x1:1 phone. How many spatial streams does the link use?",
    "One, limited by the phone."
   ],
   [
    "Which amendment introduced uplink MU-MIMO?",
    "802.11ax (Wi-Fi 6)."
   ]
  ],
  "differentiation": [
   "Support: Provide a notation decoder card with each position labeled (transmit, receive, streams) and practice examples to fill in.",
   "Extend: Ask fast finishers to explain why a device advertised as 2x2:3 cannot exist and to describe how sounding overhead could reduce MU-MIMO's benefit in a busy network."
  ]
 },
 {
  "t": "Modulation and coding basics: DSSS, OFDM, OFDMA, BPSK through QAM, and MCS indexes",
  "objectives": [
   "Students will be able to distinguish DSSS, OFDM and OFDMA and name the amendments that use each.",
   "Students will be able to state the bits per symbol for BPSK, QPSK and each QAM level from 16-QAM to 4096-QAM.",
   "Students will be able to explain how coding rate trades efficiency for robustness.",
   "Students will be able to interpret an MCS change on a dashboard in terms of SNR and link quality."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the dashboard scenario from the warm-up, a laptop dropping from MCS 11 to MCS 3, and ask students what they think changed."
   ],
   [
    13,
    "Teach",
    "Contrast DSSS (Barker, CCK, 22 MHz) with OFDM (64 subcarriers, 48 data, 4 pilots, guard interval). Introduce OFDMA resource units. Draw constellation diagrams for BPSK, QPSK and 16-QAM and explain why denser constellations need more SNR. Explain coding rates and how MCS bundles modulation and coding."
   ],
   [
    17,
    "Activity",
    "Run the noisy constellation game in pairs."
   ],
   [
    5,
    "Discuss",
    "Debrief the game and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A dashboard shows a laptop connected at MCS 11 earlier in the evening and MCS 3 now, on the same AP in the same room. What might have changed, and what is the radio trying to do?",
  "activity": {
   "title": "Noisy constellation game",
   "materials": "Printed grids the teacher prepares showing 2, 4 and 16 target points (BPSK, QPSK and 16-QAM style constellations), a small coin or eraser per pair, a printed bits-per-symbol table, sticky notes.",
   "steps": [
    "In pairs, one student is the transmitter and secretly chooses a target point on the BPSK grid, then tosses or drops a coin aiming at it from a set height while the partner looks away.",
    "The receiver looks at where the coin landed and guesses which target point was intended. Repeat five times and record correct decodes.",
    "Repeat with the QPSK grid and then the 16-point grid, keeping the same toss height to represent the same noise.",
    "Pairs then lower the toss height (less noise, higher SNR) and repeat on the 16-point grid, recording the improvement.",
    "Pairs write on a sticky note the relationship they found between number of points, bits per symbol and the noise they could tolerate, and post it for discussion."
   ]
  },
  "discussion": [
   "Why might an administrator disable the oldest DSSS data rates on a network, and what could go wrong?",
   "In what kind of environment would OFDMA make the biggest difference compared with plain OFDM?"
  ],
  "exit": [
   [
    "How many bits per symbol does 1024-QAM carry, and which amendment introduced it?",
    "10 bits, introduced by 802.11ax."
   ],
   [
    "Which is more robust, a 1/2 or a 5/6 coding rate?",
    "1/2, because more of the bits are error correction."
   ],
   [
    "What does OFDMA add compared with OFDM?",
    "It assigns resource units of subcarriers to multiple users in the same transmission."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a printed ladder of modulation types with bits per symbol and a simple picture of each constellation to reference.",
   "Extend: Ask fast finishers to explain why an 802.11n MCS 8 uses the same modulation as MCS 0, and why 802.11ac changed MCS numbering to a per-stream scheme."
  ]
 },
 {
  "t": "Roles of the IEEE, Wi-Fi Alliance, IETF and national regulators such as the FCC",
  "objectives": [
   "Students will be able to state the role of the IEEE, the Wi-Fi Alliance, the IETF and national regulators in Wi-Fi.",
   "Students will be able to identify which organization is responsible for a described function, such as certification or power limits.",
   "Students will be able to name protocols and certifications produced by each organization, such as RADIUS, EAP, WPA3 and 802.11ax.",
   "Students will be able to explain why APs must be configured with the correct country code."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the three emails from the warm-up and ask students to guess which organization each email involves."
   ],
   [
    12,
    "Teach",
    "Draw four columns on the board: IEEE, Wi-Fi Alliance, IETF, Regulators. Fill each with its role, examples and what it does not do. Explain amendments and roll-up revisions, certification versus compliance, RFCs and 802.1X, and country codes. Add ITU-R above the regulators."
   ],
   [
    18,
    "Activity",
    "Run the who-does-what card sort and speed round."
   ],
   [
    5,
    "Discuss",
    "Review any cards groups disagreed on. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Three emails arrive: a vendor claims 802.11ax compliance without a certification logo, the security team asks who defines EAP-TLS and RADIUS, and a branch abroad asks whether the AP power settings are legal there. Which organization would you look to for each?",
  "activity": {
   "title": "Who does what? Card sort",
   "materials": "Printed cards the teacher prepares, each naming a function, protocol or certification (for example 802.11ax, WPA3, RADIUS, EAP-TLS, CAPWAP, maximum EIRP, DFS channel rules, Wi-Fi CERTIFIED logo, WMM, Passpoint, 802.11-2020, Wi-Fi 6 name, regional spectrum coordination). Four large labeled areas on desks or the whiteboard: IEEE, Wi-Fi Alliance, IETF, Regulators and ITU-R.",
   "steps": [
    "Groups of three or four receive a shuffled deck of cards.",
    "Groups place each card under the organization responsible, discussing any disagreements.",
    "The teacher reveals the answers one column at a time, and groups score a point for each correct placement.",
    "Speed round: the teacher reads short scenarios aloud, such as a device needs approval to be sold in the United States, and groups hold up the matching organization name on a sticky note.",
    "Each group writes one sentence summarizing the difference between complying with an IEEE amendment and being Wi-Fi CERTIFIED."
   ]
  },
  "discussion": [
   "Why might the Wi-Fi Alliance certify a feature before the IEEE amendment is finished, and what are the risks?",
   "How would you explain to a manager why an AP bought in one country might not be legal to use in another?"
  ],
  "exit": [
   [
    "Which organization certifies Wi-Fi products for interoperability?",
    "The Wi-Fi Alliance."
   ],
   [
    "Which organization publishes the RFCs that define RADIUS and EAP?",
    "The IETF."
   ],
   [
    "Who sets legal power limits for Wi-Fi in the United States?",
    "The FCC."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page organizer with each organization's name, a short role phrase and two examples to use during the card sort.",
   "Extend: Ask fast finishers to explain how IEEE 802.1X, EAP and RADIUS fit together in an enterprise WLAN login and which organization defines each piece."
  ]
 },
 {
  "t": "Wi-Fi Alliance certifications and generation names: Wi-Fi 4, 5, 6, 6E and 7",
  "objectives": [
   "Students will be able to map Wi-Fi 4, 5, 6, 6E and 7 to their IEEE amendments and PHY names.",
   "Students will be able to state the frequency bands each generation uses.",
   "Students will be able to name key features introduced by each generation, such as MU-MIMO, OFDMA and MLO.",
   "Students will be able to identify major Wi-Fi Alliance certification programs and explain what certification does and does not guarantee."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the three help desk tickets from the warm-up and ask students to sort the naming confusion in each."
   ],
   [
    12,
    "Teach",
    "Build a table on the board with columns for generation name, amendment, PHY name, bands and headline features. Fill it row by row from Wi-Fi 4 to Wi-Fi 7, highlighting that 6E is a band extension. Note pre-802.11n amendments. Then list the key certification programs and explain mandatory versus optional features."
   ],
   [
    18,
    "Activity",
    "Run the generation matching game and ticket triage."
   ],
   [
    5,
    "Discuss",
    "Review the ticket triage answers and use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Three tickets: a Wi-Fi 6E laptop will not connect to 6 GHz, a user asks whether Wi-Fi 6 and 802.11ax are the same, and a quote lists 802.11be APs without a generation name. How would you translate each into plain terms?",
  "activity": {
   "title": "Generation matching and ticket triage",
   "materials": "Printed cards the teacher prepares in five sets: generation names, amendment letters, PHY names, band lists and feature lists. Printed help desk ticket slips. Whiteboard and sticky notes.",
   "steps": [
    "Groups receive the shuffled card sets and build complete rows that match each generation name to its amendment, PHY name, bands and features.",
    "The teacher checks rows and asks each group to explain one row aloud, especially the 6E row.",
    "Groups then receive ticket slips, such as a Wi-Fi 6E laptop seeing no 6 GHz network or a Wi-Fi 5 AP expected to offer 802.11ac on 2.4 GHz, and write a diagnosis on a sticky note.",
    "Groups add one certification program card, such as Passpoint or Enhanced Open, to a ticket where it would help and explain why.",
    "Groups post their diagnoses on the board for the class to compare."
   ]
  },
  "discussion": [
   "Do the generation names help or hurt technical staff, and why do you think the industry still uses both systems?",
   "Why might an organization require Wi-Fi Alliance certification in its purchasing policy rather than accept a vendor's claim of amendment support?"
  ],
  "exit": [
   [
    "Which amendment is Wi-Fi 6E, and what makes it different from Wi-Fi 6?",
    "802.11ax; it operates in the 6 GHz band."
   ],
   [
    "Which generation is 5 GHz only?",
    "Wi-Fi 5, 802.11ac."
   ],
   [
    "Name one Wi-Fi Alliance certification program other than a generation name.",
    "Any of: WPA2, WPA3, Wi-Fi Enhanced Open, WMM, Passpoint, WPS, Wi-Fi Direct or Wi-Fi Agile Multiband."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed generation table with the generation names and amendments filled in so they focus on bands and features.",
   "Extend: Ask fast finishers to explain how multi-link operation in Wi-Fi 7 could improve reliability for a latency-sensitive application, and what both the client and AP must support for it to work."
  ]
 },
 {
  "t": "802.11 PHYs: DSSS/HR-DSSS (b), OFDM (a), ERP (g), HT (n), VHT (ac), HE (ax)",
  "objectives": [
   "Students will be able to name each 802.11 PHY (DSSS, HR-DSSS, OFDM, ERP, HT, VHT, HE) and the amendment that defined it.",
   "Students will be able to state the frequency bands and maximum data rates for each PHY.",
   "Students will be able to explain why ERP protection mechanisms reduce throughput when legacy devices are present.",
   "Students will be able to recommend whether legacy data rates can be disabled based on a client PHY inventory."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a mock survey-tool table listing clients with PHY types. Ask students to guess what HE, HT and HR-DSSS mean and which device is oldest."
   ],
   [
    15,
    "Teach",
    "Walk through the PHYs in chronological order on the whiteboard, building a table with columns for amendment, PHY name, bands and peak rate. Emphasize the 5 GHz-only and 2.4 GHz-only PHYs, then explain ERP protection with a quick sketch of a CTS-to-self."
   ],
   [
    15,
    "Activity",
    "Run the PHY card sort described below in small groups, then have each group defend one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Ask the class what they would do about the single legacy device in the warm-up table, and collect trade-offs on the board."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper or sticky notes and hand them in."
   ]
  ],
  "warmup": "If a brand-new access point supports Wi-Fi 6, why might one 15-year-old printer still make the whole 2.4 GHz network slower?",
  "activity": {
   "title": "PHY card sort and band map",
   "materials": "Printed index cards (one per fact: PHY names, amendment letters, bands, peak rates, key features), whiteboard divided into 2.4 GHz, 5 GHz and 6 GHz columns, tape or sticky notes.",
   "steps": [
    "Give each group a shuffled deck of cards containing PHY names, amendment letters, data rates and features such as CCK, MIMO, 256-QAM and OFDMA.",
    "Groups match each PHY name to its amendment, peak rate and key features, forming one row per PHY on their desk.",
    "Each group then places its PHY rows on the whiteboard under every band where that PHY can operate, which forces them to put HT and HE in more than one column.",
    "The teacher reviews the board, correcting errors and asking a different group to justify each placement.",
    "Finish by having groups circle the PHYs that would trigger protection on a 2.4 GHz HE radio."
   ]
  },
  "discussion": [
   "When is it reasonable to keep legacy 802.11b rates enabled, and who should make that decision?",
   "Why do you think the standard names PHYs by technology rather than by amendment letter?"
  ],
  "exit": [
   [
    "Which PHY does 802.11ac define, and in which band does it operate?",
    "VHT, in 5 GHz only."
   ],
   [
    "What three conditions are needed for HT to reach 600 Mbps?",
    "Four spatial streams, a 40 MHz channel and a short guard interval."
   ],
   [
    "Why can one HR-DSSS client reduce throughput for ERP and HT clients on the same radio?",
    "It forces protection mechanisms and slow frames that consume shared airtime."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed PHY table with the amendment letters filled in, and let students add bands and rates first before tackling features.",
   "Extend: Ask fast finishers to explain how narrower HE subcarrier spacing and longer symbols improve robustness, and why the peak rate figures assume conditions few clients meet."
  ]
 },
 {
  "t": "2.4 GHz channels, channel overlap and the 1/6/11 plan",
  "objectives": [
   "Students will be able to calculate 2.4 GHz channel center frequencies and explain why adjacent channel numbers overlap.",
   "Students will be able to explain why 1, 6 and 11 is the non-overlapping channel plan when channels 1 to 11 are allowed.",
   "Students will be able to compare co-channel contention and adjacent channel interference in terms of cause and effect on frames.",
   "Students will be able to design a basic 2.4 GHz channel plan for a floor with several access points."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick guesses. Write the answers on the board without correcting them yet."
   ],
   [
    15,
    "Teach",
    "Draw the 2.4 GHz band to scale on the whiteboard, marking 5 MHz center spacing and a 22 MHz wide signal on channel 1. Show visually that 1, 6 and 11 do not overlap, then contrast CCC and ACI with two sketches."
   ],
   [
    15,
    "Activity",
    "Run the floor plan channel assignment activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up guesses and ask pairs which plans produced ACI and why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you had eleven channels to choose from, why would an expert tell you to use only three of them?",
  "activity": {
   "title": "Paint the floor: 2.4 GHz channel assignment",
   "materials": "Printed simple floor plan with eight access point locations, three colors of markers or sticky notes (one color each for channels 1, 6 and 11), a strip of paper scaled to show 22 MHz signal width.",
   "steps": [
    "Give each pair a floor plan and have them first lay the paper strip over a drawn 2.4 GHz band to see which channels a signal on channel 1 touches.",
    "Pairs assign channels 1, 6 and 11 to the eight access points so that adjacent cells differ as much as possible, marking each with its color.",
    "Pairs swap plans with another pair and circle any neighboring access points on the same channel (CCC) or any use of channels other than 1, 6 and 11 (ACI).",
    "The teacher introduces a twist: two access points are very close together. Pairs decide whether to lower power or disable one 2.4 GHz radio.",
    "Two pairs present their final plan and reasoning to the class."
   ]
  },
  "discussion": [
   "Why might a network with fewer 2.4 GHz radios perform better than one with more?",
   "What would you tell a manager who wants to use channel 13 in a United States office?"
  ],
  "exit": [
   [
    "What is the spacing between 2.4 GHz channel center frequencies?",
    "5 MHz."
   ],
   [
    "Which causes frame corruption, co-channel contention or adjacent channel interference?",
    "Adjacent channel interference, because devices cannot decode each other and transmit over each other."
   ],
   [
    "Name the non-overlapping channel set used when channels 1 to 11 are allowed.",
    "Channels 1, 6 and 11."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn band chart with signal widths shaded so they can see overlap before doing any arithmetic.",
   "Extend: Ask fast finishers to explain why some designers use 1, 5, 9 and 13 for OFDM-only networks where 13 channels are allowed, and what risks that plan carries."
  ]
 },
 {
  "t": "5 GHz U-NII bands, 20/40/80/160 MHz channel bonding and channel numbering",
  "objectives": [
   "Students will be able to list the US 5 GHz U-NII bands with their channel ranges and identify which require DFS.",
   "Students will be able to calculate a 5 GHz center frequency from a channel number.",
   "Students will be able to explain channel bonding, the role of the primary channel and center channel naming.",
   "Students will be able to justify a channel width choice based on deployment density."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students vote by show of hands for 20, 40, 80 or 160 MHz for a busy hospital."
   ],
   [
    15,
    "Teach",
    "Draw the 5 GHz band as a long strip on the whiteboard, labeling U-NII-1, 2A, 2C and 3 with channel numbers. Demonstrate the 5000 + 5n formula with two examples, then bracket channels to show 40, 80 and 160 MHz blocks and point out the primary channel."
   ],
   [
    15,
    "Activity",
    "Run the channel budget activity in small groups."
   ],
   [
    5,
    "Discuss",
    "Compare group results and revisit the warm-up vote."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the exit questions."
   ]
  ],
  "warmup": "If a wider channel is faster, why would an experienced engineer choose a narrower one for a busy hospital?",
  "activity": {
   "title": "Channel budget challenge",
   "materials": "Printed 5 GHz channel strip (36 to 165) per group, colored pencils, a scenario card listing a building with 40 access points, calculators or student laptops with a browser calculator.",
   "steps": [
    "Groups shade the DFS channels on their strip and count the 20 MHz channels with and without DFS.",
    "Groups bracket channels into 40 MHz and 80 MHz blocks and count how many of each are available.",
    "Using the scenario card, groups calculate roughly how many access points would share each channel at 20, 40 and 80 MHz.",
    "Groups convert three random channel numbers to center frequencies using the formula and check each other's math.",
    "Each group writes a one-sentence width recommendation and the main reason on the whiteboard."
   ]
  },
  "discussion": [
   "When would excluding DFS channels be the right decision despite losing so many channels?",
   "How does the fact that many clients cannot use 160 MHz change the value of enabling it?"
  ],
  "exit": [
   [
    "What is the center frequency of channel 100?",
    "5500 MHz."
   ],
   [
    "On which channel are beacons sent in a bonded 80 MHz BSS?",
    "The primary 20 MHz channel."
   ],
   [
    "Which U-NII band contains channels 149 to 165?",
    "U-NII-3."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card with the formula and the U-NII band boundaries, and pair struggling students with a partner for the counting steps.",
   "Extend: Ask fast finishers to work out how SNR changes from 20 MHz to 160 MHz and explain how that could lower a client's modulation rate."
  ]
 },
 {
  "t": "6 GHz operation: WPA3 or Enhanced Open requirement and preferred scanning channels",
  "objectives": [
   "Students will be able to identify which security configurations are permitted on a 6 GHz BSS and explain why WPA2 SSIDs fail there.",
   "Students will be able to explain how PSCs, RNR, FILS Discovery and unsolicited probe responses help clients discover 6 GHz access points.",
   "Students will be able to compare the LPI, Standard Power and VLP device classes and the role of AFC.",
   "Students will be able to troubleshoot a scenario where clients do not use an available 6 GHz radio."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the hook scenario aloud and ask students to list possible reasons new laptops are not joining 6 GHz."
   ],
   [
    15,
    "Teach",
    "Present the 6 GHz rules in three blocks on the board: security, discovery and power classes. Show a simple diagram of a 5 GHz beacon carrying an RNR that points to a 6 GHz BSS on a PSC."
   ],
   [
    15,
    "Activity",
    "Run the 6 GHz readiness review in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share which configurations they rejected and why, then revisit the warm-up list."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A new band with lots of empty channels is available, but nobody is using it. List three things that might keep devices away.",
  "activity": {
   "title": "6 GHz readiness review",
   "materials": "Printed configuration cards describing six SSIDs (security type, PMF setting, primary channel, RNR on or off), a PSC reference list, whiteboard for tallying.",
   "steps": [
    "Each pair receives the six configuration cards and the PSC reference list.",
    "Pairs mark each SSID as ready or not ready for 6 GHz and write the specific reason, such as WPA2-only, PMF disabled or primary not on a PSC.",
    "For each not-ready SSID, pairs write the minimum change needed to fix it.",
    "Pairs compare answers with a neighboring pair and resolve disagreements.",
    "The teacher tallies results on the whiteboard and highlights the most common error."
   ]
  },
  "discussion": [
   "What transition plan would you propose for an organization with many WPA2-only devices that wants to add 6 GHz?",
   "Why might regulators require a database check (AFC) for Standard Power devices but not for LPI devices?"
  ],
  "exit": [
   [
    "Can a WPA2-Personal SSID be offered on a 6 GHz radio?",
    "No. 6 GHz requires WPA3 or Enhanced Open with PMF."
   ],
   [
    "Where is the Reduced Neighbor Report element sent?",
    "In 2.4 and 5 GHz beacons and probe responses, advertising co-located 6 GHz BSSs."
   ],
   [
    "Why should a 6 GHz primary channel be on a PSC?",
    "Clients scan PSCs first, so the BSS is discovered quickly."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist of the three requirements (security, PSC, RNR) to apply to each configuration card.",
   "Extend: Ask fast finishers to calculate the center frequencies of the first three PSCs using the 5950 + 5n formula and explain why one PSC per 80 MHz block is enough."
  ]
 },
 {
  "t": "DFS and TPC requirements in 5 GHz radar bands",
  "objectives": [
   "Students will be able to identify which US 5 GHz bands require DFS and explain why.",
   "Students will be able to sequence the DFS stages: Channel Availability Check, in-service monitoring, channel move with a Channel Switch Announcement and non-occupancy period.",
   "Students will be able to distinguish 802.11h TPC from vendor automatic power control.",
   "Students will be able to recommend channel plan changes based on radar event logs."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas about who else might use 5 GHz radio frequencies."
   ],
   [
    15,
    "Teach",
    "Explain radar priority, then draw a timeline on the whiteboard showing CAC, operation with monitoring, radar detection, the Channel Switch Announcement and the 30-minute lockout. Finish with TPC and the Power Constraint element."
   ],
   [
    15,
    "Activity",
    "Run the radar log investigation in small groups."
   ],
   [
    5,
    "Discuss",
    "Groups share their recommendations and the class debates excluding channels versus excluding all DFS."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Wi-Fi does not need a license to use 5 GHz. Who do you think has priority in that band, and how would a Wi-Fi device know they are there?",
  "activity": {
   "title": "Radar log investigation",
   "materials": "Printed mock controller event log (one page) showing radar detections by access point, channel and time over a week; a printed site map marking an airport nearby; highlighters.",
   "steps": [
    "Groups highlight every radar detection event and tally them by channel and by access point.",
    "Groups mark on the site map which access points are affected and look for a geographic pattern.",
    "Groups identify which events show the access point moving channels and estimate how long each channel was locked out.",
    "Groups write a recommendation: which channels to exclude, for which access points, and why they are not excluding all DFS channels.",
    "One spokesperson per group presents the recommendation in under a minute."
   ]
  },
  "discussion": [
   "What trade-offs come with removing DFS channels from a design?",
   "How should a network team respond if users complain about brief drops that turn out to be false radar detections?"
  ],
  "exit": [
   [
    "Which two US U-NII bands require DFS?",
    "U-NII-2A and U-NII-2C."
   ],
   [
    "List the DFS stages in order.",
    "Channel Availability Check, in-service monitoring, move off with a Channel Switch Announcement on detection, non-occupancy period."
   ],
   [
    "What does the Power Constraint element do?",
    "It tells clients how far below the regulatory maximum to set their transmit power, as part of TPC."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in timeline with the four DFS stages as blanks and a word bank.",
   "Extend: Ask fast finishers to explain how DFS affects passive versus active scanning and how that could slow roaming for voice clients."
  ]
 },
 {
  "t": "802.11ax features: OFDMA resource units, 1024-QAM, BSS coloring, Target Wake Time, uplink MU-MIMO",
  "objectives": [
   "Students will be able to explain how OFDMA resource units let one transmission serve multiple clients, including RU sizes.",
   "Students will be able to describe the purpose of BSS coloring, Target Wake Time and 1024-QAM.",
   "Students will be able to compare OFDMA and MU-MIMO and state which directions each amendment supports.",
   "Students will be able to match 802.11ax features to deployment problems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let a few students answer."
   ],
   [
    15,
    "Teach",
    "Draw a 20 MHz channel on the whiteboard and divide it into nine RUs, then one 242-tone RU. Explain trigger frames, then cover 1024-QAM, BSS coloring, TWT and uplink MU-MIMO with a one-line sketch each."
   ],
   [
    15,
    "Activity",
    "Run the feature-to-problem matching role-play."
   ],
   [
    5,
    "Discuss",
    "Review which matches were debated and clear up OFDMA versus MU-MIMO confusion."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Why might a room full of people sending tiny chat messages be harder on Wi-Fi than one person downloading a huge file?",
  "activity": {
   "title": "Who needs which feature",
   "materials": "Printed problem cards (dense lecture hall, battery-powered sensors, overlapping cells on the same channel, client next to the access point wanting peak speed, video upload from several cameras), printed feature cards (OFDMA, 1024-QAM, BSS coloring, TWT, uplink MU-MIMO), sticky notes.",
   "steps": [
    "Divide the class into groups and give each group a full set of problem and feature cards.",
    "Groups match each problem to the feature that best addresses it, writing the reason on a sticky note.",
    "One student in each group plays the access point and explains aloud how it would handle the lecture hall scenario using RUs and trigger frames.",
    "Groups trade one disputed match with another group and debate it.",
    "The teacher reveals the intended matches and notes where more than one feature applies."
   ]
  },
  "discussion": [
   "Why might a new Wi-Fi 6 deployment show little improvement in a building full of older clients?",
   "Is spatial reuse with BSS coloring risky? What might go wrong if thresholds are too aggressive?"
  ],
  "exit": [
   [
    "How many 26-tone RUs fit in a 20 MHz channel?",
    "Nine."
   ],
   [
    "Which 802.11ax feature saves battery by scheduling when clients wake?",
    "Target Wake Time."
   ],
   [
    "What does OFDMA divide, and what does MU-MIMO divide?",
    "OFDMA divides frequency into resource units; MU-MIMO divides space into spatial streams."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page feature summary table with plain-language descriptions to use during the matching activity.",
   "Extend: Ask fast finishers to explain why 1024-QAM needs a higher SNR than 256-QAM and what happens to a client's MCS as it walks away from the access point."
  ]
 },
 {
  "t": "Roaming and management amendments: 802.11k, 802.11r, 802.11v and 802.11w",
  "objectives": [
   "Students will be able to state the purpose of 802.11k, 802.11v, 802.11r and 802.11w and match each to the problem it solves.",
   "Students will be able to explain why 802.11r is critical for voice clients on 802.1X networks.",
   "Students will be able to explain why roaming remains a client decision even with 802.11v.",
   "Students will be able to identify the frame elements that advertise support for each amendment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas on the board."
   ],
   [
    15,
    "Teach",
    "Present each amendment as a problem and a fix, writing a four-row table on the whiteboard. Sketch a full roam with EAP versus an FT roam to show the time saved, then cover PMF and forged deauthentication frames at a recognition level."
   ],
   [
    15,
    "Activity",
    "Run the roaming help desk role-play."
   ],
   [
    5,
    "Discuss",
    "Debrief which tickets were tricky and why client support matters."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "When you walk from one room to another on a phone call over Wi-Fi, what has to happen behind the scenes for the call to keep going?",
  "activity": {
   "title": "Roaming help desk",
   "materials": "Printed help desk ticket cards (six symptoms such as slow scans, sticky clients, long EAP exchanges on roam, forged deauthentication alerts), printed amendment cards (k, v, r, w), a projector showing a simplified beacon element list.",
   "steps": [
    "Split students into pairs: one plays a user describing a ticket, the other plays the wireless engineer.",
    "The engineer chooses the amendment card that fixes the ticket and explains the fix in one or two sentences.",
    "Pairs switch roles after three tickets.",
    "Using the projected beacon element list, pairs identify which element advertises each amendment (RSN, Mobility Domain, Extended Capabilities, RM Enabled Capabilities).",
    "The teacher picks two pairs to perform their hardest ticket for the class."
   ]
  },
  "discussion": [
   "Why might enabling all four amendments at once cause problems for some older clients, and how would you roll them out safely?",
   "Should the network ever be allowed to force a client to roam? What are the risks either way?"
  ],
  "exit": [
   [
    "Which amendment provides BSS Transition Management?",
    "802.11v."
   ],
   [
    "Which amendment pre-distributes keys so a client avoids a full 802.1X exchange when roaming?",
    "802.11r, Fast BSS Transition."
   ],
   [
    "Which frames does 802.11w protect?",
    "Deauthentication, disassociation and robust action frames."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the mnemonic card (know, voice, rapid, watch) and a simplified ticket set with clear symptoms.",
   "Extend: Ask fast finishers to describe what a protocol analyzer capture of an FT roam would show compared with a full roam, frame by frame."
  ]
 },
 {
  "t": "Regulatory power limits, EIRP rules and why they vary by country",
  "objectives": [
   "Students will be able to explain why Wi-Fi channel and power rules vary by country and identify common regulators.",
   "Students will be able to calculate EIRP from transmit power, cable loss and antenna gain.",
   "Students will be able to apply the FCC 3:1 rule to a 2.4 GHz point-to-point link.",
   "Students will be able to identify the administrator's responsibilities for country code and antenna certification."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a few answers."
   ],
   [
    15,
    "Teach",
    "Explain regulatory domains and country codes, list what regulators control, then write the EIRP formula on the whiteboard and work two examples. Finish with the PtMP limit and the 3:1 rule."
   ],
   [
    15,
    "Activity",
    "Run the compliance inspector activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Review the trickiest inspection cards and discuss responsibility."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "If you bought an access point in one country and plugged it in on another continent, what could go wrong legally?",
  "activity": {
   "title": "Compliance inspector",
   "materials": "Printed inspection cards describing installations (country, band, transmit power, cable loss, antenna gain, PtMP or PtP), a printed reference sheet with the EIRP formula, the US 2.4 GHz PtMP limit and the 3:1 rule, calculators or student laptops with a browser calculator.",
   "steps": [
    "Each pair receives six inspection cards and the reference sheet.",
    "Pairs calculate EIRP for each installation and record it on the card.",
    "Pairs mark each installation compliant or not compliant and write the reason, such as excess EIRP, wrong country code or uncertified antenna.",
    "For each non-compliant card, pairs write the smallest change that would make it legal, such as lowering power by a specific number of dB.",
    "Pairs swap cards with another pair to check calculations, then the teacher reviews answers on the projector or whiteboard."
   ]
  },
  "discussion": [
   "Why should a narrow-beam point-to-point link be allowed more EIRP than an omnidirectional access point?",
   "Who in an organization should own regulatory compliance for wireless equipment, and how would you document it?"
  ],
  "exit": [
   [
    "An access point transmits at 20 dBm with 2 dB cable loss into a 6 dBi antenna. What is the EIRP?",
    "24 dBm."
   ],
   [
    "Under the 3:1 rule, how much must transmitter power drop for a 15 dBi antenna on a 2.4 GHz PtP link?",
    "3 dB, because 15 dBi is 9 dB above 6 dBi."
   ],
   [
    "Who is responsible for setting the correct country code?",
    "The administrator or installer who configures the equipment."
   ]
  ],
  "differentiation": [
   "Support: Provide a worked example card showing each step of the EIRP calculation and a dB-to-milliwatt reference table.",
   "Extend: Ask fast finishers to explain how swapping an antenna changes both EIRP and coverage pattern, and why certification lists include antenna types as well as gain."
  ]
 },
 {
  "t": "802.11 frame types: management, control and data, and common subtypes (beacon, probe, auth, assoc, ACK, RTS/CTS, null data)",
  "objectives": [
   "Students will be able to classify common 802.11 frames as management, control or data.",
   "Students will be able to explain the purpose of beacons, probes, authentication, association, ACK, RTS/CTS and null data frames.",
   "Students will be able to explain why only unicast frames are acknowledged and why beacons use basic rates.",
   "Students will be able to use frame type filters to isolate frames in a capture."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a short, printed-style list of frame names and ask students to guess which belong together."
   ],
   [
    15,
    "Teach",
    "Draw three columns on the whiteboard, management, control and data, and fill them with frames while explaining each frame's job. Highlight the null data frame and the ACK rules, then show the Wireshark type filters on the projector."
   ],
   [
    15,
    "Activity",
    "Run the frame family card sort and timeline build."
   ],
   [
    5,
    "Discuss",
    "Review the timelines and ask what each group would check after a deauthentication."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "Wi-Fi devices exchange thousands of small messages per second. If you had to sort them into three piles by job, what piles would you make?",
  "activity": {
   "title": "Frame families and the connection timeline",
   "materials": "Printed frame cards (beacon, probe request, probe response, authentication, association request, association response, ACK, RTS, CTS, Block Ack, PS-Poll, trigger, QoS Data, null data, deauthentication, action), whiteboard divided into three columns, tape.",
   "steps": [
    "Groups sort their cards into management, control and data piles and tape them under the right column on the whiteboard.",
    "The teacher reviews the board and corrects any misplaced cards, especially null data and action frames.",
    "Groups then use a second set of cards to build a timeline of a client joining a network, sending data and leaving.",
    "Groups mark which frames in their timeline would be acknowledged and which would not.",
    "Each group explains one frame in its timeline and what a problem at that point would look like."
   ]
  },
  "discussion": [
   "Why is it useful that deauthentication frames include a reason code?",
   "How could disabling low basic data rates change the amount of airtime beacons consume?"
  ],
  "exit": [
   [
    "Classify these frames: beacon, CTS, QoS Null.",
    "Beacon is management, CTS is control, QoS Null is data."
   ],
   [
    "What happens when a sender does not receive an ACK for a unicast frame?",
    "It retransmits the frame with the Retry bit set."
   ],
   [
    "Which Wireshark filter shows only control frames?",
    "wlan.fc.type == 1."
   ]
  ],
  "differentiation": [
   "Support: Provide a color-coded reference sheet with each frame's type and one-line purpose for students to consult while sorting.",
   "Extend: Ask fast finishers to explain how Block Ack changes the ACK pattern for aggregated frames and why that improves efficiency."
  ]
 },
 {
  "t": "Frame addressing: BSSID, SSID/ESSID, source, destination, transmitter and receiver addresses",
  "objectives": [
   "Students will be able to distinguish SSID, ESSID and BSSID.",
   "Students will be able to define the source, destination, transmitter and receiver address roles.",
   "Students will be able to interpret Address 1 to 4 for each To DS and From DS combination.",
   "Students will be able to use frame addressing to determine where a frame stopped in a troubleshooting scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students suggest why a Wi-Fi frame might need extra addresses."
   ],
   [
    15,
    "Teach",
    "Define SSID, BSSID and ESS with a sketch of three access points sharing one SSID. Draw the To DS and From DS table on the whiteboard, then walk a ping from a laptop to a server and back, filling in the addresses each way."
   ],
   [
    15,
    "Activity",
    "Run the human frame role-play."
   ],
   [
    5,
    "Discuss",
    "Discuss how an ACK proves delivery to the access point and when four addresses are needed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "When you mail a package through your office mailroom, how many names or locations might end up written on it, and why?",
  "activity": {
   "title": "Be the frame",
   "materials": "Printed name badges (Laptop, Access Point/BSSID, Server, Mesh AP), blank frame cards with four address boxes and To DS and From DS checkboxes, whiteboard with the address table.",
   "steps": [
    "Assign students to play the laptop, the access point, the server and a mesh access point.",
    "The laptop student fills in a frame card for a ping to the server, setting the bits and addresses, and physically hands it to the access point student.",
    "The class checks the card against the table, then the server student writes the reply and the access point student fills in a new frame card for the wireless leg.",
    "Repeat with a mesh scenario where the access point must hand the frame to the mesh access point, requiring four addresses.",
    "Finally, the access point student writes an ACK card with only a receiver address, and the class discusses what it proves."
   ]
  },
  "discussion": [
   "Why does the BSSID need to be in every frame within a BSS, even when the access point is not the source or destination?",
   "How would reading addresses help you decide whether a problem is on the wireless or wired side?"
  ],
  "exit": [
   [
    "Which address field always holds the receiver address?",
    "Address 1."
   ],
   [
    "With To DS = 1 and From DS = 0, what are Address 1, 2 and 3?",
    "BSSID (receiver), source (transmitter), destination."
   ],
   [
    "What is an ESSID?",
    "The SSID shared by all BSSs in an extended service set."
   ]
  ],
  "differentiation": [
   "Support: Give students a laminated copy of the address table and have them complete only the To DS and From DS cases first before attempting four-address frames.",
   "Extend: Ask fast finishers to explain why Address 3 in a To DS frame holds the default gateway's MAC address when the server is on another subnet."
  ]
 },
 {
  "t": "Joining a BSS: passive and active scanning, open system authentication, association and the 4-way handshake",
  "objectives": [
   "Students will be able to sequence the steps a client takes to join a BSS, from scanning to the 4-way handshake.",
   "Students will be able to compare passive and active scanning and explain why Open System authentication is not a security control.",
   "Students will be able to describe what each message of the 4-way handshake does and which keys result.",
   "Students will be able to identify the failing step in a connection from a description of a capture."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student guesses on the board."
   ],
   [
    15,
    "Teach",
    "Draw a vertical ladder diagram between a client and an access point on the whiteboard, adding scanning, authentication, association, EAP and the four EAPOL-Key messages one by one, and labeling the keys created."
   ],
   [
    15,
    "Activity",
    "Run the broken connection detective activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Review each scenario and connect the failing step to the likely cause."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "When your phone joins a Wi-Fi network, how many separate steps do you think happen before you can load a web page?",
  "activity": {
   "title": "Broken connection detective",
   "materials": "Printed ladder diagram templates, six scenario cards each describing a capture that stops at a different point (no probe response, association rejected, EAP-Failure, no message 3, success), colored pens, whiteboard.",
   "steps": [
    "Each pair draws the full join sequence on a ladder template as a reference.",
    "Pairs receive the scenario cards and, for each one, circle the last successful step on their diagram.",
    "Pairs write the most likely cause and the next place to look, such as RADIUS logs or the passphrase.",
    "Pairs compare with a neighboring pair and resolve differences.",
    "The teacher reveals the intended answers and asks one pair per scenario to explain their reasoning."
   ]
  },
  "discussion": [
   "Why do you think the 802.11 standard kept Open System authentication even though it provides no security?",
   "How does knowing the join sequence help you explain to a user why their device cannot connect?"
  ],
  "exit": [
   [
    "Put these in order: association, 4-way handshake, scanning, 802.11 authentication.",
    "Scanning, 802.11 authentication, association, 4-way handshake."
   ],
   [
    "What does the client send in message 2 of the 4-way handshake?",
    "Its SNonce and a MIC."
   ],
   [
    "Which key protects broadcast and multicast traffic?",
    "The Group Temporal Key (GTK)."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-labeled ladder diagram with blanks for the frame names and a word bank.",
   "Extend: Ask fast finishers to explain how a WPA3-Personal join differs, including the four SAE authentication frames, and why SAE resists offline password guessing."
  ]
 },
 {
  "t": "Medium access: CSMA/CA, DCF, physical carrier sense (CCA) and virtual carrier sense (NAV)",
  "objectives": [
   "Students will be able to explain why 802.11 uses CSMA/CA instead of collision detection.",
   "Students will be able to describe how DCF uses carrier sense, interframe spaces, random backoff and ACKs.",
   "Students will be able to compare physical carrier sense (CCA signal detect and energy detect) with virtual carrier sense (NAV).",
   "Students will be able to diagnose a hidden node problem and recommend a fix."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have two volunteers try talking at once to show why listening first matters."
   ],
   [
    15,
    "Teach",
    "Draw a timeline on the whiteboard showing a frame, its ACK and the Duration-based NAV on a third station. Add the CCA thresholds on a vertical dBm scale and finish with a sketch of the hidden node problem."
   ],
   [
    15,
    "Activity",
    "Run the classroom CSMA/CA simulation."
   ],
   [
    5,
    "Discuss",
    "Debrief what happened in each round and connect it to CCA, NAV and hidden nodes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "If everyone in a dark room wanted to speak but could not see each other, what rules would you invent so people do not talk over each other?",
  "activity": {
   "title": "Human CSMA/CA",
   "materials": "Printed role cards (access point, stations, hidden station), a dice or random number cards for backoff, sticky notes to show NAV values, a cardboard or paper divider to block line of sight, whiteboard to tally collisions.",
   "steps": [
    "Seat students as stations around an access point student. To transmit, a station must check that nobody is speaking, roll for a backoff count, count down silently and then speak a short message to the access point.",
    "The access point responds with ACK after each clean message; if two speak at once, it stays silent and the senders must retry.",
    "In round two, speakers announce a duration (for example, five seconds) and listeners hold a sticky note showing their NAV until it expires.",
    "In round three, place the divider so two stations cannot see or hear each other well and count the collisions at the access point.",
    "In round four, the stations must send an RTS and wait for the access point's CTS before speaking; compare collision counts with round three."
   ]
  },
  "discussion": [
   "Why might non-Wi-Fi interference cause more damage than a neighboring Wi-Fi network on the same channel?",
   "What are the costs of turning on RTS/CTS for every frame?"
  ],
  "exit": [
   [
    "What are the two parts of physical carrier sense?",
    "Signal detect (preamble detect) and energy detect, both part of CCA."
   ],
   [
    "What field sets the NAV?",
    "The Duration/ID field in frames the station hears."
   ],
   [
    "Why do hidden nodes collide at the access point?",
    "They cannot hear each other, so each sees an idle medium and transmits at the same time."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page diagram showing CCA and NAV side by side with plain-language labels, and let struggling students play the access point role first.",
   "Extend: Ask fast finishers to explain how a CTS frame's Duration value relates to the RTS frame's Duration value and why the CTS duration is smaller."
  ]
 },
 {
  "t": "Interframe spaces (SIFS, DIFS, AIFS), random backoff and contention windows",
  "objectives": [
   "Students will be able to order SIFS, PIFS, DIFS, AIFS and EIFS by length and state where each is used.",
   "Students will be able to calculate DIFS and AIFS from a given SIFS, slot time and AIFSN.",
   "Students will be able to explain how random backoff, a frozen countdown and contention window doubling reduce collisions.",
   "Students will be able to relate high retry rates to longer contention and lower channel throughput."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect two or three answers. Point out that a shared channel needs a fair way to decide who talks next."
   ],
   [
    15,
    "Teach",
    "Draw a timeline on the whiteboard: busy medium, then SIFS, PIFS, DIFS and AIFS bars of increasing length. Walk through the formulas with OFDM values (SIFS 16, slot 9). Then show a backoff countdown that freezes when another station transmits, and how CW doubles after a missing ACK."
   ],
   [
    15,
    "Activity",
    "Run the Backoff Race simulation described below. Groups play three rounds and record winners, collisions and the CW each player used."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the game results to QoS priority and to why crowded channels feel slow."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "Five people share one walkie-talkie channel and all want to speak right after the current speaker finishes. What rule would you invent so they do not all talk at once?",
  "activity": {
   "title": "Backoff Race",
   "materials": "Whiteboard, printed role cards (Voice: AIFSN 2, CWmin 3; Video: AIFSN 2, CWmin 7; Best effort: AIFSN 3, CWmin 15; Background: AIFSN 7, CWmin 15), dice or a random number app on student laptops, scrap paper for tallies.",
   "steps": [
    "Split the class into groups of four and hand each student one role card.",
    "Each round, every student computes their AIFS in slots (AIFSN) and adds a random backoff between 0 and their current CW. The lowest total wins the medium.",
    "If two or more students tie for lowest, it is a collision: each collided player doubles their CW (3 becomes 7, 15 becomes 31) for the next round. Winners reset to CWmin.",
    "Play ten rounds, recording winners, collisions and current CW values in a table.",
    "Groups total how often each access category won and report whether background ever won, and why."
   ]
  },
  "discussion": [
   "Why does it make sense for ACKs to use the shortest interframe space instead of contending like any other frame?",
   "In your game, what happened to waiting times after several collisions, and how would that feel to a user on a busy channel?",
   "If background traffic occasionally won, does that mean WMM is broken? Why or why not?"
  ],
  "exit": [
   [
    "Put these in order from shortest to longest: DIFS, SIFS, PIFS.",
    "SIFS, PIFS, DIFS."
   ],
   [
    "With SIFS 16 microseconds and a 9 microsecond slot, what is AIFS for an AIFSN of 3?",
    "16 + 3 x 9 = 43 microseconds."
   ],
   [
    "What does a station do to its contention window when it does not receive an ACK?",
    "It roughly doubles the window, up to CWmax, sets the Retry flag and backs off again."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn timeline with labeled bars and have them fill in only the formula values, and pair them with a partner for the calculation step of the game.",
   "Extend: Ask fast finishers to calculate DIFS for DSSS (SIFS 10, slot 20) and ERP short slot (SIFS 10, slot 9) and explain why a mixed 2.4 GHz network using long slots is slower."
  ]
 },
 {
  "t": "QoS with WMM/EDCA access categories: voice, video, best effort and background",
  "objectives": [
   "Students will be able to list the four WMM access categories in priority order and map 802.1D user priorities to them.",
   "Students will be able to explain how AIFSN, contention windows and TXOP limits create statistical priority.",
   "Students will be able to trace a QoS marking from DSCP on the wire to user priority over the air and back.",
   "Students will be able to diagnose a voice quality problem caused by lost or rewritten markings."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers on the whiteboard under urgent and can wait."
   ],
   [
    15,
    "Teach",
    "Present the four access categories and the UP table. Show a sample EDCA Parameter Set from a beacon on the projector and explain AIFSN, CWmin, CWmax and TXOP. Draw the end-to-end path from phone to AP to switch to call server, marking where DSCP and UP live."
   ],
   [
    15,
    "Activity",
    "Run Follow the Marking: teams trace printed packet cards through a network map and find where priority is lost."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, focusing on why WMM alone is not enough."
   ],
   [
    5,
    "Exit ticket",
    "Collect answers to the three exit questions."
   ]
  ],
  "warmup": "If you could tell the network that one kind of traffic matters more than all others, which would you pick for a hospital, and which could safely wait?",
  "activity": {
   "title": "Follow the Marking",
   "materials": "Projector, printed network map (phone, AP, two switches, controller, call server), printed packet cards showing DSCP and UP values at each hop, sticky notes, whiteboard.",
   "steps": [
    "Give each team a network map and a deck of packet cards showing a voice packet's markings at each hop, with one hop deliberately wrong in each scenario.",
    "Teams place cards on the map in order and use the UP and DSCP tables to decide which access category the packet ends up in over the air.",
    "Each team marks the hop where priority was lost on a sticky note and writes the fix (switch trust, AP mapping table, controller tunnel marking).",
    "Swap scenarios between teams for a second round.",
    "Teams present one scenario each to the class in under a minute."
   ]
  },
  "discussion": [
   "Why might the 802.1D designers have placed background below best effort instead of at UP 0?",
   "What could go wrong if every application on a network marked its own traffic as voice?",
   "When would admission control help, and when might it frustrate users?"
  ],
  "exit": [
   [
    "List the four WMM access categories from highest to lowest priority.",
    "Voice, video, best effort, background."
   ],
   [
    "Which access category does UP 1 map to?",
    "Background (AC_BK)."
   ],
   [
    "Voice frames arrive at the AP with DSCP 0 even though the phone marks them EF. What category will they use over the air, and what is the likely cause?",
    "Best effort; a switch on the path is not trusting or is rewriting the DSCP marking."
   ]
  ],
  "differentiation": [
   "Support: Provide a laminated UP-to-AC lookup card and give struggling teams scenarios with only one hop to inspect before moving to multi-hop paths.",
   "Extend: Ask fast finishers to explain how tunneled forwarding to a controller adds an outer header that must also be marked, and to sketch where the marking should be copied."
  ]
 },
 {
  "t": "Protection mechanisms: RTS/CTS and CTS-to-self",
  "objectives": [
   "Students will be able to explain why ERP and HT stations need protection when legacy stations are present.",
   "Students will be able to compare RTS/CTS and CTS-to-self in overhead and in their ability to address hidden nodes.",
   "Students will be able to identify protection in use from beacon fields and capture patterns.",
   "Students will be able to recommend design actions that reduce the throughput cost of protection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and have students discuss with a neighbor for two minutes."
   ],
   [
    15,
    "Teach",
    "Explain NAV and the Duration field. Draw a mixed 802.11b/g cell and show why the 802.11b station cannot decode OFDM. Then draw three stations in a line with the AP in the middle to show the hidden node problem, and step through RTS, CTS, data and ACK, and CTS-to-self."
   ],
   [
    15,
    "Activity",
    "Run Human Hidden Node: students act out stations, an AP and reservations across the room."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play to throughput cost and design choices."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "You are in a large room and want to talk to the person in the middle, but someone on the far side, whom you cannot hear, also wants to talk to them. How could the person in the middle keep you two from talking at once?",
  "activity": {
   "title": "Human Hidden Node",
   "materials": "Open floor space or a long row of desks, printed cards labeled RTS, CTS, CTS-to-self, DATA and ACK, a timer on the projector, masking tape or sticky notes to mark hearing ranges.",
   "steps": [
    "Place one student as the AP in the middle and two client students at opposite ends who must face away from each other and may only hear the AP.",
    "Round one: both clients hold up a DATA card at random times. Count collisions at the AP over one minute.",
    "Round two: clients use CTS-to-self, showing a CTS card only to students on their side. Observe that the far client still collides.",
    "Round three: clients send RTS to the AP, and the AP raises a CTS card that everyone can see. Count collisions and also count the extra cards shown.",
    "Groups record collisions and overhead cards per round and decide which method fits hidden nodes and which fits mixed PHYs."
   ]
  },
  "discussion": [
   "Why might a designer prefer to disable 802.11b rates rather than live with protection?",
   "In round three, collisions dropped but the number of cards went up. How does that trade-off show up in real throughput?",
   "Is lowering the RTS threshold a fix or a workaround for hidden nodes? What would a permanent fix look like?"
  ],
  "exit": [
   [
    "Which protection method addresses hidden nodes?",
    "RTS/CTS, because the receiver sends the CTS that stations near it can hear."
   ],
   [
    "What beacon field tells ERP clients to use protection?",
    "The Use_Protection bit in the ERP element."
   ],
   [
    "Name one way to reduce the throughput cost of protection in a 2.4 GHz network.",
    "Remove or replace legacy 802.11b devices, move them to wired, or disable 802.11b data rates so they cannot associate."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page diagram with the four frames of RTS/CTS already drawn and have them only label who sends each frame and who sets their NAV.",
   "Extend: Ask fast finishers to estimate why a CTS sent at 1 Mbps can take longer than a data frame sent at a high OFDM rate, and to describe what that means for a cell with many fast clients."
  ]
 },
 {
  "t": "Power management: power save bit, TIM, DTIM, U-APSD and Target Wake Time",
  "objectives": [
   "Students will be able to describe how a client enters power save and how the AP buffers its traffic.",
   "Students will be able to distinguish the roles of the TIM and the DTIM and explain the trade-off of the DTIM period.",
   "Students will be able to compare legacy PS-Poll, U-APSD and Target Wake Time.",
   "Students will be able to recommend power settings for a given device type and application."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let students vote by show of hands."
   ],
   [
    15,
    "Teach",
    "Draw a beacon timeline with beacon intervals and mark DTIM beacons for a DTIM period of 3. Show the TIM bitmap and an AID lookup. Step through PS-Poll with More Data, then U-APSD with a trigger and EOSP, then TWT with negotiated service periods."
   ],
   [
    15,
    "Activity",
    "Run the Mail Room Simulation: students play AP and clients and deliver paper messages using each power save method."
   ],
   [
    5,
    "Discuss",
    "Lead discussion on battery life versus latency for different devices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone could check for new messages every second or every minute. What would you gain and lose with each choice?",
  "activity": {
   "title": "Mail Room Simulation",
   "materials": "Sticky notes as frames, a whiteboard grid as the TIM bitmap with AID numbers, printed role cards (AP, voice badge, laptop, sensor), a metronome or timer app on the projector to tick off beacons.",
   "steps": [
    "Assign one student as the AP and four as clients with AIDs 1 to 4. Each tick of the timer is a beacon; every third tick is a DTIM.",
    "The teacher hands the AP sticky notes addressed to specific clients and some labeled ALL. The AP marks TIM bits on the whiteboard grid for unicast notes.",
    "Round one (PS-Poll): sleeping clients look up only at beacons; if their bit is set, they request one note at a time. ALL notes go out only on DTIM ticks.",
    "Round two (U-APSD): clients hand the AP a note as a trigger and receive all their waiting notes at once, with the last marked EOSP.",
    "Round three (TWT): the sensor agrees on a wake tick with the AP and ignores all other beacons. Compare how many times each client had to wake across the three rounds."
   ]
  },
  "discussion": [
   "Why might a voice badge vendor recommend a specific DTIM period instead of the longest possible one?",
   "How does TWT help not only battery life but also contention in a dense IoT deployment?",
   "What symptoms would you expect if a client never entered power save at all?"
  ],
  "exit": [
   [
    "Which beacon element shows that a sleeping client has buffered unicast frames?",
    "The TIM, with the bit for the client's AID set."
   ],
   [
    "What happens to multicast delivery if the DTIM period increases from 1 to 4?",
    "Multicast is delivered less often, only after every fourth beacon, so it is delayed but clients save battery."
   ],
   [
    "How does U-APSD improve on PS-Poll for voice?",
    "A single trigger frame retrieves all buffered frames for delivery-enabled categories in one service period instead of one frame per PS-Poll."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in beacon timeline with DTIM beacons shaded and a short glossary card for TIM, DTIM, PS-Poll, U-APSD and TWT.",
   "Extend: Ask fast finishers to calculate the maximum multicast delay for a 102.4 millisecond beacon interval with DTIM periods of 1, 3 and 5, and argue which fits a paging system."
  ]
 },
 {
  "t": "Aggregation and Block Ack; frame control flags such as Retry",
  "objectives": [
   "Students will be able to compare A-MSDU and A-MPDU structure, overhead and error resilience.",
   "Students will be able to describe how a Block Ack agreement is set up and how the bitmap drives retransmission.",
   "Students will be able to identify the purpose of the main Frame Control flags.",
   "Students will be able to calculate and interpret a retry percentage from capture counts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to the fixed cost of each transmission."
   ],
   [
    15,
    "Teach",
    "Draw an A-MSDU and an A-MPDU side by side on the whiteboard, labeling headers and FCS. Show the ADDBA handshake and a sample Block Ack bitmap. Project a Frame Control field diagram and walk through each flag, ending with Retry and the 10 percent rule of thumb."
   ],
   [
    15,
    "Activity",
    "Run Box Versus Pallet: teams simulate aggregates with paper cards and a random error die, then calculate retry percentages."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to tie results to real troubleshooting."
   ],
   [
    5,
    "Exit ticket",
    "Collect the three exit answers."
   ]
  ],
  "warmup": "If every trip to the post office cost you twenty minutes of travel, would you mail ten letters in ten trips or one trip? What could go wrong with one big trip?",
  "activity": {
   "title": "Box Versus Pallet",
   "materials": "Index cards (each card is one packet), envelopes (A-MSDU box), paper clips (A-MPDU pallet), a die or random number app on student laptops, whiteboard for tallies.",
   "steps": [
    "Each team builds eight A-MSDUs by putting four cards in an envelope, and eight A-MPDUs by clipping four separately labeled cards together.",
    "For each aggregate, roll the die once per card; a 1 means that card is corrupted.",
    "For an A-MSDU, any corrupted card means all four cards are resent. For an A-MPDU, only the corrupted cards are resent, and the team writes a Block Ack bitmap such as 1101.",
    "Teams count the cards sent in total, including retransmissions, and compute the percentage that were retries for each method.",
    "Teams compare results on the whiteboard and decide which method suits a noisy channel."
   ]
  },
  "discussion": [
   "When might A-MSDU still be a good choice even though it is less resilient?",
   "Why does a high retry rate hurt every client on a channel, not just the one retrying?",
   "How would you use the Retry flag to tell the difference between a single bad client and a channel-wide problem?"
  ],
  "exit": [
   [
    "Which aggregation method gives each subframe its own FCS?",
    "A-MPDU."
   ],
   [
    "A capture shows 2,000 data frames, 300 of them with Retry set. What is the retry rate, and is it a concern?",
    "15 percent; yes, it is above the roughly 10 percent level that usually indicates a problem."
   ],
   [
    "Name the frames used to set up and tear down a Block Ack agreement.",
    "ADDBA Request and ADDBA Response to set up, DELBA to tear down."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-labeled diagram of both aggregate types and a flag lookup table, and let them work in pairs with one student rolling and one recording.",
   "Extend: Ask fast finishers to write the Wireshark display filter for retransmitted frames and explain how they would measure the retry rate for one specific client."
  ]
 },
 {
  "t": "Client-driven roaming, reassociation and 802.11k/v assistance",
  "objectives": [
   "Students will be able to explain why Wi-Fi roaming is client driven and what that means for troubleshooting.",
   "Students will be able to describe the reassociation exchange and the security steps that follow it.",
   "Students will be able to distinguish the roles of 802.11k neighbor reports, 802.11v BTM and 802.11r.",
   "Students will be able to diagnose a sticky client scenario and recommend design changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and record student guesses about who decides to switch."
   ],
   [
    15,
    "Teach",
    "Draw three overlapping AP cells on the whiteboard and a client path. Mark a roaming threshold. Explain scanning, reassociation with the Current AP Address, and the key exchange. Add 802.11k, v and r as labels at the stage each one helps."
   ],
   [
    15,
    "Activity",
    "Run the Walk the Hallway role-play with students acting as APs and a client with a threshold card."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on sticky clients and forcing roams."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions."
   ]
  ],
  "warmup": "When your phone switches from one Wi-Fi access point to another as you walk through a building, who do you think makes that decision: the phone, the access point or a central controller?",
  "activity": {
   "title": "Walk the Hallway",
   "materials": "Open floor space, printed signal strength cards (-55, -65, -75, -85 dBm) for AP students to hold up, client threshold cards (-70 and -82 dBm), a printed neighbor report card, a BTM suggestion card.",
   "steps": [
    "Line up three students as APs along a hallway path; one student walks as the client holding a threshold card.",
    "As the client walks, each AP holds up the signal card for that distance. The client may only roam when the current AP falls below its threshold.",
    "Repeat with a -82 dBm client and note where it becomes sticky. Then hand the client a neighbor report card and time how quickly it picks a target.",
    "Let one AP offer a BTM suggestion card; the client decides to accept or decline and explains why.",
    "Groups write down where the roam happened for each threshold and which assistance changed the outcome."
   ]
  },
  "discussion": [
   "Why might a device vendor choose a very low roaming threshold, and what does that cost the network?",
   "When is it reasonable for an AP to disconnect a client to force a roam, and what are the risks?",
   "How would you prove with a capture that a client is sticky rather than that coverage is missing?"
  ],
  "exit": [
   [
    "Which amendment lets an AP suggest a better AP to a client?",
    "802.11v BSS Transition Management."
   ],
   [
    "What information does a reassociation request include that an association request does not?",
    "The BSSID of the client's current AP."
   ],
   [
    "Name two causes of sticky clients.",
    "High AP transmit power, a low client roaming threshold, or cell overlap that does not match the client's threshold."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page flow chart of the roam (threshold, scan, choose, reassociate, keys) and let students annotate where 802.11k, v and r fit.",
   "Extend: Ask fast finishers to compare the time cost of a full 802.1X/EAP exchange with PMK caching, OKC and 802.11r and explain which fits a voice deployment."
  ]
 },
 {
  "t": "AP types and devices: autonomous, controller-managed, cloud-managed, mesh and bridges; PoE standards",
  "objectives": [
   "Students will be able to compare autonomous, controller-managed and cloud-managed APs by where configuration lives and how they scale.",
   "Students will be able to explain when mesh APs and wireless bridges are appropriate and their performance trade-offs.",
   "Students will be able to state the PSE power limits of 802.3af, 802.3at and 802.3bt and distinguish endspan from midspan PSEs.",
   "Students will be able to select AP types and PoE for a multi-site scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and sketch student ideas about where settings could be stored."
   ],
   [
    15,
    "Teach",
    "Build a comparison table on the whiteboard for autonomous, controller, cloud, mesh and bridge. Then draw a switch, injector and AP to label PSE (endspan and midspan) and PD, and write the PoE power limits. Explain detection, classification and LLDP."
   ],
   [
    15,
    "Activity",
    "Run Design the District: groups match AP types and PoE to three site cards and justify each choice."
   ],
   [
    5,
    "Discuss",
    "Groups share one choice each and respond to the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you had to change the Wi-Fi password on 100 access points tonight, how would you want those APs to be managed?",
  "activity": {
   "title": "Design the District",
   "materials": "Printed site cards (large campus with 80 rooms, small office with 4 rooms, detached gym 150 meters away without fiber, outdoor courtyard with no cabling), printed AP spec cards with power requirements, switch cards listing PoE type and budget, whiteboard.",
   "steps": [
    "Give each group the site cards, AP spec cards and switch cards.",
    "For each site, groups choose an AP management type and justify it in one sentence based on scale and staff.",
    "Groups pick a solution for the gym and courtyard (bridge, mesh or new cabling) and list one limitation.",
    "Groups check each AP's power class against the switch cards and total each switch's PoE budget, noting where a midspan injector or upgrade is needed.",
    "Each group presents its design in two minutes while others listen for mismatches."
   ]
  },
  "discussion": [
   "What happens to a cloud-managed site when its internet link fails, and does it matter which features are in use?",
   "Why might a small business still choose autonomous APs despite their drawbacks?",
   "What could go wrong if a designer ignores the total PoE budget of a switch?"
  ],
  "exit": [
   [
    "Where does client traffic normally go in a cloud-managed WLAN?",
    "It is forwarded locally from the AP onto the switch, not through the cloud."
   ],
   [
    "What is the maximum power at the PSE for 802.3at?",
    "30 W (PoE+, Type 2)."
   ],
   [
    "Which device type would you use to connect two buildings with line of sight and no cable?",
    "A point-to-point wireless bridge with directional antennas."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed comparison table and a PoE reference card so students focus on matching rather than recall.",
   "Extend: Ask fast finishers to estimate whether a 48-port switch with a given PoE budget can power 30 APs that each need PoE+, and to propose a solution if not."
  ]
 },
 {
  "t": "Management, control and data planes and where each lives in autonomous, controller-based, cloud-managed and distributed designs",
  "objectives": [
   "Students will be able to define the management, control and data planes with WLAN examples of each.",
   "Students will be able to locate each plane in autonomous, controller-based, cloud-managed and distributed designs.",
   "Students will be able to explain which 802.11 functions stay on the AP in a split-MAC architecture and why.",
   "Students will be able to predict the impact of a component or link failure based on where each plane lives."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list the jobs students name on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Sort the warm-up list into management, control and data columns. Draw four architecture diagrams side by side and color-code where each plane lives. Explain split MAC and why ACKs and beacons stay on the AP."
   ],
   [
    15,
    "Activity",
    "Run the Plane Sort and Outage Drill with function cards and outage cards."
   ],
   [
    5,
    "Discuss",
    "Use discussion questions to compare architectures for different organizations."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "List every job you think a Wi-Fi network has to do, from setting the password to delivering a web page to your laptop.",
  "activity": {
   "title": "Plane Sort and Outage Drill",
   "materials": "Printed function cards (push SSID config, upgrade firmware, choose channels, adjust power, track roaming clients, send ACK, send beacon, bridge client frame to VLAN, generate usage report), printed outage cards, four architecture diagrams on the whiteboard, sticky notes.",
   "steps": [
    "Groups sort function cards into management, control and data piles and check with the teacher.",
    "For each of the four architecture diagrams, groups place sticky notes showing where each pile lives: on the AP, controller, cloud or shared.",
    "The teacher draws an outage card, such as internet down at a cloud-managed site or tunneling controller reboots.",
    "Groups have two minutes to write which planes are lost and what users would notice.",
    "Repeat with three outage cards and compare answers as a class."
   ]
  },
  "discussion": [
   "Why can a cloud-managed design survive an internet outage better than a centralized data plane survives a controller failure?",
   "Which organizations might prefer centralizing the control plane, and which might prefer distributing it?",
   "Is split MAC a compromise or a necessity? What would happen if beacons came from the controller?"
  ],
  "exit": [
   [
    "Classify RRM channel assignment, firmware upgrade and bridging a client frame onto a VLAN into planes.",
    "RRM is control, firmware upgrade is management, bridging a frame is data."
   ],
   [
    "In a split-MAC architecture, name two functions that stay on the AP.",
    "Any two of sending ACKs, transmitting beacons, answering probes and retransmitting frames."
   ],
   [
    "A controller that tunnels all client traffic fails with no backup. What happens to clients?",
    "They lose connectivity because their data plane runs through the controller."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column table with one example already filled in per plane, and give struggling groups only two architectures to map first.",
   "Extend: Ask fast finishers to design a hybrid where guest traffic is tunneled and corporate traffic is local, and describe what each user group experiences if the controller fails."
  ]
 },
 {
  "t": "Centralized (tunneled) vs local (distributed) data forwarding",
  "objectives": [
   "Students will be able to describe how tunneled and local forwarding move client traffic onto the wired network.",
   "Students will be able to compare the two models for policy enforcement, roaming, scalability and failure behavior.",
   "Students will be able to explain switch port requirements (access versus trunk) for each model.",
   "Students will be able to recommend a forwarding model, including hybrids, for a given scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and sketch the student's printer path on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Draw a headquarters with a controller and two branches. Trace a client packet in tunneled mode and in local mode with two colors of marker. List advantages and drawbacks in a T-chart and show access versus trunk port configuration."
   ],
   [
    15,
    "Activity",
    "Run Trace the Packet: pairs trace scenario cards on a printed map and choose a forwarding model."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on hybrids and failure behavior."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You print from your laptop to a printer across the room over Wi-Fi. How many places do you think your print job visits before it reaches the printer?",
  "activity": {
   "title": "Trace the Packet",
   "materials": "Printed network map (headquarters with controller and DMZ, two branches each with APs, a switch, a printer and a WAN link), two colors of markers, printed scenario cards, whiteboard.",
   "steps": [
    "Pairs receive the map and a scenario card, such as a branch user printing locally or a guest browsing the internet.",
    "Using one color, pairs draw the packet path with tunneled forwarding; using the other, they draw it with local forwarding.",
    "Pairs count WAN crossings for each path and note where policy could be enforced.",
    "The teacher announces a failure (controller down, WAN down) and pairs mark which paths break.",
    "Pairs write a one-sentence recommendation for each SSID in their scenario and share with another pair."
   ]
  },
  "discussion": [
   "Why do many organizations end up with hybrid forwarding instead of choosing one model?",
   "How does the rise in Wi-Fi speeds change the case for tunneling all traffic to a controller?",
   "What new work does local forwarding create for the switching team?"
  ],
  "exit": [
   [
    "In which model does traffic between two branch clients hairpin across the WAN?",
    "Tunneled (centralized) forwarding to a controller at headquarters."
   ],
   [
    "What switch port type does an AP usually need with local forwarding of multiple SSIDs?",
    "An 802.1Q trunk carrying the management VLAN and each client VLAN."
   ],
   [
    "Give one advantage of tunneling guest traffic to a DMZ controller.",
    "Guest traffic is isolated from internal VLANs and filtered centrally without configuring every branch switch."
   ]
  ],
  "differentiation": [
   "Support: Provide a map with the tunneled path already drawn so struggling students only draw the local path and compare.",
   "Extend: Ask fast finishers to calculate how a tunnel header could push a full-size packet over a 1500-byte MTU and propose two ways to avoid fragmentation."
  ]
 },
 {
  "t": "Gathering requirements: client types and capabilities, applications, density, coverage areas and constraints",
  "objectives": [
   "Students will be able to list the categories of requirements a WLAN designer must gather.",
   "Students will be able to explain how client capabilities and applications translate into measurable design criteria.",
   "Students will be able to distinguish density requirements from coverage requirements.",
   "Students will be able to conduct a structured requirements interview and document the results."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt and collect student questions on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Group the students' questions into five categories: clients, applications, density, coverage and constraints. Fill gaps with examples such as DFS support, voice SNR targets and cable run limits. Show a sample requirements document on the projector."
   ],
   [
    15,
    "Activity",
    "Run the Client Interview role-play: pairs interview a client using a persona card and complete a requirements form."
   ],
   [
    5,
    "Discuss",
    "Pairs share the requirement they almost missed and the class discusses why."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A customer says, \"We just need good Wi-Fi everywhere.\" Write down the first five questions you would ask them.",
  "activity": {
   "title": "Client Interview",
   "materials": "Printed persona cards (a senior living facility director, a warehouse manager, a school principal, a hotel IT lead) with hidden details, printed blank requirements forms with the five categories, pens, whiteboard.",
   "steps": [
    "Pair students; one plays the customer with a persona card and only reveals details when asked the right question.",
    "The designer has eight minutes to interview and fill in the requirements form under clients, applications, density, coverage and constraints.",
    "The customer reveals any details the designer did not uncover.",
    "Pairs swap roles with a new persona and repeat for the remaining time.",
    "Each pair turns one requirement into a measurable criterion, such as a signal level, SNR target or concurrent device count."
   ]
  },
  "discussion": [
   "Which category of requirements was hardest to uncover in your interview, and why?",
   "How would you handle a stakeholder whose request conflicts with a constraint, such as wanting coverage in a space where mounting is not allowed?",
   "Why is it risky to rely on a single stakeholder for all requirements?"
  ],
  "exit": [
   [
    "Name the five categories of information a designer gathers before a WLAN design.",
    "Client types and capabilities, applications, density, coverage areas, and constraints."
   ],
   [
    "A critical scanner supports only 2.4 GHz. What does this mean for the design?",
    "The design must provide adequate 2.4 GHz coverage and capacity wherever the scanner is used; a 5 GHz-only design will not work."
   ],
   [
    "Is a 500-seat auditorium primarily a coverage or a capacity requirement?",
    "Capacity, because many devices must share airtime in one space."
   ]
  ],
  "differentiation": [
   "Support: Provide a question bank sorted by category so struggling students can choose questions instead of inventing them.",
   "Extend: Ask fast finishers to write three measurable design criteria from their interview and explain how a validation survey would test each."
  ]
 },
 {
  "t": "Coverage vs capacity design, cell sizing and airtime",
  "objectives": [
   "Students will be able to distinguish coverage-oriented and capacity-oriented designs and when each fits.",
   "Students will be able to explain why airtime, not signal strength, limits performance in dense spaces.",
   "Students will be able to identify the main controls for cell size: transmit power, minimum basic rate and antennas.",
   "Students will be able to perform a basic capacity estimate for a space."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a quick class vote."
   ],
   [
    15,
    "Teach",
    "Draw one large cell and several small cells on the whiteboard. Explain shared half-duplex airtime and show how a 6 Mbps frame compares with a fast frame using bar lengths. Cover cell-sizing controls and walk through a sample capacity calculation."
   ],
   [
    15,
    "Activity",
    "Run the Airtime Budget exercise: groups calculate airtime use and AP counts for a scenario room."
   ],
   [
    5,
    "Discuss",
    "Groups compare their AP counts and discuss the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your phone shows full Wi-Fi bars in a packed stadium, but nothing loads. What do you think has run out?",
  "activity": {
   "title": "Airtime Budget",
   "materials": "Printed scenario cards (lecture hall with 180 students, small office with 15 staff, warehouse with 12 scanners), a printed table of assumed per-radio realistic throughput and per-application needs, calculators or student laptops, strips of paper representing one second of airtime, scissors, whiteboard.",
   "steps": [
    "Each group receives a scenario card and the assumption table.",
    "Groups multiply active devices by per-device throughput to find the total demand.",
    "Groups divide total demand by realistic per-radio throughput to estimate how many radios are needed.",
    "Using the paper strip as one second of airtime, groups cut sections for a fast client frame and a slow client frame to visualize airtime use.",
    "Groups decide whether their scenario is a coverage or capacity design and present one recommendation for cell sizing."
   ]
  },
  "discussion": [
   "Why might a building with excellent coverage still get complaints after a company doubles its staff?",
   "What are the costs of adding APs for capacity, and when would you stop adding them?",
   "How does disabling low data rates help and what could it break?"
  ],
  "exit": [
   [
    "A room has strong signal but poor performance with 150 users. Is this a coverage or capacity issue?",
    "Capacity; the users are sharing limited airtime on too few radios or channels."
   ],
   [
    "Name two ways to shrink a cell.",
    "Lower AP transmit power, raise the minimum basic rate or use a directional antenna."
   ],
   [
    "Why does a frame sent at 6 Mbps hurt other clients more than the same frame at a high rate?",
    "It takes longer to transmit, consuming more shared airtime."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a worked example with the first calculation done and numbers rounded, so they focus on the reasoning.",
   "Extend: Ask fast finishers to factor in channel availability: after computing the radios needed, determine whether enough non-overlapping channels exist and propose a solution if not."
  ]
 },
 {
  "t": "Channel reuse plans, co-channel contention and channel width choices",
  "objectives": [
   "Students will be able to build a 2.4 GHz channel reuse plan using channels 1, 6 and 11.",
   "Students will be able to distinguish co-channel contention from adjacent channel interference by cause and symptom.",
   "Students will be able to explain the trade-offs of 20, 40, 80 and 160 MHz channel widths.",
   "Students will be able to recommend channel widths and reuse strategies for a given density."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and connect answers to sharing limited channels."
   ],
   [
    15,
    "Teach",
    "Draw the 2.4 GHz channel overlap diagram showing 1, 6 and 11. Contrast CCC and ACI in a two-column table of cause and symptom. Show how 5 GHz channels combine into 40 and 80 MHz blocks and how the count of usable channels shrinks."
   ],
   [
    15,
    "Activity",
    "Run Color the Floor Plan: groups assign channels to APs on a printed floor plan and then repeat with wider channels."
   ],
   [
    5,
    "Discuss",
    "Compare group plans and work through the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Thirty people need to have conversations in a building with only three rooms. How would you arrange them to keep the noise down?",
  "activity": {
   "title": "Color the Floor Plan",
   "materials": "Printed floor plans showing 12 to 15 AP locations, three colors of sticky dots or markers for 2.4 GHz channels, printed 5 GHz channel cards grouped into 20, 40 and 80 MHz blocks, whiteboard.",
   "steps": [
    "Groups assign channels 1, 6 and 11 to the AP locations so that no two neighboring APs share a color.",
    "Groups circle any spots where same-channel APs are close and propose a fix such as lowering power or disabling a radio.",
    "Using the 5 GHz cards, groups assign 20 MHz channels to every AP, then repeat with 40 MHz and with 80 MHz blocks.",
    "For each width, groups count how many AP pairs end up sharing a channel nearby.",
    "Groups recommend a channel width for their floor plan and justify it in two sentences."
   ]
  },
  "discussion": [
   "Why did the number of channel conflicts change as you widened channels, and how would users notice?",
   "When would you trust automatic channel assignment, and when would you lock channels by hand?",
   "How do building materials help or hurt a channel reuse plan?"
  ],
  "exit": [
   [
    "List the three non-overlapping 2.4 GHz channels used in most regions.",
    "1, 6 and 11."
   ],
   [
    "A capture shows many BSSIDs on the same channel and high channel utilization but low retries. Is this CCC or ACI?",
    "Co-channel contention; devices are deferring to each other rather than corrupting frames."
   ],
   [
    "Why is 80 MHz often a poor choice for a dense 5 GHz deployment?",
    "It leaves few non-overlapping channels, increasing co-channel contention, and raises the noise floor."
   ]
  ],
  "differentiation": [
   "Support: Give struggling groups a smaller floor plan with six APs and a pre-filled example for the first two APs.",
   "Extend: Ask fast finishers to explain how DFS radar events would affect their 5 GHz plan and how they would adjust it near an airport."
  ]
 },
 {
  "t": "Design targets for voice and real-time apps: signal, SNR, secondary coverage",
  "objectives": [
   "Students will be able to state the common voice design targets of about -67 dBm signal and 25 dB SNR and contrast them with typical data-only targets.",
   "Students will be able to calculate SNR from a measured signal and noise floor and judge whether it meets a voice target.",
   "Students will be able to explain why secondary coverage must come from a different-channel AP and how it supports roaming and redundancy.",
   "Students will be able to diagnose a dropped-call scenario and choose a fix such as secondary coverage or fast roaming instead of higher power."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to vote by show of hands: more power, more APs, or something else. Record the votes on the whiteboard to revisit later."
   ],
   [
    15,
    "Teach",
    "Explain why real-time traffic is sensitive to delay, jitter and loss. Write the three targets on the board: -67 dBm, 25 dB SNR, secondary coverage on a different channel. Work two SNR subtractions aloud. Sketch two overlapping cells and show the roaming zone, then contrast with a gap. Mention WMM, 802.11r and retries as supporting factors."
   ],
   [
    15,
    "Activity",
    "Run the survey-grid activity in pairs. Circulate and ask each pair to justify one pass or fail decision out loud."
   ],
   [
    5,
    "Discuss",
    "Revisit the warm-up votes. Ask the discussion questions and connect answers back to why higher power rarely fixes roaming."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in at the door."
   ]
  ],
  "warmup": "Nurses at a hospital say their Wi-Fi phones drop calls when they walk down the hallway, but laptops on the same network work fine. If you could change one thing tomorrow, what would it be, and why?",
  "activity": {
   "title": "Pass or fail the survey grid",
   "materials": "Printed floor grid (teacher-made) with each square showing strongest AP signal and channel, second-strongest AP signal and channel, and noise floor; highlighters; whiteboard.",
   "steps": [
    "Give each pair the printed grid of 20 squares. Explain that each square is a spot a nurse walks through.",
    "Pairs calculate SNR in each square and highlight any square below 25 dB in one color.",
    "Pairs highlight in a second color any square where the strongest AP is weaker than -67 dBm.",
    "Pairs mark any square where the second-strongest AP is weaker than -70 dBm or is on the same channel as the strongest AP.",
    "Each pair writes a short recommendation for the worst area, naming the specific fix (relocate or add an AP on a different channel, find a noise source, enable fast roaming) and why higher power alone is not the answer."
   ]
  },
  "discussion": [
   "Why might a design that passes a static survey still fail when someone walks a route while on a call?",
   "How would you adjust your survey if your survey adapter hears signals better than the handsets nurses carry?"
  ],
  "exit": [
   [
    "What are the commonly quoted signal and SNR targets for voice?",
    "About -67 dBm or better and about 25 dB or higher SNR."
   ],
   [
    "A signal is -70 dBm and the noise floor is -90 dBm. What is the SNR, and does it meet a voice target?",
    "20 dB; it falls short of the common 25 dB voice target."
   ],
   [
    "Why does a second AP on the same channel not count as useful secondary coverage?",
    "It shares airtime with the primary AP and adds co-channel contention instead of offering an independent roaming option."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a filled-in example square with the SNR subtraction written out step by step, and let them use a number line to see that -67 minus -92 equals 25.",
   "Extend: Ask fast finishers to propose a channel plan for the worst area of the grid using 5 GHz channels so that every square has primary and secondary coverage on different channels."
  ]
 },
 {
  "t": "High-density design: more APs at lower power, directional antennas, 5 and 6 GHz",
  "objectives": [
   "Students will be able to explain why airtime, not signal strength, limits performance in high-density WLANs.",
   "Students will be able to describe how lower power, more APs and directional antennas create smaller, separate cells.",
   "Students will be able to justify the use of 5 and 6 GHz with 20 or 40 MHz channels in a high-density design.",
   "Students will be able to identify non-RF capacity limits such as DHCP scope size and uplink bandwidth."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the convention center and ask students to write down one guess. Take three answers and note them on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Explain airtime as a shared resource. Draw a hall with four big circles, then sixteen small circles, and show which ones contend. Introduce directional antennas with a sketch of a patch antenna over a seating section. Compare 2.4 GHz with 5 and 6 GHz channel counts and explain why narrow channels give more cells. Mention body loss and DHCP sizing."
   ],
   [
    15,
    "Activity",
    "Run the arena whiteboard design activity in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Groups present one design choice each. Use the discussion questions to probe trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "A venue's Wi-Fi fails every time a big crowd arrives, even though the signal bars look full on every phone. The manager wants to buy more powerful APs. What would you ask him before agreeing?",
  "activity": {
   "title": "Design the section map",
   "materials": "Whiteboard or large paper per group, markers in several colors, printed outline of a lecture hall or small arena with seating sections, sticky notes to represent APs.",
   "steps": [
    "Give each group the printed hall outline and explain that 600 people will use the room at once.",
    "Groups place sticky-note APs and draw expected cells, deciding where omnidirectional or directional antennas fit best.",
    "Groups assign 5 GHz channels with markers so that adjacent cells use different colors, and decide channel width.",
    "Groups decide what to do with 2.4 GHz radios and write a one-line justification.",
    "Groups list two non-RF items to check, such as DHCP scope size and uplink bandwidth, and present their map to another group for critique."
   ]
  },
  "discussion": [
   "When might a single client's speed matter more than total capacity, and how would that change your channel width choice?",
   "How could you validate a stadium design if you cannot survey during a full event?"
  ],
  "exit": [
   [
    "What is the main limiting factor in a high-density WLAN?",
    "Airtime, because many devices must share the same channels; signal is usually already strong."
   ],
   [
    "Name two ways to make cells smaller and more separate.",
    "Lower AP transmit power and use directional antennas aimed at specific seating areas."
   ],
   [
    "Why are 20 or 40 MHz channels usually chosen in 5 GHz for high density?",
    "Narrower channels provide more independent channels, allowing more cells without co-channel contention."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed hall map with AP locations already placed so struggling students only need to assign channels and pick antenna types.",
   "Extend: Ask fast finishers to estimate how many 20 MHz versus 80 MHz non-overlapping channels their design could use in 5 GHz and explain how that changes the number of separate cells."
  ]
 },
 {
  "t": "SSID and VLAN design, 802.1Q trunks to APs, SSID overhead",
  "objectives": [
   "Students will be able to explain how SSIDs map to VLANs and when an AP port needs an 802.1Q trunk versus an access port.",
   "Students will be able to troubleshoot a per-SSID DHCP failure by checking allowed and native VLANs.",
   "Students will be able to describe how dynamic VLAN assignment reduces the number of SSIDs.",
   "Students will be able to explain why each SSID adds beacon overhead and list ways to reduce it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and let pairs discuss for two minutes, then collect ideas on the whiteboard."
   ],
   [
    15,
    "Teach",
    "Draw an AP with three SSIDs connected to a switch. Show tagged and untagged frames on the trunk and the native VLAN. Contrast local and tunneled forwarding. Explain dynamic VLAN assignment with RADIUS. Finish with a quick beacon calculation: number of SSIDs times APs heard on a channel times about ten beacons per second."
   ],
   [
    15,
    "Activity",
    "Run the config detective activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Review the findings and pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Guests can join the Visitor Wi-Fi but never get an IP address, while staff on the same APs are fine. List three places you would look and in what order.",
  "activity": {
   "title": "Config detective",
   "materials": "Projector or printed handouts with three short switch port configurations and matching AP SSID-to-VLAN tables (teacher-made), highlighters.",
   "steps": [
    "Hand each pair three case cards, each showing a switch port configuration and the AP's SSID-to-VLAN mapping.",
    "Pairs compare allowed VLANs and native VLANs in each case and highlight any mismatch.",
    "For each case, pairs predict which SSID's users would fail and what symptom they would see.",
    "Pairs write the corrected configuration line for each case.",
    "As a final step, pairs redesign case three, which has seven SSIDs, into three SSIDs using dynamic VLAN assignment and explain the airtime benefit."
   ]
  },
  "discussion": [
   "What are the trade-offs between more SSIDs that are easy to understand and fewer SSIDs with RADIUS-assigned VLANs?",
   "Why might an organization keep a separate SSID for IoT devices even if it uses dynamic VLAN assignment elsewhere?"
  ],
  "exit": [
   [
    "What does the native VLAN mean on an 802.1Q trunk?",
    "It is the VLAN whose frames are sent untagged on the trunk."
   ],
   [
    "How can one SSID place different users in different VLANs?",
    "Use 802.1X with RADIUS returning a VLAN attribute or role for each user or group."
   ],
   [
    "Does hiding an SSID remove its beacon overhead? Why or why not?",
    "No, the AP still sends beacons for it and must answer probes, so it still consumes airtime."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled diagram of a trunk with colored tags for each VLAN so struggling students can trace each SSID's frames from AP to switch before reading text configurations.",
   "Extend: Ask fast finishers to estimate the beacon frames per second on a channel where five APs each broadcast six SSIDs, and propose a design that cuts that number by at least half."
  ]
 },
 {
  "t": "Data rate settings, band steering and load balancing",
  "objectives": [
   "Students will be able to distinguish basic, supported and disabled data rates and state which rate beacons use.",
   "Students will be able to predict the effects and trade-offs of raising the minimum basic rate.",
   "Students will be able to explain how band steering and load balancing work and why the client makes the final decision.",
   "Students will be able to read basic rates from a beacon's Supported Rates element."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario and collect quick answers on what is keeping the laptop on the distant AP."
   ],
   [
    15,
    "Teach",
    "Project a rate configuration table and explain disabled, supported and basic. Explain that beacons use the lowest basic rate and compare airtime at 1 Mbps and 24 Mbps conceptually. Describe band steering using probe responses and 802.11v, then load balancing and why it is often disabled for voice."
   ],
   [
    15,
    "Activity",
    "Run the rate-setting role-play in small groups."
   ],
   [
    5,
    "Discuss",
    "Debrief with the discussion questions and tie back to the warm-up."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A laptop stays connected at 6 Mbps to an AP two rooms away while a new AP is mounted directly overhead. Why might the laptop not move, and what could the network do about it?",
  "activity": {
   "title": "Who still gets in",
   "materials": "Printed role cards describing client devices (supported rates, bands), a printed AP rate table per group, whiteboard.",
   "steps": [
    "Give each group a set of eight device role cards, such as a modern laptop, an old 802.11b scanner, a dual-band phone and a 2.4-GHz-only sensor.",
    "Groups set the AP's basic rates to the vendor default and decide which devices can associate.",
    "Groups change the minimum basic rate to 12 Mbps, then 24 Mbps, and record which devices are locked out each time.",
    "Groups decide which devices band steering might move to 5 GHz and which it cannot.",
    "Each group recommends a final rate configuration and writes one sentence on the trade-off they accepted."
   ]
  },
  "discussion": [
   "How would you discover whether legacy devices exist before changing basic rates on a production network?",
   "Why might band steering frustrate users even though it improves the network overall?"
  ],
  "exit": [
   [
    "At which rate are beacons usually transmitted?",
    "The lowest basic rate."
   ],
   [
    "Give one benefit and one risk of raising the minimum basic rate.",
    "Benefit: less beacon airtime and smaller cells that encourage roaming. Risk: edge or legacy clients may not connect."
   ],
   [
    "Who makes the final decision in band steering?",
    "The client device; the AP can only delay responses or suggest a move."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a simplified device list with only three devices and a partially filled rate table so they can focus on the basic-rate rule.",
   "Extend: Ask fast finishers to explain why a single slow client increases airtime use for everyone in the cell, using a quick comparison of time to send the same frame at 6 and 54 Mbps."
  ]
 },
 {
  "t": "PoE planning: 802.3af, 802.3at and 802.3bt power budgets",
  "objectives": [
   "Students will be able to state the PSE and PD power levels for 802.3af, 802.3at and 802.3bt Types 3 and 4.",
   "Students will be able to calculate whether a switch's PoE budget supports a planned set of powered devices.",
   "Students will be able to explain how insufficient PoE can cause an AP to run in a reduced-capability mode.",
   "Students will be able to describe how LLDP power negotiation and midspan injectors fit into a PoE plan."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario and ask students to list possible causes. Write them on the board under RF, wired and power."
   ],
   [
    15,
    "Teach",
    "Draw a PSE and a PD connected by a cable and label power at each end. Fill in a table for af, at, bt Type 3 and bt Type 4 with PSE and PD values. Explain two-pair versus four-pair delivery, power classes, the total switch budget and LLDP negotiation. Show a sample data sheet line describing full and reduced power modes."
   ],
   [
    15,
    "Activity",
    "Run the budget builder activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Pairs share results; use the discussion questions to explore redundancy and growth."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a half sheet."
   ]
  ],
  "warmup": "New access points show online but users say Wi-Fi got slower after the upgrade. One AP's status page says power mode: limited. What do you think that means, and what would you check?",
  "activity": {
   "title": "Budget builder",
   "materials": "Printed device cards (teacher-made) listing APs, cameras and phones with power needs from fictional data sheets, printed switch spec cards with port standards and total budgets, calculators.",
   "steps": [
    "Give each pair two switch spec cards and a stack of device cards.",
    "Pairs assign devices to switches, checking that each device's required standard matches the port and that each switch's total budget is not exceeded.",
    "Pairs leave at least 15 percent headroom and record the totals.",
    "Teacher announces that one switch loses a power supply, halving its budget; pairs decide which devices would lose power first and how to prioritize APs.",
    "Pairs write one recommendation for the IT manager explaining their final allocation."
   ]
  },
  "discussion": [
   "Should APs or cameras get higher PoE priority on a shared switch, and who should decide?",
   "When would a midspan injector be a reasonable choice instead of a switch upgrade?"
  ],
  "exit": [
   [
    "What is the maximum PSE power for 802.3af, 802.3at, and 802.3bt Type 4?",
    "15.4 W, 30 W and 90 W."
   ],
   [
    "A switch has a 240 W budget. Can it power ten 25 W APs at once?",
    "No; they need 250 W, which exceeds the 240 W budget."
   ],
   [
    "Why might an AP work but perform poorly after an upgrade, even with good RF?",
    "It may be receiving insufficient PoE and running in a reduced mode with a radio or spatial streams disabled."
   ]
  ],
  "differentiation": [
   "Support: Provide a pre-filled standards table and a worked budget example with three devices so struggling students can follow the addition before tackling the full card set.",
   "Extend: Ask fast finishers to compare class-based allocation with LLDP negotiation for the same device list and calculate how many more devices fit when exact power is negotiated."
  ]
 },
 {
  "t": "Legacy weaknesses: WEP, TKIP, shared key authentication, SSID hiding and MAC filtering",
  "objectives": [
   "Students will be able to explain why WEP and TKIP are no longer acceptable, including TKIP's effect on data rates.",
   "Students will be able to explain why shared key authentication was weaker than open system authentication.",
   "Students will be able to argue why SSID hiding and MAC filtering are not real security controls.",
   "Students will be able to recommend modern replacements and an isolation plan for legacy devices."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up statement and have students stand on one side of the room if they agree and the other side if they disagree. Ask two volunteers from each side to explain."
   ],
   [
    15,
    "Teach",
    "Walk through WEP (RC4, static key, 24-bit IV), TKIP (per-packet keys, Michael, deprecated, no HT rates), shared key authentication (clear-text challenge and encrypted response), SSID hiding and MAC filtering. For each, write on the board what it was meant to do and why it fails."
   ],
   [
    15,
    "Activity",
    "Run the auditor role-play in groups of three."
   ],
   [
    5,
    "Discuss",
    "Return to the warm-up and ask whether anyone changed sides. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Agree or disagree: a hidden SSID with MAC filtering and WPA-TKIP is reasonably secure for a small warehouse because outsiders cannot even see the network.",
  "activity": {
   "title": "The auditor visit",
   "materials": "Printed scenario cards (teacher-made) describing three fictional networks and their security settings, printed role cards for auditor, IT admin and business owner, whiteboard.",
   "steps": [
    "Form groups of three and assign roles: auditor, IT admin and business owner.",
    "Each group receives a scenario card listing settings such as WEP, TKIP, shared key, hidden SSID or MAC filtering.",
    "The auditor identifies each weakness and explains, in plain language, why it fails.",
    "The business owner raises realistic objections, such as cost or old devices, and the IT admin proposes modern replacements and isolation for legacy devices.",
    "Groups write a three-line remediation plan on the whiteboard and rotate roles for the next scenario if time allows."
   ]
  },
  "discussion": [
   "Why do you think SSID hiding and MAC filtering remain popular even though they are not real security?",
   "How would you justify the cost of replacing legacy devices that support only TKIP?"
  ],
  "exit": [
   [
    "Name two reasons WEP is considered broken.",
    "Its 24-bit IV repeats quickly and RC4 key weaknesses allow key recovery; its integrity check does not stop tampering."
   ],
   [
    "What performance limit applies to TKIP on modern networks?",
    "802.11n and later high-throughput rates are not allowed, so clients use legacy rates."
   ],
   [
    "Why is MAC filtering easy to bypass?",
    "MAC addresses are sent unencrypted in every frame and can be changed in software, so an attacker can copy an allowed one."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a two-column chart with each legacy mechanism on the left and a list of failure reasons to match on the right.",
   "Extend: Ask fast finishers to design a segmentation plan for legacy devices, specifying SSID, VLAN, permitted destinations and a replacement timeline."
  ]
 },
 {
  "t": "WPA2 and WPA3 Personal and Enterprise; CCMP/AES and GCMP",
  "objectives": [
   "Students will be able to distinguish Personal and Enterprise modes of WPA2 and WPA3 by how users authenticate.",
   "Students will be able to compare CCMP and GCMP and identify where each is used.",
   "Students will be able to state what WPA3 adds, including SAE, required PMF and the 192-bit Enterprise mode.",
   "Students will be able to read AKM and cipher information from an RSN element to identify a network's security type."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the departing employee. Collect answers and write the words shared password and individual login on the board."
   ],
   [
    15,
    "Teach",
    "Draw a two-by-two grid with WPA2 and WPA3 across the top and Personal and Enterprise down the side, and fill each cell with authentication method and requirements. Draw a separate box for ciphers: CCMP (AES-128) and GCMP (GCMP-256 for 192-bit mode). Note that TKIP is deprecated and that 6 GHz requires WPA3 or Enhanced Open."
   ],
   [
    15,
    "Activity",
    "Run the RSN element decoding activity in pairs."
   ],
   [
    5,
    "Discuss",
    "Discuss answers and pose the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "An employee leaves a company on bad terms. The office Wi-Fi uses one shared password that everyone knows. What risks does that create, and what are the options?",
  "activity": {
   "title": "Decode the RSN element",
   "materials": "Printed cards (teacher-made) showing simplified RSN element fields from six fictional networks (AKM, pairwise cipher, group cipher, PMF setting, band), whiteboard grid from the teach segment.",
   "steps": [
    "Give each pair six RSN cards.",
    "Pairs identify each network's security type, such as WPA2-Personal, WPA3-Personal, transition mode or WPA3-Enterprise.",
    "Pairs flag any card that is invalid or weak, such as WPA2 advertised in 6 GHz or TKIP as a pairwise cipher.",
    "Pairs match each network to a fictional organization's needs card, such as a coffee shop, hospital or small office.",
    "Pairs present one match and justify it in terms of both authentication and encryption layers."
   ]
  },
  "discussion": [
   "Why might an organization stay on WPA2-Enterprise instead of moving to WPA3-Enterprise right away?",
   "When is a WPA3-Personal network a reasonable choice for a business?"
  ],
  "exit": [
   [
    "What determines whether a network is Personal or Enterprise?",
    "How users authenticate: a shared secret (PSK or SAE) for Personal, or 802.1X with an authentication server for Enterprise."
   ],
   [
    "What encryption protocol is mandatory for WPA2?",
    "CCMP, which uses AES with a 128-bit key."
   ],
   [
    "Name two things WPA3-Personal adds compared with WPA2-Personal.",
    "SAE instead of PSK, and required Protected Management Frames."
   ]
  ],
  "differentiation": [
   "Support: Provide a filled-in two-by-two grid as a reference card so struggling students can match RSN fields to the correct cell.",
   "Extend: Ask fast finishers to explain, in writing, why WPA3-Enterprise 192-bit mode might cause compatibility problems in a mixed-device environment and how they would test for them."
  ]
 },
 {
  "t": "SAE and its resistance to offline dictionary attacks; transition mode",
  "objectives": [
   "Students will be able to explain how an offline dictionary attack works against WPA2-Personal and why SAE prevents it.",
   "Students will be able to describe the SAE Commit and Confirm exchange and its place before the 4-way handshake.",
   "Students will be able to define forward secrecy and explain how SAE provides it.",
   "Students will be able to evaluate WPA3 transition mode, including its PMF setting, risks and migration path."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up and ask students to discuss in pairs for two minutes. Collect answers that mention guessing or recording."
   ],
   [
    15,
    "Teach",
    "Draw the WPA2-Personal flow: passphrase plus SSID to PMK, then the 4-way handshake with a MIC. Show how a captured handshake lets someone test guesses offline. Then draw SAE: Commit and Confirm with fresh random values producing a PMK, followed by the same 4-way handshake. Explain forward secrecy and online versus offline guessing. Finish with transition mode, PMF capable and the 6 GHz rule."
   ],
   [
    15,
    "Activity",
    "Run the offline versus online card game in small groups."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore migration planning."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If someone records the moment your phone joins a Wi-Fi network, could they figure out the password later without being near the network? What would make that easier or harder?",
  "activity": {
   "title": "Home or on site",
   "materials": "Printed scenario cards (teacher-made), two signs on the wall labeled offline (at home) and online (on site), sticky notes.",
   "steps": [
    "Give each group a deck of scenario cards, such as an attacker has a captured WPA2-Personal handshake or an attacker has a captured SAE exchange.",
    "Groups decide whether password guessing in each scenario can happen offline at home or only online at the AP, and place the card under the matching sign.",
    "For each card, groups write on a sticky note which defense applies, such as SAE, long passphrase or rate limiting.",
    "Groups receive a transition-mode card and decide which clients on that network are exposed to offline attacks.",
    "Groups write a three-step migration plan from transition mode to WPA3-only."
   ]
  },
  "discussion": [
   "Why might an organization keep transition mode longer than it should, and how would you set an end date?",
   "How does forward secrecy change the impact of a leaked password?"
  ],
  "exit": [
   [
    "What makes WPA2-Personal vulnerable to offline guessing?",
    "The PMK depends only on the passphrase and SSID, so a captured handshake lets attackers test guesses offline."
   ],
   [
    "Does SAE eliminate the need for a strong password? Explain.",
    "No; it prevents offline guessing, but online guesses against the AP are still possible."
   ],
   [
    "Why is PMF set to capable rather than required in transition mode?",
    "So WPA2 clients that may not support PMF can still connect."
   ]
  ],
  "differentiation": [
   "Support: Provide a side-by-side flow diagram of WPA2-PSK and WPA3-SAE with the key difference highlighted so struggling students can compare the two visually.",
   "Extend: Ask fast finishers to describe what a downgrade attempt against a transition-mode network would look like and how client behavior that remembers WPA3 networks reduces the risk."
  ]
 },
 {
  "t": "Enhanced Open (OWE) for open networks",
  "objectives": [
   "Students will be able to explain how OWE uses an unauthenticated Diffie-Hellman exchange during association to encrypt open networks.",
   "Students will be able to distinguish protection against passive eavesdropping from protection against AP impersonation.",
   "Students will be able to describe how OWE transition mode serves both legacy and OWE-capable clients.",
   "Students will be able to design a guest network that combines Enhanced Open with a captive portal and meets 6 GHz rules."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about public Wi-Fi and take a quick poll."
   ],
   [
    15,
    "Teach",
    "Explain why open networks are readable and why a posted passphrase does not fully help. Use a color-mixing illustration on the board to explain Diffie-Hellman at a high level, then show where the public keys travel in association frames and that a 4-way handshake follows. Emphasize unauthenticated. Sketch transition mode with two BSSs and the 6 GHz rule."
   ],
   [
    15,
    "Activity",
    "Run the eavesdropper and impostor role-play in groups of four."
   ],
   [
    5,
    "Discuss",
    "Debrief with the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "You are on free cafe Wi-Fi with no password. Who else in the room could see what your laptop sends, and what would need to change to stop them?",
  "activity": {
   "title": "Eavesdropper and impostor",
   "materials": "Envelopes, slips of paper, printed role cards (customer, real AP, eavesdropper, evil twin), whiteboard.",
   "steps": [
    "In each group, assign roles: customer, real AP, eavesdropper and evil twin.",
    "Round one, open network: the customer passes notes to the real AP on open slips; the eavesdropper copies what they can read.",
    "Round two, Enhanced Open: the customer and real AP seal notes in envelopes only they can open; the eavesdropper records what they can still learn, such as that traffic exists.",
    "Round three, evil twin with OWE: the evil twin offers the customer an envelope first; the group notes that the customer's notes are now sealed but delivered to the impostor.",
    "Groups write one sentence summarizing what OWE does and does not protect, and suggest what would stop the evil twin."
   ]
  },
  "discussion": [
   "Should a venue with Enhanced Open still use a captive portal? What does each tool do?",
   "Why is authenticating the network so hard on a public network where users share no secret with the venue?"
  ],
  "exit": [
   [
    "What type of key exchange does OWE use, and when does it happen?",
    "An unauthenticated Diffie-Hellman exchange during association."
   ],
   [
    "Does Enhanced Open stop an evil twin attack? Why or why not?",
    "No; OWE does not authenticate the AP, so an evil twin can also perform OWE with victims."
   ],
   [
    "What security is required for public networks in 6 GHz?",
    "Enhanced Open or WPA3; unencrypted open networks are not allowed."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-row table (open, posted passphrase, Enhanced Open) with columns for who can read traffic and who can impersonate the AP, partially filled in.",
   "Extend: Ask fast finishers to explain why a WPA2-Personal network with a publicly posted passphrase is weaker than OWE against a passive listener, referring to the 4-way handshake."
  ]
 },
 {
  "t": "802.1X roles: supplicant, authenticator and authentication server (RADIUS)",
  "objectives": [
   "Students will be able to identify the supplicant, authenticator and authentication server in a WLAN diagram.",
   "Students will be able to explain how EAP is carried by EAPOL and by RADIUS on each side of the authenticator.",
   "Students will be able to describe the unauthorized and authorized port states and what traffic each allows.",
   "Students will be able to troubleshoot an 802.1X failure by isolating which role or link is at fault."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect a few answers about who decides whether a user gets in."
   ],
   [
    15,
    "Teach",
    "Draw the three roles left to right with arrows. Label EAPOL between supplicant and authenticator and RADIUS over UDP between authenticator and server. Show the port blocked except for EAPOL, then authorized after Access-Accept. Explain key delivery and the 4-way handshake. List common failures under each role."
   ],
   [
    15,
    "Activity",
    "Run the 802.1X relay role-play and troubleshooting rounds in groups of three."
   ],
   [
    5,
    "Discuss",
    "Debrief using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "When you log in to a company's Wi-Fi with your username and password, which device do you think checks that password: your laptop, the access point or something else?",
  "activity": {
   "title": "Pass the credentials",
   "materials": "Printed role badges (supplicant, authenticator, RADIUS server), slips of paper for messages, a printed user list for the server, printed fault cards (teacher-made).",
   "steps": [
    "Form groups of three and hand out role badges and the server's user list.",
    "Run a normal login: the supplicant writes credentials on a slip labeled EAPOL, the authenticator rewraps it in a slip labeled RADIUS and passes it on, and the server replies Accept or Reject.",
    "The teacher hands the authenticator or server a secret fault card, such as not a RADIUS client, wrong shared secret or wrong password, and the group runs the login again.",
    "The supplicant must diagnose the fault by asking yes or no questions about what each role saw.",
    "Groups rotate roles and repeat with a new fault card, then write which role or link each fault belonged to."
   ]
  },
  "discussion": [
   "Why is it useful that the authenticator does not make the access decision itself?",
   "Which symptoms help you tell a single-user problem from a site-wide problem in 802.1X?"
  ],
  "exit": [
   [
    "What are the three 802.1X roles in a WLAN, and which device usually fills each?",
    "Supplicant (client device), authenticator (AP or controller), authentication server (RADIUS)."
   ],
   [
    "What carries EAP between the supplicant and the authenticator?",
    "EAPOL (EAP over LAN)."
   ],
   [
    "All users behind a new controller fail authentication, but users elsewhere succeed. What should you check first?",
    "Whether the controller is configured as a RADIUS client on the server with a matching shared secret, and that RADIUS traffic is not blocked."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a labeled diagram template with blanks for role names and protocol names to fill in before the role-play.",
   "Extend: Ask fast finishers to list the RADIUS attributes they would return to place contractors and employees on different VLANs from one SSID, and explain how accounting messages could help an investigation."
  ]
 },
 {
  "t": "EAP methods: EAP-TLS, PEAP, EAP-TTLS and their certificate needs",
  "objectives": [
   "Students will be able to state the certificate requirements for EAP-TLS, PEAP and EAP-TTLS.",
   "Students will be able to explain how tunneled methods protect inner credentials and why server certificate validation is essential.",
   "Students will be able to compare EAP methods by security strength and deployment effort.",
   "Students will be able to recommend an EAP method for a given organization's devices and directory."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about the parking-lot test and gather guesses on how credentials leaked."
   ],
   [
    15,
    "Teach",
    "Draw three columns for EAP-TLS, PEAP and EAP-TTLS. For each, mark which side has a certificate, whether a tunnel is built and what is sent inside. Explain server certificate validation with a fake-server sketch. Mention EAP-FAST, LEAP, EAP-MD5 and anonymous outer identity."
   ],
   [
    15,
    "Activity",
    "Run the method-matching card sort and profile audit in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Testers set up a fake Wi-Fi network with a company's name in the parking lot, and employee laptops tried to log in to it using their real accounts. What might have gone wrong on those laptops?",
  "activity": {
   "title": "Pick the method, audit the profile",
   "materials": "Printed organization cards (teacher-made) describing devices and directories, printed EAP method cards, printed sample Wi-Fi profile screenshots or mock-ups showing EAP method, trusted CA and server name fields.",
   "steps": [
    "Give each pair four organization cards and the set of EAP method cards.",
    "Pairs match a recommended EAP method to each organization and note the certificates required.",
    "Pairs receive three mock Wi-Fi profiles and check each for EAP method, trusted CA, server name and outer identity.",
    "Pairs mark any profile that would let a fake RADIUS server collect credentials and explain why.",
    "Each pair shares one recommendation with the class and defends it in terms of security and deployment effort."
   ]
  },
  "discussion": [
   "Is the operational cost of EAP-TLS worth it for a small organization? What would change your answer?",
   "Why do users so often accept unknown certificate prompts, and how can design remove that choice from them?"
  ],
  "exit": [
   [
    "Which certificates does EAP-TLS require, and which do PEAP and EAP-TTLS require?",
    "EAP-TLS needs server and client certificates; PEAP and EAP-TTLS need only a server certificate."
   ],
   [
    "What happens if a PEAP client does not validate the server certificate?",
    "It may build a tunnel to a fake server and send its inner credentials to an attacker."
   ],
   [
    "What advantage does EAP-TTLS have over PEAP?",
    "It supports a wider range of inner methods, including PAP, which works with more back-end databases."
   ]
  ],
  "differentiation": [
   "Support: Provide a comparison table template with rows for certificates needed, tunnel used and inner credential, partly filled, for struggling students to complete during the lesson.",
   "Extend: Ask fast finishers to outline an onboarding process that delivers certificates or validated profiles to unmanaged devices, and identify the risks at each step."
  ]
 },
 {
  "t": "The 4-way handshake: PMK, PTK and GTK",
  "objectives": [
   "Students will be able to explain where the PMK comes from in Personal and Enterprise modes and why it is never transmitted.",
   "Students will be able to list the inputs to the PTK and the purpose of the KCK, KEK and TK.",
   "Students will be able to sequence the four handshake messages and state what each carries.",
   "Students will be able to interpret an EAPOL-Key capture pattern to diagnose a wrong passphrase or other handshake failure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect ideas on how two devices can agree on a key without sending it."
   ],
   [
    15,
    "Teach",
    "Draw a key hierarchy: PMK at the top, PTK below with KCK, KEK and TK, and GMK to GTK on the AP side. Then draw a ladder diagram with the four messages and label ANonce, SNonce and MIC, GTK under KEK, and confirmation. Show what a MIC failure on message 2 looks like."
   ],
   [
    15,
    "Activity",
    "Run the human handshake activity and capture-reading cards in groups of four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the handshake to troubleshooting."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Two devices both know a secret but must never say it out loud, yet they need fresh keys for every conversation. How could they do it?",
  "activity": {
   "title": "The human handshake",
   "materials": "Index cards labeled ANonce, SNonce, MIC, GTK, KEK envelope and Install; envelopes; printed capture excerpts (teacher-made) showing EAPOL-Key message sequences.",
   "steps": [
    "In each group, assign roles: AP, client, and two observers who check each step.",
    "The AP and client pass cards in the correct order to act out messages 1 to 4, with the GTK card sealed in the KEK envelope in message 3.",
    "Observers confirm that no card labeled PMK is ever passed and that MICs appear only from message 2 onward.",
    "Groups receive three printed capture excerpts, one successful, one with repeated messages 1 and 2 and a MIC failure, and one that completes but is followed by unanswered DHCP, and diagnose each.",
    "Groups write a one-sentence diagnosis and next step for each excerpt."
   ]
  },
  "discussion": [
   "Why is it safe for the nonces to travel in clear text?",
   "Why does the AP change the GTK when a client leaves the network?"
  ],
  "exit": [
   [
    "What is used to derive the PTK?",
    "The PMK, ANonce, SNonce and both MAC addresses."
   ],
   [
    "Which message delivers the GTK, and which key protects it?",
    "Message 3, encrypted with the KEK."
   ],
   [
    "In WPA2-Personal, a capture shows messages 1 and 2 repeating with a MIC failure. What is the likely cause?",
    "The client has the wrong passphrase, so its PMK and KCK differ and the MIC in message 2 fails."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed ladder diagram with blanks for each message's contents so struggling students can fill it in during the human handshake.",
   "Extend: Ask fast finishers to explain the group key handshake and describe how the key hierarchy differs between WPA2-Personal, WPA3-Personal and Enterprise mode."
  ]
 },
 {
  "t": "Protected Management Frames (802.11w)",
  "objectives": [
   "Students will be able to list the management frames that 802.11w protects and explain why other management frames cannot be protected.",
   "Students will be able to compare how PMF protects unicast frames (pairwise keys) and group-addressed frames (BIP with the IGTK).",
   "Students will be able to describe the SA Query procedure and the attack it prevents.",
   "Students will be able to choose between PMF disabled, capable and required for a given client population, noting the WPA3 and 6 GHz requirements."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect a few guesses about why a client would obey a disconnect message from anyone."
   ],
   [
    15,
    "Teach",
    "Draw the connection timeline on the whiteboard: probe, authentication, association, 4-way handshake, then data. Draw a vertical line at the end of the handshake and explain that only frames to the right of it can be protected. Introduce robust management frames, unicast protection with pairwise keys, BIP with the IGTK for group frames, and the SA Query procedure."
   ],
   [
    15,
    "Activity",
    "Run the frame sort and SA Query role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore rollout trade-offs on WPA2 networks with legacy clients."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand them in at the door."
   ]
  ],
  "warmup": "Your phone receives a message that appears to come from your access point saying you have been disconnected. Before 802.11w, why would your phone simply believe it?",
  "activity": {
   "title": "Protected or not: frame sort and SA Query role-play",
   "materials": "Printed cards, one per frame type (beacon, probe request, probe response, authentication, association request, reassociation request, deauthentication, disassociation, block ack action, spectrum management action), whiteboard timeline, three volunteers.",
   "steps": [
    "In pairs, students sort the frame cards into two piles, protected by PMF and not protected, and write one sentence justifying each unprotected card using the timeline on the board.",
    "Pairs then mark each protected card as unicast (pairwise key) or broadcast (BIP and IGTK) where both are possible, such as deauthentication.",
    "Three volunteers act out the SA Query scenario: an AP, a genuine client and an attacker. The attacker hands the AP an association request card with the client's name; the AP must respond with a temporary rejection card and send an SA Query card to the client, who answers.",
    "Repeat the role-play with the genuine client absent (it has really left), so the class sees the AP accept the new association after the SA Query times out.",
    "Review the card sort as a class and correct any frames placed in the wrong pile."
   ]
  },
  "discussion": [
   "If PMF capable protects modern clients and still allows older ones, what risk remains for the older clients, and how would you explain that risk to a manager?",
   "Since PMF cannot stop jamming or authentication floods, what other controls should a defensive WLAN design include?"
  ],
  "exit": [
   [
    "Name the three kinds of management frames PMF protects.",
    "Deauthentication, disassociation and robust action frames."
   ],
   [
    "What does BIP provide for broadcast management frames, and which key does it use?",
    "Integrity protection (a message integrity check, not encryption) using the IGTK."
   ],
   [
    "A WPA3 SSID is being configured. Which PMF setting applies?",
    "Required, because WPA3 mandates PMF."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-drawn timeline with the 4-way handshake highlighted and ask them only to place each card left or right of the line before discussing protection methods.",
   "Extend: Ask fast finishers to find the RSN capabilities bits that advertise PMF capable and PMF required, and to explain what a client should do if it supports PMF but the AP advertises required while the client has it disabled."
  ]
 },
 {
  "t": "Rogue APs, evil twins and WIPS; guest access, captive portals and client isolation",
  "objectives": [
   "Students will be able to distinguish a rogue AP, an evil twin and a neighbor AP using the defining characteristic of each.",
   "Students will be able to explain how a WIPS classifies devices, including wired and wireless MAC correlation, and the risks of rogue containment.",
   "Students will be able to design a guest WLAN using a separate SSID, guest VLAN or tunnel, firewall rules, captive portal and client isolation.",
   "Students will be able to explain why a captive portal does not provide encryption and identify Enhanced Open as the encryption option for open guest networks."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student answers in two columns on the board: threats to the network and threats to users."
   ],
   [
    15,
    "Teach",
    "Define rogue, evil twin and neighbor with a simple building sketch showing which device connects to the switch. Explain WIPS sensors, classification by MAC correlation, location and containment cautions. Then whiteboard a guest design: guest SSID, guest VLAN, firewall allowing DHCP, DNS and internet, captive portal and client isolation."
   ],
   [
    15,
    "Activity",
    "Run the WIPS triage card exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to debate containment policy and guest network trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "You walk into a coffee shop and see two networks with the same name. How could you tell which one is real, and why might the fake one want your attention?",
  "activity": {
   "title": "WIPS triage desk",
   "materials": "Printed alert cards the teacher prepares (each with an SSID, BSSID, location, signal level and a note on whether a near-matching MAC appears in switch tables), a whiteboard with three columns labeled Rogue, Evil twin and Neighbor, and a second sheet for guest network design.",
   "steps": [
    "Groups of three receive eight alert cards and classify each as rogue, evil twin or neighbor, writing the evidence that decided it.",
    "For each rogue and evil twin, the group writes a response action and must state whether containment is appropriate under a policy that allows it only against devices on the company's own wired network.",
    "Groups post one card each on the whiteboard and defend their classification; other groups may challenge.",
    "In the remaining time, groups sketch a guest WLAN for a visitor center, labeling the SSID, VLAN or tunnel, firewall permits, captive portal type and client isolation setting.",
    "The teacher reviews one guest design on the projector and highlights whether it encrypts guest traffic."
   ]
  },
  "discussion": [
   "Should an organization ever contain an AP it cannot prove is connected to its own network? Who should approve that decision?",
   "When might client isolation break something users need, and how could you meet that need without turning isolation off entirely?"
  ],
  "exit": [
   [
    "What single characteristic makes an AP a rogue?",
    "It is an unauthorized AP connected to the organization's wired network."
   ],
   [
    "An open guest SSID uses a captive portal. Is guest traffic encrypted over the air? What would change that?",
    "No. Enhanced Open (or WPA2/WPA3) would provide encryption; the portal only controls access."
   ],
   [
    "Which setting stops one guest device from attacking another on the same SSID?",
    "Client isolation (peer-to-peer blocking)."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page decision flow: Is it connected to our wired network? Does it copy our SSID? Let them use it while sorting the alert cards.",
   "Extend: Ask fast finishers to explain why 802.1X clients with server certificate validation resist evil twins while clients that accept any certificate do not, and to draft a short rogue containment policy."
  ]
 },
 {
  "t": "Site survey types: predictive, passive, active and AP-on-a-stick",
  "objectives": [
   "Students will be able to describe what predictive, passive, active and AP-on-a-stick surveys each measure.",
   "Students will be able to select the appropriate survey type for a given project stage and environment.",
   "Students will be able to explain why an active survey reveals roaming and throughput problems that a passive survey cannot.",
   "Students will be able to outline a hybrid survey workflow from predictive design through post-installation validation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up prompt on the projector and take quick answers about how you would decide where to put access points in a building that is not built yet."
   ],
   [
    15,
    "Teach",
    "Build a four-column comparison table on the whiteboard: survey type, associated or not, what it measures, when to use it. Stress the passive versus active distinction and the pre-deployment nature of AP-on-a-stick, then draw the project timeline from predictive to validation."
   ],
   [
    15,
    "Activity",
    "Run the survey consultant scenario exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore budget and accuracy trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions individually."
   ]
  ],
  "warmup": "If you had to guess where to put Wi-Fi access points in a building that has not been built yet, what information would you need, and how confident would you be?",
  "activity": {
   "title": "Survey consultant: pick the method",
   "materials": "Six printed scenario cards the teacher writes (new building on paper, existing office with roaming complaints, warehouse with metal racking, historic library, post-installation sign-off, assessment before redesign), whiteboard, sticky notes in four colors, one color per survey type.",
   "steps": [
    "Groups of three or four draw two scenario cards each and decide which survey type or combination fits, writing the choice on a colored sticky note.",
    "For each scenario, the group writes one sentence on what the chosen survey will measure and one on what it will miss.",
    "Groups place their sticky notes on a project timeline drawn on the whiteboard, from design through validation.",
    "Each group presents one scenario; the class votes on whether they agree and the teacher resolves disagreements using the comparison table.",
    "As a wrap-up, the class builds one hybrid workflow for the hardest scenario on the board."
   ]
  },
  "discussion": [
   "A client wants to skip on-site surveys to save money and rely only on a predictive model. What risks would you explain, and what minimum on-site work would you insist on?",
   "Why might an AP-on-a-stick survey be worth its labor in a hospital but not in a typical open-plan office?"
  ],
  "exit": [
   [
    "Which survey type records beacons from every AP without associating?",
    "A passive survey."
   ],
   [
    "A client reports slow roaming during calls. Which survey type should you run?",
    "An active survey on the affected SSID, because it measures roaming behavior and throughput as a connected client."
   ],
   [
    "Why must a predictive design be validated on site?",
    "Its accuracy depends on the wall materials and attenuation values entered, which may not match reality."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed comparison table with the associated or not column filled in, so students focus on matching measurements and use cases.",
   "Extend: Ask fast finishers to design a survey plan for a multi-floor building where APs on one floor can be heard on others, explaining which survey types reveal floor-to-floor overlap."
  ]
 },
 {
  "t": "Pre-survey preparation: floor plans, scale, requirements, access and safety",
  "objectives": [
   "Students will be able to explain how to calibrate a floor plan and why scale errors distort survey results.",
   "Students will be able to identify the requirements a surveyor must confirm before a survey and connect them to the survey route.",
   "Students will be able to list access and safety arrangements appropriate to different environments such as hospitals, warehouses and rooftops.",
   "Students will be able to assemble a pre-survey checklist covering plans, requirements, access, safety and equipment."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and ask students to name everything that went wrong."
   ],
   [
    10,
    "Teach",
    "Explain floor plan sources and scale calibration with a quick whiteboard demonstration: draw a corridor and show how a 5 percent error over a door width compares with the same error over a long hallway. Cover requirements, access and safety briefly."
   ],
   [
    20,
    "Activity",
    "Run the scale calibration and checklist exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to compare checklists for different site types."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A surveyor arrives at a warehouse with no scaled floor plan, no key to the server room and sneakers instead of safety shoes. What will each of these problems cost the project?",
  "activity": {
   "title": "Scale check and pre-survey checklist",
   "materials": "A printed floor plan of the classroom or school wing without dimensions, tape measures or a measuring wheel, student laptops with a browser, whiteboard, sticky notes.",
   "steps": [
    "Pairs measure one short feature of the room (a door width) and one long feature (the length of a wall or corridor) with the tape measure.",
    "Using the printed plan, each pair calculates the scale twice, once from each measurement, then uses both scales to compute the length of a different wall and compares it with a direct measurement.",
    "Pairs report the error for each method; the teacher records results on the board to show that the long baseline gives more consistent results.",
    "Each pair is assigned a site type (hospital, warehouse, school, rooftop deployment) and writes a pre-survey checklist covering floor plans, requirements, access, safety and equipment on sticky notes.",
    "Pairs post their checklists and the class identifies items that apply everywhere versus items specific to one site."
   ]
  },
  "discussion": [
   "If a customer cannot provide any floor plans, what alternatives do you have, and how would you document the reduced accuracy?",
   "Who should own the survey requirements document, and what happens to the survey when requirements change mid-project?"
  ],
  "exit": [
   [
    "Why should you calibrate a floor plan using the longest distance you can measure?",
    "Small measurement errors over short distances become large scale errors across the building; a long baseline minimizes them."
   ],
   [
    "A requirement states voice must work in stairwells. How does that change your survey plan?",
    "Stairwells must be included in the survey route and measured against the voice requirements."
   ],
   [
    "Name one safety precaution specific to surveying in a hospital.",
    "Following infection control procedures before opening ceiling tiles (also acceptable: escorts and respecting patient areas)."
   ]
  ],
  "differentiation": [
   "Support: Give students a checklist template with the five category headings already printed so they only need to fill in specific items for their site.",
   "Extend: Ask fast finishers to estimate how far off an AP count could be if the floor plan scale were 20 percent too large, and explain why coverage area errors grow faster than linear errors."
  ]
 },
 {
  "t": "Post-installation validation surveys against design requirements",
  "objectives": [
   "Students will be able to explain why validation must be measured against documented design requirements.",
   "Students will be able to describe the roles of passive, active and spectrum measurements in a validation survey.",
   "Students will be able to identify common validation findings and propose appropriate remediation.",
   "Students will be able to list the contents of a validation report and explain its value as a baseline."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers about how you would prove a network is finished."
   ],
   [
    12,
    "Teach",
    "Write a sample requirements table on the board (signal, SNR, secondary coverage, overlap, roaming). Explain passive, active and spectrum roles, the survey adapter offset issue and RRM drift. Walk through remediation and the report."
   ],
   [
    18,
    "Activity",
    "Run the pass or fail review described below."
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
  "warmup": "A contractor says the Wi-Fi is finished because every access point powers on and the lights are green. What would you need to see before you agreed?",
  "activity": {
   "title": "Pass or fail: reviewing validation results",
   "materials": "A printed requirements sheet and a printed results sheet the teacher prepares (a simple table of rooms with measured signal, SNR, number of same-channel APs heard, retry percentage and roam time), a simple hand-drawn floor sketch, highlighters, whiteboard.",
   "steps": [
    "In groups of three, students compare each room's results against the requirements sheet and highlight every failure.",
    "For each failure, the group proposes a likely cause and a remediation, such as adding an AP, lowering power or changing a channel, noting which neighboring rooms might be affected.",
    "The teacher reveals one extra fact: the survey used a high-gain adapter with no offset. Groups decide which passing rooms might actually fail for handsets and mark them.",
    "Each group drafts a five-line summary for the validation report: requirements, method, findings, fixes, remaining open items.",
    "Two groups read their summaries aloud and the class compares conclusions."
   ]
  },
  "discussion": [
   "If the customer wants sign-off today but two rooms still fail, how would you document that honestly while keeping the project moving?",
   "Should RRM be locked during validation? What are the arguments for and against?"
  ],
  "exit": [
   [
    "What must every validation measurement be compared against?",
    "The documented design requirements, which define pass or fail."
   ],
   [
    "Which survey type shows roaming performance during validation?",
    "An active survey on the relevant SSID."
   ],
   [
    "Name two items a validation report should contain.",
    "Any two of: the requirements, methods and tools (including client or offset), heat maps, issues found, fixes applied, final confirmation of each requirement."
   ]
  ],
  "differentiation": [
   "Support: Provide the results table with failures already highlighted so students focus on proposing causes and remediation.",
   "Extend: Ask fast finishers to explain how adding an AP to fix a coverage hole could cause a new co-channel overlap failure, and how they would choose its channel and power."
  ]
 },
 {
  "t": "Spectrum analysis: FFT, waterfall and duty cycle views; identifying non-Wi-Fi interferers",
  "objectives": [
   "Students will be able to explain why a spectrum analyzer, not a Wi-Fi adapter or protocol analyzer, is needed to identify non-Wi-Fi interference.",
   "Students will be able to describe what the FFT, waterfall and duty cycle views each display.",
   "Students will be able to recognize the typical signatures of Wi-Fi, Bluetooth, microwave ovens and continuous transmitters.",
   "Students will be able to recommend remediation for an identified interferer."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and discuss what the lunchtime pattern suggests."
   ],
   [
    15,
    "Teach",
    "Draw the axes for each view on the whiteboard. Sketch a Wi-Fi block, a narrowband spike, Bluetooth dots, microwave bursts and a continuous stripe. Explain duty cycle with a simple timeline showing a brief strong burst versus a constant weaker signal."
   ],
   [
    15,
    "Activity",
    "Run the signature matching exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "The Wi-Fi in a break room fails every day around lunch and recovers by 1 p.m. What might be going on, and why would the access point logs not tell you?",
  "activity": {
   "title": "Name that interferer",
   "materials": "Printed cards with hand-drawn or teacher-sketched waterfall and FFT patterns (Wi-Fi channel block, Bluetooth hopping dots, microwave bursts in upper 2.4 GHz, continuous stripe, full-band jammer pattern, radar pulses in 5 GHz), a second set of device name cards, whiteboard.",
   "steps": [
    "Pairs match each pattern card to a device card and write one sentence explaining the visual clue they used.",
    "Pairs then rank the patterns by likely harm to Wi-Fi, using a duty cycle value the teacher has written on each card.",
    "The teacher reveals the correct matches and discusses any surprises, especially cases where a strong signal had low duty cycle.",
    "Each pair picks one interferer and writes a remediation plan with at least two options.",
    "Two pairs present their plans and the class suggests improvements."
   ]
  },
  "discussion": [
   "If AP-based spectrum monitoring flags an interferer somewhere on a large campus, how would you narrow down its physical location?",
   "Why might moving users to 5 or 6 GHz be a better long-term fix than hunting down every 2.4 GHz interferer?"
  ],
  "exit": [
   [
    "Which tool identifies non-Wi-Fi interference?",
    "A spectrum analyzer."
   ],
   [
    "What does a waterfall view show on each axis, and what does color mean?",
    "Frequency horizontally, time vertically, and color represents amplitude."
   ],
   [
    "Why can a moderate-strength signal with high duty cycle be more harmful than a strong brief one?",
    "It occupies the channel most of the time, so Wi-Fi devices defer constantly or suffer corrupted frames."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference sheet with one labeled example of each view, so students can compare pattern cards side by side.",
   "Extend: Ask fast finishers to explain how a jammer and a very busy Wi-Fi channel would look different on the waterfall and duty cycle views, and which other tool would confirm the difference."
  ]
 },
 {
  "t": "Protocol analysis: monitor mode, channel selection, capture location, filters",
  "objectives": [
   "Students will be able to explain why monitor mode is required to capture 802.11 management, control and other stations' frames.",
   "Students will be able to choose the correct channel, width and number of adapters for a capture, including roaming captures.",
   "Students will be able to justify an analyzer location based on whose perspective is needed.",
   "Students will be able to apply Wireshark display filters to isolate a device, handshakes, deauthentications and retries."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about why a normal laptop running a capture tool misses most Wi-Fi traffic."
   ],
   [
    12,
    "Teach",
    "Explain normal versus monitor mode with a diagram of the network stack. Draw two APs on different channels and a roaming client to show the one-radio, one-channel limit. Sketch a hidden node layout to show why capture location matters. List key display filters on the board."
   ],
   [
    20,
    "Activity",
    "Run the capture planning and filter practice exercise described below."
   ],
   [
    3,
    "Discuss",
    "Use one discussion question about authorization and privacy of captures."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you run a packet capture tool on a laptop connected to Wi-Fi, why will you not see other people's frames or the beacons from access points?",
  "activity": {
   "title": "Plan the capture, then filter it",
   "materials": "Printed scenario cards (single client drops, roaming between two channels, hidden node at a warehouse aisle, authentication failures), a printed excerpt of capture output the teacher prepares showing frame numbers, source, destination, type and subtype, retry flag and reason code, student laptops with a browser for note-taking, whiteboard.",
   "steps": [
    "In pairs, students take one scenario card and write a capture plan: adapter mode, channel and width, number of adapters, and where the analyzer sits.",
    "Pairs swap plans with another pair, who must find one weakness in the plan.",
    "Each pair then works through the printed capture excerpt and writes the display filter they would use to find the client's frames, the handshake, deauthentications and retries.",
    "Pairs use their filters mentally on the excerpt, mark the matching frames and identify the frame where the problem begins.",
    "The class reviews the answers, and the teacher shows on the projector how combining a MAC filter with a deauthentication filter narrows the excerpt."
   ]
  },
  "discussion": [
   "Capture files can contain sensitive information. What policies should govern who can capture, where captures are stored and how long they are kept?",
   "When would an AP-based remote capture be better than walking to the site with a laptop, and when would it be worse?"
  ],
  "exit": [
   [
    "What does monitor mode allow an adapter to capture that normal mode does not?",
    "All 802.11 frames on the channel, including management and control frames and frames addressed to other devices."
   ],
   [
    "How many adapters do you need to capture a roam between APs on channels 1 and 11?",
    "Two, one on each channel, capturing at the same time (or AP-based captures from both APs)."
   ],
   [
    "Write a display filter that shows only retransmitted frames.",
    "`wlan.fc.retry == 1`."
   ]
  ],
  "differentiation": [
   "Support: Provide a filter reference card listing the filters with plain-language descriptions, so students focus on choosing the right one.",
   "Extend: Ask fast finishers to explain why a two-stream capture adapter might show a three-stream client's data frames as unreadable, and how they would choose an adapter for an 802.11ax network."
  ]
 },
 {
  "t": "Key metrics: RSSI, SNR, retry rate, channel utilization, data rates",
  "objectives": [
   "Students will be able to define RSSI, SNR, retry rate, channel utilization and data rate, and explain why RSSI is vendor-specific.",
   "Students will be able to calculate SNR from signal and noise floor values.",
   "Students will be able to interpret combinations of metrics to identify coverage, interference, contention and overhead problems.",
   "Students will be able to explain why data rate differs from throughput."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list what students think full bars actually measures."
   ],
   [
    12,
    "Teach",
    "Define each metric on the whiteboard with a sample value and a typical problem it reveals. Work two SNR calculations. Explain why RSSI differs between devices and why data rate is not throughput."
   ],
   [
    18,
    "Activity",
    "Run the metric detective exercise described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Your phone shows full Wi-Fi bars but a video call keeps freezing. List three things other than signal strength that could be wrong.",
  "activity": {
   "title": "Metric detective",
   "materials": "Six printed case cards the teacher prepares, each listing signal, noise floor, retry rate, channel utilization, client count and typical data rate for one location, plus a cause card set (coverage hole, interference, hidden node, co-channel contention, SSID overhead, client or application issue), whiteboard.",
   "steps": [
    "In groups of three, students calculate SNR for each case card and write it on the card.",
    "Groups match each case to the most likely cause card and write the two metrics that convinced them.",
    "Groups propose one next diagnostic step for each case, such as spectrum analysis, a capture near specific clients or a channel plan review.",
    "The teacher reveals the answers; groups score a point for each correct cause and a bonus for a sensible next step.",
    "Close by building a pattern table on the board: metric combination on one side, likely cause on the other."
   ]
  },
  "discussion": [
   "Why do you think vendors show signal bars instead of SNR or retries to end users, and what problems does that create for support teams?",
   "If you could only monitor two metrics on every AP, which would you choose and why?"
  ],
  "exit": [
   [
    "Signal is -67 dBm and the noise floor is -92 dBm. What is the SNR?",
    "25 dB."
   ],
   [
    "Good signal, low SNR and high retries most likely indicate what kind of problem?",
    "Interference or noise, which calls for spectrum analysis."
   ],
   [
    "Why might two phones in the same spot report different RSSI values?",
    "RSSI is vendor-specific, and each chipset maps it to dBm differently (and antennas differ)."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page metric reference with good and poor example values for each metric, so students can compare case cards against it.",
   "Extend: Ask fast finishers to explain why a client's data rate drop after retries can increase channel utilization for every other client on the channel."
  ]
 },
 {
  "t": "Common RF problems: co-channel contention, adjacent channel interference, hidden nodes, low SNR",
  "objectives": [
   "Students will be able to explain the mechanism behind co-channel contention, adjacent channel interference, hidden nodes and low SNR.",
   "Students will be able to distinguish these problems using retry rate, channel utilization, noise floor and the channel plan.",
   "Students will be able to select the appropriate fix for each problem, including when RTS/CTS helps.",
   "Students will be able to explain why raising AP power often worsens these problems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up: two volunteers stand on opposite sides of a whiteboard and both try to talk to a third student at the same time."
   ],
   [
    12,
    "Teach",
    "Explain each problem with a whiteboard sketch: overlapping same-channel cells for CCC, a 2.4 GHz channel diagram showing overlap for ACI, the hidden node layout with RTS/CTS, and the SNR equation. Build a symptom table with retries and utilization columns."
   ],
   [
    18,
    "Activity",
    "Run the RF problem clinic described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "Two people who cannot see each other both start speaking to you at the same time. What happens, and how could you, standing in the middle, prevent it?",
  "activity": {
   "title": "RF problem clinic",
   "materials": "Printed patient chart cards the teacher prepares, each describing a site with signal, noise floor, retry rate, utilization, channel plan and a short floor sketch; a large symptom table drawn on the whiteboard; sticky notes.",
   "steps": [
    "Groups of three receive four patient charts and diagnose each as CCC, ACI, hidden node or low SNR, writing the deciding metrics on a sticky note.",
    "For each diagnosis, the group prescribes a fix and names one fix that would be wrong for that problem, with a reason.",
    "Groups post their diagnoses on the symptom table on the whiteboard.",
    "The teacher reviews disagreements and asks groups to explain why raising power was or was not appropriate for each case.",
    "Finish with a quick round where the teacher reads a symptom and students call out the problem."
   ]
  },
  "discussion": [
   "In a dense office with dozens of APs, why might disabling some 2.4 GHz radios improve performance for everyone?",
   "RTS/CTS helps hidden nodes but adds overhead. When would you avoid enabling it?"
  ],
  "exit": [
   [
    "High utilization, poor throughput and low retries with several same-channel APs heard: which problem?",
    "Co-channel contention."
   ],
   [
    "Which mechanism reserves the medium for a hidden client so other clients defer?",
    "RTS/CTS, because every device that hears the AP's CTS defers."
   ],
   [
    "Give the two possible causes of low SNR.",
    "Weak signal (distance, obstacles, low power) or high noise (interference, wide channels)."
   ]
  ],
  "differentiation": [
   "Support: Give students a decision flow starting with the question, are retries high or low, so they can work through each chart step by step.",
   "Extend: Ask fast finishers to explain why using 80 MHz channels in a dense 5 GHz deployment might increase both CCC and low SNR problems."
  ]
 },
 {
  "t": "Client problems: sticky clients, power mismatch between AP and client, driver issues",
  "objectives": [
   "Students will be able to explain why clients, not APs, make roaming decisions and how that leads to sticky clients.",
   "Students will be able to describe power mismatch between AP and client and its symptoms.",
   "Students will be able to recommend remedies, including 802.11k, 802.11v, minimum data rates and AP power adjustment.",
   "Students will be able to identify evidence that points to a driver or firmware issue."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about who decides when a phone switches access points."
   ],
   [
    12,
    "Teach",
    "Draw two AP cells and a walking client to illustrate sticky behavior. Draw a large AP cell and a small client range to show power mismatch. Explain 802.11k, 802.11v and minimum basic rates, and contrast with 802.11r. Close with the one-model-fails driver clue."
   ],
   [
    18,
    "Activity",
    "Run the help desk role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "When your phone moves from one access point to another as you walk through a building, who makes that decision: the phone or the network?",
  "activity": {
   "title": "Help desk role-play: is it the client?",
   "materials": "Printed ticket cards the teacher prepares (sticky laptop in a meeting room, warehouse handhelds with failed uploads at full bars, one tablet model dropping calls, phones not seeing a 6 GHz SSID), printed evidence cards for each ticket (signal readings, retry direction, device models affected, driver version), whiteboard.",
   "steps": [
    "Students form pairs: one plays the user describing a ticket, the other plays the support engineer who may ask questions.",
    "The engineer requests evidence; the user hands over evidence cards only when the right question is asked, such as which device models are affected.",
    "The engineer writes a diagnosis (sticky client, power mismatch, driver issue) and a remedy on the ticket card.",
    "Pairs swap roles with a new ticket and repeat.",
    "The class reviews each ticket type, and the teacher highlights the questions that unlocked the key evidence."
   ]
  },
  "discussion": [
   "If a key client device does not support 802.11k or 802.11v, what other tools does the network team have to influence its roaming?",
   "How would you balance lowering AP power to fix power mismatch against the cost of adding more APs?"
  ],
  "exit": [
   [
    "Which amendment lets an AP give clients a list of nearby roaming candidates?",
    "802.11k (neighbor reports)."
   ],
   [
    "A client shows full bars but uploads fail. Which problem is likely?",
    "A power mismatch between a high-power AP and a lower-power client."
   ],
   [
    "What is the strongest clue that a problem is caused by a client driver?",
    "Only one make or model of device has the problem while others in the same place work normally."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-column cheat sheet (sticky client, power mismatch, driver issue) listing symptoms and fixes, and have students match tickets to columns.",
   "Extend: Ask fast finishers to explain how 802.11k, 802.11v and 802.11r work together during a voice roam, and which one shortens the actual transition."
  ]
 },
 {
  "t": "Connection problems: wrong passphrase, expired RADIUS certificates, DHCP and VLAN errors",
  "objectives": [
   "Students will be able to list the stages of a Wi-Fi connection and identify the stage at which a failure occurs.",
   "Students will be able to recognize the handshake pattern of a wrong passphrase in WPA2-Personal and where WPA3-Personal fails instead.",
   "Students will be able to explain how an expired RADIUS server certificate breaks TLS-based EAP authentication.",
   "Students will be able to distinguish DHCP failures from VLAN misconfiguration and propose checks for each."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student guesses for why someone cannot connect."
   ],
   [
    12,
    "Teach",
    "Draw the connection ladder on the whiteboard: SSID, association, authentication, 4-way handshake, DHCP, gateway and DNS. Mark where each of the four lesson problems fails and what evidence appears at that rung."
   ],
   [
    18,
    "Activity",
    "Run the connection ladder triage described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A friend says they cannot connect to Wi-Fi. What questions would you ask first to figure out where the problem is?",
  "activity": {
   "title": "Connection ladder triage",
   "materials": "A ladder drawn on the whiteboard with six rungs labeled by stage, printed evidence cards the teacher prepares (log lines such as MIC failure, EAP TLS handshake aborted, DHCP no offer received, client address 169.254.x.x, VLAN not allowed on trunk, a scope at 100 percent), sticky notes, tape.",
   "steps": [
    "Groups of three receive a set of evidence cards and tape each card next to the ladder rung where that failure occurs.",
    "For each card, the group writes the most likely cause and one check to confirm it on a sticky note.",
    "The teacher reads three user stories (one user, everyone, one group affected); groups decide which card and cause best match each story.",
    "Groups compare their placements on the board and resolve any disagreements with evidence.",
    "Finish by having each group write the order of checks they would follow for an unknown cannot connect ticket."
   ]
  },
  "discussion": [
   "How could an organization make sure a RADIUS server certificate never expires unnoticed again?",
   "Why might long DHCP lease times be a problem on a busy guest network but fine on a staff network?"
  ],
  "exit": [
   [
    "A client associates, the AP receives message 2 of the 4-way handshake and then deauthenticates it. Likely cause on WPA2-Personal?",
    "A wrong passphrase causing a MIC failure."
   ],
   [
    "Every 802.1X user suddenly fails during the TLS part of PEAP. What should you check first?",
    "Whether the RADIUS server certificate has expired or been replaced with one clients do not trust."
   ],
   [
    "A client has a 169.254.x.x address. Name two possible causes.",
    "Any two of: DHCP scope exhausted, DHCP server down, missing DHCP relay, firewall blocking DHCP, VLAN not allowed or mis-tagged on the trunk, invalid dynamic VLAN."
   ]
  ],
  "differentiation": [
   "Support: Give students a version of the ladder with each rung's typical evidence already listed, so they focus on matching causes and checks.",
   "Extend: Ask fast finishers to explain how they would tell a missing DHCP relay from a trunk VLAN mismatch using only switch and router checks."
  ]
 },
 {
  "t": "Structured troubleshooting and documenting findings",
  "objectives": [
   "Students will be able to list the steps of a structured troubleshooting method in order.",
   "Students will be able to identify the correct next step for a troubleshooting scenario.",
   "Students will be able to select appropriate tools to test a theory of probable cause.",
   "Students will be able to write a troubleshooting record that documents symptoms, evidence, root cause, changes and verification."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario and ask students what went wrong with the previous technician's approach."
   ],
   [
    10,
    "Teach",
    "Write the seven steps on the whiteboard as a numbered sequence. For each step, give one Wi-Fi example and name the tool or evidence involved. Stress verification, documentation and changing one thing at a time."
   ],
   [
    20,
    "Activity",
    "Run the next step relay and ticket write-up described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions."
   ]
  ],
  "warmup": "A technician fixed a Wi-Fi problem by changing five settings at once, and it came back two days later. What problems does that create for the next person who has to fix it?",
  "activity": {
   "title": "Next step relay and ticket write-up",
   "materials": "Printed step cards (one per troubleshooting step), a printed multi-stage case study the teacher writes about a Wi-Fi problem with clues revealed in stages, blank ticket templates with fields for symptoms, evidence, root cause, changes, verification and follow-up, whiteboard.",
   "steps": [
    "Groups of four shuffle the step cards and race to arrange them in the correct order; the teacher checks each group.",
    "The teacher reveals the case study one stage at a time; after each stage, groups hold up the step card for what should happen next and justify it.",
    "At the testing stage, groups must name the tool they would use and what result would confirm or disprove their theory.",
    "Once the case is resolved, each group fills in the ticket template as if closing the ticket.",
    "Groups swap tickets and check whether another engineer could understand the root cause and repeat the fix from the record alone."
   ]
  },
  "discussion": [
   "When should a troubleshooter escalate rather than implement a fix themselves?",
   "What makes documentation useful to the next person, and what makes it useless?"
  ],
  "exit": [
   [
    "List the troubleshooting steps in order.",
    "Identify the problem, establish a theory of probable cause, test the theory, plan of action, implement or escalate, verify full system functionality, document findings."
   ],
   [
    "A theory has been tested and confirmed. What is the next step?",
    "Create a plan of action to resolve the problem, considering impact and rollback."
   ],
   [
    "Why is verification more than asking the original user if it works?",
    "The change could create new problems elsewhere, such as coverage holes, so the wider system must be checked."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed step list with one example for each step to keep on their desk during the relay.",
   "Extend: Ask fast finishers to write a short rollback plan for a channel and power change on a busy floor, including how they would measure success."
  ]
 }
]);
