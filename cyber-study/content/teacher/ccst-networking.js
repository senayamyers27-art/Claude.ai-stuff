/* Teacher edition for Cisco Certified Support Technician (CCST) Networking (100-150 v1.0): a 45-minute lesson plan for every lesson. Served only to teacher
   accounts by the API (never published). Format: docs/LESSON_GUIDE.md. */
CertHub.addTeacher("ccst-networking", [
 {
  "t": "The TCP/IP and OSI models: layer names, what each layer does and where devices and protocols fit",
  "objectives": [
   "Students will be able to list the seven OSI layers in order and describe the job of each.",
   "Students will be able to map the four TCP/IP layers to the corresponding OSI layers.",
   "Students will be able to classify hubs, switches, routers, multilayer switches and firewalls by the layer at which they operate.",
   "Students will be able to apply bottom-up layer thinking to identify where a described network problem likely sits."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question on the projector and take three or four quick answers. Write the students' guesses on the board without judging them; you will return to them at the end."
   ],
   [
    15,
    "Teach",
    "Draw the OSI and TCP/IP models side by side on the whiteboard with lines showing how they map. Introduce the mnemonic 'Please Do Not Throw Sausage Pizza Away.' For each layer, name its job, its unit of data and one device or protocol. Stress hub = 1, switch = 2, router = 3, and that the TCP/IP Application layer covers OSI 5 to 7."
   ],
   [
    15,
    "Activity",
    "Run the card sort described below in groups of three. Circulate and ask each group to justify one placement aloud."
   ],
   [
    5,
    "Discuss",
    "Bring the class back and work through the two discussion questions, connecting the model to how a technician talks on a real ticket."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and hand it in on the way out."
   ]
  ],
  "warmup": "A coworker says, 'The user's problem is at Layer 1.' Without any training, what do you think they mean, and what would you check first?",
  "activity": {
   "title": "Layer card sort and ticket triage",
   "materials": "Printed cards (one set per group) listing devices, protocols and symptoms; a whiteboard or large paper with seven labeled OSI rows and four TCP/IP columns; tape or sticky notes.",
   "steps": [
    "Give each group a set of about 20 cards: hub, repeater, switch, NIC, router, multilayer switch, next-generation firewall, Ethernet, IP, ICMP, TCP, UDP, HTTP, DNS, DHCP, SSH, plus four symptom cards such as 'link light off' and 'wrong default gateway.'",
    "Groups place each device and protocol card on the OSI layer where it operates, then mark which TCP/IP layer that row belongs to.",
    "Groups then place each symptom card on the layer where a technician would start investigating it.",
    "Each group swaps boards with a neighbor, checks the placements, and marks any they disagree with using a sticky note.",
    "The teacher reviews disputed cards with the whole class, explaining the reasoning, especially for multilayer switches and firewalls that span more than one layer."
   ]
  },
  "discussion": [
   "Why might a team agree on a shared layer vocabulary instead of just describing problems in their own words?",
   "When would a top-down troubleshooting approach, starting at the application, make more sense than starting at the cable?"
  ],
  "exit": [
   [
    "List the OSI layers from 1 to 7.",
    "Physical, Data Link, Network, Transport, Session, Presentation, Application."
   ],
   [
    "Which OSI layers does the TCP/IP Link layer cover?",
    "Layers 1 and 2, Physical and Data Link."
   ],
   [
    "A device forwards traffic based on MAC addresses. Which layer is it, and what is it most likely called?",
    "Layer 2; it is a switch."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a partially completed layer chart with the device column filled in, and have them add only the layer names and the mnemonic first before tackling protocols.",
   "Extend: Ask fast finishers to open a sample packet capture in a browser-based viewer or a screenshot of Wireshark and label each header line with its OSI and TCP/IP layer."
  ]
 },
 {
  "t": "Encapsulation: data, segments, packets, frames and bits; MAC addresses vs IP addresses",
  "objectives": [
   "Students will be able to name the PDU at each layer in order: data, segment, packet, frame, bits.",
   "Students will be able to describe what header information the Transport, Network and Data Link layers add.",
   "Students will be able to compare MAC addresses and IP addresses by format, scope and how they are assigned.",
   "Students will be able to predict which addresses change and which stay the same as a packet crosses routers."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and let pairs discuss for two minutes, then hear two answers."
   ],
   [
    12,
    "Teach",
    "Draw a stack of nested boxes on the whiteboard, adding one header at a time as you narrate data moving down the layers. Introduce the PDU names and the 'Do Some People Fear Birthdays' memory aid. Then compare MAC and IP addresses, showing `ipconfig /all` output on the projector."
   ],
   [
    18,
    "Activity",
    "Run the envelope relay below. Keep the pace brisk so every group completes at least two router hops."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions and connect them back to what students saw change during the relay."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "When you mail a package across the country, which parts of the label change along the way and which stay the same?",
  "activity": {
   "title": "Envelope relay across routers",
   "materials": "Envelopes in three sizes or sticky notes in three colors, markers, a printed simple topology (PC, router A, router B, server) with made-up IP and MAC addresses for each interface.",
   "steps": [
    "Arrange students in a line representing PC, Router A, Router B and Server, each holding a card with their interface IP and MAC addresses.",
    "The PC student writes a message (data), puts it in a small envelope labeled with source and destination ports (segment), then a medium envelope with source and destination IP addresses (packet), then a large envelope with source and destination MAC addresses (frame).",
    "At each router, the student opens only the large envelope, reads the IP address, throws away the old large envelope and writes a new one with their own outgoing MAC as source and the next hop's MAC as destination.",
    "When the server receives the envelopes, it opens each layer in turn and reads the message (de-encapsulation).",
    "The class records on the whiteboard which values changed at each hop and which stayed the same."
   ]
  },
  "discussion": [
   "Why does it make sense that MAC addresses only matter on the local link rather than across the whole internet?",
   "How would the relay change if Router A performed NAT on the packet?"
  ],
  "exit": [
   [
    "List the PDUs from the Application layer down to the Physical layer.",
    "Data, segment, packet, frame, bits."
   ],
   [
    "Which address changes at each router hop, and which stays the same without NAT?",
    "The MAC addresses change at every hop; the source and destination IP addresses stay the same."
   ],
   [
    "Which protocol does an IPv4 host use to find the MAC address of its default gateway?",
    "ARP, the Address Resolution Protocol."
   ]
  ],
  "differentiation": [
   "Support: Provide a fill-in table with columns for layer, PDU name and address type, and let students complete it during the relay rather than from memory.",
   "Extend: Have fast finishers add a NAT router to the relay and document exactly which fields it rewrites, then explain why the server's reply still reaches the PC."
  ]
 },
 {
  "t": "Bandwidth vs throughput; latency, delay and jitter; speed tests vs iperf",
  "objectives": [
   "Students will be able to distinguish bandwidth from throughput and explain why throughput is lower.",
   "Students will be able to define latency, delay and jitter and identify which applications are most sensitive to each.",
   "Students will be able to convert between bits per second and bytes per second.",
   "Students will be able to choose between a browser speed test and iperf3 for a given troubleshooting scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and list student answers on the board under the heading 'What slow means.'"
   ],
   [
    15,
    "Teach",
    "Use the highway picture to define bandwidth and throughput. Write the bits-to-bytes conversion on the board and do two quick examples. Then define latency, the four kinds of delay and jitter, showing a projected ping output with steady times and one with uneven times. Finish by comparing a browser speed test with iperf3 and writing the two iperf3 commands on the board."
   ],
   [
    15,
    "Activity",
    "Run the symptom-to-measurement card match below in pairs."
   ],
   [
    5,
    "Discuss",
    "Work through the discussion questions as a class."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "Think of a time your internet felt 'slow.' What exactly was happening: was a download slow, a page slow to start loading, or a call choppy? Are those the same problem?",
  "activity": {
   "title": "Which measurement, which tool",
   "materials": "Printed scenario cards (about 10), a projector showing two sample ping outputs and an iperf3 result, paper for recording answers.",
   "steps": [
    "Give each pair a stack of scenario cards, such as 'a large backup takes hours,' 'audio cuts in and out on calls,' 'game actions feel delayed,' and 'a new access point needs testing.'",
    "For each card, pairs write which measurement is most relevant (bandwidth, throughput, latency or jitter) and one likely cause.",
    "Pairs then choose the best tool to confirm it: a browser speed test, iperf3 between two hosts, or ping.",
    "Project the sample outputs and have pairs read off the RTT values, judge whether jitter is high, and calculate megabytes per second from an iperf3 result in Mbps.",
    "Pairs compare their answers with another pair and resolve any disagreements before the teacher reveals the answer key."
   ]
  },
  "discussion": [
   "Why might a company prioritize voice traffic with QoS even though voice uses very little bandwidth?",
   "What are the limits of a browser speed test as evidence when you call an internet provider about poor service?"
  ],
  "exit": [
   [
    "What is the difference between bandwidth and throughput?",
    "Bandwidth is the maximum theoretical rate; throughput is the actual rate achieved, which is lower because of overhead, congestion, errors and slow links."
   ],
   [
    "Which measurement most affects call quality when bandwidth is plentiful?",
    "Jitter, along with latency."
   ],
   [
    "Which tool measures throughput between two computers you control?",
    "iperf3, with one running `iperf3 -s` and the other `iperf3 -c <server-ip>`."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page reference card with the highway picture, each term and a sample value, and let them use it during the card match.",
   "Extend: Ask fast finishers to explain which of the four kinds of delay would dominate on a long transoceanic link versus a congested office uplink, and how each could be reduced."
  ]
 },
 {
  "t": "Network types: LAN, WAN, MAN, CAN, PAN and WLAN",
  "objectives": [
   "Students will be able to define PAN, LAN, WLAN, CAN, MAN and WAN.",
   "Students will be able to classify a described network by geographic scope and link ownership.",
   "Students will be able to explain why WAN links are usually leased and how that affects who resolves outages.",
   "Students will be able to label the network types present in a single multi-site organization."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers on the whiteboard, grouping them loosely by size."
   ],
   [
    12,
    "Teach",
    "Draw concentric circles on the board from PAN to WAN. Define each type with an example and stress the two classification questions: how big is the area, and who owns the links. Clarify that WLAN is wireless access to a LAN, not a size category."
   ],
   [
    18,
    "Activity",
    "Run the map-labeling activity below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect network type to support responsibilities."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "List every device you have connected to something today, and what it connected to. Which of those connections would you, personally, be able to fix if it broke?",
  "activity": {
   "title": "Label the organization",
   "materials": "A printed or projected map of a fictional organization with a headquarters campus, a building across the city, a branch office in another state and employees with phones and headsets; colored markers or sticky notes.",
   "steps": [
    "Give each group the map and a set of sticky notes labeled PAN, LAN, WLAN, CAN, MAN and WAN.",
    "Groups place each label on every place it applies, such as headsets, each floor, the links between headquarters buildings, the cross-town link and the branch link.",
    "Next to each link, groups write who most likely owns it: the organization or a provider.",
    "Groups write one sentence per label explaining the clue that justified it, using area and ownership.",
    "Groups present one disputed label to the class, and the teacher confirms or corrects the reasoning."
   ]
  },
  "discussion": [
   "If the branch office loses its connection to headquarters, what is your first call, and why is it different from a LAN outage?",
   "Why do you think organizations prefer to own campus cabling but lease long-distance links?"
  ],
  "exit": [
   [
    "What network type joins several nearby buildings owned by one organization?",
    "A CAN (campus area network)."
   ],
   [
    "Name the largest WAN.",
    "The internet."
   ],
   [
    "Is a laptop on office Wi-Fi on a WAN? Explain.",
    "No. It is on a WLAN, which is wireless access to the local network (LAN)."
   ]
  ],
  "differentiation": [
   "Support: Provide a sorting chart ordered from smallest to largest with one example already filled in for each type, and let students add a second example.",
   "Extend: Ask fast finishers to describe two ways the branch office could connect to headquarters (a leased provider circuit or a site-to-site VPN over the internet) and list one trade-off of each."
  ]
 },
 {
  "t": "Cloud vs on-premises: public, private and hybrid cloud; SaaS, PaaS and IaaS",
  "objectives": [
   "Students will be able to compare on-premises infrastructure with cloud computing in terms of control, cost and responsibility.",
   "Students will be able to distinguish public, private, hybrid, community and multicloud deployment models.",
   "Students will be able to classify a described service as IaaS, PaaS or SaaS by identifying who manages the operating system.",
   "Students will be able to explain what remains the customer's responsibility under the shared responsibility model."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take quick answers, writing the apps students name on the board."
   ],
   [
    15,
    "Teach",
    "Draw a stack on the whiteboard from bottom to top: hardware, virtualization, operating system, runtime, application, data. Draw four columns (on-prem, IaaS, PaaS, SaaS) and shade who manages each layer. Then define public, private and hybrid cloud with examples, and close with the shared responsibility point that data and accounts always stay with the customer."
   ],
   [
    15,
    "Activity",
    "Run the responsibility card sort below in groups."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, focusing on trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Name three apps you use that you never installed on a server yourself. Who do you think keeps them running?",
  "activity": {
   "title": "Who manages it? Responsibility sort",
   "materials": "Printed task cards (for example 'patch the operating system,' 'replace a failed disk,' 'reset a user's password,' 'update the web server software,' 'decide who can see a shared folder'), a printed grid with columns On-prem, IaaS, PaaS and SaaS, and scenario cards describing small businesses.",
   "steps": [
    "Give each group the task cards and the four-column grid.",
    "For each column, groups mark every task card as 'customer' or 'provider.'",
    "Groups check their grid: tasks involving data and user access should be 'customer' in every column.",
    "Groups then read three scenario cards and decide the service model and deployment model for each, writing their reasoning in one sentence.",
    "The teacher projects the answer grid and groups correct their own work, discussing any differences."
   ]
  },
  "discussion": [
   "Why might an organization keep some systems on-premises even when cloud services are cheaper to start?",
   "If a SaaS provider has an outage, what can the local support team still do to help users?"
  ],
  "exit": [
   [
    "A customer rents virtual machines and installs its own operating system. Which service model is this?",
    "IaaS."
   ],
   [
    "What makes a cloud 'private'?",
    "It is dedicated to a single organization, whether hosted on-premises or by a provider."
   ],
   [
    "Give one responsibility that stays with the customer in every service model.",
    "Protecting its data, or managing user accounts and access settings."
   ]
  ],
  "differentiation": [
   "Support: Give students the housing analogy chart (own a house, empty apartment, furnished apartment, hotel) next to the IaaS, PaaS and SaaS columns as a reference during the sort.",
   "Extend: Ask fast finishers to design a hybrid setup for a small clinic, stating which systems stay on-premises, which move to which service model, and how users would reach each one."
  ]
 },
 {
  "t": "How cloud and hybrid work change where apps run and how users reach them (VPN, internet access)",
  "objectives": [
   "Students will be able to trace the network path a user takes to reach a SaaS app and an internal on-premises resource, both from the office and from home.",
   "Students will be able to compare remote-access and site-to-site VPNs.",
   "Students will be able to explain the difference between full-tunnel and split-tunnel VPN configurations.",
   "Students will be able to use the location of an app and the user's access path to narrow down the cause of a connectivity ticket."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up question and gather a few answers."
   ],
   [
    12,
    "Teach",
    "Draw a map on the whiteboard: head office with LAN, firewall and file server; a cloud labeled SaaS; a home user; and a branch office. Draw the paths in different colors for office-to-SaaS, home-to-SaaS, home-to-file-server over a remote-access VPN, and branch-to-headquarters over a site-to-site VPN. Then show the difference between full and split tunnel by redrawing the home user's SaaS path."
   ],
   [
    18,
    "Activity",
    "Run the ticket triage role-play below in pairs."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When you work or study from home, which things can you reach without doing anything special, and which require you to sign in to something first?",
  "activity": {
   "title": "Ticket triage role-play: where is the break?",
   "materials": "Printed ticket cards with user symptoms, the whiteboard path map from the teaching segment (or a printed copy per pair), colored markers.",
   "steps": [
    "Pair students: one is the caller, holding a ticket card with hidden details (location, VPN state, what works and what fails); the other is the technician.",
    "The technician may ask up to five questions, such as 'Can you open web email?' or 'Is your VPN client connected?', and the caller answers only from the card.",
    "The technician traces the user's path on the map and names the most likely broken segment: home internet, VPN tunnel, office internet link, site-to-site VPN or the app itself.",
    "Partners check the answer printed on the back of the card, then swap roles with a new card.",
    "After three rounds, pairs write one rule of thumb they discovered, and the teacher collects several for the board."
   ]
  },
  "discussion": [
   "What does a company gain and lose by choosing split tunnel instead of full tunnel?",
   "Why are identity checks such as MFA becoming as important as whether a user is 'inside' the network?"
  ],
  "exit": [
   [
    "A remote user can reach SaaS apps but not the internal file server. What is the first thing to check?",
    "The VPN client and tunnel, because internal resources require the VPN while SaaS only needs internet access."
   ],
   [
    "Which VPN type needs a client app on the user's laptop?",
    "A remote-access VPN."
   ],
   [
    "In a split-tunnel VPN, which traffic goes through the tunnel?",
    "Only traffic headed for company networks; other internet traffic goes directly out the user's connection."
   ]
  ],
  "differentiation": [
   "Support: Give students a pre-drawn path map with each segment numbered, so they can answer triage cards by naming a segment number before explaining it in words.",
   "Extend: Ask fast finishers to add a cloud-hosted app that depends on an on-premises database over a site-to-site link, then write a ticket describing what users would see if that link failed."
  ]
 },
 {
  "t": "TCP vs UDP: connection-oriented vs connectionless, the three-way handshake, when each is used",
  "objectives": [
   "Students will be able to compare TCP and UDP in terms of connections, reliability, ordering and overhead.",
   "Students will be able to describe the TCP three-way handshake in the correct order.",
   "Students will be able to choose the appropriate transport protocol for a given application and justify the choice.",
   "Students will be able to interpret TCP states such as LISTEN and ESTABLISHED in `netstat` or `ss` output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students vote by raising hands for 'phone call' or 'postcard' for several apps."
   ],
   [
    12,
    "Teach",
    "Draw two timelines on the whiteboard. On the TCP side, draw SYN, SYN-ACK, ACK, then data with acknowledgments, a lost segment being retransmitted, and FIN to close. On the UDP side, draw data being sent with no replies. Compare header sizes and list common protocols for each. Show sample `netstat -an` output on the projector and point out connection states."
   ],
   [
    18,
    "Activity",
    "Run the handshake role-play and protocol sort below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to deepen the reasoning."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Would you rather send an important contract by certified mail with a signature, or by dropping a postcard in a mailbox? Which would you use for a quick 'hi'? Why?",
  "activity": {
   "title": "Handshake role-play and protocol sort",
   "materials": "Index cards labeled SYN, SYN-ACK, ACK, DATA, FIN and RST; a set of printed application cards (web browsing, email, file download, voice call, live game, DNS lookup, DHCP, NTP, SSH, TFTP); whiteboard divided into TCP and UDP columns.",
   "steps": [
    "In pairs, one student is the client and one is the server. They act out the three-way handshake by passing the correct flag cards in order, then pass DATA cards, with the server returning ACK cards.",
    "The teacher secretly removes one DATA card mid-exchange; the client must notice the missing ACK and resend it, demonstrating retransmission.",
    "Pairs repeat the exchange as UDP: the client passes DATA cards with no handshake and no ACKs, and notes what happens when a card is lost.",
    "Pairs then sort the application cards into TCP or UDP columns on the whiteboard and write one reason next to each.",
    "The class reviews the board, paying special attention to DNS, which uses both."
   ]
  },
  "discussion": [
   "If UDP has no reliability, how can an application that runs over UDP still recover from lost messages?",
   "Why might a 'connection refused' error appear instantly while a 'connection timed out' error takes much longer?"
  ],
  "exit": [
   [
    "List the TCP three-way handshake in order.",
    "SYN, SYN-ACK, ACK."
   ],
   [
    "Which transport protocol would you choose for a live voice call, and why?",
    "UDP, because low delay matters more than reliability and retransmitted voice would arrive too late."
   ],
   [
    "What does an ESTABLISHED state in `netstat` output mean?",
    "There is an active TCP connection between the two hosts."
   ]
  ],
  "differentiation": [
   "Support: Give students a comparison table with TCP and UDP columns and rows for handshake, acknowledgments, retransmission, ordering, header size and examples, partly filled in.",
   "Extend: Ask fast finishers to explain why a TCP sender slows down when acknowledgments stop arriving, and how the window size relates to throughput."
  ]
 },
 {
  "t": "Common protocols and ports: FTP 20/21, SFTP/SSH 22, TFTP 69, HTTP 80, HTTPS 443, DNS 53, DHCP 67/68, NTP 123",
  "objectives": [
   "Students will be able to recall the port numbers and transport protocols for FTP, SSH/SFTP, TFTP, HTTP, HTTPS, DNS, DHCP and NTP.",
   "Students will be able to explain what a port and a socket are and how clients and servers use them.",
   "Students will be able to compare secure and clear-text protocols such as SSH versus Telnet and SFTP versus FTP.",
   "Students will be able to identify which blocked port explains a described service failure."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Run the warm-up as a quick verbal round."
   ],
   [
    12,
    "Teach",
    "Use the apartment building picture to explain ports and sockets. Build a table on the whiteboard with columns for protocol, port, transport and purpose, filling in each row while explaining why it matters (clear text versus encrypted, DORA, why time sync matters). Show sample `netstat -an` output on the projector and point out LISTEN entries."
   ],
   [
    18,
    "Activity",
    "Run the firewall rule detective activity below in small groups."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a building has one street address but hundreds of apartments, how does a delivery reach the right person? How might a computer solve the same problem?",
  "activity": {
   "title": "Firewall rule detective",
   "materials": "Printed flashcards with protocol names on one side and port/transport on the other; printed 'firewall change log' sheets listing six to eight rule changes; printed symptom cards; whiteboard.",
   "steps": [
    "Groups first drill the flashcards for three minutes, quizzing each other on port and transport for each protocol.",
    "Each group receives a change log sheet with rules such as 'block UDP 53,' 'block TCP 22,' 'block UDP 123' and 'block UDP 67-68.'",
    "The teacher hands out symptom cards one at a time, such as 'users can browse by IP but not by name' or 'switch configs cannot be pushed by SSH.'",
    "For each symptom, groups identify the rule responsible and write the protocol, port and transport on a sticky note, then post it on the board.",
    "The class reviews the board, and the teacher asks one group per symptom to explain how they reasoned from the symptom to the port."
   ]
  },
  "discussion": [
   "Why would an organization still allow TFTP inside its network even though it has no authentication?",
   "How could a simple clock problem caused by blocked NTP end up looking like a sign-in problem to users?"
  ],
  "exit": [
   [
    "Give the port and transport for HTTPS and for DNS lookups.",
    "HTTPS is TCP 443; DNS lookups use UDP 53."
   ],
   [
    "Which port does SFTP use, and why?",
    "TCP 22, because SFTP runs inside SSH."
   ],
   [
    "Users can reach websites by IP address but not by name. Which port is most likely blocked?",
    "UDP 53, used by DNS."
   ]
  ],
  "differentiation": [
   "Support: Let students keep a printed port table during the detective activity and focus on matching symptoms to services before memorizing numbers.",
   "Extend: Ask fast finishers to write a minimal list of outbound rules a small office needs for web browsing, DNS, DHCP and time sync, specifying port and transport for each."
  ]
 },
 {
  "t": "ICMP and what ping uses it for",
  "objectives": [
   "Students will be able to describe the purpose of ICMP and explain why it has no port numbers.",
   "Students will be able to identify ICMP Echo Request, Echo Reply, Destination Unreachable and Time Exceeded messages and their roles.",
   "Students will be able to interpret common ping results such as replies, timeouts and 'destination host unreachable.'",
   "Students will be able to apply the stepwise ping sequence to locate where connectivity fails."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take a few answers."
   ],
   [
    12,
    "Teach",
    "Explain ICMP's role and its types and codes. Project sample ping output for a success, a timeout, 'destination host unreachable' and 'TTL expired in transit,' and read each one aloud with the class. Draw the stepwise ping sequence on the whiteboard as a ladder: loopback, own IP, gateway, remote IP, name."
   ],
   [
    18,
    "Activity",
    "Run the ping ladder troubleshooting activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If you knock on a door and nobody answers, list every reason that could explain the silence. Which of those reasons mean nobody is home?",
  "activity": {
   "title": "Climb the ping ladder",
   "materials": "Printed scenario sheets each showing five ping results (loopback, own IP, gateway, remote IP, name) with one or more failures; student laptops with a command prompt or terminal if available; whiteboard ladder diagram.",
   "steps": [
    "If laptops are available, pairs first run `ping 127.0.0.1`, ping their own IP (found with `ipconfig` or `ip addr`), and ping the classroom gateway, and note the round-trip times and TTL values.",
    "Each pair receives four printed scenario sheets with ping results from fictional users.",
    "For each sheet, pairs find the first failing rung of the ladder and write the most likely cause and the next thing they would check.",
    "One scenario includes a server that times out on ping but serves web pages; pairs must explain why the server is not down.",
    "Pairs share answers with another pair, then the teacher reviews each scenario on the projector."
   ]
  },
  "discussion": [
   "Why might an organization choose to block ping on its public servers, and what does that cost the people troubleshooting them?",
   "How does traceroute use a packet's TTL to reveal each router along a path?"
  ],
  "exit": [
   [
    "What ICMP type numbers do Echo Request and Echo Reply use?",
    "Echo Request is type 8; Echo Reply is type 0."
   ],
   [
    "A PC can ping its gateway but not 8.8.8.8. Where is the problem likely to be?",
    "Beyond the local network, such as the router's internet connection or the provider."
   ],
   [
    "Does a ping timeout prove a host is down? Explain.",
    "No. A firewall or the host may be dropping ICMP while the host and its services work normally."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart of the ping ladder with a 'what to check next' box beside each rung to use during the activity.",
   "Extend: Have fast finishers run `tracert` or `traceroute` to a public site and explain what the asterisks for a hop mean and why later hops can still reply."
  ]
 },
 {
  "t": "Private IPv4 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) vs public addresses",
  "objectives": [
   "Students will be able to state the three RFC 1918 private IPv4 ranges with their prefixes.",
   "Students will be able to classify a given IPv4 address as private, public, loopback or APIPA.",
   "Students will be able to explain why private addresses require NAT to reach the internet.",
   "Students will be able to describe one benefit and one drawback of private addressing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to find their own IP address with `ipconfig` or `ip addr` if laptops are available, or show a sample on the projector, and ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Explain IPv4 address scarcity, then write the three private ranges on the whiteboard with their start and end addresses. Circle 172.16 to 172.31 and demonstrate the 'check the second number' trick. Add loopback and APIPA as special ranges that are not RFC 1918. Explain why NAT is needed and the merger overlap problem."
   ],
   [
    18,
    "Activity",
    "Run the address sorting race below in small groups."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Your laptop shows one IP address, but a 'what is my IP' website shows a different one. Which is correct, and why might both be right?",
  "activity": {
   "title": "Address sorting race",
   "materials": "Printed address cards (about 24 per group, including tricky ones such as 172.15.0.1, 172.31.255.254, 172.32.0.1, 192.169.1.1, 11.0.0.1, 10.255.0.1, 127.0.0.1 and 169.254.10.10); four labeled areas on a desk or whiteboard: Private, Public, Loopback, APIPA; a timer.",
   "steps": [
    "Give each group a shuffled deck of address cards and start a five-minute timer.",
    "Groups sort every card into Private, Public, Loopback or APIPA.",
    "When time is up, groups swap with a neighboring group and check each other's sorting against an answer key projected by the teacher.",
    "Each group picks the card that caused the most debate and explains to the class why it belongs where it does.",
    "Finish with a short round where the teacher reads addresses aloud and groups hold up a card showing their classification."
   ]
  },
  "discussion": [
   "Why might a company choose the 10.0.0.0/8 range for its internal network instead of 192.168.0.0/16?",
   "What problems could arise when two companies that both use 192.168.1.0/24 merge their networks, and how might they solve it?"
  ],
  "exit": [
   [
    "List the three private IPv4 ranges.",
    "10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16."
   ],
   [
    "Is 172.32.5.5 private or public?",
    "Public, because the private 172 range ends at 172.31."
   ],
   [
    "Why must traffic from a private address be translated before reaching the internet?",
    "Internet routers do not route private addresses, so NAT replaces them with a public address so replies can return."
   ]
  ],
  "differentiation": [
   "Support: Give students a reference strip showing the three ranges as number lines, with 172.16 and 172.31 highlighted, to use during the sorting race.",
   "Extend: Ask fast finishers to work out how many addresses each private range contains using the prefix length (2 raised to the number of host bits) and compare the sizes."
  ]
 },
 {
  "t": "NAT and PAT: how a home router shares one public address",
  "objectives": [
   "Students will be able to explain the purpose of NAT and define inside local and inside global addresses.",
   "Students will be able to compare static NAT, dynamic NAT and PAT (NAT overload).",
   "Students will be able to trace a PAT translation table entry for an outbound connection and its reply.",
   "Students will be able to explain why port forwarding is needed for inbound access and describe safe practices for using it."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect guesses."
   ],
   [
    12,
    "Teach",
    "Draw a home network on the whiteboard: three devices with private addresses, a router with one public address, and a web server on the internet. Walk through one PAT connection step by step, filling in a translation table as you go. Then contrast static NAT, dynamic NAT and PAT with one-line definitions, and explain port forwarding and why NAT is not a firewall."
   ],
   [
    18,
    "Activity",
    "Run the PAT translation table role-play below."
   ],
   [
    5,
    "Discuss",
    "Ask the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A family has seven devices online but only one public IP address from their provider. How do you think the replies from websites find the right device?",
  "activity": {
   "title": "Be the PAT router",
   "materials": "Sticky notes or index cards for packets, a large printed or whiteboard translation table with columns for inside address:port and outside address:port, markers, role cards for inside hosts, the router and two internet servers.",
   "steps": [
    "Assign roles: three or four inside hosts with private addresses, one student as the router with the public address 203.0.113.5, and two students as internet servers.",
    "Each host writes a packet card with its source address and port and a destination server address and port, then hands it to the router.",
    "The router rewrites the source to 203.0.113.5 with a unique port, records the mapping in the translation table on the board, and passes the card to the server.",
    "Servers write reply cards to 203.0.113.5 and the port they received; the router looks up the table and delivers each reply to the correct host.",
    "Finally, a server sends an unsolicited card to the router with no matching entry; the class decides what happens, then adds a port forwarding rule and repeats."
   ]
  },
  "discussion": [
   "Why does NAT make unsolicited inbound traffic fail, and why is that still not the same as having a firewall?",
   "When would an organization choose static NAT instead of port forwarding on a PAT router?"
  ],
  "exit": [
   [
    "Which form of NAT lets many inside hosts share one public address, and how does it tell them apart?",
    "PAT (NAT overload), which distinguishes conversations by port numbers."
   ],
   [
    "What is the inside global address?",
    "The public address an inside host is translated to, as seen from outside."
   ],
   [
    "Why is port forwarding needed to host a game server at home?",
    "Inbound connections have no translation table entry, so the router drops them unless a static rule sends that port to the inside host."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed translation table with the first entry filled in, so they can follow the pattern for later entries during the role-play.",
   "Extend: Ask fast finishers to read a sample `show ip nat translations` output and identify the inside local, inside global, outside local and outside global addresses for each line."
  ]
 },
 {
  "t": "Special IPv4 addresses: loopback 127.0.0.1, APIPA 169.254.x.x, broadcast",
  "objectives": [
   "Students will be able to identify loopback, APIPA, limited broadcast, directed broadcast, 0.0.0.0 and multicast addresses on sight.",
   "Students will be able to explain what a 169.254.x.x address reveals about DHCP and list the troubleshooting steps that follow.",
   "Students will be able to calculate the directed broadcast address of a /24 network and explain why network and broadcast addresses cannot be assigned to hosts.",
   "Students will be able to explain why routers do not forward broadcasts and how that defines a broadcast domain."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project an `ipconfig` output showing a 169.254 address with a blank gateway. Ask students what they notice and what they think happened. Collect guesses on the board without correcting yet."
   ],
   [
    12,
    "Teach",
    "Walk through each special address: 127.0.0.1 and what a loopback ping does and does not prove; APIPA and its meaning; 255.255.255.255 versus a directed broadcast; 0.0.0.0 as source and as default route; the multicast range. Draw a router between two switches and shade the broadcast domains."
   ],
   [
    15,
    "Activity",
    "Run the 'Address Detective' card activity in groups of three. Circulate and ask each group to justify one card aloud."
   ],
   [
    8,
    "Discuss",
    "Return to the warm-up output. Have groups explain the likely cause and the order they would troubleshoot. Use the discussion questions to probe the difference between symptom and root cause."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your laptop shows the address 169.254.40.12 and you cannot open any website, but you can see a shared folder on a classmate's laptop that also has a 169.254 address. What do you think is going on?",
  "activity": {
   "title": "Address Detective",
   "materials": "Printed cards (one set per group), each showing a short ticket and an address or command output; whiteboard; markers.",
   "steps": [
    "Before class, make 12 cards. Each shows a short scenario plus an address, for example: 'Ping 127.0.0.1 succeeds, web still fails', 'Printer shows 169.254.88.3', 'Static IP set to 192.168.1.255/24', 'Routing table shows 0.0.0.0/0 via 10.0.0.1', 'Packet to 224.0.0.5', 'DHCP Discover from 0.0.0.0 to 255.255.255.255'.",
    "Groups sort the cards into columns on their desk: Loopback, APIPA, Broadcast, Default route or no address, Multicast.",
    "For each card, the group writes one sentence on the back: what the address means and, if it is a problem, the next troubleshooting step.",
    "Groups swap card sets with a neighboring group and check each other's sorting, flagging any disagreement with a sticky note.",
    "The teacher reviews flagged cards with the whole class."
   ]
  },
  "discussion": [
   "Why is it more useful to treat a 169.254 address as a symptom than as the problem itself?",
   "If routers did forward broadcasts, what would happen to a large campus network?",
   "When would a successful loopback ping be misleading to a new technician?"
  ],
  "exit": [
   [
    "A PC shows 169.254.10.5. What failed?",
    "The PC could not reach a DHCP server, so it assigned itself an APIPA address."
   ],
   [
    "What is the directed broadcast address for 10.4.7.0/24?",
    "10.4.7.255."
   ],
   [
    "Does a router forward a packet sent to 255.255.255.255?",
    "No. The limited broadcast stays on the local segment; routers form the boundary of the broadcast domain."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference table listing each special address, what it means and a sample scenario, and let them use it during the card sort.",
   "Extend: Ask fast finishers to explain how a DHCP relay lets a client reach a server on another subnet even though its Discover is a broadcast, and why 0.0.0.0 appears as the source address."
  ]
 },
 {
  "t": "IPv4 format: dotted decimal, subnet masks and slash (CIDR) notation",
  "objectives": [
   "Students will be able to convert an IPv4 octet between decimal and binary using the 128-to-1 bit values.",
   "Students will be able to translate any common subnet mask between dotted decimal and CIDR prefix length.",
   "Students will be able to identify invalid subnet masks and explain why mask bits must be contiguous.",
   "Students will be able to read address and mask information from Windows, Linux and Cisco output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write 192.168.10.25/24 and 192.168.10.25 255.255.255.0 on the board. Ask students whether these are the same setting and to explain their reasoning."
   ],
   [
    12,
    "Teach",
    "Show the bit-value row 128 64 32 16 8 4 2 1 and convert two octets each way. Build the mask table from /24 to /30 live, showing that each step adds one bit. Explain classes briefly as legacy defaults."
   ],
   [
    15,
    "Activity",
    "Run the 'Mask Match' card game in pairs, then a speed round on mini whiteboards or paper."
   ],
   [
    8,
    "Discuss",
    "Project three tool outputs (ipconfig, ip addr, Cisco show running-config excerpt) for the same host. Ask students to point out where the mask appears in each and confirm they agree."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If a mask is just a way of saying how many bits belong to the network, why do you think there are two different ways to write it?",
  "activity": {
   "title": "Mask Match",
   "materials": "Printed card pairs (prefix card and dotted decimal card) for /8, /16, /19, /20, /22, /24 through /30, plus three invalid mask cards; a binary bit-value strip for each pair.",
   "steps": [
    "Shuffle the cards face down. Partners take turns flipping two cards, keeping the pair if a prefix card matches its dotted decimal mask.",
    "When a student flips an invalid mask card such as 255.255.255.100 or 255.0.255.0, they must explain aloud why it is invalid to keep it.",
    "After all pairs are found, each pair writes the binary form of three of their masks to prove the match.",
    "Speed round: the teacher calls out a prefix or a mask and pairs race to write its equivalent, showing work in binary for the third-octet masks."
   ]
  },
  "discussion": [
   "Why does the rule that mask bits must be contiguous make the list of valid octet values so short?",
   "If networks are classless, why do you think people still talk about Class A, B and C?",
   "Which format, slash or dotted decimal, is easier to spot errors in, and why?"
  ],
  "exit": [
   [
    "Write 255.255.255.224 as a prefix length.",
    "/27 (24 bits plus 3 bits in the last octet)."
   ],
   [
    "Convert 25 to binary.",
    "00011001 (16 + 8 + 1)."
   ],
   [
    "Is 255.255.0.255 a valid mask?",
    "No. The 1 bits are not contiguous; a 0 octet appears before a 255 octet."
   ]
  ],
  "differentiation": [
   "Support: Provide a printed bit-value strip and a partially filled mask table so students practice reading patterns before memorizing, and pair them with a confident partner for the card game.",
   "Extend: Have fast finishers convert masks whose boundary falls in the second or third octet, such as /12, /19 and /21, and explain how many host bits each leaves."
  ]
 },
 {
  "t": "Network address, broadcast address, usable host range and host count for common masks",
  "objectives": [
   "Students will be able to calculate the number of total and usable addresses for prefixes from /24 to /30 and for /16.",
   "Students will be able to find the network address, broadcast address and usable host range for an address with a /24 to /30 mask using the block size method.",
   "Students will be able to choose the smallest subnet size that fits a given number of devices.",
   "Students will be able to identify which addresses in a list can be assigned to hosts."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask: a block of 16 parking spaces has a sign space at the start and an announcement space at the end. How many cars can park? Connect the answer to /28."
   ],
   [
    12,
    "Teach",
    "Derive the host count formula on the board and build the /24 to /30 table with the class. Model the block size method with 192.168.1.100/26 and 10.0.0.37/29, writing each step: block size, block start, broadcast, range, count."
   ],
   [
    16,
    "Activity",
    "Run 'Subnet Relay' in teams of four. Teacher checks answers at the board and awards points for correct reasoning."
   ],
   [
    7,
    "Discuss",
    "Review the hardest relay card. Discuss gateway placement conventions and what happens when a host uses a reserved address."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions individually."
   ]
  ],
  "warmup": "If you had to give addresses to 25 devices, how would you decide how big a block of addresses to request?",
  "activity": {
   "title": "Subnet Relay",
   "materials": "Printed relay cards, each with an address and prefix such as 172.16.4.77/28; a four-column answer sheet (network, broadcast, range, usable count) per team; whiteboard for scoring.",
   "steps": [
    "Each team of four lines up their chairs. The teacher hands the first student a relay card.",
    "Student one writes the block size and network address, then passes the sheet. Student two writes the broadcast address. Student three writes the usable range. Student four writes the usable host count and brings the sheet to the board.",
    "The teacher checks the sheet; if any field is wrong, the team must find which step went wrong before getting the next card.",
    "After four rounds, rotate roles so every student does each step at least once.",
    "Finish with one sizing card such as 'Fit 50 devices', where the team must name the smallest prefix and justify it."
   ]
  },
  "discussion": [
   "Why do you think network teams often leave extra room when sizing a subnet?",
   "What symptoms might a user see if their PC were accidentally given the broadcast address of its subnet?",
   "Why is a /30 such a common choice for links between two routers?"
  ],
  "exit": [
   [
    "How many usable hosts does a /26 provide?",
    "62 (64 addresses minus 2)."
   ],
   [
    "What is the network address and broadcast address for 10.0.0.37/29?",
    "Network 10.0.0.32, broadcast 10.0.0.39."
   ],
   [
    "What is the smallest prefix that fits 25 hosts?",
    "/27, with 30 usable addresses."
   ]
  ],
  "differentiation": [
   "Support: Give students a printed table of block sizes and block starts for /25 to /30 so they can focus on locating the right block before calculating from scratch.",
   "Extend: Ask fast finishers to work subnets whose boundary falls in the third octet, such as 10.4.7.19/21, and explain how the block size method applies to that octet."
  ]
 },
 {
  "t": "Using a subnet calculator and checking whether two hosts are on the same subnet",
  "objectives": [
   "Students will be able to determine whether two hosts are on the same subnet by finding each host's network address.",
   "Students will be able to use a subnet calculator to verify network address, broadcast address, usable range and host count.",
   "Students will be able to explain how a mismatched mask or an out-of-subnet gateway causes connectivity failures.",
   "Students will be able to describe how a host decides between direct delivery and sending to the default gateway."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show two addresses, 192.168.1.60 and 192.168.1.70, with no masks. Ask students to vote: same subnet or not? Then reveal /26 and discuss why the vote could not be answered without the mask."
   ],
   [
    10,
    "Teach",
    "Demonstrate the bitwise AND on one octet, then the block size shortcut. Open a free browser-based subnet calculator on the projector and enter the camera example, pointing out each field of the output."
   ],
   [
    18,
    "Activity",
    "Run 'Ticket Triage' in pairs using student laptops with a browser-based subnet calculator, or paper and the block size method if laptops are unavailable."
   ],
   [
    7,
    "Discuss",
    "Pairs share the trickiest ticket. Focus discussion on the mismatched mask ticket and why it can work in one direction only."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on an index card."
   ]
  ],
  "warmup": "Two devices are plugged into the same switch and have addresses that look almost identical, but they cannot talk. Brainstorm every reason you can think of.",
  "activity": {
   "title": "Ticket Triage",
   "materials": "Printed help desk tickets (six per pair) each listing two or three devices with address, mask and gateway; student laptops with a browser for a free subnet calculator; worksheet with columns for network address, same subnet yes or no, gateway valid yes or no, fix.",
   "steps": [
    "Hand each pair six tickets, including one mismatched mask case, one gateway outside the subnet, one host using a broadcast address, and one where the hosts are actually fine.",
    "For each device, pairs calculate the network address by hand first and record it.",
    "Pairs then verify each answer with the subnet calculator and note any differences between their hand calculation and the tool.",
    "For each ticket, pairs write the root cause and the specific fix, such as the corrected address or gateway.",
    "Two pairs compare their worksheets and resolve any disagreement before reporting to the class."
   ]
  },
  "discussion": [
   "Why might a mismatched mask cause traffic to work in one direction but not the other?",
   "When is it faster to calculate by hand, and when is a calculator the better choice?",
   "How does handing out masks and gateways through DHCP reduce these kinds of tickets?"
  ],
  "exit": [
   [
    "Are 192.168.1.60/26 and 192.168.1.70/26 on the same subnet?",
    "No. .60 is in network 192.168.1.0/26 and .70 is in network 192.168.1.64/26."
   ],
   [
    "A host is 10.0.0.20/28 with gateway 10.0.0.1. Is the gateway valid?",
    "No. The host's subnet is 10.0.0.16 to 10.0.0.31, so the gateway must be between .17 and .30."
   ],
   [
    "Name two pieces of information a subnet calculator shows.",
    "Any two of: network address, broadcast address, first and last usable host, number of hosts, mask in dotted decimal and prefix form."
   ]
  ],
  "differentiation": [
   "Support: Let students who struggle use the calculator first and then explain each output field back to their partner, building toward hand calculation on the last two tickets.",
   "Extend: Give fast finishers a ticket using /21 and /19 prefixes and ask them to verify the calculator's output by hand using the third octet block size."
  ]
 },
 {
  "t": "IPv6 format: eight hextets, leading-zero and :: compression, prefix length (usually /64)",
  "objectives": [
   "Students will be able to describe the structure of an IPv6 address as 128 bits written in eight 16-bit hextets.",
   "Students will be able to compress and expand IPv6 addresses correctly using the leading-zero and double colon rules.",
   "Students will be able to identify invalid IPv6 addresses, including those with two double colons or non-hex characters.",
   "Students will be able to explain the /64 prefix and identify the network prefix and interface ID in an address."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Write 2001:0db8:0000:0000:0000:ff00:0042:8329 on the board and ask students to estimate how long it would take to read aloud over the phone. Ask how they might shorten it without losing information."
   ],
   [
    12,
    "Teach",
    "Explain hex digits and the 4-bit, 16-bit, 128-bit build-up. Demonstrate the leading-zero rule, then the double colon rule, then why two double colons are ambiguous. Expand fe80::1 step by step. Mark the /64 boundary on an example."
   ],
   [
    15,
    "Activity",
    "Run 'Compress and Expand' in pairs with the card set; pairs take turns as writer and checker."
   ],
   [
    8,
    "Discuss",
    "Review common errors the teacher saw during the activity, especially trailing zeros and double compression. Discuss why /64 makes IPv6 subnetting simpler."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "If you had to say a 32-character address over the phone, what rules would you invent to make it shorter without losing any information?",
  "activity": {
   "title": "Compress and Expand",
   "materials": "Printed cards: 8 full-length IPv6 addresses, 8 compressed addresses, and 4 invalid addresses; mini whiteboards or scrap paper; markers.",
   "steps": [
    "Partner A draws a full-length card and writes the fully compressed form; partner B checks it against the rules and initials it.",
    "Partners swap roles. Partner B draws a compressed card and writes the full expanded form, padding every hextet to four digits.",
    "Mixed into the deck are invalid cards, such as one with two double colons or a letter g. When drawn, the pair must explain why it is invalid.",
    "Finally, each pair takes three of their addresses and draws a line between the prefix and interface ID, assuming /64."
   ]
  },
  "discussion": [
   "Why is the rule about trailing zeros so important for avoiding errors?",
   "How does a fixed /64 subnet size change the way you plan subnets compared to IPv4?",
   "Why might two tools display the same IPv6 address differently, and what problems could that cause?"
  ],
  "exit": [
   [
    "Compress 2001:0db8:0000:0000:0000:0000:0000:0001.",
    "2001:db8::1."
   ],
   [
    "Is 2001:db8::5::1 valid? Why?",
    "No. It has two double colons, so the number of zero hextets each represents is ambiguous."
   ],
   [
    "In 2001:db8:acad:10::25/64, what is the network prefix?",
    "2001:db8:acad:10 (the first four hextets, 64 bits)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a blank eight-box template for each address so they can write one hextet per box when expanding and count the boxes filled by the double colon.",
   "Extend: Ask fast finishers to calculate how many /64 subnets fit in a /48 and a /56, and to write the first three /64 prefixes from 2001:db8:acad::/48."
  ]
 },
 {
  "t": "IPv6 address types: global unicast (2000::/3), link-local (fe80::/10), unique local (fc00::/7), multicast (ff00::/8), loopback ::1",
  "objectives": [
   "Students will be able to classify an IPv6 address as global unicast, link-local, unique local, multicast, loopback or unspecified from its leading digits.",
   "Students will be able to explain the scope of each unicast type and compare each with its closest IPv4 equivalent.",
   "Students will be able to explain why IPv6 has no broadcast and how multicast replaces it.",
   "Students will be able to interpret `ipconfig` output showing multiple IPv6 addresses on one interface."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project an `ipconfig` output with three IPv6 addresses and an fe80 gateway. Ask: is this computer healthy? Collect quick thumbs up or down votes and reasons."
   ],
   [
    12,
    "Teach",
    "Draw a table on the board with columns for prefix, starts with, scope and IPv4 equivalent. Fill it in for each type. Emphasize that fe80 is normal and that multicast replaces broadcast. Show ff02::1 and ff02::2."
   ],
   [
    15,
    "Activity",
    "Run the 'Address Sorting' card sort in groups of three, then the speed classification round."
   ],
   [
    8,
    "Discuss",
    "Revisit the warm-up output and have groups explain each line. Use the discussion questions to compare ULA with IPv4 private addresses."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "In IPv4, a computer usually has one address per network card. Why might it be useful for a computer to have several addresses at once?",
  "activity": {
   "title": "Address Sorting",
   "materials": "Printed address cards (24 addresses mixed across all types), five category header cards, sticky notes, a projector for the speed round.",
   "steps": [
    "Give each group the shuffled address cards and the headers: Global unicast, Link-local, Unique local, Multicast, Loopback or unspecified.",
    "Groups sort each card under a header and write the scope (internet, organization, local link, group, this host) on a sticky note beside each column.",
    "For each column, the group writes the closest IPv4 equivalent, or 'none' for anything without a direct equivalent.",
    "Speed round: the teacher projects one address at a time; groups hold up the matching header card. Discuss any split votes immediately."
   ]
  },
  "discussion": [
   "Why is it risky to apply the IPv4 rule 'a self-assigned address means failure' to IPv6?",
   "What advantages does multicast have over broadcast for the devices on a busy network?",
   "When might an organization choose unique local addresses for some systems even though it has global addresses?"
  ],
  "exit": [
   [
    "Classify fd00:1234:5678:1::10.",
    "Unique local address."
   ],
   [
    "Classify ff02::2 and say who receives it.",
    "Multicast; all routers on the local link."
   ],
   [
    "Does an fe80 address on an interface indicate a problem?",
    "No. Every IPv6 interface has a link-local address; it is normal and used for Neighbor Discovery and as the gateway."
   ]
  ],
  "differentiation": [
   "Support: Give students a color-coded reference card with each prefix's first characters highlighted, and let them sort a smaller set of 12 cards first.",
   "Extend: Ask fast finishers to explain how a solicited-node multicast address is formed from a unicast address and why this is more efficient than ARP broadcasts."
  ]
 },
 {
  "t": "IPv6 address assignment: SLAAC, modified EUI-64, DHCPv6, and dual stack",
  "objectives": [
   "Students will be able to explain the role of router advertisements and router solicitations in IPv6 address assignment.",
   "Students will be able to compare SLAAC, stateless DHCPv6 and stateful DHCPv6, including which provides addresses, DNS settings and the default gateway.",
   "Students will be able to derive a modified EUI-64 interface ID from a MAC address.",
   "Students will be able to describe dual stack and why it is the common transition approach."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students how a laptop gets its IPv4 address on a new network. List the steps on the board, then ask which of those steps they think IPv6 might do differently."
   ],
   [
    12,
    "Teach",
    "Draw a router and two hosts. Act out RS and RA with arrows labeled ff02::2 and ff02::1. Build a comparison table for SLAAC, stateless DHCPv6 and stateful DHCPv6 (address source, DNS source, gateway source, record kept). Walk through EUI-64 for 00:1a:2b:3c:4d:5e."
   ],
   [
    15,
    "Activity",
    "Run the 'Neighbor Discovery Role-Play' followed by an EUI-64 practice round in pairs."
   ],
   [
    8,
    "Discuss",
    "Use the audit scenario from the lesson hook to discuss when an organization would choose stateful DHCPv6 and why privacy addresses matter."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a device could create its own address without asking any server, what problems might that solve, and what new problems might it create?",
  "activity": {
   "title": "Neighbor Discovery Role-Play",
   "materials": "Printed role cards (Router, Host, DHCPv6 server), index cards to act as messages, markers, a worksheet with four MAC addresses for EUI-64 practice.",
   "steps": [
    "Assign roles in groups of four: one Router, one DHCPv6 server and two Hosts. The Router holds a prefix card, 2001:db8:acad:1::/64, and a gateway card, fe80::1.",
    "Hosts send a Router Solicitation card to the Router. The Router answers with an RA card listing the prefix, its link-local gateway and flags chosen by the teacher for the round: SLAAC only, SLAAC plus stateless DHCPv6, or stateful DHCPv6.",
    "Hosts act on the flags: building their own address, asking the DHCPv6 server for DNS only, or asking it for an address. Each host writes its final configuration: address, gateway, DNS and which device provided each.",
    "Repeat for all three flag settings, rotating roles each round.",
    "Pairs then convert the four MAC addresses on the worksheet into EUI-64 interface IDs and check each other's work."
   ]
  },
  "discussion": [
   "Why do modern operating systems prefer random interface IDs over EUI-64 for client devices?",
   "Why might a network still need DHCPv6 even when SLAAC works?",
   "What troubleshooting challenges might dual stack introduce for a help desk?"
  ],
  "exit": [
   [
    "Which device provides the IPv6 default gateway?",
    "The router, through its router advertisement."
   ],
   [
    "Convert MAC 00:1a:2b:3c:4d:5e to a modified EUI-64 interface ID.",
    "021a:2bff:fe3c:4d5e."
   ],
   [
    "What does stateless DHCPv6 provide?",
    "Extra settings such as DNS servers; the host builds its own address with SLAAC."
   ]
  ],
  "differentiation": [
   "Support: Provide a step-by-step EUI-64 template with boxes for splitting the MAC, inserting fffe and converting the first byte to binary, so students can follow it mechanically.",
   "Extend: Ask fast finishers to explain why SLAAC requires a /64 prefix and what happens to hosts if a router advertises a /56 or /72 prefix on a LAN."
  ]
 },
 {
  "t": "Copper cable categories: Cat 5e, Cat 6, Cat 6a; straight-through vs crossover; 100 m Ethernet limit",
  "objectives": [
   "Students will be able to compare Cat 5e, Cat 6 and Cat 6a by maximum speed and distance.",
   "Students will be able to apply the 100-meter channel limit, including the 90 meter horizontal plus 10 meter patch cable split, to cabling scenarios.",
   "Students will be able to choose straight-through, crossover or rollover cables for given device pairings and explain the role of Auto-MDIX.",
   "Students will be able to explain why twisting pairs reduces interference."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Hold up (or project a photo of) a Cat 6 cable and a Cat 5e cable. Ask students to guess which is faster and which can run farther, and record votes."
   ],
   [
    12,
    "Teach",
    "Present a three-row table for Cat 5e, Cat 6 and Cat 6a. Draw a structured cabling diagram showing patch panel, 90 m horizontal run, wall jack and patch cords. Explain T568A versus T568B and straight-through, crossover and rollover, then Auto-MDIX."
   ],
   [
    15,
    "Activity",
    "Run 'Cable the Building' in groups of three or four using a printed floor plan."
   ],
   [
    8,
    "Discuss",
    "Groups present one design decision each. Discuss the cost and installation trade-offs of higher categories."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "If a better grade of cable carries data faster, should it also be able to carry data farther? Why or why not?",
  "activity": {
   "title": "Cable the Building",
   "materials": "Printed floor plan with a wiring closet and devices marked with distances (for example a desk at 45 m, a camera at 130 m, a server rack at 70 m needing 10 Gbps, a switch-to-switch link in the same room, a router needing console setup); colored markers; a cable category reference sheet.",
   "steps": [
    "Groups examine the floor plan and list each connection that must be cabled, noting distance and required speed.",
    "For each connection, they choose the cable category and justify it in one sentence, flagging any run that exceeds 100 meters.",
    "For runs over 100 meters, they redesign using an intermediate switch or a fiber run and mark it on the plan.",
    "For each device pairing, they label the traditional cable type (straight-through, crossover or rollover) and note whether Auto-MDIX changes the answer.",
    "Groups swap plans with another group, check for errors, and leave sticky-note feedback."
   ]
  },
  "discussion": [
   "Why might an organization install Cat 6a even if its devices only use 1 Gbps today?",
   "What symptoms would you expect on a link that is 120 meters long?",
   "Why are crossover cables less common than they used to be?"
  ],
  "exit": [
   [
    "Which category supports 10 Gbps at the full 100 meters?",
    "Cat 6a."
   ],
   [
    "What is the maximum length of a twisted-pair Ethernet channel, and how is it usually split?",
    "100 meters: up to 90 m of horizontal cable plus up to 10 m of patch cables in total."
   ],
   [
    "Which cable connects a computer to a Cisco console port?",
    "A rollover (console) cable."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a filled-in comparison card for the three categories and a flowchart (same device type? console?) for choosing the cable type during the activity.",
   "Extend: Ask fast finishers to research and explain what a cable certifier measures beyond what a simple continuity tester checks, and why that matters for Cat 6a installations."
  ]
 },
 {
  "t": "Coaxial cable, and single-mode vs multimode fiber (distance, light source, core size)",
  "objectives": [
   "Students will be able to describe the construction of coaxial cable and identify where coax is used today.",
   "Students will be able to compare single-mode and multimode fiber by core size, light source, distance and typical use.",
   "Students will be able to explain modal dispersion and why it limits multimode distance.",
   "Students will be able to choose the correct medium for a scenario and troubleshoot common fiber link problems such as mismatched types and swapped strands."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show photos of a coax cable, a yellow fiber patch cord and an orange or aqua fiber patch cord. Ask students to guess what each carries and where they have seen it."
   ],
   [
    12,
    "Teach",
    "Draw cross-sections of coax and fiber on the board. Compare single-mode and multimode in a table. Demonstrate modal dispersion by drawing straight and zigzag light paths of different lengths. Cover fiber advantages and eye safety."
   ],
   [
    15,
    "Activity",
    "Run the 'Light Path Race' demonstration followed by the 'Pick the Medium' scenario cards in small groups."
   ],
   [
    8,
    "Discuss",
    "Groups share scenario answers. Discuss why fiber is preferred between buildings and how to troubleshoot a fiber link that stays down."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why do you think a company might choose to send data as light instead of electricity between two buildings?",
  "activity": {
   "title": "Light Path Race and Pick the Medium",
   "materials": "Masking tape or whiteboard lines to mark a straight lane and a zigzag lane on the floor or board; a stopwatch on a phone; printed scenario cards (for example a 3 km campus link, a 40 m rack-to-rack link, a cable internet connection, a link through a room full of motors, a link between buildings with separate electrical systems).",
   "steps": [
    "Mark two lanes of equal end-to-end length on the floor or board: a straight lane for single-mode and a zigzag lane for multimode.",
    "Two volunteers walk the lanes at the same pace while the class times them. Discuss how the zigzag walker arrives later, and how many zigzag paths of different lengths would smear a pulse over distance.",
    "In groups, students draw scenario cards and choose coax, single-mode or multimode for each, writing the core size, light source and a one-sentence reason.",
    "Groups then receive a troubleshooting card describing a fiber link that will not come up and list two likely causes and fixes."
   ]
  },
  "discussion": [
   "If single-mode reaches farther, why do data centers still use so much multimode?",
   "Why is fiber's lack of electrical conductivity valuable between buildings?",
   "What safety habits should a technician follow when working with fiber?"
  ],
  "exit": [
   [
    "What is the approximate core size and light source of single-mode fiber?",
    "About 9 micrometers, using lasers."
   ],
   [
    "Which fiber type would you choose for a 5 km link between buildings?",
    "Single-mode fiber."
   ],
   [
    "What is coax most commonly used for today?",
    "Connecting cable TV and cable internet (cable modems), plus some cameras and antennas."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column comparison card for single-mode and multimode with blanks to fill in during the teach segment, and let students use it during the scenario activity.",
   "Extend: Ask fast finishers to explain the difference between OM grades and why aqua laser-optimized multimode supports higher speeds than older orange multimode."
  ]
 },
 {
  "t": "Connectors: RJ-45, RJ-11, BNC, F-type, LC, SC and ST; SFP transceivers",
  "objectives": [
   "Students will be able to identify RJ-45, RJ-11, F-type, BNC, LC, SC and ST connectors from descriptions or images.",
   "Students will be able to match each connector to its medium and typical use.",
   "Students will be able to explain the purpose of an SFP transceiver and the three things it must match.",
   "Students will be able to use descriptive questions to identify a connector during a phone support call."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a photo of the back of a home router and cable modem. Ask students to name every plug they recognize and what it connects."
   ],
   [
    12,
    "Teach",
    "Show a projected image for each connector with its locking style (clip, screw, bayonet, push-pull, latch) and its use. Show a photo of an SFP module and an empty cage. Explain hot-swappable and the matching rules."
   ],
   [
    15,
    "Activity",
    "Run the 'Phone Support Role-Play' in pairs with connector cards."
   ],
   [
    8,
    "Discuss",
    "Debrief which questions worked best to identify connectors quickly. Discuss when an LC-to-SC patch cord is the right fix."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think about the cables behind your TV or home internet equipment. How many different plug shapes can you remember, and why do you think they are all different?",
  "activity": {
   "title": "Phone Support Role-Play",
   "materials": "Printed connector cards with a photo or drawing and a hidden label on the back (RJ-45, RJ-11, F-type, BNC, LC, SC, ST, SFP module); a list of allowed descriptive words; a timer on a phone.",
   "steps": [
    "In pairs, one student is the caller and draws a card without showing it. The other is the technician.",
    "The caller describes the connector using only everyday words (shape, size, how it locks, where it plugs in) and may not say the name.",
    "The technician asks focused questions, such as 'Does it screw on or twist on?', and names the connector and what it connects within 60 seconds.",
    "Switch roles after each card. Pairs track how many they identified correctly and which questions narrowed it down fastest.",
    "Final round: the teacher gives each pair a scenario (SC patch panel, LC switch, single-mode run) and asks them to specify the patch cord and SFP needed."
   ]
  },
  "discussion": [
   "Which single question did you find most useful for identifying a connector over the phone?",
   "Why do switch manufacturers use SFP slots instead of fixed fiber ports?",
   "What could go wrong if a technician orders an SFP based only on the connector type?"
  ],
  "exit": [
   [
    "Which connector screws onto a cable modem?",
    "The F-type connector."
   ],
   [
    "Which fiber connector is round with a bayonet twist-lock?",
    "The ST connector."
   ],
   [
    "Name the three things an SFP module must match.",
    "The fiber type (or copper medium), the distance, and the transceiver at the other end of the link."
   ]
  ],
  "differentiation": [
   "Support: Give students a one-page picture chart of each connector with its locking style and use, and let them refer to it during the first rounds of the role-play.",
   "Extend: Ask fast finishers to explain how `show interfaces status` and `show inventory` would help them verify an SFP remotely, and what information each provides."
  ]
 },
 {
  "t": "Sources of interference on copper and wireless: EMI, crosstalk, microwaves, walls and distance",
  "objectives": [
   "Students will be able to identify common sources of EMI, crosstalk and attenuation on copper cabling and recommend remedies.",
   "Students will be able to explain how microwave ovens, Bluetooth, neighboring networks, obstacles and distance affect Wi-Fi.",
   "Students will be able to interpret interface error counters (input errors, CRC errors, runts) and RSSI values as evidence of interference.",
   "Students will be able to compare the 2.4 GHz and 5 GHz bands in terms of interference and range."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask students to describe a time their Wi-Fi or a phone call kept cutting out. List the places and times on the board and look for patterns."
   ],
   [
    12,
    "Teach",
    "Group interference sources into copper (EMI, crosstalk, attenuation) and wireless (2.4 GHz devices, neighboring networks, obstacles, distance). Show a sample `show interfaces` excerpt with CRC errors and a Wi-Fi client screen with RSSI. Explain negative dBm."
   ],
   [
    16,
    "Activity",
    "Run 'Interference Detective' with printed case files in groups of three."
   ],
   [
    7,
    "Discuss",
    "Groups present one case, their evidence and their fix. Discuss why replacing equipment is often the wrong first step."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Why might your Wi-Fi work perfectly at 10 a.m. and drop repeatedly at noon in the same spot?",
  "activity": {
   "title": "Interference Detective",
   "materials": "Printed case files (five per group), each with a short ticket, a simple floor sketch, and evidence such as a `show interfaces` excerpt with error counters or a Wi-Fi client reading with RSSI and band; worksheet with columns for evidence, likely cause and fix.",
   "steps": [
    "Give each group five cases, for example: break room Wi-Fi drops at lunch; CRC errors on a port near an elevator motor; a cable with untwisted pairs at a jack failing at gigabit speed; slow Wi-Fi in an apartment with many neighboring networks on the same channel; a corner office behind a metal wall with weak 5 GHz signal.",
    "For each case, groups underline the evidence that points to the cause (time pattern, location, counters, RSSI values).",
    "Groups name the interference type (EMI, crosstalk, attenuation, 2.4 GHz device, co-channel interference, obstacle or distance) and write a specific fix.",
    "Groups rank their fixes from least to most expensive and note which they would try first.",
    "Swap worksheets with another group and compare answers, discussing any differences."
   ]
  },
  "discussion": [
   "Why is fiber sometimes the best answer even though it costs more than copper?",
   "When would you deliberately put a client on 2.4 GHz instead of 5 GHz?",
   "How do patterns in time and location help you narrow down an interference problem?"
  ],
  "exit": [
   [
    "Which medium is immune to EMI?",
    "Fiber-optic cable."
   ],
   [
    "A switch port connected near a large motor shows rising CRC errors. What is the likely cause?",
    "EMI from the motor corrupting frames on the copper cable."
   ],
   [
    "Which is stronger: an RSSI of -60 dBm or -85 dBm?",
    "-60 dBm, because values closer to zero are stronger."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each interference type with a picture of a typical source and the matching symptom, and give struggling groups three cases instead of five.",
   "Extend: Ask fast finishers to design a channel plan for three 2.4 GHz access points in a row using non-overlapping channels and to explain how it reduces co-channel and adjacent-channel interference."
  ]
 },
 {
  "t": "Wi-Fi bands 2.4, 5 and 6 GHz and their trade-offs; 802.11 generations",
  "objectives": [
   "Students will be able to compare the 2.4, 5 and 6 GHz bands in terms of range, wall penetration, channel availability and interference.",
   "Students will be able to identify the non-overlapping 2.4 GHz channels in North America and explain why they matter.",
   "Students will be able to match 802.11 standards to their Wi-Fi Alliance names and supported bands.",
   "Students will be able to recommend an appropriate band for a given device and location."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect a few answers. Note on the board any students who mention walls, distance or device age; you will build on those ideas."
   ],
   [
    15,
    "Teach",
    "Draw a frequency line with the three bands and write 'lower = farther, higher = faster and more channels' above it. Sketch overlapping 2.4 GHz channels to show why only 1, 6 and 11 are clean. Then build a table of 802.11b, a, g, n, ac, ax, 6E and be with their Wi-Fi names and bands, pausing on Wi-Fi 4, 5, 6, 6E and 7."
   ],
   [
    15,
    "Activity",
    "Run the band-matching floor plan activity below in pairs. Walk around and ask pairs to defend one placement out loud."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, connecting answers back to the range-versus-speed rule."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note before leaving."
   ]
  ],
  "warmup": "Your phone shows two Wi-Fi names at home, one ending in '-5G'. Why might you be connected to the other one when you are in the backyard?",
  "activity": {
   "title": "Band matching on a floor plan",
   "materials": "A printed simple office floor plan per pair (teacher-drawn, showing one AP, rooms and wall types), a set of printed device cards, colored markers or sticky notes.",
   "steps": [
    "Give each pair a floor plan and about ten device cards, such as 'smart thermostat, 2.4 GHz only, hallway', 'new Wi-Fi 7 laptop, same room as AP', 'old 802.11g barcode scanner, warehouse', 'Wi-Fi 5 tablet, two rooms away'.",
    "Pairs place each device on the plan and color-code which band it should use: 2.4, 5 or 6 GHz.",
    "For each device, pairs write one sentence justifying the band using range, penetration, interference or device support.",
    "Pairs then mark three AP channel choices for a second and third AP on 2.4 GHz, using only non-overlapping channels.",
    "Two pairs combine, compare plans and resolve disagreements; the teacher reviews the trickiest cards with the class."
   ]
  },
  "discussion": [
   "Why might an organization disable 2.4 GHz on its staff network but leave it on for an IoT network?",
   "If newer Wi-Fi standards are backward compatible, why can one old device still slow everyone down?"
  ],
  "exit": [
   [
    "Which three 2.4 GHz channels do not overlap in North America?",
    "Channels 1, 6 and 11."
   ],
   [
    "What are the 802.11 standards for Wi-Fi 5 and Wi-Fi 6?",
    "Wi-Fi 5 is 802.11ac; Wi-Fi 6 is 802.11ax."
   ],
   [
    "A device must reach an AP through several walls. Which band is usually the best choice and why?",
    "2.4 GHz, because lower frequencies have longer range and pass through walls better."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-filled comparison table with blanks for only one property per band, and let them use it as a reference during the floor plan activity.",
   "Extend: Ask fast finishers to explain DFS channels and why an AP on a DFS channel might suddenly change channel, then propose how that could appear as a user complaint."
  ]
 },
 {
  "t": "Cellular 4G/5G as licensed spectrum vs unlicensed Wi-Fi; hotspots and tethering",
  "objectives": [
   "Students will be able to explain the difference between licensed and unlicensed spectrum and name which wireless technologies use each.",
   "Students will be able to compare cellular and Wi-Fi in terms of coverage, cost, management and interference.",
   "Students will be able to describe how a mobile hotspot shares a cellular connection, including NAT and private addressing.",
   "Students will be able to apply security and troubleshooting steps to a user working over a hotspot."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question and take quick answers from several students. Write 'who owns the airwaves?' on the board as a hook."
   ],
   [
    15,
    "Teach",
    "Use a two-column chart, Cellular versus Wi-Fi, and fill it in with the class: spectrum type, who manages it, range, cost, interference. Explain 4G LTE and the three 5G frequency ranges. Then draw a phone acting as a hotspot with a laptop behind it, labeling private addresses and NAT."
   ],
   [
    15,
    "Activity",
    "Run the 'which connection?' scenario role-play below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Walk through the discussion questions and connect them to backup links in real offices."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "Why does your phone's mobile data usually still work in a crowded stadium parking lot when the stadium's free Wi-Fi has stopped working?",
  "activity": {
   "title": "Which connection? Help-desk role-play",
   "materials": "Printed scenario cards (teacher-made), a whiteboard for each group's answers or a sheet of paper, a timer on the projector.",
   "steps": [
    "Form groups of three: one caller, one technician and one observer. Give the caller a scenario card, such as 'branch internet down, terminals offline', 'hotspot slow in a rural area', 'laptop on hotspot cannot reach file server', or 'IoT sensor in a field with no Wi-Fi'.",
    "The caller describes the problem in plain words; the technician asks questions and recommends a connection type or fix, explaining licensed versus unlicensed where relevant.",
    "The observer checks the answer against a short key on the back of the card and notes one thing the technician did well and one thing to improve.",
    "Rotate roles every four minutes so each student plays technician once.",
    "Groups share their trickiest scenario with the class, and the teacher clarifies any misconceptions."
   ]
  },
  "discussion": [
   "What are the trade-offs of using cellular as a permanent primary connection for a small office instead of a backup?",
   "Why might a company require employees to use the VPN even when working from a phone hotspot?"
  ],
  "exit": [
   [
    "Which uses licensed spectrum, cellular or Wi-Fi?",
    "Cellular; carriers hold exclusive licenses for their frequencies, while Wi-Fi uses unlicensed bands."
   ],
   [
    "What address does a laptop get when connected to a phone hotspot, and who gives it out?",
    "A private IP address handed out by the phone, which then uses NAT to share its cellular connection."
   ],
   [
    "Name one way to secure a mobile hotspot.",
    "Use WPA2 or WPA3 with a strong password instead of leaving it open."
   ]
  ],
  "differentiation": [
   "Support: Provide a partly completed Cellular versus Wi-Fi chart and a short glossary card for SIM, NAT, LTE and hotspot that students can keep during the role-play.",
   "Extend: Ask fast finishers to design a backup plan for a three-branch business, explaining when traffic should fail over to cellular and what limits, such as data caps, they would warn the owner about."
  ]
 },
 {
  "t": "What a client needs to join Wi-Fi: SSID, security type and password or credentials",
  "objectives": [
   "Students will be able to name the three items a client needs to join a Wi-Fi network and explain what each one does.",
   "Students will be able to compare Open, Personal (PSK) and Enterprise (802.1X) security types and the credentials each requires.",
   "Students will be able to explain why a hidden SSID is not a security control.",
   "Students will be able to troubleshoot a failed Wi-Fi connection by checking SSID, security type, credentials and IP address in order."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up question and collect a few stories. List the causes students mention on the board and group them later under SSID, security type or password."
   ],
   [
    15,
    "Teach",
    "Draw an AP and a laptop on the board with three 'keys' between them: SSID, security type, credential. Explain beacons and hidden SSIDs, then compare Open, WPA2/WPA3-Personal, transition mode and Enterprise with 802.1X and RADIUS. Close with captive portals and the 169.254 check."
   ],
   [
    15,
    "Activity",
    "Run the 'Why won't it connect?' troubleshooting cards in pairs as described below."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions, emphasizing why security comes from encryption and credentials, not from hiding names."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note before leaving."
   ]
  ],
  "warmup": "Think of a time you or someone you know could not get onto a Wi-Fi network. What turned out to be wrong?",
  "activity": {
   "title": "Why won't it connect? Troubleshooting cards",
   "materials": "Printed ticket cards (teacher-made) each showing an AP configuration and a client's attempt, a printed answer key, sticky notes.",
   "steps": [
    "Give each pair a stack of eight ticket cards. Each card shows the AP side (SSID, security type, passphrase or 802.1X) and the client side (what the user chose and typed), for example 'AP: Office, WPA3-only; client: old tablet, WPA2 only'.",
    "Pairs identify which of the three items does not match, or note that the device joined but has a 169.254 address or is behind a captive portal.",
    "For each card, pairs write the fix in one sentence on a sticky note and attach it.",
    "Pairs swap stacks with another pair and check each other's answers against the key.",
    "The teacher reviews any cards that caused disagreement, especially the hidden SSID and transition mode cards."
   ]
  },
  "discussion": [
   "Why do some organizations still hide their SSID even though it does not improve security, and what does it cost them?",
   "When would Enterprise Wi-Fi be worth the extra setup compared with a shared passphrase?"
  ],
  "exit": [
   [
    "List the three things a client needs to join a secured Wi-Fi network.",
    "The SSID, the security type and the matching passphrase or credentials."
   ],
   [
    "Does hiding an SSID secure a network? Explain briefly.",
    "No. The name still appears in other frames and is easy to discover; encryption and strong credentials provide security."
   ],
   [
    "What does WPA2-Enterprise use to check each user's credentials?",
    "802.1X with an authentication server, usually RADIUS."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a three-step checklist card (SSID, security type, credential, then IP address) to follow for each ticket card, and pair them with a confident partner.",
   "Extend: Ask fast finishers to design an SSID plan for a small clinic with staff, guest and IoT networks, naming the security type for each and explaining how they map to VLANs."
  ]
 },
 {
  "t": "Endpoint types: desktops, laptops, phones, tablets, servers, printers and IoT devices",
  "objectives": [
   "Students will be able to distinguish endpoints from infrastructure devices and give examples of each.",
   "Students will be able to describe how desktops, laptops, mobile devices, servers, printers and IoT devices typically connect and what problems are common for each.",
   "Students will be able to explain why servers and printers need static or reserved addresses.",
   "Students will be able to apply basic security practices to IoT devices and prioritize tickets by endpoint type."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students call out devices. Sort them on the board into two unlabeled columns: endpoints and infrastructure. Reveal the labels at the end."
   ],
   [
    15,
    "Teach",
    "Walk through each endpoint type with one slide or board sketch each: connection method, typical tools, addressing and common problems. Spend extra time on static versus reserved addresses for printers and servers, and on IoT risks and segmentation."
   ],
   [
    15,
    "Activity",
    "Run the ticket triage sort below in groups of three or four."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect endpoint type with urgency and security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "List every device in your home or classroom that connects to a network. Which of them do people use directly, and which just move traffic around?",
  "activity": {
   "title": "Ticket triage by endpoint type",
   "materials": "Printed ticket cards (teacher-made, about twelve per group), a whiteboard or poster divided into 'High', 'Medium' and 'Low' priority, sticky notes, markers.",
   "steps": [
    "Give each group a stack of ticket cards describing problems on different endpoints, such as 'file server unreachable', 'shared printer stopped after router swap', 'IoT camera sending traffic to unknown address', 'one laptop cannot reach VPN from home'.",
    "Groups label each card with the endpoint type and the first thing they would check, written on a sticky note.",
    "Groups place each card in a priority column and note why, considering how many users are affected and whether security is involved.",
    "Groups pick two IoT or printer cards and write the preventive fix, such as a DHCP reservation or a separate VLAN.",
    "Groups present their top-priority card and reasoning; the teacher highlights differences between groups and discusses them."
   ]
  },
  "discussion": [
   "Should personally owned phones be allowed on the same network as company laptops? What are the trade-offs?",
   "Why do IoT devices often stay insecure for years after installation, and whose job should it be to fix that?"
  ],
  "exit": [
   [
    "Is an access point an endpoint? Explain briefly.",
    "No. An access point is an infrastructure device that moves traffic between endpoints and the network."
   ],
   [
    "Why do servers usually have static IP addresses?",
    "So clients can always find them at the same address."
   ],
   [
    "Give two ways to reduce the risk from IoT devices.",
    "Change default passwords, keep firmware updated, or place them on a separate VLAN or segment."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each endpoint type with its usual connection method and one common problem, so students can match tickets without recalling everything from memory.",
   "Extend: Ask fast finishers to write a one-paragraph network segmentation plan for a small office with staff PCs, a guest network, a server, two printers and ten IoT devices."
  ]
 },
 {
  "t": "Checking connectivity on Windows, Linux, macOS, Android and iOS: settings screens and command-line tools",
  "objectives": [
   "Students will be able to locate IP address, subnet mask, default gateway and DNS settings on Windows, Linux, macOS, Android and iOS.",
   "Students will be able to choose the correct command-line tool for each desktop platform, such as ipconfig, ip, ifconfig, tracert and traceroute.",
   "Students will be able to interpret a 169.254.x.x address as a DHCP failure.",
   "Students will be able to guide a user through a consistent connectivity check sequence over the phone."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question. Collect answers by platform on the board, noting where students are unsure."
   ],
   [
    15,
    "Teach",
    "Project a five-column table, one column per platform, and fill in rows for 'settings screen', 'show address', 'show gateway', 'show DNS', 'path test' and 'DNS test'. If student laptops are available, have volunteers run ipconfig /all or open the Wi-Fi details on their own device as you go. Finish with the universal check order."
   ],
   [
    15,
    "Activity",
    "Run the phone-guide role-play below in pairs."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on why the check order stays the same across platforms."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "If a friend called you and said 'my internet is broken', what is the first thing you would ask them to look at on their device?",
  "activity": {
   "title": "Talk me through it: phone-guide role-play",
   "materials": "Printed platform cards (Windows, Linux, macOS, Android, iOS) with teacher-made screenshots or typed output showing each device's settings, a printed reference table, student laptops with a browser or terminal if available.",
   "steps": [
    "Pair students as caller and technician, seated back to back so the technician cannot see the caller's card.",
    "The caller holds a platform card showing a problem, such as a Windows `ipconfig /all` output with a 169.254 address or an iPhone Wi-Fi screen with no router listed.",
    "The technician must guide the caller to the right screen or command for that platform and ask for the values needed, then state the likely problem.",
    "After each card, partners check the reference table and swap roles.",
    "Each pair completes at least four platforms; the teacher circulates and listens for wrong-platform commands such as tracert on Linux."
   ]
  },
  "discussion": [
   "Why is it useful to follow the same check order no matter which operating system a user has?",
   "What are the limits of troubleshooting a phone with no command line, and how can a technician work around them?"
  ],
  "exit": [
   [
    "Which Windows command shows DNS servers and the MAC address?",
    "`ipconfig /all`."
   ],
   [
    "What Linux command shows the default gateway?",
    "`ip route`, on the line starting with `default via`."
   ],
   [
    "What does a 169.254.x.x address tell you?",
    "The device did not get a DHCP address and assigned itself an APIPA (link-local) address."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the completed reference table during the role-play and have them focus on reading values correctly before memorizing commands.",
   "Extend: Ask fast finishers to compare `netstat` on Windows with `ss` on Linux, run them on a lab machine if available, and explain what a listening port line means."
  ]
 },
 {
  "t": "Cisco device LEDs: system and port lights, green vs amber, solid vs blinking, and what they tell an engineer on the phone",
  "objectives": [
   "Students will be able to interpret the SYST LED states on a typical Cisco switch: solid green, blinking green, amber and off.",
   "Students will be able to interpret port LED states in status mode, including off, solid green, blinking green, amber and alternating green and amber.",
   "Students will be able to explain the role of the MODE button and why it affects what port LEDs mean.",
   "Students will be able to give a precise, structured verbal report of LED states to a remote engineer."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect answers about what dashboard lights mean in cars. Connect green, amber and off to the idea of a status code."
   ],
   [
    15,
    "Teach",
    "Project or draw a switch front panel with a SYST LED, a mode LED row and 24 ports. Go through each SYST state, then each port state in STAT mode, and show how the MODE button changes the meaning. Model a good phone report out loud using the format: device, mode, SYST, then ports."
   ],
   [
    15,
    "Activity",
    "Run the 'phone a friend' LED reporting activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce why precision matters and how LEDs connect to show commands."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "When a warning light comes on in a car, what do the color and whether it flashes tell the driver?",
  "activity": {
   "title": "Phone a friend: LED reporting",
   "materials": "Printed switch panel diagrams (teacher-made) with LEDs colored in using markers or stickers, a printed LED meaning key, a timer on the projector.",
   "steps": [
    "Pair students as 'closet tech' and 'remote engineer', seated back to back. Give the closet tech a printed switch panel showing a scenario, such as port 12 solid amber or SYST blinking green.",
    "The closet tech has two minutes to describe the panel using the format: device, mode LED, SYST state, then each relevant port with number, color and solid, blinking or off.",
    "The remote engineer draws what they hear on a blank panel and states the likely problem and a next step, using the key.",
    "Partners compare drawings to the original and note any detail that was lost in the description.",
    "Swap roles and repeat with a new panel; the teacher closes by showing a `show interfaces status` excerpt that matches one scenario."
   ]
  },
  "discussion": [
   "What can go wrong when a technician describes lights vaguely, and how could it waste an engineer's time?",
   "Why do you think engineers still rely on LEDs when they can usually log in to a switch remotely?"
  ],
  "exit": [
   [
    "What does a solid amber port LED usually mean in status mode?",
    "The port is not forwarding, for example blocked by Spanning Tree, administratively disabled or shut down for a violation."
   ],
   [
    "What does a blinking green SYST LED indicate?",
    "The switch is booting or running its power-on self-test."
   ],
   [
    "Give the four parts of a good LED report over the phone.",
    "The device name, the selected mode, the SYST LED state, and each relevant port's number with its color and whether it is solid, blinking or off."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a laminated LED meaning card and a fill-in-the-blank report template to read from during the activity.",
   "Extend: Ask fast finishers to match a printed `show interfaces status` output to a set of LED descriptions, explaining which port is err-disabled and which is notconnect."
  ]
 },
 {
  "t": "Reading a network diagram to patch the right cable into the right port",
  "objectives": [
   "Students will be able to distinguish physical and logical network diagrams and state what each is used for.",
   "Students will be able to identify common Cisco diagram symbols and line styles.",
   "Students will be able to decode Cisco interface identifiers such as Gi1/0/24 and Te1/1/1.",
   "Students will be able to apply a patching and verification routine using a diagram, labels and show commands."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Show the warm-up question with a photo or sketch of a messy rack. Ask students how they would avoid plugging into the wrong port."
   ],
   [
    15,
    "Teach",
    "Project a simple physical diagram and the matching logical diagram side by side. Point out symbols, the legend, interface labels and patch panel numbers. Decode three interface names on the board. Show how odd and even port rows work, then model verification with sample `show interfaces status` and `show cdp neighbors` output."
   ],
   [
    15,
    "Activity",
    "Run the paper patch-panel challenge below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on diagram accuracy and documentation habits."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Imagine you are asked to plug a cable into 'port 14' on a rack with three identical switches. What information would you want before you touch anything?",
  "activity": {
   "title": "Paper patch-panel challenge",
   "materials": "Printed physical and logical diagrams (teacher-made), printed paper mock-ups of a rack with three labeled switches (odd ports top, even ports bottom) and one patch panel, yarn or string as patch cables, tape, printed sample show command output.",
   "steps": [
    "Give each group a diagram set and a paper rack. The physical diagram lists four links, such as 'AP-WH1 to WH-SW2 Gi1/0/14 via PP-B 14'.",
    "Groups use string and tape to 'patch' each link on the paper rack from the patch panel port to the correct switch and port.",
    "Groups use the logical diagram to write which VLAN each port should be in.",
    "The teacher hands each group a printed `show cdp neighbors` and `show interfaces status` output; groups check whether their patching matches and find one deliberate error planted in the output.",
    "Groups explain the error and how they would update the diagram or labels."
   ]
  },
  "discussion": [
   "What happens over time in an organization that never updates its network diagrams?",
   "When would a logical diagram be more useful than a physical one during troubleshooting?"
  ],
  "exit": [
   [
    "Which diagram type would you use to find the exact switch port for a cable?",
    "A physical diagram."
   ],
   [
    "In Te1/1/1, what does Te mean and which number is the port?",
    "TenGigabitEthernet; the last 1 is the port number."
   ],
   [
    "Name one command that confirms which device is connected to a switch port.",
    "`show cdp neighbors`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a decoder card for interface names and a numbered photo of a switch front panel showing odd and even rows.",
   "Extend: Ask fast finishers to redraw the given physical diagram as a logical diagram, showing subnets, VLANs and the default gateway for each."
  ]
 },
 {
  "t": "Device ports: RJ-45 Ethernet, SFP/fiber, console (RJ-45 and USB), management, serial, USB and PoE ports",
  "objectives": [
   "Students will be able to identify RJ-45 Ethernet, SFP, console, management, serial, USB and PoE ports on a network device and state the purpose of each.",
   "Students will be able to explain out-of-band console access and list the standard terminal settings 9600 8-N-1 with no flow control.",
   "Students will be able to compare the console port with the management port.",
   "Students will be able to choose the correct port and cable for a given connection scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display a photo or drawing of the back and front of a switch and ask the warm-up question. Have students guess what each opening is for."
   ],
   [
    15,
    "Teach",
    "Label each port on the projected image one at a time: Ethernet, SFP with a transceiver, RJ-45 console with rollover cable, USB console, MGMT, serial, USB-A and PoE. Write 9600 8-N-1 on the board and explain out-of-band access. Contrast console and MGMT in a two-column chart."
   ],
   [
    15,
    "Activity",
    "Run the 'Which port?' scenario card match below in pairs."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions about out-of-band access and labeling."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Two sockets on a switch look exactly the same. How could you tell what each one is for without plugging anything in?",
  "activity": {
   "title": "Which port? Scenario card match",
   "materials": "Printed port cards (one per port type with a simple drawing), printed scenario cards (teacher-made), printed cable cards (patch cable, rollover cable, USB console cable, fiber with transceiver, USB flash drive).",
   "steps": [
    "Give each pair a set of port cards, cable cards and about ten scenario cards, such as 'configure a brand-new switch with no IP', 'link to a building 300 meters away', 'copy a new image to the router', 'power a ceiling AP without an outlet'.",
    "Pairs match each scenario with the correct port card and cable card.",
    "For each match, pairs write one sentence explaining why, using terms like out-of-band, transceiver or PoE.",
    "Pairs then sort the port cards into 'carries user traffic' and 'does not carry user traffic'.",
    "The teacher reviews the answers, focusing on console versus MGMT and USB console versus USB storage."
   ]
  },
  "discussion": [
   "Why is out-of-band console access still important even when every device has a management IP address?",
   "What problems could occur if ports and cables in a closet are not clearly labeled?"
  ],
  "exit": [
   [
    "What are the standard console terminal settings?",
    "9600 baud, 8 data bits, no parity, 1 stop bit, no flow control."
   ],
   [
    "How does the MGMT port differ from the console port?",
    "The MGMT port is Ethernet and needs an IP address on a management network; the console port is out-of-band and works with no network."
   ],
   [
    "Which port would you use for a fiber uplink?",
    "An SFP or SFP+ port with a fiber transceiver."
   ]
  ],
  "differentiation": [
   "Support: Provide a labeled photo of a switch front and back as a reference sheet, and let students match scenarios using the photo before using the plain port cards.",
   "Extend: Ask fast finishers to explain why SFP modules make a switch more flexible, and to describe how they would check whether a phone failed to power on because of a non-PoE port or a power budget limit."
  ]
 },
 {
  "t": "Power over Ethernet: powering phones, APs and cameras from the switch",
  "objectives": [
   "Students will be able to explain how PoE delivers power and data over one Ethernet cable and why organizations use it.",
   "Students will be able to identify the PSE and PD in a PoE setup and describe detection.",
   "Students will be able to compare 802.3af, 802.3at and 802.3bt power levels.",
   "Students will be able to troubleshoot PoE problems using the power budget and `show power inline` output."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take a few answers. Sketch a ceiling AP with no outlet nearby to set up the problem PoE solves."
   ],
   [
    15,
    "Teach",
    "Draw a switch, an injector and three devices, labeling PSE and PD. Explain detection and classification. Build a small table of 802.3af, 802.3at and 802.3bt with approximate watts, then explain the power budget with a simple addition example. Project a sample `show power inline` output and walk through its columns."
   ],
   [
    15,
    "Activity",
    "Run the PoE budget planning activity below in groups of three."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on UPS protection and planning headroom."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Wi-Fi access points are often mounted on ceilings where there is no power outlet. How do you think they get electricity?",
  "activity": {
   "title": "PoE budget planning",
   "materials": "Printed device cards showing a device type and its power draw (teacher-made), a printed switch spec card with a total budget and per-port standard, a printed sample `show power inline` output, calculators or student laptops.",
   "steps": [
    "Give each group a switch card, such as '24 ports, PoE+ on all ports, total budget stated on the card', and a stack of device cards with power draws for phones, APs and cameras.",
    "Groups add up the power draw for a proposed set of devices and decide whether the switch can power them all with some headroom.",
    "Groups identify which devices need PoE+ or 802.3bt rather than basic PoE, based on the card values.",
    "Groups read the sample `show power inline` output and identify one port that is not receiving power and the likely reason.",
    "Each group presents its plan, including what it would do if the budget is exceeded, such as a second switch or injectors."
   ]
  },
  "discussion": [
   "Why might a school or hospital want its PoE switches connected to a UPS?",
   "What are the risks of planning a PoE switch to run at exactly 100 percent of its budget?"
  ],
  "exit": [
   [
    "In a PoE setup, which device is the PSE and which is the PD?",
    "The switch or injector is the PSE; the phone, AP or camera is the PD."
   ],
   [
    "About how much power does 802.3af provide per port compared with 802.3at?",
    "About 15.4 W for 802.3af and about 30 W for 802.3at (PoE+)."
   ],
   [
    "Some cameras on a busy PoE switch will not power on while others work. What is the first thing to check?",
    "The switch's power budget, using `show power inline`."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a pre-filled table of PoE standards and a worked budget example to follow before they try their own calculation.",
   "Extend: Ask fast finishers to design PoE for a building with 40 phones, 12 APs and 16 cameras, choosing between one larger switch and two smaller ones and justifying the choice."
  ]
 },
 {
  "t": "Default gateway: why a host needs one and what happens without it",
  "objectives": [
   "Students will be able to explain why a host needs a default gateway to reach other subnets and the internet.",
   "Students will be able to describe how a host decides whether a destination is local or remote and which MAC address it uses in each case.",
   "Students will be able to recognize the symptoms of a missing or wrong default gateway.",
   "Students will be able to apply a test sequence that separates host, gateway, upstream and DNS problems."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and take quick answers. Write 'local works, internet does not' on the board as the case to solve."
   ],
   [
    15,
    "Teach",
    "Draw two subnets joined by a router. Walk a packet from a host to a local neighbor (ARP for the neighbor) and then to a remote server (ARP for the gateway, packet still addressed to the server). Show where the gateway appears in `ipconfig`, `ip route` and on a phone. List common causes and the test sequence."
   ],
   [
    15,
    "Activity",
    "Run the 'packet walk' role-play below with the whole class in small teams."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on gateways versus DNS and on static settings."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "Your computer can print to the printer next to you but cannot open any website. What might be different between those two kinds of traffic?",
  "activity": {
   "title": "Packet walk role-play",
   "materials": "Printed role cards (host, local printer, gateway router, remote server, DNS server), envelopes or folded paper to act as packets, sticky notes for MAC and IP labels, a whiteboard diagram of two subnets.",
   "steps": [
    "Assign students to roles and give each a card showing their IP address, MAC address and subnet. The host also has a settings card showing its mask and gateway.",
    "The host 'sends' a packet to the local printer: the class decides whether it is local, and the host writes the printer's MAC on the outside of the envelope and its IP on the inside.",
    "The host sends a packet to the remote server: the class confirms it is remote, so the outside label gets the gateway's MAC while the inside keeps the server's IP. The gateway carries it across.",
    "The teacher changes the host's gateway card to a wrong subnet address or removes it, and the class acts out what fails and what still works.",
    "Teams write the test sequence they would use to find each fault and share it with the class."
   ]
  },
  "discussion": [
   "Why is it risky to set gateways by hand on many computers instead of using DHCP?",
   "How can you tell from simple tests whether a problem is the gateway setting or DNS?"
  ],
  "exit": [
   [
    "What is the default gateway?",
    "The router address a host sends traffic to when the destination is on a different subnet."
   ],
   [
    "A host can reach local devices but not the internet. What setting do you check first?",
    "The default gateway, to confirm it exists, is correct and is in the host's subnet."
   ],
   [
    "When sending to a remote network, which MAC address does the host put in the frame?",
    "The default gateway's MAC address."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart card that asks 'Same subnet?' and shows the two paths, and let them follow it during the role-play.",
   "Extend: Ask fast finishers to explain why a Cisco Layer 2 switch needs `ip default-gateway` for management, and to predict what happens if it is missing when an administrator connects from another subnet."
  ]
 },
 {
  "t": "Local vs remote networks and how a router decides where to send a packet",
  "objectives": [
   "Students will be able to explain how a host distinguishes local from remote destinations and how a router forwards packets using its routing table.",
   "Students will be able to identify connected, local, static, dynamic and default routes from Cisco routing table codes.",
   "Students will be able to apply the longest prefix match rule to choose the route for a given destination.",
   "Students will be able to describe what happens to a packet with no matching route and how TTL prevents loops."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question about mail sorting and gather answers. Connect 'most specific address wins' to the lesson."
   ],
   [
    15,
    "Teach",
    "Draw a router with three interfaces and build its routing table on the board, adding C and L routes, a static route, an OSPF route and a default route. Work through three example destinations using longest prefix match. Explain the gateway of last resort, dropped packets, TTL decrement and MAC rewrite at each hop."
   ],
   [
    15,
    "Activity",
    "Run the 'be the router' longest prefix match game below in pairs."
   ],
   [
    5,
    "Discuss",
    "Lead the discussion questions on static versus dynamic routes and default routes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note."
   ]
  ],
  "warmup": "A mail sorter has one bin for 'all of California' and another for 'Los Angeles only'. Which bin should a letter for Los Angeles go into, and why?",
  "activity": {
   "title": "Be the router: longest prefix match game",
   "materials": "Printed routing table cards (teacher-made) with five to seven routes each, a deck of printed packet cards with destination IP addresses, scrap paper, a projector to show the answer key.",
   "steps": [
    "Give each pair a routing table card containing connected, static and default routes with overlapping prefixes, such as 10.0.0.0/8, 10.1.0.0/16, 10.1.2.0/24 and 0.0.0.0/0.",
    "Partners take turns drawing a packet card and announcing which route the router uses and which interface or next hop the packet leaves through.",
    "For each packet, the partner checks the answer and both write down the matching routes and why the chosen one is longest.",
    "Include two packet cards that match nothing on a table without a default route; pairs must state that the packet is dropped and an ICMP Destination Unreachable may be sent.",
    "The teacher projects the answer key and discusses the cards that caused the most disagreement."
   ]
  },
  "discussion": [
   "When would a small office choose static routes instead of a dynamic routing protocol, and what is the downside?",
   "Why is a default route useful, and what problems could a wrong default route cause?"
  ],
  "exit": [
   [
    "A router has 10.0.0.0/8 and 10.20.0.0/16. Which route does a packet to 10.20.7.1 use?",
    "10.20.0.0/16, the longest prefix match."
   ],
   [
    "What do the codes C, S and S* mean in a Cisco routing table?",
    "C is directly connected, S is static, and S* is a static default route."
   ],
   [
    "What happens to a packet with no matching route when there is no default route?",
    "The router drops it and may send an ICMP Destination Unreachable message to the sender."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a prefix helper card showing how many octets /8, /16 and /24 cover, and let them start with tables that use only those prefix lengths.",
   "Extend: Ask fast finishers to add a /20 or /27 route to their table, work out which addresses it covers, and create two new packet cards that test it."
  ]
 },
 {
  "t": "Layer 2 vs Layer 3 switches, and routers vs switches",
  "objectives": [
   "Students will be able to explain how a Layer 2 switch, a router and a Layer 3 switch each make forwarding decisions.",
   "Students will be able to compare collision domains and broadcast domains created by hubs, switches, VLANs and routers.",
   "Students will be able to describe how SVIs allow a Layer 3 switch to route between VLANs.",
   "Students will be able to choose the right device for a described network requirement."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt. Collect three or four answers aloud and write the words 'MAC' and 'IP' on opposite sides of the whiteboard."
   ],
   [
    12,
    "Teach",
    "Draw a Layer 2 switch with two VLANs, then add a router and show a packet crossing it. Redraw the design with a Layer 3 switch and two SVIs. Say clearly: switches forward on MAC, routers on IP, and only VLANs and Layer 3 devices separate broadcast domains. Show sample `show mac address-table` and `show ip route` output on the projector."
   ],
   [
    18,
    "Activity",
    "Run the device-matching card sort described below in groups of three. Circulate and ask each group to justify one choice aloud."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions and connect answers back to the campus core versus internet edge design."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "Your home has a Wi-Fi router from your internet provider. Is it really just a router? What other jobs do you think that one box is doing?",
  "activity": {
   "title": "Pick the right box",
   "materials": "Printed scenario cards (about 10), three header cards labeled 'Layer 2 switch', 'Layer 3 switch' and 'Router or firewall', whiteboard markers.",
   "steps": [
    "Give each group the three header cards and a shuffled set of scenario cards, such as 'connect 40 desks in one VLAN', 'route between 15 internal VLANs quickly', 'terminate a VPN to a branch office' and 'translate private addresses for internet access'.",
    "Groups place each scenario under the device that best fits and write on the card whether the device forwards by MAC or IP address for that job.",
    "For each card under 'Layer 3 switch', groups sketch the SVIs needed and label the default gateway addresses.",
    "Groups trade tables with a neighbor, review the other group's placements and mark any they disagree with.",
    "The teacher reviews disputed cards with the class and confirms the answers."
   ]
  },
  "discussion": [
   "Why do many organizations route internal VLANs on a Layer 3 switch but keep a router or firewall at the internet edge?",
   "If a Layer 2 switch has an IP address, what is that address for, and why might a new technician misread it?"
  ],
  "exit": [
   [
    "What address does a Layer 2 switch use to forward frames, and what address does a router use?",
    "A Layer 2 switch uses the destination MAC address; a router uses the destination IP address."
   ],
   [
    "How does a Layer 3 switch route between VLAN 10 and VLAN 20?",
    "It uses an SVI for each VLAN, such as interface vlan 10 and interface vlan 20, as the hosts' default gateways, with ip routing enabled."
   ],
   [
    "Which devices separate broadcast domains?",
    "Routers and Layer 3 switch interfaces (and VLANs, each of which is its own broadcast domain). A Layer 2 switch does not separate broadcast domains within a VLAN."
   ]
  ],
  "differentiation": [
   "Support: Provide a one-page table comparing hub, Layer 2 switch, Layer 3 switch and router by layer, address used and domains separated, and let struggling students use it during the card sort.",
   "Extend: Ask fast finishers to draw a three-building campus with 12 VLANs and an internet connection, labeling which devices route, where each SVI lives and where NAT happens."
  ]
 },
 {
  "t": "MAC address tables: how a switch learns, forwards, floods and filters",
  "objectives": [
   "Students will be able to explain how a switch builds its MAC address table from source addresses.",
   "Students will be able to predict whether a switch will forward, flood or filter a given frame.",
   "Students will be able to read `show mac address-table` output to locate a device by port and VLAN.",
   "Students will be able to describe how port security limits MAC flooding."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let two or three students share. Write 'source' and 'destination' on the board."
   ],
   [
    12,
    "Teach",
    "Walk through a four-port switch on the whiteboard with an empty table. Send three frames step by step, filling in the table and saying aloud whether each frame is learned, forwarded, flooded or filtered. Project a sample `show mac address-table` output and point out the Vlan, Mac Address, Type and Ports columns."
   ],
   [
    18,
    "Activity",
    "Run the human switch role-play described below, repeating with a second set of frame cards if time allows."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect the role-play to MAC flooding and port security."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper and hand them in."
   ]
  ],
  "warmup": "If you started a new job as a receptionist with no seating chart, how would you figure out where everyone sits without asking them?",
  "activity": {
   "title": "Be the switch",
   "materials": "Printed frame cards showing source MAC, destination MAC and VLAN; sticky notes; a whiteboard table with columns VLAN, MAC and Port.",
   "steps": [
    "Choose one student as the switch and four to six students as hosts, each holding a card with their short MAC address (for example AAAA or BBBB), a port number and a VLAN.",
    "The teacher hands a frame card to a host, who passes it to the switch through their port.",
    "The switch student first writes the source MAC, port and VLAN on the board table, then decides aloud whether to forward, flood or filter, and physically hands the frame or copies to the correct hosts.",
    "Include a broadcast card, a frame between two hosts in different VLANs and a frame where two hosts share one port behind a pretend hub, so every action appears at least once.",
    "Halfway through, erase one entry to simulate the 300-second aging timer and have the class predict the next action.",
    "Groups then read a printed `show mac address-table` excerpt and answer where three specific devices are connected."
   ]
  },
  "discussion": [
   "What could happen to privacy on a VLAN if the MAC address table filled up completely?",
   "Why is it normal for an uplink port to show dozens of MAC addresses but suspicious for a desk port?"
  ],
  "exit": [
   [
    "A frame arrives on port 3 from MAC AAAA to MAC CCCC, and CCCC is not in the table. What two things does the switch do?",
    "It learns AAAA on port 3, then floods the frame out all other ports in the same VLAN."
   ],
   [
    "What is the default dynamic MAC aging time on Cisco switches?",
    "300 seconds."
   ],
   [
    "Which command finds the port where MAC 0011.2233.4455 is connected?",
    "show mac address-table address 0011.2233.4455."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a flowchart card with three questions in order (Is the source known? Is the destination known? Is it on the same port?) to follow during the role-play.",
   "Extend: Ask fast finishers to explain in writing how a device moving from port 4 to port 9 changes the table, and how port security with a maximum of one address would react."
  ]
 },
 {
  "t": "VLANs: separating broadcast domains on one switch; access vs trunk ports",
  "objectives": [
   "Students will be able to explain why each VLAN is a separate broadcast domain and usually a separate subnet.",
   "Students will be able to compare access ports and trunk ports, including tagging and the native VLAN.",
   "Students will be able to interpret `show vlan brief` and `show interfaces trunk` output to find a VLAN problem.",
   "Students will be able to recommend VLAN assignments that separate guest, voice and staff traffic."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and collect ideas on the board under 'Keep apart'."
   ],
   [
    12,
    "Teach",
    "Draw two switches joined by a trunk with three VLANs in three colors. Trace a broadcast in VLAN 10 and show it never reaching VLAN 20. Show where the 802.1Q tag is added and removed, and explain the native VLAN. Project sample `show vlan brief` and `show interfaces trunk` output."
   ],
   [
    18,
    "Activity",
    "Run the VLAN detective activity below in pairs."
   ],
   [
    5,
    "Discuss",
    "Pose the discussion questions, linking answers to security and to VLAN 1 best practice."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on an index card."
   ]
  ],
  "warmup": "A coffee shop, a doctor's office and a school all share one building's network closet. What kinds of devices or people should never be able to see each other's traffic?",
  "activity": {
   "title": "VLAN detective",
   "materials": "Printed ticket cards each with a symptom plus matching `show vlan brief` and `show interfaces trunk` excerpts; colored markers; whiteboard.",
   "steps": [
    "Give each pair three ticket cards, such as 'printer gets a 169.254 address', 'all phones on floor 2 have no address' and 'guest sees file servers'.",
    "Pairs highlight in the output the line that reveals the problem, using one color for access port issues and another for trunk issues.",
    "Pairs write the one configuration command that would fix each case, such as switchport access vlan 30 or switchport trunk allowed vlan add 20.",
    "Two pairs combine and compare answers, resolving any disagreements.",
    "The teacher reviews each ticket on the projector and asks a pair to explain why the fix works."
   ]
  },
  "discussion": [
   "Why is leaving unused ports in VLAN 1 considered risky?",
   "What are the trade-offs of putting every device type in its own VLAN versus keeping only a few VLANs?"
  ],
  "exit": [
   [
    "What is the difference between an access port and a trunk port?",
    "An access port carries one VLAN untagged to an end device; a trunk carries many VLANs between switches using 802.1Q tags."
   ],
   [
    "A PC in the wrong VLAN gets a 169.254.x.x address. Why?",
    "No DHCP server answered in that VLAN, so the PC assigned itself an APIPA address."
   ],
   [
    "Which command shows the native and allowed VLANs on trunk ports?",
    "show interfaces trunk."
   ]
  ],
  "differentiation": [
   "Support: Provide a color-coded diagram of the two-switch topology with each VLAN's subnet labeled so students can trace frames while solving tickets.",
   "Extend: Ask fast finishers to design VLAN numbers, names and subnets for a small school with staff, students, guests, phones and cameras, and justify which pairs of VLANs should be allowed to talk through the router."
  ]
 },
 {
  "t": "Cable management and labeling in racks and patch panels",
  "objectives": [
   "Students will be able to explain the role of patch panels and patch cables in structured cabling.",
   "Students will be able to identify at least four cable management practices that protect cables and equipment.",
   "Students will be able to design a consistent labeling scheme that links wall jacks, panel ports and switch ports.",
   "Students will be able to explain why documentation must be updated whenever cabling changes."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a photo-style description or simple drawing of a messy rack and a tidy rack. Ask the warm-up question."
   ],
   [
    12,
    "Teach",
    "Sketch the path from wall jack to horizontal cable to patch panel to patch cable to switch port. Define rack units and cable managers. List good practices on the board: short cables, managers, bend radius, hook-and-loop straps, power and data separation, airflow. Show a sample labeling scheme like 2F-A-12."
   ],
   [
    18,
    "Activity",
    "Run the label-and-trace activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect labeling to outages and troubleshooting speed."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on sticky notes."
   ]
  ],
  "warmup": "You need to unplug one cable in a rack with 200 of them, and the business is open. What would you want to have in place before you touch anything?",
  "activity": {
   "title": "Label it, then trace it",
   "materials": "Printed floor plans of a small office with numbered rooms, a printed rack diagram showing two patch panels and one 24-port switch, blank label strips or sticky notes, a printed blank documentation table.",
   "steps": [
    "In groups of three, students invent a labeling scheme for wall jacks and panel ports and apply it to eight marked jacks on the floor plan.",
    "Groups fill in the documentation table, mapping each jack to a panel port and a switch port.",
    "Groups swap their completed materials with another group.",
    "The receiving group gets three mock tickets such as 'Room 106 jack 2 has no link' and must use only the other group's labels and table to name the exact switch port to check.",
    "Groups report any ambiguity in the labels they received and suggest one improvement to the scheme."
   ]
  },
  "discussion": [
   "Why might out-of-date documentation be more dangerous than having no documentation at all?",
   "How does good cable management affect cooling and the lifespan of network equipment?"
  ],
  "exit": [
   [
    "What does a patch panel do electrically?",
    "Nothing; it is passive and only provides a fixed, labeled termination point for building cables."
   ],
   [
    "Why use hook-and-loop straps instead of tight zip ties?",
    "Tight zip ties can crush cables and degrade performance; hook-and-loop straps hold cables without damage and are easy to change."
   ],
   [
    "When should cable labels and records be updated?",
    "Immediately whenever a cable is moved, added or removed."
   ]
  ],
  "differentiation": [
   "Support: Provide a partially completed labeling scheme and documentation table so struggling students only fill in the remaining rows.",
   "Extend: Ask fast finishers to add a color-coding plan for VLANs and a rule for labeling fiber uplinks, and explain how they would keep it consistent across three floors."
  ]
 },
 {
  "t": "Troubleshooting methodology: identify the problem, theory, test, plan, fix, verify, document",
  "objectives": [
   "Students will be able to list the seven troubleshooting steps in the correct order.",
   "Students will be able to compare bottom-up, top-down, divide-and-conquer and follow-the-path approaches.",
   "Students will be able to identify which step a technician skipped in a described scenario.",
   "Students will be able to apply the method to a simple network outage and write a short ticket record."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and let students share a story of a fix that went wrong. Note any skipped steps on the board."
   ],
   [
    12,
    "Teach",
    "Write the seven steps vertically on the board and explain each with a quick network example. Draw the OSI stack beside it and show where bottom-up, top-down and divide-and-conquer begin. Stress that impact is considered before implementing, and that documentation comes last."
   ],
   [
    18,
    "Activity",
    "Run the step-sort and scenario activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore escalation and documentation habits."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on paper."
   ]
  ],
  "warmup": "Think of a time someone tried to fix something (a car, a phone, a sink) and made it worse. What did they skip?",
  "activity": {
   "title": "Seven steps, one outage",
   "materials": "Printed step cards (one set of seven per group, shuffled), printed scenario cards describing technician actions, a blank ticket template.",
   "steps": [
    "Groups of three put the seven step cards in order without notes, then check against the board.",
    "Each group receives two scenario cards describing a technician's actions, for example 'rebooted the core switch at noon without telling anyone'.",
    "Groups identify which step was skipped or done out of order and write what the technician should have done instead.",
    "Each group then receives one outage scenario with clues and fills in the ticket template, writing one or two sentences for every step.",
    "Groups read their ticket's 'document' section aloud and the class judges whether a new technician could follow it."
   ]
  },
  "discussion": [
   "When is escalating the best choice, and how can you tell you have reached that point?",
   "Why do experienced technicians still document small, quick fixes?"
  ],
  "exit": [
   [
    "List the seven troubleshooting steps in order.",
    "Identify the problem, establish a theory, test the theory, establish a plan of action, implement or escalate, verify full functionality, document."
   ],
   [
    "Which approach starts at the physical layer?",
    "Bottom-up."
   ],
   [
    "A technician fixed the issue and closed the ticket without asking the user. Which step was incomplete?",
    "Verify full system functionality, which includes confirming with the user."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the mnemonic card and a version of the ticket template with sentence starters for each step.",
   "Extend: Ask fast finishers to write their own scenario where the first theory is wrong, showing how the technician forms a second theory and when they would escalate."
  ]
 },
 {
  "t": "Help desk practice: tickets, gathering information, priorities, escalation and clear documentation",
  "objectives": [
   "Students will be able to list the information a complete ticket should contain.",
   "Students will be able to use open-ended and closed questions to gather problem details from a user.",
   "Students will be able to prioritize tickets using impact and urgency.",
   "Students will be able to write an escalation note that lets another technician continue without repeating work."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt aloud and ask students to rank the three tickets silently, then compare with a neighbor."
   ],
   [
    12,
    "Teach",
    "Show a weak ticket and a strong ticket side by side on the projector and have students spot differences. Explain impact and urgency with a simple two-by-two grid on the board. Define incident, service request, SLA, functional and hierarchical escalation."
   ],
   [
    18,
    "Activity",
    "Run the caller and technician role-play described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reflect on the role-play."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on index cards."
   ]
  ],
  "warmup": "Three tickets: 'my mouse is slow', 'the whole second floor has no network' and 'please set up Wi-Fi for a guest tomorrow'. Which would you take first, and what made you decide?",
  "activity": {
   "title": "Caller and technician",
   "materials": "Printed caller cards with a hidden problem and facts to reveal only when asked, blank printed ticket forms, a timer.",
   "steps": [
    "Pair students; one is the caller with a hidden-facts card, the other is the technician with a blank ticket form.",
    "The technician has four minutes to question the caller, starting with open-ended questions and then closed ones, and fills in the ticket.",
    "The technician assigns a priority using the impact and urgency grid and writes a short escalation note.",
    "Swap roles with a new caller card and repeat.",
    "Pairs exchange tickets with another pair, who score them against a checklist: contact details, affected users, description, start time, tests and results, priority."
   ]
  },
  "discussion": [
   "Which questions in the role-play revealed the most useful facts, and were they open or closed?",
   "How can a technician stay professional with a frustrated caller without promising things they cannot deliver?"
  ],
  "exit": [
   [
    "Name four items that belong in every ticket.",
    "Any four of: reporter and contact details, affected device and location, number of users, problem description, start time, steps tried, priority, timestamped actions."
   ],
   [
    "What two factors determine priority?",
    "Impact and urgency."
   ],
   [
    "Give an example of an open-ended question and a closed question for a network complaint.",
    "Open: 'What happens when you try to connect?' Closed: 'Does it happen on both Wi-Fi and wired?'"
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a question bank card with sample open and closed questions and a ticket form with labeled boxes.",
   "Extend: Ask fast finishers to turn one resolved role-play ticket into a short knowledge base article with symptoms, cause and step-by-step fix."
  ]
 },
 {
  "t": "Wireshark: capturing on the right interface, simple display filters and saving a .pcapng file",
  "objectives": [
   "Students will be able to select the correct capture interface using the start screen and sparklines.",
   "Students will be able to write simple display filters for a host, a port and a protocol, and combine them.",
   "Students will be able to distinguish capture filters from display filters.",
   "Students will be able to save a capture as .pcapng and export only displayed packets for a ticket."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question, then explain that Wireshark lets you see exactly what a computer sends. Remind students to capture only on networks they are authorized to use."
   ],
   [
    12,
    "Teach",
    "Project Wireshark or annotated screenshots. Point out the interface list and sparklines, the three panes, the display filter bar turning green or red, and File, Save As versus Export Specified Packets. Write host, port and protocol filter examples on the board, alongside a capture filter for contrast."
   ],
   [
    18,
    "Activity",
    "Run the filter challenge described below on student laptops, using a sample capture or the classroom network with permission."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to cover privacy and the limits of what a switched port can see."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "When a web page will not load, how could you prove whether your computer even sent the request?",
  "activity": {
   "title": "Filter challenge",
   "materials": "Student laptops with Wireshark installed or a browser-based packet viewer, a small sample capture file provided by the teacher, a printed challenge sheet.",
   "steps": [
    "Students open the sample capture (or capture 60 seconds of their own traffic on the correct interface, with permission) and note the total packet count in the status bar.",
    "Using the challenge sheet, students write and apply display filters to answer questions such as 'How many DNS queries were sent?', 'Which host talked to port 443 most?' and 'Find the DHCP Offer.'",
    "Students combine two conditions with && or || for at least one answer and record the exact filter text.",
    "Each student exports only the displayed packets for one answer to a new .pcapng file with a descriptive name.",
    "Partners swap filter lists and check that each filter turns the bar green and produces the claimed result."
   ]
  },
  "discussion": [
   "Why should a technician get permission before capturing traffic, even on their own company's network?",
   "When would you choose a capture filter instead of a display filter?"
  ],
  "exit": [
   [
    "Write a display filter that shows only DNS traffic to or from 192.168.1.50.",
    "ip.addr == 192.168.1.50 && dns (udp.port == 53 instead of dns is also acceptable)."
   ],
   [
    "What is the default Wireshark save format?",
    ".pcapng (PCAP Next Generation)."
   ],
   [
    "How do you choose the right interface on the start screen?",
    "Pick the interface that carries the traffic you need, usually the one whose sparkline shows activity, such as Ethernet, Wi-Fi or the VPN adapter."
   ]
  ],
  "differentiation": [
   "Support: Provide a laminated filter cheat card with five ready-made filters and their meanings so struggling students can modify rather than write from scratch.",
   "Extend: Ask fast finishers to find a complete TCP three-way handshake in the capture, use Follow TCP Stream, and explain in two sentences what the conversation shows."
  ]
 },
 {
  "t": "Ping, tracert/traceroute, ipconfig/ifconfig/ip and nslookup: running them and reading the results",
  "objectives": [
   "Students will be able to run ipconfig, ping, tracert and nslookup and identify the key fields in each output.",
   "Students will be able to interpret ping messages such as Request timed out and Destination host unreachable.",
   "Students will be able to explain how traceroute uses TTL and why asterisks may appear.",
   "Students will be able to choose the right tool to isolate a local, path or DNS problem."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student guesses about what could be broken on the board: my PC, the local network, the path, the name."
   ],
   [
    12,
    "Teach",
    "Run each command live on the projector (or show captured output). Highlight the IPv4 address, gateway and DNS fields in ipconfig /all, the time and loss in ping, the hop lines and asterisks in tracert and the Non-authoritative answer in nslookup. Draw TTL decreasing hop by hop."
   ],
   [
    18,
    "Activity",
    "Run the output detective activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to reinforce the decision path."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A web page will not load. List four different places the problem could be, from your own computer to the website itself.",
  "activity": {
   "title": "Output detective",
   "materials": "Printed output cards (ipconfig, ping, tracert and nslookup results from fictional tickets), student laptops with a command prompt for practice, highlighters.",
   "steps": [
    "Students first run ipconfig /all, ping to the gateway and nslookup for a well-known name on their own laptops and highlight the gateway, DNS server and reply times.",
    "In pairs, students receive five ticket cards, each with one or two outputs, such as a 169.254 address, a trace ending in asterisks after hop 3, or nslookup timing out while ping to an IP works.",
    "For each card, pairs highlight the line that reveals the problem and write the likely cause and the next tool or step.",
    "Pairs rank the cards from 'problem on the PC' to 'problem far away' on a line drawn on their desk.",
    "The class reviews answers; the teacher asks pairs to defend one ranking."
   ]
  },
  "discussion": [
   "Why is pinging outward in steps (loopback, own IP, gateway, remote IP, remote name) more useful than pinging a website first?",
   "If a traceroute shows asterisks for hop 4 but replies from hops 5 to 9, what does that tell you about hop 4?"
  ],
  "exit": [
   [
    "Ping to 8.8.8.8 works but ping to a website name fails. Which tool do you use next and why?",
    "nslookup, because IP connectivity works and the failure is in name resolution (DNS)."
   ],
   [
    "What message does a router send that lets traceroute discover it?",
    "ICMP Time Exceeded, sent when the packet's TTL reaches zero."
   ],
   [
    "What does an ipconfig result of 169.254.10.5 indicate?",
    "DHCP failed and the PC assigned itself an APIPA address."
   ]
  ],
  "differentiation": [
   "Support: Provide an annotated sample output for each tool, with arrows labeling the important fields, that students can compare against the ticket cards.",
   "Extend: Ask fast finishers to compare Windows tracert and Linux traceroute probe types and explain why a firewall might let one through but not the other."
  ]
 },
 {
  "t": "How firewalls can make ping or traceroute fail even when the service works",
  "objectives": [
   "Students will be able to explain why firewalls and routers can cause ping and traceroute to fail while services work.",
   "Students will be able to test a specific TCP service port using Test-NetConnection, nc, curl or a browser.",
   "Students will be able to interpret combinations of ping and port test results.",
   "Students will be able to write a precise ticket note stating what was tested and what it proves."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Present the warm-up scenario and take a quick show of hands: is the site down?"
   ],
   [
    12,
    "Teach",
    "Explain ICMP filtering, host firewalls and router rate limiting. Compare Windows tracert (ICMP) and Linux traceroute (UDP). Demonstrate Test-NetConnection with -Port 443 on the projector and show the TcpTestSucceeded line. Draw a two-by-two grid of ping result versus port test result."
   ],
   [
    18,
    "Activity",
    "Run the result-grid sorting activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore why administrators block ICMP and the costs of doing so."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A coworker says a website is down because ping timed out, but you just used that website five minutes ago. Who is right, and how would you find out?",
  "activity": {
   "title": "Ping versus port",
   "materials": "Printed scenario cards with ping and port test outputs, a large two-by-two grid drawn on the whiteboard (ping works or fails, port works or fails), sticky notes, student laptops with a browser.",
   "steps": [
    "Students pair up and receive six scenario cards, each with a ping result and a port test result such as TcpTestSucceeded True or nc reporting connection refused.",
    "Pairs place each card in the correct quadrant of the grid on a sticky note and write the conclusion, such as 'service up, ICMP filtered' or 'host up, service down'.",
    "For each card, pairs write a one-sentence ticket note stating what was tested and what it proves.",
    "Optional, with permission: students run Test-NetConnection or open a known website and compare to a ping of the same host.",
    "The class reviews the grid, and the teacher highlights the quadrant where ping fails but the port works."
   ]
  },
  "discussion": [
   "What are the security benefits and the operational costs of blocking ICMP on a server?",
   "Why does testing 'what the user actually needs' produce better tickets than generic tests?"
  ],
  "exit": [
   [
    "Ping to a web server times out, but Test-NetConnection on port 443 succeeds. What is the most likely explanation?",
    "The web service is working and a firewall is filtering ICMP."
   ],
   [
    "Ping succeeds but a TCP 443 test fails. What does that mean?",
    "The host is reachable, but the web service is stopped or its port is blocked."
   ],
   [
    "Which probe type does Windows tracert use by default, and which does traditional Linux traceroute use?",
    "Windows tracert uses ICMP Echo; traditional Linux traceroute uses UDP."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the two-by-two grid pre-labeled with conclusions so they only match cards to quadrants.",
   "Extend: Ask fast finishers to research why IPv6 depends on ICMPv6 and write a short recommendation for which ICMP types a firewall should still allow."
  ]
 },
 {
  "t": "Remote access and data collection: console cable and terminal emulator, SSH vs Telnet, RDP, VPN",
  "objectives": [
   "Students will be able to describe how to connect to a device console, including cable type and terminal settings.",
   "Students will be able to compare SSH and Telnet, including ports and security.",
   "Students will be able to explain the roles of RDP and a VPN in remote support.",
   "Students will be able to choose an appropriate access method for a described situation and collect data safely for escalation."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and list student ideas for reaching a broken device on the board."
   ],
   [
    12,
    "Teach",
    "Show a console cable (or a picture) and a PuTTY serial configuration screen on the projector, highlighting 9600 8N1. Contrast SSH and Telnet with a quick explanation of clear text versus encryption. Explain RDP and VPN roles, the jump host idea, and removing secrets from collected output."
   ],
   [
    18,
    "Activity",
    "Run the access-method matching activity described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore security trade-offs."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A switch in a closet across town has the wrong IP address and nobody can reach it over the network. What options do you have to fix it?",
  "activity": {
   "title": "Which way in?",
   "materials": "Printed situation cards, method cards (Console, SSH, Telnet, RDP, VPN, Jump host), a printed PuTTY settings worksheet, student laptops with a browser for optional reference.",
   "steps": [
    "In groups of three, students receive eight situation cards, such as 'brand-new router out of the box', 'admin working from home needs to change a VLAN', 'Windows server needs a GUI tool' and 'old lab device supports only Telnet'.",
    "Groups match each situation to one or more method cards in order of use, for example VPN then SSH.",
    "For each match, groups note one security consideration, such as 'use MFA' or 'Telnet only on an isolated lab network'.",
    "Groups complete the PuTTY worksheet by filling in connection type, port, speed, data bits, parity, stop bits and flow control for a console session.",
    "Groups share one tricky situation with the class and explain their choice."
   ]
  },
  "discussion": [
   "Why might an organization require a jump host instead of letting administrators connect directly to each device?",
   "Before attaching a running configuration to a ticket, what information should you remove, and why?"
  ],
  "exit": [
   [
    "Which management method is out-of-band and needs no IP address?",
    "A console connection through the console port."
   ],
   [
    "What ports do SSH, Telnet and RDP use by default?",
    "SSH TCP 22, Telnet TCP 23, RDP TCP 3389."
   ],
   [
    "Why should RDP not be exposed directly to the internet?",
    "It is a frequent target of password guessing and exploitation; it should be reached through a VPN or secure gateway with MFA."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference card listing each method with its port, whether it needs the network and whether it is encrypted.",
   "Extend: Ask fast finishers to list the configuration steps a Cisco device needs before it accepts SSH (hostname, domain name, RSA keys, local user, VTY transport input ssh) and explain the purpose of each."
  ]
 },
 {
  "t": "Cloud-managed devices (for example Cisco Meraki dashboard)",
  "objectives": [
   "Students will be able to explain how a cloud-managed device obtains its configuration through zero-touch provisioning.",
   "Students will be able to compare cloud-managed and traditionally managed networks, including benefits and trade-offs.",
   "Students will be able to describe what happens to user traffic when a device loses its cloud connection.",
   "Students will be able to apply a basic checklist to troubleshoot a device that shows as offline in the dashboard."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and connect answers to managing devices from an app."
   ],
   [
    12,
    "Teach",
    "Draw a branch with three devices, an internet link and a cloud labeled 'dashboard'. Show management traffic going to the cloud and user traffic going elsewhere. Explain zero-touch provisioning, templates, remote tools, licensing and the need for MFA and role-based access."
   ],
   [
    18,
    "Activity",
    "Run the 'device offline' troubleshooting relay described below."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to weigh cloud management against command-line management."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Do you control anything at home from an app, such as a thermostat, doorbell or speaker? What happens to it when your home internet goes down?",
  "activity": {
   "title": "Device offline relay",
   "materials": "Printed scenario cards describing an offline cloud-managed device, printed clue cards (LED state, DHCP result, firewall rule, cable test), whiteboard.",
   "steps": [
    "Split the class into teams of four and give each team a scenario card, such as 'new access point offline at a branch'.",
    "The first student asks the teacher for one clue card by naming a check, such as 'Is it powered?', and writes the result on the team's sheet.",
    "Each student in turn chooses the next logical check (power, uplink cable, IP address, internet and DNS reachability, firewall allowing outbound cloud access) and requests that clue.",
    "When the team believes it has found the cause, it writes the cause and the fix and states whether users at the site were affected while the device was offline from the cloud.",
    "Teams compare the number of checks they needed and discuss which order was most efficient."
   ]
  },
  "discussion": [
   "For a company with one office versus one with fifty, how do the benefits of cloud management change?",
   "What could an attacker do with a stolen dashboard administrator login, and how would you reduce that risk?"
  ],
  "exit": [
   [
    "What two things does a cloud-managed device need to download its configuration?",
    "Power and internet connectivity, usually via DHCP."
   ],
   [
    "If a Meraki switch loses its connection to the cloud, what happens to user traffic?",
    "It normally keeps forwarding with the last configuration; only management and monitoring are lost."
   ],
   [
    "What is zero-touch provisioning?",
    "Deploying a device that is preconfigured in the dashboard and automatically fetches its settings when plugged in, without local setup."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students the troubleshooting checklist in order on a card so they focus on interpreting each clue rather than choosing the order.",
   "Extend: Ask fast finishers to design a dashboard access plan for a 20-store chain, listing roles, what each can change and how MFA and account reviews will be enforced."
  ]
 },
 {
  "t": "Cisco IOS basics: user vs privileged EXEC, `?` help and tab completion",
  "objectives": [
   "Students will be able to identify user EXEC, privileged EXEC, global configuration and interface configuration modes from the prompt.",
   "Students will be able to state the commands that move between modes (enable, disable, configure terminal, exit, end).",
   "Students will be able to distinguish `sh?` from `show ?` and interpret `<cr>` in help output.",
   "Students will be able to interpret IOS error messages such as Invalid input, Incomplete command and Ambiguous command."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Project a screenshot of a terminal showing `SW1>` and ask the warm-up question. Collect a few guesses about what the > means and what it might take to 'get more power.'"
   ],
   [
    15,
    "Teach",
    "Draw the mode ladder on the whiteboard: `>` then `#` then `(config)#` then `(config-if)#`. Label each arrow with its command (enable, configure terminal, interface ...) and the return paths (disable, exit, end or Ctrl+Z). Then demonstrate help on the projector using a typed transcript: `?`, `sh?`, `show ?`, `show ip ?`, and point out `<cr>`. Finish with the three error messages and what each means."
   ],
   [
    15,
    "Activity",
    "Run the 'Prompt Ladder' card activity in pairs (see activity). Circulate and ask pairs to explain why each step is valid or invalid."
   ],
   [
    5,
    "Discuss",
    "Bring the class together for the discussion questions, focusing on why IOS separates modes and why a technician usually stays in EXEC modes."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions on a sticky note and post them by the door."
   ]
  ],
  "warmup": "A switch shows the prompt `SW1>`. You need to see its full configuration but the command fails. What do you think the `>` is telling you, and what might you need to do first?",
  "activity": {
   "title": "Prompt Ladder",
   "materials": "Printed cards (one set per pair) showing prompts such as SW1>, SW1#, SW1(config)#, SW1(config-if)#, and command cards such as enable, disable, configure terminal, interface gigabitethernet1/0/1, exit, end, show ?, sh?, copy running-config startup-config; whiteboard for recording answers.",
   "steps": [
    "Give each pair the prompt cards and command cards face down.",
    "Pairs draw a starting prompt and a target prompt, then lay out the command cards in the order needed to get from start to target, writing the prompt after each step.",
    "Read out three short 'transcripts' containing an IOS error (for example `show running-config` typed at SW1>, `sh` alone followed by Enter, `interface` with nothing after it). Pairs decide which error IOS would print and why.",
    "Each pair explains one ladder and one error to a neighboring pair, who checks it against the whiteboard diagram."
   ]
  },
  "discussion": [
   "Why might Cisco limit what you can do at the > prompt instead of giving everyone full access?",
   "When an engineer on the phone says 'do not change anything,' which prompts should you avoid seeing on your screen, and why?"
  ],
  "exit": [
   [
    "What command takes you from `Switch>` to `Switch#`?",
    "`enable`."
   ],
   [
    "What does `show ?` display that `sh?` does not?",
    "`show ?` lists the keywords that can follow show; `sh?` lists commands beginning with 'sh'."
   ],
   [
    "You are at `Switch(config-if)#` and want to return directly to `Switch#`. What do you type?",
    "`end` (or press Ctrl+Z)."
   ]
  ],
  "differentiation": [
   "Support: Give struggling students a one-page reference card with each prompt, its mode name and the command to enter and leave it, and let them use it during the card activity.",
   "Extend: Ask fast finishers to write a short transcript that includes an Ambiguous command error and an Incomplete command error, then explain how Tab completion and ? would have prevented each."
  ]
 },
 {
  "t": "Show commands: show running-config, show version, show ip interface brief, show interfaces, show interfaces status, show ip route, show mac address-table, show cdp neighbors, show inventory",
  "objectives": [
   "Students will be able to select the correct show command for a given troubleshooting question.",
   "Students will be able to interpret Status and Protocol combinations in show ip interface brief output.",
   "Students will be able to identify error counters such as CRC errors and late collisions in show interfaces output and explain their likely causes.",
   "Students will be able to use show cdp neighbors and show mac address-table to locate connected devices."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and list student ideas on the whiteboard as 'questions we might ask a switch.' Leave the list visible for later."
   ],
   [
    15,
    "Teach",
    "Project short sample outputs, one command at a time: show version (uptime, reload reason), show ip interface brief (up/up, administratively down, down/down, up/down), show interfaces (CRC errors, late collisions), show interfaces status, show ip route codes, show mac address-table, show cdp neighbors and show inventory. For each, say aloud the single question it best answers and add it next to the matching item on the warm-up list."
   ],
   [
    15,
    "Activity",
    "Run 'Ticket to Command' in small groups (see activity)."
   ],
   [
    5,
    "Discuss",
    "Groups share the ticket they found hardest and why. Use the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students complete the three exit questions on paper."
   ]
  ],
  "warmup": "Imagine you can ask a network switch any question you like. What three questions would help you most if users said 'the network was down for ten minutes this morning'?",
  "activity": {
   "title": "Ticket to Command",
   "materials": "Printed help-desk ticket cards (8 to 10 short scenarios), printed sample output excerpts for each show command that the teacher writes in advance, whiteboard.",
   "steps": [
    "Groups of three receive a stack of ticket cards, such as 'Did the switch reboot overnight?' or 'Which port is the printer with this MAC address on?'",
    "For each ticket, the group writes the show command they would run and the specific line or column they would look at.",
    "The teacher then hands out the matching sample output excerpt. Groups read it and write the answer to the ticket, such as the uptime, port number or interface status.",
    "Groups swap two tickets with another group and check each other's command choices and interpretations."
   ]
  },
  "discussion": [
   "Why is show running-config output treated as sensitive, and how should a technician handle it?",
   "When might show cdp neighbors give an incomplete picture of what is connected to a switch?"
  ],
  "exit": [
   [
    "Which command shows a switch's uptime and last reload reason?",
    "show version."
   ],
   [
    "An interface shows up/down in show ip interface brief. Which layer is the problem most likely at?",
    "Layer 2, the data link layer, such as a keepalive or encapsulation mismatch."
   ],
   [
    "Which command lists hardware modules and SFP serial numbers?",
    "show inventory."
   ]
  ],
  "differentiation": [
   "Support: Provide a two-column matching sheet with the nine commands on one side and plain-language questions on the other, completed before the ticket activity.",
   "Extend: Give fast finishers a sample show interfaces output with rising CRC errors and late collisions and ask them to write a short note to an engineer explaining the two most likely causes and what to check next."
  ]
 },
 {
  "t": "How firewalls filter traffic: permit and deny rules, ports and protocols, implicit deny",
  "objectives": [
   "Students will be able to explain how firewall rules match traffic by source, destination, protocol and port.",
   "Students will be able to apply first-match processing to predict whether a given packet is permitted or denied.",
   "Students will be able to explain the implicit deny and its effect on deny-only access lists.",
   "Students will be able to identify common service ports used in firewall rules, such as 22, 53, 80, 443 and 3389."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and have students vote with a show of hands. Do not reveal the answer yet."
   ],
   [
    15,
    "Teach",
    "On the whiteboard, write a five-rule policy. Explain each match field and the permit/deny action. Walk a sample packet down the list, stopping at the first match. Then walk a packet that matches nothing and introduce the implicit deny. Cover drop versus reject and how hit counters and logs reveal which rule matched. Return to the warm-up and reveal the answer."
   ],
   [
    15,
    "Activity",
    "Run 'Be the Firewall' (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to connect rule order to least privilege."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "A firewall has two rules: 1) deny all traffic to the server network, 2) permit HTTPS to the web server, which is on the server network. Will a user's HTTPS request reach the web server? Why or why not?",
  "activity": {
   "title": "Be the Firewall",
   "materials": "Printed rule lists (one per group, about six rules each, written by the teacher), a stack of 'packet' cards listing source, destination, protocol and port, sticky notes, whiteboard.",
   "steps": [
    "One student in each group acts as the firewall and holds the rule list; the others take turns presenting packet cards.",
    "The firewall reads the rules aloud from the top, stops at the first match and announces permit or deny, or 'implicit deny' if nothing matches. The group records each result on a sticky note.",
    "After ten packets, the group finds one packet that was handled wrongly according to the business goal printed on the rule sheet and reorders or adds a rule to fix it.",
    "Each group presents its fix and explains why the new order works using first-match logic."
   ]
  },
  "discussion": [
   "Why is it safer for a firewall to deny anything not explicitly permitted rather than permit anything not explicitly denied?",
   "How would you prove to a skeptical colleague that their new rule is never being matched?"
  ],
  "exit": [
   [
    "What happens to traffic that matches no rule?",
    "It is blocked by the implicit deny."
   ],
   [
    "An ACL has a broad permit above a specific deny for the same traffic. What happens to the deny?",
    "It never takes effect, because the first match (the permit) decides."
   ],
   [
    "Which TCP port does an HTTPS rule usually reference?",
    "443."
   ]
  ],
  "differentiation": [
   "Support: Give students a flowchart card showing 'check rule 1, match? act and stop; no? next rule; end of list? deny' to use while acting as the firewall.",
   "Extend: Ask fast finishers to rewrite a deny-only ACL so it blocks two hosts from Telnet while allowing all other traffic, and explain where the final permit must go."
  ]
 },
 {
  "t": "Stateful firewalls vs simple packet filters; host-based vs network firewalls",
  "objectives": [
   "Students will be able to compare stateless packet filters and stateful firewalls, including how each handles return traffic.",
   "Students will be able to explain the role of a state table and ephemeral ports.",
   "Students will be able to compare host-based and network-based firewalls by placement, scope and limitations.",
   "Students will be able to apply both distinctions to troubleshoot a blocked connection."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and take answers from three or four students."
   ],
   [
    15,
    "Teach",
    "Draw a client, a firewall and a web server. Show the request leaving from an ephemeral port to port 443 and the reply returning. Explain what a stateless filter needs (an inbound rule for replies) and what a stateful firewall does (a state table entry). Then redraw the picture with a LAN of several PCs to contrast a network firewall at the edge with host firewalls on each PC. Mention next-generation firewall features briefly."
   ],
   [
    15,
    "Activity",
    "Run the 'State Table Role-Play' (see activity)."
   ],
   [
    5,
    "Discuss",
    "Discuss defense in depth using the discussion questions."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the exit questions on sticky notes."
   ]
  ],
  "warmup": "When you browse a website at home, your router does not have a rule allowing websites to send traffic into your network. So how do the web pages get back to you?",
  "activity": {
   "title": "State Table Role-Play",
   "materials": "Sticky notes, a whiteboard section labeled 'State table,' printed role cards (client, stateless firewall, stateful firewall, web server, unsolicited sender).",
   "steps": [
    "Assign roles. The client writes an outbound request on a sticky note (source IP and ephemeral port, destination IP and port 443) and passes it to the stateful firewall.",
    "The stateful firewall copies the details into the 'State table' on the board and forwards the note. The server writes a reply with source and destination reversed and sends it back; the firewall checks the table and allows it.",
    "The unsolicited sender hands the firewall a note that matches no entry; the firewall drops it. Repeat the round with the stateless firewall, which has no table and only a printed rule list, and let the class see the reply blocked.",
    "In pairs, students then read three short troubleshooting cases and decide whether to check the host firewall, the network firewall or both, writing a one-sentence reason."
   ]
  },
  "discussion": [
   "If a company has a strong network firewall at the internet edge, why would it still turn on host firewalls on every laptop?",
   "What are the management challenges of host-based firewalls across hundreds of devices, and how might an organization handle them?"
  ],
  "exit": [
   [
    "Why does a stateful firewall not need an inbound rule for replies to permitted outbound traffic?",
    "It records the connection in its state table and automatically allows matching return traffic."
   ],
   [
    "Which type of firewall protects a laptop on a hotel network?",
    "A host-based firewall on the laptop."
   ],
   [
    "A service works locally on a server but not from other PCs, and the network firewall permits it. What do you check?",
    "The host-based firewall on the server."
   ]
  ],
  "differentiation": [
   "Support: Provide a comparison table template with rows for 'remembers connections,' 'return traffic,' 'protects,' and 'example' for students to fill in during the teach segment.",
   "Extend: Ask fast finishers to explain why an attacker's crafted packet claiming to be part of an existing conversation might pass a stateless filter but not a stateful firewall."
  ]
 },
 {
  "t": "CIA triad: confidentiality, integrity, availability",
  "objectives": [
   "Students will be able to define confidentiality, integrity and availability.",
   "Students will be able to classify a security scenario by the CIA property it primarily affects.",
   "Students will be able to match common controls such as encryption, hashing, redundancy and backups to the property they protect.",
   "Students will be able to explain how the three properties can conflict."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Display the warm-up prompt and have students jot a one-word answer before sharing."
   ],
   [
    15,
    "Teach",
    "Write C, I and A as three columns on the whiteboard. For each, give the definition, two threats and two controls, using network examples such as SSH versus Telnet, hash verification of a software image and redundant power supplies. Close with two scenarios that hit more than one property, such as ransomware with data theft, and a short note on trade-offs."
   ],
   [
    15,
    "Activity",
    "Run the 'Triad Sort' card activity (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to explore trade-offs between the properties."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "Think of your phone. What would be worse: a stranger reading your messages, someone secretly changing them, or not being able to open your phone for a week? Why?",
  "activity": {
   "title": "Triad Sort",
   "materials": "Printed cards with 15 short scenarios and controls (for example 'DDoS attack,' 'verify a file hash,' 'lost unencrypted laptop,' 'dual power supplies,' 'unauthorized VLAN change'), three large sticky-note headers labeled C, I and A on the whiteboard.",
   "steps": [
    "Give each group of three a shuffled set of scenario and control cards.",
    "Groups sort each card under C, I or A, placing any card they believe fits more than one property on the line between columns.",
    "Each group places two of its cards on the class whiteboard columns and explains the choice in one sentence.",
    "The teacher picks the two most debated cards and the class votes, then the teacher explains the primary property for each."
   ]
  },
  "discussion": [
   "Give an example where improving confidentiality could reduce availability. How would you decide which matters more?",
   "Not every CIA problem involves an attacker. Which accidental events have you seen or heard of that affected availability or integrity?"
  ],
  "exit": [
   [
    "Which CIA property does a DDoS attack mainly target?",
    "Availability."
   ],
   [
    "Which property is protected by verifying a software image's hash?",
    "Integrity."
   ],
   [
    "Name one control that protects confidentiality.",
    "Encryption, such as SSH, HTTPS, WPA3 or full-disk encryption (or access controls)."
   ]
  ],
  "differentiation": [
   "Support: Give students a cue card: 'seen by the wrong person = C; changed = I; cannot reach = A,' to use during the sort.",
   "Extend: Ask fast finishers to analyze a ransomware incident with data theft and write which properties were affected at each stage and which control would have reduced each impact."
  ]
 },
 {
  "t": "Vulnerability, threat, exploit and risk",
  "objectives": [
   "Students will be able to define vulnerability, threat, threat actor, exploit and risk.",
   "Students will be able to classify items in a scenario as a vulnerability, threat or exploit.",
   "Students will be able to explain risk as likelihood combined with impact and compare risks in context.",
   "Students will be able to identify the four risk responses: mitigate, transfer, accept and avoid."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and collect answers. Write the four key words on the board without definitions."
   ],
   [
    15,
    "Teach",
    "Use the house analogy: broken lock, burglar, pushing the door, likelihood and impact. Then translate to networking: default password, botnet, login with the default password, risk to an internet-facing device. Explain CVE identifiers, zero-days and the four risk responses, giving one example of each. Stress that scans and penetration tests require written authorization."
   ],
   [
    15,
    "Activity",
    "Run 'Risk Register' (see activity)."
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
  "warmup": "A bike is left unlocked outside a library. Which part of that situation is the weakness, who or what is the danger, and how would you judge how worried to be?",
  "activity": {
   "title": "Risk Register",
   "materials": "Printed scenario sheets describing a fictional small office's network (an internet-facing router with old software, a printer with a default password, untrained staff, a lab PC with no network connection), a simple printed risk register table with columns for vulnerability, threat, likelihood (low/medium/high), impact (low/medium/high) and response, whiteboard.",
   "steps": [
    "Groups read the scenario and list at least four vulnerabilities in the register.",
    "For each, they write a likely threat, rate likelihood and impact, and choose a response: mitigate, transfer, accept or avoid, with a one-line justification.",
    "Groups rank their items from highest to lowest risk and post their top item on the whiteboard.",
    "The class compares rankings, and the teacher highlights cases where a 'severe' issue ranked lower because of low exposure."
   ]
  },
  "discussion": [
   "Why can't patching eliminate threats, and what does that mean for how organizations plan security?",
   "When might accepting a risk be the right business decision, and who should be allowed to make that call?"
  ],
  "exit": [
   [
    "A switch still has its factory password. Is that a vulnerability, threat or exploit?",
    "A vulnerability."
   ],
   [
    "Buying cyber insurance is an example of which risk response?",
    "Transfer."
   ],
   [
    "What is a zero-day?",
    "A vulnerability that is exploited before the vendor has released a fix."
   ]
  ],
  "differentiation": [
   "Support: Provide a word bank with each term and a picture cue (broken lock, burglar, crowbar, scale) and pre-fill the first row of the risk register as a model.",
   "Extend: Ask fast finishers to explain how restricting management access to a router changes likelihood and impact even before a patch is applied, and what residual risk remains."
  ]
 },
 {
  "t": "Malware types, phishing and other social engineering, DoS and DDoS",
  "objectives": [
   "Students will be able to distinguish viruses, worms, Trojans, ransomware, spyware, rootkits and bots by how they spread and what they do.",
   "Students will be able to recognize phishing, spear phishing, whaling, vishing, smishing, tailgating and shoulder surfing from short scenarios.",
   "Students will be able to compare DoS and DDoS attacks and explain why DDoS is harder to stop.",
   "Students will be able to describe a support technician's first response to suspected malware and phishing."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up scenario aloud and have students write whether it is legitimate or suspicious, and why."
   ],
   [
    15,
    "Teach",
    "Present a malware table on the whiteboard with columns for 'how it spreads' and 'what it does.' Then cover social engineering channels (email, voice, SMS, in person) and the warning signs. Finish with DoS versus DDoS, botnets and why availability is the target. Close with the technician's first steps: isolate, report, preserve."
   ],
   [
    15,
    "Activity",
    "Run 'Spot the Attack' (see activity)."
   ],
   [
    5,
    "Discuss",
    "Use the discussion questions to focus on human factors."
   ],
   [
    5,
    "Exit ticket",
    "Students answer the three exit questions."
   ]
  ],
  "warmup": "You get a text that says: 'Your package could not be delivered. Confirm your address within 2 hours or it will be returned,' followed by a link. Would you click it? What makes it suspicious or believable?",
  "activity": {
   "title": "Spot the Attack",
   "materials": "Printed scenario cards (12 short descriptions, such as a self-spreading infection, a fake help-desk call, a gift-card request from 'the CEO,' a sudden traffic flood from thousands of addresses, a free utility with a hidden backdoor, someone following staff through a badge door), answer sheets, whiteboard.",
   "steps": [
    "Pairs receive the scenario cards and label each with the attack type and one warning sign that gave it away.",
    "For each card, pairs write the first action a support technician should take, such as isolate the PC, report the message, or escalate to the ISP or security team.",
    "Pairs join another pair and compare labels, resolving disagreements using the whiteboard table.",
    "The teacher reviews the three most commonly confused cards, such as virus versus worm, and the correct first actions."
   ]
  },
  "discussion": [
   "Why do social engineering attacks so often rely on urgency or authority, and how can an organization make it easier for staff to say no?",
   "Why might wiping an infected computer right away be the wrong first step?"
  ],
  "exit": [
   [
    "What is the key difference between a virus and a worm?",
    "A virus needs a host file and user action to spread; a worm spreads across the network by itself."
   ],
   [
    "A caller claiming to be from IT asks for your MFA code. What attack is this?",
    "Vishing (voice phishing), a form of social engineering."
   ],
   [
    "Why can't you stop a DDoS attack by blocking one IP address?",
    "The traffic comes from many distributed sources, usually a botnet."
   ]
  ],
  "differentiation": [
   "Support: Provide a reference sheet listing each attack type with a one-line definition and a key clue word (for example 'spreads by itself' for worm, 'voice' for vishing) for use during the activity.",
   "Extend: Ask fast finishers to write a short, realistic phishing awareness tip sheet for staff of a fictional company that covers email, voice and text, without including any real links or company names."
  ]
 },
 {
  "t": "Authentication basics: strong passwords, MFA, changing default credentials",
  "objectives": [
   "Students will be able to identify authentication factor categories and determine whether a login method is true MFA.",
   "Students will be able to compare MFA methods by strength, including phishing-resistant keys, authenticator apps and SMS codes.",
   "Students will be able to explain the characteristics of strong passwords and why unique passwords defeat credential stuffing.",
   "Students will be able to describe why default credentials must be changed and name Cisco practices such as enable secret and SSH."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Pose the warm-up question and tally answers on the board."
   ],
   [
    15,
    "Teach",
    "Draw three boxes labeled know, have and are. Place examples into each and test several login methods against the 'two different boxes' rule. Rank MFA methods from strongest to weakest. Discuss length over complexity, password managers and credential stuffing. Finish with default credentials on network and IoT devices and the Cisco practices: enable secret over enable password, individual accounts, SSH, and the limits of service password-encryption."
   ],
   [
    15,
    "Activity",
    "Run 'MFA or Not?' and the default-credentials checklist (see activity)."
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
  "warmup": "Your bank asks for your password and then your mother's maiden name. Is that two-factor authentication? Vote yes or no and explain.",
  "activity": {
   "title": "MFA or Not? plus Device Setup Checklist",
   "materials": "Printed cards describing login methods (password plus PIN, password plus authenticator code, fingerprint plus PIN, smart card plus PIN, password plus security question, hardware key alone), whiteboard divided into 'MFA' and 'Not MFA,' blank paper for checklists.",
   "steps": [
    "Groups sort each login method card into MFA or Not MFA and label the factor category of each element.",
    "Groups rank the MFA cards from strongest to weakest and justify the top choice in one sentence.",
    "Each group writes a five-step setup checklist for installing a new router or IP camera, including changing default credentials and updating firmware.",
    "Groups swap checklists and add one missing item to another group's list, then the teacher compiles a class checklist on the board."
   ]
  },
  "discussion": [
   "Why has guidance shifted away from forcing frequent password changes, and what does it favor instead?",
   "What problems arise when several administrators share one login on a network device?"
  ],
  "exit": [
   [
    "Is a password plus a PIN multifactor authentication?",
    "No. Both are something you know."
   ],
   [
    "Why is a unique password for each account important?",
    "It stops credential stuffing, where a password leaked from one site is tried on others."
   ],
   [
    "On a Cisco switch, which should you configure: enable password or enable secret?",
    "Enable secret, which is stored as a hash and takes precedence."
   ]
  ],
  "differentiation": [
   "Support: Provide a factor-category key with pictures (a brain for know, a phone or key for have, a fingerprint for are) for students to use when sorting.",
   "Extend: Ask fast finishers to explain why hardware security keys resist phishing while authenticator codes can sometimes be phished, and how push-approval fatigue attacks work at a conceptual level."
  ]
 },
 {
  "t": "Home router wireless security: WPA2 vs WPA3, Personal (pre-shared key) vs Enterprise (802.1X)",
  "objectives": [
   "Students will be able to compare WPA2 and WPA3, including AES-CCMP, SAE, forward secrecy and Protected Management Frames.",
   "Students will be able to explain why WPA2-Personal is vulnerable to offline dictionary attacks and how WPA3-Personal prevents them.",
   "Students will be able to compare Personal (PSK) and Enterprise (802.1X) modes and identify the roles of supplicant, authenticator and RADIUS server.",
   "Students will be able to recommend appropriate wireless security settings for a home, small office or campus scenario."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Ask the warm-up question and gather answers about shared Wi-Fi passwords students have encountered."
   ],
   [
    15,
    "Teach",
    "Draw a two-by-two grid on the whiteboard: WPA2 and WPA3 as columns, Personal and Enterprise as rows. Fill in encryption, handshake, offline attack risk and management. Then draw the 802.1X flow: laptop (supplicant), access point (authenticator), RADIUS server, with EAP arrows. Cover transition mode, avoiding TKIP and home router best practices, including why hiding the SSID is not real security."
   ],
   [
    15,
    "Activity",
    "Run 'Pick the Wi-Fi Setup' (see activity)."
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
  "warmup": "Think of a place where many people share one Wi-Fi password, like a café or an office. What happens when someone who knows it should no longer have access?",
  "activity": {
   "title": "Pick the Wi-Fi Setup",
   "materials": "Printed customer scenario cards (a family with one old smart TV, a 15-person office with staff turnover, a school campus, a café offering guest Wi-Fi, a home office handling client tax records), a printed mock router security drop-down list (WPA2-Personal TKIP, WPA2-Personal AES, WPA2/WPA3 transition, WPA3-Personal, WPA2-Enterprise, WPA3-Enterprise), whiteboard.",
   "steps": [
    "Groups receive two scenario cards each and the mock drop-down list.",
    "For each scenario, groups choose a security mode, explain why, and list any extra components needed, such as a RADIUS server or a separate guest network.",
    "Groups identify one option on the drop-down list they would never choose and explain why.",
    "Each group presents one scenario, and the class challenges or supports the choice using the whiteboard grid."
   ]
  },
  "discussion": [
   "Why might a small business stay with Personal mode even though Enterprise mode is more secure, and what can it do to reduce the risk?",
   "What are the risks of leaving a network in WPA2/WPA3 transition mode indefinitely?"
  ],
  "exit": [
   [
    "What does WPA3-Personal use to resist offline dictionary attacks?",
    "SAE (Simultaneous Authentication of Equals)."
   ],
   [
    "In Enterprise mode, which server usually checks user credentials?",
    "A RADIUS server."
   ],
   [
    "If WPA2 must be used, which encryption option should be selected?",
    "AES (CCMP), not TKIP."
   ]
  ],
  "differentiation": [
   "Support: Give students a partially completed two-by-two grid with key words to place (SAE, shared passphrase, RADIUS, AES, individual credentials) before the scenario activity.",
   "Extend: Ask fast finishers to explain forward secrecy in their own words and describe why it matters if a Wi-Fi passphrase is leaked months after traffic was captured."
  ]
 },
 {
  "t": "Why WEP and open networks should not be used, and why WPS should be turned off",
  "objectives": [
   "Students will be able to explain why WEP is insecure regardless of key length.",
   "Students will be able to explain the risks of open networks, including eavesdropping and evil twin access points, and identify safer guest options such as Enhanced Open (OWE).",
   "Students will be able to explain the WPS PIN design flaw and why it exposes the passphrase.",
   "Students will be able to audit a router's wireless settings and recommend corrections."
  ],
  "plan": [
   [
    5,
    "Warm-up",
    "Read the warm-up prompt and have students discuss with a neighbor for one minute."
   ],
   [
    15,
    "Teach",
    "Explain WEP's design flaws (short repeating IVs, weak key handling, no real integrity) and why key length does not help. Describe open networks, captive portals and evil twins, then Enhanced Open as a better guest option. On the whiteboard, show the WPS PIN math: 8 digits, checked in halves, last digit a checksum, about 11,000 combinations, and stress that success reveals the passphrase. Mention push-button WPS and routers that do not fully disable it."
   ],
   [
    15,
    "Activity",
    "Run 'Router Audit' (see activity)."
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
  "warmup": "Your neighbor has a 20-character Wi-Fi password but a feature turned on that lets devices join with an 8-digit PIN printed on the router. Is the network as secure as the long password suggests? Why or why not?",
  "activity": {
   "title": "Router Audit",
   "materials": "Printed mock router settings pages (three different versions created by the teacher, showing options such as security mode, guest network settings, WPS status, admin password status and firmware date), red and green pens or sticky notes, whiteboard.",
   "steps": [
    "Pairs receive one mock settings page and mark each insecure setting with a red note and each acceptable setting with a green note.",
    "For every red note, pairs write the recommended change and a one-sentence reason, such as 'Disable WPS: the PIN can be brute-forced and reveals the passphrase.'",
    "Pairs swap pages with another pair holding a different version and check whether anything was missed.",
    "The class builds a shared audit checklist on the whiteboard: no WEP or TKIP, no open staff network, WPS off, changed admin password, current firmware."
   ]
  },
  "discussion": [
   "If a business has one critical device that only supports WEP, what are the options, and which would you recommend?",
   "Why might users trust a public hotspot more than they should, and what would you tell them to do?"
  ],
  "exit": [
   [
    "Why doesn't a long key make WEP secure?",
    "WEP's design flaws, such as short repeating IVs, let attackers recover the key regardless of its length."
   ],
   [
    "What does an attacker gain by cracking the WPS PIN?",
    "The router reveals the network's WPA/WPA2 passphrase."
   ],
   [
    "Does a captive portal encrypt traffic on an open hotspot?",
    "No. It only controls access; over-the-air traffic remains unencrypted."
   ]
  ],
  "differentiation": [
   "Support: Provide a three-item checklist card (WEP/TKIP, open network, WPS) with a short 'why' for each that students can use during the router audit.",
   "Extend: Ask fast finishers to calculate how the WPS PIN space drops from 100 million to about 11,000 and explain each step of the reduction."
  ]
 }
]);
