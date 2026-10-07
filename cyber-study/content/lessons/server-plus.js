/* Lessons for CompTIA Server+ (SK0-005): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("server-plus", [
 {
  "t": "Rack planning: rack units, rail kits, weight distribution (heaviest at the bottom), airflow, hot and cold aisles, cable management arms",
  "hook": "It is your second week at Juniper Valley Logistics, and the facilities manager hands you a pallet: four new 2U servers, a 3U UPS with an extra battery pack, and a box of rails. The rack in the corner already holds a switch at the top and a jumble of cables at the back. Someone has taped a note to the door: 'Just put it wherever it fits.' You notice the room feels warm, and two servers in the rack are already logging high inlet temperatures. Before you lift anything, you have to decide where each device goes, how it mounts, and which way it faces. Get it wrong and the rack runs hot, or worse, tips forward the first time someone slides a server out. So where does everything go?",
  "simple": "A server rack is a tall metal cabinet with shelves of a standard size, like a bookcase where every shelf is the same height. Each shelf slot is called a rack unit, or U, and is 1.75 inches tall. A small server takes one slot; a bigger one takes two or more. Planning a rack means deciding what goes in each slot. Heavy things go at the bottom, just as you load the heaviest boxes on the bottom of a bookcase so it will not tip over. Servers pull cool air in through the front and push warm air out the back, so racks are lined up so that all the fronts face one cool walkway and all the backs face a warm walkway. Neat cables and covers over empty slots keep that air moving the right way.",
  "body": [
   "Most servers in a data center live in a standard 19-inch equipment rack. The 19 inches is the width of the mounting space between the vertical rails, and it is the same across vendors, which is why a switch from one manufacturer and a server from another can share a cabinet. Planning that rack before you bolt anything in saves you from overheating equipment, a tipping cabinet, and a tangle of cables nobody can trace. Server+ expects you to know the unit of measure, how equipment is mounted, where heavy gear goes and how air should move.",
   "Start with the unit of measure. Height inside a rack is measured in rack units (U). One U is 1.75 inches (44.45 mm). A server described as 1U is 1.75 inches tall, a 2U server is 3.5 inches, a 4U server is 7 inches, and so on. Full-height racks are commonly 42U, though other heights exist. When you plan, you add up the U of every device plus room for patch panels, blanking panels, cable managers and future growth. You then write the plan down as a rack elevation diagram, a drawing of the rack front and back that shows exactly what sits in each numbered U position. Rack positions are usually numbered from the bottom up, so U1 is the lowest slot. A good elevation diagram is what lets a technician at a remote site install the right device in the right place without guessing.",
   "Next, consider how equipment is held in place. Servers mount on rail kits. Sliding rails let you pull a server out like a drawer to swap a part, such as a memory module or a fan, without unracking it. Fixed or static rails simply hold the device; to service it you usually power it down and remove it. Rails come in tool-less versions that snap into square-hole racks and threaded versions that need screws or cage nuts, small square nuts clipped into the rack holes. Always use the rails designed for the specific chassis and rack type, and check the rack's rated load and the rail's rated load before installing heavy devices. Some network gear uses simple front ears instead of rails, which is fine for light equipment but not for a deep, heavy server.",
   "Sliding rails create a cabling problem, and the cable management arm solves it. A cable management arm (CMA) attaches to the back of a sliding server and folds its power and network cables along a hinged path. When you pull the server forward, the arm unfolds and the cables follow, so the server can slide out without unplugging anything. That means you can replace a hot-swappable fan or check a label while the server keeps running. The trade-off is that a bulky arm can partly block exhaust airflow, so route cables neatly and use the arm the vendor designed for that chassis.",
   "Weight distribution is a safety rule, not a preference. Put the heaviest equipment, such as uninterruptible power supply (UPS) units, battery packs and large storage arrays, at the bottom. Heavy gear low in the rack keeps the center of gravity close to the floor. A top-heavy rack can tip over when someone extends a server on its rails, because the extended server moves weight forward past the front feet. Install stabilizer feet or anti-tip plates, or bolt the rack to the floor, and extend only one device at a time. Load racks from the bottom up during installation, and unload them from the top down when removing equipment.",
   "Airflow is the next thing to plan. Servers pull cool air in the front and exhaust hot air out the back. In a hot aisle/cold aisle layout, rows of racks face each other so their fronts share a cold aisle fed by cool air, often through perforated floor tiles or overhead ducts, and their backs share a hot aisle where exhaust is collected and returned to the cooling units. Mixing the two, for example by facing one row's exhaust into another row's intake, wastes cooling and raises inlet temperatures, which you would see as rising inlet temperature readings in the server's management console and fans spinning faster.",
   "Small gaps cause surprisingly large problems. Blanking panels in empty U spaces stop hot exhaust from recirculating through gaps to the front of the rack, where it would be pulled straight back into the server intakes. A rack with several missing blanking panels can have servers near the gaps running much hotter than identical servers elsewhere in the same rack. Some sites go further and add aisle containment, such as doors at the ends of an aisle or a roof over it, to keep the hot and cold streams completely separate. Containment can be built around either the cold aisle or the hot aisle; the goal is the same.",
   "Finally, good cable management supports airflow too. Route cables along the sides of the rack using vertical cable managers, keep power and data runs tidy and separated where practical, label both ends of every cable, and never block fan intakes or exhaust with cable bundles. Leave enough slack for sliding rails and cable management arms to move, but not so much that loops hang behind the fans and trap heat. Tidy cabling also makes troubleshooting faster: when a link fails at 3 a.m., a labeled, traceable cable is a five-minute fix instead of an hour of tugging wires."
  ],
  "analogy": "Planning a rack is like loading a tall bookcase in a room with a heater on one side. You put the heaviest books on the bottom shelf so the case cannot tip when you pull something out, and you face the bookcase so the side that needs cool air is away from the heater. Leaving a shelf empty with no back panel would let hot air leak through. The analogy stops at airflow direction: in a real rack, air must flow front to back through every device, so every server must face the same way.",
  "terms": [
   [
    "Rack unit (U)",
    "The standard vertical measure for rack equipment: 1.75 inches (44.45 mm)."
   ],
   [
    "Rack elevation diagram",
    "A drawing of a rack that shows which device occupies each numbered U position, front and back."
   ],
   [
    "Sliding rails",
    "Rails that let a server extend out of the rack like a drawer for service without being removed."
   ],
   [
    "Hot aisle/cold aisle",
    "A layout where rack fronts face a shared cool-air aisle and backs face a shared exhaust aisle, keeping intake and exhaust air separate."
   ],
   [
    "Blanking panel",
    "A plate that covers an empty rack space so hot exhaust air cannot loop back to the equipment intakes."
   ],
   [
    "Cable management arm (CMA)",
    "A hinged arm on the back of a sliding server that carries its cables so the server can be extended without disconnecting them."
   ]
  ],
  "example": "A team adds six 2U servers to a 42U rack that already holds a 3U UPS at the top. During planning they move the UPS and its battery pack to the bottom, place the servers above it, fill the unused spaces with blanking panels, and orient the rack so the servers draw air from the cold aisle. They update the rack elevation diagram and fit cable management arms so each server can slide out for service.",
  "mistakes": [
   [
    "Putting the UPS at the top of the rack because it is easier to reach the buttons.",
    "UPS units and battery packs are among the heaviest items in a rack. They belong at the bottom to keep the center of gravity low and prevent tipping."
   ],
   [
    "Leaving empty U spaces open to 'help ventilation'.",
    "Open gaps let hot exhaust recirculate to the front intakes. Blanking panels are the correct answer; they improve cooling by keeping hot and cold air separate."
   ],
   [
    "Thinking one U equals one inch or that a 2U server is 2 inches tall.",
    "One U is 1.75 inches, so a 2U server is 3.5 inches tall and a 4U server is 7 inches."
   ],
   [
    "Turning one row of racks around so it is 'easier to reach the back'.",
    "That points one row's exhaust into another row's intake. All fronts in a pair of rows should face the shared cold aisle."
   ]
  ],
  "tryit": [
   [
    "You must install a 4U storage array, two 1U servers, a 2U UPS and a 1U switch in an empty rack. Space is not a problem, but the rack sits in an older room with no floor bolts. A coworker suggests mounting the switch at the bottom so cables reach the floor trunk easily. Where should the UPS and storage array go, and what else should you do before anyone slides a server out?",
    "Put the UPS at the bottom and the heavy storage array just above it, then the servers, with the switch higher up (network cabling can drop from overhead or run up the sides). Because the rack is not bolted down, install stabilizer feet or anti-tip plates, fill empty spaces with blanking panels, and extend only one device at a time."
   ],
   [
    "A server in the middle of a rack reports inlet temperatures well above its neighbors. The servers above and below it are identical and run cooler. Looking at the front of the rack, you see two empty U spaces directly beside it with nothing covering them. What is the most likely cause and fix?",
    "Hot exhaust is recirculating from the back of the rack through the open gaps to the front, where this server draws it in. Install blanking panels in the empty spaces so intake air comes only from the cold aisle."
   ]
  ],
  "tip": "If a question asks where to put the UPS or the heaviest device, the answer is the bottom of the rack. If it asks how to stop hot air recirculating through empty rack spaces, the answer is blanking panels. A CMA is the answer when the goal is servicing a sliding server without unplugging it.",
  "check": [
   [
    "How tall is a 4U server?",
    "Seven inches, because each rack unit is 1.75 inches."
   ],
   [
    "Why should server intakes face the cold aisle?",
    "Servers draw air in the front and exhaust it out the back, so facing the cold aisle gives them cool intake air while exhaust goes to the hot aisle for removal."
   ],
   [
    "What does a cable management arm let you do?",
    "Slide a server out on its rails for service without unplugging its power and network cables."
   ],
   [
    "Why can extending a server tip a rack over?",
    "Extending it moves weight forward past the front feet; if the rack is top-heavy or not stabilized, the center of gravity can shift enough to tip it. Heavy gear at the bottom and stabilizers prevent this."
   ]
  ]
 },
 {
  "t": "Server form factors: tower, rack mount, blade enclosures",
  "hook": "Priya runs IT for Maple Street Dental, three offices and no server room, just a supply closet with a door that locks. Across town, her friend Marcus at Northgate Health is planning a data center expansion that needs room for dozens of new compute nodes in two racks. Both of them send you the same question on the same afternoon: 'Which servers should we buy?' The processors, memory and drives they need might be almost identical. Yet the right answer for Priya would be a disaster for Marcus, and the other way round. What is it about the physical box, its shape, its power and its cabling, that makes the difference?",
  "simple": "A server's form factor is simply its shape and how it is housed. There are three main kinds. A tower server looks like a big desktop computer and sits on the floor; it is good when you only need one or two. A rack mount server is a flat box that slides into a tall metal cabinet called a rack, so you can stack many of them neatly. A blade server is even thinner and slides into a shared box, called an enclosure, that provides power, cooling fans and network connections for all the blades at once. Think of it like housing: a tower is a detached house, rack servers are apartments in a building, and blades are dorm rooms that share a kitchen and bathrooms.",
  "body": [
   "A server's form factor is its physical shape and how it is housed. The same processor and memory can come in very different packages, and the right choice depends on how many servers you need, how much floor or rack space you have, and how you want power, cooling and networking to be shared. Server+ tests three form factors: tower, rack mount and blade. Exam questions usually describe a situation, such as a small office or a crowded data center, and ask which form factor fits best, so focus on the strengths and weaknesses of each.",
   "The simplest is the tower. A tower server looks like a large desktop computer and stands on the floor or a shelf. It needs no rack, is usually quiet, and often has plenty of internal drive bays and expansion slots because the tall case has room inside. Towers suit small offices or branch sites that need one or two servers and have no server room. Their weaknesses are density and management at scale: ten towers take up a lot of floor space, each has its own power cords, keyboard-video-mouse cabling and network cables, and they are awkward to secure physically, since a tower can be carried away unless it is locked down. Some towers can be converted to rack mount with a conversion kit, which is useful when a small business grows into a proper rack.",
   "The workhorse of most data centers is the rack mount server. A rack mount server is a flat chassis that bolts into a standard 19-inch rack on rails. Sizes are given in rack units (U), where one U is 1.75 inches. 1U servers are dense but have room for only a few drives and low-profile expansion cards, usually mounted on riser cards. 2U and 4U servers trade density for more drive bays, full-height expansion cards, larger and quieter fans and sometimes more processors. Each rack server is still a complete, independent machine with its own power supplies, fans and network ports, so a rack full of them needs many power and network cables, and each one is managed through its own baseboard management controller.",
   "Blades take a different approach by sharing infrastructure. A blade system has two parts. The blade enclosure (also called a chassis) mounts in the rack and provides shared power supplies, cooling fans, a management module and network or storage interconnect modules. Blade servers slide into slots in the front of the enclosure; each blade holds processors, memory and usually a small amount of local storage, but relies on the enclosure for power, cooling and connectivity. The blades connect to the enclosure through a backplane or midplane, a circuit board inside the chassis that carries power and data between the blades and the shared modules.",
   "Blades bring clear advantages. They give the highest density, packing many servers into a few rack units, and far fewer cables, because the enclosure's interconnect modules aggregate the network and storage links that would otherwise be dozens of separate cables. A single management interface can monitor and control every blade, which makes provisioning many identical nodes faster. Replacing a failed blade is usually a matter of sliding it out and sliding a new one in.",
   "Those advantages come with trade-offs. The enclosure has a higher up-front cost, so blades only make financial sense when you will fill a good share of the slots. There is vendor lock-in, because blades only fit that vendor's chassis and interconnect modules. And the shared components, such as the backplane or midplane, power supplies and interconnects, must be designed with redundancy so they are not a single point of failure. If the enclosure itself loses power, every blade inside goes down at once.",
   "When choosing, match the form factor to the situation. A single file server at a small office points to a tower. A growing data center that needs flexible, independent servers, each with its own mix of drives and cards, points to rack mount. A site that needs many identical compute nodes in minimal space with centralized management points to blades. Also consider power density: a fully loaded blade enclosure draws a lot of power and produces a lot of heat in a small area, so the rack's circuits and the room's cooling must be sized for it. A rack of blades can exceed what an older server room was designed to power and cool, even when the same number of rack servers would have fit."
  ],
  "analogy": "Form factors are like types of housing. A tower is a detached house: roomy and independent, but it takes up land. Rack servers are apartments in a building: stacked efficiently, yet each has its own kitchen and utilities. Blades are dorm rooms that share a kitchen, laundry and heating: very dense and cheap per room, but if the shared boiler fails, everyone is cold. That last point is the exam-critical one, since the shared enclosure needs redundancy. The analogy breaks down on cost: a blade enclosure is expensive up front even when empty.",
  "terms": [
   [
    "Form factor",
    "The physical size, shape and housing of a server."
   ],
   [
    "Tower server",
    "A free-standing server in an upright case, suited to small sites without a rack."
   ],
   [
    "Rack mount server",
    "A server built to bolt into a 19-inch rack, sized in rack units (1U, 2U, 4U)."
   ],
   [
    "Blade enclosure",
    "A rack-mounted chassis that supplies shared power, cooling, networking and management to the blade servers inserted into it."
   ],
   [
    "Blade server",
    "A thin server module containing CPU and memory that depends on its enclosure for power, cooling and connectivity."
   ],
   [
    "Midplane or backplane",
    "The circuit board inside a blade enclosure that connects blades to the shared power and interconnect modules."
   ]
  ],
  "example": "A clinic with one small closet and no rack buys a tower server for file sharing. The hospital's data center, which runs hundreds of virtual machines, uses blade enclosures so that sixteen compute nodes share redundant power supplies and a single management module in a fraction of the rack space. Its database servers, which need many local drives and full-height cards, are 2U rack mount servers in the next rack.",
  "mistakes": [
   [
    "Choosing blades for a small office because they are 'the most advanced'.",
    "Blades need an expensive enclosure, a rack and enough power and cooling. For one or two servers at a small site without a rack, a tower is the sensible choice."
   ],
   [
    "Believing each blade has its own power supplies and fans.",
    "Blades rely on the enclosure for power, cooling and connectivity. That shared design is what reduces cabling and increases density."
   ],
   [
    "Assuming a 1U server is always better because it is denser.",
    "1U trades expansion for density. A 2U or 4U server offers more drive bays, full-height cards and better cooling, which may matter more than saving rack space."
   ],
   [
    "Thinking blades from one vendor can go in another vendor's enclosure.",
    "Blade systems are proprietary. Vendor lock-in is a classic exam trade-off for blades."
   ]
  ],
  "tryit": [
   [
    "Harbor Credit Union is opening a branch with a single back room, no rack and limited budget. It needs one server for file sharing and print services. The regional manager has seen a blade enclosure demo and wants 'the same thing' for consistency with headquarters. What form factor do you recommend and why?",
    "A tower server. It needs no rack, is quiet enough for a back room and has internal drive bays for file storage. A blade enclosure would add heavy up-front cost, require a rack and power capacity, and deliver density the branch does not need."
   ],
   [
    "A research lab must add forty identical compute nodes to a data center where rack space is nearly full and cable trays are overloaded. The team wants to manage all the nodes from one console. Which form factor fits, and what must you check before ordering?",
    "Blades, because they give the highest density, far fewer cables and centralized management. Before ordering, confirm the rack's power circuits and cooling can handle the high power density, and that the enclosure has redundant power supplies and interconnects so it is not a single point of failure."
   ]
  ],
  "tip": "Blades win on density and cabling but depend on a shared enclosure and one vendor. If a question stresses fewer cables, shared power and cooling and centralized management, think blade. If it stresses a small site with no rack, think tower. If it stresses independent servers with room for drives and cards, think rack mount.",
  "check": [
   [
    "Which form factor shares power supplies and fans among many servers?",
    "Blade servers, which draw power, cooling and connectivity from the blade enclosure."
   ],
   [
    "Why might you choose a 2U rack server over a 1U server?",
    "A 2U chassis has room for more drives, full-height expansion cards and larger, quieter fans, at the cost of rack density."
   ],
   [
    "Name two disadvantages of blade systems.",
    "Higher up-front cost for the enclosure and vendor lock-in; also, the shared enclosure must be built with redundancy to avoid a single point of failure, and power density is high."
   ]
  ]
 },
 {
  "t": "Power: voltage, redundant power supplies, PDUs, UPS sizing and runtime, generators, separate circuits, power connector types",
  "hook": "At 4:10 p.m. on a Friday, an electrician at Cedar Ridge Credit Union flips the wrong breaker in the server room. Half the lights on the rack PDUs go dark. Every server has two power supplies, so the team expected nothing to happen. Instead, three servers drop instantly, and the member banking portal goes down with them. When you walk the rack afterward, you find the problem in under a minute: both power cords of each failed server are plugged into the same strip. Two supplies, one circuit, zero redundancy. As the new administrator, you are asked to make sure this never happens again. Where does reliable power really begin and end?",
  "simple": "Servers need steady electricity, and planning power means thinking about every step from the wall to the server. Most servers have two power supplies, so if one breaks the other keeps the server running, but that only helps if the two cords plug into two different sources. A power distribution unit, or PDU, is a heavy-duty power strip that sits in the rack. A UPS, or uninterruptible power supply, is a big battery that keeps things running for a few minutes when the power goes out, like a phone's battery when you unplug the charger. For longer outages, a generator that runs on fuel takes over. The more devices the battery powers, the faster it runs down.",
  "body": [
   "Servers are only as reliable as the power feeding them. A server with redundant drives and network links still goes dark the instant it loses power. Server+ expects you to plan power from the wall outlet to the power supply: which voltage, how many supplies, how power is distributed in the rack, how long an uninterruptible power supply (UPS) will hold the load, and what takes over during a long outage. Think of it as a chain: utility power, transfer switch and generator, UPS, power distribution unit, and finally the server's own power supplies.",
   "Begin with voltage. Servers accept a range of input voltages. In North America, general outlets supply about 120 volts (V), while data centers commonly use 208 V or 240 V circuits because higher voltage delivers the same power with less current, which means more equipment per circuit and less heat in the wiring. Many regions use 230 V. Most server power supplies are auto-ranging and work across these voltages, but always check the label on the supply. Power in watts (W) equals volts times amps. UPS capacity is often given in volt-amperes (VA), which is apparent power; the watt rating is lower and depends on the power factor, the ratio of real power to apparent power. A UPS must be large enough in both watts and VA for the load you attach.",
   "Inside the server, redundancy starts with the power supply units. Most servers take redundant power supply units (PSUs), typically two hot-swappable units that slide out from the back. With both working, they share the load; if one fails, the other carries the whole server, and you replace the failed unit without shutting down. You would see the failure as an amber light on the supply and an alert in the server's management controller log. Redundancy only helps if the supplies are fed from separate sources. Plug PSU 1 into the A-side power distribution unit (PDU) and PSU 2 into the B-side PDU, each on its own circuit and ideally its own UPS. This A/B feed design means a single breaker, PDU or UPS failure takes out only half the supplies, and every server keeps running on the other half.",
   "The PDU is where power is shared out in the rack. A rack PDU is a strip of outlets built for racks, often mounted vertically at the back. Basic PDUs just distribute power. Metered PDUs show the current draw, either on a small display or over the network, so you can see how close a circuit is to its limit. Switched PDUs add remote control of individual outlets, so you can power-cycle a hung device from your desk without visiting the rack. When planning, keep each circuit's load comfortably under its breaker rating, and remember that if one side fails, the other side must carry the entire load of every dual-corded device.",
   "The UPS bridges short outages. A UPS uses batteries to keep equipment running through short outages and also conditions power, smoothing out sags, surges and noise. To size a UPS, add the wattage of every connected device, add headroom for growth (a common rule is to avoid loading a UPS near its maximum), and make sure both the watt and VA ratings cover the load. Runtime depends on load: the same UPS lasts much longer at 30 percent load than at 90 percent, so check the vendor's runtime chart rather than assuming a fixed number of minutes. Adding external battery packs extends runtime. The UPS should run long enough either to let a generator start or to trigger an orderly shutdown of servers through its management software, which watches the battery level and tells the operating systems to shut down cleanly before the batteries are exhausted.",
   "For long outages, a generator takes over. A standby generator powers the building, or at least the critical circuits, for hours or days as long as it has fuel. An automatic transfer switch (ATS) detects the loss of utility power and switches the load to the generator once the generator is running and stable. The UPS bridges the gap of seconds to minutes while the generator starts. When utility power returns, the ATS switches back. Generators need fuel and regular testing under load, because a generator that has only ever been started without load may fail when it is really needed.",
   "Finally, know the common connectors and keep circuits separate. Server power supplies usually have an IEC (International Electrotechnical Commission) C14 inlet and take a C13 cord for standard supplies; higher-current equipment such as large servers and some PDUs uses a C20 inlet with a C19 cord. Rack PDUs and UPS units may connect to the building with locking NEMA (National Electrical Manufacturers Association) plugs, such as the L5 series for 120 V or the L6 series for 208/240 V in North America; the locking twist keeps them from being pulled out by accident. Keep circuits separate and do not overload one branch. The design goal is simple: a tripped breaker should never take down both supplies of a server."
  ],
  "analogy": "Redundant power supplies are like a house with two water mains from two different streets. If one street's pipe bursts, the other keeps the taps running. But if both mains come off the same street pipe, one break still cuts you off, which is exactly what happens when both PSUs plug into the same PDU. The UPS is a water tank on the roof: it covers a short interruption, and how long it lasts depends on how much water you use. The generator is the delivery truck you call for a long outage.",
  "terms": [
   [
    "Redundant power supply",
    "A second PSU that can carry the full load if the first fails, usually hot-swappable."
   ],
   [
    "PDU (power distribution unit)",
    "A rack-mounted outlet strip; metered models report load and switched models allow remote outlet control."
   ],
   [
    "UPS (uninterruptible power supply)",
    "A battery-backed device that keeps equipment powered through short outages and conditions incoming power."
   ],
   [
    "Volt-amperes (VA)",
    "Apparent power; UPS units are rated in both VA and watts, and the watt rating is lower."
   ],
   [
    "Automatic transfer switch (ATS)",
    "A device that moves the load from utility power to a generator when utility power fails, and back when it returns."
   ],
   [
    "IEC C13/C14 and C19/C20",
    "Common server power connectors: C14 and C20 are the inlets on equipment, C13 and C19 are the matching cord ends."
   ]
  ],
  "example": "An administrator connects each server's two power supplies to PDU A and PDU B, which are fed by separate UPS units on separate circuits. When a breaker trips on circuit A, every server keeps running on its B-side supply, and nobody notices until the monitoring alert arrives. She then checks the metered PDU on side B to confirm it can carry the full load until the breaker is reset.",
  "mistakes": [
   [
    "Plugging both PSUs of a server into the same PDU because it is closer.",
    "That leaves a single point of failure. Each PSU must be fed from a separate PDU, circuit and ideally UPS, so one failure leaves the other path running."
   ],
   [
    "Believing a UPS gives a fixed runtime no matter what is connected.",
    "Runtime depends on load. Doubling the load cuts runtime sharply, so check the vendor's runtime chart at your expected load."
   ],
   [
    "Sizing a UPS only by its VA rating.",
    "The watt rating is lower than the VA rating. The UPS must cover the load in watts as well as VA, plus headroom."
   ],
   [
    "Thinking a generator alone keeps servers running through an outage.",
    "A generator takes seconds to minutes to start and stabilize. A UPS must carry the load until the ATS switches to the generator."
   ]
  ],
  "tryit": [
   [
    "A rack holds ten servers drawing a combined 3,000 W. You have a UPS whose runtime chart shows about 20 minutes at 3,000 W and much longer at lower loads. The building has no generator. Management asks you to guarantee the servers stay up through a two-hour outage. What do you tell them, and what do you configure?",
    "The UPS alone cannot carry this load for two hours. Options are adding battery packs, reducing the load, or adding a generator with an ATS. Until then, configure the UPS management software to trigger an orderly shutdown of the servers well before the batteries run out, so data is not corrupted."
   ],
   [
    "During a walkthrough you see a switched PDU on side A showing about 70 percent of its circuit's rated load, and side B showing about the same. Every server is dual-corded. Is this rack safe if side A fails?",
    "No. If side A fails, side B must carry the full load, about 140 percent of its circuit, and its breaker will likely trip, taking everything down. Each side should be loaded low enough that it can carry the whole rack alone."
   ]
  ],
  "tip": "Redundant PSUs plugged into the same PDU or circuit are not really redundant. Exam answers favor A and B feeds on separate circuits, and UPS runtime is determined by load, not just the UPS size. The UPS bridges to the generator; the ATS does the switching.",
  "check": [
   [
    "Why does a UPS last longer with fewer servers attached?",
    "Runtime depends on load; a lighter load drains the batteries more slowly."
   ],
   [
    "What is the role of the UPS when a site has a generator?",
    "It carries the load during the seconds or minutes before the generator starts and the transfer switch moves the load to it."
   ],
   [
    "What does a switched PDU add over a basic PDU?",
    "Remote control of individual outlets, so you can power-cycle a device without visiting the rack."
   ],
   [
    "Why do data centers often prefer 208 V or 240 V circuits over 120 V?",
    "Higher voltage delivers the same power with less current, so each circuit can support more equipment."
   ]
  ]
 },
 {
  "t": "Network cabling and connectors: Cat5e/Cat6/Cat6a, single-mode vs multimode fiber, SFP/SFP+/QSFP transceivers, twinax/DAC, labeling",
  "hook": "Tomás is installing a new storage server for Riverbend County Library. The server has two empty SFP+ cages, the switch is one rack over, and a second building across the parking lot needs a link to the same switch. On the bench sit a box of blue Cat6 patch cords, a bag of transceivers in unmarked plastic, a coil of orange fiber and a coil of yellow fiber. He plugs a transceiver into the switch, runs the orange cable to the far building's equipment, and the link light never comes on. Nothing is broken. Something just does not match. Which cable and which module belong on each link, and how would you know before you buy?",
  "simple": "Servers talk to switches through cables, and the right cable depends mostly on how fast and how far the signal has to travel. Copper cables with the familiar square plug carry electricity and work well up to about 100 meters, roughly the length of a football field. Fiber optic cables carry pulses of light and can reach much farther. Some switches and servers have empty slots that take small plug-in modules called transceivers, which turn the electrical signal into light or copper signals. Both ends of a link must match, like two walkie-talkies on the same channel. Finally, every cable should be labeled at both ends so that, months later, anyone can tell what it connects.",
  "body": [
   "Servers connect to switches and storage with copper or fiber cables. Choosing the right cable depends on the speed you need, the distance, the ports on each end and the budget. A quick way to frame every cabling question is speed, distance, then connector: how many gigabits per second (Gbps) must the link carry, how far apart are the two ends, and what kind of port does each device have. Server+ tests the common copper categories, the two kinds of fiber, and the pluggable modules used in server rooms.",
   "Start with copper. Twisted-pair copper cable uses RJ45 (registered jack 45) connectors and is rated by category. Cat5e supports 1 Gbps Ethernet up to 100 meters. Cat6 also supports 1 Gbps to 100 meters and can carry 10 Gbps over shorter runs (about 55 meters). Cat6a (augmented Category 6) supports 10 Gbps over the full 100 meters and has better protection against crosstalk, the interference between pairs inside the cable and between neighboring cables. For new server room copper, Cat6a is a common choice because it handles 10GBASE-T, the copper 10 Gbps Ethernet standard, at full length. Shielded versions help in electrically noisy areas, such as runs near motors or heavy power cabling, but must be grounded properly to be effective.",
   "Fiber is the next step up in distance. Fiber optic cable carries light instead of electricity, so it is immune to electromagnetic interference (EMI) and reaches much farther than copper. Multimode fiber (MMF) has a larger core, uses cheaper light sources, and is used for shorter runs inside a building or data center, typically up to a few hundred meters depending on speed and grade (OM3, OM4 and so on). Single-mode fiber (SMF) has a very narrow core and uses lasers to carry a single light path over kilometers, so it is used between buildings and for long campus or metro links. Common fiber connectors include LC (small, the usual choice on transceivers) and SC (larger, square). Fiber on the two ends must match the optics: single-mode optics need single-mode cable, and multimode optics need multimode cable. A mismatch often produces exactly the symptom in the hook, a link that never comes up or one that flaps and logs errors.",
   "Many switches and server network cards do not have fixed ports at all, but empty cages that accept pluggable transceivers. An SFP (small form-factor pluggable) module typically carries 1 Gbps; SFP+ carries 10 Gbps in the same size cage; SFP28 carries 25 Gbps. QSFP (quad small form-factor pluggable) modules are wider and combine four lanes for 40 Gbps (QSFP+) or 100 Gbps (QSFP28). The transceiver decides the medium: you can insert a multimode short-range optic, a single-mode long-range optic, or a copper module into the same cage. That flexibility is the point, because one switch model can serve short and long links simply by changing modules. Both ends must use compatible optics, matching speed, wavelength and fiber type, and some vendors restrict which third-party modules their hardware accepts, logging an unsupported-transceiver message and refusing to bring the port up.",
   "For short connections inside a rack, there is a cheaper option. A direct attach copper (DAC) cable is cheaper and uses less power than two optics plus a fiber patch cord. A DAC is a twinax (twin-axial copper) cable with SFP+ or QSFP ends permanently attached, usually a few meters long, which makes it ideal for linking a server to a top-of-rack switch. Because the ends are built in, there is nothing to mismatch, though the cable must still be supported by both devices. Active optical cables (AOCs) are the fiber equivalent: fiber with transceiver ends permanently attached, used for somewhat longer runs than a DAC can reach.",
   "Fiber needs gentle handling. Respect the bend radius of fiber, the tightest curve the cable can safely take, so you do not damage the glass or weaken the signal. Keep dust caps on unused connectors and transceivers, because a speck of dust on an end face can cause errors. Never look into an active fiber or transceiver, since laser light can harm your eyes even when you cannot see it.",
   "Finally, label everything. Label every cable at both ends with a consistent scheme, for example the rack, device and port on each end, and record it in your documentation, such as a cabling spreadsheet or the data center's asset system. Good labels make troubleshooting fast and prevent someone unplugging the wrong link during maintenance. Use color coding if your organization has a standard, for example one color for storage links and another for management, but remember that color alone is not a label: colors run out and mean nothing to the next person without documentation."
  ],
  "analogy": "Choosing a cable is like choosing how to send a package. A DAC is handing it to the person at the next desk: quick and cheap, but only for very short distances. Multimode fiber is a courier within the same office park. Single-mode fiber is a long-haul freight truck between cities. Transceivers are the loading docks: the truck and the dock must match, or nothing gets unloaded. The analogy stops at cost: single-mode optics are not always the most expensive choice, so exam answers turn on distance, not price.",
  "terms": [
   [
    "Cat6a",
    "Augmented Category 6 twisted-pair cable that supports 10 Gbps Ethernet up to 100 meters."
   ],
   [
    "Single-mode fiber",
    "Fiber with a very small core that carries one light path over long distances, used for building-to-building and long-haul links."
   ],
   [
    "Multimode fiber",
    "Fiber with a larger core that carries multiple light paths over shorter distances, common inside data centers."
   ],
   [
    "SFP/SFP+/QSFP",
    "Pluggable transceiver formats: SFP typically 1 Gbps, SFP+ 10 Gbps in the same size, QSFP four lanes for 40 or 100 Gbps."
   ],
   [
    "DAC (direct attach copper)",
    "A twinax cable with transceiver-style ends attached, used for short, low-cost high-speed links within or between adjacent racks."
   ],
   [
    "Bend radius",
    "The tightest curve a cable, especially fiber, can take without damage or signal loss."
   ]
  ],
  "example": "A server needs two 10 Gbps links to a top-of-rack switch one meter away. Instead of buying four SFP+ optics and fiber patch cords, the administrator uses two SFP+ DAC cables, labels both ends with the server name and port, and updates the cabling spreadsheet. For the 2-kilometer link to the backup site, she orders single-mode SFP+ optics for both ends and single-mode fiber.",
  "mistakes": [
   [
    "Picking Cat6 for a 90-meter 10 Gbps copper run.",
    "Cat6 reaches 10 Gbps only over shorter runs (about 55 meters). Cat6a is the answer for 10 Gbps at the full 100 meters."
   ],
   [
    "Choosing multimode fiber for a link between buildings several kilometers apart.",
    "Multimode is for shorter runs, typically up to a few hundred meters. Kilometer distances call for single-mode fiber and single-mode optics."
   ],
   [
    "Assuming SFP and SFP+ are different sizes.",
    "They share the same cage size. The difference is speed: SFP is typically 1 Gbps and SFP+ is 10 Gbps."
   ],
   [
    "Buying two optics and a fiber patch cord for a one-meter link inside a rack.",
    "A DAC is cheaper and uses less power for very short runs; it is the usual exam answer for in-rack or adjacent-rack connections."
   ]
  ],
  "tryit": [
   [
    "A new server must connect at 10 Gbps to a switch 80 meters away through the building's cable trays. The server has a 10GBASE-T copper port and the switch has a matching copper port. The existing spare cable in the tray is Cat6. Will it work reliably, and what would you install instead if not?",
    "Not reliably at 10 Gbps, because Cat6 supports 10 Gbps only up to about 55 meters. Install Cat6a, which supports 10 Gbps over the full 100 meters, or use fiber with appropriate optics if the ports allow."
   ],
   [
    "A link between two switches in different buildings will not come up. One end has a single-mode long-range optic; the other has a multimode short-range optic. Both are SFP+ and the fiber run is single-mode. What is wrong?",
    "The optics do not match. Both ends must use compatible optics on the same fiber type; replace the multimode optic with a single-mode optic matching the far end."
   ]
  ],
  "tip": "Distance decides most cabling questions: DAC for a few meters, multimode for runs within the data center, single-mode for kilometers. Cat6a is the copper answer for 10 Gbps at 100 meters. SFP and SFP+ look the same but differ in speed.",
  "check": [
   [
    "Which cable would you use to link two buildings several kilometers apart?",
    "Single-mode fiber, because its narrow core and laser optics carry signals over long distances."
   ],
   [
    "What is the difference between SFP and SFP+?",
    "They share the same size, but SFP is typically 1 Gbps and SFP+ is 10 Gbps."
   ],
   [
    "Why is fiber preferred near heavy electrical equipment?",
    "It carries light rather than electricity, so it is immune to electromagnetic interference."
   ]
  ]
 },
 {
  "t": "Drive types: HDD speeds (7.2K/10K/15K), SSD, NVMe, SAS vs SATA, hot-swap and hot-plug",
  "hook": "The accounting team at Bluewater Freight says month-end close is 'taking forever again.' You open the performance graphs for their database server and see the processor mostly idle, memory fine, and the disk queue stacked high, with every query waiting on storage. The server holds six large 7,200 RPM SATA drives bought because they were cheap per terabyte. Your manager asks for a fix by next month and hands you a catalog full of drive types: 10K, 15K, SATA SSD, SAS SSD, NVMe. At the same time, one of the backup server's drives shows an amber light, and a coworker asks whether he can just pull it out. Which drive fits which job, and what can you safely touch while the server runs?",
  "simple": "A server's drives store its data, and different kinds trade speed for space and price. A hard disk drive, or HDD, has spinning metal platters, like a tiny record player; the faster it spins, the quicker it can find data, but faster drives hold less and cost more. A solid-state drive, or SSD, has no moving parts and is much faster, like the storage in your phone. Drives also plug in through different connections: SATA is the cheaper, common one, SAS is the sturdier business version, and NVMe connects fast SSDs almost directly to the processor. Many servers let you swap a drive while the server keeps running, which saves downtime when one fails.",
  "body": [
   "Storage is often the slowest part of a server, so choosing drives well matters. A fast processor waiting on slow disks is still a slow server, and you would see that in performance tools as high disk queue length and long read and write latency while the processor sits mostly idle. Server+ tests how drive types compare in speed, capacity, reliability and cost, the interfaces they use, and whether you can replace them while the server runs.",
   "Start with the spinning drive. A hard disk drive (HDD) stores data on spinning magnetic platters read by a moving head on an arm. Every random read requires the head to move to the right track (seek time) and wait for the right sector to spin under it (rotational latency). Speed is rated in revolutions per minute (RPM). 7,200 RPM (7.2K) drives offer the most capacity for the money and suit bulk storage, backups and archives. 10,000 RPM (10K) and 15,000 RPM (15K) drives spin faster, so rotational latency is lower and they deliver more input/output operations per second (IOPS), but they cost more per gigabyte and hold less. Faster spindle speeds have largely been replaced by SSDs for performance workloads, yet the distinctions still appear on the exam, so remember the trade-off: higher RPM means more IOPS, less capacity and higher cost per gigabyte.",
   "Solid-state drives change the picture entirely. A solid-state drive (SSD) uses flash memory with no moving parts. With no head to move and no platter to wait for, it has far lower latency and much higher IOPS than any HDD, uses less power, produces less heat and handles random access well. SSDs cost more per gigabyte, and each flash cell tolerates a limited number of writes, so enterprise SSDs are rated for endurance, often as drive writes per day (DWPD), the number of times you can overwrite the whole drive each day over its warranty period. Choose write-intensive SSDs, with higher DWPD ratings, for databases and logs, and read-intensive SSDs for content that changes rarely, such as web content or a read-mostly file share. Monitoring tools and the drive's SMART (Self-Monitoring, Analysis and Reporting Technology) data report how much rated endurance remains.",
   "The interface matters as much as the media. SATA (Serial Advanced Technology Attachment, usually just Serial ATA) is inexpensive and common in desktops and low-cost servers. SAS (Serial Attached SCSI, where SCSI is the Small Computer System Interface) is the enterprise interface. It supports higher speeds in current versions, dual ports so two controllers can reach the same drive for redundancy, deeper command queues and better error handling. Compatibility runs in one direction: a SAS controller can usually run SATA drives, but a SATA controller cannot run SAS drives, and SAS drives are keyed so they will not physically plug into a SATA-only connector. This lets you mix cheap SATA capacity drives and SAS performance drives behind one SAS controller.",
   "NVMe removes the old disk-oriented path. NVMe (Non-Volatile Memory Express) is a protocol designed for flash that connects SSDs directly to the PCIe (Peripheral Component Interconnect Express) bus, avoiding the older disk-oriented controller path and its command overhead. It supports many parallel queues, which suits modern multi-core processors. NVMe drives appear as add-in cards in PCIe slots, M.2 modules (small gum-stick-sized boards, often used for boot drives), or U.2/U.3 drives in front hot-swap bays. NVMe offers the lowest latency of the common drive types, which is why it is the usual answer when a question asks for the fastest storage for a demanding database.",
   "Being able to replace drives without downtime is one of the reasons servers cost more than desktops, and the exam distinguishes two terms. Hot-swap means you can remove and replace a component while the system is running, without shutting down or telling the operating system first; the hardware and RAID controller handle it. Hot-plug means you can add or remove a component while the system is running, but the operating system may need to be told, for example by preparing the device for removal before you pull it. In practice, server drive bays with caddies are hot-swappable when the controller and backplane support it.",
   "Safe practice still matters even with hot-swap hardware. Always check the drive's status LED, use the management controller or RAID utility to identify the correct bay (many let you blink a locate light on the failed drive), and confirm the array is not already in a more fragile state before pulling anything. Pulling the wrong drive from a degraded array, one that has already lost redundancy, can take the whole volume offline. After inserting the replacement, watch the controller begin rebuilding and confirm the array returns to an optimal state."
  ],
  "analogy": "An HDD is like a librarian who must walk to the right shelf and wait for a rotating carousel to bring the book around; a faster carousel (higher RPM) helps, but walking still takes time. An SSD is a librarian with every book already on the desk. NVMe is that same desk moved right next to the reader, skipping the front counter. The analogy stops at wear: real books do not wear out from being written in, but flash cells do, which is why SSD endurance ratings matter.",
  "terms": [
   [
    "RPM",
    "Revolutions per minute, the spindle speed of an HDD; common server speeds are 7.2K, 10K and 15K."
   ],
   [
    "IOPS",
    "Input/output operations per second, a measure of how many reads and writes storage can handle."
   ],
   [
    "DWPD",
    "Drive writes per day, an SSD endurance rating describing how many times the full drive can be written each day over its warranty."
   ],
   [
    "SAS (Serial Attached SCSI)",
    "An enterprise drive interface with dual-port support and robust error handling; SAS controllers can also run SATA drives."
   ],
   [
    "NVMe",
    "A storage protocol that connects flash drives directly to the PCIe bus for very low latency and high throughput."
   ],
   [
    "Hot-swap",
    "Replacing a component while the system runs, with no shutdown or special OS action required."
   ],
   [
    "Hot-plug",
    "Adding or removing a component while the system runs, where the OS may need to be notified first."
   ]
  ],
  "example": "A database server with slow queries is moved from six 7.2K SATA drives to NVMe SSDs, cutting storage latency sharply. The old high-capacity 7.2K drives are reused in a backup server, where capacity per dollar matters more than speed. When one of those drives later fails, the technician blinks its locate LED from the management controller, confirms the array still has redundancy, and hot-swaps the drive without shutting the server down.",
  "mistakes": [
   [
    "Choosing 15K HDDs as the fastest option for a new performance workload.",
    "15K drives are the fastest HDDs, but SSDs, and especially NVMe SSDs, deliver far lower latency and higher IOPS. 15K is only the best answer when the question limits you to spinning disks."
   ],
   [
    "Believing a SATA controller can run SAS drives because the connectors look similar.",
    "Compatibility is one-way: SAS controllers can run SATA drives, not the reverse."
   ],
   [
    "Treating hot-swap and hot-plug as identical.",
    "Hot-swap needs no OS action; hot-plug may require telling the OS before removal. Exam questions sometimes hinge on that difference."
   ],
   [
    "Picking the cheapest read-intensive SSD for a heavy transaction log.",
    "Write-heavy workloads wear flash quickly. Choose write-intensive SSDs with a higher DWPD rating."
   ]
  ],
  "tryit": [
   [
    "Bluewater Freight needs storage for two servers. Server A holds nightly backups and a growing archive and needs many terabytes at the lowest cost. Server B runs a busy transaction database where latency is the main complaint. Budget allows a few high-performance drives, not dozens. What drive types do you choose for each?",
    "Server A: high-capacity 7.2K RPM HDDs, which offer the best capacity per dollar for sequential backup and archive work. Server B: write-intensive NVMe SSDs (or SAS SSDs if the chassis lacks NVMe bays), which give the lowest latency and highest IOPS for random database access."
   ],
   [
    "A RAID 5 array shows one drive with an amber fault LED. The server's drive bays are hot-swappable and the controller reports the array as degraded. A coworker wants to pull the drive with the amber LED immediately. What should you do first?",
    "Confirm which physical bay holds the failed drive using the controller or management interface (blink the locate LED), verify the replacement is the right type and size, and make sure no other drive is failing. Then hot-swap only that drive and watch the rebuild. Pulling the wrong drive from a degraded RAID 5 array would take the volume offline."
   ]
  ],
  "tip": "Faster RPM means more IOPS but less capacity and more cost per GB. SAS controllers accept SATA drives but not the other way round, and hot-swap requires no OS preparation while hot-plug may. NVMe is the low-latency answer.",
  "check": [
   [
    "Which HDD speed gives the best capacity per dollar?",
    "7.2K RPM drives, which trade speed for high capacity at low cost."
   ],
   [
    "Can you install SAS drives on a SATA-only controller?",
    "No. A SAS controller can run SATA drives, but a SATA controller cannot run SAS drives."
   ],
   [
    "Why is NVMe faster than a SATA SSD?",
    "NVMe connects over PCIe with a protocol built for flash, avoiding the SATA interface and its disk-era command overhead."
   ],
   [
    "What feature of SAS drives supports redundant controller paths?",
    "Dual ports, which let two controllers reach the same drive."
   ]
  ]
 },
 {
  "t": "RAID levels 0, 1, 5, 6, 10: fault tolerance, usable capacity, write penalty; hardware vs software RAID; JBOD",
  "hook": "Elena, the only IT person at Hillside Architecture, gets a text at 6 a.m.: the file server is beeping. The RAID controller reports a failed drive in the four-drive RAID 5 array that holds ten years of building plans. She orders a replacement, and the rebuild starts that afternoon. It is still running the next morning when the controller logs a read error on a second drive. Her stomach drops. Across town, a colleague asks her why his new six-drive array shows only half the space he paid for. Both problems come down to the same choices: how the drives were combined, how much space that costs, and how many failures it can survive. What should each of them have chosen?",
  "simple": "RAID is a way of making several drives act like one, so you get more speed, more safety, or both. Some RAID types split your data across drives so they can work at the same time, which is fast but risky. Others keep an exact copy on a second drive, so if one dies you still have the other. Others store extra math, called parity, that lets the system rebuild a missing drive. Safety costs space: a mirror uses half your drives for copies. RAID protects you when a drive breaks, but not when someone deletes a file or ransomware scrambles it, so you still need backups. Think of it like a team that can cover for a sick coworker, but not for a mistake everyone copies.",
  "body": [
   "RAID (redundant array of independent disks) combines several drives into one logical volume to improve performance, fault tolerance or both. Server+ expects you to calculate usable capacity, know how many failures each level survives, and understand why some levels write more slowly. Start with one rule that appears on almost every exam: RAID is not a backup. It protects against drive failure, not accidental deletion, file corruption, ransomware or a fire in the server room, because every one of those is faithfully written to all the drives at once.",
   "The two simplest levels are RAID 0 and RAID 1. RAID 0 (striping) splits data into blocks and spreads them across two or more drives, so reads and writes happen on several drives in parallel. It is fast and uses 100 percent of capacity, but it has no redundancy: one failed drive loses the whole array, and adding drives makes failure more likely, not less. It suits only scratch space or data you can easily recreate. RAID 1 (mirroring) writes identical copies to two drives. It survives one drive failure, and usable capacity is 50 percent. Reads can be fast, because either drive can answer, but each write must go to both drives, a write penalty of 2. RAID 1 is a common choice for operating system boot volumes.",
   "Parity levels trade some write speed for better capacity. RAID 5 stripes data with distributed parity across at least three drives. Parity is calculated data, produced with an exclusive-OR (XOR) calculation across the data blocks in each stripe, that lets the controller rebuild a missing drive's contents from the remaining drives. Usable capacity is (N minus 1) drives, so four 4 TB drives give 12 TB. It survives one drive failure. Each small write requires reading the old data and old parity, then writing the new data and new parity, four physical operations for one logical write, which is a write penalty of 4.",
   "RAID 5's weak spot is the rebuild. While a RAID 5 array runs with one failed drive, it is degraded: it has no redundancy left, and every read of the missing drive's data must be recalculated from the others. Rebuilds of large drives take a long time, sometimes many hours or days, and stress the remaining disks with continuous reads. A second failure or unreadable sector during that window, exactly Elena's situation in the hook, can destroy the array.",
   "RAID 6 addresses that risk with two parity blocks. It uses two independent parity blocks per stripe across at least four drives. Usable capacity is (N minus 2), it survives any two drive failures, and its write penalty is 6, since each small write must update data and both parity blocks. It is favored for large arrays of high-capacity drives because a second failure during a long rebuild would destroy a RAID 5 array but leaves RAID 6 still running.",
   "RAID 10 combines mirroring and striping. RAID 10 (1+0) mirrors pairs of drives and then stripes across the mirrors. It needs at least four drives, always an even number, gives 50 percent capacity, has a write penalty of 2, and survives one failure per mirror pair. It can survive more than one failure, but only if the failures hit different pairs; losing both drives of one pair loses the array. Rebuilds are fast, because the controller simply copies from the surviving mirror partner. RAID 10 is the usual choice for write-heavy databases, where its low write penalty matters more than its capacity cost.",
   "Next comes where the RAID logic runs. Hardware RAID uses a dedicated controller card or chip with its own processor and often a battery- or flash-backed write cache that protects data in the cache during a power loss. It offloads parity work from the CPU, can boot from the array and is managed through the controller's firmware utility or vendor software. Software RAID is handled by the operating system, such as `mdadm` on Linux or Storage Spaces on Windows. It costs nothing extra, and the array can be moved to another server running the same OS software without needing a matching controller, but it uses host CPU and may be harder to boot from. Firmware or fake RAID sits in between: the setting lives in the motherboard firmware, but the work is done by drivers on the host CPU.",
   "Finally, two related terms. JBOD (just a bunch of disks) presents drives individually, or concatenated into one large volume without striping or parity. It uses all capacity but offers no redundancy: if a concatenated drive fails, the data on it is lost. JBOD is also the mode used when software such as ZFS or a storage cluster manages redundancy itself and wants direct access to each disk. A hot spare is an idle drive installed in the server that the controller automatically uses to rebuild a failed member, shortening the time an array spends degraded without waiting for someone to arrive with a replacement."
  ],
  "analogy": "RAID levels are like ways of storing a recipe book. RAID 0 tears the book into pages and gives each friend a few: you can read it quickly, but if one friend moves away the recipe is gone. RAID 1 gives two friends a full copy each. RAID 5 gives each friend some pages plus a clever summary that lets the group reconstruct one missing friend's pages. RAID 6 has two summaries, so two friends can leave. None of this helps if someone writes a wrong ingredient, because every copy gets the same mistake, which is why RAID is not a backup.",
  "mnemonic": "Write penalties climb with protection: zero is one, mirrors make two, five takes four, six takes six. RAID 0 = 1, RAID 1 and 10 = 2, RAID 5 = 4, RAID 6 = 6.",
  "terms": [
   [
    "Striping",
    "Splitting data into blocks spread across several drives so they can be read and written in parallel."
   ],
   [
    "Mirroring",
    "Writing identical copies of data to two drives."
   ],
   [
    "Parity",
    "Calculated data stored in RAID 5 or 6 that lets the array reconstruct the contents of a failed drive."
   ],
   [
    "Write penalty",
    "The number of physical I/O operations one logical write requires: 1 for RAID 0, 2 for RAID 1 and 10, 4 for RAID 5, 6 for RAID 6."
   ],
   [
    "Degraded array",
    "An array that has lost a member and is running with reduced or no redundancy until it is rebuilt."
   ],
   [
    "Hot spare",
    "A standby drive that the controller automatically uses to rebuild an array after a member fails."
   ],
   [
    "JBOD",
    "Just a bunch of disks: drives presented individually or concatenated, with no redundancy."
   ]
  ],
  "example": "Six 2 TB drives give 12 TB in RAID 0, 10 TB in RAID 5, 8 TB in RAID 6 and 6 TB in RAID 10. The administrator picks RAID 10 for the transaction database because of its low write penalty, and RAID 6 for the file archive because it survives two failures during a long rebuild. She adds a hot spare to the archive server and keeps nightly backups of both, because neither array protects against deletion or ransomware.",
  "mistakes": [
   [
    "Treating RAID as a backup.",
    "RAID protects only against drive failure. Deletions, corruption and ransomware are copied to every drive instantly, so separate backups are still required."
   ],
   [
    "Calculating RAID 5 capacity as N/2 or RAID 10 capacity as N-1.",
    "RAID 5 is N-1 drives, RAID 6 is N-2, and RAID 1 and RAID 10 are N/2."
   ],
   [
    "Saying RAID 10 always survives two drive failures.",
    "RAID 10 survives one failure per mirror pair. Two failures in the same pair destroy the array; two failures in different pairs do not."
   ],
   [
    "Choosing RAID 5 for a write-heavy database because it offers more capacity.",
    "RAID 5 has a write penalty of 4. RAID 10, with a penalty of 2, is the usual choice for heavy writes."
   ]
  ],
  "tryit": [
   [
    "You have eight 4 TB drives for a new archive server. The data changes little, capacity matters, and the drives are large, so a rebuild could take a long time. A coworker suggests RAID 5 to maximize space. What do you recommend, and how much usable space results?",
    "RAID 6, which survives two drive failures and protects against a second failure during a long rebuild. Usable capacity is (8 minus 2) x 4 TB = 24 TB, compared with 28 TB for RAID 5. Add a hot spare if a bay is free, and keep backups."
   ],
   [
    "A small office server must boot from mirrored drives, the budget does not allow a RAID controller, and the operating system supports software RAID. The owner worries that software RAID is 'not real RAID.' Is software RAID a reasonable choice here, and what is the trade-off?",
    "Yes. Software RAID 1 provides real mirroring at no extra cost and lets the array move to another server running the same OS. The trade-offs are some host CPU use, no battery-backed cache, and possibly more effort to configure booting from the array."
   ]
  ],
  "tip": "Memorize the formulas: RAID 5 = N-1, RAID 6 = N-2, RAID 1 and 10 = N/2. Write penalties are 2, 4 and 6 for mirroring, RAID 5 and RAID 6. Minimum drives: RAID 0 two, RAID 1 two, RAID 5 three, RAID 6 four, RAID 10 four. RAID never replaces backups.",
  "check": [
   [
    "How much usable space do five 8 TB drives provide in RAID 5?",
    "32 TB, because RAID 5 gives N minus 1 drives of capacity: 4 x 8 TB."
   ],
   [
    "Which RAID level offers no fault tolerance?",
    "RAID 0, which stripes data without any mirroring or parity."
   ],
   [
    "Why is RAID 6 preferred over RAID 5 for large drives?",
    "Long rebuilds raise the chance of a second failure, and RAID 6 survives two drive failures while RAID 5 survives only one."
   ],
   [
    "What is the minimum number of drives for RAID 10?",
    "Four, in two mirrored pairs that are then striped."
   ]
  ]
 },
 {
  "t": "Storage architectures: DAS, NAS, SAN, iSCSI, Fibre Channel, FCoE; capacity planning and base-2 vs base-10 sizing",
  "hook": "Owen at Silverline Insurance has three requests on his desk. The claims team wants a shared folder everyone can reach. The virtualization team wants two new hosts to share one pool of disk so virtual machines can move between them. And the finance director, holding a purchase order, wants to know why the 'twelve-terabyte' array he approved shows up in the operating system as about eleven. One request sounds like a file share, one sounds like raw disk over a network, and one sounds like a math mistake. None of them is a mistake, but each needs a different answer. How do you tell which storage design fits which request, and how do you explain the missing terabyte?",
  "simple": "Servers can reach their storage in three basic ways. Direct-attached storage is plugged straight into one server, like an external drive on your laptop. Network-attached storage, or NAS, is a box on the network that shares folders, much like a shared drive at school where everyone sees the same files. A storage area network, or SAN, gives servers raw chunks of disk over a special network, and each server treats its chunk as if it were its own internal drive. Separately, drive makers count a terabyte as exactly one trillion bytes, while computers often count in powers of two, so a new drive always looks a bit smaller in the operating system than on the box.",
  "body": [
   "Servers reach their storage in three broad ways: attached directly, over the network as shared files, or over a dedicated network as raw blocks. Knowing which is which, and which protocol each uses, is a core Server+ skill. The single most useful question to ask is who owns the file system. If the server formats and manages the file system itself, the storage is block storage (DAS or SAN). If a separate device owns the file system and hands out files and folders, it is file storage (NAS).",
   "The simplest design is direct-attached storage. Direct-attached storage (DAS) is connected straight to one server, either internal drives or an external enclosure cabled with SAS (Serial Attached SCSI). It is simple, fast and inexpensive, and there is no network to configure or secure. But other servers cannot share it easily, and capacity is stranded on that one host: if one server has free space and another is full, you cannot move the space between them without moving drives.",
   "Network-attached storage shares files. Network-attached storage (NAS) is a device that shares files over the network using file protocols such as SMB (Server Message Block, used by Windows) and NFS (Network File System, common on Linux and UNIX). Clients see folders and files; the NAS owns the file system, handles permissions and manages the disks behind it. On a Windows client you might map a drive letter to a path such as `\\\\nas01\\claims`, and on Linux you might mount `nas01:/exports/claims`. NAS is easy to deploy and good for home directories, departmental shares and shared documents, and it rides on the ordinary Ethernet network.",
   "A storage area network shares blocks instead. A storage area network (SAN) presents block storage: chunks of raw disk called LUNs (logical unit numbers) that a server formats with its own file system as if they were local disks. In the operating system, a LUN shows up in disk management as a new, unformatted disk. Because many servers can reach a central array, SANs support clustering, virtualization hosts sharing datastores, and centralized snapshots and replication. Access is controlled with zoning on the fabric switches, which decides which server ports can talk to which storage ports, and LUN masking on the array, which decides which servers can see each LUN. Together they make sure each server sees only its own LUNs, which matters because two servers writing to the same LUN without a cluster-aware file system will corrupt it.",
   "SANs use block protocols, and Server+ expects you to know three. Fibre Channel (FC) is a dedicated, lossless storage network with its own switches and host bus adapters (HBAs), identified by World Wide Names (WWNs), which work much like media access control (MAC) addresses for the storage fabric. It is fast and predictable but needs specialized equipment and skills. iSCSI (Internet Small Computer Systems Interface) carries SCSI commands over ordinary TCP/IP (Transmission Control Protocol/Internet Protocol) Ethernet. The server runs an initiator, either software built into the operating system or a hardware offload card, that connects to a target on the array, usually over a separate VLAN (virtual local area network) or physical network with jumbo frames for efficiency. iSCSI is cheaper and familiar to network staff. FCoE (Fibre Channel over Ethernet) wraps Fibre Channel frames directly in Ethernet frames, without IP, over lossless data center Ethernet using converged network adapters (CNAs), letting one set of cables carry both data and storage traffic. Because FCoE has no IP layer, it cannot be routed like iSCSI.",
   "Once you have chosen an architecture, you have to size it. Capacity planning means estimating how much storage you need now and later: current data, growth rate, RAID overhead, snapshots, free space for performance and file system overhead. A common approach is to measure growth over the last year, project it over the life of the hardware, and add the overheads on top. Running out of space is both an outage risk and a performance problem, since many file systems and arrays slow down as they fill.",
   "A common trap in capacity planning is units. Drive makers use base-10 (decimal) units, where 1 TB is 1,000,000,000,000 bytes. Many operating systems report in base-2 (binary) units, where 1 TiB (tebibyte) is 1,099,511,627,776 bytes, though some still label it TB. So a 4 TB drive shows up as roughly 3.64 TiB, and a new 1 TB drive appears as about 931 GiB (gibibytes). Nothing is missing; the same bytes are being counted with a bigger unit. That gap grows with each prefix: about 2.4 percent at kilo, 7 percent at giga and about 10 percent at tera.",
   "Putting it together, when you size an array, start with raw drive capacity, convert to the units your OS reports, subtract RAID overhead and then leave headroom, since file systems and arrays slow down as they fill. Write the plan in the same units your monitoring tools display, so alerts and purchase orders tell the same story."
  ],
  "analogy": "A NAS is like a library: you ask for a book by title, and the librarian, who owns the shelves and the catalog, hands it to you. A SAN is like renting an empty storage unit: you get raw space, bring your own shelves (your file system) and organize it however you like, and nobody else should be inside your unit. DAS is a bookshelf in your own room. The analogy stops at sharing: a clustered file system can let several servers safely share one LUN, which a single renter would not do.",
  "terms": [
   [
    "DAS",
    "Direct-attached storage: drives connected straight to one server, internal or in a SAS-cabled enclosure."
   ],
   [
    "NAS",
    "Network-attached storage: a device that shares files over the network with protocols such as SMB and NFS."
   ],
   [
    "SAN",
    "Storage area network: a dedicated network that presents block-level storage (LUNs) to servers."
   ],
   [
    "LUN",
    "Logical unit number: a block storage volume presented by a SAN to a server."
   ],
   [
    "iSCSI",
    "A protocol that carries SCSI block commands over TCP/IP, using initiators on servers and targets on storage."
   ],
   [
    "FCoE",
    "Fibre Channel over Ethernet: Fibre Channel frames carried directly in Ethernet frames without IP, over lossless Ethernet."
   ],
   [
    "Zoning and LUN masking",
    "SAN access controls: zoning on fabric switches limits which ports communicate, and LUN masking on the array limits which servers see each LUN."
   ]
  ],
  "example": "An administrator buys eight 2 TB drives for a RAID 6 array, expecting 12 TB. The OS shows about 10.9 TiB, because the vendor's 12 TB is decimal and the OS reports binary units. She updates the capacity plan to use binary figures and adds 20 percent headroom. For the claims team she creates an SMB share on the NAS, and for the two virtualization hosts she presents one iSCSI LUN on a dedicated storage VLAN.",
  "mistakes": [
   [
    "Calling a device that shares folders over SMB or NFS a SAN.",
    "File-level sharing is NAS. A SAN presents block-level LUNs that the server formats itself."
   ],
   [
    "Believing FCoE runs over IP like iSCSI.",
    "FCoE puts Fibre Channel frames directly into Ethernet frames with no IP layer. iSCSI is the one that rides on TCP/IP."
   ],
   [
    "Thinking a drive that shows less capacity than advertised is defective.",
    "Vendors count in decimal units and many operating systems report binary units. A 1 TB drive appears as about 931 GiB, which is normal."
   ],
   [
    "Presenting the same LUN to several servers without a cluster-aware file system.",
    "Uncoordinated writes will corrupt the file system. Zoning and LUN masking should ensure each server sees only its own LUNs unless a clustered file system is in use."
   ]
  ],
  "tryit": [
   [
    "A small company wants two virtualization hosts to share storage so virtual machines can move between them. It has a good Ethernet network and staff who know networking, but no Fibre Channel switches and a limited budget. Which SAN protocol fits best, and what network design would you use?",
    "iSCSI, because it carries block storage over ordinary TCP/IP Ethernet and needs no Fibre Channel equipment. Put the storage traffic on a separate VLAN or physical network, enable jumbo frames end to end if supported, and configure software initiators on the hosts to connect to the array's targets."
   ],
   [
    "A department needs 30 TB of usable space after RAID. The array uses RAID 6 with 4 TB drives, and the OS reports capacity in binary units. A colleague says '30 divided by 4 is 7.5, plus two parity drives, so buy ten drives.' What is wrong with that plan?",
    "It ignores base-2 reporting and headroom. Ten 4 TB drives in RAID 6 give 32 TB decimal, about 29.1 TiB in the OS, which is already below 30 before any free-space headroom. Buy more drives, for example enough to cover the binary conversion plus around 20 percent headroom."
   ]
  ],
  "tip": "File-level sharing (SMB, NFS) means NAS; block-level (LUNs over FC or iSCSI) means SAN. iSCSI rides on IP; FCoE rides directly on Ethernet without IP. Drives are sold in base-10 but reported in base-2, so expect roughly 7 percent less at giga and 10 percent less at tera.",
  "check": [
   [
    "Why does a new 1 TB drive show less than 1 TB in the operating system?",
    "The drive is sized in decimal units (10^12 bytes) while the OS reports binary units, so about 931 GiB appears."
   ],
   [
    "Which storage type would a server format with its own file system: NAS share or SAN LUN?",
    "A SAN LUN, because it is presented as raw block storage; a NAS already owns the file system."
   ],
   [
    "What does iSCSI need that Fibre Channel does not?",
    "An IP network; iSCSI runs over TCP/IP Ethernet while Fibre Channel uses its own dedicated fabric."
   ],
   [
    "What identifies Fibre Channel HBA ports on the fabric?",
    "World Wide Names (WWNs)."
   ]
  ]
 },
 {
  "t": "Out-of-band management: iLO, iDRAC, IPMI/BMC, remote KVM, IP KVM, crash cart",
  "hook": "It is 2:14 a.m. and Maya, on call for Lakeshore Medical Group, gets a page: the scheduling server at the clinic two hours away has stopped answering after tonight's patch. Remote Desktop times out. SSH (Secure Shell) times out. Ping returns nothing. The clinic opens at 7 a.m. and nobody there knows the server room code. Maya could start the car, or she could try the one connection that does not depend on the operating system at all, a small, separate computer inside the server with its own network port. If it was set up correctly, she can see the screen, power-cycle the box and even mount an installation image from her kitchen table. What is that connection, and how do you keep attackers from using it too?",
  "simple": "Normally you manage a server by logging in to it over the network, which only works if its operating system is running and healthy. Out-of-band management is a backup door that works even when the server is frozen or switched off. Most servers have a tiny built-in computer, called a baseboard management controller, with its own network plug. Through it you can see the server's screen, restart it and check its temperatures from anywhere, as if you were standing in front of it. Different brands give it different names. If even that fails, technicians wheel over a crash cart, a cart with a monitor and keyboard to plug in directly. Because this back door is so powerful, it must be locked down carefully.",
  "body": [
   "In-band management uses the server's own operating system and network: you connect with Remote Desktop or SSH (Secure Shell) through the same network interfaces that carry production traffic. That works until the OS hangs, fails to boot, crashes with a stop error, or the network settings are wrong. Out-of-band management gives you a separate path that works regardless of the operating system's state, so you can power-cycle a server, watch it boot and fix it without walking into the data center. For remote sites with no IT staff, it is often the difference between a ten-minute fix and a long drive.",
   "The foundation is the baseboard management controller. Most servers include a baseboard management controller (BMC), a small independent computer on the motherboard with its own processor, firmware and usually a dedicated management network port, often labeled on the back of the chassis. It runs whenever the server has standby power, even when the server itself is switched off, as long as the power cords are connected. The BMC monitors temperatures, fans, voltages and power supplies, keeps a hardware event log (often called the system event log) that records events such as a failed fan or a corrected memory error, and lets you turn the server on and off, open a remote console, and mount virtual media such as an ISO image to install or repair an operating system.",
   "Several names describe the same idea, and the exam expects you to recognize them. IPMI (Intelligent Platform Management Interface) is an industry standard for talking to BMCs; tools such as `ipmitool` can query sensors, read the event log or power-cycle a server, for example `ipmitool -I lanplus -H <bmc-address> -U <user> chassis power status`. Vendors build richer interfaces on top: HPE calls its BMC iLO (Integrated Lights-Out), Dell calls its version iDRAC (integrated Dell Remote Access Controller), and other vendors have their own names. Many also support the newer Redfish API (application programming interface), a REST (representational state transfer) interface that returns JSON (JavaScript Object Notation) and is easier to script than IPMI. The concepts are the same across vendors.",
   "Console access is the next piece. A KVM (keyboard, video, mouse) switch lets one keyboard, monitor and mouse control several servers, usually by pressing a hotkey or button to choose which server you see. An IP KVM adds a network interface so an administrator can see and control those consoles remotely through a browser, including the BIOS (basic input/output system) screens that appear before any operating system loads. Remote KVM is also a feature of BMCs: the iLO or iDRAC virtual console shows the server's screen from power-on, so you can watch the power-on self-test, enter the firmware setup or read a boot error message. An IP KVM is useful for devices that lack a BMC, or for managing a mix of equipment from one console.",
   "When every remote option fails, there is the low-tech fallback. A crash cart is a cart with a monitor, keyboard, mouse and cables, sometimes a laptop and spare adapters, that you wheel to a server and plug in locally. It needs someone on site, but it works even if the BMC is misconfigured, its network is down or nobody remembers its password.",
   "Because out-of-band interfaces can power off servers, read their consoles and reinstall operating systems, they are high-value targets. Anyone who controls a BMC effectively controls the server, regardless of operating system passwords. Put management ports on a separate, restricted management network or VLAN (virtual local area network), never on the internet, and limit which administrator workstations or jump hosts can reach it. Change default credentials immediately, since many BMCs ship with well-known defaults or printed passwords. Use role-based accounts tied to directory authentication where possible, so leavers lose access automatically, keep BMC firmware updated to fix vulnerabilities, disable unused protocols and services, and use encrypted access such as HTTPS and SSH rather than older unencrypted options. Finally, log and review who accesses these consoles, ideally forwarding BMC logs to a central log server.",
   "In a lab, you will typically assign the BMC an IP address in the server's setup utility or BMC configuration screen during startup, browse to it from a workstation on the management network, log in and explore the health dashboard, event log and virtual console. Try powering the server off and on from the interface and mounting an ISO as virtual media, because the exam often describes exactly these tasks and asks which tool performs them."
  ],
  "analogy": "Out-of-band management is like a building's separate service entrance with its own key. When the main lobby is locked or flooded (the operating system has crashed), maintenance staff can still get in, flip breakers and check the boiler. A crash cart is a technician walking in with a toolbox. The analogy also shows the risk: whoever holds the service-entrance key can reach everything, so that door must be on a private alley, not the main street, and the key must be changed from the builder's default.",
  "terms": [
   [
    "Out-of-band management",
    "Managing a server through a separate path that works regardless of the operating system's state."
   ],
   [
    "BMC (baseboard management controller)",
    "An independent controller on the motherboard that provides monitoring and remote control even when the OS is down."
   ],
   [
    "IPMI",
    "Intelligent Platform Management Interface, a standard protocol for communicating with BMCs."
   ],
   [
    "iLO and iDRAC",
    "Vendor implementations of a BMC: iLO (Integrated Lights-Out) from HPE and iDRAC (integrated Dell Remote Access Controller) from Dell."
   ],
   [
    "Virtual media",
    "A BMC feature that presents an ISO image or file from the administrator's computer to the server as if it were a local drive."
   ],
   [
    "IP KVM",
    "A keyboard-video-mouse switch reachable over the network, giving remote console access including BIOS screens."
   ],
   [
    "Crash cart",
    "A mobile cart with monitor, keyboard and mouse used to connect locally to a server."
   ]
  ],
  "example": "At 2 a.m. a remote server stops responding after an update. The on-call administrator logs in to its iDRAC over the management VLAN, opens the virtual console, sees the OS stuck at a boot error, mounts a recovery ISO as virtual media and repairs the bootloader without driving to the data center. The next morning, she reviews the BMC access log to confirm only her account connected overnight.",
  "mistakes": [
   [
    "Believing Remote Desktop or SSH counts as out-of-band management.",
    "Those are in-band tools that depend on a running OS and its network. Out-of-band uses the BMC or an IP KVM, which work when the OS is down."
   ],
   [
    "Putting the BMC port on the same network as user traffic or exposing it to the internet for convenience.",
    "Management interfaces belong on a separate, restricted management network, with default credentials changed and encrypted access only."
   ],
   [
    "Thinking the BMC stops working when the server is powered off.",
    "The BMC runs on standby power, so it is available whenever the power cords are connected, even with the server off."
   ],
   [
    "Assuming iLO, iDRAC and IPMI are unrelated technologies.",
    "iLO and iDRAC are vendor-specific BMC implementations; IPMI is the standard protocol for talking to BMCs. The concepts are the same."
   ]
  ],
  "tryit": [
   [
    "A server at an unstaffed branch office froze during a firmware update and does not respond to ping or SSH. Its BMC was configured on the branch's management VLAN last year, and you have VPN access to that VLAN. What do you do first, and what feature lets you watch the server restart?",
    "Connect to the BMC (for example its iLO or iDRAC web interface) over the management VLAN, check the event log, then use the power controls to reset the server. The remote console (virtual KVM) lets you watch POST and the boot process and react to any error."
   ],
   [
    "During an audit, you find that several BMCs are reachable from the general office network and still use the factory default password. The team says 'nobody knows these exist.' What risks does this create, and what do you change?",
    "Anyone on the office network, including malware on a user's laptop, could power off servers, view consoles or mount malicious media. Move BMCs to a restricted management network, change default credentials, use role-based accounts tied to directory authentication, enable only encrypted protocols, update firmware and review access logs."
   ]
  ],
  "tip": "If the OS is down or the server is powered off and you must reach it remotely, the answer is out-of-band management (BMC, iLO, iDRAC, IPMI). Securing it means a separate management network and changed default credentials. A crash cart is the local fallback when remote access fails.",
  "check": [
   [
    "Why can a BMC be reached while the server is powered off?",
    "It runs on standby power with its own processor and network port, independent of the main system and OS."
   ],
   [
    "What is a crash cart used for?",
    "Connecting a monitor, keyboard and mouse locally to a server when remote access is unavailable."
   ],
   [
    "Which BMC feature would you use to install an OS from an ISO without physical media?",
    "Virtual media, which presents the ISO to the server as a local drive."
   ]
  ]
 },
 {
  "t": "Firmware, BIOS and UEFI settings, Secure Boot, TPM, boot order, driver and firmware update planning",
  "hook": "Jordan at Pinecrest Community College receives a security bulletin on Monday: a firmware flaw affects the model of server running the student records system, and the vendor has released a fix. The help desk manager says, 'Just click update on all twenty tonight.' Jordan remembers last year, when a network card driver update left two servers unable to see their storage until someone rolled it back at dawn. Meanwhile, an auditor's questionnaire on the desk asks whether the servers use Secure Boot and whether their drive encryption keys are protected by a TPM. Jordan is not sure what half the firmware screens even control. How do you configure the code that runs before the operating system, and update it without breaking anything?",
  "simple": "Firmware is the small, built-in software that wakes a computer up and gets it ready before Windows or Linux starts. Older computers used a kind called BIOS; newer ones use UEFI, which can start faster, handle bigger disks and check that the startup software has not been tampered with. That checking feature is called Secure Boot, and it works a bit like a bouncer who only lets in guests with a valid ID. A TPM is a small security chip that safely holds secret keys, such as the key that unlocks an encrypted drive. Boot order is simply the list of places the computer looks for an operating system. Updating firmware fixes problems, but it must be planned carefully, because a bad update can stop a server from starting.",
  "body": [
   "Firmware is the low-level software stored on hardware chips that runs before, and underneath, the operating system. The system firmware starts the server, tests hardware, and hands control to a bootloader, which in turn loads the operating system. Drives, RAID controllers, network cards and BMCs (baseboard management controllers) have firmware too, and each can have bugs or security flaws. Server+ tests how to configure system firmware, secure the boot process and update everything safely.",
   "There are two kinds of system firmware interface. BIOS (Basic Input/Output System) is the legacy firmware interface. UEFI (Unified Extensible Firmware Interface) is its modern replacement. UEFI supports GPT (GUID Partition Table, where GUID means globally unique identifier) disks, which allow boot volumes larger than the roughly 2 TB limit of MBR (master boot record) disks. It also offers faster startup, network boot options, a graphical setup screen and Secure Boot. Many servers still offer a legacy or compatibility mode, sometimes called CSM (Compatibility Support Module), but UEFI mode is the default for current operating systems. Switching modes after installation usually leaves the OS unable to boot, because the disk layout and bootloader were built for the other mode.",
   "Most configuration happens in the setup utility. The firmware setup utility, opened with a key during POST (power-on self-test), or through the BMC's virtual console, is where you set the boot order, enable virtualization extensions such as Intel VT-x or AMD-V needed by hypervisors, configure memory and power profiles (for example a performance profile versus a power-saving one), and set firmware passwords so unauthorized people cannot change settings. Many servers can also export and import these settings as a profile, which helps you configure a fleet consistently.",
   "Boot order deserves special attention. Boot order lists the devices the firmware tries in sequence: local disk, USB, optical, PXE (Preboot Execution Environment) network boot. For installs you might temporarily boot from virtual media or the network. In production, set the local boot device first and restrict or disable other options so nobody can boot a USB stick to bypass the OS and its security controls. Protect those settings with a firmware password. Many servers offer a one-time boot menu so you can change the order for a single boot without editing the saved order, which is the safer choice for a one-off repair.",
   "Secure Boot protects the start of the boot chain. Secure Boot is a UEFI feature that checks the digital signature of each bootloader and driver loaded during startup against trusted keys stored in firmware. Unsigned or tampered code is refused, which blocks boot-level malware such as rootkits and bootkits that try to load before the operating system and hide from it. Some Linux distributions and custom drivers need signed shims, small signed bootloaders that then verify the rest, or enrolled keys to boot with Secure Boot on. If a server refuses to boot after a driver change with Secure Boot enabled, an unsigned driver is a likely suspect.",
   "The TPM works alongside Secure Boot. A TPM (Trusted Platform Module) is a hardware chip, or firmware equivalent, that securely stores keys and measures the boot process, recording a fingerprint of each component as it loads. It enables features like BitLocker drive encryption that releases its key only if the boot chain is unchanged, so a stolen drive or a tampered bootloader cannot unlock the data, and attestation that proves to a management system that a server booted cleanly. You may need to enable the TPM in firmware and clear or take ownership of it when repurposing a server. Clearing a TPM destroys the keys it holds, so suspend or back up encryption recovery keys first. The short version: Secure Boot verifies signatures; the TPM stores keys and measures.",
   "Updates fix bugs and security flaws but can also break things, so plan them. Check the vendor's compatibility matrix, because firmware, drivers and OS versions are often tested as a set, and a new driver may require a newer firmware. Read release notes for prerequisites and required order, such as updating the BMC before the BIOS. Back up configurations, schedule a maintenance window through change management, test on one server first, keep the previous version available for rollback, and never cut power during a flash, since an interrupted firmware write can leave a component unusable. Vendors provide bundled update tools or bootable service packs that update many components in one pass in the correct order, and BMCs can often apply firmware remotely and even stage it for the next reboot. After updating, verify versions and confirm the server boots and its services run before moving to the next one."
  ],
  "analogy": "Secure Boot is like a security guard at a theater checking each performer's badge against an approved list before they go on stage; anyone without a valid badge is turned away. The TPM is a sealed safe backstage that records who went on and in what order, and only opens if the lineup matches what it expects. The analogy stops at one point that matters for the exam: Secure Boot blocks unsigned code, while the TPM does not block anything by itself; it stores keys and measurements that other features, such as drive encryption, use.",
  "terms": [
   [
    "UEFI",
    "Unified Extensible Firmware Interface, the modern firmware replacing BIOS, with GPT support and Secure Boot."
   ],
   [
    "GPT",
    "GUID Partition Table, the disk layout used with UEFI that supports boot volumes larger than the MBR limit."
   ],
   [
    "Secure Boot",
    "A UEFI feature that allows only digitally signed, trusted bootloaders and drivers to run at startup."
   ],
   [
    "TPM (Trusted Platform Module)",
    "A hardware security chip that stores cryptographic keys and records measurements of the boot process."
   ],
   [
    "Boot order",
    "The sequence of devices the firmware tries when looking for an operating system to start."
   ],
   [
    "Compatibility matrix",
    "A vendor document listing which firmware, driver and OS versions are tested and supported together."
   ]
  ],
  "example": "Before updating twenty servers, an administrator checks the vendor's support matrix, applies the matching BMC, BIOS, RAID controller and NIC firmware to one test server with the vendor's update bundle, confirms it boots cleanly with Secure Boot on, then schedules the rest in an approved maintenance window. She keeps the previous firmware packages on hand, records each server's new versions, and confirms BitLocker did not prompt for recovery keys after the update.",
  "mistakes": [
   [
    "Confusing Secure Boot with the TPM.",
    "Secure Boot checks signatures of boot code and refuses unsigned code. The TPM stores keys and measures the boot process; it supports encryption and attestation."
   ],
   [
    "Updating all servers at once because the vendor marked the update critical.",
    "Exam answers favor testing on one server first, following the compatibility matrix and required order, using change management and keeping a rollback plan."
   ],
   [
    "Leaving USB and network boot first in the boot order on production servers.",
    "Production servers should boot from the local device first, with other boot options restricted and firmware settings password-protected."
   ],
   [
    "Thinking legacy BIOS can boot from a 4 TB GPT disk with Secure Boot.",
    "Secure Boot and GPT boot volumes larger than about 2 TB require UEFI; legacy BIOS boots from MBR."
   ]
  ],
  "tryit": [
   [
    "After installing a third-party storage driver, a Linux server with Secure Boot enabled stops at a message saying a module failed verification. The driver works on an identical test server where Secure Boot is disabled. What is the likely cause, and what is the correct fix?",
    "The driver is not signed with a key the firmware trusts, so Secure Boot refuses it. The correct fix is to obtain a signed driver or enroll the vendor's signing key, not to disable Secure Boot permanently, which would remove the protection against boot-level malware."
   ],
   [
    "You are repurposing a server that used drive encryption backed by its TPM. The new owner wants a clean install. A coworker suggests clearing the TPM before anything else. What should happen before and after clearing it?",
    "Before clearing, confirm the old data is no longer needed or that any recovery keys are backed up, because clearing the TPM destroys its keys and the old encrypted data becomes unrecoverable without them. After clearing, enable the TPM in firmware, let the new OS take ownership, and set up encryption fresh."
   ]
  ],
  "tip": "Secure Boot verifies signatures of boot code; the TPM stores keys and measures boot integrity. Exam answers on updates favor testing first, following the vendor's order and compatibility matrix, and having a rollback plan. UEFI is required for Secure Boot and large GPT boot disks.",
  "check": [
   [
    "Which firmware type is required for Secure Boot and large GPT boot disks?",
    "UEFI; legacy BIOS lacks Secure Boot and relies on MBR for booting."
   ],
   [
    "Why should you consult a compatibility matrix before updating drivers?",
    "Vendors test firmware, drivers and OS versions together, and mismatched versions can cause instability or failures."
   ],
   [
    "Why should production servers boot from the local disk first with other boot options restricted?",
    "It prevents someone from booting a USB stick or network image to bypass the OS and its security controls."
   ]
  ]
 },
 {
  "t": "Hardware components: CPUs and cores, memory types (ECC, registered), expansion cards, fans and hot-swappable parts",
  "hook": "Sam, a junior technician at Granite Peak Engineering, is asked to upgrade a two-socket server that has only one processor installed. He adds eight memory modules borrowed from a spare desktop, fits a new network card, and powers on. Half the memory does not appear, the server beeps a memory error, and the new card is not detected. Later the same week, a fan fails in another server, and Sam's instinct is to schedule an outage to replace it. His mentor shakes her head at all of it. Every one of these surprises comes from the ways server parts differ from desktop parts. What did Sam miss, and which parts could he have swapped without shutting anything down?",
  "simple": "A server is built from the same kinds of parts as a home computer, but they are chosen to be tougher and easier to service. The processor, or CPU, is the brain; servers often have two of them, and each contains several cores, which are like separate workers. Server memory uses special error-checking chips, called ECC, that catch and fix small mistakes, much like a spell checker fixing a typo before it causes trouble. Expansion cards add features such as extra network connections. Some parts, like fans, drives and power supplies, can be replaced while the server keeps running, which keeps services online. Others, like the processor and memory, need the server switched off first.",
  "body": [
   "A server is built from the same kinds of parts as a desktop, but chosen for reliability, capacity and serviceability. Those differences are why you cannot simply move parts from a desktop into a server and expect them to work. Server+ expects you to recognize those parts, know how they differ from consumer versions and know which can be replaced while the server runs.",
   "Start with the processor. The CPU (central processing unit) does the computing. Servers often have multiple sockets, each holding a physical processor, and each processor contains multiple cores that can run work in parallel. Simultaneous multithreading (Intel calls it Hyper-Threading) presents two logical processors per core, which helps some workloads by keeping the core busy while one thread waits, but it is not the same as doubling cores. A 16-core processor with multithreading shows 32 logical processors in the operating system, yet heavy compute work will not run twice as fast as on 16 cores alone.",
   "Adding a processor has rules. When adding a second processor, match the model, stepping (the manufacturing revision) and speed to the first; mismatched processors may not be supported at all. Remember that memory slots are usually tied to a specific socket, so a second CPU is needed to use its memory banks, and some PCIe slots work only when the second CPU is present. Licensing for many products, including some operating systems and databases, counts sockets or cores, so the CPU choice has cost effects too: more cores can mean a larger license bill.",
   "Server memory adds protection and capacity. Server memory is RAM (random access memory) with extra protection. ECC (error-correcting code) memory stores extra bits alongside the data so the memory controller can detect and correct single-bit errors and detect multi-bit errors, preventing silent data corruption and crashes. Corrected errors are logged, often in the BMC (baseboard management controller) event log, and a module that logs many corrected errors is a warning sign worth acting on. Registered (buffered) memory, called RDIMM (registered dual inline memory module), places a register between the memory controller and the chips, reducing electrical load so a server can hold many more modules. Load-reduced LRDIMMs go further for very large capacities. Unbuffered UDIMMs are common in desktops.",
   "Memory installation has its own rules. Do not mix registered and unbuffered modules; a server that expects RDIMMs will typically refuse to boot or report a memory configuration error with UDIMMs installed. Follow the vendor's population rules for which slots to fill first, since filling slots in the wrong order can disable channels or reduce speed, and install modules in matched sets across channels for best performance. The vendor's documentation, often printed on a label inside the chassis cover, shows the correct order.",
   "Expansion cards add capabilities. Expansion cards plug into PCIe (Peripheral Component Interconnect Express) slots and add RAID controllers, host bus adapters for Fibre Channel or SAS (Serial Attached SCSI), extra network interface cards (NICs), and GPUs (graphics processing units) for compute workloads such as machine learning. PCIe slots come in lane widths such as x4, x8 and x16, and in full-height or low-profile sizes, so check that the card fits both the slot's electrical lanes and the chassis. A slot can be physically x16 but wired for only x8, which limits bandwidth. Some slots are connected to a particular CPU and work only when that CPU is installed. Riser cards turn slots sideways in thin 1U and 2U chassis so full-size cards can lie flat.",
   "Cooling is part of the design, not an afterthought. Servers use several fans for front-to-back airflow, and in most enterprise servers they are redundant and hot-swappable: if one fails, the others spin faster and you replace it without shutting down. The BMC raises an alert and the fan module often shows an amber light. Keep the chassis cover on while running, since servers are designed to channel air with it closed and some will raise alarms or throttle with the cover off, and fill empty drive or PSU (power supply unit) bays with blanks so air does not bypass the components.",
   "Finally, know what can be swapped live. Commonly hot-swappable parts include drives in caddies, power supplies and fans. CPUs, memory and most expansion cards are not hot-swappable on typical servers and require shutting down, so always check the vendor documentation. When you do work inside a server, use electrostatic discharge (ESD) protection such as a wrist strap connected to the chassis or a grounded mat, handle modules by their edges, and keep replacement parts in their antistatic bags until you install them."
  ],
  "analogy": "ECC memory is like a careful bank teller who counts every stack of bills twice and fixes a miscount on the spot before handing it over; ordinary memory hands over the stack without checking. Registered memory is like adding a supervisor who relays instructions to a large team, so the manager (the memory controller) is not overwhelmed and can oversee many more workers. The analogy stops at multi-bit errors: ECC can detect them but usually cannot fix them, just as the teller can notice a badly wrong stack without knowing the right count.",
  "terms": [
   [
    "Socket",
    "The motherboard mount that holds one physical CPU; servers often have two or more."
   ],
   [
    "Core",
    "An independent processing unit within a CPU; one socket can contain many cores."
   ],
   [
    "ECC memory",
    "RAM that uses extra bits to detect and correct single-bit errors, preventing silent corruption."
   ],
   [
    "Registered memory (RDIMM)",
    "Memory with a register that buffers signals, allowing more modules and larger capacity per server."
   ],
   [
    "PCIe lanes",
    "The data channels of a PCIe slot (x4, x8, x16); a slot's electrical lanes can be fewer than its physical size."
   ],
   [
    "Hot-swappable",
    "Able to be replaced while the system stays powered on and running."
   ]
  ],
  "example": "A virtualization host logs repeated corrected memory errors on one DIMM. Because it uses ECC RDIMMs, the host keeps running without corruption. The administrator migrates the virtual machines off, shuts it down, replaces the module in the same slot following the population guide, and returns it to service. Later that week, a fan in the same server fails; she slides out the hot-swap fan module and inserts a new one without any downtime.",
  "mistakes": [
   [
    "Assuming Hyper-Threading doubles the number of real cores.",
    "Simultaneous multithreading presents two logical processors per core and can help some workloads, but it does not double compute capacity."
   ],
   [
    "Mixing registered and unbuffered memory, or using desktop UDIMMs in a server that expects RDIMMs.",
    "Registered and unbuffered modules cannot be mixed. Use the module type and population order the vendor specifies."
   ],
   [
    "Believing ECC prevents all memory errors.",
    "ECC corrects single-bit errors and detects multi-bit errors. Repeated corrected errors still mean the module should be replaced."
   ],
   [
    "Planning downtime to replace a failed fan or power supply.",
    "On most enterprise servers, fans, PSUs and drives are hot-swappable. CPUs and RAM are the parts that normally require shutting down."
   ]
  ],
  "tryit": [
   [
    "A two-socket server has one CPU installed and twelve memory modules spread across all slots. The OS reports only half the installed memory, and a new PCIe card in slot 6 is not detected. The vendor manual shows slots 4 to 6 and half the memory banks are attached to CPU 2. What is the cause, and how do you fix it?",
    "The missing memory and the undetected card are wired to the empty second socket. Either install a matching second CPU (same model, stepping and speed) or move the memory and card into slots served by CPU 1, following the population rules."
   ],
   [
    "A database server's BMC log shows a rising count of corrected memory errors on DIMM B3 over the past week, but the server has not crashed. The team asks whether they can ignore it because ECC is fixing the errors. What do you recommend?",
    "Do not ignore it. Rising corrected errors indicate a failing module, which could soon produce an uncorrectable error and a crash. Schedule a maintenance window, move workloads if possible, shut down, replace DIMM B3 with a matching ECC RDIMM using ESD protection, and monitor the log afterward."
   ]
  ],
  "tip": "ECC corrects errors; registered buffers signals for capacity. Do not mix RDIMMs and UDIMMs. Drives, PSUs and fans are the usual hot-swap parts; CPUs and RAM normally require downtime. Memory and PCIe slots tied to an empty CPU socket will not work.",
  "check": [
   [
    "What problem does ECC memory solve?",
    "It detects and corrects single-bit memory errors, preventing silent data corruption and crashes."
   ],
   [
    "Why might memory in some slots not be detected on a two-socket server with one CPU?",
    "Those slots are wired to the second socket, so they only work when the second CPU is installed."
   ],
   [
    "Name three components that are commonly hot-swappable in enterprise servers.",
    "Drives in caddies, power supplies and fans."
   ]
  ]
 },
 {
  "t": "OS installation: minimum requirements, HCL, bare metal vs virtual, GUI vs core/headless installs, partitioning and file systems (NTFS, ReFS, ext4, XFS, VMFS)",
  "hook": "Nadia at Copperfield Public Schools boots a brand-new server from the installation media for the district's new student information system. The installer loads, asks for a language, then stops at the disk selection screen: no drives found. The server has eight disks behind a RAID controller, and the lights are all green. Her colleague suggests a different installation image; another suggests the hardware is faulty. Meanwhile the project lead wants to know whether this should even be a physical install, whether it needs a desktop interface, and which file system the data volume should use. A few decisions made before the first click would have answered all of it. What should she have checked, and what should she choose?",
  "simple": "Installing a server operating system is like moving into a new house: you check that the house is big enough and that your furniture fits before moving day. First, make sure the server meets the operating system's requirements and that its parts appear on the maker's list of supported hardware. Then decide whether the operating system goes straight onto the physical machine or into a virtual machine, which is a computer simulated in software. You can install it with a full graphical desktop or without one, which is leaner and safer. Finally, you divide the disk into sections, called partitions, and pick a file system, which is the method the computer uses to organize files, like the shelves and labels in a library.",
  "body": [
   "Installing a server operating system well starts before you insert the media. You confirm the hardware is supported and big enough, decide whether the OS will run on physical hardware or a virtual machine, choose how much interface to install, and plan the disk layout and file system. Each of those choices is hard to change later without reinstalling, which is why Server+ treats installation as planning, not just clicking through a wizard.",
   "Start with requirements and compatibility. Every OS publishes minimum requirements for CPU (central processing unit), memory, disk and firmware, such as requiring UEFI (Unified Extensible Firmware Interface) or a TPM (Trusted Platform Module) for certain features. Minimums let the OS install, not run your workload, so size for the roles and applications you will add, plus growth. The HCL (hardware compatibility list) is the vendor's list of hardware certified to work with the OS or hypervisor; using listed hardware and drivers avoids unexplained crashes and keeps you eligible for vendor support, since many vendors will not support a problem on unlisted hardware. Check it for storage controllers and NICs (network interface cards) in particular, since missing drivers are a common reason an installer cannot see the disks. The fix in that case is usually to load the controller driver during setup or use the server vendor's deployment tool, which injects the right drivers.",
   "Next, decide where the OS will live. A bare metal install puts the OS, or a hypervisor, directly on the physical server, with no other software layer underneath. A virtual install puts the OS in a virtual machine running on a hypervisor. Virtual installs are faster to provision, often from a template in minutes, and easier to snapshot, back up, resize and move between hosts. Bare metal suits hypervisor hosts themselves and workloads that need direct hardware access, such as specialized cards or the highest possible performance. In a virtual install, the hypervisor's HCL matters for the physical host, while the guest OS sees standardized virtual hardware.",
   "Then decide how much interface to install. Many server operating systems can be installed with or without a graphical interface. Windows Server offers Desktop Experience (full GUI, or graphical user interface) and Server Core, which has no desktop and is managed with PowerShell, the command line or remote tools such as Windows Admin Center and the server management consoles on an administrator's workstation. Linux servers are usually installed headless, with no GUI, and managed over SSH (Secure Shell). A core or headless install has a smaller attack surface, because fewer components means fewer vulnerabilities, needs fewer patches and reboots, and uses less memory and disk. The trade-off is that administrators must be comfortable with command-line and remote management, and some applications require a GUI to install.",
   "With the platform chosen, plan the disk. Partitioning divides a disk into sections. Use GPT (GUID Partition Table) with UEFI. Common practice separates the OS from data, so a full data volume cannot crash the OS and you can reinstall the OS without touching data. On Windows that might mean a C: volume for the system and a D: volume for application data or databases. Linux installs often separate `/boot`, `/` (root), `/var` (where logs grow) and swap, sometimes using LVM (Logical Volume Manager) so volumes can be resized later without repartitioning. A runaway log that fills `/var` is then contained instead of filling the root file system and stopping the server.",
   "Finally, choose the file system for the job, starting with Windows. NTFS (New Technology File System) is the standard Windows file system, with permissions through ACLs (access control lists), encryption, compression and quotas. It is the normal choice for Windows boot and general-purpose volumes. ReFS (Resilient File System) is a Windows file system built for large volumes and data integrity, with checksums and automatic repair when used with Storage Spaces. It is common for virtualization and backup storage but cannot be used everywhere NTFS can, for example as a typical boot volume, and it lacks some NTFS features.",
   "On Linux and VMware, three more file systems matter. On Linux, ext4 (fourth extended file system) is a mature, general-purpose default with journaling, which helps it recover quickly after a crash. XFS is a high-performance journaling file system suited to large files and volumes and parallel input/output; it can grow but not shrink, so plan its size carefully. VMFS (Virtual Machine File System) is VMware's clustered file system that lets multiple ESXi hosts share the same datastore of virtual machine files, coordinating access with locking so hosts do not corrupt each other's files. That shared access is what lets virtual machines move between hosts. A quick rule: NTFS and ReFS for Windows, ext4 and XFS for Linux, VMFS for VMware datastores."
  ],
  "analogy": "A headless install is like a restaurant kitchen with no dining room. There is less to clean, fewer doors for intruders and lower running costs, but you need staff who can take orders by phone (command line and remote tools) instead of at a table. The HCL is the landlord's list of approved appliances: plug in something unlisted and it might work, but if it starts a fire, the landlord will not help. The analogy stops at management: a headless server can still be managed graphically from another computer.",
  "terms": [
   [
    "HCL (hardware compatibility list)",
    "A vendor's list of hardware tested and supported with a given OS or hypervisor."
   ],
   [
    "Bare metal install",
    "Installing an OS or hypervisor directly on physical hardware with no software layer underneath."
   ],
   [
    "Server Core",
    "A Windows Server installation option without the desktop GUI, managed from the command line or remotely."
   ],
   [
    "NTFS",
    "The standard Windows file system, supporting ACL permissions, encryption, compression and quotas."
   ],
   [
    "ReFS",
    "Resilient File System, a Windows file system focused on integrity and large volumes, often used for virtualization and backup storage."
   ],
   [
    "XFS",
    "A high-performance Linux journaling file system for large files and volumes that can grow but not shrink."
   ],
   [
    "VMFS",
    "VMware's clustered file system that lets several ESXi hosts share a datastore."
   ]
  ],
  "example": "An administrator deploys a new domain controller as a virtual machine using Windows Server Core to reduce patching and attack surface. She checks that the host's RAID controller is on the hypervisor's HCL, gives the VM separate virtual disks for the OS and the directory database, and formats both with NTFS. For a new Linux log server, she installs headless, puts `/var` on its own LVM volume formatted with XFS and sized for a year of growth, since XFS cannot be shrunk later.",
  "mistakes": [
   [
    "Sizing a server to the OS minimum requirements.",
    "Minimums only let the OS install. Size for the roles, applications and growth the server will actually carry."
   ],
   [
    "Assuming a missing-disk error during setup means the drives are faulty.",
    "Often the installer lacks the storage controller driver. Check the HCL and load the correct driver or use the vendor's deployment tool."
   ],
   [
    "Choosing ReFS for a standard Windows boot volume because it is newer.",
    "ReFS is aimed at large data, virtualization and backup volumes. NTFS remains the normal choice for boot and general-purpose Windows volumes."
   ],
   [
    "Believing a Server Core or headless server cannot be managed with graphical tools.",
    "It has no local desktop, but it can be managed remotely with graphical consoles on another computer, as well as with PowerShell or SSH."
   ]
  ],
  "tryit": [
   [
    "A school district needs a new file server for staff documents on Windows Server. Security wants the smallest possible attack surface, the admin team is comfortable with PowerShell and remote consoles, and the data will grow steadily. Which installation option and disk layout do you choose, and which file system for each volume?",
    "Install Server Core to reduce attack surface and patching, managed remotely. Use GPT with UEFI and separate the OS volume from the data volume. Format the OS volume with NTFS and the data volume with NTFS for its permissions and quotas (ReFS is an option for very large integrity-focused volumes, but NTFS fits a general file share well)."
   ],
   [
    "Three ESXi hosts must share one block of SAN storage so virtual machines can move between hosts during maintenance. A new team member proposes formatting the LUN with ext4 because it is reliable. What file system belongs on that LUN, and why?",
    "VMFS, VMware's clustered file system, which lets multiple ESXi hosts access the same datastore safely with locking. ext4 is not a clustered file system and is not used for ESXi datastores."
   ]
  ],
  "tip": "Core or headless installs are the answer when a question stresses smaller attack surface and fewer updates. Know which file system fits which platform: NTFS/ReFS for Windows, ext4/XFS for Linux, VMFS for VMware datastores. A missing-disk error during setup points to a storage driver and the HCL.",
  "check": [
   [
    "Why check the HCL before installing?",
    "To confirm the hardware and drivers are tested and supported with that OS, avoiding instability and keeping vendor support."
   ],
   [
    "Name one benefit and one drawback of a headless install.",
    "Benefit: smaller attack surface and fewer resources and patches. Drawback: administration requires command-line or remote tools."
   ],
   [
    "Why separate the OS and data onto different volumes?",
    "A full data volume cannot crash the OS, and the OS can be reinstalled without touching the data."
   ],
   [
    "Which Linux file system can grow but not shrink?",
    "XFS."
   ]
  ]
 },
 {
  "t": "Installation methods: media, PXE/network boot, imaging and cloning, templates, answer files, P2V",
  "hook": "It is Monday morning at Harbor Credit Union, and Dev, the only server administrator on staff, has just been told that forty new branch servers arrive on Wednesday and must be in production by Friday. Last time he built servers, he sat in the data center with a USB stick, clicking through the same installer screens again and again, and two of those machines still have slightly different partition layouts that nobody can explain. He does the math: forty installs by hand, each one an hour of clicking, each one a chance for a typo. There has to be a faster way that also produces identical servers. Which installation method should he reach for, and what does it need to work?",
  "simple": "Installing an operating system is like setting up a new phone: there are a lot of questions to answer and settings to choose. You can do it by hand, one device at a time, from a USB stick or disc. Or you can automate it. A server can start up from the network instead of a local disk and pull its installer from a central server. A settings file can answer every installer question for you. You can also set up one machine perfectly and copy it to others, the way a bakery uses one cookie cutter to make identical cookies. Finally, you can turn an old physical server into a virtual one that runs as software on a bigger machine. Each method trades setup effort for speed and consistency.",
  "body": [
   "Installing one server by hand from a DVD is fine. Installing fifty the same way is slow and error-prone, and every manual step is a chance for two machines to end up subtly different. CompTIA Server+ tests the full range of installation methods, from simple media to fully automated deployment, and expects you to know when each one fits and what infrastructure each one depends on.",
   "Media-based installs are the starting point. The server boots from an ISO image on a USB drive, an optical disc, or virtual media mounted remotely through the BMC (baseboard management controller), such as iDRAC or iLO, so you can attach an ISO from your desk without visiting the rack. You walk through the installer and answer each prompt: language, disk layout, network settings, administrator password. This is the most direct method and an essential fallback when nothing else is available, for example on a brand-new site with no deployment server yet. The downside is consistency. Unless you follow a written build checklist carefully, every server ends up slightly different, and those small differences cause hard-to-explain problems later.",
   "PXE (Preboot Execution Environment) boot lets a server start from the network instead of local storage. When the server powers on with network boot in its boot order, the NIC (network interface card) firmware broadcasts a request to DHCP (Dynamic Host Configuration Protocol). The DHCP response includes not just an IP address but also the address of a boot server and a boot file name. The server then downloads that boot file with TFTP (Trivial File Transfer Protocol) and runs it, which starts the installer or loads a deployment environment. Tools such as Windows Deployment Services or Linux network install servers use PXE to deploy many machines without anyone touching physical media. On the console you might see the NIC firmware report that it is requesting an address, then show the boot server it found and the file it is downloading.",
   "PXE has three practical requirements that appear often in exam questions. It needs a DHCP server on the same network segment, or a DHCP relay (sometimes called an IP helper) on the router so the broadcast reaches a DHCP server on another subnet. It needs a TFTP server holding the boot files. And the server's firmware must have network boot enabled and placed in the boot order. If a server simply skips network boot and boots from its local disk, check the boot order first. Security matters too: because anyone plugged into that network could boot from the deployment server and possibly receive an image with embedded settings, restrict PXE to a dedicated provisioning VLAN (virtual local area network).",
   "Answer files automate the installer's questions so nobody has to sit and click. An answer file supplies the time zone, disk partitioning, package selection, administrator password, and network settings. Windows uses an unattend file, often named `unattend.xml`. Red Hat-based Linux distributions use Kickstart files, and Debian-based distributions use preseed files. An answer file can be placed on the install media or, more powerfully, served over the network during a PXE install. Combining PXE with answer files gives you hands-off, repeatable builds: power the server on, and it installs itself exactly the same way every time. Because answer files can contain credentials, store them carefully and avoid plain-text passwords where the installer supports hashed values.",
   "Imaging and cloning take a different approach: instead of running the installer on every machine, you copy a fully configured system. You build a reference machine, install updates and applications, and then generalize it to strip out anything that must be unique. On Windows, this is done with Sysprep, which removes the security identifier (SID) and computer name so each copy generates its own when it first boots. Skipping this step leaves many servers sharing identifiers, which causes domain and management problems. You then capture the generalized system as an image and deploy that image to other servers, often over the network using PXE. Cloning copies one disk directly to another, sector by sector or file by file. Images are fast to deploy, but they go stale as patches are released, so schedule regular image updates or every new server starts its life months behind.",
   "Templates are the virtualization version of images. A VM (virtual machine) template is a master virtual machine, usually generalized, that the hypervisor clones to create new VMs with consistent CPU, memory, disk and network settings. Templates are usually marked read-only so nobody accidentally powers on and changes the master. Cloud platforms offer the same idea as machine images that you launch new instances from. The same rule applies: generalize before you use it as a template, and refresh it on a schedule.",
   "P2V (physical to virtual) converts an existing physical server into a virtual machine. A conversion tool copies the server's disks into virtual disk files and injects the virtual hardware drivers the guest needs to boot on the hypervisor. It is commonly used when consolidating aging hardware onto a virtualization host. The related terms V2V (virtual to virtual, moving between hypervisors) and V2P (virtual to physical) also appear on the exam. After a P2V, clean up carefully: remove software tied to the old physical hardware, such as vendor management agents and RAID utilities, check that the virtual NIC settings and IP configuration are correct, and keep the original physical machine powered off. If both stay on, two systems with the same name and identity appear on the network at once, which confuses DNS, the directory and users."
  ],
  "analogy": "Think of building houses. A media install is a carpenter building each house from scratch with a printed plan; it works, but no two turn out exactly alike. An answer file is a detailed work order the carpenter follows without asking questions. PXE is delivering that work order and the tools by truck instead of carrying them in by hand. Imaging is building one perfect model home and stamping out copies, but you must change the address on each copy, which is what Sysprep does. The analogy stops working for P2V: that is more like moving an existing house onto a new foundation, not building a new one.",
  "terms": [
   [
    "PXE",
    "Preboot Execution Environment: booting a computer over the network using DHCP to find a boot server and TFTP to download the boot file that starts an installer or image."
   ],
   [
    "Answer file",
    "A file that supplies installer responses automatically, such as unattend.xml on Windows, Kickstart on Red Hat-based Linux or preseed on Debian-based Linux."
   ],
   [
    "Sysprep",
    "A Windows tool that generalizes an installation, removing unique identifiers such as the SID and computer name before it is captured as an image."
   ],
   [
    "VM template",
    "A generalized master virtual machine that a hypervisor clones to create new, consistent VMs."
   ],
   [
    "P2V",
    "Physical-to-virtual conversion of an existing physical server into a virtual machine; related terms are V2V and V2P."
   ],
   [
    "DHCP relay",
    "A router feature that forwards DHCP broadcasts to a DHCP server on another subnet, letting PXE work across networks."
   ]
  ],
  "example": "A company needs thirty identical Linux web servers. The team creates a Kickstart file defining partitions and packages, puts the servers on a provisioning VLAN with PXE, and powers them on. Each boots from the network and installs itself; afterwards configuration management applies the web role.",
  "mistakes": [
   [
    "PXE only needs a TFTP server holding the boot files.",
    "PXE first needs DHCP to give the client an address and tell it which boot server and file to use. Without DHCP on the segment or a relay, the client never learns where to get the boot file."
   ],
   [
    "Capturing a Windows image without Sysprep is fine as long as you rename each server afterward.",
    "Renaming does not change the machine SID and other unique identifiers. Generalize the reference system with Sysprep before capture so every deployed copy gets its own identity."
   ],
   [
    "A template or image is set-and-forget.",
    "Images and templates go stale as patches are released. Update them on a schedule, or every new server begins with a backlog of missing updates."
   ],
   [
    "After a P2V you can leave the original server running as a backup.",
    "Leaving both on puts two systems with the same name and identity on the network. Power off the physical server and keep it off once the VM is verified."
   ]
  ],
  "tryit": [
   [
    "You set up a new deployment server and put a batch of servers on a provisioning VLAN. When they power on, each one sits at a message saying no DHCP offer was received, then boots to an empty local disk. The DHCP server lives on a different subnet in the main server room. What is the most likely fix?",
    "Configure a DHCP relay (IP helper) on the router interface for the provisioning VLAN, or place a DHCP service on that VLAN. PXE starts with a DHCP broadcast, and broadcasts do not cross routers on their own, so the clients never learn about the boot server."
   ],
   [
    "A small office has one aging physical file server running on hardware that is out of warranty. The company already runs a virtualization host with plenty of spare capacity, and the file server's configuration is complex and poorly documented. Which installation approach fits best?",
    "P2V. Converting the existing server keeps its configuration intact without rebuilding it from scratch, and moves it onto supported hardware. Afterward, remove old hardware agents, check the virtual NIC, and keep the physical box powered off."
   ]
  ],
  "tip": "PXE depends on DHCP and TFTP plus network boot in the boot order. Always generalize a Windows image (Sysprep) before cloning so machines do not share identifiers. Answer file names to recognize: unattend.xml, Kickstart, preseed.",
  "check": [
   [
    "Which two network services does PXE boot rely on?",
    "DHCP to provide an address and boot server information, and TFTP to download the boot file."
   ],
   [
    "What is the purpose of an answer file?",
    "It supplies installer settings automatically so installs are unattended and consistent."
   ],
   [
    "Why should PXE be limited to a provisioning VLAN?",
    "Any device on a PXE-enabled network could boot from the deployment server, so isolating it reduces the chance of unauthorized installs or exposure of image contents."
   ],
   [
    "What should you do with the physical server after a successful P2V?",
    "Keep it powered off so two machines with the same identity do not appear on the network, and remove hardware-specific agents from the new VM."
   ]
  ]
 },
 {
  "t": "Network services: static vs DHCP addressing, DNS, NTP, NIC teaming/bonding, VLAN tagging, firewall ports, IPv4 and IPv6",
  "hook": "The help desk at Pinecrest Medical Group lights up at 8:05 a.m. Nobody can sign in to the new scheduling application that went live over the weekend. Priya, the server administrator, checks the server: it is powered on, it answers ping, and the application service is running. Yet every logon attempt fails with a vague authentication error. She opens the system clock and stares at it for a second. It reads 8:16. Her phone says 8:06. Could ten minutes on a clock really lock out an entire clinic, and what else about this server's network setup did the weekend team skip?",
  "simple": "A server on a network needs a few basic things to be useful, much like a shop needs a street address, a sign, and a clock. Its IP address is its street address, and servers usually get one that never changes so customers can always find it. DNS is like a phone book that turns a name people remember into that address. NTP keeps every computer's clock in agreement, which matters because security checks compare times. Teaming plugs a server into the network with two cables so one can fail without trouble. VLANs split one physical network into separate lanes. Ports are like numbered doors, each for one kind of service, and a firewall decides which doors stay open.",
  "body": [
   "A server that cannot be found or reached on the network is not doing its job, no matter how powerful its hardware is. This topic covers how a server gets its address, how clients find it by name, how it keeps accurate time, how its network links are made redundant and segmented, and which ports it listens on. Many Server+ troubleshooting questions trace back to one of these basics being wrong.",
   "Addressing comes first. Servers usually get static IP addresses, configured by hand, so their addresses never change and DNS records, firewall rules and client settings stay valid. DHCP (Dynamic Host Configuration Protocol) hands out addresses automatically from a pool and suits client devices that come and go. A middle path is a DHCP reservation, which always gives the same address to a specific MAC (media access control) address, so you get a fixed address with central management. Either way, each server needs four correct values: an IP address, a subnet mask (or prefix length such as /24), a default gateway, and DNS server addresses. A wrong gateway lets a server talk to its own subnet but nothing beyond it, a classic symptom to recognize.",
   "IPv4 and IPv6 both appear on the exam. IPv4 uses 32-bit addresses written as four decimal numbers, such as 192.168.10.25. IPv6 uses 128-bit addresses written as eight groups of hexadecimal digits separated by colons, with runs of zeros shortened using a double colon. An IPv6 interface can configure itself with SLAAC (stateless address autoconfiguration) or receive settings from DHCPv6, and it always has a link-local address starting with `fe80::` that works only on the local segment. Many servers run both protocols at once, which is called dual stack. On Windows, `ipconfig /all` shows both; on Linux, `ip addr` does.",
   "DNS (Domain Name System) translates names to addresses so users and applications never need to memorize numbers. Important record types include A (name to IPv4 address), AAAA (name to IPv6 address), CNAME (an alias pointing one name at another), MX (the mail server for a domain), PTR (reverse lookup, address to name) and SRV (service locations, used heavily by Active Directory so clients can find domain controllers). Servers need accurate forward and reverse records and should point at reliable internal DNS servers, not public resolvers, or they will be unable to find internal resources. Tools such as `nslookup` and `dig` let you test what a name resolves to.",
   "NTP (Network Time Protocol) synchronizes clocks over UDP port 123. Accurate time matters far more than it seems. Kerberos authentication rejects tickets when clocks differ by more than a few minutes by default, so a drifting server suddenly refuses logons. Log correlation depends on timestamps lining up across systems, certificates have validity periods that are checked against the clock, and scheduled jobs run at the wrong moment if time is off. Point servers at internal time sources that in turn sync with trusted upstream servers, so the whole organization agrees on the time.",
   "NIC teaming, called bonding on Linux, combines two or more network adapters into one logical interface for fault tolerance, extra bandwidth, or both. The operating system sees a single interface with one IP address. Modes include active-passive, where one adapter carries traffic and another waits to take over, and active-active load balancing, where all members carry traffic. Some active-active modes, such as LACP (Link Aggregation Control Protocol), require matching configuration on the switch, while simple failover teaming does not. Connect team members to different switches when possible so a switch failure does not isolate the server.",
   "A VLAN (virtual local area network) separates traffic on shared switches into isolated broadcast domains. Using IEEE 802.1Q tagging, a server or hypervisor port configured as a trunk can carry several VLANs over one cable, adding a small tag with the VLAN ID to each frame. The switch port must be configured as a trunk that allows the same VLANs; an access port carries only one untagged VLAN and drops tagged frames for others. This lets one physical link carry management, storage and production traffic separately, which is common on virtualization hosts.",
   "Finally, know the common ports so you can open only what a role needs and spot mistakes in firewall rules: SSH (Secure Shell) 22, SMTP (Simple Mail Transfer Protocol) 25, DNS 53, DHCP 67 and 68, HTTP 80, NTP 123, LDAP (Lightweight Directory Access Protocol) 389, HTTPS 443, SMB (Server Message Block) 445, LDAPS 636, Microsoft SQL Server 1433, and RDP (Remote Desktop Protocol) 3389. Host firewalls should allow these only from the networks that need them, for example RDP only from an administrative subnet rather than from everywhere."
  ],
  "analogy": "A VLAN trunk is like a single highway carrying cars bound for several different towns. Each car has a colored sticker showing its destination town, which is the 802.1Q tag. An exit ramp that only serves one town is an access port; cars with other stickers are turned away there. The highway is shared, but the traffic never mixes at the destinations. Where it stops working: real cars can switch lanes freely, but traffic in different VLANs cannot reach each other at all unless a router or Layer 3 switch connects them.",
  "terms": [
   [
    "DHCP reservation",
    "A DHCP setting that always assigns the same IP address to a specific device's MAC address."
   ],
   [
    "NIC teaming/bonding",
    "Combining multiple network adapters into one logical interface for redundancy and possibly more bandwidth."
   ],
   [
    "802.1Q",
    "The standard for VLAN tagging, which marks Ethernet frames with a VLAN ID so one link can carry multiple VLANs."
   ],
   [
    "NTP",
    "Network Time Protocol, used to keep system clocks synchronized; it uses UDP port 123."
   ],
   [
    "AAAA record",
    "A DNS record that maps a host name to an IPv6 address."
   ],
   [
    "SLAAC",
    "Stateless address autoconfiguration: an IPv6 method that lets a host build its own address from router advertisements."
   ]
  ],
  "example": "Users cannot log on to a new application server. The administrator finds its clock is ten minutes fast because NTP was never configured, so Kerberos authentication fails. Pointing it at the domain's time source fixes logons immediately.",
  "mistakes": [
   [
    "Servers should use regular DHCP leases so addressing is easier to manage.",
    "A server's address must not change, or DNS records, firewall rules and client settings break. Use a static address or a DHCP reservation."
   ],
   [
    "A PTR record maps a name to an address.",
    "PTR is the reverse: it maps an address back to a name. A and AAAA records map names to IPv4 and IPv6 addresses."
   ],
   [
    "Any NIC team mode works without touching the switch.",
    "Simple failover teaming needs no switch changes, but LACP and some other load-balancing modes require matching configuration on the switch ports."
   ],
   [
    "Clock drift is a cosmetic issue that only affects log timestamps.",
    "Kerberos rejects authentication when clocks differ by more than a few minutes by default, and certificates and scheduled tasks depend on correct time too."
   ]
  ],
  "tryit": [
   [
    "A new hypervisor host is connected to a switch port. The VMs on its management network work fine, but VMs assigned to VLAN 20 and VLAN 30 cannot reach anything. The virtual switch tags traffic for VLANs 20 and 30. What should you check on the physical switch?",
    "Check that the switch port is configured as an 802.1Q trunk and that VLANs 20 and 30 are allowed on it. The port is likely an access port in the management VLAN, which drops the tagged frames for the other VLANs."
   ],
   [
    "A web server can reach other servers on its own subnet but cannot reach the internet or other subnets. DNS lookups for internal names on the same subnet work. Which of the four basic IP settings is the most likely problem?",
    "The default gateway. Local traffic does not need the gateway, but anything leaving the subnet does, so a missing or wrong gateway produces exactly this pattern."
   ]
  ],
  "tip": "Servers get static addresses or reservations, not dynamic leases. Time drift breaks Kerberos authentication. LACP teaming needs switch configuration; simple failover teaming does not. Memorize the port list, especially 22, 53, 123, 389, 443, 445, 636, 1433 and 3389.",
  "check": [
   [
    "Which DNS record maps a name to an IPv6 address?",
    "An AAAA record."
   ],
   [
    "Why must a switch port be configured as a trunk for a hypervisor carrying several VLANs?",
    "The host sends 802.1Q-tagged frames for multiple VLANs, and only a trunk port accepts and forwards tagged traffic for those VLANs."
   ],
   [
    "What port does RDP use?",
    "TCP 3389."
   ],
   [
    "What does an IPv6 address beginning with fe80:: indicate?",
    "It is a link-local address, automatically present on every IPv6 interface and usable only on the local segment."
   ]
  ]
 },
 {
  "t": "Server roles: web, application, database, file and print, directory services, DNS/DHCP, mail, messaging, NTP, and how roles relate to hardware sizing",
  "hook": "The budget meeting at Lakeside Outfitters is in an hour, and Marco has been asked to justify the hardware for the new order system. His manager has a quote in hand for three identical servers, one each for the website, the business logic and the database. It looks tidy and simple. But Marco remembers last year's slowdown, when the old database server sat with its CPU nearly idle while every query crawled and the storage lights blinked nonstop. Buying three identical boxes would repeat the same mistake. How should he explain which role needs which resources, and where the money should actually go?",
  "simple": "A server role is simply the job a server does, like the different jobs in a restaurant. The host at the door greets people and sends them to a table, like a web server answering visitors. The cook does the real work, like an application server. The pantry stores and fetches ingredients fast, like a database. Each job needs different tools: the cook needs a big stove, the pantry needs lots of shelves and quick access. Servers are the same. A database needs lots of memory and very fast disks. A file server needs lots of storage space. A server that hands out addresses or answers name lookups needs very little power but must never be missing, so you keep a backup. Sizing means picking the right tools for each job.",
  "body": [
   "A server role is the job a server performs for its clients. Knowing what each role does tells you which ports it opens, which resources it stresses and how much hardware it needs. CompTIA Server+ asks you to match roles to their purpose and to their sizing priorities, and many questions are really asking which resource will become the bottleneck for a given role.",
   "Web and application servers form the front of most business systems. A web server delivers web pages and APIs (application programming interfaces) over HTTP and HTTPS; common examples are IIS (Internet Information Services) on Windows and Apache or Nginx on Linux. Simple web servers need moderate CPU and memory and fast networking, and they scale well horizontally, meaning you add more servers behind a load balancer rather than making one server bigger. An application server runs business logic, often the middle tier between a web front end and a database. Its needs depend on the application, but they usually center on CPU and memory, because it spends its time processing requests rather than storing data.",
   "The database server is usually the most demanding role. It stores and queries structured data, and it performs huge numbers of small random reads and writes. That means it needs plenty of memory so it can cache frequently used data instead of reading from disk, fast storage with high IOPS (input/output operations per second) and low latency, often SSD (solid-state drive) or NVMe (Non-Volatile Memory Express) drives in RAID 10, and enough CPU cores to handle many concurrent queries. Database licensing is often charged per core, so the number of cores affects cost as much as performance. When a database is slow but its CPU is mostly idle, look first at storage latency and memory pressure.",
   "File, print and directory roles serve everyday users. A file server shares folders over SMB (Server Message Block) for Windows clients or NFS (Network File System) for Linux and UNIX clients. Its priorities are storage capacity, reliable disks with RAID protection, and network throughput, since it moves large amounts of data. A print server manages print queues and drivers for shared printers and needs few resources. Directory services, such as Active Directory Domain Services running on a domain controller, store users, groups and computers and handle authentication for the whole organization. Domain controllers need reliability more than raw power, and you should run at least two so logons keep working if one fails.",
   "Infrastructure roles keep the network itself working. DNS servers resolve names and DHCP servers assign addresses; both are light on resources but critical, so run them redundantly, for example with two DNS servers and DHCP failover or split scopes. An NTP server provides accurate time to the rest of the network. A mail server, such as Microsoft Exchange or Postfix, sends and receives email and stores mailboxes, so it needs substantial storage and memory, plus good disk performance as mailboxes grow. Messaging servers include chat and collaboration platforms and message queues that pass data between applications; they need low latency and reliable storage so queued messages are not lost if a server restarts.",
   "To size hardware for a role, start by identifying the bottleneck resource. CPU matters most for compute-heavy applications. Memory matters most for databases and virtualization hosts. Disk IOPS matter most for transactional systems, capacity for file and backup servers, and network bandwidth for file and web traffic. Next, collect a baseline from existing systems using performance monitoring, or use the vendor's sizing guide for a new product. Add expected growth over the hardware's planned life, and leave headroom so the server is not running near its limit on day one. A server that already averages high utilization at launch has no room for peaks, patches or growth.",
   "Also decide whether roles can share a server. Combining lightweight roles like DNS and DHCP on the same server is common and reasonable. Mixing a busy database with a public-facing web server is riskier, because a compromise of the web server exposes the database, and a traffic spike on one starves the other of resources. Virtualization makes it easy to give each role its own VM while still sharing physical hardware, which keeps roles isolated for security and troubleshooting.",
   "Finally, remember that every role adds services and open ports, which increases the attack surface. Install only the roles and features a server actually needs, remove defaults you do not use, and document what each server is supposed to run. That documentation makes it easy to spot an unexpected service later."
  ],
  "analogy": "Sizing a server for its role is like choosing a vehicle for a job. A courier delivering small parcels all over town needs something nimble that makes many quick trips, like a database doing many small random reads. A moving company needs a large truck with lots of space, like a file server needing capacity. A taxi company does not need bigger cars when demand grows, just more of them, like web servers scaling out. The analogy stops working for infrastructure roles: DNS and DHCP need almost no horsepower at all, yet you still keep a spare because nothing moves without them.",
  "terms": [
   [
    "Server role",
    "The primary function a server provides to clients, such as web, database or file services."
   ],
   [
    "Domain controller",
    "A server running directory services that stores accounts and authenticates users and computers in a domain."
   ],
   [
    "Application server",
    "A server that runs business logic, often sitting between web front ends and databases."
   ],
   [
    "Sizing",
    "Choosing CPU, memory, storage and network capacity to meet a workload's needs plus growth and headroom."
   ],
   [
    "IOPS",
    "Input/output operations per second: a measure of how many read and write operations storage can handle, critical for databases."
   ],
   [
    "Scale out",
    "Adding more servers to share a load, as opposed to scaling up by making one server more powerful."
   ]
  ],
  "example": "A company plans a new inventory system. The web tier runs on two modest VMs behind a load balancer, the application tier gets more CPU, and the database server receives the most memory and a RAID 10 SSD array because baseline data from the old system showed storage latency was the bottleneck.",
  "mistakes": [
   [
    "A slow database always needs more CPU.",
    "Databases are most often limited by memory and storage latency. Check disk queue lengths and memory pressure before adding cores, especially since many databases are licensed per core."
   ],
   [
    "DNS and DHCP are lightweight, so one server is enough.",
    "They use few resources but nearly everything depends on them. Run them redundantly so a single failure does not stop name resolution or addressing."
   ],
   [
    "The most important resource for a file server is CPU.",
    "File servers prioritize storage capacity, reliable disks and network throughput. CPU is rarely the bottleneck."
   ],
   [
    "Putting every role on one large server saves money with no downside.",
    "Combining unrelated roles means one compromise or resource spike affects all of them. Separate roles, often as VMs on shared hardware, to limit the impact."
   ]
  ],
  "tryit": [
   [
    "A small company wants to deploy a public web store and its customer database. To save money, the owner suggests installing both on one physical server in the office. The server has plenty of spare capacity. What would you recommend and why?",
    "Separate the roles, ideally as two VMs on the same host if budget is tight. A compromise of the internet-facing web server should not give direct access to the database, and a traffic spike on the web store should not starve the database of resources."
   ],
   [
    "You are sizing a new mail server for 400 users whose mailboxes grow every year. The vendor's sizing guide gives a starting point. Besides the guide's figures, what two things should you add before ordering hardware?",
    "Expected growth over the server's planned life, since mailboxes keep growing, and headroom so the server does not run near its limits on day one. Storage capacity and memory are the main priorities for mail."
   ]
  ],
  "tip": "When a question asks which resource matters most: databases and virtualization hosts want memory and fast storage, file servers want capacity and network throughput, web servers scale out, and DNS/DHCP want redundancy more than power.",
  "check": [
   [
    "Which server role typically benefits most from high-IOPS storage?",
    "The database server, because it performs many small random reads and writes."
   ],
   [
    "Why run at least two domain controllers?",
    "Authentication depends on them; a second one keeps logons working if the first fails."
   ],
   [
    "What are the main sizing priorities for a file server?",
    "Storage capacity, reliable redundant disks and network throughput."
   ]
  ]
 },
 {
  "t": "High availability: clustering (active-active vs active-passive), heartbeat, quorum, load balancing methods (round robin, least connections), failover and failback",
  "hook": "At 2:14 a.m. your phone buzzes. You are on call for Northgate Logistics, and the monitoring system says the shipping database cluster has failed over. You log in expecting the worst, but the database is answering queries from the second node and the warehouse scanners never stopped. Then you notice something odd: a network technician had unplugged the cable between the two nodes during overnight maintenance. Both servers were healthy and both could have tried to run the database at the same time, writing to the same disks. Why did only one of them take over, and what would have happened if both had?",
  "simple": "High availability means keeping a service running even when a piece of it breaks. One common way is a cluster: two or more servers that watch each other. They send a regular \"I am alive\" signal, called a heartbeat. If one goes quiet, another takes over its work. This is like two lifeguards at a pool: if one has to leave, the other keeps watching. To stop both servers from trying to run the same service at once, the cluster takes a vote, and only the side with the majority keeps running. Another tool is a load balancer, which works like a host at a busy restaurant, sending each new guest to a table so no single waiter gets overwhelmed.",
  "body": [
   "High availability (HA) is designing a service so it keeps running, or recovers within seconds or minutes, when a component fails. Availability is often expressed as a percentage of uptime, such as 99.9 or 99.99 percent, and each extra nine allows much less downtime per year. The main tools are clusters and load balancers, and both depend on removing single points of failure so that no one component can take the whole service down.",
   "A cluster is a group of servers, called nodes, that work together to provide a service. In an active-passive cluster, one node runs the service while the other stands by, ready to take over. If the active node fails, the passive node starts the service and takes over its storage and network identity. This design is simple and gives predictable performance after failover, because the standby is the same size as the active node. The drawback is cost: the standby's capacity sits idle most of the time.",
   "In an active-active cluster, all nodes serve traffic at once, which uses the hardware fully and spreads the load. The catch is capacity planning. If one node fails, the survivors must absorb its load, so each must keep spare capacity. Running two active nodes at 80 percent each means that after a failure one node would need to carry 160 percent, which it cannot do, so performance collapses exactly when you need it most. A safe rule for two active nodes is to keep each below roughly half its capacity, or accept degraded service during a failure.",
   "Nodes monitor each other through a heartbeat, a regular signal sent over the network, often on a dedicated link separate from client traffic. If a node stops sending heartbeats for a set period, the others assume it has failed and start failover. A dangerous situation is split brain: the heartbeat link breaks but both nodes are still running. Each thinks the other is dead, and both try to own the same data and the same service, which can corrupt the data on shared storage.",
   "Quorum prevents split brain. Each node, and often a witness such as a shared disk or a file share, gets a vote, and the cluster keeps running only on the side that holds a majority of the votes. A node that finds itself in the minority stops its clustered services rather than risk a conflict. That is why clusters prefer an odd number of votes and add a witness when there is an even number of nodes. In a two-node cluster with a witness there are three votes, so whichever node can still reach the witness has two of three and keeps running. Cluster logs typically record events such as a node being removed from membership or quorum being lost, which tell you which side won.",
   "Failover is moving a service from a failed or unhealthy node to a healthy one. It can happen automatically when the cluster detects a failure, or manually when an administrator moves services to patch a node. Failback is moving the service back to the original node once that node has been repaired. Failback can also be automatic or manual. Many administrators prefer manual or scheduled failback so the service does not move twice during business hours, causing two interruptions, and does not bounce back to a node that is still unstable.",
   "A load balancer distributes client requests across a pool of servers and uses health checks to stop sending traffic to servers that fail. Round robin sends each new request to the next server in turn, which is simple and works well when servers and requests are similar. Weighted round robin sends proportionally more requests to stronger servers. Least connections sends each new request to the server with the fewest active connections, which handles long-lived or uneven sessions better, because it reacts to how busy each server actually is. Some applications need session persistence, also called sticky sessions, so a user keeps reaching the same server that holds their session data.",
   "Do not forget the load balancer itself. A single load balancer in front of a pool of servers is a single point of failure, so load balancers are usually deployed in pairs, often as an active-passive pair sharing a virtual IP address. The same thinking applies to everything in the path: redundant switches, power and storage support the cluster and load balancer above them."
  ],
  "analogy": "Quorum works like a committee that can only make decisions when a majority of members are present. If the committee splits into two rooms after a power outage, only the room with more than half the members may vote; the other room must wait. A witness is like an extra committee member whose only job is to break ties. Where the analogy stops: a cluster node in the minority does not just wait politely, it actively stops its services so it cannot write to shared data.",
  "terms": [
   [
    "Active-passive cluster",
    "A cluster in which one node serves while another waits to take over on failure."
   ],
   [
    "Active-active cluster",
    "A cluster in which all nodes serve traffic at the same time, requiring spare capacity to absorb a failed node's load."
   ],
   [
    "Heartbeat",
    "A periodic signal nodes exchange to confirm each other is alive."
   ],
   [
    "Quorum",
    "The majority vote a cluster requires to keep running, preventing split brain."
   ],
   [
    "Split brain",
    "A failure in which cluster nodes lose contact but keep running, and each tries to own the same service and data."
   ],
   [
    "Least connections",
    "A load-balancing method that sends new requests to the server with the fewest active connections."
   ]
  ],
  "example": "A two-node SQL cluster loses its heartbeat network. Because a file share witness gives the cluster three votes, the node that can still reach the witness keeps quorum and runs the database, while the isolated node stops its services, avoiding split brain.",
  "mistakes": [
   [
    "Active-active is always better because no hardware sits idle.",
    "Active-active nodes must keep enough spare capacity to absorb a failed partner's load. Two nodes each running at 80 percent cannot survive a failure without severe slowdowns."
   ],
   [
    "A witness adds capacity or acts as a backup node.",
    "A witness only provides a tie-breaking vote for quorum. It does not run the service."
   ],
   [
    "Failback should always be automatic so the service returns home quickly.",
    "Automatic failback can cause a second interruption during business hours or move the service back to a node that is still unstable. Many teams choose manual or scheduled failback."
   ],
   [
    "Round robin is the best method for any workload.",
    "Round robin assumes similar servers and similar requests. With long or uneven sessions, least connections spreads load more evenly."
   ]
  ],
  "tryit": [
   [
    "An online support chat service runs behind a load balancer using round robin. Some chat sessions last a few seconds and others last an hour. Users report that one server is overloaded while others are nearly idle. What change would you make?",
    "Switch to least connections. Round robin hands out new sessions evenly by count, not by how busy each server is, so long-lived chats pile up on some servers. Least connections sends new sessions to the server with the fewest active connections."
   ],
   [
    "Your two-node file server cluster has no witness configured. A network switch between the nodes fails, so they lose contact while both remain powered on. What risk does this create, and how would you prevent it in the future?",
    "Without a tie-breaker, neither node can establish a clear majority, so the cluster may stop entirely or risk split brain depending on its settings. Adding a disk or file share witness gives three votes so the node that can reach the witness keeps running."
   ]
  ],
  "tip": "Quorum and witnesses exist to prevent split brain. Round robin assumes equal servers and requests; least connections suits uneven or long sessions. Active-active nodes need spare capacity to absorb a failed partner's load.",
  "check": [
   [
    "What is failback?",
    "Returning a service to its original node after that node has been repaired."
   ],
   [
    "Why add a witness to a two-node cluster?",
    "It provides a tie-breaking vote so one side can hold a majority and keep quorum if the nodes lose contact."
   ],
   [
    "Which load-balancing method works best when sessions vary widely in length?",
    "Least connections, because it accounts for how busy each server currently is."
   ],
   [
    "Why are load balancers usually deployed in pairs?",
    "A single load balancer would be a single point of failure for every server behind it."
   ]
  ]
 },
 {
  "t": "Redundancy: NIC teaming, multipathing (MPIO), redundant power and storage, fault tolerance vs high availability",
  "hook": "It is a quiet Saturday at Bayview County Records, and Lena is applying a routine firmware update to one of the two storage switches. The change ticket says the hosts are fully redundant, so nobody expected an impact. Thirty seconds after the switch reboots, her phone erupts: every virtual machine on one host has frozen, and the county's permit portal is down. The other host is fine. Both hosts have two storage network cards, both have dual power supplies, and both passed last year's audit. So how did one switch reboot take down an entire host, and what did the audit miss?",
  "simple": "Redundancy means having a spare for anything that could break, so one failure does not stop everything. Think of a car with a spare tire: a flat is an annoyance, not the end of the trip. Servers get spares too: two network cables, two paths to their storage, two power supplies plugged into different power sources, and extra disks. The tricky part is making sure the spares do not share a weak point. Two power cords plugged into the same power strip are not really redundant, because if the strip fails, both fail. There are also two levels of protection: fault tolerant means users never notice a failure at all, while highly available means there might be a short pause while a backup takes over.",
  "body": [
   "Redundancy means having more than one of a component so that a failure does not stop the service. The goal is to eliminate single points of failure (SPOFs): any one part whose failure takes the whole system down. CompTIA Server+ asks you to spot SPOFs in a described design and to know the specific technologies that remove them, from network links and storage paths to power, cooling and whole sites.",
   "Start with the network. NIC (network interface card) teaming combines two or more network adapters into one logical interface, so if a cable, switch port or card fails, traffic continues on the remaining members without the server changing its IP address. For full protection, connect the team members to two different switches and use ports on different physical cards rather than two ports on the same card, because a failed card would take both ports down at once. A team where both members plug into the same switch survives a cable failure but not a switch failure or reboot.",
   "Storage paths need the same treatment. Multipathing, or MPIO (multipath I/O), gives a server more than one path to its SAN (storage area network) storage: two host bus adapters or iSCSI NICs, two fabric switches, and two storage controllers. The multipath driver presents the LUN (logical unit number, a block of storage presented by the array) as a single disk and either fails over between paths or balances traffic across them, for example with a round robin policy. Without MPIO, the operating system may see the same LUN twice through two paths and treat it as two separate disks, which can cause data corruption. Enable the MPIO feature on Windows or the Linux `multipath` service, and configure the storage vendor's recommended path policy. A command such as `multipath -ll` on Linux lists each LUN with its paths and whether each is active, which is the quickest way to confirm that redundancy actually exists.",
   "Power redundancy comes from dual power supplies in each server, fed from separate PDUs (power distribution units), separate circuits and separate UPS (uninterruptible power supply) units, plus a generator for long outages. Two power supplies plugged into the same PDU only protect against a power supply failure, not a PDU or circuit failure. Storage redundancy comes from RAID, hot spares that rebuild automatically when a disk fails, dual-controller arrays, and replication to another array. Cooling redundancy comes from extra fans in the chassis and extra air-conditioning units in the room. At a higher level, you add redundant servers in clusters, redundant switches and routers, and even redundant sites for disaster recovery.",
   "Fault tolerance and high availability are related but not identical, and the exam likes to test the difference. A fault-tolerant system continues operating with no interruption at all when a component fails; users never notice. RAID 1 losing a drive, a server continuing on its second power supply, or a NIC team losing one member are examples. High availability accepts a brief interruption while the service recovers, such as the seconds or minutes a cluster takes to fail over and restart a service on another node. True fault tolerance at the whole-system level usually costs more because it duplicates everything and keeps the copies in lockstep. Choosing between them depends on how much downtime the business can accept and what it is willing to pay.",
   "Redundancy also has to be checked end to end. Trace each path from the application to the disk and from the server to the wall outlet, and ask at every hop whether there are two of something and whether those two share anything. Common hidden SPOFs include both team members on one switch, both power supplies on one PDU, both HBAs (host bus adapters) cabled to one fabric, and both cluster nodes in one rack on one circuit.",
   "Finally, redundant components must be monitored. A failed power supply, a dead team member or a lost storage path leaves you running without protection, and nothing looks wrong to users. Alerts from the BMC (baseboard management controller), the RAID controller, the multipath driver and the operating system must reach someone who will replace the part promptly, or the server quietly runs unprotected for weeks. Many teams also test redundancy on purpose during a maintenance window, for example by pulling one power cord or disabling one path, to prove that failover works before a real failure does it for them. Without monitoring and testing, the second failure becomes an outage."
  ],
  "analogy": "Redundancy is like a bridge with two lanes in each direction. If one lane is blocked by a stalled car, traffic squeezes into the other and keeps moving; that is fault tolerance. High availability is more like a detour: when the bridge closes, traffic is redirected to a second bridge a few minutes away, with a short delay. The analogy also shows the hidden SPOF problem: two lanes on the same bridge do not help if the whole bridge closes, just as two NICs on one switch do not help when the switch reboots.",
  "terms": [
   [
    "Single point of failure (SPOF)",
    "Any component whose failure alone stops the whole system."
   ],
   [
    "MPIO (multipath I/O)",
    "Software that uses multiple physical paths to the same storage for failover and load balancing, presenting them as one disk."
   ],
   [
    "Fault tolerance",
    "The ability to keep operating with no interruption when a component fails."
   ],
   [
    "High availability",
    "Design that minimizes downtime, allowing a short interruption while failover occurs."
   ],
   [
    "Hot spare",
    "An installed, unused disk that a RAID controller automatically uses to rebuild an array when a disk fails."
   ],
   [
    "PDU",
    "Power distribution unit: a rack-mounted power strip that feeds equipment; redundant designs use two fed from separate sources."
   ]
  ],
  "example": "An audit finds that a virtualization host has two iSCSI NICs, but both connect to the same switch. When that switch is rebooted for an update, every VM loses its storage. The fix is to move one NIC to a second switch and confirm MPIO shows two active paths.",
  "mistakes": [
   [
    "Two NICs or two power supplies automatically mean no single point of failure.",
    "Only if they do not share anything upstream. Two NICs on one switch or two power supplies on one PDU still leave a SPOF."
   ],
   [
    "NIC teaming is the answer for redundant SAN storage paths.",
    "Redundant storage paths are handled by MPIO, which manages multiple paths to the same LUN. NIC teaming is for general network connectivity."
   ],
   [
    "A failover cluster is fault tolerant.",
    "A cluster is highly available: the service is briefly interrupted while it moves to another node. Fault tolerance means no interruption at all."
   ],
   [
    "Once redundancy is installed, the job is done.",
    "Redundant parts must be monitored. A silent failure leaves you unprotected, and the next failure becomes an outage."
   ]
  ],
  "tryit": [
   [
    "You review a rack design for a new database server. It has dual power supplies, both plugged into PDU A, which is fed from UPS A. PDU B, fed from UPS B, is installed in the same rack but unused. What change would you make and why?",
    "Move one power supply to PDU B. With both supplies on PDU A, a PDU, UPS or circuit failure would take down the server despite its dual supplies. Splitting them across independent power paths removes that SPOF."
   ],
   [
    "After connecting a Linux server to a SAN through two HBAs, the administrator sees two new disks of identical size instead of one. Applications have not been configured yet. What should be done before using the storage?",
    "Enable and configure multipathing (the `multipath` service with the vendor's recommended policy) so the two paths are presented as a single device. Using the two raw devices separately could corrupt data."
   ]
  ],
  "tip": "Fault tolerant means zero interruption; highly available means a brief interruption during failover. MPIO is the answer for redundant storage paths, NIC teaming for redundant network links. Always look for a shared upstream component.",
  "check": [
   [
    "What can happen if a server sees a SAN LUN through two paths without MPIO?",
    "The OS may treat the LUN as two separate disks, risking data corruption."
   ],
   [
    "Is a two-node failover cluster fault tolerant or highly available?",
    "Highly available, because the service is briefly interrupted while it fails over."
   ],
   [
    "Why should NIC team members connect to different switches?",
    "So a switch failure or reboot does not disconnect every team member at once."
   ]
  ]
 },
 {
  "t": "Virtualization: Type 1 vs Type 2 hypervisors, host vs guest, resource allocation and overcommitment, virtual switches and NICs, snapshots, templates, VM migration",
  "hook": "Tuesday afternoon at Riverside Community College, the help desk forwards a ticket to Omar: the student records system has been crawling for weeks, and now registration opens tomorrow. The VM looks fine at first glance. It has plenty of virtual CPUs and memory assigned. Then he opens the hypervisor console and finds two surprises. The host has far more memory promised to its VMs than it physically contains, and the records VM is carrying a snapshot someone took five months ago before an upgrade, quietly growing a delta file ever since. Which of these is slowing everything down, and how can he fix it without an outage the night before registration?",
  "simple": "Virtualization lets one physical computer pretend to be many separate computers. Special software called a hypervisor splits up the real processor, memory, disk and network and hands a share to each pretend computer, called a virtual machine. It is like an apartment building: one building (the host) holds many apartments (the guests), each with its own locked door, but they share the same foundation, plumbing and power. You can promise more space than you have, betting that not everyone uses all of theirs at once, but if they do, things get slow. You can take a quick snapshot to undo changes, and you can even move a running virtual machine to another building without the tenants noticing.",
  "body": [
   "Virtualization runs many independent virtual machines (VMs) on one physical server. It raises hardware utilization, speeds up provisioning, and makes it easy to move or recover workloads. The software that makes this possible is the hypervisor, which shares the physical CPU, memory, storage and network among the VMs while keeping them isolated from one another.",
   "Hypervisors come in two types. A Type 1 hypervisor, also called bare metal, installs directly on the hardware and runs VMs with minimal overhead. Examples include VMware ESXi, Microsoft Hyper-V and KVM (Kernel-based Virtual Machine) on Linux. This is what production data centers use. A Type 2 hypervisor, also called hosted, runs as an application on top of a normal operating system, such as VirtualBox or VMware Workstation on a laptop. It is convenient for labs, testing and training, but it adds overhead and depends on the host OS, so a crash or reboot of that OS takes every VM with it. The physical machine is the host; each VM is a guest running its own guest operating system. Hypervisors need CPU virtualization extensions, Intel VT-x or AMD-V, enabled in the system firmware; if VM creation fails on new hardware, check that setting first.",
   "Resource allocation assigns each VM virtual CPUs (vCPUs), memory, virtual disks and network adapters. Overcommitment means allocating more virtual resources than physically exist, relying on the fact that VMs rarely all use their full share at the same moment. CPU overcommitment is common and generally safe in moderation. Too much causes high CPU ready time, a metric showing how long VMs wait for a physical core to become free, and the result is sluggish VMs even though each one appears to have spare CPU. Giving a VM more vCPUs than it needs can make this worse, because it must wait for more cores to be available.",
   "Memory overcommitment is riskier. When the host runs out of physical memory, it reclaims memory using techniques such as ballooning, where a driver inside the guest is asked to give memory back, and swapping VM memory to disk. Disk is far slower than RAM, so swapping slows VMs dramatically. Storage can also be overcommitted. Thin provisioning creates a virtual disk that only consumes the space actually written, which saves capacity, but you must monitor datastores so they do not fill up, because a full datastore can pause every VM stored on it. Thick provisioning reserves the full size up front, which costs more space but avoids that surprise.",
   "Networking is virtual too. Each VM has one or more virtual NICs (vNICs) connected to a virtual switch inside the host. The virtual switch connects to the physical NICs, called uplinks, for external traffic. On Hyper-V, a virtual switch can be external (reaches the physical network), internal (host and VMs only) or private (VMs only), and other platforms offer similar choices. Port groups or VLAN settings on the virtual switch tag traffic onto the right VLANs, so the physical switch port connected to the uplinks must be a trunk allowing those VLANs.",
   "A snapshot captures a VM's disk state, and optionally its memory, at a point in time so you can roll back, for example before a risky update. Snapshots work by freezing the original disk and writing all new changes to delta files. Those delta files grow over time and every read may have to check them, which degrades performance, and very old snapshots can take a long time to consolidate. Delete snapshots once they are no longer needed, and never treat a snapshot as a backup: it depends on the original disk and lives on the same storage, so if that storage fails, the snapshot is lost too. A template, by contrast, is a master VM image used to deploy new, consistent VMs quickly, usually generalized and marked so it cannot be powered on by accident.",
   "VM migration moves a VM between hosts. Live migration, called vMotion in VMware and Live Migration in Hyper-V, moves a running VM with no noticeable downtime by copying its memory to the destination host while it keeps running, then switching over in a brief final step. It usually requires shared storage that both hosts can reach (or a storage migration that moves the disks as well), compatible CPUs on both hosts, and a fast migration network. Cold migration moves a powered-off VM and has fewer requirements. Migration is what makes host maintenance possible without outages: you evacuate a host, patch and reboot it, then move the VMs back."
  ],
  "analogy": "Memory overcommitment is like an airline overbooking a flight. Most days some passengers do not show up, so selling a few extra tickets works fine and keeps the plane full. On the day everyone shows up, someone gets bumped, which for a VM means its memory is swapped to slow disk. CPU overcommitment is gentler, more like passengers taking turns at a busy check-in desk: there is waiting, but everyone eventually gets served. The analogy stops working in one way: a VM is never refused entirely; it just slows down.",
  "terms": [
   [
    "Type 1 hypervisor",
    "A bare-metal hypervisor installed directly on hardware, used in production, such as ESXi, Hyper-V or KVM."
   ],
   [
    "Type 2 hypervisor",
    "A hosted hypervisor that runs as an application on a desktop or server operating system, such as VirtualBox."
   ],
   [
    "Overcommitment",
    "Allocating more virtual CPU, memory or storage to VMs than the host physically has."
   ],
   [
    "Snapshot",
    "A point-in-time capture of a VM's state used for short-term rollback, not a backup."
   ],
   [
    "Live migration",
    "Moving a running VM from one host to another without shutting it down."
   ],
   [
    "Thin provisioning",
    "Creating a virtual disk that consumes physical space only as data is written."
   ]
  ],
  "example": "Before patching a host, the administrator live-migrates its twelve VMs to another cluster node, patches and reboots the empty host, then moves them back. She also finds a three-month-old snapshot slowing a file server VM and consolidates it.",
  "mistakes": [
   [
    "A snapshot is a good substitute for a backup.",
    "A snapshot depends on the original disk and lives on the same storage. If that storage fails or the base disk is corrupted, the snapshot is useless. Use real backups stored separately."
   ],
   [
    "Giving a slow VM more vCPUs will always help.",
    "On an overcommitted host, extra vCPUs can increase CPU ready time because the VM must wait for more physical cores to be free. Check ready time before adding vCPUs."
   ],
   [
    "Hyper-V and ESXi are Type 2 because you manage them from a desktop console.",
    "Both install directly on the hardware and are Type 1. Type 2 hypervisors such as VirtualBox run as applications on a host operating system."
   ],
   [
    "Thin provisioning gives you free storage.",
    "Thin disks grow as data is written. If the datastore fills, VMs on it can pause or fail, so capacity must be monitored."
   ]
  ],
  "tryit": [
   [
    "Several VMs on one host became very slow at the same time this morning. Monitoring shows the host's physical memory is fully used and the hypervisor is swapping VM memory to disk. CPU use on the host is moderate. What is the most likely cause, and what are two ways to fix it?",
    "Memory overcommitment has reached the point where the host must swap. Fix it by live-migrating some VMs to a host with free memory, reducing memory assigned to oversized VMs, or adding physical memory to the host."
   ],
   [
    "You need to apply firmware updates to a virtualization host that runs fifteen production VMs. The cluster has shared storage and a second host with enough spare capacity. How do you avoid downtime?",
    "Live-migrate all fifteen VMs to the second host, place the first host in maintenance mode, apply the firmware and reboot, then migrate the VMs back. Shared storage and compatible CPUs make live migration possible."
   ]
  ],
  "tip": "Type 1 runs on bare metal and is used in data centers; Type 2 runs on a host OS. Snapshots are for short-term rollback and hurt performance if kept; they are never a substitute for backups. Memory overcommitment is riskier than CPU overcommitment.",
  "check": [
   [
    "Which hypervisor type runs as an application on a desktop OS?",
    "Type 2 (hosted), such as VirtualBox."
   ],
   [
    "What risk comes with thin provisioning?",
    "Datastores can fill up unexpectedly as disks grow, which can pause or crash VMs."
   ],
   [
    "Why is memory overcommitment riskier than CPU overcommitment?",
    "When physical memory runs out, the host must balloon or swap to disk, which severely slows VMs."
   ],
   [
    "What firmware setting must be enabled for a hypervisor to run VMs?",
    "CPU virtualization extensions, Intel VT-x or AMD-V."
   ]
  ]
 },
 {
  "t": "Cloud models: IaaS, PaaS, SaaS; public, private, hybrid; on-premises vs cloud-hosted servers",
  "hook": "The quarterly security review at Maplewood Insurance is going badly. The auditor, Ms. Chen, points at a finding on the screen: a cloud-hosted virtual machine running the claims portal is three months behind on operating system patches. Jordan, who manages the servers, protests that the company moved that workload to the cloud precisely so the provider would handle that kind of thing. Ms. Chen asks a simple question: which cloud service model did you buy, and what does the contract say you are responsible for? Jordan opens his mouth to answer and realizes he is not sure. Who was actually supposed to patch that server?",
  "simple": "Cloud computing means renting computing power from someone else over the internet instead of owning all the equipment yourself. There are three main ways to rent. With IaaS, you rent the bare machine and do everything else yourself, like renting an empty apartment and bringing your own furniture. With PaaS, the basics are handled for you and you just bring your own work, like a furnished apartment. With SaaS, you just use a finished service, like staying in a hotel. Clouds can also be public (shared by many customers), private (just for one organization), or hybrid (a mix of your own equipment and a public cloud). No matter which you choose, you are always responsible for your own data and who can get to it.",
  "body": [
   "Cloud computing delivers computing resources on demand over a network, with self-service provisioning, elastic scaling that grows and shrinks with demand, and pay-as-you-go billing. CompTIA Server+ administrators need to know which service model shifts which responsibilities to a provider, and which deployment model suits a given organization. Many exam questions come down to a single question: who manages this layer?",
   "The service models describe how much the provider manages. In IaaS (Infrastructure as a Service), the provider supplies virtual machines, storage and networks; you install and manage the operating system, patches, middleware and applications. It is the closest to running your own servers and gives the most control, which also means the most work. In PaaS (Platform as a Service), the provider also manages the operating system and the runtime, such as the web server, language environment or database engine, and you deploy your code or databases onto that managed platform. You no longer patch servers, but you also cannot change the underlying OS. In SaaS (Software as a Service), the provider runs the entire application and you simply use it through a browser or client, such as hosted email or a CRM (customer relationship management) system. You manage only your data, your users and the application's settings.",
   "This split is called the shared responsibility model. The provider always secures the physical data centers, the hardware and the virtualization layer underneath. As you move from IaaS to PaaS to SaaS, more layers shift to the provider. You, the customer, always remain responsible for your data, your user accounts and access control, no matter which model you choose. Many cloud security incidents come from customers misconfiguring the parts they own, such as leaving a storage bucket publicly readable, using weak administrator passwords, or never patching an IaaS virtual machine because they assumed the provider would.",
   "The deployment models describe who uses the infrastructure and where it lives. A public cloud is owned and operated by a provider and shared by many customers, called tenants, who are isolated from each other logically rather than physically. It offers enormous scale and no hardware to buy. A private cloud is dedicated to one organization, either built in its own data center or hosted by a provider on dedicated equipment. It gives more control and can make compliance easier, at a higher cost. A hybrid cloud connects private or on-premises resources with public cloud services so workloads and data can move between them, for example keeping a sensitive database on-premises while bursting web servers into the public cloud during seasonal peaks. A community cloud is shared by several organizations with common requirements, such as government agencies or research institutions.",
   "On-premises servers run in your own facility. You buy the hardware up front, a capital expense (CapEx), and you control everything. You are also responsible for power, cooling, physical security, hardware replacement and eventual disposal. Cloud-hosted servers are rented, an operational expense (OpEx), scale quickly, and shift hardware care to the provider. They come with their own trade-offs: costs can grow quietly if instances are left running or oversized, performance depends on network connectivity to the provider, and the physical location of data may matter for regulations.",
   "Many organizations choose based on the workload. Steady, predictable or heavily regulated workloads often stay on-premises, where costs are known and data location is under direct control. Variable, seasonal or brand-new workloads often go to the cloud, where you can start small and scale without buying hardware you might not need. Most organizations end up with a mix, which is why hybrid designs and secure connections between sites and clouds are so common. Those connections are usually a site-to-site VPN (virtual private network) or a dedicated private link to the provider, and they become critical infrastructure in their own right: if the link fails, a hybrid application split across both sides may stop working, so plan redundancy for it like any other network path.",
   "As a server administrator working in the cloud, your IaaS skills carry over directly. You still size instances for their role, harden operating systems, apply patches, configure host firewalls, back up data, and monitor performance and logs. The console looks different, and you provision servers with a few clicks or a template instead of racking hardware, but the responsibilities for everything above the hypervisor remain yours."
  ],
  "analogy": "The service models work like ways of getting a meal. IaaS is renting a commercial kitchen: the building and appliances are provided, but you buy ingredients, cook and clean up. PaaS is a meal kit: the ingredients arrive prepared and measured, and you just assemble and cook. SaaS is ordering at a restaurant: you only choose and eat. Where it stops working: in every model, you still decide who gets to eat with you, just as you always manage your own data and user access in the cloud.",
  "terms": [
   [
    "IaaS",
    "Infrastructure as a Service: rented VMs, storage and networks where the customer manages the OS and above."
   ],
   [
    "PaaS",
    "Platform as a Service: a managed runtime where the customer deploys code without managing servers."
   ],
   [
    "SaaS",
    "Software as a Service: a complete application run by the provider and used by the customer."
   ],
   [
    "Shared responsibility model",
    "The division of security and management duties between a cloud provider and its customer, which changes by service model."
   ],
   [
    "Hybrid cloud",
    "A combination of on-premises or private resources and public cloud services that work together."
   ],
   [
    "CapEx vs OpEx",
    "Capital expense is buying assets up front, typical of on-premises servers; operational expense is ongoing payment, typical of cloud services."
   ]
  ],
  "example": "A retailer moves email to a SaaS provider, runs its custom web app on a PaaS platform so developers no longer patch servers, and keeps its payment database on-premises. Connecting the on-premises database with the cloud-hosted app makes the environment a hybrid cloud.",
  "mistakes": [
   [
    "Moving a server to the cloud means the provider patches it.",
    "In IaaS, the customer still patches and secures the guest operating system and everything above it. Only PaaS and SaaS shift OS patching to the provider."
   ],
   [
    "With SaaS, the provider is responsible for everything, including your data and accounts.",
    "The customer always remains responsible for its data, user accounts and access control, in every service model."
   ],
   [
    "A private cloud must be in your own building.",
    "A private cloud is dedicated to one organization, but it can be hosted by a provider on dedicated equipment."
   ],
   [
    "Using any cloud service makes a company hybrid.",
    "Hybrid means on-premises or private resources and public cloud services are connected and used together, not just that both exist."
   ]
  ],
  "tryit": [
   [
    "A development team wants to deploy a web application without managing servers or applying operating system patches, but they want to write and control their own code. Which service model fits, and what will they still be responsible for?",
    "PaaS. The provider manages the OS and runtime, while the team deploys and maintains its code, its data, its user access and the application's configuration."
   ],
   [
    "A hospital must keep patient records under its direct physical control for regulatory reasons, but its public website traffic triples during flu season. It wants to avoid buying servers that sit idle most of the year. Which deployment model fits?",
    "Hybrid cloud. Keep the patient records on-premises or in a private cloud, and run the public website in a public cloud where it can scale up for flu season and back down afterward."
   ]
  ],
  "tip": "Ask who patches the OS: you do in IaaS, the provider does in PaaS and SaaS. The customer is always responsible for data and user access regardless of model. On-premises is CapEx; cloud is usually OpEx.",
  "check": [
   [
    "In which service model do you still patch the guest operating system?",
    "IaaS, because the provider supplies only infrastructure."
   ],
   [
    "What makes a cloud deployment hybrid?",
    "It combines on-premises or private cloud resources with public cloud services that are connected and used together."
   ],
   [
    "What remains the customer's responsibility in every cloud service model?",
    "Its data, user accounts and access control."
   ]
  ]
 },
 {
  "t": "Scripting basics: Bash, PowerShell, batch, Python; variables, loops, conditionals, comparators; common uses (user setup, log checks, scheduled tasks)",
  "hook": "Every Monday at Elmwood Public Library, Sam spends the first two hours of the week doing the same chores: creating accounts for new staff from an emailed spreadsheet, scrolling through the web server's error log, and checking whether any disk is close to full. Last month he missed a nearly full log volume, and the catalog server stopped accepting new records on Tuesday afternoon. His manager forwards him a short script a colleague wrote and asks whether it would solve the disk problem. Sam stares at the lines of text: dollar signs, square brackets, something called `-gt`. Which language is this, what does it actually do, and could he trust it to run every morning on its own?",
  "simple": "A script is a list of instructions for the computer, saved in a file, so you can run the same job again and again without typing every step. It is like a recipe card: once it is written, anyone can follow it and get the same result. Scripts use a few simple building blocks. A variable is a labeled box that holds a value, such as a number or a name. A conditional is an \"if this, then that\" decision. A loop repeats a step, such as \"for each new employee, create an account.\" Comparators test things, like \"is disk usage greater than 90?\" Different scripting languages write these ideas in slightly different ways, the way recipes can be written in different languages.",
  "body": [
   "Scripting turns repetitive administrative work into a file of commands you can run again and again, the same way each time. That consistency is the real benefit: a script does not get tired, skip a step, or mistype a name on the fortieth account. CompTIA Server+ does not expect you to be a programmer, but you should be able to read a short script, recognize its language from clues in the text, and say what it does.",
   "Four languages appear on the exam. Bash is the standard shell on Linux; scripts usually end in `.sh` and start with a shebang line like `#!/bin/bash`, which tells the system which interpreter runs the file. PowerShell is Microsoft's object-based shell for Windows, also available on Linux, with scripts ending in `.ps1` and commands, called cmdlets, in verb-noun form such as `Get-Service` or `New-LocalUser`. Because PowerShell passes objects rather than plain text between commands, you can work with properties such as a service's status directly. Batch files (`.bat` or `.cmd`) are the older Windows command prompt scripts and are still found in legacy logon scripts. Python is a general-purpose language (`.py`) used on every platform for automation and is known for using indentation to group code. Each has the same basic building blocks.",
   "A variable stores a value for later use. In Bash you write `name=value` with no spaces around the equals sign and read it with `$name`. In PowerShell, both setting and reading use a dollar sign, as in `$name = 'value'`. In batch, you write `set name=value` and read it with `%name%`. In Python, you simply write `name = 'value'` and refer to it as `name`. Conditionals choose what to do: `if`, `else`, and either `elif` (Bash and Python) or `elseif` (PowerShell). Loops repeat work: a `for` loop runs once per item in a list, such as each user in a file, and a `while` loop runs as long as a condition stays true, such as waiting until a service starts.",
   "Comparators test values, and they are a favorite exam trap. Bash uses `-eq`, `-ne`, `-gt` and `-lt` for numbers and `==` or `!=` for strings inside test brackets. PowerShell uses `-eq`, `-ne`, `-gt`, `-lt`, `-like` and `-match`, because in shells the `>` symbol means redirect output to a file. Python uses `==`, `!=`, `>` and `<`. So `-gt` is shell and PowerShell style, while `>` is Python style. If you see `>` inside a PowerShell comparison, the script is probably writing to a file named after the number rather than comparing anything.",
   "The first example below is a Bash script that checks disk usage. It stores the root file system's usage percentage in a variable, using `df` and a pipeline to strip everything except the digits, then uses a conditional with the `-gt` comparator to print a warning above 90 percent.",
   "```bash\n#!/bin/bash\n# Warn if root file system usage is above 90 percent\nusage=$(df / --output=pcent | tail -1 | tr -dc '0-9')\nif [ \"$usage\" -gt 90 ]; then\n  echo \"Disk usage is ${usage}%\"\nfi\n```",
   "The second example is PowerShell. It imports a CSV (comma-separated values) file into a variable, then uses a `foreach` loop to create a local user for each row. Notice the dollar-sign variables, the verb-noun cmdlets, and the way `$u.Name` reads a property of each object.",
   "```powershell\n# Create users from a CSV file\n$users = Import-Csv users.csv\nforeach ($u in $users) {\n  New-LocalUser -Name $u.Name -NoPassword\n}\n```",
   "Common uses include creating user accounts in bulk from a list, checking logs for errors and emailing a summary, monitoring disk space, rotating or archiving old files, collecting hardware and software inventory, and restarting a service that has stopped. Scripts are often run on a schedule. On Linux, `cron` runs them; each crontab line gives five time fields, minute, hour, day of month, month and day of week, followed by the command. On Windows, Task Scheduler runs them at set times or in response to events such as startup or logon.",
   "Write scripts safely, because a script runs with the permissions of whoever runs it and makes mistakes at machine speed. Test in a lab first, add comments explaining what each section does, and avoid hard-coding passwords; use a secure credential store instead. Run with the least privilege needed, and keep scripts in version control so every change is tracked and can be reversed. PowerShell's execution policy controls whether scripts can run on a system, and digitally signed scripts give extra assurance that a script has not been altered."
  ],
  "analogy": "A script is like the instructions you leave for a house sitter. Variables are the sticky notes with key facts (the alarm code is stored safely, the dog's name is Biscuit). Conditionals are the if-then notes (if it rains, close the windows). Loops are the repeating chores (for each plant, water it). Where the analogy stops: a house sitter uses judgment when instructions are unclear, but a script follows them exactly, even when they are wrong, which is why testing matters.",
  "mnemonic": "For the five cron time fields in order, remember \"My Hamster Drinks Many Drops\": Minute, Hour, Day of month, Month, Day of week.",
  "terms": [
   [
    "Variable",
    "A named storage location for a value that a script can read and change."
   ],
   [
    "Loop",
    "A structure that repeats commands, such as for (per item) or while (until a condition changes)."
   ],
   [
    "Conditional",
    "A structure such as if, else and elif or elseif that chooses which commands run based on a test."
   ],
   [
    "Comparator",
    "An operator that compares values, such as -eq or -gt in shells and == or > in Python."
   ],
   [
    "Shebang",
    "The first line of a Linux script, such as #!/bin/bash, that names the interpreter to run it."
   ],
   [
    "cron",
    "The Linux scheduler that runs commands at set times defined in a crontab."
   ]
  ],
  "example": "Every morning at 6:00, a cron job runs a Bash script that searches the previous day's web server log for HTTP 500 errors, counts them, and sends the count to the operations channel so the team sees problems before users call.",
  "mistakes": [
   [
    "PowerShell compares numbers with > and <, just like Python.",
    "In PowerShell and Bash, > means redirection. PowerShell uses -gt and -lt; Python uses > and <."
   ],
   [
    "A variable that starts with $ must be Bash.",
    "PowerShell also uses $ for variables. Look for other clues: verb-noun cmdlets and -eq style operators mean PowerShell; a shebang and [ ] tests mean Bash."
   ],
   [
    "%name% is how Bash reads a variable.",
    "Percent signs around a name are batch syntax. Bash reads variables with $name."
   ],
   [
    "It is fine to put the administrator password in the script so it can run unattended.",
    "Hard-coded passwords can be read by anyone with access to the file or the repository. Use a secure credential store and least privilege."
   ]
  ],
  "tryit": [
   [
    "A colleague hands you a script that begins with #!/bin/bash and contains the line if [ $count -gt 100 ]; then. You need it to run every night at 1:30 a.m. on a Linux server. What language is it, and how would you schedule it?",
    "It is Bash, identified by the shebang and the [ ] test with -gt. Schedule it with a crontab entry whose minute field is 30 and hour field is 1, with asterisks for day of month, month and day of week, followed by the script path."
   ],
   [
    "You are reviewing a script that contains $services = Get-Service and a line if ($s.Status -eq 'Stopped'). Another administrator says it is Python. Are they right, and what does the conditional check?",
    "No, it is PowerShell: the verb-noun cmdlet Get-Service, the $ variables and the -eq comparator are PowerShell clues. The conditional checks whether a service's Status property equals Stopped."
   ]
  ],
  "tip": "Identify the language from clues: $ variables with -eq and cmdlets like Get-Item mean PowerShell; shebang and [ ] tests mean Bash; %var% means batch; indentation with == means Python. cron schedules on Linux, Task Scheduler on Windows.",
  "check": [
   [
    "Which comparator would a Bash script use to test whether a number is greater than 90?",
    "-gt, as in [ \"$usage\" -gt 90 ]."
   ],
   [
    "What Windows tool schedules a PowerShell script to run nightly?",
    "Task Scheduler."
   ],
   [
    "What file extension and syntax mark a batch file variable?",
    "Batch files end in .bat or .cmd, and variables are read with percent signs, as in %name%."
   ],
   [
    "List the five time fields of a crontab entry in order.",
    "Minute, hour, day of month, month, day of week."
   ]
  ]
 },
 {
  "t": "Asset management and documentation: labeling, inventory, warranty, life-cycle, baselines, diagrams, change management, SLAs, secure storage of documents",
  "hook": "It is 3:10 a.m. at Summit Ridge Hospital, and Tasha on the night shift is standing in front of a rack of identical gray servers. The patient monitoring dashboard is down, the monitoring alert names a server called APP-07, and not one of the machines in front of her has a label. The network diagram on the shared drive shows a layout that was replaced last spring, and the shared drive itself is on the storage array that just failed. She does not know which box to touch, whether it is still under warranty, or who changed what last week. What should have been in place long before tonight?",
  "simple": "Asset management and documentation are about knowing exactly what equipment you have, where it is, how it is set up, and how it is allowed to change. Think of it like keeping careful records for a car: the title and serial number, the warranty papers, the service history, and notes on what is normal for it. For servers, you put labels on every machine and cable, keep a list of every device with its details, track warranties, and record a picture of normal so you can spot problems. You draw maps of how things connect. Any change goes through an approval process with a plan to undo it. And because these records contain secrets, you keep them locked up but still reachable during an emergency.",
  "body": [
   "Good documentation is what lets someone else, or you at 3 a.m., understand, fix and change a server environment safely. Asset management keeps track of what you own, where it is and where it is in its life. CompTIA Server+ treats both as core administrative duties, not paperwork to do when there is time, because almost every outage is shorter when the records are accurate.",
   "Labeling comes first. Label every server, drive bay, cable end, PDU (power distribution unit) and switch port with a consistent naming scheme, so the name on the monitoring alert matches the name on the front of the box. Physically tag each asset with an asset number or barcode. The label is what connects the physical device to its record. An inventory, often kept in an asset management system or a CMDB (configuration management database), records each asset's make, model, serial number, location (data center, rack and U position), owner, purchase date, configuration, and relationships to other systems, such as which applications run on it and which storage it depends on.",
   "Track warranty and support contracts alongside the inventory: start and end dates, the response level (such as next business day or four-hour on-site), and how to open a case, including the contract or entitlement number the vendor will ask for. Knowing a server is out of warranty before it fails changes whether you buy a part or replace the machine, and it lets you budget instead of scrambling.",
   "Every asset also has a life-cycle. It runs from procurement, through deployment, operation, maintenance and upgrades, to decommissioning and disposal. Planning refresh cycles avoids running critical services on unsupported hardware or on software past its end of life, when security patches stop. Decommissioning should include removing the asset from monitoring, DNS and the CMDB, and sanitizing or destroying its storage before disposal.",
   "A baseline is a recorded snapshot of normal, and there are two kinds. A configuration baseline is the approved standard set of settings for a type of server: installed roles, services, security settings and patch level. Comparing a server against it detects drift and unauthorized changes. A performance baseline records typical CPU, memory, disk and network use over time, including normal busy periods. Without one, you cannot say whether 70 percent CPU at 10 a.m. is a problem or just Tuesday.",
   "Diagrams show how things fit together. Physical diagrams include rack elevations, showing which device sits in which U, and cabling maps showing which port connects to which. Logical diagrams show networks, IP addressing, VLANs (virtual local area networks), and how applications depend on each other. Keep diagrams current and dated, because an outdated diagram is worse than none during an outage: it sends people to the wrong place with confidence.",
   "Change management is the formal process for making changes with control. A change request describes what will change, why, the risk and impact, the implementation steps, the test plan, and a rollback plan for undoing it if something goes wrong. A change advisory board (CAB) or designated approver reviews it. The change is scheduled in an approved maintenance window, implemented, verified, and documented, and the CMDB and diagrams are updated. Emergency changes follow a faster approval path but are still recorded and reviewed afterward. This process prevents surprise outages, lets teams spot conflicting changes, and gives auditors a trail of who changed what and when.",
   "An SLA (service level agreement) is a documented commitment between a service provider and a customer, such as 99.9 percent uptime or a four-hour response time, often with penalties or credits if it is missed. Internal teams may use OLAs (operational level agreements) with each other, such as the storage team agreeing to respond to the server team within a set time, which helps the organization meet its external SLAs.",
   "Finally, protect the documentation itself. It often contains sensitive details: IP address plans, firewall rules, network layouts and sometimes credentials. Store it securely with access controls, encrypt it, keep passwords in a password vault rather than in documents, keep version history so you can see what changed, and make sure an offline or off-site copy exists so the documentation is available during a major outage, even if the systems that normally store it are down."
  ],
  "analogy": "A CMDB with good labels is like a library catalog with call numbers on every book spine. The catalog tells you what the library owns, where it sits and how it relates to other books, and the spine label lets you match the shelf to the record. Change management is the checkout desk: nothing leaves or changes without being recorded. Where the analogy stops: books do not drift on their own, but server configurations do, which is why you also need a configuration baseline to compare against.",
  "terms": [
   [
    "CMDB",
    "Configuration management database: a record of IT assets, their configuration and relationships."
   ],
   [
    "Baseline",
    "A documented standard configuration or normal performance level used for comparison."
   ],
   [
    "Change management",
    "A controlled process to request, approve, schedule, implement and document changes with rollback plans."
   ],
   [
    "Rollback plan",
    "The documented steps to undo a change and return to the previous working state if the change fails."
   ],
   [
    "SLA",
    "Service level agreement: a formal commitment on service performance such as uptime or response time."
   ],
   [
    "Rack elevation",
    "A diagram showing which device occupies each rack unit position in a rack."
   ]
  ],
  "example": "A drive fails in a storage array. Because the asset record lists the serial number, rack position and a four-hour on-site warranty, the technician opens a case in minutes, and the replacement is logged in the CMDB against the same asset tag.",
  "mistakes": [
   [
    "Emergency changes skip change management entirely.",
    "Emergency changes follow a faster approval path, but they are still documented and reviewed afterward."
   ],
   [
    "A baseline is only about performance numbers.",
    "There are configuration baselines (approved settings, used to detect drift) and performance baselines (normal resource use, used to spot abnormal behavior)."
   ],
   [
    "Storing documentation on the main file server is enough.",
    "If that server or its storage fails, the documentation is unavailable when you need it most. Keep a secure offline or off-site copy."
   ],
   [
    "Keeping admin passwords in the network documentation makes recovery faster, so it is good practice.",
    "Passwords belong in a password vault with access control and auditing, not in documents that many people can read or copy."
   ]
  ],
  "tryit": [
   [
    "An administrator wants to update the firmware on a production database server on Thursday afternoon. She has tested it in the lab and is confident. She plans to email the team afterward. What is missing from her plan?",
    "A formal change request with risk assessment, implementation and test steps, and a rollback plan, approved by the CAB or approver and scheduled in a maintenance window rather than during business hours. The CMDB should be updated afterward."
   ],
   [
    "A web server's CPU use is at 65 percent this morning, and a manager asks whether that is a problem. The team has no historical monitoring data for this server. What should they say, and what should they set up?",
    "They cannot tell without a performance baseline, because they do not know what normal looks like for that server at that time. They should start collecting performance data over time, including busy periods, so future readings can be compared with the baseline."
   ]
  ],
  "tip": "Changes need a documented request, approval, a maintenance window and a rollback plan. A baseline is what you compare against to tell whether current behavior is abnormal. Keep an offline copy of documentation and keep passwords in a vault.",
  "check": [
   [
    "What must a change request include besides the change itself?",
    "Reason, risk assessment, implementation and test steps, a schedule, and a rollback plan."
   ],
   [
    "Why keep an offline copy of documentation?",
    "So it is available when the systems that store it are down, for example during a disaster."
   ],
   [
    "What is the difference between an SLA and an OLA?",
    "An SLA is a commitment to a customer; an OLA is an agreement between internal teams that supports meeting the SLA."
   ]
  ]
 },
 {
  "t": "Licensing models: per socket, per core, per user, per device/CAL, site, subscription, open source; license compliance and version compatibility",
  "hook": "The purchase order is ready to sign at Cedar Valley Credit Union. Ravi, the infrastructure lead, has found a great deal on a new database server with two processors that have four times as many cores as the old ones, for barely more money. The finance director, Elena, is pleased. Then a letter arrives from the database vendor announcing a routine license review next quarter. Ravi pauses. The hardware is cheap, but the database software is licensed in a way he has not checked in years, and the company runs it in a virtual cluster across three hosts. Could the bargain server end up costing more than every other line in the budget?",
  "simple": "A software license is the set of rules for how you are allowed to use a program and how you pay for it. Different products count in different ways. Some charge for each processor or each processor core inside the server, like paying a delivery fee for each truck or each wheel. Some charge for each person or each device that connects, like a gym that sells memberships per person or per family car. Some charge a flat fee for a whole location. Some charge every month, and you lose access if you stop paying. Open source software lets you see and change the code, but it still has rules. Following these rules is called compliance, and vendors can check.",
  "body": [
   "Software licenses define how you may use a product and how you pay for it. Getting licensing wrong can cost more than the hardware, either through overbuying licenses you never use or through penalties and back payments after a vendor audit. CompTIA Server+ expects you to recognize the common models, pick the right one for a scenario, and understand how hardware and virtualization choices affect what you owe.",
   "Per-socket licensing charges for each physical processor socket in the server, regardless of how many cores each processor has. Under this model, a server with two sockets needs two licenses whether each processor has eight cores or many more. Per-core licensing charges for each physical core instead, often with a minimum number of cores counted per processor or per server, so even a small processor may be billed as if it had more cores. Many modern server operating systems and databases use per-core licensing.",
   "Per-core licensing changes how you buy hardware. Adding a CPU with more cores can raise license costs sharply, so when sizing hardware for core-licensed software, fewer but faster cores can be cheaper overall than many slower ones. Virtualization adds another twist: depending on the vendor's terms, you may need to license all the physical cores of every host a VM could run on, not just the vCPUs (virtual CPUs) assigned to the VM. In a cluster where live migration can move a database VM to any host, that can mean licensing every host in the cluster. Always read the vendor's virtualization rules before designing the cluster.",
   "Per-user and per-device licenses cover who or what accesses the server. A CAL (client access license) is the classic example in the Microsoft world: in addition to licensing the server itself, each user (user CAL) or each device (device CAL) that connects to it needs a CAL. User CALs suit people who use several devices, such as an employee with a laptop, a desktop and a phone. Device CALs suit shared devices used by many people, such as a kiosk, a nurses' station or a shift-work PC. Choose by counting which number is smaller. Some products also offer per-concurrent-user licensing, which counts how many people use the software at the same moment rather than how many people could use it.",
   "Other models simplify or change the payment pattern. A site license covers unlimited use at a location or across an organization for a fixed price, which removes the need to count individual installations. Subscription licensing charges a recurring fee, monthly or yearly, and usually includes updates and support; stop paying and the right to use the software ends. Perpetual licenses, by contrast, let you use a specific version indefinitely after a one-time purchase, with optional paid maintenance if you want updates and support.",
   "Open source software makes its source code available under licenses such as the GPL (GNU General Public License), MIT or Apache licenses. It is often free to use, but it is not free of obligations. Some licenses, such as the GPL, require you to share your modifications under the same license if you distribute the modified software. More permissive licenses, such as MIT, mainly require you to keep the copyright notice. Enterprise Linux distributions and other open source products often sell paid support subscriptions, which is how many organizations get patches, certified builds and help. Read the license terms before building products on open source code.",
   "License compliance means using only what you have paid for and following the terms. Keep records of purchases, license keys and assignments in your asset management system. Track installations with inventory and discovery tools, and reconcile what is installed against what is owned on a regular schedule, not just when an audit letter arrives. Vendors may audit you, and unlicensed use can lead to fines and back payments. Remove software from decommissioned servers so licenses can be reassigned.",
   "Also check version compatibility. A license may cover a specific version only. Downgrade rights, where offered, may let you run an older version under a newer license. Applications are often supported only on certain operating system versions, so upgrading the OS may require new licenses, new CALs that match the new server version, or may break an application that is not certified for it. Check vendor compatibility lists before any upgrade and include licensing in the change request."
  ],
  "analogy": "Per-socket versus per-core licensing is like two parking garages. One charges per car, no matter how many people ride inside: that is per socket. The other charges per seat in the car: that is per core. If you trade a two-seater for a minivan, the first garage's bill stays the same while the second one's jumps. User versus device CALs are like a gym membership per person versus per locker. Where it stops: unlike garages, licensing rules vary by vendor, so you must always read the actual terms.",
  "terms": [
   [
    "Per-socket licensing",
    "A model that charges for each physical processor socket, regardless of core count."
   ],
   [
    "Per-core licensing",
    "A model that charges for each physical processor core, often with per-processor or per-server minimums."
   ],
   [
    "CAL (client access license)",
    "A license that permits a user or device to access server software."
   ],
   [
    "Subscription license",
    "A recurring-fee license that includes updates and ends when payments stop."
   ],
   [
    "Site license",
    "A license allowing unlimited use within a defined location or organization for a set fee."
   ],
   [
    "Downgrade rights",
    "License terms that allow running an earlier version of a product under a license for a newer version."
   ]
  ],
  "example": "A company plans to replace two 8-core CPUs with two 32-core CPUs in its database server. Before ordering, the administrator checks the database's per-core licensing and finds the new CPUs would quadruple the license cost, so they choose a smaller core count with higher clock speed.",
  "mistakes": [
   [
    "Under per-core licensing, you only pay for the vCPUs assigned to a VM.",
    "Depending on the vendor's terms, you may have to license all physical cores on every host the VM could run on. Read the virtualization rules before designing a cluster."
   ],
   [
    "Open source means no license obligations.",
    "Open source licenses have terms, such as sharing modifications on distribution under the GPL or keeping copyright notices under MIT. Support is often sold separately."
   ],
   [
    "User CALs are always the better choice.",
    "User CALs fit people with many devices; device CALs fit devices shared by many people. Count both and pick the smaller number."
   ],
   [
    "A subscription works like a perpetual license once you have paid the first year.",
    "With a subscription, the right to use the software ends when payments stop. A perpetual license lets you keep using the version you bought."
   ]
  ],
  "tryit": [
   [
    "A hospital ward has 12 shared workstations used by 60 nurses across three shifts. Each nurse uses only those workstations to reach the patient records server. Should the hospital buy user CALs or device CALs?",
    "Device CALs. Twelve device CALs cover every workstation, compared with sixty user CALs, and nurses only use the shared devices."
   ],
   [
    "Your team plans to upgrade the operating system on a server that runs a third-party accounting application. The new OS version is free under your agreement. What two things should you check before scheduling the upgrade?",
    "Whether the accounting application is certified and supported on the new OS version, and whether the upgrade requires new CALs or other licenses that match the new server version. Include both in the change request."
   ]
  ],
  "tip": "User CALs fit people with many devices; device CALs fit devices shared by many people. More cores can mean higher costs under per-core licensing, even if the hardware is cheap. Subscriptions end when payment stops; perpetual licenses do not.",
  "check": [
   [
    "A call center has 100 workers sharing 30 PCs across shifts. User or device CALs?",
    "Device CALs, because 30 device licenses cover all the shared PCs, fewer than 100 user licenses."
   ],
   [
    "Does open source mean there are no license obligations?",
    "No. Open source licenses have terms, such as sharing modifications on distribution, and support may be sold separately."
   ],
   [
    "Under per-socket licensing, how many licenses does a two-socket server need if each processor has many cores?",
    "Two, one per socket, regardless of core count."
   ]
  ]
 },
 {
  "t": "Data security: encryption at rest and in transit, data retention, data storage location, UEFI/BIOS passwords, bootloader password",
  "hook": "The courier's call comes in at 4:45 p.m. on a Friday: a box of backup drives from Oakridge Dental Partners, headed for the off-site vault, never arrived. Nadia, the office's IT administrator, feels her stomach drop. Those drives hold patient records, billing data and years of x-ray images. Her manager is already asking whether they have to notify every patient. Nadia opens the backup console and checks one setting, then another: how the backups were stored, where the keys are kept, and who could read them. Whether this weekend becomes a breach response or a routine incident report depends entirely on choices made months ago. What did she need to have done?",
  "simple": "Data security is about keeping information safe wherever it is. When data is sitting on a disk or backup, you lock it with encryption, which scrambles it so only someone with the key can read it, like a diary with a combination lock. When data travels across a network, you send it through an encrypted tunnel, like sending a letter in a sealed, tamper-proof envelope instead of a postcard. You also decide how long to keep data and when to destroy it, and you pay attention to which country it is stored in, because local laws apply. Finally, you lock the server's startup settings with passwords so someone standing in front of it cannot simply restart it and get around the normal security.",
  "body": [
   "Servers hold the data an organization cares about most. Data security protects that data wherever it is: sitting on disk, moving across a network, and during the boot process, when an attacker with physical access might try to bypass the operating system entirely. CompTIA Server+ expects you to match each threat to the right control and to understand the policies that govern how long data lives and where.",
   "Encryption at rest protects stored data so that a stolen drive, a lost backup tape or a copied disk image is unreadable without the key. Options include full-disk or volume encryption, such as BitLocker on Windows and LUKS (Linux Unified Key Setup) on Linux; SEDs (self-encrypting drives), which encrypt in the drive's own hardware; file-level encryption for specific files or folders; and database encryption, such as TDE (transparent data encryption), which encrypts database files without changing the application. Backups should be encrypted as well, since they are copies of everything and often travel off-site.",
   "Encryption is only as strong as its key management. If the key sits next to the data, encryption protects nothing. Keep keys in a TPM (Trusted Platform Module) chip on the motherboard, an HSM (hardware security module), or a managed key service. Back up recovery keys securely and separately from the data they protect, and control and log who can access them. A common failure in practice is the opposite problem: a server's disk is encrypted, the motherboard is replaced, and nobody can find the recovery key, so the data is lost even though no attacker was involved.",
   "Encryption in transit protects data crossing the network from eavesdropping and tampering. Use TLS (Transport Layer Security) for web traffic, which is what turns HTTP into HTTPS. Use SSH (Secure Shell) instead of Telnet for remote administration, SFTP or FTPS instead of plain FTP for file transfers, LDAPS instead of plain LDAP for directory queries, SMB encryption for file shares, and VPNs (virtual private networks) or IPsec for site-to-site links and remote access. Disable old protocol versions and weak ciphers, which are often left enabled for compatibility, and manage certificates so they are renewed before they expire and cause outages.",
   "Data retention defines how long data must be kept and when it must be destroyed. Retention periods come from laws, regulations, contracts and business needs, for example keeping financial records for a set number of years, or deleting personal data when it is no longer needed for its original purpose. Keeping data too briefly can break laws and leave you unable to answer legal requests. Keeping it too long increases the amount of data exposed in a breach and the cost and effort of legal discovery. Retention policies must apply to backups and archives too, not just live systems. A legal hold suspends normal deletion for data involved in litigation or an investigation, overriding the usual schedule until the hold is lifted.",
   "Data storage location matters because data is subject to the laws of the country where it is physically stored, an idea called data sovereignty. Some regulations require that certain data, such as personal or government data, stay within a specific country or region. When using cloud services or off-site backups, choose regions deliberately, check where replicas and backup copies are kept, and document where every copy lives so you can answer an auditor's question with confidence.",
   "Physical access can bypass operating system security, so protect the boot process. A UEFI/BIOS password, often called an administrator or setup password, stops someone from changing firmware settings, such as disabling Secure Boot or changing the boot order to start from a USB stick carrying another operating system that could read the disks. A power-on password requires a password before the system starts at all, though it is rarely used on servers because it blocks unattended reboots after patching or power loss. A bootloader password, such as a GRUB password on Linux, prevents someone from editing boot entries at startup, for example to boot into single-user mode and reach a root shell without a password.",
   "These controls work best in layers. Combine firmware and bootloader passwords with disabled unused boot devices and ports, Secure Boot, full-disk encryption, and a locked rack or cage in a data center with controlled access. If one layer is bypassed, the next still protects the data. Store firmware and bootloader passwords in the password vault, not on a sticky note inside the rack door."
  ],
  "analogy": "Encryption at rest is like a safe in a hotel room: even if a thief gets into the room, the valuables stay locked. Encryption in transit is like an armored truck: it protects valuables while they move between places. Firmware and bootloader passwords are the locks on the room's door and the building's back entrance, stopping someone from walking in and swapping out the safe. Where the analogy stops: a hotel safe has one combination, but in IT the key must be stored somewhere safe too, separately from the data, or the safe is pointless.",
  "terms": [
   [
    "Encryption at rest",
    "Encrypting stored data so it is unreadable without the key if media is stolen or copied."
   ],
   [
    "Encryption in transit",
    "Encrypting data as it travels across networks, for example with TLS or SSH."
   ],
   [
    "Data retention policy",
    "Rules specifying how long data is kept and when it must be destroyed."
   ],
   [
    "Legal hold",
    "An instruction to preserve data involved in litigation or investigation, suspending normal deletion."
   ],
   [
    "Data sovereignty",
    "The principle that data is subject to the laws of the country where it is physically stored."
   ],
   [
    "Bootloader password",
    "A password, such as a GRUB password, that prevents unauthorized editing of boot entries at startup."
   ]
  ],
  "example": "A backup drive is lost in transit to an off-site vault. Because the backups were encrypted with keys held in the backup system's key store, the company documents the incident but does not need to treat it as a data breach.",
  "mistakes": [
   [
    "TLS protects data stored on the server's disks.",
    "TLS protects data in transit only. Stored data needs encryption at rest such as BitLocker, LUKS, SEDs or database encryption."
   ],
   [
    "Keeping data forever is the safest choice.",
    "Keeping data longer than required increases exposure in a breach and legal discovery costs, and may violate privacy rules. Follow the retention policy and destroy data when its period ends, unless a legal hold applies."
   ],
   [
    "A BIOS/UEFI setup password stops someone from editing GRUB boot entries.",
    "The firmware password protects firmware settings like boot order and Secure Boot. A separate bootloader password protects the boot menu entries."
   ],
   [
    "Encrypting the disk is enough; key storage is a detail.",
    "If the key is stored with the data or lost, encryption either protects nothing or locks you out. Store keys in a TPM, HSM or key service and back up recovery keys separately."
   ]
  ],
  "tryit": [
   [
    "A company plans to replicate its customer database to a cloud region in another country for disaster recovery. The legal team mentions that some customer data must remain in the home country. What should the server team do before enabling replication?",
    "Check data sovereignty and regulatory requirements, then choose a replica region inside the permitted country or exclude the restricted data. Document where every copy, including backups, will be stored."
   ],
   [
    "During a physical security review, an auditor notes that a Linux server in a shared lab boots from USB if a stick is inserted and lets anyone at the console edit the boot menu. The server's disks are not encrypted. List three controls you would apply.",
    "Set a UEFI/BIOS administrator password and remove USB from the boot order (or disable unused boot devices), set a GRUB bootloader password so boot entries cannot be edited, and enable full-disk encryption such as LUKS. Moving it to a locked rack also helps."
   ]
  ],
  "tip": "At rest means stored (BitLocker, LUKS, self-encrypting drives); in transit means moving (TLS, SSH, IPsec). A firmware setup password stops boot-order changes; a GRUB password stops boot-entry edits. Keep keys away from the data they protect.",
  "check": [
   [
    "What does a BIOS/UEFI administrator password protect against?",
    "Unauthorized changes to firmware settings, such as the boot order or Secure Boot, by someone with physical access."
   ],
   [
    "Why can keeping data too long be a risk?",
    "More data is exposed if there is a breach, and it may violate privacy laws or increase legal discovery costs."
   ],
   [
    "What does a legal hold do to a retention policy?",
    "It suspends normal deletion for the affected data until the hold is lifted."
   ],
   [
    "Why are power-on passwords rarely used on servers?",
    "They block unattended reboots, such as after patching or a power outage, because someone must type the password at startup."
   ]
  ]
 },
 {
  "t": "Physical security: locked racks and cages, mantraps/access vestibules, badge readers, biometrics, cameras, security guards, fire suppression",
  "hook": "It is 7:40 on a Tuesday morning at Copperline Logistics, and you are walking a new auditor, Priya, through the server room. She stops at rack 14. The front door is closed, but the back door is propped open with a cardboard box, and a USB drive nobody recognizes is plugged into the rear of a database server. The badge log shows only two people entered last night, both on the facilities crew. Priya turns to you and asks the question every auditor eventually asks: if anyone can walk up and touch this server, what exactly are your firewalls and passwords protecting?",
  "simple": "Physical security means keeping the wrong people away from the actual machines. If someone can stand next to a server, they can unplug it, pull out a disk or plug in something harmful, no matter how strong the passwords are. So data centers use layers, like an onion: a fence or front desk, then a locked door that needs a key card, then a small double-door entry that lets only one person through at a time, then a locked cage, then a locked cabinet around the server itself. Cameras and guards watch all of it. Think of a bank: there is a front door, a teller counter, a vault door and finally a locked safe-deposit box. Fire protection is part of this too, because a fire or the water used to fight it can destroy servers just as surely as a thief.",
  "body": [
   "Anyone who can touch a server can steal a drive, plug in a device or simply turn it off. Logical controls such as passwords and encryption assume the attacker is on the other side of a network cable; physical access skips most of them. Physical security protects hardware and data with layers, an approach called defense in depth: the building perimeter, the data center entrance, the room, the cage and finally the rack. Each layer slows an intruder, creates a record and gives staff a chance to notice and respond.",
   "The innermost layer is the rack itself. Lockable doors on the front and back stop casual access to drive bays, power buttons and ports, and both sides matter, because the rear is where the network, USB and console ports live. In shared or colocation facilities, customers rent locked cages or private suites around their racks so that other tenants and their contractors cannot reach their equipment. Physical keys should be tracked in a key log, or replaced with electronic locks that record each opening with a name and timestamp. Lock or disable unused ports where the hardware allows it, and consider intrusion alerts on rack doors for sensitive systems so an opening outside a change window raises an alarm.",
   "Entry to the data center is governed by access control systems. Badge readers using proximity cards or smart cards grant entry based on the person's authorization, so a network technician might open the main room but not the cage holding payroll servers. Every swipe is logged, which gives investigators a timeline and lets you remove access instantly when someone leaves the company. A badge on its own proves only that someone is holding the card, which is why higher-security doors add a second factor.",
   "The access control vestibule, still widely called a mantrap, solves a specific problem. It is a small space with two doors where the second door opens only after the first has closed and the person inside has authenticated. It stops tailgating, which is following an authorized person through a door without authenticating, and piggybacking, which is being knowingly let in by an authorized person. Many vestibules use weight sensors or cameras to detect two people inside and refuse to open the inner door, and they can hold someone in place until a guard confirms identity. On the exam, when the question is how to stop tailgating, the vestibule is the answer.",
   "Biometric readers authenticate something you are: fingerprints, hand geometry, iris patterns or face recognition. Because they verify a physical trait, they are often combined with a badge (something you have) or a PIN, or personal identification number (something you know), to create multifactor physical access. Biometrics are convenient because they cannot be lent like a card, but they can produce false rejections that frustrate staff and false acceptances that let the wrong person in, so they are tuned and usually paired with another factor rather than trusted alone.",
   "Detection and deterrence form the next layer. Closed-circuit television (CCTV) cameras record activity, discourage wrongdoing and provide evidence after an incident. Place them at entrances, along aisles, at loading docks and pointed at the vestibule, and retain footage for the period your policy requires. Security guards add something no automated system can: judgment. They check identities, escort visitors, respond to alarms and notice behavior that looks wrong, such as a person carrying a server out at 3 a.m. Visitor logs, guest badges that look visibly different from employee badges, and escort requirements complete the picture. Motion sensors and door alarms alert staff to entry outside normal hours.",
   "Fire is one of the largest physical risks to a server room. Detection uses smoke and heat detectors, and many data centers add very early warning aspirating systems that continuously draw air through tubes and sample it for tiny smoke particles, catching an overheating component long before flames appear. Suppression options differ mainly in how they affect equipment. Water sprinklers are effective and inexpensive but damage electronics. Wet-pipe systems keep water in the pipes at all times, so a damaged head can soak a rack. Pre-action systems keep the pipes dry until a detector triggers, and only then fill them, which greatly reduces the chance of accidental discharge.",
   "Clean agent systems, which use certain inert gases or chemical agents, extinguish fires without leaving residue or harming electronics, which is why they are common in server rooms. Some gas systems work by lowering oxygen in the room, so staff must evacuate when the alarm sounds, and rooms need clear signs and abort controls. Keep the correct class of handheld fire extinguisher, one rated for electrical fires, near the exits so small incidents can be handled without triggering the room-wide system.",
   "Environmental controls round out physical protection. Monitor temperature and humidity, because heat shortens component life and very dry air increases static discharge. Place water leak sensors under raised floors and near cooling units, where a slow leak can go unseen for days. Emergency power-off (EPO) switches cut power to the room in a crisis, but they should be protected with covers or guards so nobody presses one by accident while looking for a light switch. Together, these layers mean a single failure, such as a propped-open rack door, is caught by the next control rather than becoming an incident."
  ],
  "analogy": "Physical security is like the layers protecting a bank's safe-deposit boxes. You pass the front door, then a counter where staff check your identity, then a vault door that only opens when the outer gate is shut, and finally your own locked box. Each layer alone is beatable; together they are strong. The analogy stops working for fire: a bank vault is built to survive fire, while servers need active detection and a suppression method chosen specifically so it does not wreck the equipment it protects.",
  "terms": [
   [
    "Access control vestibule (mantrap)",
    "A two-door entry space where only one door can open at a time, preventing tailgating and piggybacking."
   ],
   [
    "Tailgating",
    "Following an authorized person through a secure door without authenticating."
   ],
   [
    "Piggybacking",
    "Entering a secure area because an authorized person knowingly holds the door or lets you in."
   ],
   [
    "Biometrics",
    "Authentication based on physical characteristics such as fingerprints, iris patterns or face geometry."
   ],
   [
    "Pre-action sprinkler",
    "A water system that keeps its pipes dry until a detector triggers, reducing accidental water discharge."
   ],
   [
    "Clean agent suppression",
    "Fire suppression using gases that extinguish fire without water damage or residue on equipment."
   ]
  ],
  "example": "A visitor tries to follow an engineer into the data center. The access control vestibule will not open the inner door while two people stand inside, the camera records the attempt, and the guard escorts the visitor back to reception to sign in, receive a visitor badge and wait for an escort.",
  "mistakes": [
   [
    "A badge reader alone stops tailgating.",
    "A badge reader controls who can open the door, but anyone can walk through behind the person who opened it. A vestibule, where only one door opens at a time, is the control that stops tailgating."
   ],
   [
    "Standard wet-pipe sprinklers are the best choice for a server room because they are cheap and reliable.",
    "They work, but water ruins electronics and wet pipes can leak or discharge accidentally. Pre-action systems or clean agent systems are preferred where equipment must be protected."
   ],
   [
    "Cameras prevent intrusions.",
    "Cameras mainly deter and provide evidence; they do not physically stop anyone. Locks, vestibules and guards are preventive, while cameras are detective and deterrent controls."
   ],
   [
    "Biometrics are perfect, so a fingerprint reader can replace every other control.",
    "Biometric systems have false acceptance and false rejection rates and are usually combined with a badge or PIN for multifactor physical access."
   ]
  ],
  "tryit": [
   [
    "Bayview Health is moving its servers into a shared colocation facility where other companies' contractors work in the same hall. The compliance officer wants to be sure no outside technician can reach Bayview's drives, even by accident. The facility already has badge readers on the main entrance and cameras in the aisles. What additional physical control should Bayview request, and why?",
    "Request a locked private cage (or suite) around Bayview's racks, plus locking front and rear rack doors with logged electronic locks. The building badge and cameras keep strangers out of the facility and record activity, but every tenant's contractors have legitimate access to the hall. A cage limits access to Bayview's own authorized staff and creates a separate access record."
   ]
  ],
  "tip": "Mantraps or access control vestibules stop tailgating. Pre-action and clean agent systems are preferred where electronics must be protected; standard wet-pipe sprinklers risk water damage. Cameras detect and deter, guards apply judgment, locks and vestibules prevent.",
  "check": [
   [
    "Which control specifically defeats tailgating?",
    "An access control vestibule (mantrap), because only one door opens at a time and it can detect more than one person inside."
   ],
   [
    "Why are clean agent systems common in server rooms?",
    "They extinguish fires without water or residue, so equipment is not damaged by the suppression itself."
   ],
   [
    "How does a pre-action sprinkler system differ from a wet-pipe system?",
    "Its pipes stay dry until a detector triggers, so a broken sprinkler head alone does not release water onto equipment."
   ]
  ]
 },
 {
  "t": "Identity and access management: least privilege, role-based access, groups, MFA, SSO, account lockout, password policies, service accounts, auditing",
  "hook": "At 2:15 a.m. your phone buzzes. The monitoring system at Ridgeway Public Library shows the backup server logging on interactively to the file server, then to the payroll database, then to a domain controller. Nobody should be awake, and backups finished at midnight. You check the account and your stomach drops: the backup software was installed two years ago using a domain admin account, and its password has never changed. Whoever has that password can go anywhere. How did one convenient shortcut turn into the keys to the entire network, and what would have kept the damage small?",
  "simple": "Identity and access management is about two simple questions: who are you, and what are you allowed to do? Proving who you are is called authentication, like showing an ID at a hotel desk. Deciding what you can do is authorization, like the key card that opens only your room and the gym, not every room in the building. Good practice is to give each person and each program only the access it really needs, to hand out access by job role rather than one person at a time, and to ask for more than one kind of proof for important accounts, such as a password plus a code from your phone. Finally, you keep a record of who did what, so mistakes and misuse can be spotted.",
  "body": [
   "Identity and access management (IAM) decides who can log on to a server and what they can do once there. It combines authentication, which proves identity, with authorization, which grants permissions, and accounting or auditing, which records activity. A large share of breaches involve misused or stolen credentials, so IAM is one of the most important security controls a server administrator manages, and it shows up throughout the Server+ security domain.",
   "Least privilege is the guiding principle. Give each user, service and process only the permissions needed to do its job, and no more. In practice, administrators should use a normal account for email and web browsing and a separate privileged account for administrative tasks, ideally elevating only when needed. If a phishing email compromises the everyday account, the attacker does not automatically gain admin rights. Review permissions regularly, because people change jobs and keep their old access along with the new, a problem called privilege creep. An accountant who moved from payroll to purchasing should not still be able to open payroll files a year later.",
   "Assigning permissions to individuals does not scale and is nearly impossible to audit. Role-based access control (RBAC) defines roles such as help desk, database administrator or backup operator, grants permissions to those roles, and places people into roles. Groups are how most systems implement this: you grant a folder or server permission to a group, then add or remove users from the group. When someone moves departments, you change their group memberships instead of hunting through hundreds of individual access control entries. An auditor can also read a short list of group permissions far more easily than a sprawling list of named users.",
   "Authentication proves identity, and multifactor authentication (MFA) makes it much harder to fake. MFA requires two or more different factor types: something you know (a password or PIN, a personal identification number), something you have (a hardware token, smart card or authenticator app on a phone) and something you are (a biometric such as a fingerprint). Two passwords, or a password and a security question, are not MFA because both are the same factor type. Require MFA for remote access and for all administrative accounts, since those are the accounts attackers want most.",
   "Single sign-on (SSO) lets a user authenticate once and then reach many systems without logging on again. Inside a Windows domain this is commonly provided by Kerberos, which issues tickets after the first logon. For web and cloud applications, federation protocols such as Security Assertion Markup Language (SAML) and OpenID Connect pass a trusted identity from an identity provider to the application. SSO improves usability, reduces password fatigue and centralizes control, since disabling one account removes access everywhere. The trade-off is that a single identity becomes very valuable, so SSO should always be paired with MFA.",
   "Password policies set rules such as minimum length, complexity, history (which prevents reusing recent passwords) and, in some organizations, expiration. Current guidance favors long passphrases and screening new passwords against lists of known-breached passwords over frequent forced changes, which tend to produce predictable patterns like adding a number each quarter. Account lockout disables an account for a period after a set number of failed logons, which slows password-guessing attacks. Set the threshold with care: a very low value lets an attacker, or a user's phone with an old saved password, lock out real users on purpose or by accident, creating a denial of service.",
   "Service accounts are the accounts that applications and services run under, such as a database engine, web application pool or backup agent. They are attractive targets because they often have broad rights and passwords that never change. Give each service its own account with minimal rights, deny it interactive logon so nobody can use it to sign in at a console, and use long random passwords or managed service accounts that rotate passwords automatically. Document each account's owner and purpose so it can be reviewed and removed when the application is retired. Never run services as a domain administrator.",
   "Auditing records who did what and when. Enable logging of successful and failed logons, privilege use, and changes to accounts and groups, such as a user being added to an administrators group. Forward those logs to a central system so an attacker on one server cannot quietly erase them, and actually review them, ideally with alerts for unusual events like an admin logon at 2 a.m. Auditing also includes periodic access reviews, in which managers confirm that each person on their team still needs the access they have. Together with least privilege and RBAC, these reviews keep permissions from drifting over time."
  ],
  "analogy": "IAM works like a hotel. The front desk checks your ID (authentication) and gives you a key card coded for your room, the pool and the gym (authorization by role: guest). Housekeeping gets a different card for a whole floor, and the manager a master card. The door locks log every swipe (auditing). The analogy stops at service accounts: in a hotel every card belongs to a person, but servers also have non-human accounts that need the same care, often more.",
  "mnemonic": "MFA factors: Know, Have, Are. A password and a PIN are both Know, so they count as one factor. You need two different words from the list for true MFA.",
  "terms": [
   [
    "Least privilege",
    "Granting only the minimum permissions needed to perform a task."
   ],
   [
    "Privilege creep",
    "The gradual build-up of unneeded access as people change roles and keep old permissions."
   ],
   [
    "RBAC (role-based access control)",
    "Assigning permissions to roles and placing users in roles rather than granting rights individually."
   ],
   [
    "MFA (multifactor authentication)",
    "Requiring two or more different types of authentication factors: something you know, have or are."
   ],
   [
    "SSO (single sign-on)",
    "Authenticating once to gain access to many systems, often via Kerberos or federation protocols such as SAML."
   ],
   [
    "Service account",
    "A non-human account used by an application or service to run and access resources."
   ]
  ],
  "example": "A backup application was installed using a domain admin account. During a review, the administrator creates a dedicated managed service account with only backup operator rights, denies it interactive logon, changes the backup service to use it, and adds an alert for any interactive logon attempt by that account.",
  "mistakes": [
   [
    "A password plus a security question (or a PIN) is multifactor authentication.",
    "Both are something you know, so it is still single-factor. MFA needs different factor types, such as a password plus a token or app code."
   ],
   [
    "Setting account lockout to one or two failed attempts is the most secure choice.",
    "An extremely low threshold lets attackers or stale saved passwords lock out real users, causing a denial of service. Choose a balanced threshold and monitor failures."
   ],
   [
    "Granting permissions directly to each user gives tighter control than groups.",
    "Individual grants are hard to track and audit. Granting to groups (RBAC) scales and makes changes as simple as editing group membership."
   ],
   [
    "SSO weakens security because one password opens everything.",
    "SSO centralizes control and reduces password reuse, but it does raise the value of that one identity, which is why it is paired with MFA."
   ]
  ],
  "tryit": [
   [
    "At Cedar Valley Clinic, a help-desk technician who was promoted to network engineer six months ago can still reset any user's password and also has full rights on the core switches. A new hire will take over the help-desk role. How should the administrator handle access for both people?",
    "Remove the engineer from the help-desk group and keep them in the network engineering group, ending the privilege creep. Add the new hire to the help-desk group. Because permissions are granted to groups (RBAC), no individual permissions need to be edited, and the next access review should confirm both changes."
   ],
   [
    "A web application needs to read one database. The developer asks for the app pool to run under their own admin account 'just to get it working.' What should you do instead?",
    "Create a dedicated service account (or managed service account) with read access to that one database only, deny it interactive logon, and document its owner. Running under a personal admin account breaks least privilege and ties the application to one person's credentials."
   ]
  ],
  "tip": "MFA must combine different factor types; a password plus a PIN is still single-factor. Grant permissions to groups, not individuals, give service accounts their own least-privilege identities, and watch out for lockout thresholds so low they cause denial of service.",
  "check": [
   [
    "Is a password plus a security question multifactor?",
    "No. Both are something you know, so it is single-factor."
   ],
   [
    "What risk comes from setting the account lockout threshold very low?",
    "Attackers or mistakes can easily lock out legitimate users, causing denial of service."
   ],
   [
    "Why assign permissions to groups rather than users?",
    "It scales, is easier to audit and lets you change access by changing group membership."
   ],
   [
    "Why should a service account be denied interactive logon?",
    "It only needs to run a service; blocking console and remote desktop logons limits what an attacker can do with its credentials."
   ]
  ]
 },
 {
  "t": "Data security risks: data loss, unencrypted media, insider threats, malware and ransomware; mitigation with DLP, patching and segmentation",
  "hook": "It is Friday afternoon at Northgate Insurance when Marcus at the help desk forwards you a strange ticket: files on the claims share now end in an unfamiliar extension, and a text file called READ_ME sits in every folder. Minutes later the backup console shows last week's restore points being deleted. Across the hall, HR mentions that a contractor whose contract ended yesterday still has VPN access, and someone else found an unencrypted backup drive in a taxi receipt envelope. Four problems, one afternoon. Which risk is which, and which control would have stopped each one?",
  "simple": "Data can be lost in a few common ways. Sometimes it is an accident, like deleting the wrong folder or a disk dying with no copy. Sometimes a laptop or backup drive is lost, and if it was not locked with encryption anyone can read it. Sometimes the danger is a trusted person, an employee or contractor, who takes data or makes a careless mistake. And sometimes it is harmful software, such as ransomware, which scrambles your files and demands money to unscramble them. Each risk has a matching protection: tools that stop sensitive files from being sent where they should not go, encryption for anything that can be lost, regular updates to close security holes, walls inside the network so an infection cannot spread everywhere, and good backups kept where attackers cannot reach them.",
  "body": [
   "To protect server data you first have to recognize how it gets lost, stolen or destroyed. Server+ groups the common risks and asks you to match each one with a sensible mitigation, so it helps to think in pairs: this risk, that control. No single product covers everything, which is why the answer is almost always a set of layered defenses.",
   "Data loss can be accidental. A RAID (redundant array of independent disks) set fails with no backup, an administrator deletes the wrong folder, a database becomes corrupted after a power cut, or a flood destroys the building. Data loss can also mean leakage, where data ends up somewhere it should not be, such as a spreadsheet of customer records emailed to a personal account or uploaded to a public file-sharing site. Leakage does not destroy the original, but it can trigger regulatory penalties and notification duties just as serious as a breach.",
   "Unencrypted media is a special case of data loss. Laptops, USB drives, backup tapes, external disks and decommissioned server drives all leave the building at some point. If the data on them is readable, losing a single backup can expose everything on it, potentially years of records. Encryption at rest means a lost device is just lost hardware, because whoever finds it cannot read the contents without the key. That is why policies usually require full-disk encryption on laptops and encryption on any backup that goes off-site.",
   "Insider threats come from people who already have legitimate access: employees, contractors and partners. Some are malicious, stealing data or sabotaging systems, often around the time they resign or are fired. Others are simply careless, falling for phishing, misconfiguring a share so everyone can read it, or copying files to a personal device to work from home. Insiders are hard to detect because their access looks normal. Controls therefore focus on least privilege, separation of duties so no single person controls an entire sensitive process, monitoring for unusual activity such as bulk downloads at odd hours, and prompt removal of access when people leave.",
   "Malware is malicious software, including viruses, worms, trojans, spyware and rootkits. Ransomware is malware that encrypts files and demands payment for the decryption key, and many ransomware groups also steal data first and threaten to publish it, a tactic known as double extortion. Ransomware commonly enters through phishing, exposed remote desktop services with weak passwords, or unpatched internet-facing systems. It then spreads laterally across the network using stolen credentials and administrative tools. Warning signs include mass file renames with a new extension, ransom notes appearing in folders, sudden spikes in disk and processor activity on file servers, disabled security tools and backups or shadow copies being deleted.",
   "Mitigations work in layers, and each one lines up with a specific risk. Data loss prevention (DLP) tools identify sensitive data, such as payment card numbers or health records, using patterns and labels, then block or alert when it is copied to USB drives, uploaded or emailed outside policy. Encryption at rest protects media that goes missing. Patching closes the vulnerabilities malware uses, so keep the operating system, applications and firmware current and prioritize anything internet-facing or actively exploited.",
   "Network segmentation divides the network into zones, separated by firewalls or virtual LANs (VLANs) with access rules between them. A compromised workstation in the user zone then cannot directly reach database servers, backup servers or management interfaces such as baseboard management controllers. Segmentation does not stop the first infection, but it limits how far ransomware or an intruder can spread. Endpoint protection or endpoint detection and response (EDR) adds behavior-based detection, and application allow-listing blocks programs that are not explicitly approved.",
   "Backups are the last line of defense against both ransomware and ordinary data loss. Keep at least one copy offline or immutable, meaning it cannot be changed or deleted for a set period, so attackers cannot encrypt or erase it even with admin credentials. Protect backup system credentials separately from the main domain, and regularly test restores so you know recovery actually works. Combine all of these technical controls with user awareness training, quick offboarding procedures and a practiced incident response plan, so that when one control fails the next one is ready."
  ],
  "analogy": "Think of a hospital fighting infection. Hand-washing and vaccines (patching and training) prevent many infections. Isolation wards with closed doors (segmentation) stop one sick patient from infecting the whole building. Guards at the pharmacy check that medication is not walking out in someone's pocket (DLP). Stored blood supplies in a separate building (offline backups) let you recover after the worst. The analogy is imperfect for insiders: in a hospital the staff are the cure, while in IT a trusted person can also be the source of the problem.",
  "terms": [
   [
    "DLP (data loss prevention)",
    "Tools and policies that detect and block sensitive data from leaving authorized locations."
   ],
   [
    "Ransomware",
    "Malware that encrypts data and demands payment, often also stealing data for extortion."
   ],
   [
    "Insider threat",
    "Risk posed by people with legitimate access who misuse it maliciously or carelessly."
   ],
   [
    "Network segmentation",
    "Dividing a network into isolated zones to limit access and the spread of attacks."
   ],
   [
    "Immutable backup",
    "A backup copy that cannot be modified or deleted for a defined retention period."
   ],
   [
    "Encryption at rest",
    "Encrypting stored data so it is unreadable without the key if the media is lost or stolen."
   ]
  ],
  "example": "Ransomware encrypts shares on a file server after a user opens a phishing attachment. Because servers sit in a separate segment that blocks workstation access to management ports, the database servers are untouched, and the file server is restored from immutable backups taken the night before. The incident response team then reviews why the attachment was not blocked and schedules refresher training.",
  "mistakes": [
   [
    "Encryption at rest stops data leakage by employees.",
    "Encryption protects lost or stolen media, but an authorized user sees decrypted data and can still email or copy it. DLP is the control aimed at leakage."
   ],
   [
    "Segmentation prevents ransomware infections.",
    "Segmentation limits how far an infection spreads; it does not stop the initial compromise. Patching, email filtering, training and EDR help prevent entry."
   ],
   [
    "Any backup will save you from ransomware.",
    "Ransomware operators often find and delete or encrypt reachable backups. You need at least one offline or immutable copy, separately protected credentials and tested restores."
   ],
   [
    "Insider threats are always malicious employees.",
    "Many insider incidents are careless mistakes, and contractors and partners count too. Least privilege, monitoring and fast offboarding address both kinds."
   ]
  ],
  "tryit": [
   [
    "Pinewood Credit Union's auditors flag two findings. First, tellers can copy files containing member account numbers to USB drives. Second, nightly backups go to a network-attached storage (NAS) device on the same flat network as every workstation and use the domain admin account. Which control addresses each finding?",
    "The USB copying is a leakage risk, so deploy DLP to detect account numbers and block or alert on USB transfers. The backup design is a ransomware risk: move backups to an isolated segment, use dedicated backup credentials, and keep an offline or immutable copy so a compromised workstation cannot reach or destroy them."
   ]
  ],
  "tip": "Match risk to control: leakage of sensitive data points to DLP, lost media to encryption, known vulnerabilities to patching, lateral spread to segmentation, insiders to least privilege and monitoring, and ransomware recovery to offline or immutable backups.",
  "check": [
   [
    "Which control would stop an employee copying customer card numbers to a USB drive?",
    "DLP, which detects sensitive data and blocks transfers that violate policy."
   ],
   [
    "How does segmentation reduce ransomware damage?",
    "It restricts which systems a compromised machine can reach, limiting lateral spread."
   ],
   [
    "Why must at least one backup be offline or immutable?",
    "Attackers with admin access can delete or encrypt online backups; an offline or immutable copy survives so you can recover."
   ]
  ]
 },
 {
  "t": "Server hardening: disable unused services and ports, remove unneeded software, OS and firmware patching, host firewall, antivirus/EDR, secure admin protocols",
  "hook": "Your first week at Summit Ridge Engineering, you run a quick port listing on the new document server before it goes live. The output scrolls. There is an FTP service nobody asked for, a print spooler on a machine with no printers, Telnet listening on port 23, and a web-based management page for the baseboard management controller still using the factory password printed on a sticker. The server has been on the network for three days. Your manager, Elena, asks a simple question: before we put real files on this thing, how do we make it boring to attack?",
  "simple": "Hardening a server means removing everything an attacker could use as a way in, and locking down what is left. Imagine moving into a house and finding ten doors and twenty windows. You would brick up the doors you never use, lock the windows, change the old locks and only hand out keys to people who need them. For a server, that means turning off programs it does not need, uninstalling extra software, installing updates for the operating system and the hardware's built-in software, turning on the server's own firewall, running security software that watches for bad behavior, and only managing the server over connections that are encrypted so passwords cannot be read by someone listening on the network.",
  "body": [
   "Hardening means reducing a server's attack surface, which is the total set of ways an attacker could interact with it. Every running service, open port, installed package, default account and management interface is a possible entry point that must be configured correctly and kept patched. A hardened server runs only what its role requires, is kept up to date, and is administered securely. The goal is not perfection but making the server a small, well-understood target.",
   "Start with services and ports. List what is running and what is listening for network connections, using `ss -tulpn` or `systemctl list-units --type=service` on Linux and `Get-Service` or `netstat -ano` on Windows. Compare that list to the server's documented role, then disable anything the role does not need, such as the print spooler on a database server or a web server that the installer added by default. Blocking a port with a firewall while leaving the service running is not enough. Stop and disable the service so it does not return after a reboot, because the code is still there to be exploited if the firewall rule changes.",
   "Remove unneeded software. Every extra application, sample file, development tool, compiler or old management agent adds code that must be patched and might contain vulnerabilities. Minimal installation options, such as Windows Server Core or a headless Linux build without a graphical desktop, help from the start because there is simply less installed. Accounts deserve the same treatment: remove or disable default and guest accounts, rename or tightly protect built-in administrator accounts, and change every default password, including on baseboard management controllers (BMCs), storage arrays and network appliances.",
   "Patching keeps known vulnerabilities closed. Apply operating system (OS) updates, application updates and firmware updates for the Basic Input/Output System or Unified Extensible Firmware Interface (BIOS/UEFI), the BMC, redundant array of independent disks (RAID) controllers and network interface cards (NICs). Firmware is easy to forget because it does not update itself through the normal OS update channel. Use a patch management process: track vendor releases, test patches on non-production systems, deploy in scheduled maintenance windows through change management, verify that services still work, and report compliance. Prioritize critical and actively exploited vulnerabilities. Unpatched internet-facing services are one of the most common ways servers are breached.",
   "Turn on the host-based firewall, such as Windows Defender Firewall or `firewalld`, `ufw` or `nftables` on Linux, even when a network firewall already protects the subnet. Use a default-deny inbound policy, allow only the ports the role needs, and restrict management ports such as Secure Shell (SSH) and remote desktop to administrative networks or jump hosts. A host firewall limits lateral movement: if another machine on the same network segment is compromised, it still cannot reach this server's management services.",
   "Install antivirus or, increasingly, endpoint detection and response (EDR). Traditional antivirus compares files against signatures of known malware, which catches common threats but misses new ones. EDR also watches behavior, such as unusual process launches, credential dumping tools, or a process encrypting thousands of files in a minute. It can isolate a host from the network on command and records activity for investigation afterward. Configure exclusions carefully for database files and backup software so real-time scanning does not damage performance, but keep exclusions narrow so they do not become blind spots attackers can hide in.",
   "Finally, administer securely. Replace plaintext protocols with encrypted ones: SSH instead of Telnet, HTTPS (Hypertext Transfer Protocol Secure) instead of plain HTTP for web consoles, and SSH File Transfer Protocol (SFTP) instead of File Transfer Protocol (FTP). Plaintext protocols send credentials across the network where anyone capturing traffic can read them. Use Remote Desktop Protocol (RDP) with Network Level Authentication, reached over a virtual private network (VPN) or remote desktop gateway rather than exposed to the internet. Prefer key-based SSH logons, disable direct root login so administrators sign in as themselves and elevate, and route administrative access through jump hosts that are themselves hardened and monitored.",
   "Hardening is easier to do consistently when you start from a written standard. Security baselines such as the Center for Internet Security (CIS) Benchmarks or vendor security guides give detailed checklists of settings for each operating system and application. Configuration management tools can apply those settings to every new server and periodically audit existing servers, flagging any drift from the baseline. Combined with regular vulnerability scanning, this turns hardening from a one-time project into a routine, repeatable part of server administration."
  ],
  "analogy": "Hardening a server is like securing a new house. You brick up doors you never use (disable services), clear out junk left by the previous owner (remove software), replace the locks and change the alarm code (default accounts and passwords), fix broken window latches when the manufacturer recalls them (patching), add an inner door lock even though the neighborhood has a gate (host firewall), and install a camera that notices odd behavior (EDR). Where it stops: a house's doors stay bricked, while a server's software can quietly reinstall or re-enable services after updates, so you must audit regularly.",
  "terms": [
   [
    "Attack surface",
    "All the points where an attacker could interact with or enter a system."
   ],
   [
    "Host-based firewall",
    "A firewall running on the server itself that filters its inbound and outbound traffic."
   ],
   [
    "EDR (endpoint detection and response)",
    "Security software that monitors host behavior, detects threats, can isolate the host and records activity for investigation."
   ],
   [
    "Security baseline",
    "A documented set of hardening settings that systems must meet."
   ],
   [
    "Default-deny",
    "A firewall policy that blocks all traffic except what is explicitly allowed."
   ],
   [
    "Jump host",
    "A hardened, monitored server administrators connect through to reach other servers' management interfaces."
   ]
  ],
  "example": "Hardening a new Linux web server, the administrator removes the installed FTP server and compilers, disables password SSH logins in favor of keys, disables direct root login, sets `firewalld` to allow only 443 from anywhere and 22 from the admin subnet, updates BIOS and BMC firmware, changes the BMC's default password, and installs the organization's EDR agent.",
  "mistakes": [
   [
    "Blocking a port at the firewall is the same as disabling the service.",
    "The service is still installed, running and exploitable if the rule changes or an attacker gets local access. Stop, disable and ideally remove it."
   ],
   [
    "A network firewall makes host firewalls unnecessary.",
    "Network firewalls do not filter traffic between machines on the same segment. A host firewall limits lateral movement from a compromised neighbor."
   ],
   [
    "Patching means running OS updates.",
    "Firmware for the BIOS/UEFI, BMC, RAID controllers and NICs needs patching too, and it usually requires a separate process."
   ],
   [
    "Telnet is fine on an internal network.",
    "Telnet sends credentials in plaintext that anyone capturing traffic can read. Use SSH everywhere, internal networks included."
   ]
  ],
  "tryit": [
   [
    "A Windows file server at Lakeshore Realty runs the print spooler, has RDP open to the internet so the owner can work from home, and its antivirus excludes the entire D: drive where all the shares live because scanning was 'slow.' Which three hardening changes would you make first?",
    "Disable the print spooler (unused service), move RDP behind a VPN or remote desktop gateway with Network Level Authentication and MFA instead of exposing it to the internet, and replace the blanket D: drive exclusion with narrow exclusions (or move to EDR) so the shares are actually monitored. Each change shrinks the attack surface or removes a blind spot."
   ]
  ],
  "tip": "Hardening answers usually involve removing or disabling something: unused services, software, accounts and ports. Replace plaintext admin protocols (Telnet, FTP, HTTP) with encrypted ones (SSH, SFTP, HTTPS), and remember firmware patching.",
  "check": [
   [
    "Why stop and disable an unused service rather than only blocking its port?",
    "The service remains a vulnerable, patchable component, and a firewall change could re-expose it; removing it shrinks the attack surface."
   ],
   [
    "What does EDR add beyond signature-based antivirus?",
    "Behavior monitoring, detection of unknown threats, host isolation and forensic recording."
   ],
   [
    "Which protocol should replace FTP for transferring files to a server?",
    "SFTP (or another encrypted protocol), because FTP sends credentials and data in plaintext."
   ]
  ]
 },
 {
  "t": "Decommissioning and media destruction: wiping, degaussing, shredding, crushing, certificates of destruction, asset records",
  "hook": "The pallet is already shrink-wrapped by the loading dock at Fairhaven Medical Group: thirty old servers, sold to a recycler for a little cash back. You are signing the pickup form when Tomas from compliance walks over holding the asset spreadsheet. 'Which of these still have drives in them?' he asks. Nobody is sure. Some were formatted, a few were 'wiped' by someone who left last year, and half of them held patient records. The truck arrives in an hour. What does it actually take to make sure no readable data leaves this building, and how would you prove it later?",
  "simple": "When a server is retired, the data on its disks does not disappear just because you delete files or format the drive. Deleting only removes the labels that say where the data is, a bit like tearing the table of contents out of a book while leaving all the pages. To truly get rid of data you either overwrite every part of the disk with meaningless patterns, scramble it with a powerful magnet (only for older spinning disks and tapes), use a special erase command built into newer flash drives, or physically destroy the drive by shredding or crushing it. Afterward you keep paperwork that lists each drive's serial number and how it was destroyed, so you can prove to an auditor that nothing was left behind.",
  "body": [
   "Every server eventually reaches the end of its life. Decommissioning it safely means shutting down its services cleanly, making sure no data leaves the building in readable form, and closing out its records so the organization knows exactly what happened to it. Old drives sold, donated or recycled without proper sanitization are a well-known source of data breaches, and the organization remains responsible for that data even after the hardware is gone.",
   "Decommissioning starts with planning through change management. Confirm that the server's services have been migrated or retired and that nothing still depends on it, notify stakeholders, and remove the server from monitoring, backup schedules, DNS (Domain Name System) records, load balancer pools and the directory. Archive any data that retention policies require you to keep, and revoke the server's certificates and service accounts so they cannot be reused. Only then power it off and remove it from the rack, updating rack diagrams, cable records and the configuration management database (CMDB).",
   "Media sanitization is the process of making data on storage unrecoverable. The right method depends on two things: the type of media, such as a spinning hard disk drive (HDD), a solid-state drive (SSD), tape or optical disc, and whether you want to reuse the media afterward. It is important to understand what does not count. Simply deleting files or formatting a drive does not remove the data; it removes the pointers to it, and freely available recovery tools can often restore much of what was there.",
   "Wiping, also called overwriting, writes patterns over every addressable sector of a hard drive so the old data cannot be read, and the drive can then be reused or resold. Use tools that verify the overwrite and produce a report for each drive. SSDs behave differently. Because of wear leveling, which spreads writes across cells, and spare blocks hidden from the operating system, an ordinary overwrite may miss data. For SSDs, use the drive's built-in secure erase or sanitize command, or crypto-erase on a self-encrypting drive, which destroys the internal encryption key so all stored data becomes unreadable ciphertext in seconds.",
   "Degaussing exposes magnetic media, such as hard drives and tapes, to a very strong magnetic field that scrambles the magnetic patterns holding the data. It works quickly on large batches, but it also destroys the factory-written servo information a hard drive needs to position its heads, so a degaussed drive cannot be reused. Degaussing has no effect on SSDs, flash drives or optical media, because they do not store data magnetically. This distinction is a favorite exam question.",
   "Physical destruction is the most certain method and is often required for highly sensitive data. Shredding cuts drives into small pieces with an industrial shredder; crushing or drilling deforms platters and circuit boards so they cannot spin or be read. Incineration and pulverizing are also used, particularly for SSDs where the memory chips must be broken into small fragments. Many organizations hire a certified third-party destruction service, either on-site, where staff watch the drives being shredded, or off-site with a documented chain of custody showing who handled the drives at each step.",
   "Documentation proves the work was done correctly. A certificate of destruction from the vendor lists the serial numbers of the destroyed media, the method used, the date and the responsible party. Update the asset records so each device shows as disposed, including the method and the certificate reference, so an auditor can trace every drive from purchase to destruction without gaps. Also handle software licenses, either reassigning them or retiring them, and arrange environmentally responsible recycling of the remaining chassis, power supplies and boards according to local electronic waste regulations.",
   "Remember that data hides in more places than the main drives. Storage arrays, backup tapes, USB boot devices, spare drives in a cabinet and the configuration stored in baseboard management controllers (BMCs), switches and appliances can all hold sensitive information such as passwords, network layouts or cached files. Reset management controllers and appliances to factory defaults, collect every removable device, and include each one in the inventory so nothing slips out on the pallet unnoticed.",
   "Choose the method by data sensitivity, media type and policy. Wiping or crypto-erase suits drives being reused inside the organization. Degaussing suits magnetic media that will not be reused. Physical destruction suits highly sensitive data or any drive leaving your control. When in doubt, the safest exam answer for sensitive data on media leaving the organization is destruction with a certificate."
  ],
  "analogy": "Deleting a file is like tearing the index out of a library book: the pages are all still there for anyone patient enough to read them. Wiping is reprinting every page with gibberish, so the book can go back on the shelf. Degaussing is like washing ink off paper with a chemical that only works on one type of ink, which is why it does nothing to SSDs. Shredding is feeding the book into a paper shredder. The certificate of destruction is the signed receipt.",
  "terms": [
   [
    "Wiping",
    "Overwriting all sectors of storage media so previous data cannot be recovered, allowing reuse."
   ],
   [
    "Degaussing",
    "Erasing magnetic media with a strong magnetic field, rendering hard drives unusable; ineffective on SSDs."
   ],
   [
    "Crypto-erase",
    "Sanitizing a self-encrypting drive by destroying its encryption key."
   ],
   [
    "Secure erase",
    "A built-in drive command that resets all storage cells, the preferred software method for SSDs."
   ],
   [
    "Certificate of destruction",
    "A document confirming which media were destroyed, how, when and by whom."
   ],
   [
    "Chain of custody",
    "A record of everyone who handled media from collection to destruction."
   ]
  ],
  "example": "A hospital retires forty servers. The drives are removed and logged by serial number, destroyed by a shredding vendor on-site while staff watch, and the vendor issues a certificate of destruction that is attached to each asset record in the CMDB. The servers are removed from DNS, backups and monitoring beforehand, and the empty chassis go to a certified electronics recycler.",
  "mistakes": [
   [
    "Formatting a drive is enough before recycling it.",
    "Formatting removes file system pointers, not the data. Recovery tools can often restore it. Use wiping, secure erase, crypto-erase, degaussing or destruction."
   ],
   [
    "Degaussing is a good way to sanitize SSDs.",
    "SSDs store data in flash memory cells, not magnetic domains, so a magnet does nothing. Use secure erase, crypto-erase or physical destruction."
   ],
   [
    "A degaussed hard drive can be reused after reformatting.",
    "Degaussing destroys the drive's factory servo information, so the drive is no longer usable."
   ],
   [
    "Destroying the drive is the whole job.",
    "Without a certificate of destruction and updated asset records, you cannot prove to auditors what happened to each drive. Decommissioning also includes removing the server from DNS, backups, monitoring and the directory."
   ]
  ],
  "tryit": [
   [
    "Oakmont School District is retiring twelve servers. Six have HDDs that will be reused in a lab after sanitizing; the other six have SSDs that held student records and will go to a recycler. Which sanitization methods fit each group?",
    "For the HDDs being reused, wipe them with a verifying overwrite tool (degaussing would ruin them). For the SSDs with sensitive data leaving the organization, use secure erase or crypto-erase and then physical destruction by shredding, and obtain a certificate of destruction listing each serial number. Update the asset records for both groups."
   ]
  ],
  "tip": "Degaussing works only on magnetic media, never SSDs. Formatting is not sanitization. For SSDs use secure erase, crypto-erase or physical destruction, and always keep a certificate of destruction tied to the asset records.",
  "check": [
   [
    "Why is degaussing useless for an SSD?",
    "SSDs store data in flash memory cells, not magnetic domains, so a magnetic field does not erase them."
   ],
   [
    "What proves to an auditor that drives were destroyed properly?",
    "A certificate of destruction listing serial numbers, method and date, matched to updated asset records."
   ],
   [
    "Which method allows a hard drive to be reused: wiping or degaussing?",
    "Wiping. Degaussing destroys the servo information the drive needs to operate."
   ]
  ]
 },
 {
  "t": "Backup types: full, incremental, differential, synthetic full, snapshot; backup media and rotation (grandfather-father-son), 3-2-1 rule",
  "hook": "Thursday, 3:40 p.m., at Brightwater Architects. The project file server's RAID controller has failed and taken the array with it. The partners have a client presentation tomorrow morning, and everyone is looking at you. You open the backup console and see a full backup from Sunday, then a string of smaller jobs from Monday, Tuesday and Wednesday. Your colleague Sam swears the small jobs are differentials. The job names say incremental. The answer decides whether you restore two backup sets or four, and whether a single bad tape means losing Tuesday's work. Which is it, and why does it matter so much?",
  "simple": "A backup is a spare copy of your data. A full backup copies everything every time, which is slow but easy to restore. An incremental backup copies only what changed since the last backup of any kind, so it is quick, but to restore you need the full backup plus every small backup after it, in order. A differential copies everything changed since the last full backup, so it grows each day, but restoring needs only the full plus the latest differential. Think of a diary: a full backup is photocopying the whole diary; an incremental is photocopying only yesterday's page; a differential is photocopying every page written since the last full copy. The 3-2-1 rule says keep three copies, on two kinds of storage, with one kept somewhere else.",
  "body": [
   "Backups are copies of data that let you recover from accidental deletion, corruption, hardware failure, ransomware and disasters. Server+ tests the main backup types, how each one affects backup time, storage use and restore time, the media used to hold backups, and the rotation schemes that decide how long copies are kept. Most exam questions come down to one skill: given a schedule and a failure, which backup sets do you need to restore?",
   "A full backup copies all selected data every time it runs. It is the simplest to restore, because you need only one backup set, but it takes the longest to run and uses the most storage. To know what has changed since a previous backup, backup software tracks changes, traditionally with the archive bit, a file attribute on Windows that is set whenever a file is modified, or with change tracking in the file system or hypervisor, such as changed block tracking for virtual machines. A full backup normally clears the archive bit, marking everything as backed up.",
   "An incremental backup copies only the data changed since the last backup of any kind, full or incremental, and then clears the change markers. Incrementals are fast and small, which makes them attractive for nightly jobs in short backup windows. The trade-off appears at restore time: you need the last full backup plus every incremental since then, applied in order. If one incremental in the chain is missing or damaged, data from that day, and possibly changes depending on it, may be lost.",
   "A differential backup copies everything changed since the last full backup, and it does not clear the change markers. That means each day's differential includes everything the previous differentials did, plus the new changes, so differentials grow larger as the week goes on. Restoring needs only two sets: the last full plus the most recent differential. The comparison is the core exam distinction: incrementals are faster to back up and slower to restore; differentials are slower to back up and faster to restore.",
   "A synthetic full backup is built by the backup server itself, combining an earlier full backup with the incrementals taken since, without reading all the data from the production server again. You gain the simple, fast restore of a full backup without the long backup window and production load of running a real full. This is common in disk-based backup systems that run incrementals forever and periodically synthesize a new full.",
   "A snapshot captures the state of a volume, virtual machine or storage array at a single instant, usually in seconds, using techniques such as copy-on-write or redirect-on-write that preserve original blocks as changes occur. Snapshots are excellent for quick rollback before a risky change and as a consistent source from which a backup job can copy data. However, they usually live on the same storage as the original data, so if the array fails or is encrypted by ransomware, the snapshots go with it. A snapshot on its own is not a backup.",
   "Backup media each have strengths. Disk is fast and is often the first target for nightly jobs. Tape is inexpensive per terabyte, portable and naturally offline once ejected, so it is still widely used for long-term retention and off-site copies. Cloud or object storage is off-site by design and scales easily, though restores depend on available bandwidth. Many organizations combine them: disk for quick restores, then tape or cloud for off-site and long-term copies.",
   "Rotation schemes reuse media on a schedule while keeping a useful spread of restore points. Grandfather-father-son (GFS) is the classic scheme. Daily backups (sons) are kept for about a week, weekly backups (fathers) for about a month, and monthly backups (grandfathers) for a year or longer. GFS provides many restore points, recent ones close together and older ones spaced out, with a limited number of tapes or disk sets.",
   "The 3-2-1 rule is a widely used guideline for backup resilience: keep at least three copies of your data (the production copy plus two backups), on two different types of media or storage, with one copy off-site. Many organizations extend it to defend against ransomware, adding at least one copy that is offline or immutable and requiring zero errors after verified test restores."
  ],
  "analogy": "Imagine keeping a daily diary safe. A full backup is photocopying the whole diary every Sunday. An incremental is photocopying only the page you wrote today, so rebuilding Thursday means Sunday's copy plus Monday's, Tuesday's and Wednesday's pages, in order. A differential is photocopying every page written since Sunday, so rebuilding needs only Sunday's copy and the latest bundle. The analogy stops at snapshots: a snapshot is more like a bookmark in the same diary, so if the diary burns, the bookmark burns with it.",
  "mnemonic": "GFS: Sons are Daily, Fathers are Weekly, Grandfathers are Monthly. Younger generations change more often. And 3-2-1: three copies, two media types, one off-site.",
  "terms": [
   [
    "Full backup",
    "A backup of all selected data; slowest to run, simplest to restore."
   ],
   [
    "Incremental backup",
    "Copies data changed since the last backup of any type; restores need the full plus every incremental since."
   ],
   [
    "Differential backup",
    "Copies data changed since the last full backup; restores need the full plus the latest differential."
   ],
   [
    "Synthetic full",
    "A full backup assembled on the backup server from a prior full and later incrementals."
   ],
   [
    "Snapshot",
    "A point-in-time image of a volume or VM, usually stored on the same storage as the original."
   ],
   [
    "Grandfather-father-son (GFS)",
    "A rotation scheme keeping daily, weekly and monthly backup sets for different retention periods."
   ],
   [
    "Archive bit",
    "A Windows file attribute set when a file changes; cleared by full and incremental backups, not by differentials."
   ]
  ],
  "example": "A server gets a full backup on Sunday and incrementals Monday through Saturday. When it fails on Thursday afternoon, the administrator restores Sunday's full, then Monday's, Tuesday's and Wednesday's incrementals in order. With differentials, only Sunday's full and Wednesday's differential would be needed.",
  "mistakes": [
   [
    "An incremental backup copies everything changed since the last full backup.",
    "That describes a differential. An incremental copies changes since the last backup of any type, full or incremental."
   ],
   [
    "Differentials are faster to back up than incrementals.",
    "Differentials grow each day because they include all changes since the full, so they take longer to run. Their advantage is the faster two-set restore."
   ],
   [
    "Snapshots replace backups.",
    "Snapshots usually share the same storage as the original. If that storage fails or is encrypted, the snapshots are lost too. Copy data to separate media for a real backup."
   ],
   [
    "3-2-1 means three backups, two locations and one tape.",
    "It means three copies of the data in total, on two different media types, with one copy off-site."
   ]
  ],
  "tryit": [
   [
    "Granite Peak Dental runs a full backup every Sunday night and differentials every other night. The server's disk fails Saturday morning. The office manager wants to know how many backup sets the technician will restore and whether the size of each nightly job has been growing.",
    "Two sets: Sunday's full backup and Friday night's differential. Yes, each differential has grown through the week because it includes every change since Sunday's full. If the office used incrementals instead, restoring would need Sunday's full plus every incremental from Monday through Friday."
   ]
  ],
  "tip": "Incremental: fastest backup, slowest restore (full + all incrementals). Differential: slower backup, faster restore (full + last differential). A snapshot is not a backup on its own. 3-2-1 means three copies, two media types, one off-site.",
  "check": [
   [
    "Full backup on Sunday, differentials daily; failure on Friday morning. Which sets do you restore?",
    "Sunday's full backup and Thursday's differential."
   ],
   [
    "Why is a storage snapshot not a complete backup?",
    "It usually depends on the same underlying storage, so if that storage fails the snapshot is lost too."
   ],
   [
    "What does the 3-2-1 rule require?",
    "Three copies of data, on two different media types, with one copy stored off-site."
   ],
   [
    "What advantage does a synthetic full offer?",
    "The fast single-set restore of a full backup without reading all data from the production server again."
   ]
  ]
 },
 {
  "t": "Backup operations: frequency, retention, on-site vs off-site storage, integrity checks, test restores",
  "hook": "For eighteen months the backup dashboard at Meadowbrook Veterinary Hospital has been a wall of green checkmarks. Then on Monday morning the practice management database refuses to start after a storage firmware update, and Jonah, the office manager, is standing at your shoulder while you start the restore. The job finds the backup, begins reading, and stops at 12 percent: the database files were never in the job selection after a volume was added last spring. Every checkmark was honest about what it backed up. None of them told you what it missed. How do you run backups so that this discovery happens on a quiet Tuesday instead of during an emergency?",
  "simple": "Running backups well is about a few everyday choices. How often? That depends on how much recent work you could stand to lose: if losing an hour of orders is a disaster, you back up far more often than once a night. How long do you keep them? Long enough to satisfy laws and to go back past any problem you did not notice right away. Where do you keep them? One copy nearby for quick fixes, and one somewhere else in case the building floods. And most important: do you actually know they work? The only real proof is to restore something on purpose and check it, like a fire drill for your data.",
  "body": [
   "Choosing backup types is only the start. Backup operations are the day-to-day decisions and routines that make backups usable when you need them: how often jobs run, how long copies are kept, where they are stored, and how you prove they work. Many backup failures are not caused by bad software but by operational gaps, such as a new server never added to a job or an off-site tape that was never collected.",
   "Backup frequency is driven by how much data the business can afford to lose, called the recovery point objective (RPO). If the RPO for an order database is 15 minutes, a nightly backup is not enough; you need frequent transaction log backups, storage snapshots copied off the array, or replication. A file share that changes slowly may need only a nightly job. Schedule backups in windows that avoid heavy production load, and watch that each job finishes before the next one begins, because overlapping jobs slow production and can fail silently.",
   "Consistency matters as much as frequency. Copying the files of a running database can capture them halfway through a transaction, producing a backup that will not open. Application-aware backups coordinate with the application so data is captured in a consistent state. On Windows, the Volume Shadow Copy Service (VSS) lets applications such as database and mail servers pause and flush writes for a moment while a snapshot is taken; databases also offer their own backup interfaces and log backups. When a question mentions a database that restores but will not mount, application awareness is often the missing piece.",
   "Retention is how long each backup is kept before it expires. It is set by legal and regulatory requirements, business needs and storage cost, and it is usually tiered: daily backups kept for a few weeks, monthly backups for a year, yearly backups for several years. Retention should match the organization's broader data retention policy, and expired backups should be deleted securely, especially when they contain personal data that must not be kept longer than allowed. Retention that is too short creates a different risk: if corruption or ransomware went unnoticed for weeks, every remaining backup may already contain the damage, leaving no clean copy to restore.",
   "Where backups live is a trade-off between speed and survivability. On-site backups, stored in the same building or data center, restore quickly and are convenient for everyday mistakes like a deleted file or a corrupted folder. Off-site backups protect against site-wide disasters such as fire, flood, theft or a regional power outage. Off-site can mean tapes carried by a courier to a secure vault, replication to a second data center, or copies in cloud storage. Because off-site copies take longer to retrieve, most organizations keep both. Encrypt off-site media and track it with a chain of custody, so you always know where each tape is and who handled it.",
   "A backup that has not been verified is a hope, not a plan. Integrity checks confirm that backups were written correctly. They include job logs and alerts that report success, warning and failure; checksums or hashes that compare stored data with the source; and verification passes in which the software reads the backup back after writing it. Review failed and partially successful jobs every day, and investigate warnings about skipped or locked files rather than dismissing them. Also watch for systems that have no backup at all, such as newly built servers or added volumes that no job covers.",
   "Test restores are the only real proof that backups work. Regularly restore individual files, entire servers and application data, ideally into an isolated test environment so restored systems do not conflict with production. Confirm the application actually starts and the data is complete, not just that files appeared. Time the restore to see whether it meets the recovery time objective (RTO), the maximum acceptable downtime. Document the restore procedure so anyone on the team can follow it during a crisis, and include restores in disaster recovery exercises.",
   "Organizations that never test often discover problems only during a real emergency: databases missing from the job, encryption keys for backup media that nobody can find, tapes that were never readable, or restores that take three days when the business expected three hours. A regular schedule of test restores, with results recorded and gaps fixed, turns those discoveries into routine maintenance items."
  ],
  "analogy": "Backups are like a fire extinguisher. Frequency is how often you refill it; retention is how many spares you keep and for how long; off-site storage is keeping one extinguisher in the car in case the house burns. Integrity checks are glancing at the pressure gauge. A test restore is actually pulling the pin during a drill. The gauge can read green on an extinguisher full of the wrong material, just as a job log can report success on a backup that will not restore.",
  "terms": [
   [
    "RPO (recovery point objective)",
    "The maximum acceptable data loss, measured in time; it drives backup frequency."
   ],
   [
    "RTO (recovery time objective)",
    "The maximum acceptable time to restore a service; test restores show whether it can be met."
   ],
   [
    "Retention period",
    "How long a backup copy is kept before it is expired and deleted."
   ],
   [
    "Off-site backup",
    "A backup copy stored at a different location to survive site-wide disasters."
   ],
   [
    "Test restore",
    "Restoring data from backup to verify the backup is complete and usable."
   ],
   [
    "Application-aware backup",
    "A backup that coordinates with an application so its data is captured in a consistent state."
   ]
  ],
  "example": "During a quarterly test restore, an administrator discovers the backup job had been skipping a new database for two months because it was added to a different volume. The team fixes the job selection and adds an alert for unprotected volumes, well before a real failure exposed the gap.",
  "mistakes": [
   [
    "A successful job log proves the backup can be restored.",
    "A job can succeed while omitting data or writing unreadable media. Only test restores prove recoverability."
   ],
   [
    "Backup frequency is set by how much storage is available.",
    "Frequency follows the RPO, how much data loss the business can tolerate. Storage and windows are constraints you plan around."
   ],
   [
    "Keeping backups for a short time is always safer and cheaper.",
    "Short retention may leave no clean copy if corruption or ransomware went unnoticed. Retention must also meet legal requirements."
   ],
   [
    "Off-site backups make on-site backups unnecessary.",
    "Off-site copies are slower to retrieve. On-site copies handle everyday restores quickly; you want both."
   ]
  ],
  "tryit": [
   [
    "Silverline Travel's booking database changes constantly, and management says losing more than 30 minutes of bookings would be unacceptable. Today it gets one nightly backup to a NAS in the same server room, and nobody has restored from it in a year. What three changes would you recommend?",
    "Add transaction log backups or snapshots copied off the array at least every 30 minutes to meet the RPO; add an off-site copy (cloud, second site or vaulted tape) to survive a site disaster; and schedule regular test restores into an isolated environment, timing them against the RTO. Use application-aware backups so the database is consistent."
   ]
  ],
  "tip": "The only way to know backups work is a test restore. Off-site protects against site disasters; on-site speeds everyday recovery. Frequency follows the RPO, restore speed must meet the RTO, and retention must cover both legal needs and slow-to-notice problems.",
  "check": [
   [
    "What determines how often backups must run?",
    "The recovery point objective: how much data loss, measured in time, the business can tolerate."
   ],
   [
    "Why are successful backup job logs not enough?",
    "A job can report success while missing data or producing unreadable media; only test restores prove recoverability."
   ],
   [
    "Why might a very short retention period be dangerous?",
    "If corruption or ransomware goes unnoticed for longer than the retention period, every remaining backup may contain the damage."
   ]
  ]
 },
 {
  "t": "Disaster recovery: hot, warm and cold sites, cloud DR, replication (synchronous vs asynchronous), RPO and RTO, DR plan testing (tabletop, live failover)",
  "hook": "The storm warning comes in at 4 p.m.: the river near Tidewater Freight's only data center is expected to crest overnight. The CIO, Renata, pulls you into a conference room. 'If the building floods, how long until dispatch is running again, and how many shipments do we lose track of?' You know there is a second site across the state with some racks and a replication link, and a disaster recovery binder nobody has opened since it was written. Whether the answer is minutes, hours or a week depends on decisions made long before tonight. What were those decisions, and how would you know if they still hold?",
  "simple": "Disaster recovery is the plan for getting computer systems running again after something big goes wrong, like a fire, flood or cyberattack that takes out a whole building. Two numbers guide the plan. The first is how much recent data you can afford to lose, for example the last hour of orders. The second is how long you can be offline before it really hurts. A backup location can be fully ready to switch on (hot), partly ready (warm), or just an empty room with power (cold): the more ready it is, the more it costs. Data can be copied to the backup site constantly, either instantly or a few seconds behind. And like a fire drill, the plan must be practiced to be trusted.",
  "body": [
   "Disaster recovery (DR) is the set of plans and technology used to restore IT services after a major event such as a fire, flood, extended power loss, cyberattack or regional outage. Backups restore data; DR restores whole services, often at a different location, with the servers, networking, storage and procedures needed to run them. DR is one part of the larger business continuity effort, focused on the technology.",
   "Two measurements drive every DR decision. The recovery point objective (RPO) is the maximum acceptable data loss, measured backward in time from the moment of the disaster. An RPO of one hour means you must be able to recover data as it existed no more than an hour before the event. The recovery time objective (RTO) is the maximum acceptable time to restore the service after the disaster, measured forward. A simple way to keep them apart: RPO looks back at data, RTO looks forward at downtime. Lower RPO and RTO values cost more, so they are set per service according to business impact rather than one value for everything.",
   "Recovery sites differ in readiness and cost. A hot site is a fully equipped facility with hardware, network connections and current data, often continuously replicated, ready to take over in minutes to hours. It is the most expensive option because you are paying for a second environment that mostly waits. A warm site has power, network connectivity and some or all of the hardware, but data and systems must be restored or brought up to date before use, so recovery takes hours to days. A cold site is space with power and cooling but little or no equipment; you must ship in hardware, install it and restore from backups, which takes days to weeks. It is the cheapest option.",
   "Cloud DR uses a cloud provider as the recovery site. Data and virtual machine images are replicated to the cloud, and servers are started there only when needed, so the organization pays mainly for storage until a disaster or test. This can deliver recovery close to a hot site at much lower standing cost. It still requires careful planning: networking and Internet Protocol (IP) addressing in the cloud, DNS (Domain Name System) changes so users reach the new location, software licensing that allows running in the cloud, security controls, and enough bandwidth to fail back, meaning return operations to the primary site, once it is repaired.",
   "Replication keeps a copy of data at another site, and the way writes are confirmed determines the achievable RPO. Synchronous replication writes data to both sites before confirming the write to the application, so the remote copy is always current and the RPO is effectively zero. The cost is latency: every write waits for the round trip to the remote site, so synchronous replication is practical only over short distances with fast, reliable links, such as between data centers in the same metropolitan area.",
   "Asynchronous replication confirms each write locally and sends it to the remote site shortly afterward, in seconds or minutes. It works over long distances and slower links without slowing the application, but the most recent writes that had not yet been sent may be lost in a disaster, so the RPO is small but not zero. Many organizations combine the two: synchronous replication to a nearby site for near-zero data loss, and asynchronous replication to a distant site or cloud region to survive a regional disaster.",
   "A DR plan documents who has authority to declare a disaster, contact lists, service priorities, step-by-step recovery procedures, and how to fail back and return to normal operations. It should be stored where it can be reached when the primary site is unavailable, such as printed copies and a copy in a separate system. A plan that has never been tested is mostly assumptions, so testing is part of the plan itself.",
   "DR tests range from low to high disruption. A tabletop exercise is a discussion-based walk-through in which the team talks through a scenario around a table to find gaps in roles, contacts and procedures, without touching any systems. A walkthrough or simulation goes further, with staff stepping through procedures or simulating actions. A parallel test brings up systems at the DR site and verifies they work, without stopping production. A live, or full, failover actually moves production to the DR site. It is the most realistic test and the most disruptive, so it needs careful scheduling and a rollback plan. Update the DR plan after every test and after every significant change to systems."
  ],
  "analogy": "Recovery sites are like preparing for a house fire. A hot site is a fully furnished second home with fresh groceries, ready to move into tonight. A warm site is a rented apartment with furniture but no groceries and boxes still to unpack. A cold site is an empty lot with utilities hooked up: you must bring a trailer and everything in it. The analogy stops at replication: a second home does not automatically copy your latest mail, but replication keeps the DR site's data current.",
  "mnemonic": "Hot, Warm, Cold follows Fast, Medium, Slow recovery and High, Medium, Low cost. RPO points back to data (Point in time), RTO points forward to Time to recover.",
  "terms": [
   [
    "RPO (recovery point objective)",
    "The maximum acceptable amount of data loss, measured in time."
   ],
   [
    "RTO (recovery time objective)",
    "The maximum acceptable time to restore a service."
   ],
   [
    "Hot site",
    "A fully equipped recovery site with current data, ready to take over quickly."
   ],
   [
    "Warm site",
    "A recovery site with power, network and some hardware, needing data restoration before use."
   ],
   [
    "Cold site",
    "A recovery facility with space, power and cooling but little or no equipment."
   ],
   [
    "Synchronous replication",
    "Replication that confirms a write only after both sites have it, giving near-zero data loss at the cost of latency."
   ],
   [
    "Asynchronous replication",
    "Replication that confirms writes locally and sends them later, allowing distance with a small RPO."
   ]
  ],
  "example": "A bank replicates its core database synchronously to a second data center across town (RPO near zero) and asynchronously to a cloud region hundreds of miles away. A yearly live failover to the nearby site confirms it can resume transactions within its 30-minute RTO, and a tabletop exercise each quarter keeps contact lists and roles current.",
  "mistakes": [
   [
    "RPO is how long it takes to recover.",
    "That is RTO. RPO is how much data, measured in time, you can afford to lose."
   ],
   [
    "Asynchronous replication gives zero data loss.",
    "Writes not yet sent when disaster strikes are lost. Synchronous replication is the option with an effectively zero RPO."
   ],
   [
    "A warm site is ready to take over in minutes.",
    "A warm site needs data restored or updated and systems brought up, typically hours to days. A hot site takes over in minutes to hours."
   ],
   [
    "A tabletop exercise tests the systems.",
    "A tabletop exercise is discussion only and changes no systems. Parallel tests and live failovers exercise the technology."
   ]
  ],
  "tryit": [
   [
    "Juniper Ridge Clinic's management says the patient scheduling system can lose at most 15 minutes of data and must be back within 4 hours. The budget cannot cover a fully staffed second data center. The nearest affordable facility is 600 miles away. What DR approach fits?",
    "Asynchronous replication (or frequent replication to cloud storage) to a distant cloud DR environment or warm site that can be started within 4 hours. Asynchronous suits the long distance and meets a 15-minute RPO; synchronous would add too much latency over 600 miles. Validate with a parallel test that the RTO can actually be met."
   ]
  ],
  "tip": "RPO is about data loss (how far back), RTO is about downtime (how long). Hot is fastest and costliest, cold is slowest and cheapest. Synchronous means near-zero data loss but short distances; asynchronous allows distance with some loss. Tabletop touches no systems; live failover is most realistic and most disruptive.",
  "check": [
   [
    "A company can lose at most 4 hours of data and must be running within 8 hours. Which is the RPO?",
    "4 hours; the RPO measures acceptable data loss, while 8 hours is the RTO."
   ],
   [
    "Which DR test involves no system changes at all?",
    "A tabletop exercise, where the team discusses the scenario and procedures."
   ],
   [
    "Why is synchronous replication limited by distance?",
    "Each write waits for acknowledgment from the remote site, so long distances add latency to every transaction."
   ]
  ]
 },
 {
  "t": "Business continuity: BIA, MTBF and MTTR, prioritizing critical services, communication plans",
  "hook": "The power has been out at Lantern Bay Foods' distribution center for three hours, and the generator is running, but only half the building is on it. Your phone shows forty unread messages. The warehouse supervisor wants the shipping system back first. Finance says payroll runs tonight. Sales insists the online store matters most. Someone in marketing has already posted on social media that 'everything is fine.' You are the server administrator, not the CEO, but everyone is asking you what to restore first. Who should have decided this, when, and how should all these people be hearing about it?",
  "simple": "Business continuity is about keeping the whole organization working through a crisis, not just fixing computers. It starts by asking each department: what do you do, what do you need to do it, and how bad is it if you stop for an hour, a day or a week? That study is called a business impact analysis. Its answers tell IT which systems to bring back first. Two numbers help plan for hardware problems: how long equipment usually runs between breakdowns (longer is better), and how long it takes to fix (shorter is better). Finally, a communication plan makes sure the right people hear the right message, the way a school has a phone tree to tell parents about a snow day.",
  "body": [
   "Business continuity planning (BCP) is broader than disaster recovery (DR). DR focuses on restoring IT systems; business continuity asks how the whole organization keeps delivering its essential functions during and after a disruption, including people, facilities, suppliers and manual workarounds such as taking orders on paper. IT is a major part of that plan, and server administrators contribute the technical pieces: inventories, dependencies, reliability data and recovery procedures.",
   "The foundation is the business impact analysis (BIA). A BIA identifies the organization's business processes, the systems, people, suppliers and facilities each one depends on, and the impact over time if each process stops. Impacts include lost revenue, legal or regulatory penalties, safety risks, missed contractual obligations and reputational damage. The BIA usually shows that impacts grow with time: an hour of downtime might be an inconvenience, while a day might mean missed shipments and penalty clauses.",
   "From that analysis come the recovery objectives for each process: the recovery time objective (RTO), the recovery point objective (RPO), and the maximum tolerable downtime (MTD), the point beyond which the organization suffers unacceptable or even irreversible harm. The RTO must be shorter than the MTD to leave a margin. The BIA also reveals dependencies that are easy to overlook, for example that the ordering system is useless without DNS (Domain Name System), the directory service and the link to the payment gateway, even though none of those appear in the ordering team's own description of their work.",
   "Reliability metrics help predict failures and plan for them. MTBF (mean time between failures) is the average operating time between failures of a repairable component or system; a higher MTBF means more reliable equipment. Vendors publish MTBF figures for drives, power supplies and other components, and you can calculate it from your own records by dividing total operating time by the number of failures. MTBF is an average across many units, not a promise about any one device, which is why redundancy is still needed. Some frameworks also use MTTF (mean time to failure) for items that are replaced rather than repaired.",
   "MTTR (mean time to repair, or to recover) is the average time it takes to restore a failed component or service to operation. It includes detecting the problem, diagnosing it, obtaining parts, making the repair and verifying the fix. A lower MTTR is better. You can improve MTTR with spare parts on site, clear documentation and runbooks, monitoring that alerts quickly, trained staff and faster vendor support contracts, such as four-hour on-site response rather than next-business-day. Together, higher MTBF and lower MTTR mean higher availability. The relationship is often written as availability equals MTBF divided by the sum of MTBF and MTTR, which shows why cutting repair time is just as valuable as buying more reliable parts: a component that fails a little more often but is fixed in minutes can deliver better availability than one that rarely fails but takes days to repair.",
   "Not everything can be restored at once, so critical services must be prioritized. Using the BIA, rank services into tiers. Tier one, restored first, typically includes authentication, core networking and the revenue-generating or safety-critical applications. Supporting services come next, and everything else after that. Recovery order must also respect technical dependencies: there is no point starting application servers before directory services, DNS and databases are running, because the applications will simply fail to start or fail to authenticate. Document this order in the plan, so nobody has to decide it under pressure.",
   "A communication plan decides who is told what, when and how during an incident. It includes an up-to-date call tree or contact list for staff, management, vendors and service providers; designated spokespeople for customers, media and regulators; prepared message templates; and alternative channels in case email, phones or the corporate chat system are down. Clear communication prevents duplicated work, conflicting messages and panic, and keeps unauthorized people from making public statements. Some regulations also require notifying regulators or affected individuals within set time frames, which makes the plan a compliance tool as well.",
   "Business continuity plans also cover succession, meaning who can make decisions if leaders are unavailable, alternate work locations and remote access for staff, and agreements with key suppliers. Like DR plans, they must be reviewed and tested regularly, and updated whenever systems, staff or business priorities change, so the plan on the shelf matches the organization as it actually is."
  ],
  "analogy": "Think of a hospital during a blackout. The BIA is the list deciding that operating rooms and intensive care get generator power before the gift shop. MTBF is how long the generators usually run without trouble; MTTR is how quickly the maintenance crew can fix one, faster if spare parts are in the basement. The communication plan is the overhead announcement system and the phone tree to families. Where it differs: in IT, dependencies like DNS are invisible to users, so the BIA must dig for them deliberately.",
  "terms": [
   [
    "BIA (business impact analysis)",
    "An analysis of business processes, their dependencies and the impact of their disruption over time."
   ],
   [
    "MTD (maximum tolerable downtime)",
    "The longest a process can be unavailable before the organization suffers unacceptable harm."
   ],
   [
    "MTBF (mean time between failures)",
    "The average operating time between failures of a repairable item; higher is better."
   ],
   [
    "MTTR (mean time to repair)",
    "The average time needed to restore a failed item or service; lower is better."
   ],
   [
    "Communication plan",
    "The documented process, contacts, spokespeople and channels for sharing information during an incident."
   ],
   [
    "Call tree",
    "A structured contact list in which each person notifies a defined set of others."
   ]
  ],
  "example": "A BIA shows that the online store loses significant revenue each hour it is down, while the internal wiki can wait two days. The IT team places the store, its database and its dependencies (DNS, directory and payment gateway links) in recovery tier one and keeps spare drives and power supplies on site to lower its MTTR.",
  "mistakes": [
   [
    "A lower MTBF is better.",
    "MTBF is time between failures, so higher means more reliable. It is MTTR, time to repair, where lower is better."
   ],
   [
    "Business continuity and disaster recovery are the same thing.",
    "DR restores IT systems. Business continuity covers the whole organization, including people, facilities, suppliers and manual workarounds."
   ],
   [
    "IT should decide which services to restore first.",
    "Priorities come from the BIA, which involves business owners. IT contributes dependencies and technical recovery order."
   ],
   [
    "Restore the most important application first, regardless of anything else.",
    "Dependencies such as DNS, directory services and databases must be running first, or the application will not work."
   ]
  ],
  "tryit": [
   [
    "Willow Creek Hotel's BIA ranks the reservation system as tier one and the staff training portal as tier three. During a test, the team restores the reservation application servers first, but nobody can log on and the app cannot find its database. What went wrong, and how should the plan change?",
    "The recovery order ignored dependencies. Directory services (authentication), DNS and the reservation database must be restored before the application servers. The plan should list tier-one services along with their supporting infrastructure in dependency order."
   ],
   [
    "A storage vendor's drives have a higher MTBF than a competitor's, but the competitor offers four-hour on-site replacement while the first offers next-business-day. Which factor affects MTTR?",
    "The support contract. Four-hour on-site replacement reduces the time to obtain parts, lowering MTTR. MTBF affects how often failures happen, not how long repairs take."
   ]
  ],
  "tip": "Higher MTBF is good (fails less often); lower MTTR is good (fixed faster). The BIA comes first and produces the priorities and objectives, including RTO, RPO and MTD, that DR plans implement. Restore in dependency order.",
  "check": [
   [
    "What does a BIA produce that DR planning uses?",
    "The criticality of each process, its dependencies and recovery objectives such as RTO, RPO and maximum tolerable downtime."
   ],
   [
    "How can keeping spare parts on site improve availability?",
    "It lowers MTTR by removing the wait for parts delivery."
   ],
   [
    "Why does a communication plan include alternative channels?",
    "Email, phones or chat may be down during the incident, so the plan needs other ways to reach people."
   ]
  ]
 },
 {
  "t": "The CompTIA troubleshooting methodology: identify, theory, test, plan, implement, verify, document",
  "hook": "Monday, 9:05 a.m., at Kestrel Accounting. The ticket queue lights up: the shared file server is crawling. Your newest teammate, Ben, has already rebooted it twice, updated the NIC driver and is reaching for the RAID controller settings. Nothing has helped, and now nobody knows which of his changes did what. Over coffee you pull up the monitoring graphs and notice something Ben skipped entirely: a backup job was moved to business hours on Friday. Fixing problems is not about trying things until one works. It is about asking the right questions in the right order. What is that order, and which step did Ben skip?",
  "simple": "Troubleshooting is detective work with a checklist. First you find out exactly what is wrong by asking questions and looking at clues, especially what changed recently. Then you make your best guess about the cause, starting with simple things. You check whether the guess is right before fixing anything. If it is, you plan the fix, tell the people affected, and carry it out carefully. Then you make sure everything really works again and think about how to stop it happening twice. Through it all you write down what you found and did. It is like a doctor: ask about symptoms, form a diagnosis, run a test, plan treatment, treat, check the patient recovered, and update the medical chart.",
  "body": [
   "Troubleshooting is a skill you can make systematic. CompTIA uses a standard methodology across its certifications, and Server+ questions often describe a technician's actions and ask which step comes next or which step was skipped. Following the steps in order keeps you from guessing, from making changes that hide the real cause, and from fixing one problem while creating another, which is especially costly on a production server that many people depend on.",
   "Step 1 is to identify the problem and determine its scope. Gather information from logs, error messages and monitoring tools. Question users about what they see, when it started and whether it is constant or intermittent. Identify the symptoms, and determine whether anything changed recently, such as updates, new hardware, configuration changes or a moved scheduled job; recent changes are among the most common causes. Try to reproduce the problem, and approach multiple problems individually rather than as one tangle. Before making any changes, back up data and configurations where appropriate, because some fixes are destructive. Clarify the scope: one user, one server, one site or everyone.",
   "Step 2 is to establish a theory of probable cause. Question the obvious first, such as a loose cable, a full disk, a stopped service or an expired password, before assuming something exotic. Look for a common element: if every affected user is on one switch or uses one application, that narrows the search. Consider multiple approaches, for example working through the OSI (Open Systems Interconnection) model from the physical layer up or from the application layer down, or dividing the problem in half repeatedly to isolate the faulty component. Research symptoms in vendor documentation and knowledge bases.",
   "Step 3 is to test the theory to determine the cause. If testing confirms the theory, move on to planning the fix. If it does not, establish a new theory, or escalate to a more experienced colleague, another team or the vendor. Testing should avoid making permanent changes where possible: check a performance counter, read a log, compare against a known-good configuration, or swap in a known-good cable. A good test either confirms or rules out the theory clearly. For instance, if you suspect a failing drive is slowing a server, checking the redundant array of independent disks (RAID) controller log and the drive's health status is a safe test; pulling the drive from a degraded array to see what happens is not. Keep notes on each theory you rule out, because a disproved theory is useful information too.",
   "Step 4 is to establish a plan of action to resolve the problem and identify potential effects, and to notify impacted users. In a server environment this usually means following change management: scheduling a maintenance window, documenting the steps, getting approval and preparing a rollback plan in case the fix makes things worse. Restarting a production database server at noon may fix one user's problem while interrupting hundreds of others, so the plan considers the whole picture.",
   "Step 5 is to implement the solution or escalate as necessary. Make one change at a time where you can, so you know which change fixed the problem and can roll back cleanly if a change causes harm. Step 6 is to verify full system functionality and, if applicable, implement preventive measures. Confirm with users that the service works end to end, not just that a service shows as started, and consider what would stop the problem from recurring: additional monitoring, a patch, a capacity increase or a scheduling change. The Server+ objectives also call for performing a root cause analysis once the system is working, so you understand why the fault happened, not only how it was fixed.",
   "Step 7 is to document findings, actions and outcomes throughout the process, not only at the end. Record the symptoms, the theories tested, the cause, the fix and the time taken in the ticketing system or knowledge base. Documentation helps the next technician who sees the same symptoms, supports root cause analysis and trend reporting, and gives change management an accurate record of what was altered on the server.",
   "A useful memory aid uses the first letter of each step's key word: identify, theory, test, plan, implement, verify, document. When an exam question describes a scenario, map each action to a step and look for the gap, such as a fix applied before any theory was tested, or a ticket closed without confirming with users."
  ],
  "analogy": "The methodology works like a doctor's visit. The doctor asks about symptoms and recent changes (identify), forms a likely diagnosis (theory), orders a test to confirm it (test), discusses a treatment plan and side effects with you (plan), gives the treatment (implement), checks at a follow-up that you are well and suggests prevention (verify), and writes everything in your chart (document). Where it differs: a doctor rarely needs a rollback plan, but a server change can and should be reversible.",
  "mnemonic": "Itchy Turtles Try Pickles In Vinegar Daily: Identify, Theory, Test, Plan, Implement, Verify, Document.",
  "terms": [
   [
    "Scope",
    "How widespread a problem is, such as one user, one server or an entire site."
   ],
   [
    "Theory of probable cause",
    "The best current explanation for a problem, formed after gathering information and tested before acting."
   ],
   [
    "Escalation",
    "Passing a problem to someone with more expertise or authority when you cannot resolve it."
   ],
   [
    "Rollback plan",
    "Documented steps to undo a change if it fails or causes new problems."
   ],
   [
    "Preventive measures",
    "Actions taken after a fix to stop the same problem from happening again."
   ],
   [
    "Root cause analysis",
    "Investigation into the underlying reason a problem occurred, beyond its immediate symptoms."
   ]
  ],
  "example": "Users report a slow file server. The technician checks monitoring and learns a backup job was moved to business hours yesterday (identify), theorizes backup I/O is saturating the disks (theory), confirms disk queue length spikes when the job runs (test), gets approval to move it back (plan), reschedules it (implement), confirms performance with users and adds an alert for jobs scheduled during business hours (verify) and records the fix (document).",
  "mistakes": [
   [
    "Once you have a theory, go straight to fixing it.",
    "Test the theory first. Acting on an untested theory can waste time, cause outages and hide the real cause."
   ],
   [
    "Documentation is the last thing you do, after the ticket is closed.",
    "Document findings, actions and outcomes throughout the process so nothing is lost and colleagues can follow along."
   ],
   [
    "Making several changes at once fixes problems faster.",
    "If it works you do not know which change helped, and if it breaks something you cannot roll back cleanly. Change one thing at a time."
   ],
   [
    "If testing disproves your theory, you have failed and must start over at step 1.",
    "You return to establishing a new theory, or escalate. The information gathered in step 1 is still valid."
   ]
  ],
  "tryit": [
   [
    "A technician at Aspen Hollow Bank gets a call that a print server is offline. Without asking any questions, they replace the server's network card, which does not help, then discover the switch port had been disabled during weekend maintenance. Which steps did they skip, and what should they have done?",
    "They skipped identifying the problem (especially asking what changed recently, which would have revealed the weekend maintenance), establishing and testing a theory before acting, and planning the change. They should have gathered information, questioned the obvious (port status, cabling), tested the theory by checking the switch port, then planned and implemented the fix."
   ],
   [
    "After replacing a failed drive, an administrator sees the RAID rebuild complete and closes the ticket. Two days later users report the application database is still corrupt. Which step was incomplete?",
    "Verify full system functionality. A finished rebuild does not prove the application and data work. The administrator should have confirmed with users that the service worked end to end and considered preventive measures."
   ]
  ],
  "tip": "Know the order and look for the step that was skipped. Question the obvious and ask what changed during step 1; back up before making changes; test before you fix; verify full functionality before documenting, and document throughout.",
  "check": [
   [
    "What should you do if testing disproves your theory?",
    "Establish a new theory, or escalate if you cannot."
   ],
   [
    "Which step includes implementing preventive measures?",
    "Verify full system functionality and, if applicable, implement preventive measures."
   ],
   [
    "Why make one change at a time?",
    "So you know which change fixed the problem and can roll back cleanly if a change makes things worse."
   ],
   [
    "In which step do you notify impacted users of upcoming work?",
    "Establish a plan of action, which includes notifying impacted users and following change management."
   ]
  ]
 },
 {
  "t": "Hardware problems: POST errors and beep codes, overheating, failed fans and power supplies, memory errors, predictive failure alerts, LED indicators",
  "hook": "It is 1:30 a.m. at Riverside Community College when the monitoring system pages you: three servers in rack B7 report high inlet temperature, and one has shut itself down. You drive in, badge through the vestibule and walk into the cold aisle, which does not feel cold. On the shut-down server, an amber light glows next to a fan module, and when you press the power button it beeps in a pattern you do not recognize. Is this one failed fan, three failing servers, or something bigger in the room? The hardware is trying to tell you. Do you know how to read what it is saying?",
  "simple": "Servers are good at warning you when their parts are in trouble. When a server switches on, it runs a quick self-check of its parts, and if something is wrong it shows a message, logs a code or beeps in a pattern you look up in the maker's manual. Small lights on the front and back turn amber when a part like a fan, power supply or disk has a problem. Servers usually have two fans or power supplies for each job, so they keep running when one fails, but you still need to replace it soon. Memory chips can correct tiny errors and report them, and disks can warn you they are wearing out before they actually die. It is like a car dashboard: a warning light does not mean the car stops, but ignore it and you may end up stranded.",
  "body": [
   "Server hardware usually warns you before, or while, it fails. Recognizing those warnings, from startup messages and beep patterns to event log entries and blinking lights, lets you find the failed part quickly and often replace it before users notice. Server+ questions in this area typically describe a symptom and ask for the most likely cause or the best next step.",
   "When a server starts, the firmware runs POST (power-on self-test), checking the processor, memory, storage controllers and other components before handing off to the boot loader. If POST finds a problem, it reports it with an on-screen message, an error code on a front-panel diagnostic display, an entry in the baseboard management controller (BMC) system event log, or beep codes if video output is not yet working. Beep patterns vary by manufacturer and firmware version, so look the pattern up in the vendor's documentation rather than guessing. A server that powers on but displays nothing and beeps repeatedly often has a memory or seating problem; one that shows no signs of life at all, no fans, no lights, points to power.",
   "Overheating causes throttled performance, unexpected shutdowns and shortened component life. Common causes include blocked or dirty air filters, failed fans, missing blanking panels that let hot exhaust recirculate to the front, a chassis cover left off, cables bunched behind the server blocking airflow, equipment installed backward, or a failed cooling unit in the data center. Check temperature sensors through the BMC, compare the inlet temperature against the vendor's supported range, and confirm that racks follow hot aisle and cold aisle orientation. Servers protect themselves by raising fan speed and, at critical temperatures, shutting down to prevent damage. When many servers in the same area overheat at once, suspect the environment rather than each server.",
   "Failed fans and power supply units (PSUs) are usually reported by the BMC and shown by an amber light-emitting diode (LED) on the failed part. Because both are typically redundant and hot-swappable, the server keeps running, but it has lost its protection: one more failure could take it down. Replace the part promptly. For a failed PSU, check the simple causes first: the power cord, the power distribution unit (PDU) outlet, and whether the circuit feeding that PDU has tripped. If both PSUs report input power faults at the same time, suspect the shared power source rather than two units failing simultaneously.",
   "Memory errors range from correctable to fatal. Error-correcting code (ECC) memory detects and corrects single-bit errors and logs each correction. An occasional correctable error is normal, but a growing count of correctable errors on one module is an early warning that it is failing. Uncorrectable errors cause crashes: blue screens on Windows, purple screens on some hypervisors, or kernel panics on Linux. Check the BMC event log for the slot identifier, reseat or replace the module, and follow the vendor's memory population rules for slot order and matching. Mismatched or unsupported modules can also prevent POST from completing.",
   "Many components report predictive failure alerts before they actually fail. Drives use SMART (Self-Monitoring, Analysis and Reporting Technology) to track indicators such as reallocated sectors and read errors, and RAID (redundant array of independent disks) controllers flag a drive as predictive failure when those indicators cross a threshold. Memory and power supplies may also raise predictive alerts. Treat these as scheduled replacements rather than emergencies, but do not ignore them, because a second drive failing while the first is still in the array could cause data loss.",
   "LED indicators give quick, local diagnosis. Green usually means normal operation, while amber or blinking amber means a fault or warning. Many servers have a blue unit identification (UID) LED that you can turn on remotely through the BMC, so the technician in the data center pulls the right server instead of its identical neighbor. Drive bay LEDs show activity, fault and locate status, which helps you replace the correct disk in an array. Colors and blink patterns differ between vendors, so always confirm the exact meaning in the vendor's guide.",
   "Putting it together, a good hardware investigation starts with the BMC event log and visible LEDs, considers whether the problem affects one server or many, checks simple causes such as power cords, PDUs and airflow, and only then replaces parts, following the vendor's procedures and electrostatic discharge precautions."
  ],
  "analogy": "A server's warning systems are like a car's dashboard. The check-engine light (amber LED) tells you something is wrong but the car still drives, like a server with one failed redundant fan. The temperature gauge climbing (BMC thermal alerts) warns of overheating before the engine seizes. The service reminder (SMART predictive failure) says replace this soon, not right now. The analogy stops at beep codes: there is no universal meaning, so you must check the specific vendor's manual.",
  "terms": [
   [
    "POST (power-on self-test)",
    "Firmware checks run at startup that report hardware faults."
   ],
   [
    "Beep code",
    "A pattern of beeps at startup indicating a hardware error; meanings vary by vendor."
   ],
   [
    "ECC memory",
    "Error-correcting code memory that detects and corrects single-bit errors and logs them."
   ],
   [
    "SMART",
    "Self-Monitoring, Analysis and Reporting Technology: drive health tracking that can predict failures."
   ],
   [
    "Predictive failure",
    "An alert that a component, such as a drive, shows signs it is likely to fail soon."
   ],
   [
    "UID LED",
    "A unit identification light used to locate a specific server or component in a rack."
   ]
  ],
  "example": "The BMC reports rising inlet temperatures on every server in one rack. Rather than replacing fans, the technician inspects the rack and finds a new switch installed backwards, blowing hot exhaust into the cold aisle, plus two missing blanking panels. Fixing airflow brings temperatures back to normal.",
  "mistakes": [
   [
    "A server with one failed redundant PSU or fan is fine, so the repair can wait indefinitely.",
    "It is running without protection. One more failure can cause an outage, so replace the part promptly."
   ],
   [
    "Beep codes mean the same thing on every server.",
    "Patterns vary by manufacturer and firmware. Look up the pattern in the vendor's documentation."
   ],
   [
    "Many servers overheating together means many fans failed.",
    "Simultaneous overheating usually points to an environmental cause: cooling unit, blocked airflow, missing blanking panels or reversed equipment."
   ],
   [
    "Correctable ECC errors can always be ignored because they were fixed.",
    "A rising count on one module is an early sign of failure. Monitor it and plan a replacement."
   ]
  ],
  "tryit": [
   [
    "At Elmwood Logistics, a database server's BMC log shows hundreds of correctable memory errors on DIMM slot A3 over the past week, rising each day. The server has not crashed. The application owner asks whether anything needs to be done. What do you recommend?",
    "Schedule a maintenance window to replace (or first reseat) the module in slot A3. A rising count of correctable ECC errors on one module is an early warning that it is failing, and it may soon produce uncorrectable errors that crash the server. Follow the vendor's population rules and verify the errors stop after the change."
   ],
   [
    "A technician is sent to replace a predictive-failure drive in a row of identical servers. How can they be sure they pull the right drive from the right server?",
    "Turn on the server's UID LED remotely through the BMC and use the drive locate function so the bay LED blinks. Confirm the slot in the RAID controller before removing anything, since pulling a healthy drive from a degraded array could cause data loss."
   ]
  ],
  "tip": "Redundant parts failing do not stop the server, so the exam often asks for the next step: check the simple causes (cord, PDU, circuit), then hot-swap the part. Many servers overheating together suggests an environmental cause, not a single fan. Always confirm beep codes and LED meanings in the vendor's documentation.",
  "check": [
   [
    "A drive reports a SMART predictive failure but is still working. What should you do?",
    "Schedule a replacement promptly, since the drive is likely to fail and the array would lose redundancy."
   ],
   [
    "Both power supplies in a server report input power faults at once. What is the likely cause?",
    "A problem with the shared power source, such as a PDU or circuit, rather than two simultaneous PSU failures."
   ],
   [
    "A server powers on and beeps repeatedly with no video. What is a common cause and how do you confirm it?",
    "Often a memory or seating problem; look up the beep pattern in the vendor's documentation and check the BMC event log."
   ]
  ]
 },
 {
  "t": "Storage problems: degraded or failed RAID arrays, controller battery/cache issues, disk full, slow I/O, mount failures, boot device not found, corrupted file systems",
  "hook": "The monitoring dashboard at Cedar Ridge Clinic turns amber just after midnight. Priya, on call for the night, opens the alert: the patient records server reports \"Virtual disk degraded.\" Users are still working, nothing looks broken, and the help desk queue is quiet. Then a second message arrives from the same controller: \"Battery learn cycle failed, cache policy changed.\" A nurse supervisor emails that charting feels sluggish. Priya has a spare drive in the cabinet and a strong urge to start pulling hardware. But which drive is the bad one, is the data protected right now, and what should she touch first so a slowdown does not turn into lost records?",
  "simple": "A server stores its data on disks, and several disks are often grouped together so that if one breaks, the others can keep the data safe. That grouping is called RAID. Storage trouble comes in a few flavors: one disk in the group dies (the group still works but has no safety net), the controller's small backup battery fails (so it slows down to stay safe), the disk fills up, reading and writing gets slow, a disk will not attach, the server cannot find anything to start from, or the stored data gets scrambled. Think of a family photo album with copies kept at grandma's house. If one copy is ruined you still have the other, but you would make a fresh copy before doing anything risky. With storage, the rule is the same: protect the data first, then fix.",
  "body": [
   "Storage problems are among the most serious a server administrator faces because they can mean lost data, not just downtime. A crashed service can be restarted, but a destroyed array cannot be un-destroyed. CompTIA Server+ expects you to recognize the symptoms of each common storage problem and choose a safe next step, which very often means confirming you have a good backup before trying any fix.",
   "Start with RAID (redundant array of independent disks). A degraded RAID array has lost a member drive but is still serving data using mirroring or parity. It is running without protection, and performance usually drops because the controller has to reconstruct the missing data on the fly for every read that touches the failed disk. In the controller utility you might see the virtual disk marked Degraded and one physical disk marked Failed or Missing, and the bay LED for that drive is often amber. The safe sequence is to identify the failed drive using the controller utility and bay LEDs (many controllers can blink a locate LED), verify that you have a current backup, and replace the drive so the array rebuilds. If a hot spare is configured, the rebuild may already have started on its own, and you replace the failed drive later so it becomes the new spare. Never pull the wrong drive, because removing a healthy member from a degraded RAID 5 array takes it past its one-drive tolerance and fails it completely.",
   "A failed array is a different situation: it has lost more drives than its RAID level tolerates, such as two drives in RAID 5 or one drive in RAID 0, which has no redundancy at all. At that point the volume goes offline and data usually has to come from backups. Resist the temptation to initialize or recreate the array to make the error go away, because initializing writes new metadata and can destroy any chance of recovery. Collect the controller logs and consult the vendor or a recovery specialist before taking any action that writes to the disks.",
   "Hardware RAID controllers use a write cache to speed up writes. In write-back mode the controller tells the operating system (OS) a write is complete as soon as it lands in cache memory, then flushes it to disk later. That cached data would vanish in a power loss, so it is protected by a battery backup unit or by a flash module with a capacitor that copies cache to flash if power drops. If the battery fails, is missing, or is charging after a learn cycle, the controller typically switches from write-back to write-through mode for safety, confirming each write only after it reaches disk. Write performance drops sharply, sometimes by half or more, and nothing else looks wrong. Controller event logs and the management utility show cache and battery status, often with a line such as a failed learn cycle or a cache policy change. The fix is to replace the battery or cache module. Forcing write-back without protection makes the numbers look good but risks losing or corrupting data on the next power event.",
   "A full disk causes applications to fail, databases to stop accepting transactions, logs to stop recording and sometimes the OS itself to become unstable. Common culprits are growing log files with no rotation, temporary files, forgotten backup files or memory dumps, and thin-provisioned volumes that filled up the physical storage underneath them. On Linux, `df -h` shows which file system is full and `du` drills down to the directories using the space; on Windows, use File Explorer, Disk Management or storage reporting tools. Clear or archive data safely, then fix the cause with log rotation, quotas, monitoring alerts on free space, or more capacity. On Linux, also check inode exhaustion with `df -i`. Every file uses an inode, so a volume full of millions of tiny files can report free gigabytes yet refuse to create a single new file.",
   "Slow input/output (I/O) shows up as high disk latency, measured in milliseconds per operation, and long queue lengths, where requests wait their turn. Causes include a degraded or rebuilding array, a failed cache battery forcing write-through, a disk nearing failure and retrying reads, misaligned partitions, too many virtual machines (VMs) sharing one datastore, a storage path problem such as a failed path to a storage area network (SAN), or simply a workload that has outgrown its disks. The most useful move is to compare current numbers with a baseline so you can see what changed, rather than guessing.",
   "Mount failures occur when a file system cannot be attached to the directory tree. Typical causes are a wrong entry in `/etc/fstab`, such as a device name like `/dev/sdb1` that changed after a disk was added (which is why universally unique identifiers, or UUIDs, are preferred), a missing iSCSI (Internet Small Computer Systems Interface) or SAN connection, a missing driver, or a corrupted file system. A bad fstab entry can even drop a Linux server into emergency mode instead of booting normally, and the fix is to correct or comment out that line from the emergency shell.",
   "\"Boot device not found\" or \"no bootable device\" means the firmware cannot find a disk it can start from. Check the boot order in firmware setup, whether the boot drive or boot array is present and healthy in the controller utility, whether the firmware is set to UEFI (Unified Extensible Firmware Interface) or legacy BIOS (basic input/output system) mode to match how the OS was installed, and whether the bootloader itself is damaged. A disk installed in UEFI mode with a GPT (GUID Partition Table) layout will not boot if someone switched the server to legacy mode.",
   "Corrupted file systems usually follow power loss, hardware faults or failing disks. Symptoms include unreadable files, file system errors in the logs and volumes that the OS remounts read-only to protect them. Back up whatever you can still read, then run the appropriate repair tool, such as `fsck` on Linux or `chkdsk` on Windows, with the volume unmounted. Finally, investigate the underlying hardware cause, because a repair on top of a dying disk only buys time."
  ],
  "analogy": "A degraded RAID 5 array is like a four-person relay team where one runner is injured and the other three cover the missing leg by running extra. The team still finishes, only slower, and there is no one left to cover if a second runner goes down. Swapping in a fresh runner (the rebuild) restores the team. The analogy stops working in one place the exam cares about: pulling a healthy runner off the track by mistake does not just slow the team, it disqualifies it, and the data goes with it.",
  "terms": [
   [
    "Degraded array",
    "A RAID array that has lost a member drive but still serves data, with no redundancy left until it rebuilds."
   ],
   [
    "Failed array",
    "A RAID array that has lost more drives than its level tolerates, so the volume is offline and data usually comes from backup."
   ],
   [
    "Write-back cache",
    "Controller caching that confirms writes before they reach disk; it requires battery or flash protection."
   ],
   [
    "Write-through",
    "Caching mode that confirms writes only after they reach disk, which is safer but slower."
   ],
   [
    "Inode",
    "A Linux file system entry that describes one file; running out of inodes blocks new files even when space remains."
   ],
   [
    "fstab",
    "The Linux file that lists which file systems to mount at boot and where."
   ]
  ],
  "example": "Write performance on a database server suddenly halves. The RAID controller log shows the cache battery failed its learn cycle, so the controller switched to write-through. The administrator confirms the array itself is optimal, orders a replacement battery module, schedules the swap in a maintenance window, and write-back caching resumes afterward.",
  "mistakes": [
   [
    "Recreating or initializing a failed array will bring the data back.",
    "Initializing writes new metadata over the disks and can destroy any chance of recovery. Collect logs, restore from backup, and consult the vendor before writing anything to a failed array."
   ],
   [
    "A sudden write slowdown on hardware RAID must mean a disk is failing.",
    "With the array still optimal, a sharp write-only slowdown often means the cache battery failed or is charging and the controller dropped to write-through. Check battery and cache status first."
   ],
   [
    "If `df -h` shows free space, the disk cannot be the problem.",
    "A Linux file system can run out of inodes while space remains. `df -i` shows inode usage."
   ],
   [
    "A degraded array is fine to leave alone because users are still working.",
    "Degraded means no redundancy. One more failure (in RAID 5) loses the array, so confirm backups and replace the drive promptly."
   ]
  ],
  "tryit": [
   [
    "After a technician added a second data disk to a Linux file server, the server rebooted into emergency mode. The console says a file system listed for `/data` could not be mounted. The `/etc/fstab` line for `/data` uses `/dev/sdb1`. What most likely happened and what do you do?",
    "Adding a disk can change device names, so `/dev/sdb1` may now point at the new disk or not exist. From the emergency shell, use `blkid` to find the correct UUID, change the fstab entry to use `UUID=` instead of the device name, and reboot. Using UUIDs prevents the problem from returning."
   ],
   [
    "A RAID 5 array on a file server shows one drive Failed and the array Degraded. A colleague offers to pull the drive in bay 3 because he thinks that is the one. What should happen first?",
    "Do not pull anything on a guess. Confirm a current backup exists, then use the controller utility to identify the failed drive and blink its locate LED. Pulling a healthy member would fail the whole array."
   ]
  ],
  "tip": "With a degraded array, confirm a backup first and replace the correct drive. A sudden write slowdown on hardware RAID often means the cache battery failed and the controller dropped to write-through. Free space but cannot create files on Linux means check inodes.",
  "check": [
   [
    "What is the danger of pulling the wrong drive from a degraded RAID 5 array?",
    "Removing a second drive exceeds RAID 5's single-drive tolerance, failing the array and losing data."
   ],
   [
    "A Linux server shows free space but cannot create files. What should you check?",
    "Inode usage with df -i; the file system may have run out of inodes."
   ],
   [
    "Why are UUIDs preferred over device names in /etc/fstab?",
    "Device names like /dev/sdb can change when disks are added or reordered, while a UUID stays tied to the file system, so the right volume mounts every boot."
   ]
  ]
 },
 {
  "t": "Storage tools: disk management, fsck/chkdsk, RAID controller utilities, SMART data, partitioning tools",
  "hook": "It is Monday morning at Lakeview Logistics, and Dario has a ticket that should take five minutes: the SAN team grew the shipping database volume from 500 GB to 800 GB, but the Linux server still reports 500 GB. Next to it in the queue, a Windows file server logged a disk error over the weekend, and someone has already suggested running a repair on the live system drive. A third ticket asks whether a drive that keeps showing pending sectors is really failing. Three problems, three different tools. Pick the wrong tool, or the right tool on the wrong disk, and a quick fix becomes a restore. How does Dario decide what to run, and in what order?",
  "simple": "Servers come with toolboxes for their disks, and each tool has one main job. One tool shows you all the disks and lets you set them up. One checks the filing system on a disk and fixes mix-ups, like a librarian reshelving books that ended up in the wrong place. One manages groups of disks working together. One reads the disk's own health report, like a car's dashboard warning lights. And one draws the boundaries that divide a disk into sections. The big safety rules are simple: check which disk you are pointing at before you change anything, make a backup first, and do not repair a filing system while people are still using it, just as you would not reshelve a library while everyone is pulling books off the shelves.",
  "body": [
   "Knowing which tool to reach for is half of solving a storage problem. CompTIA Server+ expects you to match common tools to their jobs on both Windows and Linux, to read their output, and to know the precautions that keep them from making things worse. The tools fall into five families: disk management, file system checkers, RAID (redundant array of independent disks) controller utilities, SMART (Self-Monitoring, Analysis and Reporting Technology) readers and partitioning tools.",
   "Disk Management is the Windows graphical console, opened with `diskmgmt.msc`, for viewing disks and volumes. You use it to bring new disks online, initialize them with a GPT (GUID Partition Table) or MBR (Master Boot Record) layout, create, extend, shrink and format volumes, assign drive letters, and see whether a disk is offline, unallocated or reporting errors. PowerShell provides the same functions through cmdlets such as `Get-Disk`, `Get-Volume`, `Initialize-Disk` and `New-Partition`, which is how you script the work across many servers, and `diskpart` is the older command-line tool that still appears in recovery environments. A disk presented from a storage area network (SAN) commonly shows as offline when first detected. Bring it online deliberately, and first make sure it is not already in use by another server, because two servers writing to the same non-clustered volume will corrupt it.",
   "File system checkers repair logical damage, meaning the file system's own records of where files live, not physical damage to the platters or flash. On Windows, `chkdsk` scans a volume for file system errors. Running `chkdsk` with no switch only reports problems; `chkdsk /f` fixes errors, and `chkdsk /r` also locates bad sectors and recovers readable data, which includes the work of `/f` and takes much longer on large volumes. If the volume is in use, such as the system drive, chkdsk offers to schedule the check for the next restart. On Linux, `fsck` is the front end that calls a file system specific checker, such as `e2fsck` for ext4, while XFS uses its own `xfs_repair`. The essential rule for all of them is to run on an unmounted file system, or at least one mounted read-only, because repairing a mounted, active file system can corrupt it further. Back up first when you can, since a repair may remove damaged files or move fragments into a lost and found folder.",
   "RAID controller utilities manage hardware arrays. They come in several forms: a firmware configuration utility entered during POST (power-on self-test), a command-line tool from the vendor, a web interface, or integration with the baseboard management controller (BMC) so you can check arrays remotely. Use them to view array and drive status, identify failed or predictive-failure drives, blink bay LEDs to locate a drive physically, assign hot spares, start or monitor rebuilds, check cache and battery status, and review the controller event log. On Linux software RAID, `mdadm` and `cat /proc/mdstat` fill this role, showing each array, its member disks and rebuild progress. On Windows, Storage Spaces is managed in Server Manager or with PowerShell.",
   "SMART data comes from the drive itself, which tracks its own health. Tools such as `smartctl` from the smartmontools package on Linux, vendor utilities, or the RAID controller's pass-through view show attributes like reallocated sector count, current pending sectors, power-on hours, temperature and, for solid-state drives (SSDs), wear level or percentage used. Rising reallocated or pending sector counts are warning signs to replace a drive before it fails outright, and many controllers mark such a drive as predictive failure. Behind a hardware RAID controller the OS may see only the virtual disk, so you may need controller-specific options to read SMART from each physical drive. SMART is an early warning system rather than a guarantee: a drive can fail without warning, which is why redundancy and backups still matter.",
   "Partitioning tools create and change partitions. On Linux, `fdisk` handles MBR and, in modern versions, GPT disks, while `gdisk` focuses on GPT and `parted` supports GPT and resizing. To see what you are working with, `lsblk` shows block devices as a tree with sizes and mount points, and `blkid` shows file system types and UUIDs (universally unique identifiers). Logical Volume Manager (LVM) commands add a flexible layer: `pvcreate` prepares a physical volume, `vgextend` adds it to a volume group, and `lvextend` grows a logical volume.",
   "Growing storage is a two-step job that the exam likes to test. After extending a partition or logical volume, the file system inside it still has its old size until you grow it too, for example with `resize2fs` for ext4 or `xfs_growfs` for XFS. Both can grow a mounted file system online. On LVM, `lvextend -r` resizes the file system in the same step. On Windows, Disk Management's Extend Volume or the PowerShell `Resize-Partition` cmdlet handles both layers for NTFS volumes.",
   "Above all, double-check the target device before writing. Partitioning, initializing or formatting the wrong disk destroys its data in seconds, and device names like `/dev/sdb` can change between boots. Confirm by size, serial number or UUID with `lsblk` or `blkid` before you press Enter."
  ],
  "analogy": "A file system is like a library catalog, and the disk is the shelves. Growing a partition is like building more shelving onto the room: the space exists, but the catalog does not know about it until you update it, which is what resize2fs or xfs_growfs does. A checker such as fsck is the librarian fixing catalog cards that point to the wrong shelf. The analogy breaks down for bad sectors: chkdsk /r can mark damaged shelf spots as unusable, but no checker can repair failing hardware, which is what SMART warns you about.",
  "terms": [
   [
    "chkdsk",
    "Windows tool that checks and repairs file system errors; /f fixes errors and /r also scans for bad sectors."
   ],
   [
    "fsck",
    "Linux file system consistency checker, run on unmounted file systems; it calls tools such as e2fsck for ext4."
   ],
   [
    "smartctl",
    "A command-line tool from smartmontools that reads SMART health data from drives."
   ],
   [
    "parted",
    "A Linux partitioning tool that supports GPT disks and resizing."
   ],
   [
    "mdadm",
    "The Linux tool for creating and managing software RAID arrays."
   ],
   [
    "resize2fs / xfs_growfs",
    "Commands that grow an ext4 or XFS file system to fill an enlarged partition or logical volume."
   ]
  ],
  "example": "An ext4 data volume on Linux is extended on the SAN. The administrator runs `lsblk` to confirm the new size, uses `parted` to grow the partition, runs `resize2fs` to grow the file system online, and checks with `df -h` that users see the extra space.",
  "mistakes": [
   [
    "Extending the partition or logical volume is enough to give users more space.",
    "The file system must also be grown with resize2fs, xfs_growfs or lvextend -r. Until then, df -h shows the old size."
   ],
   [
    "It is fine to run fsck or chkdsk /f on a busy, mounted volume to save time.",
    "Repairing a mounted, active file system can corrupt it. Unmount it, mount it read-only, or let chkdsk schedule the check at restart."
   ],
   [
    "chkdsk /f is the switch that finds bad sectors.",
    "/f fixes file system errors. /r locates bad sectors and recovers readable data, and it includes /f."
   ],
   [
    "A drive that passes SMART will not fail.",
    "SMART gives early warning for many failures but not all. Redundancy and backups are still required."
   ]
  ],
  "tryit": [
   [
    "A new 2 TB LUN from the SAN appears as Offline in Disk Management on a Windows server. The SAN admin mentions the same LUN number was used last month for a cluster test. What do you check before bringing it online and initializing it?",
    "Confirm with the SAN team that the LUN is mapped only to this server and holds nothing needed. Initializing a disk another server is using would destroy that data, and two non-clustered servers writing to it would corrupt it. Once confirmed, bring it online, initialize it as GPT, and create the volume."
   ],
   [
    "`smartctl` on a Linux server shows a data drive's reallocated sector count rose from 8 to 140 in a week, with 12 pending sectors. The drive is a member of a RAID 1 mirror and the array is still optimal. What do you do?",
    "Treat it as a drive nearing failure. Confirm backups, then schedule replacement of that drive while the mirror still has a healthy partner, rather than waiting for it to fail and leave the array degraded."
   ]
  ],
  "tip": "Run fsck or chkdsk only on unmounted (or read-only) volumes and back up first. chkdsk /r finds bad sectors and includes /f. Extending a partition is not enough; the file system must be grown too.",
  "check": [
   [
    "Which chkdsk switch also scans for bad sectors?",
    "/r, which locates bad sectors and recovers readable information (it includes /f)."
   ],
   [
    "Which tool would you use to read a drive's reallocated sector count on Linux?",
    "smartctl from the smartmontools package."
   ],
   [
    "Which command shows the status and rebuild progress of Linux software RAID arrays?",
    "cat /proc/mdstat (or mdadm --detail for one array)."
   ]
  ]
 },
 {
  "t": "OS and software problems: failed updates, services not starting, memory leaks, runaway processes, driver issues, boot loops, misconfigured applications",
  "hook": "Every Friday afternoon, the order-processing server at Juniper Outdoor Supply gets so slow that the warehouse team starts printing pick lists by hand. Every Friday evening, Marcus reboots it, and every Monday it is fast again. This week, though, something new happens: after Tuesday night's patching, the server's web service will not start at all, and the console shows only a terse error about a logon failure. Marcus's manager wants to know why this keeps happening and whether the reboot habit is hiding something worse. Is this one problem or two, and where should Marcus look first?",
  "simple": "Not every server problem is a broken part. Very often the trouble is in the software, the programs that run on the server. An update might not install properly. A program might refuse to start because something it needs is missing, like a car that will not start because the battery is dead. A program might slowly hog more and more memory until the server crawls, like a houseguest who keeps spreading their things into every room. Another program might get stuck running in circles and use all the processing power. A driver, the small program that lets the computer talk to a piece of hardware, might be the wrong one. The server might keep restarting on its own. Or a setting might simply be typed wrong. Each problem leaves clues, and the logs are where you find them.",
  "body": [
   "Many server outages are caused not by hardware but by software: an update that did not apply cleanly, a service that will not start, a program slowly eating memory. CompTIA Server+ tests how to recognize these problems from their symptoms and choose the right first step. A good habit for all of them is to ask what changed recently, because software problems very often start right after an update, an install or a configuration edit.",
   "Failed updates show up as error codes in the update history, repeated attempts to install the same patch every night, or a server that reboots and then reports it is undoing changes. Causes include insufficient disk space, interrupted downloads, corrupted update caches, incompatible drivers or software, and pending reboots from earlier updates that block new ones. Start by reading the error code in the update history or logs, free up disk space, and retry. If an update installs but breaks functionality, roll it back and report it to the vendor. Prevention matters as much as repair: testing updates on non-production systems first and deploying them in waves, so only a small group of servers is affected if something goes wrong, reduces the damage.",
   "A service that fails to start usually leaves a clue in the logs. Common causes are a dependency that is not running, for example a web application that needs its database service or a service that needs the network to be up first; a service account whose password changed or expired, so the service cannot log on; missing permissions on a folder it needs to write to; a port already in use by another program; a missing file; or a bad configuration file. On Windows, check the Services console for the service's status, dependencies and Log On tab, and check the System event log, where the Service Control Manager records start failures. On Linux, run `systemctl status servicename` to see the state and the last few log lines, and `journalctl -u servicename` for the full history.",
   "A memory leak happens when a program allocates memory and never releases it, so its usage grows steadily until the server runs low, starts paging heavily to disk or begins killing processes. The classic symptom is a gradual slowdown over hours or days that goes away after a reboot or a service restart, then returns on the same schedule. Confirm it by watching a single process's memory over time in Task Manager, Performance Monitor or `top`; a leak shows a line that climbs and never comes back down, even when the workload is quiet. Restarting the service on a schedule is a reasonable short-term workaround, but it is only a workaround. The real fix is a patch from the vendor or developer.",
   "A runaway process is different: it is stuck consuming very high processor time, often in a loop, and the slowdown is sudden rather than gradual. Identify it with Task Manager or `top` sorted by CPU (central processing unit) usage, determine whether it is a legitimate process, and end it if necessary. Then investigate why it happened, which includes considering malware. An unfamiliar process using all available CPU around the clock may be a cryptominer, and that turns a performance ticket into a security incident.",
   "Driver issues follow new hardware, driver updates or OS (operating system) upgrades. You might see devices missing or flagged with a warning in Device Manager, network or storage adapters failing or dropping out, or blue screens on Windows and kernel panics on Linux that name a driver file. Use vendor-supplied drivers listed on the hardware compatibility list (HCL) that match the installed firmware version, since a driver and firmware that do not match is a common source of instability. If a new driver causes problems, roll it back to the previous version, which Device Manager offers directly.",
   "A boot loop is when a server restarts repeatedly before finishing startup. Causes include a bad update or driver, corrupted system files, a failing boot disk, or the automatic restart on system failure setting, which reboots the server so quickly after a crash that you never see the stop error. The approach is to get the server to a state where you can work: boot into safe mode or the recovery environment on Windows, or choose an older kernel from the boot menu on Linux, then roll back the recent change. Disabling automatic restart on system failure lets you read the stop code, which often names the driver at fault.",
   "Misconfigured applications behave unexpectedly rather than failing outright: they connect to the wrong database because of a bad connection string, listen on the wrong port, lack permissions they need, or misread a configuration file with a typo. Compare the configuration with a known-good baseline or backup copy, check change records to see what was modified recently and by whom, and validate configuration files with the application's own test option, such as a syntax check, before restarting. A syntax check catches a missing bracket before it takes the service down, rather than after."
  ],
  "analogy": "A memory leak is like a kitchen where the cook takes out a clean bowl for every task but never puts any back in the cupboard. For a while nothing seems wrong, then the counters fill up, work slows to a crawl, and finally there is nowhere to set anything down. Clearing the counters (a restart) helps until the next shift, but only teaching the cook to put bowls away (a code fix) ends it. A runaway process is the opposite: one cook stirring the same pot frantically and never stopping.",
  "terms": [
   [
    "Memory leak",
    "A defect where a program keeps allocating memory without releasing it, gradually exhausting RAM."
   ],
   [
    "Runaway process",
    "A process consuming excessive CPU or resources, often stuck in a loop."
   ],
   [
    "Boot loop",
    "A condition where a system restarts repeatedly without completing startup."
   ],
   [
    "Service dependency",
    "Another service that must be running before a given service can start."
   ],
   [
    "Service account",
    "The account a service runs under; if its stored password is wrong or expired, the service cannot start."
   ]
  ],
  "example": "An application server needs a reboot every week because it slows to a crawl. Performance Monitor shows one service's private memory growing steadily from the moment it starts. The administrator schedules a nightly service restart as a workaround and opens a ticket with the vendor, who later ships a patch fixing the leak.",
  "mistakes": [
   [
    "A weekly reboot that fixes the slowdown means the problem is solved.",
    "A slowdown that returns on a schedule and clears after a restart points to a memory leak. The reboot is a workaround; the fix is a patch."
   ],
   [
    "A service that will not start must have a corrupted executable, so reinstall it.",
    "Check the logs first. Dependencies, service account passwords, permissions, port conflicts and configuration errors are far more common causes."
   ],
   [
    "A process at 100 percent CPU should always just be killed and forgotten.",
    "Identify it first. It may be legitimate work, and if it is unfamiliar it could be malware such as a cryptominer, which needs security investigation."
   ],
   [
    "Leaving automatic restart on system failure enabled helps you troubleshoot a boot loop.",
    "It hides the stop error. Disabling it lets you read the stop code, which often names the faulty driver."
   ]
  ],
  "tryit": [
   [
    "A Linux web server's `nginx` service fails to start after a colleague edited its configuration to add a new site. `systemctl status nginx` shows the unit failed. What do you run next, and how would you prevent this next time?",
    "Run `journalctl -u nginx` for details and the application's syntax check (`nginx -t`) to find the error in the configuration, fix it, then start the service. Next time, run the syntax check before restarting, and keep a backup of the last known-good configuration."
   ],
   [
    "Two days after a storage driver update, a Windows server begins restarting during startup. You cannot reach the desktop. What is your plan?",
    "Boot into safe mode or the Windows Recovery Environment, roll back the storage driver to the previous version (or remove the update), and disable automatic restart on system failure so any further crash shows its stop code. Then check the HCL for a driver that matches the controller firmware."
   ]
  ],
  "tip": "Gradual slowdown fixed by a reboot suggests a memory leak. Sudden high CPU from one process is a runaway process. A service that fails right after a password change points to its service account. A crash after a new driver means roll back the driver.",
  "check": [
   [
    "A service will not start after the domain password policy forced a change. What is a likely cause?",
    "The service runs under an account whose stored password no longer matches, so it cannot log on."
   ],
   [
    "What should you do first when a server enters a boot loop after an update?",
    "Boot into safe or recovery mode (or an older kernel) and roll back the recent update or driver."
   ],
   [
    "How do you tell a memory leak from a runaway process?",
    "A leak shows one process's memory climbing gradually over time; a runaway process shows sudden, sustained high CPU."
   ]
  ]
 },
 {
  "t": "OS tools: Event Viewer, system logs and journalctl, Task Manager/top, Performance Monitor, rollback of updates, safe mode",
  "hook": "At 6:40 a.m., Hannah at Riverbend Credit Union gets a text from the branch manager: the loan application server rebooted on its own overnight and the morning batch did not run. The server is up now and looks completely normal. There is no error on the screen, no ticket from the night shift, and the manager wants an explanation before the 9 a.m. meeting. Hannah has a Windows server running the loan front end and a Linux server running the batch jobs, and both have plenty of logs. Which tools will tell her what happened in the minutes before the reboot, and how does she avoid drowning in thousands of harmless messages?",
  "simple": "Every operating system keeps a diary. It writes down when programs start and stop, when something goes wrong and who logged in. On Windows you read that diary with a tool called Event Viewer; on Linux you read files in a log folder or use a command called journalctl. Other tools show what is happening right now, like a car's speedometer: Task Manager on Windows and top on Linux show which programs are using the processor and memory. Performance Monitor is more like a trip recorder, saving measurements over hours or days so you can see patterns. And when a change breaks things, you can undo an update or start the computer in a stripped-down safe mode, like limping a car to the garage in low gear.",
  "body": [
   "Operating systems include the tools you need to find and fix most software problems. CompTIA Server+ expects you to know which tool shows what on Windows and Linux, how to narrow its output to what matters, and when to use recovery options like update rollback and safe mode. The tools fall into three groups: logs that tell you what happened, live monitors that show what is happening now, and recovery options that get a broken system back to a working state.",
   "Event Viewer, opened with `eventvwr.msc`, is the Windows log viewer. The main Windows Logs are Application, for events written by programs; System, for drivers, services and OS (operating system) components; and Security, for logons, privilege use and other audit events, if auditing is enabled. There is also a Setup log and many detailed Applications and Services logs for individual features. Each event has a level (Critical, Error, Warning or Information), a source and an event ID you can look up in vendor documentation. A service that fails to start appears in the System log from the Service Control Manager; an application crash appears in the Application log; a failed logon appears in the Security log. Use filters and custom views to narrow by time, level or source, and use event forwarding to collect events from many servers on a central collector.",
   "Linux logs traditionally live in `/var/log`. Files such as `syslog` (on Debian and Ubuntu) or `messages` (on Red Hat-based systems) hold general system messages, `auth.log` or `secure` hold authentication events, and applications often write their own files there. Systemd-based distributions also keep a binary journal read with `journalctl`. Useful options include `journalctl -u nginx` for one service, `-b` for the current boot and `-b -1` for the previous boot, which is exactly what you want after an unexpected reboot, `-p err` for errors and worse, `--since` for a time range such as `--since \"2 hours ago\"`, and `-f` to follow new entries live. The `dmesg` command shows kernel messages, including hardware and driver errors such as disk timeouts or memory errors.",
   "Live monitoring answers the question of what is using resources right now. Task Manager on Windows shows running processes and their CPU (central processing unit), memory, disk and network use, lets you end a process, and includes Services and Performance tabs. Resource Monitor goes deeper, showing which processes have which files open and which network ports they use. On Linux, `top` and the friendlier `htop` show live processes sorted by CPU or memory along with load averages and memory totals; `ps aux` lists every process at a moment in time, and `kill` sends signals to stop a process. Use `free -h` to see memory and swap use, and `iostat` or `vmstat`, where installed, for disk I/O (input/output) and overall system activity.",
   "Performance Monitor, opened with `perfmon`, records performance counters on Windows over time, such as % Processor Time, Available MBytes, Pages/sec, Avg. Disk Queue Length and network bytes per second. Its key feature for troubleshooting is the data collector set, which logs chosen counters to a file for hours or days. That is how you build performance baselines and how you catch intermittent problems that never happen while you are watching. On Linux, `sar` from the sysstat package collects similar history, and monitoring agents send the same data to a central system.",
   "When an update causes trouble, roll it back. On Windows, uninstall the update from the installed updates list in Settings or Control Panel, or from the command line, and consider pausing updates until the vendor releases a fix. On Linux, package managers can downgrade a package or undo a whole transaction, for example `dnf history undo` followed by the transaction number, and you can boot a previous kernel from the GRUB (GRand Unified Bootloader) menu if a new kernel is the problem. For virtual machines, a snapshot taken just before patching offers a quick rollback path, though snapshots should be removed once the change is confirmed, because they are not backups and grow over time.",
   "Safe mode starts Windows with a minimal set of drivers and services, so you can remove a bad driver, application or update that prevents normal startup. Safe Mode with Networking adds network support, useful when you need to download a driver. The Windows Recovery Environment (WinRE) offers Startup Repair, System Restore, uninstalling updates and a command prompt. Linux offers rescue and emergency targets and single-user mode, reached by editing the boot entry in the boot menu, for similar repairs with only the essentials running. Use these when the system cannot boot, or cannot stay up long enough to fix it normally."
  ],
  "analogy": "Logs are a building's security camera recordings: they tell you what happened at 3:12 a.m., but only if you rewind to the right time and the right camera. Task Manager and top are the live view on the guard's monitor. Performance Monitor is a recorder you set up in advance on the one hallway where trouble keeps happening. The analogy stops working in one way: unlike cameras, logs only capture what the system was configured to record, so Security events appear only if auditing is turned on.",
  "terms": [
   [
    "Event Viewer",
    "The Windows tool for reading Application, System, Security and other event logs."
   ],
   [
    "journalctl",
    "The command for querying the systemd journal on Linux, filterable by unit, boot, priority and time."
   ],
   [
    "dmesg",
    "A Linux command that shows kernel messages, including hardware and driver errors."
   ],
   [
    "Performance Monitor",
    "The Windows tool that displays and logs performance counters over time, using data collector sets."
   ],
   [
    "Safe mode",
    "A Windows startup mode that loads only essential drivers and services for troubleshooting."
   ]
  ],
  "example": "A Linux server rebooted unexpectedly overnight. The administrator runs `journalctl -b -1 -p err` to see errors from the previous boot and finds repeated memory error messages from the kernel just before the reboot, which leads her to the BMC (baseboard management controller) event log and a failing DIMM.",
  "mistakes": [
   [
    "A failed service start is recorded in the Application log.",
    "Service start failures are recorded by the Service Control Manager in the System log. The Application log holds events from programs themselves."
   ],
   [
    "`journalctl -b` shows what happened before last night's crash.",
    "-b alone shows the current boot. Use -b -1 for the previous boot, which is where the events before the crash are."
   ],
   [
    "Task Manager is the right tool for catching a problem that happens once a week at night.",
    "Task Manager shows only what is happening now. Use a Performance Monitor data collector set (or sar on Linux) to record counters over time."
   ],
   [
    "Every logon is automatically in the Security log.",
    "Security log entries depend on audit policy. If auditing is not enabled for an event type, it is not recorded."
   ]
  ],
  "tryit": [
   [
    "A Windows file server slows down every Thursday around 2 a.m., and by morning everything looks normal. Your manager asks you to find out what is happening. Which tool do you set up, and what would you record?",
    "Create a Performance Monitor data collector set that logs processor, memory (Available MBytes, Pages/sec), disk (Avg. Disk Queue Length, Avg. Disk sec/Transfer) and network counters across Thursday night, then compare with Event Viewer entries at the same time. Task Manager will not help because nobody is watching at 2 a.m."
   ],
   [
    "After installing a new kernel and rebooting, a Linux server hangs during startup. The previous kernel worked fine yesterday. What is the quickest path back to service?",
    "At the GRUB menu, choose the previous kernel entry to boot, confirm the service works, then remove or hold the new kernel (or use the package manager's history undo) and investigate before trying again."
   ]
  ],
  "tip": "Application vs System vs Security logs is a common exam distinction: service and driver failures go to System, program errors to Application, logon events to Security. journalctl -u filters by service, -b by boot, -b -1 for the previous boot, -p err for errors.",
  "check": [
   [
    "Which Windows log records a service that failed to start?",
    "The System log, where the Service Control Manager records service start failures."
   ],
   [
    "What tool would you use to record disk queue length over several days on Windows?",
    "Performance Monitor with a data collector set."
   ],
   [
    "Which journalctl options show only errors from the boot before the current one?",
    "journalctl -b -1 -p err."
   ]
  ]
 },
 {
  "t": "Network problems: no connectivity, wrong IP/mask/gateway, DNS resolution failures, duplex mismatch, firewall rules, NIC teaming misconfiguration",
  "hook": "The ticket at Northfield Community College says, in capital letters, that the student portal server is DOWN. Ana walks to the server room and finds it humming along: no alerts, CPU nearly idle, the web service running. From the server's own console the site loads fine. Yet across campus nobody can reach it, and a teacher in the library says it worked this morning for some people but not others. Ana remembers that facilities moved this rack last night and someone re-cabled it. The server is fine. So what is broken, and how does she find it without changing six things at once?",
  "simple": "A server can be perfectly healthy and still unreachable, the way a shop can be open with the lights on while the road to it is closed. Network problems are about the road. Maybe the cable is unplugged. Maybe the server has the wrong address, like a house with the wrong number on the door. Maybe it knows its neighbors but has the wrong directions to the main road, so it can only talk to machines nearby. Maybe the phone book that turns names into addresses (called DNS) has a bad entry, so people can reach it by number but not by name. Maybe the two ends of a cable disagree about how to take turns talking. Maybe a security gate is blocking one door. Checking from the cable upward keeps you from guessing.",
  "body": [
   "When users say the server is down, the server is often running fine and the problem is on the network path to it. CompTIA Server+ expects you to recognize common network faults from their symptoms and work through them in a logical order, usually from the physical layer upward: link first, then addressing, then name resolution, then the specific ports and services. Working in order keeps you from changing several settings at once and losing track of what actually fixed it.",
   "No connectivity at all starts with the physical layer. Check the link lights on the NIC (network interface card) and the switch port, the cable and any transceiver, whether the adapter is enabled in the OS (operating system), and whether the switch port is administratively shut down or assigned to the wrong VLAN (virtual local area network). A virtual machine may have its virtual NIC disconnected in the hypervisor settings or attached to the wrong virtual switch or port group, which is the virtual equivalent of an unplugged cable. If the link is up, check that the interface actually has an IP (Internet Protocol) address. On Windows, an address starting with 169.254 is an APIPA (Automatic Private IP Addressing) address, which the machine assigns itself when it expected DHCP (Dynamic Host Configuration Protocol) and got no answer. That points to a DHCP server problem, a DHCP relay problem, or a port in the wrong VLAN, rather than a problem with the server itself.",
   "Wrong IP settings cause confusing partial failures, which is exactly why they are popular on the exam. A wrong IP address may conflict with another device, producing duplicate address warnings and intermittent connectivity for both, or it may place the server in the wrong subnet entirely. A wrong subnet mask makes the server think local hosts are remote or remote hosts are local, so some destinations work and others do not, depending on which side of the bad mask they fall. A wrong or missing default gateway lets the server talk to its own subnet but nothing beyond it: it can reach neighbors in the same rack but not other networks, other buildings or the internet. Compare every setting with the network documentation rather than trusting what seems right.",
   "DNS (Domain Name System) resolution failures look like the network is down, but only by name. If `ping 10.0.0.25` works and `ping app01` fails, the network path is fine and name resolution is the problem. Causes include wrong DNS server addresses in the server's settings, a missing or incorrect DNS record, stale cached entries on the client or server, an incorrect DNS suffix so short names are not completed properly, or an entry in the local hosts file that overrides DNS. Clear the caches, query the DNS server directly with `nslookup` or `dig` to see what it returns, and check the record itself. A forgotten hosts file entry from an old migration is a classic cause of one machine reaching the wrong server while everyone else is fine.",
   "A duplex mismatch happens when one side of a link runs full duplex, sending and receiving at the same time, and the other runs half duplex, taking turns. It usually happens because one end was hard-coded to a fixed speed and duplex while the other was left on auto-negotiation, and the auto side fell back to half duplex. The link comes up and works, but performance is poor, especially under load, and the interface counters show errors such as late collisions, CRC (cyclic redundancy check) errors or runts. The fix is to configure both sides the same way, normally both to auto-negotiate. A speed mismatch, by contrast, usually prevents the link from coming up at all, so the symptoms are easy to tell apart.",
   "Firewall rules produce a distinctive pattern: the server responds to ping and other services work, but one application port is unreachable. The block may be in the host firewall on the server, a network firewall between client and server, a cloud security group, or a load balancer that is not forwarding that port. Check that the service is actually listening locally first, then test the port from the client side and review the firewall logs for dropped connections. Remember the reverse case too: many networks block ICMP (Internet Control Message Protocol), so a failed ping does not always mean the host is down if a port test to the service succeeds.",
   "NIC teaming combines two or more adapters for redundancy, bandwidth or both, and misconfiguration causes intermittent loss, flapping links, duplicate packets or only half the expected bandwidth. The most common cause is a mismatch between the server's team mode and the switch configuration. An LACP (Link Aggregation Control Protocol) team on the server connected to switch ports that are not configured as a matching port channel will not form correctly, and a static team spread across two separate switches that do not support aggregating across them causes unpredictable traffic. Also check that all members of the team are in the same VLAN, with the same speed, duplex and settings, because one mismatched member is enough to make the whole team behave erratically."
  ],
  "analogy": "Think of a server's network settings as a mail carrier's instructions. The IP address is the house number, the subnet mask defines which streets count as the local neighborhood, and the default gateway is the post office where anything leaving the neighborhood must go. Get the post office address wrong, and local letters still arrive but nothing reaches another town. DNS is the address book that turns a friend's name into a street address. The analogy falls short on duplex: a mismatch is more like two people on a walkie-talkie and a phone trying to talk at once.",
  "mnemonic": "For the order to troubleshoot, think \"Link, Address, Gateway, Name, Port\": check the physical link, then the IP address and mask, then the default gateway, then DNS, then the application port and firewall. Each step depends on the one before it working.",
  "terms": [
   [
    "APIPA",
    "Automatic Private IP Addressing: a 169.254.x.x address a Windows host assigns itself when DHCP fails."
   ],
   [
    "Default gateway",
    "The router address a host uses to reach networks outside its own subnet."
   ],
   [
    "Duplex mismatch",
    "A link where one side runs full duplex and the other half duplex, causing errors and poor performance."
   ],
   [
    "Hosts file",
    "A local file that maps names to IP addresses and is checked before DNS on most systems."
   ],
   [
    "LACP",
    "Link Aggregation Control Protocol: a standard for negotiating a NIC team with a switch, which requires a matching port channel on the switch."
   ]
  ],
  "example": "After a server is moved to a new rack, it can reach other servers in its subnet but not the database in another building. The administrator finds the default gateway still points to the old subnet's router. Correcting the gateway restores access immediately.",
  "mistakes": [
   [
    "If a server fails to answer ping, it must be down.",
    "Many networks and host firewalls block ICMP. Test the actual service port before concluding the host is down."
   ],
   [
    "A 169.254.x.x address means the server's network card is broken.",
    "It is an APIPA address: the server asked for DHCP and got no response. Check the DHCP server, relay and the port's VLAN."
   ],
   [
    "Works by IP but not by name means a routing problem.",
    "If the IP path works, routing is fine. The problem is name resolution: DNS servers, records, caches, suffixes or the hosts file."
   ],
   [
    "Hard-coding speed and duplex on the server always improves reliability.",
    "Hard-coding one end while the other auto-negotiates is the classic cause of a duplex mismatch. Set both sides the same, normally both to auto."
   ]
  ],
  "tryit": [
   [
    "A newly built server can ping every host in 10.20.30.0/24 but nothing in 10.20.40.0/24, and it cannot reach the update servers on the internet. Other servers in the same subnet have no trouble. What setting do you check first, and why?",
    "The default gateway. Reaching only the local subnet while everything remote fails is the signature of a wrong or missing gateway. Since other servers in the subnet work, the router is fine and the problem is this server's configuration."
   ],
   [
    "A file server with a two-port LACP team shows bursts of dropped connections and only about half the throughput expected. The network team says the two switch ports are configured as ordinary access ports. What is wrong?",
    "The server's LACP team has no matching port channel on the switch, so aggregation cannot form properly. Configure the two switch ports as an LACP port channel (or change the server team to a mode that does not need switch configuration), and confirm both members share the same VLAN and speed."
   ]
  ],
  "tip": "Reach local hosts but nothing remote: check the gateway. Works by IP but not by name: check DNS. Slow with late collisions and CRC errors: suspect duplex mismatch. Ping works but one port fails: suspect a firewall rule. 169.254 means DHCP failed.",
  "check": [
   [
    "A Windows server has the address 169.254.12.7. What does this indicate?",
    "It is an APIPA address, meaning the server tried to use DHCP and no DHCP server responded."
   ],
   [
    "What symptoms suggest a duplex mismatch?",
    "The link is up but slow, with late collisions and CRC errors on the interface counters."
   ],
   [
    "A user's PC reaches app01 at an old address while everyone else reaches the new one. What local file should you check?",
    "The hosts file, which can override DNS with a stale entry."
   ]
  ]
 },
 {
  "t": "Network tools: ping, tracert/traceroute, nslookup/dig, ipconfig/ip, netstat/ss, arp, telnet or Test-NetConnection for port tests",
  "hook": "On a Thursday afternoon, the new invoicing app at Pinecrest Builders goes live on port 8443, and within minutes Leo's phone starts buzzing: nobody can reach it. The developers swear the app is running. The network team swears the firewall is open. Leo's manager is standing behind him asking for an answer, and Leo has a command prompt open and a dozen tools he could type. Ping? Traceroute? A DNS lookup? Each one answers a different question, and running them at random will only produce more noise. Which question does Leo need answered first, and which tool answers it?",
  "simple": "Network tools are like the different questions a detective asks. One tool tells you your own computer's address and settings, like checking your own name tag. Ping knocks on another computer's door to see if it answers. Traceroute lists every stop along the route, like tracking a package through each warehouse. DNS lookup tools ask the network's phone book which address goes with a name. Netstat and ss show which doors on your own computer are open and who is using them. Arp shows the list your computer keeps of which physical device owns which nearby address. And port testers check whether one specific door, such as the one for a website, opens. Ping only checks that someone is home, not whether the right door opens.",
  "body": [
   "Each network tool answers a specific question, and using the right one in the right order lets you narrow a network problem down quickly. CompTIA Server+ often gives you command output and asks what it shows, so learn both what each tool does and how to read its results. A sensible order is to check the local configuration, then basic reachability, then the path, then name resolution, then whether the service is listening, and finally whether its port is reachable from the client.",
   "Start with the local configuration. `ipconfig` on Windows shows the IP (Internet Protocol) address, subnet mask and default gateway, and `ipconfig /all` adds DNS (Domain Name System) servers, the MAC (media access control) address and DHCP (Dynamic Host Configuration Protocol) lease details. `ipconfig /release` and `ipconfig /renew` give up and request a DHCP lease, and `ipconfig /flushdns` clears the local DNS resolver cache so the next lookup goes to the server. On Linux, `ip addr` (short form `ip a`) shows addresses, `ip route` shows the routing table and default gateway, and `ip link` shows whether each interface is up. The older `ifconfig` and `route` commands may still appear on some systems and in exam questions.",
   "`ping` sends ICMP (Internet Control Message Protocol) echo requests and reports replies and round-trip time. A logical sequence is to ping the loopback address 127.0.0.1 to prove the TCP/IP (Transmission Control Protocol/Internet Protocol) stack works, then your own address, then the default gateway, then a remote host by IP and finally a remote host by name. Where the sequence first fails tells you which layer or segment is broken: gateway fails means a local network problem, remote IP fails means routing beyond the gateway, and name fails while IP works means DNS. Remember that firewalls often block ICMP, so a failed ping is a clue, not proof.",
   "`tracert` on Windows and `traceroute` on Linux show each router hop along the path to a destination and the delay to each. They reveal where traffic stops or where latency suddenly jumps, such as a hop that goes from 2 ms to 150 ms. A line of asterisks can simply mean a router does not answer the probes while still forwarding traffic, so look at where replies stop entirely and never resume, not at a single silent hop in the middle. `pathping` on Windows combines a trace with loss statistics gathered at each hop over a longer period.",
   "`nslookup` (on Windows and Linux) and `dig` (on Linux) query DNS directly. `nslookup app01` shows which DNS server answered and the address it returned, and you can query a specific server, as in `nslookup app01 10.0.0.53`, to compare what different servers say. `dig app01 A` returns detailed output including the record's TTL (time to live), the number of seconds it may be cached, and `dig -x 10.0.0.25` performs a reverse lookup from address to name. If these tools return the right address but an application still connects to the wrong one, check local caches and the hosts file, which the application's resolver may consult before DNS.",
   "`netstat` and its Linux replacement `ss` show network connections and listening ports. `netstat -ano` on Windows lists all connections and listening ports with the owning process ID (PID), which you can match in Task Manager. `ss -tulpn` on Linux lists TCP and UDP (User Datagram Protocol) listening sockets, numerically, with process names. Use them to confirm a service is actually listening, and on which address and port, before blaming a firewall. A service bound to `127.0.0.1:8443` listens only for local connections; one bound to `0.0.0.0:8443` or the server's own address accepts connections from the network.",
   "`arp -a` shows the ARP (Address Resolution Protocol) cache, which maps IP addresses to MAC addresses on the local subnet. It helps detect duplicate IP addresses, when the MAC for an address keeps changing or does not match the expected server, and confirms which device is answering for an address. On Linux, `ip neigh` gives the same view.",
   "Finally, ping does not test application ports. To check whether a specific TCP port is reachable, use `Test-NetConnection server -Port 443` in PowerShell, which reports whether the TCP connection succeeded in its TcpTestSucceeded field, or `telnet server 443` on systems where the Telnet client is installed. With telnet, a blank screen or a banner means it connected, and an error means the connection was refused or timed out. On Linux, `nc -zv server 443` does the same. Use Telnet only as a port test client, never for administration, because it sends everything, including passwords, in clear text."
  ],
  "analogy": "Troubleshooting with these tools is like finding out why a package did not arrive. ipconfig checks that your own return address is correct. ping confirms the destination building exists. traceroute follows the truck through each depot to see where it stalled. nslookup checks that the address book has the right street for the name. netstat or ss checks whether anyone is staffing the receiving desk, and Test-NetConnection checks whether that specific loading dock door actually opens. The analogy breaks at ping: a building can refuse to answer the doorbell (blocked ICMP) while its loading dock is wide open.",
  "terms": [
   [
    "ipconfig / ip",
    "Commands that show and manage a host's IP configuration on Windows and Linux."
   ],
   [
    "traceroute/tracert",
    "A tool that lists each router hop to a destination and the delay to each."
   ],
   [
    "nslookup/dig",
    "Tools that query DNS servers directly to check name resolution."
   ],
   [
    "ss/netstat",
    "Tools that list network connections and listening ports, optionally with the owning process."
   ],
   [
    "arp",
    "A command that shows the ARP cache mapping local IP addresses to MAC addresses."
   ],
   [
    "Test-NetConnection",
    "A PowerShell cmdlet that tests connectivity, including whether a TCP port is reachable."
   ]
  ],
  "example": "Users cannot reach a new web app on port 8443. On the server, `ss -tulpn` shows the app listening only on 127.0.0.1:8443. The administrator changes its bind address to the server's interface, and `Test-NetConnection web01 -Port 8443` from a client now reports success.",
  "mistakes": [
   [
    "A successful ping proves the web service is reachable.",
    "Ping uses ICMP and tests only basic reachability. Use Test-NetConnection, telnet or nc to test the application's TCP port."
   ],
   [
    "Asterisks on one hop in traceroute mean the path is broken there.",
    "Some routers do not answer trace probes but still forward traffic. Look for where replies stop and never resume."
   ],
   [
    "netstat -ano shows DNS lookups and cache entries.",
    "netstat shows connections and listening ports with process IDs. ipconfig /displaydns or nslookup deals with DNS."
   ],
   [
    "If the firewall team says the port is open, the service must be the only possibility left, so restart it.",
    "First confirm with ss or netstat that the service is listening on the right address and port; a service bound to 127.0.0.1 is unreachable from the network even with the firewall open."
   ]
  ],
  "tryit": [
   [
    "A Windows client cannot open a file share on fs02. `ping fs02` fails with \"could not find host,\" but `ping 10.1.4.20`, the documented address of fs02, replies normally. Which tool do you use next and what are you looking for?",
    "Use `nslookup fs02` (and `ipconfig /all` to see which DNS servers are configured). The failure is name resolution, not connectivity. Look for a missing or wrong record or a wrong DNS server, then flush the cache with `ipconfig /flushdns` after it is fixed."
   ],
   [
    "Two servers keep losing connectivity for a few seconds at a time. You run `arp -a` on a neighbor several times and see the MAC address for 10.1.4.20 alternate between two different values. What does that suggest?",
    "Two devices are configured with the same IP address and are fighting over it. Find the second device by its MAC address (for example from the switch's MAC table) and correct its address."
   ]
  ],
  "tip": "ping tests reachability, not ports; use Test-NetConnection, telnet or nc for ports. nslookup/dig for DNS, tracert/traceroute for the path, netstat/ss for what is listening, arp for IP-to-MAC mapping, ipconfig/ip for local settings.",
  "check": [
   [
    "Which command shows listening ports with process IDs on Windows?",
    "netstat -ano."
   ],
   [
    "A host pings its gateway but not a remote server by IP. Which tool helps find where traffic stops?",
    "tracert or traceroute, which shows each hop along the path."
   ],
   [
    "What does ipconfig /flushdns do?",
    "It clears the local DNS resolver cache so fresh lookups are made."
   ],
   [
    "Which Linux command lists listening TCP and UDP sockets with process names?",
    "ss -tulpn."
   ]
  ]
 },
 {
  "t": "Security problems: permissions and access denied errors, expired certificates, antivirus quarantining files, firewall blocking services, compromised accounts",
  "hook": "Monday at Bayside Insurance starts with three tickets that look unrelated. The accounting team cannot open the quarter-end folder they used all last week. The internal claims API is rejecting every connection with a TLS error. And the nightly import service failed after the antivirus pushed an update. Then, at 10:15, Sofia in the security office notices something else: a service account that normally logs on only from one server signed in at 3 a.m. from a workstation in the mail room, and a new member appeared in the Domain Admins group. Four problems, all wearing a security badge. Which ones are just misconfigurations to fix carefully, and which one means you stop and call it an incident?",
  "simple": "Security tools are built to say no. Locks, ID badges and guards keep the wrong people out, but if they are set up wrong they keep the right people out too. On a server, that looks like \"access denied\" when someone should be allowed in, a website that stops working because its digital ID card (a certificate) has expired, virus protection locking away a file that was actually safe, or a firewall blocking a service that should be open. The right fix is always narrow, like giving one person a key to one room, not leaving the front door open. The serious case is when someone else is using an account that is not theirs. Then the job changes from fixing to protecting: lock the account, keep the evidence and find out what happened.",
  "body": [
   "Security controls are designed to block things, so when they are misconfigured or triggered they cause outages that look like other problems. CompTIA Server+ asks you to recognize security-related failures, fix them without weakening security, and spot the signs that an account has been compromised. A useful rule runs through this whole topic: fix narrowly. Grant the specific permission, add the specific rule or create the specific exclusion, rather than switching the control off.",
   "Access denied errors usually come from permissions. On Windows file shares, two sets of permissions apply: share permissions, which apply only when connecting over the network, and NTFS (New Technology File System) permissions, which apply both locally and over the network. The effective access for a user connecting over the network is the more restrictive of the two. Within NTFS, permissions from multiple groups combine, so a user in one group with Read and another with Modify gets Modify, but an explicit Deny overrides an Allow. Permissions inherit from parent folders unless inheritance is disabled, and moving or copying files can change what they inherit, which is why a folder that worked last week can suddenly deny access after a reorganization. The Effective Access tab in the folder's advanced security settings shows what a given user actually gets.",
   "On Linux, check owner, group and mode with `ls -l`, and remember that mandatory access control systems such as SELinux (Security-Enhanced Linux) or AppArmor can deny access even when the file permissions look correct; the denial appears in the audit log rather than as a permission problem. Also check that group membership changes have taken effect, since on both Windows and Linux users often need to log off and back on before a new group membership applies. Fix the problem by adjusting group membership or rights to the minimum needed, following least privilege, not by granting Everyone full control.",
   "Certificates enable TLS (Transport Layer Security) for websites, APIs (application programming interfaces), LDAPS (LDAP over TLS, the secure form of the Lightweight Directory Access Protocol) and many internal services. When a certificate expires, browsers show warnings and many clients refuse to connect, while service-to-service connections may fail silently with only a handshake error in a log. Other certificate problems include a name mismatch, where the certificate does not list the host name clients use; an untrusted issuer or a missing intermediate certificate, so clients cannot build the chain to a trusted root; and a revoked certificate. Clock errors can also make a valid certificate appear expired or not yet valid, so check the server and client time. Fix the problem by renewing and installing the certificate with the complete chain, then restarting or rebinding the service so it uses the new certificate. Prevent recurrence with an inventory of certificates, expiry monitoring with alerts well before the date, and automated renewal where possible.",
   "Antivirus and EDR (endpoint detection and response) tools sometimes quarantine legitimate files, such as a new application update, a script or a database file, causing a service to fail. The clue is a quarantine or detection event in the security tool's console or log at the time the failure started. Verify that the file is genuinely safe, for example by checking where it came from and whether its digital signature is valid from the expected publisher, then restore it from quarantine and create a narrow, documented exclusion for that specific file or path, or submit it to the vendor as a false positive. Do not disable protection entirely, and avoid broad exclusions such as an entire drive, which create a hiding place for real malware.",
   "Firewalls blocking services show up after new installs, port changes or rule updates: the server is reachable but one service is not. Confirm the service is listening locally first, then check the host firewall and any network firewalls for a rule allowing that port from the right sources, and review the firewall logs for dropped connections from the client's address. Add a specific rule for the port and the source networks that need it, rather than turning the firewall off or allowing all traffic.",
   "Compromised accounts are the one problem in this list that is not a misconfiguration, and they show warning signs called indicators of compromise. Watch for logons at unusual times or from unusual locations, many failed logons followed by a success, new accounts or group memberships nobody requested, disabled security tools, unexpected scheduled tasks or services, and unusual outbound traffic. Respond according to the incident response plan rather than improvising. Contain the threat by disabling the account or resetting its credentials and revoking active sessions, preserve logs as evidence before they roll over, investigate what the account accessed and changed, remove any persistence the attacker added such as new accounts or scheduled tasks, and require MFA (multifactor authentication) going forward."
  ],
  "analogy": "Share and NTFS permissions work like a building with a lobby guard and locked office doors. The guard (share permission) decides how far into the building network visitors can go, and the office lock (NTFS) decides what you can do inside the room. You get the stricter of the two: a guard who allows only looking around beats an office key that allows rearranging the furniture. An explicit Deny is a name on the do-not-admit list, which overrides any badge you carry. The analogy stops at local access: someone already inside the building, logged on at the server, never passes the guard, so only NTFS applies.",
  "terms": [
   [
    "Effective permissions",
    "The actual access a user has after combining all group permissions, deny entries and share and NTFS permissions."
   ],
   [
    "Certificate chain",
    "The server certificate plus the intermediate certificates linking it to a trusted root."
   ],
   [
    "False positive",
    "A security tool flagging legitimate activity or files as malicious."
   ],
   [
    "Indicator of compromise",
    "Evidence, such as unusual logons or unknown services, suggesting a system or account has been breached."
   ],
   [
    "Least privilege",
    "Granting only the minimum access needed to do a job."
   ]
  ],
  "example": "An internal API suddenly rejects connections from every client with TLS errors. The administrator inspects the certificate and finds it expired at midnight. She renews it, installs the full chain, restarts the service, and adds the certificate to the monitoring system's expiry checks so it alerts 30 days before the next expiry.",
  "mistakes": [
   [
    "The share permission is Full Control, so network users can do anything.",
    "Over the network, effective access is the more restrictive of share and NTFS permissions. If NTFS allows only Read, network users can only read."
   ],
   [
    "A user in a group with Allow Modify and another group with Deny Write can still write.",
    "An explicit Deny overrides an Allow, so the user cannot write."
   ],
   [
    "The quickest safe fix for a quarantined file is to disable the antivirus until the vendor responds.",
    "Verify the file, restore it and add a narrow documented exclusion or report a false positive. Disabling protection exposes the server."
   ],
   [
    "A compromised account should be deleted immediately to clean things up.",
    "Disable it and reset credentials to contain, but preserve logs and the account's records as evidence, investigate what it did, and remove persistence according to the incident response plan."
   ]
  ],
  "tryit": [
   [
    "After a migration, the claims API server's certificate was replaced. Browsers on staff PCs connect without warning, but a partner's application now fails with an error saying it cannot verify the issuer. The certificate is valid and the name matches. What is the likely cause?",
    "The server is presenting the certificate without its intermediate certificate. Staff PCs may already have the intermediate cached, but the partner's client cannot build the chain to a trusted root. Install the complete chain on the server and rebind the service."
   ],
   [
    "A help-desk technician reports that a user cannot write to a project folder despite being added to the Project-Editors group, which has Modify on the folder, an hour ago. The user has not logged off since. What do you check and suggest?",
    "Group membership is applied at logon, so ask the user to log off and back on (or reconnect) and test again. If it still fails, use the Effective Access tab to look for an explicit Deny from another group or a restrictive share permission."
   ]
  ],
  "tip": "For shares, effective access is the most restrictive of share and NTFS permissions, and explicit Deny wins. Fix security problems narrowly (a specific rule or exclusion) rather than disabling the control. Signs of a compromised account mean incident response: contain, preserve evidence, investigate.",
  "check": [
   [
    "Share permission is Read, NTFS permission is Modify. What can a network user do?",
    "Only read, because effective access over the share is the more restrictive of the two."
   ],
   [
    "A service stops after an antivirus update, and the log shows its DLL was quarantined. What is the right fix?",
    "Verify the file is legitimate, restore it, and add a narrow documented exclusion or report the false positive, rather than disabling antivirus."
   ],
   [
    "Name three indicators that an account may be compromised.",
    "Any three of: logons at unusual times or places, many failed logons then a success, unrequested group membership changes or new accounts, disabled security tools, unexpected scheduled tasks or services, unusual outbound traffic."
   ]
  ]
 },
 {
  "t": "Using logs, baselines and performance counters to find root cause",
  "hook": "For the third week in a row, the reporting server at Harborview Hospital slows to a crawl on Tuesday afternoon. Each time, Kenji restarts the reporting service, things recover, and the ticket gets closed as resolved. This Tuesday, the chief financial officer asks a pointed question in the operations meeting: if it was resolved, why does it keep happening? Kenji realizes he has been fixing the symptom, not the problem. He has logs on four systems, a monitoring tool full of graphs and a change calendar he has never checked. How does he turn all that data into one clear answer about what is actually causing the slowdown?",
  "simple": "Fixing a problem once is good. Making sure it never comes back is better, and that means finding the real reason it happened, called the root cause. To do that you need three things. First, a picture of what normal looks like, called a baseline, like knowing your usual body temperature so you can tell when you have a fever. Second, measurements of what the server is doing, such as how busy its processor, memory, disks and network are. Third, logs, the server's diary, which say what happened and when. Put them side by side, see what is different from normal and what changed at the same time, and keep asking why until you reach a reason you can actually fix.",
  "body": [
   "Fixing a symptom gets a service back, but finding the root cause stops the problem returning. Root cause analysis relies on evidence rather than hunches: logs show what happened and when, performance counters show how resources behaved, and baselines tell you what normal looks like so you can see what changed. CompTIA Server+ expects you to use all three together and to recognize when one resource is disguised as another.",
   "A baseline is a record of normal behavior, captured when the system is healthy. Collect performance data over enough time to include daily and weekly cycles, along with known peaks such as month-end processing, Monday morning logons or nightly backups. Record typical CPU (central processing unit) usage, memory use, disk latency and queue length, network throughput and error counts, and application measures such as response time and requests per second. Keep configuration baselines too, so you can compare current settings with the approved state and spot drift. Without a baseline, 70 percent CPU is just a number; with one, you know whether it is normal for 10 a.m. on a Monday or a sign of trouble. Baselines also need maintenance: when the workload legitimately grows, the old baseline stops being a fair comparison.",
   "Key performance counters point to specific bottlenecks. For the processor, look at utilization and, on virtual machines (VMs), CPU ready or steal time, which show the VM waiting for physical CPU on a busy host even when the VM's own CPU numbers look moderate. For memory, look at available memory and paging activity, such as Pages/sec on Windows or swap in and swap out on Linux; heavy paging means memory pressure even if the CPU looks fine. For disk, look at latency, the average seconds per read or write, and queue length; sustained high queues and latency indicate the storage cannot keep up. For the network, look at utilization compared with link speed, plus errors and discards on the interface.",
   "Watch for one bottleneck disguising itself as another. A memory shortage forces the OS (operating system) to page to disk, which appears as heavy disk load and high disk latency, so adding faster disks would not fix it while adding memory would. Likewise, a VM with high CPU ready time looks slow and CPU-bound, but the fix is on the host, not inside the VM. Look at the whole set of counters together before deciding which resource is really the limit.",
   "Logs give the timeline. Gather logs from every layer involved: OS event logs or the journal, application logs, hardware logs from the BMC (baseboard management controller) and RAID (redundant array of independent disks) controller, hypervisor logs, and network device and firewall logs. Correlate them by time, which is why synchronized clocks through NTP (Network Time Protocol) are essential. A few minutes of drift between servers makes it hard to tell which event came first, and the cause can appear to happen after the effect. Centralized logging or a SIEM (security information and event management) system collects logs in one place and makes searching across many servers practical, so you can ask a single question such as everything with severity error between 1:55 and 2:10 p.m. across all reporting systems.",
   "A practical approach follows a steady sequence. Define the symptom precisely, including when it started and who is affected. Compare current counters with the baseline to find which resource deviates. Search logs around the start time for errors, warnings and changes, and check the change management records for anything deployed or reconfigured. Form a theory and test it, for example by reproducing the load in a test environment or reverting the change, and change one thing at a time so the result means something.",
   "Keep asking why. A service crashed because memory ran out; memory ran out because a leak grew; the leak was introduced by last week's update. The last answer you can act on is the root cause, and in this case the action is to roll back or patch the update. Stopping at the first answer, restarting the service, would have left the problem in place to return next week.",
   "Finally, close the loop. Document the analysis and the evidence, fix the root cause, update baselines if the workload has legitimately changed, and add monitoring thresholds or alerts so the same pattern is caught earlier next time. The documentation becomes part of the knowledge base, so the next person facing similar symptoms starts from your findings instead of from scratch."
  ],
  "analogy": "Root cause analysis is like a doctor treating a recurring fever. A fever reducer (restarting the service) makes the patient feel better for a while, but the doctor compares readings with the patient's normal values (the baseline), runs tests (performance counters), and reads the patient's history of when symptoms started and what changed (logs and change records) to find the infection underneath. The analogy holds for disguised bottlenecks too: a cough can come from the lungs or the heart, just as disk load can come from a memory shortage.",
  "mnemonic": "For the analysis sequence, think \"Define, Compare, Search, Test, Ask why\": define the symptom and start time, compare counters with the baseline, search logs and change records, test a theory one change at a time, and keep asking why until you reach a cause you can fix.",
  "terms": [
   [
    "Root cause",
    "The underlying reason a problem occurred, which, when fixed, prevents recurrence."
   ],
   [
    "Baseline",
    "A record of normal performance and configuration, captured while healthy, used for comparison."
   ],
   [
    "Performance counter",
    "A measured value, such as disk queue length or available memory, tracked by the OS or monitoring tools."
   ],
   [
    "Bottleneck",
    "The resource that limits overall performance because it is saturated."
   ],
   [
    "CPU ready time",
    "On a VM, the time it waits for the host to give it physical CPU, a sign of host contention."
   ],
   [
    "SIEM",
    "Security information and event management: a system that collects and correlates logs from many sources."
   ]
  ],
  "example": "Every Tuesday afternoon a reporting server slows down. Compared with the baseline, disk latency triples at 2 p.m. while CPU stays normal. Logs show a new antivirus full scan scheduled for Tuesdays at 2 p.m. after a recent policy change. Moving the scan to overnight and excluding the report database files fixes it.",
  "mistakes": [
   [
    "High disk activity always means you need faster disks.",
    "Check memory first. Low available memory causes heavy paging, which shows up as disk load. Adding memory may be the real fix."
   ],
   [
    "Restarting the service fixed it, so the root cause is found.",
    "A restart treats the symptom. Keep asking why until you reach a cause you can act on, such as a leak introduced by an update."
   ],
   [
    "Logs from several servers can be compared fine even if their clocks differ by a few minutes.",
    "Clock drift scrambles the order of events and can make a cause appear after its effect. Synchronize clocks with NTP."
   ],
   [
    "A baseline captured once at installation is good forever.",
    "Workloads change. Update baselines when the workload legitimately changes, or comparisons become misleading."
   ]
  ],
  "tryit": [
   [
    "A VM running a web application feels slow during the afternoon. Inside the VM, CPU sits around 50 percent and memory is fine, but the hypervisor shows high CPU ready time for that VM during the same period. Other VMs on the host are busy with batch jobs. Where is the bottleneck and what do you do?",
    "The VM is waiting for physical CPU on an oversubscribed host, so the bottleneck is host CPU contention, not the VM's own configuration. Move the VM or the batch jobs to another host, reschedule the batch work, or adjust resource allocation, rather than adding vCPUs inside the VM, which can make ready time worse."
   ],
   [
    "After a weekend change, a database server is slow on Monday. Counters show available memory near zero, high Pages/sec and high disk queue length; CPU is moderate. The change log shows a new reporting add-on was installed Saturday. What is your theory and how do you test it?",
    "The add-on is consuming memory, causing heavy paging that appears as disk load. Confirm by checking per-process memory, then test by disabling the add-on (one change only) and watching whether paging and disk queue return to baseline. If they do, work with the vendor and size memory accordingly."
   ]
  ],
  "tip": "Compare against a baseline to see what changed, correlate logs by time with NTP-synchronized clocks, and check change records. Watch for disguised bottlenecks: heavy paging from low memory often looks like a disk problem, and CPU ready time points to host contention.",
  "check": [
   [
    "Why is a baseline needed to interpret performance data?",
    "It shows what normal looks like for that system and time, so you can tell whether current values are abnormal."
   ],
   [
    "Why does NTP matter for root cause analysis?",
    "Synchronized clocks let you correlate log entries across servers in the correct order."
   ],
   [
    "High disk activity and low available memory appear together. What might the real bottleneck be?",
    "Memory, because low memory forces paging to disk, which shows up as disk load."
   ]
  ]
 }
], {"reviewed":"2026-10-07"});
